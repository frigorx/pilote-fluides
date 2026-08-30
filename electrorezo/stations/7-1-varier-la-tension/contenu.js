/* ÉlectroRézo 7.1 — Le principe de la variation de tension. */

ModeleGrandeur.construire({
  id: '7.1', ligne: 7,
  kicker: 'ÉlectroRézo · Ligne 7 Faire varier · Station 1',
  titre: "Faire varier la tension",
  narration: NARRATION,

  prerequis: [
    { id: '1.2', quoi: "la tension" },
    { id: '6.3', quoi: "le moteur asynchrone" },
  ],

  photos: [
    { src: 'assets/pourquoi-pas-la-tension.svg',
      alt: "Deux colonnes comparées : quand la tension passe de 400 à 280 volts, la vitesse ne perd que quelques tours par minute, tandis que le couple tombe à la moitié.",
      titre: "Ce que ça change vraiment.", sous: "La vitesse tient, le couple s’écroule." }
  ],
  creditPhoto: 'Coupe dessinée pour cette station. Détail dans « Crédits ».',

  lIdee: "Première idée qui vient à l’esprit pour ralentir un moteur : lui envoyer moins de tension. C’est ce qu’on fait avec une lampe, avec une résistance chauffante. Alors pourquoi pas avec un moteur ? Cette station répond, et la réponse est instructive.",
  ouOnLaRencontre: "Sur les variateurs de lumière, sur les ventilateurs à plusieurs vitesses, sur les résistances de chauffage régulées. Et — c’est le point important — presque jamais pour régler la vitesse d’un moteur asynchrone.",

  scene: () => SchemasMachines.baisserLaTension(),

  ceQuiSePasse: [
    ["Sur une résistance, ça marche", "moins de tension, moins de courant, moins de puissance. Une lampe s’éteint doucement, un radiateur chauffe moins. C’est simple et c’est efficace."],
    ["Sur un moteur asynchrone, ça ne marche pas", "sa vitesse est fixée par la <strong>fréquence</strong>, pas par la tension. Baisser la tension ne le ralentit presque pas."],
    ["Ce qui baisse, c’est le couple", "et il baisse vite : il suit le <strong>carré</strong> de la tension. À 70 % de la tension, il ne reste que la moitié du couple."],
    ["Et l’intensité monte", "le moteur cherche à fournir la même puissance mécanique avec moins de tension. Il appelle donc plus de courant, et il chauffe."]
  ],
  aRetenir: [
    "Le couple suit le <strong>carré</strong> de la tension. C’est la relation à retenir de cette station.",
    "Faire varier la tension d’un moteur asynchrone, c’est l’<strong>affaiblir</strong>, pas le ralentir.",
    "Un moteur qui tourne sous-alimenté finit par déclencher son thermique — quand il ne brûle pas avant."
  ],

  mesure: () => SchemasMachines.ondeDecoupee(),
  instrument: [
    "Un multimètre ordinaire mesure mal une onde découpée : il suppose une sinusoïde. Il faut un appareil <strong>True RMS</strong>.",
    "Sans cette fonction, l’erreur peut atteindre <strong>vingt pour cent</strong> — et rien ne la signale.",
    "Sur un moteur alimenté par un gradateur, mesurez plutôt <strong>l’intensité à la pince</strong> : elle est plus parlante que la tension.",
    "Et comparez-la à la plaque. Un moteur sous-alimenté qui force appelle plus que sa valeur nominale."
  ],
  dangerDeMesure: "Une onde découpée met en défaut beaucoup d’appareils de mesure et beaucoup de différentiels. Sur une installation à gradateurs, il faut des différentiels de type adapté.",

  ecriture: {
    symbole: 'U', unite: 'V', nomUnite: 'le volt — mais une valeur efficace, pas une hauteur',
    multiples: [
      ['100 % de U', 'le couple nominal'],
      ['70 % de U', 'la moitié du couple'],
      ['50 % de U', 'le quart du couple']
    ]
  },
  surUnePlaque: [
    "Sur un <strong>gradateur</strong>, la puissance annoncée est celle qu’il peut commuter, pas celle qu’il fournit.",
    "Beaucoup de gradateurs portent la mention <strong>« charges résistives uniquement »</strong>. Elle est à prendre au sérieux : sur un moteur ou un transformateur, ils se détruisent.",
    "Sur un <strong>ventilateur à plusieurs vitesses</strong>, ce n’est pas la tension qui change : ce sont les <strong>enroulements</strong>. Ce n’est pas de la variation, c’est une sélection.",
    "Retenez la distinction : faire varier une tension, c’est utile pour ce qui chauffe et pour ce qui éclaire. Pour ce qui tourne, il faut autre chose — et c’est la station 7.3."
  ],

  quiz: [
    { question: "On baisse la tension d’un moteur asynchrone de 30 %. Que devient le couple ?",
      confirmation: "Il tombe à la moitié : le couple suit le carré de la tension.",
      reponses: [
        { texte: "Il tombe à la moitié.", juste: true },
        { texte: "Il baisse de 30 % aussi.", pourquoi: "Le couple ne suit pas la tension mais son carré." },
        { texte: "Il ne change pas.", pourquoi: "Le couple dépend directement de la tension appliquée." },
        { texte: "Il augmente.", pourquoi: "Moins de tension ne peut pas donner plus de couple." } ] },

    { question: "Qu’est-ce qui fixe la vitesse d’un moteur asynchrone ?",
      confirmation: "La fréquence, et le nombre de pôles. Pas la tension.",
      reponses: [
        { texte: "La tension appliquée.", pourquoi: "Elle ne fait varier la vitesse que de quelques tours." },
        { texte: "La fréquence et le nombre de pôles.", juste: true },
        { texte: "L’intensité absorbée.", pourquoi: "L’intensité est une conséquence de la charge, pas une cause de vitesse." },
        { texte: "Le couplage étoile ou triangle.", pourquoi: "Le couplage change la tension vue par les bobinages, pas la vitesse." } ] },

    { question: "Que fait un gradateur à la forme de l’onde ?",
      confirmation: "Il en supprime un morceau à chaque alternance. La hauteur ne change pas.",
      reponses: [
        { texte: "Il en réduit la hauteur.", pourquoi: "La hauteur reste celle du réseau : c’est la durée de conduction qui change." },
        { texte: "Il en change la fréquence.", pourquoi: "La fréquence reste celle du réseau." },
        { texte: "Il en supprime un morceau à chaque alternance.", juste: true },
        { texte: "Il la transforme en continu.", pourquoi: "C’est le rôle d’un redresseur." } ] },

    { question: "Pourquoi un multimètre ordinaire mesure-t-il mal une onde découpée ?",
      confirmation: "Parce qu’il suppose une sinusoïde pour calculer la valeur efficace.",
      reponses: [
        { texte: "Parce que la fréquence est trop élevée.", pourquoi: "Elle reste à 50 hertz." },
        { texte: "Parce que la tension est trop faible.", pourquoi: "Le niveau n’est pas en cause." },
        { texte: "Parce que le signal est continu.", pourquoi: "Il reste alternatif, simplement déformé." },
        { texte: "Parce qu’il suppose une sinusoïde.", juste: true } ] }
  ],

  retenir: [
    "<strong>Le couple suit le CARRÉ</strong> de la tension.",
    "<strong>La vitesse ne suit pas.</strong> Elle dépend de la fréquence.",
    "<strong>Baisser la tension affaiblit</strong>, ça ne ralentit pas.",
    "<strong>Onde découpée</strong> : il faut un appareil True RMS pour la mesurer."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi la variation de tension convient au chauffage et à l’éclairage mais pas à un moteur asynchrone.</p><p><strong>Limite.</strong> Le démarrage à tension réduite, qui est un autre usage de la même idée, n’est pas traité ici.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.2 La tension" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone" },
    { ligne: 7, couleur: '#0b7285', texte: "7.3 La variation de fréquence" } ]
});
