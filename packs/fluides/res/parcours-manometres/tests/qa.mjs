import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const screenshots = path.join(here, "screenshots");
const require = createRequire(import.meta.url);
const dependencyRoot = process.env.CODEX_NODE_MODULES;
if (!dependencyRoot) throw new Error("Définir CODEX_NODE_MODULES vers le dossier node_modules fourni par Codex.");
const { chromium } = require(path.join(dependencyRoot, "playwright"));

const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = http.createServer(async (request, response) => {
  try {
    const requested = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = requested.endsWith("/") ? `${requested}index.html` : requested;
    const target = path.resolve(root, `.${relative}`);
    if (!target.startsWith(root)) throw new Error("Chemin interdit");
    const data = await fs.readFile(target);
    response.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(data);
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(String(error.message || error));
  }
});

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const clickNext = page => page.locator("#next").click();

async function assertFrame(page, label, expectedSteps) {
  const metrics = await page.evaluate(() => ({
    viewport: { w: innerWidth, h: innerHeight },
    body: { w: document.body.scrollWidth, h: document.body.scrollHeight },
    html: { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight },
    card: (() => { const r = document.querySelector(".lesson-card")?.getBoundingClientRect(); return r && { top: r.top, right: r.right, bottom: r.bottom, left: r.left, w: r.width, h: r.height }; })()
    ,debug: [".lesson-main", ".lesson-card", ".lesson-copy", ".scene", ".scene-grid", ".circuit-shell", ".panel"].map(selector => {
      const element = document.querySelector(selector); const r = element?.getBoundingClientRect(); const s = element && getComputedStyle(element);
      return r && { selector, left:r.left, right:r.right, width:r.width, minWidth:s.minWidth, grid:s.gridTemplateColumns, overflow:s.overflow };
    })
  }));
  assert(metrics.body.w <= metrics.viewport.w + 1 && metrics.html.w <= metrics.viewport.w + 1, `${label}: débordement horizontal`);
  assert(metrics.body.h <= metrics.viewport.h + 1 && metrics.html.h <= metrics.viewport.h + 1, `${label}: débordement vertical de page`);
  if (metrics.card) {
    assert(metrics.card.left >= -1 && metrics.card.right <= metrics.viewport.w + 1, `${label}: carte hors écran ${JSON.stringify(metrics)}`);
    assert(metrics.card.top >= -1 && metrics.card.bottom <= metrics.viewport.h + 1, `${label}: carte trop haute ${JSON.stringify(metrics.card)}`);
  }
  if (expectedSteps) assert(await page.locator(".progress-step").count() === expectedSteps, `${label}: progression incorrecte`);
}

async function assertNoHorizontalOverflow(page, label) {
  const widths = await page.evaluate(() => ({ viewport: innerWidth, body: document.body.scrollWidth, html: document.documentElement.scrollWidth }));
  assert(widths.body <= widths.viewport + 1 && widths.html <= widths.viewport + 1, `${label}: débordement horizontal ${JSON.stringify(widths)}`);
}

async function completeModule1(page, base) {
  await page.goto(`${base}/module-1-pression-temperature/`);
  await page.locator('.progress-step[data-step="10"]').click();
  assert((await page.locator("#step-status").textContent()).includes("11"), "Module 1: accès direct à une étape non visité impossible");
  await page.locator('.progress-step[data-step="0"]').click();
  await clickNext(page);
  for (const id of ["expansion", "compressor", "condenser", "evaporator"]) await page.locator(`[data-organ="${id}"]`).click();
  await clickNext(page);
  for (const id of ["compressor", "condenser", "expansion", "evaporator"]) {
    await page.locator(`[data-choice="${id}"]`).click();
    await clickNext(page);
  }
  await page.locator('[data-choice="hp"]').click();
  await clickNext(page);
  await clickNext(page);
  let pressure = 1;
  await page.locator("#answer-pressure").fill("1");
  await page.locator("#answer-temperature").fill("-10");
  await page.locator("#check-reading").click();
  await clickNext(page);
  pressure = await page.evaluate(() => {
    const exact = ThermoCore.pressureGaugeAtTemperature("R134a", 40, "bubble");
    return Math.round(exact / .4) * .4;
  });
  await page.locator("#answer-pressure").fill(String(pressure));
  await page.locator("#answer-temperature").fill("40");
  await page.locator("#check-reading").click();
  await clickNext(page);
  await page.locator("#fluid-choice").selectOption("R404A");
  await page.locator('[data-observe="pressure-no"]').click();
  await page.locator('[data-observe="temperature-yes"]').click();
  assert(await page.locator("#reciprocity").isVisible(), "Module 1: réciprocité P/T non affichée");
  await clickNext(page);
  await page.locator("#absolute-answer").fill("3,21");
  await page.locator("#absolute-check").click();
  await clickNext(page);
  const cases = [
    ["R134a", -10, "dew", .5], ["R404A", 0, "dew", 1], ["R32", 0, "dew", 1],
    ["R134a", 40, "bubble", 2], ["R410A", 40, "bubble", 2], ["R407C", 40, "bubble", 2]
  ];
  for (const [fluid, temperature, phase, major] of cases) {
    pressure = await page.evaluate(([f, t, p, m]) => {
      const exact = ThermoCore.pressureGaugeAtTemperature(f, t, p);
      const step = m / 5;
      return Math.round(exact / step) * step;
    }, [fluid, temperature, phase, major]);
    await page.locator("#series-pressure").fill(String(pressure));
    await page.locator("#series-temperature").fill(String(temperature));
    await page.locator("#series-check").click();
    await page.locator("#series-check").click();
  }
  assert((await page.locator(".score-card strong").textContent()).trim() === "6/6", "Module 1: série de lecture non validée");
  await clickNext(page);
  await page.locator('[data-choice="R134a"]').click();
  await clickNext(page);
  await page.locator('[data-choice="suspect"]').click();
  await clickNext(page);
  assert((await page.locator("#step-status").textContent()).includes("16"), "Module 1: bilan non atteint");
}

