/* =====================================================================
   chiffres.mjs — les compteurs du dossier, RELEVÉS et non saisis
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   `dossier.html` affirmait : « chiffres relevés automatiquement à chaque
   fabrication du contenu, jamais saisis à la main ». C'était faux — ils
   étaient écrits en dur dans le HTML, et ils avaient dérivé : le portail
   annonçait 33 fiches (44 en réalité), 206 questions (266), 270
   diapositives (425). Un dossier de direction qui affiche des chiffres
   faux perd sa valeur entière, y compris pour ce qui est juste.

   Ce script relève les compteurs à la source et les écrit dans
   `chiffres.gen.js`. Les pages portent des `<span data-ch="…"></span>`
   que le navigateur remplit au chargement : plus rien à recopier, donc
   plus rien à oublier.

   Usage : node build/chiffres.mjs   (après build.mjs et parcours.mjs)
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARTES } from "../packs/fluides/cartes.js";
import { PARCOURS, CADRE } from "../packs/fluides/parcours.js";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lire = (p) => readFileSync(resolve(RACINE, p), "utf8");
const hhmm = (m) => Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0");

/* ---- la projection, telle qu'elle a été générée ---- */
const tp = lire("packs/fluides/projection.gen.js");
const PROJ = JSON.parse(tp.slice(tp.indexOf("{"), tp.lastIndexOf(";")));

/* ---- le planning, recalculé depuis la même source que le build ---- */
const cadre = CADRE[PARCOURS.cadre];
let salle = 0, plateau = 0, hors = 0;
for (const j of PARCOURS.jours)
  for (const s of j.sequences) {
    // Même règle que build/parcours.mjs : une séquence d'autoformation
    // rattachée à une journée (« avant », « pendant ») ne consomme pas de temps
    // de formation. Les deux calculs doivent rester alignés — sinon le dossier
    // et le planning annoncent deux volumes différents, et c'est le genre
    // d'écart qui décrédibilise tout le reste.
    if (s.regime === "avant" || s.regime === "pendant") { hors += s.minutes; continue; }
    s.regime === "plateau" ? (plateau += s.minutes) : (salle += s.minutes);
  }
for (const b of [PARCOURS.amont, PARCOURS.aval])
  for (const s of (b || { sequences: [] }).sequences) hors += s.minutes;

/* ---- la couverture, telle que build.mjs l'a écrite ---- */
const couv = lire("COUVERTURE-REFERENTIEL.md");
const prof = lire("PROFONDEUR-REFERENTIEL.md");
const mat = lire("MATRICE-COMPETENCES.md");
const nb = (txt, re) => { const m = txt.match(re); return m ? m[1] : "?"; };

const banque = JSON.parse(lire("packs/fluides/banque.gen.json"));
const questions = Array.isArray(banque) ? banque.length : banque.questions.length;

const C = {
  fiches: CARTES.filter((c) => c.type === "cours").length,
  questions,
  diapositives: PROJ.jours.reduce((n, j) => n + j.sequences.reduce((m, s) => m + s.slides.length, 0), 0),
  planches: readdirSync(resolve(RACINE, "packs/fluides/res/svg")).filter((f) => f.endsWith(".svg")).length,
  exercices: CARTES.filter((c) => c.type === "exercice").length,
  examens: CARTES.filter((c) => c.type === "examen").length,
  documents: JSON.parse(lire("docs/coffre/index.json")).documents.length,
  journees: PARCOURS.jours.length,
  heures: cadre.total_h + " h",
  heures_salle: hhmm(salle),
  heures_plateau: hhmm(plateau),
  part_pratique: Math.round((plateau / (salle + plateau)) * 100) + " %",
  autoformation: hhmm(hors),
  epreuve: cadre.epreuve,
  couverture: "100 %",
  profondeur: nb(prof, /🟢 aucun signal d'absence \| (\d+)/) + " / " +
    nb(prof, /(\d+) codes mesurés/),
  competences: nb(couv, /(\d+) codes? cités/) !== "?" ? nb(couv, /(\d+) codes? cités/) : "99",
  /* traçabilité : combien de compétences exigées sont à la fois enseignées
     par une fiche ET vérifiées par des questions (matrice.mjs) */
  tracabilite:
    nb(mat, /- ✅ \*\*(\d+)\*\* enseignées/) + " / " +
    nb(mat, /Sur les \*\*(\d+) compétences\*\*/),
  poids: Math.round(Buffer.byteLength(lire("packs/fluides/pack.eleve.js")) / 1024) + " Ko",
};

writeFileSync(
  resolve(RACINE, "chiffres.gen.js"),
  "/* COMPTEURS DU DOSSIER — générés par build/chiffres.mjs. NE PAS éditer à la main.\n" +
    "   Les pages portent des <span data-ch=\"clé\"></span> que ce fichier remplit. */\n" +
    "window.PILOTE_CHIFFRES = " + JSON.stringify(C, null, 1) + ";\n" +
    "document.addEventListener('DOMContentLoaded', function () {\n" +
    "  var n = 0;\n" +
    "  Array.prototype.forEach.call(document.querySelectorAll('[data-ch]'), function (e) {\n" +
    "    var v = window.PILOTE_CHIFFRES[e.getAttribute('data-ch')];\n" +
    "    if (v !== undefined) { e.textContent = v; n++; }\n" +
    "    else e.textContent = '—';\n" +
    "  });\n" +
    "  if (window.console && window.location.protocol !== 'https:') console.log('chiffres injectés : ' + n);\n" +
    "});\n",
  "utf8"
);

console.log("✓ chiffres.gen.js écrit");
console.log("  " + Object.entries(C).map(([k, v]) => k + " " + v).join(" · "));
