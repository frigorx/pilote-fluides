import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";

const lineRoot = path.resolve(import.meta.dirname);
const projectRoot = path.resolve(lineRoot, "..", "..");
const stationIds = ["production", "echangeur", "circulateur", "pertes", "vase", "securite"];
const requiredStationFiles = ["index.html", "station.css", "station.js", "content.js", "manifest.json", "SOURCES.md", "QA.md", "_ETAT.md"];
let passed = 0;
let failed = 0;

function check(condition, label) {
  if (condition) { passed += 1; console.log(`OK  ${label}`); }
  else { failed += 1; console.error(`KO  ${label}`); }
}
const read = (file) => fs.readFileSync(file, "utf8");
const hash = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();
const hasAccessibleSvg = (markup) => typeof markup === "string" && markup.includes("<svg") && markup.includes("<title") && markup.includes("<desc");

for (const id of stationIds) {
  const root = path.join(projectRoot, "stations", id);
  requiredStationFiles.forEach((name) => check(fs.existsSync(path.join(root, name)), `${id} : ${name} présent`));
  const html = read(path.join(root, "index.html"));
  const css = read(path.join(root, "station.css"));
  const engine = read(path.join(root, "station.js"));
  const content = read(path.join(root, "content.js"));
  const manifest = JSON.parse(read(path.join(root, "manifest.json")));
  const sandbox = { window: {} };
  vm.runInNewContext(content, sandbox, { filename: `${id}/content.js` });
  const config = sandbox.window.STATION_CONFIG;

  check(manifest.id === id && manifest.status === "QA TECHNIQUE", `${id} : manifeste QA TECHNIQUE et id stable`);
  check(config?.steps?.length === 5, `${id} : cinq tours de spirale`);
  check(config?.quiz?.length >= 3 && config?.quiz?.length <= 5, `${id} : 3 à 5 questions formatives`);
  check(config.quiz.every((question) => question.options.length >= 3 && Number.isInteger(question.correct) && question.explain), `${id} : quiz verrouillable et corrigé`);
  check(config.steps.every((step) => step.tp && step.bts && step.equivalent && step.action), `${id} : profondeur TP/BTS et action par étape`);

  config.steps.forEach((step, index) => {
    const initial = step.action?.value;
    const scene = typeof step.scene === "function" ? step.scene(initial) : step.scene;
    check(hasAccessibleSvg(scene), `${id} : SVG accessible étape ${index + 1}`);
    if (step.action?.type === "range") {
      const low = step.action.evaluate(step.action.min);
      const high = step.action.evaluate(step.action.max);
      check(low?.readout && low?.observation && high?.readout && high?.observation, `${id} : curseur bornes min/max`);
      check(hasAccessibleSvg(step.scene(step.action.min)) && hasAccessibleSvg(step.scene(step.action.max)), `${id} : SVG dynamique aux deux bornes`);
    }
  });
  check(hasAccessibleSvg(config.summaryScene), `${id} : SVG accessible de synthèse`);
  check(html.includes('lang="fr"') && html.includes("skip-link") && html.includes('data-level="TP"') && html.includes('data-level="BTS"'), `${id} : langue, évitement et niveaux`);
  check(css.includes(":focus-visible") && css.includes("100dvh") && css.includes("@media print"), `${id} : focus, plein écran et impression`);
  check(!/https?:\/\//i.test(html + css + engine + content) && !/@import/i.test(css), `${id} : aucune dépendance distante`);
  check(!/localStorage|sessionStorage|indexedDB/i.test(engine + content), `${id} : aucun stockage navigateur`);
  check(!/autoplay|speechSynthesis|new Audio\s*\(/i.test(engine + content + html), `${id} : aucun média automatique`);
  check(html.includes("../../index.html") && html.indexOf("content.js") < html.indexOf("station.js"), `${id} : retour au plan et ordre des scripts`);
}

const expectedHashes = {
  "stations/echangeur/assets/echangeur_a_plaques.svg": "B3A24B048C1E6664CADE0BB96057525A945E352FBF1F40285CBF76BE31C2A588",
  "stations/circulateur/assets/pompe_debit_variable.svg": "25607A88A03E9C706F2FA4DF3F03D1141DEB4A4CC0161F26DD0B30B3625A5D27",
  "stations/pertes/assets/vanne_manuelle.svg": "494AF6B840AE6F0261BDD3A217B018E94153E89E3FA450FC838285B84A4A8902",
  "stations/pertes/assets/filtre_hydraulique.svg": "C0789103667CA8DD639296DA2F59787D1C1CF3E821BDAB3A1049EB2D0B698CD9",
  "stations/vase/assets/vase-expansion.svg": "0AF533D761BB2BC00A61419767052BFFA3A4498DB05F9C21F0135DA82C38DEAE",
  "stations/securite/assets/soupape-securite.svg": "26F4D373977150E5718C17DFDB2667281E44C0E49F6B71D92DAD6B491EDEA7DE"
};
Object.entries(expectedHashes).forEach(([relative, expected]) => {
  const file = path.join(projectRoot, relative);
  check(fs.existsSync(file) && hash(file) === expected, `empreinte conservée : ${relative}`);
});

const lineFiles = ["parcours.html", "parcours.css", "parcours.js", "manifest.json", "SOURCES.md", "QA.md", "_ETAT.md", "INTEGRATION.md"];
lineFiles.forEach((name) => check(fs.existsSync(path.join(lineRoot, name)), `ligne E : ${name} présent`));
const lineHtml = read(path.join(lineRoot, "parcours.html"));
const lineCss = read(path.join(lineRoot, "parcours.css"));
const lineJs = read(path.join(lineRoot, "parcours.js"));
const lineManifest = JSON.parse(read(path.join(lineRoot, "manifest.json")));
const testPrefix = lineJs.split("  const els=")[0] + "\nwindow.__QA_ITEMS = items;\n})();";
const lineSandbox = { window: {} };
vm.runInNewContext(testPrefix, lineSandbox, { filename: "E/parcours.js#items" });
const items = lineSandbox.window.__QA_ITEMS;

check(lineManifest.stations.join(",") === "production,echangeur,debit,circulateur,pertes,vase,securite", "ligne E : sept jalons ordonnés");
check(lineJs.includes('id:"debit"') && lineJs.includes("../../stations/${station.id}/index.html"), "ligne E : débit référencé sans copie");
check(items.length === 12, "ligne E : 12 activités finales");
check(items.slice(0, 3).every((item) => item.category.includes("Lecture")), "ligne E : trois lectures de schéma");
check(items.slice(3, 6).every((item) => /Classer|Appliquer/.test(item.category)), "ligne E : trois classements ou applications");
check(items.slice(6, 8).every((item) => /Mesurer|Calculer/.test(item.category)), "ligne E : deux mesures ou calculs");
check(items.slice(8, 10).every((item) => item.category.includes("Cause")), "ligne E : deux relations de cause à effet");
check(items.slice(10, 12).every((item) => /Décider|diagnostic/i.test(item.category)), "ligne E : deux décisions ou diagnostics");
check(items.every((item) => item.options.length === 4 && Number.isInteger(item.correct) && item.explain && item.tp && item.bts), "ligne E : activités complètes aux deux niveaux");
check(items.every((item) => hasAccessibleSvg(item.scene) && item.equivalent), "ligne E : 12 SVG accessibles et texte équivalent");
check(["echangeur", "circulateur", "securite"].every((family) => items.some((item) => item.station === family && item.essential)), "ligne E : familles essentielles suivies");
check(lineManifest.finalAssessment.itemCount === 12 && lineManifest.finalAssessment.indicativeAcquiredThreshold === 0.7, "ligne E : seuil et compte contractuels");
check(lineHtml.includes('lang="fr"') && lineHtml.includes("skip-link") && lineHtml.includes('data-level="TP"') && lineHtml.includes('data-level="BTS"'), "ligne E : langue, évitement et niveaux");
check(lineCss.includes(":focus-visible") && lineCss.includes("100dvh") && lineCss.includes("@media print"), "ligne E : focus, plein écran et impression");
check(!/https?:\/\//i.test(lineHtml + lineCss + lineJs) && !/@import/i.test(lineCss), "ligne E : aucune dépendance distante");
check(!/localStorage|sessionStorage|indexedDB|autoplay|speechSynthesis/i.test(lineHtml + lineJs), "ligne E : aucun stockage ni média automatique");
const integration = read(path.join(lineRoot, "INTEGRATION.md"));
check(integration.includes("Réalisé le 23 août 2026") && integration.includes("modules.js") && integration.includes("Aucune publication"), "ligne E : intégration centrale documentée sans publication");

console.log(`\nRÉSULTAT LIGNE E : ${passed} contrôle(s) réussi(s), ${failed} échec(s).`);
if (failed) process.exit(1);
