/* =====================================================================
   poser-les-missions.mjs — branche la couche « carnet » sur les stations
   ---------------------------------------------------------------------
   1. Pour chaque station qui a un mission.json valide : pose dans son
      index.html la feuille et le script du moteur de missions
      (moteur-legislation/missions.css, missions.js), encadrés de balises
      <!-- missions:... --> pour pouvoir les retrouver. Rien d'autre n'est touché.
      Sans mission.json : retire proprement ce qu'il avait posé.
   2. Recalcule moteur-legislation/carnet-data.json (progression + plan +
      résumés des missions) que lit carnet.html. Source unique : le
      tableau RESEAU de index.html et progression.json ; jamais saisi ici.

   Idempotent : relancer sans rien changer ne modifie aucun fichier.

   Usage : node legislation/outils/poser-les-missions.mjs            (toutes les stations)
           node legislation/outils/poser-les-missions.mjs aptitude-capacite fgaz-3   (certaines seulement)
   ===================================================================== */
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const STATIONS = join(RACINE, "stations");
const DONNEES = join(RACINE, "moteur-legislation", "carnet-data.json");
const seulement = process.argv.slice(2);

const CSS = '<!-- missions:css --><link rel="stylesheet" href="../../moteur-legislation/missions.css"><!-- /missions:css -->';
const JS = '<!-- missions:js --><script src="../../moteur-legislation/missions.js" defer></script><!-- /missions:js -->';
const RE_CSS = /(\r?\n)?[ \t]*<!-- missions:css -->[\s\S]*?<!-- \/missions:css -->/;
const RE_JS = /(\r?\n)?[ \t]*<!-- missions:js -->[\s\S]*?<!-- \/missions:js -->/;

function missionValide(dossier) {
  const f = join(dossier, "mission.json");
  if (!existsSync(f)) return { etat: "absente" };
  try { return { etat: "ok", json: JSON.parse(readFileSync(f, "utf8")) }; }
  catch (e) { return { etat: "illisible", erreur: e.message }; }
}

/* ---------- 1. les balises dans chaque station ---------- */
let poses = 0, deja = 0, retirees = 0, sans = 0, ignorees = 0;
for (const slug of readdirSync(STATIONS)) {
  if (seulement.length && !seulement.includes(slug)) continue;
  const dossier = join(STATIONS, slug);
  const f = join(dossier, "index.html");
  if (!statSync(dossier).isDirectory() || !existsSync(f)) continue;
  const m = missionValide(dossier);
  if (m.etat === "illisible") { console.log(`mission.json illisible, station laissée telle quelle : ${slug} (${m.erreur})`); ignorees++; continue; }

  const h = readFileSync(f, "utf8");
  const nl = h.includes("\r\n") ? "\r\n" : "\n";
  let h2 = h;

  if (m.etat === "ok") {
    if (!RE_CSS.test(h2)) h2 = h2.replace(/<\/head>/i, (x) => CSS + nl + x);
    if (!RE_JS.test(h2)) h2 = h2.replace(/<\/body>/i, (x) => JS + nl + x);
    if (!RE_CSS.test(h2) || !RE_JS.test(h2)) { console.log(`</head> ou </body> introuvable : ${slug}`); ignorees++; continue; }
    if (h2 === h) deja++; else { writeFileSync(f, h2); poses++; }
  } else {
    h2 = h2.replace(RE_CSS, "").replace(RE_JS, "");
    if (h2 !== h) { writeFileSync(f, h2); retirees++; } else sans++;
  }
}
console.log(`missions posées : ${poses} · déjà posées : ${deja} · retirées : ${retirees} · sans mission.json : ${sans}` +
  (ignorees ? ` · ignorées : ${ignorees}` : ""));

/* ---------- 2. les données du carnet ---------- */
const plan = readFileSync(join(RACINE, "index.html"), "utf8");
const debut = plan.indexOf("var RESEAU = [");
const fin = plan.indexOf("\n  ];", debut);
if (debut < 0 || fin < 0) { console.error("Tableau RESEAU introuvable dans index.html — carnet-data.json non recalculé."); process.exit(1); }
const RESEAU = vm.runInNewContext("(" + plan.slice(debut + "var RESEAU = ".length, fin + 4) + ")");
const progression = JSON.parse(readFileSync(join(RACINE, "progression.json"), "utf8"));

const sousLignes = [];
for (const mere of RESEAU) {
  for (const fille of mere.filles) {
    const stations = fille.stations.map((s) => {
      const slug = s.href ? s.href.replace(/^stations\//, "").replace(/\/$/, "") : null;
      let mission = null;
      if (slug && existsSync(join(STATIONS, slug))) {
        const m = missionValide(join(STATIONS, slug));
        if (m.etat === "ok") {
          mission = { titre: m.json.titre, badge: m.json.badge, duree_min: m.json.duree_min };
        }
      }
      return { nom: s.nom, sous: s.sous, slug, mission };
    });
    sousLignes.push({ id: fille.id, ico: fille.ico, nom: fille.nom, sous: fille.sous, couleur: fille.couleur,
      ligne_mere: mere.nom, stations });
  }
}
const donnees = {
  _role: "Généré par outils/poser-les-missions.mjs depuis index.html (RESEAU), progression.json et les mission.json. Ne pas éditer.",
  entreprise: progression.entreprise,
  fil_rouge: progression.fil_rouge,
  periodes: progression.periodes,
  tampons: progression.tampons,
  sous_lignes: sousLignes,
};
const json = JSON.stringify(donnees, null, 1) + "\n";
if (!existsSync(DONNEES) || readFileSync(DONNEES, "utf8") !== json) {
  writeFileSync(DONNEES, json);
  console.log("carnet-data.json recalculé");
} else console.log("carnet-data.json inchangé");
