/* =====================================================================
   matrice.mjs — la MATRICE DE TRAÇABILITÉ compétence × contenu × question
   ---------------------------------------------------------------------
   CE QU'ELLE RÉPOND — pour chaque compétence de l'arrêté du 21/11/2025
   (annexe II.B, 136 codes) : où est-ce enseigné, et où est-ce vérifié ?
   C'est la pièce qu'un organisme évaluateur doit pouvoir montrer :
   « voilà ce que j'enseigne, voilà où, voilà comment je le contrôle. »

   POURQUOI UN SCRIPT ET PAS UN TABLEAU SAISI — tout existe déjà comme
   donnée : les `criteres[]` des cartes, le champ `code` des questions, le
   référentiel. Un tableau recopié à la main serait faux au premier
   déplacement de contenu, et personne ne le saurait.

   ENTRÉES  packs/fluides/cartes.js · packs/fluides/banque.gen.json
            packs/fluides/referentiel-2025.json (pour l'ordre de l'arrêté)
   SORTIES  MATRICE-COMPETENCES.md (versionné, diffable)
            matrice.html (consultable, filtrable, imprimable)
   USAGE    node build/matrice.mjs        (lancé aussi par build.mjs)

   CE QU'ELLE PROUVE, CE QU'ELLE NE PROUVE PAS — elle prouve le
   RATTACHEMENT : un code sans fiche, ou sans question, s'y voit
   immédiatement. Elle ne dit rien de la qualité de ce qui est enseigné.
   COUVERTURE dit qu'un code est CITÉ · PROFONDEUR qu'il est TENU · la
   MATRICE qu'il est enseigné ET vérifié · seule la relecture métier dira
   qu'il est BIEN enseigné. Quatre mesures, quatre questions distinctes.

   RÈGLE — rien ne disparaît du tableau. Les codes hors périmètre du pack
   (13.xx CO₂, 14.xx NH₃, codes propres aux catégories B et C) et les
   questions sans code figurent avec leur statut, jamais par omission :
   un tableau de traçabilité qui masque ses trous ne trace rien.
   ===================================================================== */
import { calculerVersion } from "./lib-version.mjs";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARTES, PACK_META } from "../packs/fluides/cartes.js";
import { resoudre, estEvalue } from "./referentiel.mjs";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BANQUE = JSON.parse(
  readFileSync(resolve(RACINE, "packs/fluides/banque.gen.json"), "utf8")
);
const REFERENTIEL = JSON.parse(
  readFileSync(resolve(RACINE, "packs/fluides/referentiel-2025.json"), "utf8")
);
const CATS = PACK_META.categories || [];

const esc = (s) =>
  String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const court = (s, n) => {
  const t = String(s || "").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t;
};

/* ---------------------------------------------------------------------
   1. LES DEUX INDEX — qui enseigne quoi, qui interroge quoi
   --------------------------------------------------------------------- */
const enseignePar = new Map(); // code → [ fiche ]
const interrogePar = new Map(); // code → [ question ]

for (const c of CARTES) {
  for (const cr of c.criteres || []) {
    if (!enseignePar.has(cr.code)) enseignePar.set(cr.code, []);
    enseignePar.get(cr.code).push({
      id: c.id,
      titre: c.titre,
      type: c.type || "?",
      dc: c.dc || "",
      libelle: cr.libelle, // la reformulation lue par l'élève
      // La fiche porte-t-elle sa propre question de vérification ? Elle ne
      // remplace pas la banque — elle ne tombe dans aucun examen — mais
      // c'est le premier contrôle que l'élève rencontre, il compte.
      mini: !!c.question,
    });
  }
}
for (const q of BANQUE) {
  if (!q.code) continue;
  if (!interrogePar.has(q.code)) interrogePar.set(q.code, []);
  interrogePar.get(q.code).push(q);
}

/* ---------------------------------------------------------------------
   2. UNE LIGNE PAR CODE, dans l'ordre de l'arrêté
   --------------------------------------------------------------------- */
