/* =====================================================================
   extraire-cartes-reseaux.mjs — les cartes des réseaux en vignettes SVG
   ---------------------------------------------------------------------
   Rôle : pour chaque réseau, prendre la carte que sa page dessine déjà
   (SVG en ligne, styles portés par la feuille de la page), la rendre
   AUTONOME (styles calculés recopiés en attributs), en retirer les textes
   (illisibles en vignette, et la charte interdit un texte sur un tracé),
   et l'écrire dans icones/reseaux/<id>.svg. Silhouette, pas capture :
   un SVG, réintégrable et léger, jamais une image bitmap.
   Entrées : le serveur local http://localhost:8791 (pages servies) ;
   docs/catalogue-2026-09/catalogue-stations.json (HoCourant : la carte
   n'existe pas, on la fabrique — cinq paliers, un point par module).
   Sortie : icones/reseaux/*.svg (+ un journal sur la console).
   Pièges : (1) Playwright vient de C:/git/hydrometro, canal Chrome ;
   (2) le plan thermo-techno est recadré sur sa partie haute (viewBox
   1310 × 1180) — la carte entière fait 2 900 de haut, illisible en
   vignette ; (3) tout élément en display:none est retiré (vues de ligne
   cachées) ; (4) à relancer quand une carte de réseau change.
   ===================================================================== */
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("C:/git/hydrometro/node_modules/playwright");
const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const SORTIE = resolve(RACINE, "icones/reseaux");
const BASE = process.argv[2] || "http://localhost:8791";
mkdirSync(SORTIE, { recursive: true });

const CIBLES = [
  { id: "thermo-techno", page: "/index.html", selecteur: "#plan-svg svg", viewBox: "0 0 1310 1180", titre: "Le plan du réseau thermo-techno" },
  { id: "legislation", page: "/legislation/index.html", titre: "Le plan du réseau Législation" },
  { id: "hydrometro", page: "/hydrometro/index.html", titre: "Le plan d’HydroMétro" },
  { id: "aerorezo", page: "/aerorezo/index.html", titre: "Le plan d’AéroRézo" },
  { id: "electrorezo", page: "/electrorezo/carte-reseau.svg", document: true, titre: "Le plan d’ÉlectroRézo" },
];

const EXTRAIRE = ({ selecteur, estDocument }) => {
  let svg;
  if (estDocument) svg = document.documentElement;
  else if (selecteur) svg = document.querySelector(selecteur);
  else {
    svg = [...document.querySelectorAll("svg")]
      .map((s) => ({ s, r: s.getBoundingClientRect() }))
      .filter((x) => x.r.width > 200 && x.r.height > 120)
      .sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)[0];
    svg = svg && svg.s;
  }
  if (!svg) return null;
  const PROPS = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-dasharray", "opacity", "fill-opacity", "stroke-opacity"];
  for (const el of svg.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") { el.setAttribute("data-retirer", "1"); continue; }
    for (const p of PROPS) {
      const v = cs.getPropertyValue(p);
      if (v && v !== "none" || (p === "fill" && v === "none") || (p === "stroke" && v === "none")) el.setAttribute(p, v);
    }
  }
  const clone = svg.cloneNode(true);
  for (const el of clone.querySelectorAll("[data-retirer], text, title, desc, foreignObject, style, script, image")) el.remove();
  for (const el of clone.querySelectorAll("*")) { el.removeAttribute("class"); el.removeAttribute("id"); el.removeAttribute("style"); el.removeAttribute("tabindex"); el.removeAttribute("role"); el.removeAttribute("aria-label"); if (el.tagName.toLowerCase() === "a") { el.removeAttribute("href"); el.removeAttribute("xlink:href"); } }
  clone.removeAttribute("width"); clone.removeAttribute("height"); clone.removeAttribute("class"); clone.removeAttribute("id"); clone.removeAttribute("style");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  return { viewBox: clone.getAttribute("viewBox"), xml: new XMLSerializer().serializeToString(clone) };
};

const navigateur = await chromium.launch({ channel: "chrome" });
const ctx = await navigateur.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 } });
for (const c of CIBLES) {
  const page = await ctx.newPage();
  await page.goto(BASE + c.page, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(EXTRAIRE, { selecteur: c.selecteur || null, estDocument: !!c.document });
  await page.close();
  if (!r) { console.log(`${c.id} : aucune carte trouvée sur ${c.page}`); continue; }
  let xml = r.xml;
  if (c.viewBox) xml = xml.replace(/viewBox="[^"]*"/, `viewBox="${c.viewBox}"`);
  xml = xml.replace(/^<svg([^>]*)>/, (m, attrs) => `<svg${attrs.includes("preserveAspectRatio") ? attrs : attrs + ' preserveAspectRatio="xMidYMid meet"'}><title>${c.titre}</title>`);
  const chemin = resolve(SORTIE, `${c.id}.svg`);
  writeFileSync(chemin, xml, "utf8");
  console.log(`${c.id} : viewBox ${c.viewBox || r.viewBox} · ${Math.round(xml.length / 1024)} Ko → icones/reseaux/${c.id}.svg`);
}
await navigateur.close();

/* HoCourant : pas de carte sur la page — une échelle de paliers, un point par module. */
const catalogue = JSON.parse(readFileSync(resolve(RACINE, "docs/catalogue-2026-09/catalogue-stations.json"), "utf8")).stations;
const paliers = {};
for (const s of catalogue.filter((s) => s.reseau === "HoCourant")) (paliers[s.ligne] = paliers[s.ligne] || []).push(s.id);
const noms = Object.keys(paliers).sort();
const H = 60 + noms.length * 70, W = 520;
let corps = `<path d="M 90 40 L 90 ${H - 30}" fill="none" stroke="#b06a00" stroke-width="10" stroke-linecap="round"/>`;
noms.forEach((n, i) => {
  const y = 60 + i * 70;
  corps += `<circle cx="90" cy="${y}" r="13" fill="#fffdf8" stroke="#b06a00" stroke-width="6"/>`;
  corps += `<path d="M 118 ${y} L ${150 + paliers[n].length * 46} ${y}" fill="none" stroke="#e3a24a" stroke-width="6" stroke-linecap="round"/>`;
  paliers[n].forEach((m, j) => { corps += `<circle cx="${160 + j * 46}" cy="${y}" r="9" fill="#fffdf8" stroke="#b06a00" stroke-width="4"/>`; });
});
const hocourant = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"><title>Les paliers d’HoCourant</title>${corps}</svg>`;
writeFileSync(resolve(SORTIE, "hocourant.svg"), hocourant, "utf8");
console.log(`hocourant : ${noms.length} paliers, ${catalogue.filter((s) => s.reseau === "HoCourant").length} modules → icones/reseaux/hocourant.svg`);
