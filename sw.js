// Cabin Panel service worker. Bump C on every release, or installed phones keep the old version.
const C='cabin-panel-v21';
const F=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png','icon-512-maskable.png',
  'bg-day.webp','bg-ocean.webp','bg-sunset.webp','bg-night.webp','bg-appday.webp','bg-appnight.webp',
  'bg-apron.webp','bg-apronnight.webp','rwy.json',
  'plane.webp','bezel.webp','splash-1290x2796.jpg','splash-1179x2556.jpg','splash-1170x2532.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())))});
// The page asks for status so it only shows "Saved for offline use" when the cache really holds every file.
self.addEventListener('message',e=>{if(!e.data||e.data.type!=='status'||!e.ports[0])return;
  caches.open(C).then(async c=>{const miss=[];for(const f of F){if(!(await c.match(f)))miss.push(f)}e.ports[0].postMessage({C,total:F.length,miss})})
  .catch(err=>e.ports[0].postMessage({C,total:F.length,miss:F.slice(),err:String(err)}))});
