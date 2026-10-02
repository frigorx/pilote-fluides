/* HydroMétro 3D — famille « vannes » : la vanne trois voies mélangeuse à secteur, la vanne d'équilibrage.
   Unités : mm. Y vers le haut.

   ── vanne3voies ───────────────────────────────────────────────────────────────────────────
   Repère : l'axe du boisseau est l'axe Y ; les trois raccords sont dans le plan horizontal y = 0 :
   A à gauche (-X), AB à droite (+X), B vers l'avant (+Z) — vue de dessus, c'est le dessin de la station
   (A à gauche, B en bas, AB à droite). Le servomoteur est au-dessus.

   CE QUE L'ÉLÈVE DOIT VOIR : le boisseau est un SECTEUR de cylindre (90°) qui tourne autour de l'axe.
   Il masque A, ou B, ou un peu des deux. Ce qu'il découvre de A s'ajoute à ce qu'il masque de B :
   la somme des deux ouvertures reste égale à 1, donc le débit qui sort par AB ne change pas, seule
   sa température change. Les ouvertures, les trajets de l'eau et la couleur du mélange sont CALCULÉS
   à partir de l'angle réel du secteur (rien n'est truqué à la main).
   Le secteur dépasse chaque raccord de 24° environ : c'est la « course morte » d'une vraie vanne
   (de 0 à 27 % et de 73 à 100 %, la même voie reste seule ouverte).

   « Voir en coupe » tranche tout par le plan des trois raccords : faces hachurées comme sur un
   dessin de définition, l'eau est teintée (chaude rouge, froide bleue, mélange intermédiaire). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  const D = Math.PI / 180;
  const ROUGE = 0xd9472b, BLEU = 0x2f7fd6;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ================================================================ aides communes à la famille
     (recopiées de pompes.js : matières propres double face, hachures, faces de coupe) */
  const aides = (T, K) => {
    const A = {};
    const D = Math.PI / 180;
    A.C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    A.hachures = (fond, trait, pas) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    A.uni = (couleur, extra) => new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: 0.6, side: T.DoubleSide }, extra || {}));
    A.eau = couleur => new T.MeshStandardMaterial({ color: couleur, roughness: 0.3, transparent: true, opacity: 0.8, depthWrite: false, side: T.DoubleSide });
    /* l'écrou à six pans : plats dessus et dessous, sommets de côté ; axe +X, de x0 à x0 + L */
    A.hexa = (RH, rInt, x0, L, mat) => {
      const s = new T.Shape();
      for (let k = 0; k < 6; k++) { const a = k * 60 * D; k ? s.lineTo(RH * Math.cos(a), RH * Math.sin(a)) : s.moveTo(RH * Math.cos(a), RH * Math.sin(a)); }
      const h = new T.Path(); h.absarc(0, 0, rInt, 0, Math.PI * 2, true); s.holes.push(h);
      const g = new T.ExtrudeGeometry(s, { depth: L, bevelEnabled: false, curveSegments: 20 });
      g.rotateY(Math.PI / 2); g.translate(x0, 0, 0);
      return new T.Mesh(g, mat);
    };
    /* l'eau qui circule : des grains qui avancent sur un trajet. Un grain n'est visible que si son
       rang (suite de van der Corput) est sous la part de débit de sa voie : la part change sans
       à-coup et les grains restent bien répartis. coul(p, co) règle la couleur du grain placé en p. */
    const rang = i => { let r = 0, f = 0.5, n = i + 1; while (n > 0) { if (n & 1) r += f; n >>= 1; f /= 2; } return r; };
    A.flux = (nombre, vitesse, coul) => {
      const im = new T.InstancedMesh(new T.SphereGeometry(2.3, 8, 6), new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), nombre);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
      const rg = [], co = new T.Color(), m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
      for (let i = 0; i < nombre; i++) { rg.push(rang(i)); im.setColorAt(i, co); }
      const E = { courbe: null, L: 1, s: 0, part: 1, v: vitesse, tab: null };
      /* zones : [{ u0, u1, k }] — sur ce bout du trajet (fractions de longueur) l'eau va k fois plus vite
         (un passage rétréci) ; sans zones, vitesse uniforme comme avant. trajet(pts, fr => zones) : la
         fonction reçoit fraction(point) pour placer la zone sur la courbe construite */
      const versU = phi => {
        if (!E.tab) return phi;
        const N = E.tab.length - 1; let a = 0, b = N;
        while (b - a > 1) { const m = (a + b) >> 1; if (E.tab[m] <= phi) a = m; else b = m; }
        return (a + (phi - E.tab[a]) / Math.max(1e-9, E.tab[a + 1] - E.tab[a])) / N;
      };
      /* la fraction de longueur du trajet la plus proche d'un point (pour placer une zone) */
      const fraction = pt => {
        let m = 0, d = 1e9; const q2 = new T.Vector3();
        for (let j = 0; j <= 200; j++) { E.courbe.getPointAt(j / 200, q2); const dd = q2.distanceToSquared(pt); if (dd < d) { d = dd; m = j / 200; } }
        return m;
      };
      const poser = () => {
        if (!E.courbe) return;
        for (let i = 0; i < nombre; i++) {
          let u = (i / nombre + E.s / E.L) % 1; if (u < 0) u += 1;
          E.courbe.getPointAt(versU(u), p);
          sc.setScalar(clamp((E.part - rg[i]) / 0.08, 0, 1)); m4.compose(p, q, sc); im.setMatrixAt(i, m4);
          coul(p, co); im.setColorAt(i, co);
        }
        im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true;
      };
      return {
        objet: im,
        trajet(pts, zones) {
          E.courbe = new T.CatmullRomCurve3(pts, false, 'centripetal'); E.L = E.courbe.getLength();
          E.tab = null;
          if (typeof zones === 'function') zones = zones(fraction);
          if (zones && zones.length) {
            const N = 96, tab = [0];
            for (let j = 0; j < N; j++) {
              const um = (j + 0.5) / N; let k = 1; zones.forEach(z => { if (um >= z.u0 && um <= z.u1) k = z.k; });
              tab.push(tab[j] + 1 / k);
            }
            E.tab = tab.map(x => x / tab[N]);
          }
          poser();
        },
        regler(part) { E.part = part; poser(); },
        vitesse(v) { E.v = v; },
        animer(dt) { E.s += dt * E.v; poser(); }
      };
    };
    return A;
  };

  /* ================================================================ LA VANNE TROIS VOIES */
  Electro3D.definir('vanne3voies', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K);
    const C = A.C;
    const racine = new T.Group();

    /* ---------------------------------------------------------------- matières */
    const laiton = C(M.laiton, 0xd9bb68);               /* le corps */
    const cuivre = C(M.cuivre);                          /* les tubes de l'installation */
    const inox = C(M.acier, 0xd5dade);                   /* le boisseau */
    const noir = C(M.plastiqueNoir);
    const sombre = C(M.plastiqueSombre);
    const marine = C(M.plastiqueMarine);
    const blanc = C(M.plastiqueBlanc);
    const orange = C(M.plastiqueOrange);
    const zingue = C(M.zingue);
    const bagueRouge = C(M.plastiqueRouge, ROUGE), bagueBleue = C(M.plastiqueBleu, BLEU);

    /* ---------------------------------------------------------------- géométrie
       Les formes à plat (arcs, disques) sont décrites par des polygones dans le plan (x, z) : le même
       polygone sert au solide ET à sa face de coupe hachurée, ils coïncident au micron. */
    const pol = (r, th) => [r * Math.cos(th * D), r * Math.sin(th * D)];
    const arc = (r0, r1, th0, th1) => {
      const n = Math.max(2, Math.ceil((th1 - th0) / 3)), p = [];
      for (let i = 0; i <= n; i++) p.push(pol(r1, th0 + (th1 - th0) * i / n));
      for (let i = n; i >= 0; i--) p.push(pol(r0, th0 + (th1 - th0) * i / n));
      return p;
    };
    const disque = (r, n) => { const p = []; for (let i = 0; i < (n || 40); i++) p.push(pol(r, i * 360 / (n || 40))); return p; };
    const surPort = (th, u0, u1, v0, v1) => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]].map(([u, v]) => {
      const c = Math.cos(th * D), s = Math.sin(th * D); return [u * c - v * s, u * s + v * c];
    });
    /* un solide vertical dont la section est un polygone (x, z), de y0 à y1 */
    const solideY = (poly, y0, y1, mat) => {
      const g = new T.ExtrudeGeometry(new T.Shape(poly.map(q => new T.Vector2(q[0], -q[1]))), { depth: y1 - y0, bevelEnabled: false });
      g.rotateX(-Math.PI / 2); g.translate(0, y0, 0);
      return new T.Mesh(g, mat);
    };
    const surX = (g, x) => { g.rotateZ(Math.PI / 2); g.translate(x, 0, 0); return g; };
    const anneauX = (rExt, rInt, x0, x1, mat, seg) => new T.Mesh(surX(K.anneau(rExt, rInt, x1 - x0, seg || 40), (x0 + x1) / 2), mat);
    /* l'écrou à six pans du raccord : plats dessus et dessous, sommets de côté */
    const RH = 19.6;
    const hexa = (x0, L, mat) => A.hexa(RH, 10, x0, L, mat);

    const RC = 28, RO = 36, RB = 10;                               /* chambre, extérieur, alésage des raccords */
    const TB = Math.asin(RB / RC) / D;                              /* demi-largeur angulaire d'un raccord, vue du centre */
    const TUBE = 112;                                               /* longueur visible des tubes depuis l'axe */
    const PORTS = { A: 180, B: 90, AB: 0 };                         /* angle polaire du raccord : x = cos, z = sin */

    /* ================================================================ LE CORPS */
    const corpsG = new T.Group();
    [[TB, 90 - TB], [90 + TB, 180 - TB], [180 + TB, 360 - TB]].forEach(([a, b]) => corpsG.add(solideY(arc(RC, RO, a, b), -30, 30, laiton)));
    corpsG.add(K.mesh(K.cylindre(RO, 4, 56), laiton, 0, -28, 0));   /* le fond */
    racine.add(corpsG);

    /* un raccord : bossage du corps, écrou six pans, tube de cuivre, bague de repérage */
    const voie = (nom, th, bagues) => {
      const g = new T.Group(); g.rotation.y = -th * D;
      g.add(anneauX(16, RB, 26, 44, laiton));
      g.add(hexa(44, 12, laiton));
      g.add(anneauX(11, RB, 56, TUBE, cuivre));
      bagues.forEach(([mat, x0]) => g.add(anneauX(11.7, 10, x0, x0 + 6, mat, 28)));
      racine.add(g);
      return g;
    };
    const vA = voie('A', PORTS.A, [[bagueRouge, 78]]);
    const vB = voie('B', PORTS.B, [[bagueBleue, 78]]);
    const vAB = voie('AB', PORTS.AB, [[bagueRouge, 76], [bagueBleue, 83]]);
    /* les repères gravés sur le plat de chaque écrou, lisibles d'en haut */
    const graver = (txt, x, z) => {
      const g = K.gravure(txt, 7.5, { couleur: '#2b2410' });
      g.rotation.x = -Math.PI / 2; g.position.set(x, RH * Math.cos(30 * D) + 0.1, z); racine.add(g); return g;
    };
    const gA = graver('A', -50, 0), gB = graver('B', 0, 50), gAB = graver('AB', 50, 0);

    /* ================================================================ LE COUVERCLE */
    const couvercle = new T.Group();
    couvercle.add(K.mesh(K.anneau(RO, 5.6, 5, 56), laiton, 0, 32.5, 0));
    couvercle.add(K.mesh(K.anneau(20, 5.6, 13, 40), laiton, 0, 41.5, 0));
    for (let i = 0; i < 4; i++) {
      const a = (45 + i * 90) * D, v = K.vis(3.3, { croix: false, matiere: zingue });
      v.position.set(Math.cos(a) * 31.5, 35, Math.sin(a) * 31.5); couvercle.add(v);
    }
    racine.add(couvercle);

    /* ================================================================ LE BOISSEAU : un secteur de 90° */
    const boisseau = new T.Group();
    boisseau.add(solideY(arc(22.9, 27.4, 135, 225), -24, 24, inox));              /* la paroi : ce qui masque une voie (4,5 mm) */
    [[-24, -21], [21, 24]].forEach(([y0, y1]) => boisseau.add(solideY(arc(8, 27.4, 135, 225), y0, y1, inox)));   /* flasques */
    boisseau.add(K.mesh(K.cylindre(8, 3, 28), inox, 0, -22.5, 0), K.mesh(K.cylindre(8, 3, 28), inox, 0, 22.5, 0));
    boisseau.add(K.mesh(K.cylindre(5, 80, 24), inox, 0, 16, 0));                  /* l'axe, de -24 à 56 */
    racine.add(boisseau);

    /* ================================================================ LE SERVOMOTEUR */
    const servoG = new T.Group();
    const servoCorps = new T.Group();
    servoCorps.add(K.mesh(K.anneau(24, 5.6, 6, 40), noir, 0, 51, 0));
    servoCorps.add(K.mesh(K.boite(58, 30, 58, 6), sombre, 0, 69, 0));
    servoCorps.add(K.mesh(K.cylindre(27, 12, 48), marine, 0, 90, 0));
    [-1, 1].forEach(s => servoCorps.add(K.mesh(K.boite(5, 4, 18, 1), zingue, s * 25, 57, 0)));   /* les clips de fixation */
    const bouton = K.mesh(K.cylindre(6.5, 6, 28), marine, 0, 69, 32); bouton.rotation.x = Math.PI / 2; servoCorps.add(bouton);
    const presse = K.mesh(K.cylindre(5, 8, 24), noir, 0, 66, -33); presse.rotation.x = Math.PI / 2; servoCorps.add(presse);
    const cable = K.fil([[0, 66, -36], [0, 66, -48], [0, 58, -72], [0, 44, -96]], 3.2, K.plastique(0x8b9096, 0.55));
    servoCorps.add(cable.mesh);
    servoG.add(servoCorps);

    const cadran = new T.Group();
    cadran.add(K.mesh(K.cylindre(23, 1.2, 48), blanc, 0, 96.6, 0));
    for (let v = 0; v <= 10; v++) {
      const th = 180 - 9 * v, long = v % 5 === 0 ? 6 : 3.6, rc = 21.5 - long / 2;
      const t = K.mesh(new T.BoxGeometry(0.9, 0.4, long), noir, Math.cos(th * D) * rc, 97.4, Math.sin(th * D) * rc);
      t.rotation.y = (90 - th) * D; cadran.add(t);
    }
    [[0, '0'], [5, '5'], [10, '10']].forEach(([v, txt]) => {
      const th = (180 - 9 * v) * D, g = K.gravure(txt, 4, { couleur: '#1b2430' });
      g.rotation.x = -Math.PI / 2; g.position.set(Math.cos(th) * 11.5, 97.5, Math.sin(th) * 11.5); cadran.add(g);
    });
    servoG.add(cadran);
    const aiguille = new T.Group();
    const fl = new T.Shape();
    [[0, -1.5], [14, -1.5], [14, -3.4], [22, 0], [14, 3.4], [14, 1.5], [0, 1.5]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
    const pointe = new T.Mesh(K.extrusion(fl, 1.4, 0), orange);
    pointe.rotation.x = -Math.PI / 2; pointe.rotation.z = Math.PI;     /* à plat, tournée vers -X : le sens du secteur */
    pointe.position.y = 98.2;
    aiguille.add(pointe, K.mesh(K.cylindre(3.2, 2, 20), noir, 0, 99, 0));
    servoG.add(aiguille);
    racine.add(servoG);

    /* ================================================================ LES FACES DE COUPE
       Dessinées dans le plan y = 0 (coordonnées x, z), hachures à 45° comme sur un plan. */
    const H = {
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      inox: A.hachures('#2f3944', '#0d1217', 2.4),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceDe = (polys, mat, y, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.y = y; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      (groupe || faces).add(m); return m;
    };
    const facesCorps = new T.Group(); faces.add(facesCorps);
    faceDe([arc(RC, RO, TB, 90 - TB), arc(RC, RO, 90 + TB, 180 - TB), arc(RC, RO, 180 + TB, 360 - TB)], H.laiton, 0.03, facesCorps);
    const facesVoie = {};
    Object.keys(PORTS).forEach(n => {
      const th = PORTS[n], gr = facesVoie[n] = new T.Group(); faces.add(gr);
      faceDe([...[-1, 1].map(s => surPort(th, 26, 44, s * RB, s * 16)), ...[-1, 1].map(s => surPort(th, 44, 56, s * RB, s * RH))], H.laiton, 0.03, gr);
      faceDe([...[-1, 1].map(s => surPort(th, 56, TUBE, s * RB, s * 11))], H.cuivre, 0.03, gr);
    });
    const facesBoisseau = new T.Group(); faces.add(facesBoisseau);
    faceDe([arc(22.9, 27.4, 135, 225), disque(5, 24)], H.inox, 0.05, facesBoisseau);

    /* l'eau, en coupe : les trois tuyaux et la chambre ; le mélange change de couleur */
    const pale = (hex, k) => new T.Color(hex).lerp(new T.Color(0xffffff), k);
    const eauA = A.eau(pale(ROUGE, 0.12).getHex()), eauB = A.eau(pale(BLEU, 0.12).getHex());
    const eauMix = A.eau(pale(BLEU, 0.12).getHex());
    const facesEau = new T.Group(); faces.add(facesEau);
    faceDe([surPort(PORTS.A, 27.6, TUBE, -RB, RB)], eauA, -0.3, facesEau);
    faceDe([surPort(PORTS.B, 27.6, TUBE, -RB, RB)], eauB, -0.3, facesEau);
    faceDe([surPort(PORTS.AB, 27.6, TUBE, -RB, RB), disque(27.9, 56)], eauMix, -0.3, facesEau);

    /* ================================================================ L'EAU QUI CIRCULE
       Des grains qui avancent sur un trajet. Un grain n'est visible que si son rang (suite de
       van der Corput) est sous la part de débit de sa voie : la part change sans à-coup et les
       grains restent bien répartis. Couleur de chaque grain : celle de sa voie, qui vire au
       mélange quand il rejoint AB. */
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const cBase = { A: new T.Color(ROUGE), B: new T.Color(BLEU) }, cMix = new T.Color(BLEU);
    const virage = base => (p, co) => { const t = clamp((p.x - 4) / 24, 0, 1); co.copy(base).lerp(cMix, t * t * (3 - 2 * t)); };
    const fluxA = A.flux(36, 40, virage(cBase.A)), fluxB = A.flux(36, 40, virage(cBase.B));
    const flots = [fluxA, fluxB];
    flots.forEach(f => racine.add(f.objet));

    /* ================================================================ L'ÉTAT : l'angle réel du secteur gouverne tout */
    const E = { cible: 50, alpha: 45, coupe: false, demonte: false, transp: false };
    /* ouvertures de A et de B (0 à 1) d'après l'angle alpha (degrés, 0 = A masquée, 90 = B masquée) */
    const ouvertures = al => ({ a: clamp((al - 45 + TB) / (2 * TB), 0, 1), b: clamp((45 - al + TB) / (2 * TB), 0, 1) });
    const MOTS = p => p <= 0.05 ? 'froide' : p <= 0.35 ? 'plutôt froide' : p < 0.65 ? 'tiède' : p < 0.95 ? 'plutôt chaude' : 'chaude';
    const majMesures = () => {
      const o = ouvertures(E.cible * 0.9), pct = x => nb(Math.round(x * 100), 0) + ' %';
      ctx.mesures([
        { libelle: 'La voie A (chaude)', valeur: pct(o.a) + ' ouverte' },
        { libelle: 'La voie B (froide)', valeur: pct(o.b) + ' ouverte' },
        { libelle: 'La sortie AB', valeur: MOTS(o.a) }
      ]);
    };
    const majTexte = () => {
      majMesures();
      const o = ouvertures(E.cible * 0.9), pos = nb(Math.round(E.cible), 0) + ' %';
      if (o.a <= 0.001) ctx.dire('<strong>Position ' + pos + '.</strong> Le boisseau ferme la voie A. Seule la voie B, froide, passe : la sortie est froide.');
      else if (o.b <= 0.001) ctx.dire('<strong>Position ' + pos + '.</strong> Le boisseau ferme la voie B. Seule la voie A, chaude, passe : la sortie est chaude.');
      else ctx.dire('<strong>Position ' + pos + '.</strong> Le boisseau laisse passer un peu de chaque voie : ' + nb(Math.round(o.a * 100), 0) + ' % d’eau chaude et ' + nb(Math.round(o.b * 100), 0) + ' % d’eau froide. La sortie est ' + MOTS(o.a) + '.');
    };

    let derniere = { a: -1, zA: 0, xB: 0 };
    const majFlux = () => {
      const o = ouvertures(E.alpha);
      /* par où passe chaque voie : le milieu de la partie que le secteur laisse découverte */
      const thA = (Math.max(180 - TB, 225 - E.alpha) + 180 + TB) / 2, thB = (90 - TB + Math.min(90 + TB, 135 - E.alpha)) / 2;
      const zA = clamp(RC * Math.sin(thA * D), -8, 8), xB = clamp(RC * Math.cos(thB * D), -1, 9);
      if (Math.abs(zA - derniere.zA) > 0.03 || Math.abs(xB - derniere.xB) > 0.03 || derniere.a < 0) {
        fluxA.trajet([V(-TUBE + 4, 0, zA), V(-40, 0, zA), V(-27, 0, zA), V(-17, 0, zA * 0.5 - 6.5), V(0, 0, -10), V(15, 0, -6.5), V(29, 0, -1.5), V(60, 0, 0), V(TUBE - 4, 0, 0)]);
        fluxB.trajet([V(xB, 0, TUBE - 4), V(xB, 0, 40), V(xB, 0, 29), V(xB + 3, 0, 19), V(15, 0, 9.5), V(29, 0, 2.5), V(60, 0, 0), V(TUBE - 4, 0, 0)]);
        derniere = { a: o.a, zA, xB };
      }
      fluxA.regler(o.a); fluxB.regler(o.b);
      cMix.set(BLEU).lerp(new T.Color(ROUGE), o.a);
      eauMix.color.copy(cMix).lerp(new T.Color(0xffffff), 0.12);
    };
    const poserAngle = () => {
      const r = E.alpha * D;
      boisseau.rotation.y = r; facesBoisseau.rotation.y = r; aiguille.rotation.y = r;
      majFlux();
    };

    /* la coupe : tout est tranché par le plan y = 0, les faces hachurées prennent la place */
    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, -1, 0), 0)] : null;
      const exclus = new Set();
      [faces, ...flots.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      faces.visible = actif;
      const bb = new T.Box3();
      racine.traverse(o => { if (o.isMesh && !exclus.has(o) && !o.userData.sansOmbre) { bb.setFromObject(o); if (bb.min.y > 0.5) o.castShadow = !actif; } });
    };
    const majTransparence = () => {
      const on = E.transp && !E.coupe && !E.demonte;
      [laiton, cuivre].forEach(m => { m.transparent = on; m.opacity = on ? 0.08 : 1; m.depthWrite = !on; m.needsUpdate = true; });
    };
    const majVisibilite = () => { const on = (E.coupe || E.transp) && !E.demonte; flots.forEach(f => { f.objet.visible = on; }); };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); majTransparence(); majVisibilite(); };

    poserAngle(); majTexte(); majVisibilite();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps de la vanne', objets: [corpsG, facesCorps], desc: 'La pièce en laiton, toujours pleine d’eau. Elle reçoit les trois tuyaux et abrite le boisseau.' },
      { id: 'voieA', nom: 'La voie A : l’eau chaude', objets: [vA, gA, facesVoie.A], desc: 'L’eau chaude du départ arrive par ici. Le repère A est gravé sur le corps ; ici, une bague rouge la signale aussi.' },
      { id: 'voieB', nom: 'La voie B : l’eau froide du retour', objets: [vB, gB, facesVoie.B], desc: 'L’eau refroidie, de retour des radiateurs, arrive par ici. Le repère B est gravé sur le corps ; ici, une bague bleue.' },
      { id: 'voieAB', nom: 'La voie AB : la sortie', objets: [vAB, gAB, facesVoie.AB], desc: 'La voie commune : l’eau mélangée repart par ici vers les radiateurs. Le repère AB est gravé sur le corps.' },
      { id: 'boisseau', nom: 'Le boisseau et son axe', objets: [boisseau, facesBoisseau], desc: 'La pièce qui tourne dans le corps. Son secteur, une portion de tube en inox, masque la voie A, ou la voie B, ou un peu des deux.' },
      { id: 'couvercle', nom: 'Le couvercle et ses vis', objets: [couvercle], desc: 'Il ferme le corps par le haut. L’axe du boisseau le traverse, avec un joint pour que l’eau ne sorte pas.' },
      { id: 'servo', nom: 'Le servomoteur', objets: [servoCorps], desc: 'Le petit moteur qui tourne l’axe d’un quart de tour. Il se retire sans vider l’installation.' },
      { id: 'indicateur', nom: 'L’indicateur de position', objets: [cadran, aiguille], desc: 'L’aiguille tourne avec l’axe, devant une graduation de 0 à 10. À 0, la voie A est fermée ; à 10, elle est grande ouverte.' }
    ];

    const commandes = [
      { id: 'position', type: 'choix', titre: 'Position de la vanne', options: [['0', '0 %'], ['50', '50 %'], ['100', '100 %']], valeur: '50' }
    ];

    const COUPE = { azimut: 0, elevation: 62, zoom: 1.9, cible: [0, 0, 18] };
    const etapes = [
      { titre: 'La vanne : un corps, trois voies', piece: 'corps', voirDedans: false, eclate: false, actions: [['position', '50'], ['transparence', false]],
        vue: { azimut: 32, elevation: 28, zoom: 1.5, cible: [0, 22, 14] },
        texte: 'Un corps en laiton, trois raccords gravés A, B et AB, et un servomoteur au-dessus. À l’intérieur, une pièce qui tourne, le boisseau, ouvre ou ferme les voies.' },
      { titre: 'On coupe : à 100 %, seule la voie chaude passe', piece: 'boisseau', voirDedans: true, eclate: false, actions: [['position', '100'], ['transparence', false]],
        vue: COUPE,
        texte: 'Le boisseau masque la voie B. L’eau chaude de la voie A traverse la vanne et repart par AB : la sortie est chaude.' },
      { titre: 'On tourne le boisseau : la voie froide s’ouvre', piece: 'voieB', voirDedans: true, eclate: false, ralenti: true, actions: [['cible', 62], ['transparence', false]],
        vue: COUPE,
        texte: 'En tournant, le boisseau découvre un peu la voie B et masque un peu la voie A. Un peu d’eau froide entre et se mélange à l’eau chaude : la sortie refroidit.' },
      { titre: 'À 50 %, les deux voies se mélangent', piece: 'voieAB', voirDedans: true, eclate: false, ralenti: true, actions: [['position', '50'], ['transparence', false]],
        vue: COUPE,
        texte: 'Le boisseau est à mi-course : A et B sont ouvertes à moitié. Moitié d’eau chaude, moitié d’eau froide : la sortie AB est tiède, et son débit n’a pas changé.' },
      { titre: 'Le servomoteur pilote l’angle', piece: 'boisseau', voirDedans: false, eclate: false, ralenti: true, actions: [['position', '0'], ['transparence', true]],
        vue: { azimut: 30, elevation: 20, zoom: 1.7, cible: [0, 34, 0] },
        texte: 'Le servomoteur tourne l’axe. L’aiguille avance sur la graduation de 0 à 10 et, sous le couvercle, le boisseau tourne du même angle. À 0, il ferme la voie A.' },
      { titre: 'Démonté : le servomoteur, puis le boisseau', piece: 'boisseau', voirDedans: false, eclate: true, actions: [['position', '50'], ['transparence', false]],
        texte: 'Le servomoteur s’enlève d’abord, sans toucher à l’eau. Une fois la vanne isolée et vidée, on retire le couvercle : le boisseau sort par le haut.' }
    ];

    const eclate = [
      { objets: [servoG], vers: [0, 240, 0], debut: 0, fin: 0.4 },
      { objets: [couvercle], vers: [0, 150, 0], debut: 0.2, fin: 0.6 },
      { objets: [boisseau], vers: [0, 90, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 38, elevation: 18, zoom: 0.62, cible: [0, 150, 0] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 32, elevation: 28, zoom: 1.5, cible: [0, 22, 14], cadre: [corpsG, servoG, vA, vB, vAB], marge: 1.0 }
                                    : { azimut: 0, elevation: 60, zoom: 1.9, cible: [0, 0, 18], cadre: [corpsG, servoG, vA, vB, vAB], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'transparence') { E.transp = !!v; majTransparence(); majVisibilite(); return; }
        if (id === 'position') { E.cible = +v; ctx.regler('position', String(v)); }
        if (id === 'cible') { E.cible = +v; ctx.regler('position', 'libre'); }
        majTexte();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); majTransparence(); majVisibilite(); },
      animer(dt) {
        const cible = E.cible * 0.9;
        const bouge = Math.abs(cible - E.alpha) > 0.02;
        E.alpha = bouge ? K.vers(E.alpha, cible, 4.5, dt) : cible;
        if (bouge) poserAngle();
        const visibles = (E.coupe || E.transp) && !E.demonte;
        if (visibles) flots.forEach(f => f.animer(dt));
        return bouge || visibles;
      }
    };
  }, { famille: 'vannes', titre: 'La vanne trois voies mélangeuse', stations: ['v3v'] });

  /* ================================================================ LA VANNE D'ÉQUILIBRAGE
     ── vanneEquilibrage ──────────────────────────────────────────────────────────────────────
     Repère : l'eau va de -X (entrée) vers +X (sortie), Y vers le haut, +Z vers l'avant. Une vanne à
     siège : l'eau entre à gauche, monte par le trou du siège, passe sous le clapet, redescend et sort.
     Le clapet est mené par une broche filetée que le volant fait tourner : à chaque tour, il monte ou
     descend de 2 mm (course 14 mm, soit 7 tours). Deux prises de mesure sont dans le plan de la coupe :
     une avant le siège (amont), une après (aval).

     « Voir en coupe » tranche l'appareil par le plan vertical z = 0 (la moitié avant est retirée) ;
     le volant et sa broche restent entiers (convention : on ne coupe pas ce qui tourne).
     Les valeurs (débit, écart de pression) sont celles d'EXEMPLE de la station : A passe de 1,60 L/min
     (ouverte) à 0,80 L/min (fermeture 80 %) ; l'écart de pression suit q² / Kv² avec un Kv proportionnel
     à la levée du clapet — à confirmer sur une vanne réelle avec sa notice. */
  Electro3D.definir('vanneEquilibrage', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K);
    const C = A.C;
    const racine = new T.Group();

    const laiton = C(M.laiton, 0xd9bb68), cuivre = C(M.cuivre), inox = C(M.acier, 0xd5dade);
    const caout = C(M.caoutchouc), marine = C(M.plastiqueMarine), noir = C(M.plastiqueNoir);
    const zingue = C(M.zingue), orange = C(M.plastiqueOrange);

    /* ---------------------------------------------------------------- cotes */
    const RC = 27, RO = 32, RB = 10, RH = 18;      /* chambre, extérieur du corps, alésage, écrou six pans */
    const Y_SIEGE = 28, H_MAX = 14, PAS_VIS = 2;   /* dessus du siège ; course du clapet ; mm par tour */
    const TUBE = 110;
    const surX = (g, x) => { g.rotateZ(Math.PI / 2); g.translate(x, 0, 0); return g; };
    const anneauX = (rExt, rInt, x0, x1, mat, seg) => new T.Mesh(surX(K.anneau(rExt, rInt, x1 - x0, seg || 40), (x0 + x1) / 2), mat);

    /* ================================================================ LE CORPS */
    const corps = new T.Group();
    corps.add(K.mesh(K.anneau(RO, RC, 74, 56), laiton, 0, 15, 0));            /* la jupe, de y = -22 à 52 */
    corps.add(K.mesh(K.cylindre(RO, 5, 56), laiton, 0, -24.5, 0));            /* le fond */
    corps.add(K.mesh(new T.BoxGeometry(5, 50, 2 * Math.sqrt(RC * RC - 11.5 * 11.5)), laiton, 11.5, 3, 0));   /* la cloison : sépare l'entrée de la sortie */
    racine.add(corps);

    /* le siège : un plateau percé d'un trou rond, que le clapet vient fermer */
    const siege = new T.Group();
    {
      const pts = [], t0 = Math.acos(14 / RC) / D;
      for (let i = 0; i <= 40; i++) { const th = (t0 + (360 - 2 * t0) * i / 40) * D; pts.push(new T.Vector2(RC * Math.cos(th), -RC * Math.sin(th))); }
      const sh = new T.Shape(pts);
      const h = new T.Path(); h.absarc(0, 0, 7.5, 0, Math.PI * 2, true); sh.holes.push(h);
      const g = new T.ExtrudeGeometry(sh, { depth: 5, bevelEnabled: false, curveSegments: 24 });
      g.rotateX(-Math.PI / 2); g.translate(0, 23, 0);
      siege.add(new T.Mesh(g, laiton));
    }
    racine.add(siege);

    /* les deux raccords : bossage (au corps), écrou six pans, tube de cuivre */
    const raccords = new T.Group();
    [-1, 1].forEach(sens => {
      const g = new T.Group(); if (sens < 0) g.rotation.y = Math.PI;
      g.add(anneauX(14, RB, 27, 48, laiton));
      g.add(A.hexa(RH, RB, 48, 12, laiton));
      g.add(anneauX(11, RB, 60, TUBE, cuivre));
      raccords.add(g);
    });
    racine.add(raccords);

    /* les deux prises de mesure, à 45°, dans le plan de la coupe */
    const prises = {};
    [-1, 1].forEach(sens => {
      const g = new T.Group();
      const axe = new T.Group(); axe.position.set(sens * 32, 24, 0); axe.rotation.z = -sens * 45 * D;
      axe.add(K.mesh(K.anneau(5.5, 2.5, 18, 28), laiton, 0, 5, 0));
      axe.add(K.mesh(K.anneau(8, 2.5, 4, 6), laiton, 0, 4, 0));               /* l'épaulement à six pans */
      axe.add(K.mesh(K.cylindre(6.8, 7, 28), marine, 0, 17.5, 0));            /* le bouchon */
      g.add(axe); racine.add(g);
      prises[sens < 0 ? 'amont' : 'aval'] = g;
    });

    /* ================================================================ LE CHAPEAU */
    const chapeau = new T.Group();
    chapeau.add(K.mesh(K.anneau(RO, 7.5, 6, 56), laiton, 0, 55, 0));
    chapeau.add(K.mesh(K.anneau(14, 7.5, 12, 40), laiton, 0, 64, 0));
    chapeau.add(K.mesh(K.anneau(16, 4.8, 5, 6), laiton, 0, 72.5, 0));         /* l'écrou de presse-étoupe */
    for (let i = 0; i < 4; i++) {
      const a = (45 + i * 90) * D, v = K.vis(3.3, { croix: false, matiere: zingue });
      v.position.set(Math.cos(a) * 29.5, 58, Math.sin(a) * 29.5); chapeau.add(v);
    }
    /* le repère fixe, contre la tranche du volant : on lit le chiffre qui passe devant */
    chapeau.add(K.mesh(K.boite(3.2, 2, 24, 0.5), orange, 0, 75.4, 25));
    chapeau.add(K.mesh(K.boite(3.2, 7, 2, 0.5), orange, 0, 82, 31.8));
    racine.add(chapeau);

    /* ================================================================ LE CLAPET (monte et descend) */
    const clapet = new T.Group();
    clapet.add(K.mesh(K.cylindre(11.5, 2, 40), caout, 0, 1, 0));              /* la rondelle d'étanchéité, en EPDM */
    clapet.add(K.mesh(K.cylindre(11.5, 7, 40), inox, 0, 5.5, 0));
    clapet.add(K.mesh(K.anneau(7, 4.5, 14, 32), inox, 0, 16, 0));             /* l'écrou que la broche fait monter ou descendre */
    racine.add(clapet);

    /* ================================================================ LE VOLANT ET SA BROCHE (tournent) */
    const volant = new T.Group();
    volant.add(K.mesh(K.cylindre(4.5, 52, 28), inox, 0, 66, 0));               /* la broche, de y = 40 à 92 */
    const filet = K.ressort(4.9, 36, 18, 0.55, inox); filet.position.y = 40; volant.add(filet);   /* son filetage */
    volant.add(K.mesh(K.cylindre(30, 14, 64), marine, 0, 85, 0));
    volant.add(K.mesh(K.cylindre(13, 4, 40), noir, 0, 94, 0));
    for (let k = 0; k < 10; k++) {                                             /* la graduation : dix chiffres sur la tranche */
      const pivot = new T.Group(); pivot.rotation.y = k * 36 * D;
      const t = K.gravure(String(k), 6.5, { couleur: '#f1efe8' }); t.position.set(0, 85, 30.3); pivot.add(t);
      const tr = new T.Group(); tr.rotation.y = (k * 36 + 18) * D;
      tr.add(K.mesh(new T.BoxGeometry(0.9, 5, 0.6), K.plastique(0xf1efe8, 0.5), 0, 85, 30.2));
      volant.add(pivot, tr);
    }
    racine.add(volant);

    /* ================================================================ LES FACES DE COUPE
       Dessinées dans le plan z = 0 (coordonnées x, y), hachures à 45° comme sur un plan. */
    const Hm = {
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      inox: A.hachures('#8793a0', '#262e38', 3.2),
      marine: A.hachures('#3f5a80', '#14294a', 4),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      caout: A.uni(0x1c1e21)
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceXY = (polys, mat, z, groupe) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.position.z = z; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      (groupe || faces).add(m); return m;
    };
    const R = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const MX = polys => polys.map(p => p.map(q => [-q[0], q[1]]));
    const groupeFaces = () => { const g = new T.Group(); faces.add(g); return g; };

    /* le corps : le fond, les parois (percées par l'alésage et par la prise), la cloison */
    const facesCorps = groupeFaces();
    const paroi = [R(-32, -27, -22, -10), [[-32, 10], [-27, 10], [-27, 15.46], [-32, 20.46]], [[-32, 27.54], [-27, 22.54], [-27, 52], [-32, 52]]];
    faceXY([R(-32, 32, -27, -22), ...paroi, ...MX(paroi), R(9, 14, -22, 23), R(-48, -32, 10, 14), R(-48, -32, -14, -10), R(32, 48, 10, 14), R(32, 48, -14, -10)], Hm.laiton, 0.03, facesCorps);
    const facesSiege = groupeFaces();
    faceXY([R(-27, -7.5, 23, 28), R(7.5, 14, 23, 28)], Hm.laiton, 0.03, facesSiege);
    const facesRaccords = groupeFaces();
    {
      const l = [R(-60, -48, 10, 15.59), R(-60, -48, -15.59, -10)];
      faceXY([...l, ...MX(l)], Hm.laiton, 0.03, facesRaccords);
      const c = [R(-TUBE, -60, 10, 11), R(-TUBE, -60, -11, -10)];
      faceXY([...c, ...MX(c)], Hm.cuivre, 0.03, facesRaccords);
    }
    const facesChapeau = groupeFaces();
    faceXY([R(-32, -7.5, 52, 58), R(7.5, 32, 52, 58), R(-14, -7.5, 58, 70), R(7.5, 14, 58, 70), R(-13.86, -4.8, 70, 75), R(4.8, 13.86, 70, 75)], Hm.laiton, 0.03, facesChapeau);
    /* le clapet : sa face de coupe suit le clapet (le groupe monte et descend avec lui) */
    const facesClapet = groupeFaces();
    faceXY([R(-11.5, 11.5, 0, 2)], Hm.caout, 0.04, facesClapet);
    faceXY([R(-11.5, 11.5, 2, 9), R(-7, -4.5, 9, 23), R(4.5, 7, 9, 23)], Hm.inox, 0.04, facesClapet);

    /* une prise : axe incliné à 45° ; sa paroi, son bouchon, et le canal qui la relie à la chambre */
    const pale = (hex, k) => new T.Color(hex).lerp(new T.Color(0xffffff), k);
    const eauAmont = A.eau(0x4b84cc), eauAval = A.eau(0x4b84cc);
    const facesPrises = {};
    const canaux = { amont: null, aval: null };
    [-1, 1].forEach(sens => {
      const nom = sens < 0 ? 'amont' : 'aval', g = facesPrises[nom] = groupeFaces();
      const Pt = new T.Vector2(sens * 32, 24), d = new T.Vector2(sens * 0.7071, 0.7071), n = new T.Vector2(d.y, -d.x);
      const bande = (s0, s1, v0, v1) => [[s0, v0], [s1, v0], [s1, v1], [s0, v1]].map(([s, v]) => [Pt.x + s * d.x + v * n.x, Pt.y + s * d.y + v * n.y]);
      faceXY([bande(-4, 14, 2.5, 5.5), bande(-4, 14, -5.5, -2.5)], Hm.laiton, 0.04, g);
      faceXY([bande(14, 21, -6.8, 6.8)], Hm.marine, 0.04, g);
      /* le canal dans la paroi, de la face intérieure du corps jusqu'au bouchon */
      const Pg = new T.Vector2(-32, 24), dg = new T.Vector2(-0.7071, 0.7071), ng = new T.Vector2(0.7071, 0.7071);
      const bout = v => [Pg.x + 14 * dg.x + v * ng.x, Pg.y + 14 * dg.y + v * ng.y];
      const lg = [[-27, 15.46], bout(-2.5), bout(2.5), [-27, 22.54]];
      canaux[nom] = sens < 0 ? lg : lg.map(q => [-q[0], q[1]]);
    });

    /* l'eau, en coupe : plus foncée avant le siège (plus pressée), plus claire après */
    const facesEau = groupeFaces();
    faceXY([R(-TUBE, -27, -10, 10), R(-27, 9, -22, 23), R(-7.5, 7.5, 23, 28), canaux.amont], eauAmont, -0.3, facesEau);
    faceXY([R(-27, 27, 28, 52), R(14, 27, -22, 28), R(27, TUBE, -10, 10), canaux.aval], eauAval, -0.3, facesEau);

    /* ================================================================ L'EAU QUI CIRCULE */
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const cAmont = new T.Color(0x2a5aa8), cAval = new T.Color(0x2a5aa8), cClair = new T.Color(0xa7d0f5);
    const fluxEau = A.flux(36, 60, (p, co) => {
      const t = clamp(Math.max(p.x / 6, (p.y - 25) / 4), 0, 1), s = t * t * (3 - 2 * t);
      co.copy(cAmont).lerp(cAval, s);
    });
    racine.add(fluxEau.objet);

    /* ================================================================ L'ÉTAT : la levée du clapet gouverne tout */
    const hDe = c => H_MAX * (1 - c / 100);
    const debit = c => 1.6 - 0.01 * c;
    const ecart = c => 3 * Math.pow((debit(c) / 1.6) / (1 - c / 100), 2);
    const E = { c: 40, h: hDe(40), coupe: false, demonte: false };
    let hPrec = -1;
    const majMesures = () => {
      ctx.mesures([
        { libelle: 'Le débit', valeur: nb(debit(E.c), 2) + ' L/min' },
        { libelle: 'L’écart de pression entre les prises', valeur: nb(ecart(E.c), 1) + ' kPa' },
        { libelle: 'Le préréglage', valeur: nb(hDe(E.c) / PAS_VIS, 1) + ' tours ouverts' }
      ]);
    };
    const majTexte = () => {
      majMesures();
      if (E.c <= 0) ctx.dire('<strong>Vanne grande ouverte.</strong> Le clapet est loin du siège : l’eau passe librement (' + nb(debit(0), 2) + ' L/min) et l’écart de pression entre les deux prises est faible (' + nb(ecart(0), 1) + ' kPa). <em>Valeurs d’exemple.</em>');
      else ctx.dire('<strong>Fermeture ' + nb(E.c, 0) + ' %.</strong> Le clapet est à ' + nb(hDe(E.c), 1) + ' mm du siège. Le passage est plus étroit : le débit tombe à ' + nb(debit(E.c), 2) + ' L/min et l’écart de pression entre les prises monte à ' + nb(ecart(E.c), 1) + ' kPa. <em>Valeurs d’exemple.</em>');
    };
    const majFlux = h => {
      const cEff = (1 - h / H_MAX) * 100, gy = Y_SIEGE + h / 2;
      if (Math.abs(h - hPrec) > 0.02) {
        fluxEau.trajet([V(-TUBE + 4, 0, 0), V(-40, 0, 0), V(-26, 0, 0), V(-14, 4, 0), V(-5, 14, 0), V(0, 22, 0), V(2, 26, 0), V(6, gy, 0), V(14, gy + 3, 0), V(19, Math.max(gy + 4, 33), 0), V(21, 26, 0), V(20.5, 12, 0), V(21, 2, 0), V(28, 0, 0), V(TUBE - 4, 0, 0)]);
        hPrec = h;
      }
      fluxEau.vitesse(75 * debit(cEff) / 1.6);
      cAval.copy(cAmont).lerp(cClair, clamp(ecart(cEff) / 16, 0.1, 1));
      eauAval.color.setHex(0x4b84cc).lerp(new T.Color(0xcfe5f8), clamp(ecart(cEff) / 16, 0.1, 1));
    };
    const poser = h => {
      clapet.position.y = Y_SIEGE + h; facesClapet.position.y = Y_SIEGE + h;
      volant.rotation.y = -(1 - h / H_MAX) * (H_MAX / PAS_VIS) * 360 * D;      /* on ferme en tournant à droite */
      majFlux(h);
    };

    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, fluxEau.objet, volant].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      faces.visible = actif;
    };
    const majVisibilite = () => { fluxEau.objet.visible = E.coupe && !E.demonte; };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); majVisibilite(); };

    poser(E.h); majTexte(); majVisibilite();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps de la vanne', objets: [corps, facesCorps], desc: 'La pièce en laiton, pleine d’eau. L’eau entre à gauche, passe sous le clapet et sort à droite. Une cloison sépare l’entrée de la sortie.' },
      { id: 'siege', nom: 'Le siège', objets: [siege, facesSiege], desc: 'Un plateau percé d’un trou rond. Toute l’eau passe par ce trou : le clapet vient s’y poser pour fermer.' },
      { id: 'clapet', nom: 'Le clapet', objets: [clapet, facesClapet], desc: 'La pièce qui monte et descend au-dessus du siège. Plus il est près, plus le passage est étroit. Sa rondelle en caoutchouc ferme sans fuite.' },
      { id: 'volant', nom: 'Le volant gradué et sa broche', objets: [volant], desc: 'En tournant, le volant fait tourner la broche filetée : à chaque tour, le clapet monte ou descend de 2 mm. Le chiffre devant le repère donne le réglage.' },
      { id: 'chapeau', nom: 'Le chapeau', objets: [chapeau, facesChapeau], desc: 'Il ferme le corps par le haut. La broche le traverse, avec un joint pour que l’eau ne sorte pas. Le petit repère orange sert à lire le volant.' },
      { id: 'priseAmont', nom: 'La prise avant le clapet', objets: [prises.amont, facesPrises.amont], desc: 'Un petit canal relie la chambre d’entrée à un bouchon. On y branche l’appareil de mesure : c’est là que la pression est la plus forte.' },
      { id: 'priseAval', nom: 'La prise après le clapet', objets: [prises.aval, facesPrises.aval], desc: 'Même chose côté sortie. L’écart de pression entre les deux prises permet de calculer le débit.' },
      { id: 'raccords', nom: 'Les raccords et les tubes', objets: [raccords, facesRaccords], desc: 'Un écrou à six pans et un tube de cuivre de chaque côté : la vanne se pose dans le circuit, l’eau entre à gauche.' }
    ];

    const commandes = [
      { id: 'fermeture', type: 'curseur', libelle: 'Fermeture relative A', min: 0, max: 80, pas: 10, unite: '%', valeur: 40 }
    ];

    const COUPE = { azimut: 0, elevation: 7, zoom: 1.6, cible: [0, 36, 0] };
    const etapes = [
      { titre: 'La vanne d’équilibrage, telle qu’on la pose', piece: 'corps', voirDedans: false, eclate: false, actions: [['fermeture', 40]],
        vue: { azimut: 30, elevation: 20, zoom: 1.5, cible: [0, 30, 0] },
        texte: 'Un corps en laiton posé sur le tuyau, un volant gradué au-dessus, deux petites prises de mesure de chaque côté. L’eau entre à gauche et sort à droite.' },
      { titre: 'On coupe : l’eau passe entre le clapet et le siège', piece: 'siege', voirDedans: true, eclate: false, actions: [['fermeture', 0]],
        vue: COUPE,
        texte: 'Vanne grande ouverte : l’eau monte par le trou du siège, passe sous le clapet, puis redescend vers la sortie.' },
      { titre: 'On tourne le volant : le clapet descend', piece: 'volant', voirDedans: true, eclate: false, ralenti: true, actions: [['fermeture', 40]],
        vue: COUPE,
        texte: 'Le volant fait tourner la broche filetée, qui fait descendre le clapet vers le siège. Le passage de l’eau se rétrécit.' },
      { titre: 'Le passage se réduit : le débit baisse', piece: 'clapet', voirDedans: true, eclate: false, ralenti: true, actions: [['fermeture', 70]],
        vue: COUPE,
        texte: 'Le clapet est tout près du siège : l’eau doit se faufiler dans un passage étroit. Elle avance moins vite, le débit baisse.' },
      { titre: 'Les deux prises mesurent l’écart de pression', piece: 'priseAmont', voirDedans: true, eclate: false, actions: [['fermeture', 70]],
        vue: { azimut: 0, elevation: 7, zoom: 2.3, cible: [0, 30, 0] },
        texte: 'L’eau perd de la pression en passant sous le clapet : bleu foncé avant, bleu clair après. Une prise de chaque côté permet de mesurer cet écart, qui sert à calculer le débit.' },
      { titre: 'Démonté : le volant, puis le clapet', piece: 'clapet', voirDedans: false, eclate: true, actions: [['fermeture', 40]],
        texte: 'On dévisse le volant et sa broche, puis le chapeau. Le clapet sort alors par le haut ; le corps reste sur le tuyau.' }
    ];

    const eclate = [
      { objets: [volant], vers: [0, 170, 0], debut: 0, fin: 0.4 },
      { objets: [chapeau], vers: [0, 120, 0], debut: 0.2, fin: 0.65 },
      { objets: [clapet], vers: [0, 70, 0], debut: 0.5, fin: 1 }
    ];

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 34, elevation: 16, zoom: 0.8, cible: [0, 105, 0] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 30, elevation: 20, zoom: 1.5, cible: [0, 30, 0], cadre: [corps, chapeau, volant, raccords], marge: 1.0 }
                                    : { azimut: 0, elevation: 7, zoom: 1.6, cible: [0, 36, 0], cadre: [corps, chapeau, volant, raccords], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'fermeture') { E.c = +v; ctx.regler('fermeture', +v); majTexte(); }
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); majVisibilite(); },
      animer(dt) {
        const cible = hDe(E.c);
        const bouge = Math.abs(cible - E.h) > 0.01;
        E.h = bouge ? K.vers(E.h, cible, 3.5, dt) : cible;
        if (bouge) poser(E.h);
        const visible = E.coupe && !E.demonte;
        if (visible) fluxEau.animer(dt);
        return bouge || visible;
      }
    };
  }, { famille: 'vannes', titre: 'La vanne d’équilibrage', stations: ['equilibrage'] });

  /* ================================================================ vanneReglage
     La vanne d'équilibrage À RÉGLER (station « Régler une vanne d'équilibrage »). Source : la notice de la
     vanne d'équilibrage à prises de pression de l'atelier (banc RA20), DN 15. Aucune marque.
     Repère : comme vanneEquilibrage — l'eau va de -X (entrée) vers +X (sortie), Y vers le haut, +Z vers l'avant.

     LA MÉCANIQUE (ce qui se voit en coupe) : le volant fait tourner une broche creuse filetée ; un écrou, porté
     par le clapet, monte ou descend dessus (2 mm par tour, 4 tours = 8 mm). Le clapet porte aussi un petit
     poussoir qui monte DANS la broche creuse. Au centre du volant, on atteint avec une clé six pans de 3 mm la
     TIGE INTÉRIEURE : on la visse vers le bas jusqu'à ce qu'elle touche le poussoir. Le clapet ne peut plus
     monter plus haut : on peut fermer, puis rouvrir, le volant s'arrête au préréglage.

     LE VOLANT : le chiffre des dixièmes passe devant le repère orange (graduation 0 à 9 sur la tranche) ; le
     nombre de tours entiers s'affiche dans la petite fenêtre sous le volant. 0,0 = fermée, 4,0 = grande
     ouverture. Ouvrir = tourner à gauche (sens inverse des aiguilles d'une montre, vu du dessus).

     LES VALEURS : Kv de la notice (tours → Kv), interpolation linéaire. Branche : pression disponible constante
     20 kPa = perte de la vanne + perte du reste de la branche (radiateur, Kv équivalent 1,0) ;
     q (m³/h) = √0,20 / √(1/Kv² + 1/1,0²) ; Δp de la vanne (kPa) = 100·(q/Kv)².
     « Voir en coupe » tranche tout (volant, broche, tige, clapet) par le plan z = 0 ; seuls l'eau, la clé et
     l'appareil de mesure restent entiers. */
  Electro3D.definir('vanneReglage', (T, K, ctx) => {
    const M = K.mat;
    const A = aides(T, K);
    const C = A.C;
    const racine = new T.Group();
    const D = Math.PI / 180;

    const laiton = C(M.laiton, 0xd9bb68), cuivre = C(M.cuivre), inox = C(M.acier, 0xd5dade);
    const caout = C(M.caoutchouc), marine = C(M.plastiqueMarine), noir = C(M.plastiqueNoir), sombre = C(M.plastiqueSombre);
    const zingue = C(M.zingue), orange = C(M.plastiqueOrange);
    const tigeMat = C(M.acier, 0xe2792d), cleMat = C(M.acier, 0x5b6673);

    /* ---------------------------------------------------------------- cotes (mm) */
    const RC = 27, RO = 32, RB = 10, RH = 18;       /* chambre, extérieur du corps, alésage, écrou six pans */
    const Y_SIEGE = 28, PAS = 2, TOURS_MAX = 4;      /* dessus du siège ; mm de levée par tour ; grande ouverture */
    const TUBE = 110;
    const R_T = 6.4, R_TI = 3.6, Y_T0 = 40, Y_T1 = 96;  /* la broche creuse : rayon, alésage, de y à y */
    const R_R = 3.0, L_R = 32, ROD_LIBRE = 70;          /* la tige intérieure : rayon, longueur, bas de la tige quand elle est dévissée */
    const PIN_H = 30, PITCH = 1.5;                       /* haut du poussoir au-dessus du clapet ; pas de la tige (mm par tour) */
    const surX = (g, x) => { g.rotateZ(Math.PI / 2); g.translate(x, 0, 0); return g; };
    const anneauX = (rExt, rInt, x0, x1, mat, seg) => new T.Mesh(surX(K.anneau(rExt, rInt, x1 - x0, seg || 40), (x0 + x1) / 2), mat);
    const calme = o => { o.userData.sansOmbre = true; o.castShadow = false; return o; };
    const grav = (t, h, o) => { const m = K.gravure(t, h, o); m.userData.voile = true; return m; };

    /* ================================================================ LA NOTICE : tours → Kv, débit, écart de pression */
    const KV = [[0, 0], [0.5, 0.127], [1, 0.212], [1.5, 0.314], [2, 0.571], [2.5, 0.877], [3, 1.38], [3.5, 1.98], [4, 2.52]];
    const kvDe = p => {
      p = clamp(p, 0, TOURS_MAX);
      for (let i = 1; i < KV.length; i++) if (p <= KV[i][0]) return KV[i - 1][1] + (KV[i][1] - KV[i - 1][1]) * (p - KV[i - 1][0]) / (KV[i][0] - KV[i - 1][0]);
      return KV[KV.length - 1][1];
    };
    const P_DISPO = 0.20, KV_RAD = 1.0;                   /* bar ; Kv équivalent du reste de la branche */
    const debitDe = p => { const kv = kvDe(p); return kv <= 0 ? 0 : Math.sqrt(P_DISPO) / Math.sqrt(1 / (kv * kv) + 1 / (KV_RAD * KV_RAD)); };   /* m³/h */
    const ecartDe = p => { const kv = kvDe(p); return kv <= 0 ? P_DISPO * 100 : 100 * Math.pow(debitDe(p) / kv, 2); };                               /* kPa */
    const Q_MAX = debitDe(TOURS_MAX);
    const hDe = p => p * PAS;                              /* levée du clapet, mm */
    const yTige = p => Y_SIEGE + hDe(p) + PIN_H;           /* où le bas de la tige touche le poussoir quand le clapet est à p tours */

    /* ================================================================ LE CORPS */
    const corps = new T.Group();
    corps.add(K.mesh(K.anneau(RO, RC, 74, 56), laiton, 0, 15, 0));
    corps.add(K.mesh(K.cylindre(RO, 5, 56), laiton, 0, -24.5, 0));
    corps.add(K.mesh(new T.BoxGeometry(5, 50, 2 * Math.sqrt(RC * RC - 11.5 * 11.5)), laiton, 11.5, 3, 0));
    /* la flèche de sens de l'eau, moulée en relief sur la face avant (épousant le cylindre) */
    {
      const sh = [[-15, -2.6], [2, -2.6], [2, -8], [15, 0], [2, 8], [2, 2.6], [-15, 2.6]];
      const dense = [];
      sh.forEach((a, i) => { const b = sh[(i + 1) % sh.length], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2.5)); for (let j = 0; j < n; j++) dense.push(new T.Vector2(a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n)); });
      const g = new T.ExtrudeGeometry(new T.Shape(dense), { depth: 2.2, bevelEnabled: false });
      const pos = g.attributes.position;
      for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), z = pos.getZ(i), r = RO - 1.2 + z; pos.setX(i, r * Math.sin(x / RO)); pos.setZ(i, r * Math.cos(x / RO)); pos.setY(i, pos.getY(i) + 14); }
      g.computeVertexNormals();
      corps.add(new T.Mesh(g, laiton));
    }
    racine.add(corps);

    const siege = new T.Group();
    {
      const pts = [], t0 = Math.acos(14 / RC) / D;
      for (let i = 0; i <= 40; i++) { const th = (t0 + (360 - 2 * t0) * i / 40) * D; pts.push(new T.Vector2(RC * Math.cos(th), -RC * Math.sin(th))); }
      const sh = new T.Shape(pts);
      const h = new T.Path(); h.absarc(0, 0, 7.5, 0, Math.PI * 2, true); sh.holes.push(h);
      const g = new T.ExtrudeGeometry(sh, { depth: 5, bevelEnabled: false, curveSegments: 24 });
      g.rotateX(-Math.PI / 2); g.translate(0, 23, 0);
      siege.add(new T.Mesh(g, laiton));
    }
    racine.add(siege);

    const raccords = new T.Group();
    [-1, 1].forEach(sens => {
      const g = new T.Group(); if (sens < 0) g.rotation.y = Math.PI;
      g.add(anneauX(14, RB, 27, 48, laiton));
      g.add(A.hexa(RH, RB, 48, 12, laiton));
      g.add(anneauX(11, RB, 60, TUBE, cuivre));
      raccords.add(g);
    });
    racine.add(raccords);

    /* les deux prises de pression, à 45°, dans le plan de la coupe : chacune porte son capuchon ;
       quand l'appareil est branché, le capuchon est dévissé et un raccord rapide prend sa place */
    const prises = {}, capuchons = {}, raccordsMesure = {};
    [-1, 1].forEach(sens => {
      const nom = sens < 0 ? 'amont' : 'aval';
      const g = new T.Group();
      const axe = new T.Group(); axe.position.set(sens * 32, 24, 0); axe.rotation.z = -sens * 45 * D;
      axe.add(K.mesh(K.anneau(5.5, 2.5, 18, 28), laiton, 0, 5, 0));
      axe.add(K.mesh(K.anneau(8, 2.5, 4, 6), laiton, 0, 4, 0));
      const cap = new T.Group(); cap.add(K.mesh(K.cylindre(6.8, 7, 28), marine, 0, 17.5, 0)); axe.add(cap);
      const con = new T.Group(); con.visible = false;
      con.add(K.mesh(K.cylindre(6.4, 9, 6), noir, 0, 17, 0)); con.add(K.mesh(K.cylindre(3.2, 5, 16), noir, 0, 23.5, 0)); axe.add(con);
      g.add(axe); racine.add(g);
      prises[nom] = g; capuchons[nom] = cap; raccordsMesure[nom] = con;
    });

    /* ================================================================ LE CHAPEAU (fixe) : repère, fenêtre des tours entiers */
    const chapeau = new T.Group();
    chapeau.add(K.mesh(K.anneau(RO, 9, 6, 56), laiton, 0, 55, 0));
    chapeau.add(K.mesh(K.anneau(15, 9, 12, 40), laiton, 0, 64, 0));
    chapeau.add(K.mesh(K.anneau(17, 6.8, 5, 6), laiton, 0, 72.5, 0));         /* l'écrou de presse-étoupe */
    for (let i = 0; i < 4; i++) {
      const a = (45 + i * 90) * D, v = K.vis(3.3, { croix: false, matiere: zingue });
      v.position.set(Math.cos(a) * 29.5, 58, Math.sin(a) * 29.5); chapeau.add(v);
    }
    chapeau.add(K.mesh(K.boite(6, 4, 21, 0.8), laiton, 0, 66, 24));            /* le bras qui porte la fenêtre et le repère */
    chapeau.add(K.mesh(K.boite(26, 15, 3, 0.8), noir, 0, 66, 34.5));            /* la plaque de la fenêtre */
    const fenetre = K.ecran(22, 11, { fond: '#f2efe6', encre: '#10233c', texte: ['4'] });
    fenetre.mesh.position.set(0, 66, 36.1); fenetre.mesh.userData.voile = true; chapeau.add(fenetre.mesh);
    chapeau.add(K.mesh(K.boite(2.6, 9, 2.2, 0.5), orange, 0, 76.5, 31.2));      /* le repère : contre la tranche du volant, sous le chiffre */
    racine.add(chapeau);

    /* ================================================================ LE CLAPET (monte et descend) : rondelle, corps, écrou, poussoir */
    const clapet = new T.Group();
    clapet.add(K.mesh(K.cylindre(11.5, 2, 40), caout, 0, 1, 0));
    clapet.add(K.mesh(K.cylindre(11.5, 7, 40), inox, 0, 5.5, 0));
    clapet.add(K.mesh(K.anneau(8.6, 6.6, 14, 32), inox, 0, 16, 0));            /* l'écrou, sur la broche */
    clapet.add(K.mesh(K.cylindre(R_R, PIN_H - 9, 20), inox, 0, 9 + (PIN_H - 9) / 2, 0));   /* le poussoir, dans la broche creuse */
    racine.add(clapet);

    /* ================================================================ LE VOLANT ET SA BROCHE CREUSE (tournent) */
    const volant = new T.Group();
    volant.add(K.mesh(K.anneau(R_T, R_TI, Y_T1 - Y_T0, 28), inox, 0, (Y_T0 + Y_T1) / 2, 0));
    const filet = K.ressort(R_T + 0.5, 26, 12, 0.55, inox); filet.position.y = 42; volant.add(filet);
    volant.add(K.mesh(K.anneau(30, R_T, 14, 64), marine, 0, 85, 0));
    volant.add(K.mesh(K.anneau(13, R_T, 4, 40), noir, 0, 94, 0));
    for (let k = 0; k < 10; k++) {                                             /* la graduation des dixièmes : 0 à 9, croissante vers la gauche */
      const pivot = new T.Group(); pivot.rotation.y = -k * 36 * D;
      const t = grav(String(k), 6.5, { couleur: '#f1efe8' }); t.position.set(0, 85, 30.3); pivot.add(t);
      const tr = new T.Group(); tr.rotation.y = -(k * 36 + 18) * D;
      tr.add(K.mesh(new T.BoxGeometry(0.9, 5, 0.6), K.plastique(0xf1efe8, 0.5), 0, 85, 30.2));
      volant.add(pivot, tr);
    }
    racine.add(volant);

    /* ================================================================ LA TIGE INTÉRIEURE (tourne avec le volant, descend quand on la visse) */
    const tige = new T.Group();
    tige.add(K.mesh(K.cylindre(R_R, L_R, 20), tigeMat, 0, 0, 0));
    tige.add(K.mesh(K.cylindre(1.95, 0.6, 6), sombre, 0, L_R / 2 + 0.05, 0));  /* l'empreinte six pans, en haut */
    racine.add(tige);

    /* ================================================================ LA CLÉ SIX PANS (3 mm) : n'apparaît que pour visser ou dévisser */
    const cle = new T.Group(); cle.visible = false;
    cle.add(K.mesh(K.cylindre(1.73, 40, 6), cleMat, 0, 20 - 4, 0));              /* la branche longue, dans l'empreinte */
    {
      const coude = new T.Mesh(surX(K.cylindre(2.0, 38, 14), 19 + 1.7), cleMat); coude.position.y = 36; cle.add(coude);   /* la branche courte, horizontale */
      cle.add(K.mesh(K.sphere(2.2, 12), cleMat, 0, 36, 0));
      const poignee = K.mesh(K.cylindre(3.6, 22, 16), noir, 0, 0, 0); poignee.rotation.z = Math.PI / 2; poignee.position.set(30, 36, 0); cle.add(poignee);
    }
    racine.add(cle);

    /* ================================================================ L'APPAREIL D'ÉQUILIBRAGE (générique, sans marque) */
    const appareil = new T.Group(); appareil.visible = false;
    const AZ0 = 52, AZ1 = 140, AHF = 12, AHB = 46, AW = 134, AYS = -25.8;
    const ALPHA = Math.atan((AHB - AHF) / (AZ1 - AZ0));
    {
      const sh = new T.Shape([[-AZ0, AYS], [-AZ1, AYS], [-AZ1, AYS + AHF], [-AZ0, AYS + AHB]].map(q => new T.Vector2(q[0], q[1])));
      const g = new T.ExtrudeGeometry(sh, { depth: AW - 2.4, bevelEnabled: true, bevelSize: 1.2, bevelThickness: 1.2, bevelSegments: 2 });
      g.rotateY(Math.PI / 2); g.translate(-(AW - 2.4) / 2, 0, 0);
      appareil.add(new T.Mesh(g, marine));
      const n = new T.Vector3(0, Math.cos(ALPHA), Math.sin(ALPHA));
      const surPente = (t, dx, dn) => new T.Vector3(dx, AYS + AHF + t * (AHB - AHF), AZ1 - t * (AZ1 - AZ0)).addScaledVector(n, dn);
      const cadre = K.mesh(K.boite(108, 54, 1.6, 0.6), noir); cadre.position.copy(surPente(0.6, 0, 0.5)); cadre.rotation.x = -(Math.PI / 2 - ALPHA); appareil.add(cadre);
      const ecran = K.ecran(98, 34, { fond: '#c9d6b3', encre: '#1a2a14', texte: ['', ''] });
      ecran.mesh.position.copy(surPente(0.6, 0, 1.4)); ecran.mesh.rotation.x = -(Math.PI / 2 - ALPHA); ecran.mesh.userData.voile = true; appareil.add(ecran.mesh);
      appareil.userData.ecran = ecran;
      [-26, 0, 26].forEach(dx => { const b = K.mesh(K.cylindre(5, 3, 20), orange); b.position.copy(surPente(0.1, dx, 1.5)); b.rotation.x = ALPHA; appareil.add(b); });
      [-1, 1].forEach(s => {                                                     /* les deux prises du boîtier, derrière, et leur flexible */
        const port = K.mesh(K.cylindre(5, 9, 20), noir); port.rotation.x = Math.PI / 2; port.position.set(s * 38, -5, AZ0 - 4); appareil.add(port);
        const dessus = new T.CatmullRomCurve3([
          new T.Vector3(s * 50.4, 42.4, 0), new T.Vector3(s * 58, 50, 0), new T.Vector3(s * 68, 46, 10), new T.Vector3(s * 68, 28, 24),
          new T.Vector3(s * 60, 8, 36), new T.Vector3(s * 46, -3, 43), new T.Vector3(s * 38, -5, 44)]);
        appareil.add(new T.Mesh(new T.TubeGeometry(dessus, 60, 3.2, 10, false), caout));
      });
    }
    racine.add(appareil);

    /* ================================================================ LES FACES DE COUPE (plan z = 0, hachures à 45°) */
    const Hm = {
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      inox: A.hachures('#8793a0', '#262e38', 3.2),
      marine: A.hachures('#3f5a80', '#14294a', 4),
      tige: A.hachures('#e2792d', '#6b320e', 3),
      cuivre: A.uni(0xb8683c, { metalness: 0.3, roughness: 0.5 }),
      caout: A.uni(0x1c1e21),
      noir: A.uni(0x2a2d31)
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const faceXY = (polys, mat, z, groupe) => {
      const m = new T.Mesh(new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1]))))), mat);
      m.position.z = z; m.userData.sansOmbre = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      (groupe || faces).add(m); return m;
    };
    const R = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const MX = polys => polys.map(p => p.map(q => [-q[0], q[1]]));
    const groupeFaces = () => { const g = new T.Group(); faces.add(g); return g; };

    const facesCorps = groupeFaces();
    const paroi = [R(-32, -27, -22, -10), [[-32, 10], [-27, 10], [-27, 15.46], [-32, 20.46]], [[-32, 27.54], [-27, 22.54], [-27, 52], [-32, 52]]];
    faceXY([R(-32, 32, -27, -22), ...paroi, ...MX(paroi), R(9, 14, -22, 23), R(-48, -32, 10, 14), R(-48, -32, -14, -10), R(32, 48, 10, 14), R(32, 48, -14, -10)], Hm.laiton, 0.03, facesCorps);
    const facesSiege = groupeFaces();
    faceXY([R(-27, -7.5, 23, 28), R(7.5, 14, 23, 28)], Hm.laiton, 0.03, facesSiege);
    const facesRaccords = groupeFaces();
    {
      const l = [R(-60, -48, 10, 15.59), R(-60, -48, -15.59, -10)];
      faceXY([...l, ...MX(l)], Hm.laiton, 0.03, facesRaccords);
      const c = [R(-TUBE, -60, 10, 11), R(-TUBE, -60, -11, -10)];
      faceXY([...c, ...MX(c)], Hm.cuivre, 0.03, facesRaccords);
    }
    const facesChapeau = groupeFaces();
    faceXY([R(-32, -9, 52, 58), R(9, 32, 52, 58), R(-15, -9, 58, 70), R(9, 15, 58, 70), R(-14.72, -6.8, 70, 75), R(6.8, 14.72, 70, 75)], Hm.laiton, 0.03, facesChapeau);
    const facesClapet = groupeFaces();                                          /* suit le clapet */
    faceXY([R(-11.5, 11.5, 0, 2)], Hm.caout, 0.04, facesClapet);
    faceXY([R(-11.5, 11.5, 2, 9), R(-8.6, -6.6, 9, 23), R(6.6, 8.6, 9, 23), R(-R_R, R_R, 9, PIN_H)], Hm.inox, 0.04, facesClapet);
    const facesVolant = groupeFaces();
    faceXY([R(-R_T, -R_TI, Y_T0, Y_T1), R(R_TI, R_T, Y_T0, Y_T1)], Hm.inox, 0.04, facesVolant);
    faceXY([R(-30, -R_T, 78, 92), R(R_T, 30, 78, 92), R(-13, -R_T, 92, 96), R(R_T, 13, 92, 96)], Hm.marine, 0.04, facesVolant);
    const facesTige = groupeFaces();                                            /* suit la tige */
    faceXY([R(-R_R, R_R, -L_R / 2, L_R / 2)], Hm.tige, 0.05, facesTige);

    /* une prise : sa paroi, son capuchon (ou son raccord rapide) et le canal qui la relie à la chambre */
    const eauAmont = A.eau(0x4b84cc), eauAval = A.eau(0x4b84cc);
    const facesPrises = {}, canaux = { amont: null, aval: null }, faceCap = {}, faceRac = {};
    [-1, 1].forEach(sens => {
      const nom = sens < 0 ? 'amont' : 'aval', g = facesPrises[nom] = groupeFaces();
      const Pt = new T.Vector2(sens * 32, 24), d = new T.Vector2(sens * 0.7071, 0.7071), n = new T.Vector2(d.y, -d.x);
      const bande = (s0, s1, v0, v1) => [[s0, v0], [s1, v0], [s1, v1], [s0, v1]].map(([s, v]) => [Pt.x + s * d.x + v * n.x, Pt.y + s * d.y + v * n.y]);
      faceXY([bande(-4, 14, 2.5, 5.5), bande(-4, 14, -5.5, -2.5)], Hm.laiton, 0.04, g);
      faceCap[nom] = faceXY([bande(14, 21, -6.8, 6.8)], Hm.marine, 0.04, g);
      faceRac[nom] = faceXY([bande(12.5, 21.5, -6.4, 6.4), bande(21.5, 26, -3.2, 3.2)], Hm.noir, 0.04, g); faceRac[nom].visible = false;
      const Pg = new T.Vector2(-32, 24), dg = new T.Vector2(-0.7071, 0.7071), ng = new T.Vector2(0.7071, 0.7071);
      const bout = v => [Pg.x + 14 * dg.x + v * ng.x, Pg.y + 14 * dg.y + v * ng.y];
      const lg = [[-27, 15.46], bout(-2.5), bout(2.5), [-27, 22.54]];
      canaux[nom] = sens < 0 ? lg : lg.map(q => [-q[0], q[1]]);
    });

    const facesEau = groupeFaces();
    faceXY([R(-TUBE, -27, -10, 10), R(-27, 9, -22, 23), R(-7.5, 7.5, 23, 28), canaux.amont], eauAmont, -0.3, facesEau);
    faceXY([R(-27, 27, 28, 52), R(14, 27, -22, 28), R(27, TUBE, -10, 10), canaux.aval], eauAval, -0.3, facesEau);

    /* ================================================================ L'EAU QUI CIRCULE
       Moins de grains quand le débit baisse ; vitesse moyenne proportionnelle au débit ; dans le passage rétréci
       entre clapet et siège, l'eau file plus vite (zone d'accélération). */
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const cAmont = new T.Color(0x2a5aa8), cAval = new T.Color(0x2a5aa8), cClair = new T.Color(0xa7d0f5);
    const fluxEau = A.flux(36, 60, (p, co) => {
      const t = clamp(Math.max(p.x / 6, (p.y - 25) / 4), 0, 1), s = t * t * (3 - 2 * t);
      co.copy(cAmont).lerp(cAval, s);
    });
    racine.add(fluxEau.objet);

    /* ================================================================ L'ÉTAT */
    const E = {
      p: TOURS_MAX, pCible: TOURS_MAX,      /* tours ouverts : affichés / demandés */
      butee: null,                          /* le préréglage bloqué (tours), ou null */
      rodY: ROD_LIBRE, appareil: false,
      cle: { etat: 'hors', t: 0 },
      seq: null, pause: 0,
      coupe: false, demonte: false
    };
    let hPrec = -1;
    const limite = () => (E.butee === null ? TOURS_MAX : E.butee);
    const cibleEff = () => Math.min(E.pCible, limite());
    const arrondi = x => Math.round(x * 10) / 10;

    const ecrireAppareil = () => {
      if (!E.appareil) return;
      const p = cibleEff();
      appareil.userData.ecran.ecrire(['Δp  ' + nb(ecartDe(p), 1) + ' kPa', 'Débit  ' + nb(debitDe(p) * 1000, 0) + ' l/h'], { aligne: 'left', grand: false });
    };
    const majMesures = () => {
      const p = cibleEff(), kv = kvDe(p);
      ctx.mesures([
        { libelle: 'La position du volant', valeur: nb(p, 1) + ' tours' },
        { libelle: 'Le Kv de la vanne', valeur: nb(kv, 3) + ' m³/h' },
        { libelle: 'L’écart de pression de la vanne', valeur: nb(ecartDe(p), 1) + ' kPa' },
        { libelle: 'Le débit de la branche', valeur: nb(debitDe(p) * 1000, 0) + ' l/h' }
      ]);
    };
    const majTexte = () => {
      majMesures(); ecrireAppareil();
      const p = cibleEff(), q = nb(debitDe(p) * 1000, 0), dp = nb(ecartDe(p), 1);
      let t;
      if (E.butee !== null) t = '<strong>Préréglage bloqué à ' + nb(E.butee, 1) + ' tours.</strong> La tige intérieure est vissée jusqu’à la butée : le volant ne peut plus s’ouvrir au-delà de ce chiffre. Position du volant : ' + nb(p, 1) + '. Débit : ' + q + ' l/h.';
      else if (p <= 0) t = '<strong>Vanne fermée (0,0).</strong> Le clapet est posé sur le siège : l’eau ne passe pas.';
      else t = '<strong>Volant à ' + nb(p, 1) + ' tour' + (p >= 2 ? 's' : '') + '.</strong> Le clapet est à ' + nb(hDe(p), 1) + ' mm du siège. D’après la notice, le Kv vaut ' + nb(kvDe(p), 3) + ' : la branche reçoit ' + q + ' l/h.';
      if (E.appareil) t += ' L’appareil affiche ' + dp + ' kPa et ' + q + ' l/h.';
      ctx.dire(t);
    };

    const majFlux = h => {
      const p = h / PAS, q = debitDe(p), part = Math.pow(q / Q_MAX, 0.7), gy = Y_SIEGE + h / 2;
      if (Math.abs(h - hPrec) > 0.02) {
        fluxEau.trajet([V(-TUBE + 4, 0, 0), V(-40, 0, 0), V(-26, 0, 0), V(-14, 4, 0), V(-5, 14, 0), V(0, 22, 0), V(2, 26, 0), V(6, gy, 0), V(14, gy + 3, 0), V(19, Math.max(gy + 4, 33), 0), V(21, 26, 0), V(20.5, 12, 0), V(21, 2, 0), V(28, 0, 0), V(TUBE - 4, 0, 0)],
          fr => [{ u0: fr(V(2, 26, 0)), u1: fr(V(19, Math.max(gy + 4, 33), 0)), k: clamp(6 / Math.max(h, 0.3), 1, 7) }]);
        hPrec = h;
      }
      fluxEau.regler(part);
      fluxEau.vitesse(70 * q / Q_MAX);
      const t = clamp(ecartDe(p) / P_DISPO / 100, 0.08, 1);
      cAval.copy(cAmont).lerp(cClair, t);
      eauAval.color.setHex(0x4b84cc).lerp(new T.Color(0xcfe5f8), t);
    };

    /* le volant (et la tige, le clapet qui le suivent) à p tours */
    const poserP = p => {
      const h = hDe(p);
      clapet.position.y = Y_SIEGE + h; facesClapet.position.y = Y_SIEGE + h;
      volant.rotation.y = p * 360 * D;
      poserTige();
      const entiers = Math.floor(p + 1e-6);
      if (E.entiers !== entiers) { E.entiers = entiers; fenetre.ecrire([String(entiers)], { aligne: 'center' }); }
      majFlux(h);
    };
    /* la tige repose sur le poussoir si elle l'a rejoint ; la clé tourne en même temps qu'elle */
    const poserTige = () => {
      const bas = Math.max(E.rodY, yTige(E.p));
      tige.position.y = bas + L_R / 2; facesTige.position.y = bas + L_R / 2;
      const aTour = -(ROD_LIBRE - E.rodY) / PITCH * 360 * D;
      tige.rotation.y = E.p * 360 * D + aTour;
      cle.rotation.y = E.p * 360 * D + aTour;
      return aTour;
    };
    const poserCle = off => { cle.position.set(0, tige.position.y + L_R / 2 - 3.5 + off, 0); };

    const appliquerCoupe = actif => {
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [faces, fluxEau.objet, cle, appareil].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.clipShadows = true; m.needsUpdate = true; } });
      });
      faces.visible = actif;
    };
    const majVisibilite = () => {
      fluxEau.objet.visible = E.coupe && !E.demonte;
      appareil.visible = E.appareil && !E.demonte;
      cle.visible = E.cle.etat !== 'hors' && !E.demonte;
      ['amont', 'aval'].forEach(n => {
        capuchons[n].visible = !E.appareil; raccordsMesure[n].visible = E.appareil;
        faceCap[n].visible = !E.appareil; faceRac[n].visible = E.appareil;
      });
    };
    const basculerCoupe = on => { E.coupe = on; appliquerCoupe(on && !E.demonte); majVisibilite(); };

    poserP(E.p); poserCle(0); majTexte(); majVisibilite();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps de la vanne', objets: [corps, facesCorps], desc: 'La pièce en laiton, pleine d’eau. Une flèche en relief donne le sens de l’eau : elle entre à gauche, passe sous le clapet et sort à droite.' },
      { id: 'siege', nom: 'Le siège', objets: [siege, facesSiege], desc: 'Un plateau percé d’un trou rond. Toute l’eau passe par ce trou : le clapet vient s’y poser pour fermer.' },
      { id: 'clapet', nom: 'Le clapet et son poussoir', objets: [clapet, facesClapet], desc: 'Il monte et descend au-dessus du siège : plus il est près, plus le passage est étroit. Le petit poussoir qui monte dans la broche sert de butée.' },
      { id: 'volant', nom: 'Le volant et sa broche', objets: [volant, facesVolant], desc: 'Le volant fait tourner la broche : à chaque tour, le clapet monte ou descend de 2 mm. Les tours entiers se lisent dans la fenêtre, les dixièmes sur le volant.' },
      { id: 'tige', nom: 'La tige intérieure de préréglage', objets: [tige, facesTige], desc: 'Au centre du volant. Avec une clé six pans de 3 mm, on la visse jusqu’à ce qu’elle touche le poussoir : le clapet ne monte plus au-delà, le réglage est mémorisé.' },
      { id: 'chapeau', nom: 'Le chapeau, le repère et la fenêtre', objets: [chapeau, facesChapeau], desc: 'Il ferme le corps par le haut et ne tourne pas. Le repère orange et la petite fenêtre servent à lire la position du volant.' },
      { id: 'priseAmont', nom: 'La prise avant le clapet', objets: [prises.amont, facesPrises.amont], desc: 'Une prise de pression avec son capuchon. On dévisse le capuchon pour brancher l’appareil de mesure : c’est là que la pression est la plus forte.' },
      { id: 'priseAval', nom: 'La prise après le clapet', objets: [prises.aval, facesPrises.aval], desc: 'La même, côté sortie. L’écart de pression entre les deux prises permet de calculer le débit.' },
      { id: 'raccords', nom: 'Les raccords et les tubes', objets: [raccords, facesRaccords], desc: 'Un écrou à six pans et un tube de cuivre de chaque côté : la vanne se pose dans le circuit, l’eau entre à gauche.' },
      { id: 'appareil', nom: 'L’appareil de mesure', objets: [appareil], desc: 'Un boîtier relié aux deux prises par deux flexibles. Il mesure l’écart de pression et en déduit le débit.' }
    ];

    /* ---------------------------------------------------------------- commandes (libellés de la station) */
    const commandes = [
      { id: 'position', type: 'curseur', libelle: 'Position de la vanne', min: 0, max: TOURS_MAX, pas: 0.1, valeur: TOURS_MAX, format: v => nb(v, 1) + ' tours' },
      { id: 'mesure', type: 'choix', valeur: 'sans', options: [['sans', 'Sans appareil'], ['avec', 'Appareil de mesure branché']] },
      { id: 'bloquer', type: 'action', libelle: 'Bloquer le préréglage', accent: true },
      { id: 'fermer', type: 'action', libelle: 'Fermer la vanne' },
      { id: 'rouvrir', type: 'action', libelle: 'Rouvrir jusqu’à la butée' }
    ];

    const COUPE = { azimut: 0, elevation: 7, zoom: 1.45, cible: [0, 44, 0] };
    const etapes = [
      { titre: 'On ferme complètement la vanne', piece: 'volant', voirDedans: true, eclate: false, actions: [['mesure', 'sans'], ['butee', 'libre'], ['position', 0]],
        vue: COUPE,
        texte: 'On tourne le volant à droite jusqu’au bout : l’indicateur lit 0,0. Le clapet est posé sur le siège, l’eau ne passe plus. C’est le point de départ du réglage.' },
      { titre: 'On ouvre à la position voulue : 2,3', piece: 'clapet', voirDedans: true, eclate: false, actions: [['position', 2.3]],
        vue: COUPE,
        texte: 'On tourne le volant à gauche jusqu’à 2,3 : 2 tours entiers dans la fenêtre, 3 dixièmes sur le volant. Le clapet monte et l’eau passe.' },
      { titre: 'On visse la tige intérieure jusqu’à la butée', piece: 'tige', voirDedans: true, eclate: false, actions: [['butee', 'bloquee']],
        vue: { azimut: 0, elevation: 6, zoom: 1.5, cible: [0, 74, 0] },
        texte: 'Au centre du volant, la clé six pans de 3 mm visse la tige vers le bas. Elle s’arrête quand elle touche le poussoir du clapet : le réglage est mémorisé.' },
      { titre: 'On vérifie : on ferme, puis on rouvre', piece: 'volant', voirDedans: true, eclate: false, actions: [['verifier', true]], duree: 8,
        vue: { azimut: 0, elevation: 6, zoom: 1.75, cible: [0, 58, 0] },
        texte: 'Le volant ferme la vanne, puis la rouvre : il s’arrête tout seul à 2,3. La tige touche le poussoir, le clapet ne monte pas plus haut.' },
      { titre: 'On branche l’appareil de mesure', piece: 'priseAmont', voirDedans: false, eclate: false, actions: [['mesure', 'avec']],
        vue: { azimut: 12, elevation: 21, zoom: 1.0, cible: [0, 22, 60] },
        texte: 'On dévisse les deux capuchons et on relie les prises à l’appareil par deux flexibles. Il affiche l’écart de pression et le débit calculé, en l/h : on les lit sans faire de calcul.' },
      { titre: 'Démonté : le volant, la tige, le clapet', piece: 'clapet', voirDedans: false, eclate: true, actions: [['mesure', 'sans']],
        texte: 'On retire le volant avec sa tige, puis le chapeau. Le clapet et son poussoir sortent par le haut ; le corps reste sur le tuyau.' }
    ];

    const eclate = [
      { objets: [tige], vers: [0, 160, 0], debut: 0, fin: 0.4 },
      { objets: [volant], vers: [0, 105, 0], debut: 0.15, fin: 0.6 },
      { objets: [chapeau], vers: [0, 62, 0], debut: 0.4, fin: 0.8 },
      { objets: [clapet], vers: [0, 40, 0], debut: 0.6, fin: 1 }
    ];

    const poserEtat = () => {          /* après un changement d'état : textes, appareil, visibilité */
      majTexte(); majVisibilite();
    };

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 34, elevation: 16, zoom: 0.62, cible: [0, 120, 0] },
      vue: ctx.mode === 'decouvrir' ? { azimut: 30, elevation: 20, zoom: 1.35, cible: [0, 40, 0], cadre: [corps, chapeau, volant, raccords], marge: 1.0 }
                                    : { azimut: 0, elevation: 7, zoom: 1.45, cible: [0, 44, 0], cadre: [corps, chapeau, volant, raccords], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'position') {
          E.seq = null;
          E.pCible = clamp(arrondi(+v), 0, TOURS_MAX);
          if (E.pCible > limite()) ctx.regler('position', limite());
        } else if (id === 'mesure') {
          E.appareil = (v === 'avec'); ctx.regler('mesure', v);
        } else if (id === 'bloquer' || id === 'butee') {
          const bloquer = id === 'bloquer' ? E.butee === null : v === 'bloquee';
          if (bloquer) { E.butee = cibleEff(); E.pCible = Math.min(E.pCible, E.butee); }
          else E.butee = null;
          ctx.regler('bloquer', undefined, { libelle: E.butee === null ? 'Bloquer le préréglage' : 'Libérer le préréglage' });
        } else if (id === 'fermer') {
          E.seq = null; E.pCible = 0; ctx.regler('position', 0);
        } else if (id === 'rouvrir') {
          E.seq = null; E.pCible = TOURS_MAX; ctx.regler('position', limite());
        } else if (id === 'verifier') {
          E.seq = 'ferme'; E.pCible = 0; ctx.regler('position', 0);
        }
        poserEtat(); ctx.reveiller();
      },
      surEclate(on) { E.demonte = on; appliquerCoupe(E.coupe && !on); majVisibilite(); },
      animer(dt) {
        let actif = false;
        /* la séquence « on ferme puis on rouvre » */
        if (E.seq === 'ferme' && E.p <= 1e-3) { E.seq = 'pause'; E.pause = 0.35; }
        if (E.seq === 'pause') { E.pause -= dt; actif = true; if (E.pause <= 0) { E.seq = 'ouvre'; E.pCible = TOURS_MAX; ctx.regler('position', limite()); poserEtat(); } }
        if (E.seq === 'ouvre' && Math.abs(E.p - cibleEff()) < 1e-3) E.seq = null;
        /* le volant : tourne à vitesse constante, s'arrête net à la butée */
        const c = cibleEff();
        if (Math.abs(c - E.p) > 1e-4) {
          const d = 2.4 * dt; E.p = E.p < c ? Math.min(c, E.p + d) : Math.max(c, E.p - d);
          poserP(E.p); actif = true;
        }
        /* la tige et la clé : la clé entre, visse (ou dévisse) la tige, ressort */
        const cibleRod = E.butee === null ? ROD_LIBRE : yTige(E.butee);
        const K_ = E.cle;
        if (K_.etat === 'hors' && Math.abs(E.rodY - cibleRod) > 1e-3) { K_.etat = 'entre'; K_.t = 0; majVisibilite(); }
        if (K_.etat === 'entre') {
          K_.t = Math.min(1, K_.t + dt / 0.3); poserCle(45 * (1 - K_.t) * (1 - K_.t)); actif = true;
          if (K_.t >= 1) K_.etat = 'tourne';
        } else if (K_.etat === 'tourne') {
          const d = 9 * dt; E.rodY = E.rodY < cibleRod ? Math.min(cibleRod, E.rodY + d) : Math.max(cibleRod, E.rodY - d);
          poserTige(); poserCle(0); actif = true;
          if (Math.abs(E.rodY - cibleRod) < 1e-3) { K_.etat = 'sort'; K_.t = 0; }
        } else if (K_.etat === 'sort') {
          K_.t = Math.min(1, K_.t + dt / 0.3); poserCle(45 * K_.t * K_.t); actif = true;
          if (K_.t >= 1) { K_.etat = 'hors'; majVisibilite(); }
        } else if (Math.abs(E.rodY - cibleRod) <= 1e-3) { poserTige(); }
        const visible = E.coupe && !E.demonte;
        if (visible) fluxEau.animer(dt);
        return actif || visible;
      }
    };
  }, { famille: 'vannes', titre: 'Régler une vanne d’équilibrage', stations: ['reglage-equilibrage'] });
})();
