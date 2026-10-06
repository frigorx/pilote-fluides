"use strict";
/* =====================================================================
   detendeur-electronique / app.js — gare 6 « Le détendeur électronique »
   ---------------------------------------------------------------------
   Moule de la ligne LES DÉTENDEURS (voir ../_detendeurs-commun/MOULE.md), recopié de la gare 3.
   Même ossature : screens = [screen({...})], un écran = un dessin + 3 lignes de texte, le reste dit par
   la voix (`narration`), référentiel en pied d'écran, version imprimable, lien direct (?ecran=N).
   Les dessins viennent de scene-electronique.js (chargé AVANT ce fichier).
   ===================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const DS = window.DETENDEURS_SCENES, GS = window.ELECTRONIQUE_SCENES || {};

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
    const stored = Number(localStorage.getItem("detendeur-electronique-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("detendeur-electronique-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function screen(data) { return { level: "comprendre", codes: [], ...data }; }
const sym = nom => DS ? DS.symbole(nom) : "";
const figure = () => '<div class="ds-figure" id="ds-figure"></div>';

/* ---------- l'exercice « régler la consigne de surchauffe » (écran 4) : l'élève appuie sur − et + ----------
   Les valeurs sont des EXEMPLES (la vraie consigne vient de la notice). La scène lit `exo.kappa` à chaque image et appelle
   `exo.onEtat(zone, stable)` quand la zone (bas / juste / haut) ou la stabilisation change. */
const KMIN = 1, KMAX = 20;
const exo = { kappa: 16, touche: false, zone: "haut", stable: true, onEtat: null };
const RETOURS = {
  bas: { cls: "bad", html: "<strong>Consigne trop basse.</strong> L’évaporateur est trop rempli : le liquide va jusqu’à la sortie, et du liquide peut repartir vers le compresseur. Remontez la consigne." },
  juste: { cls: "good", html: "<strong>Bien réglé.</strong> La nappe va presque jusqu’à la sortie : l’évaporateur est bien rempli, et le gaz sort juste assez chaud. La valeur exacte vient de la notice." },
  haut: { cls: "bad", html: "<strong>Consigne trop haute.</strong> La vanne se ferme trop : la nappe est courte et le bout de l’évaporateur ne sert pas. Baissez la consigne." }
};
const ZONES_NOM = { bas: "trop basse", juste: "juste", haut: "trop haute" };

function exoMarkup() {
  return `<div class="el-exo"><div class="ds-dessin" id="el-exo-dessin"></div>` +
    `<div class="el-reglage" role="group" aria-label="Consigne de surchauffe du régulateur"><span class="el-reglage-nom">Consigne</span>` +
    `<button type="button" class="el-bouton" id="el-moins" aria-label="Baisser la consigne de surchauffe">−</button>` +
    `<output class="el-valeur" id="el-valeur" for="el-moins el-plus"></output>` +
    `<button type="button" class="el-bouton" id="el-plus" aria-label="Monter la consigne de surchauffe">+</button>` +
    `<span class="el-etat" id="el-etat"></span></div>` +
    `<div class="feedback" id="feedback" role="status"></div></div>`;
}
function majExo() {
  const v = $("#el-valeur"); if (!v) return;
  v.innerHTML = `${exo.kappa} K <small>exemple</small>`;
  $("#el-moins").disabled = exo.kappa <= KMIN; $("#el-plus").disabled = exo.kappa >= KMAX;
  const f = $("#feedback"), e = $("#el-etat");
  if (!exo.touche) { f.className = "feedback"; f.innerHTML = `Consigne de départ : ${exo.kappa} K (exemple). Regardez la nappe, puis changez la consigne avec − et +.`; e.textContent = ""; return; }
  if (!exo.stable) { f.className = "feedback"; f.innerHTML = "Le régulateur ajuste la vanne… Laissez la surchauffe se stabiliser avant de juger."; e.textContent = "se stabilise…"; return; }
  const r = RETOURS[exo.zone]; f.className = "feedback " + r.cls; f.innerHTML = r.html; e.textContent = "stabilisé : " + ZONES_NOM[exo.zone];
}
function changerConsigne(d) {
  const k = Math.max(KMIN, Math.min(KMAX, exo.kappa + d)); if (k === exo.kappa) return;
  exo.kappa = k; exo.touche = true; exo.stable = false; majExo();
}
function wireExo() {
  exo.onEtat = (zone, stable) => { exo.zone = zone; exo.stable = stable; majExo(); };
  GS.exo($("#el-exo-dessin"), exo);
  $("#el-moins").addEventListener("click", () => changerConsigne(-1));
  $("#el-plus").addEventListener("click", () => changerConsigne(1));
  majExo();
}

