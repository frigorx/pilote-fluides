"use strict";

(() => {
  /* la vue 3D de l’installation, dans son panneau à côté du schéma (le schéma sort seul à l’impression) */
  const CLE_3D = ((document.currentScript && document.currentScript.src) || "").replace(/^[^?]*/, "");
  const vue3d = (el, spec) => {
    const go = () => window.HydroVue3D.brancher(el, spec);
    if (window.HydroVue3D) return go();
    const sc = document.createElement("script"); sc.src = "../_commun/3d/station3d.js" + CLE_3D; sc.onload = go; document.head.appendChild(sc);
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const shell = HydroStation.init({
    title: "Boucle",
    nextHref: "../energie/index.html",
    nextLabel: "Station suivante : Énergie",
    successMessage: "Vous savez suivre un trajet fermé et distinguer production, départ, émetteur et retour.",
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

  /* LES SCÈNES (04/10/2026) — format 640 × 512, presque carré : le schéma tient À CÔTÉ de la vue 3D
     et ses mots restent à 14 pt (24 unités, ≥ 18,7 px à 1280 px). Les tubes ne se dessinent plus
     ici : chaque scène les DÉCLARE (eaux, plus bas) et le moteur commun _commun/ecoulement.js y fait
     couler l'eau — chaude au départ, froide au retour —, fait tourner le circulateur et ouvrir les
     vannes au clic. Les flèches de convention (départ plein orange, retour en tirets) restent
     dessinées par-dessus l'eau : le sens se lit sans la couleur. Aucun mot ne touche un tracé :
     les noms sont dans les boîtes ou sur des cartouches. */
  const svgShell = (id, title, desc, body) => `
    <svg id="${id}" viewBox="0 0 640 512" role="img" aria-labelledby="${id}-title ${id}-desc">
      <title id="${id}-title">${title}</title>
      <desc id="${id}-desc">${desc}</desc>
      <defs>
        <marker id="arrow-${id}" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1b3a63"/></marker>
        <marker id="orange-${id}" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker>
      </defs>
      <rect x="8" y="8" width="624" height="496" rx="22" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
      ${body}
    </svg>`;

  /* la production : la flamme, puis son nom, dans la même boîte (160 × 110) */
  const production = (id, x, y, plus = "") => `
    <g id="${id}" class="demo-group">
      <rect x="${x}" y="${y}" width="160" height="110" rx="16" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="7 5"/>
      <path transform="translate(${x + 26.5} ${y - 11})" d="M42 70C24 48 58 40 47 20C82 42 63 52 83 71" fill="none" stroke="#c9451a" stroke-width="7" stroke-linecap="round"/>
      <text x="${x + 80}" y="${y + 97}" class="eti" text-anchor="middle">PRODUCTION</text>${plus}
    </g>`;

  /* l'émetteur : le radiateur, puis son nom (136 × 124) */
  const emitter = (id, x, y) => `
    <g id="${id}" class="demo-group">
      <rect x="${x}" y="${y}" width="136" height="124" rx="16" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/>
      <image href="assets/radiateur.svg" x="${x + 20}" y="${y + 8}" width="96" height="72"/>
      <text x="${x + 68}" y="${y + 110}" class="eti" text-anchor="middle">ÉMETTEUR</text>
    </g>`;

  /* le circulateur : le symbole de la bibliothèque (son cercle a le rayon r), tourné d'un quart de
     tour pour que son triangle regarde la sortie, dans le sens de l'eau. L'eau qui tourne dans son
     corps est posée par le moteur (circulateurs : { x, y, r }). */
  const pompe = (x, y, r) => `<image href="assets/pompe_debit_variable.svg" x="${x - 1.7 * r}" y="${y - 1.7 * r}" width="${3 * r}" height="${3.5 * r}" transform="rotate(90 ${x} ${y})"/>`;

  /* une étiquette sur cartouche : posée sur la boucle, elle ne touche aucun tracé */
  const cartouche = (cx, y, largeur, lignes, fond = "#fffdf8", trait = "#1b3a63", epaisseur = 3) => `
    <rect x="${cx - largeur / 2}" y="${y}" width="${largeur}" height="${14 + 32 * lignes.length}" rx="12" fill="${fond}" stroke="${trait}" stroke-width="${epaisseur}"/>${
    lignes.map((ligne, i) => `<text x="${cx}" y="${y + 34 + 32 * i}" class="${i ? "eti-2" : "eti"}" text-anchor="middle">${ligne}</text>`).join("")}`;

  /* la boucle des étapes 2, 3, 4 et 8 : la production sur le côté gauche, l'émetteur sur le côté droit */
  const DEPART = "M100 205V190Q100 150 140 150H494Q534 150 534 190V198";
  const RETOUR = "M534 322V340Q534 380 494 380H140Q100 380 100 340V315";
  const loopPath = "M100 205V190Q100 150 140 150H494Q534 150 534 190V340Q534 380 494 380H140Q100 380 100 340V205";
  const boucle = (pompes) => ({ tubes: [{ d: DEPART, eau: "chaude" }, { d: RETOUR, eau: "froide" }], circulateurs: pompes });

  const scenes = {
    need: svgShell(
      "needScene",
      "Une boucle de chauffage transporte de l’énergie",
      "La production transmet de l’énergie à l’eau. L’eau chaude va vers un émetteur dans une pièce, puis revient plus froide par le même circuit fermé.",
      `${production("need-production", 24, 196, `<text x="118" y="342" class="eti-2" text-anchor="middle">donne de l’énergie</text>`)}
       <g id="need-depart" class="demo-group"><path d="M190 228H446" class="svg-depart" marker-end="url(#orange-needScene)"/><text x="325" y="204" class="eti" text-anchor="middle">DÉPART →</text></g>
       ${emitter("need-emitter", 466, 190)}
       <g id="need-room" class="demo-group"><path d="M534 180V114" stroke="#c9451a" stroke-width="5" stroke-dasharray="7 7" marker-end="url(#orange-needScene)"/><text x="534" y="92" class="eti" text-anchor="middle">PIÈCE</text></g>
       <g id="need-return" class="demo-group"><path d="M460 276H204" class="svg-return" marker-end="url(#arrow-needScene)"/><text x="325" y="322" class="eti" text-anchor="middle">← RETOUR</text></g>
       <text x="320" y="452" class="eti-2" text-anchor="middle">Exemple simplifié d’un circuit de chauffage fermé</text>`
    ),
    closed: svgShell(
      "closedScene",
      "Un trajet fermé revient à son point de départ",
      "Le départ part de la production, passe par une vanne et le circulateur, et arrive à l’émetteur. Le retour, avec sa vanne, ramène la même eau à la production. Fermer une seule vanne arrête l’eau partout.",
      `${production("closed-production", 20, 205)}
       ${emitter("closed-emitter", 466, 198)}
       ${pompe(290, 150, 26)}
       <path d="M326 150H474" class="svg-depart" marker-end="url(#orange-closedScene)"/>
       <path d="M474 380H214" class="svg-return" marker-end="url(#arrow-closedScene)"/>
       <text x="380" y="100" class="eti" text-anchor="middle">DÉPART → vers l’émetteur</text>
       <text x="400" y="446" class="eti" text-anchor="middle">← RETOUR vers la production</text>
       <text x="180" y="124" class="eti" text-anchor="middle">VANNE</text>
       <text x="180" y="426" class="eti" text-anchor="middle">VANNE</text>
       ${cartouche(290, 186, 180, ["CIRCULATEUR"])}
       ${cartouche(323, 248, 250, ["BOUCLE FERMÉE", "trajet continu"], "#e3f5ec", "#1e7e54", 6)}`
    ),
    flow: svgShell(
      "flowScene",
      "Le trajet animé d’un repère d’eau",
      "Le repère EAU part de la production, suit le départ, traverse l’émetteur, puis revient par le retour jusqu’à la production.",
      `<path id="loopPath" d="${loopPath}" fill="none" stroke="none"/>
       ${production("flow-production", 20, 205)}
       ${emitter("flow-emitter", 466, 198)}
       ${pompe(290, 150, 26)}
       <path d="M326 150H474" class="svg-depart" marker-end="url(#orange-flowScene)"/>
       <path d="M474 380H160" class="svg-return" marker-end="url(#arrow-flowScene)"/>
       <g><circle cx="190" cy="150" r="18" fill="#fffdf8" stroke="#c9451a" stroke-width="4"/><text x="190" y="158" class="eti" text-anchor="middle">1</text></g>
       <g><circle cx="534" cy="178" r="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="534" y="186" class="eti" text-anchor="middle">2</text></g>
       <g><circle cx="420" cy="380" r="18" fill="#fffdf8" stroke="#3d7fca" stroke-width="4"/><text x="420" y="388" class="eti" text-anchor="middle">3</text></g>
       <g><circle cx="100" cy="346" r="18" fill="#fffdf8" stroke="#1e7e54" stroke-width="4"/><text x="100" y="354" class="eti" text-anchor="middle">4</text></g>
       <g id="waterMarker" class="flow-water"><circle r="27" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text y="8" class="eti" text-anchor="middle">EAU</text></g>`
    ),
    roles: svgShell(
      "rolesScene",
      "Les organes ont des fonctions différentes",
      "La production transmet de l’énergie, le circulateur fait circuler l’eau sans la chauffer, l’émetteur transmet une partie de l’énergie à la pièce et les conduites ferment le trajet.",
      `${production("role-production", 20, 205)}
       <g id="role-circulator" class="demo-group">${pompe(290, 150, 30)}${cartouche(290, 194, 200, ["CIRCULATEUR", "permet le débit"])}</g>
       ${emitter("role-emitter", 466, 198)}
       <g id="role-pipes" class="demo-group"><path d="M334 150H474" class="svg-depart" marker-end="url(#orange-rolesScene)"/><path d="M474 380H160" class="svg-return" marker-end="url(#arrow-rolesScene)"/><text x="317" y="446" class="eti" text-anchor="middle">CONDUITES : fermer le trajet</text></g>`
    ),
    transfer: svgShell(
      "transferScene",
      "L’eau transporte de l’énergie dans un circuit de chauffage",
      "Le départ conduit l’eau chaude vers l’émetteur. L’émetteur transmet une partie de l’énergie à la pièce. Le retour ramène l’eau, plus froide, vers la production.",
      `${production("transfer-production", 24, 210)}
       <g id="transfer-depart" class="demo-group"><path d="M190 240H458" class="svg-depart" marker-end="url(#orange-transferScene)"/><text x="300" y="186" class="eti" text-anchor="middle">DÉPART : eau vers l’émetteur</text></g>
       ${emitter("transfer-emitter", 476, 202)}
       <g id="transfer-room" class="demo-group"><path class="energy-ray" d="M520 192L504 132" stroke="#c9451a" stroke-width="5" stroke-dasharray="5 6"/><path class="energy-ray" d="M544 190V124" stroke="#c9451a" stroke-width="5" stroke-dasharray="5 6"/><path class="energy-ray" d="M568 192L584 132" stroke="#c9451a" stroke-width="5" stroke-dasharray="5 6"/><text x="614" y="100" class="eti" text-anchor="end">ÉNERGIE VERS LA PIÈCE</text></g>
       <g id="transfer-return" class="demo-group"><path d="M470 296H202" class="svg-return" marker-end="url(#arrow-transferScene)"/><text x="300" y="352" class="eti" text-anchor="middle">RETOUR : eau vers la production</text></g>
       ${cartouche(320, 384, 440, ["L’EAU RESTE DANS LE CIRCUIT", "elle transporte l’énergie"])}`
    ),
    construction: svgShell(
      "constructionScene",
      "Construction démontrée dans l’ordre",
      "Les quatre repères sont déjà visibles. La démonstration les met en évidence dans l’ordre production, départ, émetteur, retour.",
      `<g id="build-1" class="demo-group"><rect x="30" y="226" width="200" height="78" rx="15" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="7 5"/><text x="130" y="258" class="eti" text-anchor="middle">1 · PRODUCTION</text><text x="130" y="290" class="eti-2" text-anchor="middle">point de départ</text></g>
       <g id="build-2" class="demo-group"><rect x="228" y="122" width="184" height="56" rx="15" fill="#fffdf8" stroke="#c9451a" stroke-width="4"/><text x="320" y="159" class="eti" text-anchor="middle">2 · DÉPART →</text></g>
       <g id="build-3" class="demo-group"><rect x="410" y="226" width="200" height="78" rx="15" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/><text x="510" y="258" class="eti" text-anchor="middle">3 · ÉMETTEUR</text><text x="510" y="290" class="eti-2" text-anchor="middle">usage</text></g>
       <g id="build-4" class="demo-group"><rect x="228" y="352" width="184" height="56" rx="15" fill="#fffdf8" stroke="#3d7fca" stroke-width="4" stroke-dasharray="10 7"/><text x="320" y="389" class="eti" text-anchor="middle">4 · ← RETOUR</text></g>
       <text x="320" y="458" class="eti" text-anchor="middle">LA CONTINUITÉ FERME LA BOUCLE</text>`
    ),
    summary: svgShell(
      "summaryScene",
      "Synthèse de la boucle de chauffage",
      "Production, départ, émetteur et retour forment un trajet continu. Un circulateur fait circuler l’eau. Le départ et le retour appartiennent au même circuit.",
      `${production("summary-production", 20, 205)}
       ${emitter("summary-emitter", 466, 198)}
       ${pompe(290, 150, 26)}
       <path d="M326 150H474" class="svg-depart" marker-end="url(#orange-summaryScene)"/>
       <path d="M474 380H160" class="svg-return" marker-end="url(#arrow-summaryScene)"/>
       <text x="410" y="116" class="eti" text-anchor="middle">DÉPART →</text><text x="410" y="430" class="eti" text-anchor="middle">← RETOUR</text>
       ${cartouche(323, 200, 250, ["TRAJET CONTINU", "l’eau revient", "à la production"], "#e3f5ec", "#1e7e54", 6)}`
    )
  };

  /* l'eau de chaque scène : ce que la station déclare au moteur commun (ses tubes, sa pompe, ses vannes) */
  const eaux = {
    need: { tubes: [{ d: "M184 228H466", eau: "chaude" }, { d: "M466 276H184", eau: "froide" }] },
    closed: Object.assign(boucle([{ x: 290, y: 150, r: 26 }]), {
      vannes: [{ id: "vd", x: 180, y: 150, nom: "vanne du départ" }, { id: "vr", x: 180, y: 380, nom: "vanne du retour" }]
    }),
    flow: boucle([{ x: 290, y: 150, r: 26 }]),
    roles: boucle([{ x: 290, y: 150, r: 30 }]),
    transfer: { tubes: [{ d: "M184 240H476", eau: "chaude" }, { d: "M476 296H184", eau: "froide" }] },
    construction: { tubes: [{ d: "M130 265V190Q130 150 170 150H470Q510 150 510 190V265", eau: "chaude" }, { d: "M510 265V340Q510 380 470 380H170Q130 380 130 340V265", eau: "froide" }] },
    summary: boucle([{ x: 290, y: 150, r: 26 }])
  };

  const lessons = [
    {
      short: "Besoin", narration: "Bienvenue, c'est ici que tout commence. La question du jour est simple : pourquoi fait-on une boucle ? Parce que la chaleur n'est presque jamais produite là où on en a besoin. Le générateur est à la cave, le besoin est dans les pièces. Il faut donc un porteur, et ce porteur c'est l'eau. Mais remarquez ceci : une fois qu'elle a livré sa chaleur, on ne la jette pas. Elle repart vers la production pour être réchauffée et recommencer. C'est un circuit fermé, et cette eau-là fera des milliers de tours. Toute l'hydraulique du bâtiment découle de ce choix.", kicker: "1 · Observer", title: "Pourquoi faire une boucle ?",
      lead: "Dans cet exemple de chauffage, l’eau transporte de l’énergie entre la production et la pièce.",
      body: ["La production transmet de l’énergie à l’eau. L’eau va jusqu’à l’émetteur, puis elle revient vers la production.", "L’eau n’est pas rejetée après l’émetteur : elle reste dans un circuit fermé."],
      key: "La clé : une boucle est un trajet continu qui revient à son point de départ.",
      cap: "Montrez la production, puis l’émetteur, sur le dessin.",
      tp: "Repérez où l’eau reçoit puis cède une partie de l’énergie.",
      bts: "Délimitez le système : production, distribution, émission et retour.",
      scene: scenes.need,
      eau: eaux.need,
      equivalent: "La production transmet de l’énergie à l’eau. Le départ conduit l’eau vers l’émetteur de la pièce. Le retour ramène ensuite l’eau à la production.",
      control: "intro"
    },
    {
      short: "Fermer", narration: "Voici le point qui doit être parfaitement clair avant d'aller plus loin. Le départ et le retour ne sont pas deux installations différentes. C'est le même trajet, la même eau, vue à deux moments de son parcours. Au départ, elle est chaude et part travailler. Au retour, elle est plus froide et revient se recharger. Beaucoup de débutants raisonnent comme s'il s'agissait de deux circuits séparés, et se retrouvent bloqués devant le moindre dépannage. La conséquence pratique est directe : si un seul tronçon est coupé quelque part, plus rien ne circule — nulle part.", kicker: "2 · Comprendre", title: "Départ et retour : un seul trajet",
      lead: "Le départ et le retour ne sont pas deux circuits indépendants.",
      body: ["Le départ emmène l’eau de la production vers l’émetteur. Le retour ramène cette même eau vers la production.", "Si un tronçon manque, le schéma ne démontre plus la continuité de la boucle."],
      key: "La clé : départ + usage + retour ferment le trajet.",
      cap: "Suivez la flèche du départ, puis celle du retour.",
      tp: "Suivez les flèches sans sauter de tronçon.",
      bts: "Distinguez la fonction des tronçons de leur position graphique.",
      scene: scenes.closed,
      eau: eaux.closed,
      equivalent: "Le tracé est fermé. Le départ est nommé et fléché vers l’émetteur. Le retour est nommé, dessiné en tirets et fléché vers la production.",
      control: "none"
    },
    {
      short: "Suivre", narration: "Lancez l'animation et suivez le repère qui fait le tour complet. Il quitte la production, emprunte le départ, traverse l'émetteur, puis revient par le retour. Ce que ce mouvement vous montre, et que le schéma figé ne dit pas, c'est la continuité : à aucun moment l'eau ne disparaît ni ne recommence ailleurs. C'est surtout à l'émetteur qu'il se passe quelque chose, car c'est le seul endroit où l'état de l'eau change vraiment. L'eau y laisse une partie de sa chaleur, et repart moins chaude. Vous pouvez mettre en pause pour observer ce passage.", kicker: "3 · Voir fonctionner", title: "Suivez la même eau sur tout le trajet",
      lead: "Lancez l’animation. Le repère EAU effectue un tour complet.",
      body: ["Il quitte la production, suit le départ, traverse l’émetteur, puis emprunte le retour.", "Vous pouvez mettre l’animation en pause ou la recommencer. Le texte décrit toujours ce qu’elle montre."],
      key: "La clé : après l’émetteur, l’eau continue vers le retour.",
      cap: "Nommez chaque partie quand le repère EAU passe.",
      tp: "Nommer chaque partie au passage du repère EAU.",
      bts: "Matérialisez le sens positif choisi pour le flux hydraulique.",
      scene: scenes.flow,
      eau: eaux.flow,
      equivalent: "État initial : le repère EAU se trouve au départ de la production. Le trajet complet est production, départ, émetteur, retour, puis production.",
      control: "flow"
    },
    {
      short: "Fonctions", narration: "Chaque élément de la boucle a une fonction, et une seule. La production donne de l'énergie à l'eau. Le circulateur la met en mouvement — attention, il ne la chauffe pas, il ne fait que la déplacer. L'émetteur transmet une partie de cette énergie à la pièce. Les conduites relient le tout et ferment le trajet. Cette distinction n'est pas du vocabulaire : c'est un outil de dépannage. Une pièce froide alors que l'eau du départ est brûlante n'est pas un problème de production. Savoir nommer les fonctions, c'est savoir où ne pas chercher.", kicker: "4 · Expliquer", title: "Chaque élément a un rôle différent",
      lead: "La production et le circulateur ne désignent pas la même fonction.",
      body: ["La production transmet de l’énergie à l’eau. Le circulateur permet le débit dans le réseau. L’émetteur transmet une partie de l’énergie à la pièce.", "Les conduites relient les fonctions et ferment le trajet."],
      key: "La clé : produire l’énergie, faire circuler l’eau et émettre dans la pièce sont trois rôles distincts.",
      cap: "Montrez la production, le circulateur, puis l’émetteur.",
      tp: "Associez chaque organe à sa fonction observable.",
      bts: "Séparez fonctions énergétiques et fonction hydraulique du circulateur.",
      scene: scenes.roles,
      eau: eaux.roles,
      equivalent: "De gauche à droite : production, circulateur sur le départ, émetteur, puis conduites de retour. Chaque élément porte un nom et un rôle distinct.",
      control: "roles"
    },
    {
      short: "Énergie", narration: "Arrêtons-nous sur ce qui change au passage de l'émetteur, car c'est le cœur du métier. L'eau arrive chaude, elle repart plus froide. Cette différence, ce n'est pas une perte : c'est exactement la chaleur qui a été livrée à la pièce. Autrement dit, l'écart entre le départ et le retour vous renseigne sur ce que l'installation a réellement transmis. Vous retrouverez cette idée à la station Écart, puis à la station Puissance, où l'on verra qu'il faut aussi connaître la quantité d'eau qui circule pour conclure.", kicker: "5 · Relier", title: "Ce qui change au passage de l’émetteur",
      lead: "Dans cet exemple de chauffage, l’eau transporte de l’énergie vers la pièce.",
      body: ["L’émetteur transfère une partie de cette énergie à la pièce. L’eau revient ensuite vers la production.", "Le départ et le retour restent les deux parties du même circuit hydraulique."],
      key: "La clé : l’eau circule dans la boucle ; l’énergie est transférée à la pièce.",
      cap: "Repérez l’émetteur, là où la chaleur part.",
      tp: "Distinguez le trajet de l’eau du transfert d’énergie.",
      bts: "Ne confondez pas conservation du débit dans la boucle et bilan énergétique de l’émetteur.",
      scene: scenes.transfer,
      eau: eaux.transfer,
      equivalent: "Le départ conduit l’eau vers l’émetteur. Trois traits tiretés indiquent le transfert d’énergie vers la pièce. Le retour ramène l’eau vers la production.",
      control: "transfer"
    },
    {
      short: "Démonstration", narration: "Vous découvrez d'abord la construction complète telle qu'elle doit être, avant qu'on vous demande de la refaire. L'ordre suit le trajet de l'eau : la production, puis le départ, puis l'émetteur, puis le retour. Ce n'est pas un ordre arbitraire à mémoriser — c'est simplement le chemin. Observez comment chaque fonction occupe une portion du même trajet continu, sans trou. Prenez le temps de cette observation : reproduire un montage qu'on a vraiment compris demande beaucoup moins d'efforts que retenir une suite de mots par cœur.", kicker: "6 · Regarder d’abord", title: "Observez la construction complète",
      lead: "La solution est affichée avant de vous demander de la reproduire.",
      body: ["La démonstration suit l’ordre : production, départ, émetteur, retour.", "Regardez comment chaque fonction occupe une partie du même trajet continu."],
      key: "La clé : vous n’avez rien à deviner sur cet écran ; observez l’ordre et le sens.",
      cap: "Repérez les quatre mots pendant la démonstration.",
      tp: "Répétez les quatre mots pendant la démonstration.",
      bts: "Repérez le point de départ choisi et la convention de sens.",
      scene: scenes.construction,
      eau: eaux.construction,
      equivalent: "La solution complète reste visible : 1 production, 2 départ, 3 émetteur, 4 retour. L’animation met successivement ces quatre repères en évidence.",
      control: "construction"
    },
    {
      short: "Essai guidé", narration: "À vous maintenant, sans note et sans score. Reproduisez le trajet en choisissant chaque fonction et sa place. Un indice reste disponible, et la solution aussi : les utiliser n'a aucune conséquence, ce n'est pas une évaluation. En cas d'erreur, mieux vaut ne pas tout reprendre au hasard : le bon réflexe consiste à repérer le premier endroit où le trajet se rompt, puis à corriger à partir de là. C'est déjà la méthode de diagnostic que vous emploierez sur une installation réelle : remonter le chemin de l'eau jusqu'au premier point qui ne va pas.", kicker: "7 · Manipuler avec aide", title: "À vous, sans score",
      lead: "Reproduisez le trajet. Vous pouvez demander un indice ou afficher la solution.",
      body: ["Choisissez une fonction, puis sa place. Vérifiez quand les quatre places sont remplies.", "Une erreur ne retire aucun point : elle sert à retrouver le premier tronçon à corriger."],
      key: "La clé : l’entraînement vient avant les questions finales.",
      cap: "Suivez l’aide affichée pour remettre les mots en ordre.",
      tp: "Reconstruisez le trajet avec l’aide disponible.",
      bts: "Justifiez l’ordre fonctionnel avant de poursuivre.",
      scene: "",
      equivalent: "Exercice guidé : quatre fonctions doivent être placées dans l’ordre production, départ, émetteur, retour. La solution peut être affichée sans pénalité.",
      control: "practice"
    },
    {
      short: "Synthèse", narration: "Faisons le point. Vous avez vu, puis manipulé. La boucle est maintenant complète : production, départ, émetteur, retour, et l'on revient au point de départ. Deux réflexes à emporter. Le premier : les flèches donnent le sens, et le sens ne s'invente pas, il se lit. Le second : ne vous fiez jamais à la seule couleur d'un schéma. Les mots et les styles de trait portent la même information, et sur une installation réelle, il n'y a ni rouge ni bleu — juste des tubes gris. Prochaine étape, la station Énergie : que transporte exactement cette eau ?", kicker: "8 · Retenir", title: "Vous avez d’abord vu, puis manipulé",
      lead: "La boucle étudiée est maintenant complète et expliquée.",
      body: ["Production → départ → émetteur → retour : ce trajet revient à son point de départ.", "Les flèches donnent le sens. Les mots et les styles de trait gardent l’information lisible sans dépendre de la couleur."],
      key: "La clé : la note viendra une seule fois, dans la station Évaluation située à la fin de la ligne P.",
      cap: "Nommez le trajet à voix haute avant la station Énergie.",
      tp: "Décrivez oralement le trajet avant de passer à la station Énergie.",
      bts: "Énoncez la frontière et les limites de ce modèle fonctionnel.",
      scene: scenes.summary,
      eau: eaux.summary,
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

  /* Repli local du réglage de débit : même plage, même pas, même défaut que
     moteur/reglage-voix.js (injecté seulement à la livraison), pour que l'atelier
     reste jouable seul. Sans stockage navigateur (l'atelier n'en a aucun) : le
     réglage vaut pour l'écran, il repart au défaut à chaque rechargement. */
  const reglageVoixLocal = (function () {
    const PAS = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4];
    const DEFAUT = 0.95;
    let vitesse = DEFAUT;
    function libelle(v) { return v.toFixed(2).replace(/0+$/, "").replace(/\.$/, "").replace(".", ",") + "×"; }
    function habiller() {
      if (document.getElementById("style-reglage-voix")) return;
      const style = document.createElement("style");
      style.id = "style-reglage-voix";
      style.textContent = ".reglage-voix{display:inline-flex;align-items:center;gap:.35rem;border:2px solid currentColor;"
        + "border-radius:999px;padding:.15rem .5rem;font:inherit;line-height:1}"
        + ".reglage-voix button{min-width:2rem;min-height:2rem;border:0;background:transparent;color:inherit;"
        + "font:inherit;font-size:1.15em;font-weight:700;cursor:pointer;border-radius:50%}"
        + ".reglage-voix button:disabled{opacity:.35;cursor:default}"
        + ".reglage-voix output{min-width:3.2em;text-align:center;font-variant-numeric:tabular-nums;font-weight:600}";
      document.head.appendChild(style);
    }
    return {
      vitesse: () => vitesse,
      monter(conteneur) {
        if (!conteneur || conteneur.querySelector("[data-voix-reglage]")) return;
        habiller();
        const bloc = document.createElement("div");
        bloc.className = "reglage-voix";
        bloc.setAttribute("data-voix-reglage", "");
        bloc.setAttribute("role", "group");
        bloc.setAttribute("aria-label", "Débit de la voix");
        bloc.innerHTML = '<button type="button" data-voix-moins aria-label="Parler moins vite">−</button>'
          + '<output aria-live="off">' + libelle(vitesse) + "</output>"
          + '<button type="button" data-voix-plus aria-label="Parler plus vite">+</button>';
        const sortie = bloc.querySelector("output");
        const moins = bloc.querySelector("[data-voix-moins]");
        const plus = bloc.querySelector("[data-voix-plus]");
        function rafraichir() {
          sortie.textContent = libelle(vitesse);
          moins.disabled = vitesse <= PAS[0];
          plus.disabled = vitesse >= PAS[PAS.length - 1];
        }
        function deplacer(sens) {
          let i = PAS.indexOf(vitesse); if (i === -1) i = PAS.indexOf(DEFAUT);
          const cible = Math.min(PAS.length - 1, Math.max(0, i + sens));
          if (PAS[cible] === vitesse) return;
          vitesse = PAS[cible];
          rafraichir();
          stopSpeech();
        }
        moins.addEventListener("click", () => deplacer(-1));
        plus.addEventListener("click", () => deplacer(1));
        rafraichir();
        conteneur.appendChild(bloc);
      }
    };
  })();

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
      <p id="practiceFeedback" class="practice-feedback" aria-live="polite">Commencez par la fonction qui transmet l’énergie à l’eau.</p>
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
      setPracticeFeedback(`Fonction choisie : ${selectedPart}. Placez-la maintenant sur le trajet.`);
      renderPracticeState();
    }));
    $$('[data-slot]', els.scene).forEach((button) => button.addEventListener("click", () => {
      if (!selectedPart) {
        setPracticeFeedback("Choisissez d’abord une fonction. Vous pouvez demander un indice.", "error");
        return;
      }
      const oldIndex = placedParts.indexOf(selectedPart);
      if (oldIndex >= 0) placedParts[oldIndex] = null;
      placedParts[Number(button.dataset.slot)] = selectedPart;
      selectedPart = null;
      practiceComplete = false;
      setPracticeFeedback("Fonction placée. Continuez, puis vérifiez sans score.");
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
      flowProgress = 0;
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
        const hints = ["Commencez par Production.", "Après la production vient le Départ.", "Le Départ conduit vers l’Émetteur.", "Après l’émetteur, placez le Retour."];
        setPracticeFeedback(firstEmpty >= 0 ? hints[firstEmpty] : "Les quatre places sont remplies. Vérifiez le trajet.");
      });
      $("#practiceSolution").addEventListener("click", () => {
        placedParts = ["Production", "Départ", "Émetteur", "Retour"];
        selectedPart = null;
        practiceComplete = true;
        renderPracticeState();
        setPracticeFeedback("Solution montrée : Production → Départ → Émetteur → Retour. Relisez-la, puis continuez.", "good");
        updateNavigation();
      });
      $("#practiceCheck").addEventListener("click", () => {
        const correct = ["Production", "Départ", "Émetteur", "Retour"];
        const firstError = correct.findIndex((part, index) => placedParts[index] !== part);
        if (firstError < 0) {
          practiceComplete = true;
          setPracticeFeedback("Trajet correct : la boucle est continue. Vous pouvez maintenant passer à la synthèse.", "good");
        } else {
          practiceComplete = false;
          setPracticeFeedback(`À revoir à la place ${firstError + 1}. Utilisez l’indice ou affichez la solution.`, "error");
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
    if (lesson.eau && window.HydroEcoulement) {
      /* l'eau coule dès l'arrivée ; à l'étape 3, à la vitesse du repère EAU (un tour en 9 s) */
      const tour = $("#loopPath", els.scene);
      window.HydroEcoulement.brancher($("svg", els.scene), Object.assign({ annonce: { el: els.equivalent, base: lesson.equivalent } },
        lesson.eau, tour ? { vitesse: tour.getTotalLength() / 9 } : {}));
    }
    if (lesson.control === "practice") renderPractice();
    wireControls(lesson.control);
    renderProgress();
    updateNavigation();
    requestAnimationFrame(() => els.stepTitle.focus({ preventScroll: true }));
  }

  /* Texte écrit pour l'oreille, jamais ramassé sur l'écran : avant le 01/09/2026
     cette fonction concaténait six éléments du DOM et l'élève entendait la
     diapositive au lieu d'un professeur. */
  function narrationCourante() {
    const etape = lessons[current];
    return etape && typeof etape.narration === "string" ? etape.narration.trim() : "";
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
    const dit = narrationCourante();
    if (!dit) { els.voiceStatus.textContent = "Cette étape n’a pas encore de narration. Tout reste écrit."; return; }
    const utterance = new SpeechSynthesisUtterance(dit);
    if (window.PILOTE_VOIX_REGLAGE) window.PILOTE_VOIX_REGLAGE.appliquer(utterance);
    else { utterance.lang = "fr-FR"; utterance.rate = reglageVoixLocal.vitesse(); utterance.pitch = 1; }
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
  if (window.PILOTE_VOIX_REGLAGE) window.PILOTE_VOIX_REGLAGE.monter($(".voice-actions"));
  else reglageVoixLocal.monter($(".voice-actions"));

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
  /* la vue 3D de l'installation, à côté du schéma dès l'arrivée et pour toutes les étapes (04/10/2026) */
  const panneau3d = $("#vue3dPanel");
  if (panneau3d) {
    /* elle s'ouvre sur l'installation réelle, tubes fermés : l'eau qui coule se voit dans le schéma
       (une nappe) ; « Voir l'eau » montre l'intérieur, où le modèle 3D fait circuler des grains */
    panneau3d.addEventListener("e3d-pret", (ev) => { if (ev.target.fantome) ev.target.fantome(false); }, { once: true });
    vue3d(panneau3d, { modele: "installation", titre: "L’installation en 3D", schema: false });
  }
})();
