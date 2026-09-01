(() => {
  "use strict";

  const config = window.STATION_CONFIG;
  if (!config) throw new Error("Configuration de station absente.");

  function hacherTexte(texte) {
    let hash = 5381;
    for (let i = 0; i < texte.length; i += 1) hash = ((hash * 33) ^ texte.charCodeAt(i)) >>> 0;
    hash ^= hash >>> 16; hash = Math.imul(hash, 0x45d9f3b) >>> 0;
    hash ^= hash >>> 16; hash = Math.imul(hash, 0x45d9f3b) >>> 0;
    hash ^= hash >>> 16;
    return hash >>> 0;
  }

  function permutationDepuisIndex(n, graine) {
    const factorielles = [1];
    for (let i = 1; i <= n; i += 1) factorielles[i] = factorielles[i - 1] * i;
    let reste = graine % factorielles[n];
    const disponibles = Array.from({ length: n }, (_, i) => i);
    const permutation = [];
    for (let i = n; i > 0; i -= 1) {
      const f = factorielles[i - 1];
      const choix = Math.floor(reste / f);
      permutation.push(disponibles.splice(choix, 1)[0]);
      reste %= f;
    }
    return permutation;
  }

  function melangerReponses(prompt, options, correct) {
    const n = options.length;
    if (n < 2) return { options, correct };
    const permutation = permutationDepuisIndex(n, hacherTexte(prompt || ""));
    return { options: permutation.map((i) => options[i]), correct: permutation.indexOf(correct) };
  }

  config.steps.forEach((step) => {
    if (step.action?.type !== "choice") return;
    const melange = melangerReponses(step.action.prompt, step.action.options, step.action.correct);
    step.action.options = melange.options;
    step.action.correct = melange.correct;
  });

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "../_commun/formative-shared.css?v=20260823-global1";
  document.head.append(style);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const els = Object.fromEntries([
    "progress", "stationMain", "stationTitle", "stepKicker", "stepTitle", "stepText",
    "levelNote", "actionPanel", "scene", "sceneEquivalent", "prevBtn", "nextBtn", "stepCount"
  ].map((id) => [id, document.getElementById(id)]));

  const routes = {
    P: ["boucle", "energie", "debit", "delta-t", "puissance", "mesurer"],
    E: ["production", "echangeur", "debit", "circulateur", "pertes", "vase", "securite"],
    D: ["monotube", "bitube", "pertes", "v3v", "equilibrage", "plancher"],
    M: ["mesurer", "releves", "equilibrage", "tampon", "decouplage", "diagnostic", "mission"]
  };

  let current = 0;
  let furthest = 0;
  let level = "TP";
  let stepReady = false;
  let speechRun = 0;
  let speaking = false;
  let paused = false;

  document.title = `HydroMétro · ${config.title}`;
  els.stationTitle.textContent = config.title;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  function activeLine() {
    const asked = new URLSearchParams(window.location.search).get("line")?.toUpperCase();
    return routes[asked]?.includes(config.id) ? asked : config.code.charAt(0);
  }

  function nextDestination() {
    const line = activeLine();
    const route = routes[line];
    const index = route.indexOf(config.id);
    if (index < route.length - 1) {
      const nextId = route[index + 1];
      return { href: `../${nextId}/index.html?line=${line}`, label: `Station suivante : ${nextId.replace("-", " ")}` };
    }
    return { href: `../../lignes/${line}/parcours.html?evaluation=1`, label: `Évaluation finale de la ligne ${line}` };
  }

  function initialSceneValue(step) {
    if (step.action?.type === "dual-range") return Object.fromEntries(step.action.controls.map((control) => [control.id, control.value]));
    return step.action?.value;
  }

  function setFeedback(message, kind = "info") {
    let feedback = $(".feedback", els.actionPanel);
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
    els.progress.innerHTML = config.steps.map((step, index) => `
      <button type="button" class="progress-step ${index === current ? "is-current" : ""} ${index < current ? "is-done" : ""}"
        data-step="${index}" ${index > furthest ? "disabled" : ""} ${index === current ? 'aria-current="step"' : ""}>
        <span>${index + 1}</span><span class="progress-label">${escapeHtml(step.short)}</span>
      </button>`).join("");
    $$('[data-step]', els.progress).forEach((button) => button.addEventListener("click", () => {
      const target = Number(button.dataset.step);
      if (target <= furthest) { current = target; render(); }
    }));
  }

  function renderScene(step, value) {
    const rendered = typeof step.scene === "function" ? step.scene(value) : step.scene;
    els.scene.innerHTML = rendered;
    els.sceneEquivalent.textContent = typeof step.equivalent === "function" ? step.equivalent(value) : step.equivalent;
    if (typeof step.wire === "function") step.wire(els.scene);
  }

  function renderChoice(action, step) {
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="choice-grid"></div><p class="formation-only-note">Entraînement sans score : la bonne réponse restera visible après votre choix.</p>`;
    const grid = $(".choice-grid", els.actionPanel);
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
        setFeedback(`${correct ? "✓ Compris. " : "À observer. "}${escapeHtml(action.explain)}`, correct ? "correct" : "wrong");
        markReady();
      });
      grid.append(button);
    });
  }

  function renderRange(action, step) {
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="range-row"><label for="stationRange">${escapeHtml(action.label)}</label><output id="rangeReadout" class="readout"></output><input id="stationRange" type="range" min="${action.min}" max="${action.max}" step="${action.step}" value="${action.value}"></div><p class="formation-only-note">Fais varier la commande : le schéma et le texte décrivent l’effet.</p>`;
    const input = $("#stationRange");
    const readout = $("#rangeReadout");
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

  function renderDualRange(action, step) {
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="dual-range">${action.controls.map((control) => `<div class="range-row"><label for="range-${control.id}">${escapeHtml(control.label)}</label><output id="readout-${control.id}" class="readout"></output><input id="range-${control.id}" data-dual="${control.id}" type="range" min="${control.min}" max="${control.max}" step="${control.step}" value="${control.value}"></div>`).join("")}</div><p class="formation-only-note">Compare les deux débits ; le sens interne est recalculé.</p>`;
    const inputs = $$('[data-dual]', els.actionPanel);
    const update = (isUser) => {
      const values = Object.fromEntries(inputs.map((input) => [input.dataset.dual, Number(input.value)]));
      action.controls.forEach((control) => { $(`#readout-${control.id}`).textContent = `${values[control.id].toLocaleString("fr-FR")} ${control.unit}`; });
      const state = action.evaluate(values);
      renderScene(step, values);
      setFeedback(escapeHtml(state.observation), state.kind || "info");
      if (isUser) markReady();
    };
    inputs.forEach((input) => input.addEventListener("input", () => update(true)));
    update(false);
  }

  function renderMatch(action) {
    const optionMarkup = [`<option value="">Choisir…</option>`].concat(action.options.map((option, index) => `<option value="${index}">${escapeHtml(option)}</option>`)).join("");
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="match-grid">${action.items.map((item, index) => `<label class="match-row"><span>${escapeHtml(item.label)}</span><select data-match="${index}">${optionMarkup}</select></label>`).join("")}</div><div class="choice-grid"><button type="button" class="verify-btn">Vérifier les associations</button><button type="button" class="solution-btn">Afficher la solution</button></div>`;
    const selects = $$('select', els.actionPanel);
    $(".verify-btn", els.actionPanel).addEventListener("click", () => {
      if (selects.some((select) => select.value === "")) { setFeedback("Associe chaque élément avant de vérifier, ou affiche la solution."); return; }
      const correct = selects.every((select, index) => Number(select.value) === action.items[index].answer);
      selects.forEach((select, index) => {
        select.disabled = true;
        select.style.borderStyle = Number(select.value) === action.items[index].answer ? "double" : "dashed";
        select.style.borderColor = Number(select.value) === action.items[index].answer ? "#1e7e54" : "#c0392b";
      });
      setFeedback(`${correct ? "✓ Associations comprises. " : "À comparer. "}${escapeHtml(action.explain)}`, correct ? "correct" : "wrong");
      markReady();
    });
    $(".solution-btn", els.actionPanel).addEventListener("click", () => {
      selects.forEach((select, index) => { select.value = String(action.items[index].answer); select.disabled = true; select.style.borderStyle = "double"; select.style.borderColor = "#1e7e54"; });
      setFeedback(`Solution montrée. ${escapeHtml(action.explain)}`, "correct");
      markReady();
    });
  }

  function renderSequence(action) {
    const picked = [];
    els.actionPanel.innerHTML = `<p class="action-title">${escapeHtml(action.prompt)}</p><div class="sequence-list"></div><div class="sequence-order">Ordre choisi : —</div><div class="choice-grid"><button type="button" class="verify-btn" disabled>Vérifier l’ordre</button><button type="button" class="solution-btn">Afficher la solution</button></div>`;
    const list = $(".sequence-list", els.actionPanel);
    const order = $(".sequence-order", els.actionPanel);
    const verify = $(".verify-btn", els.actionPanel);
    action.items.forEach((label, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sequence-item";
      button.textContent = label;
      button.addEventListener("click", () => {
        if (picked.includes(index)) return;
        picked.push(index); button.disabled = true;
        order.textContent = `Ordre choisi : ${picked.map((item) => action.items[item]).join(" → ")}`;
        verify.disabled = picked.length !== action.items.length;
      });
      list.append(button);
    });
    verify.addEventListener("click", () => {
      const correct = picked.every((value, index) => value === action.correctOrder[index]);
      verify.disabled = true;
      setFeedback(`${correct ? "✓ Démarche comprise. " : "À comparer. "}${escapeHtml(action.explain)}`, correct ? "correct" : "wrong");
      markReady();
    });
    $(".solution-btn", els.actionPanel).addEventListener("click", () => {
      order.textContent = `Solution : ${action.correctOrder.map((item) => action.items[item]).join(" → ")}`;
      $$('button', list).forEach((button) => { button.disabled = true; });
      setFeedback(`Solution montrée. ${escapeHtml(action.explain)}`, "correct");
      markReady();
    });
  }

  function renderAction(step) {
    const action = step.action;
    if (!action) { els.actionPanel.innerHTML = ""; markReady(); return; }
    if (action.type === "choice") renderChoice(action, step);
    if (action.type === "range") renderRange(action, step);
    if (action.type === "dual-range") renderDualRange(action, step);
    if (action.type === "match") renderMatch(action);
    if (action.type === "sequence") renderSequence(action);
  }

  function showExplanation(step) {
    const guide = step.action?.explain || step.text;
    els.scene.classList.add("is-demonstrating");
    els.actionPanel.innerHTML = `<div class="explain-first"><p class="lesson-explanation"><strong>Ce qu’il faut comprendre :</strong> ${escapeHtml(guide)}</p><p class="method">Le dessin complet reste visible. L’animation met les repères en évidence ; le texte donne la même information.</p><button type="button" class="primary" id="tryStep">Manipuler avec aide</button></div>`;
    $("#tryStep").addEventListener("click", () => { els.scene.classList.remove("is-demonstrating"); renderAction(step); });
  }

  function renderLesson() {
    stopSpeech("");
    const step = config.steps[current];
    stepReady = false;
    els.stepKicker.textContent = `Station ${config.code} · ${step.kicker}`;
    els.stepTitle.textContent = step.title;
    els.stepText.textContent = step.text;
    const depth = step[level.toLowerCase()] || step.tp || (config.levels[level] || config.levels.TP).objective;
    els.levelNote.innerHTML = `<strong>${level === "CAP" ? "CAP" : level === "TP" ? "Bac pro" : "BTS"} :</strong> ${escapeHtml(depth)}`;
    renderScene(step, initialSceneValue(step));
    els.actionPanel.innerHTML = `<div class="explain-first"><p><strong>1.</strong> Lis l’explication et observe le schéma.</p><p><strong>2.</strong> Affiche ce qu’il faut comprendre.</p><p><strong>3.</strong> Manipule ensuite sans score.</p><button type="button" class="primary" id="explainStep">Voir l’explication</button></div>`;
    $("#explainStep").addEventListener("click", () => showExplanation(step));
    els.prevBtn.disabled = current === 0;
    els.nextBtn.disabled = true;
    const destination = nextDestination();
    els.nextBtn.textContent = current === config.steps.length - 1 ? destination.label : "Continuer";
    els.stepCount.textContent = `${current + 1} / ${config.steps.length}`;
  }

  /* Le texte dit à l'élève est un texte À PART, écrit pour l'oreille, rangé dans
     `narration` à côté du texte affiché. Il n'est JAMAIS ramassé sur l'écran :
     jusqu'au 01/09/2026 cette fonction concaténait cinq éléments du DOM, et
     l'élève entendait le descriptif de la diapositive au lieu d'un professeur.
     Une étape sans narration ne parle pas — mieux vaut se taire que réciter. */
  function narrationCourante() {
    const etape = config.steps[current];
    if (!etape) return "";
    if (typeof etape.narration === "string") return etape.narration.trim();
    if (etape.narration && typeof etape.narration === "object") {
      return String(etape.narration[level] || etape.narration.TP || "").trim();
    }
    return "";
  }

  function stopSpeech(message = "Lecture arrêtée.") {
    speechRun += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    speaking = false; paused = false;
    const listen = $("#formationListen");
    const stop = $("#formationStop");
    if (listen) { listen.innerHTML = "▶ <span>Écouter</span>"; listen.setAttribute("aria-label", "Écouter l’étape"); }
    if (stop) stop.disabled = true;
    const status = $("#formationVoiceStatus");
    if (status && message) status.textContent = message;
  }

  function speakCurrent() {
    if (!("speechSynthesis" in window)) return;
    const listen = $("#formationListen");
    const stop = $("#formationStop");
    const status = $("#formationVoiceStatus");
    if (speaking && paused) { window.speechSynthesis.resume(); paused = false; listen.innerHTML = "Ⅱ <span>Pause</span>"; status.textContent = "Lecture reprise."; return; }
    if (speaking) { window.speechSynthesis.pause(); paused = true; listen.innerHTML = "▶ <span>Reprendre</span>"; status.textContent = "Lecture en pause."; return; }
    stopSpeech("");
    const dit = narrationCourante();
    if (!dit) { status.textContent = "Cette étape n’a pas encore de narration. Tout reste écrit."; return; }
    const run = speechRun;
    const utterance = new SpeechSynthesisUtterance(dit);
    /* débit, langue et choix de voix : réglage commun du site (§ 5 de la charte) */
    if (window.PILOTE_VOIX_REGLAGE) window.PILOTE_VOIX_REGLAGE.appliquer(utterance);
    else { utterance.lang = "fr-FR"; utterance.rate = .95; utterance.pitch = 1; }
    utterance.onstart = () => { if (run !== speechRun) return; speaking = true; listen.innerHTML = "Ⅱ <span>Pause</span>"; stop.disabled = false; status.textContent = "Lecture de l’étape en cours."; };
    utterance.onend = () => { if (run !== speechRun) return; stopSpeech("Lecture terminée."); };
    utterance.onerror = (event) => { if (run !== speechRun || ["canceled", "interrupted"].includes(event.error)) return; stopSpeech("Voix indisponible. Tout le contenu reste écrit."); };
    window.speechSynthesis.speak(utterance);
  }

  function installVoice() {
    const actions = document.createElement("div");
    actions.className = "voice-actions";
    actions.setAttribute("aria-label", "Lecture vocale facultative");
    actions.innerHTML = `<button id="formationListen" type="button" aria-label="Écouter l’étape">▶ <span>Écouter</span></button><button id="formationStop" type="button" aria-label="Arrêter la lecture" disabled>■ <span>Arrêter</span></button><span id="formationVoiceStatus" class="sr-only" aria-live="polite">Voix coupée.</span>`;
    $(".topbar").append(actions);
    if (window.PILOTE_VOIX_REGLAGE) window.PILOTE_VOIX_REGLAGE.monter(actions);
    $("#formationListen").addEventListener("click", speakCurrent);
    $("#formationStop").addEventListener("click", () => stopSpeech());
    if (!("speechSynthesis" in window)) { $("#formationListen").disabled = true; $("#formationVoiceStatus").textContent = "Voix indisponible. Tout le contenu reste écrit."; }
  }

  function render() {
    renderProgress();
    renderLesson();
    requestAnimationFrame(() => els.stepTitle.focus({ preventScroll: true }));
  }

  $$('[data-level]').forEach((button) => button.addEventListener("click", () => {
    level = button.dataset.level;
    $$('[data-level]').forEach((item) => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
    render();
  }));

  els.prevBtn.addEventListener("click", () => { if (current > 0) { current -= 1; render(); } });
  els.nextBtn.addEventListener("click", () => {
    if (!stepReady) return;
    if (current < config.steps.length - 1) { current += 1; furthest = Math.max(furthest, current); render(); }
    else window.location.href = nextDestination().href;
  });

  document.addEventListener("keydown", (event) => {
    if (["INPUT", "SELECT", "BUTTON", "A"].includes(event.target.tagName)) return;
    if (event.key === "ArrowLeft" && !els.prevBtn.disabled) els.prevBtn.click();
    if (event.key === "ArrowRight" && !els.nextBtn.disabled) els.nextBtn.click();
    if (event.key === "Escape") window.location.href = `../../lignes/${activeLine()}/parcours.html`;
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(""); });
  window.addEventListener("pagehide", () => stopSpeech(""));
  window.addEventListener("beforeunload", () => stopSpeech(""));

  installVoice();
  render();
})();
