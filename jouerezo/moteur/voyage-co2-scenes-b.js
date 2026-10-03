/* =====================================================================
   voyage-co2-scenes-b.js — la détente : le détendeur haute pression,
   la bouteille intermédiaire, la vanne de gaz de détente, le détendeur
   de l'évaporateur (édition CO₂)
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t),
   phrases 0-1 = présentation (l'organe en vrai, posé par le théâtre),
   coupe à partir de la phrase 2. Zones interdites : en-tête (x < 760,
   y < 140) et carte (x > 1200, y < 285). Rien sous y = 760.
   LE FLUIDE : supercritique (D.supercritique) avant le détendeur haute
   pression ; après, un mélange (nappe basse + molécules de vapeur) ; dans
   la bouteille, une nappe calme au fond et la vapeur en haut.
   UNE VANNE POUR TROIS COUPES : vanne() dessine la coupe d'une vanne à
   pointeau (entrée haute à gauche, siège, sortie basse à droite) à
   l'échelle voulue ; moteur pour les vannes de la centrale, bobine pour
   le détendeur de l'évaporateur. Elle rend les repères X(), Y() dans la
   scène pour y poser les tubes et les fluides.
   CHANGER DE PLAN : l'héroïne passe sous la nappe (fond) ou au-dessus
   (dessus) en changeant de parent (plan()).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI, FONT = "Calibri, Arial, sans-serif", CLAIR = "#f4f8fc";
  const MEL = 0.22;      // ≈ 0 °C : liquide de la bouteille (35 bar)
  const FROID = 0.08;    // ≈ −10 °C : mélange froid (26 bar)
  const degVersTemp = v => D.courbe([[-20, 0], [-10, 0.08], [0, 0.22], [20, 0.40], [35, 0.50], [100, 0.95]], v, true);

  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const pas = (g, x, y, ancre, s, coul, a, b, taille) => ({ g: D.pastille(g, x, y, s, coul, taille || 30, ancre), a: a, b: b });
  const montrer = (liste, t) => liste.forEach(p => p.g.setAttribute("opacity", D.fenetre(t, p.a, p.b).toFixed(2)));
  const fondu = (e, t, a, b) => e.setAttribute("opacity", D.fenetre(t, a, b).toFixed(2));
  /* point d'une ligne brisée à l'abscisse curviligne s */
  function poly(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const f = function (s) {
      s = D.borne(s, 0, L[L.length - 1]);
      let i = 1;
      while (i < L.length - 1 && s > L[i]) i++;
      const u = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [D.lerp(pts[i - 1][0], pts[i][0], u), D.lerp(pts[i - 1][1], pts[i][1], u)];
    };
    f.long = L[L.length - 1];
    return f;
  }

  /* ---------- les instruments ---------- */
  /* cadran de manomètre, balayage de 270° ; zones = [[de, à, couleur]] ; rend maj(valeur) */
  function cadran(parent, cx, cy, r, vmax, graduation, zones) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: cx, cy: cy, r: r + 9, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    D.el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    const ang = v => (135 + 270 * D.borne(v / vmax, 0, 1)) * Math.PI / 180;
    const pt = (v, rr) => [cx + rr * Math.cos(ang(v)), cy + rr * Math.sin(ang(v))];
    (zones || []).forEach(([a, b, coul]) => {
      const [x0, y0] = pt(a, r * 0.8), [x1, y1] = pt(b, r * 0.8);
      D.el("path", { d: "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + r * 0.8 + " " + r * 0.8 + " 0 " + ((b - a) / vmax * 270 > 180 ? 1 : 0) + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1),
        fill: "none", stroke: coul, "stroke-width": r * 0.16 }, g);
    });
    for (let v = 0; v <= vmax + 0.01; v += graduation) {
      const [x0, y0] = pt(v, r * 0.66), [x1, y1] = pt(v, r * 0.9);
      D.el("line", { x1: x0.toFixed(1), y1: y0.toFixed(1), x2: x1.toFixed(1), y2: y1.toFixed(1), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, g);
    }
    const aig = D.el("g", {}, g);
    D.el("line", { x1: cx - r * 0.18, y1: cy, x2: cx + r * 0.72, y2: cy, stroke: "#c0392b", "stroke-width": 5, "stroke-linecap": "round" }, aig);
    D.el("circle", { cx: cx, cy: cy, r: r * 0.11, fill: D.BLEU }, g);
    const maj = v => aig.setAttribute("transform", "rotate(" + (ang(v) * 180 / Math.PI).toFixed(1) + " " + cx + " " + cy + ")");
    maj.g = g;
    return maj;
  }
  /* thermomètre : tube de hauteur h dont le haut est y0, bulbe en bas ; rend maj(valeur en °C) */
  function thermo(parent, x, y0, h, tmin, tmax) {
    const g = D.el("g", {}, parent), yb = y0 + h, jx = Math.sqrt(26 * 26 - 15 * 15);
    D.el("path", { d: "M " + (x - 15) + " " + (y0 + 15) + " A 15 15 0 0 1 " + (x + 15) + " " + (y0 + 15) + " L " + (x + 15) + " " + (yb - jx).toFixed(1) +
      " A 26 26 0 1 1 " + (x - 15) + " " + (yb - jx).toFixed(1) + " Z", fill: "#fff", stroke: D.BLEU, "stroke-width": 3, "stroke-linejoin": "round" }, g);
    const y = v => yb - 6 - (v - tmin) / (tmax - tmin) * (h - 24);
    for (let v = tmin; v <= tmax + 0.01; v += 10) D.el("line", { x1: x - 15, y1: y(v).toFixed(1), x2: x - 28, y2: y(v).toFixed(1), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const col = D.el("rect", { x: x - 7, width: 14, rx: 7 }, g), bulbe = D.el("circle", { cx: x, cy: yb, r: 17 }, g);
    const maj = v => {
      const c = D.couleur(degVersTemp(v), false), top = y(v);
      col.setAttribute("y", top.toFixed(1)); col.setAttribute("height", (yb - top).toFixed(1)); col.setAttribute("fill", c); bulbe.setAttribute("fill", c);
    };
    maj.g = g;
    return maj;
  }
  /* pastille de lecture (valeur numérique) : rend ecrire(texte) */
  function lecture(parent, cx, y, w) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: cx - w / 2, y: y - 31, width: w, height: 42, rx: 21, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    const tx = D.texte(g, cx, y, "", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: D.BLEU, "font-family": FONT });
    const f = s => { if (tx.textContent !== s) tx.textContent = s; };
    f.g = g;
    return f;
  }
  /* le régulateur : un boîtier à écran de deux lignes */
  function regulateur(parent, x, y, w, h) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x, y: y, width: w, height: h, rx: 14, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 3 }, g);
    D.texte(g, x + 18, y + 32, "régulateur", { "font-size": 28, "font-weight": 700, fill: "#cfe0f4", "font-family": FONT });
    D.el("circle", { cx: x + w - 26, cy: y + 24, r: 8, fill: "#2e9e57" }, g);
    const ey = y + 46, eh = h - 62;
    D.el("rect", { x: x + 14, y: ey, width: w - 28, height: eh, rx: 8, fill: "#0e2a40", stroke: "#5d80ad", "stroke-width": 2 }, g);
    const l1 = D.texte(g, x + w / 2, ey + eh * 0.4, "", { "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: "#bfe3ff", "font-family": FONT });
    const l2 = D.texte(g, x + w / 2, ey + eh * 0.86, "", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#ffb36b", "font-family": FONT });
    return { g: g, ecrire: (a, b) => { if (l1.textContent !== a) l1.textContent = a; if (l2.textContent !== b) l2.textContent = b; } };
  }
  /* câble qui s'anime quand il est actif */
  function cable(parent, d) {
    const p = D.el("path", { d: d, fill: "none", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "14 9" }, parent);
    const f = (t, actif) => { p.setAttribute("stroke", actif ? "#ff6b35" : "#9aa7b5"); p.setAttribute("stroke-dashoffset", actif ? (-t * 60).toFixed(1) : 0); };
    f.p = p;
    return f;
  }
  /* un réservoir debout à parois épaisses ; ouvrir() rend un groupe rogné à l'intérieur (la nappe et la vapeur y restent) */
  function reservoir(g, x, y, w, h, e, rx, id) {
    D.el("rect", { x: x, y: y, width: w, height: h, rx: rx, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 }, g);
    const ix = x + e, iy = y + e, iw = w - 2 * e, ih = h - 2 * e;
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: rx - e, fill: CLAIR }, g);
    const clip = D.el("clipPath", { id: id }, g);
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: rx - e }, clip);
    return { ix: ix, iy: iy, iw: iw, ih: ih, ouvrir: () => D.el("g", { "clip-path": "url(#" + id + ")" }, g) };
  }

  /* ---------- la coupe d'une vanne à pointeau (partagée par les trois scènes) ----------
     (cx, cy) : centre de l'orifice, au milieu du siège ; k : échelle ; tete : "moteur" | "bobine" ;
     cote : côté de la prise du câble (−1 gauche, +1 droite).
     Repère local : cavité haute (entrée) x −200 → +180, y −110 → −16 ; siège y −16 → +16, orifice ±20 ;
     cavité basse (sortie) x −60 → +200, y +16 → +130. Le pointeau est AU-DESSUS du siège : il descend
     pour fermer, monte pour ouvrir. haut() se dessine après les fluides et rend ouvrir(écart). */
  function vanne(g, cx, cy, k, tete, cote) {
    const X = lx => cx + k * lx, Y = ly => cy + k * ly;
    const place = "translate(" + cx + " " + cy + ") scale(" + k + ")";
    const v = D.el("g", { transform: place }, g);
    D.el("rect", { x: -200, y: -148, width: 400, height: 320, rx: 26, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, v);
    D.el("rect", { x: -200, y: -110, width: 380, height: 94, fill: CLAIR }, v);
    D.el("rect", { x: -60, y: 16, width: 260, height: 114, fill: CLAIR }, v);
    D.el("rect", { x: -20, y: -16, width: 40, height: 32, fill: CLAIR }, v);
    [[-46, -20], [20, 46]].forEach(([a, b]) => D.el("rect", { x: a, y: -16, width: b - a, height: 32, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, v));
    function haut() {
      const t = D.el("g", { transform: place }, g);
      D.el("rect", { x: -28, y: -164, width: 56, height: 58, rx: 8, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      const tige = D.el("rect", { x: -6, y: -190, width: 12, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.5 }, t);
      const cone = D.el("polygon", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2, "stroke-linejoin": "round" }, t);
      if (tete === "bobine") {
        D.el("rect", { x: -16, y: -196, width: 32, height: 50, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
        D.el("rect", { x: -64, y: -296, width: 128, height: 112, rx: 12, fill: "url(#vm-marine-h)", stroke: D.BLEU, "stroke-width": 4 }, t);
        for (let i = 0; i < 6; i++) D.el("line", { x1: -50, y1: -280 + i * 18, x2: 50, y2: -280 + i * 18, stroke: "#c57a45", "stroke-width": 8, "stroke-linecap": "round" }, t);
      } else {
        D.el("rect", { x: -72, y: -302, width: 144, height: 118, rx: 14, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 }, t);
        for (let i = 0; i < 5; i++) D.el("line", { x1: -60, y1: -282 + i * 20, x2: 60, y2: -282 + i * 20, stroke: "#5d80ad", "stroke-width": 5, "stroke-linecap": "round" }, t);
        D.el("rect", { x: -48, y: -318, width: 96, height: 18, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      }
      D.el("rect", { x: cote < 0 ? -102 : 72, y: -262, width: 30, height: 34, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      return function (ecart) { // ecart : levée du pointeau au-dessus du siège (0 = fermé)
        const yb = -19.3 - ecart;
        tige.setAttribute("height", (yb + 192).toFixed(1));
        cone.setAttribute("points", "-22," + yb.toFixed(1) + " 22," + yb.toFixed(1) + " 0," + (yb + 36).toFixed(1));
      };
    }
    return { X: X, Y: Y, haut: haut, prise: [X(cote < 0 ? -102 : 102), Y(-245)] };
  }

  /* =====================================================================
     5 · le détendeur haute pression : vanne motorisée, régulateur, réglette
     ===================================================================== */
  S["detendeur-hp"] = function (g, c) {
    const SC = 0.5;
    const V = vanne(g, 800, 468, 1, "moteur", -1);
    const yH0 = V.Y(-110), yH1 = V.Y(-16), yB0 = V.Y(16), yB1 = V.Y(130); // 358, 452, 484, 598
    D.tube(g, 60, yH0 - 10, V.X(-200) - 60, yH1 - yH0 + 20, "cuivre");
    D.tube(g, V.X(200), yB0 - 10, 1540 - V.X(200), yB1 - yB0 + 20, "cuivre");
    const sc = D.supercritique(g, { x0: 60, y0: yH0, x1: V.X(180), y1: yH1, pas: 22, graine: 5 });
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    let nv = 0.55;
    const liq = D.liquide(g, { x0: V.X(-60), x1: 1540, yh: yB0, yb: yB1, niveau: () => nv, couleur: () => D.couleur(MEL, false), pas: 20 });
    const jet = D.el("path", { fill: D.couleur(MEL + 0.06, false), opacity: 0.5 }, g);
    const gouttes = D.bulles(D.el("g", {}, g), 10, 17, true);
    const eclat = D.el("circle", { cx: 800, cy: yB0 + 24, fill: "none", stroke: D.couleur(MEL, true), "stroke-width": 7 }, g);
    const r = D.alea(29), VAP = [];
    for (let i = 0; i < 34; i++) VAP.push({ s: r(), ry: r(), d: i < 4 ? c.A(5, 0.7) + i * 0.4 : c.T[6] + 0.1 + (i - 4) * 0.025, maj: D.mol(vap) });
    const ouvrir = V.haut();
    const dessus = D.el("g", {}, g);

    // le régulateur, son câble vers le moteur, sa sonde sur le tube d'entrée
    const reg = regulateur(g, 230, 150, 420, 160);
    const cabMoteur = cable(g, "M 650 228 L " + (V.prise[0] - 4) + " 224");
    D.el("line", { x1: 451, y1: 310, x2: 451, y2: 334, stroke: "#9aa7b5", "stroke-width": 5 }, g);
    D.el("rect", { x: 436, y: 332, width: 30, height: 18, rx: 5, fill: D.BLEU }, g);
    D.etiquette(g, 478, 341, "sonde", { "font-size": 28 });

    // l'écran du régulateur et le cadran de pression
    const cad = cadran(g, 1120, 388, 70, 100, 10), lect = lecture(g, 1120, 298, 150);
    // la réglette : trop basse / bonne zone / trop haute
    const reglette = D.el("g", {}, g), RX0 = 90, RX1 = 1510, RY = 722;
    D.el("rect", { x: RX0, y: RY - 12, width: RX1 - RX0, height: 24, rx: 12, fill: "#dfe6ee", stroke: "#9aa7b5", "stroke-width": 2 }, reglette);
    D.el("rect", { x: 680, y: RY - 12, width: 240, height: 24, rx: 12, fill: "#2e9e57", opacity: 0.9 }, reglette);
    const basse = D.etiquette(reglette, RX0, 690, "trop basse : presque plus de froid");
    const haute = D.etiquette(reglette, RX1, 690, "trop haute : consomme pour rien", { "text-anchor": "end" });
    D.etiquette(reglette, 800, 690, "la bonne zone", { "text-anchor": "middle", fill: "#1e7e54" });
    const curseur = D.el("g", {}, reglette);
    D.el("circle", { r: 22, cy: RY, fill: D.ORANGE, stroke: "#fff", "stroke-width": 4 }, curseur);

    // étiquettes
    D.etiquette(g, 890, 235, "moteur");
    D.etiquette(g, 900, 305, "pointeau"); D.trait(g, 895, 300, 818, 446);
    D.etiquette(g, 60, 505, "entrée : supercritique");
    D.etiquette(g, 1540, 450, "sortie : mélange", { "text-anchor": "end" });
    const p1 = pas(g, 60, 748, "start", "machine classique : la HP suit la condensation", D.BLEU, c.T[2], c.T[3] + 0.2);
    const pa = [p1, pas(g, 60 + p1.g.largeur + 20, 748, "start", "CO₂ : la HP se règle", D.ORANGE, c.A(2, 0.5), c.T[3] + 0.2),
      pas(g, 1540, 748, "end", "vapeur de détente", "#2f6fb8", c.T[6], c.T[7] + 0.2),
      pas(g, 1540, 748, "end", "liquide vers 0 °C", "#1e7e54", c.T[7], c.D + 1)];

    const mila = D.heroine(dessus, { r: 30 });
    const tPass0 = c.A(5, 0.12), tOri = c.A(5, 0.42), tPass1 = c.A(5, 0.75), tCons = c.A(3, 0.55);
    return function (t) {
      // la réglette : le curseur cherche le bon réglage, le pointeau suit
      const cur = D.courbe([[c.T[4], 800], [c.A(4, 0.22), 170], [c.A(4, 0.48), 170], [c.A(4, 0.64), 1430], [c.A(4, 0.95), 1430], [c.E[4] + 0.9, 800]], t);
      const u = D.borne((cur - 170) / 1260, 0, 1), passe = D.fenetre(t, tPass0 - 0.2, tPass1 + 0.2, 0.5);
      ouvrir(14 + 14 * (1 - u) + 8 * passe);
      curseur.setAttribute("transform", "translate(" + cur.toFixed(1) + " 0)");
      basse.setAttribute("fill", cur < 500 ? "#c0392b" : "#10233c"); haute.setAttribute("fill", cur > 1100 ? "#c0392b" : "#10233c");
      fondu(reglette, t, c.T[4], c.T[6] - 0.1);

      // le régulateur : ce qu'il lit, puis ce qu'il décide
      if (t < c.T[3]) reg.ecrire("", ""); else if (t < tCons) reg.ecrire("sortie du refroidisseur", "35 °C"); else reg.ecrire("consigne HP", "90 bar");
      cabMoteur(t, t > c.T[3] && t < c.E[5]);

      // le fluide
      sc(t, SC, 60, 1);
      nv = D.courbe([[c.T[6], 0.55], [c.T[6] + 1.4, 0.38]], t);
      liq.maj(t);
      const surf = x => liq.surface(x, t), sb = surf(800);
      jet.setAttribute("d", "M 782 " + (yB0 - 2) + " L 818 " + (yB0 - 2) + " L 830 " + sb.toFixed(1) + " L 770 " + sb.toFixed(1) + " Z");
      gouttes(t, q => [786 + q * 28, yB0 + 2, sb, 0.9, D.couleur(MEL, false)]);
      const fe = D.borne((t - c.T[6]) / 1.1, 0, 1);
      eclat.setAttribute("r", (24 + 110 * fe).toFixed(1)); eclat.setAttribute("opacity", t > c.T[6] ? (0.7 * (1 - fe)).toFixed(2) : 0);
      VAP.forEach(m => {
        const x = 830 + D.frac(m.s + t * 140 / 710) * 710, libre = surf(x) - yB0;
        const vis = D.lisse((t - m.d) / 0.35) * D.borne((libre - 38) / 30, 0, 1) * D.borne((1540 - x) / 40, 0, 1);
        m.maj(x, yB0 + 16 + m.ry * Math.max(0, libre - 38) + Math.sin(t * 3 + m.s * 9) * 3, FROID, true, vis);
      });

      // le cadran : 90 → 35 bar quand je passe le pointeau
      const bar = D.courbe([[tOri - 0.5, 90], [tOri + 0.7, 35]], t);
      cad(bar); lect(Math.round(bar) + " bar");
      fondu(cad.g, t, c.T[5] - 0.2, c.D + 1); fondu(lect.g, t, c.T[5] - 0.2, c.D + 1);

      // l'héroïne : tube d'entrée, passage du pointeau, nappe de sortie
      const x = D.courbe([[c.T[2], 120], [c.A(4, 0.5), 560], [tPass0, 740], [tOri, 800], [tPass1, 850], [c.E[5] + 0.5, 930], [c.E[6], 1180], [c.A(7, 0.4), 1320], [c.D - 0.2, 1640]], t, true);
      const pres = D.borne(1 - Math.abs(x - 800) / 60, 0, 1);
      let y;
      if (x < 740) y = 405; else if (x < 800) y = D.lerp(405, 468, D.lisse((x - 740) / 60));
      else if (x < 850) y = D.lerp(468, surf(x) + 4, D.lisse((x - 800) / 50)); else y = surf(x) + 4;
      plan(mila, x > 845 ? fond : dessus);
      const temp = D.courbe([[tOri - 0.2, SC], [tOri + 0.6, MEL]], t);
      const etat = t < tOri ? "supercritique" : t < c.T[7] ? "bout" : "liquide";
      const humeur = t < tPass0 ? "sourire" : t < tPass1 + 0.3 ? "surprise" : t < c.T[7] ? "froid" : "sourire";
      mila({ x: x, y: y, s: D.lerp(0.62, 0.42, pres), t: t, temp: temp, etat: etat, humeur: humeur, ecrase: 0.8 * pres, regard: [1, 0.3] });
      montrer(pa, t);
      return { carte: D.courbe([[c.T[2], 7.6], [tOri, 8], [c.D - 0.2, 9.2]], t, true), temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     6 · la bouteille intermédiaire : trois raccords, nappe au fond, vapeur en haut
     ===================================================================== */
  S.bouteille = function (g, c) {
    const LIQ = D.couleur(MEL, false), CT = 780;
    const R = reservoir(g, 620, 405, 320, 340, 26, 100, "vm-bt-" + Math.round(c.D * 1000));
    // les trois raccords : arrivée (haut gauche), sortie vapeur (haut, monte puis part à droite), sortie liquide (bas)
    D.tube(g, 60, 441, 590, 78, "cuivre");
    D.tube(g, CT - 39, 287, 78, 160, "cuivre", true);
    D.el("rect", { x: CT - 39, y: 287, width: 78, height: 10, rx: 4, fill: "url(#vm-cuivre)" }, g);
    D.tube(g, CT + 30, 287, 1540 - CT - 30, 78, "cuivre");
    D.el("rect", { x: CT + 26, y: 297, width: 14, height: 58, fill: CLAIR }, g); // la jonction s'ouvre : plus de paroi entre la montée et le tube
    D.tube(g, 912, 651, 628, 78, "cuivre");
    const vapTube = D.el("g", {}, g), fond = D.el("g", {}, g);
    const dedans = R.ouvrir();
    let nv = 0.12;
    const r = D.alea(5), VT = [];
    for (let i = 0; i < 14; i++) VT.push({ x: R.ix + 44 + r() * (R.iw - 88), ry: r(), ph: r() * TOUR, maj: D.mol(dedans) });
    const cuve = D.liquide(dedans, { x0: R.ix, x1: R.ix + R.iw, yh: R.iy, yb: R.iy + R.ih, niveau: () => nv, couleur: () => LIQ, pas: 14 });
    const arrivee = D.liquide(g, { x0: 60, x1: 650, yh: 451, yb: 509, niveau: () => 0.45, couleur: () => LIQ });
    const chute = D.bulles(D.el("g", {}, g), 12, 9, true);
    const MA = [];
    for (let i = 0; i < 9; i++) MA.push({ s: r(), maj: D.mol(g) });
    // la sortie liquide : le liquide avance dans le tube par le bas (rogné par un rideau qui s'ouvre)
    const rid = D.el("clipPath", { id: "vm-bt-sortie-" + Math.round(c.D * 1000) }, g), ridR = D.el("rect", { x: 912, y: 650, width: 0, height: 80 }, rid);
    const sortie = D.el("g", { "clip-path": "url(#vm-bt-sortie-" + Math.round(c.D * 1000) + ")" }, g);
    D.el("rect", { x: 912, y: 661, width: 628, height: 58, fill: LIQ, opacity: 0.85 }, sortie);
    const flux = D.courant(sortie, 912, 1540, 661, 719, 7, 3);
    const VV = [];
    for (let i = 0; i < 8; i++) VV.push({ s: r(), maj: D.mol(vapTube) });
    const dessus = D.el("g", {}, g);
    const mila = D.heroine(fond, { r: 30 }), voisine = D.heroine(dessus, { r: 26, teinte: "#9b7fd1", sansHalo: true, dephasage: 0.4 });

    D.etiquette(g, 60, 428, "arrivée : mélange");
    D.etiquette(g, 1540, 400, "vapeur de détente →", { "text-anchor": "end" });
    D.etiquette(g, 1540, 440, "vanne de gaz de détente", { "text-anchor": "end" });
    D.etiquette(g, 1540, 636, "liquide → détendeur", { "text-anchor": "end" });
    const lq = D.el("g", {}, g), vp = D.el("g", {}, g);
    D.etiquette(lq, 590, 664, "liquide", { "text-anchor": "end" }); D.trait(lq, 596, 656, 700, 660);
    D.etiquette(vp, 985, 510, "vapeur"); D.trait(vp, 980, 502, 905, 500);
    D.etiquette(g, 985, 590, "parois épaisses"); D.trait(g, 980, 582, 938, 566);
    const pa = [pas(g, 610, 375, "end", "35 bar", D.BLEU, c.T[3], c.D + 1)];

    const tA = c.A(2, 0.92), tB = c.A(3, 0.45), tC = c.E[3] + 0.3;
    const montee = poly([[CT, 530], [CT, 326], [1700, 326]]), tM = c.A(6, 0.18);
    return function (t) {
      nv = D.courbe([[c.T[3], 0.12], [c.E[3], 0.4]], t);
      cuve.maj(t); arrivee.maj(t);
      const sc = x => cuve.surface(x, t);
      chute(t, q => [662 + q * 44, 505, sc(690 + q * 44), t > c.T[2] + 0.3 ? 0.95 : 0, LIQ]);
      // la vapeur de la bouteille : en haut, qui se serre un peu quand le liquide monte
      VT.forEach(m => {
        const libre = sc(m.x) - R.iy - 70;
        m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 18, R.iy + 38 + m.ry * Math.max(0, libre) + Math.cos(t * 0.7 + m.ph) * 8, MEL, true, 0.9);
      });
      // le mélange qui arrive : des molécules de vapeur au-dessus de la nappe du tube
      MA.forEach(m => {
        const x = 80 + D.frac(m.s + t * 0.12) * 560;
        m.maj(x, 468 + Math.sin(t * 3 + m.s * 9) * 3, MEL, true, D.fenetre(t, c.T[2] - 0.2, c.E[6], 0.4) * D.borne((650 - x) / 30, 0, 1));
      });
      // la sortie liquide
      ridR.setAttribute("width", D.courbe([[c.T[5], 0], [c.E[5] - 0.2, 628]], t).toFixed(1));
      flux(t, 150);
      fondu(lq, t, c.T[3] + 0.5, c.D + 1); fondu(vp, t, c.T[4], c.D + 1);
      montrer(pa, t);

      // l'héroïne : elle flotte sur la nappe du tube, tombe, plonge, reste au fond
      let x, y, s = 0.55;
      if (t < tA) { x = D.courbe([[c.T[2], 110], [tA, 636]], t, true); y = arrivee.surface(x, t) + 3; }
      else if (t < tB) { const q = (t - tA) / (tB - tA); x = D.lerp(640, 722, q); y = D.lerp(492, sc(722) + 8, q * q); }
      else if (t < tC) { const q = D.lisse((t - tB) / (tC - tB)); x = D.lerp(722, 745, q); y = D.lerp(sc(722) + 8, 668, q); }
      else { x = 745 + 22 * Math.sin(t * 0.7); y = 668 + 5 * Math.sin(t * 1.3); }
      const humeur = t > tA - 0.6 && t < tB + 0.6 ? "surprise" : "sourire";
      mila({ x: x, y: y, s: s, t: t, temp: MEL, etat: "liquide", humeur: humeur, regard: t < c.T[6] ? [1, 0.6] : [0.6, -1] });

      // la voisine : dans la vapeur dès la phrase 4, elle sort par le haut à la phrase 6
      const sM = D.courbe([[tM, 0], [c.D - 0.2, montee.long]], t, true);
      const [vx, vy] = t < tM ? [CT + 14 * Math.sin(t * 0.9), 520 + 10 * Math.sin(t * 1.4)] : montee(sM);
      voisine({ x: vx, y: vy, s: 0.55, t: t, humeur: "sourire", regard: [1, -1], op: D.lisse((t - c.T[4]) / 0.5) });
      // la vapeur qui part avec elle dans le tube du haut
      VV.forEach(m => {
        const x = 830 + D.frac(m.s + t * 0.09) * 710;
        m.maj(x, 326 + Math.sin(t * 2.5 + m.s * 9) * 3, MEL, true, D.fenetre(t, c.T[6], c.D + 1, 0.4) * D.borne((1540 - x) / 30, 0, 1));
      });
      return { carte: D.courbe([[c.T[2], 9.2], [c.E[3], 10], [c.D, 10]], t), temp: MEL, etat: "liquide", humeur: humeur };
    };
  };

  /* =====================================================================
     7 · la vanne de gaz de détente : la voisine file à l'aspiration du compresseur
     ===================================================================== */
  S["gaz-detente"] = function (g, c) {
    const LIQ = D.couleur(MEL, false);
    const R = reservoir(g, 40, 405, 260, 340, 24, 90, "vm-gd-" + Math.round(c.D * 1000));
    const V = vanne(g, 720, 364, 0.62, "moteur", 1);
    // tube vapeur : sort de la bouteille, monte, part à droite vers la vanne ; sortie de la vanne vers le compresseur
    D.tube(g, 131, 286, 78, 164, "cuivre", true);
    D.el("rect", { x: 131, y: 286, width: 78, height: 10, rx: 4, fill: "url(#vm-cuivre)" }, g);
    D.tube(g, 200, 286, V.X(-200) - 200, 78, "cuivre");
    D.el("rect", { x: 196, y: 296, width: 14, height: 58, fill: CLAIR }, g); // la montée s'ouvre sur le tube
    D.tube(g, V.X(200), V.Y(16) - 10, 1266 - V.X(200), V.Y(130) - V.Y(16) + 20, "cuivre");
    D.image(g, "compresseur", 1234, 329, 200, 160);

    // le chemin fantôme vers un petit évaporateur barré (une jonction s'ouvre sous le tube)
    const PF = [[340, 364], [340, 570], [1070, 570]], fp = poly(PF), pts = PF.map(p => p.join(",")).join(" ");
    const fant = D.el("g", {}, g);
    D.el("polyline", { points: pts, fill: "none", stroke: "#637285", "stroke-width": 62, "stroke-dasharray": "14 12", opacity: 0.55, "stroke-linejoin": "round" }, fant);
    D.el("polyline", { points: pts, fill: "none", stroke: D.CREME, "stroke-width": 54, "stroke-linejoin": "round" }, fant);
    D.el("rect", { x: 316, y: 352, width: 48, height: 14, fill: CLAIR }, g);
    const evap = D.el("g", { transform: "translate(1160 600) rotate(-90) scale(3)", opacity: 0.8 }, fant);
    D.image(evap, "evaporateur", -22, -32, 44, 64);
    const barre = D.el("g", { stroke: "#c0392b", "stroke-width": 11, "stroke-linecap": "round" }, fant);
    D.el("line", { x1: 1090, y1: 545, x2: 1230, y2: 655 }, barre); D.el("line", { x1: 1230, y1: 545, x2: 1090, y2: 655 }, barre);
    const mf = D.el("g", {}, fant), MF = [];
    for (let i = 0; i < 20; i++) MF.push({ d: c.T[4] + i * 0.13, p: fp.long * (i + 0.5) / 20, maj: D.mol(mf) });
    const fantome = D.heroine(fant, { r: 26, teinte: "#9b7fd1", sansHalo: true, dephasage: 0.4 });

    // la vapeur dans les tubes
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g), dedans = R.ouvrir();
    const r = D.alea(17), VT = [], VH = [], VS = [];
    for (let i = 0; i < 7; i++) VT.push({ x: R.ix + 36 + r() * (R.iw - 72), ry: r(), ph: r() * TOUR, maj: D.mol(dedans) });
    for (let i = 0; i < 6; i++) VH.push({ x: 250 + i * 55, ph: r() * TOUR, maj: D.mol(vap) });
    for (let i = 0; i < 6; i++) VS.push({ s: i / 6, maj: D.mol(vap) });
    const cuve = D.liquide(dedans, { x0: R.ix, x1: R.ix + R.iw, yh: R.iy, yb: R.iy + R.ih, niveau: () => 0.4, couleur: () => LIQ, pas: 14 });
    const ouvrir = V.haut();
    const dessus = D.el("g", {}, g);
    const mila = D.heroine(fond, { r: 30 }), voisine = D.heroine(dessus, { r: 26, teinte: "#9b7fd1", sansHalo: true, dephasage: 0.4 });

    // le cadran de la bouteille (phrase 6)
    const bloc = D.el("g", {}, g);
    const cad = cadran(bloc, 800, 645, 80, 60, 10, [[30, 40, "#2e9e57"]]), lect = lecture(bloc, 800, 530, 190);
    D.trait(bloc, 710, 645, 306, 645);
    D.etiquette(bloc, 920, 635, "la vanne tient la pression"); D.etiquette(bloc, 920, 675, "de la bouteille");

    D.etiquette(g, 806, 215, "vanne motorisée");
    D.etiquette(g, 1540, 520, "aspiration du compresseur", { "text-anchor": "end" });
    const e1 = D.etiquette(g, 400, 650, "aucun froid : elle est déjà vapeur"), e2 = D.etiquette(g, 400, 702, "de la place pour rien");

    const route = poly([[170, 520], [170, 326], [440, 326], [690, 326], [720, 345], [720, 378], [745, 409], [1266, 409], [1360, 409]]);
    const tPart = c.A(5, 0.3);
    return function (t) {
      // la vanne : fermée jusqu'à la phrase 5, puis elle s'ouvre
      const ouv = D.lisse((t - c.A(5, 0.05)) / 0.9);
      ouvrir(22 * ouv);
      cuve.maj(t);
      // la vapeur de la bouteille et des tubes
      VT.forEach(m => m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 14, R.iy + 36 + m.ry * 110 + Math.cos(t * 0.7 + m.ph) * 8, MEL, true, 0.9));
      VH.forEach(m => m.maj(m.x + Math.sin(t * 0.9 + m.ph) * 10, 326 + Math.sin(t * 1.7 + m.ph) * 4, MEL, true, t > c.T[2] + 0.5 ? 0.9 : 0.3));
      VS.forEach(m => {
        const x = 850 + D.frac(m.s + t * 0.16) * 400;
        m.maj(x, 409 + Math.sin(t * 3 + m.s * 9) * 5, MEL, true, D.borne(ouv * 3 - 1, 0, 1) * D.borne((1262 - x) / 30, 0, 1));
      });

      // le chemin fantôme : se dessine à la phrase 3, se remplit de vapeur à la phrase 4, disparaît à la 5
      const fFant = D.fenetre(t, c.T[3], D.lerp(c.T[5], c.E[5], 0.35), 0.5);
      fant.setAttribute("opacity", fFant.toFixed(2));
      const sF = D.courbe([[c.A(3, 0.15), 0], [c.E[3], fp.long - 140]], t, true), [fx, fy] = fp(sF);
      fantome({ x: fx, y: fy, s: 0.55, t: t, humeur: "triste", regard: [1, 0], op: 0.55 * D.fenetre(t, c.A(3, 0.1), c.E[3] + 0.9, 0.4) });
      barre.setAttribute("opacity", D.lisse((t - c.A(3, 0.65)) / 0.4).toFixed(2));
      MF.forEach(m => { const [x, y] = fp(m.p); m.maj(x + Math.sin(t * 1.5 + m.p) * 6, y + Math.cos(t * 1.8 + m.p) * 5, MEL, true, D.lisse((t - m.d) / 0.3)); });
      fondu(e1, t, c.T[3] + 0.3, D.lerp(c.T[5], c.E[5], 0.35)); fondu(e2, t, c.T[4], D.lerp(c.T[5], c.E[5], 0.35));

      // le cadran de la bouteille, stable : l'aiguille tremble à peine autour de 35
      const bar = 35 + 0.5 * Math.sin(t * 2.3);
      cad(bar); lect("≈ 35 bar");
      fondu(bloc, t, c.T[6], c.D + 1);

      // la voisine : elle sort par le haut, attend à la jonction, puis file par la vanne vers l'aspiration
      const s = D.courbe([[c.T[2] + 0.2, 0], [c.E[2], 464], [tPart, 464], [c.E[5], 1343], [c.E[5] + 0.8, 1437]], t, true);
      const [vx, vy] = t < c.T[2] + 0.2 ? [170 + 12 * Math.sin(t * 0.9), 520 + 9 * Math.sin(t * 1.4)] : route(s);
      const pres = D.borne(1 - Math.hypot(vx - 720, vy - 364) / 50, 0, 1);
      voisine({ x: vx, y: vy, s: D.lerp(0.55, 0.38, pres), t: t, humeur: t < c.T[5] ? "sourire" : "surprise", regard: [1, 0.2], ecrase: 0.7 * pres, op: 1 - D.lisse((vx - 1290) / 50) });
      // l'héroïne reste petite, dans la nappe de la bouteille
      plan(mila, fond);
      mila({ x: 150 + 14 * Math.sin(t * 0.6), y: 668 + 5 * Math.sin(t * 1.2), s: 0.5, t: t, temp: MEL, etat: "liquide", humeur: "sourire", regard: [1, -1] });
      return { carte: 10, temp: MEL, etat: "liquide", humeur: "sourire" };
    };
  };

  /* =====================================================================
     8 · le détendeur de l'évaporateur : bobine, pointeau, siège ; deux sondes à la sortie
     ===================================================================== */
  S.detendeur = function (g, c) {
    const LIQ = D.couleur(MEL, false), FRD = D.couleur(FROID, false);
    const V = vanne(g, 420, 400, 0.8, "bobine", 1);
    const yH0 = V.Y(-110), yH1 = V.Y(-16), yB0 = V.Y(16), yB1 = V.Y(130); // 312, 387, 413, 504
    // les ailettes de l'évaporateur sont derrière le tube
    for (let x = 806; x <= 1050; x += 22) D.el("rect", { x: x, y: 374, width: 8, height: 160, fill: "url(#vm-acier-h)", opacity: 0.9 }, g);
    D.tube(g, 60, yH0 - 10, V.X(-200) - 60, yH1 - yH0 + 20, "cuivre");
    D.tube(g, V.X(200), yB0 - 10, 1540 - V.X(200), yB1 - yB0 + 20, "cuivre");
    // la haute pression : du liquide plein (nappe pleine hauteur + reflets qui filent)
    D.el("rect", { x: 60, y: yH0, width: V.X(180) - 60, height: yH1 - yH0, fill: LIQ, opacity: 0.82 }, g);
    const fluxIn = D.courant(g, 60, V.X(180), yH0, yH1, 7, 21);
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    let nv = 0.62;
    const niv = x => x < 790 ? nv : x < 1070 ? nv * (1 - D.lisse((x - 790) / 280)) : 0; // la nappe s'amenuise dans l'évaporateur
    const liq = D.liquide(g, { x0: V.X(-60), x1: 1540, yh: yB0, yb: yB1, niveau: niv, couleur: () => FRD, pas: 20 });
    const jet = D.el("path", { fill: D.couleur(FROID + 0.05, false), opacity: 0.5 }, g);
    const gouttes = D.bulles(D.el("g", {}, g), 8, 31, true);
    const bul = D.bulles(D.el("g", {}, g), 18, 41, false);
    const r = D.alea(29), VAP = [];
    for (let i = 0; i < 30; i++) VAP.push({ s: r(), ry: r(), d: i < 3 ? c.T[3] + 1 + i : c.T[4] + (i - 3) * 0.1, maj: D.mol(vap) });
    const ouvrir = V.haut();
    const dessus = D.el("g", {}, g);

    // le régulateur, son câble vers la bobine, ses deux sondes à la sortie de l'évaporateur
    const reg = regulateur(g, 780, 150, 400, 140);
    const cabBobine = cable(g, "M " + (V.prise[0] + 2) + " " + V.prise[1].toFixed(1) + " L 780 " + V.prise[1].toFixed(1));
    const cabP = cable(g, "M 1200 336 L 1200 322 L 1010 322 L 1010 290");
    const cabT = cable(g, "M 1400 350 L 1400 304 L 1070 304 L 1070 290");
    const sondes = D.el("g", {}, g);
    D.el("circle", { cx: 1200, cy: 358, r: 24, fill: "#fff", stroke: "#2f6fb8", "stroke-width": 5 }, sondes);
    D.texte(sondes, 1200, 369, "P", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#2f6fb8", "font-family": FONT });
    D.el("rect", { x: 1196, y: 380, width: 8, height: 24, fill: "#5d6b7a" }, sondes);
    D.el("rect", { x: 1380, y: 348, width: 40, height: 56, rx: 8, fill: "#fff", stroke: D.ORANGE, "stroke-width": 5 }, sondes);
    D.texte(sondes, 1400, 386, "T", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.ORANGE, "font-family": FONT });
    D.el("rect", { x: 1370, y: 400, width: 60, height: 8, rx: 4, fill: "#5d6b7a" }, sondes);
    const lSonde = D.el("g", {}, g);
    D.etiquette(lSonde, 1100, 575, "sonde de pression"); D.trait(lSonde, 1200, 548, 1200, 408);
    D.etiquette(lSonde, 1540, 640, "sonde de température", { "text-anchor": "end" }); D.trait(lSonde, 1440, 612, 1402, 408);

    // cadran et thermomètre : 35 bar et 0 °C à la phrase 2, puis la chute à la phrase 3
    const bloc = D.el("g", {}, g);
    const cad = cadran(bloc, 170, 640, 66, 40, 5), lectP = lecture(bloc, 170, 748, 150);
    D.etiquette(bloc, 170, 546, "pression", { "text-anchor": "middle" });
    const th = thermo(bloc, 440, 604, 96, -20, 10), lectT = lecture(bloc, 610, 678, 150);
    D.etiquette(bloc, 440, 580, "température", { "text-anchor": "middle" });

    // les deux cartes (phrase 6)
    const cartes = [[830, "detendeur", "détendeur de l'évaporateur", "règle la surchauffe", c.T[6]], [60, "detendeurHP", "détendeur haute pression", "règle la haute pression", c.A(6, 0.5)]]
      .map(([x, nom, l1, l2, a]) => {
        const k = D.el("g", {}, g);
        D.el("rect", { x: x, y: 550, width: 710, height: 190, rx: 20, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, k);
        D.image(k, nom, x + 20, 580, 170, 130);
        D.texte(k, x + 210, 640, l1, { "font-size": 34, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
        D.texte(k, x + 210, 690, l2, { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": FONT });
        return { g: k, a: a };
      });

    D.etiquette(g, 60, 290, "entrée : liquide", { "font-size": 28 });
    D.etiquette(g, 330, 214, "bobine", { "text-anchor": "end" }); D.trait(g, 336, 208, 368, 206);
    D.etiquette(g, 250, 480, "pointeau", { "text-anchor": "end" }); D.trait(g, 256, 474, 408, 408);
    D.etiquette(g, 930, 360, "évaporateur", { "text-anchor": "middle" });
    D.etiquette(g, 600, 395, "mélange froid");

    const mila = D.heroine(dessus, { r: 30 });
    const tOri = c.A(3, 0.5);
    return function (t) {
      const sonde = t > c.T[5] && t < c.E[6];
      ouvrir(14 + (t > c.T[5] ? 4 * Math.sin(t * 1.6) : 0));
      cabBobine(t, sonde); cabP(t, sonde); cabT(t, sonde);
      [reg.g, cabBobine.p, cabP.p, cabT.p, sondes].forEach(e => fondu(e, t, c.T[5] - 0.2, c.D + 1));
      fondu(lSonde, t, c.T[5], c.E[5] + 0.3);
      reg.ecrire(t > c.T[5] ? "surchauffe" : "", t > c.T[5] ? "réglée ✓" : "");

      fluxIn(t, 90);
      nv = D.courbe([[c.T[4], 0.6], [c.T[4] + 1.2, 0.4]], t);
      liq.maj(t);
      const surf = x => liq.surface(x, t), sb = surf(420);
      jet.setAttribute("d", "M 404 " + (yB0 - 2) + " L 436 " + (yB0 - 2) + " L 446 " + sb.toFixed(1) + " L 394 " + sb.toFixed(1) + " Z");
      gouttes(t, q => [405 + q * 30, yB0 + 2, sb, 0.9, FRD]);
      bul(t, q => { const x = 640 + q * 400; return [x, yB1 - 6, surf(x) + 4, niv(x) > 0.12 ? D.lisse((t - c.T[4]) / 0.8) : 0]; });
      VAP.forEach(m => {
        const x = 450 + D.frac(m.s + t * 130 / 1090) * 1090, libre = surf(x) - yB0;
        const vis = D.lisse((t - m.d) / 0.35) * D.borne((libre - 34) / 26, 0, 1) * D.borne((1540 - x) / 40, 0, 1);
        m.maj(x, yB0 + 16 + m.ry * Math.max(0, libre - 34) + Math.sin(t * 3 + m.s * 9) * 3, FROID, true, vis);
      });

      // la pression et la température chutent quand je passe le pointeau
      const bar = D.courbe([[tOri - 0.5, 35], [tOri + 0.8, 26]], t), deg = D.courbe([[tOri - 0.5, 0], [tOri + 1.0, -10]], t);
      cad(bar); lectP(Math.round(bar) + " bar"); th(deg); lectT(Math.round(deg).toString().replace("-", "−") + " °C");
      fondu(bloc, t, c.T[2] - 0.1, c.T[6] - 0.05);
      cartes.forEach(k => k.g.setAttribute("opacity", D.lisse((t - k.a) / 0.4).toFixed(2)));

      // l'héroïne
      const x = D.courbe([[c.T[2], 120], [c.A(3, 0.2), 330], [tOri, 420], [c.A(3, 0.85), 450], [c.E[3] + 0.6, 540], [c.E[5], 640], [c.T[7], 650], [c.E[7], 1030], [c.D - 0.2, 1100]], t, true);
      const pres = D.borne(1 - Math.abs(x - 420) / 60, 0, 1);
      let y;
      if (x < 360) y = 350; else if (x < 420) y = D.lerp(350, 400, D.lisse((x - 360) / 60));
      else if (x < 470) y = D.lerp(400, surf(x) + 4, D.lisse((x - 420) / 50)); else y = surf(x) + 4;
      plan(mila, x > 465 ? fond : dessus);
      const temp = D.courbe([[tOri - 0.2, MEL], [tOri + 0.6, FROID]], t);
      const etat = t < c.A(4, 0.3) ? "liquide" : "bout";
      const humeur = t > c.T[7] ? "sourire" : t > tOri - 0.4 && t < c.E[4] ? "surprise" : t >= c.E[4] ? "froid" : "sourire";
      mila({ x: x, y: y, s: D.lerp(0.62, 0.42, pres), t: t, temp: temp, etat: etat, humeur: humeur, ecrase: 0.8 * pres, regard: [1, 0.3] });
      return { carte: D.courbe([[c.T[2], 10.4], [tOri, 13], [c.T[7], 14.2], [c.D - 0.2, 14.6]], t, true), temp: temp, etat: etat, humeur: humeur };
    };
  };
})();
