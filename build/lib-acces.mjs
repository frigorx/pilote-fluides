/* =====================================================================
   lib-acces.mjs — le socle des codes d'accès enseignant (AE-1)
   ---------------------------------------------------------------------
   Ce fichier ne fait RIEN tout seul : il fabrique et vérifie des codes.
   Les outils qui l'emploient sont `racine-acces.mjs`, `millesime.mjs`,
   `delivrer-acces.mjs`. Le pendant navigateur sera `moteur/acces.js`.

   LE PRINCIPE — voir la spec pour le détail
   Le coffre d'un produit n'est plus chiffré par une clé DÉRIVÉE du code
   tapé (faible : un code court fait une clé courte), mais par une clé
   TIRÉE AU HASARD sur 256 bits. Le code ne fabrique plus la clé : il la
   TRANSPORTE. La force ne dépend donc plus de ce que l'enseignant tape.

   DEUX ÉTAGES, UNE CHAÎNE DE CERTIFICATION
   · F. Henninot détient LA clé privée racine (hors dépôt, jamais publiée).
   · Il délivre à chaque titulaire un CERTIFICAT : nom + produit + millésime
     + expiration + la clé publique DU TITULAIRE, le tout signé par la racine.
   · Le code maître transporte ce certificat, la clé privée du titulaire,
     et les deux clés du coffre (enseignant et élève).
   · Le titulaire signe lui-même ses codes de session avec SA clé — sans
     jamais détenir la clé racine. Le site vérifie la chaîne hors ligne.

   POURQUOI ECDSA P-256 ET PAS Ed25519
   Ed25519 est plus élégant, mais WebCrypto ne le sert pas partout. P-256
   est présent dans tous les navigateurs depuis des années, et le site doit
   marcher sur le poste de salle comme sur le téléphone d'un élève. Les
   signatures sont en format IEEE P1363 (64 octets bruts), celui que
   WebCrypto attend — pas le DER de Node.

   CLOISONNEMENT — la décision du 26/08
   Les clés d'un produit ne dérivent pas de celles d'un autre : elles sont
   tirées séparément. Aucun calcul ne fait passer de `habilitation` à
   `aquiblue`. Un code qui fuite ne fait tomber qu'un produit.

   DÉFAUT-REFUS
   Toute anomalie renvoie un refus motivé, jamais une valeur « par défaut » :
   une date illisible ne s'interprète pas, un octet de trop fait échouer.
   ===================================================================== */
import {
  generateKeyPairSync, createPublicKey, createPrivateKey, createHmac,
  randomBytes, sign as signer, verify as verifier,
} from "node:crypto";

/* --------------------------------------------------------------------
   CONSTANTES DE FORMAT — gravées dans les codes déjà émis, ne pas toucher
   -------------------------------------------------------------------- */
export const VERSION = 1;
export const TYPE_MAITRE = 0x10 | VERSION;   // 0x11
export const TYPE_SESSION = 0x20 | VERSION;  // 0x21

const TAILLE_PUBLIQUE = 65; // point P-256 non compressé : 0x04 || x || y
const TAILLE_SECRET = 32;   // scalaire privé, et clés de coffre
const TAILLE_SIGNATURE = 64;
const ENTETE_CERT = 74;     // octets avant le nom
export const TAILLE_IDENT = 8; // identifiant de séance (étage 2)

/* Les dates tiennent sur 2 octets : nombre de jours depuis le 1er janvier
   2026. De quoi voir venir jusqu'en 2205. */
const EPOQUE = Date.UTC(2026, 0, 1);
const JOUR = 86400000;

/* Motifs de refus — canoniques, comparés en test, affichés à l'utilisateur
   par un libellé séparé (jamais ces chaînes-ci telles quelles). */
export const MOTIFS = {
  ABSENT: "ABSENT",
  ILLISIBLE: "ILLISIBLE",
  VERSION_INCONNUE: "VERSION_INCONNUE",
  SIGNATURE_INVALIDE: "SIGNATURE_INVALIDE",
  EXPIRE: "EXPIRE",
  MAUVAIS_PRODUIT: "MAUVAIS_PRODUIT",
  AUTRE_SEANCE: "AUTRE_SEANCE",
};

/* ====================================================================
   DATES — défaut-refus : ce qui ne se lit pas ne s'interprète pas
   ==================================================================== */

