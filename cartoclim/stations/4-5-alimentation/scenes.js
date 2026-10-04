/* CartoClim 4.5 — scènes de l'alimentation et de la liaison des deux unités.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : le chemin du courant, du tableau à l'unité
   intérieure, en six pas ; le dernier montre le défaut classique (le fil de communication croisé avec le
   neutre) — avec le COURANT qui circule (« Animer les réseaux », 04/10/2026).
   Disposition : dehors en haut, dedans en bas, le mur entre les deux (comme la station 3.2). Les repères
   1, N, 2 et la terre sont un EXEMPLE : la notice de l'appareil commande. Temps 5 : le récapitulatif.

   Les appareils sont les SYMBOLES de la bibliothèque, posés tels quels (assets/) : différentiel
   (differentiel_2p--sans-reperes.svg, bibliothèque curée), disjoncteur phase + neutre, interrupteur de
   proximité, bornier, terre. Aucun n'est redessiné. Le différentiel est un INTERRUPTEUR différentiel :
   il ne protège pas contre la surcharge, le disjoncteur dédié le fait — deux appareils différents, pas
   deux disjoncteurs empilés. Neutre à GAUCHE partout : pôle de gauche du disjoncteur et de
   l'interrupteur, borniers dans l'ordre terre, N, 1, 2. Un câble est une GAINE (gris) : ses fils ne se
   montrent qu'à ses deux bouts, là où on les raccorde — aucun fil ne croise un autre, sauf au pas 6.

   Ce qui bouge (tout se calcule à partir du temps, requestAnimationFrame — ni SMIL ni animation CSS) :
   · le courant : des tirets clairs qui filent sur la phase vers les unités, sur le neutre au retour, et
     des reflets qui filent dans les gaines ; la terre ne porte rien, elle reste immobile ;
   · pas 1 : surcharge, les tirets s'emballent, le disjoncteur coupe — après lui la phase n'est plus
     sous tension (grise), plus rien ne circule ; pas 2 : l'interrupteur s'ouvre, l'unité est coupée ;
   · pas 5 : les messages, des points ambre, vont et viennent sur le fil de communication ; pas 6 : le
     neutre et ce fil sont croisés côté intérieur, le message tombe sur le mauvais repère.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.
   Aucun texte sur un tracé, ni sur le trajet d'un message : vérifié par outils/controler-scene-vivante.mjs.
   Étiquettes en taille 21 dans 1 000 : au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* une couleur par fil — toujours doublée d'une étiquette (repère) et d'un style de trait */
  const PH = C.rouge, NE = C.froid, TE = C.vert, CO = C.ambre;
  const HORS = '#a3adb8';                                  /* la phase quand elle n'est plus sous tension */
  const GAINE = '#5d6b7b', GAINE_C = '#8794a3';            /* la gaine d'un câble */
  const RETRAIT = 0.4;                                     /* ce qui n'agit pas à cette étape */

  /* les symboles de la bibliothèque : fichier et viewBox (l'origine 0,0 du symbole est le point de pose) */
  const SYM = {
    diff:  { f: 'differentiel_2p--sans-reperes.svg', vb: [-12, -30, 40, 60] },
    disj:  { f: 'disjonct-m_1fn.svg', vb: [-24, -44, 48, 78] },
    inter: { f: 'interrupteur_sectionneur_biphase.svg', vb: [-54, -34, 68, 68] },
    born:  { f: 'bornier5x.svg', vb: [-14, -24, 108, 48] },
    terre: { f: 'terre.svg', vb: [-14, -25, 28, 38] }
  };

  /* ---------- l'atelier d'un dessin vivant ---------- */
  function atelier(d, W, H) {
    const D = window.VOYAGE_DESSIN;
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const couches = [], etiquettes = [], anime = [];
    let temps = 1.6;
    const fond = () => {
      D.el('rect', { x: 6, y: 6, width: W - 12, height: H - 12, rx: 16, fill: C.papier, stroke: C.trait }, d);
      /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
         cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
      D.filigrane(d, [[W * 0.235, H * 0.278], [W * 0.5, H * 0.516], [W * 0.765, H * 0.753]], 250).querySelectorAll('text')
        .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });
    };
    /* une partie du dessin, que le pas à pas allume (plusieurs groupes peuvent porter le même nom) */
    const couche = c => { const g = D.el('g', { 'data-c': c }, d); couches.push({ g, c, v: 1, cible: 1 }); return g; };
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700, fill: base.fill });
      return t;
    };
    const image = now => {
      const dt = Math.min(0.1, Math.max(0, now - temps)); temps = now;
      couches.forEach(L => { L.v += (L.cible - L.v) * Math.min(1, dt * 6); L.g.setAttribute('opacity', L.v.toFixed(2)); });
      anime.forEach(f => f(FIGE ? 0 : dt));
    };
    const allumer = on => {
      couches.forEach(L => { L.cible = on.has(L.c) ? 1 : RETRAIT; if (FIGE) L.v = L.cible; });
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : e.fill); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
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

  const chemin = pts => 'M ' + pts.map(p => p[0] + ' ' + p[1]).join(' L ');
  /* un point qui avance sur une ligne brisée : a(s) → [x, y], L sa longueur */
  function trajet(pts) {
    const seg = []; let L = 0;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], l = Math.hypot(x1 - x0, y1 - y0);
      seg.push({ x0, y0, x1, y1, l, s: L }); L += l;
    }
    const a = s => { const g = seg.find(k => s <= k.s + k.l) || seg[seg.length - 1], f = g.l ? (s - g.s) / g.l : 0; return [g.x0 + (g.x1 - g.x0) * f, g.y0 + (g.y1 - g.y0) * f]; };
    return { pts, L, a };
  }

  function alimenterEtRelier() {
    const W = 1000, H = 640;
    const d = svg('0 0 1000 640',
      'Schéma d’alimentation d’un split : dehors en haut, dans la maison en bas, le mur entre les deux. En bas à gauche, le tableau avec son différentiel et son disjoncteur dédié ; un câble monte à travers le mur jusqu’à l’interrupteur de proximité, puis un autre jusqu’au bornier de l’unité extérieure ; de ce bornier, un câble de quatre fils redescend à travers le mur jusqu’au bornier de l’unité intérieure. Le courant file sur la phase et revient par le neutre ; la terre ne porte rien ; des messages vont et viennent sur le fil de communication.');
    const A = atelier(d, W, H), D = A.D;
    const { couche, ecrire, anime } = A;
    A.fond();

    /* dehors / le mur / dedans */
    D.el('rect', { x: 18, y: 16, width: 964, height: 238, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 18, y: 260, width: 964, height: 40, fill: 'rgba(99,114,133,.16)', stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '8 6' }, d);
    D.el('rect', { x: 18, y: 306, width: 964, height: 322, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);

    /* les boîtes : le tableau, les deux unités */
    const boite = (c, x, y, w, h) => D.el('rect', { x, y, width: w, height: h, rx: 12, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, couche(c));
    boite('tableau', 34, 352, 296, 208);
    boite('ue', 560, 26, 418, 220);
    const boiteUI = boite('ui', 570, 330, 408, 200);

    /* les symboles, posés tels quels ; k : leur échelle, rot : un quart de tour pour un bornier debout */
    const poser = (c, nom, ox, oy, k) => {
      const s = SYM[nom], [vx, vy, vw, vh] = s.vb;
      return D.el('image', { href: 'assets/' + s.f, x: ox + vx * k, y: oy + vy * k, width: vw * k, height: vh * k, preserveAspectRatio: 'none' }, couche(c));
    };
    poser('tableau', 'disj', 170, 500, 1.4);              /* pôles : N 156, phase 184 ; bornes 458 et 528 */
    poser('tableau', 'diff', 156, 414, 1.4);              /* pôles : N 156, phase 170 ; bornes 384,6 et 443,4 */
    poser('alim', 'terre', 70, 600, 1.4);                 /* la prise de terre : sa borne en 70, 586 */
    poser('inter', 'inter', 440, 148, 1.4);               /* pôles : N 412, phase 440 ; bornes 120 et 176 */
    poser('ue', 'born', 640, 200, 1.8);                   /* bornes : terre 640, N 676, 1 712, 2 748 ; vis 182 et 218 */
    poser('ui', 'born', 640, 400, 1.8);                   /* même bornier, mêmes repères ; vis 382 et 418 */

    /* ---------- les fils et les gaines ---------- */
    const fils = [];                                      /* { el, tirets, cote, sens } */
    const fil = (c, pts, coul, o) => {
      const g = couche(c), p = D.el('path', { d: chemin(pts), fill: 'none', stroke: coul, 'stroke-width': 4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
      if (o && o.terre) p.setAttribute('stroke-dasharray', '10 6');
      let tirets = null;
      if (!(o && o.terre) && !(o && o.messages))
        tirets = D.el('path', { d: chemin(pts), fill: 'none', stroke: C.papier, 'stroke-width': 1.8, 'stroke-dasharray': '6 10', 'stroke-linecap': 'round', opacity: 0.95 }, g);
      const f = { el: p, tirets, coul, cote: (o && o.cote) || 'amont', g };
      fils.push(f);
      return f;
    };
    const gaine = (c, pts, cote) => {
      const g = couche(c);
      D.el('path', { d: chemin(pts), fill: 'none', stroke: GAINE, 'stroke-width': 16, 'stroke-linejoin': 'round', 'stroke-linecap': 'butt' }, g);
      D.el('path', { d: chemin(pts), fill: 'none', stroke: GAINE_C, 'stroke-width': 8, 'stroke-linejoin': 'round', 'stroke-linecap': 'butt' }, g);
      const reflet = D.el('path', { d: chemin(pts), fill: 'none', stroke: C.papier, 'stroke-width': 3, 'stroke-dasharray': '10 26', 'stroke-linecap': 'round', opacity: 0.9 }, g);
      return { reflet, cote };
    };

    /* le tableau : l'arrivée, le différentiel, le disjoncteur (neutre à gauche, phase à droite) */
    const f = {};
    f.phArr = fil('tableau', [[170, 355], [170, 384.6]], PH);
    f.neArr = fil('tableau', [[156, 384.6], [156, 355]], NE);
    f.phLien = fil('tableau', [[170, 443.4], [170, 450], [184, 450], [184, 458]], PH);
    f.neLien = fil('tableau', [[156, 458], [156, 443.4]], NE);
    /* câble 1, d'alimentation : du disjoncteur à l'interrupteur de proximité ; la terre vient de la prise de terre */
    f.pe1 = fil('alim', [[70, 586], [70, 576], [170, 576], [170, 584]], TE, { terre: true });
    f.ph1a = fil('alim', [[184, 528], [184, 570], [182, 570], [182, 584]], PH, { cote: 'disj' });
    f.ne1a = fil('alim', [[176, 584], [176, 566], [156, 566], [156, 528]], NE, { cote: 'disj' });
    const c1 = gaine('alim', [[176, 584], [176, 604], [400, 604], [400, 232]], 'disj');
    f.ph1b = fil('alim', [[406, 232], [406, 208], [440, 208], [440, 176]], PH, { cote: 'disj' });
    f.ne1b = fil('alim', [[412, 176], [412, 200], [400, 200], [400, 232]], NE, { cote: 'disj' });
    f.pe1b = fil('alim', [[394, 232], [394, 222], [352, 222], [352, 96], [420, 96], [420, 76]], TE, { terre: true });
    /* câble 2 : de l'interrupteur au bornier de l'unité extérieure, par le haut */
    f.ph2a = fil('ue', [[440, 120], [440, 104], [432, 104], [432, 76]], PH, { cote: 'inter' });
    f.ne2a = fil('ue', [[426, 76], [426, 104], [412, 104], [412, 120]], NE, { cote: 'inter' });
    const c2 = gaine('ue', [[426, 76], [426, 46], [800, 46], [800, 140]], 'inter');
    f.ph2b = fil('ue', [[806, 140], [806, 166], [712, 166], [712, 182]], PH, { cote: 'inter' });
    f.ne2b = fil('ue', [[676, 182], [676, 158], [800, 158], [800, 140]], NE, { cote: 'inter' });
    f.pe2b = fil('ue', [[794, 140], [794, 150], [640, 150], [640, 182]], TE, { terre: true });
    /* câble 3, d'interconnexion : quatre fils, du bornier de l'unité extérieure à celui de l'unité intérieure */
    f.ph3a = fil('liaison', [[712, 218], [712, 230], [697, 230], [697, 244]], PH, { cote: 'ui' });
    f.ne3a = fil('liaison', [[691, 244], [691, 230], [676, 230], [676, 218]], NE, { cote: 'ui' });
    f.pe3a = fil('liaison', [[640, 218], [640, 238], [685, 238], [685, 244]], TE, { terre: true });
    f.co3a = fil('comm', [[748, 218], [748, 238], [703, 238], [703, 244]], CO, { messages: true });
    const c3 = gaine('liaison', [[694, 244], [694, 352]], 'ui');
    f.ph3b = fil('liaison', [[697, 352], [697, 366], [712, 366], [712, 382]], PH, { cote: 'ui' });
    f.pe3b = fil('liaison', [[685, 352], [685, 360], [640, 360], [640, 382]], TE, { terre: true });
    /* côté intérieur : bien raccordés (N sur N, 2 sur 2), ou croisés au pas 6 */
    const NE_BON = [[676, 382], [676, 366], [691, 366], [691, 352]], NE_CROISE = [[748, 382], [748, 372], [691, 372], [691, 352]];
    const CO_BON = [[703, 352], [703, 360], [748, 360], [748, 382]], CO_CROISE = [[703, 352], [703, 360], [676, 360], [676, 382]];
    f.ne3b = fil('liaison', NE_BON, NE, { cote: 'ui' });
    f.co3b = fil('comm', CO_BON, CO, { messages: true });

    /* les messages : des points ambre sur le fil de communication, de borne 2 à borne 2 */
    const gMsg = couche('messages');
    const msgs = [0, 1, 2].map(() => D.el('circle', { r: 6.5, fill: CO, stroke: C.navy, 'stroke-width': 1.6, opacity: 0 }, gMsg));
    const eclair = D.el('circle', { cx: 676, cy: 370, r: 7, fill: 'none', stroke: C.rouge, 'stroke-width': 3, opacity: 0 }, gMsg);
    const voieMsg = croise => trajet([[748, 218], [748, 238], [703, 238], [703, 244], [694, 248], [694, 348], [703, 352]].concat(croise ? CO_CROISE.slice(1) : CO_BON.slice(1)));

    /* ---------- les étiquettes, par-dessus tout ; chacune a sa place libre ---------- */
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    const OR = C.orange;
    ecrire(34, 46, 'DEHORS', null, null, G);
    ecrire(34, 287, 'le mur', null, null, { fill: C.gris });
    ecrire(180, 287, 'câble d’alimentation', 'alim', OR);
    ecrire(716, 287, 'câble d’interconnexion', 'liaison', OR);
    ecrire(34, 336, 'DANS LA MAISON', null, null, G);
    ecrire(50, 380, 'Tableau', 'tableau', OR, G);
    ecrire(212, 420, 'différentiel', 'tableau', OR);
    ecrire(212, 482, 'disjoncteur', 'tableau', OR);
    ecrire(212, 509, 'dédié', 'tableau', OR);
    ecrire(96, 612, 'terre', 'alim', OR);
    ecrire(220, 136, 'Interrupteur', 'inter', OR);
    ecrire(220, 162, 'de proximité', 'inter', OR);
    ecrire(576, 92, 'Unité extérieure', 'ue', OR, G);
    ecrire(576, 122, 'carte et compresseur', 'ue', OR);
    ecrire(616, 494, 'Unité intérieure', 'ui', OR, G);
    ecrire(616, 520, 'carte électronique', 'ui', OR);
    /* les repères, le même des deux côtés : la terre, N, 1, 2 — chacun juste à gauche de sa borne */
    const reperes = y => [['terre', 631], ['N', 667], ['1', 703], ['2', 739]].map(([s, x]) => ecrire(x, y, s, 'reperes', C.navy, F));
    reperes(208);
    const repUI = reperes(408);
    /* la légende des fils */
    const legende = (x, y, coul, s, terre) => {
      D.el('path', { d: 'M' + x + ' ' + (y - 7) + ' H' + (x + 32), stroke: coul, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': terre ? '10 6' : 'none' }, d);
      ecrire(x + 40, y, s);
    };
    legende(616, 566, PH, 'phase'); legende(790, 566, NE, 'neutre');
    legende(616, 602, TE, 'terre', true); legende(790, 602, CO, 'communication');
    /* ce qui s'affiche selon le moment */
    const dyn1 = ecrire(212, 540, '', null, null, G);
    const dynInter = ecrire(470, 152, '', null, null, G);
    const dynA = ecrire(420, 440, '', null, null, G), dynB = ecrire(420, 466, '', null, null, G);
    const dynCroise = ecrire(616, 444, '', null, null, G);
    const dire = (t, s, coul) => { if (t.textContent !== s) t.textContent = s; if (coul) t.setAttribute('fill', coul); };

    /* ---------- une image : tout avance selon le temps ---------- */
    let etape = 0, tl = 0, decal = 0, decalG = 0;
    const majFils = (croise) => {
      f.ne3b.el.setAttribute('d', chemin(croise ? NE_CROISE : NE_BON)); f.ne3b.tirets.setAttribute('d', chemin(croise ? NE_CROISE : NE_BON));
      f.co3b.el.setAttribute('d', chemin(croise ? CO_CROISE : CO_BON));
      boiteUI.setAttribute('stroke', croise ? C.rouge : C.navy);
      [1, 3].forEach(i => repUI[i].setAttribute('fill', croise ? C.rouge : C.navy));
    };
    let croiseAvant = null;
    anime.push(dt => {
      tl += dt;
      let surcharge = false, disjOuvert = false, interOuvert = false;
      if (etape === 0) { const u = tl % 8; surcharge = u >= 3 && u < 4.6; disjOuvert = u >= 4.6 && u < 7.4; }
      if (etape === 1) { const u = tl % 7; interOuvert = u >= 3 && u < 6; }
      const croise = etape === 5;
      if (croise !== croiseAvant) { majFils(croise); croiseAvant = croise; }
      const ferme = !disjOuvert && !interOuvert;          /* le circuit est fermé : le courant passe */
      const v = surcharge ? 95 : 36;
      if (ferme) { decal += v * dt; decalG += v * 1.1 * dt; }
      /* sous tension ? en aval du disjoncteur, en aval de l'interrupteur ; le courant de l'unité intérieure */
      const tension = cote => cote === 'amont' ? true : cote === 'disj' ? !disjOuvert : !disjOuvert && !interOuvert;
      const courant = cote => ferme && (cote !== 'ui' || !croise);
      fils.forEach(x => {
        if (x.coul === PH) { x.el.setAttribute('stroke', tension(x.cote) ? PH : HORS); x.el.setAttribute('stroke-width', surcharge && x.cote !== 'amont' ? 6 : 4); }
        if (x.tirets) {
          const on = courant(x.cote);
          x.tirets.setAttribute('opacity', on ? 0.95 : 0);
          x.tirets.setAttribute('stroke-dashoffset', (-(decal % 16)).toFixed(1));
        }
      });
      [c1, c2, c3].forEach(c => {
        const on = courant(c.cote);
        c.reflet.setAttribute('opacity', on ? 0.9 : 0);
        c.reflet.setAttribute('stroke-dashoffset', (-(decalG % 36)).toFixed(1));
      });
      /* les messages */
      let vis = [0, 0, 0], pos = [0, 0, 0], flash = 0, voie = null;
      if (etape === 4) {
        const u = tl % 4.4, tr = voieMsg(false);
        voie = tr;
        const aller = u < 1.8, retour = u >= 2.2 && u < 4.0;
        if (aller || retour) {
          const f0 = aller ? u / 1.8 : (u - 2.2) / 1.8;
          for (let i = 0; i < 3; i++) {
            const fi = D.borne(f0 * 1.35 - i * 0.17, 0, 1);
            vis[i] = fi > 0 && fi < 1 ? 1 : 0;
            pos[i] = aller ? 1 - fi : fi;                 /* la demande part de l'intérieur, la réponse revient */
          }
        }
      } else if (etape === 5) {
        const u = tl % 3, tr = voieMsg(true);
        voie = tr;
        for (let i = 0; i < 3; i++) { const fi = D.borne((u / 1.8) * 1.35 - i * 0.17, 0, 1); vis[i] = fi > 0 && fi < 1 ? 1 : 0; pos[i] = fi; }
        flash = u > 1.75 && u < 2.6 ? 1 : 0;
      }
      msgs.forEach((m, i) => {
        if (!voie || !vis[i]) { m.setAttribute('opacity', 0); return; }
        const [x, y] = voie.a(pos[i] * voie.L);
        m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1)); m.setAttribute('opacity', 1);
      });
      eclair.setAttribute('opacity', flash);
      /* ce qui s'écrit */
      dire(dyn1, surcharge ? 'surcharge' : disjOuvert ? 'il coupe' : '', C.rouge);
      dire(dynInter, interOuvert ? 'ouvert' : '', C.rouge);
      dire(dynA, etape === 4 ? 'les deux cartes' : etape === 5 ? 'défaut de' : '', etape === 4 ? C.vert : C.rouge);
      dire(dynB, etape === 4 ? 'se parlent' : etape === 5 ? 'communication' : '', etape === 4 ? C.vert : C.rouge);
      dire(dynCroise, croise ? 'repères croisés' : '', C.rouge);
    });

    /* le pas à pas : la partie qui agit s'allume, le reste continue, en retrait */
    const ALLUME = [
      ['tableau'],
      ['alim', 'inter'],
      ['ue'],
      ['liaison', 'ui', 'reperes'],
      ['comm', 'messages', 'ue', 'ui'],
      ['liaison', 'comm', 'messages', 'ui', 'reperes']
    ];
    const aller = k => { etape = k; tl = A.FIGE ? 1.6 : 0; A.allumer(new Set(ALLUME[k])); };

    const etapes = [
      { titre: 'Le tableau protège la ligne',
        dire: 'Le courant part du tableau. Il passe par un différentiel et par un disjoncteur qui ne protège que ce climatiseur. En cas de défaut ou de surcharge, c’est lui qui coupe, avant que le câble chauffe.',
        peindre: () => aller(0) },
      { titre: 'L’interrupteur coupe tout, tout près',
        dire: 'Un câble à trois fils monte jusqu’à l’unité extérieure. Juste à côté, un interrupteur de proximité : en l’ouvrant, on coupe l’unité sans retourner au tableau.',
        peindre: () => aller(1) },
      { titre: 'L’unité extérieure est alimentée',
        dire: 'Phase, neutre et terre arrivent au bornier de l’unité extérieure. La carte et le compresseur reçoivent le courant du tableau.',
        peindre: () => aller(2) },
      { titre: 'Le câble relie les deux unités',
        dire: 'Du même bornier repart un câble de quatre fils vers l’unité intérieure. Sur la plupart des appareils, c’est ainsi qu’elle est alimentée. Chaque fil va au même repère des deux côtés : 1 avec 1, N avec N, 2 avec 2, la terre avec la terre.',
        peindre: () => aller(3) },
      { titre: 'Les deux cartes se parlent',
        dire: 'Sur le fil de communication, les deux cartes électroniques s’échangent des messages : l’unité intérieure transmet la demande, l’unité extérieure répond. Ce fil ne porte pas d’énergie, seulement des messages.',
        peindre: () => aller(4) },
      { titre: 'Repères croisés : défaut de communication',
        dire: 'Ici, le fil de communication et le neutre sont croisés côté intérieur. Les cartes ne se comprennent plus : au premier démarrage, l’appareil affiche un défaut de communication. Une erreur de repère peut aussi abîmer l’appareil : on contrôle avant de remettre sous tension.',
        peindre: () => aller(5) }
    ];
    const hote = pasAPas(d, etapes, 'Qui alimente qui, et par quels repères, varie selon le constructeur : le schéma de la notice commande.');
    A.demarrer();
    return hote;
  }

  /* Temps 5 : ce qu'on alimente, ce qu'on relie, ce qu'on évite — en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 356', 'Récapitulatif : du tableau à l’unité intérieure, cinq éléments reliés par des flèches ; dessous, quatre erreurs à éviter ; en bas, la règle de sécurité avant d’ouvrir un bornier.');
    const boite = (i, titres, details) => {
      const x = 24 + i * 162;
      return `<rect x="${x}" y="40" width="124" height="130" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${titres.map((t, k) => `<text x="${x + 62}" y="${64 + k * 18}" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">${t}</text>`).join('')}
${details.map((t, k) => `<text x="${x + 62}" y="${108 + k * 18}" text-anchor="middle" font-size="13" fill="${C.gris}">${t}</text>`).join('')}`;
    };
    const fleche = i => {
      const x = 24 + i * 162 + 124;
      return `<path d="M${x + 4} 105 H${x + 32}" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#fl-r)"/>`;
    };
    const piege = (i, gras, lignes) => {
      const x = 27 + i * 200;
      return `<rect x="${x}" y="222" width="176" height="78" rx="10" fill="${C.papier}" stroke="${C.rouge}" stroke-width="2.5"/>
<text x="${x + 88}" y="246" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">${gras}</text>
${lignes.map((t, k) => `<text x="${x + 88}" y="${266 + k * 18}" text-anchor="middle" font-size="12" fill="${C.gris}">${t}</text>`).join('')}`;
    };
    d.innerHTML = `
<defs>
  <marker id="fl-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.navy}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="336" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${boite(0, ['Tableau'], ['disjoncteur dédié', 'et différentiel', 'calibre : notice'])}
${fleche(0)}
${boite(1, ['Interrupteur', 'de proximité'], ['à portée de main', 'de l’unité', 'extérieure'])}
${fleche(1)}
${boite(2, ['Unité', 'extérieure'], ['reçoit le courant', 'câble prévu', 'pour dehors'])}
${fleche(2)}
${boite(3, ['Câble entre', 'les unités'], ['quatre fils', 'mêmes repères', 'des deux côtés'])}
${fleche(3)}
${boite(4, ['Unité', 'intérieure'], ['reçoit le câble', 'et ses quatre fils', 'terre en place'])}
<text x="28" y="206" font-size="15" font-weight="700" fill="${C.rouge}">À éviter</text>
${piege(0, 'Repères croisés', ['défaut de communication'])}
${piege(1, 'Pas de terre', ['risque de choc'])}
${piege(2, 'Câble de maison', ['posé dehors :', 'il vieillit au soleil'])}
${piege(3, 'Protection partagée', ['avec un autre circuit'])}
<text x="410" y="332" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Avant d’ouvrir un bornier : on consigne (voir HoCourant).</text>`;
    return d;
  }

  return { alimenterEtRelier, recapitulatif };
})();
