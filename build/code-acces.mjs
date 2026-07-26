/* =====================================================================
   code-acces.mjs — installe les DEUX codes d'accès, partout, d'un coup
   ---------------------------------------------------------------------
   USAGE :  node build/code-acces.mjs "<code niveau 1>" "<phrase niveau 2>"
            puis  node build/build.mjs   (pour propager dans les packs)

   LES DEUX NIVEAUX (arbitrage F. Henninot, 25/07)
   ┌──────────┬─────────────────────┬──────────────────────────────────────┐
   │ niveau 1 │ code court, chiffres│ les 38 documents (documents.html),   │
   │          │                     │ la console formateur, la projection  │
   │          │ direction, collègues│ « confidentiel sans être secret »    │
   ├──────────┼─────────────────────┼──────────────────────────────────────┤
   │ niveau 2 │ phrase de six mots  │ les 8 examens du pack                │
   │          │ le formateur, en    │ les séries de révision restent LIBRES│
   │          │ salle               │ (réviser seul ≠ passer l'épreuve)    │
   └──────────┴─────────────────────┴──────────────────────────────────────┘

   OÙ VIT CHAQUE CODE — c'est la raison d'être de ce script : les changer à
   la main, c'est en oublier un et laisser une porte sur l'ancien.
     niveau 1 → `moteur/portillon.js` (formateur + projection)
                `PACK_META.code_empreinte` de cartes.js (mode Pilotage)
                `docs/coffre/` : les 38 documents, rechiffrés
     niveau 2 → `acces.code_empreinte` des 8 cartes d'examen de cartes.js

   CE QUE CHAQUE NIVEAU PROTÈGE VRAIMENT — à ne pas se raconter d'histoires
   · Le COFFRE (niveau 1) est du vrai chiffrement : AES-256-GCM, PBKDF2-SHA256
     à 600 000 itérations. Un code de 8 chiffres y tient environ dix minutes
     face à du matériel dédié ; c'est un choix assumé pour un dossier de
     projet, pas pour un secret.
   · Les PORTILLONS (niveaux 1 et 2) comparent une empreinte djb2 de 32 bits.
     C'est un RIDEAU : on peut fabriquer une autre chaîne donnant le même
     nombre. Allonger la phrase du niveau 2 ne le rend pas inviolable — elle
     sert surtout à ce qu'on ne devine pas le code entre deux séances, et
     elle est prête pour le jour où les sujets officiels devront circuler
     entre évaluateurs (là, avec du vrai chiffrement).

   Aucun des deux codes n'est écrit dans le dépôt.
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const [codeN1, phraseN2] = process.argv.slice(2);
if (!codeN1 || !phraseN2) {
  console.error('✗ usage : node build/code-acces.mjs "<code niveau 1>" "<phrase niveau 2>"');
  console.error("");
  console.error("  niveau 1 — documents, console formateur, projection (direction, collègues)");
  console.error("  niveau 2 — les 8 examens (le formateur ouvre la porte en salle)");
  process.exit(1);
}
if (codeN1 === phraseN2) {
  console.error("✗ les deux codes sont identiques : il n'y aurait qu'un seul niveau.");
  process.exit(1);
}
if (codeN1.length < 4 || phraseN2.length < 8) {
  console.error("✗ niveau 1 : 4 caractères minimum · niveau 2 : 8 caractères minimum.");
  process.exit(1);
}

/* Même fonction que dans le navigateur (portillon.js et moteur.js) : les
   trois doivent produire exactement le même nombre. */
function empreinte(txt) {
  let h = 5381;
  for (let i = 0; i < txt.length; i++) h = (h * 33 + txt.charCodeAt(i)) >>> 0;
  return h;
}
const E1 = empreinte(codeN1);
const E2 = empreinte(phraseN2);
if (E1 === E2) {
  console.error("✗ collision d'empreinte entre les deux codes (djb2 32 bits) — en changer un.");
  process.exit(1);
}

/* --- avertissements : on informe, on ne bloque pas --- */
const alertes = [];
if (/^\d+$/.test(phraseN2))
  alertes.push("le niveau 2 est entièrement numérique : une phrase de mots serait bien plus sûre.");
if (/raynaud|equatio|équatio|henninot|lycee|lycée|frigo|fluide/i.test(codeN1 + " " + phraseN2))
  alertes.push("un code contient un mot lié au projet ou à l'établissement — c'est la première " +
               "chose qu'on essaie, et ces mots sont imprimés sur les pages publiées.");
if (/[À-ÿ]/.test(codeN1 + phraseN2))
  alertes.push("accents détectés : risque d'erreur de saisie selon le clavier.");
if (alertes.length) {
  console.log("⚠ à savoir :");
  for (const a of alertes) console.log("   · " + a);
  console.log("");
}

/* 1 — portillon (niveau 1 : formateur + projection) --------------------- */
{
  const F = resolve(RACINE, "moteur/portillon.js");
  const src = readFileSync(F, "utf8");
  const neuf = src.replace(/(var EMPREINTE = )\d+(;)/, "$1" + E1 + "$2");
  if (neuf === src) throw new Error("portillon.js : ligne EMPREINTE introuvable — arrêt");
  writeFileSync(F, neuf, "utf8");
  console.log("✓ moteur/portillon.js — niveau 1 (console formateur, projection)");
}

/* 2 — cartes.js : méta en niveau 1, les 8 examens en niveau 2 ----------- */
{
  const F = resolve(RACINE, "packs/fluides/cartes.js");
  let src = readFileSync(F, "utf8");

  // la méta du pack porte le niveau 1 (mode Pilotage dans l'appli élève)
  const avantMeta = src;
  src = src.replace(
    /(code_empreinte: )\d+(,\s*\n)/,
    "$1" + E1 + "$2"
  );
  if (src === avantMeta) throw new Error("cartes.js : PACK_META.code_empreinte introuvable — arrêt");

  // les cartes d'examen portent le niveau 2, marqué explicitement
  const motif = /acces: \{ code_empreinte: \d+(?:, niveau: 2)? \}/g;
  const n = (src.match(motif) || []).length;
  if (n === 0) throw new Error("cartes.js : aucune carte d'examen avec `acces` — arrêt");
  src = src.replace(motif, "acces: { code_empreinte: " + E2 + ", niveau: 2 }");

  writeFileSync(F, src, "utf8");
  console.log("✓ packs/fluides/cartes.js — niveau 1 (méta) + niveau 2 (" + n + " examens)");
}

/* 3 — le coffre documentaire : chiffré avec le niveau 1 ----------------- */
console.log("");
execFileSync(process.execPath, [resolve(RACINE, "build/coffre.mjs"), codeN1], { stdio: "inherit" });

console.log("");
console.log("✓ deux niveaux installés.");
console.log("    niveau 1 → empreinte " + E1 + "  (documents, formateur, projection)");
console.log("    niveau 2 → empreinte " + E2 + "  (les examens)");
console.log("");
console.log("  ⚠ RESTE À FAIRE : node build/build.mjs   (propager dans les packs)");
console.log("  ⚠ Les anciens codes ne fonctionnent plus.");
console.log("  ⚠ Un appareil déjà déverrouillé le reste : pour tester, vider les données");
console.log("    du site ou ouvrir une fenêtre de navigation privée.");
