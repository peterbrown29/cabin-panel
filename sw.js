// Cabin Panel service worker. Bump C on every release, or installed phones keep the old version.
// v23: caches named cpsv-* hold the user's downloaded 3D route packs; never delete them on activate.
const C='cabin-panel-v25';
const F=['./','index.html','app.js','app.css','manifest.webmanifest','icon-180.png','icon-512.png','icon-512-maskable.png',
  'bg-day.webp','bg-ocean.webp','bg-sunset.webp','bg-night.webp','bg-appday.webp','bg-appnight.webp',
  'bg-apron.webp','bg-apronnight.webp','rwy.json','twy.json','lmk.json',
  'bg-wx-sct.webp','bg-wx-bkn.webp','bg-wx-tops.webp','bg-wx-ovc.webp','bg-wx-rain.webp','bg-wx-storm.webp','bg-wx-haze.webp','bg-wx-fog.webp','bg-wx-tops-dusk.webp','bg-wx-ovc-dusk.webp','bg-wx-storm-dusk.webp','bg-wx-ovc-night.webp','bg-wx-storm-night.webp','bg-wx-fog-night.webp','drops-light.webp','drops-heavy.webp',
  'g-f4-adi.webp','g-f4-alt.webp','g-f4-aoa.webp','g-f4-asi.webp','g-f4-clock.webp','g-f4-g.webp','g-f4-hsi.webp','g-f4-panel.webp','g-f4-vvi.webp','g-p51-ai.webp','g-p51-alt.webp','g-p51-asi.webp','g-p51-cmp.webp','g-p51-dg.webp','g-p51-fuel.webp','g-p51-mp.webp','g-p51-panel.webp','g-p51-rpm.webp','g-p51-tb.webp','g-p51-vsi.webp',
  'svpack.js','sv3d.js','three.module.min.js','bcbp-zx.js',
  'plane.webp','bezel.webp','splash-1290x2796.jpg','splash-1179x2556.jpg','splash-1170x2532.jpg',
  'fonts/B612-Regular.woff2','fonts/B612-Bold.woff2','fonts/B612Mono-Regular.woff2','fonts/B612Mono-Bold.woff2','fonts/OFL.txt',
  'patches/bass.svg','patches/bm.svg','patches/butter.svg','patches/c2c.svg','patches/caps.svg','patches/diary.svg','patches/f10.svg','patches/f25.svg','patches/f5.svg','patches/f50.svg','patches/first.svg','patches/fl400.svg','patches/intl.svg','patches/k10.svg','patches/long.svg','patches/night.svg','patches/r0.svg','patches/r1.svg','patches/r2.svg','patches/r3.svg','patches/r4.svg','patches/r5.svg','patches/r6.svg','patches/redeye.svg','patches/spot.svg','patches/states.svg','patches/sun.svg','patches/types.svg','patches/uluru.svg',
  'towns.json','patches/dstates.svg','patches/d1000.svg','patches/nullarbor.svg','patches/dnight.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&!x.startsWith('cpsv-')).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())))});
// The page asks for status so it only shows "Saved for offline use" when the cache really holds every file.
self.addEventListener('message',e=>{if(!e.data||e.data.type!=='status'||!e.ports[0])return;
  caches.open(C).then(async c=>{const miss=[];for(const f of F){if(!(await c.match(f)))miss.push(f)}e.ports[0].postMessage({C,total:F.length,miss})})
  .catch(err=>e.ports[0].postMessage({C,total:F.length,miss:F.slice(),err:String(err)}))});
