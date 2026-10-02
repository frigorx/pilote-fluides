/* retour-accueil.mjs — pose moteur/retour-accueil.js (logo → accueil) sur toutes
   les pages HTML publiées. Idempotent : balise déjà posée = clé ?v= mise à jour.
   Usage : node build/retour-accueil.mjs [--verifier | --inventaire]
   --inventaire : liste les pages sans aucun lien vers l'accueil (n'écrit rien). */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(RACINE, "moteur", "retour-accueil.js");
const EXCLUS = new Set(["node_modules", ".git", "docs", "tests", ".planning", "build", "outils", ".claude", "moteur", "data"]);
const VERIFIER = process.argv.includes("--verifier");
const INVENTAIRE = process.argv.includes("--inventaire");
const cle = createHash("sha1").update(readFileSync(SCRIPT)).digest("hex").slice(0, 10);

function pagesHtml(d, sortie = []) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (EXCLUS.has(e.name)) continue;
    const p = join(d, e.name);
    if (e.isDirectory()) pagesHtml(p, sortie);
    else if (e.name.endsWith(".html")) sortie.push(p);
  }
  return sortie;
}

function versAccueil(page, html) {
  const accueil = join(RACINE, "index.html");
  for (const m of html.matchAll(/<a\b[^>]*?\shref=["']([^"']*)["']/gi)) {
    let h = m[1].split("#")[0].split("?")[0].trim();
    if (!h) continue;
    h = h.replace(/^https?:\/\/(www\.)?inerweb\.fr/i, "");
    if (/^[a-z][a-z0-9+.-]*:/i.test(h) || h.startsWith("//")) continue;
    if (h === "" || h === "/") return true;
    const f = h.startsWith("/") ? join(RACINE, h) : resolve(dirname(page), h);
    if (f === accueil || f === RACINE || f === RACINE + sep) return true;
  }
  return /href=["']https?:\/\/(www\.)?inerweb\.fr\/?["']/i.test(html);
}

const existante = /<script defer src="[^"]*moteur\/retour-accueil\.js(?:\?v=[^"]*)?"><\/script>/;
let posees = 0, maj = 0, intactes = 0, sansHead = 0;
const sansLien = [], manquantes = [];
for (const page of pagesHtml(RACINE)) {
  const html = readFileSync(page, "utf8");
  if (!versAccueil(page, html)) sansLien.push(relative(RACINE, page));
  if (INVENTAIRE) continue;
  if (!/<head[\s>]/i.test(html)) { sansHead++; continue; }
  const prefixe = relative(dirname(page), RACINE).split(sep).join("/");
  const balise = `<script defer src="${prefixe ? prefixe + "/" : ""}moteur/retour-accueil.js?v=${cle}"></script>`;
  let neuf;
  if (existante.test(html)) {
    neuf = html.replace(existante, balise);
    if (neuf === html) { intactes++; continue; }
    maj++;
  } else {
    manquantes.push(relative(RACINE, page));
    const fin = html.search(/<\/head>/i);
    if (fin < 0) { sansHead++; continue; }
    neuf = html.slice(0, fin) + balise + "\n" + html.slice(fin);
    posees++;
  }
  if (!VERIFIER) writeFileSync(page, neuf);
}
if (INVENTAIRE) { console.log(`${sansLien.length} page(s) sans lien vers l'accueil`); sansLien.forEach(p => console.log("  " + p)); process.exit(0); }
if (VERIFIER) { console.log(`  retour-accueil : ${manquantes.length} manquante(s), ${maj} clé(s) périmée(s)`); process.exit(manquantes.length || maj ? 1 : 0); }
console.log(`  retour-accueil : ${cle} — ${posees} posée(s), ${maj} clé(s) mise(s) à jour, ${intactes} à jour, ${sansHead} sans <head> (sans lien accueil avant pose : ${sansLien.length})`);
