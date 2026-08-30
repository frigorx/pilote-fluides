/* ÉlectroRézo 1.5 — Continu et alternatif. */

ModeleGrandeur.construire({
  id: '1.5', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 5',
  titre: "Continu et alternatif",
  narration: NARRATION,

  photos: [
    { src: 'assets/deux-familles.svg',
      alt: "À gauche une batterie et sa trace continue, plate, avec un plus et un moins. À droite une prise du réseau et sa trace alternative, qui monte et descend, avec une phase et un neutre.",
      titre: "Deux familles.", sous: "Deux objets, deux allures, deux façons de brancher." }
  ],
  creditPhoto: 'Coupe dessinée pour cette station. Détail dans « Crédits ».',

  lIdee: "Il y a deux façons pour un courant de circuler. Soit il garde toujours le même sens — c’est le continu. Soit il change de sens sans arrêt, cinquante fois par seconde — c’est l’alternatif. Ce n’est pas une nuance : les deux ne se branchent pas de la même façon et ne se mesurent pas sur la même position.",
  ouOnLaRencontre: "L’alternatif partout où il y a une prise. Le continu dans les batteries, les alimentations, les panneaux photovoltaïques, et sur toutes les cartes électroniques — y compris celles qui sont dans une machine alimentée en alternatif.",

  scene: () => SchemasGrandeurs.continuAlternatif(),

  ceQuiSePasse: [
    ["Le continu", "la valeur ne bouge pas et le sens non plus. Il y a donc un <strong>plus</strong> et un <strong>moins</strong>, et les inverser a des conséquences : un appareil peut refuser de fonctionner, ou se détruire."],
    ["L’alternatif", "le courant fait cinquante allers-retours par seconde. Il n’y a ni plus ni moins : il y a une <strong>phase</strong> et un <strong>neutre</strong>, qui ne jouent pas le même rôle mais qui ne sont pas des pôles."],
    ["Ce que veut dire « 230 V »", "ce n’est ni le maximum, ni la moyenne. C’est la <strong>valeur efficace</strong> : celle qui produirait le même échauffement qu’un courant continu de 230 volts. Le maximum, lui, monte à environ 325 volts."],
    ["Pourquoi le réseau est alternatif", "parce qu’un transformateur ne fonctionne qu’en alternatif. C’est ce qui permet de transporter l’énergie en très haute tension, puis de redescendre près des habitations."]
  ],
  aRetenir: [
    "En continu, on écrit <strong>DC</strong> ou un trait plein ; en alternatif, <strong>AC</strong> ou une petite vague.",
    "Ces deux signes sont sur tous les appareils et sur tous les sélecteurs de multimètre.",
    "Un appareil peut contenir les deux : l’alimentation entre en alternatif, la carte travaille en continu."
  ],

  mesure: () => SchemasGrandeurs.selecteurContinuAlternatif(),
  instrument: [
    "Sur un multimètre, la position <strong>V~</strong> mesure l’alternatif, la position <strong>V⎓</strong> mesure le continu.",
    "Sur la mauvaise position, l’appareil <strong>n’affiche pas d’erreur</strong> : il affiche un nombre. C’est ce qui rend l’erreur dangereuse.",
    "Beaucoup d’appareils modernes choisissent seuls. Vérifiez alors ce qui est écrit à l’écran : un petit signe indique le mode retenu.",
    "Un <strong>vérificateur d’absence de tension</strong> est fait pour cet usage précis, et il ne se trompe pas de mode. C’est lui qu’on emploie avant d’intervenir."
  ],
  dangerDeMesure: "Une prise du réseau mesurée en position continu affiche presque zéro. Rien ne signale l’erreur. On peut en conclure que le circuit est mort, et poser la main dessus.",

  ecriture: {
    symbole: '~ ⎓', unite: 'V', nomUnite: 'le volt, dans les deux cas',
    multiples: [
      ['~', 'alternatif — la petite vague, sur le sélecteur et sur les plaques'],
      ['⎓', 'continu — un trait plein au-dessus d’un trait pointillé'],
      ['50 Hz', 'la fréquence du réseau européen — elle n’apparaît qu’en alternatif']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>bobine de contacteur</strong> : <em>24 V ⎓</em> et <em>24 V ~</em> ne sont pas le même article. Elles ne se remplacent pas.",
    "Sur une <strong>alimentation</strong>, l’entrée porte le signe alternatif et la sortie le signe continu. Les deux sont écrits, côte à côte.",
    "Sur un <strong>moteur</strong>, le signe <em>3 ~</em> annonce un triphasé alternatif. C’est ce que vous verrez presque toujours en atelier.",
    "Cherchez ces deux petits signes avant chaque branchement. Ils sont minuscules, et ils décident de tout."
  ],

  quiz: [
    { question: "Que signifie « 230 V » pour une tension alternative ?",
      confirmation: "C’est la valeur efficace. Le maximum atteint environ 325 V.",
      reponses: [
        { texte: "La valeur efficace.", juste: true },
        { texte: "La valeur maximale atteinte.", pourquoi: "Le maximum est d’environ 325 volts." },
        { texte: "La valeur moyenne.", pourquoi: "La moyenne d’une tension alternative est nulle : autant de positif que de négatif." },
        { texte: "La valeur minimale garantie.", pourquoi: "La tension passe par zéro cent fois par seconde : il n’y a pas de minimum garanti." } ] },

    { question: "Vous mesurez une prise du réseau en position continu. Que lisez-vous ?",
      confirmation: "Presque zéro — et rien ne signale l’erreur.",
      reponses: [
        { texte: "230 volts quand même.", pourquoi: "L’appareil ne corrige pas : il fait ce qu’on lui demande." },
        { texte: "Presque zéro.", juste: true },
        { texte: "Un message d’erreur.", pourquoi: "C’est justement le danger : il n’y en a pas." },
        { texte: "325 volts.", pourquoi: "C’est la valeur crête, que cette position n’affiche pas davantage." } ] },

    { question: "Pourquoi le réseau de distribution est-il en alternatif ?",
      confirmation: "Parce qu’un transformateur ne fonctionne qu’en alternatif.",
      reponses: [
        { texte: "Parce que c’est moins dangereux.", pourquoi: "L’alternatif est au contraire plus dangereux pour le cœur, à valeur égale." },
        { texte: "Parce que les moteurs n’acceptent que l’alternatif.", pourquoi: "Il existe des moteurs à courant continu, et ils fonctionnent très bien." },
        { texte: "Parce que le transformateur ne fonctionne qu’en alternatif.", juste: true },
        { texte: "Par habitude historique, sans raison technique.", pourquoi: "La raison est technique et décisive : sans transformateur, pas de transport à longue distance." } ] },

    { question: "Une bobine marquée 24 V ⎓ peut-elle être alimentée en 24 V ~ ?",
      confirmation: "Non : le signe fait partie de la référence, au même titre que la valeur.",
      reponses: [
        { texte: "Oui, c’est la même tension.", pourquoi: "La valeur est la même, l’allure ne l’est pas — et la bobine réagit à l’allure." },
        { texte: "Oui, si on ajoute un fusible.", pourquoi: "Le fusible protège contre les surintensités, il ne convertit rien." },
        { texte: "Oui, mais elle chauffera un peu.", pourquoi: "Ce n’est pas une question d’échauffement : le comportement de la bobine est différent." },
        { texte: "Non : ce sont deux articles différents.", juste: true } ] }
  ],

  retenir: [
    "<strong>Continu</strong> : un plus et un moins. <strong>Alternatif</strong> : une phase et un neutre.",
    "<strong>230 V est la valeur efficace.</strong> Le maximum monte à 325.",
    "<strong>La mauvaise position n’affiche pas d’erreur</strong> : elle affiche presque zéro.",
    "<strong>Les deux petits signes</strong> ~ et ⎓ sont sur tout le matériel. Lisez-les."
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer continu et alternatif, comprendre ce que « 230 V » désigne réellement, et choisir la bonne position de mesure.</p><p><strong>Limite.</strong> Le déphasage entre tension et courant, et le calcul en régime alternatif, sont hors du champ de cette station.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.6 La fréquence" },
    { ligne: 6, couleur: '#c9451a', texte: "6.2 Le transformateur" },
    { ligne: 7, couleur: '#0b7285', texte: "7.1 La variation de tension" } ]
});
