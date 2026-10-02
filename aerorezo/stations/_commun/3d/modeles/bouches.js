/* AéroRézo 3D — famille « bouches » : la bouche d'extraction hygroréglable.
   Unités : mm. Repère : Z dans l'axe de la bouche (+Z = la pièce, la face qu'on voit ; -Z = la gaine, derrière
   le mur), Y vers le haut, X sur le côté. La bouche est posée en haut d'un mur de salle d'eau : façade ronde,
   corps dans le mur, manchette Ø 125 enfilée dans la gaine.

   CE QUE L'ÉLÈVE DOIT VOIR (cause → effet, tout seul, sans électricité) :
     air sec → tresse courte → elle tient le volet presque fermé → peu de grains passent ;
     douche → l'humidité monte → la tresse s'allonge → le levier lâche, le ressort ouvre le volet →
     la section de passage grandit → le débit monte ;
     l'humidité redescend → la tresse se raccourcit → elle referme le volet (jamais tout à fait).

   LA MÉCANIQUE (dans le plan de coupe, vue du côté +X) :
     · le volet est un disque articulé sur un axe en haut de l'orifice, derrière la cloison percée ;
     · la tresse relie un point fixe, en haut vers l'avant, au levier collé sur la face avant du volet
       (le levier traverse l'orifice) : une tresse qui tire = un volet qui se ferme ;
     · le ressort, derrière le volet, le tire vers l'ouverture : c'est le « ressort de rappel ».
   Le volet ne prend aucun courant : on peut arrêter le caisson, il bouge quand même.

   COULEUR DE L'AIR (commune à AéroRézo) : air extrait jaune 0xd9a21b. La couleur ne porte jamais seule
   l'information : le texte nomme l'air.

   « Voir en coupe » retire la moitié x > 0 : la cloison du mur, le corps, la manchette, la gaine sont coupés
   (faces de coupe hachurées ou unies), le volet aussi (un trait épais). Tout le mécanisme est derrière le plan,
   entier. Les grains courent juste derrière le plan, dans l'air. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('boucheHygro', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const D = Math.PI / 180;
    const AIR = { repris: 0xd9a21b };
    const num = (v, d) => (typeof v === 'number' && isFinite(v)) ? v : d;
    const opt = ctx.options || {};

    /* ---------------------------------------------------------------- matières
       Tout ce qui se coupe a sa matière propre, double face. */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const abs = C(K.plastique(0xf5f4ef, 0.4));              /* façade : ABS blanc brillant */
    const absCorps = C(K.plastique(0xeceae3, 0.45));        /* corps de la bouche */
    const pp = C(K.plastique(0xdad8d0, 0.5));               /* manchette : polypropylène gris clair */
    const murMat = C(K.plastique(0xd9d4c9, 0.92));          /* mur : enduit */
    const galva = C(M.zingue, 0xbfc5c9);                    /* gaine */
    const alu = C(M.aluminium, 0x9fa9b3);                   /* collier */
    const caou = C(M.caoutchouc, 0x2a2d31);                 /* joint à lèvres */
    const volMat = C(K.plastique(0x66717d, 0.45));          /* volet : polyamide gris moyen */
    const levMat = C(K.plastique(0x2f353c, 0.5));           /* levier : polyamide gris sombre */
    const acier = C(M.acier, 0xaab2ba);
    const supMat = C(K.plastique(0x8d96a0, 0.5));           /* pattes de fixation, pièces moulées grises */
    const tresseMat = (() => {
      const c = document.createElement('canvas'); c.width = 32; c.height = 32;
      const x = c.getContext('2d'); x.fillStyle = '#e6c982'; x.fillRect(0, 0, 32, 32);
      x.strokeStyle = '#8a6425'; x.lineWidth = 5;
      for (let i = -32; i <= 32; i += 16) { x.beginPath(); x.moveTo(i, 32); x.lineTo(i + 32, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace;
      return C(new T.MeshStandardMaterial({ map: t, roughness: 0.85 }));
    })();

    const boite = (x0, x1, y0, y1, z0, z1, mat, r) => {
      const g = r ? K.boite(x1 - x0, y1 - y0, z1 - z0, r) : new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      return K.mesh(g, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    };
    const cyl = (axe, r, a0, a1, c1, c2, mat, seg) => {
      const g = new T.CylinderGeometry(r, r, a1 - a0, seg || 24);
      if (axe === 'x') g.rotateZ(Math.PI / 2); else if (axe === 'z') g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat), c = (a0 + a1) / 2;
      if (axe === 'x') m.position.set(c, c1, c2); else if (axe === 'y') m.position.set(c1, c, c2); else m.position.set(c1, c2, c);
      return m;
    };
    /* une forme de révolution autour de l'axe Z : points [rayon, z] */
    const revolZ = (pts, mat, seg) => {
      const g = new T.LatheGeometry(pts.map(([r, z]) => new T.Vector2(r, z)), seg || 64);
      g.rotateX(Math.PI / 2);
      return new T.Mesh(g, mat);
    };

    /* ================================================================ LES COTES */
    const R_IN = 60.5;                         /* passage de la bouche et de la manchette (Ø 121) */
    const P = {                                /* profils [rayon, z] — repris tels quels pour les faces de coupe */
      collerette: [[56, 0], [100, 0], [100, 4], [97, 8], [92, 9], [56, 9]],
      disque: [[0, 4], [44, 4], [46, 6], [46, 8], [44, 10], [0, 10]],
      corps: [[R_IN, 0], [64, 0], [64, -70], [R_IN, -70]],
      cloison: [[42, -55], [61, -55], [61, -52], [42, -52]],            /* la cloison percée Ø 84 : le siège du volet */
      manchette: [[R_IN, -70], [62.5, -70], [62.5, -180], [R_IN, -180]], /* Ø 125 */
      joint: [[62.5, -100], [63.8, -100], [63.8, -106], [62.5, -106]],
      gaine: [[63.8, -84], [64.6, -84], [64.6, -230], [63.8, -230]],
      collier: [[64.6, -138], [67.6, -138], [67.6, -150], [64.6, -150]]
    };
    const MUR = { demi: 150, z: 80, trou: 64.5 };
    const PY = 44.5, PZ = -56.5, FR = 44;      /* l'axe du volet (X), le rayon du volet */
    const LEV = { y: -18, z: 15 };             /* la pointe du levier, dans le repère du volet */
    const HOOK = { y: -22, z: -5 };            /* le crochet du ressort, sur la face arrière du volet */
    const FB = { y: 54.5, z: -9 };             /* le point fixe de la tresse (en haut, vers l'avant) */
    const FC = { y: 56, z: -115 };             /* le point fixe du ressort (en haut, derrière le volet) */
    const XM = -6;                             /* le plan du mécanisme : juste derrière le plan de coupe */
    const XG = -14;                            /* les grains courent plus loin derrière, dans l'air */
    const QMIN = 15, QMAX = 45;                /* débits d'illustration (m³/h) : la station n'en donne pas */
    const RH_LO = 40, RH_HI = 70;              /* l'humidité où le volet commence à s'ouvrir, où il est grand ouvert */
    const TH_MAX = 58 * D;                     /* l'angle du volet grand ouvert */

    /* ================================================================ LE MUR */
    const mur = new T.Group();
    {
      const s = new T.Shape(), h = MUR.demi;
      s.moveTo(-h, -h); s.lineTo(h, -h); s.lineTo(h, h); s.lineTo(-h, h); s.lineTo(-h, -h);
      const trou = new T.Path(); trou.absarc(0, 0, MUR.trou, 0, Math.PI * 2, true); s.holes.push(trou);
      const g = new T.ExtrudeGeometry(s, { depth: MUR.z, bevelEnabled: false, curveSegments: 64 });
      g.translate(0, 0, -MUR.z);
      mur.add(new T.Mesh(g, murMat));
    }
    racine.add(mur);

    /* ================================================================ LA FAÇADE
       Une collerette ronde, un disque au centre tenu par quatre ailettes : l'air entre par la fente. */
    const facade = new T.Group();
    facade.add(revolZ(P.collerette, abs, 72), revolZ(P.disque, abs, 48));
    [45, 135, 225, 315].forEach(a => { const g = new T.Group(); g.rotation.z = a * D; g.add(boite(44, 57, -3, 3, 4, 9, abs)); facade.add(g); });
    racine.add(facade);

    /* ================================================================ LE CORPS, LA MANCHETTE, LA GAINE */
    const corps = new T.Group();
    corps.add(revolZ(P.corps, absCorps, 72), revolZ(P.cloison, absCorps, 72));
    racine.add(corps);
    const manchette = new T.Group();
    manchette.add(revolZ(P.manchette, pp, 72), revolZ(P.joint, caou, 48));
    racine.add(manchette);
    const gaine = new T.Group();
    gaine.add(revolZ(P.gaine, galva, 72), revolZ(P.collier, alu, 48));
    racine.add(gaine);

    /* ================================================================ LE MÉCANISME (un module, derrière le plan de coupe) */
    const module = new T.Group(); racine.add(module);

    /* le volet : un disque articulé en haut ; il pivote autour de l'axe X, vers l'aval */
    const voletRot = new T.Group(); voletRot.position.set(0, PY, PZ);
    const disque = new T.Group();
    {
      const g = new T.CylinderGeometry(FR, FR, 3, 56); g.rotateX(Math.PI / 2);
      const d = new T.Mesh(g, volMat); d.position.set(0, -FR, 0); disque.add(d);
      disque.add(boite(XM - 3, XM + 3, HOOK.y - 3, HOOK.y + 3, -7, -1.5, levMat, 0.8));    /* le crochet du ressort */
    }
    /* le levier : collé sur la face avant du volet, il traverse l'orifice ; la tresse s'accroche au bout */
    const levier = new T.Group();
    levier.add(boite(XM - 5, XM + 5, LEV.y - 5, LEV.y + 5, 1.5, 3.5, levMat, 0.6));
    levier.add(boite(XM - 3, XM + 3, LEV.y - 3, LEV.y + 3, 3.5, LEV.z, levMat, 0.8));
    levier.add(cyl('x', 3.4, XM - 3, XM + 3, LEV.y, LEV.z, levMat, 16));
    voletRot.add(disque, levier);
    /* la section du volet, dans le plan de coupe : un trait épais qui tourne avec lui */
    const matCapVolet = new T.MeshStandardMaterial({ color: 0x3c4650, roughness: 0.55, side: T.DoubleSide });
    const capVolet = (() => {
      const g = new T.PlaneGeometry(3, 2 * FR); g.rotateY(Math.PI / 2);
      const m = new T.Mesh(g, matCapVolet); m.position.set(0.5, -FR, 0); m.userData.sansOmbre = true; m.castShadow = false; m.visible = false;
      voletRot.add(m); return m;
    })();
    module.add(voletRot);

    /* les supports : l'axe du volet, ses deux pattes, les deux points fixes (tresse, ressort) */
    const supports = new T.Group();
    supports.add(cyl('x', 1.8, -30, 30, PY, PZ, acier, 14));
    [-1, 1].forEach(s => supports.add(boite(s > 0 ? 22 : -30, s > 0 ? 30 : -22, PY - 5, 60, PZ - 5, -55, supMat)));
    supports.add(boite(XM - 3, XM + 3, FB.y - 1, 61, FB.z - 3, FB.z + 3, supMat, 0.8), cyl('x', 2.2, XM - 3, XM + 3, FB.y, FB.z, acier, 12));
    supports.add(boite(XM - 3, XM + 3, FC.y - 1, 61, FC.z - 3, FC.z + 3, supMat, 0.8), cyl('x', 2.2, XM - 3, XM + 3, FC.y, FC.z, acier, 12));
    module.add(supports);

    /* la tresse hygrosensible : un cordon que l'on étire entre le point fixe et le bout du levier */
    const tresse = new T.Group();
    const cordon = new T.Mesh(new T.CylinderGeometry(1.7, 1.7, 1, 10, 1, false), tresseMat);
    const sertiA = new T.Mesh(new T.SphereGeometry(2.6, 12, 8), acier), sertiB = new T.Mesh(new T.SphereGeometry(2.6, 12, 8), acier);
    sertiB.position.set(XM, FB.y, FB.z);
    tresse.add(cordon, sertiA, sertiB);
    module.add(tresse);

    /* le ressort de rappel : un ressort de traction, du crochet du volet au point fixe */
    const ressort = new T.Group();
    const spire = K.ressort(3.8, 40, 9, 0.75, acier);
    ressort.add(spire);
    module.add(ressort);

    const tendre = (m, a, b, base) => {                       /* pose m entre a et b : l'axe Y du maillage suit a → b */
      const dir = b.clone().sub(a), L = dir.length();
      if (base) { m.position.copy(a); m.scale.y = L / base; }
      else { m.position.copy(a).addScaledVector(dir, 0.5); m.scale.set(1, L, 1); }
      m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
      return L;
    };

    /* ================================================================ LES FACES DE COUPE
       Plan x = 0 vu du côté +X : repère local (u = -z, v = y). */
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const plat = c => new T.MeshStandardMaterial({ color: c, roughness: 0.55, side: T.DoubleSide });
    const H = { mur: hachures('#cfc9bb', '#7f7867', 36, 5), plastique: plat(0x4e5a66), galva: plat(0x56606b), alu: plat(0x7b8791), caou: plat(0x1c1e21) };
    const faces = new T.Group(); faces.visible = false; faces.rotation.y = Math.PI / 2; faces.position.x = 0.5; racine.add(faces);
    const faceDe = (polys, mat) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.userData.sansOmbre = true; m.castShadow = false; faces.add(m);
    };
    const hautBas = pts => [pts.map(([r, z]) => [-z, r]), pts.map(([r, z]) => [-z, -r])];
    const rect = (u0, u1, v0, v1) => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];
    faceDe([rect(0, MUR.z, MUR.trou, MUR.demi), rect(0, MUR.z, -MUR.demi, -MUR.trou)], H.mur);
    faceDe([...hautBas(P.collerette), ...hautBas(P.corps), ...hautBas(P.cloison), ...hautBas(P.manchette)], H.plastique);
    faceDe([[[-4, -44], [-4, 44], [-6, 46], [-8, 46], [-10, 44], [-10, -44], [-8, -46], [-6, -46]]], H.plastique);   /* le disque */
    faceDe(hautBas(P.gaine), H.galva);
    faceDe(hautBas(P.collier), H.alu);
    faceDe(hautBas(P.joint), H.caou);
    faceDe([rect(-PZ - 1.8, -PZ + 1.8, PY - 1.8, PY + 1.8)], H.plastique);   /* l'axe du volet, coupé */

    /* ================================================================ L'AIR QUI CIRCULE
       Des grains jaunes entrent par la fente de la façade, passent l'orifice, glissent le long du volet
       et filent sous son bord. Plus le volet est ouvert, plus la bande de passage est large : les trajets
       sont recalculés à chaque angle. */
    const NL = 6;
    const YS = [52, 49, 46, -46, -49, -52];     /* dans la fente, à x = XG */
    const YO = [30, 18, 6, -6, -18, -30];       /* dans l'orifice */
    const YE = [38, 23, 8, -8, -23, -38];       /* dans la gaine, l'air se répartit */
    const PRIO = [1, 4, 0, 5, 2, 3];            /* l'ordre d'apparition des lignes : peu d'air = 2 lignes, beaucoup = 6 */
    const courbes = YS.map(() => new T.CatmullRomCurve3(Array.from({ length: 11 }, () => V(0, 0, 0)), false, 'centripetal'));
    const tracer = th => {
      const c = Math.cos(th), s = Math.sin(th);
      const face = (l, d) => [PY - l * c - d * s, PZ - l * s + d * c];      /* un point du devant du volet : l = distance à l'axe, d = écart */
      const bord = face(88, 5);
      const yHi = bord[0] - 4;
      courbes.forEach((cv, k) => {
        const ys = YS[k], yo = YO[k], ye = YE[k];
        const brut = (PY - yo - 4 * s) / c;
        let a, b;
        if (brut > 86) { a = [yo, -75]; b = [yo, Math.min(-92, bord[1] - 6)]; }               /* sous le bord du volet : tout droit */
        else { const l = Math.max(10, brut); a = face(l, 4.5); b = face(Math.min(86, l + (88 - l) * 0.55), 5); }
        const yp = yHi + (-56 - yHi) * (k / (NL - 1));
        const pts = [[ys, 24], [ys, 5], [ys + (yo - ys) * 0.55, -24], [yo, -44], [yo, -53.5], a, b, [yp, bord[1] - 16], [(yp + ye) / 2, -150], [ye, -190], [ye, -226]];
        pts.forEach((p, i) => cv.points[i].set(XG, p[0], p[1]));
        cv.updateArcLengths();
      });
    };
    const frac = rh => { const t = K.clamp((rh - RH_LO) / (RH_HI - RH_LO), 0, 1); return t * t * (3 - 2 * t); };
    const debitDe = rh => QMIN + (QMAX - QMIN) * frac(rh);
    const angleDe = rh => Math.asin(debitDe(rh) / QMAX * Math.sin(TH_MAX));
    const E = { marche: false, rh: K.clamp(num(opt.rh, 40), 30, 80), coupe: false, demonte: false };
    let theta = angleDe(E.rh);
    tracer(theta);
    const lignes = courbes.map(cv => {
      const f = K.courant(cv, { pas: 11, rayon: 1.8, couleur: AIR.repris, vitesse: 90 });
      racine.add(f.objet); return f;
    });

    /* la vapeur, devant la bouche : de petits nuages bleutés qui dérivent vers la fente quand l'air est humide */
    const vapeur = (() => {
      const N = 20, geo = new T.SphereGeometry(1, 8, 6);
      const mat = new T.MeshStandardMaterial({ color: 0xa9c8e6, roughness: 1, transparent: true, opacity: 0.45, depthWrite: false });
      const im = new T.InstancedMesh(geo, mat, N); im.userData.sansOmbre = true; im.userData.voile = true; im.frustumCulled = false;
      const gr = Array.from({ length: N }, (_, i) => ({ u: i / N, x: -60 + (i * 47) % 120, y: -75 + (i * 61) % 150 }));
      const m4 = new T.Matrix4(), q = new T.Quaternion(), s = new T.Vector3(), p = new T.Vector3();
      const poser = () => {
        gr.forEach((g, i) => { p.set(g.x * (1 - 0.3 * g.u), g.y * (1 - 0.45 * g.u), 125 - 95 * g.u); s.setScalar(5 + 8 * Math.sin(Math.PI * g.u)); m4.compose(p, q, s); im.setMatrixAt(i, m4); });
        im.instanceMatrix.needsUpdate = true;
      };
      poser();
      return { objet: im, poser, avancer(dt) { gr.forEach(g => { g.u = (g.u + dt * 0.12) % 1; }); poser(); }, regler(rh) { im.count = Math.round(N * K.clamp((rh - 45) / 30, 0, 1)); } };
    })();
    racine.add(vapeur.objet);

    /* ================================================================ L'ÉTAT */
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const ouverture = () => Math.round(100 * debitDe(E.rh) / QMAX);
    const majMesures = () => {
      ctx.mesures([
        { libelle: 'Humidité de l’air', valeur: nb(E.rh, 0) + ' %' },
        { libelle: 'Ouverture du volet', valeur: nb(ouverture(), 0) + ' %' },
        { libelle: 'Débit extrait', valeur: (E.marche ? nb(debitDe(E.rh), 0) : '0') + ' m³/h' }
      ]);
    };
    const majTexte = () => {
      majMesures();
      const f = frac(E.rh), o = ouverture();
      let t = '<strong>Air à ' + nb(E.rh, 0) + ' %.</strong> ';
      if (f < 0.12) t += 'La tresse est courte : elle tient le volet presque fermé (' + o + ' %). ';
      else if (f > 0.88) t += 'La tresse est longue : le ressort a ouvert le volet en grand (' + o + ' %). ';
      else t += 'La tresse s’allonge peu à peu : le volet s’ouvre (' + o + ' %). ';
      if (!E.marche) t += 'Le caisson est à l’arrêt : aucun air ne passe, mais le volet a bougé quand même. Il n’y a pas d’électricité.';
      else t += 'Le caisson extrait ' + nb(debitDe(E.rh), 0) + ' m³/h d’' + air('repris', 'air extrait') + (f < 0.12 ? ' : un filet, la bouche ne se ferme jamais tout à fait.' : '.') + ' <em>Plus il y a de grains, plus le débit est grand.</em>';
      ctx.dire(t);
    };
    let fl = 0;                                                  /* 0 = air immobile, 1 = pleine vitesse */
    const visibles = () => {
      const on = E.marche && !E.demonte && E.coupe, f = frac(E.rh), n = Math.round(2 + 4 * f);
      lignes.forEach((L, k) => { L.objet.visible = on && PRIO.indexOf(k) < n; });
      vapeur.regler(E.rh);
    };
    const poserMeca = () => {
      const c = Math.cos(theta), s = Math.sin(theta);
      voletRot.rotation.x = theta;
      const pt = (yl, zl) => V(XM, PY + yl * c - zl * s, PZ + yl * s + zl * c);
      const A = pt(LEV.y, LEV.z), S = pt(HOOK.y, HOOK.z);
      const L = tendre(cordon, V(XM, FB.y, FB.z), A);
      tresseMat.map.repeat.set(1, L / 5);
      sertiA.position.copy(A);
      tendre(spire, S, V(XM, FC.y, FC.z), 40);
      tracer(theta);
      lignes.forEach(l => l.regler({}));
    };

    const voirFaces = () => { const on = E.coupe && !E.demonte; faces.visible = on; capVolet.visible = on; };
    const plan = new T.Plane(new T.Vector3(-1, 0, 0), 0);
    const basculerCoupe = on => {
      E.coupe = on;
      const pl = on ? [plan] : null;
      const exclus = new Set();
      [faces, capVolet].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = pl; m.needsUpdate = true; } });
      });
      voirFaces(); visibles();
    };

    let coupeAvant = false;
    poserMeca(); visibles(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'facade', nom: 'La façade', objets: [facade], desc: 'Une collerette ronde et blanche, avec un disque au centre. L’air de la pièce entre par la fente autour du disque. Elle se clipse et se démonte pour nettoyer.' },
      { id: 'volet', nom: 'Le volet', objets: [disque], desc: 'Un disque articulé en haut. Il ferme presque l’orifice quand l’air est sec et le laisse grand ouvert quand l’air est humide. Il garde toujours un passage.' },
      { id: 'levier', nom: 'Le levier', objets: [levier], desc: 'Une petite tige collée sur le volet. Elle traverse l’orifice : c’est elle que la tresse tire.' },
      { id: 'tresse', nom: 'La tresse hygrosensible', objets: [tresse], desc: 'Un cordon en polyamide. Il absorbe l’humidité de l’air : il s’allonge quand l’air est humide, il se raccourcit quand l’air est sec. C’est le capteur, sans électricité.' },
      { id: 'ressort', nom: 'Le ressort de rappel', objets: [ressort], desc: 'Il pousse toujours le volet vers l’ouverture. C’est la tresse, quand elle est courte, qui le retient.' },
      { id: 'supports', nom: 'L’axe et les pattes de fixation', objets: [supports], desc: 'L’axe sur lequel pivote le volet, et les pattes qui tiennent la tresse et le ressort. Elles ne bougent pas.' },
      { id: 'corps', nom: 'Le corps et la cloison percée', objets: [corps], desc: 'Un tube de plastique blanc, scellé dans le mur. Au fond, une cloison percée : c’est le siège du volet.' },
      { id: 'manchette', nom: 'La manchette Ø 125 et son joint', objets: [manchette], desc: 'Le tube qui sort derrière le mur. On l’enfile dans la gaine. Le joint à lèvres empêche l’air de fuir.' },
      { id: 'gaine', nom: 'La gaine Ø 125 et son collier', objets: [gaine], desc: 'La gaine emmène l’air extrait vers le caisson. Le collier serre la gaine sur la manchette.' },
      { id: 'mur', nom: 'Le mur', objets: [mur], desc: 'Le mur de la salle d’eau, percé d’un trou pour la bouche. Ici, un morceau de 300 mm de côté.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'arret', titre: 'Le caisson d’extraction' },
      { id: 'humidite', type: 'curseur', libelle: 'Humidité de l’air', min: 30, max: 80, pas: 1, unite: '%', valeur: E.rh }
    ];

    const sec = 35, douche = 75, sec2 = 40;
    const etapes = [
      { titre: 'La bouche, telle qu’on la pose', piece: 'facade', voirDedans: false, eclate: false, actions: [['marche', 'arret'], ['humidite', sec2]],
        vue: { azimut: 24, elevation: 10, zoom: 1.0, cible: null },
        texte: 'Une bouche ronde et blanche, posée en haut du mur d’une salle d’eau. L’air de la pièce entre par la fente, autour du disque. Derrière le mur, une manchette Ø 125 est enfilée dans la gaine.' },
      { titre: 'Air sec : la tresse est courte', piece: 'tresse', voirDedans: true, eclate: false, actions: [['marche', 'arret'], ['humidite', sec]],
        vue: { azimut: 82, elevation: 8, zoom: 1.9, cible: [0, 22, -62] },
        texte: 'Dans un air sec (35 %), la tresse est courte et tendue. Elle tire le levier et tient le volet presque fermé. Le ressort pousse pour ouvrir, mais il n’y arrive pas.' },
      { titre: 'Le caisson aspire un filet d’air', piece: 'volet', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['humidite', sec]],
        vue: { azimut: 82, elevation: 8, zoom: 1.5, cible: [0, 0, -100] },
        texte: 'Le caisson tourne. ' + air('repris', 'L’air extrait') + ' ne passe que dans l’espace étroit qui reste sous le volet : peu de grains, 15 m³/h. La bouche ne se ferme jamais tout à fait.' },
      { titre: 'La douche : la tresse s’allonge, le volet s’ouvre', piece: 'tresse', voirDedans: true, eclate: false, ralenti: true, actions: [['marche', 'marche'], ['humidite', douche]],
        vue: { azimut: 82, elevation: 8, zoom: 1.7, cible: [0, 15, -70] },
        texte: 'Après une douche (75 %), l’air est chargé de vapeur. La tresse en absorbe et s’allonge. Elle tire moins sur le levier : le ressort ouvre le volet.' },
      { titre: 'Volet ouvert : le débit monte', piece: 'volet', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['humidite', douche]],
        vue: { azimut: 82, elevation: 8, zoom: 1.4, cible: [0, 0, -105] },
        texte: 'Le passage est devenu large : beaucoup plus de grains passent. ' + air('repris', 'L’air extrait') + ' file vers la gaine, jusqu’à 45 m³/h.' },
      { titre: 'L’air redevient sec : la bouche se referme', piece: 'levier', voirDedans: true, eclate: false, ralenti: true, actions: [['marche', 'marche'], ['humidite', sec2]],
        vue: { azimut: 82, elevation: 8, zoom: 1.7, cible: [0, 15, -70] },
        texte: 'L’humidité redescend à 40 %. La tresse sèche et se raccourcit : elle tire le levier et ramène le volet presque fermé, en tendant le ressort. Le débit retombe.' }
    ];

    /* l'éclaté, dans l'ordre réel du démontage : la façade se clipse, le module du volet se retire par l'avant,
       la gaine se tire vers l'arrière ; le corps reste scellé dans le mur */
    const eclate = [
      { objets: [facade], vers: [0, 0, 270], debut: 0, fin: 0.5 },
      { objets: [module], vers: [0, 0, 185], debut: 0.2, fin: 0.8 },
      { objets: [gaine], vers: [0, 0, -90], debut: 0.35, fin: 0.95 }
    ];
    racine.traverse(o => { if (o.isMesh && (o.material === murMat)) o.userData.sansOmbre = true; });

    const vue = ctx.mode === 'comprendre'
      ? { azimut: 82, elevation: 8, zoom: 1.0, cadre: [facade, corps, manchette, gaine], marge: 0.85 }
      : { azimut: 24, elevation: 10, zoom: 0.9, cadre: [facade, corps, manchette, gaine], marge: 0.85 };

    return {
      racine, pieces, commandes, etapes, eclate, vue,
      sansSol: true,
      eclateVue: { azimut: 52, elevation: 16, zoom: 0.62, cible: [0, 0, 0] },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'humidite') { E.rh = K.clamp(+v, 30, 80); ctx.regler('humidite', E.rh); }
        visibles(); majTexte();
      },
      /* l'éclaté se regarde sur la bouche entière : on referme la coupe le temps de l'éclaté */
      surEclate(on) {
        E.demonte = on;
        if (on) { coupeAvant = E.coupe; fl = 0; if (E.coupe) basculerCoupe(false); } else if (coupeAvant) { coupeAvant = false; basculerCoupe(true); }
        voirFaces(); visibles();
      },
      animer(dt) {
        const cible = angleDe(E.rh);
        let bouge = false;
        if (Math.abs(theta - cible) > 0.0003) { theta = K.vers(theta, cible, 2.6, dt); if (Math.abs(theta - cible) < 0.0003) theta = cible; poserMeca(); bouge = true; }
        const veut = E.marche && !E.demonte ? 1 : 0;
        fl = K.vers(fl, veut, 4, dt);
        const q = debitDe(E.rh) / QMAX;
        if (fl > 0.01) { lignes.forEach(L => { if (L.objet.visible) { L.regler({ vitesse: 95 * fl * (0.6 + 0.4 * q) }); L.animer(dt); } }); }
        if (vapeur.objet.count > 0 && E.marche && !E.demonte) { vapeur.avancer(dt); bouge = true; }
        return bouge || fl > 0.01 || veut > 0;
      }
    };
  }, { famille: 'bouches', titre: 'La bouche d’extraction hygroréglable', stations: ['hygroreglable'] });
})();
