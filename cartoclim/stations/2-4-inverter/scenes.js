/* CartoClim 2.4 — scènes de l'Inverter.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : six pas. Deux courbes de température qui
   s'écrivent en direct (tout-ou-rien en dents de scie, Inverter presque plate), puis la chaîne réseau →
   redresseur → onduleur → moteur du compresseur, puis l'écart entre consigne et mesure qui fait monter ou
   descendre la vitesse — avec le COURANT, la VITESSE et le DÉBIT qui bougent (« Animer les réseaux »,
   04/10/2026). Temps 5 : le tableau tout-ou-rien / Inverter.

   Ce qui bouge (tout se calcule à partir du temps, requestAnimationFrame — ni SMIL ni animation CSS) :
   · une même pièce, deux machines : la température suit ce que la pièce gagne (sa charge) et ce que le
     compresseur retire. Le tout-ou-rien s'allume à fond au-dessus de la consigne, s'arrête en dessous :
     dents de scie. L'Inverter règle sa vitesse sur l'écart : la courbe reste presque plate. Les deux
     courbes défilent, le bandeau du dessous montre le compresseur (à fond ou arrêté / sa vitesse) ;
   · la chaîne : le réseau, une onde à fréquence fixe ; le redresseur, un trait continu ; l'onduleur, une
     onde dont la fréquence suit la vitesse demandée ; le moteur tourne d'autant ; le fluide file d'autant
     (le débit suit la vitesse) ;
   · pas 4 : la demande de la pièce monte et descend, la fréquence suit ; pas 5 : la pièce se réchauffe
     d'un coup, l'écart grandit, la vitesse monte ; pas 6 : la charge retombe, l'écart fond, la vitesse
     descend, sans arrêt.
   Aucune valeur chiffrée : ni fréquence, ni tension, ni vitesse — elles viennent de la notice.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.
   Aucun texte sur un tracé : vérifié par outils/controler-scene-vivante.mjs. Étiquettes en taille 21 dans
   1 000 : au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const RETRAIT = 0.4;
  const TEINTE = 'rgba(201,69,26,.10)';                    /* fond léger de la pièce qui agit */

  const txt = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" font-size="${o.s || 13}" font-weight="${o.w || 400}" fill="${o.f || C.gris}">${s}</text>`;

  /* ---------- la pièce et ses deux machines : une simulation simple, sans unité ----------
     température en écart à la consigne ; charge q (ce que la pièce gagne) ; un compresseur à fond retire PMAX.
     Tout-ou-rien : marche au-dessus de +BANDE, arrêt sous -BANDE. Inverter : vitesse = SMIN + GAIN × écart,
     bornée, et suivie avec un peu de retard (le moteur prend sa vitesse). */
  const CAP = 4, PMAX = 1.2, BANDE = 0.2, SMIN = 0.2, GAIN = 4, RETARD = 0.6;
  function piece() {
    const s = { tor: 0.1, on: false, inv: 0.05, v: 0.375, t: 0 };
    s.pas = (dt, q) => {
      for (let k = 0, n = Math.ceil(dt / 0.02); k < n; k++) {
        const h = dt / n;
        if (s.tor > BANDE) s.on = true; else if (s.tor < -BANDE) s.on = false;
        s.tor += h * (q - (s.on ? PMAX : 0)) / CAP;
        const cible = Math.min(1, Math.max(SMIN, SMIN + GAIN * s.inv));
        s.v += (cible - s.v) * Math.min(1, h / RETARD);
        s.inv += h * (q - PMAX * s.v) / CAP;
        s.t += h;
      }
    };
    return s;
  }

  function vitesseSuitLeBesoin() {
    const D = window.VOYAGE_DESSIN;
    const W = 1000, H = 640;
    const d = svg('0 0 1000 640',
      'En haut, deux courbes de température qui défilent : en dents de scie avec un compresseur tout-ou-rien, qui marche à fond puis s’arrête ; presque plate avec un Inverter, dont la vitesse varie. En bas, dans l’unité extérieure, la chaîne : le réseau à fréquence fixe, le redresseur qui donne du continu, l’onduleur qui refabrique une onde à fréquence variable, le moteur du compresseur qui tourne d’autant et le fluide qui file d’autant ; dessous, la consigne et la mesure donnent l’écart, qui règle la fréquence.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const couches = [], etiquettes = [], anime = [];
    const couche = c => { const g = D.el('g', { 'data-c': c }, d); couches.push({ g, c, v: 1, cible: 1 }); return g; };
    const ecrire = (x, y, s, c, coul, o, parent) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(parent || d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700, fill: base.fill });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    const trait = (g, dd, coul, w, o) => D.el('path', Object.assign({ d: dd, fill: 'none', stroke: coul, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, o || {}), g);

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: W - 12, height: H - 12, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });
    const defs = d.querySelector('defs');
    [['na', C.navy], ['or', C.orange]].forEach(([n, c]) => {
      const m = D.el('marker', { id: 'iv-' + n, markerUnits: 'userSpaceOnUse', markerWidth: 16, markerHeight: 16, refX: 15, refY: 8, orient: 'auto' }, defs);
      D.el('path', { d: 'M0 1 L15 8 L0 15 z', fill: c }, m);
    });

    /* ================= en haut : deux pièces, deux machines, deux courbes qui défilent ================= */
    const FEN = 16;                                        /* secondes visibles sur une courbe */
    const TMIN = -0.35, TMAX = 0.55;
    const histo = [];                                      /* { t, tor, on, inv, v } toutes les 0,05 s */
    const graphe = (c, dx, titre, sous, couleur) => {
      const g = couche(c), x0 = 150 + dx, x1 = 474 + dx, yb = 200, yh = 104;
      const cadre = D.el('rect', { x: 20 + dx, y: 14, width: 470, height: 276, rx: 12, fill: C.creme, stroke: C.trait, 'stroke-width': 3 }, g);
      trait(g, `M${x0} ${yh} V${yb} H${x1}`, C.navy, 2);
      const yC = yb - (0 - TMIN) / (TMAX - TMIN) * (yb - yh);
      trait(g, `M${x0} ${yC.toFixed(1)} H${x1}`, C.gris, 1.6, { 'stroke-dasharray': '6 5' });
      trait(g, `M${x0} 244 H${x1}`, C.navy, 1.6);
      const bande = D.el('path', { fill: couleur, 'fill-opacity': 0.32, stroke: 'none' }, g);
      const courbe = trait(g, '', couleur, 4);
      const point = D.el('circle', { r: 6, fill: couleur, stroke: C.papier, 'stroke-width': 2 }, g);
      ecrire(36 + dx, 42, titre, c, couleur, Object.assign({ 'font-size': 22 }, G));
      ecrire(36 + dx, 68, sous, c, couleur);
      ecrire(x0 + 6, 94, 'température', c, couleur, { fill: C.gris });
      ecrire(x0 - 8, yC + 7, 'consigne', null, null, Object.assign({ fill: C.gris }, F));
      ecrire(x0 - 8, 236, 'compresseur', c, couleur, F);
      ecrire(x1, 274, 'temps', null, null, Object.assign({ fill: C.gris }, F));
      return { cadre, courbe, bande, point, x0, x1, yb, yh, couleur };
    };
    const gTor = graphe('tor', 0, 'Tout-ou-rien', 'à fond, puis arrêt', C.chaud);
    const gInv = graphe('inv', 490, 'Inverter', 'la vitesse suit le besoin', C.vert);
    const yT = (gr, T) => gr.yb - (D.borne(T, TMIN, TMAX) - TMIN) / (TMAX - TMIN) * (gr.yb - gr.yh);
    const dessinerGraphe = (gr, cle, cleBande, tor) => {
      if (histo.length < 2) return;
      const tN = histo[histo.length - 1].t, X = t => gr.x1 - (tN - t) / FEN * (gr.x1 - gr.x0 - 2);
      const pts = histo.map(h => X(h.t).toFixed(1) + ' ' + yT(gr, h[cle]).toFixed(1));
      gr.courbe.setAttribute('d', 'M ' + pts.join(' L '));
      const haut = h => 244 - 28 * (tor ? (h[cleBande] ? 1 : 0) : h[cleBande]);
      let b = 'M ' + X(histo[0].t).toFixed(1) + ' 244';
      histo.forEach((h, i) => {
        const x = X(h.t).toFixed(1);
        if (tor && i) { const p = histo[i - 1]; if (p[cleBande] !== h[cleBande]) b += ' L ' + x + ' ' + haut(p).toFixed(1); }
        b += ' L ' + x + ' ' + haut(h).toFixed(1);
      });
      gr.bande.setAttribute('d', b + ' L ' + X(tN).toFixed(1) + ' 244 Z');
      gr.point.setAttribute('cx', X(tN).toFixed(1)); gr.point.setAttribute('cy', yT(gr, histo[histo.length - 1][cle]).toFixed(1));
    };

    /* ================= en bas : l'unité extérieure, ce qui commande le compresseur ================= */
    D.el('rect', { x: 20, y: 300, width: 960, height: 328, rx: 12, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    ecrire(36, 328, 'UNITÉ EXTÉRIEURE', null, null, G);
    const gCarte = couche('carte');
    const carteCadre = D.el('rect', { x: 196, y: 342, width: 390, height: 136, rx: 10, fill: 'none', stroke: C.navy, 'stroke-width': 2, 'stroke-dasharray': '8 5' }, gCarte);
    ecrire(410, 328, 'la carte électronique', 'carte', C.orange, G);

    const bloc = (c, x, w) => {
      const g = couche(c);
      const r = D.el('rect', { x, y: 350, width: w, height: 120, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 2 }, g);
      return { g, r };
    };
    const fleche = (c, x1, x2, y) => trait(couche(c), `M${x1} ${y} H${x2}`, C.navy, 3, { 'marker-end': 'url(#iv-na)' });
    const bR = bloc('reseau', 30, 150), bRe = bloc('redresseur', 204, 160), bO = bloc('onduleur', 388, 190), bM = bloc('moteur', 602, 368);
    fleche('redresseur', 182, 202, 412); fleche('onduleur', 366, 386, 412); fleche('moteur', 580, 600, 412);
    ecrire(105, 376, 'Réseau', 'reseau', C.orange, Object.assign({}, G, M));
    ecrire(105, 458, 'fréquence fixe', 'reseau', C.orange, M);
    ecrire(284, 376, 'Redresseur', 'redresseur', C.orange, Object.assign({}, G, M));
    ecrire(284, 458, 'continu', 'redresseur', C.orange, M);
    ecrire(483, 376, 'Onduleur', 'onduleur', C.orange, Object.assign({}, G, M));
    ecrire(483, 458, 'fréquence variable', 'onduleur', C.orange, M);
    ecrire(616, 376, 'Moteur du compresseur', 'moteur', C.orange, G);
    const motVitesse = ecrire(616, 461, 'vitesse basse', 'moteur', C.orange);
    ecrire(798, 461, 'débit de fluide', 'moteur', C.orange);

    /* les ondes : le réseau (fréquence fixe), le continu, l'onduleur (fréquence variable) */
    const ondeR = trait(bR.g, '', C.chaud, 3), ondeC = trait(bRe.g, '', C.chaud, 3), ondeO = trait(bO.g, '', C.chaud, 3);
    const onde = (x0, x1, yc, amp, cycles, phase) => {
      let s = '';
      for (let x = x0; x <= x1 + 0.1; x += 3) s += (s ? ' L ' : 'M ') + x.toFixed(1) + ' ' + (yc - amp * Math.sin(2 * Math.PI * (cycles * (x - x0) / (x1 - x0)) - phase)).toFixed(1);
      return s;
    };
    /* le moteur : un rotor qui tourne ; le fluide : un tube de cuivre, la vapeur qui file */
    D.el('circle', { cx: 646, cy: 410, r: 23, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, bM.g);
    const roue = D.el('g', {}, bM.g);
    [0, 120, 240].forEach(a => D.el('path', { d: 'M 0 0 L 0 -16', stroke: C.navy, 'stroke-width': 5, 'stroke-linecap': 'round', transform: 'rotate(' + a + ')' }, roue));
    D.el('circle', { cx: 0, cy: 0, r: 5, fill: C.navy }, roue);
    trait(bM.g, 'M 682 410 H 952', '#7a3f1c', 18, { 'stroke-linecap': 'butt' });
    trait(bM.g, 'M 682 410 H 952', '#c57a45', 15, { 'stroke-linecap': 'butt' });
    trait(bM.g, 'M 682 410 H 952', '#f4f8fc', 11, { 'stroke-linecap': 'butt' });
    trait(bM.g, 'M 682 410 H 952', D.couleur(0.9, true), 11, { opacity: 0.3, 'stroke-linecap': 'butt' });
    const mols = Array.from({ length: 9 }, () => D.el('circle', { r: 3.6, fill: D.couleur(0.9, true), stroke: C.navy, 'stroke-opacity': 0.5 }, bM.g));

    /* la régulation : la consigne et la mesure donnent l'écart, l'écart règle la fréquence */
    const gReg = couche('regul');
    const boite = (x, w) => D.el('rect', { x, y: 520, width: w, height: 72, rx: 8, fill: C.papier, stroke: C.navy, 'stroke-width': 2 }, gReg);
    boite(30, 170); boite(246, 190); boite(482, 190);
    trait(gReg, 'M200 556 H242', C.navy, 3, { 'marker-end': 'url(#iv-na)' });
    trait(gReg, 'M482 556 H440', C.navy, 3, { 'marker-end': 'url(#iv-na)' });
    trait(gReg, 'M341 518 V492 H483 V482', C.navy, 3, { 'marker-end': 'url(#iv-na)' });
    D.el('rect', { x: 266, y: 564, width: 150, height: 16, rx: 3, fill: C.creme, stroke: C.navy, 'stroke-width': 1.5 }, gReg);
    const barreEcart = D.el('rect', { x: 267, y: 565, width: 10, height: 14, fill: C.orange, stroke: 'none' }, gReg);
    ecrire(115, 548, 'Consigne', 'regul', C.orange, Object.assign({}, G, M));
    ecrire(115, 578, 'ce qu’on veut', 'regul', C.orange, M);
    ecrire(341, 548, 'Écart', 'regul', C.orange, Object.assign({}, G, M));
    ecrire(577, 548, 'Mesure', 'regul', C.orange, Object.assign({}, G, M));
    ecrire(577, 578, 'sonde de la pièce', 'regul', C.orange, M);
    ecrire(494, 507, 'règle la fréquence', 'regul', C.orange, G);
    const regle1 = [ecrire(700, 532, 'écart grand :'), ecrire(700, 558, 'vitesse haute')];
    const regle2 = [ecrire(700, 590, 'écart faible :'), ecrire(700, 616, 'vitesse basse')];

    /* ================= une image : tout avance selon le temps ================= */
    const P = piece();
    let etape = 0, tau = 0, phR = 0, phO = 0, angle = 0, filee = 0, temps = 1.6, dernier = -1;
    const charge = () => etape === 3 ? 0.6 - 0.3 * Math.cos(2 * Math.PI * tau / 6) : etape === 4 ? 1.35 : 0.45;
    const avancer = dt => {
      P.pas(dt, charge());
      if (P.t - dernier >= 0.05) { histo.push({ t: P.t, tor: P.tor, on: P.on, inv: P.inv, v: P.v }); dernier = P.t; }
      while (histo.length && histo[0].t < P.t - FEN) histo.shift();
    };
    for (let i = 0; i < 24 / 0.05; i++) avancer(0.05);   /* la pièce tourne déjà : les courbes sont pleines */

    const image = now => {
      const dt = FIGE ? 0 : Math.min(0.1, Math.max(0, now - temps)); temps = now;
      couches.forEach(L => { L.v += (L.cible - L.v) * Math.min(1, dt * 6); L.g.setAttribute('opacity', L.v.toFixed(2)); });
      tau += dt;
      if (dt) avancer(dt);
      dessinerGraphe(gTor, 'tor', 'on', true);
      dessinerGraphe(gInv, 'inv', 'v', false);
      const v = P.v;                                      /* la vitesse de l'Inverter, 0..1 */
      phR += dt * 2 * Math.PI * 1.1; phO += dt * 2 * Math.PI * (0.3 + 1.6 * v);
      angle += dt * (90 + 520 * v); filee += dt * (25 + 190 * v);
      ondeR.setAttribute('d', onde(44, 166, 412, 15, 2.5, phR));
      ondeC.setAttribute('d', 'M 220 ' + (412 - 13) + ' H 348');
      ondeO.setAttribute('d', onde(402, 564, 412, 15, 1 + 3.2 * v, phO));
      roue.setAttribute('transform', 'translate(646 410) rotate(' + (angle % 360).toFixed(1) + ')');
      mols.forEach((m, i) => {
        const x = 690 + D.frac(i / mols.length + filee / 262) * 254;
        m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', (410 + (i % 2 ? 2.2 : -2.2)).toFixed(1));
        m.setAttribute('opacity', D.fenetre((x - 690) / 254, 0, 1, 0.08).toFixed(2));
      });
      motVitesse.textContent = 'vitesse ' + (v < 0.42 ? 'basse' : v < 0.72 ? 'moyenne' : 'haute');
      barreEcart.setAttribute('width', (148 * D.borne(P.inv / 0.3, 0.04, 1)).toFixed(1));
      regle1.forEach(t => { t.setAttribute('fill', etape === 4 ? C.orange : C.gris); t.setAttribute('font-weight', etape === 4 ? 700 : 400); });
      regle2.forEach(t => { t.setAttribute('fill', etape === 5 ? C.orange : C.gris); t.setAttribute('font-weight', etape === 5 ? 700 : 400); });
    };
    const allumer = on => {
      couches.forEach(L => { L.cible = on.has(L.c) ? 1 : RETRAIT; if (FIGE) L.v = L.cible; });
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : e.fill); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
      gTor.cadre.setAttribute('stroke', on.has('tor') ? C.chaud : C.trait); gTor.cadre.setAttribute('stroke-width', on.has('tor') ? 5 : 3);
      gInv.cadre.setAttribute('stroke', on.has('inv') ? C.vert : C.trait); gInv.cadre.setAttribute('stroke-width', on.has('inv') ? 5 : 3);
      [bR, bRe, bO, bM].forEach(b => { const oui = on.has(b.g.getAttribute('data-c')); b.r.setAttribute('fill', oui ? TEINTE : C.papier); b.r.setAttribute('stroke', oui ? C.orange : C.navy); b.r.setAttribute('stroke-width', oui ? 4 : 2); });
      carteCadre.setAttribute('stroke', on.has('carte') ? C.orange : C.navy);
      image(temps);
    };

    /* le pas à pas : la partie qui agit s'allume, le reste continue, en retrait */
    const ALLUME = [
      ['tor'],
      ['inv'],
      ['reseau', 'redresseur', 'carte'],
      ['onduleur', 'moteur', 'carte'],
      ['regul', 'onduleur', 'moteur', 'inv'],
      ['regul', 'onduleur', 'moteur', 'inv']
    ];
    const aller = k => { etape = k; tau = 0; allumer(new Set(ALLUME[k])); };

    const etapes = [
      { titre: 'Tout-ou-rien : à fond, puis arrêt',
        dire: 'Le compresseur n’a que deux états. Il démarre à fond, la pièce refroidit, il s’arrête, la pièce se réchauffe, il redémarre. La température fait des dents de scie autour de la consigne.',
        peindre: () => aller(0) },
      { titre: 'Inverter : il ralentit au lieu de s’arrêter',
        dire: 'Une fois la pièce à la bonne température, le compresseur ne s’arrête pas : il tourne doucement, juste assez pour compenser ce que la pièce gagne en chaleur. La courbe reste presque plate.',
        peindre: () => aller(1) },
      { titre: 'La carte redresse le courant du réseau',
        dire: 'Le réseau fournit un courant alternatif, à fréquence fixe. La carte électronique commence par le redresser : l’alternatif devient du continu.',
        peindre: () => aller(2) },
      { titre: 'Elle refabrique un alternatif à la vitesse voulue',
        dire: 'L’onduleur découpe ce continu et refabrique un alternatif, dont la fréquence est choisie par la carte. Le moteur du compresseur suit cette fréquence : la vitesse suit la fréquence.',
        peindre: () => aller(3) },
      { titre: 'Écart grand : la vitesse monte',
        dire: 'La carte compare la température mesurée par la sonde à la consigne. Quand l’écart est grand, elle demande une fréquence haute : le compresseur accélère et la pièce refroidit vite.',
        peindre: () => aller(4) },
      { titre: 'Écart faible : la vitesse descend',
        dire: 'La pièce approche de la consigne, l’écart fond. La carte baisse la fréquence : le compresseur ralentit, sans s’arrêter, et garde la température.',
        peindre: () => aller(5) }
    ];
    const hote = pasAPas(d, etapes, 'Aucune valeur chiffrée : fréquence, tension et vitesse dépendent de l’appareil. Le principe électrique est détaillé dans ÉlectroRézo 7.3 et 7.4.');
    image(temps);
    if (!FIGE) {
      let vu = false;
      const boucle = now => {
        if (d.isConnected) { vu = true; image(now / 1000); }
        else if (vu) return;                               /* on a quitté le temps : la boucle s'arrête */
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
    }
    return hote;
  }

  /* Temps 5 : le tableau tout-ou-rien / Inverter, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 440',
      'Tableau comparatif : le compresseur tout-ou-rien est à fond ou arrêté, la température fait des dents de scie, les démarrages sont nombreux, la consommation et le bruit plus élevés. Avec l’Inverter, la vitesse varie, la température est stable, les démarrages sont rares, la consommation et le bruit plus faibles. En panne, on regarde d’abord la carte et les capteurs.');
    const lignes = [
      ['Le compresseur', 'à fond, ou arrêté', 'vitesse variable'],
      ['La température', 'dents de scie', 'stable, près de la consigne'],
      ['Les démarrages', 'nombreux', 'rares'],
      ['L’électricité', 'consommation plus haute', 'consommation plus basse'],
      ['Le bruit', 'à-coups à chaque démarrage', 'plus discret']
    ];
    d.innerHTML = `
<rect x="10" y="10" width="800" height="420" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="520" y="30" width="270" height="300" fill="rgba(30,126,84,.09)" stroke="none"/>
<rect x="30" y="30" width="760" height="300" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M240 30 V330 M520 30 V330" stroke="${C.navy}" stroke-width="2" fill="none"/>
${[80, 130, 180, 230, 280].map(y => `<path d="M30 ${y} H790" stroke="${C.trait}" stroke-width="2" fill="none"/>`).join('')}
${txt(380, 62, 'Tout-ou-rien', { a: 'middle', s: 19, w: 700, f: C.chaud })}
${txt(655, 62, 'Inverter', { a: 'middle', s: 19, w: 700, f: C.vert })}
${lignes.map((l, i) => {
      const y = 112 + i * 50;
      return txt(46, y, l[0], { s: 17, w: 700, f: C.navy }) +
             txt(380, y, l[1], { a: 'middle', s: 17, f: C.navy }) +
             txt(655, y, l[2], { a: 'middle', s: 17, f: C.navy });
    }).join('')}
<rect x="30" y="350" width="760" height="64" rx="10" fill="${C.papier}" stroke="${C.vert}" stroke-width="3"/>
${txt(410, 376, 'En panne, on regarde d’abord la carte et les capteurs, pas le compresseur.', { a: 'middle', s: 16, w: 700, f: C.navy })}
${txt(410, 400, 'En sortie de carte : tension continue élevée, on ne mesure pas sans savoir ce qu’on fait.', { a: 'middle', s: 15, f: C.gris })}`;
    return d;
  }

  return { vitesseSuitLeBesoin, recapitulatif };
})();
