"use strict";
/* =====================================================================
   detendeurs-famille / app.js — gare 0 « La famille des détendeurs »
   ---------------------------------------------------------------------
   Moule de la ligne LES DÉTENDEURS (voir ../_detendeurs-commun/MOULE.md).
   Même ossature que condenseur-interactif : screens = [screen({...})], un écran
   = un dessin + 3 lignes de texte, le reste dit par la voix (`narration`),
   référentiel en pied d'écran, version imprimable, lien direct (?ecran=N).
   Les dessins viennent de scene-famille.js (chargé AVANT ce fichier).
   ===================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const DS = window.DETENDEURS_SCENES, GS = window.GARE0_SCENES || {};

const quizState = { i: 0, rep: [] };           // les réponses restent tant que la page est ouverte
const assoc = {};                              // exercice : machine -> type trouvé
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
    const stored = Number(localStorage.getItem("detendeurs-famille-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("detendeurs-famille-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function screen(data) { return { level: "comprendre", codes: [], ...data }; }
const sym = nom => DS ? DS.symbole(nom) : "";
const figure = () => '<div class="ds-figure" id="ds-figure"></div>';

/* ---------- l'exercice « quel détendeur pour quelle machine ? » (écran 5) ---------- */
const CONVIENT = {
  capillaire: "convient aux petites machines à charge stable",
  automatique: "convient à une charge constante : il ferme quand la charge monte",
  thermostatique: "convient à une charge qui varie, en froid commercial",
  electronique: "convient à une grande plage de puissance, avec variateur"
};
const LE = { capillaire: "Le capillaire", automatique: "L’automatique", thermostatique: "Le thermostatique", electronique: "L’électronique" };
const MACHINES = [
  { id: "frigo", nom: "Réfrigérateur ménager", indice: "petite machine, charge stable", bon: "capillaire",
    pourquoi: "Petite machine, charge presque toujours la même : un simple tube suffit, sans pièce qui bouge." },
  { id: "glace", nom: "Machine à glace en écailles", indice: "charge constante : toujours le même travail", bon: "automatique",
    pourquoi: "Elle fait toujours le même travail : la charge ne varie pas, un détendeur qui tient la pression suffit. C’est là qu’on trouve surtout l’automatique." },
  { id: "chambre", nom: "Chambre froide", indice: "charge qui varie : portes, produits", bon: "thermostatique",
    pourquoi: "La charge change tout le temps : le détendeur doit suivre la surchauffe." },
  { id: "variateur", nom: "Machine à variateur", indice: "grande plage de puissance", bon: "electronique",
    pourquoi: "Le compresseur tourne vite ou lentement : seul un détendeur commandé par calcul suit une si grande plage." }
];
let choisi = null;                              // le détendeur tenu en main (clic ou glisser)

function assocMarkup() {
  const types = DS.TYPES.map(t => `<button type="button" class="chip" draggable="true" data-type="${t}" aria-pressed="${choisi === t}"><img src="${sym(t)}" alt=""><span>${DS.NOMS[t].nom}</span></button>`).join("");
  const rows = MACHINES.map(m => {
    const trouve = assoc[m.id];
    return `<div class="machine ${trouve ? "ok" : ""}" data-machine="${m.id}" role="button" tabindex="0" aria-label="${esc(m.nom)} : ${esc(m.indice)}">
      <span class="machine-nom">${esc(m.nom)}<small>${esc(m.indice)}</small></span>
      <span class="machine-slot">${trouve ? `<img src="${sym(trouve)}" alt=""><b>${DS.NOMS[trouve].nom}</b> ✓` : "touchez ou glissez ici"}</span></div>`;
  }).join("");
  return `<div class="assoc"><div class="chips" aria-label="Les quatre détendeurs">${types}</div><div class="machines">${rows}</div><div class="feedback" id="feedback" role="status">Touchez un détendeur, puis la machine qui lui convient.</div></div>`;
}
function wireAssoc() {
  const retour = (cls, html) => { const f = $("#feedback"); f.className = "feedback " + cls; f.innerHTML = html; };
  const poser = (machineId, type) => {
    const m = MACHINES.find(x => x.id === machineId);
    if (!m || !type || assoc[m.id]) return;
    if (type === m.bon) {
      assoc[m.id] = type;
      const fini = MACHINES.every(x => assoc[x.id]);
      choisi = null;
      renderAssoc();
      retour("good", `<strong>Oui.</strong> ${esc(m.pourquoi)}${fini ? " <strong>Bravo : les quatre sont associées.</strong>" : ""}`);
    } else {
      renderAssoc();
      const mm = $(`[data-machine="${m.id}"]`); if (mm) mm.classList.add("faux");
      retour("bad", `<strong>Pas celui-là.</strong> ${LE[type]} ${esc(CONVIENT[type])}. Ici : ${esc(m.indice)}.`);
    }
  };
  $$(".chip").forEach(chip => {
    chip.addEventListener("click", () => { choisi = choisi === chip.dataset.type ? null : chip.dataset.type; $$(".chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.type === choisi))); });
    chip.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", chip.dataset.type); choisi = chip.dataset.type; });
  });
  $$(".machine").forEach(row => {
    const agir = () => { if (!choisi) { retour("", "Touchez d’abord un détendeur, puis la machine."); return; } poser(row.dataset.machine, choisi); };
    row.addEventListener("click", agir);
    row.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); agir(); } });
    row.addEventListener("dragover", e => e.preventDefault());
    row.addEventListener("drop", e => { e.preventDefault(); poser(row.dataset.machine, e.dataTransfer.getData("text/plain") || choisi); });
  });
}
function renderAssoc() { const z = $("#activity-zone"); z.innerHTML = assocMarkup(); wireAssoc(); }

