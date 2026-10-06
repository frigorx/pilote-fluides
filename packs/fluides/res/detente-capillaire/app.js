"use strict";
/* =====================================================================
   detente-capillaire / app.js — gare 5 « La détente par tube capillaire »
   ---------------------------------------------------------------------
   Moule de la ligne LES DÉTENDEURS (voir ../_detendeurs-commun/MOULE.md), recopié de la gare 3.
   Même ossature : screens = [screen({...})], un écran = un dessin + 3 lignes de texte, le reste dit par
   la voix (`narration`), référentiel en pied d'écran, version imprimable, lien direct (?ecran=N).
   Les dessins viennent de scene-capillaire.js (chargé AVANT ce fichier).
   ===================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const DS = window.DETENDEURS_SCENES, GS = window.CAPILLAIRE_SCENES || {};

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
    const stored = Number(localStorage.getItem("detente-capillaire-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("detente-capillaire-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function screen(data) { return { level: "comprendre", codes: [], ...data }; }
const sym = nom => DS ? DS.symbole(nom) : "";
const figure = () => '<div class="ds-figure" id="ds-figure"></div>';

/* ---------- l'exercice « charger la machine » (écran 6) : l'élève règle la charge, la nappe réagit ---------- */
const NOMINAL = GS.NOMINAL || 120, TOL = 5;     // la charge de la plaque signalétique : un EXEMPLE ; « juste » = à 5 g près (exemple)
const exo = { g: 60, touche: false };           // lu à chaque image par la scène
const verdictCharge = g => g < 8 ? "vide" : Math.abs(g - NOMINAL) <= TOL ? "juste" : g < NOMINAL ? "manque" : "trop";
const RETOURS = {
  vide: { ok: false, txt: "<strong>La machine est vide.</strong> Rien ne peut refroidir : ajoutez du fluide avec la balance." },
  manque: { ok: false, txt: "<strong>Pas assez.</strong> La nappe est courte : l’évaporateur manque de liquide et refroidit mal. Ajoutez du fluide." },
  juste: { ok: true, txt: "<strong>Juste.</strong> La nappe s’arrête avant la sortie : c’est la charge de la plaque signalétique. Un capillaire ne corrige rien : on pèse exactement." },
  trop: { ok: false, txt: "<strong>Trop.</strong> Le liquide va jusqu’à la sortie de l’évaporateur : il peut revenir au compresseur. Retirez du fluide." }
};

function exoMarkup() {
  return `<div class="cp-exo"><div class="ds-dessin" id="cp-exo-dessin"></div>` +
    `<div class="cp-panneau"><div class="cp-balance" role="group" aria-label="Balance de charge (exemple)"><span class="cp-balance-nom">Balance</span><output class="cp-poids" id="cp-poids" for="cp-curseur">${exo.g} g</output></div>` +
    `<div class="cp-reglage"><button type="button" class="cp-btn" data-pas="-5" aria-label="Retirer 5 grammes">− 5 g</button>` +
    `<input type="range" id="cp-curseur" min="0" max="200" step="5" value="${exo.g}" aria-label="Charge de fluide en grammes (exemple)">` +
    `<button type="button" class="cp-btn" data-pas="5" aria-label="Ajouter 5 grammes">+ 5 g</button></div>` +
    `<p class="cp-plaque">Plaque signalétique (exemple) : <strong>${NOMINAL} g</strong></p></div>` +
    `<div class="feedback" id="feedback" role="status">${exo.touche ? "" : "Ajoutez du fluide avec le curseur ou les boutons, puis regardez la nappe."}</div></div>`;
}
function majCharge() {
  $("#cp-poids").textContent = exo.g + " g"; $("#cp-curseur").value = String(exo.g);
  const v = RETOURS[verdictCharge(exo.g)], f = $("#feedback");
  f.className = "feedback " + (v.ok ? "good" : "bad"); f.innerHTML = v.txt;
}
function regler(g) { exo.g = Math.max(0, Math.min(200, Math.round(g / 5) * 5)); exo.touche = true; majCharge(); }
function wireExo() {
  GS.exo($("#cp-exo-dessin"), exo);
  $("#cp-curseur").addEventListener("input", e => regler(Number(e.target.value)));
  $$(".cp-btn").forEach(b => b.addEventListener("click", () => regler(exo.g + Number(b.dataset.pas))));
  if (exo.touche) majCharge();
}

