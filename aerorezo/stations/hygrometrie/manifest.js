/* A4 — L’humidité relative
   Ligne A · Air & hygrométrie
   Socle commun · appui CP8, CP9 et CP10
   Correspondances : lignes V · C · M

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Gare de correspondance à quatre lignes : elle est traversée par la VMC, la
   climatisation et la mesure. Son vocabulaire doit tenir pour les trois. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "A",
  id: "hygrometrie",
  title: "L’humidité relative",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Compare un air sec et un air humide à la même température.",
  bac: "Explique pourquoi l’humidité relative change quand la température change.",
  bts: "Relie température sèche, teneur en eau et humidité relative sans confondre les grandeurs.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Deux volumes d’air identiques, avec exactement la même quantité de vapeur d’eau à l’intérieur — le même nombre de points sur la scène. Le premier est froid, le second est chaud. Pourtant, le premier est presque saturé, et le second est loin de l’être. Rien n’a été ajouté ni retiré : seule la température a changé. Regarde ce qui grandit quand on chauffe. Ce n’est pas la quantité de vapeur : c’est la place disponible pour elle.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "L’humidité relative n’est pas une quantité d’eau. C’est une comparaison, et c’est ce qui la rend piégeuse. Elle compare la vapeur réellement présente dans l’air à la vapeur maximale que cet air pourrait porter, à sa température du moment. Cinquante pour cent d’humidité relative signifie donc : l’air porte la moitié de ce qu’il pourrait porter. Ni un demi-litre d’eau, ni la moitié du volume — la moitié d’une capacité.\n\nOr cette capacité dépend fortement de la température. Plus l’air est chaud, plus il peut porter de vapeur, et la progression est rapide. C’est de là que vient tout le comportement de l’air humide.\n\nPremière conséquence : chauffer un air sans rien lui ajouter fait baisser son humidité relative. La vapeur présente n’a pas bougé, mais la capacité a grandi — la fraction diminue. C’est pourquoi l’air d’un logement chauffé en hiver paraît sec : l’air extérieur froid, même à quatre-vingts pour cent dehors, se retrouve à vingt ou trente pour cent une fois réchauffé à l’intérieur.\n\nDeuxième conséquence, l’inverse : refroidir un air sans lui retirer d’eau fait monter son humidité relative. La vapeur est toujours là, la capacité a diminué. Si on refroidit assez, on atteint cent pour cent — l’air ne peut plus rien porter de plus, et l’eau se dépose. C’est le point de rosée, et c’est l’objet de la station Point de rosée et air humide.\n\nDernier point, celui qui sépare un professionnel d’un amateur : deux grandeurs différentes se cachent derrière le mot humidité. La teneur en eau est la quantité réelle de vapeur, en grammes par kilo d’air sec ; elle ne change que si on ajoute ou retire de l’eau. L’humidité relative, elle, change dès que la température bouge, même sans qu’une goutte n’entre ni ne sorte. Confondre les deux fait dire n’importe quoi d’un relevé.",

  method: "L’humidité relative compare la vapeur présente à la vapeur maximale possible à cette température. Elle change dès que la température change.",
  formula: "HR = vapeur présente ÷ vapeur maximale à cette température, en pour cent",

  /* Manipuler — une action précise. */
  consigne: "Fixe une humidité relative, puis fais monter la température de dix degrés sans rien changer d’autre : regarde l’humidité relative chuter alors qu’aucune vapeur n’a été ajoutée. Redescends ensuite en dessous du point de départ et observe l’inverse. Cherche enfin la température à laquelle l’air atteint la saturation : c’est le point de rosée, et il ne dépend que de la vapeur réellement présente.",
  lecture: "Une humidité relative seule ne dit rien tant qu’on ignore la température à laquelle elle a été relevée. Quatre-vingts pour cent à cinq degrés dehors, c’est un air très sec en quantité d’eau ; cinquante pour cent à vingt-cinq degrés en contient bien davantage. Un relevé d’humidité sans sa température est un relevé inutilisable.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "La scène représente la capacité de l’air par un contenant qui grandit : c’est une image, commode mais fausse dans le détail — ce n’est pas l’air qui contient la vapeur comme une éponge, les deux gaz coexistent simplement. L’image suffit pour raisonner sur une installation ; elle ne remplace pas le diagramme de l’air humide dès qu’il faut chiffrer une évolution.",

  activity: {"kind":"humidity","temperature":22,"rh":50},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Voici deux volumes d’air identiques, contenant exactement la même quantité de vapeur d’eau : le même nombre de points sur la scène. Le premier est froid, le second est chaud. Et pourtant, le premier est presque saturé, alors que le second en est loin. Rien n’a été ajouté, rien n’a été retiré. Seule la température a changé. Regardez bien ce qui grandit quand on chauffe : ce n’est pas la quantité de vapeur, elle est identique. C’est la place disponible pour elle.",

    comprendre: "L’humidité relative n’est pas une quantité d’eau, et c’est là tout le piège. C’est une comparaison. Elle compare la vapeur réellement présente à la vapeur maximale que cet air pourrait porter, à sa température du moment. Cinquante pour cent d’humidité relative veut donc dire : l’air porte la moitié de ce qu’il pourrait porter. Pas un demi-litre d’eau, pas la moitié du volume. La moitié d’une capacité. Or cette capacité dépend beaucoup de la température : plus l’air est chaud, plus il peut porter de vapeur. Première conséquence : chauffer un air sans rien lui ajouter fait baisser son humidité relative. C’est pour cela que l’air d’un logement chauffé paraît sec en hiver. L’air extérieur, même à quatre-vingts pour cent dehors, se retrouve à vingt ou trente pour cent une fois réchauffé à l’intérieur. Deuxième conséquence, l’inverse : refroidir un air sans lui retirer d’eau fait monter son humidité relative. Et si on refroidit assez, on atteint cent pour cent : l’eau se dépose.",

    manipuler: "Fixez une humidité relative, puis faites monter la température de dix degrés sans rien changer d’autre. Regardez l’humidité relative chuter, alors que pas une goutte de vapeur n’a été ajoutée. Redescendez ensuite en dessous de votre point de départ, et observez l’inverse. Cherchez enfin la température à laquelle l’air arrive à saturation. Cette température-là, c’est le point de rosée, et elle ne dépend que de la vapeur réellement présente — pas de celle qu’on pourrait ajouter.",

    verifier: "Deux questions, sans note. Retenez surtout ceci, parce que c’est ce qui sépare un professionnel d’un amateur. Deux grandeurs se cachent derrière le mot humidité. La quantité réelle de vapeur ne change que si on ajoute ou si on retire de l’eau. L’humidité relative, elle, change dès que la température bouge, même sans qu’une goutte n’entre ni ne sorte. Et un relevé d’humidité sans sa température ne sert à rien."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["À teneur en eau constante, si la température monte, l’humidité relative…","baisse, car l’air peut porter plus de vapeur",["baisse, car l’air peut porter plus de vapeur","monte, car l’air se charge en vapeur","ne bouge pas, la vapeur n’a pas changé"]],
    ["50 % d’humidité relative signifie…","la moitié de la vapeur que l’air peut porter",["que la moitié du volume est de l’eau","la moitié de la vapeur que l’air peut porter","que l’air contient 50 g d’eau par kilo"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Interpréter un relevé d’humidité relative en tenant compte de la température à laquelle il a été pris.",
    acquis: {
      cap: ["Lit une humidité relative sur un appareil", "Constate qu’un air chaud peut porter plus de vapeur", "Associe air froid saturé et apparition d’eau"],
      bac: ["Explique pourquoi chauffer fait baisser l’humidité relative", "Explique pourquoi l’air d’un logement chauffé paraît sec en hiver", "Refuse d’interpréter une humidité relative sans sa température"],
      bts: ["Distingue teneur en eau et humidité relative", "Relie une évolution de température à une évolution d’humidité relative", "Situe le point de saturation d’un air donné"]
    },
    sources: [
      "inerWeb Aéraulique v5 — condensation et air humide"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Point de rosée et air humide", pourquoi: "la saturation atteinte ici y devient de l’eau visible"},
      {reseau: "AéroRézo", station: "VMC hygroréglable", pourquoi: "c’est cette grandeur que la bouche mesure sans le savoir"},
      {reseau: "AéroRézo", station: "Apport latent", pourquoi: "la vapeur à retirer d’un local s’y chiffre en puissance"}
    ]
  }
});
