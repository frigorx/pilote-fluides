/* ÉlectroRézo 8.9 — Les repères. */

ModeleSigne.construire({
  id: '8.9',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 9',
  titre: "Les repères",
  lettre: 'borne',
  narration: NARRATION,

  ceQuelleDit: "Q1, KM2, F3, S1, H4. Des lettres et des chiffres, écrits à côté de chaque symbole. Ce ne sont pas des noms choisis au hasard : ce sont des codes.",
  ouOnLaVoit: "À côté de chaque appareil sur le plan, et sur l’étiquette collée sur l’appareil dans l’armoire.",

  pourquoiCetteForme: [
    "<strong>La lettre dit la famille</strong> : <strong>Q</strong> ce qui coupe la puissance · <strong>KM</strong> un contacteur · <strong>F</strong> une protection · <strong>S</strong> un organe de commande manuelle · <strong>H</strong> un voyant.",
    "<strong>Le chiffre ne fait que numéroter</strong> : le premier, le deuxième. Il ne dit rien d’autre.",
    "<strong>Premier usage : retrouver l’appareil</strong> dans l’armoire. Le repère est sur le plan et sur l’étiquette.",
    "<strong>Second usage, plus subtil : relier des morceaux dispersés.</strong> La bobine KM1 en commande et un contact KM1 en puissance, c’est le même appareil — même sans pointillé.",
    "<strong>Les numéros de bornes portent eux aussi l’information</strong> : 13-14 pour un contact ouvert au repos, 21-22 pour un contact fermé au repos."
  ],

  motsOuOnLaTrouve: ['contacteur', 'sectionneur', 'relaisThermique'],
  motVedette: 'contacteur',

  symbolesBiblio: [
    { src: 'assets/borne_3.svg', alt: "Symbole normalisé d’une borne de raccordement numérotée.", legende: "Une borne repérée" }
  ],
  duDessinAuPlan: [
    "Sur un plan bien fait, <strong>le repère est toujours du même côté du symbole, à la même distance</strong>. Ce n’est pas de la coquetterie : c’est ce qui rend un dossier lisible par quelqu’un qui ne l’a pas dessiné.",
    "<strong>Sur l’armoire, chaque appareil porte la même étiquette.</strong> Le plan et la machine se parlent.",
    "Un appareil sans repère sur un plan est un défaut de dossier, pas un oubli sans conséquence."
  ],

  quiz: [
    { question: "Un appareil repéré KM1 sur un plan, c’est…",
      confirmation: "KM est la lettre des contacteurs.",
      reponses: [
        { texte: "Un moteur.", pourquoi: "Un moteur porte M." },
        { texte: "Un contacteur.", juste: true },
        { texte: "Un sectionneur.", pourquoi: "Un appareil de coupure de puissance porterait Q." },
        { texte: "Un fusible.", pourquoi: "Une protection porte F." } ] },

    { question: "À quoi sert surtout le repère, au-delà de nommer l’appareil ?",
      confirmation: "À relier des morceaux dessinés à des endroits différents.",
      reponses: [
        { texte: "À classer les appareils par prix.", pourquoi: "Rien dans un schéma ne renseigne sur le coût du matériel." },
        { texte: "À indiquer la date de pose.", pourquoi: "Aucune information de temps n’entre dans un repère." },
        { texte: "À relier des morceaux du même appareil dessinés loin l’un de l’autre.", juste: true },
        { texte: "À donner l’ordre de câblage.", pourquoi: "L’ordre de câblage se lit dans le dossier de montage, pas dans la numérotation." } ] },

    { question: "Un contact porte les numéros 21 et 22. Que savez-vous de lui ?",
      confirmation: "Les chiffres de bornes portent l’information : 21-22 est fermé au repos.",
      reponses: [
        { texte: "Il supporte 21 ampères.", pourquoi: "Le courant ne s’écrit jamais dans un numéro de borne." },
        { texte: "Il est ouvert au repos.", pourquoi: "Un contact ouvert au repos porte 13-14." },
        { texte: "C’est le vingt-et-unième appareil du plan.", pourquoi: "La numérotation des appareils se fait dans le repère, pas aux bornes." },
        { texte: "Il est fermé au repos.", juste: true } ] },

    { question: "Sur un plan, un appareil n’a aucun repère. C’est…",
      confirmation: "Le repère fait partie du dossier, pas de la décoration.",
      reponses: [
        { texte: "Un défaut de dossier.", juste: true },
        { texte: "Le signe qu’il est en attente de pose.", pourquoi: "Un appareil non posé se signale autrement, en général par une note." },
        { texte: "Sans importance, le symbole suffit.", pourquoi: "Le symbole dit la fonction, pas quel appareil physique il désigne dans l’armoire." },
        { texte: "Normal pour les petits appareils.", pourquoi: "Tous les appareils sont repérés, quelle que soit leur taille." } ] }
  ],

  retenir: [
    "<strong>La lettre dit la famille</strong> : Q, KM, F, S, H.",
    "<strong>Le chiffre ne fait que numéroter.</strong>",
    "Un même repère à deux endroits = <strong>le même appareil</strong>.",
    "<strong>13-14</strong> : ouvert au repos. <strong>21-22</strong> : fermé au repos."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire les repères d’appareils et les numéros de bornes, et s’en servir pour relier les morceaux dispersés d’un même appareil dans un dossier.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/130_terminals_terminal_strips/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: "5.9 Lire un schéma" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.7 Le pointillé" } ]
});
