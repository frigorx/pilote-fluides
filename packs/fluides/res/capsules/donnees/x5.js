/* Capsule x5 — « Détective, intervention sur monobloc R-290 » (G12 · A1 · A2).
   Contenu repris SANS AJOUT de la fiche x5 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. C'est un
   exercice : la capsule fait chercher, elle ne refait pas le cours.
   Rappel métier tenu : R-290 = A3, inflammable ; azote pour l'inertage. */
CAPSULE.declarer({
  id: "x5",
  fiche: "x5",
  titre: "Détective — intervention sur monobloc R-290",
  surtitre: "HABILITATION FLUIDES · G12 · A1 · A2",
  duree: "environ 6 minutes",
  intro: "Un compresseur à remplacer, un local exigu sans ventilation, un collègue pressé : le genre de situation banale qui tourne mal. Cette capsule ne refait pas le cours sur les hydrocarbures, elle te fait chercher.",
  codes: [
    { code: "12.04", libelle: "Conduire l'analyse de risques avant intervention" },
    { code: "12.05", libelle: "Préparer la zone : ventilation, ignition, EPI" },
    { code: "12.06", libelle: "Récupérer puis inerter avant toute flamme" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Une intervention à préparer avant d'agir",
    etapes: [
      { titre: "La situation", texte: "un cas de terrain" },
      { titre: "Les indices", texte: "ce que tu observes" },
      { titre: "Le raisonnement", texte: "on élimine la fausse piste" },
      { titre: "La réponse", texte: "et ce qu'elle apprend" },
    ],
  },

  ecrans: [
    {
      id: "remplacer-un-compresseur-au-r290",
      titre: "Un compresseur à changer, dans un petit local",
      note: "Le point de départ",
      visuel: {
        motif: "flux",
        titre: "Le chantier du jour",
        boites: [
          { picto: "🧊", titre: "La vitrine", texte: "réfrigérée au R-290, compresseur à changer" },
          { picto: "🥖", titre: "L'arrière-boutique", texte: "local petit, sans ventilation, un four à quelques mètres", teinte: "danger" },
        ],
        pied: "Ton collègue propose de faire vite. Toi, que réponds-tu ?",
      },
      texte: "<p>Une vitrine réfrigérée au <b>R-290</b> a besoin d'un nouveau compresseur, dans l'arrière-boutique d'une boulangerie : un local <b>petit</b>, <b>sans ventilation</b>, un four à quelques mètres.</p><p>Ton collègue propose de « faire vite » : récupérer, ouvrir, braser, recharger — comme sur un circuit classique. Toi, que réponds-tu, avant même de sortir un outil ?</p>",
      dire: "Une vitrine réfrigérée au R deux cent quatre-vingt-dix, c'est du propane, a besoin d'un nouveau compresseur. Le chantier se trouve dans l'arrière-boutique d'une boulangerie : un local petit, sans ventilation, avec un four à quelques mètres. Ton collègue propose de faire vite : récupérer, ouvrir, braser le nouveau compresseur, recharger, comme sur un circuit classique, vu la petite charge. Toi, avant même de sortir un outil, que réponds-tu ? Prenez trente secondes avant de passer à l'écran suivant.",
      reference: "Fiche x5 · G12 · A1 · A2",
    },

    {
      id: "trois-indices-de-risque",
      titre: "Trois choses à regarder avant de commencer",
      note: "Ce que tu observes",
      visuel: {
        motif: "alerte",
        titre: "Ce qui doit t'arrêter avant le premier geste",
        vignettes: [
          { picto: "🔥", etiquette: "le fluide", titre: "R-290, classé A3", texte: "très inflammable, la charge admise reste petite" },
          { picto: "📦", etiquette: "le local", titre: "petit, sans ventilation", texte: "et un four à quelques mètres" },
          { picto: "🗣", etiquette: "la proposition", titre: "« On fait vite, comme un HFC »", texte: "récupérer, ouvrir, braser, recharger" },
        ],
        pied: "Une charge faible, mais un contexte qui ne pardonne pas.",
      },
      texte: "<p>Le R-290 est <b>A3</b> : la charge est petite précisément <b>parce que</b> le fluide est très inflammable.</p><p>Un local exigu, sans ventilation, avec une source de flamme à proximité, c'est le scénario d'accident type — pas un chantier ordinaire.</p>",
      dire: "Regardons les trois éléments qui doivent t'arrêter avant le premier geste. D'abord le fluide : le R deux cent quatre-vingt-dix est classé A trois, très inflammable. Et c'est précisément pour cela que sa charge admise reste petite : ce n'est pas un signe de faible risque, c'est la conséquence du risque. Ensuite le local : petit, sans ventilation, avec un four à quelques mètres. Enfin la proposition de ton collègue : faire comme sur un circuit classique. Une charge faible, dans ce contexte-là, ne veut pas dire un petit risque.",
      reference: "Code 12.04 · l'analyse de risques",
    },

    {
      id: "vite-comme-un-hfc",
      titre: "« Comme un HFC » ne tient pas",
      note: "On élimine la fausse piste",
      visuel: {
        motif: "duo",
        titre: "Deux façons de voir le même chantier",
        cartes: [
          { titre: "« COMME UN HFC »", picto: "⚡", pour: "Ce que propose le collègue", texte: "Récupérer, ouvrir, braser, recharger — sans plus de précaution, à cause de la petite charge." },
          { titre: "SÉQUENCE HYDROCARBURES", picto: "🧯", pour: "Ce qu'impose le R-290", texte: "Ventiler, écarter toute flamme (le four compris), récupérer, inerter à l'azote — et alors seulement chauffer." },
        ],
        lien: "≠",
        pied: "Petite charge ne veut pas dire petit risque.",
      },
      texte: "<p>« Comme un HFC » suppose que la charge, faible, protège. C'est l'inverse : la charge est faible <b>parce que</b> le fluide est inflammable.</p><p>Un fluide A3 impose sa propre séquence : ventiler, écarter toute flamme, récupérer, inerter à l'azote — et alors seulement chauffer.</p>",
      dire: "La proposition de ton collègue part d'une idée fausse : que la petite charge protège, comme sur un HFC. Si c'était vraiment sans risque, on n'exigerait pas une charge aussi réduite. C'est l'inverse : la charge est petite justement parce que le fluide est inflammable. Un fluide classé A trois impose sa propre séquence, et elle ne ressemble pas à celle d'un HFC : ventiler, écarter toute flamme, le four compris, récupérer, inerter à l'azote, et alors seulement chauffer pour braser.",
      retenir: ["Petite charge ne veut pas dire petit risque : le R-290 est <b>A3</b>, inflammable."],
      reference: "Code 12.05 · préparer la zone",
    },

    {
      id: "sequence-hydrocarbures",
      titre: "La séquence qui protège, dans l'ordre",
      note: "La réponse, et pourquoi",
      visuel: {
        motif: "sequence",
        titre: "Analyse de risques en main",
        etapes: [
          { titre: "Ventiler", texte: "le local" },
          { titre: "Écarter l'ignition", texte: "toute source, le four compris" },
          { titre: "Récupérer", texte: "le fluide du circuit" },
          { titre: "Inerter", texte: "à l'azote" },
          { titre: "Chauffer", texte: "seulement maintenant, pour braser" },
        ],
        pied: "Un détecteur HFC classique n'est pas conçu pour les hydrocarbures.",
      },
      texte: "<p>On ventile, on éloigne ou neutralise toute source d'ignition — le four compris. On récupère. On inerte à l'azote. Et <b>seulement alors</b>, on chauffe pour braser.</p>",
      dire: "Voici la séquence, dans l'ordre. On ventile le local. On écarte ou on neutralise toute source d'ignition, le four compris. On récupère le fluide du circuit. On inerte à l'azote. Et seulement maintenant, on chauffe pour braser, jamais avant. Un détecteur HFC classique n'est pas conçu pour les hydrocarbures : il faut l'appareil adapté.",
      reference: "Codes 12.05 · 12.06 · la réponse",
      controle: {
        enonce: "Que réponds-tu, analyse de risques en main ?",
        choix: [
          "D'accord : la charge est faible, les précautions HFC suffisent",
          "On ventile, on éloigne ou neutralise toute source d'ignition (four compris), on récupère, on inerte à l'azote — et seulement alors on chauffe",
          "On brase d'abord, la récupération se fera après",
          "On contrôle au détecteur HFC classique avant de commencer",
        ],
        bonne: 1,
        explication: "Séquence hydrocarbures : analyse de risques, ventilation active, zéro ignition, récupération, inertage azote, et seulement ensuite la flamme. Un détecteur HFC classique n'est pas conçu pour les hydrocarbures — il faut l'appareil adapté.",
      },
    },

    {
      id: "petite-charge-grand-risque",
      titre: "Et si le client refuse de couper le four ?",
      note: "Le réflexe à emporter",
      visuel: {
        motif: "zone",
        titre: "Ce local ne pardonne pas une ignition oubliée",
        hauteurNappe: 90,
        nappeLibelle: "le gaz s'accumulerait ici, s'il fuyait",
        solLibelle: "sol du local",
        points: [
          { titre: "Le four", texte: "une ignition à écarter" },
          { titre: "Client qui refuse ?", texte: "on n'intervient pas" },
        ],
      },
      piege: "<p>« La charge est petite » n'est pas un argument : le R-290 est classé <b>A3</b>, et c'est justement pour cela que sa charge admise reste petite. Un local exigu, sans ventilation, avec une flamme à proximité : c'est le scénario d'accident type.</p>",
      texte: "<p>Avant de chauffer, on inerte à l'<b>azote</b> — jamais à l'air ni à l'oxygène.</p><p>Et si la source d'ignition ne peut pas être écartée ? La réponse ne change pas : on ne fait pas l'intervention.</p>",
      dire: "Un dernier réflexe, pour la route. Avant de chauffer, on inerte toujours à l'azote, jamais à l'air ni à l'oxygène. Et une question à se poser avant d'arriver sur le chantier suivant : et si le client refuse qu'on coupe le four ? La réponse ne change pas. On ne fait pas l'intervention. Un local qui ne peut pas être mis en sécurité n'est pas un chantier, c'est un risque qu'on refuse de prendre.",
      retenir: ["Avant de chauffer, on inerte à l'<b>azote</b> — jamais à l'air ni à l'oxygène.", "Si la source d'ignition ne peut pas être écartée, on ne fait pas l'intervention."],
      reference: "Codes 12.04 · 12.06 · le réflexe",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour revoir les hydrocarbures, ou enchaîner sur le CO₂ et l'ammoniac.",
});
