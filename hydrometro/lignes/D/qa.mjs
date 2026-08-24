import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";

const lineRoot = path.resolve(import.meta.dirname);
const projectRoot = path.resolve(lineRoot, "..", "..");
const stationIds = ["monotube", "bitube", "v3v", "equilibrage", "plancher"];
const expectedPlanHrefs = Object.fromEntries(stationIds.map((id) => [id, `../../index.html#visited=${id}`]));
const requiredStationFiles = ["index.html", "station.css", "station.js", "content.js", "manifest.json", "SOURCES.md", "QA.md", "_ETAT.md"];
let passed = 0;
let failed = 0;

function check(condition, label) {
  if (condition) { passed += 1; console.log(`OK  ${label}`); }
  else { failed += 1; console.error(`KO  ${label}`); }
}

const read = (file) => fs.readFileSync(file, "utf8");
const sha = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();
const accessibleSvg = (markup) => typeof markup === "string" && markup.includes("<svg") && markup.includes("<title") && markup.includes("<desc");

for (const id of stationIds) {
  const root = path.join(projectRoot, "stations", id);
  requiredStationFiles.forEach((name) => check(fs.existsSync(path.join(root, name)), `${id} : ${name} présent`));
  if (!fs.existsSync(path.join(root, "content.js"))) continue;
  const html = read(path.join(root, "index.html"));
  const css = read(path.join(root, "station.css"));
  const engine = read(path.join(root, "station.js"));
  const content = read(path.join(root, "content.js"));
  const manifest = JSON.parse(read(path.join(root, "manifest.json")));
  const sandbox = { window: {} };
  vm.runInNewContext(content, sandbox, { filename: `${id}/content.js` });
  const config = sandbox.window.STATION_CONFIG;

  check(manifest.id === id && manifest.status === "QA TECHNIQUE", `${id} : id stable et QA technique déclarée`);
  check(config?.id === id && config?.steps?.length === 5, `${id} : cinq tours de spirale`);
  check(config?.quiz?.length >= 3 && config?.quiz?.length <= 5, `${id} : 3 à 5 questions formatives`);
  check(config.quiz.every((q) => q.options.length >= 3 && Number.isInteger(q.correct) && q.explain), `${id} : réponses verrouillables et corrections argumentées`);
  check(config.steps.every((step) => step.tp && step.bts && step.equivalent && step.action), `${id} : différenciation TP/BTS et action par étape`);
  config.steps.forEach((step, index) => {
    const value = step.action?.value;
    const markup = typeof step.scene === "function" ? step.scene(value) : step.scene;
    check(accessibleSvg(markup), `${id} : SVG accessible étape ${index + 1}`);
    if (step.action?.type === "range") {
      const low = step.action.evaluate(step.action.min);
      const high = step.action.evaluate(step.action.max);
      check(low?.readout && low?.observation && high?.readout && high?.observation, `${id} : curseur borné et expliqué`);
      check(accessibleSvg(step.scene(step.action.min)) && accessibleSvg(step.scene(step.action.max)), `${id} : SVG dynamique aux deux bornes`);
    }
  });
  check(accessibleSvg(config.summaryScene) && config.summaryEquivalent, `${id} : synthèse accessible`);
  check(html.includes('lang="fr"') && html.includes("skip-link") && html.includes('data-level="TP"') && html.includes('data-level="BTS"'), `${id} : langue, évitement et niveaux`);
  check(html.includes("Ligne D · Distribution") && html.includes("../../index.html"), `${id} : identité D et retour au plan`);
  check(html.includes(`href="${expectedPlanHrefs[id]}"`), `${id} : retour Plan vers son jalon exact`);
  check(engine.includes('data-range-step="-1"') && engine.includes('data-range-step="1"'), `${id} : réglage au clavier/tactile par boutons moins et plus`);
  check(css.includes(".range-control") && css.includes(".range-step"), `${id} : commandes de réglage mises en forme`);
  check(css.includes(":focus-visible") && css.includes("100dvh") && css.includes("@media print"), `${id} : focus, plein écran et impression`);
  check(!/https?:\/\//i.test(html + css + engine + content) && !/@import/i.test(css), `${id} : aucune dépendance distante`);
  check(!/type\s*=\s*["']module/i.test(html) && !/\bfetch\s*\(|XMLHttpRequest|import\s*\(/.test(engine + content), `${id} : scripts compatibles avec une ouverture locale directe`);
  check(!/localStorage|sessionStorage|indexedDB/i.test(engine + content), `${id} : aucun stockage navigateur`);
  check(!/autoplay|speechSynthesis|new Audio\s*\(/i.test(engine + content + html), `${id} : aucun média automatique`);
}

const assetChecks = [
  ["stations/monotube/assets/radiateur.svg", "8E389957A1CF76394076EE1C653FA85C21BFE60D38AAF3BABF7D9C6FCA03BBA5"],
  ["stations/bitube/assets/radiateur.svg", "8E389957A1CF76394076EE1C653FA85C21BFE60D38AAF3BABF7D9C6FCA03BBA5"],
  ["stations/equilibrage/assets/radiateur.svg", "8E389957A1CF76394076EE1C653FA85C21BFE60D38AAF3BABF7D9C6FCA03BBA5"],
  ["stations/plancher/assets/collecteur.svg", "9C0FA5582BCDC61473846FBFBB516BC513A8583EB297E2DAFB4243F645FFE1FE"]
];
assetChecks.forEach(([relative, expected]) => {
  const file = path.join(projectRoot, relative);
  check(fs.existsSync(file) && sha(file) === expected, `copie SVG identique : ${relative}`);
  if (fs.existsSync(file)) check(read(file).includes("<title") && read(file).includes("<desc"), `SVG titré et décrit : ${relative}`);
});

const adaptedAssets = [
  ["stations/v3v/assets/vanne_3_voies.svg", "4219643845AB55B54E8B44A50571F44E6CF83A60413E14720E68A9CF7DC06137", "141C94D3C50CB71FDE7745017A847FDAB3657CD3E70F89E3CE4CB5A07BCBC37F"],
  ["stations/equilibrage/assets/vanne_manuelle.svg", "4155B5DC7EA5F4EEE5523E8F0460E4BF3F25E319588ED0358D7E3F1284CC5BCE", "494AF6B840AE6F0261BDD3A217B018E94153E89E3FA450FC838285B84A4A8902"],
  ["stations/plancher/assets/vanne_manuelle.svg", "00A5D1D0DAE322B1BAF1425ABE85B6936E5B74ABA6AD436F1079686A3FD11964", "494AF6B840AE6F0261BDD3A217B018E94153E89E3FA450FC838285B84A4A8902"]
];
adaptedAssets.forEach(([relative, localHash, sourceHash]) => {
  const file = path.join(projectRoot, relative);
  const sourceDoc = read(path.join(path.dirname(file), "..", "SOURCES.md"));
  check(fs.existsSync(file) && sha(file) === localHash, `adaptation accessible empreinte locale : ${relative}`);
  check(read(file).includes("<title") && read(file).includes("<desc"), `adaptation accessible titrée : ${relative}`);
  check(sourceDoc.includes(sourceHash) && sourceDoc.includes(localHash), `empreintes source et locale documentées : ${relative}`);
});

const lineFiles = ["parcours.html", "parcours.css", "parcours.js", "manifest.json", "SOURCES.md", "QA.md", "_ETAT.md", "INTEGRATION.md", "assets/README.md"];
lineFiles.forEach((name) => check(fs.existsSync(path.join(lineRoot, name)), `ligne D : ${name} présent`));
const lineHtml = read(path.join(lineRoot, "parcours.html"));
const lineCss = read(path.join(lineRoot, "parcours.css"));
const lineJs = read(path.join(lineRoot, "parcours.js"));
const lineManifest = JSON.parse(read(path.join(lineRoot, "manifest.json")));
const prefix = lineJs.split("  const els =")[0] + "\nwindow.__QA_ITEMS = items;\n})();";
const lineSandbox = { window: {} };
vm.runInNewContext(prefix, lineSandbox, { filename: "D/parcours.js#items" });
const items = lineSandbox.window.__QA_ITEMS;

check(lineManifest.stations.join(",") === "monotube,bitube,pertes,v3v,equilibrage,plancher", "ligne D : six jalons ordonnés");
check(lineManifest.status === "QA TECHNIQUE", "ligne D : QA technique déclarée");
check(lineManifest.interchanges.some((item) => item.station === "pertes" && item.ownership === "Ligne E" && item.mode === "lecture seule"), "ligne D : Pertes protégée en lecture seule");
check(lineHtml.includes('../../stations/pertes/index.html') && !fs.existsSync(path.join(projectRoot, "stations", "pertes", "content-D.js")), "ligne D : correspondance Pertes référencée sans copie");
check(items.length === 12, "ligne D : 12 activités finales");
check(items.slice(0, 3).every((item) => item.category.includes("Lecture")), "ligne D : trois lectures de schéma");
check(items.slice(3, 6).every((item) => /Appliquer|Classer/.test(item.category)), "ligne D : trois classements ou applications");
check(items.slice(6, 8).every((item) => /Mesurer|Calculer/.test(item.category)), "ligne D : deux mesures ou calculs");
check(items.slice(8, 10).every((item) => item.category.includes("Cause")), "ligne D : deux relations de cause à effet");
check(items.slice(10, 12).every((item) => /Décider|diagnostic/i.test(item.category)), "ligne D : deux décisions ou mini-diagnostics");
check(items.every((item) => accessibleSvg(item.scene) && item.equivalent && item.tp && item.bts && item.explain), "ligne D : 12 SVG accessibles, équivalents et deux profondeurs");
check(items.filter((item) => !item.numeric).every((item) => item.options.length === 4 && Number.isInteger(item.correct)), "ligne D : choix complets et corrigés");
check(items.filter((item) => item.numeric).length === 2 && items.filter((item) => item.numeric).every((item) => item.numeric.unit && Number.isFinite(item.numeric.value)), "ligne D : deux calculs avec unité");
check(["monotube", "bitube", "pertes", "v3v", "equilibrage", "plancher"].every((id) => items.some((item) => item.station === id && item.essential)), "ligne D : six familles essentielles suivies");
check(lineHtml.includes('lang="fr"') && lineHtml.includes("skip-link") && lineHtml.includes('data-level="TP"') && lineHtml.includes('data-level="BTS"'), "ligne D : langue, évitement et niveaux");
check(lineCss.includes(":focus-visible") && lineCss.includes("100dvh") && lineCss.includes("@media print"), "ligne D : focus, plein écran et impression");
check(!/https?:\/\//i.test(lineHtml + lineCss + lineJs) && !/@import/i.test(lineCss), "ligne D : aucune dépendance distante");
check(!/type\s*=\s*["']module/i.test(lineHtml) && !/\bfetch\s*\(|XMLHttpRequest|import\s*\(/.test(lineJs), "ligne D : scripts compatibles avec une ouverture locale directe");
check(!/localStorage|sessionStorage|indexedDB|autoplay|speechSynthesis/i.test(lineHtml + lineJs), "ligne D : aucun stockage ni média automatique");
const integration = read(path.join(lineRoot, "INTEGRATION.md"));
check(integration.includes("Intégration exécutée") && integration.includes("modules.js") && integration.includes("app.js") && integration.includes("stations/pertes/"), "ligne D : intégration centrale exécutée et limites consignées");

console.log(`\nRÉSULTAT LIGNE D : ${passed} contrôle(s) réussi(s), ${failed} échec(s).`);
if (failed) process.exit(1);
