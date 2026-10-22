/* =====================================================================
   Gare « PRÉPARER LE SITE D'INTERVENTION » (ligne « Avant d'intervenir »).
   Accès, papiers, dangers, protections, alimentation, accès en hauteur, zone de travail.
   Restructure, sans réinventer (voir SOURCES.md) :
   · capsule « Préparation de chantier — risques, EPI, zone de travail » (codes 12.04 et 12.05) : l'ordre des quatre temps et les cinq points ;
   · fiches pratiques frigoristes 2012 (préparation de l'intervention, travail en hauteur, travail isolé) ;
   · fiche « Accueil sécurité » d'un site industriel (CCF EP1 2025-26) : accueil, badge, briefing ;
   · stations Législation « Les papiers du chantier », « Le permis de feu », « En hauteur » (renvois) ;
   · base fluides d'inerWeb (classe de sécurité par fluide).
   Aucune valeur inventée : tensions et classes se lisent sur les plaques et les fiches.
   ===================================================================== */
(function () {
  /* classe de sécurité par fluide : packs/fluides/res/outils/fluides-data.js (base fluides d'inerWeb) */
  const CLASSE = { R22: "A1", R32: "A2L", R134A: "A1", R404A: "A1", R407C: "A1", R410A: "A1", R448A: "A1", R449A: "A1", R454B: "A2L", R454C: "A2L",
    R513A: "A1", R1234YF: "A2L", R1234ZE: "A2L", R290: "A3", R600A: "A3", R717: "B2L", R744: "A1" };
  const cle = f => String(f || "").toUpperCase().replace(/[\s-]/g, "");

  window.GARE = {
    id: "preparer-site",
    titre: "Préparer le site d'intervention : accès, protections, alimentation, zone de travail",
    sousTitre: "Avant d'intervenir · gare 5.2 · accès, papiers, protections, alimentation, zone · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Sur le site", aide: "le local, la machine, les papiers et les protections" } },
    machine: [
      { id: "fluide", label: "Fluide de la machine (plaque)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "tension", label: "Tension de l'appareil à brancher (plaque de la pompe à vide ou de la station)", court: "Appareil", unite: "V", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T7, T8 · compétences C2.3, C2.1, C2.4 · savoirs S1.2, S6.2, S6.3",
      mfer: "1re Bac Pro MFER — tâches A1T3 · compétences C4 · savoirs S1.4, S7.2.3",
      commun: "attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) : 12.04 (réaliser l'analyse de risques avant le travail), 12.05 (préparer la zone de travail et choisir les EPI adaptés)"
    },
    grille: [
      ["Je fais l'état des lieux du site et je règle mon accès", { cap: "C2.3 · T7", mfer: "A1T3 · C4" }],
      ["Je vérifie les papiers du chantier avant de commencer", { cap: "S1.2 · C2.3", mfer: "S1.4 · C4" }],
      ["Je repère les dangers du jour et les sécurités du site", { cap: "C2.4 · S6.3", mfer: "A1T3 · S7.2.3" }],
      ["Je choisis mes protections et je prépare l'alimentation, l'accès en hauteur et la zone", { cap: "T8 · C2.4 · S6.2", mfer: "C4 · S7.2.3" }],
      ["Je note, je prévois et je fais valider avant de commencer", { cap: "C2.1", mfer: "C4" }]
    ],
    exigence: {
      cap: "papiers vérifiés avant de commencer, dangers repérés, protections choisies pour le fluide, zone préparée ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque protection par le danger qu'elle couvre et je repère seul ce qui manque avant de commencer."
    },
    savoirEtre: "je ne commence pas tant qu'un point de sécurité manque",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const cl = c.releve("dangers", 0), u = c.releve("alimentation", 0);
      return `Fluide <b>${c.m.fluide || "…"}</b> (classe <b>${cl || "…"}</b>) · tension à la prise <b>${u || "…"} V</b> pour un appareil de <b>${c.m.tension || "…"} V</b>`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1200 630",
      noms: { "equipment-acces": "l'accès au site", "equipment-papiers": "les papiers du chantier", "equipment-protections": "les protections (EPI)",
        "equipment-alimentation": "l'alimentation électrique", "equipment-hauteur": "l'accès en hauteur", "equipment-zone": "la zone de travail" }
    },

    etapes: [
      /* Franck, 08/10 : avant toute intervention, état des lieux — ici, le site tel qu'on le trouve. */
      { id: "etat", verbe: "Je fais l'état des lieux du site", cadre: ["equipment-zone"], cible: "equipment-zone",
        narration: "Cette gare s'appelle « Préparer le site d'intervention ». Avant de sortir un seul outil, on regarde où l'on va travailler. Vous faites le tour sans rien toucher : le local, ses issues, la ventilation, la machine et ce qui l'entoure. Vous comparez avec le bon : ce que vous voyez correspond-il à ce qu'on vous a annoncé ? Si quelque chose a changé, vous le notez et vous le dites au professeur. Ensuite, on règle l'accès.",
        regarde: "Le local, ses issues, la machine et ce qui est stocké autour.",
        fais: "Je fais le tour sans rien toucher : issues, ventilation, machine, stockage. Je compare avec le bon et je note ce qui a changé.",
        voir: "Un tour complet fait ; les écarts avec le bon sont notés.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["les issues du local, libres", "la ventilation du local", "la machine et son entourage : stockage, passage", "ce qui a changé depuis le bon, noté"],
          ok: "État des lieux fait : je sais où je mets les pieds.", manque: "Il manque une coche : je refais le tour avant de continuer." } },

      { id: "acces", verbe: "Je règle mon accès au site", cadre: ["equipment-acces"], cible: "equipment-acces",
        narration: "On entre sur un site par son accueil, pas par la porte du fond. Vous vous présentez avec votre pièce d'identité, vous recevez un badge de visiteur que vous gardez sur vous, et vous suivez le briefing de sécurité du site. Vous notez qui est votre interlocuteur sur place, et comment le joindre. Si vous travaillez seul, vous savez comment alerter quelqu'un : un téléphone peut suffire. Ensuite, les papiers.",
        regarde: "L'accueil, le badge, la personne à voir sur place.",
        fais: "Je me présente à l'accueil avec ma pièce d'identité. Je prends mon badge. Je suis le briefing de sécurité. Je note le nom et le téléphone de mon interlocuteur.",
        voir: "Badge porté, briefing suivi, interlocuteur noté.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["je me suis présenté à l'accueil, pièce d'identité en main", "mon badge de visiteur est porté, bien visible", "j'ai suivi le briefing de sécurité du site", "j'ai le nom et le téléphone de mon interlocuteur", "si je travaille seul : j'ai un moyen de prévenir quelqu'un (téléphone)"],
          ok: "Accès réglé : on sait que je suis là et qui appeler.", manque: "Il manque une coche : je ne vais pas plus loin avant." } },

      { id: "papiers", verbe: "Je vérifie les papiers du chantier", cadre: ["equipment-papiers"], cible: "equipment-papiers",
        narration: "Avant de commencer, certains papiers doivent être signés. Selon le chantier, ce peut être un plan de prévention, quand une entreprise extérieure travaille chez un client, un permis de feu si vous devez braser, ou une autorisation de consigner. Vous ne les inventez pas : le professeur ou le chef d'équipe vous dit lesquels sont nécessaires, et vous vérifiez qu'ils sont signés. Pas de papier signé, pas de travail. Le professeur vient vérifier avec vous.",
        regarde: "Les papiers du chantier : plan de prévention, permis de feu…",
        fais: "Je demande au professeur quels papiers il faut. Je vérifie que chacun est signé, daté, et qu'il parle bien de mon intervention.",
        voir: "Chaque papier demandé est signé, daté, à ma portée.",
        danger: "Papier manquant ou non signé : je ne commence pas.",
        controle: { titre: "Je coche ce que j'ai vérifié", type: "coches",
          items: ["la liste des papiers exigés, donnée par le professeur", "le plan de prévention signé, si une entreprise extérieure intervient", "le permis de feu signé, si je dois braser", "l'autorisation de consigner, si elle est demandée", "chaque papier est daté et cite bien mon intervention",
            "<span>je sais où revoir ces papiers : <a href='../../../legislation/stations/risques-papiers-chantier/'>« Les papiers du chantier »</a> et <a href='../../../legislation/stations/incendie-permis-de-feu/'>« Le permis de feu »</a></span>"],
          ok: "Papiers en règle : je peux regarder les dangers.", manque: "Il manque une coche : je ne commence pas avant." },
        arret: "Le professeur a vérifié : les papiers exigés sont là et signés." },

      { id: "dangers", verbe: "Je repère les dangers du jour", cadre: ["equipment-zone"], cible: "equipment-zone",
        narration: "L'analyse de risques suit toujours le même ordre. D'abord le fluide : est-il inflammable, sous pression, dans un local fermé ? Vous lisez la plaque et la classe de sécurité. Ensuite les dangers du lieu : ventilation, sources de chaleur ou d'étincelle, passage, présence d'autres personnes. Ce qu'on peut supprimer, on le supprime : on dégage un passage, on éloigne une source de chaleur. Ce qu'on ne peut pas supprimer, on le signale. Un point qui bloque vraiment arrête le chantier.",
        regarde: "La plaque, la classe du fluide, le local, les sources de chaleur.",
        fais: "Je lis la classe du fluide. Je repère les dangers du lieu : ventilation, chaleur ou étincelles, passage, autres personnes. Je supprime ce que je peux, je signale le reste.",
        voir: "Fluide identifié, dangers du lieu listés, le reste signalé.",
        danger: "Un point qui bloque vraiment arrête le chantier : il ne se contourne pas.",
        controle: { titre: "Classe de sécurité du fluide", champs: [{ label: "Classe lue sur la plaque ou la fiche du fluide", texte: true }],
          juger(v, c) {
            const lue = String(v[0] || "").toUpperCase().replace(/\s/g, ""), vraie = CLASSE[cle(c.m.fluide)];
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            if (!vraie) return ["ambre", "Je n'ai pas ce fluide dans ma table : je lis la classe sur la plaque ou la fiche du fluide, et le professeur la vérifie."];
            if (lue !== vraie) return ["rouge", "STOP : j'ai écrit " + v[0] + " pour " + c.m.fluide + ", la base d'inerWeb dit " + vraie + ". Je relis la plaque, et j'appelle le professeur avant de continuer."];
            return /^A1$/.test(vraie)
              ? ["vert", c.m.fluide + " est A1 : non inflammable. Restent la pression, le froid et le manque d'air dans un local fermé."]
              : ["vert", c.m.fluide + " est " + vraie + " : inflammable. Ventilation, aucune source de chaleur ou d'étincelle, détecteur de gaz porté, pas de point chaud sans permis."];
          } } },

      { id: "securites", verbe: "Je repère les sécurités du site", cadre: ["equipment-zone"], cible: "equipment-zone",
        narration: "Un site a ses propres sécurités, et vous devez savoir où elles sont avant d'en avoir besoin. Le détecteur de gaz, s'il y en a un. L'arrêt d'urgence. L'extraction d'air. Les points d'eau : douche et rince-œil. L'endroit où s'échappent les soupapes de sécurité. Et surtout les issues de secours : libres et accessibles. Vous les repérez en marchant, pas en lisant un plan.",
        regarde: "Détecteur, arrêt d'urgence, extraction, douche, rince-œil, issues.",
        fais: "Je marche jusqu'à chaque sécurité et je la regarde de près. La liste est dans le contrôle ci-dessous : je n'en oublie aucune.",
        voir: "Chaque sécurité localisée ; les issues libres et accessibles.",
        controle: { titre: "Je coche ce que j'ai repéré", type: "coches",
          items: ["le détecteur de gaz, s'il y en a un", "l'arrêt d'urgence", "l'extraction d'air", "les points d'eau : douche et rince-œil", "l'endroit où s'échappent les soupapes de sécurité", "les issues de secours, libres et accessibles"],
          ok: "Sécurités repérées : je sais où aller en cas de problème.", manque: "Il manque une coche : je cherche encore avant de continuer." } },

      { id: "epi", verbe: "Je choisis mes protections", cadre: ["equipment-protections"], cible: "equipment-protections",
        narration: "Vos protections se choisissent d'après les dangers que vous venez de lister, pas d'après l'habitude. Les yeux : des lunettes. Les mains : des gants adaptés au produit et au froid. Les pieds : des chaussures de sécurité. Sur un site industriel, le gilet, et le casque dans les zones signalées. Si le fluide l'exige, un détecteur de gaz porté sur vous. Une protection qui manque, même une seule, et le chantier n'engage pas. Le professeur vient vérifier.",
        regarde: "Mes protections, posées devant moi.",
        fais: "Pour chaque danger listé, je choisis la protection qui lui répond. Je la porte ou je la pose à portée de main. Je vérifie son état.",
        voir: "Chaque danger a sa protection, et chaque protection est en bon état.",
        danger: "Une protection absente, même une seule : le chantier n'engage pas.",
        controle: { titre: "Je coche mes protections", type: "coches",
          items: ["lunettes de protection", "gants adaptés au produit et au froid", "chaussures de sécurité", "gilet et casque, si le site l'exige ou si la zone est signalée", "détecteur de gaz porté, si le fluide l'exige : vérifié avant de partir"],
          ok: "Protections choisies : chaque danger est couvert.", manque: "Il manque une coche : je ne commence pas avant." },
        arret: "Le professeur a vérifié : mes dangers listés et mes protections." },

      { id: "alimentation", verbe: "Je prépare l'alimentation", cadre: ["equipment-alimentation"], cible: "equipment-alimentation",
        narration: "Votre pompe à vide, votre station de récupération ont besoin du courant. Vous repérez la prise, ou le tableau, qui va les alimenter. Vous lisez la tension écrite sur la prise ou sur le tableau, et vous la comparez à la tension écrite sur la plaque de votre appareil. Elles doivent être les mêmes. Vous regardez aussi l'état de la rallonge : une gaine abîmée, on ne s'en sert pas. Vous ne touchez à aucun fil.",
        regarde: "La prise ou le tableau, la plaque de mon appareil, la rallonge.",
        fais: "Je lis la tension écrite à la prise ou au tableau. Je la compare à la plaque de mon appareil. Je regarde la rallonge : gaine abîmée, je ne m'en sers pas.",
        voir: "Même tension à la prise et sur la plaque ; rallonge en bon état.",
        danger: "Tension différente ou gaine abîmée : je ne branche pas, j'appelle le professeur.",
        controle: { titre: "La tension à la prise", champs: [{ label: "Tension écrite à la prise ou au tableau", unite: "V" }],
          juger(v, c) {
            const u = c.nb(v[0]), un = c.nb(c.m.tension);
            if (isNaN(u)) return ["ambre", "J'écris la tension lue à la prise, en volts, par exemple 230."];
            if (isNaN(un)) return ["ambre", "J'écris d'abord la tension de la plaque de mon appareil dans « Ma machine »."];
            if (!c.proche(u, un, 0.1, 2)) return ["rouge", "STOP : " + c.fr(u, 0) + " V à la prise pour un appareil de " + c.fr(un, 0) + " V. Je ne branche pas : j'appelle le professeur."];
            return ["vert", "Prise à " + c.fr(u, 0) + " V, appareil à " + c.fr(un, 0) + " V : même tension, je peux brancher quand le moment viendra."];
          } } },

      { id: "hauteur", verbe: "Je prévois l'accès en hauteur", cadre: ["equipment-hauteur"], cible: "equipment-hauteur",
        narration: "Une chambre froide, un groupe sur un toit, un évaporateur au plafond : l'équipement n'est pas toujours à hauteur de main. Si c'est le cas, on choisit le moyen d'accès avant de monter, avec le professeur. La nacelle, l'échafaudage ou la plateforme roulante passent d'abord. L'escabeau est pour les gestes courts, sans effort. L'échelle sert à monter, pas à travailler. Si l'équipement est à portée de main, cette étape est vite faite.",
        regarde: "L'équipement : à portée de main, ou en hauteur ?",
        fais: "Je regarde si l'équipement est en hauteur. Si oui, je demande le moyen d'accès au professeur. Échelle : en bon état, tenue en pied par un collègue, attachée en tête.",
        voir: "L'accès est choisi avec le professeur, ou je n'ai pas besoin de monter.",
        danger: "Une échelle sert à monter, pas à travailler. Je ne monte pas sans l'accord du professeur.",
        controle: { titre: "Je coche ce qui me concerne", type: "coches",
          items: ["j'ai regardé si l'équipement est en hauteur : toit, plafond, dessus de chambre froide", "si oui : le moyen d'accès est choisi avec le professeur", "si échelle : en bon état, bonne longueur, tenue en pied par un collègue, attachée en tête",
            "<span>à revoir : <a href='../../../legislation/stations/risques-hauteur/'>station « En hauteur »</a></span>"],
          ok: "Accès réglé : je ne monte que de la bonne façon.", manque: "Il manque une coche : je ne monte pas avant." } },

      { id: "zone", verbe: "Je prépare la zone de travail", cadre: ["equipment-zone"], cible: "equipment-zone",
        narration: "Dernière étape : on prépare l'endroit où l'on va travailler, en cinq points. On délimite la zone et on la signale. On garde une issue libre, utilisable à tout moment. On vérifie le matériel avant de s'en servir : un flexible douteux, un détecteur non vérifié restent à l'atelier. On met la ventilation en marche si le fluide est inflammable. Et avant d'ouvrir le moindre circuit, on consigne l'électricité. S'il manque un seul point, on ne commence pas. Le professeur vient vérifier.",
        regarde: "La zone autour de la machine, mon matériel, mon outillage.",
        fais: "Je balise la zone. Je dégage une issue. Je vérifie mes flexibles et mon détecteur. Je lance la ventilation si le fluide est inflammable. Je range ce qui traîne.",
        voir: "Zone balisée, issue libre, matériel vérifié.",
        danger: "Issue condamnée, matériel douteux ou détecteur en panne : le chantier n'engage pas.",
        controle: { titre: "Je coche ma zone", type: "coches",
          items: ["la zone est balisée", "une issue est dégagée et utilisable à tout moment", "mes flexibles et mon détecteur sont vérifiés", "la ventilation est en marche, si le fluide est inflammable", "la consignation électrique est prévue avant d'ouvrir un circuit",
            "<span>à revoir : <a href='../../../packs/fluides/res/capsules/?c=p7'>capsule « Préparation de chantier »</a></span>"],
          ok: "Zone prête : un point manquant aurait arrêté le chantier, aucun ne manque.", manque: "Il manque une coche : je ne commence pas avant." },
        arret: "Le professeur a vérifié : la zone, le matériel, l'alimentation et l'accès, avant que je commence." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", tension: "230" },
      charge: { dangers: ["A1"], alimentation: ["230"] }
    }
  };
})();
