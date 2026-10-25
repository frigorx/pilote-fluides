/* ÉlectroRézo 8.5 — Le déclencheur thermique. */

ModeleSigne.construire({
  id: '8.5',
  vue3d: { modele: 'relaisThermique', piece: 'bilames' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 5',
  titre: "Le déclencheur thermique",
  lettre: 'thermique',
  narration: NARRATION,

  prerequis: [
    { id: '4.3', quoi: "le déclencheur thermique" },
  ],

  ceQuelleDit: "Un petit crochet carré, accroché à un appareil de protection. Il dit : cet appareil surveille la chaleur, et il déclenche quand le courant dure trop longtemps au-dessus du normal.",
  ouOnLaVoit: "Sur le relais thermique, sur le disjoncteur magnéto-thermique, sur le disjoncteur moteur. En général accroché au trait du courant d’un appareil de protection.",

  pourquoiCetteForme: [
    "<strong>Ce crochet, c’est un bilame vu de profil.</strong> Deux métaux différents collés en une seule lame.",
    "Quand le courant chauffe, <strong>l’un des deux métaux s’allonge plus que l’autre</strong>. Comme ils sont collés, la lame ne peut pas rester droite : elle se courbe.",
    "Elle se courbe <strong>lentement</strong>, à mesure que la chaleur monte, puis pousse un levier qui coupe.",
    "<strong>La conséquence est immédiate</strong> : cet appareil voit très bien une surcharge qui dure, et pas du tout un court-circuit — fini avant que la lame ait bougé. Pour celui-là, il faut le signe de la station suivante."
  ],

  /* Le sectionneur est un leurre de l'exercice : il n'a pas de crochet, donc il n'est pas dans la carte « Les mots où elle entre ». */
  exercice: () => Signes.retrouver('thermique', ['relaisThermique', 'magnetoThermique', 'sectionneur']),
  motsOuOnLaTrouve: ['relaisThermique', 'magnetoThermique'],
  motVedette: 'magnetoThermique',

  symbolesBiblio: [
    { src: 'assets/relais_mono.svg', alt: "Symbole normalisé d’un relais thermique : trois crochets, dans un cadre en pointillé.", legende: "Un relais thermique, avec son cadre en pointillé (station 8.7)" },
    { src: 'assets/organe_relais_thermique.svg', alt: "Symbole de l’organe de commande d’un relais thermique : un rectangle, avec à l’intérieur le même crochet carré.", legende: "Autre écriture : le même crochet, dans un rectangle" }
  ],
  duDessinAuPlan: [
    "Sur les symboles officiels, le bilame se dessine <strong>parfois par le crochet seul, parfois par le même crochet à l’intérieur d’un rectangle</strong> (l’organe de commande du relais). Les deux se rencontrent.",
    "Ce qui ne change pas : <strong>de la chaleur, du temps, et une protection contre les surcharges lentes</strong>.",
    "Sur un relais thermique ou un disjoncteur moteur, il se règle : le courant de réglage est écrit à côté. Un disjoncteur magnéto-thermique de logement, lui, n’est pas réglable."
  ],

  quiz: [
    { question: "Que représente le crochet carré de ce signe ?",
      confirmation: "C’est le portrait de la pièce : un bilame, qui se courbe quand la chaleur monte.",
      reponses: [
        { texte: "Une courbe de déclenchement tracée sur une abaque.", pourquoi: "Les abaques existent, mais ce n’est pas ce que le signe représente." },
        { texte: "Un bilame (deux métaux collés) qui se courbe en chauffant.", juste: true },
        { texte: "Un choix graphique arbitraire, à mémoriser.", pourquoi: "Presque aucun signe de cette norme n’est arbitraire : ils viennent des mécanismes." },
        { texte: "La forme du boîtier de l’appareil.", pourquoi: "La norme ne dessine pas les boîtiers : le signe représente la pièce qui travaille à l’intérieur." } ] },

    { question: "Un relais thermique protège-t-il contre un court-circuit ?",
      confirmation: "Le bilame est trop lent : le court-circuit est fini avant qu’il bouge.",
      reponses: [
        { texte: "Oui, c’est même sa fonction principale.", pourquoi: "Sa fonction est la surcharge lente, pas le défaut brutal." },
        { texte: "Cela dépend de la classe de déclenchement.", pourquoi: "La classe change le temps de déclenchement en surcharge, pas la capacité à voir un court-circuit." },
        { texte: "Non : il est trop lent, il ne voit que la surcharge lente.", juste: true },
        { texte: "Oui, à condition d’être bien réglé.", pourquoi: "Aucun réglage ne rend un bilame instantané : c’est un obstacle physique." } ] },

    { question: "Sur quel appareil ne trouverez-vous jamais ce signe ?",
      confirmation: "Un sectionneur ne surveille rien : il isole.",
      reponses: [
        { texte: "Le disjoncteur magnéto-thermique.", pourquoi: "Il le porte : c’est la moitié de son nom." },
        { texte: "Le relais thermique.", pourquoi: "C’est l’appareil qui lui doit son nom." },
        { texte: "Le disjoncteur moteur.", pourquoi: "Il le porte : il surveille la surcharge du moteur." },
        { texte: "Le sectionneur.", juste: true } ] },

    { question: "Deux métaux collés, chauffés : que se passe-t-il ?",
      confirmation: "Ils s’allongent inégalement, donc la lame se courbe.",
      reponses: [
        { texte: "Ils s’allongent différemment, donc la lame se courbe.", juste: true },
        { texte: "Ils se décollent.", pourquoi: "Ils sont soudés ensemble : c’est précisément ce qui force la courbure." },
        { texte: "Rien tant que le courant reste alternatif.", pourquoi: "La chaleur ne dépend pas de la nature du courant, mais de son intensité et de sa durée." },
        { texte: "Ils fondent tous les deux.", pourquoi: "On est très loin des températures de fusion : la lame se déforme, elle ne fond pas." } ] }
  ],

  retenir: [
    "<strong>Le crochet carré = un bilame</strong>, vu de profil.",
    "Il surveille <strong>la chaleur et la durée</strong> : les surcharges lentes.",
    "<strong>Il ne voit pas le court-circuit</strong> — trop rapide pour lui.",
    "Le dessin n’est pas un code : c’est le portrait de la pièce."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que le crochet carré représente un bilame, savoir ce qu’il protège et ce qu’il ne protège pas.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/30_thermal_relays/ · svg/10_electric/91_en_60617/en_60617_07/en_60617_07_15/en_60617_07_15_21.svg' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique" },
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique" } ]
});
