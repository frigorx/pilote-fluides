(() => {
  "use strict";

  /* Station « Adoucisseur, inhibiteur, qualité de l’eau d’un circuit » (satellite E7+b, Bac MFER 2028, S4.3.4).
     Sources : cours « L’adoucisseur » et TP adoucisseur (fonds CAP IFCA de F. Henninot : classes de dureté, 1 °f = 10 mg/L,
     régénération, dureté résiduelle de 7 à 10 °f) ; fiches techniques n° 2 (traitements de l’eau), n° 6 (embouage : inhibiteurs)
     et n° 12 (caractéristiques physico-chimiques : TH, pH) du Centre du Cuivre. Aucune valeur de pH ni de concentration
     d’inhibiteur n’est donnée : le fonds n’en source aucune, la station renvoie à la notice. */
  const fr = (n, d = 2) => Number(n).toFixed(d).replace(".", ",");
  const MG_PAR_DEGRE = 10;                                           /* 1 °f = 1 °TH = 10 mg de calcium et de magnésium par litre (cours) */
  const CLASSES = [[0, 6, "très douce"], [6, 15, "douce"], [15, 25, "moyennement dure"], [25, 40, "très dure"]];   /* bornes du cours : 6, 15, 25 °f */
  /* Le tableau du cours donne les bornes 6, 15 et 25 °f sans dire à quelle classe appartient la valeur exacte : on le dit tel quel. */
  const BORNES = CLASSES.slice(1).map(([a]) => a);
  const classeDe = (th) => {
    const i = BORNES.indexOf(th);
    if (i >= 0) return `à la limite entre ${CLASSES[i][2]} et ${CLASSES[i + 1][2]}`;
    return CLASSES.find(([a, b]) => th > a && th < b || th === a && a === 0)[2];
  };
  const RESIDUELLE = [7, 10];                                        /* dureté résiduelle souhaitable, en °f (cours) */
  const retour = { href: "../../lignes/E/parcours.html?evaluation=1", label: "Évaluation finale de la ligne E" };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 20}" font-weight="${o.w || 400}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.style ? ` style="${o.style}"` : ""}>${esc(s)}</text>`;
  const r = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 10}" fill="${o.fond || "#fffdf8"}" stroke="${o.trait || "#1b3a63"}" stroke-opacity="${o.op ?? 0.28}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
  const shell = (id, titre, desc, corps) => `<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-t ${id}-d" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif"><title id="${id}-t">${esc(titre)}</title><desc id="${id}-d">${esc(desc)}</desc><rect x="6" y="6" width="708" height="408" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>${corps}</svg>`;
  const filigrane = (el) => { const svg = el.querySelector("svg"); if (svg && window.HydroEcoulement) window.HydroEcoulement.brancher(svg, { tubes: [] }); };

  /* ---------- la règle graduée de dureté (0 à 40 °f), commune aux scènes 1 et 4 ---------- */
  const X0 = 36, LARG = 648, TMAX = 40, px = (th) => X0 + Math.min(th, TMAX) / TMAX * LARG;
  function regle(th, y, bande) {
    let g = "";
    CLASSES.forEach(([a, b, nom]) => {
      const mots = nom.split(" ");
      g += r(px(a), y, px(b) - px(a), 76, { rx: 0, op: 0.6, fond: "#f3f7fb" });
      mots.forEach((m, k) => { g += t((px(a) + px(b)) / 2, y + (mots.length === 1 ? 44 : 32 + k * 26), m, { anchor: "middle", size: 19, w: 700 }); });
    });
    if (bande) g += `<rect x="${px(bande[0]).toFixed(1)}" y="${y + 80}" width="${(px(bande[1]) - px(bande[0])).toFixed(1)}" height="14" fill="#1e7e54"/>`;
    [0, 6, 15, 25, 40].forEach((v) => { g += t(px(v), y + 118, String(v), { anchor: "middle", size: 19 }); });
    g += t(px(th), y - 14, "▼", { anchor: "middle", size: 26, w: 800, style: "fill:#c9451a" });
    return g;
  }

  /* ---------- scène 1 : la dureté et ses classes ---------- */
  function sceneDurete(th) {
    const bulle = Math.min(Math.max(px(th), 110), 610);
    const g = r(bulle - 90, 14, 180, 44, { op: 1, trait: "#c9451a", fond: "#fff4e0" }) + t(bulle, 44, `TH = ${th} °f`, { anchor: "middle", w: 800, size: 22 })
      + regle(th, 130, null)
      + t(36, 286, `${th} °f ≈ ${th * MG_PAR_DEGRE} mg de calcium et de magnésium par litre`, { w: 700 })
      + t(36, 320, `Cette eau est ${classeDe(th)}.`, { size: 24, w: 800 })
      + t(36, 354, "Classes : cours « L’adoucisseur », bornes 6, 15 et 25 °f.", { size: 19, style: "fill:#637285" })
      + t(36, 380, "Le cours ne classe pas les valeurs exactes 6, 15 et 25.", { size: 19, style: "fill:#637285" });
    return shell("qe-d1", "Dureté de l’eau et classes", `Règle graduée de 0 à 40 degrés français : très douce jusqu’à 6, douce de 6 à 15, moyennement dure de 15 à 25, très dure au-delà. Pour ${th} °f, l’eau est ${classeDe(th)} ; ${th} °f correspondent à environ ${th * MG_PAR_DEGRE} mg de calcium et de magnésium par litre.`, g);
  }

  /* ---------- scène 2 : où se dépose le tartre ---------- */
  function sceneTartre() {
    const lignes = [
      ["Résistance du chauffe-eau", "le tartre s’y dépose"],
      ["Échangeur à plaques", "il se bouche très vite"],
      ["Mousseur de robinet", "il s’obture peu à peu"],
      ["Tuyau en acier galvanisé", "oui ; cuivre : peu ; plastique : non"]
    ];
    let g = "";
    lignes.forEach(([nom, dit], i) => { const y = 14 + i * 72; g += r(20, y, 330, 64) + r(362, y, 338, 64) + t(34, y + 40, nom, { w: 800, size: 21 }) + t(376, y + 40, dit, { size: 19 }); });
    g += r(20, 312, 680, 90, { op: 1, fond: "#fff4e0", trait: "#c9451a" }) + t(40, 348, "Le tartre se dépose surtout là où l’eau est chauffée.", { w: 800, size: 21 }) + t(40, 380, "Plus l’eau est dure et chaude, plus le dépôt est probable.");
    return shell("qe-d2", "Où se dépose le tartre", "Quatre endroits : la résistance d’un chauffe-eau, l’échangeur à plaques qui se bouche très vite, le mousseur d’un robinet, le tuyau en acier galvanisé (peu dans le cuivre, pas du tout dans le plastique). Le tartre se dépose surtout là où l’eau est chauffée.", g);
  }

  /* ---------- scène 3 : le cycle de l’adoucisseur ---------- */
  function sceneAdoucisseur() {
    const cartes = [
      ["SERVICE", ["L’eau dure traverse la résine.", "Calcium et magnésium captés,", "sodium libéré : l’eau sort", "douce (0 °f)."]],
      ["1 · DÉTASSAGE", ["De l’eau traverse la résine", "dans le sens inverse", "du service."]],
      ["2 · SAUMURAGE", ["La saumure du bac à sel passe", "dans la résine : calcium et", "magnésium partent à l’égout."]],
      ["3 · RINÇAGE", ["De l’eau chasse les restes", "de saumure vers l’égout."]]
    ];
    let g = "";
    cartes.forEach(([titre, lignes], i) => {
      const x = 20 + (i % 2) * 350, y = 14 + Math.floor(i / 2) * 200;
      g += r(x, y, 330, 188, { op: 1, trait: i === 0 ? "#3d7fca" : "#1b3a63", sw: i === 0 ? 4 : 2.5 }) + t(x + 16, y + 40, titre, { w: 800, size: 22 });
      lignes.forEach((l, k) => { g += t(x + 16, y + 78 + k * 28, l, { size: 19 }); });
    });
    return shell("qe-d3", "Le cycle d’un adoucisseur", "Quatre cartes : le service (la résine capte calcium et magnésium et libère du sodium, l’eau sort douce) puis la régénération en trois temps : détassage (eau en sens inverse), saumurage (saumure du bac à sel), rinçage (chasse des restes de saumure).", g);
  }

  /* ---------- scène 4 : le mélange du by-pass ---------- */
  const thMelange = ({ th, by }) => th * by / 100;
  function sceneBypass(v) {
    const m = thMelange(v), ok = m >= RESIDUELLE[0] && m <= RESIDUELLE[1];
    let g = r(20, 14, 316, 76, { op: 1, trait: "#3d7fca" }) + t(178, 46, "Eau adoucie : 0 °f", { anchor: "middle", w: 800, size: 21 }) + t(178, 76, `${100 - v.by} % du débit`, { anchor: "middle" })
      + t(358, 60, "+", { anchor: "middle", size: 30, w: 800 })
      + r(380, 14, 320, 76, { op: 1, trait: "#c9451a" }) + t(540, 46, `Eau dure (by-pass) : ${v.th} °f`, { anchor: "middle", w: 800, size: 21 }) + t(540, 76, `${v.by} % du débit`, { anchor: "middle" })
      + r(190, 110, 340, 54, { op: 1, fond: ok ? "#e3f5ec" : "#fff4e0", sw: ok ? 5 : 3, trait: ok ? "#1e7e54" : "#b06a00" }) + t(360, 146, `Mélange : ${fr(m, 1)} °f`, { anchor: "middle", w: 800, size: 24 })
      + regle(m, 224, RESIDUELLE)
      + t(36, 372, `Trait vert : ${RESIDUELLE[0]} à ${RESIDUELLE[1]} °f, dureté résiduelle souhaitable (cours « L’adoucisseur »).`, { size: 19 })
      + t(36, 398, ok ? "✓ Le mélange est dans la plage souhaitable." : m < RESIDUELLE[0] ? "✗ Trop doux : risque de corrosion." : "✗ Trop dur : le tartre peut revenir.", { size: 19, w: 700 });
    return shell("qe-d4", "Mélange d’eau adoucie et d’eau dure par le by-pass", `Eau adoucie à 0 °f (${100 - v.by} % du débit) et eau dure à ${v.th} °f (${v.by} % du débit) donnent un mélange à ${fr(m, 1)} °f. Plage souhaitable : ${RESIDUELLE[0]} à ${RESIDUELLE[1]} °f. ${ok ? "Le mélange est dans la plage." : m < RESIDUELLE[0] ? "Le mélange est trop doux." : "Le mélange est trop dur."}`, g);
  }

  /* ---------- scène 5 : trois mesures sur l’eau d’un circuit ---------- */
  function sceneCircuit() {
    const cartes = [
      ["TH", "dureté de l’eau", ["trop haute : tartre", "trop basse (eau adoucie", "à fond) : corrosion"]],
      ["pH", "acidité de l’eau", ["7 : neutre", "moins de 7 : acide", "plus de 7 : basique"]],
      ["Inhibiteur", "protège le métal", ["concentration à contrôler :", "trop peu, l’embouage", "se développe"]]
    ];
    let g = "";
    cartes.forEach(([nom, sous, lignes], i) => {
      const x = 24 + i * 232;
      g += r(x, 24, 216, 270, { op: 1 }) + t(x + 108, 66, nom, { w: 800, anchor: "middle", size: 24 }) + t(x + 108, 98, sous, { anchor: "middle", style: "fill:#637285" });
      lignes.forEach((l, k) => { g += t(x + 16, 150 + k * 34, l, { size: 19 }); });
    });
    g += r(24, 312, 672, 90, { op: 1, fond: "#f3f7fb" }) + t(44, 348, "Pas de valeur à retenir par cœur pour le pH et l’inhibiteur :", { w: 700 }) + t(44, 380, "la valeur à respecter se lit dans la notice de l’installation.");
    return shell("qe-d5", "Trois mesures sur l’eau d’un circuit", "Trois cartes : le TH (trop haut, tartre ; eau adoucie à fond, corrosion), le pH (7 neutre, moins de 7 acide, plus de 7 basique), l’inhibiteur (sa concentration se contrôle ; trop peu, l’embouage se développe). La valeur à respecter se lit dans la notice.", g);
  }

  /* ---------- les cinq étapes ---------- */
  window.STATION_CONFIG = {
    code: "E7+b", id: "qualite-eau", title: "Adoucisseur, inhibiteur, qualité de l’eau d’un circuit",
    next: "terminer la ligne E", suite: retour,
    levels: {
      CAP: { objective: "Dire ce qu’est la dureté de l’eau et à quoi sert un adoucisseur.", assessment: "nommer le TH et le tartre" },
      TP: { objective: "Suivre le cycle d’un adoucisseur et régler une dureté résiduelle.", assessment: "ordonner les phases et atteindre 7 à 10 °f au mélange" },
      BTS: { objective: "Justifier un traitement d’eau : adoucissement, dureté résiduelle, inhibiteur.", assessment: "choisir et justifier un réglage et une surveillance" }
    },
    steps: [
      {
        short: "Dureté", kicker: "repérer", title: "La dureté de l’eau : le TH",
        text: "La dureté (ou TH, titre hydrotimétrique) est la quantité de calcium et de magnésium dissous dans l’eau. Elle se mesure en degrés français (°f). Un °f vaut 10 mg de ces sels par litre. On mesure le TH pour savoir si l’eau entartre (trop dure) ou corrode (trop douce).",
        cap: "Lisez la classe d’une eau d’après son TH.",
        tp: "Classez une eau et dites à quoi sert la mesure du TH.",
        bts: "Citez l’instrument du TP (mallette de test TH) et le lien entre °f et mg par litre.",
        narration: "L’eau du réseau contient du calcium et du magnésium dissous. La quantité de ces sels s’appelle la dureté de l’eau, ou TH. On la mesure en degrés français : un degré correspond à 10 milligrammes de ces sels par litre. On mesure le TH pour savoir si l’eau entartre, quand elle est trop dure, ou si elle corrode, quand elle est trop douce. Le cours classe les eaux ainsi : jusqu’à 6 degrés, très douce ; de 6 à 15, douce ; de 15 à 25, moyennement dure ; au-delà de 25, très dure. Faites glisser le curseur et lisez la classe. La mesure se fait avec une mallette de test, selon sa notice.",
        scene: sceneDurete, wire: filigrane,
        equivalent: (th) => `Règle de dureté : à ${th} °f, l’eau est ${classeDe(th)} (environ ${th * MG_PAR_DEGRE} mg de calcium et de magnésium par litre).`,
        action: {
          type: "range", prompt: "Faites varier le TH de l’eau et lisez sa classe.", label: "TH de l’eau", min: 0, max: 40, step: 1, value: 12,
          evaluate: (th) => ({ readout: `${th} °f`, observation: `Une eau à ${th} °f est ${classeDe(th)} : environ ${th * MG_PAR_DEGRE} mg de calcium et de magnésium par litre.` })
        }
      },
      {
        short: "Tartre", kicker: "comprendre", title: "Le tartre : où se dépose-t-il ?",
        text: "Le calcaire se dépose quand l’eau est chauffée : c’est le tartre. Il entartre les résistances, les ballons, les échangeurs, et obture les mousseurs des robinets.",
        cap: "Citez deux endroits où le tartre se dépose.",
        tp: "Dites pourquoi on adoucit l’eau d’un circuit d’eau chaude.",
        bts: "Comparez les tuyaux : le tartre se dépose surtout dans l’acier galvanisé, peu dans le cuivre, pas dans le plastique.",
        narration: "Le tartre, c’est du calcaire qui se dépose. Il se dépose surtout là où l’eau est chauffée : sur la résistance d’un chauffe-eau, dans un ballon, dans un échangeur. Dans un échangeur à plaques, il se bouche très vite. Il obture aussi peu à peu les mousseurs des robinets. Dans les tuyaux, il se dépose surtout dans l’acier galvanisé, peu dans le cuivre, et pas du tout dans les tubes en plastique. Plus l’eau est dure et chaude, plus le dépôt est probable. C’est pour cela qu’on adoucit l’eau des circuits d’eau chaude. Répondez à la question : où le tartre se dépose-t-il surtout ?",
        scene: sceneTartre, wire: filigrane,
        equivalent: () => "Le tartre se dépose sur la résistance d’un chauffe-eau, dans un échangeur à plaques, sur un mousseur de robinet, dans un tuyau en acier galvanisé (peu dans le cuivre, pas dans le plastique) : surtout là où l’eau est chauffée.",
        action: {
          type: "choice", prompt: "Où le tartre se dépose-t-il surtout ?",
          options: [{ label: "Là où l’eau est chauffée" }, { label: "Dans l’eau froide, à l’arrivée" }, { label: "Dans les tubes en plastique" }, { label: "Dans les robinets fermés" }], correct: 0,
          explain: "Le tartre se dépose surtout là où l’eau est chauffée : résistances, ballons, échangeurs. Les tubes en plastique n’en reçoivent pas du tout, et le cuivre peu."
        }
      },
      {
        short: "Adoucisseur", kicker: "observer", title: "L’adoucisseur : service et régénération",
        text: "Une résine (de petites billes) capte le calcium et le magnésium et libère du sodium : l’eau sort douce. Quand la résine est saturée, on la régénère avec de la saumure, une eau saturée en sel.",
        cap: "Nommez les trois phases de la régénération.",
        tp: "Dites ce que fait la résine au service, puis au saumurage.",
        bts: "Règles du cours : une arrivée d’eau non traitée reste disponible ; un clapet de non-retour se place en amont ; l’évacuation de la saumure est déconnectée du réseau.",
        narration: "L’adoucisseur contient une bouteille de résine, en petites billes, un bac à sel, et une tête avec des vannes. Quand l’eau dure traverse la résine, celle-ci capte le calcium et le magnésium et libère du sodium : l’eau sort douce, à 0 degré. Mais la résine se sature. Il faut alors la régénérer, en trois temps. D’abord le détassage : de l’eau passe à l’envers. Ensuite le saumurage : la saumure, une eau saturée en sel, rend du sodium à la résine et chasse le calcium et le magnésium vers l’égout. Enfin le rinçage, qui chasse les restes de saumure. Répondez à la question sur le saumurage.",
        scene: sceneAdoucisseur, wire: filigrane,
        equivalent: () => "Quatre cartes : service (l’eau sort douce), puis régénération : 1 détassage, 2 saumurage, 3 rinçage.",
        action: {
          type: "choice", prompt: "Pendant le saumurage, que fait la résine ?",
          options: [{ label: "Elle libère calcium et magnésium et reprend du sodium" }, { label: "Elle capte le calcium et le magnésium" }, { label: "Elle rend l’eau plus dure" }, { label: "Elle ne fait rien : seul le bac à sel travaille" }], correct: 0,
          explain: "Au saumurage, la résine libère les ions calcium et magnésium et capte du sodium. L’eau chargée en calcium et en magnésium part à l’égout, et la résine est de nouveau prête à adoucir."
        }
      },
      {
        short: "Réglage", kicker: "régler", title: "Régler la dureté résiduelle",
        text: "Une eau adoucie à fond (0 °f) peut corroder les métaux. Le by-pass, un petit circuit réglable, renvoie un peu d’eau dure dans l’eau adoucie. On vise 7 à 10 °f. Le TH du mélange est le TH du réseau multiplié par la part d’eau dure.",
        cap: "Lisez si le mélange est trop doux, bon ou trop dur.",
        tp: "Trouvez une part de by-pass qui donne 7 à 10 °f.",
        bts: `Le TH du mélange est proportionnel à la part d’eau dure : TH obtenu = TH du réseau × part du by-pass.`,
        narration: "Une eau totalement adoucie, à 0 degré, peut faire corroder les métaux de l’installation. On préfère garder une dureté résiduelle. L’adoucisseur a pour cela un by-pass réglable : il renvoie un peu d’eau dure dans l’eau adoucie. Le cours conseille de régler cette dureté entre 7 et 10 degrés français. Le modèle est simple : l’eau adoucie est à 0 degré, l’eau dure garde son TH, et le mélange donne un TH proportionnel à la part d’eau dure. Réglez les deux curseurs : le TH de l’eau du réseau, puis la part du by-pass, et visez le trait marqué de 7 à 10 degrés sous la règle.",
        scene: sceneBypass, wire: filigrane,
        equivalent: (v) => `Mélange à ${fr(thMelange(v), 1)} °f : eau adoucie à 0 °f (${100 - v.by} %) et eau dure à ${v.th} °f (${v.by} %). Plage souhaitable : ${RESIDUELLE[0]} à ${RESIDUELLE[1]} °f.`,
        action: {
          type: "dual-range", prompt: "Réglez le TH du réseau et la part du by-pass.", note: "Faites varier les deux commandes : le mélange est recalculé.",
          controls: [{ id: "th", label: "TH de l’eau du réseau", min: 10, max: 40, step: 1, value: 25, unit: "°f" }, { id: "by", label: "Part d’eau dure (by-pass)", min: 0, max: 100, step: 5, value: 20, unit: "%" }],
          evaluate: (v) => {
            const m = thMelange(v);
            if (m < RESIDUELLE[0]) return { observation: `Mélange à ${fr(m, 1)} °f : trop doux, sous ${RESIDUELLE[0]} °f. Risque de corrosion : ouvrez un peu plus le by-pass.`, kind: "wrong" };
            if (m > RESIDUELLE[1]) return { observation: `Mélange à ${fr(m, 1)} °f : trop dur, au-dessus de ${RESIDUELLE[1]} °f. Le tartre peut revenir : fermez un peu le by-pass.`, kind: "wrong" };
            return { observation: `Mélange à ${fr(m, 1)} °f : dans la plage de ${RESIDUELLE[0]} à ${RESIDUELLE[1]} °f. Cette eau protège contre le tartre sans corroder.`, kind: "correct" };
          }
        }
      },
      {
        short: "Circuit", kicker: "décider", title: "Inhibiteur et qualité de l’eau d’un circuit",
        text: "Trois mesures décrivent l’eau d’un circuit : le TH, le pH (7 est neutre) et la concentration d’inhibiteur. Un inhibiteur forme un film protecteur sur un métal propre.",
        cap: "Nommez les trois mesures.",
        tp: "Dites ce qui arrive si l’inhibiteur n’est plus assez concentré.",
        bts: "Justifiez un plan de contrôle : quelle mesure, avec quel instrument, à quel moment (notice de l’installation).",
        narration: "Pour finir, trois mesures décrivent la qualité de l’eau d’un circuit. Le TH dit si l’eau est dure : trop dure, elle entartre ; trop adoucie, elle peut corroder. Le pH dit si l’eau est acide ou basique : 7 est neutre, moins de 7 acide, plus de 7 basique. Enfin, si le circuit est protégé par un inhibiteur de corrosion, il faut contrôler sa concentration. Un inhibiteur forme un film protecteur sur un métal propre. S’il n’y en a pas assez, l’embouage peut se développer et la corrosion s’accélérer sur les parties non protégées. Les valeurs à respecter se lisent dans la notice : on ne les devine pas.",
        scene: sceneCircuit, wire: filigrane,
        equivalent: () => "Trois mesures sur l’eau d’un circuit : TH, pH (7 neutre) et concentration d’inhibiteur. La valeur à respecter se lit dans la notice de l’installation.",
        action: {
          type: "choice", prompt: "Un circuit est protégé par un inhibiteur de corrosion. Que faut-il faire régulièrement ?",
          options: [{ label: "Contrôler la concentration de l’inhibiteur" }, { label: "Rien : le film protecteur dure toujours" }, { label: "En ajouter, sans mesurer" }, { label: "Vider le circuit chaque mois" }], correct: 0,
          explain: "La concentration d’inhibiteur doit être soigneusement surveillée. Si elle est insuffisante, l’embouage peut se développer et la corrosion s’accélérer sur les parties devenues non protégées."
        }
      }
    ]
  };
})();
