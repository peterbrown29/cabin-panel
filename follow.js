/* Cabin Panel family view: a light standalone page for people who don't have the app.
   Reads the follow-along record from Cabin Panel's server (GET only, no login, no cookies). The share id stays in the
   URL #fragment so it isn't sent to the web host. Nothing is stored except the last view in this tab. */
"use strict";
(()=>{
const API="https://cabin-adsb.cabinpanel-pb.workers.dev/share/",POLL=30000,R=6371008.8,NM=1852,FT=3.28084;
const $=id=>document.getElementById(id),rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
const st={id:null,d:null,err:"",at:0,ap:null,tiles:{},busy:false,t:0,dest:null};
function idFrom(s){s=String(s||"");const m=s.match(/[#?&](?:id|follow)=([A-Za-z0-9_-]{22})(?![A-Za-z0-9_-])/)||s.match(/^\s*([A-Za-z0-9_-]{22})\s*$/);return m?m[1]:null}
function dist(a,b){const p1=rad(a.lat),p2=rad(b.lat),dp=p2-p1,dl=rad(b.lon-a.lon),h=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(h)))}
async function airports(){if(st.ap)return st.ap;try{const r=await fetch("rwy.json",{cache:"force-cache"});const j=await r.json();st.ap={};for(const a of j)if(a&&a[0])st.ap[a[0]]={c:a[0],lat:a[2],lon:a[3]}}catch(e){st.ap={}}return st.ap}
function hhmm(ms){try{return new Date(ms).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}catch(e){return new Date(ms).toTimeString().slice(0,5)}}
function ago(ms){const s=Math.max(0,Math.round((Date.now()-ms)/1000));return s<90?s+" s ago":Math.round(s/60)+" min ago"}
function landed(d){const p=d.pts||[];if(!p.length)return false;const l=p[p.length-1],flew=p.some(q=>q[4]!=null&&q[4]>70);
  const near=st.dest&&dist({lat:l[1],lon:l[2]},st.dest)<15000;return flew&&l[4]!=null&&l[4]<40&&(near||!st.dest)}
async function poll(){if(!st.id||st.busy)return;st.busy=true;
  try{const r=await fetch(API+st.id,{cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer"});
    if(r.status===404){st.d=null;st.err="This flight isn't being shared any more (or the link is wrong). Shares end after 24 hours.";}
    else if(r.status===429){st.err="Busy, trying again shortly…"}
    else if(!r.ok){st.err="Couldn't load ("+r.status+"). Trying again…"}
    else{st.d=await r.json();st.err="";st.at=Date.now();const ap=await airports();st.dest=st.d.to&&ap[st.d.to]||null;st.orig=st.d.fr&&ap[st.d.fr]||null}}
  catch(e){st.err="No connection. Trying again…"}
  st.busy=false;draw();clearTimeout(st.t);st.t=setTimeout(poll,document.hidden?POLL*2:POLL)}
function txt(id,v){const e=$(id);if(e.textContent!==v)e.textContent=v}
function draw(){const d=st.d;
  if(d){const who=d.n?d.n+"'s flight":"Shared flight",rt=(d.fr||"?")+" → "+(d.to||"?");txt("title",who);txt("sub",rt+" · Cabin Panel");document.title=who+" "+rt;
    const p=d.pts||[],l=p[p.length-1];const isL=landed(d);$("landed").hidden=!isL;if(isL)txt("landed","✈ Landed"+(d.to?" at "+d.to:"")+" · "+hhmm(l[0]));
    txt("eta",isL?"Landed":d.eta?hhmm(d.eta):"--:--");txt("alt",l&&l[3]!=null?Math.round(l[3]*FT/100)*100+" ft":"---");txt("spd",l&&l[4]!=null?Math.round(l[4]*1.94384)+" kt":"---");
    txt("dtg",l&&st.dest?Math.round(dist({lat:l[1],lon:l[2]},st.dest)/1000)+" km":"---");
    txt("st",(d.st?"Sharing has ended. ":"")+(l?"Last position "+ago(l[0])+(Date.now()-l[0]>10*60000&&!isL&&!d.st?" (the phone may be offline; it catches up when it reconnects)":""):"Waiting for the first position…")+(st.err?" · "+st.err:""))}
  else txt("st",st.err||"Loading…");
  map()}
/* web-mercator map with EOX imagery tiles, the shared track, the plane and the airports */
function wm(lat,lon,z){const s=256*2**z,x=(lon+180)/360*s,sl=Math.sin(rad(Math.max(-85,Math.min(85,lat))));return [x,(0.5-Math.log((1+sl)/(1-sl))/(4*Math.PI))*s]}
function tile(z,x,y,cb){const k=z+"/"+x+"/"+y;let t=st.tiles[k];if(!t){t=st.tiles[k]=new Image();t.onload=cb;t.src="https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/"+z+"/"+y+"/"+x+".jpg"}return t.complete&&t.naturalWidth?t:null}
function map(){const cv=$("map"),dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;cv.width=W*dpr;cv.height=H*dpr;const g=cv.getContext("2d");g.setTransform(dpr,0,0,dpr,0,0);
  g.fillStyle="#0a2440";g.fillRect(0,0,W,H);const d=st.d,P=(d&&d.pts||[]).map(q=>({lat:q[1],lon:q[2],trk:q[5]}));const pts=P.slice();if(st.dest)pts.push(st.dest);if(st.orig)pts.push(st.orig);
  if(!pts.length){g.fillStyle="#8fb3d9";g.font="14px system-ui";g.textAlign="center";g.fillText(st.id?"Waiting for position…":"No flight selected",W/2,H/2);return}
  let la0=90,la1=-90,lo0=180,lo1=-180;for(const p of pts){la0=Math.min(la0,p.lat);la1=Math.max(la1,p.lat);lo0=Math.min(lo0,p.lon);lo1=Math.max(lo1,p.lon)}
  let z=10;for(;z>2;z--){const a=wm(la1,lo0,z),b=wm(la0,lo1,z);if(b[0]-a[0]<W*0.8&&b[1]-a[1]<H*0.8)break}
  const c=wm((la0+la1)/2,(lo0+lo1)/2,z),ox=c[0]-W/2,oy=c[1]-H/2,n=2**z,redraw=()=>{clearTimeout(st.rd);st.rd=setTimeout(map,80)};
  for(let tx=Math.floor(ox/256);tx<=Math.floor((ox+W)/256);tx++)for(let ty=Math.max(0,Math.floor(oy/256));ty<=Math.min(n-1,Math.floor((oy+H)/256));ty++){const im=tile(z,((tx%n)+n)%n,ty,redraw);if(im)g.drawImage(im,tx*256-ox,ty*256-oy,256,256)}
  const xy=p=>{const q=wm(p.lat,p.lon,z);return [q[0]-ox,q[1]-oy]};
  if(st.orig&&st.dest){g.setLineDash([6,6]);g.strokeStyle="rgba(255,255,255,.6)";g.lineWidth=1.5;g.beginPath();for(let i=0;i<=40;i++){const f=i/40,p={lat:st.orig.lat+(st.dest.lat-st.orig.lat)*f,lon:st.orig.lon+(st.dest.lon-st.orig.lon)*f},q=xy(p);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])}g.stroke();g.setLineDash([])}
  if(P.length>1){g.strokeStyle="#ffd400";g.lineWidth=3;g.beginPath();P.forEach((p,i)=>{const q=xy(p);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.stroke()}
  for(const [a,lab] of [[st.orig,d&&d.fr],[st.dest,d&&d.to]])if(a){const q=xy(a);g.fillStyle="#fff";g.beginPath();g.arc(q[0],q[1],4,0,7);g.fill();g.font="bold 13px system-ui";g.fillStyle="#fff";g.strokeStyle="#000";g.lineWidth=3;g.strokeText(lab||"",q[0]+7,q[1]-6);g.fillText(lab||"",q[0]+7,q[1]-6)}
  if(P.length){const l=P[P.length-1],q=xy(l),tr=l.trk!=null?l.trk:(P.length>1?(deg(Math.atan2(P[P.length-1].lon-P[P.length-2].lon,P[P.length-1].lat-P[P.length-2].lat))+360)%360:0);
    g.save();g.translate(q[0],q[1]);g.rotate(rad(tr));g.fillStyle="#ffd400";g.strokeStyle="#000";g.lineWidth=1.5;g.beginPath();
    g.moveTo(0,-13);g.lineTo(3,-4);g.lineTo(12,2);g.lineTo(12,5);g.lineTo(3,2);g.lineTo(2,9);g.lineTo(5,12);g.lineTo(-5,12);g.lineTo(-2,9);g.lineTo(-3,2);g.lineTo(-12,5);g.lineTo(-12,2);g.lineTo(-3,-4);g.closePath();g.fill();g.stroke();g.restore()}}
function start(){st.id=idFrom(location.hash)||idFrom(location.search);$("ask").hidden=!!st.id;if(st.id)poll();else{txt("st","Open the link you were sent, or paste it below.");map()}}
$("go").addEventListener("click",()=>{const id=idFrom($("code").value);if(!id){txt("st","That doesn't look like a follow link.");return}location.hash="id="+id});
$("code").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("go").click()}});
window.addEventListener("hashchange",()=>{clearTimeout(st.t);st.d=null;start()});window.addEventListener("resize",map);
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&st.id&&Date.now()-st.at>POLL){clearTimeout(st.t);poll()}});
window.cpFollowPage={state:()=>({id:st.id,d:st.d,err:st.err,landed:st.d?landed(st.d):false,dest:st.dest}),poll};
start();
})();
