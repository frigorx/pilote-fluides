/* CartoClim 3.4 — scènes du multisplit.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : un seul groupe dehors, trois pièces dedans, en
   cinq pas (une seule unité en marche, les trois, une unité éteinte qui reste dans le circuit, la longueur
   totale des liaisons, les repères inversés) — avec le FLUIDE et l'AIR qui circulent (« Animer les réseaux »,
   04/10/2026).
   C'est un schéma d'INSTALLATION (qui est relié à quoi), pas la boucle du cycle : la croix du frigoriste ne
   s'y applique pas, le cycle lui-même est dessiné à la station 3.2. Dehors à gauche, dedans à droite, le mur
   entre les deux ; chaque pièce a sa paire de tubes (petit = liquide, gros = gaz), repérée A, B ou C.
   Temps 5 : ce qu'on raccorde pour chaque pièce.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · le fluide : le compresseur pousse la vapeur chaude dans le condenseur, le liquide descend l'ARBRE de
     distribution (un tronc, une branche par pièce) ; seule la branche ouverte coule, les autres restent
     pleines mais immobiles ; le gaz revient par les gros tubes, se rejoint dans un tronc et rentre au
     compresseur. LIQUIDE = tube plein à reflets, VAPEUR = petites molécules séparées ; dans l'évaporateur
     de la pièce le liquide bout (bulles) ;
   · le compresseur Inverter : la vitesse de tout le fluide suit la demande (ralenti, moyenne, plein régime) ;
   · l'air : des chevrons — dehors à travers le condenseur (il sort chaud), dans chaque pièce en marche à
     travers l'unité (il sort froid) ; les ventilateurs et les turbines tournent, ou s'arrêtent avec la pièce ;
   · les repères inversés : les deux paires de tubes se croisent ; le froid arrive dans la mauvaise pièce.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js). Aucun texte sur un tracé, ni sur le trajet d'un
   chevron ou d'une molécule : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21
   dans 1 000 : au moins 18,7 px quand la scène est devant, à 1 280 px (colonne de droite : 19 rem). */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const L = ['A', 'B', 'C'];
  const FLOCON = SceneKit.pictos.DESSINS.froid;

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

    /* mélange liquide + vapeur (petit tube en mode froid, après le détendeur) : le liquide reste un corps continu
       — tube plein, reflets qui filent — et la vapeur y file en poches allongées de longueurs inégales, nées au
       détendeur : jamais des billes isolées sur un tube vide. Les poches suivent le trajet (même vivant) et l'horloge. */
    const POCHES = [9, 5, 12, 6, 10, 4, 8];
    const melange = (g, tr, int, couleur, v, h) => {
      chemin(g, tr, { stroke: couleur, 'stroke-width': int, opacity: 0.92 });
      const reflet = chemin(g, tr, { stroke: C.papier, 'stroke-width': 1.3, 'stroke-dasharray': '12 30', opacity: 0.4 });
      const cl = clocks[h || 'f'];
      anime.push(() => reflet.setAttribute('stroke-dashoffset', (-(cl.t * v) % 42).toFixed(1)));
      filer(g, tr, Math.max(1, Math.round(tr.L / 24)), v * 1.2,
        (p, i) => Object.assign(D.el('line', { stroke: C.papier, 'stroke-linecap': 'round', 'stroke-width': (int * (0.5 + 0.12 * (i % 3))).toFixed(1) }, p), { _l: POCHES[i % POCHES.length] }),
        (b, x, y, ang, f) => {
          const dx = Math.cos(ang * Math.PI / 180) * b._l / 2, dy = Math.sin(ang * Math.PI / 180) * b._l / 2;
          b.setAttribute('x1', (x - dx).toFixed(1)); b.setAttribute('y1', (y - dy).toFixed(1));
          b.setAttribute('x2', (x + dx).toFixed(1)); b.setAttribute('y2', (y + dy).toFixed(1));
          b.setAttribute('opacity', (0.95 * D.fenetre(f, 0, 1, 0.06)).toFixed(2));
        }, h || 'f');
    };

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
    return { D, FIGE, S, clocks, horloge, vitesse, doux, viser, fond, couche, filer, chemin, tube, liquide, melange, vapeur, bulles, souffle, chaleur,
      ailettes, detendeur, turbine, tourne, ecrire, allumer, demarrer, anime };
  }

  function plusieursPieces() {
    const d = svg('0 0 1000 640',
      'Un multisplit : une seule unité extérieure à gauche, trois pièces A, B et C à droite, chacune avec son unité intérieure reliée au groupe par deux tubes repérés, un petit et un gros. Le mur sépare le dehors du dedans. Le compresseur du groupe pousse le fluide dans un arbre de distribution : une branche par pièce, seule la branche ouverte coule ; l’air traverse le condenseur dehors et les unités en marche dedans.');
    const V = vivant(d, 1000, 640), D = V.D, { couche, ecrire, souffle, turbine, tourne, doux, viser, vitesse, horloge, tube, liquide, melange, vapeur, bulles, chemin } = V;
    const YC = [148, 332, 516];                              /* le centre de chaque pièce et de sa paire de vannes */
    const CROIX = [1, 0, 2];                                 /* la paire A va à la pièce B quand les repères sont inversés */
    const M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' }, G = { 'font-weight': 700 }, GM = Object.assign({}, G, M), GF = Object.assign({}, G, F);
    const marche = [0, 1, 2].map(k => doux('m' + k, 0)), croise = [0, 1, 2].map(r => doux('x' + r, 0)), ambre = doux('ambre', 0);
    ['f', 'ae', 'LA', 'LB1', 'LC', 'GA', 'GC', 'GBC'].forEach(n => horloge(n, 0));
    [0, 1, 2].forEach(k => { horloge('p' + k, 0); horloge('q' + k, 0); horloge('a' + k, 0); });

    V.fond();
    D.el('line', { x1: 428, y1: 56, x2: 428, y2: 620, stroke: C.gris, 'stroke-width': 10, 'stroke-dasharray': '26 12' }, d);

    /* ---------- le groupe : condenseur, hélice, compresseur, et l'arbre de distribution ---------- */
    let g = couche('grp');
    D.el('rect', { x: 24, y: 60, width: 376, height: 548, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    V.ailettes(g, 92, 132, 244, 9, 9);
    tourne(D.ventilateur(g, 240, 188, 32), 260, 'ae');
    D.el('rect', { x: 56, y: 330, width: 96, height: 62, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    /* l'air du dehors : il traverse le condenseur et sort chaud */
    [167, 209].forEach((y, i) => souffle(g, [[12, y], [292, y]],
      { v: 75, pas: 46, dec: i * 0.5, h: 'ae', temp: (f, x) => D.lerp(0.62, 0.95, D.borne((x - 84) / 80, 0, 1)) }));

    /* le parcours du fluide (mode froid), dans le sens du fluide : le condenseur est alimenté par le haut */
    const refoul = trajet([[56, 361], [34, 361], [34, 146], [84, 146]]);
    const cond = trajet([[84, 146], [164, 146], ...coude(164, 146, 188, 1), [164, 188], [84, 188], ...coude(84, 188, 230, -1), [84, 230], [164, 230]]);
    const [condV, condL] = couper(cond, 0.55);
    const T = {                                              /* le tronc et ses branches : [points, horloge] */
      gA: [[[304, 174], [304, 331]], 'GA'], gC: [[[304, 542], [304, 358]], 'GC'], gBC: [[[304, 358], [304, 331]], 'GBC'],
      gs: [[[304, 331], [152, 331]], 'f'],
      lf: [[[164, 230], [336, 230]], 'f'], lA: [[[336, 230], [336, 122]], 'LA'], lB: [[[336, 230], [336, 306]], 'LB1'], lC: [[[336, 306], [336, 490]], 'LC']
    };
    const gaz = (g2, pts, h) => { const t = trajet(pts); tube(g2, t, 18, 12); vapeur(g2, t, 12, 0.18, 55, 26, null, h); };
    const liq = (g2, pts, h, temp) => { const t = trajet(pts); tube(g2, t, 12, 6); liquide(g2, t, 6, D.couleur(temp), 30, h); };
    ['gA', 'gC', 'gBC', 'gs'].forEach(n => gaz(g, T[n][0], T[n][1]));
    tube(g, refoul, 16, 10); vapeur(g, refoul, 10, 0.95, 85, 22, null, 'f');
    tube(g, cond, 14, 8);
    vapeur(g, condV, 8, 0.92, 55, 20, 0.55, 'f'); liquide(g, condL, 8, D.couleur(0.62), 30, 'f');
    ['lf', 'lA', 'lB', 'lC'].forEach(n => liq(g, T[n][0], T[n][1], 0.62));

    /* ---------- les paires de tubes, de la vanne à la pièce (elles se croisent au dernier pas) ---------- */
    const trL = [], trG = [], trGr = [];
    const pairPts = (r, dy) => { const yv = YC[r] + dy, yt = D.lerp(yv, YC[CROIX[r]] + dy, croise[r].v); return [[400, yv], [432, yv], [472, yt], [552, yt]]; };
    [0, 1, 2].forEach(r => { trL[r] = trajetVivant(pairPts(r, -26)); trG[r] = trajetVivant(pairPts(r, 26)); trGr[r] = trajetVivant(pairPts(r, 26).reverse()); });
    V.anime.push(() => [0, 1, 2].forEach(r => { trL[r].maj(pairPts(r, -26)); trG[r].maj(pairPts(r, 26)); trGr[r].maj(pairPts(r, 26).reverse()); }));
    [0, 1, 2].forEach(r => {
      g = couche('p' + r);
      const yL = YC[r] - 26, yG = YC[r] + 26;
      /* la longueur compte : une gaine ambre derrière les tubes quand on additionne les liaisons */
      const amb = [chemin(g, trL[r], { stroke: C.ambre, 'stroke-width': 26, 'stroke-linecap': 'round' }), chemin(g, trG[r], { stroke: C.ambre, 'stroke-width': 34, 'stroke-linecap': 'round' })];
      V.anime.push(() => amb.forEach(p => p.setAttribute('opacity', (0.5 * ambre.v).toFixed(2))));
      /* les branches du groupe : gaz (gros) du tronc à la vanne, liquide (petit) avec son détendeur */
      const sg = trajet([[388, yG], [304, yG]]);
      tube(g, sg, 18, 12); vapeur(g, sg, 12, 0.18, 55, 26, null, 'p' + r);
      liq(g, [[336, yL], [349, yL]], 'p' + r, 0.62);
      { const t = trajet([[375, yL], [388, yL]]); tube(g, t, 12, 6); melange(g, t, 6, D.couleur(0.08), 30, 'p' + r); }   /* après le détendeur : un mélange */
      V.detendeur(g, 362, yL, 1.3);
      [yL, yG].forEach(y => D.el('rect', { x: 388, y: y - 7, width: 12, height: 14, fill: C.papier, stroke: C.navy, 'stroke-width': 2.5 }, g));
      /* les deux tubes de la pièce : gros = gaz, petit = liquide */
      tube(g, trG[r], 18, 12); vapeur(g, trGr[r], 12, 0.18, 55, 26, null, 'p' + r);
      tube(g, trL[r], 12, 6); melange(g, trL[r], 6, D.couleur(0.08), 30, 'p' + r);
    });

    /* ---------- les pièces : une unité intérieure chacune ---------- */
    const piece = k => {
      const yc = YC[k], gk = couche('r' + k);
      D.el('rect', { x: 462, y: yc - 84, width: 522, height: 176, rx: 12, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, gk);
      const teinte = D.el('rect', { x: 462, y: yc - 84, width: 522, height: 176, rx: 12, fill: C.froid, stroke: 'none' }, gk);
      const bord = D.el('rect', { x: 462, y: yc - 84, width: 522, height: 176, rx: 12, fill: 'none', stroke: C.froid, 'stroke-width': 4 }, gk);
      V.anime.push(() => { teinte.setAttribute('fill-opacity', (0.1 * marche[k].v).toFixed(3)); bord.setAttribute('opacity', marche[k].v.toFixed(2)); });
      D.el('rect', { x: 552, y: yc - 48, width: 288, height: 96, rx: 10, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, gk);
      V.ailettes(gk, 560, yc - 40, yc + 40, 13, 11);
      tourne(turbine(gk, 780, yc, 30), 320, 'a' + k);
      souffle(gk, [[474, yc], [978, yc]], { v: 75, pas: 46, h: 'a' + k, act: marche[k], temp: (f, x) => D.lerp(0.6, 0.08, D.borne((x - 560) / 140, 0, 1)) });
      const coil = trajet([[552, yc - 26], [700, yc - 26], ...coude(700, yc - 26, yc + 26, 1), [700, yc + 26], [552, yc + 26]]);
      tube(gk, coil, 14, 8);
      const [cL, cV] = couper(coil, 0.5);
      liquide(gk, cL, 8, D.couleur(0.08), 30, 'q' + k); bulles(gk, cL, 8, 30, 'q' + k); vapeur(gk, cV, 8, 0.16, 55, 20, null, 'q' + k);
      const fl = D.el('g', { transform: 'translate(668 ' + (yc - 80) + ') scale(.26)', fill: 'none', stroke: C.froid, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, couche('dem' + k));
      fl.innerHTML = FLOCON;
    };
    [0, 1, 2].forEach(piece);

    /* ---------- les étiquettes, par-dessus tout ; chacune a sa place libre ---------- */
    ecrire(420, 44, 'dehors', null, null, Object.assign({ fill: C.gris }, GF));
    ecrire(436, 44, 'dedans', null, null, Object.assign({ fill: C.gris }, G));
    ecrire(40, 88, 'UNITÉ EXTÉRIEURE', 'grp', C.navy, { 'font-size': 22, 'font-weight': 700 });
    ecrire(40, 122, 'un seul mode : froid', null, null, Object.assign({ fill: C.froid }, G));
    ecrire(56, 266, 'condenseur et hélice', 'grp', C.chaud);
    ecrire(110, 422, 'compresseur', 'grp', C.navy, GM);
    ecrire(110, 449, 'Inverter', null, null, Object.assign({ fill: C.gris }, M));
    ecrire(56, 478, 'au ralenti', 'vit0', C.chaud, G);
    ecrire(56, 478, 'à vitesse moyenne', 'vit1', C.chaud, G);
    ecrire(56, 478, 'à plein régime', 'vit2', C.chaud, G);
    ecrire(56, 515, 'longueur totale', 'm4', C.ambre, G);
    ecrire(56, 542, '= A + B + C', 'm4', C.ambre, G);
    ecrire(56, 515, 'A branché sur B,', 'm5', C.rouge, G);
    ecrire(56, 542, 'B branché sur A', 'm5', C.rouge, G);
    ecrire(560, 44, 'petit tube : liquide + vapeur', null, null, Object.assign({ fill: C.gris }, G));
    ecrire(976, 44, 'gros tube : gaz', null, null, Object.assign({ fill: C.gris }, GF));
    [0, 1, 2].forEach(k => {
      const yc = YC[k];
      ecrire(414, yc + 8, L[k], null, null, Object.assign({ 'font-size': 22 }, GM));
      ecrire(568, yc - 58, 'PIÈCE ' + L[k], 'r' + k, C.navy, G);
      ecrire(704, yc - 58, 'demande du froid', 'dem' + k, C.froid, G);
      ecrire(568, yc + 76, 'unité ' + L[k], 'r' + k, C.froid);
      ecrire(910, yc - 22, 'air frais', 'air' + k, C.froid, GM);
      ecrire(976, yc + 77, 'toujours raccordée', 'ete' + k, C.gris, GF);
      ecrire(976, yc + 50, 'éteinte :', 'ete' + k, C.gris, GF);
      ecrire(976, yc + 77, 'froid demandé par ' + L[CROIX[k]], 'req' + k, C.rouge, GF);
      ecrire(976, yc + 77, 'ne reçoit rien', 'rien' + k, C.rouge, GF);
    });

    /* ---------- le pas à pas : ce que fait la carte du groupe, étape par étape ---------- */
    const PAS = [
      { marche: [0, 1, 0], perm: [0, 1, 2], comp: 0.45, vit: 'vit0', on: ['grp', 'p1', 'r1', 'dem1', 'air1'], mots: ['dem1', 'air1', 'vit0'] },
      { marche: [1, 1, 1], perm: [0, 1, 2], comp: 1.1, vit: 'vit2', on: ['grp', 'p0', 'p1', 'p2', 'r0', 'r1', 'r2', 'dem0', 'dem1', 'dem2', 'air0', 'air1', 'air2'], mots: ['dem0', 'dem1', 'dem2', 'air0', 'air1', 'air2', 'vit2'] },
      { marche: [1, 1, 0], perm: [0, 1, 2], comp: 0.75, vit: 'vit1', on: ['grp', 'p0', 'p1', 'r0', 'r1', 'dem0', 'dem1', 'air0', 'air1', 'ete2'], mots: ['dem0', 'dem1', 'air0', 'air1', 'ete2', 'vit1'] },
      { marche: [0, 0, 0], perm: [0, 1, 2], comp: 0, ambre: 1, on: ['p0', 'p1', 'p2', 'm4'], mots: ['m4'] },
      { marche: [1, 0, 0], perm: [1, 0, 2], comp: 0.45, vit: 'vit0', on: ['grp', 'p0', 'p1', 'r0', 'r1', 'dem1', 'req0', 'rien1', 'm5'], mots: ['dem1', 'req0', 'rien1', 'm5', 'vit0'] }
    ];
    const BASE = ['grp', 'p0', 'p1', 'p2', 'r0', 'r1', 'r2'];
    const peindre = k => {
      const P = PAS[k], vc = P.comp, ouvert = r => P.marche[P.perm[r]] ? vc : 0, tout = P.marche.some(Boolean) ? vc : 0;
      V.allumer(new Set(P.on.concat(P.mots)), new Set(BASE.concat(P.mots)));
      vitesse('f', tout); vitesse('ae', tout ? 0.5 + 0.5 * vc : 0);
      vitesse('LA', ouvert(0)); vitesse('LB1', Math.max(ouvert(1), ouvert(2))); vitesse('LC', ouvert(2));
      vitesse('GA', ouvert(0)); vitesse('GC', ouvert(2)); vitesse('GBC', Math.max(ouvert(1), ouvert(2)));
      [0, 1, 2].forEach(r => {
        vitesse('p' + r, ouvert(r)); vitesse('q' + r, P.marche[r] ? vc : 0); vitesse('a' + r, P.marche[r] ? 1 : 0);
        viser('m' + r, P.marche[r]); viser('x' + r, P.perm[r] !== r ? 1 : 0);
      });
      viser('ambre', P.ambre || 0);
    };
    V.demarrer();

    const etapes = [
      { titre: 'Une seule pièce demande du froid',
        dire: 'La pièce B demande du froid. Sa carte le dit au groupe, qui ouvre la branche B et elle seule : le fluide ne va que vers cette pièce. Le compresseur Inverter tourne au ralenti, la demande est petite. Les deux autres unités restent à l’arrêt.',
        peindre: () => peindre(0) },
      { titre: 'Les trois pièces demandent du froid',
        dire: 'Les trois branches s’ouvrent. Le compresseur, toujours le même, accélère pour servir tout le monde : sa vitesse suit la somme des demandes.',
        peindre: () => peindre(1) },
      { titre: 'Une pièce s’éteint : ses tubes restent',
        dire: 'L’unité C s’arrête et sa branche se ferme. Elle n’est pas débranchée pour autant : ses deux tubes restent raccordés au circuit et comptent dans la charge. Le compresseur ralentit pour les deux pièces restantes.',
        peindre: () => peindre(2) },
      { titre: 'Toutes les liaisons comptent',
        dire: 'Le groupe est préchargé pour une longueur totale de liaisons : celle de tous les couples de tubes mis bout à bout. Si l’installation en demande davantage, on ajoute du fluide, comme la notice le dit.',
        peindre: () => peindre(3) },
      { titre: 'Repères inversés : la mauvaise pièce est servie',
        dire: 'Les tubes de la pièce A sont sur le raccord B, et ceux de B sur le raccord A. La pièce B demande du froid, le groupe ouvre son raccord B… et le froid arrive dans la pièce A. La machine démarre, mais elle sert la mauvaise pièce.',
        peindre: () => peindre(4) }
    ];
    return pasAPas(d, etapes, 'Mode froid. Le mode est le même pour toutes les pièces : une seule vanne 4 voies dans le groupe inverse le fluide pour tout le monde, voir la station 2.6.');
  }

  /* Temps 5 : ce qu'on raccorde pour chaque pièce, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 360',
      'Récapitulatif : un groupe extérieur relié à trois unités intérieures A, B et C ; chaque pièce a son petit tube liquide, son gros tube gaz, son câble de liaison et son tuyau de condensats, le même repère aux deux bouts.');
    const R = [70, 160, 250];
    d.innerHTML = `
<defs>
  <marker id="rc-eau" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.eau}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="340" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<line x1="350" y1="44" x2="350" y2="300" stroke="${C.gris}" stroke-width="8" stroke-dasharray="20 8"/>
<text x="350" y="36" text-anchor="middle" font-size="13" fill="${C.gris}">le mur</text>
<rect x="20" y="20" width="200" height="280" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="120" y="48" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Groupe extérieur</text>
<text x="108" y="116" text-anchor="middle" font-size="14" fill="${C.gris}">un seul compresseur</text>
<text x="108" y="134" text-anchor="middle" font-size="14" fill="${C.gris}">un seul mode pour tous</text>
<text x="108" y="210" text-anchor="middle" font-size="14" fill="${C.gris}">une branche par pièce</text>
<text x="108" y="228" text-anchor="middle" font-size="14" fill="${C.gris}">des vannes repérées</text>
${R.map((y, i) => `
<text x="200" y="${y + 6}" text-anchor="middle" font-size="18" font-weight="700" fill="${C.navy}">${L[i]}</text>
<line x1="220" y1="${y - 18}" x2="480" y2="${y - 18}" stroke="${C.froid}" stroke-width="4"/>
<line x1="220" y1="${y - 4}" x2="480" y2="${y - 4}" stroke="${C.froid}" stroke-width="9"/>
<line x1="220" y1="${y + 12}" x2="480" y2="${y + 12}" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<rect x="480" y="${y - 32}" width="160" height="64" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="560" y="${y - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Unité ${L[i]}</text>
<text x="560" y="${y + 16}" text-anchor="middle" font-size="13" fill="${C.gris}">dans la pièce ${L[i]}</text>
<line x1="640" y1="${y}" x2="706" y2="${y}" stroke="${C.eau}" stroke-width="3" marker-end="url(#rc-eau)"/>
<text x="718" y="${y + 5}" font-size="13" font-weight="700" fill="${C.eau}">condensats</text>`).join('')}
<text x="410" y="322" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">le même repère aux deux bouts : A dehors, A dedans</text>
<line x1="20" y1="341" x2="56" y2="341" stroke="${C.froid}" stroke-width="4"/>
<text x="64" y="345" font-size="13" fill="${C.gris}">petit tube : liquide + vapeur</text>
<line x1="270" y1="341" x2="306" y2="341" stroke="${C.froid}" stroke-width="9"/>
<text x="314" y="345" font-size="13" fill="${C.gris}">gros tube : gaz</text>
<line x1="440" y1="341" x2="476" y2="341" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<text x="484" y="345" font-size="13" fill="${C.gris}">câble de liaison</text>
<line x1="610" y1="341" x2="646" y2="341" stroke="${C.eau}" stroke-width="4"/>
<text x="654" y="345" font-size="13" fill="${C.gris}">tuyau de condensats</text>`;
    return d;
  }

  return { plusieursPieces, recapitulatif };
})();
