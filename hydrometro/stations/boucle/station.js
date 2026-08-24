"use strict";

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const shell = HydroStation.init({
    title: "Boucle",
    nextHref: "../energie/index.html",
    nextLabel: "Station suivante : Énergie",
    successMessage: "Tu sais suivre un trajet fermé et distinguer production, départ, émetteur et retour.",
    levels: {
      CAP: { name: "CAP · niveau 3", objective: "Suivre le trajet de l’eau dans une boucle de chauffage.", learn: ["suivre l’eau", "nommer les quatre organes", "signaler une anomalie"] },
      TP: { name: "Bac pro · niveau 4", objective: "Comprendre puis reconstruire le trajet d’une boucle de chauffage.", learn: ["observer avant de répondre", "suivre l’eau", "nommer les quatre fonctions", "contrôler la continuité"] },
      BTS: { name: "BTS / titre pro CVC · niveau 5", objective: "Comprendre puis analyser l’architecture fonctionnelle d’une boucle.", learn: ["délimiter le système", "distinguer organe et fonction", "matérialiser les flux", "énoncer les limites du modèle"] }
    },
    quiz: [
      { prompt: "Après l’émetteur, où l’eau doit-elle aller dans un circuit fermé ?", options: ["Vers le retour puis la production", "Vers l’extérieur du bâtiment", "Dans un réservoir sans sortie"], correct: 0, explanation: "Le retour ramène l’eau vers la production : la continuité ferme le trajet." },
      { prompt: "Quel repère prouve le sens de circulation sans utiliser seulement la couleur ?", options: ["Une flèche orientée", "Un tuyau plus épais", "Un fond bleu"], correct: 0, explanation: "La flèche donne une direction lisible, même en niveaux de gris." },
      { prompt: "Une conduite est interrompue sur le schéma. Quelle conclusion est justifiée ?", options: ["La continuité fonctionnelle n’est pas démontrée", "La pompe est forcément en panne", "Le débit est exactement nul sur l’installation réelle"], correct: 0, explanation: "Le dessin incomplet empêche de prouver la continuité ; il ne suffit pas à diagnostiquer la pompe réelle." },
      { prompt: "Quel ordre décrit la boucle étudiée ?", options: ["Production → départ → émetteur → retour", "Départ → retour → production → émetteur", "Émetteur → production → départ → rejet"], correct: 0, explanation: "La production transmet de l’énergie à l’eau, le départ l’emmène vers l’émetteur, puis le retour ferme la boucle." }
    ]
  });

  const svgShell = (id, title, desc, body) => `
    <svg id="${id}" viewBox="0 0 760 430" role="img" aria-labelledby="${id}-title ${id}-desc">
      <title id="${id}-title">${title}</title>
      <desc id="${id}-desc">${desc}</desc>
      <defs>
        <marker id="arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1b3a63"/></marker>
        <marker id="orange-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker>
      </defs>
      <rect x="12" y="12" width="736" height="406" rx="24" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
      ${body}
    </svg>`;

  const production = (id, x = 44, y = 150) => `
    <g id="${id}" class="demo-group">
      <rect x="${x}" y="${y}" width="145" height="112" rx="18" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="7 5"/>
      <path d="M${x + 42} ${y + 70}C${x + 24} ${y + 48} ${x + 58} ${y + 40} ${x + 47} ${y + 20}C${x + 82} ${y + 42} ${x + 63} ${y + 52} ${x + 83} ${y + 71}" fill="none" stroke="#c9451a" stroke-width="7" stroke-linecap="round"/>
      <text x="${x + 92}" y="${y + 55}" class="svg-label" text-anchor="middle">PRODUCTION</text>
      <text x="${x + 92}" y="${y + 82}" class="svg-small" text-anchor="middle">donne de l’énergie</text>
    </g>`;

  const emitter = (id, x = 590, y = 145) => `
    <g id="${id}" class="demo-group">
      <rect x="${x}" y="${y}" width="132" height="122" rx="18" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/>
      <image href="assets/radiateur.svg" x="${x + 14}" y="${y + 8}" width="104" height="76"/>
      <text x="${x + 66}" y="${y + 102}" class="svg-label" text-anchor="middle">ÉMETTEUR</text>
    </g>`;

  const loopPath = "M188 106H582Q666 106 666 188V264Q666 340 582 340H188Q96 340 96 264V188Q96 106 188 106";

  const scenes = {
    need: svgShell(
      "needScene",
      "Une boucle de chauffage transporte de l’énergie",
      "La production transmet de l’énergie à l’eau. L’eau va vers un émetteur dans une pièce, puis revient par le même circuit fermé.",
      `${production("need-production", 42, 154)}
       <g id="need-depart" class="demo-group"><path d="M187 170H575" class="svg-depart" marker-end="url(#orange-needScene)"/><text x="380" y="151" class="svg-label" text-anchor="middle">DÉPART →</text></g>
       ${emitter("need-emitter", 584, 145)}
       <g id="need-room" class="demo-group"><path d="M648 128V68" stroke="#c9451a" stroke-width="5" stroke-dasharray="7 7" marker-end="url(#orange-needScene)"/><text x="648" y="48" class="svg-label" text-anchor="middle">PIÈCE</text></g>
       <g id="need-return" class="demo-group"><path d="M584 252H187" class="svg-return" marker-end="url(#arrow-needScene)"/><text x="380" y="285" class="svg-label" text-anchor="middle">← RETOUR</text></g>
       <text x="380" y="385" class="svg-small" text-anchor="middle">Exemple simplifié d’un circuit de chauffage fermé</text>`
    ),
    closed: svgShell(
      "closedScene",
      "Un trajet fermé revient à son point de départ",
      "Une conduite continue relie production, départ, émetteur et retour. Les flèches indiquent le sens et les mots distinguent départ et retour.",
      `<path d="${loopPath}" class="svg-pipe"/>
       <path d="M205 106H555" class="svg-depart" marker-end="url(#orange-closedScene)"/>
       <path d="M555 340H205" class="svg-return" marker-end="url(#arrow-closedScene)"/>
       ${production("closed-production", 28, 163)}
       ${emitter("closed-emitter", 600, 158)}
       <text x="380" y="82" class="svg-label" text-anchor="middle">DÉPART → vers l’émetteur</text>
       <text x="380" y="377" class="svg-label" text-anchor="middle">← RETOUR vers la production</text>
       <rect x="270" y="182" width="220" height="72" rx="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="6"/>
       <text x="380" y="213" class="svg-label" text-anchor="middle">BOUCLE FERMÉE</text><text x="380" y="239" class="svg-small" text-anchor="middle">trajet continu</text>`
    ),
    flow: svgShell(
      "flowScene",
      "Le trajet animé d’un repère d’eau",
      "Le repère EAU part de la production, suit le départ, traverse l’émetteur, puis revient par le retour jusqu’à la production.",
      `<path id="loopPath" d="${loopPath}" class="svg-pipe"/>
       <path d="M205 106H555" class="svg-depart" marker-end="url(#orange-flowScene)"/>
       <path d="M555 340H205" class="svg-return" marker-end="url(#arrow-flowScene)"/>
       ${production("flow-production", 28, 163)}
       ${emitter("flow-emitter", 600, 158)}
       <g id="waterMarker" class="flow-water"><circle r="23" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text y="5" text-anchor="middle" font-size="11" font-weight="900" fill="#10233c">EAU</text></g>
       <g><circle cx="215" cy="106" r="14" fill="#fffdf8" stroke="#c9451a" stroke-width="4"/><text x="215" y="111" text-anchor="middle" font-size="12" font-weight="900">1</text></g>
       <g><circle cx="666" cy="214" r="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="666" y="219" text-anchor="middle" font-size="12" font-weight="900">2</text></g>
       <g><circle cx="520" cy="340" r="14" fill="#fffdf8" stroke="#3d7fca" stroke-width="4"/><text x="520" y="345" text-anchor="middle" font-size="12" font-weight="900">3</text></g>
       <g><circle cx="96" cy="214" r="14" fill="#fffdf8" stroke="#1e7e54" stroke-width="4"/><text x="96" y="219" text-anchor="middle" font-size="12" font-weight="900">4</text></g>`
    ),
    roles: svgShell(
      "rolesScene",
      "Les organes ont des fonctions différentes",
      "La production transmet de l’énergie, le circulateur permet la circulation, l’émetteur transmet une partie de l’énergie à la pièce et les conduites ferment le trajet.",
      `${production("role-production", 28, 156)}
       <g id="role-circulator" class="demo-group"><circle cx="300" cy="106" r="57" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><image href="assets/pompe_debit_variable.svg" x="258" y="64" width="84" height="84"/><text x="300" y="184" class="svg-label" text-anchor="middle">CIRCULATEUR</text><text x="300" y="208" class="svg-small" text-anchor="middle">permet le débit</text></g>
       ${emitter("role-emitter", 600, 153)}
       <g id="role-pipes" class="demo-group"><path d="M188 106H582Q666 106 666 150" class="svg-depart" marker-end="url(#orange-rolesScene)"/><path d="M666 274Q666 340 582 340H188Q96 340 96 274" class="svg-return" marker-end="url(#arrow-rolesScene)"/><text x="380" y="382" class="svg-label" text-anchor="middle">CONDUITES : fermer le trajet</text></g>`
    ),
    transfer: svgShell(
      "transferScene",
      "L’eau transporte de l’énergie dans un circuit de chauffage",
      "Le départ conduit l’eau vers l’émetteur. L’émetteur transmet une partie de l’énergie à la pièce. Le retour ramène l’eau vers la production.",
      `${production("transfer-production", 28, 159)}
       <g id="transfer-depart" class="demo-group"><path d="M188 125H585" class="svg-depart" marker-end="url(#orange-transferScene)"/><text x="380" y="101" class="svg-label" text-anchor="middle">DÉPART : eau vers l’émetteur</text></g>
       ${emitter("transfer-emitter", 600, 151)}
       <g id="transfer-room" class="demo-group"><path class="energy-ray" d="M624 137L600 80" stroke="#c9451a" stroke-width="5" stroke-dasharray="5 6"/><path class="energy-ray" d="M655 132V68" stroke="#c9451a" stroke-width="5" stroke-dasharray="5 6"/><path class="energy-ray" d="M686 137L712 80" stroke="#c9451a" stroke-width="5" stroke-dasharray="5 6"/><text x="655" y="48" class="svg-label" text-anchor="middle">ÉNERGIE VERS LA PIÈCE</text></g>
       <g id="transfer-return" class="demo-group"><path d="M600 290H188" class="svg-return" marker-end="url(#arrow-transferScene)"/><text x="380" y="326" class="svg-label" text-anchor="middle">RETOUR : eau vers la production</text></g>
       <rect x="245" y="172" width="245" height="75" rx="16" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/>
       <text x="367" y="202" class="svg-label" text-anchor="middle">L’EAU RESTE DANS LE CIRCUIT</text><text x="367" y="229" class="svg-small" text-anchor="middle">elle transporte l’énergie</text>`
    ),
    construction: svgShell(
      "constructionScene",
      "Construction démontrée dans l’ordre",
      "Les quatre repères sont déjà visibles. La démonstration les met en évidence dans l’ordre production, départ, émetteur, retour.",
      `<path d="${loopPath}" class="svg-pipe"/>
       <g id="build-1" class="demo-group"><rect x="22" y="180" width="155" height="70" rx="15" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="7 5"/><text x="99" y="210" class="svg-label" text-anchor="middle">1 · PRODUCTION</text><text x="99" y="234" class="svg-small" text-anchor="middle">point de départ</text></g>
       <g id="build-2" class="demo-group"><rect x="286" y="58" width="188" height="60" rx="15" fill="#fffdf8" stroke="#c9451a" stroke-width="4"/><text x="380" y="95" class="svg-label" text-anchor="middle">2 · DÉPART →</text></g>
       <g id="build-3" class="demo-group"><rect x="583" y="180" width="155" height="70" rx="15" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/><text x="660" y="210" class="svg-label" text-anchor="middle">3 · ÉMETTEUR</text><text x="660" y="234" class="svg-small" text-anchor="middle">usage</text></g>
       <g id="build-4" class="demo-group"><rect x="286" y="318" width="188" height="60" rx="15" fill="#fffdf8" stroke="#3d7fca" stroke-width="4" stroke-dasharray="10 7"/><text x="380" y="355" class="svg-label" text-anchor="middle">4 · ← RETOUR</text></g>
       <text x="380" y="222" class="svg-label" text-anchor="middle">LA CONTINUITÉ FERME LA BOUCLE</text>`
    ),
    summary: svgShell(
      "summaryScene",
      "Synthèse de la boucle de chauffage",
      "Production, départ, émetteur et retour forment un trajet continu. Un circulateur permet la circulation. Le départ et le retour appartiennent au même circuit.",
      `<path d="${loopPath}" class="svg-pipe"/>
       <path d="M205 106H555" class="svg-depart" marker-end="url(#orange-summaryScene)"/>
       <path d="M555 340H205" class="svg-return" marker-end="url(#arrow-summaryScene)"/>
       ${production("summary-production", 28, 163)}
       ${emitter("summary-emitter", 600, 158)}
       <circle cx="315" cy="106" r="42" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><image href="assets/pompe_debit_variable.svg" x="285" y="76" width="60" height="60"/>
       <text x="380" y="82" class="svg-label" text-anchor="middle">DÉPART →</text><text x="380" y="378" class="svg-label" text-anchor="middle">← RETOUR</text>
       <rect x="250" y="188" width="260" height="70" rx="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="6"/>
       <text x="380" y="218" class="svg-label" text-anchor="middle">TRAJET CONTINU</text><text x="380" y="243" class="svg-small" text-anchor="middle">l’eau revient à la production</text>`
    )
  };

  const lessons = [
    {
      short: "Besoin", kicker: "1 · Observer", title: "Pourquoi faire une boucle ?",
      lead: "Dans cet exemple de chauffage, l’eau transporte de l’énergie entre la production et la pièce.",
      body: ["La production transmet de l’énergie à l’eau. L’eau va jusqu’à l’émetteur, puis elle revient vers la production.", "L’eau n’est pas rejetée après l’émetteur : elle reste dans un circuit fermé."],
      key: "La clé : une boucle est un trajet continu qui revient à son point de départ.",
      cap: "Montre la production, puis l’émetteur, sur le dessin.",
      tp: "Repère où l’eau reçoit puis cède une partie de l’énergie.",
      bts: "Délimite le système : production, distribution, émission et retour.",
      scene: scenes.need,
      equivalent: "La production transmet de l’énergie à l’eau. Le départ conduit l’eau vers l’émetteur de la pièce. Le retour ramène ensuite l’eau à la production.",
      control: "intro"
    },
    {
      short: "Fermer", kicker: "2 · Comprendre", title: "Départ et retour : un seul trajet",
      lead: "Le départ et le retour ne sont pas deux circuits indépendants.",
      body: ["Le départ emmène l’eau de la production vers l’émetteur. Le retour ramène cette même eau vers la production.", "Si un tronçon manque, le schéma ne démontre plus la continuité de la boucle."],
      key: "La clé : départ + usage + retour ferment le trajet.",
      cap: "Suis la flèche du départ, puis celle du retour.",
      tp: "Suis les flèches sans sauter de tronçon.",
      bts: "Distingue la fonction des tronçons de leur position graphique.",
      scene: scenes.closed,
      equivalent: "Le tracé est fermé. Le départ est nommé et fléché vers l’émetteur. Le retour est nommé, dessiné en tirets et fléché vers la production.",
      control: "none"
    },
    {
      short: "Suivre", kicker: "3 · Voir fonctionner", title: "Suis la même eau sur tout le trajet",
      lead: "Lance l’animation. Le repère EAU effectue un tour complet.",
      body: ["Il quitte la production, suit le départ, traverse l’émetteur, puis emprunte le retour.", "Tu peux mettre l’animation en pause ou la recommencer. Le texte décrit toujours ce qu’elle montre."],
      key: "La clé : après l’émetteur, l’eau continue vers le retour.",
      cap: "Nomme chaque partie quand le repère EAU passe.",
      tp: "Nommer chaque partie au passage du repère EAU.",
      bts: "Matérialise le sens positif choisi pour le flux hydraulique.",
      scene: scenes.flow,
      equivalent: "État initial : le repère EAU se trouve au départ de la production. Le trajet complet est production, départ, émetteur, retour, puis production.",
      control: "flow"
    },
    {
      short: "Fonctions", kicker: "4 · Expliquer", title: "Chaque élément a un rôle différent",
      lead: "La production et le circulateur ne désignent pas la même fonction.",
      body: ["La production transmet de l’énergie à l’eau. Le circulateur permet le débit dans le réseau. L’émetteur transmet une partie de l’énergie à la pièce.", "Les conduites relient les fonctions et ferment le trajet."],
      key: "La clé : produire l’énergie, faire circuler l’eau et émettre dans la pièce sont trois rôles distincts.",
      cap: "Montre la production, le circulateur, puis l’émetteur.",
      tp: "Associe chaque organe à sa fonction observable.",
      bts: "Sépare fonctions énergétiques et fonction hydraulique du circulateur.",
      scene: scenes.roles,
      equivalent: "De gauche à droite : production, circulateur sur le départ, émetteur, puis conduites de retour. Chaque élément porte un nom et un rôle distinct.",
      control: "roles"
    },
    {
      short: "Énergie", kicker: "5 · Relier", title: "Ce qui change au passage de l’émetteur",
      lead: "Dans cet exemple de chauffage, l’eau transporte de l’énergie vers la pièce.",
      body: ["L’émetteur transfère une partie de cette énergie à la pièce. L’eau revient ensuite vers la production.", "Le départ et le retour restent les deux parties du même circuit hydraulique."],
      key: "La clé : l’eau circule dans la boucle ; l’énergie est transférée à la pièce.",
      cap: "Repère l’émetteur, là où la chaleur part.",
      tp: "Distingue le trajet de l’eau du transfert d’énergie.",
      bts: "Ne confonds pas conservation du débit dans la boucle et bilan énergétique de l’émetteur.",
      scene: scenes.transfer,
      equivalent: "Le départ conduit l’eau vers l’émetteur. Trois traits tiretés indiquent le transfert d’énergie vers la pièce. Le retour ramène l’eau vers la production.",
      control: "transfer"
    },
    {
      short: "Démonstration", kicker: "6 · Regarder d’abord", title: "Observe la construction complète",
      lead: "La solution est affichée avant de te demander de la reproduire.",
      body: ["La démonstration suit l’ordre : production, départ, émetteur, retour.", "Regarde comment chaque fonction occupe une partie du même trajet continu."],
      key: "La clé : tu n’as rien à deviner sur cet écran ; observe l’ordre et le sens.",
      cap: "Repère les quatre mots pendant la démonstration.",
      tp: "Répète les quatre mots pendant la démonstration.",
      bts: "Repère le point de départ choisi et la convention de sens.",
      scene: scenes.construction,
      equivalent: "La solution complète reste visible : 1 production, 2 départ, 3 émetteur, 4 retour. L’animation met successivement ces quatre repères en évidence.",
      control: "construction"
    },
    {
      short: "Essai guidé", kicker: "7 · Manipuler avec aide", title: "À toi, sans score",
      lead: "Reproduis le trajet. Tu peux demander un indice ou afficher la solution.",
      body: ["Choisis une fonction, puis sa place. Vérifie quand les quatre places sont remplies.", "Une erreur ne retire aucun point : elle sert à retrouver le premier tronçon à corriger."],
      key: "La clé : l’entraînement vient avant les questions finales.",
      cap: "Suis l’aide affichée pour remettre les mots en ordre.",
      tp: "Reconstruis le trajet avec l’aide disponible.",
      bts: "Justifie l’ordre fonctionnel avant de poursuivre.",
      scene: "",
      equivalent: "Exercice guidé : quatre fonctions doivent être placées dans l’ordre production, départ, émetteur, retour. La solution peut être affichée sans pénalité.",
      control: "practice"
    },
    {
      short: "Synthèse", kicker: "8 · Retenir", title: "Tu as d’abord vu, puis manipulé",
      lead: "La boucle étudiée est maintenant complète et expliquée.",
      body: ["Production → départ → émetteur → retour : ce trajet revient à son point de départ.", "Les flèches donnent le sens. Les mots et les styles de trait gardent l’information lisible sans dépendre de la couleur."],
      key: "La clé : la note viendra une seule fois, dans la station Évaluation située à la fin de la ligne P.",
      cap: "Nomme le trajet à voix haute avant la station Énergie.",
      tp: "Décris oralement le trajet avant de passer à la station Énergie.",
      bts: "Énonce la frontière et les limites de ce modèle fonctionnel.",
      scene: scenes.summary,
      equivalent: "Synthèse complète : la production, le départ, l’émetteur et le retour forment un trajet continu. Un circulateur permet la circulation sur la boucle.",
      control: "summary"
    }
  ];

  let current = 0;
  let furthest = 0;
  let level = "TP";
  let demoTimers = [];
  let flowFrame = 0;
  let flowPlaying = false;
  let flowProgress = 0;
  let flowLastTime = 0;
  let speechRun = 0;
  let speaking = false;
  let paused = false;
  let selectedPart = null;
  let placedParts = [null, null, null, null];
  let practiceComplete = false;

  const els = {
    progress: $("#courseProgress"),
    stepKicker: $("#stepKicker"),
    stepTitle: $("#stepTitle"),
    stepLead: $("#stepLead"),
    stepBody: $("#stepBody"),
    levelNote: $("#levelNote"),
    keyBox: $("#keyBox"),
    controls: $("#lessonControls"),
    scene: $("#scene"),
    equivalent: $("#sceneEquivalent"),
    prev: $("#prevLesson"),
    next: $("#nextLesson"),
    count: $("#stepCount"),
    listen: $("#listenButton"),
    stopVoice: $("#stopVoiceButton"),
    voiceStatus: $("#voiceStatus")
  };

  function renderProgress() {
    els.progress.innerHTML = lessons.map((lesson, index) => {
      const done = index <= furthest && index !== current;
      const disabled = index > furthest;
      return `<button type="button" data-step="${index}" class="${done ? "done" : ""}" ${index === current ? 'aria-current="step"' : ""} ${disabled ? "disabled" : ""} aria-label="Étape ${index + 1} : ${lesson.short}"><span class="progress-number">${index + 1}</span><span class="progress-label">${lesson.short}</span></button>`;
    }).join("");
    $$('[data-step]', els.progress).forEach((button) => button.addEventListener("click", () => {
      const target = Number(button.dataset.step);
      if (target <= furthest) {
        current = target;
        renderLesson();
      }
    }));
  }

  function clearDemoTimers() {
    demoTimers.forEach((timer) => clearTimeout(timer));
    demoTimers = [];
    els.scene.classList.remove("sequence-running");
    $$(".demo-group, .energy-ray", els.scene).forEach((item) => item.classList.remove("is-current"));
  }

  function stopFlow() {
    if (flowFrame) cancelAnimationFrame(flowFrame);
    flowFrame = 0;
    flowPlaying = false;
    flowLastTime = 0;
  }

  function stopAnimations() {
    clearDemoTimers();
    stopFlow();
  }

  function stopSpeech(message = "Lecture arrêtée.") {
    speechRun += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    speaking = false;
    paused = false;
    els.listen.innerHTML = "▶ <span>Écouter</span>";
    els.listen.setAttribute("aria-label", "Écouter l’étape");
    els.stopVoice.disabled = true;
    if (message) els.voiceStatus.textContent = message;
  }

  function controlsFor(type) {
    if (type === "intro") return '<button id="runIntro" type="button">Voir le trajet se construire</button>';
    if (type === "flow") return '<button id="playFlow" type="button">▶ Lancer le trajet</button><button id="replayFlow" type="button">↺ Recommencer</button>';
    if (type === "roles") return '<button id="runRoles" type="button">Montrer les rôles un par un</button>';
    if (type === "transfer") return '<button id="runTransfer" type="button">Voir eau puis énergie</button>';
    if (type === "construction") return '<button id="runConstruction" type="button">Lancer la démonstration</button>';
    if (type === "practice") return '<button id="practiceHint" type="button">Donner un indice</button><button id="practiceSolution" type="button">Afficher la solution</button><button id="practiceCheck" class="primary" type="button">Vérifier sans score</button>';
    if (type === "summary") return '<button id="summaryNext" class="accent" type="button">Station suivante : Énergie</button>';
    return "";
  }

  function renderPractice() {
    const names = ["Production", "Départ", "Émetteur", "Retour"];
    els.scene.innerHTML = `<div class="practice-shell">
      <div class="practice-diagram">
        <svg viewBox="0 0 720 240" role="img" aria-labelledby="practiceTitle practiceDesc">
          <title id="practiceTitle">Boucle à compléter avec quatre fonctions</title>
          <desc id="practiceDesc">Quatre positions numérotées suivent une boucle fermée. Les fonctions doivent être placées dans l’ordre production, départ, émetteur, retour.</desc>
          <path d="M115 58H605Q675 58 675 120T605 182H115Q45 182 45 120T115 58" fill="none" stroke="#1b3a63" stroke-width="13"/>
          <path d="M190 58H500" fill="none" stroke="#c9451a" stroke-width="6" marker-end="url(#practiceArrow)"/>
          <defs><marker id="practiceArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker></defs>
          ${[[70,120],[360,58],[650,120],[360,182]].map((point, index) => `<g><circle cx="${point[0]}" cy="${point[1]}" r="28" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text id="practiceSlotText${index}" x="${point[0]}" y="${point[1] + 5}" text-anchor="middle" font-size="12" font-weight="900" fill="#10233c">${index + 1}</text></g>`).join("")}
          <text x="360" y="130" text-anchor="middle" class="svg-label">TRAJET FERMÉ</text>
        </svg>
      </div>
      <div class="practice-choices" aria-label="Fonctions à placer">${names.map((name) => `<button type="button" data-part="${name}" aria-pressed="false">${name}</button>`).join("")}</div>
      <div class="practice-slots" aria-label="Positions du trajet">${names.map((_, index) => `<button type="button" data-slot="${index}">Place ${index + 1}</button>`).join("")}</div>
      <p id="practiceFeedback" class="practice-feedback" aria-live="polite">Commence par la fonction qui transmet l’énergie à l’eau.</p>
    </div>`;
    wirePractice();
    renderPracticeState();
  }

  function renderPracticeState() {
    $$('[data-part]', els.scene).forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.part === selectedPart)));
    $$('[data-slot]', els.scene).forEach((button, index) => {
      button.textContent = placedParts[index] ? `${index + 1} · ${placedParts[index]}` : `Place ${index + 1}`;
      const text = $(`#practiceSlotText${index}`, els.scene);
      if (text) text.textContent = placedParts[index] ? `${index + 1} ${placedParts[index]}` : String(index + 1);
    });
  }

  function setPracticeFeedback(text, kind = "") {
    const feedback = $("#practiceFeedback", els.scene);
    if (!feedback) return;
    feedback.textContent = text;
    feedback.className = `practice-feedback ${kind}`.trim();
  }

  function wirePractice() {
    $$('[data-part]', els.scene).forEach((button) => button.addEventListener("click", () => {
      selectedPart = button.dataset.part;
      setPracticeFeedback(`Fonction choisie : ${selectedPart}. Place-la maintenant sur le trajet.`);
      renderPracticeState();
    }));
    $$('[data-slot]', els.scene).forEach((button) => button.addEventListener("click", () => {
      if (!selectedPart) {
        setPracticeFeedback("Choisis d’abord une fonction. Tu peux demander un indice.", "error");
        return;
      }
      const oldIndex = placedParts.indexOf(selectedPart);
      if (oldIndex >= 0) placedParts[oldIndex] = null;
      placedParts[Number(button.dataset.slot)] = selectedPart;
      selectedPart = null;
      practiceComplete = false;
      setPracticeFeedback("Fonction placée. Continue, puis vérifie sans score.");
      renderPracticeState();
      updateNavigation();
    }));
  }

  function runSequence(ids, messages, delay = 950) {
    clearDemoTimers();
    els.scene.classList.add("sequence-running");
    ids.forEach((id, index) => {
      demoTimers.push(setTimeout(() => {
        $$(".demo-group, .energy-ray", els.scene).forEach((item) => item.classList.remove("is-current"));
        const target = $(`#${id}`, els.scene);
        if (target) target.classList.add("is-current");
        if (id === "transfer-room") $$(".energy-ray", els.scene).forEach((ray) => ray.classList.add("is-current"));
        els.equivalent.textContent = `${lessons[current].equivalent} Animation : ${messages[index]}`;
      }, index * delay));
    });
    demoTimers.push(setTimeout(() => {
      clearDemoTimers();
      els.equivalent.textContent = lessons[current].equivalent;
    }, ids.length * delay + 400));
  }

  function positionFlowMarker(progress) {
    const path = $("#loopPath", els.scene);
    const marker = $("#waterMarker", els.scene);
    if (!path || !marker) return;
    const point = path.getPointAtLength(path.getTotalLength() * progress);
    marker.setAttribute("transform", `translate(${point.x} ${point.y})`);
  }

  function flowMessage(progress) {
    if (progress < .25) return "1. L’eau quitte la production et suit le départ.";
    if (progress < .5) return "2. L’eau arrive à l’émetteur de la pièce.";
    if (progress < .75) return "3. Après l’émetteur, l’eau emprunte le retour.";
    return "4. L’eau revient à la production : la boucle est fermée.";
  }

  function animateFlow(time) {
    if (!flowPlaying) return;
    if (!flowLastTime) flowLastTime = time;
    const elapsed = time - flowLastTime;
    flowLastTime = time;
    flowProgress = Math.min(1, flowProgress + elapsed / 9000);
    positionFlowMarker(flowProgress);
    els.equivalent.textContent = `${lessons[current].equivalent} Animation : ${flowMessage(flowProgress)}`;
    if (flowProgress >= 1) {
      flowPlaying = false;
      flowFrame = 0;
      const play = $("#playFlow");
      if (play) play.textContent = "▶ Rejouer le trajet";
      return;
    }
    flowFrame = requestAnimationFrame(animateFlow);
  }

  function toggleFlow() {
    const play = $("#playFlow");
    if (flowPlaying) {
      stopFlow();
      if (play) play.textContent = "▶ Reprendre";
      return;
    }
    if (flowProgress >= 1) flowProgress = 0;
    flowPlaying = true;
    flowLastTime = 0;
    if (play) play.textContent = "Ⅱ Pause";
    flowFrame = requestAnimationFrame(animateFlow);
  }

  function wireControls(type) {
    if (type === "intro") $("#runIntro").addEventListener("click", () => runSequence(
      ["need-production", "need-depart", "need-emitter", "need-room", "need-return"],
      ["La production transmet de l’énergie à l’eau.", "Le départ conduit l’eau vers l’émetteur.", "L’eau traverse l’émetteur.", "Une partie de l’énergie est transférée à la pièce.", "Le retour ramène l’eau vers la production."]
    ));
    if (type === "flow") {
      positionFlowMarker(flowProgress);
      $("#playFlow").addEventListener("click", toggleFlow);
      $("#replayFlow").addEventListener("click", () => {
        stopFlow();
        flowProgress = 0;
        positionFlowMarker(0);
        els.equivalent.textContent = lessons[current].equivalent;
        $("#playFlow").textContent = "▶ Lancer le trajet";
      });
    }
    if (type === "roles") $("#runRoles").addEventListener("click", () => runSequence(
      ["role-production", "role-circulator", "role-emitter", "role-pipes"],
      ["La production transmet de l’énergie.", "Le circulateur permet la circulation dans le réseau.", "L’émetteur transfère une partie de l’énergie à la pièce.", "Les conduites ferment le trajet."]
    ));
    if (type === "transfer") $("#runTransfer").addEventListener("click", () => runSequence(
      ["transfer-depart", "transfer-emitter", "transfer-room", "transfer-return"],
      ["L’eau suit le départ.", "Elle traverse l’émetteur.", "Une partie de l’énergie est transférée à la pièce.", "L’eau suit le retour vers la production."]
    ));
    if (type === "construction") $("#runConstruction").addEventListener("click", () => runSequence(
      ["build-1", "build-2", "build-3", "build-4"],
      ["1. Production.", "2. Départ.", "3. Émetteur.", "4. Retour : la boucle est fermée."]
    ));
    if (type === "practice") {
      $("#practiceHint").addEventListener("click", () => {
        const firstEmpty = placedParts.findIndex((part) => !part);
        const hints = ["Commence par Production.", "Après la production vient le Départ.", "Le Départ conduit vers l’Émetteur.", "Après l’émetteur, place le Retour."];
        setPracticeFeedback(firstEmpty >= 0 ? hints[firstEmpty] : "Les quatre places sont remplies. Vérifie le trajet.");
      });
      $("#practiceSolution").addEventListener("click", () => {
        placedParts = ["Production", "Départ", "Émetteur", "Retour"];
        selectedPart = null;
        practiceComplete = true;
        renderPracticeState();
        setPracticeFeedback("Solution montrée : Production → Départ → Émetteur → Retour. Relis-la, puis continue.", "good");
        updateNavigation();
      });
      $("#practiceCheck").addEventListener("click", () => {
        const correct = ["Production", "Départ", "Émetteur", "Retour"];
        const firstError = correct.findIndex((part, index) => placedParts[index] !== part);
        if (firstError < 0) {
          practiceComplete = true;
          setPracticeFeedback("Trajet correct : la boucle est continue. Tu peux maintenant passer à la synthèse.", "good");
        } else {
          practiceComplete = false;
          setPracticeFeedback(`À revoir à la place ${firstError + 1}. Utilise l’indice ou affiche la solution.`, "error");
        }
        updateNavigation();
      });
    }
    if (type === "summary") $("#summaryNext").addEventListener("click", () => { window.location.href = "../energie/index.html?line=P"; });
  }

  function updateNavigation() {
    els.prev.disabled = current === 0;
    const isPractice = lessons[current].control === "practice";
    const isSummary = lessons[current].control === "summary";
    els.next.disabled = isSummary || (isPractice && !practiceComplete);
    els.next.textContent = current === lessons.length - 2 ? "Voir la synthèse" : "Continuer";
    els.count.textContent = `${current + 1} / ${lessons.length}`;
  }

  function renderLesson() {
    stopAnimations();
    stopSpeech("");
    document.body.classList.remove("assessment-mode");
    els.listen.disabled = !("speechSynthesis" in window);
    const lesson = lessons[current];
    els.stepKicker.textContent = lesson.kicker;
    els.stepTitle.textContent = lesson.title;
    els.stepLead.textContent = lesson.lead;
    els.stepBody.innerHTML = lesson.body.map((paragraph) => `<p>${paragraph}</p>`).join("");
    els.levelNote.innerHTML = `<strong>${level === "CAP" ? "CAP" : level === "TP" ? "Bac pro" : "BTS"} :</strong> ${lesson[level.toLowerCase()] || lesson.tp}`;
    els.keyBox.textContent = lesson.key;
    els.controls.innerHTML = controlsFor(lesson.control);
    els.scene.innerHTML = lesson.control === "practice" ? "" : lesson.scene;
    els.equivalent.textContent = lesson.equivalent;
    if (lesson.control === "practice") renderPractice();
    wireControls(lesson.control);
    renderProgress();
    updateNavigation();
    requestAnimationFrame(() => els.stepTitle.focus({ preventScroll: true }));
  }

  function bestFrenchVoice() {
    const voices = window.speechSynthesis.getVoices();
    const score = (voice) => {
      const language = (voice.lang || "").toLowerCase();
      const name = (voice.name || "").toLowerCase();
      let value = language === "fr-fr" ? 100 : language.startsWith("fr") ? 60 : 0;
      if (/natural|naturel|neural|online|google|microsoft/.test(name)) value += 25;
      return value;
    };
    return voices.sort((a, b) => score(b) - score(a))[0] || null;
  }

  function currentVisibleText() {
    return [els.stepTitle.innerText, els.stepLead.innerText, els.stepBody.innerText, els.levelNote.innerText, els.keyBox.innerText, els.equivalent.innerText].filter(Boolean).join(". ");
  }

  function speakCurrent() {
    if (!("speechSynthesis" in window)) return;
    if (speaking && paused) {
      window.speechSynthesis.resume();
      paused = false;
      els.listen.innerHTML = "Ⅱ <span>Pause</span>";
      els.listen.setAttribute("aria-label", "Mettre la lecture en pause");
      els.voiceStatus.textContent = "Lecture reprise.";
      return;
    }
    if (speaking) {
      window.speechSynthesis.pause();
      paused = true;
      els.listen.innerHTML = "▶ <span>Reprendre</span>";
      els.listen.setAttribute("aria-label", "Reprendre la lecture");
      els.voiceStatus.textContent = "Lecture en pause.";
      return;
    }
    stopSpeech("");
    const run = speechRun;
    const utterance = new SpeechSynthesisUtterance(currentVisibleText());
    utterance.lang = "fr-FR";
    utterance.rate = .95;
    utterance.pitch = 1;
    const voice = bestFrenchVoice();
    if (voice) utterance.voice = voice;
    utterance.onstart = () => {
      if (run !== speechRun) return;
      speaking = true;
      paused = false;
      els.listen.innerHTML = "Ⅱ <span>Pause</span>";
      els.listen.setAttribute("aria-label", "Mettre la lecture en pause");
      els.stopVoice.disabled = false;
      els.voiceStatus.textContent = "Lecture de l’étape en cours.";
    };
    utterance.onend = () => {
      if (run !== speechRun) return;
      speaking = false;
      paused = false;
      els.listen.innerHTML = "▶ <span>Écouter</span>";
      els.listen.setAttribute("aria-label", "Écouter l’étape");
      els.stopVoice.disabled = true;
      els.voiceStatus.textContent = "Lecture terminée.";
    };
    utterance.onerror = (event) => {
      if (run !== speechRun || event.error === "canceled" || event.error === "interrupted") return;
      speaking = false;
      paused = false;
      els.listen.innerHTML = "▶ <span>Écouter</span>";
      els.stopVoice.disabled = true;
      els.voiceStatus.textContent = "Voix indisponible. Tout le contenu reste écrit.";
    };
    window.speechSynthesis.speak(utterance);
  }

  els.prev.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      renderLesson();
    }
  });

  els.next.addEventListener("click", () => {
    if (current >= lessons.length - 1 || els.next.disabled) return;
    current += 1;
    furthest = Math.max(furthest, current);
    renderLesson();
  });

  $$('[data-level]').forEach((button) => button.addEventListener("click", () => {
    level = button.dataset.level;
    $$('[data-level]').forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    renderLesson();
  }));

  els.listen.addEventListener("click", speakCurrent);
  els.stopVoice.addEventListener("click", () => stopSpeech());

  document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    if (["BUTTON", "INPUT", "SELECT", "A"].includes(tag)) return;
    if (event.key === "ArrowLeft" && !els.prev.disabled) els.prev.click();
    if (event.key === "ArrowRight" && !els.next.disabled) els.next.click();
    if (event.key === "Escape") window.location.href = "../../index.html#visited=boucle";
  });

  document.addEventListener("hydro:assessment-start", () => {
    stopAnimations();
    stopSpeech("");
    document.body.classList.add("assessment-mode");
    $$('button', els.progress).forEach((button) => { button.disabled = true; });
    els.prev.disabled = true;
    els.next.disabled = true;
    els.listen.disabled = true;
    els.stopVoice.disabled = true;
  });

  document.addEventListener("hydro:return-course", () => {
    document.body.classList.remove("assessment-mode");
    renderLesson();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimations();
      stopSpeech("");
    }
  });
  window.addEventListener("pagehide", () => stopSpeech(""));
  window.addEventListener("beforeunload", () => stopSpeech(""));

  if (!("speechSynthesis" in window)) {
    els.listen.disabled = true;
    els.stopVoice.disabled = true;
    els.voiceStatus.textContent = "Voix indisponible. Tout le contenu reste écrit.";
  }

  renderLesson();
})();
