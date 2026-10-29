/* ÉlectroRézo 3D : famille « protecteur » : le Klixon (protecteur thermique externe d'un compresseur).
   Unités : millimètres. Repère : X largeur (les deux cosses sont sur l'axe X), Y hauteur (le fond, qui
   touche le compresseur, est en bas, y = 0), Z profondeur (+Z = vers l'élève).

   Ce que l'élève doit VOIR : le courant entre par une cosse, traverse le contact fermé, passe dans le
   disque bilame, ressort par l'autre cosse. Si le courant est trop fort, ou si le compresseur est trop
   chaud, le bilame chauffe (il rougit), puis le disque se retourne d'un coup : le contact s'ouvre, le
   courant s'arrête. Quand le bilame a refroidi, le disque reprend sa forme et le contact se referme.

   La coupe : « Voir en coupe » retire la moitié avant du boîtier, du couvercle, de la bague et du disque.
   On voit alors le profil du disque (bombé vers le haut ou vers le bas) et le contact qui s'ouvre. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('klixon', (T, K, ctx) => {
    const M = K.mat;
    const PI = Math.PI;
    const racine = new T.Group();

    /* ---------------------------------------------------------------- cotes (à confirmer sur un Klixon réel) */
    const R_EXT = 15, R_INT = 13, R_SEM = 16.5;            /* boîtier rond de 30 mm, fond de 33 mm */
    const Y_SEM = 1.2, Y_PLANCHER = 2.7, Y_EPAULE = 5.4, Y_COUV = 13.6;
    const R_D = 8.5, E_D = 0.9, FLECHE = 2.4, Y_BORD = 6.65;  /* le disque : rayon, épaisseur, bombé (exagéré), hauteur du milieu du bord */
    const R_PAST = 1.8, Y_COSSE = 7.0;
    const Y_D_HAUT = Y_BORD + FLECHE + E_D / 2;              /* dessus du disque, au centre, quand il est bombé vers le haut */
    const Y_PF = Y_D_HAUT + 1.2;                             /* centre de la pastille fixe (0,8 d'épaisseur, posée sur la pastille mobile) */
    const Y_LAME = Y_PF + 0.8;                               /* centre de la lame fixe (0,8 d'épaisseur) */
    const Y_GR = Y_LAME + 0.95;                              /* les grains roulent sur la lame */
    const SEUIL_OUV = 1.0, SEUIL_FER = 0.45;                 /* « température » du bilame (échelle du kit) : il coupe à 1, il se referme à 0,45 */

    /* ---------------------------------------------------------------- matières */
    const bakelite = K.plastique(0x3a2b24, 0.5);            /* bakélite : brun très sombre */
    const coupeMat = K.plastique(0xe9dfcf, 0.6); coupeMat.side = T.DoubleSide;
    const matDisque = K.metal(0x9aa2aa, 0.5);
    const matSemelle = K.metal(0x8a929b, 0.5);
    const matLame = M.zingue, matBague = M.cuivreSombre;

    /* ---------------------------------------------------------------- le boîtier : deux moitiés (arrière, avant) pour la coupe */
    /* un profil [[rayon, y], …] parcouru dans le sens direct ; chaque coin est doublé pour garder l'arête vive */
    const durcir = pts => { const o = []; pts.forEach((p, i) => { o.push(p); if (i > 0 && i < pts.length - 1) o.push(p); }); return o; };
    const demi = (profil, avant) => new T.LatheGeometry(durcir(profil).map(p => new T.Vector2(p[0], p[1])), 24, avant ? -PI / 2 : PI / 2, PI);
    /* la face de coupe : la section complète (droite et gauche), dans le plan z = 0 */
    const polygone = pts => { const s = new T.Shape(); s.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(p => s.lineTo(p[0], p[1])); s.closePath(); return s; };
    const faceCoupe = profil => {
      const droite = profil.slice(0, -1), g = new T.Group();
      if (Math.min(...droite.map(p => p[0])) > 1e-6) {          /* une pièce en anneau : deux sections, une de chaque côté */
        g.add(K.mesh(new T.ShapeGeometry(polygone(droite)), coupeMat, 0, 0, 0.02));
        g.add(K.mesh(new T.ShapeGeometry(polygone(droite.map(p => [-p[0], p[1]]))), coupeMat, 0, 0, 0.02));
      } else {
        const pts = droite.concat(droite.slice().reverse().filter(p => p[0] > 1e-6).map(p => [-p[0], p[1]]));
        g.add(K.mesh(new T.ShapeGeometry(polygone(pts)), coupeMat, 0, 0, 0.02));
      }
      return g;
    };
    const moitie = (profil, avant, mat) => {
      const g = new T.Group();
      g.add(new T.Mesh(demi(profil, avant), mat));
      if (!avant) g.add(faceCoupe(profil));
      return g;
    };
    const PROFIL_CUVETTE = [[0, Y_SEM], [14.4, Y_SEM], [R_EXT, Y_SEM + 0.6], [R_EXT, Y_COUV - 0.5], [14.5, Y_COUV], [R_INT, Y_COUV],
      [R_INT, Y_EPAULE], [10.5, Y_EPAULE], [10.5, Y_PLANCHER], [0, Y_PLANCHER], [0, Y_SEM]];
    const PROFIL_COUVERCLE = [[0, Y_COUV], [14.5, Y_COUV], [R_EXT, Y_COUV + 0.5], [R_EXT, Y_COUV + 0.9], [14.0, Y_COUV + 1.6], [7.0, Y_COUV + 1.6],
      [6.6, Y_COUV + 1.95], [0, Y_COUV + 1.95], [0, Y_COUV]];
    const PROFIL_BAGUE = [[6.6, 5.4], [12.8, 5.4], [12.8, 6.2], [6.6, 6.2], [6.6, 5.4]];
    const cuvetteAr = moitie(PROFIL_CUVETTE, false, bakelite), cuvetteAv = moitie(PROFIL_CUVETTE, true, bakelite);
    const couvercleAr = moitie(PROFIL_COUVERCLE, false, bakelite), couvercleAv = moitie(PROFIL_COUVERCLE, true, bakelite);
    racine.add(cuvetteAr, cuvetteAv, couvercleAr, couvercleAv);

    /* le fond métallique, qui se pose contre le compresseur */
    const semelle = K.cylY(R_SEM, Y_SEM, matSemelle, 0, Y_SEM / 2, 0, 48);
    racine.add(semelle);

    /* ---------------------------------------------------------------- les cosses (lames plates de 6,3 mm) */
    const cosse = s => {
      const g = new T.Group(), x0 = 12.1, x1 = 25;
      g.add(K.mesh(new T.BoxGeometry(x1 - x0, 0.8, 6.3), matLame, s * (x0 + x1) / 2, Y_COSSE, 0));
      g.add(K.cylY(1.0, 0.95, M.sombre, s * 20, Y_COSSE, 0, 16));           /* l'empreinte où la cosse du fil s'accroche */
      return g;
    };
    const cosseG = cosse(-1), cosseD = cosse(1);
    racine.add(cosseG, cosseD);

    /* ---------------------------------------------------------------- la lame fixe et la bague : le chemin du courant autour du disque */
    const lameFixe = new T.Group();
    lameFixe.add(K.mesh(new T.BoxGeometry(0.8, Y_LAME + 0.4 - (Y_COSSE - 0.4), 3.6), matLame, -12.5, (Y_LAME + 0.4 + Y_COSSE - 0.4) / 2, 0));   /* la montée, le long de la paroi */
    lameFixe.add(K.mesh(new T.BoxGeometry(15, 0.8, 3.6), matLame, -5.4, Y_LAME, 0));         /* la lame qui passe au-dessus du disque */
    lameFixe.add(K.cylY(R_PAST, 0.8, M.argent, 0, Y_PF, 0, 24));                            /* la pastille fixe, en argent */
    racine.add(lameFixe);

    const bagueAr = moitie(PROFIL_BAGUE, false, matBague), bagueAv = moitie(PROFIL_BAGUE, true, matBague);
    const lameB = K.mesh(new T.BoxGeometry(0.8, 2.0, 3.6), matLame, 12.5, 6.4, 0);           /* de la bague jusqu'à la cosse de droite */
    racine.add(bagueAr, bagueAv, lameB);

    /* ---------------------------------------------------------------- le disque bilame : un dôme dont la flèche change de sens */
    const NR = 12;
    const profilD = [];
    for (let i = 0; i <= NR; i++) profilD.push(new T.Vector2(R_D * i / NR, -E_D / 2));       /* le dessous, du centre au bord */
    for (let i = NR; i >= 0; i--) profilD.push(new T.Vector2(R_D * i / NR, E_D / 2));        /* le dessus, du bord au centre */
    const nPts = profilD.length;
    /* une moitié du disque (avant ou arrière) ; deformer(s) : s = +1 bombé vers le haut (froid, contact fermé), s = -1 vers le bas (chaud, contact ouvert) */
    const moitieDisque = avant => {
      const geo = new T.LatheGeometry(profilD, 20, avant ? -PI / 2 : PI / 2, PI);
      const p = geo.attributes.position, n = geo.attributes.normal, N = p.count;
      const X0 = new Float32Array(N), Z0 = new Float32Array(N), Y0 = new Float32Array(N), R0 = new Float32Array(N);
      for (let i = 0; i < N; i++) { X0[i] = p.getX(i); Z0[i] = p.getZ(i); Y0[i] = p.getY(i); R0[i] = Math.hypot(X0[i], Z0[i]); }
      return {
        geo,
        deformer(s) {
          for (let i = 0; i < N; i++) {
            const j = i % nPts, r = R0[i], u = r / R_D;
            const ux = r > 1e-6 ? X0[i] / r : 0, uz = r > 1e-6 ? Z0[i] / r : 0;
            const dessus = j > NR, bord = j === NR || j === NR + 1;
            const fp = -2 * FLECHE * s * r / (R_D * R_D);                  /* la pente du dôme */
            const a = dessus ? -fp : fp, ny = dessus ? 1 : -1, k = bord ? 1.5 : 0;
            const nx = a * ux + k * ux, nz = a * uz + k * uz, l = Math.hypot(nx, ny, nz) || 1;
            p.setY(i, Y0[i] + FLECHE * s * (1 - u * u));
            n.setXYZ(i, nx / l, ny / l, nz / l);
          }
          p.needsUpdate = true; n.needsUpdate = true;
        }
      };
    };
    const dAr = moitieDisque(false), dAv = moitieDisque(true);
    /* la section du disque, dans le plan z = 0 : une bande courbe, c'est elle qui montre le sens du bombé */
    const NB = 32;
    const geoB = new T.BufferGeometry(), posB = new Float32Array((NB + 1) * 6);
    geoB.setAttribute('position', new T.BufferAttribute(posB, 3));
    geoB.setAttribute('normal', new T.BufferAttribute(new Float32Array((NB + 1) * 6).map((v, i) => i % 3 === 2 ? 1 : 0), 3));
    const idx = []; for (let i = 0; i < NB; i++) idx.push(2 * i, 2 * i + 1, 2 * i + 3, 2 * i, 2 * i + 3, 2 * i + 2);
    geoB.setIndex(idx);
    const deformerBande = s => {
      for (let i = 0; i <= NB; i++) {
        const x = -R_D + 2 * R_D * i / NB, f = FLECHE * s * (1 - (x / R_D) * (x / R_D));
        posB.set([x, f + E_D / 2, 0, x, f - E_D / 2, 0], 6 * i);
      }
      geoB.attributes.position.needsUpdate = true; geoB.computeBoundingSphere();
    };
    const deformerTout = s => { dAr.deformer(s); dAv.deformer(s); deformerBande(s); };
    deformerTout(1);
    const bande = new T.Mesh(geoB, coupeMat); bande.position.z = 0.03; bande.frustumCulled = false;
    const discAr = new T.Group(); discAr.add(new T.Mesh(dAr.geo, matDisque), bande); discAr.position.y = Y_BORD;
    const discAv = new T.Mesh(dAv.geo, matDisque); discAv.position.y = Y_BORD;
    discAr.children[0].frustumCulled = false; discAv.frustumCulled = false;
    const pastille = K.cylY(R_PAST, 0.8, M.argent, 0, Y_D_HAUT + 0.4, 0, 24);                /* la pastille mobile, au centre du disque */
    racine.add(discAr, discAv, pastille);

    /* la chaleur : un voile rouge posé sur le disque et sur le fond (il ne dépend pas de la surbrillance des pièces) */
    const voileChaud = (geo, y, z) => {
      const mat = new T.MeshBasicMaterial({ color: 0xc4180a, transparent: true, opacity: 0, depthWrite: false, toneMapped: false, side: T.DoubleSide, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
      const m = new T.Mesh(geo, mat); m.raycast = () => {}; m.userData.decor = true; m.userData.sansOmbre = true; m.castShadow = false; m.visible = false; m.renderOrder = 3; m.frustumCulled = false;
      m.position.set(0, y || 0, z || 0);
      const c0 = new T.Color(0xc4180a), c1 = new T.Color(0xff7a18);
      let niveau = 0, cache = false;
      const poser = () => { m.visible = niveau > 0.12 && !cache; };
      return {
        m,
        regler(n) { niveau = n; poser(); mat.color.copy(c0).lerp(c1, K.clamp((n - 0.4) / 1.0, 0, 1)); mat.opacity = 0.62 * K.clamp((n - 0.12) / 0.8, 0, 1); },
        cacher(b) { cache = b; poser(); }
      };
    };
    const voiles = [voileChaud(dAr.geo, Y_BORD), voileChaud(dAv.geo, Y_BORD), voileChaud(geoB, Y_BORD, 0.04)];
    const voileAv = voiles[1];
    const voileSemelle = voileChaud(semelle.geometry, semelle.position.y);
    racine.add(...voiles.map(v => v.m), voileSemelle.m);

    /* ---------------------------------------------------------------- le courant (toujours dans le plan z = 0) */
    const yDome = r => Y_BORD + E_D / 2 + FLECHE * (1 - (r / R_D) * (r / R_D));
    const pts = [[-25, 7.9, 0], [-11.5, 7.9, 0], [-11.5, Y_GR, 0], [0, Y_GR, 0], [0, Y_D_HAUT + 0.4, 0]];
    for (let r = 2.2; r < R_D; r += 1.05) pts.push([r, yDome(r) + 0.55, 0]);
    pts.push([R_D, yDome(R_D) + 0.55, 0], [9.6, 6.95, 0], [11.5, 6.95, 0], [11.5, 7.9, 0], [25, 7.9, 0]);
    /* deux courants sur le même chemin : peu de grains, lents (normal) ; beaucoup de grains, rapides (surintensité) */
    const chemin = K.chemin(pts);
    const courantN = K.courant(chemin, { pas: 7, rayon: 0.75, vitesse: 20 });
    const courantF = K.courant(chemin, { pas: 3.2, rayon: 0.7, vitesse: 46 });
    [courantN, courantF].forEach(c => { c.regler({ debit: 0, alternatif: true, frequence: 0.7 }); racine.add(c.objet); });

    /* ---------------------------------------------------------------- l'état et le mouvement */
    let cause = 'normal';                  /* normal · surintensite · chaud */
    let ouvert = false, ferme = true;      /* ouvert : le bilame a basculé ; ferme : le contact touche vraiment */
    let Tb = 0, Tsem = 0, plafond = 9;     /* chaleur du bilame et du fond ; plafond : retient la chaleur pendant une étape */
    let pasAPas = false, eclatee = false, coupeActive = false, note = '', cleT = '', cleM = '';
    const sag = K.mobile(1, 800, 40);      /* +1 : bombé vers le haut ; -1 : vers le bas ; raide, donc ça bascule d'un coup */
    let sAff = 1;

    const placer = () => {
      const s = K.clamp(sag.x, -1.3, 1);
      if (Math.abs(s - sAff) > 1e-4) { deformerTout(s); sAff = s; }
      pastille.position.y = Y_BORD + FLECHE * s + E_D / 2 + 0.4;
      const f = s > 0.97;
      if (f !== ferme) { ferme = f; majGrains(); majMesures(); }
    };
    const fixer = o => { sag.x = sag.cible = o ? -1 : 1; sag.v = 0; placer(); };
    const majGrains = () => {
      const marche = ferme && !eclatee, fort = marche && cause === 'surintensite';
      courantN.regler({ debit: marche && !fort ? 1 : 0 });
      courantF.regler({ debit: fort ? 1 : 0 });
    };
    const majMesures = () => {
      const liste = [
        { libelle: 'Le contact', valeur: ferme ? 'fermé' : 'ouvert' },
        { libelle: 'Le courant dans le Klixon', valeur: !ferme ? 'plus de courant' : cause === 'surintensite' ? 'trop fort' : 'normal' },
        { libelle: 'Ohmmètre entre les deux cosses (hors tension)', valeur: ferme ? 'presque 0 Ω' : 'l’infini' }
      ];
      const k = JSON.stringify(liste);
      if (k !== cleM) { cleM = k; ctx.mesures(liste); }
    };
    const poserChaleur = () => { voiles.forEach(v => v.regler(Tb)); voileSemelle.regler(Tsem); };

    const PH = {
      normal: '<strong>Fonctionnement normal.</strong> Le contact est fermé. Le courant entre par une cosse, passe par le contact et par le disque bilame, puis sort par l’autre cosse. Hors tension, l’ohmmètre entre les deux cosses lit presque 0 Ω.',
      surintensite: '<strong>Le courant est trop fort.</strong> Il passe dans le bilame et le chauffe : suivez la couleur du disque, il rougit. Le contact est encore fermé. Dès que le bilame est trop chaud, il bascule.',
      chaud: '<strong>Le compresseur est trop chaud.</strong> Le fond du Klixon touche le compresseur : la chaleur monte jusqu’au bilame, qui rougit. Le contact est encore fermé. Dès que le bilame est trop chaud, il bascule.',
      ouvert: '<strong>Le Klixon a coupé.</strong> Le bilame a basculé d’un coup : le contact est ouvert et le courant ne passe plus. Les deux enroulements sont protégés. À l’ohmmètre, vous lisez l’infini entre les deux cosses. Pour que le contact se referme, le bilame doit refroidir : cliquez sur « Laisser refroidir ».',
      refroidit: '<strong>Le bilame refroidit.</strong> Il reprend peu à peu sa forme. Le contact est encore ouvert.',
      referme: '<strong>Le Klixon s’est refermé.</strong> Le bilame a refroidi et a repris sa forme : le contact est fermé, le courant repasse. Si la cause du défaut est toujours là, le Klixon coupera de nouveau.'
    };
    const texteEtat = () => note || (ouvert ? (cause === 'normal' ? PH.refroidit : PH.ouvert) : PH[cause]);
    const dire = () => { const t = texteEtat(); cleT = t; if (!pasAPas) ctx.dire(t); };
    const syncCommandes = () => ctx.regler('etat', cause);

    /* les temps du mouvement pas à pas : chacun fixe tout l'état, pour qu'on puisse y aller dans n'importe quel ordre */
    const phase = p => {
      pasAPas = true; note = '';
      const regle = (c, o, t, ts, pl) => { cause = c; ouvert = o; Tb = t; Tsem = ts; plafond = pl; fixer(o); };
      if (p === 'normal')    regle('normal', false, 0, 0, 9);
      if (p === 'chauffe')   regle('surintensite', false, 0.15, 0, 0.9);
      if (p === 'ouvre')     regle('surintensite', false, 0.8, 0, 9);
      if (p === 'ouvert')    regle('surintensite', true, 1.1, 0.9, 9);
      if (p === 'refroidit') regle('normal', true, 1.1, 0.9, 9);
      poserChaleur(); syncCommandes(); majGrains(); majMesures();
    };

    const agir = (id, val) => {
      if (id === 'phase') { phase(val); return; }
      pasAPas = false; plafond = 9; note = '';
      if (id === 'etat') cause = val;
      else if (id === 'refroidir') { cause = 'normal'; syncCommandes(); }
      else return;
      majGrains(); majMesures(); dire();
    };

    /* la coupe : la moitié avant du boîtier, du couvercle, de la bague et du disque disparaît ; pendant l'éclaté, tout est plein */
    const appliquerCoupe = () => {
      const on = coupeActive && !eclatee;
      [cuvetteAv, couvercleAv, bagueAv, discAv].forEach(o => { o.visible = !on; });
      voileAv.cacher(on);
    };

    placer(); majGrains(); majMesures();

    const cadre = [semelle, cuvetteAr, cuvetteAv, couvercleAr, couvercleAv, cosseG, cosseD];
    return {
      racine,
      /* « comprendre » : presque de face, là où l'on voit le dôme se retourner ;
         « découvrir » : de trois quarts, avec le dessus du couvercle et les deux cosses */
      vue: ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 28, zoom: 1.45, cadre, marge: 1.1 }
                                    : { azimut: -12, elevation: 20, zoom: 1.5, cadre, marge: 1.1 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome(on) { coupeActive = on; appliquerCoupe(); },
      phrase: PH.normal,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [cuvetteAr, cuvetteAv], desc: 'Un petit boîtier rond en bakélite, un plastique sombre qui isole. Il enferme le mécanisme. « Voir en coupe » le coupe en deux.' },
        { id: 'couvercle', nom: 'Le couvercle', objets: [couvercleAr, couvercleAv], desc: 'Il ferme le boîtier par le haut. À l’atelier, vous voyez seulement lui, le boîtier, le fond et les deux cosses.' },
        { id: 'semelle', nom: 'Le fond métallique', objets: [semelle], desc: 'Il se pose contre le compresseur et lui prend sa chaleur. En « Trop chaud », il rougit.' },
        { id: 'bilame', nom: 'Le disque bilame', objets: [discAr, discAv], desc: 'Un disque fait de deux métaux collés, qui ne se dilatent pas pareil. Froid, il est bombé vers le haut. Trop chaud, il se déforme et se retourne d’un coup.' },
        { id: 'contactMobile', nom: 'Le contact mobile', objets: [pastille], desc: 'Une pastille d’argent au centre du disque. Elle monte et descend avec lui.' },
        { id: 'contactFixe', nom: 'Le contact fixe', objets: [lameFixe], desc: 'Une lame de métal avec une pastille d’argent, reliée à une cosse. Quand le disque est bombé vers le haut, il appuie dessus : le contact est fermé.' },
        { id: 'bague', nom: 'La bague d’appui', objets: [bagueAr, bagueAv, lameB], desc: 'Elle tient le bord du disque. Le courant la traverse pour rejoindre l’autre cosse.' },
        { id: 'cosses', nom: 'Les deux cosses', objets: [cosseG, cosseD], desc: 'Deux lames plates où l’on branche les fils. Le Klixon est en série sur la borne C du compresseur : tout le courant passe par lui.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', titre: 'Le compresseur', options: [['normal', 'Fonctionnement normal'], ['surintensite', 'Surintensité'], ['chaud', 'Trop chaud']], valeur: 'normal' },
        { id: 'refroidir', type: 'action', libelle: 'Laisser refroidir', accent: true }
      ],
      etapes: [
        { titre: 'Fonctionnement normal', piece: 'bilame', voirDedans: true, actions: [['phase', 'normal']],
          vue: { azimut: -10, elevation: 12, zoom: 2.2, cible: [0, 8, 0] },
          texte: 'Le contact est fermé : le disque bilame, bombé vers le haut, appuie sur le contact fixe. Le courant entre par une cosse, traverse le disque et ressort par l’autre cosse.' },
        { titre: 'Le courant devient trop fort : le bilame chauffe', piece: 'cosses', voirDedans: true, actions: [['phase', 'chauffe']],
          vue: { azimut: -10, elevation: 12, zoom: 2.2, cible: [0, 8, 0] }, duree: 7,
          texte: 'Un courant trop fort chauffe le bilame, qui est sur son passage. Regardez le disque : il rougit. Le contact est encore fermé. La chaleur du compresseur peut aussi faire chauffer le bilame.' },
        { titre: 'Le bilame bascule d’un coup', piece: 'bilame', voirDedans: true, ralenti: true, actions: [['phase', 'ouvre']],
          vue: { azimut: -8, elevation: 8, zoom: 2.4, cible: [0, 8, 0] }, duree: 8,
          texte: 'Trop chaud, le bilame se déforme : le disque se retourne d’un coup et devient bombé vers le bas. Il s’éloigne du contact fixe, et le contact s’ouvre.' },
        { titre: 'Le contact ouvert coupe le courant', piece: 'contactFixe', voirDedans: true, actions: [['phase', 'ouvert']],
          vue: { azimut: -8, elevation: 8, zoom: 2.4, cible: [0, 8, 0] }, duree: 7,
          texte: 'Le courant ne passe plus : les deux enroulements du compresseur sont protégés. À l’ohmmètre, entre les deux cosses, vous lisez l’infini.' },
        { titre: 'Le bilame refroidit : le contact se referme', piece: 'contactMobile', voirDedans: true, ralenti: true, actions: [['phase', 'refroidit']],
          vue: { azimut: -8, elevation: 8, zoom: 2.4, cible: [0, 8, 0] }, duree: 9,
          texte: 'Le bilame refroidit et reprend sa forme. Le disque se retourne de nouveau, bombé vers le haut, et le contact se referme.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : le couvercle monte, la lame fixe avec sa cosse, le disque,
         la bague avec sa cosse, puis le fond descend ; le boîtier reste en place */
      eclate: [
        { objets: [couvercleAr, couvercleAv], vers: [0, 64, 0], debut: 0, fin: 0.5 },
        { objets: [lameFixe, cosseG], vers: [0, 52, 0], debut: 0.1, fin: 0.6 },
        { objets: [discAr, discAv, pastille, ...voiles.map(v => v.m)], vers: [0, 34, 0], debut: 0.25, fin: 0.75 },
        { objets: [bagueAr, bagueAv, lameB, cosseD], vers: [0, 21, 0], debut: 0.35, fin: 0.85 },
        { objets: [cuvetteAr, cuvetteAv], vers: [0, 10, 0], debut: 0.5, fin: 1 }
      ],
      eclateVue: { azimut: -40, elevation: 14, zoom: 0.66, cible: [0, 38, 0] },
      surEclate(on) { eclatee = on; appliquerCoupe(); majGrains(); },
      agir,
      animer(dt) {
        let actif = false;
        /* le fond, contre le compresseur */
        const cs = cause === 'chaud' ? 1.3 : cause === 'surintensite' ? 0.9 : 0;
        if (Tsem !== cs) {
          Tsem = K.vers(Tsem, cs, cs < Tsem || cause === 'chaud' ? 0.9 : 0.2, dt);
          if (Math.abs(Tsem - cs) < 0.004) Tsem = cs;
          actif = true; voileSemelle.regler(Tsem);
        }
        /* le bilame : chauffé par le courant (surintensité) ou par le fond (trop chaud) ; refroidi quand la cause cesse */
        const cd = cause === 'normal' ? 0 : cause === 'surintensite' ? (ouvert ? 1.1 : 2.2) : (ouvert ? 1.2 : 2 * Math.min(1, Tsem / 1.3));
        if (Tb !== cd && !(Tb >= plafond && cd > Tb)) {
          Tb = K.vers(Tb, cd, cd < Tb ? 0.9 : 0.6, dt);
          if (Math.abs(Tb - cd) < 0.004) Tb = cd;
          if (Tb > plafond) Tb = plafond;
          actif = true; voiles.forEach(v => v.regler(Tb));
        }
        /* il coupe en haut, il se referme plus bas : un seul seuil ferait battre le contact */
        if (!ouvert && Tb >= SEUIL_OUV) { ouvert = true; sag.cible = -1; note = ''; }
        else if (ouvert && Tb <= SEUIL_FER) { ouvert = false; sag.cible = 1; note = PH.referme; }
        if (sag.pas(dt)) actif = true;
        placer();
        [courantN, courantF].forEach(c => { if (c.animer(dt)) actif = true; });
        majMesures();
        if (texteEtat() !== cleT) dire();
        return actif;
      }
    };
  }, { famille: 'protecteur', titre: 'Le Klixon', stations: ['9.5'] });
})();
