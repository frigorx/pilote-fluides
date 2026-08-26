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
  generateKeyPairSync, createPublicKey, createPrivateKey,
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
     puis  fin de validité (2)
     puis  longueur du libellé (1) + libellé
     puis  signature DU TITULAIRE (64) sur tout ce qui précède
   ==================================================================== */

export function fabriquerCodeSession({ certificatBrut, secret, kEleve, finLe, libelle }) {
  const libelleBrut = Buffer.from(String(libelle ?? ""), "utf8");
  if (libelleBrut.length > 255) throw new Error("libellé de session trop long");
  if (!Buffer.isBuffer(kEleve) || kEleve.length !== TAILLE_SECRET) throw new Error("kEleve : 32 octets attendus");

  const tete = Buffer.alloc(3);
  tete[0] = TYPE_SESSION;
  tete.writeUInt16BE(certificatBrut.length, 1);

  const queue = Buffer.alloc(3 + libelleBrut.length);
  queue.writeUInt16BE(enJours(finLe), 0);
  queue[2] = libelleBrut.length;
  libelleBrut.copy(queue, 3);

  const corps = Buffer.concat([tete, certificatBrut, kEleve, queue]);
  const publiqueBrute = certificatBrut.subarray(8, 8 + TAILLE_PUBLIQUE);
  const privee = priveeDepuisSecret(secret, publiqueBrute);
  return Buffer.concat([corps, signe(corps, privee)]).toString("base64url");
}

export function lireCodeSession(code, publiqueRacine, aujourdhui) {
  const brut = decoder(code);
  if (!brut) return { ok: false, motif: MOTIFS.ABSENT };
  if (brut.length < 3) return { ok: false, motif: MOTIFS.ILLISIBLE };
  if (brut[0] !== TYPE_SESSION) return { ok: false, motif: MOTIFS.VERSION_INCONNUE };

  const tailleCert = brut.readUInt16BE(1);
  const finCert = 3 + tailleCert;
  const finCle = finCert + TAILLE_SECRET;
  if (brut.length < finCle + 3 + TAILLE_SIGNATURE) return { ok: false, motif: MOTIFS.ILLISIBLE };

  const tailleLibelle = brut[finCle + 2];
  const finCorps = finCle + 3 + tailleLibelle;
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

  const finLe = versISO(brut.readUInt16BE(finCle));
  if (aujourdhui != null && aujourdhui > finLe) return { ok: false, motif: MOTIFS.EXPIRE, finLe };

  return {
    ok: true,
    certificat: lu.certificat,
    kEleve: Buffer.from(brut.subarray(finCert, finCle)),
    finLe,
    libelle: brut.subarray(finCle + 3, finCorps).toString("utf8"),
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
