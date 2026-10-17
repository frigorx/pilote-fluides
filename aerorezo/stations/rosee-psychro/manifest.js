/* A5 — Point de rosée et air humide
   Ligne A · Air & hygrométrie
   Socle commun · appui CP8, CP9 et CP10
   Correspondances : lignes C · T · M

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 par le chat de la ligne C, sur le moule de la station pilote.
   Gare traversée par trois lignes : elle est écrite pour les trois — la condensation
   sur une batterie froide, le risque de givre, et la façon dont un appareil obtient
   un point de rosée. L'humidité relative est posée en A4 : on s'appuie dessus, on ne
   la réexplique pas. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "A",
  id: "rosee-psychro",
  title: "Point de rosée et air humide",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Refroidis l’air jusqu’à voir apparaître la condensation.",
  bac: "Repère le point de rosée à partir de température et humidité relative.",
  bts: "Interprète refroidissement, déshumidification et réchauffage sur un diagramme psychrométrique.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "La paroi est froide, l’air qui la longe est humide, et l’eau apparaît dessus. Rien n’a été versé, rien n’a fui : cette eau était déjà là, en vapeur, dans l’air qui passe. Sous la vue, deux valeurs sont affichées côte à côte — la température de la paroi, et le point de rosée de l’air. C’est leur comparaison, et elle seule, qui décide s’il y aura de la buée. On retrouve cette scène partout : sur une batterie froide, sur une gaine d’air froid mal isolée, sur le mur d’une chambre froide.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Le point de rosée est une température, pas un pourcentage. C’est celle à laquelle un air arriverait à saturation si on le refroidissait sans lui retirer d’eau. Un air à 24 °C et 60 % d’humidité relative a un point de rosée voisin de 16 °C : refroidi jusque-là, il ne peut plus rien porter de plus.\n\nDe là sort la seule règle à retenir : on compare la température d’une surface au point de rosée de l’air qui la touche. Surface plus froide, il y a de l’eau. Surface plus chaude, il n’y en a pas. L’humidité relative seule ne permet jamais de répondre.\n\nC’est ce qui fait fonctionner une batterie froide. Pour assécher un air, le refroidir ne suffit pas : il faut que la surface des ailettes descende sous le point de rosée. Alors la vapeur s’y dépose, l’eau tombe dans le bac et part par le siphon — et ce départ doit être garanti, sinon le bac déborde ou l’eau est réaspirée dans la gaine.\n\nSi cette surface descend sous 0 °C, l’eau ne coule plus : elle gèle. Le givre bouche progressivement le passage de l’air, le débit tombe, l’échange se dégrade, et la machine finit en défaut. Un dégivrage n’est pas un supplément de confort : c’est ce qui permet à l’installation de continuer à travailler.\n\nCôté mesure, enfin, le point de rosée ne se lit pas directement. L’appareil relève une température et une humidité relative, puis il le calcule. D’où deux précautions : la sonde doit être stabilisée à la température du lieu — un appareil qui sort d’un véhicule chaud ment pendant plusieurs minutes — et la température de surface se mesure elle aussi, au contact ou à l’infrarouge. Elle ne se devine pas : la surface d’un mur n’est pas à la température de l’air du local.",

  method: "Compare la température de la surface au point de rosée de l’air : si la surface est plus froide, il y aura de l’eau.",
  formula: "T rosée se calcule à partir de la température sèche et de l’humidité relative  ·  condensation si T surface est sous T rosée  ·  givre si T surface est sous 0 °C",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Règle l’air sur 24 °C et 60 % : le point de rosée s’affiche autour de 16 °C, bien au-dessus des 12 °C de la paroi — d’où la buée. Fais descendre l’humidité relative jusqu’à ce que le point de rosée passe sous 12 °C, et note la valeur à laquelle cela se produit. Remonte ensuite l’humidité et cherche le moment où la buée redevient inévitable. Termine en baissant la température de l’air : le point de rosée la suit, sans jamais la dépasser.",
  lecture: "Le point de rosée est une température : il se compare à une autre température, jamais à un pourcentage. C’est la valeur à confronter à celle d’une paroi, d’une batterie ou d’une gaine. Retiens l’humidité trouvée pendant la manipulation : sur cette paroi à 12 °C, il suffit que l’air la dépasse pour que l’eau apparaisse, sans qu’aucune fuite n’existe nulle part. Et si le point de rosée sortait au-dessus de la température de l’air, c’est le relevé qui serait faux, pas la physique.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "La valeur affichée est un calcul approché, fait à partir de deux mesures. L’incertitude d’une sonde d’humidité, souvent de deux à trois points, se reporte de plus d’un degré sur le point de rosée : on ne conclut pas sur un dixième. La température de surface se mesure et ne se déduit pas de celle de l’air. Enfin, la scène montre une paroi lisse et régulière : sur une installation réelle, un seul point froid — un pont thermique, un raccord non isolé, une bride nue — suffit à faire de l’eau alors que tout le reste reste sec.",

  activity: {"kind":"dew","temperature":24,"rh":60},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "D’où vient cette eau sur la paroi ? Personne ne l’a versée, aucune canalisation ne fuit. Elle était déjà dans l’air, invisible, sous forme de vapeur, et le contact du froid l’a fait apparaître. Sous la scène, deux températures sont posées côte à côte : celle de la paroi et le point de rosée de l’air. Dès que la paroi passe sous ce point, l’eau se dépose. Vous croiserez cette situation très souvent : une batterie froide qui ruisselle, une gaine d’air froid mal isolée qui goutte, le mur d’une chambre froide. À chaque fois, le raisonnement est le même, et Comprendre va le détailler.",

    comprendre: "Le point de rosée répond à une question très pratique : à partir de quelle température une surface va-t-elle se couvrir d’eau ? Il suffit de le comparer à la température de la surface, et la réponse tombe sans hésitation. C’est pour cela qu’un pourcentage d’humidité seul ne vous dira jamais s’il y aura de la condensation. Dans une batterie froide, ce phénomène est recherché : on refroidit les ailettes sous le point de rosée pour retirer l’eau de l’air, et cette eau doit pouvoir s’évacuer, sinon le bac déborde. Si les ailettes descendent sous zéro, l’eau gèle, le givre bouche le passage et la machine finit en défaut. Vous allez maintenant faire varier ces températures.",

    manipuler: "À vous de manœuvrer. Le premier curseur donne la température de l’air, le second son humidité relative. Partez de vingt-quatre degrés avec soixante pour cent : la valeur affichée est bien au-dessus des douze degrés de la paroi, et c’est pour cela qu’il y a de la buée. Faites maintenant descendre l’humidité relative, doucement, jusqu’à ce que le point de rosée passe sous douze degrés. Notez l’humidité à laquelle cela se produit : en dessous, la paroi reste sèche ; au-dessus, elle mouille. Terminez en baissant la température de l’air, et vous verrez le point de rosée la suivre, sans jamais la dépasser.",

    verifier: "Deux questions, sans note. Et trois idées à garder de cette escale, parce qu’elle sert dans trois métiers différents. En climatisation, c’est ce qui explique qu’une machine assèche, ou n’assèche pas. Sur une centrale de traitement d’air, c’est ce qui impose un bac et un siphon en état de marche, et un dégivrage dès que la batterie descend sous zéro. Et à la mesure, c’est le rappel qu’un appareil ne relève pas le point de rosée : il le calcule à partir de deux valeurs. Une sonde mal stabilisée donne un chiffre faux, avec la même assurance qu’un chiffre juste."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Quand la condensation apparaît-elle sur une paroi ?","quand la paroi passe sous le point de rosée",["quand l’humidité relative atteint 50 %","quand la vitesse de l’air augmente fortement","quand la paroi passe sous le point de rosée"]],
    ["Refroidir un air sans lui retirer d’eau fait…","monter son humidité relative",["monter son humidité relative","baisser son humidité relative","disparaître la vapeur d’eau"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Prévoir où l’eau va se déposer dans une installation, et s’assurer qu’elle peut en repartir.",
    acquis: {
      cap: ["Refroidit un air jusqu’à voir apparaître la condensation", "Repère une surface froide qui mouille", "Nomme le bac et le siphon d’une batterie froide"],
      bac: ["Détermine un point de rosée à partir d’une température et d’une humidité relative", "Compare le point de rosée à une température de surface pour conclure", "Explique pourquoi une batterie froide produit des condensats"],
      bts: ["Relie refroidissement, déshumidification et réchauffage sur un diagramme de l’air humide", "Justifie le besoin d’un dégivrage sous 0 °C", "Tient compte de l’incertitude de la sonde d’humidité avant de conclure"]
    },
    sources: ["inerWeb Aéraulique v5 — condensation et air humide"],
    correspondances: [
      {reseau: "AéroRézo", station: "L’humidité relative", pourquoi: "la saturation atteinte là-bas devient ici de l’eau visible"},
      {reseau: "AéroRézo", station: "Batteries chaude et froide", pourquoi: "la batterie froide passe sous le point de rosée, et c’est ce qui la fait déshumidifier"},
      {reseau: "AéroRézo", station: "Mesurer température et humidité", pourquoi: "l’appareil ne relève pas le point de rosée, il le calcule à partir de deux mesures"}
    ]
  }
});
