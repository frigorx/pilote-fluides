/* =====================================================================
   instants.mjs — la planche de contrôle des SCHÉMAS FIGÉS
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Le support de projection pose une illustration par fiche. Mesuré le
   31/07 : elle reste à l'écran **12,9 diapositives en moyenne**, jusqu'à
   20 d'affilée sur les fiches longues. Une image vue vingt fois ne lasse
   pas — elle disparaît, le stagiaire ne la voit plus dès le cinquième
   écran. C'est exactement le « sentiment de se lasser » que F. Henninot
   demande d'éviter depuis juillet.

   LA PISTE, ET POURQUOI ELLE NE COÛTE RIEN
   35 des 44 planches du pack sont ANIMÉES. Une animation SVG se fige à un
   instant choisi (`pauseAnimations()` + `setCurrentTime()` pour SMIL,
   `getAnimations()` pour les keyframes CSS). Le même fichier donne donc
   trois ou quatre images différentes, sans produire un seul pixel — et
   vectorielles, donc nettes sur n'importe quel vidéoprojecteur, là où une
   capture d'écran serait figée à une résolution.

   Mieux qu'une simple variation : l'image AVANCE AVEC LE PROPOS — la
   nappe de gaz monte dans le local pendant qu'on explique pourquoi.

   CE QUE CE SCRIPT NE PEUT PAS FAIRE, ET C'EST LE POINT
   Choisir les instants. Un instant mal placé donne un dessin à moitié
   tracé, et **rien ne se conclut sur une animation depuis un navigateur
   piloté** — la règle de F. Henninot, vérifiée une fois de plus ici : le
   panneau navigateur ne compose pas d'image quand il est masqué. Ce
   script produit donc une PLANCHE DE CONTRÔLE : chaque schéma à quatre
   instants, côte à côte. F. Henninot balaie, garde ou jette, et le choix
   ressort en JSON prêt à brancher.

   ENTRÉE   packs/fluides/res/svg/*.svg
   SORTIE   packs/fluides/res/svg/_verifier-instants.html
   USAGE    node build/instants.mjs
   ⚠️ La page doit être SERVIE en HTTP (elle lit les SVG par fetch pour les
   inliner) : `http://localhost:8143/formation/packs/fluides/res/svg/…`
   depuis le hub, ou le petit serveur de session. En `file://` le fetch
   est refusé et la page reste vide.
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOSSIER = resolve(RACINE, "packs/fluides/res/svg");

/* ---------------------------------------------------------------------
   Combien de temps dure l'animation d'une planche ?
   SMIL : le plus tardif des `begin + dur`, en tenant compte des
   répétitions. CSS : la plus longue des `animation-duration`, délai
   compris. On prend le maximum des deux, borné : au-delà de 20 s on ne
   projette plus une animation, on regarde un film.
   --------------------------------------------------------------------- */
