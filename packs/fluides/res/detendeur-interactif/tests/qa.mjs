/* =====================================================================
   qa.mjs — contrôle navigateur du module « Le détendeur thermostatique » (gare 1 de LES DÉTENDEURS)
   ---------------------------------------------------------------------
   Usage :  node packs/fluides/res/detendeur-interactif/tests/qa.mjs [url]
            url par défaut : http://localhost:8794/packs/fluides/res/detendeur-interactif/index.html
   Variables : CAPTURES=<dossier> enregistre des PNG · PLAYWRIGHT_DIR=<dossier qui a playwright>
   (Playwright n'est installé que dans C:\git\hydrometro\node_modules ; Edge est utilisé, Chrome sinon.)

   Quatre passes :
     A · http + WebGL      les 14 écrans en 5 formats ; les écrans 2, 3, 4, 6, 7 sont en 3D : canevas non vide,
                           chaque étape jouée, éclaté, coupe, pièces, ouverture, forces, boucle chaud/froid
                           (l'état physique du modèle change comme il le doit) ; texte du cours ≥ 14 pt ;
                           console sans erreur ; seules requêtes tolérées : le site et les CDN de Three.js.
     B · file://           la 3D ne s'ouvre pas : tout le parcours 2D d'avant (repli), aucune requête.
     C · http, CDN coupés  la 3D échoue en route : le dessin 2D prend sa place sans erreur.
     D · modes dégradés    sans stockage ni synthèse vocale.
   ===================================================================== */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(path.join(process.env.PLAYWRIGHT_DIR || "C:/git/hydrometro", "package.json"));
const { chromium } = require("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const URL_HTTP = process.argv[2] || "http://localhost:8794/packs/fluides/res/detendeur-interactif/index.html";
const URL_FILE = pathToFileURL(path.join(projectRoot, "index.html")).href;
const ORIGINE = new URL(URL_HTTP).origin;
const OUT = process.env.CAPTURES || "";
if (OUT) fs.mkdirSync(OUT, { recursive: true });
const CDN = ["cdnjs.cloudflare.com", "cdn.jsdelivr.net"];
const EXE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find((p) => fs.existsSync(p));
const FORMATS = [
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1280x720", width: 1280, height: 720 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "390x844", width: 390, height: 844 },
  { name: "360x640", width: 360, height: 640 }
];
const PRINCIPAUX = ["1366x768", "390x844"];                 // formats où l'on joue toute la 3D et où l'on photographie
const ECRANS_3D = [1, 2, 3, 5, 6];                           // index des écrans en 3D
const echecs = [];
const ko = (msg) => { echecs.push(msg); console.log("  ÉCHEC", msg); };

const browser = await chromium.launch({ headless: true, executablePath: EXE, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });

/* ------------------------------------------------------------------ outils */
async function ouvrir(url, format, { cdn = true, fichier = false } = {}) {
  const context = await browser.newContext({ viewport: { width: format.width, height: format.height } });
  const page = await context.newPage();
  const erreurs = [], dehors = [];
  page.on("pageerror", (e) => erreurs.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error" || (m.type() === "warning" && /electro-3d/.test(m.text()))) erreurs.push(m.type() + ": " + m.text()); });
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.protocol === "data:" || u.protocol === "blob:" || u.protocol === "file:" || u.origin === ORIGINE) return;
    if (u.protocol === "https:" && CDN.includes(u.hostname) && !fichier) return;
    dehors.push(r.url());
  });
  if (!cdn) await page.route((u) => CDN.includes(new URL(u).hostname), (route) => route.abort());
  await page.goto(url, { waitUntil: "load" });
  return { page, context, erreurs, dehors };
}
const capture = async (page, nom) => { if (OUT) await page.screenshot({ path: path.join(OUT, nom + ".png") }); };

async function pasDeDefilement(page, qui) {
  const m = await page.evaluate(() => {
    const r = document.documentElement;
    const boites = [".app-shell", ".course-grid", ".lesson", ".lesson-copy", ".visual-card", ".visual-root"].map((s) => {
      const e = document.querySelector(s); if (!e) return null;
      const b = e.getBoundingClientRect(); return { s, l: b.left, t: b.top, r: b.right, b: b.bottom };
    }).filter(Boolean);
    return { sw: r.scrollWidth, cw: r.clientWidth, sh: r.scrollHeight, ch: r.clientHeight, w: innerWidth, h: innerHeight, boites };
  });
  if (m.sw > m.cw + 1 || m.sh > m.ch + 1) ko(`${qui} : la page défile ${JSON.stringify({ sw: m.sw, cw: m.cw, sh: m.sh, ch: m.ch })}`);
  m.boites.forEach((b) => { if (b.l < -1 || b.t < -1 || b.r > m.w + 1 || b.b > m.h + 1) ko(`${qui} : ${b.s} hors écran ${JSON.stringify(b)}`); });
}

