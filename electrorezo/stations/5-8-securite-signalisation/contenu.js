/* ÉlectroRézo 5.8 — Arrêt d’urgence, voyant et fin de course. */

ModeleAppareil.construire({
  id: '5.8', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 8',
  titre: "Arrêt d’urgence et signalisation",
  narration: NARRATION,

  prerequis: [
    { id: '5.7', quoi: "les boutons" },
    { id: '5.2', quoi: "le contacteur" },
  ],

  photos: [
    { src: 'assets/biblio/pupitre-boutons-et-coup-de-poing.jpeg',
      alt: "Photo d’un pupitre portant plusieurs boutons-poussoirs noirs et un bouton rouge en champignon.",
      titre: "Un pupitre réel.", sous: "Le champignon rouge se distingue de tous les autres." },
    { src: 'assets/champignon-accrochage.svg',
      alt: "Coupe d’un arrêt d’urgence : au repos la lame touche ; frappé, la tête s’enfonce, un cran la retient et le contact s’ouvre.",
      titre: "Ce qui se passe dedans.", sous: "Le cran mord, et la tête ne remonte plus toute seule." },
    { src: 'assets/fin-de-course-et-voyant.svg',
      alt: "À gauche, une fin de course à galet poussée par une came portée par une pièce mobile. À droite, un voyant traversant la porte d’armoire, avec ses deux fils et aucun contact.",
      titre: "Les deux autres.", sous: "La fin de course dit où on en est, le voyant le montre." }
  ],
  creditPhoto: 'Photographie : document de cours indexé dans la base inerWeb. Les deux coupes sont dessinées pour cette station. Détail dans « Crédits ».',

  aQuoiCaSert: "À arrêter une machine quand quelque chose se passe mal, et à dire à l’opérateur ce que la machine est en train de faire. Deux métiers différents, réunis ici parce qu’ils partagent la même règle de câblage.",
  ouOnLeTrouve: "L’arrêt d’urgence à portée de main de chaque poste de travail ; les voyants sur la porte de l’armoire ; les fins de course sur les parties mobiles des machines.",

  scene: () => SchemasCommande.chaineSecurite(),

  technologie: [
    ["Le champignon", "une grosse tête rouge, sur fond jaune, qu’on frappe de la paume. Elle est faite pour être trouvée sans regarder."],
    ["L’accrochage", "une fois enfoncé, il <strong>reste</strong> enfoncé. Pour le libérer, il faut le tourner, le tirer, ou tourner une clé. Un accident ne se relâche pas tout seul."],
    ["L’ouverture forcée", "sa liaison mécanique est rigide : si les pastilles se sont soudées, le mécanisme les arrache. C’est ce qui distingue un contact de sécurité d’un contact ordinaire."],
    ["La fin de course", "un contact poussé par une pièce en mouvement — un galet, un levier, une came. Il dit à la commande : la partie mobile est arrivée."]
  ],

  variantes: [
    "<strong>Déverrouillage par rotation</strong> — le plus courant. On tourne le champignon d’un quart de tour, il ressort.",
    "<strong>Déverrouillage à clé</strong> — quand on veut que seule une personne habilitée puisse relancer la machine après un arrêt d’urgence.",
    "<strong>Le voyant</strong> — il informe, il ne commande rien. Blanc pour un état, vert pour marche, rouge pour défaut, orange pour une alerte.",
    "<strong>La fin de course à galet ou à levier</strong> — même contact, organe de manœuvre différent. Le galet supporte le passage répété d’une came."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'C’est l’arrêt d’urgence qu’on juge ici. Cochez, puis validez.',
  aptitudes: {
    puissance: false, distance: false, maintien: true,
    bonneReponse: 'Exact. Il ne porte pas la puissance, personne ne l’actionne à distance — et il garde sa position, ce qui est ici toute sa raison d’être. Un accident ne se relâche pas tout seul : il faut que quelqu’un aille délibérément le déverrouiller.',
    erreurs: {
      puissance: 'Il n’ouvre pas le circuit du moteur : il ouvre la chaîne de commande, et c’est le contacteur qui coupe la puissance.',
      distance: 'Il s’actionne d’un coup de paume. Aucune bobine ne le commande.',
      maintien: 'C’est justement le point : il reste enfoncé. Sans cela, la machine repartirait dès que la main se retire.'
    }
  },

  cablage: [
    "L’arrêt d’urgence se câble <strong>toujours en NF</strong>, en série dans la chaîne de commande. Jamais autrement.",
    "S’il y en a plusieurs, ils se câblent <strong>tous en série</strong>. N’importe lequel doit pouvoir tout arrêter.",
    "Les fins de course de sécurité suivent la même règle : <strong>NF, en série</strong>.",
    "Le voyant, lui, se câble <strong>en parallèle</strong> sur ce qu’il signale. Il ne doit jamais faire partie de la chaîne : une lampe grillée n’arrête pas une machine."
  ],
  piege: "Un arrêt d’urgence n’est <strong>pas</strong> un dispositif de consignation. Il arrête, il ne sectionne pas : la machine reste sous tension. Pour travailler derrière, il faut ouvrir et cadenasser un appareil qui a l’aptitude au sectionnement — ce que la ligne 3 vous a appris à reconnaître.",

  symboles: [
    { src: 'assets/au.svg', alt: "Symbole normalisé d’un arrêt d’urgence : tête en champignon et contact normalement fermé.", legende: "Arrêt d’urgence" },
    { src: 'assets/arret_urgence_tourner_deverouiller.svg', alt: "Symbole normalisé d’un arrêt d’urgence à déverrouillage par rotation.", legende: "Déverrouillage par rotation" },
    { src: 'assets/fin_de_course_came_no.svg', alt: "Symbole normalisé d’une fin de course à galet, contact normalement ouvert.", legende: "Fin de course NO" },
    { src: 'assets/lampe2.svg', alt: "Symbole normalisé d’un voyant : un cercle barré d’une croix.", legende: "Voyant" }
  ],
  lecturePlan: [
    "L’arrêt d’urgence porte une <strong>tête en demi-cercle</strong> — le champignon vu de côté — et un contact <strong>normalement fermé</strong>. La combinaison ne trompe pas.",
    "La <strong>fin de course</strong> porte un <strong>galet</strong> : un petit cercle au bout de sa liaison mécanique. Il dit que quelque chose vient pousser dessus.",
    "Le <strong>voyant</strong> est un cercle barré d’une <strong>croix</strong>. Attention : une croix, pas un plus — et il n’a pas de contact, ce qui vous dit qu’il ne commande rien.",
    "Cherchez la <strong>chaîne</strong> : plusieurs NF les uns derrière les autres, entre la phase et la bobine. C’est la signature d’un circuit de sécurité, et elle se voit d’un coup d’œil."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Pourquoi un arrêt d’urgence reste-t-il enfoncé après qu’on l’a frappé ?",
      confirmation: "Pour que la machine ne reparte pas dès que la main se retire.",
      reponses: [
        { texte: "Pour que la machine ne reparte pas toute seule.", juste: true },
        { texte: "Parce que le ressort est trop faible.", pourquoi: "L’accrochage est un mécanisme voulu, pas une faiblesse." },
        { texte: "Pour économiser le contact.", pourquoi: "Le contact n’est pas plus sollicité dans un cas que dans l’autre." },
        { texte: "Pour signaler qu’il a été utilisé.", pourquoi: "C’est un effet secondaire utile, mais ce n’est pas la raison de l’accrochage." } ] },

    { question: "Peut-on consigner une machine avec son arrêt d’urgence ?",
      confirmation: "Il arrête, il ne sectionne pas. La machine reste sous tension.",
      reponses: [
        { texte: "Oui, s’il est verrouillé par une clé.", pourquoi: "La clé empêche le redémarrage, elle ne garantit aucune distance d’ouverture." },
        { texte: "Non : il n’a pas l’aptitude au sectionnement.", juste: true },
        { texte: "Oui, si on met un macaron.", pourquoi: "Un macaron ne remplace pas un appareil condamnable." },
        { texte: "Oui, c’est fait pour ça.", pourquoi: "Il est fait pour arrêter vite, ce qui est un autre métier." } ] },

    { question: "Comment se câblent plusieurs arrêts d’urgence sur une même machine ?",
      confirmation: "Tous en série : n’importe lequel doit tout arrêter.",
      reponses: [
        { texte: "Un seul dans la chaîne, les autres sur un relais.", pourquoi: "Cela ajouterait un appareil entre l’urgence et l’arrêt : on ne le fait pas." },
        { texte: "Tous en parallèle.", pourquoi: "En parallèle, il faudrait les frapper tous en même temps pour arrêter la machine." },
        { texte: "Tous en série.", juste: true },
        { texte: "En parallèle deux à deux.", pourquoi: "Le montage n’existe pas : la sécurité veut la série, sans exception." } ] },

    { question: "Où se câble un voyant, et pourquoi ?",
      confirmation: "En parallèle : une lampe grillée ne doit jamais arrêter une machine.",
      reponses: [
        { texte: "En série, pour vérifier qu’il fonctionne.", pourquoi: "En série, une lampe grillée couperait le circuit qu’elle est censée signaler." },
        { texte: "Peu importe : il n’a pas de sens de branchement.", pourquoi: "Le sens du branchement change tout, et la série est ici une faute." },
        { texte: "Directement sur la puissance.", pourquoi: "Un voyant est un appareil de commande : il ne se branche pas sur la puissance." },
        { texte: "En parallèle, pour qu’une lampe grillée n’arrête rien.", juste: true } ] }
  ],

  retenir: [
    "<strong>NF, en série.</strong> C’est la règle de toute chaîne de sécurité.",
    "<strong>Un fil qui casse arrête la machine.</strong> C’est voulu.",
    "<strong>Il reste enfoncé</strong> : il faut aller le déverrouiller.",
    "<strong>Arrêter n’est pas consigner.</strong> La machine reste sous tension."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi les sécurités se câblent en NF et en série, ce que l’accrochage d’un arrêt d’urgence apporte, et la différence entre arrêter et consigner.</p><p><strong>Limite.</strong> Les catégories d’arrêt et les niveaux de performance de sécurité ne sont pas traités : ils relèvent d’une formation dédiée.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/380_signaling_operating/ et 390_sensors_instruments/' } ],

  correspondances: [
    { ligne: 3, couleur: '#1b3a63', texte: "3.3 L’interrupteur-sectionneur" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.1 Le contact NF" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.7 Le bouton-poussoir" } ]
});
