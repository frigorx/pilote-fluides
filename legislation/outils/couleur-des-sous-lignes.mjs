/* =====================================================================
   couleur-des-sous-lignes.mjs — rend à chaque station la couleur de SA
   sous-ligne
   ---------------------------------------------------------------------
   POURQUOI. Les stations sont bâties en copiant le gabarit (F-Gaz 3 puis
   Aptitude & capacité), feuille de style comprise. Elles héritaient donc
   toutes de l'accent de la sous-ligne Fluidique & thermique — une station
   Thermique ou Déchets s'habillait en bleu-vert, et le repère de couleur
   du plan ne se retrouvait plus en arrivant sur le cours.

   CE QUE FAIT CE SCRIPT. Il lit la couleur de chaque sous-ligne DANS LE
   PLAN lui-même (`legislation/index.html`, tableau RESEAU), déduit la
   sous-ligne d'une station à partir de son préfixe de slug, et réécrit
   `--sous-ligne` et `--sous-ligne-bg` dans son `styles.css`. La couleur
   n'est donc jamais saisie ici : le plan fait foi, et les deux ne peuvent
   pas diverger.

   Le fond clair `--sous-ligne-bg` est calculé depuis l'accent (mélange à
   12 % sur du papier), pour rester lisible quelle que soit la teinte.

   Idempotent : relancer sans rien changer ne modifie aucun fichier.

   Usage : node legislation/outils/couleur-des-sous-lignes.mjs
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "..");
const PLAN = join(RACINE, "index.html");
const STATIONS = join(RACINE, "stations");

/* Le préfixe de slug qui rattache une station à sa sous-ligne. C'est la
   seule convention à tenir en nommant une nouvelle station. */
const PREFIXES = {
  "thermique-": "regl-thermique",
  "acoustique-": "regl-acoustique",
  "incendie-": "regl-incendie",
  "elec-": "regl-electrique",
  "desp-": "regl-desp",
  "certif-": "regl-certifs",
  "travail-": "regl-travail",
  "risques-": "secu-risques",
  "dechets-": "secu-dechets",
  "impact-": "secu-impact",
};
/* Les deux stations de la sous-ligne Fluidique ne portent pas de préfixe
   commun : leurs noms sont antérieurs à la convention. */
const CAS_PARTICULIERS = { "fgaz-3": "regl-fluidique", "aptitude-capacite": "regl-fluidique" };

/* --- Les couleurs, lues dans le plan --------------------------------- */
const plan = readFileSync(PLAN, "utf8");
const couleurs = {};
const re = /\{\s*id:\s*"([a-z0-9-]+)"[\s\S]{0,400}?couleur:\s*"(#[0-9a-fA-F]{6})"/g;
let m;
while ((m = re.exec(plan)) !== null) couleurs[m[1]] = m[2];
if (!Object.keys(couleurs).length) {
  console.error("  Aucune couleur lue dans le plan — rien touché.");
  process.exit(1);
}

/* Fond clair : l'accent mélangé à 12 % sur le papier de la charte. */
function fondClair(hex) {
  const p = [0xff, 0xfd, 0xf8];
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return "#" + c.map((v, i) => Math.round(v * 0.12 + p[i] * 0.88).toString(16).padStart(2, "0")).join("");
}

/* --- La réécriture ---------------------------------------------------- */
let touchees = 0, vues = 0, sansRegle = [];
for (const slug of readdirSync(STATIONS)) {
  const dossier = join(STATIONS, slug);
  if (!statSync(dossier).isDirectory()) continue;
  const css = join(dossier, "styles.css");
  if (!existsSync(css)) continue;
  vues++;

  const prefixe = Object.keys(PREFIXES).find((p) => slug.startsWith(p));
  const idLigne = prefixe ? PREFIXES[prefixe] : CAS_PARTICULIERS[slug];
  if (!idLigne || !couleurs[idLigne]) { sansRegle.push(slug); continue; }

  const accent = couleurs[idLigne];
  const avant = readFileSync(css, "utf8");
  const apres = avant
    .replace(/--sous-ligne:\s*#[0-9a-fA-F]{6};/, `--sous-ligne:${accent};`)
    .replace(/--sous-ligne-bg:\s*#[0-9a-fA-F]{6};/, `--sous-ligne-bg:${fondClair(accent)};`);
  if (apres !== avant) { writeFileSync(css, apres, "utf8"); touchees++; }
}

console.log(`  couleurs : ${touchees} station(s) réalignée(s) sur ${vues} examinée(s)`);
if (sansRegle.length) {
  console.log(`  ⚠ sans règle de rattachement (préfixe de slug inconnu) : ${sansRegle.join(", ")}`);
}
