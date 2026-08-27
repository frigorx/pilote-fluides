/* T3 — Batteries chaude et froide
   Ligne T · Centrale de traitement d’air
   CP10 · Réaliser l’étude d’une centrale de traitement d’air
   Correspondances : ligne A · Point de rosée · HydroMétro · réseau thermo-techno

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Deux points tenaient à cœur au cahier des charges : la batterie se reconnaît à sa
   forme — un serpentin dans un faisceau d'ailettes —, et les condensats ne sont pas
   un détail. Le chemin de l'eau est traité ici comme un point de mise en service. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "T",
  id: "batteries",
  title: "Batteries chaude et froide",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Observe l’air se réchauffer ou se refroidir.",
  bac: "Relie puissance, débit d’air et écart de température.",
  bts: "Analyse batterie froide avec refroidissement sensible et déshumidification éventuelle.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Le bloc au centre n’est pas un rectangle plein : un serpentin le traverse de part en part, noyé dans un faisceau d’ailettes serrées. L’air passe entre les ailettes, le fluide passe dans les tubes, et les deux ne se touchent jamais. Regarde maintenant ce qui est dessiné juste en dessous — un bac, et un tuyau qui fait une boucle. Personne n’a versé d’eau dans cette centrale. Il va pourtant en sortir, en continu.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Une batterie n’est pas un bloc coloré sur un schéma : c’est un serpentin de tubes qui traverse un faisceau d’ailettes serrées. Le fluide circule dans les tubes, l’air passe entre les ailettes. Les ailettes ne servent qu’à une chose : multiplier la surface offerte à l’air. Un tube nu n’échangerait presque rien.\n\nTrois familles se rencontrent. La batterie chaude reçoit de l’eau chaude, parfois une résistance électrique. La batterie froide reçoit de l’eau glacée. Et en détente directe, c’est le fluide frigorigène qui circule dans le serpentin et s’y évapore : la batterie est alors l’évaporateur de la machine frigorifique.\n\nTant que la batterie ne fait que changer la température, la puissance se calcule à partir du débit d’air et de l’écart de température. Un repère de chantier vaut mieux qu’une formule récitée : il faut environ un tiers de watt par m³/h de débit et par degré d’écart. 2 500 m³/h sur 9 °C demandent donc de l’ordre de 7,5 kW.\n\nLa batterie froide, elle, ne se contente pas toujours de refroidir. Dès que la surface des ailettes descend sous le point de rosée de l’air qui les traverse, la vapeur d’eau s’y condense. L’eau perle, ruisselle le long des ailettes, et tombe — en continu, tant que la machine tourne. Ce n’est pas un incident, c’est le fonctionnement normal.\n\nIl faut donc prévoir un chemin à cette eau : un bac sous la batterie, une pente vers le point bas, un siphon, une évacuation qui part réellement quelque part. Le siphon n’est pas décoratif. La batterie se trouve le plus souvent dans une partie du caisson en dépression : sans siphon amorcé, l’air est aspiré par le tuyau d’évacuation au lieu que l’eau descende. Le bac se remplit, puis déborde — dans la gaine, dans l’isolant, dans le faux plafond. Sa hauteur se calcule d’après la dépression du caisson, et il se réamorce à la remise en service, parce qu’il s’assèche pendant l’hiver.\n\nDeux points de mise en service, pour finir. Si l’air file trop vite entre les ailettes, il arrache les gouttes et les emporte dans la gaine : c’est à cela que sert le séparateur de gouttelettes de certaines centrales. Et une batterie à eau exposée à l’air neuf en hiver peut geler et éclater — le thermostat antigel qui la protège se vérifie, il ne se suppose pas.",

  method: "Une batterie froide qui déshumidifie produit de l’eau en continu : le bac, la pente, le siphon et l’évacuation font partie de l’installation, jamais des accessoires.",
  formula: "P sensible = ρ cₚ Qᵥ ΔT — soit environ 0,34 W par m³/h et par °C d’écart",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Règle le débit sur 2 500 m³/h et l’écart sur 9 °C, et note la puissance obtenue. Double ensuite le débit sans toucher à l’écart : la puissance double aussi. Reviens au débit de départ et double l’écart : elle double encore. Cherche enfin un couple débit-écart qui donne environ 5 kW — tu verras qu’il en existe plusieurs, et que c’est le projet qui tranche, pas le calcul.",
  lecture: "La puissance affichée est celle qu’il faut fournir pour changer la température de l’air, et elle seule. Si la batterie froide descend sous le point de rosée, elle retire aussi de l’eau, et la machine doit fournir bien davantage que le nombre lu ici. C’est pourquoi on ne sélectionne jamais une batterie froide sur la seule puissance sensible : l’humidité relevée en amont fait partie des données du projet.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le calcul proposé est une puissance sensible, sur de l’air sec, à masse volumique constante. Il ignore la part latente — l’eau condensée sur les ailettes —, l’encrassement qui dégrade l’échange avec le temps, et la perte de charge que la batterie ajoute au réseau. Une sélection réelle se fait avec le logiciel du constructeur, à partir des températures et du débit du fluide, et de l’état de l’air en entrée. La masse volumique retenue vaut pour un air courant : en altitude ou à haute température, elle change.",

  activity: {"kind":"heat","flow":2500,"delta":9},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Le bloc au centre de l’image n’est pas un rectangle plein, et c’est important. Un serpentin de tubes le traverse de part en part, noyé dans un faisceau d’ailettes serrées. L’air passe entre les ailettes ; le fluide passe à l’intérieur des tubes. Les deux se frôlent, échangent de la chaleur, et ne se touchent jamais. C’est la forme même d’une batterie, et c’est à cette forme qu’on la reconnaît sur une installation. Regardez maintenant ce qui a été dessiné juste en dessous : un bac, et un tuyau qui fait une boucle. Personne n’a versé d’eau dans cette centrale. Il va pourtant en sortir, en continu, dès que la batterie fonctionnera.",

    comprendre: "Trois familles de batteries se rencontrent sur le terrain. La chaude, alimentée en eau chaude, parfois par une résistance électrique. La froide, alimentée en eau glacée. Et la détente directe, où c’est le fluide frigorigène lui-même qui circule dans le serpentin et s’y évapore : dans ce cas, la batterie est l’évaporateur de la machine frigorifique. Pour la puissance, gardez plutôt un repère de chantier qu’un calcul appris par cœur : il faut à peu près un tiers de watt par mètre cube et par heure de débit, et par degré d’écart à obtenir. Venons-en maintenant à ce qui distingue vraiment la batterie froide. Dès que la surface de ses ailettes descend sous le point de rosée de l’air qui les traverse, la vapeur d’eau s’y condense. L’eau perle, ruisselle le long des ailettes, et tombe. En continu, tant que la machine tourne. Ce n’est pas une avarie, c’est le fonctionnement normal — et cette eau, il faut lui donner un chemin.",

    manipuler: "Commençons par le calcul. Le débit est à deux mille cinq cents, l’écart à neuf degrés : notez la puissance affichée. Doublez maintenant le débit sans toucher à l’écart, et la puissance double. Revenez au débit de départ, doublez l’écart, elle double encore. Ce sont deux réglages différents pour un même résultat, et c’est le projet qui tranche, jamais le calcul seul. Revenez ensuite au tuyau du dessin. Sur une installation réelle, ce siphon se trouve presque toujours dans une zone en dépression. S’il n’est pas amorcé, l’air est aspiré par l’évacuation au lieu que l’eau descende. Le bac se remplit, puis déborde dans la gaine.",

    verifier: "Deux questions, sans note ; en cas d’erreur, la bonne réponse arrive avec son explication. Trois choses à emporter. La première : une batterie se reconnaît à sa forme, un serpentin dans un faisceau d’ailettes, jamais un rectangle sur un schéma. La deuxième : la puissance calculée ici ne couvre que le changement de température. Si la batterie froide déshumidifie, la machine fournit davantage. La troisième, et c’est celle qu’on retrouve en panne toute l’année : les condensats. Un bac en pente, un siphon amorcé, une évacuation qui part quelque part. Sans eux, l’eau finit dans la gaine ou dans le faux plafond."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une batterie froide peut…","refroidir et déshumidifier à la fois",["refroidir sans jamais produire d’eau","déshumidifier sans refroidir l’air","refroidir et déshumidifier à la fois"]],
    ["Les condensats d’une batterie froide exigent…","un bac et une évacuation avec siphon",["un bac et une évacuation avec siphon","un filtre de plus grande surface","une vitesse d’air plus élevée"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Mettre en service une batterie froide et vérifier que l’eau qu’elle produit part réellement.",
    acquis: {
      cap: ["Reconnaît une batterie à son serpentin et à ses ailettes", "Constate que l’air ressort plus chaud ou plus froid qu’il n’est entré", "Repère le bac à condensats et son évacuation"],
      bac: ["Relie la puissance au débit d’air et à l’écart de température", "Explique d’où vient l’eau produite par une batterie froide", "Vérifie qu’un siphon est amorcé et que le bac est en pente"],
      bts: ["Distingue puissance sensible et puissance totale d’une batterie froide", "Justifie la hauteur d’un siphon par la dépression du caisson", "Identifie la batterie de détente directe comme évaporateur de la machine"]
    },
    sources: [
      "6.5.1 Technologie (CTA) — architecture d’une centrale (Bac MFER)",
      "WA10 — CTA modulaire, architecture et potentiel pédagogique (machines ERM)",
      "inerWeb Aéraulique v5 — condensation et air humide"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Point de rosée et air humide", pourquoi: "la batterie froide passe sous le point de rosée : c’est ce qui la fait déshumidifier"},
      {reseau: "HydroMétro", station: "Production", pourquoi: "l’eau chaude et l’eau glacée qui alimentent ces batteries y sont fabriquées"},
      {reseau: "Le réseau thermo-techno", station: "Évaporateur", pourquoi: "en détente directe, cette batterie est l’évaporateur de la machine frigorifique"}
    ]
  }
});
