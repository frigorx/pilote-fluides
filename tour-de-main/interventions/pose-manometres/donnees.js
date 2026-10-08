/* =====================================================================
   Gare 2 — POSER LES MANOMÈTRES (ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · packs/fluides/res/pose-manifold-interactive (manifold 4 voies : ordre de pose, voie de vide)
     et pose-manifold-2-voies-interactive (fiche 01 : presse-étoupes, mini-vannes, vide des lignes) ;
   · les fiches de Franck (CAP IFCA, C4) : « Fiche branchement débranchement des manifolds » (montage BP / HP,
     « tirer au vide les manomètres », mise en lecture), « TP1 - Pose manifold », activité n°02 ;
   · le TP 1 de 1re MFER (partie B : pose, purge, lecture) et « Comment on fait » feuilles 3, 4 et 6
     (quelle vanne ouvre quoi, poser le manifold, purger un flexible, lire la réglette) ;
   · les tables pression-température de packs/fluides/res/outils/fluides-data.js (pressions absolues, CoolProp).
   Un seul parcours, écrit pour du vrai fluide (Franck, 08/10 : « la manipulation est strictement la même », azote ou fluide) ;
   seules les phrases « Sous azote : » disent ce que l'azote empêche physiquement. Flexibles mis hors air par le TIRAGE AU VIDE
   (pompe sur la voie VIDE, manifold fermé avant d'arrêter la pompe), jamais par une purge au raccord.
   Aucune valeur universelle de vide, de durée ou de couple : « la cible du poste », la notice.
   ===================================================================== */
