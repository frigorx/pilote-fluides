/* =====================================================================
   qa.mjs — contrôle navigateur de la gare 6 « Le détendeur électronique »
   ---------------------------------------------------------------------
   Usage :  node packs/fluides/res/detendeur-electronique/tests/qa.mjs [url]
            url par défaut : http://localhost:8794/packs/fluides/res/detendeur-electronique/index.html
   Variables : CAPTURES=<dossier>  enregistre des PNG ; PLAYWRIGHT_DIR=<dossier du projet qui a playwright>
   (Playwright n'est installé que dans C:\git\hydrometro\node_modules ; Edge est forcé.)
   Contrôle, à 1366×768 et 390×844 : console sans erreur · aucune requête hors du site · pas de défilement
   de la page · texte du cours ≥ 14 pt (18,7 px) · étiquettes des dessins ≥ 13 px · aucune étiquette posée sur
   un tracé (rendu sans l'étiquette, on compte les pixels foncés dessous) · chaque animation bouge · chaque
   pas à pas se joue (légende, étape courante) · l'exercice « régler la consigne » (− et +, stabilisation, trois
   zones : trop basse, juste, trop haute ; l'écran du régulateur et la pastille « exemple ») · le quiz (5/6) ·
   le clavier · le badge référentiel · la version imprimable · aucun mot interdit
   (la requête média qui réclame animations.js) dans les fichiers de la gare.
   ===================================================================== */
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(path.join(process.env.PLAYWRIGHT_DIR || "C:/git/hydrometro", "package.json"));
const { chromium } = require("playwright");
const URL_ = process.argv[2] || "http://localhost:8794/packs/fluides/res/detendeur-electronique/index.html";
const ORIGINE = new URL(URL_).origin;
const OUT = process.env.CAPTURES || "";
if (OUT) fs.mkdirSync(OUT, { recursive: true });
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const VUES = [{ nom: "1366x768", width: 1366, height: 768 }, { nom: "390x844", width: 390, height: 844 }];
const NB = 5;                                              // nombre d'écrans
const PAS = { 2: 6, 3: 5 };                                // écrans à pas à pas : nombre d'étapes
const ANIMES = [1, 4];                                     // écrans animés sans boutons de pas à pas
const BONNES = [1, 0, 2, 1, 2, 0];                         // bonnes réponses du quiz
const echecs = [], notes = [];
const ko = (msg) => { echecs.push(msg); console.log("  ÉCHEC", msg); };

// ----- le mot interdit : la requête média qui fait réclamer moteur/animations.js à toute la famille -----
const dossier = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const motInterdit = ["prefers-reduced" + "-motion", "reduced" + "-motion"];
for (const f of fs.readdirSync(dossier)) {
  const chemin = path.join(dossier, f);
  if (fs.statSync(chemin).isFile() && /\.(js|css|html|json|md)$/.test(f)) {
    const txt = fs.readFileSync(chemin, "utf8");
    motInterdit.forEach(m => { if (txt.includes(m)) ko(`${f} contient « ${m} »`); });
  }
}

const browser = await chromium.launch({ headless: true, executablePath: EDGE });
const analyse = await browser.newPage();                  // page de service : lit les pixels d'une capture
await analyse.goto("about:blank");

async function pixelsFonces(png, boites) {
  return analyse.evaluate(async ({ b64, boites }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0);
    return boites.map(b => {
      const px = x.getImageData(Math.max(0, Math.floor(b.x)), Math.max(0, Math.floor(b.y)), Math.max(1, Math.ceil(b.w)), Math.max(1, Math.ceil(b.h))).data;
      let n = 0; for (let i = 0; i < px.length; i += 4) if (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2] < 205) n++;
      return n;
    });
  }, { b64: png.toString("base64"), boites });
}

