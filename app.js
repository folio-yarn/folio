// DOM helper: required before binding language events and rendering.
const $ = (id) => document.getElementById(id);
// Core helpers used by every screen. Keep these available before first render.
function t(key){return words[s.lang]?.[key] ?? words.ja[key] ?? key}
function e(value){return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
const KEY='folio-prototype-v2';
const words={
 ja:{home:'ホーム',studio:'スタジオ',new:'新しい作品を作る',tagline:'編む時間が、あなたのレシピになる。',archive:'YOUR ARCHIVE',none:'作品がまだありません。ホームから最初の作品を作りましょう。',name:'作品名',yarn:'使用糸',needle:'針のサイズ',memo:'メモ',save:'保存',back:'戻る',row:'段を記録',rows:'制作記録',stitches:'目数',color:'糸の色',stitch:'編み方',photo:'作品の写真',upload:'写真を選ぶ',voice:'音声入力',count:'記録した作品数',threshold:'5作品以上で、自分だけの編み物レシピノートが作れます。',make:'自分のレシピノートをつくる',select:'掲載する作品を選ぶ',edition:'掲載作品数を選択',preview:'ノートをプレビュー',order:'注文する',soon:'注文・決済・印刷手配は現在準備中です。注文ボタンは実際の発注を行いません。',private:'この試作版の作品データは、このブラウザ内に保存されます。非公開クラウド保存・ログイン機能は開発予定です。',phototip:'窓際の自然光で、シンプルな背景の前で撮影すると綺麗に残せます。',details:'作品の詳細',choose:'選択した作品',notEnough:'この冊子を作るには、必要な作品数を記録してください。',emptySelect:'掲載する作品を選択してください。',orderinfo:'ご注文について',ship:'印刷会社で製本後、FOLIO.の運営者が内容を最終確認し、ギフト包装して発送する予定です。',ad:'ADVERTISEMENT · 広告枠（未接続）',cover:'表紙',recipe:'レシピ',end:'裏表紙',edit:'編集',noData:'まだ作品がありません。',styles:'デザインを選ぶ',format:'仕様',design1:'IVORY EDITION',design2:'NAVY EDITION',design3:'OLIVE EDITION',ready:'プレビューを見る',next:'次へ',prev:'前へ',local:'この端末のみで保存されます。',sample:'これはデザイン確認用の試作プレビューです。印刷用PDFは配信されません。',selectCount:'冊子に掲載する作品数',total:'作品',limited:'現在登録済みの作品数'},
 en:{home:'Home',studio:'Studio',new:'Create a project',tagline:'Every stitch becomes your story.',archive:'YOUR ARCHIVE',none:'No projects yet. Start your first one on Home.',name:'Project name',yarn:'Yarn',needle:'Hook / needle',memo:'Notes',save:'Save',back:'Back',row:'Save row',rows:'Row record',stitches:'Stitches',color:'Yarn color',stitch:'Stitch type',photo:'Project photo',upload:'Choose photo',voice:'Voice input',count:'Projects recorded',threshold:'With 5 or more projects, create your own crochet recipe notebook.',make:'Create my recipe notebook',select:'Choose your projects',edition:'Select project count',preview:'Preview notebook',order:'Place order',soon:'Ordering, payment and printing are not live. This button will not place an order.',private:'Prototype data is saved in this browser only. Private cloud storage and accounts are coming later.',phototip:'Use soft window light and a clean background.',details:'Project details',choose:'Selected projects',notEnough:'Record enough projects to create this edition.',emptySelect:'Choose projects to include.',orderinfo:'About orders',ship:'After printing, FOLIO. plans to check each book, gift-wrap it and ship it.',ad:'ADVERTISEMENT · Placeholder',cover:'Cover',recipe:'Recipe',end:'Back cover',edit:'Edit',noData:'No projects yet.',styles:'Choose a design',format:'Format',design1:'IVORY EDITION',design2:'NAVY EDITION',design3:'OLIVE EDITION',ready:'View preview',next:'Next',prev:'Previous',local:'Saved on this device only.',sample:'Design prototype only. No print-ready PDF is shared.',selectCount:'Projects per book',total:'projects',limited:'Projects recorded'},
 ko:{home:'홈',studio:'스튜디오',new:'새 작품 만들기',tagline:'뜨개질의 시간이 나만의 레시피가 됩니다.',archive:'YOUR ARCHIVE',none:'아직 작품이 없어요. 홈에서 첫 작품을 만들어 보세요.',name:'작품명',yarn:'실',needle:'바늘 크기',memo:'메모',save:'저장',back:'뒤로',row:'단 저장',rows:'단별 기록',stitches:'코 수',color:'실 색상',stitch:'뜨개 기법',photo:'작품 사진',upload:'사진 선택',voice:'음성 입력',count:'기록한 작품 수',threshold:'작품 5개 이상이면 나만의 뜨개 레시피 노트를 만들 수 있어요.',make:'나만의 레시피 노트 만들기',select:'수록할 작품 선택',edition:'작품 수 선택',preview:'노트 미리보기',order:'주문하기',soon:'주문, 결제, 인쇄는 준비 중입니다. 실제 주문되지 않습니다.',private:'이 시험 버전은 브라우저에만 저장됩니다. 비공개 클라우드 계정은 아직 없습니다.',phototip:'창가의 자연광과 단순한 배경에서 촬영하세요.',details:'작품 상세',choose:'선택한 작품',notEnough:'이 버전을 만들려면 작품을 더 기록하세요.',emptySelect:'수록할 작품을 선택하세요.',orderinfo:'주문 안내',ship:'인쇄 후 운영자가 내용을 확인하고 선물 포장해 발송할 예정입니다.',ad:'ADVERTISEMENT · 광고 자리',cover:'표지',recipe:'레시피',end:'뒷표지',edit:'수정',noData:'작품이 없습니다.',styles:'디자인 선택',format:'사양',design1:'IVORY EDITION',design2:'NAVY EDITION',design3:'OLIVE EDITION',ready:'미리보기',next:'다음',prev:'이전',local:'이 기기에만 저장됩니다.',sample:'디자인 시험 미리보기입니다. 인쇄용 PDF는 제공되지 않습니다.',selectCount:'수록할 작품 수',total:'작품',limited:'기록한 작품 수'}
};
let s={lang:'ja',projects:[],active:null,view:'home',edition:5,selected:[],design:'yellow',page:0,coverPhoto:null};
// IndexedDB stores original-quality photo blobs separately from lightweight metadata.
// Keep old localStorage data intact until migration has committed successfully.
const DB_NAME='folio-offline-v1', DB_VERSION=1;
let dbPromise=null, storageOkay=true, persistenceQueue=Promise.resolve(), storageReady=false;
function openDB(){
 if(!('indexedDB' in window))return Promise.reject(new Error('このブラウザではIndexedDBを使用できません'));
 if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
  const request=indexedDB.open(DB_NAME,DB_VERSION);
  request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains('state'))db.createObjectStore('state');if(!db.objectStoreNames.contains('photos'))db.createObjectStore('photos')};
  request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);
 });return dbPromise;
}
async function idbGet(store,key){const db=await openDB();return new Promise((resolve,reject)=>{let tx=db.transaction(store,'readonly'),r=tx.objectStore(store).get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function idbPut(store,key,value){const db=await openDB();return new Promise((resolve,reject)=>{let tx=db.transaction(store,'readwrite');tx.objectStore(store).put(value,key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}
function dataURLtoBlob(data){let [head,payload]=data.split(',');let mime=head.match(/data:([^;]+)/)?.[1]||'image/jpeg';let binary=atob(payload),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);return new Blob([bytes],{type:mime})}
function photoKey(id){return 'project:'+id}
async function storePhoto(key,file){await idbPut('photos',key,file)}
async function hydratePhotos(){
 for(const p of s.projects){let blob=await idbGet('photos',photoKey(p.id));if(blob){p.photo=URL.createObjectURL(blob)}else if(typeof p.photo==='string'&&p.photo.startsWith('data:')){const converted=dataURLtoBlob(p.photo);await storePhoto(photoKey(p.id),converted);p.photo=URL.createObjectURL(converted)}}
 let cover=await idbGet('photos','cover');if(cover)s.coverPhoto=URL.createObjectURL(cover);
}
function lightweightState(){return {...s,projects:s.projects.map(p=>({...p,photo:null})),coverPhoto:null,view:'home'}}
async function persist(){
 await idbPut('state','current',lightweightState());
 // Small fallback contains NO image data. The legacy keys remain untouched for recovery.
 try{localStorage.setItem('folio-lightweight-v15',JSON.stringify(lightweightState()))}catch{}
 storageOkay=true;
}
function save(){
 if(!storageReady)return;
 persistenceQueue=persistenceQueue.then(persist).then(()=>{queueCloudSave();let el=$('save-state');if(el)el.textContent='✓ この端末に保存済み'}).catch(err=>{storageOkay=false;console.error('FOLIO save failed',err);let el=$('save-state');if(el)el.textContent='⚠ 保存に失敗しました';alert('保存できませんでした。ブラウザのプライベートモードやストレージ設定をご確認ください。')});
}
async function initializeStorage(){
 try{
  let saved=await idbGet('state','current');
  if(!saved){let old=null;for(let key of [KEY,'folio-prototype-v1']){try{old=JSON.parse(localStorage.getItem(key)||'null');if(old)break}catch{}}saved=old||JSON.parse(localStorage.getItem('folio-lightweight-v15')||'null')}
  if(saved)Object.assign(s,saved);
  // Import original data URLs to IndexedDB without recompression or image resizing.
  for(let p of s.projects){if(typeof p.photo==='string'&&p.photo.startsWith('data:')){let blob=dataURLtoBlob(p.photo);await storePhoto(photoKey(p.id),blob);p.photo=URL.createObjectURL(blob)}}
  if(typeof s.coverPhoto==='string'&&s.coverPhoto.startsWith('data:')){let blob=dataURLtoBlob(s.coverPhoto);await storePhoto('cover',blob);s.coverPhoto=URL.createObjectURL(blob)}
  await hydratePhotos();s.view='home';storageReady=true;await persist();render();if(location.protocol!=='file:')initAccount();
 }catch(err){console.error('FOLIO storage initialization failed:',err);storageReady=false;render();alert('保存領域を開けませんでした。既存のデータは削除していません。Chromeでローカルサーバーから開く方法をREADMEで確認してください。')}
}
function current(){return s.projects.find(p=>p.id===s.active)}
function go(v){if(['new','record','book','choose','preview'].includes(v)&&!accountUser){openAccount();accountNotice(at('loginNeeded'));return;}clearInterval(carouselTimer);s.view=v;save();render();window.scrollTo(0,0)}
function header(){document.documentElement.lang=s.lang;$('lang').value=s.lang;let nav=$('nav');nav.innerHTML=[['home','⌂'],['studio','▦']].map(([v,ic])=>`<button class="${s.view===v||(v==='home'&&['new','record'].includes(s.view))||(v==='studio'&&['book','choose','preview'].includes(s.view))?'active':''}" onclick="go('${v}')"><span>${ic}</span>${t(v)}</button>`).join('')}
function ad(){return `<div class="ad">${t('ad')}</div>`}
function tile(p){return `<article class="card" onclick="openProject('${p.id}')"><div class="thumb">${p.photo?`<img src="${p.photo}" alt="">`:'✳'}</div><h4>${e(p.name)}</h4><p>${p.rows.length} ROWS · ${p.finished?'完成':'制作中'}</p></article>`}
function templateArt(type){
 const start='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 540"><rect width="480" height="540" fill="#d4dcd5"/>';
 const end='<text x="24" y="505" font-family="Georgia,serif" font-size="19" letter-spacing="3" fill="#355a6c">FOLIO. / CROCHET</text></svg>';
 const tote='<path d="M150 188 C150 68 330 68 330 188" fill="none" stroke="#567d89" stroke-width="28"/><path d="M99 189 L381 189 L360 448 L120 448 Z" fill="#89a9aa" stroke="#567d89" stroke-width="9"/><path d="M123 232 H356 M119 266 H359 M116 300 H362 M113 334 H365 M110 368 H368 M107 402 H371" stroke="#c8d9d4" stroke-width="5" opacity=".85"/>';
 const scrunchie='<circle cx="240" cy="270" r="129" fill="#d1a3b1" stroke="#b77891" stroke-width="12"/><circle cx="240" cy="270" r="54" fill="#d4dcd5" stroke="#b77891" stroke-width="12"/><g stroke="#f2c8d0" stroke-width="8" fill="none"><path d="M240 146 Q310 178 348 240 Q315 315 260 381 Q190 354 141 292 Q162 214 240 146Z"/><path d="M163 186 Q220 210 240 214 Q310 219 323 289 Q278 340 204 338 Q154 290 163 186Z"/></g>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(start+(type==='tote'?tote:scrunchie)+end)
}
const showcase=[
 {src:'assets/beanie-double.jpg',label:'DOUBLE CROCHET BEANIE',kind:'BEGINNER / TEMPLATE'},
 {src:'assets/tote-double.jpg',label:'CROCHET TOTE BAG',kind:'BEGINNER / TEMPLATE'},
 {src:'assets/beanie-single.jpg',label:'SINGLE CROCHET BEANIE',kind:'BEGINNER / TEMPLATE'},
 {src:'assets/scrunchie-double.jpg',label:'CROCHET SCRUNCHIE',kind:'BEGINNER / TEMPLATE'}
];
const templateI18n={
 ja:{subtitles:['長編みのビーニー','長編みのトートバッグ','細編みのビーニー','かぎ針編みのシュシュ'],intro:'初心者向けの作り方の目安です。画像はイメージです。サイズや目数は毛糸とゲージによって変わります。',start:'この作品を参考に記録を始める',guide:'編み方ガイド',head:'はじめてのかぎ針編み',foot:'4つの初心者向けテンプレート。画像をタップして編み方をチェック。',steps:[
 ['輪の作り目に鎖3目で立ち上がり、長編みを10〜12目編み入れます。','2段目以降は均等に増し目し、頭頂部の円を希望の直径まで広げます。','増し目なしで長編みを繰り返し、好みの深さまで編みます。','必要なら縁を細編みで整え、糸端を始末します。'],
 ['鎖編みでバッグの底の幅を作り、長編みで楕円形に増し目して底を編みます。','底が希望のサイズになったら増し目を止め、長編みで側面を編みます。','持ち手の位置を左右対称に決め、鎖編みで持ち手を作ります。','持ち手を細編みなどで補強し、糸端を始末します。'],
 ['輪の作り目に細編みを6目編み入れます。','各段で均等に6目ずつ増し目し、頭頂部を希望の直径まで広げます。','増し目なしで細編みを繰り返し、好みの深さまで編みます。','縁を整えて糸端を始末します。'],
 ['ヘアゴムに細編みを隙間なく編みつけ、1周つなぎます。','各目に長編みを2〜3目編み入れ、フリルを作ります。','ボリュームが足りなければもう1段増し目して編みます。','糸端を内側に隠して完成です。']
 ]},
 en:{subtitles:['Easy double crochet beanie','Double crochet tote bag','Single crochet beanie','Crochet scrunchie'],intro:'Beginner-friendly guidance. Images are illustrative; adjust stitch counts and sizing to your yarn and gauge.',start:'Start recording a project',guide:'Crochet guide',head:'CROCHET FOR BEGINNERS',foot:'Four beginner templates. Tap a card for the instructions.',steps:[
 ['Make a magic ring, chain 3, and work 10–12 double crochet stitches into the ring.','Increase evenly in subsequent rounds until the crown reaches your desired diameter.','Work double crochet rounds without increases until the hat reaches the desired depth.','Optional: finish the edge with single crochet and weave in ends.'],
 ['Chain to the desired base width, then work double crochet increases around both sides to form an oval base.','Stop increasing when the base is large enough; crochet the sides in double crochet.','Mark two symmetrical handle positions and chain across the gaps.','Reinforce the handles with single crochet and weave in ends.'],
 ['Work 6 single crochet stitches into a magic ring.','Increase evenly by 6 stitches each round until the crown reaches the desired diameter.','Continue in single crochet without increasing to the desired depth.','Finish the edge and weave in ends.'],
 ['Work single crochet stitches tightly around a hair elastic.','Work 2–3 double crochet stitches into each stitch to create ruffles.','Add another increasing round if you want more volume.','Weave in the ends securely.']
 ]},
 ko:{subtitles:['긴뜨기 비니','긴뜨기 토트백','짧은뜨기 비니','코바늘 슈슈'],intro:'초보자를 위한 기본 가이드입니다. 이미지는 예시이며, 코 수와 크기는 실과 게이지에 따라 조절해 주세요.',start:'이 작품을 참고해 기록 시작하기',guide:'뜨개 가이드',head:'초보자를 위한 코바늘',foot:'초보자용 템플릿 4가지. 이미지를 눌러 만드는 방법을 확인하세요.',steps:[
 ['매직링을 만들고 사슬 3코로 올라간 뒤 긴뜨기 10~12코를 뜹니다.','다음 단부터 고르게 코를 늘려 원하는 머리 윗부분 지름까지 뜹니다.','코 늘림 없이 긴뜨기를 반복해 원하는 깊이까지 뜹니다.','필요하면 가장자리를 짧은뜨기로 마무리하고 실 끝을 정리합니다.'],
 ['원하는 바닥 너비만큼 사슬을 뜨고 양쪽을 돌아가며 긴뜨기로 늘려 타원형 바닥을 만듭니다.','바닥이 원하는 크기가 되면 코 늘림 없이 긴뜨기로 옆면을 뜹니다.','양쪽 손잡이 위치를 대칭으로 표시하고 사슬로 손잡이를 만듭니다.','짧은뜨기로 손잡이를 보강하고 실 끝을 정리합니다.'],
 ['매직링에 짧은뜨기 6코를 뜹니다.','매 단 6코씩 고르게 늘려 원하는 윗부분 지름까지 뜹니다.','코 늘림 없이 짧은뜨기를 반복해 원하는 깊이까지 뜹니다.','가장자리를 정리하고 실 끝을 숨깁니다.'],
 ['머리끈을 감싸도록 짧은뜨기를 촘촘하게 한 바퀴 뜹니다.','각 코에 긴뜨기를 2~3코씩 떠서 프릴을 만듭니다.','더 풍성하게 만들고 싶다면 늘림 단을 한 단 더 뜹니다.','실 끝을 안쪽으로 숨겨 마무리합니다.']
 ]}
};
let carouselIndex=0,carouselTimer=null;
function carouselCards(){const l=templateI18n[s.lang]||templateI18n.ja;return showcase.map((item,i)=>`<div role="button" tabindex="0" onclick="openShowcaseRecipe(${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openShowcaseRecipe(${i})}" aria-label="${e(l.subtitles[i])}" class="carousel-card ${i===carouselIndex?'is-active':''}" aria-hidden="${i!==carouselIndex}" data-slide="${i}"><div class="carousel-photo"><img src="${item.src}" alt="${e(l.subtitles[i])}" loading="lazy"></div><div class="carousel-caption"><span>${String(i+1).padStart(2,'0')} / ${item.label}</span><small>${e(l.subtitles[i])}</small></div></div>`).join('')}
function carouselHTML(){const l=templateI18n[s.lang]||templateI18n.ja;return `<section class="showcase" aria-label="${e(l.head)}"><div class="inspiration-head"><span>${e(l.head)}</span><span>FOLIO. / 004</span></div><div class="carousel-window"><div class="carousel-track" id="carousel-track">${carouselCards()}</div></div><div class="carousel-bottom"><span>${e(l.foot)}</span><div class="carousel-dots">${showcase.map((_,i)=>`<button class="carousel-dot ${i===carouselIndex?'active':''}" aria-label="Slide ${i+1}" onclick="setCarousel(${i})"></button>`).join('')}</div></div><p class="carousel-disclaimer">${e(l.intro)}</p></section>`}
function openShowcaseRecipe(i){const item=showcase[i],l=templateI18n[s.lang]||templateI18n.ja,m=$('recipe-modal');if(!item||!m)return;document.body.appendChild(m);m.hidden=false;document.body.classList.add('dialog-open');m.innerHTML=`<div class="auth-backdrop" onclick="closeShowcaseRecipe()"></div><section class="auth-panel recipe-panel" role="dialog" aria-modal="true" aria-label="${e(l.guide)}"><button class="auth-close" onclick="closeShowcaseRecipe()">×</button><div class="eyebrow">FOLIO. / ${e(l.guide)}</div><h2>${item.label}</h2><p>${e(l.subtitles[i])}</p><p class="muted small">${e(l.intro)}</p><ol>${l.steps[i].map(step=>`<li>${e(step)}</li>`).join('')}</ol><button class="btn wide" onclick="closeShowcaseRecipe();go('new')">${e(l.start)}</button></section>`}
function closeShowcaseRecipe(){const m=$('recipe-modal');if(m)m.hidden=true;document.body.classList.remove('dialog-open')}
function setCarousel(i){carouselIndex=(i+showcase.length)%showcase.length;const track=$('carousel-track');if(!track)return;const card=track.querySelectorAll('.carousel-card')[carouselIndex];if(!card)return;const windowEl=track.parentElement;const center=windowEl.clientWidth/2;const cardCenter=card.offsetLeft+card.offsetWidth/2;track.style.setProperty('transform',`translate3d(${center-cardCenter}px,0,0)`,'important');track.querySelectorAll('.carousel-card').forEach((c,n)=>{c.classList.toggle('is-active',n===carouselIndex);c.setAttribute('aria-hidden','false')});document.querySelectorAll('.carousel-dot').forEach((d,n)=>d.classList.toggle('active',n===carouselIndex))}
function startCarousel(){clearInterval(carouselTimer);if(s.view!=='home')return;requestAnimationFrame(()=>setCarousel(carouselIndex));carouselTimer=setInterval(()=>{if(s.view==='home'&&!document.hidden)setCarousel(carouselIndex+1)},3400)}
function home(){return `<div class="eyebrow">FOLIO. / YOUR WORK, KEPT FOREVER.</div><p class="eyebrow home-tagline">${t('tagline')}</p>${carouselHTML()}<button class="btn wide" onclick="go('new')">＋ ${t('new')}</button><div class="section"><h3><img class="label-image archive-image" src="assets/label-archive.png" alt="Your Archive"></h3><button class="textbtn" onclick="go('studio')"><img class="label-image view-image" src="assets/label-viewall.png" alt="View All"></button></div>${s.projects.length?`<div class="grid">${s.projects.slice(0,2).map(tile).join('')}</div>`:`<div class="empty">${t('none')}</div>`}${ad()}`}
function palette(name,selected='#26354b'){const colors=['#26354b','#f2e8d8','#1c1c1c','#77806c','#a44942','#b79b79','#b4bdc5','#d2a8a5','#e7c85d','#835d80'];return `<div class="color-palette" role="group" aria-label="${t('color')}">${colors.map((c,i)=>`<button type="button" class="color-choice ${c.toLowerCase()===selected.toLowerCase()?'selected':''}" style="--choice:${c}" aria-label="${c}" title="${c}" onclick="pickColor('${name}','${c}')"></button>`).join('')}<label class="custom-color" title="Custom color">＋ <input type="color" value="${selected}" aria-label="Custom color" oninput="pickColor('${name}',this.value)"></label></div><input type="hidden" name="${name}" value="${selected}"><div class="color-value">${selected.toUpperCase()}</div>`}
function pickColor(name,c){let f=document.querySelector('form');if(!f)return;f.elements[name].value=c;let box=f.querySelector('.color-palette');box.querySelectorAll('.color-choice').forEach(b=>b.classList.toggle('selected',b.style.getPropertyValue('--choice').toLowerCase()===c.toLowerCase()));f.querySelector('.color-value').textContent=c.toUpperCase()}

function studio(){return `<div class="eyebrow">THE FOLIO. ARCHIVE</div><h1 class="studio-heading"><img src="assets/label-studio.png" alt="STUDIO"></h1><p class="muted">Your handmade collection, beautifully kept.</p><div class="section"><h3>${t('archive')}</h3><span class="muted">${s.projects.length} ${t('total')}</span></div><div class="grid studio-grid">${s.projects.map(tile).join('')}<button class="card studio-add-card" type="button" onclick="go('new')" aria-label="${t('new')}"><span class="studio-add-plus" aria-hidden="true">＋</span><span class="studio-add-label">${t('new')}</span></button></div><div class="progress-box"><div class="eyebrow">YOUR COLLECTION</div><div class="progress-num">${s.projects.length}<span> / 5</span></div><div class="progress-track"><div style="width:${Math.min(100,s.projects.length/5*100)}%"></div></div><p>${t('threshold')}</p><button class="btn wide" onclick="go('book')" ${s.projects.length<5?'disabled':''}>${t('make')} →</button></div>${ad()}`}

function create(){return `<div class="eyebrow">NEW / PROJECT</div><h1 class="title small-heading">${t('new')}</h1><form id="create" class="form"><label>${t('name')}</label><input name="name" maxlength="80" required placeholder="My crochet beanie"><label>START FROM</label><div class="template-list"><label><input type="radio" name="template" value="free" checked> 自由に記録</label><label><input type="radio" name="template" value="beanie-round"> ビーニー（トップから円形）</label><label><input type="radio" name="template" value="beanie-flat"> ビーニー（長方形）</label><label><input type="radio" name="template" value="bucket"> バケットハット</label></div><div class="two"><div><label>目標サイズ</label><select name="size"><option value="custom">カスタム</option><option value="womenS">女性 S / 52–54cm</option><option value="womenM">女性 M / 54–56cm</option><option value="menM">男性 M / 56–58cm</option><option value="menL">男性 L / 58–60cm</option></select></div><div><label>${t('needle')}</label><input name="needle" maxlength="50" placeholder="7号 / 4.0mm"></div></div><div class="section"><h3>${t('yarn')}</h3></div><div id="yarns">${yarnField(0)}</div><button type="button" class="btn light" onclick="addYarnField()">＋ 使用糸を追加</button><label>${t('memo')}</label><textarea name="memo" maxlength="1500"></textarea><div class="toolbar"><button class="btn" type="submit">${t('save')}</button><button class="btn light" type="button" onclick="go('home')">${t('back')}</button></div></form>`}
let yarnFieldIndex=1;
function yarnField(i){return `<div class="yarn-entry" data-yarn="${i}"><div class="yarn-entry-title">YARN ${i+1} ${i?`<button type="button" onclick="this.closest('.yarn-entry').remove()">×</button>`:''}</div><input name="yarnName_${i}" placeholder="メーカー・毛糸名"><input name="yarnAmount_${i}" placeholder="使用量（任意）"></div>`}
function addYarnField(){document.getElementById('yarns').insertAdjacentHTML('beforeend',yarnField(yarnFieldIndex++))}
function collectYarns(form){return [...form.querySelectorAll('.yarn-entry')].map(el=>{let i=el.dataset.yarn;return {name:form.elements['yarnName_'+i].value,shade:'',amount:form.elements['yarnAmount_'+i].value,color:null}}).filter(y=>y.name||y.shade||y.amount)}
function record(){let p=current();if(!p)return `<p>${t('noData')}</p><button class="btn" onclick="go('studio')">${t('back')}</button>`;let last=p.rows.at(-1)||{count:6,stitch:'細編み',color:p.yarnColor||'#26354b',note:''};let guide='';if(p.template==='beanie-round'){let n=p.rows.length+1,inc=n===1?6:6*n;guide=`<div class="guide"><b>BEANIE / TOP DOWN</b><p>目安：${p.size==='menM'?'男性M・頭囲56〜58cm':p.size==='menL'?'男性L・頭囲58〜60cm':p.size==='womenM'?'女性M・頭囲54〜56cm':p.size==='womenS'?'女性S・頭囲52〜54cm':'希望の頭囲に合わせて調整'}。円の直径は約16〜18cmを参考に、ゲージと実測値で調整。</p><p>${n}段目の基本例：${n===1?'輪の作り目に細編み6目':n===2?'全目増し目':`細編み${n-2}目＋増し目 × 6`} → ${inc}目。立ち上がり鎖1目は目数に含めず、最初の細編みに引き抜く。</p><small>ガイドは例示です。実際の目数は自由に変更できます。</small></div>`}else if(p.template&&p.template!=='free'){guide=`<div class="guide"><b>${p.template==='beanie-flat'?'BEANIE / FLAT':'BUCKET HAT'}</b><p>編み始めにゲージと希望サイズを確認。段ごとの目数は実測に合わせて記録してください。</p></div>`}return `<div class="eyebrow">PROJECT / ${p.rows.length} ROWS</div><h1 class="title">${e(p.name)}</h1><p class="muted">${e((p.yarns||[]).map(y=>y.name).join(' / ')||p.yarn||'')} · ${e(p.needle)}</p><div class="save-state" id="save-state">✓ 保存済み（このブラウザ）</div><div class="count"><div class="eyebrow">CURRENT ROW</div><div class="num">${p.rows.length+1}</div><div class="controls"><button class="round" onclick="undo()" aria-label="Undo">−</button><button class="round" onclick="addRow()" aria-label="Add">＋</button></div></div>${guide}<form id="rowform" class="form"><div class="two"><div><label>${t('stitches')}</label><input name="count" type="number" min="0" max="99999" value="${last.count}" required></div><div><label>${t('color')}</label>${palette('color',last.color)}</div></div><label>${t('stitch')}</label><input name="stitch" maxlength="100" value="${e(last.stitch)}"><label>${t('memo')}</label><input name="note" maxlength="300"><div class="toolbar"><button class="btn" type="submit">＋ ${t('row')}</button><button class="btn light" type="button" onclick="voice()">🎙 ${t('voice')}</button></div></form><div class="section"><h3>${t('rows')}</h3><span class="muted">${p.rows.length} ROWS</span></div>${p.rows.slice().reverse().map((r,i)=>`<div class="row"><b>${p.rows.length-i}</b><div><span class="swatch" style="background:${e(r.color)}"></span>${e(r.stitch)}<br><small>${e(r.note)}</small></div><b>${r.count}</b><button onclick="removeRow(${p.rows.length-1-i})" aria-label="Delete">×</button></div>`).join('')}<div class="section"><h3>${t('photo')}</h3></div><p class="muted">${t('phototip')}</p>${p.photo?`<img class="photo" src="${p.photo}" alt="">`:''}<label class="upload">＋ ${t('upload')}<input id="photo" type="file" accept="image/*"></label><label class="finished-toggle"><input type="checkbox" ${p.finished?'checked':''} onchange="setFinished(this.checked)"> この作品は完成しました</label><button class="btn wide save-exit" onclick="saveExit()">✓ 保存して終了</button><p class="muted small">${t('local')}</p>${ad()}`}
function setFinished(yes){current().finished=yes;save();render()}
function saveExit(){save();if(!storageOkay)return;go('studio')}

function book(){return `<div class="eyebrow">MY FOLIO. / NOTEBOOK</div><h1 class="title">Create your<br>own edition.</h1><p class="muted">${t('threshold')}</p><div class="section"><h3>${t('edition')}</h3></div><div class="edition-list">${[5,10,15].map((n,i)=>`<button class="edition-card ${s.edition===n?'chosen':''}" onclick="setEdition(${n})"><span class="edition-no">0${i+1}</span><span><strong>${['MINI','STANDARD','FULL'][i]}</strong><small>${n} ${t('total')} · ${n*2} INTERIOR PAGES + COVER</small></span><b>${s.edition===n?'●':'○'}</b></button>`).join('')}</div><div class="section cover-section-heading"><h3>CHOOSE YOUR COVER</h3></div><div class="cover-grid">${[['yellow','cover-yellow.jpg','RETRO YELLOW'],['navy','cover-navy.jpg','RETRO NAVY'],['white','cover-white.jpg','CLASSIC WHITE'],['blue','cover-blue.jpg','CLASSIC BLUE']].map(([key,file,label])=>`<button class="cover-option ${s.design===key?'chosen':''}" onclick="setDesign('${key}')"><img src="assets/${file}" alt="${label}"><small>${label}</small></button>`).join('')}</div>${['white','blue'].includes(s.design)?`<div class="cover-photo-upload"><label class="upload">＋ 表紙の写真を選ぶ<input id="cover-upload" type="file" accept="image/*"></label>${s.coverPhoto?`<img class="cover-photo-thumb" src="${s.coverPhoto}" alt="表紙写真">`:''}<p class="muted small">写真の位置・拡大は印刷前に最終調整します。</p></div>`:''}<div class="notice">${t('limited')}: ${s.projects.length} / ${t('selectCount')}: ${s.edition}</div><button class="btn wide" onclick="go('choose')" ${s.projects.length<s.edition?'disabled':''}>${t('next')} → ${t('select')}</button>${s.projects.length<s.edition?`<p class="muted small">${t('notEnough')}</p>`:''}${ad()}`}

function choose(){let chosen=s.selected.filter(id=>s.projects.some(p=>p.id===id));return `<div class="eyebrow">MY FOLIO. / CURATE</div><h1 class="title">${t('select')}</h1><p class="muted">${t('choose')}: ${chosen.length} / ${s.edition}</p><div class="choose-list">${s.projects.map(p=>`<label class="choose-item"><input type="checkbox" ${chosen.includes(p.id)?'checked':''} onchange="toggle('${p.id}',this.checked)"><span class="choose-thumb">${p.photo?`<img src="${p.photo}" alt="">`:'✳'}</span><span><b>${e(p.name)}</b><small>${p.rows.length} ROWS</small></span></label>`).join('')}</div><div class="toolbar"><button class="btn light" onclick="go('book')">← ${t('back')}</button><button class="btn" onclick="startPreview()" ${chosen.length!==s.edition?'disabled':''}>${t('ready')} →</button></div>`}
function makePages(){let ps=s.selected.map(id=>s.projects.find(p=>p.id===id)).filter(Boolean).slice(0,s.edition);return [{kind:'cover'},...ps.map((p,i)=>({kind:'project',p,i})),{kind:'end'}]}
function photo(p){return p.photo?`<img class="preview-photo" src="${p.photo}" alt="">`:`<div class="preview-placeholder">✳</div>`}
function magazineSpread(){let pages=makePages(),page=pages[Math.min(s.page,pages.length-1)]||pages[0],isCover=page.kind==='cover',isEnd=page.kind==='end',p=page.p;let cover={yellow:'cover-yellow.jpg',navy:'cover-navy.jpg',white:'cover-white-blank.jpg',blue:'cover-blue-blank.jpg'}[s.design]||'cover-yellow.jpg';let back={yellow:'back-yellow.jpg',navy:'back-navy.jpg',white:'back-white.jpg',blue:'back-blue.jpg'}[s.design]||'back-yellow.jpg';let yarns=p?(p.yarns?.length?p.yarns.map(y=>`${e(y.name)} ${e(y.shade)} ${e(y.amount)}`).join(' / '):e(p.yarn)):' ';
if(isCover||isEnd)return `<div class="book-stage single-book ${isEnd?'back-state':'cover-state'}"><div class="single-page ${isEnd?'book-back':'book-front'}"><img src="assets/${isEnd?back:cover}" alt="${isEnd?'Back cover':'Cover'}">${isCover&&['white','blue'].includes(s.design)?`${s.coverPhoto?`<img class="cover-user-photo" src="${s.coverPhoto}" alt="Cover photo">`:''}<img class="cover-logo-overlay" src="assets/cover-logo-${s.design}.png" alt="FOLIO.">`: ''}</div><div class="watermark">FOLIO. PREVIEW</div></div>`;
return `<div class="book-stage open-book"><div class="spread editorial-spread folio-editorial-v2"><section class="spread-left"><h2 class="product-heading">THE PRODUCT</h2><div class="product-photo">${photo(p)}</div><div class="folio-page-footer"><span>${String(page.i*2+1).padStart(2,'0')}</span><span>PROJECT ${String(page.i+1).padStart(2,'0')} / ${s.edition}</span></div></section><section class="spread-right"><div class="folio-materials"><h2 class="recipe-heading">MATERIALS.</h2><div class="folio-cutout" aria-hidden="true">${photo(p)}</div><div class="folio-material-copy"><p><b>使用糸</b> ${yarns}</p><p><b>カラー</b> ${e((p.yarns||[]).map(y=>y.shade).filter(Boolean).join(' / '))||'—'}</p><p><b>針</b> ${e(p.needle)||'—'}</p><p><b>編み方</b> ${e([...new Set((p.rows||[]).map(r=>r.stitch))].filter(Boolean).join('、'))||'—'}</p></div></div><div class="folio-recipe"><div class="folio-recipe-heading"><h2 class="recipe-heading">HOW TO MAKE.</h2><span>STEP BY STEP / ${String((p.rows||[]).length).padStart(2,"0")} ROWS</span></div><div class="recipe-rows">${(p.rows||[]).map((r,i)=>`<p><b>${i+1}段目</b> ${e(r.stitch)} / ${e(String(r.count??''))}目 ${e(r.note)}</p>`).join('')||'<p>制作記録はありません</p>'}</div></div><div class="folio-page-footer folio-page-footer-right"><span>FOLIO. / YOUR WORK, KEPT FOREVER.</span><span>${String(page.i*2+2).padStart(2,'0')}</span></div><div class="watermark">FOLIO. PREVIEW</div></section></div></div>`}

function preview(){let pages=makePages();return `<div class="eyebrow">MY FOLIO. / PREVIEW</div><h1 class="title">Your edition.</h1><p class="muted">${s.edition} ${t('total')} · ${s.design.toUpperCase()}</p>${magazineSpread()}<div class="preview-controls"><button class="btn light" onclick="turn(-1)" ${s.page===0?'disabled':''}>← ${t('prev')}</button><span>${s.page+1} / ${pages.length}</span><button class="btn light" onclick="turn(1)" ${s.page===pages.length-1?'disabled':''}>${t('next')} →</button></div><p class="muted small">${t('sample')} · 本番では文字が読み取れない低画質画像をサーバーで生成します。</p><button class="btn wide" disabled>${t('order')} · COMING SOON</button><p class="muted small" style="text-align:center">※「注文する」を押すと、外部サイト「BASE」に移動します。お支払い・配送先の入力はBASEで行います。（連携準備中）</p><button class="textbtn back-link" onclick="go('choose')">← ${t('edit')}</button>${ad()}`}

function render(){header();updateAccountButton();$('app').innerHTML=({home,studio,new:create,record,book,choose,preview}[s.view]||home)();if(s.view==='home')startCarousel();if(s.view==='new')$('create').onsubmit=ev=>{ev.preventDefault();let f=new FormData(ev.target),yarns=collectYarns(ev.target),p={id:crypto.randomUUID(),name:String(f.get('name')).trim(),yarn:yarns.map(y=>y.name).join(' / '),yarns,yarnColor:'#26354b',needle:f.get('needle'),memo:f.get('memo'),template:f.get('template'),size:f.get('size'),finished:false,rows:[],photo:null};s.projects.unshift(p);s.active=p.id;save();go('record')};if(s.view==='record'&&current()){$('rowform').onsubmit=ev=>{ev.preventDefault();addRow()};$('photo').onchange=upload}if(s.view==='book'&&$('cover-upload'))$('cover-upload').onchange=ev=>uploadImage(ev, data=>{s.coverPhoto=data;save();render()})}

function openProject(id){if(!accountUser){openAccount();accountNotice(at('editingNeeded'));return;}s.active=id;go('record')}
function addRow(){let p=current(),f=new FormData($('rowform'));p.rows.push({count:Number(f.get('count')),color:f.get('color'),stitch:f.get('stitch'),note:f.get('note')});save();render()}
function undo(){let p=current();if(p.rows.length){p.rows.pop();save();render()}}
function removeRow(i){current().rows.splice(i,1);save();render()}
function setEdition(n){s.edition=n;s.selected=s.selected.slice(0,n);save();render()}
function setDesign(v){s.design=v;save();render()}
function toggle(id,on){if(on&&s.selected.length>=s.edition){alert(`${s.edition} max`);render();return}s.selected=on?[...s.selected,id]:s.selected.filter(x=>x!==id);save();render()}
function startPreview(){if(s.selected.length!==s.edition)return;s.page=0;go('preview')}
let folioTurning=false;
function turn(d){
  if(folioTurning)return;
  const target=Math.max(0,Math.min(makePages().length-1,s.page+d));
  if(target===s.page)return;
  // Interior spreads switch instantly; only opening/closing the book is animated.
  const last=makePages().length-1;
  const boundary=(s.page===0||s.page===last||target===0||target===last);
  if(!boundary){s.page=target;save();render();return;}
  const stage=document.querySelector('.book-stage');
  if(!stage){s.page=target;save();render();return}
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){s.page=target;save();render();return}
  folioTurning=true;
  document.querySelectorAll('.preview-controls button').forEach(b=>b.disabled=true);
  stage.classList.add(d>0?'turn-next':'turn-prev');
  // Swap the sheet at the halfway point, like a real page turning over.
  window.setTimeout(()=>{
    s.page=target;save();render();
    const incoming=document.querySelector('.book-stage');
    if(incoming)incoming.classList.add(d>0?'turn-enter-next':'turn-enter-prev');
    window.setTimeout(()=>{incoming?.classList.remove('turn-enter-next','turn-enter-prev');folioTurning=false},490);
  },460);
}
async function upload(ev){
 const f=ev.target.files?.[0];if(!f||!f.type.startsWith('image/'))return;
 const p=current();if(!p)return;
 try{await storePhoto(photoKey(p.id),f);if(p.photo?.startsWith('blob:'))URL.revokeObjectURL(p.photo);p.photo=URL.createObjectURL(f);save();render();if(accountUser)await pushPhotoToCloud(p.id,f)}
 catch(err){console.error(err);alert('写真の保存に失敗しました。端末の空き容量とブラウザ設定を確認してください。')}
}
async function uploadImage(ev,cb){
 const f=ev.target.files?.[0];if(!f||!f.type.startsWith('image/'))return;
 try{await storePhoto('cover',f);const url=URL.createObjectURL(f);if(s.coverPhoto?.startsWith('blob:'))URL.revokeObjectURL(s.coverPhoto);cb(url)}
 catch(err){console.error(err);alert('表紙写真の保存に失敗しました。')}
}
function voice(){let SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert('Voice input unavailable in this browser.');return}let r=new SR();r.lang=s.lang==='ja'?'ja-JP':s.lang==='ko'?'ko-KR':'en-US';r.onresult=ev=>{let str=ev.results[0][0].transcript,f=$('rowform');f.elements.note.value=str;let m=str.match(/(\d+)\s*(目|코|stitches?|sts?)/i);if(m)f.elements.count.value=m[1]};r.onerror=()=>alert('Microphone permission required.');r.start()}
$('lang').onchange=ev=>{s.lang=ev.target.value;save();render()};

// Account and cloud sync: email one-time code, HttpOnly session cookie, private per-user D1 rows.
let accountUser=null, cloudEnabled=false,cloudTimers=new Map(),cloudBusy=false;
const authI18n={"ja":{"login":"ログイン / 新規登録","entry":"ログイン / 登録","info":"メールに届く6桁の認証コードでログインできます。初回は自動的に登録されます。","email":"メールアドレス","send":"認証コードを送信","code":"6桁の認証コード（10分間有効）","verify":"ログインする","logout":"ログアウト","cloud":"作品の文字情報はアカウントに保存されます。写真はログイン後にクラウド同期されます。","privacy":"メールアドレスはログイン・アカウント管理に使用します。販促メールの送信には別途同意が必要です。","sending":"送信中…","sent":"認証コードをメールで送りました。","checking":"確認中…","loginNeeded":"作品の記録・アルバム作成にはログインが必要です。","editingNeeded":"作品を編集するにはログインしてください。"},"en":{"login":"Log in / Sign up","entry":"Log in / Sign up","info":"Sign in with a 6-digit code sent to your email. An account is created automatically the first time.","email":"Email address","send":"Send verification code","code":"6-digit verification code (valid for 10 minutes)","verify":"Log in","logout":"Log out","cloud":"Project details are saved to your account. Photos sync to the cloud after login.","privacy":"Your email is used for login and account management. Marketing emails require separate consent.","sending":"Sending…","sent":"We sent a verification code to your email.","checking":"Verifying…","loginNeeded":"Log in to record projects or create your album.","editingNeeded":"Log in to edit your project."},"ko":{"login":"로그인 / 회원가입","entry":"로그인 / 회원가입","info":"이메일로 받은 6자리 인증번호로 로그인하세요. 처음 이용하면 계정이 자동으로 생성됩니다.","email":"이메일 주소","send":"인증번호 보내기","code":"6자리 인증번호 (10분간 유효)","verify":"로그인","logout":"로그아웃","cloud":"작품의 텍스트 정보는 계정에 저장됩니다. 사진은 로그인 후 클라우드에 동기화됩니다.","privacy":"이메일 주소는 로그인 및 계정 관리에 사용됩니다. 홍보 메일은 별도의 동의가 필요합니다.","sending":"전송 중…","sent":"이메일로 인증번호를 보냈습니다.","checking":"확인 중…","loginNeeded":"작품 기록 및 앨범 제작은 로그인이 필요합니다.","editingNeeded":"작품을 수정하려면 로그인하세요."}};
function at(key){return (authI18n[s.lang]||authI18n.ja)[key]||authI18n.ja[key]}
function updateAccountButton(){let b=$('account-btn');if(b)b.textContent=accountUser?`◯ ${accountUser.email.split('@')[0]}`:at('entry')}
function accountNotice(message){let el=$('auth-status');if(el)el.textContent=message}
let authMode='login';
function authFormMode(mode){authMode=mode;openAccount()}
function openAccount(){
 let m=$('auth-modal');if(!m)return;document.body.appendChild(m);m.hidden=false;document.body.classList.add('dialog-open');
 const logged=!!accountUser,login=authMode==='login',title=login?'ログイン':authMode==='register'?'新規会員登録':authMode==='migrate'?'既存アカウントの引き継ぎ':'パスワード再設定';
 m.innerHTML=`<div class="auth-backdrop" onclick="closeAccount()"></div><section class="auth-panel" role="dialog" aria-modal="true" aria-label="FOLIO. account"><button class="auth-close" onclick="closeAccount()">×</button><div class="auth-brand">FOLIO.</div><h2 class="auth-heading">${logged?'MY ACCOUNT':title}</h2>${logged?`<p>${e(accountUser.email)}</p><p class="muted small">${e(at('cloud'))}</p><button class="btn wide" onclick="logoutAccount()">${e(at('logout'))}</button>`:`<p class="muted small">${login?'登録済みのメールアドレスとパスワードでログインできます。':'メールで本人確認をしてからパスワードを設定します。'}</p><form onsubmit="${login?'passwordLogin(event)':'passwordRequest(event)'}"><label for="auth-email">メールアドレス</label><input id="auth-email" type="email" required autocomplete="email" placeholder="you@example.com">${login?`<label for="auth-password">パスワード</label><div style="position:relative"><input id="auth-password" type="password" required autocomplete="current-password" minlength="12" style="padding-right:52px;width:100%;box-sizing:border-box"><button type="button" aria-label="パスワードを表示" aria-pressed="false" onclick="togglePasswordVisibility(this,'auth-password')" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:transparent;border:0;cursor:pointer;padding:8px;font-size:19px;line-height:1" title="パスワードを表示">👁</button></div><button class="btn wide" type="submit">ログイン</button>`:`<button class="btn wide" type="submit">認証コードを送信</button>`}</form>${login?'':`<form id="password-confirm-form" onsubmit="passwordConfirm(event)" hidden><label for="auth-code">メールに届いた6桁のコード</label><input id="auth-code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required><label for="auth-new-password">新しいパスワード（12文字以上）</label><input id="auth-new-password" type="password" autocomplete="new-password" minlength="12" maxlength="128" required><button class="btn wide" type="submit">パスワードを設定して続ける</button></form>`}<div class="auth-links"><button type="button" onclick="authFormMode('register')">新規会員登録</button><button type="button" onclick="authFormMode('reset')">パスワードを忘れた方</button>${login?'':`<button type="button" onclick="authFormMode(\'login\')">ログインに戻る</button>`}</div>`}<p id="auth-status" role="status" class="muted small"></p><p class="muted small">${e(at('privacy'))}</p></section>`;
}
function closeAccount(){let m=$('auth-modal');if(m)m.hidden=true;document.body.classList.remove('dialog-open')}
async function api(path,opts={}){let r=await fetch('/api'+path,{credentials:'same-origin',...opts});let data=await r.json().catch(()=>({error:'応答を読み取れません'}));if(!r.ok)throw new Error(data.error||'通信エラー');return data}
function togglePasswordVisibility(button,id){const input=$(id);if(!input)return;const visible=input.type==='password';input.type=visible?'text':'password';button.setAttribute('aria-label',visible?'パスワードを隠す':'パスワードを表示');button.setAttribute('aria-pressed',String(visible));button.title=visible?'パスワードを隠す':'パスワードを表示';button.textContent=visible?'🙈':'👁'}
async function passwordLogin(ev){ev.preventDefault();accountNotice('ログイン中…');try{const result=await api('/auth/password/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:$('auth-email').value.trim(),password:$('auth-password').value})});accountUser=result.user;closeAccount();await loadCloudProjects(true)}catch(err){accountNotice(err.message)}}
async function passwordRequest(ev){ev.preventDefault();accountNotice('認証メールを送信中…');try{await api('/auth/password/request',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:$('auth-email').value.trim()})});$('password-confirm-form').hidden=false;accountNotice('メールに届いたコードと新しいパスワードを入力してください。')}catch(err){accountNotice(err.message)}}
async function passwordConfirm(ev){ev.preventDefault();accountNotice('確認中…');try{const result=await api('/auth/password/confirm',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:$('auth-email').value.trim(),code:$('auth-code').value,password:$('auth-new-password').value})});accountUser=result.user;closeAccount();await loadCloudProjects(true)}catch(err){accountNotice(err.message)}}
async function pushPhotoToCloud(id,blob){
 if(!accountUser||!cloudEnabled)return;
 const p=s.projects.find(x=>x.id===id);if(!p)return;
 try{
  await api('/projects',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({project:{...p,photo:null}})});
  const response=await fetch('/api/photos/'+encodeURIComponent(id),{method:'PUT',credentials:'same-origin',headers:{'content-type':blob.type},body:blob});
  const result=await response.json().catch(()=>({}));
  if(!response.ok)throw Error(result.error||'Photo upload failed');
  const st=$('save-state');if(st)st.textContent='✓ 写真もクラウドに保存済み';
 }catch(err){console.error('Photo sync failed',err);const st=$('save-state');if(st)st.textContent='⚠ 写真はこの端末のみ（クラウド同期失敗）';alert('写真はこの端末に保存されていますが、クラウドへのアップロードに失敗しました。通信環境をご確認ください。')}
}
async function fetchPhotoFromCloud(id){
 try{
  const response=await fetch('/api/photos/'+encodeURIComponent(id),{credentials:'same-origin'});
  if(response.status===404)return null;
  if(!response.ok)throw Error('Photo download failed');
  const blob=await response.blob();await storePhoto(photoKey(id),blob);return URL.createObjectURL(blob);
 }catch(err){console.error('Photo download failed',err);return null}
}
async function syncProjectPhotos(local){
 for(const p of s.projects){
  if(!accountUser)return;
  const matching=local.find(x=>x.id===p.id);
  const existing=matching?.photo?await idbGet('photos',photoKey(p.id)).catch(()=>null):null;
  // Prefer the server's existing photo to avoid overwriting a newer image from another device.
  const cloudPhoto=await fetchPhotoFromCloud(p.id);
  if(cloudPhoto){
   if(p.photo?.startsWith('blob:'))URL.revokeObjectURL(p.photo);
   p.photo=cloudPhoto;
  }else if(existing){
   p.photo=matching.photo;
   await pushPhotoToCloud(p.id,existing);
  }
 }
 save();render();
}
async function loadCloudProjects(afterLogin=false){try{let result=await api('/projects');let remote=result.projects||[];let local=s.projects||[];cloudEnabled=true;
 if(local.length){let importLocal=confirm(`このブラウザに作品が${local.length}件あります。ログインしたアカウントに取り込みますか？
「キャンセル」ではクラウド上の作品だけを表示します。`);if(importLocal){for(let p of local){if(!remote.some(x=>x.id===p.id)){await api('/projects',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({project:{...p,photo:null}})});remote.push(p)}}}}
 s.projects=remote.map(p=>{let localMatch=local.find(l=>l.id===p.id);return {...p,photo:localMatch?.photo||null}});s.active=null;s.selected=[];s.view='studio';save();render();await syncProjectPhotos(local);
 }catch(err){cloudEnabled=false;alert('クラウドデータの取得に失敗しました: '+err.message)}}
