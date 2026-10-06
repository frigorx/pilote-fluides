"use strict";
/* =====================================================================
   detendeur-egalisation-externe / app.js — gare 2 « L'égalisation externe »
   ---------------------------------------------------------------------
   Moule de la ligne LES DÉTENDEURS (voir ../_detendeurs-commun/MOULE.md), recopié de detendeurs-famille.
   Même ossature : screens = [screen({...})], un écran = un dessin + 3 lignes de texte, le reste dit par
   la voix (`narration`), référentiel en pied d'écran, version imprimable, lien direct (?ecran=N).
   Les dessins viennent de scene-egalisation.js (chargé AVANT ce fichier).
   ===================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const DS = window.DETENDEURS_SCENES, GS = window.EGALISATION_SCENES || {};

const quizState = { i: 0, rep: [] };           // les réponses restent tant que la page est ouverte
let current = 0;
let furthest = 0;
let extractMode = false;
let activeScreens = [];
let speechRun = 0;
let speaking = false;
let paused = false;
let statusTimer = 0;
const voiceRates = [0.8, 0.95, 1.1, 1.25];
let rateIndex = safeStoredRateIndex();

function safeStoredRateIndex() {
  try {
    const stored = Number(localStorage.getItem("detendeur-egalisation-externe-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("detendeur-egalisation-externe-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function screen(data) { return { level: "comprendre", codes: [], ...data }; }
const sym = nom => DS ? DS.symbole(nom) : "";
const figure = () => '<div class="ds-figure" id="ds-figure"></div>';

/* ---------- l'exercice « où brancher le tube ? » (écran 4) : l'élève touche A, B, C ou D ---------- */
const PRISES = {
  A: { nom: "Sur l’entrée de l’évaporateur", ok: false,
    retour: "<strong>Pas ici.</strong> Sur l’entrée, la pression est celle du corps du détendeur : c’est comme sans tube. La perte de charge n’est pas compensée, le détendeur reste trop fermé." },
  B: { nom: "Sur la sortie, avant le bulbe", ok: false,
    retour: "<strong>Presque, mais pas la bonne place.</strong> Ici la pression est proche de celle de la sortie, mais la notice du constructeur demande la prise après le bulbe, dans le sens du fluide. On suit la notice." },
  C: { nom: "Sur la sortie, après le bulbe", ok: true,
    retour: "<strong>Oui.</strong> La prise est après le bulbe, dans le sens du fluide : la membrane lit la vraie pression de la sortie et le détendeur ouvre juste ce qu’il faut. Le tube compense la perte de charge, il ne la supprime pas." },
  D: { nom: "Prise bouchée, pas de tube", ok: false,
    retour: "<strong>Non.</strong> Un détendeur à égalisation externe ne marche pas avec la prise bouchée : rien n’amène la bonne pression sous la membrane. Laissée ouverte, la prise fuit : le fluide s’échappe." }
};
const exo = { perte: 1, ferme: 1, nappe: 1, tap: null, ok: false };   // lu à chaque image par la scène

function exoMarkup() {
  const boutons = Object.keys(PRISES).map(k => `<button type="button" class="eg-prise" data-tap="${k}" aria-pressed="${exo.tap === k}"><b>${k}</b><span>${esc(PRISES[k].nom)}</span></button>`).join("");
  return `<div class="eg-exo"><div class="ds-dessin" id="eg-exo-dessin"></div>${GS.legendeHtml}<div class="eg-choix" role="group" aria-label="Où brancher le tube d’égalisation ?">${boutons}</div><div class="feedback" id="feedback" role="status">Touchez le point où brancher le tube : A, B, C ou D.</div></div>`;
}
function choisirPrise(tap) {
  if (!PRISES[tap]) return;
  exo.tap = tap; exo.ok = PRISES[tap].ok;
  $$(".eg-prise").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tap === tap)));
  const f = $("#feedback"); f.className = "feedback " + (exo.ok ? "good" : "bad"); f.innerHTML = PRISES[tap].retour;
}
function wireExo() {
  GS.exo($("#eg-exo-dessin"), exo, choisirPrise);
  $$(".eg-prise").forEach(b => b.addEventListener("click", () => choisirPrise(b.dataset.tap)));
  if (exo.tap) choisirPrise(exo.tap);
}

