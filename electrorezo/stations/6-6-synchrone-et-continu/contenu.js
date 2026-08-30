/* ÉlectroRézo 6.6 — Découverte : moteur synchrone et moteur à courant continu. */

ModeleAppareil.construire({
  id: '6.6', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station 6',
  titre: "Synchrone et courant continu",
  narration: NARRATION,

  photos: [
    { src: 'assets/collecteur-et-balais.svg',
      alt: "Coupe d’un moteur à courant continu : deux aimants fixes marqués N et S dans le stator, un bobinage sur le rotor, et sous l’arbre un collecteur fendu en deux segments sur lesquels frottent deux balais reliés au plus et au moins.",
      titre: "Le moteur à courant continu.", sous: "Deux aimants fixes, deux balais, un anneau fendu. Pas de champ tournant du tout." },
    { src: 'assets/biblio/polarites-qui-s-inversent.jpeg',
      alt: "Deux vues d’un même moteur alternatif dont les polarités N et S du stator sont inversées de l’une à l’autre : toutes les centièmes de seconde elles s’inversent, et le rotor effectue un demi-tour.",
      titre: "Le synchrone, lui, suit l’alternance.", sous: "Les polarités s’inversent cent fois par seconde, et le rotor reste accroché." }
  ],
  creditPhoto: 'La coupe du moteur à courant continu est dessinée pour cette station : la base d’images n’en contient aucun. Détail dans « Crédits ».',

  aQuoiCaSert: "À situer l’asynchrone parmi les autres. Il existe deux autres grandes familles de moteurs, et connaître leurs qualités permet de comprendre pourquoi l’asynchrone a fini par gagner presque partout.",
  ouOnLeTrouve: "Le synchrone dans les alternateurs, les gros entraînements précis, les moteurs de vélo électrique. Le courant continu dans les outils portatifs, les jouets, les essuie-glaces, les démarreurs de voiture.",

  scene: () => SchemasMachines.troisFamilles(),

  technologie: [
    ["Le moteur synchrone", "son rotor n’est pas une cage : il porte un aimant, ou un bobinage alimenté. Il s’accroche au champ tournant et le suit <strong>exactement</strong>, sans glissement."],
    ["Son défaut", "il ne démarre pas seul. Lancé à l’arrêt, le champ tourne trop vite pour lui et il reste sur place. Il faut un dispositif de lancement, ou un variateur."],
    ["Le moteur à courant continu", "pas de champ tournant du tout. Un aimant fixe, un bobinage sur le rotor, et deux <strong>balais</strong> qui amènent le courant par un <strong>collecteur</strong>."],
    ["Le collecteur", "un anneau fendu qui inverse le courant du rotor à chaque demi-tour. Sans lui, le rotor ferait un demi-tour et s’arrêterait. C’est une pièce ingénieuse — et c’est celle qui s’use."]
  ],

  variantes: [
    "<strong>Le moteur pas-à-pas</strong> — un synchrone commandé impulsion par impulsion. On lui demande un nombre de pas, et il les fait. C’est la précision des machines-outils.",
    "<strong>Le brushless</strong> — un synchrone à aimants dont l’électronique fabrique le champ tournant. Toutes les qualités du continu, sans les balais. Il gagne du terrain partout.",
    "<strong>Le moteur universel</strong> — un moteur à collecteur qui fonctionne aussi bien en continu qu’en alternatif. C’est celui des perceuses et des aspirateurs : très rapide, bruyant, et il s’use.",
    "<strong>L’alternateur</strong> — un synchrone qu’on entraîne au lieu de l’alimenter. C’est lui qui produit toute l’électricité du réseau."
  ],

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'C’est le moteur à COURANT CONTINU qu’on juge ici. Cochez, puis validez.',
  aptitudes: {
    mouvement: true, tension: false, alternatif: false,
    bonneReponse: 'Exact — et il est le seul moteur de la ligne à répondre non à la troisième. Il n’a pas besoin de champ tournant, donc pas besoin d’alternatif : son collecteur fabrique lui-même l’inversion, mécaniquement.',
    erreurs: {
      mouvement: 'C’est son métier.',
      tension: 'Il consomme, il ne transforme pas.',
      alternatif: 'C’est justement ce qui le distingue de tous les autres : il fonctionne en continu, et son collecteur remplace le champ tournant.'
    }
  },

  cablage: [
    "Un moteur à courant continu est <strong>polarisé</strong> : inverser le plus et le moins inverse le sens de rotation. C’est même la façon la plus simple de l’inverser.",
    "Un moteur <strong>synchrone</strong> se raccorde comme un triphasé, mais il lui faut presque toujours un <strong>variateur</strong> pour démarrer.",
    "Les <strong>balais</strong> s’usent et se remplacent. C’est un entretien courant, prévu par le constructeur, avec des trappes d’accès.",
    "Un moteur à collecteur <strong>fait des étincelles</strong> : il est interdit en atmosphère explosible, et c’est une contrainte sérieuse en froid industriel."
  ],
  piege: "Ne confondez pas <em>synchrone</em> et <em>asynchrone</em> sur une plaque. Un moteur annoncé à 1500 tr/min exactement est un synchrone ; à 1435 tr/min, c’est un asynchrone. Le nombre rond est un indice fiable.",

  symboles: [
    { src: 'assets/moteur_dc.svg', alt: "Symbole normalisé d’un moteur à courant continu : un rond marqué M, avec les traits du collecteur.", legende: "Courant continu" },
    { src: 'assets/moteur_serie_dc.svg', alt: "Symbole normalisé d’un moteur à courant continu à excitation série.", legende: "Excitation série" },
    { src: 'assets/moteur_tri.svg', alt: "Symbole normalisé d’un moteur triphasé, pour comparaison.", legende: "Triphasé, pour comparer" }
  ],
  lecturePlan: [
    "Le moteur à courant continu porte le même <strong>rond marqué M</strong>, mais avec <strong>deux petits traits</strong> de chaque côté : ce sont les balais.",
    "Cherchez ces deux traits : ils sont la signature d’un moteur à collecteur, et ils annoncent un entretien.",
    "Le <strong>nombre de traits qui arrivent</strong> reste l’indice le plus rapide : deux pour un continu ou un monophasé, trois pour un triphasé.",
    "Et le signe à côté tranche : <em>⎓</em> pour le continu, <em>1 ~</em> pour le monophasé, <em>3 ~</em> pour le triphasé."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "Qu’est-ce qui distingue un moteur synchrone d’un asynchrone ?",
      confirmation: "Le synchrone suit exactement le champ : pas de glissement.",
      reponses: [
        { texte: "Il tourne plus vite.", pourquoi: "Il tourne à la vitesse du champ, ni plus ni moins." },
        { texte: "Il n’a pas de rotor.", pourquoi: "Il en a un, et son rotor est même plus élaboré." },
        { texte: "Il fonctionne en continu.", pourquoi: "Il lui faut un champ tournant, donc de l’alternatif." },
        { texte: "Il suit exactement le champ, sans glissement.", juste: true } ] },

    { question: "À quoi sert le collecteur d’un moteur à courant continu ?",
      confirmation: "À inverser le courant du rotor à chaque demi-tour.",
      reponses: [
        { texte: "À inverser le courant du rotor à chaque demi-tour.", juste: true },
        { texte: "À mesurer la vitesse.", pourquoi: "C’est le rôle d’une dynamo tachymétrique ou d’un codeur." },
        { texte: "À refroidir le rotor.", pourquoi: "Le refroidissement est assuré par un ventilateur." },
        { texte: "À limiter l’intensité au démarrage.", pourquoi: "Ce serait le rôle d’une résistance de démarrage." } ] },

    { question: "Comment inverse-t-on le sens d’un moteur à courant continu ?",
      confirmation: "En inversant le plus et le moins.",
      reponses: [
        { texte: "En échangeant deux phases.", pourquoi: "Il n’a pas de phases : il est alimenté en continu." },
        { texte: "En inversant le plus et le moins.", juste: true },
        { texte: "En changeant les balais.", pourquoi: "Les balais se remplacent, ils ne s’échangent pas de côté." },
        { texte: "En inversant l’enroulement auxiliaire.", pourquoi: "C’est le cas du monophasé, qui a un auxiliaire." } ] },

    { question: "Pourquoi un moteur à collecteur est-il interdit en atmosphère explosible ?",
      confirmation: "Parce que les balais font des étincelles.",
      reponses: [
        { texte: "Parce qu’il chauffe trop.", pourquoi: "L’échauffement compte aussi, mais ce n’est pas ce qui l’interdit." },
        { texte: "Parce qu’il est trop bruyant.", pourquoi: "Le bruit n’a rien à voir avec le risque d’explosion." },
        { texte: "Parce que les balais font des étincelles.", juste: true },
        { texte: "Parce qu’il consomme trop.", pourquoi: "La consommation n’entre pas en compte." } ] }
  ],

  retenir: [
    "<strong>Synchrone</strong> : il suit exactement. Mais il ne démarre pas seul.",
    "<strong>Courant continu</strong> : pas de champ tournant. Un collecteur, des balais.",
    "<strong>Les balais s’usent</strong>, et ils font des étincelles.",
    "<strong>1500 pile</strong> = synchrone. <strong>1435</strong> = asynchrone."
  ],

  objectifs: '<p><strong>Objectif.</strong> Situer les trois familles de moteurs, comprendre le rôle du collecteur, et savoir reconnaître chaque famille sur une plaque et sur un plan.</p><p><strong>Limite.</strong> Station de découverte : les modes d’excitation et la commande des brushless ne sont pas traités.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone triphasé" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.5 Continu et alternatif" },
    { ligne: 7, couleur: '#0b7285', texte: "7.4 Le variateur de fréquence" } ]
});
