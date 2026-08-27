/* =====================================================================
   test-fabrique.mjs — le banc de la fabrique de séances (AE-5)
   ---------------------------------------------------------------------
   USAGE :  node build/test-fabrique.mjs

   CE QU'IL PROUVE, et que la section 7 de `test-acces.mjs` ne pouvait pas
   prouver : les DEUX implémentations du format ne divergent pas. Comparer
   des constantes ne dit rien du résultat ; ici on fait FABRIQUER une
   séance par `moteur/acces.js` (le navigateur, WebCrypto) et on la fait
   LIRE par `build/lib-acces.mjs` (Node), puis l'inverse. Si un octet
   bouge d'un côté, ce banc rougit.

   `moteur/acces.js` est chargé dans un bac à sable : un `localStorage` et
   un `window` de fortune, et la clé racine du poste remplacée par une
   racine de test — le banc ne touche donc à aucun secret réel et tourne
   sur n'importe quelle machine.

   Zéro dépendance, comme le reste du dépôt.
   ===================================================================== */
import {
  genererPaire, tirerClesMillesime, fabriquerCertificat,
  fabriquerCodeMaitre, fabriquerCodeSession, lireCodeSession,
  identLisible, MOTIFS, listeEleves, fabriquerBilan, lireBilan,
} from "./lib-acces.mjs";
import { produitParId } from "./produits.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RACINE_DEPOT = join(dirname(fileURLToPath(import.meta.url)), "..");

let passes = 0;
const echecs = [];

function verifier(intitule, condition, detail) {
  if (condition) { passes++; console.log("  ✓ " + intitule); }
  else { echecs.push(intitule + (detail ? ` — ${detail}` : "")); console.log("  ✗ " + intitule + (detail ? ` — ${detail}` : "")); }
}

function section(titre) { console.log("\n" + titre); }

/* --------------------------------------------------------------------
   Le bac à sable : ce que `moteur/acces.js` croit être un navigateur
   -------------------------------------------------------------------- */
function chargerAccesJs(clePubliqueRacineB64url) {
  const source = readFileSync(join(RACINE_DEPOT, "moteur", "acces.js"), "utf8");

  /* On substitue la clé racine du poste par celle du banc. La forme est
     vérifiée : si la ligne change de dessin, on préfère échouer ici
     plutôt que tester un fichier qu'on n'a pas vraiment modifié. */
  const motif = /var CLE_RACINE = "[A-Za-z0-9_-]+";/;
  if (!motif.test(source)) throw new Error("CLE_RACINE introuvable dans moteur/acces.js — le banc ne sait plus quoi remplacer");
  const truque = source.replace(motif, `var CLE_RACINE = "${clePubliqueRacineB64url}";`);

  const rangement = new Map();
  const bac = {
    window: {},
    localStorage: {
      getItem: (k) => (rangement.has(k) ? rangement.get(k) : null),
      setItem: (k, v) => rangement.set(k, String(v)),
      removeItem: (k) => rangement.delete(k),
    },
    crypto, atob, btoa, TextEncoder, TextDecoder, console,
    location: { hash: "", origin: "https://inerweb.fr", pathname: "/" },
    document: undefined,
  };

  const noms = Object.keys(bac);
  new Function(...noms, truque)(...noms.map((n) => bac[n]));
  return { acces: bac.window.inerwebAcces, rangement };
}

/* --------------------------------------------------------------------
   Le décor : une racine de test, un titulaire, un produit
   -------------------------------------------------------------------- */
const racine = genererPaire();
const habilitation = produitParId("habilitation");
const cles2026 = tirerClesMillesime();
const titulaire = genererPaire();

const EXPIRE_LE = "2027-08-31";
const certificat = fabriquerCertificat(
  { indiceProduit: habilitation.indice, millesime: 2026, numero: 1,
    expireLe: EXPIRE_LE, publiqueBrute: titulaire.publiqueBrute, nom: "Martin Dubois" },
  racine.privateKey
);
const codeMaitre = fabriquerCodeMaitre({
  certificat, secret: titulaire.secret, kProf: cles2026.kProf, kEleve: cles2026.kEleve,
});

const { acces } = chargerAccesJs(racine.publiqueBrute.toString("base64url"));

console.log("Banc de la fabrique de séances — moteur/acces.js contre build/lib-acces.mjs");

/* ====================================================================
   1. Sans code maître, la fabrique refuse — le verrou du 27/08
   ==================================================================== */
