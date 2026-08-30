/* ÉlectroRézo 2.1 — Phase, neutre et conducteur de protection. */

ModeleGrandeur.construire({
  id: '2.1', ligne: 2,
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 1',
  titre: "Phase, neutre et protection",
  narration: NARRATION,

  prerequis: [
    { id: '1.2', quoi: "la tension" },
  ],

  photos: [
    { src: 'assets/biblio/couleurs-des-conducteurs.png',
      alt: "Planche des couleurs normalisées : la phase dans toutes les couleurs sauf bleu et vert-jaune, le neutre toujours en bleu, la terre obligatoirement en vert et jaune.",
      titre: "Les couleurs sont une loi.", sous: "Deux d’entre elles sont réservées, dans le monde entier." },
    { src: 'assets/biblio/phase-neutre-terre-sur-un-moteur.png',
      alt: "Schéma de câblage d’un moteur monophasé montrant les raccordements de la phase, du neutre et de la terre.",
      titre: "Sur un appareil réel.", sous: "Trois bornes, trois rôles, et jamais d’interversion." }
  ],

  lIdee: "Dans une installation domestique, trois conducteurs arrivent. Ils se ressemblent tous : même cuivre, même épaisseur, même gaine. Ce qui les distingue, c’est leur rôle — et deux d’entre eux ont une couleur qui leur est réservée.",
  ouOnLaRencontre: "Derrière chaque prise, dans chaque boîte de dérivation, sur chaque appareil. C’est la première chose qu’on identifie en ouvrant un coffret, et c’est ce qui décide de ce qu’on a le droit de toucher.",

  scene: () => SchemasReseaux.troisConducteurs(),

  ceQuiSePasse: [
    ["La phase amène", "c’est elle qui porte la tension. Entre elle et la terre, il y a 230 volts — et donc du danger. On la reconnaît à ceci : elle peut être de <strong>n’importe quelle couleur sauf deux</strong>."],
    ["Le neutre ramène", "il ferme la boucle. Au poste de distribution, il est relié à la terre : c’est pour cela qu’entre lui et la terre on ne mesure presque rien. Il est <strong>toujours bleu clair</strong>."],
    ["Le conducteur de protection ne transporte rien", "en marche normale, il ne fait rien du tout. Il attend. Le jour où un isolant lâche, il offre au courant de défaut un chemin franc vers la terre — et c’est ce qui permet au différentiel de le voir."],
    ["Deux couleurs sont réservées", "le <strong>bleu clair</strong> pour le neutre, le <strong>vert et jaune</strong> pour la protection. Aucune autre fonction n’a le droit de les employer. Cette règle vaut dans le monde entier."]
  ],
  aRetenir: [
    "Le neutre n’est <strong>pas</strong> un fil inoffensif : coupé quelque part en amont, il peut se retrouver au potentiel de la phase.",
    "Le conducteur de protection se note <strong>PE</strong>. On dit couramment « la terre », mais ce n’est pas tout à fait la même chose : la terre est le sol, le PE est le fil qui y mène.",
    "Un PE parcouru par du courant en marche normale annonce un défaut. Ce n’est jamais normal."
  ],

  mesure: () => SchemasReseaux.troisMesures(),
  instrument: [
    "Trois fils inconnus, trois mesures : <strong>entre chaque paire</strong>. Deux donnent 230 volts, une donne zéro.",
    "Les deux qui donnent zéro entre eux sont le <strong>neutre et la protection</strong> : ils sont reliés ensemble en amont.",
    "Celui qui donne 230 volts avec les deux autres est la <strong>phase</strong>.",
    "Un <strong>tournevis testeur</strong> ne suffit pas : il dit qu’il y a de la tension, pas laquelle ni entre quoi. C’est un indicateur, pas un instrument de mesure."
  ],
  dangerDeMesure: "Ne vous fiez jamais à la couleur seule sur une installation ancienne ou modifiée. Un fil bleu employé comme phase, cela existe, et cela a tué. On mesure d’abord, on conclut ensuite.",

  ecriture: {
    symbole: 'L · N · PE', unite: 'repères', nomUnite: 'les trois lettres du plan',
    multiples: [
      ['L', 'la phase — L1, L2, L3 en triphasé'],
      ['N', 'le neutre — bleu clair, et lui seul'],
      ['PE', 'le conducteur de protection — vert et jaune, et lui seul']
    ]
  },
  surUnePlaque: [
    "Sur les <strong>bornes d’un appareil</strong> : <em>L</em>, <em>N</em>, et le symbole de terre — trois traits de longueur décroissante.",
    "Sur un <strong>plan</strong>, le PE est dessiné à part, et il ne porte <strong>jamais</strong> d’appareil de coupure. Un disjoncteur sur le vert-jaune est une faute, pas une subtilité.",
    "Sur un <strong>bornier</strong>, la borne de terre est souvent verte, et elle est reliée à la platine par une liaison visible.",
    "Sur un <strong>câble</strong>, le vert-jaune est un peu plus court ou un peu plus long que les autres, selon les habitudes. Ce n’est jamais un hasard : cherchez pourquoi."
  ],

  quiz: [
    { question: "Quelles couleurs sont réservées, et à quoi ?",
      confirmation: "Bleu clair pour le neutre, vert-jaune pour la protection.",
      reponses: [
        { texte: "Rouge pour la phase, bleu pour le neutre.", pourquoi: "La phase peut être de n’importe quelle couleur — sauf les deux réservées." },
        { texte: "Bleu clair pour le neutre, vert-jaune pour la protection.", juste: true },
        { texte: "Vert pour la terre, jaune pour le neutre.", pourquoi: "Le vert et le jaune vont toujours ensemble, sur le même conducteur." },
        { texte: "Aucune : les couleurs sont libres.", pourquoi: "Deux d’entre elles sont réservées, et cette règle est mondiale." } ] },

    { question: "Que fait le conducteur de protection en marche normale ?",
      confirmation: "Rien. Et c’est exactement ce qu’on lui demande.",
      reponses: [
        { texte: "Il ramène une partie du courant.", pourquoi: "C’est le rôle du neutre : le PE ne transporte rien en marche normale." },
        { texte: "Il équilibre les phases.", pourquoi: "L’équilibrage se fait par la répartition des charges, pas par le PE." },
        { texte: "Rien du tout.", juste: true },
        { texte: "Il mesure les courants de fuite.", pourquoi: "C’est le rôle du différentiel : le PE ne mesure rien." } ] },

    { question: "Entre le neutre et la terre, un voltmètre affiche à peu près zéro. Pourquoi ?",
      confirmation: "Ils sont reliés ensemble au poste de distribution.",
      reponses: [
        { texte: "Parce que le voltmètre est mal réglé.", pourquoi: "La lecture est correcte : les deux points sont bien presque au même potentiel." },
        { texte: "Parce que le neutre n’est pas alimenté.", pourquoi: "Il l’est : le courant y circule en permanence." },
        { texte: "Parce que le neutre est coupé.", pourquoi: "Un neutre coupé donnerait au contraire une tension anormale." },
        { texte: "Parce qu’ils sont reliés en amont, au poste.", juste: true } ] },

    { question: "Peut-on poser un disjoncteur sur le conducteur de protection ?",
      confirmation: "Jamais. C’est une faute, et elle se signale.",
      reponses: [
        { texte: "Non, jamais.", juste: true },
        { texte: "Oui, si le circuit est en triphasé.", pourquoi: "Le nombre de phases ne change rien à cette interdiction." },
        { texte: "Oui, à condition qu’il soit différentiel.", pourquoi: "Aucun appareil de coupure ne se pose sur le PE, quel qu’il soit." },
        { texte: "Oui, pour pouvoir tester l’installation.", pourquoi: "Les essais se font autrement, sans jamais interrompre le PE." } ] }
  ],

  retenir: [
    "<strong>La phase amène</strong>, <strong>le neutre ramène</strong>, <strong>le PE attend</strong>.",
    "<strong>Bleu clair</strong> et <strong>vert-jaune</strong> sont réservés. Mondialement.",
    "<strong>Le PE ne porte jamais d’appareil de coupure.</strong>",
    "<strong>La couleur ne suffit pas</strong> sur une installation ancienne : on mesure."
  ],

  objectifs: '<p><strong>Objectif.</strong> Identifier les trois conducteurs, connaître leur rôle, et savoir les distinguer à la mesure quand les couleurs ne sont pas fiables.</p><p><strong>Limite.</strong> Les schémas de liaison à la terre — TT, TN, IT — relèvent d’un cours d’habilitation.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.8 La terre et la liaison équipotentielle" },
    { ligne: 4, couleur: '#c0392b', texte: "4.5 L’interrupteur différentiel" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.2 La tension" } ]
});
