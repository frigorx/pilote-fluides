/* retour-accueil.mjs — pose moteur/retour-accueil.js (logo → accueil, et lien vers le réseau
   de la page) sur toutes les pages HTML publiées. Idempotent : balise déjà posée = clé ?v= et
   réseau mis à jour.
   Usage : node build/retour-accueil.mjs [--verifier | --inventaire | --reseaux]
   --inventaire : liste les pages sans aucun lien vers l'accueil (n'écrit rien).
   --reseaux    : compte les pages par réseau et liste celles qui n'en ont pas (n'écrit rien).
   LE RÉSEAU D'UNE PAGE (06/10/2026, F. Henninot : « toutes les pages doivent avoir un lien de
   retour au réseau et un lien de retour à la page d'accueil ») — dans l'ordre :
     1. un FILM se rattache au Studio : toute page rangée dans une salle de films (studio/,
        voyage/, packs/fluides/res/_regules-commun/films/, packs/fluides/res/film-…/) ;
     2. le catalogue des stations (docs/catalogue-2026-09) : la station, ou le dossier de
        station le plus proche, donne le nom du réseau, rapproché de moteur/reseaux.js
        (champ `catalogue`, ou le nom du réseau) ;
     3. le dossier de l'adresse du réseau (hydrometro/, legislation/…) ; packs/fluides/res/
        appartient au réseau thermo-techno (ses stations y vivent).
   Sinon, pas de réseau : la page n'a que le retour à l'accueil. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(RACINE, "moteur", "retour-accueil.js");
const EXCLUS = new Set(["node_modules", ".git", "docs", "tests", ".planning", "build", "outils", ".claude", "moteur", "data"]);
const VERIFIER = process.argv.includes("--verifier");
const INVENTAIRE = process.argv.includes("--inventaire");
const RESEAUX_SEULS = process.argv.includes("--reseaux");
const cle = createHash("sha1").update(readFileSync(SCRIPT)).digest("hex").slice(0, 10);

/* ---- Le réseau de chaque page (voir l'en-tête) ---- */
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync(join(RACINE, "moteur", "reseaux.js"), "utf8"), ctx);
const RESEAUX = ctx.window.INERWEB_RESEAUX;
if (!Array.isArray(RESEAUX) || !RESEAUX.length) throw new Error("moteur/reseaux.js : liste vide");
const parId = (id) => { const r = RESEAUX.find((x) => x.id === id); if (!r) throw new Error("réseau inconnu : " + id); return r; };
const SALLES_DE_FILMS = [/^studio\//, /^voyage\//, /^packs\/fluides\/res\/_regules-commun\/films\//, /^packs\/fluides\/res\/film-[^/]+\//];
const DOSSIERS = RESEAUX.filter((r) => r.adresse.includes("/")).map((r) => [r.adresse.slice(0, r.adresse.lastIndexOf("/") + 1), r])
  .concat([["packs/fluides/res/", parId("thermo-techno")]]);
const sansIndex = (c) => c.replace(/index\.html$/, "");
const STATIONS = new Map();
for (const st of JSON.parse(readFileSync(join(RACINE, "docs", "catalogue-2026-09", "catalogue-stations.json"), "utf8")).stations) {
  const r = RESEAUX.find((x) => (x.catalogue || []).includes(st.reseau) || x.nom === st.reseau);
  const chemin = String(st.url || "").replace(/^https?:\/\/(www\.)?inerweb\.fr\//i, "").split(/[?#]/)[0];
  if (r && chemin && !STATIONS.has(sansIndex(chemin))) STATIONS.set(sansIndex(chemin), r);
}
function reseauDe(rel) {
  if (SALLES_DE_FILMS.some((re) => re.test(rel))) return parId("studio");
  const c = sansIndex(rel);
  if (STATIONS.has(c)) return STATIONS.get(c);
  for (let d = c.endsWith("/") ? c : c.slice(0, c.lastIndexOf("/") + 1); d; d = d.slice(0, d.slice(0, -1).lastIndexOf("/") + 1)) {
    if (STATIONS.has(d)) return STATIONS.get(d);
  }
  let meilleur = null;
  for (const [d, r] of DOSSIERS) if (c.startsWith(d) && (!meilleur || d.length > meilleur[0].length)) meilleur = [d, r];
  return meilleur ? meilleur[1] : null;
}
const attr = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

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

const existante = /<script defer src="[^"]*moteur\/retour-accueil\.js(?:\?v=[^"]*)?"(?: data-[a-z-]+="[^"]*")*><\/script>/;
let posees = 0, maj = 0, intactes = 0, sansHead = 0;
const sansLien = [], manquantes = [], sansReseau = [], parReseau = {};
for (const page of pagesHtml(RACINE)) {
  const html = readFileSync(page, "utf8");
  if (!versAccueil(page, html)) sansLien.push(relative(RACINE, page));
  const rel = relative(RACINE, page).split(sep).join("/");
  const reseau = rel === "index.html" ? null : reseauDe(rel);
  if (reseau) parReseau[reseau.id] = (parReseau[reseau.id] || 0) + 1; else sansReseau.push(rel);
  if (INVENTAIRE || RESEAUX_SEULS) continue;
  if (!/<head[\s>]/i.test(html)) { sansHead++; continue; }
  const prefixe = relative(dirname(page), RACINE).split(sep).join("/");
  const donnees = reseau ? ` data-reseau-href="${attr(reseau.adresse)}" data-reseau-nom="${attr(reseau.emoji + " " + reseau.nom)}"` : "";
  const balise = `<script defer src="${prefixe ? prefixe + "/" : ""}moteur/retour-accueil.js?v=${cle}"${donnees}></script>`;
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
if (RESEAUX_SEULS) {
  for (const [id, n] of Object.entries(parReseau)) console.log(`  ${id} : ${n} page(s)`);
  console.log(`  sans réseau (retour à l'accueil seul) : ${sansReseau.length}`);
  sansReseau.forEach((p) => console.log("    " + p));
  process.exit(0);
}
if (INVENTAIRE) { console.log(`${sansLien.length} page(s) sans lien vers l'accueil`); sansLien.forEach(p => console.log("  " + p)); process.exit(0); }
if (VERIFIER) { console.log(`  retour-accueil : ${manquantes.length} manquante(s), ${maj} clé(s) périmée(s)`); process.exit(manquantes.length || maj ? 1 : 0); }
console.log(`  retour-accueil : ${cle} — ${posees} posée(s), ${maj} clé(s) mise(s) à jour, ${intactes} à jour, ${sansHead} sans <head> (sans lien accueil avant pose : ${sansLien.length})`);
