/* =====================================================================
   fiches-a-valider.mjs — publie les fonds de station à relire
   ---------------------------------------------------------------------
   POURQUOI. F. Henninot valide en mobilité, depuis son téléphone. Un
   chemin de fichier Windows n'est pas cliquable là où il se trouve, et
   un lien claude.ai lui demande une connexion à son compte : il ne
   pouvait donc pas accéder aux fiches. Sa demande du 24/08 : « un
   système simple et efficace ». Le plus simple qui existe déjà, c'est
   SON site — il y va sans compte, depuis n'importe quel appareil.

   CE QUE FAIT CE SCRIPT. Il relève chaque `stations/<slug>/FOND.md`,
   le convertit en HTML à la charte, et écrit `legislation/a-valider.html`.
   Une fiche de plus apparaît donc sans toucher une ligne de code, et les
   deux ne peuvent pas diverger : la page EST le fond, pas sa recopie.

   Une fiche déjà produite (la station a un index.html) est marquée
   « produite » et passe en fin de liste : ce qui attend un feu vert
   reste en tête.

   La page est en `noindex` : c'est un document de travail.

   Usage : node legislation/outils/fiches-a-valider.mjs
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "..");            // legislation/
const STATIONS = join(RACINE, "stations");
const SORTIE = join(RACINE, "a-valider.html");

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Conversion Markdown → HTML, limitée à ce que les fonds emploient
   réellement : titres, gras, italique, code, listes, tableaux, citations,
   séparateurs. Volontairement minimal — pas de bibliothèque tierce à
   charger, la page doit rester autonome. L'échappement se fait AVANT le
   balisage, sinon un `<` du texte casserait le rendu. */
function ligneEnrichie(t) {
  return esc(t)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[\s(«])\*([^*]+)\*/g, "$1<i>$2</i>");
}