/* ---------- le quiz « Vérifier » : 6 questions, une explication pour chaque réponse (écran 5) ---------- */
const QUIZ = [
  { q: "Quel détendeur ce symbole représente-t-il ?", img: "thermostatique_ext", choices: ["Thermostatique à égalisation interne", "Thermostatique à égalisation externe", "Capillaire"], good: 1,
    why: ["Non : celui-là n’a pas de prise d’égalisation, pas de petit trait en plus au-dessus du cercle.", "Oui : c’est le thermostatique avec une prise d’égalisation.", "Non : le capillaire est un trait enroulé, sans cercle."],
    explain: "Le petit trait en plus, au-dessus du cercle, montre la prise d’égalisation : un tube la relie à la sortie de l’évaporateur." },
  { q: "En égalisation interne, quelle pression la membrane lit-elle ?", choices: ["Celle de l’entrée de l’évaporateur", "Celle de la sortie de l’évaporateur", "Celle du condenseur"], good: 0,
    why: ["Oui : la pression est prise dans le corps du détendeur, juste après l’orifice.", "Non : c’est justement ce que fait l’égalisation externe, avec son tube.", "Non : le condenseur est du côté haute pression, la membrane lit la basse pression."],
    explain: "Sans tube, la membrane lit la pression du corps du détendeur, donc celle de l’entrée de l’évaporateur." },
  { q: "Que fait le tube d’égalisation de la perte de charge ?", choices: ["Il la supprime", "Il la compense : la membrane lit la bonne pression", "Il l’augmente"], good: 1,
    why: ["Non : la pression baisse toujours dans l’évaporateur, le tube n’y change rien.", "Oui : il amène la pression de la sortie, la membrane n’est plus trompée.", "Non : il ne change rien à la pression dans l’évaporateur."],
    explain: "Le tube compense la perte de charge, il ne la supprime pas : il permet seulement au détendeur de lire la bonne pression." },
  { q: "Évaporateur à forte perte de charge, détendeur à égalisation interne : que se passe-t-il ?", choices: ["Il reste trop fermé : l’évaporateur manque de liquide", "Il ouvre trop : du liquide repart au compresseur", "Rien : il règle aussi bien"], good: 0,
    why: ["Oui : il lit une pression trop haute, croit la surchauffe plus faible qu’elle n’est et n’ouvre pas assez.", "Non : c’est l’inverse. La pression lue est trop haute, pas trop basse.", "Non : la pression lue n’est pas celle de la sortie, le réglage est faussé."],
    explain: "Il croit la surchauffe plus faible qu’elle n’est et reste trop fermé : la nappe est courte et la vapeur sort chaude." },
  { q: "Où prend-on le tube d’égalisation externe ?", choices: ["Sur l’entrée de l’évaporateur", "Sur la sortie, après le bulbe", "Sur la conduite de liquide"], good: 1,
    why: ["Non : sur l’entrée, la pression est celle du corps du détendeur, comme sans tube.", "Oui : après le bulbe, dans le sens du fluide. La notice donne la position exacte.", "Non : la conduite de liquide est en haute pression."],
    explain: "On prend la pression à la sortie de l’évaporateur, après le bulbe, dans le sens du fluide. La notice du constructeur donne la position exacte." },
  { q: "Un distributeur de liquide est monté sur l’évaporateur. Quel détendeur faut-il ?", choices: ["Un thermostatique à égalisation interne", "Un thermostatique à égalisation externe", "Peu importe"], good: 1,
    why: ["Non : le distributeur crée une forte perte de charge, l’interne serait trompé.", "Oui : avec un distributeur de liquide, l’égalisation externe est obligatoire.", "Non : le choix compte, il change le réglage du détendeur."],
    explain: "Un distributeur de liquide crée une forte perte de charge : on monte un détendeur à égalisation externe, et on branche le tube." }
];
function quizMarkup() {
  const n = QUIZ.length, i = quizState.i;
  if (i >= n) {
    const score = quizState.rep.filter((r, k) => r === QUIZ[k].good).length;
    return `<div class="quiz fin"><p class="score-number">${score} / ${n}</p><p class="score-texte">${score >= 5 ? "Bravo : l’égalisation externe est bien comprise." : "Revoyez les écrans 2 et 3, puis recommencez."}</p><button type="button" class="primary-button" id="quiz-restart">Recommencer</button></div>`;
  }
  const item = QUIZ[i], rep = quizState.rep[i], repondu = rep !== undefined;
  const choix = item.choices.map((c, k) => `<button type="button" class="choice ${repondu ? (k === item.good ? "good" : k === rep ? "bad" : "") : ""}" data-quiz-choice="${k}" ${repondu ? "disabled" : ""}><strong>${String.fromCharCode(65 + k)}.</strong> ${esc(c)}</button>`).join("");
  const retour = repondu
    ? `<div class="feedback ${rep === item.good ? "good" : "bad"}" id="feedback" role="status"><strong>${rep === item.good ? "Correct." : "À revoir."}</strong> ${esc(item.why[rep])} ${esc(item.explain)}</div><button type="button" class="primary-button" id="quiz-next">${i === n - 1 ? "Voir le résultat" : "Question suivante →"}</button>`
    : `<div class="feedback" id="feedback" role="status">Choisissez une réponse.</div>`;
  return `<div class="quiz"><p class="quiz-n">Question ${i + 1} sur ${n}</p><p class="quiz-q">${esc(item.q)}</p>${item.img ? `<img class="quiz-img" src="${sym(item.img)}" alt="Un symbole de détendeur thermostatique">` : ""}<div class="choices">${choix}</div>${retour}</div>`;
}
function renderQuiz() { const z = $("#activity-zone"); z.innerHTML = quizMarkup(); wireQuiz(); }
function wireQuiz() {
  $$("[data-quiz-choice]").forEach(b => b.addEventListener("click", () => { quizState.rep[quizState.i] = Number(b.dataset.quizChoice); renderQuiz(); }));
  const next = $("#quiz-next"); if (next) next.addEventListener("click", () => { quizState.i += 1; renderQuiz(); });
  const again = $("#quiz-restart"); if (again) again.addEventListener("click", () => { quizState.i = 0; quizState.rep = []; renderQuiz(); });
}

