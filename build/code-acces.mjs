/* =====================================================================
   code-acces.mjs — change le code d'accès PARTOUT, en une commande
   ---------------------------------------------------------------------
   USAGE :  node build/code-acces.mjs "<la phrase de passe>"
            puis  node build/build.mjs   (pour propager dans les packs)

   POURQUOI CE SCRIPT EXISTE
   Le code d'accès est porté par TROIS endroits. Les changer à la main,
   c'est en oublier un et laisser une porte ouverte sur l'ancien code :
     1. `moteur/portillon.js`      → empreinte, pour formateur.html et projection.html
     2. `packs/fluides/cartes.js`  → PACK_META.code_empreinte (mode Pilotage)
                                     + `acces.code_empreinte` des 8 cartes d'examen
     3. `docs/coffre/`             → les 38 documents, rechiffrés (voir coffre.mjs)

   DEUX NIVEAUX DE PROTECTION, ET IL FAUT LE SAVOIR
   · Le COFFRE est du vrai chiffrement : AES-256-GCM, clé dérivée par
     PBKDF2-SHA256 à 600 000 itérations. Avec une phrase de six mots, le
     forcer demande des siècles de calcul. C'est là que vivent les documents.
   · Le PORTILLON (examens, console, projection) compare une empreinte
     djb2 de 32 bits. C'est un RIDEAU, pas un coffre : on peut fabriquer
     une autre chaîne donnant la même empreinte. Assumé — les pages qu'il
     garde n'ont rien qui ne soit déjà dans le navigateur du stagiaire
     (les bonnes réponses y sont par nécessité, c'est lui qui corrige).
     Allonger la phrase renforce donc le coffre, pas le portillon.

   Le code en clair n'est écrit NULLE PART dans le dépôt.
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const phrase = process.argv[2];
if (!phrase || phrase.length < 8) {
  console.error("✗ usage : node build/code-acces.mjs \"<phrase de passe>\"");
  console.error("  8 caractères minimum. Une phrase de six mots séparés par des tirets");
  console.error("  est le bon format : sans accent, en minuscules.");
  process.exit(1);
}

/* La même fonction que celle du navigateur (portillon.js et moteur.js) —
   elles doivent produire exactement le même nombre. */
function empreinte(txt) {
  let h = 5381;
  for (let i = 0; i < txt.length; i++) h = ((h * 33 + txt.charCodeAt(i)) >>> 0);
  return h;
}
const EMPREINTE = empreinte(phrase);

/* --- avertissements utiles, sans bloquer : c'est le choix de l'auteur --- */
const alertes = [];
if (/^\d+$/.test(phrase))
  alertes.push("phrase entièrement numérique : un code de " + phrase.length + " chiffres se force " +
               "bien plus vite qu'une phrase de mots. Six mots valent des siècles de calcul.");
if (/raynaud|equatio|équatio|henninot|lycee|lycée|frigo|fluide/i.test(phrase))
  alertes.push("la phrase contient un mot lié au projet ou à l'établissement — c'est la première " +
               "chose qu'on essaie, et ces mots sont imprimés sur les pages publiées.");
if (/[À-ÿ]/.test(phrase))
  alertes.push("la phrase contient des accents : risque d'erreur de saisie selon le clavier.");
if (alertes.length) {
  console.log("⚠ à savoir :");
  for (const a of alertes) console.log("   · " + a);
  console.log("");
}

let touches = 0;

/* 1 — le portillon ------------------------------------------------------ */
{
  const F = resolve(RACINE, "moteur/portillon.js");
  const src = readFileSync(F, "utf8");
  const neuf = src.replace(
    /(var EMPREINTE = )\d+(;)/,
    "$1" + EMPREINTE + "$2"
  );
  if (neuf === src) throw new Error("portillon.js : ligne EMPREINTE introuvable — arrêt");
  writeFileSync(F, neuf, "utf8");
  touches++;
  console.log("✓ moteur/portillon.js");
}

/* 2 — cartes.js : la méta du pack et les 8 cartes d'examen -------------- */
{
  const F = resolve(RACINE, "packs/fluides/cartes.js");
  const src = readFileSync(F, "utf8");
  const avant = (src.match(/code_empreinte: \d+/g) || []).length;
  if (avant === 0) throw new Error("cartes.js : aucun code_empreinte trouvé — arrêt");
  const neuf = src.replace(/code_empreinte: \d+/g, "code_empreinte: " + EMPREINTE);
  writeFileSync(F, neuf, "utf8");
  touches++;
  console.log("✓ packs/fluides/cartes.js — " + avant + " empreintes (1 méta + " + (avant - 1) + " examens)");
}

/* 3 — le coffre : rechiffrement complet --------------------------------- */
console.log("");
execFileSync(process.execPath, [resolve(RACINE, "build/coffre.mjs"), phrase], { stdio: "inherit" });

console.log("");
console.log("✓ code d'accès changé dans " + touches + " fichier(s) + le coffre rechiffré.");
console.log("  empreinte du portillon : " + EMPREINTE);
console.log("");
console.log("  ⚠ RESTE À FAIRE : node build/build.mjs   (propager dans pack.eleve.js / pack.pilote.js)");
console.log("  ⚠ L'ancien code ne fonctionne plus. Les personnes qui l'avaient doivent recevoir le nouveau.");
console.log("  ⚠ Un appareil déjà déverrouillé le reste (mémoire du navigateur) — pour tester,");
console.log("    vider les données du site ou utiliser une fenêtre de navigation privée.");
