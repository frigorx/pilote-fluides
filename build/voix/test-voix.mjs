import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../../moteur/voix.js", import.meta.url), "utf8");
const corpus = JSON.parse(await readFile(new URL("./corpus.json", import.meta.url), "utf8"));
const pagesVocales = [
  "../../index.html",
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
  "../../packs/fluides/res/tome-3-technologie-organes/index.html",
];
const texteConnu = "Une narration locale de contrôle.";

function normaliser(value) {
  return String(value).replace(/[\u00A0\u202F]/g, " ").replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, " ").trim();
}

function cle(value) {
  const text = normaliser(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `${(hash >>> 0).toString(16).padStart(8, "0")}-${text.length}`;
}

const appels = { natif: [], annulations: 0, pauses: 0, reprises: 0, audios: [] };
const evenementsDocument = {};
const evenementsFenetre = {};

class FausseUtterance {
  constructor(text = "") {
    this.text = text;
    this.rate = 1;
    this.volume = 1;
  }
}

class FauxAudio {
  constructor(url) {
    this.src = url;
    this.playbackRate = 1;
    this.volume = 1;
    this.preload = "none";
    appels.audios.push(this);
  }
  play() {
    queueMicrotask(() => this.onplaying?.());
    return Promise.resolve();
  }
  pause() { this.pauseRecu = true; }
  removeAttribute(name) { if (name === "src") this.src = ""; }
  load() { this.loadRecu = true; }
  terminer() { this.onended?.(); }
}

const synthese = {
  speak(utterance) { appels.natif.push(utterance.text); },
  cancel() { appels.annulations += 1; },
  pause() { appels.pauses += 1; },
  resume() { appels.reprises += 1; },
};

const document = {
  currentScript: { src: "http://127.0.0.1:8766/moteur/voix.js" },
  hidden: false,
  createElement() { return { innerHTML: "", get textContent() { return this.innerHTML; } }; },
  addEventListener(name, listener) { evenementsDocument[name] = listener; },
};

const window = {
  speechSynthesis: synthese,
  SpeechSynthesisUtterance: FausseUtterance,
  PILOTE_VOIX_INDEX: { entrees: { [cle(texteConnu)]: { fichier: `audio/${cle(texteConnu)}.mp3` } } },
  location: { href: "http://127.0.0.1:8766/test.html" },
  setTimeout,
  addEventListener(name, listener) { evenementsFenetre[name] = listener; },
};

vm.runInNewContext(source, { window, document, Audio: FauxAudio, URL, Number, Object, String, Math });

assert.equal(appels.audios.length, 0, "aucun média ne doit être créé au chargement");
assert.equal(window.PiloteVoix.audioDisponible, true);
assert.equal(window.PiloteVoix.nombreNarrations, 1);
assert.equal(window.PiloteVoix.cle(texteConnu), cle(texteConnu));
for (const narration of corpus.narrations) {
  assert.equal(window.PiloteVoix.cle(narration.texte), narration.cle, `clé incohérente : ${narration.cle}`);
}
for (const page of pagesVocales) {
  const html = await readFile(new URL(page, import.meta.url), "utf8");
  const positionIndex = html.indexOf("moteur/voix-index.js");
  const positionMoteur = html.indexOf("moteur/voix.js");
  assert.ok(positionIndex >= 0, `index vocal absent : ${page}`);
  assert.ok(positionMoteur > positionIndex, `ordre des scripts vocaux incorrect : ${page}`);
}
for (const page of [
  "../../packs/fluides/res/froid-clim-academie/index.html",
  "../../packs/fluides/res/vanne-service-interactive/index.html",
]) {
  const html = await readFile(new URL(page, import.meta.url), "utf8");
  assert.equal(html.includes("moteur/voix.js"), false, `voix ajoutée sans besoin : ${page}`);
}

let debuts = 0;
let fins = 0;
const connue = new FausseUtterance(texteConnu);
connue.rate = 0.95;
connue.onstart = () => { debuts += 1; };
connue.onend = () => { fins += 1; };
synthese.speak(connue);
await new Promise((resolve) => setTimeout(resolve, 5));
assert.equal(appels.audios.length, 1);
assert.match(appels.audios[0].src, /packs\/fluides\/res\/voix\/audio\/.+\.mp3$/);
assert.equal(appels.audios[0].playbackRate, 0.95);
assert.equal(debuts, 1);
assert.equal(window.PiloteVoix.etat().mode, "audio-local");

synthese.pause();
synthese.resume();
await new Promise((resolve) => setTimeout(resolve, 5));
assert.equal(debuts, 1, "reprendre ne doit pas redéclencher onstart");
appels.audios[0].terminer();
await new Promise((resolve) => setTimeout(resolve, 5));
assert.equal(fins, 1);
assert.equal(window.PiloteVoix.etat().mode, "inactif");

synthese.speak(new FausseUtterance("Texte volontairement absent."));
assert.deepEqual(appels.natif, ["Texte volontairement absent."]);
assert.equal(window.PiloteVoix.etat().mode, "natif");

synthese.speak(new FausseUtterance(texteConnu));
document.hidden = true;
evenementsDocument.visibilitychange();
assert.equal(window.PiloteVoix.etat().actif, false);
assert.ok(appels.annulations >= 3);
assert.equal(typeof evenementsFenetre.beforeunload, "function");

console.log(`Moteur vocal : 17 surfaces, ${corpus.total} clés et tous les contrôles fonctionnels validés.`);
