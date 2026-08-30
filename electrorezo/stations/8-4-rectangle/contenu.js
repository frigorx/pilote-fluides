/* ÉlectroRézo 8.4 — Le rectangle. */

ModeleSigne.construire({
  id: '8.4',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 4',
  titre: "Le rectangle",
  lettre: 'rectangle',
  narration: NARRATION,

  ceQuelleDit: "Un rectangle posé sur le trait du circuit : ici, le courant traverse quelque chose. Pas un appareil qui s’ouvre — un élément que le courant doit franchir.",
  ouOnLaVoit: "Sur les fusibles surtout, mais aussi sur les résistances et sur bien d’autres éléments insérés dans un circuit.",

  pourquoiCetteForme: [
    "<strong>C’est un signe économe</strong> : il sert à plusieurs choses, et c’est ce qui est dessiné dedans ou écrit à côté qui précise laquelle.",
    "<strong>Traversé par un trait dans sa longueur</strong> : c’est un fusible, et ce trait est le fil calibré qui va fondre. Sans ce trait, c’est une résistance ou un élément quelconque.",
    "Cette économie est au cœur de l’écriture du schéma : <strong>plutôt qu’un dessin par objet, la norme réutilise les mêmes formes</strong> et ajoute des précisions. C’est ce qui rend un plan lisible sans dictionnaire.",
    "<strong>Le rectangle ne se commande pas.</strong> Il ne s’ouvre pas, il ne se ferme pas. Le courant le traverse, jusqu’au jour où il ne le traverse plus."
  ],

  motsOuOnLaTrouve: ['fusible', 'sectionneurFusible', 'interrupteur'],
  motVedette: 'sectionneurFusible',

  symbolesBiblio: [
    { src: 'assets/pojistka3p.svg', alt: "Symbole normalisé de trois fusibles sur trois pôles.", legende: "Trois fusibles" }
  ],
  duDessinAuPlan: [
    "Un fusible n’est <strong>jamais dessiné seul</strong> : à côté, on écrit son courant et sa lettre.",
    "<strong>Le dessin donne la fonction, le texte donne la valeur.</strong> Cette règle vaut pour toute l’écriture du schéma.",
    "Le rectangle du fusible et le rectangle de la bobine ne se confondent pas : celui de la bobine est plus large et barré en travers."
  ],

  quiz: [
    { question: "Un rectangle traversé dans sa longueur par un trait, c’est…",
      confirmation: "Le trait intérieur est le fil calibré.",
      reponses: [
        { texte: "Un fusible.", juste: true },
        { texte: "Un bornier de raccordement.", pourquoi: "Un bornier se dessine par des cercles ou des carrés alignés, avec leurs numéros." },
        { texte: "Une résistance chauffante.", pourquoi: "Une résistance se dessine par un rectangle sans ce trait intérieur." },
        { texte: "Une bobine de commande.", pourquoi: "La bobine est plus large et barrée en travers, pas dans la longueur." } ] },

    { question: "Pourquoi la norme réutilise-t-elle la même forme pour plusieurs objets ?",
      confirmation: "Un alphabet court se retient ; un dictionnaire ne se retient pas.",
      reponses: [
        { texte: "Parce que ces objets sont électriquement identiques.", pourquoi: "Ils ne le sont pas du tout : un fusible et une résistance n’ont rien de commun." },
        { texte: "Pour qu’un petit nombre de formes suffise à tout écrire.", juste: true },
        { texte: "Pour économiser de l’encre à l’impression.", pourquoi: "L’encre n’a jamais dicté une norme de représentation." },
        { texte: "Parce que les dessinateurs manquaient d’imagination.", pourquoi: "C’est un choix délibéré, pas un manque : il rend le plan lisible." } ] },

    { question: "Que fait le rectangle quand on le commande ?",
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
        { texte: "La tension du circuit protégé.", pourquoi: "La tension s’écrit ailleurs, dans le cartouche du folio ou sur l’arrivée." },
        { texte: "Le calibre de la cartouche et sa famille.", juste: true } ] }
  ],

  retenir: [
    "<strong>Le rectangle = un élément inséré</strong> que le courant traverse.",
    "<strong>Avec un trait dans la longueur</strong> : un fusible.",
    "Il ne se commande pas, il ne s’ouvre pas.",
    "Le dessin donne la fonction, <strong>le texte à côté donne la valeur</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire le rectangle et ses variantes, comprendre pourquoi la norme réutilise les mêmes formes, et savoir que le texte accompagne toujours le dessin.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/10_fuses/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 3, couleur: '#5b4bd6', texte: "3.4 Le porte-fusible" },
    { ligne: 4, couleur: '#c0392b', texte: "4.1 Le fusible gG" } ]
});
