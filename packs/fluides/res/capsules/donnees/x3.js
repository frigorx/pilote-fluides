/* Capsule x3 — « Détective, la bouteille de récupération » (G5 · parcours D).
   Contenu repris SANS AJOUT de la fiche x3 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. C'est un
   exercice : la capsule fait chercher, elle ne refait pas le cours. */
CAPSULE.declarer({
  id: "x3",
  fiche: "x3",
  titre: "Détective — la bouteille de récupération",
  surtitre: "HABILITATION FLUIDES · G5 · PARCOURS D",
  duree: "environ 6 minutes",
  intro: "Une récupération en cours, une bouteille qui approche de sa limite, et deux bouteilles qui attendent sur l'étagère : laquelle choisir, et pourquoi ? Cette capsule ne refait pas le cours sur la récupération, elle vous fait chercher.",
  codes: [
    { code: "5.02", libelle: "Gérer le remplissage des cylindres en sécurité" },
    { code: "5.06", libelle: "Peser à chaque étape" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Un choix à faire, sous la pression du temps",
    etapes: [
      { titre: "La situation", texte: "un cas de terrain" },
      { titre: "Les indices", texte: "ce que vous observez" },
      { titre: "Le raisonnement", texte: "on élimine les fausses pistes" },
      { titre: "La réponse", texte: "et ce qu'elle apprend" },
    ],
  },

  ecrans: [
    {
      id: "recuperation-en-cours",
      titre: "Une récupération qui n'est pas finie",
      note: "Le point de départ",
      visuel: { svg: "recuperation.svg", alt: "Le montage de récupération : l'installation isolée, le groupe de récupération, et la bouteille posée sur une balance. Le fluide circule vers la bouteille." },
      legende: "La bouteille est sur la balance depuis le début : c'est elle qui donne le poids récupéré.",
      texte: "<p>Vous récupérez le fluide d'une chambre froide, avant de remplacer un composant. Bon réflexe : vous avez pesé la bouteille <b>avant</b> de commencer.</p><p>La récupération avance normalement. Sur un chantier, qu'est-ce qui pourrait vous obliger à vous arrêter avant d'avoir vidé tout le circuit ?</p>",
      dire: "Vous êtes en train de récupérer le fluide d'une chambre froide, avant de remplacer un composant. Bon réflexe dès le départ : vous avez pesé la bouteille avant de commencer, vous savez donc exactement ce qu'elle pesait à vide. La récupération avance normalement. Mais sur un chantier, qu'est-ce qui pourrait vous obliger à vous arrêter avant d'avoir fini de vider le circuit ? Prenez trente secondes avant de passer à l'écran suivant.",
      reference: "Fiche x3 · G5 · parcours D",
    },

    {
      id: "la-balance-approche",
      titre: "Ce que vous constatez",
      note: "Ce que vous observez",
      visuel: {
        motif: "checklist",
        titre: "L'état des lieux, avant de choisir",
        items: [
          { titre: "La balance", texte: "proche du niveau maximal", refus: true },
          { titre: "Le circuit", texte: "il reste du fluide dedans", refus: true },
          { titre: "Sur l'étagère", texte: "une bouteille vide", refus: false },
          { titre: "Et aussi sur l'étagère", texte: "une bouteille entamée, autre fluide", refus: true },
        ],
        pied: "Deux bouteilles disponibles. Une seule est la bonne.",
      },
      texte: "<p>La balance approche du <b>niveau maximal admissible</b> de la bouteille. Il reste pourtant visiblement du fluide dans le circuit.</p><p>Sur l'étagère du fourgon : une bouteille de récupération <b>vide</b>, et une bouteille <b>entamée</b> qui contient déjà un autre fluide.</p>",
      dire: "Regardez ce que vous avez autour de vous. La balance approche du niveau maximal admissible de la bouteille. Il reste pourtant visiblement du fluide dans le circuit : ce n'est pas fini. Sur l'étagère du fourgon, vous avez deux bouteilles disponibles. Une bouteille de récupération vide. Et une bouteille déjà entamée, qui contient un autre fluide.",
      reference: "Codes 5.02 · 5.06 · l'état des lieux",
    },

    {
      id: "trois-pistes",
      titre: "Trois idées qui semblent raisonnables",
      note: "On élimine, une par une",
      visuel: {
        motif: "sequence",
        titre: "Une seule piste ne met rien en danger",
        etapes: [
          { titre: "Compléter au-delà ?", texte: "la bouteille devient dangereuse en chauffant", danger: true },
          { titre: "Bouteille entamée ?", texte: "un mélange part en destruction", danger: true },
          { titre: "Laisser dans le circuit ?", texte: "il finira à l'atmosphère", danger: true },
          { titre: "Changer de bouteille", texte: "la peser avant de continuer" },
        ],
        pied: "Trois pistes qui semblent raisonnables. Une seule ne met rien en danger.",
      },
      texte: "<p>Trois idées viennent à l'esprit, et chacune semble raisonnable sur le moment.</p><p>Compléter un peu au-delà du niveau maximal ? Le taux de remplissage protège contre la <b>dilatation du liquide</b> : dépassé, la bouteille devient dangereuse dès qu'elle chauffe un peu.</p><p>Terminer dans la bouteille entamée de l'autre fluide ? Un <b>mélange de fluides</b> ne se recycle ni ne se régénère : tout le lot part en destruction.</p><p>Arrêter là, et laisser le fluide dans le circuit qu'on va ouvrir ? Il finira à l'atmosphère.</p>",
      dire: "Regardons chaque idée avant de choisir. Compléter un peu au-delà du niveau maximal, quelques centaines de grammes, ça ne changerait rien ? C'est tentant, mais le taux de remplissage protège contre la dilatation du liquide : dépassé, la bouteille devient dangereuse dès qu'elle chauffe un peu, même juste au soleil. Terminer dans la bouteille entamée de l'autre fluide, puisqu'elle a de la place ? Non plus : un mélange de fluides ne se recycle ni ne se régénère, tout le lot part en destruction. Arrêter là, et laisser le fluide restant dans le circuit qu'on va ouvrir ? Il finira à l'atmosphère. Il reste une seule piste qui ne met rien en danger.",
      retenir: ["Le taux de remplissage maximal protège contre la <b>dilatation du liquide</b>.", "Un mélange de deux fluides est <b>impossible à recycler ou régénérer</b> : il part en destruction."],
      reference: "Code 5.02 · ce qui ne se négocie pas",
    },

    {
      id: "on-change-de-bouteille",
      titre: "On change de bouteille, on pèse avant",
      note: "La réponse, et pourquoi",
      visuel: {
        motif: "jauge",
        titre: "La bouteille approche de sa limite",
        seuils: [{ part: 1, titre: "NIVEAU MAXIMAL ADMISSIBLE", texte: "la limite à ne pas dépasser" }],
        niveau: 0.92,
        bas: "bouteille en cours",
        hautLibelle: "pleine",
        teinte: "danger",
      },
      texte: "<p>Vous basculez le flexible sur la bouteille vide, et vous la <b>pesez avant</b> de continuer, exactement comme la première.</p><p>Vous terminez la récupération dans cette seconde bouteille, jusqu'à ce que le circuit soit vide.</p>",
      dire: "La bonne réponse : vous changez de bouteille. Vous basculez le flexible sur la bouteille vide, et vous la pesez avant de continuer, exactement comme vous avez pesé la première. Vous terminez la récupération dans cette seconde bouteille, jusqu'à ce que le circuit soit vide.",
      reference: "Codes 5.02 · 5.06 · la réponse",
      controle: {
        enonce: "La bouteille atteint son niveau maximal et il reste du fluide à récupérer. Que faites-vous ?",
        choix: [
          "Je complète un peu au-delà du niveau : quelques centaines de grammes ne changent rien",
          "Je bascule sur la bouteille vide, et je pèse celle-ci avant de continuer",
          "Je termine dans la bouteille entamée de l'autre fluide, elle a de la place",
          "J'arrête là : le fluide restant peut rester dans le circuit ouvert",
        ],
        bonne: 1,
        explication: "On change de bouteille, on pèse la nouvelle avant, et on continue. Dépasser le niveau est un risque mécanique réel ; mélanger deux fluides condamne le lot ; laisser du fluide dans un circuit qu'on va ouvrir finit à l'atmosphère.",
      },
    },

    {
      id: "jamais-a-ras",
      titre: "Le bon sens qui trompe",
      note: "Le réflexe à emporter",
      visuel: { svg: "secu-bouteille.svg", alt: "Pourquoi une bouteille ne se remplit jamais à ras : à gauche, remplie à ras, la dilatation du liquide fait grimper la pression jusqu'à la rupture ; à droite, le taux de remplissage respecté laisse un volume libre qui absorbe la dilatation." },
      legende: "Une bouteille pleine se ferme, s'étiquette, et se consigne au registre — avant de repartir avec vous.",
      piege: "<p>« Quelques centaines de grammes, ça ne change rien » ressemble à du bon sens de chantier. C'est pourtant le geste qui met la bouteille en danger : dépasser le niveau maximal la rend dangereuse dès la première montée en température.</p>",
      texte: "<p>Le réflexe à garder : on pèse <b>avant</b> chaque bouteille, pas seulement la première de la journée.</p><p>Une bouteille pleine se ferme, s'étiquette, et se consigne au registre.</p>",
      dire: "Le réflexe à garder pour la suite de votre carrière : on pèse avant chaque bouteille, pas seulement la première de la journée. Une bouteille pleine se ferme, s'étiquette, et se consigne au registre. Et méfiez-vous de la phrase qui semble pleine de bon sens : « quelques centaines de grammes, ça ne change rien ». C'est exactement le geste qui met la bouteille en danger, dépasser le niveau maximal la rend dangereuse dès qu'elle prend un peu de chaleur.",
      retenir: ["On pèse <b>avant</b> chaque bouteille, pas seulement la première.", "Une bouteille pleine se ferme, s'étiquette, se consigne au registre."],
      reference: "Codes 5.02 · 5.06 · le réflexe",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour revoir comment récupérer sans émettre, ou enchaîner sur le compresseur.",
});
