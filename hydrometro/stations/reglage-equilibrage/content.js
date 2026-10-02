(() => {
  "use strict";

  /* Station satellite de D5 Équilibrage : le geste de réglage d'une vanne d'équilibrage à prises
     de pression. Valeurs de la notice de la vanne de l'atelier (banc d'équilibrage de radiateurs
     RA20, dossier technique, fonds ERM) : Kv DN 15 par nombre de tours, procédure de préréglage,
     q = Kv × √Δp (bar). Aucune marque à l'écran. Rédigée le 02/10/2026. */

  /* la vue 3D de l’appareil (le dessin reste en « En schéma » et à l’impression) */
  const V3D = ((document.currentScript && document.currentScript.src) || "").replace(/^[^?]*/, "");   /* la clé ?v= de la livraison suit jusqu’à la 3D */
  const vue3d = (modele, titre, options) => el => {
    const go = () => window.HydroVue3D.brancher(el, { modele, titre, options });
    if (window.HydroVue3D) return go();
    const s = document.createElement("script"); s.src = "../_commun/3d/station3d.js" + V3D; s.onload = go; document.head.appendChild(s);
  };

  const fr = (n, d = 1) => n.toFixed(d).replace(".", ",");
  const svg = (id, title, desc, body) => `<svg viewBox="0 0 760 430" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc>${body}</svg>`;

  /* Kv de la vanne DN 15 selon le nombre de tours (notice) ; interpolation linéaire */
  const KV = [[0.5, 0.127], [1, 0.212], [1.5, 0.314], [2, 0.571], [2.5, 0.877], [3, 1.38], [3.5, 1.98], [4, 2.52]];
  const kvDe = (t) => {
    if (t <= KV[0][0]) return KV[0][1] * t / KV[0][0];
    for (let i = 1; i < KV.length; i++) if (t <= KV[i][0]) { const [t0, k0] = KV[i - 1], [t1, k1] = KV[i]; return k0 + (k1 - k0) * (t - t0) / (t1 - t0); }
    return KV[KV.length - 1][1];
  };
  /* la branche du banc : 20 kPa disponibles = reste de la branche (Kv équivalent 1,0) + vanne */
  const branche = (t) => {
    const kv = kvDe(t), q = Math.sqrt(0.20) / Math.sqrt(1 / (kv * kv) + 1);
    return { kv, q: q * 1000, dp: 100 * (q / kv) * (q / kv) };
  };
  const CIBLE = 250;

  const titre = (t) => `<text x="380" y="42" text-anchor="middle" font-size="24" font-weight="800" fill="#1b3a63">${t}</text>`;
  const carte = (x, y, l, h, num, ligne1, ligne2, couleur = "#1b3a63") => `<rect x="${x}" y="${y}" width="${l}" height="${h}" rx="14" fill="#fffdf8" stroke="${couleur}" stroke-width="4"/><circle cx="${x + 34}" cy="${y + h / 2}" r="20" fill="${couleur}"/><text x="${x + 34}" y="${y + h / 2 + 8}" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">${num}</text><text x="${x + 68}" y="${y + h / 2 - 4}" font-size="21" font-weight="700" fill="#10233c">${ligne1}</text><text x="${x + 68}" y="${y + h / 2 + 22}" font-size="20" fill="#10233c">${ligne2}</text>`;

  const besoinScene = svg("reg-besoin", "Trois branches ouvertes, trois débits différents",
    "Sans réglage, la branche proche reçoit 380 litres par heure, la branche du milieu 250 et la branche éloignée 120, alors que chacune en demande 250.",
    `${titre("SANS RÉGLAGE : L’EAU PREND LE CHEMIN LE PLUS FACILE")}
     <line x1="120" y1="330" x2="680" y2="330" stroke="#1b3a63" stroke-width="3"/>
     <line x1="120" y1="190" x2="680" y2="190" stroke="#1e7e54" stroke-width="3" stroke-dasharray="10 8"/>
     <text x="680" y="178" text-anchor="end" font-size="20" font-weight="700" fill="#1e7e54">BESOIN : 250 l/h</text>
     ${[[200, "A · proche", 380], [380, "B · milieu", 250], [560, "C · loin", 120]].map(([x, l, q]) => `<rect x="${x - 50}" y="${330 - q * 0.56}" width="100" height="${q * 0.56}" rx="6" fill="${q > 260 ? "#c0392b" : q < 240 ? "#2f6db5" : "#1e7e54"}"/><text x="${x}" y="${318 - q * 0.56}" text-anchor="middle" font-size="22" font-weight="800" fill="#10233c">${q} l/h</text><text x="${x}" y="362" text-anchor="middle" font-size="21" font-weight="700" fill="#10233c">${l}</text>`).join("")}
     <text x="380" y="405" text-anchor="middle" font-size="20" fill="#10233c">Trop chez A (barre rouge), juste chez B (verte), trop peu chez C (bleue).</text>`);

  const vanneScene = svg("reg-vanne", "Les trois organes à connaître sur la vanne",
    "Le volant et son indicateur donnent la position en tours ; la tige intérieure, manœuvrée à la clé six pans de 3 millimètres, bloque le préréglage ; les deux prises de pression servent à mesurer.",
    `${titre("LIRE LA VANNE AVANT DE LA TOURNER")}
     ${carte(60, 80, 640, 92, 1, "Le volant et son indicateur", "la position en tours entiers et en dixièmes : de 0,0 à 4,0")}
     ${carte(60, 190, 640, 92, 2, "La tige intérieure (clé six pans de 3 mm)", "vissée jusqu’à la butée, elle mémorise le préréglage")}
     ${carte(60, 300, 640, 92, 3, "Les deux prises de pression", "on y branche l’appareil qui mesure l’écart de pression")}`);

  const procedureScene = svg("reg-procedure", "Afficher un préréglage en quatre gestes",
    "Fermer complètement la vanne, l’ouvrir jusqu’à la position voulue, visser la tige intérieure jusqu’à la butée, puis vérifier en fermant et en rouvrant jusqu’à la butée.",
    `${titre("AFFICHER 2,3 TOURS : QUATRE GESTES, DANS L’ORDRE")}
     ${carte(40, 76, 330, 150, 1, "Fermer complètement", "le volant affiche 0,0", "#1b3a63")}
     ${carte(390, 76, 330, 150, 2, "Ouvrir jusqu’à 2,3", "deux tours et trois dixièmes", "#1b3a63")}
     ${carte(40, 244, 330, 150, 3, "Visser la tige intérieure", "clé six pans 3 mm, jusqu’à la butée", "#c9451a")}
     ${carte(390, 244, 330, 150, 4, "Vérifier", "fermer, rouvrir : arrêt à 2,3", "#1e7e54")}`);

  const kvScene = svg("reg-kv", "Tableau des Kv de la vanne DN 15 selon le nombre de tours",
    "Valeurs de la notice : 0,5 tour Kv 0,127 ; 1 tour 0,212 ; 1,5 tour 0,314 ; 2 tours 0,571 ; 2,5 tours 0,877 ; 3 tours 1,38 ; 3,5 tours 1,98 ; 4 tours 2,52. Débit égale Kv fois racine de l’écart de pression en bar.",
    `${titre("NOTICE · VANNE DN 15 : Kv SELON LA POSITION")}
     ${KV.map(([t, k], i) => { const x = 50 + i * 83; return `<rect x="${x}" y="90" width="78" height="64" fill="#e8eef6" stroke="#1b3a63" stroke-width="2"/><text x="${x + 39}" y="132" text-anchor="middle" font-size="22" font-weight="800" fill="#10233c">${fr(t)}</text><rect x="${x}" y="154" width="78" height="64" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><text x="${x + 39}" y="196" text-anchor="middle" font-size="21" fill="#10233c">${String(k).replace(".", ",")}</text>`; }).join("")}
     <text x="44" y="132" text-anchor="end" font-size="20" font-weight="700" fill="#1b3a63">tours</text>
     <text x="44" y="196" text-anchor="end" font-size="20" font-weight="700" fill="#1b3a63">Kv</text>
     <rect x="110" y="260" width="540" height="76" rx="14" fill="#fff4e0" stroke="#b06a00" stroke-width="4"/>
     <text x="380" y="308" text-anchor="middle" font-size="26" font-weight="800" fill="#10233c">débit (m³/h) = Kv × √ écart (bar)</text>
     <text x="380" y="385" text-anchor="middle" font-size="20" fill="#10233c">Cible du banc : 250 l/h. L’appareil de mesure fait le calcul à partir de la position.</text>`);

  const ordreScene = svg("reg-ordre", "Régler une branche change les autres",
    "Quand on ferme un peu la branche A, une partie de son eau part vers B et C : les trois débits bougent ensemble.",
    `${titre("TOUT EST RELIÉ : RÉGLER A DÉPLACE B ET C")}
     ${[["AVANT", 120, [380, 250, 120]], ["APRÈS RÉGLAGE DE A", 420, [270, 285, 195]]].map(([t, x0, qs]) => `<text x="${x0 + 110}" y="96" text-anchor="middle" font-size="21" font-weight="800" fill="#1b3a63">${t}</text>${qs.map((q, i) => `<rect x="${x0 + i * 75}" y="${330 - q * 0.5}" width="60" height="${q * 0.5}" rx="5" fill="${i === 0 ? "#c0392b" : i === 1 ? "#1e7e54" : "#2f6db5"}"/><text x="${x0 + 30 + i * 75}" y="${320 - q * 0.5}" text-anchor="middle" font-size="20" font-weight="700" fill="#10233c">${q}</text><text x="${x0 + 30 + i * 75}" y="360" text-anchor="middle" font-size="21" font-weight="800" fill="#10233c">${"ABC"[i]}</text>`).join("")}`).join("")}
     <line x1="120" y1="330" x2="345" y2="330" stroke="#1b3a63" stroke-width="3"/><line x1="420" y1="330" x2="645" y2="330" stroke="#1b3a63" stroke-width="3"/>
     <text x="380" y="405" text-anchor="middle" font-size="20" fill="#10233c">Débits en l/h, valeurs d’exemple. On règle avec méthode, puis on revérifie tout.</text>`);

  const bilanScene = svg("reg-bilan", "Ce que doit contenir le compte rendu de réglage",
    "Le compte rendu donne pour chaque vanne la position en tours, l’écart de pression mesuré, le débit obtenu, la cible et la date.",
    `${titre("LE COMPTE RENDU D’UN RÉGLAGE")}
     ${carte(60, 80, 640, 92, 1, "Pour chaque vanne : la position en tours", "et la tige bloquée (préréglage mémorisé)")}
     ${carte(60, 190, 640, 92, 2, "L’écart de pression mesuré et le débit obtenu", "comparé à la cible, avec l’unité")}
     ${carte(60, 300, 640, 92, 3, "La date, l’appareil, l’état de l’installation", "pour qu’un autre puisse refaire la mesure")}`);

  window.STATION_CONFIG = {
    code: "D5+", id: "reglage-equilibrage", title: "Régler une vanne d’équilibrage", next: "revenir à la station Équilibrage ou passer au banc RA20 de l’atelier", suite: { href: "../plancher/index.html?line=D", label: "Station suivante : plancher" },
    levels: {
      CAP: { objective: "Lire la vanne, afficher un préréglage donné et le bloquer.", assessment: "afficher une position imposée dans l’ordre de la notice" },
      TP: { objective: "Mesurer l’écart de pression, en déduire le débit et corriger la position jusqu’à la cible.", assessment: "atteindre la cible à 5 % près et rendre compte" },
      BTS: { objective: "Justifier une méthode de réglage qui tient compte de l’influence des branches entre elles.", assessment: "expliquer pourquoi un réglage isolé ne suffit pas et proposer l’ordre des opérations" }
    },
    steps: [
      { short: "Pourquoi", narration: "Commençons par la raison d'être de cette vanne. Dans un réseau, toutes les branches sont ouvertes, et pourtant elles ne reçoivent pas la même quantité d'eau. L'eau prend le chemin qui lui résiste le moins : la branche proche de la chaudière se sert la première, la branche éloignée reçoit ce qui reste. Résultat sur le terrain : un radiateur brûlant près de la chaufferie, un autre tiède au bout du couloir, et un client qui appelle. La vanne d'équilibrage sert à freiner volontairement les branches trop favorisées, pour que chacune reçoive le débit prévu.",
        kicker: "comprendre", title: "Toutes les branches sont ouvertes, et pourtant…", text: "Sans réglage, la branche la plus proche prend plus d’eau que prévu et la plus éloignée en manque.",
        cap: "Montrez la branche qui reçoit trop d’eau et celle qui en manque.", tp: "Comparez chaque débit au besoin de 250 l/h.", bts: "Reliez l’écart de débit à la différence de résistance des chemins.",
        scene: besoinScene, wire: vue3d("installation", "L’installation en 3D", { depart: "mal-reglee" }),
        equivalent: "Sans réglage : A, proche, 380 l/h ; B 250 l/h ; C, éloignée, 120 l/h ; besoin 250 l/h par branche.",
        action: { type: "choice", prompt: "Pourquoi la branche éloignée reçoit-elle si peu d’eau alors que tout est ouvert ?", options: [{ label: "L’eau passe d’abord par les chemins qui résistent le moins" }, { label: "Le circulateur est trop faible pour elle seule" }, { label: "Les radiateurs éloignés sont toujours plus petits" }, { label: "L’eau refroidit avant d’arriver" }], correct: 0, explain: "Les branches proches résistent moins : elles prennent le débit. La vanne d’équilibrage ajoute la résistance qui manque sur ces branches." } },
      { short: "Lire", narration: "Avant de toucher, apprenez à lire la vanne. Trois organes comptent. Le volant porte un indicateur : il donne la position en tours entiers et en dixièmes, de zéro, vanne fermée, à quatre, pleine ouverture. Au-delà de quatre tours, le débit n'augmente pratiquement plus. Au centre du volant se cache une tige intérieure, que l'on manœuvre avec une clé six pans de trois millimètres : c'est elle qui mémorise le réglage. Enfin, de part et d'autre du clapet, deux prises de pression, fermées par un capuchon : c'est là qu'on branche l'appareil de mesure.",
        kicker: "repérer", title: "Volant, tige intérieure, prises de pression", text: "Repérez les trois organes et à quoi sert chacun.",
        cap: "Montrez le volant, la tige intérieure et les deux prises.", tp: "Associez chaque organe à son rôle dans le réglage.", bts: "Expliquez pourquoi la mesure se fait aux bornes de la vanne et pas ailleurs.",
        scene: vanneScene, wire: vue3d("vanneReglage", "La vanne d’équilibrage en 3D"),
        equivalent: "Trois organes : le volant et son indicateur en tours de 0,0 à 4,0 ; la tige intérieure à la clé six pans de 3 mm qui bloque le préréglage ; deux prises de pression pour la mesure.",
        action: { type: "match", prompt: "Associez chaque organe à son rôle.", options: ["Afficher la position en tours", "Mémoriser le préréglage", "Mesurer l’écart de pression"], items: [{ label: "Le volant et son indicateur", answer: 0 }, { label: "La tige intérieure (six pans 3 mm)", answer: 1 }, { label: "Les deux prises de pression", answer: 2 }], explain: "Le volant règle et affiche, la tige mémorise la butée, les prises permettent de mesurer sans démonter." } },
      { short: "Afficher", narration: "Voici le geste de base, celui de la notice. On veut régler la vanne à deux tours trois dixièmes. Premier geste : fermer complètement, l'indicateur affiche zéro. Deuxième geste : ouvrir jusqu'à deux virgule trois. Troisième geste : avec la clé six pans de trois millimètres, visser la tige intérieure dans le sens des aiguilles d'une montre, jusqu'à la butée. Le réglage est mémorisé. Dernier geste, la vérification : refermer la vanne, puis la rouvrir à fond. Le volant doit s'arrêter tout seul à deux virgule trois. Si quelqu'un ferme la vanne pour une intervention, il retrouvera le réglage sans calcul.",
        kicker: "manipuler", title: "Afficher un préréglage et le bloquer", text: "Remettez dans l’ordre les gestes de la notice pour afficher 2,3 tours.",
        cap: "Remettez les quatre gestes dans l’ordre.", tp: "Expliquez à quoi sert la vérification finale.", bts: "Expliquez l’intérêt de la butée pour une intervention ultérieure.",
        scene: procedureScene, wire: vue3d("vanneReglage", "La vanne d’équilibrage en 3D"),
        equivalent: "Quatre gestes : fermer complètement, ouvrir à 2,3, visser la tige intérieure jusqu’à la butée avec la clé six pans de 3 mm, vérifier en fermant puis en rouvrant jusqu’à la butée.",
        action: { type: "sequence", prompt: "Ordonnez les gestes pour afficher et bloquer 2,3 tours.", items: ["Visser la tige intérieure jusqu’à la butée", "Fermer complètement la vanne (0,0)", "Vérifier : fermer puis rouvrir, arrêt à 2,3", "Ouvrir jusqu’à 2,3"], correctOrder: [1, 3, 0, 2], explain: "Fermer, ouvrir à la position, bloquer avec la tige, vérifier : c’est l’ordre de la notice." } },
      { short: "Mesurer", narration: "Afficher un chiffre ne suffit pas : il faut prouver le débit. Branchez l'appareil de mesure sur les deux prises de pression. Il lit l'écart de pression aux bornes de la vanne et, connaissant la position, il calcule le débit avec la valeur Kv de la notice. Ici, la branche doit recevoir deux cent cinquante litres par heure. Vanne ouverte en grand, elle en prend beaucoup trop. Fermez progressivement : l'écart de pression aux prises augmente, le débit diminue. Arrêtez-vous quand vous êtes à cinq pour cent de la cible, puis bloquez la tige intérieure à cette position.",
        kicker: "mesurer et corriger", title: "Trouver la position qui donne 250 l/h", text: "Changez la position de la vanne. L’appareil affiche l’écart de pression et le débit calculé.",
        cap: "Lisez le débit affiché après chaque réglage.", tp: "Cherchez la position qui donne 250 l/h à 5 % près.", bts: "Vérifiez le calcul : débit = Kv × √ écart (en bar).",
        scene: kvScene,
        equivalent: (v) => { const b = branche(Number(v)); return `Position ${fr(Number(v))} tours : Kv ${fr(b.kv, 2)}, écart de pression ${fr(b.dp)} kPa, débit ${Math.round(b.q)} l/h pour une cible de 250 l/h.`; },
        action: { type: "range", prompt: "Réglez la position de la vanne.", label: "Position (tours)", min: 0.5, max: 4, step: 0.1, value: 4,
          evaluate: (v) => { const b = branche(Number(v)), ecart = (b.q - CIBLE) / CIBLE; const ok = Math.abs(ecart) <= 0.05;
            return { readout: `${fr(Number(v))} tours`, observation: `Écart aux prises ${fr(b.dp)} kPa → débit ${Math.round(b.q)} l/h (Kv ${fr(b.kv, 2)}). ${ok ? "Cible atteinte à 5 % près : bloquez la tige intérieure à cette position." : ecart > 0 ? "Encore trop de débit : fermez un peu." : "Pas assez de débit : ouvrez un peu."}` }; } } },
      { short: "Méthode", narration: "Dernière idée, et c'est elle qui sépare le bricolage du réglage. Les branches d'un réseau se partagent la même pompe : quand vous fermez un peu la branche A, son eau ne disparaît pas, elle part vers B et C. Régler une vanne déplace donc les débits des autres. C'est pourquoi on ne règle jamais une vanne au hasard, puis la suivante, en espérant que tout tombe juste. On suit une méthode, on règle dans un ordre défini, et à la fin on revérifie toutes les branches. Le compte rendu garde la trace de chaque position, de chaque mesure et de la date.",
        kicker: "conclure", title: "Régler une branche change les autres", text: "Toute action sur une vanne modifie le débit des autres branches.",
        cap: "Dites ce qui arrive aux autres branches quand on ferme A.", tp: "Expliquez pourquoi on revérifie toutes les branches à la fin.", bts: "Proposez un ordre de réglage et justifiez la revérification finale.",
        scene: ordreScene,
        equivalent: "Avant : A 380, B 250, C 120 l/h. Après avoir fermé un peu A : A 270, B 285, C 195 l/h. Les trois débits bougent ensemble.",
        action: { type: "choice", prompt: "Vous venez de régler A puis B. Le débit de A a encore changé. Pourquoi ?", options: [{ label: "Régler B a modifié la pression disponible pour A : les branches s’influencent" }, { label: "La vanne A est défectueuse" }, { label: "L’appareil de mesure se trompe" }, { label: "Le préréglage de A s’est desserré tout seul" }], correct: 0, explain: "Toutes les branches dépendent de la même pompe : on règle avec méthode et on revérifie l’ensemble à la fin." } }
    ],
    quiz: [
      { context: "Un radiateur proche de la chaufferie est brûlant, celui du bout du couloir reste tiède.", question: "Quelle est l’explication la plus probable ?", options: ["Le réseau n’est pas équilibré : la branche proche prend trop de débit", "Le radiateur éloigné est en panne", "La chaudière est trop puissante", "Il faut changer le circulateur"], correct: 0, explain: "Sans réglage, l’eau passe par le chemin qui résiste le moins." },
      { context: "Vous devez afficher 1,8 tour sur une vanne.", question: "Quel est le premier geste ?", options: ["Fermer complètement la vanne (0,0)", "Visser la tige intérieure", "Brancher l’appareil de mesure", "Ouvrir à fond"], correct: 0, explain: "On part toujours de la vanne fermée pour compter la position." },
      { context: "La tige intérieure est vissée jusqu’à la butée à 1,8 tour.", question: "Que se passe-t-il si un collègue ferme puis rouvre la vanne à fond ?", options: ["Le volant s’arrête à 1,8 : le réglage est retrouvé", "La vanne revient à 4 tours", "Le réglage est perdu", "La vanne ne s’ouvre plus"], correct: 0, explain: "La tige intérieure limite l’ouverture : c’est la mémoire du réglage." },
      { context: "L’appareil branché sur les prises affiche un débit de 320 l/h pour une cible de 250 l/h.", question: "Que faites-vous ?", options: ["Je ferme un peu la vanne, puis je remesure", "J’ouvre davantage la vanne", "Je change de vanne", "Je note 320 l/h et je m’arrête"], correct: 0, explain: "Trop de débit : on ajoute de la résistance, puis on vérifie par une nouvelle mesure." },
      { context: "Les trois branches sont réglées une par une.", question: "Que reste-t-il à faire ?", options: ["Revérifier toutes les branches et rédiger le compte rendu", "Rien, c’est terminé", "Ouvrir toutes les vannes à fond", "Recommencer par la branche la plus proche sans mesurer"], correct: 0, explain: "Chaque réglage modifie les autres : une vérification finale et un compte rendu concluent le travail." }
    ],
    summaryScene: bilanScene,
    summaryEquivalent: "Synthèse : comprendre pourquoi régler, lire la vanne, afficher et bloquer un préréglage, mesurer l’écart de pression pour atteindre le débit cible, revérifier toutes les branches et rendre compte. À l’atelier : banc d’équilibrage de radiateurs RA20, notice de la vanne dans le dossier technique."
  };
})();
