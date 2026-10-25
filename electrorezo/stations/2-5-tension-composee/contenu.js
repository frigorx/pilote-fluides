/* ÉlectroRézo 2.5 — La tension composée. */

ModeleGrandeur.construire({
  id: '2.5', ligne: 2,
  vue3d: { modele: 'etoile' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 5',
  titre: "La tension composée",
  narration: NARRATION,

  prerequis: [
    { id: '2.4', quoi: "la tension simple" },
  ],

  photos: [
    { src: 'assets/biblio/bobinages-en-etoile.jpeg',
      alt: "Schéma d’un transformateur triphasé couplé en étoile, avec ses trois bobinages.",
      titre: "Les trois bobinages.", sous: "Entre deux extrémités, ce n’est pas deux fois une tension." }
  ],

  lIdee: "La tension composée, c’est celle qu’on mesure entre deux phases. En France, 400 volts. Et la question que tout le monde se pose : pourquoi 400, et pas 460, qui serait le double de 230 ?",
  ouOnLaRencontre: "C’est la tension de la puissance industrielle. La plupart des moteurs d’atelier, des schémas de puissance et des gros appareils sont dessus.",

  scene: () => SchemasReseaux.etoileEtTriangle(),

  ceQuiSePasse: [
    ["Elle se note U", "et elle se mesure <strong>entre deux phases</strong>. Il y en a trois : U12, U23, U31."],
    ["Ce n’est pas le double de la simple", "parce que les deux tensions ne sont pas opposées : quand l’une est à son maximum, l’autre n’est pas à son minimum. Opposées (180°), leur différence serait le double ; décalées de 120°, elle vaut 1,73 fois la simple."],
    ["Le rapport vaut √3", "soit 1,73. C’est de la géométrie : sur le dessin, le côté du triangle est plus long que le rayon de l’étoile, dans ce rapport exact."],
    ["230 × 1,73 ≈ 400", "et cette relation vaut sur tout réseau triphasé équilibré, quel que soit le pays. Sur l’ancien réseau français à 127 volts, la composée était de 220 — le même rapport."]
  ],
  aRetenir: [
    "<strong>U</strong> pour la composée, <strong>V</strong> pour la simple. Deux lettres, deux grandeurs.",
    "<strong>U = V × √3</strong>, sur un réseau équilibré.",
    "Entre deux fils de phase qui arrivent sur une machine sans neutre, on mesure la composée : 400 V."
  ],

  mesure: () => SchemasReseaux.verifierRacineDeTrois(),
  instrument: [
    "Une pointe sur <strong>chaque phase</strong>. Trois mesures, trois valeurs qui doivent être proches.",
    "C’est la mesure la plus fréquente en atelier : c’est elle qui dit si le réseau de puissance est présent.",
    "Un écart marqué entre les trois annonce un <strong>conducteur coupé</strong> ou une connexion desserrée en amont.",
    "Vérifiez le rapport : divisez une composée par la simple correspondante. <strong>Exemple résolu</strong> : 398 ÷ 230 = 1,73. Vous devez trouver environ <strong>1,7</strong> (entre 1,70 et 1,76) ; nettement autre chose, et quelque chose ne va pas."
  ],
  dangerDeMesure: "400 volts n’est pas « un peu plus » que 230. C’est un domaine où l’arc s’amorce plus facilement et peut ne pas s’éteindre seul. Appareil et cordons doivent être au moins CAT III 600 V (NF EN 61010), le marquage usuel pour une armoire en 400 V.",

  ecriture: {
    symbole: 'U', unite: 'V', nomUnite: 'le volt',
    multiples: [
      ['U12, U23, U31', 'les trois tensions composées'],
      ['400 V', 'la valeur française — c’est 230 × 1,73'],
      ['√3 ≈ 1,73', 'le rapport, valable sur tout réseau triphasé équilibré']
    ]
  },
  surUnePlaque: [
    "Sur un <strong>plan</strong>, c’est la composée qui est écrite : <em>400 V</em>. La simple se déduit. On la mesure avec un voltmètre branché entre deux phases.<span style='display:flex;flex-wrap:wrap;gap:.8rem;margin-top:.5rem'><figure style='margin:0;text-align:center'><img src='assets/src_3p_pe_n.svg' alt='Symbole d’une source triphasée avec neutre et conducteur de protection : bornes L1, L2, L3, N et PE.' style='height:8rem;border:1px solid rgba(27,58,99,.18);border-radius:6px'><figcaption style='font-size:.85rem'>la source : src_3p_pe_n.svg</figcaption></figure><figure style='margin:0;text-align:center'><img src='assets/voltmetre-h.svg' alt='Symbole d’un voltmètre : un cercle portant la lettre V.' style='height:5rem;border:1px solid rgba(27,58,99,.18);border-radius:6px'><figcaption style='font-size:.85rem'>le voltmètre : voltmetre-h.svg</figcaption></figure></span>",
    "Pour un <strong>réseau</strong> ou une <strong>notice d’installation</strong>, on écrit <em>230 / 400 V</em> : la simple d’abord, puis la composée. Quelques constructeurs écrivent <em>400 / 230</em> : lisez toujours l’intitulé. Sur une plaque de moteur, c’est une autre lecture, voyez la ligne suivante.",
    "Sur une <strong>plaque de moteur</strong>, les deux tensions écrites sont des tensions <strong>composées</strong> (entre phases) que le moteur accepte : 230 V en triangle, 400 V en étoile. Chaque <strong>bobinage</strong> reçoit toujours 230 V. C’est un autre sujet, et c’est la station 6.4.",
    "Le facteur <strong>√3</strong> revient partout en triphasé : dans les tensions, dans les courants, dans le calcul des puissances. Il n’y a qu’une seule raison, et c’est celle que vous venez de voir."
  ],

  quiz: [
    { question: "Pourquoi la composée ne vaut-elle pas le double de la simple ?",
      confirmation: "Parce que les deux tensions ne sont pas opposées : décalées de 120 degrés, pas de 180.",
      reponses: [
        { texte: "Parce qu’il y a des pertes en ligne.", pourquoi: "Les pertes existent, mais elles n’expliquent pas un rapport aussi précis et constant." },
        { texte: "Parce qu’elles ne sont pas opposées : l’une n’est pas à son minimum quand l’autre est à son maximum.", juste: true },
        { texte: "Parce que le neutre en absorbe une partie.", pourquoi: "Le neutre n’intervient pas dans une mesure entre deux phases." },
        { texte: "Parce que le transformateur abaisse la tension.", pourquoi: "Le transformateur fixe les deux valeurs, il n’explique pas leur rapport." } ] },

    { question: "Combien vaut le rapport entre composée et simple ?",
      confirmation: "√3, soit environ 1,73.",
      reponses: [
        { texte: "1,41.", pourquoi: "C’est √2, un autre rapport, qu’on rencontre ailleurs." },
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

    { question: "Entre les fils L1 et L2 qui arrivent sur un moteur triphasé sans neutre, quelle tension mesure-t-on ?",
      confirmation: "La composée, 400 V : c’est la tension entre deux phases.",
      reponses: [
        { texte: "La composée, 400 V.", juste: true },
        { texte: "La simple, 230 V.", pourquoi: "230 V se mesure entre une phase et le neutre (ou le PE), pas entre deux phases." },
        { texte: "Les deux, alternativement.", pourquoi: "Entre deux fils donnés, on lit une seule valeur : la composée." },
        { texte: "Aucune : elle fabrique la sienne.", pourquoi: "Un moteur ne fabrique pas de tension." } ] }
  ],

  retenir: [
    "<strong>U</strong> : entre <strong>deux phases</strong>. 400 V.",
    "<strong>U = V × 1,73.</strong> Pas × 2.",
    "<strong>C’est de la géométrie</strong> : le côté du triangle contre le rayon de l’étoile.",
    "<strong>Entre deux phases</strong> qui arrivent sur une machine sans neutre, on mesure la composée."
  ],

  objectifs: '<p><strong>Objectif.</strong> Définir la tension composée, comprendre d’où vient le facteur √3, et vérifier la cohérence d’un réseau par le rapport entre les deux tensions.</p><p><strong>Limite.</strong> La construction vectorielle complète n’est esquissée que par le dessin : la démonstration relève des mathématiques.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés dans la base de connaissances inerWeb ; symboles : bibliothèque inerWeb (src_3p_pe_n.svg, voltmetre-h.svg), rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.4 La tension simple" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.7 Lire une plaque signalétique" } ]
});