/* attendre que la vue 3D de l'écran courant soit prête (ou qu'elle ait renoncé) */
async function attendre3D(page) {
  await page.waitForFunction(() => { const e = document.querySelector("electro-3d"); return e && (e.dataset.pret || e.dataset.repli); }, null, { timeout: 60000 });
  return page.evaluate(() => { const e = document.querySelector("electro-3d"); return e.dataset.pret ? "pret" : "repli:" + e.dataset.repli; });
}
/* le canevas dessine-t-il quelque chose ? (pixels pleins, contraste) */
async function rendu(page) {
  return page.evaluate(() => {
    const e = document.querySelector("electro-3d"); e.avancer(0.02);
    const cv = e.querySelector("canvas"), gl = cv.getContext("webgl2") || cv.getContext("webgl");
    const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight, px = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
    let pleins = 0, s = 0, s2 = 0, n = 0;
    for (let i = 0; i < px.length; i += 64) { if (px[i + 3] > 10) { pleins++; const l = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11; s += l; s2 += l * l; } n++; }
    const moy = pleins ? s / pleins : 0;
    return { remplissage: pleins / n, contraste: Math.sqrt(Math.max(0, s2 / Math.max(1, pleins) - moy * moy)), info: e.info() };
  });
}
const etatModele = (page) => page.evaluate(() => document.querySelector("electro-3d")._M.etat());
const avancer = (page, s) => page.evaluate((x) => document.querySelector("electro-3d").avancer(x), s);
const phrase = async (page) => (await page.locator(".e3d-phrase").textContent()) || "";
const dot = (page, i) => page.locator(`.e3d-etapes-points button:nth-child(${i})`).click();

