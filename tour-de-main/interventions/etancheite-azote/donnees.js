/* =====================================================================
   Gare 4 — CONTRÔLER L'ÉTANCHÉITÉ SOUS AZOTE (ligne « Les interventions de base »).
   Restructure, sans réinventer (voir SOURCES.md) :
   · la guidance plateau M2 de l'habilitation (phases 2 et 3 : mano-détendeur, mise en pression, recherche de fuite) ;
   · la fiche de Franck « LA RECUPERATION DU FLUIDE FRIGORIGENE » (mise sous azote, utilisation d'une bouteille d'azote) ;
   · la séquence S6-F1 de 1A CAP IFCA (montée par paliers, relevé de début et de fin, verdict motivé) ;
   · la capsule p4 « La bouteille d'azote et son mano-détendeur » et le piège de la température (capsule g3).
   Aucune valeur universelle inventée : la pression d'épreuve, la durée de tenue et la PS viennent de « Ma machine ».
   Un seul parcours : un circuit vide de fluide frigorigène, sous azote sec seul.
   ===================================================================== */
(function () {
  const ATM = 1.01325;        /* le manomètre indique une pression relative : P absolue = P relative + 1,013 bar */
  const BAISSE_LUE = 0.05;   /* bar : arrondi d'une lecture au 0,1 bar ; au-delà, toute baisse est une fuite (Franck, 08/10) */
  const LECTURE = 0.3;        /* bar : erreur de lecture d'une aiguille, en plus de la tolérance de 5 % */

  window.GARE = {
    id: "etancheite-azote",
    titre: "Contrôler l'étanchéité sous azote",
    sousTitre: "Les interventions de base · gare 4 · épreuve de pression",
    parcours: ["azote"],
    parcoursNoms: { azote: { nom: "Circuit sous azote", aide: "installation neuve ou ouverte, vide de fluide" } },
    machine: [
      { id: "epreuve", label: "Pression d'épreuve (donnée par le professeur)", court: "Épreuve", unite: "bar", nombre: true },
      { id: "ps", label: "Pression admissible PS (plaque de la machine)", court: "PS plaque", unite: "bar", nombre: true },
      { id: "echelle", label: "Fin d'échelle du manomètre BP (lue sur le cadran)", court: "Cadran BP", unite: "bar", nombre: true },
      { id: "duree", label: "Durée de tenue (donnée par le professeur)", court: "Tenue", exemple: "ex. 30 min", texte: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T11, T12 · compétences C3.9, C2.4, C4.5 · savoirs S6.2, S6.3, S5.5",
      mfer: "1re Bac Pro MFER — tâches A1T3, A3T1 · compétences C4, C7, C8 · savoirs S5, S7, S4",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 3.02 (épreuve de pression d'étanchéité), 4.05 (manomètres et thermomètre), 4.06 (méthode directe : solution moussante), 5.01 (connecter et déconnecter les lignes)"
    },
    grille: [
      ["Je prépare et je sécurise (EPI, bouteille arrimée, état des lieux, détendeur desserré)", { cap: "T12 · C2.4", mfer: "A1T3 · C4" }],
      ["Je monte en pression par paliers, sans dépasser la pression d'épreuve ni la PS", { cap: "T11 · C3.9", mfer: "A3T1 · C7" }],
      ["Je cherche la fuite, je relève, je compare départ et fin", { cap: "C3.9 · C4.5", mfer: "A3T1 · C8" }],
      ["Je vide, je remets tout comme trouvé, je trace", { cap: "T12 · S6.2", mfer: "A1T3 · S7" }]
    ],
    exigence: {
      cap: "chaque geste juste et dans l'ordre (vis desserrée avant d'ouvrir, montée par paliers), relevés notés, verdict appuyé sur les deux pressions ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque contrôle (pourquoi la vis d'abord, pourquoi la température) et je repère seul une incohérence entre deux relevés."
    },
    savoirEtre: "je dis le verdict que disent mes relevés, même si c'est « fuite »",
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const ep = c.nb(c.m.epreuve), p1 = c.nb(c.releve("initial", 0)), t1 = c.nb(c.releve("initial", 1)),
        p2 = c.nb(c.releve("final", 0)), t2 = c.nb(c.releve("final", 1));
      const f = (p, t) => isNaN(p) ? "…" : "<b>" + c.fr(p, 1) + " bar</b>" + (isNaN(t) ? "" : " à " + c.fr(t, 0) + " °C");
      const verdict = [p1, t1, p2, t2].some(isNaN) ? "…" :
        p2 >= (p1 + ATM) * (t2 + 273.15) / (t1 + 273.15) - ATM - BAISSE_LUE ? "<b>étanche</b>" : "<b>fuite</b>";
      return `Pression d'épreuve <b>${isNaN(ep) ? "…" : c.fr(ep, 1) + " bar"}</b> (donnée par le professeur) · PS de la plaque <b>${c.m.ps ? c.m.ps + " bar" : "…"}</b> · ` +
        `départ ${f(p1, t1)} → fin ${f(p2, t2)} (tenue : ${c.m.duree || "…"}) : ${verdict}`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1040 620",
      noms: { "equipment-installation": "la machine (le groupe et son circuit)", "vannes-service": "les vannes de service (BP et HP)",
        "equipment-manifold": "le manifold", "equipment-bouteille": "la bouteille d'azote", "equipment-detendeur": "le mano-détendeur" },
      /* l'état du dessin suit l'étape : flexibles, vannes du manifold et de service, robinet, vis, aiguilles */
      appliquer(svg, e, c) {
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
        ["bp", "vac", "service", "hp"].forEach(k => { const l = svg.querySelector("#svg-manifold-" + k + " .knob-line"); if (l) l.classList.toggle("ouverte", (e.manifold || []).includes(k)); });
        ["svg-service-discharge", "svg-service-hp", "svg-service-bp"].forEach(id => { const l = svg.querySelector("#" + id); if (l) l.style.transform = e.vannes === "mid" ? "rotate(90deg)" : "none"; });
        const r = svg.querySelector("#svg-roue-robinet"); if (r) r.classList.toggle("ouvert", !!e.robinet);
        const v = svg.querySelector("#svg-vis"); if (v) v.classList.toggle("serree", e.vis === "serree");
        /* aiguilles : angle depuis la verticale, de -127° à +127° (repères du dessin, sans chiffres) ; l'aiguille dessinée pointe à -20° */
        const ep = c.nb(c.m.epreuve), demo = isNaN(ep) ? 10 : ep, M = Math.max(30, 1.25 * demo);
        const lu = (id, k, defaut) => { const x = c.nb(c.releve(id, k)); return isNaN(x) ? defaut : x; };
        const ang = (p, max) => -127 + Math.max(0, Math.min(1, p / max)) * 254;
        const etat = e.aiguilles || "zero";
        let pb = 0, ps = 0, pm = 0;
        if (etat !== "zero" && etat !== "vide") pb = lu("bouteille", 0, 150);
        if (etat === "monte") { ps = lu("monter", 0, demo); pm = lu("monter", 1, demo); }
        if (etat === "isole") { ps = lu("monter", 0, demo); pm = lu("initial", 0, demo); }
        if (etat === "final") { ps = lu("monter", 0, demo); pm = lu("final", 0, demo); }
        const tourne = (id, p, max, plus) => { const n = svg.querySelector("#" + id); if (n) n.style.transform = "rotate(" + (ang(p, max) + plus) + "deg)"; };
        tourne("needle-det-bouteille", pb, 315, 20);
        tourne("needle-det-sortie", ps, M, 20);
        tourne("needle-bp", pm, M, 20);
        tourne("needle-hp", pm, M, -20);
      }
    },

    etapes: [
      { id: "securite", verbe: "Je sécurise le poste", narration: "Cette gare vous apprend à contrôler l'étanchéité d'une installation neuve ou ouverte, vide de fluide. On la met sous azote, puis on cherche si elle tient ou si elle fuit. Tout commence par la sécurité du poste. Mettez vos équipements de protection, et vérifiez que la bouteille est arrimée, debout, par sa chaîne. L'étiquette doit annoncer de l'azote sec, rien d'autre : ni oxygène, ni air comprimé. Ce gaz ne se sent pas, donc la zone doit être aérée. Le circuit, lui, doit être consigné. Avant d'aller plus loin, le professeur vient vérifier vos équipements et la bouteille.", cadre: ["equipment-bouteille", "equipment-detendeur"], cible: "equipment-bouteille",
        aiguilles: "zero", vannes: "arriere",
        regarde: "La bouteille d'azote, son étiquette, la zone de travail.",
        fais: "Lunettes et gants. La bouteille d'azote est debout, retenue par sa chaîne. Je lis l'étiquette : AZOTE. La zone est aérée, le circuit consigné.",
        voir: "EPI sur moi ; bouteille debout et arrimée ; étiquette AZOTE.",
        danger: "Azote sec seul : jamais d'oxygène, jamais d'air comprimé. L'azote ne se sent pas : zone aérée.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["lunettes et gants portés", "bouteille d'azote debout et arrimée", "étiquette de la bouteille : AZOTE", "zone aérée, circuit consigné"],
          ok: "Poste sûr : je peux commencer.", manque: "Il manque une coche : je ne continue pas avant." },
        arret: "Le professeur a vérifié : EPI portés, bouteille d'azote debout et arrimée." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", narration: "Avant de brancher quoi que ce soit, on relève l'état de départ de la machine. La raison : à la fin, tout devra être remis comme on l'a trouvé. On passe donc devant chaque vanne de service. Pour chacune, on contrôle que le capuchon de la tige et le bouchon de la prise sont là, serrés et en bon état. Les vannes sont au siège arrière, dans leur position de service. Si quelque chose manque ou semble abîmé, on le signale au professeur avant de commencer. Ce tour fait, on pourra poser le manifold.", cadre: ["equipment-installation"], cible: "equipment-installation",
        aiguilles: "zero", vannes: "arriere",
        regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
        fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
        voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "manifold", verbe: "Je pose le manifold", narration: "On installe maintenant le manifold, avec ses quatre vannes et ses deux manomètres. Avant de brancher, on s'assure que ces vannes sont toutes fermées. Le flexible bleu se fixe côté basse pression, le rouge côté haute pression, serrés sans outil. Les vannes de service du groupe, elles, ne bougent pas : elles restent à leur siège arrière. Une chose mérite votre attention dès maintenant : le manomètre basse pression a une fin d'échelle, et la pression d'épreuve doit rester en dessous.", cadre: ["vannes-service", "equipment-manifold", "zone-flexibles"], cible: "equipment-manifold",
        tuyaux: ["blue", "red"], aiguilles: "zero", vannes: "arriere",
        regarde: "Le manifold, ses 4 vannes, ses flexibles bleu et rouge.",
        fais: "Vannes du manifold fermées. Bleu sur la vanne de service BP, rouge sur la HP, serrés à la main. Les vannes de service restent au siège arrière.",
        voir: "Aiguilles sur 0 ; bleu côté BP, rouge côté HP ; prises de service fermées.",
        danger: "Le manomètre BP a une échelle limitée : la pression d'épreuve ne doit jamais la dépasser.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["4 vannes du manifold fermées", "aiguilles sur 0", "bleu sur la BP, rouge sur la HP, serrés à la main", "échelle du manomètre BP plus grande que la pression d'épreuve"],
          ok: "Manifold posé.", manque: "Il manque une coche : je ne continue pas avant." } },

      { id: "detendeur", verbe: "Je monte le mano-détendeur", narration: "On monte le mano-détendeur sur la bouteille, dont le robinet reste fermé. Le raccord doit être net : pas d'huile, pas de graisse. Puis on desserre complètement la vis de réglage. C'est le geste qui compte ici : si elle restait serrée au moment d'ouvrir, la bouteille enverrait toute sa pression d'un seul coup dans le circuit. Quand tout est en ordre, plus aucune pression ne peut partir vers le circuit, et les deux cadrans sont à zéro. Le professeur vient vérifier la vis et le robinet avant que la bouteille soit ouverte.", cadre: ["equipment-detendeur", "equipment-bouteille"], cible: "equipment-detendeur",
        tuyaux: ["blue", "red"], aiguilles: "zero", vannes: "arriere", vis: "desserree",
        regarde: "Le raccord de la bouteille, la vis de réglage, les deux cadrans.",
        fais: "Raccord propre, sans huile ni graisse. Je monte le mano-détendeur, robinet de la bouteille fermé. Je desserre la vis de réglage à fond (sens inverse des aiguilles d'une montre).",
        voir: "Vis desserrée, robinet fermé, deux cadrans à 0.",
        danger: "Vis serrée et robinet ouvert : toute la pression de la bouteille part d'un coup dans le circuit.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["raccord propre, sans huile ni graisse", "robinet de la bouteille fermé", "vis de réglage desserrée à fond", "deux cadrans du mano-détendeur à 0"],
          ok: "Détendeur prêt : aucune pression ne peut partir en sortie.", manque: "Il manque une coche : la bouteille reste fermée." },
        arret: "Le professeur a vérifié : vis desserrée, robinet fermé, avant l'ouverture de la bouteille." },

      { id: "bouteille", verbe: "J'ouvre la bouteille et je lis le cadran", narration: "C'est ici que la bouteille est ouverte pour la première fois, et on le fait avec lenteur. On regarde ensuite les deux cadrans du mano-détendeur, et on note les deux valeurs, en bar. Chacune a son utilité. Le cadran de la bouteille dit si elle contient assez de gaz pour atteindre la pression d'épreuve. Celui de la sortie permet de contrôler que la vis était bien desserrée. Si ce dernier bouge, on referme aussitôt la bouteille, et on prévient le professeur. Si tout reste calme, on peut brancher le flexible.", cadre: ["equipment-detendeur", "equipment-bouteille"], cible: "equipment-bouteille",
        tuyaux: ["blue", "red"], aiguilles: "bouteille", vannes: "arriere", vis: "desserree", robinet: true,
        regarde: "Les deux cadrans du mano-détendeur.",
        fais: "J'ouvre lentement le robinet de la bouteille. Je lis le cadran BOUTEILLE. Le cadran SORTIE reste à 0.",
        voir: "Cadran bouteille haut ; cadran sortie à 0 : rien ne part vers le circuit.",
        danger: "J'ouvre lentement, jamais d'un coup. Si le cadran SORTIE bouge, je referme : la vis n'était pas desserrée.",
        controle: { titre: "Mes deux cadrans", champs: [{ label: "Bouteille", unite: "bar" }, { label: "Sortie", unite: "bar" }],
          juger(v, c) {
            const hb = c.nb(v[0]), so = c.nb(v[1]); if (isNaN(hb) || isNaN(so)) return ["ambre", "J'écris deux nombres, en bar."];
            if (so > LECTURE + 0.2) return ["rouge", "STOP : le cadran SORTIE indique " + c.fr(so, 1) + " bar, il devrait être à 0. La vis n'était pas desserrée : je ferme la bouteille et j'appelle le professeur."];
            if (hb <= LECTURE) return ["ambre", "Le cadran BOUTEILLE reste à 0 : le robinet est-il vraiment ouvert ? La bouteille est-elle vide ?"];
            const ep = c.nb(c.m.epreuve);
            if (!isNaN(ep) && hb <= ep) return ["ambre", "La bouteille (" + c.fr(hb, 0) + " bar) n'est pas plus haute que la pression d'épreuve (" + c.fr(ep, 1) + " bar) : elle ne pourra pas monter jusque-là. J'en parle au professeur."];
            return ["vert", "Bouteille à " + c.fr(hb, 0) + " bar, sortie à 0 : la vis était bien desserrée. La bouteille a de quoi monter jusqu'à la pression d'épreuve."];
          } } },

      { id: "flexible", verbe: "Je branche le flexible et je le purge", narration: "Le flexible jaune relie la voie centrale du manifold au mano-détendeur : c'est lui qui amènera l'azote jusqu'au circuit. Mais il contient de l'air, qu'il faut d'abord chasser. Pour cela, on visse juste un peu la vis de réglage, et l'azote pousse l'air dehors, à distance du visage. Un souffle bref, puis le calme : la purge est faite. On serre alors les raccords et on desserre de nouveau la vis. On garde le raccord en main, car un flexible qui lâche fouette. Ensuite viendront les vannes.", cadre: ["equipment-manifold", "equipment-detendeur", "zone-flexibles"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "bouteille", vannes: "arriere", vis: "desserree", robinet: true,
        regarde: "Le flexible jaune, de la voie centrale du manifold au détendeur.",
        fais: "Jaune sur la voie centrale (SERVICE) du manifold et sur le détendeur. Je visse la vis juste un peu : l'azote chasse l'air, loin des visages. Je serre, puis je desserre la vis.",
        voir: "Un court souffle d'azote, puis plus rien ; cadran sortie revenu à 0.",
        danger: "Un flexible qui lâche fouette : je tiens le raccord et je reste loin des visages.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["jaune sur la voie centrale du manifold", "air chassé par un court souffle d'azote", "raccords serrés, vis de nouveau desserrée"],
          ok: "Flexible branché et purgé.", manque: "Il manque une coche : je ne passe pas aux vannes avant." } },

      { id: "vannes", verbe: "J'ouvre le chemin de l'azote", narration: "Jusqu'ici, le circuit de la machine n'a rien reçu. Cette étape ouvre le chemin de l'azote jusqu'à lui. On décolle d'abord les vannes de service de leur siège arrière, en position intermédiaire, et si besoin on alimente l'électrovanne pour l'ouvrir. Au manifold, on ouvre ensuite trois voies : basse pression, service et haute pression, la voie du vide restant fermée. Les aiguilles ne montent pas encore, car la vis est desserrée. Une vanne de service ne se manœuvre jamais sans le professeur : il vérifie tout avant la montée en pression.", cadre: ["vannes-service", "equipment-manifold", "zone-flexibles"], cible: "vannes-service",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "bouteille", vannes: "mid", manifold: ["bp", "service", "hp"], vis: "desserree", robinet: true,
        regarde: "Les vannes de service du groupe, puis les vannes du manifold.",
        fais: "Je décolle les vannes de service du siège arrière : position intermédiaire. Si besoin, j'alimente l'électrovanne pour l'ouvrir. J'ouvre BP, SERVICE et HP au manifold ; VIDE reste fermée.",
        voir: "Le chemin est ouvert jusqu'au circuit ; la vis est desserrée, les aiguilles restent à 0.",
        danger: "Vis desserrée AVANT d'ouvrir. Le professeur est à côté : je ne manœuvre jamais seul une vanne de service.",
        arret: "Le professeur a vérifié : vannes de service, électrovanne et manifold, avant la montée en pression." },

      { id: "monter", verbe: "Je monte en pression, par paliers", narration: "C'est le cœur de l'épreuve. On ne monte pas d'un seul coup : on visse un peu la vis de réglage, on attend, on lit, puis on recommence, étape par étape. À chaque fois, on tend l'oreille : si l'on entend un sifflement, on arrête. Deux limites ne se franchissent jamais : la pression d'épreuve donnée par le professeur, et la pression admissible inscrite sur la plaque de la machine. Au dernier palier, vous notez trois lectures. Elles se comparent entre elles et aux deux limites, et peuvent révéler une vanne restée fermée.", cadre: ["equipment-detendeur", "equipment-manifold"], cible: "equipment-detendeur",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "monte", vannes: "mid", manifold: ["bp", "service", "hp"], vis: "serree", robinet: true,
        regarde: "Le cadran SORTIE et les deux manomètres du manifold.",
        fais: "Je visse la vis un peu, j'attends, je lis. Je recommence, palier après palier, jusqu'à la pression d'épreuve du professeur. À chaque palier j'écoute : un sifflement, j'arrête.",
        voir: "Les trois lectures montent ensemble ; BP et HP indiquent la même valeur.",
        danger: "Jamais au-dessus de la pression d'épreuve du professeur, ni de la PS de la plaque.",
        controle: { titre: "Mes trois lectures, au dernier palier", champs: [{ label: "Sortie", unite: "bar" }, { label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const so = c.nb(v[0]), bp = c.nb(v[1]), hp = c.nb(v[2]);
            if (isNaN(so) || isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris trois nombres, en bar."];
            const ep = c.nb(c.m.epreuve), ps = c.nb(c.m.ps), ech = c.nb(c.m.echelle), haut = Math.max(so, bp, hp);
            if (isNaN(ep)) return ["ambre", "J'écris d'abord la pression d'épreuve dans « Ma machine »."];
            if (!isNaN(ps) && ep > ps) return ["rouge", "STOP : la pression d'épreuve (" + c.fr(ep, 1) + " bar) dépasse la PS de la plaque (" + c.fr(ps, 1) + " bar). Je ne monte pas : j'appelle le professeur."];
            if (!isNaN(ps) && haut > ps + LECTURE) return ["rouge", "STOP : " + c.fr(haut, 1) + " bar, au-dessus de la PS de la plaque (" + c.fr(ps, 1) + " bar). Je desserre la vis et j'appelle le professeur."];
            if (haut > ep && !c.proche(haut, ep, c.tol.mesure, LECTURE)) return ["rouge", "STOP : " + c.fr(haut, 1) + " bar, au-dessus de la pression d'épreuve (" + c.fr(ep, 1) + " bar). Je desserre la vis jusqu'à la valeur demandée."];
            if (!isNaN(ech) && bp > ech + LECTURE) return ["rouge", "STOP : la BP lue (" + c.fr(bp, 1) + " bar) dépasse la fin d'échelle du manomètre BP (" + c.fr(ech, 1) + " bar). J'appelle le professeur."];
            if (!c.proche(hp, bp, c.tol.mesure, LECTURE)) return ["ambre", "Sous azote, BP et HP doivent indiquer la même pression (pas de compresseur). Une vanne du manifold ou de service est restée fermée ?"];
            if (!c.proche(so, hp, c.tol.mesure, LECTURE)) return ["ambre", "Le cadran SORTIE (" + c.fr(so, 1) + " bar) et le manifold (" + c.fr(hp, 1) + " bar) devraient indiquer la même pression. Une vanne est restée fermée ?"];
            if (haut < ep && !c.proche(haut, ep, c.tol.mesure, LECTURE)) return ["ambre", "Seulement " + c.fr(haut, 1) + " bar pour " + c.fr(ep, 1) + " bar demandés : je continue par paliers."];
            return ["vert", "Sortie, BP et HP à " + c.fr(hp, 1) + " bar : les trois indiquent la même pression, à la pression d'épreuve (" + c.fr(ep, 1) + " bar), sous la PS."];
          } } },

      { id: "initial", verbe: "Je ferme et je relève la pression de départ", narration: "La montée est terminée : il s'agit maintenant d'isoler le circuit, pour voir s'il garde sa pression. On ferme d'abord le robinet de la bouteille, puis les trois vannes du manifold qui étaient ouvertes. On attend que les aiguilles se stabilisent, puis on relève la pression et la température de l'air. Cette température est notée parce qu'elle servira à la fin, quand on comparera. Surveillez le cadran de sortie pendant ce temps. S'il redescend alors que la bouteille est fermée, le raccord du flexible fuit : il faut régler ce défaut avant de continuer.", cadre: ["equipment-manifold", "equipment-detendeur", "equipment-bouteille"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "isole", vannes: "mid", manifold: [], vis: "serree", robinet: false,
        regarde: "Le cadran SORTIE, puis les deux manomètres du manifold.",
        fais: "Je ferme le robinet de la bouteille, puis les vannes BP, SERVICE et HP du manifold. J'attends que les aiguilles se calment. Je lis la pression et la température de l'air.",
        voir: "Le cadran SORTIE ne bouge plus ; le manifold garde la pression du circuit.",
        danger: "Cadran SORTIE qui redescend, bouteille fermée : fuite au raccord du flexible. Je la règle avant de continuer.",
        controle: { titre: "Pression de départ et température", champs: [{ label: "Pression", unite: "bar" }, { label: "Température de l'air", unite: "°C" }],
          juger(v, c) {
            const p = c.nb(v[0]), t = c.nb(v[1]); if (isNaN(p) || isNaN(t)) return ["ambre", "J'écris la pression en bar et la température en °C."];
            const ep = c.nb(c.m.epreuve); if (isNaN(ep)) return ["ambre", "J'écris d'abord la pression d'épreuve dans « Ma machine »."];
            if (p > ep && !c.proche(p, ep, c.tol.mesure, LECTURE)) return ["rouge", "STOP : " + c.fr(p, 1) + " bar, au-dessus de la pression d'épreuve (" + c.fr(ep, 1) + " bar). Je n'ajoute rien : j'appelle le professeur."];
            if (c.proche(p, ep, c.tol.mesure, LECTURE)) return ["vert", "Pression de départ " + c.fr(p, 1) + " bar pour " + c.fr(ep, 1) + " bar d'épreuve : cohérent. Je garde aussi la température (" + c.fr(t, 0) + " °C) : elle servira à la fin."];
            return ["ambre", "Seulement " + c.fr(p, 1) + " bar pour " + c.fr(ep, 1) + " bar d'épreuve : montée pas finie, ou fuite déjà ? Je regarde le cadran SORTIE."];
          } } },

      { id: "fuite", verbe: "Je cherche la fuite à la solution moussante", narration: "Le circuit est sous pression et isolé : c'est le moment de repérer un endroit qui laisse échapper du gaz. On passe la solution moussante sur tous les points de jonction : raccords, brasures, presse-étoupe. Puis on patiente un peu et on observe. Ce qu'on recherche, c'est une bulle qui grossit, car c'est elle qui trahit une fuite. Si une bulle apparaît, on marque l'endroit sans y toucher tant que le circuit est sous pression, et on appelle le professeur. Sans bulle, on laisse le circuit tenir : c'est l'étape suivante.", cadre: ["equipment-installation"], cible: "equipment-installation",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "isole", vannes: "mid", manifold: [], vis: "serree", robinet: false,
        regarde: "Chaque raccord, chaque brasure, chaque presse-étoupe.",
        fais: "Je passe la solution moussante sur chaque raccord, chaque brasure, chaque presse-étoupe. J'attends. Je cherche une bulle qui grossit.",
        voir: "Aucune bulle. Une bulle qui grossit, c'est une fuite.",
        controle: { titre: "Aucune bulle nulle part ?", type: "ouinon",
          oui: "Aucune bulle : pas de fuite visible. Je laisse tenir.",
          non: "STOP : une bulle, c'est une fuite. Je marque le raccord, je n'y touche pas sous pression, j'appelle le professeur." } },

      { id: "final", verbe: "Je laisse tenir, puis je relève", narration: "Maintenant, c'est le temps qui travaille. On laisse tenir pendant la durée donnée par le professeur, sans intervenir. Au bout de ce temps, on relève de nouveau la pression, ainsi que la température de l'air. Les deux températures comptent, car sans fuite la pression suit la température du gaz : une petite baisse peut venir du froid et non d'une fuite. C'est à partir de ces deux relevés, départ et fin, qu'on rend son verdict : celui que disent les relevés, même s'il est mauvais. Le professeur vient vérifier vos relevés et votre verdict avant la vidange.", cadre: ["equipment-manifold"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "final", vannes: "mid", manifold: [], vis: "serree", robinet: false,
        regarde: "Les deux manomètres du manifold.",
        fais: "Je laisse tenir la durée donnée par le professeur, sans toucher à rien. Puis je relève la pression finale et la température de l'air.",
        voir: "La pression finale est égale à la pression de départ, à l'erreur de mesure près.",
        danger: "Une petite baisse peut venir du froid, pas d'une fuite : je compare avec la température.",
        controle: { titre: "Pression finale et température", champs: [{ label: "Pression", unite: "bar" }, { label: "Température de l'air", unite: "°C" }],
          juger(v, c) {
            const p2 = c.nb(v[0]), t2 = c.nb(v[1]); if (isNaN(p2) || isNaN(t2)) return ["ambre", "J'écris la pression en bar et la température en °C."];
            const p1 = c.nb(c.releve("initial", 0)), t1 = c.nb(c.releve("initial", 1));
            if (isNaN(p1) || isNaN(t1)) return ["ambre", "Je n'ai pas noté la pression et la température de départ : je ne peux pas comparer."];
            /* même gaz, même volume : P absolue / T absolue reste constant. Sans fuite, la pression suit la température. */
            const att = (p1 + ATM) * (t2 + 273.15) / (t1 + 273.15) - ATM, dT = t2 - t1;
            const temp = Math.abs(dT) >= 1 ? " L'air a changé de " + c.fr(dT, 0) + " °C : sans fuite, j'attendais " + c.fr(att, 1) + " bar." : "";
            /* Franck, 08/10 : AUCUNE baisse admise une fois la température corrigée (même manomètre au départ et à la fin) ;
               seul l'arrondi d'une lecture au 0,1 bar près est toléré. */
            if (p2 >= att - BAISSE_LUE && p2 <= att + LECTURE)
              return ["vert", "Départ " + c.fr(p1, 1) + " bar, fin " + c.fr(p2, 1) + " bar : aucune baisse une fois la température prise en compte." + temp + " Pas de fuite sur cette durée."];
            if (p2 < att) return ["rouge", "Fuite : je cherche. Départ " + c.fr(p1, 1) + " bar, fin " + c.fr(p2, 1) + " bar." + temp + " La température n'explique pas toute la baisse."];
            return ["ambre", "La pression a plus monté que la température ne l'explique (j'attendais " + c.fr(att, 1) + " bar) : je relis l'aiguille et les deux températures."];
          } },
        arret: "Le professeur a vérifié mes deux relevés et mon verdict, avant la vidange." },

      { id: "vidange", verbe: "Je vide l'azote à l'air, lentement", narration: "Le contrôle est terminé : il faut ramener le circuit à la pression de l'air, et cela se fait lentement. La bouteille reste fermée. On desserre très peu le raccord du flexible jaune, en le maintenant, à distance de tout visage : l'azote s'échappe alors en un souffle lent. Pendant ce temps, on suit les deux manomètres du manifold qui descendent. Tant qu'il reste de la pression, on attend, sans forcer. Vous notez ensuite les deux valeurs : elles disent si l'on peut débrancher sans risque.", cadre: ["equipment-manifold", "equipment-detendeur"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "vide", vannes: "mid", manifold: ["bp", "service", "hp"], vis: "serree", robinet: false,
        regarde: "Les aiguilles BP et HP du manifold.",
        fais: "Robinet de la bouteille fermé. Je desserre à peine le raccord du flexible jaune, loin des visages : l'azote sort à l'air. J'écoute un souffle lent.",
        voir: "Les aiguilles BP et HP redescendent doucement vers 0.",
        danger: "Jamais d'un coup : je desserre à peine, raccord tenu, jamais face à quelqu'un.",
        controle: { titre: "BP et HP après la vidange", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const bp = c.nb(v[0]), hp = c.nb(v[1]); if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
            if (bp < -0.5 || hp < -0.5) return ["ambre", "À l'air libre, une pression relative ne descend pas sous 0 : je relis les aiguilles."];
            if (Math.abs(bp) <= LECTURE && Math.abs(hp) <= LECTURE) return ["vert", "BP et HP à 0 : le circuit est à la pression de l'air. Je peux débrancher."];
            return ["ambre", "Encore " + c.fr(Math.max(bp, hp), 1) + " bar : j'attends, l'azote sort lentement, je ne force pas."];
          } } },

      { id: "fin-detendeur", verbe: "Je termine avec le mano-détendeur", narration: "Le circuit est vide, mais le mano-détendeur peut garder du gaz en lui. Bouteille fermée, on serre un peu la vis pour le vider, et on regarde les deux cadrans retomber. Puis on la desserre complètement. Le but est d'amener l'appareil au repos : son ressort ne fait plus d'effort et rien n'y est plus sous pression. Si un cadran refuse de redescendre, de l'azote est encore enfermé dedans : on reprend doucement, ou on fait venir le professeur. Il ne reste plus qu'à remettre la machine comme on l'a trouvée.", cadre: ["equipment-detendeur", "equipment-bouteille"], cible: "equipment-detendeur",
        tuyaux: ["blue", "red", "yellow"], aiguilles: "vide", vannes: "mid", manifold: ["bp", "service", "hp"], vis: "desserree", robinet: false,
        regarde: "Les deux cadrans du mano-détendeur, le robinet, la vis.",
        fais: "Robinet de la bouteille fermé. Je visse un peu la vis pour vider le détendeur : les deux cadrans tombent à 0. Puis je desserre la vis à fond.",
        voir: "Deux cadrans à 0, vis desserrée, robinet fermé.",
        controle: { titre: "Les deux cadrans à 0, la vis desserrée, le robinet fermé ?", type: "ouinon",
          oui: "Mano-détendeur au repos : le ressort ne travaille plus et rien n'est sous pression.",
          non: "Pas encore : un cadran qui n'est pas à 0, c'est de l'azote encore enfermé. Je reprends, doucement, ou j'appelle le professeur." } },

      { id: "remise", verbe: "Je remets tout comme je l'ai trouvé", narration: "Dernière étape de cette gare : rendre la machine telle qu'on l'a reçue. C'est à cela que servait l'état des lieux du début. Les vannes de service retournent au siège arrière, les flexibles sont débranchés, puis chaque capuchon de tige et chaque bouchon de prise est remis en place, bien serré. Le manifold et le poste sont rangés. La bouteille d'azote reste debout, arrimée, robinet fermé. Rien ne doit être abîmé, rien ne doit manquer. Tant que ces points ne sont pas tous réunis, on ne quitte pas le poste.", cadre: ["equipment-installation"], cible: "vannes-service",
        aiguilles: "zero", vannes: "arriere",
        regarde: "Les vannes de service, les capuchons, les bouchons, le poste.",
        fais: "Vannes de service au siège arrière. Je débranche les flexibles. Je remets capuchons de tige et bouchons de prise, serrés. Je range le manifold et le poste.",
        voir: "Machine comme au départ : rien d'abîmé, rien qui manque.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige et bouchons de prise remis, serrés", "flexibles débranchés, manifold rangé", "bouteille debout, arrimée, robinet fermé", "rien d'abîmé, rien qui manque"],
          ok: "Tout est remis comme je l'ai trouvé.", manque: "Il manque une coche : je ne quitte pas le poste avant." } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { epreuve: "10", ps: "24", echelle: "30", duree: "30 min" },
      azote: { bouteille: ["180", "0"], monter: ["10", "10", "10"], initial: ["10", "20"], final: ["10", "19"], vidange: ["0", "0"] }
    }
  };
})();
