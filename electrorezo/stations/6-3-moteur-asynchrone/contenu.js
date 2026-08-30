/* ÉlectroRézo 6.3 — Le moteur asynchrone triphasé. */

ModeleAppareil.construire({
  id: '6.3', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station 3',
  titre: "Le moteur asynchrone triphasé",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/moteur-en-coupe-numerotee.jpeg',
      alt: "Photographie d’un moteur asynchrone en coupe, avec ses cinq éléments numérotés : stator, rotor à cage d’écureuil, boîte à bornes, arbre, ventilateur ; à côté, le détail de la cage avec ses barres et ses anneaux.",
      titre: "Ouvert, numéroté.", sous: "Cinq pièces, et la cage d’écureuil en détail." },
    { src: 'assets/biblio/stator-et-rotor-a-cage.png',
      alt: "Schéma en coupe d’un moteur asynchrone détaillant le stator et le rotor à cage.",
      titre: "Le stator et le rotor.", sous: "L’un porte les bobinages, l’autre ne porte rien." },
    { src: 'assets/biblio/coupe-detaillee.png',
      alt: "Coupe détaillée d’un moteur électrique avec ses roulements, son arbre et son ventilateur.",
      titre: "Le reste.", sous: "Roulements, arbre, ventilateur : la mécanique." }
  ],

  aQuoiCaSert: "À faire tourner. C’est le moteur de l’atelier, celui qu’on trouve sur les pompes, les compresseurs, les ventilateurs, les convoyeurs. Robuste, bon marché, et il démarre tout seul.",
  ouOnLeTrouve: "Partout. C’est de très loin le moteur le plus répandu dans l’industrie, et c’est celui que vous dépannerez le plus souvent.",

  scene: () => SchemasMachines.rotorEtGlissement(),

  technologie: [
    ["Le stator", "la partie fixe. Il porte les trois bobinages disposés à 120 degrés, ceux qui créent le champ tournant de la station 2.6."],
    ["Le rotor à cage", "la partie mobile. Et voici sa particularité : <strong>il n’est relié à rien</strong>. Ni fil, ni balai, ni bague. Juste des barres de métal reliées par deux anneaux, comme une cage d’écureuil."],
    ["Le glissement", "le rotor tourne toujours un peu moins vite que le champ. Cet écart n’est pas un défaut : sans lui, le rotor ne verrait plus le champ varier, et il ne produirait aucun couple."],
    ["La mécanique", "deux roulements, un arbre, un ventilateur en bout d’arbre. C’est presque toujours là que ça lâche — les roulements avant le bobinage."]
  ],

  variantes: [
    "<strong>Le nombre de pôles</strong> — deux pôles pour 3000 tr/min, quatre pour 1500, six pour 1000. Il est décidé à la fabrication et ne se change pas.",
    "<strong>Le rotor bobiné</strong> — au lieu d’une cage, un vrai bobinage sorti sur des bagues. On peut y insérer des résistances au démarrage. Ancien, mais on en rencontre encore.",
    "<strong>Le moteur à deux vitesses</strong> — dit Dahlander, avec un bobinage qu’on recouple pour changer le nombre de pôles. Deux vitesses, dans un rapport de un à deux.",
    "<strong>Le moteur frein</strong> — un électro-aimant serre un disque à l’arrêt. Il faut alimenter la bobine pour desserrer : ainsi, une coupure de courant freine la machine."
  ],

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'Les trois questions, pour le moteur de l’atelier.',
  aptitudes: {
    mouvement: true, tension: false, alternatif: true,
    bonneReponse: 'Exact. Il produit du mouvement, il ne change aucune tension, et il lui faut absolument l’alternatif triphasé — sans lui, pas de champ tournant, et rien ne démarre.',
    erreurs: {
      mouvement: 'C’est son unique métier, et il le fait bien.',
      tension: 'Il consomme, il ne transforme pas. Il n’a pas de sortie électrique.',
      alternatif: 'Sans les trois courants décalés, pas de champ tournant. Alimenté en continu, il ne fait que chauffer.'
    }
  },

  cablage: [
    "Trois fils sur la plaque à bornes, plus la <strong>terre</strong>. Le couplage se pose avec les barrettes — c’est toute la station 6.4.",
    "En amont : un <strong>sectionnement</strong>, une <strong>protection contre le court-circuit</strong>, une <strong>protection contre la surcharge</strong>, et un <strong>contacteur</strong>. Vous savez maintenant lire tout cela.",
    "Le <strong>réglage du thermique</strong> se fait sur l’intensité de la plaque, correspondant au couplage retenu.",
    "Le <strong>sens de rotation</strong> se vérifie avant le premier démarrage. On échange deux phases s’il faut l’inverser."
  ],
  piege: "Au démarrage, un moteur asynchrone appelle <strong>cinq à huit fois</strong> son intensité nominale, pendant quelques secondes. Ce n’est pas un défaut : c’est ce qui oblige à choisir un fusible aM plutôt qu’un gG, et une courbe D plutôt qu’une courbe C.",

  symboles: [
    { src: 'assets/moteur_tri.svg', alt: "Symbole normalisé d’un moteur triphasé : un rond marqué M, avec ses bornes U1, V1, W1.", legende: "Moteur triphasé" },
    { src: 'assets/induction_motor_6_terminals.svg', alt: "Symbole normalisé d’un moteur asynchrone à six bornes.", legende: "Six bornes" }
  ],
  lecturePlan: [
    "Le symbole est le <strong>rond marqué M</strong> que vous avez appris à la station 8.8, avec <strong>trois traits</strong> qui arrivent.",
    "À côté, le signe <em>3 ~</em> confirme le triphasé, et les repères des bornes sont écrits : <strong>U1, V1, W1</strong>.",
    "Sur un plan complet, il est <strong>tout en bas</strong> du schéma de puissance. C’est le terminus : tout converge vers lui.",
    "Un symbole à <strong>six bornes</strong> annonce que la plaque à bornes est accessible et que le couplage est à faire. C’est le cas général en atelier."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "À quoi le rotor à cage est-il relié électriquement ?",
      confirmation: "À rien. Ni fil, ni balai, ni bague — c’est ce qui le rend indestructible.",
      reponses: [
        { texte: "À rien du tout.", juste: true },
        { texte: "Aux trois phases, par des bagues.", pourquoi: "C’est le rotor bobiné, une autre construction, plus ancienne." },
        { texte: "À la terre.", pourquoi: "C’est la carcasse qui est reliée à la terre, pas le rotor." },
        { texte: "Au neutre.", pourquoi: "Le rotor n’a aucune connexion vers l’extérieur." } ] },

    { question: "Pourquoi le glissement est-il nécessaire ?",
      confirmation: "Sans écart de vitesse, le rotor ne verrait plus le champ varier.",
      reponses: [
        { texte: "Pour limiter l’intensité.", pourquoi: "L’intensité augmente au contraire avec le glissement." },
        { texte: "Sans lui, le rotor ne verrait plus le champ varier.", juste: true },
        { texte: "Il n’est pas nécessaire : c’est un défaut.", pourquoi: "C’est au contraire la condition du fonctionnement." },
        { texte: "Pour refroidir le rotor.", pourquoi: "Le refroidissement vient du ventilateur en bout d’arbre." } ] },

    { question: "Un moteur asynchrone appelle combien au démarrage ?",
      confirmation: "Cinq à huit fois son intensité nominale, pendant quelques secondes.",
      reponses: [
        { texte: "La même chose qu’en marche.", pourquoi: "La pointe de démarrage est très supérieure." },
        { texte: "Deux fois environ.", pourquoi: "C’est bien davantage : cinq à huit fois." },
        { texte: "Cinq à huit fois.", juste: true },
        { texte: "Cinquante fois.", pourquoi: "Ce serait l’ordre de grandeur d’un court-circuit." } ] },

    { question: "Sur un moteur, qu’est-ce qui lâche le plus souvent ?",
      confirmation: "Les roulements, bien avant le bobinage.",
      reponses: [
        { texte: "La boîte à bornes.", pourquoi: "Elle ne subit aucune contrainte mécanique." },
        { texte: "Le bobinage du stator.", pourquoi: "Il dure très longtemps s’il n’a pas surchauffé." },
        { texte: "Le rotor à cage.", pourquoi: "Une cage massive ne s’use pratiquement pas." },
        { texte: "Les roulements.", juste: true } ] }
  ],

  retenir: [
    "<strong>Le rotor n’est relié à rien.</strong> C’est ce qui le rend indestructible.",
    "<strong>Le glissement est nécessaire</strong>, pas subi.",
    "<strong>Cinq à huit fois</strong> l’intensité au démarrage.",
    "<strong>Ce sont les roulements</strong> qui lâchent, presque toujours."
  ],

  objectifs: '<p><strong>Objectif.</strong> Nommer les pièces d’un moteur asynchrone, comprendre le rôle du glissement, et connaître ce qu’il appelle au démarrage.</p><p><strong>Limite.</strong> Les courbes de couple et les démarrages à tension réduite ne sont pas traités.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.6 Le champ tournant" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" },
    { ligne: 4, couleur: '#c0392b', texte: "4.4 Le disjoncteur moteur" } ]
});
