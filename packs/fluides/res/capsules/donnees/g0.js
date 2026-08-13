/* Capsule g0 — « Ce que la loi vous impose » (G1 · code 1.00).
   Contenu repris SANS AJOUT de la fiche g0 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g0",
  fiche: "g0",
  titre: "Ce que la loi vous impose",
  surtitre: "HABILITATION FLUIDES · G1 · CODE 1.00",
  duree: "environ 7 minutes",
  intro: "Deux textes, deux papiers, un carnet et une filière de fin de vie. Tout ce que la loi attend de vous tient en cinq idées — les voici une par une, expliquées à voix haute.",
  codes: [{ code: "1.00", libelle: "Identifier les obligations légales de base liées aux fluides frigorigènes" }],

  visuelAccueil: {
    motif: "etages",
    titre: "Deux niveaux de loi encadrent votre métier",
    etages: [
      { niveau: "EUROPE", texte: "Règlement (UE) 2024/573", marque: "s'applique directement" },
      { niveau: "FRANCE", texte: "Arrêté du 21 novembre 2025", marque: "l'application sur le terrain" },
      { niveau: "VOUS", texte: "Attestation d'aptitude · registre · récupération", marque: "chaque jour, sur le chantier" },
    ],
  },

  ecrans: [
    {
      id: "pourquoi",
      titre: "Pourquoi la loi s'occupe de vous",
      note: "Le point de départ",
      visuel: {
        motif: "flux",
        titre: "Un fluide qui s'échappe ne se rattrape pas",
        boites: [
          { picto: "❄", titre: "Le fluide", texte: "enfermé dans la machine, il fait le froid" },
          { picto: "💨", titre: "La fuite", texte: "il part dans l'air, et personne ne le récupère", teinte: "danger" },
          { picto: "🌍", titre: "Le climat", texte: "il réchauffe l'atmosphère", teinte: "danger" },
        ],
        pied: "C'est pour cela que le métier est encadré : le produit est utile, mais il ne doit pas sortir.",
      },
      texte: "<p>Les fluides frigorigènes peuvent <b>réchauffer le climat</b> s'ils s'échappent dans l'air.</p><p>Toute la réglementation part de là : ce n'est pas de la paperasse ajoutée à votre travail, c'est la conséquence directe de ce que fait le produit que vous manipulez.</p>",
      dire: "Commençons par le début. Les fluides frigorigènes peuvent réchauffer le climat s'ils s'échappent dans l'air. Toute la réglementation part de là. Ce n'est pas de la paperasse ajoutée à votre travail : c'est la conséquence directe de ce que fait le produit que vous manipulez. Le fluide est utile tant qu'il reste enfermé. Le jour où il sort, personne ne le rattrape.",
      reference: "Code 1.00 · obligations légales de base",
    },

    {
      id: "deux-etages",
      titre: "Deux niveaux de loi : l'Europe, puis la France",
      note: "L'architecture des textes",
      visuel: {
        motif: "etages",
        titre: "Du texte européen jusqu'à votre chantier",
        etages: [
          { niveau: "NIVEAU EUROPÉEN", texte: "Règlement (UE) 2024/573 — le texte de base", marque: "il a remplacé le 517/2014" },
          { niveau: "NIVEAU FRANÇAIS", texte: "Arrêté du 21 novembre 2025 — signé par un ministre", marque: "comment on l'applique ici" },
          { niveau: "SUR LE TERRAIN", texte: "Vos obligations quotidiennes", marque: "ce que vous faites vraiment" },
        ],
      },
      texte: "<p>Au niveau européen, le texte de base est le <b>règlement (UE) 2024/573</b>. Il a remplacé l'ancien règlement 517/2014.</p><p>Au niveau français, l'<b>arrêté du 21 novembre 2025</b> — un texte signé par un ministre — précise comment appliquer ce règlement sur le terrain.</p>",
      dire: "Deux niveaux de loi encadrent votre métier : le niveau européen, et le niveau français. Au niveau européen, le texte de base est le règlement européen de 2024, numéro 573. Il a remplacé l'ancien règlement 517 de 2014. Au niveau français, l'arrêté du 21 novembre 2025, un texte signé par un ministre, précise comment appliquer ce règlement sur le terrain. Retenez l'ordre : l'Europe pose la règle, la France dit comment on l'applique ici.",
      retenir: ["Europe : <b>règlement (UE) 2024/573</b>, qui a remplacé le 517/2014.", "France : <b>arrêté du 21 novembre 2025</b>."],
      reference: "Code 1.00",
    },

    {
      id: "reglement-directive",
      titre: "Un règlement, jamais une « directive »",
      note: "Le piège classique de l'examen",
      visuel: {
        motif: "duo",
        titre: "Deux mots que l'examen aime confondre",
        cartes: [
          { titre: "UN RÈGLEMENT", picto: "⚖", pour: "C'est le cas ici", texte: "Il s'applique directement dans tous les pays de l'Union, sans loi française pour le recopier." },
          { titre: "UNE DIRECTIVE", picto: "✗", pour: "Ce n'est PAS le cas", texte: "Elle devrait être recopiée dans la loi de chaque pays avant de s'appliquer." },
        ],
        lien: "≠",
        pied: "Le texte des fluides est un RÈGLEMENT : (UE) 2024/573.",
      },
      texte: "<p>C'est un <b>règlement</b>, jamais une « directive » : il s'applique directement dans tous les pays de l'Union, sans loi française pour le recopier.</p><p>La différence n'est pas un détail de vocabulaire : une directive doit d'abord être reprise par chaque pays, un règlement non. Il s'applique tel quel, tout de suite, partout.</p>",
      dire: "Attention à ce mot, c'est le piège le plus fréquent. Le texte européen est un règlement, jamais une directive. Un règlement s'applique directement dans tous les pays de l'Union, sans loi française pour le recopier. Une directive, elle, devrait d'abord être reprise par chaque pays avant de s'appliquer. Ici, c'est bien un règlement : il s'applique tel quel, tout de suite, partout.",
      retenir: ["Le texte européen est un <b>règlement</b> — (UE) 2024/573 — <b>jamais</b> une « directive »."],
      reference: "Code 1.00 · le mot qui tombe à l'examen",
      controle: {
        enonce: "Le règlement (UE) 2024/573, qui encadre les fluides frigorigènes, est...",
        choix: [
          "une directive, que la France doit recopier dans sa propre loi",
          "un règlement, qui s'applique directement dans toute l'Union européenne",
          "une norme technique facultative",
          "une simple recommandation, sans obligation",
        ],
        bonne: 1,
        explication: "C'est un <b>règlement</b>, pas une directive : il s'applique tel quel, tout de suite, dans tous les pays de l'Union européenne. Il a remplacé le règlement 517/2014.",
      },
    },

    {
      id: "aptitude-capacite",
      titre: "Deux papiers : un pour vous, un pour l'entreprise",
      note: "Ne jamais les confondre",
      visuel: { svg: "aptitude-capacite.svg", alt: "À gauche, l'attestation d'aptitude, délivrée à une personne. À droite, l'attestation de capacité, délivrée à une entreprise." },
      legende: "L'aptitude prouve que la personne sait faire ; la capacité prouve que l'entreprise a le personnel, l'outillage et les procédures. Il faut les deux.",
      texte: "<p>Pour intervenir sur les fluides, il vous faut une <b>attestation d'aptitude</b> personnelle.</p><p>Votre entreprise, elle, doit avoir une <b>attestation de capacité</b>. Ce sont deux papiers obligatoires, et ce n'est pas le même.</p>",
      dire: "Deux papiers, et il faut les deux. Le premier est pour vous : l'attestation d'aptitude. Elle est personnelle, elle prouve que vous savez faire, et elle vous suit d'une entreprise à l'autre. Le second est pour votre entreprise : l'attestation de capacité. Elle prouve que l'entreprise a le personnel, l'outillage et les procédures. Une entreprise sans attestation de capacité ne peut pas intervenir, même si tous ses salariés sont aptes. Et vous, sans attestation d'aptitude, vous ne pouvez pas toucher au fluide, même dans une entreprise en règle.",
      retenir: ["<b>Attestation d'aptitude</b> : c'est pour vous, la personne.", "<b>Attestation de capacité</b> : c'est pour l'entreprise."],
      reference: "Code 1.00 · les deux attestations",
      controle: {
        enonce: "Vous changez d'entreprise. Que devient votre attestation d'aptitude ?",
        choix: [
          "Elle reste à l'ancienne entreprise, il faut en redemander une",
          "Elle vous suit : elle est délivrée à la personne, pas à l'employeur",
          "Elle est remplacée par l'attestation de capacité du nouvel employeur",
          "Elle n'est plus valable tant que le nouvel employeur ne l'a pas signée",
        ],
        bonne: 1,
        explication: "L'attestation d'<b>aptitude</b> est <b>personnelle</b> : elle vous suit. C'est l'attestation de <b>capacité</b> qui appartient à l'entreprise — et la nouvelle doit avoir la sienne pour que vous puissiez intervenir.",
      },
    },

    {
      id: "registre",
      titre: "Le registre : le carnet de santé de la machine",
      note: "Qui le tient, et ce qu'on y écrit",
      visuel: {
        motif: "checklist",
        titre: "Ce que le registre garde en mémoire",
        items: [
          { titre: "La charge", texte: "quel fluide, combien" },
          { titre: "Les contrôles d'étanchéité", texte: "quand, par qui" },
          { titre: "Les fuites détectées", texte: "et ce qui a été fait" },
          { titre: "Les réparations", texte: "et le contrôle qui suit" },
        ],
        pied: "Tenu par l'EXPLOITANT — le propriétaire ou l'utilisateur — sur papier ou sur ordinateur.",
      },
      texte: "<p>Chaque équipement a un <b>registre</b> : un carnet qui garde la trace de chaque intervention (charge, contrôle, fuite, réparation).</p><p>C'est l'<b>exploitant</b> — le propriétaire ou l'utilisateur de la machine — qui doit le tenir à jour, sur papier ou sur ordinateur.</p>",
      dire: "Chaque équipement a son registre. C'est le carnet de santé de la machine : il garde la trace de chaque intervention. La charge, les contrôles d'étanchéité, les fuites détectées, les réparations. Attention à la question de l'examen : qui tient ce registre ? Ce n'est pas vous, ce n'est pas votre entreprise. C'est l'exploitant, c'est-à-dire le propriétaire ou l'utilisateur de la machine. Il le tient sur papier ou sur ordinateur, les deux sont acceptés. Vous, vous lui fournissez ce qu'il doit y écrire.",
      retenir: ["<b>Registre</b> de l'équipement : tenu par l'<b>exploitant</b>, papier ou électronique."],
      reference: "Code 1.00 · le registre",
    },

    {
      id: "deee",
      titre: "La fin de vie : le fluide d'abord, la carcasse ensuite",
      note: "La filière DEEE",
      visuel: {
        motif: "flux",
        titre: "Une machine en fin de vie, dans l'ordre",
        boites: [
          { picto: "🧊", titre: "La machine usée", texte: "trop vieille, ou cassée" },
          { picto: "🛢", titre: "1. Récupérer le fluide", texte: "c'est VOUS, avant tout démontage", teinte: "ok" },
          { picto: "♻", titre: "2. Filière DEEE", texte: "la carcasse électrique et électronique" },
        ],
        pied: "La filière DEEE s'occupe de la machine, PAS du fluide : il doit en être sorti avant.",
      },
      texte: "<p>Quand l'équipement est trop vieux ou cassé, il part dans la filière <b>DEEE</b> (déchets d'équipements électriques et électroniques).</p><p>Cette filière s'occupe de la <b>carcasse</b> de la machine, pas du fluide : vous devez le récupérer avant, à part.</p>",
      dire: "Vient le jour où la machine est trop vieille, ou cassée. Elle part alors dans la filière D E E E, les déchets d'équipements électriques et électroniques. Mais attention à l'ordre, et c'est tout l'enjeu : cette filière s'occupe de la carcasse de la machine, pas du fluide. Le fluide, vous devez l'avoir récupéré avant, à part. Une machine qui part à la benne avec sa charge dedans, c'est une fuite programmée.",
      retenir: ["<b>DEEE</b> : la filière de fin de vie de la <b>machine</b>, pas du fluide.", "Le fluide se récupère <b>avant</b>, séparément."],
      reference: "Code 1.00 · fin de vie",
      controle: {
        enonce: "Un groupe froid hors service part à la benne. Que faites-vous du fluide ?",
        choix: [
          "Rien : la filière DEEE s'en occupe avec le reste de la machine",
          "Je le récupère avant le démontage, séparément de la carcasse",
          "Je le laisse dans le circuit, il est piégé et ne peut plus sortir",
          "Je le vidange à l'air libre puisque la machine est déclassée",
        ],
        bonne: 1,
        explication: "La filière <b>DEEE</b> prend la carcasse électrique et électronique. Le fluide se <b>récupère avant</b>, à part. Le laisser dans un appareil mis au rebut, c'est une fuite différée ; le vidanger à l'air libre est interdit.",
      },
    },

    {
      id: "ecoconception",
      titre: "L'écoconception : agir dès la fabrication",
      note: "Le dernier volet",
      visuel: {
        motif: "sequence",
        titre: "Ce que la loi demande aux constructeurs",
        etapes: [
          { titre: "Concevoir", texte: "penser l'appareil dès le dessin" },
          { titre: "Durer plus longtemps", texte: "réparable, pièces disponibles" },
          { titre: "Polluer moins", texte: "moins de charge, moins de pertes" },
        ],
        pied: "L'effort ne porte pas que sur l'installateur : il commence à l'usine.",
      },
      texte: "<p>Enfin, l'<b>écoconception</b> : dès la fabrication, les constructeurs doivent concevoir des appareils qui durent plus longtemps et qui polluent moins.</p>",
      dire: "Dernier volet, et il ne vous concerne pas directement mais il tombe à l'examen : l'écoconception. Dès la fabrication, les constructeurs doivent concevoir des appareils qui durent plus longtemps et qui polluent moins. Autrement dit, l'effort ne pèse pas seulement sur celui qui installe et qui entretient : il commence à l'usine, au moment où la machine est dessinée.",
      retenir: ["<b>Écoconception</b> : durer plus longtemps, polluer moins, dès la fabrication."],
      reference: "Code 1.00 · écoconception",
    },

    {
      id: "piege-chiffres",
      titre: "L'erreur classique : le chiffre appris par cœur",
      note: "À emporter",
      visuel: {
        motif: "alerte",
        titre: "Le réflexe qui vous évitera de perdre des points",
        vignettes: [
          { picto: "📄", etiquette: "ce qu'on fait", titre: "Apprendre un chiffre par cœur", texte: "un seuil, une date, un délai, vus dans une ancienne fiche" },
          { picto: "🔄", etiquette: "ce qui a changé", titre: "Le régime a changé", texte: "règlement (UE) 2024/573 et arrêté du 21 novembre 2025" },
          { picto: "✅", etiquette: "le bon réflexe", titre: "Vérifier le texte en vigueur", texte: "toujours, jamais deviner" },
        ],
        pied: "Face à un chiffre : on vérifie. On ne devine pas.",
      },
      texte: "<p>L'erreur classique : apprendre par cœur un chiffre précis (seuil, date, délai) vu dans une ancienne fiche.</p><p>Le régime des fluides a changé avec le <b>règlement (UE) 2024/573</b> et l'<b>arrêté du 21 novembre 2025</b>.</p>",
      piege: "<p>Face à un chiffre, réflexe unique : <b>vérifier le texte en vigueur</b>, jamais le deviner.</p>",
      dire: "Terminons par l'erreur qui coûte le plus cher. Elle consiste à apprendre par cœur un chiffre précis — un seuil, une date, un délai — vu dans une ancienne fiche ou entendu sur un chantier. Or le régime des fluides a changé, avec le règlement européen de 2024 et l'arrêté du 21 novembre 2025. Un chiffre juste il y a trois ans peut être faux aujourd'hui. Alors face à un chiffre, un seul réflexe : vérifier le texte en vigueur. Jamais deviner.",
      retenir: ["Face à un chiffre : <b>vérifier le texte en vigueur</b>, jamais le deviner."],
      reference: "Code 1.00 · l'erreur classique",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur les unités et la thermodynamique utile.",
});
