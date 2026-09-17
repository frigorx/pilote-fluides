/* =====================================================================
   accueil.mjs — le hall d'inerweb.fr, RELEVÉ et non saisi
   ---------------------------------------------------------------------
   POURQUOI : l'accueil refait le 17/09/2026 (F. Henninot : « l'effet
   waouh, comprendre instantanément ») montre les réseaux en vignettes,
   les chiffres du site et une carte animée du réseau des réseaux. Tout
   cela dérive d'UNE source (moteur/reseaux.js) et de comptes RELEVÉS
   (docs/catalogue-2026-09/catalogue-stations.json, fichiers audio sur le
   disque) : un chiffre écrit à la main dérive, celui-ci se relève.
   ENTRÉES  moteur/reseaux.js · le catalogue des stations · les MP3 du dépôt
   SORTIE   index.html — trois blocs réécrits entre sentinelles, idempotent :
              <!-- CARTE-RESEAUX DEBUT/FIN -->    la carte animée (SVG en ligne)
              <!-- CHIFFRES-ACCUEIL DEBUT/FIN --> les quatre compteurs
              <!-- RESEAUX DEBUT/FIN -->          les vignettes de réseau
   USAGE    node build/accueil.mjs   (à brancher dans build.mjs avant version.mjs)
   PIÈGES   (1) refuse en dur une adresse de reseaux.js qui n'existe pas sur
   le disque ; (2) ne touche qu'entre les sentinelles, fins de ligne du
   fichier respectées ; (3) la carte s'anime en CSS : sans animation
   (mouvement réduit), tout est visible — l'état caché ne vit que dans le
   `from` de l'animation, jamais dans le style de base.
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = resolve(RACINE, "index.html");

/* ---- 1. La source : moteur/reseaux.js ---- */
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync(resolve(RACINE, "moteur/reseaux.js"), "utf8"), ctx);
const RESEAUX = ctx.window.INERWEB_RESEAUX;
if (!Array.isArray(RESEAUX) || !RESEAUX.length) throw new Error("moteur/reseaux.js : liste vide");

/* ---- 2. Les comptes relevés ---- */
const catalogue = JSON.parse(readFileSync(resolve(RACINE, "docs/catalogue-2026-09/catalogue-stations.json"), "utf8")).stations;
function compterMp3(dossier) {
  let n = 0;
  const marcher = (d, prof) => {
    let e; try { e = readdirSync(d); } catch { return; }
    for (const nom of e) {
      const p = join(d, nom);
      let st; try { st = statSync(p); } catch { continue; }
      if (st.isDirectory()) { if (nom !== ".git" && nom !== "node_modules" && prof < 8) marcher(p, prof + 1); }
      else if (/\.mp3$/i.test(nom)) n++;
    }
  };
  marcher(resolve(RACINE, dossier), 0);
  return n;
}
const audio = compterMp3("packs/fluides/res") + compterMp3("electrorezo") + compterMp3("legislation") + compterMp3("hydrometro") + compterMp3("aerorezo");

const comptes = RESEAUX.map((r) => {
  const st = catalogue.filter((s) => r.catalogue.includes(s.reseau));
  const lignes = r.lignes || new Set(st.flatMap((s) => (s.ligne || "").split(",").map((x) => x.trim()).filter(Boolean))).size;
  return { id: r.id, stations: st.length, lignes };
});
const total = {
  reseaux: RESEAUX.length,
  stations: comptes.reduce((a, c) => a + c.stations, 0),
  lignes: comptes.reduce((a, c) => a + c.lignes, 0),
  audio,
};

/* ---- 3. Les adresses existent-elles ? (refus en dur) ---- */
function existe(href) {
  const sansParam = href.split(/[?#]/)[0];
  if (!sansParam) return true;
  const p = resolve(RACINE, sansParam);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, "index.html")));
}
const manquantes = [];
for (const r of RESEAUX) {
  for (const h of [r.adresse, r.vignette, r.entree.href, ...r.raccourcis.map((x) => x.href)]) if (!existe(h)) manquantes.push(`${r.id} → ${h}`);
}
if (manquantes.length) { console.error("accueil.mjs : adresses introuvables sur le disque :\n  " + manquantes.join("\n  ")); process.exit(1); }

