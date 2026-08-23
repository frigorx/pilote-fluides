/* =====================================================================
   version.mjs — casse le cache du navigateur sur les pages écrites à la main
   ---------------------------------------------------------------------
   Voir build/lib-version.mjs pour le POURQUOI. Ce fichier fait le travail :
   il suffixe `?v=<hash>` sur chaque référence locale (script, feuille de
   style) des pages qui ne sont PAS déjà régénérées en entier à chaque
   build (galerie.html et matrice.html le sont déjà par leur propre
   script — ils appellent `calculerVersion()` eux-mêmes, voir galerie.mjs).

   Idempotent : un `?v=...` déjà présent est remplacé, pas empilé. Lancer
   ce script deux fois de suite sans rien changer produit un fichier
   strictement identique.

   Usage : node build/version.mjs   (lancé aussi par build.mjs, en dernier —
   après que tout le reste a fini d'écrire, pour que le hash reflète
   vraiment l'état final du build)
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { calculerVersion } from "./lib-version.mjs";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Chaque nom, tel qu'il apparaît entre guillemets — dans un attribut
   src=/href= ou dans un tableau JavaScript (Portillon.exiger(...)), peu
   importe : dans les deux cas c'est une chaîne entre guillemets. */
const FICHIERS_VERSIONNES = [
  "packs/fluides/pack.eleve.js",
  "packs/fluides/pack.pilote.js",
  "packs/fluides/sons.js",
  "packs/fluides/projection.gen.js",
  "config.js",
  "chiffres.gen.js",
  "plan-descriptions.gen.js",
  "moteur/charte-edu.css",
  "moteur/impression.css",
  "moteur/lisibilite.js",
  "moteur/marque.js",
  "moteur/illustration.js",
  "moteur/moteur.js",
  "moteur/sons.js",
  "moteur/lecture.js",
  "moteur/portillon.js",
];

// Les pages générées (galerie, matrice, planning, relecture) sont incluses :
// version.mjs passe APRÈS leurs générateurs dans build.mjs. Sans elles, une
// correction de charte-edu.css ou d'impression.css resterait invisible sur
// ces pages tant que le navigateur garde l'ancienne feuille en cache.
const PAGES = [
  "index.html", "formateur.html", "projection.html", "portail.html", "dossier.html",
  "charte.html", "galerie.html", "matrice.html", "planning.html", "relecture.html",
  "pratique.html", "partage.html",
  // 19/08/2026 — le site vitrine : l'accueil est devenu index.html, l'appli
  // de formation a déménagé sur formation.html, et deux pages l'accompagnent.
  "formation.html", "metier.html", "formateurs.html",
  // 20/08/2026 — la page de secours du service worker (aucune référence
  // versionnée dedans, présente ici pour la règle « toute page HTML
  // nouvelle entre dans PAGES »).
  "hors-ligne.html",
  // 20/08/2026 (durcissement) — la vraie page 404 et le brouillon des
  // mentions légales (non lié tant que non validé).
  "404.html", "mentions.html",
];
// 23/08/2026 — legislation/index.html n'entre PAS dans PAGES : le réseau
// Législation est un SATELLITE (décision F. Henninot : « presque un autre
// site ») — il charge lisibilite.js et marque.js en absolu depuis
// https://inerweb.fr/moteur/, comme sous-tension et le travail en hauteur.

function echapper(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function versionner(html, version) {
  let n = 0;
  for (const f of FICHIERS_VERSIONNES) {
    const re = new RegExp('(["\'])' + echapper(f) + '(?:\\?v=[0-9a-f]+)?(["\'])', "g");
    html = html.replace(re, (m, q1, q2) => { n++; return q1 + f + "?v=" + version + q2; });
  }
  return { html, n };
}

const version = calculerVersion();
let total = 0;
for (const page of PAGES) {
  const chemin = resolve(RACINE, page);
  if (!existsSync(chemin)) continue;
  const avant = readFileSync(chemin, "utf8");
  const { html, n } = versionner(avant, version);
  if (html !== avant) writeFileSync(chemin, html, "utf8");
  total += n;
}

/* Le service worker suit le même numéro : chaque build qui change moteur
   ou contenu active un cache neuf chez les visiteurs (sa constante VERSION
   n'est JAMAIS éditée à la main — voir l'en-tête de sw.js). */
const sw = resolve(RACINE, "sw.js");
if (existsSync(sw)) {
  const avant = readFileSync(sw, "utf8");
  const apres = avant.replace(/const VERSION = "[0-9a-f]*";/, 'const VERSION = "' + version + '";');
  if (apres !== avant) writeFileSync(sw, apres, "utf8");
}

console.log("  version : " + version + " — " + total + " référence(s) datée(s) sur " + PAGES.length + " page(s) + sw.js");
