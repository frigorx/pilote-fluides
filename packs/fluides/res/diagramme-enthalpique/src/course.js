(() => {
  "use strict";

  const modules = Array.isArray(window.__INERWEB_MODULES__) ? window.__INERWEB_MODULES__ : [];
  const config = window.__INERWEB_CONFIG__ || {};
  const moduleById = new Map(modules.map((module) => [module.id, module]));
  const params = new URLSearchParams(window.location.search);
  const requestedIds = (config.fixedIds || params.get("modules")?.split(",") || config.defaultIds || [])
    .map((id) => String(id).trim())
    .filter((id) => moduleById.has(id));
  const selectedModules = (requestedIds.length ? requestedIds : modules.map((module) => module.id))
    .map((id) => moduleById.get(id));
  const mode = config.fixedMode || (params.get("mode") === "revision" ? "revision" : "apprentissage");

  const stages = [];
  selectedModules.forEach((module) => {
    if (mode !== "revision") {
      stages.push({ type: "discover", module });
      stages.push({ type: "function", module });
    }
    stages.push({ type: "quiz", module });
  });
  stages.push({ type: "final" });

  const state = {
    stageIndex: 0,
    speechRun: 0,
    speaking: false,
    paused: false,
    currentSpeechText: "",
    voices: [],
    results: new Map(selectedModules.map((module) => [module.id, {
      quizIndex: 0,
      answers: [],
      complete: false,
      showingResult: false
    }]))
  };

  const dom = {
    app: document.getElementById("courseApp"),
    courseName: document.getElementById("courseName"),
    progressModule: document.getElementById("progressModule"),
    progressTrack: document.getElementById("progressTrack"),
    progressFill: document.getElementById("progressFill"),
    progressCount: document.getElementById("progressCount"),
    diagram: document.getElementById("diagram"),
    visualCaption: document.getElementById("visualCaption"),
    lessonKicker: document.getElementById("lessonKicker"),
    lessonTitle: document.getElementById("lessonTitle"),
    lessonContent: document.getElementById("lessonContent"),
    quizArea: document.getElementById("quizArea"),
    feedback: document.getElementById("feedback"),
    backButton: document.getElementById("backButton"),
    nextButton: document.getElementById("nextButton"),
    moduleState: document.getElementById("moduleState"),
    readButton: document.getElementById("readButton"),
    stopButton: document.getElementById("stopButton"),
    speedSelect: document.getElementById("speedSelect"),
    readingButton: document.getElementById("readingButton"),
    fullscreenButton: document.getElementById("fullscreenButton")
  };

  const phaseNames = {
    discover: "Je découvre",
    function: "Je comprends",
    quiz: "Je vérifie"
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function resultFor(module) {
    return state.results.get(module.id);
  }

  function scoreFor(module) {
    return resultFor(module).answers.filter((answer) => answer?.correct).length;
  }

  function totalScore() {
    return selectedModules.reduce((sum, module) => sum + scoreFor(module), 0);
  }

  function possibleScore() {
    return selectedModules.reduce((sum, module) => sum + module.quiz.length, 0);
  }

  function captionFor(module) {
    if (!module) return "Vue d’ensemble qualitative — aucune valeur ne doit être relevée sur ce schéma.";
    const captions = {
      axes: "Axes : pression p verticale · enthalpie h horizontale",
      saturation: "Courbe de saturation : la cloche qui sépare les domaines de phase",
      "bulle-rosee": "Trait plein : courbe de bulle · trait tireté : courbe de rosée",
      zones: "Gauche : liquide · intérieur : liquide + vapeur · droite : vapeur",
      isotitres: "Isotitres : lignes pointillées de même fraction massique de vapeur x",
      isobare: "Isobare : ligne horizontale · p constante",
      isotherme: "Isotherme : ligne tiretée · T constante",
      isochore: "Isochore : trait mixte · v constant",
      isentrope: "Isentrope : trait plein montant · s constante",
      isenthalpe: "Isenthalpe : ligne verticale tiretée · h constante"
    };
    return captions[module.id] || module.symbol;
  }

  function activeClass(active, id, extra = "") {
    const on = active === id || active === "overview";
    return `${extra} ${on ? "active d-trace" : ""}`.trim();
  }

  function diagramSvg(active) {
    const overview = active === "overview";
    const labelMap = {
      axes: [205, 514, "p vertical · h horizontal"],
      saturation: [438, 105, "SATURATION"],
      "bulle-rosee": [430, 178, "BULLE / ROSÉE"],
      zones: [430, 492, "TROIS ZONES"],
      isotitres: [465, 308, "ISOTITRES x"],
      isobare: [720, 255, "ISOBARE · p"],
      isotherme: [725, 390, "ISOTHERME · T"],
      isochore: [770, 248, "ISOCHORE · v"],
      isentrope: [520, 170, "ISENTROPE · s"],
      isenthalpe: [560, 492, "ISENTHALPE · h"]
    };
    const [labelX, labelY, label] = labelMap[active] || [462, 100, "FAMILLES DE COURBES"];
    const saturationActive = active === "saturation" || active === "bulle-rosee" || active === "zones" || active === "isotitres" || overview;
    const bubbleActive = active === "bulle-rosee" || overview;
    const zonesActive = active === "zones" || overview;

    return `
      <svg viewBox="0 0 940 560" role="img" aria-labelledby="diagramTitle diagramDesc" preserveAspectRatio="xMidYMid meet">
        <title id="diagramTitle">Diagramme log pression-enthalpie pédagogique</title>
        <desc id="diagramDesc">Schéma qualitatif original. La pression est verticale et l’enthalpie horizontale. Une cloche de saturation sépare le liquide, le mélange liquide-vapeur et la vapeur. La famille étudiée est mise en évidence avec une couleur, un style de trait et un nom.</desc>
        <defs>
          <marker id="arrowNavy" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0 0 L8 3 L0 6 Z" fill="#1b3a63"></path>
          </marker>
        </defs>
        <rect x="4" y="4" width="932" height="552" rx="18" fill="#fffdf8" stroke="rgba(27,58,99,.18)"></rect>

        <g aria-hidden="true">
          <path class="d-grid" d="M105 125H860 M105 220H860 M105 315H860 M105 410H860"></path>
          <path class="d-grid" d="M225 75V475 M370 75V475 M515 75V475 M660 75V475 M805 75V475"></path>
        </g>

        <path class="d-zone ${zonesActive ? "active" : ""}" fill="#84b7ec" d="M106 76H425 C350 118 265 250 225 474 H106Z"></path>
        <path class="d-zone ${zonesActive ? "active" : ""}" fill="#ff6b35" d="M225 474 C265 250 350 118 425 92 C515 125 600 260 625 474Z"></path>
        <path class="d-zone ${zonesActive ? "active" : ""}" fill="#7d4c9e" d="M425 92 C515 125 600 260 625 474 H860V76H425Z"></path>

        <path class="d-axis" d="M105 475V66 M105 475H872" marker-end="url(#arrowNavy)"></path>
        <path class="d-axis" d="M105 475V58" marker-end="url(#arrowNavy)"></path>
        <text class="d-text d-label" x="695" y="520">enthalpie massique h (kJ/kg) →</text>
        <text class="d-text d-label" x="35" y="305" transform="rotate(-90 35 305)">pression absolue p (bar abs) →</text>
        <text class="d-text d-small" x="118" y="92">échelle logarithmique</text>

        <g class="d-family ${saturationActive ? "active" : ""}">
          <path class="d-saturation" d="M225 474 C265 250 350 118 425 92"></path>
          <path class="d-saturation" d="M425 92 C515 125 600 260 625 474"></path>
          <circle cx="425" cy="92" r="6" fill="#1b3a63"></circle>
        </g>

        <g class="d-family ${bubbleActive ? "active d-trace" : ""}">
          <path class="d-bubble" pathLength="1" d="M225 474 C265 250 350 118 425 92"></path>
          <path class="d-dew" pathLength="1" d="M425 92 C515 125 600 260 625 474"></path>
        </g>

        <g class="d-family ${activeClass(active, "isotitres")}">
          <path class="d-isotitre" pathLength="1" d="M292 455 C328 334 365 221 399 130"></path>
          <path class="d-isotitre" pathLength="1" d="M396 462 C422 340 448 224 458 126"></path>
          <path class="d-isotitre" pathLength="1" d="M520 458 C530 344 532 237 515 153"></path>
          <text class="d-text d-small" x="327" y="376">x 0,25</text>
          <text class="d-text d-small" x="420" y="355">x 0,50</text>
          <text class="d-text d-small" x="505" y="385">x 0,75</text>
        </g>

        <g class="d-family ${activeClass(active, "isobare")}">
          <path class="d-isobare" pathLength="1" d="M150 260H810"></path>
          <path class="d-isobare" pathLength="1" d="M165 390H830"></path>
        </g>

        <g class="d-family ${activeClass(active, "isotherme")}">
          <path class="d-isotherme" pathLength="1" d="M260 168 C275 225 294 254 330 260 H615 C660 282 690 330 710 405"></path>
          <path class="d-isotherme" pathLength="1" d="M210 300 C250 345 295 385 350 390 H655 C705 407 742 434 770 468"></path>
        </g>

        <g class="d-family ${activeClass(active, "isochore")}">
          <path class="d-isochore" pathLength="1" d="M630 458 C642 388 670 307 716 236 C750 184 785 139 820 105"></path>
          <path class="d-isochore" pathLength="1" d="M700 460 C716 390 748 319 790 260 C817 223 840 196 860 178"></path>
        </g>

        <g class="d-family ${activeClass(active, "isentrope")}">
          <path class="d-isentrope" pathLength="1" d="M602 452 C632 372 675 280 731 192 C762 145 791 111 820 86"></path>
          <path class="d-isentrope" pathLength="1" d="M660 458 C692 380 735 305 786 238 C813 203 840 172 862 151"></path>
        </g>

        <g class="d-family ${activeClass(active, "isenthalpe")}">
          <path class="d-isenthalpe" pathLength="1" d="M555 110V466"></path>
          <path class="d-isenthalpe" pathLength="1" d="M735 110V466"></path>
        </g>

        <text class="d-text d-small" x="425" y="76" text-anchor="middle">point critique</text>
        <text class="d-text d-label" x="150" y="190">LIQUIDE</text>
        <text class="d-text d-label" x="423" y="430" text-anchor="middle">LIQUIDE + VAPEUR</text>
        <text class="d-text d-label" x="688" y="130">VAPEUR</text>
        <text class="d-text d-small" x="688" y="158">surchauffée</text>
        <text class="d-text d-active-label" x="${labelX}" y="${labelY}" text-anchor="middle">${escapeHtml(label)}</text>
        ${overview ? `
          <g class="d-text d-small">
            <text x="725" y="245">p constante</text>
            <text x="722" y="414">T constante</text>
            <text x="805" y="205">v constant</text>
            <text x="710" y="184">s constante</text>
            <text x="565" y="445">h constante</text>
          </g>` : ""}
      </svg>`;
  }

  function buildNarration(title, body, extra = "") {
    return [title, body, extra].filter(Boolean).join(". ").replace(/\s+/g, " ").trim();
  }

  function renderStage() {
    stopSpeech();
    const stage = stages[state.stageIndex];
    dom.app.dataset.stage = stage.type;
    const percent = Math.round(((state.stageIndex + 1) / stages.length) * 100);
    dom.progressFill.style.width = `${percent}%`;
    dom.progressTrack.setAttribute("aria-valuenow", String(percent));
    dom.progressCount.textContent = `${state.stageIndex + 1} / ${stages.length}`;
    dom.backButton.disabled = state.stageIndex === 0;
    dom.quizArea.hidden = true;
    dom.feedback.hidden = true;
    dom.feedback.className = "feedback";

    if (stage.type === "final") {
      renderFinal();
      return;
    }

    const module = stage.module;
    const moduleIndex = selectedModules.findIndex((item) => item.id === module.id) + 1;
    dom.courseName.textContent = config.documentTitle || "Diagramme enthalpique — parcours modulaire";
    dom.progressModule.textContent = `${moduleIndex}. ${module.short}`;
    dom.moduleState.textContent = `Module ${moduleIndex} sur ${selectedModules.length} · ${phaseNames[stage.type]}`;
    dom.lessonKicker.textContent = `${phaseNames[stage.type]} · ${module.level === "essentiel" ? "Essentiel habilitation" : "Approfondissement"}`;
    dom.diagram.innerHTML = diagramSvg(module.id);
    dom.visualCaption.textContent = captionFor(module);

    if (stage.type === "discover") {
      dom.lessonTitle.textContent = module.discover.title;
      dom.lessonContent.innerHTML = `
        <div class="goal"><strong>Objectif :</strong> ${escapeHtml(module.goal)}</div>
        <p>${escapeHtml(module.discover.body)}</p>
        <div class="remember"><strong>À retenir :</strong> ${escapeHtml(module.discover.remember)}</div>`;
      dom.nextButton.disabled = false;
      dom.nextButton.textContent = "Comprendre →";
      state.currentSpeechText = buildNarration(module.discover.title, module.discover.body, module.discover.remember);
      return;
    }

    if (stage.type === "function") {
      dom.lessonTitle.textContent = module.function.title;
      dom.lessonContent.innerHTML = `
        <p>${escapeHtml(module.function.body)}</p>
        <div class="terrain"><strong>Sur le terrain :</strong> ${escapeHtml(module.function.terrain.replace(/^Lien métier\s*:\s*/i, ""))}</div>
        <div class="remember"><strong>Repère :</strong> ${escapeHtml(module.symbol)}</div>`;
      dom.nextButton.disabled = false;
      dom.nextButton.textContent = "Je vérifie →";
      state.currentSpeechText = buildNarration(module.function.title, module.function.body, module.function.terrain);
      return;
    }

    renderQuiz(module);
  }

  function renderQuiz(module) {
    const result = resultFor(module);
    dom.lessonContent.innerHTML = "";
    dom.quizArea.hidden = false;

    if (result.showingResult || result.complete) {
      result.complete = true;
      const score = scoreFor(module);
      const perfect = score === module.quiz.length;
      dom.lessonTitle.textContent = perfect ? "Repère confirmé" : "Repère à consolider";
      dom.quizArea.innerHTML = `
        <div class="${perfect ? "remember" : "terrain"}">
          <strong>${perfect ? "✓ Acquis" : "À revoir"} :</strong>
          ${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""} sur ${module.quiz.length}.
        </div>
        <p>${escapeHtml(module.discover.remember)}</p>`;
      dom.nextButton.disabled = false;
      dom.nextButton.textContent = state.stageIndex === stages.length - 2 ? "Voir le bilan →" : "Module suivant →";
      state.currentSpeechText = buildNarration(dom.lessonTitle.textContent, `${score} bonnes réponses sur ${module.quiz.length}`, module.discover.remember);
      return;
    }

    const question = module.quiz[result.quizIndex];
    const existing = result.answers[result.quizIndex];
    dom.lessonTitle.textContent = "À vous de repérer";
    dom.quizArea.innerHTML = `
      <div class="quiz-count">Question ${result.quizIndex + 1} sur ${module.quiz.length}</div>
      <p class="quiz-question">${escapeHtml(question.question)}</p>
      <div class="choices" role="group" aria-label="Choix de réponse">
        ${question.choices.map((choice, index) => {
          const classes = ["choice"];
          if (existing && index === question.answer) classes.push("correct");
          if (existing && index === existing.choice && !existing.correct) classes.push("incorrect");
          return `<button type="button" class="${classes.join(" ")}" data-choice="${index}" ${existing ? "disabled" : ""}>${String.fromCharCode(65 + index)}. ${escapeHtml(choice)}</button>`;
        }).join("")}
      </div>`;

    dom.quizArea.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => answerQuestion(module, Number(button.dataset.choice)));
    });

    state.currentSpeechText = buildNarration(
      dom.lessonTitle.textContent,
      question.question,
      question.choices.map((choice, index) => `${String.fromCharCode(65 + index)}, ${choice}`).join(". ")
    );

    if (existing) {
      showQuestionFeedback(question, existing.correct);
      dom.nextButton.disabled = false;
      dom.nextButton.textContent = result.quizIndex < module.quiz.length - 1 ? "Question suivante →" : "Voir le résultat →";
    } else {
      dom.nextButton.disabled = true;
      dom.nextButton.textContent = "Choisissez une réponse";
    }

  }

  function answerQuestion(module, choice) {
    const result = resultFor(module);
    if (result.answers[result.quizIndex]) return;
    const question = module.quiz[result.quizIndex];
    result.answers[result.quizIndex] = { choice, correct: choice === question.answer };
    renderStage();
  }

  function showQuestionFeedback(question, correct) {
    dom.feedback.hidden = false;
    dom.feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    dom.feedback.innerHTML = `<strong>${correct ? "✓ Correct" : "✗ À revoir"}.</strong> ${escapeHtml(question.feedback)}`;
    state.currentSpeechText = `${state.currentSpeechText}. ${correct ? "Correct" : "À revoir"}. ${question.feedback}`;
  }

  function renderFinal() {
    const score = totalScore();
    const possible = possibleScore();
    const toReview = selectedModules.filter((module) => scoreFor(module) < module.quiz.length);
    dom.courseName.textContent = config.documentTitle || "Diagramme enthalpique — parcours modulaire";
    dom.progressModule.textContent = "Bilan de révision";
    dom.moduleState.textContent = "Bilan · entraînement sans valeur d’examen";
    dom.lessonKicker.textContent = "Je fais le point";
    dom.lessonTitle.textContent = toReview.length ? "Vous savez quoi revoir" : "Tous les repères sont confirmés";
    dom.diagram.innerHTML = diagramSvg("overview");
    dom.visualCaption.textContent = captionFor(null);
    dom.lessonContent.innerHTML = `
      <div class="${toReview.length ? "terrain" : "remember"}">
        <strong>Résultat :</strong> ${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""} sur ${possible}.
      </div>
      ${toReview.length
        ? `<p><strong>Modules à reprendre :</strong> ${toReview.map((module) => escapeHtml(module.short)).join(" · ")}</p>`
        : "<p>Vous avez reconnu les grandeurs et les familles sans vous appuyer uniquement sur leur couleur.</p>"}
      <div class="remember"><strong>Règle commune :</strong> ISO signifie « même ». Cherchez ensuite la grandeur qui reste constante.</div>`;
    dom.quizArea.hidden = true;
    dom.feedback.hidden = true;
    dom.nextButton.disabled = false;
    dom.nextButton.textContent = "Recommencer ↻";
    dom.backButton.disabled = false;
    state.currentSpeechText = buildNarration(dom.lessonTitle.textContent, `${score} bonnes réponses sur ${possible}`, toReview.length ? `À reprendre : ${toReview.map((module) => module.short).join(", ")}` : "Tous les repères sont confirmés");
  }

  function goNext() {
    const stage = stages[state.stageIndex];
    if (stage.type === "final") {
      resetCourse();
      return;
    }
    if (stage.type === "quiz") {
      const result = resultFor(stage.module);
      if (result.complete) {
        state.stageIndex += 1;
        renderStage();
        return;
      }
      const existing = result.answers[result.quizIndex];
      if (!existing) return;
      if (result.quizIndex < stage.module.quiz.length - 1) {
        result.quizIndex += 1;
      } else {
        result.showingResult = true;
      }
      renderStage();
      return;
    }
    state.stageIndex = Math.min(stages.length - 1, state.stageIndex + 1);
    renderStage();
  }

  function goBack() {
    if (state.stageIndex === 0) return;
    state.stageIndex -= 1;
    renderStage();
  }

  function resetCourse() {
    state.results = new Map(selectedModules.map((module) => [module.id, {
      quizIndex: 0,
      answers: [],
      complete: false,
      showingResult: false
    }]));
    state.stageIndex = 0;
    renderStage();
  }

  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    state.voices = window.speechSynthesis.getVoices();
  }

  function voiceScore(voice) {
    const lang = String(voice.lang || "").replace("_", "-").toLowerCase();
    const name = String(voice.name || "").toLowerCase();
    let score = 0;
    if (lang === "fr-fr") score += 100;
    else if (lang.startsWith("fr-")) score += 70;
    else if (lang.startsWith("fr")) score += 50;
    if (voice.localService) score += 30;
    if (/natural|naturel|neural/.test(name)) score += 20;
    if (/google|microsoft/.test(name)) score += 5;
    if (/denise|henri|julie|paul|hortense|audrey|thomas/.test(name)) score += 10;
    return score;
  }

  function bestVoice() {
    return [...state.voices]
      .filter((voice) => voiceScore(voice) >= 50)
      .sort((a, b) => voiceScore(b) - voiceScore(a))[0] || null;
  }

  function updateSpeechButtons() {
    if (!("speechSynthesis" in window)) {
      dom.readButton.disabled = true;
      dom.stopButton.disabled = true;
      dom.readButton.textContent = "Voix indisponible";
      return;
    }
    dom.readButton.disabled = false;
    dom.stopButton.disabled = !state.speaking && !state.paused;
    dom.readButton.setAttribute("aria-pressed", String(state.speaking || state.paused));
    dom.readButton.textContent = state.paused ? "▶ Reprendre" : state.speaking ? "Ⅱ Pause" : "▶ Écouter";
  }

  function stopSpeech() {
    state.speechRun += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    state.speaking = false;
    state.paused = false;
    updateSpeechButtons();
  }

  function speakCurrent() {
    if (!("speechSynthesis" in window) || !state.currentSpeechText) return;
    stopSpeech();
    const run = state.speechRun;
    const utterance = new SpeechSynthesisUtterance(state.currentSpeechText);
    utterance.lang = "fr-FR";
    utterance.rate = Number(dom.speedSelect.value || 0.95);
    utterance.pitch = 1;
    const voice = bestVoice();
    if (voice) utterance.voice = voice;
    utterance.onstart = () => {
      if (run !== state.speechRun) return;
      state.speaking = true;
      state.paused = false;
      updateSpeechButtons();
    };
    utterance.onend = () => {
      if (run !== state.speechRun) return;
      state.speaking = false;
      state.paused = false;
      updateSpeechButtons();
    };
    utterance.onerror = (event) => {
      if (run !== state.speechRun || event.error === "canceled" || event.error === "interrupted") return;
      state.speaking = false;
      state.paused = false;
      updateSpeechButtons();
      dom.feedback.hidden = false;
      dom.feedback.className = "feedback incorrect";
      dom.feedback.textContent = "La voix n’est pas disponible. Tout le texte reste affiché à l’écran.";
    };
    window.speechSynthesis.speak(utterance);
  }

  function toggleSpeech() {
    if (!("speechSynthesis" in window)) return;
    if (state.paused) {
      window.speechSynthesis.resume();
      state.paused = false;
      state.speaking = true;
      updateSpeechButtons();
      return;
    }
    if (state.speaking) {
      window.speechSynthesis.pause();
      state.paused = true;
      state.speaking = false;
      updateSpeechButtons();
      return;
    }
    speakCurrent();
  }

  function interactiveTarget(target) {
    return Boolean(target.closest("button, select, input, textarea, a, [role='button']"));
  }

  dom.backButton.addEventListener("click", goBack);
  dom.nextButton.addEventListener("click", goNext);
  dom.readButton.addEventListener("click", toggleSpeech);
  dom.stopButton.addEventListener("click", stopSpeech);
  dom.speedSelect.addEventListener("change", () => {
    if (state.speaking || state.paused) speakCurrent();
  });
  dom.readingButton.addEventListener("click", () => {
    const active = dom.app.classList.toggle("reading-easy");
    dom.readingButton.setAttribute("aria-pressed", String(active));
    dom.readingButton.setAttribute("aria-label", active ? "Désactiver la lecture facilitée" : "Activer la lecture facilitée");
  });
  dom.fullscreenButton.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  });

  document.addEventListener("fullscreenchange", () => {
    dom.fullscreenButton.textContent = document.fullscreenElement ? "⤢" : "⛶";
    dom.fullscreenButton.setAttribute("aria-label", document.fullscreenElement ? "Quitter le plein écran" : "Afficher en plein écran");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSpeech();
  });
  window.addEventListener("pagehide", stopSpeech);
  window.addEventListener("beforeunload", stopSpeech);
  document.addEventListener("keydown", (event) => {
    if (interactiveTarget(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (!dom.nextButton.disabled) goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goBack();
    } else if (event.key === "Escape") {
      stopSpeech();
      if (document.fullscreenElement) document.exitFullscreen?.();
    }
  });

  if ("speechSynthesis" in window) {
    loadVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
  }
  updateSpeechButtons();
  renderStage();
})();
