/* =====================================================================
   Gare 0 — RÉCUPÉRER LE FLUIDE (gare pilote de la ligne « Les interventions de base »).
   Restructure, sans réinventer :
   · packs/fluides/res/recuperation-fluide-interactive (8 phases, 93 actions → 12 étapes) et son dessin ;
   · le TP de Franck « LA RECUPERATION DU FLUIDE FRIGORIGENE » (CAP IFCA, C4) ;
   · le TP 1 « Récupérer le fluide » de 1re MFER (23/09/2026) : rang d'ouverture du plateau, support sous azote ;
   · la guidance plateau M3 de l'habilitation (phase 2 : double pesée, étiquette lue à voix haute).
   Contrat du plateau (validé dans la station) : sortie de la station sur le robinet VAPEUR de la bouteille,
   robinet LIQUIDE fermé ; manifold 4 voies ; Minimax-E (entrée bleue, sélecteur noir, sortie rouge).
   Aucune valeur universelle de vide ni de durée : « la cible du poste », « la notice de la station ».
   ===================================================================== */
window.GARE = {
  id: "recuperation",
  titre: "Récupérer le fluide",
  sousTitre: "Les interventions de base · gare 0 · liquide puis vapeur",
  machine: [
    { id: "fluide", label: "Fluide (plaque de la machine)", court: "Fluide", exemple: "ex. R-449A", texte: true },
    { id: "charge", label: "Charge (plaque)", court: "Charge", unite: "kg", nombre: true },
    { id: "mmax", label: "Bouteille : masse maxi de fluide (étiquette)", court: "Bouteille, maxi", unite: "kg", nombre: true }
  ],
  /* Deux niveaux (Franck, 08/10) : mêmes étapes, mêmes attendus (l'attestation fluides) ; codes et exigence propres. */
  codes: {
    cap: "CAP IFCA — tâches T6, T8, T2 · compétences C4.2, C4.7 · savoirs S5.2, S0.1, S6.2",
    mfer: "1re Bac Pro MFER — tâches A1T3, A2T3, A2T5 · compétences C4, C6, C11 · savoirs S2, S5, S7",
    commun: "niveau de l'attestation d'aptitude fluides (règlement (UE) 2024/2215, annexe I) — 5.01 à 5.06"
  },
  grille: [
    ["Je prépare et je sécurise (EPI, consignation, bouteille contrôlée et pesée)", { cap: "T6 · T8", mfer: "A1T3 · C4" }],
    ["Je raccorde et j'ouvre dans le bon ordre, sans fuite", { cap: "C4.7", mfer: "A2T3 · C6" }],
    ["Je récupère liquide puis vapeur, sans aucun rejet", { cap: "C4.2", mfer: "A2T5 · C6" }],
    ["Je pèse, je calcule, je trace", { cap: "T2", mfer: "C11" }]
  ],
  exigence: {
    cap: "chaque geste juste et dans l'ordre, aucun rejet, les deux pesées notées ; le professeur peut guider aux points d'arrêt.",
    mfer: "les mêmes gestes, sans aide entre les points d'arrêt ; je justifie chaque contrôle et je repère seul un relevé incohérent."
  },
  savoirEtre: "aucun rejet de fluide, même sans regard",
  tolerances: { pesee: 0.05, mesure: 0.05 },   /* Franck, 08/10 : 5 % sur la pesée ; les relevés ont aussi droit à une erreur de mesure */

  bilan(c) {
    const m1 = c.nb(c.releve("pesee-depart")), m2 = c.nb(c.releve("pesee-fin"));
    const d = !isNaN(m1) && !isNaN(m2) ? c.kg(m2 - m1) : "…";
    return `Machine : <b>${c.m.fluide || "…"}</b> · charge (plaque) <b>${c.m.charge ? c.kg(c.nb(c.m.charge)) : "…"}</b> · ` +
      `masse ${c.parcours === "azote" ? "entrée dans la bouteille" : "récupérée"} <b>${d}</b> (${isNaN(m2) ? "…" : c.kg(m2)} − ${isNaN(m1) ? "…" : c.kg(m1)})`;
  },

  dessin: {
    fichier: "dessin.svg",
    vue: "0 0 1200 620",
    noms: { "equipment-installation": "la machine (le groupe et ses vannes de service)", "equipment-bottle": "la bouteille sur sa balance",
      "equipment-manifold": "le manifold", "equipment-station": "la station de récupération", "equipment-pump": "la pompe à vide",
      "equipment-vacuum": "le vacuomètre" },
    /* l'état du dessin suit l'étape : flexibles posés, masse lue sur la balance */
    appliquer(svg, e, c) {
      svg.querySelectorAll(".hose").forEach(h => h.classList.remove("connected"));
      (e.tuyaux || []).forEach(t => { const h = svg.querySelector("#hose-path-" + t); if (h) h.classList.add("connected"); });
      const b = svg.querySelector("#svg-balance"); if (!b) return;
      const lu = { depart: c.releve("pesee-depart"), cours: c.releve("liquide"), fin: c.releve("pesee-fin") }[e.balance || "depart"];
      b.textContent = lu ? c.kg(c.nb(lu)) : "…";
    }
  },

  etapes: [
    { id: "securite", verbe: "Je sécurise le poste", cadre: ["equipment-installation"], cible: "equipment-installation",
      regarde: "La machine, son interrupteur, sa plaque.",
      fais: "Lunettes et gants. J'arrête la machine et je la consigne : cadenas et étiquette.",
      voir: "Machine arrêtée, cadenas posé, EPI sur moi.",
      danger: "Le fluide liquide brûle par le froid : lunettes et gants avant de toucher un flexible.",
      arret: "Le professeur a vérifié : EPI portés, machine consignée.",
      azote: { fais: "Lunettes et gants. Le support est à l'arrêt, débranché.", voir: "Support à l'arrêt, EPI sur moi.",
        danger: "L'azote est sous pression : un flexible qui lâche fouette. Je tiens le raccord, loin des visages.",
        arret: "Le professeur a vérifié : EPI portés, support à l'arrêt." } },

    /* Franck, 08/10 : avant toute intervention, état des lieux — rien de perdu, rien d'abîmé, vannes en service au siège arrière. */
    { id: "etat-des-lieux", verbe: "Je fais l'état des lieux", cadre: ["equipment-installation"], cible: "equipment-installation",
      regarde: "Les vannes de service, leurs capuchons et leurs bouchons.",
      fais: "Je vérifie chaque vanne de service : capuchon de tige et bouchon de prise présents, serrés, en bon état.",
      voir: "Tout est là et serré ; les vannes sont au siège arrière, comme en service.",
      controle: { titre: "Je coche ce que j'ai vu", type: "coches",
        items: ["vannes de service au siège arrière", "capuchons de tige présents et serrés", "bouchons des prises présents et serrés", "rien d'abîmé, rien qui manque"],
        ok: "État des lieux fait : je saurai tout remettre comme je l'ai trouvé.",
        manque: "Il manque quelque chose : je le signale au professeur avant de commencer." } },

    { id: "bouteille", verbe: "Je vérifie la bouteille", cadre: ["equipment-bottle"], cible: "equipment-bottle",
      regarde: "L'étiquette de la bouteille de récupération.",
      fais: "Je lis à voix haute le fluide écrit sur l'étiquette.",
      voir: "Le même fluide que sur la plaque de la machine.",
      danger: "Deux fluides dans une bouteille : le mélange ne se recycle plus, il part en destruction.",
      controle: { titre: "Fluide écrit sur la bouteille", champs: [{ texte: true }],
        juger(v, c) {
          if (!c.m.fluide) return ["ambre", "J'écris d'abord le fluide de la plaque dans « Ma machine »."];
          return c.egal(v[0], c.m.fluide) ? ["vert", "Même fluide que la machine (" + c.m.fluide + ") : je peux brancher."]
            : ["rouge", "STOP : la bouteille porte " + v[0] + ", la machine " + c.m.fluide + ". Je ne branche pas, j'appelle le professeur."];
        } } },

    { id: "pesee-depart", verbe: "Je pèse la bouteille vide", cadre: ["equipment-bottle"], cible: "equipment-bottle",
      regarde: "L'afficheur de la balance.",
      fais: "Bouteille seule, debout, au centre de la balance. J'attends un chiffre stable.",
      voir: "Un chiffre qui ne bouge plus : la masse de départ.",
      controle: { titre: "Masse de départ", champs: [{ unite: "kg" }],
        juger(v, c) {
          const x = c.nb(v[0]); if (isNaN(x)) return ["ambre", "J'écris un nombre, par exemple 12,40."];
          if (x <= 0) return ["rouge", "Une bouteille ne pèse pas zéro : la balance est-elle allumée, mise à zéro sans rien dessus ?"];
          const lim = c.nb(c.m.mmax);
          return ["vert", "Masse de départ notée : " + c.kg(x) + "." + (lim ? " La balance ne devra jamais dépasser " + c.kg(x + lim) + "." : "")];
        } } },

    { id: "materiel", verbe: "Je contrôle le matériel", cadre: ["equipment-manifold", "equipment-station"], cible: "equipment-manifold",
      regarde: "Le manifold, les flexibles, la station.",
      fais: "Je ferme les 4 vannes du manifold. Je regarde chaque joint. Station éteinte.",
      voir: "Vannes fermées, aiguilles à 0, joints présents, aucun flexible abîmé.",
      controle: { titre: "Je coche ce que j'ai vu", type: "coches", items: ["4 vannes du manifold fermées", "aiguilles à 0", "un joint propre dans chaque flexible", "station éteinte"],
        ok: "Matériel contrôlé.", manque: "Il manque une coche : je ne raccorde pas avant." } },

    { id: "raccorder", verbe: "Je raccorde", cadre: ["equipment-installation", "equipment-manifold", "equipment-station", "equipment-bottle"], cible: "equipment-manifold",
      tuyaux: ["blue", "red", "yellow", "orange"],
      regarde: "Les vannes de service du groupe, la station, la bouteille.",
      fais: "Bleu : BP → aspiration. Rouge : HP → départ liquide. Jaune : SERVICE → entrée de la station. Orange : sortie de la station → robinet VAPEUR de la bouteille. Serrage à la main.",
      voir: "4 flexibles serrés ; vannes de service toujours au siège arrière : prises de service fermées.",
      arret: "Le professeur a vérifié mon montage, avant toute ouverture." },

    { id: "vide-flexibles", verbe: "Je tire au vide les flexibles", cadre: ["equipment-manifold", "equipment-pump", "equipment-vacuum"], cible: "equipment-pump",
      tuyaux: ["blue", "red", "yellow", "orange", "black"],
      regarde: "Le vacuomètre.",
      fais: "Pompe sur la voie VIDE. J'ouvre VIDE et SERVICE, pompe en route. Cible atteinte : je ferme, puis j'arrête la pompe.",
      voir: "Le vacuomètre atteint la cible du poste et ne remonte pas.",
      danger: "Je ferme AVANT d'arrêter la pompe : sinon l'air revient dans les flexibles.",
      controle: { titre: "Le vacuomètre a atteint la cible et tient ?", type: "ouinon",
        oui: "Flexibles sans air : rien d'autre que du fluide n'ira dans la bouteille.",
        non: "Le vide ne tient pas : un raccord fuit. Je resserre et je recommence ; sinon j'appelle le professeur." } },

    { id: "prises", verbe: "J'ouvre les prises de service", cadre: ["equipment-installation", "equipment-manifold"], cible: "equipment-installation",
      tuyaux: ["blue", "red", "yellow", "orange"],
      regarde: "Les aiguilles BP et HP du manifold.",
      fais: "Je décolle les vannes de service du siège arrière : position intermédiaire.",
      voir: "Les deux aiguilles montent : je lis la pression de la machine.",
      controle: { titre: "Je lis les deux aiguilles", champs: [{ label: "BP", unite: "bar" }, { label: "HP", unite: "bar" }],
        juger(v, c) {
          const bp = c.nb(v[0]), hp = c.nb(v[1]); if (isNaN(bp) || isNaN(hp)) return ["ambre", "J'écris deux nombres, en bar."];
          if (hp < bp) return ["rouge", "La HP plus basse que la BP : flexibles inversés ? Je vérifie bleu = BP, rouge = HP."];
          /* à l'arrêt, HP et BP s'égalisent : égales à 5 % près, plus 0,3 bar de lecture d'aiguille */
          return c.proche(bp, hp, c.tol.mesure, 0.3) ? ["vert", "Machine arrêtée : HP et BP presque égales, c'est normal."]
            : ["ambre", "Écart de " + c.fr(hp - bp, 1) + " bar : la machine vient de s'arrêter ? J'attends que les pressions s'équilibrent."];
        } } },

    { id: "liquide", verbe: "Je récupère le liquide par la HP", cadre: ["equipment-manifold", "equipment-station", "equipment-bottle"], cible: "equipment-station",
      tuyaux: ["blue", "red", "yellow", "orange"], balance: "cours",
      regarde: "La balance et l'aiguille HP.",
      fais: "J'ouvre dans le rang : robinet VAPEUR de la bouteille, sortie rouge de la station, vanne SERVICE, vanne HP. Station sur LIQUIDE, POWER, START.",
      voir: "La masse de la bouteille monte vite, la HP baisse.",
      danger: "Jamais plus que la masse maximale écrite sur la bouteille. Je surveille la balance tout le temps.",
      controle: { titre: "Masse lue pendant le transfert", champs: [{ unite: "kg" }],
        juger(v, c) {
          const x = c.nb(v[0]), m1 = c.nb(c.releve("pesee-depart")), lim = c.nb(c.m.mmax);
          if (isNaN(x)) return ["ambre", "J'écris un nombre, en kg."];
          if (isNaN(m1)) return ["ambre", "Je n'ai pas noté la masse de départ (étape 3) : je ne peux pas savoir combien je récupère."];
          if (lim && x >= m1 + lim) return ["rouge", "STOP : " + c.kg(x) + ", la bouteille est à sa masse maximale (" + c.kg(m1 + lim) + "). Je ferme la sortie et j'appelle le professeur."];
          if (x <= m1) return ["ambre", "La masse ne monte pas : le chemin est-il ouvert dans le rang ? La station tourne-t-elle ?"];
          return ["vert", "Déjà " + c.kg(x - m1) + " récupérés." + (lim ? " Il reste " + c.kg(m1 + lim - x) + " de place dans la bouteille." : "")];
        } },
      azote: { verbe: "Je prépare le chemin du liquide", fais: "J'ouvre dans le rang : robinet VAPEUR de la bouteille, sortie rouge de la station, vanne SERVICE, vanne HP. La station reste ARRÊTÉE.",
        voir: "Le chemin est ouvert de la HP jusqu'à la bouteille ; la masse ne bouge pas.",
        danger: "La station ne tourne jamais à l'azote : elle enverrait un gaz qui ne se condense pas dans la bouteille.",
        arret: "Le professeur a vérifié le rang d'ouverture.", balance: "depart", controle: null } },

    { id: "vapeur", verbe: "Je finis la vapeur par la BP", cadre: ["equipment-manifold", "equipment-station"], cible: "equipment-manifold",
      tuyaux: ["blue", "red", "yellow", "orange"], balance: "cours",
      regarde: "L'aiguille BP.",
      fais: "La masse ne monte presque plus : je ferme la vanne HP, j'ouvre la vanne BP, entrée bleue sur VAPEUR.",
      voir: "La BP descend jusqu'à la valeur d'arrêt de la notice de la station.",
      controle: { titre: "BP lue en fin de récupération", champs: [{ unite: "bar" }],
        juger(v, c) {
          const x = c.nb(v[0]); if (isNaN(x)) return ["ambre", "J'écris un nombre, en bar (négatif sous la pression de l'air)."];
          return x <= 0 ? ["vert", "BP à " + c.fr(x, 1) + " bar : il ne reste presque plus de fluide. Je compare à la valeur d'arrêt de la notice."]
            : ["ambre", "Encore " + c.fr(x, 1) + " bar : il reste du fluide. Je continue en vapeur."];
        } },
      azote: { verbe: "Je bascule côté vapeur", fais: "Je ferme la vanne HP, j'ouvre la vanne BP, entrée bleue sur VAPEUR. La station reste arrêtée.",
        voir: "Le chemin passe maintenant par la BP.", balance: "depart", controle: null } },

    { id: "purge", verbe: "Je vide la station", cadre: ["equipment-station"], cible: "equipment-station",
      tuyaux: ["blue", "red", "yellow", "orange"], balance: "cours",
      regarde: "Le sélecteur noir de la station.",
      fais: "Entrée bleue fermée, station arrêtée, POWER coupé. Sélecteur noir sur PURGE, je relance.",
      voir: "Le fluide resté dans la station part dans la bouteille.",
      danger: "Je ne tourne jamais le sélecteur noir station en marche.",
      azote: false },

    { id: "pesee-fin", verbe: "Je ferme et je repèse", cadre: ["equipment-bottle"], cible: "equipment-bottle",
      tuyaux: ["orange"], balance: "fin",
      regarde: "La balance.",
      fais: "Vannes de service au siège arrière, manifold fermé, robinet de la bouteille fermé. Je repèse.",
      voir: "Masse finale − masse de départ = masse récupérée.",
      controle: { titre: "Masse finale", champs: [{ unite: "kg" }],
        juger(v, c) {
          const x = c.nb(v[0]), m1 = c.nb(c.releve("pesee-depart")), ch = c.nb(c.m.charge), tol = c.tol.pesee;
          if (isNaN(x)) return ["ambre", "J'écris un nombre, en kg."];
          if (isNaN(m1)) return ["ambre", "Pas de masse de départ : la quantité récupérée n'existe pas. J'appelle le professeur."];
          const d = x - m1;
          if (c.parcours === "azote") return Math.abs(d) <= 0.05 /* résolution d'une balance d'atelier */ ? ["vert", "La masse n'a pas bougé : station arrêtée, rien n'est entré. Normal sur le support."]
            : ["ambre", "La masse a changé de " + c.kg(d) + " : je repèse, bouteille seule et stable."];
          if (d <= 0) return ["rouge", "Masse finale plus petite que la masse de départ : je repèse, bouteille seule et stable."];
          if (!ch) return ["vert", "Masse récupérée : " + c.kg(d) + ". (J'écris la charge de la plaque dans « Ma machine » pour comparer.)"];
          if (d < ch * (1 - tol)) return ["ambre", "Récupéré " + c.kg(d) + ", la plaque dit " + c.kg(ch) + " : il manque " + c.kg(ch - d) + ". Fuite passée, récupération pas finie ? J'en parle au professeur."];
          if (d > ch * (1 + tol)) return ["ambre", "Récupéré " + c.kg(d) + ", plus que la plaque (" + c.kg(ch) + ") : machine trop chargée, ou première pesée fausse ?"];
          return ["vert", "Récupéré " + c.kg(d) + " pour " + c.kg(ch) + " sur la plaque : cohérent à 5 % près. Je reporte " + c.kg(d) + " sur la fiche."];
        } },
      arret: "Le professeur a vérifié la pesée et mon calcul.",
      azote: { voir: "La masse n'a pas bougé : la station n'a pas tourné." } },

    { id: "deposer", verbe: "Je dépose, je range, je trace", cadre: ["equipment-installation", "equipment-bottle"], cible: "equipment-bottle",
      regarde: "Les raccords, la bouteille, la fiche d'intervention.",
      fais: "Je dépose lentement, je bouchonne les prises. Bouteille debout, au rack. Je reporte la masse sur la fiche.",
      voir: "Machine bouchonnée, poste rangé, masse reportée.",
      danger: "Un reste de fluide dans un flexible se récupère : jamais dans l'air.",
      azote: { fais: "Je dépose lentement, loin des visages, je bouchonne les prises. Bouteille au rack. Je remplis la fiche comme pour un vrai fluide.",
        danger: "Le flexible garde de l'azote sous pression : je desserre lentement, raccord tenu, jamais face à quelqu'un." } }
  ],

  /* valeurs du contrôle automatique (_moule/qa.mjs) : toutes doivent donner un verdict vert */
  test: {
    machine: { fluide: "R-449A", charge: "2,4", mmax: "10" },
    charge: { bouteille: ["R449A"], "pesee-depart": ["12,00"], prises: ["2,1", "2,4"], liquide: ["13,80"], vapeur: ["-0,3"], "pesee-fin": ["14,35"] },
    azote: { bouteille: ["R-449A"], "pesee-depart": ["12,00"], prises: ["3,0", "3,2"], "pesee-fin": ["12,00"] }
  }
};
