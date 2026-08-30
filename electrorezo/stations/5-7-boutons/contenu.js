/* ÉlectroRézo 5.7 — Bouton-poussoir, sélecteur et commutateur. */

ModeleAppareil.construire({
  id: '5.7', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 7',
  titre: "Bouton-poussoir et sélecteur",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/tete-corps-et-bloc.png',
      alt: "Planche légendée montrant les trois pièces d’un appareil de commande : la tête (tournante ou poussoir), le corps, et le bloc de contact.",
      titre: "Les trois étages.", sous: "La tête, le corps, le contact. Trois pièces qui se commandent séparément." },
    { src: 'assets/biblio/bouton-poussoir-vert.png',
      alt: "Photo d’un bouton-poussoir vert vu de trois quarts, tête, corps et bloc de contact assemblés.",
      titre: "Assemblé.", sous: "Une fois monté, on ne voit plus que la tête." },
    { src: 'assets/biblio/bouton-poussoir-boitier.jpeg',
      alt: "Photo d’un bouton-poussoir vert monté dans son boîtier métallique.",
      titre: "En place.", sous: "À portée de main de celui qui travaille." }
  ],
  creditPhoto: 'Documents de cours indexés dans la base inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "À donner un ordre avec le doigt. C’est le seul endroit de toute la ligne où c’est un être humain qui agit directement sur un contact — partout ailleurs, c’est une bobine.",
  ouOnLeTrouve: "Sur la porte des armoires, sur les pupitres, sur les boîtes à boutons pendantes au-dessus des machines.",

  scene: () => SchemasCommande.troisEtages(),

  technologie: [
    ["La tête", "ce que le doigt touche. Sa forme et sa couleur disent ce qu’elle fait — mais elles ne décident de rien électriquement."],
    ["Le corps", "la partie qui traverse la tôle et se fixe par un écrou. C’est lui qui donne le diamètre normalisé du perçage, très souvent 22 millimètres."],
    ["Les blocs de contacts", "clipsés à l’arrière. C’est là que le travail électrique se fait. On en met un, deux, trois, NO ou NF, selon le besoin."],
    ["Le ressort de rappel", "sur un poussoir, il ramène la tête dès qu’on lâche. C’est ce qui fait la différence avec un sélecteur, qui n’en a pas."]
  ],

  variantes: [
    "<strong>Le bouton-poussoir</strong> — à impulsion. Il agit tant qu’on appuie, et rien de plus. Il ne garde aucune position.",
    "<strong>Le sélecteur, ou commutateur</strong> — à position maintenue. On le tourne, il reste. Deux positions, ou trois avec un rappel au centre.",
    "<strong>Le bouton lumineux</strong> — une tête transparente avec une lampe derrière. Il commande et il informe en même temps.",
    "<strong>Le bouton à clé</strong> — il ne se manœuvre qu’avec la clé, et souvent elle ne se retire que dans une position. Pour ce qui ne doit pas être fait par n’importe qui."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Ici, c’est le bouton-poussoir qu’on juge — pas le sélecteur. Cochez, puis validez.',
  aptitudes: {
    puissance: false, distance: false, maintien: false,
    bonneReponse: 'Exact, et cette station est la seule de la ligne où l’on répond non trois fois. Un poussoir ne porte rien, n’obéit à aucune bobine, et ne garde rien. Il transmet une intention humaine, c’est tout — et sans lui rien ne démarre.',
    erreurs: {
      puissance: 'Ses blocs sont des contacts de commande. On ne fait pas passer un moteur dans un bouton.',
      distance: 'C’est justement le contraire : c’est le seul appareil de la ligne qu’un être humain actionne directement.',
      maintien: 'Le ressort ramène la tête dès qu’on lâche. C’est le sélecteur qui garde sa position, pas le poussoir.'
    }
  },

  cablage: [
    "Le <strong>bouton de marche</strong> se câble en <strong>NO</strong>, en parallèle sur le contact d’auto-maintien.",
    "Le <strong>bouton d’arrêt</strong> se câble en <strong>NF</strong>, <strong>en série</strong> dans la boucle. C’est la seule façon de couper.",
    "Les têtes et les blocs se commandent séparément : on peut monter un bloc NF derrière une tête verte. Rien ne l’empêche mécaniquement.",
    "Un <strong>bouton à deux étages</strong>, avec un NO et un NF, permet de commander deux choses d’un même geste — par exemple lancer l’un et verrouiller l’autre."
  ],
  piege: "La couleur de la tête est une convention d’usage : vert pour marche, rouge pour arrêt. Elle n’a <strong>aucun</strong> effet électrique. Un bouton vert peut très bien porter un contact NF. Alors lisez le repère écrit sur le bloc — 13-14 ou 21-22 — et jamais la couleur du capuchon.",

  symboles: [
    { src: 'assets/poussoir.svg', alt: "Symbole normalisé d’un bouton-poussoir à contact normalement ouvert.", legende: "Poussoir NO" },
    { src: 'assets/poussoir_nf.svg', alt: "Symbole normalisé d’un bouton-poussoir à contact normalement fermé.", legende: "Poussoir NF" },
    { src: 'assets/commut_2_position_fixe.svg', alt: "Symbole normalisé d’un commutateur à deux positions fixes.", legende: "Sélecteur, 2 positions" },
    { src: 'assets/bouton_tournant_01.svg', alt: "Symbole normalisé d’un bouton tournant à positions.", legende: "Bouton tournant" }
  ],
  lecturePlan: [
    "Le poussoir se reconnaît à sa <strong>tête</strong> : un petit crochet carré, ouvert vers le contact, relié à lui par une <strong>liaison en pointillé</strong>.",
    "Ce pointillé, vous le connaissez depuis la station 8.7 : ce n’est pas un fil, c’est un lien mécanique. Le doigt pousse la tête, la tête pousse la lame.",
    "Le <strong>sélecteur</strong> n’a pas cette tête-là : il porte un trait avec des positions marquées. Son dessin dit qu’il reste où on l’a mis.",
    "Le repère est <strong>S</strong> — S1, S2, S3. Et sur un plan bien fait, un texte à côté dit ce que fait ce bouton : « marche », « arrêt », « manuel-auto »."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Quelle est la vraie différence entre un poussoir et un sélecteur ?",
      confirmation: "Le poussoir revient tout seul ; le sélecteur reste où on l’a mis.",
      reponses: [
        { texte: "Le poussoir est en NO, le sélecteur en NF.", pourquoi: "Les deux existent dans les deux versions : c’est le bloc qui décide." },
        { texte: "Le sélecteur supporte plus de courant.", pourquoi: "Ils reçoivent les mêmes blocs de contacts." },
        { texte: "Le poussoir se monte sur porte, le sélecteur en armoire.", pourquoi: "Les deux se montent sur porte, avec le même perçage." },
        { texte: "Le poussoir revient tout seul, le sélecteur garde sa position.", juste: true } ] },

    { question: "Un bouton vert porte un bloc 21-22. Que fait-il ?",
      confirmation: "21-22 est un NF : il ouvre quand on appuie, quelle que soit la couleur.",
      reponses: [
        { texte: "Il ouvre le circuit quand on appuie.", juste: true },
        { texte: "Il ne fait rien tant qu’on n’a pas changé la tête.", pourquoi: "La tête et le bloc fonctionnent indépendamment l’un de l’autre." },
        { texte: "Il ferme le circuit : il est vert.", pourquoi: "La couleur est une convention d’usage, pas une propriété électrique." },
        { texte: "Il porte à la fois un NO et un NF.", pourquoi: "21-22 désigne un seul contact, normalement fermé." } ] },

    { question: "Où se câble le bouton d’arrêt d’un circuit à auto-maintien ?",
      confirmation: "En série dans la boucle, en NF.",
      reponses: [
        { texte: "En parallèle sur le bouton de marche.", pourquoi: "C’est la place du contact d’auto-maintien, et il n’arrêterait rien." },
        { texte: "En série dans la boucle, en NF.", juste: true },
        { texte: "Dans le circuit de puissance.", pourquoi: "Un bouton de commande n’a rien à faire dans la puissance." },
        { texte: "En parallèle sur la bobine.", pourquoi: "Il court-circuiterait la bobine au lieu de couper son alimentation." } ] },

    { question: "Sur un plan, un contact est relié à un petit crochet carré par un pointillé. C’est quoi ?",
      confirmation: "Un bouton-poussoir : la tête et son lien mécanique.",
      reponses: [
        { texte: "Un contact de relais.", pourquoi: "Un contact de relais est commandé par une bobine, sans tête ni pointillé." },
        { texte: "Un contact miroir.", pourquoi: "Le contact miroir est un NF de sécurité, sans organe de manœuvre dessiné." },
        { texte: "Un bouton-poussoir.", juste: true },
        { texte: "Un contact temporisé.", pourquoi: "La temporisation se dessine avec un parachute, pas avec un crochet." } ] }
  ],

  retenir: [
    "<strong>Le poussoir revient</strong>, le <strong>sélecteur reste</strong>.",
    "<strong>Trois étages</strong> : la tête, le corps, les blocs.",
    "<strong>La couleur ne commande rien.</strong> Lisez le repère du bloc.",
    "<strong>Marche en parallèle, arrêt en série.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer un appareil à impulsion d’un appareil à position maintenue, comprendre la construction en trois étages, et ne plus se fier à la couleur d’une tête.</p><p><strong>Limite.</strong> Les indices de protection des coffrets et les boîtes à boutons antidéflagrantes ne sont pas traités.</p>',

  credits: [
    { quoi: 'Photographies et planches', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/380_signaling_operating/' } ],

  correspondances: [
    { ligne: 8, couleur: '#7c3aed', texte: "8.7 Le pointillé" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.3 L’auto-maintien" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.8 L’arrêt d’urgence" } ]
});
