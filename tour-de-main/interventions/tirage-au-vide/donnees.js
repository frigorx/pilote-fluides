/* =====================================================================
   Gare 5 — TIRER AU VIDE ET TESTER LA REMONTÉE (ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · packs/fluides/res/chaine-intervention-interactive (ordre : pompe contrôlée, vacuomètre côté circuit,
     chemin ouvert, vide, isoler AVANT d'arrêter la pompe) et recuperation-fluide-interactive (phase 8,
     « le vacuomètre contrôle le vide poussé, les aiguilles du manifold ne le remplacent pas ») ;
   · la fiche de Franck « ressource tirage au vide » (huile de la pompe, procédure, « le tirage au vide n'est
     en aucun cas une vérification de l'étanchéité ») et le TD « Pose manifold / tirage au vide » ;
   · le TP 10 de 1re MFER « Le tirage au vide et sa preuve » (test de remontée : stable = bon ; remonte puis
     palier = humidité ; remonte sans s'arrêter = fuite) ;
   · la planche tirage-au-vide_courbes-remontee.svg (les trois formes de courbe).
   Aucune valeur universelle de vide, de durée ni de remontée : « la cible du poste », « la valeur du professeur ».
   ===================================================================== */
(function () {
  /* Le test de remontée : trois relevés (départ, moitié, fin) et la forme qu'ils dessinent.
     1 = tient (remontée ≤ remontée admise, à l'erreur de mesure près) ;
     2 = remonte puis s'arrête (la 2e moitié monte moins de la moitié de la 1re) = humidité ;
     3 = remonte sans s'arrêter = fuite. */
  const FORMES = { 1: "elle reste stable", 2: "elle remonte puis s'arrête", 3: "elle remonte sans s'arrêter" };
  function remontee(c, saisie) {
    const v = [0, 1, 2].map(k => c.nb(saisie ? saisie[k] : c.releve("remontee", k)));
    const adm = c.nb(c.m.remontee);
    if (v.some(isNaN)) return { manque: "releves" };
    if (isNaN(adm)) return { manque: "admise" };
    const r = v[2] - v[0], r1 = v[1] - v[0], r2 = v[2] - v[1];
    const forme = (r <= adm || c.proche(r, adm, c.tol.mesure)) ? 1 : (r2 < r1 / 2 ? 2 : 3);
    return { v, adm, r, forme };
  }
  const n = (c, x) => c.fr(x, Math.abs(x) < 10 ? 2 : Math.abs(x) < 100 ? 1 : 0);   /* 0,45 · 12,5 · 480 */
  const u = c => (c.m.unite ? " " + c.m.unite : "");

  window.GARE = {
    id: "tirage-au-vide",
    titre: "Tirer au vide et tester la remontée",
    sousTitre: "Les interventions de base · gare 5 · pompe, vacuomètre, test de remontée",
    parcours: ["azote"],
    parcoursNoms: { azote: { nom: "Circuit vide de fluide", aide: "après l'épreuve d'azote, avant la charge" } },
    machine: [
      { id: "cible", label: "Cible de vide du poste (donnée par le professeur)", court: "Cible de vide", exemple: "donnée par le professeur", nombre: true },
      { id: "unite", label: "Unité du vacuomètre du poste", court: "Unité", exemple: "mbar, Pa ou micron", texte: true },
      { id: "duree", label: "Durée du test de remontée (donnée par le professeur)", court: "Durée du test", unite: "min", exemple: "donnée par le professeur", nombre: true },
      { id: "remontee", label: "Remontée admise pendant le test (même unité que le vacuomètre)", court: "Remontée admise", exemple: "donnée par le professeur", nombre: true }
    ],
    /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
    codes: {
      cap: "CAP IFCA — tâches T6, T8, T13 · compétences C4.1, C4.5, C4.7 · savoirs S5.5, S6.2",
      mfer: "1re Bac Pro MFER — tâches A1T3, A3T1, A5T2 · compétences C2, C4, C7 · savoirs S4, S6, S7",
      commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 3.03 (utiliser une pompe à vide) et 3.04 (faire le vide pour évacuer l'air et l'humidité)"
    },
    grille: [
      ["Je me protège, je contrôle la pompe (huile, lest) et le manifold", { cap: "T6 · T8", mfer: "A1T3 · C4" }],
      ["Je branche : pompe sur la voie VIDE, vacuomètre côté circuit, vannes dans l'ordre", { cap: "C4.7", mfer: "A3T1 · C7" }],
      ["Je tire au vide jusqu'à la cible lue au vacuomètre, et j'isole avant d'arrêter la pompe", { cap: "C4.1 · T13", mfer: "A3T1 · C7" }],
      ["Je fais le test de remontée, je lis la courbe et je décide", { cap: "C4.5", mfer: "A3T1 · C2" }],
      ["Je range, je remets tout comme trouvé et je trace", { cap: "T6", mfer: "A5T2 · C4" }]
    ],
    savoirEtre: "j'écris ce que je lis, même quand le résultat est mauvais",
    exigence: {
      cap: "chaque geste juste et dans l'ordre, la cible lue au vacuomètre, le circuit isolé avant l'arrêt de la pompe, la courbe bien lue ; le professeur peut guider aux points d'arrêt.",
      mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie le vacuomètre côté circuit et l'ordre d'arrêt, et je décide seul : bon, humidité ou fuite."
    },
    tolerances: { pesee: 0.05, mesure: 0.05 },   /* Franck, 08/10 : tout relevé a droit à une erreur de mesure */

    bilan(c) {
      const r = remontee(c), d = c.nb(c.releve("descente"));
      return `Cible du poste <b>${c.m.cible || "…"}${u(c)}</b> · vide atteint <b>${isNaN(d) ? "…" : n(c, d) + u(c)}</b> · ` +
        (r.v ? `test de ${c.m.duree || "…"} min : départ <b>${n(c, r.v[0])}</b>, fin <b>${n(c, r.v[2])}</b> → remontée <b>${n(c, r.r)}${u(c)}</b> pour <b>${c.m.remontee || "…"}</b> admis · forme <b>${r.forme}</b> (${FORMES[r.forme]})`
          : "test de remontée : relevés à faire");
    },

    dessin: {
      fichier: "dessin.svg",
      vue: "0 0 710 620",
      noms: { "equipment-installation": "la machine (le groupe et son circuit)", "vannes-service": "les vannes de service (A, B et C)",
        "equipment-manifold": "le manifold", "equipment-pump": "la pompe à vide", "equipment-vacuum": "le vacuomètre" },
      /* l'état du dessin suit l'étape : flexibles posés, vannes du manifold, vannes de service, aiguilles, valeur du vacuomètre */
      appliquer(svg, e, c) {
        svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
        (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
        const mv = svg.querySelector('[data-mini-for="vac"]'); if (mv) mv.classList.toggle("connected", (e.tuyaux || []).includes("vac"));
        /* vannes du manifold et isolement de la pompe : poignée tournée = ouverte */
        ["bp", "vac", "service", "hp"].forEach(k => { const l = svg.querySelector("#svg-manifold-" + k + " .knob-line"); if (l) l.classList.toggle("ouverte", (e.manifold || []).includes(k)); });
        const pi = svg.querySelector("#svg-pump-iso"); if (pi) pi.classList.toggle("ouverte", !!e.pompeIso);
        const mi = svg.querySelector("#svg-mini-vac"); if (mi) mi.style.transform = "rotate(90deg)";   /* poignée dans le sens du flexible = ouverte, pendant tout le geste */
        /* vannes de service : poignée horizontale = siège arrière, tournée d'un quart de tour = position intermédiaire */
        ["svg-service-discharge", "svg-service-hp", "svg-service-bp"].forEach(id => { const l = svg.querySelector("#" + id); if (l) l.style.transform = e.vannes === "mid" ? "rotate(90deg)" : "none"; });
        /* aiguilles du manifold : 0 bar, ou -1 bar (en bas de l'échelle) quand le vide est fait ; elles ne remplacent pas le vacuomètre */
        const bp = e.aiguilles === "vide" ? -1 : 0, hp = e.aiguilles === "vide" ? -1 : 0;
        const angBP = Math.max(-127, Math.min(127, -127 + (bp + 1) * 254 / 13)), angHP = Math.max(-127, Math.min(127, -127 + hp * 254 / 30));
        const n1 = svg.querySelector("#needle-bp"), n2 = svg.querySelector("#needle-hp");
        if (n1) n1.style.transform = "rotate(" + (angBP + 20) + "deg)";     /* l'aiguille dessinée pointe à -20° (BP) et +20° (HP) */
        if (n2) n2.style.transform = "rotate(" + (angHP - 20) + "deg)";
        /* la planche des trois courbes (à droite du poste) ne se montre qu'à l'étape de lecture, au poste */
        const lect = e.id === "lecture" && !svg.closest(".entr");
        const cb = svg.querySelector("#courbes"); if (cb) cb.style.display = lect ? "" : "none";
        /* à ce moment-là, seule la planche reste à l'écran : les appareils et les flexibles s'effacent */
        ["#equipment-installation", "#equipment-manifold", "#equipment-pump", "#equipment-vacuum", ".hoses", ".direct-controls", "symbol > rect"].forEach(q => { const g = svg.querySelector(q); if (g) g.style.display = lect ? "none" : ""; });
        /* le vacuomètre : la valeur lue (dernière valeur du test si on est au test), puis son unité */
        const vu = svg.querySelector("#svg-vacuum"), un = svg.querySelector("#svg-vacuum-unit");
        let lu = "";
        if (e.vac === "descente") lu = c.releve("descente");
        if (e.vac === "remontee") lu = [2, 1, 0].map(k => c.releve("remontee", k)).find(Boolean) || c.releve("descente");
        if (vu) vu.textContent = lu ? String(lu) : "—";
        if (un) un.textContent = lu && c.m.unite ? c.m.unite : "MESURE DU VIDE";
      }
    },

    etapes: [
      { id: "securite", verbe: "Je sécurise le poste", cadre: ["equipment-installation"], cible: "equipment-installation",
        tuyaux: ["blue", "red"],
        regarde: "La machine, sa prise, la pompe et son câble.",
        fais: "Lunettes et gants. Machine arrêtée et consignée. Pompe sur une prise contrôlée, câble hors passage.",
        voir: "Machine consignée, câble de la pompe hors passage, EPI sur moi.",
        danger: "La pompe chauffe et peut projeter de l'huile : je ne la déplace pas en marche." },

      /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
      { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "equipment-installation",
        tuyaux: ["blue", "red"],
        regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
        fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
        voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
          ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
          manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

      { id: "pompe", verbe: "Je contrôle la pompe à vide", cadre: ["equipment-pump"], cible: "equipment-pump",
        tuyaux: ["blue", "red"],
        regarde: "Le hublot d'huile et la soupape de lest d'air.",
        fais: "Pompe arrêtée, à plat. Niveau d'huile entre les repères du hublot, huile claire. Lest d'air selon la notice.",
        voir: "Une huile claire, au niveau ; le lest dans la position de la notice.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["huile au niveau, entre les repères du hublot", "huile claire, pas laiteuse", "lest d'air dans la position de la notice", "câble et prise en bon état"],
          ok: "Pompe prête : elle pourra tirer au vide.",
          manque: "Huile basse ou laiteuse, ou lest mal placé : la pompe ne tirera pas bien. J'appelle le professeur." } },

      { id: "manifold", verbe: "Je vérifie le manifold hors air", cadre: ["equipment-manifold"], cible: "equipment-manifold",
        tuyaux: ["blue", "red"], aiguilles: "zero",
        regarde: "Les 4 vannes, les aiguilles, les joints.",
        fais: "Le manifold est posé sur les vannes de service, flexibles hors air (gare 2). Je ferme les 4 vannes du manifold.",
        voir: "4 vannes fermées, aiguilles sur 0, joints propres.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["manifold posé, flexibles hors air", "4 vannes du manifold fermées", "aiguilles sur 0 : plus de pression d'azote", "un joint propre dans chaque flexible"],
          ok: "Manifold prêt à recevoir la pompe.",
          manque: "Il manque une coche, ou une aiguille ne revient pas à 0 : il reste de la pression. J'appelle le professeur." } },

      { id: "branche-pompe", verbe: "Je branche la pompe sur la voie VIDE", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-pump",
        tuyaux: ["blue", "red", "black"], aiguilles: "zero",
        regarde: "Le flexible noir, entre le manifold et la pompe.",
        fais: "Flexible de vide court et de gros diamètre : voie VIDE du manifold → pompe, serré à la main. Sur un 2 voies : la pompe va sur le jaune.",
        voir: "La pompe est reliée à la voie VIDE (au jaune sur un 2 voies), raccord serré." },

      { id: "vacuometre", verbe: "Je place le vacuomètre", cadre: ["equipment-installation", "equipment-vacuum", "zone-vide"], cible: "equipment-vacuum",
        tuyaux: ["blue", "red", "black", "vac"], aiguilles: "zero", vac: "rien",
        regarde: "Le vacuomètre, son flexible, sa vanne d'isolement.",
        fais: "Je le raccorde au plus près du circuit (sur le dessin : la vanne A), pas collé à la pompe. Sa vanne d'isolement est ouverte. Je l'allume.",
        voir: "Le vacuomètre est allumé : c'est lui qui donne le vide, pas les aiguilles.",
        controle: { titre: "Je coche ce que j'ai vu", type: "coches",
          items: ["pompe sur la voie VIDE du manifold (sur un 2 voies : sur le jaune)", "vacuomètre au plus près du circuit, pas collé à la pompe", "vanne d'isolement du vacuomètre ouverte", "vacuomètre allumé, dans l'unité de la cible du poste"],
          ok: "Montage prêt : la pompe tire, le vacuomètre mesure.",
          manque: "Il manque une coche : je ne démarre rien avant." } },

      { id: "vannes-service", verbe: "Je décolle les vannes de service", cadre: ["equipment-installation"], cible: "vannes-service",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", aiguilles: "zero", vac: "rien",
        regarde: "Les vannes de service A, B et C du groupe.",
        fais: "Je décolle chaque vanne de service du siège arrière : position intermédiaire, sans forcer.",
        voir: "Les trois vannes sont décollées : le circuit est relié au manifold et au vacuomètre.",
        arret: "Le professeur a vérifié le montage et les vannes, avant l'ouverture des voies et la mise en route de la pompe." },

      /* TP 10 de Franck : la pompe démarre isolement fermé (elle part sans charge), puis on ouvre les voies. */
      { id: "marche", verbe: "Je mets la pompe en route", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-pump",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", manifold: [], pompeIso: false, aiguilles: "zero", vac: "rien",
        regarde: "L'isolement de la pompe, son interrupteur.",
        fais: "Isolement de la pompe fermé, vannes du manifold fermées. Interrupteur sur marche : la pompe démarre à vide.",
        voir: "La pompe tourne sans à-coup ; les aiguilles du manifold ne bougent pas encore.",
        danger: "Je ne me penche pas sur le bouchon de refoulement : la pompe peut projeter de l'huile." },

      { id: "voies", verbe: "J'ouvre les voies", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", manifold: ["bp", "hp", "vac"], pompeIso: true, aiguilles: "vide", vac: "rien",
        regarde: "L'isolement de la pompe, les vannes VIDE, BP et HP du manifold.",
        fais: "Pompe en route, j'ouvre l'isolement de la pompe, puis VIDE, BP et HP sur le manifold. SERVICE reste fermée.",
        voir: "Les aiguilles du manifold descendent vers le vide ; puis le vacuomètre prend le relais." },

      { id: "descente", verbe: "Je tire au vide jusqu'à la cible", cadre: ["equipment-installation", "equipment-vacuum", "zone-vide"], cible: "equipment-vacuum",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", manifold: ["bp", "hp", "vac"], pompeIso: true, aiguilles: "vide", vac: "descente",
        regarde: "L'afficheur du vacuomètre, pas le manifold.",
        fais: "Je laisse tourner. Je lis le vacuomètre, jamais les aiguilles du manifold. Je continue jusqu'à la cible du poste.",
        voir: "Le chiffre du vacuomètre descend jusqu'à la cible du poste.",
        controle: { titre: "Vide lu au vacuomètre", champs: [{ label: "Vide lu", uniteMachine: "unite" }],
          juger(v, c) {
            const x = c.nb(v[0]), cible = c.nb(c.m.cible);
            if (isNaN(x)) return ["ambre", "J'écris un nombre, tel qu'il est affiché sur le vacuomètre."];
            if (isNaN(cible)) return ["ambre", "J'écris d'abord la cible du poste dans « Ma machine »."];
            if (x <= 0) return ["rouge", "Un vide poussé ne s'affiche pas à zéro ou en négatif : je lis peut-être les aiguilles du manifold (−1 bar). Je relis le vacuomètre."];
            if (x <= cible) return ["vert", "Cible atteinte : " + n(c, x) + u(c) + " pour " + n(c, cible) + u(c) + " demandés. Je peux isoler."];
            if (c.proche(x, cible, c.tol.mesure)) return ["vert", "À l'erreur de mesure près, la cible est atteinte (" + n(c, x) + " pour " + n(c, cible) + u(c) + "). Je laisse tourner un peu pour être sûr."];
            return ["ambre", "Pas encore : " + n(c, x) + u(c) + ", la cible est " + n(c, cible) + u(c) + ". Je laisse tourner. Si ça ne descend plus : un raccord laisse entrer de l'air."];
          } } },

      { id: "isoler", verbe: "J'isole le circuit, puis j'arrête la pompe", cadre: ["equipment-manifold", "equipment-pump"], cible: "equipment-manifold",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", manifold: ["bp", "hp"], pompeIso: false, aiguilles: "vide", vac: "descente",
        regarde: "La vanne VIDE du manifold, l'isolement de la pompe, l'interrupteur.",
        fais: "Cible atteinte : je ferme la vanne VIDE et l'isolement de la pompe. La pompe tourne encore. Ensuite seulement, je l'arrête.",
        voir: "Circuit isolé, pompe arrêtée en dernier : le vide reste dans le circuit.",
        danger: "J'isole AVANT d'arrêter : sinon l'huile de la pompe et l'air peuvent remonter dans le circuit.",
        controle: { titre: "J'ai isolé le circuit AVANT d'arrêter la pompe ?", type: "ouinon",
          oui: "Circuit isolé, puis pompe arrêtée : le vide est gardé, la pompe ne peut plus rien renvoyer dans le circuit.",
          non: "STOP : pompe arrêtée circuit ouvert, l'huile et l'air ont pu remonter. J'appelle le professeur : on recommence le tirage au vide." } },

      { id: "remontee", verbe: "Je fais le test de remontée", cadre: ["equipment-installation", "equipment-vacuum", "zone-vide"], cible: "equipment-vacuum",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", manifold: ["bp", "hp"], pompeIso: false, aiguilles: "vide", vac: "remontee",
        regarde: "Le vacuomètre et le chrono.",
        fais: "Je lance le chrono, sans toucher aucune vanne. Je lis le vacuomètre au départ, à la moitié et à la fin de la durée du professeur.",
        voir: "Trois valeurs : le vide ne bouge pas, ou il remonte puis s'arrête, ou il remonte toujours.",
        controle: { titre: "Mes trois relevés (dans l'unité du poste)", champs: [{ label: "Au départ", uniteMachine: "unite" }, { label: "À la moitié du temps", uniteMachine: "unite" }, { label: "À la fin du temps", uniteMachine: "unite" }],
          juger(v, c) {
            const r = remontee(c, v);
            if (r.manque === "releves") return ["ambre", "J'écris les trois valeurs, comme elles s'affichent."];
            if (r.manque === "admise") return ["ambre", "J'écris d'abord la remontée admise dans « Ma machine »."];
            const calc = "Fin − départ = " + n(c, r.v[2]) + " − " + n(c, r.v[0]) + " = " + n(c, r.r) + u(c) + ", pour " + n(c, r.adm) + u(c) + " admis.";
            if (r.forme === 1) return ["vert", calc + " Le vide tient : forme 1."];
            if (r.forme === 2) return ["ambre", calc + " Ça remonte, mais de moins en moins : forme 2, de l'humidité. On retire au vide."];
            return ["rouge", calc + " Ça remonte sans s'arrêter : forme 3, une fuite. STOP : retour à l'étanchéité (gare 4), j'appelle le professeur."];
          } },
        arret: "Le professeur a vérifié mes trois relevés, avant que je juge le test." },

      { id: "lecture", verbe: "Je lis la courbe et je décide", cadre: ["courbes"], cible: "equipment-vacuum",
        tuyaux: ["blue", "red", "black", "vac"], vannes: "mid", manifold: ["bp", "hp"], pompeIso: false, aiguilles: "vide", vac: "remontee",
        regarde: "Mes trois valeurs et les trois courbes.",
        fais: "Je compare mes valeurs aux trois formes. Je touche la forme qui ressemble à mes relevés. Puis je décide, avec le professeur.",
        voir: "1 : je peux charger. 2 : humidité, je retire au vide. 3 : fuite, retour à la gare 4.",
        danger: "Un circuit qui remonte sans s'arrêter fuit : je ne charge pas.",
        controle: { titre: "La forme de ma courbe", type: "choix", options: ["1 · le vide tient", "2 · remonte puis s'arrête", "3 · remonte sans s'arrêter"],
          juger(v, c) {
            const r = remontee(c);
            if (!r.forme) return ["ambre", "Je n'ai pas de relevés complets à l'étape d'avant : je ne peux pas juger ma courbe."];
            const f = v[0] + 1;
            if (f !== r.forme) return ["ambre", "Mes relevés montrent la forme " + r.forme + " (" + FORMES[r.forme] + "), pas la " + f + ". Je relis mes trois valeurs."];
            return ["vert", {
              1: "Cohérent : " + FORMES[1] + ". Décision : le circuit est sec et étanche, je peux passer à la charge (gare 6).",
              2: "Cohérent : " + FORMES[2] + ", c'est de l'humidité. Décision : je retire au vide, puis je refais le test.",
              3: "Cohérent : " + FORMES[3] + ", c'est une fuite. Décision : retour à l'étanchéité (gare 4), j'appelle le professeur."
            }[f]];
          } } },

      { id: "depose", verbe: "Je range la pompe et je remets tout comme trouvé", cadre: ["equipment-installation", "equipment-pump", "equipment-vacuum", "zone-vide"], cible: "equipment-pump",
        tuyaux: ["blue", "red"], vannes: "arriere", aiguilles: "vide", vac: "rien",
        regarde: "La pompe, le vacuomètre, les vannes de service.",
        fais: "Pompe et vacuomètre débranchés, raccords bouchés, pompe rangée. Vannes de service au siège arrière, capuchons et bouchons remis.",
        voir: "Poste rangé ; vannes au siège arrière, capuchons et bouchons en place.",
        controle: { titre: "Je coche ce que j'ai fait", type: "coches",
          items: ["pompe et vacuomètre débranchés, raccords bouchés", "pompe rangée, huile revérifiée (niveau et couleur)", "vannes de service au siège arrière", "capuchons de tige et bouchons de prise remis, serrés", "circuit laissé comme le professeur le demande"],
          ok: "Tout est remis comme je l'ai trouvé. Je note le résultat dans « Ma trace ».",
          manque: "Il manque une coche : je ne quitte pas le poste avant." },
        arret: "Le professeur a vérifié ma décision, avant la dépose de la pompe." }
    ],

    /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
    test: {
      machine: { cible: "0,5", unite: "mbar", duree: "15", remontee: "0,3" },
      azote: { descente: ["0,4"], remontee: ["0,4", "0,45", "0,5"], lecture: ["0"] }
    }
  };
})();
