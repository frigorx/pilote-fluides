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
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARTES } from "../packs/fluides/cartes.js";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOSSIER = resolve(RACINE, "packs/fluides/res/svg");

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
  .sous .util { font-size:13px; color:#5a6b7d; }
  .sous .util b { color:var(--bleu); }
  .vide { color:#c0392b; font-weight:600; font-size:13px; }
  @media print { .barre, .sous button { display:none } .planche { break-inside:avoid } }
</style></head><body>
<h1>Toutes les planches du pack</h1>
<p class="meta">${N.total} planches, dont <b>${N.animees} animées</b> (${N.narratives} récits qui se
déroulent une fois, ${N.cycliques} en boucle) et ${N.fixes} fixes — ${N.animations} animations au total.
Page relevée à chaque fabrication du pack : une planche ajoutée apparaît ici sans que personne y pense.</p>
<p class="meta"><b>Une animation narrative ne se joue qu'une fois, au chargement.</b> Si vous arrivez
après la fin, vous voyez l'image finale — c'est voulu : au repos, le dessin doit déjà être juste.
Le bouton <b>↻ Rejouer</b> la relance depuis le début.</p>

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
    h += `<span class="tag anim">récit — ${p.duree || "?"} s, une seule fois</span>`;
  else if (p.cyclique) h += `<span class="tag cyc">boucle continue</span>`;
  else h += `<span class="tag fixe">dessin fixe</span>`;
  if (p.smil) h += `<span class="tag cyc">${p.smil} animations SMIL</span>`;
  if (p.css) h += `<span class="tag cyc">${p.css} animations CSS</span>`;
  if (!p.fiches.length) h += `<span class="tag orph">utilisée par aucune fiche</span>`;
  h += `</div>`;
  h += `<img src="packs/fluides/res/svg/${esc(p.fichier)}" alt="${esc(p.titre)}" loading="lazy">`;
  h += `<div class="sous">`;
  if (p.anime) h += `<button class="rejeu">↻ Rejouer</button>`;
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
    b.addEventListener("click", function () { relancer(b.closest(".planche").querySelector("img")); });
  });
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
</body></html>`;

writeFileSync(resolve(RACINE, "galerie.html"), h, "utf8");
console.log("  galerie : " + N.total + " planches · " + N.animees + " animées (" +
  N.narratives + " récits, " + N.cycliques + " boucles) · " + N.animations + " animations" +
  (N.orphelines ? " · ⚠ " + N.orphelines + " non utilisée(s)" : ""));
console.log("  → galerie.html");
