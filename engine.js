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
const SISMO_LABELS={'1':'Très faible','2':'Faible','3':'Modérée','4':'Moyenne','5':'Forte'};
const SOIL_S={'A':1.0,'B':1.2,'C':1.15,'D':1.35,'E':1.4}; // EC8 Tab. 3.2 (Type 1)
const GAMMA_I={'I':0.8,'II':1.0,'III':1.2,'IV':1.4}; // EC8 Tab. 4.3
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
  // IGN RGE ALTI en primaire (précision 1m, fiable en France)
  try{const r=await fetch(`https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json?lat=${lat.toFixed(6)}&lon=${lon.toFixed(6)}&zonly=true`);if(r.ok){const d=await r.json();if(d?.elevations?.[0]>-999)return Math.round(d.elevations[0]);}}catch(e){}
  // Fallback open-elevation (SRTM ~30m)
  try{const r=await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat.toFixed(6)},${lon.toFixed(6)}`);if(r.ok){const d=await r.json();if(d?.results?.[0])return Math.round(d.results[0].elevation);}}catch(e){}
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

// ═══ 6. MAP (IGN Géoportail + multi-couches) ═══
let siteMap=null,siteMapZoom=null,siteMarker=null,siteCircle=null,oroMarkers=[],oroLegend=null;
let zoomMarker=null;

function createLayers(defaultSat){
  const planIGN = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    {attribution:'© IGN',maxZoom:19,minZoom:2});
  const topoScan25 = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    {attribution:'© IGN Scan25',maxZoom:18,minZoom:2});
  const orthoIGN = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    {attribution:'© IGN Orthophotos',maxZoom:20,minZoom:2});
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution:'© OpenStreetMap',maxZoom:19});
  const cadastre = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    {attribution:'© IGN Cadastre',maxZoom:20,minZoom:2,opacity:0.6});
  return {
    bases: {'🗺️ Plan IGN':planIGN,'🏔️ Topo (Scan25)':topoScan25,'🛰️ Satellite IGN':orthoIGN,'🌍 OpenStreetMap':osm},
    overlays: {'📐 Cadastre':cadastre},
    defaultBase: defaultSat ? orthoIGN : planIGN
  };
}

function createSiteIcon(){
  return L.divIcon({
    className:'site-marker-icon',
    html:'<div class="site-pin"><div class="site-pin-inner">📍</div><div class="site-pin-pulse"></div></div>',
    iconSize:[36,36],iconAnchor:[18,36],popupAnchor:[0,-36]
  });
}

function initMap(){
  if(!document.getElementById('site-map'))return;
  // Carte 1 — Vue régionale (Plan IGN par défaut)
  const layers1=createLayers(false);
  siteMap=L.map('site-map',{center:[46.6,2.5],zoom:6,scrollWheelZoom:true,zoomControl:false});
  layers1.defaultBase.addTo(siteMap);
  L.control.zoom({position:'topright'}).addTo(siteMap);
  L.control.layers(layers1.bases,layers1.overlays,{position:'topleft',collapsed:true}).addTo(siteMap);
  L.control.scale({imperial:false,position:'bottomleft'}).addTo(siteMap);

  // Carte 2 — Vue rapprochée (Satellite IGN par défaut)
  const layers2=createLayers(true);
  siteMapZoom=L.map('site-map-zoom',{center:[46.6,2.5],zoom:8,scrollWheelZoom:true,zoomControl:false});
  layers2.defaultBase.addTo(siteMapZoom);
  L.control.zoom({position:'topright'}).addTo(siteMapZoom);
  L.control.layers(layers2.bases,layers2.overlays,{position:'topleft',collapsed:true}).addTo(siteMapZoom);
  L.control.scale({imperial:false,position:'bottomleft'}).addTo(siteMapZoom);
}

function updateMap(lat,lon,alt){
  if(!siteMap)return;
  const zoomRegional=14, zoomClose=17;
  siteMap.setView([lat,lon],zoomRegional);
  siteMapZoom.setView([lat,lon],zoomClose);

  const popupHtml=`<div style="font-family:Inter,sans-serif;font-size:12px;line-height:1.6;min-width:150px">
    <div style="font-weight:700;font-size:13px;color:#0C122F;margin-bottom:3px">📍 Site du projet</div>
    <div><span style="color:#5D7380">Alt.</span> <strong>${alt} m</strong></div>
    <div><span style="color:#5D7380">Lat</span> ${lat.toFixed(5)}°</div>
    <div><span style="color:#5D7380">Lon</span> ${lon.toFixed(5)}°</div>
  </div>`;

  // Marqueur carte régionale
  if(siteMarker)siteMap.removeLayer(siteMarker);
  siteMarker=L.marker([lat,lon],{icon:createSiteIcon()}).addTo(siteMap).bindPopup(popupHtml,{maxWidth:200}).openPopup();

  // Marqueur carte rapprochée
  if(zoomMarker)siteMapZoom.removeLayer(zoomMarker);
  zoomMarker=L.marker([lat,lon],{icon:createSiteIcon()}).addTo(siteMapZoom).bindPopup(popupHtml,{maxWidth:200}).openPopup();

  // Cercle orographique 1km (carte régionale uniquement)
  if(siteCircle)siteMap.removeLayer(siteCircle);
  siteCircle=L.circle([lat,lon],{radius:1000,color:'#2998B2',weight:2,opacity:0.7,fillColor:'#2998B2',fillOpacity:0.06,dashArray:'8,6'}).addTo(siteMap);

  // Points orographiques (carte régionale uniquement)
  oroMarkers.forEach(m=>{siteMap.removeLayer(m);});oroMarkers=[];
  const dirs=[{b:0,name:'N',color:'#e53935'},{b:90,name:'E',color:'#fb8c00'},{b:180,name:'S',color:'#43a047'},{b:270,name:'O',color:'#1e88e5'}];
  dirs.forEach(dir=>[500,1000].forEach(dist=>{
    const[pL,pN]=offsetLL(lat,lon,dir.b,dist);
    const m=L.circleMarker([pL,pN],{radius:dist===500?5:7,color:dir.color,weight:2.5,fillColor:dir.color,fillOpacity:0.4}).addTo(siteMap);
    m.bindTooltip(`<span style="font-weight:600;font-size:11px">${dir.name} · ${dist}m</span>`,{permanent:dist===1000,direction:'top',className:'oro-tooltip'});
    oroMarkers.push(m);
  }));

  // Légende orographique (carte régionale)
  if(oroLegend)siteMap.removeControl(oroLegend);
  oroLegend=L.control({position:'bottomright'});
  oroLegend.onAdd=function(){
    const d=L.DomUtil.create('div','oro-legend');
    d.innerHTML=`<div class="oro-legend-title">Orographie c₀(z)</div>
      <div class="oro-legend-row"><span class="oro-dot" style="background:#e53935"></span> Nord</div>
      <div class="oro-legend-row"><span class="oro-dot" style="background:#fb8c00"></span> Est</div>
      <div class="oro-legend-row"><span class="oro-dot" style="background:#43a047"></span> Sud</div>
      <div class="oro-legend-row"><span class="oro-dot" style="background:#1e88e5"></span> Ouest</div>
      <div class="oro-legend-sub">⊙ 500m &nbsp; ◉ 1000m</div>`;
    return d;
  };
  oroLegend.addTo(siteMap);

  // Vent dominant — Open-Meteo (async, non-bloquant)
  fetchWindRose(lat,lon);

  // Afficher source
  const src=document.getElementById('map-source'); if(src) src.style.display='block';

  setTimeout(()=>{siteMap.invalidateSize();siteMapZoom.invalidateSize();siteMap.fitBounds(siteCircle.getBounds().pad(0.15));},300);
}

// ═══ 6b. VENT DOMINANT (Open-Meteo) ═══
let windControl=null, windArrow=null, windArrowHead=null;
const WIND_SECTORS=['N','NE','E','SE','S','SO','O','NO'];

async function fetchWindRose(lat,lon){
  try{
    // 30 ans d'historique ERA5 — cohérent avec période de retour 50 ans (Eurocode)
    const end=new Date(); const start=new Date(); start.setFullYear(start.getFullYear()-30);
    const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const nbYears=30;
    const url=`https://archive-api.open-meteo.com/v1/archive?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&start_date=${fmt(start)}&end_date=${fmt(end)}&daily=wind_direction_10m_dominant,wind_speed_10m_max&timezone=Europe/Paris&models=era5_seamless`;
    const r=await fetch(url); if(!r.ok) throw 0;
    const data=await r.json();
    if(!data.daily?.wind_direction_10m_dominant) throw 0;

    const dirs=data.daily.wind_direction_10m_dominant;
    const speeds=data.daily.wind_speed_10m_max||[];
    const n=dirs.length;

    // Calculer fréquences par secteur (8 secteurs de 45°)
    const freq=[0,0,0,0,0,0,0,0]; // N,NE,E,SE,S,SO,O,NO
    const avgSpeed=[0,0,0,0,0,0,0,0];
    let validCount=0;
    dirs.forEach((d,i)=>{
      if(d===null||d===undefined) return;
      const sector=Math.round(((d%360)+360)%360/45)%8;
      freq[sector]++;
      if(speeds[i]) avgSpeed[sector]+=speeds[i];
      validCount++;
    });
    if(validCount<30) return; // pas assez de données

    // Normaliser
    const maxFreq=Math.max(...freq);
    const pct=freq.map(f=>Math.round(f/validCount*100));
    const norm=freq.map(f=>f/maxFreq);
    avgSpeed.forEach((s,i)=>{ if(freq[i]>0) avgSpeed[i]=s/freq[i]; });

    // Direction dominante
    const domIdx=freq.indexOf(maxFreq);
    const domAngle=domIdx*45;
    const domName=WIND_SECTORS[domIdx];
    const domPct=pct[domIdx];
    const domSpeed=avgSpeed[domIdx];

    // Dessiner rose des vents (SVG) sur la carte régionale
    const yearsData=Math.round(validCount/365);
    drawWindRose(norm,pct,domName,domPct,domSpeed,yearsData);

    // Flèche vent dominant sur la carte rapprochée
    drawWindArrow(lat,lon,domAngle,domName,domPct,domSpeed);

  }catch(e){console.log('[SIRIUS] Wind data unavailable:',e);}
}

