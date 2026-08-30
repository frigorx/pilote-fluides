/* ÉlectroRézo 4.9 — Le câble : section et désignation. */

ModeleAppareil.construire({
  id: '4.9', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 9' + ' · fin de ligne',
  titre: "Le câble : section et désignation",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/cable-conducteurs.jpeg', alt: "Photo d’un câble électrique dont on voit les conducteurs internes bleu, vert-jaune et noir.",
      titre: "Sous la gaine.", sous: "Chaque conducteur a sa couleur, et chaque couleur a un sens." },
    { src: 'assets/biblio/tableau-sections-cuivre.jpeg', alt: "Tableau de sections de cuivre et de courants admissibles selon l’isolant et le nombre de conducteurs chargés.",
      titre: "Le tableau des sections.", sous: "Le courant admissible dépend de la section, de l’isolant et du mode de pose." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Transporter le courant sans chauffer. <strong>C’est le câble qu’on protège</strong> quand on choisit un calibre — pas l’appareil qui est au bout.",
  ouOnLeTrouve: "Partout. C’est l’élément le plus long et le moins regardé de toute l’installation.",

  scene: () => SchemasProtection.sectionCable(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["La section", "en millimètres carrés, celle du cuivre. Plus elle est grande, plus le courant admissible est élevé."],
    ["L’échauffement", "un conducteur trop chargé chauffe. L’isolant vieillit, durcit, puis lâche. C’est un processus lent et invisible."],
    ["La chute de tension", "sur une longue ligne, la tension se perd en route. On augmente alors la section, même si le courant ne l’exigeait pas."],
    ["Les couleurs", "<strong>bleu clair</strong> le neutre, <strong>vert et jaune</strong> le conducteur de protection, les autres pour les phases. Deux couleurs réservées, jamais employées ailleurs."]
  ],

  variantes: [
    "<strong>H07 V-U</strong> — fil rigide sous conduit, l’installation fixe.",
    "<strong>H07 RN-F</strong> — souple et résistant, pour les alimentations mobiles.",
    "<strong>U-1000 R2V</strong> — le câble d’installation par excellence, enterré ou apparent.",
    "La désignation se lit lettre par lettre : tension, isolant, souplesse. Ce n’est pas un code commercial, c’est une description."
  ],

  aptitudes: {
    surcharge: false, courtCircuit: false, defautIsolement: false,
    bonneReponse: "Aucun des trois, bien sûr : un câble ne détecte rien. Mais c’est <strong>lui qu’on protège</strong>. Le calibre d’un disjoncteur ou d’un fusible se choisit d’après sa section — jamais l’inverse. Toute la ligne 4 existe pour lui.",
    erreurs: {
      surcharge: "Un câble ne détecte pas la surcharge : il la subit, il chauffe, et il vieillit.",
      courtCircuit: "Il ne détecte pas le court-circuit : il le conduit, et c’est bien le problème.",
      defautIsolement: "Il ne détecte rien. En revanche, c’est son isolant qui lâche quand un défaut d’isolement apparaît."
    }
  },

  cablage: [
    "<strong>Section choisie avant le calibre</strong> de la protection. Toujours dans cet ordre.",
    "Mode de pose pris en compte : un câble sous isolant chauffe plus qu’un câble à l’air libre.",
    "<strong>Embouts sur le fil souple</strong>, serrage au couple, longueur de dénudage juste.",
    "Repérage aux deux extrémités : un câble non repéré coûte une heure de recherche."
  ],
  piege: "Augmenter le calibre du disjoncteur parce qu’il déclenche, sans toucher au câble. Le disjoncteur ne protège pas la machine : il protège le câble. Un calibre trop grand, c’est un câble qui chauffe sans que rien ne l’arrête — et un incendie possible des mois plus tard.",

  symboles: [
    { src: 'assets/cable_3wires.svg', alt: "Symbole normalisé d’un câble à trois conducteurs.", legende: "Un câble, trois conducteurs" },
    { src: 'assets/cable.svg', alt: "Symbole normalisé d’un câble.", legende: "Un câble" }
  ],
  lecturePlan: [
    "Sur un schéma, le câble est souvent réduit à un simple trait — la lettre de la <strong>station 8.1</strong>.",
    "Sa vraie description est ailleurs : dans le <strong>carnet de câbles</strong>, avec sa section, sa désignation et sa longueur.",
    "Quand plusieurs conducteurs suivent le même trajet, le plan peut les regrouper d’un trait oblique portant leur nombre."
  ],

  quiz: [
    { question: "Que protège le calibre d’un disjoncteur ?",
      confirmation: "Le conducteur, pas l’appareil au bout.",
      reponses: [
        { texte: "Le câble.", juste: true },
        { texte: "Le tableau électrique.", pourquoi: "Le tableau n’est pas l’objet de la protection : la ligne l’est." },
        { texte: "L’appareil branché au bout.", pourquoi: "L’appareil a sa propre protection s’il en a besoin : le disjoncteur protège la ligne." },
        { texte: "L’utilisateur.", pourquoi: "Les personnes sont protégées par le différentiel, pas par le calibre." } ] },

    { question: "Un câble trop chargé, que se passe-t-il ?",
      confirmation: "Il chauffe, l’isolant vieillit, puis lâche.",
      reponses: [
        { texte: "Il fond immédiatement.", pourquoi: "Il ne fond pas : il chauffe lentement, et c’est justement ce qui rend le danger discret." },
        { texte: "Il chauffe, et son isolant vieillit jusqu’à lâcher.", juste: true },
        { texte: "Rien tant que le disjoncteur ne déclenche pas.", pourquoi: "Justement : si le calibre est trop élevé, il ne déclenchera pas." },
        { texte: "La tension chute mais rien d’autre.", pourquoi: "La chute de tension existe, mais l’échauffement est le vrai danger." } ] },

    { question: "Dans quel ordre choisit-on section et calibre ?",
      confirmation: "La section d’abord, le calibre ensuite.",
      reponses: [
        { texte: "Selon le prix du cuivre.", pourquoi: "Le coût peut orienter un projet, mais jamais la règle de protection." },
        { texte: "Peu importe, les deux se valent.", pourquoi: "L’ordre est déterminant : la protection découle du conducteur." },
        { texte: "La section d’abord, puis le calibre.", juste: true },
        { texte: "Le calibre d’abord, puis la section adaptée.", pourquoi: "Ce serait choisir la protection avant de savoir ce qu’on protège." } ] },

    { question: "Quelles couleurs sont réservées ?",
      confirmation: "Bleu clair pour le neutre, vert et jaune pour le conducteur de protection.",
      reponses: [
        { texte: "Marron et gris.", pourquoi: "Également des couleurs de phase." },
        { texte: "Rouge et noir.", pourquoi: "Ce sont des couleurs de phase, utilisables librement." },
        { texte: "Aucune, c’est libre.", pourquoi: "Deux sont strictement réservées, et les employer ailleurs est une faute grave." },
        { texte: "Bleu clair, et vert-jaune.", juste: true } ] }
  ],

  retenir: [
    "<strong>C’est le câble qu’on protège.</strong> Toute la ligne 4 existe pour lui.",
    "<strong>Section d’abord, calibre ensuite.</strong> Jamais l’inverse.",
    "Un câble trop chargé chauffe, et l’isolant lâche des mois plus tard.",
    "<strong>Bleu clair et vert-jaune sont réservés.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que la protection se choisit d’après le conducteur, savoir lire une section et une désignation, et connaître les deux couleurs réservées.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 1, couleur: '#1b3a63', texte: "1.8 Surcharge et court-circuit" },
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.1 Le trait et le point" } ]
});