async function completeModule2(page, base, capture = false) {
  await page.goto(`${base}/module-2-surchauffe-sous-refroidissement/`);
  await clickNext(page);
  for (const id of ["evapOutlet", "compressorInlet", "condenserOutlet", "expansionInlet"]) await page.locator(`[data-point="${id}"]`).click();
  await clickNext(page);
  const guided = [["evapOutlet", "6"], ["compressorInlet", "12"], ["condenserOutlet", "5"], ["expansionInlet", "8"]];
  for (const [point, answer] of guided) {
    await page.locator(`[data-point-choice="${point}"]`).click();
    await page.locator('[data-formula-choice="0"]').click();
    await page.locator("#calculation-answer").fill(answer);
    await page.locator("#calculation-check").click();
    await clickNext(page);
  }
  await page.locator('[data-choice="dew-bubble"]').click();
  await clickNext(page);
  for (const id of ["evapOutlet", "compressorInlet", "condenserOutlet", "expansionInlet"]) await page.locator(`[data-point="${id}"]`).click();
  await clickNext(page);
  if (capture) await page.screenshot({ path: path.join(screenshots, `module-2-mission-${page.viewportSize().width}x${page.viewportSize().height}.png`), fullPage: false });
  for (const [id, value] of [["shEvap", "6"], ["shTotal", "12"], ["scCond", "5"], ["scTotal", "8"]]) await page.locator(`#${id}`).fill(value);
  await page.locator("#mission-check").click();
  await clickNext(page);
  for (const correct of [0, 0, 1, 1, 1, 0, 2, 3, 0, 0]) {
    await page.locator(`[data-answer="${correct}"]`).click();
    await page.locator("#quiz-next").click();
  }
  assert((await page.locator(".score-card strong").textContent()).trim() === "20/20", "Module 2: évaluation non validée");
  await clickNext(page);
  assert((await page.locator("#step-status").textContent()).includes("11"), "Module 2: bilan non atteint");
  assert((await page.locator(".final-score strong").textContent()).trim() === "20/20", "Module 2: note absente du bilan");
  assert(await page.locator(".formula-summary article").count() === 4, "Module 2: quatre formules finales attendues");
  await assertFrame(page, `M2 bilan ${page.viewportSize().width}x${page.viewportSize().height}`, 11);
  if (capture) await page.screenshot({ path: path.join(screenshots, `module-2-bilan-${page.viewportSize().width}x${page.viewportSize().height}.png`), fullPage: false });
}

assert(screenshots.startsWith(`${root}${path.sep}`), "Dossier de captures hors du projet");
await fs.rm(screenshots, { recursive: true, force: true });
await fs.mkdir(screenshots, { recursive: true });
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
const browserExecutable = process.env.CODEX_BROWSER || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({ headless: true, executablePath: browserExecutable });
const errors = [];
const external = [];

