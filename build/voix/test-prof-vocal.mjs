import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "acorn";

const source = await readFile(new URL("../../moteur/prof-vocal.js", import.meta.url), "utf8");
const corpus = JSON.parse(await readFile(new URL("./corpus.json", import.meta.url), "utf8"));
const pages = [
  "../../packs/fluides/res/bilan-thermique-performance-interactif/index.html",
  "../../packs/fluides/res/chaine-intervention-interactive/index.html",
  "../../packs/fluides/res/chaleur-circuit-interactif/index.html",
  "../../packs/fluides/res/chaleur-interactive/index.html",
  "../../packs/fluides/res/circuit-organe-par-organe/index.html",
  "../../packs/fluides/res/condenseur-interactif/index.html",
  "../../packs/fluides/res/cours-classes-securite/index.html",
  "../../packs/fluides/res/etancheite-interactive/index.html",
  "../../packs/fluides/res/evaporateur-interactif/index.html",
  "../../packs/fluides/res/frise-vivante/frise-vivante.html",
  "../../packs/fluides/res/hydrocarbures-a1-a2/index.html",
  "../../packs/fluides/res/intervention-hydrocarbures-interactive/index.html",
  "../../packs/fluides/res/mission-bouteilles/index.html",
  "../../packs/fluides/res/nomenclature-interactive/index.html",
  "../../packs/fluides/res/pression-temperature-interactive/index.html",
  "../../packs/fluides/res/tome-3-technologie-organes/index.html"
];

parse(source, { ecmaVersion: "latest", sourceType: "script" });
assert.doesNotMatch(source, /SpeechRecognition|getUserMedia|localStorage|sessionStorage/,
  "le mode professeur ne doit demander ni microphone ni consentement permanent");
assert.match(source, /Avez-vous compris cette correction/);
assert.match(source, /Réalisez l'activité affichée/);
assert.match(source, /#f7f1e7|#fffdf8/i);
assert.match(source, /@media print/);

for (const page of pages) {
  const html = await readFile(new URL(page, import.meta.url), "utf8");
  const voice = html.indexOf("moteur/voix.js");
  const professor = html.indexOf("moteur/prof-vocal.js");
  assert.ok(voice >= 0, `moteur vocal absent : ${page}`);
  assert.ok(professor > voice, `contrôleur professeur absent ou mal ordonné : ${page}`);
}

const corpusTexts = new Set(corpus.narrations.map(item => item.texte));
const replies = [...source.matchAll(/narration:\s*("(?:[^"\\]|\\.)*")/g)].map(match => JSON.parse(match[1]));
assert.equal(replies.length, 10, "le catalogue des répliques professeur a changé sans test");
for (const reply of replies) assert.ok(corpusTexts.has(reply), `réplique absente du corpus : ${reply}`);

console.log(`Mode professeur vocal : ${pages.length} tutoriels et ${replies.length} répliques de dialogue validés.`);
