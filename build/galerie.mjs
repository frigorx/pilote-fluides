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
  const titre = (svg.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
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
const DOSSIERS_ASSETS = new Set(["svg", "outils", "photos", "bibliotheque"]);

function lireExperience(dossier) {
  const entrees = readdirSync(resolve(RES, dossier), { withFileTypes: true });
  const racine = entrees.filter((e) => e.isFile()).map((e) => e.name).sort();
  const sousDossiers = entrees.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  const htmlFiles = racine.filter((f) => f.endsWith(".html"));
  if (!htmlFiles.length) return null;
  const fichier = htmlFiles.includes("index.html") ? "index.html" : htmlFiles[0];
  const html = readFileSync(resolve(RES, dossier, fichier), "utf8");
  const titre = ((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || dossier)
    .replace(/\s*\|.*$/, "")
    .trim();
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  return {
    titre,
    desc,
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
   3. LA PAGE
   --------------------------------------------------------------------- */
let h = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toutes les planches — habilitation fluides frigorigènes</title>
<style>
  :root { --bleu:#1b3a63; --orange:#ff6b35; --texte:#33475b; --mut:#8494a4; --bord:#d7e0e8; }
  body { font: 15px/1.55 Calibri,'Segoe UI',sans-serif; color:var(--texte); background:#fff;
         max-width:1180px; margin:0 auto 70px; padding:0 18px; }
  h1 { color:var(--bleu); font-size:28px; border-bottom:3px solid var(--orange); padding-bottom:8px; margin-top:26px; }
  p.meta { color:var(--mut); font-size:13.5px; }
  .barre { position:sticky; top:0; background:#fff; border-bottom:1.5px solid var(--bord);
           padding:10px 0; margin-bottom:14px; z-index:5; display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
  .barre button { font:13px Calibri,sans-serif; padding:5px 12px; border:1.5px solid var(--bord);
                  background:#fff; color:var(--texte); border-radius:999px; cursor:pointer; }
  .barre button.on { background:var(--bleu); color:#fff; border-color:var(--bleu); }
  .barre button.tout { background:var(--orange); color:#fff; border-color:var(--orange); font-weight:700; }
  .barre .cpt { color:var(--mut); font-size:13px; margin-left:auto; }
  .planche { border:1.5px solid var(--bord); border-radius:12px; padding:16px 18px; margin:16px 0; }
  .planche.masque { display:none; }
  .planche h2 { font-size:18px; color:var(--bleu); margin:0 0 2px; }
  .planche .f { font-size:12.5px; color:var(--mut); font-family:Consolas,monospace; }
  .tags { margin:8px 0 10px; }
  .tag { display:inline-block; font-size:12px; font-weight:700; padding:2px 10px; border-radius:999px; margin-right:5px; }
  .tag.anim { background:#fff1e9; color:#c9451a; }
  .tag.cyc  { background:#eef4fb; color:var(--bleu); }
  .tag.fixe { background:#f0f3f6; color:#5a6b7d; }
  .tag.orph { background:#fbe7e4; color:#c0392b; }
  .planche img { width:100%; height:auto; display:block; border:1px solid var(--bord); border-radius:8px; background:#fff; }
  .sous { display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-top:10px; }
  .sous button { font:600 13.5px Calibri,sans-serif; padding:5px 13px; color:var(--bleu);
                 background:#f3f7fb; border:1.5px solid #2f5689; border-radius:999px; cursor:pointer; }
  .sous button:hover { background:#e7eff7; }
  .sous button.lien { color:#5a6b7d; border-color:var(--bord); background:#fff; font-weight:400; }
  .sous button.lien:hover { background:#f3f7fb; }
  .sous a.dl { font-size:13px; color:#5a6b7d; text-decoration:none; border-bottom:1px dotted #8aa0b4; }
  .sous .util { font-size:13px; color:#5a6b7d; }
  .experiences { margin:18px 0 30px; }
  .experience { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center;
                gap:14px; border:1.5px solid var(--bord); border-radius:12px; padding:14px 18px;
                margin:12px 0; background:#f9fbfd; break-inside:avoid; }
  .experience strong { color:var(--bleu); font-size:16px; }
  .experience p { margin:4px 0 0; font-size:13.5px; color:var(--texte); max-width:640px; }
  .experience .sous { margin:0; }
  .experience-fichiers { flex-basis:100%; margin-top:2px; font-size:13px; }
  .experience-fichiers a.dl { margin-right:12px; }
  .sous a.ouvrir { font:600 13.5px Calibri,sans-serif; padding:6px 16px; color:#fff;
                   background:var(--bleu); border:1.5px solid var(--bleu); border-radius:999px;
                   cursor:pointer; text-decoration:none; display:inline-block; }
  .sous a.ouvrir:hover { background:#15304f; }
  .ou { border-left:4px solid var(--bleu); background:#f3f7fb; border-radius:6px;
        padding:10px 14px; margin:14px 0; font-size:14px; }
  .ou code { background:#fff; border:1px solid var(--bord); border-radius:4px; padding:1px 6px;
             font-family:Consolas,monospace; font-size:13px; }
  .ou button { font:600 13px Calibri,sans-serif; padding:4px 12px; margin-left:6px; color:var(--bleu);
               background:#fff; border:1.5px solid #2f5689; border-radius:999px; cursor:pointer; }
  .sous .util b { color:var(--bleu); }
  .vide { color:#c0392b; font-weight:600; font-size:13px; }
  @media print { .barre, .sous button, .sous a.ouvrir { display:none } .planche { break-inside:avoid } }
</style><link rel='stylesheet' href='moteur/impression.css' media='print'></head><body>
<h1>Toutes les planches du pack</h1>
<p class="meta">${N.total} planches, dont <b>${N.animees} animées</b> (${N.narratives} récits qui se
déroulent une fois, ${N.cycliques} en boucle) et ${N.fixes} fixes — ${N.animations} animations au total.
Page relevée à chaque fabrication du pack : une planche ajoutée apparaît ici sans que personne y pense.</p>
<p class="meta"><b>Une animation narrative ne se joue qu'une fois, au chargement.</b> Si vous arrivez
après la fin, vous voyez l'image finale — c'est voulu : au repos, le dessin doit déjà être juste.
Le bouton <b>↻ Rejouer</b> la relance depuis le début.</p>
`;

if (EXPERIENCES.length) {
  h += `<div class="experiences">
<h1 style="margin-top:10px">Cours interactifs complets</h1>
<p class="meta">Pas des planches, des pages entières — voix, mise en scène, parfois un mini-jeu.
À ouvrir en plein écran, dans un nouvel onglet, ou à récupérer pour un autre projet.</p>
<p class="meta">Licence : contenu pédagogique CC BY-NC-SA 4.0, pas d'usage commercial sans accord
— voir <a href="LICENCE.md">LICENCE.md</a>.</p>`;
  for (const e of EXPERIENCES) {
    h += `<div class="experience">
  <div class="experience-info"><strong>${esc(e.titre)}</strong>${e.desc ? `<p>${esc(e.desc)}</p>` : ""}</div>
  <div class="sous">
    <a class="ouvrir" href="${esc(e.url)}" target="_blank" rel="noopener">Ouvrir ▸</a>
    <button class="lien" data-url="${esc(e.url)}">🔗 Lien</button>
  </div>
  <div class="experience-fichiers">
    <span class="util">Récupérer le code :</span>
    ${e.fichiers.map((f) => `<a class="dl" href="${esc(f)}" download title="Télécharger ${esc(basename(f))}">⬇ ${esc(basename(f))}</a>`).join(" ")}
${e.sousDossiers.length ? `    <span class="util"> + dossier ${e.sousDossiers.map(esc).join(", ")}/ (images — cloner le dépôt pour les récupérer)</span>` : ""}
  </div>
</div>`;
  }
  h += `</div>`;
}

h += `
<div class="ou">
<b>Où sont ces planches, et comment les partager.</b><br>
Dans le dépôt : <code>packs/fluides/res/svg/</code> — un fichier <code>.svg</code> par planche,
fait à la main, 3 à 10 Ko pièce.<br>
En ligne, <b>chacune a sa propre adresse</b> et s'ouvre seule dans un navigateur, sur n'importe
quel appareil : le bouton <b>🔗 Lien</b> sous chaque planche copie cette adresse, prête à coller
dans un message. <b>⬇ Fichier</b> ouvre le SVG seul — c'est aussi la meilleure façon de voir une
animation en grand, et l'enregistrer se fait d'un clic droit.<br>
Pour partager <b>toute la galerie</b> d'un coup :
<code id="url-galerie">…</code><button id="copier-galerie">🔗 Copier</button>
<span id="dit-galerie" style="margin-left:8px;color:#1e6b40;font-weight:700"></span>
</div>
`;

if (SYMBOLES) {
  h += `
<div class="ou">
<b>La bibliothèque de symboles.</b><br>
À côté des planches, <b>${SYMBOLES.nombre.toLocaleString("fr-FR")} symboles normalisés</b> —
électrotechnique, froid et climatisation, hydraulique, pneumatique, logique. Un fichier par
symbole, une adresse par symbole :
<code>symboles/svg/moteur-triphase.svg</code>. Le catalogue est dans
<code>symboles/index.json</code>, filtrable côté navigateur.<br>
<span class="meta"><b>Ces symboles ne sont pas de nous, et leur licence n'est pas celle du
pack.</b> Ils viennent de la collection d'éléments
<a href="https://qelectrotech.org/" target="_blank" rel="noopener">QElectroTech</a>, publiée sous
<a href="https://creativecommons.org/licenses/by/3.0/deed.fr" target="_blank" rel="noopener">Creative
Commons Attribution 3.0</a>, convertis en SVG par F. Henninot. Les rediffuser oblige à reprendre
cette attribution — et la licence amont interdit par ailleurs de s'en servir comme données
d'entraînement pour un modèle. Conditions complètes :
<a href="symboles/LICENCE.md">symboles/LICENCE.md</a>.</span>
</div>
`;
}

if (SCHEMAS?.schemas?.length) {
  const projets = [...new Set(SCHEMAS.schemas.map((s) => s.projet))];
  h += `
<div class="ou">
<b>Les schémas de cours.</b><br>
<b>${SCHEMAS.schemas.length} folios</b> dessinés sous QElectroTech pour les TP et les TD —
${esc(projets.join(" · "))}. Le circuit fluidique, le pump-down, l'armoire CAP IFCA, le
raccordement du régulateur. Ils sont dans <code>schemas/svg/</code>, une adresse par folio,
et leurs fichiers source <code>.qet</code> sont à côté dans <code>schemas/qet/</code> :
un collègue peut les rouvrir et les modifier, pas seulement les regarder.<br>
<span class="meta">Le tracé des conducteurs est <b>recalculé</b> par l'outil de conversion —
QElectroTech ne le stocke pas dans le fichier. Le résultat tient, mais une liaison peut
passer ailleurs que dans le logiciel : à vérifier avant d'imprimer un sujet d'évaluation.
Détail et régénération : <a href="schemas/README.md">schemas/README.md</a>.</span>
</div>
`;
}

h += `
<div class="ou" id="zone-son" style="display:none">
<b>Habillage sonore.</b> Certaines planches ont une bande-son calée sur leur animation — un pas
dans l'escalier, un clic de vanne, une alerte. <b>Le son est coupé par défaut</b> et rien ne se
charge tant qu'il ne sert pas : votre choix est mémorisé sur cet appareil.
<span id="ici-son"></span><br>
<span class="meta">Ces sons <b>habillent</b> l'animation. Ils n'enseignent aucun diagnostic à
l'oreille : une fuite réelle ne fait pas ce bruit-là.</span>
</div>

<div class="barre">
  <button class="f on" data-f="*">toutes</button>
  <button class="f" data-f="anime">animées</button>
  <button class="f" data-f="narratif">récits</button>
  <button class="f" data-f="cyclique">boucles</button>
  <button class="f" data-f="fixe">fixes</button>
  <button class="f" data-f="orpheline">non utilisées</button>
  <button class="tout" id="tout">↻ Rejouer toutes les animations visibles</button>
  <span class="cpt" id="cpt"></span>
</div>
`;

for (const p of PLANCHES) {
  const classes = [
    p.anime ? "anime" : "fixe",
    p.cyclique ? "cyclique" : p.anime ? "narratif" : "",
    p.fiches.length ? "" : "orpheline",
  ].filter(Boolean).join(" ");
  h += `<div class="planche" data-c="${classes}">`;
  h += `<h2>${esc(p.titre || p.fichier.replace(/\.svg$/, ""))}</h2>`;
  h += `<div class="f">${esc(p.fichier)} · ${p.ko} Ko</div>`;
  h += `<div class="tags">`;
  if (p.anime && !p.cyclique)
    h += `<span class="tag anim">récit${p.duree ? ` — ${p.duree} s` : ""}, une seule fois</span>`;
  else if (p.cyclique) h += `<span class="tag cyc">boucle continue</span>`;
  else h += `<span class="tag fixe">dessin fixe</span>`;
  if (p.smil) h += `<span class="tag cyc">${p.smil} animations SMIL</span>`;
  if (p.css) h += `<span class="tag cyc">${p.css} animations CSS</span>`;
  if (!p.fiches.length) h += `<span class="tag orph">utilisée par aucune fiche</span>`;
  h += `</div>`;
  h += `<img src="packs/fluides/res/svg/${esc(p.fichier)}" alt="${esc(p.titre)}" loading="lazy">`;
  h += `<div class="sous">`;
  if (p.anime) h += `<button class="rejeu" data-svg="${esc(p.fichier)}">↻ Rejouer</button>`;
  h += `<button class="lien" data-f="${esc(p.fichier)}">🔗 Lien</button>`;
  h += `<a class="dl" href="packs/fluides/res/svg/${esc(p.fichier)}" target="_blank" rel="noopener">⬇ Fichier</a>`;
  if (p.fiches.length) {
    h += `<span class="util">Sur ${p.fiches.length > 1 ? "les fiches" : "la fiche"} ` +
      p.fiches.map((f) => `<b>${esc(f.id)}</b> ${esc(f.titre)}`).join(" · ") + `</span>`;
  } else {
    h += `<span class="vide">Aucune fiche ne l'utilise — dessin en réserve, ou oubli d'intégration.</span>`;
  }
  h += `</div></div>`;
}

h += `
<p class="meta" style="margin-top:30px">Les planches sont des SVG faits à la main, dans la charte
inerWeb Édu. Aucune n'est produite par un modèle d'image : un rendu génératif inverse la croix du
frigoriste et invente des organes qui n'existent pas.</p>
<script src="packs/fluides/sons.js?v=${VERSION}"></script>
<script src="moteur/sons.js?v=${VERSION}"></script>
<script>
(function () {
  var n = 0, f = "*";
  var blocs = [].slice.call(document.querySelectorAll(".planche"));
  var cpt = document.getElementById("cpt");
  function relancer(im) {
    var base = im.getAttribute("src").split("?")[0];
    im.setAttribute("src", base + "?r=" + ++n);
  }
  function filtrer() {
    var v = 0;
    blocs.forEach(function (b) {
      var ok = f === "*" || (" " + b.dataset.c + " ").indexOf(" " + f + " ") >= 0;
      b.classList.toggle("masque", !ok);
      if (ok) v++;
    });
    cpt.textContent = v + " planche(s) affichée(s)";
  }
  [].slice.call(document.querySelectorAll(".barre button.f")).forEach(function (b) {
    b.addEventListener("click", function () {
      [].slice.call(document.querySelectorAll(".barre button.f")).forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); f = b.dataset.f; filtrer();
    });
  });
  [].slice.call(document.querySelectorAll("button.rejeu")).forEach(function (b) {
    b.addEventListener("click", function () {
      relancer(b.closest(".planche").querySelector("img"));
      // la bande-son repart du même instant que l'image
      if (window.PiloteSons) window.PiloteSons.jouerPlanche(b.dataset.svg);
    });
  });

  /* Copier une adresse. navigator.clipboard n'existe qu'en HTTPS (ou sur
     localhost) : ouverte depuis une clé USB en file://, la page doit rester
     utile — on retombe alors sur une sélection du texte, que l'utilisateur
     copie lui-même. Une fonction qui échoue en silence serait pire que rien. */
  function copier(txt, dire) {
    function ok() { dire("copié ✓"); setTimeout(function () { dire(""); }, 2200); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(ok, function () { dire(txt); });
    } else {
      var z = document.createElement("textarea");
      z.value = txt; z.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(z); z.select();
      try { document.execCommand("copy"); ok(); } catch (e) { dire(txt); }
      z.remove();
    }
  }
  [].slice.call(document.querySelectorAll("button.lien")).forEach(function (b) {
    b.addEventListener("click", function () {
      var base = location.href.replace(/galerie\\.html.*$/, "");
      var u = b.dataset.url ? (base + b.dataset.url) : (base + "packs/fluides/res/svg/" + b.dataset.f);
      var t = b.textContent;
      copier(u, function (m) { b.textContent = m || t; });
    });
  });
  /* Le bloc du son n'apparaît que si l'habillage est réellement disponible :
     une commande qui ne commande rien vaut moins que pas de commande. */
  if (window.PiloteSons && window.PiloteSons.disponible()) {
    document.getElementById("zone-son").style.display = "";
    document.getElementById("ici-son").innerHTML = " " + window.PiloteSons.html("");
    window.PiloteSons.brancher();
    // marquer les planches qui ont une bande-son
    [].slice.call(document.querySelectorAll("button.rejeu")).forEach(function (b) {
      var seq = window.PILOTE_SONS.planches[b.dataset.svg];
      if (seq && seq.length) b.textContent = "↻ Rejouer 🔊";
    });
  }
  var champ = document.getElementById("url-galerie");
  if (champ) {
    champ.textContent = location.href.split("?")[0].split("#")[0];
    document.getElementById("copier-galerie").addEventListener("click", function () {
      copier(champ.textContent, function (m) { document.getElementById("dit-galerie").textContent = m; });
    });
  }
  document.getElementById("tout").addEventListener("click", function () {
    blocs.forEach(function (b) {
      if (b.classList.contains("masque")) return;
      var im = b.querySelector("img");
      if (b.querySelector("button.rejeu") && im) relancer(im);
    });
  });
  filtrer();
})();
</script>
<script src="moteur/lisibilite.js?v=${VERSION}"></script>
<script src="moteur/marque.js?v=${VERSION}"></script>
<script src="moteur/marque.js?v=${VERSION}"></script>
</body></html>`;

writeFileSync(resolve(RACINE, "galerie.html"), h, "utf8");
console.log("  galerie : " + N.total + " planches · " + N.animees + " animées (" +
  N.narratives + " récits, " + N.cycliques + " boucles) · " + N.animations + " animations" +
  (N.orphelines ? " · ⚠ " + N.orphelines + " non utilisée(s)" : "") +
  " · " + EXPERIENCES.length + " expérience(s) interactive(s) complète(s)");
console.log("  → galerie.html");
