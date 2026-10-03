/* =====================================================================
   voyage-centrale-scenes-b.js — « Voyage dans tous ses états », édition
   « les centrales frigorifiques » : les compresseurs, la basse pression
   qui commande, la marche étagée, le variateur, le refoulement
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id] = function (g, c)
   → maj(t) (fonction PURE de t : rien n'est gardé d'une image à l'autre).
   Récit : donnees/voyage-centrale.js ; brief : voyage-centrale/BRIEF-SCENES.md
   (section B). Ce fichier ne définit QUE ses cinq scènes.
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760 ; en-tête
   interdit (x < 760, y < 140). Étiquettes ≥ 28 px, jamais sur un tracé.
   LA CENTRALE VUE DE FACE (centrale()) : le même dessin dans les cinq scènes —
   trois compresseurs semi-hermétiques côte à côte sur un châssis, collecteur
   de refoulement en haut (cuivre), collecteur d'aspiration en bas (isolé,
   bleu), un piquage et deux vannes d'isolement par compresseur, un clapet
   anti-retour sur chaque refoulement, le capteur de pression sur le
   collecteur d'aspiration et l'armoire électrique à droite (régulateur de
   centrale, variateur). Un compresseur en marche vibre et a son voyant vert.
   Quand une scène a besoin de place (graphiques, vignettes), un PANNEAU
   opaque se pose sur le haut de la centrale (chevauchement voulu : il est
   déclaré par data-layout-allow-overlap) ; les voyants restent visibles
   dessous.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const PI = Math.PI, TOUR = 2 * PI, POLICE = "Calibri, Arial, sans-serif";
  const BP = "#2f6fb8", HP = "#e2662c", VERT = "#1e7e54", ROUGE = "#c0392b", AMBRE = D.HUILE, ENCRE = "#10233c", GRIS = "#637285";
  const AUTRES = ["#8e44ad", "#1e7e54", "#c2185b"]; // les trois autres fluides du mélange (jamais nommés)
  let nid = 0;
  const idu = p => "vcb-" + p + "-" + (++nid);

  /* ---------- petits outils ---------- */
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(3));
  const fen = (t, a, b, du) => D.fenetre(t, a, b, du || 0.45);
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const pastille = (g, s, coul, a, b, x, ancre) => ({ g: D.pastille(g, x, 748, s, coul, 30, ancre || "start"), a: a, b: b });
  const montrer = (liste, c, t) => liste.forEach(p => op(p.g, fen(t, c.T[p.a], p.b + 1 < c.T.length ? c.T[p.b + 1] - 0.1 : c.D, 0.4)));
  const txt = (p, x, y, s, o) => { o = o || {}; return D.etiquette(p, x, y, s, { "font-size": o.t || 32, fill: o.c || ENCRE, "text-anchor": o.a || "start", "font-weight": o.w || 700 }); };
  const rgb = c => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
  const mix = (a, b, f) => { const A = rgb(a), B = rgb(b); return "rgb(" + A.map((v, i) => Math.round(D.lerp(v, B[i], f))).join(",") + ")"; };
  const pts = l => l.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  function degrade(parent, id, stops, vertical) {
    const gr = D.el("linearGradient", { id: id, x1: 0, y1: 0, x2: vertical ? 0 : 1, y2: vertical ? 1 : 0 }, parent);
    stops.forEach(([o, c]) => D.el("stop", { offset: o, "stop-color": c }, gr));
    return "url(#" + id + ")";
  }
  /* petite molécule (le « use » de D.mol, avec taille et couleur au choix) */
  function molecule(parent, couleur) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    if (couleur) u.setAttribute("fill", couleur);
    return function (x, y, s, o, fill) {
      u.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + s.toFixed(2) + ")");
      if (fill) u.setAttribute("fill", fill);
      u.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
    };
  }
  /* un nuage de vapeur : quatre familles de molécules mêlées (celle de l'héroïne garde la couleur normale) ;
     zone = { x0, x1, y0, y1 } ; o = { densite 0..1, vit, s, temp, op } */
  function nuage(parent, nb, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ u: (i + r() * 0.8) / nb, v: r(), rang: r(), ph: r() * TOUR, c: i % 4, maj: molecule(parent) });
    return function (t, z, o) {
      L.forEach(m => {
        const f = D.frac(m.u + t * o.vit), x = z.x0 + f * (z.x1 - z.x0), y = z.y0 + (0.14 + 0.72 * m.v) * (z.y1 - z.y0) + Math.sin(t * 2.4 + m.ph) * 2.5;
        m.maj(x, y, o.s, D.borne((o.densite - m.rang) * 6, 0, 1) * o.op * D.fenetre(f, 0, 1, 0.04), m.c ? AUTRES[m.c - 1] : D.couleur(o.temp, true));
      });
    };
  }
  /* des chevrons qui filent le long d'une ligne brisée : le sens du fluide */
  function flot(parent, P, nb, coul, tl) {
    const lg = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1])), tot = lg.reduce((a, b) => a + b, 0), E = [];
    for (let i = 0; i < nb; i++) E.push(D.el("path", { d: "M -7 -8 L 3 0 L -7 8", fill: "none", stroke: coul, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent));
    return function (t, vit, o) {
      E.forEach((e, i) => {
        const f = D.frac(i / nb + t * vit / tot);
        let d = f * tot, k = 0;
        while (k < lg.length - 1 && d > lg[k]) { d -= lg[k]; k++; }
        const a = P[k], b = P[k + 1], q = d / lg[k];
        e.setAttribute("transform", "translate(" + (a[0] + (b[0] - a[0]) * q).toFixed(1) + " " + (a[1] + (b[1] - a[1]) * q).toFixed(1) + ") rotate(" + (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / PI).toFixed(0) + ") scale(" + (tl || 1) + ")");
        op(e, o * D.fenetre(f, 0, 1, 0.07));
      });
    };
  }
  /* un trait qui coule (câble, tube d'huile) : tirets qui glissent, pur de t */
  function coule(parent, d, coul, larg, tirets) {
    const e = D.el("path", { d: d, fill: "none", stroke: coul, "stroke-width": larg, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": tirets || "10 18" }, parent);
    return function (t, vit, o) { e.setAttribute("stroke-dashoffset", (-t * vit).toFixed(1)); op(e, o); };
  }
  /* un cadre qui pulse autour d'une pièce que l'on montre */
  function halo(parent, x, y, l, h, rx) {
    const e = D.el("rect", { x: x, y: y, width: l, height: h, rx: rx === undefined ? 12 : rx, fill: "none", stroke: "#ff6b35", "stroke-width": 6, opacity: 0 }, parent);
    return (t, v) => op(e, v * (0.6 + 0.4 * Math.sin(t * 6)));
  }
  /* chemin lisse (Catmull-Rom) passant par des repères : pos(s) = point à la distance s (voir voyage-nh3-scenes-b.js) */
  function chemin(P) {
    const Q = [P[0]].concat(P, [P[P.length - 1]]), Sg = [], L = [], cum = [];
    for (let i = 0; i < P.length - 1; i++) {
      const [p0, p1, p2, p3] = [Q[i], Q[i + 1], Q[i + 2], Q[i + 3]];
      for (let k = 0; k < 10; k++) {
        const u = k / 10, u2 = u * u, u3 = u2 * u, f = j => 0.5 * (2 * p1[j] + (p2[j] - p0[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * u3);
        const q = [f(0), f(1)];
        L.push(Sg.length ? L[L.length - 1] + Math.hypot(q[0] - Sg[Sg.length - 1][0], q[1] - Sg[Sg.length - 1][1]) : 0);
        Sg.push(q);
        if (k === 0) cum.push(L[L.length - 1]);
      }
    }
    const fin = P[P.length - 1];
    L.push(L[L.length - 1] + Math.hypot(fin[0] - Sg[Sg.length - 1][0], fin[1] - Sg[Sg.length - 1][1])); Sg.push(fin); cum.push(L[L.length - 1]);
    const l = L[L.length - 1];
    function pos(s) {
      s = D.borne(s, 0, l);
      let i = 1; while (i < L.length - 1 && L[i] < s) i++;
      const f = L[i] > L[i - 1] ? (s - L[i - 1]) / (L[i] - L[i - 1]) : 0;
      return [D.lerp(Sg[i - 1][0], Sg[i][0], f), D.lerp(Sg[i - 1][1], Sg[i][1], f)];
    }
    return { pos: pos, cum: cum, l: l };
  }

  /* ---------- le voyant (diode de marche : vert en marche, gris à l'arrêt, rouge clignotant en panne) ---------- */
  function voyant(parent, x, y, r) {
    const halo = D.el("circle", { cx: x, cy: y, r: r * 2.1, fill: "#2ecc71", opacity: 0 }, parent);
    D.el("circle", { cx: x, cy: y, r: r + 3.5, fill: "#2b3340" }, parent);
    const lampe = D.el("circle", { cx: x, cy: y, r: r }, parent);
    D.el("circle", { cx: x - r * 0.32, cy: y - r * 0.36, r: r * 0.3, fill: "#fff", opacity: 0.6 }, parent);
    return function (m, p, t) {
      const rouge = p > 0.5, cl = rouge ? 0.55 + 0.45 * Math.sin(t * 9) : 1;
      lampe.setAttribute("fill", rouge ? mix("#7a1d1d", "#ff4a3d", cl) : mix("#8b97a5", "#2ecc71", m));
      halo.setAttribute("fill", rouge ? "#ff4a3d" : "#2ecc71");
      op(halo, rouge ? 0.5 * cl : 0.5 * m);
    };
  }

  /* ---------- le voyant d'huile d'un carter : la nappe ambre dans une petite fenêtre ronde ---------- */
  function oeil(parent, x, y) {
    const cid = idu("oeil"), R = 12;
    D.el("circle", { cx: x, cy: y, r: R }, D.el("clipPath", { id: cid }, parent));
    D.el("circle", { cx: x, cy: y, r: R + 3, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, parent);
    D.el("circle", { cx: x, cy: y, r: R, fill: "#f4f8fc" }, parent);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, parent);
    const nappe = D.el("rect", { x: x - R, width: 2 * R, fill: AMBRE, opacity: 0.9 }, dedans);
    D.el("path", { d: "M " + (x - R * 0.55) + " " + (y - R * 0.55) + " A " + R * 0.75 + " " + R * 0.75 + " 0 0 1 " + (x + R * 0.1) + " " + (y - R * 0.78), fill: "none", stroke: "#fff", "stroke-width": 2.4, opacity: 0.7, "stroke-linecap": "round" }, parent);
    return function (v) { nappe.setAttribute("y", (y + R - 2 * R * v).toFixed(1)); nappe.setAttribute("height", (2 * R * v + 1).toFixed(1)); };
  }

  /* ---------- une vanne d'isolement (poignée rouge : le long du tube = ouverte, en travers = fermée) ---------- */
  function vanne(parent, cx, y) {
    D.el("rect", { x: cx - 16, y: y, width: 32, height: 30, rx: 7, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, parent);
    D.el("line", { x1: cx - 16, y1: y + 15, x2: cx + 16, y2: y + 15, stroke: "#7c5c18", "stroke-width": 2, opacity: 0.5 }, parent);
    const lev = D.el("g", {}, parent);
    D.el("rect", { x: -4.5, y: -25, width: 9, height: 50, rx: 4.5, fill: "#d9442b", stroke: "#8e2414", "stroke-width": 1.5 }, lev);
    D.el("circle", { r: 7.5, fill: "#8e2414" }, lev);
    const maj = ferme => lev.setAttribute("transform", "translate(" + cx + " " + (y + 15) + ") rotate(" + (90 * ferme).toFixed(1) + ")");
    maj(0);
    return maj;
  }
  /* ---------- un clapet anti-retour en coupe : le battant se soulève sous le gaz, retombe sur son siège ---------- */
  function clapet(parent, cx, y) {
    D.el("rect", { x: cx - 23, y: y, width: 46, height: 40, rx: 8, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, parent);
    D.el("rect", { x: cx - 13, y: y + 7, width: 26, height: 26, rx: 4, fill: "#f4f8fc", stroke: "#6f5214", "stroke-width": 2 }, parent);
    D.el("rect", { x: cx - 13, y: y + 28, width: 26, height: 5, fill: "#6f5214" }, parent);
    const bat = D.el("g", {}, parent);
    D.el("rect", { x: 0, y: -2.6, width: 22, height: 5.2, rx: 2.6, fill: "#24384f" }, bat);
    D.el("circle", { r: 3.6, fill: "#24384f" }, bat);
    return function (ferme) { bat.setAttribute("transform", "translate(" + (cx - 11) + " " + (y + 26) + ") rotate(" + (-66 * (1 - ferme)).toFixed(1) + ")"); };
  }

  /* =====================================================================
     LA CENTRALE VUE DE FACE (scène en repère 1600 × 770, tout dans x 22 → 952, y 160 → 674)
     o.sortie : "haut" (le refoulement monte vers le toit) | "sep" (il va vers le séparateur d'huile, posé par la scène)
     o.cable  : le câble du variateur (armoire → moteur du compresseur 1)
     o.sansArmoire : sans l'armoire, le capteur ni leurs câbles (le séparateur d'huile prend leur place)
     rend { CX, racine, maj(t, e), … } ; e (tout est facultatif) = { marche[3] (0 à 1 : voyant et vibration), panne (le 3), fermeRef, fermeAsp
     (vannes du 3), clap[3] (clapets fermés ; par défaut : fermé si le compresseur est à l'arrêt), fluxAsp, fluxP (flèches des piquages
     d'aspiration), fluxRef, huile[3] (niveau aux voyants d'huile), haut, bas (opacité des tuyaux en haut / en bas), porte, bp, tendance[],
     consigne, vj, onde, signal, haloCap, cableV }
     ===================================================================== */
  const CX = [98, 288, 478];
  const ZASP = { x0: 40, x1: 630, y0: 608, y1: 642 };
  function centrale(g, o) {
    o = o || {};
    const racine = D.el("g", {}, g), defs = D.el("defs", {}, racine);
    const FONTE = degrade(defs, idu("fonte"), [[0, "#c9d1da"], [0.3, "#a3adb8"], [0.7, "#707b87"], [1, "#4e5864"]], true);
    const CULASSE = degrade(defs, idu("culasse"), [[0, "#a5afba"], [0.5, "#717c88"], [1, "#4a535e"]], true);
    const ISO = degrade(defs, idu("iso"), [[0, "#1f4e86"], [0.28, "#86b5e3"], [0.6, "#4c84c0"], [1, "#1b3f6e"]], true);
    const fond = D.el("g", {}, racine), arrD = D.el("g", {}, racine), cabG = D.el("g", {}, racine), arrF = D.el("g", {}, racine), porteG = D.el("g", {}, racine);
    const comps = D.el("g", {}, racine), haut = D.el("g", {}, racine), bas = D.el("g", {}, racine), cap = D.el("g", {}, racine);
    const ref = D.el("g", {}, haut), flR = D.el("g", {}, haut), valR = D.el("g", {}, haut); // refoulement : tuyaux, flèches, vannes
    const asp = D.el("g", {}, bas), flA = D.el("g", {}, bas), valA = D.el("g", {}, bas);    // aspiration : idem
    const sep = o.sortie === "sep";

    /* le sol et le châssis (derrière tout) */
    D.el("rect", { x: 20, y: 666, width: 938, height: 8, rx: 3, fill: "#cfc6b4" }, fond);
    [22, 566].forEach(x => D.el("rect", { x: x, y: 218, width: 12, height: 448, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, fond));
    [[218, 10], [552, 14], [654, 12]].forEach(([y, h]) => D.el("rect", { x: 22, y: y, width: 556, height: h, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, fond));

    /* ---------- l'armoire électrique : le régulateur de centrale en haut, le variateur en bas ---------- */
    D.el("rect", { x: 668, y: 300, width: 284, height: 366, rx: 12, fill: "#c7d1dc", stroke: "#3b4a5e", "stroke-width": 4 }, arrD);
    D.el("rect", { x: 678, y: 310, width: 264, height: 346, rx: 6, fill: "#eef2f6" }, arrD);
    D.el("rect", { x: 704, y: 294, width: 16, height: 10, rx: 2, fill: "#1f2a36" }, arrD); // presse-étoupe du câble du variateur
    D.el("rect", { x: 692, y: 322, width: 228, height: 148, rx: 10, fill: "url(#vm-marine)", stroke: "#0c1d33", "stroke-width": 3 }, arrF);
    D.el("rect", { x: 704, y: 334, width: 204, height: 102, rx: 6, fill: "#e8f4ea", stroke: "#0c1d33", "stroke-width": 2 }, arrF);
    [716, 744, 772].forEach(x => D.el("circle", { cx: x, cy: 454, r: 6.5, fill: "#8fa3b8", stroke: "#0c1d33", "stroke-width": 1.5 }, arrF));
    D.el("rect", { x: 718, y: 342, width: 30, height: 86, rx: 4, fill: "#fff", stroke: "#3b4a5e", "stroke-width": 2 }, arrF);
    const jaugeBP = D.el("rect", { x: 721, width: 24, fill: BP }, arrF);
    D.el("rect", { x: 764, y: 346, width: 134, height: 80, rx: 4, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 2 }, arrF);
    const trait = D.el("polyline", { fill: "none", stroke: BP, "stroke-width": 3.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, arrF);
    const consigne = D.el("g", {}, arrF);
    const consL = D.el("line", { x1: 712, x2: 902, stroke: VERT, "stroke-width": 4.5, "stroke-linecap": "round" }, consigne);
    const consT = D.el("path", { fill: VERT }, consigne);
    const vb = D.el("g", {}, arrF); // le variateur
    D.el("rect", { x: 692, y: 486, width: 228, height: 160, rx: 10, fill: "#4a5663", stroke: "#1f2a36", "stroke-width": 3 }, vb);
    for (let k = 0; k < 11; k++) D.el("line", { x1: 708 + k * 18, y1: 496, x2: 708 + k * 18, y2: 518, stroke: "#2f3842", "stroke-width": 5, "stroke-linecap": "round" }, vb);
    D.el("rect", { x: 706, y: 530, width: 124, height: 64, rx: 6, fill: "#0f1f2e", stroke: "#1f2a36", "stroke-width": 2 }, vb);
    const onde = D.el("path", { fill: "none", stroke: "#5be39a", "stroke-width": 3.5, "stroke-linecap": "round" }, vb);
    D.el("rect", { x: 850, y: 498, width: 30, height: 136, rx: 4, fill: "#fff", stroke: "#1f2a36", "stroke-width": 2 }, vb);
    const jaugeV = D.el("rect", { x: 853, width: 24, fill: HP }, vb);
    [718, 746].forEach(x => D.el("circle", { cx: x, cy: 616, r: 8, fill: "#8fa3b8", stroke: "#1f2a36", "stroke-width": 1.5 }, vb));
    const ledV = voyant(vb, 806, 616, 8);
    const porte = D.el("g", {}, porteG);
    D.el("rect", { x: 668, y: 300, width: 284, height: 366, rx: 12, fill: "#d5dde6", stroke: "#3b4a5e", "stroke-width": 4 }, porte);
    const detail = D.el("g", {}, porte); // ce que l'on voit sur la porte fermée (il s'efface quand elle s'ouvre)
    for (let k = 0; k < 6; k++) D.el("line", { x1: 704, y1: 328 + k * 14, x2: 916, y2: 328 + k * 14, stroke: "#aab6c3", "stroke-width": 5, "stroke-linecap": "round" }, detail);
    D.el("rect", { x: 682, y: 470, width: 14, height: 64, rx: 6, fill: "#3b4a5e" }, detail);
    D.el("path", { d: "M 812 508 L 862 596 L 762 596 Z", fill: "#f3c623", stroke: "#3b4a5e", "stroke-width": 4, "stroke-linejoin": "round" }, detail);
    D.el("path", { d: "M 818 530 L 796 566 L 812 566 L 804 588 L 832 552 L 814 552 L 824 530 Z", fill: "#3b4a5e" }, detail);

    /* le câble du variateur : de l'armoire (en haut) au moteur du compresseur 1, par-dessus les tuyaux */
    const CABLE = "M 712 486 V 205 H 159 V 388";
    let cableV = () => {};
    if (o.cable) {
      D.el("path", { d: CABLE, fill: "none", stroke: "#1f2a36", "stroke-width": 6, "stroke-linejoin": "round" }, cabG);
      cableV = coule(cabG, CABLE, "#ff6b35", 4, "12 22");
    }

    /* ---------- les trois compresseurs semi-hermétiques ---------- */
    const C = CX.map((cx, i) => {
      const gr = D.el("g", {}, comps);
      [cx - 58, cx + 34].forEach(x => D.el("rect", { x: x, y: 536, width: 24, height: 16, rx: 3, fill: "#3f4a55" }, gr));
      D.el("rect", { x: cx - 62, y: 420, width: 124, height: 120, rx: 18, fill: FONTE, stroke: "#3b4550", "stroke-width": 3 }, gr);
      [438, 450].forEach(y => D.el("line", { x1: cx - 52, y1: y, x2: cx + 52, y2: y, stroke: "#4e5864", "stroke-width": 2, opacity: 0.55 }, gr));
      D.el("rect", { x: cx - 56, y: 498, width: 112, height: 36, rx: 12, fill: "#4e5864", opacity: 0.28 }, gr);
      D.el("rect", { x: cx - 52, y: 358, width: 104, height: 10, rx: 3, fill: "#59636e", stroke: "#3b4550", "stroke-width": 2 }, gr);
      D.el("rect", { x: cx - 44, y: 366, width: 88, height: 58, rx: 6, fill: CULASSE, stroke: "#3b4550", "stroke-width": 3 }, gr);
      [[-34, 376], [34, 376], [-34, 414], [34, 414]].forEach(([dx, y]) => D.el("circle", { cx: cx + dx, cy: y, r: 4, fill: "#2f3842" }, gr));
      D.el("rect", { x: cx + 46, y: 384, width: 26, height: 40, rx: 5, fill: "url(#vm-marine-h)", stroke: "#0c1d33", "stroke-width": 2 }, gr);
      D.el("rect", { x: cx + 54, y: 376, width: 10, height: 10, rx: 2, fill: "#1f2a36" }, gr);
      const led = voyant(gr, cx - 34, 448, 10);
      D.el("circle", { cx: cx - 4, cy: 486, r: 22, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 3 }, gr);
      D.texte(gr, cx - 4, 497, String(i + 1), { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": POLICE });
      const niv = oeil(gr, cx + 38, 514);
      return { g: gr, led: led, niveau: niv };
    });

    /* ---------- les tuyaux : refoulement (cuivre) en haut, aspiration (isolé, bleu) en bas ---------- */
    const xe = sep ? 664 : 624, PECHE = "#fbe9dc", CIEL = "#e9f1fa";
    D.el("rect", { x: 86, y: 240, width: xe - 86, height: 30, rx: 6, fill: "url(#vm-cuivre)" }, ref);
    if (!sep) D.el("rect", { x: 596, y: 160, width: 28, height: 110, rx: 6, fill: "url(#vm-cuivre-h)" }, ref);
    CX.forEach(cx => D.el("rect", { x: cx - 10, y: 268, width: 20, height: 104, fill: "url(#vm-cuivre-h)" }, ref));
    D.el("rect", { x: 92, y: 246, width: xe - 98, height: 18, fill: PECHE }, ref);
    if (!sep) D.el("rect", { x: 602, y: 160, width: 16, height: 104, fill: PECHE }, ref);
    CX.forEach(cx => D.el("rect", { x: cx - 5, y: 258, width: 10, height: 112, fill: PECHE }, ref));
    if (!sep) { D.el("rect", { x: 592, y: 156, width: 36, height: 8, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, ref); }
    const clap = CX.map(cx => clapet(valR, cx, 276)), vref = CX.map(cx => vanne(valR, cx, 324));

    D.el("rect", { x: 24, y: 600, width: 616, height: 50, rx: 10, fill: ISO }, asp);
    D.el("rect", { x: 34, y: 608, width: 598, height: 34, fill: CIEL }, asp);
    D.el("rect", { x: 24, y: 596, width: 12, height: 58, rx: 3, fill: "#2c3e55", stroke: "#10233c", "stroke-width": 2 }, asp); // la bride de la conduite d'aspiration
    D.el("line", { x1: 40, y1: 603, x2: 634, y2: 603, stroke: "#fff", "stroke-width": 2, opacity: 0.45 }, asp);
    CX.forEach(cx => D.el("rect", { x: cx - 10, y: 540, width: 20, height: 66, fill: "url(#vm-cuivre-h)" }, asp));
    CX.forEach(cx => D.el("rect", { x: cx - 5, y: 540, width: 10, height: 74, fill: CIEL }, asp));
    const vasp = CX.map(cx => vanne(valA, cx, 568));

    /* le capteur de pression sur le collecteur d'aspiration, et son câble jusqu'à l'armoire */
    const CABLE_S = "M 634 527 H 648 V 400 H 668";
    D.el("path", { d: CABLE_S, fill: "none", stroke: "#1f2a36", "stroke-width": 6, "stroke-linejoin": "round" }, cap);
    const signal = coule(cap, CABLE_S, "#ff6b35", 4, "10 16");
    D.el("rect", { x: 606, y: 560, width: 12, height: 44, fill: "url(#vm-acier-h)" }, cap);
    D.el("rect", { x: 598, y: 548, width: 28, height: 14, rx: 3, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, cap);
    D.el("rect", { x: 600, y: 506, width: 24, height: 44, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, cap);
    D.el("rect", { x: 622, y: 520, width: 14, height: 14, rx: 3, fill: "#1f2a36" }, cap);
    D.el("circle", { cx: 612, cy: 520, r: 5, fill: "#2f6fb8", stroke: "#10233c", "stroke-width": 1.5 }, cap);
    const haloCap = halo(cap, 590, 494, 56, 116, 14);

    /* les flèches : bleu (basse pression) en bas, orange (haute pression) en haut */
    const FL = {
      asp: flot(flA, [[40, 625], [628, 625]], 9, BP, 1.15),
      aspP: CX.map(cx => flot(flA, [[cx, 620], [cx, 548]], 3, BP, 0.9)),
      refP: CX.map(cx => flot(flR, [[cx, 362], [cx, 256]], 4, HP, 0.9)),
      ref: flot(flR, sep ? [[100, 255], [652, 255]] : [[100, 255], [610, 255], [610, 168]], 10, HP, 1.15)
    };

    if (o.sansArmoire) [arrD, arrF, porteG, cabG, cap].forEach(e => e.setAttribute("display", "none"));
    const E0 = { haut: 1, bas: 1, marche: [1, 1, 1], panne: 0, fermeRef: 0, fermeAsp: 0, fluxAsp: 0, fluxRef: 0, porte: 0, bp: 0.5, consigne: 0.5, vj: 0.5, onde: 0.4, signal: 0, haloCap: 0 };
    function maj(t, e) {
      e = Object.assign({}, E0, e || {});
      CX.forEach((cx, i) => {
        const m = e.marche[i];
        C[i].g.setAttribute("transform", "translate(" + (m * 0.9 * Math.sin(t * 53 + i * 2)).toFixed(2) + " " + (m * 0.7 * Math.sin(t * 61 + i)).toFixed(2) + ")");
        C[i].led(m, i === 2 ? e.panne : 0, t);
        C[i].niveau(e.huile ? e.huile[i] : 0.5);
        const fr = i === 2 ? e.fermeRef : 0, fa = i === 2 ? e.fermeAsp : 0;
        vref[i](fr); vasp[i](fa);
        clap[i](e.clap ? e.clap[i] : 1 - m);
        FL.aspP[i](t, 90, (e.fluxP === undefined ? e.fluxAsp : e.fluxP) * m * (1 - fa));
        FL.refP[i](t, 110, e.fluxRef * m * (1 - fr));
      });
      op(haut, e.haut); op(bas, e.bas);
      FL.asp(t, 120, e.fluxAsp);
      FL.ref(t, 130, e.fluxRef);
      // l'armoire : la porte pivote sur sa charnière, à droite
      porte.setAttribute("transform", "translate(952 0) scale(" + (1 - 0.9 * e.porte).toFixed(3) + " 1) translate(-952 0)");
      op(detail, 1 - 2.5 * e.porte);
      const yb = 428 - 86 * D.borne(e.bp, 0, 1), yc = 428 - 86 * e.consigne;
      jaugeBP.setAttribute("y", yb.toFixed(1)); jaugeBP.setAttribute("height", (428 - yb).toFixed(1));
      consL.setAttribute("y1", yc.toFixed(1)); consL.setAttribute("y2", yc.toFixed(1));
      consT.setAttribute("d", "M 706 " + (yc - 7).toFixed(1) + " L 718 " + yc.toFixed(1) + " L 706 " + (yc + 7).toFixed(1) + " Z");
      const T = e.tendance || [e.bp, e.bp];
      trait.setAttribute("points", pts(T.map((v, k) => [764 + 6 + (k / (T.length - 1)) * 122, 420 - 68 * D.borne(v, 0, 1)])));
      const hv = 134 * D.borne(e.vj, 0, 1);
      jaugeV.setAttribute("y", (634 - hv).toFixed(1)); jaugeV.setAttribute("height", hv.toFixed(1));
      let d = ""; // l'onde du variateur : plus ou moins resserrée
      for (let x = 0; x <= 108; x += 4) d += (x ? " L " : "M ") + (712 + x) + " " + (562 + 18 * Math.sin(x * (0.07 + 0.16 * e.onde) - t * (3 + 9 * e.onde))).toFixed(1);
      onde.setAttribute("d", d);
      ledV(e.vj > 0.02 ? 1 : 0, 0, t);
      signal(t, 70, e.signal); haloCap(t, e.haloCap);
      cableV(t, 70, e.cableV || 0);
    }
    return { CX: CX, maj: maj, racine: racine, calques: { fond: fond, comps: comps, haut: haut, bas: bas, cap: cap, arrF: arrF, porte: porteG }, flotRef: FL.ref };
  }

  /* ---------- le panneau : une carte opaque posée sur le haut de la centrale (chevauchement voulu) ---------- */
  function panneau(g) {
    const grp = D.el("g", { "data-layout-allow-overlap": "" }, g);
    const ombre = D.el("rect", { x: 28, y: 162, width: 932, height: 262, rx: 24, fill: "rgba(16,35,60,.14)" }, grp);
    const carte = D.el("rect", { x: 24, y: 156, width: 932, height: 262, rx: 24, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, grp);
    return { g: grp, pose: function (h, o, dy) {
      carte.setAttribute("height", h.toFixed(1)); ombre.setAttribute("height", h.toFixed(1));
      op(grp, o); grp.setAttribute("transform", "translate(0 " + (dy || 0).toFixed(1) + ")");
    } };
  }
  /* axes fléchés (sans graduation) */
  function axes(p, x0, y0, x1, y1, coul) {
    D.el("path", { d: "M " + x0 + " " + y0 + " V " + y1 + " m -7 12 l 7 -12 l 7 12 M " + (x0 - 4) + " " + y0 + " H " + x1 + " m -12 -7 l 12 7 l -12 7", fill: "none", stroke: coul || ENCRE, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, p);
  }

  /* ---------- la coupe d'un compresseur à piston (entrée dans le n° 2) : fenêtre qui s'ouvre sur le compresseur ----------
     Repère du contenu = repère de la scène, fenêtre pleine x 24 → 956, y 156 → 716 ; la molécule est dessinée par
     la scène (écran), la coupe lui rend ses repères. */
  const W0 = [226, 358, 136, 182], W1 = [24, 156, 932, 560]; // fenêtre : x, y, l, h (le compresseur 2, puis plein cadre)
  function coupe(g) {
    const grp = D.el("g", { "data-layout-allow-overlap": "" }, g), cid = idu("fen"); // la fenêtre recouvre la centrale : voulu
    const cadre = D.el("rect", { rx: 22 }, D.el("clipPath", { id: cid }, grp));
    const fond = D.el("rect", { rx: 22, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, grp);
    const rogne = D.el("g", { "clip-path": "url(#" + cid + ")" }, grp), c = D.el("g", {}, rogne), mol = D.el("g", {}, rogne);
    const FON = degrade(c, idu("cf"), [[0, "#c4ccd5"], [0.5, "#8d98a4"], [1, "#59636e"]], true);
    const FONH = degrade(c, idu("cfh"), [[0, "#59636e"], [0.5, "#aab4be"], [1, "#59636e"]], false);
    const XC = 500, YC = 598, R = 70, L = 150, PIN = 28; // vilebrequin
    /* carcasse : culasse, cylindre, carter */
    D.el("rect", { x: 380, y: 236, width: 240, height: 366, fill: FON, stroke: "#3b4550", "stroke-width": 3 }, c);
    D.el("rect", { x: 350, y: 560, width: 300, height: 146, rx: 30, fill: FON, stroke: "#3b4550", "stroke-width": 3 }, c);
    /* les deux tubes : aspiration (à gauche), refoulement (à droite) */
    D.el("rect", { x: 40, y: 268, width: 360, height: 44, rx: 6, fill: "url(#vm-cuivre)" }, c);
    D.el("rect", { x: 600, y: 268, width: 340, height: 44, rx: 6, fill: "url(#vm-cuivre)" }, c);
    D.el("rect", { x: 40, y: 276, width: 366, height: 28, fill: "#e3eefa" }, c);
    D.el("rect", { x: 594, y: 276, width: 346, height: 28, fill: "#fbe2d2" }, c);
    /* chambres d'aspiration et de refoulement, cylindre, carter */
    D.el("rect", { x: 394, y: 250, width: 92, height: 84, fill: "#e3eefa" }, c);
    D.el("rect", { x: 514, y: 250, width: 92, height: 84, fill: "#fbe2d2" }, c);
    D.el("rect", { x: 394, y: 344, width: 212, height: 270, fill: "#f4f8fc" }, c);
    D.el("rect", { x: 366, y: 576, width: 268, height: 114, rx: 18, fill: "#f4f8fc" }, c);
    /* plaque à clapets : deux lumières (aspiration à gauche, refoulement à droite) */
    [[380, 410], [470, 530], [590, 620]].forEach(([a, b]) => D.el("rect", { x: a, y: 334, width: b - a, height: 10, fill: "#6b7785", stroke: "#3b4550", "stroke-width": 1.5 }, c));
    /* huile au fond du carter : nappe ambre qui ondule */
    const huile = D.el("path", { fill: AMBRE, opacity: 0.85 }, c);
    /* piston, bielle, vilebrequin */
    const bielle = [D.el("line", { stroke: "#3f4a55", "stroke-width": 24, "stroke-linecap": "round" }, c), D.el("line", { stroke: "#aab6c3", "stroke-width": 11, "stroke-linecap": "round" }, c)];
    D.el("circle", { cx: XC, cy: YC, r: 18, fill: "url(#vm-acier)", stroke: "#3f4a55", "stroke-width": 3 }, c);
    const bras = D.el("line", { x1: XC, y1: YC, stroke: "#7d8a98", "stroke-width": 22, "stroke-linecap": "round" }, c);
    const manet = D.el("circle", { r: 11, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, c);
    const piston = D.el("g", {}, c);
    D.el("rect", { x: 398, y: 0, width: 204, height: 56, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [14, 28].forEach(y => D.el("line", { x1: 398, y1: y, x2: 602, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("circle", { cx: XC, cy: PIN, r: 10, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, piston);
    const clapA = D.el("rect", { x: 0, y: -3.5, width: 60, height: 7, rx: 3, fill: "#24384f" }, c), clapR = D.el("rect", { x: -60, y: -3.5, width: 60, height: 7, rx: 3, fill: "#24384f" }, c);
    /* étiquettes (elles apparaissent quand la fenêtre est ouverte) */
    const lab = D.el("g", {}, rogne);
    txt(lab, 490, 214, "compresseur 2", { a: "middle", t: 36, c: D.BLEU });
    txt(lab, 52, 252, "aspiration", { c: BP });
    txt(lab, 944, 252, "refoulement", { a: "end", c: HP });
    txt(lab, 214, 560, "piston"); const traitP = D.trait(lab, 240, 534, 396, 480);
    const brasX = th => XC + R * Math.sin(th), brasY = th => YC - R * Math.cos(th);
    const pinY = th => YC - R * Math.cos(th) - Math.sqrt(L * L - Math.pow(R * Math.sin(th), 2));
    const TDC = pinY(0) - PIN, BDC = pinY(PI) - PIN; // dessus du piston : haut et bas de course
    return {
      g: grp, mol: mol, haut: TDC, bas: BDC, pinY: th => pinY(th) - PIN,
      fenetre: function (w) { // w 0..1 : de la taille du compresseur à tout le cadre
        const x = D.lerp(W0[0], W1[0], w), y = D.lerp(W0[1], W1[1], w), l = D.lerp(W0[2], W1[2], w), h = D.lerp(W0[3], W1[3], w), k = Math.min(l / W1[2], h / W1[3]);
        [cadre, fond].forEach(e => { e.setAttribute("x", x.toFixed(1)); e.setAttribute("y", y.toFixed(1)); e.setAttribute("width", l.toFixed(1)); e.setAttribute("height", h.toFixed(1)); });
        const m = "translate(" + (x + l / 2 - 490 * k).toFixed(2) + " " + (y + h / 2 - 436 * k).toFixed(2) + ") scale(" + k.toFixed(4) + ")";
        c.setAttribute("transform", m); mol.setAttribute("transform", m);
        op(grp, w > 0.001 ? 1 : 0); op(lab, D.lisse((w - 0.8) / 0.2));
        return { x: x + l / 2 - 490 * k, y: y + h / 2 - 436 * k, k: k }; // repère contenu → écran
      },
      cycle: function (t, th, clA, clR) { // th : angle du vilebrequin ; clA, clR : clapets ouverts (0..1)
        const top = TDC + (pinY(th) - pinY(0)), px = brasX(th), py = brasY(th);
        piston.setAttribute("transform", "translate(0 " + top.toFixed(1) + ")");
        bielle.forEach(b => { b.setAttribute("x1", XC); b.setAttribute("y1", (top + PIN).toFixed(1)); b.setAttribute("x2", px.toFixed(1)); b.setAttribute("y2", py.toFixed(1)); });
        traitP.setAttribute("y2", (top + 28).toFixed(1));
        manet.setAttribute("cx", px.toFixed(1)); manet.setAttribute("cy", py.toFixed(1));
        bras.setAttribute("x2", px.toFixed(1)); bras.setAttribute("y2", py.toFixed(1));
        clapA.setAttribute("transform", "translate(410 348) rotate(" + (30 * clA).toFixed(1) + ")");
        clapR.setAttribute("transform", "translate(590 332) rotate(" + (-30 * clR).toFixed(1) + ")");
        let d = "M 366 690"; for (let x = 366; x <= 634; x += 12) d += " L " + x + " " + (672 + Math.sin(x / 30 - t * 2.4) * 3).toFixed(1);
        huile.setAttribute("d", d + " L 634 690 Z");
        return top;
      }
    };
  }

  /* =====================================================================
     4 · LES COMPRESSEURS (pres: 2 — la coupe s'anime à partir de la phrase 2)
     ===================================================================== */
  S.compresseurs = function (g, c) {
    const C = centrale(g, {});
    // ---- le panneau « froid demandé » (phrases 3 et 4) : les bandes disent combien de compresseurs tournent (1, 2 ou 3 points verts)
    const pan = panneau(g), cont = D.el("g", {}, pan.g);
    const PX0 = 92, PX1 = 926, PYB = 364, PH = 150;
    [[0, 0.36, "#e6eef8"], [0.36, 0.68, "#d3e3f5"], [0.68, 1, "#bcd5ef"]].forEach(([a, b, f], i) => {
      D.el("rect", { x: PX0, y: PYB - b * PH, width: PX1 - PX0, height: (b - a) * PH, fill: f }, cont);
      const yc = PYB - (a + b) / 2 * PH;
      for (let k = 0; k <= i; k++) D.el("circle", { cx: 940, cy: yc + (k - i / 2) * 17, r: 7, fill: "#2ecc71", stroke: "#1e7e54", "stroke-width": 2 }, cont);
    });
    axes(cont, 78, 372, 940, 196);
    txt(cont, 926, 404, "heures", { t: 28, a: "end" }); txt(cont, 100, 202, "froid demandé", { t: 28 });
    const aire = D.el("path", { fill: "rgba(47,111,184,.20)" }, cont), courbe = D.el("polyline", { fill: "none", stroke: BP, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, cont);
    const repere = D.el("line", { y2: 372, stroke: "#ff6b35", "stroke-width": 3, "stroke-dasharray": "3 7", "stroke-linecap": "round" }, cont), point = D.el("circle", { r: 10, fill: "#ff6b35", stroke: "#fff", "stroke-width": 3 }, cont);
    const DEM = [[0, 0.22], [0.12, 0.3], [0.25, 0.62], [0.38, 0.9], [0.5, 0.72], [0.62, 0.44], [0.74, 0.28], [0.86, 0.62], [1, 0.86]];
    const dem = u => D.courbe(DEM, u), XU = u => PX0 + 6 + u * (PX1 - PX0 - 12), YD = d => PYB - d * PH;
    // ---- ce que l'on pose sur la centrale : le compresseur 3 en panne (pastille rouge à croix), la clé, les vannes
    const panne3 = D.el("g", {}, g);
    D.el("circle", { cx: CX[2] + 34, cy: 458, r: 21, fill: ROUGE, stroke: "#fff", "stroke-width": 3 }, panne3);
    D.el("path", { d: "M " + (CX[2] + 25) + " 449 L " + (CX[2] + 43) + " 467 M " + (CX[2] + 43) + " 449 L " + (CX[2] + 25) + " 467", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round" }, panne3);
    const cle = D.el("g", {}, g);
    D.el("rect", { x: 0, y: -6.5, width: 92, height: 13, rx: 6.5, fill: "#8996a4", stroke: "#3f4a55", "stroke-width": 2.5 }, cle);
    D.el("circle", { r: 16, fill: "#8996a4", stroke: "#3f4a55", "stroke-width": 2.5 }, cle);
    D.el("rect", { x: -6, y: -6, width: 12, height: 12, fill: "#24384f" }, cle);
    const hVR = halo(g, CX[2] - 25, 320, 50, 42), hVA = halo(g, CX[2] - 22, 562, 44, 42);
    const labV = D.el("g", {}, g); txt(labV, 560, 200, "vannes d'isolement", { a: "end" }); D.trait(labV, 430, 212, 458, 334);
    const labA = txt(g, 140, 702, "collecteur d'aspiration"), labR = txt(g, 120, 206, "collecteur de refoulement");
    const pas = [pastille(g, "même aspiration", D.BLEU, 2, 2, 30, "start"), pastille(g, "même refoulement", D.ORANGE, 2, 2, 950, "end"), pastille(g, "les produits restent au froid", VERT, 5, 5, 30, "start")];
    // ---- l'entrée dans le compresseur 2 (phrase 7) : une fenêtre s'ouvre sur lui, on y voit un cylindre, son piston, deux clapets
    const cp = coupe(g), mila = D.heroine(g, { r: 30 });
    const tw = c.T[7], tA0 = tw + 1.2, tA1 = tw + 3.0, tC0 = tw + 3.3, tC1 = tw + 5.6, tFin = c.D - 0.4; // piston : descend (aspiration), remonte (compression), le gaz sort
    const theta = t => t < tC1 ? D.courbe([[tA0, 0], [tA1, PI], [tC0, PI], [tC1, TOUR]], t, true) : TOUR + (t - tC1) * TOUR / 3.2;
    const R0 = D.alea(41), M = [];
    for (let i = 0; i < 17; i++) M.push({ x: 70 + R0() * 270, v: R0(), u: R0(), e: R0(), e2: R0(), col: i % 4, maj: molecule(cp.mol) });
    return function (t) {
      // la demande de froid, le curseur et les voyants : 1, 2 ou 3 compresseurs selon le besoin
      const ur = D.lisse((t - c.T[3] - 0.4) / (c.E[3] - c.T[3] - 1.2)), cur = t > c.T[4] + 0.2 && t < c.T[5] - 0.2;
      const u = t < c.T[4] + 0.3 ? 0 : D.courbe([[c.T[4] + 0.3, 0], [c.E[4] + 0.4, 1]], t, true), d = dem(u);
      const pret = D.lisse((t - c.T[4] - 0.2) / 0.5), m4 = [1, D.lerp(1, D.lisse((d - 0.34) / 0.05), pret), D.lerp(1, D.lisse((d - 0.66) / 0.05), pret)];
      const panne = D.lisse((t - c.T[5] - 0.3) / 0.5), marche = t < c.T[5] ? m4 : [1, 1, 1 - panne];
      // phrase 6 : la vanne de refoulement du 3 se ferme, puis celle d'aspiration (la clé passe de l'une à l'autre)
      const fRef = D.lisse((t - c.A(6, 0.04)) / 1.3), fAsp = D.lisse((t - c.A(6, 0.55)) / 1.3);
      const fluxA = D.lisse((t - c.T[2]) / 0.8) * (1 - D.lisse((t - tw + 0.2) / 0.6));
      C.maj(t, { marche: marche, panne: panne, fermeAsp: fAsp, fermeRef: fRef, fluxAsp: fluxA, fluxRef: fluxA });
      const ap = fen(t, c.T[3] - 0.3, c.T[5] - 0.1, 0.6);
      pan.pose(262, ap, 30 * (1 - ap));
      const N = Math.round(40 * ur), P = [];
      for (let k = 0; k <= N; k++) P.push([XU(k / 40), YD(dem(k / 40))]);
      courbe.setAttribute("points", N > 0 ? pts(P) : "0,0 0,0");
      aire.setAttribute("d", N > 0 ? "M " + PX0 + " " + PYB + " L " + P.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " L " + P[N][0].toFixed(1) + " " + PYB + " Z" : "");
      repere.setAttribute("x1", XU(u)); repere.setAttribute("x2", XU(u)); repere.setAttribute("y1", YD(d));
      op(repere, cur ? 1 : 0); point.setAttribute("cx", XU(u)); point.setAttribute("cy", YD(d)); op(point, cur ? 1 : 0);
      op(panne3, panne * (0.75 + 0.25 * Math.sin(t * 8)));
      const enAsp = t > c.A(6, 0.5), cy = D.lerp(337, 581, D.lisse((t - c.A(6, 0.4)) / 0.5));
      cle.setAttribute("transform", "translate(" + (CX[2] + 4) + " " + cy.toFixed(1) + ") rotate(" + (30 + 90 * (enAsp ? fAsp : fRef)).toFixed(1) + ")"); op(cle, fen(t, c.T[6] + 0.1, c.E[6] - 0.1, 0.4));
      hVR(t, fen(t, c.T[6], c.E[6], 0.4) * (1 - fRef)); hVA(t, fen(t, c.A(6, 0.5), c.E[6], 0.4) * (1 - fAsp));
      op(labV, fen(t, c.T[6] + 0.1, c.E[6], 0.4));
      op(labA, fen(t, c.A(2, 0), c.A(2, 0.5), 0.4)); op(labR, fen(t, c.A(2, 0.5), c.E[2] - 0.2, 0.4));
      op(pas[0].g, fen(t, c.A(2, 0.1), c.T[3] - 0.1, 0.4)); op(pas[1].g, fen(t, c.A(2, 0.5), c.T[3] - 0.1, 0.4)); op(pas[2].g, fen(t, c.T[5] + 0.4, c.T[6] - 0.1, 0.4));
      // la coupe
      const w = D.lisse((t - (tw - 0.1)) / 1.2), th = theta(t), phi = th % TOUR, rep = cp.fenetre(w);
      const top = cp.cycle(t, th, phi > 0.04 * PI && phi < 0.96 * PI ? 1 : 0, phi > 1.8 * PI || (th > TOUR && phi < 0.12 * PI) ? 1 : 0);
      const cm = D.courbe([[tC0, 0], [tC1, 1]], t, true), temp = D.lerp(0.2, 0.62, D.lisse(cm));
      M.forEach(m => { // les molécules du mélange : dans le tube, puis dans le cylindre, puis au refoulement
        const te = tw + 1.7 + 1.0 * m.e, tx = tC1 - 0.4 + 0.8 * m.e2, k1 = D.lisse((t - te) / 0.9), k2 = D.lisse((t - tx) / 1.0);
        const px = D.lerp(m.x, 440, D.lisse((t - tw) / (te - tw + 0.4))), py = 290 + (m.v - 0.5) * 22, bx = 410 + m.u * 180, by = 364 + m.v * Math.max(2, top - 390);
        let x = px, y = py;
        if (k2 > 0) { const q = k2 * 2; x = q < 1 ? D.lerp(bx, 560, q) : D.lerp(560, 640 + m.u * 280, q - 1); y = q < 1 ? D.lerp(by, 300, q) : D.lerp(300, py, q - 1); if (k2 >= 1) { x = 640 + m.u * 280 + (t - tx - 1) * 150; y = py; } }
        else if (k1 > 0) { const q = k1 * 2; x = q < 1 ? D.lerp(px, 440, q) : D.lerp(440, bx, q - 1); y = q < 1 ? D.lerp(py, 340, q) : D.lerp(340, by, q - 1); }
        m.maj(rep.x + x * rep.k, rep.y + y * rep.k, 0.78 * rep.k, x > 934 || w < 0.98 ? 0 : 1, m.col ? AUTRES[m.col - 1] : D.couleur(temp, true));
      });
      // l'héroïne : dans le collecteur, puis (fenêtre ouverte) dans le tube, le cylindre, enfin au refoulement
      let hx, hy, hs = 0.5, ec = 0, hum = "sourire", vis = 1;
      if (t < tw - 0.5) {
        hx = D.lerp(40, CX[1], D.lisse((t - c.T[2] - 0.2) / (c.E[2] - c.T[2] - 0.6))); hy = 625 + Math.sin(t * 2.2) * 3; vis = D.lisse((t - c.T[2]) / 0.5);
        hum = t > c.T[5] && t < c.T[6] ? "surprise" : "sourire";
      } else if (w < 0.7) { // elle monte dans le piquage pendant que la fenêtre s'ouvre
        const f = D.lisse((t - tw + 0.5) / 0.9);
        hx = CX[1]; hy = D.lerp(625, 566, f); hs = D.lerp(0.5, 0.4, f); vis = 1 - D.lisse((w - 0.3) / 0.35);
      } else {
        const ta = tw + 1.9, tb = tw + 3.1;
        let cxh, cyh;
        if (t < ta) { cxh = D.lerp(70, 340, D.lisse((t - tw - 0.9) / (ta - tw - 0.9))); cyh = 290; }
        else if (t < tb) { const q = D.lisse((t - ta) / (tb - ta)); cxh = q < 0.5 ? D.lerp(340, 440, q * 2) : D.lerp(440, 500, q * 2 - 1); cyh = q < 0.5 ? 290 + 50 * q * q * 4 : D.lerp(340, top - 40, q * 2 - 1); hs = D.lerp(0.5, 0.62, q); }
        else if (t < tC1) { cxh = D.lerp(500, 560, cm * cm); cyh = Math.max(366, top - 40); hs = 0.62; ec = 0.6 * D.lisse(cm); }
        else { const q = D.lisse((t - tC1) / (tFin - tC1)); cxh = D.lerp(560, 900, D.lisse((q - 0.2) / 0.8)); cyh = D.lerp(Math.max(366, top - 40), 290, D.lisse(q / 0.25)); hs = 0.5; ec = 0.6 * (1 - D.lisse(q / 0.3)); }
        hum = t > tb ? "chaud" : t > ta ? "surprise" : "sourire";
        hx = rep.x + cxh * rep.k; hy = rep.y + cyh * rep.k; hs *= rep.k; vis = D.lisse((w - 0.75) / 0.25) * D.lisse((t - tw - 0.8) / 0.3);
      }
      plan(mila, g);
      mila({ x: hx, y: hy, s: hs, t: t, temp: temp, etat: "vapeur", humeur: hum, ecrase: ec, regard: [1, 0], op: vis });
      return { temp: temp, etat: "vapeur", humeur: hum, diag: 3 + D.borne(cm, 0, 1), diag0: 3, carte: D.courbe([[c.T[2], 3.05], [c.E[2], 3.12], [tw, 3.3], [tC1, 3.5], [c.D, 3.55]], t) };
    };
  };

  /* ---------- la balance : elle compare (la mesure à gauche, la consigne à droite) ---------- */
  function balance(parent, cx, cy) {
    const g = D.el("g", {}, parent), L = 78;
    D.el("path", { d: "M " + cx + " " + (cy + 4) + " L " + (cx - 20) + " " + (cy + 70) + " L " + (cx + 20) + " " + (cy + 70) + " Z", fill: "#8996a4", stroke: "#3f4a55", "stroke-width": 3, "stroke-linejoin": "round" }, g);
    const fleau = D.el("line", { stroke: "#3f4a55", "stroke-width": 8, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: cx, cy: cy, r: 9, fill: "#3f4a55" }, g);
    const P = [-1, 1].map(s => ({
      s: s, fils: [0, 1].map(() => D.el("line", { stroke: "#3f4a55", "stroke-width": 2.5 }, g)),
      bol: D.el("path", { fill: "#cfd8e2", stroke: "#3f4a55", "stroke-width": 3, "stroke-linejoin": "round" }, g),
      bille: D.el("circle", { r: 13, fill: s < 0 ? BP : VERT, stroke: "#fff", "stroke-width": 2.5 }, g)
    }));
    return function (angle) { // angle > 0 : la droite descend
      const a = angle * PI / 180, dx = L * Math.cos(a), dy = L * Math.sin(a);
      fleau.setAttribute("x1", (cx - dx).toFixed(1)); fleau.setAttribute("y1", (cy - dy).toFixed(1)); fleau.setAttribute("x2", (cx + dx).toFixed(1)); fleau.setAttribute("y2", (cy + dy).toFixed(1));
      P.forEach(p => {
        const ex = cx + p.s * dx, ey = cy + p.s * dy, py = ey + 40;
        p.fils[0].setAttribute("x1", ex.toFixed(1)); p.fils[0].setAttribute("y1", ey.toFixed(1)); p.fils[0].setAttribute("x2", (ex - 30).toFixed(1)); p.fils[0].setAttribute("y2", py.toFixed(1));
        p.fils[1].setAttribute("x1", ex.toFixed(1)); p.fils[1].setAttribute("y1", ey.toFixed(1)); p.fils[1].setAttribute("x2", (ex + 30).toFixed(1)); p.fils[1].setAttribute("y2", py.toFixed(1));
        p.bol.setAttribute("d", "M " + (ex - 34).toFixed(1) + " " + py.toFixed(1) + " Q " + ex.toFixed(1) + " " + (py + 24).toFixed(1) + " " + (ex + 34).toFixed(1) + " " + py.toFixed(1) + " Z");
        p.bille.setAttribute("cx", ex.toFixed(1)); p.bille.setAttribute("cy", (py - 12).toFixed(1));
      });
    };
  }
  /* ---------- un thermomètre de meuble (la colonne rouge reste en place) ---------- */
  function thermometre(parent, x, y, h, niveau) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x - 8, y: y, width: 16, height: h, rx: 8, fill: "#fff", stroke: "#637285", "stroke-width": 2.5 }, g);
    D.el("circle", { cx: x, cy: y + h + 6, r: 14, fill: "#d8453a", stroke: "#637285", "stroke-width": 2.5 }, g);
    const col = D.el("rect", { x: x - 4.5, width: 9, fill: "#d8453a" }, g);
    return function (v) { const hh = (h - 6) * v; col.setAttribute("y", (y + h - hh + 2).toFixed(1)); col.setAttribute("height", (hh + 6).toFixed(1)); };
  }

  /* =====================================================================
     5 · LA BASSE PRESSION COMMANDE (le capteur, le régulateur, la jauge et son trait vert)
     ===================================================================== */
  S.bp = function (g, c) {
    const C = centrale(g, {});
    const hAsp = halo(g, 25, 590, 620, 70, 16);
    const nu = nuage(g, 56, 17), fin = flot(g, [[40, 625], [200, 625]], 3, BP, 1.3);
    const labCap = D.el("g", {}, g), labReg = D.el("g", {}, g), labMeu = D.el("g", {}, g);
    txt(labCap, 648, 200, "capteur de pression"); D.trait(labCap, 700, 214, 622, 490);
    txt(labReg, 950, 200, "régulateur de centrale", { a: "end", t: 30 }); D.trait(labReg, 800, 214, 800, 318);
    txt(labMeu, 30, 706, "des meubles →", { t: 30, c: BP }); txt(labMeu, 640, 706, "vers les compresseurs ↑", { t: 30, c: BP, a: "end" });
    // phrase 5 : la balance compare
    const gb = D.el("g", {}, g), bal = balance(gb, 800, 186);
    txt(gb, 722, 286, "BP", { t: 28, a: "middle", c: BP }); txt(gb, 878, 286, "consigne", { t: 28, a: "middle", c: VERT });
    const ok = D.el("g", {}, gb);
    D.el("circle", { cx: 930, cy: 222, r: 20, fill: VERT }, ok); D.el("path", { d: "M 920 222 L 927 230 L 941 213", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, ok);
    // phrase 6 : une courbe plate et trois thermomètres de meubles
    const g6 = D.el("g", {}, g);
    D.el("rect", { x: 640, y: 156, width: 312, height: 136, rx: 18, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g6);
    axes(g6, 664, 250, 806, 176); const plate = D.el("polyline", { fill: "none", stroke: BP, "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, g6);
    txt(g6, 735, 278, "BP", { t: 28, a: "middle", c: BP });
    const th = [842, 886, 930].map(x => thermometre(g6, x, 174, 56, 0.55)); txt(g6, 886, 278, "meubles", { t: 28, a: "middle" });
    const pas = [pastille(g, "la basse pression commande", D.BLEU, 0, 0, 30), pastille(g, "BP ↑", BP, 3, 3, 30), pastille(g, "BP ↓", BP, 4, 4, 30),
      pastille(g, "il compare et décide", D.BLEU, 5, 5, 30), pastille(g, "BP stable = meubles stables", VERT, 6, 6, 30)];
    const mila = D.heroine(g, { r: 30 });
    const bpDe = t => D.courbe([[0, 0.5], [c.T[3] + 0.3, 0.5], [c.E[3] - 0.4, 0.86], [c.T[4], 0.86], [c.E[4] - 0.1, 0.16], [c.T[5] + 0.2, 0.16], [c.T[5] + 1.8, 0.46], [c.A(5, 0.7), 0.57], [c.E[5], 0.5], [c.D, 0.5]], t) + (t > c.T[6] ? 0.006 : 0.014) * Math.sin(t * 3.1);
    const fIn = t => D.courbe([[0, 0.6], [c.T[3] - 0.2, 0.6], [c.T[3] + 0.6, 1], [c.E[3] + 0.1, 1], [c.T[4] + 0.3, 0.18], [c.E[4], 0.18], [c.T[5], 0.6], [c.D, 0.6]], t);
    const fOut = t => D.courbe([[0, 0.6], [c.T[3] - 0.2, 0.6], [c.T[3] + 0.6, 0.3], [c.E[3] + 0.1, 0.3], [c.T[4] + 0.3, 1], [c.E[4], 1], [c.T[5], 0.6], [c.D, 0.6]], t);
    return function (t) {
      const bp = bpDe(t), fi = fIn(t), fo = fOut(t), tend = [];
      for (let k = 0; k < 22; k++) tend.push(bpDe(Math.max(0, t - 8 * (1 - k / 21))));
      const porte = D.lisse((t - c.T[2] + 0.3) / 1.0);
      C.maj(t, { haut: 0.5, marche: [1, 1, 1], fluxAsp: 0, fluxP: fo, fluxRef: 0, porte: porte, bp: bp, tendance: tend, consigne: 0.5,
        signal: D.lisse((t - c.T[1]) / 0.6), haloCap: fen(t, c.T[1], c.E[1] + 0.3, 0.4) });
      hAsp(t, fen(t, c.T[0], c.E[0] + 0.3, 0.5));
      nu(t, ZASP, { densite: 0.08 + 0.92 * bp, vit: 0.008 + 0.012 * fi, s: 0.72, temp: 0.2, op: 1 });
      fin(t, 80 + 90 * fi, fi * D.lisse((t - c.T[0]) / 0.6));
      op(labCap, fen(t, c.T[1] - 0.1, c.E[1] + 0.3, 0.3)); op(labReg, fen(t, c.T[2] + 0.25, c.E[2] + 0.6, 0.4));
      op(labMeu, fen(t, c.T[3] - 0.1, c.E[4] + 0.5, 0.5));
      // la balance : la mesure pèse du côté de la basse pression ; elle revient à l'équilibre
      const gbv = fen(t, c.T[5] - 0.1, c.E[5] + 0.4, 0.5);
      op(gb, gbv); bal(-D.borne((bp - 0.5) * 90, -16, 16)); op(ok, D.lisse((t - c.A(5, 0.72)) / 0.4));
      // phrase 6 : la courbe plate et les thermomètres
      op(g6, fen(t, c.T[6] - 0.1, c.D, 0.5));
      const P = []; for (let k = 0; k <= 16; k++) P.push([674 + k * 7.5, 212 + 3 * Math.sin(k * 2.1 + t * 3) + 2 * Math.sin(k * 0.9 - t * 2)]);
      plate.setAttribute("points", pts(P));
      th.forEach((f, i) => f(0.55 + 0.012 * Math.sin(t * 2 + i * 2)));
      montrer(pas, c, t);
      const hum = t > c.A(3, 0.55) && t < c.E[3] + 0.4 ? "surprise" : "sourire";
      plan(mila, g);
      mila({ x: 320 + 12 * Math.sin(t * 0.7), y: 625 + 2 * Math.sin(t * 2.1), s: 0.5, t: t, temp: 0.2, etat: "vapeur", humeur: hum, regard: [1, 0] });
      return { temp: 0.2, etat: "vapeur", humeur: hum };
    };
  };

  /* ---------- les petits dessins de la marche étagée : horloge, sablier, lune, meuble, client, moteur ---------- */
  function horloge(parent, cx, cy, r) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    for (let k = 0; k < 12; k++) { const a = k * PI / 6; D.el("line", { x1: cx + (r - 9) * Math.sin(a), y1: cy - (r - 9) * Math.cos(a), x2: cx + (r - 3) * Math.sin(a), y2: cy - (r - 3) * Math.cos(a), stroke: D.BLEU, "stroke-width": 2.5 }, g); }
    D.el("line", { x1: cx, y1: cy, x2: cx + r * 0.5 * Math.sin(-PI / 3), y2: cy - r * 0.5 * Math.cos(-PI / 3), stroke: D.BLEU, "stroke-width": 5, "stroke-linecap": "round" }, g); // le 10
    D.el("line", { x1: cx, y1: cy, x2: cx, y2: cy - r * 0.78, stroke: D.BLEU, "stroke-width": 3.5, "stroke-linecap": "round" }, g);                                // le 12
    D.el("circle", { cx: cx, cy: cy, r: 4, fill: D.BLEU }, g);
    return g;
  }
  function sablier(parent, cx, cy) {
    const g = D.el("g", {}, parent), H = 32, Wd = 22;
    const haut = D.el("path", { fill: "#e0a82e" }, g), bas = D.el("path", { fill: "#e0a82e" }, g), filet = D.el("line", { x1: cx, x2: cx, stroke: "#e0a82e", "stroke-width": 3 }, g);
    D.el("path", { d: "M " + (cx - Wd) + " " + (cy - H) + " L " + (cx + Wd) + " " + (cy - H) + " L " + (cx + 3) + " " + cy + " L " + (cx + Wd) + " " + (cy + H) + " L " + (cx - Wd) + " " + (cy + H) + " L " + (cx - 3) + " " + cy + " Z", fill: "rgba(207,224,243,.45)", stroke: D.BLEU, "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
    [-H - 6, H].forEach(y => D.el("rect", { x: cx - Wd - 6, y: cy + y, width: 2 * Wd + 12, height: 7, rx: 3, fill: "#8a5a2a" }, g));
    return { g: g, set: function (f) { // f 0 → 1 : le sable passe en bas
      const h = H * (1 - f), w = 3 + (Wd - 3) * (h / H), hb = H * 0.75 * f, wb = (Wd - 2) * Math.sqrt(f);
      haut.setAttribute("d", f >= 0.999 ? "" : "M " + (cx - 3) + " " + cy + " L " + (cx + 3) + " " + cy + " L " + (cx + w) + " " + (cy - h) + " L " + (cx - w) + " " + (cy - h) + " Z");
      bas.setAttribute("d", f <= 0.001 ? "" : "M " + (cx - wb) + " " + (cy + H) + " L " + cx + " " + (cy + H - hb) + " L " + (cx + wb) + " " + (cy + H) + " Z");
      filet.setAttribute("y1", cy); filet.setAttribute("y2", cy + H - hb); op(filet, f > 0.001 && f < 0.999 ? 1 : 0);
    } };
  }
  function lune(parent, cx, cy) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: cx, cy: cy, r: 25, fill: "#f3c623" }, g);
    D.el("circle", { cx: cx + 13, cy: cy - 9, r: 21, fill: "#fffdf8" }, g);
    [[cx + 36, cy - 20, 8], [cx + 40, cy + 12, 6]].forEach(([x, y, r]) => D.el("path", { d: "M " + x + " " + (y - r) + " L " + (x + r * 0.3) + " " + (y - r * 0.3) + " L " + (x + r) + " " + y + " L " + (x + r * 0.3) + " " + (y + r * 0.3) + " L " + x + " " + (y + r) + " L " + (x - r * 0.3) + " " + (y + r * 0.3) + " L " + (x - r) + " " + y + " L " + (x - r * 0.3) + " " + (y - r * 0.3) + " Z", fill: "#f3c623" }, g));
    return g;
  }
  /* un meuble vu de face, avec son rideau de nuit : rideau(v) 0 → 1 le baisse */
  function meuble(parent, x, y, w, h) {
    const g = D.el("g", {}, parent), COUL = ["#f4f1e8", "#e8c458", "#d8584a", "#9ccf6a", "#7fb0e0"];
    D.el("rect", { x: x, y: y, width: w, height: h, rx: 8, fill: "#dce9f5", stroke: D.BLEU, "stroke-width": 3.5 }, g);
    D.el("rect", { x: x + 7, y: y + 7, width: w - 14, height: h - 14, rx: 4, fill: "#eef5fb" }, g);
    for (let r = 0; r < 3; r++) {
      const yy = y + 8 + (r + 1) * (h - 16) / 3 - 2;
      D.el("line", { x1: x + 7, y1: yy, x2: x + w - 7, y2: yy, stroke: "#9aa7b5", "stroke-width": 3 }, g);
      for (let k = 0; k < 6; k++) D.el("rect", { x: x + 12 + k * ((w - 24) / 6), y: yy - 14, width: (w - 24) / 6 - 4, height: 12, rx: 3, fill: COUL[(r + k) % 5] }, g);
    }
    const rid = D.el("g", {}, g), fond = D.el("rect", { x: x + 4, y: y + 4, width: w - 8, rx: 5, fill: "rgba(51,72,102,.9)" }, rid), lames = [];
    for (let k = 0; k < 7; k++) lames.push(D.el("line", { x1: x + 8, x2: x + w - 8, y1: y + 14 + k * 11, y2: y + 14 + k * 11, stroke: "#8fa6c2", "stroke-width": 2.5 }, rid));
    return function (v) { const hh = (h - 8) * v; fond.setAttribute("height", hh.toFixed(1)); lames.forEach((l, k) => op(l, hh > 14 + k * 11 + 2 ? 0.8 : 0)); };
  }
  function client(parent, x, y, couleur) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: 0, cy: -34, r: 10, fill: couleur }, g);
    D.el("path", { d: "M -17 20 L -17 -8 Q -17 -24 0 -24 Q 17 -24 17 -8 L 17 20 Z", fill: couleur }, g);
    return function (t, o) { g.setAttribute("transform", "translate(" + (x + 2.5 * Math.sin(t * 1.3 + x)).toFixed(1) + " " + y + ")"); op(g, o); };
  }
  /* un moteur électrique (corps, ailettes, arbre, boîte à bornes) : pulse(v) le fait sursauter à chaque démarrage */
  function moteur(parent, x, y) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x - 40, y: y + 52, width: 52, height: 22, rx: 5, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2.5 }, g);   // l'arbre
    D.el("rect", { x: x, y: y, width: 240, height: 126, rx: 24, fill: "url(#vm-marine)", stroke: "#0c1d33", "stroke-width": 3 }, g);
    for (let k = 0; k < 9; k++) D.el("line", { x1: x + 34 + k * 20, y1: y + 14, x2: x + 34 + k * 20, y2: y + 112, stroke: "#5d80ad", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.7 }, g);
    D.el("rect", { x: x + 90, y: y - 30, width: 70, height: 34, rx: 6, fill: "url(#vm-noir)", stroke: "#000", "stroke-width": 2 }, g);
    [x + 18, x + 168].forEach(px => D.el("rect", { x: px, y: y + 126, width: 54, height: 14, rx: 3, fill: "#3f4a55" }, g));
    return { g: g, pulse: v => g.setAttribute("transform", "translate(" + (x + 120) + " " + (y + 63) + ") scale(" + (1 + 0.035 * v).toFixed(3) + ") translate(" + (-x - 120) + " " + (-y - 63) + ")") };
  }
  const eclair = (parent, x, y, k) => D.el("path", { d: "M " + (x + 8 * k) + " " + y + " L " + (x - 10 * k) + " " + (y + 26 * k) + " L " + (x + 2 * k) + " " + (y + 26 * k) + " L " + (x - 6 * k) + " " + (y + 50 * k) + " L " + (x + 16 * k) + " " + (y + 18 * k) + " L " + (x + 4 * k) + " " + (y + 18 * k) + " L " + (x + 14 * k) + " " + y + " Z", fill: "#f3c623", stroke: "#a8820e", "stroke-width": 2.5, "stroke-linejoin": "round" }, parent);

  /* =====================================================================
     6 · UN DE PLUS, UN DE MOINS (la marche étagée)
     Un panneau sur le haut de la centrale : la vignette du magasin à gauche, la courbe de basse pression et
     la zone neutre à droite ; les voyants des compresseurs restent visibles dessous. Phrases 5 et 6 : le
     panneau s'agrandit (trois jours côte à côte, le moteur et son compteur de démarrages).
     ===================================================================== */
  S.etages = function (g, c) {
    const C = centrale(g, {});
    const pan = panneau(g), cont = D.el("g", {}, pan.g), grand = D.el("g", {}, pan.g);
    // ---- la vignette : horloge / sablier / lune, deux meubles, leurs électrovannes, des clients
    const hor = horloge(cont, 84, 206, 30), h10 = txt(cont, 126, 220, "10 h", { t: 36 });
    const sab = sablier(cont, 84, 206), lun = lune(cont, 76, 206);
    const mA = meuble(cont, 98, 258, 118, 82), mB = meuble(cont, 286, 258, 118, 82);
    const cl = [client(cont, 157, 372, "#4c5b70"), client(cont, 345, 372, "#566a86")];
    const ev = [[44, 300], [232, 300]].map(([x, y]) => { D.image(cont, "electrovanne", x, y, 54, 40); return D.el("circle", { cx: x + 48, cy: y + 2, r: 8, stroke: "#fff", "stroke-width": 2.5 }, cont); });
    // ---- le graphique : basse pression au fil des heures, zone neutre entre « haut » et « bas »
    const PX0 = 478, PX1 = 850, YB = 376, PH = 152, HAUT = 0.78, BAS = 0.3, yH = YB - HAUT * PH, yB = YB - BAS * PH;
    const bande = D.el("rect", { x: PX0, y: yH, width: PX1 - PX0, height: yB - yH, fill: "#e8f3ea" }, cont);
    [yH, yB].forEach(y => D.el("line", { x1: PX0, y1: y, x2: PX1 + 8, y2: y, stroke: GRIS, "stroke-width": 3, "stroke-dasharray": "10 7" }, cont));
    axes(cont, 470, 380, 858, 190);
    txt(cont, 482, 198, "basse pression", { t: 28 }); txt(cont, 852, 410, "heures", { t: 28, a: "end" });
    const lbH = txt(cont, 864, yH - 8, "haut", { t: 28, c: GRIS }), lbN1 = txt(cont, 864, 285, "zone", { t: 28, c: GRIS }), lbN2 = txt(cont, 864, 319, "neutre", { t: 28, c: GRIS }), lbB = txt(cont, 864, yB + 32, "bas", { t: 28, c: GRIS });
    const XU = u => PX0 + 8 + u * (PX1 - PX0 - 16), YP = v => YB - v * PH;
    const BPK = [[0, 0.55], [0.08, 0.57], [0.14, 0.6], [0.24, 0.8], [0.31, 0.84], [0.47, 0.83], [0.56, 0.6], [0.64, 0.52], [0.68, 0.4], [0.74, 0.22], [0.8, 0.32], [0.86, 0.46], [0.93, 0.53], [1, 0.52]];
    const bpU = u => D.courbe(BPK, u);
    const aire = D.el("path", { fill: "rgba(47,111,184,.14)" }, cont), courbe = D.el("polyline", { fill: "none", stroke: BP, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, cont);
    const point = D.el("circle", { r: 10, fill: "#ff6b35", stroke: "#fff", "stroke-width": 3 }, cont);
    D.el("line", { x1: XU(0.14), y1: 380, x2: XU(0.14), y2: 388, stroke: ENCRE, "stroke-width": 3 }, cont); txt(cont, XU(0.14), 410, "10 h", { t: 28, a: "middle" });
    const cPlus = D.el("g", {}, cont), cMoins = D.el("g", {}, cont);
    txt(cPlus, 586, 234, "+ 1 compresseur", { t: 30, c: VERT });
    txt(cMoins, 716, 366, "− 1 compresseur", { t: 30, c: HP, a: "end" }); D.trait(cMoins, 722, 356, 738, 346, HP);
    const uT = t => D.courbe([[c.T[0] + 0.3, 0], [c.E[0], 0.2], [c.E[1], 0.34], [c.E[2], 0.52], [c.E[3], 0.78], [c.E[4], 1]], t, true);
    // ---- le grand panneau : trois jours côte à côte et trois compteurs d'heures (phrase 5)
    const g5 = D.el("g", {}, grand), g6 = D.el("g", {}, grand);
    const JOURS = [["lundi", [1, 2, 3]], ["mardi", [2, 3, 1]], ["mercredi", [3, 1, 2]]], CX5 = [44, 350, 656];
    const jours = JOURS.map(([nom, ordre], j) => {
      const gj = D.el("g", {}, g5), x0 = CX5[j];
      D.el("rect", { x: x0, y: 176, width: 280, height: 224, rx: 18, fill: "#f4f8fc", stroke: "#9aa7b5", "stroke-width": 2.5 }, gj);
      txt(gj, x0 + 140, 218, nom, { t: 32, a: "middle", c: D.BLEU });
      ordre.forEach((n, i) => {
        const x = x0 + 52 + i * 88, y = 292;
        D.el("circle", { cx: x, cy: y, r: 30, fill: "#fffdf8", stroke: i ? D.BLEU : VERT, "stroke-width": i ? 3.5 : 7 }, gj);
        D.texte(gj, x, y + 11, String(n), { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: D.BLEU, "font-family": POLICE });
        if (i < 2) D.el("path", { d: "M " + (x + 36) + " " + y + " H " + (x + 52) + " m -8 -7 l 8 7 l -8 7", fill: "none", stroke: GRIS, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, gj);
      });
      txt(gj, x0 + 52, 362, "départ", { t: 28, a: "middle", c: VERT });
      return gj;
    });
    txt(g5, 44, 478, "compteurs", { t: 32 }); txt(g5, 44, 516, "d'heures", { t: 32 });
    const BX = [440, 640, 840], BY = 640, BH = 180, barres = BX.map((x, i) => {
      D.el("rect", { x: x - 50, y: BY - BH, width: 100, height: BH, rx: 8, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 3 }, g5);
      const r = D.el("rect", { x: x - 46, width: 92, rx: 5, fill: BP }, g5);
      D.el("circle", { cx: x, cy: 676, r: 20, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 3 }, g5);
      D.texte(g5, x, 686, String(i + 1), { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: D.BLEU, "font-family": POLICE });
      return r;
    });
    const egal = D.el("line", { x1: 380, y1: BY - BH - 8, x2: 900, y2: BY - BH - 8, stroke: VERT, "stroke-width": 4, "stroke-dasharray": "12 8" }, g5);
    const CUM = [[0.5, 0.33, 0.17], [0.67, 0.83, 0.5], [1, 1, 1]];
    // ---- phrase 6 : un moteur, un compteur de démarrages, un plafond (trait rouge)
    const mot = moteur(g6, 110, 330), bolt = D.el("g", {}, g6); eclair(bolt, 410, 330, 1.3);
    D.el("rect", { x: 620, y: 262, width: 80, height: 388, rx: 8, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 3 }, g6);
    const crans = []; for (let i = 0; i < 9; i++) crans.push(D.el("rect", { x: 626, y: 644 - (i + 1) * 40 + 6, width: 68, height: 32, rx: 4, fill: BP }, g6));
    D.el("line", { x1: 596, y1: 252, x2: 724, y2: 252, stroke: ROUGE, "stroke-width": 6, "stroke-dasharray": "14 8", "stroke-linecap": "round" }, g6);
    txt(g6, 736, 264, "limite", { t: 32, c: ROUGE });
    const stop = D.el("g", {}, g6); D.el("circle", { cx: 660, cy: 214, r: 24, fill: ROUGE }, stop); D.el("rect", { x: 644, y: 207, width: 32, height: 14, rx: 3, fill: "#fff" }, stop);
    txt(g6, 230, 500, "moteur", { t: 30, a: "middle" }); txt(g6, 660, 690, "démarrages", { t: 30, a: "middle" });
    const lien = D.el("path", { d: "M 400 420 H 590 m -12 -9 l 12 9 l -12 9", fill: "none", stroke: GRIS, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, g6);
    const hLed = halo(g, CX[2] - 54, 428, 40, 40, 20); // le voyant du compresseur 3 attend l'ordre (phrases 1-2) puis l'arrêt (phrase 3)
    const pas = [pastille(g, "il attend un peu", D.BLEU, 2, 2, 30), pastille(g, "zone neutre : rien ne change", VERT, 4, 4, 30), pastille(g, "chacun autant", VERT, 5, 5, 30), pastille(g, "démarrages limités", D.ORANGE, 6, 6, 30)];
    const mila = D.heroine(g, { r: 30 });
    const tOn = c.A(2, 0.74), tOff = c.A(3, 0.85);
    return function (t) {
      // la journée : le curseur, la courbe, les voyants
      const u = uT(t), v = bpU(u), nuit = D.lisse((t - c.T[3] + 0.3) / 0.9);
      const m3 = D.lisse((t - tOn) / 0.4) * (1 - D.lisse((t - tOff) / 0.4));
      C.maj(t, { marche: [1, 1, m3], fluxAsp: 1, fluxRef: 1 });
      hLed(t, Math.max(fen(t, c.A(1, 0.35), tOn, 0.3), fen(t, c.A(3, 0.67), tOff, 0.3)));
      op(C.racine, 1 - D.lisse((t - c.T[5] + 0.5) / 0.5));
      const N = Math.round(60 * u), P = [];
      for (let k = 0; k <= N; k++) P.push([XU(k / 60), YP(bpU(k / 60))]);
      courbe.setAttribute("points", N > 0 ? pts(P) : "0,0 0,0");
      aire.setAttribute("d", N > 0 ? "M " + XU(0) + " " + YB + " L " + P.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " L " + P[N][0].toFixed(1) + " " + YB + " Z" : "");
      point.setAttribute("cx", XU(u)); point.setAttribute("cy", YP(v)); op(point, D.lisse((t - c.T[0]) / 0.5));
      // la zone neutre s'éclaire (phrase 4)
      const lit = fen(t, c.T[4] - 0.2, c.E[4] + 0.6, 0.5);
      bande.setAttribute("fill", mix("#e8f3ea", "#b7e6c4", lit));
      [lbN1, lbN2].forEach(e => e.setAttribute("fill", mix(GRIS, VERT, lit)));
      op(cPlus, D.lisse((t - c.A(1, 0.35)) / 0.4) * (1 - D.lisse((t - c.A(3, 0.1)) / 0.4)));
      op(cMoins, D.lisse((t - c.A(3, 0.67)) / 0.4) * (1 - D.lisse((t - c.T[4]) / 0.5)));
      // la vignette : 10 h, puis le sablier, puis la nuit
      const sa = D.courbe([[c.T[2] + 0.1, 0], [tOn, 1]], t, true);
      op(hor, 1 - D.lisse((t - c.T[2] + 0.2) / 0.4)); op(h10, 1 - D.lisse((t - c.T[2] + 0.2) / 0.4));
      op(sab.g, fen(t, c.T[2] - 0.1, tOn + 0.7, 0.4)); sab.set(sa);
      op(lun, D.lisse((t - c.T[3] + 0.3) / 0.6));
      mA(nuit); mB(nuit);
      cl.forEach((f, i) => f(t, 1 - nuit));
      ev.forEach((e, i) => { e.setAttribute("fill", nuit > 0.5 ? "#9aa7b5" : "#2ecc71"); });
      // le panneau : compact, puis agrandi pour les phrases 5 et 6
      const ap = fen(t, 0, c.D, 0.5), ex = D.lisse((t - c.T[5] + 0.5) / 0.8), hh = D.lerp(262, 548, ex);
      pan.pose(hh, ap, 0);
      op(cont, 1 - D.lisse((t - c.T[5] + 0.6) / 0.4)); op(grand, D.lisse((t - c.T[5] + 0.1) / 0.5));
      // phrase 5 : trois jours, trois compteurs qui s'égalisent
      op(g5, 1 - D.lisse((t - c.T[6] + 0.5) / 0.4)); op(g6, D.lisse((t - c.T[6] + 0.1) / 0.5));
      const dj = j => c.T[5] + 0.3 + j * 2.2;
      jours.forEach((gj, j) => op(gj, D.lisse((t - dj(j)) / 0.4)));
      barres.forEach((r, i) => {
        const fj = [0, 1, 2].map(j => D.lisse((t - dj(j) - 0.3) / 1.4));
        const h = D.lerp(D.lerp(D.lerp(0, CUM[0][i], fj[0]), CUM[1][i], fj[1]), CUM[2][i], fj[2]) * (BH - 8);
        r.setAttribute("y", (BY - 4 - h).toFixed(1)); r.setAttribute("height", Math.max(0, h).toFixed(1));
      });
      op(egal, D.lisse((t - dj(2) - 1.9) / 0.5));
      // phrase 6 : à chaque démarrage, le moteur sursaute et le compteur monte d'un cran, jusqu'à la limite
      const tk = i => c.T[6] + 0.5 + 0.36 * i, n = Math.min(9, Math.max(0, Math.floor((t - c.T[6] - 0.5) / 0.36) + 1)), q = (t - c.T[6] - 0.5) / 0.36, ph = q - Math.floor(q);
      crans.forEach((r, i) => op(r, i < n ? 1 : 0));
      const bat = q >= 0 && q < 9 ? Math.max(0, 1 - ph * 3) : 0;
      mot.pulse(bat); op(bolt, bat); op(lien, 0.3 + 0.7 * bat);
      op(stop, D.lisse((t - tk(9)) / 0.3));
      montrer(pas, c, t);
      // l'héroïne : dans le collecteur, puis dans un coin du grand panneau
      const go = D.lisse((t - c.T[5] + 0.6) / 0.9);
      plan(mila, g);
      mila({ x: D.lerp(300, 924, go), y: D.lerp(625, 660, go) + Math.sin(t * 2) * 2, s: 0.5 + 0.15 * go, t: t, temp: 0.2, etat: "vapeur", humeur: "sourire", regard: [1, -0.5] });
      return { temp: 0.2, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* =====================================================================
     7 · LE VARIATEUR (le compresseur de tête)
     Phrases 0, 2, 3, 5 : le panneau (courbes, trois petits dessins, trois pictogrammes) ; phrases 1 et 4 : la
     centrale et son armoire ouverte, le variateur en bas, son câble jusqu'au moteur du compresseur 1.
     ===================================================================== */
  S.variateur = function (g, c) {
    const C = centrale(g, { cable: true, haut: 1 });
    const pan = panneau(g), cont = D.el("g", {}, pan.g);
    const gA = D.el("g", {}, cont), gB = D.el("g", {}, cont), gC = D.el("g", {}, cont);
    // ---- courbes : la puissance (marches ou rampe) et la basse pression (vagues ou presque plate)
    const QX0 = 276, QX1 = 930, YA = 276, YBB = 396, HQ = 92, N = 120;
    axes(gA, 264, YA, 938, 170); axes(gA, 264, YBB, 938, 290);
    txt(gA, 44, 244, "puissance", { t: 30 }); txt(gA, 44, 342, "basse", { t: 30 }); txt(gA, 44, 376, "pression", { t: 30 });
    D.el("line", { x1: QX0, y1: YBB - 0.5 * HQ, x2: QX1, y2: YBB - 0.5 * HQ, stroke: VERT, "stroke-width": 3, "stroke-dasharray": "10 8", opacity: 0.8 }, gA);
    const dem = [], stp = [];
    let niv = 0.3;
    for (let i = 0; i <= N; i++) { const d = 0.16 + 0.78 * i / N; if (d - niv > 0.13 && niv < 0.96) niv += 0.22; dem.push(d); stp.push(niv); }
    const courbeP = D.el("polyline", { fill: "none", stroke: HP, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, gA);
    const courbeB = D.el("polyline", { fill: "none", stroke: BP, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, gA);
    const pA = D.el("circle", { r: 9, fill: HP, stroke: "#fff", "stroke-width": 3 }, gA), pB = D.el("circle", { r: 9, fill: BP, stroke: "#fff", "stroke-width": 3 }, gA);
    // ---- phrase 2 : trois dessins qui varient ensemble (l'onde de courant, le moteur, le flot de vapeur)
    const TX = [44, 350, 656];
    TX.forEach(x => D.el("rect", { x: x, y: 172, width: 280, height: 226, rx: 18, fill: "#f4f8fc", stroke: "#9aa7b5", "stroke-width": 2.5 }, gB));
    const onde = D.el("path", { fill: "none", stroke: HP, "stroke-width": 6, "stroke-linecap": "round" }, gB);
    D.el("line", { x1: TX[0] + 14, y1: 270, x2: TX[0] + 266, y2: 270, stroke: "#9aa7b5", "stroke-width": 2, "stroke-dasharray": "6 6" }, gB);
    txt(gB, TX[0] + 140, 380, "courant", { t: 30, a: "middle" }); txt(gB, TX[1] + 140, 380, "moteur", { t: 30, a: "middle" }); txt(gB, TX[2] + 140, 380, "vapeur aspirée", { t: 30, a: "middle" });
    D.el("circle", { cx: TX[1] + 140, cy: 270, r: 80, fill: "#dce9f5", stroke: D.BLEU, "stroke-width": 4 }, gB);
    D.el("circle", { cx: TX[1] + 140, cy: 270, r: 54, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 3 }, gB);
    const rotor = D.el("g", {}, gB); D.el("line", { x1: 0, y1: 0, x2: 0, y2: -48, stroke: HP, "stroke-width": 7, "stroke-linecap": "round" }, rotor); D.el("circle", { cx: 0, cy: -48, r: 9, fill: HP }, rotor); D.el("circle", { r: 8, fill: D.BLEU }, rotor);
    D.el("rect", { x: TX[2] + 12, y: 226, width: 256, height: 88, rx: 8, fill: "#2c3e55" }, gB); D.el("rect", { x: TX[2] + 12, y: 234, width: 256, height: 72, fill: "#eaf2fb" }, gB);
    const nu = nuage(gB, 40, 29), zV = { x0: TX[2] + 16, x1: TX[2] + 266, y0: 236, y1: 304 };
    // ---- phrase 5 : trois pictogrammes
    const PICT = [["moins de", "démarrages"], ["meubles", "réguliers"], ["moins", "d'énergie"]];
    const tuile = TX.map((x, i) => {
      const gt = D.el("g", {}, gC);
      D.el("rect", { x: x, y: 172, width: 280, height: 226, rx: 18, fill: "#f4f8fc", stroke: "#9aa7b5", "stroke-width": 2.5 }, gt);
      txt(gt, x + 140, 348, PICT[i][0], { t: 32, a: "middle" }); txt(gt, x + 140, 384, PICT[i][1], { t: 32, a: "middle" });
      return gt;
    });
    // 1 : le bouton de marche, une flèche qui descend
    D.el("path", { d: "M " + (TX[0] + 100) + " 214 A 34 34 0 1 0 " + (TX[0] + 148) + " 214 M " + (TX[0] + 124) + " 196 V 236", fill: "none", stroke: D.BLEU, "stroke-width": 9, "stroke-linecap": "round" }, tuile[0]);
    D.el("path", { d: "M " + (TX[0] + 194) + " 196 V 262 m -16 -16 l 16 16 l 16 -16", fill: "none", stroke: VERT, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, tuile[0]);
    // 2 : un thermomètre et une courbe plate
    thermometre(tuile[1], TX[1] + 70, 190, 80, 0.55)(0.55);
    axes(tuile[1], TX[1] + 118, 296, TX[1] + 262, 196); D.el("line", { x1: TX[1] + 130, y1: 246, x2: TX[1] + 250, y2: 246, stroke: BP, "stroke-width": 6, "stroke-linecap": "round" }, tuile[1]);
    // 3 : un éclair, une flèche qui descend
    eclair(tuile[2], TX[2] + 112, 196, 1.45);
    D.el("path", { d: "M " + (TX[2] + 192) + " 196 V 262 m -16 -16 l 16 16 l 16 -16", fill: "none", stroke: VERT, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, tuile[2]);
    // ---- phrase 4 : la puissance totale reste continue (carte au-dessus de l'armoire)
    const g4 = D.el("g", {}, g);
    D.el("rect", { x: 640, y: 156, width: 312, height: 136, rx: 18, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g4);
    axes(g4, 662, 252, 934, 174); txt(g4, 800, 282, "puissance totale", { t: 28, a: "middle" });
    const aireV = D.el("path", { fill: HP, opacity: 0.8 }, g4), aireC = D.el("path", { fill: BP, opacity: 0.8 }, g4), total = D.el("polyline", { fill: "none", stroke: ENCRE, "stroke-width": 4, "stroke-linejoin": "round" }, g4);
    // ---- phrase 1 : on montre le compresseur de tête et le variateur
    const hC = halo(g, 30, 354, 150, 196, 14), hV = halo(g, 684, 478, 244, 176, 14);
    const labT = D.el("g", {}, g); txt(labT, 40, 190, "compresseur de tête"); D.trait(labT, 74, 200, 74, 366);
    const labV = D.el("g", {}, g); txt(labV, 730, 706, "variateur"); D.trait(labV, 800, 680, 800, 648);
    const pas = [pastille(g, "par marches : des vagues", D.BLEU, 0, 0, 30), pastille(g, "presque plate", VERT, 3, 3, 30)];
    const mila = D.heroine(g, { r: 30 });
    const tS = c.A(4, 0.42);
    const s2De = t => D.lisse((t - tS) / 1.4);
    const vjDe = t => {
      const base = tt => 0.5 + 0.2 * Math.sin(0.7 * tt);
      if (t < c.T[4]) return base(t);
      if (t < tS) return D.lerp(base(c.T[4]), 1, D.lisse((t - c.T[4]) / 2.2));
      return 1 - 0.7 * s2De(t) + 0.04 * Math.sin(3 * (t - tS)) * D.lisse((t - tS - 1.4) / 0.5);
    };
    return function (t) {
      // courbes (phrases 0 et 3)
      const ur = D.courbe([[c.T[0] + 0.4, 0], [c.E[0] - 0.2, 1]], t, true), m = D.lisse((t - c.T[3] - 0.2) / 1.6), nn = Math.round(N * ur);
      const PP = [], BB = [];
      for (let i = 0; i <= nn; i++) {
        const cap = D.lerp(stp[i], dem[i] + 0.02, m), x = QX0 + i / N * (QX1 - QX0 - 12);
        PP.push([x, YA - cap * HQ]); BB.push([x, YBB - D.borne(0.5 + 1.15 * (dem[i] - cap), 0.05, 0.95) * HQ]);
      }
      courbeP.setAttribute("points", nn > 0 ? pts(PP) : "0,0 0,0"); courbeB.setAttribute("points", nn > 0 ? pts(BB) : "0,0 0,0");
      const lp = PP[nn] || [QX0, YA], lb = BB[nn] || [QX0, YBB];
      pA.setAttribute("cx", lp[0]); pA.setAttribute("cy", lp[1]); pB.setAttribute("cx", lb[0]); pB.setAttribute("cy", lb[1]);
      op(pA, ur > 0 && ur < 1 ? 1 : 0); op(pB, ur > 0 && ur < 1 ? 1 : 0);
      // phrase 2 : la fréquence monte et descend, tout varie avec elle
      const tau = Math.max(0, t - c.T[2]), f = 0.5 + 0.5 * Math.sin(0.9 * tau);
      const cyc = 2.5 + 3.5 * f; let d = "";
      for (let x = 0; x <= 252; x += 4) d += (x ? " L " : "M ") + (TX[0] + 14 + x) + " " + (270 + 44 * Math.sin(TOUR * cyc * x / 252 - t * 8)).toFixed(1);
      onde.setAttribute("d", d);
      const ang = 2 * tau + 5.5 * (0.5 * tau + (1 - Math.cos(0.9 * tau)) / 1.8);
      rotor.setAttribute("transform", "translate(" + (TX[1] + 140) + " 270) rotate(" + (ang * 180 / PI).toFixed(1) + ")");
      nu(t, zV, { densite: 0.18 + 0.8 * f, vit: 0.006 + 0.03 * f, s: 0.8, temp: 0.2, op: 1 });
      // quel contenu dans le panneau, et quand
      const pv = Math.max(fen(t, 0, c.E[0] + 0.3, 0.5), fen(t, c.T[2] - 0.5, c.E[3] + 0.3, 0.5), fen(t, c.T[5] - 0.5, c.D, 0.5));
      pan.pose(262, pv, 0);
      op(gA, 1 - D.lisse((t - c.T[2] + 0.6) / 0.4) + D.lisse((t - c.T[3] + 0.5) / 0.4) * (t < c.T[4] ? 1 : 0));
      op(gB, D.lisse((t - c.T[2] + 0.5) / 0.4) * (1 - D.lisse((t - c.T[3] + 0.6) / 0.4)));
      op(gC, D.lisse((t - c.T[5] + 0.3) / 0.4));
      tuile.forEach((gt, i) => op(gt, D.lisse((t - c.A(5, [0.04, 0.33, 0.66][i])) / 0.4)));
      // la centrale : le compresseur de tête tourne, le deuxième démarre à la phrase 4
      const vj = vjDe(t), s2 = t < tS ? 0 : s2De(t);
      const pas0 = D.courbe([[c.T[0] + 0.4, 0], [c.E[0] - 0.2, 1]], t, true), iS = Math.round(N * D.borne(pas0, 0, 1)), niveau = t < c.E[0] ? stp[iS] : 0.3;
      const marche = t < c.E[0] + 0.3 ? [1, D.lisse((niveau - 0.4) / 0.05), D.lisse((niveau - 0.65) / 0.05)] : [1, s2, 0];
      C.maj(t, { marche: marche, fluxAsp: 1, fluxRef: 1, porte: 1, bp: 0.5, vj: vj, onde: 0.15 + 0.75 * vj,
        cableV: Math.max(fen(t, c.T[1] + 0.2, c.E[2], 0.5), 0.6 * fen(t, c.T[4], c.E[4] + 0.3, 0.5)), signal: 1 });
      hC(t, fen(t, c.T[1] + 0.3, c.E[1] + 0.2, 0.4)); hV(t, fen(t, c.T[1] + 0.3, c.E[1] + 0.2, 0.4));
      op(labT, fen(t, c.T[1] + 0.2, c.E[1] + 0.4, 0.4)); op(labV, fen(t, c.T[1] + 0.2, c.E[1] + 0.4, 0.4));
      // phrase 4 : la puissance totale reste continue
      op(g4, fen(t, c.T[4] - 0.2, c.E[4] + 0.5, 0.5));
      const AV = [], AC = [], TT = [];
      for (let k = 0; k <= 40; k++) {
        const tk = t - 9 * (1 - k / 40), v = vjDe(Math.max(tk, c.T[4])), s = tk < tS ? 0 : s2De(tk), x = 672 + k / 40 * 250;
        AV.push([x, 252 - v * 74]); AC.push([x, 252 - (v + 0.7 * s) * 74]); TT.push([x, 252 - (v + 0.7 * s) * 74]);
      }
      aireV.setAttribute("d", "M 672 252 L " + AV.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " L 922 252 Z");
      aireC.setAttribute("d", "M " + AV.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " L " + AC.slice().reverse().map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " Z");
      total.setAttribute("points", pts(TT));
      montrer(pas, c, t);
      plan(mila, g);
      mila({ x: 300 + 14 * Math.sin(t * 0.7), y: 625 + 2 * Math.sin(t * 2.1), s: 0.5, t: t, temp: 0.2, etat: "vapeur", humeur: "sourire", regard: [1, 0] });
      return { temp: 0.2, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* de fines gouttelettes d'huile (ambre) qui filent le long d'une ligne brisée, avec la vapeur */
  function gouttes(parent, P, nb, graine) {
    const lg = P.slice(1).map((p, i) => Math.hypot(p[0] - P[i][0], p[1] - P[i][1])), tot = lg.reduce((a, b) => a + b, 0), r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ f: r(), dy: (r() - 0.5) * 12, e: D.el("circle", { r: 2.4 + r() * 2.2, fill: AMBRE, stroke: "#fff", "stroke-width": 0.8 }, parent) });
    return function (t, vit, o) {
      L.forEach(m => {
        const f = D.frac(m.f + t * vit / tot);
        let d = f * tot, k = 0;
        while (k < lg.length - 1 && d > lg[k]) { d -= lg[k]; k++; }
        const a = P[k], b = P[k + 1], q = d / lg[k], ux = (b[0] - a[0]) / lg[k], uy = (b[1] - a[1]) / lg[k];
        m.e.setAttribute("cx", (a[0] + (b[0] - a[0]) * q - uy * m.dy).toFixed(1)); m.e.setAttribute("cy", (a[1] + (b[1] - a[1]) * q + ux * m.dy).toFixed(1));
        op(m.e, o * D.fenetre(f, 0, 1, 0.06));
      });
    };
  }

  /* =====================================================================
     8 · LE COLLECTEUR DE REFOULEMENT ET L'HUILE
     Le haut de la centrale : les trois refoulements (clapet anti-retour sur chacun, le 3 est à l'arrêt), le
     collecteur de refoulement, le séparateur d'huile commun (en coupe, à droite) et le retour d'huile vers
     les trois carters (voyants d'huile).
     ===================================================================== */
  S.refoulement = function (g, c) {
    const C = centrale(g, { sortie: "sep", sansArmoire: true });
    // ---- le séparateur d'huile en coupe : virole, entrée à gauche, chicane, sortie vapeur en haut, nappe ambre au fond
    const sp = D.el("g", {}, g), PECHE = "#fbe9dc";
    D.el("rect", { x: 650, y: 214, width: 140, height: 360, rx: 36, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 3 }, sp);
    const iid = idu("sepi");
    D.el("rect", { x: 664, y: 228, width: 112, height: 332, rx: 24 }, D.el("clipPath", { id: iid }, sp));
    D.el("rect", { x: 664, y: 228, width: 112, height: 332, rx: 24, fill: "#f4f8fc" }, sp);
    const dedans = D.el("g", { "clip-path": "url(#" + iid + ")" }, sp);
    D.el("rect", { x: 664, y: 228, width: 112, height: 332, fill: D.couleur(0.62, true), opacity: 0.12 }, dedans);
    D.el("rect", { x: 696, y: 230, width: 10, height: 172, rx: 4, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, dedans); // la chicane
    let nv = 0.09;
    const huile = D.liquide(dedans, { x0: 664, x1: 776, yh: 228, yb: 560, niveau: () => nv, couleur: () => AMBRE, opacite: 0.9, pas: 8 });
    const chute = [D.bulles(dedans, 7, 83, true), D.bulles(dedans, 7, 97, true)];
    // l'entrée (le collecteur y arrive) et la sortie vapeur (en haut, puis vers le condenseur)
    D.el("rect", { x: 640, y: 240, width: 46, height: 30, rx: 5, fill: "url(#vm-cuivre)" }, sp); D.el("rect", { x: 640, y: 246, width: 50, height: 18, fill: PECHE }, sp);
    D.el("rect", { x: 728, y: 170, width: 28, height: 80, fill: "url(#vm-cuivre-h)" }, sp); D.el("rect", { x: 728, y: 170, width: 216, height: 28, rx: 5, fill: "url(#vm-cuivre)" }, sp);
    D.el("rect", { x: 734, y: 176, width: 16, height: 80, fill: PECHE }, sp); D.el("rect", { x: 734, y: 176, width: 206, height: 16, fill: PECHE }, sp);
    D.el("rect", { x: 940, y: 166, width: 8, height: 36, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, sp);
    // le retour d'huile : du fond du séparateur jusqu'aux trois carters (à chacun sa part)
    const OIL = "M 720 560 V 690 H 184 M 184 690 V 524 H 160 M 374 690 V 524 H 350 M 564 690 V 524 H 540";
    const oil = D.el("g", {}, g);
    D.el("path", { d: OIL, fill: "none", stroke: "#7a4a1c", "stroke-width": 13, "stroke-linejoin": "round", "stroke-linecap": "round" }, oil);
    const oilIn = D.el("path", { d: OIL, fill: "none", stroke: "#f1e2c6", "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round" }, oil);
    const oilPlein = D.el("path", { d: OIL, fill: "none", stroke: AMBRE, "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0 }, oil);
    const reflets = coule(oil, OIL, "#fff", 2.5, "7 22");
    const hOeil = CX.map(cx => halo(g, cx + 16, 492, 44, 44, 20));
    // ---- le chemin de la vapeur (et de l'héroïne) : piquage du compresseur 2, collecteur, séparateur, sortie
    const PH = [[288, 400], [288, 352], [288, 298], [288, 256], [340, 255], [600, 255], [660, 255], [682, 300], [684, 410], [706, 428], [740, 400], [744, 318], [742, 250], [742, 210], [748, 184], [800, 184], [935, 184]];
    const ch = chemin(PH), cm = ch.cum;
    const PM = [[100, 255], [600, 255], [660, 255], [682, 300], [684, 410], [706, 428], [740, 400], [744, 318], [742, 250], [742, 210], [748, 184], [935, 184]], chm = chemin(PM);
    const r = D.alea(61), V = [];
    for (let i = 0; i < 20; i++) V.push({ u: r(), o: r() * 2 - 1, c: i % 4, maj: molecule(g) });
    const gt = [gouttes(g, [[98, 360], [98, 255], [600, 255], [660, 255]], 12, 7), gouttes(g, [[288, 360], [288, 255], [600, 255], [660, 255]], 12, 9)];
    // ---- étiquettes et pastille
    const labC = D.el("g", {}, g); txt(labC, 560, 200, "clapet anti-retour", { a: "end" }); D.trait(labC, 458, 212, 468, 276);
    const labR = txt(g, 100, 206, "collecteur de refoulement");
    const labS = D.el("g", {}, g); txt(labS, 806, 392, "séparateur", { t: 30 }); txt(labS, 806, 428, "d'huile", { t: 30 });
    const hCl = [halo(g, CX[1] - 28, 270, 56, 52, 12), halo(g, CX[2] - 28, 270, 56, 52, 12)];
    const stopG = D.el("g", {}, g); // les flèches du gaz s'arrêtent sur le clapet fermé du compresseur 3
    const stopCh = D.el("path", { d: "M -9 -7 L 0 4 L 9 -7", fill: "none", stroke: HP, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, stopG);
    D.el("line", { x1: CX[2] - 20, y1: 280, x2: CX[2] + 20, y2: 280, stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, stopG);
    const pas = [pastille(g, "à chacun sa part", "#9a6a10", 5, 5, 30)];
    // ---- phrase 6 : la gouttelette d'huile salue, le circuit d'huile est un autre voyage
    const g6 = D.el("g", {}, g), gout = D.heroine(g6, { r: 24, teinte: AMBRE, sansHalo: true, dephasage: 0.4 });
    const bras = D.el("path", { fill: "none", stroke: D.BLEU, "stroke-width": 4.5, "stroke-linecap": "round" }, g6), main = D.el("circle", { r: 7, fill: AMBRE, stroke: D.BLEU, "stroke-width": 3 }, g6);
    D.el("rect", { x: 800, y: 326, width: 156, height: 168, rx: 14, fill: "#fffdf8", stroke: AMBRE, "stroke-width": 5 }, g6);
    ["le circuit", "d'huile :", "un autre", "voyage"].forEach((l, i) => txt(g6, 878, 364 + i * 36, l, { t: 29, a: "middle" }));
    D.el("rect", { x: 826, y: 510, width: 128, height: 46, rx: 12, fill: "#fffdf8", stroke: GRIS, "stroke-width": 3, "stroke-dasharray": "9 6" }, g6); txt(g6, 890, 544, "bientôt", { t: 28, a: "middle", c: GRIS });
    const mila = D.heroine(g, { r: 30 });
    const sPos = t => D.courbe([[c.T[0], cm[0]], [c.E[0], cm[1]], [c.A(1, 0.25), cm[1]], [c.A(1, 0.62), cm[2]], [c.E[1], cm[3]], [c.E[2], cm[5]], [c.E[3], cm[6]], [c.T[4] + 0.5, cm[7]],
      [c.A(4, 0.5), cm[9]], [c.E[4] - 0.3, cm[12]], [c.E[4] + 1.8, cm[16]]], t);
    return function (t) {
      const arret = [1, 1, 0];
      const chev = fen(t, c.T[1] - 0.2, c.E[2] + 0.3, 0.5) * (1 - D.lisse((t - c.T[3] + 0.2) / 0.5));
      C.maj(t, { marche: arret, fluxAsp: 0.5, fluxRef: chev, huile: [0, 1, 2].map(i => 0.14 + 0.36 * D.lisse((t - c.A(5, 0.32 + 0.16 * i)) / 1.0)) });
      // le clapet 3, fermé : les flèches du gaz arrivent dessus et s'arrêtent
      const ph = D.frac(t * 0.9);
      stopCh.setAttribute("transform", "translate(" + CX[2] + " " + D.lerp(250, 270, ph).toFixed(1) + ")"); op(stopCh, fen(t, c.T[1] + 0.3, c.E[1] + 0.4, 0.4) * D.fenetre(ph, 0, 1, 0.3));
      op(stopG, fen(t, c.T[1] + 0.3, c.E[1] + 0.4, 0.4));
      hCl[0](t, fen(t, c.T[1] + 0.1, c.E[1] - 0.2, 0.4)); hCl[1](t, fen(t, c.T[1] + 0.1, c.E[1] - 0.2, 0.4));
      op(labC, fen(t, c.T[1] + 0.1, c.E[1] + 0.2, 0.4)); op(labR, fen(t, c.T[2], c.E[2] + 0.3, 0.4)); op(labS, fen(t, c.T[4], c.E[5] + 0.2, 0.5));
      // la vapeur : petites molécules mêlées le long du collecteur et du séparateur
      const mv = D.lisse((t - c.E[1]) / 0.8);
      V.forEach(m => {
        const u = D.frac(m.u + t * 0.045), s = u * chm.l, p = chm.pos(s);
        const off = m.o * (s < chm.cum[1] ? 5 : 9), horiz = s < chm.cum[1] || s > chm.cum[10];
        m.maj(p[0] + (horiz ? 0 : off), p[1] + (horiz ? off : 0), 0.5, mv * D.fenetre(u, 0, 1, 0.04), m.c ? AUTRES[m.c - 1] : D.couleur(0.62, true));
      });
      // phrase 3 : de fines gouttelettes d'huile dans la vapeur ; phrase 4 : elles tombent dans le séparateur
      const go = fen(t, c.T[3] - 0.1, c.E[3] + 1.5, 0.5);
      gt[0](t, 70, go); gt[1](t, 70, go);
      const chut = fen(t, c.T[4], c.E[5], 0.6);
      nv = D.courbe([[0, 0.09], [c.T[4], 0.09], [c.E[4], 0.13], [c.T[5], 0.13], [c.E[5], 0.1], [c.D, 0.1]], t); huile.maj(t);
      chute[0](t, q => [670 + q * 24, 318, huile.surface(700, t) + 3, chut, AMBRE]); chute[1](t, q => [712 + q * 58, 428, huile.surface(740, t) + 3, chut, AMBRE]);
      // phrase 5 : l'huile repart (trait ambre qui coule) vers les trois compresseurs, les voyants d'huile se remplissent
      const hv = fen(t, c.T[5], c.D, 0.6);
      op(oilPlein, hv); reflets(t, 60, hv * 0.9);
      hOeil.forEach((h, i) => h(t, fen(t, c.A(5, 0.3 + 0.16 * i), c.E[5] + 0.2, 0.4)));
      op(pas[0].g, fen(t, c.T[5], c.T[6] - 0.1, 0.4));
      // l'héroïne sort du compresseur 2 et monte jusqu'à la sortie du séparateur
      const s = sPos(t), p = ch.pos(s);
      const sz = D.lerp(0.46, 0.62, D.lisse((s - cm[6]) / 60)) * (s > cm[12] ? D.lerp(1, 0.8, D.lisse((s - cm[12]) / 60)) : 1);
      plan(mila, g);
      mila({ x: p[0], y: p[1], s: sz, t: t, temp: 0.62, etat: "vapeur", humeur: "chaud", regard: [1, 0], op: D.borne((945 - p[0]) / 40, 0, 1) * (t < c.E[4] + 1.9 ? 1 : 0) });
      // phrase 6 : la gouttelette d'huile salue
      const ap = fen(t, c.T[6] - 0.2, c.D, 0.5); op(g6, ap);
      const gy = 266 + 4 * Math.sin(t * 2.4);
      gout({ x: 878, y: gy, s: 1, t: t, humeur: "sourire", regard: [-0.6, 0.2] });
      const hx = 918 + 8 * Math.sin(t * 7), hy = gy - 26 + 5 * Math.cos(t * 7);
      bras.setAttribute("d", "M 898 " + (gy + 4).toFixed(1) + " Q 912 " + (gy - 6).toFixed(1) + " " + hx.toFixed(1) + " " + hy.toFixed(1)); main.setAttribute("cx", hx.toFixed(1)); main.setAttribute("cy", hy.toFixed(1));
      return { temp: 0.62, etat: "vapeur", humeur: "chaud", carte: D.courbe([[c.T[0], 3.55], [c.E[1], 3.95], [c.E[2], 4.6], [c.E[3], 5.4], [c.E[4], 6.0], [c.D, 6.1]], t) };
    };
  };

})();
