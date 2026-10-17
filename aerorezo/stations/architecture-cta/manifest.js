/* T1 — Lire une CTA
   Ligne T · Centrale de traitement d’air
   CP10 · Réaliser l’étude d’une centrale de traitement d’air
   Correspondance : ligne V · VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   La station VMC double flux installe le système et nomme ses quatre flux ; ici, on
   ouvre la centrale entière et on la lit caisson par caisson. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "T",
  id: "architecture-cta",
  title: "Lire une CTA",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Placez prise d’air, registres, filtres, batteries et ventilateur.",
  bac: "Expliquez la fonction de chaque section et le sens de l’air.",
  bts: "Composez une architecture répondant au besoin, aux pressions, à l’énergie et à la maintenance.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Suivez l’air dans la centrale coupée. Il est pris dehors par la grille du bas, traverse les caissons posés bout à bout, puis part vers le local par la gaine de soufflage. Il revient du local par la gaine de reprise, en haut : une partie redescend se mélanger à l’air neuf, le reste repart dehors par la grille du haut. Toute la centrale tient dans ce couloir de caissons, entre la prise d’air et le soufflage. Regardez aussi les deux traversées de mur : la prise et le rejet sont deux ouvertures différentes, et la distance qui les sépare n’est pas décorative.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Une centrale de traitement d’air n’est rien d’autre qu’un couloir d’air fermé, découpé en caissons posés bout à bout. Chaque caisson fait une chose, et une seule. C’est pour cela qu’on la lit dans le sens de l’air, jamais dans l’ordre où le schéma a été dessiné.\n\nL’ordre courant, côté soufflage : la prise d’air neuf et son registre, qui dose ce qu’on fait entrer ; le caisson de mélange, où l’air repris du local rejoint l’air neuf ; le filtre ; le récupérateur, quand il y en a un ; les batteries, chaude puis froide ; l’humidificateur s’il est prévu ; enfin le ventilateur de soufflage, qui pousse l’air traité dans les gaines. Côté reprise, l’air revient du local, traverse son propre filtre et le récupérateur, puis se partage : une part repart au mélange, l’autre est rejetée dehors. Ce sont les registres qui font ce partage.\n\nPourquoi le filtre avant les batteries, et jamais après ? Parce qu’une batterie est un serpentin noyé dans des ailettes serrées. Encrassée, elle ne se nettoie pas sur place : il faut démonter. Un filtre, lui, se change en quelques minutes. Le filtre protège ce qui vient après lui — c’est la règle qui commande l’ordre des caissons.\n\nRestent les points de mesure, à repérer dès la lecture du plan. Deux prises de pression de part et d’autre du filtre, pour suivre son encrassement. Une sonde après les batteries, c’est elle qui commande le chauffage et le refroidissement. Une sonde sur la reprise, qui donne l’état réel du local.\n\nEt une contrainte qu’on oublie sur le papier : les portes de visite. Une centrale se pose avec l’espace pour les ouvrir en grand et sortir un filtre. Une centrale calée contre un mur, porte côté mur, est une centrale qu’on n’entretiendra pas. La prise d’air, enfin, se place à l’écart du rejet, d’un parking ou d’une sortie de cuisine : sinon la centrale respire son propre air vicié, et rien ne le signale sur un afficheur.",

  method: "Lisez la centrale dans le sens de l’air, caisson par caisson, et nommez la fonction de chacun. Ce qui protège se place avant ce qu’il protège.",
  formula: "Prise d’air → registres → mélange → filtre → récupérateur → batteries → humidificateur → ventilateur → soufflage",

  /* Manipuler — une action précise. La scène de cette station n'a pas de curseur :
     l'élève compose l'ordre des caissons sur le trajet affiché. */
  consigne: "Suivez le trajet numéroté et nommez les quatre flux à voix haute. Placez ensuite, entre le repère un et le repère deux, les caissons dans l’ordre : registres, mélange, filtre, batteries, ventilateur. Vérifiez enfin trois points sur votre composition — le filtre est-il avant les batteries, la prise d’air est-elle éloignée du rejet, et reste-t-il devant chaque porte la place de l’ouvrir ?",
  lecture: "Un filtre posé après la batterie garde la gaine propre et abandonne la batterie : l’air passera de moins en moins, et le nettoyage demandera de démonter. Une prise d’air trop proche du rejet fait reprendre à la centrale l’air qu’elle vient d’évacuer, sans qu’aucun voyant ne s’allume. Et une porte qu’on ne peut pas ouvrir en grand condamne l’entretien : la centrale est alors déjà en panne, à retardement.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "L’ordre décrit ici est celui d’une centrale de confort courante. Un local de fabrication, un bloc opératoire ou une salle propre ajoutent des sections et changent les priorités. Aucun débit d’air neuf, aucune classe de filtre, aucune distance entre prise et rejet ne sont figés dans cette station : ils dépendent du texte applicable au projet et de sa version, et se cherchent au dossier. Le nombre de caissons ne se déduit pas d’un dessin, il se déduit du besoin.",

  activity: {"kind":"flow","variant":"cta"},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Le trajet à l’écran est numéroté de un à quatre : l’air est pris dehors, soufflé dans le local, repris, puis rejeté dehors. Un aller et un retour, comme sur une double flux. Mais entre le premier repère et le deuxième, il n’y a qu’un simple virage dessiné — et c’est justement là que se trouve la centrale de traitement d’air. Tout ce qu’on va faire subir à cet air, le doser, le filtrer, le chauffer, le refroidir, l’humidifier, tient dans cet intervalle. Une centrale, au fond, ce n’est rien d’autre qu’un couloir d’air fermé, découpé en caissons posés bout à bout.",

    comprendre: "Une centrale se lit comme on suit une rivière, de la source vers l’aval, jamais dans l’ordre du dessin. L’air y traverse une suite de caissons, et chacun n’a qu’un seul rôle : doser l’entrée, mélanger, filtrer, récupérer la chaleur, chauffer ou refroidir, humidifier, puis souffler. Cet ordre n’a rien d’arbitraire. Le filtre est placé tôt pour protéger tout ce qui suit, notamment les batteries : une batterie encrassée se démonte, alors qu’un filtre se change en quelques minutes. Côté reprise, l’air revient du local puis se partage entre le mélange et le rejet. Devant une centrale inconnue sur un chantier, il suffit de suivre l’air pour que chaque caisson trouve sa place. Passons à la manipulation.",

    manipuler: "Suivez le trajet numéroté et nommez les quatre flux, un par un. Ensuite, dans votre tête, glissez les caissons entre le premier repère et le deuxième, dans l’ordre : les registres, le mélange, le filtre, les batteries, le ventilateur. Trois questions permettent de contrôler ce que vous avez composé. Le filtre est-il bien avant les batteries ? La prise d’air est-elle assez loin du rejet, pour que la centrale ne respire pas l’air qu’elle vient d’évacuer ? Et reste-t-il, devant chaque porte de visite, la place de l’ouvrir en grand ? Cette dernière question paraît secondaire. C’est pourtant elle qui décide si le filtre sera changé un jour, ou jamais.",

    verifier: "Deux questions, sans note. Elles servent à repérer ce qui n’est pas encore en place, pendant qu’il est encore temps ; en cas d’erreur, la bonne réponse s’affiche avec son explication. Deux choses à emporter. La première : une centrale se lit dans le sens de l’air, et chaque caisson se nomme par ce qu’il fait. La seconde, moins évidente : un caisson qu’on ne peut pas ouvrir est un caisson qu’on n’entretiendra pas. La maintenance ne s’ajoute pas après coup, elle se dessine en même temps que la centrale."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une centrale de traitement d’air se lit…","dans le sens de circulation de l’air",["du caisson le plus grand vers le plus petit","dans le sens de circulation de l’air","en partant toujours de la batterie chaude"]],
    ["Le filtre d’une centrale doit être…","accessible pour le contrôle et l’échange",["posé après la batterie froide","placé au plus près des bouches","accessible pour le contrôle et l’échange"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Reconnaître, devant une centrale ouverte, la fonction de chaque caisson et l’ordre dans lequel l’air les traverse.",
    acquis: {
      cap: ["Suit le sens de l’air d’un caisson au suivant", "Nomme la prise d’air, le filtre, la batterie et le ventilateur", "Repère la porte de visite du caisson de filtration"],
      bac: ["Explique la fonction de chaque section de la centrale", "Justifie la position du filtre avant les batteries", "Situe les prises de pression et les sondes de température"],
      bts: ["Compose l’ordre des caissons à partir d’un besoin donné", "Discute l’implantation de la prise d’air au regard du rejet", "Intègre l’accès à la maintenance dès la composition"]
    },
    sources: [
      "6.5.1 Technologie (CTA) — architecture d’une centrale (Bac MFER)",
      "WA10 — CTA modulaire, architecture et potentiel pédagogique (machines ERM)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "VMC double flux", pourquoi: "la double flux est une centrale de traitement d’air, en petit : mêmes flux, moins de caissons"},
      {reseau: "AéroRézo", station: "Mélange et filtration", pourquoi: "les deux premiers caissons du parcours y sont traités pour eux-mêmes"}
    ]
  }
});
