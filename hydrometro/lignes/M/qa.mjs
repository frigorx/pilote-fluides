import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";

const lineRoot=path.resolve(import.meta.dirname);
const projectRoot=path.resolve(lineRoot,"..","..");
const stationIds=["releves","tampon","decouplage","diagnostic","mission"];
const required=["index.html","station.css","station.js","content.js","manifest.json","SOURCES.md","QA.md","_ETAT.md"];
let passed=0,failed=0;
function check(condition,label){if(condition){passed+=1;console.log(`OK  ${label}`);}else{failed+=1;console.error(`KO  ${label}`);}}
const read=file=>fs.readFileSync(file,"utf8");
const hash=file=>crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();
const accessible=markup=>typeof markup==="string"&&markup.includes("<svg")&&markup.includes("<title")&&markup.includes("<desc");

for(const id of stationIds){
  const root=path.join(projectRoot,"stations",id);
  required.forEach(name=>check(fs.existsSync(path.join(root,name)),`${id} : ${name} présent`));
  const html=read(path.join(root,"index.html")),css=read(path.join(root,"station.css")),engine=read(path.join(root,"station.js")),content=read(path.join(root,"content.js"));
  const manifest=JSON.parse(read(path.join(root,"manifest.json")));
  const sandbox={window:{}};vm.runInNewContext(content,sandbox,{filename:`${id}/content.js`});const config=sandbox.window.STATION_CONFIG;
  check(manifest.id===id&&manifest.status==="QA TECHNIQUE",`${id} : manifeste et statut`);
  check(config?.steps?.length===5,`${id} : cinq tours de spirale`);
  check(config?.quiz?.length>=3&&config?.quiz?.length<=5,`${id} : 3 à 5 questions`);
  check(config.quiz.every(q=>q.options.length>=3&&Number.isInteger(q.correct)&&q.explain),`${id} : quiz verrouillable et expliqué`);
  check(config.steps.every(step=>step.tp&&step.bts&&step.equivalent&&step.action),`${id} : niveaux et action sur chaque étape`);
  config.steps.forEach((step,index)=>{
    let initial=step.action?.value;
    if(step.action?.type==="dual-range")initial=Object.fromEntries(step.action.controls.map(control=>[control.id,control.value]));
    const scene=typeof step.scene==="function"?step.scene(initial):step.scene;
    check(accessible(scene),`${id} : SVG accessible étape ${index+1}`);
    if(step.action?.type==="range"){
      const low=step.action.evaluate(step.action.min),high=step.action.evaluate(step.action.max);
      check(low?.readout&&low?.observation&&high?.readout&&high?.observation,`${id} : curseur bornes et unités`);
      check(accessible(step.scene(step.action.min))&&accessible(step.scene(step.action.max)),`${id} : scène dynamique aux bornes`);
    }
    if(step.action?.type==="dual-range"){
      const a=Object.fromEntries(step.action.controls.map(c=>[c.id,c.min])),b=Object.fromEntries(step.action.controls.map(c=>[c.id,c.max]));
      check(step.action.evaluate(a)?.observation&&step.action.evaluate(b)?.observation,`${id} : doubles curseurs évalués`);
      check(accessible(step.scene(a))&&accessible(step.scene(b)),`${id} : scènes doubles curseurs`);
    }
  });
  check(accessible(config.summaryScene),`${id} : SVG de synthèse accessible`);
  check(html.includes('lang="fr"')&&html.includes("skip-link")&&html.includes('data-level="TP"')&&html.includes('data-level="BTS"'),`${id} : langue, évitement et niveaux`);
  check(css.includes(":focus-visible")&&css.includes("100dvh")&&css.includes("@media print"),`${id} : focus, plein écran et impression`);
  check(!/https?:\/\//i.test(html+css+engine+content)&&!/@import/i.test(css),`${id} : aucune dépendance distante`);
  check(!/localStorage|sessionStorage|indexedDB/i.test(engine+content),`${id} : aucun stockage navigateur`);
  check(!/autoplay|speechSynthesis|new Audio\s*\(/i.test(engine+content+html),`${id} : aucun média automatique`);
  check(html.includes(`../../index.html#visited=${id}`)&&html.indexOf("content.js")<html.indexOf("station.js"),`${id} : retour plan et ordre des scripts`);
}

const assetHashes={
  "stations/tampon/assets/ballon-tampon.svg":"1DC4C3433CC8AACB0375735890E20C6A7F3950B0CAEDA546928CBDBAC81A59D6",
  "stations/decouplage/assets/pompe_debit_variable.svg":"CAE9C213C2B8C40CC8DE62561E72E051BBA0B8EDB268897A03C66FF000189DEC",
  "stations/diagnostic/assets/radiateur.svg":"1B6F945227EC6E60DA65E2F0ACF36D1156EF4CD90A183D623F1CCECC7DB0AEE3",
  "stations/diagnostic/assets/vanne_manuelle.svg":"A4ED67FFC5F62FF2875B14365B91555B883564D81F8097B8FADBFD70CD45ED6E",
  "stations/mission/assets/collecteur.svg":"0D5714A7B32A91249CDE699C95C3503FDB71D8DC57CC462A203DCF9C38B2D227",
  "stations/mission/assets/radiateur.svg":"1B6F945227EC6E60DA65E2F0ACF36D1156EF4CD90A183D623F1CCECC7DB0AEE3",
  "stations/mission/assets/vanne_manuelle.svg":"3F73A4F5D3CBFF930D6FB6F312EC03C2CA2BA991E733B82A62B9C8A0A4CA9E79"
};
Object.entries(assetHashes).forEach(([relative,expected])=>{const file=path.join(projectRoot,relative);check(fs.existsSync(file)&&hash(file)===expected,`empreinte locale : ${relative}`);});

const lineFiles=["parcours.html","parcours.css","parcours.js","manifest.json","SOURCES.md","QA.md","_ETAT.md","INTEGRATION.md"];
lineFiles.forEach(name=>check(fs.existsSync(path.join(lineRoot,name)),`ligne M : ${name} présent`));
const lineHtml=read(path.join(lineRoot,"parcours.html")),lineCss=read(path.join(lineRoot,"parcours.css")),lineJs=read(path.join(lineRoot,"parcours.js")),manifest=JSON.parse(read(path.join(lineRoot,"manifest.json")));
const prefix=lineJs.split("  const els=")[0]+"\nwindow.__QA_ITEMS=items;\n})();";const lineSandbox={window:{}};vm.runInNewContext(prefix,lineSandbox,{filename:"M/parcours.js#items"});const items=lineSandbox.window.__QA_ITEMS;
check(manifest.stations.join(",")==="mesurer,releves,equilibrage,tampon,decouplage,diagnostic,mission","ligne M : sept jalons ordonnés");
check(lineJs.includes('id:"mesurer"')&&lineJs.includes('id:"equilibrage"')&&lineJs.includes("../../stations/${station.id}/index.html"),"ligne M : deux correspondances référencées sans copie");
const balancingRoot=path.join(projectRoot,"stations","equilibrage");
if(fs.existsSync(path.join(balancingRoot,"index.html"))){
  const balancingManifest=JSON.parse(read(path.join(balancingRoot,"manifest.json")));
  check(balancingManifest.id==="equilibrage"&&balancingManifest.status==="QA TECHNIQUE"&&lineJs.includes("Correspondance D · QA technique"),"ligne M : station D QA technique référencée en lecture seule");
}else{
  check(lineJs.includes("Correspondance D en cours"),"ligne M : jalon D en cours explicite");
}
check(items.length===12,"ligne M : 12 activités finales");
check(items.slice(0,3).every(item=>item.category.includes("Lecture")),"ligne M : trois lectures de schéma");
check(items.slice(3,6).every(item=>/Classer|Appliquer/.test(item.category)),"ligne M : trois classements ou applications");
check(items.slice(6,8).every(item=>/Mesurer|Calculer/.test(item.category)),"ligne M : deux mesures ou calculs");
check(items.slice(8,10).every(item=>item.category.includes("Cause")),"ligne M : deux relations de cause à effet");
check(items.slice(10,12).every(item=>/Décider|diagnostic/i.test(item.category)),"ligne M : deux décisions ou diagnostics");
check(items.every(item=>item.options.length===4&&Number.isInteger(item.correct)&&item.explain&&item.tp&&item.bts),"ligne M : activités complètes aux deux niveaux");
check(items.every(item=>accessible(item.scene)&&item.equivalent),"ligne M : 12 SVG accessibles et textes équivalents");
check(["releves","tampon","decouplage","diagnostic","mission"].every(f=>items.some(item=>item.station===f&&item.essential)),"ligne M : familles essentielles suivies");
check(manifest.finalAssessment.itemCount===12&&manifest.finalAssessment.indicativeAcquiredThreshold===0.7,"ligne M : seuil et compte contractuels");
check(lineHtml.includes('lang="fr"')&&lineHtml.includes("skip-link")&&lineHtml.includes('data-level="TP"')&&lineHtml.includes('data-level="BTS"'),"ligne M : langue, évitement et niveaux");
check(lineCss.includes(":focus-visible")&&lineCss.includes("100dvh")&&lineCss.includes("@media print"),"ligne M : focus, plein écran et impression");
check(!/https?:\/\//i.test(lineHtml+lineCss+lineJs)&&!/@import/i.test(lineCss),"ligne M : aucune dépendance distante");
check(!/localStorage|sessionStorage|indexedDB|autoplay|speechSynthesis/i.test(lineHtml+lineJs),"ligne M : aucun stockage ni média automatique");
const integration=read(path.join(lineRoot,"INTEGRATION.md"));
const centralModules=read(path.join(projectRoot,"modules.js"));
check(integration.includes("Intégration centrale effectuée")&&["releves","tampon","decouplage","diagnostic","mission"].every(id=>centralModules.includes(`${id}: { href: \"stations/${id}/index.html\", owner: \"M\"`))&&centralModules.includes('M: { href: "lignes/M/parcours.html"')&&integration.includes("Aucune publication"),"ligne M : intégration centrale documentée et raccordée");

console.log(`\nRÉSULTAT LIGNE M : ${passed} contrôle(s) réussi(s), ${failed} échec(s).`);
if(failed)process.exit(1);