export function enJours(iso) {
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error(`date illisible : ${JSON.stringify(iso)} (attendu AAAA-MM-JJ)`);
  }
  const [a, m, j] = iso.split("-").map(Number);
  const t = Date.UTC(a, m - 1, j);
  if (Number.isNaN(t)) throw new Error(`date illisible : ${iso}`);
  const jours = Math.round((t - EPOQUE) / JOUR);
  if (jours < 0 || jours > 0xffff) throw new Error(`date hors de portée du format : ${iso}`);
  return jours;
}

export function versISO(jours) {
  return new Date(EPOQUE + jours * JOUR).toISOString().slice(0, 10);
}

/* ====================================================================
   CLÉS
   ==================================================================== */

/** Une paire ECDSA P-256. Renvoie les formes utiles : objets Node + brut. */
export function genererPaire() {
  const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
  const jwk = privateKey.export({ format: "jwk" });
  const publiqueBrute = Buffer.concat([
    Buffer.from([4]),
    Buffer.from(jwk.x, "base64url"),
    Buffer.from(jwk.y, "base64url"),
  ]);
  return {
    publicKey,
    privateKey,
    publiqueBrute,                              // 65 octets, ce qui entre au certificat
    secret: Buffer.from(jwk.d, "base64url"),    // 32 octets, ce que transporte le code
  };
}

/** Reconstruit une clé publique depuis les 65 octets du certificat. */
export function publiqueDepuisBrute(brute) {
  if (!Buffer.isBuffer(brute) || brute.length !== TAILLE_PUBLIQUE || brute[0] !== 4) {
    throw new Error("clé publique brute invalide");
  }
  return createPublicKey({
    format: "jwk",
    key: {
      kty: "EC", crv: "P-256",
      x: brute.subarray(1, 33).toString("base64url"),
      y: brute.subarray(33, 65).toString("base64url"),
    },
  });
}

/** Reconstruit une clé privée depuis le secret transporté + la publique du certificat. */
export function priveeDepuisSecret(secret, publiqueBrute) {
  if (!Buffer.isBuffer(secret) || secret.length !== TAILLE_SECRET) {
    throw new Error("secret de signature invalide");
  }
  return createPrivateKey({
    format: "jwk",
    key: {
      kty: "EC", crv: "P-256",
      x: publiqueBrute.subarray(1, 33).toString("base64url"),
      y: publiqueBrute.subarray(33, 65).toString("base64url"),
      d: secret.toString("base64url"),
    },
  });
}

/** Les deux clés de coffre d'un produit pour une année. Tirées, jamais dérivées. */
export function tirerClesMillesime() {
  return { kProf: randomBytes(TAILLE_SECRET), kEleve: randomBytes(TAILLE_SECRET) };
}

/* ====================================================================
   SIGNATURE — IEEE P1363, le format que WebCrypto sait lire
   ==================================================================== */

function signe(donnees, privee) {
  return signer("sha256", donnees, { key: privee, dsaEncoding: "ieee-p1363" });
}

function verifie(donnees, signature, publique) {
  try {
    return verifier("sha256", donnees, { key: publique, dsaEncoding: "ieee-p1363" }, signature);
  } catch {
    return false; // une clé ou une signature malformée est un refus, pas une exception
  }
}

/* ====================================================================
   CERTIFICAT — ce que la racine signe
     0     version
     1     indice de produit
     2-3   millésime
     4-5   numéro de titulaire
     6-7   expiration (jours)
     8-72  clé publique du titulaire (65)
     73    longueur du nom
     74..  nom (UTF-8)
     puis  signature racine (64)
   ==================================================================== */

export function fabriquerCertificat({ indiceProduit, millesime, numero, expireLe, publiqueBrute, nom }, priveeRacine) {
  const nomBrut = Buffer.from(String(nom), "utf8");
  if (nomBrut.length < 1 || nomBrut.length > 255) throw new Error("nom de titulaire absent ou trop long");
  if (!Number.isInteger(indiceProduit) || indiceProduit < 0 || indiceProduit > 255) throw new Error("indice de produit invalide");
  if (!Number.isInteger(millesime) || millesime < 2026 || millesime > 0xffff) throw new Error("millésime invalide");
  if (!Number.isInteger(numero) || numero < 1 || numero > 0xffff) throw new Error("numéro de titulaire invalide");

  const corps = Buffer.alloc(ENTETE_CERT + nomBrut.length);
  corps[0] = VERSION;
  corps[1] = indiceProduit;
  corps.writeUInt16BE(millesime, 2);
  corps.writeUInt16BE(numero, 4);
  corps.writeUInt16BE(enJours(expireLe), 6);
  publiqueBrute.copy(corps, 8);
  corps[73] = nomBrut.length;
  nomBrut.copy(corps, ENTETE_CERT);

  return Buffer.concat([corps, signe(corps, priveeRacine)]);
}

