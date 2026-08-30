/* ÉlectroRézo 5.4 — Le relais électromécanique. */

ModeleAppareil.construire({
  id: '5.4', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 4',
  titre: "Le relais électromécanique",
  narration: NARRATION,

  prerequis: [
    { id: '5.2', quoi: "le contacteur" },
  ],

  photos: [
    { src: 'assets/relais-et-son-embase.svg',
      alt: "Coupe d’un relais enfichable : bobine, circuit magnétique, armature attirée, ressort de rappel et contacts fins ; en dessous, l’embase à broches sur laquelle il se pose.",
      titre: "Ouvert, pièce par pièce.", sous: "La mécanique du contacteur, en plus petit." },
    { src: 'assets/telerupteur-bascule.svg',
      alt: "Le relais bistable : une première impulsion le fait basculer et il y reste ; l’impulsion suivante le ramène.",
      titre: "L’exception.", sous: "Le bistable garde sa position sans être alimenté." }
  ],
  creditPhoto: 'Les deux coupes sont dessinées pour cette station : la base d’images inerWeb ne contient que des relais thermiques, qui sont un autre appareil.',

  aQuoiCaSert: "À faire commander un circuit par un autre, quand il n’y a pas de puissance en jeu. Multiplier des contacts, séparer deux tensions, adapter un signal d’automate à une bobine de contacteur.",
  ouOnLeTrouve: "Dans les armoires, sur rail, souvent sur une embase à broches ; dans les régulations, les alarmes, les cartes électroniques de machines frigorifiques.",

  scene: () => SchemasCommande.relaisEtContacteur(),

  technologie: [
    ["Exactement la même mécanique", "une bobine, un circuit magnétique, une armature, un ressort. Rien de nouveau depuis la station 5.2."],
    ["Des contacts fins", "quelques ampères, sans boîtier d’arc. C’est la seule vraie différence — mais elle décide de tout."],
    ["L’embase", "beaucoup de relais s’enfichent sur un support à broches. On remplace le relais sans défaire un seul fil."],
    ["Le voyant et le bouton d’essai", "sur les modèles industriels, une diode dit si la bobine est alimentée, et un petit levier permet de forcer le relais à la main pour un dépannage."]
  ],

  variantes: [
    "<strong>Le relais simple</strong> — une bobine, un ou plusieurs contacts inverseurs. Le cas général.",
    "<strong>Le relais bistable, ou télérupteur</strong> — une impulsion le fait basculer, il y reste. L’impulsion suivante le fait revenir. Il <strong>garde</strong> sa position, contrairement à tous les autres.",
    "<strong>Le relais statique</strong> — pas de pièce mobile du tout : un composant électronique fait le travail. Silencieux, très rapide, mais il chauffe et il ne coupe jamais complètement.",
    "<strong>Le relais de sécurité</strong> — plusieurs contacts contrôlés l’un par l’autre, pour qu’une pastille soudée soit détectée. On le trouve derrière les arrêts d’urgence."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Le relais ordinaire, pas le bistable. Cochez, puis validez.',
  aptitudes: {
    puissance: false, distance: true, maintien: false,
    bonneReponse: 'Exact. Le relais est un contacteur en petit : il obéit à distance, mais il ne porte pas la puissance. Une seule exception dans la famille — le relais bistable, qui lui garde sa position.',
    erreurs: {
      puissance: 'Ses contacts sont fins et sans boîtier d’arc. Il commande, il ne porte pas.',
      distance: 'C’est le principe même : une bobine, et les contacts obéissent.',
      maintien: 'Un relais ordinaire retombe dès qu’on coupe sa bobine. Seul le relais bistable garde sa position — et c’est justement ce qui le distingue.'
    }
  },

  cablage: [
    "La bobine se raccorde sur deux bornes repérées <strong>A1</strong> et <strong>A2</strong>, comme sur un contacteur.",
    "Vérifiez la <strong>tension de bobine</strong> avant de brancher : 24 V continu et 230 V alternatif ne se distinguent que par ce qui est écrit dessus.",
    "Sur une bobine en <strong>courant continu</strong>, on pose une diode en parallèle, dans le sens qui bloque. Elle absorbe la surtension au moment de la coupure, qui abîmerait le transistor de commande.",
    "Sur une embase, repérez le <strong>détrompeur</strong> : un relais enfiché à l’envers ne fonctionne pas, et peut se détruire."
  ],
  piege: "Un relais n’est pas un contacteur miniature de secours. Si le catalogue annonce dix ampères, c’est en charge résistive — une lampe, une résistance. Sur un moteur, l’arc de coupure est bien plus dur, et la valeur tombe très en dessous.",

  symboles: [
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé de la bobine d’un relais.", legende: "La bobine" },
    { src: 'assets/contact_relais.svg', alt: "Symbole normalisé d’un contact de relais normalement ouvert.", legende: "Contact NO" },
    { src: 'assets/contact_relais_nf.svg', alt: "Symbole normalisé d’un contact de relais normalement fermé.", legende: "Contact NF" },
    { src: 'assets/telerupteur.svg', alt: "Symbole normalisé d’un télérupteur : la bobine porte un signe en marche d’escalier.", legende: "Télérupteur" }
  ],
  lecturePlan: [
    "La bobine d’un relais se dessine comme celle d’un contacteur : un rectangle. Ce qui change, c’est le <strong>repère</strong> — <strong>KA</strong> pour un relais, <strong>KM</strong> pour un contacteur.",
    "Ce n’est pas un détail de forme : c’est ce qui vous dit s’il y a de la puissance derrière ou non.",
    "Le <strong>télérupteur</strong> porte dans sa bobine un petit signe en <strong>marche d’escalier</strong>. Il annonce : cet appareil garde sa position.",
    "Alors devant un plan, lisez toujours les deux lettres du repère avant de conclure. KA et KM ne se remplacent pas l’un l’autre."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Quelle est la vraie différence entre un relais et un contacteur ?",
      confirmation: "La taille des contacts, donc le courant qu’ils peuvent couper.",
      reponses: [
        { texte: "La taille des contacts, donc le courant qu’ils peuvent couper.", juste: true },
        { texte: "Le relais se commande à la main.", pourquoi: "Il se commande par sa bobine, comme un contacteur." },
        { texte: "Le relais fonctionne en continu, le contacteur en alternatif.", pourquoi: "Les deux existent dans les deux, selon la bobine choisie." },
        { texte: "Le relais n’a pas de bobine.", pourquoi: "Il en a une : c’est exactement le même principe." } ] },

    { question: "Quel appareil de cette famille garde sa position sans alimentation ?",
      confirmation: "Le relais bistable, ou télérupteur : une impulsion le fait basculer.",
      reponses: [
        { texte: "Le relais de sécurité.", pourquoi: "Il retombe au contraire volontiers : c’est ce qu’on lui demande." },
        { texte: "Le relais bistable.", juste: true },
        { texte: "Aucun : tous retombent.", pourquoi: "Le bistable est justement l’exception." },
        { texte: "Le relais statique.", pourquoi: "Il conduit tant qu’il est commandé, et cesse dès qu’on le lâche." } ] },

    { question: "Sur un plan, la bobine porte le repère KA2. Qu’est-ce que cela vous dit ?",
      confirmation: "KA désigne un relais : il n’y a pas de puissance derrière.",
      reponses: [
        { texte: "Que sa bobine est en 24 volts.", pourquoi: "La tension n’est pas dans le repère : elle est écrite à part." },
        { texte: "Qu’il commande deux contacts.", pourquoi: "Le chiffre numérote l’appareil, il ne compte pas ses contacts." },
        { texte: "Que c’est un relais : pas de puissance derrière.", juste: true },
        { texte: "Que c’est un contacteur de deuxième rang.", pourquoi: "Un contacteur porte KM, pas KA." } ] },

    { question: "Pourquoi pose-t-on une diode sur une bobine alimentée en continu ?",
      confirmation: "Pour absorber la surtension au moment de la coupure.",
      reponses: [
        { texte: "Pour limiter le courant dans la bobine.", pourquoi: "Ce serait le rôle d’une résistance, et la bobine n’en a pas besoin." },
        { texte: "Pour signaler que la bobine est alimentée.", pourquoi: "C’est le rôle du voyant, pas de la diode de roue libre." },
        { texte: "Pour redresser le courant.", pourquoi: "Le courant est déjà continu : il n’y a rien à redresser." },
        { texte: "Pour absorber la surtension de coupure, qui abîmerait la commande.", juste: true } ] }
  ],

  retenir: [
    "<strong>Même principe qu’un contacteur</strong>, contacts beaucoup plus fins.",
    "<strong>KA</strong> pour un relais, <strong>KM</strong> pour un contacteur. Lisez le repère.",
    "<strong>Le bistable garde sa position.</strong> Une impulsion, il bascule ; une autre, il revient.",
    "<strong>Jamais de moteur</strong> sur les contacts d’un relais."
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer un relais d’un contacteur, lire les repères KA et KM, et connaître le cas particulier du relais bistable.</p><p><strong>Limite.</strong> Les relais de sécurité et les architectures de sécurité machine ne sont qu’évoqués : ils relèvent d’une formation spécifique.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/' } ],

  correspondances: [
    { ligne: 5, couleur: '#0f7b6c', texte: "5.2 Le contacteur" },
    { ligne: 6, couleur: '#c9451a', texte: "6.1 La bobine et l’électro-aimant" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.9 Les repères" } ]
});
