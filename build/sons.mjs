/* =====================================================================
   sons.mjs — contrôle de l'habillage sonore
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   La table `packs/fluides/sons.js` porte des instants recopiés depuis les
   `begin` des SVG. Deux choses peuvent la rendre fausse en silence :
     · on retouche les temps d'une planche, et un son tombe désormais après
       la fin de l'animation — il se joue devant une image figée ;
     · on renomme ou supprime un fichier audio, et le son ne se joue plus,
       sans que rien ne le signale (la lecture échoue en silence, par
       construction : un son qui plante ne doit pas casser une fiche).
   Ce contrôle compare la table aux fichiers réels, à chaque build.

   Usage : node build/sons.mjs [--strict]
   ===================================================================== */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SVG = resolve(RACINE, "packs/fluides/res/svg");
const AUDIO = resolve(RACINE, "packs/fluides/res/audio");
const STRICT = process.argv.includes("--strict");

/* La table est un fichier de navigateur : on l'évalue avec un `window` factice,
   comme le fait relecture.mjs pour le pack. */
const fichierTable = resolve(RACINE, "packs/fluides/sons.js");
if (!existsSync(fichierTable)) {
  console.log("  sons : aucune table (packs/fluides/sons.js absent) — habillage désactivé");
  process.exit(0);
}
global.window = {};
eval(readFileSync(fichierTable, "utf8"));
const T = global.window.PILOTE_SONS;

/* Fin réelle d'une planche : le plus tardif des begin + sa durée. */
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
  return { fin, boucle };
}

const dureeAudio = (nom) => {
  const p = resolve(AUDIO, nom + ".wav");
  if (!existsSync(p)) return null;
  const b = readFileSync(p);
  // WAV PCM : l'en-tête donne le débit, la taille donne la durée
  const taux = b.readUInt32LE(24), canaux = b.readUInt16LE(22), bits = b.readUInt16LE(34);
  return { s: (statSync(p).size - 44) / (taux * canaux * (bits / 8)), ko: Math.round(statSync(p).size / 1024) };
};

let erreurs = 0, avertis = 0, sons = 0, planches = 0, poids = 0;
const utilises = new Set();

for (const [fichier, seq] of Object.entries(T.planches || {})) {
  planches++;
  const info = finDe(fichier);
  const pb = [];
  if (!info) {
    pb.push({ grave: true, txt: "la planche n'existe pas dans res/svg/" });
  }
  for (const [t, nom] of seq) {
    sons++;
    utilises.add(nom);
    const a = dureeAudio(nom);
    if (!a) { pb.push({ grave: true, txt: "son « " + nom + " » absent de res/audio/" }); continue; }
    if (info && !info.boucle && t > info.fin)
      pb.push({ grave: true, txt: nom + " programmé à " + t + " s, alors que l'animation finit à " +
        info.fin.toFixed(1) + " s — il se joue devant une image figée" });
    else if (info && !info.boucle && t + a.s > info.fin + 3)
      pb.push({ grave: false, txt: nom + " (" + a.s.toFixed(1) + " s) démarre à " + t +
        " s et déborde de plus de 3 s après la fin de l'animation (" + info.fin.toFixed(1) + " s)" });
  }
  if (pb.length) {
    console.log("\n" + fichier);
    for (const p of pb) { console.log("   " + (p.grave ? "✗" : "⚠") + " " + p.txt); p.grave ? erreurs++ : avertis++; }
  }
}

/* Fichiers audio présents mais jamais programmés : ce n'est pas une faute
   (une réserve est légitime), mais il faut le savoir. */
const presents = existsSync(AUDIO)
  ? readdirSync(AUDIO).filter((f) => f.endsWith(".wav")).map((f) => f.replace(/\.wav$/, ""))
  : [];
for (const f of presents) poids += dureeAudio(f).ko;
const inutilises = presents.filter((f) => !utilises.has(f));

console.log("\nsons : " + sons + " programmés sur " + planches + " planche(s) · " +
  presents.length + " fichiers (" + poids + " Ko, chargés à la demande) · " +
  "✗ " + erreurs + " · ⚠ " + avertis +
  (inutilises.length ? "\n  en réserve, jamais programmés : " + inutilises.join(", ") : ""));

if (erreurs && STRICT) process.exit(1);
