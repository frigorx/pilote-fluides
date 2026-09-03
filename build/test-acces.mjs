/* =====================================================================
   test-acces.mjs — le filet du socle des accès enseignant (AE-1)
   ---------------------------------------------------------------------
   USAGE :  node build/test-acces.mjs

   Ce filet ne vérifie pas que « ça marche » : il vérifie que ça REFUSE.
   Un système d'accès qui accepte tout passe tous les tests naïfs — d'où
   les contre-épreuves : chaque garde est éprouvé par un cas qui doit
   échouer, et le test rougit si le garde disparaît.

   Zéro dépendance, comme le reste du dépôt.
   ===================================================================== */
import {
  genererPaire, tirerClesMillesime, fabriquerCertificat, lireCertificat,
  fabriquerCodeMaitre, lireCodeMaitre, fabriquerCodeSession, lireCodeSession,
  pourProduit, MOTIFS, enJours, identLisible,
} from "./lib-acces.mjs";
import { produitParId, produitParIndice, PRODUITS } from "./produits.mjs";
import { readFileSync, existsSync } from "node:fs";
import { RACINE_ACCES } from "./lieu-acces.mjs";

let passes = 0;
const echecs = [];

function verifier(intitule, condition, detail) {
  if (condition) { passes++; console.log("  ✓ " + intitule); }
  else { echecs.push(intitule + (detail ? ` — ${detail}` : "")); console.log("  ✗ " + intitule + (detail ? ` — ${detail}` : "")); }
}

function section(titre) { console.log("\n" + titre); }

/* --------------------------------------------------------------------
   Le décor : une racine, deux titulaires, deux produits
   -------------------------------------------------------------------- */
const racine = genererPaire();
const habilitation = produitParId("habilitation");
const aquiblue = produitParId("aquiblue");

const clesHab2026 = tirerClesMillesime();
const clesAqua2026 = tirerClesMillesime();
const clesHab2027 = tirerClesMillesime();

function delivrer(produit, cles, { nom, numero, millesime = 2026, expireLe = "2027-08-31" }) {
  const titulaire = genererPaire();
  const certificat = fabriquerCertificat(
    { indiceProduit: produit.indice, millesime, numero, expireLe, publiqueBrute: titulaire.publiqueBrute, nom },
    racine.privateKey
  );
  const code = fabriquerCodeMaitre({
    certificat, secret: titulaire.secret, kProf: cles.kProf, kEleve: cles.kEleve,
  });
  return { code, certificat, titulaire };
}

const AUJOURD_HUI = "2026-08-26";
const martin = delivrer(habilitation, clesHab2026, { nom: "Martin Dubois", numero: 1 });
const claire = delivrer(aquiblue, clesAqua2026, { nom: "Claire Roussel", numero: 2 });

/* ====================================================================
   1. La table des produits
   ==================================================================== */
section("1. La table des produits");

verifier("les indices sont uniques", new Set(PRODUITS.map((p) => p.indice)).size === PRODUITS.length);
verifier("les identifiants sont uniques", new Set(PRODUITS.map((p) => p.id)).size === PRODUITS.length);
verifier("un identifiant inconnu lève, il ne renvoie pas de produit par défaut",
  (() => { try { produitParId("inexistant"); return false; } catch { return true; } })());
verifier("un indice inconnu lève",
  (() => { try { produitParIndice(250); return false; } catch { return true; } })());

/* ====================================================================
   2. Le code maître se relit
   ==================================================================== */
section("2. Le code maître");

const luMartin = lireCodeMaitre(martin.code, racine.publicKey, AUJOURD_HUI);
verifier("un code valide se relit", luMartin.ok, luMartin.motif);
verifier("il porte le nom du titulaire", luMartin.ok && luMartin.certificat.nom === "Martin Dubois");
verifier("il porte son produit", luMartin.ok && luMartin.certificat.indiceProduit === habilitation.indice);
verifier("il porte sa date de fin", luMartin.ok && luMartin.certificat.expireLe === "2027-08-31");
verifier("il transporte la clé enseignant du millésime",
  luMartin.ok && luMartin.kProf.equals(clesHab2026.kProf));
