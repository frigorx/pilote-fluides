/* ÉlectroRézo 8.4 — Le rectangle. */

ModeleSigne.construire({
  id: '8.4',
  vue3d: { modele: 'cartouche', options: { type: 'gG' }, piece: 'lame' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 4',
  titre: "Le rectangle",
  lettre: 'rectangle',
  narration: NARRATION,

  prerequis: [
    { id: '4.1', quoi: "le fusible" },
    { id: '8.1', quoi: "le trait" },
  ],

  ceQuelleDit: "Un rectangle posé sur le trait du circuit : ici, le courant traverse quelque chose. Pas un appareil qui s’ouvre — un élément que le courant doit franchir.",
  ouOnLaVoit: "Sur les fusibles surtout, mais aussi sur les résistances et sur bien d’autres éléments insérés dans un circuit.",

  pourquoiCetteForme: [
    "<strong>C’est un signe économe</strong> : il sert à plusieurs choses, et c’est ce qui est dessiné dedans ou écrit à côté qui précise laquelle.",
    "<strong>Traversé par un trait dans sa longueur</strong> : c’est un fusible, et ce trait est l’élément calibré (un fil ou une lame) qui va fondre. Sans ce trait, c’est une résistance ou un élément quelconque.",
    "Cette économie est au cœur de l’écriture du schéma : <strong>plutôt qu’un dessin par objet, la norme réutilise les mêmes formes</strong> et ajoute des précisions. C’est ce qui rend un plan lisible sans dictionnaire.",
    "<strong>Le rectangle du fusible ne se commande pas.</strong> Il ne s’ouvre pas, il ne se ferme pas. Le courant le traverse, jusqu’au jour où il ne le traverse plus."
  ],

  /* L'interrupteur est un leurre de l'exercice : il n'a pas de rectangle, donc il n'est pas dans la carte « Les mots où elle entre ». */
  exercice: () => Signes.retrouver('rectangle', ['fusible', 'sectionneurFusible', 'interrupteur']),
  motsOuOnLaTrouve: ['fusible', 'sectionneurFusible'],
  motVedette: 'sectionneurFusible',

  symbolesBiblio: [
    { src: 'assets/pojistka3p.svg', alt: "Symbole normalisé de trois fusibles sur trois pôles, avec les chiffres de 1 à 6 écrits à côté des bornes.", legende: "Trois fusibles. Les chiffres 1 à 6 numérotent les bornes : 1 en haut et 2 en bas pour le premier fusible, 3 et 4 pour le deuxième, 5 et 6 pour le troisième" },
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé d’une bobine : un grand rectangle, plus large que haut, dont le fil s’arrête aux deux extrémités.", legende: "Une bobine : le fil s’arrête à ses deux extrémités, il ne la traverse pas" }
  ],
  duDessinAuPlan: [
    "Un fusible n’est <strong>presque jamais dessiné seul</strong> : à côté, on écrit son repère (F1), son calibre en ampères (16 A) et sa classe (gG, la protection générale, vue à la station 4.1). Exemple : <strong>F1 16 A gG</strong> se lit « le fusible F1, 16 ampères, protection générale ».",
    "<strong>Le dessin donne la fonction, le texte donne la valeur.</strong> Cette règle vaut pour toute l’écriture du schéma.",
    "Le rectangle du fusible et le rectangle de la bobine ne se confondent pas : celui de la bobine est un grand rectangle, plus large que haut : le fil s’arrête à ses deux extrémités, il ne le traverse pas."
  ],

  quiz: [
    { question: "Un rectangle traversé dans sa longueur par un trait, c’est…",
      confirmation: "Le trait intérieur est l’élément calibré qui va fondre.",
      reponses: [
        { texte: "Un fusible.", juste: true },
        { texte: "Un bornier de raccordement.", pourquoi: "Un bornier se dessine par de petits cercles alignés, avec les numéros de ses bornes." },
        { texte: "Une résistance chauffante.", pourquoi: "Une résistance se dessine par un rectangle sans ce trait intérieur." },
        { texte: "Une bobine de commande.", pourquoi: "La bobine est un rectangle plus large, sans trait à l’intérieur : le fil s’arrête à ses deux extrémités." } ] },

    { question: "Pourquoi la norme réutilise-t-elle la même forme pour plusieurs objets ?",
      confirmation: "Un alphabet court se retient ; un dictionnaire ne se retient pas.",
      reponses: [
        { texte: "Parce que ces objets sont électriquement identiques.", pourquoi: "Ils ne le sont pas du tout : un fusible et une résistance n’ont rien de commun." },
        { texte: "Pour qu’un petit nombre de formes suffise à tout écrire.", juste: true },
        { texte: "Pour économiser de l’encre à l’impression.", pourquoi: "L’encre n’a jamais dicté une norme de représentation." },
        { texte: "Parce que les dessinateurs manquaient d’imagination.", pourquoi: "C’est un choix délibéré, pas un manque : il rend le plan lisible." } ] },

    { question: "Que fait le rectangle d’un fusible quand on le commande ?",
      confirmation: "Rien : il n’y a rien à commander.",
      reponses: [
        { texte: "Il s’ouvre.", pourquoi: "Rien n’est mobile : ce n’est pas un contact." },
        { texte: "Il bascule.", pourquoi: "Aucun basculement : le courant le traverse, simplement." },
        { texte: "Rien : il n’y a rien à commander, le courant le traverse.", juste: true },
        { texte: "Il se ferme.", pourquoi: "Même raison : il n’y a pas de pièce mobile." } ] },

    { question: "À côté du rectangle d’un fusible, un plan écrit « 16 A gG ». Cela dit…",
      confirmation: "Le dessin donne la fonction, le texte donne la valeur.",
      reponses: [
        { texte: "Le numéro de repère de l’appareil.", pourquoi: "Le repère est une lettre suivie d’un chiffre — ici, ce serait F1 ou F2." },
        { texte: "La section du câble en aval.", pourquoi: "La section se lit dans le carnet de câbles, pas sur le symbole de la protection." },
        { texte: "La tension du circuit protégé.", pourquoi: "La tension s’écrit ailleurs, dans le bandeau d’identification du plan ou sur l’arrivée." },
        { texte: "Le calibre du fusible (16 A) et sa classe (gG).", juste: true } ] }
  ],

  retenir: [
    "<strong>Le rectangle = un élément inséré</strong> que le courant traverse.",
    "<strong>Avec un trait dans la longueur</strong> : un fusible.",
    "Le rectangle du fusible ne se commande pas, il ne s’ouvre pas.",
    "Le dessin donne la fonction, <strong>le texte à côté donne la valeur</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire le rectangle et ses variantes, comprendre pourquoi la norme réutilise les mêmes formes, et savoir que le texte accompagne presque toujours le dessin.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/10_fuses/ (pojistka3p.svg) · svg/10_electric/10_allpole/310_relays_contactors_contacts/01_coils/ (bobine3.svg)' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: "3.4 Le porte-fusible" },
    { ligne: 4, couleur: '#c0392b', texte: "4.1 Le fusible gG" } ]
});
