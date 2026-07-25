/* =====================================================================
   profondeur.mjs — mesure la PROFONDEUR d'enseignement, code par code
   ---------------------------------------------------------------------
   CONTRAT — la couverture (build.mjs) mesure qu'un code est CITÉ par une
   fiche ; ce module mesure qu'il est TENU : les notions que le libellé
   officiel énumère se retrouvent-elles dans le contenu que l'élève lit ?
   C'est la systématisation de la méthode qui a trouvé le trou des huiles
   (5.04/5.08/6.01/6.05 revendiqués, zéro occurrence de « POE »).

   ENTRÉES  packs/fluides/profondeur-attendus.json (l'instrument),
            packs/fluides/cartes.js, build/referentiel.mjs
   SORTIE   PROFONDEUR-REFERENTIEL.md + résumé console
   USAGE    node build/profondeur.mjs [--strict]   (--strict : exit 1 si 🔴)

   ASYMÉTRIE ASSUMÉE — l'absence de tout motif prouve le trou (fiable) ;
   la présence ne prouve pas la qualité. On mesure des trous, rien d'autre.

   PIÈGES · le corpus est le contenu VISIBLE DE L'ÉLÈVE (titre, corps,
   blocs, question) — jamais notes_pilote (purgées du build élève), jamais
   criteres[].libelle (auto-satisfaction : le critère paraphrase le libellé
   qu'on cherche). · Un motif trop générique rend l'instrument aveugle :
   tout motif présent dans > 40 % des cartes est dénoncé en annexe.
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARTES, PACK_META } from "../packs/fluides/cartes.js";
import { resoudre, codesRequis } from "./referentiel.mjs";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INSTRUMENT = JSON.parse(
  readFileSync(resolve(RACINE, "packs/fluides/profondeur-attendus.json"), "utf8")
);
const ATTENDUS = INSTRUMENT.attendus;
const STRICT = process.argv.includes("--strict");

/* ---------------------------------------------------------------------
   1. CORPUS — le texte que l'élève voit, normalisé pour la recherche :
   minuscules, accents supprimés, indices chimiques dépliés, HTML retiré.
   --------------------------------------------------------------------- */
function normaliser(txt) {
  return String(txt)
    .replace(/<[^>]+>/g, " ")
    .replace(/₀/g, "0").replace(/₁/g, "1").replace(/₂/g, "2")
    .replace(/₃/g, "3").replace(/₄/g, "4")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    // les balises retirées laissent des espaces doubles qui font échouer
    // les motifs à plusieurs mots (« conduite de  liquide ») — on replie
    .replace(/\s+/g, " ");
}

function corpusDe(carte) {
  const morceaux = [carte.titre || "", carte.corps || ""];
  for (const b of carte.blocs || []) morceaux.push(b.t || "", b.html || "");
  if (carte.question) {
    const q = carte.question;
    morceaux.push(q.enonce || "", ...(q.choix || []), q.explication || "");
  }
  return normaliser(morceaux.join(" \n "));
}

const DECLARANTES = CARTES.filter((c) => (c.criteres || []).length);
const CORPUS = new Map(DECLARANTES.map((c) => [c.id, corpusDe(c)]));

/* ---------------------------------------------------------------------
   2. COMPLÉTUDE DE L'INSTRUMENT — un code exigé absent de l'instrument
   serait un angle mort ; un code inconnu au référentiel, une coquille.
   --------------------------------------------------------------------- */
const err = [];
const requis = new Set();
for (const cat of PACK_META.categories) for (const i of codesRequis(cat)) requis.add(i.code);

for (const code of requis)
  if (!ATTENDUS[code]) err.push("code exigé sans décomposition dans l'instrument : " + code);
for (const code of Object.keys(ATTENDUS)) {
  if (!resoudre(code)) err.push("instrument : code « " + code + " » inexistant au référentiel");
  if (!requis.has(code)) err.push("instrument : code « " + code + " » hors du périmètre A1/A2/D/E");
  for (const n of ATTENDUS[code])
    if (!n.notion || !Array.isArray(n.motifs) || !n.motifs.length)
      err.push("instrument " + code + " : notion sans libellé ou sans motif");
}
if (err.length) {
  console.error("✗ instrument invalide :\n  - " + err.join("\n  - "));
  process.exit(1);
}

/* ---------------------------------------------------------------------
   3. MESURE — pour chaque code : les fiches qui le déclarent, et pour
   chaque notion du libellé, le premier motif rencontré (ou rien).
   --------------------------------------------------------------------- */
const resultats = [];
for (const [code, notions] of Object.entries(ATTENDUS)) {
  const fiches = DECLARANTES.filter((c) => c.criteres.some((cr) => cr.code === code));
  const texte = fiches.map((f) => CORPUS.get(f.id)).join(" \n ");
  const detail = notions.map((n) => {
    const motif = n.motifs.find((m) => new RegExp(m, "i").test(texte));
    return { notion: n.notion, tenue: !!motif, motif: motif || null };
  });
  const tenues = detail.filter((d) => d.tenue).length;
  resultats.push({
    code,
    officiel: resoudre(code).officiel,
    groupe: resoudre(code).groupe,
    fiches: fiches.map((f) => f.id),
    detail,
    verdict: !fiches.length || tenues === 0 ? "rouge" : tenues < detail.length ? "orange" : "vert",
  });
}
const rouges = resultats.filter((r) => r.verdict === "rouge");
const oranges = resultats.filter((r) => r.verdict === "orange");
const verts = resultats.filter((r) => r.verdict === "vert");

