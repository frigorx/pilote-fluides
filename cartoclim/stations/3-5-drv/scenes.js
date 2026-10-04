/* CartoClim 3.5 — scènes du DRV. Temps 2 (et temps 1, devant les photos : scene-devant.js) : le réseau en
   arbre d'un immeuble de bureaux, en six pas (le fluide dans la colonne et les dérivations, le détendeur de
   chaque pièce, le bus, le compresseur, puis les deux façons de choisir le mode : deux tubes, ou
   récupération d'énergie) — avec le FLUIDE et l'AIR qui circulent (« Animer les réseaux », 04/10/2026).
   Temps 5 : ce qu'on maîtrise du groupe à la dernière unité.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · le fluide : un trait du réseau regroupe DEUX tubes côte à côte, le liquide (petit : tube plein à reflets)
     qui descend la colonne puis part dans chaque branche, le gaz (gros : petites molécules) qui remonte ; la
     vitesse suit la demande — la colonne s'éclaircit à chaque dérivation, le compresseur Inverter accélère au
     pas 4 ; au pas 6 un troisième tube (gaz chaud) apparaît, la zone en chauffage prend le gaz chaud et
     renvoie son liquide, la chaleur du froid passe d'un étage à l'autre ;
   · l'air : des chevrons dehors à travers le condenseur du groupe (il sort chaud), dans chaque unité intérieure
     (il sort froid, ou chaud en chauffage) ; les turbines et l'hélice tournent ;
   · le bus : des tirets verts qui remontent vers le groupe, au pas 3 ;
   · le pas à pas allume la partie qui agit, le reste continue de couler en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js). Aucun texte sur un tracé, ni sur le trajet d'un
   chevron, d'une molécule ou d'une flèche : vérifié par outils/controler-station-navigateur.mjs. Étiquettes
   en taille 21 dans 900 : au moins 18,7 px quand la scène est devant, à 1 280 px (colonne de droite : 25 rem).
   Les couleurs viennent de SceneKit.C : bleu = froid, rouge = chaud, vert = bus de communication. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* un texte : x, y, contenu, options { a: ancrage, c: couleur, t: taille, g: gras (défaut oui) } */
  const tx = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}"${o.a ? ` text-anchor="${o.a}"` : ''} font-size="${o.t || 14}"${o.g === false ? '' : ' font-weight="700"'} fill="${o.c || C.navy}">${s}</text>`;

  /* ---------- la circulation : un trajet (ligne brisée) et ce qui avance dessus ---------- */
  function trajet(pts) {
    const seg = []; let L = 0;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], l = Math.hypot(x1 - x0, y1 - y0);
      seg.push({ x0, y0, x1, y1, l, s: L }); L += l;
    }
    const a = s => {
      const g = seg.find(k => s <= k.s + k.l) || seg[seg.length - 1], f = g.l ? (s - g.s) / g.l : 0;
      return [g.x0 + (g.x1 - g.x0) * f, g.y0 + (g.y1 - g.y0) * f, Math.atan2(g.y1 - g.y0, g.x1 - g.x0) * 180 / Math.PI];
    };
    return { pts, L, a, d: 'M ' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') };
  }
  /* un coude de serpentin : demi-cercle de (x, ya) à (x, yb), bombé à droite (+1) ou à gauche (-1) */
  function coude(x, ya, yb, sens) {
    const r = Math.abs(yb - ya) / 2, cy = (ya + yb) / 2, v = yb > ya ? 1 : -1, p = [];
    for (let i = 1; i < 10; i++) { const th = -Math.PI / 2 + Math.PI * i / 10; p.push([x + sens * r * Math.cos(th), cy + v * r * Math.sin(th)]); }
    return p;
  }
  /* un trajet coupé à la fraction f de sa longueur : [l'amont, l'aval] */
  function couper(tr, f) {
    const [x, y] = tr.a(tr.L * f), amont = [tr.pts[0]];
    let cumul = 0;
    for (let i = 1; i < tr.pts.length; i++) {
      cumul += Math.hypot(tr.pts[i][0] - tr.pts[i - 1][0], tr.pts[i][1] - tr.pts[i - 1][1]);
      if (cumul >= tr.L * f) return [trajet(amont.concat([[x, y]])), trajet([[x, y]].concat(tr.pts.slice(i)))];
      amont.push(tr.pts[i]);
    }
    return [tr, tr];
  }
  /* un trajet dont les points changent (une unité qui s'éloigne) : tr.maj(nouveaux points) */
  function trajetVivant(pts) {
    const tr = trajet(pts);
    tr.vivant = true;
    tr.maj = p => Object.assign(tr, trajet(p), { vivant: true, maj: tr.maj });
    return tr;
  }

  const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', EAU = '#4f9fc0';
  const RETRAIT = 0.4;                                     /* ce qui n'agit pas à cette étape */

  /* ---------- l'atelier d'un dessin vivant ----------
     Tout se calcule à partir du temps (requestAnimationFrame) — ni SMIL ni animation CSS. Des horloges :
     « f » le fluide, « a » l'air ; une horloge qui s'arrête fige ce qu'elle mène, une qui accélère le presse
     (le compresseur Inverter, un ventilateur). Des grandeurs douces (S) : une cible, que le dessin rejoint
     sans à-coup. Le dessin est construit UNE fois : chaque étape ne fait qu'allumer ou régler. */
  function vivant(d, W, Ht) {
    const D = window.VOYAGE_DESSIN;
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const clocks = {}, S = {}, anime = [], couches = [], etiquettes = [];
    let temps = 1.6;
    const horloge = (nom, v0 = 1) => (clocks[nom] = { t: 1.6, v: v0, c: v0 });
    const vitesse = (nom, x) => { clocks[nom].c = x; if (FIGE) { clocks[nom].v = x; image(temps); } };
    const doux = (nom, v0) => (S[nom] = { v: v0, c: v0 });
    const viser = (nom, x) => { S[nom].c = x; if (FIGE) { S[nom].v = x; image(temps); } };
    horloge('f'); horloge('a');
    D.defs(d);

    /* le fond, et le filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière
       tout ; cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    const fond = () => {
      D.el('rect', { x: 6, y: 6, width: W - 12, height: Ht - 12, rx: 16, fill: C.papier, stroke: C.trait }, d);
      D.filigrane(d, [[W * 0.235, Ht * 0.278], [W * 0.5, Ht * 0.516], [W * 0.765, Ht * 0.753]], 250 * W / 1000).querySelectorAll('text')
        .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });
    };
    /* une partie du dessin, que le pas à pas allume */
    const couche = (c, parent) => { const g = D.el('g', { 'data-c': c }, parent || d); couches.push({ g, c, v: 1, cible: 1 }); return g; };

    /* n repères régulièrement espacés qui avancent à v unités par seconde sur l'horloge h, décalés de dec ; poser(repère, x, y, angle, f) */
    const filer = (parent, tr, n, v, creer, poser, h, dec) => {
      const rep = Array.from({ length: n }, (_, i) => creer(parent, i)), cl = clocks[h || 'a'];
      anime.push(() => rep.forEach((e, i) => {
        const f = D.frac(i / n + (dec || 0) + cl.t * v / tr.L), [x, y, ang] = tr.a(f * tr.L);
        poser(e, x, y, ang, f);
      }));
    };
    const chemin = (g, tr, at) => {
      const p = D.el('path', Object.assign({ d: tr.d, fill: 'none', 'stroke-linejoin': 'round' }, at), g);
      if (tr.vivant) anime.push(() => p.setAttribute('d', tr.d));
      return p;
    };

    /* les tubes de cuivre, et ce qui coule dedans */
    const tube = (g, tr, ext, int) => {
      chemin(g, tr, { stroke: CUIVRE_BORD, 'stroke-width': ext, 'stroke-linecap': 'round' });
      chemin(g, tr, { stroke: CUIVRE, 'stroke-width': ext - 3, 'stroke-linecap': 'round' });
      chemin(g, tr, { stroke: CREUX, 'stroke-width': int, 'stroke-linecap': 'round' });
    };
    /* liquide : le tube plein, des reflets qui filent dans le sens du fluide */
    const liquide = (g, tr, int, couleur, v, h) => {
      chemin(g, tr, { stroke: couleur, 'stroke-width': int, opacity: 0.92 });
      const reflet = chemin(g, tr, { stroke: C.papier, 'stroke-width': Math.max(1.6, int * 0.28), 'stroke-dasharray': '12 30', opacity: 0.85 });
      const cl = clocks[h || 'f'];
      anime.push(() => reflet.setAttribute('stroke-dashoffset', (-(cl.t * v) % 42).toFixed(1)));
    };
    /* vapeur : le creux à peine teinté, de petites molécules séparées ; gouttes(f) : où elles deviennent gouttes */
    const vapeur = (g, tr, int, temp, v, pas, gouttes, h) => {
      chemin(g, tr, { stroke: D.couleur(temp, true), 'stroke-width': int, opacity: 0.25 });
      filer(g, tr, Math.max(2, Math.round(tr.L / pas)), v,
        p => D.el('circle', { r: int * 0.3 }, p),
        (m, x, y, ang, f) => {
          const goutte = gouttes && f > gouttes;
          m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1));
          m.setAttribute('fill', goutte ? D.couleur(0.62) : D.couleur(temp, true));
          m.setAttribute('stroke', goutte ? 'none' : C.navy); m.setAttribute('stroke-opacity', 0.5);
          m.setAttribute('r', (goutte ? int * 0.26 : int * 0.3).toFixed(1));
        }, h || 'f');
    };
    /* les bulles de l'ébullition : elles naissent, grossissent et filent avec le liquide */
    const bulles = (g, tr, int, v, h) => filer(g, tr, Math.round(tr.L / 17), v,
      p => D.el('circle', { fill: C.papier, 'fill-opacity': 0.55, stroke: C.papier, 'stroke-width': 1.2 }, p),
      (b, x, y, ang, f) => { b.setAttribute('cx', x.toFixed(1)); b.setAttribute('cy', y.toFixed(1));
        b.setAttribute('r', (0.6 + int * 0.33 * f).toFixed(1)); b.setAttribute('opacity', D.borne(f * 1.6, 0, 1).toFixed(2)); }, h || 'f');

    /* l'air : des chevrons qui avancent sur une ligne brisée ; leur couleur suit la température, o.temp(f, x, y) ;
       o.act : une grandeur douce (0..1) qui efface l'air quand la machine s'arrête ; o.h : son horloge */
    const souffle = (g0, pts, o) => {
      const k = 0.5, g = D.el('g', { transform: 'scale(' + k + ')' }, g0), tr = trajet(pts);
      filer(g, tr, o.n || Math.max(2, Math.round(tr.L / (o.pas || 48))), o.v || 75, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / k, y / k, ang - 90, D.couleur(o.temp(f, x, y)), D.fenetre(f, 0, 1, 0.06) * (o.act ? D.borne(o.act.v, 0, 1) : 1)), o.h || 'a', o.dec);
      return tr;
    };
    /* des flèches de chaleur qui avancent sur une ligne brisée (D.chaleur pointe vers le bas à angle 0) */
    const chaleur = (g0, pts, o) => {
      const k = o.k || 0.8, g = D.el('g', { transform: 'scale(' + k + ')' }, g0), tr = trajet(pts);
      filer(g, tr, o.n || Math.max(1, Math.round(tr.L / (o.pas || 90))), o.v || 55,
        p => { const f = D.chaleur(p); if (o.couleur) p.lastChild.setAttribute('stroke', o.couleur); return f; },
        (a, x, y, ang, f) => a(x / k, y / k, ang - 90, D.fenetre(f, 0, 1, 0.14) * (o.act ? D.borne(o.act.v, 0, 1) : 1)), o.h || 'a', o.dec);
      return tr;
    };

    /* le détendeur électronique : le symbole normalisé de la bibliothèque (jouerezo/voyage/symboles/
       detendeur_electronique--sans-reperes.svg), tracé recopié tel quel et posé sur un tube horizontal ;
       le blanc devient le papier de la charte, le trait est un peu plus épais */
    const detendeur = (g0, x, y, k) => {
      const g = D.el('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + k + ')' }, g0);
      const sw = { stroke: C.navy, 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
      D.el('circle', Object.assign({ cx: 0, cy: -12, r: 5.83, fill: C.papier }, sw), g);
      D.el('polygon', Object.assign({ points: '2,1 0,3 -2,1 -10,5 -10,-5 10,5 10,-5 -2,1 0,0 0,0', fill: C.papier }, sw), g);
      D.el('line', Object.assign({ x1: 0, y1: 0, x2: 0, y2: -6 }, sw), g);
      D.el('line', Object.assign({ x1: 10, y1: 0, x2: 11, y2: 0 }, sw), g);
      D.el('line', Object.assign({ x1: -10, y1: 0, x2: -11, y2: 0 }, sw), g);
      D.el('circle', { cx: 11, cy: 0, r: 1.5, fill: C.navy, stroke: 'none' }, g);
      D.el('circle', { cx: -11, cy: 0, r: 1.5, fill: C.navy, stroke: 'none' }, g);
      return g;
    };

    /* les ailettes d'une batterie, derrière l'air et les tubes */
    const ailettes = (g, x0, y1, y2, n, pas) => {
      for (let i = 0; i < n; i++) D.el('line', { x1: x0 + i * pas, y1, x2: x0 + i * pas, y2, stroke: C.trait, 'stroke-width': 2 }, g);
    };
    /* la turbine (dedans) : la roue tourne, a est son angle en degrés */
    const turbine = (g0, x, y, r) => {
      const g = D.el('g', { transform: 'translate(' + x + ' ' + y + ')' }, g0);
      D.el('circle', { r, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
      const roue = D.el('g', {}, g);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, roue);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, g);
      return a => roue.setAttribute('transform', 'rotate(' + (a % 360).toFixed(1) + ')');
    };
    /* un ventilateur ou une turbine qui tourne de deg degrés par seconde de l'horloge h */
    const tourne = (maj, deg, h) => { const cl = clocks[h || 'a']; anime.push(() => maj(cl.t * deg)); };

    /* les étiquettes, par-dessus tout ; chacune a sa place libre. c : la couche qui l'allume, coul : sa couleur allumée */
    const ecrire = (x, y, s, c, coul, o, parent) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(parent || d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700 });
      return t;
    };

    /* une image : tout avance selon le temps */
    const image = now => {
      const dt = Math.min(0.1, Math.max(0, now - temps)); temps = now;
      const k = Math.min(1, dt * 4);
      for (const n in S) S[n].v += (S[n].c - S[n].v) * k;
      for (const n in clocks) { const c = clocks[n]; c.v += (c.c - c.v) * Math.min(1, dt * 2.5); c.t += dt * c.v; c.dt = dt; }
      couches.forEach(L => { L.v += (L.cible - L.v) * Math.min(1, dt * 6); L.g.setAttribute('opacity', L.v.toFixed(2)); });
      anime.forEach(f => f());
    };
    /* le pas à pas : on allume ce qui agit, le reste continue de tourner en retrait ; montre : les couches
       déjà apparues (les autres sont cachées, leurs étiquettes aussi) */
    const allumer = (on, montre) => {
      const voit = c => !montre || montre.has(c);
      couches.forEach(L => { L.cible = !voit(L.c) ? 0 : on.has(L.c) ? 1 : RETRAIT; if (FIGE) L.v = L.cible; });
      etiquettes.forEach(e => {
        const oui = on.has(e.c);
        e.t.setAttribute('fill', oui ? e.coul : C.navy);
        e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400);
        e.t.setAttribute('display', voit(e.c) ? 'inline' : 'none');
      });
      image(temps);
    };
    const demarrer = () => {
      image(temps);
      if (FIGE) return;
      let vu = false;
      const boucle = now => {
        if (d.isConnected) { vu = true; image(now / 1000); }
        else if (vu) return;                               /* on a quitté le temps : la boucle s'arrête */
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
    };
    return { D, FIGE, S, clocks, horloge, vitesse, doux, viser, fond, couche, filer, chemin, tube, liquide, vapeur, bulles, souffle, chaleur,
      ailettes, detendeur, turbine, tourne, ecrire, allumer, demarrer, anime };
  }

  function reseauEnArbre() {
    const d = svg('0 0 900 660',
      'Un immeuble de bureaux en coupe : le groupe extérieur sur le toit, une colonne de tubes qui descend, une dérivation à chaque étage, deux unités intérieures par étage, et un bus de communication qui relie chaque unité au groupe. Le fluide descend la colonne et remonte par le tube de gaz ; l’air traverse le groupe et chaque unité.');
    const V = vivant(d, 900, 660), D = V.D, { couche, ecrire, souffle, chaleur, turbine, tourne, doux, viser, vitesse, horloge, tube, liquide, vapeur, bulles, chemin } = V;
    const CX = 340, XG = 322, XH = 340, XL = 358;           /* la colonne : gaz de retour, gaz chaud (3 tubes), liquide */
    const YB = [285, 438, 591];                              /* l'axe de chaque étage */
    const M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' }, G = { 'font-weight': 700 }, GM = Object.assign({}, G, M);
    ['f', 'ae', 'ql1', 'ql2', 'ql3', 'qg1', 'qg2', 'qg3', 'qh1', 'qh2', 'qh3', 'bus'].forEach(n => horloge(n, n === 'bus' ? 1 : 0));
    for (let i = 0; i < 6; i++) { horloge('u' + i, 0); horloge('a' + i, 0); horloge('uH' + i, 0); }

    V.fond();

    /* l'immeuble : le toit est son bord du haut ; deux planchers */
    D.el('rect', { x: 30, y: 176, width: 620, height: 458, rx: 6, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('path', { d: 'M30 329 H650 M30 482 H650', stroke: C.trait, 'stroke-width': 2, 'stroke-dasharray': '10 8', fill: 'none' }, d);

    /* le bus de communication : un fil de chaque côté, jusqu'au groupe ; gris, puis vert qui avance au pas 3 */
    const busPts = [[[44, 615], [44, 158], [135, 158]], [[636, 615], [636, 158], [545, 158]]];
    for (let i = 0; i < 6; i++) busPts.push(i % 2 ? [[620, YB[i >> 1] + 24], [636, YB[i >> 1] + 24]] : [[60, YB[i >> 1] + 24], [44, YB[i >> 1] + 24]]);
    let g = couche('bus');
    busPts.forEach(p => D.el('path', { d: trajet(p).d, fill: 'none', stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '6 5', 'stroke-linejoin': 'round' }, g));
    g = couche('busV');
    const busV = busPts.map(p => D.el('path', { d: trajet(p).d, fill: 'none', stroke: C.vert, 'stroke-width': 4, 'stroke-dasharray': '12 6', 'stroke-linejoin': 'round' }, g));
    V.anime.push(() => busV.forEach(p => p.setAttribute('stroke-dashoffset', (-(V.clocks.bus.t * 40) % 18).toFixed(1))));

    /* ---------- le groupe, sur le toit : compresseur, condenseur, hélice ---------- */
    g = couche('grp');
    D.el('rect', { x: 135, y: 46, width: 410, height: 130, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    V.ailettes(g, 398, 74, 146, 6, 12);
    tourne(D.ventilateur(g, 508, 110, 28), 260, 'ae');
    D.el('rect', { x: 160, y: 98, width: 100, height: 56, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    [97, 123].forEach((y, i) => souffle(g, [[380, y], [590, y]],
      { v: 75, pas: 46, dec: i * 0.5, h: 'ae', temp: (f, x) => D.lerp(0.62, 0.95, D.borne((x - 390) / 70, 0, 1)) }));
    const refoul = trajet([[210, 98], [210, 66], [456, 66], [456, 84]]);
    const cond = trajet([[456, 84], [396, 84], ...coude(396, 84, 110, -1), [396, 110], [456, 110], ...coude(456, 110, 136, 1), [456, 136], [396, 136]]);
    const [condV, condL] = couper(cond, 0.55);
    tube(g, refoul, 14, 8); vapeur(g, refoul, 8, 0.95, 85, 20, null, 'f');
    tube(g, cond, 12, 6);
    vapeur(g, condV, 6, 0.92, 55, 16, 0.55, 'f'); liquide(g, condL, 6, D.couleur(0.62), 30, 'f');

    /* ---------- la colonne : deux tubes côte à côte (gaz à gauche, liquide à droite), l'arbre ---------- */
    const gaz = (g2, pts, h) => { const t = trajet(pts); tube(g2, t, 18, 12); vapeur(g2, t, 12, 0.18, 55, 24, null, h); };
    const liq = (g2, pts, h, temp) => { const t = trajet(pts); tube(g2, t, 12, 6); liquide(g2, t, 6, D.couleur(temp), 30, h); };
    g = couche('col');
    gaz(g, [[XG, YB[0]], [XG, 176], [XG, 125], [260, 125]], 'qg1');          /* le gaz rentre au compresseur */
    gaz(g, [[XG, YB[1]], [XG, YB[0]]], 'qg2');
    gaz(g, [[XG, YB[2]], [XG, YB[1]]], 'qg3');
    liq(g, [[396, 136], [XL, 136], [XL, 176], [XL, YB[0]]], 'ql1', 0.62);      /* le liquide quitte le condenseur et descend */
    liq(g, [[XL, YB[0]], [XL, YB[1]]], 'ql2', 0.62);
    liq(g, [[XL, YB[1]], [XL, YB[2]]], 'ql3', 0.62);

    /* le troisième tube de la récupération d'énergie : le gaz chaud du refoulement, jusqu'à l'étage du bas */
    g = couche('hot');
    const hotL = [[[XH, 66], [XH, YB[0]]], [[XH, YB[0]], [XH, YB[1]]], [[XH, YB[1]], [XH, YB[2]]]];
    ['qh1', 'qh2', 'qh3'].forEach((h, i) => { const t = trajet(hotL[i]); tube(g, t, 14, 8); vapeur(g, t, 8, 0.92, 70, 22, null, h); });

    /* ---------- les six unités intérieures, leurs branches, leur détendeur ---------- */
    const unite = i => {
      const k = i >> 1, s = i & 1, y = YB[k], sg = s ? 1 : -1;
      const xf = s ? 510 : 170, xo = s ? 620 : 60, xd = s ? 430 : 250, xb = s ? 550 : 130;     /* face côté colonne, face extérieure, détendeur, fond de la batterie */
      const coil = trajet([[xf, y - 20], [xb, y - 20], ...coude(xb, y - 20, y + 20, sg), [xb, y + 20], [xf, y + 20]]);
      /* le boîtier, la batterie, la turbine */
      let gu = couche('uni' + i);
      D.el('rect', { x: Math.min(xf, xo), y: y - 30, width: 110, height: 60, rx: 8, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, gu);
      V.ailettes(gu, s ? 514 : 130, y - 26, y + 26, 4, 12);
      tourne(turbine(gu, s ? 596 : 84, y, 18), 320, 'a' + i);
      /* le détendeur électronique (symbole normalisé), sur le tube de liquide */
      gu = couche('det' + i);
      V.detendeur(gu, xd, y - 20, 1.2);
      /* en froid : le liquide arrive, bout dans la batterie ; le gaz repart */
      g = couche('brn' + i);
      liq(g, [[CX, y - 20], [xd - sg * 14, y - 20]], 'u' + i, 0.62);
      liq(g, [[xd + sg * 14, y - 20], [xf, y - 20]], 'u' + i, 0.08);
      gaz(g, [[xf, y + 20], [CX, y + 20]], 'u' + i);
      tube(g, coil, 12, 6);
      const [cL, cV] = couper(coil, 0.5);
      liquide(g, cL, 6, D.couleur(0.08), 30, 'u' + i); bulles(g, cL, 6, 30, 'u' + i); vapeur(g, cV, 6, 0.16, 55, 18, null, 'u' + i);
      souffle(g, [[s ? 616 : 64, y], [s ? 380 : 300, y]], { v: 75, pas: 46, h: 'a' + i,
        temp: (f, x) => D.lerp(0.6, 0.08, D.borne(s ? (574 - x) / 64 : (x - 106) / 64, 0, 1)) });
      /* en chauffage (étage du haut, au pas 6) : le gaz chaud arrive, se condense dans la batterie ; le liquide repart */
      if (k === 0) {
        g = couche('brnH' + i);
        const coilH = trajet([[xf, y + 20], [xb, y + 20], ...coude(xb, y + 20, y - 20, sg), [xb, y - 20], [xf, y - 20]]);
        gaz(g, [[CX, y + 20], [xf, y + 20]], 'uH' + i);
        liq(g, [[xf, y - 20], [CX, y - 20]], 'uH' + i, 0.62);
        tube(g, coilH, 12, 6);
        const [hV, hL] = couper(coilH, 0.5);
        vapeur(g, hV, 6, 0.9, 55, 18, 0.5, 'uH' + i); liquide(g, hL, 6, D.couleur(0.62), 30, 'uH' + i);
        souffle(g, [[s ? 616 : 64, y], [s ? 380 : 300, y]], { v: 75, pas: 46, h: 'a' + i,
          temp: (f, x) => D.lerp(0.35, 0.92, D.borne(s ? (574 - x) / 64 : (x - 106) / 64, 0, 1)) });
      }
    };
    for (let i = 0; i < 6; i++) unite(i);

    /* les joints Y de la colonne cachent le croisement des tubes ; au pas 6 le boîtier de répartition les remplace */
    g = couche('col');
    YB.forEach(y => D.el('circle', { cx: CX, cy: y, r: 22, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g));
    g = couche('bs');
    YB.forEach(y => D.el('rect', { x: 296, y: y - 34, width: 88, height: 68, rx: 8, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g));

    /* la chaleur retirée à la salle de réunion monte chauffer le bureau nord (pas 6) */
    chaleur(couche('chal'), [[196, 400], [196, 326]], { n: 2, v: 40, k: 0.9 });

    /* ---------- les étiquettes, par-dessus tout ; chacune a sa place libre ---------- */
    const U = [0, 1, 2, 3, 4, 5], uc = i => (i & 1) ? 565 : 115;
    ecrire(135, 34, 'groupe extérieur, en toiture', 'grp', C.navy, G);
    ecrire(210, 133, 'compr.', 'grp', C.navy, GM);
    ecrire(372, YB[0] - 54, 'colonne', 'lab1', C.froid);
    ecrire(372, YB[1] - 54, 'dérivation', 'lab1', C.navy);
    ecrire(62, YB[2] - 39, 'unité intérieure', 'lab1', C.navy);
    ecrire(440, YB[1] - 81, 'détendeur', 'lab2', C.orange, Object.assign({ 'font-weight': 700 }, M));
    ecrire(440, YB[1] - 54, 'électronique', 'lab2', C.orange, Object.assign({ 'font-weight': 700 }, M));
    ecrire(62, YB[0] - 81, 'pièce chaude :', 'lab2', C.chaud, G);
    ecrire(62, YB[0] - 54, 'gros débit', 'lab2', C.froid, G);
    ecrire(620, YB[2] - 81, 'pièce déjà fraîche :', 'lab2', C.chaud, Object.assign({ 'font-weight': 700 }, F));
    ecrire(620, YB[2] - 54, 'petit débit', 'lab2', C.froid, Object.assign({ 'font-weight': 700 }, F));
    U.forEach(i => ecrire(uc(i), YB[i >> 1] - 44, 'adresse ' + (i + 1), 'busV', C.vert, GM));
    ecrire(666, 515, 'bus de', 'busV', C.vert, G);
    ecrire(666, 542, 'communication', 'busV', C.vert, G);
    ecrire(666, 60, 'la demande monte :', 'cmp', C.navy, G);
    ecrire(666, 87, 'le compresseur', 'cmp', C.chaud, G);
    ecrire(666, 114, 'accélère', 'cmp', C.chaud, G);
    ecrire(666, 60, 'tout le réseau', 'mode', C.froid, G);
    ecrire(666, 87, 'dans le même mode', 'mode', C.froid, G);
    U.forEach(i => ecrire(uc(i), YB[i >> 1] - 44, 'froid', 'mode', C.froid, GM));
    ecrire(666, 190, 'deux tubes', 'mode', C.navy, G);
    ecrire(706, 219, 'gros tube : gaz', 'mode', C.froid, G);
    ecrire(706, 247, 'petit tube :', 'mode', C.eau, G);
    ecrire(706, 274, 'liquide', 'mode', C.eau, G);
    D.el('circle', { cx: 684, cy: 212, r: 12, fill: 'none', stroke: C.froid, 'stroke-width': 4 }, couche('mode'));
    D.el('circle', { cx: 684, cy: 240, r: 6, fill: 'none', stroke: C.eau, 'stroke-width': 4 }, couche('mode'));
    [[340, C.chaud, 'gaz chaud'], [368, C.eau, 'liquide'], [396, C.froid, 'gaz de retour']].forEach(([y, c, s]) => {
      D.el('path', { d: 'M666 ' + (y - 6) + ' H696', stroke: c, 'stroke-width': 5, fill: 'none' }, couche('rec'));
      ecrire(706, y, s, 'rec', c, G);
    });
    ecrire(392, YB[0] - 81, 'boîtier de', 'bs', C.navy, G);
    ecrire(392, YB[0] - 54, 'répartition', 'bs', C.navy, G);
    [[0, 'bureau nord', 'chaud', C.chaud], [1, 'salle de réunion', 'froid', C.froid], [2, 'accueil', 'froid', C.froid]].forEach(([k, a, b, c]) => {
      ecrire(666, YB[k] - 4, a, 'rec', c, G);
      ecrire(666, YB[k] + 23, b, 'rec', c, G);
    });
    ecrire(214, 376, 'chaleur', 'chal', C.ambre, G);

    /* ---------- le pas à pas : ce qui agit s'allume, le reste coule en retrait ---------- */
    const UNI = U.map(i => 'uni' + i), BRN = U.map(i => 'brn' + i), DET = U.map(i => 'det' + i);
    const PAS = [
      { vc: 0.8, dem: [1, 1, 1, 1, 1, 1], on: ['grp', 'col', 'lab1'].concat(BRN), plus: ['lab1'] },
      { vc: 0.8, dem: [1.5, 1, 1, 1, 1, 0.2], on: ['lab2'].concat(DET, UNI), plus: ['lab2'] },
      { vc: 0.8, dem: [1, 1, 1, 1, 1, 1], on: ['busV'], plus: ['busV'] },
      { vc: 1.5, dem: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2], on: ['grp', 'cmp'], plus: ['cmp'] },
      { vc: 1, dem: [1, 1, 1, 1, 1, 1], on: ['col', 'mode'].concat(BRN), plus: ['mode'] },
      { vc: 1, dem: [1, 1, 1, 1, 1, 1], chauffe: [1, 1, 0, 0, 0, 0], on: ['bs', 'hot', 'chal', 'rec', 'brnH0', 'brnH1', 'brn2', 'brn3', 'brn4', 'brn5'],
        plus: ['hot', 'bs', 'chal', 'rec', 'brnH0', 'brnH1'], sans: ['brn0', 'brn1'] }
    ];
    const BASE = ['bus', 'grp', 'col'].concat(UNI, DET, BRN);
    const peindre = k => {
      const P = PAS[k], vc = P.vc, chauffe = P.chauffe || [0, 0, 0, 0, 0, 0], froid = i => chauffe[i] ? 0 : P.dem[i];
      const somme = (a, b) => { let t = 0; for (let i = a; i <= b; i++) t += froid(i); return t; };
      V.allumer(new Set(P.on), new Set(BASE.filter(c => !(P.sans || []).includes(c)).concat(P.plus)));
      vitesse('f', vc); vitesse('ae', 0.5 + 0.5 * vc);
      vitesse('ql1', vc * somme(0, 5) / 6); vitesse('qg1', vc * somme(0, 5) / 6);
      vitesse('ql2', vc * somme(2, 5) / 4); vitesse('qg2', vc * somme(2, 5) / 4);
      vitesse('ql3', vc * somme(4, 5) / 2); vitesse('qg3', vc * somme(4, 5) / 2);
      vitesse('qh1', vc * (chauffe[0] + chauffe[1]) / 2); vitesse('qh2', 0); vitesse('qh3', 0);
      for (let i = 0; i < 6; i++) { vitesse('u' + i, vc * froid(i)); vitesse('uH' + i, vc * chauffe[i]); vitesse('a' + i, chauffe[i] ? 1 : 0.5 + 0.5 * Math.min(P.dem[i], 1.5)); }
    };
    V.demarrer();

    const etapes = [
      { titre: 'Le groupe pousse le fluide dans le réseau',
        dire: 'Sur le toit, le groupe envoie le fluide dans une colonne qui descend. À chaque étage, une dérivation — un joint Y — le partage entre deux unités : le réseau a la forme d’un arbre.',
        peindre: () => peindre(0) },
      { titre: 'Chaque pièce règle son propre débit',
        dire: 'Dans chaque unité intérieure, un détendeur électronique s’ouvre plus ou moins. Pièce très chaude : grand débit. Pièce déjà fraîche : il se ferme presque. Le même réseau sert tout le monde, chacun selon son besoin.',
        peindre: () => peindre(1) },
      { titre: 'Le bus dit au groupe ce que chaque pièce demande',
        dire: 'Un câble de communication, le bus, relie chaque unité au groupe. Chaque unité y a son adresse : elle annonce sa demande, et la télécommande se rattache à la bonne unité.',
        peindre: () => peindre(2) },
      { titre: 'Le compresseur suit la demande totale',
        dire: 'Le groupe additionne les demandes. Quand elles montent, son compresseur à vitesse variable accélère : le débit de fluide augmente dans tout le réseau.',
        peindre: () => peindre(3) },
      { titre: 'Deux tubes : tout le monde dans le même mode',
        dire: 'Avec un réseau à deux tubes — un gros pour le gaz, un petit pour le liquide —, le groupe décide pour tout l’immeuble : tout en froid, ou tout en chaud.',
        peindre: () => peindre(4) },
      { titre: 'Récupération d’énergie : froid et chaud ensemble',
        dire: 'Avec trois tubes et un boîtier de répartition par zone, chaque zone choisit. La chaleur retirée dans la salle de réunion sert à chauffer le bureau nord : l’immeuble se partage son énergie.',
        peindre: () => peindre(5) }
    ];
    return pasAPas(d, etapes, 'Sur le dessin, chaque trait du réseau regroupe les deux tubes (gaz et liquide). Six pas : le fluide, la demande de chaque pièce, le bus, le compresseur, puis les deux façons de choisir le mode.');
  }

  /* Temps 5 : ce qu'on maîtrise du groupe à la dernière unité, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 860 380',
      'Récapitulatif : le groupe extérieur est relié par un réseau de tubes en arbre à plusieurs unités intérieures, et par un bus de communication qui donne une adresse à chacune. Trois contrôles à la mise en service : la charge calculée par tronçon, le brasage sous azote, l’adressage de chaque unité.');
    d.innerHTML = `
<rect x="10" y="10" width="840" height="360" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<rect x="30" y="70" width="190" height="110" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(125, 102, 'Groupe extérieur', { a: 'middle', t: 16 })}
${tx(125, 128, 'compresseur Inverter', { a: 'middle', t: 14, g: false, c: C.gris })}
${tx(125, 150, 'batterie · ventilateurs', { a: 'middle', t: 14, g: false, c: C.gris })}

<path d="M220 125 H330 M330 65 V185 M330 65 H590 M330 125 H590 M330 185 H590" fill="none" stroke="${C.froid}" stroke-width="6" stroke-linejoin="round"/>
<circle cx="330" cy="125" r="8" fill="${C.navy}"/>
${tx(460, 111, 'réseau de tubes', { a: 'middle', t: 15, c: C.froid })}

<rect x="590" y="40" width="210" height="50" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(695, 62, 'Unité intérieure', { a: 'middle', t: 15 })}
${tx(695, 80, 'détendeur · adresse 1', { a: 'middle', t: 13, g: false, c: C.gris })}
<rect x="590" y="100" width="210" height="50" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(695, 122, 'Unité intérieure', { a: 'middle', t: 15 })}
${tx(695, 140, 'détendeur · adresse 2', { a: 'middle', t: 13, g: false, c: C.gris })}
<rect x="590" y="160" width="210" height="50" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(695, 182, 'Unité intérieure', { a: 'middle', t: 15 })}
${tx(695, 200, 'et des dizaines d’autres', { a: 'middle', t: 13, g: false, c: C.gris })}

<path d="M125 180 V240 H830 V65 H800 M830 125 H800 M830 185 H800" fill="none" stroke="${C.vert}" stroke-width="3" stroke-dasharray="10 6" stroke-linejoin="round"/>
${tx(470, 264, 'bus de communication : une adresse par unité', { a: 'middle', t: 15, c: C.vert })}

${tx(440, 210, 'deux tubes : le même mode partout', { a: 'middle', t: 14, g: false })}
${tx(440, 229, 'avec boîtiers : froid et chaud ensemble', { a: 'middle', t: 14, g: false })}

${tx(30, 296, 'À la mise en service', { t: 15 })}
<rect x="30" y="308" width="250" height="44" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
${tx(155, 335, 'charge calculée par tronçon', { a: 'middle', t: 15 })}
<rect x="305" y="308" width="250" height="44" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
${tx(430, 335, 'brasage sous azote', { a: 'middle', t: 15 })}
<rect x="580" y="308" width="250" height="44" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
${tx(705, 335, 'adressage de chaque unité', { a: 'middle', t: 15 })}`;
    return d;
  }

  return { reseauEnArbre, recapitulatif };
})();
