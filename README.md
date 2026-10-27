# FOLIO. v8 — interactive local prototype

Open `index.html` or serve this directory with `python3 -m http.server 8000`.

## Updated
- User-supplied Canva image logos/headings (background removed); original font files not distributed.
- Two-tab navigation, carousel, project archive, multiple yarn entries and color pickers.
- Guided starter templates: circular top-down beanie has an example per-row guide; flat beanie and bucket hat are **guidance placeholders**, not complete patterns. Sizing is an approximate guide, not a guaranteed fit.
- Row saving, local persistence, save-and-exit, completion status and resume.
- Four user-supplied notebook covers; upload photo for the two photo-cover designs.
- 5/10/15-project selection and magazine-style cover/product/recipe preview.
- BASE redirect notice (not connected; order button disabled).

## Not production ready
Data is only stored in this browser's localStorage. Photos may exhaust storage. No login, cloud privacy, backup, admin workflow, real order or payment processing, Canva editing integration, or print-ready PDF generation. Browser-side previews are **not screenshot-proof** and are not truly protected low-resolution server previews. The layout only displays up to 12 recipe rows; a real printing pipeline must paginate **all rows**, add bleeds, respect binding/trim and printer specifications, and validate every page before taking payment. No actual advertising partners are integrated.

For real deployment, implement authenticated private Cloudflare D1/R2 backend and immutable order snapshots, server-generated protected previews, and BASE purchase-to-order reconciliation. Use the Canva lettering graphics in compliance with applicable Canva/font licensing terms.

## v13 preview transition update
- Cover to first spread and first spread to cover retain the opening/closing animation.
- Last spread to back cover and back cover to last spread retain the opening/closing animation.
- Navigation between interior spreads changes instantly without an animation.
- Login, user accounts, cross-device cloud sync and customer management are NOT implemented in this static prototype. They require an authenticated backend, authorization policies and privacy/consent flows before launch.


## Ver.15 — full-resolution local photo storage
- Photos are stored as original `Blob` files in IndexedDB, **not** in localStorage; no resizing/recompression occurs.
- Project metadata is stored in IndexedDB. A small image-free fallback is stored in localStorage. Existing v14 localStorage data is imported once and old keys are left intact.
- Photos stored in IndexedDB are still **device/browser-local**, not backed up across devices. Do not clear browser site data until cloud photo upload is deployed and verified.
- Cloud project sync currently sends **metadata only**. Original photos require a secure Cloudflare R2 upload endpoint and download permissions before true cross-device image sync is available.
- Open via a local web server (e.g. `python3 -m http.server 8000` from this folder, then visit `http://localhost:8000`); file:// storage may be restricted.


## Ver.16 修正
Ver.15でアプリが空白になる初期化順序の不具合を修正しました。
ローカル環境でIndexedDBがブロックされる場合は、ターミナルでこのフォルダに移動し `python3 -m http.server 8000` を実行して `http://localhost:8000` をChromeで開いてください。
既存のブラウザデータを消さないでください。`file://` と `http://localhost` は別の保存領域なので自動移行できない場合があります。


Ver.17 hotfix: restores missing DOM helper ($) that prevented rendering. Skips remote account probe on file:// preview. Existing browser data is not cleared.
