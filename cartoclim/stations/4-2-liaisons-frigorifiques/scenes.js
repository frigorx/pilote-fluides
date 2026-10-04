/* CartoClim 4.2 — scènes des liaisons frigorifiques.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : la liaison de bout en bout, en six pas — les
   deux tubes, leur isolant, les cotes L et H, puis trois cas : liaison courte (la précharge suffit), plus
   longue (appoint pesé), au-delà de la notice (interdit). Aucune valeur chiffrée : les lettres L et H, et
   la mention « notice ». L'unité extérieure GLISSE d'un cas à l'autre et les tubes s'allongent avec elle.
   Temps 5 : ce qu'on vérifie sur une liaison, en cinq cartes.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui traversent l'unité intérieure (l'air de la pièce entre tiède, ressort froid) et
     l'unité extérieure (il en sort chaud) ; la turbine et l'hélice tournent ;
   · le fluide dans les deux tubes : le GAZ file de l'unité intérieure vers l'extérieure dans le gros tube
     (petites molécules séparées), le LIQUIDE revient dans le petit (tube plein, reflets) ;
   · le pas à pas allume ce qui agit, le reste continue en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js). Aucun texte sur un tracé, ni sur le trajet d'un
   chevron ou d'une molécule : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21
   dans 1 000 : au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

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

  function liaison() {
    const d = svg('0 0 1000 640',
      'Coupe schématique d’une liaison frigorifique : l’unité intérieure à gauche du mur, l’unité extérieure à droite, reliées par un petit tube pour le liquide (mêlé de vapeur en mode froid) et un gros tube pour le gaz, chacun dans son isolant. La longueur L se mesure le long des tubes, le dénivelé H est la différence de hauteur entre les deux unités. L’air traverse chaque unité ; le gaz file vers l’extérieur dans le gros tube, le liquide revient dans le petit.');
    const V = vivant(d, 1000, 640), D = V.D, { couche, ecrire, souffle, turbine, tourne, doux, viser, chemin } = V;
    const GY = 440, XE = [680, 750, 820], XM = [200, 500, 800];    /* le sol ; l'unité extérieure dans les trois cas ; le repère de L sur la règle */
    const M = { 'text-anchor': 'middle' }, G = { 'font-weight': 700 };
    const sXe = doux('xe', XE[0]), sXm = doux('xm', XM[0]), zone = [doux('z0', 0), doux('z1', 0), doux('z2', 0)], rouge = doux('rouge', 0);
    const defs = D.el('defs', {}, d);
    D.el('marker', { id: 'cote42', markerUnits: 'userSpaceOnUse', markerWidth: 14, markerHeight: 14, refX: 12, refY: 7, orient: 'auto-start-reverse' }, defs)
      .appendChild(D.el('path', { d: 'M0 0 L14 7 L0 14 z', fill: C.navy }));

    V.fond();

    /* dedans, le mur, dehors */
    D.el('rect', { x: 250, y: 30, width: 26, height: GY - 30, fill: C.creme, stroke: C.gris, 'stroke-width': 2 }, d);
    D.el('line', { x1: 20, y1: GY, x2: 250, y2: GY, stroke: C.gris, 'stroke-width': 4 }, d);
    D.el('line', { x1: 276, y1: GY, x2: 980, y2: GY, stroke: C.gris, 'stroke-width': 4 }, d);

    /* la liaison : les trajets suivent l'unité extérieure qui glisse (gaz : dedans → dehors ; liquide : dehors → dedans) */
    const gazPts = xe => [[250, 125], [600, 125], [600, 376], [xe, 376]];
    const liqPts = xe => [[250, 158], [566, 158], [566, 411], [xe, 411]];
    const cotePts = xe => [[250, 76], [636, 76], [636, 322], [xe, 322]];
    const trG = trajetVivant(gazPts(XE[0])), trL = trajetVivant(liqPts(XE[0])), trLr = trajetVivant(liqPts(XE[0]).reverse()), trC = trajetVivant(cotePts(XE[0]));
    const glisse = [];                                      /* les groupes qui suivent l'unité extérieure */
    const suit = parent => { const g = D.el('g', {}, parent); glisse.push(g); return g; };
    V.anime.push(() => {
      const xe = sXe.v, dx = (xe - XE[0]).toFixed(1);
      trG.maj(gazPts(xe)); trL.maj(liqPts(xe)); trLr.maj(liqPts(xe).reverse()); trC.maj(cotePts(xe));
      glisse.forEach(g => g.setAttribute('transform', 'translate(' + dx + ' 0)'));
    });

    /* l'unité intérieure : l'air de la pièce entre par le haut, traverse la batterie et la turbine, ressort froid */
    let g = couche('ui');
    D.el('rect', { x: 24, y: 70, width: 226, height: 130, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    V.ailettes(g, 168, 82, 122, 6, 12);
    tourne(turbine(g, 200, 158, 26), 320);
    [186, 218].forEach((x, i) => souffle(g, [[x, 70], [x, 250]],
      { v: 75, pas: 44, dec: i * 0.5, temp: (f, xx, y) => y < 84 ? 0.62 : y > 128 ? 0.08 : D.lerp(0.62, 0.08, (y - 84) / 44) }));

    /* l'unité extérieure : batterie, hélice, air qui en sort chaud ; elle glisse avec la longueur */
    g = couche('ue');
    let gu = suit(g);
    D.el('rect', { x: 680, y: 330, width: 130, height: 110, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, gu);
    V.ailettes(gu, 696, 342, 428, 4, 10);
    tourne(D.ventilateur(gu, 770, 385, 24), 260);
    [356, 416].forEach((y, i) => souffle(gu, [[690, y], [830, y]], { v: 75, pas: 46, dec: i * 0.5, temp: (f, x) => D.lerp(0.6, 0.95, D.borne((x - 720) / 90, 0, 1)) }));
    D.el('rect', { x: 680, y: 330, width: 130, height: 110, rx: 10, fill: 'none', stroke: C.rouge, 'stroke-width': 5 }, gu);
    const bordRouge = gu.lastChild;
    V.anime.push(() => bordRouge.setAttribute('opacity', rouge.v.toFixed(2)));

    /* l'isolant : une gaine sur chaque tube, sans coupure, jusqu'au raccord */
    g = couche('iso');
    chemin(g, trG, { stroke: C.gris, 'stroke-opacity': 0.45, 'stroke-width': 34 });
    chemin(g, trL, { stroke: C.gris, 'stroke-opacity': 0.45, 'stroke-width': 24 });

    /* les deux tubes de cuivre, et ce qui coule dedans */
    g = couche('gaz');
    V.tube(g, trG, 18, 12);
    V.vapeur(g, trG, 12, 0.18, 55, 26);
    D.el('rect', { x: 238, y: 117, width: 12, height: 16, fill: C.navy }, g);
    D.el('rect', { x: 668, y: 368, width: 12, height: 16, fill: C.navy }, suit(g));
    g = couche('liq');
    V.tube(g, trL, 12, 6);
    V.melange(g, trLr, 6, D.couleur(0.08), 30);   /* petit tube, du détendeur (dehors) à la pièce, en mode froid : un mélange liquide + vapeur */
    D.el('rect', { x: 240, y: 150, width: 10, height: 16, fill: C.navy }, g);
    D.el('rect', { x: 670, y: 403, width: 10, height: 16, fill: C.navy }, suit(g));

    /* les cotes : L le long des tubes, H entre les deux niveaux */
    g = couche('cotes');
    chemin(g, trC, { stroke: C.navy, 'stroke-width': 3, 'marker-start': 'url(#cote42)', 'marker-end': 'url(#cote42)' });
    D.el('path', { d: 'M540 125 V376', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'marker-start': 'url(#cote42)', 'marker-end': 'url(#cote42)' }, g);
    D.el('path', { d: 'M540 376 H592', fill: 'none', stroke: C.gris, 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, g);
    D.el('path', { d: 'M680 322 V332', fill: 'none', stroke: C.gris, 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, suit(g));

    /* ce que dit la longueur : courte, longue, hors notice (chaque cas apparaît au-dessus de l'unité) */
    const coche = suit(couche('okC'));
    D.el('circle', { cx: 745, cy: 292, r: 25, fill: C.vert, stroke: 'none' }, coche);
    D.el('path', { d: 'M733 292 l9 10 l17 -20', fill: 'none', stroke: C.papier, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, coche);
    const appoint = suit(couche('appoint'));
    D.el('rect', { x: 721, y: 254, width: 30, height: 42, rx: 9, fill: C.papier, stroke: C.ambre, 'stroke-width': 3 }, appoint);
    D.el('rect', { x: 729, y: 244, width: 14, height: 10, rx: 2, fill: C.papier, stroke: C.ambre, 'stroke-width': 3 }, appoint);
    D.el('rect', { x: 707, y: 296, width: 76, height: 22, rx: 6, fill: C.creme, stroke: C.ambre, 'stroke-width': 3 }, appoint);
    D.el('rect', { x: 757, y: 302, width: 20, height: 10, rx: 2, fill: C.ambre, 'fill-opacity': 0.3, stroke: 'none' }, appoint);
    const horsNotice = suit(couche('hors'));
    D.el('circle', { cx: 745, cy: 292, r: 26, fill: 'none', stroke: C.rouge, 'stroke-width': 6 }, horsNotice);
    D.el('path', { d: 'M727 274 L763 310', stroke: C.rouge, 'stroke-width': 6, 'stroke-linecap': 'round' }, horsNotice);

    /* la règle de la longueur : trois zones, et le repère de L qui glisse dessus */
    g = couche('regle');
    [[50, C.vert, 0.16], [350, C.ambre, 0.18], [650, C.rouge, 0.16]].forEach(([x, c, o], i) => {
      D.el('rect', { x, y: 512, width: 300, height: 42, fill: c, 'fill-opacity': o, stroke: 'none' }, g);
      const vif = D.el('rect', { x, y: 512, width: 300, height: 42, fill: 'none', stroke: c, 'stroke-width': 3 }, g);
      V.anime.push(() => vif.setAttribute('opacity', zone[i].v.toFixed(2)));
    });
    [[200, 'la précharge suffit', C.vert], [500, 'appoint de fluide, pesé', C.ambre], [800, 'interdit : hors notice', C.rouge]].forEach(([x, s, c]) =>
      D.texte(g, x, 541, s, { 'font-size': 21, 'font-weight': 700, fill: c, 'text-anchor': 'middle' }));
    D.texte(g, 50, 581, 'la liaison s’allonge →', { 'font-size': 21, fill: C.gris });
    [[350, 'limite de la précharge'], [650, 'longueur maximale']].forEach(([x, s]) => {
      D.texte(g, x, 581, s, { 'font-size': 21, fill: C.gris, 'text-anchor': 'middle' });
      D.texte(g, x, 608, '(dans la notice)', { 'font-size': 21, fill: C.gris, 'text-anchor': 'middle' });
    });
    g = D.el('g', {}, couche('marq'));
    const triangle = D.el('path', { d: 'M0 508 l-11 -20 h22 z', fill: C.vert, stroke: 'none' }, g);
    D.texte(g, 18, 500, 'L', { 'font-size': 21, 'font-weight': 700, fill: C.navy });
    V.anime.push(() => g.setAttribute('transform', 'translate(' + sXm.v.toFixed(1) + ' 0)'));

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    ecrire(28, 44, 'dans la pièce', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(288, 44, 'dehors', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(263, 466, 'le mur', null, null, Object.assign({ fill: C.gris }, M));
    ecrire(40, 118, 'unité', 'ui', C.navy);
    ecrire(40, 145, 'intérieure', 'ui', C.navy);
    ecrire(292, 104, 'gros tube : gaz', 'gaz', C.orange);
    ecrire(292, 193, 'petit tube : liquide + vapeur', 'liq', C.orange);
    ecrire(292, 225, 'un isolant continu', 'isoT', C.navy, G);
    ecrire(292, 252, 'sur chaque tube,', 'isoT', C.navy, G);
    ecrire(292, 279, 'fermé jusqu’au raccord', 'isoT', C.navy, G);
    ecrire(292, 225, 'dénivelé :', 'coteT', C.navy);
    ecrire(292, 252, 'différence de', 'coteT', C.navy);
    ecrire(292, 279, 'hauteur entre', 'coteT', C.navy);
    ecrire(292, 306, 'les unités', 'coteT', C.navy);
    ecrire(527, 258, 'H', 'cotes', C.navy, Object.assign({ 'font-size': 22, 'text-anchor': 'end' }, G));
    ecrire(618, 215, 'L', 'cotes', C.navy, Object.assign({ 'font-size': 22 }, M, G));
    ecrire(652, 160, 'longueur, mesurée', 'coteT', C.navy);
    ecrire(652, 187, 'le long des tubes', 'coteT', C.navy);
    const txt = suit(d);                                       /* les textes qui suivent l'unité extérieure, par-dessus tout */
    ecrire(745, 466, 'unité extérieure', 'ue', C.navy, M, txt);
    ecrire(745, 205, 'précharge', 'okC', C.vert, Object.assign({ 'font-size': 21 }, M, G), txt);
    ecrire(745, 232, 'suffisante', 'okC', C.vert, Object.assign({ 'font-size': 21 }, M, G), txt);
    ecrire(745, 226, 'appoint pesé', 'appoint', C.ambre, Object.assign({ 'font-size': 21 }, M, G), txt);
    ecrire(745, 205, 'hors de la', 'hors', C.rouge, Object.assign({ 'font-size': 21 }, M, G), txt);
    ecrire(745, 232, 'notice', 'hors', C.rouge, Object.assign({ 'font-size': 21 }, M, G), txt);

    /* le pas à pas : l'unité extérieure glisse (trois cas) ; on allume ce qui agit */
    const BASE = ['ui', 'ue', 'gaz', 'liq', 'regle'];
    const PAS = [
      { on: ['gaz', 'liq'], montre: BASE, cas: 0 },
      { on: ['iso', 'isoT'], montre: BASE.concat('iso', 'isoT'), cas: 0 },
      { on: ['cotes', 'coteT'], montre: BASE.concat('iso', 'cotes', 'coteT'), cas: 0 },
      { on: ['ue', 'regle', 'marq', 'okC'], montre: BASE.concat('iso', 'cotes', 'marq', 'okC'), cas: 0 },
      { on: ['ue', 'regle', 'marq', 'appoint'], montre: BASE.concat('iso', 'cotes', 'marq', 'appoint'), cas: 1 },
      { on: ['ue', 'regle', 'marq', 'hors'], montre: BASE.concat('iso', 'cotes', 'marq', 'hors'), cas: 2 }
    ];
    const peindre = k => {
      const p = PAS[k], jaune = [C.vert, C.ambre, C.rouge];
      V.allumer(new Set(p.on), new Set(p.montre));
      viser('xe', XE[p.cas]); viser('xm', XM[p.cas]);
      zone.forEach((z, i) => viser('z' + i, k >= 3 && i === p.cas ? 1 : 0));
      viser('rouge', k === 5 ? 1 : 0);
      triangle.setAttribute('fill', jaune[p.cas]);
    };
    V.demarrer();

    const etapes = [
      { titre: 'Deux tubes, deux diamètres',
        dire: 'Le fluide passe d’une unité à l’autre par deux tubes de cuivre. Le petit porte le liquide, mêlé de vapeur quand l’appareil refroidit, le gros porte le gaz. Les deux diamètres sont imposés : ils sont dans la notice.',
        peindre: () => peindre(0) },
      { titre: 'Chacun dans son isolant',
        dire: 'Une gaine entoure chaque tube, sans coupure du début à la fin, et jusqu’au raccord. Le gros tube, froid quand l’appareil refroidit, se couvrirait de gouttes s’il était nu.',
        peindre: () => peindre(1) },
      { titre: 'Deux mesures : L et H',
        dire: 'La longueur L se mesure le long des tubes, tous les détours compris. Le dénivelé H est la différence de hauteur entre les deux unités. La notice donne un minimum, un maximum, et un dénivelé maximal.',
        peindre: () => peindre(2) },
      { titre: 'Liaison courte : la précharge suffit',
        dire: 'L’appareil est livré avec du fluide pour une certaine longueur de liaison, écrite dans la notice. Tant qu’on reste dans cette longueur, on n’ajoute rien.',
        peindre: () => peindre(3) },
      { titre: 'Liaison plus longue : appoint pesé',
        dire: 'Plus longue que la précharge, mais dans la limite : les tubes contiennent plus de fluide, il en manque. On ajoute un appoint, calculé d’après la notice, et pesé sur une balance.',
        peindre: () => peindre(4) },
      { titre: 'Au-delà de la notice : interdit',
        dire: 'Plus longue que la longueur maximale, ou plus haute que le dénivelé maximal : l’appareil sort de ses limites. On ne pose pas ainsi : on change le tracé, ou l’appareil.',
        peindre: () => peindre(5) }
    ];
    return pasAPas(d, etapes, 'Aucune valeur ici : les diamètres, les longueurs et le dénivelé sont ceux de la notice de l’appareil.');
  }

  /* Temps 5 : ce qu'on vérifie sur une liaison, en cinq cartes sous un dessin des deux unités. */
  function recapitulatif() {
    const d = svg('0 0 820 398', 'Récapitulatif : l’unité intérieure et l’unité extérieure reliées par le gros tube de gaz et le petit tube de liquide, chacun dans son isolant ; cinq cartes dessous : le tube, les diamètres, L et H, l’isolant, les raccords.');
    const cartes = [
      { t: 'Le tube', l: ['qualité frigorifique,', 'bouché et sec ;', 'on rebouche ce', 'qui attend'],
        p: x => `<line x1="${x - 36}" y1="214" x2="${x + 36}" y2="214" stroke="${C.orange}" stroke-width="10"/><rect x="${x - 46}" y="205" width="8" height="18" fill="${C.navy}"/><rect x="${x + 38}" y="205" width="8" height="18" fill="${C.navy}"/>` },
      { t: 'Les diamètres', l: ['ceux de la notice :', 'petit tube : liquide', 'et vapeur en froid,', 'gros tube : gaz'],
        p: x => `<circle cx="${x - 24}" cy="214" r="8" fill="${C.creme}" stroke="${C.orange}" stroke-width="4"/><circle cx="${x + 16}" cy="214" r="15" fill="${C.creme}" stroke="${C.orange}" stroke-width="4"/>` },
      { t: 'L et H', l: ['dans la notice :', 'longueur mini et maxi,', 'dénivelé maxi ;', 'au-delà : appoint pesé'],
        p: x => `<path d="M${x - 40} 222 H${x + 6}" stroke="${C.navy}" stroke-width="2.5" marker-start="url(#cote5)" marker-end="url(#cote5)"/><text x="${x - 20}" y="212" font-size="15" font-weight="700" fill="${C.navy}">L</text><path d="M${x + 30} 194 V232" stroke="${C.navy}" stroke-width="2.5" marker-start="url(#cote5)" marker-end="url(#cote5)"/><text x="${x + 38}" y="218" font-size="15" font-weight="700" fill="${C.navy}">H</text>` },
      { t: 'L’isolant', l: ['sur les deux tubes,', 'sans coupure,', 'fermé aux raccords'],
        p: x => `<line x1="${x - 36}" y1="214" x2="${x + 36}" y2="214" stroke="${C.gris}" stroke-opacity=".5" stroke-width="28"/><line x1="${x - 46}" y1="214" x2="${x + 46}" y2="214" stroke="${C.orange}" stroke-width="8"/>` },
      { t: 'Les raccords', l: ['dudgeon au couple', 'ou brasure sous azote', '(le geste : CuivRézo)'],
        p: x => `<path d="M${x - 40} 206 H${x - 8} L${x + 10} 196 V232 L${x - 8} 222 H${x - 40}" fill="none" stroke="${C.orange}" stroke-width="4" stroke-linejoin="round"/>` }
    ];
    const W = 152, G = 9, X0 = 19;
    const fiches = cartes.map((c, i) => {
      const x0 = X0 + i * (W + G), x = x0 + W / 2;
      return `<rect x="${x0}" y="140" width="${W}" height="234" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<circle cx="${x}" cy="170" r="15" fill="${C.navy}"/>
<text x="${x}" y="176" text-anchor="middle" font-size="16" font-weight="700" fill="${C.papier}">${i + 1}</text>
${c.p(x)}
<text x="${x}" y="268" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">${c.t}</text>
${c.l.map((ligne, k) => `<text x="${x}" y="${292 + k * 21}" text-anchor="middle" font-size="14" fill="${C.navy}">${ligne}</text>`).join('')}`;
    }).join('');
    d.innerHTML = `
<defs><marker id="cote5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.navy}"/></marker></defs>
<rect x="10" y="10" width="800" height="378" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="30" y="30" width="140" height="84" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="100" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité</text>
<text x="100" y="88" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">intérieure</text>
<rect x="650" y="30" width="140" height="84" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="720" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité</text>
<text x="720" y="88" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">extérieure</text>
<g fill="none" stroke="${C.gris}" stroke-opacity=".45"><path d="M170 58 H650" stroke-width="26"/><path d="M170 88 H650" stroke-width="18"/></g>
<g fill="none" stroke="${C.orange}"><path d="M170 58 H650" stroke-width="12"/><path d="M170 88 H650" stroke-width="7"/></g>
<text x="410" y="38" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">gros tube : gaz</text>
<text x="410" y="118" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">petit tube : liquide + vapeur</text>
${fiches}`;
    return d;
  }

  return { liaison, recapitulatif };
})();