section("1. Le verrou : pas de code enseignant, pas de séance");

verifier("aucun accès rangé au départ", acces.estTitulaire("habilitation") === false);

const refusSec = await acces.fabriquerSeance("habilitation", {
  libelle: "CAP IFCA — groupe A", finLe: "2026-12-20",
});
verifier("fabriquer sans accès enseignant est refusé",
  refusSec.ok === false && refusSec.motif === "PAS_TITULAIRE", refusSec.motif);
verifier("le refus s'explique en clair", typeof refusSec.message === "string" && refusSec.message.length > 10);

/* ====================================================================
   2. Le code maître ouvre la fabrique
   ==================================================================== */
section("2. Le titulaire fabrique");

const active = await acces.activer(codeMaitre);
verifier("le code maître est accepté par le navigateur", active.ok === true, active.motif);
verifier("le produit est reconnu", active.ok && active.produit.id === "habilitation");
verifier("le titulaire est désormais reconnu comme tel", acces.estTitulaire("habilitation") === true);

const seance = await acces.fabriquerSeance("habilitation", {
  libelle: "CAP IFCA — groupe A", finLe: "2026-12-20",
});
verifier("une séance se fabrique", seance.ok === true, seance.motif);
verifier("elle porte un identifiant lisible",
  seance.ok && /^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/.test(seance.identifiant), seance.identifiant);
verifier("elle tient dans un QR code (moins de 900 caractères)",
  seance.ok && seance.code.length < 900, seance.ok ? `${seance.code.length} caractères` : "");

/* ====================================================================
   3. LE POINT CRITIQUE — ce que le navigateur signe, Node le relit
   ==================================================================== */
section("3. Les deux implémentations lisent le même format");

const relu = lireCodeSession(seance.code, racine.publicKey, "2026-08-27");
verifier("le code fabriqué au navigateur est accepté par le build", relu.ok === true, relu.motif);
verifier("le nom de l'émetteur traverse", relu.ok && relu.certificat.nom === "Martin Dubois");
verifier("le libellé traverse", relu.ok && relu.libelle === "CAP IFCA — groupe A");
verifier("la date de fin traverse", relu.ok && relu.finLe === "2026-12-20");
verifier("la clé élève traverse", relu.ok && relu.kEleve.equals(cles2026.kEleve));
verifier("l'identifiant traverse à l'identique",
  relu.ok && identLisible(relu.identifiant) === seance.identifiant,
  relu.ok ? `${identLisible(relu.identifiant)} ≠ ${seance.identifiant}` : "");

/* Et dans l'autre sens : ce que Node signe, le navigateur le relit. */
const cotebuild = fabriquerCodeSession({
  certificatBrut: certificat, secret: titulaire.secret, kEleve: cles2026.kEleve,
  finLe: "2026-12-20", libelle: "Séance signée côté build",
});
const luNavigateur = await acces.activerSeance(cotebuild.code);
verifier("le code fabriqué au build est accepté par le navigateur", luNavigateur.ok === true, luNavigateur.motif);
verifier("son identifiant est le même des deux côtés",
  luNavigateur.ok && luNavigateur.identifiant === identLisible(cotebuild.identifiant));

/* ====================================================================
   4. Les refus de la fabrique
   ==================================================================== */
section("4. Ce que la fabrique refuse");

const sansNom = await acces.fabriquerSeance("habilitation", { libelle: "   ", finLe: "2026-12-20" });
verifier("une séance sans nom est refusée", sansNom.motif === "LIBELLE_INVALIDE", sansNom.motif);

const dateFolle = await acces.fabriquerSeance("habilitation", { libelle: "Essai", finLe: "20/12/2026" });
verifier("une date qui ne se lit pas est refusée, jamais devinée",
  dateFolle.motif === "DATE_INVALIDE", dateFolle.motif);

/* Une date passée mais que le format sait écrire : le refus doit dire
   « passée », pas « illisible ». */
const dateHier = await acces.fabriquerSeance("habilitation", { libelle: "Essai", finLe: "2026-08-01" });
verifier("une date passée est refusée", dateHier.motif === "DATE_PASSEE", dateHier.motif);

/* Et une date d'avant le 1er janvier 2026, que le format ne sait PAS
   écrire, est refusée elle aussi — par l'autre porte, sans être devinée. */
