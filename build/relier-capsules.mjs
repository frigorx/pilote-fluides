/* =====================================================================
   relier-capsules.mjs — accroche chaque capsule à SA fiche de cours.
   ---------------------------------------------------------------------
   Entrée/sortie : packs/fluides/cartes.js (modifié sur place)
   Lit aussi : packs/fluides/res/capsules/donnees/*.js (titre, nombre
   d'écrans, durée — pour rédiger le libellé du bouton).

   CE QU'IL FAIT : insère un appel `lienOutil(...)` en tête du `corps:` de
   la fiche visée par `fiche:` dans la capsule. Ce seul geste sert TROIS
   sorties, sans rien écrire ailleurs :
     · l'application élève (pack.eleve.js) : le bouton d'écoute ;
     · le support de projection (projection.gen.js) : parcours.mjs
       transforme tout `<p class="lien-experience">` en diapositive de
       lancement, juste après le titre de la séquence ;
     · la page de relecture (relecture.html), qui reprend le corps.

   IDEMPOTENT : une fiche qui porte déjà le lien de sa capsule est laissée
   telle quelle. On peut donc le relancer après avoir ajouté une capsule.

   Usage : node build/relier-capsules.mjs [--essai]
           --essai affiche ce qui serait fait, sans écrire.
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CARTES = resolve(RACINE, "packs/fluides/cartes.js");
const DOSSIER = resolve(RACINE, "packs/fluides/res/capsules/donnees");
const ESSAI = process.argv.includes("--essai");

/* --- 1. les capsules ------------------------------------------------- */
const capsules = [];
for (const f of readdirSync(DOSSIER).filter((n) => n.endsWith(".js") && !n.startsWith("_")).sort()) {
  let c = null;
  global.CAPSULE = { declarer: (x) => { c = x; } };
  try { eval(readFileSync(resolve(DOSSIER, f), "utf8")); } catch (e) {
    console.log(`⚠ ${f} ignorée (ne se charge pas) : ${e.message}`); continue;
  }
  if (c && c.fiche) capsules.push({ ...c, __id: basename(f, ".js") });
}

/* --- 2. insertion ---------------------------------------------------- */
let src = readFileSync(CARTES, "utf8");
const lignes = src.split(/\r?\n/);
const posesFiche = {};           // id de fiche → n° de la ligne `corps:`
let courante = null;
lignes.forEach((l, i) => {
  const m = l.match(/^    id: "([a-z0-9-]+)",/);
  if (m) { courante = m[1]; return; }
  if (courante && /^    corps:\s*$/.test(l) && posesFiche[courante] == null) posesFiche[courante] = i;
});

const faits = [], sautes = [], absents = [];
/* On insère de la fin vers le début : les numéros de ligne restent valables. */
const aFaire = capsules
  .map((c) => ({ c, ligne: posesFiche[c.fiche] }))
  .sort((a, b) => (b.ligne ?? -1) - (a.ligne ?? -1));

for (const { c, ligne } of aFaire) {
  if (ligne == null) { absents.push(`${c.__id} → fiche « ${c.fiche} » introuvable ou corps sur une seule ligne`); continue; }
  const marque = `res/capsules/index.html?c=${c.__id}"`;
  if (src.includes(marque)) { sautes.push(c.__id); continue; }

  const nb = (c.ecrans || []).length;
  const duree = c.duree ? c.duree.replace(/^environ /, "") : "quelques minutes";
  const bloc = [
    "      lienOutil(",
    `        "packs/fluides/res/capsules/index.html?c=${c.__id}",`,
    `        "🎧 Écouter la capsule : ${c.titre.replace(/"/g, "'")}",`,
    `        "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — ${nb} écrans, ${duree}. Version imprimable et mode projection compris."`,
    "      ) +",
  ];
  lignes.splice(ligne + 1, 0, ...bloc);
  faits.push(`${c.__id} → fiche ${c.fiche}`);
}

/* cartes.js est en fins de ligne LF : réécrire en CRLF ferait un diff de
   4 477 lignes pour 24 insertions. On garde la convention du fichier. */
if (faits.length && !ESSAI) writeFileSync(CARTES, lignes.join("\n"), "utf8");

console.log(`\n${ESSAI ? "ESSAI — rien n'a été écrit." : "cartes.js mis à jour."}`);
console.log(`  reliées : ${faits.length}`);
faits.forEach((f) => console.log("    + " + f));
if (sautes.length) console.log(`  déjà en place : ${sautes.length} (${sautes.join(", ")})`);
if (absents.length) { console.log("  ⚠ non reliées :"); absents.forEach((a) => console.log("    " + a)); }
