/* HydroMétro 3D — famille « ballons » : le ballon tampon (200 L, quatre piquages) et la bouteille de découplage.
   Unités : mm. Repère : X le long des tuyaux (production à gauche, -X ; bâtiment à droite, +X),
   Y vers le haut (le sol est à y = 0), Z vers l'élève (+Z = face avant). Le plan de coupe est z = 0 :
   il passe par l'axe du ballon ET par les quatre piquages, la moitié avant est retirée.

   CE QUE L'ÉLÈVE DOIT VOIR : l'eau chaude reste en haut, l'eau froide en bas, avec une zone de
   transition entre les deux ; et la limite entre le chaud et le froid BOUGE selon ce que la production
   donne et ce que le bâtiment prend (descend en charge, monte en décharge, reste en équilibre).

   « Voir en coupe » tranche tout par le plan z = 0 : les faces coupées sont hachurées comme sur un
   dessin de définition ; l'eau y est teintée (rouge pâle au chaud, bleu pâle au froid) ; des filets d'eau
   continus, où des bandes avancent, montrent le trajet de l'eau : leur couleur suit la température du point où ils passent. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ====================================================================== aides communes
     (recopiées de l'étalon pompes.js, mais dans le plan x–y : la coupe est ici z = 0) */
  const aides = (T, K) => {
    const hachures = (fond, trait, pas, epaisseur) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = epaisseur || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas); t.anisotropy = 4;
      return new T.MeshStandardMaterial({ map: t, roughness: 0.75, metalness: 0.05, side: T.DoubleSide });
    };
    const uni = (couleur, extra) => new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: 0.6, side: T.DoubleSide }, extra || {}));
    /* une teinte d'eau pour les faces de coupe : éclaircie, translucide, sans éclairage (lecture franche) */
    const BLANC = new T.Color(0xffffff);
    const pastel = hex => new T.Color(hex).lerp(BLANC, 0.38);
    const eauMat = hex => new T.MeshBasicMaterial({ color: pastel(hex), transparent: true, opacity: 0.82, depthWrite: false, side: T.DoubleSide, toneMapped: false });
    const nettoyer = p => p.filter((q, i) => { const r = p[(i + p.length - 1) % p.length]; return Math.abs(q[0] - r[0]) + Math.abs(q[1] - r[1]) > 1e-6; });
    const faceDe = (polys, mat, z, groupe) => {
      const formes = polys.map(p => new T.Shape(nettoyer(p).map(q => new T.Vector2(q[0], q[1]))));
      const g = new T.ShapeGeometry(formes);
      const m = new T.Mesh(g, mat); m.position.z = z;
      m.userData.sansOmbre = true; m.userData.sansCoupe = true; m.castShadow = false; if (mat.transparent) m.userData.voile = true;
      if (groupe) groupe.add(m); return m;
    };
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    /* un rectangle du côté s (+1 droite, -1 gauche) : m0, m1 = distances à l'axe */
    const rx = (s, m0, m1, y0, y1) => rect(s * m0, s * m1, y0, y1);
    /* découpe d'un polygone par une bande horizontale (Sutherland–Hodgman, deux demi-plans) */
    const garder = (poly, f) => {
      const out = [];
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i], b = poly[(i + 1) % poly.length], fa = f(a), fb = f(b);
        if (fa >= 0) out.push(a);
        if ((fa >= 0) !== (fb >= 0)) { const u = fa / (fa - fb); out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]); }
      }
      return out;
    };
    const tranche = (poly, y0, y1) => garder(garder(poly, p => p[1] - y0), p => y1 - p[1]);
    const aire = p => { let s = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; };
    /* le polygone privé de ses encoches (là où un tuyau, une douille le traverse) : liste de morceaux */
    const sans = (poly, encoches) => {
      const b = [-1e9]; encoches.slice().sort((p, q) => p[0] - q[0]).forEach(e => { b.push(e[0], e[1]); }); b.push(1e9);
      const out = [];
      for (let i = 0; i < b.length; i += 2) { const s = tranche(poly, b[i], b[i + 1]); if (s.length >= 3 && aire(s) > 0.5) out.push(s); }
      return out;
    };
    const miroir = p => p.map(q => [-q[0], q[1]]);
    /* le profil d'une cuve à fonds elliptiques, de HAUT en BAS, depuis x = xs (autour du trou central) */
    const fabChem = (Ri, hd, yB, yT) => (off, xs) => {
      const a = Ri + off, b = hd + off, n = 14, th0 = Math.acos(Math.min(1, xs / a)), pts = [];
      for (let k = 0; k <= n; k++) { const th = th0 * (1 - k / n); pts.push([a * Math.cos(th), yT + b * Math.sin(th)]); }
      for (let k = 0; k <= n; k++) { const th = th0 * (k / n); pts.push([a * Math.cos(th), yB - b * Math.sin(th)]); }
      return pts;
    };
    return { hachures, uni, pastel, eauMat, faceDe, rect, rx, sans, miroir, fabChem };
  };

  /* ====================================================================== LE BALLON TAMPON */
  Electro3D.definir('ballonTampon', (T, K, ctx) => {
    const A = aides(T, K), faceDe = A.faceDe, N = HydroNappe(T, K);
    const M = K.mat;
    const racine = new T.Group();
    const D = Math.PI / 180;

    /* ---------------------------------------------------------------- cotes (mm)
       200 L : Ø intérieur 500, partie droite 920, deux fonds bombés de 70 → 0,2 m³.
       Tôle de 6 (un peu plus que la réalité, pour que la coupe se lise), mousse de 40, jaquette de 4. */
    const Ri = 250, t = 6, Ro = Ri + t, hd = 70, yB = 240, yT = 1160;
    const tipB = yB - hd, tipT = yT + hd;
    const PH = 1050, PB = 340;                  /* axes des piquages : départs en haut, retours en bas */
    const WL = 770, WR = 610;                   /* doigts de gant : à gauche et à droite */
    const XP = 560;                             /* bout des tuyaux */
    const NMIN = 410, NMAX = 960;               /* course de la limite chaud / froid */
    const ZT = 70;                              /* demi-épaisseur de la zone de transition */
    const COUDE = 36;                           /* rayon d'arrondi de la jaquette */

    /* ---------------------------------------------------------------- matières à soi */
    const peint = K.propre(M.fonte); peint.color.setHex(0xa7b2bd); peint.side = T.DoubleSide;
    const acierNoir = K.propre(M.fonte); acierNoir.color.setHex(0x5c6670); acierNoir.metalness = 0.4; acierNoir.side = T.DoubleSide;
    const mousse = K.propre(M.sable); mousse.color.setHex(0xf1e3b4); mousse.side = T.DoubleSide;
    const jaq = K.propre(M.plastique); jaq.color.setHex(0x7f93a9); jaq.roughness = 0.62; jaq.metalness = 0; jaq.side = T.DoubleSide;
    const laiton = K.propre(M.laiton); laiton.side = T.DoubleSide;
    const inox = K.propre(M.acier); inox.color.setHex(0xd5dade); inox.side = T.DoubleSide;
    const noir = K.propre(M.plastiqueNoir); noir.side = T.DoubleSide;
    const caoutchouc = K.propre(M.caoutchouc);
    const rouge = K.propre(M.plastiqueRouge); rouge.color.setHex(0xd9472b);
    const bleu = K.propre(M.plastiqueBleu); bleu.color.setHex(0x2f7fd6);
    [peint, acierNoir, mousse, jaq, laiton, inox, noir].forEach(m => { m.clipShadows = true; });

    /* ---------------------------------------------------------------- tracés (r, y) du profil */
    const pt2 = a => a.map(p => new T.Vector2(p[0], p[1]));
    /* la cuve : fonds elliptiques, de x = xs (autour du trou central) jusqu'à la paroi, de HAUT en BAS */
    const chemCuve = (off, xs) => {
      const a = Ri + off, b = hd + off, n = 14, th0 = Math.acos(Math.min(1, xs / a)), pts = [];
      for (let k = 0; k <= n; k++) { const th = th0 * (1 - k / n); pts.push([a * Math.cos(th), yT + b * Math.sin(th)]); }
      for (let k = 0; k <= n; k++) { const th = th0 * (k / n); pts.push([a * Math.cos(th), yB - b * Math.sin(th)]); }
      return pts;
    };
    /* la jaquette (et la mousse) : un cylindre aux angles arrondis, de HAUT en BAS */
    const chemArrondi = (R, yb, yt, rc, xs) => {
      const pts = [[xs, yt], [R - rc, yt]];
      for (let k = 1; k <= 8; k++) { const a = 90 * D * (1 - k / 8); pts.push([R - rc + rc * Math.cos(a), yt - rc + rc * Math.sin(a)]); }
      pts.push([R, yb + rc]);
      for (let k = 1; k <= 8; k++) { const a = -90 * D * k / 8; pts.push([R - rc + rc * Math.cos(a), yb + rc + rc * Math.sin(a)]); }
      pts.push([xs, yb]);
      return pts;
    };
    const JAQ = { R: 300, yb: 124, yt: 1279, rc: COUDE, ep: 4 };
    const MOU = { R: JAQ.R - JAQ.ep - 0.4, yb: JAQ.yb + JAQ.ep + 0.4, yt: JAQ.yt - JAQ.ep - 0.4, rc: COUDE - JAQ.ep - 0.4 };

    /* ---------------------------------------------------------------- géométries */
    const anneauX = (rExt, rInt, x0, x1, y, mat, seg) => { const g = K.anneau(rExt, rInt, Math.abs(x1 - x0), seg || 36); g.rotateZ(Math.PI / 2); g.translate((x0 + x1) / 2, y, 0); return new T.Mesh(g, mat); };
    const cylY = (r, y0, y1, mat, seg) => new T.Mesh(K.cylindre(r, y1 - y0, seg || 28), mat).translateY((y0 + y1) / 2);
    const anneauY = (rExt, rInt, y0, y1, mat, seg) => new T.Mesh(K.anneau(rExt, rInt, y1 - y0, seg || 28), mat).translateY((y0 + y1) / 2);
    const lathe = (pts, mat, seg, phi0, dphi) => new T.Mesh(new T.LatheGeometry(pt2(pts.slice().reverse()), seg, phi0 === undefined ? 0 : phi0, dphi === undefined ? Math.PI * 2 : dphi), mat);
    const AV = [-Math.PI / 2, Math.PI], AR = [Math.PI / 2, Math.PI];   /* moitié avant (z > 0) / arrière */

    /* ================================================================ LA CUVE */
    const cuve = new T.Group();
    cuve.add(lathe(chemCuve(t / 2, 0), peint, 72));
    cuve.add(anneauY(15, 9, tipT - 8, 1290, acierNoir, 24));                       /* douille du purgeur */
    cuve.add(anneauY(15, 9, 112, tipB + 8, acierNoir, 24));                         /* douille de la vidange */
    racine.add(cuve);

    const pieds = new T.Group();
    [0, 120, 240].forEach(a => {
      const x = Math.sin(a * D) * 185, z = Math.cos(a * D) * 185;
      const jambe = K.mesh(K.boite(38, 184, 38, 5), acierNoir, x, 92, z);
      const patin = K.mesh(K.cylindre(30, 10, 28), caoutchouc, x, 5, z);
      pieds.add(jambe, patin);
    });
    racine.add(pieds);

    /* ================================================================ LES QUATRE PIQUAGES */
    const piquages = new T.Group();
    [-1, 1].forEach(s => [PH, PB].forEach(yp => {
      piquages.add(anneauX(28, 19, s * Ro, s * 306, yp, acierNoir, 36));            /* manchon soudé, traverse mousse et jaquette */
      piquages.add(anneauX(24, 19, s * 306, s * XP, yp, acierNoir, 36));            /* le tuyau */
      piquages.add(anneauX(50, 24, s * (XP - 12), s * XP, yp, acierNoir, 40));      /* la bride */
      piquages.add(anneauX(26.5, 24, s * 380, s * 400, yp, yp === PH ? rouge : bleu, 36));   /* ruban de repérage : rouge au départ, bleu au retour */
    }));
    racine.add(piquages);

    /* ================================================================ LES DOIGTS DE GANT ET LES SONDES */
    const sondes = [-1, 1].map(s => {
      const yw = s > 0 ? WR : WL, g = new T.Group();
      g.add(anneauX(7.6, 4.6, s * 155, s * 340, yw, inox, 20));                      /* le doigt de gant : un tube fermé au bout */
      const fond = new T.Mesh(new T.CircleGeometry(7.6, 20), inox); fond.rotation.y = Math.PI / 2; fond.position.set(s * 155, yw, 0); g.add(fond);
      g.add(anneauX(14, 0.01, s * 340, s * 364, yw, noir, 24));                       /* la tête de la sonde */
      g.add(anneauX(2.2, 0.01, s * 170, s * 350, yw, K.propre(M.acierSombre), 12));   /* la sonde, glissée dedans */
      const cable = K.fil([[s * 364, yw, 0], [s * 395, yw - 10, -10], [s * 420, yw - 90, -40], [s * 432, yw - 260, -70]], 3.2, noir, { radial: 8 });
      g.add(cable.mesh);
      racine.add(g); return g;
    });
    const douilles = new T.Group();
    [-1, 1].forEach(s => douilles.add(anneauX(15, 8, s * Ro, s * 306, s > 0 ? WR : WL, acierNoir, 24)));
    racine.add(douilles);

    /* ================================================================ LE PURGEUR ET LA VIDANGE */
    const purgeur = new T.Group();
    purgeur.add(cylY(17, 1290, 1335, laiton, 32));
    purgeur.add(cylY(12, 1335, 1352, noir, 24));
    racine.add(purgeur);

    const vidange = new T.Group();
    vidange.add(cylY(16, 84, 112, laiton, 28));
    const sortie = new T.Mesh(K.cylindre(9, 40, 20), laiton); sortie.rotation.x = Math.PI / 2; sortie.position.set(0, 98, -36); vidange.add(sortie);
    const levier = K.mesh(K.boite(54, 8, 14, 2), K.propre(M.plastiqueBleu), 0, 98, 0); levier.position.set(-34, 98, 18); vidange.add(levier);
    racine.add(vidange);

    /* ================================================================ LA MOUSSE ET LA JAQUETTE — en deux moitiés (avant / arrière) :
       la jaquette s'ouvre par l'arrière ; c'est aussi ce qui permet de les écarter au démontage */
    const demiCoques = (chemOut, chemIn, mat, seg) => [AV, AR].map(ang => {
      const g = new T.Group();
      g.add(lathe(chemOut, mat, seg, ang[0], ang[1]));
      if (chemIn) g.add(lathe(chemIn, mat, seg, ang[0], ang[1]));
      racine.add(g); return g;
    });
    const [mousseAv, mousseAr] = demiCoques(chemArrondi(MOU.R, MOU.yb, MOU.yt, MOU.rc, 0), chemCuve(t + 0.3, 0), mousse, 36);
    const [jaqAv, jaqAr] = demiCoques(chemArrondi(JAQ.R, JAQ.yb, JAQ.yt, JAQ.rc, 0), chemArrondi(JAQ.R - JAQ.ep, JAQ.yb + JAQ.ep, JAQ.yt - JAQ.ep, JAQ.rc - JAQ.ep, 0), jaq, 36);

    /* ================================================================ L'EAU : la face de coupe qui change de couleur */
    const CH = new T.Color(0xd9472b), FR = new T.Color(0x2f7fd6), tmp = new T.Color(), tmp2 = new T.Color();
    const ET = { niveau: 650, regime: 'equilibre', p: 0.75, s: 0.75, coupe: false, demonte: false, limite: '', phrase: '' };
    const frac = y => { const x = K.clamp((y - (ET.niveau - ZT)) / (2 * ZT), 0, 1); return x * x * (3 - 2 * x); };
    const coulEau = y => tmp.copy(FR).lerp(CH, frac(y));

    const rangs = [];
    for (let k = 0; k <= 14; k++) { const th = k / 14 * Math.PI / 2; rangs.push({ y: yB - hd * Math.cos(th), w: Ri * Math.sin(th) }); }
    for (let y = yB + 20; y < yT; y += 20) rangs.push({ y, w: Ri });
    for (let k = 0; k <= 14; k++) { const th = k / 14 * Math.PI / 2; rangs.push({ y: yT + hd * Math.sin(th), w: Ri * Math.cos(th) }); }
    const nR = rangs.length, pos = new Float32Array(nR * 6), col = new Float32Array(nR * 6), idx = [];
    rangs.forEach((r, i) => { pos.set([-r.w, r.y, 0, r.w, r.y, 0], i * 6); });
    for (let i = 0; i < nR - 1; i++) { const a = 2 * i, b = a + 1, c = a + 2, d = a + 3; idx.push(a, b, c, b, d, c); }
    const geoEau = new T.BufferGeometry();
    geoEau.setAttribute('position', new T.BufferAttribute(pos, 3));
    geoEau.setAttribute('color', new T.BufferAttribute(col, 3));
    geoEau.setIndex(idx);
    const matEau = new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.82, depthWrite: false, side: T.DoubleSide, toneMapped: false });
    const eau = new T.Mesh(geoEau, matEau); eau.position.z = 0.06;
    eau.userData.sansOmbre = true; eau.userData.sansCoupe = true; eau.userData.voile = true; eau.castShadow = false;
    const BL = new T.Color(0xffffff);
    let niveauTeint = ET.niveau;                          /* le niveau pour lequel les filets d'eau ont leur teinte */
    const majEau = () => {
      rangs.forEach((r, i) => { tmp2.copy(coulEau(r.y)).lerp(BL, 0.38); col.set([tmp2.r, tmp2.g, tmp2.b, tmp2.r, tmp2.g, tmp2.b], i * 6); });
      geoEau.attributes.color.needsUpdate = true;
      if (Math.abs(ET.niveau - niveauTeint) > 0.05) { niveauTeint = ET.niveau; filets.forEach(g => g.teindre()); }
    };

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const H = {
      acier: A.hachures('#8d9aa9', '#2c3640', 12),
      mousse: A.hachures('#f7edc9', '#b8964a', 20, 4),
      jaq: A.uni(0x7a8a9d),
      laiton: A.hachures('#b08f45', '#6a511c', 8),
      inox: A.uni(0xa9b1b9, { metalness: 0.3, roughness: 0.4 }),
      air: A.uni(0xf4f0e6),
      noir: A.uni(0x2a2d31),
      tige: A.uni(0x7f8790),
      rouge: A.uni(0xd9472b), bleu: A.uni(0x2f7fd6),
      chaud: A.eauMat(0xd9472b), froid: A.eauMat(0x2f7fd6)
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const groupe = () => { const g = new T.Group(); faces.add(g); return g; };
    const fEau = groupe(), fCuve = groupe(), fPiq = groupe(), fSondes = groupe(), fPurgeur = groupe(), fVidange = groupe();
    fEau.add(eau);

    const encochesCoque = s => [[PB - 28, PB + 28], [PH - 28, PH + 28], [(s > 0 ? WR : WL) - 15, (s > 0 ? WR : WL) + 15]];
    const encochesCuve = s => [[PB - 19, PB + 19], [PH - 19, PH + 19], [(s > 0 ? WR : WL) - 8, (s > 0 ? WR : WL) + 8]];
    const deuxCotes = (poly, enc) => [1, -1].flatMap(s => A.sans(s > 0 ? poly : A.miroir(poly), enc(s)));

    /* la paroi de la cuve, la douille du purgeur et celle de la vidange */
    const bande = chemCuve(t, 9).concat(chemCuve(0, 9).reverse());
    faceDe([...deuxCotes(bande, encochesCuve), A.rect(9, 15, tipT - 8, 1290), A.rect(-15, -9, tipT - 8, 1290), A.rect(9, 15, 112, tipB + 8), A.rect(-15, -9, 112, tipB + 8)], H.acier, 0.03, fCuve);

    /* la mousse et la jaquette : deux copies (la moitié arrière garde la sienne, l'avant emporte la sienne) */
    const polyMousse = chemArrondi(MOU.R, MOU.yb, MOU.yt, MOU.rc, 15).concat(chemCuve(t, 15).reverse());
    const polyJaq = chemArrondi(JAQ.R, JAQ.yb, JAQ.yt, JAQ.rc, 15).concat(chemArrondi(JAQ.R - JAQ.ep, JAQ.yb + JAQ.ep, JAQ.yt - JAQ.ep, JAQ.rc - JAQ.ep, 15).reverse());
    const lesFaces = [];
    [[mousseAv, polyMousse, H.mousse, 0.02], [mousseAr, polyMousse, H.mousse, 0.02], [jaqAv, polyJaq, H.jaq, 0.04], [jaqAr, polyJaq, H.jaq, 0.04]].forEach(([g, poly, mat, z], i) => {
      const f = faceDe(deuxCotes(poly, encochesCoque), mat, z, g); f.visible = false; lesFaces.push({ f, avant: i % 2 === 0 });
    });

    /* les piquages : manchon, tuyau, bride, rubans */
    const acierP = [], rougeP = [], bleuP = [], eauChaude = [], eauFroide = [];
    [-1, 1].forEach(s => [PH, PB].forEach(yp => {
      acierP.push(A.rx(s, Ro, 306, yp + 19, yp + 28), A.rx(s, Ro, 306, yp - 28, yp - 19), A.rx(s, 306, XP, yp + 19, yp + 24), A.rx(s, 306, XP, yp - 24, yp - 19),
        A.rx(s, XP - 12, XP, yp + 24, yp + 50), A.rx(s, XP - 12, XP, yp - 50, yp - 24));
      (yp === PH ? rougeP : bleuP).push(A.rx(s, 380, 400, yp + 24, yp + 26.5), A.rx(s, 380, 400, yp - 26.5, yp - 24));
      (yp === PH ? eauChaude : eauFroide).push(A.rx(s, Ri, XP, yp - 19, yp + 19));
    }));
    faceDe(acierP, H.acier, 0.03, fPiq); faceDe(rougeP, H.rouge, 0.05, fPiq); faceDe(bleuP, H.bleu, 0.05, fPiq);
    /* l'eau dans les tuyaux, dans la douille du purgeur et dans celle de la vidange */
    faceDe([...eauChaude, A.rect(-9, 9, tipT - 2, 1312)], H.chaud, 0.05, fEau);
    faceDe([...eauFroide, A.rect(-9, 9, 96, tipB + 2)], H.froid, 0.05, fEau);

    /* les doigts de gant : douille, tube, air dedans, sonde, tête */
    const sondeAcier = [], sondeInox = [], sondeAir = [], sondeTige = [], sondeTete = [];
    [-1, 1].forEach(s => {
      const yw = s > 0 ? WR : WL;
      sondeAcier.push(A.rx(s, Ro, 306, yw + 8, yw + 15), A.rx(s, Ro, 306, yw - 15, yw - 8));
      sondeInox.push(A.rx(s, 155, 340, yw + 4.6, yw + 7.6), A.rx(s, 155, 340, yw - 7.6, yw - 4.6), A.rx(s, 152, 155, yw - 7.6, yw + 7.6));
      sondeAir.push(A.rx(s, 155, 340, yw - 4.6, yw + 4.6));
      sondeTige.push(A.rx(s, 170, 350, yw - 2.2, yw + 2.2));
      sondeTete.push(A.rx(s, 340, 364, yw - 14, yw + 14));
    });
    faceDe(sondeAcier, H.acier, 0.03, fSondes); faceDe(sondeInox, H.inox, 0.1, fSondes); faceDe(sondeAir, H.air, 0.08, fSondes);
    faceDe(sondeTige, H.tige, 0.12, fSondes); faceDe(sondeTete, H.noir, 0.1, fSondes);

    /* le purgeur et la vidange */
    faceDe([A.rect(9, 17, 1290, 1335), A.rect(-17, -9, 1290, 1335), A.rect(-17, 17, 1312, 1335)], H.laiton, 0.04, fPurgeur);
    faceDe([A.rect(-12, 12, 1335, 1352)], H.noir, 0.04, fPurgeur);
    faceDe([A.rect(9, 16, 84, 112), A.rect(-16, -9, 84, 112), A.rect(-16, 16, 84, 96)], H.laiton, 0.04, fVidange);

    /* un voile invisible sur l'eau : c'est lui qui s'allume quand on choisit « l'eau » dans la légende */
    const voileEau = new T.Mesh(new T.PlaneGeometry(2 * Ri, tipT - tipB), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
    voileEau.position.set(0, (tipT + tipB) / 2, 0.5); voileEau.userData.voile = true; voileEau.userData.sansOmbre = true; voileEau.userData.sansCoupe = true; voileEau.castShadow = false; voileEau.visible = false;
    racine.add(voileEau);

    /* ================================================================ L'EAU QUI CIRCULE (filets teintés par la température)
       Six trajets dans les tuyaux et à travers le ballon, plus un trajet vertical qui n'existe qu'en charge
       (de haut en bas) ou en décharge (de bas en haut). Chaque trajet est un filet d'eau continu où des bandes
       avancent ; leur vitesse est proportionnelle au débit. */
    const V = (x, y) => new T.Vector3(x, y, 0);
    const droite = (x0, y0, x1, y1) => new T.LineCurve3(V(x0, y0), V(x1, y1));
    const lisse = pts => new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1])), false, 'centripetal');
    const filetSur = courbe => {
      const f = N.filet(courbe, { rayon: 7, couleur: 0xffffff, vitesse: 0, opacite: 0.85, pas: 100, teinte: (u, out, p) => out.copy(coulEau(p.y)) });
      f.objet.userData.sansCoupe = true; return f;
    };
    const F = {
      lt: filetSur(droite(-XP + 10, PH, -Ri + 6, PH)), at: filetSur(droite(-Ri + 6, PH, Ri - 6, PH)), rt: filetSur(droite(Ri - 6, PH, XP - 10, PH)),
      lb: filetSur(droite(-Ri + 6, PB, -XP + 10, PB)), ab: filetSur(droite(Ri - 6, PB, -Ri + 6, PB)), rb: filetSur(droite(XP - 10, PB, Ri - 6, PB)),
      bas: filetSur(lisse([[-Ri + 14, PH], [-150, PH - 22], [-30, PH - 110], [0, PH - 250], [0, PB + 260], [-30, PB + 110], [-150, PB + 22], [-Ri + 14, PB]])),
      haut: filetSur(lisse([[Ri - 14, PB], [150, PB + 22], [30, PB + 110], [0, PB + 260], [0, PH - 250], [30, PH - 110], [150, PH - 22], [Ri - 14, PH]]))
    };
    const filets = Object.values(F);
    filets.forEach(g => { g.objet.visible = false; racine.add(g.objet); });

    /* ================================================================ L'ÉTAT */
    const REG = {
      equilibre: { p: 0.75, s: 0.75, qp: 1.5, qs: 1.5, etat: 'ne bouge pas', titre: 'Équilibre',
        texte: 'La production donne autant d’eau chaude que le bâtiment en prend. Ce qui entre à gauche ressort à droite : l’eau du ballon ne monte pas, ne descend pas. La limite entre le chaud et le froid reste en place.' },
      charge: { p: 1, s: 0.5, qp: 2, qs: 1, etat: 'se charge', titre: 'Charge',
        texte: 'La production donne plus d’eau chaude que le bâtiment n’en prend. Le surplus entre par le haut et descend dans le ballon : il repousse l’eau froide vers la sortie du bas. La limite descend, le ballon se charge.' },
      decharge: { p: 0.5, s: 1, qp: 1, qs: 2, etat: 'se décharge', titre: 'Décharge',
        texte: 'Le bâtiment prend plus d’eau chaude que la production n’en donne. Le ballon fournit la différence : l’eau froide du retour monte et fait remonter la limite. Le ballon se décharge.' }
    };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const majTexte = () => {
      const r = REG[ET.regime];
      ctx.mesures([
        { libelle: 'La production donne', valeur: nb(r.qp, 1) + ' m³/h' },
        { libelle: 'Le bâtiment prend', valeur: nb(r.qs, 1) + ' m³/h' },
        { libelle: 'Le ballon', valeur: r.etat }
      ]);
      let fin = '';
      if (ET.limite === 'plein') fin = ' <em>Le ballon est presque plein d’eau chaude.</em>';
      if (ET.limite === 'vide') fin = ' <em>Le ballon est presque vide d’eau chaude.</em>';
      ctx.dire('<strong>' + r.titre + '.</strong> ' + r.texte + fin);
    };

    const visibles = () => {
      const on = ET.coupe && !ET.demonte, d = ET.p - ET.s;
      ['lt', 'at', 'rt', 'lb', 'ab', 'rb'].forEach(k => { F[k].objet.visible = on; });
      F.bas.objet.visible = on && d > 0.04 && ET.limite !== 'plein';
      F.haut.objet.visible = on && d < -0.04 && ET.limite !== 'vide';
    };
    const majCoupe = () => {
      const actif = ET.coupe && !ET.demonte;
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      racine.traverse(o => {
        if (!o.isMesh || o.userData.sansCoupe) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = actif; voileEau.visible = actif;
      lesFaces.forEach(e => { e.f.visible = e.avant ? ET.demonte : (actif || ET.demonte); });
      visibles();
    };
    const basculerCoupe = on => { ET.coupe = !!on; majCoupe(); };

    majEau(); majTexte(); majCoupe();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'cuve', nom: 'La cuve en acier', objets: [cuve, fCuve], desc: 'Un grand réservoir en acier, fermé par deux fonds bombés. Il contient 200 litres d’eau. Il ne chauffe pas : il garde l’eau.' },
      { id: 'mousse', nom: 'La mousse isolante', objets: [mousseAv, mousseAr], desc: 'Quatre centimètres de mousse autour de la cuve. Elle garde la chaleur : l’eau chaude ne refroidit pas.' },
      { id: 'jaquette', nom: 'La jaquette souple', objets: [jaqAv, jaqAr], desc: 'L’enveloppe en plastique souple qui protège la mousse. Elle se ferme par l’arrière.' },
      { id: 'piquages', nom: 'Les quatre piquages', objets: [piquages, fPiq], desc: 'Les quatre tuyaux raccordés au ballon. À gauche, la production : départ chaud en haut, retour froid en bas. À droite, le bâtiment : même principe. Un ruban rouge marque le départ, un ruban bleu le retour.' },
      { id: 'strat', nom: 'L’eau et sa stratification', objets: [voileEau], desc: 'L’eau chaude, plus légère, reste en haut. L’eau froide, plus lourde, reste en bas. Entre les deux, une zone de transition. La limite se déplace quand le ballon se charge ou se décharge.' },
      { id: 'sondes', nom: 'Les doigts de gant et les sondes', objets: [sondes[0], sondes[1], douilles, fSondes], desc: 'Un petit tube fermé qui plonge dans l’eau sans la laisser sortir. La sonde de température glisse dedans : on la change sans vider le ballon.' },
      { id: 'purgeur', nom: 'Le purgeur d’air', objets: [purgeur, fPurgeur], desc: 'Tout en haut du ballon, il laisse sortir l’air qui monte. Sans lui, une poche d’air gênerait la circulation de l’eau.' },
      { id: 'vidange', nom: 'La vidange', objets: [vidange, fVidange], desc: 'Un robinet tout en bas. On l’ouvre, avec un tuyau, pour vider le ballon avant une intervention.' },
      { id: 'pieds', nom: 'Les trois pieds', objets: [pieds], desc: 'Trois pieds en acier avec un patin en caoutchouc. Ils posent le ballon bien à plat sur le sol.' }
    ];

    const commandes = [
      { id: 'regime', type: 'choix', options: [['charge', 'Charge'], ['equilibre', 'Équilibre'], ['decharge', 'Décharge']], valeur: 'equilibre' }
    ];

    const vueCoupe = { azimut: 10, elevation: 8, zoom: 1.5 };
    const etapes = [
      { titre: 'Le ballon tampon, tel qu’on le pose', voirDedans: false, eclate: false, actions: [['regime', 'equilibre'], ['niveau', 650]],
        vue: { azimut: 34, elevation: 14, zoom: 1.4 },
        texte: 'Une cuve en acier de 200 litres sous une jaquette souple, posée sur trois pieds. Quatre tuyaux y arrivent : deux à gauche, du côté de la production, deux à droite, du côté du bâtiment. En haut, le purgeur.' },
      { titre: 'On le coupe : de l’eau chaude en haut, de l’eau froide en bas', piece: null, voirDedans: true, eclate: false, actions: [['regime', 'equilibre'], ['niveau', 650]],
        vue: vueCoupe,
        texte: 'La cuve est pleine d’eau. L’eau chaude est plus légère : elle reste en haut. L’eau froide est plus lourde : elle reste en bas. Entre les deux, une zone de transition.' },
      { titre: 'Quatre piquages : deux circuits sur le même volume', piece: 'piquages', voirDedans: true, eclate: false, actions: [['regime', 'equilibre'], ['niveau', 650]],
        vue: { azimut: 6, elevation: 4, zoom: 1.5 },
        texte: 'À gauche, le circuit de la production : le départ chaud entre en haut, le retour froid sort en bas. À droite, le circuit du bâtiment : même principe. Chaque circuit a son circulateur, mais l’eau du ballon est commune.' },
      { titre: 'Équilibre : la production donne autant que le bâtiment prend', piece: null, voirDedans: true, eclate: false, actions: [['regime', 'equilibre'], ['niveau', 650]],
        vue: { azimut: 6, elevation: 4, zoom: 1.55 },
        texte: 'Ce qui entre à gauche ressort à droite. L’eau du ballon ne monte pas, ne descend pas : la limite entre le chaud et le froid reste en place.' },
      { titre: 'Charge : la production donne plus que le bâtiment ne prend', piece: null, voirDedans: true, eclate: false, actions: [['niveau', 560], ['regime', 'charge']],
        vue: { azimut: 6, elevation: 4, zoom: 1.55 },
        texte: 'Le surplus d’eau chaude entre par le haut et descend. Il repousse l’eau froide vers la sortie du bas. La limite descend : le ballon se charge.' },
      { titre: 'Décharge : le bâtiment prend plus que la production ne donne', piece: null, voirDedans: true, eclate: false, actions: [['niveau', 780], ['regime', 'decharge']],
        vue: { azimut: 6, elevation: 4, zoom: 1.55 },
        texte: 'Le ballon fournit la différence. L’eau froide du retour monte et fait remonter la limite : le ballon se décharge.' },
      { titre: 'Démonté : la jaquette, la mousse, la cuve', piece: 'mousse', voirDedans: false, eclate: true, actions: [['regime', 'equilibre']],
        texte: 'On ouvre la jaquette, on retire la mousse : la cuve apparaît. Le purgeur se dévisse par le haut, les sondes se retirent sans vider le ballon.' }
    ];

    const eclate = [
      { objets: [purgeur], vers: [0, 260, 0], debut: 0, fin: 0.4 },
      { objets: [sondes[0]], vers: [-330, 0, 0], debut: 0, fin: 0.4 },
      { objets: [sondes[1]], vers: [330, 0, 0], debut: 0, fin: 0.4 },
      { objets: [jaqAv], vers: [0, 0, 760], debut: 0.15, fin: 0.7 },
      { objets: [jaqAr], vers: [0, 0, -760], debut: 0.15, fin: 0.7 },
      { objets: [mousseAv], vers: [0, 0, 380], debut: 0.45, fin: 1 },
      { objets: [mousseAr], vers: [0, 0, -380], debut: 0.45, fin: 1 }
    ];

    let avantEclate = false;
    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 62, elevation: 18, zoom: 0.92 },
      vue: ctx.mode === 'decouvrir' ? { azimut: 34, elevation: 14, zoom: 1.4, cadre: [racine], marge: 1.0 }
                                    : { azimut: vueCoupe.azimut, elevation: vueCoupe.elevation, zoom: vueCoupe.zoom, cadre: [racine], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'niveau') { ET.niveau = K.clamp(+v, NMIN, NMAX); ET.limite = ''; majEau(); visibles(); return; }
        if (id === 'regime') {
          ET.regime = v; ET.limite = ''; ctx.regler('regime', v); majTexte(); visibles();
        }
      },
      surEclate(on) {
        if (on) { avantEclate = ET.coupe; ET.demonte = true; if (ET.coupe && ctx.element) ctx.element.fantome(false); }
        else { ET.demonte = false; if (avantEclate && ctx.element) ctx.element.fantome(true); avantEclate = false; }
        majCoupe();
      },
      animer(dt) {
        const r = REG[ET.regime];
        ET.p = K.vers(ET.p, r.p, 3, dt); ET.s = K.vers(ET.s, r.s, 3, dt);
        const d = ET.p - ET.s, VIT = 110;
        const avant = ET.limite;
        const niv = ET.niveau - d * VIT * dt;
        ET.niveau = K.clamp(niv, NMIN, NMAX);
        ET.limite = niv < NMIN ? 'plein' : niv > NMAX ? 'vide' : (d > 0.04 && ET.niveau <= NMIN + 0.5) ? 'plein' : (d < -0.04 && ET.niveau >= NMAX - 0.5) ? 'vide' : '';
        if (ET.limite !== avant) majTexte();
        const m = Math.min(ET.p, ET.s), vit = (ks, q) => ks.forEach(k => F[k].regler({ vitesse: q * VIT }));
        vit(['lt', 'lb'], ET.p); vit(['rt', 'rb'], ET.s); vit(['at', 'ab'], m);
        vit(['bas'], Math.max(d, 0)); vit(['haut'], Math.max(-d, 0));
        visibles();
        const actif = ET.coupe && !ET.demonte;
        if (actif) { majEau(); filets.forEach(g => { if (g.objet.visible) g.animer(dt); }); }
        return actif;
      }
    };
  }, { famille: 'ballons', titre: 'Le ballon tampon à quatre piquages', stations: ['tampon'] });

  /* ====================================================================== LA BOUTEILLE DE DÉCOUPLAGE
     Un tube d'acier Ø 110, quatre piquages, un purgeur en haut, une vidange en bas ; le primaire (circulateur à gauche)
     et le secondaire (circulateur à droite) s'y rejoignent. Même plan de coupe que le ballon : z = 0.
     L'eau y est colorée selon sa TEMPÉRATURE (40 °C bleu → 60 °C rouge), comme dans le calcul de la station. */
  Electro3D.definir('bouteilleDecouplage', (T, K, ctx) => {
    const A = aides(T, K), faceDe = A.faceDe, N = HydroNappe(T, K);
    const M = K.mat;
    const racine = new T.Group();
    const D = Math.PI / 180;

    /* ---------------------------------------------------------------- cotes (mm) */
    const Ri = 50, t = 5, Ro = Ri + t, hd = 22, yB = 130, yT = 730;
    const tipB = yB - hd, tipT = yT + hd;
    const PH = 650, PB = 210;                 /* axes des piquages */
    const XP = 430;                           /* bout des tuyaux */
    const BORE = 14, PIP = 18, MAN = 24, XM = Ro + 28;
    const XC = 250;                           /* centre des circulateurs, sur les départs */
    const NIV = 430, ZT = 90;                 /* milieu et demi-largeur de la zone de mélange dans la bouteille */
    const chemCuve = A.fabChem(Ri, hd, yB, yT);

    /* ---------------------------------------------------------------- matières à soi */
    const peint = K.propre(M.fonte); peint.color.setHex(0xa7b2bd); peint.side = T.DoubleSide;
    const acierNoir = K.propre(M.fonte); acierNoir.color.setHex(0x5c6670); acierNoir.metalness = 0.4; acierNoir.side = T.DoubleSide;
    const fontePompe = K.propre(M.fonte); fontePompe.color.setHex(0x3e454d); fontePompe.side = T.DoubleSide;
    const alu = K.propre(M.aluminium); alu.color.setHex(0xc9ced4); alu.side = T.DoubleSide;
    const module = K.propre(M.plastiqueMarine); module.side = T.DoubleSide;
    const laiton = K.propre(M.laiton); laiton.side = T.DoubleSide;
    const noir = K.propre(M.plastiqueNoir); noir.side = T.DoubleSide;
    const rouge = K.propre(M.plastiqueRouge); rouge.color.setHex(0xd9472b);
    const bleu = K.propre(M.plastiqueBleu); bleu.color.setHex(0x2f7fd6);
    [peint, acierNoir, fontePompe, alu, module, laiton, noir].forEach(m => { m.clipShadows = true; });

    /* ---------------------------------------------------------------- géométries */
    const pt2 = a => a.map(p => new T.Vector2(p[0], p[1]));
    const anneauX = (rExt, rInt, x0, x1, y, mat, seg) => { const g = K.anneau(rExt, rInt, Math.abs(x1 - x0), seg || 32); g.rotateZ(Math.PI / 2); g.translate((x0 + x1) / 2, y, 0); return new T.Mesh(g, mat); };
    const cylY = (r, y0, y1, mat, seg) => new T.Mesh(K.cylindre(r, y1 - y0, seg || 24), mat).translateY((y0 + y1) / 2);
    const anneauY = (rExt, rInt, y0, y1, mat, seg) => new T.Mesh(K.anneau(rExt, rInt, y1 - y0, seg || 24), mat).translateY((y0 + y1) / 2);

    /* ================================================================ LA BOUTEILLE ET SES PIEDS */
    const bouteille = new T.Group();
    bouteille.add(new T.Mesh(new T.LatheGeometry(pt2(chemCuve(t / 2, 0).slice().reverse()), 56), peint));
    bouteille.add(anneauY(11, 7, tipT - 6, 770, acierNoir, 20));               /* douille du purgeur */
    bouteille.add(anneauY(11, 7, 80, tipB + 6, acierNoir, 20));                 /* douille de la vidange */
    racine.add(bouteille);

    const pieds = new T.Group();
    [0, 120, 240].forEach(a => {
      const x = Math.sin(a * D) * 58, z = Math.cos(a * D) * 58;
      const barre = K.mesh(K.boite(34, 190, 6, 1.5), acierNoir, x, 95, z); barre.rotation.y = a * D;
      const patin = K.mesh(K.boite(50, 6, 50, 1.5), acierNoir, Math.sin(a * D) * 75, 3, Math.cos(a * D) * 75); patin.rotation.y = a * D;
      pieds.add(barre, patin);
    });
    racine.add(pieds);

    /* ================================================================ LES QUATRE PIQUAGES */
    const piquages = new T.Group();
    [-1, 1].forEach(s => [PH, PB].forEach(yp => {
      piquages.add(anneauX(MAN, BORE, s * Ro, s * XM, yp, acierNoir, 32));
      piquages.add(anneauX(PIP, BORE, s * XM, s * XP, yp, acierNoir, 32));
      piquages.add(anneauX(38, PIP, s * (XP - 10), s * XP, yp, acierNoir, 36));
      piquages.add(anneauX(PIP + 2.5, PIP, s * 330, s * 346, yp, yp === PH ? rouge : bleu, 32));
    }));
    racine.add(piquages);

    /* ================================================================ LES DEUX CIRCULATEURS (sur les départs) */
    const circulateurs = [-1, 1].map(s => {
      const g = new T.Group(), xc = s * XC;
      g.add(K.mesh(K.boite(124, 78, 64, 9), fontePompe, xc, PH, 0));                       /* le corps, entre deux raccords */
      const fl = new T.Shape();
      [[-26, -4], [8, -4], [8, -10], [26, 0], [8, 10], [8, 4], [-26, 4]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
      const fleche = new T.Mesh(K.extrusion(fl, 1.6, 0.4), fontePompe);                    /* la flèche de sens, moulée sur le dessus */
      fleche.rotation.x = -Math.PI / 2; fleche.position.set(xc, PH + 39.4, 0); g.add(fleche);
      const moteur = new T.Mesh(K.cylindre(46, 110, 36), alu); moteur.rotation.x = Math.PI / 2; moteur.position.set(xc, PH, -87); g.add(moteur);
      for (let z = -50; z > -130; z -= 12) { const ail = new T.Mesh(K.cylindre(49, 4, 36), alu); ail.rotation.x = Math.PI / 2; ail.position.set(xc, PH, z); g.add(ail); }
      g.add(K.mesh(K.boite(66, 66, 38, 8), module, xc, PH, -160));                         /* le module électronique */
      racine.add(g); return g;
    });

    /* ================================================================ LE PURGEUR ET LA VIDANGE */
    const purgeur = new T.Group();
    purgeur.add(cylY(14, 770, 806, laiton, 28));
    purgeur.add(cylY(10, 806, 822, noir, 20));
    racine.add(purgeur);
    const vidange = new T.Group();
    vidange.add(cylY(13, 56, 80, laiton, 24));
    const sortie = new T.Mesh(K.cylindre(8, 36, 18), laiton); sortie.rotation.x = Math.PI / 2; sortie.position.set(0, 68, -28); vidange.add(sortie);
    racine.add(vidange);

    /* ================================================================ LES TEMPÉRATURES
       Départ primaire 60 °C, retour secondaire 40 °C (les données de la station). Selon Qp et Qs :
         Qp > Qs : départ secondaire 60 ; retour primaire = (Qs·40 + (Qp−Qs)·60) / Qp
         Qp < Qs : départ secondaire = (Qp·60 + (Qs−Qp)·40) / Qs ; retour primaire 40 */
    const CH = new T.Color(0xd9472b), FR = new T.Color(0x2f7fd6), BL = new T.Color(0xffffff), tmp = new T.Color(), tmp2 = new T.Color();
    const cT = temp => tmp.copy(FR).lerp(CH, K.clamp((temp - 40) / 20, 0, 1));
    const ET = { qp: 2, qs: 2, qpv: 2, qsv: 2, tss: 60, trp: 40, tHaut: 60, tBas: 40, coupe: false, demonte: false };
    const calcul = () => {
      const { qp, qs } = ET;
      if (Math.abs(qp - qs) < 0.001) { ET.tss = 60; ET.trp = 40; ET.tHaut = 60; ET.tBas = 40; }
      else if (qp > qs) { ET.tss = 60; ET.trp = (qs * 40 + (qp - qs) * 60) / qp; ET.tHaut = 60; ET.tBas = ET.trp; }
      else { ET.tss = (qp * 60 + (qs - qp) * 40) / qs; ET.trp = 40; ET.tHaut = ET.tss; ET.tBas = 40; }
    };
    const frac = y => { const x = K.clamp((y - (NIV - ZT)) / (2 * ZT), 0, 1); return x * x * (3 - 2 * x); };
    const tY = y => ET.tBas + (ET.tHaut - ET.tBas) * frac(y);
    const lerp = (a, b, u) => a + (b - a) * u;
    const lis = u => { u = K.clamp(u, 0, 1); return u * u * (3 - 2 * u); };

    /* ================================================================ L'EAU : la face de coupe, teintée selon la température */
    const rangs = [];
    for (let k = 0; k <= 12; k++) { const th = k / 12 * Math.PI / 2; rangs.push({ y: yB - hd * Math.cos(th), w: Ri * Math.sin(th) }); }
    for (let y = yB + 15; y < yT; y += 15) rangs.push({ y, w: Ri });
    for (let k = 0; k <= 12; k++) { const th = k / 12 * Math.PI / 2; rangs.push({ y: yT + hd * Math.sin(th), w: Ri * Math.cos(th) }); }
    const nR = rangs.length, pos = new Float32Array(nR * 6), col = new Float32Array(nR * 6), idx = [];
    rangs.forEach((r, i) => { pos.set([-r.w, r.y, 0, r.w, r.y, 0], i * 6); });
    for (let i = 0; i < nR - 1; i++) { const a = 2 * i, b = a + 1, c = a + 2, d = a + 3; idx.push(a, b, c, b, d, c); }
    const geoEau = new T.BufferGeometry();
    geoEau.setAttribute('position', new T.BufferAttribute(pos, 3));
    geoEau.setAttribute('color', new T.BufferAttribute(col, 3));
    geoEau.setIndex(idx);
    const eau = new T.Mesh(geoEau, new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.82, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
    eau.position.z = 0.06; eau.userData.sansOmbre = true; eau.userData.sansCoupe = true; eau.userData.voile = true; eau.castShadow = false;
    /* l'eau dans les tuyaux : quatre teintes, deux fixes (départ primaire, retour secondaire), deux qui suivent le calcul */
    const matEau = () => A.eauMat(0xd9472b);
    const mPd = matEau(), mSr = matEau(), mSd = matEau(), mPr = matEau(), mPurge = matEau(), mVid = matEau();
    const teinter = (m, temp) => { m.color.copy(cT(temp)).lerp(BL, 0.38); };
    const majEau = () => {
      rangs.forEach((r, i) => { tmp2.copy(cT(tY(r.y))).lerp(BL, 0.38); col.set([tmp2.r, tmp2.g, tmp2.b, tmp2.r, tmp2.g, tmp2.b], i * 6); });
      geoEau.attributes.color.needsUpdate = true;
      teinter(mPd, 60); teinter(mSr, 40); teinter(mSd, ET.tss); teinter(mPr, ET.trp); teinter(mPurge, ET.tHaut); teinter(mVid, ET.tBas);
      filets.forEach(g => g.teindre());
    };

    /* ================================================================ LES FACES DE COUPE (plan z = 0) */
    const H = {
      acier: A.hachures('#8d9aa9', '#2c3640', 9, 6),
      fonte: A.hachures('#6b747e', '#262b31', 9, 6),
      laiton: A.hachures('#b08f45', '#6a511c', 6),
      noir: A.uni(0x2a2d31),
      rouge: A.uni(0xd9472b), bleu: A.uni(0x2f7fd6)
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const groupe = () => { const g = new T.Group(); faces.add(g); return g; };
    const fEau = groupe(), fCuve = groupe(), fPiq = groupe(), fPompes = groupe(), fPurgeur = groupe(), fVidange = groupe();
    fEau.add(eau);

    /* la paroi (deux moitiés), percée par les quatre piquages ; les douilles du purgeur et de la vidange */
    const bande = chemCuve(t, 7).concat(chemCuve(0, 7).reverse());
    const encoches = [[PB - BORE, PB + BORE], [PH - BORE, PH + BORE]];
    faceDe([...[1, -1].flatMap(s => A.sans(s > 0 ? bande : A.miroir(bande), encoches)),
      A.rect(7, 11, tipT - 6, 770), A.rect(-11, -7, tipT - 6, 770), A.rect(7, 11, 80, tipB + 6), A.rect(-11, -7, 80, tipB + 6)], H.acier, 0.03, fCuve);

    /* les piquages : manchon, tuyau (sauf sous le corps du circulateur), bride, rubans */
    const acierP = [], fonteP = [], rougeP = [], bleuP = [];
    [-1, 1].forEach(s => [PH, PB].forEach(yp => {
      acierP.push(A.rx(s, Ro, XM, yp + BORE, yp + MAN), A.rx(s, Ro, XM, yp - MAN, yp - BORE),
        A.rx(s, XP - 10, XP, yp + PIP, yp + 38), A.rx(s, XP - 10, XP, yp - 38, yp - PIP));
      if (yp === PH) {
        /* le tuyau du départ s'interrompt sous le circulateur : le corps de pompe prend sa place */
        acierP.push(A.rx(s, XM, XC - 62, yp + BORE, yp + PIP), A.rx(s, XM, XC - 62, yp - PIP, yp - BORE), A.rx(s, XC + 62, XP, yp + BORE, yp + PIP), A.rx(s, XC + 62, XP, yp - PIP, yp - BORE));
        fonteP.push(A.rx(s, XC - 62, XC + 62, yp + BORE, yp + 39), A.rx(s, XC - 62, XC + 62, yp - 39, yp - BORE));
      } else acierP.push(A.rx(s, XM, XP, yp + BORE, yp + PIP), A.rx(s, XM, XP, yp - PIP, yp - BORE));
      (yp === PH ? rougeP : bleuP).push(A.rx(s, 330, 346, yp + PIP, yp + PIP + 2.5), A.rx(s, 330, 346, yp - PIP - 2.5, yp - PIP));
    }));
    faceDe(acierP, H.acier, 0.03, fPiq); faceDe(rougeP, H.rouge, 0.05, fPiq); faceDe(bleuP, H.bleu, 0.05, fPiq);
    faceDe(fonteP, H.fonte, 0.04, fPompes);

    /* l'eau dans les tuyaux, selon sa température */
    const eauTuyau = (s, yp) => A.rx(s, Ri, XP, yp - BORE, yp + BORE);
    faceDe([eauTuyau(-1, PH)], mPd, 0.05, fEau);                    /* départ primaire : toujours chaud */
    faceDe([eauTuyau(1, PH)], mSd, 0.05, fEau);                     /* départ secondaire : chaud ou mélangé */
    faceDe([eauTuyau(-1, PB)], mPr, 0.05, fEau);                    /* retour primaire : froid ou réchauffé */
    faceDe([eauTuyau(1, PB)], mSr, 0.05, fEau);                     /* retour secondaire : toujours froid */
    faceDe([A.rect(-7, 7, tipT - 2, 806)], mPurge, 0.05, fEau);
    faceDe([A.rect(-7, 7, 68, tipB + 2)], mVid, 0.05, fEau);

    faceDe([A.rect(7, 14, 770, 806), A.rect(-14, -7, 770, 806), A.rect(-14, 14, 794, 806)], H.laiton, 0.04, fPurgeur);
    faceDe([A.rect(-10, 10, 806, 822)], H.noir, 0.04, fPurgeur);
    faceDe([A.rect(7, 13, 56, 80), A.rect(-13, -7, 56, 80), A.rect(-13, 13, 56, 68)], H.laiton, 0.04, fVidange);

    const voileEau = new T.Mesh(new T.PlaneGeometry(2 * Ri, tipT - tipB), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
    voileEau.position.set(0, (tipT + tipB) / 2, 0.5); voileEau.userData.voile = true; voileEau.userData.sansOmbre = true; voileEau.userData.sansCoupe = true; voileEau.castShadow = false; voileEau.visible = false;
    racine.add(voileEau);

    /* ================================================================ L'EAU QUI CIRCULE
       Des filets d'eau continus qui suivent les tuyaux et la bouteille, où des bandes avancent ; leur couleur est la
       température du point où ils passent ; la vitesse des bandes est proportionnelle au débit de la boucle (ou à la
       différence, dans la bouteille). */
    const V = (x, y) => new T.Vector3(x, y, 0);
    const droite = (x0, y0, x1, y1) => new T.LineCurve3(V(x0, y0), V(x1, y1));
    const lisseC = pts => new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1])), false, 'centripetal');
    const filetSur = (courbe, tempDe) => {
      const f = N.filet(courbe, { rayon: 5, couleur: 0xffffff, vitesse: 0, opacite: 0.85, pas: 70, teinte: (u, out, p) => out.copy(cT(tempDe(p, u))) });
      f.objet.userData.sansCoupe = true; return f;
    };
    const L0 = Ro - 6;
    const F = {
      lt: filetSur(droite(-XP + 10, PH, -L0, PH), () => 60),
      at: filetSur(droite(-L0, PH, L0, PH), p => lerp(60, ET.tss, lis((p.x + L0) / (2 * L0)))),
      rt: filetSur(droite(L0, PH, XP - 10, PH), () => ET.tss),
      lb: filetSur(droite(-L0, PB, -XP + 10, PB), () => ET.trp),
      ab: filetSur(droite(L0, PB, -L0, PB), p => lerp(40, ET.trp, lis((L0 - p.x) / (2 * L0)))),
      rb: filetSur(droite(XP - 10, PB, L0, PB), () => 40),
      bas: filetSur(lisseC([[-L0, PH], [-22, PH - 40], [0, PH - 90], [0, PB + 90], [-22, PB + 40], [-L0, PB]]), p => lerp(60, ET.trp, lis((PH - p.y) / (PH - PB)))),
      haut: filetSur(lisseC([[L0, PB], [22, PB + 40], [0, PB + 90], [0, PH - 90], [22, PH - 40], [L0, PH]]), p => lerp(40, ET.tss, lis((p.y - PB) / (PH - PB))))
    };
    const filets = Object.values(F);
    filets.forEach(g => { g.objet.visible = false; racine.add(g.objet); });

    /* ================================================================ L'ÉTAT */
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const majTexte = () => {
      const { qp, qs } = ET, ecart = Math.abs(qp - qs);
      let titre, texte, trans;
      if (ecart < 0.001) {
        titre = 'Qp = Qs'; trans = 'rien ne traverse';
        texte = 'Les deux circulateurs donnent le même débit. Tout ce que le primaire envoie, le secondaire le prend : rien ne traverse la bouteille. Le départ secondaire est aussi chaud que le départ primaire.';
      } else if (qp > qs) {
        titre = 'Qp > Qs'; trans = nb(ecart, 1) + ' m³/h vers le bas';
        texte = 'Le primaire envoie plus d’eau que le secondaire n’en prend. Le surplus traverse la bouteille vers le bas et repart au retour du primaire : ce retour est plus chaud que le retour du secondaire.';
      } else {
        titre = 'Qp < Qs'; trans = nb(ecart, 1) + ' m³/h vers le haut';
        texte = 'Le secondaire prend plus d’eau que le primaire n’en envoie. Il reprend de l’eau froide de son propre retour : elle remonte dans la bouteille et se mélange à l’eau chaude. Le départ secondaire est moins chaud que le départ primaire.';
      }
      ctx.mesures([
        { libelle: 'Dans la bouteille', valeur: trans },
        { libelle: 'Départ secondaire', valeur: nb(ET.tss, 1) + ' °C' },
        { libelle: 'Retour primaire', valeur: nb(ET.trp, 1) + ' °C' }
      ]);
      ctx.dire('<strong>' + titre + '.</strong> ' + texte + ' <em>Départ primaire 60 °C, retour secondaire 40 °C.</em>');
    };
    const visibles = () => {
      const on = ET.coupe && !ET.demonte, d = ET.qp - ET.qs;
      ['lt', 'at', 'rt', 'lb', 'ab', 'rb'].forEach(k => { F[k].objet.visible = on; });
      F.bas.objet.visible = on && d > 0.04;
      F.haut.objet.visible = on && d < -0.04;
    };
    const majCoupe = () => {
      const actif = ET.coupe && !ET.demonte;
      const plan = actif ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      racine.traverse(o => {
        if (!o.isMesh || o.userData.sansCoupe) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      faces.visible = actif; voileEau.visible = actif;
      visibles();
    };
    const basculerCoupe = on => { ET.coupe = !!on; majCoupe(); };
    const regler = () => { ctx.regler('qp', ET.qp); ctx.regler('qs', ET.qs); };

    calcul(); majEau(); majTexte(); majCoupe();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'bouteille', nom: 'La bouteille', objets: [bouteille, fCuve], desc: 'Un gros tube en acier, fermé par deux fonds bombés. Il met en commun l’eau du primaire et celle du secondaire.' },
      { id: 'piquages', nom: 'Les quatre piquages', objets: [piquages, fPiq], desc: 'À gauche, le primaire : départ chaud en haut, retour en bas. À droite, le secondaire : même principe. Un ruban rouge marque le départ, un ruban bleu le retour.' },
      { id: 'circulateurs', nom: 'Les deux circulateurs', objets: [circulateurs[0], circulateurs[1], fPompes], desc: 'Un par boucle. Chacun pousse l’eau de sa boucle, à son propre débit. La flèche sur le corps donne le sens de l’eau.' },
      { id: 'eau', nom: 'L’eau et sa température', objets: [voileEau], desc: 'Rouge : 60 °C. Bleu : 40 °C. Entre les deux, l’eau est mélangée. La couleur de l’eau suit sa température.' },
      { id: 'purgeur', nom: 'Le purgeur d’air', objets: [purgeur, fPurgeur], desc: 'En haut de la bouteille, il laisse sortir l’air qui monte.' },
      { id: 'vidange', nom: 'La vidange', objets: [vidange, fVidange], desc: 'Un robinet tout en bas, pour vider la bouteille avant une intervention.' },
      { id: 'pieds', nom: 'Les trois pieds', objets: [pieds], desc: 'Trois pieds en acier soudés sur le tube. Ils tiennent la bouteille debout.' }
    ];

    const commandes = [
      { id: 'qp', type: 'curseur', libelle: 'Débit primaire Qp', min: 0.5, max: 3.5, pas: 0.5, unite: 'm³/h', valeur: 2 },
      { id: 'qs', type: 'curseur', libelle: 'Débit secondaire Qs', min: 0.5, max: 3.5, pas: 0.5, unite: 'm³/h', valeur: 2 }
    ];

    const vueCoupe = { azimut: 10, elevation: 8, zoom: 1.5 };
    const etapes = [
      { titre: 'La bouteille de découplage, telle qu’on la pose', voirDedans: false, eclate: false, actions: [['qp', 2], ['qs', 2]],
        vue: { azimut: 34, elevation: 14, zoom: 1.45 },
        texte: 'Un tube d’acier debout, quatre tuyaux, un circulateur sur chaque départ. À gauche, le primaire, qui vient de la chaudière. À droite, le secondaire, qui part vers les radiateurs.' },
      { titre: 'On la coupe : un volume commun aux deux boucles', piece: null, voirDedans: true, eclate: false, actions: [['qp', 2], ['qs', 2]],
        vue: vueCoupe,
        texte: 'Dedans, il n’y a rien : un tube plein d’eau. Les deux boucles y arrivent ; l’eau chaude, plus légère, reste en haut. Chaque boucle garde son circulateur, donc son débit.' },
      { titre: 'Deux circulateurs, deux débits', piece: 'circulateurs', voirDedans: true, eclate: false, actions: [['qp', 2], ['qs', 2]],
        vue: { azimut: 6, elevation: 5, zoom: 1.3 },
        texte: 'Le circulateur de gauche règle le débit du primaire, celui de droite le débit du secondaire. Rien ne les oblige à être égaux : la bouteille encaisse la différence.' },
      { titre: 'Qp = Qs : rien ne traverse la bouteille', piece: null, voirDedans: true, eclate: false, actions: [['qp', 2], ['qs', 2]],
        vue: { azimut: 6, elevation: 5, zoom: 1.6 },
        texte: 'Ce qui sort du primaire est tout de suite repris par le secondaire. L’eau passe de gauche à droite en haut, de droite à gauche en bas. Dans le tube, l’eau ne monte pas, ne descend pas.' },
      { titre: 'Qp > Qs : le surplus descend', piece: null, voirDedans: true, eclate: false, actions: [['qp', 3], ['qs', 1.5]],
        vue: { azimut: 6, elevation: 5, zoom: 1.6 },
        texte: 'Le primaire envoie plus d’eau chaude que le secondaire n’en prend. Le surplus ne peut aller que vers le bas : il traverse la bouteille et rejoint le retour du primaire, qui devient plus chaud.' },
      { titre: 'Qp < Qs : l’eau remonte et refroidit le départ', piece: null, voirDedans: true, eclate: false, actions: [['qp', 1.5], ['qs', 3]],
        vue: { azimut: 6, elevation: 5, zoom: 1.6 },
        texte: 'Le secondaire prend plus d’eau que le primaire n’en envoie. Il reprend de l’eau froide de son retour : elle remonte dans la bouteille et se mélange à l’eau chaude. Le départ secondaire est moins chaud.' },
      { titre: 'Démontée : les circulateurs et le purgeur', piece: 'circulateurs', voirDedans: false, eclate: true, actions: [['qp', 2], ['qs', 2]],
        texte: 'Chaque circulateur se dévisse entre ses deux raccords et se retire vers le haut. Le purgeur se dévisse aussi : la bouteille reste en place sur son socle.' }
    ];

    const eclate = [
      { objets: [circulateurs[0]], vers: [0, 230, 0], debut: 0, fin: 0.8 },
      { objets: [circulateurs[1]], vers: [0, 230, 0], debut: 0, fin: 0.8 },
      { objets: [purgeur], vers: [0, 180, 0], debut: 0.2, fin: 1 }
    ];

    let avantEclate = false;
    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 38, elevation: 18, zoom: 1.0 },
      vue: ctx.mode === 'decouvrir' ? { azimut: 34, elevation: 14, zoom: 1.45, cadre: [racine], marge: 1.0 }
                                    : { azimut: vueCoupe.azimut, elevation: vueCoupe.elevation, zoom: vueCoupe.zoom, cadre: [racine], marge: 1.0 },
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'qp') ET.qp = +v;
        else if (id === 'qs') ET.qs = +v;
        else return;
        calcul(); majEau(); majTexte(); regler(); visibles();
      },
      surEclate(on) {
        if (on) { avantEclate = ET.coupe; ET.demonte = true; if (ET.coupe && ctx.element) ctx.element.fantome(false); }
        else { ET.demonte = false; if (avantEclate && ctx.element) ctx.element.fantome(true); avantEclate = false; }
        majCoupe();
      },
      animer(dt) {
        ET.qpv = K.vers(ET.qpv, ET.qp, 4, dt); ET.qsv = K.vers(ET.qsv, ET.qs, 4, dt);
        const VIT = 34, d = ET.qpv - ET.qsv, m = Math.min(ET.qpv, ET.qsv), vit = (ks, q) => ks.forEach(k => F[k].regler({ vitesse: q * VIT }));
        vit(['lt', 'lb'], ET.qpv); vit(['rt', 'rb'], ET.qsv); vit(['at', 'ab'], m);
        vit(['bas'], Math.max(d, 0)); vit(['haut'], Math.max(-d, 0));
        visibles();
        const actif = ET.coupe && !ET.demonte;
        if (actif) filets.forEach(g => { if (g.objet.visible) g.animer(dt); });
        return actif;
      }
    };
  }, { famille: 'ballons', titre: 'La bouteille de découplage', stations: ['decouplage'] });
})();