function md2html(md) {
  const out = [];
  const lignes = md.split(/\r?\n/);
  let dansListe = null, dansTableau = false, dansCitation = false;

  const fermeListe = () => { if (dansListe) { out.push(`</${dansListe}>`); dansListe = null; } };
  const fermeTableau = () => { if (dansTableau) { out.push("</tbody></table></div>"); dansTableau = false; } };
  const fermeCitation = () => { if (dansCitation) { out.push("</blockquote>"); dansCitation = false; } };
  const fermeTout = () => { fermeListe(); fermeTableau(); fermeCitation(); };

  for (let i = 0; i < lignes.length; i++) {
    const l = lignes[i];
    const vide = !l.trim();

    if (vide) { fermeListe(); fermeTableau(); fermeCitation(); continue; }

    /* Séparateur */
    if (/^---+$/.test(l.trim())) { fermeTout(); out.push("<hr>"); continue; }

    /* Titres */
    const t = /^(#{1,4})\s+(.*)$/.exec(l);
    if (t) {
      fermeTout();
      const n = t[1].length + 1;                    // # → h2, ## → h3…
      out.push(`<h${n}>${ligneEnrichie(t[2])}</h${n}>`);
      continue;
    }

    /* Citation (les fonds y mettent le statut et les sources) */
    if (/^>\s?/.test(l)) {
      fermeListe(); fermeTableau();
      if (!dansCitation) { out.push("<blockquote>"); dansCitation = true; }
      out.push(`<p>${ligneEnrichie(l.replace(/^>\s?/, ""))}</p>`);
      continue;
    }
    fermeCitation();

    /* Tableau */
    if (l.includes("|") && /^\s*\|/.test(l)) {
      const cases = l.split("|").slice(1, -1).map((c) => c.trim());
      if (/^[\s|:-]+$/.test(l)) continue;           // ligne de séparation
      if (!dansTableau) {
        fermeListe();
        out.push('<div class="defilant"><table><thead><tr>' +
          cases.map((c) => `<th>${ligneEnrichie(c)}</th>`).join("") +
          "</tr></thead><tbody>");
        dansTableau = true;
      } else {
        out.push("<tr>" + cases.map((c) => `<td>${ligneEnrichie(c)}</td>`).join("") + "</tr>");
      }
      continue;
    }
    fermeTableau();

    /* Listes — les réponses de quiz commencent par « - a) », on les garde
       telles quelles : la lettre fait partie de ce qui doit être relu. */
    const puce = /^\s*[-*]\s+(.*)$/.exec(l);
    const num = /^\s*\d+\.\s+(.*)$/.exec(l);
    if (puce || num) {
      const type = puce ? "ul" : "ol";
      if (dansListe && dansListe !== type) fermeListe();
      if (!dansListe) { out.push(`<${type}>`); dansListe = type; }
      /* Un item peut courir sur plusieurs lignes (les réponses de quiz le
         font souvent) : on absorbe les lignes indentées qui suivent, sinon
         la fin de la réponse — et le ✔ qui la marque — tomberait dans un
         paragraphe séparé. */
      let txt = (puce ? puce[1] : num[1]);
      while (i + 1 < lignes.length && /^\s{2,}\S/.test(lignes[i + 1]) &&
             !/^\s*([-*]|\d+\.)\s/.test(lignes[i + 1])) {
        txt += " " + lignes[i + 1].trim();
        i++;
      }
      const bonne = /✔/.test(txt);
      out.push(`<li${bonne ? ' class="bonne"' : ""}>${ligneEnrichie(txt)}</li>`);
      continue;
    }
    fermeListe();

    out.push(`<p>${ligneEnrichie(l)}</p>`);
  }
  fermeTout();
  return out.join("\n");
}

/* --- Relevé des fiches ------------------------------------------------ */
const fiches = [];
for (const slug of readdirSync(STATIONS)) {
  const dossier = join(STATIONS, slug);
  if (!statSync(dossier).isDirectory()) continue;
  const fond = join(dossier, "FOND.md");
  if (!existsSync(fond)) continue;
  const md = readFileSync(fond, "utf8");
  const titre = (/^#\s+(.*)$/m.exec(md) || [, slug])[1]
    .replace(/^Station\s+/i, "").replace(/\s*—.*$/, "").replace(/[«»]/g, "").trim();
  fiches.push({
    slug, titre, corps: md2html(md),
    produite: existsSync(join(dossier, "index.html")),
    ecrans: (md.match(/^##\s+Écran/gm) || []).length,
    questions: (md.match(/^\*\*Q\d+\.\*\*/gm) || []).length,
  });
}
/* Ce qui attend un feu vert d'abord : c'est ce qu'on vient chercher. */
fiches.sort((a, b) => (a.produite === b.produite ? a.titre.localeCompare(b.titre, "fr") : a.produite ? 1 : -1));
const enAttente = fiches.filter((f) => !f.produite);

/* --- La page ---------------------------------------------------------- */
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219 50" width="140" height="32" role="img" aria-label="inerWeb Édu">
<text fill="#1b3a63" font-size="28px" x="4" y="34">&#10052;&#65039;</text>
<text fill="#1b3a63" font-family="Trebuchet MS, sans-serif" font-size="26px" font-weight="bold" x="44" y="32">iner</text>
<text fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive" font-size="26px" x="94" y="32">Web</text>
<line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"></line>
<rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="59" height="24"></rect>
<text fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="14px" font-weight="bold" x="184.5" y="27" text-anchor="middle">Édu</text></svg>`;

const sommaire = fiches.map((f) =>
  `<li><a href="#${esc(f.slug)}">${esc(f.titre)}</a>` +
  `<span class="s-det">${f.ecrans} écrans · ${f.questions} questions — ` +
  (f.produite ? "déjà produite" : "<b>à valider</b>") + "</span></li>").join("\n");

const corps = fiches.map((f) => `
<section class="fiche${f.produite ? " faite" : ""}" id="${esc(f.slug)}">
  <p class="f-etat">${f.produite ? "✓ Station déjà produite — relecture libre"
                                 : "⏳ En attente de ton feu vert"}</p>
  ${f.corps}
  <p class="f-retour"><a href="#haut">↑ Revenir à la liste</a></p>
</section>`).join("\n");

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="https://inerweb.fr/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#1b3a63">
<title>Fiches à valider — réseau Législation</title>
<meta name="robots" content="noindex">
<!-- PAGE GÉNÉRÉE par legislation/outils/fiches-a-valider.mjs — ne pas
     éditer à la main : le prochain passage écraserait la correction.
     La matière vient des FOND.md des stations, qui font foi. -->
<style>
  :root { --bleu:#1b3a63; --bleu-clair:#2f5689; --orange:#ff6b35;
          --txt:#10233c; --mut:#5a6b7d; --fond:#f4ece0; --carte:#fffdf8; --ligne:#d6dee7;
          --ok:#1e7e54; --ok-bg:#e3f5ec; --att:#b06a00; --att-bg:#fbf1de;
          --r:14px; --ombre:0 2px 10px rgba(27,58,99,.10);
          --titre:'Trebuchet MS',Calibri,Arial,sans-serif; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--fond); color:var(--txt);
         font:17px/1.65 Calibri,'Segoe UI',system-ui,Arial,sans-serif; }
  a { color:var(--bleu-clair); }
  a:hover { color:var(--orange); }
  a:focus-visible { outline:3px solid var(--orange); outline-offset:2px; }
  .bandeau { background:var(--carte); border-bottom:1px solid var(--ligne); }
  .bandeau .dedans { max-width:900px; margin:0 auto; padding:13px 18px;
                     display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
  .bandeau .nom { font-family:var(--titre); font-weight:bold; font-size:17px; color:var(--bleu);
                  border-left:2px solid var(--ligne); padding-left:13px; }
  .bandeau .retour { margin-left:auto; font-size:14px; }
  .page { max-width:900px; margin:0 auto; padding:0 18px 60px; }
  h1 { font-family:var(--titre); font-size:29px; color:var(--bleu); margin:28px 0 8px;
       line-height:1.2; text-wrap:balance; }
  .chapo { color:var(--mut); margin:0 0 24px; max-width:62ch; }
  .sommaire { background:var(--carte); border:1px solid var(--ligne); border-left:6px solid var(--bleu);
              border-radius:var(--r); box-shadow:var(--ombre); padding:16px 22px; margin-bottom:30px; }
  .sommaire h2 { font-family:var(--titre); font-size:17px; color:var(--bleu); margin:0 0 10px; }
  .sommaire ul { margin:0; padding-left:22px; }
  .sommaire li { margin:9px 0; }
  .sommaire a { font-family:var(--titre); font-weight:bold; }
  .sommaire .s-det { display:block; font-size:13.5px; color:var(--mut); }
  .fiche { background:var(--carte); border:1px solid var(--ligne); border-radius:var(--r);
           box-shadow:var(--ombre); padding:6px 26px 22px; margin-bottom:26px; }
  .fiche.faite { opacity:.88; }
  .f-etat { display:inline-block; font-family:var(--titre); font-weight:bold; font-size:13.5px;
            border-radius:999px; padding:4px 13px; margin:18px 0 4px;
            background:var(--att-bg); color:var(--att); border:1px solid var(--att); }
  .fiche.faite .f-etat { background:var(--ok-bg); color:var(--ok); border-color:var(--ok); }
  .fiche h2 { font-family:var(--titre); font-size:24px; color:var(--bleu); margin:10px 0 6px;
              line-height:1.2; text-wrap:balance; }
  .fiche h3 { font-family:var(--titre); font-size:19px; color:var(--bleu); margin:26px 0 6px;
              padding-top:14px; border-top:1px solid var(--ligne); }
  .fiche h4 { font-family:var(--titre); font-size:16px; color:var(--txt); margin:18px 0 4px; }
  .fiche p { margin:10px 0; }
  .fiche ul, .fiche ol { margin:10px 0; padding-left:26px; }
  .fiche li { margin:6px 0; }
  .fiche li.bonne { background:var(--ok-bg); border-radius:6px; padding:2px 8px; }
  .fiche blockquote { margin:14px 0; padding:12px 18px; background:#f3f7fb;
                      border-left:5px solid var(--bleu-clair); border-radius:0 8px 8px 0; }
  .fiche blockquote p { margin:6px 0; font-size:15.5px; }
  .fiche code { font-family:Consolas,'Courier New',monospace; font-size:14.5px;
                background:var(--fond); padding:1px 6px; border-radius:4px; }
  .fiche hr { border:0; border-top:2px solid var(--ligne); margin:26px 0; }
  .defilant { overflow-x:auto; margin:14px 0; }
  table { border-collapse:collapse; width:100%; font-size:15.5px; }
  th, td { text-align:left; padding:9px 12px; border-bottom:1px solid var(--ligne); }
  th { font-family:var(--titre); color:var(--bleu); font-size:14.5px; }
  .f-retour { margin:24px 0 0; font-size:14px; }
  .pied { color:var(--mut); font-size:14px; margin-top:30px; padding-top:16px;
          border-top:1px solid var(--ligne); }
  @media print {
    body { background:#fff; font-size:12pt; }
    .bandeau, .f-retour, .sommaire { display:none; }
    .fiche { box-shadow:none; border:0; padding:0; }
  }
</style>
</head>
<body>
<div class="bandeau">
  <div class="dedans">
    <a href="./" aria-label="inerWeb Législation">${LOGO}</a>
    <span class="nom">Fiches à valider</span>
    <a class="retour" href="./">← Le réseau Législation</a>
  </div>
</div>
<div class="page" id="haut">
  <h1>${enAttente.length ? enAttente.length + " fiche" + (enAttente.length > 1 ? "s" : "") + " attend" + (enAttente.length > 1 ? "ent" : "") + " ton feu vert" : "Aucune fiche en attente"}</h1>
  <p class="chapo">Le contenu d'une station avant sa fabrication : écrans, questions,
  visuels prévus. Rien n'est produit tant que tu n'as pas dit que le fond est bon —
  corriger un texte coûte une minute, corriger une station fabriquée coûte une journée.</p>

  <div class="sommaire">
    <h2>Les fiches</h2>
    <ul>
${sommaire}
    </ul>
  </div>

${corps}

  <p class="pied">Page générée depuis les fonds des stations
  (<code>legislation/outils/fiches-a-valider.mjs</code>) — jamais saisie à la main.
  Ajouter une fiche la fait apparaître ici au prochain passage.
  Document de travail, hors des moteurs de recherche.</p>
</div>
</body>
</html>
`;

writeFileSync(SORTIE, html, "utf8");
console.log(`  a-valider.html : ${fiches.length} fiche(s), dont ${enAttente.length} en attente`);
