/* =====================================================================
   plan-liste.mjs — le réseau EN LISTE + le JSON-LD, depuis LA donnée du plan
   ---------------------------------------------------------------------
   POURQUOI : le plan de métro est un SVG construit en JavaScript — sans JS,
   au lecteur d'écran ou pour un robot d'indexation, il n'existe pas. Cette
   page doit rester utilisable et compréhensible sans lui (durcissement du
   20/08/2026). Et une seconde liste TENUE À LA MAIN divergerait au premier
   cours ajouté : celle-ci est donc EXTRAITE du bloc de données du plan
   (sentinelles DONNEES-PLAN dans index.html) et injectée en HTML statique
   (sentinelles LISTE-PLAN), avec le JSON-LD WebSite + ItemList
   (sentinelles JSON-LD).

   ENTRÉE   index.html (bloc DONNEES-PLAN)
   SORTIE   index.html (blocs LISTE-PLAN et JSON-LD réécrits, idempotent)
   USAGE    node build/plan-liste.mjs   (lancé aussi par build.mjs, AVANT
            version.mjs)
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CHEMIN = resolve(RACINE, "index.html");
const SITE = "https://inerweb.fr/";

let html = readFileSync(CHEMIN, "utf8");

/* ---- 1. La donnée du plan, extraite et évaluée ---- */
const mDonnees = html.match(
  /\/\* DONNEES-PLAN — DEBUT[\s\S]*?\*\/([\s\S]*?)\/\* DONNEES-PLAN — FIN \*\//
);
if (!mDonnees) {
  console.error("✗ plan-liste : sentinelles DONNEES-PLAN introuvables dans index.html");
  process.exit(1);
}
const D = new Function(
  mDonnees[1] +
  /* HUILE et HUILE_CIRCUIT manquaient : dix-sept stations du plan n'ont
     jamais figuré dans la liste du réseau ni dans son JSON-LD. Trouvé le
     20/08 en branchant la recherche dessus — chercher « huile » ne ramenait
     qu'un cours, et c'était « Le compresseur ». La liste se dit « la même
     donnée que le plan » : elle doit l'être. */
  "; return { TRONC: TRONC, LIGNES: LIGNES, HUILE: HUILE, HUILE_CIRCUIT: HUILE_CIRCUIT, CO2: CO2, CENTRALES: CENTRALES, CEINTURE: CEINTURE, OUTILS: OUTILS, ELECTROTECH: ELECTROTECH, CORRESPONDANCES: CORRESPONDANCES };"
)();

function esc(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---- 2. La liste HTML ---- */
function li(s) {
  const externe = /^https?:/.test(s.href);
  const nom = (s.verrou ? "🔒 " : "") + s.nom + (externe ? " ↗" : "");
  const cible = externe ? ' target="_blank" rel="noopener"' : "";
  const verrou = s.verrou ? " — s’ouvre avec la phrase d’accès donnée en formation" : "";
  return `      <li><a href="${esc(s.href)}"${cible}>${esc(nom)}</a> <span class="d">— ${esc(s.sous)}${verrou}</span></li>`;
}
function bloc(nom, sous, stations) {
  return [
    "    <details>",
    `      <summary>${esc(nom)} <span class="n">— ${esc(sous)} · ${stations.length} station${stations.length > 1 ? "s" : ""}</span></summary>`,
    "      <ul>",
    ...stations.map(li).map((l) => "  " + l),
    "      </ul>",
    "    </details>",
  ].join("\n");
}

const groupes = [
  ["🚉 LE TRONC", "la théorie, du départ au diagramme", D.TRONC.stations.concat(D.TRONC.queue)],
  ...D.LIGNES.map((l) => [l.nom, l.sous, l.stations]),
  [D.HUILE.nom, D.HUILE.sous, D.HUILE.stations],
  [D.HUILE_CIRCUIT.nom, D.HUILE_CIRCUIT.sous, D.HUILE_CIRCUIT.stations],
  [D.CO2.nom, D.CO2.sous, D.CO2.stations],
  [D.CENTRALES.nom, D.CENTRALES.sous, D.CENTRALES.stations],
  [D.ELECTROTECH.nom, D.ELECTROTECH.sous, D.ELECTROTECH.stations],
  [D.CEINTURE.nom, D.CEINTURE.sous, D.CEINTURE.stations],
  [D.OUTILS.nom, D.OUTILS.sous, D.OUTILS.stations],
  [D.CORRESPONDANCES.nom, D.CORRESPONDANCES.sous, D.CORRESPONDANCES.stations],
];
const liste = groupes.map((g) => bloc(g[0], g[1], g[2])).join("\n");

/* ---- 3. Le JSON-LD : des faits vérifiés, rien d'inventé ---- */
const toutes = groupes.flatMap((g) => g[2]);
const jsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "inerWeb Édu",
      url: SITE,
      description:
        "Le plan de formation inerWeb Édu : cours interactifs du froid et de la climatisation sur une carte de métro — théorie, organes, gestes, fluides frigorigènes, examens blancs. Gratuit, sans compte.",
      inLanguage: "fr",
    },
    {
      "@type": "ItemList",
      name: "Les stations du plan de formation",
      numberOfItems: toutes.length,
      itemListElement: toutes.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.nom,
        url: /^https?:/.test(s.href) ? s.href : SITE + s.href,
      })),
    },
  ],
};

/* ---- 4. Injection idempotente entre les sentinelles ---- */
function injecter(texte, debut, fin, contenu) {
  const re = new RegExp("(" + debut + ")[\\s\\S]*?(" + fin + ")");
  if (!re.test(texte)) {
    console.error("✗ plan-liste : sentinelles « " + debut + " » introuvables");
    process.exit(1);
  }
  return texte.replace(re, "$1\n" + contenu + "\n    $2");
}

html = injecter(html,
  "<!-- LISTE-PLAN DEBUT \\(générée par build/plan-liste\\.mjs — ne pas éditer à la main\\) -->",
  "<!-- LISTE-PLAN FIN -->",
  liste);
html = injecter(html,
  "<!-- JSON-LD DEBUT \\(généré par build/plan-liste\\.mjs — ne pas éditer à la main\\) -->",
  "<!-- JSON-LD FIN -->",
  '<script type="application/ld+json">' + JSON.stringify(jsonld) + "</script>");

writeFileSync(CHEMIN, html, "utf8");
console.log(
  "✓ plan-liste : " + groupes.length + " lignes, " + toutes.length +
  " stations en liste HTML + JSON-LD (WebSite + ItemList)"
);
