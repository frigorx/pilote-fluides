/* Génère batiment3d/zones.json à partir du tableau RESEAU de ../index.html.
   Jamais saisi à la main : la source unique reste le plan.
   Usage :  node batiment3d/generer-zones.mjs [chemin/index.html] [sortie.json]  */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ici = dirname(fileURLToPath(import.meta.url));
const source = process.argv[2] || join(ici, "..", "index.html");
const sortie = process.argv[3] || join(ici, "zones.json");

/* Les onze sous-lignes que la maquette 3D sait dessiner. */
const ATTENDUES = [
  "regl-acoustique", "regl-fluidique", "regl-desp", "regl-electrique", "regl-incendie",
  "regl-thermique", "regl-certifs", "regl-travail", "secu-risques", "secu-dechets", "secu-impact"
];

const html = readFileSync(source, "utf8");
const debut = html.indexOf("var RESEAU = [");
if (debut < 0) throw new Error("« var RESEAU = [ » introuvable dans " + source);

/* Extraction du littéral : on suit les crochets en ignorant chaînes et commentaires. */
const ouvre = html.indexOf("[", debut);
let prof = 0, i = ouvre, fin = -1;
while (i < html.length) {
  const c = html[i], d = html[i + 1];
  if (c === '"' || c === "'") {                       // chaîne
    const q = c; i++;
    while (html[i] !== q) { if (html[i] === "\\") i++; i++; }
  } else if (c === "/" && d === "*") {                // commentaire /* */
    i = html.indexOf("*/", i) + 1;
  } else if (c === "/" && d === "/") {                // commentaire //
    i = html.indexOf("\n", i);
  } else if (c === "[") prof++;
  else if (c === "]") { prof--; if (prof === 0) { fin = i; break; } }
  i++;
}
if (fin < 0) throw new Error("fin du tableau RESEAU introuvable");
const RESEAU = new Function("return " + html.slice(ouvre, fin + 1))();

const lignes = [];
for (const mere of RESEAU) {
  for (const f of mere.filles) {
    lignes.push({
      id: f.id, ico: f.ico || "", nom: f.nom, sous: f.sous, couleur: f.couleur,
      mere: mere.nom, mereCouleur: mere.couleur, correspondance: !!f.corr,
      stations: f.stations.map((s) => ({
        nom: s.nom, sous: s.sous, href: s.href || null, correspondance: !!s.corr
      }))
    });
  }
}
const manquantes = ATTENDUES.filter((id) => !lignes.some((l) => l.id === id));
if (manquantes.length) throw new Error("sous-lignes absentes du plan : " + manquantes.join(", "));

const nb = lignes.reduce((n, l) => n + l.stations.length, 0);
const ouvertes = lignes.reduce((n, l) => n + l.stations.filter((s) => s.href).length, 0);
writeFileSync(sortie, JSON.stringify({
  genere: "node batiment3d/generer-zones.mjs (depuis index.html, tableau RESEAU)",
  stations: nb, ouvertes, lignes
}, null, 1) + "\n", "utf8");
console.log(`zones.json : ${lignes.length} sous-lignes, ${nb} stations dont ${ouvertes} ouvertes -> ${sortie}`);
