/* Cabin Panel v26: optional "Alien game" layer for the AR window view, and the ground "gunship" view.
   Lazy-loaded only when the game is switched on. three.js r170 (MIT) is shipped locally: no CDN, no network.
   All models are original low-poly shapes built from primitives here (no copied designs, no downloaded meshes).
   Arcade and non-gory: hits flash and vanish. Entertainment only: game targets are imaginary and always tagged ALIEN. */
import * as THREE from "./three.module.min.js";

/* ---------- tiny geometry merge: one mesh (one draw call) per model per material ---------- */
function part(geo,col,m){const g=geo.index?geo.toNonIndexed():geo.clone();if(m)g.applyMatrix4(m);const c=new THREE.Color(col),n=g.attributes.position.count,a=new Float32Array(n*3);
  for(let i=0;i<n;i++){a[i*3]=c.r;a[i*3+1]=c.g;a[i*3+2]=c.b}g.setAttribute("color",new THREE.BufferAttribute(a,3));for(const k of Object.keys(g.attributes))if(k!=="position"&&k!=="color")g.deleteAttribute(k);return g}
function merge(parts){let n=0;for(const p of parts)n+=p.attributes.position.count;const pos=new Float32Array(n*3),col=new Float32Array(n*3);let o=0;
  for(const p of parts){pos.set(p.attributes.position.array,o*3);col.set(p.attributes.color.array,o*3);o+=p.attributes.position.count}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.computeVertexNormals();g.computeBoundingSphere();return g}
const M=(x=0,y=0,z=0,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(sx,sy,sz));
function wingGeo(pts,th){const s=new THREE.Shape();s.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))s.lineTo(p[0],p[1]);s.closePath();
  const g=new THREE.ExtrudeGeometry(s,{depth:th,bevelEnabled:false});g.translate(0,0,-th/2);g.rotateX(-Math.PI/2);return g}
/* every model: nose toward +X, top toward +Y, about 1 unit across. Returns {body, glow} geometries. */
const HULL="#5d6872",DARK="#2b3138",PALE="#9aa7b1",GLOW="#59ff9c",EYE="#ff4040",AMB="#ffb347";
function mkFighter(){/* "Wasp": dart fuselage, forward-swept crescent wings, twin glowing pods */
  const b=[],g=[];
  b.push(part(new THREE.ConeGeometry(0.11,0.9,5),HULL,M(0.05,0,0,0,0,-Math.PI/2)));
  b.push(part(wingGeo([[-0.25,0],[0.05,0.5],[-0.05,0.52],[-0.42,0.08]],0.03),PALE));
  b.push(part(wingGeo([[-0.25,0],[0.05,-0.5],[-0.05,-0.52],[-0.42,-0.08]],0.03),PALE));
  b.push(part(wingGeo([[-0.3,0],[-0.42,0],[-0.46,0.0]],0.2),DARK,M(0,0.06,0)));
  b.push(part(new THREE.BoxGeometry(0.16,0.12,0.03),DARK,M(-0.33,0.07,0,0,0,0.4)));
  for(const z of [0.17,-0.17])g.push(part(new THREE.CylinderGeometry(0.045,0.06,0.22,6),GLOW,M(-0.32,0,z,0,0,Math.PI/2)));
  g.push(part(new THREE.OctahedronGeometry(0.05,0),EYE,M(0.3,0.05,0)));return {body:merge(b),glow:merge(g)}}
function mkRaider(){/* "Manta": flat ray with a dorsal ridge and an under-glow strip */
  const b=[],g=[];
  b.push(part(wingGeo([[0.5,0],[0.15,0.18],[-0.1,0.5],[-0.3,0.42],[-0.42,0.12],[-0.5,0],[-0.42,-0.12],[-0.3,-0.42],[-0.1,-0.5],[0.15,-0.18]],0.07),HULL));
  b.push(part(wingGeo([[0.3,0],[-0.35,0.06],[-0.4,0],[-0.35,-0.06]],0.12),DARK,M(0,0.06,0)));
  b.push(part(new THREE.BoxGeometry(0.03,0.16,0.02),PALE,M(-0.3,0.13,0,0,0,-0.5)));
  g.push(part(new THREE.BoxGeometry(0.5,0.02,0.06),GLOW,M(-0.05,-0.045,0)));
  for(const z of [0.3,-0.3])g.push(part(new THREE.OctahedronGeometry(0.035,0),AMB,M(-0.2,0,z)));
  g.push(part(new THREE.OctahedronGeometry(0.04,0),EYE,M(0.38,0.03,0)));return {body:merge(b),glow:merge(g)}}