/** Vérifie le certificat. `aujourdhui` en AAAA-MM-JJ ; null pour ne pas juger la date. */
export function lireCertificat(cert, publiqueRacine, aujourdhui) {
  if (!Buffer.isBuffer(cert) || cert.length < ENTETE_CERT + 1 + TAILLE_SIGNATURE) {
    return { ok: false, motif: MOTIFS.ILLISIBLE };
  }
  if (cert[0] !== VERSION) return { ok: false, motif: MOTIFS.VERSION_INCONNUE };

  const tailleNom = cert[73];
  const finCorps = ENTETE_CERT + tailleNom;
  if (cert.length !== finCorps + TAILLE_SIGNATURE) return { ok: false, motif: MOTIFS.ILLISIBLE };

  const corps = cert.subarray(0, finCorps);
  if (!verifie(corps, cert.subarray(finCorps), publiqueRacine)) {
    return { ok: false, motif: MOTIFS.SIGNATURE_INVALIDE };
  }

  const expireLe = versISO(cert.readUInt16BE(6));
  if (aujourdhui != null && aujourdhui > expireLe) {
    return { ok: false, motif: MOTIFS.EXPIRE, expireLe };
  }

  return {
    ok: true,
    certificat: {
      indiceProduit: cert[1],
      millesime: cert.readUInt16BE(2),
      numero: cert.readUInt16BE(4),
      expireLe,
      publiqueBrute: Buffer.from(cert.subarray(8, 8 + TAILLE_PUBLIQUE)),
      nom: cert.subarray(ENTETE_CERT, finCorps).toString("utf8"),
    },
  };
}

/* ====================================================================
   CODE MAÎTRE — étage 1
     0     type/version (0x11)
     1-2   longueur du certificat
     3..   certificat
     puis  secret de signature du titulaire (32)
     puis  K-prof (32)
     puis  K-élève (32)
   ==================================================================== */

export function fabriquerCodeMaitre({ certificat, secret, kProf, kEleve }) {
  for (const [nom, b] of [["secret", secret], ["kProf", kProf], ["kEleve", kEleve]]) {
    if (!Buffer.isBuffer(b) || b.length !== TAILLE_SECRET) throw new Error(`${nom} : 32 octets attendus`);
  }
  const tete = Buffer.alloc(3);
  tete[0] = TYPE_MAITRE;
  tete.writeUInt16BE(certificat.length, 1);
  return Buffer.concat([tete, certificat, secret, kProf, kEleve]).toString("base64url");
}

export function lireCodeMaitre(code, publiqueRacine, aujourdhui) {
  const brut = decoder(code);
  if (!brut) return { ok: false, motif: MOTIFS.ABSENT };
  if (brut.length < 3) return { ok: false, motif: MOTIFS.ILLISIBLE };
  if (brut[0] !== TYPE_MAITRE) return { ok: false, motif: MOTIFS.VERSION_INCONNUE };

  const tailleCert = brut.readUInt16BE(1);
  const finCert = 3 + tailleCert;
  if (brut.length !== finCert + 3 * TAILLE_SECRET) return { ok: false, motif: MOTIFS.ILLISIBLE };

  const lu = lireCertificat(brut.subarray(3, finCert), publiqueRacine, aujourdhui);
  if (!lu.ok) return lu;

  return {
    ok: true,
    certificat: lu.certificat,
    certificatBrut: Buffer.from(brut.subarray(3, finCert)),
    secret: Buffer.from(brut.subarray(finCert, finCert + TAILLE_SECRET)),
    kProf: Buffer.from(brut.subarray(finCert + TAILLE_SECRET, finCert + 2 * TAILLE_SECRET)),
    kEleve: Buffer.from(brut.subarray(finCert + 2 * TAILLE_SECRET)),
  };
}

/* ====================================================================
   CODE DE SESSION — étage 2, fabriqué par le titulaire
     0     type/version (0x21)
     1-2   longueur du certificat de l'émetteur
     3..   certificat
     puis  K-élève (32)
     puis  IDENTIFIANT de séance (8)
     puis  fin de validité (2)
     puis  longueur du libellé (1) + libellé
     puis  signature DU TITULAIRE (64) sur tout ce qui précède

   POURQUOI UN IDENTIFIANT — ajouté le 27/08, avant toute émission
   Sans lui, deux séances de même libellé et de même date de fin
   produisaient EXACTEMENT le même code : « CAP IFCA groupe A » de mardi
   ne se distinguait pas de celui de jeudi. Huit octets tirés au hasard
   suffisent à les séparer, et ce sont eux qui permettront plus tard de
   rattacher un bilan d'élève à SA séance — quelle que soit la voie de
   remontée retenue. Le poser maintenant coûte huit octets ; le poser
   après qu'un code a circulé coûte un changement de format.
   ==================================================================== */

