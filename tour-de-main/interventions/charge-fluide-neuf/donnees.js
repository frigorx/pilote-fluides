/* =====================================================================
   Gare 6 — CHARGER EN FLUIDE NEUF, À LA BALANCE (ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · les fiches de Franck (CAP IFCA, C4) : « DOSSIER RESSOURCES charge » (charge en liquide : installation
     tirée au vide, arrêtée ; précharge ; fin de charge en marche par petites quantités ; zéotrope TOUJOURS en
     liquide), « TP charge et complément de charge », « Mise en service et charge en fluide frigorigène »
     (balance : masse avant et après chaque opération) et « fiche contrat tirage charge » ;
   · la guidance plateau M3 de l'habilitation (phase 3 « charge pesée » : la balance dit combien, le manomètre
     dit comment ; masse de départ notée AVANT tout branchement ; balance surveillée PENDANT la charge) ;
   · la planche pesee-charge.svg (la masse chargée = ce que la balance a perdu) et le diaporama « CHARGE EN FF » ;
   · les tables pression-température de packs/fluides/res/outils/fluides-data.js (comme la gare 2).
   Parcours unique : « Circuit sous vide » (après le test de remontée de la gare 5, avec du fluide neuf).
   Aucune valeur universelle de vide, de surchauffe ni de sous-refroidissement : ce sont des champs de « Ma machine ».
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
  /* température de saturation (°C) pour une pression absolue, sur la colonne k du tableau ; null hors tableau */
  function inverse(tab, pabs, k) {
    for (let i = 0; i < tab.length - 1; i++) {
      const p0 = tab[i][k], p1 = tab[i + 1][k];
      if (pabs >= p0 && pabs <= p1) return tab[i][0] + (pabs - p0) / (p1 - p0) * (tab[i + 1][0] - tab[i][0]);
    }
    return null;
  }
  const norm = s => String(s || "").toUpperCase().replace(/[\s-]/g, "");
  /* mélange zéotrope : la série R-4xx (R-407C, R-448A, R-449A, R-454B…), toujours chargé en phase LIQUIDE (Franck) */
  const zeotrope = f => /^R4\d\d[A-Z]?$/.test(norm(f));
  /* température de saturation (°C) à une pression relative : « rosee » (vapeur, pour la surchauffe) ou « bulle » (liquide, pour le sous-refroidissement) */
  function tsat(fluide, prel, quoi) {
    const tab = PT[norm(fluide)]; if (!tab || isNaN(prel)) return null;
    return inverse(tab, prel + ATM, quoi === "rosee" && tab[0].length > 2 ? 2 : 1);
  }
  /* « 5 à 10 » ou « 5-10 » → [5, 10] ; un seul nombre → [x, x] ; rien → null */
  function plage(txt) {
    const v = (String(txt || "").match(/\d+(?:[.,]\d+)?/g) || []).map(x => parseFloat(x.replace(",", ".")));
    return v.length ? [Math.min(...v), Math.max(...v)] : null;
  }
  const dedans = (x, p, tol) => x >= p[0] * (1 - tol) - 0.5 && x <= p[1] * (1 + tol) + 0.5;   /* erreur de mesure : 5 % et 0,5 K de lecture */
  const RES = 0.05;   /* kg : résolution d'une balance d'atelier */

  window.GARE = {
    id: "charge-fluide-neuf",
    titre: "Charger en fluide neuf, à la balance",
    sousTitre: "Les interventions de base · gare 6 · phase liquide, balance, relevés",
    parcours: ["charge"],
    parcoursNoms: { charge: { nom: "Circuit sous vide", aide: "après le test de remontée, avec du fluide neuf" } },
    machine: [
      { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-449A", texte: true },
      { id: "charge", label: "Charge (plaque)", court: "Charge", unite: "kg", nombre: true },
      { id: "surchauffe", label: "Surchauffe attendue au poste (donnée par le professeur)", court: "Surchauffe attendue", unite: "K", exemple: "mini à maxi, ex. 4 à 8", texte: true },
      { id: "sousref", label: "Sous-refroidissement attendu au poste (donné par le professeur)", court: "Sous-refroid. attendu", unite: "K", exemple: "mini à maxi, ex. 3 à 7", texte: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T6, T8, T13, T15 · compétences C4.2, C4.5, C4.7, C1.1 · savoirs S5.1, S5.2, S6.2",
      mfer: "1re Bac Pro MFER — tâches A1T3, A3T1, A3T2, A5T2 · compétences C4, C7, C8, C11 · savoirs S4, S6, S7",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 5.01, 5.05, 5.06, 5.07 (charge, balance, registre) et 4.05 (relevés)"
    },
    grille: [
      ["Je me protège, je lis l'étiquette et je vérifie que le circuit est prêt (vide tenu)", { cap: "T6 · T8", mfer: "A1T3 · C4" }],
      ["Je choisis l'état du fluide, je prépare la bouteille et je note la masse de départ", { cap: "C4.2 · S5.2", mfer: "A3T1 · C7" }],
      ["Je charge en liquide en surveillant la balance PENDANT, sans dépasser la plaque", { cap: "C4.2 · C4.7 · T13", mfer: "A3T2 · C7" }],
      ["Je relève le fonctionnement : BP, HP, surchauffe, sous-refroidissement", { cap: "C4.5 · S5.1", mfer: "A3T2 · C8" }],
      ["Je pèse, je calcule la masse chargée, je trace (étiquette, fiche, registre) et je dépose", { cap: "C1.1 · T15", mfer: "A5T2 · C11" }]
    ],
    savoirEtre: "la balance dit combien, je n'estime jamais une quantité",
    exigence: {
      cap: "chaque geste juste et dans l'ordre, fluide et état vérifiés, masse de départ notée AVANT de brancher, balance surveillée pendant la charge, masse chargée = départ − fin calculée et tracée ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie l'état du fluide (liquide pour un mélange), j'explique mes relevés et je repère seul une surchauffe ou un sous-refroidissement hors fourchette."
    },
    tolerances: { pesee: 0.05, mesure: 0.05 },   /* Franck, 08/10 : 5 % sur la pesée ; les relevés ont aussi droit à une erreur de mesure */

    bilan(c) {
      const m1 = c.nb(c.releve("depart")), m2 = c.nb(c.releve("pesee-fin")), ok = !isNaN(m1) && !isNaN(m2);
      const f = c.releve("fonct", 0) ? `BP <b>${c.releve("fonct", 0)} bar</b>, HP <b>${c.releve("fonct", 1)} bar</b>, surchauffe <b>${c.releve("fonct", 4)} K</b> (attendue ${c.m.surchauffe || "…"}), sous-refroidissement <b>${c.releve("fonct", 5)} K</b> (attendu ${c.m.sousref || "…"})` : "relevés de fonctionnement à faire";
      return `Machine : <b>${c.m.fluide || "…"}</b> · plaque <b>${c.m.charge ? c.kg(c.nb(c.m.charge)) : "…"}</b> · ` +
        `masse chargée <b>${ok ? c.kg(m1 - m2) : "…"}</b> (départ ${isNaN(m1) ? "…" : c.kg(m1)} − fin ${isNaN(m2) ? "…" : c.kg(m2)}) · ${f}`;
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 1050 420",   /* sans la pompe ; à l'étape qui la montre, la vue d'ensemble s'agrandit (voir appliquer) */
      noms: { "equipment-installation": "la machine (le groupe et ses vannes de service)", "equipment-bottle": "la bouteille de fluide neuf sur sa balance",
        "equipment-manifold": "le manifold", "equipment-pump": "la pompe à vide", "equipment-vacuum": "le vacuomètre" },
      /* l'état du dessin suit l'étape : flexibles posés, vannes, robinet de la bouteille, aiguilles, masse lue sur la balance */
      appliquer(svg, e, c) {
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
        /* la pompe et le vacuomètre n'apparaissent qu'à l'étape qui met le flexible jaune hors air */
        svg.querySelectorAll("#equipment-pump, #equipment-vacuum, [data-port=pump]").forEach(g => { g.style.display = e.pompe ? "" : "none"; });
        const cadre = svg.querySelector("#scene-cadre"); if (cadre) cadre.setAttribute("height", e.pompe ? 596 : 396);
        /* vue d'ensemble de « Je m'entraîne » : le moteur remet la vue fixe au rendu suivant, on la règle juste après */
        if (e.pompe && svg.closest(".entr")) requestAnimationFrame(() => requestAnimationFrame(() => svg.setAttribute("viewBox", "0 0 1050 620")));
        ["bp", "vac", "service", "hp"].forEach(k => { const l = svg.querySelector("#svg-manifold-" + k + " .knob-line"); if (l) l.classList.toggle("ouverte", (e.manifold || []).includes(k)); });
        const pi = svg.querySelector("#svg-pump-iso"); if (pi) pi.classList.toggle("ouverte", !!e.pompeIso);
        const rb = svg.querySelector("#svg-bottle-liquid"); if (rb) rb.classList.toggle("ouverte", !!e.bouteille);
        /* vannes de service : poignée horizontale = siège arrière, quart de tour = position intermédiaire (HP = B, BP = C) */
        [["svg-service-hp", "hp"], ["svg-service-bp", "bp"]].forEach(([id, k]) => { const l = svg.querySelector("#" + id); if (l) l.style.transform = (e.vannes || []).includes(k) ? "rotate(90deg)" : "none"; });
        /* aiguilles, sans chiffres sur le cadran : repères indicatifs (0 bar, égalisation à la charge, relevés de l'élève en marche) */
        const lu = (k, d) => { const v = c.nb(c.releve("fonct", k)); return isNaN(v) ? d : v; };
        const [bp, hp] = { zero: [0, 0], egal: [6, 6], marche: [lu(0, 2), lu(1, 14)] }[e.aiguilles || "zero"];
        const angBP = Math.max(-127, Math.min(127, -127 + (bp + 1) * 254 / 13)), angHP = Math.max(-127, Math.min(127, -127 + hp * 254 / 30));
        const n1 = svg.querySelector("#needle-bp"), n2 = svg.querySelector("#needle-hp");
        if (n1) n1.style.transform = "rotate(" + (angBP + 20) + "deg)";     /* l'aiguille dessinée pointe à -20° (BP) et +20° (HP) */
        if (n2) n2.style.transform = "rotate(" + (angHP - 20) + "deg)";
        /* la balance : la dernière masse notée jusqu'à l'étape en cours */
        const b = svg.querySelector("#svg-balance"); if (!b) return;
        const ordre = ["depart", "charge-hp", "fin-marche", "pesee-fin"], jusque = ordre.indexOf(e.balance);
        const v = jusque < 0 ? "" : ordre.slice(0, jusque + 1).reverse().map(id => c.releve(id)).find(x => x !== undefined && x !== "");
        b.textContent = v ? c.kg(c.nb(v)) : "…";
      }
    },

    etapes: [
      { id: "securite", verbe: "Je me protège et je lis l'étiquette", cadre: ["equipment-bottle"], cible: "equipment-bottle",
        regarde: "La bouteille neuve, son étiquette, ses pictogrammes.",
        fais: "Lunettes et gants. Je lis sur l'étiquette le fluide et sa classe de sécurité. La fiche de données de sécurité (FDS) est à portée de main.",
        voir: "EPI sur moi ; le fluide et la classe de sécurité lus à voix haute.",
        danger: "Le fluide liquide brûle par le froid. Classe A2L ou A3 : inflammable, ni flamme ni étincelle.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["lunettes et gants portés", "fluide lu sur l'étiquette de la bouteille", "classe de sécurité lue (A1, A2L, A2, A3, B…)", "FDS à portée de main", "ni flamme ni source de chaleur près du poste"],
          ok: "Je suis protégé et je connais le fluide que je manipule.",
          manque: "Il manque une coche : je ne touche pas à la bouteille avant." } },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "equipment-installation",
        regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
        fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
        voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "circuit-pret", verbe: "Je vérifie que le circuit est prêt", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
        tuyaux: ["blue", "red"],
        regarde: "Le groupe, le manifold posé, mon relevé de la gare 5.",
        fais: "Le circuit est sous vide et a passé le test de remontée. Les 4 vannes du manifold sont fermées. Sans vide tenu, je ne charge pas.",
        voir: "Test de remontée bon, vide gardé, manifold fermé.",
        danger: "Un circuit qui n'a pas tenu le vide fuit encore : le fluide neuf partirait dans l'air.",
        controle: { titre: "Le circuit est sous vide et le test de remontée était bon ?", type: "ouinon",
          oui: "Circuit prêt : je peux préparer la charge.",
          non: "STOP : sans vide tenu, on ne charge pas. Retour à la gare 5 (tirage au vide), j'appelle le professeur." } },

      { id: "plaque", verbe: "Je lis la plaque et l'étiquette", cadre: ["equipment-installation", "equipment-bottle"], cible: "equipment-installation",
        tuyaux: ["blue", "red"],
        regarde: "La plaque de la machine, l'étiquette de la bouteille.",
        fais: "Je lis sur la plaque le fluide et la charge, et je les écris dans « Ma machine ». Puis je lis à voix haute le fluide écrit sur la bouteille.",
        voir: "Le même fluide sur la plaque et sur la bouteille.",
        danger: "Un mauvais fluide dans une machine : on la vide entièrement et on recommence.",
        controle: { titre: "Fluide écrit sur la bouteille", champs: [{ texte: true }],
          juger(v, c) {
            if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            if (!c.egal(v[0], c.m.fluide)) return ["rouge", "STOP : la bouteille porte " + v[0] + ", la machine " + c.m.fluide + ". Je ne branche pas, j'appelle le professeur."];
            const ch = c.nb(c.m.charge);
            return ["vert", "Même fluide que la machine (" + c.m.fluide + ")." + (isNaN(ch) ? " J'écris aussi la charge de la plaque dans « Ma machine »." : " Charge à introduire : " + c.kg(ch) + ".")];
          } } },

      { id: "etat-fluide", verbe: "Je choisis l'état du fluide", cadre: ["equipment-bottle"], cible: "equipment-bottle",
        regarde: "L'étiquette : tube plongeur ou non, robinet LIQUIDE.",
        fais: "Liquide ou vapeur ? Un mélange de la série R-4xx se charge TOUJOURS en liquide. Bouteille debout si elle a un tube plongeur, retournée sinon : l'étiquette le dit.",
        voir: "Le fluide, son état et la position de la bouteille, décidés avec l'étiquette.",
        danger: "En vapeur, un mélange change de composition : la machine ne marchera plus comme prévu.",
        controle: { titre: "Comment le fluide sort de ma bouteille", type: "choix",
          options: ["Liquide, bouteille debout (tube plongeur)", "Liquide, bouteille retournée (sans tube plongeur)", "Vapeur"],
          juger(v, c) {
            const f = c.m.fluide; if (!f) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            if (v[0] === 2) return zeotrope(f)
              ? ["rouge", "STOP : " + f + " est un mélange (série R-4xx) : toujours en liquide. En vapeur, sa composition change."]
              : ["ambre", "Vapeur : possible pour un fluide pur, mais cette charge se fait en liquide, machine à l'arrêt. J'en parle au professeur."];
            return ["vert", (zeotrope(f) ? f + " est un mélange : liquide, c'est cohérent." : "Liquide : c'est cohérent.") +
              " La position doit être celle de l'étiquette : le professeur le confirme au point d'arrêt."];
          } } },

      { id: "depart", verbe: "Je place la bouteille et je la pèse", cadre: ["equipment-bottle"], cible: "equipment-bottle", balance: "depart",
        regarde: "La balance : à plat, allumée, en kg.",
        fais: "Bouteille sur la balance, dans la position choisie, bien calée, rien d'autre dessus. J'attends un chiffre stable : c'est la masse de départ. Si je tare, c'est 0.",
        voir: "Un chiffre qui ne bouge plus, noté avant tout branchement.",
        danger: "Une balance qui penche ou qui bouge fausse tout : bouteille calée, balance à plat.",
        controle: { titre: "Masse de départ", champs: [{ unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[0]), ch = c.nb(c.m.charge);
            if (isNaN(x)) return ["ambre", "J'écris un nombre, par exemple 12,40."];
            if (x < 0) return ["rouge", "Une masse de départ ne peut pas être négative : la balance est-elle à plat, la bouteille bien posée ? Je recommence la pesée."];
            if (x === 0) return ["vert", "Balance tarée : la masse de départ est 0. Pendant la charge, elle affichera des valeurs négatives (−" + (isNaN(ch) ? "…" : c.fr(ch)) + " à la plaque)."];
            if (!isNaN(ch) && x < ch) return ["ambre", "Moins que la charge de la plaque (" + c.kg(ch) + ") : la bouteille ne contient pas assez de fluide. J'appelle le professeur."];
            return ["vert", "Masse de départ notée : " + c.kg(x) + "." + (isNaN(ch) ? "" : " À la plaque, la balance affichera environ " + c.kg(x - ch) + ".")];
          } } },

      { id: "raccorder", verbe: "Je raccorde le flexible jaune", cadre: ["equipment-installation", "equipment-manifold", "equipment-bottle"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], balance: "depart",
        regarde: "Le manifold, le robinet LIQUIDE de la bouteille.",
        fais: "Bleu et rouge sont déjà sur la BP et la HP. Jaune : de la voie SERVICE du manifold au robinet LIQUIDE de la bouteille, fermé. Serrage à la main, joint propre.",
        voir: "Trois flexibles serrés, bouteille fermée, 4 vannes du manifold fermées.",
        danger: "Robinet de la bouteille FERMÉ pendant le raccordement : le liquide jaillirait." },

      { id: "vide-flexible", verbe: "Je tire au vide le flexible jaune", cadre: ["equipment-manifold", "equipment-pump", "equipment-vacuum", "equipment-bottle"], cible: "equipment-pump",
        tuyaux: ["blue", "red", "yellow", "black"], pompe: true, pompeIso: true, manifold: ["vac", "service"], balance: "depart",
        regarde: "Le vacuomètre.",
        fais: "Je rebranche la pompe sur la voie VIDE. Bouteille et vannes de service fermées : j'ouvre VIDE et SERVICE, pompe en route. Cible du poste atteinte : je ferme, puis j'arrête la pompe.",
        voir: "Le vacuomètre atteint la cible du poste et ne remonte pas.",
        danger: "Je ferme AVANT d'arrêter la pompe : sinon l'air revient dans le flexible.",
        controle: { titre: "Le vacuomètre a atteint la cible et tient ?", type: "ouinon",
          oui: "Flexible sans air : rien d'autre que du fluide neuf n'entrera dans le circuit.",
          non: "Le vide ne tient pas : un raccord fuit. Je resserre et je recommence ; sinon j'appelle le professeur." } },

      { id: "charge-hp", verbe: "J'ouvre la bouteille et je charge par la HP", cadre: ["equipment-installation", "equipment-manifold", "equipment-bottle"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], manifold: ["service", "hp"], vannes: ["hp"], bouteille: true, aiguilles: "egal", balance: "charge-hp",
        regarde: "La balance, pendant toute la charge.",
        fais: "Machine à l'ARRÊT. J'ouvre le robinet LIQUIDE, puis SERVICE et HP au manifold (vanne de service HP décollée). Le liquide entre. Je lis la balance PENDANT, jusqu'à l'équilibre.",
        voir: "La masse de la bouteille DIMINUE, puis se stabilise quand les pressions s'égalisent.",
        danger: "Jamais plus que la charge de la plaque. Je surveille la balance tout le temps : à la plaque, je ferme.",
        controle: { titre: "Masse lue pendant la charge", champs: [{ unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[0]), m1 = c.nb(c.releve("depart")), ch = c.nb(c.m.charge), t = c.tol.pesee;
            if (isNaN(x)) return ["ambre", "J'écris un nombre, en kg."];
            if (isNaN(m1)) return ["ambre", "Je n'ai pas noté la masse de départ : je ne peux pas savoir combien je charge."];
            if (x >= m1) return ["ambre", "La masse ne baisse pas : le robinet est-il ouvert, le chemin est-il ouvert jusqu'au manifold ? Une masse qui monte, c'est un flexible mal branché."];
            const d = m1 - x;
            if (ch && d > ch * (1 + t)) return ["rouge", "STOP : déjà " + c.kg(d) + " chargés, plus que la plaque (" + c.kg(ch) + "). Je ferme la bouteille et j'appelle le professeur."];
            if (!ch) return ["vert", "Déjà " + c.kg(d) + " chargés. J'écris la charge de la plaque dans « Ma machine » pour comparer."];
            return ["vert", "Déjà " + c.kg(d) + " chargés. " + (d >= ch * (1 - t) ? "La plaque est atteinte à 5 % près : je ferme la bouteille." : "Il reste " + c.kg(ch - d) + " pour atteindre la plaque.")];
          } },
        arret: "Le professeur a vérifié le montage, le fluide et l'état choisi, avant l'ouverture de la bouteille." },

      { id: "fin-marche", verbe: "Je termine la charge en marche, par la BP", cadre: ["equipment-installation", "equipment-manifold", "equipment-bottle"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], manifold: ["service", "bp"], vannes: ["hp", "bp"], bouteille: true, aiguilles: "marche", balance: "fin-marche",
        regarde: "La balance et l'aiguille BP.",
        fais: "Charge pas finie ? Je ferme la vanne HP du manifold. Le professeur est là : je démarre la machine. Vanne de service BP décollée, j'ouvre un peu la vanne BP : petite quantité à la fois.",
        voir: "La masse baisse doucement ; la BP ne monte pas d'un coup ; rien ne claque au compresseur.",
        danger: "Du liquide franc dans le compresseur le casse. Le fluide entre en filet, laminé, jamais d'un coup.",
        controle: { titre: "Masse lue en fin de charge (la même qu'avant si la plaque était atteinte)", champs: [{ unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[0]), m1 = c.nb(c.releve("depart")), av = c.nb(c.releve("charge-hp")), ch = c.nb(c.m.charge), t = c.tol.pesee;
            if (isNaN(x)) return ["ambre", "J'écris un nombre, en kg."];
            if (isNaN(m1) || isNaN(av)) return ["ambre", "Il me manque la masse de départ ou la masse lue pendant la charge : je ne peux pas comparer."];
            if (x > av + RES) return ["ambre", "La masse remonte par rapport à tout à l'heure (" + c.kg(av) + ") : je relis la balance, elle doit seulement baisser."];
            const d = m1 - x;
            if (ch && d > ch * (1 + t)) return ["rouge", "STOP : " + c.kg(d) + " chargés, plus que la plaque (" + c.kg(ch) + "). Je ferme la bouteille et j'appelle le professeur."];
            if (!ch) return ["vert", "Chargé jusque-là : " + c.kg(d) + ". J'écris la charge de la plaque dans « Ma machine » pour comparer."];
            if (d >= ch * (1 - t)) return ["vert", "Chargé " + c.kg(d) + " pour " + c.kg(ch) + " sur la plaque : la charge est complète à 5 % près. Je m'arrête et je ferme la bouteille."];
            return Math.abs(x - av) <= RES
              ? ["ambre", "La masse n'a pas bougé et il manque " + c.kg(ch - d) + " pour la plaque. Le robinet est-il ouvert ? Je continue par petites quantités ou j'appelle le professeur."]
              : ["vert", "Chargé " + c.kg(d) + ", il reste " + c.kg(ch - d) + " pour la plaque. Je continue par petites quantités."];
          } },
        arret: "Le professeur a vérifié la HP fermée et m'autorise à démarrer la machine, avant la fin de charge en marche." },

      { id: "pesee-fin", verbe: "Je ferme la bouteille et je repèse", cadre: ["equipment-bottle"], cible: "equipment-bottle",
        tuyaux: ["yellow"], manifold: [], bouteille: false, balance: "pesee-fin",
        regarde: "La balance, robinet de la bouteille fermé.",
        fais: "Je ferme le robinet de la bouteille, puis SERVICE et BP au manifold. La balance se stabilise, je note la masse. Masse chargée = masse de départ − masse de fin.",
        voir: "Départ − fin = la masse chargée, comparée à la plaque.",
        controle: { titre: "Masse de fin", champs: [{ unite: "kg" }],
          juger(v, c) {
            const x = c.nb(v[0]), m1 = c.nb(c.releve("depart")), ch = c.nb(c.m.charge), t = c.tol.pesee;
            if (isNaN(x)) return ["ambre", "J'écris un nombre, en kg."];
            if (isNaN(m1)) return ["ambre", "Pas de masse de départ : la masse chargée n'existe pas. J'appelle le professeur."];
            const d = m1 - x;
            if (d <= 0) return ["rouge", "La masse de fin n'est pas plus basse que celle de départ : une bouteille qui charge se vide. Je repèse, bouteille seule et stable."];
            const kp = z => (z < 0 ? "(" + c.kg(z) + ")" : c.kg(z));   /* balance tarée : une masse négative se lit entre parenthèses */
            const calc = "Masse chargée = " + kp(m1) + " − " + kp(x) + " = " + c.kg(d) + ".";
            if (!ch) return ["vert", calc + " (J'écris la charge de la plaque dans « Ma machine » pour comparer.)"];
            if (d < ch * (1 - t)) return ["ambre", calc + " La plaque dit " + c.kg(ch) + " : il manque " + c.kg(ch - d) + ". Complément de charge, ou pesée à refaire ? J'en parle au professeur."];
            if (d > ch * (1 + t)) return ["ambre", calc + " Plus que la plaque (" + c.kg(ch) + ") : machine trop chargée, ou masse de départ fausse ? J'appelle le professeur avant de tracer."];
            return ["vert", calc + " Cohérent avec " + c.kg(ch) + " sur la plaque, à 5 % près. Je reporte " + c.kg(d) + " sur la fiche."];
          } },
        arret: "Le professeur a vérifié la pesée finale et mon calcul." },

      { id: "fonct", verbe: "Je vérifie le fonctionnement", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "yellow"], manifold: [], vannes: ["hp", "bp"], aiguilles: "marche", balance: "pesee-fin",
        regarde: "BP, HP, et les deux températures à la pince.",
        fais: "Machine en marche, régime stable. Je lis BP et HP. Pince sur la ligne d'aspiration, puis sur la ligne liquide (sortie condenseur). Avec la table du fluide, je calcule les deux écarts.",
        voir: "HP au-dessus de BP ; surchauffe et sous-refroidissement dans les fourchettes du poste.",
        danger: "Surchauffe nulle : du liquide revient au compresseur. J'arrête et j'appelle le professeur.",
        controle: { titre: "Mes relevés et mes deux calculs", champs: [
            { label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }, { label: "T° aspiration", unite: "°C" }, { label: "T° liquide", unite: "°C" },
            { label: "Surchauffe", unite: "K" }, { label: "Sous-refroid.", unite: "K" }],
          juger(v, c) {
            const [bp, hp, ta, tl, sh, sr] = v.map(c.nb), t = c.tol.mesure;
            if (v.some((x, k) => isNaN(c.nb(x)))) return ["ambre", "J'écris six nombres : BP et HP (bar), les deux températures (°C), puis mes deux calculs (K)."];
            if (hp <= bp) return ["rouge", "La HP est plus basse que la BP : en marche, c'est impossible. Flexibles inversés, ou machine arrêtée ? Je vérifie bleu = BP, rouge = HP."];
            const f = c.m.fluide, pSH = plage(c.m.surchauffe), pSR = plage(c.m.sousref);
            if (!f) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
            if (!pSH || !pSR) return ["ambre", "J'écris d'abord les fourchettes de surchauffe et de sous-refroidissement données par le professeur dans « Ma machine »."];
            const tev = tsat(f, bp, "rosee"), tco = tsat(f, hp, "bulle");
            if (tev === null || tco === null) return ["ambre", "Pas de table pour " + f + " à ces pressions dans la gare : je prends la table du poste et je demande au professeur de vérifier mes deux calculs."];
            const shRef = ta - tev, srRef = tco - tl;
            const p = x => (x < 0 ? "(" + c.fr(x, 1) + ")" : c.fr(x, 1));   /* un nombre négatif se lit entre parenthèses */
            const calc = "Surchauffe : " + p(ta) + " − " + p(tev) + " (rosée à la BP) = " + c.fr(shRef, 1) + " K. Sous-refroidissement : " + p(tco) + " (bulle à la HP) − " + p(tl) + " = " + c.fr(srRef, 1) + " K.";
            if (shRef <= 0) return ["rouge", "STOP : surchauffe nulle ou négative (" + c.fr(shRef, 1) + " K) : du liquide peut revenir au compresseur. J'arrête et j'appelle le professeur. " + calc];
            if (!c.proche(sh, shRef, t, 1) || !c.proche(sr, srRef, t, 1)) return ["ambre", "Mes calculs ne correspondent pas aux relevés. " + calc + " Je refais mes deux soustractions."];
            if (!dedans(sh, pSH, t)) return ["ambre", "Surchauffe " + c.fr(sh, 1) + " K, attendue de " + pSH[0] + " à " + pSH[1] + " K : " + (sh > pSH[1] ? "trop haute, plutôt un manque de fluide." : "trop basse, plutôt un excès de fluide ou du liquide qui revient.") + " J'en parle au professeur."];
            if (!dedans(sr, pSR, t)) return ["ambre", "Sous-refroidissement " + c.fr(sr, 1) + " K, attendu de " + pSR[0] + " à " + pSR[1] + " K : " + (sr < pSR[0] ? "trop bas, plutôt un manque de fluide." : "trop haut, plutôt un excès de fluide.") + " J'en parle au professeur."];
            return ["vert", "Cohérent : HP > BP, surchauffe " + c.fr(sh, 1) + " K (attendue " + pSH[0] + " à " + pSH[1] + "), sous-refroidissement " + c.fr(sr, 1) + " K (attendu " + pSR[0] + " à " + pSR[1] + "). " + calc];
          } } },

      { id: "trace", verbe: "J'étiquette et je trace", cadre: ["equipment-installation"], cible: "equipment-installation", balance: "pesee-fin",
        regarde: "L'installation, la fiche d'intervention, le registre.",
        fais: "Étiquette de l'installation à jour : fluide, charge, date. Fiche d'intervention (CERFA) et registre : la masse chargée vient de MA pesée, jamais d'une estimation.",
        voir: "Étiquette, fiche et registre remplis avec la même masse.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["étiquette de l'installation à jour (fluide, masse chargée, date)", "fiche d'intervention (CERFA) : masse chargée reportée depuis la pesée", "registre : date, quantité ajoutée, intervenant", "la même masse partout : étiquette, fiche, registre"],
          ok: "Charge tracée : un geste non consigné n'existe pas.",
          manque: "Il manque une coche : la charge n'est pas tracée, je ne quitte pas le poste." } },

      { id: "depose", verbe: "Je dépose et je remets tout comme trouvé", cadre: ["equipment-installation", "equipment-manifold", "equipment-bottle"], cible: "equipment-installation",
        tuyaux: [], balance: "pesee-fin",
        regarde: "Les flexibles, les vannes de service, les capuchons.",
        fais: "Comme en gare 3, machine en marche : le compresseur aspire le jaune (bouteille fermée), puis le HP, jusqu'à juste avant 0 bar, jamais en dessous. Puis vannes au siège arrière, capuchons remis.",
        voir: "Flexibles vides, vannes au siège arrière, capuchons et bouchons en place, rien d'abîmé.",
        danger: "Sous 0 bar, de l'air peut rentrer dans le circuit : je ferme juste avant.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["jaune aspiré (bouteille fermée), puis flexible HP aspiré, jusqu'à juste avant 0 bar", "vannes de service au siège arrière", "capuchons de tige et bouchons de prise remis, serrés", "bouteille fermée, bouchonnée, debout au rack, étiquetée", "poste comme je l'ai trouvé : rien d'abîmé, rien qui manque"],
          ok: "Tout est remis comme je l'ai trouvé. Je note le résultat dans « Ma trace ».",
          manque: "Il manque une coche : je ne quitte pas le poste avant." } }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { fluide: "R-449A", charge: "2,4", surchauffe: "5 à 10", sousref: "3 à 8" },
      charge: { plaque: ["R449A"], "etat-fluide": ["0"], depart: ["12,00"], "charge-hp": ["10,50"], "fin-marche": ["9,60"], "pesee-fin": ["9,60"],
        fonct: ["2,5", "17", "-3", "33", "7,7", "5,6"] }
    }
  };
})();