/* ---------- les 5 écrans ---------- */
const screens = [
  screen({ id: "identite", court: "Carte d’identité", title: "L’égalisation externe", kicker: "Reconnaître · 1", codes: ["9.01"],
    narration: "Voici le détendeur thermostatique à égalisation externe. Il ressemble au thermostatique que vous connaissez, mais il a un petit tube en plus. Ce tube part de la sortie de l'évaporateur, après le bulbe, et il arrive sous la membrane. Suivez la visite. Le bulbe sent la température à la sortie : sa charge violette pousse la membrane, par le capillaire, pour ouvrir. Le tube amène la pression de la sortie sous la membrane : elle pousse en bleu, pour fermer, comme le ressort. La membrane compare, et commande l'aiguille. Ce détendeur règle la surchauffe, avec la vraie pression de la sortie. Sur un schéma, son symbole a un petit trait en plus au-dessus du cercle : c'est la prise d'égalisation.",
    text: "Le bulbe violet pousse la membrane pour ouvrir ; le tube amène sous elle la pression de la sortie.",
    render: figure, wire: () => GS.identite($("#ds-figure"), sym("thermostatique_ext")) }),
  screen({ id: "piege", court: "Le piège", title: "Le piège de la perte de charge", kicker: "Comprendre · 2", codes: ["9.01"],
    narration: "Le bulbe, à la sortie, est rempli de violet. Quand il chauffe, sa pression pousse la membrane par le capillaire : cela ouvre. Le bleu, sous la membrane, et le ressort, eux, ferment. Prenons un évaporateur long, avec beaucoup de petits circuits. Le fluide s'y évapore en avançant, et la pression baisse en route. On appelle ça la perte de charge. Regardez les deux manomètres : à l'entrée, la pression est plus haute qu'à la sortie. Un détendeur sans tube lit la pression de l'entrée, sous sa membrane. Il croit donc que la surchauffe est plus faible qu'elle n'est. Alors il reste trop fermé. L'évaporateur manque de liquide : la nappe est courte, et la vapeur sort chaude. Voilà le piège.",
    text: "L’évaporateur est long : la pression baisse en route. Le détendeur sans tube lit celle de l’entrée.",
    render: figure, wire: () => GS.piege($("#ds-figure")) }),
  screen({ id: "et-si-externe", court: "Avec le tube", title: "Et si on branche le tube ?", kicker: "Comprendre · 3", codes: ["9.01"],
    narration: "Gardons le même évaporateur, avec la même perte de charge. Le détendeur à égalisation interne lit la pression de l'entrée, trop haute. Il ferme, et l'évaporateur manque de liquide. Pour le détendeur à égalisation externe, on branche le tube. Le tube prend la pression à la sortie, après le bulbe, et l'amène sous la membrane. Le détendeur lit la vraie pression de la sortie. Il ouvre juste ce qu'il faut, et la nappe va presque jusqu'à la sortie. Attention : le tube compense la perte de charge, il ne la supprime pas. La pression baisse toujours dans l'évaporateur.",
    text: "Même évaporateur : sans tube, il manque du liquide ; avec le tube, la nappe va presque jusqu’à la sortie.",
    render: figure, wire: () => GS.duo($("#ds-figure"), { interne: sym("thermostatique"), externe: sym("thermostatique_ext") }) }),
  screen({ id: "brancher", court: "Où brancher ?", title: "Où brancher le tube ?", kicker: "Appliquer · 4", codes: ["9.01", "9.02"], level: "appliquer",
    narration: "À vous de jouer. Où faut-il brancher le tube d'égalisation ? Touchez un des points A, B, C ou D sur le dessin, ou un bouton en dessous. Regardez ce que fait le détendeur. L'explication vous dit si c'est la bonne place, et pourquoi. N'oubliez pas : la notice du constructeur donne la position exacte. Et un détendeur à égalisation externe ne marche pas avec la prise bouchée, ni laissée ouverte.",
    text: "Où brancher le tube ? Touchez le bon point sur le dessin : A, B, C ou D.",
    render: exoMarkup, wire: wireExo }),
  screen({ id: "verifier", court: "Vérifier", title: "Vérifier", kicker: "Vérifier · 5", codes: ["9.01"], level: "vérifier",
    narration: "Pour finir, six questions. Il n'y a qu'une bonne réponse à chaque fois. Après chaque réponse, lisez l'explication : elle compte autant que la réponse.",
    text: "Six questions, une seule bonne réponse chaque fois. Lisez l’explication après chaque réponse.",
    render: quizMarkup, wire: wireQuiz })
];

