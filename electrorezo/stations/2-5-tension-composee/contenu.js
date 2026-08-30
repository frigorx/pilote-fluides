/* ÉlectroRézo 2.5 — La tension composée. */

ModeleGrandeur.construire({
  id: '2.5', ligne: 2,
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 5',
  titre: "La tension composée",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/entre-phases-et-vers-le-neutre.jpeg',
      alt: "Schéma des trois phases et du neutre, où les tensions simples sont figurées par des flèches partant du neutre.",
      titre: "Le point de départ.", sous: "La composée, elle, ne passe pas par le neutre." },
    { src: 'assets/biblio/bobinages-en-etoile.jpeg',
      alt: "Schéma d’un transformateur triphasé couplé en étoile, avec ses trois bobinages et leurs tensions.",
      titre: "Les trois bobinages.", sous: "Entre deux extrémités, ce n’est pas deux fois une tension." }
  ],

  lIdee: "La tension composée, c’est celle qu’on mesure entre deux phases. En France, 400 volts. Et la question que tout le monde se pose : pourquoi 400, et pas 460, qui serait le double de 230 ?",
  ouOnLaRencontre: "C’est la tension de la puissance industrielle. Tous les moteurs d’atelier, tous les schémas de puissance, tous les gros appareils sont dessus.",

  scene: () => SchemasReseaux.etoileEtTriangle(),

  ceQuiSePasse: [
    ["Elle se note U", "et elle se mesure <strong>entre deux phases</strong>. Il y en a trois : U12, U23, U31."],
    ["Ce n’est pas le double de la simple", "parce que les deux tensions ne sont pas au maximum en même temps. Quand l’une est à son sommet, l’autre est déjà redescendue."],
    ["Le rapport vaut √3", "soit 1,73. C’est de la géométrie : sur le dessin, le côté du triangle est plus long que le rayon de l’étoile, dans ce rapport exact."],
    ["230 × 1,73 ≈ 400", "et cette relation vaut partout, quel que soit le réseau. Sur l’ancien réseau français à 127 volts, la composée était de 220 — le même rapport."]
  ],
  aRetenir: [
    "<strong>U</strong> pour la composée, <strong>V</strong> pour la simple. Deux lettres, deux grandeurs.",
    "<strong>U = V × √3</strong>, toujours.",
    "Une machine triphasée sans neutre ne connaît que la composée : c’est la seule tension qui l’intéresse."
  ],

  mesure: () => SchemasReseaux.verifierRacineDeTrois(),
  instrument: [
    "Une pointe sur <strong>chaque phase</strong>. Trois mesures, trois valeurs qui doivent être proches.",
    "C’est la mesure la plus fréquente en atelier : c’est elle qui dit si le réseau de puissance est présent.",
    "Un écart marqué entre les trois annonce un <strong>conducteur coupé</strong> ou une connexion desserrée en amont.",
    "Vérifiez le rapport : divisez une composée par la simple correspondante. Vous devez trouver <strong>1,73</strong>. Sinon, quelque chose ne va pas."
  ],
  dangerDeMesure: "400 volts n’est pas « un peu plus » que 230. C’est un domaine où l’arc s’amorce plus facilement et ne s’éteint pas seul. Catégorie de mesure et cordons doivent être à la hauteur.",

  ecriture: {
    symbole: 'U', unite: 'V', nomUnite: 'le volt',
    multiples: [
      ['U12, U23, U31', 'les trois tensions composées'],
      ['400 V', 'la valeur française — c’est 230 × 1,73'],
      ['√3 ≈ 1,73', 'le rapport, valable sur tous les réseaux']
    ]
  },
  surUnePlaque: [
    "Sur un <strong>plan</strong>, c’est la composée qui est écrite : <em>400 V</em>. La simple se déduit.",
    "Sur une <strong>notice</strong>, l’écriture <em>400 / 230 V</em> donne la composée d’abord.",
    "Sur une <strong>plaque de moteur</strong>, les deux tensions écrites ne sont ni l’une ni l’autre : elles disent ce que chaque <strong>bobinage</strong> doit recevoir. C’est un autre sujet, et c’est la station 6.4.",
    "Le facteur <strong>√3</strong> revient partout en triphasé : dans les tensions, dans les courants, dans le calcul des puissances. Il n’y a qu’une seule raison, et c’est celle que vous venez de voir."
  ],

  quiz: [
    { question: "Pourquoi la composée ne vaut-elle pas le double de la simple ?",
      confirmation: "Parce que les deux tensions ne sont pas au maximum en même temps.",
      reponses: [
        { texte: "Parce qu’il y a des pertes en ligne.", pourquoi: "Les pertes existent, mais elles n’expliquent pas un rapport aussi précis et constant." },
        { texte: "Parce qu’elles ne sont pas au maximum en même temps.", juste: true },
        { texte: "Parce que le neutre en absorbe une partie.", pourquoi: "Le neutre n’intervient pas dans une mesure entre deux phases." },
        { texte: "Parce que le transformateur abaisse la tension.", pourquoi: "Le transformateur fixe les deux valeurs, il n’explique pas leur rapport." } ] },

    { question: "Combien vaut le rapport entre composée et simple ?",
      confirmation: "√3, soit environ 1,73.",
      reponses: [
        { texte: "1,41.", pourquoi: "C’est √2, qui intervient ailleurs — entre valeur efficace et valeur crête." },
        { texte: "2.", pourquoi: "Ce serait le double : 230 × 2 donnerait 460, pas 400." },
        { texte: "1,73.", juste: true },
        { texte: "3.", pourquoi: "Cela donnerait 690 volts, qui est une autre tension de réseau." } ] },

    { question: "Sur l’ancien réseau français à 127 V simple, quelle était la composée ?",
      confirmation: "127 × 1,73, soit environ 220 volts.",
      reponses: [
        { texte: "254 V.", pourquoi: "C’est le double : le rapport n’est pas 2." },
        { texte: "127 V aussi.", pourquoi: "La composée est toujours plus grande que la simple." },
        { texte: "380 V.", pourquoi: "380 était la composée de l’ancien réseau 220 / 380, pas de celui à 127." },
        { texte: "220 V.", juste: true } ] },

    { question: "Une machine triphasée sans neutre : quelle tension la concerne ?",
      confirmation: "La composée seule : sans neutre, la simple n’existe pas pour elle.",
      reponses: [
        { texte: "La composée, 400 V.", juste: true },
        { texte: "La simple, 230 V.", pourquoi: "Sans neutre raccordé, elle n’y a pas accès." },
        { texte: "Les deux, alternativement.", pourquoi: "Elle ne voit que ce qui arrive sur ses trois bornes." },
        { texte: "Aucune : elle fabrique la sienne.", pourquoi: "Un moteur ne fabrique pas de tension." } ] }
  ],

  retenir: [
    "<strong>U</strong> : entre <strong>deux phases</strong>. 400 V.",
    "<strong>U = V × 1,73.</strong> Pas × 2.",
    "<strong>C’est de la géométrie</strong> : le côté du triangle contre le rayon de l’étoile.",
    "<strong>Une machine sans neutre</strong> ne connaît que la composée."
  ],

  objectifs: '<p><strong>Objectif.</strong> Définir la tension composée, comprendre d’où vient le facteur √3, et vérifier la cohérence d’un réseau par le rapport entre les deux tensions.</p><p><strong>Limite.</strong> La construction vectorielle complète n’est esquissée que par le dessin : la démonstration relève des mathématiques.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.4 La tension simple" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.7 Lire une plaque signalétique" } ]
});
