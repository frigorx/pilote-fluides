/* A2 — Trois pressions
   Ligne A · Air & hygrométrie
   Socle commun · appui CP8, CP9 et CP10

   Station d'instrumentation : elle appartient au parcours A, mais elle a été rédigée
   avec la ligne M (mesure et diagnostic), dont elle ouvre les instruments.

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "A",
  id: "pressions",
  title: "Trois pressions",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Observez une pression dans une gaine sans confondre les prises.",
  bac: "Différenciez pression statique et pression dynamique.",
  bts: "Utilisez la relation entre pression totale, statique et dynamique.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Deux prises sont plantées dans la même gaine, à quelques centimètres l’une de l’autre, et elles ne donnent pas la même valeur. Celle de gauche est percée perpendiculairement à la paroi : l’air la longe sans la heurter. Celle de droite est un tube coudé, ouvert bien en face du flux : l’air vient buter dedans. Suivez les deux liaisons qui descendent vers le manomètre — c’est la différence entre ces deux prises qui fait tout le métier de la mesure d’air.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "L’air en mouvement dans une gaine porte deux pressions à la fois, et il faut les séparer.\n\nLa pression statique est celle que l’air exerce sur la paroi, dans toutes les directions. C’est elle qui pousse une gaine à se gonfler ou à se plier. On la relève avec un simple trou percé perpendiculairement à la paroi, sans bavure, à un endroit où l’écoulement est calme. Dans une gaine placée du côté aspiration du ventilateur, elle est négative : le manomètre affiche un nombre au-dessous de zéro, et ce n’est pas une panne.\n\nLa pression dynamique est celle que l’air doit au seul fait d’avancer. Elle dépend de la vitesse et de la masse volumique de l’air, et elle est toujours positive. Elle ne se mesure pas directement : on la déduit.\n\nLa pression totale est la somme des deux. Le tube de Pitot la relève : ouvert face au flux, il reçoit à la fois la poussée de l’air et la pression exercée sur les parois. Sa prise latérale, elle, ne voit que la statique. Le manomètre branché entre les deux fait la soustraction et affiche la dynamique — d’où l’on tire la vitesse.\n\nDeux pièges coûtent cher. Un tube de Pitot mal orienté, même de quelques degrés, annonce moins que la réalité : on le tourne jusqu’à lire la valeur maximale. Et aux faibles vitesses, la pression dynamique devient si petite que le manomètre ne la distingue plus de son propre bruit de fond : autour de deux mètres par seconde, elle ne vaut plus que quelques pascals. C’est là que l’anémomètre à fil chaud reprend la main.",

  method: "Nommer la pression avant d’utiliser une valeur évite la plupart des erreurs de mesure.",
  formula: "pₜ = pₛ + p_dyn (Pa)  ·  p_dyn = ½ ρv²  ·  ρ ≈ 1,2 kg/m³",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Deux curseurs : la pression statique et la pression dynamique. Posez 120 pascals de statique et 45 de dynamique, et lisez la totale obtenue. Descendez ensuite la statique au-dessous de zéro, comme dans une gaine en aspiration, sans toucher à la dynamique : la totale peut devenir négative à son tour, alors que la dynamique, elle, ne l’est jamais. Remontez enfin la dynamique jusqu’à 250 pascals : c’est l’air qui accélère.",
  lecture: "La totale affichée est bien la somme des deux valeurs, jamais autre chose. Le signe compte autant que le nombre : une statique négative dit que la gaine est du côté où le ventilateur tire. La dynamique reste positive tant que l’air avance ; à zéro, l’air est arrêté. Et si vous cherchez une vitesse, c’est la dynamique qu’il vous faut — ni la totale, ni la statique.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "La station additionne deux nombres : sur une installation, aucun appareil n’affiche les trois pressions ensemble. On en relève deux et on déduit la troisième. La masse volumique de l’air, prise ici autour de 1,2 kilogramme par mètre cube, change avec la température et l’altitude : en gaine chaude ou en montagne, la vitesse tirée de la pression dynamique demande une correction.",

  activity: {"kind":"pressure","static":120,"dynamic":45},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Regardez les deux prises plantées dans cette gaine. Elles sont à quelques centimètres l’une de l’autre, dans le même air, et pourtant elles ne diront pas la même chose. Celle de gauche est un simple trou dans la paroi, percé bien perpendiculairement : l’air la longe sans jamais la heurter. Celle de droite est un tube coudé, ouvert en plein dans le courant : l’air vient buter dedans, et cette poussée s’ajoute au reste. Toute la mesure d’air tient dans l’écart entre ces deux trous.",

    comprendre: "Pourquoi deux pressions, et pas une seule ? Parce que l’air fait deux choses en même temps. Il pousse sur les parois, dans tous les sens : c’est la pression statique, celle qui gonfle une gaine ou la fait claquer. Et il avance : ce mouvement porte lui aussi une pression, qu’on appelle dynamique, et qui dépend de la vitesse. La somme des deux est la pression totale, celle que reçoit le tube ouvert face au courant. Voilà pourquoi on branche le manomètre entre les deux prises : la soustraction se fait toute seule, et ce qui reste est la part due au mouvement. De là on tire la vitesse. Deux détails coûtent cher, maintenant. Un tube de travers, même de quelques degrés, annonce moins que la réalité : on le tourne jusqu’à lire le maximum. Et quand l’air va lentement, la part dynamique devient si petite que l’appareil ne la voit plus. Ce jour-là, le fil chaud reprend le travail.",

    manipuler: "Deux curseurs, et une idée à vérifier. Commencez avec les valeurs proposées, et gardez en tête la totale obtenue. Ensuite, faites descendre la statique au-dessous de zéro, sans toucher à l’autre. Vous venez de simuler une gaine placée du côté aspiration du ventilateur : la pression y est plus basse que dans le local. La totale suit, et peut devenir négative elle aussi. La dynamique, non : tant que l’air avance, elle reste positive, parce qu’un mouvement ne se retranche pas.",

    verifier: "Deux questions, sans note, pour voir si la distinction tient. Elles ne servent pas à sanctionner mais à repérer ce qui reste flou pendant qu’on peut encore le reprendre. En cas d’erreur, la bonne réponse arrive avec son explication, et c’est là que la station se joue. Ce qu’il faut garder tient en peu de mots : la statique pousse sur les parois, la dynamique vient du mouvement, la totale est leur somme, et c’est la dynamique seule qui donne une vitesse."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["La pression totale vaut…","la statique plus la dynamique",["la statique moins la dynamique","la dynamique moins la statique","la statique plus la dynamique"]],
    ["Une prise perpendiculaire à la paroi mesure…","la pression exercée sur la paroi",["la pression exercée sur la paroi","la vitesse de l’air au centre","la somme des deux pressions"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Relever une pression dans une gaine sans confondre les prises, et en tirer une vitesse.",
    acquis: {
      cap: ["Distingue une prise perpendiculaire à la paroi d’un tube ouvert face au flux", "Lit une valeur en pascals avec son signe", "Nomme les trois pressions"],
      bac: ["Relie la pression dynamique à la vitesse de l’air", "Oriente un tube de Pitot jusqu’à la valeur maximale", "Explique une pression statique négative par l’aspiration"],
      bts: ["Déduit une vitesse d’une pression dynamique mesurée", "Situe la limite basse d’emploi du tube de Pitot", "Corrige la masse volumique quand la température de l’air l’exige"]
    },
    sources: [
      "Relation entre pression dynamique et vitesse de l’air, masse volumique de référence 1,2 kg/m³ (air à 20 °C, pression atmosphérique ordinaire)",
      "Notices des manomètres différentiels et des tubes de Pitot : la plage utile et la résolution changent d’un modèle à l’autre"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "L’air se déplace (A1)", pourquoi: "la distinction entre les trois pressions y est annoncée ; ici elle est instrumentée"},
      {reseau: "AéroRézo", station: "Mesurer les pressions (M3)", pourquoi: "les mêmes prises, appliquées cette fois à un réseau en service et à ses organes"}
    ]
  }
});