function mkMother(){/* city-sized disc: tiered hull, ring of lights, glowing under-core */
  const b=[],g=[];
  b.push(part(new THREE.CylinderGeometry(0.5,0.46,0.07,20),HULL));
  b.push(part(new THREE.CylinderGeometry(0.3,0.42,0.06,20),DARK,M(0,0.06,0)));
  b.push(part(new THREE.CylinderGeometry(0.12,0.24,0.08,10),PALE,M(0,0.12,0)));
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;b.push(part(new THREE.BoxGeometry(0.08,0.05,0.04),DARK,M(Math.cos(a)*0.36,0.1,Math.sin(a)*0.36,0,-a,0)))}
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2;g.push(part(new THREE.BoxGeometry(0.025,0.015,0.025),i%4?AMB:GLOW,M(Math.cos(a)*0.49,0,Math.sin(a)*0.49)))}
  g.push(part(new THREE.CylinderGeometry(0.1,0.16,0.03,10),"#ff6a3d",M(0,-0.045,0)));return {body:merge(b),glow:merge(g)}}
function mkBase(){/* hex pad, faceted dome, three pylons */
  const b=[],g=[];
  b.push(part(new THREE.CylinderGeometry(0.5,0.52,0.06,6),DARK));
  b.push(part(new THREE.SphereGeometry(0.26,7,4,0,Math.PI*2,0,Math.PI/2),PALE,M(0,0.03,0)));
  for(let i=0;i<3;i++){const a=i/3*Math.PI*2+0.5;b.push(part(new THREE.ConeGeometry(0.05,0.36,4),HULL,M(Math.cos(a)*0.38,0.2,Math.sin(a)*0.38)));
    g.push(part(new THREE.OctahedronGeometry(0.03,0),GLOW,M(Math.cos(a)*0.38,0.4,Math.sin(a)*0.38)))}
  g.push(part(new THREE.CylinderGeometry(0.06,0.06,0.02,8),EYE,M(0,0.3,0)));return {body:merge(b),glow:merge(g)}}
function mkTroop(){/* tripod drone walker (robotic, no people) */
  const b=[],g=[];
  b.push(part(new THREE.IcosahedronGeometry(0.22,0),HULL,M(0,0.55,0,0,0,0,1,0.7,1)));
  for(let i=0;i<3;i++){const a=i/3*Math.PI*2;b.push(part(new THREE.BoxGeometry(0.05,0.6,0.05),DARK,M(Math.cos(a)*0.18,0.25,Math.sin(a)*0.18,Math.sin(a)*0.35,0,-Math.cos(a)*0.35)))}
  g.push(part(new THREE.OctahedronGeometry(0.06,0),EYE,M(0.18,0.58,0)));return {body:merge(b),glow:merge(g)}}
const MK={ftr:mkFighter,rdr:mkRaider,msh:mkMother,base:mkBase,trp:mkTroop};
let GEO=null;function geos(){if(!GEO){GEO={};for(const k in MK)GEO[k]=MK[k]()}return GEO}
export function stats(){const g=geos(),o={};for(const k in g){const t=(g[k].body.attributes.position.count+g[k].glow.attributes.position.count)/3;o[k]=Math.round(t)}return o}

