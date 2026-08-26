/* =====================================================================
   millesime.mjs — les clés de coffre d'un produit pour une année
   ---------------------------------------------------------------------
   USAGE :  node build/millesime.mjs <produit> <année>
   EXEMPLE : node build/millesime.mjs habilitation 2027

   CE QUE ÇA FAIT
   Tire deux clés de 256 bits, au hasard, propres à CE produit et à CETTE
   année : K-prof (le coffre enseignant) et K-élève (le contenu ouvert à
   une classe). Elles sont rangées hors dépôt et ne sont jamais dérivées
   l'une de l'autre, ni d'un autre produit, ni d'un mot de passe.

   C'EST ÇA, LA DURÉE DE VIE D'UN AN
   À la rentrée, on tire le millésime suivant et on rechiffre le coffre
   avec. Les codes de l'année passée ne sont pas « refusés » : ils ne
   savent tout simplement plus rien ouvrir. Une date d'expiration se
   contourne en reculant l'horloge du poste — une clé qui ne déchiffre
   plus, non.

   🔴 HORS DÉPÔT. Le dépôt pilote-fluides est PUBLIC : aucune de ces clés
      n'y entre jamais. Sauvegarde : le dossier ci-dessous, avec les
      licences d'inerWeb Fluide.

   Le script REFUSE d'écraser un millésime existant — le réécrire rendrait
   illisibles les coffres déjà chiffrés avec, et inertes les codes déjà
   délivrés.
   ===================================================================== */
import { existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { tirerClesMillesime } from "./lib-acces.mjs";
import { produitParId, PRODUITS } from "./produits.mjs";

const DOSSIER = "C:/git/paquets/acces-inerweb/millesimes";

const [idProduit, anneeTexte] = process.argv.slice(2);
if (!idProduit || !anneeTexte) {
  console.error("✗ usage : node build/millesime.mjs <produit> <année>");
  console.error("");
  console.error("  produits : " + PRODUITS.filter((p) => !p.retire).map((p) => p.id).join(" · "));
  console.error("  exemple  : node build/millesime.mjs habilitation 2027");
  process.exit(1);
}

let produit;
try {
  produit = produitParId(idProduit);
} catch (e) {
  console.error("✗ " + e.message);
  process.exit(1);
}

const annee = Number(anneeTexte);
if (!Number.isInteger(annee) || annee < 2026 || annee > 2200) {
  console.error(`✗ année invalide : ${anneeTexte}`);
  process.exit(1);
}

mkdirSync(DOSSIER, { recursive: true });
const fichier = `${DOSSIER}/${produit.id}-${annee}.json`;

if (existsSync(fichier)) {
  console.error("✗ ce millésime existe déjà : " + fichier);
  console.error("");
  console.error("  Le réécrire rendrait illisible le coffre déjà chiffré avec, et");
  console.error("  inertes les codes déjà délivrés. Pour repartir de zéro sur cette");
  console.error("  année, déplacez le fichier à la main d'abord.");
  process.exit(1);
}

const { kProf, kEleve } = tirerClesMillesime();
writeFileSync(fichier, JSON.stringify({
  produit: produit.id,
  indice: produit.indice,
  millesime: annee,
  kProf: kProf.toString("base64url"),
  kEleve: kEleve.toString("base64url"),
  creeLe: new Date().toISOString().slice(0, 10),
}, null, 2) + "\n", "utf8");

console.log(`✓ millésime ${annee} tiré pour « ${produit.nom} ».`);
console.log("  " + fichier);
console.log("");

/* Un rappel utile : où en sont les autres produits pour cette année ? */
const presents = readdirSync(DOSSIER)
  .filter((f) => f.endsWith(`-${annee}.json`))
  .map((f) => f.replace(`-${annee}.json`, ""));
const manquants = PRODUITS.filter((p) => !p.retire && !presents.includes(p.id));
if (manquants.length) {
  console.log(`  Millésime ${annee} encore absent pour : ${manquants.map((p) => p.id).join(" · ")}`);
} else {
  console.log(`  Tous les produits ont leur millésime ${annee}.`);
}
console.log("");
console.log("  Suite : node build/coffre.mjs " + produit.id + " --millesime " + annee + "   (lot AE-2)");
