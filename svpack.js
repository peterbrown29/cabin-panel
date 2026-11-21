/* Cabin Panel v23: 3D route pack (terrain + satellite tiles for the synthetic window view).
   The phone fetches the tiles itself from each provider and keeps them in Cache Storage ("cpsv-tiles").
   Nothing here is shipped in the repo: EOX does not allow its tiles to be re-hosted as a dataset.
   Sources (all CORS-enabled for web pages, checked 20 Nov 2026):
     Imagery  EOX Sentinel-2 cloudless 2016 (s2cloudless_3857, CC BY 4.0). Never the 2018+ layers (CC BY-NC-SA).
     Terrain  Mapterhorn (terrarium WebP, open data incl. Copernicus GLO-30).
     Night    NASA GIBS VIIRS Black Marble 2016 (NASA open data).
     Airspace OpenAIP Australia export (CC BY-NC 4.0, personal non-commercial use). Its storage host sends no CORS
              header, so it only works through Cabin Panel's private proxy once that proxy allows storage.openaip.net.
   Display only: never touches the phase machine, logbook or GPS. */
export const CACHE="cpsv-tiles";
const R=6371008.8,rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
const IDX="cp_sv_packs",SZ="cp_sv_sz";
export const SRC={
  i:(z,x,y)=>`https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/${z}/${y}/${x}.jpg`,
  d:(z,x,y)=>`https://tiles.mapterhorn.com/${z}/${x}/${y}.webp`,
  n:(z,x,y)=>`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/2016-01-01/GoogleMapsCompatible_Level8/${z}/${y}/${x}.png`
};
export const ASP_URL="https://storage.openaip.net/openaip-system-exports/au_asp.geojson";
export const ASP_KEY=id=>new URL("./sv-asp/"+id+".json",location.href).href;
/* measured average tile bytes (20 Nov 2026 samples along SYD-MEL and SYD-PER); only used for the size estimate */
const AVG={"d8":110000,"i10":14000,"d11":49000,"i12":15000,"i14":10000,"n8":45000};
export const keyUrl=k=>{const [l,z,x,y]=k.split("/");return SRC[l](+z,+x,+y)};
const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}};
let SZM=null;const szm=()=>SZM||(SZM=ls.get(SZ,{}));const szSave=()=>ls.set(SZ,SZM||{});
export const packs=()=>ls.get(IDX,{});
const packsSave=p=>ls.set(IDX,p);
export const have=k=>{const v=szm()[k];return v!=null&&v>0};
export const known=k=>szm()[k]!=null;

function dist(a,b){const p1=rad(a.lat),p2=rad(b.lat),dp=p2-p1,dl=rad(b.lon-a.lon);const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(h)))}
function gc(a,b,f){const p1=rad(a.lat),l1=rad(a.lon),p2=rad(b.lat),l2=rad(b.lon),d=dist(a,b)/R;if(d<1e-9)return {lat:a.lat,lon:a.lon};
  const A=Math.sin((1-f)*d)/Math.sin(d),B=Math.sin(f*d)/Math.sin(d);
  const x=A*Math.cos(p1)*Math.cos(l1)+B*Math.cos(p2)*Math.cos(l2),y=A*Math.cos(p1)*Math.sin(l1)+B*Math.cos(p2)*Math.sin(l2),z=A*Math.sin(p1)+B*Math.sin(p2);
  return {lat:deg(Math.atan2(z,Math.hypot(x,y))),lon:deg(Math.atan2(y,x))}}
export const merc=(lat,lon)=>[(lon+180)/360,(1-Math.log(Math.tan(Math.PI/4+rad(lat)/2))/Math.PI)/2];
/* every tile at zoom z whose square lies within rKm of point p */
function discTiles(p,z,rKm,set,l){const n=2**z,[mx,my]=merc(p.lat,p.lon),tKm=40075.017*Math.cos(rad(p.lat))/n,rt=rKm/tKm;
  const x0=Math.floor(mx*n-rt),x1=Math.floor(mx*n+rt),y0=Math.max(0,Math.floor(my*n-rt)),y1=Math.min(n-1,Math.floor(my*n+rt));
  for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){const dx=Math.max(0,x-mx*n,mx*n-(x+1)),dy=Math.max(0,y-my*n,my*n-(y+1));
    if(dx*dx+dy*dy<=rt*rt)set.add(l+"/"+z+"/"+(((x%n)+n)%n)+"/"+y)}}
function corrTiles(a,b,z,rKm,set,l){const L=dist(a,b)/1000,tKm=40075.017*Math.cos(rad((a.lat+b.lat)/2))/2**z,step=Math.max(1,Math.min(tKm/3,rKm/2,20)),n=Math.max(1,Math.ceil(L/step));
  for(let i=0;i<=n;i++)discTiles(gc(a,b,i/n),z,rKm,set,l)}
