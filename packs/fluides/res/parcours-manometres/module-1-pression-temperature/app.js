(function () {
  "use strict";

  const $ = (root, selector) => root.querySelector(selector);
  const parseFrench = value => Number(String(value).trim().replace(",", "."));
  const format = (value, digits = 1) => Number(value).toFixed(digits).replace(".", ",");
  const niveauSur4 = (bonnes, total) => { const r = total ? bonnes / total : 0; return r >= .9 ? { n: 4, nom: "Parfaitement maîtrisé" } : r >= .75 ? { n: 3, nom: "Acquis" } : r >= .5 ? { n: 2, nom: "En cours" } : { n: 1, nom: "Non acquis" }; };
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

  function organDefinitionLesson({ short, kicker, title, narration, text, correct, explanation }) {
    return {
      short,
      kicker,
      title,
      narration,
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
      title: "Toute la suite part de cette Croix du Frigoriste.", narration: "Voici la figure sur laquelle repose tout le module : la Croix du Frigoriste. Elle montre un seul circuit, avec quatre organes disposés en croix, et un fluide qui tourne en boucle et change d’état en chemin. Retenez surtout ceci : ce circuit contient deux niveaux de pression, l’un haut, l’autre bas, et ce sont le compresseur et le détendeur qui les séparent. Les cadrans, plus tard, serviront à lire ces deux niveaux. Pour qu’ils aient un sens, il faut d’abord savoir où se trouve chaque organe. C’est le but des étapes qui viennent.",
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
      title: "Montrez les quatre organes dans l’ordre demandé.", narration: "Cette étape vérifie que vous reconnaissez chaque organe à son symbole, car les noms sont masqués. Ce qui est contrôlé, c’est le symbole sur lequel vous touchez : il doit correspondre à l’organe demandé. Les quatre organes sont à trouver l’un après l’autre, et un compteur de progression suit l’avancement. Cette reconnaissance est la condition de tout le reste, puisque c’est la place d’un organe sur la boucle qui dit si la pression est haute ou basse autour de lui. La suite reprend ces organes, un à un, par leur rôle.",
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
      title: "Qui aspire la vapeur BP et la refoule en HP ?", narration: "Une série de quatre rappels commence ici. Pour chacun, un rôle est décrit et vous retrouvez l’organe qui le tient, sans nom écrit sur le symbole. Mieux vaut raisonner que deviner : la boucle vue au début donne l’ordre de passage du fluide, et sa pression ne change de niveau qu’à deux endroits. Ces rôles servent de base à la lecture des cadrans, puisque ceux-ci montrent justement les deux niveaux de pression du circuit. Voici la question : Qui aspire la vapeur BP et la refoule en HP ?",
      text: "Cet organe met le fluide en mouvement et élève sa pression. Il ne fabrique pas le froid.",
      correct: "compressor",
      explanation: "Le compresseur aspire la vapeur basse pression et la refoule à une pression plus élevée. Il se situe à droite de la Croix."
    }),
    organDefinitionLesson({
      short: "Condenseur",
      kicker: "Étape 4 · Rappeler la fonction",
      title: "Qui rejette la chaleur et transforme la vapeur en liquide ?", narration: "Deuxième rappel, et le vocabulaire change : on parle maintenant de chaleur et d’état du fluide. Le texte indique dans quel état le fluide arrive à cet organe : chaud, et sous haute pression. Cela aide à le situer sur la boucle, sans aucun nom. Retenez aussi que la chaleur va dans deux sens opposés dans ce circuit : le fluide en cède d’un côté, il en reçoit de l’autre. Ce partage sera mis à l’épreuve plus loin. Voici la question : Qui rejette la chaleur et transforme la vapeur en liquide ?",
      text: "Le fluide arrive chaud et sous haute pression. Il cède de la chaleur au milieu extérieur.",
      correct: "condenser",
      explanation: "Le condenseur rejette la chaleur. Le fluide y passe progressivement de vapeur à liquide, côté HP, en haut de la Croix."
    }),
    organDefinitionLesson({
      short: "Détendeur",
      kicker: "Étape 5 · Rappeler la fonction",
      title: "Qui fait chuter la pression et dose le débit ?", narration: "Troisième rappel, avec un rôle qui touche aux deux niveaux de pression à la fois. L’organe cherché marque la frontière entre la haute et la basse pression, et le texte le place avant l’évaporateur. Pour raisonner, on peut suivre le fluide dans son sens de circulation et se demander ce que devient sa pression en franchissant cette frontière. Cela aide aussi à comprendre pourquoi les deux cadrans n’indiquent pas la même chose sur un même circuit : ils lisent les deux côtés de cette frontière. Voici la question : Qui fait chuter la pression et dose le débit ?",
      text: "Cet organe sépare la haute pression de la basse pression avant l’évaporateur.",
      correct: "expansion",
      explanation: "Le détendeur provoque la chute de pression et règle l’alimentation de l’évaporateur. Il se situe à gauche de la Croix."
    }),
    organDefinitionLesson({
      short: "Évaporateur",
      kicker: "Étape 6 · Rappeler la fonction",
      title: "Qui capte la chaleur et vaporise le fluide ?", narration: "Dernier rappel de la série, côté basse pression. Le texte précise que le fluide y reçoit de la chaleur, celle du milieu que l’on cherche à refroidir. C’est la contrepartie du deuxième rappel, où le fluide cédait sa chaleur au milieu extérieur : un côté donne, l’autre prend. Une fois les quatre rôles retrouvés, vous aurez en tête le trajet complet du fluide et ses deux niveaux de pression, ce qui prépare l’arrivée des manomètres. Voici la question : Qui capte la chaleur et vaporise le fluide ?",
      text: "Côté basse pression, le fluide reçoit la chaleur du milieu à refroidir.",
      correct: "evaporator",
      explanation: "L’évaporateur capte la chaleur. Le fluide y devient vapeur avant de retourner au compresseur, en bas de la Croix."
    }),
    {
      short: "BP / HP",
      kicker: "Étape 7 · Deux niveaux de pression",
      title: "Le détendeur et le compresseur séparent BP et HP.", narration: "Le circuit n’a pas une seule pression mais deux, et ce sont le compresseur et le détendeur qui les séparent : le premier fait monter la pression, le second la fait chuter. Chaque côté ainsi délimité abrite l’un des deux organes où le fluide échange de la chaleur avec son milieu. Pour trancher, il faut donc relier deux informations : le sens de l’échange de chaleur, et le niveau de pression auquel il a lieu. Cette liaison vous servira à interpréter les cadrans. Voici la question : Où le fluide rejette-t-il sa chaleur ?",
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
      title: "La pression place l’aiguille ; le fluide donne la saturation.", narration: "Un manomètre de service est un cadran unique qui donne deux lectures. C’est la pression du circuit qui place l’aiguille. Autour d’elle, deux graduations : l’échelle extérieure donne la pression relative, et l’échelle intérieure la traduit en température de saturation. Cette traduction n’est valable que pour un fluide précis, ici le R-134a, car c’est le fluide qui relie une pression à une température. Quand vous déplacerez l’aiguille, vous verrez la température suivre la pression. Ensuite, vous ferez cette lecture vous-même, sans les chiffres affichés.",
      text: "Déplacez l’aiguille. L’échelle extérieure indique la pression relative. L’échelle intérieure traduit cette pression en température de saturation pour le R-134a.",
      markup: gaugePanel,
      mount(scene, api) { readingActivity(scene, api, { ...scenario("bp", "R134a", -10, -1, 4, .5), pressure: 1 }, { discovery: true }); }
    },
    {
      short: "Lire BP",
      kicker: "Étape 9 · Lecture basse pression",
      title: "Lisez le manomètre BP sans affichage numérique.", narration: "Cette fois, aucun chiffre n’est affiché : vous lisez l’aiguille elle-même, sur le cadran basse pression. L’ordre de lecture compte. On relève d’abord la pression sur l’échelle extérieure, puis la température de saturation sur l’échelle intérieure, parce que la seconde découle de la première pour le fluide du cadran. Comme la lecture est analogique, une réponse proche est acceptée : la marge est de deux pour cent de l’étendue du cadran. Ce geste, aiguille d’abord et échelles ensuite, reviendra dans la série de six cadrans.",
      text: "Plus d’affichage numérique : repérez la graduation atteinte par l’aiguille, puis lisez les deux échelles. Une tolérance de 2 % de l’étendue tient compte de la lecture analogique.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { readingActivity(scene, api, scenario("bp", "R134a", -10, -1, 4, .5)); }
    },
    {
      short: "Lire HP",
      kicker: "Étape 10 · Lecture haute pression",
      title: "Passez au manomètre HP.", narration: "Le manomètre haute pression se lit comme le précédent : l’aiguille d’abord, puis les deux échelles. Seule la plage change, puisque ce cadran couvre des pressions plus élevées. La tolérance reste de deux pour cent de l’étendue, ce qui donne une marge plus large en bar que sur le cadran basse pression. Gardez aussi une information en réserve : pour un zéotrope, ce sera le point de bulle qui servira de référence côté haute pression, quand viendront les calculs de sous-refroidissement. Rien à calculer pour l’instant, il s’agit de bien lire.",
      text: "La méthode reste identique, mais la plage change. Côté HP, la référence d’un zéotrope sera le point de bulle pour les futurs calculs de sous-refroidissement.",
      locked: true,
      markup: gaugePanel,
      mount(scene, api) { readingActivity(scene, api, scenario("hp", "R134a", 40, 3, 18, 2)); }
    },
    {
      short: "Changer fluide",
      kicker: "Étape 11 · Observer avant de conclure",
      title: "À 4 bar, que change réellement le choix du fluide ?", narration: "Cet exercice est une petite expérience où un seul paramètre change. La pression de départ est de quatre bar relatifs, et ce que vous modifiez, c’est le fluide. Avant tout changement, gardez en mémoire la température obtenue avec le R-134a : elle sert de point de comparaison. Ensuite, pour chaque nouveau fluide, on pose les mêmes deux questions, l’une sur la pression, l’autre sur la saturation. Cette discipline évite de conclure sur une impression plutôt que sur une observation. Voici la question : À 4 bar, que change réellement le choix du fluide ?",
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
      title: "Le cadran de service affiche généralement une pression relative.", narration: "Le cadran de service affiche généralement une pression relative, c’est-à-dire sans compter celle de l’atmosphère. Or le moteur de calcul qui relie pression et température demande la pression absolue. Il faut donc convertir avant d’aller chercher la moindre température : on ajoute à la pression relative lue sur le cadran la pression atmosphérique, à l’altitude de référence du module. C’est une simple addition, mais l’oublier fausse la température de saturation qu’on en déduit. Ici, les deux pressions sont déjà données, et le résultat s’arrondit au centième.",
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
      title: "Six cadrans, six lectures complètes.", narration: "Une lecture réussie ne fait pas encore un réflexe. Cette série de six cadrans sert à le fabriquer, en variant les situations : basse pression, haute pression, plusieurs fluides. Pour chaque cadran, la première chose à regarder est donc l’indication de côté et de fluide, puisque la même position d’aiguille ne donne pas la même température d’un fluide à l’autre. Une marge d’erreur de lecture est acceptée, car la lecture est analogique. Chaque lecture se fait avec la même méthode, et un niveau de 1 à 4 vous est donné à la fin.",
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
          controls.innerHTML = `<span class="state-label ${item.side}">${item.side === "bp" ? "BP" : "HP"} · ${item.fluid}</span><h3>Cadran ${index + 1} sur ${readingCases.length}</h3><div class="form-row"><span class="field"><label for="series-pressure">Pression</label><input id="series-pressure" inputmode="decimal" placeholder="bar"></span><span class="field"><label for="series-temperature">Saturation</label><input id="series-temperature" inputmode="decimal" placeholder="°C"></span></div><button class="check-button" id="series-check" type="button">Valider cette lecture</button><p class="analog-hint">Arrondissez à la graduation visible. Une marge de lecture analogique est acceptée.</p><p class="feedback">Lisez le cadran, puis validez votre lecture.</p>`;
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
                const acquired = score >= 5, niveau = niveauSur4(score, readingCases.length);
                controls.innerHTML = `<div class="score-card ${acquired ? "success" : "retry"}"><p class="eyebrow">SÉRIE TERMINÉE</p><strong>Niveau ${niveau.n} · ${niveau.nom}</strong><h3>${acquired ? "Lecture confirmée" : "Encore une répétition"}</h3><p>${acquired ? "Vous lisez correctement les cadrans." : "Relisez la méthode et recommencez la série pour automatiser le geste."}</p><button class="check-button" id="series-restart" type="button">Recommencer la série</button></div>`;
                api.unlock(`<strong>Série terminée</strong> · niveau ${niveau.n} · ${niveau.nom}`);
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
      title: "À température donnée, chaque fluide possède sa pression d’équilibre.", narration: "Jusqu’ici, la pression vous donnait la température. Ici, on renverse le raisonnement : la température est connue, vingt degrés, et c’est la pression qui doit vous renseigner. À une température donnée, chaque fluide a sa propre pression d’équilibre, donc la pression mesurée peut désigner un fluide plutôt qu’un autre. Cela suppose deux conditions : le circuit est arrêté et stabilisé, et le liquide et la vapeur sont présents ensemble. Même alors, le résultat oriente seulement le diagnostic, car l’étiquetage et l’historique restent nécessaires. Voici la question : Quel fluide correspond au cadran ?",
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
      title: "Une pression stabilisée trop haute fait suspecter des incondensables.", narration: "Voici le dernier exercice de diagnostic du module. Le circuit au R-134a est à l’arrêt, stabilisé à vingt-cinq degrés, et le cadran affiche une pression supérieure à la valeur théorique pour cette température. Une telle situation fait suspecter des incondensables. Ce qui est travaillé ici, c’est la façon de formuler ce que l’on sait, ni plus, ni moins. Quatre conclusions sont proposées, et il s’agit de peser chacune au regard de ce que la comparaison entre mesure et théorie permet réellement d’établir.",
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
      title: "La pression devient une température seulement si le fluide est connu.", narration: "Le premier module se résume en une idée : une pression ne devient une température que si le fluide est connu. Vous savez désormais situer la haute et la basse pression sur le circuit, lire les deux échelles d’un cadran, passer de la pression relative à la pression absolue, et mener deux diagnostics à partir de la pression et de la température. La suite ajoute un élément nouveau, les températures réelles du circuit. Surchauffe et sous-refroidissement s’y calculent comme des écarts de température, pas comme de nouvelles pressions.",
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
