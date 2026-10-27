const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
const cookie=(request,key)=>request.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(key+'='))?.slice(key.length+1);
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,'0')).join('');
const random=()=>crypto.randomUUID()+crypto.randomUUID();
const getUser=async (request,env)=>{let token=cookie(request,'folio_session');if(!token)return null;let hash=await digest(token);return env.DB.prepare('SELECT users.id,users.email FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.token_hash=? AND sessions.expires_at>?').bind(hash,Date.now()).first()};
const sessionCookie=(token,maxAge)=>`folio_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=${maxAge}`;
export async function onRequest({request,env,params}){
 try{
  if(!env.DB)return json({error:'D1データベースが未設定です'},503);
  const url=new URL(request.url),route='/'+(params.path||[]).join('/');
  if(['POST','PUT','DELETE'].includes(request.method)){
   const origin=request.headers.get('origin');if(origin&&origin!==url.origin)return json({error:'Invalid origin'},403);
  }
  if(request.method==='POST'){
   const origin=request.headers.get('origin');if(origin&&origin!==url.origin)return json({error:'Invalid origin'},403);
   if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'JSON required'},415);
  }
  if(route==='/me'&&request.method==='GET'){let u=await getUser(request,env);return json({user:u||null})}
  if(route==='/auth/request'&&request.method==='POST'){
   if(!env.RESEND_API_KEY||!env.EMAIL_FROM||!env.OTP_SECRET)return json({error:'メール配信の設定が未完了です'},503);
   let {email}=await request.json();email=String(email||'').trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)return json({error:'メールアドレスを確認してください'},400);
   const recent=await env.DB.prepare('SELECT COUNT(*) AS n FROM login_codes WHERE email=? AND created_at>?').bind(email,Date.now()-3600000).first();
   if(recent.n>=5)return json({error:'送信回数の上限です。1時間後にお試しください'},429);
   const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0');const hash=await digest(env.OTP_SECRET+':'+email+':'+code);
   await env.DB.prepare('INSERT INTO login_codes(id,email,code_hash,created_at,expires_at,attempts) VALUES(?,?,?,?,?,0)').bind(crypto.randomUUID(),email,hash,Date.now(),Date.now()+600000).run();
   const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.EMAIL_FROM,to:[email],subject:'FOLIO. ログイン認証コード',text:`FOLIO. の認証コードは ${code} です。10分以内に入力してください。心当たりがなければ無視してください。`})});
   if(!response.ok)return json({error:'メール送信に失敗しました。配信設定をご確認ください'},502);
   return json({ok:true});
  }
  if(route==='/auth/verify'&&request.method==='POST'){
   let {email,code}=await request.json();email=String(email||'').trim().toLowerCase();code=String(code||'');if(!/^\d{6}$/.test(code))return json({error:'6桁のコードを入力してください'},400);
   let row=await env.DB.prepare('SELECT * FROM login_codes WHERE email=? AND expires_at>? ORDER BY created_at DESC LIMIT 1').bind(email,Date.now()).first();
   if(!row||row.attempts>=5)return json({error:'コードが無効か期限切れです'},401);
   await env.DB.prepare('UPDATE login_codes SET attempts=attempts+1 WHERE id=?').bind(row.id).run();
   if(await digest(env.OTP_SECRET+':'+email+':'+code)!==row.code_hash)return json({error:'コードが違います'},401);
   await env.DB.prepare('DELETE FROM login_codes WHERE email=?').bind(email).run();
   await env.DB.prepare('INSERT OR IGNORE INTO users(id,email,created_at) VALUES(?,?,?)').bind(crypto.randomUUID(),email,Date.now()).run();
   let user=await env.DB.prepare('SELECT id,email FROM users WHERE email=?').bind(email).first();let token=random();
   await env.DB.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').bind(await digest(token),user.id,Date.now()+30*86400000).run();
   return json({user},200,{'set-cookie':sessionCookie(token,30*86400)});
  }
  if(route==='/auth/logout'&&request.method==='POST'){let token=cookie(request,'folio_session');if(token)await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await digest(token)).run();return json({ok:true},200,{'set-cookie':sessionCookie('',0)})}
  let user=await getUser(request,env);if(!user)return json({error:'ログインしてください'},401);
  if(route.startsWith('/photos/')&&['GET','PUT','DELETE'].includes(request.method)){
   if(!env.PHOTOS)return json({error:'写真ストレージが未設定です'},503);
   const id=route.slice('/photos/'.length);
   if(!/^[a-zA-Z0-9_-]{1,100}$/.test(id))return json({error:'Invalid photo id'},400);
   const project=await env.DB.prepare('SELECT id FROM projects WHERE user_id=? AND id=?').bind(user.id,id).first();
   if(!project)return json({error:'作品が見つかりません'},404);
   const key='users/'+user.id+'/projects/'+id+'/photo';
   if(request.method==='GET'){
    const obj=await env.PHOTOS.get(key);
    if(!obj)return json({error:'写真が見つかりません'},404);
    return new Response(obj.body,{headers:{'content-type':obj.httpMetadata?.contentType||'image/jpeg','cache-control':'private, no-store','x-content-type-options':'nosniff','content-disposition':'inline'}});
   }
   if(request.method==='DELETE'){await env.PHOTOS.delete(key);return json({ok:true})}
   const mime=(request.headers.get('content-type')||'').split(';')[0].toLowerCase();
   if(!['image/jpeg','image/png','image/webp','image/gif'].includes(mime))return json({error:'JPEG/PNG/WebP/GIFのみ対応しています'},415);
   const len=Number(request.headers.get('content-length')||0);
   if(len>10*1024*1024)return json({error:'写真は10MB以下にしてください'},413);
   const blob=await request.arrayBuffer();
   if(!blob.byteLength||blob.byteLength>10*1024*1024)return json({error:'写真は10MB以下にしてください'},413);
   const bytes=new Uint8Array(blob);
   const valid=(mime==='image/jpeg'&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255)
    ||(mime==='image/png'&&bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71)
    ||(mime==='image/gif'&&bytes[0]===71&&bytes[1]===73&&bytes[2]===70&&bytes[3]===56)
    ||(mime==='image/webp'&&String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP');
   if(!valid)return json({error:'画像ファイルの形式を確認してください'},415);
   await env.PHOTOS.put(key,blob,{httpMetadata:{contentType:mime}});
   return json({ok:true});
  }
  if(route==='/projects'&&request.method==='GET'){
   let rows=await env.DB.prepare('SELECT data FROM projects WHERE user_id=? ORDER BY updated_at DESC').bind(user.id).all();return json({projects:rows.results.map(r=>JSON.parse(r.data))});
  }
  if(route==='/projects'&&request.method==='PUT'){
   let raw=await request.text();if(raw.length>2200000)return json({error:'データが大きすぎます。写真のサイズを小さくしてください'},413);
   let body=JSON.parse(raw),p=body.project;
   if(!p||typeof p.id!=='string'||p.id.length>100||typeof p.name!=='string'||p.name.length>100||!Array.isArray(p.rows)||p.rows.length>5000)return json({error:'作品データが不正です'},400);
   await env.DB.prepare('INSERT INTO projects(user_id,id,data,updated_at) VALUES(?,?,?,?) ON CONFLICT(user_id,id) DO UPDATE SET data=excluded.data,updated_at=excluded.updated_at').bind(user.id,p.id,JSON.stringify(p),Date.now()).run();return json({ok:true});
  }
  return json({error:'Not found'},404);
 }catch(err){return json({error:'サーバーエラーが発生しました'},500)}
}
