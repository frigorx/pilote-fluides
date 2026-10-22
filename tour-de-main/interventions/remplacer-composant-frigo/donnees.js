/* =====================================================================
   Gare « REMPLACER UN COMPOSANT DU CIRCUIT FRIGORIFIQUE » (ligne « Les interventions de base », au poste).
   Exemple principal : le filtre déshydrateur ; variante : le voyant liquide (même suite, même rigueur).
   Elle ENCHAÎNE les gares existantes au lieu de les recopier : état des lieux, récupération (gare 0), remplacement
   (le seul geste nouveau), étanchéité sous azote (gare 4), tirage au vide (gare 5), charge à la balance (gare 6), trace.
   Restructure, sans réinventer (voir SOURCES.md) :
   · le TP n° 8 de Franck (1re MFER) « Remplacer un organe de la ligne liquide » : gamme, règle des trois minutes ;
   · le cours HabFluide / CONTENU-12 (code 12.07 : ouvrir le système, remplacer un composant, refermer) et CONTENU-10 (brasage) ;
   · les « Fitters notes » Danfoss (quand remplacer, ne jamais réutiliser, déballer au dernier moment, azote dans le sens du filtre) ;
   · les modules pilote-fluides « filtre déshydrateur » et « voyant liquide ».
   Aucune valeur universelle inventée : vide, remontée, pression d'épreuve, débit d'azote, couple viennent du poste ou de la notice.
   ===================================================================== */
