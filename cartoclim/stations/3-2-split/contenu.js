/* CartoClim 3.2 — Le split : deux unités, un circuit. Station étalon, écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.2', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 2',
  titre: "Le split : deux unités, un circuit",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" }
  ],

  photos: [
    { src: 'assets/biblio/898384a2af.png',
      alt: "Un climatiseur split : l’unité extérieure avec sa grille et son hélice, l’unité intérieure murale, et la télécommande.",
      titre: "Deux boîtiers, une télécommande.", sous: "Dehors, l’unité qui ronronne ; dedans, celle qui souffle." },
    { src: 'assets/biblio/b39677e4bc.png',
      alt: "Une unité extérieure et une unité intérieure de type console, posée au sol contre le mur.",
      titre: "La même machine, une autre forme.", sous: "Ici l’unité intérieure est une console : le principe ne change pas." }
  ],

  aQuoiCaSert: "À <strong>refroidir une pièce</strong> — et, presque toujours aujourd’hui, à la chauffer. « Split » veut dire <strong>séparé</strong> : la machine est coupée en deux. L’unité intérieure, au mur, souffle l’air ; l’unité extérieure, dehors, rejette la chaleur. Entre les deux, deux tubes de cuivre et un câble.",
  ouOnLeTrouve: "Dans une chambre, un bureau, un petit commerce, une salle informatique. C’est le climatiseur le plus vendu, et celui que le technicien pose, met en service et dépanne le plus souvent.",

  scene: () => ScenesStation.trajetDeLaChaleur(),

  technologie: [
    ["L’unité intérieure", "un filtre, une batterie à ailettes (l’<strong>évaporateur</strong>), une <strong>turbine</strong> placée après elle, qui aspire l’air de la pièce à travers le filtre et la batterie, puis le souffle dans la pièce, des volets, un <strong>bac à condensats</strong>, deux sondes (air et batterie) et la carte électronique qui écoute la télécommande."],
    ["L’unité extérieure", "le <strong>compresseur</strong> — rotatif le plus souvent —, une batterie à ailettes (le <strong>condenseur</strong>) balayée par une hélice, le <strong>détendeur</strong> (capillaire ou électronique), la <strong>vanne 4 voies</strong> si l’appareil est réversible, et les <strong>deux vannes de service</strong> où se raccordent les tubes."],
    ["Les liaisons", "deux tubes de cuivre isolés : le <strong>petit</strong> transporte le fluide <strong>liquide</strong> (en mode froid, un mélange de liquide et de vapeur à basse pression, après le détendeur), le <strong>gros</strong> transporte le <strong>gaz</strong>, plus volumineux. À côté, le câble qui relie les deux unités et le tuyau d’évacuation de l’eau."],
    ["Le cycle", "le même que dans toute machine frigorifique : le fluide <strong>s’évapore dedans</strong> en prenant la chaleur de l’air, le compresseur le comprime, il <strong>se condense dehors</strong> en rendant cette chaleur, le détendeur le ramène à basse pression. Le dessin le déroule pas à pas."]
  ],

  variantes: [
    "<strong>Réversible</strong> — une vanne 4 voies inverse le sens du fluide : l’évaporateur devient condenseur, et le split chauffe la pièce. C’est la station 2.6.",
    "<strong>Inverter ou tout-ou-rien</strong> — l’Inverter fait varier la vitesse du compresseur au lieu de l’arrêter et de le relancer. Moins de bruit, moins d’électricité. C’est la station 2.4.",
    "<strong>Multisplit</strong> — une seule unité extérieure pour deux, trois ou quatre unités intérieures. Station 3.4.",
    "<strong>Les formes de l’unité intérieure</strong> — murale, console, cassette de plafond, gainable. Station 3.3.",
    "<strong>Le fluide</strong> — le R-410A a laissé la place au <strong>R-32</strong>, légèrement inflammable (classe A2L) : c’est ce qui change pour la pose et l’intervention. Station 4.9."
  ],
  reglage: "Depuis la <strong>télécommande</strong> : le mode (froid, chaud, déshumidification, ventilation), la consigne de température et la vitesse de la turbine. Sur un split à capillaire, la surchauffe ne se règle pas ; sur un détendeur électronique, c’est la carte qui la tient. Stations 5.1 et 2.5.",

  consigneAptitudes: 'Le split réversible du salon : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un split ?',
  colonnes: [
    { id: 'refroidir', libelle: 'Refroidir la pièce', aide: 'l’été, prendre la chaleur dedans et la rejeter dehors', dessin: SceneKit.pictos.DESSINS.froid },
    { id: 'chauffer',  libelle: 'Chauffer la pièce',  aide: 'l’hiver, inverser le cycle et prendre la chaleur dehors', dessin: SceneKit.pictos.DESSINS.chaud },
    { id: 'renouveler', libelle: 'Renouveler l’air',  aide: 'faire entrer de l’air neuf venu de l’extérieur', dessin: SceneKit.pictos.DESSINS.air }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    refroidir: true, chauffer: true, renouveler: false,
    bonneReponse: 'Exact. Il refroidit, et comme il est réversible il chauffe. Mais il ne renouvelle rien : il brasse l’air de la pièce, il n’en fait entrer aucun du dehors. L’air neuf, c’est le travail de la ventilation.',
    erreurs: {
      refroidir: 'C’est son premier métier : prendre la chaleur dedans, la rejeter dehors.',
      chauffer: 'Presque tous les splits vendus aujourd’hui sont réversibles : la vanne 4 voies inverse le cycle, et la pièce est chauffée.',
      renouveler: 'Il recycle l’air de la pièce, il ne fait entrer aucun air extérieur. Pour l’air neuf, il faut une ventilation — voyez AéroRézo.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Deux tubes de cuivre</strong> isolés, raccordés par des <strong>raccords à dudgeon</strong> (flare) serrés au couple : station 4.2 pour les longueurs, CuivRézo pour le geste.",
    "<strong>Un câble entre les deux unités</strong>, plus l’alimentation de l’unité extérieure, protégée par son disjoncteur : station 4.5.",
    "<strong>Le tuyau de condensats</strong>, en pente continue jusqu’à dehors ou jusqu’à une pompe de relevage : station 4.4.",
    "<strong>Avant d’ouvrir les vannes</strong> : tirage au vide des liaisons et de l’unité intérieure, puis contrôle d’étanchéité. Stations 4.7 et 4.6."
  ],
  piege: "Un split livré « préchargé » l’est pour une <strong>longueur de liaison précise</strong>, écrite dans la notice. Plus long, il manque du fluide ; plus court, il y en a trop. On ne devine pas : on lit la notice, et on pèse.",

  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Sur un plan de climatisation, l’<strong>unité intérieure</strong> est dessinée dans la pièce qu’elle traite, l’<strong>unité extérieure</strong> sur la façade, au sol ou en toiture.",
    "Les deux traits qui les relient sont les <strong>liaisons frigorifiques</strong>. Leur <strong>longueur</strong> et leur <strong>dénivelé</strong> sont cotés : ils commandent la charge de fluide et la limite du constructeur.",
    "Le <strong>tuyau de condensats</strong> est tracé jusqu’à son évacuation. S’il manque sur le plan, il manquera sur le chantier.",
    "Les repères courants : <strong>UI</strong> pour l’unité intérieure, <strong>UE</strong> pour l’unité extérieure."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on raccorde entre les deux unités',

  quiz: [
    { question: "Que veut dire « split » ?",
      confirmation: "Séparé : la machine est coupée en deux unités, reliées par deux tubes.",
      reponses: [
        { texte: "Rapide à poser.", pourquoi: "Rien à voir avec la pose : le mot décrit la machine, coupée en deux." },
        { texte: "Silencieux.", pourquoi: "Il l’est, parce que le compresseur est dehors — mais c’est une conséquence, pas le sens du mot." },
        { texte: "Séparé en deux unités.", juste: true },
        { texte: "Réversible.", pourquoi: "Un split peut être froid seul ou réversible : le mot ne dit pas lequel." } ] },

    { question: "Où le fluide prend-il la chaleur de la pièce ?",
      confirmation: "Dans la batterie de l’unité intérieure : c’est là qu’il s’évapore.",
      reponses: [
        { texte: "Dans le compresseur.", pourquoi: "Le compresseur met le fluide en pression, il ne prend pas la chaleur de l’air de la pièce." },
        { texte: "Dans le détendeur.", pourquoi: "Le détendeur fait chuter la pression ; il prépare l’évaporation, il ne la fait pas." },
        { texte: "Dans la batterie de l’unité extérieure.", pourquoi: "Dehors, le fluide rend la chaleur : c’est le condenseur." },
        { texte: "Dans la batterie de l’unité intérieure.", juste: true } ] },

    { question: "Pourquoi les deux tubes n’ont-ils pas le même diamètre ?",
      confirmation: "Le petit transporte du liquide, le gros transporte du gaz, bien plus volumineux.",
      reponses: [
        { texte: "Le petit transporte du liquide, le gros du gaz.", juste: true },
        { texte: "Le gros est l’aller, le petit le retour.", pourquoi: "Les deux tubes sont un aller et un retour, mais ce n’est pas ce qui fixe leur taille : c’est l’état du fluide." },
        { texte: "C’est une question de prix du cuivre.", pourquoi: "Le gaz occupe beaucoup plus de place que le liquide : le gros tube est une nécessité, pas une économie." },
        { texte: "Le petit sert aux condensats.", pourquoi: "Les condensats ont leur propre tuyau, en plastique. Les deux tubes de cuivre transportent le fluide." } ] },

    { question: "D’où vient l’eau du tuyau de condensats ?",
      confirmation: "De l’humidité de l’air de la pièce, qui se dépose sur la batterie froide.",
      reponses: [
        { texte: "D’une fuite du circuit.", pourquoi: "Le fluide frigorigène n’est pas de l’eau. Une fuite se voit au manque de froid, pas au bac." },
        { texte: "De l’humidité de l’air de la pièce.", juste: true },
        { texte: "De la pluie qui entre par l’unité extérieure.", pourquoi: "L’eau du bac se forme dedans, sur la batterie intérieure." },
        { texte: "Du réseau d’eau de la maison.", pourquoi: "Un split n’est raccordé à aucune arrivée d’eau." } ] },

    { question: "Un split renouvelle-t-il l’air de la pièce ?",
      confirmation: "Non : il brasse l’air de la pièce, il ne fait entrer aucun air neuf.",
      reponses: [
        { texte: "Oui, par l’unité extérieure.", pourquoi: "L’unité extérieure ne communique avec la pièce que par les deux tubes de fluide : aucun air ne passe." },
        { texte: "Oui, en mode ventilation.", pourquoi: "Le mode ventilation fait tourner la turbine sans froid ni chaud : toujours l’air de la pièce." },
        { texte: "Non, il recycle l’air de la pièce.", juste: true },
        { texte: "Seulement l’hiver.", pourquoi: "La saison ne change rien : il n’y a pas d’entrée d’air neuf." } ] }
  ],

  retenir: [
    "<strong>Deux unités, un seul circuit</strong> : dedans on prend la chaleur, dehors on la rejette.",
    "<strong>Petit tube liquide, gros tube gaz.</strong>",
    "<strong>L’eau du bac vient de l’air de la pièce</strong> — et elle doit sortir.",
    "<strong>Un split ne renouvelle pas l’air.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître les deux unités d’un split et ce qu’il y a dedans, suivre le trajet de la chaleur en mode froid, et savoir ce qu’on raccorde entre les deux.</p><p><strong>Limite.</strong> Le mode chaud, l’Inverter, le choix de l’unité intérieure et la pose sont des stations à part. Aucune valeur de charge ni de longueur n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.6 La vanne 4 voies : froid ou chaud", url: lien('2.6') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.3 Choisir l’unité intérieure", url: lien('3.3') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.1 Poser les deux unités", url: lien('4.1') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.3 Le dudgeon", url: lien('4.3') } ]
});
