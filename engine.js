/**
 * SIRIUS Climatic Calculator — Engine v2
 * Lead-gated (20 free uses) + printable NdC format
 * © 2026 SIRIUS Ingénierie
 */

// ═══ 1. DATA ═══
const NEIGE_DEFAULT={"01":"A2","02":"A1","03":"A2","04":"C2","05":"E","06":"A2","07":"C2","08":"A1","09":"A2","10":"A1","11":"A2","12":"A2","13":"A2","14":"A1","15":"C2","16":"A1","17":"A1","18":"A1","19":"A2","20":"A2","2A":"A2","2B":"A2","21":"A2","22":"A1","23":"A2","24":"A1","25":"C1","26":"C2","27":"A1","28":"A1","29":"A1","30":"B2","31":"A2","32":"A2","33":"A1","34":"B2","35":"A1","36":"A1","37":"A1","38":"C2","39":"B1","40":"A1","41":"A1","42":"A2","43":"C2","44":"A1","45":"A1","46":"A2","47":"A1","48":"C2","49":"A1","50":"A1","51":"A1","52":"A1","53":"A1","54":"A1","55":"A1","56":"A1","57":"A1","58":"A2","59":"A1","60":"A1","61":"A1","62":"A1","63":"A2","64":"A2","65":"A2","66":"C2","67":"C1","68":"B1","69":"A2","70":"B1","71":"A2","72":"A1","73":"E","74":"E","75":"A1","76":"A1","77":"A1","78":"A1","79":"A1","80":"A1","81":"A2","82":"A2","83":"A2","84":"B2","85":"A1","86":"A1","87":"A1","88":"B1","89":"A1","90":"B1","91":"A1","92":"A1","93":"A1","94":"A1","95":"A1"};
const VENT_DEFAULT={"01":"1","02":"2","03":"1","04":"2","05":"1","06":"2","07":"1","08":"2","09":"1","10":"2","11":"3","12":"2","13":"3","14":"2","15":"1","16":"2","17":"2","18":"1","19":"1","20":"3","2A":"3","2B":"4","21":"2","22":"2","23":"1","24":"2","25":"1","26":"2","27":"2","28":"2","29":"3","30":"2","31":"1","32":"1","33":"1","34":"3","35":"2","36":"1","37":"2","38":"1","39":"1","40":"1","41":"2","42":"1","43":"1","44":"3","45":"2","46":"2","47":"2","48":"2","49":"2","50":"2","51":"2","52":"1","53":"2","54":"1","55":"1","56":"3","57":"1","58":"1","59":"2","60":"2","61":"2","62":"3","63":"2","64":"2","65":"1","66":"3","67":"2","68":"1","69":"1","70":"2","71":"1","72":"2","73":"1","74":"1","75":"2","76":"2","77":"1","78":"2","79":"2","80":"3","81":"2","82":"1","83":"2","84":"2","85":"2","86":"2","87":"1","88":"1","89":"1","90":"1","91":"1","92":"2","93":"2","94":"1","95":"2"};
const NEIGE_SK0={"A1":0.45,"A2":0.45,"B1":0.55,"B2":0.55,"C1":0.65,"C2":0.65,"D":0.90,"E":1.40};
const VENT_VB0={"1":22,"2":24,"3":26,"4":28};
const TERRAIN={"0":{z0:0.005,zmin:1,kr:0.156,label:"Mer, zone côtière"},"II":{z0:0.05,zmin:2,kr:0.190,label:"Rase campagne"},"IIIa":{z0:0.20,zmin:5,kr:0.215,label:"Campagne avec haies"},"IIIb":{z0:0.50,zmin:9,kr:0.234,label:"Zone industrielle"},"IV":{z0:1.00,zmin:15,kr:0.262,label:"Urbain dense"}};
const SISMO_DEPT={"01":"2","02":"1","03":"2","04":"4","05":"4","06":"4","07":"2","08":"1","09":"3","10":"1","11":"2","12":"1","13":"3","14":"2","15":"2","16":"1","17":"2","18":"1","19":"1","2A":"1","2B":"1","21":"2","22":"2","23":"1","24":"1","25":"3","26":"3","27":"1","28":"1","29":"2","30":"2","31":"2","32":"1","33":"2","34":"2","35":"2","36":"1","37":"1","38":"4","39":"3","40":"2","41":"1","42":"2","43":"2","44":"2","45":"1","46":"1","47":"1","48":"2","49":"2","50":"2","51":"1","52":"1","53":"2","54":"1","55":"1","56":"2","57":"1","58":"2","59":"1","60":"1","61":"2","62":"1","63":"2","64":"4","65":"4","66":"4","67":"3","68":"3","69":"2","70":"2","71":"2","72":"2","73":"4","74":"4","75":"1","76":"1","77":"1","78":"1","79":"2","80":"1","81":"1","82":"1","83":"3","84":"3","85":"2","86":"2","87":"1","88":"2","89":"1","90":"3","91":"1","92":"1","93":"1","94":"1","95":"1"};
const SISMO_AGR={"1":0.4,"2":0.7,"3":1.1,"4":1.6,"5":3.0};
const SISMO_LABELS={"1":"Très faible","2":"Faible","3":"Modérée","4":"Moyenne","5":"Forte"};
const TEMP_DEPT={"01":[-15,38],"02":[-12,35],"03":[-15,36],"04":[-18,38],"05":[-20,35],"06":[-5,38],"07":[-12,38],"08":[-15,35],"09":[-15,38],"10":[-15,35],"11":[-8,40],"12":[-15,36],"13":[-8,40],"14":[-10,33],"15":[-18,35],"16":[-10,37],"17":[-8,37],"18":[-12,36],"19":[-15,36],"2A":[-5,38],"2B":[-5,38],"21":[-15,36],"22":[-5,33],"23":[-15,35],"24":[-10,38],"25":[-18,35],"26":[-12,40],"27":[-10,35],"28":[-12,35],"29":[-5,32],"30":[-8,40],"31":[-10,38],"32":[-8,38],"33":[-8,38],"34":[-8,40],"35":[-8,35],"36":[-12,36],"37":[-10,37],"38":[-18,38],"39":[-18,36],"40":[-8,38],"41":[-12,37],"42":[-15,37],"43":[-18,35],"44":[-8,35],"45":[-12,37],"46":[-10,38],"47":[-8,38],"48":[-18,35],"49":[-8,36],"50":[-8,32],"51":[-15,35],"52":[-18,35],"53":[-8,35],"54":[-15,35],"55":[-15,35],"56":[-5,33],"57":[-15,35],"58":[-15,36],"59":[-12,35],"60":[-12,35],"61":[-10,35],"62":[-12,33],"63":[-15,36],"64":[-8,38],"65":[-12,38],"66":[-8,40],"67":[-18,36],"68":[-18,36],"69":[-15,38],"70":[-18,36],"71":[-15,37],"72":[-10,36],"73":[-20,35],"74":[-20,35],"75":[-12,36],"76":[-10,33],"77":[-12,36],"78":[-12,36],"79":[-8,37],"80":[-12,33],"81":[-10,38],"82":[-8,38],"83":[-5,40],"84":[-8,40],"85":[-8,35],"86":[-10,37],"87":[-12,36],"88":[-18,35],"89":[-15,36],"90":[-18,35],"91":[-12,36],"92":[-12,36],"93":[-12,36],"94":[-12,36],"95":[-12,36]};

