/* =====================================================================
   voyage-glissement-scenes-c.js — le condenseur, le sous-refroidissement,
   la charge, les autres fluides, le résumé
   ---------------------------------------------------------------------
   Édition « le glissement » (récit : donnees/voyage-glissement.js, brief :
   voyage-glissement/BRIEF-SCENES.md, section C). Même contrat que les autres
   scènes : S[id] = function (g, c) → maj(t) ; décor posé UNE fois, maj(t) ne
   fait que bouger / colorer / montrer. Fonction pure de t, aucun état gardé.
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760 ; la colonne de
   droite appartient à la carte et au diagramme (commandés par le récit : ces
   scènes ne rendent `diag` qu'à la fin du résumé).
   LE CONDENSEUR (scènes 8 et 9) : une seule aide, condensateur(), pour que les
   deux scènes dessinent pareil. Le fluide entre à DROITE (vapeur) et sort à
   GAUCHE, comme sur la croix du frigoriste. La nappe de liquide monte le long
   du tube ; les petites molécules (vert R32, violet R125, bleu R134a) se voient
   par transparence dans la nappe et flottent dans la vapeur. La composition
   change le long du tube : premières gouttes surtout bleues, vert et violet
   qui restent en vapeur, puis liquide à nouveau 2 : 1 : 2 à la dernière bulle.
   PIÈGE : une molécule garde son tirage u ; c'est la composition locale qui
   décide de sa couleur (fondu entre les trois), jamais un saut brutal.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const F = "Calibri, Arial, sans-serif", NOIR = "#10233c", VERT = "#1e7e54", ROUGE = "#c0392b", GRIS = "#637285";
  const BLEU = D.BLEU, ORANGE = D.ORANGE, CR = D.SOEURS, SORTES = ["R32", "R125", "R134a"];
  const lisse = D.lisse, borne = D.borne, lerp = D.lerp, frac = D.frac, courbe = D.courbe, fenetre = D.fenetre;
  const MELANGE = [0.4, 0.2, 0.4]; // 2 R32 : 1 R125 : 2 R134a
  const LIQ = "rgb(150,192,234)"; // la nappe : bleu pâle translucide, les molécules s'y voient à travers
  const mix = (a, b, f) => a.map((v, i) => lerp(v, b[i], f));
  const op = (e, v) => e.setAttribute("opacity", borne(v, 0, 1).toFixed(2));
  const txt = (p, x, y, s, taille, coul, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille, fill: coul || NOIR, "font-family": F, "font-weight": 700 }, at || {}));
  const eti = (p, x, y, s, at) => D.etiquette(p, x, y, s, at);
  const larg = (t, s, taille) => (t.getComputedTextLength ? t.getComputedTextLength() : 0) || s.length * taille * 0.52;
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  let nClip = 0;

  /* ---------- aides communes ---------- */
  /* coche verte ou croix rouge, dessinées (pas de glyphe) : badge(parent, x, y, r, ok) */
  function badge(p, x, y, r, ok) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ")" }, p);
    D.el("circle", { r: r, fill: ok ? VERT : ROUGE, stroke: "#fff", "stroke-width": 3 }, g);
    D.el("path", { d: ok ? "M " + (-r * 0.45) + " " + (r * 0.02) + " L " + (-r * 0.12) + " " + (r * 0.38) + " L " + (r * 0.5) + " " + (-r * 0.34)
      : "M " + (-r * 0.36) + " " + (-r * 0.36) + " L " + (r * 0.36) + " " + (r * 0.36) + " M " + (r * 0.36) + " " + (-r * 0.36) + " L " + (-r * 0.36) + " " + (r * 0.36),
      fill: "none", stroke: "#fff", "stroke-width": r * 0.3, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    return g;
  }
  /* une grande flèche pleine, de (x1, y1) vers (x2, y2) */
  function fleche(p, x1, y1, x2, y2, coul, ep) {
    ep = ep || 10;
    const a = Math.atan2(y2 - y1, x2 - x1), h = ep * 2.6, g = D.el("g", {}, p);
    D.el("line", { x1: x1, y1: y1, x2: x2 - Math.cos(a) * h * 0.6, y2: y2 - Math.sin(a) * h * 0.6, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [x2 - Math.cos(a - 0.5) * h, y2 - Math.sin(a - 0.5) * h], [x2 - Math.cos(a + 0.5) * h, y2 - Math.sin(a + 0.5) * h]]), fill: coul }, g);
    return g;
  }
  /* une molécule du mélange : les trois sortes superposées, la composition locale dit laquelle se voit.
     rend maj(x, y, comp [R32, R125, R134a], u (tirage fixe), opacité, rayon) */
  function molecule(p) {
    const m = SORTES.map(s => D.petite(p, s));
    return function (x, y, comp, u, o, r) {
      const b0 = comp[0], b1 = comp[0] + comp[1], w = 0.09;
      const o0 = borne((b0 - u) / w + 0.5, 0, 1), o2 = borne((u - b1) / w + 0.5, 0, 1), o1 = borne(1 - o0 - o2, 0, 1);
      m[0](x, y, o0 * o, r); m[1](x, y, o1 * o, r); m[2](x, y, o2 * o, r);
    };
  }
  /* le point à la fraction q d'une ligne brisée */
  function suivre(l, q) {
    const seg = [];
    let L = 0;
    for (let i = 1; i < l.length; i++) { const d = Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]); seg.push(d); L += d; }
    let k = borne(q, 0, 1) * L;
    for (let i = 0; i < seg.length; i++) {
      if (k <= seg[i] || i === seg.length - 1) { const f = seg[i] ? k / seg[i] : 0; return [lerp(l[i][0], l[i + 1][0], f), lerp(l[i][1], l[i + 1][1], f)]; }
      k -= seg[i];
    }
    return l[0];
  }
  /* un flexible (coupe : gaine sombre, intérieur clair où l'on voit passer les molécules) */
  function flexible(p, l, coul) {
    const d = "M " + l.map(q => q[0] + " " + q[1]).join(" L ");
    D.el("path", { d: d, fill: "none", stroke: coul || "#8a4a24", "stroke-width": 26, "stroke-linecap": "round", "stroke-linejoin": "round" }, p);
    D.el("path", { d: d, fill: "none", stroke: "#f4f8fc", "stroke-width": 16, "stroke-linecap": "round", "stroke-linejoin": "round" }, p);
  }
  /* des molécules qui partent chacune à son heure le long d'un chemin et s'arrêtent au bout.
     especes : rang de la sorte (0 R32, 1 R125, 2 R134a) ; chemin(i) → ligne brisée de la molécule i */
  function flot(p, especes, a, b, duree, chemin, r) {
    const M = especes.map((e, i) => ({ m: D.petite(p, SORTES[e]), t0: lerp(a, b, especes.length > 1 ? i / (especes.length - 1) : 0), ph: i * 1.7, l: chemin(i) }));
    return function (t, fin) {
      M.forEach(o => {
        const q = (t - o.t0) / duree;
        if (q < 0) { o.m(-50, -50, 0); return; }
        const [x, y] = suivre(o.l, q), bout = q >= 1;
        o.m(x + (bout ? Math.sin(t * 1.6 + o.ph) * 5 : 0), y + (bout ? Math.cos(t * 1.9 + o.ph) * 5 : 0), bout ? fin : 1, r);
      });
    };
  }
  /* un petit robinet à volant ; dir −1 : au-dessus du goulot, +1 : en dessous */
  function robinet(p, x, yb, dir) {
    const y1 = yb + dir * 24;
    D.el("rect", { x: x - 15, y: Math.min(yb, y1), width: 30, height: 24, rx: 4, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2 }, p);
    D.el("rect", { x: x - 22, y: dir < 0 ? y1 - 8 : y1, width: 44, height: 8, rx: 4, fill: ROUGE, stroke: "#7a1f14", "stroke-width": 2 }, p);
  }
  /* la bouteille de fluide en coupe : nappe au fond (près du robinet si elle est retournée), vapeur au-dessus,
     petites molécules dans les deux.
     o : { cx, y0 (haut du col), w, h, inv, niveau, temp, nV, nL, graine, valves: [dx…], plongeur }
     rend { maj(t, compVapeur, compLiquide, opacité), surface(t), sorties, plongeur, yb } */
  function bouteille(g, o) {
    const nw = o.w * 0.42, nh = 34, sh = o.w * 0.34, rr = 22, ym = o.y0 + o.h / 2, ys = o.y0 + nh;
    const flip = o.inv ? "translate(0 " + (2 * ym) + ") scale(1 -1)" : null;
    const forme = (w, nwid, y0, h) => {
      const xa = o.cx - w / 2, xb = o.cx + w / 2, na = o.cx - nwid / 2, nb = o.cx + nwid / 2, a = y0 + nh, yp = a + sh;
      return "M " + na + " " + y0 + " L " + na + " " + a + " C " + na + " " + (a + sh * 0.55) + " " + xa + " " + (a + sh * 0.3) + " " + xa + " " + yp +
        " L " + xa + " " + (y0 + h - rr) + " Q " + xa + " " + (y0 + h) + " " + (xa + rr) + " " + (y0 + h) + " L " + (xb - rr) + " " + (y0 + h) +
        " Q " + xb + " " + (y0 + h) + " " + xb + " " + (y0 + h - rr) + " L " + xb + " " + yp + " C " + xb + " " + (a + sh * 0.3) + " " + nb + " " + (a + sh * 0.55) + " " + nb + " " + a + " L " + nb + " " + y0 + " Z";
    };
    const ext = D.el("path", { d: forme(o.w, nw, o.y0, o.h), fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 3 }, g);
    const dInt = forme(o.w - 22, nw - 22, o.y0 + 2, o.h - 12);
    const int = D.el("path", { d: dInt, fill: "#eef4fa" }, g);
    const cid = "vgc-" + (++nClip), cp = D.el("path", { d: dInt }, D.el("clipPath", { id: cid }, g));
    if (flip) [ext, int, cp].forEach(e => e.setAttribute("transform", flip));
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, g), vap = D.el("g", {}, dedans), fond = D.el("g", {}, dedans);
    const yh = o.inv ? o.y0 + 10 : ys + 6, yb = o.inv ? o.y0 + o.h - 4 : o.y0 + o.h - 10;
    const plongeur = o.plongeur ? D.el("rect", { x: o.cx + 20, y: o.inv ? o.y0 : o.y0 + 4, width: 8, height: o.h - 40, rx: 3, fill: "#aab6c3", stroke: "#5d6b7a", "stroke-width": 2 }, fond) : null;
    const liq = D.liquide(dedans, { x0: o.cx - o.w / 2, x1: o.cx + o.w / 2, yh: yh, yb: yb, niveau: () => o.niveau, couleur: () => LIQ, opacite: 0.42 });
    const sorties = (o.valves || [-24, 24]).map(dx => { robinet(g, o.cx + dx, o.inv ? o.y0 + o.h : o.y0, o.inv ? 1 : -1); return [o.cx + dx, o.inv ? o.y0 + o.h + 12 : o.y0 - 12]; });
    const demi = y => { // demi-largeur de l'intérieur à la hauteur y (col, épaule, corps)
      const u = o.inv ? 2 * ym - y : y;
      return u < ys ? nw / 2 - 11 : u < ys + sh ? lerp(nw / 2 - 11, o.w / 2 - 11, lisse((u - ys) / sh)) : o.w / 2 - 11;
    };
    const r = D.alea(o.graine || 3), M = [];
    for (let i = 0; i < (o.nV || 0); i++) M.push({ vap: true, a: r(), b: r(), u: r(), ph: r() * 6.28, mol: molecule(vap) });
    for (let i = 0; i < (o.nL || 0); i++) M.push({ vap: false, a: r(), b: r(), u: r(), ph: r() * 6.28, mol: molecule(fond) });
    const yvap = o.yvap || (o.inv ? o.y0 + 26 : o.y0 + nh + sh + 14);
    const surface = t => liq.surface(o.cx, t);
    function maj(t, cv, cl, alpha) {
      liq.maj(t);
      const sf = surface(t);
      M.forEach(m => {
        const a0 = m.vap ? yvap : sf + 18, a1 = m.vap ? sf - 16 : yb - 16;
        if (a1 < a0 + 8) { m.mol(-50, -50, cv, 0.5, 0); return; }
        const y = lerp(a0, a1, m.b), hw = Math.max(6, demi(y) - 14);
        m.mol(o.cx + (m.a * 2 - 1) * hw + Math.sin(t * 1.4 + m.ph) * 5, y + Math.sin(t * 2.1 + m.ph) * 4, m.vap ? cv : cl, m.u, alpha, 10);
      });
    }
    return { maj: maj, surface: surface, sorties: sorties, plongeur: plongeur, yb: yb, yh: yh };
  }
  /* présence d'un panneau : il entre à la phrase a, il sort avant la phrase b ; l'un s'efface avant que l'autre apparaisse (jamais deux textes superposés) */
  const panneau = (t, a, b) => (a === null ? 1 : lisse((t - (a - 0.3)) / 0.4)) * (b === undefined ? 1 : 1 - lisse((t - (b - 0.7)) / 0.4));
  /* « 40 − 35 = 5 degrés » + coche ou croix, + éventuellement un petit texte à la suite */
  function formule(p, x, y, s, coul, ok, suite) {
    const gg = D.el("g", {}, p), t = txt(gg, x, y, s, 46, coul), l = larg(t, s, 46);
    badge(gg, x + l + 44, y - 16, 26, ok);
    if (suite) txt(gg, x + l + 90, y, suite, 36, coul);
    return gg;
  }

  /* ---------- le condenseur en coupe, partagé par les scènes 8 et 9 ----------
     Le fluide avance de p = 0 (entrée, à droite) à p = 1 (sortie, à gauche).
     o : { graine, ailettes [x, x], colonnes [x…] (air), fleches [[x, 0 dessus | 1 dessous]…], niveau(p, t) 0..1,
           compLiq(p, t), compVap(p, t), nL, nV, p0L (début du liquide), p1V (fin de la vapeur),
           gouttes(t) → [p0, p1, visible] | null, chaleur(t), courant }
     rend { fond (sous la nappe : y poser l'héroïne), maj(t), surface(x, t), xDe(p) } */
  const X0 = 40, X1 = 940, YH = 386, YB = 566;
  function condensateur(g, o) {
    const xDe = p => X1 - p * (X1 - X0);
    let T = 0;
    for (let x = o.ailettes[0]; x <= o.ailettes[1]; x += 24) D.el("rect", { x: x, y: 300, width: 7, height: 352, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g), chev = [];
    o.colonnes.forEach((x, k) => { for (let j = 0; j < 3; j++) chev.push({ x: x, f: frac(j / 3 + k * 0.13), maj: D.chevron(air) }); });
    const fl = o.fleches.map(([x, bas], i) => ({ x: x, bas: bas, f: frac(i * 0.37), maj: D.chaleur(chaud) }));
    D.el("rect", { x: X0, y: YH - 16, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YB, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YH, width: X1 - X0, height: YB - YH, fill: "#f4f8fc" }, g);
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    const liq = D.liquide(g, { x0: X0, x1: X1, yh: YH, yb: YB, niveau: x => o.niveau(1 - (x - X0) / (X1 - X0), T), couleur: () => LIQ, opacite: 0.42 });
    const goutte = D.bulles(D.el("g", {}, g), 36, o.graine + 1, true);
    const cour = o.courant ? D.courant(g, X0, X1, YH, YB, 9, o.graine + 5) : null;
    const r = D.alea(o.graine), L = [], V = [];
    for (let i = 0; i < o.nL; i++) L.push({ p: lerp(o.p0L, 1, r()), v: r(), u: r(), ph: r() * 6.28, mol: molecule(fond) });
    for (let i = 0; i < o.nV; i++) V.push({ p: lerp(0.01, o.p1V, r()), v: r(), u: r(), ph: r() * 6.28, mol: molecule(vap) });
    function maj(t) {
      T = t;
      chev.forEach(ch => {
        const f = frac(ch.f + t * 0.16), y = 262 + f * 418;
        ch.maj(ch.x, y, 0, y < YH ? "#3d7fca" : "#e8914a", fenetre(f, 0, 1, 0.12) * (y > YH - 26 && y < YB + 26 ? 0 : 0.9));
      });
      fl.forEach(v => {
        const f = frac(v.f + t * 0.45), d = 40 * f;
        v.maj(v.x, v.bas ? YB + 20 + d : YH - 20 - d, v.bas ? 0 : 180, o.chaleur(t) * fenetre(f, 0, 1, 0.25));
      });
      liq.maj(t);
      goutte(t, q => {
        const z = o.gouttes && o.gouttes(t);
        if (!z) return [-50, 0, 0, 0];
        const p = lerp(z[0], z[1], q), x = xDe(p), nv = o.niveau(p, t);
        return [x, YH + 6, liq.surface(x, t) + 2, nv > 0.02 && nv < 0.95 ? z[2] : 0, "#5b93d1"];
      });
      if (cour) cour(t, -45);
      L.forEach(m => {
        const x0 = xDe(m.p), sf = liq.surface(x0, t), prof = Math.max(0, YB - 14 - (sf + 14));
        m.mol(x0 + Math.sin(t * 1.3 + m.ph) * 4, sf + 14 + m.v * prof + Math.sin(t * 2 + m.ph) * 3, o.compLiq(m.p, t), m.u, borne((YB - sf - 40) / 26, 0, 1), 10);
      });
      V.forEach(m => {
        const x0 = xDe(m.p), libre = liq.surface(x0, t) - YH;
        m.mol(x0 + Math.sin(t * 1.1 + m.ph) * 6, YH + 18 + m.v * Math.max(0, libre - 40) + Math.sin(t * 2.6 + m.ph) * 5, o.compVap(m.p, t), m.u, borne((libre - 44) / 30, 0, 1), 10);
      });
    }
    return { fond: fond, maj: maj, surface: liq.surface, xDe: xDe };
  }

  /* ---------- 8 · le condenseur : le glissement à l'envers ---------- */
  S.condenseur = function (g, c) {
    const CX = 480, CY = 450, pR = 0.30, pB = 0.74; // compresseur ; points de rosée et de bulle (fraction du tube)
    const vueC = D.el("g", {}, g), vueK = D.el("g", {}, g), avant = D.el("g", {}, g);
    /* k0 · k1 : le compresseur, son symbole entre le tube d'aspiration (froid) et celui du refoulement (chaud) */
    const SC = 9.2, PO = 16 * SC; // échelle du symbole ; distance de ses raccords au centre
    D.tube(vueC, X0, CY - 50, CX - PO - X0, 100, "cuivre", false, "#eef4fa");
    D.tube(vueC, CX + PO, CY - 50, X1 - CX - PO, 100, "cuivre", false, "#fbe6d6");
    D.image(vueC, "compresseur", CX - 24 * SC, CY - 20 * SC, 50 * SC, 40 * SC);
    eti(vueC, X0, CY + 100, "vapeur froide");
    eti(vueC, X1, CY + 100, "vapeur chaude", { "text-anchor": "end" });
    const SEG = [[60, CX - PO, 1300], [CX - PO, CX + PO, 700], [CX + PO, 920, 700]], DUR = SEG.map(s => (s[1] - s[0]) / s[2]), TOT = DUR[0] + DUR[1] + DUR[2];
    const xFlux = u => { let k = u * TOT; for (let i = 0; i < 3; i++) { if (k <= DUR[i] || i === 2) return lerp(SEG[i][0], SEG[i][1], borne(k / DUR[i], 0, 1)); k -= DUR[i]; } };
    const flux = Array.from({ length: 15 }, (_, i) => ({ u: i / 15, v: frac(i * 0.618), m: D.petite(vueC, ["R32", "R134a", "R125", "R32", "R134a"][i % 5]) }));
    const pression = D.pastille(vueC, CX, 712, "pression ↑ · température ↑", ORANGE, 32, "middle");
    const th60 = D.thermometre(vueC, 715, 170, { pince: [800, CY - 45] });
    /* k2 → : le condenseur en coupe */
    const K = condensateur(vueK, { graine: 37, ailettes: [300, 940], colonnes: [330, 430, 530, 630, 730, 830, 930],
      fleches: [[380, 0], [480, 0], [580, 0], [780, 0], [880, 0], [380, 1], [480, 1], [680, 1], [880, 1]],
      nL: 70, nV: 44, p0L: pR, p1V: 0.82,
      chaleur: () => 1,
      niveau: (p, t) => {
        const grow = courbe([[c.A(3, 0.3), 0], [c.E[5], 0.6], [c.A(6, 0.6), 1]], t);
        const mx = courbe([[c.A(3, 0.2), 0], [c.A(3, 0.4), 0.1], [c.E[4], 0.5], [c.E[5], 0.7], [c.A(6, 0.7), 1]], t);
        return p <= pR ? 0 : mx * lisse((p - pR) / (lerp(pR + 0.03, pB, grow) - pR));
      },
      compLiq: (p, t) => mix(MELANGE, mix([0.07, 0.03, 0.90], MELANGE, Math.pow(lisse((p - pR) / (pB - pR)), 2)), lisse((t - c.A(3, 0.4)) / (c.A(4, 0.4) - c.A(3, 0.4)))),
      compVap: (p, t) => mix(MELANGE, mix(MELANGE, [0.5, 0.4, 0.1], lisse((p - pR) / (pB - pR))), lisse((t - c.A(5, 0.1)) / (c.A(5, 0.8) - c.A(5, 0.1)))),
      gouttes: t => {
        const grow = courbe([[c.A(3, 0.3), 0], [c.E[5], 0.6], [c.A(6, 0.6), 1]], t);
        const v = lisse((t - c.A(3, 0.25)) / 0.5) * (1 - lisse((t - c.A(6, 0.55)) / 0.6));
        return v > 0.01 ? [pR, lerp(pR + 0.06, pB, grow), v] : null;
      } });
    eti(vueK, X0, 316, "air du dehors");
    eti(vueK, X0, 648, "air réchauffé");
    const th45 = D.thermometre(vueK, 595, 160, { pince: [680, YH - 8] });
    const th40 = D.thermometre(vueK, 195, 160, { pince: [280, YH - 8] });
    const lbRosee = eti(vueK, 790, 207, "la rosée", { fill: ROUGE });
    const lbBulle = eti(vueK, 378, 207, "la bulle", { fill: "#2f6fb8" });
    const lbBleu = D.el("g", {}, vueK), lbPresse = D.el("g", {}, vueK), lbGliss = D.pastille(vueK, 480, 742, "45 → 40 °C à la même pression : le glissement en descendant", ORANGE, 30, "middle");
    eti(lbBleu, 580, 742, "plus de R134a", { "text-anchor": "middle", fill: CR.R134a.coul }); D.trait(lbBleu, 580, 712, 580, 578);
    eti(lbPresse, X1, 742, "les pressées restent en vapeur", { "text-anchor": "end" }); D.trait(lbPresse, 780, 712, 780, 578);
    const derniere = D.el("circle", { fill: "rgba(255,255,255,.55)", stroke: "#7c8fa6", "stroke-width": 3 }, vueK);
    const mila = D.heroine(avant, { r: 30 }), tc = c.A(4, 0.5);
    const pH = t => courbe([[c.T[2], 0.03], [c.E[3], 0.2], [tc, 0.42], [c.E[5], 0.58], [c.A(6, 0.7), 0.78], [c.D - 0.2, 0.9]], t);
    const vol = (x, t) => Math.min(YH + 54 + Math.sin(t * 2.5) * 8, K.surface(x, t) - 46);
    const nage = (x, t) => Math.min(Math.max(K.surface(x, t) + 4 + Math.sin(t * 2) * 4, YH + 40), YB - 42);
    return function (t) {
      op(vueC, 1 - lisse((t - (c.T[2] - 0.7)) / 0.4)); op(vueK, lisse((t - (c.T[2] - 0.3)) / 0.4));
      /* compresseur */
      flux.forEach(m => {
        const u = frac(m.u + t * 0.05), x = xFlux(u), dans = lisse(borne(1 - Math.abs(x - CX) / 135, 0, 1) * 2);
        m.m(x, CY + (m.v - 0.5) * 2 * lerp(18, 56, dans) + Math.sin(t * 2 + m.u * 20) * 3, fenetre(u, 0, 1, 0.03), 9);
      });
      op(pression, lisse((t - c.T[0] - 0.3) / 0.5));
      th60("> 60 °C", lisse((t - c.T[1]) / 0.5));
      /* condenseur */
      K.maj(t);
      th45("45 °C", lisse((t - c.T[3]) / 0.5)); th40("40 °C", lisse((t - c.T[6]) / 0.5));
      op(lbRosee, lisse((t - c.A(3, 0.2)) / 0.4)); op(lbBulle, lisse((t - c.A(6, 0.3)) / 0.4));
      op(lbBleu, fenetre(t, c.T[4], c.T[5], 0.4)); op(lbPresse, fenetre(t, c.T[5], c.T[6], 0.4));
      op(lbGliss, lisse((t - c.T[7]) / 0.5));
      const xb = K.xDe(pB - 0.03), f = (t - c.A(6, 0.25)) / (c.A(6, 0.8) - c.A(6, 0.25));
      derniere.setAttribute("cx", xb.toFixed(1)); derniere.setAttribute("cy", (YH + 24).toFixed(1)); derniere.setAttribute("r", lerp(18, 3, borne(f, 0, 1)).toFixed(1));
      op(derniere, fenetre(f, 0, 1, 0.2));
      /* l'héroïne : dans le compresseur, puis le long du condenseur ; vapeur jusqu'à k4, liquide après */
      const xm = t < c.T[2] ? courbe([[c.T[0], 110], [c.A(0, 0.5), CX], [c.E[0], CX + 150], [c.A(1, 0.4), 780], [c.E[1], 860], [c.T[2], 913]], t) : K.xDe(pH(t));
      const dansC = t < c.E[1] ? 1 : 1 - lisse((t - c.E[1]) / (c.T[2] + 1 - c.E[1]));
      const yv = vol(xm, t), yl = nage(xm, t);
      const ym = lerp(lerp(yv, yl, lisse((t - tc + 0.2) / 1.2)), CY + Math.sin(t * 2) * 4, dansC);
      const serre = t < c.E[1] ? 0.55 * borne(1 - Math.abs(xm - CX) / 150, 0, 1) : 0;
      const etat = t < tc ? "vapeur" : "liquide";
      const temp = courbe([[c.T[0], 0.2], [c.A(0, 0.4), 0.2], [c.E[0], 0.6], [c.A(1, 0.2), 0.62], [c.T[2], 0.62], [c.A(3, 0.3), 0.5], [c.A(6, 0.5), 0.46]], t);
      const humeur = t < c.A(0, 0.35) ? "sourire" : t < c.E[2] ? "chaud" : t > tc - 0.3 && t < tc + 1.2 ? "surprise" : "sourire";
      plan(mila, t >= tc - 0.3 ? K.fond : avant);
      mila({ x: xm, y: ym, s: lerp(0.8, 0.9, 1 - dansC), t: t, temp: temp, etat: etat, humeur: humeur, ecrase: serre, regard: t < c.T[2] ? [1, 0] : [-1, 0] });
      return { carte: courbe([[c.T[0], 2.9], [c.E[0], 3.5], [c.E[1], 4.4], [c.T[2], 5.4], [c.A(3, 0), 6.0], [c.E[6], 7.0], [c.D, 7.2]], t), temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 9 · le sous-refroidissement : la mesure se prend sur la bulle ---------- */
  S["sous-refroidissement"] = function (g, c) {
    const vue = D.el("g", {}, g), p6 = D.el("g", {}, g), cartes = D.el("g", {}, g);
    /* le bas du condenseur (à droite, avec ses ailettes) et la ligne liquide (à gauche, tube plein) */
    const K = condensateur(vue, { graine: 53, ailettes: [700, 940], colonnes: [740, 830, 920], fleches: [[785, 0], [875, 0], [785, 1], [875, 1]],
      nL: 54, nV: 0, p0L: 0, p1V: 0.5, chaleur: () => 1, courant: true,
      niveau: () => 1, compLiq: () => MELANGE, compVap: () => MELANGE });
    eti(vue, X0, 330, "ligne liquide");
    eti(vue, X1, 205, "bas du condenseur", { "text-anchor": "end" });
    const th = D.thermometre(vue, 215, 160, { pince: [300, YH - 8] });
    const af = D.afficheur(vue, 420, 160, 250, ["rosée 45 °C", "bulle 40 °C"], "HP");
    const sens = D.el("g", {}, vue);
    D.pastille(sens, X0, 648, "sous-refroidissement", ORANGE, 34, "start");
    D.lignes(sens, X0, 702, ["de combien le liquide est sous", "la fin de la condensation"], { "font-size": 32, fill: NOIR, "font-family": F, "font-weight": 700 }, 40);
    const f1 = formule(vue, X0, 650, "40 − 35 = 5 degrés", VERT, true), f2 = formule(vue, X0, 716, "45 − 35 = 10 degrés", ROUGE, false, "encore le double");
    const mila = D.heroine(K.fond, { r: 30 });
    /* k6 : la bouteille de charge, un tuyau, et une flèche « retirer du fluide ? » barrée */
    D.tube(p6, 150, 250, 660, 78, "cuivre", false, "#cfe2f5");
    const mols6 = [0, 2, 1, 2, 0, 2].map((e, i) => ({ m: D.petite(p6, SORTES[e]), x: 210 + i * 105, ph: i * 1.3 }));
    const fl6 = fleche(p6, 480, 352, 480, 470, "#3b4a5e", 14);
    const bt = bouteille(p6, { cx: 480, y0: 500, w: 170, h: 250, niveau: 0.4, temp: 0.3, valves: [0], graine: 9 });
    const cr6 = D.el("path", { d: "M 432 362 L 528 458 M 528 362 L 432 458", fill: "none", stroke: ROUGE, "stroke-width": 16, "stroke-linecap": "round" }, p6), lb6 = D.el("g", {}, p6);
    eti(lb6, 545, 395, "retirer du fluide ?"); txt(lb6, 545, 448, "à tort", 42, ROUGE);
    /* k7 : deux cartes côte à côte, chacune avec sa loupe sur le diagramme */
    const carte = (x, mot, suite, coul, lo, pt, dir, zone) => {
      const cg = D.el("g", {}, cartes);
      D.el("rect", { x: x, y: 180, width: 440, height: 540, rx: 24, fill: "#fffdf8", stroke: BLEU, "stroke-width": 4 }, cg);
      const L = D.loupe(cg, Object.assign({ x: x + 20, y: 204, l: 400, h: 250 }, lo)), [px, py] = L.pt(pt);
      fleche(cg, px + dir * 18, py, px + dir * 94, py, ORANGE, 8);
      D.el("circle", { cx: px, cy: py, r: 12, fill: coul, stroke: "#fff", "stroke-width": 3 }, cg);
      txt(cg, x + 22, 492, "liquide", 28, GRIS); txt(cg, x + 418, 492, "vapeur", 28, GRIS, { "text-anchor": "end" });
      txt(cg, x + 220, 570, mot, 40, NOIR, { "text-anchor": "middle" });
      txt(cg, x + 220, 650, "→ " + suite, 56, coul, { "text-anchor": "middle" });
      return cg;
    };
    carte(30, "surchauffe", "rosée", ROUGE, { plageH: [185, 500], plageP: [4, 8.5], isobares: ["BP"] }, [411.9, 5.469], 1);
    carte(490, "sous-refroidissement", "bulle", "#2f6fb8", { plageH: [170, 450], plageP: [14, 22], isobares: ["HP"] }, [260.6, 17.536], -1);
    return function (t) {
      op(vue, panneau(t, null, c.T[6])); op(p6, panneau(t, c.T[6], c.T[7])); op(cartes, panneau(t, c.T[7]));
      K.maj(t);
      th("35 °C", lisse((t - c.T[1]) / 0.5));
      af(t < c.T[3] ? -1 : t < c.T[5] ? 1 : 0, lisse((t - c.T[3]) / 0.5));
      op(sens, fenetre(t, c.T[2], c.T[4] - 0.1, 0.4));
      op(f1, lisse((t - c.T[4]) / 0.5)); op(f2, lisse((t - c.T[5]) / 0.5));
      const x = courbe([[c.T[0], 905], [c.T[1], 520], [c.A(1, 0.5), 300], [c.E[3], 215], [c.E[5], 140], [c.D, 90]], t);
      const temp = courbe([[c.T[0], 0.46], [c.E[0], 0.42]], t);
      mila({ x: x, y: 476 + Math.sin(t * 2) * 4, s: 0.85, t: t, temp: temp, etat: "liquide", humeur: "sourire", regard: [-1, 0] });
      /* k6 */
      bt.maj(t, MELANGE, MELANGE, 0);
      mols6.forEach(o => o.m(o.x + Math.sin(t * 1.5 + o.ph) * 8, 289 + Math.cos(t * 2 + o.ph) * 8, 1, 8));
      op(fl6, lisse((t - c.T[6] - 0.3) / 0.5)); op(cr6, lisse((t - c.A(6, 0.45)) / 0.4)); op(lb6, lisse((t - c.A(6, 0.35)) / 0.5));
      return { carte: 7 + 1.4 * borne((t - c.T[0]) / (c.D - c.T[0]), 0, 1), temp: temp, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- 10 · la charge : garder le bon mélange ---------- */
  S.charge = function (g, c) {
    const P1 = D.el("g", {}, g), P4 = D.el("g", {}, g), P5 = D.el("g", {}, g), P6 = D.el("g", {}, g), P7 = D.el("g", {}, g);
    const r = D.alea(71), glisse = q => (q + 1) % 1;
    /* ---- k0 → k3 : la bouteille (coupe), le circuit, les bonnes façons de charger ---- */
    const gBot = D.el("g", {}, P1); // la bouteille : au centre pendant k0 et k1, puis elle glisse à gauche pour laisser place au circuit
    const BA = bouteille(gBot, { cx: 170, y0: 270, w: 230, h: 470, niveau: 0.38, temp: 0.3, nV: 14, nL: 24, graine: 5, plongeur: true, yvap: 462 });
    const plaque = D.el("g", {}, gBot);
    D.el("rect", { x: 75, y: 392, width: 190, height: 54, rx: 10, fill: "#fff", stroke: BLEU, "stroke-width": 3 }, plaque);
    txt(plaque, 170, 432, "R407C", 40, BLEU, { "text-anchor": "middle" });
    const HV = [[146, 244], [146, 215], [640, 215]], HL = [[209, 258], [640, 258]];
    const gVap = D.el("g", {}, P1), gLiq = D.el("g", {}, P1), gCirc = D.el("g", {}, P1), gB = D.el("g", {}, P1), gFlux = D.el("g", {}, P1);
    D.el("rect", { x: 640, y: 190, width: 300, height: 130, rx: 14, fill: "#f4f8fc", stroke: "#8a4a24", "stroke-width": 8 }, gCirc);
    eti(gCirc, 640, 178, "vers le circuit");
    flexible(gVap, HV); flexible(gLiq, HL);
    const croix = badge(gVap, 380, 215, 24, false);
    const BB = bouteille(gB, { cx: 790, y0: 360, w: 200, h: 330, inv: true, niveau: 0.45, temp: 0.3, nV: 8, nL: 12, graine: 11, valves: [0] });
    flexible(gB, [[805, 702], [925, 702], [925, 320]]);
    const slot = i => [lerp(672, 908, glisse(i * 0.618)), lerp(208, 306, glisse(i * 0.382 + 0.2))];
    const lot2 = flot(gFlux, [0, 1, 0, 1, 0, 2, 1, 0, 1, 0, 2, 0], c.A(2, 0.05), c.E[2] - 1.0, 3.4,
      i => { const a = glisse(i * 0.618), b = glisse(i * 0.37); return [[lerp(110, 190, a), lerp(470, 545, b)], [146, 400], [146, 215], [640, 215], slot(i)]; }, 8);
    const lot3a = flot(gFlux, [0, 2, 1, 2, 0, 2, 1, 0], c.A(3, 0.05), c.A(3, 0.45), 3.4,
      i => { const a = glisse(i * 0.618), b = glisse(i * 0.37); return [[lerp(110, 230, a), lerp(600, 700, b)], [194, 660], [194, 258], [640, 258], slot(20 + i)]; }, 8);
    const lot3b = flot(gFlux, [2, 0, 2, 1, 0, 2], c.A(3, 0.55), c.A(3, 0.85), 3.0,
      i => { const a = glisse(i * 0.618); return [[lerp(764, 816, a), 640 + (i % 3) * 14], [790, 690], [790, 702], [925, 702], [925, 322], slot(40 + i)]; }, 8);
    const lbK0 = D.el("g", {}, gBot), lbVap = D.el("g", {}, gBot), lbLiq = D.el("g", {}, gBot), lbK2 = D.el("g", {}, P1), lbK3 = D.el("g", {}, P1);
    eti(lbK0, 320, 480, "vapeur"); D.trait(lbK0, 312, 470, 255, 470); eti(lbK0, 320, 655, "liquide"); D.trait(lbK0, 312, 645, 255, 645);
    eti(lbVap, 320, 480, "vapeur : plus de pressées"); D.trait(lbVap, 312, 470, 255, 470);
    eti(lbLiq, 320, 655, "liquide : plus de R134a"); D.trait(lbLiq, 312, 645, 255, 645);
    D.pastille(lbK2, 480, 725, "pas en vapeur", ROUGE, 32, "middle");
    const k31 = D.el("g", {}, lbK3), k32 = D.el("g", {}, lbK3), k33 = D.el("g", {}, lbK3), k34 = D.el("g", {}, lbK3);
    badge(k31, 318, 322, 20, true); eti(k31, 350, 336, "robinet liquide");
    eti(k32, 335, 478, "tube plongeur"); D.trait(k32, 328, 468, 203, 468);
    badge(k33, 318, 552, 20, true); eti(k33, 350, 564, "bouteille retournée"); D.trait(k33, 618, 552, 686, 552);
    D.pastille(k34, 480, 725, "toujours en liquide", VERT, 32, "middle");
    /* ---- k4 : côté aspiration, une vanne à peine ouverte, le liquide se vaporise avant le compresseur ---- */
    const B4 = bouteille(P4, { cx: 105, y0: 380, w: 120, h: 240, niveau: 0.42, temp: 0.3, valves: [0], plongeur: true, nL: 6, graine: 13 });
        flexible(P4, [[120, 368], [300, 368], [300, 450], [392, 450]]);
    D.tube(P4, 392, 400, 380, 100, "cuivre", false, "#f4f8fc");
    D.image(P4, "compresseur", 740, 370, 200, 160);
    D.el("rect", { x: 392, y: 390, width: 56, height: 120, rx: 8, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, P4);
    D.el("rect", { x: 416, y: 356, width: 8, height: 34, fill: "#3f4a55" }, P4);
    D.el("rect", { x: 396, y: 344, width: 48, height: 14, rx: 7, fill: ROUGE, stroke: "#7a1f14", "stroke-width": 2 }, P4);
    txt(P4, 420, 318, "doucement", 38, ORANGE, { "text-anchor": "middle" });
    const lb4 = D.el("g", {}, P4);
    eti(lb4, 520, 556, "liquide", { "text-anchor": "middle" }); eti(lb4, 680, 556, "vapeur", { "text-anchor": "middle" }); eti(lb4, X1, 585, "compresseur", { "text-anchor": "end" });
    D.pastille(P4, 480, 690, "il se vaporise avant le compresseur", BLEU, 32, "middle");
    const gouttes4 = Array.from({ length: 14 }, (_, i) => ({ s: i / 14, v: glisse(i * 0.618), u: glisse(i * 0.382),
      d: D.el("circle", { r: 11, fill: "#4a82c6", stroke: "#fff", "stroke-width": 2.5 }, P4), m: molecule(P4) }));
    /* ---- k5 : un tube, un petit trou, ça siffle : surtout des pressées s'échappent ---- */
    D.tube(P5, 60, 440, 880, 120, "cuivre", false, "#f4f8fc");
    D.el("rect", { x: 484, y: 436, width: 32, height: 14, fill: D.CREME }, P5);
    const dedans5 = Array.from({ length: 24 }, (_, i) => ({ x: 90 + glisse(i * 0.618) * 820, y: 465 + glisse(i * 0.382 + 0.3) * 70, u: glisse(i * 0.7071), ph: i * 1.9, m: molecule(P5) }));
    const sif = [0, 1, 2].map(k => {
      const rr = 34 + k * 20, a0 = -158 * Math.PI / 180, a1 = -112 * Math.PI / 180;
      return D.el("path", { d: "M " + (500 + rr * Math.cos(a0)).toFixed(1) + " " + (440 + rr * Math.sin(a0)).toFixed(1) + " A " + rr + " " + rr + " 0 0 1 " + (500 + rr * Math.cos(a1)).toFixed(1) + " " + (440 + rr * Math.sin(a1)).toFixed(1),
        fill: "none", stroke: GRIS, "stroke-width": 5, "stroke-linecap": "round" }, P5);
    });
    const lb5 = txt(P5, 330, 372, "fuite", 46, ROUGE);
    const fuite = flot(P5, [0, 1, 0, 0, 1, 0, 1, 2, 0, 1, 0, 1, 0, 2], c.T[5] + 0.2, c.E[5] - 1.6, 3.2,
      i => [[500, 462], [500, 440], [500 + 50 * Math.sin(i), 330], [500 + 150 + (i % 4) * 22, 240], [640 + (i % 5) * 36, 172]], 9);
    const pm5 = D.pastille(P5, 480, 690, "le mélange peut changer", ORANGE, 34, "middle");
    /* ---- k6 : deux étapes numérotées ---- */
    const etape = (x, w, n) => {
      const eg = D.el("g", {}, P6);
      D.el("rect", { x: x, y: 230, width: w, height: 400, rx: 26, fill: "#fffdf8", stroke: BLEU, "stroke-width": 5 }, eg);
      D.el("circle", { cx: x + 52, cy: 284, r: 36, fill: BLEU }, eg);
      txt(eg, x + 52, 300, n, 46, "#fff", { "text-anchor": "middle" });
      return eg;
    };
    const e1 = etape(40, 420, "1"), e2 = etape(500, 440, "2");
    const cle = D.el("g", { transform: "translate(250 425) rotate(-38)" }, e1);
    D.el("rect", { x: -18, y: -30, width: 36, height: 170, rx: 18, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, cle);
    D.el("circle", { cy: -62, r: 46, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, cle);
    D.el("rect", { x: -17, y: -125, width: 34, height: 62, fill: "#fffdf8" }, cle);
    D.el("circle", { cy: 118, r: 8, fill: "#fffdf8", stroke: "#4e5a66", "stroke-width": 2 }, cle);
    txt(e1, 250, 590, "réparer", 56, NOIR, { "text-anchor": "middle" });
    D.el("path", { d: "M 720 350 Q 782 440 760 480 Q 720 520 680 480 Q 658 440 720 350 Z", fill: CR.R134a.coul, stroke: "#fff", "stroke-width": 4, opacity: 0.9 }, e2);
    D.el("ellipse", { cx: 700, cy: 455, rx: 9, ry: 18, fill: "#fff", opacity: 0.55, transform: "rotate(18 700 455)" }, e2);
    txt(e2, 720, 553, "compléter", 46, NOIR, { "text-anchor": "middle" }); txt(e2, 720, 604, "en liquide", 46, NOIR, { "text-anchor": "middle" });
    const ok2 = badge(e2, 890, 284, 32, true), fl6 = D.el("g", {}, P6);
    D.el("path", { d: "M 470 410 L 490 430 L 470 450", fill: "none", stroke: ORANGE, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, fl6);
    /* ---- k7 : la consigne du fabricant, la bouteille de récupération ---- */
    const doc = D.el("g", {}, P7);
    D.el("rect", { x: 70, y: 200, width: 320, height: 420, rx: 12, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 4 }, doc);
    D.el("polygon", { points: "340,200 390,250 340,250", fill: "#dfe7f0", stroke: "#9aa7b5", "stroke-width": 3 }, doc);
    txt(doc, 100, 296, "consigne", 42, BLEU); txt(doc, 100, 346, "du fabricant", 42, BLEU);
    [260, 220, 260, 180, 240, 200].forEach((w, i) => D.el("rect", { x: 100, y: 384 + i * 36, width: w, height: 14, rx: 7, fill: "#cfd8e3" }, doc));
    const flR = fleche(P7, 420, 410, 568, 410, ORANGE, 14);
    const rec = D.el("g", { transform: "translate(-410 -140)" }, P7);
    D.el("path", { d: "M 1050 420 Q 1050 360 1130 356 Q 1210 360 1210 420 V 690 Q 1210 720 1180 720 H 1080 Q 1050 720 1050 690 Z", fill: "url(#vm-acier-h)", stroke: BLEU, "stroke-width": 4 }, rec);
    D.el("path", { d: "M 1050 420 Q 1050 360 1130 356 Q 1210 360 1210 420 Z", fill: "#e6b800", stroke: BLEU, "stroke-width": 4 }, rec);
    D.el("rect", { x: 1112, y: 312, width: 36, height: 46, rx: 6, fill: "url(#vm-acier-h)", stroke: BLEU, "stroke-width": 3 }, rec);
    D.el("rect", { x: 1078, y: 450, width: 104, height: 244, rx: 16, fill: "#f3f6fa" }, rec);
    const niv = D.el("rect", { x: 1078, y: 694, width: 104, height: 0, rx: 12, fill: D.couleur(0.3, false), opacity: 0.85 }, rec);
    txt(P7, 720, 645, "récupération", 32, NOIR, { "text-anchor": "middle" });
    const lb7 = txt(P7, 480, 722, "récupérer, recharger à neuf", 40, ORANGE, { "text-anchor": "middle" });
    return function (t) {
      const T = c.T;
      op(P1, panneau(t, null, T[4])); op(P4, panneau(t, T[4], T[5])); op(P5, panneau(t, T[5], T[6])); op(P6, panneau(t, T[6], T[7])); op(P7, panneau(t, T[7]));
      /* k0 → k3 */
      gBot.setAttribute("transform", "translate(" + (160 * (1 - lisse((t - (T[2] - 1.5)) / 0.9))).toFixed(1) + " 0)");
      op(lbK0, 1 - lisse((t - c.A(1, 0.1)) / 0.4));
      const e1k = lisse((t - c.A(1, 0.25)) / 1.6), e2k = lisse((t - c.A(2, 0.3)) / 1.6);
      BA.maj(t, mix(mix(MELANGE, [0.5, 0.28, 0.22], e1k), [0.3, 0.15, 0.55], e2k), mix(mix(MELANGE, [0.3, 0.1, 0.6], e1k), [0.2, 0.07, 0.73], e2k), 1);
      BB.maj(t, [0.5, 0.28, 0.22], MELANGE, lisse((t - c.A(3, 0.45)) / 0.5));
      op(gVap, fenetre(t, T[2] - 0.2, T[3] + 0.2, 0.4)); op(gLiq, lisse((t - (T[3] - 0.2)) / 0.5)); op(gCirc, lisse((t - (T[2] - 0.3)) / 0.5));
      op(croix, lisse((t - c.A(2, 0.55)) / 0.4)); op(gB, lisse((t - c.A(3, 0.45)) / 0.5));
      lot2(t, 1 - lisse((t - (T[3] + 0.6)) / 0.8)); lot3a(t, 1); lot3b(t, 1);
      op(lbVap, lisse((t - c.A(1, 0.2)) / 0.5) * (1 - lisse((t - (T[2] - 1.5)) / 0.5)));
      op(lbLiq, lisse((t - c.A(1, 0.55)) / 0.5) * (1 - lisse((t - (T[2] - 1.5)) / 0.5)));
      op(lbK2, fenetre(t, c.A(2, 0.4), T[3], 0.4));
      op(k31, lisse((t - c.A(3, 0.08)) / 0.4)); op(k32, lisse((t - c.A(3, 0.2)) / 0.4)); op(k33, lisse((t - c.A(3, 0.5)) / 0.4)); op(k34, lisse((t - c.A(3, 0.75)) / 0.4));
      if (BA.plongeur) op(BA.plongeur, lisse((t - c.A(3, 0.12)) / 0.4));
      /* k4 */
      B4.maj(t, MELANGE, MELANGE, 0.9);
      op(lb4, lisse((t - c.A(4, 0.45)) / 0.5));
      gouttes4.forEach(o => {
        const u = frac(o.s + t * 0.11), x = lerp(450, 762, u), v = lisse((u - 0.32) / 0.22);
        const y = 450 + (o.v - 0.5) * lerp(24, 72, lisse(u)) + Math.sin(t * 2 + o.s * 20) * 3;
        o.d.setAttribute("cx", x.toFixed(1)); o.d.setAttribute("cy", (y + (1 - v) * 10).toFixed(1)); o.d.setAttribute("r", lerp(11, 3, v).toFixed(1));
        o.d.setAttribute("opacity", (fenetre(u, 0, 1, 0.04) * (1 - v)).toFixed(2));
        o.m(x, y, MELANGE, o.u, fenetre(u, 0, 1, 0.04) * v, 10);
      });
      /* k5 */
      const bleu = lisse((t - T[5]) / (c.E[5] - T[5]));
      dedans5.forEach(m => m.m(m.x + Math.sin(t * 1.2 + m.ph) * 8, m.y + Math.sin(t * 2.3 + m.ph) * 6, mix(MELANGE, [0.3, 0.14, 0.56], bleu), m.u, 1, 10));
      sif.forEach((s, k) => op(s, t > T[5] ? 0.2 + 0.7 * Math.max(0, Math.sin(t * 7 - k * 1.2)) : 0));
      op(lb5, lisse((t - c.A(5, 0.15)) / 0.4)); fuite(t, 0); op(pm5, lisse((t - c.A(5, 0.55)) / 0.5));
      /* k6 */
      op(e1, lisse((t - T[6]) / 0.5)); op(e2, lisse((t - c.A(6, 0.5)) / 0.5)); op(ok2, lisse((t - c.A(6, 0.75)) / 0.4)); op(fl6, lisse((t - c.A(6, 0.5)) / 0.5));
      /* k7 */
      op(doc, lisse((t - T[7]) / 0.5)); op(flR, lisse((t - c.A(7, 0.3)) / 0.5)); op(rec, lisse((t - c.A(7, 0.3)) / 0.5)); op(lb7, lisse((t - c.A(7, 0.6)) / 0.5));
      const h = 200 * lisse((t - c.A(7, 0.45)) / (c.D - c.A(7, 0.45)));
      niv.setAttribute("height", h.toFixed(1)); niv.setAttribute("y", (694 - h).toFixed(1));
      return { temp: 0.3, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- 11 · qui glisse ? les autres fluides ---------- */
  S.familles = function (g, c) {
    const accueil = D.el("g", {}, g), grille = D.el("g", {}, g), bande = D.el("g", {}, g);
    const mila = D.heroine(accueil, { r: 40 }), s32 = D.soeur(accueil, "R32", 32, 0.3), s125 = D.soeur(accueil, "R125", 32, 0.6);
    D.pastille(accueil, 480, 560, "d'autres mélanges glissent", ORANGE, 38, "middle");
    const legende = txt(grille, 480, 182, "température pendant l'ébullition, à pression constante", 30, "#3b4a5e", { "text-anchor": "middle" });
    /* [nom, pente (0 = palier plat), phrase qui la montre, série] */
    const FL = [["R448A", 0.24, 1, "4"], ["R449A", 0.22, 1, "4"], ["R454C", 0.30, 1, "4"], ["R410A", 0.04, 2, "4"],
      ["R507A", 0, 3, "5"], ["R134a", 0, 4, ""], ["R32", 0, 4, ""], ["R290", 0, 4, ""]];
    const SERIE = { "4": ["#fde3d3", ORANGE], "5": ["#dbe9f7", "#2f6fb8"] };
    const cartes = FL.map(([nom, s, k, serie], i) => {
      const x = 24 + (i % 4) * 236, y = i < 4 ? 205 : 420, cg = D.el("g", {}, grille); // y : place finale ; la rangée du haut est centrée tant que la seconde n'est pas là
      const bord = D.el("rect", { x: x, y: y, width: 222, height: 200, rx: 16, fill: "#fff", stroke: BLEU, "stroke-width": 3 }, cg);
      const pilule = D.el("rect", { x: x + 28, y: y + 10, width: 166, height: 52, rx: 14, fill: serie ? SERIE[serie][0] : "none" }, cg);
      const titre = txt(cg, x + 111, y + 48, nom, 38, NOIR, { "text-anchor": "middle" });
      const gx = x + 34, gy1 = y + 76, gy2 = y + 178, gw = 160, gh = gy2 - gy1 - 14;
      D.el("polyline", { points: pts([[gx, gy1], [gx, gy2], [gx + gw + 8, gy2]]), fill: "none", stroke: GRIS, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, cg);
      const P = [[0, 0.05], [0.30, 0.5 - s / 2], [0.68, 0.5 + s / 2], [1, 0.5 + s / 2 + 0.28]].map(([u, v]) => [gx + u * gw, gy2 - 8 - v * gh]);
      const courbeE = D.el("polyline", { fill: "none", stroke: s > 0.02 ? ORANGE : "#2f6fb8", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, cg);
      const long = P.slice(1).map((q, j) => Math.hypot(q[0] - P[j][0], q[1] - P[j][1])), tot = long.reduce((a, b) => a + b, 0);
      const partiel = f => { // le tracé jusqu'à la fraction f de sa longueur
        let reste = borne(f, 0, 1) * tot;
        const out = [P[0]];
        for (let j = 0; j < long.length && reste > 0; j++) { const e = Math.min(1, reste / long[j]); out.push([lerp(P[j][0], P[j + 1][0], e), lerp(P[j][1], P[j + 1][1], e)]); reste -= long[j]; }
        return out;
      };
      return { cg: cg, bord: bord, pilule: pilule, titre: titre, courbeE: courbeE, partiel: partiel, k: k, serie: serie, i: i, y: y };
    });
    const mots = [null, ["plusieurs degrés", "remplacent le R404A"], ["quasi azéotrope : à peine"], ["azéotrope : en pratique, pas de glissement"], ["corps purs : palier plat"]];
    const lignes = mots.map((l, k) => {
      if (!l) return null;
      const lg = D.el("g", {}, bande);
      l.forEach((s, j) => txt(lg, 480, l.length > 1 ? 690 + j * 48 : 708, s, j ? 38 : 42, j ? NOIR : ORANGE, { "text-anchor": "middle" }));
      return lg;
    });
    const gros = D.el("g", {}, bande);
    txt(gros, 30, 722, "4xx : zéotrope", 54, ORANGE); txt(gros, 940, 722, "5xx : azéotrope", 54, "#2f6fb8", { "text-anchor": "end" });
    return function (t) {
      const T = c.T, n = T.length;
      const sortie = 1 - lisse((t - (T[1] - 0.6)) / 0.4), haut = 125 * (1 - lisse((t - (T[3] - 0.3)) / 0.8));
      op(accueil, sortie);
      mila({ x: 480, y: 400 + Math.sin(t * 2.2) * 6, s: 1.2, t: t, temp: 0.1, etat: "liquide", humeur: "sourire", regard: [0, 0] });
      s32({ x: 330, y: 410 + Math.sin(t * 2 + 1) * 6, s: 1, t: t, humeur: "sourire" }); s125({ x: 630, y: 410 + Math.sin(t * 2 + 2) * 6, s: 1, t: t, humeur: "sourire" });
      op(legende, lisse((t - T[1]) / 0.5)); legende.setAttribute("transform", "translate(0 " + haut.toFixed(1) + ")");
      cartes.forEach(m => {
        const a = lisse((t - T[m.k]) / 0.5), act = t >= T[m.k] && t < (m.k + 1 < n ? T[m.k + 1] : c.D) && m.k < 5;
        m.cg.setAttribute("transform", "translate(0 " + ((1 - a) * 24 + (m.y < 300 ? haut : 0)).toFixed(1) + ")");
        op(m.cg, a * (t >= T[5] && !m.serie ? 0.4 : 1));
        m.courbeE.setAttribute("points", pts(m.partiel(lisse((t - c.A(m.k, 0.15) - (m.i % 4) * 0.15) / 1.6))));
        m.bord.setAttribute("stroke", act ? "#ff6b35" : BLEU); m.bord.setAttribute("stroke-width", act ? 8 : 3);
        const sur = m.serie && t >= c.A(5, 0.1);
        m.pilule.setAttribute("opacity", sur ? lisse((t - c.A(5, 0.1)) / 0.5).toFixed(2) : 0);
        m.titre.setAttribute("fill", sur ? SERIE[m.serie][1] : NOIR);
      });
      lignes.forEach((lg, k) => { if (lg) op(lg, fenetre(t, T[k], T[k + 1] - 0.05, 0.4)); });
      op(gros, lisse((t - c.A(5, 0.15)) / 0.5));
      return { temp: 0.1, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- 12 · le résumé : le glissement en quatre phrases ---------- */
  S.resume = function (g, c) {
    const XS = [22, 232, 442, 652], WS = [200, 200, 200, 298], Y = 330, H = 415;
    const mila = D.heroine(g, { r: 32 }), s32 = D.soeur(g, "R32", 26, 0.3), s125 = D.soeur(g, "R125", 26, 0.6);
    const pa = D.pastille(g, 480, 306, "en quatre phrases", ORANGE, 34, "middle");
    const cases = XS.map((x, i) => {
      const cg = D.el("g", {}, g), w = WS[i];
      const bord = D.el("rect", { x: x, y: Y, width: w, height: H, rx: 20, fill: "#fff", stroke: BLEU, "stroke-width": 4 }, cg);
      D.el("circle", { cx: x + 34, cy: Y + 36, r: 24, fill: BLEU }, cg);
      txt(cg, x + 34, Y + 48, String(i + 1), 32, "#fff", { "text-anchor": "middle" });
      return { cg: cg, bord: bord, x: x, w: w };
    });
    const centre = i => cases[i].x + cases[i].w / 2;
    const lignes = (i, l, y0, taille, coul) => l.forEach((s, j) => txt(cases[i].cg, centre(i), y0 + j * (taille + 8), s, taille, coul || NOIR, { "text-anchor": "middle" }));
    /* 1 · ça glisse : un petit graphique, une pente */
    {
      const x = cases[0].x, gx = x + 36, gy1 = Y + 90, gy2 = Y + 220, gw = 130, gh = gy2 - gy1 - 14;
      D.el("polyline", { points: pts([[gx, gy1], [gx, gy2], [gx + gw + 8, gy2]]), fill: "none", stroke: GRIS, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, cases[0].cg);
      D.el("polyline", { points: pts([[0, 0.05], [0.3, 0.3], [0.68, 0.74], [1, 0.98]].map(([u, v]) => [gx + u * gw, gy2 - 8 - v * gh])), fill: "none", stroke: ORANGE, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }, cases[0].cg);
      lignes(0, ["ça glisse"], Y + 296, 40);
      lignes(0, ["à pression", "constante"], Y + 338, 28, GRIS);
    }
    /* 2 · les pressées partent plus vite : des molécules qui quittent une nappe */
    const verre = { x: cases[1].x + 40, y: Y + 80, l: 120, h: 150 };
    D.el("path", { d: "M " + verre.x + " " + verre.y + " V " + (verre.y + verre.h - 18) + " Q " + verre.x + " " + (verre.y + verre.h) + " " + (verre.x + 18) + " " + (verre.y + verre.h) + " H " + (verre.x + verre.l - 18) + " Q " + (verre.x + verre.l) + " " + (verre.y + verre.h) + " " + (verre.x + verre.l) + " " + (verre.y + verre.h - 18) + " V " + verre.y, fill: "#eef4fa", stroke: "#7c8fa6", "stroke-width": 5, "stroke-linecap": "round" }, cases[1].cg);
    const dedans2 = ["R134a", "R32", "R134a", "R125", "R134a", "R134a"].map((s, i) => ({ m: D.petite(cases[1].cg, s), x: verre.x + 24 + (i % 3) * 36 + (i > 2 ? 14 : 0), y: verre.y + 110 + Math.floor(i / 3) * 30, ph: i * 1.7 }));
    const niveau2 = verre.y + verre.h - 70;
    const nappe2 = D.liquide(cases[1].cg, { x0: verre.x + 2, x1: verre.x + verre.l - 2, yh: verre.y, yb: verre.y + verre.h - 3, niveau: () => 0.46, couleur: () => LIQ, opacite: 0.42 });
    const partent = ["R32", "R125", "R32", "R125", "R134a"].map((s, i) => ({ m: D.petite(cases[1].cg, s), x: verre.x + 22 + i * 19, ph: i * 0.2 }));
    lignes(1, ["les pressées", "partent plus", "vite"], Y + 285, 28);
    /* 3 · bulle → rosée : un morceau de cloche, une isotherme penchée */
    D.loupe(cases[2].cg, { x: cases[2].x + 14, y: Y + 80, l: 172, h: 150, plageH: [185, 430], plageP: [4, 8.5], isobares: ["BP"], isos: ["isoM1", "isoP5"] });
    lignes(2, ["bulle", "→ rosée"], Y + 285, 34);
    /* 4 · la mesure : surchauffe, sous-refroidissement, charge */
    const b4 = bouteille(cases[3].cg, { cx: centre(3), y0: Y + 62, w: 78, h: 108, niveau: 0.42, temp: 0.3, valves: [0], graine: 17 });
    lignes(3, ["surchauffe → rosée", "sous-refroidissement", "→ bulle", "charge en liquide"], Y + 240, 30, NOIR);
    const diagTemp = w => courbe([[0, 0.08], [1, 0.1], [2, 0.2], [3, 0.62], [4, 0.5], [5, 0.46], [6, 0.42], [7, 0.08]], w, true);
    return function (t) {
      const T = c.T;
      mila({ x: 480, y: 208 + Math.sin(t * 2.2) * 5, s: 1, t: t, temp: 0.1, etat: "liquide", humeur: "sourire", regard: [0, 0] });
      s32({ x: 360, y: 214 + Math.sin(t * 2 + 1) * 5, s: 1, t: t, humeur: "sourire" }); s125({ x: 600, y: 214 + Math.sin(t * 2 + 2) * 5, s: 1, t: t, humeur: "sourire" });
      op(pa, fenetre(t, T[0], T[1] - 0.1, 0.4));
      cases.forEach((m, i) => {
        const k = i + 1, vu = lisse((t - T[k]) / 0.5), act = (t >= T[k] && t < T[k + 1]) || t >= T[5];
        m.cg.setAttribute("opacity", (0.28 + 0.72 * vu).toFixed(2));
        m.bord.setAttribute("stroke", act && t < T[5] ? "#ff6b35" : t >= T[5] ? VERT : BLEU); m.bord.setAttribute("stroke-width", act ? 8 : 4);
      });
      nappe2.maj(t);
      dedans2.forEach(o => o.m(o.x + Math.sin(t * 1.5 + o.ph) * 4, o.y + Math.sin(t * 2.2 + o.ph) * 4, 1, 8));
      partent.forEach(o => {
        const f = frac(t * 0.35 + o.ph), y = niveau2 - 8 - f * 90;
        o.m(o.x + Math.sin(t * 2 + o.ph * 9) * 5, y, fenetre(f, 0, 1, 0.2), 8);
      });
      b4.maj(t, MELANGE, MELANGE, 0);
      const w = 7 * borne((t - T[5]) / (c.E[5] - T[5]), 0, 1), r = { temp: 0.1, etat: "liquide", humeur: "sourire" };
      if (t >= T[5]) {
        r.diag = w; r.diag0 = 0; r.temp = diagTemp(w);
        r.etat = w < 1 ? "bout" : w < 4 ? "vapeur" : w < 5 ? "bout" : "liquide";
        r.humeur = w > 2 && w < 3.8 ? "chaud" : "sourire";
      }
      return r;
    };
  };
})();