/* ---------- le quiz « Vérifier » : 6 questions, une explication pour chaque réponse (écran 7) ---------- */
const QUIZ = [
  { q: "Quel détendeur ce symbole représente-t-il ?", img: "capillaire", choices: ["Le capillaire", "Le thermostatique", "L’électronique"], good: 0,
    why: ["Oui : le trait enroulé figure un tube très long et très fin.", "Non : le thermostatique a un cercle (la tête) au-dessus de la vanne.", "Non : l’électronique a un cercle marqué TCE au-dessus de la vanne."],
    explain: "Le capillaire se reconnaît à son trait enroulé : c’est un simple tube, sans pièce qui bouge." },
  { q: "Quelles sont les deux missions du détendeur ?", choices: ["Faire chuter la pression et doser le liquide", "Refroidir l’air et chauffer le liquide", "Comprimer la vapeur et la renvoyer"], good: 0,
    why: ["Oui : la pression baisse, et le passage dose le liquide qui entre.", "Non : refroidir l’air, c’est le travail de l’évaporateur.", "Non : comprimer la vapeur, c’est le travail du compresseur."],
    explain: "Le détendeur chute la pression pour que le liquide bouille froid, et dose le liquide envoyé à l’évaporateur." },
  { q: "La chambre se réchauffe. Que fait le détendeur capillaire ?", choices: ["Il ouvre", "Il ferme", "Rien : son passage ne change pas"], good: 2,
    why: ["Non : il n’a aucune pièce qui bouge, il ne peut pas ouvrir.", "Non : il n’a aucune pièce qui bouge, il ne peut pas fermer.", "Oui : un tube fin et long a toujours le même passage."],
    explain: "Le capillaire ne règle rien. Quand la charge change, il ne s’adapte pas : il donne trop ou trop peu de liquide." },
  { q: "La chambre se réchauffe et la pression monte. Que fait le détendeur automatique ?", choices: ["Il ouvre", "Il ferme", "Rien"], good: 1,
    why: ["Non : c’est ce qu’il faudrait faire, mais il ne le fait pas.", "Oui : la pression pousse la membrane, et il ferme.", "Non : il réagit à la pression, il bouge."],
    explain: "Il ferme alors que l’évaporateur a besoin de plus de liquide : c’est son défaut. On le réserve aux charges constantes, comme les machines à glace." },
  { q: "Que sent le bulbe d’un détendeur thermostatique ?", choices: ["La pression à l’entrée du compresseur", "La température de sortie de l’évaporateur", "La température de la chambre"], good: 1,
    why: ["Non : le bulbe mesure une température, pas une pression.", "Oui : il est collé sur le tube à la sortie de l’évaporateur.", "Non : il est sur le tube, pas dans la chambre."],
    explain: "Sortie plus chaude, bulbe plus chaud : le détendeur ouvre. Il règle la surchauffe." },
  { q: "Une machine à variateur de vitesse : quel détendeur choisir ?", choices: ["Le capillaire", "L’automatique", "L’électronique"], good: 2,
    why: ["Non : un tube fixe ne suit pas une grande plage de puissance.", "Non : il ne suit pas la charge, il ferme quand elle monte.", "Oui : le régulateur calcule et suit la grande plage de puissance."],
    explain: "Le détendeur électronique est commandé par un régulateur : il suit la grande plage de puissance d’un variateur." }
];
function quizMarkup() {
  const n = QUIZ.length, i = quizState.i;
  if (i >= n) {
    const score = quizState.rep.filter((r, k) => r === QUIZ[k].good).length;
    return `<div class="quiz fin"><p class="score-number">${score} / ${n}</p><p class="score-texte">${score >= 5 ? "Bravo : la famille est bien en tête." : "Revoyez les écrans 3 et 4, puis recommencez."}</p><button type="button" class="primary-button" id="quiz-restart">Recommencer</button></div>`;
  }
  const item = QUIZ[i], rep = quizState.rep[i], repondu = rep !== undefined;
  const choix = item.choices.map((c, k) => `<button type="button" class="choice ${repondu ? (k === item.good ? "good" : k === rep ? "bad" : "") : ""}" data-quiz-choice="${k}" ${repondu ? "disabled" : ""}><strong>${String.fromCharCode(65 + k)}.</strong> ${esc(c)}</button>`).join("");
  const retour = repondu
    ? `<div class="feedback ${rep === item.good ? "good" : "bad"}" id="feedback" role="status"><strong>${rep === item.good ? "Correct." : "À revoir."}</strong> ${esc(item.why[rep])} ${esc(item.explain)}</div><button type="button" class="primary-button" id="quiz-next">${i === n - 1 ? "Voir le résultat" : "Question suivante →"}</button>`
    : `<div class="feedback" id="feedback" role="status">Choisissez une réponse.</div>`;
  return `<div class="quiz"><p class="quiz-n">Question ${i + 1} sur ${n}</p><p class="quiz-q">${esc(item.q)}</p>${item.img ? `<img class="quiz-img" src="${sym(item.img)}" alt="Un symbole de détendeur">` : ""}<div class="choices">${choix}</div>${retour}</div>`;
}
function renderQuiz() { const z = $("#activity-zone"); z.innerHTML = quizMarkup(); wireQuiz(); }
function wireQuiz() {
  $$("[data-quiz-choice]").forEach(b => b.addEventListener("click", () => { quizState.rep[quizState.i] = Number(b.dataset.quizChoice); renderQuiz(); }));
  const next = $("#quiz-next"); if (next) next.addEventListener("click", () => { quizState.i += 1; renderQuiz(); });
  const again = $("#quiz-restart"); if (again) again.addEventListener("click", () => { quizState.i = 0; quizState.rep = []; renderQuiz(); });
}

