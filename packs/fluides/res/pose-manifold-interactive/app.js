(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const phases = [
    { id: "prepare", label: "Préparer" },
    { id: "service", label: "Vannes de service" },
    { id: "connect", label: "Raccorder" },
    { id: "vacuum", label: "Vide des lignes" },
    { id: "measure", label: "Mettre en lecture" },
    { id: "remove", label: "Déposer" }
  ];

  const A = (phase, control, expect, title, look, doText, check, why, delay = 650) => ({
    phase, control, expect, title, look, doText, check, why, delay
  });

  const actions = [
    A("prepare", "check-post", true, "Contrôler le poste", "La zone de travail, les EPI et l’état général du matériel.", "Cliquez sur CONTRÔLE DU POSTE après votre inspection.", "Zone dégagée, EPI portés, matériel identifiable et sans défaut visible.", "Le geste commence avant le premier raccordement."),
    A("prepare", "zero-bp", true, "Contrôler le zéro BP", "L’aiguille bleue lorsque le manifold est à l’air libre.", "Cliquez sur la petite vis de zéro du cadran BP.", "L’aiguille BP rejoint son repère zéro.", "Une erreur de zéro fausse toute la lecture."),
    A("prepare", "zero-hp", true, "Contrôler le zéro HP", "L’aiguille rouge lorsque le manifold est à l’air libre.", "Cliquez sur la petite vis de zéro du cadran HP.", "L’aiguille HP rejoint son repère zéro.", "Les deux cadrans se contrôlent séparément."),
    A("prepare", "inspect-blue", true, "Inspecter le flexible bleu", "Le flexible, ses deux raccords, son joint et sa mini-vanne.", "Cliquez sur INSPECTER BLEU après avoir suivi toute sa longueur.", "Pas de coupure, d’écrasement, de joint absent ni de raccord détérioré.", "Un flexible abîmé crée un risque de fuite."),
    A("prepare", "inspect-red", true, "Inspecter le flexible rouge", "Le flexible, ses deux raccords, son joint et sa mini-vanne.", "Cliquez sur INSPECTER ROUGE après votre contrôle.", "Flexible HP conforme et mini-vanne fermée.", "La HP exige le même contrôle attentif."),
    A("prepare", "inspect-black", true, "Inspecter le flexible de vide", "Le flexible noir, ses raccords, son joint et sa mini-vanne.", "Cliquez sur INSPECTER VIDE après votre contrôle.", "Flexible de vide propre, étanche et non écrasé.", "Une fuite sur cette ligne empêche d’obtenir et de tenir le vide."),

    A("service", "bp-stem-cap", "removed", "Retirer le bouchon du carré BP", "Le gros bouchon gris à l’extrémité de la tige. Il porte le mot BOUCHON.", "Cliquez au centre du bouchon gris. Le carré orange placé dessous n’est pas encore accessible.", "Le bouchon disparaît et le carré orange apparaît.", "Le bouchon protège le carré et participe à l’étanchéité finale."),
    A("service", "bp-gland", "loose", "Libérer le presse-étoupe BP", "L’écrou jaune autour de la tige BP.", "Desserrez-le légèrement ; la fiche du plateau indique un quart de tour.", "Le carré peut être manœuvré sans forcer sur le presse-étoupe.", "Le presse-étoupe se resserre après chaque positionnement."),
    A("service", "bp-stem", "rear", "Confirmer le siège arrière BP", "Le carré BP et le zoom de la vanne de service.", "Cliquez sur le carré pour confirmer la butée arrière.", "La prise P est isolée de l’installation.", "Les flexibles pourront être tirés au vide sans aspirer le fluide du circuit."),
    A("service", "bp-gland", "tight", "Resserrer le presse-étoupe BP", "L’écrou jaune BP, resté desserré.", "Cliquez dessus pour le resserrer.", "Le presse-étoupe BP est serré.", "La tige ne doit pas rester libre après la manœuvre."),
    A("service", "bp-port-cap", "removed", "Ouvrir l’accès à la prise BP", "Le bouchon situé sur la prise P, près du carré.", "Retirez le bouchon de la prise de pression BP.", "La prise P est visible ; l’installation reste isolée par le siège arrière.", "P est la voie de service. P1, à l’opposé, n’est pas manipulée."),
    A("service", "hp-stem-cap", "removed", "Retirer le bouchon du carré HP", "Le gros bouchon gris à l’extrémité de la tige. Il porte le mot BOUCHON.", "Cliquez au centre du bouchon gris. Le carré orange placé dessous n’est pas encore accessible.", "Le bouchon disparaît et le carré orange apparaît.", "La même préparation est réalisée des deux côtés."),
    A("service", "hp-gland", "loose", "Libérer le presse-étoupe HP", "L’écrou jaune autour de la tige HP.", "Desserrez-le légèrement selon la fiche du poste.", "Le carré HP peut être manœuvré.", "On ne force pas une vanne avec le presse-étoupe bloqué."),
    A("service", "hp-stem", "rear", "Confirmer le siège arrière HP", "Le carré HP et l’indication de position.", "Cliquez sur le carré pour confirmer la butée arrière.", "La prise P HP est isolée de l’installation.", "Le vide préparatoire restera limité au manifold et aux flexibles."),
    A("service", "hp-gland", "tight", "Resserrer le presse-étoupe HP", "L’écrou jaune HP.", "Cliquez dessus pour le resserrer.", "Le presse-étoupe HP est serré.", "La position de sécurité est maintenant maintenue."),
    A("service", "hp-port-cap", "removed", "Ouvrir l’accès à la prise HP", "Le bouchon de la prise P HP.", "Retirez le bouchon de prise.", "Les deux prises de service sont accessibles, circuit toujours isolé.", "Le raccordement peut commencer sans mettre les lignes sous pression."),

    A("connect", "connect-blue", true, "Raccorder le flexible bleu", "La prise P de la vanne BP et le flexible bleu.", "Cliquez sur la prise P BP pour visser le raccord à la main.", "Le flexible bleu rejoint la BP ; sa mini-vanne reste fermée.", "Bleu = basse pression. Le raccord ne se force pas."),
    A("connect", "connect-red", true, "Raccorder le flexible rouge", "La prise P de la vanne HP et le flexible rouge.", "Cliquez sur la prise P HP pour visser le raccord à la main.", "Le flexible rouge rejoint la HP ; sa mini-vanne reste fermée.", "Rouge = haute pression."),
    A("connect", "connect-black", true, "Raccorder la pompe à vide", "La voie noire VIDE du manifold et l’entrée de la pompe.", "Cliquez sur le raccord P de la pompe.", "Le flexible noir relie la voie VIDE à la pompe.", "La voie SERVICE jaune reste fermée et inutilisée dans cette séquence."),
    A("connect", "mini-blue", "open", "Ouvrir la mini-vanne bleue", "La mini-vanne située au plus près de la vanne BP.", "Cliquez sur sa poignée.", "Le flexible bleu communique avec le manifold, mais pas avec le circuit.", "Le siège arrière isole encore la prise P."),
    A("connect", "mini-red", "open", "Ouvrir la mini-vanne rouge", "La mini-vanne située au plus près de la vanne HP.", "Cliquez sur sa poignée.", "Le flexible rouge est ouvert jusqu’au manifold.", "Le circuit HP reste isolé par le siège arrière."),
    A("connect", "mini-black", "open", "Ouvrir la mini-vanne de vide", "La mini-vanne du flexible noir, côté pompe.", "Cliquez sur sa poignée.", "La ligne de vide est prête.", "Le passage ne sera complet qu’après l’ouverture des robinets adaptés."),

    A("vacuum", "pump-isolation", "open", "Ouvrir l’isolement de pompe", "Le robinet noir sur la pompe.", "Cliquez sur ISOLEMENT.", "L’entrée de pompe communique avec le flexible noir.", "On prépare tout le chemin avant la mise en marche."),
    A("vacuum", "manifold-vac", "open", "Ouvrir la voie VIDE", "Le robinet noir VIDE du manifold 4 voies.", "Cliquez directement sur ce robinet.", "La pompe peut agir sur le collecteur.", "Cette quatrième voie évite de détourner la voie de service."),
    A("vacuum", "manifold-bp", "open", "Ouvrir la branche BP", "Le robinet bleu BP du manifold.", "Ouvrez-le.", "Le flexible bleu rejoint le chemin de vide.", "La vanne de service BP reste au siège arrière : le circuit est isolé."),
    A("vacuum", "manifold-hp", "open", "Ouvrir la branche HP", "Le robinet rouge HP du manifold.", "Ouvrez-le.", "Les deux flexibles et le collecteur sont reliés à la pompe.", "Ici, BP et HP sont ouvertes ensemble uniquement pour vider les lignes isolées."),
    A("vacuum", "pump-power", "on", "Démarrer la pompe", "L’interrupteur MARCHE de la pompe et les deux aiguilles.", "Cliquez sur l’interrupteur.", "Les aiguilles se déplacent vers la zone de vide.", "Aucun fluide du circuit ne doit atteindre la pompe : les deux vannes de service sont au siège arrière.", 1150),
    A("vacuum", "manifold-bp", "closed", "Isoler la branche BP", "Le robinet bleu et l’aiguille BP sous vide.", "Fermez le robinet BP du manifold.", "Le flexible bleu est isolé du collecteur.", "L’isolation commence côté circuit avant l’arrêt de la pompe."),
    A("vacuum", "manifold-hp", "closed", "Isoler la branche HP", "Le robinet rouge et l’aiguille HP.", "Fermez le robinet HP du manifold.", "Le flexible rouge est isolé.", "Les deux lignes conservent leur vide pour le contrôle."),
    A("vacuum", "manifold-vac", "closed", "Isoler avant d’arrêter", "Le robinet noir VIDE du manifold.", "Fermez la voie VIDE.", "Le manifold est isolé de la pompe.", "La règle est : isoler, puis arrêter."),
    A("vacuum", "pump-power", "off", "Arrêter la pompe", "L’interrupteur de la pompe, une fois la voie VIDE fermée.", "Cliquez sur l’interrupteur.", "La pompe s’arrête sans être en communication avec le manifold.", "Cet ordre limite le risque de retour d’huile."),
    A("vacuum", "pump-isolation", "closed", "Fermer l’isolement de pompe", "Le robinet noir de la pompe.", "Fermez-le.", "La pompe et le poste sont isolés l’un de l’autre.", "Toutes les voies inutilisées reviennent fermées."),
    A("vacuum", "leak-check", true, "Contrôler la tenue du vide", "Les aiguilles et les trois raccordements.", "Cliquez sur ÉTANCHÉITÉ après le temps de stabilisation prévu au plateau.", "Le vide ne remonte pas dans la simulation.", "Une remontée ferait rechercher une fuite ou de l’humidité résiduelle."),

    A("measure", "bp-gland", "loose", "Libérer le presse-étoupe BP", "L’écrou jaune BP.", "Desserrez-le légèrement.", "Le carré BP est prêt à être déplacé.", "La tige se manœuvre presse-étoupe libéré."),
    A("measure", "bp-stem", "mid", "Mettre la BP en lecture", "Le carré BP et le libellé de position.", "Cliquez sur le carré pour passer en position intermédiaire.", "La prise P communique avec l’installation BP.", "C’est la position de lecture ; le robinet BP du manifold reste fermé."),
    A("measure", "bp-gland", "tight", "Resserrer le presse-étoupe BP", "L’écrou jaune BP.", "Resserrez-le.", "La position intermédiaire BP est maintenue.", "On ne laisse pas le presse-étoupe desserré."),
    A("measure", "hp-gland", "loose", "Libérer le presse-étoupe HP", "L’écrou jaune HP.", "Desserrez-le légèrement.", "Le carré HP est prêt.", "Les deux vannes sont manipulées séparément."),
    A("measure", "hp-stem", "mid", "Mettre la HP en lecture", "Le carré HP et les aiguilles.", "Cliquez sur le carré pour passer en position intermédiaire.", "Les aiguilles se déplacent vers les pressions simulées BP et HP.", "Les manomètres lisent même si les robinets BP et HP du manifold restent fermés.", 1200),
    A("measure", "hp-gland", "tight", "Resserrer le presse-étoupe HP", "L’écrou jaune HP.", "Resserrez-le.", "Les deux vannes sont en position intermédiaire, presse-étoupes serrés.", "Le poste est maintenant en position de lecture."),
    A("measure", "leak-check", true, "Contrôler l’étanchéité en pression", "Les raccords BP, HP, presse-étoupes et bouchons restés en place.", "Cliquez sur ÉTANCHÉITÉ après le contrôle prévu par le plateau.", "Aucune fuite n’est signalée dans la simulation.", "Une lecture n’est fiable que sur un montage étanche."),
    A("measure", "read-pressures", true, "Lire et relever HP / BP", "Les deux aiguilles stabilisées.", "Cliquez sur RELEVER HP / BP.", "Les deux valeurs du scénario sont enregistrées sans ouvrir les robinets BP/HP du manifold.", "Ouvrir un robinet du manifold ne sert pas à lire : cela ouvre une voie vers le collecteur."),

    A("remove", "bp-gland", "loose", "Libérer le presse-étoupe BP", "L’écrou jaune BP avant la dépose.", "Desserrez-le légèrement.", "Le carré BP peut revenir au siège arrière.", "On isole l’installation avant de toucher aux raccords."),
    A("remove", "bp-stem", "rear", "Isoler la prise BP", "Le carré BP.", "Ramenez la vanne au siège arrière.", "La prise P BP est isolée ; l’aiguille conserve encore la pression piégée dans le flexible.", "Le retour immédiat à zéro serait faux tant que le flexible n’est pas traité.", 1050),
    A("remove", "bp-gland", "tight", "Resserrer le presse-étoupe BP", "L’écrou jaune BP.", "Resserrez-le.", "La vanne BP reste au siège arrière.", "L’étanchéité autour de la tige est rétablie."),
    A("remove", "hp-gland", "loose", "Libérer le presse-étoupe HP", "L’écrou jaune HP.", "Desserrez-le légèrement.", "Le carré HP peut être manœuvré.", "La HP doit être isolée avant la déconnexion."),
    A("remove", "hp-stem", "rear", "Isoler la prise HP", "Le carré HP et l’aiguille HP.", "Ramenez la vanne au siège arrière.", "La prise P HP est isolée ; la pression reste piégée dans la ligne.", "La mini-vanne limite ensuite le volume concerné."),
    A("remove", "hp-gland", "tight", "Resserrer le presse-étoupe HP", "L’écrou jaune HP.", "Resserrez-le.", "Les deux vannes de service sont au siège arrière.", "Le circuit est isolé des flexibles."),
    A("remove", "mini-blue", "closed", "Fermer la mini-vanne bleue", "La mini-vanne au plus près de la prise BP.", "Fermez-la.", "La portion de flexible côté raccord est limitée.", "La mini-vanne réduit la perte au débranchement, mais ne supprime pas le fluide piégé."),
    A("remove", "mini-red", "closed", "Fermer la mini-vanne rouge", "La mini-vanne au plus près de la prise HP.", "Fermez-la.", "Le flexible HP est isolé au plus près du groupe.", "Ne jamais desserrer un raccord qui contient encore une pression non traitée."),
    A("remove", "residual-treatment", true, "Traiter le fluide résiduel", "Les aiguilles qui indiquent encore une pression piégée.", "Cliquez sur FLUIDE PIÉGÉ pour appliquer la procédure du plateau.", "Les lignes reviennent à zéro sans rejet dans l’atmosphère.", "La méthode exacte dépend du poste et doit être validée par le formateur ; aucun dégazage n’est simulé.", 1100),
    A("remove", "connect-red", false, "Débrancher le flexible rouge", "La prise P HP, maintenant isolée et sans pression résiduelle.", "Cliquez sur le raccord rouge pour le dévisser.", "Le flexible rouge est déposé sans rejet.", "Le contrôle de pression précède toujours le desserrage."),
    A("remove", "connect-blue", false, "Débrancher le flexible bleu", "La prise P BP.", "Cliquez sur le raccord bleu pour le dévisser.", "Le flexible bleu est déposé.", "Le circuit reste isolé au siège arrière."),
    A("remove", "mini-black", "closed", "Fermer la mini-vanne de vide", "La mini-vanne du flexible noir.", "Fermez-la.", "Le flexible de vide est isolé.", "La pompe est déjà arrêtée et isolée."),
    A("remove", "connect-black", false, "Débrancher la pompe", "Le raccord P de la pompe.", "Cliquez sur le raccord noir.", "Le flexible de vide est déposé.", "Le manifold peut maintenant être rangé."),
    A("remove", "bp-port-cap", "on", "Remettre le bouchon de prise BP", "La prise P BP désormais libre.", "Cliquez sur son bouchon pour le remettre.", "La prise de service BP est protégée.", "Le bouchon participe à l’étanchéité et ne doit pas être oublié."),
    A("remove", "hp-port-cap", "on", "Remettre le bouchon de prise HP", "La prise P HP.", "Remettez son bouchon.", "La prise de service HP est protégée.", "Les deux prises reviennent dans leur état initial."),
    A("remove", "bp-stem-cap", "on", "Remettre le bouchon de tige BP", "Le carré BP et son bouchon.", "Cliquez sur le bouchon de tige.", "Le carré BP est protégé.", "Le bouchon finalise la remise en étanchéité."),
    A("remove", "hp-stem-cap", "on", "Remettre le bouchon de tige HP", "Le carré HP et son bouchon.", "Cliquez sur le bouchon de tige.", "Le carré HP est protégé.", "Aucun bouchon ne reste sur l’établi."),
    A("remove", "leak-check", true, "Faire le contrôle final", "Les presse-étoupes, les bouchons et les deux vannes de service.", "Cliquez une dernière fois sur ÉTANCHÉITÉ.", "Sièges arrière, presse-étoupes serrés, bouchons remis et absence de fuite simulée.", "La dépose se termine par une vérification, pas par le rangement précipité."),
    A("remove", "read-pressures", "reset", "Ranger le manifold", "Les aiguilles revenues à zéro et les flexibles déposés.", "Cliquez sur RELEVER HP / BP, devenu RANGER LE MANIFOLD.", "Le manifold est remis à zéro et les flexibles sont prêts à être enroulés sans coude serré.", "Le manifold ne reste monté que pendant le travail.", 900)
  ];

  const initialState = () => ({
    mode: "guided",
    index: 0,
    help: false,
    controls: {
      "bp-stem-cap": "on", "hp-stem-cap": "on",
      "bp-port-cap": "on", "hp-port-cap": "on",
      "bp-gland": "tight", "hp-gland": "tight",
      "bp-stem": "rear", "hp-stem": "rear",
      "manifold-bp": "closed", "manifold-vac": "closed", "manifold-service": "closed", "manifold-hp": "closed",
      "mini-blue": "closed", "mini-red": "closed", "mini-black": "closed",
      "pump-isolation": "closed", "pump-power": "off"
    },
    checks: new Set(),
    connected: { blue: false, red: false, black: false },
    zero: { bp: false, hp: false },
    vacuumReached: false,
    pressureSeen: false,
    residualTreated: false,
    locked: false
  });

  let state = initialState();

  const home = $("#home");
  const trainer = $("#trainer");
  const summary = $("#summary");
  const helpButton = $("#help-button");
  const resetButton = $("#reset-button");
  const exitButton = $("#exit-button");

  function phaseActions(phaseId) { return actions.filter(action => action.phase === phaseId); }
  function currentAction() { return actions[state.index]; }
  function currentPhaseIndex() { return phases.findIndex(phase => phase.id === currentAction()?.phase); }

  function buildPhaseStrip() {
    $("#phase-strip").innerHTML = phases.map((phase, index) =>
      `<button type="button" class="phase-button" data-phase="${phase.id}" disabled><span>${index + 1}</span>${phase.label}</button>`
    ).join("");
  }

  function start(mode) {
    state = initialState();
    state.mode = mode;
    home.hidden = true;
    summary.hidden = true;
    trainer.hidden = false;
    document.body.classList.add("course-running");
    $("#mode-badge").textContent = mode === "guided" ? "Mode guidé" : "Mode autonome";
    helpButton.hidden = mode === "guided";
    resetButton.hidden = false;
    exitButton.hidden = false;
    buildPhaseStrip();
    render();
    $("#guidance-title").focus({ preventScroll: true });
  }

  function exitCourse() {
    document.body.classList.remove("course-running");
    trainer.hidden = true;
    summary.hidden = true;
    home.hidden = false;
    helpButton.hidden = true;
    resetButton.hidden = true;
    exitButton.hidden = true;
    $("#mode-badge").textContent = "Accueil";
  }

  function showSummary() {
    document.body.classList.remove("course-running");
    trainer.hidden = true;
    summary.hidden = false;
    helpButton.hidden = true;
    resetButton.hidden = true;
    exitButton.hidden = false;
    $("#mode-badge").textContent = "Terminé";
    $("#summary-title").focus({ preventScroll: true });
  }

  function renderGuidance() {
    const action = currentAction();
    if (!action) return;
    const phase = phases.find(item => item.id === action.phase);
    const within = phaseActions(action.phase);
    const position = within.findIndex(item => item === action) + 1;
    $("#phase-name").textContent = phase.label;
    $("#phase-progress").textContent = `${position} / ${within.length}`;
    $("#guidance-title").textContent = action.title;
    $("#guide-look").textContent = action.look;
    $("#guide-do").textContent = action.doText;
    $("#guide-check").textContent = action.check;
    $("#guide-why").textContent = action.why;

    const reveal = state.mode === "guided" || state.help;
    $("#guidance-steps").hidden = !reveal;
    $("#autonomous-prompt").hidden = reveal;
    helpButton.textContent = state.help ? "Masquer l’aide" : "Aidez-moi";
    const prompt = reveal ? "Faites le geste directement sur l’objet indiqué." : "À vous de retrouver le prochain geste dans l’ordre.";
    $("#feedback").className = "feedback waiting";
    $("#feedback").textContent = prompt;
    $("#scene-feedback").textContent = prompt;

    const phaseIndex = currentPhaseIndex();
    $$(".phase-button").forEach((button, index) => {
      button.classList.toggle("active", index === phaseIndex);
      button.classList.toggle("done", index < phaseIndex);
    });
  }

  function renderExpected() {
    $$(".direct-control").forEach(control => control.classList.remove("expected"));
    if (state.mode === "guided" || state.help) {
      const action = currentAction();
      $$(`[data-control="${action.control}"]`).forEach(control => control.classList.add("expected"));
    }
  }

  function setRotation(id, open) {
    const node = document.getElementById(id);
    if (node) node.style.transform = `rotate(${open ? 90 : 0}deg)`;
  }

  function updateScene() {
    ["bp", "hp"].forEach(side => {
      const stemCap = $(`#shape-${side}-stem-cap`);
      const portCap = $(`#shape-${side}-port-cap`);
      const stemCapRemoved = state.controls[`${side}-stem-cap`] === "removed";
      stemCap?.classList.toggle("removed", stemCapRemoved);
      $(`[data-control="${side}-stem-cap"]`)?.classList.toggle("removed", stemCapRemoved);
      portCap?.classList.toggle("removed", state.controls[`${side}-port-cap`] === "removed");
      $(`#shape-${side}-gland`)?.classList.toggle("loose", state.controls[`${side}-gland`] === "loose");
      const stemControl = $(`[data-control="${side}-stem"]`);
      const capActionActive = currentAction()?.control === `${side}-stem-cap`;
      stemControl?.classList.toggle("concealed", !stemCapRemoved);
      stemControl?.classList.toggle("available", stemCapRemoved);
      stemControl?.classList.toggle("cap-action", capActionActive);
      stemControl?.setAttribute("tabindex", stemCapRemoved && !capActionActive ? "0" : "-1");
      stemControl?.setAttribute("aria-hidden", String(!stemCapRemoved));
      const connectionControl = `connect-${side === "bp" ? "blue" : "red"}`;
      const port = $(`[data-control="${connectionControl}"]`);
      const portCapRemoved = state.controls[`${side}-port-cap`] === "removed";
      port?.classList.toggle("visible", portCapRemoved);
      port?.classList.toggle("available", portCapRemoved && currentAction()?.control === connectionControl);
      const unit = $(`#equipment-${side}`);
      if (unit) unit.dataset.position = state.controls[`${side}-stem`];
      const positionLabel = $(`#${side}-position-label`);
      if (positionLabel) positionLabel.textContent = ({ rear: "SIÈGE ARRIÈRE", mid: "INTERMÉDIAIRE", front: "SIÈGE AVANT" })[state.controls[`${side}-stem`]];
    });

    Object.entries(state.connected).forEach(([hose, connected]) => {
      $(`#hose-${hose}`)?.classList.toggle("connected", connected);
      $(`[data-control="mini-${hose}"]`)?.classList.toggle("available", connected);
    });

    ["manifold-bp", "manifold-vac", "manifold-service", "manifold-hp", "pump-isolation"].forEach(control => {
      setRotation(`handle-${control}`, state.controls[control] === "open");
    });
    ["mini-blue", "mini-red", "mini-black"].forEach(control => setRotation(`handle-${control}`, state.controls[control] === "open"));

    const power = state.controls["pump-power"] === "on";
    $("[data-control='pump-power']")?.classList.toggle("on", power);
    $("#pump-status").textContent = power ? "EN MARCHE" : "ARRÊT";
    $("#pump-status").style.fill = power ? "#1e7e54" : "#c0392b";

    const next = currentAction()?.control;
    $(".reading-card")?.classList.toggle("available", next === "read-pressures");
    $(".residual-card")?.classList.toggle("available", next === "residual-treatment");
    $(".leak-card")?.classList.toggle("available", next === "leak-check");

    const readingTexts = $$(".reading-card text");
    if (readingTexts.length >= 2) {
      const rangement = next === "read-pressures" && currentAction()?.expect === "reset";
      readingTexts[0].textContent = rangement ? "RANGER LE MANIFOLD" : "RELEVER HP / BP";
      readingTexts[1].textContent = rangement ? "zéro · flexibles" : "valeurs du scénario";
    }

    updateNeedles();
    updateSceneView();
  }

  function updateSceneView() {
    const scene = $("#work-scene");
    if (!window.matchMedia("(max-width: 650px)").matches) {
      scene.setAttribute("viewBox", "0 0 1200 660");
      return;
    }
    const control = currentAction()?.control || "check-post";
    let view = "320 0 560 660";
    if (control.startsWith("inspect-") || control === "check-post" || control === "leak-check") view = "0 0 660 660";
    if (control.startsWith("bp-") || control === "connect-blue" || control === "mini-blue") view = "0 150 560 510";
    if (control.startsWith("hp-") || control === "connect-red" || control === "mini-red" || control === "residual-treatment") view = "640 150 560 510";
    if (control === "read-pressures") view = "320 0 560 500";
    scene.setAttribute("viewBox", view);
  }

  function updateNeedles() {
    const vacuumPath = state.controls["pump-power"] === "on" && state.controls["manifold-vac"] === "open" && state.controls["manifold-bp"] === "open" && state.controls["manifold-hp"] === "open";
    if (vacuumPath) state.vacuumReached = true;
    const bothReading = state.controls["bp-stem"] === "mid" && state.controls["hp-stem"] === "mid" && state.controls["mini-blue"] === "open" && state.controls["mini-red"] === "open";
    if (bothReading) state.pressureSeen = true;

    let bp = state.zero.bp ? 0 : -7;
    let hp = state.zero.hp ? 0 : 8;
    let bpText = state.zero.bp ? "ZÉRO" : "À CONTRÔLER";
    let hpText = state.zero.hp ? "ZÉRO" : "À CONTRÔLER";
    let status = "Aiguilles : à contrôler";

    if (vacuumPath) {
      bp = -31; hp = -31; bpText = hpText = "SOUS VIDE"; status = "Aiguilles : vide des lignes";
    } else if (state.vacuumReached && !state.pressureSeen) {
      bp = -31; hp = -31; bpText = hpText = "VIDE TENU"; status = "Aiguilles : vide tenu";
    }
    if (state.pressureSeen && !state.residualTreated) {
      bp = 42; hp = 78;
      const isolated = state.controls["bp-stem"] === "rear" && state.controls["hp-stem"] === "rear";
      bpText = hpText = isolated ? "PRESSION PIÉGÉE" : "PRESSION LUE";
      status = isolated ? "Aiguilles : pression piégée" : "Aiguilles : pressions simulées";
    }
    if (state.residualTreated) {
      bp = 0; hp = 0; bpText = hpText = "RETOUR À ZÉRO"; status = "Aiguilles : lignes sans pression";
    }

    $("#needle-bp").style.transform = `rotate(${bp}deg)`;
    $("#needle-hp").style.transform = `rotate(${hp}deg)`;
    $("#bp-gauge-state").textContent = bpText;
    $("#hp-gauge-state").textContent = hpText;
    $("#needle-status").textContent = status;
  }

  function render() {
    renderGuidance();
    updateScene();
    renderExpected();
  }

  function predicted(control, expect) {
    if (control === "zero-bp" || control === "zero-hp" || control.startsWith("inspect-") || control === "check-post" || control === "leak-check" || control === "residual-treatment") return true;
    if (control === "read-pressures") return expect;
    if (control.startsWith("connect-")) return expect;
    return expect;
  }

  function safetyMessage(action) {
    const c = action.control;
    if ((c === "bp-stem" || c === "hp-stem") && state.controls[c.replace("stem", "gland")] !== "loose") return "Blocage : desserrez d’abord légèrement le presse-étoupe.";
    if (c === "pump-power" && action.expect === "on") {
      if (!state.connected.black || state.controls["mini-black"] !== "open" || state.controls["pump-isolation"] !== "open" || state.controls["manifold-vac"] !== "open") return "Blocage : le chemin vers la pompe n’est pas entièrement préparé.";
      if (state.controls["bp-stem"] !== "rear" || state.controls["hp-stem"] !== "rear") return "Blocage : les vannes de service doivent rester au siège arrière pendant le vide des lignes.";
    }
    if (c === "pump-power" && action.expect === "off" && state.controls["manifold-vac"] !== "closed") return "Blocage : isolez la voie VIDE avant d’arrêter la pompe.";
    if (c === "connect-blue" && action.expect === true && state.controls["bp-port-cap"] !== "removed") return "Retirez d’abord le bouchon de la prise P BP.";
    if (c === "connect-red" && action.expect === true && state.controls["hp-port-cap"] !== "removed") return "Retirez d’abord le bouchon de la prise P HP.";
    if ((c === "connect-blue" || c === "connect-red") && action.expect === false && !state.residualTreated) return "Blocage : la pression résiduelle doit être traitée avant le débranchement.";
    return "";
  }

  function applyAction(action) {
    const c = action.control;
    const value = predicted(c, action.expect);
    if (c === "zero-bp") state.zero.bp = true;
    else if (c === "zero-hp") state.zero.hp = true;
    else if (c.startsWith("inspect-") || c === "check-post" || c === "leak-check") state.checks.add(`${state.index}:${c}`);
    else if (c === "residual-treatment") state.residualTreated = true;
    else if (c === "read-pressures" && value === "reset") state.checks.add("ranged");
    else if (c.startsWith("connect-")) state.connected[c.replace("connect-", "")] = value;
    else state.controls[c] = value;
  }

  function act(control) {
    if (state.locked || trainer.hidden) return;
    const action = currentAction();
    if (!action) return;
    if (control !== action.control) {
      const feedback = $("#feedback");
      feedback.className = "feedback error";
      feedback.textContent = state.mode === "autonomous" && !state.help ? "Ce geste n’est pas encore le prochain. Observez l’état du poste ou demandez de l’aide." : `Pas maintenant : ${action.title.toLowerCase()}.`;
      $("#scene-feedback").textContent = feedback.textContent;
      return;
    }
    const blocker = safetyMessage(action);
    if (blocker) {
      $("#feedback").className = "feedback error";
      $("#feedback").textContent = blocker;
      $("#scene-feedback").textContent = blocker;
      return;
    }

    applyAction(action);
    state.locked = true;
    updateScene();
    $$(".direct-control").forEach(node => node.classList.remove("expected"));
    $("#feedback").className = "feedback correct";
    $("#feedback").textContent = `Correct — ${action.check}`;
    $("#scene-feedback").textContent = action.check;

    window.setTimeout(() => {
      state.index += 1;
      state.help = false;
      state.locked = false;
      if (state.index >= actions.length) showSummary();
      else render();
    }, action.delay);
  }

  function renderValveDiagram(position) {
    const api = window.VanneRotalock;
    if (!api) {
      $("#valve-diagram").textContent = "Le schéma de vanne n’est pas disponible.";
      return;
    }
    const side = currentAction()?.control.startsWith("hp-") ? "hp" : "bp";
    $("#valve-diagram").innerHTML = api.createValveSvg({ position, circuit: side, showKey: true, idPrefix: `pose-manifold-${side}-${position}` });
    const explanations = {
      back: "Siège arrière : le passage principal reste ouvert, mais la voie de service P est isolée. C’est la position utilisée pour raccorder, tirer les lignes au vide et déposer.",
      mid: "Position intermédiaire : le circuit, le raccord principal et la voie P communiquent. C’est la position de lecture des pressions.",
      front: "Siège avant : le raccord principal T est isolé tandis que P reste en communication avec C. Cette position est expliquée, mais elle n’est pas utilisée artificiellement dans ce TP de pose/dépose."
    };
    $("#valve-explanation").textContent = explanations[position];
    $$('[data-dialog-position]').forEach(button => button.setAttribute("aria-pressed", String(button.dataset.dialogPosition === position)));
  }

  $$("[data-start-mode]").forEach(button => button.addEventListener("click", () => start(button.dataset.startMode)));
  $$(".direct-control").forEach(control => {
    const run = () => act(control.dataset.control);
    control.addEventListener("click", run);
    control.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); run(); }
    });
  });

  helpButton.addEventListener("click", () => { state.help = !state.help; renderGuidance(); renderExpected(); });
  resetButton.addEventListener("click", () => start(state.mode));
  exitButton.addEventListener("click", exitCourse);
  $("#restart-button").addEventListener("click", () => start("guided"));
  $("#valve-zoom-button").addEventListener("click", () => {
    const side = currentAction()?.control.startsWith("hp-") ? "hp" : "bp";
    const position = state.controls[`${side}-stem`] || "rear";
    renderValveDiagram(position);
    $("#valve-dialog").showModal();
  });
  $("#close-dialog").addEventListener("click", () => $("#valve-dialog").close());
  $$('[data-dialog-position]').forEach(button => button.addEventListener("click", () => renderValveDiagram(button.dataset.dialogPosition)));
  $("#valve-dialog").addEventListener("click", event => { if (event.target === $("#valve-dialog")) $("#valve-dialog").close(); });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("#valve-dialog").open && !trainer.hidden) exitCourse();
  });
  window.addEventListener("resize", updateSceneView);

  buildPhaseStrip();
})();
