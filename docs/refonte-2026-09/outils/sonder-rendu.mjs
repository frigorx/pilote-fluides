/* =====================================================================
   sonder-rendu.mjs — mesurer ce que VOIT le visiteur, à trois largeurs
   ---------------------------------------------------------------------
   Rôle : ouvrir chaque page d'une liste dans un Chromium sans tête, à
   375 / 800 / 1280 px, capturer l'écran et MESURER (jamais « regarder ») :
     · débordement horizontal de la page ;
     · éléments visibles qui sortent du cadre à droite ;
     · chevauchements entre éléments interactifs visibles (boutons, liens,
       champs) qui ne sont pas parent/enfant l'un de l'autre ;
     · plus petite taille de police d'un texte visible, et nombre < 14 px ;
     · erreurs de console, erreurs de page, ressources en échec (≥ 400) ;
     · titre, h1, lang, meta viewport, meta description, présence d'une marque.
   Entrées : node sonder-rendu.mjs <liste.json> <dossier-sortie> [base]
     liste.json = [{ "id": "accueil", "chemin": "/index.html" }, …]
     base       = http://localhost:8791 par défaut (serveur local du dépôt)
   Sorties : <dossier>/mesures.json + <dossier>/<id>-<largeur>.png
   Pièges : (1) le service worker est BLOQUÉ (contexte neuf, serviceWorkers:
   'block') pour mesurer la version servie, pas un cache ; (2) une page à
   écran fixe (overflow:hidden) ne se capture qu'en hauteur de fenêtre ;
   (3) Playwright vient de C:/git/hydrometro/node_modules — pas installé ici ;
   son navigateur téléchargé manque (1234 attendu, 1228 présent) → canal Chrome du poste.
   ===================================================================== */
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("C:/git/hydrometro/node_modules/playwright");

const [, , listePath, dossier, base = "http://localhost:8791"] = process.argv;
if (!listePath || !dossier) {
  console.error("usage : node sonder-rendu.mjs <liste.json> <dossier-sortie> [base]");
  process.exit(2);
}
const pages = JSON.parse(readFileSync(listePath, "utf8"));
const LARGEURS = [375, 800, 1280];
mkdirSync(dossier, { recursive: true });

const MESURE_DANS_LA_PAGE = () => {
  const iw = window.innerWidth;
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return null;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) === 0) return null;
    return r;
  };
  const texte = (el) => (el.innerText || el.getAttribute("aria-label") || el.value || "").trim().replace(/\s+/g, " ").slice(0, 60);
  const desc = (el) => ({ tag: el.tagName.toLowerCase(), id: el.id || null, classe: (el.className && el.className.baseVal === undefined ? String(el.className) : "").slice(0, 60), texte: texte(el) });

  // 1. débordement de page
  const debordement = { scrollWidth: document.documentElement.scrollWidth, innerWidth: iw, deborde: document.documentElement.scrollWidth > iw + 1 };

  // 2. éléments hors cadre à droite (avec un texte, visibles)
  const horsCadre = [];
  for (const el of document.querySelectorAll("body *")) {
    if (horsCadre.length >= 25) break;
    if (!el.innerText || !el.innerText.trim()) continue;
    const r = visible(el); if (!r) continue;
    if (r.right > iw + 2 && r.left < iw) horsCadre.push({ ...desc(el), gauche: Math.round(r.left), droite: Math.round(r.right) });
  }

  // 3. chevauchements d'éléments interactifs
  const inter = [...document.querySelectorAll("a[href], button, input, select, textarea, [role=button], summary")]
    .map((el) => ({ el, r: visible(el) })).filter((x) => x.r).slice(0, 400);
  const chevauchements = [];
  for (let i = 0; i < inter.length; i++) for (let j = i + 1; j < inter.length; j++) {
    const a = inter[i], b = inter[j];
    if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
    const x = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
    const y = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (x > 2 && y > 2) chevauchements.push({ a: desc(a.el), b: desc(b.el), aire: Math.round(x * y) });
    if (chevauchements.length >= 30) break;
  }

  // 4. polices des textes visibles
  let policeMin = Infinity, sous14 = 0, exemplesSous14 = [];
  const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = marcheur.nextNode())) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement; if (!el) continue;
    if (/^(script|style|noscript)$/i.test(el.tagName)) continue;
    const r = visible(el); if (!r) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < policeMin) policeMin = fs;
    if (fs < 14) { sous14++; if (exemplesSous14.length < 8) exemplesSous14.push({ taille: fs, ...desc(el) }); }
  }

  // 5. identité
  const meta = (name) => (document.querySelector(`meta[name="${name}"]`) || {}).content || null;
  const h1 = document.querySelector("h1");
  const marque = !!document.querySelector('[class*="marque"],[id*="marque"],.logo,[class*="logo"]') || /inerWeb/.test(document.body.innerText.slice(-600));
  return {
    titre: document.title, h1: h1 ? texte(h1) : null, lang: document.documentElement.lang || null,
    viewport: meta("viewport"), description: meta("description"), marque,
    debordement, horsCadre, chevauchements, policeMin: policeMin === Infinity ? null : policeMin, sous14, exemplesSous14,
    hauteurPage: document.documentElement.scrollHeight,
  };
};

const navigateur = await chromium.launch({ channel: "chrome" });
const resultats = [];
for (const p of pages) {
  for (const largeur of LARGEURS) {
    const ctx = await navigateur.newContext({ viewport: { width: largeur, height: largeur < 700 ? 812 : 800 }, serviceWorkers: "block", locale: "fr-FR" });
    const page = await ctx.newPage();
    const console_ = [], echecs = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console_.push({ type: m.type(), texte: m.text().slice(0, 200) }); });
    page.on("pageerror", (e) => console_.push({ type: "pageerror", texte: String(e.message || e).slice(0, 200) }));
    page.on("requestfailed", (r) => echecs.push({ url: r.url().replace(base, ""), raison: (r.failure() || {}).errorText }));
    page.on("response", (r) => { if (r.status() >= 400) echecs.push({ url: r.url().replace(base, ""), statut: r.status() }); });
    const url = base + p.chemin;
    let mesures = null, erreur = null;
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(900);
      mesures = await page.evaluate(MESURE_DANS_LA_PAGE);
      const capture = join(dossier, `${p.id}-${largeur}.png`);
      await page.screenshot({ path: capture, fullPage: true }).catch(async () => page.screenshot({ path: capture }));
      mesures.capture = capture;
    } catch (e) { erreur = String(e.message || e).slice(0, 300); }
    resultats.push({ id: p.id, chemin: p.chemin, largeur, erreur, ...mesures, console: console_.slice(0, 20), echecs: echecs.slice(0, 20) });
    console.log(`${p.id} @${largeur}` + (erreur ? ` ✗ ${erreur}` : ` · déborde=${mesures.debordement.deborde} · horsCadre=${mesures.horsCadre.length} · chevauch.=${mesures.chevauchements.length} · police min=${mesures.policeMin} (<14 : ${mesures.sous14}) · console=${console_.length} · échecs=${echecs.length}`));
    await ctx.close();
  }
}
await navigateur.close();
writeFileSync(join(dossier, "mesures.json"), JSON.stringify(resultats, null, 1));
console.log(`\n${resultats.length} mesures → ${join(dossier, "mesures.json")}`);
