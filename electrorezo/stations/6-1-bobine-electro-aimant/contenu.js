/* ÉlectroRézo 6.1 — La bobine et l’électro-aimant. */

ModeleAppareil.construire({
  id: '6.1', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station 1',
  titre: "La bobine et l’électro-aimant",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/constitution-du-contacteur.png',
      alt: "Planche détaillant la constitution d’un contacteur : la fixation, l’électro-aimant, la bobine et les contacts.",
      titre: "Où on la trouve.", sous: "Dans un contacteur, c’est elle qui fait tout le travail." },
    { src: 'assets/biblio/bobine-et-ressort.jpeg',
      alt: "Schéma technique d’un contacteur montrant la bobine, le ressort de rappel et le circuit magnétique.",
      titre: "Bobine et ressort.", sous: "Deux forces opposées : l’aimant tire, le ressort résiste." }
  ],

  aQuoiCaSert: "À transformer du courant en force. Un fil enroulé autour d’un morceau de fer, et voilà un aimant qu’on peut allumer et éteindre. C’est le point de départ de toute la ligne 6 — et de la moitié de la ligne 5.",
  ouOnLeTrouve: "Dans un contacteur, un relais, un électro-aimant de porte, une électrovanne, un frein de moteur. Chaque fois qu’un courant doit produire un mouvement franc, il y a une bobine.",

  scene: () => SchemasMachines.electroAimant(),

  technologie: [
    ["Le bobinage", "du fil de cuivre émaillé, enroulé des centaines ou des milliers de fois. Plus il y a de spires, plus l’effet est fort pour un même courant."],
    ["Le noyau de fer", "il canalise le champ magnétique. Sans lui, la bobine attirerait à peine ; avec lui, la force est multipliée par plusieurs centaines."],
    ["L’entrefer", "l’espace entre la partie fixe et la partie mobile. Plus il est grand, plus la force est faible — d’où le fait qu’un électro-aimant colle brusquement plutôt que progressivement."],
    ["Le ressort de rappel", "il s’oppose à l’aimant. C’est lui qui décide du seuil : en dessous, rien ne bouge ; au-dessus, tout colle d’un coup."]
  ],

  variantes: [
    "<strong>Bobine en courant continu</strong> — la force est stable. Elle appelle un courant constant, et il faut une diode pour absorber la surtension de coupure.",
    "<strong>Bobine en courant alternatif</strong> — elle appelle beaucoup plus au moment où elle colle qu’une fois collée. C’est pour cela qu’un contacteur qui vibre chauffe.",
    "<strong>La bague de déphasage</strong> — un anneau de cuivre serti dans le noyau des bobines alternatives. Sans elle, l’attraction s’annulerait cent fois par seconde et l’appareil vibrerait.",
    "<strong>L’électrovanne</strong> — la même bobine, mais qui déplace un clapet au lieu d’un contact. On la rencontre partout en froid et en climatisation."
  ],
  reglage: "Une bobine ne se règle pas : elle se choisit. La seule chose à vérifier est sa <strong>tension</strong>, et elle est écrite dessus. Une bobine 24 V sur du 230 V grille en une seconde ; une bobine 230 V sur du 24 V ne colle jamais et se met à ronfler.",

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'Les trois questions de la ligne 6. Cochez ce que la bobine sait faire, puis validez.',
  aptitudes: {
    mouvement: true, tension: false, alternatif: false,
    bonneReponse: 'Exact. Elle produit du mouvement, elle ne change aucune tension, et elle fonctionne aussi bien en continu qu’en alternatif — c’est ce qui la distingue du transformateur, qui est pourtant fait du même cuivre autour du même fer.',
    erreurs: {
      mouvement: 'C’est sa raison d’être : elle attire une armature, et ce mouvement ferme des contacts ou ouvre un clapet.',
      tension: 'Elle ne fabrique aucune tension de sortie : elle a deux bornes, et rien d’autre.',
      alternatif: 'Elle fonctionne dans les deux régimes. Un électro-aimant en continu attire tout aussi bien — mieux, même, car son attraction est stable.'
    }
  },

  cablage: [
    "Deux bornes, repérées <strong>A1</strong> et <strong>A2</strong>. Elles ne sont pas polarisées en alternatif ; en continu, vérifiez si le constructeur impose un sens.",
    "Sur une bobine en <strong>continu</strong>, posez une <strong>diode de roue libre</strong> en parallèle, dans le sens qui bloque. Elle absorbe la surtension au moment de la coupure.",
    "Sans cette diode, la surtension peut atteindre plusieurs centaines de volts et détruire le transistor ou le contact qui l’a commandée.",
    "Une bobine qui <strong>ronfle</strong> annonce un entrefer encrassé, une bague de déphasage cassée, ou une tension trop faible. Ce n’est jamais normal."
  ],
  piege: "Une bobine chaude n’est pas forcément en défaut : elles chauffent toutes. Mais une bobine <strong>qui ronfle</strong> l’est toujours. Le bruit veut dire que l’attraction s’annule à chaque alternance — et l’appareil s’use très vite.",

  symboles: [
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé d’une bobine : un rectangle traversé par le conducteur.", legende: "La bobine" },
    { src: 'assets/electrovanne.svg', alt: "Symbole normalisé d’une électrovanne : une bobine agissant sur un clapet.", legende: "L’électrovanne" }
  ],
  lecturePlan: [
    "Le symbole de la bobine est le <strong>rectangle</strong> que vous connaissez depuis la station 8.8 : un cadre traversé par le conducteur.",
    "Ce qui change d’un usage à l’autre, c’est le <strong>repère</strong> : KM pour un contacteur, KA pour un relais, YV pour une électrovanne.",
    "Un <strong>Y</strong> en tête de repère annonce toujours un actionneur : quelque chose va bouger physiquement.",
    "Et la <strong>tension de bobine</strong> n’est jamais dans le dessin. Elle est écrite à côté — c’est la règle que vous connaissez : le dessin donne la fonction, le texte donne la valeur."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "Que fait le noyau de fer dans un électro-aimant ?",
      confirmation: "Il canalise le champ, et multiplie la force par plusieurs centaines.",
      reponses: [
        { texte: "Il isole la bobine.", pourquoi: "Le fer conduit l’électricité : c’est l’émail du fil qui isole." },
        { texte: "Il limite le courant.", pourquoi: "Le courant est fixé par la résistance et la tension." },
        { texte: "Il canalise le champ magnétique.", juste: true },
        { texte: "Il évacue la chaleur.", pourquoi: "Il en évacue un peu, mais ce n’est pas sa fonction." } ] },

    { question: "Pourquoi pose-t-on une diode sur une bobine alimentée en continu ?",
      confirmation: "Pour absorber la surtension au moment de la coupure.",
      reponses: [
        { texte: "Pour redresser le courant.", pourquoi: "Il est déjà continu." },
        { texte: "Pour signaler que la bobine est alimentée.", pourquoi: "C’est le rôle d’un voyant." },
        { texte: "Pour limiter le courant d’appel.", pourquoi: "Ce serait le rôle d’une résistance." },
        { texte: "Pour absorber la surtension de coupure.", juste: true } ] },

    { question: "Une bobine ronfle. Que faut-il en penser ?",
      confirmation: "Ce n’est jamais normal : entrefer encrassé, bague cassée, ou tension trop faible.",
      reponses: [
        { texte: "C’est un défaut : entrefer, bague, ou tension.", juste: true },
        { texte: "C’est un signe de bon fonctionnement.", pourquoi: "Le bruit annonce une attraction qui s’annule à chaque alternance." },
        { texte: "C’est sans conséquence.", pourquoi: "L’appareil s’use très vite dans cet état." },
        { texte: "C’est normal en alternatif.", pourquoi: "La bague de déphasage existe justement pour que ça ne ronfle pas." } ] },

    { question: "Une bobine 24 V alimentée en 230 V : que se passe-t-il ?",
      confirmation: "Elle grille en une seconde.",
      reponses: [
        { texte: "Elle colle plus fort.", pourquoi: "Elle colle, en effet — puis elle brûle." },
        { texte: "Elle grille.", juste: true },
        { texte: "Rien : la tension n’a pas d’importance.", pourquoi: "C’est la seule caractéristique vraiment critique d’une bobine." },
        { texte: "Elle ronfle.", pourquoi: "Le ronflement vient d’une tension trop faible, pas trop forte." } ] }
  ],

  retenir: [
    "<strong>Du courant en force.</strong> C’est le point de départ de tout.",
    "<strong>Il y a un seuil</strong> : en dessous rien ne bouge, au-dessus tout colle.",
    "<strong>La force suit le carré</strong> du courant.",
    "<strong>Vérifiez la tension écrite dessus.</strong> C’est la seule chose critique."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre comment un courant produit une force, connaître le rôle du noyau, du ressort et de l’entrefer, et savoir choisir une bobine.</p><p><strong>Limite.</strong> Le calcul des circuits magnétiques n’est pas abordé.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 5, couleur: '#0f7b6c', texte: "5.2 Le contacteur" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.8 La bobine et le rond" },
    { ligne: 6, couleur: '#c9451a', texte: "6.2 Le transformateur" } ]
});
