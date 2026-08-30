/* ÉlectroRézo 6.5 — Le moteur asynchrone monophasé et son condensateur. */

ModeleAppareil.construire({
  id: '6.5', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station 5',
  titre: "Le moteur monophasé",
  narration: NARRATION,

  prerequis: [
    { id: '6.3', quoi: "le moteur asynchrone" },
  ],

  photos: [
    { src: 'assets/biblio/condensateur-de-demarrage.png',
      alt: "Schéma d’un moteur asynchrone monophasé avec son condensateur permanent et son condensateur de démarrage.",
      titre: "Un ou deux condensateurs.", sous: "Le permanent reste, celui de démarrage se retire." },
    { src: 'assets/biblio/klixon-et-condensateurs.png',
      alt: "Schéma de câblage d’un compresseur monophasé : le klixon en série sur le commun, le relais de démarrage, et le condensateur Cd marqué « non » du côté de l’auxiliaire, « oui » du côté du principal.",
      titre: "Sur un compresseur.", sous: "Le klixon coupe si ça chauffe. Et le Cd se pose d’un côté seulement : le schéma dit lequel." }
  ],

  aQuoiCaSert: "À faire tourner quelque chose là où il n’y a pas de triphasé. Une maison, un petit atelier, un compresseur de réfrigérateur. Et pour cela, il faut lui fabriquer artificiellement le décalage que le triphasé donne gratuitement.",
  ouOnLeTrouve: "Dans tout le petit électroménager qui tourne, dans les compresseurs de froid domestique et commercial, dans les pompes de relevage, dans les ventilateurs de maison.",

  scene: () => SchemasMachines.pourquoiUnCondensateur(),

  technologie: [
    ["L’enroulement principal", "seul, il crée un champ qui <strong>pulse</strong> le long d’un axe : il grandit, s’annule, repart en sens inverse. Il ne tourne pas."],
    ["L’enroulement auxiliaire", "décalé de 90 degrés dans le stator. Il ne suffit pas à lui seul : il faut aussi que son <strong>courant</strong> soit décalé dans le temps."],
    ["Le condensateur", "c’est lui qui fait ce décalage. Il met le courant de l’auxiliaire en avance sur celui du principal. Deux enroulements décalés dans l’espace, deux courants décalés dans le temps : le champ tourne."],
    ["Le contact centrifuge", "sur beaucoup de modèles, il déconnecte le condensateur de démarrage une fois le moteur lancé. Un déclic à l’arrêt, c’est lui qui revient en place."]
  ],

  variantes: [
    "<strong>Condensateur permanent</strong> — il reste en service. Simple, silencieux, mais le couple de démarrage est modeste.",
    "<strong>Condensateur de démarrage</strong> — de forte valeur, déconnecté dès le lancement. Couple important, mais il ne supporte pas d’être maintenu.",
    "<strong>Les deux</strong> — un permanent, plus un de démarrage. C’est le montage des compresseurs qui doivent partir en charge.",
    "<strong>À bague de déphasage</strong> — sans condensateur : une spire en court-circuit sur un coin du pôle suffit à décaler un peu. Couple très faible, mais indestructible. C’est le moteur des petits ventilateurs."
  ],
  reglage: "Rien ne se règle. Mais un condensateur se <strong>choisit</strong> : sa capacité en microfarads et sa tension d’emploi sont écrites dessus. Monter une capacité plus forte ne donne pas plus de couple : cela déséquilibre le déphasage, et le moteur chauffe.",

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'Les trois questions, pour le moteur des maisons.',
  aptitudes: {
    mouvement: true, tension: false, alternatif: true,
    bonneReponse: 'Exact — les mêmes réponses que son grand frère triphasé. La différence n’est pas dans ce qu’il fait : elle est dans ce qu’il lui faut pour démarrer.',
    erreurs: {
      mouvement: 'C’est son métier, comme tout moteur.',
      tension: 'Il consomme. Il ne transforme rien.',
      alternatif: 'Le condensateur ne peut décaler un courant que si celui-ci varie. En continu, rien de tout cela ne fonctionne.'
    }
  },

  cablage: [
    "Les repères courants sont <strong>U1-U2</strong> pour le principal et <strong>Z1-Z2</strong> pour l’auxiliaire. La notice du constructeur fait foi.",
    "Pour <strong>inverser le sens</strong>, on inverse les bornes de <strong>l’enroulement auxiliaire</strong> — pas celles de l’alimentation. C’est le contraire du triphasé, et c’est une source d’erreur classique.",
    "Le condensateur se raccorde <strong>en série avec l’auxiliaire</strong>, jamais en parallèle sur l’alimentation.",
    "Un condensateur reste <strong>chargé</strong> après la coupure. On le décharge avant d’y toucher, avec une résistance et non par un court-circuit brutal."
  ],
  piege: "Un moteur monophasé qui <strong>ronfle sans démarrer</strong>, et qui part si on le lance à la main dans le sens où on l’a lancé : c’est le condensateur. Ce symptôme est si caractéristique qu’il vaut diagnostic — allez le vérifier avant toute autre chose.",

  symboles: [
    { src: 'assets/moteur_mono.svg', alt: "Symbole normalisé d’un moteur monophasé.", legende: "Moteur monophasé" },
    { src: 'assets/motor-mono-cond.svg', alt: "Symbole normalisé d’un moteur monophasé avec son condensateur.", legende: "Avec condensateur" }
  ],
  lecturePlan: [
    "Le symbole est le même <strong>rond marqué M</strong>, mais avec <strong>deux traits</strong> qui arrivent au lieu de trois, et le signe <em>1 ~</em>.",
    "Le <strong>condensateur</strong> se dessine par <strong>deux traits parallèles</strong>, courts et épais, sans se toucher. Il est en série avec l’enroulement auxiliaire.",
    "Un moteur avec deux condensateurs porte les deux symboles, et souvent un <strong>contact centrifuge</strong> en série avec celui de démarrage.",
    "Le repère du condensateur commence par <strong>C</strong>. Sa capacité, en microfarads, est écrite à côté — jamais dans le dessin."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "Pourquoi un enroulement seul ne fait-il pas démarrer un moteur ?",
      confirmation: "Son champ pulse sur un axe : rien n’indique de quel côté partir.",
      reponses: [
        { texte: "Parce qu’il n’est pas assez puissant.", pourquoi: "La puissance n’est pas en cause : le champ existe bel et bien." },
        { texte: "Parce qu’il chauffe trop vite.", pourquoi: "L’échauffement est une conséquence du blocage, pas sa cause." },
        { texte: "Parce que son champ pulse au lieu de tourner.", juste: true },
        { texte: "Parce que le rotor est trop lourd.", pourquoi: "Un rotor plus léger ne démarrerait pas davantage." } ] },

    { question: "Que fait le condensateur dans un moteur monophasé ?",
      confirmation: "Il décale le courant de l’enroulement auxiliaire.",
      reponses: [
        { texte: "Il stocke l’énergie du démarrage.", pourquoi: "Il en stocke un peu, mais ce n’est pas sa fonction ici." },
        { texte: "Il protège le moteur.", pourquoi: "La protection est assurée par le thermique, pas par lui." },
        { texte: "Il augmente la tension.", pourquoi: "Il ne transforme aucune tension." },
        { texte: "Il décale le courant de l’enroulement auxiliaire.", juste: true } ] },

    { question: "Comment inverse-t-on le sens d’un moteur monophasé ?",
      confirmation: "En inversant les bornes de l’enroulement auxiliaire.",
      reponses: [
        { texte: "En inversant les bornes de l’auxiliaire.", juste: true },
        { texte: "En changeant le condensateur.", pourquoi: "La capacité n’a aucun effet sur le sens." },
        { texte: "En inversant la phase et le neutre.", pourquoi: "En alternatif, cela ne change rien au sens." },
        { texte: "En échangeant deux phases.", pourquoi: "Il n’y a qu’une phase : c’est justement toute la difficulté." } ] },

    { question: "Un moteur ronfle, ne démarre pas, mais part si on le lance à la main. Que soupçonner ?",
      confirmation: "Le condensateur. Le symptôme est caractéristique.",
      reponses: [
        { texte: "Un roulement grippé.", pourquoi: "Un roulement grippé empêcherait aussi le lancement à la main." },
        { texte: "Le condensateur.", juste: true },
        { texte: "Une phase manquante.", pourquoi: "Un monophasé n’a qu’une phase, et il ne ronflerait pas sans elle." },
        { texte: "Le relais thermique.", pourquoi: "Un thermique déclenché couperait tout : le moteur ne ronflerait pas." } ] }
  ],

  retenir: [
    "<strong>Un seul enroulement pulse</strong>, il ne tourne pas.",
    "<strong>Le condensateur décale</strong> le courant de l’auxiliaire.",
    "<strong>On inverse par l’auxiliaire</strong>, pas par l’alimentation.",
    "<strong>Ronfle et part à la main</strong> : c’est le condensateur."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi un moteur monophasé ne démarre pas seul, ce que fait le condensateur, et diagnostiquer la panne la plus fréquente.</p><p><strong>Limite.</strong> Le calcul de la capacité et l’analyse du champ elliptique ne sont pas traités.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.6 Le champ tournant" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.2 Le réseau monophasé" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone triphasé" } ]
});