// ═══ 2. TRIAL LIMITER (2 months) ═══
const TRIAL_DAYS = 60;
const TRIAL_START_KEY = 'sirius_clim_trial_start';
const UNLOCK_KEY = 'sirius_clim_unlocked';

function getTrialStart() {
  let start = localStorage.getItem(TRIAL_START_KEY);
  if (!start) { start = new Date().toISOString(); localStorage.setItem(TRIAL_START_KEY, start); }
  return new Date(start);
}
function getDaysRemaining() {
  const start = getTrialStart();
  const elapsed = Math.floor((Date.now() - start.getTime()) / (1000*60*60*24));
  return Math.max(0, TRIAL_DAYS - elapsed);
}
function isUnlocked() { return localStorage.getItem(UNLOCK_KEY) === 'true'; }
function unlock() { localStorage.setItem(UNLOCK_KEY, 'true'); }

function updateTrialBar() {
  const days = getDaysRemaining();
  const el = document.getElementById('trial-days');
  const fill = document.getElementById('usage-fill');
  const text = document.getElementById('trial-text');
  if (isUnlocked()) {
    const bar = document.getElementById('usage-bar');
    if (bar) bar.innerHTML = '<span>✅ <strong>Accès permanent</strong> — Code validé</span>';
    return;
  }
  if (el) el.textContent = days;
  if (fill) fill.style.width = (days / TRIAL_DAYS * 100) + '%';
  if (days <= 7 && text) text.style.color = '#c62828';
}

