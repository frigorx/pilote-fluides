/* CartoClim 2.6 — scènes de la vanne 4 voies.
   Temps 2 : à gauche la vanne ouverte en deux (corps, tiroir et sa cuvette, deux pistons, vanne pilote à
   bobine, quatre voies), à droite le circuit vu de loin (croix du frigoriste : détendeur à gauche, compresseur
   à droite, échangeur extérieur en haut, intérieur en bas). Cinq pas : le mode froid, la bobine, la pilote,
   le tiroir qui glisse, le mode chaud. Le compresseur et ses deux tubes (refoulement, aspiration) ne changent
   jamais ; seuls les deux échangeurs changent de rôle.
   Rouge = haute pression, bleu = basse pression (charte). Aucun texte sur un tracé : chaque étiquette a sa
   place libre, vérifiée par outils/controler-station-navigateur.mjs.
   Pilote « Animer les réseaux » (04/10/2026) : ce dessin est animé et passe aussi devant les photos au temps 1
   (scene-devant.js). Tout se calcule à partir du temps t (requestAnimationFrame — ni SMIL ni animation CSS) :
   le gaz et le liquide circulent dans les tubes (leur sens s'inverse avec le mode, leur couleur suit la
   température), l'air traverse les deux échangeurs, le compresseur tourne toujours dans le même sens, et le
   tiroir, la pilote et les bouts glissent d'un pas à l'autre. Dessin : VOYAGE_DESSIN (jouerezo/moteur/
   voyage-dessin.js). Étiquettes en taille 21 dans 1 000 : 19,6 px à l'écran à 1 280 px.
   Temps 5 : ce qui change, ce qui ne change pas. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const HP = C.chaud, BP = C.froid;
  const couleur = p => p === 'HP' ? HP : p === 'BP' ? BP : C.gris;
  const teinte = p => p === 'HP' ? '#efd2c9' : p === 'BP' ? '#c8def5' : C.creme;   /* aplats opaques : un voile translucide se mélange au fond et devient gris */
  /* petit chevron plein, posé sur un tube pour dire dans quel sens le fluide y va */
  const tri = (x, y, sens, s = 5.5) => ({
    l: `${x - s},${y} ${x + s},${y - s} ${x + s},${y + s}`,
    r: `${x + s},${y} ${x - s},${y - s} ${x - s},${y + s}`,
    d: `${x},${y + s} ${x - s},${y - s} ${x + s},${y - s}`,
    u: `${x},${y - s} ${x - s},${y + s} ${x + s},${y + s}`
  })[sens];

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
  /* n repères régulièrement espacés qui avancent à v unités par seconde ; poser(repère, x, y, angle, f) */
  function filer(parent, tr, n, v, creer, poser) {
    const D = window.VOYAGE_DESSIN, rep = Array.from({ length: n }, (_, i) => creer(parent, i));
    return t => rep.forEach((e, i) => {
      const f = D.frac(i / n + t * v / tr.L), [x, y, ang] = tr.a(f * tr.L);
      poser(e, x, y, ang, f);
    });
  }
  /* un mélange de deux couleurs « #rrggbb » (f de 0 à 1) */
  const rvb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, f) => { const A = rvb(a), B = rvb(b); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * f)).join(',') + ')'; };

  function vanneEnCoupe() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 620',
      'La vanne quatre voies ouverte en deux, avec son tiroir, ses deux pistons et sa vanne pilote à bobine ; à droite, le circuit : échangeur extérieur en haut, échangeur intérieur en bas, détendeur à gauche, compresseur à droite.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc';
    const TEINTE_HP = teinte('HP'), TEINTE_BP = teinte('BP');
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */

    /* l'état affiché, qui rejoint doucement l'état visé par le pas : le tiroir glisse, la pilote bascule,
       les bouts se vident ou se remplissent. Le mode (froid → chaud) suit le tiroir : m = 1 − s. */
    const E = { s: 1, bob: 0, pil: 0, cg: 0, cd: 1, bg: 0, bd: 1, force: 0, ghost: 0 };
    const CIBLE = Object.assign({}, E);
    const VITESSE = { s: 2.2, bob: 6, pil: 5, cg: 5, cd: 5, bg: 2.5, bd: 2.5, force: 4, ghost: 4 };
    const flux = () => Math.cos(Math.PI * (1 - E.s));       /* +1 : sens du mode froid ; −1 : sens du mode chaud ; 0 : en changement */
    let tau = 0;                                           /* le temps des tuyaux qui s'inversent : il avance en froid, recule en chaud */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 608, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });
    D.el('line', { x1: 636, y1: 30, x2: 636, y2: 596, stroke: C.trait, 'stroke-width': 2 }, d);

    /* un texte dont le contenu et la couleur changent avec l'état */
    const texte = (parent, x, y, s, fill, o) => D.texte(parent, x, y, s, Object.assign({ 'font-size': 21, 'font-weight': 700, fill }, o || {}));
    const dyn = t => (s, fill) => { if (t.textContent !== s) t.textContent = s; t.setAttribute('fill', fill); };
    const F = { 'text-anchor': 'end' }, M = { 'text-anchor': 'middle' }, N = { 'font-weight': 400 };
    const role = e => e > 0.25 ? ['condenseur', HP] : e < -0.25 ? ['évaporateur', BP] : ['en changement', C.gris];

    /* un tube de cuivre, et ce qui coule dedans : GAZ = le creux à peine teinté, de petites molécules séparées ;
       LIQUIDE = le tube plein, des reflets qui filent. inv : le sens s'inverse avec le mode (le temps tau) */
    const tube = (g, tr, ext, int) => {
      const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
      D.el('path', Object.assign({ stroke: CUIVRE_BORD, 'stroke-width': ext }, t), g);
      D.el('path', Object.assign({ stroke: CUIVRE, 'stroke-width': ext - 3 }, t), g);
      D.el('path', Object.assign({ stroke: CREUX, 'stroke-width': int }, t), g);
    };
    const conduit = (g, pts, ext, int, genre, temp, v, pas, inv) => {
      const tr = trajet(pts);
      tube(g, tr, ext, int);
      if (genre === 'liquide') {
        const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round' };
        const corps = D.el('path', Object.assign({ 'stroke-width': int, opacity: 0.92 }, t), g);
        const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': Math.max(1.6, int * 0.28), 'stroke-dasharray': '12 30', opacity: 0.85 }, t), g);
        anime.push(t2 => { corps.setAttribute('stroke', D.couleur(temp())); reflet.setAttribute('stroke-dashoffset', (-(((inv ? tau : t2) * v) % 42)).toFixed(1)); });
      } else {
        const creux = D.el('path', { d: tr.d, fill: 'none', 'stroke-width': int, opacity: 0.45, 'stroke-linejoin': 'round' }, g);
        const n = Math.max(2, Math.round(tr.L / pas));
        const mols = Array.from({ length: n }, () => D.el('circle', { r: int * 0.3, stroke: C.navy, 'stroke-opacity': 0.5 }, g));
        anime.push(t2 => {
          const c = D.couleur(temp(), true), ti = inv ? tau : t2;
          creux.setAttribute('stroke', c);
          mols.forEach((mo, i) => {
            const f = D.frac(i / n + ti * v / tr.L), [x, y] = tr.a(f * tr.L);
            mo.setAttribute('cx', x.toFixed(1)); mo.setAttribute('cy', y.toFixed(1)); mo.setAttribute('fill', c);
          });
        });
      }
    };
    /* un petit chevron plein : fixe, ou qui change de sens avec le mode (et s'efface pendant le changement) */
    const fleche = (g, x, y, sens, s) => D.el('polygon', { points: tri(x, y, sens, s), fill: C.navy, stroke: 'none' }, g);
    const flecheDouble = (g, x, y, froid, chaud, s) => {
      const a = fleche(g, x, y, froid, s), b = fleche(g, x, y, chaud, s);
      anime.push(() => { a.setAttribute('opacity', D.borne(flux(), 0, 1).toFixed(2)); b.setAttribute('opacity', D.borne(-flux(), 0, 1).toFixed(2)); });
    };

    /* ============================ À GAUCHE : la vanne ouverte en deux ============================ */
    texte(d, 36, 44, 'LA VANNE 4 VOIES, EN COUPE', C.navy);

    /* les trois capillaires (derrière tout) : l'aspiration, le bout gauche, le bout droit */
    let g = couche('pilote');
    const trait = (dd, o) => D.el('path', Object.assign({ d: dd, fill: 'none', 'stroke-width': 3.3, 'stroke-linejoin': 'round' }, o), g);
    trait('M110 150 V498 H352', { stroke: BP });
    const capG = trait('M176 150 V246 H140 V277', {}), capD = trait('M242 150 V182 H564 V277', {});
    /* la vanne pilote : son corps, le chemin de basse pression, le petit noyau qui bouche l'un des deux tubes */
    D.el('rect', { x: 92, y: 116, width: 170, height: 34, rx: 6, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    const cheminBP = D.el('path', { fill: 'none', stroke: BP, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
    const noyau = D.el('rect', { y: 143, width: 26, height: 7, fill: C.navy, stroke: 'none' }, g);
    texte(g, 282, 113, 'vanne pilote', C.gris, N);

    /* la bobine */
    g = couche('bobine');
    const bobine = D.el('rect', { x: 96, y: 64, width: 170, height: 46, rx: 8 }, g);
    const spires = Array.from({ length: 7 }, (_, i) => D.el('line', { x1: 118 + i * 23, y1: 72, x2: 118 + i * 23, y2: 102, 'stroke-width': 2 }, g));
    const texteBobine = dyn(texte(g, 282, 86, '', C.navy));

    /* le corps de la vanne : tout l'intérieur est à haute pression, sauf les deux bouts (vides ou pleins) et la cuvette */
    g = couche('coupe');
    D.el('rect', { x: 132, y: 277, width: 440, height: 110, rx: 12, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('rect', { x: 136, y: 281, width: 432, height: 102, rx: 9, fill: TEINTE_HP, stroke: 'none' }, g);
    const boutG = D.el('rect', { x: 136, y: 281, height: 102, stroke: 'none' }, g), boutD = D.el('rect', { y: 281, height: 102, stroke: 'none' }, g);
    const fond = D.el('rect', { y: 357, width: 122, height: 26, fill: TEINTE_BP, stroke: 'none' }, g);
    const fantome = D.el('path', { d: 'M332 383 V354 H460 V383', fill: 'none', stroke: C.gris, 'stroke-width': 3, 'stroke-dasharray': '7 5' }, g);
    const barre = D.el('rect', { y: 310, height: 11, fill: C.navy, stroke: 'none' }, g), tige = D.el('rect', { y: 321, width: 11, height: 33, fill: C.navy, stroke: 'none' }, g);
    const pistons = [0, 1].flatMap(() => [D.el('rect', { y: 281, width: 9, height: 40, fill: C.navy, stroke: 'none' }, g), D.el('rect', { y: 334, width: 9, height: 48, fill: C.navy, stroke: 'none' }, g)]);
    const cuvette = D.el('path', { fill: 'none', stroke: C.navy, 'stroke-width': 5, 'stroke-linejoin': 'round' }, g);
    const force = D.el('g', {}, g);
    const fleche3 = D.el('path', { d: 'M420 297 H326', fill: 'none', stroke: C.feu, 'stroke-width': 5 }, force);
    D.el('polygon', { points: '308,297 326,288 326,306', fill: C.feu, stroke: 'none' }, force);
    texte(g, 440, 260, 'tiroir', C.navy, M);
    D.el('line', { x1: 440, y1: 272, x2: 440, y2: 311, stroke: C.navy, 'stroke-width': 2 }, g);
    const tG = texte(g, 146, 372, '', HP), tD = texte(g, 0, 372, '', HP);
    const etiqG = dyn(tG), etiqD = dyn(tD);

    /* les quatre voies : refoulement (seul), les deux échangeurs, aspiration (au milieu) */
    g = couche('voies');
    conduit(g, [[560, 211], [352, 211], [352, 283]], 16, 10, 'gaz', () => 0.95, 70, 22, false);
    conduit(g, [[352, 385], [352, 510]], 16, 10, 'gaz', () => 0.16, 50, 22, false);
    conduit(g, [[264, 385], [264, 420], [167, 420]], 16, 10, 'gaz', () => D.lerp(0.92, 0.16, 1 - E.s), 55, 22, true);
    conduit(g, [[537, 420], [440, 420], [440, 385]], 16, 10, 'gaz', () => D.lerp(0.16, 0.92, 1 - E.s), 55, 22, true);
    fleche(g, 440, 211, 'l'); fleche(g, 352, 247, 'd'); fleche(g, 352, 455, 'd');
    flecheDouble(g, 215, 420, 'l', 'r'); flecheDouble(g, 488, 420, 'l', 'r');
    texte(g, 337, 237, 'refoulement', HP, F);
    texte(g, 337, 264, 'du compresseur', C.gris, Object.assign({}, N, F));
    texte(g, 290, 452, 'échangeur extérieur', C.gris, Object.assign({}, N, F));
    texte(g, 431, 452, 'échangeur intérieur', C.gris, N);
    const roleExtG = dyn(texte(g, 290, 479, '', HP, F)), roleIntG = dyn(texte(g, 431, 479, '', HP));
    texte(g, 352, 543, 'aspiration', BP, M);
    texte(g, 352, 570, 'retour au compresseur', C.gris, Object.assign({}, N, M));

    /* ============================ À DROITE : le circuit, vu de loin ============================ */
    g = couche('circuit');
    const titreCircuit = dyn(texte(g, 666, 46, '', BP));
    const echangeur = y0 => ({ boite: D.el('rect', { x: 730, y: y0, width: 220, height: 64, rx: 10, 'stroke-width': 4 }, g),
      fins: Array.from({ length: 11 }, (_, i) => D.el('line', { x1: 748 + i * 18, y1: y0 + 8, x2: 748 + i * 18, y2: y0 + 56, stroke: C.trait, 'stroke-width': 2 }, g)) });
    const ext = echangeur(128), int = echangeur(468);
    /* l'air : des chevrons qui traversent chaque échangeur ; leur couleur suit la température, qui change dans la boîte */
    const effet = () => Math.cos(Math.PI * (1 - E.s));     /* +1 : l'échangeur extérieur condense ; −1 : il évapore ; 0 : il est tiède */
    const air = (y, tEntree, tSortie) => {
      const k = 0.5, h = D.el('g', { transform: 'scale(' + k + ')' }, g), tr = trajet([[700, y], [990, y]]);
      const temp = x => x < 730 ? tEntree : x > 950 ? tSortie() : D.lerp(tEntree, tSortie(), (x - 730) / 220);
      anime.push(filer(h, tr, 5, 60, p => D.chevron(p),
        (ch, x, yy, ang, f) => ch(x / k, yy / k, ang - 90, D.couleur(temp(x)), D.fenetre(f, 0, 1, 0.06))));
    };
    const sortieExt = () => { const e = effet(); return e >= 0 ? D.lerp(0.45, 0.95, e) : D.lerp(0.45, 0.12, -e); };
    const sortieInt = () => { const e = effet(); return e >= 0 ? D.lerp(0.55, 0.08, e) : D.lerp(0.55, 0.92, -e); };
    [142, 178].forEach(y => air(y, 0.45, sortieExt));
    [482, 518].forEach(y => air(y, 0.55, sortieInt));
    /* les tubes : le liquide va de l'échangeur extérieur au détendeur puis à l'intérieur (en froid) ; les deux gaz de la vanne aux échangeurs */
    conduit(g, [[730, 160], [672, 160], [672, 314]], 12, 6, 'liquide', () => D.lerp(0.62, 0.08, 1 - E.s), 34, 0, true);
    conduit(g, [[672, 346], [672, 500], [730, 500]], 12, 6, 'liquide', () => D.lerp(0.08, 0.62, 1 - E.s), 34, 0, true);
    conduit(g, [[840, 300], [840, 192]], 18, 12, 'gaz', () => D.lerp(0.92, 0.16, 1 - E.s), 55, 24, true);
    conduit(g, [[840, 468], [840, 360]], 18, 12, 'gaz', () => D.lerp(0.16, 0.92, 1 - E.s), 55, 24, true);
    conduit(g, [[918, 312], [880, 312]], 18, 12, 'gaz', () => 0.95, 60, 24, false);
    conduit(g, [[880, 348], [918, 348]], 18, 12, 'gaz', () => 0.16, 60, 24, false);
    flecheDouble(g, 672, 240, 'd', 'u', 5); flecheDouble(g, 672, 420, 'd', 'u', 5);
    flecheDouble(g, 840, 246, 'u', 'd', 5); flecheDouble(g, 840, 414, 'u', 'd', 5);
    fleche(g, 899, 312, 'l', 4); fleche(g, 899, 348, 'r', 4);
    /* le détendeur */
    D.el('path', { d: 'M656 314 H688 L672 330 Z M656 346 H688 L672 330 Z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    /* la vanne 4 voies, vue de loin : ce qui relie quoi change avec la position du tiroir */
    D.el('rect', { x: 800, y: 300, width: 80, height: 60, rx: 6, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g);
    const froid = D.el('g', {}, g), chaud = D.el('g', {}, g), entre = D.el('g', {}, g);
    [[froid, 'M880 312 H840 V300', HP], [froid, 'M840 360 V348 H880', BP], [chaud, 'M880 312 H862 L840 360', HP], [chaud, 'M840 300 L862 348 H880', BP]]
      .forEach(([p, dd, coul]) => D.el('path', { d: dd, fill: 'none', stroke: coul, 'stroke-width': 5, 'stroke-linejoin': 'round' }, p));
    D.el('path', { d: 'M880 312 H840 V300 M840 360 V348 H880 M880 312 H862 L840 360 M840 300 L862 348 H880', fill: 'none', stroke: C.gris, 'stroke-width': 3, 'stroke-dasharray': '5 4' }, entre);
    /* le compresseur : il tourne toujours dans le même sens */
    D.el('circle', { cx: 948, cy: 330, r: 30, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    const rotor = D.el('g', {}, g);
    D.el('path', { d: 'M -9 15.6 A 18 18 0 1 1 9 15.6', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linecap': 'round' }, rotor);
    D.el('polygon', { points: '3,19.1 14.6,19.3 8.6,8.9', fill: C.navy, stroke: 'none' }, rotor);
    anime.push(t => rotor.setAttribute('transform', 'translate(948 330) rotate(' + ((t * 110) % 360).toFixed(1) + ')'));
    /* les étiquettes du circuit */
    texte(g, 840, 90, 'échangeur extérieur', C.gris, Object.assign({}, N, M));
    const roleExt = dyn(texte(g, 840, 117, '', HP, M));
    texte(g, 840, 562, 'échangeur intérieur', C.gris, Object.assign({}, N, M));
    const roleInt = dyn(texte(g, 840, 589, '', HP, M));
    texte(g, 700, 336, 'détendeur', C.gris, N);
    texte(g, 824, 392, 'vanne', C.gris, Object.assign({}, N, F));
    texte(g, 824, 419, '4 voies', C.gris, Object.assign({}, N, F));
    texte(g, 986, 392, 'compresseur', C.navy, F);
    texte(g, 986, 419, 'toujours dans', C.gris, Object.assign({}, N, F));
    texte(g, 986, 446, 'le même sens', C.gris, Object.assign({}, N, F));

    /* la légende des couleurs */
    D.el('line', { x1: 36, y1: 596, x2: 66, y2: 596, stroke: HP, 'stroke-width': 8 }, d);
    texte(d, 76, 602, 'haute pression (HP)', C.navy, N);
    D.el('line', { x1: 270, y1: 596, x2: 300, y2: 596, stroke: BP, 'stroke-width': 8 }, d);
    texte(d, 310, 602, 'basse pression (BP)', C.navy, N);

    /* une image : tout se calcule selon t et l'état affiché */
    const majEtat = () => {
      const m = 1 - E.s, e = effet();
      const pL = 148 + 88 * E.s, pR = pL + 308, xc = pL + 160;
      /* la bobine, la pilote */
      const co = mix(C.navy, C.feu, E.bob);
      bobine.setAttribute('stroke', co); bobine.setAttribute('stroke-width', (3 + 2 * E.bob).toFixed(1));
      bobine.setAttribute('fill', 'rgba(255,107,53,' + (0.22 * E.bob).toFixed(2) + ')');
      spires.forEach(l => l.setAttribute('stroke', co));
      texteBobine(E.bob > 0.5 ? 'bobine : alimentée' : 'bobine : sans courant', E.bob > 0.5 ? C.ambre : C.navy);
      cheminBP.setAttribute('d', 'M110 150 V137 H' + D.lerp(242, 176, E.pil).toFixed(1) + ' V150');
      noyau.setAttribute('x', (D.lerp(176, 242, E.pil) - 13).toFixed(1));
      capG.setAttribute('stroke', mix(HP, BP, E.cg)); capD.setAttribute('stroke', mix(HP, BP, E.cd));
      /* les bouts, le tiroir */
      boutG.setAttribute('width', Math.max(0, pL - 136).toFixed(1)); boutG.setAttribute('fill', mix(TEINTE_HP, TEINTE_BP, E.bg));
      boutD.setAttribute('x', (pR + 9).toFixed(1)); boutD.setAttribute('width', Math.max(0, 568 - (pR + 9)).toFixed(1)); boutD.setAttribute('fill', mix(TEINTE_HP, TEINTE_BP, E.bd));
      fond.setAttribute('x', (xc - 61).toFixed(1));
      barre.setAttribute('x', (pL + 9).toFixed(1)); barre.setAttribute('width', (pR - pL - 9).toFixed(1)); tige.setAttribute('x', (xc - 5.5).toFixed(1));
      [pL, pL, pR, pR].forEach((x, i) => pistons[i].setAttribute('x', x.toFixed(1)));
      cuvette.setAttribute('d', 'M' + (xc - 64).toFixed(1) + ' 383 V354 H' + (xc + 64).toFixed(1) + ' V383');
      fantome.setAttribute('opacity', E.ghost.toFixed(2));
      force.setAttribute('opacity', E.force.toFixed(2)); fleche3.setAttribute('stroke-dasharray', E.force < 0.75 ? '9 6' : 'none');
      /* les étiquettes HP / BP des bouts : seulement quand le bout est assez large pour les porter */
      etiqG(E.bg > 0.5 ? 'BP' : 'HP', E.bg > 0.5 ? BP : HP); etiqD(E.bd > 0.5 ? 'BP' : 'HP', E.bd > 0.5 ? BP : HP);
      tD.setAttribute('x', (pR + 19).toFixed(1));
      if (pL - 136 >= 40) tG.removeAttribute('display'); else tG.setAttribute('display', 'none');
      if (568 - (pR + 9) >= 40) tD.removeAttribute('display'); else tD.setAttribute('display', 'none');
      /* les rôles des deux échangeurs, le titre du circuit */
      const [rE, cE] = role(e), [rI, cI] = role(-e);
      roleExtG(rE, cE); roleIntG(rI, cI); roleExt(rE, cE); roleInt(rI, cI);
      titreCircuit(m < 0.25 ? 'LE CIRCUIT : MODE FROID' : m > 0.75 ? 'LE CIRCUIT : MODE CHAUD' : 'LE CIRCUIT : EN CHANGEMENT', m < 0.25 ? BP : m > 0.75 ? HP : C.gris);
      /* les boîtes des échangeurs : rouge (condenseur), bleue (évaporateur), tiède entre les deux */
      const boite = (b, x) => {
        b.boite.setAttribute('stroke', x >= 0 ? mix(C.gris, HP, x) : mix(C.gris, BP, -x));
        b.boite.setAttribute('fill', x >= 0 ? mix(C.creme, TEINTE_HP, x) : mix(C.creme, TEINTE_BP, -x));
      };
      boite(ext, e); boite(int, -e);
      /* la vanne vue de loin : trois dessins superposés, qui se fondent */
      froid.setAttribute('opacity', D.borne(flux(), 0, 1).toFixed(2)); chaud.setAttribute('opacity', D.borne(-flux(), 0, 1).toFixed(2));
      entre.setAttribute('opacity', (1 - Math.abs(flux())).toFixed(2));
    };
    anime.push(() => majEtat());

    let avant = null;
    const image = t => {
      const dt = avant === null ? 0 : D.borne(t - avant, 0, 0.1);
      avant = t;
      for (const k in E) E[k] += (CIBLE[k] - E[k]) * (1 - Math.exp(-dt * VITESSE[k]));
      tau += dt * flux();
      anime.forEach(f => f(t));
    };
    image(1.6);
    if (!FIGE) {
      let vu = false;
      const boucle = now => {
        if (d.isConnected) { vu = true; image(now / 1000); }
        else if (vu) return;                               /* on a quitté le temps : la boucle s'arrête */
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
    }

    /* le pas à pas : la partie qui agit s'allume, le reste tourne en retrait ; l'état visé est celui du pas */
    const ALLUME = [
      ['coupe', 'voies', 'circuit'],
      ['bobine', 'pilote'],
      ['pilote', 'coupe'],
      ['coupe', 'voies', 'circuit'],
      ['coupe', 'voies', 'circuit']
    ];
    const ETATS = [
      { s: 1, bob: 0, pil: 0, cg: 0, cd: 1, bg: 0, bd: 1, force: 0, ghost: 0 },
      { s: 1, bob: 1, pil: 1, cg: 1, cd: 0, bg: 0, bd: 1, force: 0, ghost: 0 },
      { s: 1, bob: 1, pil: 1, cg: 1, cd: 0, bg: 1, bd: 0, force: 0.5, ghost: 0 },
      { s: 0.5, bob: 1, pil: 1, cg: 1, cd: 0, bg: 1, bd: 0, force: 1, ghost: 1 },
      { s: 0, bob: 1, pil: 1, cg: 1, cd: 0, bg: 1, bd: 0, force: 0, ghost: 0 }
    ];
    let premier = true;
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      Object.assign(CIBLE, ETATS[k]);
      if (premier || FIGE) { Object.assign(E, CIBLE); premier = false; if (FIGE) image(1.6); }
    };

    const etapes = [
      { titre: 'Mode froid : quatre voies, deux trajets',
        dire: 'Le refoulement du compresseur arrive par le tube seul et remplit le corps de la vanne : haute pression, en rouge. La cuvette du tiroir relie l’aspiration au tube de l’échangeur intérieur : basse pression, en bleu. L’échangeur extérieur reçoit la haute pression : il condense. L’intérieur évapore.',
        peindre: () => allumer(0) },
      { titre: 'On alimente la bobine',
        dire: 'La carte de la machine envoie le courant à la bobine. Le petit noyau de la vanne pilote se déplace : il ferme le tube de droite et relie celui de gauche à l’aspiration. Dans le corps de la vanne, rien n’a encore bougé.',
        peindre: () => allumer(1) },
      { titre: 'Un bout se vide, l’autre pousse',
        dire: 'Le bout gauche, relié à l’aspiration, se vide : sa pression tombe. À droite, la haute pression, passée par le petit trou du piston, ne peut plus s’échapper. Le piston de droite est poussé plus fort que celui de gauche : le tiroir va partir du côté basse pression.',
        peindre: () => allumer(2) },
      { titre: 'Le tiroir glisse',
        dire: 'Poussé par la différence de pression, le tiroir glisse avec sa cuvette. Pendant la course, la vanne n’est ni en position froid ni en position chaud : s’il s’arrêtait là, les deux échangeurs resteraient tièdes.',
        peindre: () => allumer(3) },
      { titre: 'Mode chaud : les rôles sont échangés',
        dire: 'La cuvette relie maintenant l’aspiration à l’échangeur extérieur : il évapore et prend la chaleur dehors. Le refoulement va à l’échangeur intérieur : il condense et chauffe la pièce. Refoulement et aspiration n’ont pas bougé : le compresseur tourne toujours dans le même sens.',
        peindre: () => allumer(4) }
    ];
    return pasAPas(d, etapes, 'Ici, bobine alimentée = mode chaud. Selon le modèle c’est l’inverse : la vanne est la même, seule la position « sans courant » change. Le dégivrage fait ce même basculement : station 2.7.');
  }

  /* Temps 5 : ce qui change, ce qui ne change pas, d'un mode à l'autre. */
  function recapitulatif() {
    const d = svg('0 0 820 280', 'Récapitulatif : en mode froid, l’échangeur extérieur condense et l’intérieur évapore ; en mode chaud, c’est l’inverse. Le compresseur garde son sens, le refoulement reste sur le tube seul, l’aspiration sur le tube du milieu.');
    const puce = (x, y, w, p, texte) => `<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" fill="${teinte(p)}" stroke="${couleur(p)}" stroke-width="3"/>
<text x="${x + w / 2}" y="${y + 26}" text-anchor="middle" font-size="16" font-weight="700" fill="${couleur(p)}">${texte}</text>`;
    const neutre = (x, y, w, texte) => `<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="${x + w / 2}" y="${y + 26}" text-anchor="middle" font-size="16" fill="${C.navy}">${texte}</text>`;
    const ligne = (y, texte) => `<text x="30" y="${y + 26}" font-size="16" font-weight="700" fill="${C.navy}">${texte}</text>`;
    d.innerHTML = `
<rect x="10" y="10" width="800" height="262" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="367" y="46" text-anchor="middle" font-size="19" font-weight="700" fill="${BP}">MODE FROID</text>
<text x="647" y="46" text-anchor="middle" font-size="19" font-weight="700" fill="${HP}">MODE CHAUD</text>
${ligne(60, 'Échangeur extérieur')}${puce(235, 60, 265, 'HP', 'condenseur · haute pression')}${puce(515, 60, 265, 'BP', 'évaporateur · basse pression')}
${ligne(112, 'Échangeur intérieur')}${puce(235, 112, 265, 'BP', 'évaporateur · basse pression')}${puce(515, 112, 265, 'HP', 'condenseur · haute pression')}
${ligne(164, 'Compresseur')}${neutre(235, 164, 545, 'tourne dans le même sens, dans les deux modes')}
${ligne(216, 'Refoulement, aspiration')}${neutre(235, 216, 545, 'refoulement sur le tube seul, aspiration sur celui du milieu')}`;
    return d;
  }

  return { vanneEnCoupe, recapitulatif };
})();
