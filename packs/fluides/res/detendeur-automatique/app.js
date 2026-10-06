"use strict";
/* =====================================================================
   detendeur-automatique / app.js — gare 4 « Le détendeur automatique »
   ---------------------------------------------------------------------
   Moule de la ligne LES DÉTENDEURS (voir ../_detendeurs-commun/MOULE.md), recopié de la gare 3.
   Même ossature : screens = [screen({...})], un écran = un dessin + 3 lignes de texte, le reste dit par
   la voix (`narration`), référentiel en pied d'écran, version imprimable, lien direct (?ecran=N).
   Les dessins viennent de scene-automatique.js (chargé AVANT ce fichier).
   ===================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const DS = window.DETENDEURS_SCENES, GS = window.AUTOMATIQUE_SCENES || {};

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
    const stored = Number(localStorage.getItem("detendeur-automatique-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("detendeur-automatique-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function screen(data) { return { level: "comprendre", codes: [], ...data }; }
const sym = nom => DS ? DS.symbole(nom) : "";
const figure = () => '<div class="ds-figure" id="ds-figure"></div>';

/* ---------- l'exercice « régler la consigne » (écran 4) : l'élève tourne la vis et lit la BP ---------- */
const NMIN = -3, NMAX = 9;                       // les quarts de tour possibles (la vis a une course limitée)
const exo = { n: 0, p: undefined, calme: 0, stable: true, clics: 0, vite: 0, fait: false, surStable: null };   // lu et écrit à chaque image par la scène
const MSG = {
  depart: "Le repère vert est la BP demandée (un exemple : la vraie valeur est dans la notice). Lisez la BP, puis tournez la vis.",
  bouge: "L’aiguille bouge encore. Attendez qu’elle se stabilise avant de relire la BP.",
  bas: "<strong>BP trop basse.</strong> Visser comprime le ressort et fait monter la BP : encore un quart de tour.",
  haut: "<strong>BP trop haute.</strong> Dévisser détend le ressort et fait baisser la BP : un quart de tour en arrière.",
  ok: "<strong>Oui.</strong> La BP est dans le repère vert et l’aiguille est stable. Mesurer, tourner un peu, attendre : c’est la bonne méthode.",
  vite: " Vous avez tourné plusieurs fois sans attendre : c’est comme ça qu’on dépasse le repère.",
  limite: "La vis est au bout de sa course. Tournez dans l’autre sens."
};
function exoMarkup() {
  return `<div class="au-exo"><div class="ds-dessin" id="au-exo-dessin"></div>${GS.LEGENDE || ""}<div class="au-boutons" role="group" aria-label="Tourner la vis de réglage"><button type="button" class="au-bouton" data-sens="-1"><span class="au-long">↺ Dévisser ¼ de tour</span><span class="au-court">Dévisser ¼</span></button><button type="button" class="au-bouton" data-sens="1"><span class="au-long">Visser ¼ de tour ↻</span><span class="au-court">Visser ¼</span></button><button type="button" class="au-bouton au-reco" id="au-reco"><span class="au-long">Recommencer</span><span class="au-court">Refaire</span></button></div><div class="feedback" id="feedback" role="status"></div></div>`;
}
function retourExo(cls, html) { const f = $("#feedback"); if (!f) return; f.className = "feedback" + (cls ? " " + cls : ""); f.innerHTML = html; }
function bilanExo() {                              // appelé par la scène quand l'aiguille s'est stabilisée après un quart de tour
  const p = exo.p, Z = GS.ZONE;
  if (p >= Z[0] && p <= Z[1]) { exo.fait = true; retourExo("good", MSG.ok + (exo.vite >= 2 ? MSG.vite : "")); }
  else retourExo("", p < Z[0] ? MSG.bas : MSG.haut);
}
function tourner(sens) {
  if (exo.n + sens < NMIN || exo.n + sens > NMAX) { retourExo("bad", MSG.limite); return; }
  exo.n += sens; exo.clics += 1; exo.fait = false;
  if (!exo.stable) exo.vite += 1;                  // il a tourné alors que l'aiguille bougeait encore
  exo.stable = false; exo.calme = 0;
  retourExo("", MSG.bouge);
}
function recommencer() { exo.n = 0; exo.clics = 0; exo.vite = 0; exo.fait = false; exo.stable = false; exo.calme = 0; retourExo("", MSG.depart); }
function wireExo() {
  GS.reglage($("#au-exo-dessin"), exo);
  exo.surStable = bilanExo;
  $$(".au-bouton[data-sens]").forEach(b => b.addEventListener("click", () => tourner(Number(b.dataset.sens))));
  $("#au-reco").addEventListener("click", recommencer);
  if (exo.clics > 0) { if (exo.stable) bilanExo(); else retourExo("", MSG.bouge); } else retourExo("", MSG.depart);
}

