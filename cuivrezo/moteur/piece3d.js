/* CuivRézo — <cuivre-3d> : la pièce de cuivre en 3D, autonome (Three.js chargé à la demande).
   <cuivre-3d piece="coude90|chapeau|baionnette|dudgeon|emboiture" angle="…"></cuivre-3d>

   GÉOMÉTRIE (exacte, en millimètres) : un tube creux (paroi mince) suit un chemin calculé, droite + arc de
   rayon Rc + droite. Le cintrage CONSERVE la matière : le tube garde sa longueur, l'arc en consomme Rc × angle.
   Les pièces reposent à plat sur l'établi (le contrôle de planéité de la station).
   ATTRIBUTS (tous facultatifs)
     angle        coude90 : angle du coude 0-90° · chapeau, baionnette, emboiture : avancement 0-90 (= 0-100 %)
                  dudgeon : demi-angle de l'évasement 0-45°
     diametre     diamètre extérieur du tube, mm (défaut 15,88 ; 12,7 pour dudgeon et emboiture)
     rc           rayon de cintrage à l'axe, mm (défaut 45)
     cote, cote2  coude90 : cotes à l'axe, côté L (gauche) et côté R (droit) ; défaut 300 et 300
     central      chapeau : angle du coude central, degrés (défaut 90 ; les coudes A et B font la moitié)
     hauteur      chapeau : hauteur H d'axe à axe (défaut 70) · obstacle : diamètre de l'obstacle (défaut 36)
     decalage     baionnette : décalage d'axe à axe (défaut 70) · angle-coude : angle des coudes (défaut 45)
     profondeur   emboiture : profondeur de l'emboîture (défaut = 1 diamètre)
     coupe        dudgeon, emboiture : vue en coupe (défaut : oui ; coupe="non" pour la pièce entière)
     sans-controles   cache la barre (curseur, boutons)
   REPLI : sans WebGL ou sans réseau, la figure SVG de la station (CuivFigures) prend la place. */
