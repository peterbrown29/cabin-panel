/* Cabin Panel v23: synthetic 3D window view (offline). Lazy-loaded only when the 3D view is opened.
   three.js r170 (MIT, (c) 2010-2024 three.js authors) is shipped locally in three.module.min.js: no CDN.
   Terrain: Mapterhorn. Imagery: Sentinel-2 cloudless 2016 by EOX IT Services GmbH (CC BY 4.0). Night lights: NASA GIBS
   VIIRS Black Marble. Runways: Cabin Panel's rwy.json (OurAirports). Look shaders are Cabin Panel's own, written in the
   style of the NVG / FLIR / CRT looks of bilawalsidhu/gods-eye-view (MIT); no code or data from Google 3D Tiles, Cesium or Esri.
   Display only: reads the app's position through api.state(); never writes phases, logbook or GPS. */
import * as THREE from "./three.module.min.js";
import * as PK from "./svpack.js";
const R=6371008.8,CIRC=40075016.686,rad=d=>d*Math.PI/180;
const sm=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const lerp=(a,b,t)=>a+(b-a)*t;const wrap=d=>((d%360)+540)%360-180;
const C3=(r,g,b)=>new THREE.Color(r,g,b);
const PAL={hz:[C3(.02,.03,.06),C3(.95,.62,.42),C3(.78,.84,.92)],zen:[C3(.004,.008,.02),C3(.10,.14,.32),C3(.20,.36,.70)],sun:[C3(.05,.07,.12),C3(1,.62,.35),C3(1,.97,.9)]};
const FXI={none:0,nvg:1,flir:2,crt:3};
const CURVE=`vec3 wp=(modelMatrix*vec4(position,1.0)).xyz;vec2 dd=wp.xz-uCam.xz;wp.y-=dot(dd,dd)/(2.0*uR);`;
const NOISE=`float h1(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h1(i),h1(i+vec2(1,0)),f.x),mix(h1(i+vec2(0,1)),h1(i+1.),f.x),f.y);}`;

