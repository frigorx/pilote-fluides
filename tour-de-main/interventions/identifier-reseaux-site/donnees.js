/* =====================================================================
   Gare « IDENTIFIER LES RÉSEAUX D'UN SITE » (ligne « Avant d'intervenir »).
   Électricité, eau, gaz, évacuations, fluide frigorigène : repérer sur place, lire les étiquettes, noter où se coupe chaque réseau.
   Demande de Franck (19/10) : « il suffit de faire un cours sur les différents types de réseaux ». La gare est ce cours, au pied des réseaux :
   un réseau par étape, la règle « je regarde, je ne manœuvre rien », et le doute sur les repères (fiche pratique « le risque électrique »).
   Restructure, sans réinventer (voir SOURCES.md) :
   · fiche de Franck « tableau électrique » (compteur, disjoncteur général, tableau de répartition) ;
   · fiche de Franck « Le compteur d'eau » (index en m³, interdit de le démonter) ;
   · fiche de Franck « L'évacuation des eaux usées » (eaux usées, vannes, pluviales ; siphon) ;
   · fiches pratiques frigoristes 2012 (repérages pas toujours à jour ; accident sur un circuit modifié et non réétiqueté).
   Aucune couleur d'identification des tuyauteries : aucune norme trouvée dans le fonds, la gare renvoie à la légende du site.
   ===================================================================== */