function checkTrialLimit() {
  if (isUnlocked()) return true;
  if (getDaysRemaining() <= 0) {
    document.getElementById('lead-gate').style.display = 'flex';
    return false;
  }
  return true;
}

function submitLeadForm(e) {
  e.preventDefault();
  const data = {
    email: document.getElementById('lead-email').value,
    phone: document.getElementById('lead-phone').value,
    company: document.getElementById('lead-company').value,
    job: document.getElementById('lead-job').value,
    tool: 'climatic-calc',
    timestamp: new Date().toISOString()
  };
  // Store locally (will be synced via webhook/n8n later)
  const leads = JSON.parse(localStorage.getItem('sirius_leads') || '[]');
  leads.push(data);
  localStorage.setItem('sirius_leads', JSON.stringify(leads));
  console.log('[SIRIUS] Lead captured:', data);

  // Show code gate
  document.getElementById('lead-gate').style.display = 'none';
  document.getElementById('code-gate').style.display = 'flex';
  return false;
}

function validateCode() {
  const code = document.getElementById('access-code').value.trim().toUpperCase();
  // Accept any code matching pattern XXXX-XXXX or the master code
  if (code === 'SIRI-2026' || code.match(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/)) {
    unlock();
    document.getElementById('code-gate').style.display = 'none';
    updateUsageBar();
  } else {
    document.getElementById('code-error').style.display = 'block';
  }
}

// ═══ 3. COMMUNE DATA ═══
let communeNeige = null, communeVent = null;
async function loadCommuneData() {
  try {
    const [n, v] = await Promise.all([fetch('zones_neige.json'), fetch('zones_vent.json')]);
    if (n.ok) communeNeige = await n.json();
    if (v.ok) communeVent = await v.json();
  } catch(e) {}
}
function norm(s) { return (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,'').trim(); }
function lookupZone(data, defaults, dept, commune) {
  if (data && data[dept]) {
    const cn = norm(commune);
    if (data[dept][cn]) return data[dept][cn];
    for (const [k, v] of Object.entries(data[dept])) { if (cn.includes(k) || k.includes(cn)) return v; }
  }
  return defaults[dept] || '?';
}

