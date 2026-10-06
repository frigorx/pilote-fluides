"use strict";
/* =====================================================================
   detendeur-mop / app.js — gare 3 « Le détendeur MOP »
   ---------------------------------------------------------------------
   Moule de la ligne LES DÉTENDEURS (voir ../_detendeurs-commun/MOULE.md), recopié de la gare 2.
   Même ossature : screens = [screen({...})], un écran = un dessin + 3 lignes de texte, le reste dit par
   la voix (`narration`), référentiel en pied d'écran, version imprimable, lien direct (?ecran=N).
   Les dessins viennent de scene-mop.js (chargé AVANT ce fichier).
   ===================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const DS = window.DETENDEURS_SCENES, GS = window.MOP_SCENES || {};

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
    const stored = Number(localStorage.getItem("detendeur-mop-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("detendeur-mop-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function screen(data) { return { level: "comprendre", codes: [], ...data }; }
const sym = nom => DS ? DS.symbole(nom) : "";
const figure = () => '<div class="ds-figure" id="ds-figure"></div>';

/* ---------- l'exercice « où monter la tête ? » (écran 4) : l'élève choisit A, B ou C ---------- */
const PLACES = {
  A: { nom: "Dans l’air froid de l’évaporateur", ok: false,
    retour: "<strong>Non.</strong> Dans le courant d’air froid, la tête devient plus froide que le bulbe. Le liquide de la charge va s’y condenser : le bulbe se vide, et le détendeur perd le contrôle." },
  B: { nom: "À l’abri, à l’air plus chaud", ok: true,
    retour: "<strong>Oui.</strong> À l’abri, la tête reste plus chaude que le bulbe : la charge reste dans le bulbe, c’est lui qui commande. La notice du constructeur donne l’emplacement exact." },
  C: { nom: "Contre l’entrée de l’évaporateur", ok: false,
    retour: "<strong>Non.</strong> L’entrée de l’évaporateur est l’endroit le plus froid, là où le liquide bout. La tête y serait plus froide que le bulbe : la charge irait dans la tête." }
};
const exo = { cle: null, ok: false };   // lu à chaque image par la scène

function exoMarkup() {
  const boutons = Object.keys(PLACES).map(k => `<button type="button" class="mp-place" data-choix="${k}" aria-pressed="${exo.cle === k}"><b>${k}</b><span>${esc(PLACES[k].nom)}</span></button>`).join("");
  return `<div class="mp-exo"><div class="ds-dessin" id="mp-exo-dessin"></div>${GS.legendeHtml || ""}<div class="mp-choix" role="group" aria-label="Où monter la tête du détendeur ?">${boutons}</div><div class="feedback" id="feedback" role="status">Choisissez où monter la tête : A, B ou C.</div></div>`;
}
function choisirPlace(cle) {
  if (!PLACES[cle]) return;
  exo.cle = cle; exo.ok = PLACES[cle].ok;
  $$(".mp-place").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.choix === cle)));
  const f = $("#feedback"); f.className = "feedback " + (exo.ok ? "good" : "bad"); f.innerHTML = PLACES[cle].retour;
}
function wireExo() {
  GS.exo($("#mp-exo-dessin"), exo);
  $$(".mp-place").forEach(b => b.addEventListener("click", () => choisirPlace(b.dataset.choix)));
  if (exo.cle) choisirPlace(exo.cle);
}