(function () {
  window.GARE = {
    id: "identifier-reseaux-site",
    titre: "Identifier les réseaux d'un site : électricité, eau, gaz, évacuations, fluide",
    sousTitre: "Avant d'intervenir · gare 5.3 · un réseau par étape, je regarde, je ne manœuvre rien · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Sur le site", aide: "les tableaux, les compteurs, les vannes et la machine, sans rien manœuvrer" } },
    machine: [
      { id: "fluide", label: "Fluide de la machine (plaque)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "tension", label: "Tension de la machine (plaque)", court: "Machine", unite: "V", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T10, T7 · compétences C3.2 · savoirs S5.5, S5.6, S2.2",
      mfer: "1re Bac Pro MFER — tâches A1T1, A1T3 · compétences C1, C4 · savoirs S3.5.1, S4.3.2",
      commun: "gare de repérage, à relier à la consignation (gare « Remplacer un composant électrique », station Législation « Consigner — VAT ») et aux papiers du chantier (station Législation « Les papiers du chantier »)"
    },
    grille: [
      ["Je pose la règle : je regarde, je note, je ne manœuvre rien", { cap: "C3.2 · T7", mfer: "A1T3 · C4" }],
      ["Je repère l'électricité, l'eau, le gaz et les évacuations du site", { cap: "C3.2 · S5.5 · S5.6", mfer: "C1 · S3.5.1 · S4.3.2" }],
      ["Je repère le réseau du fluide et je compare l'étiquette à la plaque", { cap: "C3.2 · T10", mfer: "A1T1 · C1" }],
      ["Je lis les repères, je vérifie qu'ils disent vrai, je note où couper chaque réseau", { cap: "C3.2 · S2.2", mfer: "A1T3 · C4" }]
    ],
    exigence: {
      cap: "chaque réseau repéré et lu, rien manœuvré, une coupure notée pour chaque réseau présent ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je compare le plan, les étiquettes et la réalité, et je repère seul un repère douteux."
    },
    savoirEtre: "je ne manœuvre rien tant que je ne sais pas ce que c'est",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const t = c.releve("electricite", 0), i = c.releve("eau", 0), r = c.releve("coupures", 0), k = c.releve("coupures", 1);
      return `Tension au tableau <b>${t || "…"} V</b> pour une machine de <b>${c.m.tension || "…"} V</b> · index du compteur d'eau <b>${i || "…"} m³</b> · coupures repérées <b>${k || "…"}</b> pour <b>${r || "…"}</b> réseaux`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1200 630",
      noms: { "equipment-electricite": "l'électricité (compteur, disjoncteur général, tableau)", "equipment-eau": "l'eau (vannes et compteur)", "equipment-gaz": "le gaz (compteur et robinet de coupure)",
        "equipment-evacuations": "les évacuations (siphon, regard, descente)", "equipment-fluide": "le fluide frigorigène (groupe et vannes de service)", "equipment-croquis": "mon croquis du site" }
    },

    etapes: [
      /* Franck, 08/10 : avant toute intervention, état des lieux — ici, un premier tour du site sans rien toucher. */
      { id: "regle", verbe: "Je pose la règle du repérage", cadre: ["equipment-croquis"], cible: "equipment-croquis",
        narration: "Cette gare s'appelle « Identifier les réseaux d'un site ». Un site est alimenté et vidangé par plusieurs réseaux : l'électricité, l'eau, parfois le gaz, les évacuations, et le fluide de votre machine. Avant de travailler, vous devez savoir où arrive chacun, où il se coupe, et ce qu'il y a derrière chaque étiquette. La règle est simple : vous regardez, vous notez, vous ne manœuvrez rien. Une vanne, un robinet, un disjoncteur, on n'y touche pas sans savoir ce que c'est, et sans l'accord du professeur ou du responsable du site.",
        regarde: "Le site, vu de loin ; je note ce que je vois sur mon croquis.",
        fais: "Je fais un premier tour, mains dans les poches. Je note où je vois des compteurs, des tableaux, des vannes, des descentes. Je ne manœuvre rien.",
        voir: "Une première liste de ce que je vois, sans rien avoir touché.",
        controle: { titre: "Je coche la règle", type: "coches",
          items: ["je regarde, je note, je ne manœuvre rien", "aucune vanne, aucun robinet, aucun disjoncteur sans savoir ce que c'est", "j'attends l'accord du professeur ou du responsable du site avant de manœuvrer", "je sais pourquoi je repère : savoir où couper et où brancher"],
          ok: "Règle comprise : je peux repérer sans risque.", manque: "Il manque une coche : je relis la règle avant de repérer." } },

      { id: "plan", verbe: "Je cherche le plan des réseaux", cadre: ["equipment-croquis"], cible: "equipment-croquis",
        narration: "Le plan des réseaux, quand il existe, vous évite de chercher à l'aveugle. Demandez-le au responsable du site. Cherchez dessus où arrivent l'électricité, l'eau et le gaz, et où partent les évacuations. Mais méfiez-vous : un plan n'est pas toujours à jour. Des travaux ont pu changer des circuits sans que personne ne corrige le plan. Ce que le plan annonce, vous le vérifierez sur place.",
        regarde: "Le plan des réseaux du site (carte « plan et croquis »).",
        fais: "Je demande le plan des réseaux au responsable du site. Je repère dessus où arrivent l'électricité, l'eau, le gaz, et où partent les évacuations. Je note sa date.",
        voir: "Chaque réseau situé sur le plan, avec la date du plan.",
        controle: { titre: "Je coche ce que le plan m'apprend", type: "coches",
          items: ["le plan des réseaux, ou à défaut un schéma de principe, trouvé", "où arrive l'électricité", "où arrive l'eau", "où arrive le gaz, s'il y en a", "où partent les évacuations", "la date du plan : est-il à jour ?"],
          ok: "Plan lu : je sais où chercher, et je vérifierai sur place.", manque: "Il manque une coche : je cherche encore avant de passer sur place." } },

      { id: "electricite", verbe: "Je repère l'électricité", cadre: ["equipment-electricite"], cible: "equipment-electricite",
        narration: "L'électricité arrive par le compteur. Après lui vient le disjoncteur général, qui coupe tout. Puis le tableau, qui répartit le courant dans chaque circuit, chacun avec sa propre protection. Vous repérez ces trois éléments, vous lisez l'étiquette de chaque départ, vous cherchez l'arrêt d'urgence. Vous lisez aussi la tension écrite. Un tableau ouvert, des fils nus : on regarde sans toucher. Seul le professeur ouvre, et seulement après consignation. Devant un tableau, vous ne vous approchez que si votre titre d'habilitation le permet : sinon, vous restez à distance.",
        regarde: "Le compteur, le disjoncteur général, le tableau, l'arrêt d'urgence.",
        fais: "Je repère le compteur, le disjoncteur général placé après lui, puis le tableau. Je lis la tension et l'étiquette de chaque départ. Je n'ouvre rien.",
        voir: "Compteur, disjoncteur général, tableau et départs trouvés et lus.",
        danger: "Tableau ouvert, fils nus : je regarde sans toucher. Sans titre d'habilitation, je reste à distance.",
        controle: { titre: "La tension du site", champs: [{ label: "Tension écrite au tableau ou au compteur", unite: "V" }],
          juger(v, c) {
            const u = c.nb(v[0]), un = c.nb(c.m.tension);
            if (isNaN(u)) return ["ambre", "J'écris la tension lue au tableau ou au compteur, en volts, par exemple 400."];
            if (isNaN(un)) return ["ambre", "J'écris d'abord la tension de la plaque de ma machine dans « Ma machine »."];
            if (!c.proche(u, un, 0.1, 2)) return ["rouge", "STOP : " + c.fr(u, 0) + " V au tableau pour une machine de " + c.fr(un, 0) + " V. Ce n'est pas la bonne alimentation : j'appelle le professeur."];
            return ["vert", "Tableau à " + c.fr(u, 0) + " V, machine à " + c.fr(un, 0) + " V : même tension, c'est la bonne alimentation."];
          } } },

      { id: "eau", verbe: "Je repère l'eau", cadre: ["equipment-eau"], cible: "equipment-eau",
        narration: "L'eau arrive par un compteur, avec une vanne avant et une vanne après. Le compteur est sous la responsabilité du site : on ne le démonte pas. Il indique la consommation en mètres cubes : un mètre cube, c'est mille litres. Seuls les chiffres sur fond noir comptent. Les chiffres rouges sont des unités plus petites que le mètre cube. Vous notez l'index, vous repérez les deux vannes, et vous ne les manœuvrez pas sans accord.",
        regarde: "Le compteur d'eau, la vanne avant, la vanne après.",
        fais: "Je soulève le couvercle du compteur. Je note l'index : seulement les chiffres sur fond noir. Je repère la vanne avant et la vanne après. Je ne manœuvre rien.",
        voir: "Un index en nombre entier de m³ ; les deux vannes situées.",
        danger: "Il est interdit de démonter le compteur d'eau.",
        controle: { titre: "L'index du compteur", champs: [{ label: "Index : chiffres sur fond noir", unite: "m³" }],
          juger(v, c) {
            const brut = String(v[0]).trim(), x = parseInt(brut, 10);
            if (isNaN(x) || x < 0) return ["ambre", "J'écris l'index en nombre entier, par exemple 1234."];
            if (/[.,]/.test(brut)) return ["ambre", "Je n'écris que les chiffres sur fond noir, sans virgule : les chiffres rouges sont plus petits que le mètre cube."];
            return ["vert", "Index noté : " + x + " m³, soit " + c.fr(x * 1000, 0) + " litres."];
          } } },

      { id: "gaz", verbe: "Je repère le gaz", cadre: ["equipment-gaz"], cible: "equipment-gaz",
        narration: "Le gaz n'est pas présent sur tous les sites. S'il y en a, il arrive par un compteur, précédé d'un robinet de coupure. Vous les cherchez, vous lisez l'étiquette, et c'est tout. Le gaz, on ne le manœuvre pas : seul le responsable du site ou le professeur touche à ce robinet. Pas de flamme, pas d'étincelle près d'une installation de gaz. Si vous sentez du gaz : vous n'actionnez rien, ni interrupteur ni flamme ; vous sortez ; vous alertez depuis l'extérieur, les pompiers, au dix-huit. Le professeur vient vérifier que vous avez repéré sans rien manœuvrer.",
        regarde: "Le compteur de gaz et le robinet de coupure qui le précède.",
        fais: "Je cherche le compteur de gaz et le robinet avant lui. Je lis l'étiquette. S'il n'y a pas de gaz, je le note. Je ne manœuvre rien.",
        voir: "Compteur et robinet de coupure trouvés, ou « pas de gaz sur ce site ».",
        danger: "Odeur de gaz : rien actionner (ni interrupteur, ni flamme), je sors, j'alerte de l'extérieur (18).",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["j'ai cherché le compteur de gaz", "j'ai trouvé son robinet de coupure, ou j'ai noté « pas de gaz sur ce site »", "j'ai lu l'étiquette", "je n'ai rien manœuvré", "si je sens du gaz : je n'actionne rien, je sors, j'alerte de l'extérieur (18)"],
          ok: "Gaz repéré, rien manœuvré.", manque: "Il manque une coche : je ne continue pas avant." },
        arret: "Le professeur a vérifié : j'ai repéré le gaz sans rien manœuvrer." },

      { id: "evacuations", verbe: "Je repère les évacuations", cadre: ["equipment-evacuations"], cible: "equipment-evacuations",
        narration: "Après l'alimentation, l'évacuation. On distingue trois sortes d'eau. Les eaux usées : éviers, douches, lavabos, lave-linge. Les eaux vannes : les toilettes. Les eaux pluviales : la pluie, qui part par des descentes à part. On ne mélange pas : il est interdit d'envoyer des eaux usées ou vannes dans les ouvrages d'eaux pluviales, et l'inverse. Vous repérez les descentes, un siphon, qui garde toujours de l'eau, et où part chaque évacuation.",
        regarde: "Les descentes, les siphons, les regards, les gouttières.",
        fais: "Je repère les trois sortes d'eau : usées, vannes, pluviales. Je cherche un siphon et une descente. Je regarde où part chaque évacuation.",
        voir: "Chaque évacuation reconnue ; eaux pluviales séparées des autres.",
        controle: { titre: "Je coche ce que j'ai reconnu", type: "coches",
          items: ["les eaux usées : éviers, douches, lavabos, lave-linge", "les eaux vannes : les WC", "les eaux pluviales : gouttières et descentes, à part", "un siphon, qui garde toujours de l'eau", "où part chaque évacuation du site"],
          ok: "Évacuations repérées : je ne mélange pas les eaux.", manque: "Il manque une coche : je cherche encore avant de continuer." } },

      { id: "fluide", verbe: "Je repère le réseau du fluide frigorigène", cadre: ["equipment-fluide"], cible: "equipment-fluide",
        narration: "Dernier réseau : celui de votre machine. Le groupe de condensation, ses trois vannes de service, les lignes de cuivre jusqu'à l'évaporateur. Vous lisez le fluide sur la plaque, et vous le comparez à l'étiquette de la ligne ou du groupe. Les deux doivent dire la même chose. Un repère qui ne correspond pas à la plaque : on s'arrête, on ne devine pas lequel a raison.",
        regarde: "Le groupe, ses vannes de service, la plaque et les étiquettes.",
        fais: "Je repère le groupe de condensation et ses vannes de service A, B, C. Je suis les lignes jusqu'à l'évaporateur. Je lis le fluide sur l'étiquette et je le compare à la plaque.",
        voir: "L'étiquette et la plaque disent le même fluide.",
        danger: "Étiquette et plaque différentes : je ne devine pas lequel est juste, j'appelle le professeur.",
        controle: { titre: "Le fluide sur l'étiquette", champs: [{ label: "Fluide écrit sur l'étiquette de la ligne ou du groupe", texte: true }],
          juger(v, c) {
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            return c.egal(v[0], c.m.fluide) ? ["vert", "L'étiquette et la plaque disent le même fluide (" + c.m.fluide + ")."]
              : ["rouge", "STOP : l'étiquette dit " + v[0] + ", la plaque dit " + c.m.fluide + ". Je ne devine pas lequel est juste : j'appelle le professeur."];
          } } },

      { id: "reperes", verbe: "Je lis les étiquettes et la légende", cadre: ["equipment-croquis"], cible: "equipment-croquis",
        narration: "Maintenant, les étiquettes. Sur un site, chaque tableau, chaque vanne, chaque tuyauterie peut porter un repère. Lisez-les sur place, une par une. Si le site utilise des couleurs, cherchez la légende, sur le plan ou sur un panneau. Une couleur ne se devine pas : on la lit dans la légende, ou on demande. Et un repère absent ou illisible se note : c'est une information, pas un détail.",
        regarde: "Les étiquettes et la légende du site (carte « plan et croquis »).",
        fais: "Je lis chaque étiquette sur place. Si le site utilise des couleurs, je cherche la légende, sur le plan ou sur un panneau. Je ne devine pas une couleur : je demande.",
        voir: "Chaque étiquette lue ; une légende trouvée, ou la question posée.",
        controle: { titre: "Je coche ce que j'ai lu", type: "coches",
          items: ["les étiquettes des tableaux, des vannes et des tuyauteries, lues sur place", "la légende des couleurs du site, trouvée ou demandée", "les repères absents ou illisibles, notés", "je n'ai deviné aucune couleur"],
          ok: "Repères lus : je sais ce que dit chaque étiquette, et ce qui manque.", manque: "Il manque une coche : je relis les étiquettes avant de continuer." } },

      { id: "coupures", verbe: "Je note où couper chaque réseau", cadre: ["equipment-croquis"], cible: "equipment-croquis",
        narration: "Vous savez maintenant ce qui arrive sur le site. Reste à savoir où couper chaque réseau. L'électricité : le disjoncteur général ou l'arrêt d'urgence. L'eau : la vanne avant le compteur. Le gaz : le robinet avant le compteur. Pour chaque réseau présent, vous notez où se trouve sa coupure. Vous la notez, vous ne l'essayez pas. Si un réseau est présent et que vous ne trouvez pas sa coupure, on cherche avec le professeur avant de commencer à travailler.",
        regarde: "Mon croquis : pour chaque réseau, où se coupe-t-il ?",
        fais: "Pour chaque réseau présent, j'écris sur mon croquis où se trouve sa coupure. Je compte les réseaux présents et les coupures trouvées.",
        voir: "Autant de coupures repérées que de réseaux présents.",
        danger: "Je note les coupures, je ne les essaie pas.",
        controle: { titre: "Mes réseaux et mes coupures", champs: [{ label: "Réseaux présents (électricité, eau, gaz…)", unite: "réseaux" }, { label: "Coupures repérées", unite: "coupures" }],
          juger(v, c) {
            const r = c.nb(v[0]), k = c.nb(v[1]);
            if (isNaN(r) || isNaN(k) || r < 1 || r !== Math.floor(r) || k !== Math.floor(k)) return ["ambre", "J'écris deux nombres entiers : les réseaux présents (au moins 1), puis les coupures repérées."];
            if (k < r) return ["rouge", "STOP : " + r + " réseaux présents, " + k + " coupure" + (k > 1 ? "s" : "") + " repérée" + (k > 1 ? "s" : "") + ". Je cherche avec le professeur avant de commencer à travailler."];
            if (k > r) return ["ambre", "J'ai plus de coupures (" + k + ") que de réseaux (" + r + ") : je recompte."];
            return ["vert", r + " réseaux présents, " + k + " coupures repérées : chaque réseau a sa coupure."];
          } } },

      { id: "verifier", verbe: "Je vérifie que les repères disent vrai", cadre: ["equipment-croquis"], cible: "equipment-croquis",
        narration: "Un repère peut être faux. Dans un accident connu, un technicien s'est fié à sa mémoire : des travaux avaient modifié les circuits sans que les étiquettes suivent. Il n'a pas vérifié l'absence de tension, et il a reçu un flash électrique. Le plan, l'étiquette et la réalité doivent raconter la même chose. Si ce n'est pas le cas, on s'arrête. Pour l'électricité, seule la vérification d'absence de tension prouve que le circuit est hors tension : c'est le geste de la consignation.",
        regarde: "Le plan, les étiquettes et la réalité : disent-ils la même chose ?",
        fais: "Je compare le plan, les étiquettes et la réalité, réseau par réseau. Si l'un des trois dit autre chose, je note l'écart et j'appelle le professeur.",
        voir: "Plan, étiquettes et réalité d'accord, ou l'écart noté.",
        danger: "Un repère peut être faux. Pour l'électricité, seul le VAT prouve que c'est hors tension.",
        controle: { titre: "Plan, étiquettes et réalité racontent la même chose, pour chaque réseau ?", type: "ouinon",
          oui: "Repères à jour : je peux faire mon croquis.",
          non: "STOP : un repère est faux ou périmé. Je note l'écart et j'appelle le professeur : je ne me fie pas à un repère douteux." } },

      { id: "croquis", verbe: "Je fais mon croquis et ma liste", cadre: ["equipment-croquis"], cible: "equipment-croquis",
        narration: "Dernière étape : la trace. Vous faites un croquis simple du site : où arrive chaque réseau, où se coupe chacun. Vous recopiez les étiquettes lues, et vous écrivez ce que vous n'avez pas compris, pour le professeur. Ce croquis sert à la prochaine personne qui arrive sur ce site, et à vous le jour de l'intervention. Le professeur vient le vérifier. La gare est terminée.",
        regarde: "Ma feuille, mes notes, mon plan.",
        fais: "Je dessine un croquis simple : où arrive chaque réseau, où se coupe chacun. Je recopie les étiquettes et je note ce que je n'ai pas compris.",
        voir: "Un croquis lisible, avec les coupures et mes questions.",
        controle: { titre: "Je coche ma trace", type: "coches",
          items: ["le croquis du site : où arrive chaque réseau", "où est la coupure de chaque réseau", "les étiquettes lues, recopiées", "ce que je n'ai pas compris, noté pour le professeur",
            "<span>à revoir : <a href='../remplacer-composant-electrique/'>gare « Remplacer un composant électrique »</a> et <a href='../../../legislation/stations/elec-consigner/'>station « Consigner — VAT »</a></span>"],
          ok: "Croquis fait : le site est repéré.", manque: "Il manque une coche : mon croquis n'est pas fini." },
        arret: "Le professeur a vérifié : mon croquis, mes coupures repérées et mes questions." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", tension: "400" },
      charge: { electricite: ["400"], eau: ["1234"], fluide: ["R449A"], coupures: ["3", "3"] }
    }
  };
})();
