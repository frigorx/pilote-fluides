/* =====================================================================
   sons.mjs — contrôle de l'habillage sonore
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   La table `packs/fluides/sons.js` porte des instants recopiés depuis les
   `begin` des SVG, et des noms de sons. Trois choses peuvent la rendre
   fausse en silence :
     · on retouche les temps d'une planche, et un son tombe désormais après
       la fin de l'animation — il se joue devant une image figée ;
     · on écrit un nom de son qui n'existe pas au catalogue ;
     · un son de type FICHIER est demandé alors que le .wav a disparu.
   Rien de tout cela ne se voit à l'usage : la lecture échoue en silence,
   par construction (un son qui plante ne doit pas casser une fiche).

   Il relève aussi les fichiers .wav devenus inutiles depuis que sept sons
   sur onze sont CALCULÉS par moteur/sons.js : ce sont des Ko à retirer.

   Usage : node build/sons.mjs [--strict]
   ===================================================================== */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SVG = resolve(RACINE, "packs/fluides/res/svg");
const AUDIO = resolve(RACINE, "packs/fluides/res/audio");
const STRICT = process.argv.includes("--strict");

const table = resolve(RACINE, "packs/fluides/sons.js");
if (!existsSync(table)) {
  console.log("  sons : aucune table — habillage désactivé");
  process.exit(0);
}

/* Le catalogue est déclaré dans le moteur : on le lit là où il vit, pour
   qu'un nom ajouté d'un côté ne manque pas de l'autre. */
const moteur = readFileSync(resolve(RACINE, "moteur/sons.js"), "utf8");
const bloc = moteur.slice(moteur.indexOf("var CATALOGUE = {"), moteur.indexOf("var ctx = null"));
const CALCULES = new Set([...bloc.matchAll(/(\w+):\s*\{\s*calcule:/g)].map((m) => m[1]));
const FICHIERS = new Map(
  [...bloc.matchAll(/(\w+):\s*\{\s*fichier:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]])
);

global.window = {};
eval(readFileSync(table, "utf8"));
const T = global.window.PILOTE_SONS;

function finDe(fichier) {
  const p = resolve(SVG, fichier);
  if (!existsSync(p)) return null;
  const svg = readFileSync(p, "utf8");
  let fin = 0, boucle = false;
  for (const m of svg.matchAll(/<animate[^>]*>/g)) {
    const b = parseFloat((m[0].match(/begin="([\d.]+)s"/) || [])[1] || 0);
    const d = parseFloat((m[0].match(/dur="([\d.]+)s"/) || [])[1] || 0);
    if (/repeatCount="indefinite"/.test(m[0])) boucle = true;
    if (b + d > fin) fin = b + d;
  }
  if (/animation\s*:/.test(svg)) boucle = true; // animation CSS : continue
  return { fin, boucle };
}

let erreurs = 0, avertis = 0, sons = 0, planches = 0;
const utilises = new Set();

for (const [fichier, seq] of Object.entries(T.planches || {})) {
  planches++;
  const info = finDe(fichier);
  const pb = [];
  if (!info) pb.push({ grave: true, txt: "la planche n'existe pas dans res/svg/" });

  for (const e of seq) {
    sons++;
    const nom = e.son, t = e.t / 1000;
    utilises.add(nom);
    if (!CALCULES.has(nom) && !FICHIERS.has(nom)) {
      pb.push({ grave: true, txt: "son « " + nom + " » inconnu au catalogue de moteur/sons.js" });
      continue;
    }
    if (FICHIERS.has(nom) && !existsSync(resolve(AUDIO, FICHIERS.get(nom))))
      pb.push({ grave: true, txt: "son « " + nom + " » : fichier " + FICHIERS.get(nom) + " absent de res/audio/" });
    if (info && !info.boucle && t > info.fin)
      pb.push({ grave: true, txt: nom + " programmé à " + t + " s alors que l'animation finit à " +
        info.fin.toFixed(1) + " s — il se joue devant une image figée" });
  }
  if (pb.length) {
    console.log("\n" + fichier);
    for (const p of pb) { console.log("   " + (p.grave ? "✗" : "⚠") + " " + p.txt); p.grave ? erreurs++ : avertis++; }
  }
}

/* Les .wav présents que plus personne ne demande : depuis la synthèse, ce
   sont des Ko transportés pour rien. On le dit, on ne supprime pas tout
   seul — une réserve peut être volontaire (la musique attend les voix off). */
const presents = existsSync(AUDIO) ? readdirSync(AUDIO).filter((f) => f.endsWith(".wav")) : [];
const attendus = new Set([...FICHIERS.values()]);
const orphelins = presents.filter((f) => !attendus.has(f));
const poids = (l) => Math.round(l.reduce((n, f) => n + statSync(resolve(AUDIO, f)).size, 0) / 1024);

console.log("\nsons : " + sons + " sur " + planches + " planche(s) · " +
  CALCULES.size + " calculés (0 Ko) · " + FICHIERS.size + " en fichier (" +
  poids([...attendus].filter((f) => existsSync(resolve(AUDIO, f)))) + " Ko, chargés à la demande) · ✗ " +
  erreurs + " · ⚠ " + avertis);
if (orphelins.length)
  console.log("  ▪ " + orphelins.length + " .wav plus référencés (" + poids(orphelins) +
    " Ko) : " + orphelins.join(", "));

if (erreurs && STRICT) process.exit(1);
