(function () {
  "use strict";

  const $ = (root, selector) => root.querySelector(selector);
  const parseFrench = value => Number(String(value).trim().replace(",", "."));
  const format = (value, digits = 1) => Number(value).toFixed(digits).replace(".", ",");
  let moduleScore = null;

  const CASE = {
    fluid: "R134a",
    evaporation: -10,
    condensation: 40,
    temperatures: {
      evapOutlet: -4,
      compressorInlet: 2,
      condenserOutlet: 35,
      expansionInlet: 32
    }
  };
  CASE.bp = ThermoCore.pressureGaugeAtTemperature(CASE.fluid, CASE.evaporation, "dew");
  CASE.hp = ThermoCore.pressureGaugeAtTemperature(CASE.fluid, CASE.condensation, "bubble");

  /* Sur un corps pur, rosée et bulle sont confondues : on dit « saturation ». */
  const satLabel = (side, fluid = CASE.fluid) =>
    ThermoCore.meta(fluid)?.glide ? (side === "bp" ? "rosée" : "bulle") : "saturation";

  const measurements = {
    evapOutlet: { code: "E1", value: CASE.temperatures.evapOutlet, label: "Sortie évaporateur" },
    compressorInlet: { code: "C1", value: CASE.temperatures.compressorInlet, label: "Aspiration compresseur" },
    condenserOutlet: { code: "C2", value: CASE.temperatures.condenserOutlet, label: "Sortie condenseur" },
    expansionInlet: { code: "D1", value: CASE.temperatures.expansionInlet, label: "Entrée détendeur" }
  };

  function gaugeConfig(side, fluid = CASE.fluid, temperature = side === "bp" ? CASE.evaporation : CASE.condensation) {
    const phase = side === "bp" ? "dew" : "bubble";
    return {
      side, fluid, phase, temperature,
      pressure: ThermoCore.pressureGaugeAtTemperature(fluid, temperature, phase),
      min: side === "bp" ? -1 : 3,
      max: side === "bp" ? 5 : 18,
      major: side === "bp" ? 1 : 2
    };
  }

  function draw(svg, config, readout = false) {
    svg.closest(".gauge-stage")?.classList.add(config.side);
    return GaugeRenderer.render(svg, {
      ...config,
      temperatureStep: 5,
      showNeedleReadout: readout
    });
  }

  function circuitPanel() {
    return `<div class="scene-grid"><div class="circuit-shell" id="circuit"></div><aside class="panel" id="activity-panel"></aside></div>`;
  }

  function gaugePanel() {
    return `<div class="gauge-layout"><div class="gauge-stage" id="gauge-stage"><svg class="gauge-svg" id="lesson-gauge"></svg></div><aside class="gauge-controls" id="gauge-controls"></aside></div>`;
  }

  function choiceFeedback(container, correctValue, api, explanation) {
    container.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
      const correct = button.dataset.choice === correctValue;
      container.querySelectorAll("[data-choice]").forEach(item => {
        item.disabled = true;
        if (item.dataset.choice === correctValue) item.classList.add("correct");
      });
      if (!correct) button.classList.add("incorrect");
      const feedback = container.querySelector(".feedback");
      feedback.className = `feedback ${correct ? "good" : "bad"}`;
      feedback.textContent = `${correct ? "✓ Correct" : "✗ À revoir"} · ${explanation}`;
      api.unlock(correct ? "<strong>Réponse correcte</strong> · vous pouvez continuer" : "<strong>Correction affichée</strong> · relisez avant de continuer");
    }));
  }

  function calculationActivity(scene, api, options) {
    api.lock();
    const config = gaugeConfig(options.side);
    const svg = $(scene, "#lesson-gauge");
    draw(svg, config, false);
    const controls = $(scene, "#gauge-controls");
    const actual = measurements[options.point].value;
    const reference = options.side === "bp" ? CASE.evaporation : CASE.condensation;
    const expected = options.operation === "actual-minus-reference" ? actual - reference : reference - actual;
    const pointButtons = Object.entries(measurements).map(([id, item]) => `<button class="choice" data-point-choice="${id}" type="button"><strong>${item.code}</strong><br>${item.label}</button>`).join("");
    const formulaChoices = options.operation === "actual-minus-reference"
      ? [options.formula, `T saturation ${options.side.toUpperCase()} − T ${measurements[options.point].code}`, `T ${options.wrongPoint} − T saturation ${options.side.toUpperCase()}`, `T ${measurements[options.point].code} − T saturation ${options.side === "bp" ? "HP" : "BP"}`]
      : [options.formula, `T ${measurements[options.point].code} − T saturation ${options.side.toUpperCase()}`, `T saturation ${options.side.toUpperCase()} − T ${options.wrongPoint}`, `T saturation ${options.side === "hp" ? "BP" : "HP"} − T ${measurements[options.point].code}`];
    controls.innerHTML = `<span class="state-label ${options.side}">${options.side === "bp" ? "BP · ROSÉE" : "HP · BULLE"}</span>
      <h3>${options.label}</h3>
      <section class="decision-step" id="point-question"><p class="micro-question">1. Quelle température réelle faut-il prendre ?</p><div class="choice-grid">${pointButtons}</div><p class="feedback">Choisissez d’abord l’emplacement de la sonde.</p></section>
      <section class="decision-step" id="formula-question" hidden><p class="micro-question">2. Quelle formule faut-il appliquer ?</p><div class="choice-grid">${formulaChoices.map((formula, index) => `<button class="choice formula-choice" data-formula-choice="${index}" type="button">${formula}</button>`).join("")}</div><p class="feedback">Choisissez le sens de la soustraction.</p></section>
      <section class="decision-step" id="calculation-question" hidden><p class="micro-question">3. Calculez</p><div class="readout"><span>Température réelle · ${measurements[options.point].code}<b>${format(actual)} °C</b></span><span>Saturation à lire<b>${options.side.toUpperCase()} · ${satLabel(options.side)}</b></span></div><div class="formula">${options.formula}</div><div class="form-row"><span class="field"><label for="calculation-answer">Votre résultat</label><input id="calculation-answer" inputmode="decimal" placeholder="K"></span><button class="check-button" id="calculation-check" type="button">Vérifier</button></div><label class="assist-toggle"><input id="reference-assist" type="checkbox"> Afficher la saturation exacte</label><div class="digital-help" id="reference-help"></div><p class="feedback">Lisez la saturation sur le cadran avant de soustraire.</p></section>`;

    controls.querySelectorAll("[data-point-choice]").forEach(button => button.addEventListener("click", () => {
      const correct = button.dataset.pointChoice === options.point;
      controls.querySelectorAll("[data-point-choice]").forEach(item => {
        item.disabled = true;
        if (item.dataset.pointChoice === options.point) item.classList.add("correct");
      });
      if (!correct) button.classList.add("incorrect");
      const feedback = $(controls, "#point-question .feedback");
      feedback.className = `feedback ${correct ? "good" : "bad"}`;
      feedback.textContent = `${correct ? "✓ Correct" : "✗ Correction affichée"} · ${measurements[options.point].code}, ${measurements[options.point].label.toLowerCase()}.`;
      $(controls, "#formula-question").hidden = false;
    }));

    controls.querySelectorAll("[data-formula-choice]").forEach(button => button.addEventListener("click", () => {
      const correct = button.dataset.formulaChoice === "0";
      controls.querySelectorAll("[data-formula-choice]").forEach(item => {
        item.disabled = true;
        if (item.dataset.formulaChoice === "0") item.classList.add("correct");
      });
      if (!correct) button.classList.add("incorrect");
      const feedback = $(controls, "#formula-question .feedback");
      feedback.className = `feedback ${correct ? "good" : "bad"}`;
      feedback.textContent = `${correct ? "✓ Correct" : "✗ Correction affichée"} · ${options.formula}.`;
      $(controls, "#calculation-question").hidden = false;
    }));

    $(controls, "#reference-assist").addEventListener("change", event => {
      const help = $(controls, "#reference-help");
      help.classList.toggle("visible", event.target.checked);
      help.textContent = event.target.checked ? `Saturation : ${format(reference)} °C · point ${measurements[options.point].code} : ${format(actual)} °C` : "";
    });
    $(controls, "#calculation-check").addEventListener("click", () => {
      const answer = parseFrench($(controls, "#calculation-answer").value);
      const correct = Number.isFinite(answer) && Math.abs(answer - expected) <= 1;
      const feedback = $(controls, ".feedback");
      feedback.className = `feedback ${correct ? "good" : "bad"}`;
      feedback.textContent = correct
        ? `✓ ${options.label} = ${format(expected)} K. Le sens de la soustraction est correct.`
        : `À revoir · ${options.worked} = ${format(expected)} K.`;
      api.unlock(`<strong>Calcul expliqué</strong> · résultat ${format(expected)} K`);
    });
  }

  function dualGaugeMarkup(fluid = CASE.fluid) {
    return `<div class="dual-gauge-shell"><div class="dual-gauges" tabindex="0" aria-label="Deux cadrans. Sur téléphone, faire glisser horizontalement pour voir le cadran haute pression."><article class="mini-gauge-card"><header><span class="state-label bp">BP</span><span>${satLabel("bp", fluid)}</span></header><svg class="gauge-svg" id="bp-gauge"></svg></article><article class="mini-gauge-card"><header><span class="state-label hp">HP</span><span>${satLabel("hp", fluid)}</span></header><svg class="gauge-svg" id="hp-gauge"></svg></article></div><p class="mobile-swipe-hint">Glisser pour voir le cadran HP →</p></div>`;
  }

  const quizQuestions = [
    { q: "Quelle formule donne la surchauffe à la sortie de l’évaporateur ?", answers: ["T E1 − T saturation BP", "T saturation BP − T E1", "T C1 − T saturation BP", "T saturation HP − T E1"], correct: 0, why: "La surchauffe évaporateur compare la température réelle E1 à la saturation BP de rosée." },
    { q: "Où place-t-on la sonde pour calculer la surchauffe évaporateur ?", answers: ["E1 · sortie évaporateur", "C1 · aspiration compresseur", "C2 · sortie condenseur", "D1 · entrée détendeur"], correct: 0, why: "La surchauffe évaporateur s’arrête à la sortie de l’évaporateur, au point E1." },
    { q: "Quelle formule donne la surchauffe totale ?", answers: ["T E1 − T saturation BP", "T C1 − T saturation BP", "T saturation BP − T C1", "T C2 − T saturation HP"], correct: 1, why: "La surchauffe totale utilise la température réelle à l’aspiration du compresseur, C1." },
    { q: "Quel point donne la surchauffe totale ?", answers: ["Sortie évaporateur E1", "Aspiration compresseur C1", "Sortie condenseur C2", "Entrée détendeur D1"], correct: 1, why: "La surchauffe totale inclut tout le réchauffement jusqu’à l’aspiration du compresseur." },
    { q: "Quelle formule donne le sous-refroidissement à la sortie du condenseur ?", answers: ["T C2 − T saturation HP", "T saturation HP − T C2", "T saturation BP − T C2", "T saturation HP − T D1"], correct: 1, why: "Le liquide est plus froid que sa saturation : on retire C2 à la saturation HP." },
    { q: "Le sous-refroidissement condenseur se mesure avec quelle température réelle ?", answers: ["Sortie du condenseur C2", "Entrée du compresseur C1", "Sortie de l’évaporateur E1", "Air du local"], correct: 0, why: "La mesure locale du condenseur utilise la température de liquide à sa sortie." },
    { q: "Quelle formule donne le sous-refroidissement total ?", answers: ["T D1 − T saturation HP", "T saturation HP − T C2", "T saturation HP − T D1", "T saturation BP − T D1"], correct: 2, why: "Le sous-refroidissement total suit le liquide jusqu’à l’entrée du détendeur D1." },
    { q: "Quel point donne le sous-refroidissement total ?", answers: ["E1 · sortie évaporateur", "C1 · aspiration compresseur", "C2 · sortie condenseur", "D1 · entrée détendeur"], correct: 3, why: "Le point D1 intègre les échanges de toute la ligne liquide jusqu’au détendeur." },
    { q: "Pour un fluide zéotrope, quelles saturations choisissez-vous ?", answers: ["Surchauffe : rosée BP · sous-refroidissement : bulle HP", "Bulle BP pour les deux", "Rosée HP pour les deux", "Surchauffe : bulle HP · sous-refroidissement : rosée BP"], correct: 0, why: "La vapeur surchauffée se compare à la rosée BP ; le liquide sous-refroidi à la bulle HP." },
    { q: "Tsat BP = −10 °C, E1 = −4 °C, C1 = +2 °C, Tsat HP = 40 °C, C2 = 35 °C et D1 = 32 °C. Quel bilan est correct ?", answers: ["6 K · 12 K · 5 K · 8 K", "14 K · 8 K · 75 K · 72 K", "6 K · 12 K · −5 K · −8 K", "12 K · 6 K · 8 K · 5 K"], correct: 0, why: "Dans l’ordre : surchauffe évaporateur, surchauffe totale, sous-refroidissement condenseur, sous-refroidissement total." }
  ];

  const lessons = [
    {
      short: "Référence",
      kicker: "Étape 1 · Quatre grandeurs à distinguer",
      title: "Ici, on choisit un point, une température et une formule.",
      text: "Le rapport pression–température est acquis dans le module 1. Dans ce module, la saturation lue au cadran devient une donnée : votre travail est de choisir la bonne température réelle et le bon sens de soustraction.",
      markup: circuitPanel,
      mount(scene) {
        CircuitFrigo.render($(scene, "#circuit"), { points: Object.keys(measurements) });
        $(scene, "#activity-panel").innerHTML = `<h2>Objectif du module 2</h2><div class="key-box"><strong>Surchauffe</strong><br>Température réelle de vapeur − saturation BP.</div><div class="warning-box" style="margin-top:8px"><strong>Sous-refroidissement</strong><br>Saturation HP − température réelle de liquide.</div><p>Il reste à décider jusqu’où l’on suit la vapeur ou le liquide : E1, C1, C2 ou D1.</p>`;
      }
    },
    {
      short: "Points",
      kicker: "Étape 2 · Choisir le bon emplacement",
      title: "Repérez les quatre points de mesure sur le circuit.",
      text: "Touchez successivement la sortie évaporateur, l’aspiration compresseur, la sortie condenseur puis l’entrée détendeur.",
      locked: true,
      markup: circuitPanel,
      mount(scene, api) {
        api.lock();
        const order = ["evapOutlet", "compressorInlet", "condenserOutlet", "expansionInlet"];
        let index = 0;
        const panel = $(scene, "#activity-panel");
        const update = message => {
          const target = measurements[order[index]];
          panel.innerHTML = `<h2>${target ? `Cherchez ${target.code}` : "Points acquis"}</h2><p>${target ? target.label : "Les quatre emplacements ont été sélectionnés."}</p><div class="readout"><span>Progression<b>${index} / 4</b></span><span>Famille<b>${index < 2 ? "Surchauffe" : index < 4 ? "Sous-refroidissement" : "Acquis"}</b></span></div>${message ? `<p class="feedback good">${message}</p>` : '<p class="feedback">Touchez le cercle portant le bon code.</p>'}`;
        };
        CircuitFrigo.render($(scene, "#circuit"), {
          points: order,
          onPoint(id, element) {
            if (id !== order[index]) { element.classList.add("wrong"); setTimeout(() => element.classList.remove("wrong"), 500); return; }
            element.classList.add("selected");
            index += 1;
            update(index === order.length ? "✓ Les quatre points sont correctement situés." : "Correct. Cherchez le point suivant.");
            if (index === order.length) api.unlock("<strong>Points acquis</strong> · E1, C1, C2 et D1");
          }
        });
        update();
      }
    },
    {
      short: "Surchauffe",
      kicker: "Étape 3 · Décider puis calculer",
      title: "Calculez la surchauffe évaporateur.",
      text: "Avant de calculer, choisissez l’emplacement de la sonde, la température réelle correspondante et le sens de la soustraction.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { calculationActivity(scene, api, { side: "bp", point: "evapOutlet", wrongPoint: "C1", label: "Surchauffe évaporateur", formula: "T E1 − T saturation BP", operation: "actual-minus-reference", worked: "−4 − (−10)" }); }
    },
    {
      short: "Surchauffe totale",
      kicker: "Étape 4 · Décider puis calculer",
      title: "Calculez maintenant la surchauffe totale.",
      text: "La référence BP ne change pas. À vous de déterminer jusqu’où suivre la vapeur et quelle température réelle employer.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { calculationActivity(scene, api, { side: "bp", point: "compressorInlet", wrongPoint: "E1", label: "Surchauffe totale", formula: "T C1 − T saturation BP", operation: "actual-minus-reference", worked: "+2 − (−10)" }); }
    },
    {
      short: "Sous-refroidissement",
      kicker: "Étape 5 · Décider puis calculer",
      title: "Calculez le sous-refroidissement condenseur.",
      text: "Côté liquide, le sens de la soustraction s’inverse. Choisissez le point qui limite le condenseur avant de calculer.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { calculationActivity(scene, api, { side: "hp", point: "condenserOutlet", wrongPoint: "D1", label: "Sous-refroidissement condenseur", formula: "T saturation HP − T C2", operation: "reference-minus-actual", worked: "40 − 35" }); }
    },
    {
      short: "Sous-refroidissement total",
      kicker: "Étape 6 · Décider puis calculer",
      title: "Calculez le sous-refroidissement total.",
      text: "Conservez la saturation HP. À vous de déterminer jusqu’où suivre la ligne liquide et quelle température réelle employer.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { calculationActivity(scene, api, { side: "hp", point: "expansionInlet", wrongPoint: "C2", label: "Sous-refroidissement total", formula: "T saturation HP − T D1", operation: "reference-minus-actual", worked: "40 − 32" }); }
    },
    {
      short: "Rosée / bulle",
      kicker: "Étape 7 · Mélange zéotrope",
      title: "Avec le R-407C, BP et HP n’emploient pas la même courbe.",
      text: "La vapeur surchauffée se compare à la rosée. Le liquide sous-refroidi se compare à la bulle. Choisissez la paire correcte.",
      locked: true,
      markup() { return `<div class="mission-layout"><div>${dualGaugeMarkup("R407C")}</div><aside class="mission-side panel" id="activity-panel"></aside></div>`; },
      mount(scene, api) {
        api.lock();
        draw($(scene, "#bp-gauge"), gaugeConfig("bp", "R407C", -8), true);
        draw($(scene, "#hp-gauge"), gaugeConfig("hp", "R407C", 38), true);
        const panel = $(scene, "#activity-panel");
        panel.innerHTML = `<h3>Choisissez les références</h3><div class="choice-grid"><button class="choice" data-choice="dew-bubble" type="button">Surchauffe : rosée<br>Sous-refroidissement : bulle</button><button class="choice" data-choice="bubble-dew" type="button">Surchauffe : bulle<br>Sous-refroidissement : rosée</button><button class="choice" data-choice="dew-dew" type="button">Rosée des deux côtés</button><button class="choice" data-choice="bubble-bubble" type="button">Bulle des deux côtés</button></div><p class="feedback">Les mots correspondent à l’état monophasique que l’on contrôle.</p>`;
        choiceFeedback(panel, "dew-bubble", api, "Vapeur seule après la rosée ; liquide seul après la bulle.");
      }
    },
    {
      short: "Relever",
      kicker: "Étape 8 · Mission complète, partie 1",
      title: "Relevez les quatre températures réelles sur le circuit.",
      text: "Touchez chaque point de mesure. Notez les valeurs : elles seront nécessaires à l’écran suivant avec les deux manomètres.",
      locked: true,
      markup: circuitPanel,
      mount(scene, api) {
        api.lock();
        const found = new Set();
        const panel = $(scene, "#activity-panel");
        const renderList = () => {
          panel.innerHTML = `<h2>Carnet de mesures</h2><div class="measure-list">${Object.entries(measurements).map(([id, item]) => `<div class="measure-line"><label>${item.code} · ${item.label}</label><strong>${found.has(id) ? `${format(item.value)} °C` : "—"}</strong><span>${found.has(id) ? "✓" : "○"}</span></div>`).join("")}</div><p class="feedback ${found.size === 4 ? "good" : ""}">${found.size === 4 ? "Les quatre températures sont relevées." : "Touchez un cercle de mesure sur le circuit."}</p>`;
        };
        CircuitFrigo.render($(scene, "#circuit"), {
          points: Object.keys(measurements),
          onPoint(id, element) {
            found.add(id);
            element.classList.add("selected");
            renderList();
            if (found.size === 4) api.unlock("<strong>Relevé complet</strong> · quatre températures notées");
          }
        });
        renderList();
      }
    },
    {
      short: "Calculer",
      kicker: "Étape 9 · Mission complète, partie 2",
      title: "Lisez les deux cadrans et calculez les quatre écarts.",
      text: "Les températures réelles sont déjà relevées. La calculatrice est disponible, mais vous devez choisir chaque soustraction.",
      locked: true,
      markup() { return `<div class="mission-layout"><div>${dualGaugeMarkup()}</div><aside class="mission-side"><div class="panel"><h3>Résultats en kelvins</h3><div class="measure-list" id="mission-inputs"></div><button class="check-button" id="mission-check" type="button">Vérifier les quatre calculs</button><p class="feedback" id="mission-feedback">Lisez d’abord les deux saturations sur les cadrans, puis soustrayez.</p></div><button class="calc-toggle" id="calc-toggle" type="button" aria-expanded="false">Afficher la calculatrice</button><div id="calculator-slot" hidden></div></aside></div>`; },
      mount(scene, api) {
        api.lock();
        draw($(scene, "#bp-gauge"), gaugeConfig("bp"), false);
        draw($(scene, "#hp-gauge"), gaugeConfig("hp"), false);
        const rows = [
          ["shEvap", "Surchauffe évaporateur", 6],
          ["shTotal", "Surchauffe totale", 12],
          ["scCond", "Sous-refroidissement condenseur", 5],
          ["scTotal", "Sous-refroidissement total", 8]
        ];
        $(scene, "#mission-inputs").innerHTML = rows.map(([id, label]) => `<div class="measure-line"><label for="${id}">${label}</label><input id="${id}" inputmode="decimal" aria-label="${label}"><span>K</span></div>`).join("");
        const toggle = $(scene, "#calc-toggle");
        const slot = $(scene, "#calculator-slot");
        toggle.addEventListener("click", () => {
          const open = slot.hidden;
          slot.hidden = !open;
          toggle.setAttribute("aria-expanded", String(open));
          toggle.textContent = open ? "Masquer la calculatrice" : "Afficher la calculatrice";
          if (open && !slot.firstChild) InerCalculator.mount(slot);
        });
        $(scene, "#mission-check").addEventListener("click", () => {
          const correctCount = rows.filter(([id, , expected]) => Math.abs(parseFrench($(scene, `#${id}`).value) - expected) <= 1).length;
          const feedback = $(scene, "#mission-feedback");
          const complete = correctCount === rows.length;
          feedback.className = `feedback ${complete ? "good" : "bad"}`;
          feedback.textContent = complete
            ? "✓ Les quatre calculs sont corrects : 6 K · 12 K · 5 K · 8 K."
            : `${correctCount}/4 corrects. Références : BP −10 °C ; HP +40 °C. Températures : E1 −4 °C ; C1 +2 °C ; C2 +35 °C ; D1 +32 °C.`;
          if (complete) api.unlock("<strong>Mission acquise</strong> · quatre calculs corrects");
        });
      }
    },
    {
      short: "Défi",
      kicker: "Étape 10 · Évaluation notée",
      title: "Dix questions donnent une note sur 20.",
      text: "Chaque question vaut deux points. Elles vérifient les quatre emplacements, les quatre formules, les références rosée/bulle et un calcul complet.",
      locked: true,
      markup() { return `<div class="panel" id="quiz-panel" style="height:100%"></div>`; },
      mount(scene, api) {
        api.lock();
        let index = 0;
        let score = 0;
        const panel = $(scene, "#quiz-panel");
        const renderQuestion = () => {
          if (index >= quizQuestions.length) {
            moduleScore = score * 2;
            const acquired = moduleScore >= 14;
            panel.innerHTML = `<div class="score-card ${acquired ? "success" : "retry"}"><p class="eyebrow">ÉVALUATION TERMINÉE</p><strong>${moduleScore}/20</strong><h3>${acquired ? "Méthode confirmée" : "Méthode à consolider"}</h3><p>${acquired ? "Vous savez choisir les points, les températures et le sens des quatre soustractions." : "Reprenez les écrans de calcul puis relancez l’évaluation."}</p><button class="check-button" id="quiz-restart" type="button">Recommencer</button></div>`;
            api.unlock(`<strong>Évaluation terminée</strong> · note ${moduleScore} sur 20`);
            $(panel, "#quiz-restart").addEventListener("click", () => { index = 0; score = 0; moduleScore = null; api.lock(); renderQuestion(); });
            return;
          }
          const question = quizQuestions[index];
          panel.innerHTML = `<div class="readout"><span>Question<b>${index + 1} / ${quizQuestions.length}</b></span><span>Score<b>${score}</b></span></div><h2>${question.q}</h2><div class="choice-grid">${question.answers.map((answer, answerIndex) => `<button class="choice" data-answer="${answerIndex}" type="button">${answer}</button>`).join("")}</div><p class="feedback">Choisissez une réponse.</p>`;
          panel.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
            const chosen = Number(button.dataset.answer);
            const correct = chosen === question.correct;
            if (correct) score += 1;
            panel.querySelectorAll("[data-answer]").forEach(item => {
              item.disabled = true;
              if (Number(item.dataset.answer) === question.correct) item.classList.add("correct");
            });
            if (!correct) button.classList.add("incorrect");
            const feedback = $(panel, ".feedback");
            feedback.className = `feedback ${correct ? "good" : "bad"}`;
            feedback.innerHTML = `${correct ? "✓ Correct" : "✗ À revoir"} · ${question.why} <button class="check-button" id="quiz-next" type="button">${index === quizQuestions.length - 1 ? "Voir le résultat" : "Question suivante"}</button>`;
            $(panel, "#quiz-next").addEventListener("click", () => { index += 1; renderQuestion(); });
          }));
        };
        renderQuestion();
      }
    },
    {
      short: "Bilan",
      kicker: "Bilan · Note et formules",
      title: "Gardez les quatre formules et les quatre emplacements.",
      text: "La saturation est la référence ; la température réelle dépend du point jusqu’auquel on suit la vapeur ou le liquide.",
      markup() {
        const note = moduleScore === null ? "Non évalué" : `${moduleScore}/20`;
        return `<div class="final-report"><div class="final-score ${moduleScore !== null && moduleScore >= 14 ? "success" : ""}"><p class="eyebrow">VOTRE NOTE</p><strong>${note}</strong><p>${moduleScore === null ? "Passez l’évaluation quand vous le souhaitez." : "L’évaluation peut être recommencée pour confirmer les acquis."}</p></div><div class="formula-summary"><article><b>Surchauffe évaporateur</b><span>E1 · sortie évaporateur</span><code>T E1 − T sat. BP</code></article><article><b>Surchauffe totale</b><span>C1 · aspiration compresseur</span><code>T C1 − T sat. BP</code></article><article><b>Sous-refroidissement condenseur</b><span>C2 · sortie condenseur</span><code>T sat. HP − T C2</code></article><article><b>Sous-refroidissement total</b><span>D1 · entrée détendeur</span><code>T sat. HP − T D1</code></article></div><div class="key-box"><strong>Fluide à glissement</strong><br>Sur un mélange zéotrope, la saturation BP se lit au point de rosée et la saturation HP au point de bulle. Sur un corps pur, une seule courbe suffit.</div>${document.documentElement.dataset.brique ? "" : `<a class="primary-action" href="../index.html">Revenir au portail</a>`}</div>`;
      }
    }
  ];

  /* Voir la note du module 1 : mêmes étapes, deux formes de diffusion. */
  const BRIQUES = {
    "surchauffe-sous-refroidissement": [0, 7],
    "mission-releve-et-calculs": [7, 11]
  };
  const tranche = BRIQUES[document.documentElement.dataset.brique];

  ModuleEngine.start(tranche
    ? { lessons: lessons.slice(tranche[0], tranche[1]), finishLabel: "Brique terminée" }
    : { lessons, finishLabel: "Portail", finishHref: "../index.html" });
}());
