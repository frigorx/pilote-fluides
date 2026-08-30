/* ÉlectroRézo 1.6 — La fréquence. */

ModeleGrandeur.construire({
  id: '1.6', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 6',
  titre: "La fréquence",
  narration: NARRATION,

  prerequis: [
    { id: '1.5', quoi: "l’alternatif" },
  ],

  photos: [
    { src: 'assets/cinquante-par-seconde.svg',
      alt: "Une seconde de signal du réseau : la sinusoïde répète son motif, et le dessin précise qu’il y en a cinquante par seconde sur le vrai réseau.",
      titre: "Cinquante par seconde.", sous: "Le dessin en montre vingt, pour rester lisible." },
    { src: 'assets/biblio/plaque-avec-50-hz.png',
      alt: "Plaque signalétique d’un moteur asynchrone Leroy Somer, portant notamment l’indication 50 Hz.",
      titre: "Écrite sur la plaque.", sous: "Le moteur est prévu pour cette fréquence-là." }
  ],

  lIdee: "La fréquence, c’est le nombre d’allers-retours que fait le courant en une seconde. Sur le réseau européen, c’est cinquante. Ce nombre a l’air anodin : il décide en réalité de la vitesse de tous les moteurs branchés dessus.",
  ouOnLaRencontre: "Écrite sur toutes les plaques : 50 Hz. Et surtout, elle explique pourquoi un moteur asynchrone tourne à une vitesse et pas à une autre — et pourquoi il faut un variateur pour la changer.",

  scene: () => SchemasGrandeurs.frequenceReglable(),

  ceQuiSePasse: [
    ["Un aller-retour complet", "le courant monte, redescend, passe dans l’autre sens, et revient. Cela fait <strong>une période</strong>. La fréquence compte combien il y en a par seconde."],
    ["Cinquante par seconde", "cela veut dire cent passages par zéro, puisqu’il y en a deux par période. Ce détail explique pourquoi un arc alternatif s’éteint plus facilement qu’un arc continu."],
    ["Elle décide de la vitesse des moteurs", "un moteur asynchrone à deux pôles tourne à 3000 tours par minute sous 50 Hz. À quatre pôles, 1500. La fréquence est dans le calcul, la construction du moteur aussi."],
    ["Elle ne se règle pas sur le réseau", "elle est tenue par le réseau lui-même, à quelques centièmes près. Pour en obtenir une autre, il faut la <strong>fabriquer</strong> : c’est le métier du variateur de fréquence."]
  ],
  aRetenir: [
    "La fréquence se note <strong>f</strong> et se mesure en <strong>hertz</strong>, symbole <strong>Hz</strong>.",
    "50 Hz en Europe, 60 Hz en Amérique du Nord.",
    "Un moteur européen branché sur du 60 Hz tourne 20 % plus vite — et n’aime pas ça longtemps."
  ],

  mesure: () => SchemasGrandeurs.frequenceReseau(),
  instrument: [
    "Beaucoup de multimètres savent afficher une fréquence : la position est marquée <strong>Hz</strong>.",
    "Sur un réseau public, la lecture est toujours 50,0. Une valeur différente veut dire <strong>groupe électrogène</strong> ou <strong>variateur</strong>.",
    "En sortie de variateur, la mesure est délicate : le signal n’est pas une belle sinusoïde, et beaucoup d’appareils s’y trompent.",
    "Pour vérifier la vitesse d’un moteur, un <strong>tachymètre</strong> est plus direct : il donne des tours par minute, pas des hertz."
  ],

  ecriture: {
    symbole: 'f', unite: 'Hz', nomUnite: 'le hertz',
    multiples: [
      ['50 Hz', 'le réseau européen — c’est la valeur que vous verrez partout'],
      ['60 Hz', 'l’Amérique du Nord, une partie de l’Asie'],
      ['0 à 400 Hz', 'la plage que fabrique un variateur de fréquence']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>plaque de moteur</strong> : <em>50 Hz</em>. Le moteur est conçu pour cette fréquence, et ses valeurs de tension et d’intensité s’entendent à cette fréquence-là.",
    "Sur un <strong>variateur</strong>, deux fréquences sont écrites : celle d’<strong>entrée</strong>, imposée par le réseau, et la plage de <strong>sortie</strong>, qu’il fabrique.",
    "La <strong>vitesse écrite sur la plaque</strong> — 1435 tr/min par exemple — est celle obtenue à 50 Hz, en charge. Changez la fréquence, elle change.",
    "Sur un appareil <strong>importé</strong>, vérifiez la fréquence prévue avant de le brancher. Un moteur 60 Hz sur du 50 Hz tourne plus lentement, et chauffe."
  ],

  quiz: [
    { question: "Que compte la fréquence ?",
      confirmation: "Le nombre d’allers-retours complets par seconde.",
      reponses: [
        { texte: "Le nombre de passages par zéro par seconde.", pourquoi: "Il y en a cent par seconde à 50 Hz : deux par période." },
        { texte: "Le nombre d’allers-retours complets par seconde.", juste: true },
        { texte: "Le nombre de volts fournis par seconde.", pourquoi: "Les volts ne se comptent pas par seconde : ce n’est pas un débit." },
        { texte: "La vitesse de propagation du courant.", pourquoi: "Cette vitesse est proche de celle de la lumière et n’a rien à voir." } ] },

    { question: "Peut-on régler la fréquence d’une installation raccordée au réseau ?",
      confirmation: "Non : le réseau l’impose. Seul un variateur en fabrique une autre.",
      reponses: [
        { texte: "Oui, avec un transformateur.", pourquoi: "Un transformateur change la tension, jamais la fréquence." },
        { texte: "Oui, en changeant le calibre de la protection.", pourquoi: "Le calibre ne touche à rien d’autre qu’au seuil de déclenchement." },
        { texte: "Non : elle est imposée par le réseau.", juste: true },
        { texte: "Oui, en modifiant le couplage du moteur.", pourquoi: "Le couplage change la tension vue par les bobinages, pas la fréquence." } ] },

    { question: "Un moteur asynchrone à quatre pôles, sous 50 Hz : quelle vitesse de synchronisme ?",
      confirmation: "3000 divisé par deux paires de pôles : 1500 tours par minute.",
      reponses: [
        { texte: "3000 tr/min.", pourquoi: "C’est la valeur pour deux pôles, soit une seule paire." },
        { texte: "750 tr/min.", pourquoi: "C’est la valeur pour huit pôles." },
        { texte: "50 tr/min.", pourquoi: "C’est la fréquence en hertz, pas une vitesse de rotation." },
        { texte: "1500 tr/min.", juste: true } ] },

    { question: "Un multimètre affiche 52,4 Hz sur une installation. Qu’en déduire ?",
      confirmation: "Ce n’est pas le réseau public : groupe électrogène, ou variateur.",
      reponses: [
        { texte: "Que le courant n’est pas fourni par le réseau public.", juste: true },
        { texte: "Que le multimètre est déréglé.", pourquoi: "C’est possible, mais l’hypothèse la plus probable est ailleurs." },
        { texte: "Que le réseau est en surcharge.", pourquoi: "Une surcharge fait plutôt varier la tension ; la fréquence du réseau reste tenue." },
        { texte: "Que l’installation est en 60 Hz.", pourquoi: "52,4 n’est ni 50 ni 60 : c’est une source instable." } ] }
  ],

  retenir: [
    "<strong>f</strong>, en <strong>hertz</strong>. Le nombre d’allers-retours par seconde.",
    "<strong>50 Hz en Europe</strong>, 60 en Amérique du Nord.",
    "<strong>Elle décide de la vitesse des moteurs.</strong>",
    "<strong>Elle ne se règle pas</strong> : elle se fabrique, avec un variateur."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que compte une fréquence, savoir qu’elle est imposée par le réseau, et faire le lien avec la vitesse d’un moteur asynchrone.</p><p><strong>Limite.</strong> Le calcul complet du glissement et des harmoniques n’est pas traité ici.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.5 Continu et alternatif" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone" },
    { ligne: 7, couleur: '#0b7285', texte: "7.4 Le variateur de fréquence" } ]
});
