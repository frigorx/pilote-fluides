/* ÉlectroRézo 7.2 — Le variateur de tension. */

ModeleAppareil.construire({
  id: '7.2', ligne: 7,
  kicker: 'ÉlectroRézo · Ligne 7 Faire varier · Station 2',
  titre: "Le variateur de tension",
  narration: NARRATION,

  photos: [
    { src: 'assets/gradateur-en-coupe.svg',
      alt: "Le principe du gradateur : un interrupteur électronique en série sur la phase, commandé à chaque alternance, qui laisse passer la fin de l’onde et coupe le début.",
      titre: "Un interrupteur très rapide.", sous: "Il ouvre et ferme cent fois par seconde." }
  ],
  creditPhoto: 'Coupe dessinée pour cette station. Détail dans « Crédits ».',

  aQuoiCaSert: "À régler ce qui chauffe et ce qui éclaire. Une résistance, une lampe, une plaque : on découpe l’onde, la valeur efficace baisse, et la puissance suit.",
  ouOnLeTrouve: "Dans les variateurs de lumière, dans les régulations de résistances de chauffage, dans les démarreurs progressifs de moteurs — et là, pour une raison bien précise.",

  scene: () => SchemasMachines.ondeDecoupee(),

  technologie: [
    ["Le triac", "un interrupteur électronique sans pièce mobile. Il se ferme quand on lui envoie une impulsion, et il se rouvre tout seul au passage suivant par zéro."],
    ["Le passage par zéro", "c’est lui qui rend le montage possible. Le triac n’a pas besoin de savoir s’ouvrir : le courant s’annule cent fois par seconde et le lâche."],
    ["L’angle de retard", "on choisit à quel moment de chaque alternance on ferme. Plus on attend, moins il passe de courant, plus la valeur efficace est basse."],
    ["Le radiateur", "un triac chauffe. Presque tous les gradateurs ont une plaque d’aluminium à ailettes, et il faut la laisser respirer."]
  ],

  variantes: [
    "<strong>Le gradateur d’éclairage</strong> — le cas domestique. Attention : les modèles anciens ne conviennent pas aux lampes à LED.",
    "<strong>La régulation de résistance</strong> — sur un chauffage, on module la puissance en continu au lieu d’allumer et d’éteindre.",
    "<strong>Le démarreur progressif</strong> — il monte la tension progressivement au démarrage d’un moteur, puis passe à pleine tension. Il ne règle pas la vitesse : il adoucit le départ.",
    "<strong>Le train d’ondes</strong> — variante qui laisse passer des périodes entières et en supprime d’autres. Moins perturbant, mais inutilisable en éclairage : ça clignote."
  ],
  reglage: "Le réglage se fait sur l’<strong>angle de retard</strong>, souvent par un potentiomètre ou un signal de commande. Ce qu’on règle n’est jamais une tension directement : c’est un instant dans l’alternance. La tension efficace en découle.",

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'Les trois questions, pour un gradateur.',
  aptitudes: {
    mouvement: false, tension: true, alternatif: true,
    bonneReponse: 'Exact. Rien ne bouge, il change bien la tension efficace, et il lui faut absolument l’alternatif — c’est le passage par zéro qui referme son interrupteur. En continu, un triac fermé ne se rouvrirait jamais.',
    erreurs: {
      mouvement: 'Aucune pièce mobile : c’est tout l’intérêt de l’électronique de puissance.',
      tension: 'Il change la valeur efficace, en découpant. C’est bien un changement de tension, obtenu autrement qu’avec un transformateur.',
      alternatif: 'Le triac compte sur le passage par zéro pour se rouvrir. En continu, il resterait fermé indéfiniment.'
    }
  },

  cablage: [
    "Il se monte <strong>en série</strong> sur la phase, comme un interrupteur. Jamais en parallèle.",
    "Vérifiez la <strong>nature de la charge</strong> : résistive, inductive, ou à LED. Ce n’est pas la même électronique, et un gradateur mal choisi grille.",
    "Respectez la <strong>puissance minimale</strong> autant que la maximale : beaucoup de gradateurs ne fonctionnent pas correctement en dessous d’un certain niveau.",
    "Laissez de la place autour du <strong>radiateur</strong>. Un gradateur encastré dans une boîte fermée déclasse fortement, parfois de moitié."
  ],
  piege: "Un gradateur <strong>ne convient pas à un moteur</strong>, sauf s’il est explicitement prévu pour. Sur un moteur asynchrone, il fait exactement ce que la station 7.1 a montré : le couple s’écroule, l’intensité monte, et le moteur chauffe.",

  symboles: [
    { src: 'assets/ac1_ac1.svg', alt: "Symbole normalisé d’un convertisseur alternatif vers alternatif.", legende: "Alternatif vers alternatif" },
    { src: 'assets/regulator_ind_3f_2.svg', alt: "Symbole normalisé d’un régulateur triphasé.", legende: "Régulateur triphasé" }
  ],
  lecturePlan: [
    "Le symbole des convertisseurs est un <strong>rectangle barré en diagonale</strong>. De part et d’autre de la diagonale, deux signes disent ce qui entre et ce qui sort.",
    "Pour un gradateur : le signe de l’<strong>alternatif des deux côtés</strong>. Il entre de l’alternatif, il sort de l’alternatif.",
    "Cette écriture est très commode : elle vous dit d’un coup d’œil ce que fait n’importe quel convertisseur, y compris ceux que vous ne connaissez pas.",
    "Comparez avec le variateur de fréquence de la station 7.4 : même famille de symbole, mais ce qui est écrit à l’intérieur n’est pas la même chose."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "Comment un triac se rouvre-t-il ?",
      confirmation: "Tout seul, au passage du courant par zéro.",
      reponses: [
        { texte: "Par une impulsion de commande.", pourquoi: "L’impulsion sert à le fermer, pas à l’ouvrir." },
        { texte: "Tout seul, au passage par zéro.", juste: true },
        { texte: "Par un ressort de rappel.", pourquoi: "Il n’a aucune pièce mobile." },
        { texte: "Quand il chauffe trop.", pourquoi: "S’il chauffe trop, il se détruit — il ne s’ouvre pas." } ] },

    { question: "Où se monte un gradateur ?",
      confirmation: "En série sur la phase, comme un interrupteur.",
      reponses: [
        { texte: "En parallèle sur la charge.", pourquoi: "Il court-circuiterait la charge." },
        { texte: "Entre la phase et la terre.", pourquoi: "Ce serait créer un défaut d’isolement." },
        { texte: "En série sur la phase.", juste: true },
        { texte: "Sur le neutre.", pourquoi: "On ne coupe pas le neutre en amont d’une charge." } ] },

    { question: "Peut-on régler la vitesse d’un moteur asynchrone avec un gradateur ?",
      confirmation: "Non : le couple s’écroule et la vitesse ne bouge presque pas.",
      reponses: [
        { texte: "Oui, avec un condensateur en plus.", pourquoi: "Le condensateur n’intervient pas dans ce problème." },
        { texte: "Oui, dans une plage limitée.", pourquoi: "La vitesse varie de quelques tours seulement, avant que le moteur ne cale." },
        { texte: "Oui, s’il est triphasé.", pourquoi: "Le nombre de phases ne change rien à ce comportement." },
        { texte: "Non.", juste: true } ] },

    { question: "Un gradateur est encastré dans une boîte fermée. Quelle conséquence ?",
      confirmation: "Il déclasse : sa puissance admissible chute, parfois de moitié.",
      reponses: [
        { texte: "Il déclasse fortement.", juste: true },
        { texte: "Aucune, s’il est bien câblé.", pourquoi: "L’évacuation de la chaleur est une contrainte à part entière." },
        { texte: "Il fonctionne mieux, à l’abri.", pourquoi: "Le confinement empêche justement le refroidissement." },
        { texte: "Il change de fréquence.", pourquoi: "Un gradateur ne touche jamais à la fréquence." } ] }
  ],

  retenir: [
    "<strong>Un interrupteur électronique</strong>, cent fois par seconde.",
    "<strong>Il découpe</strong>, il n’abaisse pas.",
    "<strong>Pour ce qui chauffe et ce qui éclaire.</strong> Pas pour un moteur.",
    "<strong>Il chauffe</strong> : laissez respirer son radiateur."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre le principe du découpage, savoir où un gradateur se monte, et connaître les charges qui lui conviennent.</p><p><strong>Limite.</strong> Les harmoniques engendrées et leur traitement ne sont qu’évoqués.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 7, couleur: '#0b7285', texte: "7.1 Faire varier la tension" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.9 Mesurer" },
    { ligne: 7, couleur: '#0b7285', texte: "7.4 Le variateur de fréquence" } ]
});
