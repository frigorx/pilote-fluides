/* CartoClim 2.3 — scènes des compresseurs rotatif et scroll.
   Temps 2 : deux vues du dessus, en coupe, chacune en pas à pas — et elles TOURNENT, au ralenti (« Animer les
   réseaux », 04/10/2026, sur le modèle du pilote 3.2). Temps 1 : l'une des deux passe devant les photos, une
   bascule « Le scroll / Le rotatif » montre l'autre (scene-devant.js).
     · le scroll en cinq pas : la spirale mobile orbite sans tourner sur elle-même ; une poche s'ouvre au
       pourtour, se ferme, glisse vers le centre en rétrécissant, puis s'ouvre sur le refoulement. Les spirales
       sont de vraies développantes de cercle : les poches dessinées sont celles qui existent.
     · le rotatif en quatre pas : le rouleau roule contre la paroi, la palette suit ; l'aspiration derrière,
       la compression devant, le clapet qui se soulève.
   Ce qui bouge (tout se calcule à partir du temps, requestAnimationFrame — ni SMIL ni animation CSS) : le
   mécanisme, et le GAZ en petites molécules séparées. Une charge de gaz garde ses molécules du début à la fin :
   quand le volume qui l'enferme rétrécit, elles se serrent (la pression monte) et chauffent (couleur =
   température : bleu froid à l'aspiration, rouge chaud au refoulement). Chaque pas repart de l'instant que
   montrait le dessin fixe, puis le mouvement continue.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à pas
   marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.
   Temps 5 : le récapitulatif des deux compresseurs côte à côte (dessins fixes, fonctions d'origine).
   Règles de maison : aucun texte sur un tracé ni sur le trajet d'une molécule (vérifié par
   outils/controler-scene-vivante.mjs), étiquettes en taille 21 dans 1 000 : au moins 18,7 px quand la scène
   est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const PI = Math.PI;
  const f1 = n => String(Math.round(n * 10) / 10);
  const pts = a => a.map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L');
  const hex = x => [1, 3, 5].map(i => parseInt(x.slice(i, i + 2), 16));
  const melange = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  const borne = (x, a, b) => Math.min(b, Math.max(a, x));
  const GAZ_BP = '#dbe7f6';                      /* le gaz froid, basse pression : un bleu très pâle */
  const GAZ_ENTRE = melange(GAZ_BP, '#3d7fca', .35);   /* le gaz froid qui vient d'entrer dans le rotatif */

  /* ================================================================== le scroll
     Deux spirales identiques (développantes d'un cercle de rayon a). La mobile est la fixe tournée
     d'un demi-tour et décalée de rho : son centre décrit un cercle de rayon rho, sans que la spirale
     tourne sur elle-même. Les points de contact entre les deux parois tombent à des paramètres
     connus (theta - pi/2 pour une face, theta + pi/2 pour l'autre, tous les 2 pi) : de proche en
     proche, ils bornent les poches fermées. */
  const SC = { a: 9, ep: 7, t0: 2.0, t1: 17.5 };
  SC.delta = SC.ep / (2 * SC.a);                 /* décalage des deux faces d'une paroi */
  SC.rho = PI * SC.a - SC.ep;                    /* rayon de l'orbite */
  SC.vie = SC.t1 - 3 * PI - SC.t0;               /* la durée de vie d'une poche fermée, en radians d'orbite */
  const dev = (t, al) => [SC.a * (Math.cos(t) + (t - al) * Math.sin(t)), SC.a * (Math.sin(t) - (t - al) * Math.cos(t))];
  const faceExt = t => dev(t, -SC.delta), faceInt = t => dev(t, SC.delta);
  const echant = (f, a, b) => { const n = Math.max(2, Math.ceil(Math.abs(b - a) / 0.08)); return Array.from({ length: n + 1 }, (_, i) => f(a + (b - a) * i / n)); };

  /* phi = ce qui s'est écoulé depuis la fermeture de la poche suivie (en radians d'orbite) :
     négatif, elle est encore ouverte au pourtour ; au-delà de SC.vie, elle débouche au centre. */
  function poches(phi) {
    const { t0, t1, rho } = SC;
    const theta = t1 - PI / 2 - phi;
    const d = [rho * Math.cos(theta), rho * Math.sin(theta)];
    const miroir = f => s => { const p = f(s); return [d[0] - p[0], d[1] - p[1]]; };
    const mobInt = miroir(faceInt), mobExt = miroir(faceExt);
    const liste = [];
    for (let fam = 1; fam <= 2; fam++) {
      for (let k = -6; k <= 4; k++) {
        const c = fam === 1 ? theta - PI / 2 + 2 * PI * k : theta + PI / 2 + 2 * PI * k;
        const fa = Math.max(c, t0), fb = Math.min(c + 2 * PI, t1);
        const oa0 = fam === 1 ? c + PI : c - PI, ob0 = fam === 1 ? c + 3 * PI : c + PI;
        const oa = Math.max(oa0, t0), ob = Math.min(ob0, t1);
        if (fb <= fa + 0.05 || ob <= oa + 0.05) continue;
        const fixe = echant(fam === 1 ? faceExt : faceInt, fa, fb);
        const mob = echant(fam === 1 ? mobInt : mobExt, oa, ob).reverse();
        const base = fam === 1 ? t1 - 3 * PI : t1 - 2 * PI;
        liste.push({ fam, k, suivie: fam === 1 && k === -1, poly: fixe.concat(mob),
          ouvert: (c + 2 * PI > t1) || (ob0 > t1), centre: c < t0,
          prog: borne((base - c) / SC.vie, 0, 1) });
      }
    }
    return { theta, d, liste };
  }

  /* Le scroll lui-même, centré en (cx, cy), à l'échelle k. Une seule poche est suivie (en couleur vive) ;
   sa symétrique, de l'autre côté, fait la même chose et reste pâle, comme toutes les autres. */
  function scrollDessin(phi, cx, cy, k) {
    const { d, liste } = poches(phi);
    const T = p => [cx + k * p[0], cy + k * p[1]];
    let s = `<circle cx="${cx}" cy="${cy}" r="${f1(172 * k)}" fill="${GAZ_BP}" stroke="${C.gris}" stroke-width="${f1(Math.max(1, 1.5 * k))}" stroke-dasharray="${f1(6 * k)} ${f1(5 * k)}"/>`;
    liste.forEach(p => {
      if (p.ouvert && !p.suivie) return;                   /* le gaz du pourtour : déjà le fond bleu pâle */
      const col = p.ouvert ? C.froid : melange(C.froid, C.chaud, p.prog);
      s += `<path d="M${pts(p.poly.map(T))} Z" fill="${col}" fill-opacity="${p.suivie ? .85 : .3}" stroke="none"/>`;
    });
    const fixe = echant(t => dev(t, 0), SC.t0, SC.t1).map(T);
    const mob = echant(t => { const p = dev(t, 0); return [d[0] - p[0], d[1] - p[1]]; }, SC.t0, SC.t1).map(T);
    const e = f1(SC.ep * k);
    s += `<path d="M${pts(fixe)}" fill="none" stroke="${C.navy}" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path d="M${pts(mob)}" fill="none" stroke="${C.ambre}" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round"/>`;
    const ouvre = phi > SC.vie;
    s += `<circle cx="${cx}" cy="${cy}" r="${f1(6 * k)}" fill="${ouvre ? C.chaud : C.papier}" stroke="${C.chaud}" stroke-width="${f1(Math.max(1, 2 * k))}"/>`;
    return { markup: s, d };
  }

  /* ================================================================== le rotatif
     Un cylindre fixe de rayon R, un rouleau de rayon r monté sur un arbre excentré de e = R - r :
     le rouleau touche toujours la paroi en un point, qui fait le tour. La palette, poussée par son
     ressort, s'appuie sur le rouleau : elle coupe la lunule en deux chambres, l'aspiration derrière
     le point de contact, la compression devant. Les angles sont comptés depuis la palette, dans le
     sens de rotation de l'arbre. */
  const RO = { R: 124, r: 94, ep: 12 };
  RO.e = RO.R - RO.r;
  const PORT_ASP = 15, PORT_REF = 345, DEMI = 3.5;     /* orifices : angles du milieu et demi-largeur, en degrés */

  function rotatifDessin(phi, cx, cy, k, o) {
    const { R, r, e, ep } = RO, mini = !!(o && o.mini), vanneOuverte = !!(o && o.vanneOuverte);
    const rad = a => a * PI / 180;
    const dir = a => [-Math.sin(rad(a)), -Math.cos(rad(a))];
    const P = (rho, a) => { const u = dir(a); return [cx + k * rho * u[0], cy + k * rho * u[1]]; };
    const sDe = (a, ph) => e * Math.cos(rad(a - ph)) + Math.sqrt(r * r - Math.pow(e * Math.sin(rad(a - ph)), 2));
    const s = a => sDe(a, phi);
    const bords = (a, b, f) => { const n = Math.max(2, Math.ceil(Math.abs(b - a) / 3)); return Array.from({ length: n + 1 }, (_, i) => f(a + (b - a) * i / n)); };
    const chambre = (a, b) => 'M' + pts(bords(a, b, x => P(R, x)).concat(bords(b, a, x => P(s(x), x)))) + ' Z';
    const aire = (a, b, ph) => { let t = 0; const n = 60; for (let i = 0; i < n; i++) { const x = a + (b - a) * (i + .5) / n; t += R * R - Math.pow(sDe(x, ph), 2); } return t * rad(b - a) / n / 2; };
    const arc = (a, b, rho) => { const p = P(rho, a), q = P(rho, b); return `M${f1(p[0])} ${f1(p[1])} A${f1(rho * k)} ${f1(rho * k)} 0 ${b - a > 180 ? 1 : 0} 0 ${f1(q[0])} ${f1(q[1])}`; };
    const w = (x, mini2) => f1(Math.max(mini2 || 1.2, x * k));
    const dessus = dir(phi);
    const Cx = cx + k * e * dessus[0], Cy = cy + k * e * dessus[1];
    const prog = borne(1 - aire(phi, 356.5, phi) / aire(55, 356.5, 55), 0, 1);

    let m = `<circle cx="${cx}" cy="${cy}" r="${f1(R * k)}" fill="${C.creme}" stroke="none"/>`;
    if (phi > 6) m += `<path d="${chambre(3.5, phi)}" fill="${GAZ_ENTRE}" stroke="none"/>`;
    m += `<path d="${chambre(phi, 356.5)}" fill="${melange(C.froid, C.chaud, prog)}" fill-opacity=".7" stroke="none"/>`;

    /* le rouleau, sa came excentrée, l'arbre */
    m += `<circle cx="${f1(Cx)}" cy="${f1(Cy)}" r="${f1(r * k)}" fill="#d9dfe8" stroke="${C.navy}" stroke-width="${w(3)}"/>`;
    m += `<circle cx="${f1(Cx)}" cy="${f1(Cy)}" r="${f1(50 * k)}" fill="${C.papier}" stroke="${C.gris}" stroke-width="${w(2)}"/>`;
    m += `<circle cx="${cx}" cy="${cy}" r="${f1(14 * k)}" fill="${C.navy}" stroke="none"/>`;

    /* la palette, son ressort, son logement */
    const pointe = cy - k * s(0), haut = pointe - 70 * k, fond = cy - k * (R + 86);
    const ressort = Array.from({ length: 7 }, (_, i) => [cx + (i === 0 || i === 6 ? 0 : (i % 2 ? -7 : 7)) * k, haut - (haut - fond) * i / 6]);
    m += `<path d="M${f1(cx - 16 * k)} ${f1(cy - k * (R + ep))} V${f1(fond)} H${f1(cx + 16 * k)} V${f1(cy - k * (R + ep))}" fill="none" stroke="${C.navy}" stroke-width="${w(3)}"/>`;
    m += `<path d="M${pts(ressort)}" fill="none" stroke="${C.gris}" stroke-width="${w(2.5)}" stroke-linejoin="round"/>`;
    m += `<rect x="${f1(cx - 6 * k)}" y="${f1(haut)}" width="${f1(12 * k)}" height="${f1(pointe - haut)}" rx="${f1(2 * k)}" fill="${C.ambre}" stroke="${C.navy}" stroke-width="${w(1.5)}"/>`;

    /* la paroi du cylindre, percée de la palette et des deux orifices */
    const rho = R + ep / 2;
    [[4, PORT_ASP - DEMI], [PORT_ASP + DEMI, PORT_REF - DEMI], [PORT_REF + DEMI, 356]].forEach(([a, b]) => {
      m += `<path d="${arc(a, b, rho)}" fill="none" stroke="${C.navy}" stroke-width="${w(ep)}"/>`;
    });

    /* les deux tubes ; le gaz qui y circule les allume */
    const tube = (a, actif, pale) => {
      const p = P(R + ep, a), q = P(R + ep + 46, a);
      return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.navy}" stroke-width="${w(15)}"/>` +
             `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${actif ? pale : C.papier}" stroke-width="${w(9)}"/>`;
    };
    m += tube(PORT_ASP, phi > PORT_ASP + DEMI, '#cfe0f5') + tube(PORT_REF, vanneOuverte, '#f2cfc9');
    if (!mini) {
      const ent = [P(R + ep + 42, PORT_ASP), P(R + ep + 6, PORT_ASP)], sor = [P(R + ep + 6, PORT_REF), P(R + ep + 42, PORT_REF)];
      m += `<line x1="${f1(ent[0][0])}" y1="${f1(ent[0][1])}" x2="${f1(ent[1][0])}" y2="${f1(ent[1][1])}" stroke="${C.froid}" stroke-width="3" marker-end="url(#ro-bp)"/>`;
      if (vanneOuverte) m += `<line x1="${f1(sor[0][0])}" y1="${f1(sor[0][1])}" x2="${f1(sor[1][0])}" y2="${f1(sor[1][1])}" stroke="${C.chaud}" stroke-width="3" marker-end="url(#ro-hp)"/>`;
    }

    /* le clapet de refoulement : couché sur l'orifice, ou soulevé */
    const c1 = P(R - 2, PORT_REF - DEMI), c2 = P(R - 2, PORT_REF + DEMI);
    if (vanneOuverte) {
      const t = [c2[0] - c1[0], c2[1] - c1[1]], n = dir(PORT_REF).map(v => -v);
      const h = Math.hypot(t[0], t[1]) || 1, ux = t[0] / h, uy = t[1] / h;
      m += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(c1[0] + 17 * k * (0.5 * ux + 0.87 * n[0]))}" y2="${f1(c1[1] + 17 * k * (0.5 * uy + 0.87 * n[1]))}" stroke="${C.chaud}" stroke-width="${w(3.5)}" stroke-linecap="round"/>`;
    } else {
      m += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(c2[0])}" y2="${f1(c2[1])}" stroke="${C.navy}" stroke-width="${w(3.5)}" stroke-linecap="round"/>`;
    }
    if (!mini) {
      const q = P(R, phi);
      m += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="5" fill="${C.navy}" stroke="${C.papier}" stroke-width="2"/>`;
      m += `<path d="${arc(118, 160, 150)}" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#ro-rot)"/>`;
    }
    return m;
  }

  /* ================================================================== les dessins vivants
     (« Animer les réseaux », 04/10/2026, sur le modèle du pilote 3.2). Les fonctions ci-dessus dessinent
     une image fixe : elles servent au récapitulatif du temps 5. Celles-ci font tourner le mécanisme. */
  const RETRAIT = 0.4;                                     /* ce qui n'agit pas à cette étape */
  function atelier(d, W, H) {
    const D = window.VOYAGE_DESSIN;
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const couches = [], etiquettes = [], anime = [];
    let temps = 1.6;
    const fond = () => {
      D.defs(d);
      D.el('rect', { x: 6, y: 6, width: W - 12, height: H - 12, rx: 16, fill: C.papier, stroke: C.trait }, d);
      /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
         cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
      D.filigrane(d, [[W * 0.235, H * 0.278], [W * 0.5, H * 0.516], [W * 0.765, H * 0.753]], 250).querySelectorAll('text')
        .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });
    };
    const couche = c => { const g = D.el('g', { 'data-c': c }, d); couches.push({ g, c, v: 1, cible: 1 }); return g; };
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700, fill: base.fill });
      return t;
    };
    const image = now => {
      const dt = FIGE ? 0 : Math.min(0.1, Math.max(0, now - temps)); temps = now;
      couches.forEach(L => { L.v += (L.cible - L.v) * Math.min(1, dt * 6); L.g.setAttribute('opacity', L.v.toFixed(2)); });
      anime.forEach(f => f(dt));
    };
    const allumer = (on, etiq) => {
      couches.forEach(L => { L.cible = on.has(L.c) ? 1 : RETRAIT; if (FIGE) L.v = L.cible; });
      etiquettes.forEach(e => { const oui = (etiq || on).has(e.c); e.t.setAttribute('fill', oui ? e.coul : e.fill); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
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
    return { D, FIGE, fond, couche, ecrire, anime, allumer, demarrer };
  }
  const chemin = (ps, z) => 'M ' + ps.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + (z ? ' Z' : '');
  const fleche = (D, d, id, coul) => {
    const m = D.el('marker', { id, markerUnits: 'userSpaceOnUse', markerWidth: 16, markerHeight: 16, refX: 13, refY: 8, orient: 'auto' }, d.querySelector('defs'));
    D.el('path', { d: 'M0 1 L14 8 L0 15 z', fill: coul }, m);
  };
  /* la légende, colonne de droite : une pastille, une ou deux lignes ; c : ce qu'elle désigne (le pas l'allume) */
  const legende = (A, y, pastille, lignes, c, coul) => {
    pastille(y - 7);
    lignes.forEach((s, i) => A.ecrire(650, y + i * 28, s, c, coul));
  };

  /* ---------- le scroll qui tourne ----------
     L'orbite avance en continu, au ralenti (V radians par seconde). Chaque pas repart de l'instant que
     montrait le dessin fixe (la poche ouverte, à peine fermée, à mi-chemin, presque au centre, au centre),
     puis le mouvement continue. Une poche porte ses molécules de gaz : elles restent les mêmes quand la
     poche se ferme et rétrécit, donc elles se serrent (la pression monte) et chauffent (couleur =
     température). Au centre, elles partent par l'orifice de refoulement. */
  function scrollPasAPas() {
    const W = 1000, H = 640, CX = 300, CY = 340, K = 1.42, V = 0.8;
    const d = svg('0 0 1000 640',
      'Un compresseur scroll vu du dessus, en coupe, qui tourne au ralenti : une spirale fixe bleu marine, une spirale mobile ocre qui orbite sans tourner sur elle-même. Le gaz froid entre au pourtour, en petites molécules bleues ; une poche se ferme, glisse vers le centre en rétrécissant : les molécules se serrent et passent du bleu au rouge ; au centre, le gaz chaud sort par l’orifice de refoulement.');
    const A = atelier(d, W, H), D = A.D;
    A.fond();
    fleche(D, d, 'sc-v-bp', C.froid); fleche(D, d, 'sc-v-orb', C.ambre);
    const { t0, t1, rho, vie, ep } = SC;
    const T = p => [CX + K * p[0], CY + K * p[1]];

    /* le carter, plein de gaz froid à basse pression */
    D.el('circle', { cx: CX, cy: CY, r: 172 * K, fill: GAZ_BP, stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '8 7' }, d);
    const gP = D.el('g', {}, d), gM = D.el('g', {}, d);
    const poolP = Array.from({ length: 18 }, () => D.el('path', { stroke: 'none', fill: 'none' }, gP));
    const poolM = Array.from({ length: 160 }, () => D.el('circle', { r: 4.2, 'stroke-width': 1.2, stroke: C.navy, 'stroke-opacity': 0.5, opacity: 0 }, gM));
    const contour = D.el('path', { fill: 'none', stroke: C.orange, 'stroke-width': 3.5, 'stroke-linejoin': 'round', opacity: 0 }, d);
    /* les deux spirales : la fixe ; la mobile, c'est la fixe retournée d'un demi-tour, que l'orbite déplace sans la tourner */
    D.el('path', { d: chemin(echant(t => dev(t, 0), t0, t1).map(T)), fill: 'none', stroke: C.navy, 'stroke-width': ep * K, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, d);
    const mobile = D.el('path', { d: chemin(echant(t => { const p = dev(t, 0); return [-p[0], -p[1]]; }, t0, t1).map(T)), fill: 'none', stroke: C.ambre, 'stroke-width': ep * K, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, d);
    /* au centre, la chambre de refoulement (gaz chaud) et son orifice */
    D.el('circle', { cx: CX, cy: CY, r: SC.a * Math.hypot(1, t0) * K, fill: D.couleur(0.95), 'fill-opacity': 0.4, stroke: 'none' }, gP);
    D.el('circle', { cx: CX, cy: CY, r: 6 * K, fill: C.chaud, stroke: C.chaud, 'stroke-width': 2 }, d);
    const anneau = D.el('circle', { cx: CX, cy: CY, r: 17, fill: 'none', stroke: C.chaud, 'stroke-width': 3.5, opacity: 0 }, d);
    const sceau = D.el('circle', { cx: CX, cy: CY, r: 11, fill: 'none', stroke: C.orange, 'stroke-width': 3.5, opacity: 0 }, d);

    /* le gaz qui entre : une flèche au-delà de chacune des deux extrémités de spirale, là où le pourtour est libre */
    const bout = dev(t1, 0), aF = Math.atan2(bout[1], bout[0]);
    const gE = A.couche('entree');
    const entrees = [aF + 0.55, aF + 0.55 + PI].map(a => {
      const u = [Math.cos(a), Math.sin(a)], p0 = [CX + 300 * u[0], CY + 300 * u[1]], p1 = [CX + 250 * u[0], CY + 250 * u[1]];
      D.el('path', { d: chemin([p0, p1]), fill: 'none', stroke: C.froid, 'stroke-width': 4, 'marker-end': 'url(#sc-v-bp)' }, gE);
      return { p0, p1, m: [0, 1, 2].map(() => D.el('circle', { r: 4.2, fill: D.couleur(0.12, true), stroke: C.navy, 'stroke-opacity': 0.5, 'stroke-width': 1.2 }, gE)) };
    });

    /* les poches de l'instant phi (phi : l'âge de la poche suivie, en radians d'orbite, sans borne) ;
       une poche est repérée par sa famille et son rang de naissance b : elle garde ses molécules */
    const poches = phi => {
      const n = Math.floor(phi / (2 * PI)), ph = phi - 2 * PI * n;
      const theta = t1 - PI / 2 - ph, dd = [rho * Math.cos(theta), rho * Math.sin(theta)];
      const mir = f => s => { const p = f(s); return [dd[0] - p[0], dd[1] - p[1]]; };
      const L = [];
      for (let fam = 1; fam <= 2; fam++) {
        const fixe = fam === 1 ? faceExt : faceInt, mob = fam === 1 ? mir(faceInt) : mir(faceExt), off = fam === 1 ? PI : -PI;
        for (let k = -4; k <= 2; k++) {
          const c = theta + (fam === 1 ? -PI / 2 : PI / 2) + 2 * PI * k;
          /* la poche dessinée : là où les DEUX parois existent, appariées (tau sur la fixe, tau + off sur la mobile) —
             elle se referme ainsi entre deux points qui se font face, jamais par un trait qui traverse la spirale */
          const lo = Math.max(c, t0, t0 - off), hi = Math.min(c + 2 * PI, t1, t1 - off);
          if (hi <= lo + 0.05) continue;
          L.push({ fam, b: n + k + 1, age: ph - 2 * PI * (k + 1), c, fixe, mob, off, lo, hi });
        }
      }
      return { theta, dd, L };
    };
    const NM = 9;
    const molecules = {};                                  /* par poche : les coordonnées (s, w) de ses molécules */
    const lesMol = (fam, b) => {
      const cle = fam + ':' + b;
      if (!molecules[cle]) {
        const r = D.alea(((b + 1000) * 7919 + fam * 104729) >>> 0);
        molecules[cle] = Array.from({ length: NM }, () => ({ s: 0.08 + 0.84 * r(), w: 0.2 + 0.6 * r(), p1: r() * 6.28, p2: r() * 6.28 }));
      }
      return molecules[cle];
    };
    const tempDe = age => 0.12 + 0.83 * borne(age / vie, 0, 1);

    /* la colonne de droite : la légende, puis le mouvement orbital */
    const gLeg = D.el('g', {}, d);
    legende(A, 96, y => D.el('path', { d: `M606 ${y} H636`, stroke: C.navy, 'stroke-width': 7, 'stroke-linecap': 'round' }, gLeg), ['spirale fixe'], null);
    legende(A, 134, y => D.el('path', { d: `M606 ${y} H636`, stroke: C.ambre, 'stroke-width': 7, 'stroke-linecap': 'round' }, gLeg), ['spirale mobile : elle orbite'], 'orbite', C.ambre);
    legende(A, 172, y => D.el('rect', { x: 606, y: y - 9, width: 30, height: 18, rx: 3, fill: GAZ_BP, stroke: 'none' }, gLeg), ['gaz froid, basse pression'], 'froid', C.froid);
    D.el('linearGradient', { id: 'sc-v-deg', x1: 0, x2: 1, y1: 0, y2: 0 }, d.querySelector('defs')).innerHTML = `<stop offset="0" stop-color="${D.couleur(0.12)}"/><stop offset="1" stop-color="${D.couleur(0.95)}"/>`;
    legende(A, 210, y => D.el('rect', { x: 606, y: y - 9, width: 30, height: 18, rx: 3, fill: 'url(#sc-v-deg)', stroke: 'none' }, gLeg), ['poche suivie : le gaz s’y', 'comprime et chauffe'], 'poche', C.orange);
    legende(A, 276, y => D.el('circle', { cx: 621, cy: y, r: 8, fill: C.chaud, stroke: 'none' }, gLeg), ['refoulement : le gaz chaud', 'sort au centre'], 'refoul', C.chaud);
    const OX = 642, OY = 420, RO_ = 34;
    A.ecrire(606, 364, 'Le mouvement orbital', 'orbite', C.ambre, { 'font-weight': 700 });
    D.el('circle', { cx: OX, cy: OY, r: RO_, fill: 'none', stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '4 4' }, gLeg);
    const arc = D.el('path', { fill: 'none', stroke: C.ambre, 'stroke-width': 3, 'marker-end': 'url(#sc-v-orb)' }, gLeg);
    const point = D.el('circle', { r: 8, fill: C.ambre, stroke: 'none' }, gLeg);
    ['le centre de la spirale', 'mobile décrit un petit', 'cercle ; elle ne tourne', 'pas sur elle-même.'].forEach((s, i) => A.ecrire(700, 410 + i * 28, s, 'orbite', C.ambre));
    A.ecrire(40, 50, 'LE SCROLL — vue du dessus, en coupe', null, null, { 'font-size': 22, 'font-weight': 700 });
    A.ecrire(60, 104, 'aspiration', 'froid', C.froid);
    A.ecrire(470, 602, 'aspiration', 'froid', C.froid);

    /* ---------- une image : tout avance selon le temps ---------- */
    const PHI0 = [-1.3, 0.3, 2.6, 4.9, 6.9];               /* les instants du dessin fixe, un par pas */
    let si = 0, tl = 0, t = 1.6;
    A.anime.push(dt => {
      tl += dt; t += dt;
      const phi = PHI0[si] + V * tl;
      const { theta, dd, L } = poches(phi);
      mobile.setAttribute('transform', 'translate(' + (K * dd[0]).toFixed(1) + ' ' + (K * dd[1]).toFixed(1) + ')');
      let ip = 0, im = 0, suivie = null;
      L.forEach(p => {
        const ouverte = p.age < 0, auCentre = p.age > vie, tp = ouverte ? 0.12 : auCentre ? 0.95 : tempDe(p.age);
        /* au centre, la poche s'est ouverte sur la chambre de refoulement : on la referme par le centre */
        const poly = echant(p.fixe, p.lo, p.hi).concat(echant(p.mob, p.lo + p.off, p.hi + p.off).reverse(), auCentre ? [[0, 0]] : []).map(T);
        if (!(ouverte && p.fam === 2) && ip < poolP.length) {
          const el = poolP[ip++];
          el.setAttribute('d', chemin(poly, true));
          el.setAttribute('fill', D.couleur(tp));
          el.setAttribute('fill-opacity', ouverte ? 0.35 : p.fam === 1 ? (auCentre ? 0.5 : 0.62) : (auCentre ? 0.3 : 0.24));
        }
        if (p.fam === 1) {
          const veut = si === 0 ? ouverte : si === 4 ? auCentre && p.age < vie + 2 * PI : !ouverte && !auCentre;
          if (veut) suivie = { p, poly };
        }
        /* ses molécules */
        const f = auCentre ? borne((p.age - vie) / 1.3, 0, 1) : 0, agit = 0.5 + 0.9 * tp;
        lesMol(p.fam, p.b).forEach(m => {
          if (im >= poolM.length) return;
          const s = borne(m.s + 0.022 * agit * Math.sin(1.7 * t + m.p1), 0.04, 0.96), w = borne(m.w + 0.13 * agit * Math.sin(2.3 * t + m.p2), 0.12, 0.88);
          const tau = p.c + s * 2 * PI, tau2 = tau + p.off;
          let op = borne((p.hi + 0.4 - tau) / 0.4, 0, 1) * borne((tau - p.lo + 0.4) / 0.4, 0, 1) * (1 - f);
          if (op <= 0.02) return;
          const a = p.fixe(tau), b = p.mob(tau2);
          let x = a[0] + (b[0] - a[0]) * w, y = a[1] + (b[1] - a[1]) * w;
          x *= 1 - f; y *= 1 - f;                           /* au centre : elles partent par l'orifice */
          const [X, Y] = T([x, y]), el = poolM[im++];
          el.setAttribute('cx', X.toFixed(1)); el.setAttribute('cy', Y.toFixed(1));
          el.setAttribute('fill', D.couleur(tp, true)); el.setAttribute('opacity', op.toFixed(2));
        });
      });
      for (; ip < poolP.length; ip++) poolP[ip].setAttribute('d', 'M 0 0');
      for (; im < poolM.length; im++) poolM[im].setAttribute('opacity', 0);
      /* la poche suivie : son contour ; au pas 2, le point où elle vient de se fermer ; au pas 5, l'orifice */
      contour.setAttribute('opacity', suivie ? 1 : 0);
      if (suivie) { contour.setAttribute('d', chemin(suivie.poly, true)); contour.setAttribute('stroke', si === 0 ? C.froid : si === 4 ? C.chaud : C.orange); }
      if (si === 1 && suivie) { const [X, Y] = T(faceExt(suivie.p.c + 2 * PI)); sceau.setAttribute('cx', X.toFixed(1)); sceau.setAttribute('cy', Y.toFixed(1)); sceau.setAttribute('opacity', 1); }
      else sceau.setAttribute('opacity', 0);
      anneau.setAttribute('opacity', si === 4 ? 0.6 + 0.4 * Math.sin(t * 4) : 0);
      /* le gaz qui entre, et l'orbite en encart */
      entrees.forEach(e => e.m.forEach((m, i) => {
        const f2 = D.frac(t * 0.55 + i / 3), x = e.p0[0] + (e.p1[0] - e.p0[0]) * f2, y = e.p0[1] + (e.p1[1] - e.p0[1]) * f2;
        m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1)); m.setAttribute('opacity', D.fenetre(f2, 0, 1, 0.15).toFixed(2));
      }));
      const pt = a => [OX + RO_ * Math.cos(a), OY + RO_ * Math.sin(a)];
      const [px, py] = pt(theta), deb = pt(theta - 0.35), fin = pt(theta - 1.9);
      point.setAttribute('cx', px.toFixed(1)); point.setAttribute('cy', py.toFixed(1));
      arc.setAttribute('d', `M${deb[0].toFixed(1)} ${deb[1].toFixed(1)} A${RO_} ${RO_} 0 0 0 ${fin[0].toFixed(1)} ${fin[1].toFixed(1)}`);
    });

    /* le pas à pas : chaque pas repart de son instant et allume ce qu'il raconte */
    const ETIQ = [['froid', 'entree'], ['poche'], ['poche', 'orbite'], ['poche'], ['refoul']];
    const aller = k => { si = k; tl = 0; A.allumer(new Set(['entree']), new Set(ETIQ[k])); };
    const etapes = [
      { titre: 'La poche s’ouvre au pourtour', dire: 'Les deux spirales sont emboîtées. En orbitant, la spirale mobile s’écarte de la fixe : une poche s’ouvre sur le pourtour, et le gaz froid, à basse pression, y entre.',
        peindre: () => aller(0) },
      { titre: 'Elle se ferme : le gaz est enfermé', dire: 'Les deux spirales se rejoignent à l’entrée de la poche : elle est fermée. Le gaz qui y est entré est prisonnier, l’aspiration est terminée.',
        peindre: () => aller(1) },
      { titre: 'Elle glisse vers le centre en rétrécissant', dire: 'Le mouvement orbital pousse la poche le long de la spirale, vers le centre. Elle rétrécit : le gaz est comprimé, il monte en pression et il chauffe.',
        peindre: () => aller(2) },
      { titre: 'Plus petite, plus comprimé', dire: 'Plus la poche est petite, plus le gaz est serré. La pression monte sans à-coup, tout au long du trajet.',
        peindre: () => aller(3) },
      { titre: 'Au centre, elle s’ouvre sur le refoulement', dire: 'Arrivée au centre, la poche s’ouvre sur l’orifice de refoulement : le gaz chaud, sous haute pression, part vers le condenseur. Au pourtour, une autre poche s’ouvre déjà.',
        peindre: () => aller(4) }
    ];
    const hote = pasAPas(d, etapes, 'Vue du dessus, en coupe. La poche suivie est en couleur vive ; sa symétrique, de l’autre côté, fait la même chose, en pâle.');
    A.demarrer();
    return hote;
  }

  /* ---------- le rotatif qui tourne ----------
     L'arbre tourne en continu, au ralenti (OM degrés par seconde) ; chaque pas repart de l'angle que
     montrait le dessin fixe. Le rouleau roule contre la paroi, la palette suit, poussée par son ressort.
     Derrière le rouleau, le gaz froid entre, molécule après molécule ; devant lui, la charge du tour
     d'avant est enfermée : elle se serre et chauffe ; quand la pression est assez haute, le clapet se
     soulève et les molécules chaudes sortent une à une. */
  function rotatifPasAPas() {
    const W = 1000, H = 640, CX = 300, CY = 372, K = 1.25, OM = 32;
    const d = svg('0 0 1000 640',
      'Un compresseur rotatif vu du dessus, en coupe, qui tourne au ralenti : un rouleau monté sur un arbre excentré roule contre la paroi d’un cylindre ; une palette, poussée par un ressort, reste appuyée sur lui. Derrière le rouleau, le gaz froid entre par l’aspiration ; devant lui, le gaz enfermé se serre et chauffe ; le clapet se soulève et le gaz chaud sort par le refoulement.');
    const A = atelier(d, W, H), D = A.D;
    A.fond();
    fleche(D, d, 'ro-v-rot', C.navy);
    const { R, r, e, ep } = RO;
    const rad = a => a * PI / 180, dir = a => [-Math.sin(rad(a)), -Math.cos(rad(a))];
    const P = (rh, a) => { const u = dir(a); return [CX + K * rh * u[0], CY + K * rh * u[1]]; };
    const sDe = (a, ph) => e * Math.cos(rad(a - ph)) + Math.sqrt(r * r - Math.pow(e * Math.sin(rad(a - ph)), 2));
    const bords = (a, b, f) => { const n = Math.max(2, Math.ceil(Math.abs(b - a) / 3)); return Array.from({ length: n + 1 }, (_, i) => f(a + (b - a) * i / n)); };
    const chambre = (a, b, ph) => chemin(bords(a, b, x => P(R, x)).concat(bords(b, a, x => P(sDe(x, ph), x))), true);
    const aire = (a, b, ph) => { let s = 0; const n = 60; for (let i = 0; i < n; i++) { const x = a + (b - a) * (i + .5) / n; s += R * R - Math.pow(sDe(x, ph), 2); } return s * rad(b - a) / n / 2; };
    const AS = [], AC = [];
    for (let p = 0; p <= 360; p++) { AS[p] = p > 4 ? aire(3.5, p, p) : 0; AC[p] = p < 356 ? aire(p, 356.5, p) : 0; }
    const lire = (tab, p) => { const i = Math.max(0, Math.min(359, Math.floor(p))), f = p - i; return tab[i] * (1 - f) + tab[i + 1] * f; };
    const OUVRE = 280, FERME = 350;                        /* le clapet : levé quand la pression est assez haute */
    const AS_MAX = lire(AS, 356), AC_0 = lire(AC, 18.5), AC_OUV = lire(AC, OUVRE);
    const NM = 12, FILE = 3;                               /* molécules par tour ; combien attendent dans un tube */

    /* le gaz : la chambre d'aspiration derrière le rouleau, la chambre de compression devant */
    D.el('circle', { cx: CX, cy: CY, r: R * K, fill: C.creme, stroke: 'none' }, d);
    const gAsp = A.couche('aspi'), gCmp = A.couche('compr');
    const chAsp = D.el('path', { fill: D.couleur(0.12), 'fill-opacity': 0.45, stroke: 'none' }, gAsp);
    const chCmp = D.el('path', { 'fill-opacity': 0.55, stroke: 'none' }, gCmp);
    /* le rouleau, sa came excentrée, l'arbre */
    const gRou = A.couche('rouleau');
    const rouleau = D.el('circle', { r: r * K, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3.5 }, gRou);
    const reperes = D.el('g', {}, gRou);
    [0, 90, 180, 270].forEach(a => D.el('path', { d: `M 0 ${-r * K * 0.66} V ${-r * K * 0.88}`, stroke: C.navy, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.55, transform: 'rotate(' + a + ')' }, reperes));
    const came = D.el('circle', { r: 50 * K, fill: '#c3ccd6', stroke: C.navy, 'stroke-width': 2 }, gRou);
    const contact = D.el('circle', { r: 5, fill: C.navy, stroke: C.papier, 'stroke-width': 2 }, gRou);
    const bras = D.el('path', { stroke: C.navy, 'stroke-width': 5, 'stroke-linecap': 'round' }, gRou);
    D.el('circle', { cx: CX, cy: CY, r: 14 * K, fill: C.navy, stroke: 'none' }, gRou);
    /* la palette, son ressort, son logement */
    const gPal = A.couche('palette');
    const fondP = CY - K * (R + 86);
    D.el('path', { d: `M${CX - 16 * K} ${CY - K * (R + ep)} V${fondP} H${CX + 16 * K} V${CY - K * (R + ep)}`, fill: 'none', stroke: C.navy, 'stroke-width': 3.5 }, gPal);
    const ressort = D.el('path', { fill: 'none', stroke: C.gris, 'stroke-width': 3, 'stroke-linejoin': 'round' }, gPal);
    const palette = D.el('rect', { x: CX - 6 * K, width: 12 * K, rx: 2 * K, fill: C.ambre, stroke: C.navy, 'stroke-width': 2 }, gPal);
    /* la paroi du cylindre, percée de la palette et des deux orifices */
    const arc = (a, b, rh) => { const p = P(rh, a), q = P(rh, b); return `M${p[0].toFixed(1)} ${p[1].toFixed(1)} A${(rh * K).toFixed(1)} ${(rh * K).toFixed(1)} 0 ${b - a > 180 ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; };
    [[4, PORT_ASP - DEMI], [PORT_ASP + DEMI, PORT_REF - DEMI], [PORT_REF + DEMI, 356]].forEach(([a, b]) =>
      D.el('path', { d: arc(a, b, R + ep / 2), fill: 'none', stroke: C.navy, 'stroke-width': ep * K }, d));
    /* les deux tubes, et ce qui y passe */
    const tube = (g, a) => {
      const p = P(R + ep, a), q = P(R + ep + 46, a);
      D.el('path', { d: chemin([p, q]), stroke: C.navy, 'stroke-width': 15 * K, fill: 'none' }, g);
      D.el('path', { d: chemin([p, q]), stroke: C.papier, 'stroke-width': 9 * K, fill: 'none' }, g);
      return { p, q };
    };
    const tAsp = tube(gAsp, PORT_ASP);
    const gCla = A.couche('clapet');
    const tRef = tube(gCla, PORT_REF);
    /* le clapet de refoulement : une lame posée sur la face EXTÉRIEURE de l'orifice, côté refoulement ; elle se
       soulève vers le tube quand la pression du gaz enfermé dépasse celle du refoulement */
    const clapet = D.el('path', { stroke: C.navy, 'stroke-width': 3.5 * K, 'stroke-linecap': 'round', fill: 'none' }, gCla);
    const c1 = P(R + ep + 1, PORT_REF - DEMI - 1.5), c2 = P(R + ep + 1, PORT_REF + DEMI + 1.5);
    const lg = Math.hypot(c2[0] - c1[0], c2[1] - c1[1]) || 1, tu = [(c2[0] - c1[0]) / lg, (c2[1] - c1[1]) / lg], nn = dir(PORT_REF);
    /* les molécules : celles qui entrent, celles qui sont enfermées, celles qui sortent */
    const mol = g => D.el('circle', { r: 4.3, 'stroke-width': 1.2, stroke: C.navy, 'stroke-opacity': 0.5, opacity: 0 }, g);
    const mAsp = Array.from({ length: NM }, () => mol(gAsp)), mCmp = Array.from({ length: NM }, () => mol(gCmp)), mRef = Array.from({ length: NM }, () => mol(gCla));
    const tirage = n => { const al = D.alea((n + 1000) * 7919 >>> 0); return Array.from({ length: NM }, () => ({ w: 0.22 + 0.56 * al(), p1: al() * 6.28, p2: al() * 6.28 })); };
    const charges = {};
    const charge = n => charges[n] || (charges[n] = tirage(n));
    /* le sens de rotation */
    D.el('path', { d: arc(118, 160, 150), fill: 'none', stroke: C.navy, 'stroke-width': 3, 'marker-end': 'url(#ro-v-rot)' }, d);

    /* la colonne de droite : la légende */
    const gLeg = D.el('g', {}, d);
    const barre = (coul, w) => y => D.el('path', { d: `M606 ${y} H636`, stroke: coul, 'stroke-width': w || 7, 'stroke-linecap': 'round' }, gLeg);
    const carre = coul => y => D.el('rect', { x: 606, y: y - 9, width: 30, height: 18, rx: 3, fill: coul, stroke: 'none' }, gLeg);
    D.el('linearGradient', { id: 'ro-v-deg', x1: 0, x2: 1, y1: 0, y2: 0 }, d.querySelector('defs')).innerHTML = `<stop offset="0" stop-color="${D.couleur(0.15)}"/><stop offset="1" stop-color="${D.couleur(0.95)}"/>`;
    legende(A, 96, barre(C.ambre), ['palette, poussée', 'par son ressort'], 'palette', C.ambre);
    legende(A, 162, y => D.el('circle', { cx: 621, cy: y, r: 11, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 2 }, gLeg), ['rouleau, sur', 'l’arbre excentré'], 'rouleau', C.navy);
    legende(A, 228, barre(C.navy), ['cylindre fixe'], null);
    legende(A, 266, y => D.el('path', { d: `M612 ${y + 8} A10 10 0 1 0 612 ${y - 4}`, fill: 'none', stroke: C.navy, 'stroke-width': 3, 'marker-end': 'url(#ro-v-rot)' }, gLeg), ['sens de rotation', 'de l’arbre'], 'rouleau', C.navy);
    legende(A, 332, y => D.el('rect', { x: 606, y: y - 9, width: 30, height: 18, rx: 3, fill: D.couleur(0.12), 'fill-opacity': 0.45, stroke: 'none' }, gLeg), ['gaz froid : il entre'], 'aspi', C.froid);
    legende(A, 370, carre('url(#ro-v-deg)'), ['gaz enfermé : il se', 'comprime et chauffe'], 'compr', C.orange);
    legende(A, 436, carre(C.chaud), ['gaz chaud : il sort'], 'clapet', C.chaud);
    A.ecrire(40, 50, 'LE ROTATIF — vue du dessus, en coupe', null, null, { 'font-size': 22, 'font-weight': 700 });
    A.ecrire(226, 138, 'aspiration', 'aspi', C.froid, { 'text-anchor': 'end' });
    A.ecrire(374, 138, 'refoulement', 'clapet', C.chaud);

    /* ---------- une image : tout avance selon le temps ---------- */
    const PHI0 = [55, 135, 230, 305];                      /* les angles du dessin fixe, un par pas */
    let si = 0, tl = 0, t = 1.6, ouvert = 0;
    const surTube = (tb, f) => [tb.p[0] + (tb.q[0] - tb.p[0]) * f, tb.p[1] + (tb.q[1] - tb.p[1]) * f];
    A.anime.push(dt => {
      tl += dt; t += dt;
      const tot = PHI0[si] + OM * tl, tour = Math.floor(tot / 360), phi = tot - 360 * tour;
      const u = dir(phi), RC = [CX + K * e * u[0], CY + K * e * u[1]];
      rouleau.setAttribute('cx', RC[0].toFixed(1)); rouleau.setAttribute('cy', RC[1].toFixed(1));
      came.setAttribute('cx', RC[0].toFixed(1)); came.setAttribute('cy', RC[1].toFixed(1));
      bras.setAttribute('d', chemin([[CX, CY], RC]));
      const pc = P(R, phi); contact.setAttribute('cx', pc[0].toFixed(1)); contact.setAttribute('cy', pc[1].toFixed(1));
      reperes.setAttribute('transform', 'translate(' + RC[0].toFixed(1) + ' ' + RC[1].toFixed(1) + ') rotate(' + (((R - r) / r) * tot % 360).toFixed(1) + ')');
      /* la palette suit le rouleau ; le ressort se tasse */
      const pointe = CY - K * sDe(0, phi), haut = pointe - 70 * K;
      palette.setAttribute('y', haut.toFixed(1)); palette.setAttribute('height', (pointe - haut).toFixed(1));
      ressort.setAttribute('d', chemin(Array.from({ length: 7 }, (_, i) => [CX + (i === 0 || i === 6 ? 0 : (i % 2 ? -7 : 7)) * K, haut - (haut - fondP) * i / 6])));
      /* les deux chambres */
      chAsp.setAttribute('d', phi > 6 ? chambre(3.5, phi, phi) : 'M 0 0');
      const ac = lire(AC, phi), prog = phi < OUVRE ? borne(1 - ac / AC_0, 0, 1) : 1 - AC_OUV / AC_0, tC = 0.15 + 0.8 * borne(prog / (1 - AC_OUV / AC_0), 0, 1);
      chCmp.setAttribute('d', phi < 355 ? chambre(phi, 356.5, phi) : 'M 0 0'); chCmp.setAttribute('fill', D.couleur(tC));
      /* le clapet */
      const cible = phi >= OUVRE && phi < FERME ? 1 : 0;
      ouvert += (cible - ouvert) * Math.min(1, dt * 10); if (A.FIGE) ouvert = cible;
      const ang = ouvert, vx = (1 - ang) * tu[0] + ang * (0.6 * tu[0] + 0.8 * nn[0]), vy = (1 - ang) * tu[1] + ang * (0.6 * tu[1] + 0.8 * nn[1]), nv = Math.hypot(vx, vy) || 1;
      clapet.setAttribute('d', chemin([c1, [c1[0] + lg * vx / nv, c1[1] + lg * vy / nv]])); clapet.setAttribute('stroke', ang > 0.5 ? C.chaud : C.navy);
      /* les molécules qui entrent (la charge de ce tour), puis celles du tour d'avant, enfermées ou qui sortent */
      const posIn = (a, w, ph) => { const s = sDe(a, ph), rh = s + (R - s) * w; return P(rh, a); };
      const nIn = NM * lire(AS, phi) / AS_MAX;
      const cA = charge(tour), cC = charge(tour - 1);
      mAsp.forEach((m, j) => {
        const q = j + 0.5 - nIn;
        let x, y, op = 1;
        if (q <= 0 && phi > 6) {                           /* entrée : rangée par ordre d'arrivée, de l'orifice au rouleau */
          const uu = 1 - (j + 0.5) / Math.max(nIn, 0.5), a = 3.5 + uu * (phi - 3.5);
          const w = borne(cA[j].w + 0.1 * Math.sin(2.1 * t + cA[j].p2), 0.12, 0.88);
          [x, y] = posIn(a + 1.5 * Math.sin(1.6 * t + cA[j].p1), w, phi);
        } else if (q < FILE) {                             /* elle attend dans le tube d'aspiration */
          [x, y] = surTube(tAsp, D.borne(q / FILE, 0, 1)); op = D.fenetre(1 - q / FILE, 0, 1, 0.25);
        } else op = 0;
        m.setAttribute('cx', (x || 0).toFixed(1)); m.setAttribute('cy', (y || 0).toFixed(1));
        m.setAttribute('fill', D.couleur(0.12, true)); m.setAttribute('opacity', op.toFixed(2));
      });
      const nTrap = phi < OUVRE ? NM : NM * Math.max(0, lire(AC, Math.min(phi, 356))) / AC_OUV, partis = NM - nTrap;
      mCmp.forEach((m, j) => {
        let op = 0, x = 0, y = 0;
        if (j + 0.5 > partis && phi < 355) {
          const uu = phi < OUVRE ? 1 - (j + 0.5) / NM : 1 - (j - partis + 0.5) / Math.max(nTrap, 0.5), a = phi + borne(uu, 0, 1) * (356.5 - phi);
          const w = borne(cC[j].w + 0.12 * Math.sin((2 + 2 * tC) * t + cC[j].p2), 0.12, 0.88);
          [x, y] = posIn(a + (1 + 2 * tC) * Math.sin((1.6 + 2 * tC) * t + cC[j].p1) * borne((356.5 - a) / 20, 0, 1), w, phi); op = 1;
        }
        m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1));
        m.setAttribute('fill', D.couleur(tC, true)); m.setAttribute('opacity', op);
      });
      mRef.forEach((m, j) => {
        const q = partis - (j + 0.5);
        let op = 0, x = 0, y = 0;
        if (phi >= OUVRE && q >= 0 && q < FILE) { [x, y] = surTube(tRef, q / FILE); op = D.fenetre(1 - q / FILE, 0, 1, 0.2); }
        m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1));
        m.setAttribute('fill', D.couleur(0.95, true)); m.setAttribute('opacity', op.toFixed(2));
      });
    });

    /* le pas à pas : chaque pas repart de son angle, la pièce qui agit s'allume, le reste tourne en retrait */
    const ALLUME = [['rouleau', 'palette'], ['aspi'], ['compr'], ['clapet', 'compr']];
    const aller = k => { si = k; tl = 0; ouvert = PHI0[k] >= OUVRE ? 1 : 0; A.allumer(new Set(ALLUME[k]), new Set(ALLUME[k].slice(0, 1).concat(k === 0 ? ['palette'] : []))); };
    const etapes = [
      { titre: 'Le rouleau roule, la palette sépare', dire: 'L’arbre excentré fait rouler le rouleau le long de la paroi. La palette, poussée par son ressort, reste appuyée sur lui : elle coupe l’espace en deux, l’aspiration d’un côté, le refoulement de l’autre.',
        peindre: () => aller(0) },
      { titre: 'Derrière le rouleau, le gaz entre', dire: 'Derrière le rouleau, l’espace grandit : le gaz froid est aspiré par l’orifice d’aspiration.',
        peindre: () => aller(1) },
      { titre: 'Devant le rouleau, le gaz est comprimé', dire: 'Devant le rouleau, l’espace rétrécit : le gaz enfermé est de plus en plus serré. Il monte en pression et il chauffe.',
        peindre: () => aller(2) },
      { titre: 'Le clapet s’ouvre, le gaz chaud sort', dire: 'Quand la pression est assez haute, le clapet s’ouvre et le gaz chaud part vers le condenseur. Le rouleau revient contre la palette, et le tour recommence.',
        peindre: () => aller(3) }
    ];
    const hote = pasAPas(d, etapes, 'Vue du dessus, en coupe. Le rouleau et la palette ne se quittent jamais : c’est ce contact qui sépare les deux côtés.');
    A.demarrer();
    return hote;
  }

  /* ================================================================== temps 2 : les deux, l'un sous l'autre */
  function compresseurs() {
    const hote = document.createElement('div');
    const titre = t => { const h = document.createElement('h3'); h.textContent = t; h.style.cssText = 'margin:.9rem 0 .3rem;font-size:1em;color:' + C.navy; return h; };
    hote.append(titre('Le scroll : une poche, du pourtour au centre'), scrollPasAPas(),
                titre('Le rotatif : un rouleau, une palette'), rotatifPasAPas());
    return hote;
  }

  /* ================================================================== temps 5 : les deux côte à côte */
  function recapitulatif() {
    const d = svg('0 0 820 376', 'Récapitulatif : à gauche le rotatif, un rouleau et une palette, pour les petits splits ; à droite le scroll, deux spirales, pour les gros splits, les DRV, les roof-top et les pompes à chaleur. Même rôle : aspirer un gaz froid et le refouler chaud, sous pression.');
    d.innerHTML = `
<rect x="10" y="10" width="800" height="356" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="215" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Rotatif</text>
<text x="605" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Scroll</text>
${rotatifDessin(135, 215, 190, 0.58, { mini: true })}
${scrollDessin(2.6, 605, 178, 0.58).markup}
<text x="215" y="300" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">un rouleau et une palette</text>
<text x="215" y="320" text-anchor="middle" font-size="14" fill="${C.gris}">petits splits, monoblocs</text>
<text x="605" y="300" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">deux spirales, une fixe, une qui orbite</text>
<text x="605" y="320" text-anchor="middle" font-size="14" fill="${C.gris}">gros splits, DRV, roof-top, pompes à chaleur</text>
<text x="410" y="350" text-anchor="middle" font-size="14" font-weight="700" fill="${C.chaud}">Même rôle : aspirer un gaz froid, le refouler chaud et sous pression.</text>`;
    return d;
  }

  return { compresseurs, recapitulatif, scrollPasAPas, rotatifPasAPas };
})();