const dateAvantEpoque = await acces.fabriquerSeance("habilitation", { libelle: "Essai", finLe: "2020-01-01" });
verifier("une date d'avant 2026 sort du format, et est refusée aussi",
  dateAvantEpoque.motif === "DATE_INVALIDE", dateAvantEpoque.motif);

const tropLoin = await acces.fabriquerSeance("habilitation", { libelle: "Essai", finLe: "2099-01-01" });
verifier("une séance ne peut pas survivre à l'accès qui la signe",
  tropLoin.motif === "AU_DELA_DU_CERTIFICAT", tropLoin.motif);

/* ====================================================================
   5. L'identifiant sépare vraiment deux séances jumelles
   ==================================================================== */
section("5. Deux séances jumelles restent deux séances");

const jumelleA = await acces.fabriquerSeance("habilitation", { libelle: "CAP IFCA — groupe A", finLe: "2026-12-20" });
const jumelleB = await acces.fabriquerSeance("habilitation", { libelle: "CAP IFCA — groupe A", finLe: "2026-12-20" });
verifier("mêmes libellé et date, codes différents", jumelleA.code !== jumelleB.code);
verifier("mêmes libellé et date, identifiants différents", jumelleA.identifiant !== jumelleB.identifiant);

/* ====================================================================
   6. LE PIÈGE D'USAGE — scanner son propre QR ne doit rien détruire
   ==================================================================== */
section("6. L'enseignant qui vérifie son QR garde son accès");

const avant = acces.accesDe("habilitation");
const retour = await acces.activerSeance(seance.code);
verifier("il peut activer sa propre séance", retour.ok === true, retour.motif);
verifier("son accès enseignant a survécu", acces.estTitulaire("habilitation") === true);
verifier("sa clé enseignant est intacte", acces.accesDe("habilitation").kProf === avant.kProf);
verifier("il peut encore fabriquer après avoir scanné",
  (await acces.fabriquerSeance("habilitation", { libelle: "Encore une", finLe: "2026-12-20" })).ok === true);

/* Et un élève, lui, n'obtient pas de quoi fabriquer. */
const { acces: cotEleve } = chargerAccesJs(racine.publiqueBrute.toString("base64url"));
const chezEleve = await cotEleve.activerSeance(seance.code);
verifier("l'élève ouvre bien la séance", chezEleve.ok === true, chezEleve.motif);
verifier("mais l'élève n'est pas titulaire", cotEleve.estTitulaire("habilitation") === false);
const eleveFabrique = await cotEleve.fabriquerSeance("habilitation", { libelle: "Pirate", finLe: "2026-12-20" });
verifier("et l'élève ne peut pas fabriquer de séance",
  eleveFabrique.ok === false && eleveFabrique.motif === "PAS_TITULAIRE", eleveFabrique.motif);

/* ====================================================================
   7. L'ÉTAGE 3 — codes d'élève et bilans, des deux côtés (AE-6)
   ==================================================================== */
section("7. Les codes d'élève et les bilans ne divergent pas non plus");

const { acces: cotClasse } = chargerAccesJs(racine.publiqueBrute.toString("base64url"));
await cotClasse.activer(codeMaitre);
const laSeance = await cotClasse.fabriquerSeance("habilitation", {
  libelle: "MFER — groupe B", finLe: "2026-12-20",
});

const parNavigateur = await cotClasse.elevesDeSeance(laSeance.code, 30);
verifier("le navigateur sort la liste des 30 codes d'élève",
  parNavigateur.ok && parNavigateur.eleves.length === 30, parNavigateur.motif);
verifier("il signale les doublons éventuels", parNavigateur.ok && Array.isArray(parNavigateur.doublons));

/* Les mêmes codes doivent sortir du build, sinon un élève tape un code que
   la console de son enseignant ne reconnaîtra pas. */
const luSeance = lireCodeSession(laSeance.code, racine.publicKey, "2026-08-27");
const parBuild = listeEleves(luSeance.kEleve, luSeance.identifiant, 30);
verifier("les codes d'élève sont IDENTIQUES des deux côtés",
  parBuild.every((e, i) => e.code === parNavigateur.eleves[i].code && e.numero === parNavigateur.eleves[i].numero),
  `build ${parBuild.slice(0, 3).map((e) => e.code).join(" ")} · navigateur ${parNavigateur.eleves.slice(0, 3).map((e) => e.code).join(" ")}`);

