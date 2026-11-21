/* v25: static inline styles live in data-css and pbar widths in data-w; both are applied through CSSOM, so the CSP needs no style-src 'unsafe-inline' */
function cpSt(r){if(!r||!r.querySelectorAll)return;const f=e=>{if(e.hasAttribute("data-css")){e.style.cssText=e.getAttribute("data-css");e.removeAttribute("data-css")}if(e.hasAttribute("data-w")){e.style.width=Math.max(0,Math.min(100,+e.getAttribute("data-w")||0))+"%";e.removeAttribute("data-w")}};if(r.hasAttribute)f(r);r.querySelectorAll("[data-css],[data-w]").forEach(f)}
cpSt(document.documentElement);new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1)cpSt(n)}).observe(document.documentElement,{childList:true,subtree:true});
/* v25: refuse to run inside a frame (GitHub Pages cannot send frame-ancestors / X-Frame-Options) */
if(window.top!==window.self){try{window.top.location=window.location.href}catch(e){document.documentElement.style.display="none"}}
/* Cabin Panel app script. Kept in its own file so the page can use a strict Content-Security-Policy (script-src 'self'). */
{
const AP=[["SYD","Sydney",-33.9461,151.1772,"Sydney"],["MEL","Melbourne",-37.6733,144.8433,"Melbourne"],["BNE","Brisbane",-27.3842,153.1175,"Brisbane"],["PER","Perth",-31.9403,115.9669,"Perth"],["ADL","Adelaide",-34.9450,138.5306,"Adelaide"],["CBR","Canberra",-35.3069,149.1950,"Sydney"],["DRW","Darwin",-12.4147,130.8769,"Darwin"],["HBA","Hobart",-42.8361,147.5103,"Hobart"],["CNS","Cairns",-16.8858,145.7553,"Brisbane"],["OOL","Gold Coast",-28.1644,153.5047,"Brisbane"],["TSV","Townsville",-19.2525,146.7653,"Brisbane"],["ASP","Alice Springs",-23.8067,133.9022,"Darwin"],["AYQ","Uluru",-25.1861,130.9756,"Darwin"],["LST","Launceston",-41.5453,147.2142,"Hobart"],["MCY","Sunshine Coast",-26.6033,153.0911,"Brisbane"],["NTL","Newcastle",-32.7950,151.8344,"Sydney"],["AVV","Avalon",-38.0394,144.4694,"Melbourne"],["BME","Broome",-17.9447,122.2322,"Perth"],["KTA","Karratha",-20.7122,116.7733,"Perth"],["PHE","Port Hedland",-20.3778,118.6264,"Perth"],["MKY","Mackay",-21.1717,149.1797,"Brisbane"],["ROK","Rockhampton",-23.3819,150.4753,"Brisbane"],["WGA","Wagga Wagga",-35.1653,147.4664,"Sydney"],["ABX","Albury",-36.0678,146.9581,"Sydney"],["KGI","Kalgoorlie",-30.7894,121.4617,"Perth"]].map(a=>({c:a[0],n:a[1],lat:a[2],lon:a[3],tz:"Australia/"+a[4]}));
const COAST=[[[-40.81,147.69],[-40.88,148.29],[-42.06,148.36],[-42.41,148.02],[-43.21,147.91],[-42.94,147.56],[-43.63,146.87],[-43.58,146.66],[-43.55,146.05],[-42.69,145.43],[-42.03,145.3],[-41.16,144.72],[-40.7,144.74],[-40.79,145.4],[-41.14,146.36],[-41.0,146.91],[-40.81,147.69]],[[-32.22,126.15],[-32.73,125.09],[-32.96,124.22],[-33.48,124.03],[-33.89,123.66],[-33.91,122.81],[-34.0,122.18],[-33.82,121.3],[-33.93,120.58],[-33.98,119.89],[-34.51,119.3],[-34.46,119.01],[-34.75,118.51],[-35.06,118.02],[-35.03,117.3],[-35.03,116.63],[-34.39,115.56],[-34.2,115.03],[-33.62,115.05],[-33.49,115.55],[-33.26,115.71],[-32.9,115.68],[-32.21,115.8],[-31.61,115.69],[-30.6,115.16],[-30.03,115.0],[-29.46,115.04],[-28.81,114.64],[-28.52,114.62],[-28.12,114.17],[-27.33,114.05],[-26.54,113.48],[-26.12,113.34],[-26.55,113.78],[-25.62,113.44],[-25.91,113.94],[-26.3,114.23],[-25.79,114.22],[-25.0,113.72],[-24.68,113.63],[-24.38,113.39],[-23.81,113.5],[-23.56,113.71],[-23.06,113.84],[-22.48,113.74],[-21.76,114.15],[-22.52,114.23],[-21.83,114.65],[-21.5,115.46],[-21.07,115.95],[-20.7,116.71],[-20.62,117.17],[-20.75,117.44],[-20.37,118.23],[-20.26,118.84],[-20.04,118.99],[-19.95,119.25],[-19.98,119.81],[-19.68,120.86],[-19.24,121.4],[-18.71,121.66],[-18.2,122.24],[-17.8,122.29],[-17.25,122.31],[-16.41,123.01],[-17.27,123.43],[-17.07,123.86],[-16.6,123.5],[-16.11,123.82],[-16.33,124.26],[-15.57,124.38],[-15.08,124.93],[-14.68,125.17],[-14.51,125.67],[-14.23,125.69],[-14.35,126.13],[-14.1,126.14],[-13.95,126.58],[-13.82,127.07],[-14.28,127.8],[-14.87,128.36],[-14.88,128.99],[-14.97,129.62],[-14.42,129.41],[-13.62,129.89],[-13.36,130.34],[-13.11,130.18],[-12.54,130.62],[-12.18,131.22],[-12.3,131.74],[-12.11,132.58],[-11.6,132.56],[-11.27,131.82],[-11.13,132.36],[-11.38,133.02],[-11.79,133.55],[-12.04,134.39],[-11.94,134.68],[-12.25,135.3],[-11.96,135.88],[-12.05,136.26],[-11.86,136.49],[-12.35,136.95],[-12.89,136.69],[-13.29,136.31],[-13.32,135.96],[-13.72,136.08],[-14.22,135.78],[-14.72,135.43],[-15.0,135.5],[-15.55,136.3],[-15.87,137.07],[-16.22,137.58],[-16.81,138.3],[-16.81,138.59],[-17.06,139.11],[-17.37,139.26],[-17.71,140.22],[-17.37,140.88],[-16.83,141.07],[-16.39,141.27],[-15.84,141.4],[-15.04,141.7],[-14.56,141.56],[-14.27,141.64],[-13.7,141.52],[-12.94,141.65],[-12.74,141.84],[-12.41,141.69],[-11.88,141.93],[-11.33,142.12],[-11.04,142.14],[-10.67,142.52],[-11.16,142.8],[-11.78,142.87],[-11.91,143.12],[-12.33,143.16],[-12.83,143.52],[-13.4,143.6],[-13.76,143.56],[-14.55,143.92],[-14.17,144.56],[-14.59,144.89],[-14.98,145.37],[-15.43,145.27],[-16.29,145.49],[-16.78,145.64],[-16.91,145.89],[-17.76,146.16],[-18.28,146.06],[-18.96,146.39],[-19.48,147.47],[-19.96,148.18],[-20.39,148.85],[-20.63,148.72],[-21.26,149.29],[-22.34,149.68],[-22.12,150.08],[-22.56,150.48],[-22.4,150.73],[-23.46,150.9],[-24.08,151.61],[-24.46,152.07],[-25.27,152.86],[-26.07,153.14],[-26.64,153.16],[-27.26,153.09],[-28.11,153.57],[-29.0,153.51],[-29.46,153.34],[-30.35,153.07],[-30.92,153.09],[-31.64,152.89],[-32.55,152.45],[-33.04,151.71],[-33.82,151.34],[-34.31,151.01],[-35.17,150.71],[-35.67,150.33],[-36.42,150.08],[-37.11,149.95],[-37.43,150.0],[-37.77,149.42],[-37.81,148.3],[-38.22,147.38],[-38.61,146.92],[-39.04,146.32],[-38.59,145.49],[-38.42,144.88],[-37.9,145.03],[-38.09,144.49],[-38.81,143.61],[-38.54,142.75],[-38.38,142.18],[-38.31,141.61],[-38.02,140.64],[-37.4,139.99],[-36.64,139.81],[-36.14,139.57],[-35.73,139.08],[-35.61,138.12],[-35.13,138.45],[-34.38,138.21],[-35.08,137.72],[-35.26,136.83],[-34.71,137.35],[-34.13,137.5],[-33.64,137.89],[-32.9,137.81],[-33.75,137.0],[-34.09,136.37],[-34.89,135.99],[-34.48,135.21],[-33.95,135.24],[-33.22,134.61],[-32.85,134.09],[-32.62,134.27],[-32.01,132.99],[-31.98,132.29],[-31.5,131.33],[-31.59,129.54],[-31.95,128.24],[-32.28,127.1],[-32.22,126.15]]];
const $=id=>document.getElementById(id);
const R=6371008.8,FT=3.28084,NMm=1852;
const rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
const dist=(a,b)=>{const p1=rad(a.lat),p2=rad(b.lat),dp=p2-p1,dl=rad(b.lon-a.lon);const h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(h)))};
const brg=(a,b)=>{const p1=rad(a.lat),p2=rad(b.lat),dl=rad(b.lon-a.lon);return (deg(Math.atan2(Math.sin(dl)*Math.cos(p2),Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl)))+360)%360};
const gcPoint=(a,b,f)=>{const d=dist(a,b)/R;if(d<1e-9)return {lat:a.lat,lon:a.lon};const A=Math.sin((1-f)*d)/Math.sin(d),B=Math.sin(f*d)/Math.sin(d);const p1=rad(a.lat),l1=rad(a.lon),p2=rad(b.lat),l2=rad(b.lon);const x=A*Math.cos(p1)*Math.cos(l1)+B*Math.cos(p2)*Math.cos(l2),y=A*Math.cos(p1)*Math.sin(l1)+B*Math.cos(p2)*Math.sin(l2),z=A*Math.sin(p1)+B*Math.sin(p2);return {lat:deg(Math.atan2(z,Math.hypot(x,y))),lon:deg(Math.atan2(y,x))}};
/* v24c: stored JSON may be null, old-schema or partially restored. Validate before any render can abort app boot.
   Normalisation is in memory only: do not overwrite the original stored record during recovery. */
function storedValue(k,v,d){
  const obj=x=>!!x&&typeof x==="object"&&!Array.isArray(x),arr=x=>Array.isArray(x)?x:[],fin=x=>typeof x==="number"&&Number.isFinite(x);
  if(v==null)return d;
  if(Array.isArray(d)&&!Array.isArray(v))return d;
  if(obj(d)&&!obj(v))return d;
  if(k==="book")return arr(v).filter(obj).map((b,i)=>Object.assign({},b,{id:typeof b.id==="string"&&b.id?b.id:"legacy-"+i,ev:obj(b.ev)?b.ev:{},pts:arr(b.pts).filter(q=>Array.isArray(q)&&q.length>=2&&fin(q[0])&&fin(q[1])),st:arr(b.st),d:fin(b.d)?b.d:0,ma:fin(b.ma)?b.ma:0,date:fin(b.date)?b.date:0,from:typeof b.from==="string"?b.from:"",to:typeof b.to==="string"?b.to:""}));
  if(k==="log")return Object.assign({on:false,pts:[]},v,{pts:arr(v.pts).filter(q=>Array.isArray(q)&&q.length>=2&&fin(q[0])&&fin(q[1]))});
  if(k==="phase"){const q=Object.assign({},v);for(const x of ["ev","said","holds"])if(!obj(q[x]))q[x]={};if(!Array.isArray(q.lm))q.lm=[];return q}
  if(k==="marks")return arr(v).filter(q=>obj(q)&&fin(q.lat)&&fin(q.lon));
  if(k==="bumps")return arr(v).filter(q=>obj(q)&&fin(q.t)&&fin(q.g));
  if(k==="xap")return arr(v);
  if(k==="ls"){const q={};for(const [a,b] of Object.entries(v))if(obj(b)&&Array.isArray(b.parts)&&b.parts.every(obj))q[a]=b;return q}
  if(k==="spot")return Object.assign({},v,{pts:fin(v.pts)?v.pts:0,caught:arr(v.caught).filter(obj),types:obj(v.types)?v.types:{},airl:obj(v.airl)?v.airl:{}});
  return v;
}
const store={get(k,d){try{const v=localStorage.getItem("cp_"+k);return v?storedValue(k,JSON.parse(v),d):d}catch(e){return d}},set(k,v){try{localStorage.setItem("cp_"+k,JSON.stringify(v));return true}catch(e){storeFail(k,e);return false}}};
let logDirty=false,sfWarned=false;
function storeFail(k,e){const el=document.getElementById("storeTxt");if(el)el.textContent="⚠ Couldn't save "+k+" ("+((e&&e.name)||"error")+"). Storage for this app may be full. Export the logbook now, then delete old flights.";if(!sfWarned){sfWarned=true;try{say("Storage problem. Export your logbook to keep it safe.");hap([80,60,80])}catch(_){}}}
function storeFlush(){if(logDirty&&typeof LOG!=="undefined"){if(store.set("log",LOG))logDirty=false}}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")storeFlush()});
window.addEventListener("pagehide",storeFlush);setInterval(storeFlush,30000);
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}

let S=Object.assign({tex:"off",spd:"kt",alt:"ft",dst:"nm",day:"0",disp:"day",scn:"auto",autofh:"on",att:"gps",from:"",to:"",seat:"both",mapAuto:"on"},store.get("settings",{}));
const esc=t=>String(t==null?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const dPt=(a,b,m)=>{const d=m/R,t=rad(b),p1=rad(a.lat),l1=rad(a.lon);const p2=Math.asin(Math.sin(p1)*Math.cos(d)+Math.cos(p1)*Math.sin(d)*Math.cos(t));const l2=l1+Math.atan2(Math.sin(t)*Math.sin(d)*Math.cos(p1),Math.cos(d)-Math.sin(p1)*Math.sin(p2));return {lat:deg(p2),lon:((deg(l2)+540)%360)-180}};
let LOG=store.get("log",{on:false,pts:[]});
let last=null,hist=[],trail=[],watchId=null,demo=null,lastFixAt=0,wake=null,wantWake=false;
let prof=[],trkH=[],att={p:0,r:0,rate:null},sen={on:false,p:0,r:0,gp:null,gr:null,p0:0,r0:0,lt:0};
let gOn=false,gS=null,gMin=null,gMax=null;
const saveS=()=>store.set("settings",S);
/* v25: Drive mode state (declared early: render, phaseStep and sharing read it during boot). Stored on this phone only. */
function drvClean(v){const o=v&&typeof v==="object"&&!Array.isArray(v)?v:{},fin=x=>typeof x==="number"&&Number.isFinite(x),pt=p=>p&&typeof p==="object"&&fin(p.lat)&&fin(p.lon)&&Math.abs(p.lat)<=90&&Math.abs(p.lon)<=180?{lat:p.lat,lon:p.lon,t:fin(p.t)?p.t:0}:null;
  const u=x=>x&&typeof x==="object"&&["kt","kmh","mph"].includes(x.spd)&&["ft","m"].includes(x.alt)&&["nm","km"].includes(x.dst)?{spd:x.spd,alt:x.alt,dst:x.dst}:null;
  const nn=(x,d)=>fin(x)&&x>=0?x:d;
  /* v25: every stored trip field is coerced to a finite number (corrupt or hand-edited storage must not reach the maths or the page) */
  const tr=o.trip&&typeof o.trip==="object"&&fin(o.trip.t0)?{t0:o.trip.t0,mv:nn(o.trip.mv,0),sinceRest:nn(o.trip.sinceRest,0),nextRest:Math.max(nn(o.trip.nextRest,2*3600e3),3600e3),stopAt:nn(o.trip.stopAt,0),pt:nn(o.trip.pt,o.trip.t0),arr:o.trip.arr?1:0,
    rs:o.trip.rs&&typeof o.trip.rs==="object"?{dur:nn(o.trip.rs.dur,0),sq:nn(o.trip.rs.sq,0),brake:nn(o.trip.rs.brake,0),accel:nn(o.trip.rs.accel,0),corner:nn(o.trip.rs.corner,0),bump:nn(o.trip.rs.bump,0),le:{}}:null}:null;
  const rc=o.restC&&typeof o.restC==="object"&&fin(o.restC.at)?{at:o.restC.at,since:nn(o.restC.since,0),next:Math.max(nn(o.restC.next,2*3600e3),3600e3)}:null;
  const d=o.dest&&pt(o.dest)?Object.assign(pt(o.dest),{n:String(o.dest.n||"Destination").slice(0,60),src:String(o.dest.src||"")}):null;
  return {on:o.on===true,pax:fin(o.pax)?o.pax:0,paxEver:fin(o.paxEver)?o.paxEver:0,since:fin(o.since)?o.since:0,start:pt(o.start),starts:(Array.isArray(o.starts)?o.starts:[]).map(pt).filter(Boolean).slice(0,3),
    priv:(Array.isArray(o.priv)?o.priv:[]).map(pt).filter(Boolean).slice(0,5),dest:d,outAt:fin(o.outAt)?o.outAt:0,trip:tr,restC:rc,fU:u(o.fU),dU:u(o.dU),cl:[]}}
let DRV=drvClean(store.get("drive",{}));
const drvSave=()=>store.set("drive",{on:DRV.on,pax:DRV.pax,paxEver:DRV.paxEver,since:DRV.since,start:DRV.start,starts:DRV.starts,priv:DRV.priv,dest:DRV.dest,outAt:DRV.outAt,trip:DRV.trip,restC:DRV.restC,fU:DRV.fU,dU:DRV.dU});
const apBy=c=>AP.find(a=>a.c===c);

/* ---------- formatting ---------- */
const fSpd=ms=>ms==null?null:S.spd==="kt"?ms*3600/NMm:S.spd==="kmh"?ms*3.6:ms*2.23694;
const fDst=m=>S.dst==="nm"?m/NMm:m/1000;
const fAlt=m=>S.alt==="ft"?m*FT:m;
const hm=s=>{if(!isFinite(s)||s<0)return "---";const h=Math.floor(s/3600),m=Math.round((s%3600)/60);return m===60?(h+1)+"h 00m":h+"h "+String(m).padStart(2,"0")+"m"};
const setVal=(id,txt,unit)=>{$(id).innerHTML=txt+"<small>"+unit+"</small>"};
const card=b=>["N","NE","E","SE","S","SW","W","NW"][Math.round(b/45)%8];

/* ---------- compass rose ---------- */
{let h="";for(let d=0;d<360;d+=5){const big=d%30===0,mid=d%10===0;const r1=140,r2=big?118:mid?126:132;const a=rad(d);h+=`<line x1="${150+r1*Math.sin(a)}" y1="${150-r1*Math.cos(a)}" x2="${150+r2*Math.sin(a)}" y2="${150-r2*Math.cos(a)}" stroke="var(--ink)" stroke-width="${big?3:mid?2:1}" opacity="${big?1:.7}"/>`;if(big){const lbl={0:"N",90:"E",180:"S",270:"W"}[d]||String(d/10);const rr=100;h+=`<text x="${150+rr*Math.sin(a)}" y="${150-rr*Math.cos(a)+7}" text-anchor="middle" font-size="${d%90===0?22:18}" font-weight="700" fill="${d===0?"var(--cyan)":"var(--ink)"}" transform="rotate(${d} ${150+rr*Math.sin(a)} ${150-rr*Math.cos(a)})">${lbl}</text>`}}$("rose").innerHTML=h+'<g id="sunG"></g>'}
let roseRot=0,needleRot=0;
const unwrap=(prev,target)=>{let d=((target-prev)%360+540)%360-180;return prev+d};

/* ---------- route selects ---------- */
const CAP=["CBR","SYD","MEL","BNE","PER","ADL","HBA","DRW"];const capN={CBR:"Canberra",SYD:"Sydney",MEL:"Melbourne",BNE:"Brisbane",PER:"Perth",ADL:"Adelaide",HBA:"Hobart",DRW:"Darwin"};
const o=a=>`<option value="${a.c}">${a.n} (${a.c})</option>`;
const opts='<optgroup label="Capital cities">'+CAP.map(c=>o(apBy(c))).join("")+'</optgroup><optgroup label="Other airports">'+AP.filter(a=>!CAP.includes(a.c)).sort((a,b)=>a.n.localeCompare(b.n)).map(o).join("")+'</optgroup>';
$("from").innerHTML='<option value="">Departure…</option>'+opts;$("to").innerHTML='<option value="">Arrival…</option>'+opts;
$("from").value=S.from;$("to").value=S.to;
$("from").onchange=e=>{prof=[];S.from=e.target.value;saveS();render();drawMap();profAll()};
$("to").onchange=e=>{prof=[];S.to=e.target.value;saveS();render();drawMap();profAll()};

/* ---------- vertical speed by regression ---------- */
function vsFpm(){if(tkOn())return tkVs();if(hist.length<3)return null;const t0=hist[0].t,span=(hist[hist.length-1].t-t0)/1000;if(span<4)return null;let n=hist.length,sx=0,sy=0,sxx=0,sxy=0;for(const p of hist){const x=(p.t-t0)/1000;sx+=x;sy+=p.a;sxx+=x*x;sxy+=x*p.a}const den=n*sxx-sx*sx;if(!den)return null;return (n*sxy-sx*sy)/den*FT*60}

/* ---------- position handler ---------- */
/* v18: after a gap (app in background, signal loss or a picked-up flight) bridge the track with a great-circle line */
function bridgeGap(a,b,t){const gap=(t-a.t)/1000;if(!(gap>20&&gap<8*3600))return;const d=dist(a,b);if(d/gap>400||d<200)return;const n=Math.min(240,Math.floor(gap/15));const sp=+(d/gap).toFixed(1);
  for(let i=1;i<n;i++){const f=i/n,q=gcPoint(a,b,f),al=a.alt!=null&&b.alt!=null?Math.round(a.alt+(b.alt-a.alt)*f):null,tt=Math.round(a.t+f*(t-a.t));
    if(LOG.on)LOG.pts.push([+q.lat.toFixed(6),+q.lon.toFixed(6),al,tt,sp]);const lt=trail[trail.length-1];if(!lt||dist(lt,q)>80)trail.push(q)}if(LOG.on)logDirty=true}
function viewL(){if(tkOn())return tkLive();const L=last;if(!L||demo||REPLAY||L.spd==null||L.spd<25||L.trk==null)return L;const age=(Date.now()-L.t)/1000;if(!(age>8&&age<4*3600))return L;if(!["climb","cruise","descent"].includes(PH.p))return L;const q=dPt(L,L.trk,L.spd*age);return Object.assign({},L,{lat:q.lat,lon:q.lon,dr:age})}
/* ---------- v22e: ground GPS filter (gate and taxi wander fix). Spec by Claude, 20 Nov 2026; built into v22 by Grok Bot ----------
   Runs on real GPS fixes before onPos (demo and replay bypass it). Stopped: one steady, accuracy-weighted position, speed 0, no heading.
   Moving only on real evidence. Speed never from a single 1 s jump. Taxi positions smoothed and snapped to OSM taxiway centrelines.
   Pass-through above 40 m/s and when airborne, so takeoff, flight and landing timing are unchanged. */
let GF=null;
function gfReset(){GF={m:"init",buf:[],park:null,out:0,spS:null,slS:null,x:null,v:null,lt:0,hd:null,sp:0,emitted:false,raw:[]}}
gfReset();
const gfLoc=(o,p)=>{const k=Math.cos(rad(o.lat));return [(p.lon-o.lon)*111320*k,(p.lat-o.lat)*111320]};
const gfGeo=(o,xy)=>{const k=Math.cos(rad(o.lat));return {lat:o.lat+xy[1]/111320,lon:o.lon+xy[0]/111320/k}};
function gfOut(p,pos,spd,hdg){return {gf:true,timestamp:p.timestamp,coords:{latitude:pos.lat,longitude:pos.lon,altitude:p.coords.altitude,accuracy:p.coords.accuracy,altitudeAccuracy:p.coords.altitudeAccuracy,speed:spd,heading:hdg}}}
/* steady parked position: accuracy-weighted mean of up to ~2 min of fixes, outliers excluded */
function gfPark(){const b=GF.buf;if(!b.length)return null;const o=b[b.length-1];
  const pts=b.map(f=>({f,xy:gfLoc(o,f)}));
  const med=a=>{const s=a.slice().sort((p,q)=>p-q);return s[s.length>>1]};
  const mx=med(pts.map(q=>q.xy[0])),my=med(pts.map(q=>q.xy[1]));
  let sw=0,sx=0,sy=0;for(const q of pts){const d=Math.hypot(q.xy[0]-mx,q.xy[1]-my);if(d>Math.max(25,1.5*q.f.acc)&&pts.length>3)continue;const w=1/Math.max(5,q.f.acc)**2;sw+=w;sx+=w*q.xy[0];sy+=w*q.xy[1]}
  if(!sw)return GF.park;return gfGeo(o,[sx/sw,sy/sw])}
/* v22e: snap to the nearest OSM taxiway centreline within 20 m (only the airport(s) whose box we are in) */
let gfTw=null;
function gfSnap(pos,trk){if(!TWY)return null;
  if(!gfTw||gfTw.src!==TWY){gfTw={src:TWY,ap:TWY.map(a=>({bb:a.bb,o:{lat:(a.bb[0]+a.bb[1])/2,lon:(a.bb[2]+a.bb[3])/2},ws:a.ws.filter(w=>w.t===0),seg:null}))}}
  let best=null;
  for(const a of gfTw.ap){const m=0.003;if(pos.lat<a.bb[0]-m||pos.lat>a.bb[1]+m||pos.lon<a.bb[2]-m||pos.lon>a.bb[3]+m)continue;
    if(!a.seg){a.seg=[];for(const w of a.ws){const q=w.p.map(p=>gfLoc(a.o,{lat:p[0],lon:p[1]}));for(let i=0;i+1<q.length;i++)a.seg.push([q[i][0],q[i][1],q[i+1][0],q[i+1][1]])}}
    const P=gfLoc(a.o,pos);
    for(const s of a.seg){const dx=s[2]-s[0],dy=s[3]-s[1],L2=dx*dx+dy*dy;if(!L2)continue;let u=((P[0]-s[0])*dx+(P[1]-s[1])*dy)/L2;u=Math.max(0,Math.min(1,u));const qx=s[0]+u*dx,qy=s[1]+u*dy,d=Math.hypot(P[0]-qx,P[1]-qy);
      if(d>20)continue;let sb=(Math.atan2(dx,dy)*180/Math.PI+360)%360;let pen=0;
      if(trk!=null){let df=Math.abs(((sb-trk)%360+540)%360-180);if(df>90){sb=(sb+180)%360;df=180-df}if(df>50)pen=15;}
      if(!best||d+pen<best.s)best={s:d+pen,d,pos:gfGeo(a.o,[qx,qy]),brg:sb,pen}}}
  return best&&!best.pen?best:null}
function gndFilter(p){
  const c=p.coords,t=p.timestamp||Date.now(),acc=(c.accuracy>0&&isFinite(c.accuracy))?c.accuracy:30;
  const ps=(c.speed!=null&&c.speed>=0&&!isNaN(c.speed))?c.speed:null,ph=(c.heading!=null&&c.heading>=0&&!isNaN(c.heading))?c.heading:null;
  const air=["climb","cruise","descent","approach"].includes(PH.p);
  const fast=(ps!=null&&ps>40)||((GF.m==="move"||GF.m==="pass")&&GF.sp>40);
  if(air||fast){if(GF.m!=="pass"){GF.m="pass";GF.buf=[];GF.x=null}GF.lt=t;
    if(acc<=150){GF.raw.push({t,lat:c.latitude,lon:c.longitude,acc,ps});while(GF.raw.length>2&&t-GF.raw[0].t>13000)GF.raw.shift()}
    if(ps!=null)GF.sp=ps;else{const r0=GF.raw.find(q=>t-q.t<=12000&&t-q.t>=5000);if(r0)GF.sp=dist(r0,{lat:c.latitude,lon:c.longitude})/((t-r0.t)/1000)}
    if(ph!=null)GF.hd=ph;return p}
  if(acc>150){if(GF.emitted)return null;GF.emitted=true;return gfOut(p,{lat:c.latitude,lon:c.longitude},0,null)}
  const f={t,lat:c.latitude,lon:c.longitude,acc,ps};
  GF.raw.push(f);while(GF.raw.length>2&&t-GF.raw[0].t>13000)GF.raw.shift();
  const good=ps!=null&&acc<=60;
  if(GF.m==="init"||GF.m==="pass"){
    /* start (or come back down from the air): moving if the phone says so, otherwise stopped */
    const wasPass=GF.m==="pass",pr=GF.raw.length>1?GF.raw.find(q=>t-q.t<=12000&&t-q.t>=3000):null;GF.buf=[f];GF.park={lat:f.lat,lon:f.lon};GF.out=0;GF.spS=null;GF.slS=null;
    if(wasPass||(ps!=null&&ps>=2)){GF.m="move";GF.o={lat:f.lat,lon:f.lon};GF.x=[0,0];GF.lt=t;GF.sp=ps!=null?ps:(wasPass?GF.sp:0);
      let h=ph!=null?ph:(pr&&dist(pr,f)>20?brg(pr,f):(GF.hd!=null?GF.hd:(last&&last.trk!=null?last.trk:null)));GF.hd=h;GF.v=h!=null?[GF.sp*Math.sin(rad(h)),GF.sp*Math.cos(rad(h))]:[0,0];
      GF.emitted=true;return gfOut(p,f,GF.sp,GF.hd)}
    GF.m="stop";GF.emitted=true;return gfOut(p,GF.park,0,null)}
  if(GF.m==="stop"){
    GF.spS=good&&ps>=2?(GF.spS||t):null;
    const d=dist(GF.park,f),thr=Math.max(30,Math.min(2*acc,60)),out=d>thr&&!(good&&ps<0.8);GF.out=out?GF.out+1:0;
    /* two in a row pulling clearly further away (accelerating, e.g. straight onto the runway) also counts */
    const pull=GF.out===2&&GF.pd!=null&&d>GF.pd+10&&d>thr+10;GF.pd=out?d:null;
    if((GF.spS&&t-GF.spS>=3000)||GF.out>=3||pull){
      /* moving: track from the fixes since we left the parked spot */
      GF.m="move";GF.o={lat:GF.park.lat,lon:GF.park.lon};GF.slS=null;GF.mt=t-(GF.out>=3?Math.min(8000,1000*GF.out+2000):4000);GF.lt=t;GF.v=[0,0];GF.x=gfLoc(GF.o,f);
      GF.buf=[];GF.out=0;GF.spS=null;gfTrack(f,ps,good);
      return gfMoveOut(p,f,ph)}
    if(!out||GF.buf.length<3){GF.buf.push(f);while(GF.buf.length>1&&t-GF.buf[0].t>120000)GF.buf.shift();GF.park=gfPark()||GF.park}
    return gfOut(p,GF.park,0,null)}
  /* moving */
  GF.lt=t;gfTrack(f,ps,good);const sp=GF.sp;
  /* stop: under 1.2 m/s for 5 s, or the last 8 s of fixes all within the GPS error (and no real speed) */
  GF.slS=sp<1.2?(GF.slS||t):null;
  let still=false;{const r=GF.raw.filter(q=>t-q.t<=8000);if(r.length>=5&&t-r[0].t>=6000){const m=r.reduce((s,q)=>Math.max(s,dist(r[0],q)),0),ea=Math.min(...r.map(q=>q.acc));still=m<=Math.max(8,0.6*Math.min(ea,25))&&!(good&&ps>=2)&&sp<2}}
  if((GF.slS&&t-GF.slS>=5000)||still){GF.m="stop";const pos=gfGeo(GF.o,GF.x);GF.buf=[Object.assign({},f,{lat:pos.lat,lon:pos.lon,acc:Math.max(5,acc/2)})];GF.park=pos;GF.out=0;GF.spS=null;GF.slS=null;GF.v=[0,0];GF.sp=0;return gfOut(p,pos,0,null)}
  return gfMoveOut(p,f,ph)}
/* moving: weighted straight-line fit to the recent fixes (longer window, so smoother, when slow), outliers dropped.
   Gives position now and velocity; speed is the phone's own when it has a decent one, else the fitted speed less its error. */
function gfTrack(f,ps,good){const t=f.t,sp0=GF.sp||0;
  if(Math.hypot(GF.x[0],GF.x[1])>2000){GF.o=gfGeo(GF.o,GF.x);GF.x=[0,0]}
  const N=1000*(sp0<3?10:Math.max(4,Math.min(10,48/sp0)));
  let pts=GF.raw.filter(q=>t-q.t<=N&&q.t>=GF.mt).map(q=>{const xy=gfLoc(GF.o,q);return {x:xy[0],y:xy[1],dt:(q.t-t)/1000,w:1/Math.max(10,q.acc),acc:q.acc}});
  const fit=a=>{let sw=0,st=0,stt=0,sx=0,sy=0,stx=0,sty=0;for(const q of a){sw+=q.w;st+=q.w*q.dt;stt+=q.w*q.dt*q.dt;sx+=q.w*q.x;sy+=q.w*q.y;stx+=q.w*q.dt*q.x;sty+=q.w*q.dt*q.y}
    const den=sw*stt-st*st;if(a.length<3||den<=1e-9)return null;const vx=(sw*stx-st*sx)/den,vy=(sw*sty-st*sy)/den;return {x:(sx-vx*st)/sw,y:(sy-vy*st)/sw,vx,vy}};
  let F=fit(pts);
  if(F){const k=pts.filter(q=>Math.hypot(q.x-(F.x+F.vx*q.dt),q.y-(F.y+F.vy*q.dt))<=Math.max(25,1.5*q.acc));if(k.length>=3&&k.length<pts.length){pts=k;F=fit(pts)||F}}
  if(F){GF.x=[F.x,F.y];GF.v=[F.vx,F.vy]}else{const xy=gfLoc(GF.o,f);GF.x=[(GF.x[0]+xy[0])/2,(GF.x[1]+xy[1])/2]}
  const vs=Math.hypot(GF.v[0],GF.v[1]);
  if(good)GF.sp=ps;else if(F){const span=Math.max(2,-Math.min(...pts.map(q=>q.dt))),am=pts.reduce((s,q)=>s+q.acc,0)/pts.length,se=0.5*am*3.46/(span*Math.sqrt(pts.length));GF.sp=Math.max(0,vs-Math.min(0.5,0.25*se))}else GF.sp=sp0}
function gfMoveOut(p,f,ph){
  let pos=gfGeo(GF.o,GF.x);const sp=GF.sp;
  /* heading held below 3 m/s */
  if(sp>=3){const vh=Math.hypot(GF.v[0],GF.v[1])>1?(Math.atan2(GF.v[0],GF.v[1])*180/Math.PI+360)%360:null;const h=(ph!=null&&f.ps!=null&&f.ps>=3)?ph:vh;if(h!=null)GF.hd=h}
  let hd=GF.hd;
  if(sp<15&&S.twySnap!==false&&!DRV.on){try{const s=gfSnap(pos,hd);if(s){pos=s.pos;if(sp>=3)hd=s.brg;GF.snap={d:s.d,t:f.t}}else GF.snap=null}catch(e){}}
  return gfOut(p,pos,sp,hd)}
window.cpGF=()=>GF?{m:GF.m,sp:GF.sp,snap:GF.snap||null}:null;
function onPos(p){
  if(!demo&&!REPLAY&&!p.gf){p=gndFilter(p);if(!p){lastFixAt=Date.now();return}}
  const c=p.coords,t=p.timestamp||Date.now();
  let spd=(c.speed!=null&&c.speed>=0&&!isNaN(c.speed))?c.speed:null;
  let trk=(c.heading!=null&&c.heading>=0&&!isNaN(c.heading))?c.heading:null;
  const here={lat:c.latitude,lon:c.longitude};
  if(last){const d=dist(last,here),dt=(t-last.t)/1000;if(dt>0&&spd==null)spd=d/dt;if(trk==null&&d>5)trk=brg(last,here)}
  if(trk==null&&last)trk=last.trk;
  if(last&&!demo&&!REPLAY&&t-last.t>20000){try{bridgeGap(last,{lat:here.lat,lon:here.lon,alt:c.altitude},t)}catch(e){}}
  if(spd!=null&&spd<1.5)trk=last?last.trk:trk;
  last={lat:here.lat,lon:here.lon,alt:c.altitude,acc:c.accuracy,altAcc:(c.altitudeAccuracy!=null&&c.altitudeAccuracy>=0)?c.altitudeAccuracy:null,spd,trk,t};
  if(c.altitude!=null){hist.push({t,a:c.altitude});const win=(last.altAcc!=null&&last.altAcc>25)?30000:15000;while(hist.length>5&&t-hist[0].t>win)hist.shift()}
  if(trk!=null){const pv=trkH.length?trkH[trkH.length-1].v:trk;trkH.push({t,v:unwrap(pv,trk)});while(trkH.length>4&&t-trkH[0].t>6000)trkH.shift()}
  gpsAtt();
  lastFixAt=Date.now();
  const lt=trail[trail.length-1];
  if(!lt||dist(lt,here)>80){trail.push(here);if(trail.length>6000)trail.splice(0,1000)}
  {const fr=apBy(S.from),to=apBy(S.to);if(fr&&to&&fr.c!==to.c&&c.altitude!=null){const tot=dist(fr,to),f=Math.max(0,Math.min(1,1-dist(here,to)/tot)),lp=prof[prof.length-1];if(!lp||Math.abs(f-lp.f)>0.002||Math.abs(c.altitude-lp.a)>40){prof.push({f,a:c.altitude});if(prof.length>4000)prof.splice(0,500)}}}
  if(LOG.on&&!REPLAY){LOG.pts.push([+here.lat.toFixed(6),+here.lon.toFixed(6),c.altitude==null?null:Math.round(c.altitude),t,spd==null?null:+spd.toFixed(1)]);if(LOG.pts.length>20000){const n=LOG.pts.length;LOG.pts=LOG.pts.filter((q,i)=>i%2===0||i>n-3000)}logDirty=true;if(LOG.pts.length%5===0)storeFlush()}
  if(!S.from&&!demo&&!REPLAY&&!DRV.on&&(spd==null||spd<20)){let best=null,bd=1e12;for(const a of AP){const d=dist(a,here);if(d<bd){bd=d;best=a}}if(best&&bd<15000){S.from=best.c;$("from").value=best.c;saveS()}}
  windowInfo();try{skyInfo()}catch(e){}if(!REPLAY){try{phaseStep(last)}catch(e){}}
  render();drawMap();profAll();
}
function onErr(e){if(e.code!==1&&((lastFixAt&&(Date.now()-lastFixAt)<45000)||resuming()))return;$("stat").textContent=e.code===1?"Location blocked — allow in Settings":"Searching for GPS…";$("dot").className="dot bad"}

/* ---------- render ---------- */
function vsClear(){setVal("vs","---","fpm");$("vs2").innerHTML="&nbsp;"}
function navT(L,to){if(to&&to.drv){const e=drvEta(L);return e&&e.sec!=null?e:null}if(!L||!to||L.spd==null||L.spd<=25)return null;const d=dist(L,to),sec=d/L.spd;let eta="";try{eta=new Date(Date.now()+sec*1000).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:to.tz})}catch(e){eta=new Date(Date.now()+sec*1000).toTimeString().slice(0,5)}return {d,sec,eta}}
const remS=s=>{if(!isFinite(s)||s<0)return "--";const m=Math.round(s/60),h=Math.floor(m/60);return h+"H"+String(m%60).padStart(2,"0")+"M"};
function render(){
  const L=viewL();
  if(!L)vsClear();
  if(L){
    const s=fSpd(L.spd);
    setVal("gs",s==null?"---":Math.round(s),S.spd==="kmh"?"km/h":S.spd);
    $("gs2").textContent=L.spd==null?" ":S.spd==="kt"?Math.round(L.spd*3.6)+" km/h":Math.round(L.spd*3600/NMm)+" kt";
    if(L.alt!=null){setVal("alt",Math.round(fAlt(L.alt)/(S.alt==="ft"?10:1))*(S.alt==="ft"?10:1),S.alt);$("alt2").textContent=(S.alt==="ft"?"FL"+String(Math.round(L.alt*FT/100)).padStart(3,"0")+" approx":Math.round(L.alt*FT)+" ft")+(L.altAcc!=null?" · ±"+Math.round(fAlt(L.altAcc))+" "+S.alt+" vertical":"")+(L.altAcc!=null&&L.altAcc>25?" (low)":"")}
    else{setVal("alt","---",S.alt);$("alt2").textContent="No altitude yet"}
    if(L.trk!=null){setVal("trk",String(Math.round(L.trk)%360).padStart(3,"0"),"°T");$("trk2").textContent="Heading "+card(L.trk)}
    const v=vsFpm();
    if(v!=null){const r=Math.round(v/50)*50;setVal("vs",(r>0?"+":"")+r,"fpm");$("vs2").textContent=Math.abs(r)<200?"Level":r>0?"Climbing ▲":"Descending ▼"}else vsClear();
    if(L.trk!=null){roseRot=unwrap(roseRot,-L.trk);$("rose").setAttribute("transform",`rotate(${roseRot} 150 150)`)}
  }
  const tkd=tkOn(),to=tkd?tkTo():DRV.on?drvTo():apBy(S.to),fr=tkd||DRV.on?null:apBy(S.from);
  if(tkd&&!to){for(const id of ["dtg","brg","ete","eta"])$(id).textContent="---";$("etaTz").textContent="(heading away from "+tkAp().c+")"}
  $("toCode").textContent=to?to.c:"—";
  if(to&&L){
    const d=dist(L,to),b=brg(L,to);
    $("dtg").textContent=Math.round(fDst(d)).toLocaleString()+" "+S.dst;
    $("brg").textContent=String(Math.round(b)%360).padStart(3,"0")+"°";
    const rel=L.trk!=null?b-L.trk:b;needleRot=unwrap(needleRot,rel);$("needle").setAttribute("transform",`rotate(${needleRot} 150 150)`);
    {const n=navT(L,to);if(n){$("ete").textContent=hm(n.sec);$("eta").textContent=n.eta;$("etaTz").textContent="("+to.c+" local)"}else{$("ete").textContent="---";$("eta").textContent="---"}}
    if(fr){const tot=dist(fr,to),pct=Math.max(0,Math.min(100,(1-d/tot)*100));$("progBar").style.width=pct+"%";$("progTxt").textContent=`${fr.c} → ${to.c} · ${Math.round(fDst(tot)).toLocaleString()} ${S.dst} total · ${Math.round(pct)}% done`}
  }else if(to&&fr){const tot=dist(fr,to);$("progTxt").textContent=`${fr.c} → ${to.c} · ${Math.round(fDst(tot)).toLocaleString()} ${S.dst} great-circle · initial track ${String(Math.round(brg(fr,to))).padStart(3,"0")}°`}
  const st=$("strip");
  if(fr&&to&&fr.c!==to.c){st.style.display="";$("sFrom").textContent=fr.c;$("sTo").textContent=to.c;const tot=dist(fr,to);
    if(L){const d=dist(L,to),pct=Math.max(0,Math.min(100,(1-d/tot)*100));
      let t=(S.flt?S.flt+" · ":"")+Math.round(pct)+"% · "+Math.round(fDst(d)).toLocaleString()+" "+S.dst+" to go";const n=navT(L,to);if(n){t+=" · "+hm(n.sec)+" · ETA "+n.eta}if(L.dr)t+=" · EST";$("sTxt").textContent=t}
    else{$("sTxt").textContent=Math.round(fDst(tot)).toLocaleString()+" "+S.dst+" · waiting for GPS"}}
  else st.style.display="none";
  try{posInfo();arrInfo()}catch(e){}
  logInfo();
}

/* ---------- status + clock ---------- */
setInterval(()=>{
  const n=new Date();$("clock").textContent=n.toTimeString().slice(0,5)+" · "+n.toISOString().slice(11,16)+"Z";
  if(PH.ev&&PH.ev.up&&!PH.ev.td&&n.getSeconds()%10===0)evRender();
  {const ph=tkOn()?"ADS-B · "+PHN[tkPhase()]:PHN[PH.p];if($("phase").textContent!==ph)$("phase").textContent=ph}
  if(tkOn()&&(watchId==null||GROUND.includes(PH.p))){const a=Math.max(0,Math.round((Date.now()-TKS.L.t)/1000));$("stat").textContent="ADS-B "+TKS.reg+" · "+(tkStale()?"last seen "+(a<5400?Math.round(a/60)+" min":Math.round(a/3600)+" h")+" ago":"report "+a+" s ago"+(a>20?" · moving it on (EST)":""));$("dot").className="dot "+(tkStale()?"warn":"ok");return}
  if(watchId==null&&!demo){tkStatReset();return}
  const age=(Date.now()-lastFixAt)/1000;
  if(watchId!=null&&last&&!demo&&!REPLAY&&(Date.now()-last.t)>8000&&n.getSeconds()%5===0){try{render()}catch(e){}}
  if(resuming()){$("stat").textContent="Resuming GPS…"+(lastFixAt?" last fix "+Math.round((Date.now()-lastFixAt)/1000)+"s ago":"");$("dot").className="dot warn";return}
  if(!lastFixAt){$("stat").textContent="Searching… sit near a window";$("dot").className="dot warn";return}
  if(age>45){hist=[];vsClear();$("stat").textContent="Signal lost "+Math.round(age)+"s — move closer to the window";$("dot").className="dot bad";return}
  if(age>12){$("stat").textContent="Holding last position · "+Math.round(age)+"s since fix";$("dot").className="dot warn";return}
  const a=last&&last.acc,va=last&&last.altAcc;$("stat").textContent=(a<=50?"GPS good ±"+Math.round(a)+" m":a<=300?"GPS weak ±"+Math.round(a)+" m":"GPS poor ±"+Math.round(a||0)+" m")+(va!=null?" · V±"+Math.round(va)+" m":"");
  $("dot").className="dot "+(a<=50?"ok":a<=300?"warn":"bad");
},1000);

/* ---------- attitude ---------- */
const PX=6;
function slope(arr){const t0=arr[0].t;let n=arr.length,sx=0,sy=0,sxx=0,sxy=0;for(const q of arr){const x=(q.t-t0)/1000;sx+=x;sy+=q.v;sxx+=x*x;sxy+=x*q.v}const den=n*sxx-sx*sx;return den?(n*sxy-sx*sy)/den:null}
function gpsAtt(){
  const L=last;if(!L||L.spd==null||L.spd<30){att.p=0;att.r=0;att.rate=null;return}
  let rate=trkH.length>=3&&(trkH[trkH.length-1].t-trkH[0].t)>2500?slope(trkH):null;
  if(rate!=null&&Math.abs(rate)>8)rate=null;
  att.rate=rate;
  const bank=rate==null?0:deg(Math.atan(L.spd*rad(rate)/9.80665));
  const v=vsFpm(),fpa=v==null?0:deg(Math.atan2(v/196.85,L.spd));
  att.r=att.r*0.6+Math.max(-60,Math.min(60,bank))*0.4;
  {const k=(L.altAcc!=null&&L.altAcc>25)?0.15:0.4;att.p=att.p*(1-k)+(fpa+(L.spd>60?2.5:0))*k}
}
function onOrient(e){
  const a=e.accelerationIncludingGravity,w=e.rotationRate;if(!a||a.x==null)return;
  const now=performance.now(),dt=sen.lt?Math.min(0.2,(now-sen.lt)/1000):0;sen.lt=now;
  const ar=deg(Math.atan2(a.x,-a.y))-sen.r0,ap=deg(Math.atan2(a.z,Math.hypot(a.x,a.y)))-sen.p0;
  sen.gr=ar;sen.gp=ap;
  if(w&&w.alpha!=null&&dt){sen.r+=-w.alpha*dt;sen.p+=w.beta*dt}
  const k=dt/(20+dt);sen.r+=(ar-sen.r)*(dt?k:1);sen.p+=(ap-sen.p)*(dt?k:1);
}
async function senStart(){
  try{if(typeof DeviceMotionEvent!=="undefined"&&typeof DeviceMotionEvent.requestPermission==="function"){const r=await DeviceMotionEvent.requestPermission();if(r!=="granted"){$("bank").textContent="Denied";return false}}
  window.addEventListener("devicemotion",onOrient);sen.on=true;return true}catch(e){$("bank").textContent="No sensor";return false}
}
function senStop(){window.removeEventListener("devicemotion",onOrient);sen.on=false}
$("lvlBtn").onclick=()=>{if(sen.gr==null)return;sen.r0+=sen.gr;sen.p0+=sen.gp;sen.r=0;sen.p=0;sen.gr=0;sen.gp=0};
const SCNI={day:"bg-day.webp",ocean:"bg-ocean.webp",sunset:"bg-sunset.webp",night:"bg-night.webp",appday:"bg-appday.webp",appnight:"bg-appnight.webp",apron:"bg-apron.webp",apronnight:"bg-apronnight.webp"};
const SCNN={day:"OUTBACK",ocean:"OCEAN",sunset:"DUSK",night:"NIGHT",appday:"APPROACH",appnight:"APPROACH NIGHT",apron:"GROUND",apronnight:"GROUND NIGHT"};
function inAus(lat,lon){for(const poly of COAST){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const yi=poly[i][0],xi=poly[i][1],yj=poly[j][0],xj=poly[j][1];if(((yi>lat)!==(yj>lat))&&(lon<(xj-xi)*(lat-yi)/(yj-yi)+xi))c=!c}if(c)return true}return false}
let curScn="",curFlip=false,bgTop="bgA";
const GROUND=["parked","taxi","roll","landed"];
/* v18: cross-fade between two images so phase/scene changes (e.g. apron to sky after takeoff) are smooth */
function bgSet(href,flip){const cur=$(bgTop),nxt=$(bgTop==="bgA"?"bgB":"bgA");const ft=flip?"translate(360 0) scale(-1 1)":null;
  if(!cur.getAttribute("href")){cur.setAttribute("href",href);if(ft)cur.setAttribute("transform",ft);else cur.removeAttribute("transform");return}
  if(cur.getAttribute("href")===href){if(ft)cur.setAttribute("transform",ft);else cur.removeAttribute("transform");return}
  nxt.setAttribute("href",href);if(ft)nxt.setAttribute("transform",ft);else nxt.removeAttribute("transform");
  nxt.parentNode.appendChild(nxt);for(const id of ["skyF","gndF"])nxt.parentNode.appendChild($(id));
  nxt.setAttribute("opacity","0");void nxt.getBoundingClientRect();nxt.style.opacity="1";cur.style.opacity="0";bgTop=nxt.id}
function pickScene(){
  const im=$("bgA");if(!im)return;let k=S.scn||"auto",flip=false;const tko=tkOn(),L=tko?tkLive():last,ph=tko?tkPhase():PH.p;
  const sp=L?sunPos(Date.now(),L.lat,L.lon):sunPos(Date.now(),-35.3,149.1);
  if(k==="auto"){if(GROUND.includes(ph)&&!(demo&&demo.stg==="air"))k=sp.el<-4?"apronnight":"apron";else if(ph==="approach")k=sp.el<-4?"appnight":"appday";else if(sp.el<-6)k="night";else if(sp.el<6)k="sunset";else if(L&&!inAus(L.lat,L.lon))k="ocean";else k="day"}
  else if(k==="app")k=sp.el<-4?"appnight":"appday";
  let wxr=null;if((S.scn||"auto")==="auto"&&S.wxs!=="off"&&typeof wxScene==="function"){try{wxr=wxScene(k,sp);if(wxr&&wxr.k&&SCNI[wxr.k])k=wxr.k}catch(e){wxr=null}}try{wxApply(wxr)}catch(e){}
  if(k==="sunset"&&L&&L.trk!=null){const rel=((sp.az-L.trk)%360+540)%360-180;flip=rel>0}
  if(k!==curScn||flip!==curFlip){const dark=k==="night"||k==="appnight"||k==="apronnight"||/night/.test(k);$("skyF").setAttribute("opacity",dark?".34":".1");$("gndF").setAttribute("opacity",dark?".42":".1");bgSet(SCNI[k],flip);curScn=k;curFlip=flip}
}
setInterval(pickScene,5000);
let adiR=0,adiP=0,dispS=null,dispA=null,hudKey="",hudLast=0,bootT0=performance.now(),bootDone=false;
const reduceMo=matchMedia("(prefers-reduced-motion: reduce)").matches;
function hudDraw(p,r,fpa,live,now){
  const L=tkOn()?TKS.L:last,cx=180,cy=150,g="var(--hud)",T=(x,y,t,a,sz,w)=>`<text x="${x}" y="${y}" fill="${g}" stroke="none" font-size="${sz||12}" font-weight="${w||400}"${a?` text-anchor="${a}"`:""}>${t}</text>`;
  const symG=$("hudSym");
  /* power-on HUD align (skipped with reduced motion) */
  const bt=Math.max(0,now-bootT0);
  if(!bootDone&&!reduceMo&&bt<1700){const f=Math.min(1,bt/1500),rot=bt*0.25;
    symG.setAttribute("opacity","1");
    symG.innerHTML=`<g stroke="${g}" fill="none" stroke-width="2"><circle cx="${cx}" cy="${cy}" r="46" stroke-dasharray="10 8" transform="rotate(${rot.toFixed(1)} ${cx} ${cy})"/><path d="M${cx-70} ${cy}H${cx-14}M${cx+14} ${cy}H${cx+70}M${cx} ${cy-70}V${cy-14}M${cx} ${cy+14}V${cy+70}"/><rect x="${cx-80}" y="${cy+92}" width="160" height="10"/><rect x="${cx-80}" y="${cy+92}" width="${(160*f).toFixed(1)}" height="10" fill="${g}"/></g>`+T(cx,cy-96,"HUD ALIGN","middle",14,700)+T(cx,cy+124,f<1?"BIT "+Math.round(f*100)+"%":"BIT PASS","middle",11,700);
    return}
  if(!bootDone){bootDone=true;bootT0=now}
  symG.setAttribute("opacity",reduceMo?"1":String(Math.min(1,(now-bootT0)/450).toFixed(2)));
  let h='<defs><clipPath id="hc"><rect x="60" y="36" width="240" height="228"/></clipPath><clipPath id="ht"><rect x="60" y="0" width="240" height="34"/></clipPath><clipPath id="hs"><rect x="0" y="36" width="58" height="228"/></clipPath><clipPath id="ha"><rect x="302" y="36" width="58" height="228"/></clipPath>'+
    `<clipPath id="sbx"><rect x="4" y="${cy-11}" width="44" height="22"/></clipPath><clipPath id="abx"><rect x="313" y="${cy-11}" width="44" height="22"/></clipPath></defs>`;
  h+=`<g stroke="${g}" fill="none" stroke-width="2" stroke-linecap="round">`;
  /* pitch ladder */
  let lad="";const lo=Math.floor((p-24)/5)*5,hi=Math.ceil((p+24)/5)*5;
  for(let d=Math.max(-85,lo);d<=Math.min(85,hi);d+=5){const y=cy-d*PX;
    if(d===0){lad+=`<path d="M${cx-170} ${y}H${cx-26}M${cx+26} ${y}H${cx+170}" stroke-width="2.6"/>`;continue}
    const tk=d>0?8:-8,da=d<0?' stroke-dasharray="8 6"':"";
    lad+=`<path${da} d="M${cx-66} ${y+tk}V${y}H${cx-20}M${cx+20} ${y}H${cx+66}V${y+tk}"/>`+T(cx-72,y+4,Math.abs(d),"end")+T(cx+72,y+4,Math.abs(d));}
  h+=`<g clip-path="url(#hc)"><g transform="rotate(${(-r).toFixed(2)} ${cx} ${cy}) translate(0 ${(p*PX).toFixed(1)})">${lad}</g></g>`;
  /* bank scale */
  const R=110;for(const a of [-45,-30,-20,-10,0,10,20,30,45]){const ar=rad(a),l=a%30===0?12:7;h+=`<line x1="${cx+R*Math.sin(ar)}" y1="${cy+R*Math.cos(ar)}" x2="${cx+(R+l)*Math.sin(ar)}" y2="${cy+(R+l)*Math.cos(ar)}"/>`}
  h+=`<path transform="rotate(${(-r).toFixed(2)} ${cx} ${cy})" d="M${cx} ${cy+R-2}l-7 -12h14z" fill="${g}"/>`;
  /* waterline + flight path marker */
  h+=`<path d="M${cx-34} ${cy}H${cx-15}L${cx-7} ${cy+9}L${cx} ${cy}L${cx+7} ${cy+9}L${cx+15} ${cy}H${cx+34}" stroke-width="2.6"/>`;
  if(live&&fpa!=null){const y=Math.max(50,Math.min(250,cy-(fpa-p)*PX));h+=`<circle cx="${cx}" cy="${y}" r="7"/><path d="M${cx-7} ${y}H${cx-19}M${cx+7} ${y}H${cx+19}M${cx} ${y-7}V${y-14}"/>`}
  /* heading tape (labels kept clear of the box) */
  const hd=L&&L.trk!=null?L.trk:0;let ht="";
  for(let d=Math.floor((hd-45)/5)*5;d<=hd+45;d+=5){const x=cx+(d-hd)*3,n=((d%360)+360)%360;ht+=`<line x1="${x}" y1="32" x2="${x}" y2="${n%10?27:23}"/>`;if(n%10===0&&Math.abs(x-cx)>38&&x>=70&&x<=290)ht+=T(x,17,String(n/10).padStart(2,"0"),"middle",11)}
  const to=tkOn()?tkAp():apBy(S.to);if(to&&L){const rel=((brg(L,to)-hd)%360+540)%360-180,x=cx+Math.max(-39,Math.min(39,rel))*3;ht+=`<path d="M${x} 27l5 6h-10z" fill="var(--mag)" stroke="var(--mag)"/>`}
  const box=d=>`<path d="${d}" fill="#000" stroke="#000" stroke-width="5" stroke-linejoin="round"/><path d="${d}" fill="#000" stroke="${g}" stroke-width="1.7" stroke-linejoin="round"/>`;
  h+=`<g clip-path="url(#ht)" stroke-width="1.6">${ht}</g>`+box(`M${cx-25} 1H${cx+25}V21H${cx+5}L${cx} 27L${cx-5} 21H${cx-25}Z`)+T(cx,16,L&&L.trk!=null?String(Math.round(hd)%360).padStart(3,"0"):"---","middle",14,700);
  /* rolling-drum readout */
  const roll=(xr,val,fs,clip,zero)=>{if(val==null)return T(xr,cy+fs*0.36,"---","end",fs,700);val=Math.max(0,val);const cw=fs*0.62,base=Math.floor(val),fr=val-base,d=base%10,nx=(d+1)%10,lead=Math.floor(base/10),xd=xr-(zero?cw:0),y0=cy+fs*0.36,sh=fs*1.15;
    let o=zero?T(xr,y0,"0","end",fs,700):"";o+=`<g clip-path="url(#${clip})">`+T(xd,(y0-fr*sh).toFixed(1),d,"end",fs,700)+T(xd,(y0+sh-fr*sh).toFixed(1),nx,"end",fs,700)+"</g>";if(lead>0)o+=T(xd-cw,y0,lead,"end",fs,700);return o};
  /* speed tape */
  const sv=dispS,sp={kt:[2.2,10],kmh:[1.2,20],mph:[2,10]}[S.spd]||[2.2,10],svv=sv||0;let st="";
  for(let u=Math.floor((svv-60/sp[0]*1.9)/sp[1])*sp[1];u<=svv+120/sp[0];u+=sp[1]){if(u<0)continue;const y=cy-(u-svv)*sp[0];st+=`<line x1="56" y1="${y}" x2="${u%(sp[1]*2)?50:46}" y2="${y}"/>`;if(u%(sp[1]*2)===0&&Math.abs(y-cy)>18)st+=T(42,y+4,u,"end",11)}
  h+=`<g clip-path="url(#hs)" stroke-width="1.6">${st}</g><line x1="57" y1="40" x2="57" y2="260" stroke-width="1"/>`+box(`M2 ${cy-13}H49L57 ${cy}L49 ${cy+13}H2Z`)+roll(47,sv,15,"sbx",false)+T(4,30,"GS "+(S.spd==="kmh"?"KM/H":S.spd.toUpperCase()),null,10);
  /* altitude tape */
  const av=dispA,ap=S.alt==="ft"?[0.11,100,500]:[0.36,50,200],avv=av||0;let at="";
  for(let u=Math.floor((avv-120/ap[0])/ap[1])*ap[1];u<=avv+120/ap[0];u+=ap[1]){const y=cy-(u-avv)*ap[0];at+=`<line x1="303" y1="${y}" x2="${u%ap[2]?309:314}" y2="${y}"/>`;if(u%ap[2]===0&&Math.abs(y-cy)>18)at+=T(318,y+4,u,null,10)}
  const afs=avv>=10000?13:14;
  h+=`<g clip-path="url(#ha)" stroke-width="1.6">${at}</g><line x1="302" y1="40" x2="302" y2="260" stroke-width="1"/>`+box(`M358 ${cy-13}H311L303 ${cy}L311 ${cy+13}H358Z`)+roll(355,av==null?null:av/10,afs,"abx",true)+T(356,30,"ALT "+S.alt.toUpperCase(),"end",10);
  /* v18: ETA and time remaining, same values as the top progress bar */
  {const nt=hudNav();if(nt)h+=T(3,14,nt[0],null,10,700)+T(357,14,nt[1],"end",10,700)}
  /* bottom readouts */
  const v=vsFpm();h+=T(4,292,"VS "+(v==null?"---":(v>0?"+":"")+Math.round(v/50)*50),null,12,700)+T(cx,292,gOn&&gS!=null?"G "+gS.toFixed(1):(curScn?"SVS "+SCNN[curScn]+(typeof wxLab==="string"&&wxLab?" · "+wxLab:""):""),"middle",gOn&&gS!=null?12:10,700)+T(356,292,(S.att==="sen"&&sen.on?"GYRO":"GPS")+" ATT","end",12,700);
  if(tkOn())h+=tkHudBan(cx,T);
  if(!L)h+=`<rect x="${cx-62}" y="${cy-62}" width="124" height="22" fill="#000" stroke="var(--warn)"/><text x="${cx}" y="${cy-46}" fill="var(--warn)" stroke="none" font-size="12" font-weight="700" text-anchor="middle">NO GPS</text>`;
  h+="</g>";symG.innerHTML=h;
}
/* battery: one rAF loop at ~15 fps that skips frames when nothing on the HUD has changed */
function hudNav(){const to=tkOn()?tkTo():apBy(S.to);if(!to)return null;const n=navT(viewL(),to);return n?["ETA "+n.eta,"REM "+remS(n.sec)]:["ETA --:--","REM --"]}
let bgXf="";
function hudLoop(now){
  requestAnimationFrame(hudLoop);
  if(document.hidden||now-hudLast<66)return;hudLast=now;const tko=tkOn(),LL=tko?tkLive():last;
  const useSen=!tko&&S.att==="sen"&&sen.on,ta=tko?tkAtt():att,p=useSen?sen.p:ta.p,r=useSen?sen.r:ta.r;
  adiR+=(r-adiR)*0.35;adiP+=(p-adiP)*0.35;
  const live=useSen||(LL&&LL.spd!=null&&LL.spd>=30&&!(tko&&tkStale()));
  const v=vsFpm(),fpa=LL&&LL.spd>30&&v!=null?deg(Math.atan2(v/196.85,LL.spd)):null;
  const tS=LL&&LL.spd!=null?fSpd(LL.spd):null,tA=LL&&LL.alt!=null?fAlt(LL.alt):null;
  dispS=tS==null?null:(dispS==null||Math.abs(tS-dispS)>60?tS:dispS+(tS-dispS)*0.18);
  dispA=tA==null?null:(dispA==null||Math.abs(tA-dispA)>3000?tA:dispA+(tA-dispA)*0.18);
  const booting=!bootDone||(now-bootT0<500);
  const key=[booting?Math.round(now/66):0,adiP.toFixed(1),adiR.toFixed(1),LL&&LL.trk!=null?Math.round(LL.trk):"-",dispS==null?"-":dispS.toFixed(2),dispA==null?"-":dispA.toFixed(1),v==null?"-":Math.round(v/50),fpa==null?"-":fpa.toFixed(1),live?1:0,LL?1:0,curScn,S.spd,S.alt,S.att,sen.on?1:0,gOn&&gS!=null?gS.toFixed(1):"",S.to].join("|");
  const nt=hudNav();
  const k2=key+"|"+(nt?nt.join(""):"");if(k2!==hudKey){hudKey=k2;hudDraw(Math.max(-60,Math.min(60,adiP)),adiR,fpa,live,now)}
  /* v18: backdrop pitches and banks with the horizon (same scale as the ladder), capped; static with reduced motion */
  {const bp=Math.max(-25,Math.min(25,adiP)),br=Math.max(-60,Math.min(60,adiR));const xf=reduceMo||!live?"":`rotate(${(-br).toFixed(1)} 180 150) translate(0 ${(bp*PX).toFixed(1)})`;
   if(xf!==bgXf){bgXf=xf;const g=$("bgG");if(xf)g.setAttribute("transform",xf);else g.removeAttribute("transform")}}
  const bk=live?(Math.abs(adiR)<1?"LVL":Math.round(Math.abs(adiR))+"° "+(adiR>0?"R":"L")):"---",pt=live?(adiP>=0?"+":"")+adiP.toFixed(1)+"°":"---",tr=!useSen&&ta.rate!=null?Math.abs(ta.rate).toFixed(1)+"°/s":"---";
  if($("bank").textContent!==bk)$("bank").textContent=bk;if($("pitch").textContent!==pt)$("pitch").textContent=pt;if($("trate").textContent!==tr)$("trate").textContent=tr;
}
requestAnimationFrame(hudLoop);



/* ---------- out the window ---------- */
const LM=[["Uluru",-25.344,131.037],["Kata Tjuta",-25.30,130.73],["Kings Canyon",-24.25,131.57],["West MacDonnell Ranges",-23.65,132.9],["Karlu Karlu (Devils Marbles)",-20.56,134.26],["Kati Thanda–Lake Eyre",-28.37,137.37],["Lake Torrens",-31.0,137.9],["Lake Gairdner",-31.6,135.9],["Lake Frome",-30.8,139.8],["Wilpena Pound, Flinders Ranges",-31.53,138.60],["Coober Pedy",-29.01,134.75],["Woomera",-31.20,136.82],["Olympic Dam mine",-30.45,136.88],["Port Augusta, Spencer Gulf",-32.49,137.77],["Kangaroo Island",-35.8,137.25],["Murray Mouth",-35.56,138.88],["The Coorong",-36.0,139.5],["Barossa Valley",-34.53,138.95],["Head of Bight cliffs",-31.47,131.15],["Nullarbor Plain",-31.0,128.9],["Kalgoorlie Super Pit",-30.78,121.50],["Lake Lefroy salt lake",-31.25,121.7],["Wave Rock",-32.44,118.90],["Rottnest Island",-32.0,115.5],["The Pinnacles",-30.6,115.16],["Shark Bay",-25.9,113.7],["Ningaloo Reef",-22.7,113.7],["Karijini gorges",-22.5,118.4],["Lake Argyle",-16.3,128.7],["Bungle Bungle Range",-17.5,128.4],["Lake Mackay",-22.5,128.6],["Kakadu",-12.67,132.84],["Katherine Gorge",-14.32,132.42],["Tennant Creek",-19.65,134.19],["Mount Isa mine",-20.73,139.49],["Gulf of Carpentaria coast",-17.49,140.84],["Daintree Rainforest",-16.25,145.3],["Green Island, Great Barrier Reef",-16.76,145.97],["Hinchinbrook Island",-18.38,146.25],["Whitsunday Islands",-20.27,148.95],["Carnarvon Gorge",-25.07,148.23],["K'gari (Fraser Island)",-25.25,153.15],["Moreton Island",-27.15,153.40],["Toowoomba, Great Dividing Range",-27.56,151.95],["Wollumbin (Mt Warning)",-28.40,153.27],["Cape Byron",-28.64,153.64],["Warrumbungle Range",-31.28,149.0],["Dubbo",-32.25,148.6],["Hunter Valley",-32.75,151.3],["Bathurst",-33.42,149.58],["Blue Mountains",-33.71,150.31],["Sydney Harbour",-33.85,151.25],["Jervis Bay",-35.07,150.73],["Lake Burley Griffin, Canberra",-35.29,149.12],["Lake Eucumbene",-36.09,148.66],["Mount Kosciuszko",-36.456,148.264],["Lake Hume",-36.10,147.05],["Broken Hill",-31.95,141.47],["Murray–Darling junction",-34.11,141.92],["Mildura",-34.19,142.16],["Grampians",-37.2,142.5],["Bendigo",-36.76,144.28],["Ballarat",-37.56,143.85],["Lake Eildon",-37.2,145.9],["Port Phillip Bay",-38.1,144.9],["Twelve Apostles",-38.665,143.105],["Wilsons Promontory",-39.03,146.32],["Gippsland Lakes",-37.9,147.8],["King Island",-39.85,143.98],["Flinders Island",-40.0,148.05],["Cradle Mountain",-41.68,145.95],["Freycinet, Wineglass Bay",-42.15,148.30],["kunanyi / Mt Wellington",-42.896,147.237]].map(a=>({n:a[0],lat:a[1],lon:a[2]}));
function sunPos(ms,lat,lon){
  const d=ms/86400000+2440587.5-2451545.0,g=rad(357.529+0.98560028*d),q=280.459+0.98564736*d;
  const L=rad(q+1.915*Math.sin(g)+0.020*Math.sin(2*g)),e=rad(23.439-0.00000036*d);
  const ra=Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L)),dec=Math.asin(Math.sin(e)*Math.sin(L));
  const gmst=((18.697374558+24.06570982441908*d)%24+24)%24,H=rad(gmst*15+lon)-ra,p=rad(lat);
  const el=Math.asin(Math.sin(p)*Math.sin(dec)+Math.cos(p)*Math.cos(dec)*Math.cos(H));
  const az=(deg(Math.atan2(-Math.sin(H)*Math.cos(dec),Math.sin(dec)*Math.cos(p)-Math.cos(dec)*Math.sin(p)*Math.cos(H)))+360)%360;
  return {el:deg(el),az};
}
const sunThr=altM=>-0.833-0.0293*Math.sqrt(Math.max(0,altM||0));
function side(rel){rel=((rel%360)+540)%360-180;const clk=((Math.round(rel/30)%12)+12)%12||12;const s=Math.abs(rel)<20?"ahead":Math.abs(rel)>160?"behind":rel>0?"right":"left";return {s,clk}}
function sunEvent(L){
  const to=apBy(S.to),moving=L.spd!=null&&L.spd>25;let pos={lat:L.lat,lon:L.lon},alt=L.alt||0,arr=false;
  const tot=to?dist(L,to):0;let prevA=null,prevG=null,ev=null,evG=null;const now=Date.now();
  for(let m=0;m<=16*60;m+=2){
    if(to&&moving&&!arr){const f=Math.min(1,L.spd*m*60/tot);pos=gcPoint(L,to,f);if(f>=1){arr=true;alt=0}}
    const sp=sunPos(now+m*60000,pos.lat,pos.lon),a=sp.el-sunThr(alt),gr=sp.el-sunThr(0);
    if(prevA!=null&&!ev&&(a>0)!==(prevA>0))ev={t:now+m*60000,up:a>0};
    if(prevG!=null&&!evG&&(gr>0)!==(prevG>0))evG={t:now+m*60000,up:gr>0};
    if(ev&&evG)break;prevA=a;prevG=gr;
  }
  return {ev,evG};
}
let sunCache={t:0,v:null},inView=[];
function windowInfo(){
  const L=last;if(!L){$("sunTxt").textContent="Waiting for a GPS fix.";$("lmList").innerHTML="";return}
  const sp=sunPos(Date.now(),L.lat,L.lon),thr=sunThr(L.alt);
  let t="";
  if(sp.el>thr){const sd=L.trk!=null?side(sp.az-L.trk):null;t=`Sun ${Math.round(sp.el)}° above the horizon, bearing ${String(Math.round(sp.az)).padStart(3,"0")}°`+(sd?` — ${sd.s==="left"||sd.s==="right"?"your "+sd.s.toUpperCase()+" side ("+sd.clk+" o'clock)":sd.s}`:"")+". "}
  else t=sp.el>-6?"Twilight: the sun is just below your horizon. ":"Night: the sun is "+Math.round(-sp.el)+"° below the horizon. ";
  if(Date.now()-sunCache.t>20000){sunCache={t:Date.now(),v:sunEvent(L)}}
  const {ev,evG}=sunCache.v;
  if(ev){const mins=Math.round((ev.t-Date.now())/60000),clock=new Date(ev.t).toTimeString().slice(0,5);t+=`${ev.up?"Sunrise":"Sunset"} for you in ${hm(mins*60)} (${clock} phone time)`;
    if(evG&&ev.up===evG.up&&(L.alt||0)>1000){const diff=Math.round(Math.abs(ev.t-evG.t)/60000);if(diff>=2)t+=`, about ${diff} min ${ev.up?"earlier":"later"} than on the ground below`;}t+="."}
  else t+="No sunrise or sunset in the next 16 hours.";
  $("sunTxt").textContent=t;
  const sg=$("sunG");if(sp.el>-6){const a=rad(sp.az),r=84;sg.innerHTML=`<circle cx="${150+r*Math.sin(a)}" cy="${150-r*Math.cos(a)}" r="9" fill="#ffd400" stroke="#000" stroke-width="1.5" opacity="${sp.el>thr?1:.45}"/>`}else sg.innerHTML="";
  const hft=Math.max(0,(L.alt||0)*FT),range=Math.min(150,Math.max(25,1.17*Math.sqrt(hft)))*NMm;
  const all=lmAll().map(l=>({l,d:dist(L,l),b:brg(L,l)})).sort((a,b)=>a.d-b.d);
  inView=all.filter(x=>x.d<=range).slice(0,6);
  const seat=S.seat==="left"||S.seat==="right"?S.seat:null;
  const rows=(inView.length?inView:all.slice(0,1)).map(x=>{const sd=L.trk!=null?side(x.b-L.trk):null;const cls=seat&&sd&&(sd.s==="left"||sd.s==="right")?(sd.s===seat?' class="myside"':' class="dimside"'):"";return `<li${cls}><div><b>${esc(x.l.n)}</b>${x.l.note?`<small class="lmn">${esc(x.l.note)}</small>`:""}</div><span>${Math.round(fDst(x.d))} ${S.dst} · ${sd?(sd.s==="left"||sd.s==="right"?sd.s+", "+sd.clk+" o'clock":sd.s):String(Math.round(x.b)).padStart(3,"0")+"°"}</span></li>`}).join("");
  $("lmList").innerHTML=rows;
  $("lmHead").textContent=inView.length?`In view within about ${Math.round(fDst(range))} ${S.dst}`:"Nothing on the list in view. Nearest:";
  comingUp(L,range);
}
/* v18: what passes your window next, filtered to your seat side */
function comingUp(L0,range){
  const L=(tkOn()?last:viewL())||L0,el=$("cuList"),to=apBy(S.to),seat=S.seat==="left"||S.seat==="right"?S.seat:null;
  if(!L||L.spd==null||L.spd<25||(!to&&L.trk==null)){el.innerHTML='<li><span>Shows what will pass your window once you are moving.</span></li>';$("cuHead").textContent="Coming up";return}
  const crs=to?brg(L,to):L.trk,lim=to?dist(L,to):L.spd*3600,near=5*NMm,hft=Math.max(30000,(L.alt||0)*FT),vr=Math.min(150,Math.max(40,1.17*Math.sqrt(hft)))*NMm;
  const cands=lmAll().map(l=>({n:l.n,lat:l.lat,lon:l.lon,k:"lm"})).concat(AP.filter(a=>!to||a.c!==to.c).map(a=>({n:a.n+" airport ("+a.c+")",lat:a.lat,lon:a.lon,k:"ap"})));
  const out=[];
  for(const c of cands){const d13=dist(L,c)/R,dth=rad(brg(L,c)-crs);if(Math.cos(dth)<=0)continue;const xt=Math.asin(Math.sin(d13)*Math.sin(dth))*R;
    const at=Math.acos(Math.max(-1,Math.min(1,Math.cos(d13)/Math.cos(xt/R))))*R;if(at>lim||at<2000||Math.abs(xt)>vr)continue;
    const sd=Math.abs(xt)<near?"near track":xt>0?"right":"left";if(seat&&sd!=="near track"&&sd!==seat)continue;out.push({n:c.n,at,xt,sd,sec:at/L.spd})}
  out.sort((a,b)=>a.at-b.at);
  const rows=out.slice(0,6).map(x=>`<li${seat&&x.sd===seat?' class="myside"':""}><b>${esc(x.n)}</b><span>in ${hm(x.sec)} · ${x.sd==="near track"?"near track":x.sd+" "+Math.round(fDst(Math.abs(x.xt)))+" "+S.dst+" off"}</span></li>`);
  if(to){const n=navT(L,to);if(n)rows.push(`<li><b>Arrive ${esc(to.c)}</b><span>in ${hm(n.sec)} · ETA ${n.eta}</span></li>`)}
  el.innerHTML=rows.length?rows.join(""):'<li><span>Nothing on the list passes your side before arrival.</span></li>';
  $("cuHead").textContent="Coming up"+(seat?" on your "+seat.toUpperCase()+" side":" (both sides)");
}

/* ---------- states & time zones ---------- */
const STN={WA:"Western Australia",NT:"the Northern Territory",SA:"South Australia",QLD:"Queensland",NSW:"New South Wales",ACT:"the ACT",VIC:"Victoria",TAS:"Tasmania"};
const STZ={WA:"Perth",NT:"Darwin",SA:"Adelaide",QLD:"Brisbane",NSW:"Sydney",ACT:"Sydney",VIC:"Melbourne",TAS:"Hobart"};
const interp=(pts,lon)=>{if(lon<=pts[0][0])return pts[0][1];for(let i=1;i<pts.length;i++){if(lon<=pts[i][0]){const [a,b]=[pts[i-1],pts[i]];return a[1]+(b[1]-a[1])*(lon-a[0])/(b[0]-a[0])}}return pts[pts.length-1][1]};
const QB=[[141,-29],[148.9,-29],[150.5,-28.6],[152.0,-28.55],[152.5,-28.3],[153.55,-28.17]];
const VB=[[140.96,-34.0],[142.1,-34.2],[143.6,-35.3],[144.75,-36.1],[146.9,-36.08],[147.9,-36.2],[148.2,-36.8],[149.98,-37.5]];
function stateAt(lat,lon){if(lat<-39.3&&lon>143.5)return "TAS";if(lon<129)return "WA";if(lon<138)return lat>-26?"NT":"SA";if(lon<141)return lat>-26?"QLD":"SA";if(lat>interp(QB,lon))return "QLD";if(lon>148.76&&lon<149.4&&lat>-35.92&&lat<-35.12)return "ACT";if(lat<interp(VB,lon))return "VIC";return "NSW"}
function tzOff(city){try{const s=new Intl.DateTimeFormat("en-AU",{timeZone:"Australia/"+city,timeZoneName:"longOffset"}).formatToParts(new Date()).find(p=>p.type==="timeZoneName").value;const m=s.match(/([+-])(\d{1,2}):?(\d{2})?/);return m?(m[1]==="-"?-1:1)*(+m[2]*60+(+m[3]||0)):null}catch(e){return null}}

/* ---------- voice ---------- */
let voiceOn=false,auVoice=null,toastT=0;
function pickVoice(){try{const v=speechSynthesis.getVoices();auVoice=(S.vox!=="system"&&voxFemale(v))||v.find(x=>/en-AU/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null}catch(e){}}
try{speechSynthesis.onvoiceschanged=pickVoice;pickVoice()}catch(e){}
function say(text,low){
  $("toast").textContent=text;$("toast").style.display="";{const ft=$("fhToast");if(ft){ft.textContent=text;ft.classList.remove("gone");ft.style.opacity="1";clearTimeout(window.__ftT);window.__ftT=setTimeout(()=>{ft.style.opacity="0";ft.classList.add("gone")},7000)}}clearTimeout(toastT);toastT=setTimeout(()=>{$("toast").style.display="none"},9000);
  if(!voiceOn||S.vox==="off")return;if(voxSay(text,low))return;try{if(low&&(speechSynthesis.pending||speechSynthesis.speaking))return;const u=new SpeechSynthesisUtterance(text);if(auVoice)u.voice=auVoice;u.rate=1;speechSynthesis.speak(u)}catch(e){}
}
const spokenName=n=>n.replace(/\s*\(.*?\)/,"").replace(/–/g," ").replace(/kunanyi \/ /,"");
const sayDist=m=>Math.round(fDst(m))+(S.dst==="nm"?" nautical miles":" kilometres");

/* ---------- phase detection ---------- */
const PHN={parked:"Parked",taxi:"Taxi",roll:"Takeoff roll",climb:"Climb",cruise:"Cruise",descent:"Descent",approach:"Approach",landed:"Landed"};
let PH=Object.assign({p:"parked",alt0:null,ev:{},said:{},lm:[],lastLm:0,st:null,stC:0,holds:{}},store.get("phase",{}));
PH.holds={};
let gBuf=[],spdH=[],goP=null;
const savePH=()=>store.set("phase",{bookId:PH.bookId,ended:PH.ended,rt:PH.rt,sts:PH.sts,demo:PH.demo,p:PH.p,alt0:PH.alt0,ev:PH.ev,said:PH.said,lm:PH.lm,lastLm:PH.lastLm,st:PH.st});
function hold(k,cond,t,secs){if(!cond){delete PH.holds[k];return false}if(PH.holds[k]==null)PH.holds[k]=t;return t-PH.holds[k]>=secs*1000}
function setPhase(p,t){PH.p=p;PH.holds={};if(!REPLAY)hap([25,40,25]);{const fp=$("fhPhase");if(fp)fp.textContent=PHN[p];const cp=$("cmpPhase");if(cp)cp.textContent=PHN[p]}setTimeout(()=>{try{pickScene()}catch(e){}},0);$("phase").textContent=PHN[p];savePH();evRender()}
const fl=a=>"flight level "+String(Math.round(a*FT/1000)*10).split("").join(" ");
/* v20: a stop on the way to the gate can reach Parked (4 min still). If it moves again within 25 min of on-blocks,
   with no takeoff and the same route, it's still taxi-in on the same flight: same times, same log, same logbook entry. */
function resumeTaxiIn(t){const e=PH.ev||{};if(!e.td||!e.on||PH.ended||PH.demo||t-e.on>25*60000||PH.rt!==(S.from||"")+">"+(S.to||""))return false;
  delete PH.ev.on;setPhase("landed",t);if(!LOG.on){LOG.on=true;store.set("log",LOG)}say("Taxiing to the gate.",true);return true}
function phaseStep(L){if(DRV.on){try{driveStep(L)}catch(e){console.warn(e)}return}
  const t=L.t,sp=L.spd||0,v=vsFpm()||0,alt=L.alt||0,to=apBy(S.to),fr=apBy(S.from);
  spdH.push({t,s:sp});while(spdH.length>2&&t-spdH[0].t>20000)spdH.shift();
  switch(PH.p){
    case "parked": {const mv=sp>1.8&&(L.acc==null||L.acc<=30);if(mv&&!goP)goP={lat:L.lat,lon:L.lon};if(!mv)goP=null;
      const a=hold("go",mv,t,3),b=hold("go2",sp>4,t,2),far=goP&&dist(goP,L)>=Math.max(12,(L.acc||0));
      if((a&&far)||b){goP=null;if(resumeTaxiIn(t))break;PH.ev={off:t};PH.bookId=null;PH.ended=false;PH.rt=null;PH.sts=[stateAt(L.lat,L.lon)];PH.said={};PH.lm=[];PH.alt0=alt;setPhase("taxi",t);if(!LOG.on){LOG={on:true,pts:[]};store.set("log",LOG)}say(fltSpoken()+(fltSpoken()?"taxiing":"Taxiing")+(to?" for "+to.n:"")+".")}}break;
    case "taxi": {const ago=spdH.find(q=>q.t>=t-4000),ac=ago&&t-ago.t>=2000?(sp-ago.s)/((t-ago.t)/1000):0,accRoll=hold("acc",sp>12&&ac>1.2,t,2);
      if(sp>20.5||accRoll){const st0=[...spdH].reverse().find(q=>q.t<t&&q.s<10);PH.ev.roll=st0?st0.t:t;PH.ev.rollTrk=L.trk;setPhase("roll",t);say("Takeoff roll.")}else if(hold("stop",sp<1,t,180))setPhase("parked",t);}break;
    case "roll": if((v>400&&sp>50)||(sp>70&&alt>(PH.alt0||0)+60)){const ago=spdH.find(q=>q.t>=t-8000)||{t,s:sp};PH.ev.up=ago.t;PH.ev.upGs=ago.s;setPhase("climb",t);say("Airborne at "+Math.round(PH.ev.upGs*3600/NMm)+" knots, climbing.")}else if(hold("abort",sp<8,t,5)){setPhase("taxi",t);say("Takeoff abandoned.")}break;
    case "climb": if(hold("lvl",vsFpm()!=null&&Math.abs(v)<500&&alt>(PH.alt0||0)+3000,t,25)){const first=!PH.ev.toc;if(first){PH.ev.toc=t;PH.ev.cr=alt}setPhase("cruise",t);say((first?"Reaching cruise, about ":"Level at about ")+fl(alt)+".")}else if(hold("dn",v<-700,t,30)&&alt>(PH.alt0||0)+1500){PH.ev.tod=PH.ev.tod||t;setPhase("descent",t);say("Descending"+(to?" into "+to.n:"")+". Start equalising your ears.")}break;
    case "cruise": {const dtg=to?dist(L,to):null,pd=to?plan(dist(fr||L,to)).d:0,near=dtg==null||dtg<pd*1.6+55560,deep=PH.ev.cr!=null&&alt<PH.ev.cr-2440;if(hold("dn",v<-700,t,60)&&(near||deep)){PH.ev.tod=t;setPhase("descent",t);say("Top of descent. Starting down"+(to?" into "+to.n:"")+". Start equalising your ears.")}else if(hold("up",v>600,t,30))setPhase("climb",t);
      if(to&&sp>25&&!PH.said.tod5){const pl=plan(dist(fr||L,to)),tt=(dist(L,to)-pl.d)/sp;if(tt>0&&tt<300){PH.said.tod5=1;say("Top of descent in about 5 minutes.")}}}break;
    case "descent": {const ai=to?apInfo(to.c):null,fe=ai&&ai[4]!=null?ai[4]/FT:(PH.alt0||0);if(alt<fe+1200&&hold("app",v<0,t,10)){setPhase("approach",t);say("On approach, below "+Math.round(alt*FT/1000)*1000+" feet.")}else if(hold("up",v>600&&alt>3000,t,30))setPhase("climb",t);else if(to&&hold("relvl",vsFpm()!=null&&Math.abs(v)<300&&alt>fe+3050,t,45)){const dtg=dist(L,to),pd=plan(dist(fr||L,to)).d;if(dtg>pd*1.6+55560){delete PH.ev.tod;PH.said.tod5=0;setPhase("cruise",t);say("Level again. Back in cruise.")}}}break;
    case "approach": if(sp<45&&Math.abs(v)<400){PH.ev.td=t;const now=Date.now(),pk=gBuf.filter(q=>now-q.t<20000).reduce((m,q)=>Math.max(m,q.g),0);if(pk)PH.ev.tdG=pk;setPhase("landed",t);
        const firm=pk?(pk<1.3?" Smooth touchdown, ":pk<1.6?" Firm touchdown, ":" Hard touchdown, ")+pk.toFixed(1)+" G.":"";say((fltSpoken()?fltSpoken()+"touchdown":"Touchdown")+(to?". Welcome to "+to.n:"")+"."+firm)}
      else if(hold("ga",v>800&&sp>60,t,15)){setPhase("climb",t);say("Going around.")}break;
    case "landed": if(hold("park",sp<1,t,240)){PH.ev.on=PH.holds.park||t;PH.rt=(S.from||"")+">"+(S.to||"");setPhase("parked",t);try{saveFlight()}catch(e){}if(LOG.on){LOG.on=false;store.set("log",LOG)}let ft=null;if(PH.ev.up&&PH.ev.td){const mn=Math.round((PH.ev.td-PH.ev.up)/60000),h=Math.floor(mn/60),m=mn%60;ft=(h?h+(h===1?" hour ":" hours "):"")+m+" minutes"}say("Parked."+(ft?" Flight time "+ft+".":""))}break;
  }
  const air=["climb","cruise","descent","approach"].includes(PH.p);
  if(["descent","approach"].includes(PH.p)&&alt<3050&&alt>1500&&!PH.said.ear10){PH.said.ear10=1;say("Passing ten thousand feet. Keep equalising your ears; cabin pressure is rising.")}
  if(air&&to&&sp>50){const ete=dist(L,to)/sp/60;for(const m of [30,20,10]){if(ete<=m&&ete>m-4&&!PH.said["e"+m]){PH.said["e"+m]=1;say("About "+m+" minutes to "+to.n+"."+(m===30?" Local time there is "+new Date().toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit",timeZone:to.tz})+".":""));break}}}
  if(air&&t-PH.lastLm>150000&&L.trk!=null){for(const x of inView){if(x.d>45*NMm||PH.lm.includes(x.l.n))continue;const sd=side(x.b-L.trk);if(sd.s==="behind")continue;if((S.seat==="left"||S.seat==="right")&&sd.s!=="ahead"&&sd.s!==S.seat)continue;PH.lm.push(x.l.n);PH.lastLm=t;say(spokenName(x.l.n)+(sd.s==="ahead"?" ahead, ":" on the "+sd.s+", ")+sayDist(x.d)+".",true);break}}
  const st=stateAt(L.lat,L.lon);
  if(st!==PH.st){PH.stC++;if(PH.stC>=3){const old=PH.st;PH.st=st;PH.stC=0;PH.sts=PH.sts||[];if(!PH.sts.includes(st))PH.sts.push(st);if(old&&air){let msg="Crossing into "+STN[st]+".";const a=tzOff(STZ[old]),b=tzOff(STZ[st]);if(a!=null&&b!=null&&a!==b){const d=b-a,h=Math.abs(d);msg+=" Clocks go "+(d>0?"forward ":"back ")+(h===30?"half an hour":h===60?"one hour":h===90?"an hour and a half":h/60+" hours")+". Local time is now "+new Date().toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit",timeZone:"Australia/"+STZ[st]})+"."}say(msg)}savePH()}}else PH.stC=0;
}
function evRender(){
  const e=PH.ev,f=t=>t?new Date(t).toTimeString().slice(0,5):"—";const rows=[];
  if(e.off)rows.push(["Off blocks",f(e.off)]);
  if(e.up)rows.push(["Wheels up",f(e.up)+(e.upGs?" · "+Math.round(e.upGs*3600/NMm)+" kt":"")+(e.rollTrk!=null?" · "+String(Math.round(e.rollTrk)).padStart(3,"0")+"°T":"")]);
  if(e.toc)rows.push(["Top of climb",f(e.toc)+(e.cr?" · "+Math.round(e.cr*FT/100)*100+" ft":"")]);
  if(e.tod)rows.push(["Top of descent",f(e.tod)]);
  if(e.td)rows.push(["Touchdown",f(e.td)+(e.tdG?" · "+e.tdG.toFixed(2)+" G "+(e.tdG<1.3?"(smooth)":e.tdG<1.6?"(firm)":"(hard)"):"")]);
  if(e.on)rows.push(["On blocks",f(e.on)]);
  const evNow=(demo||REPLAY||PH.demo)&&last&&last.t?last.t:Date.now();
  if(e.up)rows.push(["Flight time",hm(((e.td||evNow)-e.up)/1000)+(e.td?"":" so far")]);
  if(e.off&&e.on)rows.push(["Block time",hm((e.on-e.off)/1000)]);
  $("evList").innerHTML=rows.length?rows.map(r=>`<li><b>${r[0]}</b><span>${r[1]}</span></li>`).join(""):'<li><span>Times fill in automatically as the flight happens.</span></li>';
  $("phase").textContent=PHN[PH.p];try{endBtnUpd()}catch(_){}
}

/* ================= offline data ================= */
const AP2=[["LYT","Lady Elliot Island Airstrip",-24.1129,152.7156,20,"YLTT"],["GYZ","Gruyere",-28.0345,123.8151,1542,"YGRM"],["WSI","Western Sydney (Nancy-Bird Walton)",-33.8835,150.713,262,"YSWS"],["YNKR","Nackeroo Airfield",-15.578,130.476,0,"YNKR"],["KBD","Kimberley Downs",-17.3986,124.3556,196,"YKBS"],["ALH","Albany",-34.9433,117.8089,233,"YABA"],["ABG","Abingdon Downs",-17.6088,143.1835,573,"YABI"],["AUD","Augustus Downs",-18.5087,139.8821,46,"YAGD"],["MRP","Marla",-27.3343,133.6277,328,"YALA"],["AXL","Alexandria Homestead",-19.0602,136.71,0,"YALX"],["YAMB","RAAF Base Amberley",-27.6354,152.7112,91,"YAMB"],["AXC","Aramac",-22.9579,145.2495,232,"YAMC"],["ADO","Andamooka",-30.4383,137.137,76,"YAMK"],["AMT","Amata",-26.0974,131.2027,695,"YAMT"],["WLP","West Angelas",-23.1356,118.7072,2340,"YANG"],["ABH","Alpha",-23.6528,146.5827,1255,"YAPH"],["ARY","Ararat",-37.31,142.9887,1008,"YARA"],["GYL","Argyle",-16.6369,128.4514,522,"YARG"],["ARM","Armidale",-30.5281,151.617,3556,"YARM"],["AAB","Arrabury",-26.6964,141.0487,334,"YARY"],["AUU","Aurukun",-13.354,141.72,31,"YAUR"],["AVG","Auvergne",-15.6906,130.0088,0,"YAUV"],["AYQ","Ayers Rock Connellan",-25.1859,130.977,1626,"YAYE"],["AYR","Ayr",-19.5958,147.3245,41,"YAYR"],["BCI","Barcaldine",-23.5663,145.3021,878,"YBAR"],["ASP","Alice Springs",-23.8066,133.9034,1789,"YBAS"],["BDD","Badu Island",-10.1495,142.1737,14,"YBAU"],["BKP","Barkly Downs",-20.4958,138.4747,810,"YBAW"],["BNE","Brisbane",-27.3842,153.117,13,"YBBN"],["OOL","Gold Coast",-28.166,153.5066,21,"YBCG"],["BKQ","Blackall",-24.4317,145.4297,928,"YBCK"],["CNS","Cairns",-16.8789,145.7495,10,"YBCS"],["CTL","Charleville",-26.4133,146.262,1003,"YBCV"],["BDW","Bedford Downs",-17.2867,127.463,1750,"YBDF"],["BXG","Bendigo",-36.7394,144.33,705,"YBDG"],["BVI","Birdsville",-25.8975,139.348,159,"YBDV"],["BXF","Bellburn Airstrip",-17.545,128.305,810,"YBEB"],["BTX","Betoota",-25.6948,140.7383,91,"YBEO"],["OCM","Boolgeeda",-22.5411,117.2694,1871,"YBGD"],["BQW","Balgo Hill",-20.1483,127.9739,1440,"YBGO"],["BHQ","Broken Hill",-32.0014,141.472,958,"YBHI"],["HTI","Hamilton Island",-20.3581,148.952,15,"YBHM"],["BEU","Bedourie",-24.3461,139.46,300,"YBIE"],["BRK","Bourke",-30.0392,145.952,352,"YBKE"],["BUC","Burketown",-17.7486,139.534,21,"YBKT"],["BLN","Benalla",-36.5519,146.007,569,"YBLA"],["LCN","Balcanoona",-30.535,139.337,144,"YBLC"],["BLS","Bollon",-28.0512,147.4818,182,"YBLL"],["BQB","Busselton Margaret River",-33.6872,115.4003,55,"YBLN"],["ISA","Mount Isa",-20.6664,139.4885,1121,"YBMA"],["MKY","Mackay",-21.1708,149.1826,19,"YBMK"],["BNK","Ballina Byron Gateway",-28.8332,153.5615,7,"YBNA"],["BSJ","Bairnsdale",-37.8875,147.5694,165,"YBNS"],["GIC","Boigu Island",-9.2328,142.218,23,"YBOI"],["OKY","Oakey Army Aviation Centre",-27.4093,151.7367,1335,"YBOK"],["BQL","Boulia",-22.9133,139.9,542,"YBOU"],["BMP","Brampton Island",-20.8046,149.2799,11,"YBPI"],["PPP","Proserpine Whitsunday Coast",-20.4944,148.5536,82,"YBPN"],["ROK","Rockhampton",-23.38,150.4754,34,"YBRK"],["BOX","Borroloola",-16.0753,136.302,55,"YBRL"],["BME","Broome",-17.9492,122.2283,56,"YBRM"],["BZD","Balranald",-34.6248,143.5771,210,"YBRN"],["BWQ","Brewarrina",-29.9758,146.8144,414,"YBRW"],["BYP","Barimunya",-22.6739,119.1661,2082,"YBRY"],["MCY","Sunshine Coast",-26.5933,153.0832,15,"YBSU"],["BHS","Bathurst",-33.4068,149.6512,2435,"YBTH"],["BRT","Bathurst Island",-11.765,130.6158,67,"YBTI"],["TSV","Townsville / RAAF Base Townsville",-19.2529,146.7665,18,"YBTL"],["BLT","Blackwater",-23.6031,148.807,657,"YBTR"],["BDB","Bundaberg",-24.905,152.3226,107,"YBUD"],["BUY","Bunbury",-33.3781,115.6769,53,"YBUN"],["ZBO","Bowen",-20.018,148.2152,8,"YBWN"],["WEI","Weipa",-12.6775,141.9226,63,"YBWP"],["WTB","Toowoomba Wellcamp",-27.5583,151.7933,1509,"YBWW"],["BWB","Barrow Island",-20.8644,115.4061,26,"YBWX"],["BVZ","Beverley Springs",-16.7328,125.4391,385,"YBYS"],["CGV","Caiguna",-32.2805,125.4779,87,"YCAG"],["CLH","Coolah",-31.7739,149.6153,504,"YCAH"],["CVQ","Carnarvon",-24.8843,113.6664,13,"YCAR"],["CSI","Casino",-28.8813,153.0607,86,"YCAS"],["CAZ","Cobar",-31.5383,145.794,724,"YCBA"],["COJ","Coonabarabran",-31.3325,149.267,2117,"YCBB"],["CPD","Coober Pedy",-29.0383,134.7222,740,"YCBP"],["CRB","Collarenebri",-29.5232,148.5782,152,"YCBR"],["CCL","Chinchilla",-26.7719,150.6176,1028,"YCCA"],["CNC","Coconut Island",-10.0501,143.07,3,"YCCT"],["CNJ","Cloncurry",-20.6686,140.504,616,"YCCY"],["CBX","Condobolin",-33.0656,147.2132,650,"YCDO"],["CUD","Caloundra",-26.8034,153.105,12,"YCDR"],["CED","Ceduna",-32.1306,133.71,77,"YCDU"],["CVC","Cleve",-33.7097,136.505,589,"YCEE"],["CFI","Camfield",-17.0217,131.327,0,"YCFD"],["CFS","Coffs Harbour",-30.3206,153.116,18,"YCFS"],["LLG","Chillagoe",-17.1384,144.5285,1110,"YCGO"],["CKW","Christmas Creek",-22.3543,119.6426,1462,"YCHK"],["CXT","Charters Towers",-20.0431,146.273,955,"YCHT"],["DCN","RAAF Base Curtin",-17.5814,123.8283,300,"YCIN"],["CKI","Croker Island",-11.165,132.483,16,"YCKI"],["CTN","Cooktown",-15.4436,145.1832,26,"YCKN"],["CMQ","Clermont",-22.7731,147.621,908,"YCMT"],["CMA","Cunnamulla",-28.03,145.622,630,"YCMU"],["CML","Camooweal",-19.9117,138.125,241,"YCMW"],["NIF","Camp Nifty",-21.6717,121.587,295,"YCNF"],["CES","Cessnock",-32.7875,151.342,210,"YCNK"],["CNB","Coonamble",-30.9809,148.3778,604,"YCNM"],["ODL","Cordillo Downs",-26.7453,140.638,125,"YCOD"],["CUQ","Coen",-13.7611,143.1133,532,"YCOE"],["CIE","Collie",-33.3667,116.217,818,"YCOI"],["OOM","Cooma Snowy Mountains",-36.3004,148.9724,3088,"YCOM"],["CDA","Cooinda",-12.9033,132.532,13,"YCOO"],["CWW","Corowa",-35.9947,146.357,469,"YCOR"],["CYG","Corryong",-36.1828,147.888,963,"YCRG"],["CDQ","Croydon",-18.225,142.258,107,"YCRY"],["KCE","Collinsville",-20.5967,147.86,180,"YCSV"],["CMD","Cootamundra",-34.6243,148.0366,1110,"YCTM"],["CUG","Cudal",-33.278,148.7687,491,"YCUA"],["CUY","Cue",-27.4507,117.9177,442,"YCUE"],["CJF","Coondewanna",-22.9667,118.8133,2300,"YCWA"],["CWR","Cowarie",-27.7117,138.328,52,"YCWI"],["CCW","Cowell",-33.6667,136.892,39,"YCWL"],["CWT","Cowra",-33.8469,148.648,966,"YCWR"],["COY","Coolawanyah",-21.7946,117.755,1195,"YCWY"],["DBY","Dalby",-27.1585,151.2634,1137,"YDAY"],["DRN","Dirranbandi",-28.5879,148.2172,567,"YDBI"],["DNB","Dunbar",-16.0474,142.3944,15,"YDBR"],["DRB","Derby",-17.3719,123.6622,24,"YDBY"],["DGD","Dalgaranga Gold Mine",-27.8297,117.3164,1459,"YDGA"],["DXD","Dixie",-15.1175,143.316,580,"YDIX"],["DKI","Dunk Island",-17.9391,146.1414,6,"YDKI"],["DLK","Dulkaninna",-29.0133,138.481,0,"YDLK"],["DNQ","Deniliquin",-35.5594,144.946,316,"YDLQ"],["DDN","Delta Downs",-16.9917,141.317,15,"YDLT"],["DLV","Delissaville",-12.55,130.685,34,"YDLV"],["DMD","Doomadgee",-17.9403,138.822,153,"YDMG"],["NLF","Darnley Island",-9.5792,143.7803,0,"YDNI"],["DRD","Dorunda",-16.5537,141.8238,58,"YDOR"],["DVP","Davenport Downs",-24.15,141.108,95,"YDPD"],["DPO","Devonport",-41.1697,146.43,33,"YDPO"],["DOX","Dongara",-29.2981,114.9273,0,"YDRA"],["DRY","Drysdale River",-15.7136,126.3811,360,"YDRD"],["DHD","Durham Downs",-27.075,141.9,116,"YDRH"],["DRR","Durrie",-25.685,140.228,58,"YDRI"],["DKV","Docker River",-24.8595,129.1222,589,"YDVR"],["DYA","Dysart",-22.6222,148.364,670,"YDYS"],["ECH","Echuca",-36.1572,144.762,323,"YECH"],["EUC","Eucla",-31.7071,128.8772,22,"YECL"],["ETD","Etadunna",-28.7408,138.589,0,"YEDA"],["ENB","Eneabba",-29.8325,115.246,0,"YEEB"],["ELC","Elcho Island",-12.0194,135.571,101,"YELD"],["EMD","Emerald",-23.5675,148.179,624,"YEML"],["ERB","Ernabella",-26.2633,132.182,707,"YERN"],["ERQ","Elrose",-20.9764,141.0066,645,"YESE"],["EPR","Esperance",-33.6844,121.823,470,"YESP"],["EVH","Evans Head",-29.1018,153.4193,20,"YEVD"],["WHB","Eliwana",-22.4284,116.8879,1576,"YEWA"],["EXM","Exmouth",-22.0407,114.1027,0,"YEXM"],["FRB","Forbes",-33.3636,147.935,760,"YFBS"],["KFE","Fortescue - Dave Forrest",-22.2908,119.4371,1555,"YFDF"],["FLY","Finley",-35.6589,145.5612,380,"YFIL"],["FLS","Flinders Island",-40.0917,147.993,10,"YFLI"],["FVL","Flora Valley",-18.2978,128.4559,0,"YFLO"],["FIK","Finke",-25.5947,134.583,0,"YFNE"],["FOS","Forrest",-30.8366,128.1128,511,"YFRT"],["FVR","Oombulgurri",-15.1647,127.8401,22,"YFRV"],["FOT","Forster (Wallis Is)",-32.2025,152.4811,4,"YFST"],["FIZ","Fitzroy Crossing",-18.1836,125.5598,368,"YFTZ"],["GBP","Gamboola",-16.5441,143.6682,0,"YGAM"],["GAH","Gayndah",-25.6159,151.6206,369,"YGAY"],["GBL","South Goulburn Is",-11.65,133.382,19,"YGBI"],["GUH","Gunnedah",-30.9575,150.249,863,"YGDH"],["GOO","Goondiwindi",-28.5214,150.32,714,"YGDI"],["GDD","Gordon Downs",-18.6781,128.592,800,"YGDN"],["GGD","Gregory Downs",-18.625,139.233,52,"YGDS"],["GET","Geraldton",-28.7961,114.707,121,"YGEL"],["GFN","Clarence Valley",-29.7548,153.0312,110,"YGFN"],["GBW","Ginbata",-22.5812,120.0355,1409,"YGIA"],["GBV","Gibb River",-16.4187,126.4457,509,"YGIB"],["GKL","Great Keppel Is",-23.1846,150.9416,21,"YGKL"],["GLT","Gladstone",-23.8698,151.2254,64,"YGLA"],["GUL","Goulburn",-34.8103,149.726,2141,"YGLB"],["GLG","Glengyle",-24.8083,139.6,91,"YGLE"],["GLI","Glen Innes",-29.676,151.6912,3433,"YGLI"],["GLM","Glenormiston",-22.8883,138.825,158,"YGLO"],["GVP","Greenvale",-18.9966,145.0136,0,"YGNV"],["GPD","Mount Gordon",-19.7726,139.4042,900,"YGON"],["GPN","Garden Point",-11.3997,130.4256,90,"YGPT"],["GSC","Gascoyne Junction",-25.0546,115.2026,499,"YGSC"],["GTE","Groote Eylandt",-13.9724,136.4586,53,"YGTE"],["GFF","Griffith",-34.2508,146.067,439,"YGTH"],["GTT","Georgetown",-18.3027,143.5309,995,"YGTN"],["GEE","George Town",-41.0795,146.8391,131,"YGTO"],["GYP","Gympie",-26.2901,152.703,260,"YGYM"],["HWK","Wilpena Pound",-31.8559,138.4681,321,"YHAW"],["HXX","Hay",-34.5314,144.83,305,"YHAY"],["HVB","Hervey Bay",-25.3201,152.8807,60,"YHBA"],["HUB","Humbert River",-16.4897,130.6303,0,"YHBR"],["HRY","Henbury",-24.584,133.236,0,"YHBY"],["HIP","Headingly",-21.3333,138.283,0,"YHDY"],["HIG","Highbury",-16.4241,143.1453,0,"YHHY"],["HID","Horn Island",-10.5856,142.2928,43,"YHID"],["HLL","Hillside",-21.7183,119.4403,935,"YHIL"],["HCQ","Halls Creek",-18.2339,127.67,1346,"YHLC"],["HMG","Hermannsburg",-23.9265,132.8078,593,"YHMB"],["HLT","Hamilton",-37.6489,142.065,803,"YHML"],["HOK","Hooker Creek",-18.3367,130.638,320,"YHOO"],["MHU","Mount Hotham",-37.0475,147.334,4260,"YHOT"],["HTU","Hopetoun",-35.7153,142.36,256,"YHPN"],["HSM","Horsham",-36.6697,142.173,445,"YHSM"],["HAT","Heathlands",-11.7369,142.577,0,"YHTL"],["HGD","Hughenden",-20.815,144.225,1043,"YHUG"],["IDK","Indulkana",-26.9654,133.322,401,"YIDK"],["IFL","Innisfail",-17.5594,146.012,46,"YIFL"],["IFF","Iffley",-18.9,141.217,43,"YIFY"],["IGH","Ingham",-18.6641,146.1458,49,"YIGM"],["IKP","Inkerman",-16.2292,141.4346,6,"YIKM"],["INJ","Injune",-25.851,148.5497,401,"YINJ"],["INM","Innamincka",-27.6976,140.7395,54,"YINN"],["IVW","Inverway",-17.8411,129.643,0,"YINW"],["ISI","Isisford",-24.2583,144.425,694,"YISF"],["IVR","Inverell",-29.8883,151.144,2667,"YIVL"],["JAB","Jabiru",-12.6581,132.8946,85,"YJAB"],["JUN","Jundah",-24.838,143.062,145,"YJDA"],["JCK","Julia Creek",-20.6683,141.723,404,"YJLC"],["JUR","Jurien Bay",-30.3027,115.0556,15,"YJUR"],["UBU","Kalumburu",-14.2878,126.6332,29,"YKAL"],["KQR","Karara",-29.2172,116.6872,1011,"YKAR"],["KDB","Kambalda",-31.1907,121.5978,1073,"YKBL"],["KAX","Kalbarri",-27.6928,114.2592,157,"YKBR"],["KBY","Streaky Bay",-32.8366,134.293,69,"YKBY"],["KBJ","Kings Canyon",-24.2602,131.4889,2100,"YKCA"],["KCS","Kings Creek",-24.4213,131.8195,615,"YKCS"],["KRA","Kerang",-35.7514,143.939,254,"YKER"],["KNS","King Island",-39.8775,143.878,132,"YKII"],["KFG","Kalkgurung",-17.4319,130.808,646,"YKKG"],["KOH","Koolatah",-15.8885,142.4395,0,"YKLA"],["KKP","Koolburra",-15.3189,143.955,350,"YKLB"],["KRB","Karumba",-17.4567,140.83,5,"YKMB"],["KML","Kamileroi",-19.375,140.057,91,"YKML"],["KPS","Kempsey",-31.0723,152.7653,54,"YKMP"],["KNI","Katanning",-33.6994,117.657,0,"YKNG"],["KWM","Kowanyama",-15.4854,141.7526,35,"YKOW"],["KPP","Kalpowar",-14.89,144.22,90,"YKPR"],["KGY","Kingaroy",-26.5811,151.8399,1492,"YKRY"],["KGC","Kingscote",-35.7139,137.521,24,"YKSC"],["KUG","Kubin Island",-10.2265,142.2196,15,"YKUB"],["LWH","Lawn Hill",-18.5745,138.5861,122,"YLAH"],["LGH","Leigh Creek",-30.5983,138.426,856,"YLEC"],["LNO","Leonora",-28.8781,121.315,1217,"YLEO"],["LEL","Lake Evella",-12.4989,135.806,256,"YLEV"],["LFP","Lakefield",-14.9207,144.203,107,"YLFD"],["LDH","Lord Howe Island",-31.5382,159.0755,5,"YLHI"],["IRG","Lockhart River",-12.7869,143.305,77,"YLHR"],["LTP","Lyndhurst",-19.1958,144.371,0,"YLHS"],["LDC","Lindeman Island",-20.4536,149.04,0,"YLIN"],["LSY","Lismore",-28.8307,153.2584,35,"YLIS"],["LNH","Lake Nash",-20.9807,137.9178,640,"YLKN"],["BBL","Ballera",-27.4056,141.8095,385,"YLLE"],["BEO","Lake Macquarie",-33.066,151.6463,5,"YLMQ"],["LKD","Lakeland",-15.8412,144.8491,930,"YLND"],["LOC","Lock",-33.5442,135.693,350,"YLOK"],["LOA","Lorraine",-18.9933,139.907,61,"YLOR"],["LTV","Lotus Vale",-17.0483,141.376,0,"YLOV"],["LUU","Laura",-15.5605,144.4514,627,"YLRA"],["LHG","Lightning Ridge",-29.4529,147.9771,540,"YLRD"],["LRE","Longreach",-23.432,144.2775,627,"YLRE"],["LUT","New Laura",-15.1828,144.3455,148,"YLRS"],["LER","Leinster",-27.8433,120.703,1631,"YLST"],["LVO","Laverton",-28.6143,122.4287,1530,"YLTN"],["TGN","Latrobe Valley",-38.211,146.4708,180,"YLTV"],["LZR","Lizard Island",-14.6733,145.4546,70,"YLZI"],["UBB","Mabuiag Island",-9.9502,142.1952,0,"YMAA"],["MYI","Murray Island",-9.9151,144.0546,300,"YMAE"],["AVV","Melbourne Avalon",-38.0403,144.4672,35,"YMAV"],["ABX","Albury",-36.0668,146.9591,539,"YMAY"],["MRG","Mareeba",-17.0703,145.4242,1560,"YMBA"],["MBB","Marble Bar",-21.1633,119.833,194,"YMBL"],["XMC","Mallacoota",-37.5983,149.72,31,"YMCO"],["MFP","Manners Creek",-22.1,137.983,0,"YMCR"],["MLR","Millicent",-37.5836,140.366,56,"YMCT"],["DGE","Mudgee",-32.5648,149.6095,1545,"YMDG"],["MQA","Mandora",-19.738,120.8382,30,"YMDI"],["MNW","Macdonald Downs",-22.444,135.199,0,"YMDS"],["MKR","Meekatharra",-26.6117,118.548,1713,"YMEK"],["MEB","Melbourne Essendon",-37.7281,144.902,282,"YMEN"],["MIM","Merimbula",-36.9086,149.901,7,"YMER"],["YMES","RAAF Base East Sale",-38.0989,147.149,23,"YMES"],["MLV","Merluna",-13.0649,142.4536,276,"YMEU"],["MGT","Milingimbi",-12.0944,134.894,53,"YMGB"],["MNG","Maningrida",-12.0561,134.234,123,"YMGD"],["GSN","Mount Gunson",-31.4597,137.1744,285,"YMGN"],["MGV","Margaret River (Station)",-18.6217,126.883,289,"YMGR"],["MQZ","Margaret River",-33.9306,115.1,374,"YMGT"],["MVU","Musgrave",-14.7757,143.5047,302,"YMGV"],["HBA","Hobart",-42.837,147.513,13,"YMHB"],["MHO","Mount House",-17.0519,125.7125,948,"YMHO"],["MCV","McArthur River Mine",-16.4425,136.084,131,"YMHU"],["MQL","Mildura",-34.2292,142.086,167,"YMIA"],["XML","Minlaton",-34.7438,137.5291,0,"YMIN"],["MIH","Mitchell Plateau",-14.7908,125.8257,0,"YMIP"],["MWY","Miranda Downs",-17.3289,141.886,0,"YMIR"],["MTQ","Mitchell",-26.4833,147.937,1144,"YMIT"],["MJP","Manjimup",-34.2653,116.14,940,"YMJM"],["WLE","Miles",-26.8064,150.169,304,"YMLS"],["LST","Launceston",-41.5449,147.2108,562,"YMLT"],["MBW","Melbourne Moorabbin",-37.9778,145.0998,50,"YMMB"],["WUI","Murrin Murrin",-28.7053,121.891,1535,"YMMI"],["MEL","Melbourne",-37.6707,144.8379,434,"YMML"],["MMM","Middlemount",-22.8014,148.7068,547,"YMMU"],["MTL","Maitland",-32.7013,151.4929,85,"YMND"],["WME","Mount Keith",-27.2873,120.5549,1792,"YMNE"],["ONR","Monkira",-24.8167,140.533,107,"YMNK"],["MSF","Mount Swan",-22.6247,135.0345,1641,"YMNS"],["OXY","Morney",-25.3583,141.433,104,"YMNY"],["MMG","Mount Magnet",-28.1161,117.842,1354,"YMOG"],["OOR","Mooraberree",-25.25,140.983,85,"YMOO"],["MRZ","Moree",-29.4989,149.845,701,"YMOR"],["MET","Moreton",-12.4442,142.638,0,"YMOT"],["MIN","Minnipa",-32.8433,135.145,155,"YMPA"],["MQE","Marqua",-22.8058,137.251,0,"YMQA"],["MOV","Moranbah",-22.0578,148.077,770,"YMRB"],["RRE","Marree",-29.6633,138.065,50,"YMRE"],["MWB","Morawa",-29.2017,116.022,270,"YMRW"],["MYA","Moruya",-35.8978,150.144,14,"YMRY"],["MTD","Mount Sanford Station",-16.9783,130.555,231,"YMSF"],["UTB","Muttaburra",-22.5833,144.533,230,"YMTB"],["MGB","Mount Gambier",-37.7444,140.7806,0,"YMTG"],["ONG","Mornington Island",-16.6625,139.178,33,"YMTI"],["MNQ","Monto",-24.8923,151.1018,757,"YMTO"],["MUQ","Muccan Station",-20.6589,120.067,300,"YMUC"],["MNE","Mungeranie",-28.0092,138.657,0,"YMUG"],["MVK","Mulka",-28.3478,138.65,0,"YMUK"],["MUP","Mulga Park",-25.86,131.65,0,"YMUP"],["MXU","Mullewa",-28.475,115.517,290,"YMWA"],["MWT","Moolawatana",-29.9069,139.765,265,"YMWT"],["MXD","Marion Downs",-23.3637,139.6497,0,"YMWX"],["MBH","Maryborough",-25.5135,152.7136,38,"YMYB"],["MYO","Myroodan Station",-18.124,124.2703,0,"YMYR"],["RTY","Merty Merty",-28.5827,140.3033,0,"YMYT"],["NMR","Nappa Merrie",-27.5492,141.1584,55,"YNAP"],["NRA","Narrandera",-34.7022,146.512,474,"YNAR"],["NAA","Narrabri",-30.3192,149.827,788,"YNBR"],["RPM","Ngukurr",-14.7228,134.747,45,"YNGU"],["ABM","Northern Peninsula",-10.9462,142.4551,34,"YNPE"],["NAC","Naracoorte",-36.9853,140.725,169,"YNRC"],["NRG","Narrogin",-32.93,117.08,1080,"YNRG"],["QRM","Narromine",-32.2147,148.225,782,"YNRM"],["RVT","Ravensthorpe",-33.7972,120.208,197,"YNRV"],["NSV","Noosa",-26.4232,153.0649,1,"YNSH"],["NSM","Norseman",-32.203,121.7581,263,"YNSM"],["NTN","Normanton",-17.6841,141.0697,73,"YNTN"],["NUR","Nullabor Motel",-31.4417,130.902,67,"YNUB"],["NLL","Nullagine",-21.9133,120.198,381,"YNUL"],["NUB","Numbulwar",-14.2717,135.717,31,"YNUM"],["ZNE","Newman",-23.4178,119.803,1724,"YNWN"],["NYN","Nyngan",-31.5506,147.203,569,"YNYN"],["OBA","Oban",-21.2348,139.0332,902,"YOBN"],["OPI","Oenpelli",-12.325,133.006,30,"YOEN"],["XCO","Colac",-38.2867,143.68,450,"YOLA"],["OLP","Olympic Dam",-30.4839,136.8767,344,"YOLD"],["ONS","Onslow",-21.6702,115.1149,7,"YOLW"],["ODD","Oodnadatta",-27.5625,135.4429,118,"YOOD"],["MOO","Moomba",-28.0994,140.197,143,"YOOM"],["RBS","Orbost",-37.79,148.61,28,"YORB"],["OKB","Orchid Beach",-24.9594,153.315,71,"YORC"],["OAG","Orange",-33.382,149.1313,3115,"YORG"],["ODR","Ord River",-17.3408,128.912,390,"YORV"],["OSO","Osborne Mine",-22.0817,140.555,285,"YOSB"],["OYN","Ouyen",-35.0888,142.3548,0,"YOUY"],["ADL","Adelaide",-34.9475,138.5334,20,"YPAD"],["PUG","Port Augusta",-32.5069,137.717,56,"YPAG"],["PMK","Palm Island",-18.7553,146.581,28,"YPAM"],["PBO","Paraburdoo",-23.1711,117.745,1406,"YPBO"],["PDE","Pandie Pandie",-26.1222,139.4035,0,"YPDI"],["DRW","Darwin / RAAF Darwin",-12.415,130.8818,103,"YPDN"],["PRD","Pardoo",-20.1194,119.5719,36,"YPDO"],["YPEA","RAAF Base Pearce",-31.6678,116.015,149,"YPEA"],["YPED","RAAF Base Edinburgh",-34.7057,138.6156,67,"YPED"],["GOV","Gove",-12.2694,136.818,192,"YPGV"],["PPI","Port Pirie",-33.2389,137.995,40,"YPIR"],["JAD","Perth Jandakot",-32.0975,115.881,99,"YPJT"],["KTA","Karratha",-20.7122,116.773,29,"YPKA"],["KGI","Kalgoorlie Boulder",-30.7915,121.4646,1203,"YPKG"],["PKE","Parkes",-33.1314,148.239,1069,"YPKS"],["PKT","Port Keats",-14.2497,129.5295,91,"YPKT"],["KNX","East Kimberley (Kununurra)",-15.7781,128.708,145,"YPKU"],["PLO","Port Lincoln",-34.6053,135.88,36,"YPLC"],["LEA","Learmonth",-22.2352,114.09,19,"YPLM"],["PXH","Prominent Hill",-29.716,135.5244,745,"YPMH"],["EDR","Pormpuraaw",-14.8965,141.6091,10,"YPMP"],["PQQ","Port Macquarie",-31.4358,152.863,12,"YPMQ"],["PTJ","Portland",-38.3181,141.471,265,"YPOD"],["MBF","Porepunkah",-36.7177,146.89,935,"YPOK"],["PHE","Port Hedland",-20.3828,118.6298,33,"YPPD"],["PER","Perth",-31.9403,115.967,67,"YPPH"],["PEA","Penneshaw",-35.7558,137.9629,0,"YPSH"],["KTR","Tindal",-14.5211,132.378,443,"YPTN"],["UMR","Woomera Airfield",-31.1442,136.817,548,"YPWR"],["UIR","Quirindi",-31.4982,150.5217,1054,"YQDI"],["ULP","Quilpie",-26.6092,144.2537,655,"YQLP"],["UEE","Queenstown",-42.0757,145.5301,867,"YQNS"],["RMK","Renmark",-34.1964,140.674,115,"YREN"],["RCM","Richmond",-20.7019,143.115,676,"YRMD"],["RAM","Ramingining",-12.3564,134.898,206,"YRNG"],["ROH","Robinhood",-18.845,143.71,460,"YROB"],["RBU","Roebourne",-20.7639,117.1552,0,"YROE"],["RBC","Robinvale",-34.6429,142.773,87,"YROI"],["RMA","Roma",-26.545,148.775,1032,"YROM"],["RPB","Roper Bar",-14.7348,134.5255,92,"YRRB"],["RSB","Roseberth",-25.8257,139.6275,55,"YRSB"],["RTS","Rottnest Island",-32.0067,115.54,12,"YRTI"],["RTP","Rutland Plains",-15.645,141.8444,15,"YRTP"],["RHL","Roy Hill Station",-22.6258,119.959,0,"YRYH"],["NDS","Sandstone",-27.98,119.297,0,"YSAN"],["BWU","Sydney Bankstown",-33.9236,150.9908,29,"YSBK"],["CBR","Canberra",-35.3069,149.195,1886,"YSCB"],["CDU","Camden",-34.0383,150.6864,230,"YSCN"],["NSO","Scone",-32.038,150.832,745,"YSCO"],["SQC","Southern Cross",-31.24,119.36,354,"YSCR"],["DBO","Dubbo City",-32.2167,148.575,935,"YSDU"],["SGO","St George",-28.0497,148.595,656,"YSGE"],["SIX","Singleton",-32.6008,151.1931,46,"YSGT"],["ZGL","South Galway",-25.6746,142.0892,116,"YSGW"],["SGP","Shay Gap",-20.4247,120.141,620,"YSHG"],["MJK","Shark Bay",-25.8973,113.5758,111,"YSHK"],["WOL","Shellharbour",-34.5611,150.789,31,"YSHL"],["WSY","Shute Harbour/Whitsunday",-20.2761,148.755,40,"YSHR"],["SHT","Shepparton",-36.4283,145.3915,374,"YSHT"],["SBR","Saibai Island",-9.3783,142.625,15,"YSII"],["GOS","Somersby Airstrip",-33.3677,151.2998,860,"YSMB"],["SIO","Smithton",-40.835,145.084,31,"YSMI"],["SHU","Smith Point",-11.1336,132.1596,0,"YSMP"],["STH","Strathmore",-17.8627,142.5578,0,"YSMR"],["SNB","Snake Bay",-11.4177,130.6485,173,"YSNK"],["NOA","Naval Air Station Nowra - HMAS Alb",-34.9466,150.5425,400,"YSNW"],["SLJ","Solomon",-22.2568,117.8505,2030,"YSOL"],["SNH","Stanthorpe",-28.6201,151.9833,2938,"YSPE"],["SCG","Spring Creek",-18.6377,144.5457,0,"YSPK"],["SHQ","Southport",-27.9218,153.3715,2,"YSPT"],["KSV","Springvale",-23.55,140.7,0,"YSPV"],["XRH","RAAF Base Richmond",-33.6047,150.7831,67,"YSRI"],["SRN","Strahan",-42.155,145.292,20,"YSRN"],["SYD","Sydney Kingsford Smith",-33.9461,151.177,21,"YSSY"],["HLS","St Helens",-41.3367,148.282,48,"YSTH"],["TMW","Tamworth",-31.0779,150.8455,1334,"YSTW"],["WGA","Wagga Wagga",-35.1635,147.4683,724,"YSWG"],["SWH","Swan Hill",-35.3758,143.533,234,"YSWH"],["SWC","Stawell",-37.0717,142.741,807,"YSWL"],["XTR","Tara",-27.1631,150.4764,360,"YTAA"],["TBL","Tableland Homestead",-17.2833,126.9,0,"YTAB"],["XTO","Taroom",-25.8017,149.9,240,"YTAM"],["TBK","Timber Creek",-15.62,130.445,16,"YTBR"],["TDR","Theodore",-24.9868,150.0931,171,"YTDR"],["TQP","Trepell",-21.835,140.888,891,"YTEE"],["TEF","Telfer",-21.715,122.229,970,"YTEF"],["TEM","Temora",-34.4214,147.512,921,"YTEM"],["TAN","Tangalooma",-27.1377,153.3641,0,"YTGA"],["XTG","Thargomindah",-27.9864,143.8121,433,"YTGM"],["GTS","The Granites",-20.5483,130.347,0,"YTGT"],["TDN","Theda Station",-14.7906,126.498,700,"YTHD"],["TYG","Thylungra",-26.093,143.4514,165,"YTHY"],["TYB","Tibooburra",-29.4511,142.058,584,"YTIB"],["TKY","Turkey Creek",-17.0408,128.206,0,"YTKY"],["PHQ","The Monument",-21.8111,139.924,949,"YTMO"],["TPR","Tom Price",-22.746,117.869,2300,"YTMP"],["TUM","Tumut",-35.2683,148.2405,878,"YTMU"],["TYP","Tobermorey",-22.2558,137.953,0,"YTMY"],["THG","Thangool",-24.4949,150.578,644,"YTNG"],["TCA","Tennant Creek",-19.6344,134.183,1236,"YTNK"],["TCW","Tocumwal",-35.8117,145.608,372,"YTOC"],["TRO","Taree",-31.8886,152.514,38,"YTRE"],["TTX","Truscott-Mungalalu",-14.0897,126.381,181,"YTST"],["TWB","Toowoomba",-27.5434,151.9191,2086,"YTWB"],["UDA","Undara",-18.1913,144.6122,2451,"YUDA"],["CZY","Cluny",-24.5167,139.617,90,"YUNY"],["USL","Useless Loop",-26.1579,113.3948,62,"YUSL"],["VCD","Victoria River Downs",-16.4021,131.005,89,"YVRD"],["VNR","Vanrook Station",-16.9615,141.9523,43,"YVRS"],["WLA","Wallal Downs",-19.7736,120.649,33,"YWAL"],["WAV","Wave Hill",-17.3933,131.118,201,"YWAV"],["WMB","Warrnambool",-38.2953,142.447,242,"YWBL"],["SYU","Warraber Island",-10.2083,142.825,3,"YWBS"],["WIO","Wilcannia",-31.5221,143.3784,250,"YWCA"],["WLC","Walcha",-31.0095,151.5474,0,"YWCH"],["WAZ","Warwick",-28.1494,151.943,1500,"YWCK"],["WRN","Windarling",-30.0323,119.3865,1502,"YWDG"],["WNR","Windorah",-25.4106,142.6684,452,"YWDH"],["WON","Wondoola",-18.575,140.892,58,"YWDL"],["WGT","Wangaratta",-36.4179,146.3069,504,"YWGT"],["WYA","Whyalla",-33.0589,137.514,41,"YWHA"],["WKB","Warracknabeal",-36.3211,142.419,397,"YWKB"],["WGE","Walgett",-30.0328,148.126,439,"YWLG"],["NTL","Newcastle",-32.7961,151.835,31,"YWLM"],["WUN","Wiluna",-26.6327,120.2219,1649,"YWLU"],["WPK","Wrotham Park",-16.6589,143.9993,152,"YWMP"],["WDI","Wondai",-26.2774,151.8617,320,"YWND"],["WLL","Wollogorang",-17.2199,137.9345,199,"YWOR"],["YWRN","Warren",-31.7333,147.803,669,"YWRN"],["SXE","West Sale",-38.0908,146.9653,72,"YWSL"],["WLO","Waterloo",-16.63,129.32,132,"YWTL"],["WIN","Winton",-22.3636,143.086,638,"YWTN"],["WUD","Wudinna",-33.0433,135.447,310,"YWUD"],["WEW","Wee Waa",-30.2583,149.408,190,"YWWA"],["WRW","Warrawagine",-20.8442,120.702,0,"YWWG"],["WWI","Woodie Woodie",-21.6455,121.1912,0,"YWWI"],["WWY","West Wyalong",-33.9372,147.191,859,"YWWL"],["WYN","Wyndham",-15.5114,128.153,14,"YWYM"],["BWT","Wynyard",-40.997,145.726,62,"YWYY"],["YLG","Yalgoo",-28.3553,116.684,0,"YYAL"],["OKR","Yorke Island",-9.7528,143.4057,10,"YYKI"],["KYF","Yeelirrie",-27.2771,120.0957,0,"YYLR"],["XMY","Yam Island",-9.8992,142.7743,0,"YYMI"],["YUE","Yuendumu",-22.2542,131.782,2205,"YYND"],["NGA","Young",-34.2556,148.2471,1267,"YYNG"],["ORR","Yorketown",-35.0036,137.6193,0,"YYOR"],["KYI","Yalata Mission",-31.4706,131.825,0,"YYTA"]];
const DEMI={"la0": -44.5, "lo0": 112.0, "st": 0.16, "ny": 220, "nx": 267};
const DEM=(()=>{const s=atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwACCiwJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDBkZIzQLCQwGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJFBgpNzMTEQkAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQYUIzciMA8fDBUCAAQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDgkXMC44NjUsLiwAAQMGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJFw4aJB4rPTQgJB0SAxITAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMIAkgMC4+ShkTKyIdHBUMAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwYJjAwNTosJBMQDR4SCSo3SEM1Jg8GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsQERwiIhwZCQUEBAoGChEPEhshOxEDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQcGDxQXCgMAAAAAAAACBAMCAgoJCwYDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAgQDAAAAAAAAAAAAAAAAAAEABQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwQCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQKAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMHAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA4OCgAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEGCwwcKBoAAAAAAAAAAAAAAwQFEhQaAwEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBQgJDg0UEh4bBAEAAAEJAAEBDxQOEhQfLQ4LAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEAAEDAwYHCgwNEA0ODQsLDQUBAQACBwEABQwSHRsKDhMSCgMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AgAAAAAABQgNBwcSCwwXFxEPEA4SFA8QERQRDQ0LCgcHCQgEBQUEBAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIDBQcJCw0OERMQBwQDAgQGCBMVAwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAELEgsWERIbGBcLExQcGhMQDRUHAAAAAAAAAAAABgMJBwwQEhMTExEODAkNDBERFRQQDg4LCAwJBgYIAwMEAgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIEBQcJDA8QEhUOBAMCAgQGDgkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAwIJAggTEBQPDhYXFhIOFgUAAAAAAAAAAAAAAwkLFhIUGRscFRMUCgwLDBATFBMTDxIPCgcIBQQFBAUEAwECAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMEBgYKDxATExgSBAEBAQMNFAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAYSEgsKDBQUFxIKAgAAAAAAAAAAAAICAgYYFxsbGhYaFwwLCA4SDQwTGhkVExYQCw0KBwULCQwLBQEBAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMFBwgKDBAYFRgRBAAAAAYLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAMECwYNCgwSEg8HAAAAAAAAAAAAAAIGAwIPFhsbFQ0QDgoHCwoMEBQZGBkbFxkXDQsODhAPChIMBAQDAwEAAAAAAQMBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMEBgkMDxESFRQJAgAAAAMMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECBQEABwkNDggBAAAAAAAAAAAAAAADAgEEBgYNDQYHBwkJDw0NEBohHBUbIh4bFRAPDxEOCw8TCQYDAwIBAAAABQkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIFBwoNDxMVFQ8FAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAgcFBAAAAAAAAAAAAAAAAAAAAgMGDQMECwMEBgwMEhAPERgeHBggJyMeGBoWDwsIDA4MCgYGBwUCAAAABgUCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgMGCQ4QDxERHRsEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgIFBAMCAggGBgcJFRQSEhchIRkhHyUhHBgYFAwJCA4RDQkLCwQBAgABAAIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAwQGCgwLDg8RKTUMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICBAEBCAoJCgkOExINDRQiFBgdJyIkIBwaExANDg0LCwwLCQUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgQFBgkKCxESExoHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgEDBhANDwoLCg4ICwwTFhsoKiYoJCAcFA8NDg0NCRMRCQMCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgQIBQYICg0OFRUJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEBxELCgcICAoHCQkVHhUlKScnJCIfFhEQDAoHCA8VEAYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgQHBggJCw8VEBUHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECEg0KBAQFBQYHBQUGBA0YFB4gIh8fHBoVCwgGBQoWFwQCAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAwYEBgcKCxARGwwCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQACBAYIBQIEAwYEBgMDAggeIB0bIyQhHR0YCwcIBQoOEAUEAgMDAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBgYFBAcKDAwUGwIDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECAwQFAwIEAwUEBAQCAwUXGx0ZIR8eFhIRCgkJBggNCwoHCAQFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIDBAYKCQ4MFAABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgECAwEDAgYEAwIBAQIIEw0cIRwXDgsKBwUGAQMFBwoIBwMEBAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEBQQHCA4NDwUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQACAgEBAQMDAgICAwMIChEaGhYQCAYEBQUJAQYIBwYFAgIDCAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIDBAQFCBEMBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAgABAAEAAQECBAIDCRMQEBQNBAECBQQGAwMEBQMEAQABCAcEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgMDBQMHCw0IBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAABBAIBBAYKAwgIAgAFAQEAAAACAwACAAACBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBgQICAcDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBQUFBAIEAwIBAAABAAAAAAIAAAACAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgQHCAUCAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQQBAAAAAAAAAAAAAAEFCAQCAwEAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBQUJBgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgQDBwcHBAAAAAAAAAAAAQECAwEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAwULBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgMDAgIFBAUBAAAAAQAAAQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgcLCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECAQMCBAYDAAABAgMCAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBAgLCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQMAAAIJFgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAQAAAAEDAQIDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBQcGAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIEAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBAAAAAAAAAAQDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFKFAgDBwgAAAAAAAAAAA4DAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgWDgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQYIAAAAAAAAAAAAAAAAAAAAAAACAx0pCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBCQ4YLkoaIA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKLCsqHQQAAAAAAAAAAAAAAAAAAAADAAUFGA0ICQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAHAwMEDQYWOGhQVR4LAAAAABQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgbLzs4EwMAAAAAAAAAAAAAAAAAAAAAABAnHhYsOxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJCQoHIkI+SxdJfHgbAwAAAAAABgYKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAEh0wHB4UBwAAAAAAAAAAAAAAAAAAAAAAAAkUK0RBPDwKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgwZETFHUjt6yZLMWxIDAQAAAAAMDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIHiEuODAyMQMBAAAAAAAAAAAAAAAAAAAAAAAAAAUWTWJeKCEZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABExcqU4RtNRks7HcqCwQGBAEAABgQCgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJKywpKi0ZIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAALOHxyKyQZAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSCtSzZhKESNIFxIDAAAAAAAAAgVGEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u})();
function elevAt(lat,lon){const fy=(lat-DEMI.la0)/DEMI.st,fx=(lon-DEMI.lo0)/DEMI.st;if(fy<0||fx<0||fy>DEMI.ny-1||fx>DEMI.nx-1)return 0;const y0=Math.floor(fy),x0=Math.floor(fx),y1=Math.min(DEMI.ny-1,y0+1),x1=Math.min(DEMI.nx-1,x0+1),ty=fy-y0,tx=fx-x0,g=(y,x)=>DEM[y*DEMI.nx+x];return ((g(y0,x0)*(1-tx)+g(y0,x1)*tx)*(1-ty)+(g(y1,x0)*(1-tx)+g(y1,x1)*tx)*ty)*10}
function nearestAp(p){let b=null,bd=1e15;for(const a of AP2){const d=dist(p,{lat:a[2],lon:a[3]});if(d<bd){bd=d;b=a}}return b?{a:b,d:bd,b:brg(p,{lat:b[2],lon:b[3]})}:null}
const apInfo=c=>AP2.find(a=>a[0]===c);

/* ================= MGRS ================= */
function toMGRS(lat,lon){
  const a=6378137,e2=0.00669438,k0=0.9996,ep2=e2/(1-e2);
  const zone=Math.floor((lon+180)/6)+1,lo0=(zone-1)*6-180+3,phi=rad(lat);
  const N=a/Math.sqrt(1-e2*Math.sin(phi)**2),T=Math.tan(phi)**2,C=ep2*Math.cos(phi)**2,A=Math.cos(phi)*rad(lon-lo0);
  const M=a*((1-e2/4-3*e2*e2/64-5*e2**3/256)*phi-(3*e2/8+3*e2*e2/32+45*e2**3/1024)*Math.sin(2*phi)+(15*e2*e2/256+45*e2**3/1024)*Math.sin(4*phi)-(35*e2**3/3072)*Math.sin(6*phi));
  const E=k0*N*(A+(1-T+C)*A**3/6+(5-18*T+T*T+72*C-58*ep2)*A**5/120)+500000;
  let Nn=k0*(M+N*Math.tan(phi)*(A*A/2+(5-T+9*C+4*C*C)*A**4/24+(61-58*T+T*T+600*C-330*ep2)*A**6/720));if(lat<0)Nn+=10000000;
  const band="CDEFGHJKLMNPQRSTUVWXX"[Math.floor((lat+80)/8)];
  const set=zone%6||6,col=Math.floor(E/100000),row=Math.floor(Nn/100000)%20;
  const A_=65,I=73,O=79,V=86,Z=90,co="AJSAJS".charCodeAt(set-1),ro="AFAFAF".charCodeAt(set-1);
  let ci=co+col-1,ri=ro+row,roll=false;
  if(ci>Z){ci=ci-Z+A_-1;roll=true}
  if(ci===I||(co<I&&ci>I)||((ci>I||co<I)&&roll))ci++;
  if(ci===O||(co<O&&ci>O)||((ci>O||co<O)&&roll)){ci++;if(ci===I)ci++}
  if(ci>Z)ci=ci-Z+A_-1;
  if(ri>V){ri=ri-V+A_-1;roll=true}else roll=false;
  if(ri===I||(ro<I&&ri>I)||((ri>I||ro<I)&&roll))ri++;
  if(ri===O||(ro<O&&ri>O)||((ri>O||ro<O)&&roll)){ri++;if(ri===I)ri++}
  if(ri>V)ri=ri-V+A_-1;
  const e5=String(Math.floor(E%100000)).padStart(5,"0"),n5=String(Math.floor(Nn%100000)).padStart(5,"0");
  return `${zone}${band} ${String.fromCharCode(ci)}${String.fromCharCode(ri)} ${e5.slice(0,4)} ${n5.slice(0,4)}`;
}
window.__mgrs=toMGRS;

/* ================= night sky ================= */
const jdOf=ms=>ms/86400000+2440587.5;
const gmstDeg=ms=>((18.697374558+24.06570982441908*(jdOf(ms)-2451545))%24+24)%24*15;
function altaz(ra,dec,ms,lat,lon){const H=rad(gmstDeg(ms)+lon-ra),p=rad(lat),dc=rad(dec);const el=Math.asin(Math.sin(p)*Math.sin(dc)+Math.cos(p)*Math.cos(dc)*Math.cos(H));const az=(deg(Math.atan2(-Math.sin(H)*Math.cos(dc),Math.sin(dc)*Math.cos(p)-Math.cos(dc)*Math.sin(p)*Math.cos(H)))+360)%360;return {el:deg(el),az}}
function ecl2eq(l,b){const e=rad(23.4397),L=rad(l),B=rad(b);return {ra:(deg(Math.atan2(Math.sin(L)*Math.cos(e)-Math.tan(B)*Math.sin(e),Math.cos(L)))+360)%360,dec:deg(Math.asin(Math.sin(B)*Math.cos(e)+Math.cos(B)*Math.sin(e)*Math.sin(L)))}}
function moonInfo(ms){const d=jdOf(ms)-2451545,L=218.316+13.176396*d,M=134.963+13.064993*d,F=93.272+13.229350*d;const l=L+6.289*Math.sin(rad(M)),b=5.128*Math.sin(rad(F));
  const g=357.529+0.98560028*d,q=280.459+0.98564736*d,ls=q+1.915*Math.sin(rad(g))+0.020*Math.sin(rad(2*g));
  const el=(((l-ls)%360)+360)%360,ill=(1-Math.cos(rad(el)))/2,wax=el<180;
  const ph=ill<0.04?"new moon":ill>0.96?"full moon":ill<0.4?(wax?"waxing crescent":"waning crescent"):ill<0.6?(wax?"first quarter":"last quarter"):(wax?"waxing gibbous":"waning gibbous");
  return Object.assign(ecl2eq(l,b),{ill,ph})}
const PEL={Venus:[0.72333566,0.00677672,3.39467605,181.97909950,131.60246718,76.67984255,0.00000390,-0.00004107,-0.00078890,58517.81538729,0.00268329,-0.27769418],
 Earth:[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0,0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0],
 Mars:[1.52371034,0.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891,0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343],
 Jupiter:[5.20288700,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909,-0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106],
 Saturn:[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448,-0.00125060,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794]};
function helio(k,T){const p=PEL[k],a=p[0]+p[6]*T,e=p[1]+p[7]*T,I=rad(p[2]+p[8]*T),L=p[3]+p[9]*T,w=p[4]+p[10]*T,O=p[5]+p[11]*T;
  let M=rad((((L-w)%360)+540)%360-180),E=M;for(let i=0;i<8;i++)E=E-(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));
  const xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E),om=rad(w-O),Om=rad(O);
  return [(Math.cos(om)*Math.cos(Om)-Math.sin(om)*Math.sin(Om)*Math.cos(I))*xp+(-Math.sin(om)*Math.cos(Om)-Math.cos(om)*Math.sin(Om)*Math.cos(I))*yp,
          (Math.cos(om)*Math.sin(Om)+Math.sin(om)*Math.cos(Om)*Math.cos(I))*xp+(-Math.sin(om)*Math.sin(Om)+Math.cos(om)*Math.cos(Om)*Math.cos(I))*yp,
          Math.sin(om)*Math.sin(I)*xp+Math.cos(om)*Math.sin(I)*yp]}
function planetEq(k,ms){const T=(jdOf(ms)-2451545)/36525,p=helio(k,T),E=helio("Earth",T),x=p[0]-E[0],y=p[1]-E[1],z=p[2]-E[2],e=rad(23.43928);
  const ye=y*Math.cos(e)-z*Math.sin(e),ze=y*Math.sin(e)+z*Math.cos(e);return {ra:(deg(Math.atan2(ye,x))+360)%360,dec:deg(Math.atan2(ze,Math.hypot(x,ye)))}}
window.__planetEq=planetEq;window.__moon=moonInfo;
const STARS=[["Southern Cross",186.8,-60.4],["The Pointers (Alpha & Beta Centauri)",215.4,-60.6],["Sirius",101.29,-16.72],["Canopus",95.99,-52.70],["The Saucepan (Orion)",84.0,-1.2],["Antares (Scorpius)",247.35,-26.43],["Large Magellanic Cloud",80.9,-69.8]];
function skyInfo(){
  const L=last,el=$("skyList"),hd=$("skyHead");if(!L){el.innerHTML="";hd.textContent="Sky";return}
  const now=Date.now(),sun=sunPos(now,L.lat,L.lon),dark=sun.el<-4,objs=[];
  const mo=moonInfo(now),ma=altaz(mo.ra,mo.dec,now,L.lat,L.lon);
  if(ma.el>-1)objs.push({n:"Moon ("+mo.ph+", "+Math.round(mo.ill*100)+"% lit)",s:"Moon",...ma});
  if(dark){for(const k of ["Venus","Mars","Jupiter","Saturn"]){const q=planetEq(k,now),aa=altaz(q.ra,q.dec,now,L.lat,L.lon);if(aa.el>0)objs.push({n:k+" (planet)",s:k,...aa})}
    for(const s of STARS){const aa=altaz(s[1],s[2],now,L.lat,L.lon);if(aa.el>2)objs.push({n:s[0],s:s[0],...aa})}}
  hd.textContent=dark?"Night sky":"Sky";
  if(!objs.length){el.innerHTML='<li><span>'+(dark?"Nothing on the list above your horizon right now.":"Daytime: the night sky guide starts after dusk.")+'</span></li>';return}
  objs.sort((a,b)=>a.el>55===b.el>55?b.el-a.el:a.el>55?1:-1);
  el.innerHTML=objs.map(o=>{const sd=L.trk!=null?side(o.az-L.trk):null;const where=o.el>55?"high overhead":sd?(sd.s==="left"||sd.s==="right"?sd.s+", "+sd.clk+" o'clock":sd.s):String(Math.round(o.az)).padStart(3,"0")+"°";return `<li><b>${o.n}</b><span>${where} · ${Math.round(o.el)}° up</span></li>`}).join("");
  const air=["climb","cruise","descent"].includes(PH.p);
  if(air&&dark&&L.trk!=null){for(const o of objs){if(o.el>45||PH.said["sky"+o.s])continue;if(!["Moon","Southern Cross","Venus","Jupiter"].includes(o.s))continue;const sd=side(o.az-L.trk);if(sd.s!=="left"&&sd.s!=="right")continue;PH.said["sky"+o.s]=1;say((o.s==="Moon"?"The moon":o.s)+" is visible on the "+sd.s+", "+Math.round(o.el)+" degrees up.",true);break}}
}

/* ================= position, arrival ================= */
function posInfo(){
  const L=viewL();if(!L){for(const id of ["mgrs","ll","nap","napN","terr","agl"])$(id).textContent="---";return}
  $("mgrs").textContent=toMGRS(L.lat,L.lon);
  $("ll").textContent=Math.abs(L.lat).toFixed(3)+"°"+(L.lat<0?"S":"N")+" "+Math.abs(L.lon).toFixed(3)+"°"+(L.lon<0?"W":"E");
  const n=nearestAp(L);if(n){$("nap").textContent=n.a[0]+" "+Math.round(fDst(n.d))+S.dst.toUpperCase()+" "+String(Math.round(n.b)).padStart(3,"0")+"°";$("napN").textContent=n.a[1]}
  const t=elevAt(L.lat,L.lon);$("terr").textContent=t>0?Math.round(fAlt(t)/10)*10+" "+S.alt:"SEA LEVEL";
  $("agl").textContent=L.alt!=null?Math.max(0,Math.round(fAlt(L.alt-t)/10)*10).toLocaleString()+" "+S.alt:"---";
}
function nextSunEvent(lat,lon){const now=Date.now();let prev=null;for(let m=0;m<=26*60;m+=3){const e=sunPos(now+m*60000,lat,lon).el+0.833;if(prev!=null&&(e>0)!==(prev>0))return {t:now+m*60000,up:e>0};prev=e}return null}
let arrCache={t:0};
function arrInfo(){
  const L=last,to=apBy(S.to),tile=$("arrTile");
  const air=["climb","cruise","descent","approach"].includes(PH.p)||(demo&&L&&L.spd>40);
  if(!L||!to||!L.spd||L.spd<25||!air){tile.style.display="none";return}
  const sec=dist(L,to)/L.spd;if(sec>35*60){tile.style.display="none";return}
  tile.style.display="";
  const fmt=(ms,tz)=>new Date(ms).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:tz});
  const now=Date.now(),eta=now+sec*1000;
  let diff=null;try{const a=tzOff(STZ[stateAt(L.lat,L.lon)]),b=tzOff(to.tz.replace("Australia/",""));if(a!=null&&b!=null)diff=b-a}catch(e){}
  if(now-arrCache.t>60000||arrCache.c!==to.c)arrCache={t:now,c:to.c,ev:nextSunEvent(to.lat,to.lon)};
  const ev=arrCache.ev,ai=apInfo(to.c),sunAt=sunPos(eta,to.lat,to.lon).el;
  $("arrHead").textContent="Arriving "+to.n;
  const rows=[["ETA local",fmt(eta,to.tz)],["Local time now",fmt(now,to.tz)+(diff?(" ("+(diff>0?"+":"−")+(Math.abs(diff)%60?Math.abs(diff)+" MIN":Math.abs(diff)/60+" H")+")"):"")],
    [ev?(ev.up?"Sunrise":"Sunset"):"Sun",ev?fmt(ev.t,to.tz):"—"],["Arrive in",sunAt>0?"Daylight":sunAt>-6?"Twilight":"Darkness"]];
  if(ai)rows.push(["Airport elevation",Math.round(fAlt(ai[4]/FT)).toLocaleString()+" "+S.alt]);
  try{arrExtra(rows,L,to)}catch(e){}
  $("arrKv").innerHTML=rows.map(r=>`<div>${esc(r[0])}<b>${esc(r[1])}</b></div>`).join("");
}

/* ================= MARK ================= */
let MARKS=store.get("marks",[]);
function markRender(){
  $("markList").innerHTML=MARKS.length?MARKS.map(m=>`<li><b>MK${m.n} ${new Date(m.t).toTimeString().slice(0,5)}</b><span>${toMGRS(m.lat,m.lon)}${m.note?"<br>"+esc(m.note):""}</span></li>`).join(""):'<li><span>Tap MARK to save a point of interest.</span></li>';
}
$("markBtn").onclick=()=>{
  if(!last){say("No position to mark.");return}
  const m={n:MARKS.length+1,t:Date.now(),lat:last.lat,lon:last.lon,alt:last.alt,note:""};MARKS.push(m);store.set("marks",MARKS);
  say("Mark "+m.n+".");hap(30);$("markRow").style.display="";$("markNote").value="";$("markNote").placeholder="Note for MK"+m.n+" (optional)";markRender();drawMap();
};
$("markSave").onclick=()=>{const m=MARKS[MARKS.length-1];if(m){m.note=$("markNote").value.slice(0,80);store.set("marks",MARKS);markRender()}$("markRow").style.display="none"};

/* ================= master caution ================= */
let AC=null,mc={on:false,ack:false,why:"",poorSince:0,lastBeep:0};
function unlockAudio(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state!=="running")AC.resume()}catch(e){}}
function beep(){if(!AC)return;try{const t=AC.currentTime;[[880,0],[660,0.18]].forEach(([f,o])=>{const os=AC.createOscillator(),g=AC.createGain();os.type="square";os.frequency.value=f;g.gain.setValueAtTime(0.0001,t+o);g.gain.exponentialRampToValueAtTime(0.12,t+o+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+o+0.16);os.connect(g);g.connect(AC.destination);os.start(t+o);os.stop(t+o+0.17)})}catch(e){}}
function mcCheck(){
  let why="";
  if(document.hidden)return;
  if(watchId!=null&&!REPLAY&&!resuming()){const age=(Date.now()-lastFixAt)/1000;if(lastFixAt&&age>90)why="GPS SIGNAL LOST";else if(last&&last.acc>500){if(!mc.poorSince)mc.poorSince=Date.now();if(Date.now()-mc.poorSince>120000)why="GPS ACCURACY POOR"}else mc.poorSince=0}
  if(why&&!mc.on){mc={...mc,on:true,ack:false,why};$("mcBtn").style.display="";$("mcBtn").textContent="MASTER CAUTION · "+why;say("Caution. "+why.toLowerCase()+".");beep();hap([120,80,120,80,120]);mc.lastBeep=Date.now()}
  else if(!why&&mc.on){mc.on=false;$("mcBtn").style.display="none";$("mcBtn").classList.remove("ack")}
  else if(mc.on&&!mc.ack&&Date.now()-mc.lastBeep>4000){beep();mc.lastBeep=Date.now()}
}
$("mcBtn").onclick=()=>{mc.ack=true;$("mcBtn").classList.add("ack")};
setInterval(mcCheck,1000);

/* ================= logbook ================= */
let BOOK=store.get("book",[]);
function flightStats(pts){let d=0,ma=0,ms=0;for(let i=0;i<pts.length;i++){const p=pts[i];if(p[2]!=null)ma=Math.max(ma,p[2]);if(p[4]!=null)ms=Math.max(ms,p[4]);if(i)d+=dist({lat:pts[i-1][0],lon:pts[i-1][1]},{lat:p[0],lon:p[1]})}return {d,ma,ms}}
function thin(pts,n){if(pts.length<=n)return pts.slice();const out=[],st=(pts.length-1)/(n-1);for(let i=0;i<n;i++)out.push(pts[Math.round(i*st)]);return out}
function makeEntry(){
  const pts=LOG.pts;if(pts.length<5)return null;const f=pts[0],l=pts[pts.length-1];
  const nf=nearestAp({lat:f[0],lon:f[1]}),nl=nearestAp({lat:l[0],lon:l[1]});
  return {id:Date.now(),flt:S.flt||"",demo:!!(demo||PH.demo),from:S.from||(nf?nf.a[0]:"???"),to:S.to||(nl?nl.a[0]:"???"),date:f[3],ev:{...PH.ev},st:(PH.sts||[]).slice(),...flightStats(pts),marks:MARKS.slice(),pts:thin(pts,600),ac:S.acType||"",dy:dyFor(f[3]),ls:lsFor(PH.ev.td)};
}
function saveFlight(){const e=makeEntry();if(!e)return;const i=PH.bookId?BOOK.findIndex(b=>b&&b.id===PH.bookId):-1;
  if(i>=0){e.id=PH.bookId;BOOK[i]=e}else{BOOK.unshift(e);if(BOOK.length>40)BOOK.length=40}PH.bookId=e.id;savePH();store.set("book",BOOK);bookRender()}
/* v20: End flight by hand (e.g. you got off before the app reached Parked) */
function endBtnUpd(){const b=$("endBtn");if(b)b.style.display=(PH.p!=="parked"&&!PH.demo&&!demo&&!REPLAY)?"":"none";if(PH.p==="parked"){const n=$("endNote");if(n)n.style.display="none"}}
function endFlight(skip){if(PH.p==="parked"||PH.demo||demo||REPLAY)return false;
  if(!skip&&!confirm("End this flight now?\n\nIt's saved to your logbook and the app gets ready for your next flight."))return false;
  const pts=(LOG&&LOG.pts)||[],lp=pts[pts.length-1],t=Math.max((last&&last.t)||0,(lp&&lp[3])||0)||Date.now(),e=PH.ev;
  if(e.up&&!e.td)e.td=t;
  if(!e.on){let on=t;for(let i=pts.length-1;i>0;i--){if(pts[i-1][4]!=null&&pts[i-1][4]>=1){on=pts[i][3];break}}if(e.td&&on<e.td)on=t;e.on=on}
  if(e.up){try{saveFlight()}catch(_){}}
  PH.ended=true;PH.rt=null;setPhase("parked",t);if(LOG.on){LOG.on=false;store.set("log",LOG)}
  $("endNote").style.display="none";$("resumeNote").style.display="none";say(e.up?"Flight ended and saved to your logbook.":"Flight ended.");return true}
function staleCheck(){if(PH.p!=="landed"||PH.demo||demo||REPLAY)return;const pts=(LOG&&LOG.pts)||[],lp=pts[pts.length-1],lt=Math.max((last&&last.t)||0,(lp&&lp[3])||0);
  if(!lt||Date.now()-lt<30*60000)return;const to=apBy(S.to);
  $("endNoteTxt").textContent="Your flight"+(to?" to "+to.n:"")+" landed"+(PH.ev.td?" at "+new Date(PH.ev.td).toTimeString().slice(0,5):"")+" but hasn't been ended. End it now?";$("endNote").style.display=""}
window.cpState=n=>({p:PH.p,ev:PH.ev,bookId:PH.bookId,ended:PH.ended,logOn:LOG.on,npts:(LOG.pts||[]).length,tail:n?(LOG.pts||[]).slice(-n):undefined});
$("endBtn").onclick=()=>endFlight(false);$("endNoteBtn").onclick=()=>endFlight(true);$("endNoteX").onclick=()=>{$("endNote").style.display="none"};
function bookRender(){
  const real=BOOK.filter(b=>!b.demo&&!b.drv);let km=0,secs=0,hi=0,firm=null,longest=null;const sts=new Set();
  for(const b of real){km+=b.d;if(b.ev.up&&b.ev.td){const s=(b.ev.td-b.ev.up)/1000;secs+=s;if(!longest||s>longest.s)longest={s,b}}hi=Math.max(hi,b.ma);if(b.ev.tdG&&(!firm||b.ev.tdG>firm.g))firm={g:b.ev.tdG,b};(b.st||[]).forEach(x=>sts.add(x))}
  const kv=[["Flights",real.length],["Distance",Math.round(fDst(km)).toLocaleString()+" "+S.dst],["Flight time",hm(secs)],["Highest",hi?Math.round(fAlt(hi)).toLocaleString()+" "+S.alt:"—"],["Longest",longest?hm(longest.s)+" "+longest.b.from+"–"+longest.b.to:"—"],["Firmest landing",firm?firm.g.toFixed(2)+" G "+firm.b.to:"—"],["States crossed",sts.size?[...sts].join(" "):"—"]];
  $("statKv").innerHTML=kv.map(r=>`<div>${esc(r[0])}<b>${esc(r[1])}</b></div>`).join("");
  $("bookList").innerHTML=BOOK.length?BOOK.map((b,i)=>{const ft=b.drv&&b.ev.off&&b.ev.on?hm((b.ev.on-b.ev.off)/1000):b.ev.up&&b.ev.td?hm((b.ev.td-b.ev.up)/1000):"—";const dt=new Date(b.date).toLocaleDateString("en-AU",{day:"numeric",month:"short"});
    return `<li class="bk"><div><b>${b.drv?"DRIVE · ":""}${b.flt?esc(b.flt)+" ":""}${esc(b.from)} → ${esc(b.to)}${b.demo?" (demo)":""}</b><span>${dt} · ${ft} · ${Math.round(fDst(b.d))} ${S.dst}${b.ac?" · "+esc(b.ac):""}${b.ls?" · landing "+b.ls.score+"/100":""}${b.rs&&typeof b.rs.score==="number"?" · smooth "+b.rs.score+"/100":""}${b.dy&&b.dy.length?" · "+b.dy.length+" notes":""}</span></div><div class="row"><button data-a="rp" data-i="${i}">Replay</button><button data-a="cd" data-i="${i}">Card</button><button data-a="dy" data-i="${i}">Diary</button><button data-a="rp3" data-i="${i}">3D</button><button data-a="ty" data-i="${i}" aria-label="Aircraft type">Type</button><button data-a="gpx" data-i="${i}">GPX</button><button data-a="del" data-i="${i}">✕</button></div></li>`}).join(""):'<li><span>Flights save here automatically when you park.</span></li>';
}
$("bookList").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const i=+b.dataset.i,en=BOOK[i];if(!en)return;
  if(b.dataset.a==="gpx"){const nm=(en.flt?en.flt+"-":"")+en.from+"-"+en.to+"-"+new Date(en.date).toISOString().slice(0,10);shareOrDownload(nm+".gpx","application/gpx+xml",gpxOf(en.pts,en.marks,nm),$("bookTxt"));return}
  if(b.dataset.a==="rp")replayStart(en.pts,en);else if(b.dataset.a==="cd")showCard(en);
  else if(b.dataset.a==="del"){if(b.dataset.arm){BOOK.splice(i,1);store.set("book",BOOK);bookRender()}else{b.dataset.arm=1;b.textContent="Delete?";setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.textContent="✕"}},3000)}}});

/* ================= replay ================= */
let REPLAY=false,RP=null;
function rpFeed(p){onPos({timestamp:p[3],coords:{latitude:p[0],longitude:p[1],altitude:p[2],accuracy:5,speed:p[4],heading:null}});lastFixAt=Date.now()}
function rpReset(){trail=[];prof=[];hist=[];trkH=[];last=null;att={p:0,r:0,rate:null}}
function replayStart(pts,meta){
  if(!pts||pts.length<3)return;if(demo)stopDemo();if(watchId!=null)startGPS();
  REPLAY=true;RP={pts,meta,i:0,t:pts[0][3],t0:pts[0][3],t1:pts[pts.length-1][3],speed:30,playing:true,sv:{from:S.from,to:S.to}};
  if(meta&&meta.from&&apBy(meta.from))S.from=meta.from;if(meta&&meta.to&&apBy(meta.to))S.to=meta.to;$("from").value=S.from;$("to").value=S.to;
  rpReset();$("rpTile").style.display="";$("demoTag").style.display="inline-block";$("demoTag").textContent="REPLAY";$("rpTitle").textContent="Replay "+(meta?meta.from+" → "+meta.to:"current flight");
  rpUI();clearInterval(RP.iv);RP.iv=setInterval(rpStep,100);$("rpTile").scrollIntoView({block:"start",behavior:"smooth"});
}
function rpStep(){if(!RP||!RP.playing)return;RP.t+=RP.speed*100;let n=0;while(RP.i<RP.pts.length&&RP.pts[RP.i][3]<=RP.t){rpFeed(RP.pts[RP.i]);RP.i++;n++}if(RP.i>=RP.pts.length){RP.playing=false}rpUI()}
function rpUI(){if(!RP)return;$("rpPlay").textContent=RP.playing?"Pause":"Play";$("rpSlider").value=Math.round((RP.t-RP.t0)/(RP.t1-RP.t0||1)*1000);$("rpTime").textContent=hm((RP.t-RP.t0)/1000)+" / "+hm((RP.t1-RP.t0)/1000);document.querySelectorAll("#rpSpeed button").forEach(b=>b.classList.toggle("sel",+b.dataset.v===RP.speed))}
function replayStop(){if(!RP)return;clearInterval(RP.iv);S.from=RP.sv.from;S.to=RP.sv.to;$("from").value=S.from;$("to").value=S.to;RP=null;REPLAY=false;rpReset();$("rpTile").style.display="none";$("demoTag").style.display="none";$("demoTag").textContent="DEMO";render();drawMap();profAll()}
$("rpPlay").onclick=()=>{if(!RP)return;if(RP.i>=RP.pts.length){RP.i=0;RP.t=RP.t0;rpReset()}RP.playing=!RP.playing;rpUI()};
$("rpExit").onclick=replayStop;
$("rpSpeed").addEventListener("click",e=>{const b=e.target.closest("button");if(b&&RP){RP.speed=+b.dataset.v;rpUI()}});
$("rpSlider").addEventListener("input",e=>{if(!RP)return;const tgt=RP.t0+(+e.target.value/1000)*(RP.t1-RP.t0);rpReset();RP.i=0;RP.t=tgt;while(RP.i<RP.pts.length&&RP.pts[RP.i][3]<=tgt){rpFeed(RP.pts[RP.i]);RP.i++}rpUI()});
$("rpLogBtn").onclick=()=>{if(LOG.pts.length<3){$("logTxt").textContent="Nothing recorded to replay";return}replayStart(LOG.pts,{from:S.from,to:S.to})};

/* ================= summary card ================= */
async function showCard(en){
  en=en||makeEntry();CARD.en=en;if(!en){$("logTxt").textContent="Not enough recorded for a card";return}
  try{await document.fonts.load('700 40px "B612 Mono"');await document.fonts.load('400 20px "B612 Mono"')}catch(e){}
  const W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
  const G="#3dff6e",D="#22a64a",MG="#ff4fd8",F=(w,s)=>`${w} ${s}px "B612 Mono",monospace`;
  x.fillStyle="#0b0d0e";x.fillRect(0,0,W,H);x.fillStyle="#1c2125";x.fillRect(24,24,W-48,H-48);x.fillStyle="#020805";x.fillRect(40,40,W-80,H-80);
  x.fillStyle=D;x.font=F(700,24);x.fillText("CABIN PANEL · FLIGHT DEBRIEF"+(en.flt?" · "+en.flt:""),72,96);
  x.fillStyle=G;x.font=F(700,92);x.fillText(`${en.from} → ${en.to}`,72,200);
  const fr=apBy(en.from),to=apBy(en.to);x.fillStyle=D;x.font=F(400,28);
  x.fillText(((fr?fr.n:en.from)+" to "+(to?to.n:en.to)).toUpperCase(),72,246);x.fillText(new Date(en.date).toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"long",year:"numeric"}).toUpperCase(),72,284);
  // map
  const mx=72,my=320,mw=W-144,mh=500;x.fillStyle="#01080d";x.fillRect(mx,my,mw,mh);
  const pts=en.pts;let la0=Math.min(...pts.map(p=>p[0])),la1=Math.max(...pts.map(p=>p[0])),lo0=Math.min(...pts.map(p=>p[1])),lo1=Math.max(...pts.map(p=>p[1]));
  const k=Math.cos(rad((la0+la1)/2)),sx=Math.max((lo1-lo0)*k,1.5),sy=Math.max(la1-la0,1.5),sc=Math.min((mw-120)/sx,(mh-120)/sy),cx=(lo0+lo1)/2,cy=(la0+la1)/2;
  const P=(la,lo)=>[mx+mw/2+(lo-cx)*k*sc,my+mh/2-(la-cy)*sc];
  x.save();x.beginPath();x.rect(mx,my,mw,mh);x.clip();x.fillStyle="#0a2413";x.strokeStyle="#1d7a3a";x.lineWidth=2;
  for(const poly of COAST){x.beginPath();poly.forEach((q,i)=>{const [X,Y]=P(q[0],q[1]);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.closePath();x.fill();x.stroke()}
  x.strokeStyle=MG;x.lineWidth=6;x.lineJoin="round";x.beginPath();pts.forEach((p,i)=>{const [X,Y]=P(p[0],p[1]);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
  x.font=F(700,30);for(const [ap,lbl] of [[fr,en.from],[to,en.to]]){if(!ap)continue;const [X,Y]=P(ap.lat,ap.lon);x.fillStyle=G;x.beginPath();x.arc(X,Y,10,0,7);x.fill();x.fillText(lbl,X+16,Y-12)}
  for(const m of (en.marks||[])){const [X,Y]=P(m.lat,m.lon);x.strokeStyle="#ffbf00";x.lineWidth=4;x.beginPath();x.moveTo(X-9,Y-9);x.lineTo(X+9,Y+9);x.moveTo(X+9,Y-9);x.lineTo(X-9,Y+9);x.stroke()}
  x.restore();x.strokeStyle="#0f3a1d";x.lineWidth=2;x.strokeRect(mx,my,mw,mh);
  // profile
  const py=850,ph=200;x.fillStyle="#01080d";x.fillRect(mx,py,mw,ph);let cum=[0];for(let i=1;i<pts.length;i++)cum.push(cum[i-1]+dist({lat:pts[i-1][0],lon:pts[i-1][1]},{lat:pts[i][0],lon:pts[i][1]}));
  const tot=cum[cum.length-1]||1,top=Math.max(1000,en.ma)*1.12;
  x.beginPath();x.moveTo(mx,py+ph);pts.forEach((p,i)=>x.lineTo(mx+cum[i]/tot*mw,py+ph-(p[2]||0)/top*ph));x.lineTo(mx+mw,py+ph);x.closePath();x.fillStyle="rgba(255,79,216,.22)";x.fill();
  x.strokeStyle=MG;x.lineWidth=4;x.beginPath();pts.forEach((p,i)=>{const X=mx+cum[i]/tot*mw,Y=py+ph-(p[2]||0)/top*ph;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
  x.fillStyle=D;x.font=F(400,22);x.fillText("PROFILE · MAX "+Math.round(en.ma*FT).toLocaleString()+" FT",mx+12,py+30);
  // stats
  const ev=en.ev||{},f=t=>t?new Date(t).toTimeString().slice(0,5):"—";
  const st=[["FLIGHT TIME",ev.up&&ev.td?hm((ev.td-ev.up)/1000):"—"],["DISTANCE",Math.round(en.d/NMm).toLocaleString()+" NM"],["MAX ALT",Math.round(en.ma*FT/100)*100+" FT"],["MAX GS",Math.round(en.ms*3600/NMm)+" KT"],["WHEELS UP",f(ev.up)],["TOUCHDOWN",f(ev.td)+(ev.tdG?" · "+ev.tdG.toFixed(2)+" G":"")],["MARKS",String((en.marks||[]).length)],["STATES",(en.st||[]).join(" ")||"—"]];
  st.forEach((s,i)=>{const X=72+(i%2)*((W-144)/2),Y=1100+Math.floor(i/2)*52;x.fillStyle=D;x.font=F(700,20);x.fillText(s[0],X,Y);x.fillStyle=G;x.font=F(700,30);x.fillText(s[1],X+210,Y)});
  try{await cardExtra(x,en,W,H)}catch(e){}
  const url=c.toDataURL("image/png");$("cardImg").src=url;$("cardOv").style.display="flex";
  $("cardShare").onclick=async()=>{try{const bl=(u=>{const b=atob(u.split(",")[1]),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return new Blob([a],{type:"image/png"})})(url),file=new File([bl],`${en.from}-${en.to}.png`,{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[file]}))await navigator.share({files:[file],title:`${en.from} → ${en.to}`});else{const a=document.createElement("a");a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();$("cardHint").textContent="Saved "+file.name+" to Downloads (sharing isn't available here)."}}catch(e){if(!(e&&e.name==="AbortError"))$("cardHint").textContent="Couldn't share. Long-press the image to save it."}};
}
$("cardClose").onclick=()=>{$("cardOv").style.display="none"};
$("cardBtn").onclick=()=>showCard(null);

/* ================= flight number lookup ================= */
const AIRL={QF:["QFA","Qantas"],VA:["VOZ","Virgin Australia"],JQ:["JST","Jetstar"],ZL:["RXA","Rex"],QQ:["UTY","Alliance Airlines"],NZ:["ANZ","Air New Zealand"],SQ:["SIA","Singapore Airlines"],EK:["UAE","Emirates"],QR:["QTR","Qatar Airways"],CX:["CPA","Cathay Pacific"],FJ:["FJI","Fiji Airways"],TR:["TGW","Scoot"],GA:["GIA","Garuda Indonesia"],MH:["MAS","Malaysia Airlines"],NF:["AVN","Air Vanuatu"],PX:["ANG","Air Niugini"]};
function toCallsign(f){f=(f||"").toUpperCase().replace(/\s+/g,"");const m=f.match(/^([A-Z]{3}|[A-Z0-9]{2})0*(\d{1,4}[A-Z]?)$/);if(!m)return null;let pre=m[1],name="";
  if(pre.length===2){const a=AIRL[pre];if(!a)return {cs:null,iata:f};pre=a[0];name=a[1];return {cs:pre+m[2],name,iata:m[1]+m[2]}}
  const a=Object.entries(AIRL).find(([k,v])=>v[0]===pre);return {cs:pre+m[2],name:a?a[1][1]:"",iata:a?a[0]+m[2]:pre+m[2]}}
function fltSpoken(){if(!S.flt)return "";const m=S.flt.match(/^([A-Z0-9]{2,3}?)(\d+[A-Z]?)$/);const nm=S.fltName||(m&&AIRL[m[1]]?AIRL[m[1]][1]:"");return nm&&m?nm+" "+m[2]+", ":""}
let XAP=store.get("xap",[]);
function addApOption(a){for(const id of ["from","to"]){const sel=$(id);let g=sel.querySelector("optgroup[data-x]");if(!g){g=document.createElement("optgroup");g.label="From flight lookup";g.dataset.x="1";sel.appendChild(g)}if(!sel.querySelector(`option[value="${a.c}"]`)){const o=document.createElement("option");o.value=a.c;o.textContent=a.n+" ("+a.c+")";g.appendChild(o)}}}
function resolveAp(o){
  if(!o)return null;let a=(o.iata&&apBy(o.iata))||AP.find(x=>x.icao&&x.icao===o.icao);if(a)return a;
  const r=AP2.find(x=>(o.iata&&x[0]===o.iata)||(o.icao&&(x[5]===o.icao||x[0]===o.icao)));
  const lat=o.lat!=null?+o.lat:r?r[2]:null,lon=o.lon!=null?+o.lon:r?r[3]:null;if(lat==null||lon==null)return null;
  const code=o.iata||(r&&r[0])||o.icao;if(apBy(code))return apBy(code);
  const ausBox=lat<-9&&lat>-45&&lon>112&&lon<155;let tz;try{tz=ausBox?"Australia/"+STZ[stateAt(lat,lon)]:Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){tz="Australia/Sydney"}
  const n=cleanAp({c:code,n:String(o.city||(r&&r[1])||o.name||code).slice(0,24),lat,lon,tz,icao:o.icao||(r&&r[5])||""});if(!n)return null;if(apBy(n.c))return apBy(n.c);
  AP.push(n);XAP.push(n);store.set("xap",XAP);addApOption(n);return n;
}
function fetchT(u,ms){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);return fetch(u,{signal:c.signal,cache:"no-store"}).finally(()=>clearTimeout(t))}
const fltMsg=t=>{$("fltTxt").textContent=t};
async function lookupFlight(){
  const raw=$("fltIn").value.trim(),c=toCallsign(raw);
  if(!c){fltMsg("Enter a flight number like QF812, VA1234 or JQ501.");return}
  if(!c.cs){fltMsg("I don't know airline code "+raw.slice(0,2).toUpperCase()+". Try its 3-letter code instead, e.g. QFA812.");return}
  let framed=false;try{framed=window.self!==window.top}catch(e){framed=true}
  if(framed){fltMsg("Flight lookup needs the installed app. This preview page blocks internet access.");return}
  if(!cfOk()){fltMsg("No internet. Look up your flight before you board.");return}
  fltMsg("Looking up "+c.iata+" ("+c.cs+")…");$("fltBtn").disabled=true;
  let res=null,src="";
  try{const r=await fetchT("https://api.adsbdb.com/v0/callsign/"+c.cs,9000);if(r.ok){const j=await r.json(),f=j&&j.response&&j.response.flightroute;
    if(f&&f.origin&&f.destination){const m=a=>({iata:a.iata_code,icao:a.icao_code,name:a.name,city:a.municipality,lat:a.latitude,lon:a.longitude});res={o:m(f.origin),d:m(f.destination),mid:f.midpoint?m(f.midpoint):null,airline:f.airline&&f.airline.name};src="adsbdb.com"}}}catch(e){}
  if(!res){try{const r=await fetchT("https://hexdb.io/api/v1/route/icao/"+c.cs,9000);if(r.ok){const j=await r.json();if(j&&j.route){const parts=String(j.route).split("-");res={o:{icao:parts[0]},d:{icao:parts[parts.length-1]},mid:parts.length>2?{icao:parts[1]}:null,airline:c.name};src="hexdb.io"}}}catch(e){}}
  $("fltBtn").disabled=false;
  if(!res){fltMsg("Couldn't find a route for "+c.iata+". The free route databases don't cover every flight. Pick your airports below instead.");return}
  const A=resolveAp(res.o),B=resolveAp(res.d);
  if(!A||!B){fltMsg("Found "+c.iata+" ("+(res.o.iata||res.o.icao)+" → "+(res.d.iata||res.d.icao)+") but couldn't place those airports. Pick them below.");return}
  S.from=A.c;S.to=B.c;S.flt=c.iata;S.fltName=res.airline||c.name||"";S.fltCs=c.cs;saveS();$("from").value=A.c;$("to").value=B.c;prof=[];window.__terr=null;
  const via=res.mid?" via "+(res.mid.city||res.mid.iata||res.mid.icao):"";
  fltMsg(`${c.iata}${S.fltName?" · "+S.fltName:""}: ${A.n} (${A.c}) → ${B.n} (${B.c})${via}. Route set and saved for offline use. Route data from ${src} can be out of date, so check it against your boarding pass.`);
  render();drawMap();profAll();
}
$("fltBtn").onclick=lookupFlight;$("fltIn").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();lookupFlight()}});
$("fltClr").onclick=()=>{S.flt="";S.fltName="";S.fltCs="";saveS();$("fltIn").value="";fltMsg("Flight number cleared.");render()};
XAP=XAP.map(cleanAp).filter(Boolean);XAP.forEach(x=>{if(!apBy(x.c))AP.push(x);addApOption(x)});
if(S.from)$("from").value=S.from;if(S.to)$("to").value=S.to;
if(S.flt){$("fltIn").value=S.flt;fltMsg(`Saved: ${S.flt}${S.fltName?" · "+S.fltName:""}, ${S.from||"?"} → ${S.to||"?"}. Works offline.`)}


/* ================= logbook export / import, haptics ================= */
function hap(p){try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}}
$("expBtn").onclick=()=>{storeFlush();const d=new Date().toISOString().slice(0,10);
  const data=JSON.stringify({app:"cabin-panel",format:1,v:18,exported:new Date().toISOString(),book:BOOK,marks:MARKS,log:LOG,xap:XAP,settings:S,phase:phSnap()});
  shareOrDownload("cabin-panel-logbook-"+d+".json","application/json",data,$("bookTxt"))};
$("impBtn").onclick=()=>$("impFile").click();
/* v18: imported files are untrusted, so only well-formed values get through (and everything is escaped when shown) */
function num(v){return typeof v==="number"&&isFinite(v)?v:(v!=null&&v!==""&&typeof v!=="object"&&isFinite(+v)?+v:null)}
function code(v){return String(v==null?"":v).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,9)}
function tzOk(z){if(typeof z!=="string"||!/^[A-Za-z_]+(\/[A-Za-z_+-]+){0,2}$/.test(z))return false;try{new Intl.DateTimeFormat("en-AU",{timeZone:z});return true}catch(e){return false}}
function cleanPts(a){if(!Array.isArray(a))return [];const o=[];for(const p of a){if(!Array.isArray(p))continue;const la=num(p[0]),lo=num(p[1]),t=num(p[3]);if(la==null||lo==null||t==null||Math.abs(la)>90||Math.abs(lo)>180)continue;o.push([la,lo,num(p[2]),t,num(p[4])]);if(o.length>=40000)break}return o}
function cleanMark(m){if(!m||typeof m!=="object")return null;const lat=num(m.lat),lon=num(m.lon),t=num(m.t);if(lat==null||lon==null||t==null)return null;return {n:Math.max(1,Math.round(num(m.n)||1)),t,lat,lon,alt:num(m.alt),note:String(m.note==null?"":m.note).slice(0,80)}}
function cleanEv(e){const o={};if(!e||typeof e!=="object")return o;for(const k of ["off","roll","up","toc","tod","td","on","rollTrk","upGs","cr","tdG"]){const v=num(e[k]);if(v!=null)o[k]=v}return o}
function cleanEntry(b){if(!b||typeof b!=="object"||!num(b.id))return null;const pts=cleanPts(b.pts);if(!pts.length)return null;
  return {id:num(b.id),flt:code(b.flt).slice(0,9),demo:!!b.demo,from:code(b.from).slice(0,5)||"???",to:code(b.to).slice(0,5)||"???",date:num(b.date)||pts[0][3],ev:cleanEv(b.ev),st:(Array.isArray(b.st)?b.st:[]).filter(x=>STN[x]),d:num(b.d)||0,ma:num(b.ma)||0,ms:num(b.ms)||0,marks:(Array.isArray(b.marks)?b.marks:[]).map(cleanMark).filter(Boolean),pts,ac:String(b.ac||"").replace(/[^A-Za-z0-9 -]/g,"").slice(0,12),dy:dyClean(b.dy),ls:lsClean(b.ls),...(b.drv===1?drvCleanEntry(b):{})}}
/* v25: drive entries keep their town names (plain text, no markup), ride score and moving time on import */
function drvCleanEntry(b){const tx=v=>String(v==null?"":v).replace(/[<>&"'`\u0000-\u001f]/g,"").trim().slice(0,40),n=v=>{const x=num(v);return x==null?0:x};
  const rs=b.rs&&typeof b.rs==="object"&&num(b.rs.score)!=null?{score:Math.round(Math.max(0,Math.min(100,num(b.rs.score)))),mins:Math.max(0,Math.round(n(b.rs.mins))),rms:n(b.rs.rms),parts:(Array.isArray(b.rs.parts)?b.rs.parts:[]).slice(0,4).map(p=>[tx(Array.isArray(p)?p[0]:""),Math.max(0,Math.round(n(Array.isArray(p)?p[1]:0)))])}:undefined;
  return {drv:1,flt:"",from:tx(b.from)||"Start",to:tx(b.to)||"End",rs,mv:Math.max(0,Math.round(n(b.mv)))}}
function cleanAp(x){if(!x||typeof x!=="object")return null;const c=code(x.c).slice(0,5);const lat=num(x.lat),lon=num(x.lon);if(c.length<3||lat==null||lon==null)return null;return {c,n:String(x.n==null?c:x.n).replace(/[<>&"]/g,"").slice(0,24),lat,lon,tz:tzOk(x.tz)?x.tz:"Australia/Sydney",icao:code(x.icao).slice(0,4)}}
$("impFile").onchange=async e=>{const f=e.target.files&&e.target.files[0];e.target.value="";if(!f)return;
  try{const j=JSON.parse(await f.text());if(!j||j.app!=="cabin-panel"||!Array.isArray(j.book))throw new Error("not a Cabin Panel logbook");
    const have=new Set(BOOK.map(b=>b.id));let n=0;for(const b0 of j.book){const b=cleanEntry(b0);if(b&&!have.has(b.id)){BOOK.push(b);have.add(b.id);n++}}
    BOOK.sort((a,b)=>b.date-a.date);if(BOOK.length>60)BOOK.length=60;
    for(const x0 of (Array.isArray(j.xap)?j.xap:[])){const x=cleanAp(x0);if(x&&!apBy(x.c)){AP.push(x);XAP.push(x);addApOption(x)}}store.set("xap",XAP);
    const mk=m=>m.t+"|"+(+m.lat).toFixed(5)+"|"+(+m.lon).toFixed(5),hm_=new Set(MARKS.map(mk));let nm=0;
    for(const m0 of (Array.isArray(j.marks)?j.marks:[])){const m=cleanMark(m0);if(m&&!hm_.has(mk(m))){MARKS.push(m);hm_.add(mk(m));nm++}}
    if(nm){MARKS.sort((a,b)=>a.t-b.t);store.set("marks",MARKS);markRender();try{drawMap()}catch(_){}}
    let lg=false;const ipts=j.log?cleanPts(j.log.pts):[];if(ipts.length&&!(LOG.pts&&LOG.pts.length)){LOG={on:false,pts:ipts};store.set("log",LOG);lg=true;try{logInfo()}catch(_){}}
    const ok=store.set("book",BOOK);bookRender();$("bookTxt").textContent=ok?"Imported "+n+" flight"+(n===1?"":"s")+" ("+(j.book.length-n)+" already here)"+(nm?", "+nm+" mark"+(nm===1?"":"s"):"")+(lg?", and the saved track log":"")+".":"Imported, but saving failed. Storage may be full.";
  }catch(err){$("bookTxt").textContent="Couldn't import that file: "+err.message+"."}};
async function storeInfo(){try{if(navigator.storage&&navigator.storage.estimate){const q=await navigator.storage.estimate();const pers=navigator.storage.persisted?await navigator.storage.persisted():false;
  if(!sfWarned)$("storeTxt").textContent="Flight data saves every few seconds and when the app closes. Using "+(q.usage/1048576).toFixed(1)+" MB"+(pers?", protected from automatic clearing.":".")}}catch(e){}}
storeInfo();setInterval(storeInfo,60000);


/* ================= full-screen HUD (button, or rotate to landscape) ================= */
let arOn=false;
let fhOn=false,fhAuto=false;
function fhEnter(auto){if(fhOn)return;fhOn=true;fhAuto=!!auto;const rr=typeof retroOn==="function"&&retroOn();$("fhSlot").appendChild(rr?$("retro"):$("hudwrap"));document.body.classList.toggle("fhr",!!rr);document.body.classList.add("fh");if(rr)setTimeout(retroKick,0);$("fhPhase").textContent=PHN[PH.p]||"";hudKey="";try{wantWake||$("wakeBtn").click()}catch(e){}}
function fhExit(){if(!fhOn)return;fhOn=false;fhAuto=false;const t=document.querySelector(".tile.hud");if($("hudwrap").parentNode!==t)t.insertBefore($("hudwrap"),t.firstChild);if($("retro").parentNode!==$("retroHome"))$("retroHome").appendChild($("retro"));document.body.classList.remove("fh","fhr");hudKey=""}
$("fhBtn").onclick=()=>fhEnter(false);$("fhExit").onclick=fhExit;
const landMQ=matchMedia("(orientation: landscape) and (max-height: 600px)");
const landCheck=()=>{if(cmpOn||arOn||document.body.classList.contains("sv"))return;if((S.autofh||"on")!=="on")return;if(landMQ.matches)fhEnter(true);else if(fhAuto)fhExit()};
try{landMQ.addEventListener("change",landCheck)}catch(e){try{landMQ.addListener(landCheck)}catch(_){}}
setTimeout(landCheck,300);

/* ================= v21: compass view (phone magnetic compass vs GPS track) =================
   Read-only: listens to deviceorientation only while this view is open. Never touches GPS, phases, logbook or map. */
let cmpOn=false;
const CMP={listen:false,perm:"",raw:null,s:null,acc:null,src:"",t:0,rot:0,trkRot:0,raf:0,lt:0,lastDraw:0,wait:0,decl:null,declAt:0,declPos:null};
const WMM=[-29351.8,0,12,0,-1410.8,4545.4,9.7,-21.5,-2556.6,0,-11.6,0,2951.1,-3133.6,-5.2,-27.7,1649.3,-815.1,-8,-12.1,1361,0,-1.3,0,-2404.1,-56.6,-4.2,4,1243.8,237.5,0.4,-0.3,453.6,-549.5,-15.6,-4.1,895,0,-1.6,0,799.5,278.6,-2.4,-1.1,55.7,-133.9,-6,4.1,-281.1,212,5.6,1.6,12.1,-375.6,-7,-4.4,-233.2,0,0.6,0,368.9,45.4,1.4,-0.5,187.2,220.2,0,2.2,-138.7,-122.9,0.6,0.4,-142,43,2.2,1.7,20.9,106.1,0.9,1.9,64.4,0,-0.2,0,63.8,-18.4,-0.4,0.3,76.9,16.8,0.9,-1.6,-115.7,48.8,1.2,-0.4,-40.9,-59.8,-0.9,0.9,14.9,10.9,0.3,0.7,-60.7,72.7,0.9,0.9,79.5,0,-0,0,-77,-48.9,-0.1,0.6,-8.8,-14.4,-0.1,0.5,59.3,-1,0.5,-0.8,15.8,23.4,-0.1,0,2.5,-7.4,-0.8,-1,-11.1,-25.1,-0.8,0.6,14.2,-2.3,0.8,-0.2,23.2,0,-0.1,0,10.8,7.1,0.2,-0.2,-17.5,-12.6,0,0.5,2,11.4,0.5,-0.4,-21.7,-9.7,-0.1,0.4,16.9,12.7,0.3,-0.5,15,0.7,0.2,-0.6,-16.8,-5.2,-0,0.3,0.9,3.9,0.2,0.2,4.6,0,-0,0,7.8,-24.8,-0.1,-0.3,3,12.2,0.1,0.3,-0.2,8.3,0.3,-0.3,-2.5,-3.3,-0.3,0.3,-13.1,-5.2,0,0.2,2.4,7.2,0.3,-0.1,8.6,-0.6,-0.1,-0.2,-8.7,0.8,0.1,0.4,-12.9,10,-0.1,0.1,-1.3,0,0.1,0,-6.4,3.3,0,0,0.2,0,0.1,-0,2,2.4,0.1,-0.2,-1,5.3,-0,0.1,-0.6,-9.1,-0.3,-0.1,-0.9,0.4,0,0.1,1.5,-4.2,-0.1,0,0.9,-3.8,-0.1,-0.1,-2.7,0.9,-0,0.2,-3.9,-9.1,-0,-0,2.9,0,0,0,-1.5,0,-0,-0,-2.5,2.9,0,0.1,2.4,-0.6,0,-0,-0.6,0.2,0,0.1,-0.1,0.5,-0.1,-0,-0.6,-0.3,0,-0,-0.1,-1.2,-0,0.1,1.1,-1.7,-0.1,-0,-1,-2.9,-0.1,0,-0.2,-1.8,-0.1,0,2.6,-2.3,-0.1,0,-2,0,0,0,-0.2,-1.3,0,-0,0.3,0.7,-0,0,1.2,1,-0,-0.1,-1.3,-1.4,-0,0.1,0.6,-0,-0,-0,0.6,0.6,0.1,-0,0.5,-0.1,-0,-0,-0.1,0.8,0,0,-0.4,0.1,0,-0,-0.2,-1,-0.1,-0,-1.3,0.1,-0,0,-0.7,0.2,-0.1,-0.1];
/* magnetic declination (degrees, east +) from the World Magnetic Model 2025 (NOAA/BGS, public domain), valid 2025-2030 */
function magDecl(lat,lon,hKm,yr){
  const t=yr-2025,D=Math.PI/180,A=6378.137,F=1/298.257223563,E2=F*(2-F),a0=6371.2;
  const sl=Math.sin(lat*D),cl=Math.cos(lat*D),Rc=A/Math.sqrt(1-E2*sl*sl),p=(Rc+hKm)*cl,z=(Rc*(1-E2)+hKm)*sl,r=Math.hypot(p,z),pc=Math.asin(z/r);
  const ct=Math.sin(pc),st=Math.max(1e-9,Math.cos(pc)),N=12,P=[],dP=[];
  for(let n=0;n<=N;n++){P.push(new Array(n+1).fill(0));dP.push(new Array(n+1).fill(0))}
  P[0][0]=1;
  for(let n=1;n<=N;n++)for(let m=0;m<=n;m++){
    if(m===n){if(n===1){P[1][1]=st;dP[1][1]=ct}else{const k=Math.sqrt(1-1/(2*n));P[n][n]=k*st*P[n-1][n-1];dP[n][n]=k*(st*dP[n-1][n-1]+ct*P[n-1][n-1])}}
    else{const k1=Math.sqrt((n-1)*(n-1)-m*m),k2=Math.sqrt(n*n-m*m),p2=n-2>=m?P[n-2][m]:0,d2=n-2>=m?dP[n-2][m]:0;
      P[n][m]=((2*n-1)*ct*P[n-1][m]-k1*p2)/k2;dP[n][m]=((2*n-1)*(ct*dP[n-1][m]-st*P[n-1][m])-k1*d2)/k2}}
  let Bt=0,Bp=0,Br=0,i=0;const lm=lon*D;
  for(let n=1;n<=N;n++){const ar=Math.pow(a0/r,n+2);for(let m=0;m<=n;m++,i+=4){
    const g=WMM[i]+t*WMM[i+2],h=WMM[i+1]+t*WMM[i+3],c=Math.cos(m*lm),s=Math.sin(m*lm);
    Br+=ar*(n+1)*(g*c+h*s)*P[n][m];Bt-=ar*(g*c+h*s)*dP[n][m];Bp+=ar*m*(g*s-h*c)*P[n][m]/st}}
  const Xc=-Bt,Zc=-Br,ps=pc-lat*D,X=Xc*Math.cos(ps)-Zc*Math.sin(ps);
  return Math.atan2(Bp,X)/D;
}
{let h="";for(let d=0;d<360;d+=5){const big=d%30===0,mid=d%10===0,a=rad(d),r1=150,r2=big?126:mid?136:142;
  h+=`<line x1="${(160+r1*Math.sin(a)).toFixed(1)}" y1="${(160-r1*Math.cos(a)).toFixed(1)}" x2="${(160+r2*Math.sin(a)).toFixed(1)}" y2="${(160-r2*Math.cos(a)).toFixed(1)}" stroke="var(--mag)" stroke-width="${big?3:mid?2:1}" opacity="${big?1:.75}"/>`;
  if(big){const lbl={0:"N",90:"E",180:"S",270:"W"}[d]||String(d/10),rr=108,x=(160+rr*Math.sin(a)).toFixed(1),y=(160-rr*Math.cos(a)).toFixed(1);
    h+=`<text x="${x}" y="${(+y+8).toFixed(1)}" text-anchor="middle" font-size="${d%90===0?26:20}" font-weight="700" fill="${d===0?"var(--cyan)":"var(--ink)"}" transform="rotate(${d} ${x} ${y})">${lbl}</text>`}}
 h+='<g id="cBug"><path d="M160 6 L172 6 L172 18 L166 26 L160 18 L154 26 L148 18 L148 6 Z" fill="none" stroke="var(--cyan)" stroke-width="3"/><line x1="160" y1="28" x2="160" y2="96" stroke="var(--cyan)" stroke-width="2" stroke-dasharray="5 5"/></g>';
 $("cRose").innerHTML=h;$("cBug").style.display="none"}
const w180=d=>((d%360)+540)%360-180;
const p3=v=>String(Math.round(((v%360)+360)%360)%360).padStart(3,"0");
function cmpScrAng(){if(typeof window.orientation==="number")return window.orientation;try{if(screen.orientation&&typeof screen.orientation.angle==="number")return screen.orientation.angle}catch(e){}return 0}
function cmpMsg(k){const m=$("cmpMsg"),er=$("cmpEnRow");const T={
  need:["Tap Enable compass, then choose Allow, to read the phone's magnetic compass.",1,0],
  denied:["Compass access was denied. Fully close Cabin Panel and reopen it, then tap Enable compass and choose Allow.",1,1],
  unavail:["No compass reading from this phone or browser. The GPS track is still shown.",0,1],
  wait:["Waiting for the compass…",0,0],
  cal:["Compass needs calibrating: move the phone in a figure-8, away from metal.",0,1]}[k];
  CMP.msg=k||"";if(!T){m.style.display="none";er.style.display="none";return}
  m.textContent=T[0];m.className=T[2]?"warn":"";m.style.display="";er.style.display=T[1]?"":"none"}
function onCmp(e){let h=null,acc=null,src="";
  if(typeof e.webkitCompassHeading==="number"&&isFinite(e.webkitCompassHeading)&&e.webkitCompassHeading>=0){h=e.webkitCompassHeading;src="ios";
    if(typeof e.webkitCompassAccuracy==="number"&&isFinite(e.webkitCompassAccuracy))acc=e.webkitCompassAccuracy}
  else if((e.type==="deviceorientationabsolute"||e.absolute===true)&&typeof e.alpha==="number"&&isFinite(e.alpha)){h=360-e.alpha;src="abs"}
  if(h==null)return;
  if(src==="abs"&&CMP.src==="ios")return;
  h=((h+cmpScrAng())%360+360)%360;
  CMP.raw=h;CMP.acc=acc;CMP.src=src;CMP.t=Date.now();if(CMP.s==null)CMP.s=h;
  if(CMP.msg==="wait"||CMP.msg==="unavail")cmpMsg(acc!=null&&acc<0?"cal":"");
}
function cmpListen(){if(CMP.listen)return;CMP.listen=true;window.addEventListener("deviceorientation",onCmp);if("ondeviceorientationabsolute" in window)window.addEventListener("deviceorientationabsolute",onCmp);
  if(CMP.raw==null){cmpMsg("wait");clearTimeout(CMP.wait);CMP.wait=setTimeout(()=>{if(cmpOn&&CMP.raw==null)cmpMsg("unavail")},4000)}}
function cmpUnlisten(){if(!CMP.listen)return;CMP.listen=false;window.removeEventListener("deviceorientation",onCmp);window.removeEventListener("deviceorientationabsolute",onCmp);clearTimeout(CMP.wait)}
/* called straight from a tap so iOS shows its Allow prompt (requestPermission must start inside the tap) */
function cmpStart(fromTap){
  const DOE=window.DeviceOrientationEvent;
  if(!DOE){cmpMsg("unavail");return}
  if(typeof DOE.requestPermission==="function"&&CMP.perm!=="granted"){
    if(!fromTap){cmpMsg("need");return}
    let pr;try{pr=DOE.requestPermission()}catch(e){cmpMsg("need");return}
    Promise.resolve(pr).then(r=>{if(r==="granted"){CMP.perm="granted";if(cmpOn)cmpListen()}else{CMP.perm="denied";cmpMsg("denied")}}).catch(()=>{cmpMsg(CMP.perm==="denied"?"denied":"need")});
    return}
  cmpListen()}
function cmpDecl(L){const now=Date.now();if(!L)return CMP.decl;
  if(CMP.decl==null||now-CMP.declAt>60000||!CMP.declPos||Math.abs(CMP.declPos[0]-L.lat)>0.5||Math.abs(CMP.declPos[1]-L.lon)>0.5){
    try{const d=new Date(now),yr=d.getUTCFullYear()+(d-Date.UTC(d.getUTCFullYear(),0,1))/31557600000;CMP.decl=magDecl(L.lat,L.lon,Math.max(0,(L.alt||0)/1000),yr);CMP.declAt=now;CMP.declPos=[L.lat,L.lon]}catch(e){}}
  return CMP.decl}
function cmpFrame(ts){CMP.raf=0;if(!cmpOn)return;
  const dt=CMP.lt?Math.min(0.5,(ts-CMP.lt)/1000):0;CMP.lt=ts;
  if(CMP.raw!=null&&CMP.s!=null){const k=dt?1-Math.exp(-dt/0.3):1;CMP.s=((CMP.s+k*w180(CMP.raw-CMP.s))%360+360)%360}
  if(!reduceMo||ts-CMP.lastDraw>250){CMP.lastDraw=ts;cmpDraw()}
  CMP.raf=requestAnimationFrame(cmpFrame)}
function cmpDraw(){
  const L=last,fresh=CMP.raw!=null&&Date.now()-CMP.t<5000,hd=fresh?CMP.s:null;
  const dec=L?cmpDecl(L):null,mov=!!(L&&L.trk!=null&&L.spd!=null&&L.spd>=2.6&&Date.now()-L.t<20000);
  const trkM=mov&&dec!=null?((L.trk-dec)%360+360)%360:null;
  if(hd!=null){const tgt=reduceMo?Math.round(hd):hd;CMP.rot=unwrap(CMP.rot,-tgt);$("cRose").setAttribute("transform",`rotate(${CMP.rot.toFixed(2)} 160 160)`);setVal("cmpHdg",p3(hd),"°M");$("cNoHdg").style.display="none"}
  else{$("cmpHdg").innerHTML="---<small>°M</small>";$("cNoHdg").style.display=""}
  const bug=$("cBug");if(trkM!=null){CMP.trkRot=unwrap(CMP.trkRot,trkM);bug.setAttribute("transform",`rotate(${CMP.trkRot.toFixed(2)} 160 160)`);bug.style.display=""}else bug.style.display="none";
  $("cmpTrk").textContent=mov?p3(L.trk)+"°T":"Not moving";$("cmpTrkM").textContent=trkM!=null?p3(trkM)+"°M":mov?"---":"Not moving";
  $("cmpVar").textContent=dec==null?"---":Math.abs(dec)<0.5?"0°":Math.round(Math.abs(dec))+"°"+(dec>0?"E":"W");
  const dev=hd!=null&&trkM!=null?Math.round(w180(hd-trkM)):null,de=$("cmpDev");
  de.textContent=dev==null?"---":(dev>0?"+":dev<0?"−":"±")+Math.abs(dev)+"°";de.classList.toggle("big",dev!=null&&Math.abs(dev)>=20);
  $("cmpAcc").textContent=CMP.acc==null?(CMP.src==="abs"?"n/a":"---"):CMP.acc<0?"Calibrate":"±"+Math.round(CMP.acc)+"°";
  if(fresh&&CMP.acc!=null&&CMP.acc<0&&CMP.msg!=="cal")cmpMsg("cal");else if(CMP.msg==="cal"&&!(CMP.acc!=null&&CMP.acc<0))cmpMsg("");
}
function cmpOpen(){if(cmpOn)return;if(typeof fhOn!=="undefined"&&fhOn)fhExit();if(arOn)arClose();cmpOn=true;document.body.classList.add("cmp");$("cmpPhase").textContent=PHN[PH.p]||"";
  cmpStart(true);CMP.lt=0;if(!CMP.raf)CMP.raf=requestAnimationFrame(cmpFrame);cmpDraw();try{wantWake||$("wakeBtn").click()}catch(e){}try{$("cmpExit").focus()}catch(e){}}
function cmpClose(){if(!cmpOn)return;cmpOn=false;document.body.classList.remove("cmp");cmpUnlisten();if(CMP.raf){cancelAnimationFrame(CMP.raf);CMP.raf=0}CMP.raw=null;CMP.s=null;CMP.src="";cmpMsg("");try{$("cmpBtn").focus()}catch(e){}setTimeout(()=>{try{landCheck()}catch(e){}},50)}
$("cmpBtn").onclick=cmpOpen;$("cmpExit").onclick=cmpClose;$("cmpEn").onclick=()=>cmpStart(true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&cmpOn)cmpClose()});

/* ---------- map ---------- */
const cv=$("map");
const planeImg=new Image();planeImg.src="plane.webp";planeImg.onload=()=>{try{drawMap()}catch(e){}};
/* v20 auto zoom: target view per phase, eased with an exponential follow (~1.7 s), reduced motion jumps */
let RWY=null;fetch("rwy.json").then(r=>r.ok?r.json():null).then(j=>{if(Array.isArray(j)){RWY=j;try{drawMap()}catch(e){}}}).catch(()=>{});
const ZM={cur:null,tgt:null,mode:"fit",span:null,paused:false,man:null,ph:null,raf:0,lastT:0,W:0,H:0};
const rwyNear=(p,m)=>{if(!RWY||!p)return null;let best=null,bd=m;for(const a of RWY){const d=dist(p,{lat:a[2],lon:a[3]});if(d<bd){bd=d;best=a}}return best};
const vOf=(c,spanKm,W,H)=>({cx:c.lon,cy:c.lat,sc:Math.min(W,H)/(spanKm*1000/111320)});
const spanOf=(v,W,H)=>Math.min(W,H)/v.sc*111.32;
function zoomTarget(fitV,W,H,fr,to){
  const L=last,p=PH.p,fitSpan=spanOf(fitV,W,H);ZM.why="";
  if(ZM.paused&&ZM.man){ZM.mode="manual";return ZM.man}
  if((S.mapAuto||"on")!=="on"){ZM.mode="fit";return fitV}
  {const z=tkZoom(W,H);if(z)return z}
  const ground=(c)=>{const ap=rwyNear(c,6000);if(ap){const apc={lat:ap[2],lon:ap[3]},far=L&&dist(L,apc)>2500;ZM.mode="airport";return vOf(far?L:apc,7,W,H)}ZM.mode="area";return vOf(c,40,W,H)};
  const after=p==="landed"||(p==="parked"&&PH.ev&&PH.ev.td);
  if(p==="parked"||p==="taxi"||p==="roll"||p==="landed"){const c=L||(after?to:fr);if(!c){ZM.mode="fit";return fitV}return ground(L||c)}
  if(!L){ZM.mode="fit";return fitV}
  if(p==="climb"){const o=fr||L,dO=dist(L,o)/1000,h=Math.max(0,(L.alt||0)-(PH.alt0||0))/1000;let sp=Math.max(8,2.4*dO+4*h+6);
    if(sp>=fitSpan*0.85){ZM.mode="route";return fitV}ZM.mode="climb";return vOf(L,sp,W,H)}
  if(p==="cruise"){ZM.mode="route";return fitV}
  if(p==="descent"||p==="approach"){if(!to){ZM.mode="route";return fitV}const dtg=dist(L,to)/1000;let sp=Math.max(p==="approach"?7:10,dtg*1.5+(p==="approach"?6:12));
    if(sp>=fitSpan*0.85){ZM.mode="route";return fitV}if(!rwyNear(to,6000))sp=Math.max(sp,40);ZM.mode=p;const m=gcPoint(L,to,0.5);return vOf(dtg<4?to:m,sp,W,H)}
  ZM.mode="fit";return fitV}
function zoomView(fitV,W,H,fr,to){
  if(PH.p!==ZM.ph){if(ZM.ph!=null&&ZM.paused){ZM.paused=false;ZM.man=null}ZM.ph=PH.p}
  ZM.W=W;ZM.H=H;let t=zoomTarget(fitV,W,H,fr,to);
  /* hysteresis: ignore scale wobble under 6% so continuous climb/descent scaling doesn't jitter */
  if(ZM.tgt&&ZM.mode!=="manual"&&Math.abs(Math.log(t.sc/ZM.tgt.sc))<0.06)t={cx:t.cx,cy:t.cy,sc:ZM.tgt.sc};
  ZM.tgt=t;ZM.span=spanOf(t,W,H);updAutoBtn();
  if(!ZM.cur||reduceMo){ZM.cur=Object.assign({},t);return ZM.cur}
  const c=ZM.cur,mv=Math.hypot((t.cx-c.cx)*Math.cos(rad(c.cy))*c.sc,(t.cy-c.cy)*c.sc),sr=Math.abs(Math.log(t.sc/c.sc));
  if(mv<0.5&&sr<0.004){ZM.cur=Object.assign({},t);return ZM.cur}
  if(mv<6&&sr<0.02&&!ZM.raf){ZM.cur=Object.assign({},t);return ZM.cur}  /* small follow (aircraft moving): apply directly */
  if(!ZM.raf){ZM.lastT=performance.now();ZM.raf=requestAnimationFrame(zoomTick)}
  return ZM.cur}
function zoomTick(now){ZM.raf=0;const c=ZM.cur,t=ZM.tgt;if(!c||!t)return;const dt=Math.min(100,Math.max(0,now-ZM.lastT));ZM.lastT=now;
  const a=1-Math.exp(-dt/430);/* time constant 0.43 s: ~97% of the way in 1.5 s, ~99% in 2 s */
  const ls=Math.log(c.sc)+(Math.log(t.sc)-Math.log(c.sc))*a;
  /* move the centre in screen space at the current scale so a zoom-out doesn't swing wildly */
  ZM.cur={cx:c.cx+(t.cx-c.cx)*a,cy:c.cy+(t.cy-c.cy)*a,sc:Math.exp(ls)};
  const mv=Math.hypot((t.cx-ZM.cur.cx)*Math.cos(rad(t.cy))*t.sc,(t.cy-ZM.cur.cy)*t.sc),sr=Math.abs(Math.log(t.sc/ZM.cur.sc));
  if(mv<0.5&&sr<0.004)ZM.cur=Object.assign({},t);else{ZM.raf=requestAnimationFrame(zoomTick)}
  try{drawMapCore()}catch(e){}}
function updAutoBtn(){const b=$("mzAuto");if(!b)return;const on=(S.mapAuto||"on")==="on",pz=on&&ZM.paused;b.className=pz?"paused":on?"on":"off";b.setAttribute("aria-pressed",on&&!pz?"true":"false");b.title=pz?"Auto zoom paused — tap to resume":on?"Auto zoom on — tap to turn off":"Auto zoom off — tap to turn on"}
function zoomManual(f,ox,oy){/* f>1 zooms in about canvas point (ox,oy) */const c=ZM.cur||ZM.tgt;if(!c||!ZM.W)return;const W=ZM.W,H=ZM.H,k=Math.cos(rad(c.cy));
  const nsc=Math.max(3,Math.min(60000,c.sc*f));ox=ox==null?W/2:ox;oy=oy==null?H/2:oy;
  const lon=c.cx+(ox-W/2)/(k*c.sc),lat=c.cy-(oy-H/2)/c.sc;const m={cx:lon-(ox-W/2)/(k*nsc),cy:lat+(oy-H/2)/nsc,sc:nsc};
  ZM.paused=true;
  ZM.man=m;if(reduceMo)ZM.cur=Object.assign({},m);drawMap()}
$("mzIn").onclick=()=>zoomManual(2);$("mzOut").onclick=()=>zoomManual(0.5);
$("mzAuto").onclick=()=>{const on=(S.mapAuto||"on")==="on";if(on&&ZM.paused){ZM.paused=false;ZM.man=null}else{S.mapAuto=on?"off":"on";ZM.paused=false;ZM.man=null;saveS()}hap(15);drawMap()};
{let pin=null;const mf=$("map"),pt=(e,i)=>{const r=mf.getBoundingClientRect();return [e.touches[i].clientX-r.left,e.touches[i].clientY-r.top]};
  mf.addEventListener("touchstart",e=>{if(e.touches.length===2){e.preventDefault();const a=pt(e,0),b=pt(e,1);pin={d:Math.hypot(a[0]-b[0],a[1]-b[1])||1}}},{passive:false});
  mf.addEventListener("touchmove",e=>{if(pin&&e.touches.length===2){e.preventDefault();const a=pt(e,0),b=pt(e,1),d=Math.hypot(a[0]-b[0],a[1]-b[1])||1,f=d/pin.d;if(Math.abs(Math.log(f))>0.02){pin.d=d;zoomManual(f,(a[0]+b[0])/2,(a[1]+b[1])/2)}}},{passive:false});
  mf.addEventListener("touchend",e=>{if(e.touches.length<2)pin=null});
  mf.addEventListener("gesturestart",e=>e.preventDefault());
  mf.addEventListener("wheel",e=>{if(!e.ctrlKey&&!e.altKey)return;e.preventDefault();const r=mf.getBoundingClientRect();zoomManual(Math.exp(-e.deltaY*0.01),e.clientX-r.left,e.clientY-r.top)},{passive:false});
  mf.addEventListener("dblclick",e=>{const r=mf.getBoundingClientRect();zoomManual(2,e.clientX-r.left,e.clientY-r.top)})}
window.cpZoom=()=>({mode:ZM.mode,phase:PH.p,auto:S.mapAuto||"on",paused:ZM.paused,targetKm:ZM.span&&+ZM.span.toFixed(2),curKm:ZM.cur&&ZM.W?+spanOf(ZM.cur,ZM.W,ZM.H).toFixed(2):null,anim:!!ZM.raf,rwy:RWY?RWY.length:0});
function drawMap(){if(ZM.raf)return;drawMapCore()}
function drawMapCore(){
  const W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;const dpr=window.devicePixelRatio||1;
  if(cv.width!==W*dpr||cv.height!==H*dpr){cv.width=W*dpr;cv.height=H*dpr}
  const x=cv.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,W,H);
  const css=getComputedStyle(document.body),col=k=>css.getPropertyValue(k).trim(),nvg=S.disp==="nvg",glow=false;/* v24c: flat MFD look, no canvas glow */
  const fr=DRV.on?null:apBy(S.from),to=DRV.on?null:apBy(S.to);const pts=[];
  if(fr)pts.push(fr);if(to)pts.push(to);for(const p of trail)pts.push(p);if(last)pts.push(last);
  if(!pts.length){for(const a of AP)pts.push(a)}
  let la0=Math.min(...pts.map(p=>p.lat)),la1=Math.max(...pts.map(p=>p.lat)),lo0=Math.min(...pts.map(p=>p.lon)),lo1=Math.max(...pts.map(p=>p.lon));
  const k0=Math.cos(rad((la0+la1)/2));let spanX=Math.max((lo1-lo0)*k0,1.2),spanY=Math.max(la1-la0,1.2);
  const pad=40,fitV={cx:(lo0+lo1)/2,cy:(la0+la1)/2,sc:Math.min((W-2*pad)/spanX,(H-2*pad)/spanY)};
  /* v20: auto zoom by flight phase (eased), or manual pinch/buttons */
  const V=zoomView(fitV,W,H,fr,to);const cx=V.cx,cy=V.cy,sc=V.sc,k=Math.cos(rad(cy));
  const P=p=>[W/2+(p.lon-cx)*k*sc,H/2-(p.lat-cy)*sc];
  x.fillStyle=col("--sea");x.fillRect(0,0,W,H);
  /* glowing grid */
  const step=sc>2400?0.05:sc>600?0.2:sc>150?0.5:sc>60?1:sc>20?5:10;x.save();x.strokeStyle=col("--ink");x.globalAlpha=nvg?.25:.16;x.lineWidth=1;if(glow){x.shadowColor=col("--ink");x.shadowBlur=6}
  for(let g=Math.ceil((cy-H/2/sc)/step)*step;g<cy+H/2/sc;g+=step){const y=P({lat:g,lon:cx})[1];x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()}
  for(let g=Math.ceil((cx-W/2/sc/k)/step)*step;g<cx+W/2/sc/k;g+=step){const xx=P({lat:cy,lon:g})[0];x.beginPath();x.moveTo(xx,0);x.lineTo(xx,H);x.stroke()}
  x.restore();
  /* land + stronger coastline */
  x.save();x.fillStyle=col("--land");x.globalAlpha=.92;
  const coast=()=>{x.beginPath();for(const poly of COAST){poly.forEach((q,i)=>{const X=W/2+(q[1]-cx)*k*sc,Y=H/2-(q[0]-cy)*sc;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.closePath()}};
  coast();x.fill();x.globalAlpha=1;x.strokeStyle=col("--ok");x.lineWidth=1.8;if(glow){x.shadowColor=col("--ok");x.shadowBlur=8}coast();x.stroke();x.restore();
  /* grid labels after land so they sit on top */
  if(W>380){x.fillStyle=col("--dim");x.font="11px \"B612 Mono\",monospace";for(let g=Math.ceil((cy-H/2/sc)/step)*step;g<cy+H/2/sc;g+=step){const y=P({lat:g,lon:cx})[1];x.fillText(+Math.abs(g).toFixed(2)+"°"+(g<0?"S":"N"),4,y-3)}}
  /* v22: OSM aprons + taxiways under the runway strips */
  let twyOn=false;try{twyOn=twyDraw(x,P,sc,k,cx,cy,W,H,nvg,col)}catch(e){}
  /* v20: runways (OurAirports, public domain) as scaled strips with end idents when zoomed in */
  const rwyDrawn=new Set();
  if(RWY&&sc>250){const mpp=111320/sc,vw=W/2/sc/k+0.2,vh=H/2/sc+0.2;
    for(const a of RWY){if(Math.abs(a[2]-cy)>vh||Math.abs(a[3]-cx)>vw)continue;rwyDrawn.add(a[0]||a[1]);
      for(const r of a[4]){const [ax,ay]=P({lat:r[2],lon:r[3]}),[bx,by]=P({lat:r[4],lon:r[5]});const wpx=Math.max(2.5,r[6]/mpp);
        x.save();x.lineCap="butt";x.strokeStyle=nvg?col("--dim"):"#8d949b";x.globalAlpha=.95;x.lineWidth=wpx;x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke();
        if(wpx>5){x.strokeStyle=nvg?col("--bg"):"#eef1f3";x.lineWidth=Math.max(1,wpx/14);x.setLineDash([Math.max(4,wpx*.9),Math.max(4,wpx*.9)]);x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke();x.setLineDash([])}x.restore();
        if(sc>1500){const len=Math.hypot(bx-ax,by-ay)||1,ux=(bx-ax)/len,uy=(by-ay)/len;x.save();x.font="700 11px \"B612 Mono\",monospace";x.fillStyle=col("--ink");x.textAlign="center";x.textBaseline="middle";
          if(glow){x.shadowColor="#000";x.shadowBlur=4}x.fillText(r[0],ax-ux*13,ay-uy*13);x.fillText(r[1],bx+ux*13,by+uy*13);x.restore()}}}}
  /* v22: pre-flight pack weather overlay */
  if(fr&&to&&fr.c!==to.c)try{wxDraw(x,P,sc,W,H,col,glow,fr,to)}catch(e){}
  /* lines: planned route then flown track */
  if(fr&&to){x.save();x.strokeStyle=col("--mag");x.lineWidth=2.5;x.setLineDash([8,6]);if(glow){x.shadowColor=col("--mag");x.shadowBlur=6}x.beginPath();for(let i=0;i<=60;i++){const [px,py]=P(gcPoint(fr,to,i/60));i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();x.restore()}
  if(trail.length>1){x.save();x.strokeStyle=col("--cyan");x.lineWidth=3;x.lineJoin="round";if(glow){x.shadowColor=col("--cyan");x.shadowBlur=8}x.beginPath();trail.forEach((p,i)=>{const [px,py]=P(p);i?x.lineTo(px,py):x.moveTo(px,py)});if(last){const [px,py]=P(last);x.lineTo(px,py)}x.stroke();x.restore()}
  /* label placement with rectangle collision (origin/destination first, airports last) */
  const boxes=[];const hit=r=>boxes.some(b=>r.x<b.x+b.w+3&&r.x+r.w+3>b.x&&r.y<b.y+b.h+2&&r.y+r.h+2>b.y);
  if(last){const [px,py]=P(last);boxes.push({x:px-18,y:py-18,w:36,h:36})}
  for(const m of MARKS){const [a,b]=P(m);boxes.push({x:a-6,y:b-6,w:12,h:12})}
  for(const v of inView){const [a,b]=P(v.l);boxes.push({x:a-6,y:b-6,w:12,h:12})}
  for(const a of AP){const [ax,ay]=P(a);if(ax>-10&&ay>-10&&ax<W+10&&ay<H+10)boxes.push({x:ax-3,y:ay-3,w:6,h:6})}
  const label=(txt,px,py,font,color)=>{x.font=font;const w=x.measureText(txt).width,h=12;
    for(const [dx,dy] of [[9,-7],[9,15],[-w-9,-7],[-w-9,15],[-w/2,-11],[-w/2,23]]){const r={x:px+dx,y:py+dy-h+2,w,h};if(r.x<2||r.y<2||r.x+r.w>W-2||r.y+r.h>H-2||hit(r))continue;boxes.push(r);x.fillStyle=color;x.fillText(txt,r.x,py+dy);return true}return false};
  const dot=(px,py,r,c)=>{x.fillStyle=c;x.beginPath();x.arc(px,py,r,0,7);x.fill()};
  for(const a of [fr,to]){if(!a)continue;const [ax,ay]=P(a);if(glow){x.save();x.shadowColor=col("--mag");x.shadowBlur=10;dot(ax,ay,5,col("--mag"));x.restore()}else dot(ax,ay,5,col("--mag"))}
  for(const a of [fr,to]){if(!a)continue;const [ax,ay]=P(a);label(a.c,ax,ay,"700 13px \"B612 Mono\",monospace",col("--mag"))}
  for(const m of MARKS){const [mx_,my_]=P(m);if(mx_<0||my_<0||mx_>W||my_>H)continue;x.strokeStyle=col("--warn");x.lineWidth=2.5;x.beginPath();x.moveTo(mx_-6,my_-6);x.lineTo(mx_+6,my_+6);x.moveTo(mx_+6,my_-6);x.lineTo(mx_-6,my_+6);x.stroke();label("MK"+m.n,mx_,my_,"700 11px \"B612 Mono\",monospace",col("--warn"))}
  for(const v of inView){const [lx,ly]=P(v.l);if(lx<0||ly<0||lx>W||ly>H)continue;x.strokeStyle=col("--ok");x.lineWidth=2;x.beginPath();x.moveTo(lx,ly-5);x.lineTo(lx+5,ly);x.lineTo(lx,ly+5);x.lineTo(lx-5,ly);x.closePath();x.stroke();label(v.l.n.split(/[,(]/)[0].trim(),lx,ly,"11px \"B612 Mono\",monospace",col("--ok"))}
  for(const a of AP){if((fr&&a.c===fr.c)||(to&&a.c===to.c))continue;const [ax,ay]=P(a);if(ax<-10||ay<-10||ax>W+10||ay>H+10)continue;dot(ax,ay,2.6,col("--dim"));label(a.c,ax,ay,"11px \"B612 Mono\",monospace",col("--dim"))}
  if(RWY&&sc>40&&sc<2500){for(const a of RWY){const c=a[0]||a[1];if(apBy(c))continue;const [ax,ay]=P({lat:a[2],lon:a[3]});if(ax<-10||ay<-10||ax>W+10||ay>H+10)continue;if(!rwyDrawn.has(c))dot(ax,ay,2.2,col("--dim"));label(c,ax,ay,"11px \"B612 Mono\",monospace",col("--dim"))}}
  /* scale bar when zoomed */
  if(ZM.mode!=="fit"){const mpp=111320/sc,want=W*0.22*mpp,u=S.dst==="nm"?NMm:1000,uv=want/u,nice=[0.5,1,2,5,10,20,50,100,200,500,1000].reduce((b,v)=>v<=uv?v:b,0.5),px=nice*u/mpp;
    x.save();x.strokeStyle=col("--ink");x.fillStyle=col("--ink");x.lineWidth=2;x.beginPath();x.moveTo(10,H-12);x.lineTo(10+px,H-12);x.moveTo(10,H-17);x.lineTo(10,H-7);x.moveTo(10+px,H-17);x.lineTo(10+px,H-7);x.stroke();
    x.font="11px \"B612 Mono\",monospace";x.fillText(nice+(S.dst==="nm"?" NM":" KM"),14+px,H-8);x.restore()}
  /* aircraft sprite */
  if(last){const [px,py]=P(last);x.save();x.translate(px,py);x.rotate(rad(last.trk||0));
    if(planeImg.complete&&planeImg.naturalWidth){if(glow){x.shadowColor="rgba(0,0,0,.8)";x.shadowBlur=6}x.drawImage(planeImg,-17,-17,34,34)}
    else{x.fillStyle=col("--ink");x.strokeStyle=col("--bg");x.lineWidth=2;x.beginPath();x.moveTo(0,-12);x.lineTo(8,9);x.lineTo(0,5);x.lineTo(-8,9);x.closePath();x.stroke();x.fill()}x.restore()}
  try{tkMapDraw(x,P,sc,W,H,col,glow)}catch(e){}
  if(twyOn){x.save();x.font="10px \"B612 Mono\",monospace";x.textAlign="right";x.fillStyle="rgba(0,0,0,.6)";const aw=x.measureText("© OpenStreetMap contributors").width;x.fillRect(W-aw-10,H-17,aw+8,14);x.fillStyle=col("--dim");x.fillText("© OpenStreetMap contributors",W-6,H-6);x.restore()}
  if(!fr&&!to&&!last&&!tkOn()){x.fillStyle=col("--dim");x.font="14px \"B612 Mono\",monospace";x.textAlign="center";x.fillText("Pick a route to plot it",W/2,H-14);x.textAlign="start"}
}
new ResizeObserver(drawMap).observe($("mapFig"));

/* ---------- vertical profile ---------- */
function plan(tot){
  const seen=prof.reduce((m,q)=>Math.max(m,q.a),0);
  let cr=Math.max(Math.min(11300,tot/30),seen>4500?seen:0);
  let c=cr*FT/1000*2.6*NMm,d=cr*FT/1000*3*NMm;
  if(c+d>tot){const k=tot/(c+d);c*=k;d*=k;cr*=k}
  return {cr,c,d,tot};
}
function profDraw(cv,small){
  const W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;const dpr=window.devicePixelRatio||1;
  if(cv.width!==W*dpr||cv.height!==H*dpr){cv.width=W*dpr;cv.height=H*dpr}
  const x=cv.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,W,H);
  const css=getComputedStyle(document.body),col=k=>css.getPropertyValue(k).trim();
  const fr=apBy(S.from),to=apBy(S.to);if(!fr||!to||fr.c===to.c)return;
  const tot=dist(fr,to),pl=plan(tot);
  const top=Math.max(pl.cr,...prof.map(q=>q.a))*1.12||10000;
  const L0=small?2:54,R0=small?8:12,T0=small?3:12,B0=small?3:24;
  const X=f=>L0+f*(W-L0-R0),Y=a=>H-B0-Math.max(0,a)/top*(H-T0-B0);
  if(!small){x.strokeStyle=col("--line");x.lineWidth=1;x.fillStyle=col("--dim");x.font="11px \"B612 Mono\",monospace";x.textAlign="right";
    const stepFt=top*FT>30000?10000:5000;for(let ft=0;ft<=top*FT;ft+=stepFt){const y=Y(ft/FT);x.beginPath();x.moveTo(L0,y);x.lineTo(W-R0,y);x.stroke();x.fillText(ft?(ft/1000)+"k ft":"0",L0-6,y+4)}
    x.textAlign="left";x.fillText(fr.c,L0,H-6);x.textAlign="right";x.fillText(to.c,W-R0,H-6);x.textAlign="center";x.fillText(Math.round(fDst(tot)).toLocaleString()+" "+S.dst,(L0+W-R0)/2,H-6);x.textAlign="start"}
  else{x.strokeStyle=col("--line");x.lineWidth=2;x.beginPath();x.moveTo(X(0),Y(0));x.lineTo(X(1),Y(0));x.stroke()}
  {const tk=fr.c+to.c;if(!window.__terr||window.__terr.k!==tk){const arr=[];for(let i=0;i<=160;i++){const q=gcPoint(fr,to,i/160);arr.push(elevAt(q.lat,q.lon))}window.__terr={k:tk,arr}}
   const arr=window.__terr.arr;x.beginPath();x.moveTo(X(0),Y(0));arr.forEach((e,i)=>x.lineTo(X(i/160),Y(e)));x.lineTo(X(1),Y(0));x.closePath();x.fillStyle=col("--land");x.fill();x.strokeStyle=col("--coast");x.lineWidth=small?1:1.5;x.stroke();
   if(!small){const mx=Math.max(...arr);if(mx>150){const i=arr.indexOf(mx);x.fillStyle=col("--dim");x.font="11px \"B612 Mono\",monospace";x.textAlign="center";x.fillText("TERRAIN "+Math.round(mx*FT/100)*100+" FT",Math.max(60,Math.min(W-60,X(i/160))),Y(mx)-6);x.textAlign="start"}}}
  const pts=[[0,0],[pl.c/tot,pl.cr],[1-pl.d/tot,pl.cr],[1,0]];
  x.strokeStyle=col("--dim");x.lineWidth=small?1:1.5;x.setLineDash(small?[3,3]:[6,5]);x.beginPath();pts.forEach((q,i)=>{i?x.lineTo(X(q[0]),Y(q[1])):x.moveTo(X(q[0]),Y(q[1]))});x.stroke();x.setLineDash([]);
  if(!small){const tx=X(1-pl.d/tot),ty=Y(pl.cr);x.fillStyle=col("--dim");x.beginPath();x.arc(tx,ty,3.5,0,7);x.fill();x.font="600 11px \"B612 Mono\",monospace";x.textAlign="center";x.fillText("Top of descent",Math.max(50,Math.min(W-50,tx)),ty-8);x.textAlign="start"}
  try{turbDraw(x,X,Y,tot,small,W,H,T0,col)}catch(e){}
  if(prof.length>1){const ps=prof.slice().sort((a,b)=>a.f-b.f);
    x.beginPath();x.moveTo(X(ps[0].f),Y(0));ps.forEach(q=>x.lineTo(X(q.f),Y(q.a)));x.lineTo(X(ps[ps.length-1].f),Y(0));x.closePath();x.globalAlpha=.22;x.fillStyle=col("--mag");x.fill();x.globalAlpha=1;
    x.strokeStyle=col("--mag");x.lineWidth=small?2:2.5;x.beginPath();ps.forEach((q,i)=>{i?x.lineTo(X(q.f),Y(q.a)):x.moveTo(X(q.f),Y(q.a))});x.stroke()}
  if(last){const f=Math.max(0,Math.min(1,1-dist(last,to)/tot)),px=X(f),py=Y(last.alt||0),k=small?1:1.4;
    x.fillStyle=col("--ink");x.strokeStyle=col("--bg");x.lineWidth=2;x.beginPath();x.moveTo(px+7*k,py);x.lineTo(px-5*k,py-5*k);x.lineTo(px-2*k,py);x.lineTo(px-5*k,py+5*k);x.closePath();x.stroke();x.fill()}
}
function profAll(){profDraw($("prof"),false);profDraw($("sProf"),true);try{turbSummary()}catch(e){}
  const fr=apBy(S.from),to=apBy(S.to);
  if(fr&&to&&fr.c!==to.c&&last){const tot=dist(fr,to),pl=plan(tot),dtg=dist(last,to),toTod=dtg-pl.d;
    $("profTxt").textContent=toTod>2000?`Top of descent in about ${Math.round(fDst(toTod)).toLocaleString()} ${S.dst}`+(last.spd>25?` (${hm(toTod/last.spd)})`:"")+`. Estimated from the 3-to-1 rule, so the crew's actual point will differ.`:dtg>2000?"Descending into "+to.n+".":"Arrived "+to.n+"."}}
new ResizeObserver(profAll).observe($("profFig"));new ResizeObserver(profAll).observe($("strip"));


/* ---------- GPS control ---------- */
function startGPS(){
  try{unlockAudio()}catch(e){}
  if(!("geolocation" in navigator)){$("stat").textContent="No location support";return}
  stopDemo();
  if(watchId!=null){navigator.geolocation.clearWatch(watchId);watchId=null;hist=[];vsClear();hfGps=false;$("gpsBtn").textContent="Start GPS";$("gpsBtn").classList.remove("on");$("stat").textContent="GPS off";$("dot").className="dot";return}
  if(PH.demo){PH.p="parked";PH.ev={};PH.bookId=null;PH.ended=false;PH.rt=null;PH.said={};PH.lm=[];PH.demo=false;savePH();LOG={on:false,pts:[]};store.set("log",LOG);trail=[];prof=[];hist=[];trkH=[];last=null;evRender();render()}
  gfReset();watchId=navigator.geolocation.watchPosition(onPos,onErr,GPSO);
  $("gpsBtn").textContent="Stop GPS";$("gpsBtn").classList.add("on");$("stat").textContent="Searching… sit near a window";$("dot").className="dot warn";
}
$("gpsBtn").onclick=startGPS;

/* ---------- wake lock ---------- */
async function getWake(){try{if("wakeLock" in navigator){wake=await navigator.wakeLock.request("screen");wake.addEventListener("release",()=>{if(!wantWake)$("wakeBtn").classList.remove("on")});$("wakeBtn").classList.add("on");$("wakeBtn").textContent="Screen stays on"}else{$("wakeBtn").textContent="Not supported — set Auto-Lock to Never"}}catch(e){$("wakeBtn").textContent="Couldn't lock — try again"}}
$("wakeBtn").onclick=async()=>{if(wantWake){wantWake=false;try{wake&&await wake.release()}catch(e){}wake=null;$("wakeBtn").classList.remove("on");$("wakeBtn").textContent="Keep screen on"}else{wantWake=true;getWake()}};
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&wantWake)getWake()});
/* v18: iOS pauses GPS when you switch apps. On return, restart the watch at once, ask for a fresh fix and show "Resuming GPS"
   (not Signal lost / Master Caution) until it arrives. Position, ETA and progress are estimated from the last groundspeed and track meanwhile. */
let resumeAt=0;const GPSO={enableHighAccuracy:true,maximumAge:5000,timeout:60000};
function resuming(){return !!resumeAt&&lastFixAt<resumeAt&&Date.now()-resumeAt<120000}
function gpsResume(){try{staleCheck()}catch(e){}if(watchId==null||demo||REPLAY)return;resumeAt=Date.now();
  try{navigator.geolocation.clearWatch(watchId)}catch(e){}gfReset();watchId=navigator.geolocation.watchPosition(onPos,onErr,GPSO);
  try{navigator.geolocation.getCurrentPosition(onPos,()=>{},{enableHighAccuracy:true,maximumAge:0,timeout:30000})}catch(e){}
  mc.poorSince=0;if(mc.on){mc.on=false;$("mcBtn").style.display="none";$("mcBtn").classList.remove("ack")}
  $("stat").textContent="Resuming GPS…";$("dot").className="dot warn";if(wantWake)getWake();try{render()}catch(e){}}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")gpsResume()});
window.addEventListener("pageshow",e=>{if(e.persisted)gpsResume()});

/* ---------- voice / hands-free ---------- */
function setVoice(on){voiceOn=on;$("voiceBtn").textContent=on?"Voice on":"Voice off";$("voiceBtn").classList.toggle("on",on);if(on){pickVoice();try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("Voice callouts on.");if(auVoice)u.voice=auVoice;speechSynthesis.speak(u)}catch(e){}}}
$("voiceBtn").onclick=()=>setVoice(!voiceOn);
let hfOn=false,hfGps=false,hfMine={};
function hfUI(){$("hfBtn").classList.toggle("on",hfOn);$("hfBtn").textContent=hfOn?"Hands-free on":"Hands-free"}
function hfSet(on){
  if(on){unlockAudio();hfMine={voice:!voiceOn,g:!gOn,wake:!wantWake,vox:S.vox==="off"?"off":""};
    if(S.vox==="off"){S.vox="system";applySeg()}
    if(!voiceOn)setVoice(true);if(!gOn)$("gBtn").click();if(!wantWake)$("wakeBtn").click();
    if(watchId==null&&!demo&&!REPLAY){startGPS();hfGps=true}}
  else{if(hfMine.voice&&voiceOn)setVoice(false);if(hfMine.g&&gOn)$("gBtn").click();if(hfMine.wake&&wantWake)$("wakeBtn").click();
    if(hfGps&&watchId!=null)startGPS();if(hfMine.vox){S.vox=hfMine.vox;applySeg()}hfGps=false;hfMine={}}
  hfOn=on;S.hf=on?"on":"off";saveS();hfUI();
}
$("hfBtn").onclick=()=>hfSet(!hfOn);
/* v24: after a reload hands-free was shown as on but nothing was running, and tapping the button then switched it off.
   Now it stays off until the first tap anywhere (iOS needs a tap for sound and motion), which switches it all back on. */
if(S.hf==="on"){$("hfBtn").textContent="Hands-free · tap to resume";
  document.addEventListener("click",e=>{if(hfOn||(e.target.closest&&e.target.closest("#hfBtn")))return;hfSet(true)},{once:true,capture:true})}
window.cpHF=()=>({on:hfOn,voice:voiceOn,vox:S.vox,motion:gOn,wake:wantWake,gps:watchId!=null,saved:S.hf});

/* ---------- demo flight ---------- */
function stopDemo(){if(demo){clearInterval(demo.iv);demo=null;$("demoTag").style.display="none";$("demoBtn").classList.remove("on");$("demoBtn").textContent="Demo flight"}}
$("demoBtn").onclick=()=>{
  if(demo){stopDemo();return}
  if(watchId!=null)startGPS();
  if(!S.from||!S.to||S.from===S.to){S.from="SYD";S.to="MEL";$("from").value="SYD";$("to").value="MEL";saveS()}
  const fr=apBy(S.from),to=apBy(S.to),tot=dist(fr,to);
  trail=[];hist=[];last=null;prof=[];trkH=[];sunCache={t:0,v:null};
  PH.p="parked";PH.holds={};PH.st=null;PH.ev={};PH.bookId=null;PH.ended=false;PH.rt=null;PH.demo=true;evRender();
  demo={t:Date.now(),s:0,alt:5,vs:0,gs:0,stg:"park",st:0,iv:0};
  $("demoTag").style.display="inline-block";$("demoBtn").classList.add("on");$("demoBtn").textContent="Stop demo";
  demo.iv=setInterval(()=>{
    const dt=4;demo.t+=dt*1000;demo.st+=dt;
    const rem=tot-demo.s,cruise=Math.min(11300,tot/30);
    switch(demo.stg){
      case "park":demo.gs=0;if(demo.st>8){demo.stg="taxi";demo.st=0}break;
      case "taxi":demo.gs=8;if(demo.st>40){demo.stg="roll";demo.st=0}break;
      case "roll":demo.gs=Math.min(82,demo.gs+2.4*dt);demo.vs=0;if(demo.gs>=80){demo.stg="air";demo.st=0}break;
      case "air":
        if(rem<demo.alt/8.5*190+15000){demo.gs=Math.max(75,demo.gs-1.2);demo.vs=-Math.max(3,Math.min(12,demo.alt/Math.max(1,(rem-1500)/demo.gs)))}
        else if(demo.alt<cruise){demo.vs=demo.alt<3000?10:7.5;demo.gs=Math.min(240,demo.gs+3)}
        else{demo.vs=0;demo.gs=Math.min(245,demo.gs+0.5)}
        demo.alt=Math.max(5,Math.min(cruise,demo.alt+demo.vs*dt));
        if(demo.vs<0&&demo.alt<=12){demo.alt=5;demo.vs=0;demo.stg="rollout";demo.st=0;gBuf.push({t:Date.now(),g:1.34})}break;
      case "rollout":demo.gs=Math.max(8,demo.gs-2.2*dt);if(demo.gs<=8){demo.stg="taxiin";demo.st=0}break;
      case "taxiin":demo.gs=demo.st>30?0:8;if(demo.st>110){stopDemo();return}break;
    }
    demo.s=Math.min(tot,demo.s+demo.gs*dt);
    const f=demo.s/tot,p=gcPoint(fr,to,Math.min(f,0.9999)),q=gcPoint(fr,to,Math.min(1,f+0.001));
    const hd=(brg(p,q)+(demo.stg==="air"&&demo.vs>0&&demo.alt>600&&demo.alt<cruise-200?28*Math.sin(demo.s/9000):0)+360)%360;
    onPos({timestamp:demo.t,coords:{latitude:p.lat,longitude:p.lon,altitude:demo.alt+(demo.stg==="air"?(Math.random()-.5)*6:0),accuracy:5,speed:demo.gs,heading:demo.gs>1?hd:null}});
    lastFixAt=Date.now();
  },200);
};

/* ---------- G-meter ---------- */
function onMotion(e){const a=e.accelerationIncludingGravity;if(!a||a.x==null)return;const g=Math.hypot(a.x,a.y,a.z)/9.80665;gS=gS==null?g:gS*0.85+g*0.15;gMin=gMin==null?gS:Math.min(gMin,gS);const nw=Date.now();gBuf.push({t:nw,g:gS});while(gBuf.length&&nw-gBuf[0].t>30000)gBuf.shift();gMax=gMax==null?gS:Math.max(gMax,gS)}
setInterval(()=>{if(!gOn||gS==null)return;setVal("g",gS.toFixed(2),"G");$("gmm").textContent="Min "+gMin.toFixed(2)+" · Max "+gMax.toFixed(2)},250);
$("gBtn").onclick=async()=>{
  if(gOn){window.removeEventListener("devicemotion",onMotion);gOn=false;$("gBtn").textContent="Enable";$("gBtn").classList.remove("on");return}
  try{if(typeof DeviceMotionEvent!=="undefined"&&typeof DeviceMotionEvent.requestPermission==="function"){const r=await DeviceMotionEvent.requestPermission();if(r!=="granted"){$("gmm").textContent="Motion access denied";return}}
  window.addEventListener("devicemotion",onMotion);gOn=true;$("gBtn").textContent="Disable";$("gBtn").classList.add("on")}catch(e){$("gmm").textContent="Motion sensor unavailable"}
};
$("gReset").onclick=()=>{gMin=gMax=gS};

/* ---------- log ---------- */
function logInfo(){
  const n=LOG.pts.length;
  if(!n){$("logTxt").textContent=LOG.on?"Recording… waiting for a fix":"Not recording";$("maxTxt").textContent="";}
  else{const d=(LOG.pts[n-1][3]-LOG.pts[0][3])/1000;let ma=-1e9,ms=0,dd=0;for(let i=0;i<n;i++){const p=LOG.pts[i];if(p[2]!=null)ma=Math.max(ma,p[2]);if(p[4]!=null)ms=Math.max(ms,p[4]);if(i)dd+=dist({lat:LOG.pts[i-1][0],lon:LOG.pts[i-1][1]},{lat:p[0],lon:p[1]})}
  $("logTxt").textContent=(LOG.on?"Recording · ":"Stopped · ")+n.toLocaleString()+" points · "+hm(d);
  $("maxTxt").textContent="Max "+Math.round(fSpd(ms))+" "+(S.spd==="kmh"?"km/h":S.spd)+" · max "+(ma>-1e9?Math.round(fAlt(ma)).toLocaleString()+" "+S.alt:"—")+" · flown "+Math.round(fDst(dd)).toLocaleString()+" "+S.dst}
  $("logBtn").textContent=LOG.on?"Stop":"Record";$("logBtn").classList.toggle("on",LOG.on);
}
$("logBtn").onclick=()=>{LOG.on=!LOG.on;store.set("log",LOG);logInfo()};
$("clrBtn").onclick=()=>{if($("clrBtn").dataset.arm){LOG={on:false,pts:[]};store.set("log",LOG);MARKS=[];store.set("marks",MARKS);markRender();delete $("clrBtn").dataset.arm;$("clrBtn").textContent="Clear";logInfo()}else{$("clrBtn").dataset.arm=1;$("clrBtn").textContent="Tap again to clear";setTimeout(()=>{delete $("clrBtn").dataset.arm;$("clrBtn").textContent="Clear"},3000)}};
function gpxOf(pts,marks,name){const esc=t=>String(t||"").replace(/[<>&"]/g,"");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Cabin Panel" xmlns="http://www.topografix.com/GPX/1/1">\n'+(marks||[]).map(m=>`<wpt lat="${m.lat}" lon="${m.lon}">${m.alt!=null?"<ele>"+Math.round(m.alt)+"</ele>":""}<time>${new Date(m.t).toISOString()}</time><name>MK${m.n}</name><desc>${esc(m.note)}</desc></wpt>`).join("\n")+
  `\n<trk><name>${esc(name)}</name><trkseg>\n`+pts.map(p=>`<trkpt lat="${p[0]}" lon="${p[1]}">${p[2]!=null?"<ele>"+p[2]+"</ele>":""}<time>${new Date(p[3]).toISOString()}</time></trkpt>`).join("\n")+"\n</trkseg></trk></gpx>"}
async function shareOrDownload(name,mime,text,msgEl){
  const done=t=>{if(msgEl)msgEl.textContent=t};
  try{const f=new File([text],name,{type:mime});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});done("Shared "+name);return}}catch(e){if(e&&e.name==="AbortError")return}
  try{const u=URL.createObjectURL(new Blob([text],{type:mime}));const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),8000);done("Saved "+name+" to Downloads")}
  catch(e){done("Export isn't available here. Use the installed app.")}
}
$("gpxBtn").onclick=()=>{
  if(!LOG.pts.length){$("logTxt").textContent="Nothing recorded yet";return}
  storeFlush();const name=(S.flt?S.flt+"-":"")+(S.from||"XXX")+"-"+(S.to||"XXX")+"-"+new Date(LOG.pts[0][3]).toISOString().slice(0,10);
  shareOrDownload(name+".gpx","application/gpx+xml",gpxOf(LOG.pts,MARKS,name),$("logTxt"));
};


/* ================= v18: pick up current flight ================= */
function phSnap(){return {bookId:PH.bookId,ended:PH.ended,rt:PH.rt,sts:PH.sts,demo:PH.demo,p:PH.p,alt0:PH.alt0,ev:PH.ev,said:PH.said,lm:PH.lm,lastLm:PH.lastLm,st:PH.st}}
function inferPhase(pts){/* for files without saved phase: rebuild key times and the phase from the track */
  const ev={},a0=pts.find(p=>p[2]!=null),alt0=a0?a0[2]:0;let maxA=-1e9;
  for(const p of pts){if(!ev.off&&p[4]!=null&&p[4]>3)ev.off=p[3];if(!ev.up&&p[4]!=null&&p[4]>50&&p[2]!=null&&p[2]>alt0+60)ev.up=p[3];if(p[2]!=null)maxA=Math.max(maxA,p[2])}
  if(ev.up){const tc=pts.find(p=>p[3]>=ev.up&&p[2]!=null&&p[2]>=maxA-150);if(tc&&maxA>alt0+3000){ev.toc=tc[3];ev.cr=tc[2]}}
  const l=pts[pts.length-1],back=pts.filter(p=>p[3]>=l[3]-120000&&p[2]!=null);let vs=0;if(back.length>1){const f=back[0],g=back[back.length-1];vs=(g[2]-f[2])/Math.max(1,(g[3]-f[3])/1000)*FT*60}
  let p="parked";const sp=l[4]||0,al=l[2]||0;
  if(sp>50&&al>alt0+300)p=vs>500?"climb":vs<-500?"descent":(al>alt0+3000?"cruise":"climb");else if(sp>3)p="taxi";
  return {p,ev,alt0,said:{},lm:[],sts:[],st:null}}
function pickCands(){const c=[];const ph=store.get("phase",{});
  if(LOG.pts&&LOG.pts.length>=2)c.push({src:"phone",label:"Saved on this phone",from:S.from,to:S.to,flt:S.flt,fltName:S.fltName,pts:LOG.pts,marks:null,ph:ph&&ph.p&&!ph.demo?ph:null,demo:!!(ph&&ph.demo)});
  return c.concat(window.__pickFile||[])}
function pickRender(){const cs=pickCands();const f=t=>t?new Date(t).toTimeString().slice(0,5):"—";
  $("pickList").innerHTML=cs.length?cs.map((c,i)=>{const l=c.pts[c.pts.length-1],ph=c.ph||inferPhase(c.pts),ago=Math.round((Date.now()-l[3])/60000);
    return `<li><div class="pkG"><b>${esc(c.flt?c.flt+" ":"")}${esc(c.from||"?")} → ${esc(c.to||"?")}${c.demo?" (demo)":""}</b><span>${esc(c.label)} · ${esc(PHN[ph.p]||ph.p)} · off blocks ${f(ph.ev&&ph.ev.off)} · wheels up ${f(ph.ev&&ph.ev.up)} · last point ${f(l[3])} (${ago<1?"just now":hm(ago*60)+" ago"}) · ${c.pts.length.toLocaleString()} points</span></div><button class="pri" data-i="${i}">Pick up</button></li>`}).join("")
    :'<li><span>No flight saved on this phone. Use "From exported file…" if you exported one.</span></li>'}
function pickUp(c){
  if(demo)stopDemo();if(REPLAY)replayStop();
  if(c.from&&apBy(c.from))S.from=c.from;if(c.to&&apBy(c.to))S.to=c.to;if(c.flt!=null){S.flt=c.flt;S.fltName=c.fltName||S.fltName||""}saveS();$("from").value=S.from;$("to").value=S.to;if(S.flt)$("fltIn").value=S.flt;
  const pts=c.pts.slice().sort((a,b)=>a[3]-b[3]);LOG={on:true,pts};store.set("log",LOG);
  if(c.marks&&c.marks.length){const mk=m=>m.t+"|"+(+m.lat).toFixed(5)+"|"+(+m.lon).toFixed(5),hs=new Set(MARKS.map(mk));for(const m of c.marks)if(!hs.has(mk(m))){MARKS.push(m);hs.add(mk(m))}MARKS.sort((a,b)=>a.t-b.t);store.set("marks",MARKS)}
  const ph=c.ph||inferPhase(pts);
  PH=Object.assign(PH,{p:ph.p||"cruise",ev:Object.assign({},ph.ev||{}),alt0:ph.alt0!=null?ph.alt0:PH.alt0,said:ph.said||{},lm:ph.lm||[],lastLm:ph.lastLm||0,sts:ph.sts||[],st:ph.st||null,demo:false,holds:{},bookId:ph.bookId||null,ended:false,rt:ph.rt||null});savePH();
  rebuildFromLog();
  if(watchId==null)startGPS();resumeAt=Date.now();
  $("phase").textContent=PHN[PH.p];{const fp=$("fhPhase");if(fp)fp.textContent=PHN[PH.p]}
  $("pickTile").style.display="none";$("resumeNote").style.display="none";
  evRender();markRender();logInfo();render();drawMap();profAll();pickScene();hudKey="";
  say("Picked up "+(S.flt?S.flt+" ":"")+(S.from&&S.to?S.from+" to "+S.to+" ":"")+"at "+PHN[PH.p].toLowerCase()+". Carrying on.")}
/* rebuild the map trail, flown profile and last known position from the saved track (v17 didn't save these) */
function rebuildFromLog(){const pts=LOG.pts;if(!pts||!pts.length)return;trail=[];prof=[];
  const fr=apBy(S.from),to=apBy(S.to),tot=fr&&to&&fr.c!==to.c?dist(fr,to):0;
  for(const p of pts){const q={lat:p[0],lon:p[1]};const lt=trail[trail.length-1];if(!lt||dist(lt,q)>80)trail.push(q);
    if(tot&&p[2]!=null){const f=Math.max(0,Math.min(1,1-dist(q,to)/tot)),lp=prof[prof.length-1];if(!lp||Math.abs(f-lp.f)>0.002||Math.abs(p[2]-lp.a)>40)prof.push({f,a:p[2]})}}
  if(trail.length>6000)trail=trail.slice(-6000);if(prof.length>4000)prof=prof.slice(-4000);
  if(!last){const l=pts[pts.length-1],k=pts[Math.max(0,pts.length-6)];const trk=dist({lat:k[0],lon:k[1]},{lat:l[0],lon:l[1]})>200?brg({lat:k[0],lon:k[1]},{lat:l[0],lon:l[1]}):null;
    last={lat:l[0],lon:l[1],alt:l[2],acc:null,altAcc:null,spd:l[4],trk,t:l[3]}}}
$("pickBtn").onclick=()=>{const t=$("pickTile");if(t.style.display!=="none"){t.style.display="none";return}pickRender();t.style.display="";t.scrollIntoView({block:"start",behavior:"smooth"})};
$("pickClose").onclick=()=>{$("pickTile").style.display="none"};
$("pickList").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const c=pickCands()[+b.dataset.i];if(c)pickUp(c)});
$("pickFileBtn").onclick=()=>$("pickFile").click();
$("pickFile").onchange=async e=>{const f=e.target.files&&e.target.files[0];e.target.value="";if(!f)return;
  try{const j=JSON.parse(await f.text());if(!j||j.app!=="cabin-panel")throw new Error("not a Cabin Panel file");const pts=cleanPts(j.log&&j.log.pts);if(pts.length<2)throw new Error("it has no track log");
    const st=j.settings||{},ph=j.phase&&typeof j.phase==="object"&&PHN[j.phase.p]&&!j.phase.demo?{p:j.phase.p,ev:cleanEv(j.phase.ev),alt0:num(j.phase.alt0),said:{},lm:[],sts:(Array.isArray(j.phase.sts)?j.phase.sts:[]).filter(x=>STN[x])}:null;
    for(const x0 of (Array.isArray(j.xap)?j.xap:[])){const x=cleanAp(x0);if(x&&!apBy(x.c)){AP.push(x);XAP.push(x);addApOption(x)}}store.set("xap",XAP);
    window.__pickFile=[{src:"file",label:"From "+String(f.name).slice(0,40),from:code(st.from).slice(0,5),to:code(st.to).slice(0,5),flt:code(st.flt).slice(0,9),fltName:String(st.fltName||"").replace(/[<>&"]/g,"").slice(0,30),pts,marks:(Array.isArray(j.marks)?j.marks:[]).map(cleanMark).filter(Boolean),ph}];
    $("pickTxt").textContent="Loaded "+f.name+". Tap Pick up on it.";pickRender()}catch(err){$("pickTxt").textContent="Couldn't read that file: "+err.message+"."}};
/* on start-up, a flight that was in progress is already restored (phase, times, track); rebuild the map trail and say so */
if(LOG.on&&LOG.pts&&LOG.pts.length>=2&&!PH.demo&&PH.p!=="parked"){try{rebuildFromLog()}catch(e){}
  $("resumeNote").textContent="Flight in progress restored ("+PHN[PH.p]+(S.from&&S.to?", "+S.from+" → "+S.to:"")+"). Tap Pick up current flight to confirm and continue.";$("resumeNote").style.display="";$("pickBtn").classList.add("pri")}
try{endBtnUpd();staleCheck()}catch(e){}

/* ---------- settings ---------- */
function applySeg(){document.querySelectorAll(".seg").forEach(s=>{s.querySelectorAll("button").forEach(b=>b.classList.toggle("sel",String(S[s.dataset.k])===b.dataset.v))});document.body.classList.toggle("m-night",S.disp==="night");document.body.classList.toggle("tex",S.tex==="on");document.body.classList.toggle("m-nvg",S.disp==="nvg");{const hs=$("hudSym");if(hs)hs.setAttribute("filter",(S.disp==="nvg"||reduceMo)?"url(#sh)":"url(#glow)");}{const bd=$("bgDim");if(bd){for(const bi of [$("bgA"),$("bgB"),$("wxDrops")]){if(S.disp==="nvg")bi.setAttribute("filter","url(#nvgF)");else bi.removeAttribute("filter")}bd.setAttribute("opacity",S.disp==="day"?".34":S.disp==="night"?".62":".6")}}$("lvlBtn").style.display=S.att==="sen"?"":"none";}
document.querySelectorAll(".seg").forEach(s=>s.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;S[s.dataset.k]=b.dataset.v;saveS();applySeg();if(s.dataset.k==="seat")try{windowInfo()}catch(_){}render();drawMap();profAll();if(s.dataset.k==="scn"||s.dataset.k==="wxs")pickScene();if(s.dataset.k==="att"){if(S.att==="sen")senStart();else senStop()}}));
let framed=false;try{framed=window.self!==window.top}catch(e){framed=true}
if(framed){$("stat").textContent="Preview: GPS is blocked here. Tap Demo flight";$("dot").className="dot warn"}
if(S.att==="sen"){S.att="gps";$("bank").textContent="Tap Gyro"}
applySeg();render();evRender();pickScene();markRender();bookRender();

/* ---------- offline ---------- */
/* ---------- offline caching: only claim "saved" after checking the cache ---------- */
function swStatus(reg){return new Promise((res,rej)=>{const w=reg.active||navigator.serviceWorker.controller;if(!w)return rej(new Error("no worker"));const ch=new MessageChannel();const t=setTimeout(()=>rej(new Error("timeout")),8000);ch.port1.onmessage=e=>{clearTimeout(t);res(e.data)};w.postMessage({type:"status"},[ch.port2])})}
async function checkOffline(){
  try{
    const reg=await Promise.race([navigator.serviceWorker.ready,new Promise((_,r)=>setTimeout(()=>r(new Error("timeout")),15000))]);
    const st=await swStatus(reg);
    if(st.miss&&st.miss.length===0){$("offTxt").textContent="✓ Saved for offline use ("+st.C.replace("cabin-panel-","")+", "+st.total+" files checked). Opens without internet from the Home Screen icon."}
    else $("offTxt").textContent="Offline caching incomplete: "+st.miss.length+" of "+st.total+" files missing. Open again with internet and wait a few seconds.";
  }catch(e){$("offTxt").textContent="Offline caching unavailable here. Keep this tab open before you lose signal."}
}
const standalone=window.navigator.standalone||matchMedia("(display-mode: standalone)").matches;
if("serviceWorker" in navigator&&window.isSecureContext){
  const hadCtl=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.register("sw.js").then(checkOffline).catch(()=>{$("offTxt").textContent="Offline caching unavailable here. Keep this tab open before you lose signal."});
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(hadCtl){$("updBtn").style.display="";}setTimeout(checkOffline,500)});
}
else{$("offTxt").textContent=window.isSecureContext?"Offline caching not supported in this browser.":"Open from an https address to enable offline mode."}
$("updBtn").onclick=()=>{try{storeFlush()}catch(e){}location.reload()};
if(standalone&&navigator.permissions&&navigator.permissions.query){navigator.permissions.query({name:"geolocation"}).then(r=>{if(r.state==="granted"&&watchId==null&&!demo&&!REPLAY)startGPS()}).catch(()=>{})}
if(!standalone&&/iPhone|iPad/.test(navigator.userAgent)){$("a2hsTip").textContent="Tip: Share → Add to Home Screen.";$("a2hsTip").style.display=""}

/* ================= v22 =================
   Paged screens, OSM taxiways, pre-flight route pack (Open-Meteo weather + rough turbulence guide),
   landmark notes (+ optional Wikipedia places), common routes, AR window view.
   Read-only with respect to the phase machine, logbook and GPS: nothing here writes PH, LOG or BOOK. */
const clamp01=v=>Math.max(0,Math.min(1,v));

/* ---------- paged screens ---------- */
const PG={els:[...document.querySelectorAll("#pages>.page")],i:-1};
{const d=$("pgDots");d.innerHTML=PG.els.map((p,i)=>`<button data-i="${i}" aria-label="${esc(p.dataset.t)} page" title="${esc(p.dataset.t)}"></button>`).join("");
 d.onclick=e=>{const b=e.target.closest("button");if(b){hap(8);pgGo(+b.dataset.i)}}}
function pgSet(i){if(i===PG.i)return;PG.i=i;$("pgTitle").textContent=PG.els[i].dataset.c||PG.els[i].dataset.t;$("pgTitle").title=PG.els[i].dataset.t;
  [...$("pgDots").children].forEach((b,j)=>{b.classList.toggle("on",j===i);if(j===i)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  $("pgPrev").disabled=i===0;$("pgNext").disabled=i===PG.els.length-1;store.set("page",i);
  const id=PG.els[i].id;if(id==="pg-map")try{wxBtn();drawMapCore()}catch(e){}if(id==="pg-prof")try{profAll()}catch(e){}if(id==="pg-win")try{windowInfo()}catch(e){}}
function pgGo(i,instant){i=Math.max(0,Math.min(PG.els.length-1,i|0));const c=$("pages");c.scrollTo({left:i*c.clientWidth,behavior:instant||reduceMo?"auto":"smooth"});pgSet(i)}
window.cpPage=i=>{if(i==null)return {i:PG.i,n:PG.els.length,t:PG.els[PG.i]&&PG.els[PG.i].dataset.t};pgGo(i,true);return PG.i};
$("pgPrev").onclick=()=>pgGo(PG.i-1);$("pgNext").onclick=()=>pgGo(PG.i+1);
{const c=$("pages");let st=0;c.addEventListener("scroll",()=>{clearTimeout(st);st=setTimeout(()=>{const i=Math.round(c.scrollLeft/Math.max(1,c.clientWidth));if(i!==PG.i&&i>=0&&i<PG.els.length)pgSet(i)},60)},{passive:true});
 let lw=0;new ResizeObserver(()=>{if(c.clientWidth!==lw){lw=c.clientWidth;c.scrollLeft=Math.max(0,PG.i)*c.clientWidth}}).observe(c)}
document.addEventListener("keydown",e=>{if(e.defaultPrevented||cmpOn||arOn||fhOn||document.body.classList.contains("sv")||e.altKey||e.ctrlKey||e.metaKey)return;const t=e.target,tn=t&&t.tagName;
  if(tn==="INPUT"||tn==="SELECT"||tn==="TEXTAREA"||(t&&t.isContentEditable))return;
  if(e.key==="ArrowRight"||e.key==="PageDown"&&false){e.preventDefault();pgGo(PG.i+1)}else if(e.key==="ArrowLeft"){e.preventDefault();pgGo(PG.i-1)}});
/* tiles that open in the HUD page (pick up, replay) bring that page into view */
for(const id of ["pickBtn","rpLogBtn"]){const b=$(id);if(b)b.addEventListener("click",()=>setTimeout(()=>{const p=$(id==="pickBtn"?"pickTile":"rpTile");if(p&&p.style.display!=="none"){const pg=p.closest(".page"),i=PG.els.indexOf(pg);if(i>=0&&i!==PG.i)pgGo(i)}},30))}
requestAnimationFrame(()=>{const s=store.get("page",0);pgGo(typeof s==="number"&&s>=0&&s<PG.els.length?s:0,true)});

/* ---------- landmarks: notes + extra visual references (lmk.json, written for Cabin Panel) ---------- */
fetch("lmk.json").then(r=>r.ok?r.json():null).then(j=>{if(!j||!Array.isArray(j.lm))return;const by=new Map(LM.map(l=>[l.n,l]));
  for(const a of j.lm){if(!Array.isArray(a)||a.length<6)continue;const o=by.get(a[0]);if(o){o.kind=a[3];o.r=a[4];o.note=a[5]}else LM.push({n:String(a[0]),lat:+a[1],lon:+a[2],kind:String(a[3]),r:+a[4]||1,note:String(a[5])})}
  try{windowInfo()}catch(e){}}).catch(()=>{});
/* LM plus places added by the current route's pre-flight pack */
function lmAll(){const pk=packGet();return pk&&Array.isArray(pk.lm)&&pk.lm.length?LM.concat(pk.lm):LM}

/* ---------- OSM taxiways / aprons (twy.json, © OpenStreetMap contributors, ODbL) ---------- */
let TWY=null;
fetch("twy.json").then(r=>r.ok?r.json():null).then(j=>{if(!j||!Array.isArray(j.ap))return;
  TWY=j.ap.map(a=>{let la0=90,la1=-90,lo0=180,lo1=-180;const ws=a[3].map(w=>{const p=[];let la=0,lo=0;for(let i=0;i+1<w[2].length;i+=2){la+=w[2][i];lo+=w[2][i+1];const q=[a[1]+la/1e5,a[2]+lo/1e5];p.push(q);if(q[0]<la0)la0=q[0];if(q[0]>la1)la1=q[0];if(q[1]<lo0)lo0=q[1];if(q[1]>lo1)lo1=q[1]}return {t:w[0],ref:w[1],p}});
    return {c:a[0],bb:[la0,la1,lo0,lo1],ws}});try{drawMap()}catch(e){}}).catch(()=>{});
function twyDraw(x,P,sc,k,cx,cy,W,H,nvg,col){
  if(!TWY||sc<250)return false;const vw=W/2/sc/k,vh=H/2/sc,mpp=111320/sc;let any=false;
  const path=w=>{w.p.forEach((q,i)=>{const s=P({lat:q[0],lon:q[1]});i?x.lineTo(s[0],s[1]):x.moveTo(s[0],s[1])})};
  for(const a of TWY){if(a.bb[1]<cy-vh||a.bb[0]>cy+vh||a.bb[3]<cx-vw||a.bb[2]>cx+vw)continue;any=true;x.save();
    for(const w of a.ws){if(w.t===0)continue;x.beginPath();path(w);x.closePath();
      x.fillStyle=w.t===1?(nvg?"#04110a":"#262c31"):(nvg?"#0a2412":"#4f575f");x.globalAlpha=.9;x.fill();x.globalAlpha=1;x.strokeStyle=nvg?col("--line"):"#3d454c";x.lineWidth=1;x.stroke()}
    const tw=Math.max(1.3,23/mpp);x.lineCap="round";x.lineJoin="round";x.beginPath();for(const w of a.ws)if(w.t===0)path(w);
    x.strokeStyle=nvg?col("--dim"):"#68717a";x.globalAlpha=.95;x.lineWidth=tw;x.stroke();
    if(tw>5){x.strokeStyle=nvg?col("--ink"):"#d9b416";x.globalAlpha=.8;x.lineWidth=Math.max(.8,tw/18);x.stroke()}x.restore();
    if(sc>3500){const placed=[];x.save();x.font="700 10px \"B612 Mono\",monospace";x.textAlign="center";x.textBaseline="middle";
      for(const w of a.ws){if(w.t!==0||!w.ref)continue;const q=w.p[Math.floor(w.p.length/2)],r=w.p.length>2?q:[(w.p[0][0]+w.p[1][0])/2,(w.p[0][1]+w.p[1][1])/2];
        const [px,py]=P({lat:r[0],lon:r[1]});if(px<12||py<12||px>W-12||py>H-12)continue;
        if(placed.some(p=>Math.hypot(p[0]-px,p[1]-py)<(p[2]===w.ref?90:26)))continue;placed.push([px,py,w.ref]);
        const tw2=x.measureText(w.ref).width+6;x.fillStyle="#000";x.fillRect(px-tw2/2,py-7,tw2,14);x.strokeStyle=nvg?col("--dim"):"#d9b416";x.lineWidth=1;x.strokeRect(px-tw2/2+.5,py-6.5,tw2-1,13);
        x.fillStyle=nvg?col("--ink"):"#f2cd1c";x.fillText(w.ref,px,py+.5)}x.restore()}}
  return any}

/* ---------- pre-flight route pack ---------- */
const PK={key:"",cur:null};
const rtKey=(a,b)=>a+"-"+b;
function packGet(){if(!S.from||!S.to||S.from===S.to)return null;const k=rtKey(S.from,S.to);if(PK.key!==k){PK.key=k;PK.cur=store.get("pack_"+k,null)}return PK.cur}
const LV=[850,700,500,300,250,200];
function packMsg(t){$("packTxt").textContent=t}
/* Open-Meteo forecast for route points at the hour each point is overflown */
const OMV=(()=>{const hv=["temperature_2m","precipitation","weather_code","cloud_cover","cape","wind_speed_10m","wind_gusts_10m","visibility","cloud_cover_low"];for(const p of LV)hv.push("wind_speed_"+p+"hPa","wind_direction_"+p+"hPa","temperature_"+p+"hPa","geopotential_height_"+p+"hPa");return hv})();
async function omSamples(pts,timeOf,q){if(pts.length>8){let out=[];for(let i=0;i<pts.length;i+=8)out=out.concat(await omSamples(pts.slice(i,i+8),timeOf,q));return out}
  const url="https://api.open-meteo.com/v1/forecast?latitude="+pts.map(p=>p.lat).join(",")+"&longitude="+pts.map(p=>p.lon).join(",")+"&hourly="+OMV.join(",")+"&wind_speed_unit=kn&timeformat=unixtime"+(q||"&forecast_days=3")+"&timezone=GMT";
  let r;try{r=await fetchT(url,20000)}catch(e){r=await fetchT(url,25000)}if(!r.ok)throw new Error("weather service answered "+r.status);let j=await r.json();if(!Array.isArray(j))j=[j];
  return pts.map((p,i)=>{const h=(j[i]||{}).hourly||{},tt=timeOf(p);let bi=0,bd=1e15;(h.time||[]).forEach((t,k)=>{const d=Math.abs(t*1000-tt);if(d<bd){bd=d;bi=k}});
      const g=k=>{const a=h[k];const v=a?a[bi]:null;return typeof v==="number"&&isFinite(v)?+v.toFixed(1):null};
      return {f:+p.f.toFixed(4),lat:p.lat,lon:p.lon,t:h.time&&h.time[bi]?h.time[bi]*1000:tt,T:g("temperature_2m"),pr:g("precipitation"),wc:g("weather_code"),cc:g("cloud_cover"),ccl:g("cloud_cover_low"),vis:g("visibility"),cape:g("cape"),w10:g("wind_speed_10m"),g10:g("wind_gusts_10m"),
        lv:LV.map(pl=>[pl,g("geopotential_height_"+pl+"hPa"),g("wind_speed_"+pl+"hPa"),g("wind_direction_"+pl+"hPa"),g("temperature_"+pl+"hPa")])}});
}
async function packDownload(fk,tk){
  const fr=apBy(fk||S.from),to=apBy(tk||S.to);if(!fr||!to||fr.c===to.c){packMsg("Pick a departure and destination first.");return}
  const btn=$("packBtn");if(btn.disabled)return;btn.disabled=true;const old=btn.textContent;btn.textContent="Downloading…";
  try{
    const tot=dist(fr,to),n=Math.max(8,Math.min(24,Math.round(tot/150000)+2)),pts=[];
    for(let i=0;i<n;i++){const f=i/(n-1),q=gcPoint(fr,to,f);pts.push({f,lat:+q.lat.toFixed(3),lon:+q.lon.toFixed(3)})}
    let dep=Date.now();const tv=$("packDep").value;if(/^\d\d:\d\d/.test(tv)){const [hh,mm]=tv.split(":").map(Number),d=new Date();d.setHours(hh,mm,0,0);if(d.getTime()<Date.now()-3*3600000)d.setDate(d.getDate()+1);dep=d.getTime()}
    packMsg("Downloading weather for "+n+" points along "+fr.c+" → "+to.c+"…");
    const smp=await omSamples(pts,p=>dep+20*60000+p.f*tot/230*1000);
    if(!smp.some(s=>s.lv.some(l=>l[2]!=null)))throw new Error("no wind data in the reply");
    const pk={v:1,from:fr.c,to:to.c,at:Date.now(),dep,smp,lm:[],src:"Open-Meteo.com (CC BY 4.0)"};
    if($("packWiki").checked){packMsg("Weather saved. Looking up places along the route on Wikipedia…");try{pk.lm=await wikiPlaces(pts)}catch(e){pk.wikiErr=String(e&&e.message||e)}}
    if(!store.set("pack_"+rtKey(fr.c,to.c),pk)){pk.lm=pk.lm.slice(0,20);if(!store.set("pack_"+rtKey(fr.c,to.c),pk))throw new Error("phone storage is full")}
    PK.key="";rtAdd(fr.c,to.c);
    packMsg("✓ Pack saved on the phone for "+fr.c+" → "+to.c+": weather at "+n+" points"+(pk.lm.length?", "+pk.lm.length+" extra places":"")+". Works offline in flight. Turbulence is a rough guide, not a forecast.");
    hap(20);
  }catch(e){packMsg("Couldn't download the pack: "+(e&&e.name==="AbortError"?"timed out":(e&&e.message)||e)+". Check the internet connection and try again.")}
  finally{btn.disabled=false;btn.textContent=old;packRender();wxBtn();try{drawMap();profAll();windowInfo()}catch(e){}}}
$("packBtn").onclick=()=>packDownload();
/* Wikipedia geosearch (CC BY-SA): up to 2 notable places near each route point, skipping suburbs and the end cities */
async function wikiPlaces(pts){
  const KW=/\b(Mount|Mt|Lake|River|Island|Islands|Range|Ranges|National Park|Bay|Dam|Gorge|Falls|Reef|Peninsula|Cape|Desert|Crater|Rock|Valley|Plain|Reservoir|Bridge|Lighthouse|Head|Heads|Creek|Station|Mine|Glacier|Volcano|Sound|Strait)\b/;
  const have=new Set(LM.map(l=>l.n.toLowerCase())),out=[],q=pts.slice(1,-1);let k=0;
  async function one(p){const u="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=geosearch&ggscoord="+p.lat+"%7C"+p.lon+"&ggsradius=10000&ggslimit=15&prop=extracts%7Ccoordinates&exintro=1&explaintext=1&exsentences=2&exlimit=15";
    try{const r=await fetchT(u,12000);if(!r.ok)return;const j=await r.json(),pg=j&&j.query&&j.query.pages?Object.values(j.query.pages):[];
      const c=pg.map(x=>{const t=String(x.title||""),ex=String(x.extract||"").replace(/\s+/g," ").trim(),co=x.coordinates&&x.coordinates[0];if(!co||!t||!ex)return null;
        if(/\b(suburb|neighbourhood|electoral|school|church|hotel|street|road|shopping|football|cricket|cemetery)\b/i.test(ex.slice(0,140))&&!KW.test(t))return null;
        let s=(KW.test(t)?3:0)+(ex.length>120?1:0)+(/locality/i.test(ex.slice(0,100))?-1:0);return {t,ex,lat:co.lat,lon:co.lon,s}}).filter(x=>x&&x.s>=1&&!have.has(x.t.toLowerCase())).sort((a,b)=>b.s-a.s).slice(0,2);
      for(const x of c){have.add(x.t.toLowerCase());let note=x.ex;if(note.length>180){note=note.slice(0,180);note=note.slice(0,note.lastIndexOf(" "))+"…"}
        out.push({n:x.t.slice(0,60),lat:+x.lat.toFixed(4),lon:+x.lon.toFixed(4),kind:"wiki",r:2,note:note+" (Wikipedia)"})}}catch(e){}}
  const workers=[0,1,2,3].map(async()=>{while(k<q.length){const p=q[k++];await one(p)}});await Promise.all(workers);return out.slice(0,60)}
/* rough turbulence guide from forecast wind shear, jet stream strength, storm energy (CAPE) and surface gusts. Not a forecast. */
function turbAt(pk,f,h){const sm=pk&&pk.smp;if(!sm||!sm.length)return null;
  const n=sm.length,fi=Math.max(0,Math.min(n-1,Math.round(f*(n-1)))),s=sm[fi],nb=sm[Math.min(n-1,fi+1)]===s?sm[Math.max(0,fi-1)]:sm[Math.min(n-1,fi+1)];
  const lv=s.lv.filter(l=>l[1]!=null&&l[2]!=null&&l[3]!=null).sort((a,b)=>a[1]-b[1]);let v=0,why="";
  const put=(x,w)=>{if(x>v){v=x;why=w}};
  if(lv.length>=2){let i=lv.findIndex(l=>l[1]>h);if(i<=0)i=i===0?1:lv.length-1;const a=lv[i-1],b=lv[i];
    const uv=l=>{const r=rad(l[3]);return [-l[2]*Math.sin(r),-l[2]*Math.cos(r)]},A=uv(a),B=uv(b),dz=Math.max(300,b[1]-a[1])*FT/1000,vws=Math.hypot(A[0]-B[0],A[1]-B[1])/dz;
    put(clamp01((vws-2.5)/6.5),"wind shear "+vws.toFixed(1)+" kt/1000 ft");
    const near=lv.reduce((m,l)=>Math.abs(l[1]-h)<Math.abs(m[1]-h)?l:m,lv[0]),ws=near[2];
    if(ws>60&&h>5000){const nl=nb&&nb.lv.find(l=>l[0]===near[0]);const sp=pk.tot||1;let hg=0;if(nl&&nl[2]!=null){const dk=dist(s,nb)/100000||1;hg=Math.abs(nl[2]-ws)/dk}
      put(clamp01((ws-90)/80)*0.5+clamp01((hg-12)/30)*0.5,"jet stream "+Math.round(ws)+" kt")}}
  if(h<13500){/* CAPE alone is potential, not storms: cap it below Rough unless the model forecasts thunder */let cv=clamp01(((s.cape||0)-500)/3000)*0.7*(h>9000?0.75:1);if(s.wc>=95)cv=Math.max(cv,0.85);else if(s.wc>=80&&s.wc<=82)cv=Math.max(cv,0.3);put(cv,s.wc>=95?"thunderstorms forecast":"storm energy (CAPE "+Math.round(s.cape||0)+" J/kg)")}
  if(h<1800&&s.g10!=null)put(clamp01((s.g10-18)/25),"surface gusts "+Math.round(s.g10)+" kt");
  return {v,why}}
const TCAT=[["Smooth","--ok"],["Light","#c6e33a"],["Moderate","--warn"],["Rough","--bad"]];
const tcat=v=>v<0.25?0:v<0.5?1:v<0.75?2:3;
function tcol(c,col){const k=TCAT[c][1];return k.startsWith("--")?col(k):k}
/* planned altitude (m) at route fraction f, matching the dashed profile */
function planAlt(f,tot){const pl=plan(tot),c=pl.c/tot,d=1-pl.d/tot;return f<=c?pl.cr*f/Math.max(1e-6,c):f>=d?pl.cr*(1-f)/Math.max(1e-6,1-d):pl.cr}
function turbDraw(x,X,Y,tot,small,W,H,T0,col){const pk=packGet();if(!pk)return;
  const N=small?60:120;for(let i=0;i<N;i++){const f0=i/N,f1=(i+1)/N,fm=(f0+f1)/2,t=turbAt(pk,fm,planAlt(fm,tot));if(!t)continue;const c=tcol(tcat(t.v),col);
    x.fillStyle=c;x.globalAlpha=small?.9:.85;x.fillRect(X(f0),small?0:T0,Math.max(1,X(f1)-X(f0)+.5),small?3:9);
    if(!small&&t.v>=0.25){x.globalAlpha=.45;x.strokeStyle=c;x.lineWidth=9;x.lineCap="butt";x.beginPath();x.moveTo(X(f0),Y(planAlt(f0,tot)));x.lineTo(X(f1),Y(planAlt(f1,tot)));x.stroke()}}
  x.globalAlpha=1}
function turbSummary(){const pk=packGet(),el=$("turbTxt");if(!el)return;const fr=apBy(S.from),to=apBy(S.to);
  if(!pk||!fr||!to){el.innerHTML="No pre-flight pack for this route. Download one on the Route page before you lose internet to add weather and a rough turbulence guide.";return}
  const tot=dist(fr,to),cnt=[0,0,0,0],worst=[];for(let i=0;i<100;i++){const f=(i+.5)/100,t=turbAt(pk,f,planAlt(f,tot));if(!t)continue;const c=tcat(t.v);cnt[c]++;if(c>=2)worst.push({f,c,why:t.why})}
  const age=(Date.now()-pk.at)/3600000;let s=`Rough guide, not a forecast: about ${cnt[0]}% smooth, ${cnt[1]}% light, ${cnt[2]}% moderate, ${cnt[3]}% rough along the planned profile.`;
  if(worst.length){const w=worst.sort((a,b)=>b.c-a.c)[0];s+=` Bumpiest around ${Math.round(fDst(w.f*tot)).toLocaleString()} ${S.dst} from ${esc(fr.c)} (${esc(w.why)}).`}
  s+=` Forecast for your departure ${new Date(pk.dep).toTimeString().slice(0,5)}, downloaded ${age<1?Math.round(age*60)+" min":Math.round(age)+" h"} ago`+(age>18&&!pk.upd?" — getting old, update it if you can":"")+"."+(pk.upd?" Updated in flight "+new Date(pk.upd).toTimeString().slice(0,5)+" for the remaining route.":"")+" Weather data by Open-Meteo.com.";
  el.innerHTML=s}
/* cruise-level wind summary for the pack tile */
function packRender(){const pk=packGet(),fr=apBy(S.from),to=apBy(S.to),ul=$("packSum");
  $("packHead").textContent=fr&&to&&fr.c!==to.c?"Pack for "+fr.c+" → "+to.c:"Pre-flight pack";
  if(!pk||!fr||!to){$("packAge").textContent="none";ul.innerHTML="";try{turbSummary()}catch(e){}return}
  const age=(Date.now()-pk.at)/3600000;$("packAge").textContent=pk.upd?"updated in flight "+new Date(pk.upd).toTimeString().slice(0,5):age<1?Math.round(age*60)+" min old":Math.round(age)+" h old";
  const crs=brg(fr,to);let hw=0,n=0,mx=0,ts=0,rain=0;for(const s of pk.smp){const l=s.lv.find(q=>q[0]===250);if(l&&l[2]!=null&&l[3]!=null){hw+=l[2]*Math.cos(rad(l[3]-(crs+180)));n++;mx=Math.max(mx,l[2])}if(s.wc>=95||(s.cape||0)>1000)ts++;if((s.pr||0)>=0.5)rain++}
  const tw=n?Math.round(hw/n):null;
  ul.innerHTML=[`<li><b>Winds near cruise (FL340)</b><span>${tw==null?"—":(tw>=0?"tailwind ":"headwind ")+Math.abs(tw)+" kt avg · max "+Math.round(mx)+" kt"}</span></li>`,
    `<li><b>Storms on route</b><span>${ts?ts+" of "+pk.smp.length+" points":"none forecast"}</span></li>`,
    `<li><b>Rain on route</b><span>${rain?rain+" of "+pk.smp.length+" points":"little or none"}</span></li>`,
    `<li><b>Extra places</b><span>${pk.lm&&pk.lm.length?pk.lm.length+" from Wikipedia":"—"}</span></li>`].join("");
  try{turbSummary()}catch(e){}}
/* weather overlay on the map from the pack */
const WXC=c=>c==null?"":c>=95?"TS":c>=85?"SN":c>=80?"SH":c>=71?"SN":c>=61?"RA":c>=51?"DZ":c>=45?"FG":c>=3?"OVC":c>=2?"BKN":c>=1?"FEW":"CLR";
function wxDraw(x,P,sc,W,H,col,glow,fr,to){const pk=packGet();if(!pk||(S.wx||"on")!=="on")return false;const sm=pk.smp;if(!sm||sm.length<2)return false;
  const sp=Math.hypot(...[0,1].map(i=>P(sm[1])[i]-P(sm[0])[i])),rr=Math.max(16,Math.min(90,sp*1.05)),tot=dist(fr,to);x.save();
  for(const s of sm){const [px,py]=P(s);if(px<-rr||py<-rr||px>W+rr||py>H+rr)continue;const cc=(s.cc||0)/100,g=x.createRadialGradient(px,py,0,px,py,rr);
    const storm=s.wc>=95,unst=!storm&&(s.cape||0)>1500,rain=(s.pr||0)>=0.3||(s.wc>=51&&s.wc<=82);
    const base=storm?"255,59,48":rain?"64,160,255":unst?"255,170,0":"220,230,235",a=storm?.6:rain?.5:unst?.4:.42*cc;g.addColorStop(0,`rgba(${base},${a})`);g.addColorStop(1,`rgba(${base},0)`);x.fillStyle=g;x.beginPath();x.arc(px,py,rr,0,7);x.fill()}
  /* route coloured by the cruise-level turbulence guide */
  x.lineCap="round";for(let i=0;i<60;i++){const f0=i/60,f1=(i+1)/60,t=turbAt(pk,(f0+f1)/2,planAlt((f0+f1)/2,tot));if(!t)continue;const a=P(gcPoint(fr,to,f0)),b=P(gcPoint(fr,to,f1));x.strokeStyle=tcol(tcat(t.v),col);x.globalAlpha=.55;x.lineWidth=7;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
  x.globalAlpha=1;
  {const kk=Math.max(1,Math.ceil(46/Math.max(1,sp)));x.font="700 10px \"B612 Mono\",monospace";x.textAlign="center";for(let si=0;si<sm.length;si+=kk){const s=sm[si];const [px,py]=P(s);if(px<20||py<20||px>W-20||py>H-30)continue;const l=s.lv.find(q=>q[0]===250);
    const t1=WXC(s.wc),t2=l&&l[2]!=null?String(Math.round(l[3]/10)*10%360).padStart(3,"0")+"/"+Math.round(l[2]):"";
    x.fillStyle="rgba(0,0,0,.6)";x.fillRect(px-24,py-21,48,t2?24:13);x.fillStyle=s.wc>=95?col("--bad"):(s.pr||0)>=0.3?col("--cyan"):col("--ink");x.fillText(t1,px,py-11);if(t2){x.fillStyle=col("--dim");x.fillText(t2,px,py-1)}}}
  const age=(Date.now()-pk.at)/3600000;x.font="10px \"B612 Mono\",monospace";x.textAlign="left";x.fillStyle=col("--dim");x.fillText(pk.upd?"WX UPDATED IN FLIGHT "+new Date(pk.upd).toTimeString().slice(0,5)+" · OPEN-METEO":"WX "+new Date(pk.dep).toTimeString().slice(0,5)+" DEP · "+(age<1?Math.round(age*60)+"M":Math.round(age)+"H")+" OLD · OPEN-METEO",6,14);
  x.restore();return true}
$("mzWx").onclick=()=>{S.wx=(S.wx||"on")==="on"?"off":"on";saveS();wxBtn();hap(15);drawMap()};
function wxBtn(){const b=$("mzWx"),on=(S.wx||"on")==="on";b.classList.toggle("on",on);b.setAttribute("aria-pressed",on?"true":"false");
  const pk=packGet();$("wxNote").textContent=pk?(on?"Weather: clouds (grey), rain (blue), thunderstorms (red), unstable air that could build storms (amber) and winds near FL340 (direction/knots) at your planned time, with the route coloured by the rough turbulence guide. Tap WX to hide.":"Weather overlay hidden. Tap WX to show it."):"No pre-flight pack for this route yet: download one on the Route page to add weather here."}

/* ---------- common routes ---------- */
const rtList=()=>{const l=store.get("routes",[]);return Array.isArray(l)?l.filter(r=>r&&apBy(r.from)&&apBy(r.to)):[]};
function rtAdd(f,t){const l=rtList().filter(r=>!(r.from===f&&r.to===t));l.unshift({from:f,to:t,at:Date.now()});store.set("routes",l.slice(0,15));rtRender()}
function rtUse(f,t){if(!apBy(f)||!apBy(t))return;prof=[];window.__terr=null;S.from=f;S.to=t;$("from").value=f;$("to").value=t;saveS();PK.key="";render();drawMap();profAll();packRender();wxBtn();try{windowInfo()}catch(e){}}
function rtRender(){const l=rtList(),ul=$("rtList");if(!l.length){ul.innerHTML='<li><span>No saved routes yet. Download a pack or tap Save this route.</span></li>';return}
  ul.innerHTML=l.map((r,i)=>{const pk=store.get("pack_"+rtKey(r.from,r.to),null),age=pk?(Date.now()-pk.at)/3600000:null;
    return `<li class="rt"><div><b>${esc(r.from)} → ${esc(r.to)}</b><span class="sub blk">${pk?"pack "+(age<1?Math.round(age*60)+" min":age<48?Math.round(age)+" h":Math.round(age/24)+" days")+" old"+(pk.lm&&pk.lm.length?" · "+pk.lm.length+" places":""):"no pack"}</span></div><div class="row"><button data-a="use" data-i="${i}">Use</button><button data-a="upd" data-i="${i}" data-net>Update</button><button data-a="del" data-i="${i}" aria-label="Delete route">✕</button></div></li>`}).join("")}
$("rtList").onclick=e=>{const b=e.target.closest("button");if(!b)return;const r=rtList()[+b.dataset.i];if(!r)return;
  if(b.dataset.a==="use"){rtUse(r.from,r.to);hap(10)}
  else if(b.dataset.a==="upd"){rtUse(r.from,r.to);packDownload(r.from,r.to)}
  else if(b.dataset.a==="del"){store.set("routes",rtList().filter(q=>!(q.from===r.from&&q.to===r.to)));try{localStorage.removeItem("cp_pack_"+rtKey(r.from,r.to))}catch(_){}PK.key="";rtRender();packRender();wxBtn();drawMap();profAll()}};
$("rtSave").onclick=()=>{if(!S.from||!S.to||S.from===S.to){packMsg("Pick a departure and destination first.");return}rtAdd(S.from,S.to);hap(10)};
for(const id of ["from","to"])$(id).addEventListener("change",()=>{PK.key="";packRender();wxBtn()});
rtRender();packRender();wxBtn();

/* ================= AR window view =================
   Rear camera + targeting-pod boxes. Heading from the phone compass (true = magnetic + WMM variation + trim) or from
   GPS track ± 90° for the chosen window. Tilt from device orientation. Read-only; stops the camera when closed. */
const AR={bias:0,agree:null,stream:null,cam:"",sen:"",listen:false,raw:null,hs:null,acc:null,src:"",ht:0,b:null,g:null,ot:0,ps:null,rs:null,raf:0,lt:0,tg:[],tgAt:0,lock:null,hits:[],aligned:false,msgK:""};
if(S.arSrc!=="fus"&&S.arSrc!=="cmp"&&S.arSrc!=="gps"||!S.arV2){S.arSrc="fus";S.arV2=1}if(!["norm","grn","wht","nvg","flir","ir"].includes(S.arFlt))S.arFlt="norm";if(S.arSide!=="left"&&S.arSide!=="right")S.arSide=S.seat==="right"?"right":"left";if(typeof S.arTrim!=="number")S.arTrim=0;
function arOri(e){const b=e.beta,g=e.gamma,a=e.alpha;if(typeof b==="number"&&isFinite(b)&&typeof g==="number"&&isFinite(g)){AR.b=b;AR.g=g;AR.ot=Date.now()}
  let h=null,acc=null,src="";
  if(typeof e.webkitCompassHeading==="number"&&isFinite(e.webkitCompassHeading)&&e.webkitCompassHeading>=0){h=e.webkitCompassHeading;src="ios";if(typeof e.webkitCompassAccuracy==="number"&&isFinite(e.webkitCompassAccuracy))acc=e.webkitCompassAccuracy}
  else if((e.type==="deviceorientationabsolute"||e.absolute===true)&&typeof a==="number"&&isFinite(a)&&typeof b==="number"&&typeof g==="number"){
    /* direction the rear camera points (device -Z) from the W3C alpha/beta/gamma rotation */
    const A=rad(a),B=rad(b),G=rad(g),E=-Math.cos(A)*Math.sin(G)-Math.sin(A)*Math.sin(B)*Math.cos(G),N=-Math.sin(A)*Math.sin(G)+Math.cos(A)*Math.sin(B)*Math.cos(G);
    if(Math.hypot(E,N)>0.2){h=(deg(Math.atan2(E,N))+360)%360;src="abs"}}
  if(h==null)return;if(src==="abs"&&AR.src==="ios")return;AR.raw=h;AR.acc=acc;AR.src=src;AR.ht=Date.now();if(AR.hs==null)AR.hs=h}
function arListen(){if(AR.listen)return;AR.listen=true;AR.sen="wait";window.addEventListener("deviceorientation",arOri);if("ondeviceorientationabsolute" in window)window.addEventListener("deviceorientationabsolute",arOri);
  setTimeout(()=>{if(arOn&&AR.sen==="wait"&&AR.ot===0)AR.sen="none"},4000)}
function arUnlisten(){if(!AR.listen)return;AR.listen=false;window.removeEventListener("deviceorientation",arOri);window.removeEventListener("deviceorientationabsolute",arOri)}
/* must run inside the tap so iOS shows its Allow prompt */
function arSenStart(fromTap){const DOE=window.DeviceOrientationEvent;if(!DOE){AR.sen="none";return}
  if(typeof DOE.requestPermission==="function"&&CMP.perm!=="granted"){if(!fromTap){AR.sen="need";return}
    let pr;try{pr=DOE.requestPermission()}catch(e){AR.sen="need";return}
    Promise.resolve(pr).then(r=>{if(r==="granted"){CMP.perm="granted";if(arOn)arListen()}else{CMP.perm="denied";AR.sen="denied"}}).catch(()=>{AR.sen=CMP.perm==="denied"?"denied":"need"});return}
  arListen()}
async function arCamStart(){if(AR.stream)return;const md=navigator.mediaDevices;if(!md||!md.getUserMedia){AR.cam="none";return}
  AR.cam="wait";try{const s=await md.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}},audio:false});
    if(!arOn){s.getTracks().forEach(t=>t.stop());return}AR.stream=s;const v=$("arVid");v.muted=true;v.setAttribute("playsinline","");v.setAttribute("muted","");v.srcObject=s;try{await v.play()}catch(e){}AR.cam="on"}
  catch(e){AR.cam=e&&(e.name==="NotAllowedError"||e.name==="SecurityError")?"denied":"none"}}
function arCamStop(){if(AR.stream){AR.stream.getTracks().forEach(t=>t.stop());AR.stream=null}const v=$("arVid");try{v.pause()}catch(e){}v.srcObject=null;if(AR.cam==="on"||AR.cam==="wait")AR.cam="off"}
function arOpen(){if(arOn)return;if(fhOn)fhExit();if(cmpOn)cmpClose();arOn=true;document.body.classList.add("ar");$("arPhase").textContent=PHN[PH.p]||"";
  arSenStart(true);arCamStart();arUI();AR.lt=0;AR.tgAt=0;if(!AR.raf)AR.raf=requestAnimationFrame(arFrame);try{wantWake||$("wakeBtn").click()}catch(e){}try{$("arExit").focus()}catch(e){}}
function arClose(){if(!arOn)return;arOn=false;document.body.classList.remove("ar");arCamStop();arUnlisten();if(AR.raf){cancelAnimationFrame(AR.raf);AR.raf=0}AR.raw=null;AR.hs=null;AR.src="";AR.b=AR.g=null;AR.ot=0;AR.ps=AR.rs=null;
  try{$("arBtn").focus()}catch(e){}setTimeout(()=>{try{landCheck()}catch(e){}},50)}
$("arBtn").onclick=arOpen;$("arExit").onclick=arClose;
$("arCam").onclick=()=>{if(AR.stream){arCamStop()}else arCamStart();arUI()};
$("arSen").onclick=()=>{arSenStart(true);arUI()};
$("arHide").onclick=()=>document.body.classList.add("arMin");$("arShow").onclick=()=>document.body.classList.remove("arMin");
$("arTrim").oninput=e=>{S.arTrim=+e.target.value||0;AR.aligned=false;arUI();saveS()};
$("arAlign").onclick=()=>{const L=last,mov=L&&L.trk!=null&&L.spd!=null&&L.spd>=10;if(!mov||AR.hs==null){AR.msgK="align";AR.msgT=Date.now();return}
  const dec=cmpDecl(L)||0,win=L.trk+(S.arSide==="right"?90:-90);if(S.arSrc==="fus"){AR.bias=Math.max(-15,Math.min(15,w180(win-(AR.hs+dec))));S.arTrim=0}else S.arTrim=Math.round(w180(win-(AR.hs+dec)));S.arTrim=Math.max(-60,Math.min(60,S.arTrim));AR.aligned=true;saveS();arUI();hap(20)};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&arOn)arClose()});
function arUI(){$("arTrim").value=S.arTrim;$("arTrimV").textContent=(S.arTrim>0?"+":"")+S.arTrim+"°";$("arCam").textContent=AR.stream?"Camera off":"Camera on";
  $("arSen").style.display=AR.listen&&AR.ot?"none":"";$("arAlign").style.display=S.arSrc==="gps"?"none":"";document.body.classList.toggle("arf-grn",S.arFlt==="grn");document.body.classList.toggle("arf-wht",S.arFlt==="wht");applySeg()}
/* targets: landmarks (with notes), airports, destination/origin, estimated top of descent, your marks */
function arTargets(){const L=last;if(!L)return [];const h=Math.max(0,L.alt||0),hz=Math.sqrt(2*R*Math.max(h,2)/0.87),maxD=Math.max(60000,Math.min(420000,hz*1.25)),out=[];
  const add=(n,lat,lon,kind,note,rk,always)=>{const p={lat,lon},d=dist(L,p);if(!always&&d>maxD)return;if(d<400&&kind!=="mk")return;let he=0;try{he=Math.max(0,elevAt(lat,lon)||0)}catch(e){}
    const drop=d*d/(2*R)*0.87,el=deg(Math.atan2(he-h-drop,d));out.push({n,kind,note:note||"",d,b:brg(L,p),el,r:(rk||1)*1000,hid:d>hz+(rk||1)*1000+5000})};
  for(const l of lmAll())add(l.n,l.lat,l.lon,l.kind||"lm",l.note||"",l.r||2);
  const fr=DRV.on?null:apBy(S.from),to=DRV.on?null:apBy(S.to);
  if(DRV.on)try{drvArTargets(L,add)}catch(e){}
  for(const a of AP){if((fr&&a.c===fr.c)||(to&&a.c===to.c))continue;add(a.n+" airport",a.lat,a.lon,"ap",a.c+" · airport",2)}
  if(to)add("DEST "+to.c,to.lat,to.lon,"dest",to.n+" · destination"+(L.spd>25?" · "+hm(dist(L,to)/Math.max(60,L.spd))+" to go":""),3,true);
  if(fr&&dist(L,fr)>3000)add("ORIG "+fr.c,fr.lat,fr.lon,"orig",fr.n+" · where you departed",3,true);
  if(fr&&to&&fr.c!==to.c){const tot=dist(fr,to),pl=plan(tot);if(dist(L,to)>pl.d+5000){const t=gcPoint(fr,to,1-pl.d/tot);add("T/D",t.lat,t.lon,"wpt","Estimated top of descent (3-to-1 rule); the crew's point will differ",2,true)}}
  for(const m of MARKS)add("MK"+m.n,m.lat,m.lon,"mk",m.note?String(m.note):"Your mark",1,true);
  try{spotTargets(L,out)}catch(e){}
  return out}
function arStatus(){const L=last,now=Date.now();
  if(AR.cam==="denied")return "Camera blocked. Allow camera for this site (iPhone Settings › Apps › Safari › Camera), or carry on with the synthetic view.";
  if(AR.sen==="need")return "Tap Enable compass (then Allow) for heading and tilt.";
  if(AR.sen==="denied")return "Motion access denied: fully close and reopen the app, then tap Enable compass. Using GPS track meanwhile.";
  if(!L)return "Waiting for GPS: tap Start GPS (or Demo flight) on the HUD page for positions.";
  if(AR.msgK==="align"&&now-AR.msgT<4000)return "Align needs the compass and the aircraft moving: look square out of the window, then tap Align.";
  if(S.arSrc!=="gps"&&(AR.hs==null||now-AR.ht>5000)&&AR.sen!=="wait")return "No compass reading: using GPS track. Hold the phone square to the window.";
  if(S.arSrc==="gps"&&!(L.trk!=null&&L.spd>=10))return "GPS track needs the aircraft moving. Using the compass if available.";
  if(AR.cam==="none")return "No camera here: synthetic view.";return ""}
function arFrame(ts){AR.raf=0;if(!arOn)return;const dt=AR.lt?Math.min(0.5,(ts-AR.lt)/1000):0;AR.lt=ts;
  const k=dt?1-Math.exp(-dt/0.22):1;if(AR.raw!=null){if(AR.hs==null)AR.hs=AR.raw;AR.hs=((AR.hs+k*w180(AR.raw-AR.hs))%360+360)%360}
  if(AR.b!=null){const B=rad(AR.b),G=rad(AR.g),pitch=deg(Math.asin(Math.max(-1,Math.min(1,-Math.cos(B)*Math.cos(G))))),roll=w180(deg(Math.atan2(-Math.cos(B)*Math.sin(G),Math.sin(B)))-cmpScrAng());
    AR.ps=AR.ps==null?pitch:AR.ps+k*(pitch-AR.ps);AR.rs=AR.rs==null?roll:AR.rs+k*w180(roll-AR.rs)}
  if(ts-AR.tgAt>1000){AR.tgAt=ts;try{AR.tg=arTargets()}catch(e){AR.tg=[]}const m=arStatus(),el=$("arMsg");if(m!==AR.msgShown){AR.msgShown=m;el.textContent=m;el.style.display=m?"":"none"}if(AR.sen==="wait"&&AR.ot)AR.sen="ok";$("arSen").style.display=AR.listen&&AR.ot?"none":"";$("arPhase").textContent=PHN[PH.p]||""}
  try{arDraw(dt)}catch(e){console.warn(e)}
  AR.raf=requestAnimationFrame(arFrame)}
window.cpAR=()=>({bias:AR.bias,flt:S.arFlt,on:arOn,cam:AR.cam,sen:AR.sen,src:AR.src,hdg:AR.hs,pitch:AR.ps,roll:AR.rs,targets:AR.tg.length,view:AR.view||null,lock:AR.lock,hits:(AR.hits||[]).slice(0,12),lay:AR.lay||null});
/* heading solution: FUSED (default) = phone compass for orientation (+WMM variation) with a slow GPS-track drift/bias
   correction learned while you look out of the chosen window; COMPASS = compass only; GPS = track ±90°.
   Box size = heading uncertainty: ~1° compass (measured in flight) + 0.5° lens/FOV + GPS terms, widened if iOS reports
   poor compass accuracy or the compass and GPS disagree. */
function arSolve(dt){if(AR.force)return Object.assign({},AR.force);const L=last,now=Date.now(),mov=!!(L&&L.trk!=null&&L.spd!=null&&L.spd>=10&&now-L.t<20000),cmpOk=AR.hs!=null&&now-AR.ht<5000;
  const dec=L?(cmpDecl(L)||0):0,win=mov?L.trk+(S.arSide==="right"?90:-90):null,ct=cmpOk?AR.hs+dec:null;
  if(ct!=null&&win!=null&&dt){const d=w180(win-ct);if(Math.abs(w180(d-AR.bias))<25&&Math.abs(AR.ps||0)<35){const k=1-Math.exp(-dt/90);AR.bias=Math.max(-15,Math.min(15,AR.bias+k*w180(d-AR.bias)));AR.agree=Math.abs(d)}const e=Math.abs(w180(d-AR.bias));if(e<40&&Math.abs(AR.ps||0)<35)AR.dev=AR.dev==null?e:AR.dev+(1-Math.exp(-dt/8))*(e-AR.dev)}else if(win==null)AR.dev=null;
  const accT=AR.acc==null?0:AR.acc<0?20:Math.max(0,AR.acc-10)*0.5,gpsT=L&&L.acc?Math.min(1,L.acc/200):0.3;
  let az=null,unc=null,src="";const want=S.arSrc;
  if(want==="gps"&&win!=null){az=win+S.arTrim;unc=4+gpsT;src="GPS TRK "+(S.arSide==="right"?"R":"L")}
  else if(ct!=null&&want==="cmp"){az=ct+S.arTrim;unc=1+0.5+accT+gpsT+(AR.aligned?0:0.5);src="COMPASS"}
  else if(ct!=null){az=ct+AR.bias+S.arTrim;unc=1+0.5+accT+gpsT+0.3*Math.abs(AR.bias)+(AR.dev!=null?Math.min(8,Math.max(0,AR.dev-3)*0.5):0.5);src="FUSED"}
  else if(win!=null){az=win+S.arTrim;unc=4+gpsT;src="GPS TRK "+(S.arSide==="right"?"R":"L")}
  return {az:az==null?null:((az%360)+360)%360,unc,src,win,mov,dec}}
function arDraw(dt){
  const cv=$("arCv"),W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;const dpr=window.devicePixelRatio||1;if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}
  const x=cv.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,W,H);
  const flt=S.arFlt||"norm",SYM=flt==="wht"?"#ffffff":flt==="grn"?"#e4ffe4":"#8dff9e",DIM=flt==="norm"?"rgba(141,255,158,.75)":"rgba(255,255,255,.75)",F=s=>"700 "+s+"px \"B612 Mono\",monospace";
  const L=last,now=Date.now(),so=arSolve(dt),az=so.az,unc=so.unc;
  const tiltOk=AR.ps!=null&&now-AR.ot<5000,pitch=tiltOk?AR.ps:0,roll=tiltOk&&AR.rs!=null?AR.rs:0;
  const v=$("arVid"),vw=v.videoWidth||0,vh=v.videoHeight||0,camOn=!!(AR.stream&&vw&&vh);
  const ppd=camOn?Math.max(vw,vh)*Math.max(W/vw,H/vh)/64:Math.max(W,H)/64;
  const cx=W/2,cy=camOn?H/2:H*0.45,cr=Math.cos(rad(roll)),sr=Math.sin(rad(roll)),proj=(dA,dE)=>{const dx=dA*ppd,dy=dE*ppd;return [cx+dx*cr+dy*sr,cy+dx*sr-dy*cr]};
  AR.pj={az,pitch,roll,ppd,cx,cy,cr,sr,W,H};
  const h=L?Math.max(0,L.alt||0):0,dip=deg(Math.acos(R/(R+h*0.87)));
  const bar=$("arBar"),cT=cv.getBoundingClientRect().top,dT=$("arDisc").getBoundingClientRect().top-cT-4,bt=document.body.classList.contains("arMin")?Math.min(H,dT>0?dT:H):Math.min(H,bar.getBoundingClientRect().top-cT,dT>0?dT:H),yB=Math.max(H*0.55,bt-10);
  if(!camOn){const hp=proj(0,-dip-pitch);x.save();x.translate(hp[0],hp[1]);x.rotate(rad(roll));x.fillStyle=flt==="norm"?"#081420":"#141814";x.fillRect(-2*W,-3*H,4*W,3*H);x.fillStyle=flt==="norm"?"#14180c":"#0a0c0a";x.fillRect(-2*W,0,4*W,3*H);x.restore()}
  if(flt!=="norm"){const g=x.createRadialGradient(cx,H/2,Math.min(W,H)*0.35,cx,H/2,Math.max(W,H)*0.75);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.55)");x.fillStyle=g;x.fillRect(0,0,W,H)}
  /* crisp symbology: black outline under every stroke/text */
  const S2=(fn,lw)=>{x.strokeStyle="rgba(0,0,0,.85)";x.lineWidth=lw+2.2;x.beginPath();fn();x.stroke();x.strokeStyle=SYM;x.lineWidth=lw;x.beginPath();fn();x.stroke()};
  const T=(s,X,Y,size,al,c)=>{x.font=F(size);x.textAlign=al||"left";x.lineWidth=3;x.strokeStyle="rgba(0,0,0,.9)";x.strokeText(s,X,Y);x.fillStyle=c||SYM;x.fillText(s,X,Y)};
  x.lineCap="butt";x.lineJoin="miter";
  /* FOV gates (wide field) */
  {const gw=Math.min(W*0.36,H*0.3),gh=gw*0.72,gl=gw*0.16;S2(()=>{for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const X0=cx+sx*gw,Y0=cy+sy*gh;x.moveTo(X0-sx*gl,Y0);x.lineTo(X0,Y0);x.lineTo(X0,Y0-sy*gl)}},1.5)}
  /* gun cross / LOS reticle */
  S2(()=>{x.moveTo(cx-64,cy);x.lineTo(cx-14,cy);x.moveTo(cx+14,cy);x.lineTo(cx+64,cy);x.moveTo(cx,cy-46);x.lineTo(cx,cy-14);x.moveTo(cx,cy+14);x.lineTo(cx,cy+46);
    for(const d of [-48,-32,32,48]){x.moveTo(cx+d,cy-4);x.lineTo(cx+d,cy+4)}x.moveTo(cx-1.5,cy);x.lineTo(cx+1.5,cy)},2);
  /* horizon reference */
  if(tiltOk){const a=proj(-50,-dip-pitch),b=proj(50,-dip-pitch);x.save();x.setLineDash([3,9]);S2(()=>{x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1])},1.2);x.restore()}
  /* heading tape */
  const tY=Math.max(56,8+46);const tw=Math.min(W*0.62,420),tx0=cx-tw/2,tx1=cx+tw/2;
  if(az!=null){const sp=tw/2/ppd;S2(()=>{x.moveTo(tx0,tY+22);x.lineTo(tx1,tY+22);for(let d=Math.ceil((az-sp)/5)*5;d<=az+sp;d+=5){const px=cx+w180(d-az)*ppd;if(px<tx0||px>tx1)continue;x.moveTo(px,tY+22);x.lineTo(px,tY+(d%10===0?10:16))}},1.5);
    for(let d=Math.ceil((az-sp)/10)*10;d<=az+sp;d+=10){const px=cx+w180(d-az)*ppd;if(px<tx0+8||px>tx1-8||Math.abs(px-cx)<20)continue;const dd=((d%360)+360)%360;T(({0:"N",90:"E",180:"S",270:"W"})[dd]||String(dd/10).padStart(2,"0"),px,tY+5,10,"center")}
    x.fillStyle="rgba(0,0,0,.6)";x.fillRect(cx-19,tY-8,38,16);x.strokeStyle=SYM;x.lineWidth=1.2;x.strokeRect(cx-19,tY-8,38,16);T(p3(az),cx,tY+4,11,"center");
    S2(()=>{x.moveTo(cx,tY+24);x.lineTo(cx-6,tY+33);x.moveTo(cx,tY+24);x.lineTo(cx+6,tY+33)},1.5);
    if(so.win!=null&&so.src!=="GPS TRK L"&&so.src!=="GPS TRK R"){const px=cx+w180(so.win-az)*ppd;if(px>tx0&&px<tx1){x.fillStyle=SYM;x.fillRect(px-1,tY+24,2,9)}}}
  else T("NO HDG",cx,tY+8,11,"center","#ffbf00");
  /* ---- layout with collision avoidance: reserved areas first, then labels in priority order ---- */
  const RS=[],hitR=r=>RS.some(q=>r[0]<q[0]+q[2]&&r[0]+r[2]>q[0]&&r[1]<q[1]+q[3]&&r[1]+r[3]>q[1]),res=r=>{RS.push(r);return r};
  const narrow=W<560,lsc=W>H*1.2,arMin=document.body.classList.contains("arMin");
  res([tx0-4,tY-10,tw+8,40]);            /* heading tape */
  res([0,tY+24,136,50]);                 /* top-left data */
  res([W-136,tY+24,136,60]);             /* top-right data */
  res([cx-72,cy-52,144,104]);            /* gun cross: never draw labels through it */
  /* elevation scale: left edge in portrait (edge cues go below it), inboard in landscape (cues stay at the edge) */
  {const eh=lsc?Math.min(110,H*0.24):Math.min(95,H*0.12),ex=lsc?Math.round(Math.min(W*0.2,cx-190)):26,ey0=cy-eh,ey1=cy+eh,k=2*eh/50;
    S2(()=>{x.moveTo(ex,ey0);x.lineTo(ex,ey1);for(let e=20;e>=-30;e-=5){const y=ey0+(20-e)*k;x.moveTo(ex,y);x.lineTo(ex+(e%10===0?10:6),y)}},1.5);
    for(let e=20;e>=-30;e-=10){T(String(e),ex+14,ey0+(20-e)*k+4,10,"left",DIM)}
    if(tiltOk){const y=ey0+(20-Math.max(-30,Math.min(20,pitch)))*k;x.fillStyle=SYM;x.beginPath();x.moveTo(ex-2,y);x.lineTo(ex-12,y-6);x.lineTo(ex-12,y+6);x.closePath();x.fill()}
    T("EL",ex-6,ey0-10,10,"left");res([ex-16,ey0-22,58,ey1-ey0+32])}
  /* corner data blocks */
  const tl=["ALT "+(L&&L.alt!=null?Math.round(fAlt(L.alt)).toLocaleString():"----")+(S.alt==="ft"?" FT":" M"),"GS  "+(L&&L.spd!=null?Math.round(fSpd(L.spd)):"---")+" "+S.spd.toUpperCase(),"TRK "+(L&&L.trk!=null?p3(L.trk):"---")];
  x.font=F(10);{const w1=Math.max(...tl.map(s=>x.measureText(s).width))+8;x.fillStyle="rgba(0,0,0,.32)";x.fillRect(4,tY+28,w1,36)}
  tl.forEach((s,i)=>T(s,8,tY+38+i*11,10,"left"));
  const d=new Date(),tr=[d.toTimeString().slice(0,8)+" L",d.toISOString().slice(11,16)+"Z",({norm:"DAY TV",grn:"FLIR GRN",wht:"FLIR WHT"})[flt]+" · WFOV",(PHN[PH.p]||"").toUpperCase()];
  x.font=F(10);{const w2=Math.max(...tr.map(s=>x.measureText(s).width))+8;x.fillStyle="rgba(0,0,0,.32)";x.fillRect(W-4-w2,tY+28,w2,46)}
  tr.forEach((s,i)=>T(s,W-8,tY+38+i*11,10,"right"));
  AR.view=az==null?null:{az:+az.toFixed(1),unc:+unc.toFixed(1),pitch:+pitch.toFixed(1),roll:+roll.toFixed(1),ppd:+ppd.toFixed(2),src:so.src,bias:+AR.bias.toFixed(1)};
  /* bottom-right sensor block: kept above the ⚙ button so nothing is clipped */
  const br=[(so.src||"NO HDG")+(unc!=null?" ±"+unc.toFixed(1)+"°":""),(tiltOk?"EL "+(pitch>=0?"+":"")+pitch.toFixed(1)+"°":"EL ---")+"  TRIM "+(S.arTrim>0?"+":"")+S.arTrim,"BIAS "+(AR.bias>=0?"+":"")+AR.bias.toFixed(1)+"°  VAR "+(so.dec>=0?"E":"W")+Math.abs(so.dec).toFixed(0)];
  let brB=yB;if(arMin){const gr=$("arShow").getBoundingClientRect();if(gr.height)brB=Math.min(yB,gr.top-cT-8)}
  x.font=F(10);const brW=Math.max(...br.map(s=>x.measureText(s).width));br.forEach((s,i)=>T(s,W-8,brB-22+i*11,10,"right",i?DIM:SYM));res([W-brW-12,brB-34,brW+14,38]);
  AR.hits=[];AR.lay={labels:0,hidden:0,cues:0};
  if(az==null||!L)return;
  /* targets */
  const hf=W/ppd/2,vf=H/ppd/2,on=[],offL=[],offR=[];
  for(const t of AR.tg){const dA=w180(t.b-az),dE=t.el-pitch;if(Math.abs(dA)<hf+1&&Math.abs(dE)<vf+1){const [px,py]=proj(dA,dE);if(px>-10&&py>-10&&px<W+10&&py<H+10){on.push(Object.assign({px,py,dA},t));continue}}
    if(Math.abs(dA)<=150)(dA<0?offL:offR).push(Object.assign({dA},t))}
  const pri=t=>t.n===AR.lock?-1e9:(t.kind==="dest"?0:t.kind==="mk"?1:t.kind==="wpt"?2:3)*1e7+t.d;
  const lockT=AR.tg.find(t=>t.n===AR.lock)||null;
  let des=on.find(t=>t.n===AR.lock)||on.slice().sort((a,b)=>Math.hypot(a.px-cx,a.py-cy)-Math.hypot(b.px-cx,b.py-cy)).find(t=>Math.abs(t.dA)<Math.max(unc*2,4)+3&&!t.hid)||null;
  /* range readout + target data block (bottom left; in portrait RNG sits above the block) */
  const tg=des||lockT;
  if(tg){const ls=[(AR.lock===tg.n?"◆ ":"")+tg.n.toUpperCase().slice(0,30),"BRG "+p3(tg.b)+"°T  EL "+(tg.el>=0?"+":"")+tg.el.toFixed(1)+"°"+(tg.hid?"  BEYOND HZN":"")];
    const mxw=narrow?Math.min(W-brW-32,W*0.58):Math.min(W*0.36,260);let notes=[];
    if(tg.note){x.font="10px \"B612\",sans-serif";let cur="";for(const w of tg.note.split(" ")){const tt=cur?cur+" "+w:w;if(x.measureText(tt).width>mxw){notes.push(cur);cur=w;if(notes.length===2)break}else cur=tt}if(notes.length<2&&cur)notes.push(cur);if(notes.length===2&&tg.note.indexOf(notes[1])+notes[1].length<tg.note.length-1)notes[1]+="…"}
    const nL=ls.length+notes.length,by=yB-6-(nL-1)*11;
    ls.forEach((s,i)=>T(s,8,by+i*11,10,"left",i?DIM:(AR.lock===tg.n?"#ffbf00":SYM)));
    notes.forEach((s,i)=>{x.font="10px \"B612\",sans-serif";x.textAlign="left";x.lineWidth=3;x.strokeStyle="rgba(0,0,0,.9)";const yy=by+(ls.length+i)*11;x.strokeText(s,8,yy);x.fillStyle=SYM;x.fillText(s,8,yy)});
    res([0,by-11,mxw+16,yB-by+16]);
    const rng=fDst(tg.d),rs=(rng<10?rng.toFixed(1):Math.round(rng).toLocaleString())+" "+S.dst.toUpperCase(),ry=narrow?by-18:yB-12;
    T("RNG",cx,ry-15,10,"center",DIM);T(rs,cx,ry,15,"center",AR.lock===tg.n?"#ffbf00":SYM);res([cx-56,ry-24,112,28])}
  /* designated / locked target: track gates sized to the heading uncertainty; TGT / TGT LOCK above the box */
  if(des){const ang=Math.max(unc,Math.min(3,deg(Math.atan2(des.r*0.5,des.d)))),hw=Math.max(10,Math.min(W*0.18,28,ang*ppd*0.72)),hh=Math.max(8,Math.min(H*0.14,22,hw*0.75)),lk=AR.lock===des.n,c=lk?"#ffbf00":SYM;
    x.save();if(des.hid)x.setLineDash([6,5]);const g=Math.min(hw,hh)*0.5;x.strokeStyle="rgba(0,0,0,.85)";
    const gates=()=>{for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const X0=des.px+sx*hw,Y0=des.py+sy*hh;x.moveTo(X0-sx*g,Y0);x.lineTo(X0,Y0);x.lineTo(X0,Y0-sy*g)}};
    x.lineWidth=lk?3.5:3;x.beginPath();gates();x.stroke();x.strokeStyle=c;x.lineWidth=lk?2.2:1.5;x.beginPath();gates();x.stroke();
    if(lk){x.lineWidth=1;x.strokeRect(des.px-hw-3,des.py-hh-3,2*hw+6,2*hh+6)}x.restore();
    S2(()=>{x.moveTo(des.px-5,des.py);x.lineTo(des.px+5,des.py);x.moveTo(des.px,des.py-5);x.lineTo(des.px,des.py+5)},1.2);
    const tt=lk?"TGT LOCK":"TGT";x.font=F(10);const tw2=x.measureText(tt).width;let ty=des.py-hh-(lk?10:7);if(ty<tY+36)ty=des.py+hh+(lk?18:15);
    T(tt,des.px,ty,10,"center",c);res([des.px-tw2/2-3,ty-11,tw2+6,14]);res([des.px-hw-4,des.py-hh-4,2*hw+8,2*hh+8]);
    AR.hits.push({n:des.n,x0:des.px-hw-8,x1:des.px+hw+8,y0:des.py-hh-8,y1:des.py+hh+8})}
  /* off-screen cues: max 3 a side, stacked into free slots, lower priority dropped if no room */
  const yTop=tY+68,yBot=yB-4;
  const cue=(arr,side)=>{let n=0;for(const t of arr.filter(t=>Math.abs(t.dA)<=110||t.kind==="dest"||t.n===AR.lock).sort((a,b)=>pri(a)-pri(b))){if(n>=3)break;
    const nm=(t.n.length>16?t.n.slice(0,15)+"…":t.n).toUpperCase(),sub=Math.round(Math.abs(t.dA))+"° "+Math.round(fDst(t.d))+S.dst.toUpperCase();x.font=F(10);const mw=Math.max(x.measureText(nm).width,x.measureText(sub).width);
    let y=null;const order=[];for(let yy=cy-30;yy<=yBot-14;yy+=17)order.push(yy);for(let yy=cy-47;yy>=yTop;yy-=17)order.push(yy);
    for(const yy of order){const r=side<0?[0,yy-14,mw+26,30]:[W-mw-26,yy-14,mw+26,30];if(!hitR(r)){y=yy;res(r);break}}
    if(y==null){AR.lay.hidden++;continue}n++;AR.lay.cues++;
    const xx=side<0?6:W-6,c=t.n===AR.lock?"#ffbf00":SYM;
    x.fillStyle="rgba(0,0,0,.8)";x.beginPath();x.moveTo(xx,y);x.lineTo(xx-side*13,y-8);x.lineTo(xx-side*13,y+8);x.closePath();x.fill();x.fillStyle=c;x.beginPath();x.moveTo(xx+side*-1,y);x.lineTo(xx-side*12,y-6.5);x.lineTo(xx-side*12,y+6.5);x.closePath();x.fill();
    T(nm,xx-side*17,y-1,10,side<0?"left":"right",c);T(sub,xx-side*17,y+11,10,side<0?"left":"right",DIM);
    AR.hits.push({n:t.n,x0:side<0?0:W-mw-30,x1:side<0?mw+30:W,y0:y-14,y1:y+16})}};
  cue(offL.filter(t=>t.n!==(des&&des.n)),-1);cue(offR.filter(t=>t.n!==(des&&des.n)),1);
  /* other targets in view: box or diamond always; name only where it fits (right, then left), else hidden */
  const others=on.filter(t=>t!==des).sort((a,b)=>pri(a)-pri(b)).slice(0,9);
  for(const t of others){const s=Math.max(4,Math.min(26,Math.max(unc,Math.min(3,deg(Math.atan2(t.r*0.5,t.d))))*ppd*0.72));x.save();const bR=[t.px-s,t.py-s,2*s,2*s],undr=[RS[1],RS[2],RS[4]].some(q=>bR[0]<q[0]+q[2]&&bR[0]+bR[2]>q[0]&&bR[1]<q[1]+q[3]&&bR[1]+bR[3]>q[1]);x.globalAlpha=undr?.22:t.hid?.45:.9;
    if(s>7)S2(()=>{x.rect(t.px-s,t.py-s*0.7,2*s,1.4*s)},1);else S2(()=>{x.moveTo(t.px,t.py-5);x.lineTo(t.px+5,t.py);x.lineTo(t.px,t.py+5);x.lineTo(t.px-5,t.py);x.closePath()},1.2);
    const nm=(t.n.length>18?t.n.slice(0,17)+"…":t.n).toUpperCase();x.font=F(10);const lw=x.measureText(nm).width,ly=t.py-Math.max(s*0.7,5)+9;
    const cands=[[t.px+Math.max(s,5)+3,"left"],[t.px-Math.max(s,5)-3,"right"]];let done=false;
    for(const [lx,al] of cands){const r=al==="left"?[lx-2,ly-10,lw+4,13]:[lx-lw-2,ly-10,lw+4,13];if(r[0]<2||r[0]+r[2]>W-2||hitR(r))continue;res(r);T(nm,lx,ly,10,al,DIM);done=true;AR.lay.labels++;break}
    if(!done)AR.lay.hidden++;
    x.restore();AR.hits.push({n:t.n,x0:t.px-s-8,x1:t.px+s+8,y0:t.py-s-8,y1:t.py+s+8})}
}
$("arCv").addEventListener("click",e=>{const r=$("arCv").getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;const h=AR.hits.find(b=>px>=b.x0&&px<=b.x1&&py>=b.y0&&py<=b.y1);AR.lock=h?(AR.lock===h.n?null:h.n):null;if(AR.lock)try{voxPlay("target-locked")}catch(_){}hap(10)});
arUI();
document.querySelectorAll("#arBar .seg").forEach(s=>s.addEventListener("click",()=>setTimeout(arUI,0)));

/* ---------- v22: in-flight pack refresh (only when the phone has internet, e.g. aircraft Wi-Fi) ---------- */
let pkBusy=false;
async function packRefreshInFlight(force){const pk=packGet(),L=last;if(!pk||pkBusy||!L)return "nopack";const fr=apBy(pk.from),to=apBy(pk.to);if(!fr||!to)return "noroute";
  const air=["taxi","roll","climb","cruise","descent","approach"].includes(PH.p);
  if(!force&&(!air||!cfOk()||document.hidden||Date.now()-(pk.upd||pk.at)<15*60000))return "skip";
  const tot=dist(fr,to),fNow=Math.max(0,Math.min(1,1-dist(L,to)/tot)),idx=pk.smp.map((q,i)=>i).filter(i=>pk.smp[i].f>=fNow-0.03);if(!idx.length)return "done";
  const spd=Math.max(120,L.spd||230);pkBusy=true;
  try{const smp=await omSamples(idx.map(i=>pk.smp[i]),p=>Date.now()+Math.max(0,p.f-fNow)*tot/spd*1000);
    if(!smp.some(q=>q.lv.some(l=>l[2]!=null)))throw new Error("no data");
    idx.forEach((i,k)=>{pk.smp[i]=smp[k]});pk.upd=Date.now();pk.updN=idx.length;delete pk.updErr;
    store.set("pack_"+rtKey(pk.from,pk.to),pk);PK.key="";packRender();wxBtn();rtRender();try{drawMap();profAll()}catch(e){}
    try{packMsg("✓ Weather updated in flight at "+new Date(pk.upd).toTimeString().slice(0,5)+" for the remaining "+idx.length+" points.")}catch(e){}return "ok"}
  catch(e){pk.updErr=String(e&&e.message||e);return "fail"}finally{pkBusy=false}}
setInterval(()=>{packRefreshInFlight(false).catch(()=>{})},60000);
window.addEventListener("online",()=>setTimeout(()=>packRefreshInFlight(false).catch(()=>{}),3000));
window.cpPackRefresh=f=>packRefreshInFlight(!!f);

/* ================= v22: retro cockpits (F-4 Phantom-style, P-51 Mustang-style) =================
   Dial faces, bezels and panel textures rendered in Blender (g-*.webp, no needles); needles, cards and
   balls are drawn here from live GPS data. Engine, fuel and AOA are simulated from the flight phase. */
const RET={img:{},raf:0,lt:0,v:{},gmax:1,gmin:1,cv:null};
const RG={p51:["asi","ai","alt","tb","dg","vsi","mp","rpm","fuel","cmp"],f4:["asi","adi","alt","aoa","hsi","vvi","g","clock"]};
const RL={p51:{p:[["asi","ai","alt"],["tb","dg","vsi"],["mp","rpm","fuel"],[null,"cmp",null]],l:[["asi","ai","alt","mp","rpm"],["tb","dg","vsi","fuel","cmp"]]},
          f4:{p:[["asi","adi","alt"],["aoa","hsi","vvi"],["g","clock",null]],l:[["aoa","asi","adi","alt"],["g","clock","hsi","vvi"]]}};
const RA={p51_asi:v=>v*340/700,p51_alt:v=>v*36,p51_vsi:v=>270+v*170/6,p51_mp:v=>-150+(v-10)/65*300,p51_rpm:v=>-150+v/45*300,p51_fuel:v=>-120+v/90*240,
  f4_asi:v=>v<=250?(v-80)/170*150:150+(v-250)/600*190,f4_alt:v=>v*36,f4_vvi:v=>270+v*170/6,f4_aoa:v=>-135+v/30*270,f4_g:v=>-150+(v+4)/14*300};
if(!S.cockpit){S.cockpit="modern";saveS()}
const retroOn=()=>S.cockpit==="p51"||S.cockpit==="f4";
function retroLoad(ac){const out=[];for(const id of RG[ac].concat(["panel"])){const k=ac+"_"+id;if(RET.img[k])continue;const im=new Image();im.decoding="async";im.src="g-"+ac+"-"+id+".webp";im.onload=()=>{RET.dirty=true};RET.img[k]=im}}
function retroApply(){const on=retroOn();document.querySelector(".tile.hud").style.display=on?"none":"";$("retroTile").style.display=on?"":"none";
  if(on){retroLoad(S.cockpit);$("retroName").textContent=S.cockpit==="p51"?"P-51 Mustang-style panel":"F-4 Phantom-style panel"}
  if(fhOn){const want=on?$("retro"):$("hudwrap");if(want.parentNode!==$("fhSlot")){fhExit();fhEnter(false)}}
  RET.relay=(RET.relay||0)+1;if(!on&&RET.pop)retroPopClose();retroKick()}
document.querySelectorAll('.seg[data-k="cockpit"]').forEach(s=>s.addEventListener("click",()=>setTimeout(retroApply,0)));
$("fpBtn").onclick=()=>fhEnter(false);
function retroVisible(){if(!retroOn()||document.hidden)return false;if(fhOn||RET.pop)return true;const pg=PG.els[PG.i];return !!(pg&&pg.id==="pg-hud")}
function retroKick(){if(!RET.raf&&retroVisible())RET.raf=requestAnimationFrame(retroFrame)}
setInterval(retroKick,1000);document.addEventListener("visibilitychange",retroKick);$("pages").addEventListener("scroll",()=>setTimeout(retroKick,120),{passive:true});
/* live values (GPS ground speed stands in for airspeed) */
function retroData(dt){const tko=tkOn(),L=viewL()||last,now=Date.now(),V=RET.v,useSen=!tko&&S.att==="sen"&&sen.on,ta=tko?tkAtt():att;
  const kt=L&&L.spd!=null?L.spd*1.94384:0,ft=L&&L.alt!=null?L.alt*FT:0,vs=(L&&vsFpm())||0,trk=L&&L.trk!=null?L.trk:(V.trk||0),dec=L?(cmpDecl(L)||0):0;
  const pit=useSen?sen.p:ta.p,rol=useSen?sen.r:ta.r,rate=ta.rate||0,p=tko?tkPhase():PH.p,eng=!(p==="parked"&&kt<2&&!(PH.ev&&PH.ev.on==null&&PH.ev.roll));
  const tbl={parked:[eng?1000:0,eng?18:29.9-ft/1000],taxi:[1150,20],roll:[3000,61],climb:[2700,46],cruise:[2400,34+Math.min(4,ft/10000)],descent:[2100,24],approach:[2300,22],landed:[1200,18]}[p]||[0,29.9];
  const aoaT={parked:0,taxi:1,roll:4,climb:10,cruise:6.5,descent:5,approach:19,landed:2}[p];
  const T0=Math.max(216.65,288.15-0.0019812*ft),mach=kt/(38.967854*Math.sqrt(T0));
  let gg=gOn&&gS!=null?gS:1/Math.cos(rad(Math.max(-70,Math.min(70,rol))));RET.gmax=Math.max(RET.gmax,gg);RET.gmin=Math.min(RET.gmin,gg);
  const evs=PH.ev?Object.values(PH.ev).filter(v=>typeof v==="number"):[],t0=evs.length?Math.min(...evs):null,eh=t0?(now-t0)/3600000:0;
  const tgt={kt,mph:kt*1.15078,ft,vs,pit,rol,rate,trk,mag:((trk-dec)%360+360)%360,g:gg,aoa:(aoaT==null?0:aoaT)+(p==="cruise"||p==="climb"?pit*0.3:0),rpm:tbl[0],mp:Math.max(8,tbl[1]),fuel:Math.max(8,88-eh*30),mach,
    crs:(()=>{const to=tko?tkTo():apBy(S.to);return L&&to?brg(L,to):trk})(),dme:(()=>{const to=tko?tkTo():apBy(S.to);return L&&to?dist(L,to)/NMm:0})()};
  const k=dt?Math.min(1,dt*3.5):1,ang=new Set(["trk","mag","crs"]);
  for(const n in tgt){if(V[n]==null||!isFinite(V[n])){V[n]=tgt[n];continue}V[n]=ang.has(n)?((V[n]+k*w180(tgt[n]-V[n]))%360+360)%360:V[n]+(n==="mag"?k*0.4:k)*(tgt[n]-V[n])}
  V.slip=Math.sin(now/2300)*0.6+Math.sin(now/870)*0.3;return V}
function retroFrame(ts){RET.raf=0;if(!retroVisible())return;if(ts-RET.lt<45){RET.raf=requestAnimationFrame(retroFrame);return}const dt=RET.lt?Math.min(0.5,(ts-RET.lt)/1000):0;RET.lt=ts;
  try{retroDraw(retroData(dt))}catch(e){console.warn(e)}RET.raf=requestAnimationFrame(retroFrame)}
window.cpRetro=()=>({on:retroOn(),ac:S.cockpit||"modern",vis:retroVisible(),loaded:Object.values(RET.img).filter(i=>i.complete&&i.naturalWidth).length,v:RET.v,lay:RET.lay});
/* v24c: tap a gauge to pop it out enlarged (live). Tap anywhere on the pop-out to close. */
const RGN={asi:"Airspeed",ai:"Attitude",adi:"Attitude (ADI)",alt:"Altimeter",tb:"Turn and bank",dg:"Directional gyro",vsi:"Vertical speed",vvi:"Vertical velocity",mp:"Manifold pressure",rpm:"Tachometer",fuel:"Fuel",cmp:"Compass",aoa:"Angle of attack",hsi:"HSI",g:"G-meter",clock:"Clock"};
function retroPopSize(){const c=$("gzCv"),w=innerWidth,h=innerHeight,s=Math.max(160,Math.floor(Math.min(w-40,h-170,620))),dpr=window.devicePixelRatio||1;
  RET.popK=w+"|"+(w>h?"l":"p");c.style.width=c.style.height=s+"px";c.width=c.height=Math.round(s*dpr);RET.popS=s}
function retroPop(id){if(!id||!RG[S.cockpit]||!RG[S.cockpit].includes(id))return false;RET.pop=id;$("gzT").textContent=RGN[id]||id;$("gzCode").textContent=(S.cockpit==="p51"?"P-51":"F-4")+" · "+id.toUpperCase();
  $("gzOv").style.display="";retroPopSize();RET.lt=0;retroDraw(retroData(0));retroKick();return true}
function retroPopClose(){RET.pop=null;$("gzOv").style.display="none"}
function retroPopDraw(V){const c=$("gzCv");if(!c||!RET.pop)return;if(RET.popK!==innerWidth+"|"+(innerWidth>innerHeight?"l":"p"))retroPopSize();
  const s=RET.popS,dpr=window.devicePixelRatio||1,x=c.getContext("2d"),ac=S.cockpit;x.setTransform(dpr,0,0,dpr,0,0);
  x.fillStyle=RET.pat||(ac==="p51"?"#0b0b0a":"#2a2c2e");x.fillRect(0,0,s,s);gauge(x,ac,RET.pop,s/2,s/2,s*0.97,V)}
function retroHit(e){const cv=$("retroCv"),r=cv.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;
  for(const c of RET.cells||[])if(Math.hypot(px-c.cx,py-c.cy)<=c.s/2)return c.id;return null}
$("retroCv").addEventListener("click",e=>{const id=retroHit(e);if(id&&retroPop(id))e.stopPropagation()});
$("gzOv").addEventListener("click",retroPopClose);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&RET.pop)retroPopClose()});
window.cpRetroPop={open:retroPop,close:retroPopClose,state:()=>({id:RET.pop,size:RET.popS,cells:(RET.cells||[]).map(c=>({id:c.id,cx:Math.round(c.cx),cy:Math.round(c.cy),s:Math.round(c.s)}))})};
const RETRO_BOT=78;/* full panel: bottom strip kept clear for the callout banner (2 lines) + disclaimer line */
const RO={p51:["asi","ai","alt","tb","dg","vsi","mp","rpm","fuel","cmp"],f4:["aoa","asi","adi","alt","g","clock","hsi","vvi"]};
function retroDraw(V){const ac=S.cockpit,box=$("retro"),cv=$("retroCv"),dpr=window.devicePixelRatio||1;
  const full=fhOn&&box.parentNode===$("fhSlot");let W=box.clientWidth,H;const land=full?box.clientWidth/Math.max(1,box.clientHeight)>1.25:false;
  let lay,cols,rows,cw,ch;
  /* v24c: size is locked per width/orientation. Scrolling the page or the iOS URL bar growing/shrinking must not
     resize the canvas (that was the stretch/distortion while scrolling). Tile height is captured once
     for this width; the full panel only ever shrinks to the smallest height seen (so nothing is clipped when the
     URL bar returns). Both reset only on a real width/orientation change. Position is measured scroll-invariant. */
  const lk=RET.lk||(RET.lk={}),key=Math.round(W)+"|"+(innerWidth>innerHeight?"l":"p")+"|"+(full?"f":"t")+"|"+ac+"|"+(RET.relay||0);
  if(lk.key!==key){lk.key=key;lk.ph=Infinity;lk.fh=Infinity;lk.av=null}
  let avail=0;if(!full){const pg=$("pg-hud"),nt=$("retroTile").querySelector(".note"),pr=pg.getBoundingClientRect(),off=box.getBoundingClientRect().top-pr.top+pg.scrollTop;
    if(lk.ph===Infinity)lk.ph=pg.clientHeight;const a=Math.floor(pr.top+lk.ph-(pr.top+off)-(nt?nt.offsetHeight+8:0)-34);
    if(lk.av==null)lk.av=a;avail=lk.av}
  if(full||avail>W*1.25){if(full){lk.fh=Math.min(lk.fh,box.clientHeight);H=lk.fh}else H=avail;if(full&&cv.style.height!==H+"px")cv.style.height=H+"px";const ids=RO[ac],n=ids.length,top=full?Math.max(52,parseFloat(getComputedStyle($("fhOv")).paddingTop)||0):0,bot=full?RETRO_BOT:18,AH=Math.max(50,H-top-bot);if(!full&&cv.style.height!==H+"px")cv.style.height=H+"px";let best=null;
    for(let c=2;c<=6;c++){const r=Math.ceil(n/c),cell=Math.min(W/c,AH/r);if(r*c-n>2)continue;if(!best||cell>best.cell+0.5)best={c,r,cell}}
    cols=best.c;rows=best.r;lay=[];for(let r=0;r<rows;r++)lay.push(ids.slice(r*cols,r*cols+cols).concat(Array(cols).fill(null)).slice(0,cols));
    cw=W/cols;ch=AH/rows;RET.top=top;RET.fillMode=full?"full":"tile"}
  else{lay=RL[ac].p;cols=lay[0].length;rows=lay.length;cw=ch=W/cols;H=Math.round(ch*rows+8);if(cv.style.height!==H+"px")cv.style.height=H+"px";RET.top=0;RET.fillMode=""}
  if(!W||!H)return;if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}
  const x=cv.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);const cell=Math.min(cw,ch);RET.lay={land,cols,rows,cell:Math.round(cell),fill:+((cell*cols*cell*rows)/(W*H)).toFixed(2)};
  const pi=RET.img[ac+"_panel"];if(pi&&pi.complete&&pi.naturalWidth){if(!RET.pat||RET.patK!==ac){RET.pat=x.createPattern(pi,"repeat");RET.patK=ac}x.fillStyle=RET.pat}else x.fillStyle=ac==="p51"?"#0b0b0a":"#2a2c2e";x.fillRect(0,0,W,H);
  const oy=RET.top||(full?0:(H-ch*rows)/2);
  RET.cells=[];lay.forEach((row,r)=>row.forEach((id,c)=>{const cx=cw*(c+.5),cy=oy+ch*(r+.5);if(id){gauge(x,ac,id,cx,cy,cell*0.97,V);RET.cells.push({id,cx,cy,s:cell*0.97})}else placard(x,ac,cx,cy,cell)}));
  if(RET.pop)retroPopDraw(V);
  if(full||RET.fillMode==="tile"&&avail>W*1.25){x.save();x.font="700 10px \"B612 Mono\",monospace";x.textAlign="center";x.fillStyle=ac==="p51"?"#d9cfb0":"#e8e8e8";x.globalAlpha=.7;x.fillText("GPS-DRIVEN · ENTERTAINMENT ONLY · NOT FOR NAVIGATION",W/2,H-6);x.restore()}}
function placard(x,ac,cx,cy,cell){const w=cell*0.78,h=cell*0.34;x.save();x.fillStyle=ac==="p51"?"#1a1915":"#3a3d40";x.strokeStyle="rgba(0,0,0,.6)";x.lineWidth=2;x.fillRect(cx-w/2,cy-h/2,w,h);x.strokeRect(cx-w/2,cy-h/2,w,h);
  x.fillStyle=ac==="p51"?"#d9cfb0":"#e8e8e8";x.textAlign="center";x.font="700 "+Math.round(cell*0.065)+"px \"B612 Mono\",monospace";x.fillText(ac==="p51"?"GPS-DRIVEN DISPLAY":"GPS-DRIVEN DISPLAY",cx,cy-cell*0.03);
  x.font=Math.round(cell*0.055)+"px \"B612 Mono\",monospace";x.fillText("ENTERTAINMENT ONLY",cx,cy+cell*0.06);x.fillText("NOT FOR NAVIGATION",cx,cy+cell*0.13);x.restore()}
function needle(x,u,a,len,w,col,tail,style){x.save();x.rotate(rad(a));const L=len*u,Tl=(tail||0.18)*u,W=w*u;
  for(const pass of [0,1]){x.save();if(!pass){x.translate(u*0.025,u*0.035);x.fillStyle="rgba(0,0,0,.45)"}else x.fillStyle=col;
    x.beginPath();if(style==="lance"){x.moveTo(0,-L);x.lineTo(W*0.9,-L*0.82);x.lineTo(W*0.5,Tl);x.lineTo(-W*0.5,Tl);x.lineTo(-W*0.9,-L*0.82)}else if(style==="tri"){x.moveTo(0,-L);x.lineTo(W*1.6,-L*0.78);x.lineTo(W*0.35,0);x.lineTo(-W*0.35,0);x.lineTo(-W*1.6,-L*0.78)}else{x.moveTo(0,-L);x.lineTo(W*0.55,-L*0.9);x.lineTo(W*0.6,Tl);x.lineTo(-W*0.6,Tl);x.lineTo(-W*0.55,-L*0.9)}
    x.closePath();x.fill();if(pass&&tail){x.fillStyle="#111";x.fillRect(-W*0.7,u*0.02,W*1.4,Tl-u*0.02)}x.restore()}x.restore()}
function hub(x,u,col){const g=x.createRadialGradient(-u*0.02,-u*0.02,0,0,0,u*0.075);g.addColorStop(0,"#666");g.addColorStop(1,"#0a0a0a");x.fillStyle=g;x.beginPath();x.arc(0,0,u*0.07,0,7);x.fill();if(col){x.fillStyle=col;x.beginPath();x.arc(0,0,u*0.022,0,7);x.fill()}}
function glare(x,u){const g=x.createLinearGradient(-u*0.7,-u*0.8,u*0.3,u*0.4);g.addColorStop(0,"rgba(255,255,255,.10)");g.addColorStop(.45,"rgba(255,255,255,.025)");g.addColorStop(.5,"rgba(255,255,255,0)");x.fillStyle=g;x.beginPath();x.arc(0,0,u*0.95,0,7);x.fill()}
function strip(x,u,hdg,w,h,y,style){x.save();x.beginPath();x.rect(-w/2*u,-(y+h/2)*u,w*u,h*u);x.clip();x.fillStyle=style==="cmp"?"#d8d0b4":"#121212";x.fillRect(-w/2*u,-(y+h/2)*u,w*u,h*u);
  const ppd=style==="cmp"?0.03*u:0.032*u,ink=style==="cmp"?"#151515":"#e9e1c6",cy=-y*u;x.strokeStyle=ink;x.fillStyle=ink;x.textAlign="center";x.textBaseline="middle";
  for(let d=Math.floor(hdg-30);d<=hdg+30;d++){if(d%5)continue;const px=(d-hdg)*ppd,dd=((d%360)+360)%360,big=dd%10===0;x.lineWidth=big?u*0.012:u*0.007;x.beginPath();x.moveTo(px,cy+h/2*u);x.lineTo(px,cy+h/2*u-(big?0.09:0.05)*u);x.stroke();
    if(dd%30===0){x.font="700 "+Math.round(u*0.14)+"px \"B612\",sans-serif";x.fillText(({0:"N",90:"E",180:"S",270:"W"})[dd]||String(dd/10),px,cy-0.03*u)}}
  const g=x.createLinearGradient(-w/2*u,0,w/2*u,0);g.addColorStop(0,"rgba(0,0,0,.65)");g.addColorStop(.25,"rgba(0,0,0,0)");g.addColorStop(.75,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.65)");x.fillStyle=g;x.fillRect(-w/2*u,-(y+h/2)*u,w*u,h*u);x.restore()}
function digits(x,u,s,cx,cy,w,h,col,bg){x.save();x.fillStyle=bg||"#0c0c0c";x.fillRect((cx-w/2)*u,(-cy-h/2)*u,w*u,h*u);x.fillStyle=col||"#f0f0f0";x.font="700 "+Math.round(h*u*0.78)+"px \"B612 Mono\",monospace";x.textAlign="center";x.textBaseline="middle";x.fillText(s,cx*u,-cy*u+u*0.005);x.restore()}
function gauge(x,ac,id,cx,cy,s,V){const u=s/2.24,img=RET.img[ac+"_"+id],P51=ac==="p51",NC=P51?"#ece4c8":"#f4f4f4";x.save();x.translate(cx,cy);
  /* layers under the face */
  if(id==="ai"||id==="adi"){const r=(id==="ai"?0.79:0.82)*u;x.save();x.beginPath();x.arc(0,0,r,0,7);x.clip();x.rotate(rad(-V.rol));const py=V.pit*(id==="ai"?0.028:0.024)*u;
    x.fillStyle=id==="ai"?"#2d5f86":"#bfc2c4";x.fillRect(-2*r,-2*r+py,4*r,2*r);x.fillStyle=id==="ai"?"#4a3218":"#161616";x.fillRect(-2*r,py,4*r,2*r);
    x.strokeStyle=id==="ai"?"#f2f2f2":"#ffffff";x.lineWidth=u*0.018;x.beginPath();x.moveTo(-2*r,py);x.lineTo(2*r,py);x.stroke();
    x.lineWidth=u*0.008;x.fillStyle=id==="ai"?"#f2f2f2":"#ffffff";x.font="700 "+Math.round(u*0.08)+"px \"B612 Mono\",monospace";x.textAlign="center";x.textBaseline="middle";
    for(let p=-30;p<=30;p+=(id==="ai"?10:5)){if(!p)continue;const y=py-p*(id==="ai"?0.028:0.024)*u,ww=(p%10?0.12:0.24)*u;x.strokeStyle=id==="adi"&&p<0?"#e8e8e8":(id==="adi"?"#111":"#f2f2f2");x.beginPath();x.moveTo(-ww,y);x.lineTo(ww,y);x.stroke();if(p%10===0&&id==="adi"){x.fillStyle=p<0?"#e8e8e8":"#111";x.fillText(String(Math.abs(p)),-ww-0.08*u,y);x.fillText(String(Math.abs(p)),ww+0.08*u,y)}}
    /* bank pointer on the card */
    x.fillStyle=id==="ai"?"#f2f2f2":"#ff8c1a";x.beginPath();x.moveTo(0,-r+0.02*u);x.lineTo(-0.05*u,-r+0.12*u);x.lineTo(0.05*u,-r+0.12*u);x.closePath();x.fill();
    const sh=x.createRadialGradient(0,0,r*0.5,0,0,r);sh.addColorStop(0,"rgba(0,0,0,0)");sh.addColorStop(1,"rgba(0,0,0,.45)");x.fillStyle=sh;x.beginPath();x.arc(0,0,r*2,0,7);x.fill();x.restore()}
  if(id==="dg")strip(x,u,V.trk,1.25,0.36,0.03,"dg");
  if(id==="cmp")strip(x,u,V.mag,1.1,0.4,0.03,"cmp");
  if(id==="hsi"){const r=0.85*u;x.save();x.beginPath();x.arc(0,0,r,0,7);x.clip();x.fillStyle="#0b0b0b";x.fillRect(-r,-r,2*r,2*r);x.save();x.rotate(rad(-V.trk));x.strokeStyle="#f2f2f2";x.fillStyle="#f2f2f2";x.textAlign="center";x.textBaseline="middle";
    for(let d=0;d<360;d+=5){x.save();x.rotate(rad(d));x.lineWidth=d%10?u*0.008:u*0.014;x.beginPath();x.moveTo(0,-r);x.lineTo(0,-r+(d%10?0.06:0.11)*u);x.stroke();if(d%30===0){x.font="700 "+Math.round(u*0.12)+"px \"B612\",sans-serif";x.fillText(({0:"N",90:"E",180:"S",270:"W"})[d]||String(d/10),0,-r+0.22*u)}x.restore()}
    x.restore();x.save();x.rotate(rad(V.crs-V.trk));x.fillStyle="#ffd21a";x.strokeStyle="#000";x.lineWidth=1;x.beginPath();x.moveTo(0,-0.62*u);x.lineTo(-0.07*u,-0.46*u);x.lineTo(-0.025*u,-0.46*u);x.lineTo(-0.025*u,0.6*u);x.lineTo(0.025*u,0.6*u);x.lineTo(0.025*u,-0.46*u);x.lineTo(0.07*u,-0.46*u);x.closePath();x.fill();x.stroke();x.restore();
    x.fillStyle="#f2f2f2";x.font="700 "+Math.round(u*0.075)+"px \"B612 Mono\",monospace";x.textAlign="left";x.fillText("DME "+String(Math.round(V.dme)).padStart(4," "),-0.5*u,-0.5*u);x.textAlign="right";x.fillText("CRS "+p3(V.crs),0.5*u,-0.5*u);x.restore()}
  if(id==="alt"&&P51)digits(x,u,"29.92",0.5,-0.02,0.3,0.13,"#e9e1c6","#141414");
  if(id==="alt"&&!P51){const f=Math.max(0,Math.round(V.ft/20)*20);digits(x,u,String(Math.floor(f/1000)).padStart(2,"0")+" "+String(Math.floor(f%1000/100))+"00",0,0.25,0.62,0.19);digits(x,u,"29.92",0,-0.46,0.4,0.12)}
  if(id==="asi"&&!P51)digits(x,u,V.mach.toFixed(2).replace(/^0/,""),0,-0.36,0.46,0.15);
  /* face (Blender) */
  if(img&&img.complete&&img.naturalWidth)x.drawImage(img,-s/2,-s/2,s,s);else{x.fillStyle="#111";x.beginPath();x.arc(0,0,u,0,7);x.fill()}
  /* needles / fixed symbols over the face */
  const NS=P51?"lance":"bar";
  switch(id){
    case "asi":needle(x,u,P51?RA.p51_asi(Math.max(0,Math.min(700,V.mph))):RA.f4_asi(Math.max(80,Math.min(850,V.kt))),0.86,0.035,NC,0.2,NS);hub(x,u);break;
    case "alt":{const ft=Math.max(0,V.ft);needle(x,u,(ft/100000)*360,0.9,0.012,NC,0.05,"tri");needle(x,u,(ft%10000)/10000*360,0.55,0.05,NC,0.12,P51?"lance":"bar");needle(x,u,(ft%1000)/1000*360,0.84,0.03,NC,0.2,NS);hub(x,u);break}
    case "vsi":case "vvi":needle(x,u,RA.p51_vsi(Math.max(-6,Math.min(6,V.vs/1000))),0.84,0.035,NC,0.2,NS);hub(x,u);break;
    case "mp":needle(x,u,RA.p51_mp(Math.max(10,Math.min(75,V.mp))),0.84,0.035,NC,0.2,NS);hub(x,u);break;
    case "rpm":needle(x,u,RA.p51_rpm(Math.max(0,Math.min(45,V.rpm/100))),0.84,0.035,NC,0.2,NS);hub(x,u);break;
    case "fuel":needle(x,u,RA.p51_fuel(Math.max(0,Math.min(90,V.fuel))),0.8,0.035,NC,0.18,NS);hub(x,u);break;
    case "aoa":needle(x,u,RA.f4_aoa(Math.max(0,Math.min(30,V.aoa))),0.8,0.035,NC,0.2,NS);hub(x,u);break;
    case "g":needle(x,u,RA.f4_g(Math.max(-4,Math.min(10,RET.gmax))),0.78,0.022,"#ff9a3c",0.05,"bar");needle(x,u,RA.f4_g(Math.max(-4,Math.min(10,RET.gmin))),0.78,0.022,"#ff9a3c",0.05,"bar");needle(x,u,RA.f4_g(Math.max(-4,Math.min(10,V.g))),0.84,0.035,NC,0.2,NS);hub(x,u);break;
    case "clock":{const d=new Date(),sec=d.getSeconds()+d.getMilliseconds()/1000,mi=d.getMinutes()+sec/60,hr=d.getHours()%12+mi/60;needle(x,u,hr*30,0.5,0.045,NC,0.1,"bar");needle(x,u,mi*6,0.78,0.032,NC,0.12,"bar");needle(x,u,sec*6,0.84,0.012,"#ff8c1a",0.2,"bar");hub(x,u);break}
    case "tb":{needle(x,u,Math.max(-45,Math.min(45,V.rate/3*22)),0.72,0.04,NC,0.0,"lance");hub(x,u);
      /* inclinometer: glass tube with ball */
      x.save();x.lineCap="round";x.strokeStyle="#cfc7a9";x.lineWidth=u*0.13;x.beginPath();x.arc(0,0,0.58*u,rad(90-30+180)-Math.PI,rad(90+30+180)-Math.PI,false);x.stroke();
      x.strokeStyle="#151515";x.lineWidth=u*0.012;for(const a of [-7,7]){const t=rad(90+a);x.beginPath();x.moveTo(Math.cos(t)*0.5*u,Math.sin(t)*0.5*u);x.lineTo(Math.cos(t)*0.66*u,Math.sin(t)*0.66*u);x.stroke()}
      const bt=rad(90-V.slip*6);const bx=Math.cos(bt)*0.58*u,by=Math.sin(bt)*0.58*u,g=x.createRadialGradient(bx-u*0.015,by-u*0.015,0,bx,by,u*0.055);g.addColorStop(0,"#666");g.addColorStop(1,"#050505");x.fillStyle=g;x.beginPath();x.arc(bx,by,u*0.05,0,7);x.fill();x.restore();break}
    case "ai":{x.strokeStyle="#ff9a1f";x.lineWidth=u*0.03;x.lineCap="round";x.beginPath();x.moveTo(-0.42*u,0);x.lineTo(-0.12*u,0);x.lineTo(-0.06*u,0.06*u);x.moveTo(0.42*u,0);x.lineTo(0.12*u,0);x.lineTo(0.06*u,0.06*u);x.stroke();x.fillStyle="#ff9a1f";x.beginPath();x.arc(0,0,u*0.025,0,7);x.fill();break}
    case "adi":{x.strokeStyle="#000";x.lineWidth=u*0.05;x.lineCap="round";const sym=()=>{x.beginPath();x.moveTo(-0.5*u,0);x.lineTo(-0.16*u,0);x.lineTo(-0.08*u,0.08*u);x.lineTo(0,0);x.lineTo(0.08*u,0.08*u);x.lineTo(0.16*u,0);x.lineTo(0.5*u,0);x.stroke()};sym();x.strokeStyle="#ff8c1a";x.lineWidth=u*0.028;sym();break}
    case "hsi":{x.fillStyle="#f4f4f4";x.strokeStyle="#000";x.lineWidth=1;x.beginPath();x.moveTo(0,-0.16*u);x.lineTo(0.03*u,-0.05*u);x.lineTo(0.16*u,0.02*u);x.lineTo(0.16*u,0.05*u);x.lineTo(0.03*u,0.03*u);x.lineTo(0.02*u,0.12*u);x.lineTo(0.06*u,0.15*u);x.lineTo(-0.06*u,0.15*u);x.lineTo(-0.02*u,0.12*u);x.lineTo(-0.03*u,0.03*u);x.lineTo(-0.16*u,0.05*u);x.lineTo(-0.16*u,0.02*u);x.lineTo(-0.03*u,-0.05*u);x.closePath();x.fill();x.stroke();
      x.fillStyle="#ff8c1a";x.beginPath();x.moveTo(0,-0.85*u);x.lineTo(-0.035*u,-0.95*u);x.lineTo(0.035*u,-0.95*u);x.closePath();x.fill();break}
  }
  glare(x,u);x.restore()}
applySeg();retroApply();

/* ================= v26: recorded callout pack =================
   Short recorded callouts (v-*.mp3 in the app folder, ElevenLabs premade voice "Daniel", a calm broadcast voice, 40 kbps mono,
   precached by the service worker) for the key moments; everything else, the dynamic detail (names, times, numbers), and any
   clip that is missing or fails to play, falls back to the phone's own voice. Settings → Voice: Recorded / System / Off.
   (The stored setting keeps its old value "female" so existing phones carry on.) */
const VOX={"v1":"V one","rotate":"Rotate","positive-climb":"Positive climb","top-of-descent":"Top of descent","approaching":"Approaching destination",
  "fifty-above":"Fifty above","minimums":"Minimums","50":"Fifty","40":"Forty","30":"Thirty","20":"Twenty","10":"Ten",
  "landed":"Landed","parked":"Parked","target-locked":"Target locked","altitude":"Altitude, altitude","bingo":"Bingo fuel",
  "takeoff-roll":"Takeoff roll","cruise":"Reaching cruise","tod-5":"Top of descent in five minutes","ten-thousand":"Passing ten thousand","go-around":"Going around","turbulence":"Turbulence ahead","state-line":"Crossing state line",
  "drive-on":"Drive mode on. Passenger only.","flight-mode":"Flight mode","drive-started":"Drive started","rest-stop":"Rest stop. Time for the driver to take a break.","arriving":"Arriving at destination",
  "game-on":"Alien game on. Passengers only.","game-off":"Game off","contact":"Contact. Alien bogey inbound.","fox":"Fox three","guns":"Guns, guns","splash":"Splash one","mothership":"Mothership down",
  "ground-hot":"Alien ground forces. Cleared hot.","winchester":"Winchester","gunship":"Gunship view","mission":"Mission complete","badge":"New patch earned"};
const VOXQ={q:[],cur:null,bad:{},el:{},n:0};
if(!S.vox){S.vox="female";saveS()}
function voxFemale(v){try{const en=v.filter(x=>/^en/i.test(x.lang)),f=/female|karen|catherine|samantha|serena|moira|tessa|fiona|victoria|allison|ava|susan|zira|hazel|libby|natasha|sonia|aria|jenny/i;
  return en.find(x=>/en-AU/i.test(x.lang)&&f.test(x.name))||en.find(x=>f.test(x.name))||null}catch(e){return null}}
function voxTTS(text){try{const u=new SpeechSynthesisUtterance(text);if(auVoice)u.voice=auVoice;u.rate=1.05;speechSynthesis.speak(u)}catch(e){}}
function voxNext(){if(VOXQ.cur||!VOXQ.q.length)return;const it=VOXQ.q.shift();
  if(it.tts){VOXQ.cur=it;voxTTS(it.tts);VOXQ.cur=null;voxNext();return}
  const k=it.k;if(VOXQ.bad[k]){VOXQ.q.unshift({tts:VOX[k]});voxNext();return}
  let a=VOXQ.el[k];if(!a){a=new Audio("v-"+k+".mp3");a.preload="auto";VOXQ.el[k]=a}
  VOXQ.cur=it;VOXQ.n++;const done=()=>{a.onended=a.onerror=null;VOXQ.cur=null;setTimeout(voxNext,it.gap||60)};
  a.onended=done;a.onerror=()=>{VOXQ.bad[k]=1;VOXQ.cur=null;VOXQ.q.unshift({tts:VOX[k]});voxNext()};
  try{a.currentTime=0;const p=a.play();if(p&&p.catch)p.catch(()=>{if(VOXQ.cur===it){VOXQ.bad[k]=1;VOXQ.cur=null;VOXQ.q.unshift({tts:VOX[k]});voxNext()}})}catch(e){a.onerror()}
  setTimeout(()=>{if(VOXQ.cur===it)done()},4500)}
/* play one callout now (heights cut the queue so they stay on time) */
function voxPlay(k,urgent){if(!voiceOn||S.vox==="off"||!VOX[k])return false;
  if(S.vox!=="female"){try{if(urgent)speechSynthesis.cancel()}catch(e){}voxTTS(VOX[k]);return true}
  if(urgent){VOXQ.q=VOXQ.q.filter(x=>!x.h);}VOXQ.q.push({k,h:!!urgent});voxNext();return true}
/* the app's spoken lines that have a recorded clip: play the clip, then speak any dynamic detail with the phone voice.
   [pattern, clip, rest(text) -> extra words to speak, or "" for none] */
const VOXMAP=[[/^Airborne at /,"positive-climb",()=>""],[/^Top of descent\. /,"top-of-descent",()=>""],[/^On approach,/,"approaching",()=>""],
  [/touchdown/i,"landed",t=>t.replace(/^.*?touchdown[^.]*\.\s*/i,"")],[/^Parked\./,"parked",t=>t.replace(/^Parked\.\s*/,"")],
  [/^Takeoff roll\.$/,"takeoff-roll",()=>""],[/^Reaching cruise/,"cruise",t=>t.replace(/^Reaching cruise,?\s*/,"")],[/^Top of descent in about (5|five) minutes\.$/,"tod-5",()=>""],
  [/^Passing ten thousand feet\./,"ten-thousand",t=>t.replace(/^Passing ten thousand feet\.\s*/,"")],[/^Going around\.$/,"go-around",()=>""],
  [/^Turbulence master warning\./,"turbulence",t=>t.replace(/^Turbulence master warning\.\s*/,"")],[/^Crossing into /,"state-line",t=>t.replace(/^Crossing into /,"Now in ")],
  [/^Drive mode on\. Passenger only\.$/,"drive-on",()=>""],[/^Flight mode\.$/,"flight-mode",()=>""],[/^Drive started/,"drive-started",t=>t.replace(/^Drive started\.?\s*/,"").replace(/^to /,"Heading to ").replace(/\s*Passenger mode\.$/,"")],
  [/^Rest stop reminder\./,"rest-stop",t=>{const m=t.match(/About [^.]+ of driving\./);return m?m[0]:""}],[/^Arriving at /,"arriving",t=>t.replace(/^Arriving at /,"")]];
function voxSay(text,low){if(S.vox!=="female"||!voiceOn)return false;const m=VOXMAP.find(r=>r[0].test(text));if(!m)return false;
  VOXQ.q.push({k:m[1]});let rest="";try{rest=(m[2](text)||"").trim()}catch(e){}if(rest&&rest!==text)VOXQ.q.push({tts:rest});voxNext();return true}
/* callouts the older app never made: V1 / rotate on the roll, height calls on short final, altitude, bingo */
const VXS={said:{},lastAlt:0,tm:[]};
function voxTick(){const L=last;if(!L||!voiceOn||S.vox==="off")return;const p=PH.p,kt=(L.spd||0)*1.94384,now=Date.now();
  if(p==="taxi"||p==="parked"){VXS.said={};VXS.tm.forEach(clearTimeout);VXS.tm=[]}
  if(p==="roll"){if(kt>=125&&!VXS.said.v1){VXS.said.v1=1;voxPlay("v1")}if(kt>=140&&!VXS.said.vr){VXS.said.vr=1;voxPlay("rotate")}}
  if(p==="approach"||p==="descent"){const to=apBy(S.to),ai=to?apInfo(to.c):null,fe=ai&&ai[4]!=null?ai[4]:null;if(fe==null||L.alt==null)return;
    const agl=L.alt*FT-fe,vs=vsFpm()||0,rate=Math.max(4,-vs/60);/* ft/s down */
    const steps=[[250,"fifty-above"],[200,"minimums"],[50,"50"],[40,"40"],[30,"30"],[20,"20"],[10,"10"]];
    for(const [h,k] of steps){if(VXS.said["h"+h])continue;if(agl<h-60){VXS.said["h"+h]=1;continue}
      const dt=(agl-h)/rate;if(agl<=h+2||dt<1.15){VXS.said["h"+h]=1;VXS.tm.push(setTimeout(()=>voxPlay(k,true),Math.max(0,dt)*1000))}}}
  if(p==="cruise"&&PH.ev&&PH.ev.cr!=null&&L.alt!=null&&Math.abs(L.alt-PH.ev.cr)*FT>300&&now-VXS.lastAlt>300000&&!(vsFpm()<-700)){VXS.lastAlt=now;voxPlay("altitude")}
  if((S.cockpit==="p51"||S.cockpit==="f4")&&RET.v&&RET.v.fuel!=null&&RET.v.fuel<20&&!VXS.said.bingo&&["climb","cruise","descent"].includes(p)){VXS.said.bingo=1;voxPlay("bingo")}}
setInterval(()=>{try{voxTick()}catch(e){}},500);
document.querySelectorAll('.seg[data-k="vox"]').forEach(s=>s.addEventListener("click",()=>setTimeout(()=>{pickVoice();if(S.vox!=="off"&&voiceOn)voxPlay("minimums")},0)));
window.cpVox=k=>k?voxPlay(k):({mode:S.vox,played:VOXQ.n,bad:Object.keys(VOXQ.bad),voice:auVoice?auVoice.name:null});
applySeg();
/* ---------- v22f: HUD weather scenes from the route pack (Blender-rendered backgrounds + windscreen rain) ---------- */
Object.assign(SCNI,{"wx-sct":"bg-wx-sct.webp","wx-bkn":"bg-wx-bkn.webp","wx-tops":"bg-wx-tops.webp","wx-ovc":"bg-wx-ovc.webp","wx-rain":"bg-wx-rain.webp","wx-storm":"bg-wx-storm.webp","wx-haze":"bg-wx-haze.webp","wx-fog":"bg-wx-fog.webp",
  "wx-tops-dusk":"bg-wx-tops-dusk.webp","wx-ovc-dusk":"bg-wx-ovc-dusk.webp","wx-storm-dusk":"bg-wx-storm-dusk.webp","wx-ovc-night":"bg-wx-ovc-night.webp","wx-storm-night":"bg-wx-storm-night.webp","wx-fog-night":"bg-wx-fog-night.webp"});
Object.assign(SCNN,{"wx-sct":"SCATTERED","wx-bkn":"BROKEN","wx-tops":"ABOVE CLOUD","wx-ovc":"OVERCAST","wx-rain":"RAIN","wx-storm":"STORM","wx-haze":"HAZE","wx-fog":"FOG",
  "wx-tops-dusk":"ABOVE CLOUD DUSK","wx-ovc-dusk":"OVERCAST DUSK","wx-storm-dusk":"STORM DUSK","wx-ovc-night":"OVERCAST NIGHT","wx-storm-night":"STORM NIGHT","wx-fog-night":"FOG NIGHT"});
if(S.wxs==null)S.wxs="on";
let WXF=null,WXO=null,wxLab="",wxCur={k:"",cond:"",drops:"",tint:"",src:""};
/* forecast sample for where we are now: nearest route-pack point by route fraction, ignored if far off the route or more than 12 h from its forecast hour */
function wxNow(){if(WXF)return WXF;const pk=packGet(),L=tkOn()?tkLive():last;if(!pk||!Array.isArray(pk.smp)||!pk.smp.length||!L)return null;
  const fr=apBy(pk.from),to=apBy(pk.to);if(!fr||!to)return null;const tot=dist(fr,to),f=Math.max(0,Math.min(1,1-dist(L,to)/tot));
  let q=null,bd=9;for(const s of pk.smp){const d=Math.abs(s.f-f);if(d<bd){bd=d;q=s}}
  if(!q||dist(L,q)>250000)return null;if(!demo&&!REPLAY&&q.t&&Math.abs(Date.now()-q.t)>12*3600000)return null;return q}
/* Open-Meteo sample -> condition. WMO codes: 45/48 fog, 51-57 drizzle, 61-67 rain, 71-77 snow, 80-82 showers, 85/86 snow showers, 95-99 thunderstorm */
function wxClass(q){if(!q)return "none";const wc=q.wc==null?-1:Math.round(q.wc),cc=q.cc==null?null:q.cc,pr=q.pr||0,vis=q.vis==null?null:q.vis;
  if(wc>=95||(q.cape!=null&&q.cape>=1500&&wc>=80&&wc<=82))return "storm";
  if(wc===45||wc===48||(vis!=null&&vis<1000))return "fog";
  if([65,67,82].includes(wc)||pr>=2.5)return "rainH";
  if((wc>=51&&wc<=67)||(wc>=71&&wc<=77)||(wc>=80&&wc<=86)||pr>=0.2)return "rain";
  if(vis!=null&&vis<5000)return "haze";
  if(cc==null)return wc===3?"ovc":wc===2?"bkn":wc===1?"sct":"none";
  return cc>=88?"ovc":cc>=55?"bkn":cc>=20?"sct":"clear"}
/* condition + phase + height + daylight -> background key and windscreen overlay. Falls back to the normal scene (base) when no image fits. */
function wxScene(base,sp){const q=wxNow(),c=wxClass(q);const r={k:base,cond:c,drops:"",tint:"",src:q?(WXF?"forced":"pack"):""};if(c==="none"||c==="clear")return r;
  const O=WXO||{},L=last,tod=O.tod||(sp.el<-6?"night":sp.el<6?"dusk":"day"),gnd=O.at?O.at==="gnd":GROUND.includes(PH.p)&&!(demo&&demo.stg==="air"),app=O.at?O.at==="app":PH.p==="approach";
  const agl=O.at?(O.at==="high"?9000:O.at==="app"?400:O.at==="low"?900:0):L&&L.alt!=null?L.alt-(PH.alt0||0):0,low=gnd||app||agl<3000,fam=n=>tod==="day"?"wx-"+n:("wx-"+n+"-"+tod) in SCNI?"wx-"+n+"-"+tod:null;
  const rainy=c==="rain"||c==="rainH";
  if(gnd){
    if(c==="fog")r.k=tod==="night"?"wx-fog-night":"wx-fog";
    else if(c==="storm"){r.drops="heavy";r.tint="storm"}
    else if(c==="rainH"){r.drops="heavy";r.tint="rain"}
    else if(c==="rain"){r.drops="light";r.tint="rain"}
    else if(c==="ovc")r.tint="ovc";else if(c==="haze")r.tint="haze";
    return r}
  if(low){
    if(c==="storm"){r.k=fam("storm")||base;if(agl<1500)r.drops="heavy"}
    else if(c==="fog"&&app&&agl<600)r.k=tod==="night"?"wx-fog-night":"wx-fog";
    else if(rainy||c==="fog"||c==="ovc"){r.k=tod==="day"?(rainy?"wx-rain":"wx-ovc"):fam("ovc")||base;if(rainy)r.drops=c==="rainH"?"heavy":"light"}
    else if(c==="haze"){if(tod==="day"&&!app)r.k="wx-haze";else r.tint="haze"}
    else if(!app&&tod==="day"&&base!=="ocean")r.k=c==="bkn"?"wx-bkn":"wx-sct";
    return r}
  /* above about 3000 m: cloud and rain are mostly below, so look down on the tops */
  if(c==="storm")r.k=fam("storm")||base;
  else if(rainy||c==="fog"||c==="ovc")r.k=tod==="night"?base:fam("tops");
  else if(c==="bkn")r.k=tod==="day"?(base==="ocean"?base:"wx-bkn"):tod==="dusk"?"wx-tops-dusk":base;
  else if(c==="sct")r.k=tod==="day"&&base!=="ocean"?"wx-sct":base;
  else if(c==="haze")r.k=tod==="day"?"wx-haze":base;
  return r}
const WXT={rain:["#4a5260",".28"],storm:["#1c2028",".42"],ovc:["#59606b",".2"],haze:["#b8a888",".22"]};
function wxApply(r){const d=$("wxDrops"),t=$("wxTint");if(!d||!t)return;
  const dh=r&&r.drops?"drops-"+r.drops+".webp":"";if(d.getAttribute("href")!==dh){if(dh)d.setAttribute("href",dh);else d.removeAttribute("href")}
  d.setAttribute("opacity",dh?(r.drops==="heavy"?"1":".85"):"0");
  const tt=r&&r.tint?WXT[r.tint]:null;t.setAttribute("fill",tt?tt[0]:"#000");t.setAttribute("opacity",tt?tt[1]:"0");
  wxLab=r&&!/^wx-/.test(r.k)&&(r.drops||r.tint)?({rain:"RAIN",rainH:"HEAVY RAIN",storm:"STORM",ovc:"OVERCAST",haze:"HAZE",fog:"FOG"}[r.cond]||""):"";
  wxCur=r?Object.assign({},r):{k:"",cond:"",drops:"",tint:"",src:""}}
window.cpWx=()=>Object.assign({},wxCur,{scn:curScn,href:($(bgTop)||{getAttribute:()=>null}).getAttribute("href"),lab:wxLab});
window.cpWxForce=(q,o)=>{WXF=q||null;WXO=o||null;pickScene();return window.cpWx()};
window.cpWxClass=q=>wxClass(q);
setTimeout(pickScene,0);
/* ---------- v22g: Inbound aircraft (ground mode). Track the aircraft you are waiting for by tail number. ----------
   Display only: never feeds phaseStep, the logbook, the GPS trail or own-flight state. Live positions: adsb.lol (ODbL).
   adsb.lol sends no CORS headers, so a browser can't call it directly: requests go to Cabin Panel's private proxy
   (a Cloudflare Worker; the URL can be overridden in Data source), then, only if that fails, the public cors.dev relay
   (can be switched off). adsb.fi blocks both, so it isn't used. Registration lookups: adsbdb.com / hexdb.io. */
var TKS=null,TKT=0,TKX={busy:false,lastPoll:0,next:0,back:0,err:"",wxAt:0,wxBusy:false,wxKm:0,apWxAt:0};
const TK_ADSB="https://api.adsb.lol",TK_PROXY="https://cabin-adsb.cabinpanel-pb.workers.dev/",TK_RELAY="https://proxy.cors.dev/";
function tkNormReg(s){s=String(s||"").toUpperCase().replace(/[^A-Z0-9-]/g,"");if(!s)return "";
  if(s.includes("-"))return s;let m=s.match(/^(VH|ZK|9V|9M|PK|RP|A6|A7|HS|VT|PH|EI|OE|HB|OO|SE|LN|OY|OH|EC|CS|SP|OK|TC|P2|DQ|YJ|H4|F-?O)([A-Z0-9]{3})$/);if(m)return m[1]+"-"+m[2];
  m=s.match(/^(G|F|D|C|I)([A-Z]{4})$/);if(m)return m[1]+"-"+m[2];return s}
function tkSave(){if(!TKS)return;const c=Object.assign({},TKS);if(c.trail&&c.trail.length>1500)c.trail=c.trail.slice(-1500);store.set("tk",c)}
function tkOwnGround(){if(DRV.on)return true;return !last||GROUND.includes(PH.p)||(Date.now()-last.t)>180000}
function tkOn(){return !!(TKS&&TKS.on&&TKS.L&&S.tkShow!=="off"&&!demo&&!REPLAY&&tkOwnGround()&&Date.now()-TKS.L.t<6*3600000)}
function tkVs(){const L=TKS&&TKS.L;if(!L||tkStale())return null;return L.vsS!=null?L.vsS:L.vs!=null?L.vs:null}
/* v24: a tracked fix older than 3 min (or flagged old: not seen / offline) is stale: no extrapolation, no attitude */
function tkStale(){const L=TKS&&TKS.L;return !L||!!L.old||(Date.now()-L.t)>180000}
function tkMove(p,b,d){const dr=d/R,t=rad(b),p1=rad(p.lat),l1=rad(p.lon),p2=Math.asin(Math.sin(p1)*Math.cos(dr)+Math.cos(p1)*Math.sin(dr)*Math.cos(t)),l2=l1+Math.atan2(Math.sin(t)*Math.sin(dr)*Math.cos(p1),Math.cos(dr)-Math.sin(p1)*Math.sin(p2));return {lat:deg(p2),lon:((deg(l2)+540)%360)-180}}
/* v24: between polls (15-90 s apart) move the tracked aircraft on along its track at its groundspeed, turning at its
   turn rate and climbing at its vertical rate, for up to 30 seconds, so the gauges, HUD, map and 3D view keep moving.
   Display only; the raw fix stays in TKS.L. Marked dr (EST) once it is more than 20 s past the last report. */
let TKDR={k:0,t:0,v:null};
function tkLive(){const L=TKS&&TKS.L;if(!L)return null;const now=Date.now();
  if(TKDR.v&&TKDR.k===L&&now-TKDR.t<200)return TKDR.v;
  let dt=(now-L.t)/1000;if(tkStale()||L.gnd||L.spd==null||L.spd<15||L.trk==null||!(dt>0.5)){TKDR={k:L,t:now,v:L};return L}
  dt=Math.min(dt,30);const rate=L.rate!=null&&Math.abs(L.rate)<=4?L.rate:0,n=6,h=dt/n;let p={lat:L.lat,lon:L.lon},trk=L.trk;
  for(let i=0;i<n;i++){trk=(trk+rate*h/2+360)%360;p=tkMove(p,trk,L.spd*h);trk=(trk+rate*h/2+360)%360}
  let alt=L.alt,ft=L.ft;const vs=tkVs();if(vs!=null&&alt!=null&&Math.abs(vs)>=150){const da=vs/196.85*dt;let fl=0;if(vs<0){const na=nearestAp(p);if(na&&na.d<15000)fl=(na.a[4]||0)/FT}alt=Math.max(fl,alt+da);if(ft!=null)ft=Math.max(fl*FT,ft+da*FT)}
  const v=Object.assign({},L,{lat:p.lat,lon:p.lon,trk,alt,ft,dr:dt>20,drS:Math.round(dt)});TKDR={k:L,t:now,v};return v}
/* v24: the tracked aircraft's own phase (for scenery and the retro engine gauges); never touches PH */
function tkPhase(){const L=TKS&&TKS.L;if(!L)return "parked";const kt=L.spd==null?0:L.spd*3600/NMm,vs=tkVs();
  if(L.gnd||(L.ft!=null&&L.ft<(tkAp().el||0)+150&&kt<60))return kt>45?"roll":kt>3?"taxi":"parked";
  if(vs!=null&&vs>400)return "climb";if(vs!=null&&vs<-400)return (L.ft||0)<9000?"approach":"descent";return "cruise"}
/* v24: attitude from ADS-B: bank = reported roll (or from the turn rate), pitch = flight-path angle from the vertical rate */
function tkAtt(){const L=tkLive();if(!L||tkStale()||L.gnd||L.spd==null||L.spd<30)return {p:0,r:0,rate:null};
  const rate=L.rate!=null?L.rate:(L.roll!=null?deg(9.80665*Math.tan(rad(L.roll))/L.spd):null);
  const r=L.roll!=null?L.roll:(rate!=null?deg(Math.atan(L.spd*rad(rate)/9.80665)):0),vs=tkVs(),fpa=vs==null?0:deg(Math.atan2(vs/196.85,L.spd));
  return {p:Math.max(-20,Math.min(25,fpa+(L.spd>60?2.5:0))),r:Math.max(-60,Math.min(60,r)),rate}}
/* v24: where the tracked aircraft is going: your airport if it's heading there (or close), else your route's destination
   if it's heading there, else unknown (no made-up ETA for an aircraft flying away) */
function tkHeadingTo(L,a){if(!L||!a)return false;if(L.gnd||L.trk==null)return true;const d=dist(L,a);if(d<30000)return true;return Math.abs(w180(brg(L,a)-L.trk))<100}
function tkTo(){const L=tkLive(),A=tkAp();if(!L)return A;if(tkHeadingTo(L,A))return A;const B=apBy(S.to);if(B&&B.c!==A.c&&tkHeadingTo(L,B))return B;return null}
function tkTz(lat,lon,c){const a=c&&apBy(c);if(a&&a.tz)return a.tz;try{return "Australia/"+STZ[stateAt(lat,lon)]}catch(e){return "Australia/Sydney"}}
function tkAp(){const c=(TKS&&TKS.ap)||S.from||"SYD";const a=apBy(c);if(a)return {c:a.c,n:a.n,lat:a.lat,lon:a.lon,tz:a.tz||tkTz(a.lat,a.lon,a.c),el:(apInfo(a.c)||[])[4]||0};
  const r=AP2.find(x=>x[0]===c||x[5]===c);if(r)return {c:r[0],n:r[1],lat:r[2],lon:r[3],tz:tkTz(r[2],r[3]),el:r[4]||0};const s=apBy("SYD");return {c:"SYD",n:s.n,lat:s.lat,lon:s.lon,tz:"Australia/Sydney",el:21}}
const tkApName=a=>String(a||"").replace(/\s*\(.*$/,"").replace(/\s+(International\s+)?Airport.*$/i,"").trim();
function tkNear(p){const n=nearestAp(p);if(!n)return "";const nm=tkApName(n.a[1]);return n.d<15000?nm:nm+" ("+Math.round(fDst(n.d))+" "+S.dst+" "+card(brg({lat:n.a[2],lon:n.a[3]},p))+")"}
function tkTime(ms,tz){if(ms==null||!isFinite(ms))return "--:--";try{return new Date(ms).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:tz||"Australia/Sydney"})}catch(e){return new Date(ms).toTimeString().slice(0,5)}}
function tkOffMin(tz,ms){try{const s=new Intl.DateTimeFormat("en-AU",{timeZone:tz,timeZoneName:"longOffset"}).formatToParts(new Date(ms)).find(p=>p.type==="timeZoneName").value;const m=s.match(/([+-])(\d{1,2}):?(\d{2})?/);return m?(m[1]==="-"?-1:1)*(+m[2]*60+(+m[3]||0)):0}catch(e){return 0}}
/* HH:MM in the airport's local time -> epoch ms (today, or tomorrow if it is more than 3 h in the past) */
function tkLocalMs(hhmm,tz,now){now=now||Date.now();const m=String(hhmm||"").match(/^(\d{1,2}):(\d{2})/);if(!m)return null;
  let p;try{p=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(now)).map(x=>[x.type,x.value]))}catch(e){return null}
  const g=Date.UTC(+p.year,+p.month-1,+p.day,+m[1],+m[2]);let ms=g-tkOffMin(tz,g)*60000;if(ms<now-3*3600000)ms+=86400000;return ms}
/* one adsb.lol aircraft record -> display fix (metres, m/s, fpm) */
function tkFix(a,tms){if(!a||typeof a.lat!=="number"||typeof a.lon!=="number")return null;const gnd=a.alt_baro==="ground";
  const ft=gnd?null:(typeof a.alt_baro==="number"?a.alt_baro:typeof a.alt_geom==="number"?a.alt_geom:null);
  let alt=ft==null?null:ft/FT;if(gnd){const n=nearestAp({lat:a.lat,lon:a.lon});alt=n&&n.d<8000?(n.a[4]||0)/FT:0}
  const seen=typeof a.seen_pos==="number"?a.seen_pos:typeof a.seen==="number"?a.seen:0;
  return {lat:a.lat,lon:a.lon,alt,ft,gnd,spd:typeof a.gs==="number"?a.gs*NMm/3600:null,trk:typeof a.track==="number"?a.track:(typeof a.true_heading==="number"?a.true_heading:null),
    roll:typeof a.roll==="number"&&Math.abs(a.roll)<=90?a.roll:null,rate:null,
    vs:typeof a.baro_rate==="number"?a.baro_rate:typeof a.geom_rate==="number"?a.geom_rate:null,sq:a.squawk||"",cs:String(a.flight||"").trim(),em:a.emergency&&a.emergency!=="none"?a.emergency:"",
    t:Math.round((tms||Date.now())-seen*1000),acc:null,altAcc:null,tk:true}}
function tkNoteCs(cs,t){if(!cs||!TKS)return;const l=TKS.cs||(TKS.cs=[]);const z=l[l.length-1];if(z&&z.cs===cs){z.t1=Math.max(z.t1||t,t);return}
  if(z&&z.cs!==cs)TKS.csNew={from:z.cs,to:cs,at:t};l.push({cs,t0:t,t1:t});if(l.length>12)l.splice(0,l.length-12)}
function tkPush(f){if(!f||!TKS)return;const tr=TKS.trail||(TKS.trail=[]),z=tr[tr.length-1];
  if(z&&f.t<=z[0])return;if(z&&f.t-z[0]<50000&&dist({lat:z[1],lon:z[2]},f)<1500&&!!(z[3]<0)===!!f.gnd)return;
  tr.push([f.t,+f.lat.toFixed(5),+f.lon.toFixed(5),f.gnd?-1:(f.ft==null?null:Math.round(f.ft)),f.spd==null?null:Math.round(f.spd*3600/NMm)]);if(tr.length>2400)tr.splice(0,tr.length-2000)}
/* arrival / departure at the user's airport */
function tkLegState(){if(!TKS||!TKS.L)return;const A=tkAp(),L=TKS.L,d=dist(L,A),kt=L.spd==null?0:L.spd*3600/NMm;
  const onGnd=L.gnd||(L.ft!=null&&L.ft<A.el+300&&kt<60);
  if(onGnd&&d<7000){if(!TKS.arrAt||TKS.depAt){TKS.arrAt=TKS.arrAt&&!TKS.depAt?TKS.arrAt:L.t;TKS.depAt=null;TKS.arrAp=A.c}}
  else if(TKS.arrAt&&!TKS.depAt&&!onGnd&&d>4000&&kt>100){TKS.depAt=L.t}}
/* if history shows it already landed at the user's airport, take the touchdown time from it */
function tkArrFromTrail(){if(!TKS||!TKS.trail)return;const A=tkAp(),tr=TKS.trail;let air=-1;for(let i=tr.length-1;i>=0;i--){if(tr[i][3]!=null&&tr[i][3]>=0&&tr[i][3]>A.el+800){air=i;break}}
  if(air<0||air===tr.length-1)return;for(let i=air+1;i<tr.length;i++){const q=tr[i];if((q[3]===-1||(q[4]!=null&&q[4]<60))&&dist({lat:q[1],lon:q[2]},A)<7000){if(!TKS.arrAt||TKS.arrAt>q[0])TKS.arrAt=q[0];TKS.arrAp=A.c;return}}}
/* ETA to the user's airport: great circle at groundspeed, slower for the last 150 km (descent and approach) */
function tkEta(){if(!TKS||!TKS.L)return null;const L=TKS.L,A=tkAp();if(L.gnd||L.spd==null||L.spd<40)return null;const d=dist(L,A);if(d<2000||!tkHeadingTo(L,A))return null;
  const gs=L.spd,D=Math.min(d,150000),vD=Math.min(gs,Math.max(72,gs*0.62));const s=(d-D)/gs+D/vD+(d>25000?120:0);return {d,sec:s,at:L.t+s*1000}}
/* turnaround estimate vs the user's departure. Rough: on-blocks 5 min after touchdown, then the minimum turn. */
function tkDelay(){if(!TKS||!TKS.dep)return null;const A=tkAp(),dep=tkLocalMs(TKS.dep,A.tz);if(dep==null)return null;const turn=Math.max(10,Math.min(240,+TKS.turn||30))*60000;let land=null,how="";
  if(TKS.arrAt&&!TKS.depAt){land=TKS.arrAt;how="landed "+tkTime(TKS.arrAt,A.tz)}
  else if(TKS.depAt){return {dep,txt:"It has left "+A.c+" again at "+tkTime(TKS.depAt,A.tz)+". Check you are tracking the right aircraft.",min:null}}
  else{const e=tkEta();if(e){land=e.at;how="ETA "+tkTime(e.at,A.tz)}
    else if(TKS.L&&(TKS.L.gnd||TKS.L.spd!=null&&TKS.L.spd<40)){const d=dist(TKS.L,A);if(d>15000){land=Math.max(Date.now(),TKS.L.t)+(25*60+d/220)*1000;how="still on the ground at "+tkNear(TKS.L)+"; if it left now it would land about "+tkTime(land,A.tz)}}}
  if(land==null)return {dep,txt:"Not enough data yet for a delay estimate.",min:null};
  const ready=land+5*60000+turn,late=Math.round((ready-dep)/60000);
  return {dep,ready,min:late,how,txt:late<=5?"On time (estimate)":"Likely delay ~"+late+" min (estimate)"}}
/* ---------- network ---------- */
function tkQuota(add){const day=new Date().toISOString().slice(0,10);let q=store.get("tkq",{d:day,n:0});if(q.d!==day)q={d:day,n:0};if(add){q.n+=add;store.set("tkq",q)}return q.n}
function tkPxOk(v){return /^https:\/\/|^http:\/\/(127\.0\.0\.1|localhost)[:\/]/.test(v)}
/* private proxy: your override if set, otherwise the built-in Worker. It takes the full upstream URL after it. */
function tkPx(){const px=String(S.tkProxy||"").trim();return (tkPxOk(px)?px:TK_PROXY).replace(/\/*$/,"/")}
async function tkGet(path,ms){const src=[["proxy",tkUrl(path)]];
  if(S.tkRelay==="on")src.push(["relay",TK_RELAY+TK_ADSB+path]);
  let lastE=null,rl=null;
  for(const [k,u] of src){try{tkQuota(1);const r=await fetchT(u,ms||12000);
      if(r.status===429){const e=new Error("rate limited");e.rl=+(r.headers.get("retry-after")||0);throw e}
      if(r.status===404){const e=new Error("not found");e.nf=true;throw e}
      if(!r.ok)throw new Error("answered "+r.status);const j=await r.json();TKS&&(TKS.via=k);return j}
    catch(e){if(e.nf)throw e;if(e.rl!=null)rl=e;else lastE=e}}   /* a limited or failed private proxy falls back to the relay */
  throw rl||lastE||new Error("no answer")}
async function tkHexOf(reg){try{const r=await fetchT("https://api.adsbdb.com/v0/aircraft/"+encodeURIComponent(reg),9000);if(r.ok){const j=await r.json(),a=j&&j.response&&j.response.aircraft;
    if(a&&a.mode_s)return {hex:String(a.mode_s).toLowerCase(),type:a.icao_type||"",desc:[a.manufacturer,a.type].filter(Boolean).join(" "),op:a.registered_owner||""}}}catch(e){}
  try{const r=await fetchT("https://hexdb.io/reg-hex?reg="+encodeURIComponent(reg),9000);if(r.ok){const t=(await r.text()).trim();if(/^[0-9A-Fa-f]{6}$/.test(t))return {hex:t.toLowerCase()}}}catch(e){}
  return null}
/* today's history from the adsb.lol trace (readsb trace format) */
async function tkTrace(){if(!TKS||!TKS.hex)return;let j;try{j=await tkGet("/1/trace/full/"+TKS.hex,20000)}catch(e){TKS.traceErr=e.nf?"no history today":String(e.message||e);return}
  const ts=+j.timestamp||0,pts=Array.isArray(j.trace)?j.trace:[],from=Date.now()-14*3600000,out=[];
  for(const q of pts){const t=Math.round((ts+(+q[0]||0))*1000);if(t<from||typeof q[1]!=="number")continue;const det=q[8]&&typeof q[8]==="object"?q[8]:null;if(det&&det.flight)tkNoteCs(String(det.flight).trim(),t);
    const gnd=q[3]==="ground",ft=typeof q[3]==="number"?q[3]:null;out.push([t,+q[1].toFixed(5),+q[2].toFixed(5),gnd?-1:ft,typeof q[4]==="number"?Math.round(q[4]):null])}
  if(j.r&&!TKS.reg)TKS.reg=j.r;if(j.t&&!TKS.type)TKS.type=j.t;if(j.desc&&!TKS.desc)TKS.desc=j.desc;
  const thin=[];for(const q of out){const z=thin[thin.length-1];if(!z||q[0]-z[0]>=60000||dist({lat:z[1],lon:z[2]},{lat:q[1],lon:q[2]})>3000||(z[3]===-1)!==(q[3]===-1))thin.push(q)}
  const keep=(TKS.trail||[]).filter(q=>!thin.length||q[0]>thin[thin.length-1][0]);TKS.trail=thin.concat(keep).slice(-2000);TKS.traceAt=Date.now();
  if(!TKS.L&&thin.length){const z=thin[thin.length-1];TKS.L={lat:z[1],lon:z[2],alt:z[3]>0?z[3]/FT:0,ft:z[3]>=0?z[3]:null,gnd:z[3]===-1,spd:z[4]==null?null:z[4]*NMm/3600,trk:null,vs:null,sq:"",cs:(TKS.cs&&TKS.cs.length?TKS.cs[TKS.cs.length-1].cs:""),t:z[0],acc:null,altAcc:null,tk:true,old:true}}
  tkArrFromTrail()}
async function tkPoll(){if(!TKS||!TKS.on||TKX.busy)return;TKX.busy=true;TKX.lastPoll=Date.now();const ses=TKS;let gap=null;
  try{if(!cfOk())throw Object.assign(new Error("offline"),{off:true});
    const q=tkQuota(0);if(q>=470){TKX.err="Daily free ADS-B allowance nearly used on this phone ("+q+" lookups today; adsb.lol allows about 500 a day per proxy address). Polling paused until tomorrow.";gap=30*60000;return}
    let j=null;if(TKS.hex)j=await tkGet("/v2/hex/"+TKS.hex);else if(TKS.reg)j=await tkGet("/v2/reg/"+encodeURIComponent(TKS.reg));
    if(TKS!==ses)return;let ac=(j&&Array.isArray(j.ac)?j.ac:[]).filter(a=>a&&typeof a.lat==="number");
    if(!ac.length&&!TKS.hex&&TKS.flt){const cs=toCallsign(TKS.flt);if(cs&&cs.cs){const k=await tkGet("/v2/callsign/"+cs.cs);ac=(k&&Array.isArray(k.ac)?k.ac:[]).filter(a=>a&&typeof a.lat==="number")}}
    if(TKS!==ses)return;const a=ac.find(x=>TKS.hex&&x.hex===TKS.hex)||ac.find(x=>tkNormReg(x.r)===TKS.reg)||ac[0];
    if(a){if(a.hex&&!TKS.hex){TKS.hex=String(a.hex).toLowerCase();if(!TKS.traceAt)await tkTrace()}if(TKS!==ses)return;if(a.r&&!TKS.reg)TKS.reg=tkNormReg(a.r);
      if(a.t)TKS.type=TKS.type||a.t;if(a.desc)TKS.desc=TKS.desc||a.desc;const f=tkFix(a,j&&j.now||Date.now());if(f){const pv=TKS.L,dt=pv?(f.t-pv.t)/1000:0;
        if(pv&&!pv.old&&dt>1&&dt<=120){if(f.trk!=null&&pv.trk!=null&&f.roll==null){const r=w180(f.trk-pv.trk)/dt;if(Math.abs(r)<=4)f.rate=r}
          if(f.vs!=null&&pv.vs!=null){const q=pv.vsS!=null?pv.vsS:pv.vs;f.vsS=Math.abs(f.vs-q)<300?(f.vs+q)/2:f.vs}else if(f.vs==null&&f.ft!=null&&pv.ft!=null)f.vs=(f.ft-pv.ft)/dt*60}
        else if(pv&&f.t<=pv.t&&!pv.old){f.rate=pv.rate;f.vsS=pv.vsS}
        TKS.L=f;TKS.seen=Date.now();tkNoteCs(f.cs,f.t);tkPush(f);tkLegState()}TKX.err="";TKX.back=0}
    else{TKX.err="Not seen right now by adsb.lol receivers: it may be parked with the transponder off, outside receiver coverage (common over remote areas and the ocean) or hidden from public feeds."+(TKS.L?" Showing the last known position.":"");if(TKS.L)TKS.L.old=true}
  }catch(e){if(e.off){if(TKS&&TKS.L)TKS.L.old=true;TKX.err="Offline: showing the last known position"+(TKS&&TKS.L?" from "+tkTime(TKS.L.t,tkAp().tz):"")+". Tracking needs internet.";gap=60000}
    else if(e.rl!=null){TKX.back=Math.min(600000,Math.max(60000,(TKX.back||30000)*2,e.rl*1000));gap=TKX.back;TKX.err="adsb.lol is limiting requests right now; trying again in "+Math.round(gap/60000)+" min."}
    else{TKX.back=Math.min(300000,Math.max(30000,(TKX.back||15000)*2));gap=TKX.back;TKX.err="Couldn't reach the live ADS-B data ("+(e&&e.name==="AbortError"?"timed out":(e&&e.message)||e)+"). Retrying.";if(TKS&&TKS.L)TKS.L.old=true}}
  finally{TKX.busy=false;if(TKS!==ses){if(TKS&&TKS.on)tkSched(800);return}tkSave();tkSched(gap);tkRender();try{render();drawMap();pickScene()}catch(e){}tkWxMaybe()}}
function tkInterval(){if(!TKS||!TKS.L)return 30000;const L=TKS.L,A=tkAp(),d=dist(L,A),e=tkEta();
  if(TKS.arrAt&&!TKS.depAt)return 60000;if(L.gnd||L.spd==null||L.spd<40)return d<7000?30000:90000;if((e&&e.sec<45*60)||d<200000)return 15000;{const na=nearestAp(L);if(na&&na.d<40000&&(L.ft||0)<10000)return 15000}return 30000}
function tkSched(gap){clearTimeout(TKT);TKT=0;if(!TKS||!TKS.on)return;let ms=gap!=null?gap:tkInterval();if(document.hidden)ms=Math.max(ms,300000);TKX.next=Date.now()+ms;TKT=setTimeout(tkPoll,ms)}
document.addEventListener("visibilitychange",()=>{if(!TKS||!TKS.on)return;if(document.hidden)tkSched(Math.max(300000,TKX.next-Date.now()));else if(Date.now()-TKX.lastPoll>tkInterval())tkPoll();else tkSched(Math.max(1000,TKX.lastPoll+tkInterval()-Date.now()))});
window.addEventListener("online",()=>{if(TKS&&TKS.on)tkPoll()});
/* ---------- weather it has flown through (Open-Meteo model weather at the times it passed, not reports from the aircraft) ---------- */
const TKWW=c=>c==null?"":c>=95?"thunderstorms":c>=85?"snow showers":c>=80?"showers":c>=71?"snow":c>=61?"rain":c>=51?"drizzle":c>=45?"fog":c>=3?"overcast":c>=2?"cloudy":c>=1?"mostly clear":"clear";
function tkWxOf(s,ft){const h=ft==null?0:Math.max(0,ft/FT);let tv=null;try{tv=turbAt({smp:[s]},0,h)}catch(e){}
  const storm=s.wc>=95||(s.cape>=1500&&s.wc>=80),heavy=(s.pr||0)>=2.5||[65,67,82].includes(s.wc),rain=heavy||(s.pr||0)>=0.2||(s.wc>=51&&s.wc<=67)||(s.wc>=80&&s.wc<=82);
  let wk=null;{const lv=(s.lv||[]).filter(l=>l[1]!=null&&l[2]!=null);if(lv.length){const n=lv.reduce((m,l)=>Math.abs(l[1]-h)<Math.abs(m[1]-h)?l:m,lv[0]);wk=h<1500&&s.w10!=null?[s.w10,null]:[n[2],n[3]]}}
  return {storm,heavy,rain,tc:tv?tcat(tv.v):0,why:tv&&tv.why||"",wk,cape:s.cape||0,wc:s.wc,pr:s.pr}}
function tkWxPts(){const tr=(TKS&&TKS.trail||[]).filter(q=>q[3]!==-1);if(tr.length<2)return [];let tot=0;const cum=[0];for(let i=1;i<tr.length;i++){tot+=dist({lat:tr[i-1][1],lon:tr[i-1][2]},{lat:tr[i][1],lon:tr[i][2]});cum.push(tot)}
  const n=Math.max(2,Math.min(12,Math.round(tot/120000)+2)),out=[];let j=0;for(let i=0;i<n;i++){const want=tot*i/(n-1);while(j<cum.length-1&&cum[j]<want)j++;const q=tr[j];out.push({f:i/(n-1),lat:+q[1].toFixed(3),lon:+q[2].toFixed(3),t:q[0],ft:q[3]})}
  return out.filter((p,i,a)=>i===0||p.t!==a[i-1].t)}
async function tkWxMaybe(force){if(!TKS||!TKS.on||TKX.wxBusy||!cfOk())return;const tr=TKS.trail||[],now=Date.now();
  let km=0;for(let i=1;i<tr.length;i++)km+=dist({lat:tr[i-1][1],lon:tr[i-1][2]},{lat:tr[i][1],lon:tr[i][2]})/1000;
  const due=force||!TKS.wx||now-(TKS.wx.at||0)>20*60000||km-(TKS.wx.km||0)>120;if(!due)return;TKX.wxBusy=true;
  try{const A=tkAp(),pts=tkWxPts(),e=tkEta(),dep=TKS.dep?tkLocalMs(TKS.dep,A.tz):null,all=pts.slice();
    if(TKS.L&&e&&e.d>100000){for(const f of [0.5,0.85]){const q=gcPoint(TKS.L,A,f);all.push({f:1,lat:+q.lat.toFixed(3),lon:+q.lon.toFixed(3),t:TKS.L.t+e.sec*1000*f,ft:null,ahead:true})}}
    all.push({f:1,lat:+A.lat.toFixed(3),lon:+A.lon.toFixed(3),t:now,ap:"now"});if(dep&&dep>now-3600000)all.push({f:1,lat:+A.lat.toFixed(3),lon:+A.lon.toFixed(3),t:dep,ap:"dep"});
    if(e)all.push({f:1,lat:+A.lat.toFixed(3),lon:+A.lon.toFixed(3),t:e.at,ap:"arr"});
    const smp=await omSamples(all,p=>p.t,"&past_days=1&forecast_days=2");
    const W={at:now,km,trail:[],ahead:[],ap:{}};smp.forEach((s,i)=>{const p=all[i],w=tkWxOf(s,p.ap?0:p.ft==null?null:p.ft<0?0:p.ft);w.t=p.t;w.lat=p.lat;w.lon=p.lon;w.ft=p.ft;w.T=s.T;w.g10=s.g10;w.w10=s.w10;
      if(p.ap)W.ap[p.ap]=w;else if(p.ahead)W.ahead.push(w);else W.trail.push(w)});
    TKS.wx=W;tkSave()}catch(e){if(TKS)TKS.wxErr=String(e&&e.message||e)}finally{TKX.wxBusy=false;tkRender()}}
function tkWxText(){const W=TKS&&TKS.wx;if(!W)return "";const A=tkAp(),parts=[];let prev="";
  for(const w of W.trail){const hi=w.ft!=null&&w.ft>15000,bits=[];if(w.storm)bits.push(hi?"near thunderstorms":"through thunderstorm activity");else if(w.rain)bits.push((hi?"over ":"through ")+(w.heavy?"heavy rain":"rain"));
    if(w.tc>=2)bits.push(TCAT[w.tc][0].toLowerCase()+" turbulence"+(w.why?" ("+w.why+")":""));if(!bits.length)continue;const txt=bits.join(" and ");if(txt===prev)continue;prev=txt;parts.push(txt+" near "+tkNear(w)+" ("+tkTime(w.t,A.tz)+")")}
  let s=parts.length?"Passed "+parts.slice(0,4).join("; ")+".":W.trail.length?"No rain, storms or more than light turbulence along its track so far.":"Not enough track yet for its weather.";
  const ah=W.ahead.filter(w=>w.storm||w.rain||w.tc>=2);if(ah.length){const w=ah[0];s+=" Ahead: "+(w.storm?"thunderstorms possible":w.rain?"rain":"")+(w.tc>=2?(w.storm||w.rain?" and ":"")+TCAT[w.tc][0].toLowerCase()+" turbulence":"")+" near "+tkNear(w)+"."}
  return s}
function tkApWx(w){if(!w)return "";const k=v=>v==null?"--":Math.round(v);return (w.T!=null?Math.round(w.T)+"°C, ":"")+(TKWW(w.wc)||"")+(w.storm&&w.wc<95?", storms possible":"")+(w.pr?", "+w.pr+" mm/h":"")+", wind "+k(w.w10)+" kt"+(w.g10&&w.g10>(w.w10||0)+8?" gusting "+k(w.g10):"")}
/* ---------- UI ---------- */
/* v24: Open takes you to the details and folds the banner into a slim chip (tap the chip to unfold); Stop is always there */
function tkRender(){const ban=$("tkBan"),box=$("tkOut"),st=$("tkSt");const on=TKS&&TKS.on;$("tkGo").textContent=on?"Update":"Track";$("tkStop").style.display=on?"":"none";
  if(!on){ban.style.display="none";box.innerHTML="";st.textContent=TKX.err||"Needs internet. Enter the registration painted on the aircraft (for example VH-YIA). Display only: it never changes your own flight, phases or logbook.";document.body.classList.remove("tking");return}
  const A=tkAp(),L=TKS.L,age=L?Math.max(0,(Date.now()-L.t)/1000):null,cs=L&&L.cs||(TKS.cs&&TKS.cs.length?TKS.cs[TKS.cs.length-1].cs:"");
  const ageT=age==null?"":age<90?Math.round(age)+" s ago":age<5400?Math.round(age/60)+" min ago":(age/3600).toFixed(1)+" h ago";
  const shown=tkOn();document.body.classList.toggle("tking",shown);
  const fl=L?(L.gnd?"GND":"FL"+String(Math.round((L.ft||0)/100)).padStart(3,"0")):"";ban.classList.toggle("slim",S.tkMini==="on");ban.style.display="";
  if(S.tkMini==="on"){ban.innerHTML=`<button id="tkBanChip" aria-expanded="false" aria-label="Tracking ${esc(TKS.reg)}: show the tracking bar">● ${shown?"TRK":"WATCH"} ${esc(TKS.reg)}${fl?" · "+fl:""}${age!=null&&age>180?" · OLD":""} ▾</button><button id="tkBanStop" aria-label="Stop tracking">Stop</button>`;
    $("tkBanChip").onclick=()=>{S.tkMini="off";saveS();tkRender()};$("tkBanStop").onclick=tkStop}
  else ban.innerHTML=`<span>${shown?"TRACKING ":"WATCHING "}${esc(TKS.reg)}${cs?" · "+esc(cs):""}${L&&L.sq?" · SQK "+esc(L.sq):""}${L?" · "+(L.gnd?"ON GROUND":"FL"+String(Math.round((L.ft||0)/100)).padStart(3,"0")):""}${age!=null&&age>60?" · LAST SEEN "+esc(ageT.toUpperCase()):""}</span><small>${shown?"Gauges, HUD and map show this aircraft, not your GPS":"Your own GPS is in use (you are not on the ground)"}</small><button id="tkBanGo" aria-label="Open tracking details">Open</button><button id="tkBanStop">Stop</button>`;
  if(S.tkMini!=="on"){$("tkBanGo").onclick=tkOpenDetails;$("tkBanStop").onclick=tkStop}
  st.textContent=TKX.err||(L?"Live from adsb.lol"+(TKS.via==="relay"?" via the public cors.dev relay (private proxy unavailable)":TKS.via==="proxy"?(tkPxOk(String(S.tkProxy||"").trim())?" via your proxy":" via Cabin Panel's private proxy"):"")+" · updated "+ageT+(TKX.next?" · next check "+tkTime(TKX.next,A.tz):""):"Looking for "+TKS.reg+"…");
  const rows=[];const li=(k,v,c)=>rows.push(`<li${c?` class="${c}"`:""}><span>${k}</span><b>${v}</b></li>`);
  li("Aircraft",esc(TKS.reg)+(TKS.type?" · "+esc(TKS.type):"")+(TKS.hex?" · "+esc(TKS.hex.toUpperCase()):""));
  if(L){li("Now",(L.gnd?"On the ground":"FL"+String(Math.round((L.ft||0)/100)).padStart(3,"0")+" · "+Math.round(fSpd(L.spd)||0)+" "+S.spd+" · track "+(L.trk==null?"---":String(Math.round(L.trk)%360).padStart(3,"0")+"°")+(L.vs!=null&&Math.abs(L.vs)>300?" · "+(L.vs>0?"climbing ":"descending ")+Math.abs(Math.round(L.vs/100)*100)+" fpm":""))+" near "+esc(tkNear(L)));
    li("Distance to "+esc(A.c),Math.round(fDst(dist(L,A))).toLocaleString()+" "+S.dst)}
  if(L&&L.em)li("Emergency",esc(L.em),"bad");
  const e=tkEta();if(TKS.arrAt&&!TKS.depAt)li("Arrived "+esc(A.c),tkTime(TKS.arrAt,A.tz)+" local","ok");else if(e)li("ETA "+esc(A.c),"~"+tkTime(e.at,A.tz)+" local ("+hm(e.sec)+", estimate)");
  const dl=tkDelay();if(dl){li("Your departure",tkTime(dl.dep,A.tz)+" local · turnaround "+(+TKS.turn||30)+" min");li("Outlook",esc(dl.txt)+(dl.how?" · "+esc(dl.how):"")+(dl.ready?" · ready ~"+tkTime(dl.ready,A.tz):""),dl.min==null?"":dl.min<=5?"ok":dl.min<=30?"warn":"bad")}
  if(TKS.cs&&TKS.cs.length)li("Callsigns seen",TKS.cs.map(c=>esc(c.cs)+" "+tkTime(c.t0,A.tz)).join(" → "));
  if(TKS.csNew&&Date.now()-TKS.csNew.at<3*3600000)li("Callsign change",esc(TKS.csNew.from)+" → "+esc(TKS.csNew.to)+" at "+tkTime(TKS.csNew.at,A.tz),"warn");
  const W=TKS.wx;if(W){li("Weather it flew through",esc(tkWxText()));if(W.ap.now)li(esc(A.c)+" now",esc(tkApWx(W.ap.now)));if(W.ap.arr)li(esc(A.c)+" at its arrival",esc(tkApWx(W.ap.arr)));if(W.ap.dep)li(esc(A.c)+" at your departure",esc(tkApWx(W.ap.dep)))}
  else if(TKS.wxErr)li("Weather","couldn't download ("+esc(TKS.wxErr)+")");
  box.innerHTML=rows.join("")}
function tkOpenDetails(){S.tkMini="on";saveS();tkRender();const i=PG.els.findIndex(e=>e.id==="pg-route");try{pgGo(i,true)}catch(e){}
  setTimeout(()=>{const t=$("tkTile"),pg=PG.els[i];if(pg)pg.scrollTop=Math.max(0,t.getBoundingClientRect().top-pg.getBoundingClientRect().top+pg.scrollTop-8);try{pgGo(i,true)}catch(e){}t.classList.add("flash");setTimeout(()=>t.classList.remove("flash"),1600)},120)}
async function tkStart(){const reg=tkNormReg($("tkReg").value),flt=String($("tkFlt").value||"").toUpperCase().replace(/\s+/g,""),dep=$("tkDep").value,ap=String($("tkAp").value||"").toUpperCase().trim(),turn=Math.max(10,Math.min(240,+$("tkTurn").value||30));
  if(!reg&&!flt){TKX.err="Enter a registration (tail number), for example VH-YIA.";tkRender();return}
  const same=TKS&&TKS.reg===reg&&TKS.on;
  if(!same)TKS={on:true,reg:reg||"",flt,dep,ap:ap||null,turn,hex:null,type:"",desc:"",cs:[],trail:[],L:null,at:Date.now()};else Object.assign(TKS,{flt,dep,ap:ap||TKS.ap,turn});
  if(!TKS.ap){const n=last&&nearestAp(last);TKS.ap=n&&n.d<20000?n.a[0]:(S.from||"SYD")}$("tkAp").value=TKS.ap;$("tkReg").value=TKS.reg;
  TKX.err="";TKX.back=0;tkSave();tkRender();hap(15);
  if(!same&&TKS.reg){const h=await tkHexOf(TKS.reg);if(h&&TKS){TKS.hex=h.hex;TKS.type=h.type||TKS.type;TKS.desc=h.desc||"";TKS.op=h.op||""}if(TKS&&TKS.hex)await tkTrace()}
  if(TKS&&TKS.wx)TKS.wx.at=0;await tkPoll()}
/* v24b: after Stop tracking, clear the "ADS-B <reg> · report N s ago" status if GPS is off (the GPS branch overwrites it when GPS is on) */
function tkStatReset(){const s=$("stat");if(!tkOn()&&s&&/^ADS-B /.test(s.textContent)){s.textContent=watchId!=null?"Resuming GPS…":"GPS off";$("dot").className="dot"+(watchId!=null?" warn":"")}}
function tkStop(){clearTimeout(TKT);TKT=0;TKS=null;S.tkMini="off";saveS();store.set("tk",null);TKX.err="";document.body.classList.remove("tking");tkRender();tkStatReset();try{render();drawMap()}catch(e){};hap(10)}
$("tkGo").onclick=tkStart;$("tkStop").onclick=tkStop;$("tkReg").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();tkStart()}});
$("tkReg").addEventListener("blur",()=>{const v=tkNormReg($("tkReg").value);if(v)$("tkReg").value=v});
for(const id of ["tkDep","tkTurn","tkAp"])$(id).addEventListener("change",()=>{if(!TKS||!TKS.on)return;TKS.dep=$("tkDep").value;TKS.turn=Math.max(10,Math.min(240,+$("tkTurn").value||30));const v=String($("tkAp").value||"").toUpperCase().trim();if(v)TKS.ap=v;TKS.arrAt=null;TKS.depAt=null;tkArrFromTrail();tkLegState();tkSave();tkRender();tkWxMaybe(true)});
$("tkShow").checked=S.tkShow!=="off";$("tkShow").onchange=()=>{S.tkShow=$("tkShow").checked?"on":"off";saveS();tkRender();render();drawMap()};
$("tkRelay").checked=S.tkRelay==="on";$("tkRelay").onchange=()=>{S.tkRelay=$("tkRelay").checked?"on":"off";saveS()};
$("tkProxy").value=S.tkProxy||"";$("tkProxy").onchange=()=>{const v=$("tkProxy").value.trim();S.tkProxy=tkPxOk(v)?v:"";$("tkProxy").value=S.tkProxy;saveS()};
/* airport list for "your airport" */
{const dl=$("tkApL");if(dl){dl.innerHTML=AP.map(a=>`<option value="${esc(a.c)}">${esc(a.n)}</option>`).join("")}}
/* ---------- HUD + map ---------- */
function tkHudBan(cx,T){const L=TKS.L,age=(Date.now()-L.t)/1000,cs=L.cs||"";
  return `<rect x="${cx-92}" y="38" width="184" height="30" fill="#000" fill-opacity=".72" stroke="#ff8a1f" stroke-width="1.4"/>`+
    `<text x="${cx}" y="51" fill="#ff8a1f" stroke="none" font-size="11" font-weight="700" text-anchor="middle">TRACKING ${esc(TKS.reg)}${cs?" "+esc(cs):""}</text>`+
    `<text x="${cx}" y="63" fill="#ff8a1f" stroke="none" font-size="9" font-weight="700" text-anchor="middle">${tkStale()?"STALE · ":(Date.now()-L.t)>20000?"EST · ":""}NOT YOUR GPS${L.sq?" · SQK "+esc(L.sq):""}${age>60?" · "+(age<5400?Math.round(age/60)+"M":Math.round(age/3600)+"H")+" OLD":""}${L.gnd?" · ON GND":""}</text>`}
function tkZoom(W,H){if(!tkOn())return null;const L=tkLive()||TKS.L,A=tkAp(),d=dist(L,A)/1000;ZM.why="track";
  if(d<6){ZM.mode="track";return vOf(L.gnd||d<3?A:L,7,W,H)}ZM.mode="track";const m=gcPoint(L,A,0.5);return vOf(m,Math.max(20,Math.min(4500,d*1.35+15)),W,H)}
function tkMapDraw(x,P,sc,W,H,col,glow){if(!TKS||!TKS.on||!TKS.L)return;const nvg=S.disp==="nvg",c=nvg?col("--ink"):"#ff8a1f",L=(tkOn()&&tkLive())||TKS.L,A=tkAp();
  x.save();const tr=TKS.trail||[];if(tr.length>1){x.strokeStyle=c;x.lineWidth=2.6;x.lineJoin="round";if(glow){x.shadowColor=c;x.shadowBlur=7}x.globalAlpha=.9;x.beginPath();let pen=false,pt=0;
    for(const q of tr){const [px,py]=P({lat:q[1],lon:q[2]});if(pen&&q[0]-pt>45*60000){x.moveTo(px,py)}else if(pen)x.lineTo(px,py);else{x.moveTo(px,py);pen=true}pt=q[0]}
    const [lx,ly]=P(L);x.lineTo(lx,ly);x.stroke()}
  if(!(TKS.arrAt&&!TKS.depAt)&&!L.gnd){x.setLineDash([5,6]);x.lineWidth=1.6;x.globalAlpha=.7;x.beginPath();for(let i=0;i<=30;i++){const [px,py]=P(gcPoint(L,A,i/30));i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();x.setLineDash([])}
  x.globalAlpha=1;{const [ax,ay]=P(A);x.strokeStyle=c;x.lineWidth=2;x.beginPath();x.arc(ax,ay,9,0,7);x.stroke()}
  const [px,py]=P(L);x.translate(px,py);x.rotate(rad(L.trk||0));x.fillStyle=c;x.strokeStyle="#000";x.lineWidth=2;x.beginPath();x.moveTo(0,-13);x.lineTo(3,-4);x.lineTo(12,3);x.lineTo(12,6);x.lineTo(3,3);x.lineTo(2,9);x.lineTo(5,12);x.lineTo(-5,12);x.lineTo(-2,9);x.lineTo(-3,3);x.lineTo(-12,6);x.lineTo(-12,3);x.lineTo(-3,-4);x.closePath();x.stroke();x.fill();
  x.setTransform(1,0,0,1,0,0);const dpr=window.devicePixelRatio||1;x.setTransform(dpr,0,0,dpr,0,0);
  const t1=TKS.reg+(L.cs?" "+L.cs:""),t2=L.gnd?"ON GROUND":"FL"+String(Math.round((L.ft||0)/100)).padStart(3,"0")+" "+Math.round(fSpd(L.spd)||0)+(S.spd==="kmh"?"KMH":S.spd.toUpperCase());
  x.font="700 12px \"B612 Mono\",monospace";const w=Math.max(x.measureText(t1).width,x.measureText(t2).width)+10,bx=Math.min(W-w-4,Math.max(4,px+16)),by=Math.min(H-34,Math.max(4,py-36));
  x.fillStyle="rgba(0,0,0,.72)";x.fillRect(bx,by,w,30);x.strokeStyle=c;x.lineWidth=1.2;x.strokeRect(bx,by,w,30);x.fillStyle=c;x.fillText(t1,bx+5,by+13);x.font="700 11px \"B612 Mono\",monospace";x.fillText(t2,bx+5,by+26);
  x.font="700 11px \"B612 Mono\",monospace";const tag="TRACKING "+TKS.reg+" · ADS-B data: adsb.lol (ODbL)",tw=x.measureText(tag).width;x.fillStyle="rgba(0,0,0,.7)";x.fillRect(6,H-44,tw+10,17);x.fillStyle=c;x.fillText(tag,11,H-31);x.restore()}
/* test hooks */
window.cpTk=()=>TKS?{on:TKS.on,reg:TKS.reg,hex:TKS.hex,via:TKS.via,cs:(TKS.cs||[]).map(c=>c.cs),L:TKS.L&&{lat:TKS.L.lat,lon:TKS.L.lon,ft:TKS.L.ft,gnd:TKS.L.gnd,cs:TKS.L.cs,sq:TKS.L.sq,old:!!TKS.L.old},trail:(TKS.trail||[]).length,arrAt:TKS.arrAt||null,shown:tkOn(),eta:tkEta(),delay:tkDelay(),wx:TKS.wx?tkWxText():null,err:TKX.err,next:TKX.next,quota:tkQuota(0),ap:tkAp().c,own:{phase:PH.p,last:last&&{lat:last.lat,lon:last.lon},log:LOG.pts.length}}:{on:false,err:TKX.err};
window.cpTkPoll=()=>tkPoll();window.cpTkNorm=tkNormReg;window.cpTkLocal=(h,tz,n)=>tkLocalMs(h,tz,n);window.cpTkWx=()=>tkWxMaybe(true);
/* restore after reload */
{const s=store.get("tk",null);if(s&&s.on&&(s.reg||s.flt)&&Date.now()-(s.at||0)<36*3600000){TKS=s;$("tkReg").value=s.reg||"";$("tkFlt").value=s.flt||"";$("tkDep").value=s.dep||"";$("tkAp").value=s.ap||"";$("tkTurn").value=s.turn||30;setTimeout(tkPoll,1500)}
  else if(s)store.set("tk",null);tkRender()}
setInterval(()=>{if(TKS&&TKS.on&&!document.hidden){tkRender()}},15000);
let tkTick=0;setInterval(()=>{if(document.hidden||!tkOn())return;tkTick++;try{render()}catch(e){}if(tkTick%2===0){try{drawMap()}catch(e){}}if(tkTick%5===0){try{pickScene()}catch(e){}}},1000);
/* ===== v23: synthetic 3D window view + 3D route pack =====
   Display only: svState() reads the position, attitude, sun and pack weather; nothing here writes PH, LOG, BOOK or the GPS state.
   three.js (sv3d.js + three.module.min.js) is only loaded when the 3D view is opened. */
if(S.svfx==null)S.svfx="none";if(S.svview==null)S.svview="fwd";if(S.svfps==null)S.svfps="30";if(S.svwx==null)S.svwx="on";applySeg();
const SV={on:false,ctl:null,mod:null,pk:null,force:null,cov:{at:0,ids:[]},hudAt:0,msg:""};
const svPack=()=>SV.pk||(SV.pk=import("./svpack.js"));
function svState(){if(SV.force)return SV.force;const tko=tkOn(),L=viewL();if(!L||L.lat==null)return null;let sun=null;try{sun=sunPos(Date.now(),L.lat,L.lon)}catch(e){}
  let wx=null;if(S.wxs!=="off"&&S.svwx!=="off"){try{const q=wxNow();if(q)wx={cls:wxClass(q),vis:q.vis,cc:q.cc,ccl:q.ccl,pr:q.pr}}catch(e){}}
  const ta=tko?tkAtt():att;return {lat:L.lat,lon:L.lon,alt:L.alt,trk:L.trk,spd:L.spd,pitch:ta.p||0,bank:ta.r||0,sun,wx,ph:tko?tkPhase():PH.p,tk:tko?TKS.reg:""}}
function svMsg(t){SV.msg=t||"";const m=$("svMsg");m.textContent=SV.msg;m.style.display=SV.msg?"block":"none"}
function svHud(st,p){const c=$("svHud"),pr=Math.min(2,window.devicePixelRatio||1),w=c.clientWidth,h=c.clientHeight;if(!w||!h)return;
  if(c.width!==Math.round(w*pr)||c.height!==Math.round(h*pr)){c.width=Math.round(w*pr);c.height=Math.round(h*pr)}
  const x=c.getContext("2d");x.setTransform(pr,0,0,pr,0,0);x.clearRect(0,0,w,h);const col=S.svfx==="nvg"?"#d6ffd6":S.svfx==="flir"?"#ffffff":"#7dffb0";
  x.strokeStyle=col;x.fillStyle=col;x.lineWidth=1.6;x.shadowColor="#000";x.shadowBlur=4;x.font="700 15px \"B612 Mono\",ui-monospace,monospace";x.textBaseline="middle";
  const cy=h*0.5;if(S.svview==="fwd"){x.beginPath();x.moveTo(w/2-58,cy);x.lineTo(w/2-22,cy);x.moveTo(w/2+22,cy);x.lineTo(w/2+58,cy);x.stroke();x.beginPath();x.arc(w/2,cy,6,0,7);x.stroke()}
  const top=Math.max(64,h*0.1)+(SV.msg?($("svMsg").offsetHeight||40)+12:0);x.textAlign="center";x.fillText((S.svview==="fwd"?"TRK ":S.svview==="left"?"LEFT · ":"RIGHT · ")+String(Math.round(((p.hd%360)+360)%360)).padStart(3,"0")+"°",w/2,top);
  x.textAlign="left";const s=fSpd(p.spd);x.fillText((s==null?"---":Math.round(s))+" "+(S.spd==="kmh"?"KM/H":S.spd.toUpperCase()),12,cy+40);
  x.textAlign="right";const a=p.alt==null?null:fAlt(p.alt);x.fillText((a==null?"---":(Math.round(a/(S.alt==="ft"?10:1))*(S.alt==="ft"?10:1)).toLocaleString())+" "+S.alt.toUpperCase(),w-12,cy+40);
  x.font="600 11px \"B612 Mono\",ui-monospace,monospace";x.textAlign="center";x.globalAlpha=.85;x.fillText("SYNTHETIC VIEW · "+({none:"NORMAL",nvg:"NVG",flir:"FLIR",crt:"CRT"}[S.svfx]||"")+" · OFFLINE",w/2,top+20);x.globalAlpha=1}
function svFrame(st,p){const now=Date.now();if(SV.snapReq){SV.snapReq=false;try{snapTake()}catch(e){}}{const ph=(tkOn()?"TRACKING "+TKS.reg+" · "+(PHN[tkPhase()]||""):(PHN[p.ph||PH.p]||""));if($("svPhase").textContent!==ph)$("svPhase").textContent=ph}
  if(now-SV.cov.at>4000){SV.cov.at=now;svPack().then(pk=>{SV.cov.ids=pk.covers(p.lat,p.lon)}).catch(()=>{})}
  if(now-SV.hudAt>66){SV.hudAt=now;try{svHud(st,p)}catch(e){}}
  const L=st.lit;const dr=$("svDrops");const rain=L&&L.rain&&S.svfx==="none";dr.style.display=rain?"block":"none";if(rain)dr.style.backgroundImage="url("+(L.rain>1?"drops-heavy.webp":"drops-light.webp")+")";
  if(!SV.cov.ids.length&&SV.cov.at)svMsg("No 3D route pack covers this spot, so this is a plain sky and horizon. Download one on the Route page before you fly.");
  else if(SV.msg&&!/could not|paused/.test(SV.msg))svMsg("")}
async function svOpen(){if(SV.on)return;try{if(arOn)arClose();if(fhOn)fhExit();if(cmpOn)cmpClose()}catch(e){}SV.on=true;SV.cov={at:0,ids:[]};document.body.classList.add("sv");$("svPhase").textContent=PHN[PH.p]||"";svMsg("Loading the 3D view…");
  try{const [m]=await Promise.all([SV.mod||(SV.mod=import("./sv3d.js")),svPack()]);if(!SV.on)return;
    const lowGpu=(navigator.hardwareConcurrency||4)<=2;
    SV.ctl=m.create($("svCv"),{state:svState,frame:svFrame,err:t=>svMsg(t)},{fx:S.svfx,view:S.svview,fps:+S.svfps||30,wx:S.svwx!=="off",low:lowGpu,dpr:1.5});
    if(!svState())svMsg("Waiting for a GPS fix. Tap Start GPS on the HUD page, track an aircraft on the Route page, or run the Demo flight.");else svMsg("")}
  catch(e){SV.mod=null;svMsg("The 3D view could not start: "+(e&&e.message||e))}
  try{wantWake||$("wakeBtn").click()}catch(e){}try{$("svExit").focus()}catch(e){}}
function svClose(){if(!SV.on)return;SV.on=false;document.body.classList.remove("sv","svh");if(SV.ctl){try{SV.ctl.close()}catch(e){}SV.ctl=null}svMsg("");try{$("svBtn").focus()}catch(e){}setTimeout(()=>{try{landCheck()}catch(e){}},50)}
$("svBtn").onclick=()=>{hap(10);svOpen()};$("svExit").onclick=svClose;
$("svHide").onclick=()=>document.body.classList.add("svh");$("svShow").onclick=()=>document.body.classList.remove("svh");
document.addEventListener("keydown",e=>{if(SV.on&&e.key==="Escape")svClose()});
for(const k of ["svfx","svview","svfps","svwx"]){const s=document.querySelector('#svOv .seg[data-k="'+k+'"]');if(s)s.addEventListener("click",()=>{const c=SV.ctl;if(!c)return;c.setFx(S.svfx);c.setView(S.svview);c.setFps(+S.svfps||30);c.setWx(S.svwx!=="off")})}
/* ---- 3D route pack UI (Route page) ---- */
const SVP={plan:null,run:false};
function svpSel(){const f=$("svpFrom"),t=$("svpTo"),src=$("from").innerHTML;if(f.options.length!==$("from").options.length){const fv=f.value||S.from,tv=t.value||S.to;f.innerHTML=src;t.innerHTML=src.replace("Departure…","Arrival…");f.value=fv||"";t.value=tv||""}}
async function svpEst(){svpSel();const pk=await svPack();const fr=apBy($("svpFrom").value),to=apBy($("svpTo").value);
  if(!fr||!to||fr.c===to.c){SVP.plan=null;if(!SVP.run)$("svpTxt").textContent="Pick a departure and destination for the 3D pack.";svpList();return}
  const P=pk.plan(fr,to,{w:$("svpW").value,bm:$("svpBm").checked,asp:!$("svpAsp").disabled&&$("svpAsp").checked});SVP.plan=P;
  const by=l=>P.rows.filter(r=>r.l===l).reduce((s,r)=>s+r.est,0);
  if(!SVP.run)$("svpTxt").textContent=`${fr.c} → ${to.c} (${P.km.toLocaleString()} km): about ${pk.fmtMB(P.est+P.aspEst)} for ${P.keys.length.toLocaleString()} tiles (terrain ${pk.fmtMB(by("d"))}, imagery ${pk.fmtMB(by("i"))}${P.bm?", night lights "+pk.fmtMB(by("n")):""}${P.asp?", airspace file about 8 MB, stored much smaller":""}).`+(P.need<P.est*0.98?` About ${pk.fmtMB(P.need+P.aspEst)} is new; the rest is already on the phone.`:"")+" Download on Wi-Fi if you can.";
  svpList()}
async function svpList(){const pk=await svPack();const all=Object.values(pk.packs()),rn=pk.running();const ul=$("svpList");
  ul.innerHTML=all.length?all.map(p=>`<li class="rt"><div><b>${esc(p.from)} → ${esc(p.to)}</b><span class="sub blk">${pk.fmtMB(pk.packBytes(p))} · ${p.w==="wide"?"wide":"standard"}${p.bm?" · night lights":""}${p.aspB?" · airspace":p.asp&&p.aspErr?" · airspace unavailable":""} · ${rn&&rn.id===p.id?"downloading "+Math.round(100*rn.done/Math.max(1,rn.total))+"%":p.done?"complete":"incomplete, tap Resume"}</span></div><div class="row"><button data-a="v3d" data-id="${esc(p.id)}" class="pri" aria-label="Open the 3D window view for ${esc(p.from)} to ${esc(p.to)}">3D view</button>${p.done||(rn&&rn.id===p.id)?"":`<button data-a="res" data-net data-id="${esc(p.id)}">Resume</button>`}<button data-a="del" data-id="${esc(p.id)}" aria-label="Delete 3D pack ${esc(p.from)} to ${esc(p.to)}">Delete</button></div></li>`).join(""):'<li><span>No 3D packs on this phone yet.</span></li>';
  let q="";try{if(navigator.storage&&navigator.storage.estimate){const e=await navigator.storage.estimate();if(e&&e.quota)q=` Browser storage in use: ${pk.fmtMB(e.usage||0)} of about ${pk.fmtMB(e.quota)} allowed.`}}catch(e){}
  $("svpStore").textContent=`3D packs use ${pk.fmtMB(pk.used())} on this phone.`+q;$("svpUse").textContent=all.length?all.length+" saved":"";
  const dn=all.filter(p=>p.done).map(p=>p.from+" → "+p.to);$("svPk").textContent=all.length?"3D route packs on this phone: "+all.map(p=>p.from+" → "+p.to+(p.done?"":rn&&rn.id===p.id?" (downloading)":" (incomplete)")).join(", ")+". Open the 3D view any time; over a covered route you see terrain and satellite imagery.":"No 3D route pack on this phone yet: download one on the Route page (Terrain and satellite for the 3D view).";
  $("svpOpen").style.display=all.length?"":"none"}
async function svpGo(P,auto){const pk=await svPack();if(SVP.run||!P)return;SVP.run=true;SVP.auto=!!auto;SVP.want=P;$("svpGo").disabled=true;$("svpStop").style.display="";$("svpBar").style.display="block";
  const bar=$("svpBar").firstElementChild;let t0=Date.now();
  try{const r=await pk.download(P,s=>{bar.style.width=Math.round(100*s.done/Math.max(1,s.total))+"%";if(Date.now()-t0>250){t0=Date.now();$("svpTxt").textContent=`Downloading the 3D pack ${P.from} → ${P.to}: ${s.done.toLocaleString()} of ${s.total.toLocaleString()} · ${pk.fmtMB(s.bytes)} so far${s.fail?" · "+s.fail+" failed":""}. You can use the other screens. If you leave the app or lock the phone it pauses, then carries on by itself when you come back.`;if(Date.now()-(SVP.lt||0)>2000){SVP.lt=Date.now();svpList()}}},
      {proxy:(($("tkProxy")&&$("tkProxy").value.trim())||TK_PROXY)});
    const tot=pk.packBytes(pk.packs()[P.id]||{});
    $("svpTxt").textContent=r.stopped?`Paused. ${P.from} → ${P.to} is partly saved; tap Resume to carry on.`:r.ok?`✓ 3D pack saved for ${P.from} → ${P.to}: ${pk.fmtMB(tot)} on the phone. Works offline in the 3D window view.`+(r.aspErr?" Airspace was skipped: "+r.aspErr+".":""):`Saved most of ${P.from} → ${P.to}, but ${r.fail} tiles failed (${r.err}). Tap Resume when you have a better connection.`+(r.aspErr?" Airspace: "+r.aspErr+".":"");
    if(r.ok){hap(20);SVP.want=null;SVP.retry=0}else if(r.stopped)SVP.want=null;
    else if(r.fail&&(SVP.retry=(SVP.retry||0)+1)<=3&&!document.hidden&&cfOk()){$("svpTxt").textContent+=" Retrying the missing tiles…";setTimeout(()=>{if(!SVP.run&&SVP.want)svpGo(SVP.want,true)},4000)}}
  catch(e){$("svpTxt").textContent="3D pack download stopped: "+(e&&e.message||e)}
  finally{SVP.run=false;$("svpGo").disabled=false;$("svpStop").style.display="none";setTimeout(()=>{$("svpBar").style.display="none"},1500);svpList()}}
$("svpGo").onclick=async()=>{await svpEst();if(!SVP.plan){$("svpTxt").textContent="Pick a departure and destination for the 3D pack.";return}svpGo(SVP.plan)};
$("svpStop").onclick=async()=>{SVP.want=null;const pk=await svPack();pk.stop();pk.pause(pk.running()&&pk.running().id,true)};
/* v24: carry on an unfinished pack by itself when the app comes back (iOS pauses web pages in the background) */
async function svpAuto(){if(SVP.run||document.hidden||!cfOk()||S.net==="off")return;const pk=await svPack();const p=Object.values(pk.packs()).find(q=>!q.done&&!q.paused&&q.keys&&q.keys.length&&Date.now()-(q.started||0)<3*86400000);
  if(!p)return;const fr=apBy(p.from),to=apBy(p.to);if(fr&&to){$("svpTxt").textContent="Carrying on the 3D pack "+p.from+" → "+p.to+"…";svpGo(pk.plan(fr,to,{w:p.w,bm:p.bm,asp:!!p.asp&&!$("svpAsp").disabled}),true)}}
document.addEventListener("visibilitychange",()=>{if(!document.hidden)setTimeout(svpAuto,2500)});window.addEventListener("online",()=>setTimeout(svpAuto,2500));setTimeout(svpAuto,6000);
$("svpOpen").onclick=()=>{hap(10);svOpen()};
$("svGoPack").onclick=()=>{try{pgGo(PG.els.findIndex(e=>e.id==="pg-route"))}catch(e){}setTimeout(()=>{$("svpTile").scrollIntoView({block:"start"})},400)};
for(const id of ["svpFrom","svpTo","svpW","svpBm","svpAsp"])$(id).addEventListener("change",()=>svpEst());
$("svpList").onclick=async e=>{const b=e.target.closest("button");if(!b)return;const pk=await svPack();const p=pk.packs()[b.dataset.id];if(!p)return;
  if(b.dataset.a==="v3d"){hap(10);svOpen();return}
  if(b.dataset.a==="del"){if(SVP.run)return;const fr=await pk.remove(p.id);$("svpTxt").textContent=`Deleted the 3D pack ${p.from} → ${p.to}; freed ${pk.fmtMB(fr)}.`;svpList()}
  else if(b.dataset.a==="res"){pk.pause(p.id,false);const fr=apBy(p.from),to=apBy(p.to);if(fr&&to)svpGo(pk.plan(fr,to,{w:p.w,bm:p.bm,asp:!!p.asp&&!$("svpAsp").disabled}))}};
$("from").addEventListener("change",()=>{$("svpFrom").value=$("from").value;svpEst()});$("to").addEventListener("change",()=>{$("svpTo").value=$("to").value;svpEst()});
/* load the small pack module only when the tile comes into view */
try{new IntersectionObserver((en,ob)=>{if(en.some(x=>x.isIntersecting)){ob.disconnect();svpSel();svpEst()}}).observe($("svpTile").closest(".page")||$("svpTile"))}catch(e){svpSel();svpEst()}
try{new IntersectionObserver(en=>{if(en.some(x=>x.isIntersecting))svpList()}).observe($("svTile"))}catch(e){}
/* test hooks */
window.cpSV={open:svOpen,close:svClose,on:()=>SV.on,status:()=>SV.ctl?SV.ctl.status():null,probe:()=>SV.ctl?SV.ctl.probe():null,ready:()=>!!(SV.ctl&&SV.ctl.ready()),
  force:o=>{SV.force=o||null},msg:()=>SV.msg,state:()=>svState(),est:async(a,b,o)=>{const pk=await svPack();const P=pk.plan(apBy(a),apBy(b),o||{});return {km:P.km,tiles:P.keys.length,est:P.est,rows:P.rows.map(r=>({l:r.l,z:r.z,n:r.keys.length,est:r.est}))}},
  pack:async()=>{const pk=await svPack();return {packs:pk.packs(),used:pk.used(),run:pk.running()}},refresh:()=>svpEst(),list:()=>svpList(),auto:()=>svpAuto()};
/* ===== v23 features (built 21 Nov 2026): window seat guide, AR identify, replay+, stats and badges, turbulence master warning,
   bumps felt, arrival helper+, flight card+, live flight sharing / follow along, connected features, flight diary, body clock,
   landing score, top of descent, sunrise/sunset at altitude, spot the other plane.
   Display only unless stated: nothing here changes phases. Logbook additions (owner request): aircraft type, diary notes,
   landing score. All live data goes through the Cabin Panel Worker's provider-neutral routes (scale-ready). ===== */
/* ---- central feature toggles and service config (one place; a public build can switch features or endpoints here) ---- */
const FEAT=Object.assign({seat:1,identify:1,replay:1,stats:1,turb:1,bumps:1,arrival:1,card:1,share:1,follow:1,net:1,diary:1,bodyclock:1,landing:1,tod:1,sunalt:1,spot:1},store.get("feat",{}));
const SVC={base:TK_PROXY.replace(/\/+$/,""),appKey:"",ping:"/ping",share:"/share",near:"/api/near",wx:"/api/wx/now",ac:"/api/ac",info:"/api/info/",tle:"/api/tle/iss",
  nearNm:25,nearEveryMs:60000,nearPerDay:150,shareSampleMs:15000,shareSendMs:45000,followPollMs:30000};
/* every Worker call goes through here, so a per-user app key (X-App-Key) can be added later without touching features */
function svcFetch(path,opt,ms){opt=Object.assign({cache:"no-store"},opt||{});if(SVC.appKey)opt.headers=Object.assign({"X-App-Key":SVC.appKey},opt.headers||{});
  const c=new AbortController(),t=setTimeout(()=>c.abort(),ms||12000);opt.signal=c.signal;return fetch(SVC.base+path,opt).finally(()=>clearTimeout(t))}
/* tracker (v22g) now uses the neutral /api/ac routes on the built-in Worker; an override proxy keeps the adsb.lol URL shape */
function tkUrl(path){const px=String(S.tkProxy||"").trim();if(tkPxOk(px))return px.replace(/\/*$/,"/")+TK_ADSB+path;let base;try{base=SVC.base}catch(e){base=TK_PROXY.replace(/\/+$/,"")}
  const m=path.match(/^\/v2\/(reg|hex|callsign)\/(.+)$/)||path.match(/^\/1\/trace\/full\/(.+)$/);if(!m)return tkPx()+TK_ADSB+path;
  return base+"/api/ac"+(m.length===3?"/"+m[1]+"/"+m[2]:"/trace/"+m[1])}
const setTx=(el,t)=>{if(el&&el.textContent!==t)el.textContent=t};
const w180b=d=>((d%360)+540)%360-180;
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
const hhmm=(ms,tz)=>{try{return new Date(ms).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:tz||undefined})}catch(e){return new Date(ms).toTimeString().slice(0,5)}};
const sideUp=s=>s==="left"?"LEFT":s==="right"?"RIGHT":s;

/* ================= 9) Connected features: Auto / On / Off ================= */
if(!["auto","on","off"].includes(S.net))S.net="auto";
const CF={ok:navigator.onLine!==false,probeOk:null,probeAt:0,busy:false,iv:0};
function cfOk(){if(navigator.onLine===false)return false;try{return CF.ok}catch(e){return true}}
function cfWhy(){return S.net==="off"?"Connected features off":"Offline"}
async function cfProbe(){if(CF.busy||S.net!=="auto")return;CF.busy=true;
  try{await svcFetch(SVC.ping,{},6000);CF.probeOk=true}catch(e){CF.probeOk=false}   /* any answer at all means we are connected */
  CF.busy=false;CF.probeAt=Date.now();cfEval()}
function cfEval(){const was=CF.ok;CF.ok=S.net==="off"?false:navigator.onLine===false?false:S.net==="on"?true:CF.probeOk!==false;cfApply();
  if(CF.ok&&!was){try{window.dispatchEvent(new Event("cp-online"))}catch(e){}}clearTimeout(CF.iv);CF.iv=setTimeout(()=>{cfProbe().finally(()=>{if(S.net!=="auto")cfEval()})},CF.ok?180000:45000)}
function cfApply(){const ok=CF.ok,why=cfWhy();
  document.querySelectorAll("[data-net]").forEach(el=>{
    if(!ok){if(!el.disabled){el.disabled=true;el.dataset.cfd="1"}}else if(el.dataset.cfd){delete el.dataset.cfd;if(!el.dataset.busy)el.disabled=false}
    el.classList.toggle("cfdis",!ok);el.title=ok?"":why;const lab=el.closest("label.chk");if(lab)lab.classList.toggle("cfdis",!ok);
    let w=el.nextElementSibling;if(!(w&&w.classList.contains("cfWhy"))){w=lab?lab.querySelector(".cfWhy"):null;if(!w){w=document.createElement("span");w.className="cfWhy";(lab||el).insertAdjacentElement(lab?"beforeend":"afterend",w)}}
    setTx(w,ok?"":why);w.style.display=ok?"none":""});
  const t=$("netTag");if(t){t.style.display=ok?"none":"";setTx(t,S.net==="off"?"NET OFF":"OFFLINE")}
  const st=$("netSt");if(st)setTx(st,S.net==="off"?"Off: nothing goes online. Weather refresh, flight lookup, packs, tracking, sharing and live lookups are greyed out.":
    !ok?"Offline: online features are greyed out and come back by themselves when a connection returns.":S.net==="on"?"On: online features are always offered (no connection check).":"Auto: connected"+(CF.probeAt?" (checked "+hhmm(CF.probeAt)+")":"")+". Online features are available.")}
{let cfT=0;new MutationObserver(()=>{clearTimeout(cfT);cfT=setTimeout(()=>{try{cfApply()}catch(e){}},60)}).observe(document.body,{childList:true,subtree:true})}
window.addEventListener("online",()=>{cfEval();cfProbe()});window.addEventListener("offline",cfEval);
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&Date.now()-CF.probeAt>60000)cfProbe()});
document.addEventListener("click",e=>{const el=e.target&&e.target.closest&&e.target.closest("[data-net]");if(el&&!cfOk()){e.preventDefault();e.stopImmediatePropagation();say(cfWhy()+".")}},true);
document.querySelector('.seg[data-k="net"]')&&document.querySelector('.seg[data-k="net"]').addEventListener("click",()=>setTimeout(()=>{CF.probeOk=null;cfEval();cfProbe()},0));
cfEval();setTimeout(cfProbe,800);
window.cpNet=o=>{if(o&&o.probe)return cfProbe().then(()=>({ok:CF.ok,mode:S.net}));return {ok:CF.ok,mode:S.net,probeOk:CF.probeOk,probeAt:CF.probeAt,why:CF.ok?"":cfWhy()}};

/* ================= runways, wind, cities (shared by seat guide, arrival helper, body clock) ================= */
const CITY={SYD:[-33.8688,151.2093,"Sydney CBD and harbour"],MEL:[-37.8136,144.9631,"Melbourne CBD"],BNE:[-27.4698,153.0251,"Brisbane CBD and river"],PER:[-31.9523,115.8613,"Perth CBD and Swan River"],
  ADL:[-34.9285,138.6007,"Adelaide CBD"],CBR:[-35.2809,149.13,"Canberra and Lake Burley Griffin"],HBA:[-42.8821,147.3272,"Hobart and the Derwent"],DRW:[-12.4634,130.8456,"Darwin city and harbour"],
  CNS:[-16.9186,145.7781,"Cairns and the inlet"],OOL:[-28.0023,153.4145,"Surfers Paradise high-rises"],TSV:[-19.259,146.8169,"Townsville and Castle Hill"],NTL:[-32.9283,151.7817,"Newcastle"],
  MCY:[-26.65,153.09,"Sunshine Coast beaches"],LST:[-41.4332,147.1441,"Launceston"],ASP:[-23.698,133.8807,"Alice Springs"],AKL:[-36.8485,174.7633,"Auckland CBD and Sky Tower"],
  CHC:[-43.5321,172.6362,"Christchurch"],SIN:[1.2903,103.8519,"Singapore city"],HKG:[22.2793,114.1628,"Hong Kong harbour"],DPS:[-8.65,115.2167,"Denpasar"],NAN:[-17.7765,177.435,"Nadi"],LAX:[34.0522,-118.2437,"downtown LA"]};
function cityOf(c){const k=CITY[c];if(k)return {lat:k[0],lon:k[1],n:k[2]};const a=apBy(c);if(!a)return null;let best=null,bd=40000;for(const l of LM){if(l.kind!=="town")continue;const d=dist(a,l);if(d<bd){bd=d;best=l}}return best?{lat:best.lat,lon:best.lon,n:best.n}:null}
function rwyEnds(c){const a=RWY&&RWY.find(r=>r[0]===c);if(!a||!Array.isArray(a[4]))return [];const out=[];
  for(const r of a[4]){const A={lat:r[2],lon:r[3]},B={lat:r[4],lon:r[5]};if(A.lat==null||B.lat==null)continue;const len=dist(A,B);if(len<900)continue;out.push({id:String(r[0]),hdg:brg(A,B),thr:A,end:B,len});out.push({id:String(r[1]),hdg:brg(B,A),thr:B,end:A,len})}return out}
/* wind {d: from °T, s: kt}; course = direction you arrive (or depart). Long runways only; headwind wins, else straight-in. */
function rwyPick(c,wind,course){const e=rwyEnds(c);if(!e.length)return null;const mx=Math.max(...e.map(r=>r.len)),cand=e.filter(r=>r.len>=0.75*mx);
  let best=null,bs=-1e9,how="";const useW=wind&&wind.s!=null&&wind.d!=null&&wind.s>=6;
  for(const r of cand){const hw=useW?wind.s*Math.cos(rad(wind.d-r.hdg)):0,al=course==null?0:Math.cos(rad(w180b(r.hdg-course)));const s=useW?hw*10+al:al;if(s>bs){bs=s;best=r}}
  how=useW?"from forecast wind "+String(Math.round(wind.d/10)*10%360||360).padStart(3,"0")+"/"+Math.round(wind.s)+" kt":"no wind data: straight-in guess";
  const par=cand.filter(r=>r!==best&&Math.abs(w180b(r.hdg-best.hdg))<6).map(r=>r.id);return {r:best,id:[best.id].concat(par).join("/"),how}}
function packWind(pk,end){const s=pk&&pk.smp&&pk.smp.length?(end?pk.smp[pk.smp.length-1]:pk.smp[0]):null;if(!s)return null;const l=s.lv.find(q=>q[0]===850);return l&&l[2]!=null&&l[3]!=null?{d:l[3],s:l[2]*0.7}:null}
function packFor(f,t){if(!f||!t)return null;return store.get("pack_"+rtKey(f,t),null)}
/* ================= sun along a route (shared: seat guide, sunrise/sunset at altitude) =================
   Walks the route minute by minute at the planned (or current) speed and height. The horizon dip at height makes the
   sun rise earlier / set later for you than on the ground below (sunThr). Returns sun events with time, side and how much
   earlier/later than on the ground. */
function sunAlong(o){/* o: {fr,to,t0,f0,spd,altFn(f)->m, maxMin} */
  const tot=dist(o.fr,o.to),spd=o.spd||230,ev=[],glare={left:0,right:0};let prev=null,prevG=null,f=o.f0||0;
  for(let m=0;m<=(o.maxMin||1080);m++){const t=o.t0+m*60000;f=Math.min(1,(o.f0||0)+spd*m*60/tot);
    const p=gcPoint(o.fr,o.to,Math.min(f,0.9999)),q=gcPoint(o.fr,o.to,Math.min(1,f+0.002)),crs=brg(p,q),alt=o.altFn(f),sp=sunPos(t,p.lat,p.lon);
    const a=sp.el-sunThr(alt),g=sp.el-sunThr(0),rel=w180b(sp.az-crs),sd=rel>0?"right":"left";
    if(a>0&&sp.el<35&&Math.abs(rel)>25&&Math.abs(rel)<155)glare[sd]++;
    if(prev!=null&&(a>0)!==(prev>0)){const e={t,up:a>0,side:Math.abs(rel)<20?"ahead":Math.abs(rel)>160?"behind":sd,f,alt,az:sp.az,m};
      /* same spot on the ground: when does the ground below see it? */
      let tg=null;for(let k=-90;k<=90;k++){const g1=sunPos(t+k*60000,p.lat,p.lon).el-sunThr(0),g0=sunPos(t+(k-1)*60000,p.lat,p.lon).el-sunThr(0);if((g1>0)!==(g0>0)&&(g1>0)===e.up){tg=t+k*60000;break}}
      e.vsGround=tg==null?null:Math.round((t-tg)/60000);ev.push(e)}
    prev=a;prevG=g;if(f>=1)break}
  return {ev,glare,mins:Math.round(tot/spd/60)}}

/* ================= 1) Window seat guide ================= */
const WSK={lm:3,geo:2.4,town:1.2,vfr:1,wiki:1.4,ap:0.6};
function landAt(p){for(const poly of COAST){let ins=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a[0]>p.lat)!==(b[0]>p.lat))&&(p.lon<(b[1]-a[1])*(p.lat-a[0])/(b[0]-a[0])+a[1]))ins=!ins}if(ins)return true}return false}
function depMs(){const tv=$("packDep")&&$("packDep").value;if(/^\d\d:\d\d/.test(tv||"")){const [hh,mm]=tv.split(":").map(Number),d=new Date();d.setHours(hh,mm,0,0);if(d.getTime()<Date.now()-3*3600000)d.setDate(d.getDate()+1);return d.getTime()}return null}
function seatGuide(fc,tc,dep){const fr=apBy(fc),to=apBy(tc);if(!fr||!to||fr.c===to.c)return null;
  const tot=dist(fr,to),spd=230,c12=brg(fr,to),pk=packFor(fc,tc),sc={left:0,right:0},it={left:[],right:[]},notes=[],below=[];
  const add=(sd,w,txt,min)=>{sc[sd]+=w;it[sd].push({w,txt,min})};
  const cands=lmAll().map(l=>({n:l.n,lat:l.lat,lon:l.lon,k:l.kind||"lm",r:l.r||2})).concat(AP.filter(a=>a.c!==fr.c&&a.c!==to.c).map(a=>({n:a.n+" airport",lat:a.lat,lon:a.lon,k:"ap",r:2})));
  for(const c of cands){const d13=dist(fr,c)/R,dth=rad(brg(fr,c)-c12),xt=Math.asin(Math.sin(d13)*Math.sin(dth))*R,at=Math.acos(clampN(Math.cos(d13)/Math.cos(xt/R),-1,1))*R*(Math.cos(dth)<0?-1:1);
    if(at<8000||at>tot-8000)continue;const f=at/tot,alt=planAlt(f,tot),vis=Math.min(90000,8000+alt*7);if(Math.abs(xt)>vis)continue;
    const min=Math.round(at/spd/60);if(Math.abs(xt)<3000){below.push(c.n);continue}
    const w=(WSK[c.k]||1)*(1-0.6*Math.abs(xt)/vis)*(c.r>=10?1.3:1);add(xt>0?"right":"left",w,c.n+" · "+Math.round(fDst(Math.abs(xt)))+" "+S.dst+" off",min)}
  /* coastline and high ground: sample every ~2 min of flying */
  const N=Math.max(20,Math.min(160,Math.round(tot/25000))),cm={left:0,right:0},hm2={left:0,right:0},stepMin=tot/spd/60/N;
  for(let i=1;i<N;i++){const f=i/N,p=gcPoint(fr,to,f),q=gcPoint(fr,to,Math.min(1,f+0.003)),crs=brg(p,q),lp=landAt(p);
    for(const sd of ["left","right"]){const o=dPt(p,crs+(sd==="right"?90:-90),25000);if(landAt(o)!==lp)cm[sd]+=stepMin;let h=0;try{h=elevAt(o.lat,o.lon)||0}catch(e){}if(h>900&&lp)hm2[sd]+=stepMin}}
  for(const sd of ["left","right"]){if(cm[sd]>=4)add(sd,Math.min(4,cm[sd]*0.12),"Coastline for about "+Math.round(cm[sd])+" min",null);if(hm2[sd]>=4)add(sd,Math.min(3,hm2[sd]*0.1),"Mountains and high ground for about "+Math.round(hm2[sd])+" min",null)}
  /* departure climb-out and approach: likely runway from the pack's forecast wind, city side */
  const rd=rwyPick(fr.c,packWind(pk,false),c12),ra=rwyPick(to.c,packWind(pk,true),brg(to,fr)+180);
  let rwTxt=[];
  if(rd){const ct=cityOf(fr.c);rwTxt.push("Departing "+fr.c+" runway "+rd.id+" ("+rd.how+")");if(ct){const p=dPt(rd.r.end,rd.r.hdg,4000),rel=w180b(brg(p,ct)-rd.r.hdg);if(Math.abs(rel)>15&&Math.abs(rel)<165&&dist(p,ct)<40000)add(rel>0?"right":"left",3,ct.n+" on the climb-out",1)}}
  if(ra){const ct=cityOf(to.c);rwTxt.push("Landing "+to.c+" runway "+ra.id+" ("+ra.how+")");if(ct){const p=dPt(ra.r.thr,ra.r.hdg+180,9000),rel=w180b(brg(p,ct)-ra.r.hdg);if(Math.abs(rel)>12&&Math.abs(rel)<168&&dist(p,ct)<45000)add(rel>0?"right":"left",4,ct.n+" on final approach",Math.round(tot/spd/60))}}
  /* sun: glare and sunrise/sunset from the departure time */
  const t0=(dep||depMs()||Date.now())+15*60000,su=sunAlong({fr,to,t0,f0:0,spd,altFn:f=>planAlt(f,tot),maxMin:Math.round(tot/spd/60)+2});
  for(const e of su.ev){if(e.side!=="left"&&e.side!=="right"){notes.push((e.up?"Sunrise":"Sunset")+" straight "+e.side+" about "+hm(e.m*60)+" after take-off");continue}add(e.side,3,(e.up?"Sunrise":"Sunset")+" about "+hm(e.m*60)+" after take-off (~"+hhmm(e.t)+")",e.m)}
  const gl=su.glare.left>su.glare.right*1.5&&su.glare.left>=15?"left":su.glare.right>su.glare.left*1.5&&su.glare.right>=15?"right":null;
  if(gl)notes.push("Low sun on the "+sideUp(gl)+" side for about "+su.glare[gl]+" min: bright, you may want the blind down");
  if(below.length)notes.push("Passes almost overhead (both sides): "+below.slice(0,4).join(", "));
  for(const sd of ["left","right"])it[sd].sort((a,b)=>b.w-a.w);
  const mx=Math.max(sc.left,sc.right),best=mx<1?"either":Math.abs(sc.right-sc.left)<0.15*mx?"either":sc.right>sc.left?"right":"left";
  return {fr:fr.c,to:to.c,best,sc,it,notes,rw:rwTxt,mins:su.mins,dep:t0-15*60000,pack:!!pk}}
function seatRender(){const el=$("wsOut");if(!el||!FEAT.seat)return;const g=seatGuide(S.from,S.to,depMs());
  if(!g){el.innerHTML='<li><span>Pick your departure and destination above.</span></li>';$("wsBest").textContent="—";return}
  $("wsBest").innerHTML=g.best==="either"?"Either side is good":"Sit on the <b>"+sideUp(g.best)+"</b> · window seat "+(g.best==="left"?"A":"F");
  const row=sd=>g.it[sd].slice(0,5).map(x=>`<li${g.best===sd?' class="myside"':""}><b>${esc(sideUp(sd))}</b><span>${x.min!=null?"~"+esc(hm(x.min*60))+" · ":""}${esc(x.txt)}</span></li>`).join("");
  el.innerHTML=row("left")+row("right")+g.notes.map(n=>`<li><span>${esc(n)}</span></li>`).join("")+(g.rw.length?`<li><span>${esc(g.rw.join(". "))}. Runways change with the wind, so the approach side can flip.</span></li>`:"");
  $("wsNote").textContent=`${g.fr} → ${g.to}, about ${hm(g.mins*60)} in the air, departing ${hhmm(g.dep)}${$("packDep").value?"":" (set Departs in the pre-flight pack for sun times)"}${g.pack?"":"; no pre-flight pack, so the runway is a guess"}. Window seats: A = left, F = right on most single-aisle jets (wide-bodies: A left, K or J right). Score left ${g.sc.left.toFixed(1)} · right ${g.sc.right.toFixed(1)}.`}
window.cpSeat=(a,b,dep)=>seatGuide(a,b,dep);

/* ================= 11) Body clock / jet lag helper ================= */
function tzOffAt(tz,ms){try{const s=new Intl.DateTimeFormat("en-AU",{timeZone:tz,timeZoneName:"longOffset"}).formatToParts(new Date(ms)).find(p=>p.type==="timeZoneName").value;const m=s.match(/([+-])(\d{1,2}):?(\d{2})?/);return m?(m[1]==="-"?-1:1)*(+m[2]*60+(+m[3]||0)):0}catch(e){return null}}
const APTZ={AKL:"Pacific/Auckland",CHC:"Pacific/Auckland",WLG:"Pacific/Auckland",ZQN:"Pacific/Auckland",SIN:"Asia/Singapore",HKG:"Asia/Hong_Kong",DPS:"Asia/Makassar",NAN:"Pacific/Fiji",LAX:"America/Los_Angeles",NRT:"Asia/Tokyo",HND:"Asia/Tokyo",POM:"Pacific/Port_Moresby"};
function apTz(a){if(!a)return null;if(APTZ[a.c])return APTZ[a.c];if(a.tz&&tzOffAt(a.tz,Date.now())!=null)return a.tz;return "Australia/Sydney"}
function bodyClock(fc,tc,dep){const fr=apBy(fc),to=apBy(tc);if(!fr||!to||fr.c===to.c)return null;
  const t0=dep||depMs()||Date.now()+2*3600000,dur=(dist(fr,to)/230+25*60)*1000,t1=t0+dur,tzA=apTz(fr),tzB=apTz(to),oa=tzOffAt(tzA,t0),ob=tzOffAt(tzB,t1),sh=(ob-oa)/60;
  const locH=(ms,tz)=>{const o=tzOffAt(tz,ms);const d=new Date(ms+o*60000);return d.getUTCHours()+d.getUTCMinutes()/60};
  const atLocal=(baseMs,tz,h)=>{/* the next time it is h:00 at tz after baseMs-12h */let t=baseMs-12*3600000;for(let i=0;i<48*4;i++){if(Math.abs(locH(t,tz)-h)<0.13)return t;t+=900000}return null};
  const both=ms=>hhmm(ms,tzB)+" "+to.c+" time"+(sh?" ("+hhmm(ms,tzA)+" "+fr.c+")":"");
  const B=[],D=[],A=[],arrH=locH(t1,tzB),east=sh>0;
  const big=Math.abs(sh)>=2;
  if(!big){B.push("Time-zone change is "+(sh?Math.abs(sh)+" h":"nil")+": little or no jet lag. Keep your usual routine.")}
  else{B.push(east?`You fly ${Math.abs(sh)} h east: your body clock needs to run earlier.`:`You fly ${Math.abs(sh)} h west: your body clock needs to run later.`);
    if(Math.abs(sh)>=3)B.push(east?"For 2–3 nights before, go to bed and get up 30–60 min earlier each day.":"For 2–3 nights before, go to bed and get up 30–60 min later each day.");
    B.push(east?"Get bright morning light on the days before; dim the lights in the evening.":"Get light in the late afternoon and evening; avoid very early bright light.")}
  /* in flight: does the flight overlap night at the destination (22:00–06:00)? */
  let sl=null;for(let t=t0;t<t1;t+=600000){const h=locH(t,tzB);const night=h>=22||h<6;if(night){if(!sl)sl={a:t,b:t};sl.b=t+600000}else if(sl&&!sl.done)sl.done=true}
  const durH=dur/3600000;
  if(sl&&durH>=4)D.push(`Sleep on board during destination night: about ${both(sl.a)} to ${both(Math.min(sl.b,t1-30*60000))}.`);
  else if(sl)D.push("The flight crosses destination night but is short: a nap of 20–30 min at most, then stay awake until local bedtime.");
  else D.push(arrH>=17||arrH<2?"You arrive in the evening: stay awake on board (light, walk the aisle) and sleep at local bedtime.":"Stay awake on board: it's daytime at your destination.");
  D.push("Set your watch to "+to.c+" time when you board. Drink water; go easy on alcohol.");
  const bed=atLocal(t1,tzB,22),cut=bed&&bed>t1?bed-6*3600000:null;
  if(big){if(cut&&cut>t0)D.push("Last coffee or tea by "+both(cut)+" (6 h before 22:00 local bedtime).");else A.push("Coffee or tea in the morning only, none after about 16:00 local, for the first 2 days.");}
  A.push(`You land about ${both(t1)}.`);
  if(big){A.push(east?"First 2 days: get outdoor light from 07:00 to 10:00 local, and avoid bright light after 20:00.":"First 2 days: get outdoor light from 16:00 to 19:00 local, and avoid bright light before 08:00.");
    A.push("Eat meals at local times. Expect about "+Math.max(1,Math.round(Math.abs(sh)/(east?1:1.5)))+" day"+(Math.abs(sh)>1.5?"s":"")+" to adjust fully.")}
  else A.push("Eat and sleep at local times.");
  return {fr:fr.c,to:to.c,shift:sh,t0,t1,before:B,during:D,after:A,tzA,tzB}}
function bodyRender(){const el=$("bcOut");if(!el||!FEAT.bodyclock)return;const g=bodyClock(S.from,S.to,depMs());if(!g){el.innerHTML='<li><span>Pick your departure and destination above.</span></li>';return}
  const sec=(h,a)=>`<li class="bch"><b>${h}</b></li>`+a.map(x=>`<li><span>${esc(x)}</span></li>`).join("");
  $("bcHead").textContent=`${g.fr} → ${g.to}: ${g.shift===0?"no time change":(g.shift>0?"+":"−")+Math.abs(g.shift)+" h"}`;
  el.innerHTML=sec("Before",g.before)+sec("During the flight",g.during)+sec("After you land",g.after)}
window.cpBody=(a,b,dep)=>bodyClock(a,b,dep);

/* ================= 13) Time to top of descent (3:1 rule) ================= */
function todInfo(){const L=viewL()||last,to=apBy(S.to),fr=apBy(S.from);if(!L||!to||!fr||L.spd==null||L.spd<40)return null;
  const el=(apInfo(to.c)||[])[4]||0,tot=dist(fr,to),pl=plan(tot),cruise=PH.p==="cruise"||(demo&&demo.stg==="air"&&demo.vs===0)?Math.max(L.alt||0,pl.cr):Math.max(pl.cr,L.alt||0);
  const dd=Math.max(0,(cruise*FT-el)/1000*3*NMm),dg=dist(L,to),toGo=dg-dd,sec=toGo/L.spd;
  return {cruiseFt:Math.round(cruise*FT/100)*100,dd,dg,toGo,sec,t:Date.now()+sec*1000,past:toGo<=0,should:Math.max(0,Math.round((dg/NMm/3*1000+el)/100)*100),to:to.c,tz:to.tz}}
let todSaid=0;
function todRender(){const tl=$("todTile");if(!tl||!FEAT.tod)return;const i=todInfo();const air=["climb","cruise","descent","approach"].includes(PH.p)||(demo&&demo.stg==="air")||(REPLAY&&last&&last.spd>40)||(!!last&&last.spd>100&&(last.alt||0)>3000);
  if(!i||!air){tl.style.display="none";return}tl.style.display="";
  if(i.past){$("todBig").textContent="PAST T/D";$("todSub").textContent=`3:1 profile: about ${i.should.toLocaleString()} ft now, ${Math.round(fDst(i.dg))} ${S.dst} to ${i.to}. Estimate; the crew's descent will differ.`;return}
  $("todBig").textContent="T/D in "+hm(i.sec);$("todSub").textContent=`About ${hhmm(i.t)} phone time · ${Math.round(fDst(i.dd))} ${S.dst} before ${i.to} · from ${i.cruiseFt.toLocaleString()} ft by the 3:1 rule (3 nm per 1,000 ft). Estimate; the crew's point will differ.`;
  if(i.sec<300&&i.sec>200&&Date.now()-todSaid>600000){todSaid=Date.now();say("Top of descent in about five minutes.")}}
window.cpTod=()=>todInfo();

/* ================= 14) Sunrise / sunset at altitude, with an alert ================= */
if(!["on","off"].includes(S.sunAlert))S.sunAlert="on";
let SUNA={t:0,ev:null,said:0};
function sunAltNow(){const L=viewL()||last,fr=apBy(S.from),to=apBy(S.to);if(!L)return null;const air=L.spd!=null&&L.spd>40;
  if(fr&&to&&fr.c!==to.c){const tot=dist(fr,to),f0=clampN(1-dist(L,to)/tot,0,1);return sunAlong({fr,to,t0:Date.now(),f0,spd:air?L.spd:230,altFn:f=>air&&PH.p!=="descent"?Math.max(L.alt||0,0):planAlt(f,tot),maxMin:air?Math.round(dist(L,to)/L.spd/60)+1:0})}
  return null}
function sunAltPlan(){const fr=apBy(S.from),to=apBy(S.to);if(!fr||!to||fr.c===to.c)return null;const tot=dist(fr,to),t0=(depMs()||Date.now())+15*60000;return sunAlong({fr,to,t0,f0:0,spd:230,altFn:f=>planAlt(f,tot),maxMin:Math.round(tot/230/60)+2})}
function sunAltRender(){const el=$("saOut");if(!el||!FEAT.sunalt)return;const now=Date.now();if(now-SUNA.t>20000){SUNA.t=now;try{const L=last;SUNA.ev=L&&L.spd>40?sunAltNow():null;SUNA.pl=sunAltPlan()}catch(e){SUNA.ev=null}}
  const rows=[],fmt=e=>`${e.up?"Sunrise":"Sunset"} at about ${hhmm(e.t)} phone time on your ${e.side==="left"||e.side==="right"?sideUp(e.side)+" side":e.side}`+(e.vsGround?`, ${Math.abs(e.vsGround)} min ${(e.up?e.vsGround<0:e.vsGround>0)?(e.up?"earlier":"later"):(e.up?"later":"earlier")} than on the ground below`:"")+` (at ${Math.round(fAlt(e.alt)/100)*100} ${S.alt})`;
  if(SUNA.ev&&SUNA.ev.ev.length){const e=SUNA.ev.ev[0],mins=Math.round((e.t-now)/60000);rows.push(`<li class="myside"><b>${e.up?"Sunrise":"Sunset"} in ${esc(hm(mins*60))}</b><span>${esc(fmt(e))}</span></li>`);
    if(S.sunAlert==="on"&&mins<=10&&mins>=8&&now-SUNA.said>20*60000){SUNA.said=now;say((e.up?"Sunrise":"Sunset")+" in about ten minutes"+(e.side==="left"||e.side==="right"?", on your "+e.side+" side.":"."))}}
  else if(SUNA.ev)rows.push('<li><span>No sunrise or sunset before arrival from here.</span></li>');
  if(SUNA.pl){if(SUNA.pl.ev.length)SUNA.pl.ev.slice(0,2).forEach(e=>rows.push(`<li><b>Planned flight</b><span>${esc(fmt(e))}, ${esc(hm(e.m*60))} after take-off</span></li>`));else rows.push(`<li><b>Planned flight</b><span>No sunrise or sunset during the flight (departing ${esc(hhmm((depMs()||Date.now())))}).</span></li>`)}
  el.innerHTML=rows.join("")||'<li><span>Pick a route, or start GPS in flight.</span></li>'}
window.cpSunAlt=()=>({now:sunAltNow(),plan:sunAltPlan()});

/* test/diagnostic hook: next sunrise or sunset at a fixed place, seen from the ground and from altitude (horizon dip) */
window.cpSunAltAt=(lat,lon,ms,altM)=>{const out={};for(const [k,h] of [["gnd",0],["alt",altM]]){const thr=sunThr(h);let prev=sunPos(ms,lat,lon).el-thr;
  for(let m=1;m<=1440;m++){const t=ms+m*60000,v=sunPos(t,lat,lon).el-thr;if((prev<0)!==(v<0)){out[k]={t,up:v>0};break}prev=v}}return out};
/* ================= 2) AR Identify: what's under the crosshair ================= */
const KINDN={town:"Town",lm:"Landmark",vfr:"Landmark",wiki:"Place (Wikipedia)",ap:"Airport",dest:"Destination airport",orig:"Departure airport",mk:"Your mark",wpt:"Waypoint",ac:"Aircraft"};
function kindName(t){if(t.kind==="geo"){const n=t.n;return /Lake|Lagoon|Reservoir|Dam\b|Weir/i.test(n)?"Lake":/Mount|Mt\b|Peak|Range|Ranges|Bluff|Hill|Tops|Pinnacle/i.test(n)?"Mountain or range":/River|Creek/i.test(n)?"River":/Island/i.test(n)?"Island":/Bay|Cape|Head|Heads|Point|Strait|Gulf|Beach|Inlet/i.test(n)?"Coast":"Natural feature"}return KINDN[t.kind]||"Place"}
let ARI={last:null};
function arIdentify(){const v=AR.view,L=last;if(!L)return {err:"No GPS position yet."};if(!v)return {err:"No heading: tap Enable compass, or move so GPS track works."};
  const tg=(AR.tg||[]).slice();let best=[];
  for(const t of tg){const dA=w180b(t.b-v.az),dE=t.el-v.pitch,ang=Math.hypot(dA,dE*1.2),size=deg(Math.atan2((t.r||1000)*0.5,Math.max(1,t.d))),tol=Math.max(v.unc*1.5,2.5)+Math.min(4,size);
    if(ang<=tol)best.push({t,ang,s:ang/tol+(t.hid?0.4:0)+(t.kind==="town"?0.05:0)})}
  best.sort((a,b)=>a.s-b.s);
  /* where the line of sight meets the ground (below the horizon only) */
  let gnd=null;const h=Math.max(0,L.alt||0),dip=deg(Math.acos(R/(R+h*0.87)));
  if(v.pitch<-dip-0.2&&h>30){const a=rad(-v.pitch);let d=h/Math.tan(a);for(let i=0;i<4;i++){const dr=d*d/(2*R)*0.87;d=Math.max(50,(h-dr)/Math.tan(a))}d=Math.min(d,400000);const p=dPt(L,v.az,d);
    let near=null,nd=1e12;for(const l of lmAll().concat(AP.map(a=>({n:a.n+" airport",lat:a.lat,lon:a.lon,kind:"ap"})))){const dd=dist(p,l);if(dd<nd){nd=dd;near=l}}gnd={lat:p.lat,lon:p.lon,d,near:near&&nd<25000?{n:near.n,d:nd,kind:near.kind}:null}}
  const r=best[0]?best[0].t:null,rel=r&&L.trk!=null?side(r.b-L.trk):null;
  const out={at:Date.now(),az:v.az,pitch:v.pitch,unc:v.unc,hit:r?{n:r.n,kind:r.kind,kindN:kindName(r),d:Math.round(r.d),b:Math.round(r.b),el:+r.el.toFixed(1),note:r.note||"",hid:!!r.hid,side:rel?rel.s:null,clk:rel?rel.clk:null}:null,
    alts:best.slice(1,3).map(x=>({n:x.t.n,d:Math.round(x.t.d)})),gnd};
  if(r)AR.lock=r.n;ARI.last=out;return out}
function arIdShow(o){const el=$("arIdOut");if(!el)return;el.style.display="block";
  if(o.err){el.innerHTML=`<b>IDENTIFY</b><p>${esc(o.err)}</p>`;return}
  if(o.hit){const h=o.hit;el.innerHTML=`<b>${esc(h.n)}</b><span class="arIk">${esc(h.kindN)}${h.hid?" · beyond the horizon":""}</span><p>${Math.round(fDst(h.d)*10)/10} ${S.dst} · bearing ${String(h.b).padStart(3,"0")}°T${h.side==="left"||h.side==="right"?" · your "+h.side+" ("+h.clk+" o'clock)":""}</p>${h.note?`<p class="arIn">${esc(h.note)}</p>`:""}${o.alts.length?`<p class="arIa">Also near the crosshair: ${o.alts.map(a=>esc(a.n)).join(", ")}</p>`:""}<p class="arIa">Approximate: depends on compass accuracy (±${o.unc.toFixed(1)}°). Entertainment only.</p>`}
  else el.innerHTML=`<b>Nothing named under the crosshair</b><p>${o.gnd?`The ground there is about ${Math.round(fDst(o.gnd.d))} ${S.dst} away${o.gnd.near?", near "+esc(o.gnd.near.n)+" ("+Math.round(fDst(o.gnd.near.d))+" "+S.dst+")":""}.`:"Aim at the ground or a boxed target and tap Identify again."}</p>`;
  clearTimeout(ARI.hT);ARI.hT=setTimeout(()=>{el.style.display="none"},15000)}
if($("arIdBtn"))$("arIdBtn").onclick=e=>{e.stopPropagation();hap(15);arIdShow(arIdentify())};
if($("arIdOut"))$("arIdOut").onclick=()=>{$("arIdOut").style.display="none"};
/* test hook: force the AR heading/tilt (no compass in headless browsers) */
let ARF=0;window.cpARForce=o=>{AR.force=o?{az:o.az,unc:o.unc||1.5,src:"TEST",win:null,mov:false,dec:0}:null;clearInterval(ARF);if(o){const tick=()=>{AR.ps=o.pitch||0;AR.rs=0;AR.ot=Date.now()};tick();ARF=setInterval(tick,200)}return !!AR.force};
window.cpARId=()=>{const o=arIdentify();arIdShow(o);return o};

/* ================= 15) Spot the other plane ================= */
if(!["on","off"].includes(S.spot))S.spot="off";
const AIRN={};for(const [k,v] of Object.entries(AIRL))AIRN[v[0]]=v[1];Object.assign(AIRN,{RXA:"Rex",QLK:"QantasLink",NWK:"Network Aviation",FDA:"Flying Doctor",VOZ:"Virgin Australia",JST:"Jetstar",QFA:"Qantas",UTY:"Alliance",ANZ:"Air New Zealand",TFX:"Toll",SIA:"Singapore Airlines"});
let SPOT={ac:[],at:0,busy:false,day:store.get("spotq",{d:"",n:0}),alerted:{},hold:{},msg:""};
let SPC=Object.assign({pts:0,caught:[],types:{},airl:{}},store.get("spot",{}));
function spotQuota(add){const day=new Date().toISOString().slice(0,10);if(SPOT.day.d!==day)SPOT.day={d:day,n:0};if(add){SPOT.day.n+=add;store.set("spotq",SPOT.day)}return SPOT.day.n}
function spotOn(){return FEAT.spot&&S.spot==="on"&&cfOk()&&!demo&&!REPLAY}
async function spotPoll(force){const L=last;if(!force&&(!spotOn()||!L||SPOT.busy||Date.now()-SPOT.at<SVC.nearEveryMs-500||document.hidden))return;if(!L)return;
  if(spotQuota()>=SVC.nearPerDay){SPOT.msg="Daily lookup limit reached; back tomorrow.";spotRender();return}
  SPOT.busy=true;SPOT.at=Date.now();
  try{spotQuota(1);const r=await svcFetch(SVC.near+"/"+L.lat.toFixed(4)+"/"+L.lon.toFixed(4)+"/"+SVC.nearNm,{},12000);if(r.status===429){SPOT.msg="Busy; trying again shortly.";return}if(!r.ok)throw new Error("answered "+r.status);
    const j=await r.json(),now=Date.now();SPOT.ac=(Array.isArray(j.ac)?j.ac:[]).filter(a=>a&&typeof a.lat==="number"&&typeof a.lon==="number").map(a=>({hex:String(a.hex||"").slice(0,6),cs:String(a.flight||"").trim().slice(0,8),reg:String(a.r||"").slice(0,10),type:String(a.t||"").slice(0,5),
      lat:a.lat,lon:a.lon,alt:typeof a.alt_baro==="number"?a.alt_baro/FT:(typeof a.alt_geom==="number"?a.alt_geom/FT:null),gnd:a.alt_baro==="ground",gs:typeof a.gs==="number"?a.gs*NMm/3600:0,trk:typeof a.track==="number"?a.track:null,t:now-(typeof a.seen_pos==="number"?a.seen_pos*1000:0)}));
    SPOT.msg="";spotAlert()}
  catch(e){SPOT.msg="Couldn't look up nearby aircraft ("+(e&&e.name==="AbortError"?"timed out":(e&&e.message)||e)+")."}
  finally{SPOT.busy=false;spotRender()}}
/* dead-reckon each aircraft between lookups so AR boxes keep up */
function spotNow(){const L=last;if(!L)return [];const now=Date.now(),h=Math.max(0,L.alt||0);
  return SPOT.ac.map(a=>{const dt=Math.min(120,(now-a.t)/1000),p=a.trk!=null&&a.gs?dPt(a,a.trk,a.gs*dt):a,d=dist(L,p);return Object.assign({},a,{lat:p.lat,lon:p.lon,d})})
    .filter(a=>!a.gnd&&a.alt!=null&&a.d<40000&&!(a.d<1500&&Math.abs((a.alt||0)-h)<300))}  /* skip ground traffic and your own aircraft */
function spotAlert(){const now=Date.now();const vis=spotNow().filter(a=>a.d<30000).sort((a,b)=>a.d-b.d);const a=vis[0];if(!a||arOn)return;if(SPOT.alerted[a.hex]&&now-SPOT.alerted[a.hex]<15*60000)return;SPOT.alerted[a.hex]=now;
  const L=last,rel=L&&L.trk!=null?side(brg(L,a)-L.trk):null,b=$("spBan");if(!b)return;
  b.innerHTML=`<b>✈ ${esc(a.cs||a.reg||a.hex.toUpperCase())}${a.type?" · "+esc(a.type):""}</b> ${Math.round(fDst(a.d))} ${S.dst} ${rel?(rel.s==="left"||rel.s==="right"?"to your "+rel.s.toUpperCase():rel.s):""} · switch to AR to spot it <button id="spGo" class="pri">Open AR</button><button id="spX">✕</button>`;b.style.display="";
  $("spGo").onclick=()=>{b.style.display="none";arOpen()};$("spX").onclick=()=>{b.style.display="none"};hap([40,60,40]);setTimeout(()=>{b.style.display="none"},30000)}
function spotTargets(L,out){if(!S||S.spot!=="on")return;const h=Math.max(0,L.alt||0);for(const a of spotNow()){const drop=a.d*a.d/(2*R)*0.87,el=deg(Math.atan2((a.alt||0)-h-drop,Math.max(1,a.d)));
  out.push({n:"✈ "+(a.cs||a.reg||a.hex.toUpperCase()),kind:"ac",note:[a.type,AIRN[(a.cs||"").slice(0,3)]||"",a.alt!=null?Math.round(a.alt*FT/100)*100+" ft":""].filter(Boolean).join(" · "),d:a.d,b:brg(L,a),el,r:600,hid:false,ac:a})}}
function spotCatch(t){const a=t.ac,now=Date.now();const last1=SPC.caught.find(c=>c.hex===a.hex);if(last1&&now-last1.t<3*3600000)return false;
  const al=AIRN[(a.cs||"").slice(0,3)]||(a.cs?a.cs.slice(0,3):"Other"),ty=a.type||"Unknown",newT=!SPC.types[ty],newA=!SPC.airl[al];
  const pts=100+Math.round(Math.min(40,a.d/1000)*5)+(newT?150:0)+(newA?100:0);SPC.pts+=pts;SPC.types[ty]=(SPC.types[ty]||0)+1;SPC.airl[al]=(SPC.airl[al]||0)+1;
  SPC.caught.unshift({t:now,hex:a.hex,cs:a.cs,reg:a.reg,type:ty,airl:al,km:+(a.d/1000).toFixed(1),pts});SPC.caught=SPC.caught.slice(0,200);store.set("spot",SPC);
  say("Spotted "+(a.cs||a.reg||"aircraft")+". Plus "+pts+" points"+(newT?", new type":"")+".");try{beep()}catch(e){}hap([30,40,30,40,80]);spotRender();return pts}
/* crosshair inside the aircraft's box for about 1 s scores it */
setInterval(()=>{const hud=$("spHud");if(!arOn||!AR.view||S.spot!=="on"){if(hud)hud.style.display="none";return}
  const v=AR.view,acs=(AR.tg||[]).filter(t=>t.kind==="ac");let best=null,bd=1e9;
  for(const t of acs){const a=Math.hypot(w180b(t.b-v.az),t.el-v.pitch),tol=Math.max(2,v.unc*1.3);if(a<tol&&a<bd){bd=a;best=t}}
  const now=Date.now();if(!best){SPOT.hold={};if(hud){hud.style.display=acs.length?"":"none";setTx(hud,acs.length+" aircraft nearby · put the crosshair on one")}return}
  if(SPOT.hold.n!==best.n)SPOT.hold={n:best.n,t0:now};const p=Math.min(1,(now-SPOT.hold.t0)/1000);if(hud){hud.style.display="";setTx(hud,"LOCKING "+best.n+" "+Math.round(p*100)+"%")}
  if(p>=1&&!SPOT.hold.done){SPOT.hold.done=true;const pts=spotCatch(best);if(hud)setTx(hud,pts?"SPOTTED "+best.n+" +"+pts:"Already spotted "+best.n+" today")}},100);
function spotRender(){const el=$("spOut");if(!el)return;try{spRankRender()}catch(e){}const types=Object.entries(SPC.types).sort((a,b)=>b[1]-a[1]),airl=Object.entries(SPC.airl).sort((a,b)=>b[1]-a[1]);
  $("spPts").textContent=SPC.pts.toLocaleString()+" pts · "+SPC.caught.length+" spotted · "+types.length+" types · "+airl.length+" airlines";
  el.innerHTML=(SPOT.msg?`<li><span>${esc(SPOT.msg)}</span></li>`:"")+(S.spot==="on"?`<li><span>${spotNow().length} aircraft within ${Math.round(fDst(40000))} ${S.dst} at the last lookup${SPOT.at?" ("+hhmm(SPOT.at)+")":""}.</span></li>`:"")+
    (types.length?`<li><b>Types</b><span>${types.slice(0,12).map(x=>esc(x[0])+" ×"+x[1]).join(", ")}</span></li>`:"")+(airl.length?`<li><b>Airlines</b><span>${airl.slice(0,12).map(x=>esc(x[0])+" ×"+x[1]).join(", ")}</span></li>`:"")+
    SPC.caught.slice(0,6).map(c=>`<li><b>${esc(c.cs||c.reg||c.hex)}</b><span>${esc(c.type)} · ${esc(c.airl)} · ${c.km} km · +${c.pts} · ${new Date(c.t).toLocaleDateString("en-AU",{day:"numeric",month:"short"})}</span></li>`).join("")}
setInterval(()=>{spotPoll(false)},5000);
window.cpSpot={poll:()=>spotPoll(true),state:()=>({ac:SPOT.ac.length,vis:spotNow().length,msg:SPOT.msg,q:spotQuota(),pts:SPC.pts,caught:SPC.caught.length,types:Object.keys(SPC.types),hold:SPOT.hold}),reset:()=>{SPC={pts:0,caught:[],types:{},airl:{}};store.set("spot",SPC);SPOT.alerted={};spotRender()}};

/* ================= 5) Turbulence Master Warning (from the pre-flight pack) ================= */
if(!["off","5","10","15","20","30"].includes(String(S.tbLead)))S.tbLead="15";
let TB={key:null,ack:null,dis:null,said:null,lastBeep:0,cur:null,force:null};
function tbAhead(){const L=viewL()||last,pk=packGet(),fr=apBy(S.from),to=apBy(S.to);if(!L||!pk||!fr||!to||fr.c===to.c)return null;
  const air=TB.force||["climb","cruise","descent","approach"].includes(PH.p)||(demo&&demo.stg==="air")||(REPLAY&&L.spd>40);if(!air)return null;
  const tot=dist(fr,to),f0=clampN(1-dist(L,to)/tot,0,1),spd=Math.max(L.spd||0,100),lead=+S.tbLead||15,look=(lead+10)*60*spd,step=Math.max(1500,tot/600);
  for(let s=0;s<=look;s+=step){const f=f0+s/tot;if(f>1)break;const h=PH.p==="cruise"||(L.alt||0)>6000?(L.alt||planAlt(f,tot)):planAlt(f,tot),t=turbAt(pk,f,h);if(!t)continue;const c=tcat(t.v);
    if(c>=2)return {f,eta:s/spd/60,cat:c,why:t.why,key:Math.round(f*150)}}
  return {none:true}}
function tbCheck(){const b=$("tbBan");if(!b)return;if(!FEAT.turb||S.tbLead==="off"){b.style.display="none";return}
  const a=tbAhead();TB.cur=a;const lead=+S.tbLead||15;
  if(!a||a.none||a.eta>lead||TB.dis===a.key){b.style.display="none";b.classList.remove("ack");return}
  const now=Date.now(),m=Math.round(a.eta),acked=TB.ack===a.key;
  $("tbTxt").textContent=m<1?"TURBULENCE MASTER WARNING · NOW":"TURBULENCE MASTER WARNING · ETA "+m+" MIN";
  $("tbSub").textContent=TCAT[a.cat][0]+" turbulence possible ("+a.why+"). Estimate from the forecast pack, not a real-time warning. Good time for the loo, then seatbelt on.";
  b.style.display="";b.classList.toggle("ack",acked);
  if(TB.said!==a.key){TB.said=a.key;say("Turbulence master warning. Estimated "+(m<1?"now":"in "+m+" minutes")+".");hap([150,80,150,80,150])}
  if(!acked&&now-TB.lastBeep>5000){TB.lastBeep=now;try{beep()}catch(e){}}}
/* v24c: tap anywhere on a closable message closes it */
{const tc=(id,f)=>{const e=$(id);if(e)e.addEventListener("click",ev=>{if(ev.target.closest("button"))return;f(e)})};
 tc("toast",e=>{clearTimeout(toastT);e.style.display="none"});
 tc("fhToast",e=>{clearTimeout(window.__ftT);e.style.opacity="0";e.classList.add("gone")});
 tc("tbBan",()=>{if(TB.cur)TB.dis=TB.cur.key;tbCheck()});
 tc("spBan",e=>{e.style.display="none"});}
if($("tbAck"))$("tbAck").onclick=e=>{e.stopPropagation();if(TB.cur)TB.ack=TB.cur.key;tbCheck()};
if($("tbDis"))$("tbDis").onclick=e=>{e.stopPropagation();if(TB.cur)TB.dis=TB.cur.key;tbCheck()};
setInterval(()=>{try{tbCheck()}catch(e){}},3000);
window.cpTurb={check:()=>{tbCheck();return {cur:TB.cur,shown:$("tbBan").style.display!=="none",text:$("tbTxt").textContent,ack:TB.ack,dis:TB.dis}},force:v=>{TB.force=!!v},reset:()=>{TB.ack=TB.dis=TB.said=null}};

/* ---- bumps actually felt (phone motion sensor, only after you allow it) ---- */
let BMP=Object.assign({on:false,list:[]},{list:store.get("bumps",[])}),bmpS={base:null,peak:0,t0:0,last:0};
function bmpFeed(g,now){now=now||Date.now();bmpS.base=bmpS.base==null?g:bmpS.base*0.995+g*0.005;const dev=Math.abs(g-bmpS.base);
  if(dev>=0.2){if(!bmpS.t0)bmpS.t0=now;bmpS.peak=Math.max(bmpS.peak,dev)}
  if(bmpS.t0&&now-bmpS.t0>1200){const pk=bmpS.peak;bmpS.t0=0;bmpS.peak=0;if(now-bmpS.last<5000)return null;bmpS.last=now;const L=last;
    const e={t:now,lat:L?+L.lat.toFixed(4):null,lon:L?+L.lon.toFixed(4):null,alt:L&&L.alt!=null?Math.round(L.alt):null,g:+pk.toFixed(2),sev:pk>=0.5?"Severe":pk>=0.35?"Moderate":"Light"};
    BMP.list.unshift(e);BMP.list=BMP.list.slice(0,300);store.set("bumps",BMP.list);bmpRender();return e}return null}
function bmpMotion(e){const a=e.accelerationIncludingGravity;if(!a||a.x==null)return;bmpFeed(Math.hypot(a.x,a.y,a.z)/9.80665)}
function bmpRender(){const el=$("bmpOut");if(!el)return;const today=BMP.list.filter(b=>Date.now()-b.t<24*3600000);
  $("bmpBtn").textContent=BMP.on?"Stop logging":"Log bumps felt";$("bmpBtn").classList.toggle("on",BMP.on);
  el.innerHTML=(today.length?`<li><b>Last 24 h</b><span>${today.length} bumps · ${["Light","Moderate","Severe"].map(s=>today.filter(b=>b.sev===s).length+" "+s.toLowerCase()).join(", ")}</span></li>`:"")+
    BMP.list.slice(0,5).map(b=>{let nr="";try{if(b.lat!=null){const n=nearestAp({lat:b.lat,lon:b.lon});if(n)nr=" · "+Math.round(fDst(n.d))+" "+S.dst+" from "+n.a[0]}}catch(e){}return `<li><b>${esc(b.sev)} ${b.g.toFixed(2)} G</b><span>${hhmm(b.t)}${b.alt!=null?" · "+Math.round(fAlt(b.alt)/100)*100+" "+S.alt:""}${esc(nr)}</span></li>`}).join("")||'<li><span>No bumps logged yet.</span></li>'}
if($("bmpBtn"))$("bmpBtn").onclick=async()=>{if(BMP.on){window.removeEventListener("devicemotion",bmpMotion);BMP.on=false;bmpRender();return}
  try{if(typeof DeviceMotionEvent!=="undefined"&&typeof DeviceMotionEvent.requestPermission==="function"){const r=await DeviceMotionEvent.requestPermission();if(r!=="granted"){$("bmpTxt").textContent="Motion access denied, so bumps can't be logged.";return}}
    window.addEventListener("devicemotion",bmpMotion);BMP.on=true;$("bmpTxt").textContent="Logging bumps from the phone's motion sensor. Rest the phone on the tray table or hold it steady.";bmpRender()}catch(e){$("bmpTxt").textContent="Motion sensor unavailable."}};
window.cpBump=(g,t)=>bmpFeed(g,t);window.cpBumps=()=>BMP.list.slice(0,10);
/* ================= 6) Arrival helper extras (weather, likely runway, taxi time, gate side) ================= */
const TAXI={SYD:9,MEL:8,BNE:8,PER:7,ADL:5,CBR:4,OOL:4,CNS:5,DRW:5,HBA:4,TSV:4,NTL:4,MCY:4,LST:3,ASP:3,AKL:8,CHC:6,SIN:12,HKG:12,LAX:15,DPS:6,NAN:5};
let ARX={wx:null,at:0,c:"",busy:false};
async function arrWxLive(to){if(ARX.busy||!cfOk()||(ARX.c===to.c&&Date.now()-ARX.at<15*60000))return;ARX.busy=true;
  try{const r=await svcFetch(SVC.wx+"/"+to.lat.toFixed(3)+"/"+to.lon.toFixed(3),{},10000);if(r.ok){const j=await r.json(),c=j&&j.current;if(c)ARX.wx={T:c.temperature_2m,wc:c.weather_code,cc:c.cloud_cover,ws:c.wind_speed_10m,wd:c.wind_direction_10m,g:c.wind_gusts_10m,vis:c.visibility,at:Date.now(),src:"live"}}ARX.c=to.c;ARX.at=Date.now()}catch(e){}finally{ARX.busy=false}}
const WXN=c=>c==null?"":c>=95?"thunderstorms":c>=85?"snow showers":c>=80?"showers":c>=71?"snow":c>=61?"rain":c>=51?"drizzle":c>=45?"fog":c>=3?"overcast":c>=2?"partly cloudy":c>=1?"mostly clear":"clear";
function gateSide(c,r){const ap=TWY&&TWY.find(a=>a.c===c);if(!ap||!r)return null;let L=0,Rr=0;
  for(const w of ap.ws){if(w.t!==1||w.p.length<3)continue;let la=0,lo=0;for(const q of w.p){la+=q[0];lo+=q[1]}const cen={lat:la/w.p.length,lon:lo/w.p.length},rel=w180b(brg(r.thr,cen)-r.hdg),d=dist(r.thr,cen);if(d>5000)continue;(rel>0?(Rr+=w.p.length):(L+=w.p.length))}
  if(L+Rr<8)return null;if(Rr>=3*L)return "right";if(L>=3*Rr)return "left";return null}
function arrExtra(rows,L,to){if(!FEAT.arrival)return;arrWxLive(to);const pk=packGet();let wx=null,src="";
  if(ARX.wx&&ARX.c===to.c&&Date.now()-ARX.wx.at<60*60000){wx=ARX.wx;src="live"}else if(pk&&pk.to===to.c&&pk.smp&&pk.smp.length){const s=pk.smp[pk.smp.length-1];wx={T:s.T,wc:s.wc,cc:s.cc,ws:s.w10,wd:null,g:s.g10};src="forecast pack"}
  if(wx)rows.push(["Weather ("+src+")",[wx.T!=null?Math.round(wx.T)+"°":"",WXN(wx.wc),wx.ws!=null?"wind "+(wx.wd!=null?String(Math.round(wx.wd/10)*10%360||360).padStart(3,"0")+"/":"")+Math.round(wx.ws)+" kt":""].filter(Boolean).join(" · ")]);
  const wind=wx&&wx.wd!=null&&wx.ws!=null?{d:wx.wd,s:wx.ws}:packWind(pk&&pk.to===to.c?pk:null,true),rp=rwyPick(to.c,wind,brg(L,to));
  if(rp)rows.push(["Likely runway",rp.id+" ("+(wx&&wx.wd!=null?"from live wind":rp.how)+")"]);
  rows.push(["Taxi to the gate","about "+(TAXI[to.c]||5)+" min (estimate)"]);
  const gs=rp?gateSide(to.c,rp.r):null;if(gs)rows.push(["Terminal side",sideUp(gs)+" after landing (likely)"])}
window.cpArr=()=>{const L=last,to=apBy(S.to);if(!L||!to)return null;const rows=[];arrExtra(rows,L,to);return rows};

/* ================= 12) Landing score (for fun; not a report on the crew) ================= */
let LSB=[],LSD=store.get("ls",{});
setInterval(()=>{const L=last;if(!L||L.t==null)return;const p=LSB[LSB.length-1];if(p&&p.t===L.t)return;LSB.push({t:L.t,lat:L.lat,lon:L.lon,alt:L.alt,spd:L.spd,trk:L.trk});if(LSB.length>900)LSB.splice(0,300)},200);
function lsCompute(pts,td,tdG,elev){/* pts: [{t,lat,lon,alt,spd,trk}] in time order; td: touchdown time (fix time) */
  const pre=pts.filter(p=>p.t<=td&&p.alt!=null);if(pre.length<6)return null;const tp=pre[pre.length-1],e0=elev!=null?elev:tp.alt;const parts=[];let tot=0,max=0;
  const part=(k,lab,sc,mx,txt)=>{parts.push({k,lab,sc:Math.round(sc),max:mx,txt});tot+=sc;max+=mx};
  /* touchdown vertical speed: line fit of height over the last 8 s */
  const v8=pre.filter(p=>td-p.t<=8000);let vs=null;if(v8.length>=3){let n=v8.length,sx=0,sy=0,sxx=0,sxy=0;for(const p of v8){const x=(p.t-td)/1000;sx+=x;sy+=p.alt;sxx+=x*x;sxy+=x*p.alt}const den=n*sxx-sx*sx;if(den)vs=-(n*sxy-sx*sy)/den*FT*60}
  if(vs!=null)part("vs","Touchdown sink rate",30*clampN(1-(Math.max(0,vs)-120)/480,0,1),30,Math.round(Math.max(0,vs))+" fpm");
  if(tdG)part("g","Touchdown G",20*clampN(1-(tdG-1.15)/0.65,0,1),20,tdG.toFixed(2)+" G");
  /* approach stability: glide angle vs 3° over the last 2 nm; speed spread over the last 60 s */
  const g2=pre.filter(p=>{const d=dist(p,tp);return d>300&&d<=2*NMm});if(g2.length>=3){let s2=0;for(const p of g2){const a=deg(Math.atan2(Math.max(0,p.alt-e0),dist(p,tp)));s2+=(a-3)*(a-3)}const rms=Math.sqrt(s2/g2.length);part("gl","Glide path (3° target)",15*clampN(1-rms/1.5,0,1),15,"±"+rms.toFixed(1)+"° from 3°")}
  const s60=pre.filter(p=>td-p.t<=60000&&p.spd!=null).map(p=>p.spd);if(s60.length>=4){const m=s60.reduce((a,b)=>a+b,0)/s60.length,sd=Math.sqrt(s60.reduce((a,b)=>a+(b-m)*(b-m),0)/s60.length);part("spd","Speed steadiness (last 60 s)",10*clampN(1-(sd*1.944-4)/12,0,1),10,"±"+(sd*1.944).toFixed(0)+" kt")}
  /* bank at touchdown from how fast the track turns in the last 6 s (coordinated turn) */
  const b6=pre.filter(p=>td-p.t<=6000&&p.trk!=null);if(b6.length>=2){const a=b6[0],b=b6[b6.length-1],dt=(b.t-a.t)/1000;if(dt>0){const om=rad(Math.abs(w180b(b.trk-a.trk)))/dt,v=b.spd||70,bank=deg(Math.atan(v*om/9.81));part("bank","Wings level",10*clampN(1-(bank-2)/6,0,1),10,bank.toFixed(0)+"° bank")}}
  /* float: from 50 ft over the ground to touchdown */
  let fl=null;for(let i=pre.length-1;i>=0;i--){if(pre[i].alt-e0>=15){fl=dist(pre[i],tp);break}}if(fl!=null)part("float","Float distance",15*clampN(1-(fl-450)/550,0,1),15,Math.round(fl)+" m");
  if(max<40)return null;const score=Math.round(tot/max*100);
  return {score,parts,td,max,missing:!tdG?"No motion data (enable the G-meter for the touchdown G part).":"",note:"For fun only: GPS and phone sensors, not a report on the crew."}}
function lsFor(td){try{return td&&LSD[td]?LSD[td]:undefined}catch(e){return undefined}}
function lsClean(o){if(!o||typeof o!=="object"||typeof o.score!=="number")return undefined;return {score:Math.max(0,Math.min(100,Math.round(o.score))),parts:(Array.isArray(o.parts)?o.parts:[]).slice(0,8).map(p=>({k:String(p.k||"").slice(0,8),lab:String(p.lab||"").replace(/[<>&"]/g,"").slice(0,40),sc:+p.sc||0,max:+p.max||0,txt:String(p.txt||"").replace(/[<>&"]/g,"").slice(0,30)})),td:+o.td||0,note:"For fun only."}}
let lsDone=null;
function lsAuto(){const td=PH.ev&&PH.ev.td;if(!td||lsDone===td||LSD[td])return;const lastT=LSB.length?LSB[LSB.length-1].t:0;if(lastT-td<8000)return;lsDone=td;
  const to=apBy(S.to),el=to&&apInfo(to.c)?apInfo(to.c)[4]/FT:null;const r=lsCompute(LSB,td,PH.ev.tdG,el);if(!r)return;LSD[td]=r;const ks=Object.keys(LSD).sort();while(ks.length>60)delete LSD[ks.shift()];store.set("ls",LSD);
  if(PH.bookId){const i=BOOK.findIndex(b=>b&&b.id===PH.bookId);if(i>=0){BOOK[i].ls=r;store.set("book",BOOK)}}
  say("Landing score "+r.score+" out of 100. Just for fun.");lsRender()}
setInterval(()=>{try{lsAuto()}catch(e){}},2000);
function lsRender(){const el=$("lsOut");if(!el)return;const ks=Object.keys(LSD).sort(),r=ks.length?LSD[ks[ks.length-1]]:null;
  if(!r){$("lsBig").textContent="—";el.innerHTML='<li><span>Scores itself a few seconds after touchdown.</span></li>';return}
  $("lsBig").textContent=r.score+"/100";el.innerHTML=r.parts.map(p=>`<li><b>${esc(p.lab)}</b><span>${esc(p.txt)} · ${p.sc}/${p.max}</span></li>`).join("")+`<li><span>${esc(new Date(r.td).toLocaleString("en-AU",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",hour12:false}))}. ${esc(r.note)} ${esc(r.missing||"")}</span></li>`}
window.cpLand={compute:(pts,td,g,e)=>lsCompute(pts,td,g,e),auto:()=>{lsAuto();return lsFor(PH.ev&&PH.ev.td)},all:()=>LSD};

/* ================= 10) Flight diary (offline notes, time and position stamped, attached to the logbook flight) ================= */
let DY=store.get("diary",{});
function dyKey(){return LOG.pts.length?String(LOG.pts[0][3]):PH.ev&&PH.ev.off?String(PH.ev.off):"gen"}
function dyFor(k){try{return (DY[String(k)]||[]).slice()}catch(e){return []}}
function dyClean(a){return (Array.isArray(a)?a:[]).slice(0,200).map(e=>e&&typeof e==="object"?{t:+e.t||0,lat:typeof e.lat==="number"?e.lat:null,lon:typeof e.lon==="number"?e.lon:null,alt:typeof e.alt==="number"?e.alt:null,ph:String(e.ph||"").slice(0,12),at:String(e.at||"").replace(/[<>&"]/g,"").slice(0,60),txt:String(e.txt||"").slice(0,1000)}:null).filter(e=>e&&e.txt)}
function dyStamp(txt){const L=last,n=L?nearestAp(L):null;let at="";if(L){const lm=lmAll().map(l=>({l,d:dist(L,l)})).sort((a,b)=>a.d-b.d)[0];at=lm&&lm.d<60000?Math.round(fDst(lm.d))+" "+S.dst+" from "+lm.l.n:n?Math.round(fDst(n.d))+" "+S.dst+" from "+n.a[0]:""}
  return {t:Date.now(),lat:L?+L.lat.toFixed(4):null,lon:L?+L.lon.toFixed(4):null,alt:L&&L.alt!=null?Math.round(L.alt):null,ph:PH.p,at:at.slice(0,60),txt:String(txt).slice(0,1000)}}
function dyAdd(txt,bookIdx){txt=String(txt||"").trim();if(!txt)return null;const e=dyStamp(txt);
  if(bookIdx!=null&&BOOK[bookIdx]){const b=BOOK[bookIdx];b.dy=(b.dy||[]).concat([e]);store.set("book",BOOK);return e}
  const k=dyKey();(DY[k]=DY[k]||[]).push(e);const ks=Object.keys(DY);if(ks.length>60)delete DY[ks.sort()[0]];store.set("diary",DY);
  if(PH.bookId){const i=BOOK.findIndex(b=>b&&b.id===PH.bookId);if(i>=0){BOOK[i].dy=dyFor(k);store.set("book",BOOK)}}return e}
const dyLi=(e,i,del)=>`<li><div><b>${esc(new Date(e.t).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",hour12:false}))} · ${esc(PHN[e.ph]||e.ph||"")}</b><span class="sub blk">${e.alt!=null?esc(Math.round(fAlt(e.alt)/100)*100+" "+S.alt+" · "):""}${esc(e.at||(e.lat!=null?e.lat+", "+e.lon:"no position"))}</span><p class="dyT">${esc(e.txt)}</p></div>${del?`<button data-dy="${i}" aria-label="Delete note">✕</button>`:""}</li>`;
function dyRender(){const el=$("dyList");if(!el)return;const a=dyFor(dyKey());$("dyHead").textContent=dyKey()==="gen"?"Notes (no flight recording yet)":"Notes for this flight";el.innerHTML=a.length?a.map((e,i)=>dyLi(e,i,true)).join(""):'<li><span>No notes yet. Notes are stamped with time, position, height and phase, and saved with this flight in the logbook.</span></li>'}
if($("dyAdd"))$("dyAdd").onclick=()=>{const t=$("dyIn").value;if(dyAdd(t)){$("dyIn").value="";hap(15);dyRender()}};
if($("dyList"))$("dyList").onclick=e=>{const b=e.target.closest("button[data-dy]");if(!b)return;const k=dyKey(),a=DY[k]||[];a.splice(+b.dataset.dy,1);DY[k]=a;store.set("diary",DY);dyRender()};
let DYO=null;
function dyOpen(i){const b=BOOK[i];if(!b)return;DYO=i;$("dyOv").style.display="flex";$("dyOvT").textContent="Diary · "+b.from+" → "+b.to+" · "+new Date(b.date).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});dyOvRender()}
function dyOvRender(){const b=BOOK[DYO];if(!b)return;const a=(b.dy||[]).concat(dyFor(b.date).filter(x=>!(b.dy||[]).some(y=>y.t===x.t)));a.sort((x,y)=>x.t-y.t);$("dyOvList").innerHTML=a.length?a.map((e,i)=>dyLi(e,i,false)).join(""):'<li><span>No notes for this flight yet.</span></li>'}
if($("dyOvAdd"))$("dyOvAdd").onclick=()=>{if(DYO==null)return;if(dyAdd($("dyOvIn").value,DYO)){$("dyOvIn").value="";dyOvRender()}};
if($("dyOvX"))$("dyOvX").onclick=()=>{$("dyOv").style.display="none";DYO=null};
if($("dyOvExp"))$("dyOvExp").onclick=()=>{const b=BOOK[DYO];if(!b)return;const a=(b.dy||[]).slice().sort((x,y)=>x.t-y.t);const txt="Cabin Panel flight diary\n"+b.from+" → "+b.to+" · "+new Date(b.date).toDateString()+"\n\n"+a.map(e=>new Date(e.t).toLocaleString("en-AU")+" · "+(PHN[e.ph]||e.ph||"")+(e.alt!=null?" · "+Math.round(e.alt*FT)+" ft":"")+(e.at?" · "+e.at:"")+"\n"+e.txt+"\n").join("\n");shareOrDownload("diary-"+b.from+"-"+b.to+".txt","text/plain",txt,$("dyOvTxt"))};
window.cpDiary={add:t=>dyAdd(t),list:()=>dyFor(dyKey()),key:()=>dyKey()};
/* ================= 4) Trip stats and badges (from the logbook; demo flights don't count) ================= */
const CAPS=["SYD","MEL","BNE","PER","ADL","CBR","HBA","DRW"],INTL=["AKL","CHC","WLG","ZQN","SIN","HKG","DPS","NAN","LAX","NRT","HND","POM"],EASTC=["SYD","MEL","BNE","CBR","OOL","NTL","MCY","HBA"];
const near=(b,lat,lon,km)=>(b.pts||[]).some(p=>dist({lat:p[0],lon:p[1]},{lat,lon})<km*1000);
function sunElAt(t,lat,lon){try{return sunPos(t,lat,lon).el}catch(e){return 0}}
function tdNight(b){const to=apBy(b.to);return !!(b.ev&&b.ev.td&&to&&sunElAt(b.ev.td,to.lat,to.lon)<-6)}
function sunXing(b){const p=(b.pts||[]).filter(q=>q[2]!=null&&q[2]>1500);if(p.length<2)return false;const a=sunElAt(p[0][3],p[0][0],p[0][1])-sunThr(p[0][2]),z=sunElAt(p[p.length-1][3],p[p.length-1][0],p[p.length-1][1])-sunThr(p[p.length-1][2]);return (a>0)!==(z>0)}
const PT={bdg:null};
const BADGES=[
 ["first","First flight","Log your first flight",r=>[r.n,1]],["f5","Frequent flyer","5 flights",r=>[r.n,5]],["f10","Ten up","10 flights",r=>[r.n,10]],["f25","Road warrior","25 flights",r=>[r.n,25]],["f50","Half century","50 flights",r=>[r.n,50]],
 ["night","Night landing","Land after dark",r=>[r.B.some(tdNight)?1:0,1]],["sun","Sun chaser","See a sunrise or sunset in flight",r=>[r.B.some(sunXing)?1:0,1]],
 ["uluru","The Rock","Fly within 25 km of Uluru",r=>[r.B.some(b=>near(b,-25.344,131.037,25))?1:0,1]],["bm","Blue Mountains","Fly over the Blue Mountains",r=>[r.B.some(b=>near(b,-33.7,150.3,20))?1:0,1]],
 ["bass","Bass Strait","Cross Bass Strait",r=>[r.B.some(b=>{const la=(b.pts||[]).map(p=>p[0]);return la.some(x=>x<-40.2)&&la.some(x=>x>-38.8)})?1:0,1]],
 ["c2c","Coast to coast","Perth to the east coast (or back)",r=>[r.B.some(b=>(b.from==="PER"&&EASTC.includes(b.to))||(b.to==="PER"&&EASTC.includes(b.from)))?1:0,1]],
 ["caps","All the capitals","Visit all 8 capital cities",r=>[CAPS.filter(c=>r.aps.has(c)).length,8]],["k10","10,000 km club","10,000 km flown",r=>[Math.round(r.km/1000),10000]],
 ["long","Long haul","One flight over 3,000 km",r=>[r.B.some(b=>b.d>=3e6)?1:0,1]],["fl400","FL400 club","Fly at 40,000 ft or higher",r=>[r.B.some(b=>b.ma*FT>=39500)?1:0,1]],
 ["redeye","Red-eye","Take off between 22:00 and 05:00",r=>[r.B.some(b=>{const t=(b.ev&&(b.ev.up||b.ev.off))||b.date,h=new Date(t).getHours();return h>=22||h<5})?1:0,1]],
 ["states","State hopper","Cross 4 states in one flight",r=>[Math.max(0,...r.B.map(b=>(b.st||[]).length)),4]],["intl","Going overseas","Fly to or from an overseas airport",r=>[r.B.some(b=>INTL.includes(b.from)||INTL.includes(b.to))?1:0,1]],
 ["butter","Butter landing","Landing score of 90 or more",r=>[r.B.some(b=>b.ls&&b.ls.score>=90)?1:0,1]],["types","Type collector","Fly 3 aircraft types",r=>[r.types.size,3]],
 ["spot","Spotter","Spot another aircraft in AR",r=>[Math.min(1,SPC.caught.length),1]],["diary","Diarist","Write 5 diary notes",r=>[r.B.reduce((s,b)=>s+(b.dy||[]).length,0),5]]];
function statsCalc(){const B=BOOK.filter(b=>b&&!b.demo&&!b.drv);const aps=new Set(),types=new Set();let km=0,secs=0,lg=null,ld=null,hi=null,fa=null;
  for(const b of B){aps.add(b.from);aps.add(b.to);if(b.ac)types.add(String(b.ac).toUpperCase());km+=b.d||0;if(b.ev&&b.ev.up&&b.ev.td){const s=(b.ev.td-b.ev.up)/1000;secs+=s;if(!lg||s>lg.v)lg={v:s,b}}if(!ld||b.d>ld.v)ld={v:b.d,b};if(!hi||b.ma>hi.v)hi={v:b.ma,b};if(!fa||b.ms>fa.v)fa={v:b.ms,b}}
  const r={B,n:B.length,aps,types,km,secs,lg,ld,hi,fa};r.badges=BADGES.map(([k,n,d,f])=>{let [v,g]=[0,1];try{[v,g]=f(r)}catch(e){}return {k,n,d,v:Math.min(v,g),g,got:v>=g}});return r}
function statsRender(){const el=$("bdgOut"),kv=$("totKv");if(!el||!FEAT.stats)return;const r=statsCalc(),rt=x=>x?" "+x.b.from+"–"+x.b.to:"";
  kv.innerHTML=[["Flights",r.n],["Distance",Math.round(fDst(r.km)).toLocaleString()+" "+S.dst],["Hours",hm(r.secs)],["Airports",r.aps.size],["Aircraft types",r.types.size||"—"],
    ["Longest (time)",r.lg?hm(r.lg.v)+rt(r.lg):"—"],["Longest (distance)",r.ld?Math.round(fDst(r.ld.v)).toLocaleString()+" "+S.dst+rt(r.ld):"—"],["Highest",r.hi?Math.round(fAlt(r.hi.v)).toLocaleString()+" "+S.alt+rt(r.hi):"—"],["Fastest",r.fa?Math.round(fSpd(r.fa.v))+" "+S.spd+rt(r.fa):"—"]].map(x=>`<div>${esc(x[0])}<b>${esc(x[1])}</b></div>`).join("");
  const got=r.badges.filter(b=>b.got).length;$("bdgHead").textContent="Badges "+got+" of "+r.badges.length;
  el.innerHTML=r.badges.map((b,i)=>`<button type="button" class="bdg ptc${b.got?" got":""}" data-b="${i}" aria-label="${esc(b.n)}: ${esc(b.d)}${b.got?" (earned)":" (locked)"}"><img src="patches/${esc(b.k)}.svg" alt="" width="60" height="70" draggable="false"><b>${esc(b.n)}</b><small>${b.got?"EARNED":bdgProg(b)}</small><i class="pbar"><i data-w="${Math.round(100*Math.min(1,b.v/b.g))}"></i></i></button>`).join("");PT.bdg=r.badges}
/* v24c: unit-patch style badges (original designs, patches/*.svg). Tap to enlarge with description. */
function bdgProg(b){return b.g>1?b.v.toLocaleString()+" / "+b.g.toLocaleString():"LOCKED"}
function ptOpen(o){$("ptImg").src=o.img;$("ptImg").className=o.got?"":"lock";$("ptN").textContent=o.n;$("ptK").textContent=o.k;$("ptD").textContent=o.d;$("ptS").textContent=o.s;$("ptS").className=o.got?"ok":"";
  $("ptOv").style.display="";$("ptOv").dataset.k=o.key}
function ptClose(){$("ptOv").style.display="none";$("ptOv").dataset.k=""}
$("ptOv").addEventListener("click",ptClose);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("ptOv").style.display!=="none")ptClose()});
$("bdgOut").addEventListener("click",e=>{const t=e.target.closest(".bdg");if(!t||!PT.bdg)return;const b=PT.bdg[+t.dataset.b];if(!b)return;
  ptOpen({key:b.k,img:"patches/"+b.k+".svg",got:b.got,n:b.n,k:(DRV.on?"DRIVE BADGE · ":"BADGE · ")+((PT.list||BADGES).findIndex(x=>x[0]===b.k)+1)+" / "+(PT.list||BADGES).length,d:b.d,s:b.got?"EARNED":(b.g>1?"PROGRESS "+bdgProg(b):"LOCKED · NOT YET EARNED")})});
/* spotter ranks: made-up titles, not real ranks */
const SPR=[[0,"Cadet spotter"],[100,"Apron watcher"],[300,"Line spotter"],[750,"Flight spotter"],[1500,"Senior spotter"],[3000,"Chief spotter"],[6000,"Spotter ace"]];
function spRank(pts){pts=+pts||0;let i=0;for(let j=0;j<SPR.length;j++)if(pts>=SPR[j][0])i=j;const nx=SPR[i+1];return {i,n:SPR[i][1],pts,next:nx?nx[0]:null,nextN:nx?nx[1]:null,f:nx?(pts-SPR[i][0])/(nx[0]-SPR[i][0]):1}}
function spRankRender(){const el=$("spRank");if(!el)return;const r=spRank(SPC.pts);
  el.innerHTML=`<img src="patches/r${r.i}.svg" alt="" width="120" height="60"><span><b>${esc(r.n.toUpperCase())}</b><small>${r.next!=null?(r.next-r.pts).toLocaleString()+" pts to "+esc(r.nextN.toUpperCase()):"TOP RANK"}</small><i class="pbar"><i data-w="${Math.round(100*r.f)}"></i></i></span>`;
  el.setAttribute("aria-label","Spotter rank "+r.n+", "+r.pts+" points")}
$("spRank").addEventListener("click",()=>{const r=spRank(SPC.pts);ptOpen({key:"r"+r.i,img:"patches/r"+r.i+".svg",got:true,n:r.n,k:"SPOTTER RANK · "+(r.i+1)+" / "+SPR.length,d:"Spot-the-plane points: "+r.pts.toLocaleString()+". Ranks are made-up titles for fun, not real ranks.",s:r.next!=null?(r.next-r.pts).toLocaleString()+" PTS TO "+r.nextN.toUpperCase():"TOP RANK"})});
window.cpPatch={rank:spRank,open:i=>{const b=$("bdgOut").querySelectorAll(".bdg")[i];if(b)b.click()},close:ptClose,state:()=>({open:$("ptOv").style.display!=="none",k:$("ptOv").dataset.k||""})};
window.cpStats=()=>{const r=statsCalc();return {n:r.n,km:Math.round(r.km/1000),aps:[...r.aps],types:[...r.types],got:r.badges.filter(b=>b.got).map(b=>b.k),badges:r.badges.length}};
$("bookList").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const i=+b.dataset.i,en=BOOK[i];if(!en)return;
  if(b.dataset.a==="dy")dyOpen(i);
  else if(b.dataset.a==="ty"){const v=prompt("Aircraft type for "+en.from+" → "+en.to+" (e.g. B738, A320):",en.ac||"");if(v!=null){en.ac=v.replace(/[^A-Za-z0-9 -]/g,"").toUpperCase().slice(0,12);store.set("book",BOOK);bookRender()}}
  else if(b.dataset.a==="rp3"){replayStart(en.pts,en);setTimeout(()=>{try{svOpen()}catch(_){}},100)}});
{const _br=bookRender;bookRender=function(){_br();try{statsRender()}catch(e){console.warn(e)}}}
if($("acType")){$("acType").value=S.acType||"";$("acType").addEventListener("change",e=>{S.acType=e.target.value.replace(/[^A-Za-z0-9 -]/g,"").toUpperCase().slice(0,12);e.target.value=S.acType;saveS()})}

/* ================= 7) Shareable flight card extras: 3D snapshot inset, landing score, share sheet or download ================= */
const CARD={en:null,snap:store.get("snap",null)};
function snapTake(){const c=$("svCv");if(!c||!c.width)return;const W=640,H=Math.round(640*c.height/c.width),o=document.createElement("canvas");o.width=W;o.height=Math.min(H,480);o.getContext("2d").drawImage(c,0,(c.height-o.height*c.width/W)/2,c.width,o.height*c.width/W,0,0,W,o.height);
  const url=o.toDataURL("image/jpeg",0.82);CARD.snap={t:Date.now(),from:S.from,to:S.to,url};if(!store.set("snap",CARD.snap))CARD.snap.mem=true;say("3D snapshot saved for your flight card.")}
if($("svSnap"))$("svSnap").onclick=()=>{SV.snapReq=true;hap(15)};
function snapFor(en){const s=CARD.snap;if(!s||!s.url)return null;if(en&&en.pts&&en.pts.length){const t0=en.pts[0][3]-3600000,t1=en.pts[en.pts.length-1][3]+3*3600000;if(s.t>=t0&&s.t<=t1)return s}return (s.from===en.from&&s.to===en.to)?s:null}
async function cardExtra(x,en,W,H){const F=(w,s)=>`${w} ${s}px "B612 Mono",monospace`;const sn=$("cardSnap")&&$("cardSnap").checked?snapFor(en):null;
  if(sn){const im=new Image();await new Promise(r=>{im.onload=r;im.onerror=r;im.src=sn.url});if(im.width){const iw=380,ih=Math.round(iw*im.height/im.width),X=W-72-iw-14,Y=320+14;x.fillStyle="#000";x.fillRect(X-4,Y-4,iw+8,ih+8);x.drawImage(im,X,Y,iw,ih);x.strokeStyle="#3dff6e";x.lineWidth=2;x.strokeRect(X-4,Y-4,iw+8,ih+8);x.fillStyle="#3dff6e";x.font=F(700,18);x.fillText("3D VIEW",X+8,Y+ih-10)}}
  const ls=en.ls||lsFor(en.ev&&en.ev.td);x.fillStyle="#22a64a";x.font=F(400,20);x.fillText("ENTERTAINMENT ONLY · NOT FOR NAVIGATION"+(ls?"   ·   LANDING SCORE "+ls.score+"/100 (FOR FUN)":""),72,H-58);
  if($("cardSnap"))$("cardSnapL").style.display=CARD.snap?"":"none"}
if($("cardSnap"))$("cardSnap").addEventListener("change",()=>{if(CARD.en)showCard(CARD.en)});
window.cpCard={snap:()=>CARD.snap?{t:CARD.snap.t,len:CARD.snap.url.length}:null,img:()=>$("cardImg").src.length,setSnap:u=>{CARD.snap={t:Date.now(),from:S.from,to:S.to,url:u};store.set("snap",CARD.snap)}};

/* ================= 3) Replay: floating bar (works over the map and the 3D view), 1x–120x, scrub slider ================= */
function rpBarSync(){const b=$("rpBar");if(!b)return;b.style.display=REPLAY&&RP?"":"none";if(!RP)return;$("rpbPlay").textContent=RP.playing?"❚❚":"▶";$("rpbSlider").value=$("rpSlider").value;$("rpbTime").textContent=$("rpTime").textContent;$("rpbTitle").textContent=$("rpTitle").textContent;
  document.querySelectorAll("#rpbSpeed button").forEach(x=>x.classList.toggle("sel",+x.dataset.v===RP.speed))}
{const _u=rpUI;rpUI=function(){_u();try{rpBarSync()}catch(e){}}}
{const _s=replayStop;replayStop=function(){_s();try{rpBarSync()}catch(e){}}}
if($("rpbPlay")){$("rpbPlay").onclick=()=>$("rpPlay").click();$("rpbExit").onclick=()=>{try{if(SV.on)svClose()}catch(e){}replayStop()};$("rpb3d").onclick=()=>{SV.on?svClose():svOpen()};$("rpbMap").onclick=()=>{try{if(SV.on)svClose()}catch(e){}pgGo(PG.els.findIndex(p=>p.id==="pg-map"))};
  $("rpbSpeed").addEventListener("click",e=>{const b=e.target.closest("button");if(b&&RP){RP.speed=+b.dataset.v;rpUI()}});
  $("rpbSlider").addEventListener("input",e=>{$("rpSlider").value=e.target.value;$("rpSlider").dispatchEvent(new Event("input"))})}
window.cpReplay={start:i=>{const en=BOOK[i];if(en)replayStart(en.pts,en);return !!RP},state:()=>RP?{t:RP.t-RP.t0,dur:RP.t1-RP.t0,speed:RP.speed,playing:RP.playing,i:RP.i,n:RP.pts.length,last:last?{lat:last.lat,lon:last.lon,alt:last.alt}:null}:null,
  speed:v=>{if(RP){RP.speed=v;rpUI()}},seek:f=>{const s=$("rpSlider");s.value=Math.round(f*1000);s.dispatchEvent(new Event("input"))},stop:()=>replayStop()};
/* ================= 8) Share live flight / follow along (opt-in; only while connected) =================
   The Worker keeps one record per share: an unguessable 22-character id for followers and a separate 43-character
   write token that stays on this phone. Expires after 24 h; Stop sharing ends it at once. Stored: position, height,
   speed, track, route codes and ETA. v24: no name (the old optional first name is never sent and is cleared on the
   server with every update; follower pages ignore it). */
let SH=Object.assign({on:false,id:"",token:"",exp:0,buf:[],lastS:0,lastT:0,sent:0,err:"",held:0},store.get("share",{}),{buf:[],n:""});
if(S.shName!=null){delete S.shName;saveS()}
const shSave=()=>store.set("share",{on:SH.on,id:SH.id,token:SH.token,exp:SH.exp,sent:SH.sent});
shSave();
const shLink=id=>shLink2(id);
function shUI(){const on=SH.on&&SH.exp>Date.now();const t=$("shTag");if(t)t.style.display=on?"":"none";if(!$("shTile"))return;
  $("shStart").style.display=on?"none":"";$("shStop").style.display=on?"":"none";$("shLinkRow").style.display=on?"":"none";
  if(on){$("shLink").value=shLink(SH.id);setTx($("shSt"),"Sharing on · "+(SH.sent?"last update sent "+hhmm(SH.sent):"waiting for the first update")+" · stops by itself at "+hhmm(SH.exp)+(SH.held&&Date.now()-SH.held<60000?" · "+shHeldWhy():"")+(cfOk()?"":" · offline: updates resume when you're connected")+(SH.err?" · "+SH.err:""))}
  else setTx($("shSt"),"Off. Nothing is shared until you tap Start sharing.")}
async function shStart(){if(!cfOk()){say(cfWhy()+".");return false}const n="";
  $("shStart").disabled=true;$("shStart").dataset.busy="1";
  try{const r=await svcFetch(SVC.share,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({n:"",fr:shFr(),to:shTo()})},12000);if(!r.ok)throw new Error(r.status===429?"too many shares just now, try again later":"answered "+r.status);
    const j=await r.json();Object.assign(SH,{on:true,id:j.id,token:j.token,exp:j.exp,sent:0,err:"",buf:[]});shSave();shUI();shSample(true);shSend(true);hap(20);return true}
  catch(e){setTx($("shSt"),"Couldn't start sharing: "+((e&&e.message)||e)+".");return false}finally{delete $("shStart").dataset.busy;$("shStart").disabled=false;cfApply()}}
async function shStop(){const id=SH.id,tok=SH.token;
  if(id&&tok){try{if(!cfOk())throw new Error("offline");const r=await svcFetch(SVC.share+"/"+id,{method:"DELETE",headers:{Authorization:"Bearer "+tok}},10000);if(!r.ok&&r.status!==404&&r.status!==410)throw new Error("answered "+r.status)}
    catch(e){SH.err="Could not end the old link ("+e.message+"). Try Stop sharing again while connected; until then the old link still works (it ends by itself after 24 h).";shSave();shUI();return false}}
  Object.assign(SH,{on:false,id:"",token:"",exp:0,buf:[],err:""});shSave();shUI();return true}

/* v24 privacy: your own phone's position is only shared at an airport (within 4 km) or once moving faster than 50 kt,
   so a share started at home or the office never shows where you are. While tracking an aircraft from the ground,
   sharing follows that aircraft (what your gauges show), never a stale phone position. */
function shPrivOk(L){if(!L)return false;if(DRV.on)return drvPrivOk(L);if(L.tk)return !tkStale();if(L.spd!=null&&L.spd>25.7)return true;const n=nearestAp(L);return !!(n&&n.d<4000)}
function shSample(force){if(!SH.on)return;const L=tkOn()&&!DRV.on?TKS.L:last;if(!L||L.lat==null)return;if(!shPrivOk(L)){SH.held=Date.now();return}SH.held=0;const p=SH.buf[SH.buf.length-1];if(!force&&p&&p[0]===L.t)return;
  SH.buf.push([L.t||Date.now(),+L.lat.toFixed(5),+L.lon.toFixed(5),L.alt!=null?Math.round(L.alt):null,L.spd!=null?+L.spd.toFixed(1):null,L.trk!=null?Math.round(L.trk):null]);if(SH.buf.length>40)SH.buf=thin(SH.buf,20)}
async function shSend(force){if(!SH.on||SH.busy)return;if(SH.exp<=Date.now()){Object.assign(SH,{on:false});shSave();shUI();return}
  if(!cfOk()||!SH.buf.length||(!force&&Date.now()-SH.lastT<SVC.shareSendMs))return;SH.busy=true;SH.lastT=Date.now();
  const pts=SH.buf.length>12?thin(SH.buf,12):SH.buf.slice(),to=apBy(S.to),n=tkOn()?null:navT(viewL()||last,to);
  try{const r=await svcFetch(SVC.share+"/"+SH.id,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+SH.token},body:JSON.stringify({p:pts,n:"",fr:shFr(),to:shTo(),eta:DRV.on?drvEtaMs():n&&n.sec!=null?Math.round(Date.now()+n.sec*1000):null})},12000);
    if(r.status===404||r.status===410||r.status===403){Object.assign(SH,{on:false,err:"share ended"});shSave()}
    else if(r.ok){SH.buf=SH.buf.filter(q=>q[0]>pts[pts.length-1][0]);SH.sent=Date.now();SH.err="";shSave()}else SH.err="update failed ("+r.status+")"}
  catch(e){SH.err="no connection"}finally{SH.busy=false;shUI()}}
setInterval(()=>{shSample(false)},SVC.shareSampleMs);setInterval(()=>{shSend(false)},5000);window.addEventListener("cp-online",()=>shSend(true));
if($("shStart")){$("shStart").onclick=shStart;$("shStop").onclick=()=>{if(confirm("Stop sharing your flight? Followers will see that sharing has ended."))shStop()};
  /* v24: New link: end the old share (its link stops showing your flight) and start a fresh one with a new random id */
  $("shNew").onclick=async()=>{if(!cfOk()){say(cfWhy()+".");return}if(!confirm("Make a new follow link? The old link stops working straight away; send the new one to your family."))return;
    $("shNew").disabled=true;try{if(await shStop())await shStart()}finally{$("shNew").disabled=false;shUI()}};
  $("shShare").onclick=async()=>{const u=shLink(SH.id);try{if(navigator.share){await navigator.share({title:DRV.on?"Follow my drive":"Follow my flight",text:(DRV.on?"Follow my drive":"Follow my flight"+(S.from&&S.to?" "+S.from+" → "+S.to:""))+" on Cabin Panel",url:u});return}}catch(e){if(e&&e.name==="AbortError")return}
    try{await navigator.clipboard.writeText(u);setTx($("shSt"),"Link copied.")}catch(e){$("shLink").select()}};}
window.cpShare={state:()=>({on:SH.on,id:SH.id?SH.id.slice(0,4)+"…":"",hasToken:!!SH.token,exp:SH.exp,sent:SH.sent,buf:SH.buf.length,err:SH.err,link:SH.id?shLink(SH.id):""}),send:()=>shSend(true),sample:()=>shSample(true),stop:()=>shStop(),start:()=>shStart(),rawId:()=>SH.id};

/* ---- follower view ---- */
let FW={id:"",d:null,at:0,err:"",iv:0,busy:false};
function fwParse(s){s=String(s||"").trim();const m=s.match(/[#?&](?:follow|id)=([A-Za-z0-9_-]{22})/)||s.match(/follow=([A-Za-z0-9_-]{22})/)||s.match(/^([A-Za-z0-9_-]{22})$/);return m?m[1]:null}
async function fwPoll(){if(!FW.id||FW.busy)return;if(!cfOk()){FW.err="offline";fwDraw();return}const f=FW;f.busy=true;
  /* v24c: a poll that finishes after the follow view was closed or switched to another link must not write into the new view */
  try{const r=await svcFetch(SVC.share+"/"+f.id,{},12000);if(f!==FW||!f.id)return;if(r.status===404){f.err="This shared flight has ended or the link is wrong.";f.d=null}else if(!r.ok)throw new Error("answered "+r.status);else{const d=await r.json();if(f!==FW||!f.id)return;f.d=d;f.at=Date.now();f.err="";if(d&&d.st)clearInterval(f.iv)}}
  catch(e){if(f===FW&&f.id)f.err="Couldn't reach the share service ("+((e&&e.message)||e)+")."}finally{f.busy=false;if(f===FW)fwDraw()}}
function fwOpen(id){if(!FEAT.follow)return;clearInterval(FW.iv);FW={id,d:null,at:0,err:"",iv:0,busy:false};$("fwOv").style.display="flex";document.body.classList.add("fw");fwDraw();fwPoll();clearInterval(FW.iv);FW.iv=setInterval(fwPoll,SVC.followPollMs);try{$("fwExit").focus()}catch(e){}}
function fwClose(){clearInterval(FW.iv);FW.id="";$("fwOv").style.display="none";document.body.classList.remove("fw");if(/follow=/.test(location.hash))try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}}
function fwDraw(){const cv=$("fwCv");if(!cv||!FW.id)return;const W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;const pr=Math.min(2,window.devicePixelRatio||1);if(cv.width!==Math.round(W*pr)){cv.width=Math.round(W*pr);cv.height=Math.round(H*pr)}
  const x=cv.getContext("2d");x.setTransform(pr,0,0,pr,0,0);x.fillStyle="#020a0f";x.fillRect(0,0,W,H);const d=FW.d,info=$("fwInfo");
  if(!d){setTx(info,FW.err||"Loading the shared flight…");setTx($("fwHead"),"Follow a flight");return}
  const fr=apBy(d.fr),to=apBy(d.to),pts=(d.pts||[]).map(p=>({lat:p[1],lon:p[2],alt:p[3],spd:p[4],trk:p[5],t:p[0]})),lp=pts[pts.length-1];
  const all=pts.slice();if(fr)all.push(fr);if(to)all.push(to);if(!all.length){setTx(info,"No position shared yet. It updates when the sharer's phone is connected.");return}
  let la0=Math.min(...all.map(p=>p.lat)),la1=Math.max(...all.map(p=>p.lat)),lo0=Math.min(...all.map(p=>p.lon)),lo1=Math.max(...all.map(p=>p.lon));const k=Math.cos(rad((la0+la1)/2)),sx=Math.max((lo1-lo0)*k,0.6),sy=Math.max(la1-la0,0.6),sc=Math.min((W-60)/sx,(H-90)/sy),cx=(lo0+lo1)/2,cy=(la0+la1)/2;
  const P=(la,lo)=>[W/2+(lo-cx)*k*sc,H/2+10-(la-cy)*sc];
  x.fillStyle="#0a2413";x.strokeStyle="#1d7a3a";x.lineWidth=1.5;for(const poly of COAST){x.beginPath();poly.forEach((q,i)=>{const [X,Y]=P(q[0],q[1]);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.closePath();x.fill();x.stroke()}
  if(fr&&to){x.setLineDash([7,6]);x.strokeStyle="#ff4fd8";x.lineWidth=2;x.beginPath();for(let i=0;i<=60;i++){const q=gcPoint(fr,to,i/60),[X,Y]=P(q.lat,q.lon);i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.setLineDash([])}
  x.strokeStyle="#3dff6e";x.lineWidth=3;x.beginPath();pts.forEach((p,i)=>{const [X,Y]=P(p.lat,p.lon);i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
  x.font='700 13px "B612 Mono",monospace';for(const a of [fr,to]){if(!a)continue;const [X,Y]=P(a.lat,a.lon);x.fillStyle="#3dff6e";x.beginPath();x.arc(X,Y,5,0,7);x.fill();x.fillText(a.c,X+8,Y-6)}
  if(lp){const [X,Y]=P(lp.lat,lp.lon);x.save();x.translate(X,Y);x.rotate(rad(lp.trk||0));x.fillStyle="#ffd400";x.strokeStyle="#000";x.lineWidth=1.5;x.beginPath();if(d.fr==="DRV"){x.moveTo(-6,-12);x.lineTo(6,-12);x.quadraticCurveTo(8,-12,8,-9);x.lineTo(8,10);x.quadraticCurveTo(8,12,6,12);x.lineTo(-6,12);x.quadraticCurveTo(-8,12,-8,10);x.lineTo(-8,-9);x.quadraticCurveTo(-8,-12,-6,-12);x.closePath();x.fill();x.stroke();x.fillStyle="#000";x.fillRect(-6,-7,12,4);x.fillRect(-6,5,12,3)}else{x.moveTo(0,-13);x.lineTo(9,10);x.lineTo(0,5);x.lineTo(-9,10);x.closePath();x.fill();x.stroke()}x.restore()}
  const dv=d.fr==="DRV";setTx($("fwHead"),dv?"Shared drive · DRIVE":"Shared flight"+(d.fr&&d.to?" · "+d.fr+" → "+d.to:""));
  const age=lp?Math.round((Date.now()-lp.t)/60000):null,tz=to?to.tz:undefined;
  setTx(info,d.st?"Sharing has ended."+(lp?" Last position "+hhmm(lp.t)+".":""):(lp?[lp.alt!=null?Math.round(fAlt(lp.alt)/100)*100+" "+S.alt:"",lp.spd!=null?Math.round(fSpd(lp.spd))+" "+S.spd:"",d.eta?"ETA "+hhmm(d.eta,tz)+(to?" "+to.c+" time":""):"","updated "+(age<1?"just now":age+" min ago")].filter(Boolean).join(" · "):"Waiting for the first position.")+(FW.err==="offline"?" · You're offline: showing the last update.":FW.err?" · "+FW.err:"")+" · Positions arrive only while the sharer has internet. Entertainment only.")}
if($("fwExit")){$("fwExit").onclick=fwClose;$("fwGo").onclick=()=>{const id=fwParse($("fwIn").value);if(!id){setTx($("fwTxt"),"Paste the link you were sent (it contains #follow=…).");return}fwOpen(id)};window.addEventListener("resize",()=>{if(FW.id)fwDraw()})}
{const id=fwParse(location.hash);if(id)setTimeout(()=>fwOpen(id),300)}
window.addEventListener("hashchange",()=>{const id=fwParse(location.hash);if(id&&id!==FW.id)fwOpen(id)});
window.cpFollow={open:id=>fwOpen(id),close:fwClose,state:()=>({id:FW.id?FW.id.slice(0,4)+"…":"",d:FW.d,err:FW.err,info:$("fwInfo").textContent})};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&FW.id)fwClose()});

/* ---- test hook: feed a GPS fix straight in (skips the ground filter) ---- */
window.cpFix=(lat,lon,alt,spd,trk,t,acc)=>{onPos({gf:true,timestamp:t||Date.now(),coords:{latitude:lat,longitude:lon,altitude:alt,accuracy:acc||5,speed:spd,heading:trk}});lastFixAt=Date.now();return !!last};

/* ---- periodic renders and wiring ---- */
function v23fRender(){try{todRender()}catch(e){}try{if(!document.activeElement||document.activeElement.id!=="dyIn")dyRender()}catch(e){}try{sunAltRender()}catch(e){}try{shUI()}catch(e){}}
setInterval(()=>{if(!document.hidden)v23fRender()},5000);
for(const id of ["from","to","packDep"])if($(id))$(id).addEventListener("change",()=>{setTimeout(()=>{try{seatRender();bodyRender();SUNA.t=0;sunAltRender()}catch(e){console.warn(e)}},0)});
document.querySelectorAll('.seg[data-k="tbLead"],.seg[data-k="sunAlert"],.seg[data-k="spot"]').forEach(s=>s.addEventListener("click",()=>setTimeout(()=>{tbCheck();spotRender();SUNA.t=0;sunAltRender()},0)));
applySeg();rtRender();
const waitRwy=setInterval(()=>{if(RWY||Date.now()-v23T0>8000){clearInterval(waitRwy);try{seatRender();bodyRender()}catch(e){console.warn(e)}}},300);const v23T0=Date.now();
try{bookRender()}catch(e){}bmpRender();lsRender();dyRender();spotRender();shUI();v23fRender();cfApply();
window.cpV23f={seatRender,bodyRender,statsRender,sunAltRender,todRender,FEAT,SVC:Object.assign({},SVC)};
/* ===================== v23 features 16-20 (display only: none of this changes phases or the logbook) ===================== */
/* ---- 16 Glance mode: big, high-contrast numbers for a propped-up phone ---- */
const GL={on:false,dim:!!store.get("gldim",false),tm:0};
function glData(){const tko=tkOn(),L=viewL()||last,to=tko?tkTo():apBy(S.to),n=L&&to?navT(L,to):null,ft=S.alt==="ft";
  return {eta:n?n.eta:"--:--",rem:n?remS(n.sec):"--",alt:L&&L.alt!=null?Math.round(fAlt(L.alt)/(ft?100:10))*(ft?100:10):null,spd:L&&L.spd!=null?Math.round(fSpd(L.spd)):null,
    dtg:L&&to?Math.round(fDst(dist(L,to))):null,to:to?to.c:"",ph:tko?"TRACKING "+TKS.reg:(PHN[PH.p]||""),age:L?Math.round((Date.now()-L.t)/1000):null}}
function glRender(){if(!GL.on)return;const g=glData(),u={kt:"KT",kmh:"KM/H",mph:"MPH"}[S.spd]||"KT";
  setTx($("glEta"),g.eta);setTx($("glEtaS"),g.to?"ETA "+g.to+" local · "+g.rem.replace("H","h ").replace("M","m")+" to go":"Set your route on the Route page");
  setTx($("glAlt"),g.alt==null?"---":g.alt.toLocaleString("en-AU"));setTx($("glAltU"),S.alt==="ft"?"FT":"M");
  setTx($("glSpd"),g.spd==null?"---":String(g.spd));setTx($("glSpdU"),u);
  setTx($("glDtg"),g.dtg==null?"---":g.dtg.toLocaleString("en-AU"));setTx($("glDtgU"),(S.dst==="nm"?"NM":"KM")+" TO GO");
  setTx($("glTop"),(g.ph?g.ph+" · ":"")+(g.age!=null&&g.age>30?"last fix "+Math.round(g.age/60)+" min ago":"live"))}
function glOpen(){GL.on=true;document.body.classList.add("glance");$("glOv").classList.toggle("dim",GL.dim);$("glOv").classList.add("on");glRender();clearInterval(GL.tm);GL.tm=setInterval(glRender,1000);
  try{if(!wantWake)$("wakeBtn").click()}catch(e){}try{$("glX").focus()}catch(e){}}
function glClose(){GL.on=false;document.body.classList.remove("glance");$("glOv").classList.remove("on");clearInterval(GL.tm)}
$("glBtn").onclick=glOpen;$("glX").onclick=e=>{e.stopPropagation();glClose()};
$("glDim").onclick=e=>{e.stopPropagation();GL.dim=!GL.dim;store.set("gldim",GL.dim);$("glOv").classList.toggle("dim",GL.dim);setTx($("glDim"),GL.dim?"Bright":"Dim")};
setTx($("glDim"),GL.dim?"Bright":"Dim");
document.addEventListener("keydown",e=>{if(GL.on&&e.key==="Escape")glClose()});
window.cpGlance={open:glOpen,close:glClose,data:glData,on:()=>GL.on,dim:()=>GL.dim};

/* ---- 17 Seatbelt and phase cues: gentle GPS-based prompts (a guess; the crew's instructions always win) ---- */
if(!["on","voice","off"].includes(S.cues))S.cues="on";
const CU={k:null,said:{},log:[],p:null,slowAt:0,hide:0};
const CUT={taxiOut:"Taxiing out: seatbelt on, tray table stowed and window blind up for take-off.",
  level:"Levelling off. The seatbelt sign may go off soon; keep it loosely fastened when you're seated.",
  tod:"Descent soon: stow tables, finish up and get your bags sorted.",
  appr:"On approach: seatbelt on, seat upright, tray table stowed, blind up.",
  gate:"Taxiing, nearly at the gate: stay seated until the seatbelt sign goes off."};
function cueShow(id,txt){CU.said[id]=Date.now();CU.log.unshift({id,t:Date.now(),txt});CU.log.length=Math.min(CU.log.length,10);
  const b=$("cueBar");b.textContent=txt;b.style.display="";clearTimeout(CU.hide);CU.hide=setTimeout(()=>{b.style.display="none"},20000);try{hap(30)}catch(e){}
  if(S.cues==="voice")say(txt,true)}
function cueCheck(){if(S.cues==="off"||REPLAY||DRV.on)return null;const k=PH.bookId||PH.ev.off||PH.ev.up||(PH.demo?"demo":"x");if(k!==CU.k){CU.k=k;CU.said={};CU.slowAt=0}
  const p=PH.p,L=last,ev=PH.ev||{},sp=L&&L.spd!=null?L.spd:null;let id=null;
  if(p==="taxi"&&!ev.td&&!ev.up&&!ev.roll)id="taxiOut";
  else if(p==="cruise"&&CU.p==="climb")id="level";
  else if(p==="cruise"||(p==="descent"&&!CU.said.tod)){try{const t=todInfo();if(t&&!t.past&&t.sec<240&&p==="cruise")id="tod";else if(p==="descent"&&CU.p==="cruise")id="tod"}catch(e){}}
  if(p==="approach")id="appr";
  if(ev.td&&sp!=null&&sp<15&&sp>1.5&&(p==="landed"||p==="taxi")){if(!CU.slowAt)CU.slowAt=Date.now();if(Date.now()-CU.slowAt>15000)id="gate"}
  CU.p=p;if(id&&!CU.said[id]){cueShow(id,CUT[id]);return id}return null}
setInterval(()=>{try{cueCheck()}catch(e){}},1000);
$("cueBar").onclick=()=>{$("cueBar").style.display="none"};
window.cpTap={say:t=>say(t),cue:(id,t)=>cueShow(id,t)};
window.cpCue={state:()=>({p:PH.p,ev:PH.ev,demo:!!PH.demo,cues:S.cues,rep:!!REPLAY,spd:last&&last.spd,cp:CU.p}),check:cueCheck,log:()=>CU.log.slice(),reset:()=>{CU.said={};CU.k=null;CU.log=[]},text:CUT};

/* ---- 18 Connection countdown: time to make the next flight on a multi-leg trip ---- */
const CN=Object.assign({t:"",kind:"same",flt:""},store.get("conn",{}));
const HUB=new Set(["SYD","MEL","BNE","PER","AKL","SIN","HKG","LAX","DXB","DOH","LHR","NRT","HND","ICN","BKK","KUL","SFO","YVR","DFW","JFK"]);
const CNK={same:{l:"Same terminal",m:0},term:{l:"Change terminal",m:20},intl:{l:"International transfer",m:45}};
function cnArr(){const to=apBy(S.to),fr=apBy(S.from);if(!to)return null;const L=viewL()||last,n=L&&(PH.p!=="parked"||(L.spd!=null&&L.spd>40))?navT(L,to):null;
  if(n)return {ms:Date.now()+n.sec*1000,how:"live ETA"};
  if(PH.ev&&PH.ev.on&&Date.now()-PH.ev.on<3*3600e3)return {ms:PH.ev.on,how:"landed"};
  if(fr&&fr.c!==to.c){const dep=depMs()||null;if(dep)return {ms:dep+15*60000+dist(fr,to)/230*1000+10*60000,how:"planned from Departs time"}}
  return null}
function cnCalc(){const to=apBy(S.to);if(!to||!/^\d{1,2}:\d{2}$/.test(CN.t))return null;const a=cnArr();if(!a)return {need:"time"};
  const taxi=(typeof TAXI==="object"&&TAXI[to.c])||(HUB.has(to.c)?9:5),deplane=CN.kind==="intl"?12:8,walk=(HUB.has(to.c)?12:5)+CNK[CN.kind].m,close=CN.kind==="intl"||(to.tz&&!/^Australia\//.test(to.tz))?30:20;
  let lt;try{lt=new Date(a.ms).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:to.tz})}catch(e){lt=new Date(a.ms).toTimeString().slice(0,5)}
  const am=(+lt.slice(0,2))*60+(+lt.slice(3,5)),[h,m]=CN.t.split(":").map(Number);let gap=((h*60+m-am)%1440+1440)%1440;if(gap>1200)gap-=1440;
  const atGate=taxi+deplane+walk,margin=gap-atGate-close,st=gap<0?"departed":margin>=20?"ok":margin>=0?"tight":"risk";
  return {to:to.c,arr:lt,how:a.how,gap,taxi,deplane,walk,close,margin,st,depMs:a.ms+gap*60000}}
function cnRender(){const o=$("cnOut");if(!o)return;const r=cnCalc();
  if(!r){setTx($("cnBig"),"—");o.innerHTML='<li class="note">Enter the next flight\'s departure time (local time at '+(S.to||"your destination")+').</li>';return}
  if(r.need){setTx($("cnBig"),"—");o.innerHTML='<li class="note">Needs a live ETA (GPS or Demo) or a Departs time in the pre-flight pack.</li>';return}
  const lab={ok:"Comfortable",tight:"Tight",risk:"At risk",departed:"Already departed"}[r.st],left=Math.max(0,Math.round((r.depMs-Date.now())/60000));
  setTx($("cnBig"),r.st==="departed"?lab:hm(left*60)+" to departure");$("cnBig").className="bigv cn-"+r.st;
  o.innerHTML=[["Arrive "+r.to,r.arr+" local ("+r.how+")"],["Next flight"+(CN.flt?" "+CN.flt:""),CN.t+" local · "+r.gap+" min after landing"],
    ["To the gate","~"+(r.taxi+r.deplane+r.walk)+" min: taxi "+r.taxi+", off the plane "+r.deplane+", walk "+r.walk+" ("+CNK[CN.kind].l.toLowerCase()+")"],
    ["Boarding closes","~"+r.close+" min before departure"],["Spare time",r.margin+" min · "+lab]].map(x=>'<li><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></li>').join("")}
$("cnTime").value=CN.t;$("cnFlt").value=CN.flt;
$("cnTime").addEventListener("input",()=>{CN.t=$("cnTime").value;store.set("conn",CN);cnRender()});
$("cnFlt").addEventListener("input",()=>{CN.flt=$("cnFlt").value.replace(/[^A-Za-z0-9 ]/g,"").slice(0,8);store.set("conn",CN);cnRender()});
$("cnKind").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;CN.kind=CNK[b.dataset.v]?b.dataset.v:"same";store.set("conn",CN);cnSeg();cnRender()});
function cnSeg(){for(const b of $("cnKind").querySelectorAll("button"))b.classList.toggle("on",b.dataset.v===CN.kind)}cnSeg();
$("cnClr").onclick=()=>{CN.t="";CN.flt="";$("cnTime").value="";$("cnFlt").value="";store.set("conn",CN);cnRender()};
window.cpConn={calc:cnCalc,set:o=>{Object.assign(CN,o||{});store.set("conn",CN);cnSeg();$("cnTime").value=CN.t;cnRender();return cnCalc()}};

/* ---- 19 Points of interest timeline: "coming up" list from the landmark data, tied to the window seat guide ---- */
function poiAhead(L,max){const to=apBy(S.to);if(!L||!to||L.spd==null||L.spd<40)return null;const crs=L.trk!=null&&PH.p!=="approach"?L.trk:brg(L,to),dg=dist(L,to),spd=L.spd,
    horizon=Math.min(dg+5000,spd*(max||90)*60),alt=Math.max(L.alt||0,1500),vis=Math.min(90000,8000+alt*7),out=[];
  const cands=lmAll().map(l=>({n:l.n,lat:l.lat,lon:l.lon,k:l.kind||"lm",r:l.r||2})).concat(AP.filter(a=>a.c!==S.from).map(a=>({n:a.c===to.c?a.n+" (your destination)":a.n+" airport",lat:a.lat,lon:a.lon,k:"ap",r:2})));
  for(const c of cands){const d13=dist(L,c)/R;if(d13*R>horizon+vis)continue;const dth=rad(brg(L,c)-crs),xt=Math.asin(Math.sin(d13)*Math.sin(dth))*R,at=Math.acos(clampN(Math.cos(d13)/Math.cos(xt/R),-1,1))*R*(Math.cos(dth)<0?-1:1);
    if(at<1500||at>horizon||Math.abs(xt)>vis)continue;const min=at/spd/60,side=Math.abs(xt)<3000?"below":xt>0?"right":"left";
    out.push({n:c.n,k:c.k,min,side,off:Math.abs(xt),w:(WSK[c.k]||1)*(1-0.6*Math.abs(xt)/vis)})}
  out.sort((a,b)=>a.min-b.min);const seen=new Set(),res=[];for(const o of out){if(seen.has(o.n))continue;seen.add(o.n);if(o.w<0.35&&o.k!=="ap")continue;res.push(o);if(res.length>=12)break}return res}
function poiPlan(){const g=seatGuide(S.from,S.to);if(!g)return null;const r=[];for(const sd of ["left","right"])for(const x of g.it[sd])if(x.min!=null)r.push({n:x.txt,min:x.min,side:sd,plan:true});return r.sort((a,b)=>a.min-b.min).slice(0,14)}
function poiRender(){const o=$("poiOut");if(!o)return;const L=viewL()||last,airborne=L&&L.spd!=null&&L.spd>40&&PH.p!=="parked";const mine=S.seat==="left"||S.seat==="right"?S.seat:null;
  const list=airborne?poiAhead(L):poiPlan();setTx($("poiHead"),airborne?"Coming up":"Along the way (from take-off)");
  if(!list||!list.length){o.innerHTML='<li class="note">'+(airborne?"Nothing notable in view in the next 90 minutes.":"Pick From and To on the Route page.")+'</li>';return}
  o.innerHTML=list.map(x=>{const sd=x.side==="below"?"below (both sides)":x.side+" side",yours=mine&&x.side===mine?" yours":"",t=x.plan?"~"+hm(x.min*60)+" after take-off":x.min<1?"now":"in "+Math.round(x.min)+" min";
    return '<li class="poi'+yours+'"><b>'+esc(x.n.replace(/ · .*$/,""))+'</b><span>'+t+', '+sd+'</span></li>'}).join("")}
window.cpPOI={ahead:(m)=>poiAhead(viewL()||last,m),plan:poiPlan,render:poiRender};

/* ---- 20 Speed and altitude records + live tailwind boost ---- */
function windAt(pk,f,h){const sm=pk&&pk.smp;if(!sm||!sm.length)return null;const s=sm[Math.max(0,Math.min(sm.length-1,Math.round(f*(sm.length-1))))];
  const lv=(s.lv||[]).filter(l=>l[1]!=null&&l[2]!=null&&l[3]!=null).sort((a,b)=>a[1]-b[1]);if(!lv.length)return null;
  const uv=l=>{const r=rad(l[3]);return [-l[2]*Math.sin(r),-l[2]*Math.cos(r)]};let u,v;
  if(h<=lv[0][1]||lv.length===1)[u,v]=uv(lv[0]);else if(h>=lv[lv.length-1][1])[u,v]=uv(lv[lv.length-1]);
  else{const i=lv.findIndex(l=>l[1]>h),a=lv[i-1],b=lv[i],k=(h-a[1])/(b[1]-a[1]),A=uv(a),B=uv(b);u=A[0]+(B[0]-A[0])*k;v=A[1]+(B[1]-A[1])*k}
  return {u,v,s:Math.hypot(u,v),d:(deg(Math.atan2(-u,-v))+360)%360}}
function boostNow(){const L=viewL()||last,fr=apBy(S.from),to=apBy(S.to);if(!L||!fr||!to||L.spd==null||L.spd<60||L.trk==null||L.alt==null||L.alt<3000)return null;
  const pk=packFor(S.from,S.to);if(!pk)return null;const tot=dist(fr,to),f=clampN(1-dist(L,to)/tot,0,1),w=windAt(pk,f,L.alt);if(!w)return null;
  const gs=L.spd*3600/NMm,r=rad(L.trk),gu=gs*Math.sin(r),gv=gs*Math.cos(r),tas=Math.hypot(gu-w.u,gv-w.v);return {gs,tas,boost:gs-tas,wind:w}}
const REC=Object.assign({},store.get("rec",{}));
function recPut(k,v,ctx){if(v==null||!isFinite(v))return false;const o=REC[k];if(o&&o.v>=v)return false;REC[k]={v:+v.toFixed(1),t:Date.now(),r:ctx||((S.from||"?")+"–"+(S.to||"?"))};REC.dirty=1;return true}
function recScan(){const B=BOOK.filter(b=>b&&!b.demo&&!b.drv);for(const b of B){const r=b.from+"–"+b.to;if(b.ms)recPut("gs",b.ms*3600/NMm,r);if(b.ma)recPut("alt",b.ma*FT,r);if(b.d)recPut("far",b.d/NMm,r);
  const ev=b.ev||{},a0=ev.up||ev.off,a1=ev.td||ev.on;if(a0&&a1&&a1>a0)recPut("long",(a1-a0)/60000,r)}}
let recLive={};
function recTick(){if(demo||PH.demo||REPLAY||tkOn())return;const L=last;if(!L||PH.p==="parked")return;let nb=[];
  if(L.spd!=null&&L.alt!=null&&L.alt>3000&&recPut("gs",L.spd*3600/NMm))nb.push("groundspeed");if(L.alt!=null&&L.alt>3000&&recPut("alt",L.alt*FT))nb.push("altitude");
  const b=boostNow();if(b&&recPut("boost",b.boost))nb.push("tailwind boost");
  if(REC.dirty){delete REC.dirty;store.set("rec",REC)}for(const n of nb){if(!recLive[n]&&Object.keys(REC).length>1){recLive[n]=1;say("New personal best "+n+"!",true)}}}
function recRender(){const o=$("recOut");if(!o)return;recScan();if(REC.dirty){delete REC.dirty;store.set("rec",REC)}
  const row=(l,k,f)=>{const x=REC[k];return '<li><b>'+l+'</b><span>'+(x?f(x.v)+' · '+esc(x.r)+' · '+new Date(x.t).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"2-digit"}):"—")+'</span></li>'};
  o.innerHTML=row("Fastest groundspeed","gs",v=>Math.round(fSpd(v*NMm/3600))+" "+S.spd)+row("Highest","alt",v=>Math.round(fAlt(v/FT)).toLocaleString("en-AU")+" "+S.alt)+
    row("Biggest tailwind boost","boost",v=>"+"+Math.round(fSpd(v*NMm/3600))+" "+S.spd)+row("Farthest flight","far",v=>Math.round(fDst(v*NMm)).toLocaleString("en-AU")+" "+S.dst)+row("Longest flight","long",v=>hm(v*60));
  const b=boostNow(),t=$("twNow");if(t){t.style.display=b?"":"none";if(b){const k=Math.round(fSpd(b.boost*NMm/3600));setTx($("twBig"),(k>=0?"+":"")+k+" "+S.spd);
    setTx($("twSub"),(b.boost>=0?"Tailwind":"Headwind")+" from the pre-flight pack: wind "+Math.round(b.wind.d)+"° at "+Math.round(b.wind.s)+" kt, est. true airspeed "+Math.round(fSpd(b.tas*NMm/3600))+" "+S.spd+". Estimate.")}}}
setInterval(()=>{try{recTick()}catch(e){}},5000);
window.cpRec={boost:boostNow,windAt,get:()=>JSON.parse(JSON.stringify(REC)),scan:()=>{recScan();return JSON.parse(JSON.stringify(REC))},tick:recTick,render:recRender,reset:()=>{for(const k of Object.keys(REC))delete REC[k];store.set("rec",REC)}};
/* ---- 21 Battery saver: dim, slower GPS, 3D paused and frame rate capped while the battery is low ---- */
if(!["auto","on","off"].includes(S.bat))S.bat="auto";
const BAT={lvl:null,chg:null,api:false,on:false,why:"",svWas:false};
function batWant(){if(S.bat==="on")return [true,"on by hand"];if(S.bat==="off")return [false,""];
  if(BAT.api&&BAT.lvl!=null&&!BAT.chg&&BAT.lvl<=0.2)return [true,"battery "+Math.round(BAT.lvl*100)+"%"];return [false,""]}
function batApply(){const [w,why]=batWant();BAT.why=why;const ch=w!==BAT.on;BAT.on=w;document.body.classList.toggle("saver",w);
  if(ch){/* GPS: lower accuracy demand and accept cached fixes (fewer wakes) */
    GPSO.enableHighAccuracy=!w;GPSO.maximumAge=w?20000:5000;
    if(watchId!=null&&!demo&&!REPLAY){try{navigator.geolocation.clearWatch(watchId)}catch(e){}watchId=navigator.geolocation.watchPosition(onPos,onErr,GPSO)}
    if(w&&SV.on){BAT.svWas=true;try{svClose()}catch(e){}say("Battery saver: 3D view paused.",true)}
    if(SV.ctl&&SV.ctl.setFps){try{SV.ctl.setFps(w?10:(+S.svfps||30))}catch(e){}}
    if(w)say("Battery saver on"+(why?" ("+why+")":"")+": screen dimmed, GPS slowed, 3D paused.",true)}
  batUI()}
function batUI(){const t=$("batSt");if(!t)return;setTx(t,(BAT.on?"Saver on ("+BAT.why+"): screen dimmed, GPS every ~20 s, 3D paused (10 fps cap if reopened).":"Saver off.")+
  (BAT.api?" Battery "+(BAT.lvl!=null?Math.round(BAT.lvl*100)+"%":"?")+(BAT.chg?", charging":"")+".":" This browser doesn't report battery level (iPhone Safari doesn't), so Auto can't switch it on: use On."))}
(async()=>{try{if(navigator.getBattery){const b=await navigator.getBattery();BAT.api=true;const up=()=>{BAT.lvl=b.level;BAT.chg=b.charging;batApply()};b.addEventListener("levelchange",up);b.addEventListener("chargingchange",up);up()}}catch(e){}batApply()})();
{const _so=svOpen;svOpen=function(){const r=_so.apply(this,arguments);if(BAT.on){setTimeout(()=>{try{SV.ctl&&SV.ctl.setFps(10)}catch(e){}},1500);say("Battery saver: 3D capped at 10 frames a second.",true)}return r}}
document.addEventListener("click",e=>{if(e.target.closest('.seg[data-k="bat"]'))setTimeout(batApply,0)});
window.cpBat={apply:batApply,state:()=>({on:BAT.on,why:BAT.why,api:BAT.api,lvl:BAT.lvl,gpso:Object.assign({},GPSO),fps:SV.ctl?SV.ctl.fps:null}),
  sim:(lvl,chg)=>{BAT.api=true;BAT.lvl=lvl;BAT.chg=!!chg;batApply();return BAT.on}};

/* ---- 22 Data export: logbook and tracks as CSV, GPX and KML ---- */
const xEsc=t=>String(t==null?"":t).replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"})[c]);
const csvQ=v=>{const s=v==null?"":String(v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
const iso=t=>t?new Date(t).toISOString():"";
function exBook(){return BOOK.filter(b=>b&&!b.demo)}
function exName(b){return ((b.flt?b.flt+" ":"")+b.from+"-"+b.to+" "+new Date(b.date).toISOString().slice(0,10)).trim()}
function exCsvBook(B){const h=["date_utc","flight","from","to","aircraft","off_blocks_utc","takeoff_utc","landing_utc","on_blocks_utc","airborne_min","distance_nm","max_alt_ft","max_gs_kt","landing_score","diary_notes","marks","track_points"];
  return h.join(",")+"\n"+B.map(b=>{const e=b.ev||{},air=e.up&&e.td?Math.round((e.td-e.up)/60000):"";
    return [iso(b.date),b.flt,b.from,b.to,b.ac,iso(e.off),iso(e.up),iso(e.td),iso(e.on),air,b.d?(b.d/NMm).toFixed(1):"",b.ma?Math.round(b.ma*FT):"",b.ms?Math.round(b.ms*3600/NMm):"",b.ls?b.ls.score:"",(b.dy||[]).length,(b.marks||[]).length,(b.pts||[]).length].map(csvQ).join(",")}).join("\n")+"\n"}
function exCsvTracks(B){return "flight,time_utc,lat,lon,alt_m,alt_ft,gs_kt\n"+B.map(b=>{const n=exName(b);return (b.pts||[]).map(p=>[n,iso(p[3]),p[0],p[1],p[2]==null?"":p[2],p[2]==null?"":Math.round(p[2]*FT),p[4]==null?"":Math.round(p[4]*3600/NMm)].map(csvQ).join(",")).join("\n")}).filter(Boolean).join("\n")+"\n"}
function exGpx(B){return '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Cabin Panel" xmlns="http://www.topografix.com/GPX/1/1">\n'+
  B.map(b=>(b.marks||[]).map(m=>`<wpt lat="${m.lat}" lon="${m.lon}">${m.alt!=null?"<ele>"+Math.round(m.alt)+"</ele>":""}<time>${iso(m.t)}</time><name>${xEsc(exName(b))} MK${m.n}</name><desc>${xEsc(m.note)}</desc></wpt>`).join("\n")).filter(Boolean).join("\n")+"\n"+
  B.map(b=>`<trk><name>${xEsc(exName(b))}</name><desc>${xEsc(b.from+" to "+b.to+(b.ac?" · "+b.ac:""))}</desc><trkseg>\n`+(b.pts||[]).map(p=>`<trkpt lat="${p[0]}" lon="${p[1]}">${p[2]!=null?"<ele>"+p[2]+"</ele>":""}<time>${iso(p[3])}</time></trkpt>`).join("\n")+"\n</trkseg></trk>").join("\n")+"\n</gpx>\n"}
function exKml(B){return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2">\n<Document><name>Cabin Panel flights</name>\n<Style id="trk"><LineStyle><color>ff00d7ff</color><width>3</width></LineStyle></Style>\n'+
  B.map(b=>{const e=b.ev||{},pts=(b.pts||[]).filter(p=>p[0]!=null&&p[1]!=null);
    return `<Folder><name>${xEsc(exName(b))}</name>\n<Placemark><name>${xEsc(b.from+" → "+b.to)}</name><description>${xEsc((b.ac?b.ac+" · ":"")+(b.d?Math.round(b.d/NMm)+" nm":"")+(b.ls?" · landing "+b.ls.score+"/100":""))}</description><styleUrl>#trk</styleUrl>`+
      (pts.length&&pts[0][3]?`<TimeSpan><begin>${iso(pts[0][3])}</begin><end>${iso(pts[pts.length-1][3])}</end></TimeSpan>`:"")+
      `<LineString><tessellate>1</tessellate><altitudeMode>absolute</altitudeMode><coordinates>\n`+pts.map(p=>p[1]+","+p[0]+","+(p[2]==null?0:p[2])).join("\n")+"\n</coordinates></LineString></Placemark>\n"+
      (b.marks||[]).map(m=>`<Placemark><name>MK${m.n}</name><description>${xEsc(m.note)}</description><Point><coordinates>${m.lon},${m.lat},${m.alt==null?0:Math.round(m.alt)}</coordinates></Point></Placemark>`).join("\n")+"</Folder>"}).join("\n")+"\n</Document></kml>\n"}
function exRun(kind){const B=exBook(),stamp=new Date().toISOString().slice(0,10),msg=$("exTxt");if(!B.length){setTx(msg,"No flights in the logbook yet (demo flights aren't exported).");return null}
  const f={csv:["cabin-panel-logbook-"+stamp+".csv","text/csv",exCsvBook],trk:["cabin-panel-tracks-"+stamp+".csv","text/csv",exCsvTracks],gpx:["cabin-panel-flights-"+stamp+".gpx","application/gpx+xml",exGpx],kml:["cabin-panel-flights-"+stamp+".kml","application/vnd.google-earth.kml+xml",exKml]}[kind];
  if(!f)return null;const text=f[2](B);shareOrDownload(f[0],f[1],text,msg);return {name:f[0],bytes:text.length,flights:B.length}}
for(const k of ["csv","trk","gpx","kml"]){const b=$("ex_"+k);if(b)b.onclick=()=>exRun(k)}
window.cpExport={csv:()=>exCsvBook(exBook()),tracks:()=>exCsvTracks(exBook()),gpx:()=>exGpx(exBook()),kml:()=>exKml(exBook()),run:exRun};

/* v25: the follow link points at the light follow page served by the share server itself (not the app's web host), so family
   don't need the app and the link carries no account or personal name; the id stays in the #fragment */
function shLink2(id){return "https://cabin-adsb.cabinpanel-pb.workers.dev/follow/#id="+id}  /* a literal: this runs during boot, before later consts exist */

/* periodic display refresh for 16-22 */
function v23gRender(){try{poiRender()}catch(e){}try{recRender()}catch(e){}try{cnRender()}catch(e){}try{batUI()}catch(e){}}
setInterval(v23gRender,5000);setTimeout(v23gRender,800);
window.cpV23g={render:v23gRender};
/* ===================== 24) Boarding pass scan / upload (on-device only) =====================
   Camera scan, an image or screenshot, or a Wallet .pkpass file. The barcode (PDF417 / Aztec / QR, IATA BCBP) is decoded on the
   phone by bcbp-zx.js in a Web Worker. We keep only flight, date, seat and from/to; the name and booking code are dropped. */
function bcbpParse(s){s=String(s||"").replace(/\r?\n/g,"");if(/^m[1-4]/.test(s))s=s.toUpperCase();if(!/^M[1-4]/.test(s)||s.length<58)return null;
  const g=(a,b)=>s.slice(a,b),from=g(30,33).trim().toUpperCase(),to=g(33,36).trim().toUpperCase(),car=g(36,39).trim().toUpperCase(),num=g(39,44).trim().replace(/^0+(?=\d)/,""),jd=parseInt(g(44,47),10),seatRaw=g(48,52).trim(),cls=g(47,48);
  if(!/^[A-Z]{3}$/.test(from)||!/^[A-Z]{3}$/.test(to)||!/^[A-Z0-9]{2,3}$/.test(car)||!/^\d{1,4}[A-Z]?$/.test(num))return null;
  let date=null;if(jd>=1&&jd<=366){const now=new Date();let best=null;for(const y of [now.getFullYear()-1,now.getFullYear(),now.getFullYear()+1]){const d=new Date(y,0,jd);const df=(d-now)/864e5;if(df>-40&&df<330&&(!best||Math.abs(df)<Math.abs(best.df)))best={d,df}}date=best?best.d:null}
  const seat=/^\d{1,3}[A-Z]$/.test(seatRaw.replace(/^0+/,""))?seatRaw.replace(/^0+/,""):seatRaw.replace(/^0+/,"")||"",legs=+s[1]||1;
  const L=seat.slice(-1),side=L==="A"?"left":["F","K","L","J","H"].includes(L)?"right":null,win=L==="A"||["F","K","L"].includes(L);
  return {flt:car+num,car,num,from,to,date:date?date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0"):"",seat,cls,side,win,legs}}
const BP={w:null,id:0,cb:{},on:false,stream:null,t:0,last:store.get("bp",null)};
function bpWorker(){if(BP.w)return BP.w;BP.w=new Worker("bcbp-zx.js");BP.w.onmessage=e=>{const m=e.data||{},f=BP.cb[m.id];delete BP.cb[m.id];if(f)f(m)};BP.w.onerror=()=>{for(const k in BP.cb){BP.cb[k]({r:null,err:"decoder failed"});delete BP.cb[k]}};return BP.w}
function bpDecode(img){return new Promise(res=>{const id=++BP.id,buf=img.data.buffer.slice(0);BP.cb[id]=res;try{bpWorker().postMessage({id,w:img.width,h:img.height,buf},[buf])}catch(e){delete BP.cb[id];res({r:null,err:String(e)})}
  setTimeout(()=>{if(BP.cb[id]){delete BP.cb[id];res({r:null,err:"timeout"})}},15000)})}
function bpPixels(src,w,h,max){const k=Math.min(1,(max||1600)/Math.max(w,h)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(w*k));c.height=Math.max(1,Math.round(h*k));const x=c.getContext("2d",{willReadFrequently:true});x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(src,0,0,c.width,c.height);return x.getImageData(0,0,c.width,c.height)}
async function bpFromImage(blob){const url=URL.createObjectURL(blob);try{const im=new Image();im.src=url;await im.decode();
  for(const max of [1600,2400,1000]){const r=await bpDecode(bpPixels(im,im.naturalWidth,im.naturalHeight,max));if(r&&r.r)return r.r}return null}finally{URL.revokeObjectURL(url)}}
/* .pkpass = zip; read pass.json (stored or deflated) without any library */
async function bpFromPkpass(blob){const b=new Uint8Array(await blob.arrayBuffer()),dv=new DataView(b.buffer);
  for(let i=0;i+30<b.length;){if(dv.getUint32(i,true)!==0x04034b50)break;const meth=dv.getUint16(i+8,true),csz=dv.getUint32(i+18,true),nl=dv.getUint16(i+26,true),xl=dv.getUint16(i+28,true),name=new TextDecoder().decode(b.subarray(i+30,i+30+nl)),st=i+30+nl+xl;
    if(name==="pass.json"){let data=b.subarray(st,st+csz);if(meth===8){const ds=new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));data=new Uint8Array(await new Response(ds).arrayBuffer())}
      const j=JSON.parse(new TextDecoder().decode(data).replace(/^\uFEFF/,""));const bc=(Array.isArray(j.barcodes)&&j.barcodes[0])||j.barcode;return bc&&bc.message?{text:String(bc.message),format:"WALLET "+String(bc.format||"").replace("PKBarcodeFormat","")}:null}
    if(!csz)break;i=st+csz}
  return null}
function bpApply(p,how){const msg=[];if(!p){setTx($("bpTxt"),"That barcode isn't an airline boarding pass (IATA BCBP).");return null}
  const okF=!!apBy(p.from),okT=!!apBy(p.to);
  if(okF){$("from").value=p.from;$("from").dispatchEvent(new Event("change"))}else msg.push(p.from+" isn't in the built-in airport list");
  if(okT){$("to").value=p.to;$("to").dispatchEvent(new Event("change"))}else msg.push(p.to+" isn't in the built-in airport list");
  S.flt=p.flt;try{$("fltIn").value=p.flt}catch(e){}if(p.side){S.seat=p.side;try{applySeg()}catch(e){}}saveS();
  BP.last={flt:p.flt,from:p.from,to:p.to,date:p.date,seat:p.seat,side:p.side,win:p.win,at:Date.now(),how};store.set("bp",BP.last);
  bpShow();try{seatRender()}catch(e){}try{render();drawMap();profAll()}catch(e){}
  if(msg.length)setTx($("bpTxt"),msg.join("; ")+". Pick it on the Route page.");
  try{const pg=PG.els.findIndex(s=>s.contains($("wsTile")));if(pg>=0){pgGo(pg);setTimeout(()=>$("wsTile").scrollIntoView({block:"start",behavior:"smooth"}),450)}}catch(e){}
  hap(25);return BP.last}
function bpShow(){const b=BP.last,o=$("bpOut");if(!o)return;if(!b){o.innerHTML="";return}
  const g=(()=>{try{return seatGuide(b.from,b.to)}catch(e){return null}})(),best=g&&g.best!=="either"?g.best:null;
  o.innerHTML=[["Flight",esc(b.flt)],["Date",b.date?new Date(b.date+"T12:00:00").toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"}):"—"],["Route",esc(b.from)+" → "+esc(b.to)],
    ["Seat",esc(b.seat||"—")+(b.side?" · "+(b.win?"window":"near the window")+", "+b.side+" side":"")+(best?(b.side===best?" ✓ the better side for views":" · the "+best+" side has more to see"):"")]].map(r=>'<li><b>'+r[0]+'</b><span>'+r[1]+'</span></li>').join("");
  setTx($("bpTxt"),"Read from your boarding pass on this phone ("+b.how+"). Name and booking reference are not kept.")}
async function bpFile(f){if(!f)return;setTx($("bpTxt"),"Reading…");let r=null;
  try{r=/\.pkpass$/i.test(f.name)||f.type==="application/vnd.apple.pkpass"?await bpFromPkpass(f):await bpFromImage(f)}catch(e){r=null}
  if(!r){setTx($("bpTxt"),"Couldn't find a barcode. Try a sharper screenshot, or crop to the barcode.");return null}
  return bpApply(bcbpParse(r.text),(r.format||"barcode")+(/\.pkpass$/i.test(f.name)?"":" image"))}
async function bpScanStart(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){setTx($("bpTxt"),"No camera here. Upload a screenshot instead.");return}
  try{BP.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1080}},audio:false})}catch(e){setTx($("bpTxt"),"Camera blocked. Allow it in Settings, or upload a screenshot.");return}
  BP.on=true;$("bpOv").classList.add("on");const v=$("bpVid");v.srcObject=BP.stream;try{await v.play()}catch(e){}setTx($("bpScanTxt"),"Hold the barcode inside the frame, flat and well lit.");bpLoop()}
async function bpLoop(){if(!BP.on)return;const v=$("bpVid");if(v.videoWidth){const r=await bpDecode(bpPixels(v,v.videoWidth,v.videoHeight,1600));if(r&&r.r){const p=bcbpParse(r.r.text);if(p){bpScanStop();bpApply(p,"camera "+r.r.format);return}setTx($("bpScanTxt"),"Found a "+r.r.format+" code, but it isn't a boarding pass.")}}
  BP.t=setTimeout(bpLoop,250)}
function bpScanStop(){BP.on=false;clearTimeout(BP.t);try{BP.stream&&BP.stream.getTracks().forEach(t=>t.stop())}catch(e){}BP.stream=null;$("bpOv").classList.remove("on")}
$("bpScan").onclick=bpScanStart;$("bpUp").onclick=()=>$("bpFile").click();$("bpFile").addEventListener("change",e=>{const f=e.target.files&&e.target.files[0];bpFile(f);e.target.value=""});
$("bpX").onclick=bpScanStop;$("bpClr").onclick=()=>{BP.last=null;store.set("bp",null);bpShow();setTx($("bpTxt"),"Cleared.")};
document.addEventListener("keydown",e=>{if(BP.on&&e.key==="Escape")bpScanStop()});
bpShow();
window.cpBP={parse:bcbpParse,file:bpFile,apply:(t,how)=>bpApply(bcbpParse(t),how||"test"),last:()=>BP.last,decodeUrl:async u=>{const b=await (await fetch(u)).blob();return bpFromImage(b)},pkpass:bpFromPkpass};
/* ===================== 25) Aircraft info card (tail number or tracked aircraft) =====================
   Through Cabin Panel's server (/api/info/..., sources adsbdb.com then hexdb.io). Saved on the phone once fetched, so it works offline. */
const AIC=Object.assign({},store.get("acinfo",{}));
const aiNorm=v=>{v=String(v||"").toUpperCase().replace(/\s+/g,"");if(/^[0-9A-F]{6}$/.test(v)&&!/^VH/.test(v))return {k:"hex",v:v.toLowerCase()};try{const n=tkNormReg(v);if(n)return {k:"reg",v:n}}catch(e){}return /^[A-Z0-9][A-Z0-9-]{1,9}$/.test(v)?{k:"reg",v}:null};
function aiCached(q){if(!q)return null;const e=AIC[q.k+":"+q.v];return e&&e.o?e:null}
function aiSave(q,o){const e={o,at:Date.now()};AIC[q.k+":"+q.v]=e;if(o.reg)AIC["reg:"+o.reg.toUpperCase()]=e;if(o.hex)AIC["hex:"+o.hex.toLowerCase()]=e;
  const ks=Object.keys(AIC);if(ks.length>240){ks.sort((a,b)=>AIC[a].at-AIC[b].at);for(const k of ks.slice(0,ks.length-200))delete AIC[k]}store.set("acinfo",AIC)}
async function aiFetch(q){const r=await svcFetch(SVC.info+q.k+"/"+encodeURIComponent(q.v),{},12000);if(r.status===404)return {none:true};if(!r.ok)throw new Error(r.status===429?"busy, try again in a minute":"answered "+r.status);
  const o=await r.json();const c=s=>String(s||"").replace(/[<>]/g,"").slice(0,60);return {reg:c(o.reg),hex:c(o.hex),type:c(o.type),icao:c(o.icao),mfr:c(o.mfr),owner:c(o.owner),country:c(o.country),flag:c(o.flag),src:c(o.src)}}
async function aiLookup(v,quiet){const q=aiNorm(v);if(!q){if(!quiet)setTx($("aiTxt"),"Enter a registration (e.g. VH-YIA) or a 6-character Mode S code.");return null}
  const c=aiCached(q);if(c&&(!cfOk()||Date.now()-c.at<30*864e5)){aiShow(c.o,c.at,true);return c.o}
  if(!cfOk()){if(!quiet)setTx($("aiTxt"),cfWhy()+": not saved on this phone yet.");return null}
  if(!quiet)setTx($("aiTxt"),"Looking up "+q.v+"…");
  try{const o=await aiFetch(q);if(o.none){if(!quiet)setTx($("aiTxt"),"No record for "+q.v+" in the free databases.");$("aiCard").innerHTML="";return null}aiSave(q,o);aiShow(o,Date.now(),false);return o}
  catch(e){if(c){aiShow(c.o,c.at,true);return c.o}if(!quiet)setTx($("aiTxt"),"Couldn't look it up: "+((e&&e.message)||e)+".");return null}}
function aiShow(o,at,saved){const typ=[o.mfr,o.type].filter(Boolean).join(" ");
  $("aiCard").innerHTML='<div class="aiReg">'+esc(o.reg||o.hex.toUpperCase())+'</div><ul class="lm">'+[["Type",typ||"—"],["ICAO type",o.icao||"—"],["Operator / owner",o.owner||"—"],["Country",o.country||"—"],["Airline code",o.flag||"—"],["Mode S",o.hex?o.hex.toUpperCase():"—"],
    ["Age","Build year isn't in the free databases"]].map(r=>'<li><b>'+r[0]+'</b><span>'+esc(r[1])+'</span></li>').join("")+'</ul>';
  setTx($("aiTxt"),"Source: "+(o.src||"?")+" via Cabin Panel's server · "+(saved?"saved on this phone "+new Date(at).toLocaleDateString("en-AU",{day:"numeric",month:"short"}):"just fetched, now saved for offline")+".")}
function aiUI(){const q=aiNorm($("aiIn").value),cached=!!aiCached(q),ok=cfOk(),b=$("aiGo"),dis=!ok&&!cached;b.disabled=dis;b.classList.toggle("cfdis",dis);setTx(b,!ok&&cached?"Show (saved)":"Look up");
  let w=$("aiWhy");setTx(w,dis?cfWhy():"");w.style.display=dis?"":"none";
  const tk=(()=>{try{return TKS&&TKS.on?(TKS.reg||TKS.hex):null}catch(e){return null}})(),tb=$("aiTk");tb.style.display=tk?"":"none";if(tk)setTx(tb,"Tracked: "+tk);
  const n=Object.keys(AIC).filter(k=>k.startsWith("reg:")).length;setTx($("aiN"),n?n+" saved":"")}
$("aiGo").onclick=()=>aiLookup($("aiIn").value);$("aiIn").addEventListener("input",aiUI);$("aiIn").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();if(!$("aiGo").disabled)aiLookup($("aiIn").value)}});
$("aiTk").onclick=()=>{try{const v=TKS.reg||TKS.hex;$("aiIn").value=v;aiUI();aiLookup(v)}catch(e){}};
setInterval(()=>{try{aiUI()}catch(e){}},3000);window.addEventListener("cp-online",aiUI);aiUI();
/* prefetch the tracked aircraft once while connected, so its card is there offline later */
setInterval(()=>{try{if(TKS&&TKS.on&&cfOk()){const q=aiNorm(TKS.reg||TKS.hex);if(q&&!aiCached(q)&&!AIC["miss:"+q.v]){AIC["miss:"+q.v]={at:Date.now()};aiLookup(q.v,true)}}}catch(e){}},20000);
window.cpAI={lookup:aiLookup,cached:v=>{const c=aiCached(aiNorm(v));return c?c.o:null},ui:aiUI,norm:aiNorm,clear:()=>{for(const k of Object.keys(AIC))delete AIC[k];store.set("acinfo",AIC)}};
/* ===================== 26) Night sky mode in AR + NVG / FLIR / IR looks =====================
   Offline: ~60 bright stars (J2000, Hipparcos values, no precession: about 0.4° off by 2026), the Moon (low-precision series, ~0.3°),
   planets from JPL's approximate Keplerian elements (~1°), the Sun from the app's sunPos. ISS (optional): two-line elements fetched
   through Cabin Panel's server when connected and kept on the phone; propagated with J2 secular terms (a few degrees, good for a day or two). */
if(!["auto","on","off"].includes(S.arSky))S.arSky="auto";
const SKST=[["Sirius",6.752,-16.716,-1.46],["Canopus",6.399,-52.696,-0.74],["Rigil Kentaurus",14.660,-60.834,-0.27],["Arcturus",14.261,19.182,-0.05],["Vega",18.616,38.784,0.03],["Capella",5.278,45.998,0.08],
 ["Rigel",5.242,-8.202,0.13],["Procyon",7.655,5.225,0.34],["Achernar",1.629,-57.237,0.46],["Betelgeuse",5.919,7.407,0.5],["Hadar",14.064,-60.373,0.61],["Altair",19.846,8.868,0.76],["Acrux",12.443,-63.099,0.76],
 ["Aldebaran",4.599,16.509,0.86],["Antares",16.490,-26.432,0.96],["Spica",13.420,-11.161,0.97],["Pollux",7.755,28.026,1.14],["Fomalhaut",22.961,-29.622,1.16],["Deneb",20.690,45.280,1.25],["Mimosa",12.795,-59.689,1.25],
 ["Regulus",10.140,11.967,1.35],["Adhara",6.977,-28.972,1.5],["Castor",7.577,31.888,1.58],["Shaula",17.560,-37.104,1.62],["Gacrux",12.519,-57.113,1.63],["Bellatrix",5.419,6.350,1.64],["Elnath",5.438,28.608,1.65],
 ["Miaplacidus",9.220,-69.717,1.67],["Alnilam",5.604,-1.202,1.69],["Alnair",22.137,-46.961,1.74],["Alnitak",5.679,-1.943,1.77],["Alioth",12.900,55.960,1.77],["Dubhe",11.062,61.751,1.79],["Mirfak",3.405,49.861,1.79],
 ["Wezen",7.140,-26.393,1.83],["Kaus Australis",18.403,-34.385,1.85],["Avior",8.375,-59.510,1.86],["Alkaid",13.792,49.313,1.86],["Sargas",17.622,-42.998,1.87],["Menkalinan",5.992,44.948,1.9],["Atria",16.811,-69.028,1.91],
 ["Alhena",6.629,16.399,1.92],["Peacock",20.427,-56.735,1.94],["Polaris",2.530,89.264,1.98],["Mirzam",6.378,-17.956,1.98],["Alphard",9.460,-8.659,1.98],["Hamal",2.120,23.462,2.0],["Diphda",0.727,-17.987,2.02],
 ["Nunki",18.921,-26.297,2.05],["Menkent",14.111,-36.370,2.06],["Alpheratz",0.140,29.091,2.06],["Mirach",1.163,35.621,2.06],["Saiph",5.796,-9.670,2.07],["Kochab",14.845,74.156,2.08],["Rasalhague",17.582,12.560,2.08],
 ["Algol",3.136,40.956,2.1],["Denebola",11.818,14.572,2.13],["Naos",8.060,-40.003,2.21],["Suhail",9.133,-43.433,2.21],["Mintaka",5.533,-0.299,2.23],["Schedar",0.675,56.537,2.24],["Delta Crucis",12.252,-58.749,2.79]];
const SKAS=[["Southern Cross",[["Acrux","Gacrux"],["Mimosa","Delta Crucis"]]],["Pointers",[["Rigil Kentaurus","Hadar"]]],["Orion's Belt",[["Alnitak","Alnilam"],["Alnilam","Mintaka"]]],
 ["Orion",[["Betelgeuse","Bellatrix"],["Bellatrix","Mintaka"],["Alnitak","Saiph"],["Saiph","Rigel"],["Rigel","Mintaka"],["Betelgeuse","Alnitak"]]],["Scorpius tail",[["Antares","Shaula"],["Shaula","Sargas"]]]];
/* JPL approximate elements (1800-2050): a, e, I, L, long.peri, long.node and rates per Julian century */
const SKPL={Mercury:[[0.38709927,0.20563593,7.00497902,252.2503235,77.45779628,48.33076593],[0.00000037,0.00001906,-0.00594749,149472.67411175,0.16047689,-0.12534081],-0.4],
  Venus:[[0.72333566,0.00677672,3.39467605,181.9790995,131.60246718,76.67984255],[0.0000039,-0.00004107,-0.0007889,58517.81538729,0.00268329,-0.27769418],-4.2],
  Earth:[[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0],[0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0]],
  Mars:[[1.52371034,0.0933941,1.84969142,-4.55343205,-23.94362959,49.55953891],[0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343],0.7],
  Jupiter:[[5.202887,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909],[-0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106],-2.3],
  Saturn:[[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448],[-0.0012506,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794],0.6]};
const skJd=ms=>ms/864e5+2440587.5;
function skHelio(p,T){const [e0,r]=SKPL[p],a=e0[0]+r[0]*T,e=e0[1]+r[1]*T,I=rad(e0[2]+r[2]*T),L=e0[3]+r[3]*T,wb=e0[4]+r[4]*T,Om=e0[5]+r[5]*T,w=rad(wb-Om),O=rad(Om);
  let M=((L-wb)%360+540)%360-180;M=rad(M);let E=M+e*Math.sin(M);for(let i=0;i<8;i++)E-=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));
  const xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E),cw=Math.cos(w),sw=Math.sin(w),cO=Math.cos(O),sO=Math.sin(O),cI=Math.cos(I),sI=Math.sin(I);
  return [(cw*cO-sw*sO*cI)*xp+(-sw*cO-cw*sO*cI)*yp,(cw*sO+sw*cO*cI)*xp+(-sw*sO+cw*cO*cI)*yp,(sw*sI)*xp+(cw*sI)*yp]}
function skEq(x,y,z,T){const e=rad(23.43928-0.0130042*T),ye=y*Math.cos(e)-z*Math.sin(e),ze=y*Math.sin(e)+z*Math.cos(e);return {ra:Math.atan2(ye,x),dec:Math.atan2(ze,Math.hypot(x,ye)),r:Math.hypot(x,y,z)}}
function skGmst(ms){const d=skJd(ms)-2451545;return ((280.46061837+360.98564736629*d)%360+360)%360}
function skAzEl(ra,dec,ms,lat,lon){const H=rad(skGmst(ms)+lon)-ra,p=rad(lat),el=Math.asin(Math.sin(p)*Math.sin(dec)+Math.cos(p)*Math.cos(dec)*Math.cos(H)),
  az=(deg(Math.atan2(-Math.sin(H)*Math.cos(dec),Math.sin(dec)*Math.cos(p)-Math.cos(dec)*Math.sin(p)*Math.cos(H)))+360)%360;return {az,el:deg(el)}}
function skMoon(ms){const T=(skJd(ms)-2451545)/36525,s=x=>Math.sin(rad(x)),c=x=>Math.cos(rad(x));
  const l=218.32+481267.881*T+6.29*s(135.0+477198.87*T)-1.27*s(259.3-413335.36*T)+0.66*s(235.7+890534.22*T)+0.21*s(269.9+954397.74*T)-0.19*s(357.5+35999.05*T)-0.11*s(186.5+966404.03*T);
  const b=5.13*s(93.3+483202.02*T)+0.28*s(228.2+960400.89*T)-0.28*s(318.3+6003.15*T)-0.17*s(217.6-407332.21*T);
  const hp=0.9508+0.0518*c(135.0+477198.87*T)+0.0095*c(259.3-413335.36*T)+0.0078*c(235.7+890534.22*T)+0.0028*c(269.9+954397.74*T);
  const x=c(b)*c(l),y=c(b)*s(l),z=s(b),q=skEq(x,y,z,T);return {ra:q.ra,dec:q.dec,hp,lon:l}}
/* ---- ISS from two-line elements ---- */
let TLE=store.get("tle",null);
async function tleGet(force){if(!cfOk()||(!force&&TLE&&Date.now()-TLE.got<12*3600e3))return TLE;try{const r=await svcFetch(SVC.tle,{},10000);if(r.ok){const j=await r.json();if(/^1 25544/.test(j.l1)&&/^2 25544/.test(j.l2)){TLE={l1:j.l1,l2:j.l2,src:j.src,got:Date.now()};store.set("tle",TLE)}}}catch(e){}return TLE}
function tleEpoch(l1){const y=+l1.slice(18,20),d=parseFloat(l1.slice(20,32));return Date.UTC(y<57?2000+y:1900+y,0,1)+(d-1)*864e5}
function issEci(ms){if(!TLE)return null;const l1=TLE.l1,l2=TLE.l2,ep=tleEpoch(l1),dt=(ms-ep)/60000;if(Math.abs(dt)>4*1440)return null;
  const i=rad(+l2.slice(8,16)),O0=rad(+l2.slice(17,25)),e=+("0."+l2.slice(26,33).trim()),w0=rad(+l2.slice(34,42)),M0=rad(+l2.slice(43,51)),n=+l2.slice(52,63)*2*Math.PI/1440,nd=parseFloat(l1.slice(33,43))*2*Math.PI/1440/1440;
  const mu=398600.4418,Re=6378.137,J2=1.08262668e-3,a=Math.cbrt(mu/((n/60)**2)),p=a*(1-e*e),k=1.5*J2*(Re/p)**2*n,O=O0-k*Math.cos(i)*dt,w=w0+k*0.5*(5*Math.cos(i)**2-1)*dt,M=M0+n*dt+nd*dt*dt;
  let E=M;for(let j=0;j<10;j++)E-=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));const xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E);
  const cw=Math.cos(w),sw=Math.sin(w),cO=Math.cos(O),sO=Math.sin(O),ci=Math.cos(i),si=Math.sin(i);
  return [(cw*cO-sw*sO*ci)*xp+(-sw*cO-cw*sO*ci)*yp,(cw*sO+sw*cO*ci)*xp+(-sw*sO+cw*cO*ci)*yp,(sw*si)*xp+(cw*si)*yp]}
function issTopo(ms,lat,lon,hm){const r=issEci(ms);if(!r)return null;const th=rad(skGmst(ms)),x=r[0]*Math.cos(th)+r[1]*Math.sin(th),y=-r[0]*Math.sin(th)+r[1]*Math.cos(th),z=r[2];
  const a=6378.137,f=1/298.257223563,e2=f*(2-f),p=rad(lat),l=rad(lon),N=a/Math.sqrt(1-e2*Math.sin(p)**2),h=(hm||0)/1000,ox=(N+h)*Math.cos(p)*Math.cos(l),oy=(N+h)*Math.cos(p)*Math.sin(l),oz=(N*(1-e2)+h)*Math.sin(p);
  const dx=x-ox,dy=y-oy,dz=z-oz,E=-Math.sin(l)*dx+Math.cos(l)*dy,Nn=-Math.sin(p)*Math.cos(l)*dx-Math.sin(p)*Math.sin(l)*dy+Math.cos(p)*dz,U=Math.cos(p)*Math.cos(l)*dx+Math.cos(p)*Math.sin(l)*dy+Math.sin(p)*dz,rg=Math.hypot(E,Nn,U);
  return {az:(deg(Math.atan2(E,Nn))+360)%360,el:deg(Math.asin(U/rg)),km:rg,alt:Math.hypot(x,y,z)-6371}}
/* ---- everything above the horizon right now ---- */
function skyNow(ms,L){ms=ms||Date.now();L=L||last;if(!L)return null;const lat=L.lat,lon=L.lon,T=(skJd(ms)-2451545)/36525,out=[],h=Math.max(0,L.alt||0),dip=deg(Math.acos(R/(R+h*0.87))),sun=sunPos(ms,lat,lon);
  const put=(n,k,ae,mag,extra)=>{if(ae.el<-dip-1)return;out.push(Object.assign({n,k,az:ae.az,el:ae.el,mag},extra||{}))};
  for(const s of SKST)put(s[0],"star",skAzEl(rad(s[1]*15),rad(s[2]),ms,lat,lon),s[3]);
  const E=skHelio("Earth",T);for(const p of ["Mercury","Venus","Mars","Jupiter","Saturn"]){const P=skHelio(p,T),g=skEq(P[0]-E[0],P[1]-E[1],P[2]-E[2],T),ae=skAzEl(g.ra,g.dec,ms,lat,lon),sa=skAzEl(...(()=>{const q=skEq(-E[0],-E[1],-E[2],T);return [q.ra,q.dec]})(),ms,lat,lon);
    const elong=deg(Math.acos(clampN(Math.sin(rad(ae.el))*Math.sin(rad(sa.el))+Math.cos(rad(ae.el))*Math.cos(rad(sa.el))*Math.cos(rad(ae.az-sa.az)),-1,1)));if(elong<12)continue;put(p,"planet",ae,SKPL[p][2],{elong:Math.round(elong)})}
  {const m=skMoon(ms),ae=skAzEl(m.ra,m.dec,ms,lat,lon);ae.el-=m.hp*Math.cos(rad(ae.el));const se=skEq(-E[0],-E[1],-E[2],T),el=Math.acos(clampN(Math.sin(m.dec)*Math.sin(se.dec)+Math.cos(m.dec)*Math.cos(se.dec)*Math.cos(m.ra-se.ra),-1,1)),ill=Math.round((1-Math.cos(el))/2*100);
    const wax=((m.lon-(deg(Math.atan2(-E[1],-E[0]))))%360+360)%360<180;put("Moon","moon",ae,-10,{ill,wax})}
  put("Sun","sun",{az:sun.az,el:sun.el},-26);
  if(TLE){const s=issTopo(ms,lat,lon,h);if(s&&s.el>-dip-1){const sunlit=true;put("ISS","iss",s,-2,{km:Math.round(s.km),sunlit})}}
  return {at:ms,sun:sun.el,dip,list:out,dark:sun.el<-6,twi:sun.el<-0.5}}
function skyActive(){if(S.arSky==="off")return false;if(S.arSky==="on")return true;const L=last;if(!L)return false;try{return sunPos(Date.now(),L.lat,L.lon).el<-4}catch(e){return false}}
const SKY={c:null,at:0};
function skyCache(){if(Date.now()-SKY.at>5000||!SKY.c){SKY.c=skyNow();SKY.at=Date.now()}return SKY.c}
function skyDraw(){if(!arOn||!skyActive()||!AR.pj||AR.pj.az==null)return;const sk=skyCache();if(!sk)return;const P=AR.pj,x=$("arCv").getContext("2d"),dark=sk.dark;
  const proj=(az,el)=>{const dA=w180b(az-P.az),dE=el-P.pitch,dx=dA*P.ppd,dy=dE*P.ppd;return [P.cx+dx*P.cr+dy*P.sr,P.cy+dx*P.sr-dy*P.cr]},on=q=>q[0]>-20&&q[0]<P.W+20&&q[1]>-20&&q[1]<P.H+20;
  const col=S.arFlt==="flir"?"#ffe9a8":S.arFlt==="ir"?"#ffffff":"#bfe6ff",lab=S.arFlt==="flir"?"#ffd27a":"#cfeaff",byN={};for(const o of sk.list)byN[o.n]=o;
  x.save();x.lineWidth=1;x.strokeStyle="rgba(170,210,255,.45)";x.setLineDash([2,4]);
  for(const [nm,segs] of SKAS){let any=false;for(const [a,b] of segs){const A=byN[a],B=byN[b];if(!A||!B)continue;const p=proj(A.az,A.el),q=proj(B.az,B.el);if(!on(p)&&!on(q))continue;any=true;x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(q[0],q[1]);x.stroke()}
    if(any&&dark){const A=byN[segs[0][0]];if(A){const p=proj(A.az,A.el);x.font="600 10px B612,sans-serif";x.fillStyle="rgba(170,210,255,.75)";x.fillText(nm,p[0]+8,p[1]+16)}}}
  x.setLineDash([]);
  for(const o of sk.list){if(o.k==="sun")continue;if(o.k==="star"&&!dark&&o.mag>0.5)continue;const p=proj(o.az,o.el);if(!on(p))continue;
    if(o.k==="moon"){const r=Math.max(7,0.52*P.ppd/2);x.strokeStyle=col;x.lineWidth=1.5;x.beginPath();x.arc(p[0],p[1],r,0,7);x.stroke();x.fillStyle="rgba(230,240,255,.85)";x.beginPath();x.arc(p[0],p[1],r*0.85,-Math.PI/2,Math.PI/2,!o.wax);x.fill()}
    else if(o.k==="iss"){x.strokeStyle="#ffbf00";x.lineWidth=1.5;x.strokeRect(p[0]-6,p[1]-6,12,12);x.beginPath();x.moveTo(p[0]-10,p[1]);x.lineTo(p[0]+10,p[1]);x.stroke()}
    else{const r=o.k==="planet"?3.2:Math.max(1.2,3-o.mag*0.8);x.fillStyle=o.k==="planet"?"#fff3c4":col;x.beginPath();x.arc(p[0],p[1],r,0,7);x.fill();if(o.k==="planet"){x.strokeStyle="#fff3c4";x.lineWidth=1;x.beginPath();x.arc(p[0],p[1],r+3,0,7);x.stroke()}}
    if(o.k!=="star"||o.mag<1.7){const t=o.k==="moon"?"Moon "+o.ill+"%":o.k==="iss"?"ISS "+Math.round(fDst(o.km*1000))+" "+S.dst:o.n;x.font=(o.k==="star"?"500 10px":"700 11px")+" B612,sans-serif";x.lineWidth=3;x.strokeStyle="rgba(0,0,0,.85)";x.strokeText(t,p[0]+7,p[1]-5);x.fillStyle=o.k==="iss"?"#ffbf00":lab;x.fillText(t,p[0]+7,p[1]-5)}}
  x.font="600 10px B612 Mono,monospace";x.fillStyle="rgba(190,225,255,.8)";x.fillText("NIGHT SKY"+(TLE?" · ISS "+(Date.now()-TLE.got<864e5?"elements fresh":"elements "+Math.round((Date.now()-TLE.got)/864e5)+" d old"):""),10,P.H-8-(document.body.classList.contains("arMin")?0:0));
  x.restore()}
{const _ad=arDraw;arDraw=function(dt){const r=_ad.apply(this,arguments);try{skyDraw()}catch(e){}return r}}
/* Identify: also names stars, planets, the Moon and the ISS above the horizon */
function skyHit(v){const sk=skyCache();if(!sk||!v)return null;let best=null;for(const o of sk.list){if(o.k==="sun")continue;if(o.k==="star"&&!sk.dark&&o.mag>0.5)continue;const a=Math.hypot(w180b(o.az-v.az)*Math.cos(rad(o.el)),o.el-v.pitch),tol=Math.max(2.5,(v.unc||3)*1.2)+(o.k==="moon"?0.5:0);if(a<=tol&&(!best||a<best.a))best={o,a}}return best}
{const _ai=arIdentify;arIdentify=function(){const out=_ai.apply(this,arguments);try{if(out&&!out.err&&skyActive()){const v=AR.view,L=last,dip=deg(Math.acos(R/(R+Math.max(0,L.alt||0)*0.87)));
  if(v.pitch>-dip+0.3){const h=skyHit(v);if(h&&(!out.hit||out.hit.hid||h.a<1.5)){out.sky={n:h.o.n,k:h.o.k,az:Math.round(h.o.az),el:+h.o.el.toFixed(1),mag:h.o.mag,ill:h.o.ill,km:h.o.km,elong:h.o.elong};out.hit=null}}}}catch(e){}return out}}
{const _as=arIdShow;arIdShow=function(o){if(o&&o.sky){const s=o.sky,el=$("arIdOut");el.style.display="block";const kn={star:"Star",planet:"Planet",moon:"The Moon",iss:"International Space Station"}[s.k]||"";
  el.innerHTML=`<b>${esc(s.n)}</b><span class="arIk">${kn}</span><p>Azimuth ${String(s.az).padStart(3,"0")}°T · ${s.el}° above the horizon${s.k==="moon"?" · "+s.ill+"% lit":""}${s.k==="iss"?" · "+Math.round(fDst(s.km*1000))+" "+S.dst+" away, orbiting at about 420 km":""}${s.k==="planet"?" · "+s.elong+"° from the Sun":""}${s.k==="star"?" · magnitude "+s.mag:""}</p><p class="arIa">Worked out on the phone from the time and your GPS position. Approximate (±${(o.unc||3).toFixed(1)}° compass).</p>`;
  clearTimeout(ARI.hT);ARI.hT=setTimeout(()=>{el.style.display="none"},15000);return}return _as.apply(this,arguments)}}
/* NVG / FLIR / IR looks over the camera (CSS + an SVG colour map; display only) */
{const _au=arUI;arUI=function(){const r=_au.apply(this,arguments);for(const f of ["nvg","flir","ir"])document.body.classList.toggle("arf-"+f,S.arFlt===f);return r}}
document.addEventListener("click",e=>{if(e.target.closest('.seg[data-k="arFlt"]')||e.target.closest('.seg[data-k="arSky"]'))setTimeout(()=>{try{arUI()}catch(x){}SKY.at=0},0)});
setInterval(()=>{if(arOn&&skyActive()&&cfOk()&&(!TLE||Date.now()-TLE.got>12*3600e3))tleGet()},60000);
window.cpSky={now:(ms,lat,lon,alt)=>skyNow(ms,lat!=null?{lat,lon,alt:alt||0}:null),active:skyActive,tle:()=>TLE,fetchTle:()=>tleGet(true),iss:(ms,lat,lon,alt)=>issTopo(ms||Date.now(),lat,lon,alt||0),hit:skyHit,stars:SKST.length};
/* ===================== v25: Drive mode (built 21 Nov 2026) =====================
   A guarded "missile switch" on the HUD page flips the app between flight mode and Drive mode. Drive mode is for a
   PASSENGER in a car: it asks "I'm the passenger" when arming (first time, or if the last check was over 4 hours ago)
   and again after every 4 hours in Drive mode. It keeps the HUD, gauges, retro panels, glance view, GPS logging, replay,
   diary, export, live sharing, AR, sun times, battery saver and voice, and switches off the flight-only features listed
   in DRV_OFF (each page says what is off). Flight mode behaviour is unchanged.
   Drive privacy hold (replaces the airport/50 kt rule while in Drive mode): your position is never shared within 5 km of
   where this drive started (first good GPS fix after arming), the start points of your previous 3 drives, or any spot you
   saved as private; after leaving those zones nothing is sent for a further 3 minutes. Held fixes are never sent later.
   Zones and start points are stored on this phone only. */
PHN.drive="Driving";
const DRV_PAX_MS=4*3600e3,DRV_REST_MS=2*3600e3,DRV_REST_BREAK=15*60000,DRV_ZONE_M=5000,DRV_DELAY_MS=180000,DRV_MOVE=5/3.6,DRV_PARK_S=300;
const DRV_FEAT=["tod","turb","seat","arrival","landing"],DRV_FEAT0={};for(const k of DRV_FEAT)DRV_FEAT0[k]=FEAT[k];
/* what is switched off, per page (shown as a note on that page while Drive mode is on) */
const DRV_OFF=[["lsTile","pg-log","landing score"],["todTile","pg-nav","top of descent"],["arrTile","pg-nav","arrival helper"],["tbBan",null,"turbulence warning"],["cueBar",null,"seatbelt and phase cues"],
  ["wsTile","pg-route","window seat guide"],["poiTile","pg-win","window seat \u201ccoming up\u201d list"],["bpTile","pg-route","boarding pass scan"],["cnTile","pg-route","connection countdown"],["packTile","pg-route","pre-flight weather pack"],["svpTile","pg-route","3D route pack"],
  /* v25 declutter: flight-only controls that made no sense in a car */
  ["fltRow","pg-route","flight lookup"],["fltTxt","pg-route",""],["apRow","pg-route",""],["acRow","pg-route",""],["bcTile","pg-route","body clock"],["rtTile","pg-route","common routes"],["rtNote","pg-route",""],
  ["demoBtn","pg-hud","demo flight"],["pickBtn","pg-hud",""]];
const DRV_OFF_H2=["Landing score","Window seat guide","Connection","Pre-flight pack","3D route pack","Route","Body clock","Common routes"];
let TOWNS=[];
fetch("towns.json").then(r=>r.ok?r.json():null).then(j=>{if(j&&Array.isArray(j.t))TOWNS=j.t.filter(x=>Array.isArray(x)&&typeof x[0]==="string"&&isFinite(x[1])&&isFinite(x[2]));drvTownList()}).catch(()=>{});
const drvFresh=()=>!!(last&&Date.now()-lastFixAt<60000);
function townNear(p,km){let b=null,bd=(km||30)*1000;for(const t of TOWNS){const d=dist(p,{lat:t[1],lon:t[2]});if(d<bd){bd=d;b=t}}return b?b[0]:""}
function drvTo(){const d=DRV.dest;if(!d)return null;let st="NSW";try{st=stateAt(d.lat,d.lon)}catch(e){}return {drv:1,c:String(d.n).toUpperCase().replace(/[^A-Z0-9 ]/g,"").slice(0,10)||"DEST",n:d.n,lat:d.lat,lon:d.lon,tz:"Australia/"+(STZ[st]||"Sydney")}}
/* ---- destination: typed town, airport code, landmark or "lat, lon" (all offline) ---- */
function drvFind(q){q=String(q||"").slice(0,80).trim();if(!q)return null;
  const m=q.match(/^(-?\d{1,2}(?:\.\d+)?)\s*[, ]\s*(-?\d{1,3}(?:\.\d+)?)$/);if(m){const lat=+m[1],lon=+m[2];if(Math.abs(lat)<=90&&Math.abs(lon)<=180)return {n:lat.toFixed(3)+", "+lon.toFixed(3),lat,lon,src:"coords"}}
  const u=q.toUpperCase();if(/^[A-Z]{3}$/.test(u)){const a=apBy(u);if(a)return {n:a.n+" airport",lat:a.lat,lon:a.lon,src:"airport"};const b=AP2.find(x=>x[0]===u);if(b)return {n:b[1],lat:b[2],lon:b[3],src:"airport"}}
  const lo=q.toLowerCase().replace(/\s+/g," "),[nm,stq]=lo.split(/\s*,\s*/),stU=stq?stq.toUpperCase():"";if(!nm)return null;
  const ok=t=>!stU||t[3]===stU,pick=f=>{let b=null;for(const t of TOWNS)if(ok(t)&&f(t[0].toLowerCase())&&(!b||t[4]>b[4]))b=t;return b};
  const t=pick(n=>n===nm)||pick(n=>n.startsWith(nm))||(nm.length>=4?pick(n=>n.includes(nm)):null);
  if(t)return {n:t[0]+(t[3]?", "+t[3]:""),lat:t[1],lon:t[2],src:"town"};
  if(stU)return null;try{const l=lmAll().find(x=>String(x.n).toLowerCase().startsWith(nm));if(l)return {n:l.n,lat:l.lat,lon:l.lon,src:"landmark"}}catch(e){}
  return null}
function drvTownList(){const dl=$("drvTowns");if(!dl||dl.childElementCount)return;const f=document.createDocumentFragment();for(const t of TOWNS.slice(0,700)){const o=document.createElement("option");o.value=t[0]+(t[3]?", "+t[3]:"");f.appendChild(o)}dl.appendChild(f)}
/* ---- ETA: from how fast you are actually closing on the destination over the last ~10 min (so a winding road is
   allowed for); before that, current speed with a rough road allowance (straight line x 1.25). Never road routing. ---- */
function drvEta(L){const to=drvTo();if(!L||!to)return null;const d=dist(L,to),h=DRV.cl||[],now=L.t||Date.now();let cs=null,src="";
  const old=h.find(q=>now-q.t>=300000&&now-q.t<=900000)||h.find(q=>now-q.t>=90000);if(old){const c=(old.d-d)/((now-old.t)/1000);if(c>=2.8){cs=c;src="closing"}}
  let sec=null;if(cs)sec=d/cs;else if(L.spd!=null&&L.spd>=2.8){sec=d*1.25/L.spd;src="speed"}
  if(sec==null)return {d,sec:null,eta:"--:--",src:"",road:d*1.25};
  let eta="";try{eta=new Date(Date.now()+sec*1000).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:to.tz})}catch(e){eta=new Date(Date.now()+sec*1000).toTimeString().slice(0,5)}
  return {d,sec,eta,src,road:d*1.25}}
function drvEtaMs(){const e=drvEta(last);return e&&e.sec!=null?Math.round(Date.now()+e.sec*1000):null}
/* ---- privacy hold for live sharing in Drive mode ---- */
function drvZones(){return [DRV.start,...(DRV.starts||[]),...(DRV.priv||[])].filter(z=>z&&isFinite(z.lat)&&isFinite(z.lon))}
function drvPrivOk(L){if(!L||L.lat==null)return false;const now=Date.now();
  if(L.acc!=null&&L.acc>100){DRV.why="weak";return false}
  if(!DRV.start){DRV.why="start";return false}
  if(drvZones().some(z=>dist(z,L)<DRV_ZONE_M+Math.min(100,L.acc||0))){if(DRV.outAt){DRV.outAt=0;drvSave()}DRV.why="zone";return false}
  if(!DRV.outAt){DRV.outAt=now;drvSave()}
  if(now-DRV.outAt<DRV_DELAY_MS){DRV.why="delay";return false}
  DRV.why="";return true}
function shHeldWhy(){if(!DRV.on)return "position held back: you are not at an airport or moving (privacy)";
  if(DRV.why==="delay")return "position held back: you just left a private zone, sharing starts in about "+Math.max(1,Math.ceil((DRV_DELAY_MS-(Date.now()-DRV.outAt))/60000))+" min (privacy)";
  if(DRV.why==="start")return "position held back: waiting for a GPS fix to set this drive's private start zone";
  if(DRV.why==="weak")return "position held back: GPS too weak to share safely";
  return "position held back: within 5 km of where this drive started or a private spot (privacy)"}
const shFr=()=>DRV.on?"DRV":(S.from||""),shTo=()=>DRV.on?"":(S.to||"");
/* ---- ride smoothness (replaces the landing score in Drive mode). For fun: GPS and phone sensors, not a driving assessment. ---- */
const rsNew=()=>({dur:0,sq:0,brake:0,accel:0,corner:0,bump:0,le:{}});
function rsStep(L){const T=DRV.trip;if(!T)return;const rs=T.rs||(T.rs=rsNew()),p=DRV.pf;DRV.pf={t:L.t,spd:L.spd,trk:L.trk};if(!p||L.spd==null||p.spd==null)return;
  const dt=(L.t-p.t)/1000;if(!(dt>=0.5&&dt<=5))return;const aL=(L.spd-p.spd)/dt;let aY=0;if(L.trk!=null&&p.trk!=null&&L.spd>5)aY=L.spd*rad(Math.abs(w180b(L.trk-p.trk)))/dt;
  rs.dur+=dt;rs.sq+=aL*aL*dt;const ev=(k,c)=>{if(c&&L.t-(rs.le[k]||0)>4000){rs[k]++;rs.le[k]=L.t}};ev("brake",aL<-3);ev("accel",aL>2.5);ev("corner",aY>3.5&&aY<12)}
function rsScore(rs){if(!rs||rs.dur<60)return null;const h=Math.max(0.25,rs.dur/3600),rate=(rs.brake*3+rs.accel*2+rs.corner*2+rs.bump)/h,rms=Math.sqrt(rs.sq/rs.dur);
  const sc0=100-rate*2-Math.max(0,rms-0.35)*25;if(!Number.isFinite(sc0))return null;const score=Math.round(clampN(sc0,0,100));
  return {score,parts:[["Hard braking",rs.brake],["Hard acceleration",rs.accel],["Sharp cornering",rs.corner],["Bumps (motion sensor)",rs.bump]],mins:Math.round(rs.dur/60),rms:+rms.toFixed(2)}}
setInterval(()=>{if(!DRV.on||!gOn||gS==null||PH.p!=="drive"||!DRV.trip)return;const rs=DRV.trip.rs||(DRV.trip.rs=rsNew()),n=Date.now();if(Math.abs(gS-1)>0.35&&n-(rs.le.bump||0)>2000){rs.bump++;rs.le.bump=n}},250);
function rsRender(){const el=$("rsOut");if(!el)return;let r=null,live=false;if(DRV.trip&&PH.p==="drive"){r=rsScore(DRV.trip.rs);live=true}
  if(!r){const b=BOOK.find(x=>x&&x.drv&&x.rs);if(b)r=b.rs}
  setTx($("rsBig"),r?r.score+"/100":"\u2014");setTx($("rsHead"),live?"This drive":"Last drive");
  el.innerHTML=r&&Array.isArray(r.parts)?r.parts.map(p=>`<li><b>${esc(p&&p[0])}</b><span>${esc(p&&p[1])}</span></li>`).join("")+`<li><span>${esc(r.mins)} min scored${gOn?"":" · enable the G-meter to count bumps"}. For fun only: GPS and phone sensors, not a driving assessment.</span></li>`
    :'<li><span>Scores itself while you drive (after a minute or so of driving).</span></li>'}
/* ---- drive "phases": parked and driving. Logs a drive to the logbook when you park (5 min stopped). ---- */
function driveStep(L){const t=L.t,sp=L.spd||0,good=L.acc==null||L.acc<=100;
  if(!DRV.start&&good){DRV.start={lat:+L.lat.toFixed(5),lon:+L.lon.toFixed(5),t};drvSave()}
  const to=drvTo();if(to){const h=DRV.cl||(DRV.cl=[]),lp=h[h.length-1];if(!lp||t-lp.t>=10000){h.push({t,d:dist(L,to)});while(h.length&&t-h[0].t>900000)h.shift()}}
  if(PH.p!=="drive"){const mv=sp>3&&(L.acc==null||L.acc<=50);if(mv&&!goP)goP={lat:L.lat,lon:L.lon};if(!mv)goP=null;
    if(hold("dgo",mv,t,5)&&goP&&dist(goP,L)>=30){goP=null;drvBegin(t,L);say("Drive started"+(to?" to "+to.n:"")+". Passenger mode.")}return}
  const T=DRV.trip||(DRV.trip={t0:t,mv:0,sinceRest:0,nextRest:DRV_REST_MS,stopAt:0,pt:t,rs:rsNew()}),dt=Math.max(0,Math.min(30000,t-(T.pt||t)));T.pt=t;
  if(sp>=DRV_MOVE){T.mv+=dt;T.sinceRest+=dt;T.stopAt=0}else{if(!T.stopAt)T.stopAt=t;if(t-T.stopAt>=DRV_REST_BREAK&&T.sinceRest>0){T.sinceRest=0;T.nextRest=DRV_REST_MS;drvRestHide()}}
  if(T.sinceRest>=T.nextRest){T.nextRest+=DRV_REST_MS;drvRestShow(T.sinceRest)}
  rsStep(L);
  if(to&&!T.arr&&dist(L,to)<2000){T.arr=1;say("Arriving at "+to.n+".")}
  const st=stateAt(L.lat,L.lon);if(st!==PH.st){PH.stC++;if(PH.stC>=3){const old=PH.st;PH.st=st;PH.stC=0;PH.sts=PH.sts||[];if(!PH.sts.includes(st))PH.sts.push(st);
    if(old){let msg="Crossing into "+STN[st]+".";const a=tzOff(STZ[old]),b=tzOff(STZ[st]);if(a!=null&&b!=null&&a!==b){const d=b-a,hh=Math.abs(d);msg+=" Clocks go "+(d>0?"forward ":"back ")+(hh===30?"half an hour":hh===60?"one hour":hh===90?"an hour and a half":hh/60+" hours")+"."}say(msg)}savePH()}}else PH.stC=0;
  if(hold("dpark",sp<0.8,t,DRV_PARK_S)){const on=PH.holds.dpark||t;drvEnd(on,true)}}
function drvBegin(t,L){PH.ev={off:t};PH.bookId=null;PH.ended=false;PH.rt=null;PH.sts=[stateAt(L.lat,L.lon)];PH.st=PH.sts[0];PH.said={};PH.lm=[];PH.alt0=L.alt||0;
  DRV.trip={t0:t,mv:0,sinceRest:0,nextRest:DRV_REST_MS,stopAt:0,pt:t,rs:rsNew()};
  /* v25: the drive ends after 5 min parked, but only a 15 min stop counts as a rest: carry the rest timer over shorter stops */
  {const c=DRV.restC;if(c&&t>=c.at&&t-c.at<DRV_REST_BREAK){DRV.trip.sinceRest=c.since;DRV.trip.nextRest=c.next}DRV.restC=null}
  DRV.pf=null;setPhase("drive",t);LOG={on:true,pts:[]};store.set("log",LOG);drvSave()}
function drvEntry(){const pts=(LOG&&LOG.pts)||[];if(pts.length<5)return null;const f=pts[0],l=pts[pts.length-1],to=drvTo();
  const nr=q=>{const p={lat:q[0],lon:q[1]},a=townNear(p,30);if(a)return a;const b=townNear(p,150);return b?"near "+b:""},toN=to&&dist({lat:l[0],lon:l[1]},to)<5000?DRV.dest.n:nr(l);
  return {id:Date.now(),drv:1,flt:"",demo:!!(demo||PH.demo),from:nr(f)||"Start",to:toN||"End",date:f[3],ev:{off:PH.ev.off,on:PH.ev.on},st:(PH.sts||[]).slice(),...flightStats(pts),
    marks:MARKS.slice(),pts:thin(pts,600),ac:"",dy:dyFor(f[3]),rs:DRV.trip?rsScore(DRV.trip.rs)||undefined:undefined,mv:DRV.trip?Math.round(DRV.trip.mv/1000):0}}
function drvEnd(on,spoken){if(PH.p!=="drive")return;PH.ev.on=on||Date.now();let e=null;try{e=drvEntry()}catch(x){console.warn(x)}
  if(e){BOOK.unshift(e);if(BOOK.length>40)BOOK.length=40;store.set("book",BOOK);PH.bookId=e.id;try{bookRender()}catch(x){}}
  PH.rt=null;setPhase("parked",PH.ev.on);if(LOG.on){LOG.on=false;store.set("log",LOG)}
  if(spoken){const mn=Math.round((PH.ev.on-PH.ev.off)/60000);say("Parked. Drive time "+(mn>=60?Math.floor(mn/60)+" hours "+mn%60+" minutes":mn+" minutes")+(e?", "+Math.round(fDst(e.d))+" "+(S.dst==="km"?"kilometres":"nautical miles"):"")+"."+(e&&e.rs?" Ride smoothness "+e.rs.score+" out of 100.":""))}
  {const T=DRV.trip;DRV.restC=T&&T.sinceRest>0?{at:T.stopAt||PH.ev.on,since:T.sinceRest,next:T.nextRest}:null}
  DRV.trip=null;DRV.cl=[];drvSave();drvRestHide();rsRender()}
/* ---- rest-stop reminders: every 2 h of driving; a 15 min stop counts as a break ---- */
function drvRestShow(ms){const b=$("drvRest");if(!b)return;const h=Math.round(ms/3600e3*10)/10;
  b.innerHTML=`<b>REST STOP \u00b7 ${h} H DRIVING</b><span>Time for the driver to take a break: stop, revive, survive. A 15 minute stop resets this.</span>`;b.style.display="";hap([60,40,60]);say("Rest stop reminder. About "+(Math.round(h)===1?"one hour":Math.round(h)+" hours")+" of driving. Time for the driver to take a break.")}
function drvRestHide(){const b=$("drvRest");if(b)b.style.display="none"}
/* ---- passenger check ---- */
let DPX={cb:null};
function paxNeeded(){return !DRV.pax||Date.now()-DRV.pax>=DRV_PAX_MS}
function paxAsk(re,cb){DPX.cb=cb;const o=$("drvPax");setTx($("drvPaxT"),re?"PASSENGER CHECK \u00b7 4 H":"PASSENGER CHECK");
  setTx($("drvPaxP"),re?"You've been in Drive mode for 4 hours. Are you still the passenger? If you're driving, put the phone away now.":"Drive mode is for passengers only. Never use the phone while you're driving: it's dangerous and illegal.");
  setTx($("drvPaxNo"),re?"Switch to flight mode":"Cancel");o.style.display="flex";o.dataset.re=re?"1":"";try{$("drvPaxOk").focus()}catch(e){}if(re)say("Passenger check. Are you still the passenger?")}
function paxDone(yes){const o=$("drvPax"),re=o.dataset.re==="1",cb=DPX.cb;o.style.display="none";DPX.cb=null;
  if(yes){DRV.pax=Date.now();DRV.paxEver=DRV.paxEver||DRV.pax;drvSave()}
  if(cb)cb(yes);else if(re&&!yes)drvSet(false)}
$("drvPaxOk").onclick=()=>paxDone(true);$("drvPaxNo").onclick=()=>paxDone(false);
setInterval(()=>{if(DRV.on&&paxNeeded()&&$("drvPax").style.display==="none")paxAsk(true,null)},30000);
/* ---- apply / switch ---- */
const DRV_UNITS={spd:"kmh",alt:"m",dst:"km"};
function drvApply(){const on=!!DRV.on;document.body.classList.toggle("drive",on);
  for(const k of DRV_FEAT)FEAT[k]=on?0:DRV_FEAT0[k];
  for(const [id] of DRV_OFF){const e=$(id);if(e)e.classList.toggle("drvOff",on)}
  document.querySelectorAll("h2").forEach(h=>{if(DRV_OFF_H2.includes(h.textContent.trim()))h.classList.toggle("drvOff",on)});
  for(const k of ["tbLead","cues"]){const s=document.querySelector('.seg[data-k="'+k+'"]');const r=s&&s.closest(".row");if(r){r.classList.toggle("drvOff",on);const n=r.nextElementSibling;if(n&&n.classList.contains("note"))n.classList.toggle("drvOff",on)}}
  document.querySelectorAll(".drvOffNote").forEach(n=>{const pg=n.closest(".page"),ids=pg?pg.id:"";const off=DRV_OFF.filter(x=>x[1]===ids&&x[2]).map(x=>x[2]);
    if(ids==="pg-set")off.push("turbulence warning","seatbelt and phase cues");if(ids==="pg-book")off.push("flight-only badges (FL400, Night landing, Butter landing and the other flight badges)");
    if(ids==="pg-hud")off.push("turbulence warning","seatbelt and phase cues");
    n.textContent=off.length?"DRIVE MODE \u00b7 switched off: "+off.join(", ")+".":""});
  {const g=$("gs");const l=g&&g.closest(".tile").querySelector(".lab span");if(l)l.textContent=on?"Speed":"Groundspeed"}
  document.querySelectorAll("h2").forEach(h=>{const t=h.textContent.trim();if(t==="Share live flight"||t==="Share live drive")h.textContent=on?"Share live drive":"Share live flight"});
  {const g=$("trk");const l=g&&g.closest(".tile").querySelector(".lab span");if(l)l.textContent=on?"Heading":"Track"}
  {const g=$("alt");const l=g&&g.closest(".tile").querySelector(".lab span");if(l)l.textContent=on?"Altitude (GPS)":"GPS altitude"}
  if(on){$("tbBan").style.display="none";$("cueBar").style.display="none"}
  drvSwUI();try{statsRender()}catch(e){}try{rsRender()}catch(e){}try{drvTripRender()}catch(e){}try{shUI()}catch(e){}try{todRender()}catch(e){}try{applySeg();render();drawMap()}catch(e){}}
function drvUnits(on){if(on){DRV.fU={spd:S.spd,alt:S.alt,dst:S.dst};Object.assign(S,DRV.dU||DRV_UNITS)}else{DRV.dU={spd:S.spd,alt:S.alt,dst:S.dst};Object.assign(S,DRV.fU||{spd:"kt",alt:"ft",dst:"nm"})}saveS()}
function drvSet(on,why){on=!!on;if(on===!!DRV.on){drvSwUI();return true}
  if(on){if(demo||REPLAY){drvMsg("Stop the demo or replay first.");return false}
    if(PH.p!=="parked"&&!PH.ended){drvMsg("A flight is in progress ("+PHN[PH.p]+"). End it first (End flight on the HUD page).");return false}
    if(DRV.start){DRV.starts=[DRV.start,...(DRV.starts||[])].slice(0,3)}DRV.start=null;DRV.outAt=0;DRV.cl=[];DRV.trip=null;
    DRV.on=true;DRV.since=Date.now();drvUnits(true);if(last&&drvFresh()&&(last.acc==null||last.acc<=100))DRV.start={lat:+last.lat.toFixed(5),lon:+last.lon.toFixed(5),t:Date.now()};
    drvSave();drvApply();hap([40,30,80]);say("Drive mode on. Passenger only.")}
  else{if(PH.p==="drive")drvEnd(Date.now(),false);DRV.on=false;drvUnits(false);DRV.trip=null;drvSave();drvApply();hap(30);say("Flight mode.")}
  return true}
function drvMsg(t){setTx($("drvHint"),t);$("drvHint").classList.add("warn");clearTimeout(DSW.mT);DSW.mT=setTimeout(()=>{$("drvHint").classList.remove("warn");drvSwUI()},6000)}
/* the switch: guard closed (SAFE) -> guard up -> lever up (DRIVE). Guard drops by itself after 8 s if the lever isn't flipped. */
const DSW={guard:false,gT:0,mT:0};
function drvSwUI(){const sw=$("drvSw");if(!sw)return;const on=!!DRV.on,st=on?"armed":DSW.guard?"guard":"safe";sw.dataset.st=st;
  $("drvLever").setAttribute("aria-pressed",on?"true":"false");$("drvGuard").setAttribute("aria-expanded",DSW.guard||on?"true":"false");
  $("drvGuard").setAttribute("aria-label",DSW.guard||on?"Close the switch guard":"Lift the switch guard");
  setTx($("drvMode"),on?"DRIVE MODE \u00b7 PASSENGER":"FLIGHT MODE");setTx($("drvLamp"),on?"DRIVE":DSW.guard?"GUARD UP":"SAFE");setTx($("drvLbl"),on?"DRIVE":"FLIGHT");
  if(!$("drvHint").classList.contains("warn"))setTx($("drvHint"),on?"Flip the switch down to return to flight mode.":DSW.guard?"Guard up. Flip the switch up for Drive mode (passengers only).":"Lift the red guard, then flip the switch up for Drive mode (passengers only).");
  document.body.classList.toggle("drvArmed",on)}
$("drvGuard").onclick=e=>{e.stopPropagation();if(DRV.on){drvMsg("Flip the switch down first.");return}DSW.guard=!DSW.guard;clearTimeout(DSW.gT);if(DSW.guard)DSW.gT=setTimeout(()=>{if(!DRV.on){DSW.guard=false;drvSwUI()}},8000);hap(15);drvSwUI()};
$("drvLever").onclick=e=>{e.stopPropagation();
  if(DRV.on){DSW.guard=true;drvSet(false);setTimeout(()=>{DSW.guard=false;drvSwUI()},700);return}
  if(!DSW.guard){drvMsg("Lift the guard first.");hap([20,40,20]);return}
  clearTimeout(DSW.gT);const go=()=>{if(drvSet(true)){DSW.guard=false}else{DSW.guard=false;setTimeout(drvSwUI,0)}drvSwUI()};
  if(paxNeeded())paxAsk(false,y=>{if(y)go();else{DSW.guard=false;drvSwUI()}});else go()};
/* ---- trip tile: destination, distance, ETA, rest stop ---- */
function drvTripRender(){const kv=$("drvKv");if(!kv||!DRV.on)return;const to=drvTo(),L=last,T=DRV.trip,dr=PH.p==="drive";
  setTx($("drvTripH"),to?to.n:"No destination");$("drvDestX").style.display=to?"":"none";
  const e=to&&L?drvEta(L):null,rows=[];
  if(to)rows.push(["Straight line",L?Math.round(fDst(e?e.d:dist(L,to))).toLocaleString()+" "+S.dst:"waiting for GPS"],["Road (rough)",e?"~"+Math.round(fDst(e.road)).toLocaleString()+" "+S.dst:"—"],["ETA",e&&e.sec!=null?e.eta+(to.tz!==Intl.DateTimeFormat().resolvedOptions().timeZone?" local":""):"--:--"],["Time to go",e&&e.sec!=null?hm(e.sec):"—"]);
  rows.push(["Driving",T&&dr?hm(T.mv/1000):"parked"],["Next rest reminder",T&&dr?hm(Math.max(0,T.nextRest-T.sinceRest)/1000):"—"]);
  kv.innerHTML=rows.map(r=>`<div>${esc(r[0])}<b>${esc(r[1])}</b></div>`).join("");
  setTx($("drvTripNote"),(e&&e.src==="closing"?"ETA from how fast you're actually closing on "+to.n+" over the last few minutes. ":e&&e.src==="speed"?"ETA from your current speed and a rough road allowance (straight line + 25%); it improves after a few minutes of driving. ":"")+"Straight-line distances from built-in town data (works offline); no road routing, so road distance and ETA are estimates.")}
$("drvDestGo").onclick=()=>{const r=drvFind($("drvDest").value);if(!r){setTx($("drvTripNote"),"Couldn't find \u201c"+$("drvDest").value+"\u201d. Try a town name (e.g. Goulburn), \u201cTown, VIC\u201d, an airport code (CBR) or \u201clat, lon\u201d.");return}
  DRV.dest={n:r.n,lat:+r.lat.toFixed(5),lon:+r.lon.toFixed(5),src:r.src};DRV.cl=[];if(DRV.trip)DRV.trip.arr=0;drvSave();$("drvDest").value="";drvTripRender();render();say("Destination "+r.n+".")};
$("drvDest").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("drvDestGo").click()}});
$("drvDestX").onclick=()=>{DRV.dest=null;DRV.cl=[];drvSave();drvTripRender();render()};
/* private spots (share privacy): up to 5, on this phone only */
function drvPrivUI(){const t=$("drvPrivTxt");if(!t)return;const n=(DRV.priv||[]).length;
  setTx(t,"Drive privacy: nothing is shared within 5 km of this drive\u2019s start, your last 3 starts"+(n?" or your "+n+" private spot"+(n>1?"s":""):"")+", and sharing waits 3 min after you leave them. Save home as a private spot.")}
$("drvPrivBtn").onclick=()=>{if(!last||!drvFresh()){setTx($("drvPrivTxt"),"Needs a current GPS fix: start GPS first.");return}DRV.priv=[{lat:+last.lat.toFixed(5),lon:+last.lon.toFixed(5),t:Date.now()},...(DRV.priv||[])].slice(0,5);DRV.outAt=0;drvSave();drvPrivUI();hap(20);setTx($("shSt"),"Spot saved as private (5 km).")};
$("drvPrivClr").onclick=()=>{if(!confirm("Clear your saved private spots? The start points of this and your last 3 drives stay private."))return;DRV.priv=[];drvSave();drvPrivUI()};
/* ---- AR: towns and the drive destination ---- */
function drvArTargets(L,add){const c=[];for(const t of TOWNS){const d=dist(L,{lat:t[1],lon:t[2]});if(d<90000&&d>600)c.push([t,d,Math.log10(Math.max(1000,t[4]))*1e5/(d+5000)])}
  c.sort((a,b)=>b[2]-a[2]);for(const [t,d] of c.slice(0,14))add(t[0],t[1],t[2],"town",(t[3]?t[3]+" · ":"")+"town"+(t[4]>=1000?" · about "+(Math.round(t[4]/(t[4]>=1e5?1e4:t[4]>=1e4?1e3:100))*(t[4]>=1e5?1e4:t[4]>=1e4?1e3:100)).toLocaleString()+" people":""),2);
  const to=drvTo();if(to){const e=drvEta(L);add("DEST",to.lat,to.lon,"dest",to.n+" · destination"+(e&&e.sec!=null?" · "+hm(e.sec)+" to go":""),3,true)}}
/* ---- drive badges (same embroidered unit-patch style). Flight badges are hidden in Drive mode. ---- */
function drvDays(b){const p=b.pts||[];if(p.length<2)return {};let raw=0;for(let i=1;i<p.length;i++)raw+=dist({lat:p[i-1][0],lon:p[i-1][1]},{lat:p[i][0],lon:p[i][1]});const k=raw>0?(b.d||raw)/raw:1,o={};
  for(let i=1;i<p.length;i++){const dk=new Date(p[i][3]).toDateString();o[dk]=(o[dk]||0)+k*dist({lat:p[i-1][0],lon:p[i-1][1]},{lat:p[i][0],lon:p[i][1]})}return o}
function drvNight(b){const p=b.pts||[];let ms=0;for(let i=1;i<p.length;i++){const dt=p[i][3]-p[i-1][3];if(dt<=0||dt>600000)continue;const v=dist({lat:p[i-1][0],lon:p[i-1][1]},{lat:p[i][0],lon:p[i][1]})/(dt/1000);if(v<DRV_MOVE)continue;if(sunElAt(p[i][3],p[i][0],p[i][1])<-6)ms+=dt}return ms}
const nbW=b=>(b.pts||[]).some(q=>q[1]<124.3&&q[1]>121&&q[0]<-30.5&&q[0]>-33.5),nbE=b=>(b.pts||[]).some(q=>q[1]>133.4&&q[1]<136&&q[0]<-30.5&&q[0]>-33.5);
const DBADGES=[["dstates","State lines","Cross a state or territory border on a drive",r=>[r.D.some(b=>(b.st||[]).length>=2)?1:0,1]],
 ["d1000","1,000 km day","Drive 1,000 km in one day",r=>[Math.round(r.bestDay/1000),1000]],
 ["nullarbor","Nullarbor crossing","Drive across the Nullarbor on the Eyre Highway (Norseman to Ceduna, or back) within a week",r=>[r.nb?1:0,1]],
 ["dnight","Night drive","Drive for an hour after dark",r=>[Math.min(60,Math.round(r.bestNight/60000)),60]],
 ["spot","Spotter","Spot an aircraft in AR",r=>[Math.min(1,SPC.caught.length),1]],["diary","Diarist","Write 5 diary notes on drives",r=>[r.D.reduce((s,b)=>s+(b.dy||[]).length,0),5]]];
function drvStatsCalc(){const D=BOOK.filter(b=>b&&b.drv&&!b.demo);let km=0,secs=0,bestDay=0,bestNight=0,smooth=null;const days={},sts=new Set();
  for(const b of D){km+=b.d||0;if(b.ev&&b.ev.off&&b.ev.on)secs+=(b.ev.on-b.ev.off)/1000;for(const [k,v] of Object.entries(drvDays(b)))days[k]=(days[k]||0)+v;bestNight=Math.max(bestNight,drvNight(b));(b.st||[]).forEach(x=>sts.add(x));if(b.rs&&(!smooth||b.rs.score>smooth.rs.score))smooth=b}
  for(const v of Object.values(days))bestDay=Math.max(bestDay,v);
  const nb=D.some(w=>nbW(w)&&D.some(e=>nbE(e)&&Math.abs(e.date-w.date)<7*86400e3));
  const r={D,n:D.length,km,secs,bestDay,bestNight,nb,sts,smooth};r.badges=DBADGES.map(([k,n,d,f])=>{let [v,g]=[0,1];try{[v,g]=f(r)}catch(e){}return {k,n,d,v:Math.min(v,g),g,got:v>=g}});return r}
function drvStatsRender(){const el=$("bdgOut"),kv=$("totKv");if(!el)return;const r=drvStatsCalc();
  kv.innerHTML=[["Drives",r.n],["Distance",Math.round(fDst(r.km)).toLocaleString()+" "+S.dst],["Drive time",hm(r.secs)],["Best day",Math.round(fDst(r.bestDay)).toLocaleString()+" "+S.dst],["States",r.sts.size?[...r.sts].join(" "):"—"],["Smoothest ride",r.smooth?r.smooth.rs.score+"/100 "+r.smooth.from+"–"+r.smooth.to:"—"]].map(x=>`<div>${esc(x[0])}<b>${esc(x[1])}</b></div>`).join("");
  const got=r.badges.filter(b=>b.got).length;$("bdgHead").textContent="Drive badges "+got+" of "+r.badges.length;
  el.innerHTML=r.badges.map((b,i)=>`<button type="button" class="bdg ptc${b.got?" got":""}" data-b="${i}" aria-label="${esc(b.n)}: ${esc(b.d)}${b.got?" (earned)":" (locked)"}"><img src="patches/${esc(b.k)}.svg" alt="" width="60" height="70" draggable="false"><b>${esc(b.n)}</b><small>${b.got?"EARNED":bdgProg(b)}</small><i class="pbar"><i data-w="${Math.round(100*Math.min(1,b.v/b.g))}"></i></i></button>`).join("");PT.bdg=r.badges;PT.list=DBADGES}
{const _sr=statsRender;statsRender=function(){if(DRV.on)return drvStatsRender();PT.list=BADGES;return _sr.apply(this,arguments)}}
/* ---- glance view in Drive mode: heading, altitude, speed, distance/ETA to the destination ---- */
{const _gd=glData;glData=function(){const g=_gd.apply(this,arguments);if(!DRV.on)return g;const L=last,to=drvTo(),e=to&&L?drvEta(L):null;
  return Object.assign(g,{eta:e&&e.sec!=null?e.eta:"--:--",rem:e&&e.sec!=null?remS(e.sec):"--",dtg:L&&to?Math.round(fDst(dist(L,to))):null,to:to?to.n:"",hdg:L&&L.trk!=null?String(Math.round(L.trk)%360).padStart(3,"0"):"---",card:L&&L.trk!=null?card(L.trk):"",ph:"DRIVE \u00b7 "+(PHN[PH.p]||"")})}}
{const _gr=glRender;glRender=function(){_gr.apply(this,arguments);const c=document.querySelectorAll("#glOv .gll");if(c.length<4)return;
  if(!DRV.on){["ETA","ALTITUDE","GROUNDSPEED","DISTANCE"].forEach((t,i)=>setTx(c[i],t));return}const g=glData();
  setTx(c[0],"HEADING");setTx($("glEta"),g.hdg+"\u00b0");setTx($("glEtaS"),g.card||"");setTx(c[1],"ALTITUDE");setTx(c[2],"SPEED");setTx(c[3],g.to?"TO GO":"DISTANCE");
  setTx($("glDtgU"),g.to?(S.dst==="nm"?"NM":"KM")+" \u00b7 ETA "+g.eta+" (est.)":"SET A DESTINATION ON THE HUD PAGE")}}
/* ---- aircraft tracking from the ground works in Drive mode, parked or moving (passengers only) ---- */
setInterval(()=>{if(!DRV.on)return;const n=$("drvTkNote");if(n)setTx(n,"Drive mode: aircraft tracking works parked or on the move. For passengers only.")},3000);
/* periodic */
setInterval(()=>{if(!DRV.on||document.hidden)return;try{drvTripRender()}catch(e){}try{rsRender()}catch(e){}if(DRV.trip)drvSave()},5000);
{const r=$("drvRest");if(r)r.addEventListener("click",()=>{r.style.display="none"})}
{const _ui=shUI;shUI=function(){_ui.apply(this,arguments);try{drvPrivUI()}catch(e){}}}
drvApply();drvPrivUI();
window.cpDrive={state:()=>({on:!!DRV.on,pax:DRV.pax,paxNeeded:paxNeeded(),guard:DSW.guard,sw:$("drvSw").dataset.st,p:PH.p,start:!!DRV.start,starts:(DRV.starts||[]).length,priv:(DRV.priv||[]).length,outAt:DRV.outAt,why:DRV.why||"",dest:DRV.dest,trip:DRV.trip?{mv:DRV.trip.mv,sinceRest:DRV.trip.sinceRest,nextRest:DRV.trip.nextRest,rs:rsScore(DRV.trip.rs)}:null,units:{spd:S.spd,alt:S.alt,dst:S.dst},feat:DRV_FEAT.map(k=>FEAT[k])}),
  set:(on)=>drvSet(on),find:drvFind,eta:()=>drvEta(last),privOk:()=>drvPrivOk(last),zones:()=>drvZones().length,stats:()=>{const r=drvStatsCalc();return {n:r.n,bestDay:Math.round(r.bestDay),bestNight:r.bestNight,nb:r.nb,got:r.badges.filter(b=>b.got).map(b=>b.k)}},
  rs:rsScore,ar:()=>{const o=[];if(last)drvArTargets(last,(n,lat,lon,kind,note)=>o.push({n,kind,note}));return o},towns:()=>TOWNS.length,
  setPax:ms=>{DRV.pax=ms;drvSave()},paxTick:()=>{if(DRV.on&&paxNeeded()&&$("drvPax").style.display==="none")paxAsk(true,null);return $("drvPax").style.display!=="none"},age:ms=>{if(DRV.outAt)DRV.outAt-=ms;return DRV.outAt},tick:()=>{try{drvTripRender();rsRender()}catch(e){}},rest:ms=>drvRestShow(ms),
  fakeTrip:o=>{if(DRV.trip)Object.assign(DRV.trip,o);if(o&&o.check){const T=DRV.trip;if(T&&T.sinceRest>=T.nextRest){T.nextRest+=DRV_REST_MS;drvRestShow(T.sinceRest)}}}};
/* End flight button acts as End drive in Drive mode; event times read as a drive */
{const _ef=endFlight;endFlight=function(skip){if(DRV.on&&PH.p==="drive"){if(!skip&&!confirm("End this drive now?\n\nIt's saved to your logbook."))return false;drvEnd(Date.now(),true);return true}return _ef.apply(this,arguments)}}
{const _eu=endBtnUpd;endBtnUpd=function(){_eu.apply(this,arguments);const b=$("endBtn");if(b)setTx(b,DRV.on?"End drive":"End flight")}}
{const _er=evRender;evRender=function(){_er.apply(this,arguments);if(!DRV.on)return;const e=PH.ev||{},f=t=>t?new Date(t).toTimeString().slice(0,5):"\u2014",rows=[];
  if(e.off)rows.push(["Drive start",f(e.off)]);if(e.on)rows.push(["Parked",f(e.on)]);if(e.off)rows.push(["Drive time",hm(((e.on||Date.now())-e.off)/1000)+(e.on?"":" so far")]);
  $("evList").innerHTML=rows.length?rows.map(r=>`<li><b>${r[0]}</b><span>${r[1]}</span></li>`).join(""):'<li><span>Drive times fill in automatically when you set off.</span></li>'}}
if(!DRV.on&&PH.p==="drive"){PH.p="parked";savePH()}
/* the demo flight is a flight: not available in Drive mode (it would be logged as a drive) */
{const _db=$("demoBtn").onclick;$("demoBtn").onclick=function(){if(DRV.on&&!demo){drvMsg("Demo flight works in flight mode. Flip the DRIVE switch down first.");try{$("drvTile").scrollIntoView({block:"start",behavior:"smooth"})}catch(e){}return}return _db.apply(this,arguments)}}
}