/* ---- 4. Les trois blocs ---- */
const fr = (n) => n.toLocaleString("fr-FR").replace(/ /g, " ");
const arrondi = (n) => (n >= 1000 ? Math.floor(n / 100) * 100 : n);
const ech = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const chiffres = [
  { v: total.reseaux, l: "réseaux de cours" },
  { v: total.stations, l: "stations, un cours chacune" },
  { v: total.lignes, l: "lignes à suivre" },
  { v: arrondi(total.audio), l: "narrations audio", prefixe: "+ de " },
].map((c) => `      <div class="chiffre"><b>${c.prefixe || ""}${fr(c.v)}</b><span>${c.l}</span></div>`).join("\n");

const vignettes = RESEAUX.map((r) => {
  const c = comptes.find((x) => x.id === r.id);
  const etat = r.etat ? ` <span class="v-etat">${ech(r.etat)}</span>` : "";
  const raccourcis = r.raccourcis.map((x) => `<a href="${ech(x.href)}">${ech(x.titre)}</a>`).join("\n        ");
  return `      <article class="vignette" style="--c:${r.couleur}">
        <a class="v-carte" href="${ech(r.adresse)}" aria-label="Entrer dans ${ech(r.nom)}"><img src="${ech(r.vignette)}" alt="" loading="lazy" width="400" height="190"></a>
        <div class="v-corps">
          <h3 class="v-nom"><a href="${ech(r.adresse)}">${r.emoji} ${ech(r.nom)}</a></h3>
          <p class="v-chiffres">${c.stations} stations · ${c.lignes} lignes <span class="v-niv">${ech(r.niveaux)}</span>${etat}</p>
          <p class="v-det">${ech(r.sousTitre)}</p>
          <p class="v-entrees"><a class="v-entree" href="${ech(r.entree.href)}">▶ ${ech(r.entree.titre)}</a>
        ${raccourcis}</p>
        </div>
      </article>`;
}).join("\n");

/* La carte du réseau des réseaux : un pôle, une ligne par réseau, autant de
   points que de lignes dans le réseau (plafonné à 8 pour rester lisible), le
   nom AU BOUT de la ligne — jamais dessus (charte). */
const W = 640, H = 60 + RESEAUX.length * 62;
const hubX = 96, hubY = H / 2;
let svg = `<svg class="carte-reseaux" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cr-titre">
<title id="cr-titre">Le réseau des réseaux inerWeb : ${total.reseaux} réseaux, ${total.stations} stations</title>
<style>
.cr-l{stroke-width:9;fill:none;stroke-linecap:round;animation:cr-tracer 1.5s ease-out both}
.cr-s{animation:cr-paraitre .35s ease-out both}
.cr-t{font:700 15px "Trebuchet MS",Calibri,Arial,sans-serif}
.cr-n{font:13px Calibri,"Segoe UI",Arial,sans-serif;fill:#637285}
@keyframes cr-tracer{from{stroke-dasharray:1000;stroke-dashoffset:1000}to{stroke-dasharray:1000;stroke-dashoffset:0}}
@keyframes cr-paraitre{from{opacity:0;transform:scale(.4);transform-origin:center;transform-box:fill-box}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.cr-l,.cr-s{animation:none}}
</style>
<circle cx="${hubX}" cy="${hubY}" r="40" fill="#fffdf8" stroke="#1b3a63" stroke-width="7"/>
<text x="${hubX}" y="${hubY - 4}" text-anchor="middle" class="cr-t" fill="#1b3a63">inerWeb</text>
<text x="${hubX}" y="${hubY + 14}" text-anchor="middle" class="cr-n">${total.stations} stations</text>
`;
RESEAUX.forEach((r, i) => {
  const c = comptes.find((x) => x.id === r.id);
  const y = 42 + i * 62;
  const xFin = 440, xDroite = 300;
  const delai = (i * 0.18).toFixed(2);
  svg += `<path class="cr-l" d="M ${hubX + 44} ${hubY} C ${hubX + 130} ${hubY}, ${xDroite - 60} ${y}, ${xDroite} ${y} L ${xFin} ${y}" stroke="${r.couleur}" style="animation-delay:${delai}s"/>\n`;
  const n = Math.min(c.lignes, 8);
  for (let j = 0; j < n; j++) {
    const x = xDroite + 10 + (j * (xFin - xDroite - 20)) / Math.max(n - 1, 1);
    svg += `<circle class="cr-s" cx="${x.toFixed(1)}" cy="${y}" r="6.5" fill="#fffdf8" stroke="${r.couleur}" stroke-width="3.5" style="animation-delay:${(i * 0.18 + 0.9 + j * 0.05).toFixed(2)}s"/>\n`;
  }
  svg += `<text x="${xFin + 16}" y="${y + 5}" class="cr-t" fill="${r.couleur}">${ech(r.court)}</text>\n`;
  svg += `<text x="${xFin + 16}" y="${y + 22}" class="cr-n">${c.stations} stations · ${c.lignes} lignes</text>\n`;
});
svg += `</svg>`;

