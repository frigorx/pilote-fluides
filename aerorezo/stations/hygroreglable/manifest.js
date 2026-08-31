/* V4 — VMC hygroréglable
   Ligne V · VMC
   CP4 · Réaliser l’étude d’une installation de VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "V",
  id: "hygroreglable",
  title: "VMC hygroréglable",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Observe une bouche s’ouvrir quand l’air devient humide.",
  bac: "Explique comment le débit suit l’occupation réelle du logement.",
  bts: "Vérifie la cohérence entre entrées d’air, bouches, groupe et domaine d’emploi du système.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Deux logements identiques, même installation, même caisson. Dans le premier, personne depuis ce matin : l’air est sec, la bouche de la salle d’eau est presque refermée, et il ne passe qu’un filet d’air. Dans le second, une douche vient d’être prise : l’air est chargé de vapeur, et la même bouche s’est ouverte en grand. Aucun réglage n’a été touché, aucun bouton pressé. La bouche a réagi seule à ce qu’elle voyait passer.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Une bouche hygroréglable modifie son ouverture selon l’humidité de l’air qui la traverse. Le mécanisme n’a rien d’électronique : à l’intérieur, un matériau sensible à l’humidité — le plus souvent une tresse de textile — s’allonge quand l’air est humide et se raccourcit quand il redevient sec. Cet allongement déplace un volet. Pas de capteur, pas d’alimentation, pas de pile : de la mécanique, qui fonctionne tant qu’elle reste propre.\n\nL’intérêt est simple à énoncer. Un logement n’a pas le même besoin toute la journée. Ventiler à plein régime une salle d’eau vide, c’est extraire de l’air qu’on vient de chauffer et le remplacer par de l’air froid. La bouche hygroréglable ne monte en débit qu’au moment où l’humidité le justifie : après une douche, pendant la cuisine, quand du linge sèche. Le reste du temps, elle se referme partiellement, et le chauffage n’est pas gaspillé.\n\nAttention à un point que beaucoup escamotent : elle ne se referme jamais complètement. Un débit minimal est maintenu en permanence, parce que l’humidité n’est pas le seul polluant. Les vapeurs des matériaux et le gaz carbonique, eux, ne font pas bouger le volet — la bouche ne les voit pas. Une hygroréglable règle le problème de l’humidité, pas celui de la qualité de l’air en général.\n\nDeux familles existent, et il faut les nommer. En hygro A, seules les bouches d’extraction sont hygroréglables ; les entrées d’air, elles, restent autoréglables. En hygro B, les entrées d’air le sont aussi : l’air neuf n’entre en quantité que là où c’est utile. L’hygro B va plus loin dans l’économie, mais impose que tout le matériel appartienne au même système : entrées, bouches et groupe forment un ensemble certifié qu’on ne mélange pas avec un autre.\n\nEnfin, un composant hygroréglable ne remplace ni le dimensionnement, ni l’entretien. Un réseau mal dimensionné reste mal dimensionné, et une bouche encrassée ne module plus rien : le textile s’empoussière, le volet se bloque, et l’installation retombe au mieux à débit fixe.",

  method: "Un composant hygroréglable module un passage. Il ne remplace ni le dimensionnement du réseau, ni son entretien.",
  formula: "Humidité de l’air extrait → ouverture du volet → débit adapté",

  /* Manipuler — une action précise. */
  consigne: "Fais monter l’humidité relative de l’air extrait et observe la bouche s’ouvrir. Redescends ensuite vers un air sec et regarde jusqu’où elle se referme : elle garde toujours un passage. Repère enfin la zone d’humidité où le débit commence réellement à augmenter — c’est elle qui détermine si le système répondra assez tôt après une douche.",
  lecture: "Un débit qui ne bouge pas quand l’humidité monte annonce une bouche encrassée ou bloquée. Un débit qui reste au maximum en permanence annonce l’inverse : le volet ne se referme plus. Dans les deux cas, la bouche est devenue une bouche fixe, et l’économie attendue a disparu.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "La modélisation présentée relie l’humidité à une ouverture, sans reproduire la lenteur du matériau : une bouche réelle met un certain temps à réagir, et ce retard compte après une douche. Par ailleurs, les seuils d’ouverture et les débits mini et maxi sont propres à chaque fabricant et à chaque référence : ils se lisent dans sa documentation, jamais dans un cours.",

  activity: {"kind":"humidity","temperature":21,"rh":68},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Voici deux logements identiques : même installation, même caisson. Dans le premier, personne depuis ce matin. L’air est sec, et la bouche de la salle d’eau est presque refermée : il ne passe qu’un filet d’air. Dans le second, une douche vient d’être prise. L’air est chargé de vapeur, et la même bouche s’est ouverte en grand. Personne n’a touché de réglage, personne n’a appuyé sur un bouton. La bouche a réagi toute seule à ce qu’elle voyait passer.",

    comprendre: "Regardez la chaîne de la méthode, à l’écran : trois cases, et celle du milieu porte tout le raisonnement. Entre l’humidité et le débit, rien n’est branché, rien n’est alimenté. Pourquoi se donner cette peine ? Parce que ventiler, c’est un arbitrage permanent. Trop peu, et la vapeur de la douche condense sur la paroi la plus froide ; quelques mois plus tard, le locataire appelle pour du noir au plafond. Trop, du matin au soir, et vous jetez dehors de l’air chauffé, déjà payé. Cette bouche tranche seule : à l’intérieur, une tresse de textile s’allonge quand l’air devient humide, comme une porte en bois qui gonfle et coince par temps de pluie, et cet allongement pousse le volet. L’air redevient sec, la tresse se raccourcit, le volet se referme. En revanche, elle ne sent que l’eau. Le gaz carbonique que vous expirez, les vapeurs qui sortent des matériaux, rien de cela ne la fait bouger. Voilà pourquoi un passage reste ouvert en permanence : ce qu’elle ne sent pas doit sortir quand même.",

    manipuler: "Faites monter l’humidité de l’air extrait, et regardez la bouche s’ouvrir. Redescendez ensuite vers un air sec, et observez jusqu’où elle se referme : elle garde toujours un passage, jamais rien de complètement fermé. Cherchez enfin le moment précis où le débit commence vraiment à augmenter. C’est ce seuil qui décide si le système réagira assez tôt après une douche, ou s’il laissera la vapeur s’installer dans la pièce avant de se réveiller.",

    verifier: "Deux questions pour vérifier. Elles ne comptent dans aucune note. Gardez deux choses en tête. La première : une bouche hygroréglable ne s’arrête jamais complètement, il reste toujours un débit minimal. La seconde : elle ne voit que l’humidité. Elle ne remplace ni un réseau correctement dimensionné, ni son entretien — une bouche encrassée ne module plus rien du tout."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une bouche hygroréglable modifie son débit selon…","l’humidité de l’air extrait",["la température de l’air extrait","la présence d’un occupant","l’humidité de l’air extrait"]],
    ["Hors occupation, une VMC hygroréglable…","garde un débit réduit, jamais nul",["garde un débit réduit, jamais nul","s’arrête complètement jusqu’au retour","passe au débit maximal par sécurité"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Expliquer à un occupant pourquoi le débit de sa VMC varie, et vérifier qu’une bouche module encore.",
    acquis: {
      cap: ["Repère une bouche hygroréglable sur une installation", "Constate que le débit varie sans intervention", "Nomme les moments où l’humidité monte dans un logement"],
      bac: ["Explique le mécanisme mécanique de la modulation", "Justifie le maintien d’un débit minimal permanent", "Distingue hygro A et hygro B"],
      bts: ["Vérifie la cohérence entrées d’air / bouches / groupe d’un même système", "Situe les seuils et les débits dans la documentation du fabricant", "Évalue l’économie attendue au regard de l’occupation réelle"]
    },
    sources: [
      "Doc VMC — rôle et composants d’une VMC (Bac MFER, collègues partagés)"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "L’humidité relative", pourquoi: "c’est la grandeur que la bouche mesure sans le savoir"},
      {reseau: "AéroRézo", station: "VMC simple flux", pourquoi: "la modulation se greffe sur le balayage vu à la station précédente"}
    ]
  }
});