// ═══ 4. CALCULATIONS ═══
function calcSk(zone, alt) {
  const sk0 = NEIGE_SK0[zone]; if (!sk0) return 0;
  const A = Math.max(0, alt);
  if (A <= 200) return sk0;
  if (zone === "E") return sk0 + (A-200)/150;
  const d1={"A1":0.15,"A2":0.15,"B1":0.20,"B2":0.20,"C1":0.30,"C2":0.30,"D":0.45};
  if (A <= 500) return sk0 + (d1[zone]||0.20)*(A-200)/300;
  const sk500 = sk0 + (d1[zone]||0.20);
  const d2={"A1":0.35,"A2":0.35,"B1":0.45,"B2":0.45,"C1":0.55,"C2":0.55,"D":0.80};
  if (A <= 1000) return sk500 + (d2[zone]||0.45)*(A-500)/500;
  return sk500 + (d2[zone]||0.45) + (A-1000)*0.002;
}
function calcMu1(a) { a = Math.abs(a); if (a<=30) return 0.8; if (a>=60) return 0; return 0.8*(60-a)/30; }
function calcCr(catId, z) { const c=TERRAIN[catId]; if(!c) return 1; return c.kr*Math.log(Math.max(z,c.zmin)/c.z0); }
function calcQp(catId, z, vb0, c0) {
  const c=TERRAIN[catId]; if(!c) return null;
  const zeff=Math.max(z,c.zmin), cr=c.kr*Math.log(zeff/c.z0), vm=cr*(c0||1)*vb0;
  const Iv=1/((c0||1)*Math.log(zeff/c.z0));
  return Math.round((1+7*Iv)*0.5*1.225*vm*vm);
}

// ═══ 5. ALTITUDE & OROGRAPHY ═══
function offsetLL(lat,lon,b,d){const R=6371000;return[lat+(d*Math.cos(b*Math.PI/180))/R*180/Math.PI,lon+(d*Math.sin(b*Math.PI/180))/(R*Math.cos(lat*Math.PI/180))*180/Math.PI];}
async function fetchAlt(lat,lon){
  try{const r=await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat.toFixed(6)},${lon.toFixed(6)}`);if(r.ok){const d=await r.json();if(d?.results?.[0])return Math.round(d.results[0].elevation);}}catch(e){}
  try{const r=await fetch(`https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json?lat=${lat.toFixed(6)}&lon=${lon.toFixed(6)}&zonly=true`);if(r.ok){const d=await r.json();if(d?.elevations?.[0]>-999)return Math.round(d.elevations[0]);}}catch(e){}
  return 0;
}
async function calcOro(lat,lon,altSite,zBat){
  const locs=[];[0,90,180,270].forEach(d=>[500,1000].forEach(dist=>{const[pL,pN]=offsetLL(lat,lon,d,dist);locs.push(`${pL.toFixed(6)},${pN.toFixed(6)}`);}));
  try{
    const r=await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat.toFixed(6)},${lon.toFixed(6)}|${locs.join('|')}`);
    if(!r.ok)throw 0;const data=await r.json();if(!data?.results||data.results.length<9)throw 0;
    const Ac=Math.round(data.results[0].elevation),elev=data.results.slice(1).map(r=>Math.round(r.elevation));
    const Am=(2*Ac+elev.reduce((s,e)=>s+e,0))/10,dA=Ac-Am;
    return{c0:Math.max(1,Math.round((1+0.004*dA*Math.exp(-0.014*Math.max(0,(zBat||10)-10)))*100)/100),elev};
  }catch(e){return{c0:1.00,elev:[]};}
}