(function () {
  /* Pression absolue (bar) de saturation, tous les 10 K : [t °C, p bulle] ou [t, p bulle, p rosée] pour un mélange à glissement. */
  const PT = {
    R22: [[-40,1.052],[-30,1.639],[-20,2.453],[-10,3.548],[0,4.98],[10,6.809],[20,9.1],[30,11.919],[40,15.336],[50,19.427]],
    R32: [[-40,1.774],[-30,2.734],[-20,4.058],[-10,5.826],[0,8.131],[10,11.069],[20,14.746],[30,19.275],[40,24.783],[50,31.412]],
    R134A: [[-40,0.512],[-30,0.844],[-20,1.327],[-10,2.006],[0,2.928],[10,4.146],[20,5.717],[30,7.702],[40,10.166],[50,13.179]],
    R404A: [[-40,1.353,1.31],[-30,2.078,2.022],[-20,3.071,3.002],[-10,4.391,4.308],[0,6.102,6.003],[10,8.271,8.157],[20,10.972,10.844],[30,14.283,14.144],[40,18.294,18.146],[50,23.106,22.957]],
    R407C: [[-40,1.203,0.857],[-30,1.871,1.387],[-20,2.799,2.147],[-10,4.047,3.198],[0,5.679,4.607],[10,7.764,6.449],[20,10.376,8.803],[30,13.591,11.759],[40,17.49,15.413],[50,22.16,19.878]],
    R410A: [[-40,1.755,1.749],[-30,2.703,2.693],[-20,4.007,3.993],[-10,5.746,5.727],[0,8.007,7.981],[10,10.884,10.848],[20,14.476,14.43],[30,18.893,18.835],[40,24.256,24.187],[50,30.706,30.628]],
    R448A: [[-40,1.355,0.997],[-30,2.093,1.59],[-20,3.11,2.431],[-10,4.468,3.58],[0,6.233,5.106],[10,8.477,7.085],[20,11.272,9.598],[30,14.697,12.736],[40,18.831,16.599]],
    R449A: [[-40,1.336,1.005],[-30,2.064,1.6],[-20,3.067,2.44],[-10,4.407,3.587],[0,6.149,5.109],[10,8.363,7.079],[20,11.122,9.577],[30,14.502,12.692],[40,18.583,16.522]],
    R454B: [[-40,1.69,1.596],[-20,3.848,3.655],[0,7.674,7.324],[20,13.846,13.28],[40,23.136,22.326]],
    R454C: [[-40,1.297,0.886],[-20,2.926,2.128],[0,5.781,4.422],[20,10.318,8.251],[40,17.021,14.194]],
    R513A: [[-40,0.615],[-20,1.521],[0,3.234],[20,6.137],[40,10.667]],
    R1234YF: [[-40,0.622],[-30,0.989],[-20,1.509],[-10,2.218],[0,3.159],[10,4.376],[20,5.918],[30,7.836],[40,10.185],[50,13.023]],
    R1234ZE: [[-40,0.367],[-30,0.611],[-20,0.969],[-10,1.474],[0,2.166],[10,3.084],[20,4.273],[30,5.783],[40,7.665],[50,9.972]],
    R290: [[-40,1.111],[-30,1.678],[-20,2.445],[-10,3.453],[0,4.745],[10,6.366],[20,8.365],[30,10.79],[40,13.694],[50,17.133]],
    R600A: [[-40,0.287],[-30,0.466],[-20,0.725],[-10,1.085],[0,1.57],[10,2.206],[20,3.022],[30,4.047],[40,5.312]],
    R717: [[-40,0.716],[-30,1.194],[-20,1.9],[-10,2.906],[0,4.292],[10,6.148],[20,8.57],[30,11.665],[40,15.545],[50,20.33]]
  };
  const ATM = 1.01325;                                    /* le manomètre indique une pression relative */
  const cleFluide = s => String(s || "").toUpperCase().replace(/[\s-]/g, "");
  /* température de saturation (°C) pour une pression absolue, sur la colonne k du tableau ; null hors tableau */
  function inverse(tab, pabs, k) {
    for (let i = 0; i < tab.length - 1; i++) {
      const p0 = tab[i][k], p1 = tab[i + 1][k];
      if (pabs >= p0 && pabs <= p1) return tab[i][0] + (pabs - p0) / (p1 - p0) * (tab[i + 1][0] - tab[i][0]);
    }
    return null;
  }
  /* fourchette [min, max] des températures possibles pour ce fluide à cette pression relative (liquide ET vapeur pour un mélange) */
  function fourchette(fluide, prel) {
    const tab = PT[cleFluide(fluide)]; if (!tab || isNaN(prel)) return null;
    const v = [inverse(tab, prel + ATM, 1)];
    if (tab[0].length > 2) v.push(inverse(tab, prel + ATM, 2));
    if (v.some(x => x === null)) return null;
    return [Math.min(...v), Math.max(...v)];
  }
  const EC_MARCHE = 0.3;     /* bar : en dessous de cet écart + la tolérance, BP et HP sont « presque égales » */

  window.GARE = {
    id: "pose-manometres",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Au poste", aide: "sous azote (conseillé au lycée) ou sous fluide : même geste" } },
    titre: "Poser les manomètres",
    sousTitre: "Les interventions de base · gare 2 · BP et HP lues",
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-449A", texte: true }
    ],
    codes: {
      cap: "CAP IFCA — tâches T6, T8, T13 · compétences C4.7, C4.5, C4.1 · savoirs S5.5, S5.2, S6.2",
      mfer: "1re Bac Pro MFER — tâches A1T2, A1T3, A4T1 · compétences C2, C4, C9 · savoirs S4, S6, S7",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 4.05, 5.01, 12.02, 3.03 et 3.04 (pompe à vide, faire le vide pour évacuer l'air)"
    },
    grille: [
      ["Je prépare et je sécurise (EPI, état des lieux, manifold contrôlé)", { cap: "T6 · T8", mfer: "A1T3 · C4" }],
      ["Je prépare les vannes de service et je raccorde, dans l'ordre, sans fuite", { cap: "C4.7", mfer: "A4T1 · C9" }],
      ["Je tire au vide les flexibles, j'ouvre les vannes de service au bon moment", { cap: "C4.1 · T13", mfer: "A4T1 · C9" }],
      ["Je lis BP et HP, je les convertis en températures de saturation", { cap: "C4.5 · S5.5", mfer: "A1T2 · C2 · S4" }]
    ],
    savoirEtre: "je travaille comme sur du vrai fluide, et aucune vanne de service n'est manœuvrée sans le professeur",
    exigence: {
      cap: "Le geste est juste et dans l'ordre, comme sur du vrai fluide : état des lieux fait, manifold contrôlé, flexibles tirés au vide, pompe arrêtée après la fermeture du manifold, vannes décollées d'un quart de tour, aucune fuite, BP et HP lues et converties avec la bonne colonne, le tout sous le contrôle du professeur.",
      mfer: "Même geste, avec plus de rigueur, comme sur du vrai fluide : je travaille sans aide, je justifie chaque contrôle (pourquoi on tire au vide les flexibles, pourquoi les vannes du manifold restent fermées pour lire) et je repère seul une incohérence entre deux relevés."
    },

    bilan(c) {
      const bp = c.releve("lire", 0), hp = c.releve("lire", 1), tb = c.releve("convertir", 0), th = c.releve("convertir", 1);
      const f = (p, t) => (p ? "<b>" + p + " bar</b>" : "…") + (t ? " → <b>" + t + " °C</b>" : "");
      return `Machine : <b>${c.m.fluide || "…"}</b> · BP ${f(bp, tb)} · HP ${f(hp, th)} (pressions relatives, lues sur les aiguilles)`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 710 620",
      noms: { "equipment-installation": "la machine (le groupe et son circuit)", "vannes-service": "les vannes de service (BP et HP)",
        "equipment-manifold": "le manifold", "equipment-pump": "la pompe à vide" },
      /* l'état du dessin suit l'étape : flexibles posés, vannes du manifold, pompe, vannes de service, aiguilles */
      appliquer(svg, e, c) {
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
        /* vannes du manifold et isolement de la pompe : poignée tournée = ouverte */
        ["bp", "vac", "service", "hp"].forEach(k => { const l = svg.querySelector("#svg-manifold-" + k + " .knob-line"); if (l) l.classList.toggle("ouverte", (e.manifold || []).includes(k)); });
        const pi = svg.querySelector("#svg-pump-iso"); if (pi) pi.classList.toggle("ouverte", !!e.pompeIso);
        /* vannes de service : poignée horizontale = siège arrière, tournée d'un quart de tour = intermédiaire */
        ["svg-service-discharge", "svg-service-hp", "svg-service-bp"].forEach(id => { const l = svg.querySelector("#" + id); if (l) l.style.transform = e.vannes === "mid" ? "rotate(90deg)" : "none"; });
        /* aiguilles : angle depuis la verticale, de -127° à +127° ; BP de -1 à 12 bar, HP de 0 à 30 bar (repères du dessin, sans chiffres) */
        const lu = k => { const v = c.nb(c.releve("lire", k)); return isNaN(v) ? 3 : v; };
        const etat = e.aiguilles || "zero";
        const bp = etat === "vide" ? -1 : etat === "lecture" ? lu(0) : 0, hp = etat === "vide" ? -1 : etat === "lecture" ? lu(1) : 0;
        const angBP = Math.max(-127, Math.min(127, -127 + (bp + 1) * 254 / 13)), angHP = Math.max(-127, Math.min(127, -127 + hp * 254 / 30));
        const n1 = svg.querySelector("#needle-bp"), n2 = svg.querySelector("#needle-hp");
        if (n1) n1.style.transform = "rotate(" + (angBP + 20) + "deg)";     /* l'aiguille dessinée pointe à -20° (BP) et +20° (HP) */
        if (n2) n2.style.transform = "rotate(" + (angHP - 20) + "deg)";
      }
    },

    etapes: [
      { id: "securite", verbe: "Je sécurise le poste", cadre: ["equipment-installation"], cible: "equipment-installation",
        aiguilles: "zero",
        regarde: "La machine, sa plaque, mes protections.",
        fais: "Lunettes et gants. Machine arrêtée, consignée. Je lis le fluide de la plaque et je l'écris dans « Ma machine ». Sous azote : le professeur donne le fluide de l'exercice.",
        voir: "EPI sur moi, machine consignée, fluide noté.",
        danger: "Le fluide liquide brûle par le froid : lunettes et gants avant de toucher un flexible.",
        arret: "Le professeur a vérifié : EPI portés, machine consignée, fluide noté." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["vannes-service"], cible: "vannes-service",
        aiguilles: "zero", vannes: "arriere",
        regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
        fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
        voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "materiel", verbe: "Je contrôle le manifold", cadre: ["equipment-manifold"], cible: "equipment-manifold",
        aiguilles: "zero",
        regarde: "L'étiquette, les joints, les aiguilles, les vannes, le flexible jaune.",
        fais: "Je lis l'étiquette du manifold et je regarde chaque joint. Je ferme les vannes du manifold. Je bouche le flexible jaune. Sur un 2 voies : 2 vannes, et la pompe ira sur le jaune.",
        voir: "Joints propres, aiguilles sur 0, vannes fermées, jaune bouché.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["un joint propre dans chaque flexible", "aiguilles sur 0, rien n'est branché", "vannes du manifold toutes fermées", "flexible jaune bouché au bout"],
          ok: "Manifold contrôlé.", manque: "Il manque une coche : je ne branche pas avant." } },

      { id: "prep-bp", verbe: "Je prépare la vanne BP et je branche le bleu", cadre: ["vannes-service", "equipment-manifold", "zone-flexibles"], cible: "vannes-service",
        tuyaux: ["blue"], aiguilles: "zero", vannes: "arriere",
        regarde: "La vanne de service BP : capuchon, presse-étoupe, carré, prise.",
        fais: "J'ôte le capuchon. Je desserre le presse-étoupe, je mets le carré à la butée arrière, je resserre. J'ôte le bouchon de la prise et je serre le bleu à la main.",
        voir: "Vanne au siège arrière : prise de service fermée, bleu serré à la main.",
        danger: "Je ne touche jamais à la prise du pressostat : elle reste sous pression, vanne fermée ou non.",
        controle: { titre: "Je coche ce que j'ai fait sur la BP", type: "coches",
          items: ["capuchon ôté", "presse-étoupe desserré, puis resserré", "carré à la butée arrière : prise de service fermée", "bouchon de la prise de service ôté", "flexible bleu serré à la main"],
          ok: "Vanne BP prête, bleu branché.", manque: "Il manque une coche : je ne passe pas à la HP avant." } },

      { id: "prep-hp", verbe: "Je prépare la vanne HP et je branche le rouge", cadre: ["vannes-service", "equipment-manifold", "zone-flexibles"], cible: "vannes-service",
        tuyaux: ["blue", "red"], aiguilles: "zero", vannes: "arriere",
        regarde: "La vanne de service HP : capuchon, presse-étoupe, carré, prise.",
        fais: "Même geste que sur la BP, avec le rouge. La HP est le départ liquide ou le refoulement : je suis le repère du poste.",
        voir: "Les deux vannes au siège arrière, bleu et rouge serrés à la main.",
        danger: "Bleu et rouge inversés : la haute pression arrive sur le manomètre BP, qui ne la supporte pas.",
        controle: { titre: "Je coche ce que j'ai fait sur la HP", type: "coches",
          items: ["capuchon ôté", "presse-étoupe desserré, puis resserré", "carré à la butée arrière : prise de service fermée", "bouchon de la prise de service ôté", "flexible rouge serré à la main"],
          ok: "Vanne HP prête, rouge branché.", manque: "Il manque une coche : j'appelle le professeur seulement quand tout est coché." },
        arret: "Le professeur a vérifié le branchement avant que j'ouvre les vannes de service." },

      { id: "branche-pompe", verbe: "Je branche la pompe sur la voie VIDE", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-pump",
        tuyaux: ["blue", "red", "black"], aiguilles: "zero", vannes: "arriere",
        regarde: "Le flexible noir, entre le manifold et la pompe.",
        fais: "Flexible de vide court, de gros diamètre : voie VIDE du manifold → pompe, serré à la main. Sur un 2 voies : la pompe va sur le jaune. Pompe arrêtée, huile propre.",
        voir: "Pompe reliée à la voie VIDE, raccord serré. Vannes de service toujours au siège arrière.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["flexible noir serré à la main, de la voie VIDE à la pompe (2 voies : sur le jaune)", "vannes de service au siège arrière", "vannes du manifold toutes fermées", "pompe arrêtée, huile claire"],
          ok: "Montage prêt : la pompe peut tirer au vide les flexibles.", manque: "Il manque une coche : je ne mets pas la pompe en route avant." },
        arret: "Le professeur a vérifié le montage complet, avant la mise en route de la pompe." },

      { id: "vide", verbe: "Je tire au vide les flexibles", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-pump",
        tuyaux: ["blue", "red", "black"], aiguilles: "vide", vannes: "arriere", manifold: ["bp", "vac", "hp"], pompeIso: true,
        regarde: "Les aiguilles du manifold, et la pompe.",
        fais: "Pompe en route, son isolement ouvert. J'ouvre VIDE, BP et HP du manifold ; SERVICE reste fermée. J'attends la cible du poste, donnée par le professeur.",
        voir: "Les aiguilles descendent au bas de l'échelle, vers −1 bar. La machine n'est pas touchée.",
        danger: "Je ne me penche pas sur le bouchon de refoulement : la pompe peut projeter de l'huile.",
        controle: { titre: "Mes deux aiguilles sous vide", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const bp = c.nb(v[0]), hp = c.nb(v[1]); if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar (négatifs sous la pression de l'air)."];
            if (bp < -1.2 || hp < -1.2) return ["rouge", "Une pression relative ne descend pas sous environ −1 bar : je relis l'aiguille."];
            if (bp > -0.5 || hp > -0.5) return ["ambre", "Les aiguilles sont encore loin du vide : la cible du poste n'est pas atteinte. La pompe tourne ? VIDE, BP et HP sont ouvertes ?"];
            return c.proche(hp, bp, c.tol.mesure, EC_MARCHE) ? ["vert", "BP et HP au bas de l'échelle, " + c.fr(bp, 2) + " et " + c.fr(hp, 2) + " bar : les flexibles sont tirés au vide. Je compare à la cible du poste."]
              : ["ambre", "BP et HP ne sont pas au même niveau : une vanne du manifold est-elle restée fermée ?"];
          } } },

      { id: "isoler", verbe: "Je ferme le manifold, puis j'arrête la pompe", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "black"], aiguilles: "vide", vannes: "arriere", manifold: [], pompeIso: false,
        regarde: "Les vannes du manifold, l'isolement de la pompe, son interrupteur.",
        fais: "Je ferme VIDE, BP et HP du manifold, puis l'isolement de la pompe. La pompe tourne encore : je l'arrête en dernier.",
        voir: "Flexibles isolés sous vide, pompe arrêtée : les aiguilles ne remontent pas.",
        danger: "Je ferme AVANT d'arrêter la pompe : sinon l'air et l'huile reviennent dans les flexibles.",
        controle: { titre: "Les aiguilles sont restées en bas ?", type: "ouinon",
          oui: "Le vide tient : flexibles sans air, raccords étanches. Je peux décoller les vannes de service.",
          non: "Le vide ne tient pas : un raccord fuit. Je resserre à la main et je retire au vide ; sinon j'appelle le professeur." } },

      { id: "decoller", verbe: "Je décolle les vannes de service", cadre: ["vannes-service", "equipment-manifold", "zone-flexibles"], cible: "vannes-service",
        tuyaux: ["blue", "red"], aiguilles: "lecture", vannes: "mid",
        regarde: "Les aiguilles BP et HP du manifold.",
        fais: "Vannes du manifold fermées. Sur chaque vanne de service : un quart de tour. Les flexibles sont hors air : seul le fluide de la machine y entre.",
        voir: "Les aiguilles remontent d'un coup, à la pression de la machine.",
        arret: "Le professeur est à côté de moi : je ne manœuvre jamais une vanne de service seul." },

      { id: "fuite", verbe: "Je cherche les fuites aux raccords", cadre: ["vannes-service", "equipment-manifold", "zone-flexibles"], cible: "vannes-service",
        tuyaux: ["blue", "red"], aiguilles: "lecture", vannes: "mid",
        regarde: "Les raccords des deux flexibles, côté vannes de service.",
        fais: "Je passe le détecteur ou la solution moussante sur chaque raccord, et j'écoute. Sous azote : solution moussante, le détecteur ne sent pas l'azote.",
        voir: "Aucun signal, aucune bulle, aucun sifflement. Les aiguilles restent stables.",
        controle: { titre: "Aucun signal, aucune bulle, aucun sifflement ?", type: "ouinon",
          oui: "Raccords étanches : je peux lire.",
          non: "STOP : une fuite. Je remets la vanne de service au siège arrière et j'appelle le professeur." } },

      { id: "lire", verbe: "Je lis BP et HP", cadre: ["equipment-manifold"], cible: "equipment-manifold",
        tuyaux: ["blue", "red"], aiguilles: "lecture", vannes: "mid",
        regarde: "Les deux manomètres, vannes du manifold fermées.",
        fais: "J'attends que les aiguilles se stabilisent, puis je lis la BP et la HP, en bar.",
        voir: "Machine à l'arrêt : BP et HP presque égales. En marche : la HP plus haute que la BP.",
        danger: "Pour lire, les vannes du manifold restent fermées : les manomètres indiquent la pression quand même.",
        controle: { titre: "Mes deux lectures", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const bp = c.nb(v[0]), hp = c.nb(v[1]); if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
            if (bp < -1.2 || hp < -1.2) return ["rouge", "Une pression relative ne descend pas sous environ −1 bar : je relis l'aiguille."];
            const egales = c.proche(hp, bp, c.tol.mesure, EC_MARCHE);
            if (hp < bp && !egales) return ["rouge", "La HP plus basse que la BP : flexibles inversés ? Je vérifie bleu = BP, rouge = HP."];
            if (Math.abs(bp) < 0.2 && Math.abs(hp) < 0.2) return ["ambre", "Les deux aiguilles sont encore à zéro : une vanne de service est restée au siège arrière ? J'appelle le professeur."];
            return egales ? ["vert", "BP et HP presque égales : normal, la machine est à l'arrêt (ou le support est sous azote)."]
              : ["vert", "HP plus haute que la BP de " + c.fr(hp - bp, 1) + " bar : normal, la machine est en marche."];
          } } },

      { id: "convertir", verbe: "Je convertis en température de saturation", cadre: ["equipment-manifold"], cible: "equipment-manifold",
        tuyaux: ["blue", "red"], aiguilles: "lecture", vannes: "mid",
        regarde: "La réglette (ou la table) du fluide de la plaque.",
        fais: "Je prends la colonne du fluide (mélange : vapeur pour la BP, liquide pour la HP), ma pression telle qu'elle s'affiche, et je lis la température en face. Sous azote : le professeur donne le fluide de l'exercice.",
        voir: "À l'arrêt : deux températures égales. En marche : la HP plus chaude que la BP.",
        controle: { titre: "Températures de saturation", champs: [{ label: "BP", unite: "°C" }, { label: "HP", unite: "°C" }],
          juger(v, c) {
            const tb = c.nb(v[0]), th = c.nb(v[1]); if (isNaN(tb) || isNaN(th)) return ["ambre", "J'écris deux températures, en °C."];
            const pb = c.nb(c.releve("lire", 0)), ph = c.nb(c.releve("lire", 1));
            if (isNaN(pb) || isNaN(ph)) return ["ambre", "Je n'ai pas noté mes lectures BP et HP à l'étape d'avant : je ne peux pas vérifier."];
            const egales = c.proche(ph, pb, c.tol.mesure, EC_MARCHE);
            if (egales ? !c.proche(th, tb, 0, 3) : th < tb)
              return ["rouge", egales ? "BP et HP étaient égales : leurs températures doivent l'être aussi. Je relis la réglette."
                : "La température de la HP ne peut pas être plus froide que celle de la BP. Je relis la réglette."];
            const fb = fourchette(c.m.fluide, pb), fh = fourchette(c.m.fluide, ph);
            if (fb && fh) {
              const okB = tb >= fb[0] - 4 && tb <= fb[1] + 4, okH = th >= fh[0] - 4 && th <= fh[1] + 4;
              if (!okB || !okH) return ["ambre", "Ma température " + (okB ? "HP" : okH ? "BP" : "BP et HP") + " s'écarte de la réglette du " + c.m.fluide +
                " : mauvaise colonne, mauvais fluide, ou pression absolue prise à la place de la relative ?"];
            }
            return ["vert", "BP à " + c.fr(tb, 0) + " °C, HP à " + c.fr(th, 0) + " °C" + (egales ? " : mêmes pressions, mêmes températures." : " : la HP plus chaude que la BP, cohérent.")];
          } } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A" },
      charge: { vide: ["-0,95", "-0,95"], lire: ["10,0", "10,2"], convertir: ["20", "20"] }
    }
  };
})();
