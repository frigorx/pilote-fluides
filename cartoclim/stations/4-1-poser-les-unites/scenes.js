/* CartoClim 4.1 — scènes de la pose des deux unités.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : une façade en coupe, quatre pas (l'unité
   intérieure, la carotte, le support extérieur, l'unité extérieure et ses dégagements d'air), avec une
   bascule « Bien posé / Mal posé » : le mal posé dessine d'un coup les quatre défauts du même chantier
   (cloison légère, jet sur le lit, carotte à contre-pente, support pas de niveau, unité enfermée) ; le pas
   actif met le sien en évidence — avec l'AIR qui circule (« Animer les réseaux », 04/10/2026).
   Temps 5 : une pose réussie, en un coup d'œil.
   Aucune cote chiffrée : les dégagements sont ceux de la notice.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air de l'unité intérieure : des chevrons froids qui passent au-dessus du lit (bien posé) ou qui
     tombent dessus (mal posé) ; la bascule les change, l'unité s'incline sur sa platine ;
   · l'eau de la carotte : des gouttes qui descendent la pente et tombent dehors, ou qui refluent dans le
     mur à contre-pente ;
   · l'air de l'unité extérieure : il entre d'un côté, sort chaud de l'autre, l'hélice tourne ; enfermée,
     elle aspire son propre air chaud (la boucle rouge) ;
   · le support qui penche, la bulle du niveau qui se décale.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas et la bascule marchent. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js). Aucun texte sur un tracé, ni sur le trajet d'un
   chevron : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 940 : au moins
   18,7 px quand la scène est devant, à 1 280 px (colonne de droite : 23 rem). */
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

  function poseDesDeuxUnites() {
    const d = svg('0 0 940 660',
      'Coupe d’une façade, la pièce à gauche et le dehors à droite. L’unité intérieure est fixée au mur sur sa platine, la carotte traverse le mur en pente vers l’extérieur, l’unité extérieure repose sur un support de niveau avec de l’air libre à l’aspiration et au soufflage. L’air froid de l’unité intérieure passe au-dessus du lit ; dehors, l’air entre d’un côté et sort chaud de l’autre.');
    let etape = 0, mal = false;
    const malP = document.createElement('p');          /* la phrase « mal posé » du pas courant */
    malP.className = 'verdict bad'; malP.style.display = 'none';

    const V = vivant(d, 940, 660), D = V.D, { couche, ecrire, souffle, doux, viser, horloge, chemin, tourne, anime } = V;
    const SOL = 580, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' }, G = { 'font-weight': 700 }, GM = Object.assign({}, G, M);
    const pente = doux('pente', 0), tI = doux('tI', 0), tE = doux('tE', 0);    /* 0 : bien posé, 1 : mal posé */
    horloge('w', 1);                                                          /* l'eau : elle descend la pente, ou reflue */
    const defs = D.el('defs', {}, d);
    D.el('clipPath', { id: 'm41-clip' }, defs).appendChild(D.el('rect', { x: 440, y: 72, width: 80, height: SOL - 72 }));

    V.fond();
    /* dedans / dehors, plafond, sol */
    D.el('line', { x1: 20, y1: 72, x2: 440, y2: 72, stroke: C.gris, 'stroke-width': 3 }, d);
    D.el('line', { x1: 20, y1: SOL, x2: 440, y2: SOL, stroke: C.gris, 'stroke-width': 3 }, d);
    D.el('line', { x1: 520, y1: SOL, x2: 920, y2: SOL, stroke: C.gris, 'stroke-width': 3 }, d);
    D.el('rect', { x: 540, y: 540, width: 380, height: 40, fill: C.air, 'fill-opacity': 0.35, stroke: 'none' }, d);
    /* le lit */
    D.el('path', { d: 'M60 558 V580 M282 558 V580', fill: 'none', stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 46, y: 530, width: 250, height: 28, rx: 6, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 56, y: 518, width: 54, height: 14, rx: 7, fill: C.papier, stroke: C.navy, 'stroke-width': 2 }, d);

    /* le mur : plein et hachuré, ou cloison creuse ; la platine y est fixée */
    let g = couche('murB');
    D.el('rect', { x: 440, y: 72, width: 80, height: SOL - 72, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    const hach = D.el('g', { 'clip-path': 'url(#m41-clip)', stroke: C.trait, 'stroke-width': 2 }, g);
    for (let y = 72; y < SOL; y += 22) D.el('line', { x1: 440, y1: y + 40, x2: 520, y2: y }, hach);
    D.el('path', { d: 'M424 136 H458 M424 184 H458', fill: 'none', stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('murM');
    D.el('rect', { x: 440, y: 72, width: 9, height: SOL - 72, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('rect', { x: 511, y: 72, width: 9, height: SOL - 72, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('line', { x1: 480, y1: 72, x2: 480, y2: SOL, stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, g);
    D.el('path', { d: 'M424 136 H449 M424 184 H449', fill: 'none', stroke: C.navy, 'stroke-width': 3 }, g);

    /* l'unité intérieure : sa platine, son air libre autour, son jet */
    g = couche('ui0');
    D.el('rect', { x: 262, y: 84, width: 180, height: 134, rx: 8, fill: 'none', stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '7 5' }, g);
    D.el('rect', { x: 434, y: 116, width: 8, height: 88, fill: C.navy, stroke: 'none' }, g);
    g = couche('jetB');                                    /* bien posé : le jet passe au-dessus du lit */
    [[318, 212, 120, 258], [348, 214, 150, 296]].forEach(([x1, y1, x2, y2], i) => souffle(g, [[x1, y1], [x2, y2]], { v: 70, pas: 52, dec: i * 0.5, temp: () => 0.1 }));
    g = couche('jetM');                                    /* mal posé : il tombe droit sur le lit */
    [[318, 212, 140, 500], [348, 214, 190, 508]].forEach(([x1, y1, x2, y2], i) => souffle(g, [[x1, y1], [x2, y2]], { v: 70, pas: 52, dec: i * 0.5, temp: () => 0.1 }));
    const gI = D.el('g', {}, d);                           /* l'unité pivote autour de sa platine quand elle se décroche */
    anime.push(() => gI.setAttribute('transform', 'rotate(' + (-5 * tI.v).toFixed(2) + ' 434 160)'));
    g = couche('ui', gI);
    D.el('path', { d: 'M434 120 H292 a12 12 0 0 0 -12 12 V188 a12 12 0 0 0 12 12 H434 Z', fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('rect', { x: 296, y: 102, width: 68, height: 12, rx: 6, fill: C.papier, stroke: C.navy, 'stroke-width': 2 }, g);
    const bulleI = D.el('circle', { cx: 330, cy: 108, r: 3.5, fill: C.navy, stroke: 'none' }, g);
    D.el('rect', { x: 300, y: 190, width: 60, height: 6, rx: 3, fill: C.navy, stroke: 'none' }, g);
    anime.push(() => bulleI.setAttribute('cx', (330 + 22 * tI.v).toFixed(1)));

    /* la carotte : de l'unité au dehors, en pente vers l'extérieur ; mal posé, à contre-pente */
    const yI = () => 250 + 16 * pente.v, yO = () => 266 - 16 * pente.v;
    const trIn = trajetVivant([[424, 200], [424, 250], [440, 250]]), trCar = trajetVivant([[440, 250], [520, 266]]);
    const trOut = trajetVivant([[520, 266], [556, 266], [556, 410], [690, 410]]);
    anime.push(() => {
      const a = yI(), b = yO();
      trIn.maj([[424, 200], [424, a], [440, a]]); trCar.maj([[440, a], [520, b]]); trOut.maj([[520, b], [556, b], [556, 410], [690, 410]]);
    });
    g = couche('carotte');
    chemin(g, trIn, { stroke: C.gris, 'stroke-width': 5 });
    chemin(g, trCar, { stroke: C.navy, 'stroke-width': 22 });
    chemin(g, trCar, { stroke: C.papier, 'stroke-width': 15 });
    chemin(g, trCar, { stroke: C.gris, 'stroke-width': 5 });
    chemin(g, trOut, { stroke: C.gris, 'stroke-width': 5 });
    V.filer(g, trCar, 4, 24, p => D.el('circle', { r: 3.6, fill: EAU, stroke: 'none' }, p),
      (c, x, y, ang, f) => { c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('opacity', D.fenetre(f, 0, 1, 0.15).toFixed(2)); }, 'w');
    /* bien posé : l'eau tombe dehors, devant la carotte ; mal posé : elle stagne dans le mur */
    g = couche('eauB');
    const gout = D.bulles(D.el('g', { transform: 'scale(.5)' }, g), 3, 41, true);
    anime.push(() => gout(V.clocks.w.t, q => [(526 + q * 20) / 0.5, (yO() + 16) / 0.5, (yO() + 74) / 0.5, 1, EAU]));
    D.el('path', { d: 'M548 214 L520 243', fill: 'none', stroke: C.gris, 'stroke-width': 2 }, g);
    g = couche('eauM');
    D.el('ellipse', { cx: 462, cy: 274, rx: 24, ry: 20, fill: 'none', stroke: C.eau, 'stroke-width': 2, 'stroke-dasharray': '4 4' }, g);
    const stagne = [452, 464, 474].map(cx => D.el('circle', { cx, cy: 272, r: 3.6, fill: C.eau, stroke: 'none' }, g));
    anime.push(() => stagne.forEach((c, k) => c.setAttribute('cy', (272 + 3 * Math.sin(V.clocks.w.t * 2.2 + k * 2)).toFixed(1))));
    D.el('path', { d: 'M548 241 L520 262', fill: 'none', stroke: C.gris, 'stroke-width': 2 }, g);

    /* le support et l'unité extérieure, qui penchent ensemble quand il n'est pas de niveau */
    const gE = D.el('g', {}, d);
    anime.push(() => gE.setAttribute('transform', 'rotate(' + (4.5 * tE.v).toFixed(2) + ' 522 440)'));
    g = couche('support', gE);
    D.el('rect', { x: 508, y: 436, width: 12, height: 10, fill: C.navy, stroke: 'none' }, g);
    D.el('rect', { x: 508, y: 500, width: 12, height: 10, fill: C.navy, stroke: 'none' }, g);
    D.el('path', { d: 'M520 440 H840', fill: 'none', stroke: C.navy, 'stroke-width': 6 }, g);
    D.el('path', { d: 'M520 506 L640 440', fill: 'none', stroke: C.navy, 'stroke-width': 5 }, g);
    D.el('rect', { x: 712, y: 430, width: 24, height: 10, fill: C.navy, stroke: 'none' }, g);
    D.el('rect', { x: 788, y: 430, width: 24, height: 10, fill: C.navy, stroke: 'none' }, g);
    D.el('rect', { x: 580, y: 424, width: 54, height: 12, rx: 6, fill: C.papier, stroke: C.navy, 'stroke-width': 2 }, g);
    const bulleE = D.el('circle', { cx: 607, cy: 430, r: 3.5, fill: C.navy, stroke: 'none' }, g);
    anime.push(() => bulleE.setAttribute('cx', (607 - 16 * tE.v).toFixed(1)));
    g = couche('ue', gE);
    D.el('rect', { x: 690, y: 320, width: 140, height: 110, rx: 8, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    V.ailettes(g, 698, 330, 362, 3, 11);
    tourne(D.ventilateur(g, 796, 358, 22), 260, 'a');

    /* l'air de l'unité extérieure : bien posé, il entre d'un côté et sort chaud de l'autre ; enfermée, elle aspire son propre air chaud */
    g = couche('airB');
    [345, 372].forEach((y, i) => {
      souffle(g, [[566, y], [680, y]], { v: 70, pas: 46, dec: i * 0.5, temp: () => 0.62 });
      souffle(g, [[836, y], [915, y]], { v: 70, pas: 46, dec: i * 0.5, temp: () => 0.95 });
    });
    g = couche('airM');
    souffle(g, [[836, 350], [862, 350], [862, 270], [676, 270], [676, 350], [688, 350]], { v: 70, pas: 46, temp: () => 0.92 });
    g = couche('encl');
    D.el('rect', { x: 566, y: 226, width: 340, height: 10, fill: C.creme, stroke: C.navy, 'stroke-width': 2 }, g);
    D.el('rect', { x: 906, y: 226, width: 12, height: SOL - 226, fill: C.creme, stroke: C.navy, 'stroke-width': 2 }, g);

    /* les étiquettes, par-dessus tout ; chacune a sa place libre. Celles des unités restent droites : elles suivent
       l'unité qui penche (le centre du boîtier descend), sans tourner avec elle */
    const gIt = D.el('g', {}, d), gEt = D.el('g', {}, d);
    anime.push(() => {
      gIt.setAttribute('transform', 'translate(' + (0.3 * tI.v).toFixed(2) + ' ' + (6.7 * tI.v).toFixed(2) + ')');
      gEt.setAttribute('transform', 'translate(' + (2.4 * tE.v).toFixed(2) + ' ' + (17.4 * tE.v).toFixed(2) + ')');
    });
    const L = (x, y, s, c, coul, o, parent) => ecrire(x, y, s, c, coul, Object.assign({ 'font-weight': 700 }, o || {}), parent);
    ecrire(24, 44, 'DEDANS — la pièce', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(916, 44, 'DEHORS', null, null, { 'font-size': 22, 'font-weight': 700, 'text-anchor': 'end' });
    L(480, 54, 'mur porteur', 'murB', C.navy, M);
    L(480, 54, 'cloison légère', 'murM', C.navy, M);
    L(357, 152, 'unité', 'ui', C.orange, M, gIt);
    L(357, 179, 'intérieure', 'ui', C.orange, M, gIt);
    ['platine de niveau,', 'air libre autour', '(dégagements', 'de la notice)'].forEach((s, i) => L(24, 100 + 27 * i, s, 'ui0', C.orange));
    L(24, 330, 'le jet passe', 'jetB', C.froid); L(24, 357, 'au-dessus du lit', 'jetB', C.froid);
    L(262, 470, 'le jet tombe', 'jetM', C.rouge); L(262, 497, 'sur le lit', 'jetM', C.rouge);
    L(536, 150, 'carotte en pente :', 'eauB', C.orange); L(536, 177, 'l’eau sort', 'eauB', C.orange);
    L(536, 150, 'à contre-pente :', 'eauM', C.rouge); L(536, 177, 'l’eau reste dans', 'eauM', C.rouge); L(536, 204, 'le mur', 'eauM', C.rouge);
    L(725, 389, 'unité', 'ue', C.orange, M, gEt);
    L(760, 416, 'extérieure', 'ue', C.orange, M, gEt);
    L(700, 490, 'support de niveau,', 'supB', C.orange); L(700, 517, 'plots antivibratiles', 'supB', C.orange);
    L(700, 490, 'pas de niveau :', 'supM', C.rouge); L(700, 517, 'vibrations, bruit', 'supM', C.rouge);
    L(620, 312, 'aspiration', 'airB', C.ambre, M); L(770, 312, 'soufflage libre', 'airB', C.chaud, M);
    L(735, 150, 'unité enfermée :', 'airM', C.rouge); L(735, 177, 'l’air chaud', 'airM', C.rouge); L(735, 204, 'revient', 'airM', C.rouge);
    ecrire(896, 568, 'niveau de la neige', 'neige', C.orange, Object.assign({ fill: C.gris }, F));

    /* le pas à pas : l'élément qui agit s'allume (orange, ou rouge mal posé) ; le reste en retrait */
    const peindre = () => {
      const k = etape, v = mal ? 'M' : 'B', on = ['mur' + v];
      if (k === 0) on.push('ui', 'ui0', 'jet' + v);
      if (k === 1) on.push('carotte', 'eau' + v);
      if (k === 2) on.push('support', 'sup' + v);
      if (k === 3) on.push('ue', 'air' + v, mal ? 'encl' : 'neige');
      V.allumer(new Set(on), new Set(['ui0', 'ui', 'carotte', 'support', 'ue', 'neige'].concat(mal ? ['murM', 'jetM', 'eauM', 'airM', 'encl', 'supM'] : ['murB', 'jetB', 'eauB', 'airB', 'supB'])));
      viser('pente', mal ? 1 : 0); viser('tI', mal ? 1 : 0); viser('tE', mal ? 1 : 0);
      V.vitesse('w', mal ? -0.6 : 1);
    };
    V.demarrer();

    const dire = {
      bien: [
        'Sur un mur qui porte, la platine est vissée de niveau. L’unité s’y accroche en hauteur, avec de l’air libre autour des grilles, et son jet passe au-dessus du lit et du bureau.',
        'Le trou traverse le mur en pente vers l’extérieur. L’eau de condensation, qui accompagne les tubes, descend et sort : elle ne reste pas dans le mur.',
        'Dehors, la console est fixée solidement dans le mur. Les plots antivibratiles se glissent sous les pieds, et le niveau à bulle dit si c’est droit.',
        'L’unité extérieure aspire d’un côté et souffle de l’autre. Rien ne gêne ni l’un ni l’autre. Elle reste accessible, loin de la chambre du voisin et au-dessus de la neige. Les distances sont celles de la notice.'
      ],
      mal: [
        'Sur une cloison légère sans renfort, la platine ne tient pas le poids : l’unité se décroche. Et le jet tombe droit sur le lit.',
        'À contre-pente, l’eau ne sort pas. Elle reste dans le mur, ou revient vers l’unité.',
        'Un support pas de niveau fait vibrer l’unité. Le bruit passe dans le mur.',
        'Dans un recoin fermé, l’air chaud soufflé est aspiré de nouveau. L’été, la haute pression monte et la machine force.'
      ]
    };
    const majMal = () => {
      malP.style.display = mal ? '' : 'none';
      malP.innerHTML = '<span class="signe">✘</span>Mal posé — ' + dire.mal[etape];
    };

    const etapes = [
      { titre: 'L’unité intérieure, sur sa platine', dire: dire.bien[0], peindre: () => { etape = 0; peindre(); majMal(); } },
      { titre: 'La carotte descend vers l’extérieur', dire: dire.bien[1], peindre: () => { etape = 1; peindre(); majMal(); } },
      { titre: 'Le support, de niveau', dire: dire.bien[2], peindre: () => { etape = 2; peindre(); majMal(); } },
      { titre: 'L’air entre et sort librement', dire: dire.bien[3], peindre: () => { etape = 3; peindre(); majMal(); } }
    ];
    const hote = pasAPas(d, etapes, 'Aucune cote ici : les dégagements, la longueur et le dénivelé admis sont ceux de la notice de l’appareil.');

    /* la bascule : bien posé / mal posé */
    const bascule = document.createElement('div');
    bascule.className = 'choix'; bascule.style.marginTop = '.6rem';
    [['Bien posé', false], ['Mal posé', true]].forEach(([lib, valeur]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', String(valeur === mal));
      b.addEventListener('click', () => {
        mal = valeur;
        bascule.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        peindre(); majMal();
      });
      bascule.appendChild(b);
    });
    hote.querySelector('.choix').after(bascule);
    bascule.after(malP);
    return hote;
  }

  /* Temps 5 : une pose réussie, en un coup d'œil. */
  function recapitulatif() {
    const d = svg('0 0 820 350', 'Récapitulatif : à gauche, ce que l’unité intérieure demande ; à droite, ce que l’unité extérieure demande ; au milieu, la carotte en pente vers l’extérieur ; en bas, les dégagements, la longueur et le dénivelé sont ceux de la notice.');
    const coche = (x, y) => `<path d="M${x} ${y - 4} l5 6 l11 -14" fill="none" stroke="${C.vert}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    const ligne = (x, y, s) => `${coche(x, y)}<text x="${x + 24}" y="${y}" font-size="14" fill="${C.navy}">${s}</text>`;
    d.innerHTML = `
<rect x="10" y="10" width="800" height="330" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="24" y="24" width="290" height="212" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="42" y="54" font-size="16" font-weight="700" fill="${C.navy}">Dedans : l’unité intérieure</text>
${ligne(44, 90, 'un mur qui porte')}
${ligne(44, 122, 'une platine de niveau')}
${ligne(44, 154, 'de l’air libre autour')}
${ligne(44, 186, 'un jet loin du lit, du bureau')}
${ligne(44, 218, 'un filtre qu’on peut retirer')}
<rect x="506" y="24" width="290" height="212" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="524" y="54" font-size="16" font-weight="700" fill="${C.navy}">Dehors : l’unité extérieure</text>
${ligne(526, 90, 'un support de niveau, solide')}
${ligne(526, 122, 'des plots antivibratiles')}
${ligne(526, 154, 'air libre : entrée et sortie')}
${ligne(526, 186, 'accessible, loin du voisin')}
${ligne(526, 218, 'au-dessus de la neige')}
<line x1="410" y1="30" x2="410" y2="230" stroke="${C.gris}" stroke-width="8" stroke-dasharray="20 8"/>
<path d="M386 112 L434 126" fill="none" stroke="${C.navy}" stroke-width="14"/>
<path d="M386 112 L434 126" fill="none" stroke="${C.papier}" stroke-width="8"/>
<path d="M386 112 L434 126" fill="none" stroke="${C.gris}" stroke-width="4"/>
<path d="M440 140 c-3.5 5 -3.5 8 0 8 c3.5 0 3.5 -3 0 -8 z" fill="${C.eau}" stroke="none"/>
<text x="410" y="258" text-anchor="middle" font-size="14" font-weight="700" fill="${C.eau}">la carotte descend vers l’extérieur</text>
<rect x="24" y="274" width="772" height="48" rx="12" fill="${C.creme}" stroke="${C.orange}" stroke-width="2.5"/>
<text x="410" y="304" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Dégagements, longueur, dénivelé : ceux de la notice, jamais devinés.</text>`;
    return d;
  }

  return { poseDesDeuxUnites, recapitulatif };
})();