/* ---------- le quiz « Vérifier » : 6 questions, une explication pour chaque réponse (écran 5) ---------- */
const QUIZ = [
  { q: "Que règle un détendeur électronique ?", choices: ["La pression d’évaporation, avec un ressort", "La surchauffe, calculée par un régulateur", "Rien : sa section est fixe"], good: 1,
    why: ["Non : c’est le détendeur automatique qui règle la pression, avec un ressort.", "Oui : un régulateur calcule la surchauffe et commande la vanne.", "Non : c’est le tube capillaire qui n’a aucun réglage."],
    explain: "Il règle la surchauffe, comme le thermostatique, mais elle est calculée par un régulateur." },
  { q: "À la sortie de l’évaporateur, que mesurent les sondes ?", choices: ["La pression et la température du gaz", "Seulement la température de la chambre", "Le courant du compresseur"], good: 0,
    why: ["Oui : le transmetteur donne la pression, la sonde donne la température.", "Non : la chambre n’intervient pas ici. Les sondes sont sur le tube de sortie de l’évaporateur.", "Non : le courant du compresseur ne sert pas à calculer la surchauffe."],
    explain: "Avec la pression, le régulateur retrouve la température de saturation. Avec la sonde, il connaît la température du gaz." },
  { q: "Comment le régulateur calcule-t-il la surchauffe ?", choices: ["Pression haute moins pression basse", "Température de saturation moins température mesurée", "Température mesurée moins température de saturation"], good: 2,
    why: ["Non : ce sont deux pressions, elles ne donnent pas la surchauffe.", "Non : c’est l’inverse. Le gaz est plus chaud que le fluide qui bout, donc on enlève la saturation à la mesure.", "Oui : la température du gaz, moins la température à laquelle le fluide bout à cette pression."],
    explain: "La température de saturation se lit à partir de la pression mesurée." },
  { q: "La surchauffe est trop haute. Que fait le régulateur ?", choices: ["Il ferme la vanne", "Il ouvre la vanne : plus de liquide dans l’évaporateur", "Il arrête le compresseur"], good: 1,
    why: ["Non : fermer donnerait moins de liquide, donc encore plus de surchauffe.", "Oui : plus de liquide entre dans l’évaporateur, et la surchauffe redescend.", "Non : le régulateur agit sur la vanne. Il n’arrête pas le compresseur pour cela."],
    explain: "Une surchauffe trop haute veut dire un évaporateur trop peu rempli : on ouvre." },
  { q: "Quelle vanne dose le liquide par sa durée d’ouverture ?", choices: ["La vanne à moteur pas à pas", "Le tube capillaire", "La vanne à impulsions"], good: 2,
    why: ["Non : elle s’ouvre peu à peu, cran par cran. La durée ne dose rien.", "Non : le capillaire n’a aucune pièce mobile.", "Oui : le clapet s’ouvre et se ferme par cycles. Plus il reste ouvert, plus il passe de liquide."],
    explain: "Sans courant, la vanne à impulsions se ferme toute seule : elle fait aussi électrovanne." },
  { q: "On veut changer la surchauffe. Que fait-on ?", choices: ["On change la consigne sur le régulateur, puis on laisse stabiliser", "On tourne la vis de la vanne", "On change le bulbe"], good: 0,
    why: ["Oui : on règle sur le régulateur, et on attend avant de mesurer ou de changer encore.", "Non : une vanne électronique n’a pas de vis de réglage. Le réglage est dans le régulateur.", "Non : il n’y a pas de bulbe, ce sont des sondes. Le réglage est dans le régulateur."],
    explain: "La valeur de la consigne vient de la notice du constructeur." }
];
function quizMarkup() {
  const n = QUIZ.length, i = quizState.i;
  if (i >= n) {
    const score = quizState.rep.filter((r, k) => r === QUIZ[k].good).length;
    return `<div class="quiz fin"><p class="score-number">${score} / ${n}</p><p class="score-texte">${score >= 5 ? "Bravo : le détendeur électronique est bien compris." : "Revoyez les écrans 2 et 3, puis recommencez."}</p><button type="button" class="primary-button" id="quiz-restart">Recommencer</button></div>`;
  }
  const item = QUIZ[i], rep = quizState.rep[i], repondu = rep !== undefined;
  const choix = item.choices.map((c, k) => `<button type="button" class="choice ${repondu ? (k === item.good ? "good" : k === rep ? "bad" : "") : ""}" data-quiz-choice="${k}" ${repondu ? "disabled" : ""}><strong>${String.fromCharCode(65 + k)}.</strong> ${esc(c)}</button>`).join("");
  const retour = repondu
    ? `<div class="feedback ${rep === item.good ? "good" : "bad"}" id="feedback" role="status"><strong>${rep === item.good ? "Correct." : "À revoir."}</strong> ${esc(item.why[rep])} ${esc(item.explain)}</div><button type="button" class="primary-button" id="quiz-next">${i === n - 1 ? "Voir le résultat" : "Question suivante →"}</button>`
    : `<div class="feedback" id="feedback" role="status">Choisissez une réponse.</div>`;
  return `<div class="quiz"><p class="quiz-n">Question ${i + 1} sur ${n}</p><p class="quiz-q">${esc(item.q)}</p><div class="choices">${choix}</div>${retour}</div>`;
}
function renderQuiz() { const z = $("#activity-zone"); z.innerHTML = quizMarkup(); wireQuiz(); }
function wireQuiz() {
  $$("[data-quiz-choice]").forEach(b => b.addEventListener("click", () => { quizState.rep[quizState.i] = Number(b.dataset.quizChoice); renderQuiz(); }));
  const next = $("#quiz-next"); if (next) next.addEventListener("click", () => { quizState.i += 1; renderQuiz(); });
  const again = $("#quiz-restart"); if (again) again.addEventListener("click", () => { quizState.i = 0; quizState.rep = []; renderQuiz(); });
}

