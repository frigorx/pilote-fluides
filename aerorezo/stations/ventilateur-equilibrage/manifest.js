/* D5 — Ventilateur et équilibrage
   Ligne D · Distribution
   CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "D",
  id: "ventilateur-equilibrage",
  title: "Ventilateur et équilibrage",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Vois le débit changer quand un registre bouge.",
  bac: "Place le point de fonctionnement au croisement de la courbe du réseau et de celle du ventilateur.",
  bts: "Équilibre les branches sans étrangler le réseau, puis contrôle le point de fonctionnement obtenu.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Deux courbes sur le même repère, et elles ne viennent pas du même endroit. Celle qui descend est fournie par le constructeur du ventilateur. Celle qui monte, personne ne la fournit : elle sort du calcul des trois stations précédentes. Regarde l’endroit où elles se croisent, et ce qui arrive à ce point quand le réseau se durcit.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "La courbe du ventilateur descend, et c’est normal : à vitesse de rotation donnée, une machine ne sait pas fournir beaucoup de débit et beaucoup de pression en même temps. Plus elle pousse d’air, moins il lui reste de pression disponible.\n\nLa courbe du réseau monte, et elle monte comme le carré du débit — pour la raison vue aux deux stations précédentes : les pertes suivent le carré de la vitesse. C’est le résultat de l’étude, pertes linéaires et singulières additionnées sur le chemin le plus défavorisé.\n\nLeur croisement est le point de fonctionnement. Ce n’est pas une prévision, c’est une obligation : l’installation ne peut tourner nulle part ailleurs. Ni au débit écrit sur le plan, ni à celui qu’on espérait — à celui-là.\n\nFermer un registre durcit le réseau : sa courbe se redresse, le point de croisement glisse vers la gauche. Moins de débit, plus de pression, plus de bruit. C’est précisément ce qu’on fait en équilibrant, et il faut savoir qu’on le fait exprès.\n\nD’où l’ordre de travail, qui ne se discute pas. On mesure toutes les branches. On repère la plus défavorisée et on la laisse grande ouverte : elle devient la référence. On freine les autres pour ramener chacune à son débit. Et seulement à la fin, on ajuste la vitesse du ventilateur pour amener l’ensemble au niveau voulu. Étrangler toutes les branches pour rattraper un ventilateur trop rapide revient à acheter de l’électricité pour fabriquer du bruit.",

  method: "Mesure avant de régler. Une correction sur une branche peut déplacer les autres.",
  formula: "Point de fonctionnement : pression du ventilateur = perte totale du réseau  ·  la courbe du réseau monte comme le carré du débit",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Le ventilateur est commandé à 70 %, le réseau annonce une résistance de 55 % : lis le message affiché sous les curseurs. Porte ensuite la résistance à 85 %, comme si l’on avait fermé plusieurs registres, et suis le point de croisement sur les courbes. Remonte enfin la commande jusqu’à retrouver la zone d’équilibre, et note de combien il a fallu la pousser.",
  lecture: "Le message ne donne pas un débit : il dit dans quelle situation se trouve l’installation. À 70 contre 55, le ventilateur garde de la pression en réserve — le débit sera fort, et probablement bruyant. À 70 contre 85, il n’en a plus assez : les bouches du bout de réseau ne recevront presque rien. L’équilibre revient en poussant la commande à 85, c’est-à-dire en payant en électricité et en bruit ce que les registres fermés ont coûté.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Les deux curseurs donnent une lecture qualitative, pas un calcul : ils ne remplacent ni les courbes du constructeur ni une mesure de débit aux bouches. Les courbes réelles sont données pour un air de référence — une température élevée, une altitude, un conduit d’aspiration mal dessiné les déplacent. Enfin, la courbe du réseau se durcit toute seule quand un filtre s’encrasse, sans que personne n’ait touché à un registre : c’est pour cela qu’on surveille la pression de part et d’autre du filtre.",

  activity: {"kind":"fan","speed":70,"resistance":55},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Deux courbes sur le même repère, et elles ne racontent pas du tout la même chose. Celle qui descend appartient au ventilateur : le constructeur la fournit, elle dit ce que la machine est capable de donner. Elle descend parce qu’un ventilateur ne sait pas donner beaucoup d’air et beaucoup de pression en même temps ; plus il en pousse, moins il lui reste de force. Celle qui monte appartient au réseau, et personne ne la fournit : elle sort du calcul que nous venons de faire, mètre après mètre et coude après coude. Là où elles se croisent, il y a un point. C’est tout le sujet de cette station.",

    comprendre: "Ce croisement n’est pas une prévision : c’est une obligation. L’installation ne peut fonctionner nulle part ailleurs, quoi qu’en dise le plan et quoi qu’en pense le concepteur. Voilà pourquoi la courbe du réseau se calcule sérieusement : c’est elle qui décide, avec le ventilateur, de ce que les gens recevront vraiment. Elle monte comme le carré du débit, pour la raison que nous connaissons désormais — les pertes suivent le carré de la vitesse. Fermons un registre, maintenant. Le réseau devient plus dur, sa courbe se redresse, et le point glisse vers la gauche : moins de débit, plus de pression, plus de bruit. C’est exactement ce qu’on fait en équilibrant une installation, et il faut savoir qu’on le fait exprès. L’ordre du travail compte alors énormément. On mesure toutes les branches, on repère la plus difficile, on la laisse grande ouverte, et on freine seulement les autres. La vitesse du ventilateur se règle en dernier, jamais en premier.",

    manipuler: "Le ventilateur est commandé à soixante-dix pour cent, le réseau annonce cinquante-cinq. Le message vous dit qu’il reste de la pression disponible : le débit sera fort, et sans doute bruyant aux bouches. Poussez maintenant la résistance du réseau jusqu’à quatre-vingt-cinq, comme si quelqu’un avait fermé plusieurs registres au plafond. Le message change de camp : le réseau est devenu trop dur pour cette commande, et les bouches du bout ne recevront plus grand-chose. Remontez alors la commande jusqu’à retrouver l’équilibre, et voyez de combien il a fallu la pousser. C’est là le prix exact des registres fermés.",

    verifier: "Deux questions sans note, et la ligne se referme. Ce qu’il faut emporter n’est pas une courbe, c’est un ordre de travail. D’abord mesurer, ensuite repérer la branche la plus difficile, ensuite freiner les autres — et la vitesse du ventilateur se règle en dernier. Celui qui commence par pousser le ventilateur achète de l’électricité pour fabriquer du bruit. Et celui qui ferme un registre sans avoir mesuré déplace toutes les autres branches sans le voir, parce qu’un réseau est solidaire, du premier mètre jusqu’à la dernière bouche."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Le point de fonctionnement se lit à l’intersection…","de la courbe du ventilateur et du réseau",["des deux branches les plus chargées","de la courbe du ventilateur et du réseau","du débit visé et de la vitesse admise"]],
    ["Avant de toucher à un registre, il faut…","mesurer et repérer la branche de référence",["fermer les autres branches d’abord","augmenter la vitesse du ventilateur","mesurer et repérer la branche de référence"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Établir le point de fonctionnement réel d’une installation, puis équilibrer les branches sans étrangler le réseau.",
    acquis: {
      cap: ["Montre le registre d’une branche et dit ce qu’il fait", "Constate qu’un registre fermé change le débit ailleurs", "Nomme le ventilateur comme l’organe qui fournit la pression"],
      bac: ["Place le point de fonctionnement au croisement des deux courbes", "Explique pourquoi fermer un registre déplace ce point vers la gauche", "Mesure les débits des branches avant d’agir sur un registre"],
      bts: ["Établit la courbe du réseau à partir des pertes du chemin le plus défavorisé", "Conduit un équilibrage dans l’ordre : référence ouverte, autres branches freinées, ventilateur en dernier", "Justifie qu’un réglage se contrôle par la mesure et non par le réglage lui-même"]
    },
    sources: [
      "inerWeb Aéraulique v5 — point de fonctionnement, courbes de ventilateurs et équilibrage des réseaux",
      "Courbes caractéristiques des ventilateurs — documentation du constructeur, aux conditions d’air de référence indiquées"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Étudier un réseau VMC", pourquoi: "le chemin le plus défavorisé y est établi ; il devient ici la courbe du réseau, donc le point de fonctionnement"},
      {reseau: "HydroMétro", station: "Équilibrage", pourquoi: "même ordre de travail sur un réseau d’eau : mesurer, ouvrir la branche de référence, freiner les autres, régler la pompe en dernier"}
    ]
  }
});