verifier("il transporte la clé élève du millésime",
  luMartin.ok && luMartin.kEleve.equals(clesHab2026.kEleve));
verifier("le code tient dans un courriel (moins de 500 caractères)",
  martin.code.length < 500, `${martin.code.length} caractères`);

/* ====================================================================
   3. Les refus — c'est ici que le système vaut quelque chose
   ==================================================================== */
section("3. Les refus");

verifier("un code absent est refusé", lireCodeMaitre("", racine.publicKey, AUJOURD_HUI).motif === MOTIFS.ABSENT);
verifier("un code de n'importe quoi est refusé",
  ["ILLISIBLE", "ABSENT", "VERSION_INCONNUE"].includes(lireCodeMaitre("pas-un-code !!", racine.publicKey, AUJOURD_HUI).motif));

/* Falsification : on change UN caractère du nom dans le certificat. */
const falsifie = Buffer.from(martin.code, "base64url");
const posNom = 3 + 74; // tête + entête du certificat
falsifie[posNom] = falsifie[posNom] === 0x4d ? 0x4e : 0x4d; // « Martin » → « Nartin »
verifier("un nom modifié d'un seul caractère casse la signature",
  lireCodeMaitre(falsifie.toString("base64url"), racine.publicKey, AUJOURD_HUI).motif === MOTIFS.SIGNATURE_INVALIDE);

/* Contre-épreuve de la vérification elle-même : un code signé par une AUTRE
   racine doit être refusé. Si ce test passe alors que le précédent échoue,
   c'est que plus rien n'est vérifié. */