/* L'élève entre avec ses quatre caractères, sur SON appareil. */
const { acces: cotEleve7 } = chargerAccesJs(racine.publiqueBrute.toString("base64url"));
await cotEleve7.activerSeance(laSeance.code);
verifier("l'élève n'a pas de numéro tant qu'il n'a rien tapé",
  cotEleve7.numeroEleve("habilitation") === null);

const entree = await cotEleve7.entrerCommeEleve("habilitation", parBuild[6].code);
verifier("quatre caractères suffisent à le reconnaître", entree.ok && entree.numero === 7, entree.motif);
verifier("son numéro est retenu pour la suite", cotEleve7.numeroEleve("habilitation") === 7);

const refuseEleve = await cotEleve7.entrerCommeEleve("habilitation", "2222");
verifier("un code d'élève non attribué est refusé, avec un message clair",
  refuseEleve.ok === false && typeof refuseEleve.message === "string", refuseEleve.motif);

/* Le bilan de fin, et son dépouillement par l'enseignant. */
const sonBilan = await cotEleve7.monBilan("habilitation", { dureeMin: 42, vues: 20, justes: 16 });
verifier("l'élève obtient son code de restitution", sonBilan.ok, sonBilan.motif);
verifier("il tient dans un message (moins de 60 caractères)",
  sonBilan.ok && sonBilan.code.length < 60, sonBilan.ok ? `${sonBilan.code.length} caractères` : "");

const parLeBuild = lireBilan(sonBilan.code, luSeance.kEleve, luSeance.identifiant);
verifier("le bilan fabriqué au navigateur se relit au build",
  parLeBuild.ok && parLeBuild.numero === 7 && parLeBuild.justes === 16 && parLeBuild.pourcent === 80,
  parLeBuild.motif);

const bilanDuBuild = fabriquerBilan(luSeance.kEleve, {
  identifiant: luSeance.identifiant, numero: 12, jour: "2026-09-15",
  dureeMin: 30, vues: 10, justes: 9,
});

/* Le dépouillement : l'enseignant colle ce qu'il a reçu, en vrac. */
const paquet = [sonBilan.code, bilanDuBuild, "ABIME" + sonBilan.code.slice(5)].join("\n");
const tableau = await cotClasse.depouiller(laSeance.code, paquet);
verifier("l'enseignant dépouille un paquet collé en vrac", tableau.ok, tableau.motif);
verifier("les deux bilans authentiques sont lus",
  tableau.ok && tableau.lignes.filter((l) => l.lu.ok).length === 2,
  tableau.ok ? `${tableau.lignes.filter((l) => l.lu.ok).length} lus sur ${tableau.lignes.length}` : "");
verifier("le bilan abîmé est signalé, pas avalé en silence",
  tableau.ok && tableau.lignes.some((l) => !l.lu.ok && l.lu.message));
verifier("chaque ligne porte son numéro d'élève",
  tableau.ok && tableau.lignes.filter((l) => l.lu.ok).map((l) => l.lu.numero).sort((a, b) => a - b).join(",") === "7,12");

/* Un bilan d'une AUTRE séance ne doit pas se glisser dans le tableau. */
const autre = await cotClasse.fabriquerSeance("habilitation", { libelle: "Autre groupe", finLe: "2026-12-20" });
const luAutre = lireCodeSession(autre.code, racine.publicKey, "2026-08-27");
const bilanEtranger = fabriquerBilan(luAutre.kEleve, {
  identifiant: luAutre.identifiant, numero: 3, jour: "2026-09-15", dureeMin: 5, vues: 5, justes: 5,
});
const avecEtranger = await cotClasse.depouiller(laSeance.code, bilanEtranger);
verifier("un bilan d'une autre séance est refusé au dépouillement",
  avecEtranger.ok && avecEtranger.lignes[0].lu.ok === false, "il aurait dû être écarté");

/* --------------------------------------------------------------------
   Verdict
   -------------------------------------------------------------------- */
console.log("\n" + "─".repeat(64));
if (echecs.length === 0) {
  console.log(`✓ ${passes} contrôles, aucun échec.`);
  console.log(`  code de séance fabriqué au navigateur : ${seance.code.length} caractères`);
} else {
  console.log(`✗ ${echecs.length} échec(s) sur ${passes + echecs.length} :`);
  for (const e of echecs) console.log("   · " + e);
  process.exitCode = 1;
}
