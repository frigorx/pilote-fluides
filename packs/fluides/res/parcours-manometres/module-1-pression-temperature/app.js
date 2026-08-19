(function () {
  "use strict";

  const $ = (root, selector) => root.querySelector(selector);
  const parseFrench = value => Number(String(value).trim().replace(",", "."));
  const format = (value, digits = 1) => Number(value).toFixed(digits).replace(".", ",");
  const fineStep = config => config.major / 5;
  const analogPressure = config => Math.round(config.pressure / fineStep(config)) * fineStep(config);
  const analogTolerance = config => Math.max(fineStep(config) / 2, (config.max - config.min) * .02);
  const scenario = (side, fluid, temperature, min, max, major) => {
    const phase = side === "bp" ? "dew" : "bubble";
    return { side, fluid, phase, temperature, pressure: ThermoCore.pressureGaugeAtTemperature(fluid, temperature, phase), min, max, major };
  };

  const readingCases = [
    scenario("bp", "R134a", -10, -1, 4, .5),
    scenario("bp", "R404A", 0, -1, 7, 1),
    scenario("bp", "R32", 0, -1, 12, 1),
    scenario("hp", "R134a", 40, 3, 18, 2),
    scenario("hp", "R410A", 40, 5, 32, 2),
    scenario("hp", "R407C", 40, 3, 25, 2)
  ];

  function circuitPanel() {
    return `<div class="scene-grid"><div class="circuit-shell" id="circuit"></div><aside class="panel" id="activity-panel"></aside></div>`;
  }

  function gaugePanel() {
    return `<div class="gauge-layout"><div class="gauge-stage" id="gauge-stage"><svg class="gauge-svg" id="lesson-gauge"></svg></div><aside class="gauge-controls" id="gauge-controls"></aside></div>`;
  }

  function drawGauge(svg, config, showReadout = false) {
    svg.closest(".gauge-stage")?.classList.add(config.side);
    return GaugeRenderer.render(svg, {
      side: config.side,
      fluid: config.fluid,
      phase: config.phase,
      min: config.min,
      max: config.max,
      major: config.major,
      pressure: config.pressure,
      temperatureStep: 5,
      showNeedleReadout: showReadout
    });
  }

  function readingActivity(scene, api, config, options = {}) {
    const svg = $(scene, "#lesson-gauge");
    const controls = $(scene, "#gauge-controls");
    const sideLabel = config.side === "bp" ? "BASSE PRESSION · BP" : "HAUTE PRESSION · HP";
    const phaseLabel = ThermoCore.meta(config.fluid)?.glide ? (config.phase === "dew" ? "rosée" : "bulle") : "saturation";
    const acceptedPressure = analogPressure(config);
    const pressureTolerance = analogTolerance(config);
    drawGauge(svg, config, !!options.discovery);
    controls.innerHTML = `<span class="state-label ${config.side}">${sideLabel}</span>
      <h3>${config.fluid} · lecture du cadran</h3>
      <div class="gauge-legend"><span class="pressure"><strong>Extérieur</strong><br>pression relative</span><span class="temperature"><strong>Intérieur</strong><br>température de ${phaseLabel}</span></div>
      ${options.discovery ? `<label class="field">Déplacer l’aiguille<input id="needle-control" type="range" min="${config.min}" max="${config.max}" step="${fineStep(config)}" value="${config.pressure}"></label><div class="readout"><span>Pression<b id="discover-pressure"></b></span><span>Saturation<b id="discover-temperature"></b></span></div>` : `<div class="reading-prompt"><div class="form-row"><span class="field"><label for="answer-pressure">Pression lue</label><input id="answer-pressure" inputmode="decimal" autocomplete="off" placeholder="bar"></span><span class="field"><label for="answer-temperature">Saturation lue</label><input id="answer-temperature" inputmode="decimal" autocomplete="off" placeholder="°C"></span></div><button class="check-button" id="check-reading" type="button">Vérifier ma lecture</button><div class="key-box analog-note"><strong>Tolérance analogique</strong><br>Une réponse proche est acceptée : ± ${format(pressureTolerance, 2)} bar, soit 2 % de l’étendue du cadran.</div><label class="assist-toggle"><input id="assist" type="checkbox"> Afficher l’aide numérique</label><div class="digital-help" id="digital-help"></div><p class="feedback" id="reading-feedback">Lisez d’abord l’aiguille, puis les deux échelles. Arrondissez à la graduation visible.</p></div>`}`;

    if (options.discovery) {
      const slider = $(controls, "#needle-control");
      const update = () => {
        config.pressure = Number(slider.value);
        const result = drawGauge(svg, config, true);
        $(controls, "#discover-pressure").textContent = `${format(result.pressure, 1)} bar`;
        $(controls, "#discover-temperature").textContent = Number.isFinite(result.saturation) ? `${format(result.saturation)} °C` : "hors plage";
      };
      slider.addEventListener("input", update);
      update();
      return;
    }

    api.lock();
    const help = $(controls, "#digital-help");
    $(controls, "#assist").addEventListener("change", event => {
      help.classList.toggle("visible", event.target.checked);
      help.textContent = event.target.checked ? `Lecture attendue ≈ ${format(acceptedPressure, 1)} bar relatif · ${format(config.temperature)} °C (${phaseLabel})` : "";
    });
    $(controls, "#check-reading").addEventListener("click", () => {
      const pressure = parseFrench($(controls, "#answer-pressure").value);
      const temperature = parseFrench($(controls, "#answer-temperature").value);
      const temperatureTolerance = 2.5;
      const pressureOK = Number.isFinite(pressure) && Math.abs(pressure - acceptedPressure) <= pressureTolerance + .001;
      const temperatureOK = Number.isFinite(temperature) && Math.abs(temperature - config.temperature) <= temperatureTolerance;
      const feedback = $(controls, "#reading-feedback");
      feedback.className = `feedback ${pressureOK && temperatureOK ? "good" : "bad"}`;
      if (pressureOK && temperatureOK) {
        feedback.textContent = `✓ Lecture acquise : environ ${format(acceptedPressure, 1)} bar relatif correspond à ${format(config.temperature)} °C.`;
        api.unlock("<strong>Lecture acquise</strong> · vous pouvez continuer");
      } else {
        const parts = [];
        if (!pressureOK) parts.push(`pression attendue autour de ${format(acceptedPressure, 1)} bar`);
        if (!temperatureOK) parts.push(`saturation attendue autour de ${format(config.temperature)} °C`);
        feedback.textContent = `À revoir · ${parts.join(" ; ")}. Reprenez la graduation la plus proche de l’aiguille.`;
      }
    });
  }

  function choiceFeedback(container, correctValue, api, explanation, onAnswer) {
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
      if (typeof onAnswer === "function") onAnswer(button.dataset.choice, correct);
      api.unlock(correct ? "<strong>Réponse correcte</strong> · vous pouvez continuer" : "<strong>Correction affichée</strong> · relisez avant de continuer");
    }));
  }

  const organChoices = ["compressor", "condenser", "expansion", "evaporator"];

  function organDefinitionLesson({ short, kicker, title, text, correct, explanation }) {
    return {
      short,
      kicker,
      title,
      text,
      locked: true,
      markup: circuitPanel,
      mount(scene, api) {
        api.lock();
        const circuit = $(scene, "#circuit");
        const panel = $(scene, "#activity-panel");
        CircuitFrigo.render(circuit, { showOrganLabels: false });
        panel.innerHTML = `<p class="eyebrow">DÉFINITION À RETROUVER</p><h2>Quel est cet organe ?</h2><div class="choice-grid">${organChoices.map(id => `<button class="choice" data-choice="${id}" type="button">${CircuitFrigo.organs[id].label}</button>`).join("")}</div><p class="feedback">Choisissez un nom. Le symbole restera sans étiquette.</p>`;
        choiceFeedback(panel, correct, api, explanation, () => {
          CircuitFrigo.render(circuit, { showOrganLabels: false, selectedOrgans: [correct] });
        });
      }
    };
  }

  const lessons = [
    {
      short: "La Croix",
      kicker: "Étape 1 · Le terrain de jeu",
      title: "Toute la suite part de cette Croix du Frigoriste.",
      text: "Détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. Les cadrans viendront lire les deux niveaux de pression de ce même circuit.",
      markup: circuitPanel,
      mount(scene) {
        CircuitFrigo.render($(scene, "#circuit"));
        $(scene, "#activity-panel").innerHTML = `<h2>Quatre organes, un seul circuit</h2><p>Suivez le sens de circulation : compresseur → condenseur → détendeur → évaporateur → compresseur.</p><div class="key-box"><strong>La clé</strong><br>La pression est haute entre le compresseur et le détendeur. Elle est basse entre le détendeur et le compresseur.</div>`;
      }
    },
    {
      short: "Repérer",
      kicker: "Étape 2 · Positionner les organes",
      title: "Montrez les quatre organes dans l’ordre demandé.",
      text: "Cliquez successivement sur le détendeur, le compresseur, le condenseur puis l’évaporateur. Le symbole réellement touché doit correspondre au nom.",
      locked: true,
      markup: circuitPanel,
      mount(scene, api) {
        api.lock();
        const order = ["expansion", "compressor", "condenser", "evaporator"];
        let index = 0;
        const panel = $(scene, "#activity-panel");
        const update = message => {
          panel.innerHTML = `<h2>À trouver : ${CircuitFrigo.organs[order[index]]?.label || "Terminé"}</h2><p>${message || "Touchez le bon symbole sur le circuit."}</p><div class="readout"><span>Progression<b>${index} / ${order.length}</b></span><span>Aide visuelle<b>Noms masqués</b></span></div>`;
        };
        CircuitFrigo.render($(scene, "#circuit"), {
          showOrganLabels: false,
          onOrgan(id, element) {
            if (id !== order[index]) { panel.querySelector("p").textContent = `Ce n’est pas le ${CircuitFrigo.organs[order[index]].label.toLowerCase()}. Cherchez un autre symbole.`; return; }
            element.classList.add("selected");
            index += 1;
            update(index === order.length ? "✓ Les quatre positions sont acquises." : "Correct. Passez au suivant.");
            if (index === order.length) api.unlock("<strong>Croix acquise</strong> · quatre organes bien placés");
          }
        });
        update();
      }
    },
    organDefinitionLesson({
      short: "Compresseur",
      kicker: "Étape 3 · Rappeler la fonction",
      title: "Qui aspire la vapeur BP et la refoule en HP ?",
      text: "Cet organe met le fluide en mouvement et élève sa pression. Il ne fabrique pas le froid.",
      correct: "compressor",
      explanation: "Le compresseur aspire la vapeur basse pression et la refoule à une pression plus élevée. Il se situe à droite de la Croix."
    }),
    organDefinitionLesson({
      short: "Condenseur",
      kicker: "Étape 4 · Rappeler la fonction",
      title: "Qui rejette la chaleur et transforme la vapeur en liquide ?",
      text: "Le fluide arrive chaud et sous haute pression. Il cède de la chaleur au milieu extérieur.",
      correct: "condenser",
      explanation: "Le condenseur rejette la chaleur. Le fluide y passe progressivement de vapeur à liquide, côté HP, en haut de la Croix."
    }),
    organDefinitionLesson({
      short: "Détendeur",
      kicker: "Étape 5 · Rappeler la fonction",
      title: "Qui fait chuter la pression et dose le débit ?",
      text: "Cet organe sépare la haute pression de la basse pression avant l’évaporateur.",
      correct: "expansion",
      explanation: "Le détendeur provoque la chute de pression et règle l’alimentation de l’évaporateur. Il se situe à gauche de la Croix."
    }),
    organDefinitionLesson({
      short: "Évaporateur",
      kicker: "Étape 6 · Rappeler la fonction",
      title: "Qui capte la chaleur et vaporise le fluide ?",
      text: "Côté basse pression, le fluide reçoit la chaleur du milieu à refroidir.",
      correct: "evaporator",
      explanation: "L’évaporateur capte la chaleur. Le fluide y devient vapeur avant de retourner au compresseur, en bas de la Croix."
    }),
    {
      short: "BP / HP",
      kicker: "Étape 7 · Deux niveaux de pression",
      title: "Le détendeur et le compresseur séparent BP et HP.",
      text: "Le compresseur fait monter la pression. Le détendeur la fait chuter. Identifiez maintenant le côté où le fluide rejette sa chaleur.",
      locked: true,
      markup: circuitPanel,
      mount(scene, api) {
        api.lock();
        CircuitFrigo.render($(scene, "#circuit"));
        const panel = $(scene, "#activity-panel");
        panel.innerHTML = `<h2>Où le fluide rejette-t-il sa chaleur ?</h2><div class="choice-grid"><button class="choice" data-choice="bp" type="button">Côté BP · évaporateur</button><button class="choice" data-choice="hp" type="button">Côté HP · condenseur</button></div><p class="feedback">Choisissez un côté et nommez l’organe.</p>`;
        choiceFeedback(panel, "hp", api, "Le condenseur est côté haute pression. Le fluide y cède de la chaleur et se liquéfie.");
      }
    },
    {
      short: "Un cadran",
      kicker: "Étape 8 · Une aiguille, deux lectures",
      title: "La pression place l’aiguille ; le fluide donne la saturation.",
      text: "Déplacez l’aiguille. L’échelle extérieure indique la pression relative. L’échelle intérieure traduit cette pression en température de saturation pour le R-134a.",
      markup: gaugePanel,
      mount(scene, api) { readingActivity(scene, api, { ...scenario("bp", "R134a", -10, -1, 4, .5), pressure: 1 }, { discovery: true }); }
    },
    {
      short: "Lire BP",
      kicker: "Étape 9 · Lecture basse pression",
      title: "Lisez le manomètre BP sans affichage numérique.",
      text: "Plus d’affichage numérique : repérez la graduation atteinte par l’aiguille, puis lisez les deux échelles. Une tolérance de 2 % de l’étendue tient compte de la lecture analogique.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { readingActivity(scene, api, scenario("bp", "R134a", -10, -1, 4, .5)); }
    },
    {
      short: "Lire HP",
      kicker: "Étape 10 · Lecture haute pression",
      title: "Passez au manomètre HP.",
      text: "La méthode reste identique, mais la plage change. Côté HP, la référence d’un zéotrope sera le point de bulle pour les futurs calculs de sous-refroidissement.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { readingActivity(scene, api, scenario("hp", "R134a", 40, 3, 18, 2)); }
    },
    {
      short: "Changer fluide",
      kicker: "Étape 11 · Observer avant de conclure",
      title: "À 4 bar, que change réellement le choix du fluide ?",
      text: "Notez la température du R-134a, puis changez de fluide. Répondez à deux questions : la pression a-t-elle changé ? La saturation a-t-elle changé ?",
      markup: gaugePanel,
      mount(scene, api) {
        const svg = $(scene, "#lesson-gauge");
        const controls = $(scene, "#gauge-controls");
        const config = { side: "bp", fluid: "R134a", phase: "dew", min: -1, max: 12, major: 1, pressure: 4 };
        const answered = new Set();
        controls.innerHTML = `<span class="state-label bp">PRESSION FIXE · 4,0 bar relatif</span><h3>1. Changez le fluide</h3><label class="field"><span class="sr-only">Fluide</span><select id="fluid-choice"><option value="R134a">R-134a</option><option value="R404A">R-404A</option><option value="R32">R-32</option><option value="R407C">R-407C · rosée</option></select></label><div class="readout"><span>Pression<b>4,0 bar</b></span><span>Saturation<b id="fluid-temperature"></b></span></div><div class="observation-questions" id="observation-questions" hidden><h3>2. Observez</h3><p class="micro-question">La pression a-t-elle changé ?</p><div class="choice-grid"><button class="choice" data-observe="pressure-yes" type="button">Oui</button><button class="choice" data-observe="pressure-no" type="button">Non</button></div><p class="micro-question">La température de saturation a-t-elle changé ?</p><div class="choice-grid"><button class="choice" data-observe="temperature-yes" type="button">Oui</button><button class="choice" data-observe="temperature-no" type="button">Non</button></div><p class="feedback" id="observation-feedback">Répondez d’après ce que vous voyez.</p><div class="key-box" id="reciprocity" hidden><strong>La relation fonctionne dans les deux sens</strong><br>À pression donnée, les fluides ont des saturations différentes. À température donnée, ils ont aussi des pressions différentes : cette relation P/T aide à rechercher le fluide.</div></div>`;
        const update = () => {
          config.fluid = $(controls, "#fluid-choice").value;
          const result = drawGauge(svg, config, true);
          $(controls, "#fluid-temperature").textContent = `${format(result.saturation)} °C`;
          if (config.fluid !== "R134a") $(controls, "#observation-questions").hidden = false;
        };
        $(controls, "#fluid-choice").addEventListener("change", update);
        controls.querySelectorAll("[data-observe]").forEach(button => button.addEventListener("click", () => {
          const family = button.dataset.observe.startsWith("pressure") ? "pressure" : "temperature";
          const correctValue = family === "pressure" ? "pressure-no" : "temperature-yes";
          answered.add(family);
          controls.querySelectorAll(`[data-observe^="${family}"]`).forEach(item => {
            item.disabled = true;
            if (item.dataset.observe === correctValue) item.classList.add("correct");
          });
          const correct = button.dataset.observe === correctValue;
          if (!correct) button.classList.add("incorrect");
          const feedback = $(controls, "#observation-feedback");
          feedback.className = `feedback ${correct ? "good" : "bad"}`;
          feedback.textContent = family === "pressure"
            ? `${correct ? "✓ Correct" : "✗ À revoir"} · L’aiguille est restée à 4,0 bar.`
            : `${correct ? "✓ Correct" : "✗ À revoir"} · L’échelle de saturation s’est déplacée avec le fluide.`;
          if (answered.size === 2) {
            $(controls, "#reciprocity").hidden = false;
            api.unlock("<strong>Observation faite</strong> · pression fixe, saturation différente");
          }
        }));
        update();
      }
    },
    {
      short: "Relatif / absolu",
      kicker: "Étape 12 · Nommer la référence",
      title: "Le cadran de service affiche généralement une pression relative.",
      text: "Pour interroger le moteur P/T, la pression absolue est nécessaire. À l’altitude de référence du module, ajoutez 1,013 bar à la pression relative.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) {
        api.lock();
        const config = { side: "bp", fluid: "R134a", phase: "dew", min: -1, max: 5, major: 1, pressure: 2.2 };
        drawGauge($(scene, "#lesson-gauge"), config, false);
        const controls = $(scene, "#gauge-controls");
        controls.innerHTML = `<span class="state-label bp">PRESSION RELATIVE</span><h3>Convertir avant la table</h3><div class="formula">P absolue = P relative + P atmosphérique</div><div class="readout"><span>P relative<b>2,20 bar</b></span><span>P atmosphérique<b>1,013 bar</b></span></div><div class="form-row"><span class="field"><label for="absolute-answer">P absolue calculée</label><input id="absolute-answer" inputmode="decimal" placeholder="bar abs"></span><button class="check-button" id="absolute-check" type="button">Vérifier</button></div><p class="feedback">Arrondissez au centième.</p>`;
        $(controls, "#absolute-check").addEventListener("click", () => {
          const answer = parseFrench($(controls, "#absolute-answer").value);
          const correct = Math.abs(answer - 3.21325) <= .02;
          const feedback = $(controls, ".feedback");
          feedback.className = `feedback ${correct ? "good" : "bad"}`;
          feedback.textContent = correct ? "✓ 3,21 bar absolus. La conversion est correcte." : "À revoir · 2,20 + 1,013 = 3,213 bar absolus, soit 3,21 bar abs.";
          api.unlock("<strong>Conversion expliquée</strong> · poursuivez vers la série");
        });
      }
    },
    {
      short: "Série",
      kicker: "Étape 13 · Répéter pour confirmer",
      title: "Six cadrans, six lectures complètes.",
      text: "Pour chaque cadran, indiquez la pression relative et la température de saturation. La série mélange BP, HP et plusieurs fluides.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) {
        api.lock();
        let index = 0;
        let score = 0;
        const svg = $(scene, "#lesson-gauge");
        const controls = $(scene, "#gauge-controls");
        const renderCase = () => {
          const item = readingCases[index];
          const acceptedPressure = analogPressure(item);
          const pressureTolerance = analogTolerance(item);
          drawGauge(svg, item, false);
          controls.innerHTML = `<span class="state-label ${item.side}">${item.side === "bp" ? "BP" : "HP"} · ${item.fluid}</span><h3>Cadran ${index + 1} sur ${readingCases.length}</h3><div class="form-row"><span class="field"><label for="series-pressure">Pression</label><input id="series-pressure" inputmode="decimal" placeholder="bar"></span><span class="field"><label for="series-temperature">Saturation</label><input id="series-temperature" inputmode="decimal" placeholder="°C"></span></div><button class="check-button" id="series-check" type="button">Valider cette lecture</button><p class="analog-hint">Arrondissez à la graduation visible. Une marge de lecture analogique est acceptée.</p><p class="feedback">Score actuel : ${score} / ${index}</p>`;
          $(controls, "#series-check").addEventListener("click", () => {
            const pressure = parseFrench($(controls, "#series-pressure").value);
            const temperature = parseFrench($(controls, "#series-temperature").value);
            const correct = Number.isFinite(pressure) && Number.isFinite(temperature)
              && Math.abs(pressure - acceptedPressure) <= pressureTolerance + .001
              && Math.abs(temperature - item.temperature) <= 2.5;
            if (correct) score += 1;
            const feedback = $(controls, ".feedback");
            feedback.className = `feedback ${correct ? "good" : "bad"}`;
            feedback.textContent = `${correct ? "✓ Lecture correcte" : "✗ Correction"} · environ ${format(acceptedPressure, 1)} bar relatif · ${format(item.temperature)} °C.`;
            const button = $(controls, "#series-check");
            button.textContent = index === readingCases.length - 1 ? "Voir le résultat" : "Cadran suivant →";
            button.onclick = () => {
              index += 1;
              if (index < readingCases.length) renderCase();
              else {
                const acquired = score >= 5;
                controls.innerHTML = `<div class="score-card ${acquired ? "success" : "retry"}"><p class="eyebrow">SÉRIE TERMINÉE</p><strong>${score}/6</strong><h3>${acquired ? "Lecture confirmée" : "Encore une répétition"}</h3><p>${acquired ? "Vous avez lu correctement au moins cinq cadrans." : "Relisez la méthode et recommencez la série pour automatiser le geste."}</p><button class="check-button" id="series-restart" type="button">Recommencer la série</button></div>`;
                api.unlock(`<strong>Série terminée</strong> · score ${score} sur 6`);
                $(controls, "#series-restart").addEventListener("click", () => { index = 0; score = 0; api.lock(); renderCase(); });
              }
            };
          }, { once: true });
        };
        renderCase();
      }
    },
    {
      short: "Identifier",
      kicker: "Étape 14 · Appliquer la réciprocité",
      title: "À température donnée, chaque fluide possède sa pression d’équilibre.",
      text: "Le circuit est arrêté, stabilisé à 20 °C et contient liquide et vapeur. Cette fois, la température est fixe : comparez la pression mesurée aux trois fluides proposés.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) {
        api.lock();
        const config = scenario("hp", "R134a", 20, 0, 18, 2);
        drawGauge($(scene, "#lesson-gauge"), config, false);
        const controls = $(scene, "#gauge-controls");
        const candidates = ["R134a", "R290", "R32"];
        controls.innerHTML = `<span class="state-label hp">INSTALLATION ARRÊTÉE · 20 °C</span><h3>Quel fluide correspond au cadran ?</h3><div class="choice-grid">${candidates.map(fluid => `<button class="choice" data-choice="${fluid}" type="button">${ThermoCore.meta(fluid).label}</button>`).join("")}</div><p class="feedback">Conditions réunies : température stabilisée et coexistence liquide + vapeur.</p><div class="warning-box"><strong>Limite</strong><br>Ce résultat oriente le diagnostic. L’étiquetage, l’historique et les procédures d’identification restent nécessaires.</div>`;
        choiceFeedback(controls, "R134a", api, "À 20 °C, la pression d’équilibre lue correspond ici au R-134a parmi les trois candidats proposés.");
      }
    },
    {
      short: "Incondensables",
      kicker: "Étape 15 · Mission avancée",
      title: "Une pression stabilisée trop haute fait suspecter des incondensables.",
      text: "Le circuit au R-134a est arrêté et stabilisé à 25 °C. Le cadran indique une pression supérieure à la pression de saturation théorique. Choisissez la conclusion la plus rigoureuse.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) {
        api.lock();
        const theoretical = ThermoCore.pressureGaugeAtTemperature("R134a", 25, "bubble");
        const config = { side: "hp", fluid: "R134a", phase: "bubble", min: 0, max: 18, major: 2, pressure: theoretical + 1.2 };
        drawGauge($(scene, "#lesson-gauge"), config, false);
        const controls = $(scene, "#gauge-controls");
        controls.innerHTML = `<span class="state-label hp">R-134a · 25 °C STABILISÉS</span><h3>Comparer mesure et théorie</h3><div class="readout"><span>Pression théorique<b>${format(theoretical, 2)} bar rel.</b></span><span>Pression mesurée<b>à lire sur le cadran</b></span></div><div class="choice-grid"><button class="choice" data-choice="normal" type="button">Tout est forcément normal</button><button class="choice" data-choice="suspect" type="button">Incondensables possibles · contrôles à poursuivre</button><button class="choice" data-choice="certain" type="button">Présence certaine d’incondensables</button><button class="choice" data-choice="charge" type="button">La charge exacte est connue</button></div><p class="feedback">Une comparaison P/T fournit un indice, pas une preuve isolée.</p>`;
        choiceFeedback(controls, "suspect", api, "L’écart rend les incondensables possibles. Il faut confirmer température, stabilisation, fluide et exactitude des instruments avant de conclure.");
      }
    },
    {
      short: "Bilan",
      kicker: "Bilan · Fondation acquise",
      title: "La pression devient une température seulement si le fluide est connu.",
      text: "Vous savez situer BP et HP, lire les deux échelles, distinguer relatif et absolu et encadrer deux diagnostics P/T. Le module 2 ajoute les températures réelles du circuit.",
      markup() { return `<div class="score-card success"><p class="eyebrow">MODULE 1 TERMINÉ</p><strong>BP ↔ HP</strong><h3>Prochaine étape : comparer saturation et température réelle</h3><p>La surchauffe et le sous-refroidissement sont des différences de température, pas de nouvelles pressions.</p><a class="primary-action" href="../module-2-surchauffe-sous-refroidissement/index.html">Continuer vers le module 2 →</a></div>`; }
    }
  ];

  /* Le même contenu sert deux formes : le parcours entier, et des briques
     autonomes adressables séparément. Une brique est une tranche d'étapes,
     pas une copie : corriger ici corrige les deux formes. */
  const BRIQUES = {
    "circuit-quatre-organes": [0, 7],
    "lire-un-manometre": [7, 13],
    "diagnostic-pression-temperature": [13, 15]
  };
  const tranche = BRIQUES[document.documentElement.dataset.brique];

  ModuleEngine.start(tranche
    ? { lessons: lessons.slice(tranche[0], tranche[1]), finishLabel: "Brique terminée" }
    : { lessons, finishLabel: "Module 2 →", finishHref: "../module-2-surchauffe-sous-refroidissement/index.html" });
}());
