/* CartoClim 1.1 — scènes de « Climatiser, c'est quoi ? ». Temps 2 (et temps 1, devant les photos :
   scene-devant.js) : une pièce en été, en coupe ; la chaleur entre (soleil, occupants, ordinateur), le
   climatiseur la prend dedans et la rejette dehors, en quatre pas — avec l'AIR qui circule (« Animer les
   réseaux », 04/10/2026).
   Le dessin ne montre PAS le circuit du fluide (c'est la station 2.1) : il montre où va la chaleur.
   Temps 5 : ce qu'un climatiseur fait, et ce qu'il ne fait pas, en un dessin.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · la chaleur : des flèches qui entrent par la vitre, montent des occupants et de l'ordinateur, descendent
     dans les tubes de cuivre, sortent au-dessus de l'unité extérieure ; la lumière du soleil, en tirets ;
   · l'air : des chevrons qui bouclent dans la pièce (soufflé froid, repris tiède) et traversent l'unité
     extérieure (de plus en plus chaud) ; couleur = température ; la turbine et l'hélice tournent ;
   · le pas à pas allume la partie qui agit. Le climatiseur ne démarre qu'au pas 3 : ses ventilateurs, son
     air et ses flèches n'apparaissent pas avant ; ce qui a démarré continue ensuite, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron,
   flèche de chaleur, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une
   flèche : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 :
   au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* Les icônes des aptitudes, dans un carré 0 0 100 100, sans couleur (le kit la pose). */
  const icones = {
    froid: SceneKit.pictos.DESSINS.froid,
    chaud: SceneKit.pictos.DESSINS.chaud,
    /* deux pièces, et la chaleur qui passe de l'une à l'autre */
    deplacer: '<path d="M8 28 h30 v44 h-30 z M62 28 h30 v44 h-30 z M42 50 h16 M52 42 l8 8 l-8 8"/>',
    /* une goutte qui tombe dans un bac */
    eau: '<path d="M50 8 C40 24 34 32 34 42 a16 16 0 0 0 32 0 C66 32 60 24 50 8 Z"/><path d="M22 68 v16 h56 v-16"/>',
    /* une grille fine qui arrête la poussière */
    filtre: '<path d="M14 20 h72 v60 h-72 z M32 20 v60 M50 20 v60 M68 20 v60 M14 40 h72 M14 60 h72"/>',
    /* une hélice à trois pales */
    brasser: '<circle cx="50" cy="50" r="6"/>' +
      '<ellipse cx="50" cy="27" rx="10" ry="19"/>' +
      '<ellipse transform="rotate(120 50 50)" cx="50" cy="27" rx="10" ry="19"/>' +
      '<ellipse transform="rotate(240 50 50)" cx="50" cy="27" rx="10" ry="19"/>',
    /* une flèche qui entre dans une pièce : de l'air venu de dehors */
    neuf: '<path d="M36 22 h56 v56 h-56 z M4 50 h38 M30 40 l12 10 l-12 10"/>'
  };

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

  /* Temps 2 : la chaleur d'une pièce l'été, et où elle va. */
  function trajetDeLaChaleur() {
    const d = svg('0 0 1000 640',
      'Une pièce en été, en coupe : le soleil entre par la vitre, les occupants et l’ordinateur chauffent ; l’unité intérieure du climatiseur prend la chaleur dans la pièce, les tubes la traversent le mur, et l’unité extérieure la rejette dehors. L’air de la pièce circule en boucle : soufflé froid par l’unité, repris tiède.');
    const V = vivant(d, 1000, 640), D = V.D, { couche, ecrire, souffle, chaleur, turbine, tourne, viser, doux } = V;
    const SOL = 520, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' }, G = { 'font-size': 22, 'font-weight': 700 };
    V.horloge('s');                                        /* le soleil, toujours */
    V.horloge('ven', 0);                                   /* les ventilateurs : arrêtés tant que le climatiseur ne marche pas */
    const tR = doux('tR', 192), tG = doux('tG', 57), tB = doux('tB', 43), tA = doux('tA', 0.07);   /* la teinte de la pièce */

    V.fond();

    /* la pièce, ses deux murs, le sol ; la teinte dit si elle chauffe ou se rafraîchit */
    D.el('rect', { x: 178, y: 60, width: 522, height: 460, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    const teinte = D.el('rect', { x: 178, y: 60, width: 522, height: 460, stroke: 'none' }, d);
    D.el('rect', { x: 150, y: 60, width: 28, height: 460, fill: C.trait, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 700, y: 60, width: 28, height: 460, fill: C.trait, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('line', { x1: 20, y1: SOL, x2: 980, y2: SOL, stroke: C.navy, 'stroke-width': 4 }, d);

    /* la vitre et le soleil : la lumière arrive en tirets */
    let g = couche('vitre');
    D.el('rect', { x: 150, y: 140, width: 28, height: 190, fill: C.air, 'fill-opacity': 0.55, stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('soleil');
    const rayons = D.el('g', {}, g);
    D.el('circle', { cx: 74, cy: 96, r: 24, fill: C.ambre, stroke: 'none' }, g);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
      D.el('line', { x1: (74 + 31 * c).toFixed(1), y1: (96 + 31 * s).toFixed(1), x2: (74 + 40 * c).toFixed(1), y2: (96 + 40 * s).toFixed(1),
        stroke: C.ambre, 'stroke-width': 3, 'stroke-linecap': 'round' }, rayons);
    }
    const lumiere = [[99, 127, 150, 190], [93, 131, 150, 240], [89, 133, 150, 290]].map(([x1, y1, x2, y2]) =>
      D.el('line', { x1, y1, x2, y2, stroke: C.ambre, 'stroke-width': 4, 'stroke-dasharray': '14 14', 'stroke-linecap': 'round' }, g));
    V.anime.push(() => {
      rayons.setAttribute('transform', 'rotate(' + (V.clocks.s.t * 6).toFixed(1) + ' 74 96)');
      lumiere.forEach(l => l.setAttribute('stroke-dashoffset', (-(V.clocks.s.t * 50) % 28).toFixed(1)));
    });

    /* l'air : il boucle dans la pièce — soufflé froid par l'unité, il descend le long du mur, file sur le sol,
       se réchauffe au contact des occupants, remonte côté vitre et revient sous le plafond */
    g = couche('boucle');
    souffle(g, [[668, 150], [668, 470], [648, 494], [322, 494], [300, 470], [300, 150], [320, 112], [536, 112]],
      { v: 80, pas: 56, temp: f => D.courbe([[0, 0.08], [0.3, 0.2], [0.62, 0.5], [1, 0.62]], f) });
    /* dehors, l'air balaie la batterie : il en sort chaud */
    g = couche('airExt');
    [436, 484].forEach(y => souffle(g, [[736, y], [990, y]], { v: 80, temp: (f, x) => D.lerp(0.62, 0.95, D.borne((x - 790) / 150, 0, 1)) }));

    /* les occupants et l'ordinateur, devant l'air */
    g = couche('gens');
    [380, 452].forEach(x => {
      D.el('circle', { cx: x, cy: 438, r: 17, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
      D.el('path', { d: 'M ' + (x - 24) + ' 520 v-44 a24 20 0 0 1 48 0 v44 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    });
    D.el('rect', { x: 500, y: 482, width: 130, height: 10, rx: 3, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M 512 492 V 520 M 618 492 V 520', fill: 'none', stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('rect', { x: 540, y: 436, width: 60, height: 40, rx: 4, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M 570 476 v6 M 556 482 h28', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);

    /* l'unité intérieure, contre le mur de droite, sa turbine */
    g = couche('unite');
    D.el('rect', { x: 536, y: 78, width: 164, height: 72, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    V.ailettes(g, 556, 90, 138, 5, 12);
    tourne(turbine(g, 656, 114, 26), 320, 'ven');
    D.el('path', { d: 'M 646 158 h 44', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);

    /* l'unité extérieure, dehors, au sol : sa batterie, son hélice */
    g = couche('unitExt');
    D.el('rect', { x: 770, y: 400, width: 190, height: 120, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    V.ailettes(g, 790, 412, 508, 6, 11);
    tourne(D.ventilateur(g, 905, 460, 40), 260, 'ven');

    /* les tubes de cuivre : de l'unité intérieure, à travers le mur, jusqu'à l'unité extérieure */
    g = couche('tubes');
    V.tube(g, trajet([[700, 126], [800, 126], [800, 402]]), 22, 16);

    /* les flèches de chaleur, par-dessus */
    chaleur(couche('chSoleil'), [[184, 190], [270, 319]], { n: 2, v: 50 });
    chaleur(couche('chSoleil'), [[184, 250], [270, 379]], { n: 2, v: 50, dec: 0.3 });
    chaleur(couche('chSoleil'), [[184, 310], [270, 439]], { n: 2, v: 50, dec: 0.6 });
    [[380, 408, 0], [452, 408, 0.4], [570, 424, 0.7]].forEach(([x, y, dec]) => chaleur(couche('chGens'), [[x, y], [x, 262]], { n: 2, v: 50, dec }));
    chaleur(couche('tubesChal'), [[700, 126], [800, 126], [800, 402]], { n: 4, v: 55, k: 0.7 });
    [[856, 392, 322, 0], [896, 392, 332, 0.35], [936, 392, 318, 0.7]].forEach(([x, y0, y1, dec]) => chaleur(couche('rejet'), [[x, y0], [x, y1]], { n: 1, v: 40, dec }));
    chaleur(couche('elec'), [[956, 620], [956, 528]], { n: 2, v: 45, couleur: C.ambre });

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    ecrire(186, 44, 'DANS LA PIÈCE', null, null, G);
    ecrire(744, 44, 'DEHORS', null, null, G);
    ecrire(74, 44, 'soleil', 'soleil', C.ambre, M);
    ecrire(140, 352, 'vitre', 'vitre', C.navy, F);
    ecrire(192, 162, 'chaleur', 'chSoleil', C.chaud);
    ecrire(416, 556, 'occupants', 'gens', C.navy, M);
    ecrire(566, 556, 'ordinateur', 'gens', C.navy, M);
    ecrire(476, 238, 'chaleur', 'chGens', C.chaud, M);
    ecrire(542, 186, 'unité', 'unite', C.froid);
    ecrire(542, 213, 'intérieure', 'unite', C.froid);
    ecrire(340, 152, 'air chaud', 'boucle', C.chaud);
    ecrire(646, 300, 'air frais', 'boucle', C.froid, F);
    ecrire(816, 190, 'tubes de cuivre', 'tubes', C.chaud);
    ecrire(770, 556, 'unité extérieure', 'unitExt', C.chaud);
    ecrire(900, 238, 'chaleur', 'rejet', C.chaud, M);
    ecrire(900, 265, 'rejetée', 'rejet', C.chaud, M);
    ecrire(938, 600, 'électricité', 'elec', C.ambre, F);

    /* le pas à pas : la partie qui agit s'allume ; le climatiseur ne démarre qu'au pas 3 */
    const ALLUME = [
      ['soleil', 'vitre', 'chSoleil'],
      ['gens', 'chGens'],
      ['unite', 'boucle', 'tubes', 'tubesChal'],
      ['unitExt', 'airExt', 'rejet', 'elec']
    ];
    const DEPUIS = { chGens: 1, boucle: 2, tubesChal: 2, airExt: 2, rejet: 3, elec: 3 };
    const TOUT = ['vitre', 'soleil', 'chSoleil', 'chGens', 'boucle', 'airExt', 'gens', 'unite', 'unitExt', 'tubes', 'tubesChal', 'rejet', 'elec'];
    const TEINTES = [[192, 57, 43, 0.07], [192, 57, 43, 0.16], [132, 183, 236, 0.22], [132, 183, 236, 0.22]];
    V.anime.push(() => { teinte.setAttribute('fill', 'rgb(' + [tR.v, tG.v, tB.v].map(Math.round).join(',') + ')'); teinte.setAttribute('fill-opacity', tA.v.toFixed(3)); });
    const peindre = k => {
      V.allumer(new Set(ALLUME[k]), new Set(TOUT.filter(c => (DEPUIS[c] || 0) <= k)));
      ['tR', 'tG', 'tB', 'tA'].forEach((n, i) => viser(n, TEINTES[k][i]));
      V.vitesse('ven', k >= 2 ? 1 : 0);
    };
    V.demarrer();

    const etapes = [
      { titre: 'Le soleil entre par la vitre',
        dire: 'La lumière traverse le verre et tombe sur le sol et les meubles : elle devient de la chaleur, et cette chaleur reste enfermée dans la pièce.',
        peindre: () => peindre(0) },
      { titre: 'Les occupants et l’ordinateur chauffent aussi',
        dire: 'Un corps donne de la chaleur en permanence. Un ordinateur transforme en chaleur toute l’électricité qu’il consomme. La pièce se réchauffe encore.',
        peindre: () => peindre(1) },
      { titre: 'Le climatiseur prend la chaleur dedans',
        dire: 'L’unité intérieure aspire l’air chaud de la pièce, lui prend sa chaleur et le souffle plus frais. La chaleur n’a pas disparu : elle passe dans le fluide, qui l’emmène par les tubes.',
        peindre: () => peindre(2) },
      { titre: 'Il la rejette dehors',
        dire: 'L’unité extérieure rend cette chaleur à l’air du dehors. Rien n’est détruit, tout est déplacé — et l’électricité consommée s’y ajoute, car elle finit aussi en chaleur.',
        peindre: () => peindre(3) }
    ];
    return pasAPas(d, etapes, 'Ce dessin ne montre pas le circuit du fluide : la station 2.1 le déroule organe par organe.');
  }

  /* Temps 5 : ce que fait un climatiseur, et ce qu'il ne fait pas. */
  function recapitulatif() {
    const d = svg('0 0 820 360', 'Récapitulatif : un climatiseur déplace la chaleur de la pièce vers dehors grâce à l’électricité ; il sait refroidir, chauffer, déshumidifier, filtrer et brasser, mais il ne fait pas entrer d’air neuf.');
    const tuiles = [
      { icone: icones.froid,   nom: 'Refroidir',     sous: 'l’été',          oui: true },
      { icone: icones.chaud,   nom: 'Chauffer',      sous: 'si réversible',  oui: true },
      { icone: icones.eau,     nom: 'Déshumidifier', sous: 'l’eau va au bac', oui: true },
      { icone: icones.filtre,  nom: 'Filtrer',       sous: 'les poussières', oui: true },
      { icone: icones.brasser, nom: 'Brasser',       sous: 'fait circuler',  oui: true },
      { icone: icones.neuf,    nom: 'Air neuf',      sous: 'pas son métier', oui: false }
    ];
    d.innerHTML = `
<defs>
  <marker id="r-hp" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" refX="18" refY="13" orient="auto"><path d="M0 0 L26 13 L0 26 z" fill="${C.chaud}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="340" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="110" y="36" width="200" height="90" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="210" y="76" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">DANS LA PIÈCE</text>
<text x="210" y="102" text-anchor="middle" font-size="14" fill="${C.gris}">la chaleur est prise</text>
<rect x="510" y="36" width="200" height="90" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="610" y="76" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">DEHORS</text>
<text x="610" y="102" text-anchor="middle" font-size="14" fill="${C.gris}">la chaleur est rejetée</text>
<path d="M318 81 H502" stroke="${C.chaud}" stroke-width="10" marker-end="url(#r-hp)"/>
<text x="410" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="${C.chaud}">la chaleur est déplacée</text>
<text x="410" y="112" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ambre}">grâce à l’électricité</text>
${tuiles.map((t, i) => {
  const x = 39 + i * 126, y = 160;
  const couleur = t.oui ? C.navy : C.gris;
  return `<rect x="${x}" y="${y}" width="112" height="170" rx="14" fill="${C.creme}" stroke="${t.oui ? C.vert : C.rouge}" stroke-width="3"/>
<g transform="translate(${x + 20},${y + 14}) scale(.72)" fill="none" stroke="${couleur}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${t.icone}</g>
${t.oui ? `<circle cx="${x + 98}" cy="${y + 14}" r="10" fill="${C.vert}"/><path d="M${x + 93} ${y + 14} l4 4 l7 -8" fill="none" stroke="${C.papier}" stroke-width="3" stroke-linecap="round"/>` : `<line x1="${x + 20}" y1="${y + 14}" x2="${x + 92}" y2="${y + 86}" stroke="${C.rouge}" stroke-width="7" stroke-linecap="round"/>`}
<text x="${x + 56}" y="${y + 122}" text-anchor="middle" font-size="14" font-weight="700" fill="${couleur}">${t.nom}</text>
<text x="${x + 56}" y="${y + 144}" text-anchor="middle" font-size="13" fill="${C.gris}">${t.sous}</text>`;
}).join('')}`;
    return d;
  }

  return { trajetDeLaChaleur, recapitulatif, icones };
})();
