/* =====================================================================
   Gare « LIRE LE BON D'INTERVENTION ET LE DOSSIER TECHNIQUE » (ligne « Avant d'intervenir »).
   Restructure, sans réinventer (voir SOURCES.md) :
   · le bon d'intervention du logiciel inerWeb Fluide (client, adresse, type, technicien, mission, observations) ;
   · les « fiches pratiques frigoristes » (préparation de l'intervention : nature du fluide, plans, client prévenu) ;
   · le geste « vérifier la plaque et le dossier technique » (station Législation « Marquage & papiers ») ;
   · la Croix du frigoriste pour lire le schéma frigorifique.
   Aucune valeur inventée : fluide, charge, tension et réglages se lisent dans les documents de la machine.
   ===================================================================== */
(function () {
  window.GARE = {
    id: "lire-bon-intervention",
    titre: "Lire le bon d'intervention et le dossier technique",
    sousTitre: "Avant d'intervenir · gare 5.1 · le bon, la plaque, le dossier · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Le bon et le dossier", aide: "le bon d'intervention, le dossier technique et la plaque de la machine" } },
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "charge", label: "Charge (plaque)", court: "Charge", unite: "kg", nombre: true },
      { id: "serie", label: "Numéro de série (plaque)", court: "N° de série", exemple: "ex. A123456", texte: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T5 · compétences C2.1 · savoirs S1.2, S2.1",
      mfer: "1re Bac Pro MFER — tâches A1T1 · compétences C1, C2 · savoirs S1.3, S3.3",
      commun: "le bon d'intervention, le dossier technique et le registre de la machine sont les documents de départ de toute intervention"
    },
    grille: [
      ["Je lis le bon en entier et je dis la mission en une phrase", { cap: "T5 · C2.1", mfer: "A1T1 · C1" }],
      ["Je trouve le dossier technique et je compare la plaque au dossier", { cap: "C2.1 · S1.2", mfer: "A1T1 · S1.3" }],
      ["Je lis le schéma et la notice : ce que je cherche, je le trouve", { cap: "S2.1", mfer: "C2 · S3.3" }],
      ["Je note ce qu'il me manque et je prépare ma liste avant de partir", { cap: "C2.1", mfer: "A1T1 · C1" }]
    ],
    exigence: {
      cap: "bon lu en entier, mission dite en une phrase, plaque et dossier comparés, manques notés ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque pièce que je cherche et je repère seul une différence entre le bon, la plaque et le dossier."
    },
    savoirEtre: "je pose mes questions avant de partir, pas sur place",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const f = c.releve("comparer", 0), q = c.releve("comparer", 1), s = c.releve("comparer", 2);
      return `Plaque : <b>${c.m.fluide || "…"}</b>, charge <b>${c.m.charge ? c.kg(c.nb(c.m.charge)) : "…"}</b>, n° <b>${c.m.serie || "…"}</b> · ` +
        `dossier : <b>${f || "…"}</b>, charge <b>${q ? c.kg(c.nb(q)) : "…"}</b>, n° <b>${s || "…"}</b>`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1200 630",
      noms: { "equipment-bon": "le bon d'intervention", "equipment-plaque": "la plaque et le dossier technique",
        "equipment-schema": "le schéma frigorifique", "equipment-machine": "la machine et sa plaque", "equipment-preparation": "la préparation avant de partir" }
    },

    etapes: [
      { id: "bon", verbe: "Je lis le bon d'intervention", cadre: ["equipment-bon"], cible: "equipment-bon",
        narration: "Cette gare s'appelle « Lire le bon d'intervention et le dossier technique ». Avant de partir vers une machine, on sait ce qu'on vient faire, où, et avec quoi. Tout commence par le bon d'intervention. Vous le lisez en entier, de haut en bas, sans rien sauter : le client et son adresse, le type d'intervention, la mission, la date et l'heure. Ce que vous ne comprenez pas, vous le soulignez : c'est le professeur qui répond, pas le hasard sur place. Ensuite, on dit la mission en une phrase.",
        regarde: "Le bon, de haut en bas : client, adresse, type, mission.",
        fais: "Je lis tout le bon, sans sauter de ligne. Je souligne ce que je ne comprends pas. Je repère la case du type : dépannage, entretien ou mise en service.",
        voir: "Client, adresse, type et mission lus. Mes mots inconnus sont soulignés.",
        controle: { titre: "Je coche ce que j'ai lu", type: "coches",
          items: ["le client et l'adresse du chantier", "le type d'intervention coché sur le bon", "le descriptif de la mission, lu en entier", "la date et l'heure d'arrivée prévues", "le nom du technicien qui intervient"],
          ok: "Bon lu en entier : je peux dire la mission.", manque: "Il manque une coche : je relis le bon avant de continuer." } },

      { id: "mission", verbe: "Je dis la mission en une phrase", cadre: ["equipment-bon"], cible: "equipment-bon",
        narration: "Cachez le bon et dites la mission à voix haute, en une seule phrase : je viens faire quoi, chez qui, et pour quel type d'intervention. Si vous n'y arrivez pas, vous n'avez pas encore compris le bon, et il vaut mieux le savoir maintenant. Vérifiez ensuite avec le bon sous les yeux. Le professeur vient écouter votre phrase avant de continuer.",
        regarde: "Le descriptif de la mission, puis plus rien : je cache le bon.",
        fais: "Je cache le bon. Je dis à voix haute : « Je viens faire ... chez ... pour un ... ». Je vérifie avec le bon.",
        voir: "Ma phrase dit quoi, où et quel type d'intervention.",
        controle: { titre: "Ma phrase dit bien quoi, où et quel type ?", type: "ouinon",
          oui: "Mission comprise : je peux chercher le dossier.",
          non: "STOP : je relis le descriptif. Un mot me bloque : je le demande au professeur." },
        arret: "Le professeur a vérifié : j'ai dit la mission en une phrase." },

      { id: "dossier", verbe: "Je trouve le dossier technique", cadre: ["equipment-plaque"], cible: "equipment-plaque",
        narration: "Le bon dit ce qu'on vous demande. Le dossier technique dit comment la machine est faite. Vous le cherchez avant d'ouvrir quoi que ce soit : le schéma frigorifique, le schéma électrique, la notice du fabricant, la dernière fiche d'intervention et le registre de l'équipement. Un document qui manque, on le note et on le demande tout de suite. On ne découvre pas qu'il n'y a pas de schéma les mains dans l'armoire.",
        regarde: "Le dossier de la machine : schémas, notice, fiches, registre.",
        fais: "Je cherche les cinq pièces du dossier et je coche celles que je trouve. Pour celles qui manquent, j'écris « manque » sur le bon et je le dis au professeur.",
        voir: "Cinq pièces trouvées, ou la liste de ce qui manque.",
        controle: { titre: "Je coche les pièces trouvées", type: "coches",
          items: ["le schéma frigorifique", "le schéma électrique", "la notice du fabricant", "la dernière fiche d'intervention", "le registre de l'équipement"],
          ok: "Dossier complet : je peux lire la plaque et comparer.", manque: "Il manque une pièce : je la note sur le bon et je la demande avant de partir." } },

      /* Franck, 08/10 : avant toute intervention, état des lieux — ici, la plaque de la machine telle qu'on la trouve. */
      { id: "plaque", verbe: "Je lis la plaque de la machine", cadre: ["equipment-machine"], cible: "equipment-machine",
        narration: "Maintenant, la machine elle-même. Sur son flanc, la plaque dit ce qu'elle est : le fluide qu'elle contient, la quantité de fluide, le numéro de série. La plaque est sur la machine : c'est elle qu'on lit en premier. Vous recopiez les trois informations dans la case Ma machine, telles qu'elles sont écrites, avec leur unité. Une plaque abîmée ou illisible se note, on ne la devine pas.",
        regarde: "La plaque de la machine : fluide, charge, numéro de série.",
        fais: "Je lis la plaque à voix haute. Je recopie dans « Ma machine » : le fluide, la charge avec son unité, le numéro de série. Plaque illisible : je le note, je ne devine pas.",
        voir: "Trois informations recopiées telles qu'elles sont écrites.",
        controle: { titre: "Je coche ce que j'ai recopié", type: "coches",
          items: ["le fluide, tel qu'il est écrit", "la charge, avec son unité", "le numéro de série, chiffre par chiffre"],
          ok: "Plaque lue : je peux la comparer au dossier.", manque: "Il manque une coche : je relis la plaque avant de comparer." } },

      { id: "comparer", verbe: "Je compare le dossier et la plaque", cadre: ["equipment-plaque"], cible: "equipment-plaque",
        narration: "Voici le geste qui évite les mauvaises surprises : on compare. Le dossier dit un fluide, une charge, un numéro de série. La plaque en dit autant. Les deux doivent être les mêmes. Si le fluide n'est pas le même, ou si le numéro n'est pas le même, on s'arrête : ce n'est peut-être pas la bonne machine, ou le fluide a été changé un jour sans que le dossier suive. Une charge un peu différente se note : on cherchera pourquoi avec le professeur.",
        regarde: "Le dossier d'un côté, la plaque de l'autre : mêmes chiffres ?",
        fais: "Je lis dans le dossier le fluide, la charge et le numéro de série. Je les écris ci-dessous. Je compare avec ma plaque.",
        voir: "Même fluide, même numéro : c'est bien cette machine.",
        danger: "Fluide ou numéro différent : je ne commence rien, j'appelle le professeur.",
        controle: { titre: "Ce que dit le dossier", champs: [{ label: "Fluide du dossier", texte: true }, { label: "Charge du dossier", unite: "kg" }, { label: "N° de série du dossier", texte: true }],
          juger(v, c) {
            const q = c.nb(v[1]), qp = c.nb(c.m.charge);
            if (!c.m.fluide || !c.m.serie || isNaN(qp)) return ["ambre", "J'écris d'abord le fluide, la charge et le numéro de série de la plaque dans « Ma machine »."];
            if (isNaN(q)) return ["ambre", "J'écris la charge du dossier en nombre, par exemple 2,4."];
            if (!c.egal(v[0], c.m.fluide)) return ["rouge", "STOP : le dossier dit " + v[0] + ", la plaque dit " + c.m.fluide + ". Autre machine, ou fluide changé : j'appelle le professeur."];
            if (!c.egal(v[2], c.m.serie)) return ["rouge", "STOP : numéro " + v[2] + " dans le dossier, " + c.m.serie + " sur la plaque. Ce n'est peut-être pas la bonne machine ou le bon dossier : j'appelle le professeur."];
            if (!c.proche(q, qp, c.tol.pesee, 0.05)) return ["ambre", "Le dossier dit " + c.kg(q) + ", la plaque " + c.kg(qp) + ". Une charge a-t-elle été changée ? Je le note et j'en parle au professeur."];
            return ["vert", "Même fluide (" + c.m.fluide + "), même numéro, même charge à 5 % près : le dossier est bien celui de cette machine."];
          } } },

      { id: "schema", verbe: "Je lis le schéma frigorifique", cadre: ["equipment-schema"], cible: "equipment-schema",
        narration: "Le schéma frigorifique montre le chemin du fluide. Cherchez les quatre organes : le compresseur, le condenseur, le détendeur et l'évaporateur. Sur les schémas d'inerWeb, la disposition est toujours la même, la croix du frigoriste : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. Sur le schéma du fabricant, les places peuvent changer : on reconnaît chaque organe à son symbole. Suivez le fluide du doigt, du compresseur jusqu'au compresseur.",
        regarde: "Le schéma frigorifique : les quatre organes et le sens du fluide.",
        fais: "Je repère le compresseur, le condenseur, le détendeur et l'évaporateur. Je suis le fluide du doigt. Je cherche les vannes de service et les pressostats.",
        voir: "Les quatre organes trouvés, la ligne suivie jusqu'au bout.",
        controle: { titre: "Je coche ce que j'ai trouvé", type: "coches",
          items: ["le compresseur", "le condenseur", "le détendeur", "l'évaporateur", "les vannes de service et les pressostats"],
          ok: "Schéma lu : je sais où est chaque organe.", manque: "Il manque une coche : je cherche encore, symbole par symbole." } },

      { id: "notice", verbe: "Je cherche dans le schéma électrique et la notice", cadre: ["equipment-schema"], cible: "equipment-schema",
        narration: "Il reste le schéma électrique et la notice. Vous n'avez pas à tout lire : vous cherchez ce qui change votre intervention. La tension d'alimentation, le moyen de couper le courant. Et dans la notice, les consignes de sécurité et les réglages du fabricant. Si le bon parle d'une panne, cherchez où se trouve l'appareil concerné sur le schéma. Les valeurs, vous les lisez dans les documents : vous n'en inventez aucune.",
        regarde: "Le schéma électrique et la notice : ce qui concerne ma mission.",
        fais: "Je cherche la tension d'alimentation, le moyen de couper le courant, les consignes de sécurité et les réglages. Je note la page où je les trouve.",
        voir: "Chaque information trouvée, avec sa page ou son repère.",
        controle: { titre: "Je coche ce que j'ai trouvé", type: "coches",
          items: ["la tension d'alimentation", "où couper le courant", "les consignes de sécurité de la notice", "les réglages donnés par le fabricant", "l'appareil concerné par la mission, repéré sur le schéma"],
          ok: "Les informations utiles sont trouvées et notées.", manque: "Il manque une coche : je cherche encore avant de continuer." } },

      { id: "historique", verbe: "Je lis ce qui a déjà été fait", cadre: ["equipment-plaque"], cible: "equipment-plaque",
        narration: "La dernière fiche d'intervention et le registre racontent l'histoire de la machine. On y lit la date de la dernière visite, ce qui a été fait, et surtout si du fluide a été ajouté ou récupéré. Du fluide ajouté à plusieurs reprises, c'est un signe à ne pas laisser passer : on cherche d'abord pourquoi, avant d'en rajouter. Ce que vous lisez ici peut changer votre façon de commencer.",
        regarde: "La dernière fiche d'intervention et le registre.",
        fais: "Je lis la date de la dernière visite, ce qui a été fait, et le fluide ajouté ou récupéré. Je note ce qui peut changer ma façon de commencer.",
        voir: "La dernière visite, son travail et les mouvements de fluide notés.",
        controle: { titre: "Je coche ce que j'ai lu", type: "coches",
          items: ["la date de la dernière intervention", "ce qui a été fait", "le fluide ajouté ou récupéré (registre)", "les pannes ou remarques déjà notées"],
          ok: "Historique lu : je sais d'où part la machine.", manque: "Il manque une coche : je relis la fiche et le registre." } },

      { id: "manques", verbe: "Je note ce qu'il me manque", cadre: ["equipment-bon"], cible: "equipment-bon",
        narration: "Avant de partir, on fait le point. Est-ce que tout ce qu'il vous faut est là ? Un document, une information, un accès ? Ce qui manque, on le demande maintenant, pas sur place. Vous notez la question et la personne à qui vous la posez : le professeur, le chef d'équipe, le client.",
        regarde: "Le bon et mes notes : ce qui est clair, ce qui est flou.",
        fais: "Je fais la liste de ce qui me manque : un document, une information, un accès. Je note à qui je pose chaque question.",
        voir: "Une liste courte avec, pour chaque manque, la personne à qui demander.",
        controle: { titre: "Tout ce qu'il me faut est là, ou je sais à qui le demander ?", type: "ouinon",
          oui: "Rien ne me bloque : je prépare mon départ.",
          non: "STOP : je ne pars pas avec un manque que je n'ai pas écrit. J'appelle le professeur." } },

      { id: "preparer", verbe: "Je prépare ma liste et je préviens", cadre: ["equipment-preparation"], cible: "equipment-preparation",
        narration: "Dernière étape : transformer ce que vous avez lu en préparation. Quel fluide, donc quelles protections ? Quel type d'intervention, donc quel matériel ? Quel accès, donc quelles clés ou quels papiers ? Vous écrivez la liste du matériel et des protections, les papiers à emporter, et vous prévenez le client de votre arrivée. Le professeur vient vérifier votre liste avant que vous partiez. La gare suivante prépare le site lui-même.",
        regarde: "Le bon, mes notes, la liste à écrire.",
        fais: "J'écris : le matériel, les protections, les papiers à emporter. Je prévois l'appel au client pour annoncer mon heure d'arrivée.",
        voir: "Une liste prête : matériel, protections, papiers, client prévenu.",
        danger: "Fluide inconnu ou charge différente : je demande avant de partir, pas sur place.",
        controle: { titre: "Je coche ce que j'ai préparé", type: "coches",
          items: ["le matériel choisi pour ce type d'intervention", "les protections choisies pour ce fluide", "les papiers à emporter : bon, dossier, fiche d'intervention", "le client prévenu de mon heure d'arrivée",
            "<span>la suite : <a href='../preparer-site/'>gare « Préparer le site »</a> et <a href='../../../packs/fluides/res/capsules/?c=p7'>capsule « Préparation de chantier »</a></span>"],
          ok: "Départ préparé : je sais quoi emporter et qui prévenir.", manque: "Il manque une coche : je ne pars pas avant." },
        arret: "Le professeur a vérifié : ma liste de matériel, de protections et de papiers." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", charge: "2,4", serie: "A123456" },
      charge: { comparer: ["R449A", "2,4", "A123456"] }
    }
  };
})();
