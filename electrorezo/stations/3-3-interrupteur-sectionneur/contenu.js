/* ÉlectroRézo 3.3 — L'interrupteur-sectionneur. */

ModeleAppareil.construire({
  id: '3.3', ligne: 3,
  vue3d: { modele: 'interSectionneur' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 3 Couper et isoler · Station 3',
  titre: 'L’interrupteur-sectionneur',
  narration: NARRATION,

  prerequis: [
    { id: '3.1', quoi: "l’interrupteur" },
    { id: '3.2', quoi: "le sectionneur" },
  ],

  photos: [
    { src: 'assets/biblio/interrupteur-sectionneur-rotatif.jpeg',
      alt: 'Photo d’un interrupteur-sectionneur rotatif à quatre pôles, à poignée rouge sur fond jaune.',
      titre: 'La poignée de proximité.',
      sous: 'Un appareil à poignée rotative, à poser à portée de main de celui qui travaille. Ici rouge sur fond jaune.' },
    { src: 'assets/biblio/technicien-tableau.png',
      alt: 'Photo d’un technicien en casque, écran facial et gants isolants, qui intervient avec un outil dans une armoire électrique.',
      titre: 'Pourquoi il existe.',
      sous: 'Celui qui intervient dans une armoire doit d’abord arrêter, condamner, puis vérifier l’absence de tension. Avec cet appareil, les deux premiers gestes se font sur place.' }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: 'Faire les deux métiers à la fois : couper pendant que le courant passe, <em>et</em> isoler pour qu’on travaille derrière. C’est le seul appareil de cette ligne qui sait les deux.',
  ouOnLeTrouve: 'Sur le flanc des machines, en tête d’armoire, partout où l’on doit à la fois arrêter et intervenir. On l’appelle aussi interrupteur de proximité.',

  scene: () => Schemas.coupeCumul(),
  tableauLigne: true,

  technologie: [
    ['Le mécanisme d’interrupteur', 'ressort d’ouverture brusque et chambre de coupure, où l’arc est étouffé, découpé, refroidi. Il peut donc s’ouvrir moteur en marche.'],
    ['Le mécanisme de sectionneur', 'distance d’ouverture garantie et trou de cadenas dans la poignée. Il peut donc être condamné.'],
    ['Ce n’est pas un compromis', 'c’est un <strong>cumul</strong> : les deux fonctions sont là en même temps, chacune entière.'],
    ['La proximité', 'sur une machine, il doit être visible et atteignable depuis l’endroit où l’on travaille.']
  ],

  variantes: [
    '<strong>Rotatif à poignée</strong> — le modèle des machines, poignée noire, ou rouge sur fond jaune quand il sert aussi de coupure d’urgence, sur le coffret.',
    '<strong>Modulaire</strong> — en tête de rangée dans un tableau.',
    '<strong>À coupure visible</strong> — une fenêtre montre les contacts séparés.',
    '<strong>À fusibles incorporés</strong> — c’est l’interrupteur-sectionneur à fusibles : il coupe toujours en charge (à ne pas confondre avec le sectionneur porte-fusible de la station 3.5).',
    'Poignée <strong>rouge sur fond jaune</strong> : couleur réservée à l’<strong>arrêt d’urgence</strong> — soit un coup de poing, soit un interrupteur-sectionneur qui sert aussi de coupure d’urgence. Ne l’employez jamais pour un simple interrupteur de machine.'
  ],

  aptitudes: {
    commander: true, couper: true, isoler: true,
    bonneReponse: 'Les trois, et c’est le seul de la ligne. Il commande, il coupe en charge, il isole et se condamne. C’est pour cela qu’on le pose sur les machines.',
    erreurs: {
      commander: 'Il commande : on l’actionne pour arrêter la machine.',
      couper: 'Il coupe en charge : il a le ressort et la chambre de coupure pour cela.',
      isoler: 'Il isole : distance garantie et trou de cadenas. C’est ce qui le sépare d’un simple interrupteur.'
    }
  },

  cablage: [
    'Amont côté réseau, aval côté machine — le sens compte pour l’intervention.',
    'Tous les conducteurs actifs sont coupés ; <strong>le conducteur de protection ne l’est jamais</strong>.',
    'Souvent équipé de <strong>contacts auxiliaires</strong> qui préviennent l’automate (la commande de la machine) que l’appareil est ouvert.',
    'La poignée doit rester accessible, et son trou de cadenas dégagé.'
  ],
  piege: 'Ne confondez pas avec le coup de poing d’arrêt d’urgence, qui est un autre appareil, avec un autre rôle — station 5.8. Une poignée rouge sur fond jaune peut, elle, être un interrupteur-sectionneur qui sert aussi de coupure d’urgence.',

  symboles: [
    { src: 'assets/inter_sectionneur_tri.svg', alt: 'Symbole normalisé d’un interrupteur-sectionneur à trois pôles.', legende: 'Interrupteur-sectionneur, trois pôles' },
    { src: 'assets/interrupteur_sectionneur_biphase.svg', alt: 'Symbole normalisé d’un interrupteur-sectionneur à deux pôles.', legende: 'Deux pôles' }
  ],
  lecturePlan: [
    'Il se lit comme la <strong>somme des deux</strong> : le contact incliné de l’interrupteur, plus la petite barre du sectionnement au bout du contact fixe, plus un <strong>petit rond</strong> qui veut dire « coupe en charge ».',
    'La barre seule, c’est un sectionneur (station 3.2). La barre <em>et</em> le petit rond ensemble sont la seule signature qui autorise à la fois la manœuvre en charge et la condamnation.'
  ],

  quiz: [
    { question: 'Qu’est-ce qui distingue l’interrupteur-sectionneur du simple interrupteur ?',
      confirmation: 'La distance d’ouverture garantie et le trou de cadenas.',
      reponses: [
        { texte: 'Il supporte un courant plus élevé.', pourquoi: 'Cela dépend du modèle, pas de la famille. Un gros interrupteur reste un interrupteur.' },
        { texte: 'Il peut isoler et se laisser condamner.', juste: true },
        { texte: 'Il coupe plus vite.', pourquoi: 'Les deux ont un ressort d’ouverture brusque : la vitesse n’est pas ce qui les sépare.' },
        { texte: 'Il est toujours tripolaire.', pourquoi: 'Il existe en deux, trois ou quatre pôles, comme l’interrupteur.' } ] },

    { question: 'Peut-on l’ouvrir alors que le moteur tourne ?',
      confirmation: 'Il a le ressort et la chambre de coupure : c’est prévu.',
      reponses: [
        { texte: 'Oui, mais une seule fois dans sa vie.', pourquoi: 'Il est fait pour des manœuvres répétées, dans la limite de son courant assigné.' },
        { texte: 'Non, comme le sectionneur, il faut couper ailleurs avant.', pourquoi: 'C’est justement ce qui le différencie du sectionneur : lui sait couper en charge.' },
        { texte: 'Oui : il a un pouvoir de coupure, c’est prévu pour.', juste: true },
        { texte: 'Seulement si la machine est à vide.', pourquoi: 'Il coupe en charge, machine en fonctionnement.' } ] },

    { question: 'Pourquoi le pose-t-on à côté de la machine ?',
      confirmation: 'Pour que celui qui travaille arrête et condamne lui-même, sans dépendre de personne.',
      reponses: [
        { texte: 'Parce que la norme impose un appareil par machine, sans plus.', pourquoi: 'L’obligation existe, mais sa raison est la sécurité de l’intervenant, pas le décompte.' },
        { texte: 'Pour permettre de faire varier la vitesse du moteur.', pourquoi: 'Faire varier est le métier de la ligne 7. Cet appareil est ouvert ou fermé.' },
        { texte: 'Pour économiser du câble jusqu’à l’armoire.', pourquoi: 'Le câble d’alimentation passe de toute façon. Ce n’est pas la raison.' },
        { texte: 'Pour que l’intervenant arrête et condamne lui-même, à portée de main.', juste: true } ] },

    { question: 'Une poignée rouge sur fond jaune, sur une machine, c’est…',
      confirmation: 'Ces couleurs sont réservées à l’arrêt d’urgence : un coup de poing, ou un interrupteur-sectionneur qui sert aussi de coupure d’urgence.',
      reponses: [
        { texte: 'Réservée à l’arrêt d’urgence : un coup de poing, ou un interrupteur-sectionneur qui sert aussi de coupure d’urgence.', juste: true },
        { texte: 'Un appareil hors service.', pourquoi: 'Rien dans la couleur ne signale une mise hors service.' },
        { texte: 'Un interrupteur-sectionneur comme un autre.', pourquoi: 'Non : ces couleurs signalent la coupure d’urgence. On ne les met jamais sur un simple interrupteur de machine : cela induit en erreur.' },
        { texte: 'Un appareil réservé à la haute tension.', pourquoi: 'La haute tension a d’autres signalements, et n’est pas concernée ici.' } ] }
  ],

  retenir: [
    '<strong>Le seul des cinq à savoir les trois choses</strong> : commander, couper en charge, isoler.',
    'C’est pour cela qu’il est sur le flanc des machines, à portée de main.',
    'Sur le symbole : le contact incliné, la barre de sectionnement <em>et</em> le petit rond de la coupure en charge.',
    'Rouge sur jaune : réservé à l’arrêt d’urgence (coup de poing, ou interrupteur-sectionneur qui sert aussi de coupure d’urgence). Jamais sur un simple interrupteur.'
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que cet appareil cumule les deux fonctions — coupure en charge et sectionnement — et savoir pourquoi c’est lui qu’on pose à côté d’une machine.</p>',

  credits: [
    { quoi: 'Photo « poignée de proximité »', source: 'base de connaissances inerWeb',
      detail: 'document de cours indexé — recherche « interrupteur sectionneur charge »' },
    { quoi: 'Photo « intervention sur tableau »', source: 'base de connaissances inerWeb',
      detail: 'document de cours indexé, même recherche' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: '200_fuses_protective_gears/20_disconnecting_switches/' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: '3.2 Le sectionneur' },
    { ligne: 5, couleur: '#1e7e54', texte: '5.8 Arrêt d’urgence' } ]
});