function drawWindRose(norm,pct,domName,domPct,domSpeed,yearsData){
  if(windControl) siteMap.removeControl(windControl);
  windControl=L.control({position:'topleft'});
  windControl.onAdd=function(){
    const d=L.DomUtil.create('div','wind-rose-ctrl');
    const size=130, cx=size/2, cy=size/2, maxR=50;
    // SVG rose des vents
    let svg=`<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    // Cercles de référence
    [0.25,0.5,0.75,1].forEach(r=>{
      svg+=`<circle cx="${cx}" cy="${cy}" r="${maxR*r}" fill="none" stroke="#d0d7de" stroke-width="0.5" stroke-dasharray="2,2"/>`;
    });
    // Axes
    for(let i=0;i<8;i++){
      const a=(i*45-90)*Math.PI/180;
      svg+=`<line x1="${cx}" y1="${cy}" x2="${cx+maxR*Math.cos(a)}" y2="${cy+maxR*Math.sin(a)}" stroke="#d0d7de" stroke-width="0.5"/>`;
    }
    // Polygone de fréquence
    let pts='';
    norm.forEach((n,i)=>{
      const a=(i*45-90)*Math.PI/180;
      const r=Math.max(0.08,n)*maxR;
      pts+=`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)} `;
    });
    svg+=`<polygon points="${pts}" fill="rgba(41,152,178,0.25)" stroke="#2998B2" stroke-width="1.5"/>`;
    // Labels secteurs
    WIND_SECTORS.forEach((name,i)=>{
      const a=(i*45-90)*Math.PI/180;
      const lr=maxR+10;
      const bold=i===norm.indexOf(Math.max(...norm));
      svg+=`<text x="${cx+lr*Math.cos(a)}" y="${cy+lr*Math.sin(a)}" text-anchor="middle" dominant-baseline="central" font-size="${bold?10:8}" font-weight="${bold?700:400}" fill="${bold?'#0C122F':'#5D7380'}" font-family="Inter,sans-serif">${name}</text>`;
    });
    svg+='</svg>';

    d.innerHTML=`<div class="wind-rose-title">🌬️ Rose des vents</div>
      ${svg}
      <div class="wind-rose-info">
        <div class="wind-rose-dom"><strong>${domName}</strong> dominant · ${domPct}%</div>
        <div class="wind-rose-src">ERA5 · ${yearsData||30} ans</div>
      </div>`;
    L.DomEvent.disableClickPropagation(d);
    L.DomEvent.disableScrollPropagation(d);
    return d;
  };
  windControl.addTo(siteMap);
}

let windZoomLegend=null;

function drawWindArrow(lat,lon,angle,name,pct,speed){
  // Flèche sur la carte rapprochée montrant d'où vient le vent
  if(windArrow) siteMapZoom.removeLayer(windArrow);
  if(windArrowHead) siteMapZoom.removeLayer(windArrowHead);

  const arrowLen=60; // mètres — adapté au zoom 17
  // Le vent VIENT de cette direction, donc la flèche pointe VERS le site
  const fromAngle=angle;
  const[fromLat,fromLon]=offsetLL(lat,lon,fromAngle,arrowLen);

  windArrow=L.polyline([[fromLat,fromLon],[lat,lon]],{
    color:'#e53935',weight:3,opacity:0.8,dashArray:'6,4'
  }).addTo(siteMapZoom);

  // Pointe de flèche (triangle au site)
  const headLen=15;
  const[h2Lat,h2Lon]=offsetLL(lat,lon,(fromAngle+30)%360,headLen*0.6);
  const[h3Lat,h3Lon]=offsetLL(lat,lon,(fromAngle-30+360)%360,headLen*0.6);
  windArrowHead=L.polygon([[h2Lat,h2Lon],[lat,lon],[h3Lat,h3Lon]],{
    color:'#e53935',weight:2,fillColor:'#e53935',fillOpacity:0.6
  }).addTo(siteMapZoom);

  // Tooltip au hover seulement (ne cache pas le bâtiment)
  windArrow.bindTooltip(`🌬️ Vent dominant : <strong>${name}</strong> (${pct}%)`,
    {permanent:false,direction:'top',className:'oro-tooltip'});

  // Légende compacte en coin (ne gêne pas la vue)
  if(windZoomLegend) siteMapZoom.removeControl(windZoomLegend);
  windZoomLegend=L.control({position:'bottomright'});
  windZoomLegend.onAdd=function(){
    const d=L.DomUtil.create('div','wind-zoom-legend');
    d.innerHTML=`<div class="wind-zoom-row">🌬️ <strong>${name}</strong> · ${pct}%</div>
      <div class="wind-zoom-sub">Direction dominante · ERA5 30 ans</div>`;
    return d;
  };
  windZoomLegend.addTo(siteMapZoom);
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

  // P6 — Bouton GPS
  const gpsBtn=document.getElementById('btn-gps');
  if(gpsBtn) gpsBtn.addEventListener('click',geolocateMe);
}

// ═══ 8b. GÉOLOCALISATION GPS ═══
async function geolocateMe(){
  const btn=document.getElementById('btn-gps');
  if(!navigator.geolocation){alert('Géolocalisation non disponible sur ce navigateur.');return;}
  btn.textContent='⏳';btn.disabled=true;
  navigator.geolocation.getCurrentPosition(async pos=>{
    const lat=pos.coords.latitude,lon=pos.coords.longitude;
    try{
      const r=await fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${lat.toFixed(6)}&lon=${lon.toFixed(6)}&limit=1`);
      if(r.ok){
        const data=await r.json();
        if(data.features?.length){
          document.getElementById('addr-input').value=data.features[0].properties.label;
          await selectAddr(data.features[0]);
        }
      }
    }catch(e){console.log('[SIRIUS] Reverse geocode failed:',e);}
    btn.textContent='📍';btn.disabled=false;
  },err=>{
    alert('Position GPS indisponible. Vérifiez les permissions de localisation.');
    btn.textContent='📍';btn.disabled=false;
  },{enableHighAccuracy:true,timeout:10000});
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
  state.citycode=p.citycode||'';

  setVal('val-commune',state.commune);setVal('det-commune',`Dept. ${dept} · CP ${p.postcode||'—'}`);
  setVal('val-alt',state.alt+'m');setVal('val-zn',state.zn);
  setVal('det-zn',`sk₀ = ${(NEIGE_SK0[state.zn]||0).toFixed(2)} kN/m²`);
  setVal('val-zv',state.zv);setVal('det-zv',`vb,0 = ${state.vb0} m/s`);

  // P7 — Sismique communale Géorisques (async, fallback départemental)
  const szDept=SISMO_DEPT[dept]||'1';
  setVal('val-sismo',szDept);setVal('det-sismo',SISMO_LABELS[szDept]||'—');
  state.sismoSrc='département';
  state.sismoZone=szDept;
  fetchGeorisquesSismo(p.citycode,dept);

  document.getElementById('zone-grid').style.display='grid';
  document.getElementById('map-container').style.display='block';
  updateMap(lat,lon,state.alt);

  const oro=await calcOro(lat,lon,state.alt,10);state.c0=oro.c0;
  document.getElementById('addr-spinner').style.display='none';
  document.getElementById('sec-params').style.display='block';
}