const fausseRacine = genererPaire();
const contrefacon = delivrer(habilitation, clesHab2026, { nom: "Faussaire", numero: 99 });
const certContrefait = fabriquerCertificat(
  { indiceProduit: habilitation.indice, millesime: 2026, numero: 99, expireLe: "2027-08-31",
    publiqueBrute: contrefacon.titulaire.publiqueBrute, nom: "Faussaire" },
  fausseRacine.privateKey
);
const codeContrefait = fabriquerCodeMaitre({
  certificat: certContrefait, secret: contrefacon.titulaire.secret,
  kProf: clesHab2026.kProf, kEleve: clesHab2026.kEleve,
});
verifier("un code signé par une autre racine est refusé",
  lireCodeMaitre(codeContrefait, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.SIGNATURE_INVALIDE);

/* Expiration */
const perime = delivrer(habilitation, clesHab2026, { nom: "Ancien Titulaire", numero: 3, expireLe: "2026-08-25" });
verifier("un code dont la date est passée est refusé",
  lireCodeMaitre(perime.code, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.EXPIRE);
verifier("le même code, la veille, était accepté",
  lireCodeMaitre(perime.code, racine.publicKey, "2026-08-25").ok);

/* Un octet ajouté à la fin */
const rallonge = Buffer.concat([Buffer.from(martin.code, "base64url"), Buffer.from([0])]);
verifier("un octet de trop est refusé",
  lireCodeMaitre(rallonge.toString("base64url"), racine.publicKey, AUJOURD_HUI).motif === MOTIFS.ILLISIBLE);

/* Une date illisible ne s'interprète jamais */
verifier("une date illisible lève au lieu d'être devinée",
  (() => { try { enJours("31/08/2027"); return false; } catch { return true; } })());

/* ====================================================================
   4. LE CLOISONNEMENT — la décision du 26/08, mesurée
   ==================================================================== */
section("4. Le cloisonnement par produit");

const luClaire = lireCodeMaitre(claire.code, racine.publicKey, AUJOURD_HUI);
verifier("le code AquiBlue est valide en lui-même", luClaire.ok, luClaire.motif);
verifier("mais il est refusé sur Habilitation",
  pourProduit(luClaire, habilitation.indice).motif === MOTIFS.MAUVAIS_PRODUIT);
verifier("et le code Habilitation est refusé sur AquiBlue",
  pourProduit(luMartin, aquiblue.indice).motif === MOTIFS.MAUVAIS_PRODUIT);
verifier("les clés des deux produits n'ont rien en commun",
  !clesHab2026.kProf.equals(clesAqua2026.kProf) && !clesHab2026.kEleve.equals(clesAqua2026.kEleve));

/* ====================================================================
   5. LE MILLÉSIME — l'expiration réelle, pas la date affichée
   ==================================================================== */
section("5. Le millésime");

verifier("les clés 2027 diffèrent des clés 2026",
  !clesHab2026.kProf.equals(clesHab2027.kProf));
verifier("un code 2026 ne transporte pas la clé 2027 — il n'ouvrira donc plus le coffre",
  luMartin.ok && !luMartin.kProf.equals(clesHab2027.kProf));
verifier("le millésime est inscrit dans le certificat",
  luMartin.ok && luMartin.certificat.millesime === 2026);

/* ====================================================================
   6. L'ÉTAGE 2 — le titulaire fabrique ses codes de session
   ==================================================================== */
section("6. Les codes de session");

const session = fabriquerCodeSession({
  certificatBrut: luMartin.certificatBrut,
  secret: luMartin.secret,
  kEleve: luMartin.kEleve,
  finLe: "2026-12-20",
  libelle: "CAP IFCA — groupe A",
});

const luSession = lireCodeSession(session.code, racine.publicKey, AUJOURD_HUI);
verifier("une session fabriquée par le titulaire est acceptée", luSession.ok, luSession.motif);
verifier("elle désigne son émetteur", luSession.ok && luSession.certificat.nom === "Martin Dubois");
verifier("elle porte son libellé", luSession.ok && luSession.libelle === "CAP IFCA — groupe A");
verifier("elle transporte la clé élève", luSession.ok && luSession.kEleve.equals(clesHab2026.kEleve));
verifier("elle reste dans son produit",
  luSession.ok && pourProduit(luSession, habilitation.indice).ok
  && pourProduit(luSession, aquiblue.indice).motif === MOTIFS.MAUVAIS_PRODUIT);
verifier("elle tient dans un QR code (moins de 900 caractères)",
  session.code.length < 900, `${session.code.length} caractères`);

/* L'identifiant de séance — ajouté le 27/08. Sans lui, deux séances de même
   libellé et de même date étaient le MÊME code : le mardi ne se distinguait
   pas du jeudi, et aucun bilan ne pourrait être rattaché à SA séance. */
verifier("elle porte l'identifiant qui lui a été donné",
  luSession.ok && luSession.identifiant.equals(session.identifiant));
verifier("l'identifiant se montre en groupes lisibles",
  /^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/.test(identLisible(session.identifiant)),
  identLisible(session.identifiant));

const jumelle = fabriquerCodeSession({
  certificatBrut: luMartin.certificatBrut, secret: luMartin.secret, kEleve: luMartin.kEleve,
  finLe: "2026-12-20", libelle: "CAP IFCA — groupe A",   // mêmes libellé et date
});
verifier("deux séances de même libellé et même date restent deux séances distinctes",
  jumelle.code !== session.code && !jumelle.identifiant.equals(session.identifiant));

/* Le titulaire n'a JAMAIS eu la clé racine : on le prouve en montrant que
   sa clé ne sait pas signer un certificat que la racine validerait. */
const certUsurpe = fabriquerCertificat(
  { indiceProduit: habilitation.indice, millesime: 2026, numero: 500, expireLe: "2027-08-31",
    publiqueBrute: martin.titulaire.publiqueBrute, nom: "Auto-promu" },
  martin.titulaire.privateKey
);
verifier("un titulaire ne peut pas se fabriquer un certificat : il n'a pas la racine",
  lireCertificat(certUsurpe, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.SIGNATURE_INVALIDE);

/* Session bricolée : bon certificat, mais signée par quelqu'un d'autre. */
const intrus = genererPaire();
const sessionBricolee = fabriquerCodeSession({
  certificatBrut: luMartin.certificatBrut,   // le certificat de Martin…
  secret: intrus.secret,                      // …mais la signature d'un autre
  kEleve: luMartin.kEleve,
  finLe: "2026-12-20",
  libelle: "Session volée",
});
verifier("une session signée par un autre que le titulaire du certificat est refusée",
  lireCodeSession(sessionBricolee.code, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.SIGNATURE_INVALIDE);

/* Session périmée */
const sessionFinie = fabriquerCodeSession({
  certificatBrut: luMartin.certificatBrut, secret: luMartin.secret, kEleve: luMartin.kEleve,
  finLe: "2026-08-25", libelle: "Séance d'hier",
});
verifier("une session dont la date est passée est refusée",
  lireCodeSession(sessionFinie.code, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.EXPIRE);

/* Un code de session lu comme un code maître, et l'inverse */
verifier("un code de session n'est pas accepté comme code maître",
  lireCodeMaitre(session.code, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.VERSION_INCONNUE);
verifier("un code maître n'est pas accepté comme code de session",
  lireCodeSession(martin.code, racine.publicKey, AUJOURD_HUI).motif === MOTIFS.VERSION_INCONNUE);

/* ====================================================================
   7. LE MIROIR — moteur/acces.js ne doit pas dériver du build
   `acces.js` réimplémente le format pour le navigateur : il embarque sa
   propre table de produits et la clé publique racine. Deux copies, donc
   deux occasions de diverger. Ce contrôle ferme la porte.
   ==================================================================== */
section("7. Le miroir moteur/acces.js");

const cheminMoteur = new URL("../moteur/acces.js", import.meta.url);
let source = null;
try { source = readFileSync(cheminMoteur, "utf8"); } catch { /* absent */ }

verifier("moteur/acces.js existe", source !== null);

if (source) {
  /* La table des produits, ligne à ligne */
  const declares = [...source.matchAll(/\{\s*indice:\s*(\d+),\s*id:\s*"([^"]+)"/g)]
    .map((m) => ({ indice: Number(m[1]), id: m[2] }));
  verifier("il déclare autant de produits que le build",
    declares.length === PRODUITS.length, `${declares.length} contre ${PRODUITS.length}`);
  const memesIndices = PRODUITS.every((p) =>
    declares.some((d) => d.indice === p.indice && d.id === p.id));
  verifier("chaque indice y désigne le même produit qu'au build", memesIndices);

  /* Les constantes de format */
  for (const [nom, valeur] of [["VERSION", 1], ["TYPE_MAITRE", "0x11"], ["TYPE_SEANCE", "0x21"]]) {
    verifier(`la constante ${nom} y vaut ${valeur}`,
      new RegExp(`${nom}\\s*=\\s*${valeur}\\b`).test(source));
  }

  /* La clé racine embarquée doit être CELLE du poste — quand elle existe */
  const m = /CLE_RACINE\s*=\s*"([A-Za-z0-9_-]+)"/.exec(source);
  verifier("une clé racine y est embarquée", !!m);
  const fichierBrute = RACINE_ACCES + "/cle-publique-brute.txt";
  if (m && existsSync(fichierBrute)) {
    const attendue = readFileSync(fichierBrute, "utf8").trim();
    verifier("elle est bien la clé publique de ce poste", m[1] === attendue);
    verifier("elle fait 65 octets une fois décodée",
      Buffer.from(m[1], "base64url").length === 65);
  } else if (m) {
    console.log("  ▪ clé racine du poste absente — comparaison non faite (poste sans les secrets)");
  }
}

/* ====================================================================
   Bilan
   ==================================================================== */
console.log("\n" + "─".repeat(64));
if (echecs.length === 0) {
  console.log(`✓ ${passes} contrôles, aucun échec.`);
  console.log(`  code maître : ${martin.code.length} caractères · code de session : ${session.code.length} caractères`);
  process.exit(0);
} else {
  console.log(`✗ ${echecs.length} échec(s) sur ${passes + echecs.length} contrôles :`);
  for (const e of echecs) console.log("   · " + e);
  process.exit(1);
}
