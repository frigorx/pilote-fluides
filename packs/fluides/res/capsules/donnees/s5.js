/* Capsule s5 — « Consigner avant de toucher — le risque électrique » (Sécurité).
   Contenu repris SANS AJOUT de la fiche s5 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "s5",
  fiche: "s5",
  titre: "Consigner avant de toucher — le risque électrique",
  surtitre: "HABILITATION FLUIDES · SÉCURITÉ",
  duree: "environ 7 minutes",
  intro: "Un disjoncteur qui semble couper l'armoire, un bornier qu'on touche sans vérifier : ce risque n'a pas de code à l'examen, mais il tue chaque année. Cinq étapes le préviennent.",
  codes: [],

  visuelAccueil: {
    motif: "sequence",
    titre: "La consignation électrique, en cinq étapes",
    etapes: [
      { titre: "1. Séparer", texte: "couper l'alimentation de façon visible et certaine" },
      { titre: "2. Condamner", texte: "verrouiller l'organe de coupure" },
      { titre: "3. Identifier", texte: "vérifier qu'on est bien sur le bon circuit" },
      { titre: "4. Vérifier l'absence de tension", texte: "avec un VAT contrôlé", danger: true },
      { titre: "5. Mettre à la terre", texte: "quand cette étape s'impose" },
    ],
    pied: "Ce risque ne figure dans aucun code du référentiel d'examen fluides — il n'en est pas moins réel.",
  },

  ecrans: [
    {
      id: "armoire-pressee",
      titre: "« Le disjoncteur est coupé » — celui-là, vraiment ?",
      note: "La situation",
      visuel: {
        motif: "alerte",
        titre: "Le cas le plus fréquent",
        vignettes: [
          { picto: "🔌", etiquette: "ce qui semble vrai", titre: "Le disjoncteur est coupé", texte: "il semble commander l'armoire" },
          { picto: "⚠", etiquette: "ce qui est réel", titre: "Un autre circuit y arrive aussi", texte: "resté sous tension, personne ne l'a vérifié" },
          { picto: "✅", etiquette: "le geste sûr", titre: "Consigner avant de toucher", texte: "les cinq étapes, à chaque fois, même pour « deux secondes »" },
        ],
      },
      texte: "<p>Un technicien pressé ouvre une armoire électrique pour un dépannage rapide. Le disjoncteur qui semble commander cette armoire est coupé, alors il touche directement un bornier — la barrette où arrivent les fils.</p><p>Mais personne n'a vérifié que ce disjoncteur coupait bien cette armoire précise : un autre circuit, resté sous tension, y arrive aussi.</p>",
      dire: "Voici la situation la plus fréquente. Un technicien pressé ouvre une armoire électrique pour un dépannage rapide. Le disjoncteur qui semble commander cette armoire est coupé, alors il touche directement un bornier, la barrette où arrivent les fils. Mais personne n'a vérifié que ce disjoncteur coupait bien cette armoire précise : un autre circuit, resté sous tension, y arrive aussi. Ce risque ne figure dans aucun code du référentiel d'examen fluides. Il n'en est pas moins réel : il tue des professionnels chaque année, sur les installations de froid et de climatisation comme sur toute autre installation électrique.",
      reference: "La situation · hors référentiel d'examen fluides",
    },

    {
      id: "electrisation-electrocution",
      titre: "Électrisation, électrocution : un seul phénomène",
      note: "Le vocabulaire exact",
      visuel: {
        motif: "duo",
        titre: "Le même phénomène, une gravité différente",
        cartes: [
          { titre: "ÉLECTRISATION", picto: "⚡", pour: "Le terme général", texte: "le courant traverse le corps : simple secousse, brûlures internes, troubles du cœur" },
          { titre: "ÉLECTROCUTION", picto: "☠", pour: "Quand ça tue", texte: "une électrisation qui entraîne la mort" },
        ],
        lien: "=",
        pied: "C'est le même phénomène ; seule la gravité change.",
      },
      texte: "<p>Le passage du courant électrique dans le corps humain porte un nom : l'<b>électrisation</b>. Ses effets vont de la simple secousse à des blessures graves — brûlures internes, troubles du cœur.</p><p>Quand une électrisation entraîne la mort, on parle d'<b>électrocution</b>. C'est le même phénomène ; seule la gravité change.</p>",
      dire: "Deux mots à ne pas confondre. Le passage du courant électrique dans le corps humain porte un nom : l'électrisation. Ses effets vont de la simple secousse à des blessures graves : brûlures internes, troubles du cœur. Quand une électrisation entraîne la mort, on parle d'électrocution. Retenez bien : c'est le même phénomène, seule la gravité change.",
      retenir: ["Électrisation : le courant traverse le corps. Électrocution : une électrisation qui tue — c'est le même phénomène."],
      reference: "Le vocabulaire · hors référentiel d'examen fluides",
    },

    {
      id: "arc-electrique",
      titre: "L'arc électrique : aucun contact nécessaire",
      note: "Un danger à distance",
      visuel: {
        motif: "flux",
        titre: "Comment un arc électrique se déclenche",
        boites: [
          { picto: "⚡", titre: "Deux points sous tension", texte: "ou un point sous tension et une masse" },
          { picto: "💥", titre: "Une décharge jaillit dans l'air", texte: "sans qu'il soit nécessaire de toucher quoi que ce soit", teinte: "danger" },
          { picto: "🔥", titre: "Chaleur, lumière, projections", texte: "des matières en fusion peuvent être projetées", teinte: "danger" },
        ],
        pied: "On peut se blesser gravement sans avoir touché aucun fil.",
      },
      texte: "<p>Un autre danger ne demande aucun contact : l'<b>arc électrique</b>. C'est une décharge qui jaillit dans l'air entre deux points sous tension, ou entre un point sous tension et une masse, sans qu'il soit nécessaire de toucher quoi que ce soit.</p><p>Un arc électrique brûle par la chaleur et la lumière qu'il dégage, et peut projeter des matières en fusion.</p>",
      dire: "Un autre danger, souvent oublié : l'arc électrique. Il ne demande aucun contact. C'est une décharge qui jaillit dans l'air entre deux points sous tension, ou entre un point sous tension et une masse, sans qu'il soit nécessaire de toucher quoi que ce soit. Un arc électrique brûle par la chaleur et la lumière qu'il dégage, et il peut projeter des matières en fusion. On peut donc se blesser gravement sans avoir touché aucun fil.",
      reference: "L'arc électrique · hors référentiel d'examen fluides",
      controle: {
        enonce: "Pour être blessé par un arc électrique, faut-il nécessairement toucher un fil ou une pièce sous tension ?",
        choix: [
          "Oui, sans contact direct, il ne peut rien arriver",
          "Non : un arc électrique peut jaillir dans l'air, sans qu'il soit nécessaire de toucher quoi que ce soit",
          "Oui, mais seulement si l'installation est très ancienne",
          "Non, mais seulement en extérieur, jamais dans une armoire électrique",
        ],
        bonne: 1,
        explication: "L'arc électrique est une décharge qui jaillit dans l'air entre deux points sous tension, ou entre un point sous tension et une masse. Aucun contact n'est nécessaire : il brûle par la chaleur et la lumière qu'il dégage, et peut projeter des matières en fusion.",
      },
    },

    {
      id: "condensateur-piege",
      titre: "Couper le courant ne suffit pas toujours",
      note: "Le piège du condensateur",
      visuel: {
        motif: "sequence",
        titre: "Ce que la coupure ne vide pas",
        etapes: [
          { titre: "On coupe l'alimentation", texte: "le courant ne circule plus" },
          { titre: "Un condensateur peut rester chargé", texte: "il stocke de l'énergie électrique, par exemple dans les circuits de démarrage de certains moteurs", danger: true },
          { titre: "Il reste dangereux", texte: "tant qu'il n'a pas été déchargé selon la méthode du constructeur", danger: true },
        ],
        pied: "Un condensateur touché juste après la coupure, alors qu'il est encore chargé, est une situation réelle et fréquente.",
      },
      texte: "<p>Un dernier piège : couper l'alimentation ne vide pas forcément tous les composants de leur énergie. Un <b>condensateur</b> est un composant qui stocke de l'énergie électrique ; on en trouve par exemple dans les circuits de démarrage de certains moteurs.</p><p>Il peut rester chargé après la coupure du courant, et reste dangereux tant qu'il n'a pas été déchargé selon la méthode indiquée par la documentation du constructeur.</p>",
      dire: "Un dernier piège, avant de passer à ce qui protège. Couper l'alimentation ne vide pas forcément tous les composants de leur énergie. Un condensateur est un composant qui stocke de l'énergie électrique ; on en trouve par exemple dans les circuits de démarrage de certains moteurs. Il peut rester chargé après la coupure du courant. Il reste alors dangereux tant qu'il n'a pas été déchargé selon la méthode indiquée par la documentation du constructeur de l'équipement.",
      reference: "Le condensateur · hors référentiel d'examen fluides",
    },

    {
      id: "consignation-cinq-etapes",
      titre: "La consignation électrique, en cinq étapes",
      note: "Le protocole",
      visuel: { svg: "secu-consignation.svg", alt: "Les cinq étapes dans l'ordre : séparer, condamner, identifier, vérifier l'absence de tension au VAT, mettre à la terre. Le VAT se teste avant et après sur une source connue." },
      legende: "Séparer, condamner, identifier, vérifier l'absence de tension, mettre à la terre.",
      texte: "<p>Avant de toucher un circuit ou un équipement électrique, la <b>consignation électrique</b> se déroule dans un ordre précis : <b>séparer</b> (couper l'alimentation de façon visible et certaine), <b>condamner</b> (verrouiller l'organe de coupure), <b>identifier</b> (vérifier qu'on est bien sur le bon circuit).</p><p>Puis <b>vérifier l'absence de tension</b> avec un <b>VAT</b> (vérificateur d'absence de tension) adapté à l'installation, et <b>mettre à la terre et en court-circuit</b> quand cette étape s'impose.</p>",
      dire: "Voici ce qui protège, dans un ordre précis, toujours le même. Un : séparer, c'est-à-dire couper l'alimentation électrique de façon visible et certaine. Deux : condamner, c'est-à-dire verrouiller l'organe de coupure en position ouverte, pour qu'il ne puisse pas être refermé par quelqu'un d'autre pendant l'intervention. Trois : identifier, c'est-à-dire vérifier qu'on se trouve bien sur le circuit que l'on vient de séparer, et pas sur un autre. Quatre : vérifier l'absence de tension, avec un V A T, un vérificateur d'absence de tension, adapté à l'installation. Cinq : mettre à la terre et en court-circuit, quand cette étape s'impose, notamment si une tension pourrait réapparaître par une autre source.",
      retenir: ["Consignation en cinq étapes, toujours dans l'ordre : séparer, condamner, identifier, vérifier l'absence de tension, mettre à la terre si besoin."],
      reference: "La consignation · hors référentiel d'examen fluides",
      controle: {
        enonce: "Vous devez intervenir dans une armoire électrique. Le disjoncteur qui semble l'alimenter est coupé. Que faites-vous avant de toucher quoi que ce soit à l'intérieur ?",
        choix: [
          "Je touche prudemment avec un seul doigt pour vérifier",
          "Je fais confiance au disjoncteur coupé et je commence l'intervention",
          "Je réalise les cinq étapes de la consignation, dont la vérification d'absence de tension avec un VAT contrôlé",
          "J'attends « que ça retombe » avant de commencer, sans autre vérification",
        ],
        bonne: 2,
        explication: "Un disjoncteur qui semble coupé ne suffit pas à garantir l'absence de tension : erreur d'identification, condensateur encore chargé, autre source d'alimentation. Seules les cinq étapes de la consignation, avec un VAT contrôlé avant et après sur une source connue, permettent de travailler en sécurité.",
      },
    },

    {
      id: "vat-fiable",
      titre: "Le VAT lui-même doit être digne de confiance",
      note: "Le double contrôle",
      visuel: {
        motif: "duo",
        titre: "Contrôler l'appareil, avant et après",
        cartes: [
          { titre: "AVANT", picto: "✅", pour: "Sur une source connue sous tension", texte: "on vérifie que le VAT fonctionne bien" },
          { titre: "APRÈS", picto: "🔁", pour: "Sur la même source connue", texte: "on refait le même contrôle" },
        ],
        lien: "+",
        pied: "Si le VAT fonctionnait au premier essai mais plus au second, tout ce qu'il a mesuré entre les deux n'est pas fiable.",
      },
      texte: "<p>Le VAT lui-même doit être digne de confiance. On le contrôle sur une source que l'on sait sous tension <b>avant</b> de l'utiliser sur le circuit à vérifier, puis on refait le même contrôle sur cette source connue <b>après</b>.</p><p>Si l'appareil fonctionnait au premier essai mais plus au second, tout ce qu'il a mesuré entre les deux doit être considéré comme non fiable.</p>",
      dire: "Un point que l'on oublie souvent : le vérificateur d'absence de tension doit lui-même être digne de confiance. On le contrôle sur une source que l'on sait sous tension, avant de l'utiliser sur le circuit à vérifier. Puis on refait exactement le même contrôle, sur cette même source connue, après. Si l'appareil fonctionnait au premier essai mais plus au second, il faut considérer que tout ce qu'il a mesuré entre les deux n'est pas fiable, et reprendre la vérification.",
      reference: "Le VAT · hors référentiel d'examen fluides",
    },

    {
      id: "final",
      titre: "Trois dangers, un seul geste qui protège",
      note: "À emporter",
      visuel: {
        motif: "checklist",
        titre: "Ce qu'il faut retenir",
        items: [
          { titre: "Électrisation, électrocution", texte: "le courant qui traverse le corps ; la gravité seule change" },
          { titre: "L'arc électrique", texte: "brûle sans aucun contact" },
          { titre: "Le condensateur", texte: "peut rester chargé après la coupure du courant" },
          { titre: "Jamais sans les cinq étapes", texte: "même pour « juste vérifier » ou « deux secondes »", refus: true },
        ],
      },
      texte: "<p>On ne travaille <b>jamais</b> sur une installation électrique sans avoir réalisé les cinq étapes de la consignation, même pour « juste vérifier » ou « deux secondes ». On ne fait <b>jamais</b> confiance à un simple arrêt visuel de la machine.</p><p>Seule une vérification d'absence de tension avec un VAT contrôlé fait foi.</p>",
      dire: "Pour finir, trois dangers à retenir : l'électrisation, qui peut tuer sous le nom d'électrocution ; l'arc électrique, qui brûle sans aucun contact ; et le condensateur, qui peut rester chargé après la coupure du courant. Face à ces trois dangers, un seul geste qui protège vraiment : on ne travaille jamais sur une installation électrique sans avoir réalisé les cinq étapes de la consignation, même pour « juste vérifier » ou « deux secondes ». On ne fait jamais confiance à un simple arrêt visuel de la machine : seule une vérification d'absence de tension, avec un VAT contrôlé, fait foi.",
      piege: "<p>On ne travaille <b>jamais</b> sur une installation électrique sans avoir réalisé les cinq étapes de la consignation, même pour « juste vérifier » ou « deux secondes ». On ne fait <b>jamais</b> confiance à un simple arrêt visuel de la machine : seule une vérification d'absence de tension avec un VAT contrôlé fait foi.</p><p>Conséquence : électrisation, électrocution, brûlure par arc électrique — ce risque tue chaque année.</p>",
      reference: "Le geste interdit · hors référentiel d'examen fluides",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet. Ce module sécurité est terminé : merci de l'avoir suivi jusqu'au bout.",
});