/* ---------------------------------------------------------------------
   4. GARDE D'HONNÊTETÉ — un motif présent dans plus de 40 % des cartes
   déclarantes ne détecte plus rien : il dit « oui » à tout le monde.
   On le dénonce plutôt que de laisser croire à une mesure.
   --------------------------------------------------------------------- */
const aveugles = [];
const tousMotifs = new Map(); // motif → codes qui l'utilisent
for (const [code, notions] of Object.entries(ATTENDUS))
  for (const n of notions)
    for (const m of n.motifs)
      (tousMotifs.get(m) || tousMotifs.set(m, []).get(m)).push(code);
for (const [m, codes] of tousMotifs) {
  const re = new RegExp(m, "i");
  const touches = DECLARANTES.filter((c) => re.test(CORPUS.get(c.id))).length;
  const part = touches / DECLARANTES.length;
  if (part > 0.4) aveugles.push({ motif: m, part: Math.round(part * 100), codes: [...new Set(codes)] });
}
aveugles.sort((a, b) => b.part - a.part);

/* ---------------------------------------------------------------------
   5. RAPPORT
   --------------------------------------------------------------------- */
const L = [];
L.push("# Profondeur d'enseignement — le code est-il tenu, pas seulement cité ?");
L.push("");
L.push("> Généré par `node build/profondeur.mjs` — ne pas éditer à la main.");
L.push("> Instrument : `packs/fluides/profondeur-attendus.json` v" + INSTRUMENT._meta.version +
  " (" + INSTRUMENT._meta.statut + ").");
L.push(">");
L.push("> **Lecture honnête** : 🔴 et 🟠 sont fiables — le vocabulaire de la notion est absent");
L.push("> des fiches qui revendiquent le code, donc la notion n'y est pas enseignée. 🟢 signifie");
L.push("> seulement **« aucun signal d'absence »** — pas une preuve de qualité. Cette mesure");
L.push("> trouve des trous ; seule la relecture métier juge le contenu.");
L.push("");
L.push("| Verdict | Codes | |");
L.push("|---|---:|---|");
L.push("| 🔴 cité mais non tenu | " + rouges.length + " | aucune notion du libellé détectée |");
L.push("| 🟠 partiellement tenu | " + oranges.length + " | au moins une notion manquante |");
L.push("| 🟢 aucun signal d'absence | " + verts.length + " | toutes les notions détectées |");
L.push("");
const bloc = (liste, titre) => {
  if (!liste.length) return;
  L.push("## " + titre);
  L.push("");
  for (const r of liste) {
    const manque = r.detail.filter((d) => !d.tenue).map((d) => "« " + d.notion + " »");
    L.push("### " + r.code + " — " + (r.fiches.join(", ") || "aucune fiche déclarante"));
    L.push("");
    L.push("> " + r.officiel.slice(0, 220) + (r.officiel.length > 220 ? "…" : ""));
    L.push("");
    L.push("Notions absentes : " + manque.join(" · "));
    L.push("");
  }
};
bloc(rouges, "🔴 Cités mais non tenus — " + rouges.length + " code(s)");
bloc(oranges, "🟠 Partiellement tenus — " + oranges.length + " code(s)");
if (aveugles.length) {
  L.push("## ⚠️ Motifs aveugles — l'instrument ne mesure rien avec eux");
  L.push("");
  L.push("Présents dans plus de 40 % des cartes : ils valident sans discriminer.");
  L.push("À remplacer par un vocabulaire plus spécifique dans l'instrument.");
  L.push("");
  for (const a of aveugles)
    L.push("- `" + a.motif + "` — " + a.part + " % des cartes (utilisé par " + a.codes.join(", ") + ")");
  L.push("");
}
L.push("---");
L.push("");
L.push("*" + resultats.length + " codes mesurés (union A1∪A2∪D∪E) · " +
  resultats.reduce((s, r) => s + r.detail.length, 0) + " notions sentinelles · corpus = contenu visible de l'élève " +
  "(titre, corps, blocs, question), hors notes formateur et hors libellés de critères.*");
L.push("");
writeFileSync(resolve(RACINE, "PROFONDEUR-REFERENTIEL.md"), L.join("\n"), "utf8");

console.log("profondeur : " + resultats.length + " codes — 🔴 " + rouges.length +
  " · 🟠 " + oranges.length + " · 🟢 " + verts.length +
  (aveugles.length ? " · ⚠️ " + aveugles.length + " motif(s) aveugle(s)" : ""));
console.log("→ PROFONDEUR-REFERENTIEL.md");
if (STRICT && rouges.length) {
  console.error("✗ --strict : des codes sont cités sans être tenus");
  process.exit(1);
}
