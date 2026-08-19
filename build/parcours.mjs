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
import { PARCOURS, CADRE } from "../packs/fluides/parcours.js";

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
/* ---------------------------------------------------------------------
   UN PARAGRAPHE TROP LONG N'EST PAS UNE DIAPOSITIVE.
   Le découpage « un <p> = un écran » marche pour la fiche, où l'on peut
   relire ; il ne marche pas en projection, où l'on lit une fois, de loin.
   Constaté au contrôle du 31/07 : trois écrans débordaient encore une
   fois tout le reste réglé, dont un de 532 mots — une énumération d'organes
   fondue dans un seul paragraphe. À ce volume, aucune taille de police ne
   sauve l'écran.

   On coupe donc sur une FIN DE PHRASE, et seulement au niveau racine du
   HTML : couper à l'intérieur d'un <b> produirait deux fragments invalides.
   Le texte n'est jamais récrit ni raccourci — il occupe simplement le
   nombre d'écrans qu'il demande.
   --------------------------------------------------------------------- */
const SIGNES_MAX = 460;

function couperSurPhrases(html, max = SIGNES_MAX) {
  if (html.replace(/<[^>]+>/g, "").length <= max) return [html];

  const morceaux = [];
  let prof = 0, i = 0, debut = 0, vus = 0;
  while (i < html.length) {
    if (html[i] === "<") {
      const fin = html.indexOf(">", i);
      if (fin === -1) break;
      const bal = html.slice(i, fin + 1);
      if (/^<\//.test(bal)) prof--;
      else if (!/\/>$/.test(bal) && !/^<(br|img|hr|input)\b/i.test(bal)) prof++;
      i = fin + 1;
      continue;
    }
    vus++;
    // une coupure ne vaut que hors balise, après un point, et si le morceau
    // en cours a déjà de la matière — sinon on fabrique des écrans d'une ligne
    if (prof === 0 && /[.!?]/.test(html[i]) && /^[\s]|^$/.test(html[i + 1] || "") && vus >= max * 0.55) {
      const bout = html.slice(debut, i + 1).trim();
      if (bout) morceaux.push(bout);
      debut = i + 1;
      vus = 0;
    }
    i++;
  }
  const reste = html.slice(debut).trim();
  if (reste) {
    // un reliquat trop court se recolle au morceau précédent : mieux vaut un
    // écran un peu plein qu'un écran avec une phrase orpheline
    if (morceaux.length && reste.replace(/<[^>]+>/g, "").length < max * 0.3)
      morceaux[morceaux.length - 1] += " " + reste;
    else morceaux.push(reste);
  }
  return morceaux.length ? morceaux : [html];
}

/* Une liste longue se coupe elle aussi — mais par ÉLÉMENTS, jamais au
   milieu d'un. Sur un <ol>, les morceaux suivants reprennent la
   numérotation avec `start` : le stagiaire doit lire « 5. » après « 4. »,
   pas revoir « 1. » à chaque écran. C'était le vrai coupable des écrans
   qui débordaient : la fiche g1d empile ses organes dans UNE liste de
   532 mots, poussée jusqu'ici en une seule diapositive. */
function couperListe(html, max = SIGNES_MAX) {
  const m = html.match(/^<(ul|ol)([^>]*)>([\s\S]*)<\/\1>$/);
  if (!m) return [html];
  const [, bal, attrs, dedans] = m;
  if (dedans.replace(/<[^>]+>/g, "").length <= max) return [html];

  const items = dedans.match(/<li>[\s\S]*?<\/li>/g) || [];
  if (items.length < 2) return [html];

  const paquets = [];
  let cour = [], n = 0;
  for (const it of items) {
    const taille = it.replace(/<[^>]+>/g, "").length;
    if (cour.length && n + taille > max) { paquets.push(cour); cour = []; n = 0; }
    cour.push(it); n += taille;
  }
  if (cour.length) {
    // un dernier paquet d'un seul élément se recolle : un écran pour une puce
    // isolée n'apprend rien et casse le rythme
    if (cour.length === 1 && paquets.length) paquets[paquets.length - 1].push(cour[0]);
    else paquets.push(cour);
  }

  let depart = 1;
  return paquets.map((p) => {
    const ouvrante = bal === "ol" && depart > 1
      ? `<ol${attrs} start="${depart}">`
      : `<${bal}${attrs}>`;
    depart += p.length;
    return ouvrante + p.join("") + `</${bal}>`;
  });
}

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

  // 1bis. les EXPÉRIENCES INTERACTIVES reliées à la fiche (helper lienOutil
  // de cartes.js, classe .lien-experience) — le support de cours de
  // F. Henninot : une diapositive de lancement, tout de suite après le titre,
  // pour animer la séquence avec l'expérience plutôt qu'avec du texte.
  // Sans cette extraction, ces <p class="…"> ne matchaient aucun motif de
  // découpage : les expériences étaient silencieusement absentes du déroulé.
  for (const p of corps.match(/<p class="lien-experience"[\s\S]*?<\/p>/g) || []) {
    const url = (p.match(/href="([^"]+)"/) || [])[1] || "";
    const lancer = (p.match(/>([^<]+) ▸<\/a>/) || [])[1] || "Expérience interactive";
    const desc = (p.match(/<span[^>]*>([\s\S]*?)<\/span>/) || [])[1] || "";
    if (url) slides.push({ type: "experience", url, lancer, desc, titre: carte.titre });
  }

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
    if (!html) continue;
    for (const bout of couperSurPhrases(html))
      slides.push({ type: "point", html: bout, titre: carte.titre });
  }
  // certaines fiches listent (les organes, les étapes) : la liste vaut un point
  for (const l of sansImg.match(/<[ou]l[^>]*>[\s\S]*?<\/[ou]l>/g) || [])
    for (const bout of couperListe(l))
      slides.push({ type: "point", html: bout, titre: carte.titre });

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