for (const vue of VUES) {
  console.log("\n=== " + vue.nom + " ===");
  const page = await browser.newPage({ viewport: { width: vue.width, height: vue.height } });
  const erreurs = [], dehors = [];
  page.on("pageerror", e => erreurs.push("pageerror: " + e.message));
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") erreurs.push(m.type() + ": " + m.text()); });
  page.on("requestfailed", r => erreurs.push("requête échouée : " + r.url()));
  page.on("response", r => { if (r.status() >= 400) erreurs.push("HTTP " + r.status() + " " + r.url()); });
  page.on("request", r => { if (!r.url().startsWith(ORIGINE) && !r.url().startsWith("data:") && !r.url().startsWith("blob:")) dehors.push(r.url()); });
  const pasDefilement = async (qui) => {
    const m = await page.evaluate(() => { const r = document.documentElement; return { sw: r.scrollWidth, cw: r.clientWidth, sh: r.scrollHeight, ch: r.clientHeight }; });
    if (m.sw > m.cw + 1 || m.sh > m.ch + 1) ko(`${vue.nom} ${qui} : la page défile ${JSON.stringify(m)}`);
  };
  const cap = async (nom) => { if (OUT) await page.screenshot({ path: path.join(OUT, `${vue.nom}-${nom}.png`) }); };
  const empreinte = (sel) => page.evaluate((s) => { const t = [...document.querySelectorAll(s)].map(x => x.innerHTML).join(""); let h = 5381; for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0; return h; }, sel);

  // ----- sommaire -----
  await page.goto(URL_, { waitUntil: "load" });
  await page.waitForTimeout(900);
  await pasDefilement("sommaire");
  await cap("sommaire");
  const a1 = await empreinte("#scene-accueil svg"); await page.waitForTimeout(500); const a2 = await empreinte("#scene-accueil svg");
  if (a1 === a2) ko(`${vue.nom} sommaire : le dessin ne bouge pas`);
  const badge = await page.evaluate(() => { const b = document.querySelector("#marque-inerweb .marque-referentiel"); return b ? b.textContent : ""; });
  if (!/9\.01/.test(badge) || !/9\.03/.test(badge)) ko(`${vue.nom} badge référentiel absent (« ${badge} »)`);
  await page.locator("#sources-button").click();
  const src = await page.locator("#sources-dialog").textContent();
  if (!/bibliothèque inerWeb/.test(src) || !/2024\/2215/.test(src) || !/CC BY 3\.0/.test(src)) ko(`${vue.nom} Sources : citation du référentiel, de la bibliothèque ou de la licence QElectroTech absente`);
  await page.locator("#sources-close").click();
  if (await page.locator(".dossier-button").count() !== NB && vue.width > 650) ko(`${vue.nom} le sommaire n'a pas ${NB} boutons`);

  // ----- chaque écran -----
  for (let n = 1; n <= NB; n++) {
    await page.goto(URL_ + "?ecran=" + n, { waitUntil: "load" });
    await page.waitForTimeout(800);
    const titre = await page.locator("#lesson-title").textContent();
    const kicker = await page.locator("#lesson-kicker").textContent();
    if (!kicker.includes("· " + n)) ko(`${vue.nom} écran ${n} : kicker « ${kicker} »`);
    if (!(await page.locator("#reference-box").textContent()).includes("référentiel")) ko(`${vue.nom} écran ${n} : référentiel absent`);

    // les pas à pas : chaque étape se joue
    if (PAS[n]) {
      const nb = await page.locator(".ds-etape").count();
      if (nb !== PAS[n]) ko(`${vue.nom} écran ${n} : ${nb} étapes au lieu de ${PAS[n]}`);
      for (let k = 0; k < nb; k++) {
        await page.locator(`.ds-etape[data-etape="${k}"]`).click();
        const a = await empreinte(".ds-dessin svg.ds-svg"); await page.waitForTimeout(450); const b = await empreinte(".ds-dessin svg.ds-svg");
        if (a === b) ko(`${vue.nom} écran ${n} étape ${k + 1} : le dessin ne bouge pas`);
        const leg = await page.locator(".ds-legende").textContent();
        if (!leg.startsWith(`${k + 1} · `)) ko(`${vue.nom} écran ${n} étape ${k + 1} : légende « ${leg.slice(0, 40)} »`);
        const cur = await page.locator('.ds-etape[aria-current="step"]').getAttribute("data-etape");
        if (Number(cur) !== k) ko(`${vue.nom} écran ${n} : étape courante ${cur} au lieu de ${k}`);
        if (k === 1 || k === nb - 1) await page.waitForTimeout(3600);   // l'étape arrive au bout
        await cap(`ecran${n}-etape${k + 1}`);
      }
      // ralenti et pause (on relance l'étape 1 : une scène arrivée au bout propose « Rejouer », pas « Pause »)
      await page.locator('.ds-etape[data-etape="0"]').click();
      await page.locator(".ds-ralenti").click();
      if ((await page.locator(".ds-ralenti").getAttribute("aria-pressed")) !== "true") ko(`${vue.nom} écran ${n} : ralenti sans effet`);
      await page.locator(".ds-ralenti").click();
      await page.locator(".ds-lecture").click();
      const gele = await page.evaluate(() => document.querySelector(".ds-lecture").getAttribute("aria-pressed"));
      if (gele !== "false") ko(`${vue.nom} écran ${n} : pause sans effet`);
      const p1 = await empreinte(".ds-dessin svg.ds-svg"); await page.waitForTimeout(400); const p2 = await empreinte(".ds-dessin svg.ds-svg");
      if (p1 !== p2) ko(`${vue.nom} écran ${n} : le dessin bouge malgré la pause`);
      await page.locator(".ds-lecture").click();
    } else if (ANIMES.includes(n)) {
      const a = await empreinte(".ds-svg"); await page.waitForTimeout(500); const b = await empreinte(".ds-svg");
      if (a === b) ko(`${vue.nom} écran ${n} : le dessin ne bouge pas`);
    }

    // l'écran 1 : la visite guidée change de légende, les trois acteurs, « il règle »
    if (n === 1) {
      const v1 = await page.locator(".ds-explic").textContent(); await page.waitForTimeout(3700); const v2 = await page.locator(".ds-explic").textContent();
      if (v1 === v2) ko(`${vue.nom} écran 1 : la visite guidée ne change pas de légende`);
      if (!/électronique/.test(await page.locator(".el-carte .ds-cel-tete").textContent())) ko(`${vue.nom} écran 1 : titre de la carte`);
      if ((await page.locator(".el-acteur").count()) !== 3) ko(`${vue.nom} écran 1 : trois acteurs attendus`);
      if ((await page.locator(".el-acteur.actif").count()) !== 1) ko(`${vue.nom} écran 1 : un acteur doit être allumé`);
      { const rg = await page.locator(".ds-regle").textContent(); if (!rg.includes("la surchauffe") || !rg.includes("calculée")) ko(`${vue.nom} écran 1 : « il règle » absent`); }
      const imgs = await page.evaluate(() => [...document.querySelectorAll(".el-carte img")].map(i => i.complete && i.naturalWidth > 0));
      if (!imgs.length || imgs.some(x => !x)) ko(`${vue.nom} écran 1 : un symbole ne se charge pas`);
    }
    // l'écran 2 : l'écran du régulateur (surchauffe, consigne, exemple) et les étiquettes
    if (n === 2) {
      const tx = await page.evaluate(() => [...document.querySelectorAll(".ds-dessin svg.el-svg text")].map(t => t.textContent.trim()));
      ["surchauffe", "consigne", "exemple", "régulateur", "vanne", "sondes", "HP", "BP"].forEach(m => { if (!tx.includes(m)) ko(`${vue.nom} écran 2 : « ${m} » absent du dessin`); });
      if (!tx.some(t => /^\d+ K$/.test(t))) ko(`${vue.nom} écran 2 : aucune surchauffe affichée sur le régulateur`);
    }
    // l'écran 3 : deux vannes (côte à côte, ou en onglets sur petit écran)
    if (n === 3 && (await page.locator(".el-cel").count()) !== 2) ko(`${vue.nom} écran 3 : deux vannes attendues`);

    await pasDefilement(`écran ${n} (${titre})`);

    // texte du cours ≥ 14 pt ; étiquettes des dessins ≥ 13 px
    const petits = await page.evaluate(() => {
      const sortie = [], exclus = ".reference-box,.eyebrow,.lesson-tools,.lesson-footer,.status-message,.course-rail,.appbar,#marque-inerweb,#pilote-prof-vocal,#lisib-bouton,#lisib-panneau";
      document.querySelectorAll(".lesson-content *").forEach(e => {
        if (e.closest(exclus) || e.closest(".ds-fond") || e.closest("svg") && e.tagName.toLowerCase() !== "text") return;
        const r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
        const st = getComputedStyle(e); if (st.visibility === "hidden" || st.display === "none") return;
        if (e.tagName.toLowerCase() === "text") {
          const m = e.getScreenCTM ? e.getScreenCTM() : null, k = m ? Math.hypot(m.a, m.b) : 1, px = parseFloat(st.fontSize) * k;
          if (px < 13) sortie.push(`étiquette « ${e.textContent.trim()} » ${px.toFixed(1)} px`);
          return;
        }
        const direct = [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
        if (!direct) return;
        if (parseFloat(st.opacity) === 0) return;
        const px = parseFloat(st.fontSize);
        if (px < 18.6) sortie.push(`« ${[...e.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(" ").slice(0, 36)} » ${px.toFixed(1)} px (${e.tagName.toLowerCase()}.${e.className})`);
      });
      return sortie;
    });
    petits.forEach(t => ko(`${vue.nom} écran ${n} : texte trop petit : ${t}`));

    // une étiquette posée sur un tracé : on la cache, on regarde dessous
    const sel = ".ds-dessin svg.ds-svg";
    const boites = await page.evaluate((sel) => {
      const res = [];
      document.querySelectorAll(sel).forEach(svg => {
        if (!svg.getClientRects().length) return;
        svg.querySelectorAll("text").forEach(t => {
          if (t.closest(".ds-fond") || t.closest("defs")) return;
          const g = t.parentElement && t.parentElement.children.length === 2 && t.parentElement.querySelector(":scope > rect") ? t.parentElement : t;
          const r = g.getBoundingClientRect(); if (!r.width) return;
          if (parseFloat(getComputedStyle(t).opacity) < 0.5 && parseFloat(g.getAttribute("opacity") || 1) < 0.5) return;
          res.push({ nom: t.textContent.trim(), x: r.left - 2, y: r.top - 2, w: r.width + 4, h: r.height + 4 });
        });
      });
      return res;
    }, sel);
    if (boites.length) {
      await page.evaluate((sel) => {
        document.querySelectorAll(sel).forEach(svg => {
          svg.querySelectorAll("text").forEach(t => { const g = t.parentElement && t.parentElement.children.length === 2 && t.parentElement.querySelector(":scope > rect") ? t.parentElement : t; g.setAttribute("data-qa-cache", "1"); g.style.visibility = "hidden"; });
          svg.querySelectorAll('rect[stroke="#ff6b35"],circle[stroke="#ff6b35"]').forEach(r => { r.setAttribute("data-qa-cache", "1"); r.style.visibility = "hidden"; });
        });
      }, sel);
      const png = await page.screenshot();
      const dpr = await page.evaluate(() => devicePixelRatio);
      const n_ = await pixelsFonces(png, boites.map(b => ({ x: b.x * dpr, y: b.y * dpr, w: b.w * dpr, h: b.h * dpr })));
      boites.forEach((b, i) => { if (n_[i] > 14) ko(`${vue.nom} écran ${n} : l'étiquette « ${b.nom} » est posée sur un tracé (${n_[i]} px foncés dessous)`); });
      await page.evaluate(() => document.querySelectorAll("[data-qa-cache]").forEach(e => { e.style.visibility = ""; e.removeAttribute("data-qa-cache"); }));
    }
    await cap(`ecran${n}`);
  }

  // ----- l'exercice (écran 4) : − et +, la stabilisation, trois zones, l'écran du régulateur -----
  await page.goto(URL_ + "?ecran=4", { waitUntil: "load" });
  await page.waitForTimeout(900);
  const retour = async () => ({ cls: await page.locator("#feedback").getAttribute("class"), txt: await page.locator("#feedback").textContent() });
  const valeur = async () => (await page.locator("#el-valeur").textContent()).replace(/\s+/g, " ");
  const ecranReg = async () => page.evaluate(() => [...document.querySelectorAll(".ds-dessin svg.el-svg text")].map(t => t.textContent.trim()).filter(s => /^\d+ K$/.test(s)));
  const cliquer = async (id, n) => { for (let i = 0; i < n; i++) await page.locator(id).click(); };
  if (!/16 K/.test(await valeur()) || !/exemple/.test(await valeur())) ko(`${vue.nom} exercice : consigne de départ « ${await valeur()} » (16 K exemple attendu)`);
  let r = await retour();
  if (!r.txt.includes("Consigne de départ")) ko(`${vue.nom} exercice : message de départ absent`);
  { const e0 = await ecranReg(); if (e0[0] !== "16 K" || e0[1] !== "16 K") ko(`${vue.nom} exercice : l'écran du régulateur devrait afficher 16 K et 16 K au départ (${e0})`); }
  await cap("exercice-depart");
  // 16 → 7 : bonne zone ; juste après le clic, le système n'est pas stabilisé
  await cliquer("#el-moins", 9);
  r = await retour();
  if (!r.txt.includes("stabiliser") || r.cls.includes("good") || r.cls.includes("bad")) ko(`${vue.nom} exercice : juste après le clic, on attend la stabilisation (« ${r.txt.slice(0, 50)} »)`);
  await page.waitForTimeout(1500); await cap("exercice-en-cours");
  await page.waitForTimeout(4200);
  r = await retour();
  if (!r.cls.includes("good") || !r.txt.includes("Bien réglé")) ko(`${vue.nom} exercice : 7 K devrait être « bien réglé » (${r.cls} / ${r.txt.slice(0, 50)})`);
  if (!/7 K/.test(await valeur())) ko(`${vue.nom} exercice : valeur « ${await valeur()} »`);
  { const e1 = await ecranReg(); if (e1[0] !== "7 K") ko(`${vue.nom} exercice : surchauffe stabilisée à 7 K attendue (${e1})`); }
  await cap("exercice-juste");
  // 7 → 2 : trop basse, la nappe arrive jusqu'aux sondes
  await cliquer("#el-moins", 5);
  await page.waitForTimeout(5200);
  r = await retour();
  if (!r.cls.includes("bad") || !r.txt.includes("trop basse") || !r.txt.includes("compresseur")) ko(`${vue.nom} exercice : 2 K devrait être « trop basse » (${r.cls} / ${r.txt.slice(0, 50)})`);
  await cap("exercice-bas");
  // 2 → 16 : trop haute, nappe courte
  await cliquer("#el-plus", 14);
  await page.waitForTimeout(5500);
  r = await retour();
  if (!r.cls.includes("bad") || !r.txt.includes("trop haute")) ko(`${vue.nom} exercice : 16 K devrait être « trop haute » (${r.cls} / ${r.txt.slice(0, 50)})`);
  await cap("exercice-haut");
  // bornes : le bouton + se bloque à 20 (16 + 4)
  await cliquer("#el-plus", 4);
  if (!(await page.locator("#el-plus").isDisabled())) ko(`${vue.nom} exercice : le bouton + doit se bloquer à 20 K`);
  await pasDefilement("exercice fini");

  // ----- le quiz (écran 5) : 6 questions, une erreur voulue → 5 / 6 -----
  await page.goto(URL_ + "?ecran=5", { waitUntil: "load" });
  await page.waitForTimeout(500);
  for (let q = 0; q < 6; q++) {
    const choix = q === 1 ? (BONNES[1] === 0 ? 1 : 0) : BONNES[q];
    await page.locator(`[data-quiz-choice="${choix}"]`).click();
    const cls = await page.locator("#feedback").getAttribute("class");
    if ((q === 1) !== cls.includes("bad")) ko(`${vue.nom} quiz q${q + 1} : retour ${cls}`);
    if ((await page.locator("#feedback").textContent()).length < 40) ko(`${vue.nom} quiz q${q + 1} : explication trop courte`);
    if (q === 0) await cap("quiz-q1");
    if (q === 1) await cap("quiz-faux");
    await pasDefilement(`quiz q${q + 1}`);
    await page.locator("#quiz-next").click();
  }
  const score = await page.locator(".score-number").textContent();
  if (score.trim() !== "5 / 6") ko(`${vue.nom} quiz : score « ${score} »`);
  if (!(await page.locator(".score-texte").textContent()).includes("Bravo")) ko(`${vue.nom} quiz : message final`);
  await cap("quiz-fin");

  // ----- clavier, voix, impression -----
  await page.goto(URL_, { waitUntil: "load" });
  await page.locator("#start-button").click();
  await page.keyboard.press("ArrowRight");
  if (!(await page.locator("#rail-progress").textContent()).includes("2 / 5")) ko(`${vue.nom} clavier : ArrowRight ne passe pas à l'écran 2`);
  await page.keyboard.press("ArrowLeft");
  await page.locator("#listen").click(); await page.waitForTimeout(300); await page.locator("#stop-voice").click({ force: true }).catch(() => {});
  await page.emulateMedia({ media: "print" });
  const impr = await page.evaluate(() => ({ livre: getComputedStyle(document.querySelector("#print-book")).display, barre: getComputedStyle(document.querySelector(".appbar")).display, n: document.querySelectorAll(".print-screen").length, txt: document.querySelector("#print-book").textContent }));
  if (impr.livre !== "block" || impr.barre !== "none" || impr.n !== NB + 1) ko(`${vue.nom} impression : ${JSON.stringify({ livre: impr.livre, barre: impr.barre, n: impr.n })}`);
  if (!/9\.01/.test(impr.txt) || !/9\.03/.test(impr.txt) || !/Correction/.test(impr.txt)) ko(`${vue.nom} impression : codes ou corrections absents`);
  await page.emulateMedia({ media: "screen" });

  if (erreurs.length) erreurs.forEach(e => ko(`${vue.nom} console : ${e}`));
  if (dehors.length) dehors.forEach(u => ko(`${vue.nom} requête hors du site : ${u}`));
  await page.close();
}
await browser.close();

console.log("\n" + (echecs.length ? `${echecs.length} échec(s)` : "QA : tout passe") + (notes.length ? "\nnotes : " + notes.join(" ; ") : ""));
process.exit(echecs.length ? 1 : 0);