/** Un identifiant de séance neuf : 8 octets tirés au hasard. */
export function tirerIdentifiant() {
  return randomBytes(TAILLE_IDENT);
}

/** L'identifiant tel qu'on le montre : 3F2A-91C7-B04D-5E16. */
export function identLisible(ident) {
  return (ident.toString("hex").toUpperCase().match(/.{4}/g) || []).join("-");
}

export function fabriquerCodeSession({ certificatBrut, secret, kEleve, finLe, libelle, identifiant }) {
  const libelleBrut = Buffer.from(String(libelle ?? ""), "utf8");
  if (libelleBrut.length > 255) throw new Error("libellé de session trop long");
  if (!Buffer.isBuffer(kEleve) || kEleve.length !== TAILLE_SECRET) throw new Error("kEleve : 32 octets attendus");

  /* Tiré ici par défaut ; on peut l'imposer, mais seulement pour rejouer
     une fabrication à l'identique en test. */
  const ident = identifiant ?? tirerIdentifiant();
  if (!Buffer.isBuffer(ident) || ident.length !== TAILLE_IDENT) {
    throw new Error(`identifiant de séance : ${TAILLE_IDENT} octets attendus`);
  }

  const tete = Buffer.alloc(3);
  tete[0] = TYPE_SESSION;
  tete.writeUInt16BE(certificatBrut.length, 1);

  const queue = Buffer.alloc(TAILLE_IDENT + 3 + libelleBrut.length);
  ident.copy(queue, 0);
  queue.writeUInt16BE(enJours(finLe), TAILLE_IDENT);
  queue[TAILLE_IDENT + 2] = libelleBrut.length;
  libelleBrut.copy(queue, TAILLE_IDENT + 3);

  const corps = Buffer.concat([tete, certificatBrut, kEleve, queue]);
  const publiqueBrute = certificatBrut.subarray(8, 8 + TAILLE_PUBLIQUE);
  const privee = priveeDepuisSecret(secret, publiqueBrute);
  return {
    code: Buffer.concat([corps, signe(corps, privee)]).toString("base64url"),
    identifiant: ident,
  };
}

export function lireCodeSession(code, publiqueRacine, aujourdhui) {
  const brut = decoder(code);
  if (!brut) return { ok: false, motif: MOTIFS.ABSENT };
  if (brut.length < 3) return { ok: false, motif: MOTIFS.ILLISIBLE };
  if (brut[0] !== TYPE_SESSION) return { ok: false, motif: MOTIFS.VERSION_INCONNUE };

  const tailleCert = brut.readUInt16BE(1);
  const finCert = 3 + tailleCert;
  const finCle = finCert + TAILLE_SECRET;
  const finIdent = finCle + TAILLE_IDENT;
  if (brut.length < finIdent + 3 + TAILLE_SIGNATURE) return { ok: false, motif: MOTIFS.ILLISIBLE };

  const tailleLibelle = brut[finIdent + 2];
  const finCorps = finIdent + 3 + tailleLibelle;
  if (brut.length !== finCorps + TAILLE_SIGNATURE) return { ok: false, motif: MOTIFS.ILLISIBLE };

  /* 1er maillon : le certificat vient-il bien de la racine ? La date du
     certificat n'est PAS jugée ici — c'est la fin de session qui commande
     l'accès élève, et elle ne peut pas dépasser le certificat (fabrication). */
  const lu = lireCertificat(brut.subarray(3, finCert), publiqueRacine, null);
  if (!lu.ok) return lu;

  /* 2e maillon : la session vient-elle bien de ce titulaire ? */
  const publique = publiqueDepuisBrute(lu.certificat.publiqueBrute);
  if (!verifie(brut.subarray(0, finCorps), brut.subarray(finCorps), publique)) {
    return { ok: false, motif: MOTIFS.SIGNATURE_INVALIDE };
  }

  const finLe = versISO(brut.readUInt16BE(finIdent));
  if (aujourdhui != null && aujourdhui > finLe) return { ok: false, motif: MOTIFS.EXPIRE, finLe };

  return {
    ok: true,
    certificat: lu.certificat,
    kEleve: Buffer.from(brut.subarray(finCert, finCle)),
    identifiant: Buffer.from(brut.subarray(finCle, finIdent)),
    finLe,
    libelle: brut.subarray(finIdent + 3, finCorps).toString("utf8"),
  };
}

