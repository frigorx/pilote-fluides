/* =====================================================================
   parcours.mjs — génère le SUPPORT DE PROJECTION depuis le contenu
   ---------------------------------------------------------------------
   Entrées : packs/fluides/parcours.js  (le déroulé : jours, séquences)
             packs/fluides/pack.pilote.js (les fiches, déjà enrichies)
   Sortie  : packs/fluides/projection.gen.js  → lu par projection.html

   POURQUOI GÉNÉRER PLUTÔT QU'ÉCRIRE
   Les diapositives ne sont pas un contenu de plus : ce sont les fiches,
   vues autrement. Les écrire à la main doublerait la relecture métier et
   les ferait diverger au premier changement. Ici, une fiche corrigée =
   une projection corrigée, sans rien retoucher.

   « UNE SOURCE, TROIS FACES » (cahier des charges F. Henninot) :
     · la fiche       → l'élève, en autoformation
     · la diapositive → la salle, projetée
     · les notes      → la guidance formateur, en vue orateur
   Les trois sortent d'ici.

   LA BOUCLE DE SÉQUENCE : titre et compétences visées → schéma → points
   du cours → encadrés (la clé, le piège) → mini-questionnaire, dont les
   questions sont CELLES QUE L'ÉLÈVE RETROUVERA CHEZ LUI. Le tirage est
   déterministe : même séance, mêmes questions, d'un groupe à l'autre.

   Usage : node build/parcours.mjs
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PARCOURS } from "../packs/fluides/parcours.js";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Le pack pilote porte les notes d'animation : c'est la face « formateur ». */
global.window = {};
eval(readFileSync(resolve(RACINE, "packs/fluides/pack.pilote.js"), "utf8"));
const PACK = global.window.PILOTE_PACK;
const idx = {};
PACK.cartes.forEach((c) => (idx[c.id] = c));

/* ---------------------------------------------------------------------
   DÉCOUPAGE — une fiche devient une suite de diapositives.
   Le corps est du HTML rédigé à la main : on le découpe sur les <p>,
   en isolant d'abord le schéma de tête (une image projetée mérite
   l'écran entier, pas un coin de diapositive).
   --------------------------------------------------------------------- */
function decouper(carte) {
  const slides = [];
  const corps = carte.corps || "";

  // 1. titre + ce que l'examen attend
  slides.push({
    type: "titre",
    titre: carte.titre,
    dc: carte.dc || "",
    competences: (carte.criteres || []).map((cr) => ({
      code: cr.code,
      lib: cr.libelle,
      officiel: cr.officiel,
      epreuve: cr.epreuve || {},
      nouveau: !!cr.nouveau,
      tirage_au_sort: !!cr.tirage_au_sort,
    })),
  });

  // 2. le schéma, plein écran
  const img = corps.match(/<img[^>]*>/);
  if (img) {
    const src = (img[0].match(/src="([^"]+)"/) || [])[1] || "";
    const alt = (img[0].match(/alt="([^"]*)"/) || [])[1] || "";
    slides.push({ type: "schema", src, alt, titre: carte.titre });
  }

  // 3. un point par paragraphe
  const sansImg = corps.replace(/<img[^>]*>/g, "");
  for (const p of sansImg.match(/<p>[\s\S]*?<\/p>/g) || []) {
    const html = p.replace(/^<p>/, "").replace(/<\/p>$/, "").trim();
    if (html) slides.push({ type: "point", html, titre: carte.titre });
  }
  // certaines fiches listent (les organes, les étapes) : la liste vaut un point
  for (const l of sansImg.match(/<[ou]l>[\s\S]*?<\/[ou]l>/g) || [])
    slides.push({ type: "point", html: l, titre: carte.titre });

  // 4. les encadrés — la clé et le piège sont les temps forts de l'oral
  for (const b of carte.blocs || []) {
    if (/iframe/.test(b.html || "")) continue; // outil embarqué : ne se projette pas
    slides.push({ type: "encadre", genre: b.type || "", t: b.t || "", html: b.html || "", titre: carte.titre });
  }

  return slides;
}

/* ---------------------------------------------------------------------
   LE MINI-QUESTIONNAIRE — tiré de la banque sur les codes de la fiche.
   Déterministe (niveau 1 d'abord, puis ordre de banque) : la même séance
   pose les mêmes questions d'un groupe à l'autre, et ce sont celles que
   l'élève retrouve en autoformation.
   --------------------------------------------------------------------- */
