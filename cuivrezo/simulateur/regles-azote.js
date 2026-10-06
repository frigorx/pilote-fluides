/* Le jeu de l'azote — les DONNÉES. Sources : habilitation fluides G3 (épreuve de pression : azote sec seul,
   lunettes, personne face à un raccord), HabFluide ch. 13 (la bouteille et son mano-détendeur : jamais en direct,
   deux cadrans, vis desserrée avant d'ouvrir, cadran qui ne tient pas = fuite) et ch. 16 (balayage ≠ épreuve),
   G10 (purger l'air du flexible), notice Danfoss (azote évacué à l'air libre après l'épreuve), fiche Air Liquide
   (ogive noire). Règles de Franck (06/10) : bouteille ouverte d'un quart de tour ; pression jamais au-dessus de la PS
   la plus basse ; détendeur jamais laissé réglé ; poste mobile = détendeur et manifold démontés. */
window.REGLES_AZOTE = {
  USAGES: [
    '<b>Le balayage</b> : pendant le brasage, un débit léger d’azote chasse l’oxygène du tube. Pas de calamine à l’intérieur.',
    '<b>L’épreuve</b> : après le brasage, le circuit est mis sous pression d’azote. On vérifie qu’il tient et qu’il ne fuit pas.',
    '<b>Le cassage du vide</b> : entre deux tirages au vide, on casse le vide avec ce gaz neutre.',
    'Toujours de l’azote sec, seul. Jamais d’oxygène, jamais d’air comprimé.'
  ],
  Q_BALAYAGE: {
    question: 'Pendant le brasage d’un tube du circuit, pourquoi fait-on passer de l’azote dedans ?',
    choix: [
      { t: 'Pour refroidir le tube plus vite', ok: false, faute: 'Rôle du balayage d’azote', pourquoi: 'L’azote ne sert pas à refroidir : il chasse l’oxygène du tube pour éviter la calamine.' },
      { t: 'Pour éviter que l’intérieur du cuivre s’oxyde (la calamine)', ok: true, pourquoi: 'Sans azote, la chauffe oxyde l’intérieur du tube : la calamine se détache plus tard, bouche le déshydrateur et abîme le compresseur.' },
      { t: 'Pour vérifier que le joint ne fuit pas', ok: false, faute: 'Balayage confondu avec l’épreuve', pourquoi: 'Ça, c’est l’épreuve, après le brasage. Pendant le brasage, l’azote chasse l’oxygène du tube.' }
    ]
  },
  Q_GAZ: {
    question: 'Pour mettre un circuit en pression et chercher les fuites, quel gaz utilisez-vous ?',
    choix: [
      { t: 'De l’oxygène', ok: false, grave: true, faute: 'Oxygène choisi pour mettre en pression', pourquoi: 'Jamais d’oxygène : au contact de l’huile du circuit, il peut exploser.' },
      { t: 'De l’air comprimé', ok: false, faute: 'Air comprimé choisi pour mettre en pression', pourquoi: 'Jamais d’air comprimé : il est humide et chargé en oxygène.' },
      { t: 'De l’azote sec', ok: true, pourquoi: 'L’azote sec, seul, et toujours avec un mano-détendeur réglé.' }
    ]
  },
  Q_DIRECT: [
    { t: 'Oui, si j’ouvre la bouteille doucement', ok: false, grave: true, faute: 'Bouteille d’azote branchée en direct', pourquoi: 'Jamais en direct : sans mano-détendeur, toute la pression de la bouteille part d’un coup. De quoi faire éclater un circuit.' },
    { t: 'Non : toujours avec un mano-détendeur, qui lit la pression de la bouteille et règle celle envoyée au circuit', ok: true, pourquoi: 'Le mano-détendeur a deux cadrans : ce qu’il reste dans la bouteille, et ce que vous envoyez dans le circuit.' }
  ],
  Q_OUVRIR: [
    { t: 'En grand, d’un coup', ok: false, faute: 'Bouteille d’azote ouverte en grand', pourquoi: 'Jamais d’un coup : la pression arriverait brutalement dans le détendeur.' },
    { t: 'D’un quart de tour, lentement, à la main', ok: true, pourquoi: 'Un quart de tour suffit, et on peut refermer vite en cas de problème.' }
  ],
  Q_POSITION: [
    { t: 'Penché sur le raccord, pour entendre une fuite', ok: false, grave: true, faute: 'Face à un raccord pendant la montée en pression', pourquoi: 'Personne face à un raccord pendant la montée en pression : en cas de défaut, il y a projection.' },
    { t: 'Lunettes sur les yeux, à l’écart des raccords, l’œil sur le manomètre', ok: true, pourquoi: 'Lunettes obligatoires, et personne face à un raccord ou un joint pendant la montée en pression.' }
  ],
  Q_FUITE: [
    { t: 'Je remonte la pression pour compenser', ok: false, grave: true, faute: 'Fuite compensée au lieu d’être cherchée', pourquoi: 'On ne compense pas une fuite : on la cherche.' },
    { t: 'Rien : ça va se stabiliser', ok: false, faute: 'Baisse de pression ignorée', pourquoi: 'Un cadran qui ne tient pas sa pression signale une fuite. On la cherche avant d’aller plus loin.' },
    { t: 'Je cherche la fuite au produit moussant, raccord par raccord', ok: true, pourquoi: 'Un cadran qui ne tient pas sa pression signale une fuite au raccord : on la trouve avant d’aller plus loin.' }
  ],
  Q_DEPOSER: [
    { t: 'Je laisse le détendeur et le manifold montés, vis desserrée', ok: false, faute: 'Détendeur et manifold laissés montés sur un poste mobile', pourquoi: 'Sur un poste mobile, ce qui reste monté prend des chocs pendant le transport : les manomètres se cassent. On démonte.' },
    { t: 'Je les laisse montés, vis serrée, pour gagner du temps', ok: false, grave: true, faute: 'Détendeur laissé monté et réglé', pourquoi: 'Jamais un détendeur laissé réglé : à la prochaine ouverture, toute la pression arriverait d’un coup. Et sur un poste mobile, on démonte.' },
    { t: 'Je démonte le détendeur et le manifold, je les range à l’abri des chocs et je remets le chapeau de la bouteille', ok: true, pourquoi: 'Démontés et rangés, ils ne prennent pas de chocs ; la bouteille voyage chapeau en place.' }
  ],
  /* plaques réelles (2-3-simulateur.md § D) : valeurs reproduites des notices des fabricants. Danfoss Optyma Plus
     marque « M.W.P. » (pression de service maximale), l'INVERTER « PSHP / PSLP », Daikin « design pressure » :
     le jeu les affiche toutes comme PS (équivalence admise, notée dans § D). */
  PLAQUES: [
    { fabricant: 'Danfoss', modele: 'Optyma Plus OP-MPPM028VVLP01E', fluide: 'R448A', psHP: 32, psBP: 21.5, source: 'notice Danfoss AN18718642524202, 2024, p. 50' },
    { fabricant: 'Daikin', modele: 'RZA50AV16 (unité extérieure)', fluide: 'R32', psHP: 41.7, psBP: 27.6, source: 'notice Daikin RZA50AV16, p. 22' },
    { fabricant: 'Daikin', modele: 'RZVFQ71AV16 (unité extérieure)', fluide: 'R32', psHP: 41.7, psBP: 22.1, source: 'notice Daikin RZVFQ/RZMFQ/RZCFQ, p. 1' },
    { fabricant: 'Danfoss', modele: 'Optyma Plus OP-MPXM034MLP00G', fluide: 'R448A', psHP: 28, psBP: 7, source: 'notice Danfoss AN363633031019, p. 1' },
    { fabricant: 'Danfoss', modele: 'Optyma Plus OP-MPXM034MLP00G', fluide: 'R134a', psHP: 23, psBP: 5, source: 'notice Danfoss AN363633031019, p. 1' }
  ]
};