/* ---------- le quiz « Vérifier » : 6 questions, une explication pour chaque réponse (écran 5) ---------- */
const QUIZ = [
  { q: "MOP : que veut dire ce mot ?", choices: ["Pression maximale de fonctionnement", "Mise en pression obligatoire", "Moteur à pression ordinaire"], good: 0,
    why: ["Oui : c’est la pression maximale de fonctionnement.", "Non : ce n’est pas une obligation. MOP veut dire pression maximale de fonctionnement.", "Non : le moteur n’a rien à voir avec le sigle. MOP veut dire pression maximale de fonctionnement."],
    explain: "Un détendeur MOP plafonne la basse pression : elle ne monte pas au-delà d’une valeur." },
  { q: "Le bulbe d’un détendeur MOP devient très chaud. Que devient la pression du bulbe ?", choices: ["Elle monte sans arrêt", "Elle ne monte presque plus : tout le liquide est parti", "Elle tombe à zéro"], good: 1,
    why: ["Non : c’est ce que fait un bulbe ordinaire, qui garde du liquide.", "Oui : quand le dernier liquide est vaporisé, la pression ne monte presque plus.", "Non : le bulbe est fermé. La vapeur reste dedans et garde sa pression."],
    explain: "La charge du bulbe est limitée : une fois tout le liquide vaporisé, la pression ne monte presque plus." },
  { q: "La basse pression rejoint le plafond. Que fait le détendeur MOP ?", choices: ["Il ouvre encore plus", "Il ne peut plus ouvrir davantage : la BP reste plafonnée", "Il se bloque grand ouvert"], good: 1,
    why: ["Non : la pression du bulbe est plafonnée, elle n’a plus de force en plus pour ouvrir.", "Oui : la pression du bulbe ne monte plus, donc le détendeur n’ouvre pas davantage.", "Non : il reste mobile, il suit la pression du bulbe et la basse pression."],
    explain: "Le bulbe ne pousse plus davantage : la basse pression reste plafonnée. C’est le but du détendeur MOP." },
  { q: "Chambre chaude au démarrage, détendeur sans MOP : que se passe-t-il ?", choices: ["La BP monte haut : le compresseur aspire une vapeur dense, son moteur force", "La BP reste très basse", "Le détendeur se ferme tout de suite"], good: 0,
    why: ["Oui : c’est ce que montre la jauge du moteur, sans MOP.", "Non : c’est l’inverse. Le bulbe chaud fait ouvrir le détendeur en grand, la BP monte.", "Non : un bulbe chaud fait ouvrir le détendeur, pas fermer."],
    explain: "Sans MOP, rien ne limite la BP : elle monte haut, la vapeur est dense et le moteur est surchargé." },
  { q: "Où doit se trouver la tête du détendeur par rapport au bulbe ?", choices: ["Plus froide que le bulbe", "Plus chaude que le bulbe", "Peu importe"], good: 1,
    why: ["Non : si la tête est plus froide, le liquide de la charge s’y condense.", "Oui : la charge reste dans le bulbe, c’est lui qui commande.", "Non : l’emplacement compte. Une tête trop froide fait perdre le contrôle au détendeur."],
    explain: "La tête doit rester plus chaude que le bulbe : sinon la charge migre vers la tête et le détendeur perd le contrôle." },
  { q: "Où trouve-t-on la valeur MOP d’un détendeur ?", choices: ["On la règle avec la vis du détendeur", "Elle est marquée sur l’élément thermostatique (voir la notice)", "On la calcule avec la température de la chambre"], good: 1,
    why: ["Non : la vis règle la surchauffe. La valeur MOP vient de la charge du bulbe ; la vis ne la déplace qu’un peu.", "Oui : elle est marquée sur l’élément thermostatique et donnée par la notice du constructeur.", "Non : on ne la calcule pas et on ne l’invente pas : on la lit sur l’élément ou dans la notice."],
    explain: "On ne l’invente pas : on la lit sur l’élément, et on suit la notice du constructeur." }
];
function quizMarkup() {
  const n = QUIZ.length, i = quizState.i;
  if (i >= n) {
    const score = quizState.rep.filter((r, k) => r === QUIZ[k].good).length;
    return `<div class="quiz fin"><p class="score-number">${score} / ${n}</p><p class="score-texte">${score >= 5 ? "Bravo : le détendeur MOP est bien compris." : "Revoyez les écrans 2 et 3, puis recommencez."}</p><button type="button" class="primary-button" id="quiz-restart">Recommencer</button></div>`;
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
  screen({ id: "identite", court: "Carte d’identité", title: "Le détendeur MOP", kicker: "Reconnaître · 1", codes: ["9.01"],
    narration: "Voici le détendeur MOP. C'est un détendeur thermostatique, avec un bulbe un peu particulier. Regardez le bulbe, ouvert en coupe : il ne contient qu'une petite charge, en violet. Un peu de liquide au fond, de la vapeur au-dessus. Suivez la visite. La pression du bulbe monte par le capillaire, jusqu'au-dessus de la membrane. Elle pousse vers le bas : elle ouvre le détendeur. Dessous, la pression d'évaporation, en bleu, et le ressort, en gris, poussent vers le haut : ils ferment. La basse pression ne dépasse pas le trait rouge : le détendeur la plafonne.",
    text: "Un détendeur thermostatique dont le bulbe a une petite charge. Il règle la surchauffe et il plafonne la BP.",
    render: figure, wire: () => GS.identite($("#ds-figure"), sym("thermostatique")) }),
  screen({ id: "bulbe", court: "Le bulbe", title: "Le bulbe à charge limitée", kicker: "Comprendre · 2", codes: ["9.01"],
    narration: "Regardez le bulbe de près. Il ne contient qu'une petite charge de fluide, en violet. Sa pression passe par le capillaire. Quand le bulbe chauffe, le liquide bout, et la pression monte : l'aiguille du manomètre avance. Plus le bulbe est chaud, moins il reste de liquide. Puis le dernier liquide est parti. Toute la charge est en vapeur. Le thermomètre monte encore, mais l'aiguille ne bouge presque plus. La pression du bulbe est plafonnée. Avec une charge ordinaire, il resterait du liquide, et la pression continuerait de monter. Voilà ce qui rend le bulbe MOP différent.",
    text: "Le bulbe chauffe : sa charge bout, la pression monte. Plus de liquide, et elle ne monte presque plus.",
    render: figure, wire: () => GS.bulbe($("#ds-figure")) }),
  screen({ id: "chambre-chaude", court: "Chambre chaude", title: "Et si la chambre est chaude ?", kicker: "Comprendre · 3", codes: ["9.01"],
    narration: "Une chambre chaude démarre. Le tube de sortie est chaud, le bulbe aussi. Les deux détendeurs ouvrent en grand, et beaucoup de liquide bout. La basse pression monte. Avec le détendeur MOP, la pression du bulbe, en violet, est plafonnée. Quand la basse pression la rejoint, le détendeur ne peut plus ouvrir davantage : la basse pression s'arrête. Sans MOP, le détendeur reste grand ouvert, et la basse pression monte encore. Le compresseur aspire alors une vapeur dense. Son moteur force : regardez la jauge. Avec le MOP, le moteur n'est pas surchargé.",
    text: "Démarrage d’une chambre chaude : sans MOP, la BP monte haut et le moteur force. Avec MOP, elle est plafonnée.",
    render: figure, wire: () => GS.chambreChaude($("#ds-figure")) }),
  screen({ id: "monter", court: "Où monter ?", title: "Où monter la tête ?", kicker: "Appliquer · 4", codes: ["9.01", "9.02"], level: "appliquer",
    narration: "À vous de jouer. Où faut-il monter la tête du détendeur ? La tête, c'est la partie du haut, avec la membrane. Choisissez A, B ou C. Regardez les deux thermomètres : un sur la tête, un sur le bulbe. Et regardez ce que fait la charge. Si la tête est plus froide que le bulbe, le liquide de la charge va dans la tête. L'explication vous dit si c'est la bonne place. Et pour la valeur MOP, on lit la notice du constructeur.",
    text: "Où monter la tête du détendeur ? Regardez les deux thermomètres et ce que fait la charge.",
    render: exoMarkup, wire: wireExo }),
  screen({ id: "verifier", court: "Vérifier", title: "Vérifier", kicker: "Vérifier · 5", codes: ["9.01"], level: "vérifier",
    narration: "Pour finir, six questions sur le détendeur MOP. Il n'y a qu'une bonne réponse à chaque fois. Choisissez, puis lisez l'explication : elle compte autant que la réponse. Si vous hésitez, revenez sur les écrans : le bulbe à charge limitée, la chambre chaude, et la place de la tête. Prenez votre temps.",
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
  const retenir = ["MOP = pression maximale de fonctionnement : la basse pression ne monte pas au-delà du plafond.", "Le bulbe a une charge limitée : quand tout le liquide est vaporisé, la pression du bulbe ne monte presque plus.", "Le détendeur ne peut plus ouvrir davantage : la BP reste plafonnée. Au démarrage d’une chambre chaude, le moteur du compresseur n’est pas surchargé.", "La tête doit rester plus chaude que le bulbe : sinon la charge migre vers la tête et le détendeur perd le contrôle.", "La valeur MOP est marquée sur l’élément thermostatique : on la lit, on ne l’invente pas (notice du constructeur).", "Sur la membrane : le violet (pression du bulbe) ouvre ; le bleu (pression d’évaporation) et le gris (ressort) ferment."].map(x => `<li>${x}</li>`).join("");
  $("#print-book").innerHTML = `<header class="print-title"><h1>Le détendeur MOP</h1><p>Gare 3 · ${screens.length} écrans · ${QUIZ.length} questions · règlement d’exécution (UE) 2024/2215, annexe I.</p><p><strong>À retenir :</strong></p><ul>${retenir}</ul></header>` +
    screens.map((item, index) => `<article class="print-screen"><h2>${index + 1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.id === "monter" ? `<div class="print-answer"><strong>Correction :</strong><ul>${Object.keys(PLACES).map(k => `<li>${k}. ${esc(PLACES[k].nom)} → ${PLACES[k].retour}</li>`).join("")}</ul></div>` : ""}${item.id === "verifier" ? QUIZ.map((q, k) => `<div class="print-answer"><strong>${k + 1}. ${esc(q.q)}</strong> ${esc(q.choices[q.good])}. ${esc(q.explain)}</div>`).join("") : ""}<p class="print-codes">Référentiel · ${item.codes.length ? esc(item.codes.join(" · ")) : "contexte"}</p></article>`).join("") +
    `<article class="print-screen"><h2>Sources</h2><p>Référentiel : règlement d’exécution (UE) 2024/2215, annexe I. Symbole : bibliothèque inerWeb (détendeur thermostatique). Valeur MOP : marquée sur l’élément thermostatique, voir la notice du constructeur. Dessins : inerWeb, calculés dans la page.</p></article>`;
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