/* ---------- le quiz « Vérifier » : 6 questions, une explication pour chaque réponse (écran 5) ---------- */
const QUIZ = [
  { q: "Que règle un détendeur automatique ?", choices: ["La surchauffe à la sortie de l’évaporateur", "La pression d’évaporation", "La pression du condenseur"], good: 1,
    why: ["Non : c’est le travail du détendeur thermostatique, avec son bulbe.", "Oui : il tient la pression d’évaporation, donc la basse pression.", "Non : le condenseur est du côté haute pression. Le détendeur automatique regarde l’évaporateur."],
    explain: "Un ressort contre la pression d’évaporation : il tient la BP à la consigne, pas la surchauffe." },
  { q: "Dans un détendeur automatique, qui pousse la membrane pour ouvrir ?", choices: ["Le ressort", "La pression de l’évaporateur", "Un bulbe"], good: 0,
    why: ["Oui : le ressort pousse la membrane vers le bas et ouvre le clapet.", "Non : la pression de l’évaporateur pousse vers le haut. Elle ferme le clapet.", "Non : il n’y a pas de bulbe sur un détendeur automatique. C’est la pièce du thermostatique."],
    explain: "Ressort : il ouvre. Pression de l’évaporateur : elle ferme. La vis règle la force du ressort." },
  { q: "La charge de la machine augmente. Que fait le détendeur automatique ?", choices: ["Il ouvre : il suit la chaleur", "Il ferme : la BP monte un peu", "Il ne bouge pas"], good: 1,
    why: ["Non : c’est le contraire. La BP monte un peu, elle pousse la membrane et ferme le clapet.", "Oui : la BP monte un peu, la pression gagne sur le ressort, il ferme. La BP revient à la consigne.", "Non : il bouge, mais dans le mauvais sens pour la charge : il ferme."],
    explain: "Il tient la BP, pas le liquide : charge en hausse, il ferme et l’évaporateur manque de liquide." },
  { q: "Sur quelle machine met-on un détendeur automatique ?", choices: ["Une machine à glace en écailles, dont la charge ne change presque pas", "Une chambre froide dont la charge change beaucoup", "N’importe quelle machine"], good: 0,
    why: ["Oui : la charge est constante, la BP reste stable et le détendeur travaille bien.", "Non : si la charge change, il ferme quand il faudrait ouvrir, et il ouvre quand il faudrait fermer.", "Non : il est réservé aux machines à charge constante. Sinon l’évaporateur manque de liquide, ou du liquide revient au compresseur."],
    explain: "Charge constante : il convient. Charge variable : l’évaporateur manque de liquide, ou du liquide revient au compresseur." },
  { q: "Le compresseur s’arrête. Que fait le détendeur automatique ?", choices: ["Il reste fermé : la BP monte", "Il s’ouvre en grand", "Il égalise les pressions"], good: 0,
    why: ["Oui : à l’arrêt la BP monte, elle pousse la membrane et le clapet reste fermé.", "Non : la BP monte et ferme le clapet. Il ne s’ouvre pas.", "Non : fermé, il ne laisse rien passer. Les pressions ne s’équilibrent pas par lui."],
    explain: "À l’arrêt, la BP monte : il reste fermé. Il n’égalise pas les pressions." },
  { q: "Avant de tourner la vis de réglage, que faut-il faire ?", choices: ["Tourner la vis de deux tours d’un coup", "Mesurer la BP au manomètre", "Régler sans manomètre, d’après la position de la vis"], good: 1,
    why: ["Non : on tourne un peu à la fois, d’un quart de tour, puis on laisse stabiliser.", "Oui : on mesure d’abord, on tourne un peu, on attend, puis on mesure de nouveau.", "Non : la position de la vis ne dit pas la BP. Seul le manomètre la donne."],
    explain: "On mesure, on tourne d’un quart de tour, on laisse stabiliser, on mesure de nouveau." }
];
function quizMarkup() {
  const n = QUIZ.length, i = quizState.i;
  if (i >= n) {
    const score = quizState.rep.filter((r, k) => r === QUIZ[k].good).length;
    return `<div class="quiz fin"><p class="score-number">${score} / ${n}</p><p class="score-texte">${score >= 5 ? "Bravo : le détendeur automatique est bien compris." : "Revoyez les écrans 2 et 3, puis recommencez."}</p><button type="button" class="primary-button" id="quiz-restart">Recommencer</button></div>`;
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
const screens = [
  screen({ id: "identite", court: "Carte d’identité", title: "Détendeur automatique", kicker: "Reconnaître · 1", codes: ["9.01"],
    narration: "Voici le détendeur automatique. On l'appelle aussi pressostatique, ou à pression constante. Regardez la membrane, au milieu. Au-dessus, un ressort pousse vers le bas : il veut ouvrir. La vis règle sa force. En dessous, la pression de l'évaporateur pousse vers le haut : elle veut fermer. L'aiguille suit la membrane. Elle ouvre ou ferme le passage du liquide. Ce détendeur règle la pression d'évaporation, c'est-à-dire la basse pression. Il ne règle pas la surchauffe. On le trouve surtout sur les machines à glace en écailles, où la charge ne change presque pas.",
    text: "Une membrane entre un ressort et la pression de l’évaporateur. Il règle la pression d’évaporation.",
    render: figure, wire: () => GS.identite($("#ds-figure"), sym("automatique")) }),
  screen({ id: "balance", court: "La balance", title: "Ressort contre pression", kicker: "Comprendre · 2", codes: ["9.01"],
    narration: "Regardez la balance de la membrane. En haut, le ressort pousse vers le bas : il veut ouvrir. En bas, la pression de l'évaporateur pousse vers le haut : elle veut fermer. Au départ, la basse pression est sous la consigne. Le ressort gagne. La membrane descend, le clapet ouvre, du liquide passe et bout. La basse pression remonte. Elle dépasse un peu la consigne : la pression gagne, et le clapet se referme à moitié. Les deux forces s'équilibrent. La basse pression reste à la consigne. La consigne, c'est la valeur que réclame le ressort. La vis règle ce ressort.",
    text: "Le ressort ouvre, la pression de l’évaporateur ferme. Quand les deux s’équilibrent, la BP reste à la consigne.",
    render: figure, wire: () => GS.balance($("#ds-figure")) }),
  screen({ id: "charge", court: "La charge change", title: "Et si la charge change ?", kicker: "Comprendre · 3", codes: ["9.01"],
    narration: "Voici le piège. Ce détendeur tient la basse pression. C'est son travail, et c'est son défaut. La charge monte : plus de chaleur, la basse pression monte un peu. La pression gagne sur le ressort, le détendeur ferme, et la basse pression revient à la consigne. Elle y reste. Mais la nappe est courte. Il manque du liquide, juste quand l'évaporateur en demande plus. La charge baisse. La basse pression descend un peu. Le ressort gagne, le détendeur ouvre, et la basse pression revient à la consigne. Mais il y a moins de chaleur : la nappe file jusqu'à la sortie. Danger : retour de liquide. On le réserve aux machines dont la charge ne change pas.",
    text: "Il tient la BP, mais pas le liquide : charge en hausse, il en manque ; charge en baisse, il y en a trop.",
    render: figure, wire: () => GS.charge($("#ds-figure")) }),
  screen({ id: "regler", court: "Régler", title: "Régler la consigne", kicker: "Appliquer · 4", codes: ["9.03"], level: "appliquer",
    narration: "À vous de jouer. La notice demande une basse pression : c'est le repère vert sur le manomètre. Lisez d'abord le manomètre. Puis tournez la vis d'un quart de tour. Visser comprime le ressort : la basse pression monte. Dévisser la fait baisser. Attention : l'aiguille met du temps à bouger. Après chaque quart de tour, attendez qu'elle se stabilise, et lisez de nouveau. Si vous tournez trop vite, vous dépassez le repère. Mesurer, tourner un peu, attendre : c'est la bonne méthode.",
    text: "Amenez la BP dans le repère vert avec la vis. Mesurez, tournez un peu, laissez stabiliser.",
    render: exoMarkup, wire: wireExo }),
  screen({ id: "verifier", court: "Vérifier", title: "Vérifier", kicker: "Vérifier · 5", codes: ["9.01", "9.03"], level: "vérifier",
    narration: "Pour finir, six questions sur le détendeur automatique. Il n'y a qu'une bonne réponse à chaque fois. Choisissez, puis lisez l'explication : elle compte autant que la réponse. Si vous hésitez, revenez sur les écrans : la balance du ressort et de la pression, la charge qui change, et le réglage de la vis. Prenez votre temps, et relisez bien chaque réponse avant de passer à la suivante.",
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
  const retenir = ["Une membrane entre un ressort (il ouvre) et la pression de l’évaporateur (elle ferme).", "BP sous la consigne : il ouvre. BP au-dessus : il ferme. Il tient la pression d’évaporation, pas la surchauffe.", "Le piège : il tient la BP, pas le liquide. Charge en hausse, la BP monte un peu, il ferme et l’évaporateur manque de liquide. Charge en baisse, il ouvre et du liquide peut revenir au compresseur.", "Réservé aux machines à charge constante, comme les machines à glace en écailles. À l’arrêt, la BP monte : il reste fermé.", "Réglage : mesurer la BP au manomètre, tourner la vis d’un quart de tour (visser : BP plus haute), laisser stabiliser, mesurer de nouveau."].map(x => `<li>${x}</li>`).join("");
  const correction = "<strong>Correction :</strong> visser comprime le ressort : la BP monte. Dévisser la fait baisser. Méthode : mesurer, tourner d’un quart de tour, attendre que l’aiguille se stabilise, mesurer de nouveau. Le repère vert est un exemple : la vraie valeur est dans la notice de la machine.";
  $("#print-book").innerHTML = `<header class="print-title"><h1>Le détendeur automatique</h1><p>Gare 4 · ${screens.length} écrans · ${QUIZ.length} questions · règlement d’exécution (UE) 2024/2215, annexe I.</p><p><strong>À retenir :</strong></p><ul>${retenir}</ul></header>` +
    screens.map((item, index) => `<article class="print-screen"><h2>${index + 1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.id === "regler" ? `<div class="print-answer">${correction}</div>` : ""}${item.id === "verifier" ? QUIZ.map((q, k) => `<div class="print-answer"><strong>${k + 1}. ${esc(q.q)}</strong> ${esc(q.choices[q.good])}. ${esc(q.explain)}</div>`).join("") : ""}<p class="print-codes">Référentiel · ${item.codes.length ? esc(item.codes.join(" · ")) : "contexte"}</p></article>`).join("") +
    `<article class="print-screen"><h2>Sources</h2><p>Référentiel : règlement d’exécution (UE) 2024/2215, annexe I. Symbole du détendeur automatique : « vanne à pression constante », QElectroTech, licence CC BY 3.0, fichier valv-pres-cte.svg. Valeur de consigne : donnée par la notice du constructeur. Dessins : inerWeb, calculés dans la page.</p></article>`;
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
