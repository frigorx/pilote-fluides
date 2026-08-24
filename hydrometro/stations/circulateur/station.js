(() => {
  "use strict";

  const config = window.STATION_CONFIG;
  if (!config) throw new Error("Configuration de station absente.");

  const els = Object.fromEntries([
    "progress", "stationMain", "stationTitle", "stepKicker", "stepTitle", "stepText",
    "levelNote", "actionPanel", "scene", "sceneEquivalent", "prevBtn", "nextBtn", "stepCount"
  ].map((id) => [id, document.getElementById(id)]));

  let current = 0;
  let level = "TP";
  let stepReady = false;
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;
  let quizFinished = false;

  document.title = `HydroMétro · ${config.title}`;
  els.stationTitle.textContent = config.title;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  function setFeedback(message, kind = "info") {
    let feedback = els.actionPanel.querySelector(".feedback");
    if (!feedback) {
      feedback = document.createElement("p");
      els.actionPanel.append(feedback);
    }
    feedback.className = `feedback ${kind}`;
    feedback.innerHTML = message;
  }

  function markReady() {
    stepReady = true;
    els.nextBtn.disabled = false;
  }

  function renderProgress() {
    const labels = config.steps.map((step) => step.short).concat("Quiz");
    els.progress.innerHTML = labels.map((label, index) => `
      <div class="progress-step ${index === current ? "is-current" : ""} ${index < current ? "is-done" : ""}"
           ${index === current ? 'aria-current="step"' : ""}>
        <span>${index + 1}</span><span class="progress-label">${escapeHtml(label)}</span>
      </div>`).join("");
  }

  function renderScene(step, value) {
    const rendered = typeof step.scene === "function" ? step.scene(value) : step.scene;
    els.scene.innerHTML = rendered;
    els.sceneEquivalent.textContent = typeof step.equivalent === "function" ? step.equivalent(value) : step.equivalent;
  }

  function renderChoice(action, step) {
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="choice-grid"></div>`;
    const grid = els.actionPanel.querySelector(".choice-grid");
    action.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        if (grid.dataset.locked === "true") return;
        grid.dataset.locked = "true";
        [...grid.children].forEach((item, itemIndex) => {
          item.disabled = true;
          if (itemIndex === action.correct) item.classList.add("is-correct");
        });
        const correct = index === action.correct;
        button.classList.add(correct ? "is-correct" : "is-wrong");
        if (action.sceneFor) renderScene(step, index);
        setFeedback(`${correct ? "✓ Correct. " : "✗ À revoir. "}${escapeHtml(action.explain)}`, correct ? "correct" : "wrong");
        markReady();
      });
      grid.append(button);
    });
  }

  function renderRange(action, step) {
    const initial = action.value;
    els.actionPanel.innerHTML = `
      <p class="action-title">${escapeHtml(action.prompt)}</p>
      <div class="range-row">
        <label for="stationRange">${escapeHtml(action.label)}</label>
        <output id="rangeReadout" class="readout"></output>
        <input id="stationRange" type="range" min="${action.min}" max="${action.max}" step="${action.step}" value="${initial}">
      </div>`;
    const input = document.getElementById("stationRange");
    const readout = document.getElementById("rangeReadout");
    const update = (isUser) => {
      const value = Number(input.value);
      const state = action.evaluate(value);
      readout.textContent = state.readout;
      renderScene(step, value);
      setFeedback(escapeHtml(state.observation), state.kind || "info");
      if (isUser) markReady();
    };
    input.addEventListener("input", () => update(true));
    update(false);
  }

  function renderMatch(action) {
    const optionMarkup = [`<option value="">Choisir…</option>`].concat(action.options.map((option, index) => `<option value="${index}">${escapeHtml(option)}</option>`)).join("");
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="match-grid">${action.items.map((item, index) => `
      <label class="match-row"><span>${escapeHtml(item.label)}</span><select data-match="${index}">${optionMarkup}</select></label>`).join("")}</div>
      <button type="button" class="verify-btn">Vérifier les associations</button>`;
    els.actionPanel.querySelector(".verify-btn").addEventListener("click", () => {
      const selects = [...els.actionPanel.querySelectorAll("select")];
      const correct = selects.every((select, index) => Number(select.value) === action.items[index].answer);
      if (selects.some((select) => select.value === "")) {
        setFeedback("Associez chaque élément avant de vérifier.", "info");
        return;
      }
      selects.forEach((select, index) => {
        select.disabled = true;
        select.style.borderStyle = Number(select.value) === action.items[index].answer ? "double" : "dashed";
        select.style.borderColor = Number(select.value) === action.items[index].answer ? "#1e7e54" : "#c0392b";
      });
      setFeedback(`${correct ? "✓ Associations justes. " : "✗ Certaines associations sont à revoir. "}${escapeHtml(action.explain)}`, correct ? "correct" : "wrong");
      markReady();
    });
  }

  function renderSequence(action) {
    const picked = [];
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="sequence-list"></div><div class="sequence-order">Ordre choisi : —</div><button type="button" class="verify-btn" disabled>Vérifier l’ordre</button>`;
    const list = els.actionPanel.querySelector(".sequence-list");
    const order = els.actionPanel.querySelector(".sequence-order");
    const verify = els.actionPanel.querySelector(".verify-btn");
    action.items.forEach((label, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sequence-item";
      button.textContent = label;
      button.addEventListener("click", () => {
        if (picked.includes(index)) return;
        picked.push(index);
        button.disabled = true;
        order.textContent = `Ordre choisi : ${picked.map((item) => action.items[item]).join(" → ")}`;
        verify.disabled = picked.length !== action.items.length;
      });
      list.append(button);
    });
    verify.addEventListener("click", () => {
      const correct = picked.every((value, index) => value === action.correctOrder[index]);
      verify.disabled = true;
      setFeedback(`${correct ? "✓ Démarche cohérente. " : "✗ L’ordre ne permet pas de vérifier l’hypothèse proprement. "}${escapeHtml(action.explain)}`, correct ? "correct" : "wrong");
      markReady();
    });
  }

  function renderAction(step) {
    const action = step.action;
    if (!action) {
      els.actionPanel.innerHTML = "";
      markReady();
      return;
    }
    if (action.type === "choice") renderChoice(action, step);
    if (action.type === "range") renderRange(action, step);
    if (action.type === "match") renderMatch(action);
    if (action.type === "sequence") renderSequence(action);
  }

  function renderLesson() {
    const step = config.steps[current];
    stepReady = false;
    els.stepKicker.textContent = `Station ${config.code} · ${step.kicker}`;
    els.stepTitle.textContent = step.title;
    els.stepText.textContent = step.text;
    const depth = step[level.toLowerCase()] || config.levels[level].objective;
    els.levelNote.innerHTML = `<strong>${level === "TP" ? "TP CVC" : "BTS FED"} :</strong> ${escapeHtml(depth)}`;
    renderScene(step, step.action?.value);
    renderAction(step);
    els.prevBtn.disabled = current === 0;
    els.nextBtn.disabled = !stepReady;
    els.nextBtn.textContent = current === config.steps.length - 1 ? "Contrôle formatif" : "Continuer";
    els.stepCount.textContent = `${current + 1} / ${config.steps.length + 1}`;
  }

  function finishQuiz() {
    quizFinished = true;
    const acquired = quizScore >= Math.ceil(config.quiz.length * .7);
    els.stepKicker.textContent = `Station ${config.code} · bilan formatif`;
    els.stepTitle.textContent = acquired ? "Acquis sur ce modèle" : "À consolider";
    els.stepText.textContent = `Score : ${quizScore} / ${config.quiz.length}. Ce résultat guide l’entraînement ; il ne valide ni un titre ni un BTS.`;
    els.levelNote.innerHTML = `<strong>Suite conseillée :</strong> ${escapeHtml(acquired ? config.next : "reprendre les étapes liées aux erreurs, puis refaire le contrôle")}.`;
    els.actionPanel.innerHTML = `<div class="score-card ${acquired ? "" : "is-fragile"}"><h3>${acquired ? "✓ Repères acquis" : "· Repères fragiles"}</h3><p>Les réponses ont été corrigées une par une.</p><button type="button" class="verify-btn" id="restartQuiz">Refaire le contrôle</button></div>`;
    document.getElementById("restartQuiz").addEventListener("click", () => {
      quizIndex = 0; quizScore = 0; quizAnswered = false; quizFinished = false; render();
    });
    els.scene.innerHTML = config.summaryScene;
    els.sceneEquivalent.textContent = config.summaryEquivalent;
    els.prevBtn.disabled = false;
    els.nextBtn.disabled = false;
    els.nextBtn.textContent = "Retour au plan";
    els.stepCount.textContent = `${config.steps.length + 1} / ${config.steps.length + 1}`;
  }

  function renderQuiz() {
    if (quizFinished) { finishQuiz(); return; }
    const question = config.quiz[quizIndex];
    quizAnswered = false;
    els.stepKicker.textContent = `Station ${config.code} · contrôle formatif`;
    els.stepTitle.textContent = `Question ${quizIndex + 1} sur ${config.quiz.length}`;
    els.stepText.textContent = question.context;
    els.levelNote.innerHTML = `<strong>${level === "TP" ? "TP CVC" : "BTS FED"} :</strong> ${escapeHtml(config.levels[level].assessment)}`;
    els.scene.innerHTML = question.scene || config.summaryScene;
    els.sceneEquivalent.textContent = question.equivalent || config.summaryEquivalent;
    els.actionPanel.innerHTML = `<p class="quiz-question">${escapeHtml(question.question)}</p><div class="choice-grid"></div>`;
    const grid = els.actionPanel.querySelector(".choice-grid");
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";
      button.textContent = option;
      button.addEventListener("click", () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const correct = index === question.correct;
        if (correct) quizScore += 1;
        [...grid.children].forEach((item, itemIndex) => {
          item.disabled = true;
          if (itemIndex === question.correct) item.classList.add("is-correct");
        });
        button.classList.add(correct ? "is-correct" : "is-wrong");
        setFeedback(`${correct ? "✓ Correct. " : "✗ À revoir. "}${escapeHtml(question.explain)}`, correct ? "correct" : "wrong");
        els.nextBtn.disabled = false;
      });
      grid.append(button);
    });
    // Le score d’une question reste immuable : le contrôle avance uniquement vers l’avant.
    els.prevBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.nextBtn.textContent = quizIndex === config.quiz.length - 1 ? "Voir le bilan" : "Question suivante";
    els.stepCount.textContent = `Q${quizIndex + 1} / ${config.quiz.length}`;
  }

  function render() {
    renderProgress();
    if (current < config.steps.length) renderLesson();
    else renderQuiz();
    requestAnimationFrame(() => els.stepTitle.focus({ preventScroll: true }));
  }

  document.querySelectorAll(".level-btn").forEach((button) => {
    button.addEventListener("click", () => {
      level = button.dataset.level;
      document.querySelectorAll(".level-btn").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });

  els.prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      quizIndex = 0; quizScore = 0; quizFinished = false;
      render();
    }
  });

  els.nextBtn.addEventListener("click", () => {
    if (current < config.steps.length) {
      current += 1;
      render();
      return;
    }
    if (quizFinished) {
      window.location.href = "../../index.html";
      return;
    }
    if (!quizAnswered) return;
    if (quizIndex < config.quiz.length - 1) quizIndex += 1;
    else quizFinished = true;
    render();
  });

  document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    if (["INPUT", "SELECT", "BUTTON", "A"].includes(tag)) return;
    if (event.key === "ArrowLeft" && !els.prevBtn.disabled) els.prevBtn.click();
    if (event.key === "ArrowRight" && !els.nextBtn.disabled) els.nextBtn.click();
    if (event.key === "Escape") window.location.href = "../../index.html";
  });

  render();
})();
