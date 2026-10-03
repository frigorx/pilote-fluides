/* =====================================================================
   depanneur-scene.js — la scène vivante du dépanneur (piste B : l'installation vue de l'atelier, 2,5D)
   ---------------------------------------------------------------------
   RÔLE : dessiner l'installation comme on la voit à l'atelier, en légère
   perspective cavalière (face de l'organe de front, dessus et côté gauche
   en profondeur) : la chambre froide ouverte sur l'avant (parois, porte,
   rayonnage et cartons, thermostat), l'évaporateur ventilé suspendu au
   plafond avec ses deux hélices, le mur traversé par les deux tubes isolés,
   et dehors le groupe de condensation sur sa console (condenseur à air et
   son hélice, bouteille de liquide, compresseur hermétique et ses vannes de
   service, pressostat). Les organes de la ligne liquide (filtre, voyant,
   détendeur et son bulbe) sont de vrais volumes. Le fluide se voit dans les
   tubes : vapeur BP bleue rapide, vapeur HP rouge rapide, liquide orange
   sombre lent (le condenseur passe du rouge à l'orange rang par rang),
   mélange bleu clair à bulles après le détendeur (l'évaporateur passe du
   bleu clair au bleu). La situation du cas se lit sur l'image : givre
   (aucun, fin, partiel côté entrée, en bloc), hélices qui tournent ou non,
   ailettes encrassées, bulles au voyant, aspiration givrée, compresseur
   qui vibre normalement ou faiblement, afficheur du thermostat. Puis les
   gestes du dépanneur, animés : manifold (flexible qui se branche, aiguille
   qui monte à la pression), thermomètre électronique pincé sur le tube
   (l'afficheur compte), pince ampèremétrique, main qui touche (halo).
   CE QUI EST RÉEMPLOYÉ : de la scène précédente, la logique des états
   (mêmes expressions régulières sur le cas), angle() et gauge() (échelle des
   petits cadrans = celle des grands cadrans à couronnes : BP −1 à 10 bar,
   HP −1 à 30 bar, de −135° à +135°), compter() (valeur finale aussi posée
   par minuterie, onglet caché), le thermomètre et la pince ampèremétrique.
   API : window.JR_SCENE_ATELIER.monter(conteneur, cas, inst, { bp, hp }) → objet
   { manifold(cote), thermo(point, valeur), pince(pct), toucher(point) }.
   Six points de relevé cliquables .sc-pt[data-pt] : bp, hp, tasp, tliq,
   tref, pince → événement « releve » (detail = le point) sur le conteneur.
   DÉPEND : rien (SVG + CSS : scene.css, règles « svg.scene »). Aucune image.
   ===================================================================== */
