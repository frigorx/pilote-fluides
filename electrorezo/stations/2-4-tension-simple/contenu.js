/* ÉlectroRézo 2.4 — La tension simple. */

ModeleGrandeur.construire({
  id: '2.4', ligne: 2,
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 4',
  titre: "La tension simple",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/les-tensions-du-reseau.jpeg',
      alt: "Schéma des trois phases L1, L2, L3 et du neutre, avec trois flèches V1, V2, V3 partant du neutre vers chaque phase.",
      titre: "Trois flèches, un même départ.", sous: "Elles partent toutes du neutre : c’est la définition." },
    { src: 'assets/biblio/transformateur-en-etoile.jpeg',
      alt: "Schéma d’un transformateur triphasé couplé en étoile : les trois bobinages partent d’un point commun.",
      titre: "D’où vient le neutre.", sous: "C’est le point commun des trois bobinages du transformateur." }
  ],

  lIdee: "La tension simple, c’est celle qu’on mesure entre une phase et le neutre. En France, 230 volts. C’est la tension de vos prises — et c’est, tout simplement, une des trois du réseau triphasé.",
  ouOnLaRencontre: "Chaque maison reçoit une phase et le neutre : elle reçoit donc une tension simple. Les trois maisons voisines n’ont pas forcément la même phase, mais elles ont toutes la même tension.",

  scene: () => SchemasReseaux.etoileEtTriangle(),

  ceQuiSePasse: [
    ["Elle se note V", "et elle se mesure <strong>entre une phase et le neutre</strong>. Il y en a trois : V1, V2, V3. Elles sont égales, mais décalées."],
    ["Le neutre est le point commun", "au transformateur, les trois bobinages sont reliés en un même point. Ce point est le neutre, et c’est le zéro à partir duquel on compte."],
    ["C’est la tension de la maison", "un branchement domestique prend une phase et le neutre. D’où les 230 volts de vos prises."],
    ["On répartit les maisons", "sur un même transformateur de quartier, une maison sur trois est branchée sur L1, une sur L2, une sur L3. C’est ainsi qu’on garde le réseau équilibré."]
  ],
  aRetenir: [
    "<strong>V</strong> pour la tension simple, entre phase et neutre.",
    "<strong>230 V</strong> en France, et c’est ce qui arrive dans les logements.",
    "Sans neutre, il n’y a pas de tension simple mesurable : il faut un point commun pour compter."
  ],

  mesure: () => SchemasReseaux.verifierRacineDeTrois(),
  instrument: [
    "Une pointe sur la <strong>phase</strong>, l’autre sur le <strong>neutre</strong>. Sélecteur en alternatif.",
    "Les <strong>trois valeurs</strong> doivent être proches. Un écart de plus de quelques volts entre elles annonce un déséquilibre.",
    "Une valeur <strong>anormalement haute</strong> sur une phase et basse sur une autre est la signature d’un <strong>neutre coupé</strong>. C’est un défaut grave : les appareils reçoivent n’importe quoi.",
    "Sans neutre accessible, on mesure entre phase et <strong>terre</strong> : la valeur est proche, mais ce n’est pas la même mesure. Ne confondez pas les deux dans un rapport."
  ],
  dangerDeMesure: "Un neutre coupé fait monter la tension simple bien au-dessus de 230 volts sur les phases les moins chargées. Des appareils brûlent, et rien ne déclenche.",

  ecriture: {
    symbole: 'V', unite: 'V', nomUnite: 'le volt — la lettre V sert deux fois',
    multiples: [
      ['V1, V2, V3', 'les trois tensions simples, une par phase'],
      ['230 V', 'la valeur française'],
      ['127 V', 'l’ancien réseau — encore mentionné sur de vieilles plaques']
    ]
  },
  surUnePlaque: [
    "Attention à une confusion d’écriture : la lettre <strong>V</strong> désigne <strong>la grandeur</strong> tension simple, et aussi <strong>l’unité</strong> volt. Le contexte tranche.",
    "Sur une <strong>plaque de moteur</strong>, la plus petite des deux tensions correspond au couplage <strong>triangle</strong>. Ce n’est pas la tension simple du réseau : c’est ce que chaque bobinage doit recevoir.",
    "Dans un <strong>rapport de mesure</strong>, on note toujours <em>entre quels points</em>. « 231 V » ne veut rien dire ; « 231 V entre L1 et N » veut dire quelque chose.",
    "Sur un <strong>plan</strong>, la tension simple n’est presque jamais écrite : elle se déduit. C’est la composée qui est notée."
  ],

  quiz: [
    { question: "Entre quoi et quoi mesure-t-on une tension simple ?",
      confirmation: "Entre une phase et le neutre.",
      reponses: [
        { texte: "Entre une phase et le neutre.", juste: true },
        { texte: "Entre deux phases.", pourquoi: "C’est la tension composée." },
        { texte: "Entre le neutre et la terre.", pourquoi: "Cette mesure donne à peu près zéro : les deux sont reliés en amont." },
        { texte: "Entre une phase et la terre.", pourquoi: "La valeur est proche, mais ce n’est pas la définition, et ce n’est pas la même mesure." } ] },

    { question: "D’où vient le neutre, physiquement ?",
      confirmation: "C’est le point commun des trois bobinages du transformateur.",
      reponses: [
        { texte: "Du piquet de terre de l’installation.", pourquoi: "Le PE part du piquet ; le neutre vient du transformateur." },
        { texte: "Du point commun des trois bobinages.", juste: true },
        { texte: "D’un quatrième bobinage du transformateur.", pourquoi: "Il n’y a que trois bobinages : le neutre est leur point commun." },
        { texte: "Du disjoncteur de branchement.", pourquoi: "Le disjoncteur ne fabrique aucun conducteur." } ] },

    { question: "Vous mesurez 260 V sur une phase et 190 V sur une autre, vers le neutre. Que soupçonner ?",
      confirmation: "Un neutre coupé : les tensions se répartissent alors n’importe comment.",
      reponses: [
        { texte: "Un déséquilibre de charges normal.", pourquoi: "Un déséquilibre ordinaire ne fait pas varier les tensions simples de cette ampleur." },
        { texte: "Une phase manquante.", pourquoi: "Une phase manquante donnerait zéro, pas 190." },
        { texte: "Un neutre coupé.", juste: true },
        { texte: "Un multimètre déréglé.", pourquoi: "Il donnerait la même erreur sur les deux mesures." } ] },

    { question: "Sans neutre accessible, peut-on mesurer une tension simple ?",
      confirmation: "Pas à proprement parler : il faut un point commun pour compter.",
      reponses: [
        { texte: "Oui, entre deux phases.", pourquoi: "Cela donne la composée, qui est une autre grandeur." },
        { texte: "Oui, en divisant la composée par deux.", pourquoi: "Le rapport n’est pas 2 mais 1,73 — et ce serait un calcul, pas une mesure." },
        { texte: "Oui, avec un ohmmètre.", pourquoi: "Un ohmmètre ne mesure aucune tension." },
        { texte: "Non : sans point commun, on ne peut pas la mesurer directement.", juste: true } ] }
  ],

  retenir: [
    "<strong>V</strong> : entre une <strong>phase</strong> et le <strong>neutre</strong>. 230 V.",
    "<strong>Le neutre est le point commun</strong> des trois bobinages du transformateur.",
    "<strong>Trois valeurs proches</strong> attendues. Un écart annonce un défaut.",
    "<strong>Une tension se note toujours avec ses deux points</strong> : « 231 V entre L1 et N »."
  ],

  objectifs: '<p><strong>Objectif.</strong> Définir la tension simple, savoir où elle se mesure, et reconnaître à la mesure un neutre coupé.</p><p><strong>Limite.</strong> Le calcul vectoriel complet du triphasé déséquilibré n’est pas traité.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.5 La tension composée" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.2 La tension" } ]
});
