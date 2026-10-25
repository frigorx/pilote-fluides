/* ÉlectroRézo 7.3 — Le principe de la variation de fréquence. */

const RETENIR_73 = [
  "<strong>La vitesse suit la fréquence.</strong> Directement.",
  "<strong>U / f constant</strong> : la loi de toute la ligne.",
  "<strong>Rapport tenu = couple entier</strong>, sauf tout près de l’arrêt.",
  "<strong>À basse vitesse, le moteur ne se ventile plus.</strong>"
];

ModeleGrandeur.construire({
  id: '7.3', ligne: 7,
  vue3d: { modele: 'moteurAsynchrone', options: { pilotage: 'frequence' }, defaut: 'schema' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 7 Faire varier · Station 3',
  titre: "Faire varier la fréquence",
  narration: NARRATION,

  prerequis: [
    { id: '1.6', quoi: "la fréquence" },
    { id: '6.3', quoi: "le moteur asynchrone" },
    { id: '7.1', quoi: "l’appareil True RMS" },
  ],

  photos: [
    { src: 'assets/la-vraie-solution.svg',
      alt: "Comparaison : en baissant la tension de 400 à 280 volts, la vitesse ne bouge presque pas et le couple tombe à la moitié ; en baissant la fréquence avec la tension qui suit, la vitesse baisse vraiment et le couple reste entier.",
      titre: "Les deux façons, comparées.", sous: "L’une affaiblit, l’autre ralentit vraiment." }
  ],
  creditPhoto: 'Coupe dessinée pour cette station. Détail dans « Crédits ».',

  lIdee: "La station 7.1 a montré ce qui ne marche pas. Voici ce qui marche. La vitesse d’un moteur asynchrone est fixée par la fréquence : alors on change la fréquence. Mais il y a une condition, et c’est toute la difficulté.",
  ouOnLaRencontre: "Sur beaucoup de machines modernes à vitesse réglable : pompes, ventilateurs, convoyeurs, compresseurs (souvent entraînés par un moteur à aimants). C’est ce qui a transformé l’industrie ces trente dernières années.",

  scene: () => SchemasMachines.loiUsurF(),

  ceQuiSePasse: [
    ["La vitesse suit la fréquence", "directement et proportionnellement. Moitié moins de fréquence, moitié moins de tours. C’est la relation la plus simple de toute la ligne."],
    ["Mais la tension doit suivre aussi", "et c’est la condition. Si on baisse la fréquence sans baisser la tension, le champ magnétique dans le fer devient trop fort : le fer <strong>sature</strong>."],
    ["Ce que sature veut dire", "le fer ne peut plus canaliser davantage de champ. Le courant s’envole sans que le couple augmente : c’est le <strong>courant magnétisant</strong>, celui qui crée le champ dans le fer. Le moteur chauffe très vite, pour rien."],
    ["La loi U sur f", "on garde le rapport tension sur fréquence <strong>constant</strong>. 400 volts à 50 hertz, 200 volts à 25 hertz, 80 volts à 10 hertz. Le rapport vaut 8 dans les trois cas."]
  ],
  aRetenir: [
    "<strong>U / f constant</strong> : c’est la loi de toute la ligne 7.",
    "Tant que le rapport est tenu, le <strong>couple reste entier</strong>, de 50 Hz jusqu’à 10 Hz. Plus bas, tout près de l’arrêt, la loi U/f ne suffit plus : c’est le rôle du contrôle vectoriel (station 7.4).",
    "Au-delà de 50 hertz, la tension ne peut plus suivre — on est au maximum du réseau. Le couple diminue alors, et c’est normal."
  ],

  mesure: () => SchemasMachines.troisEtagesDuVariateur(),
  instrument: [
    "En sortie de variateur, la mesure de tension est <strong>difficile</strong> : le signal n’est pas une sinusoïde mais un hachage très rapide.",
    "Un appareil <strong>True RMS</strong> est indispensable, et même avec, la lecture reste approximative.",
    "Pour connaître la vitesse réelle, un <strong>tachymètre</strong> est bien plus fiable qu’un calcul à partir de la fréquence lue.",
    "La plupart des variateurs <strong>affichent eux-mêmes</strong> la fréquence, l’intensité et la puissance. Ces valeurs sont fiables : ce sont celles qu’il calcule pour fonctionner."
  ],
  dangerDeMesure: "Un variateur contient un condensateur de bus continu qui reste chargé plusieurs minutes après la coupure. Le délai d’attente est écrit sur l’appareil. Ce n’est pas une précaution de principe : la tension du bus dépasse 500 volts continus.",

  ecriture: {
    symbole: 'U / f', unite: 'V/Hz', nomUnite: 'le rapport à garder constant',
    multiples: [
      ['400 V / 50 Hz', 'le point nominal — rapport 8'],
      ['200 V / 25 Hz', 'moitié vitesse, couple intact — rapport 8'],
      ['400 V / 75 Hz', 'au-delà de 50 Hz : le rapport tombe, le couple aussi']
    ]
  },
  surUnePlaque: [
    "<img src=\"assets/loi-u-sur-f.svg\" alt=\"La loi U sur f : la tension monte avec la fréquence jusqu’à 400 volts à 50 hertz, puis reste à 400 volts. Le rapport vaut 8 volts par hertz.\" style=\"width:100%;max-width:380px;height:auto;display:block;margin:0 auto .4rem\">",
    "Sur un <strong>variateur</strong>, la plage de fréquence de sortie est écrite : souvent 0 à 400 Hz.",
    "Le paramètre <strong>U/f</strong> fait partie des premiers réglages à faire à la mise en service. Il est souvent nommé « loi tension-fréquence » dans le menu.",
    "La <strong>fréquence minimale</strong> se règle aussi : en dessous, le moteur ne se ventile plus assez, car son ventilateur est calé sur son arbre.",
    "Un moteur qui tourne longtemps à basse vitesse peut avoir besoin d’une <strong>ventilation forcée</strong> indépendante."
  ],

  quiz: [
    { question: "Que faut-il faire quand on baisse la fréquence d’un moteur ?",
      confirmation: "Baisser la tension dans le même rapport.",
      reponses: [
        { texte: "Rien : la fréquence suffit.", pourquoi: "Le fer saturerait, et le moteur chaufferait sans donner plus de couple." },
        { texte: "Augmenter la tension pour compenser.", pourquoi: "Ce serait aggraver la saturation." },
        { texte: "Baisser la tension dans le même rapport.", juste: true },
        { texte: "Changer le couplage.", pourquoi: "Le couplage se décide une fois, à l’installation." } ] },

    { question: "Que veut dire « le fer sature » ?",
      confirmation: "Il ne peut plus canaliser davantage de champ : le courant s’envole pour rien.",
      reponses: [
        { texte: "Qu’il devient trop chaud pour fonctionner.", pourquoi: "L’échauffement est une conséquence, pas la définition." },
        { texte: "Qu’il conduit le courant.", pourquoi: "Le fer conduit toujours un peu : ce n’est pas de cela qu’il s’agit." },
        { texte: "Qu’il se magnétise définitivement.", pourquoi: "La saturation est un état passager, pas une aimantation permanente." },
        { texte: "Qu’il ne peut plus canaliser davantage de champ.", juste: true } ] },

    { question: "À 25 Hz, quelle tension faut-il appliquer pour garder le couple ?",
      confirmation: "200 volts : la moitié, comme la fréquence.",
      reponses: [
        { texte: "200 V.", juste: true },
        { texte: "100 V.", pourquoi: "Le rapport tomberait de moitié, et le couple avec." },
        { texte: "400 V, comme au nominal.", pourquoi: "Le rapport doublerait, et le fer saturerait." },
        { texte: "Peu importe : seule la fréquence compte.", pourquoi: "C’est précisément l’erreur que cette station corrige." } ] },

    { question: "Pourquoi un moteur qui tourne longtemps à basse vitesse peut-il avoir besoin d’une ventilation forcée ?",
      confirmation: "Parce que son ventilateur est calé sur son arbre : lentement, il ne ventile plus.",
      reponses: [
        { texte: "Parce qu’il consomme davantage.", pourquoi: "Il consomme moins à basse vitesse, en général." },
        { texte: "Parce que son ventilateur tourne trop lentement.", juste: true },
        { texte: "Parce que le variateur chauffe.", pourquoi: "Le variateur a son propre refroidissement." },
        { texte: "Parce que la fréquence est trop basse pour l’isolant.", pourquoi: "L’isolant ne réagit pas à la fréquence de cette façon." } ] }
  ],

  retenir: RETENIR_73,
  /* temps 5 : le récapitulatif visuel (la comparaison du temps 1) puis les points à retenir */
  finalTitre: 'Ce qu’il faut retenir',
  final: () => {
    const d = document.createElement('div');
    const i = document.createElement('img');
    i.src = 'assets/la-vraie-solution.svg';
    i.alt = 'Rappel : baisser la tension affaiblit le moteur sans le ralentir ; baisser la fréquence avec la tension qui suit le ralentit vraiment et garde le couple entier.';
    i.style.width = '100%'; i.style.height = 'auto'; i.style.maxWidth = '520px';
    d.appendChild(i);
    RETENIR_73.forEach(x => { const p = document.createElement('p'); p.innerHTML = x; d.appendChild(p); });
    return d;
  },

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi la fréquence règle la vitesse, ce qu’est la saturation du fer, et pourquoi tension et fréquence doivent varier ensemble.</p><p><strong>Limite.</strong> Le contrôle vectoriel de flux, qui va plus loin que la loi U/f, n’est pas traité.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'dessinées pour cette station',
      detail: 'Les dessins des temps 1, 4 et 5 sont tracés pour la station, à partir des valeurs de la loi U/f (400 V à 50 Hz, rapport 8).' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.6 La fréquence" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.6 Le champ tournant" },
    { ligne: 7, couleur: '#0b7285', texte: "7.1 Faire varier la tension" } ]
});
