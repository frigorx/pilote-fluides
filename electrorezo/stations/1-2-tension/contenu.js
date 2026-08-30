/* ÉlectroRézo 1.2 — La tension. */

ModeleGrandeur.construire({
  id: '1.2', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 2',
  titre: "La tension",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/mesure-de-tension-sur-un-circuit.png',
      alt: "Schéma d’un multimètre relié par ses deux pointes de touche à un circuit, affichant une tension.",
      titre: "Toujours deux pointes.", sous: "Une tension se mesure entre deux points, jamais en un seul." },
    { src: 'assets/biblio/multimetre-et-ses-sondes.png',
      alt: "Photo d’un multimètre numérique avec ses sondes rouge et noire, son sélecteur rotatif et son écran affichant 0,00.",
      titre: "Rouge et noire.", sous: "La noire ne bouge jamais de la borne commune." }
  ],

  lIdee: "La tension, c’est ce qui pousse. Sans elle, les charges restent là où elles sont et rien ne circule. Mais attention : elle n’existe jamais « en un point ». Elle est toujours une différence entre deux points.",
  ouOnLaRencontre: "Sur toutes les étiquettes du métier : 230 volts, 400 volts, 24 volts. Et dans la première question à se poser devant une installation — non pas « est-ce qu’il y a de la tension ? », mais « entre quels points ? ».",

  scene: () => SchemasGrandeurs.differenceDePotentiel(),

  ceQuiSePasse: [
    ["Une différence, toujours", "chaque point d’un circuit a un potentiel. La tension entre deux points, c’est l’écart entre leurs potentiels. Si les deux sont au même niveau, l’écart est nul — quelle que soit la valeur des deux."],
    ["C’est elle qui pousse", "sans différence de potentiel, pas de circulation. Elle est la cause, l’intensité est la conséquence."],
    ["L’oiseau sur le fil", "il a ses deux pattes sur le même conducteur, donc au même potentiel. La tension entre ses pattes est nulle, et il ne lui arrive rien — alors qu’il est posé sur du très haute tension."],
    ["Elle se mesure sans rien couper", "on pose deux pointes, on lit. C’est la seule mesure courante qui se fait sur une installation en service, et c’est aussi celle qui expose le plus."]
  ],
  aRetenir: [
    "La tension se note <strong>U</strong> et se mesure en <strong>volts</strong>.",
    "Elle n’est jamais une propriété d’un point : c’est un écart entre deux.",
    "Dire « il y a 230 volts sur ce fil » est un raccourci. Il faut entendre : 230 volts entre ce fil et le neutre."
  ],

  mesure: () => SchemasGrandeurs.brancherVoltmetre(),
  instrument: [
    "Le <strong>voltmètre</strong> se branche <strong>en parallèle</strong>, aux bornes de ce qu’on veut mesurer. On ne coupe rien.",
    "Sa résistance est énorme — de l’ordre du million d’ohms. Il prend donc un courant négligeable et ne perturbe pas le circuit.",
    "La pointe <strong>noire</strong> va toujours dans la borne <strong>COM</strong>. C’est la rouge qu’on déplace, et c’est elle qui se trompe.",
    "Sur le réseau, sélecteur en <strong>alternatif</strong>. Sur une batterie ou une carte, en <strong>continu</strong>."
  ],
  dangerDeMesure: "C’est la seule mesure qui se fait couramment sous tension. Gants isolants, pointes en bon état, une main derrière le dos, et jamais seul sur une installation inconnue.",

  ecriture: {
    symbole: 'U', unite: 'V', nomUnite: 'le volt',
    multiples: [
      ['1 mV', 'un millième de volt — l’échelle des sondes de température'],
      ['1 V', 'l’unité — une pile bâton en donne 1,5'],
      ['1 kV', 'mille volts — au-dessus, on parle de haute tension']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>plaque de moteur</strong>, deux tensions sont écrites : <em>230 V</em> et <em>400 V</em>. Elles ne sont pas au choix — elles correspondent chacune à un couplage.",
    "Sur un <strong>contacteur</strong>, la tension écrite sur la bobine est celle de la commande. Elle n’a rien à voir avec celle de la puissance.",
    "Dans une <strong>armoire</strong>, on trouve couramment trois tensions : 400 entre phases, 230 entre phase et neutre, 24 pour la commande.",
    "Avant de brancher, lisez laquelle. Une bobine 24 V alimentée en 230 V grille en une seconde."
  ],

  quiz: [
    { question: "Pourquoi un oiseau posé sur une ligne haute tension ne meurt-il pas ?",
      confirmation: "Ses deux pattes sont au même potentiel : la tension entre elles est nulle.",
      reponses: [
        { texte: "Parce que ses plumes l’isolent.", pourquoi: "Les plumes n’isolent pas assez pour des dizaines de milliers de volts." },
        { texte: "Parce que ses deux pattes sont au même potentiel.", juste: true },
        { texte: "Parce qu’il est trop petit.", pourquoi: "La taille ne protège de rien : un oiseau touchant deux fils meurt." },
        { texte: "Parce que la ligne est en courant continu.", pourquoi: "Les lignes de transport sont alternatives, et cela ne changerait rien." } ] },

    { question: "Où branche-t-on un voltmètre ?",
      confirmation: "En parallèle, aux bornes. Il lui faut deux points.",
      reponses: [
        { texte: "En série, dans le circuit.", pourquoi: "Sa résistance énorme couperait pratiquement le circuit." },
        { texte: "Sur un seul point, avec une seule pointe.", pourquoi: "Une tension est une différence : une seule pointe ne peut rien mesurer." },
        { texte: "En parallèle, aux bornes.", juste: true },
        { texte: "Peu importe : il mesure de toute façon.", pourquoi: "Le branchement change complètement le résultat." } ] },

    { question: "Une bobine de contacteur porte « 24 V ». Que veut dire ce nombre ?",
      confirmation: "C’est la tension du circuit de commande, pas celle de la puissance.",
      reponses: [
        { texte: "Que le contacteur coupe des circuits en 24 volts.", pourquoi: "La puissance qu’il coupe peut très bien être en 400 volts." },
        { texte: "Que ses contacts tiennent 24 ampères.", pourquoi: "Le volt n’est pas l’ampère, et le calibre s’écrit à part." },
        { texte: "Qu’il consomme 24 volts.", pourquoi: "On ne consomme pas des volts : on consomme de l’énergie." },
        { texte: "Que sa bobine doit être alimentée en 24 volts.", juste: true } ] },

    { question: "Que signifie exactement « 230 V » sur une prise domestique ?",
      confirmation: "230 volts entre la phase et le neutre.",
      reponses: [
        { texte: "230 volts entre la phase et le neutre.", juste: true },
        { texte: "230 volts entre la phase et la terre uniquement.", pourquoi: "Le neutre est la référence habituelle ; la valeur mesurée vers la terre est proche, mais ce n’est pas la définition." },
        { texte: "La valeur maximale atteinte par la tension.", pourquoi: "Le maximum monte à environ 325 volts : 230 est la valeur efficace." },
        { texte: "230 volts dans chacun des deux fils.", pourquoi: "Un fil ne « contient » pas de tension : elle existe entre deux fils." } ] }
  ],

  retenir: [
    "<strong>U</strong>, en <strong>volts</strong>. C’est une <strong>différence</strong>, jamais une valeur en un point.",
    "<strong>En parallèle</strong>, aux bornes, sans rien couper.",
    "<strong>La noire dans COM</strong>, toujours.",
    "<strong>C’est la mesure qui expose le plus</strong> : elle se fait sous tension."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que la tension est une différence de potentiel, savoir la mesurer en parallèle, et lire les tensions écrites sur le matériel.</p><p><strong>Limite.</strong> Les tensions simple et composée du triphasé sont traitées à la ligne 2.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.4 La tension simple" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.5 La tension composée" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.3 La loi d’Ohm" } ]
});
