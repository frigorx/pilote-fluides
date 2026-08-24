(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[char]);
  const scene = (id, title, desc, body) => `<svg viewBox="0 0 760 240" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker></defs>${body}</svg>`;

  const stations = [
    {id:"monotube",title:"Monotube",hint:"suivre la boucle et comparer amont-aval"},
    {id:"bitube",title:"Bitube",hint:"construire les branches et comparer les chemins"},
    {id:"pertes",title:"Pertes de charge ↔ E",hint:"localiser une résistance à débit connu"},
    {id:"v3v",title:"Vanne trois voies",hint:"identifier les voies et le sens"},
    {id:"equilibrage",title:"Équilibrage ↔ M",hint:"mesurer, régler, stabiliser et remesurer"},
    {id:"plancher",title:"Plancher chauffant",hint:"associer zones, boucles, cibles et réglages"}
  ];

  const visuals = {
    monotube: scene("dtest-mono", "Nouveau monotube à deux dérivations", "La boucle va de gauche à droite. E1 est en amont de E2. Chaque émetteur possède une dérivation bleue et un bypass orange tireté.", `<path d="M60 75H700" stroke="#1b3a63" stroke-width="13" marker-end="url(#arr-dtest-mono)"/>${[250,520].map((x,i)=>`<g><path d="M${x-55} 75V185H${x+55}V75" fill="none" stroke="#3d7fca" stroke-width="8"/><path d="M${x-45} 75H${x+45}" stroke="#c9451a" stroke-width="6" stroke-dasharray="9 7"/><rect x="${x-48}" y="125" width="96" height="48" rx="10" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="${x}" y="155" text-anchor="middle" font-size="16" font-weight="700">E${i+1}</text></g>`).join("")}<text x="90" y="50" font-size="15" font-weight="700">AMONT</text><text x="630" y="50" font-size="15" font-weight="700">AVAL</text>`),
    bitube: scene("dtest-bitube", "Nouveau réseau bitube direct", "Deux branches en parallèle relient un départ rouge tireté en haut à un retour bleu plein en bas. La branche 1 possède le chemin géométrique le plus court dans cet exemple.", `<path d="M75 55H685" stroke="#c9451a" stroke-width="12" stroke-dasharray="11 7"/><path d="M75 195H685" stroke="#3d7fca" stroke-width="12"/>${[220,520].map((x,i)=>`<g><path d="M${x} 55V195" stroke="#1b3a63" stroke-width="8"/><rect x="${x-55}" y="95" width="110" height="60" rx="11" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="${x}" y="131" text-anchor="middle" font-size="16" font-weight="700">BRANCHE ${i+1}</text></g>`).join("")}<text x="95" y="36" font-size="15" font-weight="700">DÉPART</text><text x="95" y="225" font-size="15" font-weight="700">RETOUR DIRECT</text>`),
    v3v: scene("dtest-v3", "Vanne trois voies en mélange", "Deux flèches entrent par A à gauche et B à droite. Une flèche sort par la voie commune AB en bas.", `<path d="M70 100H305M690 100H455M380 160V225" stroke="#1b3a63" stroke-width="13" marker-end="url(#arr-dtest-v3)"/><circle cx="380" cy="110" r="70" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text x="100" y="80" font-size="18" font-weight="700">A</text><text x="640" y="80" font-size="18" font-weight="700">B</text><text x="405" y="215" font-size="18" font-weight="700">AB</text><text x="380" y="115" text-anchor="middle" font-size="16" font-weight="700">CONVERGENCE</text>`),
    losses: scene("dtest-loss", "Mesure différentielle autour d’une vanne", "Deux prises p1 et p2 encadrent une vanne. Le débit Q et l’état du réseau sont connus avant de comparer p1 moins p2.", `<path d="M70 130H690" stroke="#3d7fca" stroke-width="14" marker-end="url(#arr-dtest-loss)"/><path d="M320 80L380 130L320 180M440 80L380 130L440 180" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/><circle cx="220" cy="130" r="28" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="220" y="136" text-anchor="middle">p₁</text><circle cx="540" cy="130" r="28" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="540" y="136" text-anchor="middle">p₂</text><text x="380" y="35" text-anchor="middle" font-size="18" font-weight="700">Q connu · Δp = p₁ − p₂</text>`),
    collector: scene("dtest-floor", "Nouveau collecteur à trois boucles", "Le départ commun en haut distribue les boucles A, B et C. Les valeurs mesurées sont 1,10, 1,20 et 0,80 litre par minute. Les cibles sont 1,80, 1,20 et 0,80.", `<path d="M90 55H670" stroke="#c9451a" stroke-width="13" stroke-dasharray="11 7"/><path d="M90 200H670" stroke="#3d7fca" stroke-width="13"/>${[[220,"A","1,10 / 1,80"],[380,"B","1,20 / 1,20"],[540,"C","0,80 / 0,80"]].map(([x,l,v])=>`<g><path d="M${x} 55V200" stroke="#1b3a63" stroke-width="8"/><circle cx="${x}" cy="105" r="25" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="${x}" y="111" text-anchor="middle" font-size="15" font-weight="700">${l}</text><text x="${x}" y="162" text-anchor="middle" font-size="14">${v} L/min</text></g>`).join("")}`),
    balance: scene("dtest-balance", "Séquence d’équilibrage", "Cinq repères montrent état initial, action unique, stabilisation, nouveau relevé et conclusion, dans cet ordre.", `${["Initial","Action","Stable","Relevé","Conclusion"].map((t,i)=>`<g transform="translate(${95+i*142} 115)"><circle r="34" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text y="6" text-anchor="middle" font-size="17" font-weight="700">${i+1}</text><text y="62" text-anchor="middle" font-size="13" font-weight="700">${t}</text>${i<4?`<path d="M39 0H91" stroke="#3d7fca" stroke-width="5" marker-end="url(#arr-dtest-balance)"/>`:""}</g>`).join("")}`)
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

  const items = [
    {category:"Lecture de schéma",station:"monotube",essential:true,context:"La flèche traverse E1 avant E2.",question:"Quel émetteur reçoit l’état laissé par l’amont dans ce nouveau schéma ?",cap:"Montre où va la flèche.",tp:"Suivre la flèche et nommer l’aval.",bts:"Relier ordre hydraulique et conditions d’entrée.",scene:visuals.monotube,equivalent:"E1 est en amont et E2 en aval sur une boucle à dérivations.",options:["E2","E1","Les deux sont sans ordre","Le bypass supprime l’aval"],correct:0,explain:"E2 est rencontré après E1 et son mélange aval."},
    {category:"Lecture de schéma",station:"bitube",essential:true,context:"Deux branches relient départ et retour communs.",question:"Quel terme décrit ces deux chemins ?",cap:"Montre les deux branches sur le schéma.",tp:"Reconnaître des branches parallèles.",bts:"Délimiter chaque chemin hydraulique.",scene:visuals.bitube,equivalent:"Deux branches distinctes relient le départ commun au retour direct.",options:["Branches bitube en parallèle","Émetteurs monotube en série","Deux rejets ouverts","Une seule conduite sans retour"],correct:0,explain:"Chaque branche possède son propre passage entre départ et retour."},
    {category:"Lecture de schéma",station:"v3v",essential:true,context:"Les flèches entrent par A et B et sortent par AB.",question:"Quelle fonction est représentée ?",cap:"Montre les flèches qui entrent.",tp:"Lire les flèches.",bts:"Identifier convergence et voie commune.",scene:visuals.v3v,equivalent:"A et B convergent vers AB, voie commune supposée.",options:["Mélange","Répartition","Filtration","Purge"],correct:0,explain:"Deux entrées convergent vers une sortie commune."},
    {category:"Appliquer",station:"bitube",essential:false,context:"Départs de 5, 10 et 15 m ; retours de 25, 20 et 15 m.",question:"Que montre ce retour inversé pédagogique ?",cap:"Compare les longueurs données par la fiche.",tp:"Additionner départ et retour.",bts:"Séparer égalité de longueur et égalité de perte réelle.",scene:visuals.bitube,equivalent:"Les chemins totaux valent 30, 30 et 30 m, avant singularités et débits.",options:["Les longueurs totales sont rapprochées, pas les pertes garanties","Les débits sont forcément identiques","Les singularités disparaissent","Aucun équilibrage n’est mesurable"],correct:0,explain:"Les trois sommes valent 30 m, mais diamètres, débits et organes restent à vérifier."},
    {category:"Appliquer",station:"pertes",essential:true,context:"Une vanne est suspectée sur une branche qui manque de débit.",question:"Quelle exploitation de la station Pertes teste l’hypothèse ?",cap:"Montre les deux points de mesure.",tp:"Choisir les points de mesure.",bts:"Garder débit et état connus pour comparer Δp.",scene:visuals.losses,equivalent:"p1 et p2 encadrent la vanne à débit connu.",options:["Mesurer p₁ et p₂ autour de la vanne à débit connu","Changer la vanne sans mesure","Mesurer seulement la température extérieure","Augmenter la pompe au maximum"],correct:0,explain:"La mesure différentielle localise la résistance dans un état défini."},
    {category:"Classer / appliquer",station:"plancher",essential:true,context:"A : salon ; B : bureau ; C : salle d’eau.",question:"Quelle trace évite de régler la mauvaise zone ?",cap:"Suis le même repère sur la fiche.",tp:"Conserver le même repère.",bts:"Relier repère, longueur, cible et mesure.",scene:visuals.collector,equivalent:"Chaque boucle A B C possède une mesure et une cible en L/min.",options:["Une fiche zone ↔ boucle ↔ mesure ↔ cible","La couleur seule","Le nom de la pièce sans boucle","Un pourcentage sans unité"],correct:0,explain:"Le repère de boucle doit suivre l’observation, l’action et le compte rendu."},
    {category:"Calculer avec unité",station:"v3v",essential:false,context:"Modèle sans pertes : A apporte 0,40 m³/h à 55 °C et B 0,60 m³/h à 30 °C.",question:"Calcule la température mélangée en AB.",cap:"Lis les deux températures données.",tp:"Calculer une moyenne pondérée simple.",bts:"Vérifier débit total et hypothèses thermiques.",scene:visuals.v3v,equivalent:"Débit total 1,00 m³/h ; température AB égale 0,40 fois 55 plus 0,60 fois 30.",numeric:{value:40,tolerance:.05,units:["°C","K","m³/h"],unit:"°C"},explain:"0,40 × 55 + 0,60 × 30 = 40,0 °C dans ce modèle."},
    {category:"Mesurer avec unité",station:"plancher",essential:false,context:"Boucle A : mesure 1,10 L/min ; cible 1,80 L/min.",question:"Quel est le déficit de débit ?",cap:"Compare la mesure à la cible donnée.",tp:"Soustraire mesure à cible.",bts:"Quantifier l’écart avant de chercher la cause.",scene:visuals.collector,equivalent:"A mesure 1,10 L/min pour une cible 1,80 L/min.",numeric:{value:.7,tolerance:.01,units:["L/min","m³/h","K"],unit:"L/min"},explain:"1,80 − 1,10 = 0,70 L/min."},
    {category:"Cause → effet",station:"monotube",essential:false,context:"Dans le modèle, E1 extrait de l’énergie avant E2.",question:"Quel effet peut apparaître en aval ?",cap:"Compare les deux températures affichées.",tp:"Comparer les températures stabilisées.",bts:"Distinguer tendance du modèle et valeur réelle.",scene:visuals.monotube,equivalent:"E2 se trouve en aval de l’échange et du mélange de E1.",options:["Une température mélangée plus basse à l’entrée de E2","Une température universellement identique","La disparition du débit principal","Une preuve automatique de panne"],correct:0,explain:"L’échange amont peut abaisser la température aval dans ce modèle ; la valeur réelle doit être mesurée."},
    {category:"Cause → effet",station:"equilibrage",essential:true,context:"A est favorisée. Le modèle augmente progressivement sa résistance.",question:"Quel effet est recherché après stabilisation ?",cap:"Compare les trois débits après réglage.",tp:"Comparer les trois nouveaux débits.",bts:"Reconnaître que le point pompe-réseau réel peut aussi bouger.",scene:visuals.balance,equivalent:"L’action sur A est suivie d’une stabilisation et d’un nouveau relevé sur A B C.",options:["Réduire A et redistribuer vers B et C dans le modèle","Augmenter encore A","Garantir le même total sur toute pompe réelle","Supprimer la mesure finale"],correct:0,explain:"Le modèle redistribue le débit, mais une installation réelle doit être remesurée dans son nouvel état."},
    {category:"Décider et argumenter",station:"equilibrage",essential:false,context:"Le premier relevé est terminé et une seule vanne doit être réglée.",question:"Quelle séquence produit une comparaison recevable ?",cap:"Suis l’ordre : avant, action, après.",tp:"Respecter avant/action/après.",bts:"Conserver les conditions de mesure.",scene:visuals.balance,equivalent:"État initial, action unique, stabilisation, nouveau relevé, conclusion.",options:["Mesurer → régler → stabiliser → remesurer → conclure","Régler → conclure → mesurer","Modifier trois vannes → estimer","Augmenter la pompe → ignorer les branches"],correct:0,explain:"Deux relevés comparables encadrent une action identifiable et une stabilisation."},
    {category:"Mini-diagnostic",station:"v3v",essential:false,context:"Après commande, la température de sortie évolue à l’inverse de l’effet attendu.",question:"Quelle première décision est argumentée ?",cap:"Ne touche pas la vanne ; signale-la au formateur.",tp:"Contrôler repères, position et sens sans desserrer.",bts:"Comparer commande, voie commune, courbe de vanne et mesures.",scene:visuals.v3v,equivalent:"Le modèle suppose AB commune ; la vanne réelle doit être lue sur son corps et sa notice.",options:["Relire corps, flèches et notice puis vérifier l’effet stabilisé","Inverser deux tuyaux au hasard","Forcer l’actionneur","Déclarer la vanne défectueuse sans mesure"],correct:0,explain:"Un mauvais raccordement, une convention différente ou une commande inversée doivent être vérifiés avant un diagnostic de panne."}
  ].map((item) => item.options ? { ...item, ...melangerReponses(item.question, item.options, item.correct) } : item);

  const els = {
    lineView: $("#lineView"), assessment: $("#assessmentView"), result: $("#lineResultView"),
    objective: $("#lineObjective"), summary: $("#levelSummary"), dialog: $("#contractDialog")
  };
  let level = "TP";
  let index = 0;
  let score = 0;
  let answered = false;
  let missed = [];
  let essentialHits = {};

  const levelData = {
    CAP: {objective:"Suivre l’eau dans un réseau simple et lire une valeur.",summary:"CAP : reconnaître les schémas, lire une valeur et signaler un écart.",details:"Suivre le trajet de l’eau, nommer les organes, lire un débit ou une pression, puis comparer avec la valeur donnée."},
    TP: {objective:"Lire les architectures et contrôler la répartition des débits.",summary:"Bac pro : repérer, mesurer, régler et rendre compte.",details:"Suivre l’eau, identifier les organes, comparer un état initial et un état final sans extrapoler le modèle."},
    BTS: {objective:"Comparer les architectures, calculer et justifier les réglages avec leurs limites.",summary:"BTS : analyser chemins, résistances, bilans et hypothèses.",details:"Ajouter calculs, données manquantes, interactions pompe-réseau et justification technique."}
  };

  function show(name) {
    els.lineView.classList.toggle("hidden", name !== "line");
    els.assessment.classList.toggle("hidden", name !== "test");
    els.result.classList.toggle("hidden", name !== "result");
  }

  function renderLevel() {
    els.objective.textContent = (levelData[level] || levelData.TP).objective;
    els.summary.textContent = (levelData[level] || levelData.TP).summary;
    $("#contractDetails").innerHTML = `<h3>${level === "CAP" ? "CAP · niveau 3" : level === "TP" ? "Bac pro · niveau 4" : "BTS / titre pro CVC · niveau 5"}</h3><p><strong>Objectif :</strong> ${(levelData[level] || levelData.TP).objective}</p><p>${(levelData[level] || levelData.TP).details}</p><p><strong>Durée indicative :</strong> ${level === "CAP" ? "120 à 150 minutes" : level === "TP" ? "150 à 190 minutes" : "210 à 270 minutes"}, test inclus ; durée à mesurer avec un groupe.</p>`;
    $$('[data-level]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.level === level)));
  }

  function resetTest() {
    index = 0; score = 0; answered = false; missed = []; essentialHits = {monotube:0,bitube:0,pertes:0,v3v:0,equilibrage:0,plancher:0};
  }

  function startTest() {
    resetTest();
    show("test");
    $("#restartButton").disabled = false;
    renderItem();
  }

  function renderItem() {
    const item = items[index];
    answered = false;
    const answerMarkup = item.numeric
      ? `<div class="numeric-answer"><label>Valeur<input id="numericValue" type="text" inputmode="decimal" autocomplete="off"></label><label>Unité<select id="numericUnit">${item.numeric.units.map((unit) => `<option value="${unit}">${unit}</option>`).join("")}</select></label><button id="validateNumeric" class="primary" type="button">Valider</button></div>`
      : `<div class="answers" role="group" aria-label="Réponses">${item.options.map((option, i) => `<button type="button" data-answer="${i}">${escapeHtml(option)}</button>`).join("")}</div>`;
    els.assessment.innerHTML = `<article class="assessment-card"><div class="assessment-head"><span class="assessment-type">${escapeHtml(item.category)}</span><span class="assessment-progress">Activité ${index+1} / ${items.length}</span></div><div class="transfer-visual">${item.scene}</div><div><h2 class="assessment-question" tabindex="-1">${escapeHtml(item.question)}</h2><p class="mission">${escapeHtml(item.context)}</p><p><strong>${level === "CAP" ? "CAP" : level === "TP" ? "Bac pro" : "BTS"} :</strong> ${escapeHtml(item[level.toLowerCase()] || item.tp)}</p></div><div>${answerMarkup}<p class="assessment-feedback" aria-live="polite">Réponds, puis lis l’explication.</p></div><div class="assessment-nav"><button type="button" data-action="quit">Quitter le test</button><button type="button" class="primary" data-action="next" disabled>${index === items.length-1 ? "Voir le bilan" : "Activité suivante"}</button></div></article>`;
    $$('[data-answer]', els.assessment).forEach((button) => button.addEventListener("click", () => validateChoice(Number(button.dataset.answer))));
    $("#validateNumeric", els.assessment)?.addEventListener("click", validateNumeric);
    $('[data-action="quit"]', els.assessment).addEventListener("click", () => show("line"));
    $('[data-action="next"]', els.assessment).addEventListener("click", nextItem);
    requestAnimationFrame(() => $(".assessment-question", els.assessment).focus({preventScroll:true}));
  }

  function record(ok) {
    const item = items[index];
    if (ok) {
      score += 1;
      if (item.essential) essentialHits[item.station] += 1;
    } else missed.push(item.station);
    $(".assessment-feedback", els.assessment).textContent = `${ok ? "✓ Correct. " : "✗ À revoir. "}${item.explain}`;
    $('[data-action="next"]', els.assessment).disabled = false;
  }

  function validateChoice(choice) {
    if (answered) return;
    answered = true;
    const item = items[index];
    $$('[data-answer]', els.assessment).forEach((button, i) => {
      button.disabled = true;
      if (i === item.correct) button.classList.add("correct");
      else if (i === choice) button.classList.add("wrong");
    });
    record(choice === item.correct);
  }

  function validateNumeric() {
    if (answered) return;
    answered = true;
    const item = items[index];
    const value = Number($("#numericValue", els.assessment).value.replace(",", "."));
    const unit = $("#numericUnit", els.assessment).value;
    const ok = Number.isFinite(value) && Math.abs(value - item.numeric.value) <= item.numeric.tolerance && unit === item.numeric.unit;
    $("#numericValue", els.assessment).disabled = true;
    $("#numericUnit", els.assessment).disabled = true;
    $("#validateNumeric", els.assessment).disabled = true;
    record(ok);
  }

  function nextItem() {
    if (!answered) return;
    if (index < items.length - 1) { index += 1; renderItem(); }
    else renderResult();
  }

  function renderResult() {
    show("result");
    const essentialsOk = Object.values(essentialHits).every((value) => value > 0);
    let label, stateClass, explanation;
    if (score >= 9 && essentialsOk) { label = "ACQUIS"; stateClass = "ok"; explanation = "Au moins 70 % et chaque famille essentielle a été mobilisée."; }
    else if (score >= 6 || (score >= 9 && !essentialsOk)) { label = "FRAGILE"; stateClass = "wait"; explanation = "Entre 50 % et 69 %, ou une famille essentielle reste absente."; }
    else { label = "À RENFORCER"; stateClass = "wait"; explanation = "Moins de 50 % : reprendre les stations liées aux erreurs."; }
    const unique = [...new Set(missed)];
    const links = unique.length ? unique.map((id) => { const station = stations.find((item) => item.id === id); return `<a href="../../stations/${id}/index.html?line=D">${escapeHtml(station?.title || id)}</a>`; }).join("") : "<span>Aucune erreur : poursuivre vers une mission multi-lignes après validation humaine.</span>";
    const grade = Math.round((score / items.length) * 200) / 10;
    els.result.innerHTML = `<article class="result-card"><div class="kicker">Évaluation finale de la ligne D</div><h2 tabindex="-1">${label}</h2><p class="result-state ${stateClass}">Note : ${grade.toLocaleString("fr-FR")} / 20</p><p>Score brut : ${score} / ${items.length}.</p><p>${explanation}</p><div class="result-links">${links}</div><p>Seuil formatif : ACQUIS à partir de 9/12 sans famille essentielle absente. Cette note d’entraînement ne valide ni le titre professionnel ni le BTS.</p><div class="choice-grid"><button type="button" data-result="line">Voir la ligne</button><button type="button" class="primary" data-result="retry">Refaire les 12 activités</button></div></article>`;
    $('[data-result="line"]', els.result).addEventListener("click", () => show("line"));
    $('[data-result="retry"]', els.result).addEventListener("click", startTest);
    requestAnimationFrame(() => $("h2", els.result).focus({preventScroll:true}));
  }

  $$('[data-level]').forEach((button) => button.addEventListener("click", () => {
    level = button.dataset.level;
    renderLevel();
    if (!els.assessment.classList.contains("hidden")) renderItem();
  }));
  $("#startAssessment").addEventListener("click", startTest);
  $("#restartButton").addEventListener("click", startTest);
  $("#overviewButton").addEventListener("click", () => show("line"));
  $("#backPlan").addEventListener("click", () => { window.location.href = "../../index.html"; });
  $("#showContract").addEventListener("click", () => els.dialog.showModal ? els.dialog.showModal() : els.dialog.setAttribute("open", ""));
  $("#closeContract").addEventListener("click", () => els.dialog.close ? els.dialog.close() : els.dialog.removeAttribute("open"));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { show("line"); return; }
    if (["INPUT","SELECT","BUTTON","A"].includes(event.target.tagName)) return;
    if (event.key === "ArrowRight" && !els.assessment.classList.contains("hidden")) $('[data-action="next"]', els.assessment)?.click();
  });

  renderLevel();
  show("line");
  if (new URLSearchParams(window.location.search).get("evaluation") === "1") startTest();
})();
