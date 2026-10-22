/* =====================================================================
   Gare « AUTOCONTRÔLE AVANT MISE EN SERVICE » (ligne « Avant d'intervenir »).
   Partie FLUIDIQUE : état général, supportage, serrages, isolation, repérage et sens du fluide, essais faits, écarts corrigés.
   La partie électrique est faite dans ÉlectroRézo (la gare y renvoie).
   Restructure, sans réinventer (voir SOURCES.md) :
   · HabFluide : contrôle visuel et manuel (4.03), supports de tuyaux (10.02), conduites de refoulement, de liquide et d'aspiration (7.05, 8.05) ;
   · planches de Franck : « points de fuite », « raccords à braser et raccords flare » (joint, portée et couple selon la notice),
     « ligne liquide horizontale » (sens du fluide), « séquence avant la première charge » ;
   · fiche d'épreuve CAP : « respecter le sens de circulation du fluide indiqué par les éléments de la ligne liquide » ;
   · grille de Franck « faire son autocontrôle avant de présenter le travail ».
   Aucune valeur inventée : l'écart maximal entre supports et le couple de serrage viennent de la notice ou du professeur.
   ===================================================================== */
(function () {
  window.GARE = {
    id: "autocontrole-mise-en-service",
    titre: "Autocontrôle avant mise en service : supportage, serrages, isolation, repérage",
    sousTitre: "Avant d'intervenir · gare 5.5 · partie fluidique · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Mon installation", aide: "l'installation à l'arrêt, hors tension, avant la mise en service" } },
    machine: [
      { id: "fluide", label: "Fluide de l'installation (plaque)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "espacement", label: "Écart maximal entre deux supports (donné par la notice ou le professeur)", court: "Écart maxi", unite: "mm", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T11 · compétences C3.7 · savoirs S5.1, S5.5",
      mfer: "1re Bac Pro MFER — tâches A2T6 · compétences C7 · savoirs S7.1, S5.1",
      commun: "attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) : 4.03 (contrôle visuel et manuel de tout le système), 10.02 (vérifier des supports de tuyaux et de composants), 7.05 (inspecter les conduites de refoulement et de liquide), 8.05 (vérifier que les conduites de liquide et d'aspiration sont dans la bonne position)"
    },
    grille: [
      ["Je regarde l'installation en entier : état général, huile, rouille, chocs", { cap: "C3.7 · T11", mfer: "A2T6 · S7.1" }],
      ["Je contrôle les supports, les serrages et l'isolation", { cap: "C3.7 · S5.5", mfer: "A2T6 · C7" }],
      ["Je contrôle le sens du fluide et les repères, et je vérifie que les essais sont faits", { cap: "C3.7 · S5.1", mfer: "C7 · S5.1" }],
      ["Je note mes écarts, je les corrige et je signe mon autocontrôle", { cap: "C3.7", mfer: "A2T6 · S7.1" }]
    ],
    exigence: {
      cap: "chaque contrôle fait dans l'ordre, chaque écart noté puis corrigé, fiche signée ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque contrôle par ce qu'il évite, et je repère seul un montage à l'envers ou un support trop éloigné."
    },
    savoirEtre: "je cherche mes propres défauts avant qu'un autre ne les trouve",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const e = c.releve("supportage", 0), r = c.releve("serrages", 2), s = c.releve("reperage", 1), t = c.releve("ecarts", 0), k = c.releve("ecarts", 1);
      return `Fluide <b>${c.m.fluide || "…"}</b> · plus grand écart entre supports <b>${e || "…"} mm</b> (maxi donné : ${c.m.espacement || "…"} mm) · raccords contrôlés <b>${r || "…"}</b> · éléments dans le sens du fluide <b>${s || "…"}</b> · écarts trouvés <b>${t || "…"}</b>, corrigés <b>${k || "…"}</b>`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1200 630",
      noms: { "equipment-installation": "l'installation, ligne par ligne", "equipment-groupe": "le groupe et ses vannes de service", "equipment-serrages": "les raccords et leurs serrages",
        "equipment-reperage": "le sens du fluide et les étiquettes", "equipment-fiche": "ma fiche d'autocontrôle" }
    },

    etapes: [
      { id: "preparer", verbe: "Je prépare mon autocontrôle", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "Cette gare s'appelle « Autocontrôle avant mise en service ». Avant de démarrer une installation, vous la contrôlez vous-même. C'est l'autocontrôle : vous cherchez vos propres défauts avant qu'une autre personne les trouve. Il se fait installation consignée : séparée, condamnée, identifiée, absence de tension vérifiée. Une installation arrêtée n'est pas consignée : le professeur consigne, ou vérifie votre consignation, avant que vous touchiez quoi que ce soit. Puis vous préparez votre schéma, votre fiche, une lampe, vos lunettes. La partie électrique du câblage a sa propre gare, dans ÉlectroRézo.",
        regarde: "L'installation, son sectionneur, mon schéma, ma fiche.",
        fais: "Le professeur consigne, ou vérifie : séparer, condamner, identifier, VAT. Arrêtée n'est pas consignée. Alors seulement je prends mon schéma, ma fiche, ma lampe, mes lunettes.",
        voir: "Installation consignée, cadenas posé ; schéma, fiche, lampe et lunettes prêts.",
        danger: "Arrêtée n'est pas consignée : un voyant éteint ne prouve rien. Je ne touche à rien avant la consignation.",
        controle: { titre: "Je coche ma préparation", type: "coches",
          items: ["l'installation est consignée : séparée, condamnée, identifiée, absence de tension vérifiée", "je sais qu'arrêtée n'est pas consignée", "mon schéma, ma fiche d'autocontrôle et une lampe sont prêts", "mes lunettes de protection sont portées", "<span>à revoir : <a href='../remplacer-composant-electrique/'>gare « Remplacer un composant électrique »</a></span>"],
          ok: "Prêt : je peux faire le tour de mon installation.", manque: "Il manque une coche : je ne commence pas avant." },
        arret: "Le professeur a vérifié : l'installation est consignée (séparée, condamnée, identifiée, VAT)." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — ici, le groupe et les lignes tels qu'on les trouve. */
      { id: "etat", verbe: "Je regarde l'état général", cadre: ["equipment-groupe"], cible: "equipment-groupe",
        narration: "Premier tour : l'état général, sans rien toucher. On cherche ce qui n'est pas normal : des traces d'huile, de la corrosion, des traces de choc ou de vibration sur un raccord. Une trace d'huile est souvent le signe qu'un raccord a laissé passer du fluide. On vérifie aussi que tout est là : les capuchons des vannes, les bouchons, rien d'abîmé, rien d'oublié sur le groupe. Ce que vous trouvez, vous l'écrivez sur votre fiche.",
        regarde: "Le groupe, les lignes, les raccords : huile, rouille, chocs.",
        fais: "Je fais le tour avec ma lampe. Je cherche : traces d'huile, corrosion, traces de choc ou de vibration sur un raccord. Je vérifie capuchons et bouchons.",
        voir: "Rien d'anormal, ou chaque trace notée sur ma fiche.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["aucune trace d'huile sur les raccords et les vannes", "aucune corrosion", "aucune trace de choc ou de vibration sur un raccord", "capuchons de vannes et bouchons de prises présents et serrés", "rien d'abîmé, rien d'oublié sur le groupe"],
          ok: "État général bon : je passe aux supports.", manque: "Il manque une coche : j'écris l'écart sur ma fiche, je le corrigerai plus loin." } },

      { id: "supportage", verbe: "Je contrôle le supportage", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Un joint bien brasé mais mal supporté finira par fuir : il fatigue sous les vibrations. Le support reprend le poids du tube, limite les vibrations et laisse le tube se dilater. Vous regardez chaque support. Il tient, sans point dur sur le tube. Le tube n'est pas tendu entre deux points fixes. Près du compresseur, un patin anti-vibratoire. Quand le tube traverse une paroi, il passe dans un fourreau sans s'y appuyer. L'écart maximal entre deux supports, vous ne l'inventez pas : il vient de la notice ou du professeur. Vous mesurez le plus grand écart et vous le comparez.",
        regarde: "Chaque support, du groupe jusqu'à l'évaporateur.",
        fais: "Je regarde chaque support : il tient, sans point dur. Le tube n'est pas tendu. Je mesure le plus grand écart entre deux supports et je le compare à la valeur donnée.",
        voir: "Supports fixés, sans point dur ; écart mesuré inférieur à la valeur donnée.",
        danger: "Un support trop serré ou un point dur sur le tube : le joint peut rompre des mois plus tard.",
        controle: { titre: "L'écart entre deux supports", champs: [{ label: "Plus grand écart mesuré entre deux supports", unite: "mm" }],
          juger(v, c) {
            /* l'unité écrite est lue : « 1,4 m » = 1400 mm ; sans unité, c'est des millimètres (l'unité affichée à côté du champ) */
            const m = String(v[0]).trim().replace(",", ".").match(/^([0-9]*\.?[0-9]+)\s*(mm|cm|m)?$/i), max = c.nb(c.m.espacement);
            const x = m ? parseFloat(m[1]) * ({ mm: 1, cm: 10, m: 1000 }[(m[2] || "mm").toLowerCase()]) : NaN;
            if (isNaN(x) || x <= 0) return ["ambre", "J'écris un nombre en millimètres, par exemple 850, ou avec son unité : 85 cm, 0,85 m."];
            if (isNaN(max)) return ["ambre", "J'écris d'abord l'écart maximal donné par la notice ou le professeur dans « Ma machine »."];
            if (x > max) return ["rouge", "STOP : " + c.fr(x, 0) + " mm entre deux supports, la valeur donnée est " + c.fr(max, 0) + " mm. Je pose un support, puis je mesure de nouveau."];
            return ["vert", c.fr(x, 0) + " mm au plus entre deux supports, pour " + c.fr(max, 0) + " mm donnés : le supportage convient."];
          } } },

      { id: "serrages", verbe: "Je contrôle les serrages", cadre: ["equipment-serrages"], cible: "equipment-serrages",
        narration: "Maintenant les serrages. Tout ce qui se visse doit être bien serré : les raccords à écrou, les presse-étoupes, les fixations du groupe et de l'évaporateur. Mais d'abord, vous lisez le manomètre : on ne serre jamais un raccord sur un circuit sous pression. Hors pression, pas à l'œil : à la clé, avec la valeur de la notice. Un raccord flare se serre avec un joint propre, une bonne portée, et le couple donné par la notice. Vous comptez les raccords à contrôler, et ceux que vous avez contrôlés. Les deux nombres doivent être les mêmes.",
        regarde: "Les raccords à écrou, les presse-étoupes, les fixations.",
        fais: "Je lis le manomètre : je ne serre que circuit hors pression. Puis je contrôle chaque raccord, presse-étoupe et fixation, à la clé, selon la notice. Je les compte.",
        voir: "Autant de raccords contrôlés que de raccords à contrôler.",
        danger: "Jamais de raccord serré ni desserré sur un circuit sous pression : je lis le manomètre avant. Couple selon la notice.",
        controle: { titre: "Mes raccords", champs: [{ label: "Pression lue au manomètre avant de serrer", unite: "bar" }, { label: "Raccords à contrôler", unite: "raccords" }, { label: "Raccords contrôlés", unite: "raccords" }],
          juger(v, c) {
            const p = c.nb(v[0]), a = c.nb(v[1]), k = c.nb(v[2]);
            if (isNaN(p)) return ["rouge", "STOP : j'écris d'abord la pression lue au manomètre, en bar (0 si le circuit est hors pression). Sans lecture, je ne serre rien."];
            if (p > 0.3) return ["rouge", "STOP : " + c.fr(p, 1) + " bar : le circuit est sous pression. Je ne serre rien : je regarde, et j'appelle le professeur."];
            if (isNaN(a) || isNaN(k) || a < 1 || a !== Math.floor(a) || k !== Math.floor(k)) return ["ambre", "J'écris deux nombres entiers : les raccords à contrôler (au moins 1), puis ceux que j'ai contrôlés."];
            if (k < a) return ["rouge", "STOP : " + a + " raccords à contrôler, " + k + " contrôlé" + (k > 1 ? "s" : "") + ". Il en reste " + (a - k) + " : je les contrôle avant de continuer."];
            if (k > a) return ["ambre", "J'ai contrôlé plus de raccords (" + k + ") que je n'en avais compté (" + a + ") : je recompte."];
            return ["vert", a + " raccords à contrôler, " + k + " contrôlés : aucun oublié."];
          } } },

      { id: "isolation", verbe: "Je contrôle l'isolation", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "L'isolant protège contre le froid et contre l'eau de condensation. Vous le regardez sur toute la longueur des lignes : il doit être continu, sans coupure ni déchirure. La ligne d'aspiration est isolée, pour qu'il ne s'y forme pas d'eau. Sur la ligne liquide, quand elle est isolée, l'isolant doit aussi être intact. Vous suivez chaque ligne du doigt, de bout en bout, et vous notez chaque coupure.",
        regarde: "L'isolant des lignes, sur toute leur longueur.",
        fais: "Je suis chaque ligne du doigt, de bout en bout. Je cherche une coupure, une déchirure, un isolant décollé. Aspiration : isolée sur toute sa longueur.",
        voir: "Un isolant continu, sans coupure ni déchirure.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["l'aspiration est isolée sur toute sa longueur", "la ligne liquide : isolant intact, sans coupure, quand elle est isolée", "aucune coupure, aucune déchirure, aucun décollement", "l'isolant est resté en place aux supports et aux traversées"],
          ok: "Isolation continue : rien ne va condenser.", manque: "Il manque une coche : j'écris l'écart sur ma fiche, je le corrigerai plus loin." } },

      { id: "reperage", verbe: "Je contrôle le sens du fluide et les étiquettes", cadre: ["equipment-reperage"], cible: "equipment-reperage",
        narration: "Dernier contrôle visuel : le repérage. Chaque élément qui a un sens de passage porte une flèche : le filtre déshydrateur, le voyant, l'électrovanne. La flèche doit suivre le sens du fluide. Sur la ligne liquide, le fluide va du condenseur vers le détendeur : le filtre vient d'abord, le voyant juste après. Un élément monté à l'envers est une erreur de montage : on la corrige avant de démarrer. Vous comptez les éléments avec une flèche, et ceux qui sont dans le bon sens. Vous lisez aussi les étiquettes des lignes et des vannes.",
        regarde: "Les flèches des éléments de la ligne liquide, et les étiquettes.",
        fais: "Je suis la ligne liquide du condenseur au détendeur. Je regarde la flèche de chaque filtre, voyant, électrovanne : elle suit le sens du fluide. Je lis les étiquettes.",
        voir: "Chaque flèche dans le sens du fluide ; étiquettes présentes.",
        danger: "Un élément monté à l'envers : je le corrige avant de démarrer, je ne le laisse pas.",
        controle: { titre: "Les flèches", champs: [{ label: "Éléments qui portent une flèche", unite: "éléments" }, { label: "Éléments dans le sens du fluide", unite: "éléments" }],
          juger(v, c) {
            const a = c.nb(v[0]), k = c.nb(v[1]);
            if (isNaN(a) || isNaN(k) || a < 1 || a !== Math.floor(a) || k !== Math.floor(k)) return ["ambre", "J'écris deux nombres entiers : les éléments avec une flèche (au moins 1), puis ceux qui sont dans le sens du fluide."];
            if (k < a) return ["rouge", "STOP : " + (a - k) + " élément" + (a - k > 1 ? "s" : "") + " sur " + a + " à l'envers. Je le corrige avant de démarrer."];
            if (k > a) return ["ambre", "J'ai plus d'éléments dans le bon sens (" + k + ") que d'éléments avec une flèche (" + a + ") : je recompte."];
            return ["vert", a + " éléments avec une flèche, " + k + " dans le sens du fluide : le montage est dans le bon sens."];
          } } },

      { id: "essais", verbe: "Je vérifie que les essais sont faits", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "Un contrôle visuel ne remplace pas les essais. Avant la mise en service, trois résultats doivent être écrits : l'épreuve d'étanchéité sous azote, le tirage au vide, et sa tenue. Vous ne les refaites pas ici : vous vérifiez qu'ils sont faits, avec leur résultat noté. Ce sont les gares de l'étanchéité sous azote et du tirage au vide. Le professeur vient vérifier avant de continuer.",
        regarde: "Ma fiche : l'étanchéité sous azote, le vide, sa tenue.",
        fais: "Je cherche sur ma fiche trois résultats : étanchéité sous azote, tirage au vide, tenue du vide. S'il en manque un, je le fais ou je le demande.",
        voir: "Trois résultats écrits, avec leur date.",
        controle: { titre: "Je coche les essais écrits", type: "coches",
          items: ["l'épreuve d'étanchéité sous azote : résultat écrit", "le tirage au vide : résultat écrit", "la tenue du vide : résultat écrit",
            "<span>à revoir : <a href='../etancheite-azote/'>gare « Contrôler l'étanchéité sous azote »</a> et <a href='../tirage-au-vide/'>gare « Tirer au vide »</a></span>"],
          ok: "Essais faits et écrits : l'installation peut être présentée.", manque: "Il manque une coche : je ne présente pas avant." },
        arret: "Le professeur a vérifié : les essais sont faits et écrits." },

      { id: "electrique", verbe: "Je vérifie la partie électrique", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "La partie électrique a sa propre gare : l'autocontrôle du câblage, hors tension, se fait dans ÉlectroRézo. Vous ne la refaites pas ici, mais vous vérifiez qu'elle est faite : repérage des fils, serrage des bornes, protections, terre. On ne demande pas la mise sous tension tant que les deux autocontrôles ne sont pas faits. Et la mise sous tension est faite par le professeur ou une personne habilitée, jamais par vous seul.",
        regarde: "Ma fiche : la partie électrique est-elle faite et signée ?",
        danger: "La mise sous tension est faite par le professeur ou une personne habilitée, jamais par moi seul.",
        fais: "Je vérifie que l'autocontrôle électrique est fait et signé. Sinon, je le fais avant de demander la mise sous tension.",
        voir: "Les deux autocontrôles, fluidique et électrique, sont faits.",
        controle: { titre: "L'autocontrôle électrique est fait et signé ?", type: "ouinon",
          oui: "Les deux autocontrôles sont faits.",
          non: "STOP : je ne demande pas la mise sous tension avant l'autocontrôle électrique. Il est dans <a href='../../../electrorezo/'>ÉlectroRézo</a>." } },

      { id: "ecarts", verbe: "Je note mes écarts et je corrige", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Un autocontrôle sert à trouver des défauts, et à les corriger. Vous écrivez chaque écart sur votre fiche : où, quoi. Puis vous le corrigez, et vous recontrôlez ce que vous avez corrigé. Le jour où vous présentez votre travail, il ne reste aucun écart ouvert. Si vous n'avez rien trouvé, cherchez encore une fois avec la lampe.",
        regarde: "L'installation, ligne par ligne : j'y corrige les écarts de ma fiche.",
        fais: "J'écris chaque écart trouvé : où, quoi. Je le corrige. Je recontrôle ce que j'ai corrigé. Je compte les écarts trouvés et ceux que j'ai corrigés.",
        voir: "Autant d'écarts corrigés que d'écarts trouvés.",
        controle: { titre: "Mes écarts", champs: [{ label: "Écarts trouvés", unite: "écarts" }, { label: "Écarts corrigés", unite: "écarts" }],
          juger(v, c) {
            const t = c.nb(v[0]), k = c.nb(v[1]);
            if (isNaN(t) || isNaN(k) || t < 0 || t !== Math.floor(t) || k !== Math.floor(k)) return ["ambre", "J'écris deux nombres entiers : les écarts trouvés, puis les écarts corrigés."];
            if (k < t) return ["rouge", "STOP : " + t + " écarts trouvés, " + k + " corrigé" + (k > 1 ? "s" : "") + ". Je ne présente pas mon travail avant d'avoir corrigé les " + (t - k) + " autres."];
            if (k > t) return ["ambre", "J'ai corrigé plus d'écarts (" + k + ") que je n'en avais notés (" + t + ") : j'écris les écarts qui manquent sur ma fiche."];
            if (t === 0) return ["ambre", "Aucun écart trouvé : je refais un tour avec la lampe avant de conclure."];
            return ["vert", t + " écarts trouvés, " + k + " corrigés : aucun écart ouvert."];
          } } },

      { id: "fiche", verbe: "Je signe mon autocontrôle et je présente mon travail", cadre: ["equipment-fiche"], cible: "equipment-fiche",
        narration: "Dernière étape : vous signez votre autocontrôle. Signer, c'est dire : j'ai tout regardé, et ce que j'ai écrit est vrai. L'autocontrôle fait partie de la démarche qualité : faire bien, le prouver, corriger. Ensuite seulement, vous présentez votre travail. Le professeur le contrôle à son tour, par un second regard, indépendant du vôtre. Il vient vérifier avant que vous demandiez la mise en service. La gare est terminée.",
        regarde: "Ma fiche remplie, mon installation, le professeur.",
        fais: "Je relis ma fiche. Je la date et je la signe. Je présente mon travail au professeur et je lui montre mes écarts corrigés.",
        voir: "Fiche datée et signée ; aucun écart ouvert.",
        controle: { titre: "Je coche ma fiche", type: "coches",
          items: ["ma fiche est complète : toutes les cases sont remplies", "aucun écart n'est resté ouvert", "ma fiche est datée et signée", "je présente mon travail : le professeur contrôle à son tour"],
          ok: "Autocontrôle signé : je peux demander la mise en service.", manque: "Il manque une coche : je ne présente pas avant." },
        arret: "Le professeur a vérifié : mon autocontrôle signé, avant la mise en service." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", espacement: "1000" },
      charge: { supportage: ["850"], serrages: ["0", "12", "12"], reperage: ["4", "4"], ecarts: ["3", "3"] }
    }
  };
})();