async function logoutAccount(){if(!confirm('ログアウトしますか？ この端末にはログイン中の作品を残しません。'))return;try{await api('/auth/logout',{method:'POST',headers:{'content-type':'application/json'},body:'{}'})}catch{}accountUser=null;cloudEnabled=false;cloudTimers.forEach(clearTimeout);cloudTimers.clear();s.projects=[];s.active=null;s.selected=[];s.coverPhoto=null;save();closeAccount();go('home')}
function queueCloudSave(){if(!cloudEnabled||!accountUser)return;for(let p of s.projects){clearTimeout(cloudTimers.get(p.id));let snapshot=structuredClone(p);snapshot.photo=null; cloudTimers.set(p.id,setTimeout(async()=>{try{await api('/projects',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({project:snapshot})});let st=$('save-state');if(st)st.textContent='✓ クラウドに保存済み'}catch(err){let st=$('save-state');if(st)st.textContent='⚠ クラウド保存に失敗（この端末には保存済み）';console.error('FOLIO cloud save:',err)}},550))}}
async function initAccount(){try{let {user}=await api('/me');if(user){accountUser=user;await loadCloudProjects(false)}else{cloudEnabled=false;updateAccountButton()}}catch{cloudEnabled=false;updateAccountButton()}}
initializeStorage();