/* Pack recipe. Standard: 60 km wide imagery corridor; Wide: 120 km (the recipe measured in the research). */
export function plan(fr,to,o={}){const wide=o.w==="wide",rows=[];
  const add=(l,z,where,r,fn)=>{const s=new Set();fn(s);rows.push({l,z,where,r,keys:[...s]})};
  add("d",8,"corridor",wide?100:60,s=>corrTiles(fr,to,8,wide?100:60,s,"d"));
  add("i",10,"corridor",wide?60:30,s=>corrTiles(fr,to,10,wide?60:30,s,"i"));
  add("d",11,"airports",40,s=>{discTiles(fr,11,40,s,"d");discTiles(to,11,40,s,"d")});
  add("i",12,"airports",40,s=>{discTiles(fr,12,40,s,"i");discTiles(to,12,40,s,"i")});
  add("i",14,"airports",8,s=>{discTiles(fr,14,8,s,"i");discTiles(to,14,8,s,"i")});
  if(o.bm!==false)add("n",8,"corridor",wide?150:100,s=>corrTiles(fr,to,8,wide?150:100,s,"n"));
  const keys=[...new Set(rows.flatMap(r=>r.keys))];
  let est=0,need=0;for(const r of rows){r.est=r.keys.length*AVG[r.l+r.z];est+=r.est}
  for(const k of keys)if(!known(k)){const [l,z]=k.split("/");need+=AVG[l+z]}
  const aspEst=o.asp?8000000:0;
  return {_fr:fr,_to:to,id:fr.c+"-"+to.c,from:fr.c,to:to.c,w:wide?"wide":"std",bm:o.bm!==false,asp:!!o.asp,km:Math.round(dist(fr,to)/1000),rows,keys,est,need,aspEst}}
export function fmtMB(b){if(!(b>0))return "0 MB";return b>=1e6?(b/1e6).toFixed(b>=1e7?0:1)+" MB":Math.max(1,Math.round(b/1e3))+" kB"}
/* bytes on the phone used by all 3D packs (unique tiles) */
export function used(){let t=0;for(const v of Object.values(szm()))t+=v>0?v:0;for(const p of Object.values(packs()))t+=p.aspB||0;return t}
export function packBytes(p){let t=0;const m=szm();for(const k of p.keys||[])t+=m[k]>0?m[k]:0;return t+(p.aspB||0)}

let RUN=null;
export const running=()=>RUN?{id:RUN.id,done:RUN.done,total:RUN.total,bytes:RUN.bytes}:null;
export function stop(){if(RUN)RUN.stop=true}
/* v24: remember that the user paused a pack, so it isn't carried on by itself */
export function pause(id,on){if(!id)return;const all=packs();if(all[id]){all[id].paused=!!on;packsSave(all)}}
async function fetchTile(url,ms){for(let a=0;a<3;a++){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);
    try{const r=await fetch(url,{mode:"cors",credentials:"omit",cache:"no-store",signal:c.signal});clearTimeout(t);
      if(r.status===404||r.status===204)return {miss:true};
      if(r.status===429||r.status>=500){await new Promise(z=>setTimeout(z,1500*(a+1)));continue}
      if(!r.ok)throw new Error("HTTP "+r.status);
      const ct=r.headers.get("content-type")||"";if(!/^image\//.test(ct))throw new Error("not an image ("+ct+")");
      return {blob:await r.blob(),ct}}
    catch(e){clearTimeout(t);if(a===2)throw e;await new Promise(z=>setTimeout(z,800*(a+1)))}}
  throw new Error("gave up")}
/* Download (or resume) a pack. Polite: at most 4 requests at a time, a short pause between tiles, retries with back-off. */
export async function download(P,onp,opt={}){
  if(RUN)throw new Error("a pack download is already running");
  const conc=Math.max(1,Math.min(4,opt.conc||4));
  const run=RUN={id:P.id,done:0,total:P.keys.length+(P.asp?1:0),bytes:0,stop:false,fail:0,err:""};
  try{if(navigator.storage&&navigator.storage.persist)await navigator.storage.persist()}catch(e){}
  const all=packs();const rec=all[P.id]||{};Object.assign(rec,{id:P.id,from:P.from,to:P.to,w:P.w,bm:P.bm,asp:P.asp,keys:P.keys,at:rec.at||0,started:Date.now(),done:false,paused:false});all[P.id]=rec;packsSave(all);
  const cache=await caches.open(CACHE);const m=szm();let i=0,lastSave=0;
  const todo=P.keys.filter(k=>!known(k));run.done=P.keys.length-todo.length;onp&&onp(run);
  async function worker(){while(!run.stop&&i<todo.length){const k=todo[i++];
      try{const r=await fetchTile(keyUrl(k),20000);
        if(r.miss)m[k]=0;else{await cache.put(keyUrl(k),new Response(r.blob,{headers:{"content-type":r.ct}}));m[k]=r.blob.size;run.bytes+=r.blob.size}}
      catch(e){run.fail++;run.err=String(e&&e.message||e)}
      run.done++;if(Date.now()-lastSave>2000){lastSave=Date.now();szSave()}onp&&onp(run);
      await new Promise(z=>setTimeout(z,opt.gap==null?40:opt.gap))}}
  await Promise.all(Array.from({length:conc},worker));szSave();
  if(P.asp&&!run.stop){try{rec.aspB=await aspFetch(P,opt.proxy,cache);rec.aspErr=""}catch(e){rec.aspErr=String(e&&e.message||e);rec.aspB=0}run.done++;onp&&onp(run)}
  const all2=packs();const r2=all2[P.id]||rec;Object.assign(r2,rec);r2.done=!run.stop&&run.fail===0;r2.paused=!!run.stop;if(r2.done)r2.at=Date.now();r2.fail=run.fail;all2[P.id]=r2;packsSave(all2);
  RUN=null;return {ok:r2.done,stopped:run.stop,fail:run.fail,err:run.err,bytes:run.bytes,aspErr:rec.aspErr||""}}
