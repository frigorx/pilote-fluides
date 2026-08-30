/* ÉlectroRézo 1.9 — Mesurer : multimètre et pince ampèremétrique. */

ModeleGrandeur.construire({
  id: '1.9', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 9',
  titre: "Mesurer : multimètre et pince",
  narration: NARRATION,

  prerequis: [
    { id: '1.1', quoi: "le courant" },
    { id: '1.2', quoi: "la tension" },
    { id: '1.3', quoi: "la résistance" },
  ],

  photos: [
    { src: 'assets/biblio/multimetre-et-pince.jpeg',
      alt: "Photo d’un multimètre numérique et d’une pince ampèremétrique posés côte à côte.",
      titre: "Les deux outils.", sous: "L’un demande qu’on ouvre le circuit, l’autre non." },
    { src: 'assets/biblio/multimetre-a-molette.gif',
      alt: "Photo d’un multimètre numérique avec son écran, sa molette de sélection et ses bornes de raccordement.",
      titre: "La molette et les bornes.", sous: "Les deux doivent dire la même chose." },
    { src: 'assets/biblio/pince-en-lecture.jpeg',
      alt: "Photo d’une pince ampèremétrique dont l’écran affiche une valeur de courant.",
      titre: "Sans rien débrancher.", sous: "La machine continue de tourner pendant la mesure." }
  ],

  lIdee: "Toutes les grandeurs de cette ligne se mesurent avec deux appareils. Le multimètre, qui fait presque tout mais qui demande qu’on ouvre le circuit pour les courants. Et la pince, qui ne mesure qu’un courant, mais sans rien toucher.",
  ouOnLaRencontre: "Dans la caisse de tout électricien, et dans la vôtre. Savoir s’en servir n’est pas une option : c’est la différence entre diagnostiquer et deviner.",

  scene: () => SchemasGrandeurs.choisirLaMesure(),

  ceQuiSePasse: [
    ["Deux réglages, pas un", "la <strong>molette</strong> dit ce qu’on mesure ; la <strong>borne</strong> où l’on met la pointe rouge doit dire la même chose. Les deux ensemble, ou rien ne marche."],
    ["La pointe noire ne bouge jamais", "elle reste dans <strong>COM</strong>. C’est la rouge qu’on déplace, et c’est donc elle qui se trompe."],
    ["Sur la mauvaise position, pas d’erreur affichée", "l’appareil affiche un nombre, calmement. C’est à vous de savoir s’il a un sens."],
    ["La pince ne touche rien", "elle enserre le conducteur et lit le champ magnétique autour. Aucun contact électrique, aucune coupure, aucun risque de court-circuit."]
  ],
  aRetenir: [
    "<strong>Tension</strong> : molette sur V, pointes aux bornes, en parallèle.",
    "<strong>Courant au multimètre</strong> : molette sur A, pointe dans la borne A, circuit ouvert, en série.",
    "<strong>Courant à la pince</strong> : on enserre <strong>un seul</strong> conducteur, et on lit.",
    "<strong>Résistance</strong> : hors tension, élément débranché d’au moins un côté."
  ],

  mesure: () => SchemasGrandeurs.pinceEtMultimetre(),
  instrument: [
    "Vérifiez l’appareil <strong>avant et après</strong> : sur une source connue, ou avec la fonction continuité. Un appareil en panne affiche zéro comme un circuit mort.",
    "Vérifiez les <strong>cordons</strong> : un cordon coupé à l’intérieur donne exactement la même lecture qu’une installation hors tension.",
    "Respectez la <strong>catégorie de mesure</strong> écrite sur l’appareil — CAT II, CAT III, CAT IV. Elle dit sur quel type d’installation il peut travailler sans danger.",
    "Un <strong>vérificateur d’absence de tension</strong> n’est pas un multimètre. C’est lui, et lui seul, qu’on emploie avant d’intervenir."
  ],
  dangerDeMesure: "Ne concluez jamais « c’est hors tension » sur une seule lecture à zéro. Un appareil éteint, un cordon coupé, une mauvaise position affichent tous zéro. On vérifie l’appareil sur une source vivante, on mesure, puis on revérifie l’appareil.",

  ecriture: {
    symbole: 'V A Ω', unite: 'CAT', nomUnite: 'la catégorie de mesure',
    multiples: [
      ['CAT II', 'les prises et les circuits terminaux'],
      ['CAT III', 'les tableaux de distribution, les armoires'],
      ['CAT IV', 'l’origine de l’installation, avant le disjoncteur de branchement']
    ]
  },
  surUnePlaque: [
    "Sur le <strong>corps de l’appareil</strong> : la catégorie et la tension maximale, par exemple <em>CAT III 600 V</em>. Ce n’est pas une décoration commerciale.",
    "Sur les <strong>cordons</strong> aussi : ils portent leur propre catégorie, et c’est la plus faible des deux qui compte.",
    "Sur la <strong>pince</strong> : le calibre maximal, et parfois la mention <em>True RMS</em> — nécessaire dès qu’il y a un variateur dans l’installation.",
    "Un appareil sans marquage de catégorie n’a rien à faire dans une armoire industrielle."
  ],

  quiz: [
    { question: "La pointe noire d’un multimètre se met où ?",
      confirmation: "Dans COM, et elle n’en bouge jamais.",
      reponses: [
        { texte: "Dans COM, toujours.", juste: true },
        { texte: "Dans la borne A pour les courants.", pourquoi: "C’est la pointe rouge qu’on déplace vers A." },
        { texte: "Dans la borne V pour les tensions.", pourquoi: "Là encore, c’est la rouge." },
        { texte: "Cela dépend du sens du courant.", pourquoi: "En alternatif il n’y a pas de sens ; en continu, un signe moins s’affiche, sans danger." } ] },

    { question: "Vous mesurez et l’appareil affiche zéro. Que pouvez-vous en conclure ?",
      confirmation: "Rien, tant que vous n’avez pas vérifié l’appareil lui-même.",
      reponses: [
        { texte: "Que le circuit est hors tension.", pourquoi: "Un appareil en panne, un cordon coupé ou une mauvaise position affichent aussi zéro." },
        { texte: "Rien, tant que l’appareil n’a pas été vérifié.", juste: true },
        { texte: "Que le fusible est fondu.", pourquoi: "C’est une hypothèse parmi d’autres, et elle ne se déduit pas d’un zéro." },
        { texte: "Que la mesure est en cours.", pourquoi: "Un multimètre affiche immédiatement : il n’y a pas de temps de calcul." } ] },

    { question: "Que veut dire « CAT III 600 V » sur un multimètre ?",
      confirmation: "Il peut travailler jusqu’aux tableaux de distribution, sous 600 volts au plus.",
      reponses: [
        { texte: "Qu’il mesure au maximum 600 volts, sans autre limite.", pourquoi: "La catégorie ajoute une contrainte sur le lieu, pas seulement sur la valeur." },
        { texte: "Qu’il a trois catégories de mesure.", pourquoi: "Le chiffre désigne une seule catégorie, pas un nombre de modes." },
        { texte: "Qu’il peut travailler jusqu’aux tableaux, sous 600 V au plus.", juste: true },
        { texte: "Qu’il possède trois bornes.", pourquoi: "Le nombre de bornes n’a rien à voir avec ce marquage." } ] },

    { question: "Pourquoi préfère-t-on la pince au multimètre pour mesurer le courant d’un moteur ?",
      confirmation: "Elle mesure sans ouvrir le circuit : la machine continue de tourner.",
      reponses: [
        { texte: "Parce qu’elle est plus précise.", pourquoi: "Elle est souvent moins précise qu’une mesure en série." },
        { texte: "Parce qu’elle mesure aussi la tension.", pourquoi: "Certaines le font, mais ce n’est pas la raison." },
        { texte: "Parce qu’elle supporte des courants plus faibles.", pourquoi: "C’est l’inverse : elle est faite pour les courants élevés." },
        { texte: "Parce qu’elle n’exige pas d’ouvrir le circuit.", juste: true } ] }
  ],

  retenir: [
    "<strong>La molette ET la borne</strong> doivent dire la même chose.",
    "<strong>La noire dans COM</strong>, sans exception.",
    "<strong>Un zéro ne prouve rien</strong> tant que l’appareil n’est pas vérifié.",
    "<strong>La pince pour les moteurs</strong> : elle mesure sans rien débrancher."
  ],

  objectifs: '<p><strong>Objectif.</strong> Choisir la position et la borne justes, connaître les catégories de mesure, et ne jamais conclure d’un zéro sans avoir vérifié l’appareil.</p><p><strong>Limite.</strong> La procédure complète de consignation est traitée dans le réseau inerWeb HoCourant, consacré à l’habilitation.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.1 Le courant et l’intensité" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.2 La tension" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.7 Lire une plaque signalétique" } ]
});