try {
  for (const viewport of [{ width: 1024, height: 768 }, { width: 1366, height: 768 }, { width: 360, height: 640 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    page.on("pageerror", error => errors.push(`${viewport.width}x${viewport.height}: ${error.message}`));
    page.on("request", request => { if (!request.url().startsWith(base)) external.push(request.url()); });
    await page.goto(`${base}/`);
    await assertNoHorizontalOverflow(page, `Portail ${viewport.width}x${viewport.height}`);
    assert(await page.locator(".module-card").count() === 2, "Portail: deux modules attendus");
    assert(await page.locator(".brick-list a").count() === 5, "Portail: cinq briques attendues");
    if (viewport.width === 1366 || viewport.width === 360) await page.screenshot({ path: path.join(screenshots, `portail-${viewport.width}x${viewport.height}.png`), fullPage: true });
    await page.goto(`${base}/module-1-pression-temperature/`);
    await assertFrame(page, `M1 ${viewport.width}x${viewport.height}`, 16);
    await page.screenshot({ path: path.join(screenshots, `module-1-croix-${viewport.width}x${viewport.height}.png`), fullPage: false });
    if (viewport.width === 1366 || viewport.width === 360) {
      await page.locator('.progress-step[data-step="8"]').click();
      await assertFrame(page, `M1 cadran ${viewport.width}x${viewport.height}`, 16);
      await page.screenshot({ path: path.join(screenshots, `module-1-cadran-${viewport.width}x${viewport.height}.png`), fullPage: false });
    }
    await page.goto(`${base}/module-2-surchauffe-sous-refroidissement/`);
    await assertFrame(page, `M2 ${viewport.width}x${viewport.height}`, 11);
    if (viewport.width === 1024 || viewport.width === 360) await completeModule2(page, base, true);
    await page.close();
  }

  /* Les briques autonomes : mêmes étapes, servies séparément. On vérifie que
     chacune s'ouvre seule, sur la bonne tranche, sans erreur ni lien mort. */
  const BRIQUES = [
    ["circuit-quatre-organes", 7],
    ["lire-un-manometre", 6],
    ["diagnostic-pression-temperature", 2],
    ["surchauffe-sous-refroidissement", 7],
    ["mission-releve-et-calculs", 4]
  ];
  for (const [ident, etapes] of BRIQUES) {
    const page = await browser.newPage({ viewport: { width: 1366, height: 768 }, reducedMotion: "reduce" });
    page.on("pageerror", error => errors.push(`brique ${ident}: ${error.message}`));
    page.on("request", request => { if (!request.url().startsWith(base)) external.push(request.url()); });
    page.on("response", response => { if (response.status() >= 400) errors.push(`brique ${ident}: ${response.status()} sur ${response.url()}`); });
    await page.goto(`${base}/briques/${ident}/`);
    await assertFrame(page, `brique ${ident}`, etapes);
    assert(await page.locator("#lesson-title").innerText() !== "", `brique ${ident}: aucun titre affiché`);
    for (let i = 1; i < etapes; i += 1) await clickNext(page);
    await assertFrame(page, `brique ${ident} fin`, etapes);
    assert(await page.locator("#next").innerText() === "Brique terminée", `brique ${ident}: clôture incorrecte`);
    await page.close();
  }

  const journey = await browser.newPage({ viewport: { width: 1366, height: 768 }, reducedMotion: "reduce" });
  journey.on("pageerror", error => errors.push(`parcours: ${error.message}`));
  journey.on("request", request => { if (!request.url().startsWith(base)) external.push(request.url()); });
  await completeModule1(journey, base);
  await completeModule2(journey, base);
  const thermo = await journey.evaluate(() => ({
    r134a40: ThermoCore.pressureAtTemperature("R134a", 40, "dew"),
    r407cDew: ThermoCore.pressureAtTemperature("R407C", -10, "dew"),
    r407cBubble: ThermoCore.pressureAtTemperature("R407C", -10, "bubble"),
    inverse: ThermoCore.temperatureAtPressure("R134a", ThermoCore.pressureAtTemperature("R134a", 37.5, "dew"), "dew")
  }));
  assert(Math.abs(thermo.r134a40 - 10.16593) < 1e-5, "Table R134a à 40 °C incorrecte");
  assert(thermo.r407cBubble > thermo.r407cDew, "R407C: bulle et rosée non distinguées");
  assert(Math.abs(thermo.inverse - 37.5) < 1e-7, "Inversion P/T incorrecte");
  await journey.close();

  const directErrors = [];
  const direct = await browser.newPage({ viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" });
  direct.on("pageerror", error => directErrors.push(error.message));
  await direct.goto(pathToFileURL(path.join(root, "module-1-pression-temperature", "index.html")).href);
  assert(await direct.locator(".circuit-svg").count() === 1, "Ouverture directe: Croix absente");
  assert(await direct.locator(".circuit-svg image").count() === 4, "Ouverture directe: symboles absents");
  assert(directErrors.length === 0, `Ouverture directe: ${directErrors.join(" · ")}`);
  await direct.close();

  assert(errors.length === 0, `Erreurs JavaScript:\n${errors.join("\n")}`);
  assert(external.length === 0, `Requêtes externes détectées:\n${[...new Set(external)].join("\n")}`);
  console.log("QA OK · 2 parcours complets · 5 briques autonomes · 4 formats · 0 requête externe · 0 erreur JS");
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
