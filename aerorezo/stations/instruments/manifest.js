/* M1 — Choisir l’instrument
   Ligne M · Mesure & diagnostic
   Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "M",
  id: "instruments",
  title: "Choisir l’instrument",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Associe anémomètre, tube de Pitot, manomètre et hygromètre.",
  bac: "Choisis l’instrument selon la grandeur et la précision attendue.",
  bts: "Prépare une chaîne de mesure traçable : plage, résolution, incertitude et étalonnage.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Voici un local et son installation : une entrée d’air en façade, une extraction au plafond, des personnes qui l’occupent. On te demande de vérifier que la ventilation fait son travail. Avant même d’ouvrir la mallette, deux choses manquent : ce qu’on va mesurer, et l’endroit exact où on le mesurera. Aucun appareil ne répond à cette question à ta place.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Un appareil de mesure ne se choisit pas parce qu’il est dans la mallette. Il se choisit à partir de la grandeur cherchée : une vitesse d’air, un débit, un écart de pression, une température, une humidité. On écrit d’abord la grandeur et son unité. L’appareil vient après.\n\nPour les vitesses d’air, deux familles. L’anémomètre à fil chaud chauffe un fil très fin et mesure l’air qui le refroidit : il descend très bas en vitesse, ce qui le rend précieux dans une gaine calme ou devant une bouche d’extraction. Il est fragile, il craint la poussière, et il faut le tenir dans le bon sens. L’anémomètre à hélice compte les tours d’une petite hélice : plus robuste, plus à l’aise dans les vitesses élevées, et c’est lui qu’on retrouve au bout d’un cône de mesure sur les bouches.\n\nPour les pressions, le manomètre différentiel. Il ne lit pas une pression, il lit un écart entre deux prises : l’écart aux bornes d’un filtre, l’écart entre l’intérieur d’une gaine et le local. Associé à un tube de Pitot, il donne aussi une vitesse, en mesurant la poussée de l’air sur l’ouverture du tube.\n\nPour l’air humide, l’hygromètre : il relève ensemble la température et l’humidité relative, et calcule le point de rosée.\n\nReste le point de mesure, et c’est lui qui décide de ce que vaut le relevé. Le meilleur appareil du monde, posé au mauvais endroit, donne un chiffre juste sur une grandeur qui ne veut rien dire. Un anémomètre planté juste derrière un coude mesure un tourbillon, pas un débit.",

  method: "Commence par écrire la grandeur, l’unité et l’endroit exact de la mesure.",
  formula: "Grandeur → point de mesure → instrument → lecture",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Une seule question à l’écran, et elle vaut pour toute la ligne : quel appareil pour mesurer une différence de pression ? Avant de cliquer, nomme la grandeur cherchée et son unité, le pascal. Dis ensuite où tu poserais les deux prises sur une installation réelle. Choisis alors, et regarde si la réponse attendue est bien celle que ton raisonnement annonçait.",
  lecture: "La bonne réponse s’affiche après le choix. Elle compte moins que le chemin qui y mène : grandeur, unité, point de mesure, puis appareil. Refais cette chaîne pour les trois autres instruments de la station — une vitesse dans une gaine calme, une vitesse au bout d’un cône, une humidité dans un local. Si tu ne sais pas dire l’unité, l’appareil n’est pas encore choisi.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Cette station montre quatre appareils : il en existe d’autres, et chaque modèle a sa plage d’emploi, sa résolution et son incertitude, écrites dans sa notice. Un appareil hors étalonnage donne une valeur fausse sans jamais prévenir. Et aucun instrument ne rattrape un point de mesure mal choisi : le relevé sera juste, il ne dira simplement rien de ce qu’on cherche.",

  activity: {"kind":"choice","prompt":"Mesurer une différence de pression ?","answer":"Manomètre différentiel","choices":["Hygromètre","Manomètre différentiel","Thermomètre seul"]},

  /* Ce que la voix dit — un texte à part, écrit pour l'oreille, jamais l'assemblage
     de ce qui est affiché. Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md. */
  narration: {
    decouvrir: "Un local ordinaire, avec ses occupants, son entrée d’air en façade et son extraction au plafond. On vous demande de vérifier que la ventilation fait bien son travail. Et là, la plupart des gens ouvrent la mallette. C’est l’erreur. Tant qu’on n’a pas dit ce qu’on cherche — un débit, une vitesse, un écart de pression — et surtout à quel endroit on va le prendre, l’appareil ne sert à rien. Un chiffre juste, relevé au mauvais endroit, reste un chiffre qui ne répond à aucune question.",

    comprendre: "Prenons les appareils un par un, et surtout ce qu’ils savent faire. Pour la vitesse de l’air, il y en a deux. Le fil chaud d’abord : un fil très fin qu’on chauffe, et que l’air refroidit en passant. Plus l’air va vite, plus il refroidit. Ce petit appareil descend très bas en vitesse, là où les autres ne voient plus rien : devant une bouche, ou dans une gaine calme. En échange, il est fragile et il déteste la poussière. L’hélice ensuite : elle tourne, on compte ses tours. Plus robuste, plus à l’aise dans le courant d’une gaine principale. Pour les pressions, le manomètre différentiel. Le mot important est le dernier : différentiel. Il ne mesure pas une pression, il mesure la différence entre deux points. C’est exactement ce dont on a besoin sur une installation, où presque tout se lit en écart. Et pour l’air humide, l’hygromètre, qui donne la température et l’humidité d’un seul geste.",

    manipuler: "Une seule question vous attend, et elle a l’air facile : quel appareil pour une différence de pression ? Avant de répondre, faites le chemin complet. La grandeur, c’est un écart de pression, et son unité s’appelle le pascal. Le point de mesure, ce sont deux prises, une de chaque côté de l’organe qu’on surveille. Et seulement là, l’appareil s’impose de lui-même. C’est ce trajet qu’il faut prendre l’habitude de faire, parce que sur un chantier, personne ne vous donnera la liste des réponses possibles.",

    verifier: "Deux questions pour finir, sans note et sans conséquence : elles servent à repérer ce qui n’est pas encore clair, pendant qu’on peut y revenir. Si une réponse est fausse, la bonne s’affiche avec son explication, et c’est le moment le plus utile de la station, bien plus que celui où l’on a juste. Ce qu’il faut emporter tient en une phrase : on décide ce qu’on mesure et où on le mesure, avant de choisir avec quoi."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Pour relever une humidité relative, on utilise…","un hygromètre étalonné",["un anémomètre à fil chaud","un manomètre différentiel","un hygromètre étalonné"]],
    ["Avant toute mesure, il faut fixer…","la grandeur et le point de mesure",["la grandeur et le point de mesure","la conclusion que l’on attend","la valeur que devrait donner l’appareil"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Préparer une mesure sur une installation d’air : dire la grandeur, l’unité et le point avant de sortir un appareil.",
    acquis: {
      cap: ["Nomme l’anémomètre, le manomètre différentiel et l’hygromètre", "Associe un appareil à la grandeur qu’il mesure", "Dit l’unité de la grandeur avant de relever une valeur"],
      bac: ["Choisit entre fil chaud et hélice selon la vitesse attendue", "Désigne le point de mesure avant de sortir l’appareil", "Repère les deux prises d’une mesure d’écart de pression"],
      bts: ["Justifie le choix d’un appareil par sa plage et sa résolution", "Vérifie la validité de l’étalonnage avant une campagne de mesure", "Écarte une valeur relevée à un point non représentatif"]
    },
    sources: [
      "Notices d’emploi des appareils : la plage, la résolution et l’incertitude sont propres à chaque modèle",
      "Aucun document interne inerWeb ne traite la mesure aéraulique au 27/08/2026 — les plages d’emploi se vérifient dans la notice, les règles d’implantation dans le texte applicable au chantier"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Trois pressions (A2)", pourquoi: "l’instrument y est mis en œuvre : prise statique et tube de Pitot dans la même gaine"},
      {reseau: "AéroRézo", station: "Diagnostiquer sans deviner (M5)", pourquoi: "le point de mesure décide de ce qu’un relevé peut prouver ou écarter"}
    ]
  }
});