/* ====================================================================
   ÉTAGE 3 — LES CODES INDIVIDUELS D'ÉLÈVE (AE-6)
   --------------------------------------------------------------------
   POURQUOI UN CODE COURT, ET PAS UN LIEN PAR ÉLÈVE
   Un lien de séance fait ~400 caractères. Un élève sans téléphone pour
   scanner ne peut pas le taper : on l'exclurait. Le lien reste donc
   COMMUN à la classe, et chaque élève tape en plus quatre caractères
   qui disent QUI il est.

   Le code est un HMAC de (identifiant de séance ‖ numéro) par la clé
   élève, tronqué. Il se vérifie hors ligne : le navigateur a la clé par
   le lien, il essaie les numéros et voit lequel correspond.

   ⚠️ CE QUE ÇA NE PROUVE PAS. Tous les élèves d'une séance partagent la
   même clé : qui a un code peut en calculer d'autres s'il comprend le
   procédé. C'est un numéro d'appel, pas une identité. La note qui compte
   au bulletin demande un serveur ; ceci sert au suivi.

   L'ALPHABET est sans caractères ambigus — ni O/0, ni I/L/1. Un code se
   dicte, se recopie, se lit de travers : c'est le premier défaut d'usage
   à écarter.
   ==================================================================== */

export const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ"; // 30 signes, sans O0 IL1
export const TAILLE_CODE_ELEVE = 4;
export const ELEVES_MAX = 100; // garde-fou provisoire décidé le 27/08

function sceau(cle, donnees) {
  return createHmac("sha256", cle).update(donnees).digest();
}

/** Le code court de l'élève `numero` (1..ELEVES_MAX) dans cette séance. */
export function codeEleve(kEleve, identifiant, numero) {
  if (!Buffer.isBuffer(kEleve) || kEleve.length !== TAILLE_SECRET) throw new Error("kEleve : 32 octets attendus");
  if (!Buffer.isBuffer(identifiant) || identifiant.length !== TAILLE_IDENT) throw new Error(`identifiant : ${TAILLE_IDENT} octets attendus`);
  if (!Number.isInteger(numero) || numero < 1 || numero > ELEVES_MAX) {
    throw new Error(`numéro d'élève hors du garde-fou (1 à ${ELEVES_MAX})`);
  }

  const entree = Buffer.alloc(TAILLE_IDENT + 2);
  identifiant.copy(entree, 0);
  entree.writeUInt16BE(numero, TAILLE_IDENT);

  const h = sceau(kEleve, entree);
  let code = "";
  for (let i = 0; i < TAILLE_CODE_ELEVE; i++) code += ALPHABET[h[i] % ALPHABET.length];
  return code;
}

/** La liste complète à distribuer : [{numero, code}, …]. */
export function listeEleves(kEleve, identifiant, combien) {
  const n = Math.min(Math.max(1, combien | 0), ELEVES_MAX);
  const sortie = [];
  for (let i = 1; i <= n; i++) sortie.push({ numero: i, code: codeEleve(kEleve, identifiant, i) });
  return sortie;
}

/** Les codes qui apparaissent plus d'une fois dans une liste. */
export function doublonsDe(liste) {
  const vus = new Map();
  for (const e of liste) vus.set(e.code, (vus.get(e.code) || 0) + 1);
  return [...vus.entries()].filter(([, n]) => n > 1).map(([code]) => code);
}

/**
 * À quel élève ce code correspond-il ? `null` si aucun — ou si plusieurs.
 *
 * On essaie tous les numéros — cent HMAC, c'est instantané, et ça évite de
 * ranger quoi que ce soit. Le garde-fou n'est pas une donnée à surveiller :
 * c'est la borne de cette boucle.
 *
 * ⚠️ ON NE S'ARRÊTE PAS AU PREMIER TROUVÉ. Quatre caractères font 810 000
 * combinaisons : sur une classe de trente, deux élèves tirent le même code
 * une fois sur deux mille environ. Rare, mais pas jamais — et s'arrêter au
 * premier ferait travailler un élève sous le numéro d'un autre, en silence.
 * Un code ambigu ne désigne donc personne, et l'enseignant est prévenu au
 * moment où il fabrique sa liste (voir `doublonsDe`).
 */
