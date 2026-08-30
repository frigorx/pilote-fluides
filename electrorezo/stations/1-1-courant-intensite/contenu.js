/* ÉlectroRézo 1.1 — Le courant et l’intensité. */

ModeleGrandeur.construire({
  id: '1.1', ligne: 1,
  kicker: 'ÉlectroRézo · Ligne 1 Les grandeurs · Station 1',
  titre: "Le courant et l’intensité",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/pince-affichant-1000-A.jpeg',
      alt: "Photo d’une pince ampèremétrique dont l’écran affiche une valeur de courant de 1000 ampères.",
      titre: "Un nombre sur un écran.", sous: "C’est la seule façon de voir un courant." },
    { src: 'assets/biblio/pince-ouverte-autour-du-fil.jpeg',
      alt: "Schéma d’une pince ampèremétrique ouverte, enserrant le fil d’une bobine alimentée par une pile.",
      titre: "Sans rien toucher.", sous: "La pince entoure le fil et lit ce qui passe dedans." },
    { src: 'assets/biblio/effets-du-courant-sur-le-corps.jpeg',
      alt: "Courbe normalisée des zones temps-courant : effets du courant alternatif sur le corps humain, du seuil de perception à la fibrillation.",
      titre: "Pourquoi c’est lui qui compte.", sous: "Ce n’est pas la tension qui tue : c’est le courant, et le temps." }
  ],

  lIdee: "Un courant, c’est du monde qui circule dans un fil. Des charges électriques, toutes dans le même sens, poussées par la tension. L’intensité, elle, ne compte pas ce monde-là : elle compte combien il en passe chaque seconde.",
  ouOnLaRencontre: "Partout, et jamais à l’œil nu. Un courant ne se voit pas, ne se sent pas, ne s’entend pas. On ne le connaît que par ce qu’il fait — chauffer un fil, faire tourner un moteur, allumer une lampe — ou par ce qu’un appareil en dit.",

  scene: () => SchemasGrandeurs.debitDeCharges(),

  ceQuiSePasse: [
    ["Un débit, pas une quantité", "un ampère, ce n’est pas « une certaine quantité d’électricité ». C’est une quantité <strong>par seconde</strong>. Comme un débit d’eau, qui se compte en litres par minute et non en litres."],
    ["Les charges avancent lentement", "quelques millimètres par seconde, pas davantage. Ce qui va vite, c’est l’ordre de se mettre en marche — il se propage presque à la vitesse de la lumière. C’est pour cela que la lampe s’allume tout de suite."],
    ["Le courant est le même partout dans une boucle", "ce qui entre par un bout ressort par l’autre. Il ne s’use pas en chemin, il ne se consomme pas. On dit qu’il se conserve."],
    ["C’est lui qui fait chauffer", "un conducteur traversé s’échauffe, et cet échauffement grandit avec le <strong>carré</strong> de l’intensité. Doublez le courant : la chaleur est multipliée par quatre."]
  ],
  aRetenir: [
    "L’intensité se note <strong>I</strong> et se mesure en <strong>ampères</strong>.",
    "Elle ne dépend pas seulement de la source : elle dépend aussi de ce qu’on branche au bout.",
    "Une installation domestique tire quelques ampères ; un moteur d’atelier, quelques dizaines ; un court-circuit, plusieurs milliers."
  ],

  mesure: () => SchemasGrandeurs.brancherAmperemetre(),
  instrument: [
    "L’<strong>ampèremètre</strong> se branche <strong>en série</strong> : il faut ouvrir le circuit et l’y insérer.",
    "La <strong>pince ampèremétrique</strong> se contente d’entourer le conducteur. Elle ne touche rien, elle ne coupe rien : c’est l’instrument du dépanneur.",
    "Un seul conducteur à la fois dans la pince. Deux ensemble, et l’aller annule le retour : elle affiche presque zéro.",
    "Sur un moteur, on mesure les <strong>trois phases</strong> et on les compare. Un écart notable entre elles est déjà un diagnostic."
  ],
  dangerDeMesure: "Un ampèremètre branché en parallèle met la source en court-circuit. Sa résistance est presque nulle : c’est un fil. C’est l’erreur qui détruit le plus d’appareils en atelier.",

  ecriture: {
    symbole: 'I', unite: 'A', nomUnite: 'l’ampère',
    multiples: [
      ['1 mA', 'un millième d’ampère — le seuil de danger pour le corps humain est vers 30 mA'],
      ['1 A', 'l’unité — une lampe de 230 W en tire environ un'],
      ['1 kA', 'mille ampères — l’ordre de grandeur d’un court-circuit']
    ]
  },
  surUnePlaque: [
    "Sur la <strong>plaque d’un moteur</strong>, l’intensité absorbée est écrite à côté de chaque tension : <em>230 V — 6,65 A</em> et <em>400 V — 3,84 A</em>.",
    "Sur un <strong>disjoncteur</strong>, le nombre écrit à côté de la lettre est le calibre en ampères. C’est ce que le câble derrière peut supporter.",
    "Sur un <strong>câble</strong>, l’intensité admissible n’est pas écrite : elle se déduit de la section, du mode de pose et de l’isolant.",
    "Prenez l’habitude de lire l’ampère écrit avant de brancher quoi que ce soit. C’est le nombre qui décide de tout le reste."
  ],

  quiz: [
    { question: "Qu’est-ce que mesure exactement une intensité ?",
      confirmation: "Un débit : une quantité de charges par seconde.",
      reponses: [
        { texte: "La quantité de charges qui passe chaque seconde.", juste: true },
        { texte: "La force avec laquelle le courant pousse.", pourquoi: "C’est la tension qui pousse, pas l’intensité." },
        { texte: "La quantité d’électricité contenue dans le fil.", pourquoi: "Un fil ne « contient » pas une réserve : les charges y circulent." },
        { texte: "La vitesse des charges dans le conducteur.", pourquoi: "Les charges avancent très lentement — quelques millimètres par seconde." } ] },

    { question: "Où branche-t-on un ampèremètre ?",
      confirmation: "En série : il doit être traversé par le courant qu’il compte.",
      reponses: [
        { texte: "En parallèle, aux bornes de la charge.", pourquoi: "C’est la place du voltmètre. Un ampèremètre ainsi branché court-circuite la source." },
        { texte: "En série, dans le circuit.", juste: true },
        { texte: "Entre la phase et la terre.", pourquoi: "Ce serait créer volontairement un défaut d’isolement." },
        { texte: "N’importe où sur la boucle : le courant y est le même.", pourquoi: "Le courant est bien le même partout, mais l’appareil doit être <em>dans</em> la boucle, pas à côté." } ] },

    { question: "On double l’intensité dans un câble. Que devient l’échauffement ?",
      confirmation: "Il est multiplié par quatre : la chaleur suit le carré du courant.",
      reponses: [
        { texte: "Il double.", pourquoi: "L’échauffement ne suit pas le courant, il suit son carré." },
        { texte: "Il ne change pas.", pourquoi: "C’est justement le courant qui provoque l’échauffement." },
        { texte: "Il est multiplié par quatre.", juste: true },
        { texte: "Il est divisé par deux.", pourquoi: "Plus de courant ne peut pas réchauffer moins." } ] },

    { question: "Pourquoi une pince ampèremétrique n’affiche-t-elle presque rien si on enserre deux conducteurs ?",
      confirmation: "L’aller et le retour s’annulent — c’est le principe du différentiel.",
      reponses: [
        { texte: "Parce qu’elle n’est pas assez sensible.", pourquoi: "Sa sensibilité n’est pas en cause : le champ qu’elle voit est réellement nul." },
        { texte: "Parce qu’il faut la calibrer avant.", pourquoi: "Même parfaitement calibrée, elle afficherait la même chose." },
        { texte: "Parce que deux conducteurs, c’est trop épais pour elle.", pourquoi: "L’épaisseur n’a rien à voir avec la mesure." },
        { texte: "Parce que le courant aller et le courant retour s’annulent.", juste: true } ] }
  ],

  retenir: [
    "<strong>I</strong>, en <strong>ampères</strong>. C’est un débit : une quantité par seconde.",
    "<strong>En série</strong> pour l’ampèremètre. <strong>Autour du fil</strong> pour la pince.",
    "<strong>La chaleur suit le carré</strong> du courant.",
    "<strong>C’est le courant qui tue</strong>, pas la tension. Trente milliampères suffisent."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que l’intensité est un débit, savoir la mesurer en série et à la pince, et connaître les ordres de grandeur du métier.</p><p><strong>Limite.</strong> Le sens conventionnel du courant et le déplacement réel des électrons ne sont qu’évoqués : ils ne changent rien à la pratique.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 1, couleur: '#2e6f9e', texte: "1.3 La loi d’Ohm" },
    { ligne: 4, couleur: '#c0392b', texte: "4.9 Le câble et sa section" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.9 Mesurer" } ]
});
