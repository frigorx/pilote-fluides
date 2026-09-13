/* =====================================================================
   prof-vocal.js — déroulé pédagogique vocal de Pilote Fluides
   ---------------------------------------------------------------------
   Le premier clic sur « Commencer », « Écouter » ou sur le bouton de ce
   contrôleur autorise l'enchaînement pour la séance courante seulement.
   Les écrans explicatifs avancent seuls. Les activités et les questions
   restent des points d'arrêt : aucune réponse n'est choisie à la place de
   l'apprenant et chaque consigne parlée est également affichée.
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
    /* AéroRézo (stations/_commun/moteur.js) : stationVoice/previousButton/nextButton/
       exitStation/backNetwork/startButton. HydroMétro a trois gabarits de stations :
       formative-engine.js (formationListen/formationStop/nextBtn/prevBtn/actionPanel),
       p-formation.js (pListen/pStop/pNext/pPrev/activityView), et la station boucle,
       seule sur son propre moteur (listenButton/stopVoiceButton/nextLesson/prevLesson). */
    listen: ["#listen", "#listen-button", "#speak", "#play-button", "#stationVoice", "#formationListen", "#pListen", "#listenButton"],
    next: ["#next", "#next-button", "#nextButton", "#nextBtn", "#pNext", "#nextLesson"],
    previous: ["#prev", "#previous", "#prev-button", "#previous-button", "#previousButton", "#prevBtn", "#pPrev", "#prevLesson"],
    start: ["#start", "#start-course", "#start-button", "#startButton"],
    exit: ["#exit-course", "#exit-button", "#home-button", "#rail-home", "#exit-dossier", "#exitStation", "#backNetwork"],
    stop: ["#stop-voice", "#formationStop", "#pStop", "#stopVoiceButton"],
    scope: [".slide.active", "#activity-zone", "#zone", "#lesson-zone", "#interactive-zone", "#screen-content", "#activity", "#actionPanel", "#activityView", "#quizView"],
    quizNext: ["#quiz-next", ".quiz-next", "#nextGame", ".next-game", "#nextQuiz", "#nextLocal"]
  };

  function visible(element) {
    if (!element || element.hidden || element.getAttribute("aria-hidden") === "true") return false;
    var style = window.getComputedStyle ? window.getComputedStyle(element) : null;
    return !style || (style.display !== "none" && style.visibility !== "hidden");
  }

  function firstVisible(list, root) {
    var host = root || document;
    for (var index = 0; index < list.length; index += 1) {
      var found = host.querySelector(list[index]);
      if (visible(found)) return found;
    }
    return null;
  }

  function hasSelector(list) {
    return list.some(function (selector) { return !!document.querySelector(selector); });
  }

  if (!hasSelector(selectors.next) || !hasSelector(selectors.listen)) return;

  var enabled = false;
  var speakingInternal = false;
  var pendingTimer = 0;
  var narrationTimer = 0;
  var lastNarration = "";
  var lastFeedback = "";
  var lastFeedbackKind = "neutral";
  var missingLocal = new Set();
  var userPaused = false;

  var style = document.createElement("style");
  style.textContent = "#pilote-prof-vocal{position:fixed;right:12px;bottom:12px;z-index:2147483000;width:min(430px,calc(100vw - 24px));pointer-events:none;font-family:Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;color:#10233c}#pilote-prof-toggle{pointer-events:auto;float:right;border:2px solid #1b3a63;border-radius:999px;background:#fffdf8;color:#1b3a63;padding:9px 14px;font:700 14px/1.2 Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;box-shadow:0 2px 10px rgba(27,58,99,.16);cursor:pointer}#pilote-prof-toggle[aria-pressed=true]{background:#1b3a63;color:#fff}#pilote-prof-toggle:focus-visible,.pilote-prof-action:focus-visible{outline:3px solid rgba(255,107,53,.45);outline-offset:3px}.pilote-prof-card{pointer-events:auto;clear:both;margin-top:52px;padding:14px 16px;border:2px solid #1b3a63;border-radius:16px;background:#fffdf8;box-shadow:0 12px 34px rgba(27,58,99,.18)}.pilote-prof-card[data-kind=error]{border-style:dashed;border-color:#c0392b}.pilote-prof-card[data-kind=success]{border-style:double;border-width:5px;border-color:#1e7e54}.pilote-prof-title{margin:0 0 5px;color:#1b3a63;font:700 18px/1.2 \"Trebuchet MS\",Calibri,Arial,sans-serif}.pilote-prof-transcript{margin:0;line-height:1.45;text-align:left}.pilote-prof-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.pilote-prof-action{min-height:40px;border:2px solid #1b3a63;border-radius:999px;background:#fffdf8;color:#1b3a63;padding:7px 12px;font:700 13px/1.2 Calibri,\"Segoe UI\",system-ui,Arial,sans-serif;cursor:pointer}.pilote-prof-action.primary{background:#1b3a63;color:#fff}.pilote-prof-action.replay{border-color:#c9451a;color:#c9451a}#pilote-prof-vocal.pilote-prof-gauche{left:12px;right:auto}#pilote-prof-toggle.pilote-prof-encastre{float:none;margin:0;min-height:34px;padding:.2rem .6rem;font-size:13px;line-height:1.2;box-shadow:none;white-space:nowrap}@media(max-width:650px){#pilote-prof-vocal{left:4px;right:4px;bottom:4px;width:auto}#pilote-prof-vocal>#pilote-prof-toggle{display:none}#pilote-prof-toggle{padding:7px 10px;font-size:12px}.pilote-prof-card{margin-top:44px;padding:10px 12px}.pilote-prof-title{font-size:16px}.pilote-prof-transcript{font-size:13px}.pilote-prof-action{min-height:36px;font-size:12px}}@media print{#pilote-prof-vocal{display:none!important}}";
  document.head.appendChild(style);

  var root = document.createElement("section");
  root.id = "pilote-prof-vocal";
  root.setAttribute("aria-label", "Mode professeur vocal");
  root.innerHTML = '<button id="pilote-prof-toggle" type="button" aria-pressed="false">Mode prof vocal · arrêté</button><div class="pilote-prof-card" role="status" aria-live="polite" hidden><h2 class="pilote-prof-title">Professeur vocal</h2><p class="pilote-prof-transcript"></p><div class="pilote-prof-actions"></div></div>';
  document.body.appendChild(root);

  var toggle = root.querySelector("#pilote-prof-toggle");
  var card = root.querySelector(".pilote-prof-card");
  var transcript = root.querySelector(".pilote-prof-transcript");
  var actions = root.querySelector(".pilote-prof-actions");

  /* Le bouton du mode prof se range parmi les commandes de voix de la page quand elle en a
     (HydroMétro : après « Arrêter » ; AéroRézo : après « Écouter »), pour ne jamais recouvrir
     un bouton de la page. Sans commande de voix (Législation, packs), il reste flottant en bas
     à droite. Constat du 13/09/2026 : flottant, il masquait « Continuer » des trois gabarits
     HydroMétro et « Comprendre → » d'AéroRézo, à 1366 px comme à 375 px. Les pages qui
     redessinent leurs commandes (AéroRézo) le perdent : l'observateur le remet en place ;
     tant que la commande n'est pas rendue (Législation avant « Commencer »), il flotte. */
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
    setToggle(enabled ? "actif" : "arrêté");
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

  function setToggle(label) {
    if (encastre) toggle.innerHTML = "Prof <span>vocal · " + label + "</span>";
    else toggle.textContent = "Mode prof vocal · " + label;
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.setAttribute("aria-label", "Mode professeur vocal · " + label);
  }

  function clearTimers() {
    window.clearTimeout(pendingTimer);
    window.clearTimeout(narrationTimer);
    pendingTimer = 0;
    narrationTimer = 0;
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

  function activate(startNarration) {
    enabled = true;
    userPaused = false;
    setToggle("actif");
    if (startNarration) {
      setCard("Professeur vocal", PHRASES.active, "neutral", []);
      speakSequence([PHRASES.active], function () { hideCard(); scheduleNarration(180); });
    }
  }

  function deactivate(withVoice) {
    clearTimers();
    enabled = false;
    userPaused = false;
    speakingInternal = false;
    window.speechSynthesis.cancel();
    setToggle("arrêté");
    if (withVoice) {
      setCard("Mode en pause", PHRASES.pause, "neutral", []);
      speakSequence([PHRASES.pause], function () { window.setTimeout(hideCard, 900); }, true);
    } else hideCard();
  }

  function voiceActive() {
    var state = window.PiloteVoix.etat();
    return !!(state && state.actif) || !!window.speechSynthesis.speaking;
  }

  function speakSequence(parts, onComplete, allowWhenDisabled) {
    var queue = parts.map(function (part) { return String(part || "").replace(/\s+/g, " ").trim(); }).filter(Boolean);
    if (!queue.length || (!enabled && !allowWhenDisabled)) {
      if (typeof onComplete === "function") onComplete();
      return;
    }
    speakingInternal = true;
    window.speechSynthesis.cancel();
    var index = 0;
    function nextPart() {
      if (index >= queue.length) {
        speakingInternal = false;
        if (typeof onComplete === "function") onComplete();
        return;
      }
      var text = queue[index++];
      if (!window.PiloteVoix.parleAvecAudioLocal(text)) missingLocal.add(window.PiloteVoix.cle(text));
      var utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.__piloteProfVocal = true;
      utterance.onend = nextPart;
      utterance.onerror = function (event) {
        if (event && (event.error === "canceled" || event.error === "interrupted")) return;
        nextPart();
      };
      window.speechSynthesis.speak(utterance);
    }
    nextPart();
  }

  function currentScope() {
    return firstVisible(selectors.scope) || document.body;
  }

  function stageSignature() {
    /* #stepStatus : AéroRézo (« Comprendre · 2/4 · station 1/1 ») — sans lui, la signature ne
       bougeait pas au changement de temps et le mode déclarait « Parcours terminé » dès le
       deuxième écran (constaté le 12/09, lot F). */
    var candidates = ["#lesson-title", "#title", "#screen-title", "#scene-title", ".slide.active h2", "#stepCount", "#step-count", "#screen-count", "#stepStatus"];
    return candidates.map(function (selector) {
      var node = document.querySelector(selector);
      return visible(node) ? node.textContent.trim() : "";
    }).join("|") + "|" + window.location.search;
  }

  function isIgnoredControl(element) {
    if (!element || element.closest("#pilote-prof-vocal") || element.closest("#pilote-prof-toggle")) return true;
    var ignored = selectors.listen.concat(selectors.next, selectors.previous, selectors.start, selectors.exit, selectors.stop, selectors.quizNext, ["[data-step]", ".step-button", "#voice-toggle", "#refs-toggle", "#source-toggle", "#sound-toggle", "#copy-link", "#slower", "#faster", "#pause"]);
    return ignored.some(function (selector) { return element.matches(selector) || !!element.closest(selector); });
  }

  function interactiveControls() {
    var scope = currentScope();
    return Array.from(scope.querySelectorAll("button,input:not([type=hidden]),select,textarea,[role=button]")).filter(function (element) {
      return visible(element) && !element.disabled && !isIgnoredControl(element);
    });
  }

  function questionParts() {
    var scope = currentScope();
    var question = firstVisible([".quiz-question", ".question strong", "[data-question]", ".game-question", "#fluidHint"], scope);
    if (!question) return [];
    var parts = [PHRASES.question, question.textContent.trim()];
    var choices = Array.from(scope.querySelectorAll(".choices button,.quiz-options button,#gameOptions button,[data-answer],.answer-button")).filter(visible).map(function (button) {
      return button.textContent.trim();
    }).filter(Boolean);
    return parts.concat(choices);
  }

  function showQuestion(parts) {
    var text = parts.join(" ");
    setCard("Question à vous", text, "neutral", []);
    speakSequence(parts, function () {
      setCard("Question à vous", text, "neutral", [
        { label: "Réécouter la question", className: "replay", action: function () { showQuestion(parts); } },
        { label: "Répondre à l'écran", className: "primary", action: hideCard }
      ]);
    });
  }

  function showActivityCheckpoint() {
    setToggle("activité");
    setCard("À vous de jouer", PHRASES.activite, "neutral", []);
    speakSequence([PHRASES.activite], function () {
      setCard("À vous de jouer", PHRASES.activite, "neutral", [
        { label: "J'ai terminé", className: "primary", action: askUnderstood },
        { label: "Réécouter la consigne", className: "replay", action: replayCurrent },
        { label: "Rester sur l'écran", action: function () { userPaused = true; setToggle("en attente"); hideCard(); } }
      ]);
    });
  }

  function askUnderstood() {
    setCard("Validation", PHRASES["compris-etape"], "neutral", []);
    speakSequence([PHRASES["compris-etape"]], function () {
      setCard("Validation", PHRASES["compris-etape"], "neutral", [
        { label: "Oui, continuer", className: "primary", action: advance },
        { label: "Non, réécouter", className: "replay", action: replayCurrent },
        { label: "Rester ici", action: function () { userPaused = true; setToggle("en attente"); hideCard(); } }
      ]);
    });
  }

  function replayCurrent() {
    hideCard();
    userPaused = false;
    setToggle("lecture");
    scheduleNarration(80, true);
  }

  function feedbackChunks(text) {
    var clean = String(text || "").replace(/^[✓✗]\s*/, "").replace(/\s+/g, " ").trim();
    if (!clean) return [];
    if (window.PiloteVoix.parleAvecAudioLocal(clean)) return [clean];
    return clean.split(/(?<=[.!?])\s+/).map(function (part) { return part.trim(); }).filter(function (part) { return part.length > 2; });
  }

  function classifyFeedback(node, text) {
    var classes = node ? node.className || "" : "";
    if (/\b(bad|no|wrong|error)\b/i.test(classes) || /^(✗|pas encore|incorrect|erreur)/i.test(text)) return "error";
    if (/\b(good|ok|correct|success)\b/i.test(classes) || /^(✓|exact|bonne réponse|correct)/i.test(text)) return "success";
    return "neutral";
  }

  function feedbackActions(kind) {
    var quizNext = firstVisible(selectors.quizNext);
    if (quizNext) {
      return [
        { label: "J'ai compris, question suivante", className: "primary", action: function () { hideCard(); quizNext.click(); window.setTimeout(speakVisibleQuestion, 220); } },
        { label: "Réécouter la correction", className: "replay", action: function () { speakFeedback(lastFeedback, lastFeedbackKind); } },
        { label: "Rester sur la correction", action: function () { userPaused = true; setToggle("en attente"); hideCard(); } }
      ];
    }
    if (kind === "error") {
      return [
        { label: "J'ai compris, réessayer", className: "primary", action: function () { hideCard(); setToggle("activité"); } },
        { label: "Réécouter la correction", className: "replay", action: function () { speakFeedback(lastFeedback, lastFeedbackKind); } },
        { label: "Revoir l'écran", action: function () { userPaused = true; setToggle("en attente"); hideCard(); } }
      ];
    }
    return [
      { label: "J'ai compris, continuer", className: "primary", action: advance },
      { label: "Réécouter le retour", className: "replay", action: function () { speakFeedback(lastFeedback, lastFeedbackKind); } },
      { label: "Rester sur l'écran", action: function () { userPaused = true; setToggle("en attente"); hideCard(); } }
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
    return Array.from((rootNode || currentScope()).querySelectorAll(".feedback,#quiz-feedback,#gameFeedback,[data-feedback],[role=status],.status-message,.result-message")).filter(function (node) {
      return visible(node) && !node.closest("#pilote-prof-vocal");
    });
  }

  function inspectFeedback(before, clicked) {
    if (!enabled) return;
    var localRoot = clicked && clicked.closest(".question,.quiz-card,.game-card,.panel,#activity-zone,#zone,#lesson-zone,#interactive-zone,#screen-content");
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

  function decideAfterNarration(signature) {
    if (!enabled || userPaused || speakingInternal) return;
    if (signature !== stageSignature()) return;
    var parts = questionParts();
    if (parts.length) {
      showQuestion(parts);
      return;
    }
    var next = firstVisible(selectors.next);
    if (!next || next.disabled || interactiveControls().length) {
      showActivityCheckpoint();
      return;
    }
    advance();
  }

  function advance() {
    if (!enabled) return;
    hideCard();
    userPaused = false;
    var next = firstVisible(selectors.next);
    if (!next || next.disabled) {
      showActivityCheckpoint();
      return;
    }
    var before = stageSignature();
    next.click();
    window.setTimeout(function () {
      if (before === stageSignature()) {
        setToggle("terminé");
        setCard("Parcours terminé", PHRASES.termine, "success", []);
        speakSequence([PHRASES.termine], function () { enabled = false; setToggle("arrêté"); });
        return;
      }
      scheduleNarration(480);
    }, 120);
  }

  function scheduleNarration(delay, force) {
    window.clearTimeout(narrationTimer);
    narrationTimer = window.setTimeout(function () {
      if (!enabled || userPaused || speakingInternal) return;
      if (!force && voiceActive()) return;
      var button = firstVisible(selectors.listen);
      if (!button || button.disabled) {
        setToggle("terminé");
        return;
      }
      setToggle("lecture");
      button.click();
    }, delay || 0);
  }

  function matchesAny(element, list) {
    return !!element && list.some(function (selector) { return element.matches(selector); });
  }

  document.addEventListener("pilotevoix:debut", function (event) {
    if (event.detail && event.detail.interne) return;
    if (enabled) {
      window.clearTimeout(pendingTimer);
      lastNarration = event.detail && event.detail.texte || "";
      setToggle("lecture");
      hideCard();
    }
  });

  document.addEventListener("pilotevoix:fin", function (event) {
    if (!enabled || speakingInternal || (event.detail && event.detail.interne)) return;
    var signature = stageSignature();
    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(function () { decideAfterNarration(signature); }, nativeDelay);
  });

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("button");
    if (!button || button.closest("#pilote-prof-vocal") || button.id === "pilote-prof-toggle") return;

    if (matchesAny(button, selectors.exit) || matchesAny(button, selectors.stop)) {
      deactivate(false);
      return;
    }
    if (matchesAny(button, selectors.start)) {
      if (!enabled) activate(false);
      window.setTimeout(function () { scheduleNarration(420); }, 0);
      return;
    }
    if (matchesAny(button, selectors.listen)) {
      if (!enabled) activate(false);
      userPaused = false;
      return;
    }
    if (matchesAny(button, selectors.next) || matchesAny(button, selectors.previous)) {
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
    version: "1.1.0",
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
})();
