import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { ALL_IDS, CORE_IDS, MODULES } from "../src/modules.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let checks = 0;

function check(condition, message) {
  checks += 1;
  assert.ok(condition, message);
}

async function text(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function compileInlineScripts(html, label) {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  check(scripts.length >= 2, `${label} contient les scripts intégrés attendus`);
  for (const [index, match] of scripts.entries()) {
    new vm.Script(match[1], { filename: `${label}:script-${index + 1}` });
  }
}

function checkOffline(html, label) {
  check(!/(?:src|href)\s*=\s*["']https?:/i.test(html), `${label} ne charge aucune dépendance distante`);
  check(!/data:image\//i.test(html), `${label} ne contient pas d’image base64 opaque`);
  check(!/cdn|fonts\.googleapis|manufacturer/i.test(html), `${label} ne dépend ni d’un CDN ni du visuel constructeur écarté`);
}

check(MODULES.length === 10, "10 modules sont définis");
check(CORE_IDS.length === 8, "8 modules composent le préréglage habilitation");
check(ALL_IDS.length === MODULES.length, "tous les modules sont exportés");
check(new Set(ALL_IDS).size === ALL_IDS.length, "les identifiants de modules sont uniques");
check(MODULES.every((module, index) => module.order === index + 1), "l’ordre pédagogique est continu");
check(MODULES.every((module) => module.goal && module.discover?.body && module.function?.terrain), "chaque module possède objectif, découverte et lien métier");
check(MODULES.every((module) => module.quiz?.length === 2), "chaque module possède deux questions");
check(MODULES.every((module) => module.quiz.every((question) => question.answer >= 0 && question.answer < question.choices.length)), "toutes les réponses de quiz sont valides");

const requiredSemantics = {
  isobare: ["pression", "horizontale"],
  isotherme: ["T reste constante", "température"],
  isochore: ["v reste constant", "volume massique"],
  isentrope: ["s reste constante", "entropie"],
  isenthalpe: ["h constante", "verticale"]
};
for (const [id, fragments] of Object.entries(requiredSemantics)) {
  const serialized = JSON.stringify(MODULES.find((module) => module.id === id));
  for (const fragment of fragments) check(serialized.includes(fragment), `${id} contient le repère « ${fragment} »`);
}

const expectedFiles = [
  "index.html",
  "cours-complet.html",
  "cours-habilitation.html",
  "cours-toutes-courbes.html",
  ...MODULES.map((module) => `modules-autonomes/${String(module.order).padStart(2, "0")}-${module.id}.html`)
];

for (const relativePath of expectedFiles) {
  const html = await text(relativePath);
  check(html.startsWith("<!doctype html>"), `${relativePath} possède un doctype`);
  checkOffline(html, relativePath);
  compileInlineScripts(html, relativePath);
}

const course = await text("cours-complet.html");
for (const token of [
  "#1b3a63", "#ff6b35", "#f4c542", "#84b7ec", "#7d4c9e",
  "100dvh", "aria-live=\"polite\"", "prefers-reduced-motion", "@media print",
  "speechRun", "visibilitychange", "beforeunload", "role=\"img\"",
  "voice.localService", "voiceScore(voice) >= 50"
]) {
  check(course.includes(token), `le parcours contient ${token}`);
}
check(!/print-color-adjust\s*:\s*exact/i.test(course), "l’impression ne force pas les aplats de couleur");
check(course.includes("aucune valeur ne doit être relevée"), "le schéma est clairement annoncé comme qualitatif");

for (const module of MODULES) {
  const relativePath = `modules-autonomes/${String(module.order).padStart(2, "0")}-${module.id}.html`;
  const html = await text(relativePath);
  const configMarker = `\"fixedIds\":[\"${module.id}\"]`;
  check(html.includes(configMarker), `${relativePath} est verrouillé sur son seul module`);
  const dataMarker = `window.__INERWEB_MODULES__ = [{\"id\":\"${module.id}\"`;
  check(html.includes(dataMarker), `${relativePath} n’embarque que sa brique pédagogique`);
}

const manifest = JSON.parse(await text("manifest.json"));
check(manifest.modules.length === 10, "le manifeste référence les 10 briques");
check(manifest.modules.filter((module) => module.inHabilitationPreset).length === 8, "le manifeste marque les 8 essentiels");

console.log(`QA statique réussie : ${checks} contrôles.`);