const ETATS = {
  complet: { icone: "✅", libelle: "enseigné et vérifié" },
  sans_question: { icone: "🟠", libelle: "enseigné, jamais interrogé" },
  sans_fiche: { icone: "🔴", libelle: "interrogé, aucune fiche ne l'enseigne" },
  absent: { icone: "⬜", libelle: "non traité" },
  information: { icone: "🔵", libelle: "traité en information — non exigé dans les catégories du pack" },
  hors_perimetre: { icone: "·", libelle: "hors périmètre du pack" },
};

function ligne(info) {
  const fiches = enseignePar.get(info.code) || [];
  const questions = interrogePar.get(info.code) || [];
  const cats = CATS.filter((cat) => estEvalue(info, cat));
  let etat;
  if (cats.length) {
    if (fiches.length && questions.length) etat = "complet";
    else if (fiches.length) etat = "sans_question";
    else if (questions.length) etat = "sans_fiche";
    else etat = "absent";
  } else {
    etat = fiches.length || questions.length ? "information" : "hors_perimetre";
  }
  return {
    code: info.code,
    officiel: info.officiel,
    nouveau: info.nouveau,
    groupe: info.groupe,
    groupe_titre: info.groupe_titre,
    tirage_au_sort: info.tirage_au_sort,
    epreuve: Object.fromEntries(cats.map((c) => [c, info.cat[c]])),
    cats,
    // Les catégories hors pack où le code tombe quand même : c'est ce qui
    // explique qu'un code « hors périmètre » figure au référentiel.
    ailleurs: Object.keys(info.cat || {}).filter((k) => estEvalue(info, k) && !CATS.includes(k)),
    fiches,
    questions,
    etat,
  };
}

const GROUPES = (REFERENTIEL.groupes || []).map((g) => ({
  id: g.id,
  numero: g.numero,
  titre: g.titre,
  tirage_au_sort: !!g.tirage_au_sort,
  specifique: g.specifique_categories || null,
  lignes: (g.codes || []).map((c) => ligne(resoudre(c.code))),
}));
const TOUTES = GROUPES.flatMap((g) => g.lignes);

/* ---------------------------------------------------------------------
   3. SYNTHÈSE — par catégorie visée, puis par groupe
   --------------------------------------------------------------------- */
const PAR_CAT = {};
for (const cat of CATS) {
  const l = TOUTES.filter((x) => x.cats.includes(cat));
  PAR_CAT[cat] = {
    requis: l.length,
    enseignes: l.filter((x) => x.fiches.length).length,
    interroges: l.filter((x) => x.questions.length).length,
    complets: l.filter((x) => x.etat === "complet").length,
    sans_question: l.filter((x) => x.etat === "sans_question").length,
    sans_fiche: l.filter((x) => x.etat === "sans_fiche").length,
    absents: l.filter((x) => x.etat === "absent").length,
  };
}

const HORS_REF = BANQUE.filter((q) => q.hors_ref);
const MOTIFS = new Map(); // motif → [ question ]
for (const q of HORS_REF) {
  const m = typeof q.hors_ref === "string" ? q.hors_ref : "motif non écrit — à documenter";
  if (!MOTIFS.has(m)) MOTIFS.set(m, []);
  MOTIFS.get(m).push(q);
}

const PERIMETRE = TOUTES.filter((x) => x.cats.length);
const INFOS = TOUTES.filter((x) => x.etat === "information");
const NB = {
  codes: TOUTES.length,
  perimetre: PERIMETRE.length,
  complets: PERIMETRE.filter((x) => x.etat === "complet").length,
  sans_question: PERIMETRE.filter((x) => x.etat === "sans_question").length,
  sans_fiche: PERIMETRE.filter((x) => x.etat === "sans_fiche").length,
  absents: PERIMETRE.filter((x) => x.etat === "absent").length,
  information: INFOS.length,
  questions: BANQUE.length,
  questions_codees: BANQUE.filter((q) => q.code).length,
  questions_hors_ref: HORS_REF.length,
  fiches: new Set([...enseignePar.values()].flat().map((f) => f.id)).size,
};