/* ---------------------------------------------------------------------
   LE PLANNING — confronter le déroulé au CADRE du dossier (35 h A1).
   Ajouté le 27/07 : le pack décrivait « 3 jours de théorie » quand le
   dossier décrit M0→M8 sur 5 jours. Les deux ne se recoupaient pas, et
   la pratique — la moitié du volume — n'apparaissait nulle part. On ne
   peut pas présenter à une direction un planning que rien ne vérifie.

   Ne comptent dans le volume que les régimes « salle » et « plateau » :
   l'autoformation prépare la formation, elle ne la remplace pas, et la
   faire entrer dans le total gonflerait artificiellement l'offre.
   --------------------------------------------------------------------- */
const hhmm = (m) => Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0");

function bilanPlanning() {
  const cadre = CADRE[PARCOURS.cadre];
  const parModule = {};
  const parJour = [];
  let compte = 0, horsVolume = 0;

  for (const j of PARCOURS.jours) {
    let mj = 0;
    for (const s of j.sequences) {
      // Une séquence d'AUTOFORMATION rattachée à une journée (régime « avant »
      // ou « pendant ») ne consomme pas de temps de formation : le stagiaire la
      // lit sur son lien, le soir ou entre deux séances. Elle est rattachée au
      // module pour qu'on sache À QUEL MOMENT elle se lit — le premier cas est
      // cl4, la protection contre le CO₂, posée au jour où le CO₂ est traité en
      // salle (27/07). Sans cette exception, elle gonflait M6 de 30 min et
      // faisait passer le total à 35 h 30 : le contrôle du cadre l'a vu.
      if (s.regime === "avant" || s.regime === "pendant") { horsVolume += s.minutes; continue; }
      const m = s.module || "?";
      const e = (parModule[m] = parModule[m] || { salle: 0, plateau: 0 });
      if (s.regime === "plateau") { e.plateau += s.minutes; compte += s.minutes; mj += s.minutes; }
      else { e.salle += s.minutes; compte += s.minutes; mj += s.minutes; }
    }
    parJour.push({ n: j.n, titre: j.titre, minutes: mj });
  }
  for (const bloc of [PARCOURS.amont, PARCOURS.aval])
    for (const s of (bloc || { sequences: [] }).sequences) horsVolume += s.minutes;

  const modules = Object.keys(cadre.modules).map((m) => {
    const e = parModule[m] || { salle: 0, plateau: 0 };
    const prevu = cadre.modules[m] * 60;
    return { m, titre: CADRE.titres[m], salle: e.salle, plateau: e.plateau,
             total: e.salle + e.plateau, prevu, ecart: e.salle + e.plateau - prevu };
  });
  const orphelins = Object.keys(parModule).filter((m) => !(m in cadre.modules));
  return { cadre, modules, parJour, compte, horsVolume, orphelins };
}