/* ================= AR overlay: models drawn at the 2D positions the app projects ================= */
export function createAR(cv){
  const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:"low-power",premultipliedAlpha:true});r.setClearColor(0,0);
  const sc=new THREE.Scene(),cam=new THREE.OrthographicCamera(0,1,0,-1,-2000,2000);cam.position.z=1000;
  sc.add(new THREE.HemisphereLight("#cfe3ff","#2a2a22",1.6));const sun=new THREE.DirectionalLight("#ffffff",2.2);sun.position.set(-0.5,1,0.8);sc.add(sun);
  const bodyM=new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true,transparent:true}),glowM=new THREE.MeshBasicMaterial({vertexColors:true,transparent:true});
  const pool=new Map();let W=0,H=0,dpr=1,blank=true;
  function obj(id,type){let o=pool.get(id);if(o)return o;const g=geos()[type]||geos().ftr;o=new THREE.Group();
    const bm=bodyM.clone(),gm=glowM.clone();o.add(new THREE.Mesh(g.body,bm));o.add(new THREE.Mesh(g.glow,gm));o.userData={bm,gm,type};sc.add(o);pool.set(id,o);return o}
  return {
    size(w,h,d){d=Math.min(2,d||1);if(w===W&&h===H&&d===dpr)return;W=w;H=h;dpr=d;r.setPixelRatio(d);r.setSize(w,h,false);cam.left=0;cam.right=w;cam.top=0;cam.bottom=-h;cam.updateProjectionMatrix()},
    /* list: [{id,type,x,y,s(px),hd(rad, screen heading),bank,fade(0..1)}] */
    render(list,t){const seen=new Set();
      for(const q of list){const o=obj(q.id,q.type);seen.add(q.id);o.visible=true;o.position.set(q.x,-q.y,0);const s=q.s;o.scale.set(s,s,s);
        if(q.type==="msh")o.rotation.set(0.35,t*0.15,0.08*Math.sin(t*0.3));
        else if(q.type==="base"||q.type==="trp")o.rotation.set(0.9,q.hd||0,0);
        else{o.rotation.set(0,0,0);o.rotateZ(-(q.hd||0));o.rotateX(0.55+(q.bank||0));o.rotateY(0.2*Math.sin(t*1.7+q.id))}
        const f=q.fade==null?1:q.fade;o.userData.bm.opacity=f;o.userData.gm.opacity=f*(0.75+0.25*Math.sin(t*9+q.id))}
      for(const [id,o] of pool)if(!seen.has(id)){if(list.length<pool.size&&pool.size>24){sc.remove(o);o.userData.bm.dispose();o.userData.gm.dispose();pool.delete(id)}else o.visible=false}
      if(!list.length){if(!blank){r.clear();blank=true}return {calls:0,tris:0}}
      blank=false;r.render(sc,cam);return {calls:r.info.render.calls,tris:r.info.render.triangles}},
    clear(){r.clear();blank=true},
    dispose(){for(const o of pool.values()){o.userData.bm.dispose();o.userData.gm.dispose()}pool.clear();r.dispose()}}}