(function () {
  "use strict";
  const VB = { BP: [-1, 10], HP: [-1, 30] };
  const KX = 0.55, KY = 0.32;                         /* la profondeur part vers le haut et la gauche */
  const ST = ' stroke="#10233c" stroke-width="1.4" stroke-linejoin="round"';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const temp = t => (t < 0 ? "−" + (-t) : "" + t);
  const r1 = n => Math.round(n * 10) / 10;

  function angle(p, cote) { const [a, b] = VB[cote]; return -135 + 270 * (Math.min(b, Math.max(a, p)) - a) / (b - a); }

  /* centre des repères de relevé : partagé par le dessin, le thermomètre et la main */
  const CIBLE = { bp: [915, 440], hp: [867, 434], tasp: [606, 264], tliq: [546, 452], tref: [815, 352], pince: [944, 522] };
  /* où la sonde et le halo se posent (le tube lui-même) */
  const POSE = { tasp: [606, 264], tliq: [546, 452], tref: [815, 352], bp: [906, 400], hp: [858, 400] };

  /* ---------- petites briques de dessin ---------- */
  function poly(pts, fill, extra) {
    return '<polygon points="' + pts.map(p => r1(p[0]) + "," + r1(p[1])).join(" ") + '" fill="' + fill + '"' + (extra === undefined ? ST : extra) + '/>';
  }
  /* un volume : face de front (x,y,w,h), dessus et côté gauche en profondeur d */
  function vol(x, y, w, h, d, f, t, s, extra) {
    const dx = r1(d * KX), dy = r1(d * KY);
    return poly([[x, y], [x - dx, y - dy], [x - dx, y + h - dy], [x, y + h]], s, extra) +
      poly([[x, y], [x + w, y], [x + w - dx, y - dy], [x - dx, y - dy]], t, extra) +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '"' + (extra === undefined ? ST : extra) + '/>';
  }
  function ombre(x, yb, w, d) {
    const dx = d * KX, dy = d * KY;
    return poly([[x + 6, yb + 3], [x + w + 14, yb + 3], [x + w + 14 - dx, yb - dy + 3], [x - dx + 6, yb - dy + 3]], "rgba(16,35,60,.16)", "");
  }
  function cylV(x, y, w, h, ry, grad, haut) {            /* cylindre vertical : y = centre de l'ellipse du haut */
    const rx = w / 2, cx = x + rx;
    return '<path d="M' + x + " " + y + " V" + (y + h) + " A" + rx + " " + ry + " 0 0 0 " + (x + w) + " " + (y + h) + " V" + y + ' Z" fill="url(#' + grad + ')"' + ST + '/>' +
      '<ellipse cx="' + cx + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + haut + '"' + ST + '/>';
  }
  function lib(x, y, txt, cls) {
    const l = Array.isArray(txt) ? txt : [txt];
    return '<text x="' + x + '" y="' + y + '" class="sc-lib' + (cls ? " " + cls : "") + '">' +
      l.map((t, i) => '<tspan x="' + x + '" dy="' + (i ? 14 : 0) + '">' + esc(t) + "</tspan>").join("") + "</text>";
  }
  function mix(a, b, t) {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const A = p(a), B = p(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  }
  /* un tube : (gaine isolante ou cuivre nu) + fluide coloré + reflet + flux animé, dans le sens de l'écoulement du tracé */
  function tube(d, kind, gaine, givre, extra) {
    return '<g class="sc-tube ' + kind + (givre ? " givre" : "") + (extra ? " " + extra : "") + '">' +
      '<path class="' + (gaine ? "sc-gaine" : "sc-cuivre") + '" d="' + d + '"/>' +
      '<path class="sc-tuyau ' + kind + '" d="' + d + '"/><path class="sc-reflet" d="' + d + '"/>' +
      '<path class="sc-flux ' + kind + '" d="' + d + '"/></g>';
  }
  /* une hélice : carter, intérieur sombre, pales (groupe qui tourne), moyeu, grille par-dessus */
  function pale(cx, cy, r, ang) {
    const a = ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const p = (x, y) => r1(cx + x * c - y * s) + " " + r1(cy + x * s + y * c);
    return '<path d="M' + p(0, 0) + " C" + p(r * .12, -r * .3) + " " + p(r * .66, -r * .8) + " " + p(r * .26, -r * .95) + " C" + p(-r * .12, -r * .76) + " " + p(-r * .2, -r * .32) + " " + p(0, 0) + ' Z"/>';
  }
  function helice(cx, cy, r, tourne, pales) {
    let b = "", g = "";
    for (let i = 0; i < pales; i++) b += pale(cx, cy, r, i * 360 / pales);
    for (let i = 0; i < 4; i++) { const a = (i * 45 + 22) * Math.PI / 180; g += '<line x1="' + r1(cx - r * Math.cos(a)) + '" y1="' + r1(cy - r * Math.sin(a)) + '" x2="' + r1(cx + r * Math.cos(a)) + '" y2="' + r1(cy + r * Math.sin(a)) + '"/>'; }
    return '<g class="sc-fan">' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 4) + '" class="sc-fan-carter"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="sc-fan-fond"/>' +
      '<g class="sc-helice' + (tourne ? " tourne" : "") + '" style="transform-origin:' + cx + "px " + cy + 'px">' +
      (tourne ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * .94 + '" class="sc-fan-flou"/><g class="sc-ghost" transform="rotate(-24 ' + cx + " " + cy + ')">' + b + '</g><g class="sc-ghost" transform="rotate(-12 ' + cx + " " + cy + ')">' + b + "</g>" : "") + '<g class="sc-pales">' + b + '</g></g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * .17 + '" class="sc-fan-moyeu"/>' +
      '<g class="sc-grille"><circle cx="' + cx + '" cy="' + cy + '" r="' + r * .96 + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r * .62 + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r * .3 + '"/>' + g + '</g></g>';
  }
  /* les rangs de tube d'une batterie vue à travers les ailettes : serpentin, couleur du fluide rang par rang.
     Le rang 0 est le plus haut ; gd0 = vrai si le fluide le parcourt de gauche à droite. */
  function rangs(x0, x1, yHaut, yBas, n, coul, cls, gd0) {
    const p = (yBas - yHaut) / (n - 1), rb = p / 2;
    let o = "", c = "", fl = "";
    for (let i = 0; i < n; i++) {
      const y = r1(yHaut + i * p), col = coul(i, n), gd = (i % 2 === 0) === gd0;
      const d = gd ? "M" + x0 + " " + y + " H" + x1 : "M" + x1 + " " + y + " H" + x0;
      o += '<path d="' + d + '"/>'; c += '<path d="' + d + '" stroke="' + col + '"/>';
      fl += '<path class="sc-flux ' + cls(i, n) + '" d="' + d + '"/>';
      if (i < n - 1) {                                  /* coude de retour, du côté où le rang se termine */
        const fin = gd ? x1 : x0, b = "M" + fin + " " + y + " A" + rb + " " + rb + " 0 0 " + (gd ? 0 : 1) + " " + fin + " " + r1(y + p);
        o += '<path d="' + b + '"/>'; c += '<path d="' + b + '" stroke="' + col + '"/>';
      }
    }
    return '<g class="sc-rangs"><g class="sc-rang-o">' + o + '</g><g class="sc-rang-c">' + c + '</g>' + fl + '</g>';
  }
  function carton(x, y, w, h, d, tint) {
    return vol(x, y, w, h, d, tint[0], tint[1], tint[2], ' stroke="#7a5a33" stroke-width="1"') +
      '<rect x="' + (x + w / 2 - 3) + '" y="' + y + '" width="6" height="' + h + '" fill="#e8d5b0" opacity=".7"/>';
  }

  /* ---------- définitions : dégradés, motifs ---------- */
  function lin(id, x2, y2, stops) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + x2 + '" y2="' + y2 + '">' + stops.map(s => '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"/>').join("") + "</linearGradient>";
  }
  function defs() {
    return "<defs>" +
      lin("sc-g-noir", 1, 0, [[0, "#0e1216"], [.3, "#4b545f"], [.55, "#2b3239"], [1, "#0b0e11"]]) +
      lin("sc-g-bleu", 1, 0, [[0, "#3f5f82"], [.3, "#8fb0d2"], [.6, "#5a7ea4"], [1, "#2f4a68"]]) +
      lin("sc-g-laiton", 0, 1, [[0, "#f3cd8a"], [.5, "#d39a45"], [1, "#9a6a25"]]) +
      lin("sc-g-tole", 0, 1, [[0, "#f6f9fc"], [1, "#b5c2d1"]]) +
      lin("sc-g-voile", 1, 0, [[0, "rgba(255,255,255,0)"], [1, "rgba(255,255,255,.96)"]]) +
      lin("sc-g-fond", 0, 1, [[0, "#f3f7fb"], [1, "#dfe8f2"]]) +
      lin("sc-g-paroi", 1, 0, [[0, "#c7d5e4"], [1, "#e0e9f3"]]) +
      lin("sc-g-sol", 0, 1, [[0, "#d3dbe4"], [1, "#e9eef3"]]) +
      '<pattern id="sc-ailettes" width="4" height="8" patternUnits="userSpaceOnUse"><rect width="4" height="8" fill="#eaf0f6"/><rect width="1.3" height="8" fill="#a9b8ca"/></pattern>' +
      '<pattern id="sc-givre-pat" width="13" height="13" patternUnits="userSpaceOnUse"><rect width="13" height="13" fill="#ffffff" fill-opacity=".74"/><circle cx="3" cy="3" r="2" fill="#fff"/><circle cx="9.5" cy="7" r="1.6" fill="#dcecf8"/><circle cx="4" cy="10.5" r="1.4" fill="#cfe3f3"/><circle cx="11" cy="1.5" r="1.2" fill="#fff"/></pattern>' +
      '<pattern id="sc-saleté" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#7c6745" fill-opacity=".5"/><path d="M0 9 L9 0" stroke="#4e3f28" stroke-width="2.2" stroke-opacity=".55"/><circle cx="3" cy="3" r="1.4" fill="#a1916e"/></pattern>' +
      '<pattern id="sc-carreaux" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 0H40M0 0V40" stroke="#c4ced9" stroke-width="1" fill="none"/></pattern>' +
      '<clipPath id="sc-clip-voyant"><circle cx="408" cy="336" r="9.5"/></clipPath>' +
      '<clipPath id="sc-clip-evap"><rect x="130" y="246" width="190" height="106"/></clipPath>' +
      '<clipPath id="sc-clip-cond"><rect x="600" y="338" width="148" height="194"/></clipPath>' +
      "</defs>";
  }

  /* ---------- la chambre froide : parois, sol, porte, thermostat, rayonnage ---------- */
  function chambre(inst, c) {
    let s = "";
    /* tranche de la dalle */
    s += poly([[100, 556], [526, 556], [526, 574], [100, 574]], "#c9d1dc") + poly([[100, 556], [23, 511.2], [23, 529.2], [100, 574]], "#aab6c4");
    /* mur du fond + joints de panneaux + tranche gauche */
    s += '<rect x="23" y="171.2" width="400" height="340" fill="url(#sc-g-fond)"' + ST + "/>";
    for (let x = 123; x < 423; x += 100) s += '<line x1="' + x + '" y1="171.2" x2="' + x + '" y2="511.2" stroke="#c2cedb" stroke-width="1.6"/>';
    s += poly([[23, 171.2], [9.8, 163.5], [9.8, 503.5], [23, 511.2]], "#c3cedb");
    /* sol : résine claire, carreaux en perspective */
    s += poly([[100, 556], [500, 556], [423, 511.2], [23, 511.2]], "url(#sc-g-sol)");
    for (let i = 1; i < 8; i++) s += '<line x1="' + (100 + i * 50) + '" y1="556" x2="' + (23 + i * 50) + '" y2="511.2" stroke="#c9d3de" stroke-width="1"/>';
    for (let j = 1; j < 3; j++) { const t = j / 3; s += '<line x1="' + r1(100 - 77 * t) + '" y1="' + r1(556 - 44.8 * t) + '" x2="' + r1(500 - 77 * t) + '" y2="' + r1(556 - 44.8 * t) + '" stroke="#c9d3de" stroke-width="1"/>'; }
    /* paroi de droite, vue de l'intérieur : c'est elle que les tubes traversent */
    s += poly([[500, 556], [423, 511.2], [423, 171.2], [500, 216]], "url(#sc-g-paroi)");
    for (let t = .25; t < 1; t += .25) s += '<line x1="' + r1(500 - 77 * t) + '" y1="' + r1(216 - 44.8 * t) + '" x2="' + r1(500 - 77 * t) + '" y2="' + r1(556 - 44.8 * t) + '" stroke="#bccadb" stroke-width="1.6"/>';
    s += '<path d="M423 511.2 L500 556" stroke="#9fb0c4" stroke-width="3"/><path d="M23 511.2 H423" stroke="#9fb0c4" stroke-width="3"/>';
    /* porte isotherme : cadre inox, vantail, poignée à ouverture de sécurité */
    s += ombre(44, 511, 70, 6) +
      '<rect x="40" y="314" width="78" height="197" fill="#aab7c6"' + ST + "/>" +
      '<rect x="46" y="320" width="66" height="191" fill="#f4f7fa" stroke="#7f90a4" stroke-width="1.4"/>' +
      '<rect x="52" y="326" width="54" height="86" fill="none" stroke="#c9d3de" stroke-width="1.6"/>' +
      '<rect x="98" y="400" width="7" height="30" rx="3" fill="#5b6b7d"/><circle cx="101.5" cy="440" r="4" fill="#c0392b"/>' +
      '<rect x="40" y="338" width="6" height="14" fill="#7f90a4"/><rect x="40" y="470" width="6" height="14" fill="#7f90a4"/>';
    /* thermostat d'ambiance + afficheur */
    s += '<rect x="34" y="230" width="62" height="40" rx="6" fill="#1b3a63"' + ST + "/>" +
      '<rect x="40" y="236" width="50" height="22" rx="3" fill="#eaf2e6" stroke="#0f2440"/>' +
      '<text x="65" y="247.5" class="sc-lcd petit" id="sc-tchambre">' + esc(temp(c.tChambre !== undefined ? c.tChambre : 0)) + ' °C</text>' +
      '<circle cx="48" cy="264" r="2.4" fill="#84b7ec"/><circle cx="65" cy="264" r="2.4" fill="#e8914a"/><circle cx="82" cy="264" r="2.4" fill="#fffdf8"/>';
    /* rayonnage le long du mur du fond : montants, lisses, cartons */
    const lisses = [511, 475, 439];
    s += '<g class="sc-rayon">';
    [200, 306, 412].forEach(x => { s += '<rect x="' + (x - 2.5) + '" y="410" width="5" height="101" fill="#7f90a4" stroke="#4d5b6c" stroke-width=".8"/>'; });
    s += '<rect x="198" y="409" width="217" height="5" fill="#8d9db0" stroke="#4d5b6c" stroke-width=".8"/>';
    const K1 = ["#d9b27c", "#e8c995", "#bf9558"], K2 = ["#ccc3b3", "#e3dccd", "#a89f8e"], K3 = ["#e9d9bd", "#f4e9d3", "#c9b790"];
    [[207, 475, [[36, 32, K1], [30, 26, K2], [40, 30, K3], [36, 34, K1]]], [262, 439, [[34, 28, K3], [38, 32, K1], [30, 28, K2]]], [214, 439, [[40, 30, K2]]],
      [330, 475, [[44, 34, K1], [36, 28, K3]]], [336, 439, [[38, 30, K2], [30, 26, K1]]], [208, 511, [[46, 34, K3], [38, 28, K1], [44, 32, K2]]], [316, 511, [[40, 34, K2], [44, 30, K1], [30, 26, K3]]]].forEach(g => {
      let x = g[0];
      g[2].forEach(b => { s += carton(x, g[1] - b[1], b[0], b[1], 14, b[2]); x += b[0] + 3; });
    });
    lisses.forEach(y => { s += '<rect x="198" y="' + y + '" width="217" height="4" fill="#9aa9bb" stroke="#4d5b6c" stroke-width=".8"/>'; });
    s += "</g>";
    /* palette de cartons au premier plan */
    s += ombre(120, 548, 74, 40) + vol(120, 538, 74, 10, 40, "#c79a5d", "#dcb67f", "#a97d44", ' stroke="#6b4a2a" stroke-width="1"') +
      vol(126, 508, 30, 30, 26, "#d9b27c", "#e8c995", "#bf9558", ' stroke="#7a5a33" stroke-width="1"') + vol(160, 516, 28, 22, 26, "#e3dccd", "#f1ebdf", "#b9b09f", ' stroke="#7a5a33" stroke-width="1"');
    return s;
  }

  /* ---------- l'évaporateur ventilé, suspendu sous le plafond ---------- */
  function evaporateur(S) {
    let s = "";
    /* tiges de suspension */
    s += '<rect x="146" y="236" width="5" height="14" fill="#8793a2" stroke="#4d5b6c" stroke-width=".8"/><rect x="296" y="236" width="5" height="14" fill="#8793a2" stroke="#4d5b6c" stroke-width=".8"/>';
    /* bac de dégouttement */
    s += vol(124, 352, 202, 7, 46, "#c9d3de", "#e1e8f0", "#a9b6c5");
    /* caisson : face = batterie vue à travers les ailettes */
    s += vol(130, 246, 190, 106, 46, "url(#sc-ailettes)", "url(#sc-g-tole)", "#bcc8d6");
    s += '<g clip-path="url(#sc-clip-evap)">' +
      rangs(138, 312, 264, 336, 8, (i, n) => mix("#3d7fca", "#8fc4f2", i / (n - 1)), (i, n) => (i >= n - 3 ? "mel" : "bp"), true) + "</g>";
    /* givre sur la batterie, côté entrée = côté droit (distributeur) */
    if (S.givre === "fin") s += '<rect x="130" y="246" width="190" height="106" fill="url(#sc-givre-pat)" opacity=".62" class="sc-givre"/>';
    if (S.givre === "partiel") s += '<rect x="246" y="246" width="74" height="106" fill="url(#sc-givre-pat)" class="sc-givre"/><rect x="214" y="246" width="38" height="106" fill="url(#sc-g-voile)" opacity=".9" class="sc-givre"/>';
    if (S.givre === "bloc") {
      s += '<rect x="130" y="246" width="190" height="106" fill="url(#sc-givre-pat)" class="sc-givre"/><rect x="130" y="246" width="190" height="106" fill="#fff" opacity=".5" class="sc-givre"/>';
    }
    /* les deux hélices */
    s += helice(183, 299, 30, S.ventEvap, 5) + helice(267, 299, 30, S.ventEvap, 5);
    if (S.givre === "bloc") {
      /* le bloc : couronnes de glace autour des hélices, paquets de glace, côté et bac pris dans la glace, stalactites */
      s += '<rect x="130" y="246" width="190" height="106" fill="#f4fafe" opacity=".4" class="sc-givre"/>';
      s += '<circle cx="183" cy="299" r="36" fill="none" stroke="#fff" stroke-width="8" class="sc-givre"/><circle cx="267" cy="299" r="36" fill="none" stroke="#fff" stroke-width="8" class="sc-givre"/>' +
        '<circle cx="183" cy="299" r="41" fill="none" stroke="#bcd7ea" stroke-width="2" class="sc-givre"/><circle cx="267" cy="299" r="41" fill="none" stroke="#bcd7ea" stroke-width="2" class="sc-givre"/>';
      [[150, 262, 22, 9], [208, 257, 26, 8], [226, 346, 30, 8], [296, 262, 22, 9], [152, 342, 20, 9], [310, 300, 11, 20], [138, 300, 9, 20], [226, 300, 11, 22], [300, 344, 20, 8]].forEach(b => {
        s += '<ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="' + b[2] + '" ry="' + b[3] + '" fill="#f7fbff" stroke="#b7d3e8" stroke-width="1.4" class="sc-givre"/>';
      });
      s += poly([[130, 246], [104.7, 231.3], [104.7, 337.3], [130, 352]], "#eaf4fb", ' stroke="#9fc3e0" stroke-width="1" opacity=".88"');
      s += '<rect x="124" y="347" width="202" height="9" rx="4" fill="#f4fafe" stroke="#9fc3e0" stroke-width="1"/>';
      /* stalactites de glace au bord du bac */
      for (let x = 136; x < 322; x += 15) s += '<path d="M' + x + " 355 l5 " + (12 + (x * 7) % 11) + ' l5 -' + (12 + (x * 7) % 11) + ' Z" fill="#eef6fc" stroke="#9fc3e0" stroke-width=".8"/>';
    } else if (S.givre === "fin") {
      s += '<circle cx="183" cy="299" r="35" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/><circle cx="267" cy="299" r="35" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>';
    } else if (S.givre === "partiel") {
      s += '<circle cx="267" cy="299" r="35" fill="none" stroke="#fff" stroke-width="3.5" opacity=".9"/>';
    }
    /* air froid qui tombe de la face */
    if (S.ventEvap && S.givre !== "bloc") s += '<g class="sc-air"><path d="M168 357 q4 6 10 11"/><path d="M200 357 q4 6 10 11"/><path d="M232 357 q4 6 10 11"/><path d="M264 357 q4 6 10 11"/></g>';
    return s;
  }

  /* ---------- le mur (tranche), le plafond ---------- */
  function mur() {
    let s = "";
    /* tranche du mur : tôle, mousse, tôle ; fourreaux des deux tubes */
    s += '<rect x="500" y="216" width="26" height="340" fill="#f1ead2"' + ST + "/>" +
      '<rect x="500" y="216" width="4.5" height="340" fill="#aab7c6"/><rect x="521.5" y="216" width="4.5" height="340" fill="#aab7c6"/>';
    for (let y = 226; y < 550; y += 12) s += '<path d="M505 ' + y + " l16 -9" + '" stroke="#d8cda6" stroke-width="1.2"/>';
    [264, 336].forEach(y => { s += '<rect x="499" y="' + (y - 11) + '" width="28" height="22" rx="3" fill="#3b4756" opacity=".55"/><rect x="496" y="' + (y - 12) + '" width="5" height="24" rx="2" fill="#6b7a8c"' + ST + '/>'; });
    return s;
  }
  function plafond() {
    let s = "";
    s += poly([[100, 216], [526, 216], [449, 171.2], [23, 171.2]], "#f3f6fa");
    s += poly([[100, 216], [100, 238], [23, 193.2], [23, 171.2]], "#c3cedb");
    s += '<rect x="100" y="216" width="426" height="22" fill="#d3dce7"' + ST + "/>";
    s += poly([[23, 171.2], [9.8, 163.5], [9.8, 503.5], [23, 511.2]], "rgba(0,0,0,0)", "");
    return s;
  }

  /* ---------- le groupe de condensation, dehors ---------- */
  function groupe(S) {
    let s = "";
    /* sol extérieur, plot béton, console acier */
    s += '<rect x="526" y="556" width="474" height="104" fill="#e8dcc4"/><line x1="526" y1="556" x2="1000" y2="556" stroke="#c9b995" stroke-width="2"/>';
    s += vol(580, 548, 400, 12, 56, "#cfc8ba", "#dcd6c9", "#b0a999");
    s += ombre(596, 548, 372, 46);
    s += vol(596, 532, 372, 16, 44, "#5b6b7d", "#7d8c9e", "#47566a");
    s += '<rect x="608" y="548" width="16" height="12" fill="#3b4756"/><rect x="940" y="548" width="16" height="12" fill="#3b4756"/>';
    /* condenseur à air : batterie (ailettes + rangs), hélice par-dessus */
    s += vol(600, 338, 148, 194, 48, "url(#sc-ailettes)", "url(#sc-g-tole)", "#b3c0cf");
    s += '<g clip-path="url(#sc-clip-cond)">' + rangs(606, 742, 352, 520, 12, (i, n) => mix("#c0392b", "#c9451a", Math.min(1, i / (n * .6))), (i, n) => (i < n * .5 ? "hp" : "liq"), false) + "</g>";
    if (S.encrasse) s += '<rect x="600" y="338" width="148" height="194" fill="url(#sc-saleté)" class="sc-saleté"/><path d="M604 346 q34 -9 70 2 t70 -3 M604 520 q40 8 72 -3 t68 4" stroke="#6b5636" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>';
    s += helice(674, 435, 46, S.ventCond, 5);
    /* chaleur rejetée au-dessus du condenseur */
    if (S.ventCond) s += '<g class="sc-chaleur"><path d="M640 326 q-7 -9 0 -18 t0 -18"/>' + (S.encrasse ? "" : '<path d="M674 326 q-7 -9 0 -18 t0 -18"/><path d="M708 326 q-7 -9 0 -18 t0 -18"/>') + "</g>";
    /* bouteille de liquide : réservoir vertical */
    s += cylV(760, 398, 34, 134, 7, "sc-g-bleu", "#9fb7d1");
    s += '<rect x="772" y="388" width="10" height="9" fill="url(#sc-g-laiton)"' + ST + "/>";
    /* compresseur hermétique noir : corps, calotte, joint soudé, pieds, boîte à bornes */
    s += '<g class="sc-compresseur' + (S.faible ? " faible" : " vibre") + '" style="transform-origin:886px 500px">' +
      '<ellipse cx="886" cy="538" rx="48" ry="6" fill="rgba(16,35,60,.22)"/>' +
      '<path d="M846 456 V524 Q846 538 860 538 H912 Q926 538 926 524 V456 Z" fill="url(#sc-g-noir)" stroke="#0b0e11" stroke-width="1.4"/>' +
      '<path d="M846 456 C846 416 926 416 926 456 Z" fill="url(#sc-g-noir)" stroke="#0b0e11" stroke-width="1.4"/>' +
      '<path d="M846 456 H926" stroke="#6e7885" stroke-width="2"/>' +
      '<rect x="857" y="468" width="6" height="62" rx="3" fill="#fff" opacity=".13"/>' +
      '<path d="M862 442 C868 428 884 424 900 428" stroke="#fff" stroke-width="3" fill="none" opacity=".16" stroke-linecap="round"/>' +
      '<rect x="919" y="476" width="16" height="26" rx="3" fill="#2d343c" stroke="#0b0e11"/><rect x="922" y="480" width="10" height="6" fill="#4b545f"/>' +
      '<rect x="852" y="536" width="14" height="6" rx="2" fill="#1b1f24"/><rect x="906" y="536" width="14" height="6" rx="2" fill="#1b1f24"/></g>';
    /* pressostat HP/BP : petite boîte + deux capillaires */
    s += vol(768, 282, 48, 26, 10, "#2f5a8a", "#4a76a8", "#1f3f63") + '<circle cx="782" cy="295" r="5.5" fill="#f4f7fa" stroke="#10233c"/><circle cx="802" cy="295" r="5.5" fill="#f4f7fa" stroke="#10233c"/>' +
      '<rect x="787" y="287" width="10" height="3" fill="#e8914a"/>' +
      '<path class="sc-capillaire" d="M816 292 C 850 292 868 380 868 424"/><path class="sc-capillaire" d="M816 300 C 880 300 896 380 897 430"/>';
    return s;
  }

  /* ---------- le circuit : tubes dans l'ordre du fluide ---------- */
  function circuit(S) {
    let s = "";
    /* 1 refoulement : vanne HP du compresseur → entrée haute du condenseur (cuivre nu, rouge) */
    s += tube("M858 428 V352 H746", "hp", false);
    /* 2 sortie du condenseur → bouteille (liquide) */
    s += tube("M746 520 H762", "liq", false);
    /* 3 bouteille → ligne liquide, qui remonte le long du mur, traverse, puis filtre, voyant, détendeur */
    s += tube("M777 536 V541 H546 V336 H374", "liq", true);
    /* 4 après le détendeur : mélange liquide + vapeur bleu clair, jusqu'au rang d'entrée de l'évaporateur */
    s += tube("M344 336 H322", "mel", false);
    /* 5 aspiration : sortie haute de l'évaporateur → traverse le mur → vanne BP du compresseur */
    s += tube("M320 264 H906 V430", "bp", true, S.aspGivree);
    return s;
  }

  /* ---------- organes sur le tube : détendeur + bulbe, voyant, filtre, vannes de service ---------- */
  function organes(S) {
    let s = "";
    /* détendeur thermostatique : corps laiton, tête à diaphragme au-dessus */
    s += vol(344, 324, 30, 24, 10, "url(#sc-g-laiton)", "#f3cd8a", "#b9852f") +
      '<path d="M351 324 V318 A8 8 0 0 1 367 318 V324 Z" fill="#7d8c9e"' + ST + '/><ellipse cx="359" cy="311" rx="9" ry="4.2" fill="#aab7c6"' + ST + "/>" +
      '<rect x="333" y="330" width="11" height="12" fill="url(#sc-g-laiton)"' + ST + '/><rect x="374" y="330" width="9" height="12" fill="url(#sc-g-laiton)"' + ST + "/>";
    /* capillaire et bulbe fixé sur l'aspiration, sortie évaporateur, collier cuivre */
    s += '<path class="sc-capillaire" d="M359 307 C 359 290 340 286 346 266"/>' +
      '<rect x="334" y="258" width="26" height="12" rx="5" fill="url(#sc-g-laiton)"' + ST + '/><rect x="342" y="255" width="4" height="18" fill="#6b7a8c"/><rect x="351" y="255" width="4" height="18" fill="#6b7a8c"/>';
    /* voyant de liquide : corps laiton, hublot, indicateur d'humidité ou bulles */
    s += vol(394, 322, 28, 28, 8, "url(#sc-g-laiton)", "#f3cd8a", "#b9852f") +
      '<circle cx="408" cy="336" r="10.5" fill="#fffdf8" stroke="#6b4a1a" stroke-width="2"/>' +
      (S.bulles
        ? '<circle cx="408" cy="336" r="9.5" fill="#e6f0e4"/><g clip-path="url(#sc-clip-voyant)" class="sc-bulles"><circle cx="402" cy="344" r="2.6"/><circle cx="411" cy="347" r="2.2"/><circle cx="407" cy="349" r="1.8"/><circle cx="414" cy="343" r="1.6"/></g>'
        : '<circle cx="408" cy="336" r="9.5" fill="#eaf2e6"/><circle cx="408" cy="336" r="4.2" fill="#1e7e54"/>') +
      '<path d="M401 331 A8 8 0 0 1 407 327" stroke="#fff" stroke-width="2" fill="none" opacity=".9" stroke-linecap="round"/>';
    /* filtre déshydrateur : cylindre horizontal, raccords */
    s += '<rect x="436" y="330" width="9" height="12" fill="url(#sc-g-laiton)"' + ST + '/><rect x="482" y="330" width="9" height="12" fill="url(#sc-g-laiton)"' + ST + "/>" +
      '<rect x="443" y="322" width="41" height="28" rx="12" fill="url(#sc-g-tole)"' + ST + '/><rect x="443" y="322" width="41" height="9" rx="4.5" fill="#fff" opacity=".35"/><rect x="457" y="322" width="4" height="28" fill="#10233c" opacity=".25"/><rect x="466" y="322" width="4" height="28" fill="#10233c" opacity=".25"/>';
    /* vannes de service du compresseur : laiton, volant, prise Schrader */
    const vanne = (x, y, cap) => vol(x, y, 20, 14, 6, "url(#sc-g-laiton)", "#f3cd8a", "#b9852f") + '<rect x="' + (x + 6) + '" y="' + (y - 9) + '" width="8" height="9" fill="#7d8c9e"' + ST + '/><rect x="' + (x + 3) + '" y="' + (y - 13) + '" width="14" height="5" rx="2" fill="' + cap + '"' + ST + "/>";
    s += vanne(849, 428, "#c0392b") + vanne(897, 432, "#3d7fca");
    s += '<circle cx="867" cy="434" r="3.6" fill="#e8c27a" stroke="#10233c"/><circle cx="915" cy="440" r="3.6" fill="#e8c27a" stroke="#10233c"/>';
    /* colliers de fixation */
    [[560, 264, 1], [660, 264, 1], [790, 264, 1], [906, 340, 0], [546, 400, 0], [546, 500, 0], [660, 541, 1], [440, 264, 1]].forEach(a => {
      s += a[2] ? '<rect x="' + (a[0] - 3) + '" y="' + (a[1] - 11) + '" width="6" height="22" rx="2" class="sc-collier"/>' : '<rect x="' + (a[0] - 11) + '" y="' + (a[1] - 3) + '" width="22" height="6" rx="2" class="sc-collier"/>';
    });
    /* câble d'alimentation du compresseur */
    s += '<path id="sc-cable" d="M934 490 H944 V542" class="sc-cable"/>';
    return s;
  }

  /* ---------- les noms, sous chaque organe ---------- */
  function noms(inst) {
    return '<text x="275" y="152" class="sc-titre">Chambre froide · consigne ' + esc(inst.consigne) + "</text>" +
      lib(225, 386, "évaporateur") + lib(351, 366, "détendeur", "serre") + lib(403, 366, "voyant", "serre") + lib(458, 366, ["filtre", "déshydrateur"], "serre") +
      lib(65, 286, ["thermostat", "d'ambiance"]) +
      lib(674, 580, "condenseur") + lib(777, 580, ["bouteille", "de liquide"]) + lib(876, 580, "compresseur") +
      lib(792, 326, "pressostat HP/BP") +
      '<text x="760" y="618" class="sc-titre petit">groupe de condensation, à l\'extérieur</text>';
  }
  function legende() {
    const L = [["#3d7fca", "vapeur basse pression (aspiration)"], ["#c0392b", "vapeur chaude haute pression (refoulement)"], ["#c9451a", "liquide sous-refroidi"], ["#8fc4f2", "mélange liquide + vapeur, après le détendeur"]];
    return '<g class="sc-legende">' + L.map((l, i) => '<path d="M26 ' + (28 + i * 22) + ' h28" stroke="' + l[0] + '" stroke-width="7" stroke-linecap="round" fill="none"/><text x="66" y="' + (33 + i * 22) + '">' + l[1] + "</text>").join("") + "</g>";
  }
  function point(id, lib, anchor, dx, dy) {
    const p = CIBLE[id];
    return '<g class="sc-pt" data-pt="' + id + '" role="button" tabindex="0" aria-label="' + esc(lib) + '">' +
      '<circle class="sc-pt-zone" cx="' + p[0] + '" cy="' + p[1] + '" r="22"/><circle class="sc-pt-onde" cx="' + p[0] + '" cy="' + p[1] + '" r="11"/><circle class="sc-pt-rond" cx="' + p[0] + '" cy="' + p[1] + '" r="9"/>' +
      '<text x="' + (p[0] + dx) + '" y="' + (p[1] + dy) + '" class="sc-pt-lib" text-anchor="' + anchor + '">' + esc(lib) + "</text></g>";
  }

  /* ---------- instruments : manifold, thermomètre, pince ---------- */
  function gauge(x, y, cote, idAig) {
    const coul = cote === "BP" ? "#1f6fa8" : "#b3261e";
    let ticks = "";
    for (let i = 0; i <= 8; i++) { const a = (-135 + i * 33.75) * Math.PI / 180; ticks += '<line x1="' + (x + 32 * Math.sin(a)).toFixed(1) + '" y1="' + (y - 32 * Math.cos(a)).toFixed(1) + '" x2="' + (x + 38 * Math.sin(a)).toFixed(1) + '" y2="' + (y - 38 * Math.cos(a)).toFixed(1) + '" stroke="#22303f" stroke-width="2"/>'; }
    return '<circle cx="' + x + '" cy="' + y + '" r="46" fill="' + coul + '"/><circle cx="' + x + '" cy="' + y + '" r="40" fill="#fdfdfb" stroke="#22303f"/>' + ticks +
      '<text x="' + x + '" y="' + (y + 22) + '" class="sc-gauge-mot" fill="' + coul + '">' + cote + "</text>" +
      '<line id="' + idAig + '" class="sc-aiguille" x1="' + x + '" y1="' + (y + 8) + '" x2="' + x + '" y2="' + (y - 34) + '" style="transform-origin:' + x + "px " + y + 'px; transform: rotate(-135deg)"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#333"/>';
  }
  function manifold() {
    const bp = CIBLE.bp, hp = CIBLE.hp;
    return '<g id="sc-manifold" class="sc-instrument"><rect x="752" y="14" width="236" height="148" rx="16" fill="#1b3a63"/><rect x="764" y="26" width="212" height="104" rx="10" fill="#f7f1e7"/>' +
      gauge(818, 78, "BP", "sc-aig-bp") + gauge(922, 78, "HP", "sc-aig-hp") +
      '<text x="870" y="148" class="sc-lcd petit" fill="#fff" style="fill:#fff">MANIFOLD</text>' +
      '<rect x="806" y="160" width="24" height="16" rx="4" fill="#1f6fa8"/><rect x="910" y="160" width="24" height="16" rx="4" fill="#b3261e"/>' +
      '<path id="sc-flex-bp" class="sc-flex bp" pathLength="1" d="M818 176 C 818 290 ' + (bp[0] - 40) + " 330 " + (bp[0] + 6) + " " + (bp[1] - 2) + '"/>' +
      '<path id="sc-flex-hp" class="sc-flex hp" pathLength="1" d="M922 176 C 922 290 ' + (hp[0] + 20) + " 340 " + (hp[0] - 6) + " " + (hp[1] - 2) + '"/></g>';
  }
  function thermometre() {
    return '<g id="sc-thermo" class="sc-instrument"><rect x="548" y="14" width="190" height="64" rx="12" fill="#1b3a63"/><rect x="560" y="24" width="166" height="36" rx="6" fill="#eaf2e6" stroke="#0f2440" stroke-width="2"/>' +
      '<text id="sc-lcd-thermo" x="643" y="42" class="sc-lcd" font-size="24">20 °C</text>' +
      '<circle cx="608" cy="69" r="4" fill="#84b7ec"/><circle cx="643" cy="69" r="4" fill="#d17d43"/><circle cx="678" cy="69" r="4" fill="#fffdf8"/>' +
      '<path id="sc-sonde-cordon" d="M 643 78 L 643 78" stroke="#0f2440" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<g id="sc-sonde-pince" transform="translate(643 78)"><rect width="18" height="22" rx="4" fill="#1b3a63" stroke="#fff" stroke-width="1.5"/><circle cx="9" cy="8" r="3" fill="#84b7ec"/></g></g>';
  }
  function pinceAmp() {
    const p = CIBLE.pince;
    return '<g id="sc-pince" class="sc-instrument"><circle cx="' + p[0] + '" cy="' + (p[1] - 2) + '" r="14" fill="none" stroke="#d1a000" stroke-width="7"/>' +
      '<rect x="' + (p[0] - 6) + '" y="' + (p[1] + 8) + '" width="12" height="14" fill="#1b3a63"/>' +
      '<rect x="' + (p[0] - 32) + '" y="' + (p[1] + 18) + '" width="74" height="56" rx="8" fill="#1b3a63" stroke="#fff" stroke-width="2"/><rect x="' + (p[0] - 26) + '" y="' + (p[1] + 25) + '" width="62" height="28" rx="4" fill="#eaf2e6"/>' +
      '<text id="sc-lcd-pince" x="' + (p[0] + 5) + '" y="' + (p[1] + 39) + '" class="sc-lcd petit" style="font-size:12px">0 % In</text></g>';
  }
  function compter(noeud, de, a, duree, fmt) {
    const t0 = performance.now();
    (function pas(now) { const r = Math.min(1, (now - t0) / duree); const v = de + (a - de) * r; noeud.textContent = fmt(v); if (r < 1) requestAnimationFrame(pas); })(t0);
    /* onglet caché : le rAF ne tourne pas → valeur finale posée aussi par minuterie */
    setTimeout(() => { noeud.textContent = fmt(a); }, duree + 50);
  }

  /* ---------- montage ---------- */
  function monter(conteneur, c, inst, pressions) {
    const S = {
      givre: /bloc/.test(c.evap) ? "bloc" : /premier|seul départ|départ|quart|tiers/.test(c.evap) ? "partiel" : /givre/.test(c.evap) ? "fin" : "aucun",
      ventEvap: !/dans le vide|arrêt/.test(c.evap) || /ventilateur en marche|souffle/.test(c.evap),
      ventCond: !/IMMOBILE|immobile|arrêt/.test(c.cond),
      encrasse: /bouch|poussi|encrass/.test(c.cond),
      bulles: /bulle/.test(c.voyant),
      aspGivree: /aspiration givrée|givrée jusqu/.test(c.toucher),
      faible: c.panne === "compresseur"
    };

    conteneur.innerHTML =
      '<svg class="scene atelier" viewBox="0 0 1000 640" role="img" aria-label="' + esc(inst.nom + ", " + inst.fluideNom + " : chambre froide à gauche avec son évaporateur et son détendeur, mur traversé par la ligne liquide et l'aspiration, groupe de condensation à droite avec condenseur, bouteille de liquide et compresseur.") + '">' +
      defs() + legende() + chambre(inst, c) + evaporateur(S) + mur() + plafond() + groupe(S) + circuit(S) + organes(S) + noms(inst) +
      '<g class="sc-points">' +
      point("bp", "prise BP", "start", 14, 4) + point("hp", "prise HP", "end", -20, 4) +
      point("tasp", "aspiration", "middle", 0, 30) + point("tliq", "ligne liquide", "end", -14, 4) + point("tref", "refoulement", "middle", 0, 26) +
      point("pince", "câble", "start", 18, 4) +
      "</g>" +
      manifold() + thermometre() + pinceAmp() +
      '<circle id="sc-halo" r="26" fill="none" stroke-width="6" opacity="0"/>' +
      "</svg>";

    const svg = conteneur.querySelector("svg");
    const api = {
      manifold: function (cote) {
        const g = svg.querySelector("#sc-manifold"); g.classList.add("visible");
        const h = svg.querySelector(cote === "BP" ? "#sc-flex-bp" : "#sc-flex-hp"); h.classList.add("branche");
        const aig = svg.querySelector(cote === "BP" ? "#sc-aig-bp" : "#sc-aig-hp");
        const p = cote === "BP" ? pressions.bp : pressions.hp;
        setTimeout(function () { aig.style.transform = "rotate(" + angle(p, cote) + "deg)"; }, 350);
        allumer(cote === "BP" ? "bp" : "hp");
      },
      thermo: function (pt, valeur) {
        const cible = POSE[pt] || POSE.tasp;
        const dep = { tasp: [620, 78], tliq: [566, 78] }[pt] || [643, 78];
        const g = svg.querySelector("#sc-thermo"); g.classList.add("visible");
        svg.querySelector("#sc-sonde-cordon").setAttribute("d", pt === "tref" ? "M720 78 C 720 200 900 200 890 300 C 884 346 850 352 815 352" :
          "M " + dep[0] + " " + dep[1] + " C " + dep[0] + " " + (dep[1] + 90) + " " + cible[0] + " " + (cible[1] - 90) + " " + cible[0] + " " + cible[1]);
        svg.querySelector("#sc-sonde-pince").setAttribute("transform", "translate(" + (cible[0] - 9) + " " + (cible[1] - 11) + ")");
        compter(svg.querySelector("#sc-lcd-thermo"), 20, valeur, 1200, v => temp(Math.round(v * 10) / 10 === Math.round(v) ? Math.round(v) : v.toFixed(1).replace(".", ",")) + " °C");
        allumer(pt);
      },
      pince: function (pct) {
        const g = svg.querySelector("#sc-pince"); g.classList.add("visible");
        compter(svg.querySelector("#sc-lcd-pince"), 0, pct, 900, v => Math.round(v) + " % In");
        allumer("pince");
      },
      toucher: function (pt) {
        const pos = POSE[pt] || POSE.tasp;
        const halo = svg.querySelector("#sc-halo");
        halo.setAttribute("cx", pos[0]); halo.setAttribute("cy", pos[1]);
        halo.setAttribute("stroke", pt === "tref" || pt === "hp" ? "#c0392b" : pt === "tliq" ? "#c9451a" : "#3d7fca");
        halo.setAttribute("opacity", "0.9"); setTimeout(() => halo.setAttribute("opacity", "0"), 1800);
      }
    };
    function allumer(pt) { svg.querySelectorAll(".sc-pt").forEach(e => e.classList.toggle("actif", e.dataset.pt === pt)); }
    svg.querySelectorAll(".sc-pt").forEach(e => {
      const go = () => conteneur.dispatchEvent(new CustomEvent("releve", { detail: e.dataset.pt }));
      e.addEventListener("click", go);
      e.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
    });
    return api;
  }

  window.JR_SCENE_ATELIER = { monter: monter };
})();
