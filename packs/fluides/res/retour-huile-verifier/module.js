window.OIL_MODULE = {
  id: "retour-huile-verifier",
  title: "Vérifier le retour d’huile",
  subtitle: "LE CIRCUIT D’HUILE · STATION 4",
  codes: ["1.05", "6.01", "6.05"],
  voix: true,
  nextStep: "Poursuivre avec « Les éléments du circuit d’huile » : lorsque le retour naturel ne suffit plus, des organes gèrent la séparation, la réserve et le niveau.",
  nextUrl: "../elements-circuit-huile/index.html",
  nextLabel: "Station 5 · La chaîne de l’huile : séparer et stocker",
  summaryVisual: { kind: "decision", label: "Observer le niveau, vérifier les régimes et contrôler le chemin de retour avant d’ajouter de l’huile" },
  lessons: [
    {
      id: "charge-variable",
      narration: "Voici le point que beaucoup d'installations découvrent trop tard : c'est à charge minimale que les défauts de retour apparaissent. Quand plusieurs compresseurs s'arrêtent, ou qu'un compresseur module vers le bas, le débit de gaz diminue — et avec lui la vitesse dans les conduites. Une colonne parfaitement dimensionnée à pleine charge devient alors trop grande pour entraîner l'huile. C'est le principe de la double montée : à faible charge, l'huile bouche la grande colonne au niveau de son siphon et force le gaz dans la petite, où la vitesse redevient suffisante. À pleine charge, les deux conduisent le mélange. Posez-vous donc toujours la question : le retour est-il correct à la charge minimale, et pas seulement au régime nominal ?",
      short: "Partiel",
      kicker: "Station 1 · Régimes",
      title: "La charge minimale révèle les défauts de retour",
      lead: "Quand plusieurs compresseurs s’arrêtent ou qu’un compresseur module, le débit de gaz diminue.",
      details: [
        "Une colonne correcte à pleine charge peut alors devenir trop grande pour entraîner l’huile.",
        "À faible charge, l’huile ferme la grande montée au niveau de son siphon et force le gaz dans la petite. À pleine charge, les deux montées conduisent le mélange."
      ],
      box: { type: "exam", text: "Toujours demander : le retour est-il correct à la charge minimale, pas seulement au régime nominal ?" },
      visual: { kind: "partload", title: "Comparer les deux régimes", label: "Double colonne : grande montée obturée par un bouchon d’huile à charge réduite, puis deux montées actives à pleine charge", caption: "Schéma de principe : les diamètres et hauteurs se calculent pour l’installation réelle." }
    },
    {
      id: "calcul-vitesse",
      narration: "La vitesse du gaz ne se devine pas, elle se calcule : on divise le débit aspiré par la section de passage du tube. Réglez le diamètre intérieur, le régime et le débit, et regardez ce que devient la vitesse — puis ce que devient l'huile. Ce que la manipulation montre le plus vite, c'est qu'un tracé peut très bien convenir à pleine charge et ne plus rien entraîner du tout à charge réduite. Une précision honnête : le calcul vous donne une vitesse, c'est tout. Le repère auquel la comparer vient ensuite de la notice du constructeur et de l'étude de l'installation.",
      short: "Calcul",
      kicker: "Station 2 · Calcul",
      title: "Calculer la vitesse, et voir ce qu’elle change",
      lead: "La vitesse du gaz ne se devine pas : elle se calcule en divisant le débit aspiré par la section de passage.",
      details: [
        "Régler le diamètre intérieur, le régime et le débit aspiré, puis lire la vitesse obtenue et l’état de l’huile.",
        "Un tracé peut convenir à pleine charge et ne plus rien entraîner à charge réduite : c’est ce que la manipulation montre le plus vite."
      ],
      box: { type: "exam", text: "Le calcul donne une vitesse ; le repère de comparaison vient ensuite de la notice du constructeur et de l’étude de l’installation." },
      visual: { kind: "oilRiserClaudeSlot", title: "Régler, calculer, observer", label: "Colonne montante d’aspiration : régler le diamètre, le régime et le débit, lire la vitesse du gaz et l’état de l’huile", caption: "Le débit aspiré et les diamètres proposés sont des valeurs d’exercice : sur une installation, ils viennent de l’étude et de la notice du compresseur." }
    },
    {
      id: "circuit-complet",
      narration: "Un circuit de retour se lit comme un chemin continu, du point de départ au point d'arrivée. Partez de la sortie de l'évaporateur et suivez la conduite jusqu'au carter, sans sauter d'étape : c'est ainsi qu'on repère les obstacles. Contrôlez dans l'ordre la pente, les points bas, le siphon en pied de colonne, la section de la montée, et la boucle haute quand il y en a une. Puis confrontez ce tracé aux débits minimal et maximal. Retenez la formule : un schéma fluidique se lit avec trois éléments ensemble — la géométrie, le débit, et le temps de fonctionnement.",
      short: "Circuit",
      kicker: "Station 3 · Lecture de plan",
      title: "Le retour naturel se lit comme un chemin continu",
      lead: "Depuis la sortie de l’évaporateur, suivre la conduite jusqu’au carter permet de repérer chaque obstacle au transport de l’huile.",
      details: [
        "Contrôler dans l’ordre la pente, les points bas, le siphon en pied, la section de la montée et la boucle haute éventuelle.",
        "Puis confronter ce tracé aux débits minimal et maximal : un dessin correct au nominal peut devenir insuffisant à charge réduite."
      ],
      box: { type: "key", text: "Un schéma fluidique se lit du point de départ au point de retour : géométrie + débit + temps de fonctionnement." },
      visual: { kind: "oilReturnFilmSlot", title: "Animation guidée : suivre l’huile", label: "Animation inerWeb adaptée du projet Claude Design Retour d’huile, avec onze scènes commandées par l’élève", caption: "Adaptation complète et hors ligne du projet Claude fourni par Franck : lecture manuelle, texte visible et symboles de la bibliothèque technique inerWeb." }
    },
    {
      id: "transitoires",
      narration: "Le retour d'huile ne se juge pas sur un instant, mais sur une durée et sur plusieurs états de la machine. Les cycles trop courts envoient de l'huile sans laisser le temps à l'équilibre de se rétablir. Après un dégivrage, après une longue réduction de puissance, après un redémarrage, le niveau varie avant de se stabiliser — et ce qu'on lit pendant cette période ne veut rien dire. Une lecture instantanée du voyant ne suffit donc pas. Notez le régime, notez l'heure, et suivez l'évolution du niveau. C'est la même exigence de stabilisation que partout ailleurs en hydraulique et en frigorifique.",
      short: "Transitoires",
      kicker: "Station 4 · Temps",
      title: "Démarrages courts et changements de régime déplacent l’huile",
      lead: "Le retour d’huile se juge sur une durée suffisante et sur plusieurs états de la machine.",
      details: [
        "Les cycles trop courts peuvent envoyer de l’huile sans laisser le temps à l’équilibre de se rétablir.",
        "Après un dégivrage, une longue réduction de puissance ou un redémarrage, le niveau peut varier avant de se stabiliser."
      ],
      box: { type: "key", text: "Une lecture instantanée du voyant ne suffit pas : noter le régime, l’heure et l’évolution du niveau." },
      visual: { kind: "timeline", title: "Observer une séquence complète", label: "Frise démarrage, régime stable, charge réduite et retour au régime stable" }
    },
    {
      id: "methode",
      narration: "Avant d'ajouter de l'huile, cherchez où elle est partie. C'est la règle qui distingue un dépannage d'un pansement. Un niveau bas peut venir d'un défaut de retour, d'une fuite, d'un régime transitoire, ou simplement d'une charge initiale incorrecte — quatre causes, quatre traitements différents. La démarche : observez le niveau dans les conditions prévues, relevez quels compresseurs sont actifs, examinez le tracé des tuyauteries. Recoupez ensuite température, pression, stabilité et historique. Et n'ajoutez l'huile approuvée qu'après avoir identifié le besoin réel. Une valeur isolée ne désigne jamais une panne : c'est l'ensemble niveau, régime, temps et tuyauterie qui construit le diagnostic.",
      short: "Vérifier",
      kicker: "Station 5 · Diagnostic",
      title: "Avant d’ajouter : chercher où l’huile est partie",
      lead: "Un niveau bas peut venir d’un défaut de retour, d’une fuite, d’un régime transitoire ou d’une charge initiale incorrecte.",
      details: [
        "Observer le niveau dans les conditions prévues, relever les compresseurs actifs et examiner le tracé des tuyauteries.",
        "Recouper température, pression, stabilité et historique. N’ajouter l’huile approuvée qu’après avoir identifié le besoin réel."
      ],
      box: { type: "exam", text: "Une valeur isolée ne désigne pas une panne : niveau + régime + temps + tuyauterie construisent le diagnostic." },
      visual: { kind: "observe", title: "Mesurer avant de décider", label: "Voyant de carter, chronomètre, relevé des régimes et contrôle de tuyauterie" }
    }
  ],
  quiz: [
    {
      prompt: "Pourquoi vérifier le fonctionnement à charge minimale ?",
      options: ["Le débit et la vitesse y baissent", "La pression du carter y est plus haute", "L’huile se fige à basse température"],
      correct: 0,
      why: "Le retour peut être correct à pleine charge et insuffisant dès que le débit diminue.",
      code: "6.05"
    },
    {
      prompt: "À charge réduite, comment la double colonne maintient-elle une vitesse utile ?",
      options: ["Une vanne électrique ferme la petite montée", "L’huile bouche la grande, le gaz file dans la petite", "Le débit se répartit également dans les deux"],
      correct: 1,
      why: "La grande montée est temporairement scellée par l’huile accumulée ; tout le débit traverse alors la petite section. Aucun organe électrique n’intervient.",
      code: "1.05 · 6.05"
    },
    {
      prompt: "Le voyant de carter indique un niveau bas juste après un changement de régime. Que faire d’abord ?",
      options: ["Observer l’évolution et vérifier le régime", "Ajouter de l’huile sans autre contrôle", "Arrêter l’installation immédiatement"],
      correct: 0,
      why: "Le niveau bouge après un changement de régime : il faut le suivre dans le temps avant de conclure.",
      code: "6.05"
    },
    {
      prompt: "Niveau bas avec une colonne d’aspiration : que lire d’abord ?",
      options: ["La référence de l’huile du carter", "La température de la salle des machines", "Le trajet : pente, points bas, siphon"],
      correct: 2,
      why: "Suivre le chemin réel de l’huile, puis recouper avec le régime et l’évolution du niveau.",
      code: "6.05"
    },
    {
      prompt: "Une colonne montante a 26 mm de diamètre intérieur. Quelle est sa section de passage ?",
      options: ["2 124 mm²", "531 mm²", "82 mm²"],
      correct: 1,
      why: "S = π × d² / 4, soit 3,14 × 26 × 26 / 4 ≈ 531 mm². Oublier le « divisé par 4 » donne 2 124 mm², et π × d donne le périmètre, pas la section.",
      code: "6.05"
    },
    {
      prompt: "Le débit aspiré est de 18 m³/h dans cette section de 531 mm². Quelle vitesse de gaz ?",
      options: ["environ 0,009 m/s", "environ 5,6 m/s", "environ 9,4 m/s"],
      correct: 2,
      why: "18 m³/h font 0,005 m³/s, et 531 mm² font 0,000531 m². 0,005 / 0,000531 ≈ 9,4 m/s. Les deux conversions doivent être faites avant la division.",
      code: "6.05"
    },
    {
      prompt: "À 40 % de charge, la vitesse calculée tombe à 3,8 m/s. Que faire ?",
      options: ["Conclure que le tube est trop petit", "Comparer au repère validé du tracé", "Ignorer la baisse due au débit"],
      correct: 1,
      why: "La section n’a pas changé : c’est le débit qui a chuté. La valeur se compare au repère du projet et du constructeur, pas à une règle apprise par cœur.",
      code: "1.05 · 6.05"
    }
  ],
  sources: [
    {
      title: "BITZER — Causes of too low oil level and loss of oil",
      url: "https://www.bitzer.de/shared_media/html/est-600/en-GB/345371019345395723.html",
      use: "vitesse du gaz, tuyauteries, charge partielle et méthode de diagnostic"
    },
    {
      title: "BITZER — Oil level and oil return in refrigeration systems",
      url: "https://www.bitzer.de/shared_media/html/est-600/en-GB/339634059339636747.html",
      use: "équilibre du niveau et contrôle aux différents régimes"
    },
    {
      title: "Danfoss — Industrial Refrigeration Application Handbook",
      url: "https://assets.danfoss.com/documents/latest/470491/AB137786416217en-000801.pdf",
      use: "principes de gestion et de retour d’huile"
    },
    {
      title: "Copeland — Refrigeration Manual, System Design",
      url: "https://media.copeland.com/2c65d92c-bb4b-48e1-96e4-b1aa011847e5/AE104-System%20Design.pdf",
      use: "siphons, montées d’aspiration et fonctionnement d’une double colonne"
    },
    {
      title: "BITZER — Suction gas line",
      url: "https://www.bitzer.de/shared_media/html/st-600/en-GB/652371595652373387.html",
      use: "tracés d’aspiration, retour à charge partielle et montée dédoublée"
    },
    {
      title: "Légifrance — Arrêté du 21 novembre 2025, attestation d’aptitude",
      url: "https://www.legifrance.gouv.fr/jorf/id/JORFSCTA000053004646",
      use: "compétence pratique 6.05 : vérifier le retour d’huile"
    }
  ]
};
