/* =====================================================================
   audit-conformite.mjs — état global, relevé depuis les sources
   ---------------------------------------------------------------------
   Ce contrôle ne remplace ni une relecture métier, ni un essai visuel.
   Il rend visibles les dettes qui se perdaient jusque-là dans REPRISE.md :
   autonomie, métadonnées, charte, impression, lisibilité et droits médias.

   SORTIE   AUDIT-CONFORMITE.md
   USAGE    node build/audit-conformite.mjs
   ===================================================================== */
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RES = resolve(RACINE, "packs/fluides/res");
const DOSSIERS_HORS_COURS = new Set(["bibliotheque", "outils", "photos", "svg"]);
const EXT_RUNTIME = new Set([".html", ".css", ".js"]);
const EXT_MEDIA = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

const lire = (fichier) => readFileSync(fichier, "utf8");
const oui = (condition) => condition ? "✓" : "✗";
const echapperTable = (valeur) => String(valeur || "—").replaceAll("|", "\\|").replaceAll("\n", " ");

function fichiers(dossier) {
  const resultat = [];
  for (const entree of readdirSync(dossier, { withFileTypes: true })) {
    const chemin = resolve(dossier, entree.name);
    if (entree.isDirectory()) resultat.push(...fichiers(chemin));
    else resultat.push(chemin);
  }
  return resultat;
}

function pageRacine(dossier) {
  const html = readdirSync(dossier)
    .filter((nom) => nom.endsWith(".html"))
    .sort();
  if (!html.length) return null;
  return resolve(dossier, html.includes("index.html") ? "index.html" : html[0]);
}

