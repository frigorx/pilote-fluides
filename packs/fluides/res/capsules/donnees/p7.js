/* Capsule p7 — « Préparation de chantier — risques, EPI, zone de travail »
   (Préparation pratique · codes 12.04 · 12.05). Contenu repris SANS AJOUT de
   la fiche p7 de cartes.js : découpé pour l'oral, mis en animation.
   Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "p7",
  fiche: "p7",
  titre: "Préparation de chantier — risques, EPI, zone de travail",
  surtitre: "HABILITATION FLUIDES · PRÉPARATION PRATIQUE · CODES 12.04 · 12.05",
  duree: "environ 7 minutes",
  intro: "Avant le premier outil, deux choses se préparent : l'analyse de risques et la zone de travail. Ce chapitre vous montre l'ordre à suivre, et les points qui arrêtent un chantier avant qu'il commence.",
  codes: [
    { code: "12.04", libelle: "Réaliser l'analyse de risques avant le travail" },
    { code: "12.05", libelle: "Préparer la zone de travail et choisir les EPI adaptés" },
  ],

  visuelAccueil: {
    motif: "checklist",
    titre: "Avant le premier geste, tout doit être en ordre",
    items: [
      { titre: "Analyse de risques", texte: "faite, et les points bloquants signalés" },
      { titre: "Zone préparée", texte: "balisée, issue dégagée, EPI choisis" },
      { titre: "Matériel vérifié", texte: "et consignation électrique faite" },
    ],
    pied: "Un point manquant : le chantier n'engage pas.",
  },

  ecrans: [
    {
      id: "avant-le-premier-geste",
      titre: "Ce qui se prépare avant de sortir un outil",
      note: "Le point de départ",
      visuel: { svg: "prepa-chantier.svg", alt: "Quatre temps avant de toucher : reconnaître le lieu et le fluide, identifier les risques du jour et les supprimer, se protéger avec les EPI qui en découlent, préparer la zone et le matériel." },
      legende: "Quatre temps, toujours avant le premier geste technique.",
      texte: "<p>Avant de sortir le moindre outil, deux choses se préparent : l'<b>analyse de risques</b> et la <b>zone de travail</b>.</p><p>Ce n'est pas une formalité à cocher après coup. C'est la première étape du chantier, avant le premier geste technique.</p>",
      dire: "Sur un chantier, l'envie de commencer tout de suite est forte. Pourtant, rien ne doit sortir de la caisse à outils tant que deux choses ne sont pas prêtes : l'analyse des risques, et la zone dans laquelle vous allez travailler. Ce n'est pas un papier qu'on remplit en fin de journée pour être en règle. C'est le vrai début de l'intervention, celui qui décide si le reste se passera sans accident. Les quatre temps qui suivent montrent comment s'y prendre, toujours dans le même ordre.",
      reference: "Codes 12.04 · 12.05 · le point de départ",
    },

    {
      id: "analyse-risques",
      titre: "L'analyse de risques, dans l'ordre",
      note: "Analyser avant d'agir",
      visuel: {
        motif: "sequence",
        titre: "Quatre temps, toujours dans cet ordre",
        etapes: [
          { titre: "Identifier le fluide", texte: "inflammable, sous pression, en espace confiné — plaque signalétique ou documentation" },
          { titre: "Repérer les dangers de la zone", texte: "ventilation, sources de chaleur ou d'étincelle, accès, présence de tiers" },
          { titre: "Éliminer ce qui peut l'être", texte: "couper une source de chaleur, dégager un passage" },
          { titre: "Signaler ce qui reste", texte: "un point qui bloque vraiment arrête le chantier, il ne se contourne pas" },
        ],
        pied: "Le chantier n'engage pas tant qu'un point signalé n'est pas corrigé.",
      },
      texte: "<p>L'analyse de risques suit toujours le même ordre : identifier le <b>fluide</b> en jeu, repérer les <b>dangers de la zone</b>, <b>éliminer</b> ce qui peut l'être, <b>signaler</b> ce qui reste.</p><p>Un point qui bloque vraiment arrête le chantier, il ne se contourne pas.</p>",
      dire: "L'analyse de risques suit toujours le même ordre, et cet ordre n'est pas là par hasard. D'abord, on identifie le fluide en jeu : est-il inflammable, sous pression, est-on en espace confiné ? On regarde la plaque signalétique ou la documentation. Ensuite, on repère les dangers de la zone elle-même : la ventilation, les sources de chaleur ou d'étincelle à proximité, l'accès, la présence d'autres personnes. Ce qui peut être supprimé, on le supprime : on coupe une source de chaleur, on dégage un passage. Et ce qui ne peut pas être supprimé, on le signale. Un point qui bloque vraiment arrête le chantier, il ne se contourne pas.",
      reference: "Code 12.04 · l'analyse de risques",
    },

    {
      id: "zone-et-epi",
      titre: "La zone se prépare, elle ne s'improvise pas",
      note: "Le point bloquant",
      visuel: {
        motif: "checklist",
        titre: "Cinq points avant d'intervenir",
        items: [
          { titre: "Baliser la zone", texte: "signaler le chantier" },
          { titre: "Dégager une issue", texte: "utilisable à tout moment de l'intervention", refus: true },
          { titre: "Choisir les EPI adaptés", texte: "protection des yeux, gants adaptés au produit et au froid, détecteur de gaz porté si le fluide l'exige", refus: true },
          { titre: "Vérifier le matériel", texte: "un flexible douteux ou un détecteur non vérifié ne sort pas de l'atelier" },
          { titre: "Consigner électriquement", texte: "avant toute ouverture de circuit" },
        ],
        pied: "Un point manquant, même un seul : le chantier n'engage pas.",
      },
      texte: "<p>Puis la zone se prépare : on <b>balise</b>, on dégage une <b>issue</b> utilisable à tout moment, on choisit les <b>EPI</b> adaptés au fluide et au geste, on <b>vérifie</b> le matériel, on <b>consigne électriquement</b> avant toute ouverture de circuit.</p><p>Un flexible douteux ou un détecteur non vérifié ne sort pas de l'atelier.</p>",
      dire: "Une fois les risques analysés, on prépare l'endroit où l'on va travailler, en cinq points. On délimite la zone et on la signale. On garde une sortie libre, utilisable à chaque instant. On choisit des protections qui conviennent au fluide et au geste prévu. On contrôle le matériel avant de le prendre : un flexible dont on doute, un détecteur qu'on n'a pas vérifié restent à l'atelier. Et avant d'ouvrir le circuit, on coupe le courant et on consigne, à chaque fois. S'il manque la sortie, une protection ou un détecteur qui fonctionne, on ne commence pas.",
      retenir: ["Une issue condamnée, un EPI absent, un détecteur en panne : le chantier <b>n'engage pas</b>.", "<b>Consignation électrique</b> systématique, avant toute ouverture de circuit."],
      reference: "Code 12.05 · la préparation de la zone",
      controle: {
        enonce: "En arrivant sur la zone d'intervention, vous constatez que l'issue de secours est encombrée par du matériel stocké. Que faites-vous ?",
        choix: [
          "Je dégage l'issue et je signale le point avant d'engager le chantier",
          "Je commence le travail, je dégagerai l'issue plus tard si besoin",
          "Je note l'anomalie dans mon rapport et je continue normalement",
          "Je demande à un collègue de rester posté devant l'issue pendant l'intervention",
        ],
        bonne: 0,
        explication: "Une issue condamnée est un point bloquant de l'analyse de risques. On ne commence pas en espérant que ça n'arrivera pas. On dégage, ou on fait dégager, avant le premier geste technique.",
      },
    },

    {
      id: "hydrocarbures",
      titre: "Sur une machine aux hydrocarbures, l'outil se choisit avant",
      note: "R-290 et les fluides inflammables",
      visuel: {
        motif: "alerte",
        titre: "Un choix qui se fait avant d'ouvrir la zone",
        vignettes: [
          { picto: "🔥", etiquette: "le risque", titre: "Un outil ordinaire", texte: "prévu pour un gaz qui n'est pas inflammable, sur un fluide qui l'est" },
          { picto: "⚡", etiquette: "ce qui suffit", titre: "Une simple étincelle", texte: "au mauvais endroit, au mauvais moment, enflamme le gaz accumulé" },
          { picto: "🧰", etiquette: "le bon réflexe", titre: "Choisir l'outillage avant", texte: "avant d'ouvrir la zone, jamais une fois dessus" },
        ],
        pied: "Sur une machine aux hydrocarbures, le choix de l'outillage n'attend pas d'être sur place.",
      },
      texte: "<p>Sur une machine aux <b>hydrocarbures</b> (par exemple au R-290), le choix de l'outillage se fait <b>avant</b> d'ouvrir la zone, pas une fois dessus.</p><p>Ces fluides sont inflammables : un outil ordinaire peut suffire à déclencher un accident. Une simple étincelle, au mauvais endroit, au mauvais moment, enflamme le gaz accumulé.</p>",
      dire: "Les machines qui fonctionnent avec un hydrocarbure, comme le R 290, demandent une préparation à part. Le fluide qu'elles contiennent peut prendre feu. Il faut donc décider de son outillage avant même d'ouvrir la zone de travail, et non découvrir sur place qu'un outil ne convient pas. Car un outil banal, pensé pour des fluides qui ne brûlent pas, peut être à l'origine de l'accident : il suffit d'une étincelle, au mauvais endroit et au mauvais moment, pour enflammer le gaz qui s'est rassemblé.",
      reference: "Code 12.05 · les fluides inflammables",
    },

    {
      id: "outils-compatibles",
      titre: "Compatible, pas juste disponible",
      note: "Les outils qui se vérifient en particulier",
      visuel: {
        motif: "checklist",
        titre: "Ce que la zone balisée exige",
        items: [
          { titre: "Station de récupération", texte: "compatible hydrocarbures : conçue pour ne pas créer d'étincelle interne" },
          { titre: "Détecteur de fuite", texte: "adapté au gaz recherché, sinon il peut ne rien signaler alors que le gaz s'échappe", refus: true },
          { titre: "Matériel électrique de la zone", texte: "antidéflagrant, dit « ATEX » : lampe, outillage électroportatif, appareils de mesure" },
          { titre: "Ventilation", texte: "reste en marche pendant toute l'intervention" },
        ],
        pied: "Compatible ne veut pas dire « qui marche quand même ».",
      },
      texte: "<p>Certains outils se vérifient en particulier. La <b>station de récupération</b> doit être compatible hydrocarbures : conçue pour aspirer et stocker un gaz inflammable sans créer d'étincelle interne.</p><p>Le <b>détecteur de fuite</b> doit être adapté au gaz recherché : un détecteur réglé pour un autre fluide peut ne rien signaler.</p><p>Tout le matériel électrique de la zone doit être <b>antidéflagrant</b> (« ATEX »). La <b>ventilation</b> reste en marche pendant toute l'intervention.</p>",
      dire: "Devant une machine qui contient un gaz inflammable, un outil qui fonctionne ne suffit pas : il doit avoir été prévu pour ce gaz. Plusieurs points se contrôlent avant de commencer. Côté récupération, la station doit accepter les hydrocarbures : elle aspire et stocke le gaz sans produire d'étincelle à l'intérieur, ce qu'une station ordinaire ne garantit pas. Votre détecteur de fuite, lui, doit viser le bon gaz, sinon il peut rester muet alors que ça fuit. Dans la zone balisée, tout ce qui est électrique, la lampe, l'outillage, les appareils de mesure, doit être antidéflagrant, on dit A T E X. Et la ventilation tourne du début à la fin du chantier.",
      retenir: ["<b>Compatible</b> ne veut pas dire « qui marche quand même » : l'outil doit être conçu pour les gaz inflammables."],
      reference: "Code 12.05 · les outils compatibles",
      controle: {
        enonce: "Vous intervenez sur une machine au R-290. Votre détecteur de fuite est réglé pour un autre gaz. Que faites-vous ?",
        choix: [
          "Je l'utilise quand même, en restant simplement plus prudent",
          "Je le change contre un modèle réglé pour le gaz recherché",
          "Je travaille sans détecteur, en comptant sur l'odorat",
          "Je note l'écart dans mon rapport et je poursuis l'intervention",
        ],
        bonne: 1,
        explication: "Le détecteur de fuite doit être adapté au gaz recherché. Un détecteur réglé pour un autre fluide peut ne rien signaler, alors même que du gaz inflammable s'échappe.",
      },
    },

    {
      id: "ordre-qui-protege",
      titre: "Un ordre qui protège, du début à la fin",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "Sept temps, jamais dans le désordre",
        etapes: [
          { titre: "Analyser", texte: "identifier le fluide et les dangers de la zone" },
          { titre: "Éliminer", texte: "ce qui peut l'être" },
          { titre: "Signaler", texte: "ce qui reste" },
          { titre: "Baliser", texte: "la zone de travail" },
          { titre: "S'équiper", texte: "les EPI adaptés" },
          { titre: "Vérifier le matériel", texte: "avant de l'emporter sur zone" },
          { titre: "Consigner", texte: "électriquement, avant toute ouverture de circuit" },
        ],
        pied: "Et alors seulement, intervenir.",
      },
      texte: "<p>Analyser → éliminer ce qui peut l'être → signaler le reste → baliser → s'équiper → vérifier le matériel → consigner. Et alors seulement, intervenir.</p>",
      dire: "Toute la préparation tient dans un enchaînement, et son ordre n'a rien d'arbitraire. On commence par analyser les risques, on supprime ceux qu'on peut supprimer, on signale ceux qui restent, on balise la zone, on s'équipe, on vérifie le matériel, on consigne. Ce n'est qu'après tout cela qu'on intervient. Chaque étape protège la suivante. Et s'il manque un seul élément, un équipement de protection, une issue de secours dégagée, un détecteur qui fonctionne, le chantier ne commence pas. On ne découvre pas un risque en le subissant.",
      piege: "<p>On ne teste pas un risque en le vivant. Un <b>EPI absent</b>, une <b>issue condamnée</b>, un <b>détecteur en panne</b> : chacun de ces points arrête le chantier <b>avant</b> qu'il commence, pas après un premier incident.</p>",
      reference: "Codes 12.04 · 12.05 · l'ordre complet",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou reprendre le module pratique.",
});