/* ---------- les 5 écrans ---------- */
const SYMBOLES = { electronique: sym("electronique"), sonde: sym("sonde_temperature.svg"), pression: sym("capteur_pression.svg") };
const screens = [
  screen({ id: "identite", court: "Carte d’identité", title: "Le détendeur électronique", kicker: "Reconnaître · 1", codes: ["9.01"],
    narration: "Voici le détendeur électronique. Il règle la surchauffe, comme le détendeur thermostatique. Mais ici, ce n'est pas un ressort qui décide. C'est un régulateur. Il y a trois acteurs. D'abord, deux sondes, à la sortie de l'évaporateur : elles mesurent la pression et la température du gaz. Ensuite, le régulateur : il calcule la surchauffe. Enfin, la vanne : un moteur pousse ou relève le pointeau, pas à pas. Suivez la visite : les sondes, le régulateur, la vanne. On le choisit quand la charge change beaucoup, ou avec un compresseur à variateur.",
    text: "Les sondes mesurent, le régulateur calcule la surchauffe, la vanne s’ouvre ou se ferme sur ordre.",
    render: figure, wire: () => GS.identite($("#ds-figure"), SYMBOLES) }),
  screen({ id: "boucle", court: "La boucle", title: "La boucle de réglage", kicker: "Comprendre · 2", codes: ["9.01"],
    narration: "Regardez la boucle de réglage. Au départ, tout va bien. Puis la sortie de l'évaporateur chauffe : il y a plus de chaleur à prendre. Le liquide s'arrête plus tôt, et le gaz sort plus chaud. Les sondes le mesurent. Le régulateur calcule la surchauffe : la température mesurée, moins la température de saturation, lue grâce à la pression. Elle est trop haute. Alors le régulateur ouvre la vanne, cran par cran. Plus de liquide arrive dans l'évaporateur. La nappe s'allonge, et la surchauffe redescend vers la consigne. Puis la boucle continue, sans arrêt.",
    text: "La sortie chauffe : le régulateur ouvre la vanne cran par cran, la surchauffe redescend à la consigne.",
    render: figure, wire: () => GS.boucle($("#ds-figure")) }),
  screen({ id: "vannes", court: "Deux vannes", title: "Pas à pas ou impulsions ?", kicker: "Comprendre · 3", codes: ["9.01"],
    narration: "Il existe deux sortes de vannes électroniques. À gauche, la vanne pas à pas. Un moteur tourne par petits crans, et le pointeau avance ou recule. L'ouverture change peu à peu. À droite, la vanne à impulsions. Une bobine ouvre et ferme le clapet, par cycles de quelques secondes. C'est la durée d'ouverture qui dose le liquide : ouverte longtemps, il en passe plus. Et si on arrête la machine ? La vanne pas à pas est refermée par le régulateur. La vanne à impulsions se ferme toute seule, sans courant : elle fait aussi électrovanne.",
    text: "Pas à pas : le pointeau avance par crans. Impulsions : le clapet s’ouvre et se ferme, la durée dose.",
    render: figure, wire: () => GS.vannes($("#ds-figure")) }),
  screen({ id: "regler", court: "Régler", title: "Régler la consigne", kicker: "Appliquer · 4", codes: ["9.01", "9.03"], level: "appliquer",
    narration: "À vous de jouer. Le régulateur applique la consigne de surchauffe que vous lui donnez. Appuyez sur plus ou sur moins. Attention : le système met quelques secondes à se stabiliser, il faut le laisser faire. Regardez la nappe de liquide dans l'évaporateur. Consigne trop basse : le liquide va jusqu'à la sortie, et du liquide peut repartir vers le compresseur. Consigne trop haute : la nappe est courte, l'évaporateur est mal rempli. Cherchez la bonne consigne. Les chiffres sont des exemples : la vraie valeur est dans la notice.",
    text: "Réglez la consigne de surchauffe du régulateur et regardez la nappe. Chiffres d’exemple : voir la notice.",
    render: exoMarkup, wire: wireExo }),
  screen({ id: "verifier", court: "Vérifier", title: "Vérifier", kicker: "Vérifier · 5", codes: ["9.01"], level: "vérifier",
    narration: "Pour finir, six questions sur le détendeur électronique. Il n'y a qu'une bonne réponse à chaque fois. Choisissez, puis lisez l'explication : elle compte autant que la réponse. Si vous hésitez, revenez sur les écrans : la boucle de réglage, les deux sortes de vannes, et le réglage de la consigne. Souvenez-vous : les sondes mesurent, le régulateur calcule, la vanne obéit. Prenez votre temps.",
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
  const retenir = ["Le détendeur électronique règle la surchauffe, calculée par un régulateur.", "À la sortie de l’évaporateur : un transmetteur de pression et une sonde de température.", "Surchauffe = température mesurée − température de saturation (lue à partir de la pression).", "Pas à pas : le pointeau avance par crans. Impulsions : la durée d’ouverture dose le liquide. À l’arrêt, la vanne se ferme.", "On règle la consigne sur le régulateur, puis on laisse stabiliser. Les chiffres sont des exemples : la valeur vient de la notice."].map(x => `<li>${x}</li>`).join("");
  $("#print-book").innerHTML = `<header class="print-title"><h1>Le détendeur électronique</h1><p>Gare 6 · ${screens.length} écrans · ${QUIZ.length} questions · règlement d’exécution (UE) 2024/2215, annexe I.</p><p><strong>À retenir :</strong></p><ul>${retenir}</ul></header>` +
    screens.map((item, index) => `<article class="print-screen"><h2>${index + 1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.id === "regler" ? `<div class="print-answer"><strong>Correction :</strong><ul>${["bas", "juste", "haut"].map(z => `<li>Consigne ${ZONES_NOM[z]} → ${RETOURS[z].html}</li>`).join("")}</ul></div>` : ""}${item.id === "verifier" ? QUIZ.map((q, k) => `<div class="print-answer"><strong>${k + 1}. ${esc(q.q)}</strong> ${esc(q.choices[q.good])}. ${esc(q.explain)}</div>`).join("") : ""}<p class="print-codes">Référentiel · ${item.codes.length ? esc(item.codes.join(" · ")) : "contexte"}</p></article>`).join("") +
    `<article class="print-screen"><h2>Sources</h2><p>Référentiel : règlement d’exécution (UE) 2024/2215, annexe I. Symboles : bibliothèque inerWeb (détendeur électronique, sonde de température) ; capteur de pression : QElectroTech, licence CC BY 3.0. Valeurs : ce sont des exemples ; la consigne de surchauffe et les paramètres viennent de la notice du constructeur. Dessins : inerWeb, calculés dans la page.</p></article>`;
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
