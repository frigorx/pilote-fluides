/* ÉlectroRézo 8.5 — Le déclencheur thermique. */

ModeleSigne.construire({
  id: '8.5',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 5',
  titre: "Le déclencheur thermique",
  lettre: 'thermique',
  narration: NARRATION,

  ceQuelleDit: "Un crochet courbe, accroché à un appareil de protection. Il dit : cet appareil surveille la chaleur, et il déclenche quand le courant dure trop longtemps au-dessus du normal.",
  ouOnLaVoit: "Sur le relais thermique, sur le disjoncteur magnéto-thermique, sur le disjoncteur moteur. Jamais seul : toujours accroché à un contact.",

  pourquoiCetteForme: [
    "<strong>Ce crochet, c’est un bilame vu de profil.</strong> Deux métaux différents collés en une seule lame.",
    "Quand le courant chauffe, <strong>l’un des deux métaux s’allonge plus que l’autre</strong>. Comme ils sont collés, la lame ne peut pas rester droite : elle se courbe.",
    "Elle se courbe <strong>lentement</strong>, à mesure que la chaleur monte, puis pousse un levier qui coupe.",
    "<strong>La conséquence est immédiate</strong> : cet appareil voit très bien une surcharge qui dure, et pas du tout un court-circuit — fini avant que la lame ait bougé. Pour celui-là, il faut le signe de la station suivante."
  ],

  motsOuOnLaTrouve: ['relaisThermique', 'magnetoThermique', 'sectionneur'],
  motVedette: 'magnetoThermique',

  symbolesBiblio: [
    { src: 'assets/relais_mono.svg', alt: "Symbole normalisé d’un relais thermique.", legende: "Un relais thermique" }
  ],
  duDessinAuPlan: [
    "Sur les symboles officiels, le bilame se dessine <strong>parfois comme un crochet, parfois comme un rectangle avec une ligne brisée</strong> à l’intérieur. Les deux se rencontrent.",
    "Ce qui ne change jamais : <strong>de la chaleur, du temps, et une protection contre les surcharges lentes</strong>.",
    "Un appareil qui porte ce signe se règle : le courant de réglage est écrit à côté."
  ],

  quiz: [
    { question: "D’où vient la forme courbe de ce signe ?",
      confirmation: "C’est le portrait de la pièce : un bilame déformé par la chaleur.",
      reponses: [
        { texte: "De la courbe de déclenchement tracée sur une abaque.", pourquoi: "Les abaques existent, mais ce n’est pas ce que le signe représente." },
        { texte: "D’un bilame qui se courbe en chauffant.", juste: true },
        { texte: "D’un choix graphique arbitraire, à mémoriser.", pourquoi: "Presque aucun signe de cette norme n’est arbitraire : ils viennent des mécanismes." },
        { texte: "De la forme du boîtier de l’appareil.", pourquoi: "Les boîtiers sont rectangulaires, et de toute façon la norme ne dessine pas les boîtiers." } ] },

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
    "<strong>Le crochet courbe = un bilame</strong>, vu de profil.",
    "Il surveille <strong>la chaleur et la durée</strong> : les surcharges lentes.",
    "<strong>Il ne voit pas le court-circuit</strong> — trop rapide pour lui.",
    "Le dessin n’est pas un code : c’est le portrait de la pièce."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que le crochet courbe représente un bilame, savoir ce qu’il protège et ce qu’il ne protège pas.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/30_thermal_relays/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique" },
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique" } ]
});