/* ---------- les 7 écrans ---------- */
const screens = [
  screen({ id: "pourquoi-detendre", court: "Pourquoi détendre ?", title: "Pourquoi détendre ?", kicker: "Comprendre · 1", codes: ["1.04"],
    narration: "Le détendeur est le petit passage qui sépare la haute pression de la basse pression. Regardez. Le liquide arrive tiède, sous haute pression, et le tube est plein. Il rencontre un passage très étroit. En traversant, la pression chute d'un coup. Alors une partie du liquide se met à bouillir : les bulles naissent au fond. Pour bouillir, cette partie prend de la chaleur au reste du liquide. À la sortie, tout le mélange est froid : un peu de liquide, un peu de vapeur. C'est ce mélange froid qui va entrer dans l'évaporateur.",
    text: "Le liquide arrive tiède, sous haute pression. Il passe par un passage très étroit : la pression chute et il ressort froid.",
    render: figure, wire: () => GS.pourquoi($("#ds-figure")) }),
  screen({ id: "deux-missions", court: "Deux missions", title: "Deux missions", kicker: "Comprendre · 2", codes: ["1.04"],
    narration: "Le détendeur a deux missions. Première mission : faire chuter la pression. C'est ce qui permet au liquide de bouillir à basse température, donc de devenir froid. Deuxième mission : doser le liquide qui entre dans l'évaporateur. Si le passage est trop petit, le liquide finit de s'évaporer trop tôt. Le bout du tube ne sert à rien, et la vapeur sort très chaude : c'est une forte surchauffe. Si le passage est trop grand, le liquide n'a pas le temps de bouillir, et il repart vers le compresseur : c'est dangereux. Le bon dosage, c'est quand tout le liquide s'évapore juste avant la sortie. Reste une question : qui décide du bon passage ? C'est justement ce qui distingue les quatre détendeurs.",
    text: "Deux missions : faire chuter la pression, et doser le liquide qui entre dans l’évaporateur.",
    render: figure, wire: () => GS.missions($("#ds-figure")) }),
  screen({ id: "qui-regle-quoi", court: "Qui règle quoi ?", title: "Qui règle quoi ?", kicker: "Reconnaître · 3", codes: ["9.01"],
    narration: "Il existe quatre familles de détendeurs. Le capillaire est un tube très fin et très long. Rien ne bouge : il ne règle rien. L'automatique oppose un ressort à la pression de l'évaporateur : il règle la pression. On le trouve surtout sur les machines à glace. Le thermostatique a un bulbe collé sur la sortie de l'évaporateur : il règle la surchauffe. L'électronique a des capteurs et un régulateur : il règle aussi la surchauffe, mais calculée. Touchez chaque carte pour la lire. Sur un schéma, chacun a son symbole : retenez-les.",
    text: "Capillaire : rien. Automatique : la pression. Thermostatique : la surchauffe. Électronique : la surchauffe, calculée.",
    render: figure, wire: () => GS.cartes($("#ds-figure")) }),
  screen({ id: "et-si-ca-chauffe", court: "Et si ça chauffe ?", title: "Et si la chambre chauffe ?", kicker: "Comprendre · 4", codes: ["9.01"],
    narration: "Voici l'écran important. La chambre froide se réchauffe : on vient d'y entrer des produits chauds. L'évaporateur reçoit plus de chaleur, le liquide s'évapore plus vite, la sortie devient plus chaude. Il faudrait donner plus de liquide. Regardez ce que fait chacun. Le capillaire ne sent rien : son passage ne change pas, donc il manque de liquide. L'automatique sent la pression monter, et il ferme : il fait exactement l'inverse de ce qu'il faudrait. Le thermostatique sent la sortie plus chaude avec son bulbe, et il ouvre. L'électronique lit ses capteurs, calcule, et ouvre au plus juste. Retenez-le : seuls le thermostatique et l'électronique suivent la chaleur.",
    text: "La chambre se réchauffe : il faut plus de liquide. Qui suit la chaleur, et qui fait le contraire ?",
    render: figure, wire: () => GS.etsi($("#ds-figure")) }),
  screen({ id: "quel-detendeur", court: "Quelle machine ?", title: "Quel détendeur, quelle machine ?", kicker: "Appliquer · 5", codes: ["9.01"], level: "appliquer",
    narration: "À vous de jouer. Quatre machines, quatre détendeurs. Touchez un détendeur, puis la machine qui lui convient. Ou bien faites glisser le détendeur sur la machine. Pensez à la charge : est-elle petite et stable, constante, variable, ou sur une grande plage ? Si vous vous trompez, l'explication vous dit pourquoi.",
    text: "Associez chaque machine au détendeur qui lui convient. Touchez un détendeur, puis la machine.",
    render: assocMarkup, wire: wireAssoc }),
  screen({ id: "variantes", court: "Deux variantes", title: "Deux variantes", kicker: "Reconnaître · 6", codes: ["9.01"],
    narration: "Le détendeur thermostatique a deux variantes que vous allez étudier dans les prochaines gares. La première est l'égalisation externe. Dans un évaporateur, la pression baisse entre l'entrée et la sortie. Un petit tube amène sous la membrane la pression de la sortie, là où elle est la plus basse. La seconde est le MOP. La charge du bulbe est limitée : au-delà d'une certaine température, la pression du bulbe ne monte plus. Le détendeur ne peut plus ouvrir davantage, et la basse pression reste plafonnée.",
    text: "Le thermostatique a deux variantes : l’égalisation externe et le MOP. Elles ont chacune leur gare.",
    render: figure, wire: () => GS.variantes($("#ds-figure")) }),
  screen({ id: "verifier", court: "Vérifier", title: "Vérifier", kicker: "Vérifier · 7", codes: ["1.04", "9.01"], level: "vérifier",
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
  const types = DS ? DS.TYPES.map(t => `<li><strong>${DS.NOMS[t].nom}</strong> : il règle ${esc(DS.NOMS[t].regle)}.</li>`).join("") : "";
  $("#print-book").innerHTML = `<header class="print-title"><h1>La famille des détendeurs</h1><p>Gare 0 · ${screens.length} écrans · ${QUIZ.length} questions · règlement d’exécution (UE) 2024/2215, annexe I.</p><p><strong>À retenir :</strong> le détendeur fait chuter la pression et dose le liquide qui entre dans l’évaporateur.</p><ul>${types}</ul></header>` +
    screens.map((item, index) => `<article class="print-screen"><h2>${index + 1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.id === "quel-detendeur" ? `<div class="print-answer"><strong>Correction :</strong><ul>${MACHINES.map(m => `<li>${esc(m.nom)} → ${DS.NOMS[m.bon].nom}. ${esc(m.pourquoi)}</li>`).join("")}</ul></div>` : ""}${item.id === "verifier" ? QUIZ.map((q, k) => `<div class="print-answer"><strong>${k + 1}. ${esc(q.q)}</strong> ${esc(q.choices[q.good])}. ${esc(q.explain)}</div>`).join("") : ""}<p class="print-codes">Référentiel · ${item.codes.length ? esc(item.codes.join(" · ")) : "contexte"}</p></article>`).join("") +
    `<article class="print-screen"><h2>Sources</h2><p>Référentiel : règlement d’exécution (UE) 2024/2215, annexe I. Symboles : bibliothèque inerWeb (tube capillaire, détendeurs thermostatiques, détendeur électronique) ; détendeur automatique : « vanne à pression constante », QElectroTech, licence CC BY 3.0, fichier valv-pres-cte.svg.</p></article>`;
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