export function create(cv,api,opt={}){
  const low=!!opt.low;
  let ren;try{ren=new THREE.WebGLRenderer({canvas:cv,antialias:!low,alpha:false,powerPreference:"default",preserveDrawingBuffer:!!opt.preserve})}
  catch(e){throw new Error("This phone could not start 3D graphics (WebGL).")}
  ren.toneMapping=THREE.ACESFilmicToneMapping;ren.outputColorSpace=THREE.SRGBColorSpace;
  const ctl={fx:opt.fx||"none",view:opt.view||"fwd",fps:opt.fps||30,dpr:opt.dpr||1.5,wx:opt.wx!==false,asp:opt.asp!==false,closed:false};
  const N=low?128:192,TEX=low?1024:2048,EF=260000,EM=32000,EN=8000;
  const U={uCam:{value:new THREE.Vector3()},uR:{value:R},uSun:{value:new THREE.Vector3(0,1,0)},uSunC:{value:new THREE.Color()},uHz:{value:new THREE.Color()},uZen:{value:new THREE.Color()},
    uAmb:{value:new THREE.Color()},uVis:{value:60000},uNight:{value:0},uDusk:{value:0},uNvg:{value:0},uFlir:{value:0},uDark:{value:1},uOvc:{value:0},uSunVis:{value:1},
    tFar:{value:null},tMid:{value:null},tNear:{value:null},tNgt:{value:null},rFar:{value:new THREE.Vector4(0,0,-1,-1)},rMid:{value:new THREE.Vector4(0,0,-1,-1)},rNear:{value:new THREE.Vector4(0,0,-1,-1)},rNgt:{value:new THREE.Vector4(0,0,-1,-1)},
    uCov:{value:0},uT:{value:0},uCR:{value:150000},uFb:{value:new THREE.Color(.10,.085,.06)}};
  const blank=new THREE.DataTexture(new Uint8Array(4),1,1);blank.needsUpdate=true;for(const k of ["tFar","tMid","tNear","tNgt"])U[k].value=blank;
  const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(60,1,5,1.6e6);
  /* ---- world frame: Web Mercator scaled to metres at the build origin (x east, z south, y up) ---- */
  let O=null;const W=(mx,my)=>[(mx-O.mx)*O.k,(my-O.my)*O.k];const M=(x,z)=>[O.mx+x/O.k,O.my+z/O.k];
  const setO=(lat,lon)=>{const m=PK.merc(lat,lon);O={mx:m[0],my:m[1],lat,lon,k:CIRC*Math.cos(rad(lat))}};
  /* ---- terrain heights from stored Mapterhorn tiles (terrarium RGB) ---- */
  const DEM=new Map();const decoding=new Map();
  async function bmp(blob){try{return await createImageBitmap(blob,{premultiplyAlpha:"none",colorSpaceConversion:"none"})}catch(e){return await createImageBitmap(blob)}}
  const scratch=(w,h)=>{const c=typeof OffscreenCanvas!=="undefined"?new OffscreenCanvas(w,h):Object.assign(document.createElement("canvas"),{width:w,height:h});return c};
  async function demLoad(k,step){if(DEM.has(k))return DEM.get(k);if(decoding.has(k))return decoding.get(k);
    const p=(async()=>{const b=await PK.getTile(k);if(!b)return null;let im;try{im=await bmp(b)}catch(e){return null}
      const w=im.width,c=scratch(w,w),x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0);im.close&&im.close();const px=x.getImageData(0,0,w,w).data;
      const n=Math.floor(w/step),d=new Float32Array(n*n);for(let j=0;j<n;j++)for(let i=0;i<n;i++){const o=((j*step)*w+i*step)*4;d[j*n+i]=px[o]*256+px[o+1]+px[o+2]/256-32768}
      const t={n,d};DEM.set(k,t);return t})();
    decoding.set(k,p);try{return await p}finally{decoding.delete(k)}}
  function hAt(mx,my){for(const z of [11,8]){const n=2**z,tx=Math.floor(mx*n),ty=Math.floor(my*n),t=DEM.get("d/"+z+"/"+tx+"/"+ty);if(!t)continue;
      const fx=Math.max(0,Math.min(t.n-1.001,(mx*n-tx)*t.n-.5)),fy=Math.max(0,Math.min(t.n-1.001,(my*n-ty)*t.n-.5)),i=Math.floor(fx),j=Math.floor(fy),u=fx-i,v=fy-j,d=t.d,q=t.n;
      return (d[j*q+i]*(1-u)+d[j*q+i+1]*u)*(1-v)+(d[(j+1)*q+i]*(1-u)+d[(j+1)*q+i+1]*u)*v}return null}
  async function demEnsure(cmx,cmy,half,z,step){const n=2**z,out=[];for(let x=Math.floor((cmx-half)*n);x<=Math.floor((cmx+half)*n);x++)for(let y=Math.floor((cmy-half)*n);y<=Math.floor((cmy+half)*n);y++){const k="d/"+z+"/"+x+"/"+y;if(PK.have(k))out.push(demLoad(k,step))}await Promise.all(out);return out.length}
  function demTrim(cmx,cmy){if(DEM.size<90)return;for(const k of [...DEM.keys()]){const [,z,x,y]=k.split("/").map(Number),n=2**z;if(Math.abs((x+.5)/n-cmx)>1.6*EF/O.k||Math.abs((y+.5)/n-cmy)>1.6*EF/O.k)DEM.delete(k)}}
  /* ---- imagery mosaics ---- */
  async function mosaic(l,z,cmx,cmy,half,size){const n=2**z,x0=Math.floor((cmx-half)*n),x1=Math.floor((cmx+half)*n),y0=Math.max(0,Math.floor((cmy-half)*n)),y1=Math.min(n-1,Math.floor((cmy+half)*n));
    const cols=Math.max(x1-x0+1,y1-y0+1),dp=Math.max(16,Math.min(256,Math.floor(size/cols)));const keys=[];
    for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){const k=l+"/"+z+"/"+x+"/"+y;if(PK.have(k))keys.push([k,x,y])}
    if(!keys.length)return null;const c=document.createElement("canvas");c.width=(x1-x0+1)*dp;c.height=(y1-y0+1)*dp;const g=c.getContext("2d");
    let ok=0;for(let i=0;i<keys.length;i+=8){await Promise.all(keys.slice(i,i+8).map(async([k,x,y])=>{const b=await PK.getTile(k);if(!b)return;try{const im=await createImageBitmap(b);g.drawImage(im,(x-x0)*dp,(y-y0)*dp,dp,dp);im.close&&im.close();ok++}catch(e){}}));if(ctl.closed)return null}
    if(!ok)return null;let avg=null;try{const s=document.createElement("canvas");s.width=s.height=16;const sg=s.getContext("2d");sg.drawImage(c,0,0,16,16);const d=sg.getImageData(0,0,16,16).data;let r=0,gg=0,b=0,w=0;for(let i=0;i<d.length;i+=4){const a=d[i+3]/255;r+=d[i]*a;gg+=d[i+1]*a;b+=d[i+2]*a;w+=a}if(w>0)avg=[r/w,gg/w,b/w].map(v=>Math.pow(v/255,2.2))}catch(e){}
    const t=new THREE.CanvasTexture(c);t.flipY=false;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,ren.capabilities.getMaxAnisotropy());t.minFilter=THREE.LinearMipmapLinearFilter;
    const a=W(x0/n,y0/n),b=W((x1+1)/n,(y1+1)/n);return {tex:t,rect:new THREE.Vector4(a[0],a[1],b[0],b[1]),c:[cmx,cmy],tiles:ok,avg}}
  /* ---- materials ---- */
  const terrMat=new THREE.ShaderMaterial({uniforms:U,
    vertexShader:`uniform vec3 uCam;uniform float uR;attribute vec2 aw;varying vec3 vN,vW,vP;varying vec2 vA;void main(){vN=normal;vA=aw;vec3 p0=(modelMatrix*vec4(position,1.0)).xyz;vP=p0;${CURVE}vW=wp;gl_Position=projectionMatrix*viewMatrix*vec4(wp,1.0);}`,
    fragmentShader:`uniform sampler2D tFar,tMid,tNear,tNgt;uniform vec4 rFar,rMid,rNear,rNgt;uniform vec3 uCam,uSun,uSunC,uHz,uAmb;uniform float uVis,uNight,uDusk,uNvg,uFlir,uDark,uOvc;uniform vec3 uFb;varying vec3 vN,vW,vP;varying vec2 vA;
${NOISE}
vec4 S(sampler2D t,vec4 r,vec2 p){vec2 uv=(p-r.xy)/(r.zw-r.xy);vec4 c=texture2D(t,clamp(uv,0.0,1.0));float e=min(min(uv.x,1.-uv.x),min(uv.y,1.-uv.y));c.a*=smoothstep(0.0,0.03,e);return c;}
void main(){vec2 p=vP.xz;float sea=vA.x*step(vP.y,0.6);vec3 a=mix(uFb,vec3(.012,.03,.045),sea);
 vec4 f=S(tFar,rFar,p);a=mix(a,f.rgb,f.a);vec4 m=S(tMid,rMid,p);a=mix(a,m.rgb,m.a);vec4 n=S(tNear,rNear,p);a=mix(a,n.rgb,n.a);
 float dn=length(vW-uCam);a*=1.0+(vn(vP.xz/22.)+vn(vP.xz/7.)*0.5-0.75)*0.16*smoothstep(4000.,600.,dn);
 vec3 N=normalize(vN);float mx=max(a.r,max(a.g,a.b)),mn=min(a.r,min(a.g,a.b));
 float water=max(sea*(1.0-f.a),smoothstep(0.02,0.08,a.b-a.r)*smoothstep(0.30,0.12,mx));
 float lit=max(dot(N,uSun),0.0);vec3 c=a*(uSunC*lit*1.5*(1.0-0.6*uOvc)+uAmb*1.1)*1.25*uDark;
 vec3 V=normalize(vW-uCam);vec3 r=reflect(V,vec3(0,1,0));float fr=0.02+0.98*pow(1.0-max(-V.y,0.0),5.0);
 c=mix(c,mix(c,uHz*mix(0.9,0.05,uNight),fr*0.85+0.12),water);c+=water*uSunC*pow(max(dot(r,uSun),0.0),90.0)*2.5*(1.0-uNight)*(1.0-uOvc);
 if(uNight>0.01){vec2 nu=(p-rNgt.xy)/(rNgt.zw-rNgt.xy);float hasN=step(0.0,nu.x)*step(nu.x,1.0)*step(0.0,nu.y)*step(nu.y,1.0)*step(rNgt.x,rNgt.z);
   float urban=smoothstep(0.16,0.06,mx-mn)*smoothstep(0.14,0.26,mx);vec2 cell=p/24.0;vec2 g=floor(cell);float s=step(0.70,h1(g))*(0.5+h1(g+3.1));
   float dotm=smoothstep(0.30,0.04,length(fract(cell)-0.5));float fz=smoothstep(2500.0,9000.0,dn);float pts=mix(s*dotm*6.0,0.45*(0.6+0.8*vn(p/400.0)),fz);float blk=vn(p/60.0)*0.25;
   float bm=dot(texture2D(tNgt,clamp(nu,0.,1.)).rgb,vec3(.33));float L=mix(urban*0.6,smoothstep(0.10,0.65,bm),hasN)*(blk+pts)*(1.0-water);
   vec3 nc=a*(0.035+uNvg*0.30*(0.6+0.4*lit+0.3))+vec3(1.0,0.62,0.26)*L*(1.0-uNvg*0.5);c=mix(c,nc,uNight);}
 float d=dn;float fo=1.0-exp(-d/uVis)*exp(-max(0.0,1.0-abs(V.y)*30.0)*d/uVis*0.6);fo=fo*fo*(3.0-2.0*fo)*0.92+fo*0.08;vec3 hz=uHz;
 if(uDusk>0.01){float tw=max(dot(normalize(vec3(V.x,0.0,V.z)),normalize(vec3(uSun.x,0.0,uSun.z)+1e-5)),0.0);hz=mix(hz,mix(vec3(0.42,0.40,0.55),uHz,tw),uDusk);}
 if(uFlir>0.5){float urb=smoothstep(0.16,0.06,mx-mn)*smoothstep(0.14,0.30,mx);float veg=smoothstep(0.0,0.06,a.g-a.r);float tmp=0.30+0.45*urb+0.22*lit*(1.0-veg)-0.12*veg;tmp=mix(tmp,0.08,water);c=vec3(tmp);hz=vec3(0.12);fo*=0.6;}
 fo*=mix(1.0,0.45,uNight);gl_FragColor=vec4(mix(c,hz,clamp(fo,0.0,1.0)),1.0);}`});
  const outerMat=new THREE.ShaderMaterial({uniforms:U,depthWrite:false,depthTest:false,
    vertexShader:`uniform vec3 uCam;uniform float uR;varying vec3 vW;void main(){${CURVE}vW=wp;gl_Position=projectionMatrix*viewMatrix*vec4(wp,1.0);}`,
    fragmentShader:`uniform vec3 uCam,uHz,uSunC,uAmb,uFb;uniform float uVis,uNight,uFlir,uDark;varying vec3 vW;void main(){vec3 b=uFb*(uSunC*1.5+uAmb*1.1)*1.25*uDark;float f=1.0-exp(-length(vW-uCam)/uVis);vec3 hz=uFlir>0.5?vec3(.12):uHz;if(uFlir>0.5)b=vec3(.2);gl_FragColor=vec4(mix(b,hz,clamp(f*mix(1.0,0.5,uNight),0.,1.)),1.0);}`});
  const outer=new THREE.Mesh(new THREE.PlaneGeometry(1.8e6,1.8e6,96,96).rotateX(-Math.PI/2),outerMat);outer.renderOrder=-1;outer.frustumCulled=false;scene.add(outer);
  const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:U,
    vertexShader:`varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_Position.z=gl_Position.w;}`,
    fragmentShader:`uniform vec3 uSun,uHz,uZen,uSunC;uniform float uDusk,uFlir,uOvc,uSunVis,uDark;varying vec3 vD;void main(){vec3 d=normalize(vD);float e=max(d.y,0.0);vec3 c=mix(uHz,uZen,pow(e,0.45));float m=max(dot(d,uSun),0.0);
 vec2 dh=normalize(d.xz+1e-5),sh=normalize(uSun.xz+1e-5);float az=max(dot(dh,sh),0.0);c=mix(c,vec3(1.0,0.45,0.18),pow(az,3.0)*exp(-e*9.0)*0.9*uDusk);c=mix(c,vec3(0.55,0.42,0.62),(1.0-az)*exp(-e*6.0)*0.35*uDusk);
 c+=uSunC*uSunVis*(smoothstep(0.99985,0.9999,m)*20.0+pow(m,300.0)*1.2+pow(m,30.0)*0.3+pow(m,5.0)*0.10);c=mix(c,uHz*0.9,uOvc*0.85);c*=uDark;if(d.y<0.0)c=uHz;if(uFlir>0.5)c=vec3(0.12-0.10*pow(e,0.5));gl_FragColor=vec4(c,1.0);}`});
  const sky=new THREE.Mesh(new THREE.SphereGeometry(1e6,48,24),skyMat);sky.frustumCulled=false;sky.renderOrder=-2;scene.add(sky);
  const stars=(()=>{const g=new THREE.BufferGeometry(),sp=[];let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=0;i<2200;i++){const th=2*Math.PI*rnd(),ph=Math.acos(rnd()*0.95+0.04);sp.push(Math.sin(ph)*Math.cos(th)*9e5,Math.cos(ph)*9e5,Math.sin(ph)*Math.sin(th)*9e5)}
    g.setAttribute("position",new THREE.Float32BufferAttribute(sp,3));const m=new THREE.PointsMaterial({size:1.6,sizeAttenuation:false,color:0xbfcfff,transparent:true,depthWrite:false});const p=new THREE.Points(g,m);p.frustumCulled=false;p.renderOrder=-1;return p})();scene.add(stars);
  const cloudMat=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,side:THREE.DoubleSide,
    vertexShader:`uniform vec3 uCam;uniform float uR;varying vec3 vW;void main(){${CURVE}vW=wp;gl_Position=projectionMatrix*viewMatrix*vec4(wp,1.0);}`,
    fragmentShader:`uniform vec3 uCam,uSun,uSunC,uHz,uAmb;uniform float uCov,uVis,uT,uCR,uFlir,uDark;varying vec3 vW;${NOISE}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*vn(p);p=p*2.03+17.1;a*=.5;}return v;}
void main(){vec2 p=vW.xz/7000.0+vec2(uT*0.0015,0.0);float n=fbm(p)*0.75+fbm(p*3.3)*0.25;float a=smoothstep(1.0-uCov-0.10,1.0-uCov+0.14,n+0.12*(uCov-0.5));
 float above=step(vW.y,uCam.y);vec3 top=(uSunC*(0.55+0.5*max(uSun.y,0.0))+uAmb*0.6)*1.05;vec3 bot=vec3(.46,.48,.52)*(uSunC*0.45+uAmb*0.9);vec3 c=mix(bot,top,above)*(0.85+0.3*n)*uDark;
 float d=length(vW-uCam);float f=1.0-exp(-d/(uVis*1.5));c=mix(c,uHz,clamp(f,0.,1.)*0.8);a*=1.0-smoothstep(0.55*uCR,uCR,length(vW.xz-uCam.xz));if(uFlir>0.5)c=vec3(0.18+0.1*above);gl_FragColor=vec4(c,a*0.97);}`});
  const cloud=new THREE.Mesh(new THREE.PlaneGeometry(300000,300000,96,96).rotateX(-Math.PI/2),cloudMat);cloud.frustumCulled=false;cloud.visible=false;cloud.renderOrder=2;scene.add(cloud);
  const rwyMat=new THREE.ShaderMaterial({uniforms:U,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-8,side:THREE.DoubleSide,
    vertexShader:`uniform vec3 uCam;uniform float uR;attribute vec2 rc;varying vec2 vR;varying vec3 vW;void main(){vR=rc;${CURVE}vW=wp;gl_Position=projectionMatrix*viewMatrix*vec4(wp,1.0);}`,
    fragmentShader:`uniform vec3 uCam,uHz,uSunC,uAmb;uniform float uVis,uNight,uFlir,uDark;varying vec2 vR;varying vec3 vW;void main(){float L=vR.y,x=abs(vR.x);vec3 c=vec3(0.11,0.115,0.12);float w=0.0;
 w+=step(x,0.45)*step(0.5,fract(L/60.0))*step(60.0,L);w+=step(abs(L-15.0),12.0)*step(4.0,x)*step(x,20.0)*step(0.5,fract(x/3.6+0.25));w+=step(abs(L-310.0),22.0)*step(5.0,x)*step(x,11.0);w+=step(21.0,x)*step(x,22.0);
 c=mix(c,vec3(0.85),clamp(w,0.,1.));c*=(uSunC*0.9+uAmb*0.6)*uDark;c=mix(c,c*0.06+vec3(1.0,0.95,0.8)*step(21.0,x)*step(0.8,fract(L/60.0))*1.5+vec3(0.9,0.95,1.0)*step(x,0.6)*step(0.85,fract(L/15.0))*1.2,uNight);
 if(uFlir>0.5)c=vec3(0.42);float f=1.0-exp(-length(vW-uCam)/uVis);gl_FragColor=vec4(mix(c,uFlir>0.5?vec3(.12):uHz,clamp(f*mix(1.0,0.45,uNight),0.,1.)),1.0);}`});
  const lightMat=new THREE.ShaderMaterial({uniforms:U,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
    vertexShader:`uniform vec3 uCam;uniform float uR;attribute vec3 color;varying vec3 vC;void main(){vC=color;${CURVE}float d=length(wp-uCam);gl_PointSize=clamp(9000.0/d,2.0,7.0);gl_Position=projectionMatrix*viewMatrix*vec4(wp,1.0);}`,
    fragmentShader:`uniform float uNight;varying vec3 vC;void main(){float r=length(gl_PointCoord-.5);gl_FragColor=vec4(vC*2.2*smoothstep(.5,.0,r)*uNight,1.0);}`});
  const aspMat=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,
    vertexShader:`uniform vec3 uCam;uniform float uR;attribute vec3 color;varying vec3 vC;varying float vD;void main(){vC=color;${CURVE}vD=length(wp-uCam);gl_Position=projectionMatrix*viewMatrix*vec4(wp,1.0);}`,
    fragmentShader:`uniform float uVis;varying vec3 vC;varying float vD;void main(){gl_FragColor=vec4(vC,0.75*exp(-vD/(uVis*1.6))*smoothstep(150000.0,60000.0,vD));}`});
  let terr=null,aspG=null;
  /* post look pass */
  let rt=null;const fxMat=new THREE.ShaderMaterial({uniforms:{t:{value:null},res:{value:new THREE.Vector2(1,1)},mode:{value:0},tm:{value:0}},depthTest:false,depthWrite:false,
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,
    fragmentShader:`uniform sampler2D t;uniform vec2 res;uniform int mode;uniform float tm;varying vec2 vUv;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec3 iron(float x){x=clamp(x,0.,1.);vec3 c0=vec3(0),c1=vec3(.13,0,.3),c2=vec3(.49,0,.45),c3=vec3(.86,.1,.18),c4=vec3(1,.55,0),c5=vec3(1,.91,.32),c6=vec3(1);float s=x*6.;return s<1.?mix(c0,c1,s):s<2.?mix(c1,c2,s-1.):s<3.?mix(c2,c3,s-2.):s<4.?mix(c3,c4,s-3.):s<5.?mix(c4,c5,s-4.):mix(c5,c6,s-5.);}
void main(){vec3 c=texture2D(t,vUv).rgb;float L=dot(c,vec3(.299,.587,.114));
 if(mode==1){vec3 b=vec3(0);for(int i=-2;i<=2;i++)for(int j=-2;j<=2;j++)b+=texture2D(t,vUv+vec2(i,j)*3.0/res).rgb;L=L+dot(b/25.,vec3(.3,.59,.11))*0.6;
   L=pow(clamp(L*2.4,0.,1.),0.75)+(h(vUv*res+fract(tm*7.1))-.5)*0.16;float r=length((vUv-.5)*vec2(res.x/res.y,1.));c=vec3(0.30,1.0,0.42)*L*smoothstep(0.75,0.45,r)*(0.9+0.1*sin(vUv.y*res.y*1.6));}
 else if(mode==2){float temp=pow(clamp(L*1.35-0.05,0.,1.),1.1);c=iron(temp*0.95+(h(floor(vUv*res/2.)+fract(tm))-.5)*0.04);}
 else if(mode==3){vec2 q=vUv-.5;q*=1.0+dot(q,q)*0.18;vec2 u=q+.5;vec2 p=floor(u*res/3.)*3./res;c=texture2D(t,p).rgb;c*=0.75+0.25*sin(u.y*res.y*2.1);c*=vec3(0.95,1.05,0.95);if(u.x<0.||u.x>1.||u.y<0.||u.y>1.)c=vec3(0);}
 gl_FragColor=vec4(c,1.0);}`});
  const fscene=new THREE.Scene(),fcam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);fscene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),fxMat));
  /* ---- runways (rwy.json, cached by the app's service worker) ---- */
  let RWY=null;const rwyP=fetch("rwy.json").then(r=>r.ok?r.json():[]).then(j=>{RWY=Array.isArray(j)?j:[]}).catch(()=>{RWY=[]});
  function rwyList(cx,cz,rM){const out=[];if(!RWY)return out;for(const ap of RWY){const m=PK.merc(ap[2],ap[3]),w=W(m[0],m[1]);if(Math.hypot(w[0]-cx,w[1]-cz)>rM)continue;
      for(const r of ap[4]||[]){const [n1,n2,la1,lo1,la2,lo2,wd0]=r;if(![la1,lo1,la2,lo2].every(Number.isFinite))continue;const a=W(...PK.merc(la1,lo1)),b=W(...PK.merc(la2,lo2));
        const len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<200||len>6000)continue;const h=[hAt(...M(a[0],a[1])),hAt(...M(b[0],b[1])),hAt(...M((a[0]+b[0])/2,(a[1]+b[1])/2))].filter(v=>v!=null);
        out.push({ap:ap[0],n1,n2,a,b,len,wd:Math.max(23,Math.min(60,wd0||45)),h:h.length?Math.max(0,h.reduce((s,v)=>s+v,0)/h.length):0})}}return out}
  /* ---- mesh: dense near the centre, coarse at the edge (one draw call) ---- */
  function buildMesh(cx,cz){const a=0.1,g=s=>s*(a+(1-a)*s*s),n1=N+1,pos=new Float32Array(n1*n1*3),aw=new Float32Array(n1*n1*2);
    for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){const x=cx+EF*g(-1+2*i/N),z=cz+EF*g(-1+2*j/N),q=j*n1+i,h=hAt(...M(x,z));pos[q*3]=x;pos[q*3+1]=h==null?0:Math.max(0,h);pos[q*3+2]=z;aw[q*2]=h==null?0:1;aw[q*2+1]=0}
    const rw=rwyList(cx,cz,EF*0.35);
    for(const r of rw){const ux=(r.b[0]-r.a[0])/r.len,uz=(r.b[1]-r.a[1])/r.len,pad=r.wd/2+280,minx=Math.min(r.a[0],r.b[0])-pad,maxx=Math.max(r.a[0],r.b[0])+pad,minz=Math.min(r.a[1],r.b[1])-pad,maxz=Math.max(r.a[1],r.b[1])+pad;
      for(let q=0;q<n1*n1;q++){const x=pos[q*3],z=pos[q*3+2];if(x<minx||x>maxx||z<minz||z>maxz)continue;const t=Math.max(-150,Math.min(r.len+150,(x-r.a[0])*ux+(z-r.a[1])*uz)),px=r.a[0]+ux*t,pz=r.a[1]+uz*t,d=Math.hypot(x-px,z-pz);
        if(d<pad){const k=sm(pad,r.wd/2+60,d);pos[q*3+1]=lerp(pos[q*3+1],r.h,k)}}}
    const idx=new Uint32Array(N*N*6);let k=0;for(let j=0;j<N;j++)for(let i=0;i<N;i++){const p=j*n1+i,b=p+1,c=p+n1,d=c+1;idx[k++]=p;idx[k++]=c;idx[k++]=b;idx[k++]=b;idx[k++]=c;idx[k++]=d}
    const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));geo.setAttribute("aw",new THREE.BufferAttribute(aw,2));geo.setIndex(new THREE.BufferAttribute(idx,1));geo.computeVertexNormals();
    const mesh=new THREE.Mesh(geo,terrMat);mesh.frustumCulled=false;
    /* runway quads + lights */
    const rg=new THREE.Group(),LP=[],LC=[];
    for(const r of rw){const ux=(r.b[0]-r.a[0])/r.len,uz=(r.b[1]-r.a[1])/r.len,px=-uz*r.wd/2,pz=ux*r.wd/2,y=r.h+0.4,[x1,z1]=r.a,[x2,z2]=r.b,mx=(x1+x2)/2,mz=(z1+z2)/2;
      for(const [ax,az,bx,bz] of [[x1,z1,mx,mz],[x2,z2,mx,mz]]){const gq=new THREE.BufferGeometry();gq.setAttribute("position",new THREE.Float32BufferAttribute([ax+px,y,az+pz,ax-px,y,az-pz,bx+px,y,bz+pz,bx-px,y,bz-pz],3));
        gq.setAttribute("rc",new THREE.Float32BufferAttribute([r.wd/2,0,-r.wd/2,0,r.wd/2,r.len/2,-r.wd/2,r.len/2],2));gq.setIndex([0,2,1,1,2,3]);const m=new THREE.Mesh(gq,rwyMat);m.frustumCulled=false;rg.add(m)}
      const add=(x,z,c)=>{LP.push(x,y+0.8,z);LC.push(...c)};
      for(let t=0;t<=r.len;t+=60){add(x1+ux*t+px*1.05,z1+uz*t+pz*1.05,[1,.92,.75]);add(x1+ux*t-px*1.05,z1+uz*t-pz*1.05,[1,.92,.75]);if(t%30===0)add(x1+ux*t,z1+uz*t,[.85,.95,1])}
      for(let s=-6;s<=6;s++){add(x1+px*s/6.3,z1+pz*s/6.3,[.3,1,.4]);add(x2+px*s/6.3,z2+pz*s/6.3,[.3,1,.4])}
      for(const [sx,sz,dx,dz] of [[x1,z1,-ux,-uz],[x2,z2,ux,uz]])for(let t=60;t<=900;t+=30){add(sx+dx*t,sz+dz*t,[1,.95,.85]);if(t%150===0)for(let s=-4;s<=4;s++)add(sx+dx*t+px*s/7,sz+dz*t+pz*s/7,[1,.95,.85])}}
    let lg=null;if(LP.length){const g2=new THREE.BufferGeometry();g2.setAttribute("position",new THREE.Float32BufferAttribute(LP,3));g2.setAttribute("color",new THREE.Float32BufferAttribute(LC,3));lg=new THREE.Points(g2,lightMat);lg.frustumCulled=false;lg.renderOrder=3}
    return {mesh,rg,lg,c:[cx,cz],rw:rw.length}}
  function disposeObj(o){if(!o)return;o.traverse&&o.traverse(x=>{if(x.geometry)x.geometry.dispose()});scene.remove(o)}
  /* ---- airspace outlines (OpenAIP, only if stored with a pack) ---- */
  let ASP=null;PK.aspAll().then(a=>{ASP=a}).catch(()=>{ASP=[]});
  function buildAsp(cx,cz){if(!ASP||!ASP.length)return null;const P=[],Cc=[];const col=t=>t===1||t===3?[1,.25,.25]:t===2?[1,.65,.1]:[.3,.85,1];
    for(const a of ASP){if(!a.p||a.p.length<3)continue;const w=a.p.map(q=>W(...PK.merc(q[0],q[1])));if(!w.some(q=>Math.hypot(q[0]-cx,q[1]-cz)<220000))continue;
      const lo=a.lo==null?0:Math.max(0,a.lo),hi=Math.min(a.hi==null?6000:a.hi,7600),c=col(a.t);
      for(const y of (lo>30?[lo,hi]:[hi]))for(let i=0;i<w.length;i++){const p=w[i],q=w[(i+1)%w.length];P.push(p[0],y,p[1],q[0],y,q[1]);Cc.push(...c,...c)}
      for(let i=0;i<w.length;i+=Math.max(1,Math.floor(w.length/12))){P.push(w[i][0],lo,w[i][1],w[i][0],hi,w[i][1]);Cc.push(...c,...c)}}
    if(!P.length)return null;const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("color",new THREE.Float32BufferAttribute(Cc,3));const l=new THREE.LineSegments(g,aspMat);l.frustumCulled=false;l.renderOrder=4;return l}
  /* ---- layer builds ---- */
  const LY={far:null,mid:null,near:null,ngt:null};const busy={};let meshC=null,aspC=null,first=true,builtAt=0;
  async function layer(name,l,z,half,size){if(busy[name])return;busy[name]=true;try{const c=M(cam.position.x,cam.position.z);const r=await mosaic(l,z,c[0],c[1],half/O.k,size);if(ctl.closed){r&&r.tex.dispose();return}
      const old=LY[name];LY[name]=r?{...r,cw:[cam.position.x,cam.position.z]}:{cw:[cam.position.x,cam.position.z],none:true};const tk={far:"tFar",mid:"tMid",near:"tNear",ngt:"tNgt"}[name],rk={far:"rFar",mid:"rMid",near:"rNear",ngt:"rNgt"}[name];
      U[tk].value=r?r.tex:blank;if(name==="far"&&r&&r.avg)U.uFb.value.setRGB(...r.avg);U[rk].value=r?r.rect:new THREE.Vector4(0,0,-1,-1);if(old&&old.tex)old.tex.dispose()}finally{busy[name]=false}}
  async function meshBuild(){if(busy.mesh)return;busy.mesh=true;try{const cx=cam.position.x,cz=cam.position.z,c=M(cx,cz);
      await demEnsure(c[0],c[1],EF*1.05/O.k,8,2);await demEnsure(c[0],c[1],EM*1.1/O.k,11,2);await rwyP;if(ctl.closed)return;demTrim(c[0],c[1]);
      const b=buildMesh(cx,cz);if(terr){disposeObj(terr.mesh);disposeObj(terr.rg);disposeObj(terr.lg)}terr=b;scene.add(b.mesh);scene.add(b.rg);if(b.lg)scene.add(b.lg);meshC=[cx,cz];
      if(ctl.asp){const a=buildAsp(cx,cz);disposeObj(aspG);aspG=a;if(a)scene.add(a);aspC=[cx,cz]}}finally{busy.mesh=false}}
  const far=(o,lim)=>!o||Math.hypot(cam.position.x-o[0],cam.position.z-o[1])>lim;
  function schedule(agl){if(!O)return;
    if(far(meshC,agl<3000?6000:20000))meshBuild();
    if(!LY.far||far(LY.far.cw,45000))layer("far","i",10,EF,TEX);
    if(!LY.ngt||far(LY.ngt.cw,60000))layer("ngt","n",8,EF,low?512:1024);
    if(!LY.mid||far(LY.mid.cw,LY.mid.none?20000:10000))layer("mid","i",12,EM,TEX);
    if(!LY.near||far(LY.near.cw,LY.near.none?5000:2500))layer("near","i",14,EN,TEX)}
  /* ---- pose ---- */
  let F=null,pose=null,lastSeen="";const pf=()=>performance.now();
  function poseNow(){const s=api.state();if(!s||s.lat==null){pose=null;return null}
    const sig=[s.lat,s.lon,s.alt,s.trk].join(",");if(sig!==lastSeen||!F){lastSeen=sig;F={...s,at:pf()}}else F={...s,at:F.at};
    const dt=Math.min(3,(pf()-F.at)/1000);let lat=F.lat,lon=F.lon;if(F.spd>3&&F.trk!=null&&!F.frozen){const d=F.spd*dt;lat+=d*Math.cos(rad(F.trk))/111320;lon+=d*Math.sin(rad(F.trk))/(111320*Math.cos(rad(lat)))}
    const hd=F.trk==null?(pose?pose.hd:0):F.trk;const p={lat,lon,alt:F.alt,hd:pose&&!F.snap?pose.hd+wrap(hd-pose.hd)*Math.min(1,0.12):hd,pitch:F.pitch||0,bank:F.bank||0,spd:F.spd,sun:F.sun,wx:F.wx,ph:F.ph};
    if(F.snap)p.hd=hd;pose=p;return p}
  /* ---- palette from sun elevation and weather ---- */
  function light(p,agl){const el=p.sun?p.sun.el:30,az=p.sun?p.sun.az:0;const day=sm(-4,10,el),dusk=Math.exp(-(((el-1)/5.5)**2))*(1-sm(8,14,el)),night=1-sm(-9,-3,el);
    const pick=(a)=>{const c=a[0].clone().lerp(a[2],day);return c.lerp(a[1],Math.min(1,dusk*0.85))};
    U.uHz.value.copy(pick(PAL.hz));U.uZen.value.copy(pick(PAL.zen));U.uSunC.value.copy(pick(PAL.sun));
    U.uSun.value.set(Math.sin(rad(az))*Math.cos(rad(el)),Math.sin(rad(el)),-Math.cos(rad(az))*Math.cos(rad(el))).normalize();
    U.uAmb.value.copy(U.uHz.value).multiplyScalar(0.45).addScalar(0.08*day+0.01);U.uNight.value=night;U.uDusk.value=dusk;
    let vis=60000+Math.min(80000,Math.max(0,(p.alt||0)*6)),cov=0,hb=1500,dark=1,ovc=0,cls=(ctl.wx&&p.wx)?p.wx.cls:"none";const alt=p.alt||0;
    if(cls&&cls!=="none"&&cls!=="clear"){const w=p.wx;cov=w.cc!=null?w.cc/100:({sct:.3,bkn:.65,ovc:.92,rain:.85,rainH:.95,storm:.9,fog:.95,haze:.15}[cls]||0);
      hb=cls==="fog"?120:(w.ccl!=null&&w.ccl>50?900:1600);const gh=alt-agl;hb+=Math.max(0,gh);
      const below=alt<hb;let v=w.vis!=null?w.vis:60000;if(cls==="fog")v=Math.min(v,1200);else if(cls==="haze")v=Math.min(v,6000);else if(cls==="rainH")v=Math.min(v,5000);else if(cls==="rain")v=Math.min(v,9000);else if(cls==="storm")v=Math.min(v,4500);
      vis=below?Math.max(800,Math.min(60000,v)):Math.max(40000,v);if(below&&cov>0.6){ovc=sm(0.6,0.95,cov);dark=cls==="storm"?0.55:cls==="rainH"?0.7:0.85}
      if(Math.abs(alt-hb)<220&&cov>0.5)vis=Math.min(vis,250)}
    if(ovc>0||dark<1){const k=lerp(1,0.6,ovc)*dark;U.uHz.value.multiplyScalar(k);U.uZen.value.lerp(U.uHz.value,ovc*0.8);U.uAmb.value.multiplyScalar(lerp(1,0.8,ovc))}if(night>0.5)vis*=1.3;U.uVis.value=vis;U.uCov.value=cov;U.uDark.value=dark;U.uOvc.value=ovc;U.uSunVis.value=1-ovc;
    cloud.visible=cov>0.12;cloud.position.set(cam.position.x,hb,cam.position.z);
    stars.material.opacity=night*(1-ovc);stars.visible=night>0.05;
    ren.toneMappingExposure=1.05+0.05*dusk;return {el,day,dusk,night,cls,vis,cov,hb,rain:(cls==="rain"||cls==="rainH"||cls==="storm")&&alt<hb?(cls==="rain"?1:2):0}}
  /* ---- frame ---- */
  const st={frames:0,ms:0,last:0,lit:null,agl:0,gh:0};let raf=0,last=0;
  function size(){const w=Math.max(2,cv.clientWidth),h=Math.max(2,cv.clientHeight),pr=Math.min(window.devicePixelRatio||1,ctl.dpr);
    if(cv.width!==Math.round(w*pr)||cv.height!==Math.round(h*pr)){ren.setPixelRatio(pr);ren.setSize(w,h,false);if(rt)rt.setSize(Math.round(w*pr),Math.round(h*pr));fxMat.uniforms.res.value.set(w*pr,h*pr)}
    cam.aspect=w/h;const hf=w>h?78:62,vf=w>h?2*Math.atan(Math.tan(rad(hf)/2)*h/w)*180/Math.PI:Math.min(74,2*Math.atan(Math.tan(rad(hf)/2)*h/w)*180/Math.PI);cam.fov=vf;cam.updateProjectionMatrix()}
  function draw(){const t0=pf();const p=poseNow();size();
    if(!p){st.state="nofix";ren.setRenderTarget(null);ren.setClearColor(0x000000);ren.clear();return}
    if(!O||Math.hypot(...W(...PK.merc(p.lat,p.lon)))>150000){setO(p.lat,p.lon);for(const k of Object.keys(LY)){if(LY[k]&&LY[k].tex)LY[k].tex.dispose();LY[k]=null}for(const k of ["tFar","tMid","tNear","tNgt"])U[k].value=blank;for(const k of ["rFar","rMid","rNear","rNgt"])U[k].value=new THREE.Vector4(0,0,-1,-1);meshC=null}
    const m=PK.merc(p.lat,p.lon),w=W(m[0],m[1]);const gh0=hAt(m[0],m[1]);const gh=gh0==null?0:Math.max(0,gh0);
    let alt=p.alt;if(alt==null||!isFinite(alt))alt=(p.spd||0)>40?3000:gh+4;alt=Math.max(alt,gh+3.5);st.agl=alt-gh;st.gh=gh;
    cam.position.set(w[0],alt,w[1]);U.uCam.value.copy(cam.position);cam.near=Math.max(1,Math.min(60,st.agl*0.25));cam.far=1.6e6;
    const look=ctl.view==="left"?-80:ctl.view==="right"?80:0,pt=ctl.view==="fwd"?Math.max(-6,Math.min(12,p.pitch||0))-(st.agl<30?1:4+Math.min(6,st.agl/2000)):(st.agl<30?-2:-12);
    const hd=rad(p.hd+look),pr=rad(pt);cam.up.set(0,1,0);cam.lookAt(w[0]+Math.sin(hd)*Math.cos(pr)*1000,alt+Math.sin(pr)*1000,w[1]-Math.cos(hd)*Math.cos(pr)*1000);
    const bank=ctl.view==="fwd"?p.bank:0;cam.rotateZ(-rad(Math.max(-35,Math.min(35,bank||0))));
    sky.position.copy(cam.position);stars.position.copy(cam.position);outer.position.set(cam.position.x,-25,cam.position.z);
    const L=light(p,st.agl);st.lit=L;U.uT.value=t0/1000;U.uNvg.value=ctl.fx==="nvg"?1:0;U.uFlir.value=ctl.fx==="flir"?1:0;
    schedule(st.agl);
    if(ctl.fx==="none"){ren.toneMapping=THREE.ACESFilmicToneMapping;ren.setRenderTarget(null);ren.render(scene,cam)}
    else{if(!rt){rt=new THREE.WebGLRenderTarget(cv.width,cv.height,{type:THREE.HalfFloatType});fxMat.uniforms.res.value.set(cv.width,cv.height)}
      ren.toneMapping=THREE.ACESFilmicToneMapping;ren.setRenderTarget(rt);ren.render(scene,cam);ren.setRenderTarget(null);ren.toneMapping=THREE.NoToneMapping;
      fxMat.uniforms.t.value=rt.texture;fxMat.uniforms.mode.value=FXI[ctl.fx]||0;fxMat.uniforms.tm.value=t0/1000;ren.render(fscene,fcam);ren.toneMapping=THREE.ACESFilmicToneMapping}
    st.frames++;const ms=pf()-t0;st.ms=st.ms?st.ms*0.9+ms*0.1:ms;st.state="ok";st.pose=p;api.frame&&api.frame(st,p)}
  function loop(now){if(ctl.closed)return;raf=requestAnimationFrame(loop);if(document.hidden)return;if(now-last<1000/ctl.fps-3)return;last=now;try{draw()}catch(e){st.err=String(e&&e.message||e);api.err&&api.err(st.err)}}
  cv.addEventListener("webglcontextlost",e=>{e.preventDefault();st.lost=true;api.err&&api.err("3D graphics were paused by the phone. Close and reopen the 3D view.")});
  raf=requestAnimationFrame(loop);
  Object.assign(ctl,{
    setFx(m){ctl.fx=FXI[m]!=null?m:"none"},setView(v){ctl.view=["fwd","left","right"].includes(v)?v:"fwd"},setFps(n){ctl.fps=Math.max(5,Math.min(60,+n||30))},
    setWx(b){ctl.wx=!!b},setAsp(b){ctl.asp=!!b;meshC=null;if(!b){disposeObj(aspG);aspG=null}},
    status(){return {state:st.state,frames:st.frames,ms:+st.ms.toFixed(1),agl:Math.round(st.agl),gh:Math.round(st.gh),err:st.err||"",layers:Object.fromEntries(Object.entries(LY).map(([k,v])=>[k,v?(v.none?0:v.tiles):null])),dem:DEM.size,
      runways:terr?terr.rw:0,asp:aspG?aspG.geometry.attributes.position.count/2:0,cloud:cloud.visible,lit:st.lit,fx:ctl.fx,view:ctl.view,verts:(N+1)*(N+1),dpr:ren.getPixelRatio(),w:cv.width,h:cv.height}},
    ready(){return !!O&&!busy.mesh&&!busy.far&&!busy.mid&&!busy.near&&!busy.ngt&&!!meshC&&!!LY.far&&!!LY.mid&&!!LY.near&&!!LY.ngt},
    probe(){draw();const gl=ren.getContext(),w=gl.drawingBufferWidth,h=gl.drawingBufferHeight,px=new Uint8Array(4);let n=0,s=0,s2=0,bright=0,sr=0,sg=0,sb=0;const seen=new Set();
      for(let j=1;j<16;j++)for(let i=1;i<16;i++){gl.readPixels(Math.floor(w*i/16),Math.floor(h*j/16),1,1,gl.RGBA,gl.UNSIGNED_BYTE,px);const L=(px[0]+px[1]+px[2])/3;n++;sr+=px[0];sg+=px[1];sb+=px[2];s+=L;s2+=L*L;if(L>8)bright++;seen.add((px[0]>>4)+","+(px[1]>>4)+","+(px[2]>>4))}
      const mean=s/n;return {mean:+mean.toFixed(1),sd:+Math.sqrt(Math.max(0,s2/n-mean*mean)).toFixed(1),bright,colours:seen.size,n,r:Math.round(sr/n),g:Math.round(sg/n),b:Math.round(sb/n)}},
    close(){ctl.closed=true;cancelAnimationFrame(raf);for(const v of Object.values(LY))if(v&&v.tex)v.tex.dispose();if(rt)rt.dispose();disposeObj(terr&&terr.mesh);disposeObj(terr&&terr.rg);disposeObj(terr&&terr.lg);disposeObj(aspG);DEM.clear();
      scene.traverse(o=>{if(o.geometry)o.geometry.dispose()});ren.dispose();try{ren.forceContextLoss()}catch(e){}}});
  return ctl}