/* ---------------------------------------------------------------------
   4. SORTIE MARKDOWN — versionnée, donc diffable : une compétence qui
   perd sa question se voit dans le diff du commit suivant.
   --------------------------------------------------------------------- */
function ecrireMarkdown() {
  const L = [];
  L.push("# Matrice compétences × contenu × questions");
  L.push("");
  L.push("> Généré par `node build/matrice.mjs` — ne pas éditer à la main.");
  L.push("> Source : arrêté du 21 novembre 2025, annexe II.B — " + NB.codes + " codes.");
  L.push("> Catégories visées par le pack : " + CATS.join(" · ") + ".");
  L.push("");
  L.push("Pour chaque compétence du référentiel : **où elle est enseignée** (la fiche que");
  L.push("l'élève lit) et **où elle est vérifiée** (les questions qui l'interrogent).");
  L.push("");
  L.push("**Ce que ce document prouve** : le rattachement. Un code sans fiche, ou sans");
  L.push("question, s'y voit immédiatement. **Ce qu'il ne prouve pas** : la qualité de ce qui");
  L.push("est enseigné — `COUVERTURE-REFERENTIEL.md` dit qu'un code est *cité*,");
  L.push("`PROFONDEUR-REFERENTIEL.md` qu'il est *tenu*, ce document qu'il est *enseigné et");
  L.push("vérifié* ; seule la relecture métier dira qu'il est **bien** enseigné.");
  L.push("");

  /* --- synthèse --- */
  L.push("## 1. Synthèse");
  L.push("");
  L.push("| Catégorie | Compétences exigées | Enseignées | Interrogées | Les deux |");
  L.push("|---|---:|---:|---:|---:|");
  for (const cat of CATS) {
    const s = PAR_CAT[cat];
    L.push(
      "| **" + cat + "** | " + s.requis + " | " + s.enseignes + " | " + s.interroges +
        " | " + s.complets + " (" + Math.round((100 * s.complets) / s.requis) + " %) |"
    );
  }
  L.push("");
  L.push("Sur les **" + NB.perimetre + " compétences** exigées par au moins une des catégories du pack :");
  L.push("");
  L.push("- " + ETATS.complet.icone + " **" + NB.complets + "** enseignées *et* vérifiées ;");
  L.push("- " + ETATS.sans_question.icone + " **" + NB.sans_question + "** enseignées sans jamais être interrogées" +
    (NB.sans_question ? " — l'élève ne peut pas s'entraîner dessus ;" : " ;"));
  L.push("- " + ETATS.sans_fiche.icone + " **" + NB.sans_fiche + "** interrogées sans fiche qui les enseigne" +
    (NB.sans_fiche ? " — l'élève qui se trompe n'a nulle part où réviser ;" : " ;"));
  L.push("- " + ETATS.absent.icone + " **" + NB.absents + "** ni enseignées ni interrogées.");
  L.push("");
  L.push("S'y ajoutent " + ETATS.information.icone + " **" + NB.information + " compétences traitées en information** :");
  L.push("elles ne sont exigées dans aucune des catégories du pack (CO₂, ammoniac, codes propres");
  L.push("aux catégories B et C), mais le contenu les aborde — l'annexe II.C impose d'ailleurs au");
  L.push("moins une question sur les spécificités du CO₂ et du NH₃ dans les sujets A1 et A2.");
  L.push("");
  L.push("Côté questions : **" + NB.questions + "** au total, dont **" + NB.questions_codees +
    "** rattachées à une compétence et **" + NB.questions_hors_ref + "** hors référentiel (§ 3).");
  L.push("**" + NB.fiches + " fiches** déclarent au moins une compétence.");
  L.push("");

  /* --- par groupe --- */
  L.push("## 2. La matrice, groupe par groupe");
  L.push("");
  for (const g of GROUPES) {
    const dansPack = g.lignes.filter((l) => l.cats.length).length;
    L.push("### " + g.id + " — " + g.titre);
    L.push("");
    const marques = [];
    if (g.tirage_au_sort)
      marques.push("⚠️ **groupe tiré au sort à l'épreuve pratique — le candidat en aura forcément un**");
    if (g.specifique) marques.push("*spécifique aux catégories " + g.specifique.join(", ") + "*");
    if (!dansPack) marques.push("*aucun code exigé dans les catégories du pack*");
    if (marques.length) { L.push(marques.join(" · ")); L.push(""); }

    L.push("| Code | Épreuve | Enseigné par | Interrogé par | État |");
    L.push("|---|---|---|---:|---|");
    for (const l of g.lignes) {
      const ep = l.cats.length
        ? l.cats.map((c) => c + " " + (l.epreuve[c] === "P" ? "prat." : "théo.")).join(" · ")
        : l.ailleurs.length ? "— *(" + l.ailleurs.join(", ") + ")*" : "—";
      const fiches = l.fiches.length ? l.fiches.map((f) => "`" + f.id + "`").join(" ") : "—";
      L.push(
        "| **" + l.code + "**" + (l.nouveau ? " ★" : "") + " | " + ep + " | " + fiches +
          " | " + (l.questions.length || "—") + " | " + ETATS[l.etat].icone + " |"
      );
    }
    L.push("");

    /* le détail : libellé officiel, titre des fiches, énoncés des questions */
    for (const l of g.lignes) {
      L.push("#### " + l.code + (l.nouveau ? " ★ nouveau 2025" : "") + " — " + ETATS[l.etat].icone +
        " " + ETATS[l.etat].libelle);
      L.push("");
      L.push("> *" + l.officiel + "*");
      L.push("");
      if (l.fiches.length) {
        for (const f of l.fiches)
          L.push("- **Enseigné** — `" + f.id + "` " + f.titre + (f.mini ? " *(+ question intégrée)*" : "") +
            "\n  <br>Dit à l'élève : « " + f.libelle + " »");
      } else {
        L.push("- **Enseigné** — aucune fiche.");
      }
      if (l.questions.length) {
        L.push("- **Interrogé** — " + l.questions.length + " question(s) :");
        for (const q of l.questions)
          L.push("  - `" + q.id + "` *(niveau " + (q.niveau || 1) + ", rangée en " + q.dc + ")* — " +
            court(q.enonce, 120));
      } else {
        L.push("- **Interrogé** — aucune question.");
      }
      L.push("");
    }
  }

  /* --- les questions qu'aucun code ne couvre --- */
  L.push("## 3. Les " + NB.questions_hors_ref + " questions hors référentiel");
  L.push("");
  L.push("Aucun code de l'annexe II.B ne les couvre honnêtement. Elles n'ont pas été rattachées");
  L.push("de force : un faux rattachement ferait croire à une couverture qui n'existe pas. Elles");
  L.push("restent dans la banque — le savoir est utile au métier — mais **elles ne sont pas");
  L.push("évaluables à l'examen**, et elles figurent ici pour être décidées, non pour disparaître.");
  L.push("");
  for (const [motif, qs] of MOTIFS) {
    L.push("**" + motif + "** — " + qs.length + " question(s)");
    L.push("");
    for (const q of qs) L.push("- `" + q.id + "` — " + court(q.enonce, 120));
    L.push("");
  }

  L.push("---");
  L.push("");
  L.push("*Voir aussi : `COUVERTURE-REFERENTIEL.md` (le code est-il cité ?) et");
  L.push("`PROFONDEUR-REFERENTIEL.md` (le code est-il tenu ?).*");
  L.push("");
  writeFileSync(resolve(RACINE, "MATRICE-COMPETENCES.md"), L.join("\n"), "utf8");
}