// ═══ 6. MAP ═══
let siteMap=null,siteMapZoom=null,siteMarker=null,siteCircle=null,oroMarkers=[];
let zoomMarker=null;
function addSatTiles(map){
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'© ESRI',maxZoom:19}).addTo(map);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',{maxZoom:19}).addTo(map);
}
function initMap(){
  if(!document.getElementById('site-map'))return;
  siteMap=L.map('site-map',{center:[46.6,2.5],zoom:6,scrollWheelZoom:true});
  addSatTiles(siteMap);
  siteMapZoom=L.map('site-map-zoom',{center:[46.6,2.5],zoom:8,scrollWheelZoom:true});
  addSatTiles(siteMapZoom);
}
function updateMap(lat,lon,alt){
  if(!siteMap)return;
  const zoomRegional=14, zoomClose=16;
  siteMap.setView([lat,lon],zoomRegional);
  siteMapZoom.setView([lat,lon],zoomClose);

  if(siteMarker)siteMap.removeLayer(siteMarker);
  siteMarker=L.marker([lat,lon]).addTo(siteMap).bindPopup(`<b>📍 Site</b><br>Alt. ${alt} m`).openPopup();
  if(zoomMarker)siteMapZoom.removeLayer(zoomMarker);
  zoomMarker=L.marker([lat,lon]).addTo(siteMapZoom).bindPopup(`<b>📍 Site</b><br>Alt. ${alt} m`).openPopup();

  if(siteCircle)siteMap.removeLayer(siteCircle);
  siteCircle=L.circle([lat,lon],{radius:1000,color:'#2998B2',weight:2,opacity:0.7,fillColor:'#2998B2',fillOpacity:0.08,dashArray:'6,4'}).addTo(siteMap);

  oroMarkers.forEach(m=>{siteMap.removeLayer(m);});oroMarkers=[];
  const colors=['#e53935','#fb8c00','#43a047','#1e88e5'],names=['N','E','S','W'];
  [0,90,180,270].forEach((d,i)=>[500,1000].forEach(dist=>{
    const[pL,pN]=offsetLL(lat,lon,d,dist);
    const m=L.circleMarker([pL,pN],{radius:dist===500?5:7,color:colors[i],weight:2,fillColor:colors[i],fillOpacity:0.5}).addTo(siteMap);
    m.bindTooltip(`${names[i]} ${dist}m`,{permanent:false,direction:'top'});oroMarkers.push(m);
  }));
  setTimeout(()=>{siteMap.invalidateSize();siteMapZoom.invalidateSize();siteMap.fitBounds(siteCircle.getBounds().pad(0.1));},300);
}

// ═══ 7. STATE ═══
let state={dept:'',commune:'',alt:0,lat:0,lon:0,zn:'?',zv:'?',sk:0,vb0:0,c0:1};
function setVal(id,v){const el=document.getElementById(id);if(el)el.textContent=v;}

