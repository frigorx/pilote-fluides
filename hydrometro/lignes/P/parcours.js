"use strict";

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const stationLabels = { boucle: "Boucle", energie: "Énergie", debit: "Débit", "delta-t": "Écart ΔT", puissance: "Puissance", mesurer: "Mesurer" };
  const stationHrefs = { boucle: "../../stations/boucle/index.html?line=P", energie: "../../stations/energie/index.html?line=P", debit: "../../stations/debit/index.html?line=P", "delta-t": "../../stations/delta-t/index.html?line=P", puissance: "../../stations/puissance/index.html?line=P", mesurer: "../../stations/mesurer/index.html?line=P" };
  const levelData = {
    CAP: { objective: "Suivre une boucle simple et lire les valeurs affichées.", summary: "CAP : reconnaître les organes, lire une valeur et signaler une anomalie.", details: "Suivre le trajet de l’eau, nommer les organes, lire un débit et une température, puis comparer avec la fiche donnée." },
    TP: { objective: "Lire, mesurer et expliquer les grandeurs d’une boucle.", summary: "Bac pro : repérer, relever, calculer un cas simple et rendre compte.", details: "Reconstruire une boucle, relier eau et énergie, lire un débit, mesurer ΔT, estimer la puissance et produire un relevé traçable." },
    BTS: { objective: "Analyser, calculer et justifier une performance hydraulique.", summary: "BTS : analyser les relations, calculer, comparer et justifier les limites.", details: "Délimiter le système, interpréter pompe-réseau, définir le protocole, calculer la puissance et argumenter la stratégie de mesure." }
  };

  const visuals = {
    energy: `<svg viewBox="0 0 720 180" role="img" aria-labelledby="vEnergyTitle vEnergyDesc"><title id="vEnergyTitle">Transfert d’énergie d’une production vers un local</title><desc id="vEnergyDesc">Une production, une conduite d’eau, un émetteur et un local sont reliés. Le trait bleu plein suit l’eau. Le trait orange tireté traverse la chaîne énergétique.</desc><defs><marker id="veb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#3d7fca"/></marker><marker id="veo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker></defs><rect x="20" y="42" width="130" height="90" rx="15" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/><text x="85" y="92" text-anchor="middle" class="svg-label">Production</text><path d="M150 105H470" fill="none" stroke="#3d7fca" stroke-width="12" marker-end="url(#veb)"/><rect x="465" y="42" width="115" height="90" rx="15" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="522" y="92" text-anchor="middle" class="svg-label">Émetteur</text><rect x="615" y="42" width="85" height="90" rx="15" fill="#f7f1e7" stroke="#1b3a63" stroke-width="3"/><text x="657" y="92" text-anchor="middle" class="svg-label">Local</text><path d="M85 25H655" fill="none" stroke="#c9451a" stroke-width="6" stroke-dasharray="7 8" marker-end="url(#veo)"/><text x="310" y="163" text-anchor="middle" class="svg-small">bleu plein : eau · orange tireté : transfert d’énergie</text></svg>`,
    loop: `<svg viewBox="0 0 720 190" role="img" aria-labelledby="vLoopTitle vLoopDesc"><title id="vLoopTitle">Boucle hydraulique recomposée avec quatre tronçons repérés</title><desc id="vLoopDesc">La production est à gauche, l’émetteur à droite. L’eau va sur le tronçon A en haut, traverse B près de l’émetteur, revient sur C en bas et remonte par D.</desc><defs><marker id="vlb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#3d7fca"/></marker></defs><path d="M125 45H585Q650 45 650 95T585 145H125Q65 145 65 95T125 45" fill="none" stroke="#1b3a63" stroke-width="13"/><path d="M195 45H440" fill="none" stroke="#3d7fca" stroke-width="5" stroke-dasharray="12 9" marker-end="url(#vlb)"/><rect x="35" y="62" width="100" height="66" rx="14" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/><text x="85" y="101" text-anchor="middle" class="svg-label">Production</text><rect x="575" y="62" width="110" height="66" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="630" y="101" text-anchor="middle" class="svg-label">Émetteur</text><text x="360" y="35" text-anchor="middle" class="svg-label">A</text><text x="695" y="101" text-anchor="middle" class="svg-label">B</text><text x="360" y="177" text-anchor="middle" class="svg-label">C</text><text x="25" y="101" text-anchor="middle" class="svg-label">D</text></svg>`,
    probes: `<svg viewBox="0 0 720 190" role="img" aria-labelledby="vProbeTitle vProbeDesc"><title id="vProbeTitle">Quatre points autour d’un émetteur</title><desc id="vProbeDesc">Un émetteur est à droite. A est sur son départ immédiat, B sur son retour immédiat. C et D sont plus loin, de l’autre côté de la boucle.</desc><path d="M90 50H610Q665 50 665 95T610 140H90Q40 140 40 95T90 50" fill="none" stroke="#1b3a63" stroke-width="13"/><rect x="570" y="65" width="120" height="60" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="630" y="101" text-anchor="middle" class="svg-label">Émetteur</text><g font-family="Calibri" font-weight="700" text-anchor="middle"><g><circle cx="520" cy="50" r="16" fill="#fffdf8" stroke="#c9451a" stroke-width="5"/><text x="520" y="56">A</text></g><g><circle cx="520" cy="140" r="16" fill="#fffdf8" stroke="#3d7fca" stroke-width="5"/><text x="520" y="146">B</text></g><g><circle cx="210" cy="50" r="16" fill="#fffdf8" stroke="#b06a00" stroke-width="4"/><text x="210" y="56">C</text></g><g><circle cx="210" cy="140" r="16" fill="#fffdf8" stroke="#b06a00" stroke-width="4"/><text x="210" y="146">D</text></g></g></svg>`
  };

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

  const activities = [
    { type: "Lecture SVG", prompt: "Dans ce schéma, que représente le trait orange tireté ?", options: ["Le transfert d’énergie vers le local", "Le retour d’eau uniquement", "Une liaison électrique"], correct: 0, explanation: "Le mot et le style tireté distinguent l’énergie de l’eau représentée en trait bleu plein.", visual: "energy", families: ["schema"], stations: ["energie"] },
    { type: "Calcul avec unité", prompt: "Calcule P ≈ 1,16 × Q × ΔT pour Q = 1,5 m³/h et ΔT = 10 K.", numeric: { value: 17.4, tolerance: .05, units: ["kW", "W", "m³/h"], unit: "kW" }, explanation: "1,16 × 1,5 × 10 = 17,4 kW.", families: ["units", "power"], stations: ["puissance"] },
    { type: "Application", prompt: "Quel relevé peut être compris et contrôlé par un autre technicien ?", options: ["Q conduite principale = 2,1 m³/h, régime stabilisé", "Débit = 2,1", "Mesure bonne, mardi"], correct: 0, explanation: "Grandeur, point, valeur, unité et contexte sont nécessaires.", families: ["measure"], stations: ["mesurer"] },
    { type: "Lecture SVG", prompt: "Après l’émetteur, quel tronçon porte le retour vers la production ?", options: ["C", "A", "B seulement"], correct: 0, explanation: "Le tronçon C ramène l’eau par le bas vers la production ; la boucle reste fermée.", visual: "loop", families: ["schema"], stations: ["boucle"] },
    { type: "Cause → effet", prompt: "Les températures changent encore à chaque minute. Que fais-tu avant d’interpréter ΔT ?", options: ["J’attends la stabilisation et je relève à nouveau", "Je conclus immédiatement à un manque de débit", "Je supprime l’unité"], correct: 0, explanation: "Le transitoire modifie les valeurs. Plusieurs relevés comparables montrent si l’état se stabilise.", families: ["dt", "measure"], stations: ["delta-t", "mesurer"] },
    { type: "Application d’unité", prompt: "1,8 m³/h valent combien de litres par minute ?", options: ["30 L/min", "1,8 L/min", "108 L/min"], correct: 0, explanation: "1,8 m³/h = 1 800 L/h ; 1 800 ÷ 60 = 30 L/min.", families: ["units"], stations: ["debit"] },
    { type: "Lecture SVG", prompt: "Quels points encadrent immédiatement le même émetteur pour mesurer son ΔT ?", options: ["A et B", "C et D", "A et C"], correct: 0, explanation: "A est au départ immédiat et B au retour immédiat du même émetteur.", visual: "probes", families: ["schema", "dt"], stations: ["delta-t"] },
    { type: "Décision argumentée", prompt: "Tu mesures un ΔT élevé. Quelle vérification est la plus solide avant un diagnostic ?", options: ["Contrôler débit, charge, points et organes", "Remplacer immédiatement la pompe", "Augmenter la température sans relever"], correct: 0, explanation: "Un ΔT isolé n’identifie pas une cause unique. Il faut croiser des preuves.", families: ["dt", "measure"], stations: ["delta-t", "debit", "mesurer"] },
    { type: "Application", prompt: "À commande pompe inchangée, la résistance du réseau augmente. Quel effet est attendu ?", options: ["Le point se déplace vers un débit plus faible", "Le débit augmente forcément", "La puissance devient une unité de temps"], correct: 0, explanation: "La courbe réseau monte ; son nouveau croisement avec la pompe se situe généralement à débit plus faible.", families: ["debit"], stations: ["debit"] },
    { type: "Calcul avec unité", prompt: "Le départ vaut 62 °C et le retour 52 °C. Calcule ΔT.", numeric: { value: 10, tolerance: .01, units: ["K", "kW", "m³/h"], unit: "K" }, explanation: "ΔT = 62 − 52 = 10 K. L’écart numérique vaut aussi 10 °C.", families: ["units", "dt"], stations: ["delta-t"] },
    { type: "Cause → effet", prompt: "La puissance doit rester identique mais ΔT diminue. Que doit faire Q ?", options: ["Q doit augmenter", "Q doit diminuer", "Q ne peut avoir aucune unité"], correct: 0, explanation: "Dans P ≈ 1,16 × Q × ΔT, une baisse de ΔT se compense par une hausse de Q.", families: ["power", "debit"], stations: ["puissance", "debit"] },
    { type: "Mini-diagnostic", prompt: "Quel plan de mesure justifie le mieux la puissance transportée ?", options: ["Débit sur la conduite + températures départ/retour + contexte stabilisé", "Température du local seule", "Pression sans point ni unité"], correct: 0, explanation: "La puissance exige Q et ΔT, relevés à des points définis dans un état interprétable.", families: ["measure", "power"], stations: ["mesurer", "puissance"] }
  ].map((activity) => activity.options ? { ...activity, ...melangerReponses(activity.prompt, activity.options, activity.correct) } : activity);

  let level = "TP";
  let index = 0;
  let score = 0;
  let locked = false;
  const wrongStations = new Set();
  const familySuccess = { schema: 0, units: 0, dt: 0, power: 0, measure: 0, debit: 0 };
  const lineView = $("#lineView");
  const assessmentView = $("#assessmentView");
  const resultView = $("#lineResultView");
  const contractDialog = $("#contractDialog");

  function renderLevel() {
    $("#lineObjective").textContent = (levelData[level] || levelData.TP).objective;
    $("#levelSummary").textContent = (levelData[level] || levelData.TP).summary;
    $("#contractDetails").innerHTML = `<h3>${level === "CAP" ? "CAP · niveau 3" : level === "TP" ? "Bac pro · niveau 4" : "BTS / titre pro CVC · niveau 5"}</h3><p><strong>Objectif :</strong> ${(levelData[level] || levelData.TP).objective}</p><p>${(levelData[level] || levelData.TP).details}</p><p><strong>Durée indicative :</strong> ${level === "CAP" ? "60 à 90 minutes" : level === "TP" ? "90 à 120 minutes" : "120 à 150 minutes"}, entraînement inclus.</p>`;
    $$("[data-level]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.level === level)));
  }

  $$("[data-level]").forEach((button) => button.addEventListener("click", () => { level = button.dataset.level; renderLevel(); }));
  $("#showContract").addEventListener("click", () => contractDialog.showModal ? contractDialog.showModal() : contractDialog.setAttribute("open", ""));
  $("#closeContract").addEventListener("click", () => contractDialog.close ? contractDialog.close() : contractDialog.removeAttribute("open"));
  $("#backPlan").addEventListener("click", () => { window.location.href = "../../index.html"; });
  $("#overviewButton").addEventListener("click", showOverview);
  $("#startAssessment").addEventListener("click", startAssessment);
  $("#restartButton").addEventListener("click", startAssessment);

  function showOverview() {
    assessmentView.classList.add("hidden");
    resultView.classList.add("hidden");
    lineView.classList.remove("hidden");
  }

  function resetAssessment() {
    index = 0;
    score = 0;
    locked = false;
    wrongStations.clear();
    Object.keys(familySuccess).forEach((family) => { familySuccess[family] = 0; });
  }

  function startAssessment() {
    resetAssessment();
    lineView.classList.add("hidden");
    resultView.classList.add("hidden");
    assessmentView.classList.remove("hidden");
    $("#restartButton").disabled = false;
    renderActivity();
  }

  function renderActivity() {
    const activity = activities[index];
    locked = false;
    const answerHtml = activity.numeric
      ? `<div class="numeric-answer"><label>Valeur<input id="numericValue" type="text" inputmode="decimal" autocomplete="off" aria-label="Valeur numérique"></label><label>Unité<select id="numericUnit">${activity.numeric.units.map((unit) => `<option value="${unit}">${unit}</option>`).join("")}</select></label><button id="validateNumeric" class="primary" type="button">Valider</button></div>`
      : `<div class="answers" role="group" aria-label="Réponses">${activity.options.map((option, optionIndex) => `<button type="button" data-answer="${optionIndex}">${option}</button>`).join("")}</div>`;
    assessmentView.innerHTML = `<article class="assessment-card"><div class="assessment-head"><span class="assessment-type">${activity.type}</span><span class="assessment-progress">Activité ${index + 1} / ${activities.length}</span></div><div class="transfer-visual">${activity.visual ? visuals[activity.visual] : ""}</div><div class="assessment-question">${activity.prompt}</div><div>${answerHtml}<p class="assessment-feedback" aria-live="polite">Réponds, puis lis l’explication.</p></div><div class="assessment-nav"><button type="button" data-action="overview">Quitter le test</button><button type="button" class="primary" data-action="next" disabled>${index === activities.length - 1 ? "Voir le résultat" : "Activité suivante"}</button></div></article>`;
    $$("[data-answer]", assessmentView).forEach((button) => button.addEventListener("click", () => validateChoice(Number(button.dataset.answer))));
    const numericButton = $("#validateNumeric", assessmentView);
    if (numericButton) numericButton.addEventListener("click", validateNumeric);
    $("[data-action='overview']", assessmentView).addEventListener("click", showOverview);
    $("[data-action='next']", assessmentView).addEventListener("click", nextActivity);
  }

  function recordResult(ok) {
    const activity = activities[index];
    if (ok) {
      score += 1;
      activity.families.forEach((family) => { familySuccess[family] = (familySuccess[family] || 0) + 1; });
    } else activity.stations.forEach((station) => wrongStations.add(station));
    $(".assessment-feedback", assessmentView).textContent = `${ok ? "Correct. " : "À revoir. "}${activity.explanation}`;
    $("[data-action='next']", assessmentView).disabled = false;
  }

  function validateChoice(choice) {
    if (locked) return;
    locked = true;
    const activity = activities[index];
    $$("[data-answer]", assessmentView).forEach((button, optionIndex) => {
      button.disabled = true;
      if (optionIndex === activity.correct) button.classList.add("correct");
      else if (optionIndex === choice) button.classList.add("wrong");
    });
    recordResult(choice === activity.correct);
  }

  function validateNumeric() {
    if (locked) return;
    locked = true;
    const activity = activities[index];
    const value = Number($("#numericValue", assessmentView).value.replace(",", "."));
    const unit = $("#numericUnit", assessmentView).value;
    const ok = Number.isFinite(value) && Math.abs(value - activity.numeric.value) <= activity.numeric.tolerance && unit === activity.numeric.unit;
    $("#numericValue", assessmentView).disabled = true;
    $("#numericUnit", assessmentView).disabled = true;
    $("#validateNumeric", assessmentView).disabled = true;
    recordResult(ok);
  }

  function nextActivity() {
    if (!locked) return;
    if (index < activities.length - 1) {
      index += 1;
      renderActivity();
    } else renderResult();
  }

  function renderResult() {
    assessmentView.classList.add("hidden");
    resultView.classList.remove("hidden");
    const essential = ["schema", "units", "dt", "power", "measure"];
    const missingEssential = essential.filter((family) => !familySuccess[family]);
    let label;
    let stateClass;
    if (score >= 9 && missingEssential.length === 0) { label = "acquis"; stateClass = "ok"; }
    else if (score >= 6 || (score >= 9 && missingEssential.length)) { label = "fragile"; stateClass = "wait"; }
    else { label = "à renforcer"; stateClass = "wait"; }
    const stations = [...wrongStations];
    const links = stations.length
      ? stations.map((station) => `<a href="${stationHrefs[station]}">${stationLabels[station]}</a>`).join("")
      : "<span>Aucune remédiation imposée.</span>";
    const missingText = missingEssential.length ? `Familles essentielles à remobiliser : ${missingEssential.join(", ")}.` : "Toutes les familles essentielles ont été mobilisées au moins une fois.";
    const grade = Math.round((score / activities.length) * 200) / 10;
    resultView.innerHTML = `<article class="result-card"><div class="kicker">Évaluation finale de la ligne P</div><h2>Résultat : <span class="line-result">${label}</span></h2><p class="result-state ${stateClass}">Note : ${grade.toLocaleString("fr-FR")} / 20</p><p>Score brut : ${score} / ${activities.length}.</p><p>${missingText}</p><p>${stations.length ? "Stations conseillées :" : "Suite conseillée :"}</p><div class="result-links">${links}</div><p>Seuil formatif : acquis à partir de 9/12 sans famille essentielle absente. Cette note d’entraînement n’est pas certificative.</p><div class="choice-grid"><button type="button" data-result="overview">Voir la ligne</button><button type="button" class="primary" data-result="retry">Refaire les 12 activités</button></div></article>`;
    $("[data-result='overview']", resultView).addEventListener("click", showOverview);
    $("[data-result='retry']", resultView).addEventListener("click", startAssessment);
  }

  renderLevel();
  if (new URLSearchParams(window.location.search).get("evaluation") === "1") startAssessment();
})();
