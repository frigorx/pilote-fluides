/* =====================================================================
   sitemap.mjs — le sitemap depuis une liste CONTRÔLÉE, jamais de mémoire
   ---------------------------------------------------------------------
   POURQUOI : un sitemap tenu à la main oublie les pages nouvelles et garde
   les mortes. Celui-ci part d'une liste déclarée ici, et VÉRIFIE avant
   d'écrire : le fichier existe, et il ne porte pas de noindex (une URL
   noindex dans un sitemap est une contradiction qui coûte du crawl).

   Pas de <lastmod> : les pages sont re-versionnées (?v=) à chaque build,
   une date automatique mentirait sur la fraîcheur réelle du CONTENU.

   ENTRÉE   la liste INDEXEES ci-dessous + les fichiers HTML de la racine
   SORTIE   sitemap.xml
   USAGE    node build/sitemap.mjs   (lancé aussi par build.mjs)
   ===================================================================== */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Les pages destinées aux moteurs de recherche — et seulement elles.
   · formation.html VOLONTAIREMENT absente (20/08/2026) : sa porte d'entrée
     redirige vers la frise à chaque nouvelle session — stratégie
     d'indexation à trancher par F. Henninot avant de l'y remettre.
   · galerie.html : noindex par décision (en réévaluation). */
const INDEXEES = [
  { fichier: "index.html",      url: "https://inerweb.fr/" },
  { fichier: "metier.html",     url: "https://inerweb.fr/metier.html" },
  { fichier: "formateurs.html", url: "https://inerweb.fr/formateurs.html" },
];

const lignes = [];
for (const p of INDEXEES) {
  const chemin = resolve(RACINE, p.fichier);
  if (!existsSync(chemin)) {
    console.error("✗ sitemap : " + p.fichier + " n'existe pas — retiré ou faute de frappe ?");
    process.exit(1);
  }
  const html = readFileSync(chemin, "utf8");
  if (/name="robots"[^>]*noindex/.test(html)) {
    console.error("✗ sitemap : " + p.fichier + " porte un noindex — contradiction, corriger la liste ou la page");
    process.exit(1);
  }
  lignes.push("  <url><loc>" + p.url + "</loc></url>");
}

/* Contrôle inverse : une page publique ajoutee a la racine sans y penser
   resterait hors du sitemap en silence. On ne l'ajoute PAS d'office (ce serait
   decider de l'indexation a la place de l'auteur) — on la signale. */
const listees = new Set(INDEXEES.map((p) => p.fichier));
for (const fichier of readdirSync(RACINE).filter((f) => f.endsWith(".html"))) {
  if (listees.has(fichier)) continue;
  const html = readFileSync(resolve(RACINE, fichier), "utf8");
  if (/name="robots"[^>]*noindex/.test(html)) continue;
  console.warn("⚠ sitemap : " + fichier + " n'est ni dans la liste ni en noindex — a trancher");
}

writeFileSync(
  resolve(RACINE, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  "<!-- Fichier GÉNÉRÉ par build/sitemap.mjs — la liste des pages indexables\n" +
  "     se modifie LÀ-BAS, jamais ici. -->\n" +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  lignes.join("\n") + "\n</urlset>\n",
  "utf8"
);
console.log("✓ sitemap.xml — " + lignes.length + " URL, toutes vérifiées (existence + absence de noindex)");
