/* ÉlectroRézo 1.3 — La résistance et la loi d’Ohm. */

ModeleGrandeur.construire({
  id: '1.3', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 3',
  titre: "La résistance et la loi d’Ohm",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/loi-ohm-lampe.jpeg',
      alt: "Schéma d’une lampe traversée par 0,25 ampère, de résistance 20 ohms, avec le calcul U égale R fois I qui donne 5 volts.",
      titre: "Trois nombres liés.", sous: "Fixez-en deux : le troisième est décidé." },
    { src: 'assets/biblio/uab-egale-r-fois-i.png',
      alt: "Document présentant deux fois la même relation : en haut Uab égale R électrique fois I, en bas la transposition thermique, écart de température égal à résistance thermique fois flux.",
      titre: "La relation, écrite.", sous: "En haut l’électricité. En bas, la même idée transposée à la chaleur." }
  ],

  lIdee: "Toute matière s’oppose au passage du courant, plus ou moins. Cette opposition, c’est la résistance. Et il existe entre elle, la tension et le courant une relation si simple qu’elle tient en trois lettres — et si utile qu’on s’en sert tous les jours.",
  ouOnLaRencontre: "Dans un radiateur, où la résistance est voulue et sert à chauffer. Dans un câble, où elle est subie et fait perdre de l’énergie. Et dans un bobinage de moteur, où sa valeur mesurée dit s’il est sain ou grillé.",

  scene: () => SchemasGrandeurs.curseurOhm(),

  ceQuiSePasse: [
    ["La tension pousse, la résistance freine", "et ce qui passe est le résultat des deux. Beaucoup de tension et peu de résistance : beaucoup de courant. C’est tout ce que dit la loi d’Ohm."],
    ["Ce qui fait la résistance d’un fil", "sa <strong>longueur</strong> — plus il est long, plus il résiste ; sa <strong>section</strong> — plus il est gros, moins il résiste ; et le <strong>métal</strong> dont il est fait."],
    ["La température aussi", "un métal chaud résiste davantage. Un bobinage mesuré à froid et le même mesuré après une heure de marche ne donnent pas la même valeur."],
    ["Elle n’est pas toujours constante", "une lampe à filament, une bobine, un moteur : leur résistance change avec les conditions. La loi d’Ohm reste vraie à chaque instant, mais avec la valeur du moment."]
  ],
  aRetenir: [
    "La résistance se note <strong>R</strong> et se mesure en <strong>ohms</strong>, symbole <strong>Ω</strong>.",
    "<strong>U = R × I</strong>. Les trois vont ensemble : fixez-en deux, la troisième est décidée.",
    "Un conducteur parfait n’existe pas. Tout câble a une résistance, donc toute ligne perd de la tension sur sa longueur."
  ],

  mesure: () => SchemasGrandeurs.mesurerResistance(),
  instrument: [
    "L’<strong>ohmmètre</strong> envoie son propre petit courant et regarde ce qui revient. Il ne se contente pas d’écouter : il parle.",
    "Il faut donc <strong>couper, consigner, et débrancher au moins un côté</strong> de l’élément mesuré. Sinon on mesure aussi tout ce qui est en parallèle.",
    "Sur un <strong>bobinage de moteur</strong>, on mesure les trois enroulements et on les compare. Ils doivent être quasiment identiques.",
    "Une valeur <strong>nulle</strong> annonce un court-circuit interne. Une valeur <strong>infinie</strong> annonce un enroulement coupé."
  ],
  dangerDeMesure: "Mesurer une résistance sous tension fausse la lecture et peut détruire l’appareil : la tension du réseau écrase le petit courant de l’ohmmètre. On coupe d’abord. Toujours.",

  ecriture: {
    symbole: 'R', unite: 'Ω', nomUnite: 'l’ohm',
    multiples: [
      ['quelques Ω', 'un bobinage de moteur, une résistance de chauffage'],
      ['1 kΩ', 'mille ohms — l’échelle de l’électronique'],
      ['1 MΩ', 'un million d’ohms — l’échelle d’un bon isolant']
    ]
  },
  surUnePlaque: [
    "La résistance n’est <strong>presque jamais écrite</strong> sur le matériel : c’est une grandeur qu’on mesure, pas qu’on lit.",
    "Sur un plan, un élément résistif se dessine par le <strong>rectangle</strong> de la station 8.4.",
    "Dans un rapport de contrôle, elle apparaît sous deux formes : la résistance des <strong>enroulements</strong>, en ohms, et la résistance d’<strong>isolement</strong>, en mégohms.",
    "Ces deux-là ne se mesurent pas avec le même appareil, et une bonne valeur de l’une ne dit rien de l’autre."
  ],

  quiz: [
    { question: "Sous 230 V, une résistance de 46 Ω laisse passer combien de courant ?",
      confirmation: "230 divisé par 46 : cinq ampères.",
      reponses: [
        { texte: "46 A.", pourquoi: "C’est la valeur de la résistance, pas celle du courant." },
        { texte: "0,2 A.", pourquoi: "C’est le calcul inversé : 46 divisé par 230." },
        { texte: "5 A.", juste: true },
        { texte: "10 580 A.", pourquoi: "C’est le produit 230 × 46 : il faut diviser, pas multiplier." } ] },

    { question: "Qu’est-ce qui augmente la résistance d’un fil ?",
      confirmation: "Un fil plus long, ou plus fin, résiste davantage.",
      reponses: [
        { texte: "L’augmenter en section.", pourquoi: "Plus il est gros, moins il résiste : c’est l’inverse." },
        { texte: "Y faire passer moins de courant.", pourquoi: "Le courant ne modifie pas la résistance — sauf par l’échauffement qu’il provoque." },
        { texte: "Le refroidir.", pourquoi: "Un métal froid résiste moins qu’un métal chaud." },
        { texte: "L’allonger.", juste: true } ] },

    { question: "Pourquoi ne mesure-t-on jamais une résistance sous tension ?",
      confirmation: "L’ohmmètre envoie son propre courant : toute tension étrangère fausse tout.",
      reponses: [
        { texte: "Parce que la tension du réseau écrase le courant de l’appareil.", juste: true },
        { texte: "Parce que l’appareil n’a pas la bonne échelle.", pourquoi: "Aucune échelle ne permet cette mesure : c’est le principe même qui l’interdit." },
        { texte: "Parce que la norme l’interdit, sans autre raison.", pourquoi: "La raison est physique, et elle se démontre." },
        { texte: "Parce que la mesure serait trop lente.", pourquoi: "La durée n’entre pas en compte." } ] },

    { question: "Un enroulement de moteur mesure une résistance infinie. Que conclure ?",
      confirmation: "Rien ne passe : l’enroulement est coupé.",
      reponses: [
        { texte: "Il est en court-circuit.", pourquoi: "Un court-circuit donnerait au contraire une valeur presque nulle." },
        { texte: "Il est coupé.", juste: true },
        { texte: "Il est parfaitement isolé, donc en bon état.", pourquoi: "On mesure ici l’enroulement lui-même, pas son isolement : il doit conduire." },
        { texte: "L’appareil est mal réglé.", pourquoi: "C’est à vérifier, mais sur les trois enroulements : si un seul est infini, c’est lui le fautif." } ] }
  ],

  retenir: [
    "<strong>R</strong>, en <strong>ohms</strong>. Ce qui s’oppose au passage.",
    "<strong>U = R × I.</strong> Fixez-en deux, la troisième suit.",
    "<strong>Long et fin</strong> : ça résiste. <strong>Court et gros</strong> : ça résiste peu.",
    "<strong>Jamais sous tension.</strong> On coupe, on consigne, on débranche un côté."
  ],

  objectifs: '<p><strong>Objectif.</strong> Employer la loi d’Ohm dans les deux sens, savoir ce qui fait la résistance d’un conducteur, et mesurer une résistance sans danger.</p><p><strong>Limite.</strong> L’impédance des circuits alternatifs — bobines et condensateurs — n’est pas traitée ici.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.1 Le courant et l’intensité" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.4 La puissance et l’énergie" },
    { ligne: 4, couleur: '#c0392b', texte: "4.9 Le câble et sa section" } ]
});
