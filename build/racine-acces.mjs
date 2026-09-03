/* =====================================================================
   racine-acces.mjs — la clé de signature racine (une seule fois, à vie)
   ---------------------------------------------------------------------
   USAGE :  node build/racine-acces.mjs

   🔴 CETTE CLÉ EST IRREMPLAÇABLE.
      Elle signe TOUS les codes d'accès de TOUS les produits. La perdre,
      c'est ne plus pouvoir en délivrer un seul — les codes déjà émis
      restent valides, mais plus rien ne se fabrique. À sauvegarder hors
      ligne le jour même : clé USB rangée ailleurs, et impression papier.
      Même régime que `cle-maitre.key` de HAL.

   OÙ ELLE VIT
      Privée  : C:/archives-inerweb/paquets/acces-inerweb/racine/cle-privee.pem
                — HORS DÉPÔT. Le dépôt pilote-fluides est PUBLIC.
      Publique: le même dossier, plus une forme « brute » de 65 octets à
                coller dans `moteur/acces.js` — c'est elle que le site
                embarque pour vérifier, et elle n'a rien de secret.

   Le script REFUSE d'écraser une clé existante. Pour en changer
   volontairement, déplacer l'ancienne à la main d'abord — et savoir que
   tous les codes en circulation deviendront invalides.
   ===================================================================== */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { genererPaire } from "./lib-acces.mjs";
import { RACINE_ACCES } from "./lieu-acces.mjs";

const DOSSIER = RACINE_ACCES;
const PRIVEE = DOSSIER + "/cle-privee.pem";
const PUBLIQUE = DOSSIER + "/cle-publique.pem";
const BRUTE = DOSSIER + "/cle-publique-brute.txt";

if (existsSync(PRIVEE)) {
  console.error("✗ une clé racine existe déjà : " + PRIVEE);
  console.error("");
  console.error("  Ce script refuse de l'écraser — la remplacer invaliderait TOUS les");
  console.error("  codes d'accès en circulation. Pour en changer volontairement,");
  console.error("  déplacez l'ancienne à la main, puis relancez.");
  process.exit(1);
}

mkdirSync(DOSSIER, { recursive: true });

const paire = genererPaire();
writeFileSync(PRIVEE, paire.privateKey.export({ type: "pkcs8", format: "pem" }), "utf8");
writeFileSync(PUBLIQUE, paire.publicKey.export({ type: "spki", format: "pem" }), "utf8");
writeFileSync(BRUTE, paire.publiqueBrute.toString("base64url") + "\n", "utf8");

console.log("✓ clé racine créée (ECDSA P-256).");
console.log("");
console.log("  privée   : " + PRIVEE + "   ← 🔴 À SAUVEGARDER HORS LIGNE AUJOURD'HUI");
console.log("  publique : " + PUBLIQUE);
console.log("  à coller dans moteur/acces.js :");
console.log("");
console.log("    " + paire.publiqueBrute.toString("base64url"));
console.log("");
console.log("  La forme ci-dessus n'a rien de secret : elle sert à VÉRIFIER,");
console.log("  jamais à signer. Elle a vocation à être publiée avec le site.");