// ═══ 8. ADDRESS LOOKUP ═══
function initAddressLookup(){
  const input=document.getElementById('addr-input'),sug=document.getElementById('addr-suggestions');
  let timer=null;
  input.addEventListener('input',function(){
    clearTimeout(timer);const q=this.value.trim();
    if(q.length<3){sug.style.display='none';return;}
    timer=setTimeout(()=>{
      document.getElementById('addr-spinner').style.display='block';
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=6`).then(r=>r.json()).then(data=>{
        document.getElementById('addr-spinner').style.display='none';sug.innerHTML='';
        if(!data.features?.length){sug.style.display='none';return;}
        data.features.forEach(f=>{const p=f.properties;const div=document.createElement('div');div.className='sug-item';
          div.innerHTML=`<strong>${p.label}</strong> <span style="color:#888;font-size:11px">${p.context||''}</span>`;
          div.addEventListener('click',()=>selectAddr(f));sug.appendChild(div);});
        sug.style.display='block';
      }).catch(()=>{sug.style.display='none';document.getElementById('addr-spinner').style.display='none';});
    },280);
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.input-group'))sug.style.display='none';});
}

async function selectAddr(feature){
  const p=feature.properties,[lon,lat]=feature.geometry.coordinates;
  document.getElementById('addr-input').value=p.label;
  document.getElementById('addr-suggestions').style.display='none';
  document.getElementById('addr-spinner').style.display='block';

  let dept=(p.citycode||'').substring(0,2);
  if(p.citycode?.startsWith('2A'))dept='2A';if(p.citycode?.startsWith('2B'))dept='2B';
  if(p.citycode?.length===5&&p.citycode.startsWith('97'))dept=p.citycode.substring(0,3);

  state.dept=dept;state.commune=p.city||p.label;state.lat=lat;state.lon=lon;
  state.alt=await fetchAlt(lat,lon);
  state.zn=lookupZone(communeNeige,NEIGE_DEFAULT,dept,state.commune);
  state.zv=lookupZone(communeVent,VENT_DEFAULT,dept,state.commune);
  state.sk=calcSk(state.zn,state.alt);state.vb0=VENT_VB0[state.zv]||0;

  setVal('val-commune',state.commune);setVal('det-commune',`Dept. ${dept} · CP ${p.postcode||'—'}`);
  setVal('val-alt',state.alt+'m');setVal('val-zn',state.zn);
  setVal('det-zn',`sk₀ = ${(NEIGE_SK0[state.zn]||0).toFixed(2)} kN/m²`);
  setVal('val-zv',state.zv);setVal('det-zv',`vb,0 = ${state.vb0} m/s`);
  const sz=SISMO_DEPT[dept]||'1';setVal('val-sismo',sz);setVal('det-sismo',SISMO_LABELS[sz]||'—');

  document.getElementById('zone-grid').style.display='grid';
  document.getElementById('map-container').style.display='block';
  updateMap(lat,lon,state.alt);

  const oro=await calcOro(lat,lon,state.alt,10);state.c0=oro.c0;
  document.getElementById('addr-spinner').style.display='none';
  document.getElementById('sec-params').style.display='block';
}

// ═══ 9. CALCULATION ═══
function doCalculation(){
  if(!checkTrialLimit())return;
  const z=parseFloat(document.getElementById('z-height').value)||10;
  const catId=document.getElementById('terrain-cat').value;
  const alpha=parseFloat(document.getElementById('roof-slope').value)||5;
  if(!catId){alert('Sélectionnez une catégorie de terrain.');return;}
  if(state.zn==='?'){alert('Saisissez d\'abord une adresse.');return;}

  const cat=TERRAIN[catId],cr=calcCr(catId,z),qp=calcQp(catId,z,state.vb0,state.c0);
  const mu1=calcMu1(alpha),s=mu1*state.sk;
  const sz=SISMO_DEPT[state.dept]||'1',agr=SISMO_AGR[sz]||0.4;
  const temps=TEMP_DEPT[state.dept]||[-12,36];
  const tmin=temps[0]-Math.round(state.alt*0.6/100),tmax=temps[1]-Math.round(state.alt*0.6/100);

  // Fill page 2
  setVal('r-zn',state.zn);setVal('r-sk0',(NEIGE_SK0[state.zn]||0).toFixed(2)+' kN/m²');
  setVal('r-alt',state.alt+' m');setVal('r-sk',state.sk.toFixed(2)+' kN/m²');
  setVal('r-mu1',mu1.toFixed(2)+` (α=${alpha}°)`);setVal('r-s',s.toFixed(2)+' kN/m²');
  setVal('r-zv',state.zv);setVal('r-vb0',state.vb0+' m/s');
  setVal('r-c0',state.c0.toFixed(2)+(state.c0<=1?' (plat)':' (relief)'));
  setVal('r-cat',catId+' — '+cat.label);
  setVal('r-z0zmin',cat.z0+'m / '+cat.zmin+'m');
  setVal('r-cr',cr.toFixed(3));setVal('r-qp',qp+' Pa ('+( qp/1000).toFixed(2)+' kN/m²)');
  setVal('r-sismo-zone',sz+' — '+(SISMO_LABELS[sz]||''));setVal('r-agr',agr.toFixed(1)+' m/s²');
  setVal('r-temp',tmin+'°C / '+tmax+'°C');
  setVal('r-dt-exp','+'+(tmax-10)+' °C');setVal('r-dt-con',(10-tmin)+' °C');

  // Copy project name to page 2
  const pn=document.getElementById('project-name').value||'—';
  setVal('hdr-project-p2',pn);

  // Show page 2
  document.getElementById('page2').style.display='block';
  document.getElementById('page2').scrollIntoView({behavior:'smooth',block:'start'});
}

// ═══ 10. INIT ═══
document.addEventListener('DOMContentLoaded',()=>{
  // Date
  const now=new Date();const dateStr=now.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'});
  document.getElementById('hdr-date').textContent=dateStr;
  const dp2=document.getElementById('hdr-date-p2');if(dp2)dp2.textContent=dateStr;

  loadCommuneData();initAddressLookup();initMap();updateTrialBar();
  document.getElementById('btn-calc').addEventListener('click',doCalculation);
});