function duree(svg) {
  const secondes = (v) => {
    if (!v) return 0;
    const m = String(v).match(/([\d.]+)\s*(ms|s)?/);
    if (!m) return 0;
    return parseFloat(m[1]) * (m[2] === "ms" ? 0.001 : 1);
  };

  let max = 0;

  // SMIL — <animate>, <animateTransform>, <animateMotion>
  for (const b of svg.matchAll(/<animate\w*\b[^>]*>/g)) {
    const bal = b[0];
    const d = secondes((bal.match(/\bdur="([^"]+)"/) || [])[1]);
    const deb = secondes((bal.match(/\bbegin="([^"]+)"/) || [])[1]);
    const rep = (bal.match(/\brepeatCount="([^"]+)"/) || [])[1];
    const n = rep === "indefinite" ? 1 : Math.max(1, parseFloat(rep) || 1);
    max = Math.max(max, deb + d * n);
  }

  // CSS — `animation: nom 3s …` ou `animation-duration: 3s`
  for (const a of svg.matchAll(/animation(?:-duration)?\s*:\s*([^;}]+)/g)) {
    for (const t of a[1].matchAll(/([\d.]+)(ms|s)\b/g))
      max = Math.max(max, secondes(t[1] + t[2]));
  }

  return Math.min(max, 20);
}

const planches = [];
for (const f of readdirSync(DOSSIER).filter((x) => x.endsWith(".svg"))) {
  const svg = readFileSync(resolve(DOSSIER, f), "utf8");
  const anime = /<animate\w*\b/.test(svg) || /@keyframes/.test(svg);
  if (!anime) continue;
  const d = duree(svg);
  if (d <= 0) continue; // animé mais sans durée exploitable : rien à figer
  planches.push({ f, d: Math.round(d * 10) / 10 });
}
planches.sort((a, b) => a.f.localeCompare(b.f));

/* Quatre instants par planche : le début qui a déjà quelque chose à
   montrer, deux temps intermédiaires, et la fin — l'état complet, celui
   qui tombe juste le plus souvent. */
const PARTS = [0.15, 0.42, 0.7, 0.99];

const page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Les schémas figés — choisir les instants</title>
<style>
  :root{ --navy:#1b3a63; --orange:#ff6b35; --orange-deep:#c9451a; --cream:#f7f1e7;
         --paper:#fffdf8; --ink:#10233c; --muted:#637285; --line:rgba(27,58,99,.16);
         --ok:#1e7e54; --ok-bg:#e3f5ec; }
  *{box-sizing:border-box}
  body{margin:0;padding:26px 22px 120px;background:var(--cream);color:var(--ink);
       font:16px/1.55 Calibri,'Segoe UI',system-ui,sans-serif}
  h1{font-family:'Trebuchet MS',Calibri,sans-serif;color:var(--navy);font-size:26px;margin:0 0 6px}
  .st{color:var(--muted);margin:0 0 18px;max-width:80ch}
  .mode{background:#fff4e0;border-left:5px solid #b06a00;border-radius:8px;padding:14px 18px;
        margin:0 0 24px;max-width:88ch;font-size:15px}
  .planche{background:var(--paper);border:1px solid var(--line);border-radius:14px;
           padding:16px 18px;margin:0 0 18px;box-shadow:0 2px 10px rgba(27,58,99,.07)}
  .planche h2{font-family:'Trebuchet MS',Calibri,sans-serif;color:var(--navy);font-size:17px;
              margin:0 0 2px}
  .planche .meta{color:var(--muted);font-size:13px;margin:0 0 12px}
  .vues{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  .vue{border:2px solid var(--line);border-radius:10px;background:#fff;padding:8px;
       cursor:pointer;text-align:center;position:relative}
  .vue:hover{border-color:var(--navy)}
  .vue.gardee{border-color:var(--ok);background:var(--ok-bg)}
  .vue.gardee::after{content:"gardé";position:absolute;top:6px;right:8px;font-size:11px;
                     font-weight:700;color:#fff;background:var(--ok);border-radius:999px;
                     padding:2px 8px;letter-spacing:.03em;text-transform:uppercase}
  .vue svg{width:100%;height:190px;display:block}
  .vue b{display:block;font-size:12.5px;color:var(--navy);margin-top:6px;font-weight:700}
  .barre{position:fixed;left:0;right:0;bottom:0;z-index:9;background:var(--navy);color:#fff;
         padding:12px 22px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;
         box-shadow:0 -3px 14px rgba(16,35,60,.28)}
  .barre b{font-size:17px}
  .barre .sp{flex:1}
  .barre button{font:inherit;font-weight:700;cursor:pointer;border:0;border-radius:999px;
                padding:8px 18px;background:var(--orange);color:#fff}
  .barre button:hover{background:var(--orange-deep)}
  .barre button.sec{background:rgba(255,255,255,.16)}
  #sortie{position:fixed;inset:6% 8%;z-index:12;background:var(--paper);border-radius:14px;
          padding:20px 24px;overflow:auto;display:none;box-shadow:0 24px 70px rgba(16,35,60,.4)}
  #sortie.on{display:block}
  #sortie textarea{width:100%;height:60vh;font:13px/1.5 Consolas,monospace;border:1px solid var(--line);
                   border-radius:8px;padding:12px}
  @media print{ .barre,#sortie{display:none!important} }
</style>
</head>
<body>

<h1>Les schémas figés — choisir les instants</h1>
<p class="st">Chaque planche animée du pack est montrée à <b>quatre instants</b> de son
animation. Le principe : au lieu de laisser la même illustration à l'écran pendant vingt
diapositives, on fait défiler ces instants au fil de la séquence — l'image avance avec le propos,
sans qu'aucun fichier soit produit.</p>

<div class="mode">
  <b>Ce qu'il faut faire :</b> cliquer sur les vues qui <b>tombent juste</b> — un dessin complet,
  lisible, qui veut dire quelque chose. Laisser de côté celles qui montrent un tracé à
  moitié fait. Trois vues gardées par planche suffisent ; une seule, c'est déjà mieux que rien.
  Quand c'est fini : <b>« Voir le résultat »</b> en bas, et me coller ce qui s'affiche.
</div>

<div id="tout"></div>

<div class="barre">
  <b id="compte">0 vue gardée</b>
  <span class="sp"></span>
  <button class="sec" id="b-fin">Tout garder la dernière vue</button>
  <button id="b-voir">Voir le résultat ▸</button>
</div>

<div id="sortie">
  <p><b>À me coller tel quel.</b> Chaque ligne : la planche, puis les instants gardés en secondes.</p>
  <textarea id="txt" readonly></textarea>
  <p><button id="b-fermer">Fermer</button></p>
</div>

<script>
"use strict";
var PLANCHES = ${JSON.stringify(planches)};
var PARTS = ${JSON.stringify(PARTS)};
var garde = {};   // fichier -> [instants]

/* Figer une animation : SMIL par l'horloge du document SVG, keyframes CSS
   par la Web Animations API. Les deux mécaniques coexistent dans le pack,
   il faut traiter les deux ou la moitié des planches ne bougerait pas. */
function figer(svg, t){
  try { svg.pauseAnimations(); svg.setCurrentTime(t); } catch(e){}
  if (svg.getAnimations) {
    svg.getAnimations({ subtree: true }).forEach(function(a){
      try { a.pause(); a.currentTime = t * 1000; } catch(e){}
    });
  }
}

function basculer(el, fichier, t){
  el.classList.toggle("gardee");
  garde[fichier] = garde[fichier] || [];
  var i = garde[fichier].indexOf(t);
  if (i >= 0) garde[fichier].splice(i, 1); else garde[fichier].push(t);
  garde[fichier].sort(function(a,b){ return a-b; });
  majCompte();
}

function majCompte(){
  var n = 0;
  for (var k in garde) n += garde[k].length;
  document.getElementById("compte").textContent =
    n + (n > 1 ? " vues gardées" : " vue gardée") + " sur " + (PLANCHES.length * PARTS.length);
}

(async function(){
  var tout = document.getElementById("tout");
  for (var p of PLANCHES) {
    var txt;
    try { txt = await (await fetch(p.f)).text(); }
    catch (e) {
      var err = document.createElement("div");
      err.className = "planche";
      err.innerHTML = "<h2>" + p.f + "</h2><p class='meta'>Non lisible — la page doit être " +
                      "SERVIE en HTTP, pas ouverte depuis le disque.</p>";
      tout.appendChild(err);
      continue;
    }
    var bloc = document.createElement("div");
    bloc.className = "planche";
    bloc.innerHTML = "<h2>" + p.f + "</h2><p class='meta'>animation de " + p.d +
                     " s — quatre instants</p><div class='vues'></div>";
    var vues = bloc.querySelector(".vues");
    for (var part of PARTS) {
      var t = Math.round(p.d * part * 10) / 10;
      var vue = document.createElement("div");
      vue.className = "vue";
      vue.innerHTML = txt + "<b>" + t.toFixed(1) + " s</b>";
      var svg = vue.querySelector("svg");
      if (svg) { svg.removeAttribute("width"); svg.removeAttribute("height"); figer(svg, t); }
      (function(vue, f, t){ vue.onclick = function(){ basculer(vue, f, t); }; })(vue, p.f, t);
      vues.appendChild(vue);
    }
    tout.appendChild(bloc);
  }
  majCompte();
})();

document.getElementById("b-fin").onclick = function(){
  // raccourci : la fin d'animation est l'état complet, elle tombe juste le plus souvent
  document.querySelectorAll(".planche").forEach(function(bloc){
    var derniere = bloc.querySelectorAll(".vue")[PARTS.length - 1];
    if (derniere && !derniere.classList.contains("gardee")) derniere.click();
  });
};

document.getElementById("b-voir").onclick = function(){
  var l = [];
  for (var k in garde) if (garde[k].length) l.push(k + " : " + garde[k].join(", "));
  document.getElementById("txt").value = l.length
    ? l.join("\\n")
    : "(aucune vue gardée — cliquer sur celles qui tombent juste)";
  document.getElementById("sortie").classList.add("on");
};
document.getElementById("b-fermer").onclick = function(){
  document.getElementById("sortie").classList.remove("on");
};
</script>
</body>
</html>
`;

writeFileSync(resolve(DOSSIER, "_verifier-instants.html"), page, "utf8");
console.log(
  "✓ _verifier-instants.html écrit — " + planches.length + " planches animées, " +
  planches.length * PARTS.length + " vues à trancher"
);