/* Le JSON-LD de l'accueil : le site, son éditeur, l'action de recherche (plan.html?q=)
   et la liste des réseaux — depuis la même source. Le plan garde son propre
   JSON-LD (plan-liste.mjs → plan.html). */
const jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite", "@id": "https://inerweb.fr/#site", "name": "inerWeb Édu", "alternateName": "inerWeb",
      "url": "https://inerweb.fr/", "inLanguage": "fr",
      "description": `${total.reseaux} réseaux de cours interactifs et gratuits sur le froid, la climatisation, l’hydraulique, l’aéraulique, l’électrotechnique et la réglementation — ${total.stations} stations, une voix qui explique, sans compte.`,
      "publisher": { "@id": "https://inerweb.fr/#org" },
      "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://inerweb.fr/plan.html?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
    { "@type": "Organization", "@id": "https://inerweb.fr/#org", "name": "inerWeb", "url": "https://inerweb.fr/", "logo": "https://inerweb.fr/icones/og-inerweb-1200x630.png", "email": "inerweb.fh@gmail.com" },
    {
      "@type": "ItemList", "name": "Les réseaux de cours inerWeb", "numberOfItems": total.reseaux,
      "itemListElement": RESEAUX.map((r, i) => ({ "@type": "ListItem", "position": i + 1, "name": r.nom, "url": "https://inerweb.fr/" + r.adresse, "description": r.sousTitre })),
    },
  ],
};
const jsonldHtml = `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`;

/* ---- 5. Écriture entre sentinelles, fins de ligne respectées ---- */
let html = readFileSync(PAGE, "utf8");
const nl = html.includes("\r\n") ? "\r\n" : "\n";
function remplacer(nom, contenu) {
  const re = new RegExp(`(<!-- ${nom} DEBUT[^>]*-->)\\r?\\n[\\s\\S]*?(<!-- ${nom} FIN -->)`);
  if (!re.test(html)) throw new Error(`index.html : sentinelles ${nom} introuvables`);
  html = html.replace(re, (m, a, b) => a + nl + contenu.replace(/\r?\n/g, nl) + nl + b);
}
remplacer("CARTE-RESEAUX", svg);
remplacer("CHIFFRES-ACCUEIL", chiffres);
remplacer("RESEAUX", vignettes);
remplacer("JSON-LD-ACCUEIL", jsonldHtml);
writeFileSync(PAGE, html, "utf8");
console.log(`accueil : ${total.reseaux} réseaux, ${total.stations} stations, ${total.lignes} lignes, ${total.audio} fichiers audio (affiché « + de ${fr(arrondi(total.audio))} ») → index.html`);
comptes.forEach((c) => console.log(`  ${c.id} : ${c.stations} stations · ${c.lignes} lignes`));
