/* =====================================================================
   Gare « RÉCEPTIONNER ET CONTRÔLER UNE LIVRAISON » (ligne « Avant d'intervenir »).
   Restructure, sans réinventer (voir SOURCES.md) :
   · la fiche de Franck « Réceptionner une livraison » (le bon de livraison, les six rubriques, vérifier le matériel puis les quantités,
     écrire les remarques sur le bon, signer, remettre le bon au responsable) ;
   · l'activité « Série 3 Activité 15 — Réception matériel et planification » (comparer la livraison à la commande ; différences physiques
     et techniques ; conforme ou à remplacer) : la méthode seulement, aucune donnée de ce sujet d'évaluation ;
   · les fiches pratiques frigoristes 2012 (manipulation et stockage des emballages sous pression).
   Aucune valeur inventée : références, quantités, tensions et fluides se lisent sur les documents et les plaques de la livraison.
   ===================================================================== */
(function () {
  window.GARE = {
    id: "receptionner-livraison",
    titre: "Réceptionner et contrôler une livraison",
    sousTitre: "Avant d'intervenir · gare 5.4 · le bon, les colis, le matériel, la plaque · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Une vraie livraison", aide: "le livreur, le bon de livraison, la commande et le matériel" } },
    machine: [
      { id: "commande", label: "Référence de ma commande (bon de commande)", court: "Commande", exemple: "ex. BC-2026-14", texte: true },
      { id: "fluide", label: "Fluide de l'installation (dossier)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "tension", label: "Tension prévue pour l'appareil (commande ou dossier)", court: "Tension prévue", unite: "V", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T6, T4 · compétences C2.2, C1.1 · savoirs S1.2, S3.1",
      mfer: "1re Bac Pro MFER — tâches A2T1 · compétences C5, C4 · savoirs S1.4, S4.1.4",
      commun: "gare de réception : bon de livraison, bon de commande et plaque du matériel (à relier à la station Législation « Marquage & papiers »)"
    },
    grille: [
      ["Je prends le bon, je le lis et je le compare à ma commande", { cap: "C2.2 · S1.2", mfer: "A2T1 · S1.4" }],
      ["Je contrôle les colis, le matériel et les quantités, ligne par ligne", { cap: "C2.2 · T6", mfer: "A2T1 · C5" }],
      ["Je lis les plaques et je vérifie que l'appareil convient à l'installation", { cap: "C2.2 · S3.1", mfer: "C5 · S4.1.4" }],
      ["J'écris les écarts sur le bon, je signe et je transmets", { cap: "C1.1 · T4", mfer: "C4 · S1.4" }]
    ],
    exigence: {
      cap: "bon lu en entier, référence comparée, colis, matériel et quantités contrôlés, écarts écrits avant de signer ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque écart écrit et je repère seul un appareil qui ne convient pas à l'installation."
    },
    savoirEtre: "je n'écris et je ne signe que ce que j'ai contrôlé",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const l = c.releve("materiel", 0), k = c.releve("materiel", 2), qb = c.releve("quantites", 0), qc = c.releve("quantites", 1);
      return `Commande <b>${c.m.commande || "…"}</b> · lignes du bon <b>${l || "…"}</b>, écarts <b>${k || "…"}</b> · ligne contrôlée : bon <b>${qb || "…"}</b>, compté <b>${qc || "…"}</b>`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1200 630",
      noms: { "equipment-bon": "le bon de livraison et la commande", "equipment-colis": "les colis", "equipment-materiel": "le matériel livré",
        "equipment-plaque": "la plaque de l'appareil", "equipment-ecarts": "les écarts notés sur le bon et la signature" }
    },

    etapes: [
      /* Franck, 08/10 : avant toute intervention, état des lieux — ici, l'état de la livraison telle qu'elle arrive. */
      { id: "arrivee", verbe: "J'accueille le livreur et je prépare l'endroit", cadre: ["equipment-colis"], cible: "equipment-colis",
        narration: "Cette gare s'appelle « Réceptionner et contrôler une livraison ». Dans le métier, on reçoit du matériel de ses fournisseurs : à l'atelier, au siège de l'entreprise, ou directement sur le chantier. Pour éviter de perdre du temps plus tard et les discussions avec le fournisseur, la réception se fait avec méthode. Première chose : l'endroit où l'on dépose doit être dégagé, et vous portez vos protections. Une charge lourde ne se porte jamais seul : on demande de l'aide, on prend un diable. Les bouteilles de fluide se manipulent avec précaution : une chute peut casser le robinet.",
        regarde: "L'endroit de déchargement, le livreur, les colis.",
        fais: "Je dégage l'endroit où l'on dépose. Chaussures de sécurité et gants. Une charge lourde : à deux, avec un diable, jamais seul. Rien ne tombe, rien ne se choque.",
        voir: "Un endroit dégagé, mes protections portées, des colis déposés sans choc.",
        danger: "Charge lourde : jamais seul. À deux, avec un diable. Une bouteille qui tombe peut casser son robinet.",
        controle: { titre: "Je coche ce que j'ai préparé", type: "coches",
          items: ["l'endroit de déchargement est dégagé", "mes chaussures de sécurité et mes gants sont portés", "une charge lourde : je demande de l'aide et j'utilise un diable, je ne la porte pas seul", "je regarde chaque colis qu'on dépose : aucun choc"],
          ok: "Endroit prêt : on peut ouvrir la réception.", manque: "Il manque une coche : je prépare l'endroit avant de commencer." } },

      { id: "bon", verbe: "Je prends le bon de livraison et je le lis", cadre: ["equipment-bon"], cible: "equipment-bon",
        narration: "Le livreur doit vous remettre un bon de livraison. Vous le lisez en entier. Il doit indiquer le vendeur, le client, la référence de la commande, la désignation du matériel livré, la quantité livrée, et éventuellement la partie de la commande qui reste à livrer. Un bon incomplet, on le signale tout de suite : sans lui, on ne peut rien contrôler.",
        regarde: "Le bon de livraison, de haut en bas.",
        fais: "Je prends le bon de livraison. Je cherche chacune des six rubriques. S'il en manque une, je le dis au livreur et au professeur.",
        voir: "Les six rubriques trouvées sur le bon.",
        controle: { titre: "Je coche ce que le bon indique", type: "coches",
          items: ["le vendeur", "le client", "la référence de la commande", "la désignation du matériel livré", "la quantité livrée", "ce qui reste à livrer, s'il y a une suite"],
          ok: "Bon complet : je peux contrôler la livraison.", manque: "Il manque une rubrique : je le dis au livreur et au professeur." } },

      { id: "commande", verbe: "Je compare avec ma commande", cadre: ["equipment-bon"], cible: "equipment-bon",
        narration: "La référence de commande écrite sur le bon doit être la même que celle de votre bon de commande. Si ce n'est pas la même, ce n'est peut-être pas votre livraison, ou pas le bon chantier : on ne signe rien. La comparaison complète de la livraison avec la commande est en principe faite par le responsable. Mais vous, vous vérifiez au moins cela avant d'ouvrir un colis.",
        regarde: "La référence de commande du bon et celle de mon bon de commande.",
        fais: "Je lis la référence de commande écrite sur le bon de livraison. Je l'écris ci-dessous. Je la compare à celle de mon bon de commande.",
        voir: "La même référence sur le bon de livraison et sur ma commande.",
        danger: "Référence différente : ce n'est peut-être pas ma livraison. Je ne signe rien.",
        controle: { titre: "La référence du bon", champs: [{ label: "Référence de commande écrite sur le bon de livraison", texte: true }],
          juger(v, c) {
            if (!c.m.commande) return ["ambre", "J'écris d'abord la référence de mon bon de commande dans « Ma machine »."];
            return c.egal(v[0], c.m.commande) ? ["vert", "Même référence (" + c.m.commande + ") : c'est bien ma commande."]
              : ["rouge", "STOP : le bon dit " + v[0] + ", ma commande " + c.m.commande + ". Ce n'est pas la bonne livraison, ou le mauvais chantier : j'appelle le professeur."];
          } } },

      { id: "colis", verbe: "Je regarde l'état des colis", cadre: ["equipment-colis"], cible: "equipment-colis",
        narration: "Avant de déballer, on regarde l'extérieur. Un emballage écrasé, mouillé, déchiré, c'est peut-être un matériel abîmé à l'intérieur. Les bouteilles de fluide doivent être bien sanglées, loin de toute source de chaleur et du soleil. Ce que vous voyez d'anormal, vous le notez maintenant : on ne peut plus le prouver une fois le livreur parti.",
        regarde: "L'extérieur de chaque colis : emballage, étiquette, bouteilles.",
        fais: "Je regarde chaque colis avant de l'ouvrir : emballage, étiquette, bouteilles. Je note ce qui est écrasé, mouillé ou déchiré, avec le livreur encore là.",
        voir: "Chaque colis regardé ; ce qui est anormal est noté.",
        danger: "Une bouteille qui siffle ou qui sent : je m'éloigne et j'appelle le professeur.",
        controle: { titre: "Je coche ce que j'ai regardé", type: "coches",
          items: ["les emballages : ni écrasés, ni mouillés, ni déchirés", "les étiquettes des colis sont lisibles", "les bouteilles de fluide sont sanglées, loin d'une source de chaleur et du soleil", "ce qui est anormal est noté, avec le livreur encore là"],
          ok: "Colis regardés : je peux contrôler le matériel.", manque: "Il manque une coche : je regarde encore avant d'ouvrir." } },

      { id: "materiel", verbe: "Je contrôle le matériel ligne par ligne", cadre: ["equipment-materiel"], cible: "equipment-materiel",
        narration: "Maintenant le matériel lui-même. Vous prenez les lignes du bon une par une et vous vérifiez que ce que vous tenez est bien ce qui est écrit : la référence, la désignation, le diamètre, le raccord. Un raccord à braser n'est pas un raccord à visser. Vous comptez les lignes du bon, les lignes conformes et les lignes avec un écart. Les deux derniers nombres, ajoutés, doivent faire le premier : sinon, une ligne n'a pas été regardée.",
        regarde: "Chaque ligne du bon, et le matériel qui va avec.",
        fais: "Je prends les lignes du bon une par une. Pour chacune, je compare la référence, la désignation, le diamètre et le raccord. Je compte les lignes conformes et celles avec un écart.",
        voir: "Chaque ligne du bon regardée : conforme, ou écart noté.",
        controle: { titre: "Mes lignes", champs: [{ label: "Lignes sur le bon", unite: "lignes" }, { label: "Lignes conformes", unite: "lignes" }, { label: "Lignes avec un écart", unite: "lignes" }],
          juger(v, c) {
            const n = c.nb(v[0]), ok = c.nb(v[1]), ec = c.nb(v[2]);
            if ([n, ok, ec].some(x => isNaN(x) || x < 0 || x !== Math.floor(x)) || n < 1) return ["ambre", "J'écris trois nombres entiers : les lignes du bon (au moins 1), les conformes, les lignes avec écart."];
            if (ok + ec !== n) return ["ambre", "Je compte " + ok + " conformes et " + ec + " avec écart, soit " + (ok + ec) + " pour " + n + " lignes. Une ligne n'a pas été regardée : je reprends le bon."];
            if (ec > 0) return ["ambre", ec + " ligne" + (ec > 1 ? "s" : "") + " avec un écart : je l'écrirai sur le bon avant de signer."];
            return ["vert", n + " lignes, " + ok + " conformes, aucun écart : le matériel correspond au bon."];
          } } },

      { id: "quantites", verbe: "Je compte les quantités", cadre: ["equipment-materiel"], cible: "equipment-materiel",
        narration: "Maintenant on compte. Pour chaque ligne, la quantité écrite sur le bon doit être la quantité que vous avez devant vous. Un exemple : le bon dit dix barres, vous en comptez huit. Il en manque deux : vous écrirez « manque deux barres » sur le bon. Vous choisissez une ligne du bon et vous la contrôlez avec ses deux nombres ; ensuite, vous faites pareil pour toutes les autres.",
        regarde: "La quantité du bon et ce que je compte devant moi.",
        fais: "Je choisis une ligne du bon. Je lis sa quantité. Je compte ce qui est livré. J'écris les deux nombres. Je fais pareil pour chaque autre ligne.",
        voir: "Ex. : le bon dit 10 barres, j'en compte 8 : « manque 2 barres ».",
        controle: { titre: "Une ligne contrôlée", champs: [{ label: "Quantité écrite sur le bon", unite: "pièces" }, { label: "Quantité comptée", unite: "pièces" }],
          juger(v, c) {
            const b = c.nb(v[0]), q = c.nb(v[1]);
            if (isNaN(b) || isNaN(q) || b < 0 || q < 0) return ["ambre", "J'écris deux nombres : la quantité du bon, puis celle que j'ai comptée."];
            if (q < b) return ["ambre", "Il manque " + c.fr(b - q, 0) + " : j'écris « manque " + c.fr(b - q, 0) + " » sur le bon avant de signer."];
            if (q > b) return ["ambre", "J'ai " + c.fr(q - b, 0) + " de plus que sur le bon : je recompte. Si c'est confirmé, je l'écris sur le bon."];
            return ["vert", "Quantité du bon = quantité comptée (" + c.fr(q, 0) + ") : la ligne est juste."];
          } } },

      { id: "plaque", verbe: "Je lis la plaque des appareils", cadre: ["equipment-plaque"], cible: "equipment-plaque",
        narration: "Une référence juste ne suffit pas toujours : l'appareil doit convenir à l'installation. Vous lisez sa plaque : la tension d'alimentation, le fluide pour lequel il est fait. Vous les comparez à la commande et au dossier. Un appareil qui n'a pas la bonne tension ne se monte pas. Un appareil qui n'est pas fait pour le fluide de l'installation non plus. Vous écrivez ce que vous lisez, pas ce que vous espérez.",
        regarde: "La plaque de chaque appareil : tension, fluide.",
        fais: "Je lis la plaque de l'appareil livré. J'écris sa tension et son fluide. Je les compare à ce qui est prévu dans « Ma machine ».",
        voir: "Tension et fluide de la plaque égaux à ceux de l'installation.",
        danger: "Tension ou fluide différents : l'appareil ne se monte pas. Il est « à remplacer ».",
        controle: { titre: "La plaque de l'appareil livré", champs: [{ label: "Tension écrite sur la plaque", unite: "V" }, { label: "Fluide écrit sur la plaque", texte: true }],
          juger(v, c) {
            const u = c.nb(v[0]), up = c.nb(c.m.tension);
            if (isNaN(u)) return ["ambre", "J'écris la tension de la plaque, en volts, par exemple 230."];
            if (isNaN(up) || !c.m.fluide) return ["ambre", "J'écris d'abord la tension prévue et le fluide de l'installation dans « Ma machine »."];
            if (!c.proche(u, up, 0.1, 2)) return ["rouge", "STOP : " + c.fr(u, 0) + " V sur la plaque, " + c.fr(up, 0) + " V prévus. L'appareil ne convient pas : je ne le monte pas, je l'écris « à remplacer »."];
            if (!c.egal(v[1], c.m.fluide)) return ["rouge", "STOP : la plaque dit " + v[1] + ", l'installation est en " + c.m.fluide + ". L'appareil n'est pas compatible : je ne le monte pas, je l'écris « à remplacer »."];
            return ["vert", "Plaque à " + c.fr(u, 0) + " V et " + v[1] + " : l'appareil convient à l'installation."];
          } } },

      { id: "remarques", verbe: "J'écris mes remarques sur le bon", cadre: ["equipment-ecarts"], cible: "equipment-ecarts",
        narration: "Avant de signer, on écrit les remarques sur le bon de livraison. Chaque manque : quoi, et combien. Chaque erreur : ce qui est livré, au lieu de ce qui est commandé. Par exemple : « manque deux barres de cuivre de quatorze par un », ou « livré quatre coudes mâle-femelle au lieu de quatre coudes femelle-femelle ». Chaque colis abîmé aussi. Le fournisseur doit pouvoir lire et comprendre. Le professeur vient vérifier vos remarques avant que vous signiez.",
        regarde: "Le bon de livraison, mes notes, mes lignes avec un écart.",
        fais: "J'écris sur le bon, lisiblement : chaque manque (quoi, combien), chaque erreur (livré au lieu de commandé), chaque colis abîmé.",
        voir: "Chaque écart écrit en clair sur le bon, avant ma signature.",
        controle: { titre: "Je coche mes remarques", type: "coches",
          items: ["chaque manque est écrit : quoi, combien", "chaque erreur est écrite : ce qui est livré, au lieu de ce qui est commandé", "chaque colis abîmé est noté", "mes remarques sont lisibles par le fournisseur"],
          ok: "Remarques écrites : le fournisseur pourra les lire.", manque: "Il manque une coche : j'écris encore avant de signer." },
        arret: "Le professeur a vérifié : mes remarques sur le bon, avant que je signe." },

      { id: "signer", verbe: "Je signe et je remets le bon", cadre: ["equipment-ecarts"], cible: "equipment-ecarts",
        narration: "Maintenant, vous pouvez signer le bon de livraison. En général, le livreur vous remet un exemplaire du bon et en garde un autre. Le vôtre doit être remis à votre responsable : c'est lui qui vérifiera la livraison par rapport à la commande, et qui décidera de la suite. Signer, c'est dire : j'ai contrôlé, et ce que j'ai écrit est vrai.",
        regarde: "Le bon, sa signature, les deux exemplaires.",
        fais: "Je signe le bon. Le livreur garde un exemplaire et me remet l'autre. Je remets mon exemplaire à mon responsable.",
        voir: "Bon signé ; un exemplaire au livreur, un à mon responsable.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["j'ai signé le bon de livraison", "le livreur garde un exemplaire et me remet l'autre", "mon exemplaire est remis à mon responsable"],
          ok: "Bon signé et transmis.", manque: "Il manque une coche : le bon n'est pas transmis." } },

      { id: "ranger", verbe: "Je range et je préviens mon responsable", cadre: ["equipment-colis"], cible: "equipment-colis",
        narration: "Dernière étape : ranger le matériel et dire ce qui change. On range à l'abri, dans une zone aérée, pas près d'une source de chaleur ni en plein soleil. Les bouteilles restent sanglées. Vous dites à votre responsable ce qui manque ou ce qui est à remplacer, parce que cela peut changer le planning du chantier : on ne monte pas ce qui manque. Le professeur vient vérifier. La gare est terminée.",
        regarde: "Les colis rangés, la zone de stockage, mon responsable.",
        fais: "Je range le matériel à l'abri, en zone aérée, loin de la chaleur. Les bouteilles : sanglées. Je dis à mon responsable ce qui manque ou ce qui est à remplacer.",
        voir: "Matériel rangé, bouteilles sanglées, responsable prévenu.",
        danger: "Bouteilles : jamais près d'une source de chaleur ni en plein soleil.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["le matériel est rangé à l'abri, dans une zone aérée", "les bouteilles sont sanglées, loin d'une source de chaleur et du soleil", "mon responsable sait ce qui manque ou ce qui est à remplacer", "j'ai dit ce qui change pour la suite du chantier"],
          ok: "Livraison réceptionnée, rangée et signalée.", manque: "Il manque une coche : je ne range pas avant." },
        arret: "Le professeur a vérifié : le matériel rangé et mon responsable prévenu." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { commande: "BC-2026-14", fluide: "R-449A", tension: "230" },
      charge: { commande: ["BC 2026 14"], materiel: ["8", "8", "0"], quantites: ["10", "10"], plaque: ["230", "R449A"] }
    }
  };
})();
