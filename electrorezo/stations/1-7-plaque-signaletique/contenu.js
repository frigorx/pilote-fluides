/* ÉlectroRézo 1.7 — Les valeurs nominales : lire une plaque signalétique. */

ModeleGrandeur.construire({
  id: '1.7', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 7',
  titre: "Lire une plaque signalétique",
  narration: NARRATION,

  prerequis: [
    { id: '1.2', quoi: "la tension" },
    { id: '1.4', quoi: "la puissance" },
  ],

  photos: [
    { src: 'assets/biblio/plaque-leroy-somer.png',
      alt: "Photographie d’une plaque signalétique métallique d’un moteur asynchrone Leroy Somer, avec ses tensions, intensités, puissance, vitesse et facteur de puissance.",
      titre: "La vraie plaque.", sous: "Rivetée sur le flanc du moteur, pour toute sa vie." },
    { src: 'assets/biblio/plaque-leroy-somer-2.jpeg',
      alt: "Seconde photographie d’une plaque signalétique de moteur asynchrone Leroy Somer.",
      titre: "Toujours le même ordre.", sous: "Tensions, intensités, puissance, vitesse." },
    { src: 'assets/biblio/plaque-commentee.png',
      alt: "Plaque signalétique de moteur asynchrone présentée avec le détail de chacune de ses informations techniques.",
      titre: "Ligne par ligne.", sous: "Chaque nombre a un sens précis, et un seul." }
  ],

  lIdee: "Une plaque signalétique est la carte d’identité d’une machine. Tout ce qu’il faut pour la brancher, la protéger et la dépanner tient sur ce rectangle de métal — à condition de savoir le lire.",
  ouOnLaRencontre: "Rivetée sur le flanc de chaque moteur, collée sur chaque appareil. Elle est souvent sale, parfois illisible, jamais inutile. Quand elle a disparu, on perd des heures à retrouver ce qu’elle disait.",

  scene: () => SchemasGrandeurs.plaqueSignaletique(),

  ceQuiSePasse: [
    ["Deux tensions, deux intensités", "elles vont par paires et dans le même ordre. <em>230 V — 6,65 A</em> d’un côté, <em>400 V — 3,84 A</em> de l’autre. Ce ne sont pas deux options libres : chacune correspond à un <strong>couplage</strong> de la plaque à bornes."],
    ["La puissance est celle qui est RENDUE", "1,5 kW, c’est ce que le moteur fournit sur son arbre. Il en absorbe davantage — environ 1,8 kW. La différence part en chaleur."],
    ["La vitesse est celle en charge", "1435 tr/min, et non 1500. L’écart s’appelle le <strong>glissement</strong> : un moteur asynchrone ne tourne jamais tout à fait à la vitesse de synchronisme."],
    ["Le cos φ", "0,80 par exemple. Il dit quelle part de ce qui est appelé travaille vraiment. C’est lui qui explique qu’un moteur appelle plus que sa puissance utile."]
  ],
  aRetenir: [
    "L’<strong>intensité</strong> est le nombre le plus utile de la plaque : c’est elle qui décide de la section du câble et du réglage du thermique.",
    "L’<strong>indice IP</strong> dit contre quoi l’enveloppe protège : premier chiffre les solides, second l’eau.",
    "La plaque décrit un <strong>régime nominal</strong> : ce que la machine tient en marche normale, en continu, à température prévue."
  ],

  mesure: () => SchemasGrandeurs.plaqueContreMesure(),
  instrument: [
    "La plaque annonce ; la <strong>pince</strong> constate. C’est l’<strong>écart entre les deux</strong> qui fait le diagnostic.",
    "Une intensité mesurée nettement supérieure à celle de la plaque veut dire que la machine force : roulement, accouplement, charge, ou mauvais couplage.",
    "Une intensité nettement inférieure n’est pas rassurante non plus : la machine ne fait peut-être pas son travail.",
    "Sur un triphasé, on mesure les <strong>trois phases</strong>. Un écart entre elles annonce un déséquilibre ou un enroulement en défaut."
  ],
  dangerDeMesure: "Une plaque illisible ou absente n’autorise aucune supposition. Sans elle, on ne connaît ni le couplage à faire, ni le réglage du thermique. On cherche la documentation, ou on ne branche pas.",

  ecriture: {
    symbole: 'Un', unite: 'nominal', nomUnite: 'les valeurs de fonctionnement normal',
    multiples: [
      ['U, I, P', 'tension, intensité, puissance — les trois qui décident du câblage'],
      ['n, cos φ', 'vitesse et facteur de puissance — pour comprendre le comportement'],
      ['IP, IK', 'protection contre l’eau et la poussière, résistance aux chocs']
    ]
  },
  surUnePlaque: [
    "<strong>Avant de coupler</strong> : lisez les deux tensions, et comparez à celle du réseau. C’est ce qui décide entre étoile et triangle.",
    "<strong>Avant de régler un thermique</strong> : lisez l’intensité correspondant au couplage retenu, et tournez la molette dessus.",
    "<strong>Avant de tirer un câble</strong> : partez de cette même intensité, jamais de la puissance.",
    "<strong>Avant de commander une pièce</strong> : relevez la référence complète et la plaque entière, en photo. Elle ne sera peut-être plus lisible dans dix ans."
  ],

  quiz: [
    { question: "Une plaque annonce « 230 V / 400 V ». Que faut-il comprendre ?",
      confirmation: "Deux couplages possibles, chacun pour une tension de réseau.",
      reponses: [
        { texte: "Le moteur accepte n’importe quelle tension entre les deux.", pourquoi: "Ce ne sont pas des bornes d’une plage : ce sont deux valeurs précises." },
        { texte: "Le moteur consomme 230 V et rend 400 V.", pourquoi: "Un moteur ne fabrique pas de tension." },
        { texte: "Le moteur peut être couplé de deux façons, selon le réseau.", juste: true },
        { texte: "230 V au démarrage, 400 V en marche.", pourquoi: "La tension d’alimentation ne change pas entre démarrage et marche." } ] },

    { question: "La plaque indique 1,5 kW. Qu’est-ce que le moteur absorbe au réseau ?",
      confirmation: "Davantage — environ 1,8 kW. La plaque annonce ce qui est rendu.",
      reponses: [
        { texte: "Exactement 1,5 kW.", pourquoi: "Ce serait un rendement de 100 %, ce qui n’existe pas." },
        { texte: "Moins, car le moteur récupère de l’énergie.", pourquoi: "Un moteur ne récupère rien : il perd." },
        { texte: "1,5 kW seulement en charge, rien à vide.", pourquoi: "À vide, il absorbe encore de quoi se maintenir en rotation." },
        { texte: "Davantage : environ 1,8 kW.", juste: true } ] },

    { question: "Sur quoi règle-t-on un relais thermique ?",
      confirmation: "Sur l’intensité de la plaque, correspondant au couplage retenu.",
      reponses: [
        { texte: "Sur l’intensité écrite sur la plaque.", juste: true },
        { texte: "Sur le calibre du disjoncteur en amont.", pourquoi: "Le disjoncteur protège le câble : ce n’est pas la même valeur." },
        { texte: "Sur la puissance divisée par la tension.", pourquoi: "Ce calcul néglige le rendement et le cos φ : il donne une valeur fausse." },
        { texte: "Au maximum, pour éviter les déclenchements.", pourquoi: "C’est rendre la protection inutile : le moteur n’est plus protégé." } ] },

    { question: "La pince mesure 4,9 A là où la plaque annonce 3,84 A. Que conclure ?",
      confirmation: "La machine force. Il faut chercher pourquoi avant de continuer.",
      reponses: [
        { texte: "C’est normal, la plaque est une moyenne.", pourquoi: "Ce n’est pas une moyenne : c’est la valeur nominale, en marche normale." },
        { texte: "Quelque chose force : il faut chercher quoi.", juste: true },
        { texte: "Il faut augmenter le réglage du thermique.", pourquoi: "Ce serait masquer le problème au lieu de le traiter." },
        { texte: "La pince est mal placée.", pourquoi: "À vérifier, mais un écart d’un quart est trop net pour être une erreur de mesure." } ] }
  ],

  retenir: [
    "<strong>Deux tensions, deux intensités</strong>, appariées : chacune est un couplage.",
    "<strong>La puissance est celle qui est RENDUE</strong>, pas absorbée.",
    "<strong>L’intensité est le nombre le plus utile</strong> : câble, thermique, diagnostic.",
    "<strong>Photographiez la plaque.</strong> Dans dix ans, elle sera illisible."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire chaque ligne d’une plaque signalétique de moteur et savoir ce que chacune décide dans l’installation.</p><p><strong>Limite.</strong> Les services S1 à S9 et les classes d’isolation ne sont qu’évoqués.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" },
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.4 La puissance et l’énergie" } ]
});
