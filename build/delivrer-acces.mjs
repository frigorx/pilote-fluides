/* =====================================================================
   delivrer-acces.mjs — délivrer un code maître à un enseignant (AE-3)
   ---------------------------------------------------------------------
   USAGE :
     node build/delivrer-acces.mjs <produit> "Nom Prénom" [courriel]
                                   [--millesime AAAA] [--expire AAAA-MM-JJ]

   EXEMPLE :
     node build/delivrer-acces.mjs habilitation "Martin Dubois" m.dubois@ac-aix-marseille.fr

   CE QUE ÇA FAIT
   1. numérote le titulaire (compteur lu au registre, par produit) ;
   2. tire une paire de clés QUI LUI EST PROPRE ;
   3. signe son certificat avec la clé racine ;
   4. fabrique le code maître — il transporte le certificat, sa clé
      personnelle et les deux clés du coffre pour ce produit et cette année ;
   5. consigne la délivrance au registre local ;
   6. écrit le code dans un fichier prêt à copier dans un courriel.

   🔴 LE CODE NE S'AFFICHE PAS DANS LE TERMINAL. Il ouvre un coffre : il
      n'a rien à faire dans un historique de console, une capture d'écran
      ou une conversation. Le script n'affiche que le chemin du fichier.

   🔴 LE REGISTRE EST NOMINATIF. Il reste sur le poste, jamais dans le
      dépôt (qui est public), jamais en ligne. Même doctrine que
      `C:\git\paquets\licences\NOTICE-RGPD-REGISTRE.md` : le consentement
      tient dans la demande elle-même, la conservation est limitée à ce que
      la délivrance exige.

   PAR DÉFAUT, un accès expire le 31 août suivant son millésime — la
   rentrée, pas une date anniversaire.
   ===================================================================== */
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { createPrivateKey, createPublicKey } from "node:crypto";
import { genererPaire, fabriquerCertificat, fabriquerCodeMaitre, lireCodeMaitre } from "./lib-acces.mjs";
import { produitParId, PRODUITS } from "./produits.mjs";

const BASE = "C:/git/paquets/acces-inerweb";
const RACINE_PRIVEE = BASE + "/racine/cle-privee.pem";
const RACINE_PUBLIQUE = BASE + "/racine/cle-publique.pem";
const MILLESIMES = BASE + "/millesimes";
const CODES = BASE + "/codes";
const REGISTRE = BASE + "/registre-acces.csv";
const ENTETE = "produit;numero;titulaire;courriel;millesime;delivreLe;expireLe\n";

/* --------------------------------------------------------------------
   Arguments
   -------------------------------------------------------------------- */
const args = process.argv.slice(2);
function option(nom) {
  const i = args.indexOf("--" + nom);
  return i >= 0 ? args[i + 1] : null;
}
const positionnels = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) { i++; continue; }
  positionnels.push(args[i]);
}
const [idProduit, nom, courriel] = positionnels;

if (!idProduit || !nom) {
  console.error('✗ usage : node build/delivrer-acces.mjs <produit> "Nom Prénom" [courriel]');
  console.error("            [--millesime AAAA] [--expire AAAA-MM-JJ]");
  console.error("");
  console.error("  produits : " + PRODUITS.filter((p) => !p.retire).map((p) => p.id).join(" · "));
  process.exit(1);
}

let produit;
try {
  produit = produitParId(idProduit);
} catch (e) {
  console.error("✗ " + e.message);
  process.exit(1);
}

const millesime = Number(option("millesime") ?? new Date().getFullYear());
const expireLe = option("expire") ?? `${millesime + 1}-08-31`;

/* --------------------------------------------------------------------
   Les pièces qui doivent exister
   -------------------------------------------------------------------- */
if (!existsSync(RACINE_PRIVEE)) {
  console.error("✗ clé racine absente : " + RACINE_PRIVEE);
  console.error("  Créez-la d'abord : node build/racine-acces.mjs");
  process.exit(1);
}
const fichierMillesime = `${MILLESIMES}/${produit.id}-${millesime}.json`;
if (!existsSync(fichierMillesime)) {
  console.error("✗ millésime absent : " + fichierMillesime);
  console.error(`  Tirez-le d'abord : node build/millesime.mjs ${produit.id} ${millesime}`);
  process.exit(1);
}

