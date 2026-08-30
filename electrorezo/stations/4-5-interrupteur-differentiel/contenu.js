/* ÉlectroRézo 4.5 — L’interrupteur différentiel. */

ModeleAppareil.construire({
  id: '4.5', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 5',
  titre: "L’interrupteur différentiel",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/le-differentiel-dans-le-tableau.png',
      alt: "Un interrupteur différentiel 40 A, 30 milliampères de type AC, photographié à côté de son symbole : deux contacts repérés « interrupteur » et, en dessous, le tore repéré « déclencheur différentiel ».",
      titre: "L’appareil et son symbole.", sous: "Deux contacts, un tore — et rien d’autre. Le bouton bleu, c’est le test." },
    { src: 'assets/biblio/tableau-residentiel-avec-differentiel.png',
      alt: "Schéma d’un tableau résidentiel : le disjoncteur d’abonné, puis l’interrupteur différentiel 40 A / 30 mA en tête de rangée, et derrière lui les disjoncteurs divisionnaires alimentés par les peignes.",
      titre: "En tête de rangée.", sous: "Il protège tous les circuits qui sont derrière lui — et eux seuls." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Protéger les <strong>personnes</strong>. Il compare le courant qui part et celui qui revient : s’il en manque, c’est qu’il s’échappe quelque part — et il coupe.",
  ouOnLeTrouve: "En tête d’une rangée de tableau. Il ne protège aucun circuit contre la surintensité : il n’est là que pour les fuites.",

  scene: () => SchemasProtection.toreDifferentiel(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["Le tore", "un anneau de fer que traversent la phase et le neutre. Tant que tout ce qui part revient, il ne se passe rien."],
    ["La différence", "si une partie du courant s’échappe par la terre, il en manque au retour. Le tore mesure cette différence."],
    ["La sensibilité", "<strong>30 milliampères</strong> pour la protection des personnes. C’est très peu — et c’est en dessous du seuil dangereux pour un corps."],
    ["Le bouton de test", "il crée volontairement un petit défaut. <strong>Il se presse deux fois par an</strong> : un différentiel qui ne coupe plus ne prévient pas."]
  ],

  variantes: [
    "<strong>Type AC</strong> — ne voit que les fuites alternatives pures. De moins en moins suffisant.",
    "<strong>Type A</strong> — voit aussi les fuites à composante continue. Le minimum pour lave-linge, plaques, bornes de recharge.",
    "<strong>Type F</strong> — pour les circuits à variateur ou à découpage.",
    "<strong>Type B</strong> — voit les fuites en continu pur. <strong>Obligatoire derrière certains variateurs de fréquence</strong> — station 7.4.",
    "<strong>Sensibilités</strong> : 30 mA pour les personnes, 300 mA ou plus pour l’incendie ou la sélectivité."
  ],

  aptitudes: {
    surcharge: false, courtCircuit: false, defautIsolement: true,
    bonneReponse: "Le défaut d’isolement, et lui seul. C’est un <em>interrupteur</em> différentiel : il ne contient aucune protection contre les surintensités. Il faut donc toujours des disjoncteurs derrière lui.",
    erreurs: {
      surcharge: "⚠️ Il ne voit PAS la surcharge. Le mot « interrupteur » dans son nom le dit : il n’y a pas de bilame dedans.",
      courtCircuit: "⚠️ Il ne voit PAS le court-circuit. Aucune bobine de déclenchement magnétique non plus.",
      defautIsolement: "Il voit le défaut d’isolement : c’est son unique métier, et il le fait très bien."
    }
  },

  cablage: [
    "<strong>En tête de rangée</strong>, avant les disjoncteurs qu’il abrite.",
    "<strong>Phase et neutre passent tous les deux</strong> dans l’appareil — sinon il déclenche en permanence.",
    "Le neutre de chaque circuit doit rester <strong>rattaché à son différentiel</strong> : jamais mélangé avec celui d’une autre rangée.",
    "Le conducteur de protection, lui, ne le traverse jamais."
  ],
  piege: "Croire qu’un différentiel remplace un disjoncteur. Il n’y a rien dedans contre la surintensité : un court-circuit derrière un interrupteur différentiel seul n’est arrêté par personne.",

  symboles: [
    { src: 'assets/ddr2.svg', alt: "Symbole normalisé d’un interrupteur différentiel.", legende: "Interrupteur différentiel" },
    { src: 'assets/ddr4.svg', alt: "Symbole normalisé d’un dispositif différentiel résiduel.", legende: "Autre représentation" }
  ],
  lecturePlan: [
    "Le symbole montre le <strong>tore</strong> traversé par les conducteurs : un cercle, ou un rectangle avec une flèche.",
    "<strong>Pas de crochet, pas de demi-cercle</strong> : et c’est bien pour ça qu’il ne protège contre aucune surintensité.",
    "La <strong>sensibilité et le type</strong> sont écrits à côté : 30 mA, type A."
  ],

  quiz: [
    { question: "Que compare un différentiel ?",
      confirmation: "Ce qui part par la phase et ce qui revient par le neutre.",
      reponses: [
        { texte: "Le courant qui part et le courant qui revient.", juste: true },
        { texte: "La température du câble.", pourquoi: "Aucun capteur de température : ce serait un thermique." },
        { texte: "La tension entre phase et neutre.", pourquoi: "Il ne mesure aucune tension : il compare des courants." },
        { texte: "La résistance de la prise de terre.", pourquoi: "Elle se mesure avec un appareil dédié, pas par le différentiel." } ] },

    { question: "Que veut dire « 30 mA » sur un différentiel ?",
      confirmation: "La différence à partir de laquelle il coupe.",
      reponses: [
        { texte: "Le courant maximal du circuit.", pourquoi: "Ce serait un calibre : le différentiel n’en a pas dans ce sens." },
        { texte: "La différence détectée à partir de laquelle il coupe.", juste: true },
        { texte: "La consommation de l’appareil.", pourquoi: "Sa propre consommation est négligeable et n’est jamais écrite ainsi." },
        { texte: "Le temps de coupure.", pourquoi: "Le temps s’exprime en millisecondes, pas en milliampères." } ] },

    { question: "Un interrupteur différentiel protège-t-il contre un court-circuit ?",
      confirmation: "Il n’y a ni bilame ni bobine de déclenchement dedans.",
      reponses: [
        { texte: "Oui, en type B.", pourquoi: "Le type décrit la forme du courant de fuite détecté, pas la protection contre les surintensités." },
        { texte: "Oui, s’il est en 30 mA.", pourquoi: "La sensibilité concerne les fuites, pas les surintensités." },
        { texte: "Non : il faut des disjoncteurs derrière lui.", juste: true },
        { texte: "Oui, il coupe tout.", pourquoi: "Il ne coupe que sur une différence de courant, pas sur une surintensité." } ] },

    { question: "À quoi sert le bouton de test ?",
      confirmation: "Il crée un vrai défaut, pour vérifier que l’appareil coupe encore.",
      reponses: [
        { texte: "À réarmer après un déclenchement.", pourquoi: "Le réarmement se fait par la manette." },
        { texte: "À couper le courant pour intervenir.", pourquoi: "Pour cela on utilise la manette, ou le sectionnement en amont." },
        { texte: "À régler la sensibilité.", pourquoi: "La sensibilité est fixe, déterminée à la fabrication." },
        { texte: "À vérifier que l’appareil coupe encore — deux fois par an.", juste: true } ] }
  ],

  retenir: [
    "<strong>Il protège les personnes</strong>, pas les circuits.",
    "Il compare l’aller et le retour : <strong>30 mA de différence suffisent</strong>.",
    "<strong>Aucune protection contre les surintensités</strong> : disjoncteurs obligatoires derrière.",
    "<strong>Le bouton de test se presse deux fois par an.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre le principe du tore différentiel, ce que veut dire 30 mA, et pourquoi cet appareil ne remplace jamais un disjoncteur.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.6 Le disjoncteur différentiel" },
    { ligne: 4, couleur: '#c0392b', texte: "4.8 La terre" },
    { ligne: 7, couleur: '#0f766e', texte: "7.4 Le variateur de fréquence" } ]
});
