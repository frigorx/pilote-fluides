/* Capsule g2a — « Quarante ans d'histoire : de l'ozone au climat » (G2 · code 2.01).
   Contenu repris SANS AJOUT de la fiche g2a de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g2a",
  fiche: "g2a",
  titre: "Quarante ans d'histoire : de l'ozone au climat",
  surtitre: "HABILITATION FLUIDES · G2 · CODE 2.01",
  duree: "environ 7 minutes",
  intro: "Des fluides jugés parfaits dans les années 1930 aux quotas européens d'aujourd'hui : une histoire en deux temps, l'ozone puis le climat, racontée à voix haute.",
  codes: [{ code: "2.01", libelle: "Situer l'histoire : couche d'ozone, protocoles, politique climat" }],

  visuelAccueil: {
    motif: "frise",
    titre: "De l'ozone au climat, quatre décennies",
    jalons: [
      { date: "Années 1930", texte: "les CFC, fluides « miracle »" },
      { date: "1985", texte: "trou dans la couche d'ozone", fort: true },
      { date: "1987", texte: "protocole de Montréal", fort: true },
      { date: "1997", texte: "Kyoto : les HFC visés" },
      { date: "2015", texte: "accord de Paris, +1,5 °C" },
      { date: "2016", texte: "amendement de Kigali", fort: true },
      { date: "2024", texte: "règlement européen F-Gas" },
    ],
    pied: "L'histoire explique la réglementation d'aujourd'hui.",
  },

  ecrans: [
    {
      id: "miracle",
      titre: "Un fluide jugé parfait",
      note: "Le point de départ",
      visuel: {
        motif: "flux",
        titre: "Dans les années 1930, rien n'alarme",
        boites: [
          { picto: "🧪", titre: "Le CFC", texte: "un fluide tout nouveau" },
          { picto: "✅", titre: "Trois qualités", texte: "stable, pas toxique, pas inflammable", teinte: "ok" },
          { picto: "🌍", titre: "Utilisé partout", texte: "sans inquiétude, pendant des décennies" },
        ],
        pied: "Le piège est là : rien, sur le moment, ne montre le danger.",
      },
      texte: "<p>Dans les <b>années 1930</b>, les <b>CFC</b> sont des fluides « miracle » : stables, pas toxiques, pas inflammables.</p><p>Ils se répandent partout, sans inquiétude. Personne, à l'époque, ne voit venir le problème.</p>",
      dire: "Commençons par le début de l'histoire. Dans les années 1930, les C F C sont des fluides jugés parfaits : stables, pas toxiques, pas inflammables. Ils se répandent partout, dans le monde entier, sans inquiétude. Pendant cinquante ans, personne ne voit venir le problème. C'est le point de départ de toute l'histoire que nous allons raconter.",
      reference: "Code 2.01 · quarante ans d'histoire",
    },

    {
      id: "trou-ozone",
      titre: "1985 : le trou dans la couche d'ozone",
      note: "La découverte qui change tout",
      visuel: {
        motif: "flux",
        titre: "Ce que le CFC fait, une fois échappé",
        boites: [
          { picto: "💨", titre: "Le CFC s'échappe", texte: "il monte dans l'atmosphère" },
          { picto: "⚗", titre: "Le chlore se libère", texte: "une fois là-haut", teinte: "danger" },
          { picto: "☀", titre: "L'ozone recule", texte: "il filtre moins les UV-B", teinte: "danger" },
        ],
        pied: "1985 : le trou dans la couche d'ozone est découvert au-dessus de l'Antarctique.",
      },
      texte: "<p>Cinquante ans plus tard, la facture arrive. En <b>1985</b>, on découvre le <b>trou dans la couche d'ozone</b> au-dessus de l'Antarctique.</p><p>En cause : le <b>chlore</b> des CFC, qui casse l'ozone chargé de filtrer les <b>UV-B</b>.</p>",
      dire: "Cinquante ans plus tard, la facture arrive. En 1985, on découvre un trou dans la couche d'ozone, au-dessus de l'Antarctique. La cause : le chlore contenu dans les C F C casse l'ozone, ce gaz qui nous protège en filtrant les ultraviolets B du soleil.",
      reference: "Code 2.01 · 1985, le trou d'ozone",
    },

    {
      id: "montreal",
      titre: "1987 : le sursaut mondial",
      note: "Le plus grand succès environnemental",
      visuel: {
        motif: "sequence",
        titre: "Le monde s'accorde, dans l'ordre",
        etapes: [
          { titre: "1987", texte: "le protocole de Montréal" },
          { titre: "Sortie des CFC", texte: "organisée par le protocole" },
          { titre: "Puis des HCFC", texte: "le même chemin" },
          { titre: "La couche se répare", texte: "le plus grand succès environnemental mondial" },
        ],
        pied: "Un texte international, suivi, qui a marché.",
      },
      texte: "<p>En <b>1987</b>, le <b>protocole de Montréal</b> organise la sortie des CFC, puis celle des HCFC.</p><p>La couche d'ozone se répare : c'est <b>le plus grand succès environnemental mondial</b>.</p>",
      dire: "Alors le monde réagit. En 1987, le protocole de Montréal organise la sortie des C F C, puis celle des H C F C qui les ont remplacés en partie. Résultat : la couche d'ozone se répare. C'est considéré comme le plus grand succès environnemental mondial.",
      retenir: ["Le <b>protocole de Montréal</b> (1987) a fait disparaître les CFC puis les HCFC : la couche d'ozone se répare."],
      reference: "Code 2.01 · le protocole de Montréal",
    },

    {
      id: "effet-de-serre",
      titre: "Un effet vital, qu'on ne doit pas renforcer",
      note: "Ce que mesure le PRP",
      visuel: {
        motif: "balance",
        titre: "Sans effet de serre, la Terre serait glaciale",
        avant: { etiquette: "sans effet de serre", valeur: "−18 °C" },
        apres: { etiquette: "avec l'effet de serre naturel", valeur: "+15 °C environ" },
        ecart: { etiquette: "un effet vital", valeur: "la vie sur Terre" },
        pied: "Le problème n'est pas l'effet de serre : c'est son renforcement par nos émissions.",
      },
      texte: "<p>Le rayonnement solaire entre, la Terre renvoie de l'infrarouge, et certains gaz (CO₂, vapeur d'eau, méthane…) retiennent cette chaleur.</p><p>Cet effet est <b>vital</b> : sans lui, il ferait environ <b>−18 °C</b> au lieu de <b>+15 °C</b>. Le problème, c'est son <b>renforcement</b> par nos émissions.</p>",
      dire: "Avant de parler des H F C, un rappel utile. Le rayonnement du soleil entre, la Terre renvoie de la chaleur sous forme infrarouge, et certains gaz, comme le C O2, la vapeur d'eau ou le méthane, retiennent une partie de cette chaleur. Cet effet est vital : sans lui, il ferait environ moins dix-huit degrés sur Terre, au lieu de quinze degrés environ. Le problème n'est donc pas l'effet de serre lui-même. Le problème, c'est son renforcement par nos émissions.",
      reference: "Code 2.01 · l'effet de serre",
    },

    {
      id: "frise-generale",
      titre: "Quarante ans en une ligne",
      note: "La vue d'ensemble",
      visuel: {
        motif: "frise",
        titre: "De l'ozone au climat, quatre décennies",
        jalons: [
          { date: "Années 1930", texte: "les CFC, fluides « miracle »" },
          { date: "1985", texte: "trou dans la couche d'ozone", fort: true },
          { date: "1987", texte: "protocole de Montréal", fort: true },
          { date: "1997", texte: "Kyoto : les HFC visés" },
          { date: "2015", texte: "accord de Paris, +1,5 °C" },
          { date: "2016", texte: "amendement de Kigali", fort: true },
          { date: "2024", texte: "règlement européen F-Gas" },
        ],
        pied: "L'histoire explique la réglementation d'aujourd'hui.",
      },
      texte: "<p>Résumons quarante ans en une ligne : des CFC des années 1930 au règlement F-Gas de <b>2024</b>, en passant par Montréal, Kyoto, Paris et Kigali.</p>",
      dire: "Reprenons toute cette histoire en une ligne. Les C F C des années 1930. Le trou d'ozone en 1985. Le protocole de Montréal en 1987. Kyoto en 1997. L'accord de Paris en 2015. L'amendement de Kigali en 2016. Et pour finir, en 2024, le règlement européen qui organise aujourd'hui votre métier.",
      reference: "Code 2.01 · la frise complète",
    },

    {
      id: "ozone-vs-climat",
      titre: "Ozone, climat : deux bulletins différents",
      note: "Le piège classique de l'examen",
      visuel: {
        motif: "duo",
        titre: "Deux mesures que l'examen aime confondre",
        cartes: [
          { titre: "L'OZONE", picto: "☀", pour: "mesuré par l'ODP", texte: "un HFC a un ODP nul : il ne touche pas l'ozone" },
          { titre: "LE CLIMAT", picto: "🌡", pour: "mesuré par le PRP", texte: "un HFC a un PRP énorme : il réchauffe fortement" },
        ],
        lien: "≠",
        pied: "Bon élève d'un côté, cancre de l'autre : ce sont deux bulletins séparés.",
      },
      texte: "<p>Les remplaçants des CFC, les <b>HFC</b>, sont inoffensifs pour l'ozone. Mais ce sont de puissants <b>gaz à effet de serre</b>.</p><p>L'<b>ODP</b> mesure l'attaque de l'ozone ; le <b>PRP</b> mesure l'effet de serre. Un HFC a un ODP <b>nul</b> et un PRP <b>énorme</b> : excellent élève d'un côté, cancre de l'autre.</p>",
      dire: "Voici le moment où l'histoire bascule. Les remplaçants des C F C, les H F C, sont inoffensifs pour l'ozone. Mais ce sont de puissants gaz à effet de serre. Attention à ne jamais confondre deux mesures. L'O D P mesure l'attaque de l'ozone : chlore et brome. Le P R P mesure l'effet de serre. Un H F C a un O D P nul, et pourtant un P R P énorme. Excellent élève d'un côté, cancre de l'autre. Ne confondez jamais les deux bulletins.",
      retenir: ["Un HFC a un <b>ODP nul</b> (il ne touche pas l'ozone) mais un <b>PRP énorme</b> (il réchauffe le climat)."],
      reference: "Code 2.01 · ODP contre PRP",
      controle: {
        enonce: "Pourquoi les HFC, qui ont sauvé la couche d'ozone, sont-ils aujourd'hui visés à leur tour ?",
        choix: [
          "Parce qu'ils contiennent encore un peu de chlore",
          "Parce qu'ils sont de puissants gaz à effet de serre, malgré leur ODP nul",
          "Parce qu'ils sont tous très inflammables",
          "Parce qu'ils sont toxiques pour l'homme",
        ],
        bonne: 1,
        explication: "Zéro chlore : l'ozone est tranquille. Mais leur stabilité leur donne un fort pouvoir de réchauffement — d'où Kyoto, Kigali et le phase-down F-Gas. Le problème a changé de terrain, pas de molécules.",
      },
    },

    {
      id: "kigali-bilan",
      titre: "Kigali : le traité qui marche, réutilisé",
      note: "À retenir avant l'examen",
      visuel: {
        motif: "alerte",
        titre: "Un problème nouveau, un traité qui a fait ses preuves",
        vignettes: [
          { picto: "📜", etiquette: "avant 2016", titre: "Montréal visait l'ozone", texte: "les HFC n'y entraient pas : leur ODP est nul" },
          { picto: "🔄", etiquette: "le changement", titre: "Kigali, 2016", texte: "les HFC entrent dans Montréal, cette fois pour le climat" },
          { picto: "⚖", etiquette: "aujourd'hui", titre: "F-Gas en Europe", texte: "quotas, interdictions, obligations de votre métier" },
        ],
        pied: "On a réutilisé le traité qui fonctionne, pour un problème différent.",
      },
      texte: "<p>En <b>2016</b>, l'<b>amendement de Kigali</b> fait entrer les HFC dans le protocole de Montréal — alors que ce traité visait l'ozone, pas le climat.</p><p>En Europe, le règlement <b>F-Gas</b> traduit tout cela en quotas, interdictions et obligations : celles de votre métier.</p>",
      dire: "Dernier rebondissement de cette histoire, et c'est le plus important à retenir. En 2016, l'amendement de Kigali fait entrer les H F C dans le protocole de Montréal. Or Montréal visait l'ozone, pas le climat, et les H F C ont un O D P nul. Pourquoi ce choix ? Parce que Montréal est le traité qui a fait ses preuves : plutôt que d'en inventer un nouveau, le monde a réutilisé celui qui fonctionne, pour un problème différent. En Europe, le règlement F-Gas traduit tout cela en quotas, interdictions et obligations. Ce sont celles de votre métier.",
      piege: "<p>L'<b>ODP</b> mesure l'attaque de l'ozone (chlore et brome) ; le <b>PRP</b> mesure l'effet de serre. Un HFC a un ODP <b>nul</b> et un PRP <b>énorme</b> : ne jamais confondre les deux bulletins.</p>",
      reference: "Code 2.01 · l'amendement de Kigali",
      controle: {
        enonce: "Pourquoi les HFC ont-ils été intégrés au protocole de Montréal (amendement de Kigali, 2016), alors que ce traité visait à l'origine la couche d'ozone ?",
        choix: [
          "Parce que les HFC finissent par attaquer l'ozone après plusieurs années",
          "Parce que Montréal est le traité qui a fait ses preuves, réutilisé pour le problème climatique",
          "Parce que le protocole de Kyoto a été annulé",
          "Parce que les HFC ont remplacé les CFC dans la même molécule",
        ],
        bonne: 1,
        explication: "Montréal a été choisi pour son efficacité prouvée sur les CFC — pas parce que les HFC toucheraient l'ozone : leur ODP reste nul. C'est le traité qui marche, réutilisé pour un problème différent.",
      },
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur le PRP et le règlement F-Gas.",
});