function questionsDe(carte, combien) {
  const codes = (carte.criteres || []).map((cr) => cr.code);
  // Repli : une fiche sans code du référentiel — le risque électrique, par
  // exemple, qui n'est pas au programme de l'épreuve fluides — récupère les
  // questions qui renvoient vers elle. Sans cela son questionnaire serait
  // vide, alors que le sujet est vital.
  const pool = codes.length
    ? PACK.banque.filter((q) => codes.includes(q.code))
    : PACK.banque.filter((q) => q.remediation_vers === carte.id);
  pool.sort((a, b) => (a.niveau || 1) - (b.niveau || 1) || a.id.localeCompare(b.id));
  return pool.slice(0, combien);
}

/* --------------------------------------------------------------------- */
function main() {
  const err = [];
  const jours = [];

  for (const j of PARCOURS.jours) {
    const sequences = [];
    for (const s of j.sequences) {
      const carte = idx[s.fiche];
      if (!carte) { err.push("séquence : carte « " + s.fiche + " » introuvable"); continue; }

      if (s.type === "cours") {
        const questions = questionsDe(carte, s.questions || 0);
        if (questions.length < (s.questions || 0))
          err.push(s.fiche + " : " + questions.length + " question(s) disponible(s) pour " +
            s.questions + " demandée(s) — la banque ne couvre pas assez ses codes");
        sequences.push({
          type: "cours", fiche: s.fiche, titre: carte.titre, minutes: s.minutes,
          video: s.video || null,
          slides: decouper(carte),
          questions,
          notes: carte.notes_pilote || "",
        });
      } else {
        // exercice ou bilan : on projette la consigne, le travail se fait sur l'appareil
        sequences.push({
          type: s.type, fiche: s.fiche, titre: carte.titre, minutes: s.minutes,
          slides: decouper(carte),
          questions: [],
          notes: carte.notes_pilote || "",
        });
      }
    }
    // `libelle` remplace « Jour N » quand un bloc n'est pas une journée —
    // l'accueil sécurité tient en une demi-journée, pas en un jour.
    jours.push({ n: j.n, libelle: j.libelle || null, titre: j.titre, intention: j.intention, sequences });
  }

  if (err.length) {
    console.error("✗ projection refusée — " + err.length + " anomalie(s) :");
    err.forEach((e) => console.error("   " + e));
    process.exit(1);
  }

  const sortie = {
    parcours: { id: PARCOURS.id, titre: PARCOURS.titre, sous_titre: PARCOURS.sous_titre },
    base_img: PACK.pack.base_img || "",
    jours,
  };
  writeFileSync(
    resolve(RACINE, "packs/fluides/projection.gen.js"),
    "/* SUPPORT DE PROJECTION — généré par build/parcours.mjs. NE PAS éditer à la main.\n" +
      "   Le contenu vient de cartes.js ; l'ordre vient de parcours.js. */\n" +
      "window.PILOTE_PROJECTION = " + JSON.stringify(sortie, null, 1) + ";\n",
    "utf8"
  );

  const nbSeq = jours.reduce((n, j) => n + j.sequences.length, 0);
  const nbSlides = jours.reduce((n, j) => n + j.sequences.reduce((m, s) => m + s.slides.length, 0), 0);
  const nbQ = jours.reduce((n, j) => n + j.sequences.reduce((m, s) => m + s.questions.length, 0), 0);
  const minutes = jours.map((j) => j.sequences.reduce((m, s) => m + (s.minutes || 0), 0));
  const sansVideo = jours.reduce((n, j) => n + j.sequences.filter((s) => s.type === "cours" && !s.video).length, 0);

  console.log("✓ projection.gen.js écrit");
  console.log("  " + jours.length + " jours · " + nbSeq + " séquences · " + nbSlides + " diapositives · " + nbQ + " questions");
  jours.forEach((j, i) =>
    console.log("    jour " + j.n + " : " + j.sequences.length + " séquences, " +
      Math.floor(minutes[i] / 60) + " h " + String(minutes[i] % 60).padStart(2, "0")));
  if (sansVideo) console.log("  ▪ " + sansVideo + " séquence(s) sans vidéo (emplacement prêt, lien à fournir)");
}

main();
