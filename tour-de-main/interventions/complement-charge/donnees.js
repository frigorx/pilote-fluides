/* =====================================================================
   Gare 7 — FAIRE UN COMPLÉMENT DE CHARGE (ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · les fiches de Franck (CAP IFCA, C4-MettreEnService) : « TP charge et complément de charge » (surchauffe 5-8 K,
     sous-refroidissement 4-7 K, voyant), « DOSSIER RESSOURCES charge » (complément : manifold monté, installation en marche,
     robinet BP, petites quantités ; mélanges toujours chargés en liquide ; signes d'un manque de fluide) et
     « Série 2 Activité 4 » (recherche de fuite, fiche d'intervention, registre, fiche de suivi du fluide) ;
   · la fiche 05 de pose-manifold-2-voies-interactive (COMPARAISON-FICHES-METIER-2-VOIES.md) : le complément côté BP ne devient pas
     une règle universelle — la phase et le critère de fin viennent du poste et de la notice ;
   · la guidance plateau M3 de l'habilitation (phase 1 relevés, phase 3 charge pesée, phase 4 registre et CERFA) ;
   · le TP 4 de 1re MFER « Mesurer : surchauffe et sous-refroidissement » (formules, colonne vapeur pour la BP, colonne liquide pour la HP).
   Un seul parcours : machine en marche. Décision de Franck (08/10) : l'élève va vers l'autonomie ; en formation il fait lui-même
   la pose et la dépose du manifold sur la machine en marche, le professeur présent aux points d'arrêt.
   Aucune valeur universelle inventée : les fourchettes de surchauffe et de sous-refroidissement viennent du professeur (« Ma machine »),
   le vide cible est « la cible du poste ». Le dessin est celui de la gare « Récupérer le fluide » : station masquée,
   bouteille « de fluide neuf » reliée au jaune du manifold, vacuomètre et pompe pour la mise hors air des flexibles.
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

  /* ---- outils de jugement (communs à plusieurs contrôles) ---- */
  const LECT_P = 0.3;   /* ⟦à valider Franck⟧ erreur de lecture d'une aiguille, en bar, ajoutée aux 5 % de mesure */
  const LECT_T = 1;     /* ⟦à valider Franck⟧ erreur de lecture d'une température ou d'un écart, en K, ajoutée aux 5 % de mesure */
  const nombres = t => (String(t || "").match(/-?\d+(?:[.,]\d+)?/g) || []).map(x => parseFloat(x.replace(",", ".")));
  /* « 5 à 8 » (donné par le professeur dans « Ma machine ») → [5, 8] ; null si ce n'est pas lisible */
  const plage = t => { const n = nombres(t); return n.length >= 2 ? [Math.min(n[0], n[1]), Math.max(n[0], n[1])] : null; };
  const ecrit = x => String(x).replace(".", ",");
  /* -1 = sous la fourchette, 0 = dedans, +1 = au-dessus (avec l'erreur de mesure : 5 % + lecture) */
  const etat = (x, p, c) => x > p[1] * (1 + c.tol.mesure) + LECT_T ? 1 : x < p[0] * (1 - c.tol.mesure) - LECT_T ? -1 : 0;
  const mot = e => (e === 1 ? "haut" : e === -1 ? "bas" : "dans la fourchette");
  const melange = f => /^R4\d\d/.test(cleFluide(f));   /* série R-4xx : mélanges, chargés en phase liquide (Franck, dossier ressources charge) */
  /* ce que disent la surchauffe et le sous-refroidissement relevés : 0 manque · 1 normale · 2 excès · 3 pas clair */
  function diagnostic(c) {
    const sh = c.nb(c.releve("ecarts", 2)), sr = c.nb(c.releve("ecarts", 3)), pSH = plage(c.m.sh), pSR = plage(c.m.sr);
    if (isNaN(sh) || isNaN(sr) || !pSH || !pSR) return null;
    const a = etat(sh, pSH, c), b = etat(sr, pSR, c);
    return { sh, sr, a, b, pSH, pSR, motif: a === 1 && b === -1 ? 0 : a === 0 && b === 0 ? 1 : b === 1 && a <= 0 ? 2 : 3 };
  }

  window.GARE = {
    id: "complement-charge",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Machine en marche", aide: "une machine qui manque de fluide, en formation" } },
    titre: "Faire un complément de charge",
    sousTitre: "Les interventions de base · gare 7 · machine en marche, fluide pesé",
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "charge", label: "Charge (plaque)", court: "Charge", unite: "kg", nombre: true },
      { id: "sh", label: "Surchauffe normale du poste (donnée par le professeur)", court: "Surchauffe normale", unite: "K", exemple: "ex. 5 à 8", texte: true },
      { id: "sr", label: "Sous-refroidissement normal du poste (donné par le professeur)", court: "Sous-refroid. normal", unite: "K", exemple: "ex. 4 à 7", texte: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T2, T6, T8, T13 · compétences C4.1, C4.2, C4.3, C4.5, C4.7 · savoirs S5.1, S5.2, S6.2, S0.1",
      mfer: "1re Bac Pro MFER — tâches A1T2, A1T3, A4T2, A5T2 · compétences C2, C4, C8, C10, C12 · savoirs S2, S4, S5, S6, S7",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 4.05 et 4.08 (relevés, détecteur de fuite), 5.01, 5.02, 5.05, 5.06 (raccorder, bouteille, charge, balance), 5.07 (registre)"
    },
    grille: [
      ["Je me protège, je fais l'état des lieux et je pose le manifold (flexibles mis hors air par le vide)", { cap: "T8 · T6 · C4.7 · C4.1", mfer: "A1T3 · C4" }],
      ["Je relève, je calcule surchauffe et sous-refroidissement, je conclus", { cap: "C4.5 · S5.1", mfer: "A1T2 · C2 · S4" }],
      ["Je cherche la fuite avant de compléter, et je vérifie le fluide de la bouteille", { cap: "C4.3 · S5.2", mfer: "A4T2 · C8 · S5" }],
      ["Je complète par petites quantités, balance sous les yeux, jusqu'aux valeurs normales", { cap: "T13 · C4.2", mfer: "A4T2 · C10 · S6" }],
      ["Je dépose sans descendre sous 0 bar, je remets comme trouvé, je trace la masse ajoutée", { cap: "T2 · C4.7 · S0.1 · S6.2", mfer: "A5T2 · C12 · S2 · S7" }]
    ],
    savoirEtre: "je ne complète jamais une machine qui fuit",
    exigence: {
      cap: "chaque geste juste et dans l'ordre : fuite cherchée avant d'ouvrir la bouteille, petites quantités, masse ajoutée pesée et tracée ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie ma conclusion avec la surchauffe et le sous-refroidissement, et je repère seul un relevé incohérent."
    },
    tolerances: { pesee: 0.05, mesure: 0.05 },

    bilan(c) {
      const f = (id, k, d = 0) => { const x = c.nb(c.releve(id, k)); return isNaN(x) ? "…" : c.fr(x, d); };
      const m1 = c.nb(c.releve("bouteille", 1)), m2 = c.nb(c.releve("pesee-fin", 0));
      const d = !isNaN(m1) && !isNaN(m2) ? c.kg(m1 - m2) : "…";
      return `Machine : <b>${c.m.fluide || "…"}</b> · charge (plaque) <b>${c.m.charge ? c.kg(c.nb(c.m.charge)) : "…"}</b> · ` +
        `avant : surchauffe <b>${f("ecarts", 2)} K</b>, sous-refroidissement <b>${f("ecarts", 3)} K</b> · ` +
        `après : surchauffe <b>${f("stabiliser", 2)} K</b>, sous-refroidissement <b>${f("stabiliser", 3)} K</b> · ` +
        `masse ajoutée <b>${d}</b> (${isNaN(m1) ? "…" : c.kg(m1)} − ${isNaN(m2) ? "…" : c.kg(m2)})`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1160 620",
      noms: { "equipment-installation": "la machine (le groupe et ses tubes)", "vannes-service": "les vannes de service (B et C)",
        "equipment-manifold": "le manifold", "equipment-bottle": "la bouteille de fluide neuf sur sa balance",
        "equipment-pump": "la pompe à vide", "equipment-vacuum": "le vacuomètre" },
      /* l'état du dessin suit l'étape : flexibles posés, vannes du manifold et de service, aiguilles, masse sur la balance */
      appliquer(svg, e, c) {
        const $ = id => svg.querySelector("#" + id);
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = $("hose-path-" + t); if (h) h.classList.add("connected"); });
        /* vannes du manifold : poignée tournée = ouverte */
        ["bp", "vac", "service", "hp"].forEach(k => { const l = svg.querySelector("#svg-manifold-" + k + " .knob-line"); if (l) l.classList.toggle("ouverte", (e.manifold || []).includes(k)); });
        /* vannes de service B (HP) et C (BP) : poignée horizontale = siège arrière, tournée d'un quart de tour = intermédiaire */
        const [vb, vc] = e.vannes || ["arriere", "arriere"];
        [["svg-service-hp", vb], ["svg-service-bp", vc]].forEach(([id, p]) => { const l = $(id); if (l) l.style.transform = p === "mid" ? "rotate(90deg)" : "none"; });
        /* aiguilles : les valeurs de l'élève si elles existent, sinon un exemple ; BP de -1 à 12 bar, HP de 0 à 30 bar (repères du dessin, sans chiffres) */
        const val = (id, k, d) => { const x = c.nb(c.releve(id, k)); return isNaN(x) ? d : x; };
        const [pb, ph] = { zero: [0, 0], vide: [-1, -1], avant: [val("ouvrir", 0, 1.2), val("ouvrir", 1, 13)], apres: [val("stabiliser", 0, 1.8), val("stabiliser", 1, 13.5)],
          bas: [val("depose", 0, 0.2), val("depose", 1, 0.2)] }[e.aiguilles || "zero"];
        const aiguille = (id, p, min, max) => {
          const l = $(id); if (!l) return;
          const a = (-120 + 240 * Math.max(0, Math.min((p - min) / (max - min), 1.05))) * Math.PI / 180;
          l.setAttribute("x2", (38 * Math.sin(a)).toFixed(1)); l.setAttribute("y2", (-38 * Math.cos(a)).toFixed(1));
          l.setAttribute("x1", (-12 * Math.sin(a)).toFixed(1)); l.setAttribute("y1", (12 * Math.cos(a)).toFixed(1));
        };
        aiguille("needle-bp", pb, -1, 12); aiguille("needle-hp", ph, 0, 30);
        /* la masse lue sur la balance */
        const b = $("svg-balance"); if (!b) return;
        const lu = { depart: c.releve("bouteille", 1), cours: c.releve("complement", 0) || c.releve("bouteille", 1), fin: c.releve("pesee-fin", 0) }[e.balance || "depart"];
        b.textContent = lu && !isNaN(c.nb(lu)) ? c.kg(c.nb(lu)) : "…";
      }
    },

    etapes: [
      { id: "securite", verbe: "Je sécurise le poste et je lis la plaque", cadre: ["equipment-installation"], cible: "equipment-installation",
        regarde: "La machine en marche, sa plaque, son arrêt d'urgence.",
        fais: "Lunettes et gants. Je repère l'arrêt d'urgence. Je lis la plaque : fluide et charge. J'écris aussi dans « Ma machine » les fourchettes du poste, données par le professeur.",
        voir: "Machine en marche, EPI sur moi, plaque lue et notée.",
        danger: "Machine en marche : refoulement brûlant, ventilateurs qui tournent, fluide qui brûle par le froid.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["lunettes et gants", "je sais où est l'arrêt d'urgence", "mains et outils loin des ventilateurs", "fluide et charge de la plaque notés dans « Ma machine »", "fourchettes du poste (surchauffe, sous-refroidissement) notées"],
          ok: "Poste sécurisé, plaque lue.", manque: "Il manque une coche : je ne touche à rien avant." } },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "vannes-service",
        regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
        fais: "Je regarde chaque vanne de service, sans la manœuvrer : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
        voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "poser", verbe: "Je pose le manifold et je le mets hors air", cadre: ["equipment-installation", "equipment-manifold", "equipment-pump", "equipment-vacuum", "equipment-bottle"], cible: "equipment-pump",
        tuyaux: ["blue", "red", "black", "yellow"], manifold: ["bp", "vac", "service", "hp"], aiguilles: "vide", balance: "depart",
        regarde: "Le manifold, les 4 flexibles, le vacuomètre.",
        fais: "Vannes de service au siège arrière. Bleu sur C, rouge sur B, noir sur la pompe, jaune sur la bouteille fermée. Je tire au vide : VIDE, BP, HP et SERVICE ouvertes, puis je ferme.",
        voir: "Le vacuomètre atteint la cible du poste et ne remonte pas.",
        danger: "Je ferme AVANT d'arrêter la pompe : sinon l'air revient dans les flexibles.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["4 vannes du manifold fermées, un joint propre dans chaque flexible", "bleu sur la vanne C (BP), rouge sur la vanne B (HP), vannes au siège arrière", "noir sur la pompe, jaune sur la bouteille, robinet fermé", "vacuomètre arrivé à la cible du poste", "tout fermé, puis pompe arrêtée : le vide tient"],
          ok: "Manifold posé, flexibles sans air : rien d'autre que du fluide ne passera.",
          manque: "Il manque une coche : si le vide ne tient pas, un raccord fuit. Je resserre et je recommence." } },

      { id: "ouvrir", verbe: "Je décolle les vannes de service et je lis", cadre: ["equipment-installation", "equipment-manifold"], cible: "vannes-service",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "avant",
        regarde: "Les aiguilles BP et HP du manifold.",
        fais: "Vannes du manifold fermées. Sur B et C : un quart de tour. J'attends des aiguilles stables, je lis BP et HP, puis leur température sur la réglette. Mélange : vapeur pour la BP, liquide pour la HP.",
        voir: "HP bien plus haute que BP : la machine tourne. Deux températures de saturation notées.",
        danger: "Vannes de service : seulement avec le professeur à côté de moi.",
        controle: { titre: "Mes lectures et leurs températures", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }, { label: "T sat BP", unite: "°C" }, { label: "T sat HP", unite: "°C" }],
          juger(v, c) {
            const [bp, hp, tb, th] = v.map(c.nb);
            if ([bp, hp, tb, th].some(isNaN)) return ["ambre", "J'écris quatre nombres : BP et HP en bar, puis leurs deux températures en °C."];
            if (bp < -1.2 || hp < -1.2) return ["rouge", "Une pression relative ne descend pas sous environ −1 bar : je relis l'aiguille."];
            if (hp < bp && !c.proche(hp, bp, c.tol.mesure, LECT_P)) return ["rouge", "La HP plus basse que la BP : flexibles inversés ? Je vérifie bleu = BP, rouge = HP."];
            if (c.proche(hp, bp, c.tol.mesure, LECT_P)) return ["ambre", "HP et BP presque égales : la machine tourne-t-elle ? Une vanne de service est-elle restée au siège arrière ? J'en parle au professeur."];
            if (th <= tb) return ["rouge", "La température de la HP doit être plus chaude que celle de la BP. Je relis la réglette."];
            const fb = fourchette(c.m.fluide, bp), fh = fourchette(c.m.fluide, hp);
            if (fb && fh) {
              const okB = tb >= fb[0] - 4 && tb <= fb[1] + 4, okH = th >= fh[0] - 4 && th <= fh[1] + 4;
              if (!okB || !okH) return ["ambre", "Ma température " + (okB ? "HP" : okH ? "BP" : "BP et HP") + " s'écarte de la réglette du " + c.m.fluide +
                " : mauvaise colonne, mauvais fluide, ou pression absolue prise à la place de la relative ?"];
            }
            return ["vert", "BP " + c.fr(bp, 1) + " bar → " + c.fr(tb, 0) + " °C, HP " + c.fr(hp, 1) + " bar → " + c.fr(th, 0) + " °C : la HP est bien plus haute que la BP, la machine tourne."];
          } },
        arret: "Le professeur a vérifié mon montage et mon vide, et il est à côté de moi pour les vannes de service." },

      { id: "ecarts", verbe: "Je mesure les températures et je calcule", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "avant",
        regarde: "Le tube d'aspiration et le tube liquide, la sonde posée.",
        fais: "Sonde sur le tube nu, bien en contact : à l'aspiration, puis sur le tube liquide. Surchauffe = T aspiration − T sat BP. Sous-refroidissement = T sat HP − T liquide.",
        voir: "Deux écarts en kelvins (K), à comparer aux fourchettes du poste.",
        danger: "Le tube de refoulement est brûlant : la sonde va sur l'aspiration et sur le tube liquide.",
        controle: { titre: "Mes températures et mes deux écarts", champs: [{ label: "T aspiration", unite: "°C" }, { label: "T liquide", unite: "°C" }, { label: "Surchauffe", unite: "K" }, { label: "Sous-refroidissement", unite: "K" }],
          juger(v, c) {
            const [ta, tl, sh, sr] = v.map(c.nb);
            if ([ta, tl, sh, sr].some(isNaN)) return ["ambre", "J'écris quatre nombres : les deux températures en °C, puis les deux écarts en K."];
            const tb = c.nb(c.releve("ouvrir", 2)), th = c.nb(c.releve("ouvrir", 3));
            if (isNaN(tb) || isNaN(th)) return ["ambre", "Je n'ai pas noté les températures de saturation à l'étape 4 : je ne peux pas vérifier."];
            const shC = ta - tb, srC = th - tl;
            if (shC < -LECT_T) return ["rouge", "Le tube d'aspiration est plus froid que le fluide qui bout : impossible. Sonde mal posée, mauvaise colonne, ou du liquide revient au compresseur ? J'appelle le professeur."];
            if (srC < -LECT_T) return ["rouge", "Le tube liquide est plus chaud que la température de condensation : impossible. Sonde mal posée ou mauvaise colonne de la réglette ? J'appelle le professeur."];
            if (!c.proche(sh, shC, c.tol.mesure, LECT_T)) return ["ambre", "Ma surchauffe ne correspond pas à mes températures : je refais T aspiration − T sat BP."];
            if (!c.proche(sr, srC, c.tol.mesure, LECT_T)) return ["ambre", "Mon sous-refroidissement ne correspond pas à mes températures : je refais T sat HP − T liquide."];
            const pSH = plage(c.m.sh), pSR = plage(c.m.sr);
            if (!pSH || !pSR) return ["ambre", "Les fourchettes du poste manquent dans « Ma machine » : je les demande au professeur (deux nombres, ex. 5 à 8)."];
            return ["vert", "Surchauffe " + c.fr(sh, 0) + " K (poste : " + ecrit(pSH[0]) + " à " + ecrit(pSH[1]) + ") : " + mot(etat(sh, pSH, c)) + ". Sous-refroidissement " + c.fr(sr, 0) +
              " K (poste : " + ecrit(pSR[0]) + " à " + ecrit(pSR[1]) + ") : " + mot(etat(sr, pSR, c)) + "."];
          } } },

      { id: "conclusion", verbe: "Je conclus, avec mes preuves", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "avant",
        regarde: "Le voyant liquide, la surchauffe, le sous-refroidissement.",
        fais: "Je regarde le voyant liquide. Je compare mes deux écarts aux fourchettes du poste. Je choisis la conclusion que je peux défendre.",
        voir: "Manque de fluide : bulles au voyant, surchauffe haute ET sous-refroidissement bas.",
        controle: { titre: "Ma conclusion", type: "choix",
          options: ["Il manque du fluide : surchauffe haute, sous-refroidissement bas, bulles au voyant", "La charge est normale : les deux écarts sont dans les fourchettes", "Il y a trop de fluide : sous-refroidissement haut", "Ce n'est pas clair : j'appelle le professeur"],
          juger(v, c) {
            const d = diagnostic(c); if (!d) return ["ambre", "Il me manque mes écarts ou les fourchettes du poste : je reviens à l'étape 5 et à « Ma machine »."];
            const preuve = "surchauffe " + c.fr(d.sh, 0) + " K (" + mot(d.a) + "), sous-refroidissement " + c.fr(d.sr, 0) + " K (" + mot(d.b) + ")";
            if (v[0] === d.motif) return ["vert", ["Preuve : " + preuve + ". Il manque du fluide ; au voyant, je dois voir des bulles. Mais je ne complète pas avant d'avoir cherché la fuite.",
              "Preuve : " + preuve + ". Charge normale : on ne complète pas. J'arrête ici et je préviens le professeur.",
              "Preuve : " + preuve + ". Trop de fluide : on ne rajoute rien. J'arrête ici et j'appelle le professeur (on ne rejette jamais de fluide à l'air).",
              "Preuve : " + preuve + ". Les deux écarts ne racontent pas une simple charge : c'est bien de s'arrêter. J'appelle le professeur."][d.motif]];
            if (v[0] === 3) return ["ambre", "Mes écarts sont pourtant lisibles (" + preuve + "). Je relis mes fourchettes et je réessaie, ou j'en parle au professeur."];
            return ["rouge", "STOP : mes relevés (" + preuve + ") ne disent pas cela. Je ne complète pas sur une mauvaise conclusion : il faut surchauffe haute ET sous-refroidissement bas. J'appelle le professeur."];
          } } },

      { id: "fuite", verbe: "Je cherche la fuite au détecteur", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "avant",
        regarde: "Raccords, vannes de service, soudures, détendeur, registre.",
        fais: "Je lis le registre : les anciennes fuites. Détecteur électronique allumé et vérifié. Je passe lentement sur chaque raccord, chaque vanne de service, chaque soudure, le détendeur.",
        voir: "Aucune alarme du détecteur, nulle part.",
        danger: "On ne complète jamais une machine qui fuit : le fluide ajouté repartirait à l'air.",
        controle: { titre: "Aucune fuite, ou fuite trouvée puis réparée et recontrôlée ?", type: "ouinon",
          oui: "Pas de fuite : je peux compléter. Je note sur la fiche le détecteur utilisé.",
          non: "STOP : je ne complète pas. Une fuite trouvée se répare d'abord, puis on la recontrôle. J'appelle le professeur." } },

      { id: "bouteille", verbe: "Je vérifie la bouteille et je la pèse", cadre: ["equipment-bottle"], cible: "equipment-bottle",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "avant", balance: "depart",
        regarde: "L'étiquette de la bouteille de fluide neuf, la balance.",
        fais: "Je lis à voix haute le fluide de l'étiquette. Bouteille debout sur la balance, robinets fermés. J'attends un chiffre stable : c'est la masse de départ.",
        voir: "Le même fluide que la plaque. Un chiffre stable : la masse de départ.",
        danger: "Deux fluides mélangés dans une machine : plus rien ne se recycle. Même fluide que la plaque, sinon je ne branche pas.",
        controle: { titre: "Fluide de la bouteille et masse de départ", champs: [{ label: "Fluide écrit sur la bouteille", texte: true }, { label: "Masse de départ", unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[1]);
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            if (!c.egal(v[0], c.m.fluide)) return ["rouge", "STOP : la bouteille porte " + v[0] + ", la machine " + c.m.fluide + ". Je n'ouvre pas la bouteille, j'appelle le professeur."];
            if (isNaN(x)) return ["ambre", "J'écris la masse de départ, en kg, par exemple 12,40."];
            if (x <= 0) return ["rouge", "Une bouteille ne pèse pas zéro : la balance est-elle allumée, mise à zéro sans rien dessus ?"];
            return ["vert", "Même fluide que la machine (" + c.m.fluide + "), masse de départ " + c.kg(x) + "." + (melange(c.m.fluide)
              ? " Série R-4xx : c'est un mélange, je charge en phase LIQUIDE, robinet LIQUIDE."
              : " Je demande au professeur la phase à utiliser pour ce fluide.")];
          } },
        arret: "Le professeur a vérifié : fuite cherchée, fluide de la bouteille = plaque, masse de départ notée, avant que j'ouvre la bouteille." },

      { id: "complement", verbe: "J'ajoute le fluide par petites quantités", cadre: ["equipment-installation", "equipment-manifold", "equipment-bottle"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], manifold: ["service", "bp"], aiguilles: "avant", balance: "cours",
        regarde: "La balance, l'aiguille BP, le voyant liquide.",
        fais: "Machine en marche. J'ouvre le robinet LIQUIDE de la bouteille (série R-4xx : toujours liquide), SERVICE, puis la vanne BP juste entrouverte. Petit ajout, puis je ferme.",
        voir: "La masse de la bouteille descend un peu, la BP monte un peu.",
        danger: "Vanne BP juste entrouverte : le liquide doit se vaporiser en route. Du liquide au compresseur le casse.",
        controle: { titre: "Masse lue après un petit ajout", champs: [{ unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[0]), m1 = c.nb(c.releve("bouteille", 1)), ch = c.nb(c.m.charge);
            if (isNaN(x)) return ["ambre", "J'écris un nombre, en kg."];
            if (isNaN(m1)) return ["ambre", "Je n'ai pas noté la masse de départ (étape 8) : je ne peux pas savoir combien j'ajoute."];
            if (x > m1 * (1 + c.tol.pesee)) return ["rouge", "STOP : la bouteille est plus lourde qu'au départ. Pesée fausse, ou bouteille mal posée ? Je ferme le robinet et j'appelle le professeur."];
            if (x >= m1) return ["ambre", "La masse n'a pas diminué : le robinet de la bouteille est-il ouvert ? Le chemin jusqu'à la BP est-il ouvert ?"];
            if (ch && m1 - x > ch * (1 + c.tol.pesee)) return ["rouge", "STOP : déjà plus de fluide sorti de la bouteille (" + c.kg(m1 - x) + ") que la charge de la plaque (" + c.kg(ch) + "). Je ferme le robinet et j'appelle le professeur."];
            return ["vert", "Déjà " + c.kg(m1 - x) + " ajoutés. Je ferme et j'attends que ça se stabilise avant d'en remettre."];
          } } },

      { id: "stabiliser", verbe: "J'attends que ça se stabilise et je relève", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "apres",
        regarde: "BP, HP, voyant liquide, une fois les pressions stables.",
        fais: "Je ferme la vanne BP et le robinet de la bouteille. J'attends des pressions stables. Je relève BP, HP, surchauffe, sous-refroidissement. Pas encore normaux : j'ajoute encore un peu (étape 9).",
        voir: "Surchauffe et sous-refroidissement dans les fourchettes du poste, voyant sans bulle.",
        danger: "Sous-refroidissement trop haut : j'ai trop ajouté. Je m'arrête et j'appelle le professeur.",
        controle: { titre: "Mes relevés après l'ajout", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }, { label: "Surchauffe", unite: "K" }, { label: "Sous-refroidissement", unite: "K" }],
          juger(v, c) {
            const [bp, hp, sh, sr] = v.map(c.nb);
            if ([bp, hp, sh, sr].some(isNaN)) return ["ambre", "J'écris quatre nombres : BP et HP en bar, puis les deux écarts en K."];
            if (hp < bp && !c.proche(hp, bp, c.tol.mesure, LECT_P)) return ["rouge", "La HP plus basse que la BP : je relis les deux aiguilles."];
            if (c.proche(hp, bp, c.tol.mesure, LECT_P)) return ["ambre", "HP et BP presque égales : la machine tourne-t-elle toujours ? J'en parle au professeur."];
            const pSH = plage(c.m.sh), pSR = plage(c.m.sr);
            if (!pSH || !pSR) return ["ambre", "Les fourchettes du poste manquent dans « Ma machine » : je les demande au professeur."];
            const a = etat(sh, pSH, c), b = etat(sr, pSR, c);
            if (b === 1) return ["rouge", "STOP : sous-refroidissement au-dessus de la fourchette, j'ai trop ajouté. Je ferme tout et j'appelle le professeur : on ne rejette jamais de fluide à l'air."];
            if (a === -1) return ["rouge", "STOP : surchauffe sous la fourchette, du liquide risque de revenir au compresseur. Je ferme tout et j'appelle le professeur."];
            const bp0 = c.nb(c.releve("ouvrir", 0)), sr0 = c.nb(c.releve("ecarts", 3));
            if (!isNaN(bp0) && bp < bp0 * (1 - c.tol.mesure) - LECT_P) return ["ambre", "La BP a baissé alors que j'ajoute du fluide : la machine est-elle stable ? J'attends et je relève encore."];
            if (!isNaN(sr0) && sr < sr0 * (1 - c.tol.mesure) - LECT_T) return ["ambre", "Mon sous-refroidissement a baissé alors que j'ajoute du fluide : étonnant. J'attends la stabilisation et je relève encore."];
            if (a === 0 && b === 0) return ["vert", "Surchauffe " + c.fr(sh, 0) + " K et sous-refroidissement " + c.fr(sr, 0) + " K sont dans les fourchettes du poste : j'arrête d'ajouter. Au voyant, plus de bulle."];
            return ["ambre", "Pas encore normal : surchauffe " + mot(a) + ", sous-refroidissement " + mot(b) + ". J'attends, puis j'ajoute encore un petit peu (étape 9)."];
          } } },

      { id: "pesee-fin", verbe: "Je ferme la bouteille et je la repèse", cadre: ["equipment-installation", "equipment-manifold", "equipment-bottle"], cible: "equipment-bottle",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["mid", "mid"], aiguilles: "apres", balance: "fin",
        regarde: "La balance, le robinet de la bouteille.",
        fais: "Robinet de la bouteille fermé. J'ouvre un instant SERVICE et BP : le fluide du flexible jaune entre dans la machine. Je ferme. Je lis la masse finale.",
        voir: "Masse ajoutée = masse de départ − masse finale. Jamais au-delà de la plaque.",
        danger: "Au-delà de la charge de la plaque : HP trop haute, compresseur en danger.",
        controle: { titre: "Masse finale et charge déjà connue", champs: [{ label: "Masse finale", unite: "kg" }, { label: "Déjà dans la machine (registre), 0 si inconnue", unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[0]), connu = c.nb(v[1]), m1 = c.nb(c.releve("bouteille", 1)), mc = c.nb(c.releve("complement", 0)), ch = c.nb(c.m.charge), t = c.tol.pesee;
            if (isNaN(x) || isNaN(connu)) return ["ambre", "J'écris la masse finale en kg, et la charge déjà connue (0 si je ne la connais pas)."];
            if (isNaN(m1)) return ["ambre", "Pas de masse de départ : la masse ajoutée n'existe pas. J'appelle le professeur."];
            if (!ch) return ["ambre", "J'écris d'abord la charge de la plaque dans « Ma machine »."];
            const d = m1 - x;
            if (d <= 0) return ["rouge", "La masse finale n'est pas plus petite que la masse de départ : rien n'a été ajouté, ou la pesée est fausse. Je repèse, bouteille seule et stable."];
            if (!isNaN(mc) && x > mc * (1 + t)) return ["ambre", "La bouteille est plus lourde qu'à ma pesée pendant l'ajout (" + c.kg(mc) + ") : je repèse, bouteille seule et stable."];
            if (d > ch * (1 + t)) return ["rouge", "STOP : " + c.kg(d) + " ajoutés, plus que toute la charge de la plaque (" + c.kg(ch) + "). Je ne touche plus à rien et j'appelle le professeur."];
            if (connu > 0) {
              const total = connu + d;
              return total > ch * (1 + t)
                ? ["rouge", "STOP : " + c.kg(connu) + " déjà là + " + c.kg(d) + " ajoutés = " + c.kg(total) + ", au-dessus de la plaque (" + c.kg(ch) + "). Machine trop chargée : j'appelle le professeur."]
                : ["vert", "Masse ajoutée : " + c.kg(d) + " (" + c.kg(m1) + " − " + c.kg(x) + "). Total dans la machine : " + c.kg(total) + ", sous la plaque (" + c.kg(ch) + "). Je reporte " + c.kg(d) + " sur la fiche."];
            }
            return ["vert", "Masse ajoutée : " + c.kg(d) + " (" + c.kg(m1) + " − " + c.kg(x) + "). Je ne connais pas la charge d'avant : la règle reste « jamais au-delà de la plaque » (" + c.kg(ch) + "). Sous-refroidissement et HP me le disent. Je reporte " + c.kg(d) + " sur la fiche."];
          } } },

      { id: "depose", verbe: "Je ramène la HP au siège arrière et j'aspire", cadre: ["equipment-installation", "equipment-manifold"], cible: "vannes-service",
        tuyaux: ["blue", "red", "black", "yellow"], vannes: ["arriere", "mid"], manifold: ["bp", "hp"], aiguilles: "bas",
        regarde: "Les aiguilles BP et HP du manifold.",
        fais: "SERVICE fermée. Vanne B (HP) au siège arrière. J'ouvre HP puis BP du manifold, lentement : le compresseur aspire le flexible HP. Je ferme les deux dès que les aiguilles sont juste avant 0 bar.",
        voir: "Les deux aiguilles se rejoignent et descendent, sans passer sous 0.",
        danger: "Jamais en dessous de 0 bar : de l'air entrerait dans le circuit.",
        controle: { titre: "BP et HP lues avant de fermer", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const [bp, hp] = v.map(c.nb), bp0 = c.nb(c.releve("ouvrir", 0));
            if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
            if (bp < -LECT_P || hp < -LECT_P) return ["rouge", "STOP : une aiguille est sous 0 bar. Je ferme tout de suite les vannes du manifold et j'appelle le professeur : de l'air a pu entrer."];
            if (!c.proche(bp, hp, c.tol.mesure, LECT_P)) return ["ambre", "HP et BP diffèrent de " + c.fr(Math.abs(hp - bp), 1) + " bar : le compresseur n'a pas fini d'aspirer le flexible HP. J'attends."];
            if (!isNaN(bp0) && bp > bp0 * (1 + c.tol.mesure) + LECT_P) return ["ambre", "Les aiguilles sont à " + c.fr(bp, 1) + " bar, plus haut que la BP du début (" + c.fr(bp0, 1) + ") : une vanne n'est pas bien fermée ? J'en parle au professeur."];
            return ["vert", "HP et BP égales à " + c.fr(bp, 1) + " bar, sans passer sous 0 : je ferme les vannes HP et BP du manifold."];
          } },
        arret: "Le professeur a vérifié : bouteille fermée, vanne B au siège arrière, avant que j'ouvre le by-pass du manifold." },

      { id: "debrancher", verbe: "Je débranche et je remets tout comme trouvé", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
        tuyaux: ["blue", "red"], vannes: ["arriere", "arriere"], aiguilles: "zero",
        regarde: "Vanne C, raccords, bouchons, puis l'état des lieux du départ.",
        fais: "Vanne C (BP) au siège arrière. Je desserre le bleu puis le rouge, lentement, raccord tenu. Bouchons et capuchons remis. Détecteur sur raccords et bouchons. Je compare avec l'état des lieux.",
        voir: "Aiguilles à 0, prises bouchonnées, aucune alarme du détecteur, poste rangé.",
        danger: "Un flexible garde un peu de pression : je desserre lentement, raccord tenu, jamais face à quelqu'un.",
        controle: { titre: "Je coche ce que j'ai remis comme au départ", type: "coches",
          items: ["vannes de service au siège arrière", "flexibles desserrés lentement, aucun jet", "2 bouchons de prise et 2 capuchons de tige remis et serrés", "détecteur sur raccords et bouchons : aucune alarme", "manifold rangé, 4 vannes fermées, aiguilles à 0", "rien d'abîmé, rien qui manque"],
          ok: "Tout est comme je l'ai trouvé : le poste est rangé.",
          manque: "Il manque une coche : je ne range pas avant d'avoir tout vérifié." } },

      { id: "tracer", verbe: "Je trace l'intervention", cadre: ["equipment-bottle"], cible: "equipment-bottle",
        balance: "fin",
        regarde: "La fiche d'intervention, le registre, la balance.",
        fais: "Je reporte la masse ajoutée (départ − fin), pas une estimation. Fiche d'intervention (CERFA) et registre : fluide, quantité ajoutée, fuite cherchée. Bouteille rangée debout.",
        voir: "La même masse ajoutée sur la fiche, sur le registre et sur ma trace.",
        controle: { titre: "Je coche ce que j'ai écrit", type: "coches",
          items: ["masse ajoutée (départ − fin) sur la fiche d'intervention (CERFA)", "registre de l'équipement à jour : date, fluide, quantité ajoutée", "recherche de fuite et détecteur utilisé notés", "bouteille debout, robinets fermés, étiquette lisible", "mon nom et la date sur la fiche"],
          ok: "Intervention tracée : un geste non écrit n'existe pas.", manque: "Il manque une coche : je ne rends pas la fiche avant." },
        arret: "Le professeur a vérifié la pesée, la masse ajoutée et la fiche d'intervention." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", charge: "2,4", sh: "5 à 8", sr: "4 à 7" },
      charge: { ouvrir: ["1,2", "13", "-23", "29"], ecarts: ["-3", "27", "20", "2"], conclusion: ["0"], bouteille: ["R449A", "12,00"], complement: ["11,80"],
        stabiliser: ["1,8", "13,5", "6", "5"], "pesee-fin": ["11,40", "1,8"], depose: ["0,2", "0,2"] }
    }
  };
})();