/* le texte du cours (≥ 14 pt = 18,7 px) et de la vue 3D */
async function tailleDuTexte(page, qui) {
  const petits = await page.evaluate(() => {
    const sortie = [];
    document.querySelectorAll(".lesson-intro, .lesson-detail *, .takeaway, .e3d-phrase").forEach((e) => {
      const r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
      const st = getComputedStyle(e); if (st.display === "none" || st.visibility === "hidden") return;
      if (![...e.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) return;
      const px = parseFloat(st.fontSize);
      if (px < 18.6) sortie.push(`« ${e.textContent.trim().slice(0, 30)} » ${px.toFixed(1)} px`);
    });
    return sortie;
  });
  petits.forEach((t) => ko(`${qui} : texte trop petit ${t}`));
}

/* ------------------------------------------------------------------ passe A : la 3D, écran par écran */
async function jouer3D(page, format, n) {
  const qui = `${format.name} écran ${n + 1}`;
  const phone = format.width < 700;
  const garde = (cond, msg) => { if (!cond) ko(`${qui} : ${msg}`); };
  const aller = async (i) => { await page.locator(`[data-step="${i}"]`).click(); return attendre3D(page); };
  const photo = PRINCIPAUX.includes(format.name);

  if (n === 1) {                                           // reconnaître : fermé, éclaté, coupe
    garde((await aller(1)) === "pret", "la vue 3D ne s'ouvre pas");
    const r = await rendu(page);
    garde(r.remplissage > 0.04 && r.contraste > 6, `canevas vide ${JSON.stringify({ r: r.remplissage.toFixed(3), c: r.contraste.toFixed(1) })}`);
    garde(r.info.pieces.length === 12 && r.info.etapes === 3 && r.info.eclate, `pièces/étapes/éclaté inattendus ${JSON.stringify([r.info.pieces.length, r.info.etapes, r.info.eclate])}`);
    if (format.name === "1366x768") await tailleDuTexte(page, qui);
    if (photo) { await page.waitForTimeout(600); await capture(page, `${format.name}-1-ferme`); }
    await page.locator(".e3d-etapes .primary").click();
    garde((await phrase(page)).includes("tel qu’à l’atelier"), "étape 1 : phrase absente");
    garde(!(await etatModele(page)).coupe, "étape 1 : l'objet doit être fermé");
    await dot(page, 2); await avancer(page, 3);
    garde((await phrase(page)).includes("ordre du démontage") && (await etatModele(page)).eclate, "étape 2 : l'éclaté ne s'est pas fait");
    garde((await page.locator(".e3d-bt-eclate").getAttribute("aria-pressed")) === "true", "étape 2 : bouton Éclaté non enfoncé");
    if (photo) { await page.waitForTimeout(600); await capture(page, `${format.name}-2-eclate`); }
    await dot(page, 3); await avancer(page, 3);
    const e3 = await etatModele(page);
    garde((await phrase(page)).includes("chemin du fluide") && e3.coupe && e3.fluide && !e3.eclate, "étape 3 : la coupe avec le fluide ne s'est pas ouverte");
    garde((await rendu(page)).remplissage > 0.04, "étape 3 : canevas vide");
    if (photo) { await page.waitForTimeout(600); await capture(page, `${format.name}-3-coupe`); }
    await page.locator(".e3d-bt-fantome").click();
    garde(!(await etatModele(page)).coupe, "le bouton Refermer ne referme pas");
    await page.locator(".e3d-bt-eclate").click(); await avancer(page, 3);
    garde((await etatModele(page)).eclate, "le bouton Éclaté ne fait rien");
    await page.locator(".e3d-bt-eclate").click();
    if (!phone) {
      await page.locator('.e3d-piece[data-piece="membrane"]').click();
      garde((await phrase(page)).includes("La membrane"), "clic sur une pièce : le nom n'apparaît pas");
    }
    return;
  }

  if (n === 2) {                                           // pièces : clic sur les douze pièces
    garde((await aller(2)) === "pret", "la vue 3D ne s'ouvre pas");
    const r = await rendu(page);
    garde(r.remplissage > 0.04 && r.contraste > 6, "canevas vide");
    if (format.name === "1366x768") await tailleDuTexte(page, qui);
    garde((await etatModele(page)).coupe, "les pièces doivent s'ouvrir en coupe");
    if (!phone) {                                           // le survol de l'image allume bien des pièces, un clic donne le rôle
      const boite = await page.locator(".e3d-scene").boundingBox(), vues = new Set();
      for (let gx = 0.1; gx < 0.95; gx += 0.1) for (let gy = 0.15; gy < 0.9; gy += 0.1) {
        await page.mouse.move(boite.x + boite.width * gx, boite.y + boite.height * gy); await page.waitForTimeout(70);
        (await page.locator(".e3d-piece.allumee .e3d-nom").allTextContents()).forEach((t) => vues.add(t));
      }
      garde(vues.size >= 4, `le survol de l'image n'allume que ${vues.size} pièce(s)`);
    }
    for (const id of r.info.pieces) {
      const b = page.locator(`.e3d-piece[data-piece="${id}"]`);
      await b.click(); await avancer(page, 0.05);
      const lit = await page.locator(".e3d-piece.allumee").count();
      const ph = await phrase(page);
      const nom = (await b.locator(".e3d-nom").textContent()) || "";
      if (lit !== 1) ko(`${qui} : pièce « ${id} » : ${lit} pièces allumées au lieu d'une`);
      if (!ph.includes(nom)) ko(`${qui} : pièce « ${id} » : phrase sans son nom (« ${ph.slice(0, 40)} »)`);
      if (id === "clapet" && photo) { await page.waitForTimeout(1500); await avancer(page, 1); await capture(page, `${format.name}-4-piece-clapet`); }
    }
    await page.locator('.e3d-piece[data-piece="evap"]').click();
    await page.mouse.move(2, 2);                                                  // le survol allume aussi : on s'éloigne
    garde((await page.locator(".e3d-piece.allumee").count()) === 0, "second clic : la pièce doit s'éteindre");
    return;
  }

  if (n === 3) {                                           // le clapet dose le passage : trois ouvertures
    garde((await aller(3)) === "pret", "la vue 3D ne s'ouvre pas");
    garde((await rendu(page)).remplissage > 0.04, "canevas vide");
    if (format.name === "1366x768") await tailleDuTexte(page, qui);
    const D = {};
    for (const [cle, texte] of [["small", "débit massique est limité"], ["modulating", "se conserve"], ["large", "davantage de fluide"]]) {
      await page.locator(`[data-opening="${cle}"]`).click(); await avancer(page, 6);
      garde((await phrase(page)).includes(texte), `ouverture « ${cle} » : phrase attendue absente`);
      garde((await page.locator(`[data-opening="${cle}"]`).getAttribute("aria-pressed")) === "true", `ouverture « ${cle} » : bouton non enfoncé`);
      D[cle] = (await etatModele(page)).D;
    }
    garde(D.small < D.modulating - 0.3 && D.modulating < D.large - 0.5, `les ouvertures ne se distinguent pas ${JSON.stringify(D)}`);
    return;
  }

  if (n === 5) {                                           // trois forces
    garde((await aller(5)) === "pret", "la vue 3D ne s'ouvre pas");
    garde((await rendu(page)).remplissage > 0.04, "canevas vide");
    if (format.name === "1366x768") await tailleDuTexte(page, qui);
    await page.waitForTimeout(400);
    garde((await phrase(page)).includes("F bulbe = F évaporation + F ressort"), "étape 1 : équilibre absent");
    const D = [];
    await avancer(page, 8); D.push((await etatModele(page)).D);
    await dot(page, 2); await avancer(page, 9); D.push((await etatModele(page)).D);
    garde((await phrase(page)).includes("le passage augmente"), "étape 2 : phrase attendue absente");
    garde(((await page.locator(".e3d-mesures .metric:nth-child(1) strong").textContent()) || "").includes("forte"), "étape 2 : la force du bulbe doit être forte");
    await dot(page, 3); await avancer(page, 9); D.push((await etatModele(page)).D);
    garde((await phrase(page)).includes("le passage diminue") && (await phrase(page)).includes("mesure et diagnostic"), "étape 3 : phrase attendue absente");
    garde(D[1] > D[0] + 0.3 && D[2] < D[0] - 0.3, `le clapet ne bouge pas comme il le doit ${JSON.stringify(D.map((x) => +x.toFixed(2)))}`);
    if (photo) { await page.waitForTimeout(600); await capture(page, `${format.name}-5-forces`); }
    return;
  }

  if (n === 6) {                                           // la boucle complète, six étapes, puis chaud / froid
    garde((await aller(6)) === "pret", "la vue 3D ne s'ouvre pas");
    garde((await rendu(page)).remplissage > 0.04, "canevas vide");
    if (format.name === "1366x768") await tailleDuTexte(page, qui);
    const T_ = [];
    await page.waitForTimeout(400);
    await avancer(page, 8); T_.push(await etatModele(page));
    const titres = ["Régime stable", "se réchauffe", "sa pression monte", "le clapet s’ouvre", "Plus de liquide", "le ressort referme"];
    garde((await phrase(page)).includes(titres[0]), "étape 1 : titre absent");
    for (let i = 2; i <= 6; i++) {
      await dot(page, i);
      await avancer(page, 10);
      garde((await phrase(page)).includes(titres[i - 1]), `étape ${i} : titre « ${titres[i - 1]} » absent`);
      T_.push(await etatModele(page));
      if (i === 4) {
        garde((await page.locator(".e3d-bt-ralenti").getAttribute("aria-pressed")) === "true", "étape 4 : le ralenti doit être enclenché");
        if (photo) { await page.waitForTimeout(700); await capture(page, `${format.name}-6-etape4`); }
      }
    }
    const [s1, s2, s3, s4, s5, s6] = T_;
    const f = (x) => +x.toFixed(2);
    garde(s2.s > s1.s + 0.15 && Math.abs(s2.Pb - s1.Pb) < 0.03 && Math.abs(s2.D - s1.D) < 0.05, `étape 2 : seule la sortie doit chauffer ${JSON.stringify([f(s1.s), f(s2.s), f(s1.Pb), f(s2.Pb)])}`);
    garde(s3.Pb > s2.Pb + 0.1 && Math.abs(s3.D - s2.D) < 0.05, `étape 3 : seule la pression du bulbe doit monter ${JSON.stringify([f(s2.Pb), f(s3.Pb), f(s2.D), f(s3.D)])}`);
    garde(s4.D > s3.D + 0.5 && s4.debit > s3.debit + 0.1, `étape 4 : le clapet doit s'ouvrir ${JSON.stringify([f(s3.D), f(s4.D)])}`);
    garde(s5.s < s4.s - 0.1 && s5.uf > s4.uf + 0.05, `étape 5 : la sortie doit refroidir, le liquide avancer ${JSON.stringify([f(s4.s), f(s5.s), f(s4.uf), f(s5.uf)])}`);
    garde(s6.Pb < s5.Pb - 0.05 && s6.D < s5.D - 0.2, `étape 6 : la pression et l'ouverture doivent redescendre ${JSON.stringify([f(s5.Pb), f(s6.Pb), f(s5.D), f(s6.D)])}`);
    for (const [cle, texte, signe] of [["hot", "débit augmente", 1], ["cold", "débit diminue", -1]]) {   // chaud puis froid
      await page.locator(`[data-regulation="${cle}"]`).click(); await avancer(page, 12);
      garde((await phrase(page)).includes(texte), `« ${cle} » : phrase attendue absente`);
      garde((await page.locator(`[data-regulation="${cle}"]`).getAttribute("aria-pressed")) === "true", `« ${cle} » : bouton non enfoncé`);
      const e = await etatModele(page);
      garde(signe * (e.D - s1.D) > 0.3, `« ${cle} » : l'ouverture doit ${signe > 0 ? "augmenter" : "diminuer"} (${f(e.D)} contre ${f(s1.D)})`);
    }
    await dot(page, 2);
    garde((await page.locator('[data-regulation="cold"]').getAttribute("aria-pressed")) === "false", "une étape doit relâcher les boutons chaud/froid");
    const lire = page.locator(".e3d-etapes > button").last();                    // « Tout voir » lit les étapes, la pause arrête
    await lire.click(); garde(((await lire.textContent()) || "").includes("Pause"), "« Tout voir » ne démarre pas");
    await lire.click(); garde(((await lire.textContent()) || "").includes("Tout voir"), "« Pause » n'arrête pas la lecture");
  }
}

/* ------------------------------------------------------------------ passe B : le parcours 2D complet (repli) */
async function verifier2D(page, nom) {
  const q = nom;
  const dit = async (sel) => (await page.locator(sel).textContent()) || "";
  await page.locator('[data-step="0"]').click();
  await page.locator('[data-place="valve"]').click();
  if (!(((await page.locator('[data-place="valve"]').getAttribute("class")) || "").includes("correct"))) ko(`${q}: emplacement du détendeur non validé`);

  await page.locator('[data-step="1"]').click();
  if (!(await dit("#lesson-detail")).includes("Train thermostatique")) ko(`${q}: train thermostatique non défini`);
  await page.locator('[data-view="flow"]').click();
  if (!(await dit("#visual-readout")).includes("liquide HP entre par le bas")) ko(`${q}: raccordement du détendeur absent`);

  await page.locator('[data-step="2"]').click();
  await page.locator('[data-part="orifice"]').click();
  if (!(await dit("#visual-readout")).includes("passage réglable")) ko(`${q}: buse non expliquée`);

  await page.locator('[data-step="3"]').click();
  await page.locator('[data-opening="modulating"]').click();
  if (!(await dit("#visual-readout")).includes("débit massique se conserve")) ko(`${q}: conservation du débit massique absente`);

  await page.locator('[data-step="4"]').click();
  await page.locator("#tube-temperature").fill("7");
  await page.locator("#sat-temperature").fill("2");
  if ((await dit("#superheat-output")).trim() !== "5 K") ko(`${q}: calcul de surchauffe incorrect`);

  await page.locator('[data-step="5"]').click();
  if ((await page.locator(".force-chain").count()) !== 1) ko(`${q}: chaîne cinématique absente`);
  await page.locator('[data-force="bulb"]').click();
  if (!(await dit("#visual-readout")).includes("passage augmente")) ko(`${q}: action d’ouverture du bulbe absente`);
  await page.locator('[data-force="spring"]').click();
  if (!(await dit("#visual-readout")).includes("passage diminue")) ko(`${q}: action de fermeture du ressort absente`);

  await page.locator('[data-step="6"]').click();
  if ((await page.locator(".approved-valve").count()) !== 1) ko(`${q}: boucle vectorielle absente`);
  await page.locator('[data-regulation="cold"]').click();
  if (!(await dit("#visual-readout")).includes("débit diminue")) ko(`${q}: état froid absent`);
  await page.locator("#replay-regulation").click();
  if (!(await dit("#visual-readout")).includes("La boucle repart")) ko(`${q}: rejeu de la boucle absent`);

  await page.locator('[data-step="7"]').click();
  await page.locator('[data-bulb="loose"]').click();
  if (!(await dit("#visual-readout")).includes("contact lâche")) ko(`${q}: pose du bulbe non corrigée`);

  await page.locator('[data-step="8"]').click();
  await page.locator('[data-equal="external"]').click();
  if (!(await dit("#visual-readout")).includes("sans la supprimer")) ko(`${q}: limite de l’égalisation externe absente`);
  if ((await page.locator(".equal-pressure.external").count()) !== 1) ko(`${q}: conduite d’égalisation externe absente`);

  await page.locator('[data-step="9"]').click();
  if (!(await dit("#lesson-detail")).includes("0X")) ko(`${q}: série de buses T 2 / TE 2 absente`);
  await page.locator('[data-orifice="matched"]').click();
  if (!(await dit("#visual-readout")).includes("capacité calculée")) ko(`${q}: sélection de buse absente`);

  await page.locator('[data-step="10"]').click();
  await page.locator('[data-adjust="adjust"]').click();
  if (!(await dit("#visual-readout")).includes("quatrième étape")) ko(`${q}: méthode de réglage absente`);

  await page.locator('[data-step="11"]').click();
  await page.locator('[data-install="braze"]').click();
  if (!(await dit(".installation-card")).includes("15 %")) ko(`${q}: exemple de brasage absent`);

  await page.locator('[data-step="12"]').click();
  await page.locator('[data-case="flooding"]').click();
  if (!(await dit("#visual-readout")).includes("retour liquide")) ko(`${q}: risque de retour liquide absent`);

  await page.locator('[data-step="13"]').click();
  for (const answer of [2, 1, 1, 0, 0, 0]) {
    await page.locator(`[data-answer="${answer}"]`).click();
    await page.locator("#next-question").click();
  }
  if ((await dit(".quiz-score")).trim() !== "6/6") ko(`${q}: score final incorrect`);
  if (await page.locator("#next-button").isDisabled()) ko(`${q}: reprise finale verrouillée`);

  await page.locator("#source-button").click();
  if (!(await page.locator("#sources-dialog").evaluate((e) => e.open))) ko(`${q}: dialogue Sources fermé`);
  if (!(await dit("#sources-dialog")).includes("Vue 3D")) ko(`${q}: la mention de la vue 3D manque dans les Sources`);
  await page.locator(".close-button").click();
}

/* ------------------------------------------------------------------ PASSE A : http + WebGL */
console.log("\n##### A · http + WebGL #####");
for (const format of FORMATS) {
  console.log("\n=== " + format.name + " ===");
  const { page, context, erreurs, dehors } = await ouvrir(URL_HTTP, format);
  const stepCount = await page.locator(".step-button").count();
  if (stepCount !== 14) ko(`${format.name}: ${stepCount} étapes au lieu de 14`);
  for (let i = 0; i < stepCount; i++) {
    await page.locator(`[data-step="${i}"]`).click();
    if (ECRANS_3D.includes(i)) {
      const etat = await attendre3D(page);
      if (etat !== "pret") ko(`${format.name} écran ${i + 1}: la 3D n'a pas démarré (${etat})`);
      else {
        const r = await rendu(page);
        if (r.remplissage <= 0.04) ko(`${format.name} écran ${i + 1}: canevas vide`);
        if (!(r.info.triangles > 0 && r.info.triangles < 80000)) ko(`${format.name} écran ${i + 1}: ${r.info.triangles} triangles (budget : moins de 80 000)`);
        if ((await page.locator(".e3d-scene .v3d-filigrane").count()) !== 1) ko(`${format.name} écran ${i + 1}: filigrane inerWeb absent de la scène`);
        // aucun texte dans l'image (les noms vivent dans la légende) : seul le filigrane, voulu, porte du texte
        const texte = await page.evaluate(() => { const c = document.querySelector(".e3d-scene").cloneNode(true); c.querySelectorAll(".v3d-filigrane").forEach((n) => n.remove()); return c.textContent.trim(); });
        if (texte) ko(`${format.name} écran ${i + 1}: du texte est posé sur la scène 3D : « ${texte.slice(0, 40)} »`);
      }
    }
    await pasDeDefilement(page, `${format.name} écran ${i + 1}`);
  }
  if (PRINCIPAUX.includes(format.name)) {
    for (const n of ECRANS_3D) {
      try { await jouer3D(page, format, n); await pasDeDefilement(page, `${format.name} écran ${n + 1} (après jeu)`); }
      catch (e) { ko(`${format.name} écran ${n + 1}: exception ${String(e.message).split("\n")[0]}`); }
    }
  }
  if (dehors.length) ko(`${format.name}: requêtes hors du site et des CDN de Three.js : ${dehors.join(", ")}`);
  if (erreurs.length) ko(`${format.name}: ${erreurs.join(" | ")}`);
  await context.close();
}

/* ------------------------------------------------------------------ PASSE B : file:// (repli 2D) */
console.log("\n##### B · file:// (le dessin 2D d'avant) #####");
for (const format of FORMATS) {
  console.log("\n=== " + format.name + " ===");
  const { page, context, erreurs, dehors } = await ouvrir(URL_FILE, format, { fichier: true });
  const stepCount = await page.locator(".step-button").count();
  if (stepCount !== 14) ko(`file ${format.name}: ${stepCount} étapes au lieu de 14`);
  for (let i = 0; i < stepCount; i++) {
    await page.locator(`[data-step="${i}"]`).click();
    await pasDeDefilement(page, `file ${format.name} étape ${i + 1}`);
    if (await page.locator("electro-3d").count()) ko(`file ${format.name} étape ${i + 1}: la 3D ne doit pas s'ouvrir en file://`);
  }
  await verifier2D(page, "file " + format.name);
  if (PRINCIPAUX.includes(format.name)) { await page.locator('[data-step="5"]').click(); await capture(page, `${format.name}-7-repli-2d`); }
  if (dehors.length) ko(`file ${format.name}: requêtes distantes ${dehors.join(", ")}`);
  const vraies = erreurs.filter((e) => !/couverture\.json|CORS policy|ERR_FAILED/.test(e));   // attendu en file:// (voir referentiel.js)
  if (vraies.length) ko(`file ${format.name}: ${vraies.join(" | ")}`);
  await context.close();
}

/* ------------------------------------------------------------------ PASSE C : http, CDN coupés */
console.log("\n##### C · http, CDN de Three.js coupés #####");
{
  const { page, context, erreurs, dehors } = await ouvrir(URL_HTTP, FORMATS[2], { cdn: false });
  for (const [n, selecteur] of [[1, '[data-view="flow"]'], [2, '[data-part="orifice"]'], [3, '[data-opening="modulating"]'], [5, '[data-force="bulb"]'], [6, "#replay-regulation"]]) {
    await page.locator(`[data-step="${n}"]`).click();
    await page.locator(selecteur).waitFor({ timeout: 60000 }).catch(() => ko(`CDN coupés écran ${n + 1}: le dessin 2D n'est pas revenu (${selecteur})`));
    if (await page.locator(".visual-root.v3d, electro-3d").count()) ko(`CDN coupés écran ${n + 1}: le mode 3D est resté`);
    await pasDeDefilement(page, `CDN coupés écran ${n + 1}`);
  }
  const inattendues = erreurs.filter((e) => !/ERR_|Failed to load resource|dynamically imported|net::/i.test(e));
  if (inattendues.length) ko(`CDN coupés: ${inattendues.join(" | ")}`);
  if (dehors.length) ko(`CDN coupés: requêtes inattendues ${dehors.join(", ")}`);
  await context.close();
}

/* ------------------------------------------------------------------ PASSE D : modes dégradés */
console.log("\n##### D · sans stockage ni synthèse vocale #####");
{
  const degraded = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await degraded.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("stockage bloqué pour le test"); } });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: undefined });
  });
  const page = await degraded.newPage();
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(e.message));
  await page.goto(URL_FILE, { waitUntil: "load" });
  if ((await page.locator(".step-button").count()) !== 14) ko("mode dégradé: parcours indisponible");
  if (!(await page.locator("#voice-button").isDisabled())) ko("mode dégradé: bouton vocal non désactivé");
  if (erreurs.length) ko(`mode dégradé: ${erreurs.join(" | ")}`);
  await degraded.close();
}

await browser.close();
if (echecs.length) {
  console.error("\n" + echecs.length + " échec(s) :\n" + echecs.join("\n"));
  process.exit(1);
}
console.log(`\nQA OK — 14 écrans × ${FORMATS.length} formats en 3D, repli 2D (file:// et CDN coupés), 3D jouée en détail, modes dégradés.`);
