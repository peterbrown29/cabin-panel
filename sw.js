// Cabin Panel service worker. Bump C on every release, or installed phones keep the old version.
// v23: caches named cpsv-* hold the user's downloaded 3D route packs; never delete them on activate.
const C='cabin-panel-v26e';
const F=['./','index.html','app.js','app.css','manifest.webmanifest','icon-180.png','icon-512.png','icon-512-maskable.png',
  'bg-day.webp','bg-ocean.webp','bg-sunset.webp','bg-night.webp','bg-appday.webp','bg-appnight.webp',
  'bg-apron.webp','bg-apronnight.webp','rwy.json','twy.json','lmk.json',
  'bg-wx-sct.webp','bg-wx-bkn.webp','bg-wx-tops.webp','bg-wx-ovc.webp','bg-wx-rain.webp','bg-wx-storm.webp','bg-wx-haze.webp','bg-wx-fog.webp','bg-wx-tops-dusk.webp','bg-wx-ovc-dusk.webp','bg-wx-storm-dusk.webp','bg-wx-ovc-night.webp','bg-wx-storm-night.webp','bg-wx-fog-night.webp','drops-light.webp','drops-heavy.webp',
  'g-f4-adi.webp','g-f4-alt.webp','g-f4-aoa.webp','g-f4-asi.webp','g-f4-clock.webp','g-f4-g.webp','g-f4-hsi.webp','g-f4-panel.webp','g-f4-vvi.webp','g-p51-ai.webp','g-p51-alt.webp','g-p51-asi.webp','g-p51-cmp.webp','g-p51-dg.webp','g-p51-fuel.webp','g-p51-mp.webp','g-p51-panel.webp','g-p51-rpm.webp','g-p51-tb.webp','g-p51-vsi.webp',
  'svpack.js','sv3d.js','three.module.min.js','bcbp-zx.js',
  'plane.webp','bezel.webp','splash-1290x2796.jpg','splash-1179x2556.jpg','splash-1170x2532.jpg',
  'fonts/B612-Regular.woff2','fonts/B612-Bold.woff2','fonts/B612Mono-Regular.woff2','fonts/B612Mono-Bold.woff2','fonts/OFL.txt',
  'patches/bass.svg','patches/bm.svg','patches/butter.svg','patches/c2c.svg','patches/caps.svg','patches/diary.svg','patches/f10.svg','patches/f25.svg','patches/f5.svg','patches/f50.svg','patches/first.svg','patches/fl400.svg','patches/intl.svg','patches/k10.svg','patches/long.svg','patches/night.svg','patches/r0.svg','patches/r1.svg','patches/r2.svg','patches/r3.svg','patches/r4.svg','patches/r5.svg','patches/r6.svg','patches/redeye.svg','patches/spot.svg','patches/states.svg','patches/sun.svg','patches/types.svg','patches/uluru.svg',
  'towns.json','patches/dstates.svg','patches/d1000.svg','patches/nullarbor.svg','patches/dnight.svg',
  'game.js','patches/gfirst.svg','patches/gace.svg','patches/gmom.svg','patches/gground.svg',
  'v-v1.mp3','v-rotate.mp3','v-positive-climb.mp3','v-top-of-descent.mp3','v-approaching.mp3','v-fifty-above.mp3','v-minimums.mp3','v-50.mp3','v-40.mp3','v-30.mp3','v-20.mp3','v-10.mp3','v-landed.mp3','v-parked.mp3','v-target-locked.mp3','v-altitude.mp3','v-bingo.mp3','v-takeoff-roll.mp3','v-cruise.mp3','v-tod-5.mp3','v-ten-thousand.mp3','v-go-around.mp3','v-turbulence.mp3','v-state-line.mp3','v-drive-on.mp3','v-flight-mode.mp3','v-drive-started.mp3','v-rest-stop.mp3','v-arriving.mp3','v-game-on.mp3','v-game-off.mp3','v-contact.mp3','v-fox.mp3','v-guns.mp3','v-splash.mp3','v-mothership.mp3','v-ground-hot.mp3','v-winchester.mp3','v-gunship.mp3','v-mission.mp3','v-badge.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&!x.startsWith('cpsv-')).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())))});
// The page asks for status so it only shows "Saved for offline use" when the cache really holds every file.
self.addEventListener('message',e=>{if(!e.data||e.data.type!=='status'||!e.ports[0])return;
  caches.open(C).then(async c=>{const miss=[];for(const f of F){if(!(await c.match(f)))miss.push(f)}e.ports[0].postMessage({C,total:F.length,miss})})
  .catch(err=>e.ports[0].postMessage({C,total:F.length,miss:F.slice(),err:String(err)}))});
