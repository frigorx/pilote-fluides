/* HydroMétro 3D — famille « echangeurs » : l'échangeur à plaques brasées inox.
   Unités : mm. Repère : X la largeur (primaire à gauche, secondaire à droite), Y la hauteur,
   Z la profondeur du paquet (+Z = la façade, avec les quatre piquages).
   Plaque 112 × 310, 13 plaques de 1 mm, 12 canaux de 5 mm (élargis pour la lecture), deux plaques de serrage de 6 mm.

   CE QUE L'ÉLÈVE DOIT VOIR : deux circuits qui ne se mélangent JAMAIS. Entre deux plaques, un canal ;
   un canal sur deux est au primaire, l'autre au secondaire. Les deux eaux vont en sens contraire
   (contre-courant) et la plaque d'inox est la paroi qui laisse passer la chaleur, jamais l'eau.

   « Voir en coupe » tranche l'appareil par un plan vertical qui passe par l'axe de deux piquages
   (le côté primaire, ou le côté secondaire selon l'étape) : on voit l'alternance des canaux, le
   collecteur qui alimente un canal sur deux, les collerettes qui bouchent l'autre, et l'eau dont la
   teinte suit la température (rouge → violet → bleu).
   L'éclaté est PÉDAGOGIQUE : l'appareil réel est brasé, il ne se démonte pas. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('echangeurPlaques', (T, K, ctx) => {
    const racine = new T.Group();
    const M = K.mat;

    /* ---------------------------------------------------------------- cotes */
    const W = 112, H = 310, RC4 = 4;            /* plaque : largeur, hauteur, rayon d'angle */
    const TP = 1.0, GAP = 5.0, PITCH = TP + GAP; /* plaque, canal, pas (canaux élargis : 12 canaux se lisent d'un coup d'œil) */
    const NPL = 13, NCH = NPL - 1;
    const PX = 30, PY = 118, RH = 11.5, RCOL = 16; /* piquages : entraxe, rayon de passage, collerette */
    const BORD = 5;                              /* largeur du bord fermé */
    const zP = j => (j - (NPL - 1) / 2) * PITCH;  /* centre de la plaque j */
    const ZAV = zP(NPL - 1) + TP / 2, ZAR = zP(0) - TP / 2; /* faces du paquet */
    const EPAIS = 6, ZSTUB = 18;                 /* plaques de serrage, longueur d'un piquage */
    const ROUGE = 0xd9472b, BLEU = 0x2f7fd6;
    const V = (x, y, z) => new T.Vector3(x, y, z);

    /* ---------------------------------------------------------------- matières à soi */
    const coupables = [];
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; coupables.push(c); return c; };
    const inoxStd = (couleur, rough, extra) => { const m = new T.MeshStandardMaterial(Object.assign({ color: couleur, metalness: 0.88, roughness: rough, side: T.DoubleSide }, extra || {})); coupables.push(m); return m; };
    /* les chevrons : un relief en arête de poisson, 10 chevrons par motif de 112 mm (le sommet au milieu de la plaque) */
    const texChevrons = inverse => {
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const x = c.getContext('2d'); x.fillStyle = '#7a7a7a'; x.fillRect(0, 0, 256, 256);
      const pas = 25.6, mont = 91;
      for (const [lw, col] of [[15, '#9c9c9c'], [7, '#f0f0f0']]) {
        x.lineWidth = lw; x.strokeStyle = col; x.lineJoin = 'round';
        for (let dy = -256; dy <= 256; dy += 256) for (let k = -4; k < 14; k++) {
          const y0 = k * pas + dy;
          x.beginPath();
          if (!inverse) { x.moveTo(-10, y0 + mont * 1.08); x.lineTo(128, y0); x.lineTo(266, y0 + mont * 1.08); }
          else { x.moveTo(-10, y0 - mont * 1.08); x.lineTo(128, y0); x.lineTo(266, y0 - mont * 1.08); }
          x.stroke();
        }
      }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(1 / 112, 1 / 112); t.offset.set(0.5, 0);
      t.anisotropy = 4; return t;
    };
    const plaqueMat = [false, true].map(inv => inoxStd(0xcdd2d7, 0.36, { bumpMap: texChevrons(inv), bumpScale: 2.2 }));
    const inoxEpais = inoxStd(0xb6bdc4, 0.34);
    const inoxFrame = inoxStd(0xc2c8ce, 0.4);
    const cuivre = C(M.cuivre, 0xc99a78);   /* la brasure : cuivre un peu terni, pour ne pas scintiller de loin */
    cuivre.roughnessMap = null; cuivre.roughness = 0.5; cuivre.metalness = 0.6;
    const zingue = C(M.zingue);
    const inoxCollerette = C(M.acierSombre, 0xaab1b8);

    /* ---------------------------------------------------------------- aides de géométrie */
    const ZAXE = g => { g.rotateX(Math.PI / 2); return g; };    /* axe Y → axe Z */
    const trous = (forme, r) => [[-PX, PY], [-PX, -PY], [PX, PY], [PX, -PY]].forEach(([x, y]) => {
      const p = new T.Path(); p.absarc(x, y, r, 0, Math.PI * 2, true); forme.holes.push(p);
    });
    const cadreRect = (forme, w, h) => { const p = new T.Path(); p.moveTo(-w / 2, -h / 2); p.lineTo(w / 2, -h / 2); p.lineTo(w / 2, h / 2); p.lineTo(-w / 2, h / 2); p.lineTo(-w / 2, -h / 2); forme.holes.push(p); return forme; };
    const extrusion = (forme, e, seg) => { const g = new T.ExtrudeGeometry(forme, { depth: e, bevelEnabled: false, curveSegments: seg || 8 }); g.translate(0, 0, -e / 2); g.computeVertexNormals(); return g; };

    const plaqueForme = () => { const f = K.formeArrondie(W, H, RC4); trous(f, RH); return f; };
    const geoPlaque = extrusion(plaqueForme(), TP, 12);
    /* le relief des chevrons ne doit couvrir que les deux faces : sur la tranche, les UV sont rendus constants (pas de moiré) */
    (() => { const uv = geoPlaque.attributes.uv, tr = geoPlaque.groups[1]; if (tr) for (let i = tr.start; i < tr.start + tr.count; i++) { const k = geoPlaque.index ? geoPlaque.index.getX(i) : i; uv.setXY(k, 0, 0); } })();
    const geoCadre = extrusion(cadreRect(K.formeArrondie(W, H, RC4), W - 2 * BORD, H - 2 * BORD), GAP, 3);
    const geoCordon = extrusion(cadreRect(K.formeArrondie(W + 0.5, H + 0.5, RC4), W - 12, H - 12), 0.3, 3);
    const geoCollerette = ZAXE(K.anneau(RCOL, RH, GAP, 20));
    const geoBrasureRond = (() => { const g = new T.RingGeometry(RH, RCOL + 0.4, 20, 1); return g; })();

    /* ================================================================ LE PAQUET DE PLAQUES */
    const paquet = new T.Group();
    const plaques = [], cadres = [], cordons = [], collerettes = [], groupesPlaque = [];
    for (let j = 0; j < NPL; j++) {
      const g = new T.Group(); g.position.z = zP(j);
      const p = K.mesh(geoPlaque, plaqueMat[j % 2]); g.add(p); plaques.push(p);
      if (j < NCH) {
        const cad = K.mesh(geoCadre, inoxFrame, 0, 0, TP / 2 + GAP / 2); g.add(cad); cadres.push(cad);
        const cor = K.mesh(geoCordon, cuivre, 0, 0, TP / 2 + 0.15); g.add(cor); cordons.push(cor);
        /* un canal sur deux est au primaire (j pair) : sa collerette bouche les piquages du SECONDAIRE ; l'autre, ceux du primaire */
        const xBouche = j % 2 === 0 ? PX : -PX;
        [PY, -PY].forEach(y => {
          const col = K.mesh(geoCollerette, inoxCollerette, xBouche, y, TP / 2 + GAP / 2); g.add(col); collerettes.push(col);
          const br = K.mesh(geoBrasureRond, cuivre, xBouche, y, TP / 2 + GAP - 0.02); g.add(br); cordons.push(br);
          const br2 = K.mesh(geoBrasureRond, cuivre, xBouche, y, TP / 2 + 0.02); g.add(br2); cordons.push(br2);
        });
      }
      paquet.add(g); groupesPlaque.push(g);
    }
    racine.add(paquet);

    /* ================================================================ LES PLAQUES DE SERRAGE ET LES PIQUAGES */
    const serrageAv = new T.Group(), serrageAr = new T.Group();
    const formeCouv = trou => { const f = K.formeArrondie(W - 1.6, H - 1.6, RC4 - 0.8); if (trou) trous(f, RH + 0.8); return f; };
    const couvAv = new T.Mesh(K.extrusion(formeCouv(true), EPAIS - 1.6, 0.8), inoxEpais); couvAv.position.z = ZAV + EPAIS / 2;
    const couvAr = new T.Mesh(K.extrusion(formeCouv(false), EPAIS - 1.6, 0.8), inoxEpais); couvAr.position.z = ZAR - EPAIS / 2;
    serrageAv.add(couvAv); serrageAr.add(couvAr);
    const ZF = ZAV + EPAIS;   /* face avant de la plaque de serrage */
    /* un piquage fileté : embase soudée, tube, filet (profil en dents de scie) */
    const profilStub = (() => {
      const p = [[RH, 0], [17, 0], [17, 3], [13.4, 3]];
      for (let i = 0; i < 6; i++) { const z = 5.2 + i * 1.8; p.push([13.4, z], [14.1, z + 0.9]); }
      p.push([13.4, 16.6], [12.8, ZSTUB], [RH, ZSTUB], [RH, 0]);
      return p.map(q => new T.Vector2(q[0], q[1]));
    })();
    const geoStub = (() => { const g = new T.LatheGeometry(profilStub, 28); ZAXE(g); return g; })();
    const stubs = { P1: null, P2: null, S1: null, S2: null };
    [['P1', -PX, PY], ['P2', -PX, -PY], ['S2', PX, PY], ['S1', PX, -PY]].forEach(([nom, x, y]) => {
      const s = K.mesh(geoStub, C(M.acier, 0xc3c9cf), x, y, ZF - 1.6 + 0);
      s.position.z = ZAV + EPAIS - 0.2; serrageAv.add(s); stubs[nom] = s;
      /* le repère gravé sur la plaque, du côté du milieu */
      const g = K.gravure(nom, 8.5, { couleur: '#2b3138' });
      g.position.set(x, y > 0 ? y - 29 : y + 29, ZAV + EPAIS + 0.06); serrageAv.add(g); stubs[nom + 'g'] = g;
    });
    /* les goujons de fixation, derrière */
    const goujons = new T.Group();
    [[-44, 138], [44, 138], [-44, -138], [44, -138]].forEach(([x, y]) => {
      const m = new T.Mesh(ZAXE(new T.CylinderGeometry(4, 4, 18, 14)), zingue); m.position.set(x, y, ZAR - EPAIS - 9 + 0.2); goujons.add(m);
    });
    serrageAr.add(goujons);
    racine.add(serrageAv, serrageAr);

    /* ================================================================ LES FACES DE COUPE
       Dessinées dans le plan x = ±PX, coordonnées (z, y). Le côté « -1 » passe par les piquages du
       primaire (on voit le côté droit du paquet, on regarde depuis +X) ; le côté « +1 » par ceux du
       secondaire (on regarde depuis -X). */
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshBasicMaterial({ map: t, side: T.DoubleSide, toneMapped: false });
    };
    const uni = couleur => new T.MeshBasicMaterial({ color: couleur, side: T.DoubleSide, toneMapped: false });
    const HM = { inox: hachures('#aab2ba', '#3f474f', 3.2), mince: uni(0x46505a) };
    const XC = s => s * PX;
    const rect = (z0, z1, y0, y1) => [[z0, y0], [z1, y0], [z1, y1], [z0, y1]];
    const plan = (polys, mat, off, groupe, s) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const pos = g.attributes.position, nor = g.attributes.normal;
      for (let i = 0; i < pos.count; i++) { const z = pos.getX(i), y = pos.getY(i); pos.setXYZ(i, XC(s) - s * off, y, z); nor.setXYZ(i, -s, 0, 0); }
      const m = new T.Mesh(g, mat); m.userData.sansOmbre = true; m.castShadow = false; groupe.add(m); return m;
    };
    /* des segments de plaque, sans les trous des deux piquages */
    const segHoles = (z0, z1) => [rect(z0, z1, -H / 2, -PY - RH), rect(z0, z1, -PY + RH, PY - RH), rect(z0, z1, PY + RH, H / 2)];
    /* la couleur de l'eau : chaque circuit garde sa famille (primaire rouge, secondaire bleu) et vire au violet
       quand sa température se rapproche de celle de l'autre : le primaire en se refroidissant, le secondaire en se réchauffant */
    const cBleu = new T.Color(BLEU), cRouge = new T.Color(ROUGE), cViolet = new T.Color(0x7a4fb8), cBlanc = new T.Color(0xffffff);
    const couleurT = (circuit, t, pastel) => {
      const c = circuit === 'p' ? cRouge.clone().lerp(cViolet, K.clamp((80 - t) / 40, 0, 1) * 0.72)
                                : cBleu.clone().lerp(cViolet, K.clamp((t - 40) / 40, 0, 1) * 0.72);
      if (pastel) c.lerp(cBlanc, pastel); return c;
    };

    const cotes = {}, eaux = [], piecesPrim = [], piecesSec = [];
    const eauMesh = (s, segments, circuit, groupe, off) => {
      /* des bandes horizontales (en y) dont la couleur suit la température */
      const n = segments.length, pos = new Float32Array(n * 12), col = new Float32Array(n * 12), idx = [];
      segments.forEach(([z0, z1, ya, yb], i) => {
        const x = XC(s) - s * off;
        pos.set([x, ya, z0, x, ya, z1, x, yb, z1, x, yb, z0], i * 12);
        idx.push(i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3);
      });
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.BufferAttribute(pos, 3)); g.setAttribute('color', new T.BufferAttribute(col, 3)); g.setIndex(idx);
      const m = new T.Mesh(g, new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide, toneMapped: false }));
      m.userData.sansOmbre = true; m.castShadow = false; groupe.add(m);
      const e = { mesh: m, circuit, maj(fT) {
        segments.forEach(([z0, z1, ya, yb], i) => {
          const a = couleurT(circuit, fT(ya), 0.3), b = couleurT(circuit, fT(yb), 0.3);
          col.set([a.r, a.g, a.b, a.r, a.g, a.b, b.r, b.g, b.b, b.r, b.g, b.b], i * 12);
        });
        g.attributes.color.needsUpdate = true;
      } };
      eaux.push(e);
      /* un voile transparent par-dessus : c'est lui qui s'allume (orange) sans fausser la couleur de l'eau */
      const ov = new T.Mesh(g, new T.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
      ov.position.x = -s * 0.03; ov.userData.voile = true; ov.userData.sansOmbre = true; ov.castShadow = false; groupe.add(ov);
      (circuit === 'p' ? piecesPrim : piecesSec).push(ov); return e;
    };
    /* les repères en y : tous les 10 mm, plus les bords des collerettes */
    const YS = (() => { const a = new Set([-RCOL - PY, RCOL - PY, PY - RCOL, PY + RCOL]); for (let y = -150; y <= 150; y += 10) a.add(y); return [...a].sort((p, q) => p - q); })();

    [-1, 1].forEach(s => {
      const groupe = new T.Group(); groupe.visible = false; faces.add(groupe);
      /* le circuit qui a ses piquages de ce côté : primaire (côté -1) ou secondaire (côté +1) */
      const circA = s < 0 ? 'p' : 's', parA = s < 0 ? 0 : 1;   /* canaux de ce circuit : j % 2 === parA */
      /* --- le métal en coupe --- */
      const mince = [], epais = [];
      for (let j = 0; j < NPL; j++) segHoles(zP(j) - TP / 2, zP(j) + TP / 2).forEach(p => mince.push(p));
      for (let j = 0; j < NCH; j++) {
        const z0 = zP(j) + TP / 2, z1 = zP(j + 1) - TP / 2;
        mince.push(rect(z0, z1, H / 2 - BORD, H / 2), rect(z0, z1, -H / 2, -H / 2 + BORD));
        /* la collerette n'est coupée que dans les canaux de l'AUTRE circuit (elle bouche leur entrée) */
        if (j % 2 !== parA) [PY, -PY].forEach(y => { epais.push(rect(z0, z1, y + RH, y + RCOL), rect(z0, z1, y - RCOL, y - RH)); });
      }
      segHoles(ZAV, ZAV + EPAIS).forEach(p => epais.push(p));
      epais.push(rect(ZAR - EPAIS, ZAR, -H / 2, H / 2));
      [PY, -PY].forEach(y => {
        epais.push(rect(ZAV + EPAIS, ZAV + EPAIS + ZSTUB, y + RH, y + 13.4), rect(ZAV + EPAIS, ZAV + EPAIS + ZSTUB, y - 13.4, y - RH));
        epais.push(rect(ZAV + EPAIS, ZAV + EPAIS + 3, y + 13.4, y + 17), rect(ZAV + EPAIS, ZAV + EPAIS + 3, y - 17, y - 13.4));
      });
      plan(mince, HM.mince, 0.12, groupe, s); plan(epais, HM.inox, 0.14, groupe, s);
      /* --- l'eau --- */
      const zFin = ZAV + EPAIS + ZSTUB - 0.2;
      [PY, -PY].forEach(y => eauMesh(s, [[ZAR, zFin, y - RH, y + RH]], circA, groupe, 0.04));
      for (let j = 0; j < NCH; j++) {
        const z0 = zP(j) + TP / 2, z1 = zP(j + 1) - TP / 2, circ = j % 2 === parA ? circA : (circA === 'p' ? 's' : 'p');
        const segs = [];
        for (let k = 0; k < YS.length - 1; k++) {
          const ya = YS[k], yb = YS[k + 1], ym = (ya + yb) / 2;
          if (yb > 150 || ya < -150) continue;
          const bouche = j % 2 !== parA && Math.abs(ym) > PY - RCOL && Math.abs(ym) < PY + RCOL;
          if (!bouche) segs.push([z0, z1, ya, yb]);
        }
        eauMesh(s, segs, circ, groupe, 0.08);
      }
      cotes[s] = { groupe, circA, parA };
    });

    /* ================================================================ L'EAU QUI CIRCULE
       Chaque grain prend la couleur de la température là où il se trouve. */
    const ico = new T.IcosahedronGeometry(2.1, 0);
    const fondu = u => { const f = a => { const t = K.clamp(a / 0.06, 0, 1); return t * t * (3 - 2 * t); }; return f(u) * f(1 - u); };
    const ruisseau = (courbe, circuit) => {
      const L = courbe.getLength(), N = Math.max(5, Math.round(L / 34));
      const pts = courbe.getSpacedPoints(Math.max(40, Math.round(L / 3)));
      const im = new T.InstancedMesh(ico, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), N);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3(), col = new T.Color();
      const et = { s: 0, sens: 1, fT: () => 60 };
      const poser = () => {
        for (let i = 0; i < N; i++) {
          let u = (i / N + et.s / L) % 1; if (u < 0) u += 1;
          const f = u * (pts.length - 1), a = Math.floor(f), b = Math.min(a + 1, pts.length - 1);
          p.lerpVectors(pts[a], pts[b], f - a);
          sc.setScalar(fondu(u)); m4.compose(p, q, sc); im.setMatrixAt(i, m4);
          im.setColorAt(i, col.copy(couleurT(circuit, et.fT(p.y), 0)));
        }
        im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true;
      };
      poser();
      return { objet: im, regler(o) { Object.assign(et, o); poser(); }, avancer(dt, v) { et.s += dt * v * et.sens; poser(); } };
    };
    /* le trajet d'un canal du circuit « de ce côté » : du piquage d'entrée à celui de sortie, en passant par le collecteur */
    const trajetA = (s, zc) => {
      const xg = XC(s) - s * 0.3, dir = s < 0 ? 1 : -1;   /* primaire : de haut en bas ; secondaire : de bas en haut */
      const yIn = dir * PY, yOut = -yIn, zE = ZAV + EPAIS + ZSTUB + 3;
      const c = new T.CurvePath();
      c.add(new T.LineCurve3(V(xg, yIn, zE), V(xg, yIn, zc + 9)));
      c.add(new T.QuadraticBezierCurve3(V(xg, yIn, zc + 9), V(xg, yIn, zc), V(xg, yIn - dir * 9, zc)));
      c.add(new T.LineCurve3(V(xg, yIn - dir * 9, zc), V(xg, yOut + dir * 9, zc)));
      c.add(new T.QuadraticBezierCurve3(V(xg, yOut + dir * 9, zc), V(xg, yOut, zc), V(xg, yOut, zc + 9)));
      c.add(new T.LineCurve3(V(xg, yOut, zc + 9), V(xg, yOut, zE)));
      return c;
    };
    /* un canal de l'autre circuit, vu au même plan : il va de bout en bout, bouché par les collerettes */
    const trajetB = (s, zc) => {
      const xg = XC(s) - s * 0.3, haut = s > 0;   /* côté +1 : l'autre circuit est le primaire (de haut en bas) */
      return new T.LineCurve3(V(xg, haut ? 98 : -98, zc), V(xg, haut ? -98 : 98, zc));
    };
    const flotsDe = {};
    [-1, 1].forEach(s => {
      const g = cotes[s], A = [], B = [];
      for (let j = 0; j < NCH; j++) {
        const zc = zP(j) + PITCH / 2, f = ruisseau(j % 2 === g.parA ? trajetA(s, zc) : trajetB(s, zc), j % 2 === g.parA ? g.circA : (g.circA === 'p' ? 's' : 'p'));
        g.groupe.add(f.objet); (j % 2 === g.parA ? A : B).push(f);
              }
      flotsDe[s] = { A, B };
    });

    /* les flèches de chaleur qui traversent chaque plaque : du canal chaud vers le canal froid */
    const geoFleche = ZAXE(new T.ConeGeometry(2.6, 10, 8));
    const matFleche = new T.MeshBasicMaterial({ color: 0xff7a14, toneMapped: false });
    const NLIGNES = 3;   /* cinq flèches par plaque, décalées d'une plaque à l'autre pour ne pas former une ligne */
    const yFleche = (j, k) => -96 + ((k * 66 + j * 29) % 200);
    const fleches = {};
    [-1, 1].forEach(s => {
      const n = (NPL - 2) * NLIGNES, im = new T.InstancedMesh(geoFleche, matFleche, n);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false; im.visible = false;
      cotes[s].groupe.add(im); fleches[s] = im;
    });
    const qAvant = new T.Quaternion(), qArriere = new T.Quaternion().setFromAxisAngle(V(0, 1, 0), Math.PI);
    const poserFleches = (fT_p, fT_s, pulse) => {
      [-1, 1].forEach(s => {
        const im = fleches[s], m4 = new T.Matrix4(), sc = new T.Vector3(); let i = 0;
        for (let j = 1; j < NPL - 1; j++) for (let k = 0; k < NLIGNES; k++) {
          const y = yFleche(j, k);
          /* le canal j est celui de devant : s'il est au primaire (j pair), la chaleur va vers l'arrière */
          const q = j % 2 === 0 ? qArriere : qAvant;
          const taille = K.clamp((fT_p(y) - fT_s(y)) / 20, 0.15, 1) * (1 + 0.12 * Math.sin(pulse * 5 + j * 0.7));
          sc.setScalar(taille);
          m4.compose(V(XC(s) - s * 0.8, y, zP(j)), q, sc); im.setMatrixAt(i++, m4);
        }
        im.instanceMatrix.needsUpdate = true;
      });
    };

    /* ================================================================ L'ÉTAT */
    const E = { marche: true, circuits: 'deux', sens: 'contre', coupe: false, demonte: false, cote: -1 };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const U = y => K.clamp((150 - y) / 300, 0, 1);
    /* un exemple chiffré : primaire 80 °C, secondaire 40 °C, mêmes débits, surface d'échange identique */
    const profil = () => {
      if (!E.marche || E.circuits === 'primaire') return { p: () => 80, s: () => 40, T2: 80, T4: 40 };
      if (E.sens === 'contre') return { p: y => 80 - 32 * U(y), s: y => 72 - 32 * U(y), T2: 48, T4: 72 };
      return { p: y => 60 + 20 * Math.exp(-8 * U(y)), s: y => 60 - 20 * Math.exp(-8 * U(y)), T2: 60, T4: 60 };
    };
    const majTexte = () => {
      const pr = profil();
      ctx.mesures([
        { libelle: 'T1 · entrée primaire', valeur: '80 °C' },
        { libelle: 'T2 · sortie primaire', valeur: E.marche ? nb(pr.T2, 0) + ' °C' : '—' },
        { libelle: 'T3 · entrée secondaire', valeur: '40 °C' },
        { libelle: 'T4 · sortie secondaire', valeur: E.marche ? nb(pr.T4, 0) + ' °C' : '—' }
      ]);
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> Les deux circuits sont pleins d’eau, mais rien ne bouge. Le primaire est chaud (rouge), le secondaire est froid (bleu).'); return; }
      if (E.circuits === 'primaire') { ctx.dire('<strong>Le primaire seul.</strong> L’eau chaude traverse l’échangeur et ressort aussi chaude qu’elle est entrée : T2 = 80 °C. Le secondaire est à l’arrêt, personne n’emporte la chaleur.'); return; }
      if (E.sens === 'contre') ctx.dire('<strong>Les deux circuits, à contre-courant.</strong> Le primaire descend et se refroidit : il ressort à 48 °C. Le secondaire monte et se réchauffe : il ressort à 72 °C. Les deux eaux ne se mélangent jamais.');
      else ctx.dire('<strong>Même sens (raccords inversés).</strong> Les deux eaux descendent ensemble et se rejoignent vite, vers 60 °C : la fin du paquet ne sert presque plus. À contre-courant, le secondaire sort à 72 °C.');
    };
    const maj = () => {
      const pr = profil();
      const visible = E.coupe && !E.demonte, roule = visible && E.marche, deux = roule && E.circuits === 'deux';
      eaux.forEach(e => e.maj(e.circuit === 'p' ? pr.p : pr.s));
      const sensSec = E.sens === 'contre' ? 1 : -1;
      [-1, 1].forEach(s => {
        const c = cotes[s], f = flotsDe[s], ici = visible && E.cote === s;
        c.groupe.visible = ici;
        const prim = s < 0 ? f.A : f.B, sec = s < 0 ? f.B : f.A;
        prim.forEach(x => { x.objet.visible = ici && roule; x.regler({ fT: pr.p, sens: 1 }); });
        sec.forEach(x => { x.objet.visible = ici && deux; x.regler({ fT: pr.s, sens: sensSec }); });
        fleches[s].visible = ici && deux;
      });
      if (deux) poserFleches(pr.p, pr.s, 0);
      majTexte();
    };
    const plansCoupe = { '-1': new T.Plane(new T.Vector3(-1, 0, 0), -PX), '1': new T.Plane(new T.Vector3(1, 0, 0), -PX) };
    const exclus = new Set(); faces.traverse(o => exclus.add(o));
    const appliquerCoupe = () => {
      const plan = E.coupe && !E.demonte ? [plansCoupe[E.cote]] : null;
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = E.coupe && !E.demonte;
      maj();
    };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(); };
    maj();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'serrage', nom: 'Les plaques de serrage', ancre: [-PX, -140, ZAV + 3], objets: [couvAv, couvAr, goujons], desc: 'Deux plaques épaisses en inox, une devant, une derrière. Elles encadrent le paquet et le tiennent. Les quatre piquages sont soudés sur celle de devant ; quatre goujons, derrière, servent à fixer l’appareil.' },
      { id: 'paquet', nom: 'Le paquet de plaques', ancre: [-PX, 60, zP(12)], objets: [...plaques, ...cadres], desc: 'Des plaques d’inox très minces, empilées. Chacune porte des chevrons : ils brassent l’eau et améliorent l’échange. Entre deux plaques, il y a un canal d’à peine deux millimètres.' },
      { id: 'piqPrim', nom: 'Les piquages du primaire (P1, P2)', ancre: [-PX, PY, ZAV + EPAIS + 12], objets: [stubs.P1, stubs.P2], desc: 'Deux raccords filetés, à gauche. P1, en haut : l’eau chaude entre. P2, en bas : elle ressort refroidie.' },
      { id: 'piqSec', nom: 'Les piquages du secondaire (S1, S2)', ancre: [PX, -PY, ZAV + EPAIS + 12], objets: [stubs.S1, stubs.S2], desc: 'Deux raccords filetés, à droite. S1, en bas : l’eau à chauffer entre. S2, en haut : elle ressort réchauffée.' },
      { id: 'collerettes', nom: 'Les collerettes', ancre: [-PX, PY + 14, zP(3) + PITCH / 2], objets: collerettes, desc: 'Un anneau autour d’un piquage, dans un canal sur deux. Il bouche l’entrée : l’eau d’un circuit ne peut pas entrer dans le canal de l’autre.' },
      { id: 'brasure', nom: 'La brasure', ancre: [0, H / 2 - 2, zP(18) + PITCH / 2], objets: cordons, desc: 'Du cuivre fondu qui soude les plaques entre elles, sur le bord et autour des piquages. L’appareil forme un seul bloc, sans joint : il ne se démonte pas.' },
      { id: 'primaire', nom: 'Le circuit primaire (eau chaude)', ancre: [-PX, 70, zP(6) + PITCH / 2], objets: piecesPrim, desc: 'Un canal sur deux. L’eau chaude entre en haut à gauche, descend entre les plaques et ressort en bas à gauche.' },
      { id: 'secondaire', nom: 'Le circuit secondaire (eau à chauffer)', ancre: [-PX, -70, zP(9) + PITCH / 2], objets: piecesSec, desc: 'L’autre canal sur deux. L’eau entre en bas à droite, monte et ressort en haut à droite : elle va dans le sens contraire du primaire.' }
    ];

    /* ---------------------------------------------------------------- commandes : les mots de la station */
    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'À l’arrêt'], ['marche', 'Lancer l’échange']], valeur: 'marche' },
      { id: 'circuits', type: 'choix', options: [['primaire', 'Primaire seul'], ['deux', 'Les deux circuits']], valeur: 'deux' },
      { id: 'sens', type: 'choix', options: [['contre', 'Contre-courant'], ['meme', 'Même sens (raccords inversés)']], valeur: 'contre' }
    ];

    const vueCoupe = { azimut: 76, elevation: 10 };
    const etapes = [
      { titre: 'L’échangeur, tel qu’on le pose', piece: 'piqPrim', voirDedans: false, eclate: false, actions: [['marche', 'arret'], ['circuits', 'deux'], ['sens', 'contre']],
        vue: { azimut: 30, elevation: 14, zoom: 1.0, cible: null },
        texte: 'Des plaques d’inox serrées entre deux plaques épaisses. Quatre piquages filetés devant : deux pour le primaire, deux pour le secondaire.' },
      { titre: 'On le coupe : un canal sur deux', piece: 'paquet', voirDedans: true, eclate: false, actions: [['cote', -1], ['marche', 'arret'], ['circuits', 'deux'], ['sens', 'contre']],
        vue: { azimut: 76, elevation: 10, zoom: 2.3, cible: [-30, 96, 6] },
        texte: 'Entre deux plaques, un canal. Un canal sur deux est pour le primaire (rouge), l’autre pour le secondaire (bleu). Les deux eaux ne se touchent jamais.' },
      { titre: 'Le primaire entre en haut et se partage', piece: 'primaire', voirDedans: true, eclate: false, actions: [['cote', -1], ['circuits', 'primaire'], ['sens', 'contre'], ['marche', 'marche']],
        vue: { azimut: 68, elevation: 8, zoom: 1.0, cible: [-30, 0, 10] },
        texte: 'L’eau chaude entre par P1, se partage entre les canaux rouges et descend jusqu’à P2. Les collerettes l’empêchent d’entrer dans les canaux bleus.' },
      { titre: 'Le secondaire monte, en sens contraire', piece: 'secondaire', voirDedans: true, eclate: false, actions: [['cote', 1], ['circuits', 'deux'], ['sens', 'contre'], ['marche', 'marche']],
        vue: { azimut: -68, elevation: 8, zoom: 1.0, cible: [30, 0, 10] },
        texte: 'L’eau à chauffer entre par S1, monte dans les canaux bleus et sort par S2. Elle va dans le sens contraire du primaire : c’est le contre-courant.' },
      { titre: 'La chaleur traverse la plaque', piece: 'paquet', voirDedans: true, eclate: false, actions: [['cote', -1], ['circuits', 'deux'], ['sens', 'contre'], ['marche', 'marche']],
        vue: { azimut: 68, elevation: 8, zoom: 1.0, cible: [-30, 0, 10] },
        texte: 'La plaque d’inox est la paroi : la chaleur la traverse, l’eau jamais. Le primaire se refroidit en descendant, le secondaire se réchauffe en montant.' },
      { titre: 'Éclaté : les plaques écartées', piece: 'collerettes', voirDedans: false, eclate: true, actions: [['marche', 'arret']],
        texte: 'L’appareil réel est brasé : on ne peut pas séparer les plaques. Ici, on les écarte pour voir les chevrons de chaque plaque et les collerettes.' }
    ];

    /* l'éclaté : chaque plaque s'écarte de la précédente (7 mm de plus à chaque rang) ; la plaque de serrage avant part la première */
    const D7 = 9;
    const eclate = [
      { objets: [serrageAv], vers: [0, 0, NPL * D7 + 22], debut: 0, fin: 0.75 },
      ...groupesPlaque.map((g, j) => ({ objets: [g], vers: [0, 0, (j + 1) * D7], debut: 0.2 + (NPL - 1 - j) * 0.008, fin: 1 }))
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 50, elevation: 18, zoom: 0.56, cible: [0, 0, 110] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 30, elevation: 14, cadre: [paquet, serrageAv, serrageAr], marge: 1.0 }
                                    : { azimut: 62, elevation: 14, zoom: 1.2, cadre: [paquet, serrageAv, serrageAr], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'cote') { E.cote = +v < 0 ? -1 : 1; appliquerCoupe(); return; }
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'circuits') { E.circuits = v; ctx.regler('circuits', v); }
        if (id === 'sens') { E.sens = v; ctx.regler('sens', v); }
        maj();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(); },
      animer(dt, t) {
        if (!(E.coupe && !E.demonte && E.marche)) return false;
        const f = flotsDe[E.cote], V0 = 46;
        (E.cote < 0 ? f.A : f.B).forEach(x => x.avancer(dt, V0));
        if (E.circuits === 'deux') {
          (E.cote < 0 ? f.B : f.A).forEach(x => x.avancer(dt, V0));
          const pr = profil(); poserFleches(pr.p, pr.s, t || 0);
        }
        return true;
      }
    };
  }, { famille: 'echangeurs', titre: 'L’échangeur à plaques brasées', stations: ['echangeur'] });
})();
