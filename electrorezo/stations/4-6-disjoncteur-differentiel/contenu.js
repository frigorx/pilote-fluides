/* ÉlectroRézo 4.6 — Le disjoncteur différentiel. */

ModeleAppareil.construire({
  id: '4.6', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 6',
  titre: "Le disjoncteur différentiel",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/disj-differentiel-c16.png', alt: "Photo d’un disjoncteur différentiel modulaire de calibre C16.",
      titre: "Deux appareils en un.", sous: "Il porte un calibre — C16 — et une sensibilité : 30 mA." },
    { src: 'assets/biblio/disj-differentiel-dx3.jpeg', alt: "Photo d’un disjoncteur différentiel 40 A modulaire.",
      titre: "Plus large.", sous: "Il occupe plus de place qu’un disjoncteur simple : il y a plus de choses dedans." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Réunir dans un seul boîtier le disjoncteur et le différentiel : surcharge, court-circuit <em>et</em> défaut d’isolement.",
  ouOnLeTrouve: "Sur un circuit qui a besoin de sa propre protection différentielle — plaque de cuisson, borne de recharge, circuit extérieur.",

  scene: () => SchemasProtection.toreDifferentiel(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["Un bilame", "pour la surcharge, comme dans tout disjoncteur."],
    ["Une bobine", "pour le court-circuit."],
    ["Un tore", "pour la différence entre l’aller et le retour. C’est ce qui l’ajoute au disjoncteur ordinaire."],
    ["Trois surveillances, un seul mécanisme", "n’importe laquelle des trois fait ouvrir le même contact."]
  ],

  variantes: [
    "<strong>Calibre et sensibilité</strong> se lisent ensemble : « C16 · 30 mA ».",
    "<strong>Types AC, A, F, B</strong> — comme l’interrupteur différentiel.",
    "<strong>Bloc différentiel adaptable</strong> — un module qu’on clipse sous un disjoncteur existant.",
    "Il coûte plus cher qu’un disjoncteur simple : on le réserve aux circuits qui le demandent."
  ],

  aptitudes: {
    surcharge: true, courtCircuit: true, defautIsolement: true,
    bonneReponse: "Les trois. C’est le seul appareil de cette ligne qui voit tout : un bilame, une bobine et un tore dans le même boîtier.",
    erreurs: {
      surcharge: "Il voit la surcharge : il y a un bilame dedans.",
      courtCircuit: "Il voit le court-circuit : il y a une bobine dedans.",
      defautIsolement: "Il voit le défaut d’isolement : c’est le tore qui s’en charge, et c’est ce qui le distingue du disjoncteur ordinaire."
    }
  },

  cablage: [
    "<strong>Phase et neutre du circuit passent tous deux</strong> dans l’appareil.",
    "Le neutre <strong>ne se mélange jamais</strong> avec celui d’un autre circuit en aval.",
    "Le conducteur de protection ne le traverse pas.",
    "Bouton de test à presser <strong>deux fois par an</strong>, comme pour l’interrupteur différentiel."
  ],
  piege: "Mélanger les neutres en aval de deux différentiels. L’appareil verra alors partir un courant qui revient par l’autre chemin, croira à une fuite, et déclenchera sans raison apparente. C’est une panne très difficile à trouver quand on n’y pense pas.",

  symboles: [
    { src: 'assets/ddr3.svg', alt: "Symbole normalisé d’un disjoncteur différentiel.", legende: "Disjoncteur différentiel" },
    { src: 'assets/ddr5.svg', alt: "Autre symbole normalisé de dispositif différentiel.", legende: "Autre représentation" }
  ],
  lecturePlan: [
    "Le symbole cumule les signes : <strong>crochet, demi-cercle et tore</strong>. Trois surveillances, trois dessins.",
    "C’est le symbole le plus chargé de la ligne — et il se lit signe par signe, comme les autres.",
    "À côté : <strong>calibre, courbe, sensibilité et type</strong>. Quatre informations."
  ],

  quiz: [
    { question: "Qu’est-ce qu’un disjoncteur différentiel a de plus qu’un disjoncteur ordinaire ?",
      confirmation: "Le tore, qui compare l’aller et le retour.",
      reponses: [
        { texte: "Un calibre plus élevé.", pourquoi: "Le calibre dépend du modèle, pas de la famille." },
        { texte: "Un tore, qui détecte les fuites à la terre.", juste: true },
        { texte: "Une meilleure tenue mécanique.", pourquoi: "Rien dans la fonction différentielle ne concerne la mécanique." },
        { texte: "Une coupure plus rapide.", pourquoi: "La rapidité sur court-circuit est comparable : c’est la même bobine." } ] },

    { question: "« C16 · 30 mA » sur un appareil, cela veut dire…",
      confirmation: "Deux informations pour deux fonctions.",
      reponses: [
        { texte: "Trente millisecondes de temps de coupure.", pourquoi: "Le temps de coupure existe, mais il ne s’écrit pas en mA." },
        { texte: "Trente circuits protégés.", pourquoi: "Un appareil protège un circuit." },
        { texte: "Courbe C, calibre 16 A, sensibilité 30 mA.", juste: true },
        { texte: "Seize ampères de fuite admissible.", pourquoi: "La fuite se compte en milliampères : ce serait mortel." } ] },

    { question: "Pourquoi ne pas mettre des disjoncteurs différentiels partout ?",
      confirmation: "Ils coûtent plus cher et prennent plus de place.",
      reponses: [
        { texte: "Parce que la norme l’interdit.", pourquoi: "Rien ne l’interdit : c’est un choix technique et économique." },
        { texte: "Parce que ce serait dangereux.", pourquoi: "Ce ne serait pas dangereux, seulement coûteux et encombrant." },
        { texte: "Parce qu’ils déclenchent trop souvent.", pourquoi: "Un appareil bien choisi et bien câblé ne déclenche pas sans raison." },
        { texte: "Parce qu’ils coûtent plus cher et prennent plus de place.", juste: true } ] },

    { question: "Deux différentiels, et les neutres mélangés en aval. Que se passe-t-il ?",
      confirmation: "Chacun voit partir un courant qui revient par l’autre chemin.",
      reponses: [
        { texte: "Ils déclenchent sans raison apparente.", juste: true },
        { texte: "Rien, le neutre est commun de toute façon.", pourquoi: "Il est commun en amont, pas en aval : c’est toute la différence." },
        { texte: "La protection est doublée.", pourquoi: "Elle est au contraire rendue inutilisable." },
        { texte: "Le premier prend tout le courant.", pourquoi: "Le courant se répartit selon les circuits, ce n’est pas la question ici." } ] }
  ],

  retenir: [
    "<strong>Trois surveillances dans un boîtier</strong> : bilame, bobine, tore.",
    "Il lit à la fois un <strong>calibre</strong> et une <strong>sensibilité</strong>.",
    "<strong>Ne jamais mélanger les neutres</strong> en aval de deux différentiels.",
    "Plus cher : on le réserve aux circuits qui le demandent."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que ce disjoncteur ajoute au disjoncteur ordinaire, lire ses quatre informations, et connaître le piège des neutres mélangés.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.5 L’interrupteur différentiel" },
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique" },
    { ligne: 2, couleur: '#0C4B88', texte: "2.1 Phase, neutre, PE" } ]
});