/* ---------- le quiz « Vérifier » : 6 questions, une explication pour chaque réponse (écran 7) ---------- */
const QUIZ = [
  { q: "Ce symbole est celui du tube capillaire. Que règle-t-il ?", img: "capillaire", choices: ["Rien : sa longueur et son diamètre font tout", "La surchauffe", "La pression d’évaporation"], good: 0,
    why: ["Oui : il n’a aucune pièce qui bouge, donc aucun réglage.", "Non : la surchauffe est réglée par un détendeur thermostatique ou électronique.", "Non : la pression d’évaporation est réglée par un détendeur automatique."],
    explain: "Le capillaire est un simple tube : sa longueur et son diamètre ont été choisis une fois pour toutes." },
  { q: "Qu’est-ce qui fait baisser la pression dans un tube capillaire ?", choices: ["Une vis de réglage", "Le frottement du liquide dans un tube très fin et très long", "Un ressort et une membrane"], good: 1,
    why: ["Non : un capillaire n’a ni vis ni réglage.", "Oui : c’est la perte de charge du tube qui fait la détente.", "Non : le ressort et la membrane sont ceux d’un détendeur thermostatique ou automatique."],
    explain: "La pression baisse mètre après mètre. Quand elle est assez basse, les premières bulles naissent, avant la sortie du tube." },
  { q: "Le compresseur s’arrête. Que se passe-t-il à travers le capillaire ?", choices: ["Rien : le tube se ferme", "Les pressions HP et BP se rejoignent", "La haute pression monte encore"], good: 1,
    why: ["Non : le capillaire n’a aucune pièce qui bouge, il ne se ferme jamais.", "Oui : le fluide passe, la HP baisse et la BP monte jusqu’à se rejoindre.", "Non : elle baisse, puisque le fluide s’écoule vers la basse pression."],
    explain: "C’est pour ça que le moteur redémarre sans effort : il ne pousse pas contre la haute pression." },
  { q: "Pourquoi pèse-t-on exactement la charge d’une machine à capillaire ?", choices: ["Parce que le capillaire ne corrige rien : trop ou pas assez se voit tout de suite", "Parce que le capillaire règle la charge tout seul", "Parce qu’une bouteille liquide garde le surplus"], good: 0,
    why: ["Oui : pas de réglage, pas de bouteille liquide : la charge doit être juste.", "Non : c’est justement l’inverse, il ne règle rien.", "Non : une machine à capillaire n’a pas de bouteille liquide pour garder le surplus."],
    explain: "Pas assez : la nappe est courte et l’évaporateur refroidit mal. Trop : le liquide peut revenir au compresseur." },
  { q: "Un capillaire est bouché. Que constate-t-on ?", choices: ["L’évaporateur déborde de liquide", "La basse pression est très basse, l’évaporateur est vide et ne givre plus", "Les deux pressions se rejoignent en marche"], good: 1,
    why: ["Non : c’est l’inverse, l’évaporateur ne reçoit plus de fluide.", "Oui : l’évaporateur manque de fluide, il ne refroidit plus.", "Non : en marche, le bouchon sépare les deux côtés : la BP chute encore plus."],
    explain: "Le bouchon est de la glace (humidité) ou de la saleté ; on voit souvent du givre sur le tube. Le filtre déshydrateur, juste avant, sert à l’éviter. On ne raccourcit pas et on ne pince pas un capillaire : on le remplace." },
  { q: "Pourquoi braser le capillaire contre la conduite d’aspiration ?", choices: ["Pour échanger de la chaleur : le liquide se refroidit, la vapeur se réchauffe", "Pour le tenir droit", "Pour réchauffer le liquide"], good: 0,
    why: ["Oui : les deux tubes se touchent et s’échangent de la chaleur.", "Non : ce n’est pas seulement un support, c’est un échange de chaleur voulu.", "Non : c’est l’inverse, le liquide arrive plus froid au bout du tube."],
    explain: "Le liquide plus froid donne plus de froid utile dans l’évaporateur ; la vapeur un peu plus chaude protège le compresseur." }
];
function quizMarkup() {
  const n = QUIZ.length, i = quizState.i;
  if (i >= n) {
    const score = quizState.rep.filter((r, k) => r === QUIZ[k].good).length;
    return `<div class="quiz fin"><p class="score-number">${score} / ${n}</p><p class="score-texte">${score >= 5 ? "Bravo : le tube capillaire est bien compris." : "Revoyez les écrans 2 à 5, puis recommencez."}</p><button type="button" class="primary-button" id="quiz-restart">Recommencer</button></div>`;
  }
  const item = QUIZ[i], rep = quizState.rep[i], repondu = rep !== undefined;
  const choix = item.choices.map((c, k) => `<button type="button" class="choice ${repondu ? (k === item.good ? "good" : k === rep ? "bad" : "") : ""}" data-quiz-choice="${k}" ${repondu ? "disabled" : ""}><strong>${String.fromCharCode(65 + k)}.</strong> ${esc(c)}</button>`).join("");
  const retour = repondu
    ? `<div class="feedback ${rep === item.good ? "good" : "bad"}" id="feedback" role="status"><strong>${rep === item.good ? "Correct." : "À revoir."}</strong> ${esc(item.why[rep])} ${esc(item.explain)}</div><button type="button" class="primary-button" id="quiz-next">${i === n - 1 ? "Voir le résultat" : "Question suivante →"}</button>`
    : `<div class="feedback" id="feedback" role="status">Choisissez une réponse.</div>`;
  return `<div class="quiz"><p class="quiz-n">Question ${i + 1} sur ${n}</p><p class="quiz-q">${esc(item.q)}</p>${item.img ? `<img class="quiz-img" src="${sym(item.img)}" alt="Le symbole du tube capillaire : un trait enroulé">` : ""}<div class="choices">${choix}</div>${retour}</div>`;
}
function renderQuiz() { const z = $("#activity-zone"); z.innerHTML = quizMarkup(); wireQuiz(); }
function wireQuiz() {
  $$("[data-quiz-choice]").forEach(b => b.addEventListener("click", () => { quizState.rep[quizState.i] = Number(b.dataset.quizChoice); renderQuiz(); }));
  const next = $("#quiz-next"); if (next) next.addEventListener("click", () => { quizState.i += 1; renderQuiz(); });
  const again = $("#quiz-restart"); if (again) again.addEventListener("click", () => { quizState.i = 0; quizState.rep = []; renderQuiz(); });
}

