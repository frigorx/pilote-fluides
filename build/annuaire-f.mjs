/* ---------------------------------------------------------------------
   L'annuaire des renvois du livre — f/index.html

   Un lecteur qui ne peut pas scanner tape l'adresse sous le QR. S'il se
   trompe d'un caractere, il tombe sur la 404 du site, qui le renvoie ici :
   toutes les adresses imprimees, en clair, groupees comme le livre.

   La page se fabrique a partir des dossiers f/ reellement presents et de
   la table des chapitres portee par f/examen-blanc/index.html (relevee du
   tirage imprime) : rien n'est saisi a la main, rien ne peut deriver.

   Lance par build/build.mjs.
   --------------------------------------------------------------------- */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "..");
const DOSSIER_F = resolve(RACINE, "f");

if (!existsSync(DOSSIER_F)) {
  console.log("  (pas de dossier f/ : annuaire non genere)");
  process.exit(0);
}

const alias = readdirSync(DOSSIER_F)
  .filter((n) => statSync(resolve(DOSSIER_F, n)).isDirectory())
  .filter((n) => existsSync(resolve(DOSSIER_F, n, "index.html")))
  .sort();

const titreDe = (slug) => {
  const t = readFileSync(resolve(DOSSIER_F, slug, "index.html"), "utf8");
  const m = t.match(/<title>([^<]*)<\/title>/);
  if (!m) return slug;
  return m[1].replace(/\s*[—-]\s*inerWeb HabFluide\s*$/i, "").trim();
};

/* La table des chapitres vit dans la page de l'examen blanc : elle porte
   le numero, le titre, le slug et les pages du livre. */
let CHS = [];
const pageExamen = resolve(DOSSIER_F, "examen-blanc", "index.html");
if (existsSync(pageExamen)) {
  const m = readFileSync(pageExamen, "utf8").match(/var CHS\s*=\s*(\[[\s\S]*?\]);/);
  if (m) CHS = JSON.parse(m[1]);
}

const ech = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pris = new Set();
const prendre = (s) => (pris.add(s), s);

/* --- les chapitres : leur page, leurs lecons, leur QCM ---------------- */
const chapitres = CHS.map((ch) => {
  const racine = ch.qr;
  const lecons = alias
    .filter((a) => a === racine || new RegExp(`^${racine}-\\d+$`).test(a))
    .sort((a, b) => {
      const n = (x) => (x === racine ? 0 : Number(x.split("-").pop()));
      return n(a) - n(b);
    });
  const qcm = alias.filter((a) => a === `q-${racine}`);
  [...lecons, ...qcm].forEach(prendre);
  return { ch, lecons, qcm };
}).filter((c) => c.lecons.length || c.qcm.length);

const series = alias.filter((a) => /^rev-/.test(a)).map(prendre);
const parcours = ["positionnement", "examen-blanc", "mes-resultats"]
  .filter((a) => alias.includes(a))
  .map(prendre);
const animations = alias.filter((a) => /^a-/.test(a)).map(prendre);
const autres = alias.filter((a) => !pris.has(a));

/* --- la page ---------------------------------------------------------- */
const ligne = (slug) =>
  `<li><a href="https://inerweb.fr/f/${ech(slug)}">${ech(titreDe(slug))}</a>` +
  `<code>inerweb.fr/f/${ech(slug)}</code></li>`;

const bloc = (titre, liste, note) =>
  !liste.length
    ? ""
    : `<section><h2>${ech(titre)}</h2>` +
      (note ? `<p class="note">${note}</p>` : "") +
      `<ul class="liens">${liste.map(ligne).join("")}</ul></section>`;

const blocsChapitres = chapitres
  .map(({ ch, lecons, qcm }) => {
    const pages = ch.p ? ` <span class="pages">p.&nbsp;${ch.p[0]}&nbsp;à&nbsp;${ch.p[1]}</span>` : "";
    return (
      `<section><h2>${ch.n}. ${ech(ch.t)}${pages}</h2>` +
      `<ul class="liens">${[...lecons, ...qcm].map(ligne).join("")}</ul></section>`
    );
  })
  .join("\n");

