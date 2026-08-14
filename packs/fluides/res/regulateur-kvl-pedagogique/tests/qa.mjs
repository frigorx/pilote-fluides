import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "..");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const targetUrl = pathToFileURL(path.join(projectRoot, "index.html")).href;
const viewports = [
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1280x720", width: 1280, height: 720 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "390x844", width: 390, height: 844 },
  { name: "360x640", width: 360, height: 640 }
];

const browser = await chromium.launch({ headless: true, executablePath: edgePath });
const failures = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  const remoteRequests = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
  page.on("request", (request) => { if (/^https?:/i.test(request.url())) remoteRequests.push(request.url()); });
  await page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: undefined });
    Storage.prototype.getItem = () => { throw new Error("stockage bloqué pour le test"); };
    Storage.prototype.setItem = () => { throw new Error("stockage bloqué pour le test"); };
  });
  await page.goto(targetUrl, { waitUntil: "load" });

  const stepCount = await page.locator(".step-button").count();
  if (stepCount !== 14) failures.push(`${viewport.name}: ${stepCount} étapes au lieu de 14`);
  if (!(await page.locator("#voice-button").isDisabled())) failures.push(`${viewport.name}: commande vocale active sans API vocale`);
  if (await page.locator("img[src^='http'], image[href^='http'], script[src^='http'], link[href^='http']").count()) failures.push(`${viewport.name}: ressource distante intégrée`);

  for (let step = 0; step < stepCount; step += 1) {
    await page.locator(`[data-step="${step}"]`).click();
    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const boxes = [".app-shell", ".course-grid", ".lesson", ".lesson-copy", ".visual-card", ".visual-root", ".bottom-nav"]
        .map((selector) => {
          const element = document.querySelector(selector);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { selector, left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, scrollWidth: element.scrollWidth, clientWidth: element.clientWidth, scrollHeight: element.scrollHeight, clientHeight: element.clientHeight };
        }).filter(Boolean);
      return { viewport: { width: innerWidth, height: innerHeight }, document: { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, scrollHeight: root.scrollHeight, clientHeight: root.clientHeight }, boxes };
    });
    if (metrics.document.scrollWidth > metrics.document.clientWidth + 1 || metrics.document.scrollHeight > metrics.document.clientHeight + 1) failures.push(`${viewport.name} étape ${step + 1}: document déborde ${JSON.stringify(metrics.document)}`);
    for (const box of metrics.boxes) {
      if (box.left < -1 || box.top < -1 || box.right > metrics.viewport.width + 1 || box.bottom > metrics.viewport.height + 1) failures.push(`${viewport.name} étape ${step + 1}: ${box.selector} hors écran ${JSON.stringify(box)}`);
      if (box.scrollWidth > box.clientWidth + 1 || box.scrollHeight > box.clientHeight + 1) failures.push(`${viewport.name} étape ${step + 1}: ${box.selector} contenu tronqué ${JSON.stringify(box)}`);
    }
  }

  await page.locator('[data-step="0"]').click();
  await page.locator('[data-view="labels"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Repères visibles")) failures.push(`${viewport.name}: repères extérieurs absents`);

  await page.locator('[data-step="1"]').click();
  await page.locator("#locate-kvl").click();
  if (!((await page.locator(".kvl-location").getAttribute("class")) || "").includes("is-focused")) failures.push(`${viewport.name}: KVL non repéré dans le circuit`);

  await page.locator('[data-step="2"]').click();
  await page.locator('[data-start="defrost"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Après dégivrage")) failures.push(`${viewport.name}: cas dégivrage absent`);

  await page.locator('[data-step="3"]').click();
  await page.locator('[data-direction="reverse"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("À corriger")) failures.push(`${viewport.name}: sens inversé non signalé`);

  await page.locator('[data-step="4"]').click();
  if (await page.locator(".cut-body").count() !== 1 || await page.locator(".cut-cavity").count() !== 1) failures.push(`${viewport.name}: convention de coupe absente`);
  await page.locator('[data-part="bellows"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Soufflet d’égalisation")) failures.push(`${viewport.name}: soufflet non expliqué`);

  await page.locator('[data-step="5"]').click();
  await page.locator('[data-target="entry"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Ce n’est pas la consigne")) failures.push(`${viewport.name}: pression d'entrée non corrigée`);
  await page.locator('[data-target="outlet"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Bonne grandeur")) failures.push(`${viewport.name}: pression de sortie non validée`);

  await page.locator('[data-step="6"]').click();
  await page.locator('[data-pressure="high"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("limiter")) failures.push(`${viewport.name}: limitation à pression élevée absente`);

  await page.locator('[data-step="7"]').click();
  await page.locator('[data-equal="entry-change"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("soufflet d’égalisation")) failures.push(`${viewport.name}: égalisation absente`);

  await page.locator('[data-step="8"]').click();
  await page.locator("#outlet-pressure").fill("4.4");
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("limitation")) failures.push(`${viewport.name}: bande P non interactive`);

  await page.locator('[data-step="9"]').click();
  for (const key of ["identify", "measure", "adjust", "verify"]) await page.locator(`[data-method="${key}"]`).click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Méthode complète")) failures.push(`${viewport.name}: méthode de réglage incomplète`);

  await page.locator('[data-step="10"]').click();
  if (!((await page.locator(".product-data").textContent()) || "").includes("034L0046")) failures.push(`${viewport.name}: référence produit absente`);
  await page.locator('[data-selection="criteria"]').click();
  for (const key of ["fluid", "capacity", "liquid", "suction", "pressure", "connection"]) await page.locator(`[data-criterion="${key}"]`).click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("6/6 critères")) failures.push(`${viewport.name}: sélection incomplète`);

  await page.locator('[data-step="11"]').click();
  await page.locator('[data-phase="commission"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("mise en service")) failures.push(`${viewport.name}: mise en service absente`);

  await page.locator('[data-step="12"]').click();
  await page.locator('[data-diagnosis="restriction"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Aspiration trop limitée")) failures.push(`${viewport.name}: diagnostic restriction absent`);
  await page.locator('[data-diagnosis="hunting"]').click();
  if (!((await page.locator("#visual-readout").textContent()) || "").includes("Régulation instable")) failures.push(`${viewport.name}: diagnostic instabilité absent`);

  await page.locator('[data-step="13"]').click();
  for (const answer of [1, 2, 0, 1, 2, 0, 2]) {
    await page.locator(`[data-answer="${answer}"]`).click();
    await page.locator("#next-question").click();
  }
  if ((await page.locator(".quiz-score").textContent())?.trim() !== "7/7") failures.push(`${viewport.name}: score final incorrect`);
  if (await page.locator("#next-button").isDisabled()) failures.push(`${viewport.name}: reprise finale verrouillée`);

  await page.locator("#source-button").click();
  if (!(await page.locator("#sources-dialog").evaluate((element) => element.open))) failures.push(`${viewport.name}: dialogue Sources fermé`);
  await page.locator(".close-button").click();

  await page.locator('[data-step="0"]').click();
  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press("ArrowRight");
  if ((await page.locator("#lesson-kicker").textContent())?.includes("Écran 2") !== true) failures.push(`${viewport.name}: navigation clavier droite absente`);
  await page.keyboard.press("ArrowLeft");
  if ((await page.locator("#lesson-kicker").textContent())?.includes("Écran 1") !== true) failures.push(`${viewport.name}: navigation clavier gauche absente`);

  if (remoteRequests.length) failures.push(`${viewport.name}: requêtes distantes ${remoteRequests.join(", ")}`);
  if (errors.length) failures.push(`${viewport.name}: ${errors.join(" | ")}`);
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`QA OK — 14 étapes × ${viewports.length} formats, activités, quiz, clavier, voix absente, stockage bloqué et mode hors ligne.`);