/* Airspace: the whole Australia export (~8 MB) is fetched once, clipped on the phone to the corridor and stored small. */
async function aspFetch(P,proxy,cache){let r=null,last="";
  for(const u of [ASP_URL].concat(proxy?[proxy.replace(/\/?$/,"/")+ASP_URL]:[])){try{const c=new AbortController(),t=setTimeout(()=>c.abort(),60000);r=await fetch(u,{mode:"cors",credentials:"omit",cache:"no-store",signal:c.signal});clearTimeout(t);if(r.ok)break;last="HTTP "+r.status;r=null}catch(e){last=(e&&e.name==="TypeError")?"blocked by the browser (no CORS)":String(e&&e.message||e);r=null}}
  if(!r)throw new Error(/403|404/.test(last)?"OpenAIP doesn't allow downloads straight from a web page, and Cabin Panel's private proxy doesn't pass OpenAIP through yet":"OpenAIP airspace not available ("+last+")");
  const j=await r.json();const fr=P._fr,to=P._to;const pad=P.w==="wide"?120:80;const out=[];
  const near=(lat,lon)=>{const ax=merc(fr.lat,fr.lon),bx=merc(to.lat,to.lon),p=merc(lat,lon);const vx=bx[0]-ax[0],vy=bx[1]-ax[1],L2=vx*vx+vy*vy;let t=L2?((p[0]-ax[0])*vx+(p[1]-ax[1])*vy)/L2:0;t=Math.max(0,Math.min(1,t));
    const q=gc(fr,to,t);return dist(q,{lat,lon})/1000<=pad};
  const lim=o=>{if(!o)return null;const v=+o.value,u=+o.unit,ref=+o.referenceDatum;if(!isFinite(v))return null;if(ref===0&&v===0)return 0;const m=u===6?v*30.48:u===1?v*0.3048:v;return Math.round(m)};
  for(const f of (j.features||[])){const g=f.geometry,p=f.properties||{};if(!g||g.type!=="Polygon"||!g.coordinates||!g.coordinates[0])continue;
    const ring=g.coordinates[0];if(!ring.some((c,i)=>i%4===0&&near(c[1],c[0])))continue;
    const st=Math.max(1,Math.floor(ring.length/160));const pts=[];for(let i=0;i<ring.length;i+=st)pts.push([+ring[i][1].toFixed(4),+ring[i][0].toFixed(4)]);
    out.push({n:String(p.name||"").slice(0,60),t:+p.type||0,lo:lim(p.lowerLimit),hi:lim(p.upperLimit),p:pts})}
  const body=JSON.stringify({at:Date.now(),src:"OpenAIP (CC BY-NC 4.0)",a:out});
  await cache.put(ASP_KEY(P.id),new Response(body,{headers:{"content-type":"application/json"}}));return body.length}
export async function aspGet(id){try{const c=await caches.open(CACHE);const r=await c.match(ASP_KEY(id));return r?await r.json():null}catch(e){return null}}
export async function aspAll(){const out=[];for(const p of Object.values(packs())){if(!p.aspB)continue;const a=await aspGet(p.id);if(a&&a.a)out.push(...a.a)}return out}
/* Delete a pack: tiles shared with another pack stay. */
export async function remove(id){const all=packs();const p=all[id];if(!p)return 0;delete all[id];packsSave(all);
  const keep=new Set();for(const q of Object.values(all))for(const k of q.keys||[])keep.add(k);
  const cache=await caches.open(CACHE);const m=szm();let freed=0;
  for(const k of p.keys||[]){if(keep.has(k))continue;if(m[k]>0)freed+=m[k];delete m[k];try{await cache.delete(keyUrl(k))}catch(e){}}
  try{await cache.delete(ASP_KEY(id))}catch(e){}freed+=p.aspB||0;szSave();return freed}
export async function getTile(k){if(!have(k))return null;try{const c=await caches.open(CACHE);const r=await c.match(keyUrl(k));return r?await r.blob():null}catch(e){return null}}
/* which packs cover a position (any stored tile at z8 DEM or z10 imagery under it) */
export function covers(lat,lon){const out=[];const [mx,my]=merc(lat,lon);
  const k10="i/10/"+Math.floor(mx*1024)+"/"+Math.floor(my*1024),k8="d/8/"+Math.floor(mx*256)+"/"+Math.floor(my*256);
  for(const p of Object.values(packs()))if((p.keys||[]).some(k=>k===k10||k===k8))out.push(p.id);return out}