/* ================= Gunship view: ground-stabilised thermal camera in a left-hand orbit ================= */
function noise(x,y){const s=Math.sin(x*12.9898+y*78.233)*43758.5453;return s-Math.floor(s)}
function vnoise(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  const a=noise(xi,yi),b=noise(xi+1,yi),c=noise(xi,yi+1),d=noise(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
export function createGunship(cv,hooks){
  hooks=hooks||{};const r=new THREE.WebGLRenderer({canvas:cv,antialias:false,powerPreference:"low-power"});
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(28,1,5,20000);sc.fog=new THREE.Fog("#1a1d1f",3500,9000);
  sc.add(new THREE.HemisphereLight("#ffffff","#555555",1.4));const sun=new THREE.DirectionalLight("#ffffff",1.2);sun.position.set(1,2,1);sc.add(sun);
  /* terrain: 64 x 64, heights and thermal tone from value noise; roads are cooler strips */
  const N=64,SZ=7000,tg=new THREE.PlaneGeometry(SZ,SZ,N,N);tg.rotateX(-Math.PI/2);const p=tg.attributes.position,cols=new Float32Array(p.count*3);
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),h=vnoise(x/900,z/900)*60+vnoise(x/260,z/260)*18;p.setY(i,h);let t=0.18+0.16*vnoise(x/300+7,z/300)+0.05*noise(x,z);
    if(Math.abs((x*0.8+z*0.6)%1700)<30||Math.abs((z-x*0.3)%2300)<25)t=0.08;cols[i*3]=cols[i*3+1]=cols[i*3+2]=t}
  tg.setAttribute("color",new THREE.BufferAttribute(cols,3));tg.computeVertexNormals();
  const ter=new THREE.Mesh(tg,new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true}));sc.add(ter);
  const hAt=(x,z)=>vnoise(x/900,z/900)*60+vnoise(x/260,z/260)*18;
  const hotM=new THREE.MeshBasicMaterial({vertexColors:true}),warmM=new THREE.MeshLambertMaterial({vertexColors:true,flatShading:true});
  const thermal=g=>{const c=g.attributes.color.array,o=new Float32Array(c.length);for(let i=0;i<c.length;i+=3){const l=0.55+0.45*(0.3*c[i]+0.59*c[i+1]+0.11*c[i+2]);o[i]=o[i+1]=o[i+2]=Math.min(1,l)}const n=g.clone();n.setAttribute("color",new THREE.BufferAttribute(o,3));return n};
  const G=geos(),TG={};for(const k of ["base","trp"])TG[k]={body:thermal(G[k].body),glow:thermal(G[k].glow)};
  const ents=[],fx=[],shells=[];let orbit=0,aim=new THREE.Vector3(0,0,0),zoom=0,pol="wht",raf=0,on=false,lt=0,seq=1,fps=60,lastR=0;
  const flashGeo=new THREE.IcosahedronGeometry(1,1);
  function add(type,x,z,hp){const g=TG[type],o=new THREE.Group();o.add(new THREE.Mesh(g.body,warmM));o.add(new THREE.Mesh(g.glow,hotM));
    const s=type==="base"?90:14;o.scale.set(s,s,s);o.position.set(x,hAt(x,z),z);sc.add(o);const e={id:seq++,type,o,hp,x0:x,z0:z,ph:Math.random()*6,alive:true,s};ents.push(e);return e}
  function load(wave){for(const e of ents)sc.remove(e.o);ents.length=0;const nb=Math.max(1,wave.bases||1),nt=wave.troops||6;
    for(let i=0;i<nb;i++){const a=i/nb*Math.PI*2+0.4,bx=Math.cos(a)*(nb>1?420:0),bz=Math.sin(a)*(nb>1?420:0);add("base",bx,bz,3);
      for(let j=0;j<Math.ceil(nt/nb);j++){const b=Math.random()*Math.PI*2,d=110+Math.random()*120;add("trp",bx+Math.cos(b)*d,bz+Math.sin(b)*d,1)}}
    aim.set(ents[0].o.position.x,0,ents[0].o.position.z)}
  function boom(x,y,z,big){const m=new THREE.Mesh(flashGeo,new THREE.MeshBasicMaterial({color:"#ffffff",transparent:true,opacity:1,depthWrite:false}));m.position.set(x,y+4,z);sc.add(m);fx.push({m,t:0,big:!!big})}
  function hit(x,z,rad,dmg){let kills=[];for(const e of ents){if(!e.alive)continue;const d=Math.hypot(e.o.position.x-x,e.o.position.z-z);if(d<=rad+(e.type==="base"?40:6)){e.hp-=dmg;if(e.hp<=0){e.alive=false;kills.push(e);boom(e.o.position.x,e.o.position.y,e.o.position.z,e.type==="base")}}}
    for(const e of kills){sc.remove(e.o);try{hooks.kill&&hooks.kill(e.type)}catch(_){}}if(!ents.some(e=>e.alive))try{hooks.clear&&hooks.clear()}catch(_){}return kills.length}
  const W={105:{rdy:0,rl:2.6,n:12,tof:1.3,rad:45,dmg:3,disp:6},25:{rdy:0,rl:0.09,n:300,tof:0.8,rad:9,dmg:1,disp:9}};
  function fire(k){const w=W[k];if(!w||!on)return false;const now=performance.now()/1000;if(now<w.rdy||w.n<=0)return false;w.rdy=now+w.rl;
    const shots=k==="25"?5:1;for(let i=0;i<shots&&w.n>0;i++){w.n--;const a=Math.random()*6.28,d=Math.random()*w.disp;shells.push({x:aim.x+Math.cos(a)*d,z:aim.z+Math.sin(a)*d,t:w.tof+i*0.06,k})}
    try{hooks.fire&&hooks.fire(k,w.n)}catch(_){}return true}
  function step(dt,t){orbit+=dt*0.06;const R=2600,AL=1900,c=aim;cam.position.set(c.x+Math.cos(orbit)*R,AL,c.z+Math.sin(orbit)*R);cam.lookAt(c.x,hAt(c.x,c.z),c.z);
    cam.fov=zoom?9:28;cam.updateProjectionMatrix();
    for(const e of ents){if(!e.alive)continue;if(e.type==="trp"){e.ph+=dt*0.25;const x=e.x0+Math.cos(e.ph)*40,z=e.z0+Math.sin(e.ph*1.3)*40;e.o.position.set(x,hAt(x,z),z);e.o.rotation.y=-e.ph}}
    for(let i=shells.length-1;i>=0;i--){const s=shells[i];s.t-=dt;if(s.t<=0){shells.splice(i,1);const w=W[s.k];boom(s.x,hAt(s.x,s.z),s.z,s.k==="105");hit(s.x,s.z,w.rad,w.dmg)}}
    for(let i=fx.length-1;i>=0;i--){const f=fx[i];f.t+=dt;const k=f.t/(f.big?1.2:0.5),s=(f.big?70:14)*(0.3+k*1.6);f.m.scale.set(s,s,s);f.m.material.opacity=Math.max(0,1-k);if(k>=1){sc.remove(f.m);f.m.material.dispose();fx.splice(i,1)}}}
  function frame(ts){raf=0;if(!on)return;if(document.hidden){lt=0;return}const t=ts/1000,dt=lt?Math.min(0.1,t-lt):0;
    if(fps<60&&lastR&&ts-lastR<1000/fps-2){raf=requestAnimationFrame(frame);return}lastR=ts;lt=t;
    step(dt,t);const w=cv.clientWidth,h=cv.clientHeight;if(w&&h){r.setPixelRatio(Math.min(1.5,window.devicePixelRatio||1));r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
    sc.background=new THREE.Color(pol==="wht"?"#141617":"#d6d8d8");ter.material.color.set(pol==="wht"?"#ffffff":"#ffffff");
    r.render(sc,cam);try{hooks.hud&&hooks.hud(api.view())}catch(_){}raf=requestAnimationFrame(frame)}
  function vis(){if(on&&!document.hidden&&!raf){lt=0;raf=requestAnimationFrame(frame)}}
  document.addEventListener("visibilitychange",vis);
  const v3=new THREE.Vector3();
  const api={
    open(wave){load(wave||{});on=true;W[105].n=12;W[25].n=300;lt=0;if(!raf)raf=requestAnimationFrame(frame)},
    close(){on=false;if(raf){cancelAnimationFrame(raf);raf=0}},
    slew(dx,dy){/* screen px -> metres on the ground, ground-stabilised */const k=(zoom?0.35:1.1);const f=new THREE.Vector3();cam.getWorldDirection(f);f.y=0;f.normalize();const rt=new THREE.Vector3(-f.z,0,f.x);
      aim.addScaledVector(rt,-dx*k).addScaledVector(f,dy*k);aim.x=Math.max(-3000,Math.min(3000,aim.x));aim.z=Math.max(-3000,Math.min(3000,aim.z))},
    aimAt(i){const e=ents.filter(q=>q.alive)[i||0];if(e)aim.set(e.o.position.x,0,e.o.position.z);return !!e},
    fire,zoom(z){zoom=z==null?(zoom?0:1):z;return zoom},pol(p){pol=p||(pol==="wht"?"bht":"wht");
      const inv=pol==="bht";for(const m of [hotM])m.color.set(inv?"#222222":"#ffffff");return pol},
    fps(n){fps=n||60},
    view(){const w=cv.clientWidth,h=cv.clientHeight,out=[];for(const e of ents){if(!e.alive)continue;v3.copy(e.o.position);v3.y+=e.s*0.4;v3.project(cam);if(v3.z>1)continue;
        out.push({id:e.id,type:e.type,x:(v3.x+1)/2*w,y:(1-v3.y)/2*h,s:Math.max(10,e.s*h/(2*cam.position.distanceTo(e.o.position)*Math.tan(cam.fov*Math.PI/360))),hp:e.hp})}
      return {w,h,ents:out,left:ents.filter(e=>e.alive).length,ammo:{105:W[105].n,25:W[25].n},rdy105:performance.now()/1000>=W[105].rdy,zoom,pol,shells:shells.length,calls:r.info.render.calls,tris:r.info.render.triangles}},
    state(){return {on,left:ents.filter(e=>e.alive).length,ammo:{105:W[105].n,25:W[25].n},zoom,pol,calls:r.info.render.calls,tris:r.info.render.triangles}},
    dispose(){api.close();document.removeEventListener("visibilitychange",vis);r.dispose()}};
  return api}
