/* =====================================================================
   lib-version.mjs — le numéro de version du RUNTIME, pour casser le cache
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Le 28/07, F. Henninot s'est retrouvé bloqué sur l'accueil trois fois de
   suite, alors que le code était déjà corrigé et publié : son navigateur
   servait une copie en cache d'`index.html`, plus vieille que le correctif.
   « Fais Ctrl+F5 » a marché trois fois — la quatrième fois, ce n'est plus
   une solution, c'est un défaut de conception qu'il faut corriger une
   bonne fois.

   CE QUE ÇA FAIT
   Un petit hash (10 caractères hex, sha256 des fichiers qui composent le
   moteur) sert de numéro de version. `build/version.mjs` l'utilise pour
   suffixer `?v=<hash>` sur les scripts et feuilles de style des pages
   écrites à la main (index.html, formateur.html, projection.html,
   portail.html, dossier.html). Tant que rien ne change, le hash ne change
   pas et le cache reste utile. Dès qu'UNE ligne de moteur ou de contenu
   change, le hash change, l'URL change, et le navigateur est OBLIGÉ de
   retélécharger — aucun réglage de cache, aucune extension, aucun Ctrl+F5
   ne peut plus s'y opposer.

   `galerie.mjs` importe la même fonction pour ses propres `<script src>` :
   un seul calcul, jamais deux hash qui pourraient diverger.
   ===================================================================== */
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Tout ce qui, changé, doit invalider le cache du visiteur : le moteur
   générique, l'habillage sonore, la lecture à voix haute, la charte, ET
   le contenu du pack (cartes.js/parcours.js) — un stagiaire qui garde un
   onglet ouvert plusieurs jours ne doit jamais rater une correction de
   fiche. */
const FICHIERS_SOURCES = [
  "packs/fluides/cartes.js",
  "packs/fluides/parcours.js",
  "packs/fluides/sons.js",
  /* Le support de projection LUI-MÊME, pas seulement ses sources. Angle mort
     trouvé le 31/07 : `projection.gen.js` est fabriqué par build/parcours.mjs
     à partir de cartes.js et parcours.js. Quand c'est le GÉNÉRATEUR qui
     change — un nouveau découpage des écrans, par exemple — la sortie change
     sans qu'aucune source de cette liste ait bougé. Le hash restait donc
     identique, l'URL aussi, et un formateur qui avait déjà ouvert la
     projection continuait de projeter l'ancienne. Exactement le défaut que ce
     fichier existe pour empêcher. */
  "packs/fluides/projection.gen.js",
  "moteur/moteur.js",
  "moteur/sons.js",
  "moteur/lecture.js",
  "moteur/portillon.js",
  "moteur/lisibilite.js",
  "moteur/illustration.js",
  "moteur/charte-edu.css",
  "moteur/impression.css",
];

export function calculerVersion() {
  const h = createHash("sha256");
  for (const f of FICHIERS_SOURCES) {
    const p = resolve(RACINE, f);
    if (existsSync(p)) h.update(readFileSync(p, "utf8").replace(/\r\n/g, "\n"));
  }
  return h.digest("hex").slice(0, 10);
}