(() => {
  'use strict';
  if (!window.customElements || customElements.get('cuivre-3d')) return;

  const SRC = (document.currentScript && document.currentScript.src) || '';
  const CSS = SRC ? SRC.replace(/piece3d\.js/, 'piece3d.css') : '';
  const THREE_URLS = [
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js'
  ];
  let promesseThree = null;
  const chargerThree = () => promesseThree || (promesseThree = (async () => {
    let derniere;
    for (const u of THREE_URLS) { try { return await import(u); } catch (e) { derniere = e; } }
    throw derniere;
  })());

  const D2R = Math.PI / 180, TAU = Math.PI * 2;
  const ORANGE = '#c9451a', NAVY = '#1b3a63', GRIS = '#56657a';
  const num = (v, d) => { const x = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(x) ? x : d; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const eco = (x, a, b) => clamp((x - a) / (b - a), 0, 1);
  const mm = x => Math.round(x) + ' mm';

  /* =================================================================================
     1. GÉOMÉTRIE DU CHEMIN : droites et arcs, dans le plan (u = droite, v = vers le fond).
        Le monde : x = u, z = −v, y = hauteur. Vue de dessus : u à droite, v vers le haut.
     ================================================================================= */
  function chaine(R, bends, Ltot, y, N) {
    const rings = [], arcs = [];
    let u = 0, v = 0, h = 0, s = 0;
    const ring = () => rings.push({ x: u, y, z: -v, tx: Math.cos(h), tz: -Math.sin(h), s });
    ring();
    for (const b of bends) {
      const al = R * Math.abs(b.phi), s0 = b.anchor === 'mid' ? b.s - al / 2 : b.s;
      const l = Math.max(0, s0 - s);
      u += l * Math.cos(h); v += l * Math.sin(h); s += l; ring();
      const h0 = h, u0 = u, v0 = v, sg = b.phi < 0 ? -1 : 1;
      const cu = u0 - sg * R * Math.sin(h0), cv = v0 + sg * R * Math.cos(h0);
      const tg = R * Math.tan(Math.abs(b.phi) / 2), s00 = s;
      for (let k = 1; k <= N; k++) {
        const hh = h0 + b.phi * k / N;
        u = cu + sg * R * Math.sin(hh); v = cv - sg * R * Math.cos(hh); s = s00 + al * k / N; h = hh; ring();
      }
      arcs.push({ h0, h1: h, phi: b.phi, R, cu, cv, start: { u: u0, v: v0, s: s00 }, end: { u, v, s },
        V: { u: u0 + tg * Math.cos(h0), v: v0 + tg * Math.sin(h0) }, sg });
    }
    const l = Math.max(0, Ltot - s);
    u += l * Math.cos(h); v += l * Math.sin(h); s += l; ring();
    const at = sm => {
      let i = 0;
      while (i < rings.length - 2 && rings[i + 1].s < sm) i++;
      const a = rings[i], b = rings[i + 1], k = b.s > a.s ? clamp((sm - a.s) / (b.s - a.s), 0, 1) : 0;
      return { x: a.x + (b.x - a.x) * k, y, z: a.z + (b.z - a.z) * k, tx: b.tx, tz: b.tz };
    };
    return { rings, arcs, at, fin: { u, v, h }, Ltot };
  }
  const uv2w = (p, y) => [p[0], y == null ? 0 : y, -p[1]];

  /* la paroi : anneaux extérieur / intérieur alignés, et les deux tranches du bout */
  const paroi = (rings, r, w) => rings.map(q => Object.assign({}, q, { r: r - w }));
  const ext = (rings, r) => rings.map(q => Object.assign({}, q, { r }));

  /* =================================================================================
     2. LES PIÈCES : chaque constructeur rend un « modèle » (surfaces, repères, cotes, étiquettes)
     ================================================================================= */
  const Y = 0.25;   /* hauteur des cotes peintes sur l'établi */
  class Cotes {     /* rubans plats posés sur l'établi, en un seul maillage */
    constructor(T, k) { this.T = T; this.k = k || 1; this.Y = Y; this.p = []; this.c = []; this.cache = {}; }
    col(h) { return this.cache[h] || (this.cache[h] = new this.T.Color(h)); }
    tri(a, b, c, h) { const k = this.col(h); for (const q of [a, b, c]) { this.p.push(q[0], this.Y, -q[1]); this.c.push(k.r, k.g, k.b); } }
    seg(a, b, w, h) {
      w *= this.k * 1.6;
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * w / 2, ny = dx / L * w / 2;
      const A = [a[0] + nx, a[1] + ny], B = [b[0] + nx, b[1] + ny], C = [b[0] - nx, b[1] - ny], D = [a[0] - nx, a[1] - ny];
      this.tri(A, B, C, h); this.tri(A, C, D, h);
    }
    tirets(a, b, w, h, d = 7, g = 5) {
      d *= this.k; g *= this.k;
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 1e-6) return;
      for (let t = 0; t < L; t += d + g) { const t2 = Math.min(L, t + d);
        this.seg([a[0] + dx * t / L, a[1] + dy * t / L], [a[0] + dx * t2 / L, a[1] + dy * t2 / L], w, h); }
    }
    fleche(tip, dir, len, wid, h) {
      len *= this.k; wid *= this.k;
      const L = Math.hypot(dir[0], dir[1]) || 1, ux = dir[0] / L, uy = dir[1] / L;
      const bx = tip[0] - ux * len, by = tip[1] - uy * len;
      this.tri(tip, [bx - uy * wid, by + ux * wid], [bx + uy * wid, by - ux * wid], h);
    }
    cote(a, b, w, h) {   /* ligne de cote à deux flèches */
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 6 * this.k) return;
      const ux = dx / L, uy = dy / L;
      this.seg(a, b, w, h); this.fleche(a, [-ux, -uy], 5.5, 2.2, h); this.fleche(b, [ux, uy], 5.5, 2.2, h);
    }
    arc(c, R, a0, a1, w, h) {
      const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 0.07));
      for (let i = 0; i < n; i++) {
        const t0 = a0 + (a1 - a0) * i / n, t1 = a0 + (a1 - a0) * (i + 1) / n;
        this.seg([c[0] + R * Math.cos(t0), c[1] + R * Math.sin(t0)], [c[0] + R * Math.cos(t1), c[1] + R * Math.sin(t1)], w, h);
      }
    }
    disque(c, R, h) { R *= this.k; const n = 14; for (let i = 0; i < n; i++)
      this.tri(c, [c[0] + R * Math.cos(TAU * i / n), c[1] + R * Math.sin(TAU * i / n)], [c[0] + R * Math.cos(TAU * (i + 1) / n), c[1] + R * Math.sin(TAU * (i + 1) / n)], h); }
    croix(c, R, w, h) { R *= this.k; this.seg([c[0] - R, c[1] - R], [c[0] + R, c[1] + R], w, h); this.seg([c[0] - R, c[1] + R], [c[0] + R, c[1] - R], w, h); }
  }
  const perp = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  const add = (p, d, k) => [p[0] + d[0] * k, p[1] + d[1] * k];

  /* occupation écran : la capsule d'un tronçon de tube (pour que les étiquettes ne le recouvrent jamais) */
  function occChaine(rings, r, pas) {
    const o = [];
    for (let i = 0; i < rings.length - 1; i += pas) {
      const j = Math.min(rings.length - 1, i + pas);
      o.push({ a: [rings[i].x, rings[i].y, rings[i].z], b: [rings[j].x, rings[j].y, rings[j].z], rad: r });
    }
    return o;
  }
  function lipsChemin(rings, r, w, a0, a1) {
    const A = rings[0], B = rings[rings.length - 1];
    return [
      { id: 'l0', rings: [Object.assign({}, A, { r: r - w }), Object.assign({}, A, { r })], inward: false, mat: 'cu', a0, a1, lip: true },
      { id: 'l1', rings: [Object.assign({}, B, { r }), Object.assign({}, B, { r: r - w })], inward: false, mat: 'cu', a0, a1, lip: true }
    ];
  }
  function surfacesChemin(rings, r, w, coupe) {
    const a0 = coupe ? Math.PI : 0, a1 = coupe ? TAU : TAU;
    return [
      { id: 'ext', rings: ext(rings, r), inward: false, mat: 'cu', a0, a1 },
      { id: 'int', rings: paroi(rings, r, w), inward: true, mat: 'cuIn', a0, a1 },
      ...lipsChemin(rings, r, w, a0, a1)
    ];
  }
  function marque(ch, s) { const p = ch.at(s); return { x: p.x, y: p.y, z: p.z, tx: p.tx, tz: p.tz }; }

  /* ---------- coude à 90° (droite + arc + droite), la cote à l'axe vit ---------- */
  function coude90(P, val) {
    const R = P.rc, r = P.d / 2, w = P.wall, th = clamp(val, 0, 90) * D2R;
    const a = P.cote - R, b90 = P.cote2 - R;
    const Ltot = a + b90 + R * Math.PI / 2;
    const ch = chaine(R, [{ s: a, phi: th, anchor: 'start' }], Ltot, r, 40);
    const A = ch.arcs[0], k = P.k, q = new Cotes(P.T, k), gap = r + 26 * k;
    const dirL = [1, 0], dirR = [Math.cos(th), Math.sin(th)];
    const nL = [0, -1], nR = [dirR[1], -dirR[0]];
    const V = [A.V.u, A.V.v], S = [A.start.u, A.start.v], E = [A.end.u, A.end.v], F = [ch.fin.u, ch.fin.v];
    const cL = V[0], cR = Math.hypot(F[0] - V[0], F[1] - V[1]);
    /* les axes prolongés jusqu'au point de rencontre V */
    if (th > 0.02) { q.tirets(S, V, 1.3, GRIS); q.tirets(E, V, 1.3, GRIS); q.croix(V, 3.2, 1.6, ORANGE); }
    /* cote L (bout gauche → V) et cote R (bout droit → V), côté extérieur */
    const l0 = add([0, 0], nL, gap), l1 = add(V, nL, gap);
    q.cote(l0, l1, 1.5, ORANGE);
    q.seg(add([0, 0], nL, r + 4 * k), add([0, 0], nL, gap + 7 * k), 1.1, ORANGE); q.seg(add(V, nL, 3 * k), add(V, nL, gap + 7 * k), 1.1, ORANGE);
    const r0 = add(F, nR, gap), r1 = add(V, nR, gap);
    q.cote(r0, r1, 1.5, ORANGE);
    q.seg(add(F, nR, r + 4 * k), add(F, nR, gap + 7 * k), 1.1, ORANGE); q.seg(add(V, nR, 3 * k), add(V, nR, gap + 7 * k), 1.1, ORANGE);
    /* le rayon Rc, du centre à l'axe */
    const mid = A.h0 + A.phi / 2, C = [A.cu, A.cv], M = [C[0] + R * Math.sin(mid), C[1] - R * Math.cos(mid)];
    q.seg(C, M, 1.5, GRIS); q.disque(C, 2.4, GRIS);
    /* l'angle du coude, autour de V, du côté extérieur */
    const rho = Math.max(52 * k, R * 1.35);
    if (th > 0.05) q.arc(V, rho, 0, th, 1.5, ORANGE);
    const y = r, Vm = uv2w(V, Y);
    const lab = [
      { id: '0', text: '0', g: 1, p: uv2w(S, y + r * 0.2), dir: [-0.3, 1], note: 'le trait, posé sur le zéro' },
      { id: 'rc', text: 'Rc', g: 1, p: uv2w([(C[0] + M[0]) / 2, (C[1] + M[1]) / 2], Y), dir: [-1, 0.6] },
      { id: 'L', text: (P.cintrette ? 'Branche : ' : 'L : ') + mm(cL), g: 1, p: uv2w(add(add([0, 0], nL, gap), dirL, cL / 2), Y), dir: [0, 1] },
      { id: 'R', text: (P.cintrette ? 'Branche : ' : 'R : ') + mm(cR), g: 1, p: uv2w(add(add(F, nR, gap), perp(F, V), cR / 2), Y), dir: [nR[0], -nR[1]] }
    ];
    if (th > 0.05) lab.push({ id: 'ang', text: Math.round(val) + '°', g: 1, p: uv2w([V[0] + rho * Math.cos(th / 2), V[1] + rho * Math.sin(th / 2)], Y), dir: [Math.cos(th / 2), -Math.sin(th / 2)] });
    return {
      surfaces: surfacesChemin(ch.rings, r, w, false), cotes: q, labels: lab,
      marques: [marque(ch, a - 1.2)], occ: occChaine(ch.rings, r + 2, 2), rings: ch.rings, marge: 60,
      legende: P.cintrette
        ? (th < 89.5 * D2R
          ? 'À ' + Math.round(val) + '°, la branche mesure ' + mm(cL) + ' à l’axe : elle n’atteint ' + mm(P.cote) + ' qu’à 90°.'
          : 'À 90° : ' + mm(P.cote) + ' à l’axe. Le trait était à ' + mm(P.cote) + ' moins Rc du bout : Rc se mesure sur votre cintrette.')
        : th < 89.5 * D2R
        ? 'À ' + Math.round(val) + '°, la cote à l’axe vaut ' + mm(cL) + ' côté L : elle n’atteint ' + mm(P.cote) + ' qu’à 90°.'
        : 'À 90° : ' + mm(P.cote) + ' côté L, ' + mm(P.cote2) + ' côté R. Le trait est à ' + mm(a) + ' du bout : la cote moins le rayon.'
    };
  }

  /* ---------- le chapeau de gendarme : trois coudes (A, central, B), symétriques ---------- */
  function chapeauChaine(P, X, cent, ab) {
    const R = P.rc, E = 110, r = P.d / 2;
    return chaine(R, [
      { s: E, phi: ab, anchor: 'mid' }, { s: E + X, phi: -cent, anchor: 'mid' }, { s: E + 2 * X, phi: ab, anchor: 'mid' }
    ], 2 * E + 2 * X, r, 40);
  }
  function chapeauX(P) {
    const th = P.central * D2R; let lo = 0.75 * P.rc * th + 4, hi = 600;
    const H = X => { const c = chapeauChaine(P, X, th, th / 2); return Math.max(...c.rings.map(q => -q.z)); };
    if (H(lo) >= P.hauteur) return lo;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (H(m) < P.hauteur) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function chapeau(P, val) {
    const r = P.d / 2, w = P.wall, th = P.central * D2R, p = clamp(val / 90, 0, 1);
    if (P.X == null) P.X = chapeauX(P);
    const X = P.X, cent = th * eco(p, 0, 0.6), ab = th / 2 * eco(p, 0.6, 1);
    const ch = chapeauChaine(P, X, cent, ab), fin = chapeauChaine(P, X, th, th / 2);
    const A = ch.arcs[0], Cc = ch.arcs[1], B = ch.arcs[2];
    const k = P.k, q = new Cotes(P.T, k), y = r;
    /* l'axe du tube tout droit, en tirets, et la hauteur H de l'axe du chapeau à cet axe */
    const uFin = fin.fin.u, apex = Math.max(...fin.rings.map(t => -t.z));
    const uC = fin.arcs[1].start.u + (fin.arcs[1].end.u - fin.arcs[1].start.u) / 2;
    q.tirets([-10 * k, 0], [uFin + 34 * k, 0], 1.3, GRIS);
    let lab = [];
    if (p > 0.995) {
      const uD = uFin + 26 * k, top = apex;
      q.tirets([uC + 4 * k, top], [uD + 6 * k, top], 1.2, GRIS);
      q.cote([uD, 0], [uD, top], 1.5, ORANGE);
      lab.push({ id: 'H', text: 'H : ' + mm(P.hauteur), g: 1, p: uv2w([uD, top / 2], Y), dir: [1, 0] });
      /* l'angle du coude central */
      const Vc = [Cc.V.u, Cc.V.v], rho = 48 * k;
      const a0 = Cc.h0 + Math.PI / 2 * 0, a1 = Cc.h1;
      q.arc(Vc, rho, a1, a0, 1.5, ORANGE);
      lab.push({ id: 'ang', text: Math.round(P.central) + '°', g: 1, p: uv2w([Vc[0] + rho * Math.cos((a0 + a1) / 2), Vc[1] + rho * Math.sin((a0 + a1) / 2)], Y), dir: [0, -1] });
    }
    const sA = 110, sC = 110 + X, sB = 110 + 2 * X;
    lab.push({ id: 'A', text: 'A', g: 1, p: [ch.at(sA).x, y, ch.at(sA).z], dir: [-0.5, 1] },
      { id: 'axe', text: 'Axe', g: 1, p: [ch.at(sC).x, y, ch.at(sC).z], dir: [0, -1] },
      { id: 'B', text: 'B', g: 1, p: [ch.at(sB).x, y, ch.at(sB).z], dir: [0.5, 1] });
    lab.push({ id: 'obst', text: 'Obstacle', g: 0, p: [uC, P.obst > 0 ? 44 : 0, 0], dir: [-1, 0.4] });
    return {
      surfaces: surfacesChemin(ch.rings, r, w, false), cotes: q, labels: lab,
      marques: [marque(ch, sA), marque(ch, sC), marque(ch, sB)],
      occ: occChaine(ch.rings, r + 2, 2), rings: ch.rings, marge: 50,
      statique: { obstacle: { x: uC, r: P.obst / 2 } },
      legende: 'Coude central : ' + Math.round(cent / D2R) + '° · coudes A et B : ' + Math.round(ab / D2R) + '° chacun.'
    };
  }

  /* ---------- la baïonnette : deux coudes égaux en sens opposés ---------- */
  function baionChaine(P, M, a1, a2) {
    const E = 100, r = P.d / 2;
    return chaine(P.rc, [{ s: E, phi: a1, anchor: 'mid' }, { s: E + M, phi: -a2, anchor: 'mid' }], 2 * E + M, r, 40);
  }
  function baionM(P) {
    const al = P.ang * D2R; let lo = P.rc * al + 1, hi = 1000;
    const off = M => -baionChaine(P, M, al, al).rings[baionChaine(P, M, al, al).rings.length - 1].z;
    if (off(lo) >= P.decalage) return lo;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (off(m) < P.decalage) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function baionnette(P, val) {
    const r = P.d / 2, w = P.wall, al = P.ang * D2R, p = clamp(val / 90, 0, 1);
    if (P.M == null) P.M = baionM(P);
    const a1 = al * eco(p, 0, 0.5), a2 = al * eco(p, 0.5, 1);
    const ch = baionChaine(P, P.M, a1, a2), k = P.k, q = new Cotes(P.T, k);
    const A = ch.arcs[0], B = ch.arcs[1], y = r;
    let lab = [];
    const e = ch.fin.v;
    q.tirets([-10 * k, 0], [ch.fin.u + 30 * k, 0], 1.3, GRIS);
    if (p > 0.995) {
      q.tirets([28 * k, e], [ch.fin.u + 30 * k, e], 1.3, GRIS);
      q.cote([26 * k, 0], [26 * k, e], 1.5, ORANGE);
      lab.push({ id: 'dec', text: 'Décalage : ' + mm(e), g: 1, p: uv2w([26 * k, e / 2], Y), dir: [-1, 0.2] });
    }
    const arc = (Ar, id, sgn) => {
      if (Math.abs(Ar.phi) < 0.05) return;
      const Vv = [Ar.V.u, Ar.V.v], rho = 46 * k, a0 = Ar.h0, a1_ = Ar.h1;
      q.arc(Vv, rho, a0, a1_, 1.5, ORANGE);
      lab.push({ id, text: Math.round(Math.abs(Ar.phi) / D2R) + '°', g: 1, p: uv2w([Vv[0] + rho * Math.cos((a0 + a1_) / 2), Vv[1] + rho * Math.sin((a0 + a1_) / 2)], Y), dir: [Math.cos((a0 + a1_) / 2), -Math.sin((a0 + a1_) / 2)] });
    };
    arc(A, 'a1', 1); arc(B, 'a2', -1);
    lab.push({ id: 'c1', text: 'Coude 1', g: 0, p: [ch.at(100).x, y, ch.at(100).z], dir: [-0.6, 1] },
      { id: 'c2', text: 'Coude 2', g: 0, p: [ch.at(100 + P.M).x, y, ch.at(100 + P.M).z], dir: [0.6, -1] });
    return {
      surfaces: surfacesChemin(ch.rings, r, w, false), cotes: q, labels: lab,
      marques: [marque(ch, 100), marque(ch, 100 + P.M)],
      occ: occChaine(ch.rings, r + 2, 2), rings: ch.rings, marge: 50,
      legende: 'Coude 1 : ' + Math.round(a1 / D2R) + '° · coude 2 (en sens inverse) : ' + Math.round(a2 / D2R) + '°.'
    };
  }

  /* ---------- pièces de révolution, à plat sur l'établi, axe le long de x ---------- */
  const anneau = (x, yc, r) => ({ x, y: yc, z: 0, tx: 1, tz: 0, r, s: x });
  const finiCoupe = (P, ext_, int_) => P.coupe ? [{ outer: ext_, inner: int_ }] : [];

  function dudgeon(P, val) {
    const r = P.d / 2, w = P.wall, al = clamp(val, 0, 45) * D2R, rf = 2.6, lc = 6.5, yc = r + 5;
    const ext_ = [anneau(-62, yc, r), anneau(0, yc, r)], g = [0, 0];
    const K = 12;
    for (let k = 1; k <= K; k++) { const be = al * k / K; ext_.push(anneau(rf * Math.sin(be), yc, r + rf * (1 - Math.cos(be)))); g.push(be); }
    const L = ext_[ext_.length - 1];
    ext_.push(anneau(L.x + lc * Math.cos(al), yc, L.r + lc * Math.sin(al))); g.push(al);
    /* l'intérieur : la même paroi, décalée de son épaisseur le long de la normale */
    const int_ = ext_.map((q, i) => { const gg = g[i] || 0; return anneau(q.x + w * Math.sin(gg), yc, q.r - w * Math.cos(gg)); });
    const a0 = P.coupe ? Math.PI : 0;
    const surfaces = [
      { id: 'ext', rings: ext_, inward: false, mat: 'cu', a0, a1: TAU },
      { id: 'int', rings: int_, inward: true, mat: 'cuIn', a0, a1: TAU },
      { id: 'l0', rings: [int_[0], ext_[0]], inward: false, mat: 'cu', a0, a1: TAU, lip: true },
      { id: 'l1', rings: [ext_[ext_.length - 1], int_[int_.length - 1]], inward: false, mat: 'cu', a0, a1: TAU, lip: true }
    ];
    const k = P.k, q = new Cotes(P.T, k); if (P.coupe) q.Y = yc + 0.08;
    /* l'angle, lu depuis le sommet du cône : l'axe et la génératrice */
    const lab = [];
    const xf = 0, rEnd = L.r + lc * Math.sin(al), xEnd = ext_[ext_.length - 1].x;
    const xv = al > 0.05 ? (ext_[ext_.length - 2].x) - (ext_[ext_.length - 2].r) / Math.tan(al) : 0;
    if (P.coupe && al > 0.06) {
      const V = [xv, 0], ray = 26 * k, fin = xEnd + 16 * k;
      q.tirets([xv - 6 * k, 0], [fin, 0], 1.0, GRIS);
      q.tirets(V, [V[0] + (fin - xv), (fin - xv) * Math.tan(al)], 1.0, GRIS);
      q.arc(V, ray, 0, al, 1.3, ORANGE);
      lab.push({ id: 'ang', text: Math.round(val) + '°', g: 1, p: [V[0] + ray * Math.cos(al / 2), yc, -(V[1] + ray * Math.sin(al / 2))], dir: [0.6, 1] });
    }
    lab.push({ id: 'tube', text: 'Tube', g: 0, p: [-52, yc, 0], dir: [0, 1] },
      { id: 'ecrou', text: 'Écrou', g: 0, p: [-25, yc + r + 4, 0], dir: [0, -1] },
      { id: 'cone', text: 'Cône évasé', g: 0, p: [xEnd, yc, -rEnd], dir: [1, 0.5] });
    return {
      surfaces, caps: finiCoupe(P, ext_, int_), cotes: q, labels: lab, marques: [],
      occ: [{ a: [-62, yc, 0], b: [4, yc, 0], rad: r + 1 }, { a: [-30, yc, 0], b: [-18, yc, 0], rad: r + 8 }, { a: [2, yc, 0], b: [xEnd, yc, 0], rad: rEnd }],
      rings: ext_, marge: 22, yAxe: yc,
      legende: 'Évasement : ' + Math.round(val) + '° sur 45° visés. Le cône est lisse, l’écrou est enfilé avant.'
    };
  }

  function emboiture(P, val) {
    const r = P.d / 2, w = P.wall, p = clamp(val / 90, 0, 1), g = 0.2, rs = r + g + w, sh = 3.5, D = P.profondeur, yc = rs + 1;
    const xe = sh + D;
    const eA = [anneau(-40, yc, r), anneau(0, yc, r), anneau(sh, yc, rs), anneau(xe, yc, rs)];
    const iA = [anneau(-40, yc, r - w), anneau(0, yc, r - w), anneau(sh, yc, r + g), anneau(xe, yc, r + g)];
    const lead = sh + (xe + 20 - sh) * (1 - p) + 0.001;
    const eB = [anneau(lead, yc, r), anneau(lead + 56, yc, r)], iB = [anneau(lead, yc, r - w), anneau(lead + 56, yc, r - w)];
    const a0 = P.coupe ? Math.PI : 0;
    const S = (id, rings, inward, mat, lip) => ({ id, rings, inward, mat, a0, a1: TAU, lip });
    const surfaces = [
      S('Aext', eA, false, 'cu'), S('Aint', iA, true, 'cuIn'),
      S('Al0', [iA[0], eA[0]], false, 'cu', 1), S('Al1', [eA[3], iA[3]], false, 'cu', 1),
      S('Bext', eB, false, 'cu'), S('Bint', iB, true, 'cuIn'),
      S('Bl0', [iB[0], eB[0]], false, 'cu', 1), S('Bl1', [eB[1], iB[1]], false, 'cu', 1)
    ];
    const k = P.k, q = new Cotes(P.T, k), zc = rs + 18 * k;
    q.cote([sh, -zc], [xe, -zc], 1.5, ORANGE);
    q.seg([sh, -rs - 3 * k], [sh, -zc - 6 * k], 1.1, ORANGE); q.seg([xe, -rs - 3 * k], [xe, -zc - 6 * k], 1.1, ORANGE);
    const lab = [
      { id: 'prof', text: 'Profondeur', g: 1, p: [(sh + xe) / 2, Y, zc], dir: [0, 1] },
      { id: 'elarg', text: 'Bout élargi', g: 0, p: [(sh + xe) / 2, yc + rs, 0], dir: [-0.3, 1] },
      { id: 'tubeB', text: 'Tube qui entre', g: 0, p: [lead + 46, yc + r, 0], dir: [0.4, 1] },
      { id: 'tubeA', text: 'Tube élargi', g: 0, p: [-32, yc + r, 0], dir: [-0.2, 1] }
    ];
    return {
      surfaces, caps: P.coupe ? [{ outer: eA, inner: iA }, { outer: eB, inner: iB }] : [],
      cotes: q, labels: lab, marques: [],
      occ: [{ a: [-40, yc, 0], b: [xe, yc, 0], rad: rs }, { a: [lead, yc, 0], b: [lead + 56, yc, 0], rad: r }],
      rings: eA.concat(eB), marge: 26, yAxe: yc,
      legende: p > 0.99 ? 'Le tube entre à fond, avec un jeu de quelques dixièmes de millimètre.' : 'Le tube entre : ' + Math.round(p * 100) + ' %.'
    };
  }

  const PIECES = {
    coude90: { build: coude90, def: 90, min: 0, max: 90, lib: 'Angle', fmt: v => Math.round(v) + '°', jouer: 'Cintrer',
      desc: 'Un coude à 90° dans un tube de cuivre, vu en trois dimensions.', dessus: true },
    chapeau: { build: chapeau, def: 90, min: 0, max: 90, lib: 'Cintrage', fmt: v => Math.round(v / 0.9) + ' %', jouer: 'Cintrer',
      desc: 'Un chapeau de gendarme : trois coudes qui contournent un obstacle.', dessus: true },
    baionnette: { build: baionnette, def: 90, min: 0, max: 90, lib: 'Cintrage', fmt: v => Math.round(v / 0.9) + ' %', jouer: 'Cintrer',
      desc: 'Une baïonnette : deux coudes égaux, en sens opposés, qui décalent l’axe du tube.', dessus: true },
    dudgeon: { build: dudgeon, def: 45, min: 0, max: 45, lib: 'Évasement', fmt: v => Math.round(v) + '°', jouer: 'Évaser',
      desc: 'Un dudgeon : le bout du tube évasé à 45°, l’écrou enfilé avant.', coupe: true },
    emboiture: { build: emboiture, def: 90, min: 0, max: 90, lib: 'Le tube entre', fmt: v => Math.round(v / 0.9) + ' %', jouer: 'Emboîter',
      desc: 'Une emboîture : un bout de tube élargi qui reçoit un autre tube.', coupe: true }
  };
  const REPLI = { coude90: ['coude', ''], chapeau: ['chapeau', 'plan'], baionnette: ['baionnette', 'plan'], dudgeon: ['dudgeon', 'controle'], emboiture: ['emboiture', 'profil'] };

  function lireParams(el, nom) {
    const dDef = nom === 'dudgeon' || nom === 'emboiture' ? 12.7 : 15.88;
    const d = num(el.getAttribute('diametre'), dDef);
    const cote = num(el.getAttribute('cote'), 300);
    return {
      d, wall: Math.max(0.6, d * 0.06), rc: num(el.getAttribute('rc'), 45),
      cote, cote2: num(el.getAttribute('cote2'), cote),
      /* une seule cote donnée = la cintrette (station 1.4) : pas de repères L/R, et Rc jamais chiffré — il se mesure sur l'outil */
      cintrette: !el.hasAttribute('cote2'),
      central: clamp(num(el.getAttribute('central'), 90), 30, 120),
      hauteur: nom === 'chapeau' ? num(el.getAttribute('hauteur'), 70) : 0,
      obst: nom === 'chapeau' ? num(el.getAttribute('obstacle'), 36) : 0,
      decalage: num(el.getAttribute('decalage'), 70), ang: clamp(num(el.getAttribute('angle-coude'), 45), 10, 80),
      profondeur: num(el.getAttribute('profondeur'), d),
      k: ({ coude90: Math.max(cote, num(el.getAttribute('cote2'), cote)) * 1.6, chapeau: 330, baionnette: 330, dudgeon: 100, emboiture: 110 }[nom]) / 450,
      coupe: (PIECES[nom].coupe && el.getAttribute('coupe') !== 'non')
    };
  }

  /* =================================================================================
     3. LES SURFACES (Three.js) : bande d'anneaux, sections, tranches de coupe
     ================================================================================= */
  function creerBande(T, n, m) {
    const g = new T.BufferGeometry(), c = n * (m + 1);
    g.setAttribute('position', new T.BufferAttribute(new Float32Array(c * 3), 3));
    g.setAttribute('normal', new T.BufferAttribute(new Float32Array(c * 3), 3));
    g.setAttribute('uv', new T.BufferAttribute(new Float32Array(c * 2), 2));
    g._n = n; g._m = m; g._idx = null;
    return g;
  }
  function indexer(g, inward) {
    const n = g._n, m = g._m, idx = [];
    for (let i = 0; i < n - 1; i++) for (let j = 0; j < m; j++) {
      const a = i * (m + 1) + j, b = (i + 1) * (m + 1) + j, c = b + 1, d = a + 1;
      if (inward) idx.push(a, d, b, b, d, c); else idx.push(a, b, d, b, c, d);
    }
    g.setIndex(idx);
  }
  function remplir(g, rings, a0, a1, inward) {
    const n = g._n, m = g._m, pos = g.attributes.position.array, nor = g.attributes.normal.array, uv = g.attributes.uv.array;
    let k = 0, ku = 0;
    for (let i = 0; i < n; i++) {
      const q = rings[i], q0 = rings[Math.max(0, i - 1)], q1 = rings[Math.min(n - 1, i + 1)];
      const ds = (q1.x - q0.x) * q.tx + (q1.z - q0.z) * q.tz, dr = q1.r - q0.r, len = Math.hypot(ds, dr);
      const n0 = len > 1e-6 ? -dr / len : 0, n1 = len > 1e-6 ? ds / len : 1;
      const Nx = -q.tz, Nz = q.tx, sg = inward ? -1 : 1;
      for (let j = 0; j <= m; j++) {
        const a = a0 + (a1 - a0) * j / m, ca = Math.cos(a), sa = Math.sin(a);
        const rx = ca * Nx, ry = sa, rz = ca * Nz;
        pos[k] = q.x + q.r * rx; pos[k + 1] = q.y + q.r * ry; pos[k + 2] = q.z + q.r * rz;
        nor[k] = sg * (n0 * q.tx + n1 * rx); nor[k + 1] = sg * (n1 * ry); nor[k + 2] = sg * (n0 * q.tz + n1 * rz);
        uv[ku] = j / m; uv[ku + 1] = q.s / 46; k += 3; ku += 2;
      }
    }
    g.attributes.position.needsUpdate = true; g.attributes.normal.needsUpdate = true; g.attributes.uv.needsUpdate = true;
  }
  /* la tranche d'une coupe : la paroi vue en section, à plat */
  function geoCaps(T, caps, m) {
    const pos = [], nor = [];
    for (const { outer, inner } of caps) for (const ang of [Math.PI, TAU]) {
      const ca = Math.cos(ang);
      const P = (q, r) => [q.x + r * ca * (-q.tz), q.y, q.z + r * ca * q.tx];
      for (let i = 0; i < outer.length - 1; i++) {
        const a = P(outer[i], outer[i].r), b = P(outer[i + 1], outer[i + 1].r), c = P(inner[i + 1], inner[i + 1].r), d = P(inner[i], inner[i].r);
        for (const t of [a, b, c, a, c, d]) { pos.push(t[0], t[1], t[2]); nor.push(0, 1, 0); }
      }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
    return g;
  }

  /* l'environnement d'atelier : un local sombre et tiède, trois boîtes à lumière (haut, gauche chaude, droite froide) */
  function envAtelier(T) {
    const s = new T.Scene();
    s.add(new T.Mesh(new T.BoxGeometry(60, 32, 60), new T.MeshBasicMaterial({ color: 0x5a5148, side: T.BackSide })));
    const sol = new T.Mesh(new T.PlaneGeometry(60, 60), new T.MeshBasicMaterial({ color: 0xb7a996 })); sol.rotation.x = -Math.PI / 2; sol.position.y = -15.5; s.add(sol);
    const boite = (w, h, pos, col, k) => {
      const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(k), side: T.DoubleSide }));
      m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m);
    };
    boite(34, 20, [0, 15.4, 0], 0xffffff, 7);
    boite(16, 16, [-27, 4, 9], 0xffe6c8, 9);
    boite(12, 18, [27, 3, -6], 0xd3e2ff, 4);
    boite(46, 5, [0, 6, -29], 0xffffff, 4);
    boite(20, 9, [4, 2, 29], 0xfff3e2, 3);
    return s;
  }
  function textureStries(T) {
    const c = document.createElement('canvas'); c.width = 128; c.height = 256;
    const x = c.getContext('2d'); x.fillStyle = '#e6e6e6'; x.fillRect(0, 0, 128, 256);
    for (let i = 0; i < 900; i++) { const g = 170 + Math.random() * 85 | 0, px = Math.random() * 128, l = 30 + Math.random() * 190, y0 = Math.random() * 256;
      x.fillStyle = 'rgba(' + g + ',' + g + ',' + g + ',.5)'; x.fillRect(px, y0, 1 + Math.random() * 1.6, l); }
    const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.NoColorSpace; return t;
  }
  function textureSol(T) {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d'), g = x.createRadialGradient(128, 128, 8, 128, 128, 126);
    g.addColorStop(0, 'rgba(240,229,208,.9)'); g.addColorStop(.5, 'rgba(244,235,218,.5)'); g.addColorStop(1, 'rgba(247,241,231,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
  }

  /* =================================================================================
     4. L'ÉLÉMENT
     ================================================================================= */
  const NB_ATTR = ['piece', 'angle', 'diametre', 'rc', 'cote', 'cote2', 'central', 'hauteur', 'obstacle', 'decalage', 'angle-coude', 'profondeur', 'coupe', 'sans-controles'];
  const reduit = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let compteur = 0;

  class Cuivre3D extends HTMLElement {
    static get observedAttributes() { return NB_ATTR; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); this._pret = false; this._id = ++compteur; }

    connectedCallback() {
      if (!this._dom) this._construireDOM();
      this._observer = new IntersectionObserver(es => {
        this._visible = es.some(e => e.isIntersecting);
        if (this._visible && !this._debut) this._demarrer();
        else if (this._visible) this._boucle(true); else this._pauser();
      }, { threshold: 0.01 });
      this._observer.observe(this);
      this._onVis = () => (document.hidden ? this._pauser() : this._visible && this._pret && this._boucle(true));
      document.addEventListener('visibilitychange', this._onVis);
    }
    disconnectedCallback() {
      this._pauser(); this._debut = false;
      if (this._observer) this._observer.disconnect();
      document.removeEventListener('visibilitychange', this._onVis);
      if (this._ro) this._ro.disconnect();
      this._liberer();
    }
    attributeChangedCallback(nom, ancien, nouveau) {
      if (!this._dom || ancien === nouveau) return;
      if (nom === 'angle') {
        const v = num(nouveau, this._val), d = Math.abs(v - (this._val || 0));
        this._allerA(v, d > 8 && !this._joue);
      } else if (nom === 'sans-controles') this._dom.barre.hidden = nouveau !== null;
      else if (this._pret && nom !== 'piece') { this._P = lireParams(this, this._nom); this._P.T = this._T; this._modele(this._val, true); }
      else if (nom === 'piece') { this._liberer(); this._debut = false; if (this._visible) this._demarrer(); }
    }

    /* ---------- DOM ---------- */
    _construireDOM() {
      const r = this.shadowRoot;
      const nom = PIECES[this.getAttribute('piece')] ? this.getAttribute('piece') : 'coude90';
      this._nom = nom; this._def = PIECES[nom];
      r.innerHTML = (CSS ? '<link rel="stylesheet" href="' + CSS + '">' : '') +
        '<style>:host{display:block;position:relative;min-height:260px}.cadre{position:absolute;inset:0;display:flex;flex-direction:column}' +
        '.scene{position:relative;flex:1 1 auto;min-height:0;overflow:hidden}canvas{position:absolute;left:0;top:0;width:100%;height:100%}</style>' +
        '<div class="cadre"><div class="scene" tabindex="0" role="img"><canvas></canvas><svg class="fils" aria-hidden="true"></svg>' +
        '<div class="etiq" aria-hidden="true"></div><div class="attente">La pièce se prépare…</div></div>' +
        '<div class="legende"></div>' +
        '<div class="barre"><label class="curseur"><span class="lib"></span><input type="range" step="1"></label>' +
        '<button type="button" class="plein jouer"></button><button type="button" class="vue">Vue de dessus</button>' +
        '<button type="button" class="coupe">Voir la pièce entière</button></div></div><slot></slot>';
      const q = s => r.querySelector(s);
      this._dom = { cadre: q('.cadre'), scene: q('.scene'), canvas: q('canvas'), fils: q('.fils'), etiq: q('.etiq'), attente: q('.attente'),
        legende: q('.legende'), barre: q('.barre'), curseur: q('input'), lib: q('.lib'), jouer: q('.jouer'), vue: q('.vue'), coupe: q('.coupe') };
      const d = this._dom, D = this._def;
      d.scene.setAttribute('aria-label', D.desc + ' Faites glisser pour la tourner.');
      d.curseur.min = D.min; d.curseur.max = D.max; d.curseur.setAttribute('aria-label', D.lib);
      d.jouer.textContent = '▶ ' + D.jouer;
      d.barre.hidden = this.hasAttribute('sans-controles');
      if (!D.dessus) d.vue.hidden = true;
      if (!D.coupe) d.coupe.hidden = true;
      this._val = clamp(num(this.getAttribute('angle'), D.def), D.min, D.max);
      this._majCurseur();
      d.curseur.addEventListener('input', () => { this._joue = false; this._val = num(d.curseur.value, 0); this._modele(this._val); this._majCurseur(); });
      d.jouer.addEventListener('click', () => this._jouer());
      d.vue.addEventListener('click', () => this._basculerVue());
      d.coupe.addEventListener('click', () => {
        const non = this.getAttribute('coupe') === 'non'; this.setAttribute('coupe', non ? 'oui' : 'non');
        d.coupe.textContent = non ? 'Voir la pièce entière' : 'Voir la coupe';
      });
      if (this.getAttribute('coupe') === 'non') d.coupe.textContent = 'Voir la coupe';
      this._brancherPointeur();
    }
    _majCurseur() {
      const d = this._dom, D = this._def; d.curseur.value = this._val;
      d.lib.innerHTML = D.lib + ' : <b>' + D.fmt(this._val) + '</b>';
      const pc = (this._val - D.min) / (D.max - D.min) * 100; d.curseur.style.setProperty('--pc', pc + '%');
    }

    /* ---------- repli : la figure SVG existante, dans le DOM de la page ---------- */
    _repli(raison) {
      this._pauser(); this._liberer();
      if (this._dom) this._dom.cadre.style.display = 'none';
      this.dataset.repli = raison || '';
      if (this._svg) return;
      const [nom, etat] = REPLI[this._nom] || REPLI.coude90;
      const tpl = document.createElement('template');
      if (typeof CuivFigures !== 'undefined') tpl.innerHTML = CuivFigures.dessiner(nom, etat).trim();
      else tpl.innerHTML = '<p style="padding:1rem;font:700 18px Calibri,sans-serif;color:#56657a">La vue en trois dimensions n’est pas disponible sur cet appareil.</p>';
      this._svg = tpl.content.firstElementChild; this.append(this._svg);
      this.style.height = 'auto'; this.style.minHeight = '0';
    }

    /* ---------- démarrage : Three.js chargé seulement quand la pièce est visible ---------- */
    async _demarrer() {
      this._debut = true;
      let T;
      try { T = await chargerThree(); } catch (e) { return this._repli('reseau'); }
      if (!this.isConnected) return;
      try { this._monter(T); } catch (e) { console.warn('cuivre-3d :', e); return this._repli('webgl'); }
      this._dom.attente.hidden = true; this._pret = true;
      this._boucle(true);
    }
    _monter(T) {
      this._T = T; const d = this._dom;
      const rd = new T.WebGLRenderer({ canvas: d.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      if (!rd.getContext()) throw new Error('pas de WebGL');
      rd.setClearColor(0x000000, 0);
      rd.outputColorSpace = T.SRGBColorSpace; rd.toneMapping = T.ACESFilmicToneMapping; rd.toneMappingExposure = 1.05;
      rd.shadowMap.enabled = true; rd.shadowMap.type = T.PCFSoftShadowMap; rd.shadowMap.autoUpdate = false;
      rd.localClippingEnabled = true;
      this._pr = Math.min(window.devicePixelRatio || 1, 2); rd.setPixelRatio(this._pr);
      this._rd = rd;
      const sc = new T.Scene(); this._sc = sc;
      const pm = new T.PMREMGenerator(rd); const env = envAtelier(T);
      this._envRT = pm.fromScene(env, 0.02); sc.environment = this._envRT.texture; pm.dispose();
      env.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      this._cam = new T.PerspectiveCamera(27, 1, 5, 6000);
      /* lumière directe : une seule, pour l'ombre douce et l'éclat vif sur le métal */
      const dl = new T.DirectionalLight(0xfff1de, 1.6); dl.position.set(-260, 520, 300); dl.castShadow = true;
      dl.shadow.mapSize.set(1024, 1024); dl.shadow.bias = -0.0004; dl.shadow.normalBias = 0.6; dl.shadow.radius = 5;
      sc.add(dl, dl.target); this._dl = dl;
      /* matériaux : cuivre poli, intérieur plus mat, laiton, acier galvanisé */
      const stries = textureStries(T);
      const cu = new T.MeshStandardMaterial({ color: 0xe58a5a, metalness: 1, roughness: 0.26, roughnessMap: stries, envMapIntensity: 1.25 });
      const cuIn = new T.MeshStandardMaterial({ color: 0xc57b52, metalness: 1, roughness: 0.5, roughnessMap: stries, side: T.DoubleSide });
      const cap = new T.MeshStandardMaterial({ color: 0xdc9068, metalness: 0.45, roughness: 0.55, side: T.DoubleSide });
      const capLaiton = new T.MeshStandardMaterial({ color: 0xd8a848, metalness: 0.45, roughness: 0.55, side: T.DoubleSide });
      const fantome = new T.MeshStandardMaterial({ color: 0xb4bcc4, metalness: 0.6, roughness: 0.5, transparent: true, opacity: 0.28, depthWrite: false, side: T.DoubleSide });
      const laiton = new T.MeshStandardMaterial({ color: 0xe6bd6a, metalness: 1, roughness: 0.28, side: T.DoubleSide });
      const acier = new T.MeshStandardMaterial({ color: 0xb4bcc4, metalness: 0.9, roughness: 0.4, side: T.DoubleSide });
      const trait = new T.MeshStandardMaterial({ color: 0x14243b, metalness: 0, roughness: 0.6 });
      this._mat = { cu, cuIn, cap, capLaiton, fantome, laiton, acier, trait, stries, cotes: new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide, toneMapped: false }) };
      /* l'établi : un halo tiède et une ombre douce */
      const halo = new T.Mesh(new T.PlaneGeometry(1500, 1500), new T.MeshBasicMaterial({ map: textureSol(T), transparent: true, depthWrite: false, toneMapped: false }));
      halo.rotation.x = -Math.PI / 2; halo.position.y = -0.3; sc.add(halo); this._halo = halo;
      const sol = new T.Mesh(new T.PlaneGeometry(1500, 1500), new T.ShadowMaterial({ opacity: 0.3 }));
      sol.rotation.x = -Math.PI / 2; sol.receiveShadow = true; sc.add(sol);
      this._groupe = new T.Group(); sc.add(this._groupe);
      this._meshes = {}; this._labels = {};
      this._P = lireParams(this, this._nom); this._P.T = T;
      this._extrasStatiques();
      this._cadrer(); this._halo.position.x = this._cible.x; this._halo.position.z = this._cible.z;
      this._az0 = this._def.coupe ? -0.22 : -0.42; this._el0 = this._def.coupe ? 1.0 : 0.72;
      this._az = this._az0; this._el = this._el0; this._azC = this._az; this._elC = this._el; this._dessus = false; this._derniere = 0;
      this._modele(this._val, true);
      this._ro = new ResizeObserver(() => { this._redim = true; this._sale = true; if (this._pret) this._boucle(true); });
      this._ro.observe(d.scene);
      this._redimensionner();
      this._essai = 0;
    }
    _extrasStatiques() {
      const T = this._T, P = this._P, g = this._groupe, m = this._mat;
      if (this._nom === 'chapeau' && P.obst > 0) {
        const { obstacle } = PIECES.chapeau.build(P, 90).statique, R = P.obst / 2, H = 46;
        const o = new T.Group();
        const ext_ = new T.Mesh(new T.CylinderGeometry(R, R, H, 56, 1, true), m.acier);
        const int_ = new T.Mesh(new T.CylinderGeometry(R - 1.6, R - 1.6, H, 56, 1, true), m.acier);
        const top = new T.Mesh(new T.RingGeometry(R - 1.6, R, 56), m.acier); top.rotation.x = -Math.PI / 2; top.position.y = H / 2;
        o.add(ext_, int_, top); o.position.set(obstacle.x, H / 2, 0); this._obst = o;
        o.traverse(x => { if (x.isMesh) { x.castShadow = true; x.receiveShadow = false; } });
        g.add(o);
        this._occStatique = [{ a: [obstacle.x, 0, 0], b: [obstacle.x, H, 0], rad: R }];
      }
      if (this._nom === 'dudgeon') {
        const r = P.d / 2, yc = r + 5, AF = 2 * (r + 4.6), Rh = AF / 2 / Math.cos(Math.PI / 6);
        const sh = new T.Shape(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; sh[i ? 'lineTo' : 'moveTo'](Rh * Math.cos(a), Rh * Math.sin(a)); }
        const hole = new T.Path(); hole.absarc(0, 0, r + 0.95, 0, TAU, true); sh.holes.push(hole);
        const geo = new T.ExtrudeGeometry(sh, { depth: 12, bevelEnabled: true, bevelThickness: 0.7, bevelSize: 0.6, bevelSegments: 2, curveSegments: 40 });
        geo.rotateY(Math.PI / 2);
        const nut = new T.Mesh(geo, m.laiton); nut.position.set(-31, yc, 0); nut.castShadow = true; g.add(nut); this._ecrou = nut;
        const capN = new T.Mesh(new T.BufferGeometry(), m.capLaiton); g.add(capN); capN.visible = false; this._capEcrou = capN;
        const ax = -31 - 0.7, bx = -31 + 12 + 0.7, zi = r + 0.95, zo = Rh + 0.6;
        const pos = [], nor = [];
        for (const sgn of [1, -1]) { const A = [ax, yc, sgn * zi], B = [bx, yc, sgn * zi], C = [bx, yc, sgn * zo], D = [ax, yc, sgn * zo];
          for (const t of [A, B, C, A, C, D]) { pos.push(...t); nor.push(0, 1, 0); } }
        capN.geometry.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); capN.geometry.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
        this._yAxe = yc;
      }
    }
    _liberer() {
      this._pret = false;
      if (this._rd) {
        try { this._envRT && this._envRT.dispose(); } catch (e) {}
        if (this._sc) this._sc.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) { const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(x => { if (x.map) x.map.dispose(); x.dispose(); }); } });
        this._rd.dispose(); try { this._rd.forceContextLoss(); } catch (e) {}
        this._rd = null;
      }
      this._meshes = {}; this._labels = {};
      if (this._dom) { this._dom.etiq.replaceChildren(); this._dom.fils.replaceChildren(); this._dom.attente.hidden = false; }
    }

    /* ---------- le modèle courant → les maillages ---------- */
    _modele(val, force) {
      const T = this._T, P = this._P, D = this._def, m = this._mat, g = this._groupe, cap = P.coupe;
      const mod = D.build(P, val); this._mod = mod;
      const vus = new Set();
      for (const s of mod.surfaces) {
        vus.add(s.id); const n = s.rings.length, mseg = s.lip ? 28 : 28;
        let me = this._meshes[s.id];
        if (!me || me.geometry._n !== n || me.geometry._inward !== s.inward) {
          if (me) { g.remove(me); me.geometry.dispose(); }
          const geo = creerBande(T, n, mseg); indexer(geo, s.inward); geo._inward = s.inward;
          me = new T.Mesh(geo, m[s.mat]); me.frustumCulled = false; me.castShadow = !s.lip || true; me.receiveShadow = false;
          g.add(me); this._meshes[s.id] = me;
        }
        remplir(me.geometry, s.rings, s.a0, s.a1, s.inward);
      }
      for (const id of Object.keys(this._meshes)) if (!vus.has(id) && id.charAt(0) !== '_') { const me = this._meshes[id]; if (!me.userData.fixe) { g.remove(me); me.geometry.dispose(); delete this._meshes[id]; } }
      /* tranches de coupe */
      if (this._caps) { g.remove(this._caps); this._caps.geometry.dispose(); this._caps = null; }
      if (mod.caps && mod.caps.length) { this._caps = new T.Mesh(geoCaps(T, mod.caps), m.cap); this._caps.frustumCulled = false; g.add(this._caps); }
      /* coupe : plan qui retire la moitié haute de l'écrou (le reste est déjà construit en demi-coque) */
      if (this._ecrou) {
        const plan = P.coupe ? [new T.Plane(new T.Vector3(0, -1, 0), this._yAxe)] : [];
        this._ecrou.material = m.laitonC || (m.laitonC = m.laiton.clone()); this._ecrou.material.clippingPlanes = plan; this._capEcrou.visible = !!P.coupe;
      }
      /* l'obstacle n'est plein qu'une fois le chapeau fini : avant, le tube le traverserait */
      if (this._obst) { const plein = val >= 89.5; this._obst.traverse(x => { if (x.isMesh) { x.material = plein ? m.acier : m.fantome; x.castShadow = plein; } }); }
      /* traits au feutre */
      const ms = mod.marques || [];
      this._traits = this._traits || [];
      while (this._traits.length < ms.length) { const t = new T.Mesh(new T.CylinderGeometry(1, 1, 1, 36, 1, true), m.trait); t.frustumCulled = false; g.add(t); this._traits.push(t); }
      this._traits.forEach((t, i) => {
        const mk = ms[i]; t.visible = !!mk; if (!mk) return;
        const r = P.d / 2 + 0.12; t.scale.set(r, 1.7, r); t.position.set(mk.x, mk.y, mk.z);
        t.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), new T.Vector3(mk.tx, 0, mk.tz));
      });
      /* les cotes peintes sur l'établi */
      if (this._cotes) { g.remove(this._cotes); this._cotes.geometry.dispose(); this._cotes = null; }
      const q = mod.cotes;
      if (q && q.p.length) {
        const geo = new T.BufferGeometry();
        geo.setAttribute('position', new T.Float32BufferAttribute(q.p, 3)); geo.setAttribute('color', new T.Float32BufferAttribute(q.c, 3));
        this._cotes = new T.Mesh(geo, m.cotes); this._cotes.frustumCulled = false; this._cotes.renderOrder = 2; g.add(this._cotes);
      }
      this._occ = (mod.occ || []).concat(this._occStatique || []);
      if (this._cible) {
        const pts = []; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
        mod.rings.forEach((q, i) => { if (i % 3 === 0 || i === mod.rings.length - 1) pts.push([q.x, q.y, q.z]); });
        for (const o of this._occStatique || []) { pts.push(o.a, o.b); }
        for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[2]); z1 = Math.max(z1, p[2]); }
        this._pts = pts; this._cibleV.set((x0 + x1) / 2, this._P.d * 0.4, (z0 + z1) / 2);
        if (this._dl) { this._dl.target.position.copy(this._cibleV); }
      }
      this._dom.legende.textContent = mod.legende || '';
      this._syncEtiquettes(mod.labels);
      this._rd.shadowMap.needsUpdate = true; this._sale = true;
      if (this._pret) this._boucle(true);
    }

    /* ---------- cadrage : une sphère qui contient la pièce à tous ses états ---------- */
    _cadrer() {
      const T = this._T, D = this._def, pts = [];
      const vals = D.max === 45 ? [0, 22, 45] : [0, 30, 60, 90];
      let mg = 0;
      for (const v of vals) { const md = D.build(this._P, v); mg = Math.max(mg, md.marge || 40); md.rings.forEach((q, i) => { if (i % 3 === 0 || i === md.rings.length - 1) pts.push([q.x, q.y, q.z]); }); }
      let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
      for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[2]); z1 = Math.max(z1, p[2]); }
      this._cible = new T.Vector3((x0 + x1) / 2, this._P.d * 0.4, (z0 + z1) / 2);
      this._pts = pts; this._cibleV = this._cible.clone();
      this._m = mg * 0.4 + this._P.d;
      const s = Math.max(x1 - x0, z1 - z0) * 0.6 + mg + 40, c = this._dl.shadow.camera;
      this._dl.position.set(this._cible.x - 240, 520, this._cible.z + 300); this._dl.target.position.copy(this._cible); this._dl.target.updateMatrixWorld();
      c.left = -s; c.right = s; c.top = s; c.bottom = -s; c.near = 50; c.far = 1400; c.updateProjectionMatrix();
    }
    /* la distance qui fait entrer toute la pièce (à tous ses états) dans l'image, pour la direction de vue courante */
    _distanceVoulue() {
      const az = this._az, el = this._el, sa = Math.sin(az), ca = Math.cos(az), se = Math.sin(el), ce = Math.cos(el);
      const tv = Math.tan(this._cam.fov * D2R / 2), th = tv * this._cam.aspect, m = this._m;
      let d = 0;
      const tg = this._cible;
      for (const q of this._pts) {
        const p = [q[0] - tg.x, q[1] - tg.y, q[2] - tg.z];
        const xc = p[0] * ca - p[2] * sa, yc = -p[0] * sa * se + p[1] * ce - p[2] * ca * se, zc = p[0] * sa * ce + p[1] * se + p[2] * ca * ce;
        d = Math.max(d, (Math.abs(xc) + m) / th + zc, (Math.abs(yc) + m) / tv + zc);
      }
      return d * 1.04 + 8;
    }
    _redimensionner() {
      const d = this._dom, w = Math.max(50, d.scene.clientWidth), h = Math.max(50, d.scene.clientHeight);
      this._rd.setSize(w, h, false); this._W = w; this._H = h;
      this._cam.aspect = w / h; this._cam.updateProjectionMatrix();
      d.fils.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      this._redim = false; this._sale = true;
    }

    /* ---------- interaction : glisser pour tourner ---------- */
    _brancherPointeur() {
      const s = this._dom.scene; let act = null, dx0 = 0, dy0 = 0;
      s.addEventListener('pointerdown', e => { act = e.pointerId; dx0 = e.clientX; dy0 = e.clientY; try { s.setPointerCapture(act); } catch (x) {} s.classList.add('prend'); this._touche(); });
      s.addEventListener('pointermove', e => {
        if (e.pointerId !== act) return;
        const dx = e.clientX - dx0, dy = e.clientY - dy0; dx0 = e.clientX; dy0 = e.clientY;
        this._azC -= dx * 0.008;
        if (e.pointerType !== 'touch') this._elC = clamp(this._elC + dy * 0.006, 0.12, 1.5);
        this._dessus = false; this._dom.vue.textContent = 'Vue de dessus'; this._touche();
      });
      const fin = e => { if (e.pointerId === act) { act = null; s.classList.remove('prend'); this._touche(); } };
      s.addEventListener('pointerup', fin); s.addEventListener('pointercancel', fin);
      s.addEventListener('keydown', e => {
        const k = { ArrowLeft: [0.12, 0], ArrowRight: [-0.12, 0], ArrowUp: [0, -0.08], ArrowDown: [0, 0.08] }[e.key];
        if (k) { e.preventDefault(); this._azC += k[0]; this._elC = clamp(this._elC + k[1], 0.12, 1.5); this._dessus = false; this._touche(); }
      });
    }
    _touche() { this._dernierGeste = performance.now(); this._sale = true; if (this._pret) this._boucle(true); }
    _basculerVue() {
      this._dessus = !this._dessus; this._dom.vue.textContent = this._dessus ? 'Vue en perspective' : 'Vue de dessus';
      if (this._dessus) { this._azC = 0; this._elC = 1.53; } else { this._azC = this._az0; this._elC = this._el0; }
      this._touche();
    }
    _allerA(v, doux) {
      const D = this._def; v = clamp(v, D.min, D.max);
      if (!doux || reduit()) { this._val = v; this._majCurseur(); if (this._pret) this._modele(v); return; }
      this._anim = { de: this._val, vers: v, t0: performance.now(), dur: 380 }; this._touche();
    }
    _jouer() {
      const D = this._def; this._joue = true;
      this._anim = { de: D.min, vers: D.max, t0: performance.now(), dur: reduit() ? 1 : 3400, ease: true };
      this._dom.jouer.textContent = '↻ Rejouer'; this._touche();
    }

    /* ---------- la boucle : elle ne tourne que si la pièce est visible ---------- */
    _pauser() { if (this._raf) cancelAnimationFrame(this._raf); this._raf = 0; }
    _boucle(force) {
      if (!this._pret || !this._visible || document.hidden) return;
      if (this._raf) return;
      this._raf = requestAnimationFrame(t => { this._raf = 0; this._image(t); });
    }
    _image(t) {
      if (!this._pret) return;
      const dt = this._derniere ? Math.min(0.1, (t - this._derniere) / 1000) : 0.016; this._derniere = t;
      if (this._redim) this._redimensionner();
      /* l'animation du curseur */
      if (this._anim) {
        const a = this._anim, k = clamp((performance.now() - a.t0) / a.dur, 0, 1), e = a.ease ? 0.5 - Math.cos(Math.PI * k) / 2 : 1 - Math.pow(1 - k, 3);
        this._val = a.de + (a.vers - a.de) * e; this._majCurseur(); this._modele(this._val);
        if (k >= 1) this._anim = null;
      }
      /* la rotation lente au repos : un balancier de part et d'autre de la vue choisie (la pièce ne passe jamais de chant) */
      const repos = performance.now() - (this._dernierGeste || 0) > 2500 && !this._dessus && !this._anim && !reduit();
      this._amp = (this._amp || 0) + ((repos ? 0.62 : 0) - (this._amp || 0)) * (1 - Math.pow(0.15, dt));
      this._phase = (this._phase || 0) + (repos ? dt * 0.42 : 0);
      const da = this._azC - this._az, de = this._elC - this._el;
      const bouge = Math.abs(da) > 1e-4 || Math.abs(de) > 1e-4;
      if (bouge) { const f = reduit() ? 1 : 1 - Math.pow(0.0009, dt); this._az += da * f; this._el += de * f; }
      this._cible.lerp(this._cibleV, reduit() ? 1 : 1 - Math.pow(0.02, dt));
      const azv = this._az + this._amp * Math.sin(this._phase), az0 = this._az; this._az = azv;
      const dv = this._distanceVoulue(); this._az = az0;
      this._d = this._d == null ? dv : this._d + (dv - this._d) * (reduit() ? 1 : 1 - Math.pow(0.02, dt));
      const c = this._cam, ce = Math.cos(this._el), tg = this._cible;
      c.position.set(tg.x + this._d * Math.sin(azv) * ce, tg.y + this._d * Math.sin(this._el), tg.z + this._d * Math.cos(azv) * ce);
      c.lookAt(tg); c.updateMatrixWorld();
      this._rd.render(this._sc, c);
      this._poserEtiquettes();
      this._mesurer(t);
      this._sale = false;
      if (this._anim || bouge || repos || this._amp > 0.01 || Math.abs(this._d - dv) > 0.05 || this._cible.distanceTo(this._cibleV) > 0.05) this._boucle();
    }
    _mesurer(t) {
      /* qualité adaptative : si la tablette peine (> 26 ms par image sur 90 images), on baisse la résolution */
      if (this.hasAttribute('qualite-fixe')) return;
      this._fr = (this._fr || 0) + 1; this._ft = this._ft || t;
      if (this._fr >= 90) {
        const moy = (t - this._ft) / this._fr; this._fr = 0; this._ft = t;
        this.dataset.msImage = moy.toFixed(1);
        if (moy > 26 && this._pr > 1) { this._pr = Math.max(1, this._pr * 0.75); this._rd.setPixelRatio(this._pr); this._redim = true; }
      }
    }

    /* ---------- les étiquettes : jamais sur le tube ---------- */
    _syncEtiquettes(defs) {
      const e = this._dom.etiq, f = this._dom.fils, vus = new Set();
      this._defs = defs || [];
      for (const dfn of this._defs) {
        vus.add(dfn.id); let L = this._labels[dfn.id];
        if (!L) {
          const el = document.createElement('div'); el.className = 'lab' + (dfn.g ? ' g' : ''); e.append(el);
          const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line'); ln.setAttribute('class', dfn.g ? 'fil g' : 'fil');
          const pt = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); pt.setAttribute('r', '3.4'); pt.setAttribute('class', dfn.g ? 'pt g' : 'pt');
          f.append(ln, pt); L = { el, ln, pt, cand: null, txt: '' }; this._labels[dfn.id] = L;
        }
        if (L.txt !== dfn.text) { L.el.textContent = dfn.text; L.txt = dfn.text; L.w = 0; }
      }
      for (const id of Object.keys(this._labels)) if (!vus.has(id)) { const L = this._labels[id]; L.el.remove(); L.ln.remove(); L.pt.remove(); delete this._labels[id]; }
    }
    _px(p) { const v = this._v3 || (this._v3 = new this._T.Vector3()); v.set(p[0], p[1], p[2]).project(this._cam); return [(v.x * 0.5 + 0.5) * this._W, (-v.y * 0.5 + 0.5) * this._H, v.z]; }
    _poserEtiquettes() {
      const W = this._W, H = this._H, cam = this._cam, T = this._T;
      /* la taille en pixels d'un millimètre, au niveau de la cible */
      const right = new T.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
      const t0 = this._px([this._cible.x, this._cible.y, this._cible.z]), t1 = this._px([this._cible.x + right.x, this._cible.y + right.y, this._cible.z + right.z]);
      const pxmm = Math.hypot(t1[0] - t0[0], t1[1] - t0[1]);
      const caps = this._occ.map(o => { const a = this._px(o.a), b = this._px(o.b); return { ax: a[0], ay: a[1], bx: b[0], by: b[1], r: o.rad * pxmm }; });
      const pris = [];
      const libre = (x, y, w, h) => {
        if (x < 4 || y < 4 || x + w > W - 4 || y + h > H - 4) return false;
        for (const c of caps) if (segRect(c.ax, c.ay, c.bx, c.by, x - c.r - 5, y - c.r - 5, x + w + c.r + 5, y + h + c.r + 5)) return false;
        for (const p of pris) if (x < p[0] + p[2] + 6 && x + w + 6 > p[0] && y < p[1] + p[3] + 6 && y + h + 6 > p[1]) return false;
        return true;
      };
      this._nCol = 0;
      for (const dfn of this._defs) {
        const L = this._labels[dfn.id]; if (!L) continue;
        if (!L.w) { L.w = L.el.offsetWidth; L.h = L.el.offsetHeight; }
        const w = L.w, h = L.h, an = this._px(dfn.p);
        const pd = this._px([dfn.p[0] + dfn.dir[0] * 20, dfn.p[1], dfn.p[2] + (dfn.dir[2] != null ? dfn.dir[2] : -dfn.dir[1]) * 20]);
        let th0 = Math.atan2(pd[1] - an[1], pd[0] - an[0]); if (!isFinite(th0)) th0 = -Math.PI / 2;
        const cand = [];
        for (const d of [22, 40, 66, 100, 140, 190]) for (const k of [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8]) cand.push([th0 + k * Math.PI / 8, d]);
        let choix = null;
        const pos = (th, d) => { const c = Math.cos(th), s = Math.sin(th), sup = Math.abs(c) * w / 2 + Math.abs(s) * h / 2; return [an[0] + c * (d + sup) - w / 2, an[1] + s * (d + sup) - h / 2]; };
        if (L.cand) { const p = pos(L.cand[0], L.cand[1]); if (libre(p[0], p[1], w, h)) choix = { th: L.cand[0], d: L.cand[1], p }; }
        if (!choix) for (const [th, d] of cand) { const p = pos(th, d); if (libre(p[0], p[1], w, h)) { choix = { th, d, p }; L.cand = [th, d]; break; } }
        if (!choix) { this._nCol++; const p = pos(cand[0][0], 110); choix = { th: cand[0][0], d: 110, p: [clamp(p[0], 4, W - w - 4), clamp(p[1], 4, H - h - 4)] }; }
        const [x, y] = choix.p; pris.push([x, y, w, h]);
        L.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        const nx = clamp(an[0], x, x + w), ny = clamp(an[1], y, y + h);
        L.ln.setAttribute('x1', an[0].toFixed(1)); L.ln.setAttribute('y1', an[1].toFixed(1)); L.ln.setAttribute('x2', nx.toFixed(1)); L.ln.setAttribute('y2', ny.toFixed(1));
        L.pt.setAttribute('cx', an[0].toFixed(1)); L.pt.setAttribute('cy', an[1].toFixed(1));
        const vis = an[2] < 1 ? '' : 'none'; L.el.style.display = vis; L.ln.style.display = vis; L.pt.style.display = vis;
      }
    }
    /* pour les essais : figer la vue, puis l'état courant */
    poser(az, el) { this._az = this._azC = az; this._el = this._elC = el; this._dernierGeste = performance.now() + 1e9; this._amp = 0; this._d = null; this._cible.copy(this._cibleV); this._touche(); }
    /* essai sans image : place la caméra, pose les étiquettes, rend le nombre d'étiquettes qui n'ont pas trouvé de place libre */
    essai(az, el, val) {
      this._az = this._azC = az; this._el = this._elC = el; this._dernierGeste = performance.now() + 1e9; this._amp = 0;
      if (val != null) { this._val = val; this._modele(val); }
      this._cible.copy(this._cibleV); this._d = this._distanceVoulue();
      const c = this._cam, ce = Math.cos(el), tg = this._cible;
      c.position.set(tg.x + this._d * Math.sin(az) * ce, tg.y + this._d * Math.sin(el), tg.z + this._d * Math.cos(az) * ce);
      c.lookAt(tg); c.updateMatrixWorld();
      for (const k of Object.keys(this._labels)) this._labels[k].cand = null;
      this._poserEtiquettes(); return this._nCol;
    }
    /* l'état courant */
    info() { const r = this._rd && this._rd.info; return { piece: this._nom, val: this._val, prets: this._pret, repli: this.dataset.repli || '', appels: r && r.render.calls, triangles: r && r.render.triangles, pr: this._pr, W: this._W, H: this._H }; }
  }

  /* segment contre rectangle (Liang-Barsky) */
  function segRect(ax, ay, bx, by, x0, y0, x1, y1) {
    let t0 = 0, t1 = 1; const dx = bx - ax, dy = by - ay;
    for (const [p, q] of [[-dx, ax - x0], [dx, x1 - ax], [-dy, ay - y0], [dy, y1 - ay]]) {
      if (p === 0) { if (q < 0) return false; } else { const r = q / p; if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; } }
    }
    return true;
  }

  customElements.define('cuivre-3d', Cuivre3D);
  window.Cuivre3D = { version: '1', three: '0.160.0' };
})();