/* ---------- les 7 écrans ---------- */
const screens = [
  screen({ id: "identite", court: "Carte d’identité", title: "Le tube capillaire", kicker: "Reconnaître · 1", codes: ["9.01"],
    narration: "Voici le tube capillaire. C'est un simple tube de cuivre, très fin et très long. En vrai, on l'enroule pour qu'il tienne dans la machine. Il n'a aucune pièce qui bouge, et aucun réglage. Suivez la visite. D'abord, le filtre déshydrateur : il retient l'humidité et la saleté. Ensuite, le tube capillaire lui-même, bien plus fin que le tube de l'évaporateur. Enfin, l'évaporateur, où le fluide va bouillir. Ce qu'il règle ? Rien. Sa longueur et son diamètre font tout. On le trouve sur les réfrigérateurs ménagers et sur les petits meubles froids.",
    text: "Un tube de cuivre très fin et très long. Rien ne bouge : sa longueur et son diamètre font la détente.",
    render: figure, wire: () => GS.identite($("#ds-figure"), sym("capillaire")) }),
  screen({ id: "detente", court: "La détente", title: "La détente le long du tube", kicker: "Comprendre · 2", codes: ["9.01"],
    narration: "Regardez comment la pression baisse le long du tube. Le liquide entre chaud, sous haute pression : le premier manomètre est haut. Le tube est très fin et très long. Le liquide frotte contre la paroi, et à chaque mètre il perd un peu de pression. On appelle ça la perte de charge. Les manomètres descendent l'un après l'autre. Quand la pression est assez basse, le liquide commence à bouillir : les premières bulles naissent avant la sortie. Elles grossissent, et le fluide se refroidit. À la sortie, c'est un mélange de liquide et de vapeur, froid, sous basse pression. Il entre dans l'évaporateur.",
    text: "Le liquide frotte dans le tube très fin : sa pression baisse mètre après mètre, puis il commence à bouillir.",
    render: figure, wire: () => GS.detente($("#ds-figure")) }),
  screen({ id: "aspiration", court: "Collé à l’aspiration", title: "Collé à la conduite d’aspiration", kicker: "Comprendre · 3", codes: ["9.01"],
    narration: "Sur beaucoup de machines, le capillaire est brasé contre le tube d'aspiration. Regardez : le liquide du capillaire va vers l'évaporateur, et la vapeur froide revient en sens inverse. Les deux tubes se touchent : ils échangent de la chaleur. Le liquide se refroidit : le thermomètre du liquide baisse. La vapeur se réchauffe : le thermomètre de la vapeur monte. Un liquide plus froid, c'est plus de froid utile dans l'évaporateur. Une vapeur un peu plus chaude, c'est aussi plus de sécurité pour le compresseur. Ce contact fait partie de la machine : on le laisse en place.",
    text: "Le capillaire est souvent brasé contre l’aspiration : le liquide se refroidit, la vapeur se réchauffe.",
    render: figure, wire: () => GS.aspiration($("#ds-figure")) }),
  screen({ id: "arret", court: "À l’arrêt", title: "Et si on arrête le compresseur ?", kicker: "Comprendre · 4", codes: ["9.01"],
    narration: "Et si on arrête le compresseur ? Pendant la marche, la haute pression est d'un côté du tube, la basse pression de l'autre. Le compresseur s'arrête. Le tube capillaire reste ouvert : il n'a aucune pièce qui bouge, donc rien ne se ferme. Le fluide passe à travers le tube. La haute pression baisse, la basse pression monte, et les deux manomètres se rejoignent. Il faut un peu de temps. Au redémarrage, le moteur ne pousse pas contre la haute pression : il démarre sans effort. C'est pour ça que les petits moteurs des réfrigérateurs ont un faible couple de démarrage.",
    text: "À l’arrêt, le tube reste ouvert : les deux pressions se rejoignent, et le moteur redémarre sans effort.",
    render: figure, wire: () => GS.arret($("#ds-figure")) }),
  screen({ id: "bouche", court: "S’il se bouche", title: "Et si le capillaire se bouche ?", kicker: "Comprendre · 5", codes: ["9.01"],
    narration: "Que se passe-t-il si le capillaire se bouche ? Le tube est si fin qu'un rien le bouche. De l'humidité dans le circuit peut geler à la sortie du tube : un bouchon de glace. Ou bien de la saleté. Du givre se forme sur le tube. Le compresseur continue d'aspirer, mais l'évaporateur ne reçoit plus de fluide. La basse pression devient très basse. Le liquide de l'évaporateur disparaît, et le givre aussi : plus de froid. Pour l'éviter, on place un filtre déshydrateur juste avant le capillaire. Et on ne raccourcit jamais un capillaire, on ne le pince pas : on le remplace.",
    text: "Glace ou saleté : le tube se bouche, la BP chute, l’évaporateur se vide et le givre disparaît.",
    render: figure, wire: () => GS.bouche($("#ds-figure")) }),
  screen({ id: "charge", court: "Charger", title: "Charger la machine", kicker: "Appliquer · 6", codes: ["9.01"], level: "appliquer",
    narration: "À vous de charger la machine. Un capillaire ne corrige rien : on dit que la charge est critique. Elle doit être exacte, et on la pèse sur une balance. Ajoutez du fluide avec le curseur, ou avec les boutons. Regardez la nappe de liquide dans l'évaporateur. Pas assez de fluide : la nappe est courte, l'évaporateur manque de liquide. Trop de fluide : le liquide va jusqu'à la sortie, et peut revenir au compresseur. Le bon poids est celui de la plaque signalétique. Ici, c'est un exemple : cent vingt grammes. Sur une vraie machine, on lit la plaque.",
    text: "Chargez la machine : ajoutez ou retirez du fluide, et regardez la nappe dans l’évaporateur.",
    render: exoMarkup, wire: wireExo }),
  screen({ id: "verifier", court: "Vérifier", title: "Vérifier", kicker: "Vérifier · 7", codes: ["9.01"], level: "vérifier",
    narration: "Pour finir, six questions sur le tube capillaire. Il n'y a qu'une bonne réponse à chaque fois. Choisissez, puis lisez l'explication : elle compte autant que la réponse. Si vous hésitez, revenez sur les écrans : la détente le long du tube, le tube collé à l'aspiration, l'arrêt du compresseur, le bouchon, et la charge. Prenez votre temps.",
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
  const retenir = ["Un tube de cuivre très fin et très long : c’est sa perte de charge qui fait la détente. Aucune pièce mobile, aucun réglage.", "Le liquide perd de la pression tout le long du tube ; il commence à bouillir avant la sortie. À la sortie : un mélange froid de liquide et de vapeur.", "À l’arrêt, les pressions HP et BP se rejoignent à travers le tube : le compresseur redémarre sans effort (moteur à faible couple de démarrage).", "Pas de bouteille liquide : la charge est critique, on la pèse exactement. Trop ou pas assez se voit tout de suite.", "Souvent brasé contre la conduite d’aspiration : le liquide se refroidit, la vapeur se réchauffe.", "Il craint l’humidité (la glace le bouche) et les impuretés : filtre déshydrateur juste avant. On ne le raccourcit pas, on ne le pince pas : on le remplace."].map(x => `<li>${x}</li>`).join("");
  const correction = Object.keys(RETOURS).filter(k => k !== "vide").map(k => `<li>${{ manque: "Moins que la plaque", juste: "La charge de la plaque (exemple : " + NOMINAL + " g)", trop: "Plus que la plaque" }[k]} → ${RETOURS[k].txt}</li>`).join("");
  $("#print-book").innerHTML = `<header class="print-title"><h1>La détente par tube capillaire</h1><p>Gare 5 · ${screens.length} écrans · ${QUIZ.length} questions · règlement d’exécution (UE) 2024/2215, annexe I.</p><p><strong>À retenir :</strong></p><ul>${retenir}</ul></header>` +
    screens.map((item, index) => `<article class="print-screen"><h2>${index + 1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.id === "charge" ? `<div class="print-answer"><strong>Correction :</strong><ul>${correction}</ul></div>` : ""}${item.id === "verifier" ? QUIZ.map((q, k) => `<div class="print-answer"><strong>${k + 1}. ${esc(q.q)}</strong> ${esc(q.choices[q.good])}. ${esc(q.explain)}</div>`).join("") : ""}<p class="print-codes">Référentiel · ${item.codes.length ? esc(item.codes.join(" · ")) : "contexte"}</p></article>`).join("") +
    `<article class="print-screen"><h2>Sources</h2><p>Référentiel : règlement d’exécution (UE) 2024/2215, annexe I (9.01 ; appui 1.02, 1.04, 5.05, 5.06, 9.10). Symbole : bibliothèque inerWeb (tube capillaire). Charge de l’exercice : un exemple, la vraie valeur est sur la plaque signalétique. Dessins : inerWeb, calculés dans la page.</p></article>`;
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