/* ---------------------------------------------------------------------
   5. SORTIE HTML — la même matrice, mais cherchable. Charte inerWeb Édu,
   jamais de thème sombre. Les filtres sont en JS nu : la page doit
   s'ouvrir depuis une clé USB, sans serveur ni réseau.
   --------------------------------------------------------------------- */
function ecrireHtml() {
  let h = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Matrice compétences × contenu × questions — habilitation fluides</title>
<style>
  body { font: 15px/1.55 Calibri, 'Segoe UI', sans-serif; color:#33475b; max-width: 1040px; margin: 0 auto 60px; padding: 0 18px; background:#fff; }
  h1 { color:#1b3a63; font-size: 27px; border-bottom: 3px solid #ff6b35; padding-bottom: 8px; margin-top: 26px; }
  h2 { color:#1b3a63; font-size: 21px; margin-top: 40px; border-bottom: 1.5px solid #d7e0e8; padding-bottom: 4px; }
  h3 { color:#1b3a63; font-size: 17px; margin: 30px 0 4px; }
  p.meta { color:#8494a4; font-size: 13.5px; }
  table.synth { border-collapse: collapse; margin: 14px 0; font-size: 14.5px; }
  table.synth th, table.synth td { border: 1px solid #d7e0e8; padding: 5px 12px; text-align: right; }
  table.synth th { background:#f3f7fb; color:#1b3a63; }
  table.synth td:first-child, table.synth th:first-child { text-align: left; }
  .cadre { border-left: 4px solid #1b3a63; background:#f3f7fb; border-radius: 6px; padding: 10px 14px; margin: 14px 0; font-size: 14.5px; }
  .barre { position: sticky; top: 0; background:#fff; border-bottom: 1.5px solid #d7e0e8; padding: 10px 0; margin-bottom: 10px; z-index: 5; }
  .barre input { font: 14px Calibri, sans-serif; padding: 5px 10px; border:1.5px solid #d7e0e8; border-radius: 6px; width: 260px; }
  .barre button { font: 13px Calibri, sans-serif; padding: 4px 11px; margin-right: 4px; border:1.5px solid #d7e0e8; background:#fff; color:#33475b; border-radius: 999px; cursor: pointer; }
  .barre button.on { background:#1b3a63; color:#fff; border-color:#1b3a63; }
  .barre .lot { display:inline-block; margin-right: 16px; }
  .barre .lot b { font-size: 12.5px; color:#8494a4; text-transform: uppercase; letter-spacing: .04em; margin-right: 6px; }
  .code { border: 1.5px solid #d7e0e8; border-radius: 10px; padding: 12px 16px; margin: 10px 0; page-break-inside: avoid; }
  .code.masque { display: none; }
  .num { font-size: 17px; font-weight: 700; color:#1b3a63; }
  .etat { float: right; font-size: 13px; color:#5a6b7d; }
  .officiel { font-style: italic; color:#4a5b6e; margin: 4px 0 8px; font-size: 14px; }
  .ep { display:inline-block; font-size:12px; font-weight:700; color:#fff; background:#1b3a63; padding:1px 9px; border-radius:999px; margin-right:4px; }
  .ep.prat { background:#ff6b35; }
  .neuf { font-size:12px; font-weight:700; color:#b06a00; }
  .tire { font-size:12.5px; font-weight:700; color:#c0392b; }
  .col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
  @media (max-width: 780px) { .col { grid-template-columns: 1fr; } }
  .boite { background:#f8fbfd; border:1px solid #e3ebf2; border-radius: 8px; padding: 8px 12px; font-size: 13.5px; }
  .boite b.t { color:#1b3a63; font-size:12.5px; text-transform: uppercase; letter-spacing:.04em; }
  /* le motif d'une question hors référentiel est une phrase, pas une étiquette :
     en capitales il devient illisible et il a l'air crié */
  .boite b.motif { color:#1b3a63; font-size:14px; text-transform: none; letter-spacing: 0; }
  .boite ul { margin: 5px 0 0; padding-left: 18px; }
  .boite li { margin-bottom: 5px; }
  .vide { color:#c0392b; font-weight: 600; }
  .dit { color:#5a6b7d; font-size: 12.5px; }
  .qid { color:#8494a4; font-size: 12px; }
  .groupe-vide { color:#8494a4; font-size: 13.5px; font-style: italic; }
  @media print {
    .barre { display: none; }
    .code { border-color:#bbb; }
    body { font-size: 12px; max-width: none; }
  }
</style><link rel='stylesheet' href='moteur/impression.css' media='print'></head><body>
<h1>Matrice compétences × contenu × questions</h1>
<p class="meta">Pack habilitation fluides frigorigènes — catégories ${esc(CATS.join(" · "))} ·
arrêté du 21 novembre 2025, annexe II.B (${NB.codes} compétences).
Généré par <code>node build/matrice.mjs</code> depuis le contenu publié : ce tableau ne se saisit pas,
il se relève. <b>Ne pas l'éditer à la main.</b></p>

<div class="cadre">
<b>Ce que ce document prouve</b> — le rattachement : pour chaque compétence de l'arrêté, la fiche qui
l'enseigne et les questions qui la vérifient. Un code sans fiche, ou sans question, s'y voit tout de suite.<br>
<b>Ce qu'il ne prouve pas</b> — la qualité de ce qui est enseigné. Quatre mesures distinctes :
<i>COUVERTURE</i> dit qu'un code est <b>cité</b> · <i>PROFONDEUR</i> qu'il est <b>tenu</b> ·
cette matrice qu'il est <b>enseigné et vérifié</b> · seule la <b>relecture métier</b> dira qu'il est
<b>bien</b> enseigné.
</div>

<h2>1. Synthèse</h2>
<table class="synth">
<tr><th>Catégorie</th><th>Compétences exigées</th><th>Enseignées</th><th>Interrogées</th><th>Les deux</th></tr>`;

  for (const cat of CATS) {
    const s = PAR_CAT[cat];
    h += `<tr><td><b>${esc(cat)}</b></td><td>${s.requis}</td><td>${s.enseignes}</td><td>${s.interroges}</td>` +
      `<td><b>${s.complets}</b> (${Math.round((100 * s.complets) / s.requis)} %)</td></tr>`;
  }
  h += `</table>
<p>Sur les <b>${NB.perimetre} compétences</b> exigées par au moins une catégorie du pack :
${ETATS.complet.icone} <b>${NB.complets}</b> enseignées et vérifiées ·
${ETATS.sans_question.icone} <b>${NB.sans_question}</b> enseignées sans être interrogées ·
${ETATS.sans_fiche.icone} <b>${NB.sans_fiche}</b> interrogées sans fiche ·
${ETATS.absent.icone} <b>${NB.absents}</b> ni l'un ni l'autre.
S'y ajoutent ${ETATS.information.icone} <b>${NB.information}</b> compétences traitées en information
(CO₂, ammoniac, codes propres aux catégories B et C) : elles ne sont exigées dans aucune catégorie du
pack, mais l'annexe II.C impose au moins une question sur le CO₂ et le NH₃ dans les sujets A1 et A2.</p>
<p class="meta">${NB.questions} questions au total, dont ${NB.questions_codees} rattachées à une
compétence et ${NB.questions_hors_ref} hors référentiel (§ 3). ${NB.fiches} fiches déclarent au moins
une compétence.</p>

<h2>2. La matrice, groupe par groupe</h2>
<div class="barre">
  <span class="lot"><b>Catégorie</b>
    <button class="cat on" data-cat="*">toutes</button>`;
  for (const cat of CATS) h += `<button class="cat" data-cat="${esc(cat)}">${esc(cat)}</button>`;
  h += `</span>
  <span class="lot"><b>État</b>
    <button class="et on" data-et="*">tous</button>
    <button class="et" data-et="complet">✅ complets</button>
    <button class="et" data-et="sans_question">🟠 sans question</button>
    <button class="et" data-et="sans_fiche">🔴 sans fiche</button>
    <button class="et" data-et="absent">⬜ non traités</button>
    <button class="et" data-et="information">🔵 information</button>
  </span>
  <span class="lot"><input id="q" type="search" placeholder="chercher un code, un mot…"></span>
  <span class="meta" id="compteur"></span>
</div>`;

  for (const g of GROUPES) {
    const dansPack = g.lignes.filter((l) => l.cats.length).length;
    h += `<h3 data-groupe="${esc(g.id)}">${esc(g.id)} — ${esc(g.titre)}</h3>`;
    const marques = [];
    if (g.tirage_au_sort)
      marques.push(`<span class="tire">⚠ groupe tiré au sort à l'épreuve pratique — le candidat en aura forcément un</span>`);
    if (g.specifique) marques.push(`<span class="groupe-vide">spécifique aux catégories ${esc(g.specifique.join(", "))}</span>`);
    if (!dansPack) marques.push(`<span class="groupe-vide">aucun code exigé dans les catégories du pack</span>`);
    if (marques.length) h += `<p class="meta">${marques.join(" · ")}</p>`;

    for (const l of g.lignes) {
      const txt = [
        l.code, l.officiel, l.groupe_titre,
        ...l.fiches.map((f) => f.id + " " + f.titre + " " + f.libelle),
        ...l.questions.map((q) => q.id + " " + q.enonce),
      ].join(" ").toLowerCase();
      h += `<div class="code" data-cats="${esc(l.cats.join(" "))}" data-etat="${l.etat}" data-txt="${esc(txt)}">`;
      h += `<span class="etat">${ETATS[l.etat].icone} ${esc(ETATS[l.etat].libelle)}</span>`;
      h += `<span class="num">${esc(l.code)}</span> `;
      for (const c of l.cats)
        h += `<span class="ep${l.epreuve[c] === "P" ? " prat" : ""}">${esc(c)} ${l.epreuve[c] === "P" ? "pratique" : "théorique"}</span>`;
      if (!l.cats.length && l.ailleurs.length)
        h += `<span class="groupe-vide">évalué seulement en ${esc(l.ailleurs.join(", "))}</span>`;
      if (l.nouveau) h += ` <span class="neuf">★ nouveau 2025</span>`;
      h += `<div class="officiel">${esc(l.officiel)}</div><div class="col">`;

      h += `<div class="boite"><b class="t">Enseigné par</b>`;
      if (l.fiches.length) {
        h += `<ul>`;
        for (const f of l.fiches)
          h += `<li><b>${esc(f.id)}</b> ${esc(f.titre)}${f.mini ? ` <span class="qid">+ question intégrée</span>` : ""}` +
            `<br><span class="dit">Dit à l'élève : « ${esc(f.libelle)} »</span></li>`;
        h += `</ul>`;
      } else {
        h += `<br><span class="${l.cats.length ? "vide" : "groupe-vide"}">aucune fiche</span>`;
      }
      h += `</div>`;

      h += `<div class="boite"><b class="t">Interrogé par</b>`;
      if (l.questions.length) {
        h += ` <span class="qid">${l.questions.length} question(s)</span><ul>`;
        for (const q of l.questions)
          h += `<li>${esc(court(q.enonce, 150))}<br><span class="qid">${esc(q.id)} · niveau ${q.niveau || 1} · rangée en ${esc(q.dc)}</span></li>`;
        h += `</ul>`;
      } else {
        h += `<br><span class="${l.cats.length ? "vide" : "groupe-vide"}">aucune question</span>`;
      }
      h += `</div></div></div>`;
    }
  }

  h += `<h2>3. Les ${NB.questions_hors_ref} questions hors référentiel</h2>
<p>Aucun code de l'annexe II.B ne les couvre honnêtement. Elles n'ont pas été rattachées de force :
un faux rattachement ferait croire à une couverture qui n'existe pas. Elles restent dans la banque —
le savoir est utile au métier — mais <b>elles ne sont pas évaluables à l'examen</b>, et elles figurent
ici pour être décidées, non pour disparaître.</p>`;
  for (const [motif, qs] of MOTIFS) {
    h += `<div class="boite" style="margin:10px 0"><b class="motif">${esc(motif)}</b> <span class="qid">${qs.length} question(s)</span><ul>`;
    for (const q of qs)
      h += `<li>${esc(court(q.enonce, 150))} <span class="qid">${esc(q.id)}</span></li>`;
    h += `</ul></div>`;
  }

  h += `<p class="meta" style="margin-top:34px">Voir aussi <code>COUVERTURE-REFERENTIEL.md</code>
(le code est-il cité ?) et <code>PROFONDEUR-REFERENTIEL.md</code> (le code est-il tenu ?).</p>
<script>
(function () {
  var cat = "*", et = "*", q = "";
  var blocs = [].slice.call(document.querySelectorAll(".code"));
  var titres = [].slice.call(document.querySelectorAll("h3[data-groupe]"));
  var compteur = document.getElementById("compteur");
  function filtrer() {
    var n = 0;
    blocs.forEach(function (b) {
      var ok =
        (cat === "*" || (" " + b.dataset.cats + " ").indexOf(" " + cat + " ") >= 0) &&
        (et === "*" || b.dataset.etat === et) &&
        (!q || b.dataset.txt.indexOf(q) >= 0);
      b.classList.toggle("masque", !ok);
      if (ok) n++;
    });
    // un groupe dont plus aucun code n'est affiché disparaît avec son titre
    titres.forEach(function (t) {
      var vu = false, e = t.nextElementSibling;
      while (e && e.tagName !== "H3" && e.tagName !== "H2") {
        if (e.classList.contains("code") && !e.classList.contains("masque")) vu = true;
        e = e.nextElementSibling;
      }
      t.style.display = vu ? "" : "none";
      var p = t.nextElementSibling;
      if (p && p.tagName === "P") p.style.display = vu ? "" : "none";
    });
    compteur.textContent = n + " compétence(s) affichée(s)";
  }
  function groupe(sel, attr, poser) {
    [].slice.call(document.querySelectorAll(sel)).forEach(function (b) {
      b.addEventListener("click", function () {
        [].slice.call(document.querySelectorAll(sel)).forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        poser(b.dataset[attr]);
        filtrer();
      });
    });
  }
  groupe(".barre button.cat", "cat", function (v) { cat = v; });
  groupe(".barre button.et", "et", function (v) { et = v; });
  document.getElementById("q").addEventListener("input", function (e) {
    q = e.target.value.toLowerCase().trim();
    filtrer();
  });
  filtrer();
})();
</script>
<script src="moteur/lisibilite.js?v=${calculerVersion()}"></script>
<script src="moteur/marque.js?v=${calculerVersion()}"></script>
<script src="moteur/marque.js?v=${calculerVersion()}"></script>
</body></html>`;

  writeFileSync(resolve(RACINE, "matrice.html"), h, "utf8");
  return h.length;
}

/* --------------------------------------------------------------------- */
ecrireMarkdown();
const poids = ecrireHtml();

console.log("  matrice : " + NB.complets + "/" + NB.perimetre + " compétences enseignées ET vérifiées" +
  (NB.sans_question ? " · " + NB.sans_question + " sans question" : "") +
  (NB.sans_fiche ? " · " + NB.sans_fiche + " sans fiche" : "") +
  (NB.absents ? " · " + NB.absents + " non traitées" : ""));
console.log("  → MATRICE-COMPETENCES.md + matrice.html (" + Math.round(poids / 1024) + " Ko)");
