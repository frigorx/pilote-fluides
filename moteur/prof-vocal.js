/* =====================================================================
   prof-vocal.js — le professeur vocal de inerweb.fr : deux portes
   ---------------------------------------------------------------------
   Décision de F. Henninot (16/10/2026), la même sur tout le site :
   · « Écouter » (le bouton de la page) lit l'écran affiché, et s'arrête là.
   · « ▶ Prof vocal » (ce contrôleur) enchaîne : il fait lire l'écran, passe
     au suivant, et ainsi de suite jusqu'à la prochaine question ou activité,
     où il s'arrête et attend l'élève. « Commencer » ne fait jamais parler.
   Une question se lit telle qu'elle est posée (par la narration de l'écran,
   sinon par ce contrôleur) ; aucune réponse n'est choisie à la place de
   l'élève. Une ACTIVITÉ, c'est de quoi écrire ou glisser, un écran marqué
   data-prof-activite, ou ce que répond window.PILOTE_PROF_ACTIVITE() du
   réseau — jamais un simple bouton de vue 3D, de niveau ou de démonstration
   (défaut D1 du 16/10 : tout écran à bouton arrêtait le mode au 1er écran).
   Changer la vitesse (reglage-voix.js, événement pilotevoix:vitesse) coupe
   la lecture ET le mode. Les répliques gardent leurs textes : elles ont
   leur MP3 (voix Rémy) dans voix-index.js.
   Contrat des moteurs qui jouent leurs propres MP3 (ÉlectroRézo, CartoClim,
   CuivRézo, HoCourant…) : émettre pilotevoix:debut / fin / annulation
   (detail.texte), comme voix.js le fait pour la synthèse.
   ===================================================================== */