/* --------------------------------------------------------------------- */
function main() {
  const err = [];
  const jours = [];

  for (const j of PARCOURS.jours) {
    const sequences = [];
    for (const s of j.sequences) {
      // L'autoformation ne se projette pas : une lecture faite chez soi n'a
      // pas de diapositive.
      if (s.regime === "avant" || s.regime === "pendant") continue;

      // Le PLATEAU se projette en une seule diapositive d'annonce : le travail
      // se fait sur machine, mais le formateur doit garder le fil de sa
      // journée — « on descend au plateau, voilà ce qu'on y fait ».
      if (s.regime === "plateau") {
        sequences.push({
          type: "plateau", fiche: null, titre: s.titre, minutes: s.minutes,
          video: null, questions: [], notes: "",
          slides: [{ type: "plateau", titre: s.titre, minutes: s.minutes }],
        });
        continue;
      }

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
  const sansVideo = jours.reduce((n, j) => n + j.sequences.filter((s) => s.type === "cours" && !s.video).length, 0);

  console.log("✓ projection.gen.js écrit");
  console.log("  " + jours.length + " jours · " + nbSeq + " séquences projetées · " + nbSlides +
    " diapositives · " + nbQ + " questions");
  if (sansVideo) console.log("  ▪ " + sansVideo + " séquence(s) sans vidéo (emplacement prêt, lien à fournir)");

  /* ---- le planning, confronté au cadre ---- */
  const b = bilanPlanning();
  console.log("\n✓ planning " + PARCOURS.cadre + " — cadre : " + b.cadre.total_h + " h / " +
    b.cadre.jours + " jours");
  console.log("  module | salle    | plateau  | total    | cadre    | écart");
  for (const m of b.modules)
    console.log("  " + m.m.padEnd(6) + " | " + hhmm(m.salle).padEnd(8) + " | " + hhmm(m.plateau).padEnd(8) +
      " | " + hhmm(m.total).padEnd(8) + " | " + hhmm(m.prevu).padEnd(8) + " | " +
      (m.ecart === 0 ? "✓" : (m.ecart > 0 ? "+" : "") + Math.round(m.ecart) + " min"));
  console.log("  " + "-".repeat(60));
  console.log("  TOTAL  | " + hhmm(b.compte).padEnd(8) + " ".repeat(24) + "| " +
    hhmm(b.cadre.total_h * 60).padEnd(8) + " | " +
    (b.compte === b.cadre.total_h * 60 ? "✓" : (b.compte > b.cadre.total_h * 60 ? "+" : "") +
      Math.round(b.compte - b.cadre.total_h * 60) + " min"));
  for (const j of b.parJour)
    console.log("    jour " + j.n + " : " + hhmm(j.minutes) + " — " + j.titre.slice(0, 46));
  console.log("  + autoformation hors volume : " + hhmm(b.horsVolume) +
    " (avant la formation et pendant, sur le lien du stagiaire)");

  if (b.orphelins.length)
    console.error("  ✗ séquences rattachées à un module inconnu du cadre : " + b.orphelins.join(", "));
  const derive = b.modules.filter((m) => m.ecart !== 0);
  if (derive.length)
    console.error("  ⚠ " + derive.length + " module(s) hors cadre : " +
      derive.map((m) => m.m + " " + (m.ecart > 0 ? "+" : "") + m.ecart + " min").join(" · "));

  ecrirePlanning(b);
  ecrirePlanningHtml(b);
  console.log("→ PLANNING-FORMATION.md · planning.html");
}

/* ---------------------------------------------------------------------
   La même chose en page web — c'est celle-là qu'on envoie en lien à une
   direction : un .md se télécharge, une page s'ouvre.
   --------------------------------------------------------------------- */
function ecrirePlanningHtml(b) {
  const nom = (id) => (idx[id] || {}).titre || id;
  const e = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const R = { salle: "salle", plateau: "plateau", avant: "autoformation", pendant: "autoformation" };
  const tSalle = b.modules.reduce((s, m) => s + m.salle, 0);
  const tPlateau = b.modules.reduce((s, m) => s + m.plateau, 0);
  const H = [];

  H.push('<!doctype html><html lang="fr"><head><meta charset="utf-8">');
  H.push('<meta name="viewport" content="width=device-width,initial-scale=1">');
  /* Hors des moteurs de recherche (décision F. Henninot, 20/08) : pièce de
     dossier, envoyée par lien. Reste accessible par son adresse. */
  H.push('<meta name="robots" content="noindex">');
  H.push("<title>Planning de formation — habilitation fluides frigorigènes</title>");
  H.push("<style>" +
    ":root{--bleu:#1b3a63;--org:#c9451a;--mut:#5a6b7d;--ligne:#d6dee7;--fond:#eef2f6}" +
    "*{box-sizing:border-box}body{margin:0;font:16px/1.6 Calibri,Segoe UI,sans-serif;color:#1d2a38;background:var(--fond)}" +
    ".wrap{max-width:960px;margin:0 auto;padding:26px 20px 60px}" +
    "header{background:var(--bleu);color:#fff;padding:30px 20px}" +
    "header .wrap{padding:0 20px}h1{margin:0 0 6px;font-size:28px}" +
    "header p{margin:0;opacity:.85}" +
    "h2{color:var(--bleu);font-size:22px;margin:36px 0 8px;border-bottom:2px solid var(--ligne);padding-bottom:6px}" +
    "h3{color:var(--bleu);font-size:18px;margin:26px 0 6px}" +
    ".chapo{color:var(--mut);margin:0 0 16px}" +
    "table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--ligne);margin:10px 0 18px;font-size:15px}" +
    "th,td{padding:8px 10px;border-bottom:1px solid var(--ligne);text-align:left}" +
    "th{background:#f4f7fa;color:var(--bleu);font-size:13.5px;text-transform:uppercase;letter-spacing:.03em}" +
    "td.n,th.n{text-align:right;white-space:nowrap}td.c,th.c{text-align:center}" +
    "tr.tot td{font-weight:700;background:#f4f7fa;border-top:2px solid var(--bleu)}" +
    ".ok{color:#1e7a4d;font-weight:700}.ko{color:var(--org);font-weight:700}" +
    ".ch{display:flex;gap:14px;flex-wrap:wrap;margin:16px 0}" +
    ".ch div{flex:1 1 150px;background:#fff;border:1px solid var(--ligne);border-radius:8px;padding:14px;text-align:center}" +
    ".ch b{display:block;font-size:26px;color:var(--org)}" +
    ".ch span{font-size:13.5px;color:var(--mut)}" +
    ".reg{font-size:12.5px;padding:2px 7px;border-radius:10px;border:1px solid var(--ligne);color:var(--mut);background:#fff}" +
    ".reg.plateau{border-color:#b9cbdb;background:#eef3f7;color:var(--bleu);font-weight:700}" +
    ".note{background:#fff;border-left:4px solid var(--org);padding:12px 16px;margin:16px 0;font-size:15px}" +
    "</style><link rel='stylesheet' href='moteur/impression.css' media='print'></head><body>");
  H.push('<header><div class="wrap"><h1>Planning de formation — catégorie ' + PARCOURS.cadre + "</h1>");
  H.push("<p>Habilitation à la manipulation des fluides frigorigènes · arrêté du 21 novembre 2025</p></div></header>");
  H.push('<div class="wrap">');

  H.push('<p class="chapo">Page <b>générée</b> à chaque fabrication du contenu, jamais saisie à la main : ' +
    "elle ne peut pas diverger du déroulé réellement projeté en salle.</p>");
  H.push('<div class="ch">' +
    "<div><b>" + b.cadre.total_h + " h</b><span>volume de formation</span></div>" +
    "<div><b>" + b.cadre.jours + "</b><span>journées</span></div>" +
    "<div><b>" + Math.round((tPlateau / b.compte) * 100) + " %</b><span>de pratique au plateau</span></div>" +
    "<div><b>" + hhmm(b.horsVolume) + "</b><span>d'autoformation en plus</span></div>" +
    "<div><b>" + b.cadre.epreuve + "</b><span>durée de l'épreuve</span></div></div>");

  H.push("<h2>1. Le volume, module par module</h2>");
  H.push('<p class="chapo">Le volume de formation n\'est pas imposé par l\'arrêté : c\'est un engagement ' +
    "de l'organisme. Le planning le tient exactement, module par module.</p>");
  H.push("<table><tr><th>Mod.</th><th>Intitulé</th><th class='n'>Salle</th><th class='n'>Plateau</th>" +
    "<th class='n'>Total</th><th class='n'>Cadre</th><th class='c'></th></tr>");
  for (const m of b.modules)
    H.push("<tr><td><b>" + m.m + "</b></td><td>" + e(m.titre) + "</td><td class='n'>" + hhmm(m.salle) +
      "</td><td class='n'>" + hhmm(m.plateau) + "</td><td class='n'><b>" + hhmm(m.total) +
      "</b></td><td class='n'>" + hhmm(m.prevu) + "</td><td class='c'>" +
      (m.ecart === 0 ? '<span class="ok">✓</span>' : '<span class="ko">' + (m.ecart > 0 ? "+" : "") + m.ecart + "</span>") +
      "</td></tr>");
  H.push("<tr class='tot'><td></td><td>Total</td><td class='n'>" + hhmm(tSalle) + "</td><td class='n'>" +
    hhmm(tPlateau) + "</td><td class='n'>" + hhmm(b.compte) + "</td><td class='n'>" +
    hhmm(b.cadre.total_h * 60) + "</td><td class='c'>" +
    (b.compte === b.cadre.total_h * 60 ? '<span class="ok">✓</span>' : '<span class="ko">⚠</span>') +
    "</td></tr></table>");

  H.push("<h2>2. Ce que l'autoformation ajoute</h2>");
  H.push('<div class="note">Le stagiaire reçoit le lien de l\'application <b>à l\'inscription</b> et le ' +
    "garde <b>jusqu'à l'épreuve</b>. Il travaille sur son téléphone ou son ordinateur, sans rien " +
    "installer, et <b>aucune donnée ne sort de son navigateur</b>. Ces <b>" + hhmm(b.horsVolume) +
    "</b> de travail personnel guidé ne sont <b>pas</b> comptés dans les " + b.cadre.total_h +
    " h : ils les préparent. C'est ce qui permet au temps de salle de servir à démontrer, " +
    "questionner et remédier — plutôt qu'à lire.</div>");
  for (const bloc of [PARCOURS.amont, PARCOURS.aval]) {
    if (!bloc) continue;
    H.push("<h3>" + e(bloc.titre) + "</h3><p class='chapo'>" + e(bloc.intention) + "</p><ul>");
    for (const s of bloc.sequences) H.push("<li>" + e(nom(s.fiche)) + " — " + s.minutes + " min</li>");
    H.push("</ul>");
  }

  H.push("<h2>3. Les " + b.cadre.jours + " journées</h2>");
  for (const j of PARCOURS.jours) {
    const mj = j.sequences.reduce((n, s) => n + s.minutes, 0);
    H.push("<h3>Jour " + j.n + " — " + e(j.titre) + " · " + hhmm(mj) + "</h3>");
    H.push('<p class="chapo">' + e(j.intention) + "</p>");
    H.push("<table><tr><th class='c'>Mod.</th><th class='c'>Régime</th><th class='n'>Durée</th><th>Séquence</th></tr>");
    for (const s of j.sequences)
      H.push("<tr><td class='c'>" + (s.module || "—") + "</td><td class='c'><span class='reg " +
        s.regime + "'>" + R[s.regime] + "</span></td><td class='n'>" + s.minutes + " min</td><td>" +
        (s.regime === "plateau" ? "<b>" + e(s.titre) + "</b>" : e(nom(s.fiche)) +
          (s.rappel ? " <i>(reprise)</i>" : "")) + "</td></tr>");
    H.push("</table>");
  }

  H.push('<p class="chapo" style="margin-top:30px">Le détail de chaque séquence de salle — diapositives, ' +
    "questions posées, notes d'animation — se projette depuis le support de salle. Les compétences " +
    "visées et leur libellé officiel figurent sur chaque fiche du stagiaire.</p>");
  H.push('<script src="moteur/lisibilite.js"><' + "/script>");
  H.push('<script src="moteur/marque.js" data-cartouche="Pilote" data-licence="cc-by-nc-nd"><' + "/script>");
  H.push("</div></body></html>");
  writeFileSync(resolve(RACINE, "planning.html"), H.join("\n"), "utf8");
}

/* ---------------------------------------------------------------------
   LE DOCUMENT DE PLANNING — pour le dossier de direction.
   Généré, jamais saisi : un planning recopié à la main est faux au
   premier déplacement de ligne, et c'est exactement le document qu'on
   ne peut pas se permettre de présenter faux.
   --------------------------------------------------------------------- */
function ecrirePlanning(b) {
  const L = [];
  const nom = (id) => (idx[id] || {}).titre || id;
  const R = { salle: "salle", plateau: "plateau", avant: "autoformation", pendant: "autoformation" };

  L.push("# Planning de formation — " + PARCOURS.cadre + " · habilitation fluides frigorigènes");
  L.push("");
  L.push("> Généré par `node build/parcours.mjs` — **ne pas éditer à la main**.");
  L.push("> Le déroulé vient de `packs/fluides/parcours.js`, le cadre de `" + CADRE.source + "`.");
  L.push("> Toute modification du déroulé régénère ce document et revérifie le total.");
  L.push("");
  L.push("**Cadre : " + b.cadre.total_h + " h sur " + b.cadre.jours + " jours · épreuve " +
    b.cadre.epreuve + ".** Le volume de formation n'est pas imposé par l'arrêté du 21/11/2025 :");
  L.push("c'est un engagement de l'organisme. Le planning ci-dessous le tient **exactement**.");
  L.push("");

  L.push("## 1. Le volume, module par module");
  L.push("");
  L.push("| Module | Intitulé | Salle | Plateau | Total | Cadre | |");
  L.push("|---|---|---:|---:|---:|---:|:--:|");
  for (const m of b.modules)
    L.push("| **" + m.m + "** | " + m.titre + " | " + hhmm(m.salle) + " | " + hhmm(m.plateau) +
      " | **" + hhmm(m.total) + "** | " + hhmm(m.prevu) + " | " +
      (m.ecart === 0 ? "✅" : (m.ecart > 0 ? "+" : "") + m.ecart + " min") + " |");
  const tSalle = b.modules.reduce((s, m) => s + m.salle, 0);
  const tPlateau = b.modules.reduce((s, m) => s + m.plateau, 0);
  L.push("| | **Total** | **" + hhmm(tSalle) + "** | **" + hhmm(tPlateau) + "** | **" +
    hhmm(b.compte) + "** | **" + hhmm(b.cadre.total_h * 60) + "** | " +
    (b.compte === b.cadre.total_h * 60 ? "✅" : "⚠️") + " |");
  L.push("");
  L.push("Soit **" + Math.round((tPlateau / b.compte) * 100) + " % de pratique** sur machine réelle.");
  L.push("");

  L.push("## 2. Ce que l'autoformation ajoute — hors des " + b.cadre.total_h + " h");
  L.push("");
  L.push("Le stagiaire reçoit le lien du pack **à l'inscription** et le garde **jusqu'à");
  L.push("l'épreuve**. Il travaille sur son téléphone ou son ordinateur, sans installation,");
  L.push("et **rien ne sort de son navigateur**.");
  L.push("");
  L.push("**" + hhmm(b.horsVolume) + " de travail personnel** sont ainsi préparés et guidés, en plus des " +
    b.cadre.total_h + " h encadrées.");
  L.push("Ce temps n'est **pas** compté dans le volume de formation : il le prépare.");
  L.push("");
  for (const bloc of [PARCOURS.amont, PARCOURS.aval]) {
    if (!bloc) continue;
    L.push("### " + bloc.titre);
    L.push("");
    L.push(bloc.intention);
    L.push("");
    for (const s of bloc.sequences) L.push("- " + nom(s.fiche) + " — *" + s.minutes + " min*");
    L.push("");
  }

  L.push("## 3. Les cinq journées");
  L.push("");
  for (const j of PARCOURS.jours) {
    const mj = j.sequences.reduce((n, s) => n + s.minutes, 0);
    L.push("### Jour " + j.n + " — " + j.titre + "  ·  " + hhmm(mj));
    L.push("");
    L.push("*" + j.intention + "*");
    L.push("");
    L.push("| Mod. | Régime | Durée | Séquence |");
    L.push("|:--:|:--:|---:|---|");
    for (const s of j.sequences)
      L.push("| " + (s.module || "—") + " | " + R[s.regime] + " | " + s.minutes + " min | " +
        (s.regime === "plateau" ? "**" + s.titre + "**" : nom(s.fiche) +
          (s.rappel ? " *(reprise)*" : "")) + " |");
    L.push("");
  }

  L.push("---");
  L.push("");
  L.push("*Le détail de chaque séquence de salle — diapositives, questions posées, notes");
  L.push("d'animation — se projette depuis `projection.html`. Les compétences visées et leur");
  L.push("libellé officiel figurent sur chaque fiche.*");
  L.push("");
  writeFileSync(resolve(RACINE, "PLANNING-FORMATION.md"), L.join("\n"), "utf8");
}

main();