(function () {
  const ATM = 1.01325;       /* le manomètre indique une pression relative : P absolue = P relative + 1,013 bar */
  const BAISSE_LUE = 0.05;   /* bar : arrondi d'une lecture au 0,1 bar ; au-delà, toute baisse est une fuite (Franck, 08/10) */
  const LECTURE = 0.3;       /* bar : erreur de lecture d'une aiguille, en plus de la tolérance de 5 % */
  const norm = s => String(s || "").toUpperCase().replace(/[\s-]/g, "");
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
  /* température de saturation (°C) pour une pression absolue, sur la colonne k du tableau ; null hors tableau */
  function inverse(tab, pabs, k) {
    for (let i = 0; i < tab.length - 1; i++) {
      const p0 = tab[i][k], p1 = tab[i + 1][k];
      if (pabs >= p0 && pabs <= p1) return tab[i][0] + (pabs - p0) / (p1 - p0) * (tab[i + 1][0] - tab[i][0]);
    }
    return null;
  }
  /* température de saturation (°C) à une pression relative : « rosee » (vapeur, pour la surchauffe) ou « bulle » (liquide, pour le sous-refroidissement) */
  function tsat(fluide, prel, quoi) {
    const tab = PT[norm(fluide)]; if (!tab || isNaN(prel)) return null;
    return inverse(tab, prel + ATM, quoi === "rosee" && tab[0].length > 2 ? 2 : 1);
  }

  /* fluide inflammable : classe A2L, A2, A3 (étiquette), ou fluide connu comme tel (propane R-290, isobutane R-600a, R-32, R-1234yf…) */
  const FLUIDES_INFLAMMABLES = /^R(290|600A?|1270|170|1150|32|152A|1234YF|1234ZE|454[ABC]|452B|455A|444A|447A|443A)$/;
  const inflammable = c => /^(A2|A3|B2|B3)/.test(norm(c.m.classe)) || FLUIDES_INFLAMMABLES.test(norm(c.m.fluide));
  const STATION_HC = "<a href='../../../packs/fluides/res/intervention-hydrocarbures-interactive/'>Intervenir sur un circuit hydrocarbure</a>";
  /* diamètre d'un raccord en mm : « 1/4 », « 1/4 po », « 1/4\" », « 6,35 mm », « 6 mm » (un nombre seul vaut des mm) ; null si illisible */
  function enMm(s) {
    const m = String(s || "").toLowerCase().replace(",", ".").match(/(\d+\/\d+|\d+(?:\.\d+)?)\s*(mm|po|pouce|pouces|in|\")?/); if (!m) return null;
    if (m[1].includes("/")) { const [a, b] = m[1].split("/").map(Number); return a / b * 25.4; }
    const x = parseFloat(m[1]); return m[2] && m[2] !== "mm" ? x * 25.4 : x;
  }
  const memeRaccord = (a, b) => { const x = enMm(a), y = enMm(b); return x !== null && y !== null ? Math.abs(x - y) < 0.15 : norm(a) === norm(b); };

  /* petit écran ou tactile : le bouton « Agrandir » du site se pose sur le coin haut droit du dessin ; on lui laisse une bande vide
     au-dessus du dessin, pour qu'il ne recouvre jamais un appareil à toucher (audit de trouvabilité, 19/10/2026) */
  const PETIT = !!(window.matchMedia && window.matchMedia("(max-width: 900px), (pointer: coarse)").matches);

  window.GARE = {
    id: "remplacer-composant-frigo",
    titre: "Remplacer un composant du circuit frigorifique",
    sousTitre: "Les interventions de base · gare 10 · filtre déshydrateur (voyant en variante) · en cours de relecture",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Circuit chargé en fluide", aide: "machine arrêtée : on récupère, on remplace, on referme, on recharge" } },
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-134a", texte: true },
      { id: "classe", label: "Classe de sécurité du fluide (étiquette de la bouteille)", court: "Classe", exemple: "ex. A1, A2L, A3", texte: true },
      { id: "charge", label: "Charge (plaque)", court: "Charge", unite: "kg", nombre: true },
      { id: "raccord", label: "Raccord de la ligne liquide (lu sur le filtre en place)", court: "Raccord", exemple: "ex. 1/4 po ou 6 mm", texte: true },
      { id: "epreuve", label: "Pression d'épreuve sous azote (donnée par le professeur)", court: "Épreuve", unite: "bar", nombre: true },
      { id: "ps", label: "Pression admissible PS (plaque de la machine ou notice)", court: "PS plaque", unite: "bar", nombre: true },
      { id: "cible", label: "Cible de vide du poste (donnée par le professeur)", court: "Cible de vide", exemple: "donnée par le professeur", nombre: true },
      { id: "unite", label: "Unité du vacuomètre du poste", court: "Unité", exemple: "mbar, Pa ou micron", texte: true },
      { id: "remontee", label: "Remontée admise pendant le test (même unité)", court: "Remontée admise", exemple: "donnée par le professeur", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T16, T8, T13, T2 · compétences C5.1, C4.1, C4.2, C3.9, C4.5, C1.1 · savoirs S5.1, S5.2, S6.2",
      mfer: "1re Bac Pro MFER — tâches A1T3, A4T2, A5T2 · compétences C4, C10, C11 · savoirs S6, S7, S1",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 12.07 (ouvrir le système, enlever et remplacer un composant, refermer le système), 10.01 (brasage fort), 5.01 à 5.03 et 5.06 (récupérer, peser), 3.02 (épreuve d'étanchéité), 3.03 et 3.04 (vide), 5.05 à 5.07 (charge, registre), 9.08 (état d'un filtre sécheur)"
    },
    grille: [
      ["Je me protège, je récupère le fluide et je vérifie qu'il n'y a plus de pression AVANT d'ouvrir", { cap: "T8 · C4.2", mfer: "A1T3 · C4" }],
      ["Je dépose, je prépare et je monte le composant neuf dans le bon sens, sous balayage d'azote", { cap: "C5.1 · T16", mfer: "A4T2 · C10" }],
      ["Je referme : étanchéité sous azote, tirage au vide, charge pesée", { cap: "C3.9 · C4.1 · T13", mfer: "A4T2 · C10" }],
      ["Je vérifie le fonctionnement de la machine", { cap: "C4.5 · S5.1", mfer: "A4T2 · C10" }],
      ["Je trace : masses, composants déposés et posés, état laissé", { cap: "T2 · C1.1", mfer: "A5T2 · C11" }]
    ],
    exigence: {
      cap: "chaque geste juste et dans l'ordre, rien ouvert avant que la pression soit vérifiée, filtre déballé au dernier moment et monté dans le bon sens, masses notées et tracées ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie l'ordre (pourquoi la pression d'abord, pourquoi le filtre au dernier moment, pourquoi l'azote dans le sens du filtre) et je repère seul un relevé incohérent."
    },
    savoirEtre: "je n'ouvre jamais un circuit sans avoir lu sa pression au manomètre",
    tolerances: { pesee: 0.05, mesure: 0.05 },   /* Franck, 08/10 : 5 % sur la pesée ; les relevés ont aussi droit à une erreur de mesure */

    bilan(c) {
      const m1 = c.nb(c.releve("recuperer", 0)), m2 = c.nb(c.releve("recuperer", 1)), c1 = c.nb(c.releve("charger", 0)), c2 = c.nb(c.releve("charger", 1));
      const f = (x) => isNaN(x) ? "…" : c.kg(x);
      return `Machine : <b>${c.m.fluide || "…"}</b> · plaque <b>${c.m.charge ? c.kg(c.nb(c.m.charge)) : "…"}</b> · ` +
        `récupéré <b>${isNaN(m1) || isNaN(m2) ? "…" : f(m2 - m1)}</b> · rechargé <b>${isNaN(c1) || isNaN(c2) ? "…" : f(c1 - c2)}</b> · ` +
        `vide <b>${c.releve("vide", 0) || "…"} ${c.m.unite || ""}</b> · surchauffe <b>${c.releve("fonct", 4) || "…"} K</b>, sous-refroidissement <b>${c.releve("fonct", 5) || "…"} K</b>`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: PETIT ? "0 -190 1200 810" : "0 0 1200 620",
      noms: { "equipment-installation": "la machine (le groupe et ses vannes de service)", "equipment-composant": "le filtre et le voyant, sur la ligne liquide",
        "equipment-manifold": "le manifold", "equipment-station": "la station de récupération", "equipment-pump": "la pompe à vide",
        "equipment-vacuum": "le vacuomètre", "equipment-bottle": "la bouteille sur sa balance" },
      /* l'état du dessin suit l'étape : flexibles posés, composant en place ou déposé, masse lue sur la balance */
      appliquer(svg, e, c) {
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
        svg.classList.toggle("sans-composant", !!e.sansComposant);
        const b = svg.querySelector("#svg-balance"); if (!b) return;
        const lu = { recup: c.releve("recuperer", 1), charge: c.releve("charger", 1) }[e.balance] || (e.balance === "avant" ? c.releve("recuperer", 0) : "");
        b.textContent = lu ? c.kg(c.nb(lu)) : "…";
      }
    },

    etapes: [
      { id: "securite", verbe: "Je sécurise le poste", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Cette gare s'appelle « Remplacer un composant du circuit frigorifique ». L'exemple est le filtre déshydrateur ; si c'est un voyant, la suite est la même. Pour changer une pièce du circuit, il faut l'ouvrir : c'est donc une intervention sur un circuit qui contient du fluide, et chaque erreur d'ordre rejette du fluide dans l'air. On commence par vous protéger. Lunettes et gants. La machine est arrêtée, et c'est le professeur qui la consigne : cadenas et étiquette. Le brasage demande un extincteur à portée et un écran anti-feu. Le local est aéré, car ces fluides sont plus lourds que l'air. Et surtout, on lit la classe du fluide sur l'étiquette : si le fluide est inflammable, on ne brase rien avant l'accord du professeur. Le professeur vient vérifier avant de continuer.",
        regarde: "La machine, son interrupteur, le poste de brasage, l'extincteur.",
        fais: "Lunettes et gants. J'arrête la machine ; le professeur la consigne : cadenas, étiquette (voir la <a href='../remplacer-composant-electrique/index.html'>gare 11</a>). Extincteur, écran anti-feu, local aéré.",
        voir: "Machine consignée par le professeur, extincteur à portée, EPI sur moi.",
        danger: "Fluide inflammable (A2L, A3 : R-290, R-600a…) : pas de brasure avant l'accord du professeur. Le froid brûle.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["lunettes et gants portés", "machine arrêtée, consignée par le professeur (cadenas, étiquette)", "extincteur à portée, écran anti-feu en place", "local aéré, flexibles et isolant écartés de la flamme", "classe du fluide lue sur l'étiquette (A1 : non inflammable ; A2L, A2, A3 : inflammable)"],
          ok: "Poste sûr : je peux commencer.", manque: "Il manque une coche : je ne continue pas avant." },
        arret: "Le professeur a vérifié : EPI portés, machine consignée, extincteur à portée." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "equipment-installation",
        narration: "Avant toute intervention, on constate l'état dans lequel on trouve la machine. Sur chaque vanne de service, on regarde la pièce qui coiffe la tige et celle qui ferme la prise : présentes, serrées, en bon état ? Cette fois, on ajoute un point propre à cette gare : le filtre en place. On note le sens de sa flèche, on le photographie en place. Ce constat est votre point de repère : le filtre neuf devra être monté dans le même sens. Ensuite, on choisit le composant neuf.",
        regarde: "Les vannes de service, capuchons, bouchons, le filtre en place.",
        fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état. Je photographie le filtre en place, flèche visible.",
        voir: "Tout est là et serré ; la flèche du filtre en place est notée.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque", "sens de la flèche du filtre en place noté (photo)"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "choisir", verbe: "Je choisis le composant neuf", cadre: ["equipment-composant"], cible: "equipment-composant",
        narration: "On choisit le filtre neuf avant d'ouvrir quoi que ce soit. Sur son étiquette, vous lisez les fluides qu'il accepte et ses raccords. Les raccords doivent être les mêmes que ceux du filtre en place, sinon il ne se monte pas. Votre fluide doit être cité. Et surtout, vous ne le déballez pas : un filtre neuf est scellé, et dès qu'il est ouvert il absorbe l'humidité de l'air de l'atelier. Pour un voyant, même démarche : même raccord, et sur la ligne liquide, juste après le filtre.",
        regarde: "L'étiquette du filtre neuf, encore scellé.",
        fais: "Je lis l'étiquette : fluides cités, raccords. Je compare au filtre en place. Voyant : même raccord, juste après le filtre. Je ne déballe PAS.",
        voir: "Même raccord que l'ancien, mon fluide cité, emballage encore scellé.",
        danger: "Un filtre déballé trop tôt absorbe l'humidité de l'air : il se déballe au dernier moment.",
        controle: { titre: "Mon filtre neuf", champs: [{ label: "Raccord du filtre neuf (po ou mm)", texte: true }, { label: "Fluides cités sur son étiquette", texte: true }],
          juger(v, c) {
            if (!String(c.m.classe || "").trim()) return ["rouge", "STOP : la classe de sécurité du fluide n'est pas écrite dans « Ma machine ». Je la lis sur l'étiquette de la bouteille (A1, A2L, A2, A3…) : sans elle, je ne passe pas à la suite."];
            if (!c.m.raccord || !c.m.fluide) return ["ambre", "J'écris d'abord le fluide et le raccord du filtre en place dans « Ma machine »."];
            if (inflammable(c)) return ["rouge", "STOP : " + c.m.fluide + " est un fluide inflammable (classe " + c.m.classe + "). Aucune brasure, aucune flamme avant l'accord du professeur. Avant toute brasure : circuit vidé, puis balayé à l'azote, sans source d'ignition, outillage adapté. J'appelle le professeur ; station à faire : " + STATION_HC + "."];
            if (!memeRaccord(v[0], c.m.raccord)) return ["rouge", "STOP : le raccord du filtre neuf (" + v[0] + ") n'est pas celui du filtre en place (" + c.m.raccord + "). Il ne se montera pas : j'appelle le professeur."];
            if (!norm(v[1]).includes(norm(c.m.fluide))) return ["rouge", "STOP : mon fluide (" + c.m.fluide + ") n'est pas cité sur l'étiquette. Je ne monte pas ce filtre : j'appelle le professeur."];
            return ["vert", "Même raccord (" + v[0] + "), fluide " + c.m.fluide + " cité : ce filtre convient. Il reste scellé."];
          } } },

      { id: "recuperer", verbe: "Je récupère le fluide", cadre: ["equipment-station", "equipment-bottle"], cible: "equipment-station", tuyaux: ["blue", "red", "yellow", "orange"], balance: "recup",
        narration: "Avant d'ouvrir le circuit, il faut le vider de son fluide, sans aucun rejet. Pour cela, vous faites la gare « Récupérer le fluide » : liquide d'abord, puis vapeur, bouteille pesée avant et après. Cette gare-ci ne recopie pas ces gestes, elle s'appuie dessus. Vous revenez ici avec deux masses : celle de la bouteille avant, celle d'après. La différence est le fluide récupéré, et elle doit être proche de la charge écrite sur la plaque. Jamais on n'ouvre ni on ne brase avant que la récupération soit finie et vérifiée.",
        regarde: "La station de récupération et sa sortie vers la bouteille.",
        fais: "Je fais la gare « <a href='../recuperation/index.html#vue=poste'>Récupérer le fluide</a> » : liquide puis vapeur, bouteille pesée. Je note ici les deux masses.",
        voir: "Masse récupérée proche de la charge de la plaque, à 5 % près.",
        danger: "Ni ouvrir ni braser avant la fin de la récupération : ce serait rejeter du fluide dans l'air.",
        controle: { titre: "Mes deux pesées de la bouteille", champs: [{ label: "Avant", unite: "kg" }, { label: "Après", unite: "kg" }],
          juger(v, c) {
            const m1 = c.nb(v[0]), m2 = c.nb(v[1]), ch = c.nb(c.m.charge), tol = c.tol.pesee;
            if (isNaN(m1) || isNaN(m2)) return ["ambre", "J'écris deux nombres, en kg, par exemple 12,00 puis 13,75."];
            const d = m2 - m1;
            if (d <= 0) return ["rouge", "Masse après plus petite que la masse avant : je repèse, bouteille seule et stable."];
            if (!ch) return ["vert", "Masse récupérée : " + c.kg(d) + ". (J'écris la charge de la plaque dans « Ma machine » pour comparer.)"];
            if (d < ch * (1 - tol)) return ["ambre", "Récupéré " + c.kg(d) + ", la plaque dit " + c.kg(ch) + " : il manque " + c.kg(ch - d) + ". Fuite passée, récupération pas finie ? J'en parle au professeur."];
            if (d > ch * (1 + tol)) return ["ambre", "Récupéré " + c.kg(d) + ", plus que la plaque (" + c.kg(ch) + ") : machine trop chargée, ou première pesée fausse ?"];
            return ["vert", "Récupéré " + c.kg(d) + " pour " + c.kg(ch) + " sur la plaque : cohérent à 5 % près."];
          } } },

      { id: "zero", verbe: "Je vérifie qu'il n'y a plus de pression", cadre: ["equipment-manifold"], cible: "equipment-manifold", tuyaux: ["blue", "red"], balance: "recup",
        narration: "C'est le point qui protège tout le reste : avant d'ouvrir le circuit, on lit la pression au manomètre. Pas à l'oreille, pas à l'intuition : au manomètre. On lit la basse pression et la haute pression. Machine arrêtée, elles doivent être égales, à zéro bar ou en dépression. Si une aiguille indique encore de la pression, il reste du fluide : on retourne à la récupération. Le professeur vient vérifier vos deux lectures avant que vous ne coupiez le moindre tube.",
        regarde: "Les aiguilles BP et HP du manifold.",
        fais: "Machine arrêtée, je lis BP et HP au manifold. Elles sont égales, à 0 bar ou en dépression. Sinon, je retourne à la récupération.",
        voir: "BP et HP à 0 ou sous 0 : plus aucune pression dans le circuit.",
        danger: "Une aiguille au-dessus de 0 : il reste du fluide. Je n'ouvre pas, je n'approche pas la flamme.",
        controle: { titre: "Mes deux aiguilles", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
          juger(v, c) {
            const bp = c.nb(v[0]), hp = c.nb(v[1]); if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar (négatif sous la pression de l'air)."];
            if (bp > LECTURE || hp > LECTURE) return ["rouge", "STOP : encore " + c.fr(Math.max(bp, hp), 1) + " bar. Il reste du fluide : je n'ouvre pas, je reprends la récupération."];
            if (!c.proche(bp, hp, c.tol.mesure, 0.4)) return ["ambre", "Machine arrêtée, BP et HP devraient être égales : une vanne du manifold ou de service est restée fermée ? Je vérifie."];
            return ["vert", "BP " + c.fr(bp, 1) + " bar, HP " + c.fr(hp, 1) + " bar : le circuit n'est plus sous pression. Je peux l'ouvrir."];
          } },
        arret: "Le professeur a vérifié : BP et HP lues, circuit hors pression, méthode de dépose choisie, avant que j'ouvre." },

      { id: "deposer", verbe: "Je dépose l'ancien filtre", cadre: ["equipment-composant"], cible: "equipment-composant", sansComposant: true,
        narration: "Le circuit n'est plus sous pression : on peut déposer l'ancien filtre. L'isolant et les flexibles sont écartés. S'il est brasé, on le coupe au coupe-tube, de part et d'autre, bien droit : pas de chalumeau pour le déposer. S'il est vissé, on le dévisse. Aussitôt déposé, on bouche les deux tubes pour que l'air et l'humidité n'entrent pas. L'ancien filtre contient encore un peu de fluide et d'huile : on le scelle, on l'étiquette et on le garde pour la reprise. Si vous deviez chauffer un tube où il reste du fluide, ce qui sortirait serait des gaz toxiques, et c'est pour cela que la pression est vérifiée avant.",
        regarde: "L'ancien filtre, les deux tubes, le sens de sa flèche.",
        fais: "J'écarte l'isolant. Filtre brasé : je le coupe au coupe-tube, de part et d'autre, droit. Filtre vissé : je le dévisse. Je bouche les deux tubes aussitôt. Je scelle l'ancien filtre.",
        voir: "Ancien filtre déposé, tubes bouchés, ancien filtre scellé.",
        danger: "Chauffer un tube où il reste du fluide donne des gaz toxiques : pression vérifiée à 0 avant tout.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["ancien filtre déposé (brasé : coupe-tube ; vissé : dévissé)", "les deux tubes bouchés aussitôt", "sens de sa flèche confirmé (photo)", "ancien filtre scellé et étiqueté, à reprendre"],
          ok: "Dépose faite, circuit protégé de l'air.", manque: "Il manque une coche : je ne passe pas au montage avant." } },

      { id: "preparer", verbe: "Je prépare les tubes et le poste", cadre: ["equipment-composant"], cible: "equipment-composant", sansComposant: true,
        narration: "Tout doit être prêt AVANT de déballer le filtre neuf, parce qu'il ne doit pas attendre à l'air. Les extrémités des tubes sont coupées droit, ébavurées et nettoyées au chiffon propre. Le poste de brasage est allumé, l'écran anti-feu est en place. L'azote est prêt : mano-détendeur monté, flexible raccordé, et une sortie libre à l'autre bout du circuit pour que le gaz puisse sortir. Un essai à blanc, sans flamme, vérifie que le filtre s'emboîte bien. Le filtre reste dans son emballage.",
        regarde: "Les deux tubes de la ligne liquide, là où se pose le filtre.",
        fais: "Je coupe droit, j'ébavure, je nettoie. Poste prêt, écran en place. Azote : vis du détendeur desserrée avant d'ouvrir, puis un souffle léger (débit : professeur), sortie libre. Filtre scellé.",
        voir: "Tubes propres et droits, poste prêt, azote prêt, filtre encore scellé.",
        danger: "Azote sec seulement : jamais d'oxygène, jamais d'air comprimé.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["tubes coupés droit, ébavurés, nettoyés", "poste de brasage prêt, écran anti-feu en place", "azote prêt : mano-détendeur, sortie libre à l'autre bout", "filtre neuf toujours scellé à ce stade"],
          ok: "Tout est prêt : je peux déballer.", manque: "Il manque une coche : le filtre reste scellé." } },

      { id: "monter", verbe: "Je déballe et je monte le filtre", cadre: ["equipment-composant"], cible: "equipment-composant",
        narration: "C'est le geste nouveau de cette gare, et il se fait vite. On déballe le filtre au dernier moment, puis on le monte tout de suite. La flèche est dans le sens où circule le fluide, du condenseur vers le détendeur. Un chiffon mouillé entoure le corps du filtre, pour ne pas l'abîmer par la chaleur. L'azote circule à faible débit, dans le sens du filtre, sortie ouverte : ce n'est pas une épreuve de pression. Alors seulement, on brase : flamme neutre, on chauffe le raccord puis le tube, et on apporte le métal d'apport donné par le professeur, sans chauffer le corps du filtre. Si le filtre se visse, on suit la notice et on met des joints neufs. Un voyant se monte de la même façon, juste après le filtre. Le professeur vient vérifier avant la flamme.",
        regarde: "La flèche du filtre, le chiffon mouillé, le balayage d'azote.",
        fais: "Je déballe au dernier moment. Flèche dans le sens du fluide. Chiffon mouillé sur le corps. Azote léger, sortie libre. Flamme neutre : raccord, puis tube, puis métal d'apport (professeur).",
        voir: "Flèche dans le sens du fluide ; joint propre, métal fondu tout autour ; refroidi à l'air.",
        danger: "Flamme loin de l'isolant et des flexibles. Fumées de brasage : tête écartée, local aéré, lunettes.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["déballé au dernier moment, monté dans la foulée", "flèche dans le sens du fluide (condenseur vers détendeur)", "chiffon mouillé autour du corps du filtre", "balayage d'azote pendant le brasage, sortie libre", "refroidi à l'air, sans choc ; voyant : juste après le filtre"],
          ok: "Composant monté dans les règles.", manque: "Il manque une coche : je ne referme pas avant." },
        arret: "Le professeur a vérifié : flèche, balayage d'azote et écran anti-feu, avant la flamme." },

      { id: "etancheite", verbe: "Je contrôle l'étanchéité sous azote", cadre: ["equipment-manifold"], cible: "equipment-manifold", tuyaux: ["blue", "red"],
        narration: "Le circuit est refermé : avant de le tirer au vide, on prouve qu'il est étanche. Vous faites la gare « Contrôler l'étanchéité sous azote » et vous suivez sa méthode à la lettre. Le mano-détendeur est monté, vis desserrée à fond, robinet fermé. On monte par paliers, jamais au-dessus de la pression d'épreuve du professeur, ni de la pression admissible de la plaque, ni de l'échelle du manomètre : les deux limites sont écrites dans « Ma machine ». Le professeur vérifie avant la mise sous azote. Puis recherche de fuite à la solution moussante, et tenue. Vous revenez avec deux relevés, départ et fin, chacun avec la température de l'air : une fois la température prise en compte, aucune baisse n'est admise.",
        regarde: "Les manomètres, le thermomètre, chaque joint neuf.",
        fais: "Je fais la gare « <a href='../etancheite-azote/index.html#vue=poste'>Contrôler l'étanchéité sous azote</a> » : paliers, vis desserrée avant d'ouvrir. Je note ici départ puis fin.",
        voir: "Départ à la pression d'épreuve, sous la PS ; fin égale au départ, à la température près.",
        danger: "Jamais au-dessus de la pression d'épreuve du professeur, ni de la PS de la plaque, ni de l'échelle du manomètre.",
        controle: { titre: "Mes relevés, départ puis fin", champs: [{ label: "Départ : pression", unite: "bar" }, { label: "température", unite: "°C" }, { label: "Fin : pression", unite: "bar" }, { label: "température", unite: "°C" }],
          juger(v, c) {
            const p1 = c.nb(v[0]), t1 = c.nb(v[1]), p2 = c.nb(v[2]), t2 = c.nb(v[3]), ep = c.nb(c.m.epreuve), ps = c.nb(c.m.ps);
            if ([p1, t1, p2, t2].some(isNaN)) return ["ambre", "J'écris quatre nombres : pression et température au départ, puis à la fin."];
            if (isNaN(ep) || isNaN(ps)) return ["ambre", "J'écris d'abord la pression d'épreuve (donnée par le professeur) et la PS de la plaque dans « Ma machine »."];
            /* mêmes limites que la gare « Contrôler l'étanchéité sous azote » : épreuve <= PS, jamais au-dessus de l'épreuve ni de la PS */
            if (ep > ps) return ["rouge", "STOP : la pression d'épreuve (" + c.fr(ep, 1) + " bar) dépasse la PS de la plaque (" + c.fr(ps, 1) + " bar). Je ne monte pas : j'appelle le professeur."];
            const haut = Math.max(p1, p2);
            if (haut > ps + LECTURE) return ["rouge", "STOP : " + c.fr(haut, 1) + " bar, au-dessus de la PS de la plaque (" + c.fr(ps, 1) + " bar). Je desserre la vis et j'appelle le professeur."];
            if (haut > ep && !c.proche(haut, ep, c.tol.mesure, LECTURE)) return ["rouge", "STOP : " + c.fr(haut, 1) + " bar, au-dessus de la pression d'épreuve (" + c.fr(ep, 1) + " bar). Je desserre la vis jusqu'à la valeur demandée."];
            if (p1 <= 0) return ["ambre", "Une épreuve se fait sous pression : j'écris la pression relevée au départ (plus de 0 bar)."];
            if (!c.proche(p1, ep, c.tol.mesure, LECTURE)) return ["ambre", "Seulement " + c.fr(p1, 1) + " bar pour " + c.fr(ep, 1) + " bar d'épreuve : montée pas finie, ou fuite déjà ? Je continue par paliers."];
            /* même gaz, même volume : P absolue / T absolue reste constant. Sans fuite, la pression suit la température. */
            const att = (p1 + ATM) * (t2 + 273.15) / (t1 + 273.15) - ATM, dT = t2 - t1;
            const temp = Math.abs(dT) >= 1 ? " L'air a changé de " + c.fr(dT, 0) + " °C : sans fuite, j'attendais " + c.fr(att, 1) + " bar." : "";
            if (p2 >= att - BAISSE_LUE && p2 <= att + LECTURE) return ["vert", "Départ " + c.fr(p1, 1) + " bar (épreuve " + c.fr(ep, 1) + ", PS " + c.fr(ps, 1) + "), fin " + c.fr(p2, 1) + " bar : aucune baisse une fois la température prise en compte." + temp + " Pas de fuite sur cette durée."];
            if (p2 < att) return ["rouge", "Fuite : je cherche (joints neufs d'abord). Départ " + c.fr(p1, 1) + " bar, fin " + c.fr(p2, 1) + " bar." + temp + " La température n'explique pas toute la baisse."];
            return ["ambre", "La pression a plus monté que la température ne l'explique (j'attendais " + c.fr(att, 1) + " bar) : je relis l'aiguille et les deux températures."];
          } },
        arret: "Le professeur a vérifié : pression d'épreuve et PS, vis du détendeur desserrée, vannes, avant la mise sous azote." },

      { id: "vide", verbe: "Je tire au vide", cadre: ["equipment-pump", "equipment-vacuum"], cible: "equipment-pump", tuyaux: ["blue", "red", "black"],
        narration: "L'azote est vidé à l'air, puis on retire l'air et l'humidité du circuit : le tirage au vide. Vous faites la gare « Tirer au vide et tester la remontée ». Elle vous apprend la pompe, le vacuomètre, l'ordre des vannes, et le test qui prouve que le vide tient. Vous revenez avec deux lectures : le vide atteint, puis le vide après le test. La cible et la remontée admise ne sont pas des valeurs universelles : ce sont celles du poste. Le professeur vient vérifier que le vide tient avant que vous ne chargiez.",
        regarde: "La pompe à vide et ses vannes.",
        fais: "Je fais la gare « <a href='../tirage-au-vide/index.html#vue=poste'>Tirer au vide</a> » : vide jusqu'à la cible, circuit isolé, test de remontée. Je note ici deux lectures.",
        voir: "Le vide atteint la cible du poste et ne remonte pas au-delà de ce qui est admis.",
        danger: "Je ferme AVANT d'arrêter la pompe : sinon l'air revient dans le circuit.",
        controle: { titre: "Mes deux lectures du vacuomètre", champs: [{ label: "Vide atteint", uniteMachine: "unite" }, { label: "Après le test", uniteMachine: "unite" }],
          juger(v, c) {
            const a = c.nb(v[0]), b = c.nb(v[1]), cible = c.nb(c.m.cible), adm = c.nb(c.m.remontee);
            if (isNaN(a) || isNaN(b)) return ["ambre", "J'écris deux nombres, dans l'unité du vacuomètre."];
            if (isNaN(cible) || isNaN(adm)) return ["ambre", "J'écris d'abord la cible, l'unité et la remontée admise dans « Ma machine »."];
            if (a > cible && !c.proche(a, cible, c.tol.mesure)) return ["rouge", "STOP : " + c.fr(a, 2) + " pour une cible de " + c.fr(cible, 2) + " : la cible n'est pas atteinte. Je continue de tirer au vide, ou je cherche une fuite."];
            if (b < a) return ["ambre", "Après le test, le vide est meilleur qu'avant : je relis le vacuomètre."];
            if (b - a > adm * (1 + c.tol.mesure)) return ["rouge", "STOP : le vide est remonté de " + c.fr(b - a, 2) + " pour " + c.fr(adm, 2) + " admis : le vide ne tient pas. Fuite ou humidité : j'appelle le professeur."];
            return ["vert", "Cible atteinte (" + c.fr(a, 2) + "), remontée de " + c.fr(b - a, 2) + " pour " + c.fr(adm, 2) + " admis : le vide tient. Je peux charger."];
          } } },

      { id: "charger", verbe: "Je recharge à la balance", cadre: ["equipment-bottle"], cible: "equipment-bottle", tuyaux: ["blue", "red"], balance: "charge",
        narration: "Le circuit est étanche et sec : on le recharge. Vous faites la gare « Charger en fluide neuf, à la balance » : la balance dit combien, le manomètre dit comment. La masse de la bouteille est notée avant de brancher et pendant la charge. Vous revenez avec la masse avant et la masse après. La différence est la masse chargée, et elle vise la charge écrite sur la plaque de la machine. Vous n'estimez jamais une quantité : vous la pesez.",
        regarde: "La balance, sous la bouteille.",
        fais: "Je fais la gare « <a href='../charge-fluide-neuf/index.html#vue=poste'>Charger en fluide neuf</a> ». Je note ici la masse de la bouteille avant, puis après.",
        voir: "Masse chargée = masse avant − masse après, proche de la plaque.",
        danger: "Jamais plus que la masse de la plaque. Je surveille la balance tout le temps.",
        controle: { titre: "Mes deux pesées", champs: [{ label: "Avant la charge", unite: "kg" }, { label: "Après la charge", unite: "kg" }],
          juger(v, c) {
            const m1 = c.nb(v[0]), m2 = c.nb(v[1]), ch = c.nb(c.m.charge), tol = c.tol.pesee;
            if (isNaN(m1) || isNaN(m2)) return ["ambre", "J'écris deux nombres, en kg."];
            const d = m1 - m2;
            if (d <= 0) return ["rouge", "La bouteille doit peser MOINS après la charge : je repèse, bouteille seule et stable."];
            if (!ch) return ["vert", "Masse chargée : " + c.kg(d) + ". (J'écris la charge de la plaque dans « Ma machine » pour comparer.)"];
            if (d > ch * (1 + tol)) return ["rouge", "STOP : chargé " + c.kg(d) + ", plus que la plaque (" + c.kg(ch) + "). Je ferme la bouteille et j'appelle le professeur."];
            if (d < ch * (1 - tol)) return ["ambre", "Chargé " + c.kg(d) + " pour " + c.kg(ch) + " sur la plaque : il manque " + c.kg(ch - d) + ". Je continue la charge, par petites quantités, balance sous les yeux."];
            return ["vert", "Chargé " + c.kg(d) + " pour " + c.kg(ch) + " sur la plaque : cohérent à 5 % près. Je reporte " + c.kg(d) + " sur la fiche."];
          } } },

      { id: "fonct", verbe: "Je vérifie le fonctionnement", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-manifold", tuyaux: ["blue", "red"],
        narration: "La machine tourne de nouveau. On lit la basse et la haute pression, puis deux températures à la pince : la ligne d'aspiration et la ligne liquide. Avec la table du fluide : surchauffe, c'est la température d'aspiration moins la saturation vapeur à la basse pression ; sous-refroidissement, c'est la saturation liquide à la haute pression moins la température de la ligne liquide. Comme dans la gare de la charge. Une surchauffe nulle veut dire que du liquide revient au compresseur : dans ce cas, on arrête et on appelle le professeur. Si un voyant est monté, on le regarde aussi : du liquide sans bulles.",
        regarde: "BP, HP, les deux températures à la pince, le voyant.",
        fais: "Machine en marche, régime stable. Je lis BP et HP, et deux températures à la pince. Je calcule comme dans la gare « <a href='../charge-fluide-neuf/index.html#vue=poste'>Charger en fluide neuf</a> », étape 12.",
        voir: "HP au-dessus de BP ; surchauffe et sous-refroidissement positifs ; voyant sans bulles.",
        danger: "Surchauffe nulle : du liquide revient au compresseur. J'arrête et j'appelle le professeur.",
        controle: { titre: "Mes relevés et mes deux calculs", champs: [
            { label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }, { label: "T° aspiration", unite: "°C" }, { label: "T° liquide", unite: "°C" },
            { label: "Surchauffe", unite: "K" }, { label: "Sous-refroid.", unite: "K" }],
          juger(v, c) {
            const [bp, hp, ta, tl, sh, sr] = v.map(c.nb), t = c.tol.mesure;
            if (v.some(x => isNaN(c.nb(x)))) return ["ambre", "J'écris six nombres : BP et HP (bar), les deux températures (°C), puis mes deux calculs (K)."];
            if (hp <= bp) return ["rouge", "La HP est plus basse que la BP : en marche, c'est impossible. Flexibles inversés, ou machine arrêtée ? Je vérifie bleu = BP, rouge = HP."];
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            const tev = tsat(c.m.fluide, bp, "rosee"), tco = tsat(c.m.fluide, hp, "bulle");
            if (tev === null || tco === null) return ["ambre", "Pas de table pour " + c.m.fluide + " à ces pressions dans la gare : je prends la table du poste et je demande au professeur de vérifier mes deux calculs."];
            const shRef = ta - tev, srRef = tco - tl;
            const p = x => (x < 0 ? "(" + c.fr(x, 1) + ")" : c.fr(x, 1));   /* un nombre négatif se lit entre parenthèses */
            const calc = "Surchauffe : " + p(ta) + " − " + p(tev) + " (rosée à la BP) = " + c.fr(shRef, 1) + " K. Sous-refroidissement : " + p(tco) + " (bulle à la HP) − " + p(tl) + " = " + c.fr(srRef, 1) + " K.";
            if (shRef <= 0) return ["rouge", "STOP : surchauffe nulle ou négative (" + c.fr(shRef, 1) + " K) : du liquide peut revenir au compresseur. J'arrête et j'appelle le professeur. " + calc];
            if (!c.proche(sh, shRef, t, 1) || !c.proche(sr, srRef, t, 1)) return ["ambre", "Mes calculs ne correspondent pas aux relevés. " + calc + " Je refais mes deux soustractions."];
            if (srRef <= 0) return ["ambre", "Sous-refroidissement nul ou négatif : bulles possibles au voyant, charge ou condenseur à revoir. J'en parle au professeur. " + calc];
            return ["vert", "Cohérent : HP > BP, surchauffe " + c.fr(sh, 1) + " K et sous-refroidissement " + c.fr(sr, 1) + " K positifs. Je les compare aux fourchettes du poste. " + calc];
          } } },

      { id: "trace", verbe: "Je contrôle, j'étiquette et je trace", cadre: ["equipment-installation"], cible: "equipment-installation", balance: "charge",
        narration: "Une intervention qui n'est pas tracée n'existe pas. Avant de ranger, on contrôle que le circuit n'a pas de fuite après l'ouverture, au détecteur : vous pouvez faire pour cela la gare « Chercher une fuite au détecteur ». On remplit la fiche d'intervention et le registre avec les mêmes informations : la masse récupérée, la masse chargée, le numéro de la bouteille, le composant déposé et le composant posé avec leurs références, l'état dans lequel la machine est laissée, et ce que la prochaine équipe doit savoir. L'ancien filtre est étiqueté et conservé. L'étiquette de l'installation est à jour.",
        regarde: "L'installation, la fiche d'intervention, le registre.",
        fais: "Je contrôle l'étanchéité après la remise en marche. Étiquette à jour. Fiche et registre : masses, composants déposé et posé, état laissé, suite.",
        voir: "Étiquette, fiche et registre disent la même chose, avec les mêmes masses.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["voyant (s'il y en a un) : liquide sans bulles ; indicateur : la couleur « sec » de la notice", "<span>contrôle d'étanchéité fait après la remise en marche (<a href='../fuite-detecteur/index.html#vue=poste'>gare « Chercher une fuite au détecteur »</a>)</span>", "fiche d'intervention et registre : masse récupérée, masse chargée, bouteille, composants déposé et posé", "état laissé et suite notés ; étiquette de l'installation à jour", "ancien filtre étiqueté, scellé, conservé pour la reprise"],
          ok: "Intervention tracée : un geste non consigné n'existe pas.", manque: "Il manque une coche : l'intervention n'est pas tracée, je ne range pas." } },

      { id: "remise", verbe: "Je remets tout comme trouvé", cadre: ["equipment-installation", "equipment-bottle"], cible: "equipment-installation",
        narration: "Dernière étape : on rend le poste tel qu'on l'a reçu. Les flexibles sont déposés, et la machine en marche vide ce qu'il y a dans les flexibles. Les vannes de service retournent au siège arrière, chaque capuchon et chaque bouchon est remis, bien serré : c'est à cela que servait l'état des lieux du début. La bouteille est fermée, bouchonnée, remise debout. Le poste de brasage est éteint, l'outillage rangé. Rien ne doit être abîmé, rien ne doit manquer.",
        regarde: "Les vannes, les capuchons, la bouteille, le poste de brasage.",
        fais: "Je dépose les flexibles, la machine vide ce qu'ils contiennent. Vannes au siège arrière, capuchons et bouchons remis. Bouteille fermée, debout. Poste de brasage éteint.",
        voir: "Machine comme au départ : rien d'abîmé, rien qui manque, poste rangé.",
        danger: "Un reste de fluide dans un flexible se récupère : jamais dans l'air.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["flexibles déposés sans rejet", "vannes de service au siège arrière, capuchons et bouchons remis, serrés", "bouteille fermée, bouchonnée, debout", "poste de brasage éteint, outillage rangé", "rien d'abîmé, rien qui manque"],
          ok: "Tout est remis comme je l'ai trouvé.", manque: "Il manque une coche : je ne quitte pas le poste avant." } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-134a", classe: "A1", charge: "1,8", raccord: "1/4 po", epreuve: "10", ps: "24", cible: "0,5", unite: "mbar", remontee: "0,3" },
      charge: { choisir: ["6,35 mm", "R-134a, R-404A"], recuperer: ["12,00", "13,75"], zero: ["-0,3", "-0,2"], etancheite: ["10", "20", "10", "19"],
        vide: ["0,4", "0,45"], charger: ["9,00", "7,20"], fonct: ["1,2", "9,5", "-2", "36", "5,8", "5,1"] }
    }
  };
})();
