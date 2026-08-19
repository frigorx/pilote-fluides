/* =====================================================================
   galerie.mjs — TOUTES les planches sur une seule page
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Demande de F. Henninot (27/07) : « me créer une partie où il y a toutes
   les animations pour que je puisse les voir ». Jusqu'ici, revoir une
   planche voulait dire retrouver la fiche qui la porte, l'ouvrir, faire
   défiler — et arriver après la fin de l'animation.

   CE QUE LA PAGE APPORTE, ET QU'UNE LISTE DE FICHIERS N'APPORTE PAS
   · chaque planche est REJOUABLE d'un clic (et toutes d'un seul bouton) ;
   · elle dit QUELLES FICHES l'utilisent — croisé avec cartes.js, jamais
     saisi à la main ;
   · elle signale les planches ORPHELINES, présentes dans le dossier mais
     utilisées par aucune fiche : c'est ainsi qu'on repère un dessin qu'on
     croyait posé et qui ne l'est pas.

   ENTRÉES  packs/fluides/res/svg/*.svg · packs/fluides/cartes.js
   SORTIE   galerie.html
   USAGE    node build/galerie.mjs      (lancé aussi par build.mjs)

   RELEVÉ, JAMAIS SAISI — le jour où une planche est ajoutée, elle apparaît
   ici sans que personne y pense. Une galerie qu'il faut tenir à la main
   est une galerie qui ment au bout de trois planches.
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARTES } from "../packs/fluides/cartes.js";
import { calculerVersion } from "./lib-version.mjs";

const VERSION = calculerVersion();

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOSSIER = resolve(RACINE, "packs/fluides/res/svg");

/* La bibliothèque de symboles est relevée comme le reste : son compte vient
   de son index, jamais d'un nombre écrit à la main dans la page. Absente,
   le bloc qui la présente ne s'affiche pas. */
let SYMBOLES = null;
try {
  SYMBOLES = JSON.parse(readFileSync(resolve(RACINE, "symboles/index.json"), "utf8")).meta;
} catch {
  /* pas de bibliothèque dans ce dépôt : on n'en parle pas */
}

/* Même principe pour les schémas de cours : relevés, jamais recopiés. */
let SCHEMAS = null;
try {
  SCHEMAS = JSON.parse(readFileSync(resolve(RACINE, "schemas/index.json"), "utf8"));
} catch {
  /* pas de schémas dans ce dépôt */
}

const esc = (s) =>
  String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------------------------------------------------------------------
   1. QUI UTILISE QUOI — on lit le HTML des cartes, comme le navigateur
   --------------------------------------------------------------------- */
const usages = new Map(); // fichier.svg → [ { id, titre, dc } ]
for (const c of CARTES) {
  const html =
    (c.corps || "") +
    (c.blocs || []).map((b) => b.html || "").join("") +
    (c.liens || []).map((l) => l.desc || "").join("");
  for (const m of html.matchAll(/res\/svg\/([\w.-]+\.svg)/g)) {
    if (!usages.has(m[1])) usages.set(m[1], []);
    const l = usages.get(m[1]);
    if (!l.some((x) => x.id === c.id)) l.push({ id: c.id, titre: c.titre, dc: c.dc || c.type });
  }
}

/* ---------------------------------------------------------------------
   2. CE QUE CHAQUE PLANCHE CONTIENT
   --------------------------------------------------------------------- */
