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
import { readFileSync, existsSync, readdirSync } from "node:fs";
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
  /* Les descriptions du plan (relevées par registre.mjs) : une description
     de cours corrigée doit atteindre le visiteur qui garde l'onglet ouvert. */
  "plan-descriptions.gen.js",
  "moteur/moteur.js",
  "moteur/sons.js",
  "moteur/lecture.js",
  "moteur/portillon.js",
  "moteur/lisibilite.js",
  "moteur/marque.js",
  "moteur/illustration.js",
  "moteur/charte-edu.css",
  "moteur/impression.css",
  /* index.html : le MÊME angle mort que projection.gen.js, trouvé le 20/08.
     Le plan de formation — son tracé, ses lignes, ses stations, et depuis ce
     jour la recherche — ne vit dans AUCUN fichier de moteur : tout est écrit
     dans index.html. Couper une ligne en deux ou corriger le placement des
     libellés ne changeait donc pas le hash. L'URL restait la même, le cache
     du service worker gardait son nom, et le visiteur qui avait déjà ouvert
     le site continuait de voir l'ancien plan — sans aucun moyen de savoir
     qu'il en existait un nouveau.
     ⚠️ Ce fichier CONTIENT le hash (les `?v=` que version.mjs y écrit) : le
     hasher tel quel se mordrait la queue — nouveau hash, donc nouveau
     contenu, donc nouveau hash. Les occurrences sont donc neutralisées avant
     le calcul, voir `calculerVersion()`. */
];

/* TOUTES LES PAGES DE LA RACINE, et pas seulement index.html. Le 20/08, après
   avoir ajouté index.html pour la carte, la page « Le métier » a été refondue :
   le hash n'a PAS bougé, donc le service worker aurait continué de servir
   l'ancienne. Le défaut n'était pas propre à index.html — il touche toute page
   dont le contenu est écrit ici plutôt que dérivé d'un fichier de moteur.
   On lit donc le dossier au lieu de tenir une liste : une page ajoutée est
   couverte le jour où elle apparaît, sans que personne ait à y penser. Ce que
   ça coûte : un .html oublié à la racine fait bouger le hash. C'est le bon sens
   de l'échange — un cache invalidé pour rien ne casse rien, une page jamais
   rafraîchie, si. */
function pagesRacine() {
  try {
    return readdirSync(RACINE).filter((f) => f.endsWith(".html")).sort();
  } catch (e) { return []; }
}

/* Même leçon, un cran plus loin : les réseaux servis (electrorezo/,
   hocourant/, hydrometro/…) vivent dans leur dossier, et rien de ce
   qu'ils contiennent n'entrait dans ce hash. Tant qu'il s'agissait de
   scripts, le service worker les revalidait en arrière-plan et la
   correction arrivait à la visite suivante. Mais il RANGE L'AUDIO À PART :
   « cache d'abord, sans revalidation ». Une voix refaite serait donc
   restée figée pour toujours chez qui l'avait déjà écoutée.

   Chaque réseau dépose maintenant, à sa livraison, un `livraison.txt` qui
   porte l'empreinte de son contenu. On les ramasse — sans liste à tenir,
   pour les mêmes raisons que ci-dessus. */
function livraisonsDesReseaux() {
  try {
    return readdirSync(RACINE, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name + "/livraison.txt")
      .filter((f) => existsSync(resolve(RACINE, f)))
      .sort();
  } catch (e) { return []; }
}

/* Les `?v=<hash>` et le VERSION du service worker sont remplacés par un
   marqueur fixe : deux fichiers qui ne diffèrent que par le hash déjà écrit
   doivent donner le MÊME hash, sinon le calcul ne converge jamais. */
function sansHash(txt) {
  return txt.replace(/\?v=[0-9a-f]{10}\b/g, "?v=@@")
            .replace(/"[0-9a-f]{10}"/g, '"@@"');
}

export function calculerVersion() {
  const h = createHash("sha256");
  for (const f of FICHIERS_SOURCES.concat(pagesRacine(), livraisonsDesReseaux())) {
    const p = resolve(RACINE, f);
    if (existsSync(p)) h.update(sansHash(readFileSync(p, "utf8").replace(/\r\n/g, "\n")));
  }
  return h.digest("hex").slice(0, 10);
}