// ═══ 8c. GÉORISQUES SISMIQUE COMMUNALE ═══
async function fetchGeorisquesSismo(citycode,dept){
  if(!citycode) return;
  try{
    const r=await fetch(`https://www.georisques.gouv.fr/api/v1/zonage_sismique?code_insee=${citycode}&rayon=0`);
    if(!r.ok) throw 0;
    const data=await r.json();
    if(data?.data?.length){
      const geo=data.data[0];
      const zoneGeo=geo.code_zone;
      state.sismoZone=zoneGeo;
      state.sismoSrc=`Géorisques (commune ${geo.libelle_commune})`;
      setVal('val-sismo',zoneGeo);
      setVal('det-sismo',(SISMO_LABELS[zoneGeo]||'—')+' ✓');
      // Alerter si différence avec le département
      const szDept=SISMO_DEPT[dept]||'1';
      if(zoneGeo!==szDept){
        setVal('det-sismo',(SISMO_LABELS[zoneGeo]||'')+` ⚠️ (dept: ${szDept})`);
      }
    }
  }catch(e){console.log('[SIRIUS] Géorisques API unavailable, fallback département');}
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
  const sz=state.sismoZone||SISMO_DEPT[state.dept]||'1',agr=SISMO_AGR[sz]||0.4;
  const soilClass=document.getElementById('soil-class').value;
  const soilS=SOIL_S[soilClass]||1.0;
  const importCat=document.getElementById('import-cat').value;
  const gammaI=GAMMA_I[importCat]||1.0;
  const temps=TEMP_DEPT[state.dept]||[-12,36];
  // P9 — Gradients thermiques affinés (AN EN 1991-1-5)
  const tmin=temps[0]-Math.round(state.alt*0.65/100),tmax=temps[1]-Math.round(state.alt*0.6/100);

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
  setVal('r-import-cat',importCat+' (γᵢ='+gammaI.toFixed(1)+')');
  setVal('r-soil',soilClass+' — S = '+soilS.toFixed(2));
  setVal('r-soil-s',(agr*gammaI*soilS).toFixed(2)+' m/s² (aₒₓ·γᵢ·S)');
  const srcEl=document.getElementById('r-sismo-src');
  if(srcEl) srcEl.innerHTML=`<em style="font-size:9px;color:#999">📍 Source : ${state.sismoSrc||'département'} — Classe de sol à confirmer par étude géotechnique</em>`;
  setVal('r-temp',tmin+'°C / '+tmax+'°C');
  setVal('r-dt-exp','+'+(tmax-10)+' °C');setVal('r-dt-con',(10-tmin)+' °C');

  // Copy project name to page 2
  const pn=document.getElementById('project-name').value||'—';
  setVal('hdr-project-p2',pn);

  // P5 — Sauvegarder dans l'historique
  saveToHistory({date:new Date().toLocaleDateString('fr-FR'),affaire:pn,commune:state.commune,dept:state.dept,alt:state.alt,
    zn:state.zn,zv:state.zv,sk:state.sk.toFixed(2),s:s.toFixed(2),qp:qp,sismo:sz,lat:state.lat,lon:state.lon,
    catId,alpha,z});
  renderHistory();

  // Show page 2 + print button
  document.getElementById('page2').style.display='block';
  document.getElementById('btn-print').style.display='inline-block';
  document.getElementById('page2').scrollIntoView({behavior:'smooth',block:'start'});
}