export function retrouverEleve(kEleve, identifiant, saisi) {
  if (typeof saisi !== "string") return null;
  const propre = saisi.trim().toUpperCase().replace(/[\s-]/g, "");
  if (propre.length !== TAILLE_CODE_ELEVE) return null;

  let trouve = null;
  for (let n = 1; n <= ELEVES_MAX; n++) {
    if (codeEleve(kEleve, identifiant, n) !== propre) continue;
    if (trouve !== null) return null; // ambigu : personne
    trouve = n;
  }
  return trouve;
}

/* ====================================================================
   LE BILAN DE RESTITUTION — ce que l'élève recopie à la fin
     0     type/version (0x31)
     1-8   identifiant de la séance
     9-10  numéro d'élève
     11-12 jour (jours depuis l'époque)
     13-14 durée en minutes (plafonnée)
     15-16 questions vues
     17-18 bonnes réponses
     19-26 sceau tronqué (8 octets) sur tout ce qui précède
   → 27 octets, soit 36 caractères : ça se colle dans un message.

   ⚠️ Le sceau prouve que le bilan vient de cette séance et qu'il n'a pas
   été abîmé en chemin. Il ne prouve PAS que l'élève 07 est bien l'élève
   07. Voir l'avertissement de l'étage 3.
   ==================================================================== */

export const TYPE_BILAN = 0x30 | VERSION; // 0x31
const TAILLE_SCEAU_BILAN = 8;

function borne(v, max) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.round(n), max);
}

export function fabriquerBilan(kEleve, { identifiant, numero, jour, dureeMin, vues, justes }) {
  const corps = Buffer.alloc(19);
  corps[0] = TYPE_BILAN;
  identifiant.copy(corps, 1);
  corps.writeUInt16BE(borne(numero, ELEVES_MAX), 9);
  corps.writeUInt16BE(borne(enJours(jour), 0xffff), 11);
  corps.writeUInt16BE(borne(dureeMin, 0xffff), 13);
  corps.writeUInt16BE(borne(vues, 0xffff), 15);
  corps.writeUInt16BE(borne(justes, 0xffff), 17);

  const s = sceau(kEleve, corps).subarray(0, TAILLE_SCEAU_BILAN);
  return Buffer.concat([corps, s]).toString("base64url");
}

export function lireBilan(code, kEleve, identifiantAttendu) {
  const brut = decoder(code);
  if (!brut) return { ok: false, motif: MOTIFS.ABSENT };
  if (brut.length !== 19 + TAILLE_SCEAU_BILAN) return { ok: false, motif: MOTIFS.ILLISIBLE };
  if (brut[0] !== TYPE_BILAN) return { ok: false, motif: MOTIFS.VERSION_INCONNUE };

  const corps = brut.subarray(0, 19);
  const attendu = sceau(kEleve, corps).subarray(0, TAILLE_SCEAU_BILAN);
  if (!attendu.equals(brut.subarray(19))) return { ok: false, motif: MOTIFS.SIGNATURE_INVALIDE };

  const identifiant = Buffer.from(corps.subarray(1, 9));
  if (identifiantAttendu && !identifiant.equals(identifiantAttendu)) {
    return { ok: false, motif: MOTIFS.AUTRE_SEANCE };
  }

  const vues = corps.readUInt16BE(15), justes = corps.readUInt16BE(17);
  return {
    ok: true, identifiant,
    numero: corps.readUInt16BE(9),
    jour: versISO(corps.readUInt16BE(11)),
    dureeMin: corps.readUInt16BE(13),
    vues, justes,
    pourcent: vues ? Math.round((justes * 100) / vues) : 0,
  };
}

/* ====================================================================
   OUTILS COMMUNS
   ==================================================================== */

function decoder(code) {
  if (typeof code !== "string" || code.trim() === "") return null;
  const propre = code.trim().replace(/\s+/g, "");
  if (!/^[A-Za-z0-9_-]+$/.test(propre)) return null;
  try {
    return Buffer.from(propre, "base64url");
  } catch {
    return null;
  }
}

/** Le garde que les pages appelleront : le code ouvre-t-il CE produit ? */
export function pourProduit(lecture, indiceAttendu) {
  if (!lecture.ok) return lecture;
  if (lecture.certificat.indiceProduit !== indiceAttendu) {
    return { ok: false, motif: MOTIFS.MAUVAIS_PRODUIT };
  }
  return lecture;
}