const priveeRacine = createPrivateKey(readFileSync(RACINE_PRIVEE, "utf8"));
const m = JSON.parse(readFileSync(fichierMillesime, "utf8"));
const kProf = Buffer.from(m.kProf, "base64url");
const kEleve = Buffer.from(m.kEleve, "base64url");

/* --------------------------------------------------------------------
   Numérotation — par produit, jamais réutilisée
   -------------------------------------------------------------------- */
if (!existsSync(REGISTRE)) {
  mkdirSync(BASE, { recursive: true });
  writeFileSync(REGISTRE, ENTETE, "utf8");
}
const lignes = readFileSync(REGISTRE, "utf8").split("\n").slice(1).filter(Boolean);
const numero = 1 + lignes
  .filter((l) => l.split(";")[0] === produit.id)
  .reduce((max, l) => Math.max(max, Number(l.split(";")[1]) || 0), 0);

/* Un même nom déjà servi pour ce produit et ce millésime : on prévient,
   on ne bloque pas (un code perdu se redélivre — l'ancien reste valide,
   c'est le prix de la vérification hors ligne, et c'est assumé). */
const deja = lignes.find((l) => {
  const c = l.split(";");
  return c[0] === produit.id && c[2] === nom && Number(c[4]) === millesime;
});
if (deja) {
  console.warn(`⚠ « ${nom} » a déjà un code ${produit.id} pour ${millesime} (n° ${deja.split(";")[1]}).`);
  console.warn("  Le nouveau s'ajoute ; l'ancien reste valide jusqu'à sa date — la");
  console.warn("  révocation d'un code déjà émis n'existe pas hors ligne, seul le");
  console.warn("  changement de millésime le rend inerte.");
}

/* --------------------------------------------------------------------
   Fabrication
   -------------------------------------------------------------------- */
const titulaire = genererPaire();
const certificat = fabriquerCertificat(
  { indiceProduit: produit.indice, millesime, numero, expireLe, publiqueBrute: titulaire.publiqueBrute, nom },
  priveeRacine
);
const code = fabriquerCodeMaitre({ certificat, secret: titulaire.secret, kProf, kEleve });

/* Contre-épreuve immédiate : on ne délivre rien qu'on n'ait relu — et on le
   relit avec la clé PUBLIQUE, celle qu'aura le site, pas avec la privée. */
const publiqueRacine = createPublicKey(readFileSync(RACINE_PUBLIQUE, "utf8"));
const relu = lireCodeMaitre(code, publiqueRacine, new Date().toISOString().slice(0, 10));
if (!relu.ok || relu.certificat.nom !== nom || relu.certificat.indiceProduit !== produit.indice) {
  console.error("✗ le code fabriqué ne se relit pas correctement — rien n'a été délivré.");
  console.error("  motif : " + (relu.motif ?? "incohérence de contenu"));
  process.exit(1);
}

/* --------------------------------------------------------------------
   Sortie : un fichier prêt à copier, et une ligne au registre
   -------------------------------------------------------------------- */
mkdirSync(CODES, { recursive: true });
const ardoise = nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
const fichierCode = `${CODES}/${produit.id}-${millesime}-${String(numero).padStart(3, "0")}-${ardoise}.txt`;

writeFileSync(fichierCode, [
  `Accès ${produit.nom} — inerWeb`,
  ``,
  `Titulaire : ${nom}`,
  `Valable jusqu'au : ${expireLe}`,
  `Numéro : ${produit.id}-${millesime}-${String(numero).padStart(3, "0")}`,
  ``,
  `Pour l'ouvrir : allez sur https://inerweb.fr/activer et collez la ligne`,
  `ci-dessous. Elle ne s'ouvre qu'une fois collée, il n'y a rien à retenir.`,
  ``,
  `Ce code vous est personnel : il porte votre nom, et les documents que`,
  `vous consultez l'affichent en filigrane.`,
  ``,
  code,
  ``,
].join("\n"), "utf8");

appendFileSync(REGISTRE, [
  produit.id, numero, nom, courriel ?? "", millesime,
  new Date().toISOString().slice(0, 10), expireLe,
].join(";") + "\n", "utf8");

console.log(`✓ accès ${produit.id} n° ${numero} délivré à « ${nom} », valable jusqu'au ${expireLe}.`);
console.log("");
console.log("  code    : " + fichierCode);
console.log("  registre: " + REGISTRE + "   (nominatif — reste sur ce poste)");
console.log("");
console.log("  Le code n'est pas affiché ici : ouvrez le fichier pour le copier.");
