/* ---------------------------------------------------------------------
   Les adresses imprimées dans le livre vivent-elles toujours ?

   Un QR code parti chez l'imprimeur ne peut plus changer. Si une leçon est
   renommée, si une ressource déménage, l'adresse imprimée tombe en 404 —
   en silence, et chez quelqu'un qui a payé le livre. Ce contrôle est le
   seul garde-fou : il refuse que la chaîne se termine sur une adresse morte.

   Il vérifie deux choses, pour chaque édition déclarée dans
   f/ADRESSES-GRAVEES.json (registre écrit par le livre au bon à tirer) :

     1. chaque adresse gravée a bien sa page dans f/ ;
     2. chaque ressource interne que cette page appelle existe dans le dépôt
        (la page peut exister et pointer vers un fichier disparu).

   Édition « vendue » : un défaut ARRÊTE la chaîne.
   Édition « epreuve » : un défaut avertit — le tirage n'est pas encore parti.

   Lancé par build/build.mjs, et par « npm run adresses ».
   --------------------------------------------------------------------- */
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "..");
const REGISTRE = resolve(RACINE, "f", "ADRESSES-GRAVEES.json");

if (!existsSync(REGISTRE)) {
  console.log("  (aucune adresse gravée déclarée : contrôle sans objet)");
  process.exit(0);
}

const registre = JSON.parse(readFileSync(REGISTRE, "utf8"));
const editions = registre.editions || [];

/* Tout ce qu'une page appelle : redirection, lien, image, script, fetch. */
const APPELS =
  /(?:url=|href="|src="|fetch\(")\s*(https:\/\/inerweb\.fr\/[^"')\s>]*|(?!https?:|mailto:|tel:|data:|#)[^"')\s>]*)/g;

const cheminLocal = (brut) => {
  let u = brut.replace(/&amp;/g, "&").split("#")[0].split("?")[0];
  if (u.startsWith("https://inerweb.fr/")) u = u.slice("https://inerweb.fr/".length);
  else if (/^https?:/.test(u)) return null;
  try {
    u = decodeURIComponent(u);
  } catch {
    /* adresse mal encodée : on la teste telle quelle */
  }
  return u.replace(/^\/+/, "") || null;
};

const existe = (base, chemin) => {
  let p = resolve(base, chemin);
  if (existsSync(p) && statSync(p).isDirectory()) p = resolve(p, "index.html");
  return existsSync(p);
};

let bloquant = 0;
let avertissements = 0;
for (const ed of editions) {
  const slugs = ed.slugs || [];
  const dur = ed.statut === "vendue";
  const absentes = [];
  const cassees = [];

  for (const slug of slugs) {
    const page = resolve(RACINE, "f", slug, "index.html");
    if (!existsSync(page)) {
      absentes.push(slug);
      continue;
    }
    const html = readFileSync(page, "utf8");
    const vus = new Set();
    for (const m of html.matchAll(APPELS)) {
      const c = cheminLocal(m[1]);
      if (!c || vus.has(c)) continue;
      vus.add(c);
      const absolu = m[1].startsWith("https://inerweb.fr/") || m[1].startsWith("/");
      if (!existe(absolu ? RACINE : dirname(page), c)) cassees.push(`${slug} → ${c}`);
    }
  }

  const titre = `  édition « ${ed.edition} » (${ed.statut}) — ${slugs.length} adresses`;
  if (!absentes.length && !cassees.length) {
    console.log(`${titre} : toutes vivantes`);
    continue;
  }
  console.log(titre);
  if (absentes.length) {
    console.log(`    ${absentes.length} adresse(s) SANS PAGE : ${absentes.slice(0, 12).join(", ")}`);
  }
  if (cassees.length) {
    console.log(`    ${cassees.length} ressource(s) appelée(s) et absente(s) :`);
    cassees.slice(0, 12).forEach((c) => console.log(`      ${c}`));
  }
  if (dur) bloquant += absentes.length + cassees.length;
  else {
    avertissements += absentes.length + cassees.length;
    console.log("    (édition encore à l'épreuve : avertissement, la chaîne continue)");
  }
}

if (bloquant) {
  console.error(
    `\n✗ ${bloquant} défaut(s) sur des adresses DÉJÀ VENDUES. ` +
      `Une adresse imprimée ne se supprime pas : elle se redirige.`
  );
  process.exit(1);
}
console.log(
  avertissements
    ? `⚠ adresses gravées : ${avertissements} défaut(s) à réparer avant le bon à tirer`
    : "✓ adresses gravées : contrôle passé"
);