const HTML = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Toutes les adresses du livre — inerWeb HabFluide</title>
<style>
:root{--bleu:#1b3a63;--orange:#ff6b35;--mut:#5a6472;--ligne:#d6dee7;--pale:#f4f7fa}
body{font-family:Calibri,Carlito,'Segoe UI',sans-serif;color:var(--bleu);
  background:var(--pale);margin:0;line-height:1.55}
header{background:#fff;border-bottom:2px solid var(--orange);padding:8px 16px;
  display:flex;align-items:center;gap:10px}
header svg{display:block;height:26px;width:auto;flex:none}
header .sous{color:var(--mut);font-weight:700;font-size:.95rem}
main{max-width:900px;margin:0 auto;padding:18px 16px 60px}
h1{font-size:1.35rem;margin:10px 0 6px}
.chapeau{background:#fff;border-left:3px solid var(--orange);border-radius:8px;
  padding:12px 16px;margin:0 0 22px}
section{background:#fff;border:1px solid var(--ligne);border-radius:10px;
  padding:12px 16px;margin:0 0 14px}
h2{font-size:1.05rem;margin:2px 0 8px;color:var(--bleu)}
.pages{font-weight:400;color:var(--mut);font-size:.9rem}
.note{color:var(--mut);font-size:.92rem;margin:0 0 8px}
ul.liens{list-style:none;margin:0;padding:0}
ul.liens li{border-top:1px solid var(--ligne);padding:7px 0;
  display:flex;flex-wrap:wrap;gap:4px 14px;align-items:baseline}
ul.liens li:first-child{border-top:none}
ul.liens a{color:var(--bleu);font-weight:600;text-decoration:none}
ul.liens a:hover,ul.liens a:focus{text-decoration:underline}
ul.liens code{font-size:.88rem;color:var(--mut);font-family:Consolas,monospace}
footer{color:var(--mut);font-size:.85rem;text-align:center;padding:14px 16px 30px}
footer a{color:var(--mut)}
</style>
</head>
<body>
<header><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243.2 50" role="img" aria-label="inerWeb HabFluide">
<text fill="#1b3a63" font-size="30px" x="2" y="36">&#10052;</text>
<text fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif" font-size="26px" font-weight="bold" x="44" y="32">iner</text>
<text fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive" font-size="26px" x="94" y="32">Web</text>
<line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"></line>
<rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="84.2" height="24"></rect>
<text fill="#ffffff" font-family="Segoe UI, Carlito, Calibri, Helvetica, sans-serif" font-size="14px" font-weight="bold" x="197.1" y="27" text-anchor="middle">HabFluide</text>
</svg><span class="sous">&mdash; toutes les adresses</span></header>
<main>
<h1>Toutes les adresses du livre</h1>
<div class="chapeau">
<p>Chaque QR du livre porte son adresse &eacute;crite en dessous. Si le code ne
scanne pas, ou si vous vous &ecirc;tes tromp&eacute; d&rsquo;un caract&egrave;re en la tapant,
retrouvez-la ici : <b>${alias.length} adresses</b>, group&eacute;es comme le livre.</p>
<p class="note">Une adresse imprim&eacute;e ne change jamais. Si une ressource
d&eacute;m&eacute;nage, c&rsquo;est l&rsquo;adresse qui suit &mdash; pas &agrave; vous de la corriger.</p>
</div>

<section><h2>Par o&ugrave; commencer</h2>
<ul class="liens">${parcours.map(ligne).join("")}</ul></section>

${blocsChapitres}

${bloc("Les séries de révision", series, "Une série par groupe de compétences du référentiel.")}
${bloc("Les planches et animations", animations, "Chaque planche du livre, en grand sur l’écran.")}
${bloc("Autres pages", autres)}
</main>
<footer>Du livre &laquo;&nbsp;inerWeb HabFluide &mdash; la th&eacute;orie&nbsp;&raquo; &middot;
<a href="https://inerweb.fr/">inerweb.fr</a></footer>
</body>
</html>
`;

writeFileSync(resolve(DOSSIER_F, "index.html"), HTML, "utf8");
console.log(
  `✓ f/index.html — annuaire de ${alias.length} adresses ` +
    `(${chapitres.length} chapitres, ${animations.length} planches, ${series.length} séries)`
);