/* ---------- sommaire, navigation, voix, impression (ossature du condenseur) ---------- */
function renderHome() {
  $("#dossier-grid").innerHTML = screens.map((s, i) => `<button class="dossier-button" type="button" data-ecran="${i}"><b>${i + 1}</b><span>${esc(s.court)}</span></button>`).join("");
  $$("[data-ecran]").forEach(b => b.addEventListener("click", () => startCourse(Number(b.dataset.ecran) + 1)));
}
function startCourse(screenNumber = 1) {
  extractMode = false; activeScreens = screens;
  current = Math.max(0, Math.min(screens.length - 1, screenNumber - 1)); furthest = Math.max(furthest, current);
  showCourse(); renderCurrent();
}
function startExtract(ids) {
  const found = ids.map(id => screens.find(item => item.id === id)).filter(Boolean);
  if (!found.length) { showHome(); showStatus("Extrait introuvable."); return; }
  extractMode = true; activeScreens = found; current = 0; furthest = found.length - 1; showCourse(); renderCurrent();
}
function showCourse() { $("#home").hidden = true; $("#course-shell").hidden = false; $("#home-button").hidden = false; $("#exit-button").hidden = false; document.body.classList.add("course-running"); $("#mode-badge").textContent = extractMode ? "Mode extrait" : "Cours complet"; $("#rail-mode").textContent = extractMode ? "EXTRAIT" : "ÉCRANS"; }
function showHome() { stopSpeech(); document.body.classList.remove("course-running"); $("#home").hidden = false; $("#course-shell").hidden = true; $("#home-button").hidden = true; $("#exit-button").hidden = true; $("#mode-badge").textContent = "Cours complet"; history.replaceState(null, "", "index.html"); }
function currentItem() { return activeScreens[current]; }
function renderCurrent(moveFocus = true) {
  const item = currentItem(); if (!item) return;
  stopSpeech(false); furthest = Math.max(furthest, current);
  $("#lesson-kicker").textContent = item.kicker; $("#lesson-title").textContent = item.title; $("#lesson-text").innerHTML = item.text;
  const zone = $("#activity-zone"); zone.innerHTML = item.render(); if (item.wire) item.wire();
  renderReference(item); renderStepper(); renderNavigation(); updateUrl(item); replierTexte();
  if (moveFocus) $("#lesson-title").focus({ preventScroll: true });
}
/* un écran = un dessin + 3 lignes : le texte reste entier, replié à 3 lignes ; la voix le dit en entier */
function replierTexte() {
  const copie = $(".lesson-copy"), bouton = $("#texte-entier"), texte = $("#lesson-text");
  copie.classList.remove("texte-ouvert"); bouton.setAttribute("aria-expanded", "false"); bouton.textContent = "Lire tout le texte";
  bouton.hidden = texte.scrollHeight <= texte.clientHeight + 2;
}
function basculerTexte() { const copie = $(".lesson-copy"), ouvert = copie.classList.toggle("texte-ouvert"), bouton = $("#texte-entier"); bouton.setAttribute("aria-expanded", String(ouvert)); bouton.textContent = ouvert ? "Replier le texte" : "Lire tout le texte"; }
function renderReference(item) { const codes = item.codes.length ? item.codes.join(" · ") : "contexte"; $("#reference-box").innerHTML = `<strong>référentiel</strong> · ${esc(codes)} · ${esc(item.level)}`; }
function renderStepper() {
  $("#stepper").innerHTML = activeScreens.map((s, i) => `<button class="step-button ${i === current ? "active" : ""} ${i < furthest && i !== current ? "done" : ""}" type="button" data-step="${i}" ${i === current ? 'aria-current="step"' : ""}><b>${i + 1}</b><span>${esc(s.court)}</span></button>`).join("");
  $$("[data-step]").forEach(button => button.addEventListener("click", () => goTo(Number(button.dataset.step))));
  const total = activeScreens.length; $("#rail-progress").textContent = `${current + 1} / ${total}`; $("#progress-bar").style.width = `${((current + 1) / total) * 100}%`;
}
function renderNavigation() { $("#prev-button").disabled = current === 0; $("#next-button").textContent = current === activeScreens.length - 1 ? (extractMode ? "Cours entier" : "Retour au sommaire") : "Suivant →"; }
function goTo(index) { if (index < 0 || index >= activeScreens.length) return; current = index; renderCurrent(); }
function next() { if (current < activeScreens.length - 1) goTo(current + 1); else if (extractMode) { activeScreens = screens; extractMode = false; current = screens.findIndex(s => s.id === currentItem().id); showCourse(); renderCurrent(); } else showHome(); }
function previous() { if (current > 0) goTo(current - 1); }
function updateUrl(item) { const url = new URL(location.href); url.search = ""; if (extractMode) url.searchParams.set("extrait", activeScreens.map(s => s.id).join(",")); else url.searchParams.set("ecran", String(screens.indexOf(item) + 1)); history.replaceState(null, "", url); }
async function copyCurrentLink() {
  const item = currentItem(), url = new URL(location.href); url.search = ""; url.searchParams.set("extrait", item.id);
  try { await navigator.clipboard.writeText(url.href); } catch (_) { const input = document.createElement("textarea"); input.value = url.href; document.body.append(input); input.select(); document.execCommand("copy"); input.remove(); }
  showStatus("Lien de cet écran copié.");
}
function showStatus(message) { clearTimeout(statusTimer); $("#status-message").textContent = message; statusTimer = setTimeout(() => $("#status-message").textContent = "", 2600); }
function bestFrenchVoice() {
  const voices = speechSynthesis.getVoices();
  const ranked = voices.map(voice => { const lang = (voice.lang || "").toLowerCase(), name = (voice.name || "").toLowerCase(); let score = 0; if (lang === "fr-fr") score += 50; else if (lang.startsWith("fr")) score += 25; if (/natural|naturel|neural|online|google|microsoft|denise|henri|julie|paul|hortense/.test(name)) score += 12; return { voice, score }; }).sort((a, b) => b.score - a.score);
  return ranked[0]?.voice || voices[0] || null;
}
function speechSupported() { return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window; }
function speakCurrent() {
  if (!speechSupported()) { showStatus("La voix n’est pas disponible. Le texte reste complet."); return; }
  stopSpeech(false);
  const item = currentItem(), token = ++speechRun, ditVoix = item.narration || "";
  if (!ditVoix) { showStatus("Cet écran n’a pas encore de narration. Le texte reste complet."); return; }
  const utterance = new SpeechSynthesisUtterance(ditVoix); utterance.lang = "fr-FR"; utterance.pitch = 1;
  if (window.PILOTE_VOIX_REGLAGE) window.PILOTE_VOIX_REGLAGE.appliquer(utterance); else utterance.rate = voiceRates[rateIndex];
  const voice = bestFrenchVoice(); if (voice) utterance.voice = voice;
  utterance.onstart = () => { if (token !== speechRun) return; speaking = true; paused = false; updateVoiceButtons(); };
  utterance.onend = () => { if (token !== speechRun) return; speaking = false; paused = false; updateVoiceButtons(); };
  utterance.onerror = e => { if (token !== speechRun || ["canceled", "interrupted"].includes(e.error)) return; speaking = false; paused = false; updateVoiceButtons(); showStatus("La voix s’est arrêtée. Le texte reste complet."); };
  speechSynthesis.speak(utterance);
}
function toggleSpeech() {
  if (!speechSupported()) { showStatus("La voix n’est pas disponible."); return; }
  if (speaking && !paused) { speechSynthesis.pause(); paused = true; updateVoiceButtons(); }
  else if (speaking && paused) { speechSynthesis.resume(); paused = false; updateVoiceButtons(); }
  else speakCurrent();
}
function stopSpeech() { speechRun++; if (speechSupported()) speechSynthesis.cancel(); speaking = false; paused = false; updateVoiceButtons(); }
function updateVoiceButtons() {
  const button = $("#listen"); if (!button) return;
  button.innerHTML = paused ? '<span aria-hidden="true">▶</span><span>Reprendre</span>' : speaking ? '<span aria-hidden="true">Ⅱ</span><span>Pause</span>' : '<span aria-hidden="true">▶</span><span>Écouter</span>';
  $("#stop-voice").disabled = !speaking; $("#speed-value").textContent = voiceRates[rateIndex].toFixed(2).replace(".", ",") + "×";
}
function changeRate(direction) { rateIndex = Math.max(0, Math.min(voiceRates.length - 1, rateIndex + direction)); saveRate(); updateVoiceButtons(); if (speaking || paused) speakCurrent(); }
function buildPrintBook() {
  const retenir = ["En égalisation interne, la membrane lit la pression à l’entrée de l’évaporateur.", "Si l’évaporateur a une forte perte de charge, la pression à la sortie est plus basse : le détendeur reste trop fermé.", "Le tube d’égalisation externe amène sous la membrane la pression de la sortie, prise après le bulbe (position exacte : notice du constructeur).", "Il compense la perte de charge, il ne la supprime pas. Prise bouchée ou laissée ouverte : il ne marche pas. Obligatoire avec un distributeur de liquide."].map(x => `<li>${x}</li>`).join("");
  $("#print-book").innerHTML = `<header class="print-title"><h1>L’égalisation externe</h1><p>Gare 2 · ${screens.length} écrans · ${QUIZ.length} questions · règlement d’exécution (UE) 2024/2215, annexe I.</p><p><strong>À retenir :</strong></p><ul>${retenir}</ul></header>` +
    screens.map((item, index) => `<article class="print-screen"><h2>${index + 1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.id === "brancher" ? `<div class="print-answer"><strong>Correction :</strong><ul>${Object.keys(PRISES).map(k => `<li>${k}. ${esc(PRISES[k].nom)} → ${PRISES[k].retour}</li>`).join("")}</ul></div>` : ""}${item.id === "verifier" ? QUIZ.map((q, k) => `<div class="print-answer"><strong>${k + 1}. ${esc(q.q)}</strong> ${esc(q.choices[q.good])}. ${esc(q.explain)}</div>`).join("") : ""}<p class="print-codes">Référentiel · ${item.codes.length ? esc(item.codes.join(" · ")) : "contexte"}</p></article>`).join("") +
    `<article class="print-screen"><h2>Sources</h2><p>Référentiel : règlement d’exécution (UE) 2024/2215, annexe I. Symboles : bibliothèque inerWeb (détendeurs thermostatiques à égalisation interne et externe). Dessins : inerWeb, calculés dans la page.</p></article>`;
}
function handleInitialUrl() {
  const params = new URLSearchParams(location.search), extract = params.get("extrait");
  if (extract) { startExtract(extract.split(",").map(x => x.trim()).filter(Boolean)); return; }
  const ecran = Number(params.get("ecran")); if (ecran) { startCourse(ecran); return; }
  showHome();
}
function bindGlobalEvents() {
  $("#start-button").addEventListener("click", () => startCourse(1)); $("#home-button").addEventListener("click", showHome); $("#exit-button").addEventListener("click", showHome);
  $("#prev-button").addEventListener("click", previous); $("#next-button").addEventListener("click", next); $("#copy-link").addEventListener("click", copyCurrentLink);
  $("#sources-button").addEventListener("click", () => $("#sources-dialog").showModal()); $("#sources-close").addEventListener("click", () => $("#sources-dialog").close());
  $("#listen").addEventListener("click", toggleSpeech); $("#stop-voice").addEventListener("click", () => stopSpeech()); $("#slower").addEventListener("click", () => changeRate(-1)); $("#faster").addEventListener("click", () => changeRate(1)); $("#texte-entier").addEventListener("click", basculerTexte);
  addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName; if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag) || $("dialog[open]")) return;
    if (event.key === "ArrowRight") { event.preventDefault(); next(); } else if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
    else if (event.key === " ") { event.preventDefault(); toggleSpeech(); } else if (event.key === "Escape") showHome();
  });
  addEventListener("beforeunload", () => stopSpeech()); document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(); });
}

renderHome(); buildPrintBook(); bindGlobalEvents(); updateVoiceButtons();
if (GS.accueil) GS.accueil($("#scene-accueil"));
handleInitialUrl();
