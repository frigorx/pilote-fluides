/* ÉlectroRézo 8.7 — Le pointillé. */

ModeleSigne.construire({
  id: '8.7',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 7',
  titre: "Le pointillé",
  lettre: 'pointille',
  narration: NARRATION,

  ceQuelleDit: "Une ligne interrompue qui ne conduit aucun courant. Elle dit : ces deux pièces sont solidaires mécaniquement, même si elles sont loin l’une de l’autre sur le plan.",
  ouOnLaVoit: "Entre la bobine d’un contacteur et ses contacts, entre un bilame et le contact qu’il commande, partout où un appareil a plusieurs morceaux dispersés.",

  pourquoiCetteForme: [
    "<strong>Dans un contacteur, la bobine et les contacts sont accrochés à la même pièce mobile.</strong> Ils bougent forcément ensemble.",
    "<strong>Mais sur un schéma, ils ne sont presque jamais au même endroit</strong> : la bobine est dans le circuit de commande, les contacts dans le circuit de puissance, parfois deux pages plus loin.",
    "<strong>Le pointillé dit ce lien</strong> : ce n’est pas un fil, c’est une liaison mécanique.",
    "<strong>Quand vous voyez un pointillé, arrêtez-vous</strong> : il y a un morceau de cet appareil ailleurs. C’est la lettre qui apprend qu’un schéma se lit dans les deux sens."
  ],

  motsOuOnLaTrouve: ['contacteur', 'fusible', 'sectionneur'],
  motVedette: 'contacteur',

  symbolesBiblio: [
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé d’une bobine de contacteur.", legende: "Une bobine" },
    { src: 'assets/bobine_tempo_travail.svg', alt: "Symbole normalisé d’une bobine temporisée au travail.", legende: "Une bobine temporisée" }
  ],
  duDessinAuPlan: [
    "Sur les vrais plans, ce pointillé est <strong>souvent remplacé par un repère identique</strong> écrit à deux endroits : la bobine porte KM1, les contacts aussi.",
    "<strong>Le lien n’est plus dessiné, il est écrit.</strong> Vous rencontrerez les deux façons.",
    "C’est justement l’objet de la station 8.9, sur les repères."
  ],

  quiz: [
    { question: "Que transporte un pointillé sur un schéma ?",
      confirmation: "Rien : ce n’est pas un conducteur.",
      reponses: [
        { texte: "De l’air comprimé.", pourquoi: "Les circuits pneumatiques ont leur propre représentation, dans une autre famille de symboles." },
        { texte: "Un signal de mesure.", pourquoi: "Un signal se transporte aussi par un conducteur, en trait plein." },
        { texte: "Un courant faible, de commande.", pourquoi: "Le courant de commande passe dans des fils, dessinés en trait plein." },
        { texte: "Aucun courant : c’est une liaison mécanique.", juste: true } ] },

    { question: "Pourquoi la bobine d’un contacteur et ses contacts sont-ils dessinés loin l’un de l’autre ?",
      confirmation: "Ils appartiennent à deux circuits différents : commande et puissance.",
      reponses: [
        { texte: "Parce qu’ils appartiennent à deux circuits différents.", juste: true },
        { texte: "Par habitude des dessinateurs.", pourquoi: "C’est une règle d’organisation, pas une habitude." },
        { texte: "Parce qu’ils sont physiquement éloignés dans l’armoire.", pourquoi: "Ils sont dans le même boîtier, à quelques centimètres l’un de l’autre." },
        { texte: "Pour occuper la page de façon équilibrée.", pourquoi: "La mise en page ne dicte jamais l’emplacement d’un symbole." } ] },

    { question: "Vous voyez un pointillé partant d’un contact vers le bord de la page. Que faites-vous ?",
      confirmation: "Un morceau de l’appareil est ailleurs : on va le chercher.",
      reponses: [
        { texte: "Je relie les deux traits pour compléter le circuit.", pourquoi: "Ce n’est pas un circuit : relier reviendrait à inventer un fil qui n’existe pas." },
        { texte: "Je cherche l’autre morceau de l’appareil ailleurs dans le dossier.", juste: true },
        { texte: "Je considère que le plan est incomplet.", pourquoi: "Le plan est complet : il vous dit précisément d’aller voir plus loin." },
        { texte: "J’ignore le pointillé, il n’est pas électrique.", pourquoi: "Il n’est pas électrique, mais il porte une information capitale." } ] },

    { question: "Un fusible porte-t-il un pointillé ?",
      confirmation: "Il est tout entier au même endroit.",
      reponses: [
        { texte: "Oui, vers son porte-fusible.", pourquoi: "Le porte-fusible et la cartouche se dessinent d’un seul symbole." },
        { texte: "Cela dépend du calibre.", pourquoi: "Le calibre ne change rien à la représentation." },
        { texte: "Non : il est tout entier au même endroit.", juste: true },
        { texte: "Oui, vers le voyant de fusion.", pourquoi: "Quand un voyant existe, il se dessine à part, avec son propre repère." } ] }
  ],

  retenir: [
    "<strong>Le pointillé = une liaison mécanique.</strong> Aucun courant n’y passe.",
    "Il dit que <strong>des pièces éloignées sur le plan bougent ensemble</strong>.",
    "Il vous oblige à <strong>chercher ailleurs</strong> dans le dossier.",
    "Il est parfois remplacé par un repère identique écrit deux fois."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que le pointillé n’est pas un fil mais une solidarité mécanique, et qu’il oblige à lire le dossier dans les deux sens.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/01_coils/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: "5.2 Le contacteur" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.9 Les repères" } ]
});
