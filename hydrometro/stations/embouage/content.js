(() => {
  "use strict";

  /* Station « Embouage et désembouage : boues, filtre, pot à boues » (satellite E7+a, Bac MFER 2028, S4.3.4).
     Source principale : fiche technique n° 6 du Centre du Cuivre, « Les canalisations en cuivre comme moyen de lutter contre
     l’embouage des installations » (fonds Bac MFER, 06_embouage.pdf). Aucun chiffre n’est ajouté : les nombres des textes
     (1 g d’oxygène, presque 4 g de rouille ; flux d’oxygène du PER ; électrode changée tous les 6 ans) sont ceux de la fiche. */
  const fr = (n, d = 2) => Number(n).toFixed(d).replace(".", ",");
  const ROUILLE_PAR_G_OXYGENE = 4;   /* « un gramme d’oxygène peut conduire à produire presque quatre grammes de rouille » : ordre de grandeur */
  const retour = { href: "../qualite-eau/index.html?line=E", label: "Station suivante : qualité de l’eau" };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 20}" font-weight="${o.w || 400}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.style ? ` style="${o.style}"` : ""}>${esc(s)}</text>`;
  const r = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 10}" fill="${o.fond || "#fffdf8"}" stroke="${o.trait || "#1b3a63"}" stroke-opacity="${o.op ?? 0.28}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
  const shell = (id, titre, desc, corps) => `<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-t ${id}-d" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif"><title id="${id}-t">${esc(titre)}</title><desc id="${id}-d">${esc(desc)}</desc><rect x="6" y="6" width="708" height="408" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>${corps}</svg>`;
  const filigrane = (el) => { const svg = el.querySelector("svg"); if (svg && window.HydroEcoulement) window.HydroEcoulement.brancher(svg, { tubes: [] }); };

  /* ---------- scène 1 : trois origines, une cause principale, des effets ---------- */
  function sceneOrigines() {
    const o = [
      { nom: "Rouille", l1: "parties en acier", l2: "dans l’eau avec oxygène", principale: true },
      { nom: "Tartre", l1: "qui ne se dissout", l2: "pas dans l’eau", principale: false },
      { nom: "Éléments organiques", l1: "algues, bactéries", l2: "", principale: false }
    ];
    let g = "";
    o.forEach((c, i) => {
      const x = 24 + i * 232;
      g += r(x, 24, 216, 138, { op: 1, sw: c.principale ? 6 : 2.5, fond: c.principale ? "#fff4e0" : "#fffdf8", trait: c.principale ? "#c9451a" : "#1b3a63" })
        + t(x + 108, 66, c.nom, { w: 800, anchor: "middle", size: 22 }) + t(x + 108, 100, c.l1, { anchor: "middle" }) + t(x + 108, 126, c.l2, { anchor: "middle" })
        + (c.principale ? t(x + 108, 152, "cause principale", { w: 800, anchor: "middle", size: 19, style: "fill:#c9451a" }) : "");
    });
    g += t(360, 196, "↓", { size: 28, anchor: "middle", w: 800 })
      + r(160, 208, 400, 70, { op: 1, fond: "#f3f7fb" }) + t(360, 238, "LES BOUES", { size: 22, w: 800, anchor: "middle" }) + t(360, 264, "particules en suspension ou déposées", { anchor: "middle", size: 19 })
      + t(360, 304, "↓", { size: 28, anchor: "middle", w: 800 })
      + r(24, 316, 672, 84, { op: 1, trait: "#c0392b", fond: "#fbe7e4", dash: "9 6" }) + t(44, 350, "Pompes et organes d’équilibrage perturbés, circuit obturé.", { w: 700 }) + t(44, 380, "L’équilibre de toute l’installation est en cause.");
    return shell("emb-d1", "Les trois origines des boues", "Trois origines : la rouille des parties en acier (cause principale), le tartre qui ne se dissout pas, les éléments organiques comme les algues et bactéries. Elles forment les boues, particules en suspension ou déposées. Effets : pompes et organes d’équilibrage perturbés, circuit obturé.", g);
  }

  /* ---------- scène 2 : l’oxygène et la rouille ---------- */
  function sceneOxygene(o2) {
    const rouille = o2 * ROUILLE_PAR_G_OXYGENE, ech = 24;
    let g = t(24, 44, `Oxygène entré : ${fr(o2, 1)} g`, { w: 800, size: 22 }) + `<rect x="24" y="54" width="${(o2 * ech).toFixed(1)}" height="34" fill="#3d7fca"/>`
      + t(24, 134, `Rouille formée : près de ${fr(rouille, 0)} g`, { w: 800, size: 22 }) + `<rect x="24" y="144" width="${(rouille * ech).toFixed(1)}" height="34" fill="#c9451a"/>`
      + r(24, 214, 672, 186, { op: 1, fond: "#f3f7fb" }) + t(44, 248, "D’où vient l’oxygène ?", { w: 800, size: 21 })
      + t(44, 282, "• de l’eau neuve du remplissage et de la vidange") + t(44, 312, "• de la paroi de certains tubes plastiques : plus l’eau est chaude,") + t(60, 340, "plus l’oxygène passe") + t(44, 372, "• les tubes en cuivre sont étanches à l’oxygène");
    return shell("emb-d2", "Oxygène entré et rouille formée", `Pour ${fr(o2, 1)} g d’oxygène, près de ${fr(rouille, 0)} g de rouille. L’oxygène vient de l’eau neuve du remplissage et de la vidange et de la paroi de certains tubes plastiques ; le cuivre est étanche à l’oxygène.`, g);
  }

  /* ---------- scène 3 : ce que font les boues (la pompe et la vanne sont des symboles de la bibliothèque) ---------- */
  function sceneEffets() {
    let g = r(24, 24, 216, 286, { op: 1 }) + `<image href="assets/pompe_debit_variable.svg" x="82" y="48" width="100" height="117"/>` + t(132, 202, "Pompe", { w: 800, anchor: "middle", size: 22 }) + t(132, 232, "(circulateur)", { anchor: "middle" }) + t(132, 270, "perturbée", { anchor: "middle", w: 700 })
      + r(252, 24, 216, 286, { op: 1 }) + `<image href="assets/vanne_manuelle.svg" x="294" y="84" width="132" height="66"/>` + t(360, 202, "Organe", { w: 800, anchor: "middle", size: 22 }) + t(360, 232, "d’équilibrage", { anchor: "middle" }) + t(360, 270, "perturbé", { anchor: "middle", w: 700 })
      + r(480, 24, 216, 286, { op: 1, trait: "#c0392b", dash: "9 6" }) + t(588, 120, "Circuit", { w: 800, anchor: "middle", size: 22 }) + t(588, 152, "obturé", { w: 800, anchor: "middle", size: 22 }) + t(588, 200, "dans le pire", { anchor: "middle" }) + t(588, 228, "des cas", { anchor: "middle" })
      + r(24, 328, 672, 72, { op: 1, fond: "#f3f7fb" }) + t(44, 358, "L’équilibre thermo-hydraulique de toute l’installation", { w: 700 }) + t(44, 386, "est mis en cause (fiche n° 6 du Centre du Cuivre).");
    return shell("emb-d3", "Ce que font les boues dans un circuit", "Trois effets : la pompe est perturbée, l’organe d’équilibrage est perturbé, et dans le pire des cas le circuit est obturé. L’équilibre thermo-hydraulique de toute l’installation est mis en cause.", g);
  }

  /* ---------- scène 4 : les cinq remèdes et leur limite ---------- */
  const REMEDES = [
    ["Rinçage périodique", "apporte de l’oxygène neuf", "(vidange, eau de remplissage)"],
    ["Inhibiteur de corrosion", "film protecteur sur le métal :", "concentration à surveiller"],
    ["Échangeur inoxydable", "sépare les deux circuits ; coûteux,", "perte d’énergie à l’échange"],
    ["Séparation mécanique", "désemboueur en dérivation ;", "boues dans un réservoir à vider"],
    ["Électrode en magnésium", "consomme l’oxygène dissous ;", "électrode changée tous les 6 ans"]
  ];
  function sceneRemedes() {
    let g = "";
    REMEDES.forEach(([nom, l1, l2], i) => {
      const y = 14 + i * 79;
      g += r(20, y, 280, 72) + r(312, y, 388, 72) + t(34, y + 44, nom, { w: 800, size: 21 }) + t(326, y + 30, l1, { size: 19 }) + t(326, y + 56, l2, { size: 19 });
    });
    return shell("emb-d4", "Cinq remèdes à l’embouage et leur limite", "Cinq remèdes : rinçage périodique (apporte de l’oxygène neuf), inhibiteur de corrosion (concentration à surveiller), échangeur inoxydable (coûteux, perte d’énergie), séparation mécanique par désemboueur en dérivation (boues dans un réservoir), électrode en magnésium (consomme l’oxygène, changée tous les 6 ans).", g);
  }

  /* ---------- scène 5 : un filtre qu’on peut isoler (symboles de la bibliothèque : vanne manuelle, filtre hydraulique) ---------- */
  function sceneFiltre() {
    let g = `<rect x="24" y="190" width="672" height="12" fill="#9fbfe6" stroke="#1b3a63" stroke-width="2"/>`
      + t(24, 150, "→ sens de l’eau", { w: 700 })
      + `<image href="assets/vanne_manuelle.svg" x="110" y="168" width="104" height="52"/>`
      + `<image href="assets/filtre_hydraulique.svg" x="306" y="158" width="108" height="77"/>`
      + `<image href="assets/vanne_manuelle.svg" x="506" y="168" width="104" height="52"/>`
      + r(90, 236, 144, 36, { op: 0.5 }) + t(162, 261, "Robinet", { anchor: "middle", w: 700 })
      + r(250, 244, 220, 36, { op: 0.5 }) + t(360, 269, "Filtre ou pot à boues", { anchor: "middle", w: 700 })
      + r(486, 236, 144, 36, { op: 0.5 }) + t(558, 261, "Robinet", { anchor: "middle", w: 700 })
      + t(360, 318, "↓ boues retenues : vidange", { anchor: "middle", w: 700 })
      + r(24, 336, 672, 66, { op: 1, fond: "#f3f7fb" }) + t(44, 364, "Un robinet de chaque côté : le filtre s’isole et s’entretient.", { w: 700 }) + t(44, 390, "Vérifier qu’il convient au fluide, à la pression et à la température.", { size: 19 });
    return shell("emb-d5", "Un filtre isolable par deux robinets", "Sur une tuyauterie, de gauche à droite : un robinet d’isolement, un filtre qui retient les boues, un second robinet d’isolement. Sous le filtre, une vidange évacue les boues retenues.", g);
  }

  /* ---------- les cinq étapes ---------- */
  window.STATION_CONFIG = {
    code: "E7+a", id: "embouage", title: "Embouage et désembouage : boues, filtre, pot à boues",
    next: "passer à la qualité de l’eau", suite: retour,
    levels: {
      CAP: { objective: "Reconnaître des boues et le filtre d’un circuit.", assessment: "nommer l’embouage et un organe qui retient les boues" },
      TP: { objective: "Expliquer d’où viennent les boues et choisir un remède avec sa limite.", assessment: "relier cause, effet et remède sans oublier la limite du remède" },
      BTS: { objective: "Comparer les remèdes et justifier leur limite.", assessment: "choisir et justifier un traitement de l’embouage" }
    },
    steps: [
      {
        short: "Les boues", kicker: "repérer", title: "D’où viennent les boues d’un circuit ?",
        text: "Les boues sont des particules qui ne se dissolvent pas dans l’eau. Elles restent en suspension ou se déposent le long des tuyaux. L’embouage, c’est cet encrassement du circuit.",
        cap: "Nommez les trois origines des boues.",
        tp: "Dites quelle est la cause principale et pourquoi.",
        bts: "Expliquez pourquoi un circuit qui reçoit de l’oxygène s’embooue, même s’il est fermé.",
        narration: "Un circuit de chauffage peut s’encrasser de l’intérieur : c’est l’embouage. Les boues sont des particules qui ne se dissolvent pas dans l’eau. Elles restent en suspension, ou se déposent le long des tuyaux. Elles ont trois origines : la rouille des parties en acier, des particules de tartre qui ne se dissolvent pas, et des éléments vivants comme les algues. La cause principale est la rouille : l’acier rouille quand l’eau contient de l’oxygène dissous. Les désordres sont considérables : les pompes et les organes d’équilibrage se perturbent, et le circuit peut se boucher. Dans cette station, vous allez voir d’où vient l’oxygène, ce qu’il fait, et comment on s’en défend.",
        scene: sceneOrigines, wire: filigrane,
        equivalent: () => "Trois origines des boues : la rouille des parties en acier (cause principale), le tartre insoluble, les éléments organiques. Effets : pompes et organes d’équilibrage perturbés, circuit obturé.",
        action: {
          type: "choice", prompt: "Quelle est la cause principale de l’embouage d’un circuit de chauffage ?",
          options: [{ label: "La rouille des parties en acier, avec l’oxygène dissous" }, { label: "Le sel contenu dans l’eau" }, { label: "L’usure du circulateur" }, { label: "La chaleur de l’eau, seule" }], correct: 0,
          explain: "La cause principale est la présence de parties en acier qui rouillent dans une eau contenant de l’oxygène dissous. Les deux autres origines sont le tartre insoluble et les éléments d’origine organique (algues, bactéries)."
        }
      },
      {
        short: "Oxygène", kicker: "comprendre", title: "Un peu d’oxygène fait beaucoup de rouille",
        text: "L’acier rouille quand l’eau contient de l’oxygène dissous. Un gramme d’oxygène peut produire presque quatre grammes de rouille. La rouille ne se dissout pas : elle s’accumule le long des tuyaux.",
        cap: "Retenez : l’oxygène fait rouiller l’acier.",
        tp: "Estimez la rouille formée pour une quantité d’oxygène donnée.",
        bts: "Certains tubes plastiques sans barrière laissent passer l’oxygène : environ 3 g par m² de paroi et par jour à 20 °C, plus de 8 g à 40 °C, près de 40 g à 80 °C (fiche n° 6).",
        narration: "L’oxygène est le point de départ. Quand l’eau en contient, l’acier rouille. Et il en faut très peu : un gramme d’oxygène peut produire presque quatre grammes de rouille. Cette rouille ne se dissout pas dans l’eau. Elle s’accumule le long des tuyaux : ce sont les boues. Un circuit fermé devrait être à l’abri, mais l’oxygène entre quand on remplit ou qu’on vide le circuit avec de l’eau neuve. Il passe aussi à travers la paroi de certains tubes plastiques, de plus en plus quand l’eau est chaude. Les tubes en cuivre, eux, sont étanches à l’oxygène. Faites glisser le curseur : plus d’oxygène entre, plus la rouille augmente.",
        scene: sceneOxygene, wire: filigrane,
        equivalent: (o2) => `Pour ${fr(o2, 1)} g d’oxygène, près de ${fr(o2 * ROUILLE_PAR_G_OXYGENE, 0)} g de rouille (ordre de grandeur de la fiche : presque 4 g de rouille pour 1 g d’oxygène).`,
        action: {
          type: "range", prompt: "Faites varier la quantité d’oxygène entrée dans le circuit.", label: "Oxygène entré (g)", min: 0.5, max: 5, step: 0.5, value: 1,
          evaluate: (o2) => ({ readout: `${fr(o2, 1)} g`, observation: `${fr(o2, 1)} g d’oxygène donnent près de ${fr(o2 * ROUILLE_PAR_G_OXYGENE, 0)} g de rouille. Elle ne se dissout pas : elle se dépose dans les tuyaux.` })
        }
      },
      {
        short: "La chaîne", kicker: "comprendre", title: "De l’oxygène au circuit bouché",
        text: "Une cause en entraîne une autre. Les effets sont à l’écran : retrouvez l’ordre, de l’entrée d’oxygène jusqu’à ces effets.",
        cap: "Cliquez les causes dans l’ordre, la première en premier.",
        tp: "Retrouvez l’ordre sans aide, puis expliquez-le à voix haute.",
        bts: "Dites à quelle étape un remède agit : consommer l’oxygène, retenir les particules, ou changer l’eau.",
        narration: "Regardez les trois effets à l’écran : la pompe perturbée, l’organe d’équilibrage perturbé, le circuit obturé. Ils arrivent à la fin d’une chaîne. Au début, il y a de l’oxygène qui entre dans l’eau du circuit. Il fait rouiller l’acier des chaudières et des parties en fer. La rouille se détache en particules qui ne se dissolvent pas. Ces particules s’accumulent dans les canalisations : ce sont les boues. Et ce sont elles qui perturbent les pompes et les organes d’équilibrage. À vous de remettre les cinq causes dans l’ordre, en cliquant la première en premier. Vous pouvez aussi afficher la solution.",
        scene: sceneEffets, wire: filigrane,
        equivalent: () => "Trois effets des boues : pompe perturbée, organe d’équilibrage perturbé, circuit obturé dans le pire des cas. L’équilibre thermo-hydraulique de toute l’installation est en cause.",
        action: {
          type: "sequence", prompt: "Cliquez les cinq causes dans l’ordre, de la première à la dernière.",
          items: ["La rouille se détache en particules qui ne se dissolvent pas", "Pompes et organes d’équilibrage sont perturbés", "De l’oxygène entre dans l’eau du circuit", "Les particules s’accumulent dans les tuyaux : ce sont les boues", "L’acier des chaudières et des parties en fer rouille"],
          correctOrder: [2, 4, 0, 3, 1],
          explain: "L’oxygène fait rouiller l’acier ; la rouille se détache en particules qui ne se dissolvent pas ; elles s’accumulent en boues ; les boues perturbent les pompes et les organes d’équilibrage. Chaque remède agit sur un maillon de cette chaîne."
        }
      },
      {
        short: "Remèdes", kicker: "décider", title: "Cinq façons de traiter l’embouage",
        text: "Désembouer, c’est enlever les boues d’un circuit. Aucun remède ne prévient l’embouage : tous le traitent quand il existe déjà. Chacun a une limite.",
        cap: "Retenez le nom des cinq remèdes.",
        tp: "Choisissez un remède et dites sa limite.",
        bts: "Justifiez un choix entre rinçage, inhibiteur et séparation mécanique pour une installation donnée.",
        narration: "Il existe cinq grands moyens de traiter l’embouage. Le rinçage vide le circuit et le remplit d’eau neuve, mais cette eau apporte de l’oxygène neuf. L’inhibiteur de corrosion forme un film protecteur sur le métal, à condition de surveiller sa concentration. L’échangeur inoxydable sépare les deux circuits, mais il coûte cher et fait perdre de l’énergie. La séparation mécanique, c’est un désemboueur branché en dérivation : les boues sont récupérées dans un réservoir qu’on vide. Enfin, l’électrode en magnésium consomme l’oxygène dissous. Tous ces remèdes traitent l’embouage, aucun ne l’empêche. Lisez les limites, puis répondez à la question.",
        scene: sceneRemedes, wire: filigrane,
        equivalent: () => "Cinq remèdes et leur limite : rinçage (oxygène neuf), inhibiteur (concentration à surveiller), échangeur inoxydable (coûteux), séparation mécanique (boues à vider), électrode en magnésium (changée tous les 6 ans).",
        action: {
          type: "choice", prompt: "Quel remède apporte lui-même de l’oxygène neuf dans le circuit ?",
          options: [{ label: "Le rinçage : on vide, on remplit d’eau neuve" }, { label: "L’inhibiteur de corrosion" }, { label: "L’électrode en magnésium" }, { label: "Le désemboueur en dérivation" }], correct: 0,
          explain: "Le rinçage a un défaut : l’air entre au moment de la vidange et l’eau de remplissage apporte de l’oxygène neuf. C’est une nouvelle source d’embouage. Le rinçage initial, à la mise en service, reste pourtant toujours nécessaire : il chasse les corps étrangers."
        }
      },
      {
        short: "Entretien", kicker: "décider", title: "Un filtre ou un pot à boues, posé pour l’entretien",
        text: "Un pot à boues (ou désemboueur) retient les boues qui circulent ; un filtre à tamis fait de même. Il faut les vider ou les nettoyer : on doit pouvoir les isoler du circuit.",
        cap: "Repérez le filtre et les deux robinets.",
        tp: "Dites pourquoi il y a un robinet de chaque côté.",
        bts: "Choisissez le filtre selon le fluide, la pression et la température du circuit (notice du filtre).",
        narration: "Un filtre ou un pot à boues retient les boues qui circulent dans le circuit. Il est utile s’il est entretenu : il se vide, ou se nettoie, par une chasse. Pour le faire sans arrêter toute l’installation, on doit pouvoir l’isoler. On place donc un robinet de chaque côté, comme sur le dessin. La notice d’un filtre à tamis demande de prévoir assez de robinets pour isoler les tronçons et faciliter l’entretien. Elle demande aussi de vérifier que le filtre convient au fluide, à la pression et à la température du circuit. Le filtre n’empêche pas l’embouage : il retient les boues déjà formées. Répondez à la question pour terminer.",
        scene: sceneFiltre, wire: filigrane,
        equivalent: () => "Tuyauterie avec, de gauche à droite : un robinet d’isolement, un filtre, un second robinet d’isolement ; vidange sous le filtre pour les boues retenues.",
        action: {
          type: "choice", prompt: "Pourquoi poser un robinet de chaque côté du filtre ?",
          options: [{ label: "Pour l’isoler et l’entretenir sans vider tout le circuit" }, { label: "Pour faire monter la pression dans le filtre" }, { label: "Pour augmenter le débit du circuit" }, { label: "Pour remplacer l’inhibiteur" }], correct: 0,
          explain: "Un filtre se vide ou se nettoie : avec un robinet de chaque côté, on l’isole sans vider tout le circuit. La notice demande de prévoir assez de robinets pour isoler les tronçons et faciliter l’entretien."
        }
      }
    ]
  };
})();
