/* T5 — Humidifier, déshumidifier, réguler
   Ligne T · Centrale de traitement d’air
   CP10 · Réaliser l’étude d’une centrale de traitement d’air
   Correspondances : ligne A · L’humidité relative · ligne T · Batteries

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   La station L'humidité relative explique la grandeur pour elle-même ; ici, on agit
   dessus en centrale, et on regarde la boucle qui commande cette action.
   Le point de rosée sert de consigne, pas de notion à redécouvrir. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "T",
  id: "humidifier-reguler",
  title: "Humidifier, déshumidifier, réguler",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Distinguez température et humidité.",
  bac: "Observez l’action d’une consigne et d’un capteur.",
  bts: "Concevez une séquence de régulation cohérente, avec sécurités et modes économes.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Le même air, à deux températures : le nombre de gouttes de vapeur ne change pas, c’est la place disponible pour elles qui grandit. Une centrale fait exactement cela chaque matin d’hiver — elle prend l’air du dehors, et elle le chauffe. Rien n’a été ajouté, rien retiré. Regardez le point de rosée calculé sous les curseurs : c’est la seule valeur affichée qui dise ce que l’air porte réellement en eau. Retenez-la, vous allez vous en servir.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Traiter l’air, ce n’est pas seulement le chauffer et le refroidir : c’est aussi régler ce qu’il porte en eau. Une centrale dispose pour cela de deux actions opposées, et d’une boucle qui décide quand les employer.\n\nHumidifier, d’abord. L’air neuf d’hiver arrive froid ; une fois chauffé, il transporte toujours la même eau, mais son humidité relative s’effondre. Trop sec, il irrite les gorges, charge d’électricité statique et fait travailler le bois. On lui ajoute donc de l’eau, de deux façons : en la vaporisant — l’air se refroidit alors, parce que l’eau lui prend de la chaleur pour s’évaporer —, ou en injectant de la vapeur, et la température bouge à peine. Un humidificateur mal entretenu devient un nid à micro-organismes que la centrale souffle ensuite dans tout le bâtiment : son entretien fait partie de l’installation, pas des options.\n\nDéshumidifier, ensuite. Il n’existe qu’une méthode courante en centrale : faire passer l’air sur une surface plus froide que son point de rosée. C’est le rôle de la batterie froide. Elle refroidit souvent plus que nécessaire pour l’atteindre, et il faut alors réchauffer derrière. On paie deux fois — c’est pourquoi on ne déshumidifie que si le besoin le justifie.\n\nRéguler, enfin. Une boucle demande au minimum une grandeur mesurée, une consigne, et un moyen d’agir : vanne, registre, humidificateur. Il y manque souvent une quatrième chose, la plus importante : la nouvelle mesure, celle qui vérifie que l’action a produit l’effet attendu. Sans elle, ce n’est plus une régulation, c’est une commande. L’emplacement de la sonde décide du reste : sur la reprise, on règle sur ce que vit le local ; en gaine de soufflage, on règle sur ce qu’on envoie. Les deux se pratiquent, et elles ne disent pas la même chose.\n\nReste le free cooling — le rafraîchissement par l’air extérieur. Il consiste à ouvrir en grand le registre d’air neuf et à fermer le recyclage quand le dehors est plus favorable que le dedans, pour refroidir sans faire tourner la machine frigorifique. Mais « favorable » ne se réduit pas à la température : un air extérieur plus frais et très humide apporte de l’eau qu’il faudra retirer, et la déshumidification coûte plus que le refroidissement gagné. La décision se prend sur la chaleur totale de l’air, pas sur le seul thermomètre — et encore faut-il que les registres puissent réellement s’ouvrir en grand.",

  method: "Une boucle demande une grandeur mesurée, une consigne, un moyen d’agir — et la nouvelle mesure qui vérifie l’effet obtenu.",
  formula: "Mesure → comparaison → action → nouvelle mesure",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Réglez l’air neuf d’hiver — 5 °C et 80 % d’humidité relative — et notez le point de rosée affiché. Montez ensuite la température à 20 °C, comme le fait la batterie chaude, puis cherchez l’humidité relative qui redonne ce même point de rosée, à un dixième de degré près : c’est l’air que vous obtenez sans avoir ajouté une seule goutte d’eau. Passez enfin à l’été, 26 °C et 60 %, et lisez le point de rosée obtenu.",
  lecture: "Vous devez trouver environ 30 % après la batterie chaude, contre 80 % à l’entrée : exactement la même eau, et un air devenu sec. C’est ce qui justifie un humidificateur, et c’est ce qu’on compare à la plage d’humidité visée par le projet. En été, le point de rosée lu devient une consigne : une batterie froide qui ne descend pas sous cette température refroidira l’air sans lui retirer un gramme d’eau.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le point de rosée affiché est une estimation calculée pour de l’air à pression courante ; un relevé réel dépend de l’instrument et de son étalonnage. Cette station ne dit rien des quantités d’eau à ajouter ou à retirer : elles se lisent sur le diagramme de l’air humide, en grammes d’eau par kilogramme d’air, et c’est là que se fait une étude. Enfin, aucune plage d’humidité de confort n’est figée ici : les valeurs applicables dépendent du local, de son usage, du texte applicable au projet et de sa version.",

  activity: {"kind":"humidity","temperature":20,"rh":40},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "À l’écran, un même air présenté à deux températures. Le nombre de gouttes de vapeur est identique des deux côtés ; c’est la place disponible pour elles qui grandit avec la chaleur. Une centrale de traitement d’air fait exactement cela, tous les matins d’hiver : elle prend l’air du dehors, et elle le chauffe. Elle n’a rien ajouté, rien retiré. Et pourtant, à la sortie, cet air est devenu sec. Assez sec pour irriter les gorges, charger les vêtements d’électricité statique et faire travailler le bois d’un parquet. C’est ce problème-là qu’on va traiter, avec ses deux remèdes opposés et la boucle qui décide lequel employer.",

    comprendre: "Deux actions, exactement opposées. Humidifier, d’abord, quand l’air est devenu trop sec parce qu’on l’a chauffé. On lui ajoute de l’eau, de deux manières. Soit on la vaporise, et l’air se refroidit un peu au passage, parce que l’eau lui prend de la chaleur pour s’évaporer. Soit on injecte directement de la vapeur, et la température bouge à peine. Un point qui n’est pas une option : un humidificateur mal entretenu devient un nid à microbes, que la centrale souffle ensuite dans tout le bâtiment. Déshumidifier, ensuite. En centrale, il n’existe qu’une méthode courante : faire passer l’air sur une surface plus froide que son point de rosée. C’est la batterie froide qui fait tomber l’eau. Seulement, pour descendre sous ce point, elle refroidit souvent plus que nécessaire, et il faut réchauffer derrière. On paie donc deux fois. C’est la raison pour laquelle on ne déshumidifie que si le besoin le justifie vraiment.",

    manipuler: "Commençons par l’hiver. Cinq degrés dehors, quatre-vingts pour cent d’humidité : le point de rosée s’affiche, gardez-le en tête. Faites maintenant ce que fait la batterie chaude, montez la température à vingt degrés, puis cherchez l’humidité relative qui redonne ce même point de rosée. Vous tomberez autour de trente pour cent. Aucune goutte d’eau n’a été ajoutée ni retirée, et l’air est pourtant devenu sec : voilà pourquoi une centrale porte parfois un humidificateur. Passez ensuite à l’été, vingt-six degrés et soixante pour cent. Le point de rosée que vous lisez est une consigne de réglage : c’est la température sous laquelle la batterie froide doit descendre pour retirer de l’eau.",

    verifier: "Deux questions, sans note. Un mot d’abord sur la régulation, qui commande tout cela. Une boucle demande au minimum une grandeur mesurée, une consigne, et un moyen d’agir. Il en manque souvent une quatrième, la plus importante : la nouvelle mesure, celle qui vérifie que l’action a produit l’effet attendu. Sans elle, ce n’est pas une régulation, c’est une commande. Un mot enfin sur le free cooling, le rafraîchissement par l’air extérieur. Il ne consiste pas à ouvrir dès qu’il fait plus frais dehors : un air extérieur plus frais mais très chargé en eau coûtera plus cher à sécher qu’il ne rapporte en fraîcheur."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une régulation a besoin, au minimum…","d’une mesure et d’une consigne",["d’une mesure et d’une consigne","d’un automate et d’un écran","d’une sonde placée en gaine"]],
    ["Le free cooling consiste à…","rafraîchir avec l’air extérieur favorable",["couper le ventilateur pendant la nuit","rafraîchir avec l’air extérieur favorable","régler la batterie froide au minimum"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Décider si l’air soufflé doit être humidifié ou séché, et régler la boucle qui s’en charge.",
    acquis: {
      cap: ["Distingue la température de l’air de ce qu’il porte en eau", "Repère l’humidificateur et la batterie froide dans une centrale", "Lit la consigne affichée sur un régulateur"],
      bac: ["Explique pourquoi chauffer un air le rend plus sec sans rien lui retirer", "Relie la déshumidification au passage sous le point de rosée", "Nomme les éléments d’une boucle de régulation"],
      bts: ["Choisit l’emplacement d’une sonde et en justifie l’effet sur le réglage", "Discute le coût du couple refroidir puis réchauffer d’une déshumidification", "Énonce les conditions dans lesquelles le free cooling est réellement favorable"]
    },
    sources: [
      "6.5.1 Technologie (CTA) — architecture d’une centrale (Bac MFER)",
      "WA10 — CTA modulaire, architecture et potentiel pédagogique (machines ERM)",
      "inerWeb Aéraulique v5 — condensation et air humide"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Batteries chaude et froide", pourquoi: "c’est elle qui déshumidifie, en descendant sous le point de rosée lu ici"},
      {reseau: "AéroRézo", station: "L’humidité relative", pourquoi: "la grandeur sur laquelle on agit ici y est expliquée pour elle-même"}
    ]
  }
});