function lire(fichier) {
  const svg = readFileSync(resolve(DOSSIER, fichier), "utf8");
  const smil = (svg.match(/<animate(Motion|Transform)?[\s>]/g) || []).length;
  const css = (svg.match(/animation\s*:/g) || []).length;
  /* Le <title> peut porter des attributs (`<title id="titre">`, posé pour
     aria-labelledby) : sans [^>]*, ces planches perdaient leur nom et
     s'affichaient sous leur nom de fichier. */
  const titre = (svg.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || "";
  const cyclique = /repeatCount\s*=\s*"indefinite"/.test(svg) || /infinite/.test(svg);

  /* Durée du récit : le plus tardif des begin + sa durée. Sert à dire au
     lecteur combien de temps regarder — une planche de 16 s vue 3 s donne
     l'impression que « ça ne marche pas ». */
  let fin = 0;
  for (const m of svg.matchAll(/<animate[^>]*>/g)) {
    const b = parseFloat((m[0].match(/begin="([\d.]+)s"/) || [])[1] || 0);
    const d = parseFloat((m[0].match(/dur="([\d.]+)s"/) || [])[1] || 0);
    if (b + d > fin) fin = b + d;
  }
  /* Planches sans SMIL, animées en CSS pure (@keyframes) : même logique,
     lue sur la durée de base + le plus grand animation-delay rencontré.
     Sans ce repli, une planche comme prp-echelle.svg affichait "? s". */
  if (fin === 0) {
    const baseDur = parseFloat((svg.match(/animation\s*:\s*[\w-]+\s+([\d.]+)s/) || [])[1] || 0);
    if (baseDur > 0) {
      let maxDelay = 0;
      for (const m of svg.matchAll(/animation-delay\s*:\s*([\d.]+)s/g)) {
        const d = parseFloat(m[1]);
        if (d > maxDelay) maxDelay = d;
      }
      fin = maxDelay + baseDur;
    }
  }
  return {
    fichier,
    titre: titre.replace(/\s+/g, " ").trim(),
    smil,
    css,
    anime: smil + css > 0,
    cyclique,
    duree: Math.round(fin),
    ko: Math.round(readFileSync(resolve(DOSSIER, fichier)).length / 102.4) / 10,
    fiches: usages.get(fichier) || [],
  };
}

const PLANCHES = readdirSync(DOSSIER)
  .filter((f) => f.endsWith(".svg"))
  .sort()
  .map(lire);

/* ---------------------------------------------------------------------
   1bis. LES EXPÉRIENCES COMPLÈTES — des pages autonomes (frise vivante,
   cours interactifs…), pas des planches SVG : voix, mise en scène,
   parfois un mini-jeu. Même philosophie que les planches : RELEVÉES dans
   `res/`, jamais saisies à la main. Tout dossier de `res/` qui porte un
   `.html` à sa racine — hors les dossiers d'ASSETS et de contrôle — en est
   une ; le titre et la description viennent de la page elle-même
   (<title>, <meta name="description">), pas d'une liste tenue à part.
   --------------------------------------------------------------------- */
const RES = resolve(RACINE, "packs/fluides/res");
const DOSSIERS_ASSETS = new Set(["svg", "outils", "photos", "bibliotheque", "vignettes"]);

function lireExperience(dossier) {
  const entrees = readdirSync(resolve(RES, dossier), { withFileTypes: true });
  const racine = entrees.filter((e) => e.isFile()).map((e) => e.name).sort();
  const sousDossiers = entrees.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  const htmlFiles = racine.filter((f) => f.endsWith(".html"));
  if (!htmlFiles.length) return null;
  const fichier = htmlFiles.includes("index.html") ? "index.html" : htmlFiles[0];
  const html = readFileSync(resolve(RES, dossier, fichier), "utf8");
  /* Une page qui se déclare `noindex` ne veut pas figurer ici : c'est le cas
     des redirections laissées derrière une ressource renommée, pour que les
     QR codes déjà imprimés continuent de tomber juste. Elle doit rester en
     ligne, pas dans la bibliothèque — sinon la galerie affiche deux entrées
     pour un seul cours. */
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) return null;
  const titre = ((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || dossier)
    .replace(/\s*\|.*$/, "")
    .trim();
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  /* Famille, état et licence : DÉCLARÉS PAR LA PAGE elle-même, comme le titre
     et la description — jamais dans une liste centrale à tenir à jour.
     <meta name="famille" content="Films narrés"> · <meta name="etat" content="prototype">
     Sans déclaration : famille « Cours interactifs », état « en service ». */
  const famille = (html.match(/<meta name="famille" content="([^"]*)"/) || [])[1] || "";
  const etat = (html.match(/<meta name="etat" content="([^"]*)"/) || [])[1] || "";

  /* CE QUE LA RESSOURCE SAIT FAIRE — détecté dans ses propres fichiers,
     jamais déclaré à la main (demande Franck 18/08 : « est-ce qu'il y a un
     vocal ? des questions ? — qu'on puisse réexploiter sans tout ouvrir »).
     Ce sont ces marqueurs qui font d'une liste de liens une bibliothèque. */
  const tousFichiers = racine.join(" ");
  const codeJoint = racine
    .filter((f) => /\.(html|js|json)$/.test(f))
    .map((f) => { try { return readFileSync(resolve(RES, dossier, f), "utf8"); } catch { return ""; } })
    .join("\n");
  const capacites = [];
  const aMp3 = /\.mp3/i.test(tousFichiers) || /\.mp3/i.test(codeJoint) || sousDossiers.includes("audio");
  const aSynthese = /speechSynthesis|SpeechSynthesisUtterance/.test(codeJoint);
  if (aMp3) capacites.push("voix enregistrée");
  else if (aSynthese) capacites.push("voix de synthèse");
  /* Les quiz s'écrivent de plusieurs façons selon la brique (français ou
     anglais, tableau de choix ou marqueur de bonne réponse) : on les
     reconnaît tous, sinon une ressource à 16 questions passe pour muette. */
  if (/\bQCM\b|bonneReponse|bonne_reponse|data-bonne|questions\s*[:=]\s*\[|choix\s*[:=]\s*\[|quizIndex|quizArea|\bcorrect\b|answers\s*[:=]/.test(codeJoint))
    capacites.push("questions");
  if (/<animate|animation\s*:|@keyframes|requestAnimationFrame/.test(codeJoint)) capacites.push("animation");
  if (/@media\s+print/.test(codeJoint)) capacites.push("imprimable");
  /* Hors ligne : aucune ressource distante appelée par la page. */
  const distant = /https?:\/\/(?!www\.w3\.org)/.test(codeJoint);
  if (!distant) capacites.push("hors ligne");

  return {
    titre,
    desc,
    famille,
    etat,
    capacites,
    distant,
    url: "packs/fluides/res/" + dossier + "/" + fichier,
    // Pour « récupérer le code » : chaque fichier à la racine du dossier
    // pris individuellement, en téléchargement direct — pas d'archive .zip
    // (aucune dépendance de compression dans ce projet, RELEVÉ ne veut pas
    // dire ALOURDI). Les sous-dossiers (ex. `img/` d'une frise) ne sont pas
    // énumérés fichier par fichier : juste signalés, pour que la liste
    // reste lisible.
    fichiers: racine.map((f) => "packs/fluides/res/" + dossier + "/" + f),
    sousDossiers,
  };
}

const EXPERIENCES = readdirSync(RES, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !DOSSIERS_ASSETS.has(d.name))
  .map((d) => lireExperience(d.name))
  .filter(Boolean)
  .sort((a, b) => a.titre.localeCompare(b.titre));

/* Les animées d'abord — c'est ce qu'on vient voir —, puis les fixes ;
   à l'intérieur, les orphelines en dernier. */
PLANCHES.sort((a, b) =>
  a.anime !== b.anime ? (a.anime ? -1 : 1)
  : (a.fiches.length > 0) !== (b.fiches.length > 0) ? (a.fiches.length ? -1 : 1)
  : a.fichier.localeCompare(b.fichier)
);

const N = {
  total: PLANCHES.length,
  animees: PLANCHES.filter((p) => p.anime).length,
  narratives: PLANCHES.filter((p) => p.anime && !p.cyclique).length,
  cycliques: PLANCHES.filter((p) => p.cyclique).length,
  fixes: PLANCHES.filter((p) => !p.anime).length,
  orphelines: PLANCHES.filter((p) => !p.fiches.length).length,
  animations: PLANCHES.reduce((n, p) => n + p.smil + p.css, 0),
};

/* ---------------------------------------------------------------------
   3. LA PAGE — bibliothèque et démonstrateur
   ---------------------------------------------------------------------
   Refonte du 18/08 (demande F. Henninot) : la page listait tout à la
   suite et devenait ingérable. Elle a maintenant DEUX usages assumés :
     · SE SERVIR — projeter tout de suite en cours (chercher, ouvrir) ;
     · RÉEMPLOYER — récupérer le code d'une ressource pour l'intégrer
       ailleurs (fichiers, licence, état de maturité affichés).
   D'où : une recherche instantanée, des familles, un état (en service /
   prototype), la licence rappelée sur chaque fiche, et le chargement
   différé des planches (44 SVG animés d'un coup mettaient la page à genoux).
   RELEVÉ, JAMAIS SAISI reste la règle : famille et état sont déclarés par
   la page de la ressource (<meta name="famille"> / <meta name="etat">),
   jamais dans une liste centrale.
   --------------------------------------------------------------------- */

/* Famille par défaut d'une expérience qui n'en déclare pas : déduite de son
   nom de dossier, jamais inventée à la main ressource par ressource. */
function familleDe(e) {
  if (e.famille) return e.famille;
  const u = e.url.toLowerCase();
  if (u.includes("/film-")) return "Films narrés";
  if (u.includes("frise") || u.includes("fil-conducteur")) return "Frises et parcours";
  if (u.includes("capsule")) return "Capsules";
  return "Cours interactifs";
}
/* La vignette d'une ressource, si build/vignettes.mjs l'a capturée. */
function vignetteDe(url) {
  const dossier = url.split("/").slice(-2, -1)[0];
  const chemin = "packs/fluides/res/vignettes/" + dossier + ".png";
  try {
    readFileSync(resolve(RACINE, chemin));
    return chemin;
  } catch {
    return null;
  }
}
const RESSOURCES = EXPERIENCES.map((e) => ({
  ...e,
  fam: familleDe(e),
  prototype: /prototype|brouillon/i.test(e.etat || ""),
  vignette: vignetteDe(e.url),
}));
const FAMILLES = [...new Set(RESSOURCES.map((r) => r.fam))].sort();

const cherchable = (...bouts) =>
  esc(bouts.filter(Boolean).join(" ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""));

let h = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Bibliothèque d'animations et de supports — habilitation fluides frigorigènes</title>
<meta name="description" content="Le catalogue inerWeb Édu : toutes les planches animées, cours interactifs et supports du froid, rejouables et filtrables.">
<style>
  :root { --bleu:#1b3a63; --orange:#ff6b35; --texte:#33475b; --mut:#8494a4; --bord:#d7e0e8;
          --fond:#f7f1e7; --carte:#fffdf8; --vert:#1e7e54; --ambre:#8a5200; }
  * { box-sizing:border-box; }
  body { font:15px/1.55 Calibri,'Segoe UI',sans-serif; color:var(--texte); background:var(--fond);
         max-width:1240px; margin:0 auto 70px; padding:0 18px; }
  h1 { color:var(--bleu); font-size:27px; border-bottom:3px solid var(--orange); padding-bottom:8px; margin:26px 0 6px; }
  h2.section { color:var(--bleu); font-size:20px; margin:34px 0 4px; border-left:6px solid var(--orange); padding-left:11px; }
  p.meta { color:var(--mut); font-size:13.5px; margin:4px 0; }
  .intro { background:var(--carte); border:1.5px solid var(--bord); border-radius:12px; padding:14px 18px; margin:14px 0 4px; }
  .intro b { color:var(--bleu); }

  /* La barre de recherche : le premier geste de la page. */
  .barre { position:sticky; top:0; background:var(--fond); border-bottom:2px solid var(--bord);
           padding:12px 0 10px; margin:14px 0 6px; z-index:9; }
  .barre .ligne { display:flex; flex-wrap:wrap; gap:9px; align-items:center; }
  #q { flex:1; min-width:240px; font:16px Calibri,'Segoe UI',sans-serif; padding:9px 14px;
       border:2px solid var(--bleu); border-radius:999px; background:var(--carte); color:var(--texte); }
  #q::placeholder { color:var(--mut); }
  .chip { font:13px Calibri,sans-serif; padding:6px 13px; border:1.5px solid var(--bord); background:var(--carte);
          color:var(--texte); border-radius:999px; cursor:pointer; }
  .chip.on { background:var(--bleu); color:#fff; border-color:var(--bleu); font-weight:700; }
  .cpt { color:var(--mut); font-size:13px; margin-left:auto; white-space:nowrap; }

  /* Les cartes : une grille, plus une liste à dérouler. */
  .grille { display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:15px; margin:12px 0 6px; }
  .carte { background:var(--carte); border:1.5px solid var(--bord); border-radius:13px; padding:15px 17px;
           display:flex; flex-direction:column; gap:7px; }
  .carte.masque, .planche.masque { display:none; }
  .carte h3 { margin:0; font-size:16.5px; color:var(--bleu); line-height:1.3; }
  /* L'aperçu : on voit de quoi ça parle sans rien ouvrir. */
  .apercu { display:block; margin:-4px -6px 4px; border-radius:10px; overflow:hidden;
            border:1px solid var(--bord); background:#fff; }
  .apercu img { display:block; width:100%; height:150px; object-fit:cover; object-position:top center; }
  .vide-apercu { height:150px; display:flex; align-items:center; justify-content:center;
                 color:var(--mut); font-size:13px; background:#f2f5f8; }
  /* La fiche technique : voix, questions, animation — lue dans les fichiers. */
  .capacites { display:flex; flex-wrap:wrap; gap:4px; }
  .cap { font-size:11.5px; color:var(--texte); background:#eef2f6; border:1px solid var(--bord);
         border-radius:6px; padding:1px 7px; }
  .cap.muet { color:var(--mut); font-style:italic; }
  .cap.reseau { color:var(--ambre); background:#fdf6e3; border-color:#c9a227; font-weight:700; }
  .carte p { margin:0; font-size:13.5px; }
  .etiquettes { display:flex; flex-wrap:wrap; gap:5px; }
  .et { font-size:11.5px; font-weight:700; padding:2px 9px; border-radius:999px; border:1.5px solid; }
  .et.fam { color:var(--bleu); border-color:var(--bleu); background:#eef4fb; }
  .et.service { color:var(--vert); border-color:var(--vert); background:#eef8f3; }
  .et.proto { color:var(--ambre); border-color:#c9a227; background:#fdf6e3; }
  .et.anim { color:#c9451a; border-color:#e8905f; background:#fff1e9; }
  .actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:auto; padding-top:6px; align-items:center; }
  a.ouvrir { font:700 14px Calibri,sans-serif; background:var(--bleu); color:#fff; text-decoration:none;
             border:2px solid var(--bleu); border-radius:999px; padding:6px 15px; }
  a.ouvrir:hover { background:var(--orange); border-color:var(--orange); }
  button.lien, summary.reemploi { font:13px Calibri,sans-serif; border:1.5px solid var(--bord); background:var(--carte);
                                  color:var(--texte); border-radius:999px; padding:5px 13px; cursor:pointer; }
  details.reemp { font-size:13px; }
  details.reemp summary { list-style:none; }
  details.reemp summary::-webkit-details-marker { display:none; }
  .fichiers { margin-top:7px; padding-top:7px; border-top:1px dashed var(--bord); }
  .fichiers a { display:inline-block; margin:0 10px 3px 0; font-size:12.5px; color:var(--bleu); }
  .licence-ligne { font-size:12.5px; color:var(--mut); margin-top:4px; }

  /* Les planches SVG gardent leur affichage, mais en chargement différé. */
  .planche { background:var(--carte); border:1.5px solid var(--bord); border-radius:13px; padding:15px 17px; margin:14px 0; }
  .planche h3 { margin:0 0 2px; font-size:17px; color:var(--bleu); }
  .planche .f { font-size:12.5px; color:var(--mut); font-family:Consolas,monospace; }
  .planche img { display:block; width:100%; max-width:820px; margin:10px 0 6px; border:1px solid var(--bord);
                 border-radius:8px; background:#fff; }
  .util { font-size:13px; color:var(--mut); }
  .util b { color:var(--bleu); }
  .vide { color:#b3261e; font-weight:600; font-size:13px; }
  .rien { display:none; background:var(--carte); border:2px dashed var(--orange); border-radius:12px;
          padding:18px; text-align:center; color:var(--ambre); font-weight:700; }
  footer { margin-top:40px; border-top:2px solid var(--bord); padding-top:14px; font-size:13px; color:var(--mut); }
  footer a { color:var(--bleu); }
  @media print { .barre, .actions, .rien { display:none } .carte, .planche { break-inside:avoid } }
</style></head><body>

<!-- La galerie est le « Catalogue » du site : sans ce lien, c'était un
     cul-de-sac — aucun moyen de revenir au plan (constat du 19/08). -->
<p style="margin:14px 0 -8px"><a href="index.html" style="color:var(--bleu);text-decoration:none;font-weight:bold">❄️ inerWeb Édu · ← revenir au plan</a></p>

<h1>Bibliothèque d'animations et de supports</h1>
<p class="meta">Habilitation fluides frigorigènes · © 2026 inerweb.fr — inerWeb Édu</p>

<div class="intro">
  <p><b>Deux usages.</b> <b>Se servir</b> : chercher une ressource et la projeter telle quelle en cours.
  <b>Réemployer</b> : récupérer son code pour l'intégrer dans un autre programme — chaque fiche donne ses
  fichiers, sa famille et son état de maturité.</p>
  <p class="licence-ligne">Rien n'est libre de droits : contenus sous <b>CC BY-NC-ND 4.0</b> — diffusion
  autorisée en citant inerWeb, sans usage commercial et sans modification. Code et illustrations sous
  licence du dépôt — <a href="LICENCE.md">lire la licence</a>. Usage en centre de formation ou demande
  d'adaptation : <a href="mailto:inerweb.fh@gmail.com">inerweb.fh@gmail.com</a>.</p>
</div>

<div class="barre">
  <div class="ligne">
    <input id="q" type="search" placeholder="Chercher : manifold, ozone, azote, détendeur, brasage…" autocomplete="off">
    <span class="cpt" id="cpt"></span>
  </div>
  <div class="ligne" style="margin-top:9px">
    <button class="chip on" data-fam="*">Tout</button>
    ${FAMILLES.map((f) => `<button class="chip" data-fam="${esc(f)}">${esc(f)}</button>`).join("\n    ")}
    <button class="chip" data-fam="Planches">Planches SVG</button>
    <button class="chip" id="chip-proto" data-etat="prototype">Prototypes seuls</button>
  </div>
</div>

<div class="rien" id="rien">Aucune ressource ne correspond à cette recherche.</div>

<h2 class="section" id="t-ressources">Ressources complètes — pages autonomes</h2>
<p class="meta">${RESSOURCES.length} ressources · ouvrables et projetables telles quelles.</p>
<div class="grille" id="ressources">
`;

for (const r of RESSOURCES) {
  const cle = cherchable(r.titre, r.desc, r.fam, r.url, r.capacites.join(" "));
  h += `  <div class="carte" data-fam="${esc(r.fam)}" data-etat="${r.prototype ? "prototype" : "service"}" data-q="${cle}">
    ${r.vignette
      ? `<a href="${esc(r.url)}" target="_blank" rel="noopener" class="apercu"><img loading="lazy" src="${esc(r.vignette)}" alt="Aperçu — ${esc(r.titre)}"></a>`
      : `<div class="apercu vide-apercu">aperçu à venir</div>`}
    <h3>${esc(r.titre)}</h3>
    <div class="etiquettes">
      <span class="et fam">${esc(r.fam)}</span>
      <span class="et ${r.prototype ? "proto" : "service"}">${r.prototype ? "prototype" : "en service"}</span>
    </div>
    ${r.desc ? `<p>${esc(r.desc)}</p>` : ""}
    <div class="capacites">${r.capacites.length
      ? r.capacites.map((c) => `<span class="cap">${esc(c)}</span>`).join("")
      : `<span class="cap muet">page simple</span>`}${
      r.distant ? `<span class="cap reseau">réseau requis</span>` : ""}</div>
    <div class="actions">
      <a class="ouvrir" href="${esc(r.url)}" target="_blank" rel="noopener">Ouvrir ▸</a>
      <button class="lien" data-url="${esc(r.url)}">🔗 Copier le lien</button>
    </div>
    <details class="reemp"><summary class="reemploi">⚙ Réemployer — fichiers et licence</summary>
      <div class="fichiers">
        ${r.fichiers.map((f) => `<a href="${esc(f)}" download>⬇ ${esc(f.split("/").pop())}</a>`).join("\n        ")}
        ${r.sousDossiers.length ? `<div class="util">+ sous-dossiers : ${r.sousDossiers.map(esc).join(", ")} — cloner le dépôt pour les récupérer</div>` : ""}
        <div class="licence-ligne">© 2026 inerweb.fr · CC BY-NC-ND 4.0 : citer inerWeb, pas d'usage commercial, pas de modification.</div>
      </div>
    </details>
  </div>
`;
}

h += `</div>

<h2 class="section" id="t-planches">Planches SVG — ${N.total} dessins, ${N.animees} animés</h2>
<p class="meta">${N.narratives} récits qui se déroulent une fois · ${N.cycliques} en boucle · ${N.fixes} fixes ·
${N.animations} animations au total${N.orphelines ? ` · <span class="vide">${N.orphelines} non utilisée(s) par une fiche</span>` : ""}.
Les images se chargent à mesure du défilement ; <b>↻ Rejouer</b> relance une animation depuis le début.</p>
<div id="planches">
`;

for (const p of PLANCHES) {
  const cle = cherchable(p.titre, p.fichier, p.fiches.map((f) => f.titre).join(" "));
  h += `  <div class="planche" data-fam="Planches" data-etat="service" data-q="${cle}">
    <h3>${esc(p.titre || p.fichier)}</h3>
    <div class="f">${esc(p.fichier)} · ${p.ko} ko</div>
    <div class="etiquettes" style="margin-top:6px">
      ${p.anime ? `<span class="et anim">${p.cyclique ? "en boucle" : "récit " + p.duree + " s"}</span>` : `<span class="et fam">fixe</span>`}
      ${p.fiches.length ? "" : `<span class="et proto">non utilisée</span>`}
    </div>
    <img loading="lazy" src="packs/fluides/res/svg/${esc(p.fichier)}" alt="${esc(p.titre || p.fichier)}">
    <div class="actions">
      ${p.anime ? `<button class="lien rejeu">↻ Rejouer</button>` : ""}
      <a class="ouvrir" href="packs/fluides/res/svg/${esc(p.fichier)}" target="_blank" rel="noopener">Ouvrir ▸</a>
      <a class="lien" href="packs/fluides/res/svg/${esc(p.fichier)}" download style="text-decoration:none">⬇ Télécharger</a>
    </div>
    <div class="util">${p.fiches.length
      ? "Utilisée par : " + p.fiches.map((f) => `<b>${esc(f.titre)}</b>`).join(" · ")
      : `<span class="vide">Aucune fiche ne l'utilise</span>`}</div>
  </div>
`;
}

h += `</div>

<footer>
  <p><b>Comment cette page se tient à jour :</b> elle est <b>relevée</b>, jamais saisie à la main
  (<code>node build/galerie.mjs</code>). Toute ressource déposée dans <code>packs/fluides/res/</code>
  avec une page HTML y apparaît d'elle-même ; elle annonce sa famille et son état par
  <code>&lt;meta name="famille"&gt;</code> et <code>&lt;meta name="etat"&gt;</code> dans sa propre page.</p>
  <p>Les planches vivent dans <code>packs/fluides/res/svg/</code> — un fichier <code>.svg</code> par planche.
  ${SYMBOLES ? `Bibliothèque de symboles : ${esc(String(SYMBOLES.total || SYMBOLES.compte || ""))} symboles.` : ""}</p>
  <p>© 2026 Franck Henninot — inerWeb Édu · <a href="LICENCE.md">Licence et propriété intellectuelle</a></p>
</footer>

<script>
(function () {
  var q = document.getElementById("q");
  var cpt = document.getElementById("cpt");
  var rien = document.getElementById("rien");
  var blocs = Array.prototype.slice.call(document.querySelectorAll("[data-q]"));
  var famChoisie = "*", protoSeuls = false;

  function sansAccent(s) {
    return s.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
  }
  function filtrer() {
    var mots = sansAccent(q.value.trim()).split(/\\s+/).filter(Boolean);
    var vus = 0;
    blocs.forEach(function (b) {
      var texte = b.getAttribute("data-q");
      var okMots = mots.every(function (m) { return texte.indexOf(m) >= 0; });
      var okFam = famChoisie === "*" || b.getAttribute("data-fam") === famChoisie;
      var okEtat = !protoSeuls || b.getAttribute("data-etat") === "prototype";
      var montre = okMots && okFam && okEtat;
      b.classList.toggle("masque", !montre);
      if (montre) vus++;
    });
    cpt.textContent = vus + " ressource" + (vus > 1 ? "s" : "") + " affichée" + (vus > 1 ? "s" : "");
    rien.style.display = vus ? "none" : "block";
    document.querySelectorAll("h2.section, h2.section + p.meta").forEach(function (t) {
      var id = t.id || (t.previousElementSibling && t.previousElementSibling.id);
      var zone = id === "t-planches" ? "planches" : "ressources";
      var reste = document.querySelectorAll("#" + zone + " > :not(.masque)").length;
      t.style.display = reste ? "" : "none";
    });
  }
  q.addEventListener("input", filtrer);

  document.querySelectorAll(".chip[data-fam]").forEach(function (c) {
    c.addEventListener("click", function () {
      famChoisie = c.getAttribute("data-fam");
      document.querySelectorAll(".chip[data-fam]").forEach(function (o) { o.classList.toggle("on", o === c); });
      filtrer();
    });
  });
  var chipProto = document.getElementById("chip-proto");
  chipProto.addEventListener("click", function () {
    protoSeuls = !protoSeuls;
    chipProto.classList.toggle("on", protoSeuls);
    filtrer();
  });

  /* Rejouer une planche : recharger la source suffit à relancer SMIL et CSS. */
  document.addEventListener("click", function (e) {
    var b = e.target;
    if (b.classList && b.classList.contains("rejeu")) {
      var im = b.closest(".planche").querySelector("img");
      var src = im.getAttribute("src");
      im.setAttribute("src", "");
      setTimeout(function () { im.setAttribute("src", src); }, 30);
    }
    if (b.classList && b.classList.contains("lien") && b.hasAttribute("data-url")) {
      var url = new URL(b.getAttribute("data-url"), location.href).href;
      var dire = function (m) { var t = b.textContent; b.textContent = m; setTimeout(function () { b.textContent = t; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { dire("✓ copié"); }, function () { dire(url); });
      else dire(url);
    }
  });
  filtrer();
})();
</script>
<script src="moteur/lisibilite.js?v=${VERSION}"></script>
<script src="moteur/marque.js?v=${VERSION}" data-cartouche="Pilote" data-licence="cc-by-nc-nd"></script>
</body></html>`;

writeFileSync(resolve(RACINE, "galerie.html"), h, "utf8");
console.log("  galerie : " + RESSOURCES.length + " ressources (" +
  RESSOURCES.filter((r) => r.prototype).length + " prototype(s)) · " +
  N.total + " planches · " + N.animees + " animées · " + N.animations + " animations" +
  (N.orphelines ? " · ⚠ " + N.orphelines + " non utilisée(s)" : ""));
console.log("  → galerie.html");
