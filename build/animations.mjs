/* =====================================================================
   animations.mjs — pose moteur/animations.js sur les pages qui en ont besoin
   ---------------------------------------------------------------------
   POURQUOI : les pages qui lisent prefers-reduced-motion se figeaient sur
   les machines où ce réglage du système est actif sans qu'on l'ait voulu
   (Windows sans effets d'animation, Android « Supprimer les animations »).
   moteur/animations.js remplace ce réglage par l'interrupteur du site
   (panneau Aa). Il doit être chargé SANS defer, en tête de <head>.

   QUELLES PAGES : toute page d'une « famille » (un dossier de premier
   niveau, ou un module de packs/fluides/res/) dont un fichier .html, .css,
   .js ou .mjs mentionne prefers-reduced-motion. Toute la famille, parce
   que la 3D (electro3d.js) se charge à la demande et échappe aux liens
   statiques. Les pages de la racine sont jugées une par une.

   Idempotent : une balise déjà posée voit seulement sa clé ?v= mise à jour.
   Usage :  node build/animations.mjs            (écrit)
            node build/animations.mjs --verifier (n'écrit rien, sort en
                                                  erreur si une page manque)
   À relancer après toute livraison d'atelier : cuivrezo, cablage-virtuel,
   quartier, hocourant ou r408 recopient leurs pages sans la balise.
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(RACINE, "moteur", "animations.js");
const EXCLUS = new Set(["node_modules", ".git", "docs", "tests", ".planning", "build", "outils", ".claude"]);
const MOTIF = /prefers-reduced-motion/;
const VERIFIER = process.argv.includes("--verifier");

const cle = createHash("sha1").update(readFileSync(SCRIPT)).digest("hex").slice(0, 10);

function fichiers(dossier, extensions, sortie = []) {
  for (const e of readdirSync(dossier, { withFileTypes: true })) {
    if (EXCLUS.has(e.name)) continue;
    const p = join(dossier, e.name);
    if (e.isDirectory()) fichiers(p, extensions, sortie);
    else if (extensions.some(x => e.name.endsWith(x))) sortie.push(p);
  }
  return sortie;
}

const lire = f => { try { return readFileSync(f, "utf8"); } catch { return ""; } };

// La famille d'une page : packs/fluides/res/<module>, sinon le dossier de premier niveau.
function famille(page) {
  const morceaux = relative(RACINE, page).split(sep);
  if (morceaux.length === 1) return null; // page de la racine
  if (morceaux[0] === "packs" && morceaux.length > 4) return morceaux.slice(0, 4).join("/");
  return morceaux[0];
}

const pages = fichiers(RACINE, [".html"]);
const famillesTouchees = new Set();
for (const f of fichiers(RACINE, [".html", ".css", ".js", ".mjs"])) {
  if (f === SCRIPT || !MOTIF.test(lire(f))) continue;
  const fam = famille(f);
  if (fam && !fam.startsWith("moteur")) famillesTouchees.add(fam);
}

// Une page de la racine : touchée si elle, ou une feuille / un script local qu'elle charge, lit le réglage.
function racineTouchee(page, html) {
  if (MOTIF.test(html)) return true;
  for (const m of html.matchAll(/(?:src|href)="([^"?#:]+\.(?:css|js))/g)) {
    const f = resolve(dirname(page), m[1]);
    if (f !== SCRIPT && f.startsWith(RACINE) && existsSync(f) && MOTIF.test(lire(f))) return true;
  }
  return false;
}

let posees = 0, misesAJour = 0, intactes = 0;
const manquantes = [];
for (const page of pages) {
  const html = lire(page);
  if (!/<head[\s>]/i.test(html)) continue;
  const fam = famille(page);
  if (fam ? !famillesTouchees.has(fam) : !racineTouchee(page, html)) continue;

  const prefixe = relative(dirname(page), RACINE).split(sep).join("/");
  const src = (prefixe ? prefixe + "/" : "") + "moteur/animations.js?v=" + cle;
  const balise = `<script src="${src}"></script>`;
  const existante = /<script src="[^"]*moteur\/animations\.js(?:\?v=[^"]*)?"><\/script>/;

  let neuf;
  if (existante.test(html)) {
    neuf = html.replace(existante, balise);
    if (neuf === html) { intactes++; continue; }
    misesAJour++;
  } else {
    manquantes.push(relative(RACINE, page));
    // Juste après <meta charset>, sinon juste après <head> : avant toute feuille et tout script.
    const charset = html.match(/<meta[^>]*charset[^>]*>/i);
    const ouverture = html.match(/<head(?:\s[^>]*)?>/i);
    const ancre = charset && charset.index > ouverture.index ? charset : ouverture;
    const fin = ancre.index + ancre[0].length;
    neuf = html.slice(0, fin) + "\n" + balise + html.slice(fin);
    posees++;
  }
  if (!VERIFIER) writeFileSync(page, neuf);
}

if (VERIFIER) {
  console.log(`  animations : ${manquantes.length} page(s) sans moteur/animations.js, ${misesAJour} clé(s) périmée(s) (familles : ${famillesTouchees.size})`);
  for (const p of manquantes.slice(0, 20)) console.log("    manque : " + p);
  process.exit(manquantes.length || misesAJour ? 1 : 0);
}
console.log(`  animations : ${cle} — ${posees} posée(s), ${misesAJour} clé(s) mise(s) à jour, ${intactes} déjà à jour (familles : ${famillesTouchees.size})`);