(function () {
  "use strict";

  if (!window.PiloteVoix || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return;

  var REPLIQUES = [
    { id: "active", narration: "Mode professeur vocal activé." },
    { id: "activite", narration: "À vous de jouer. Réalisez l'activité affichée, puis sélectionnez J'ai terminé." },
    { id: "compris-etape", narration: "Avez-vous compris cette étape ?" },
    { id: "retour-correct", narration: "Bonne réponse. Écoutons pourquoi." },
    { id: "retour-erreur", narration: "Ce n'est pas encore la bonne réponse. Cette erreur va vous aider à comprendre." },
    { id: "compris-correction", narration: "Avez-vous compris cette correction ?" },
    { id: "question", narration: "Écoutez la question, puis choisissez votre réponse à l'écran." },
    { id: "termine", narration: "Le parcours vocal est terminé." },
    { id: "pause", narration: "Le mode professeur vocal est en pause." },
    { id: "reponse-affichee", narration: "La bonne réponse et son explication sont affichées à l'écran." }
  ];
  var PHRASES = REPLIQUES.reduce(function (result, item) {
    result[item.id] = item.narration;
    return result;
  }, {});

  var path = String(window.location.pathname || "").toLowerCase();
  var nativeDelay = path.indexOf("frise-vivante") >= 0 ? 1650
    : path.indexOf("nomenclature-interactive") >= 0 ? 1450
      : 620;
  var selectors = {
    /* AéroRézo : stationVoice/previousButton/nextButton/exitStation/backNetwork/startButton.
       HydroMétro : formative-engine.js (formationListen/formationStop/nextBtn/prevBtn/actionPanel),
       p-formation.js (pListen/pStop/pNext/pPrev/activityView), station boucle (listenButton/
       stopVoiceButton/nextLesson/prevLesson). ÉlectroRézo et CartoClim : btVoix/suivant/precedent/
       scene. Capsules : btn-ecouter/btn-stop/btn-suivant/btn-precedent/btn-commencer.
       HoCourant : st-ecouter. Un moteur peut aussi se déclarer par data-prof-*. */
    /* 17/10/2026 : #voice-button (modules « pédagogiques » du plan : filtre, bouteille, régulateurs…), #speakButton
       (CO2, pressostats) et leur #stopButton, reçus avec le prof vocal du site. */
    listen: ["#listen", "#listen-button", "#speak", "#play-button", "#stationVoice", "#formationListen", "#pListen", "#listenButton", "#btVoix", "#btn-ecouter", "#st-ecouter", "#voice-button", "#speakButton", "[data-prof-ecouter]"],
    next: ["#next", "#next-button", "#nextButton", "#nextBtn", "#pNext", "#nextLesson", "#suivant", "#btn-suivant", "[data-prof-suivant]"],
    previous: ["#prev", "#previous", "#prev-button", "#previous-button", "#previousButton", "#prevBtn", "#pPrev", "#prevLesson", "#precedent", "#btn-precedent", "[data-prof-precedent]"],
    start: ["#start", "#start-course", "#start-button", "#startButton", "#btn-commencer", "[data-prof-commencer]"],
    exit: ["#exit-course", "#exit-button", "#home-button", "#rail-home", "#exit-dossier", "#exitStation", "#backNetwork"],
    stop: ["#stop-voice", "#formationStop", "#pStop", "#stopVoiceButton", "#btn-stop", "#stopButton", "[data-prof-arreter]"],
    scope: [".slide.active", "#activity-zone", "#zone", "#lesson-zone", "#interactive-zone", "#screen-content", "#activity", "#actionPanel", "#activityView", "#quizView", "#scene", "[data-prof-zone]"],
    quizNext: ["#quiz-next", ".quiz-next", "#nextGame", ".next-game", "#nextQuiz", "#nextLocal"]
  };

  function visible(element) {
    if (!element || element.hidden || element.getAttribute("aria-hidden") === "true") return false;
    var style = window.getComputedStyle ? window.getComputedStyle(element) : null;
    if (style && (style.display === "none" || style.visibility === "hidden")) return false;
    var box = element.getBoundingClientRect ? element.getBoundingClientRect() : null;
    return !box || box.width > 0 || box.height > 0;
  }

  function firstVisible(list, root) {
    var host = root || document;
    for (var index = 0; index < list.length; index += 1) {
      var found = Array.prototype.find.call(host.querySelectorAll(list[index]), visible);
      if (found) return found;
    }
    return null;
  }

  function hasSelector(list) {
    return list.some(function (selector) { return !!document.querySelector(selector); });
  }

  /* Une page qui dessine ses commandes après coup (HoCourant ouvre un module, AéroRézo
     redessine) : on attend qu'elles existent avant de poser le contrôleur. */
  if (hasSelector(selectors.next) && hasSelector(selectors.listen)) demarrer();
  else {
    var guet = new MutationObserver(function () {
      if (hasSelector(selectors.next) && hasSelector(selectors.listen)) { guet.disconnect(); demarrer(); }
    });
    guet.observe(document.documentElement, { childList: true, subtree: true });
  }

  function demarrer() {
  var enabled = false;
  var speakingInternal = false;
  var narrationActive = false;
  var pendingTimer = 0;
  var narrationTimer = 0;
  var departTimer = 0;
  var lastNarration = "";
  var lastFeedback = "";
  var lastFeedbackKind = "neutral";
  var missingLocal = new Set();
  var userPaused = false;
  var sequenceCourante = 0;

  var style = document.createElement("style");
  style.textContent = "#pilote-prof-vocal{position:fixed;right:12px;bottom:12px;z-index:2147483000;width:min(430px,calc(100vw - 24px));pointer-events:none;font-family:Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;color:#10233c}#pilote-prof-toggle{pointer-events:auto;float:right;border:2px solid #1b3a63;border-radius:999px;background:#fffdf8;color:#1b3a63;padding:9px 14px;font:700 14px/1.2 Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;box-shadow:0 2px 10px rgba(27,58,99,.16);cursor:pointer}#pilote-prof-toggle[aria-pressed=true]{background:#1b3a63;color:#fff}#pilote-prof-toggle:focus-visible,.pilote-prof-action:focus-visible{outline:3px solid rgba(255,107,53,.45);outline-offset:3px}.pilote-prof-card{pointer-events:auto;clear:both;margin-top:52px;padding:14px 16px;border:2px solid #1b3a63;border-radius:16px;background:#fffdf8;box-shadow:0 12px 34px rgba(27,58,99,.18)}.pilote-prof-card[data-kind=error]{border-style:dashed;border-color:#c0392b}.pilote-prof-card[data-kind=success]{border-style:double;border-width:5px;border-color:#1e7e54}.pilote-prof-title{margin:0 0 5px;color:#1b3a63;font:700 18px/1.2 \"Trebuchet MS\",Calibri,Arial,sans-serif}.pilote-prof-transcript{margin:0;line-height:1.45;text-align:left}.pilote-prof-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.pilote-prof-action{min-height:40px;border:2px solid #1b3a63;border-radius:999px;background:#fffdf8;color:#1b3a63;padding:7px 12px;font:700 13px/1.2 Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;cursor:pointer}.pilote-prof-action.primary{background:#1b3a63;color:#fff}.pilote-prof-action.replay{border-color:#c9451a;color:#c9451a}#pilote-prof-vocal.pilote-prof-gauche{left:12px;right:auto}#pilote-prof-toggle.pilote-prof-encastre{float:none;margin:0;min-height:34px;padding:.2rem .6rem;font-size:13px;line-height:1.2;box-shadow:none;white-space:nowrap}@media(max-width:650px){#pilote-prof-vocal{left:4px;right:4px;bottom:4px;width:auto}#pilote-prof-vocal>#pilote-prof-toggle{display:none}#pilote-prof-toggle{padding:7px 10px;font-size:12px}.pilote-prof-card{margin-top:44px;padding:10px 12px}.pilote-prof-title{font-size:16px}.pilote-prof-transcript{font-size:13px}.pilote-prof-action{min-height:36px;font-size:12px}}@media print{#pilote-prof-vocal{display:none!important}}";
  document.head.appendChild(style);

  var root = document.createElement("section");
  root.id = "pilote-prof-vocal";
  root.setAttribute("aria-label", "Professeur vocal");
  root.innerHTML = '<button id="pilote-prof-toggle" type="button" aria-pressed="false">▶ Prof vocal</button><div class="pilote-prof-card" role="status" aria-live="polite" hidden><h2 class="pilote-prof-title">Professeur vocal</h2><p class="pilote-prof-transcript"></p><div class="pilote-prof-actions"></div></div>';
  document.body.appendChild(root);

  var toggle = root.querySelector("#pilote-prof-toggle");
  var card = root.querySelector(".pilote-prof-card");
  var transcript = root.querySelector(".pilote-prof-transcript");
  var actions = root.querySelector(".pilote-prof-actions");
  var etatAffiche = "";

  /* Le bouton se range parmi les commandes de voix de la page quand elle en a (après
     « Arrêter », sinon après « Écouter »), pour ne jamais recouvrir un bouton de la page.
     Constat du 13/09/2026 : flottant, il masquait « Continuer » d'HydroMétro et
     « Comprendre → » d'AéroRézo. Les pages qui redessinent leurs commandes le perdent :
     l'observateur le remet en place ; tant que la commande n'est pas rendue, il flotte. */
  var encastre = false;
  var encastrerTimer = 0;
  function encastrer() {
    if (encastre && document.body.contains(toggle)) return;
    var ancre = firstVisible(selectors.stop) || firstVisible(selectors.listen);
    var rendue = ancre && ancre.getBoundingClientRect().width > 0 && ancre.getBoundingClientRect().height > 0;
    if (rendue && ancre.parentElement) {
      toggle.className = (ancre.className ? ancre.className + " " : "") + "pilote-prof-encastre";
      ancre.insertAdjacentElement("afterend", toggle);
      root.classList.add("pilote-prof-gauche");
      encastre = true;
    } else if (!root.contains(toggle)) {
      toggle.className = "";
      root.insertBefore(toggle, card);
      root.classList.remove("pilote-prof-gauche");
      encastre = false;
    }
    setToggle(etatAffiche);
  }
  function encastrerBientot() {
    if (encastre && document.body.contains(toggle)) return;
    window.clearTimeout(encastrerTimer);
    encastrerTimer = window.setTimeout(encastrer, 60);
  }
  encastrer();
  document.addEventListener("DOMContentLoaded", encastrer);
  window.addEventListener("load", encastrer);
  new MutationObserver(encastrerBientot).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class", "style"] });

  /* Arrêté : « ▶ Prof vocal ». En marche : « ■ Prof vocal · lecture / question / activité… » —
     le carré dit qu'un clic l'arrête. */
  function setToggle(label) {
    etatAffiche = label || "";
    var texte = enabled ? "■ Prof vocal" + (etatAffiche ? " · " + etatAffiche : "") : "▶ Prof vocal";
    toggle.textContent = texte;
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.setAttribute("aria-label", enabled ? "Arrêter le professeur vocal" + (etatAffiche ? " (" + etatAffiche + ")" : "") : "Lancer le professeur vocal : il explique les écrans l'un après l'autre et s'arrête aux questions");
    toggle.title = enabled ? "Arrêter le professeur vocal" : "Le professeur explique les écrans l'un après l'autre, et s'arrête aux questions";
  }

  function clearTimers() {
    window.clearTimeout(pendingTimer);
    window.clearTimeout(narrationTimer);
    window.clearTimeout(departTimer);
    pendingTimer = 0;
    narrationTimer = 0;
    departTimer = 0;
  }

  function setCard(title, text, kind, buttons) {
    card.hidden = false;
    card.dataset.kind = kind || "neutral";
    card.querySelector(".pilote-prof-title").textContent = title;
    transcript.textContent = text;
    actions.innerHTML = "";
    (buttons || []).forEach(function (definition) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "pilote-prof-action " + (definition.className || "");
      button.textContent = definition.label;
      button.addEventListener("click", definition.action);
      actions.appendChild(button);
    });
  }

  function hideCard() {
    card.hidden = true;
    actions.innerHTML = "";
  }

  function rester() { userPaused = true; setToggle("en attente"); hideCard(); }

  function activate(announce) {
    enabled = true;
    userPaused = false;
    setToggle("actif");
    if (announce) {
      setCard("Professeur vocal", PHRASES.active, "neutral", []);
      speakSequence([PHRASES.active], function () { hideCard(); lireEcranCourant(); });
    } else lireEcranCourant();
  }

  function deactivate(withVoice) {
    clearTimers();
    enabled = false;
    userPaused = false;
    speakingInternal = false;
    window.speechSynthesis.cancel();
    setToggle("");
    if (withVoice) {
      setCard("Mode en pause", PHRASES.pause, "neutral", []);
      speakSequence([PHRASES.pause], function () { window.setTimeout(hideCard, 900); }, true);
    } else hideCard();
  }

  function voiceActive() {
    var state = window.PiloteVoix.etat();
    return narrationActive || !!(state && state.actif) || !!window.speechSynthesis.speaking;
  }

  function vitesse() {
    return window.PILOTE_VOIX_REGLAGE && typeof window.PILOTE_VOIX_REGLAGE.vitesse === "function" ? window.PILOTE_VOIX_REGLAGE.vitesse() : 0.95;
  }

  function speakSequence(parts, onComplete, allowWhenDisabled) {
    var queue = parts.map(function (part) { return String(part || "").replace(/\s+/g, " ").trim(); }).filter(Boolean);
    if (!queue.length || (!enabled && !allowWhenDisabled)) {
      if (typeof onComplete === "function") onComplete();
      return;
    }
    var sequence = ++sequenceCourante;   // une réplique coupée par la suivante ne doit pas libérer celle-ci
    speakingInternal = true;
    window.speechSynthesis.cancel();
    var index = 0;
    function nextPart() {
      if (sequence !== sequenceCourante) return;
      if (index >= queue.length) {
        speakingInternal = false;
        if (typeof onComplete === "function") onComplete();
        return;
      }
      var text = queue[index++];
      if (!window.PiloteVoix.parleAvecAudioLocal(text)) missingLocal.add(window.PiloteVoix.cle(text));
      var utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = vitesse();
      utterance.pitch = 1;
      utterance.__piloteProfVocal = true;
      utterance.onend = nextPart;
      utterance.onerror = function (event) {
        if (event && (event.error === "canceled" || event.error === "interrupted")) {
          if (sequence === sequenceCourante) speakingInternal = false;   // coupée par l'élève (Écouter, Arrêter)
          return;
        }
        nextPart();
      };
      window.speechSynthesis.speak(utterance);
    }
    nextPart();
  }

  function currentScope() {
    return firstVisible(selectors.scope) || document.body;
  }

  /* La signature d'un écran : titres, diapo active, onglet ou étape courants, compteurs.
     Pas les boutons, dont le libellé change pendant la lecture (« Ⅱ Pause »). */
  function stageSignature() {
    function textes(selector) {
      return Array.prototype.filter.call(document.querySelectorAll(selector), visible)
        .filter(function (node) { return !node.closest("#pilote-prof-vocal"); })
        .map(function (node) { return node.textContent.replace(/\s+/g, " ").trim().slice(0, 80); }).join("/");
    }
    var actif = document.querySelector(".slide.active");
    return [window.location.pathname + window.location.search, textes("h1, h2, h3"), actif ? actif.id || actif.className : "",
      textes('[aria-current="step"], [aria-current="page"], [aria-current="true"], [aria-selected="true"]'),
      textes("#lesson-title, #title, #screen-title, #scene-title, #stepCount, #step-count, #screen-count, #stepStatus")].join("|");
  }

  function isIgnoredControl(element) {
    if (!element || element.closest("#pilote-prof-vocal") || element.closest("#pilote-prof-toggle")) return true;
    var ignored = selectors.listen.concat(selectors.next, selectors.previous, selectors.start, selectors.exit, selectors.stop, selectors.quizNext, ["[data-step]", ".step-button", "#voice-toggle", "#refs-toggle", "#source-toggle", "#sound-toggle", "#copy-link", "#slower", "#faster", "#pause", "[data-voix-reglage]"]);
    return ignored.some(function (selector) { return element.matches(selector) || !!element.closest(selector); });
  }

  function normaliser(texte) {
    return String(texte || "").toLowerCase().replace(/[^a-z0-9à-ÿœæ]+/gi, " ").trim();
  }

  /* Une question à l'écran : un énoncé et au moins deux choix (boutons de réponse, cases). */
  function questionParts() {
    var scope = currentScope();
    /* button[data-choice] et #action-prompt : les choix des modules à dossiers (compresseur, condenseur, chaîne
       d'intervention…), que le professeur ne voyait pas et passait (17/10/2026) */
    var choices = Array.prototype.filter.call(scope.querySelectorAll(".choices button,.quiz-options button,#gameOptions button,[data-answer],.answer-button,.vy-choix button,button[data-choice],[role=radio],input[type=radio],input[type=checkbox]"), function (node) {
      return visible(node) && !node.disabled && !isIgnoredControl(node);
    });
    /* .quiz-q : l'énoncé des quiz « Vérifier » des modules à onglets (détendeurs…), que le professeur passait (17/10/2026) */
    var question = firstVisible([".quiz-question", ".quiz-q", ".question strong", "[data-question]", ".game-question", "#fluidHint", ".question h2", ".question h3", "legend"], scope)
      || (choices.length >= 2 ? firstVisible(["#action-prompt"]) : null);
    if (!question && choices.length >= 2) question = firstVisible(["h2", "h3", "h4"], scope);
    if (!question || choices.length < 2) return [];
    var libelles = choices.map(function (node) {
      if (node.tagName === "INPUT") return node.labels && node.labels[0] ? node.labels[0].textContent.trim() : "";
      /* un choix sur deux lignes (titre + précision) se dit en deux phrases, pas collé */
      return String(node.innerText || node.textContent).replace(/\s*\n\s*/g, ". ").trim();
    }).filter(Boolean);
    return [PHRASES.question, question.textContent.trim()].concat(libelles);
  }

  /* Une activité : le réseau le dit, l'écran se déclare tel, ou il donne de quoi écrire / glisser.
     Un bouton seul ne fait pas une activité (vue 3D, niveau, démonstration, curseur d'exploration). */
  function activiteReelle() {
    if (typeof window.PILOTE_PROF_ACTIVITE === "function") {
      try {
        var avis = window.PILOTE_PROF_ACTIVITE();
        if (avis === true || avis === false) return avis;
      } catch (_) { /* le réseau se trompe : on regarde l'écran */ }
    }
    var scope = currentScope();
    if (scope.closest("[data-prof-activite]")) return true;
    if (Array.prototype.some.call(scope.querySelectorAll("[data-prof-activite]"), visible)) return true;
    return Array.prototype.some.call(scope.querySelectorAll("input[type=text],input[type=number],input[type=search],input:not([type]),textarea,[draggable=true],[contenteditable=true]"), function (node) {
      return visible(node) && !node.disabled && !isIgnoredControl(node);
    });
  }

  /* Le bouton « suivant » de la page ; à défaut, l'onglet qui suit l'onglet courant. */
  function suivantDisponible() {
    var next = firstVisible(selectors.next);
    if (next) return next.disabled || next.getAttribute("aria-disabled") === "true" ? null : next;
    var courant = Array.prototype.find.call(document.querySelectorAll('[role=tab][aria-selected="true"], [aria-current="step"]'), visible);
    var suite = courant && courant.nextElementSibling;
    while (suite && (!visible(suite) || suite.disabled)) suite = suite.nextElementSibling;
    return suite && suite.matches("button, [role=tab], a") ? suite : null;
  }

  /* « Continuer » présent mais grisé : l'écran attend que l'élève fasse quelque chose
     (barres d'étapes verrouillées d'HydroMétro) — sauf au dernier écran (« 12 / 12 »). */
  function suivantVerrouille() {
    var next = firstVisible(selectors.next);
    if (!next || !(next.disabled || next.getAttribute("aria-disabled") === "true")) return false;
    var compteurs = Array.prototype.filter.call(document.querySelectorAll("#stepCount, #step-count, #screen-count, [id*=index], [class*=compteur], [class*=progression], .numero"), visible);
    return !compteurs.some(function (node) {
      var m = /(\d+)\s*(?:\/|sur)\s*(\d+)/.exec(node.textContent || "");
      return m && m[1] === m[2];
    });
  }

  /* Le professeur reste dans la station : « Station suivante », un lien vers une autre page = fin du parcours. */
  function quitteLaStation(element) {
    if (element.tagName === "A" && element.getAttribute("href") && element.getAttribute("href").charAt(0) !== "#") {
      try { if (new URL(element.href, window.location.href).pathname !== window.location.pathname) return true; } catch (_) { /* adresse illisible : on regarde le libellé */ }
    }
    return /station suivante|ligne suivante|retour à la carte|évaluation finale|quitter/i.test(element.textContent || "");
  }

  function estOnglet(button) {
    return button.getAttribute("role") === "tab" || button.hasAttribute("aria-selected") || !!button.closest("[role=tablist]");
  }

  function showQuestion(parts) {
    var text = parts.slice(1).join(" ");
    setToggle("question");
    setCard("Question à vous", text, "neutral", []);
    speakSequence(parts, function () { carteQuestion(parts); });
  }

  function carteQuestion(parts) {
    setToggle("question");
    setCard("Question à vous", parts[1] + " — répondez à l'écran.", "neutral", [
      { label: "Réécouter la question", className: "replay", action: function () { showQuestion(parts); } },
      { label: "Répondre à l'écran", className: "primary", action: hideCard }
    ]);
  }

  /* La narration de l'écran vient de lire la question : on ne la répète pas, on attend. */
  function questionAVous(parts) {
    var debut = normaliser(parts[1]).slice(0, 40);
    if (debut && normaliser(lastNarration).indexOf(debut) >= 0) carteQuestion(parts);
    else showQuestion(parts);
  }

  function showActivityCheckpoint() {
    setToggle("activité");
    setCard("À vous de jouer", PHRASES.activite, "neutral", []);
    speakSequence([PHRASES.activite], function () {
      setCard("À vous de jouer", PHRASES.activite, "neutral", [
        { label: "J'ai terminé", className: "primary", action: askUnderstood },
        { label: "Réécouter la consigne", className: "replay", action: replayCurrent },
        { label: "Rester sur l'écran", action: rester }
      ]);
    });
  }

  function askUnderstood() {
    setCard("Validation", PHRASES["compris-etape"], "neutral", []);
    speakSequence([PHRASES["compris-etape"]], function () {
      setCard("Validation", PHRASES["compris-etape"], "neutral", [
        { label: "Oui, continuer", className: "primary", action: advance },
        { label: "Non, réécouter", className: "replay", action: replayCurrent },
        { label: "Rester ici", action: rester }
      ]);
    });
  }

  function replayCurrent() {
    hideCard();
    userPaused = false;
    setToggle("lecture");
    scheduleNarration(80, true);
  }

  function terminer() {
    setToggle("terminé");
    setCard("Parcours terminé", PHRASES.termine, "success", []);
    speakSequence([PHRASES.termine], function () { enabled = false; setToggle(""); window.setTimeout(hideCard, 1800); });
  }

  function feedbackChunks(text) {
    var clean = String(text || "").replace(/^[✓✗]\s*/, "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    if (window.PiloteVoix.parleAvecAudioLocal(clean)) return [clean];
    return clean.split(/(?<=[.!?])\s+/).map(function (part) { return part.trim(); }).filter(function (part) { return part.length > 2; });
  }

  function classifyFeedback(node, text) {
    var classes = node ? node.className || "" : "";
    if (/\b(bad|no|wrong|error|revoir)\b/i.test(classes) || /^(✗|pas encore|incorrect|erreur)/i.test(text)) return "error";
    if (/\b(good|ok|correct|success|juste)\b/i.test(classes) || /^(✓|exact|bonne réponse|correct)/i.test(text)) return "success";
    return "neutral";
  }

  function feedbackActions(kind) {
    var quizNext = firstVisible(selectors.quizNext);
    if (quizNext) {
      return [
        { label: "J'ai compris, question suivante", className: "primary", action: function () { hideCard(); quizNext.click(); window.setTimeout(speakVisibleQuestion, 220); } },
        { label: "Réécouter la correction", className: "replay", action: function () { speakFeedback(lastFeedback, lastFeedbackKind); } },
        { label: "Rester sur la correction", action: rester }
      ];
    }
    if (kind === "error") {
      return [
        { label: "J'ai compris, réessayer", className: "primary", action: function () { hideCard(); setToggle("question"); } },
        { label: "Réécouter la correction", className: "replay", action: function () { speakFeedback(lastFeedback, lastFeedbackKind); } },
        { label: "Revoir l'écran", action: rester }
      ];
    }
    return [
      { label: "J'ai compris, continuer", className: "primary", action: advance },
      { label: "Réécouter le retour", className: "replay", action: function () { speakFeedback(lastFeedback, lastFeedbackKind); } },
      { label: "Rester sur l'écran", action: rester }
    ];
  }

  function speakFeedback(text, kind) {
    if (!enabled || !text) return;
    lastFeedback = text;
    lastFeedbackKind = kind;
    var intro = kind === "error" ? PHRASES["retour-erreur"] : PHRASES["retour-correct"];
    var parts = [intro].concat(feedbackChunks(text));
    if (kind === "error" && parts.length === 1) parts.push(PHRASES["reponse-affichee"]);
    parts.push(PHRASES["compris-correction"]);
    setToggle("correction");
    setCard(kind === "error" ? "Correction · à revoir" : "Correction · acquis", parts.join(" "), kind, []);
    speakSequence(parts, function () {
      setCard(kind === "error" ? "Correction · à revoir" : "Correction · acquis", parts.join(" "), kind, feedbackActions(kind));
    });
  }

  function feedbackNodes(rootNode) {
    return Array.prototype.filter.call((rootNode || currentScope()).querySelectorAll(".feedback,#quiz-feedback,#gameFeedback,[data-feedback],[role=status],.status-message,.result-message,.vy-retour"), function (node) {
      return visible(node) && !node.closest("#pilote-prof-vocal");
    });
  }

  function inspectFeedback(before, clicked) {
    if (!enabled) return;
    var localRoot = clicked && clicked.closest(".question,.quiz-card,.game-card,.panel,#activity-zone,#zone,#lesson-zone,#interactive-zone,#screen-content,#scene,.vy-question");
    var nodes = feedbackNodes(localRoot || currentScope());
    var changed = nodes.map(function (node) { return { node: node, text: node.textContent.replace(/\s+/g, " ").trim() }; })
      .filter(function (entry) { return entry.text.length >= 8 && before.indexOf(entry.text) < 0; });
    if (!changed.length) return;
    var entry = changed[changed.length - 1];
    speakFeedback(entry.text, classifyFeedback(entry.node, entry.text));
  }

  function speakVisibleQuestion() {
    if (!enabled) return;
    var parts = questionParts();
    if (parts.length) showQuestion(parts);
    else scheduleNarration(280);
  }

  /* Après la narration d'un écran : la question attend l'élève, l'activité aussi ; sinon on passe. */
  function decideAfterNarration(signature) {
    if (!enabled || userPaused || speakingInternal) return;
    if (signature !== stageSignature()) return;
    if (voiceActive()) return;          // une narration en plusieurs parties continue : on attendra sa fin
    var parts = questionParts();
    if (parts.length) { questionAVous(parts); return; }
    if (activiteReelle() || suivantVerrouille()) { showActivityCheckpoint(); return; }
    if (!suivantDisponible()) { terminer(); return; }
    advance();
  }

  function advance() {
    if (!enabled) return;
    hideCard();
    userPaused = false;
    var next = suivantDisponible();
    if (!next) {
      if (activiteReelle() || suivantVerrouille()) showActivityCheckpoint();
      else terminer();
      return;
    }
    if (quitteLaStation(next)) { terminer(); return; }
    var before = stageSignature();
    setToggle("écran suivant");
    next.click();
    var essais = 0;
    (function guetter() {
      window.setTimeout(function () {
        if (!enabled) return;
        if (before !== stageSignature()) { scheduleNarration(480); return; }
        if (++essais < 10) { guetter(); return; }
        terminer();
      }, 150);
    })();
  }

  function entreeVisible() {
    return firstVisible(selectors.start) || Array.prototype.find.call(document.querySelectorAll("button, a[href^='#'], [role=button]"), function (node) {
      return visible(node) && !node.disabled && !node.closest("#pilote-prof-vocal") && /^[▶►]?\s*(commencer|démarrer|c'est parti|entrer|je commence)/i.test((node.textContent || "").trim());
    });
  }

  /* Lancé depuis l'accueil d'une station, le professeur y entre d'abord. */
  function lireEcranCourant() {
    if (!enabled) return;
    var listen = firstVisible(selectors.listen);
    if (listen && !listen.disabled) { scheduleNarration(180, true); return; }
    var entree = entreeVisible();
    if (entree) { entree.click(); scheduleNarration(560, true); return; }
    decideAfterNarration(stageSignature());
  }

  function scheduleNarration(delay, force) {
    window.clearTimeout(narrationTimer);
    narrationTimer = window.setTimeout(function () {
      if (!enabled || userPaused || speakingInternal) return;
      if (!force && voiceActive()) return;
      var button = firstVisible(selectors.listen);
      if (!button || button.disabled || /pas de voix/i.test(button.textContent || "")) {
        decideAfterNarration(stageSignature());   // écran sans narration : on décide tout de suite
        return;
      }
      setToggle("lecture");
      var signature = stageSignature();
      button.click();
      /* garde-fou : un bouton qui ne fait rien parler ne doit pas bloquer le professeur */
      window.clearTimeout(departTimer);
      departTimer = window.setTimeout(function () {
        if (enabled && !voiceActive() && !speakingInternal && signature === stageSignature()) decideAfterNarration(signature);
      }, 2600);
    }, delay || 0);
  }

  function matchesAny(element, list) {
    return !!element && list.some(function (selector) { return element.matches(selector); });
  }

  document.addEventListener("pilotevoix:debut", function (event) {
    if (event.detail && event.detail.interne) return;
    narrationActive = true;
    window.clearTimeout(departTimer);
    lastNarration = event.detail && event.detail.texte || "";
    if (enabled) {
      window.clearTimeout(pendingTimer);
      setToggle("lecture");
      hideCard();
    }
  });

  ["pilotevoix:annulation", "pilotevoix:erreur"].forEach(function (nom) {
    document.addEventListener(nom, function (event) {
      if (event.detail && event.detail.interne) return;
      narrationActive = false;
    });
  });

  document.addEventListener("pilotevoix:fin", function (event) {
    if (event.detail && event.detail.interne) return;
    narrationActive = false;
    if (!enabled || speakingInternal) return;
    var signature = stageSignature();
    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(function () { decideAfterNarration(signature); }, nativeDelay);
  });

  /* § 5 de la charte voix : changer la vitesse arrête la lecture — et le professeur avec elle */
  document.addEventListener("pilotevoix:vitesse", function () {
    narrationActive = false;
    if (enabled) deactivate(false);
  });

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("button, [role=tab]");
    if (!button || button.closest("#pilote-prof-vocal") || button.id === "pilote-prof-toggle") return;

    if (matchesAny(button, selectors.exit) || matchesAny(button, selectors.stop)) {
      narrationActive = false;
      deactivate(false);
      return;
    }
    /* « Commencer » et « Écouter » n'allument jamais le professeur : deux portes, chacune son rôle */
    if (matchesAny(button, selectors.start)) {
      if (enabled) scheduleNarration(560, true);
      return;
    }
    if (matchesAny(button, selectors.listen)) {
      if (enabled) { userPaused = false; hideCard(); }
      return;
    }
    if (matchesAny(button, selectors.next) || matchesAny(button, selectors.previous) || estOnglet(button)) {
      if (enabled) {
        hideCard();
        userPaused = false;
        window.setTimeout(function () { scheduleNarration(460); }, 0);
      }
      return;
    }
    if (button.matches("#voice-toggle")) {
      window.setTimeout(function () {
        if (button.getAttribute("aria-pressed") === "false") deactivate(false);
      }, 0);
      return;
    }
    if (!enabled || isIgnoredControl(button) || !currentScope().contains(button)) return;
    var before = feedbackNodes(currentScope()).map(function (node) { return node.textContent.replace(/\s+/g, " ").trim(); });
    window.setTimeout(function () { inspectFeedback(before, button); }, 90);
  }, true);

  toggle.addEventListener("click", function () {
    if (enabled) deactivate(false);
    else activate(true);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) deactivate(false);
  });
  window.addEventListener("beforeunload", function () { deactivate(false); });

  window.PiloteProfVocal = {
    version: "2.0.0",
    activer: function () { activate(true); },
    arreter: function () { deactivate(false); },
    relire: replayCurrent,
    etat: function () {
      return {
        actif: enabled,
        pauseUtilisateur: userPaused,
        narration: lastNarration,
        correction: lastFeedback,
        audiosLocauxManquants: Array.from(missingLocal)
      };
    }
  };
  }
})();