// ═══ 10. HISTORIQUE (localStorage) ═══
const HISTORY_KEY='sirius_clim_history';
const HISTORY_MAX=20;

function getHistory(){ return JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]'); }

function saveToHistory(entry){
  const h=getHistory();
  h.unshift(entry);
  if(h.length>HISTORY_MAX) h.length=HISTORY_MAX;
  localStorage.setItem(HISTORY_KEY,JSON.stringify(h));
}

function renderHistory(){
  const container=document.getElementById('history-section');
  const tbody=document.getElementById('history-body');
  if(!container||!tbody) return;
  const h=getHistory();
  if(!h.length){container.style.display='none';return;}
  container.style.display='block';
  tbody.innerHTML='';
  h.forEach((e,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${e.date}</td><td class="hist-affaire">${e.affaire||'—'}</td><td>${e.commune} (${e.dept})</td><td>${e.alt}m</td><td>${e.sk}</td><td>${(e.qp/1000).toFixed(2)}</td><td>${e.sismo}</td>
      <td><button class="hist-load" onclick="loadHistory(${i})" title="Recharger">↩️</button></td>`;
    tbody.appendChild(tr);
  });
}

function loadHistory(idx){
  const h=getHistory();
  const e=h[idx]; if(!e) return;
  // Remplir les champs et simuler une recherche
  document.getElementById('project-name').value=e.affaire||'';
  document.getElementById('addr-input').value=`${e.commune} (${e.dept})`;
  // Construire un faux feature pour selectAddr
  const fakeFeature={properties:{label:`${e.commune}`,city:e.commune,citycode:e.dept+'000',postcode:'',context:''},
    geometry:{coordinates:[e.lon,e.lat]}};
  selectAddr(fakeFeature).then(()=>{
    document.getElementById('z-height').value=e.z||10;
    document.getElementById('terrain-cat').value=e.catId||'IIIb';
    document.getElementById('roof-slope').value=e.alpha||5;
  });
}

function clearHistory(){
  if(!confirm('Effacer tout l\'historique ?')) return;
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

// ═══ 11. INIT ═══
document.addEventListener('DOMContentLoaded',()=>{
  // Date
  const now=new Date();const dateStr=now.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit',year:'numeric'});
  document.getElementById('hdr-date').textContent=dateStr;
  const dp2=document.getElementById('hdr-date-p2');if(dp2)dp2.textContent=dateStr;

  loadCommuneData();initAddressLookup();initMap();updateTrialBar();
  document.getElementById('btn-calc').addEventListener('click',doCalculation);
  renderHistory();
});