function declarationsSerif(texte) {
  const declarations = texte.match(/font(?:-family)?\s*:[^;{}]+/gi) || [];
  return declarations.filter((declaration) =>
    /\bGeorgia\b|\bTimes(?: New Roman)?\b/i.test(declaration) ||
    /(^|,)\s*["']?serif["']?\s*$/i.test(declaration.replace(/^.*?:/, ""))
  );
}

function dependancesExternes(texte) {
  const balises = texte.match(/<(?:script|img|iframe|object|link|source|audio|video)\b[^>]*>/gi) || [];
  return balises.filter((balise) => {
    /* Un canonical indique l'adresse publique de la page : il ne charge
       aucune ressource et ne rompt donc pas le fonctionnement hors ligne. */
    if (/^<link\b/i.test(balise) && /\brel\s*=\s*["']canonical["']/i.test(balise)) return false;
    return /\b(?:src|href|data)\s*=\s*["']https?:\/\//i.test(balise);
  }).length;
}

function imagesSansAlt(html) {
  return (html.match(/<img\b[^>]*>/gi) || [])
    .filter((balise) => !/\balt\s*=\s*["'][^"']*["']/i.test(balise));
}

function auditerCours(nom) {
  const dossier = resolve(RES, nom);
  const page = pageRacine(dossier);
  if (!page) return null;

  const tous = fichiers(dossier);
  const runtime = tous.filter((f) => EXT_RUNTIME.has(extname(f).toLowerCase()));
  const media = tous.filter((f) => EXT_MEDIA.has(extname(f).toLowerCase()));
  const texte = runtime.map(lire).join("\n");
  /* Deux anomalies critiques se cherchent par motif : le fond forcé à
     l'impression et le thème sombre. Or `moteur/impression.css` porte en tête
     la MISE EN GARDE « ne jamais écrire print-color-adjust:exact », et tout
     cours qui embarque correctement cette feuille héritait donc d'un rouge.
     Un faux rouge à côté d'un vrai — film-ozone et film-effet-de-serre en ont
     un authentique — rend le tableau illisible pour un auditeur : il ne sait
     plus lequel croire. On cherche donc ces deux motifs dans le code seul.
     Une déclaration active n'est jamais dans un commentaire. */
  const codeActif = texte
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
  const html = lire(page);
  const titre = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim() || "";
  const description = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)/i) || [])[1] || "";
  const langue = (html.match(/<html[^>]*\blang=["']([^"']+)/i) || [])[1] || "";
  const registreImages = tous.some((f) => /[\\/]SOURCES-IMAGES\.md$/i.test(f));
  const lisibiliteCommune = /moteur\/lisibilite\.js/i.test(texte);
  const lisibiliteLocale = /id=["']readability["']|large-text|font-large/i.test(texte);
  const impression = /@media\s+print/i.test(texte) || /impression\.css/i.test(texte);
  const serif = declarationsSerif(texte);
  const externes = dependancesExternes(texte);
  const sansAlt = imagesSansAlt(html);
  const themeSombre = /prefers-color-scheme\s*:\s*dark/i.test(codeActif);
  const impressionForcee = /(?:-webkit-)?print-color-adjust\s*:\s*exact/i.test(codeActif);
  const ancienFond = (texte.match(/#eef2f6/gi) || []).length;
  const ancienTerme = (texte.match(/module interactif/gi) || []).length;

  const critiques = [];
  const dettes = [];
  if (langue !== "fr") critiques.push("langue HTML");
  if (!titre) critiques.push("titre");
  if (!description) critiques.push("description");
  if (externes) critiques.push(`${externes} dépendance(s) distante(s)`);
  if (serif.length) critiques.push("police serif");
  if (themeSombre) critiques.push("thème sombre automatique");
  if (impressionForcee) critiques.push("fonds forcés à l’impression");
  if (!impression) dettes.push("impression");
  if (!lisibiliteCommune && !lisibiliteLocale) dettes.push("réglage de lisibilité");
  if (media.length && !registreImages) dettes.push("SOURCES-IMAGES.md");
  if (sansAlt.length) dettes.push(`${sansAlt.length} image(s) sans alt`);
  if (ancienFond) dettes.push(`ancien fond #EEF2F6 (${ancienFond})`);
  if (ancienTerme) dettes.push(`ancien terme « module interactif » (${ancienTerme})`);

  return {
    nom,
    titre,
    langue,
    description: Boolean(description),
    media: media.length,
    registreImages,
    impression,
    lisibilite: lisibiliteCommune ? "commune" : lisibiliteLocale ? "locale" : "absente",
    externes,
    serif: serif.length,
    sansAlt: sansAlt.length,
    ancienFond,
    ancienTerme,
    critiques,
    dettes,
  };
}

function auditerSvg() {
  const dossier = resolve(RES, "svg");
  return readdirSync(dossier)
    .filter((nom) => nom.endsWith(".svg"))
    .sort()
    .map((nom) => {
      const texte = lire(resolve(dossier, nom));
      return {
        nom,
        titre: /<title>[\s\S]*?<\/title>/i.test(texte),
        description: /<desc>[\s\S]*?<\/desc>/i.test(texte),
      };
    });
}

const cours = readdirSync(RES, { withFileTypes: true })
  .filter((entree) => entree.isDirectory() && !DOSSIERS_HORS_COURS.has(entree.name))
  .map((entree) => auditerCours(entree.name))
  .filter(Boolean)
  .sort((a, b) => a.nom.localeCompare(b.nom));

const svg = auditerSvg();
const critiques = cours.filter((c) => c.critiques.length);
const avecDettes = cours.filter((c) => c.dettes.length);
const mediasSansRegistre = cours.filter((c) => c.media && !c.registreImages);
const svgSansTitre = svg.filter((s) => !s.titre);
const svgSansDescription = svg.filter((s) => !s.description);

const lignes = [];
lignes.push("# Audit global de conformité — Pilote Fluides");
lignes.push("");
lignes.push("> Fichier généré par `node build/audit-conformite.mjs` — ne pas éditer à la main.");
lignes.push("> Il contrôle les sources statiques. Il ne remplace ni la relecture métier par un frigoriste, ni les essais visuels et interactifs.");
lignes.push("");
lignes.push("## En un coup d’œil");
lignes.push("");
lignes.push("| Mesure | Résultat |");
lignes.push("|---|---:|");
lignes.push(`| Cours interactifs recensés | **${cours.length}** |`);
lignes.push(`| Cours avec anomalie critique automatisable | **${critiques.length}** |`);
lignes.push(`| Cours avec dette documentaire ou de reprise | **${avecDettes.length}** |`);
lignes.push(`| Cours contenant des médias sans \`SOURCES-IMAGES.md\` | **${mediasSansRegistre.length}** |`);
lignes.push(`| SVG pédagogiques contrôlés | **${svg.length}** |`);
lignes.push(`| SVG sans titre / sans description textuelle | **${svgSansTitre.length} / ${svgSansDescription.length}** |`);
lignes.push("");
lignes.push("## Contrôle des cours interactifs");
lignes.push("");
lignes.push("| Cours | HTML | Hors ligne | Typo | Impression | Lisibilité | Médias | Registre droits | État |");
lignes.push("|---|---|---|---|---|---|---:|---|---|");
for (const c of cours) {
  const htmlOk = c.langue === "fr" && c.description && c.titre;
  const etat = c.critiques.length
    ? `🔴 ${c.critiques.join(", ")}`
    : c.dettes.length
      ? `🟠 ${c.dettes.join(", ")}`
      : "🟢 contrôle statique tenu";
  lignes.push(
    `| \`${c.nom}\` | ${oui(htmlOk)} | ${oui(c.externes === 0)} | ${oui(c.serif === 0)} | ${oui(c.impression)} | ${echapperTable(c.lisibilite)} | ${c.media || "—"} | ${c.media ? oui(c.registreImages) : "—"} | ${echapperTable(etat)} |`
  );
}

lignes.push("");
lignes.push("## Titres et descriptions des SVG");
lignes.push("");
if (!svgSansTitre.length && !svgSansDescription.length) {
  lignes.push("Tous les SVG portent un `<title>` et un `<desc>` indexables.");
} else {
  if (svgSansTitre.length)
    lignes.push(`- Sans titre : ${svgSansTitre.map((s) => `\`${s.nom}\``).join(", ")}.`);
  if (svgSansDescription.length)
    lignes.push(`- Sans description : ${svgSansDescription.map((s) => `\`${s.nom}\``).join(", ")}.`);
}

lignes.push("");
lignes.push("## Ce que cet audit ne valide pas");
lignes.push("");
lignes.push("- l’exactitude scientifique, réglementaire ou sécuritaire du contenu ;");
lignes.push("- les droits d’un média simplement parce qu’un fichier de registre existe ;");
lignes.push("- le déroulé réel d’une animation, la qualité de la voix ou le fonctionnement d’un quiz ;");
lignes.push("- l’absence de défilement et de contenu coupé aux quatre formats cibles ;");
lignes.push("- la conformité WCAG complète.");
lignes.push("");
lignes.push("Ces points restent couverts par la relecture métier, le registre des droits renseigné sur preuve et les essais navigateur.");
lignes.push("");

writeFileSync(resolve(RACINE, "AUDIT-CONFORMITE.md"), lignes.join("\n"), "utf8");

console.log(
  `audit conformité : ${cours.length} cours · ${critiques.length} critique(s) · ` +
  `${avecDettes.length} avec dette(s) · ${svgSansDescription.length} SVG sans description`
);
console.log("→ AUDIT-CONFORMITE.md");
