/* AéroRézo 3D — famille « cta » : la centrale de traitement d'air à mélange, dans son local.
   Unités : mm. Repère : X dans le sens de l'air soufflé (de gauche à droite), Y vers le haut,
   Z vers l'avant (+Z = la face des portes de visite, celle qu'on voit). À gauche, le mur
   extérieur ; à droite, le départ vers le local (soufflage) et le retour (reprise).

   CE QUE L'ÉLÈVE DOIT VOIR : une centrale n'est qu'un couloir d'air fermé, fait de caissons
   posés bout à bout, chacun faisant UNE chose, lue dans le sens de l'air : prise d'air neuf
   et registre → mélange avec l'air repris → filtre → batterie chaude → batterie froide et son
   bac → humidificateur → ventilateur → soufflage. Côté reprise, l'air revient du local et se
   partage : une part au mélange, le reste au rejet. Ce sont les registres qui font le partage.

   COULEURS DE L'AIR (communes à AéroRézo, toujours doublées d'un mot dans la légende et le
   texte — la couleur ne porte jamais seule l'information) :
     air neuf   vert   0x2f9e5a      air repris / recyclé   jaune  0xd9a21b
     air soufflé bleu  0x2f7fd6      air rejeté             brun   0x8a5a3c
     mélange : teinte intermédiaire, selon la part d'air neuf.

   « Voir en coupe » retire la moitié avant (z > 0) : les panneaux coupés montrent leur isolant
   hachuré, le mur son béton, la batterie ses tubes coupés dans une ailette. Seul le moteur
   reste entier (il est derrière la roue, rien à y lire). */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('cta', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const D = Math.PI / 180;
    const AIR = { neuf: 0x2f9e5a, repris: 0xd9a21b, souffle: 0x2f7fd6, rejete: 0x8a5a3c };

    /* ---------------------------------------------------------------- matières
       Tout ce qui se coupe a sa matière propre, double face (on voit l'intérieur des parois). */
    const C = (m, couleur) => { const c = K.propre(m); if (couleur !== undefined) c.color.setHex(couleur); c.side = T.DoubleSide; return c; };
    const panneau = C(K.plastique(0xdcdeda, 0.55));        /* tôle prélaquée gris clair */
    const panneauInt = C(M.zingue, 0xc4c8cb);               /* peau intérieure galvanisée */
    const profil = C(M.aluminium, 0xb7bdc4);               /* profilés d'ossature */
    const galva = C(M.zingue, 0xbfc5c9);                   /* gaines */
    const beton = C(K.plastique(0xbcb6aa, 0.92));
    const lame = C(M.aluminium, 0xc9ced3);
    const servo = C(K.plastique(0x3a4047, 0.5));
    const media = C(K.plastique(0xf0e9d2, 0.92));          /* le média du filtre, propre */
    const cadreFiltre = C(M.zingue, 0xaeb4b9);
    const cuivre = C(M.cuivre);
    const plaqueBat = C(M.zingue, 0xb9bfc4);
    const rouge = C(K.plastique(0xc0392b, 0.42));          /* tuyauterie d'eau chaude, peinte */
    const bleu = C(K.plastique(0x2f6db5, 0.42));           /* tuyauterie d'eau glacée, peinte */
    const inox = C(M.acier, 0xcfd5da);
    const pvc = C(K.plastique(0x8d9298, 0.5));
    const vapeurTube = C(M.acier, 0xd5dade);
    const roueMat = C(M.plastiqueMarine);
    const roueTole = C(M.aluminium, 0xaab2ba);
    const noir = C(M.plastiqueNoir);
    const souple = C(M.caoutchouc, 0x2a2d31);
    const sondeMat = C(K.plastique(0xf1efe8, 0.5));
    /* le moteur reste entier en coupe : ses matières ne doivent servir à rien de ce qu'on coupe */
    const moteurMat = K.propre(M.fonte); moteurMat.color.setHex(0x4f6a86);
    const moteurNoir = K.propre(M.plastiqueNoir);
    const moteurAcier = K.propre(M.acier);

    const boite = (x0, x1, y0, y1, z0, z1, mat, r) => {
      const g = r ? K.boite(x1 - x0, y1 - y0, z1 - z0, r) : new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
      return K.mesh(g, mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    };
    /* un cylindre d'axe X, Y ou Z */
    const cyl = (axe, r, a0, a1, c1, c2, mat, seg) => {
      const g = new T.CylinderGeometry(r, r, a1 - a0, seg || 24);
      if (axe === 'x') g.rotateZ(Math.PI / 2); else if (axe === 'z') g.rotateX(Math.PI / 2);
      const m = new T.Mesh(g, mat), c = (a0 + a1) / 2;
      if (axe === 'x') m.position.set(c, c1, c2); else if (axe === 'y') m.position.set(c1, c, c2); else m.position.set(c1, c2, c);
      return m;
    };
    /* une forme de révolution autour de l'axe X : points [rayon, x] */
    const revolutionX = (pts, mat, y, z, seg) => {
      const g = new T.LatheGeometry(pts.map(([r, x]) => new T.Vector2(r, x)), seg || 48);
      g.rotateZ(-Math.PI / 2);
      const m = new T.Mesh(g, mat); m.position.set(0, y, z); return m;
    };

    /* ================================================================ LES COTES */
    const Y0 = 120, Y1 = 1120;                 /* le corps de la centrale, posé sur son châssis */
    const YI0 = 170, YI1 = 1070, ZI = 450;     /* l'intérieur : panneaux de 50 mm */
    const YC = 620;                            /* l'axe du ventilateur et du soufflage */
    const X = [0, 700, 1250, 1550, 2000, 2500, 3400];   /* les caissons, bout à bout */
    const XR0 = 150, XR1 = 650;                /* l'ouverture du recyclage sur le toit du mélange */
    const YG0 = 1600, YG1 = 2000;              /* la gaine de reprise, au plafond */
    const XMUR0 = -700, XMUR1 = -500, YMUR = 2300;

    /* ================================================================ LE CHÂSSIS */
    const chassis = new T.Group();
    [-440, 440].forEach(z => chassis.add(boite(-20, 3420, 0, Y0, z - 40, z + 40, galva)));
    for (let x = 0; x <= 3400; x += 680) chassis.add(boite(x - 30, x + 30, 30, 110, -400, 400, galva));
    racine.add(chassis);

    /* ================================================================ LES CAISSONS */
    const caissons = [];
    const poignee = (x, y) => {
      const g = new T.Group();
      g.add(boite(-14, 14, -14, 14, 0, 14, noir, 3));
      g.add(boite(-10, 10, -70, 10, 14, 30, noir, 4));
      g.position.set(x, y, 500); return g;
    };
    const charniere = (x, y) => cyl('y', 9, y - 40, y + 40, x, 504, profil, 12);
    const faireCaisson = (i, o) => {
      const xa = X[i], xb = X[i + 1], g = new T.Group();
      /* le dessous et le dessus (le toit du mélange est ouvert sur le recyclage) */
      g.add(boite(xa, xb, Y0, YI0, -500, 500, panneau));
      if (o.toitOuvert) {
        g.add(boite(xa, XR0, YI1, Y1, -500, 500, panneau), boite(XR1, xb, YI1, Y1, -500, 500, panneau));
        g.add(boite(XR0, XR1, YI1, Y1, -500, -300, panneau), boite(XR0, XR1, YI1, Y1, 300, 500, panneau));
      } else g.add(boite(xa, xb, YI1, Y1, -500, 500, panneau, 4));
      /* l'arrière, et la peau intérieure qu'on voit en coupe */
      g.add(boite(xa, xb, YI0, YI1, -500, -450, panneau));
      g.add(boite(xa, xb, YI0, YI1, -450, -448, panneauInt));
      /* l'avant : une porte de visite, ou un panneau vissé */
      const avant = boite(xa + 4, xb - 4, YI0, YI1, 450, 500, panneau, 4);
      g.add(avant);
      let porte = null;
      if (o.porte) {
        porte = new T.Group(); porte.add(avant);
        porte.add(poignee(xb - 70, YC + 210), poignee(xb - 70, YC - 150));
        porte.add(charniere(xa + 30, YI1 - 120), charniere(xa + 30, YI0 + 120));
        g.add(porte);
      }
      /* l'ossature : un cadre de profilés à chaque bout du caisson */
      [xa, xb].forEach((x, k) => {
        const x0 = k ? x - 30 : x, x1 = k ? x : x + 30;
        g.add(boite(x0, x1, Y0, YI0 + 8, -506, 506, profil), boite(x0, x1, YI1 - 8, Y1 + 4, -506, 506, profil));
        g.add(boite(x0, x1, Y0, Y1, 494, 506, profil), boite(x0, x1, Y0, Y1, -506, -494, profil));
      });
      caissons.push(g); racine.add(g);
      return { g, porte, avant };
    };
    const cMel = faireCaisson(0, { toitOuvert: true });
    const cFil = faireCaisson(1, { porte: true });
    const cBC = faireCaisson(2, {});
    const cBF = faireCaisson(3, {});
    const cHum = faireCaisson(4, {});
    const cVen = faireCaisson(5, { porte: true });
    /* les deux bouts : l'entrée d'air neuf à gauche, le soufflage à droite */
    cMel.g.add(boite(0, 50, Y0, 220, -500, 500, panneau), boite(0, 50, 1020, Y1, -500, 500, panneau));
    cMel.g.add(boite(0, 50, 220, 1020, -500, -400, panneau), boite(0, 50, 220, 1020, 400, 500, panneau));
    cVen.g.add(boite(3350, 3400, Y0, 320, -500, 500, panneau), boite(3350, 3400, 920, Y1, -500, 500, panneau));
    cVen.g.add(boite(3350, 3400, 320, 920, -500, -300, panneau), boite(3350, 3400, 320, 920, 300, 500, panneau));
    /* la flèche de sens de l'air, collée sur le panneau avant du mélange (un marquage réel) */
    const fl = new T.Shape();
    [[-150, -22], [60, -22], [60, -55], [150, 0], [60, 55], [60, 22], [-150, 22]].forEach((p, i) => i ? fl.lineTo(p[0], p[1]) : fl.moveTo(p[0], p[1]));
    const fleche = K.mesh(new T.ShapeGeometry(fl), C(K.plastique(0x1b3a63, 0.5)), 350, YI1 - 120, 501);
    cMel.g.add(fleche);

    /* ================================================================ LE MUR, LA PRISE ET LE REJET */
    const mur = new T.Group();
    mur.add(boite(XMUR0, XMUR1, 0, 220, -800, 800, beton), boite(XMUR0, XMUR1, 1020, YG0, -800, 800, beton), boite(XMUR0, XMUR1, YG1, YMUR, -800, 800, beton));
    mur.add(boite(XMUR0, XMUR1, 220, 1020, -800, -400, beton), boite(XMUR0, XMUR1, 220, 1020, 400, 800, beton));
    mur.add(boite(XMUR0, XMUR1, YG0, YG1, -800, -300, beton), boite(XMUR0, XMUR1, YG0, YG1, 300, 800, beton));
    racine.add(mur);
    /* une grille pare-pluie : un cadre et des lames inclinées vers le bas, côté dehors */
    const grille = (y0, y1, zl) => {
      const g = new T.Group();
      g.add(boite(-760, -700, y0 - 30, y0, -zl - 30, zl + 30, galva), boite(-760, -700, y1, y1 + 30, -zl - 30, zl + 30, galva));
      g.add(boite(-760, -700, y0, y1, -zl - 30, -zl, galva), boite(-760, -700, y0, y1, zl, zl + 30, galva));
      for (let y = y0 + 45; y < y1; y += 70) { const l = boite(-50, 50, -2, 2, -zl, zl, galva); l.rotation.z = -40 * D; l.position.set(-730, y, 0); g.add(l); }
      return g;
    };
    const grilleAN = grille(220, 1020, 400), grilleRejet = grille(YG0, YG1, 300);
    racine.add(grilleAN, grilleRejet);
    /* une gaine rectangulaire le long de X (parois de 8 mm) */
    const gaineX = (x0, x1, y0, y1, zl, mat, sansDessous) => {
      const g = new T.Group();
      g.add(boite(x0, x1, y1, y1 + 8, -zl - 8, zl + 8, mat));
      if (!sansDessous) g.add(boite(x0, x1, y0 - 8, y0, -zl - 8, zl + 8, mat));
      g.add(boite(x0, x1, y0, y1, -zl - 8, -zl, mat), boite(x0, x1, y0, y1, zl, zl + 8, mat));
      return g;
    };
    const gaineAN = gaineX(XMUR1, 0, 220, 1020, 400, galva);
    racine.add(gaineAN);

    /* les registres : un cadre, des lames opposées, un servomoteur.
       flux 'x' : lames empilées en hauteur ; flux 'y' : lames empilées le long de X. Angle 0 = ouvert. */
    const registre = (flux, cx, cy, h, zl) => {
      const g = new T.Group(), lames = [];
      const n = Math.max(3, Math.round(h / 110)), pas = h / n;
      if (flux === 'x') {
        g.add(boite(cx - 60, cx + 60, cy - h / 2 - 25, cy - h / 2, -zl - 10, zl + 10, galva), boite(cx - 60, cx + 60, cy + h / 2, cy + h / 2 + 25, -zl - 10, zl + 10, galva));
        for (let i = 0; i < n; i++) { const l = new T.Mesh(new T.BoxGeometry(pas * 1.04, 4, zl * 2 - 6), lame); l.position.set(cx, cy - h / 2 + pas * (i + 0.5), 0); g.add(l); lames.push(l); }
      } else {
        g.add(boite(cx - h / 2 - 25, cx - h / 2, cy - 60, cy + 60, -zl - 10, zl + 10, galva), boite(cx + h / 2, cx + h / 2 + 25, cy - 60, cy + 60, -zl - 10, zl + 10, galva));
        for (let i = 0; i < n; i++) { const l = new T.Mesh(new T.BoxGeometry(4, pas * 1.04, zl * 2 - 6), lame); l.position.set(cx - h / 2 + pas * (i + 0.5), cy, 0); g.add(l); lames.push(l); }
      }
      /* le servomoteur, sur la face avant, et son axe */
      const s = new T.Group();
      s.add(boite(-70, 70, -45, 45, 0, 70, servo, 6));
      s.add(cyl('z', 8, -30, 0, 0, 0, M.zingue, 12));
      s.position.set(flux === 'x' ? cx : cx - h / 2 + pas / 2, flux === 'x' ? cy - h / 2 + pas / 2 : cy, zl + 10);
      g.add(s);
      return { g, ouvrir: a => lames.forEach((l, i) => { l.rotation.z = (i % 2 ? -1 : 1) * a; }) };
    };
    const regAN = registre('x', -120, 620, 800, 400);
    const regRejet = registre('x', -300, (YG0 + YG1) / 2, 400, 300);
    const regRecy = registre('y', (XR0 + XR1) / 2, 1300, 500, 300);
    racine.add(regAN.g, regRejet.g, regRecy.g);

    /* la reprise au plafond, le té, la descente vers le mélange */
    const reprise = new T.Group();
    reprise.add(boite(XMUR1, 3900, YG1, YG1 + 8, -308, 308, galva));                                 /* dessus */
    reprise.add(boite(XMUR1, XR0 - 8, YG0 - 8, YG0, -308, 308, galva), boite(XR1 + 8, 3900, YG0 - 8, YG0, -308, 308, galva));
    reprise.add(boite(XMUR1, 3900, YG0, YG1, -308, -300, galva), boite(XMUR1, 3900, YG0, YG1, 300, 308, galva));
    reprise.add(boite(XR0 - 8, XR0, Y1, YG0, -308, 308, galva), boite(XR1, XR1 + 8, Y1, YG0, -308, 308, galva));
    reprise.add(boite(XR0, XR1, Y1, YG0, -308, -300, galva), boite(XR0, XR1, Y1, YG0, 300, 308, galva));
    racine.add(reprise);
    /* le soufflage, avec sa manchette souple (le ventilateur ne transmet pas ses vibrations) */
    const soufflage = new T.Group();
    soufflage.add(gaineX(3480, 3900, 320, 920, 300, galva));
    soufflage.add(gaineX(3400, 3480, 316, 924, 304, souple));
    racine.add(soufflage);

    /* ================================================================ LE FILTRE À POCHES */
    const filtre = new T.Group();
    /* le cadre-glissière : un pourtour et une traverse ; les poches s'y accrochent */
    filtre.add(boite(770, 800, YI1 - 15, YI1, -ZI, ZI, cadreFiltre), boite(770, 800, YI0, YI0 + 15, -ZI, ZI, cadreFiltre), boite(770, 800, YC - 8, YC + 8, -ZI, ZI, cadreFiltre));
    filtre.add(boite(770, 800, YI0, YI1, -ZI, -ZI + 10, cadreFiltre), boite(770, 800, YI0, YI1, ZI - 10, ZI, cadreFiltre));
    /* douze poches en V, ouvertes vers l'amont : en coupe, on voit le V et l'air qui y entre */
    const poche = yc => {
      const g = new T.Group(), a = Math.atan2(30, 380);
      [1, -1].forEach(s => { const p = boite(-190, 190, -1.5, 1.5, -ZI + 10, ZI - 10, media); p.rotation.z = -s * a; p.position.set(990, yc + s * 21, 0); g.add(p); });
      g.add(boite(1178, 1184, yc - 7, yc + 7, -ZI + 10, ZI - 10, media));
      return g;
    };
    for (let k = 0; k < 12; k++) filtre.add(poche(YI0 + 37.5 + k * 75));
    cFil.g.add(filtre);
    /* le manomètre différentiel, sur le toit, et ses deux prises de part et d'autre du filtre */
    const manometre = new T.Group();
    const cad = document.createElement('canvas'); cad.width = cad.height = 256;
    {
      const x = cad.getContext('2d');
      x.fillStyle = '#fbfaf6'; x.beginPath(); x.arc(128, 128, 126, 0, 2 * Math.PI); x.fill();
      x.strokeStyle = '#1b3a63'; x.lineWidth = 4; x.stroke();
      x.fillStyle = '#1b3a63'; x.font = '700 26px Calibri, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (let v = 0; v <= 500; v += 50) {
        const a = (-225 + v / 500 * 270) * D, l = v % 100 ? 12 : 22;
        x.lineWidth = v % 100 ? 2 : 4; x.beginPath();
        x.moveTo(128 + Math.cos(a) * 112, 128 + Math.sin(a) * 112); x.lineTo(128 + Math.cos(a) * (112 - l), 128 + Math.sin(a) * (112 - l)); x.stroke();
        if (!(v % 100)) x.fillText(String(v), 128 + Math.cos(a) * 70, 128 + Math.sin(a) * 70);
      }
      x.font = '700 24px Calibri, Arial, sans-serif'; x.fillText('Pa', 128, 182);
    }
    const texCad = new T.CanvasTexture(cad); texCad.colorSpace = T.SRGBColorSpace; texCad.anisotropy = 4;
    const boitier = cyl('z', 72, -330, -290, 975, Y1 + 190, C(K.plastique(0x2a2d31, 0.5)), 40);
    const face = K.mesh(new T.CircleGeometry(66, 40), new T.MeshBasicMaterial({ map: texCad, toneMapped: false }), 975, Y1 + 190, -289);
    const aiguillePivot = new T.Group(); aiguillePivot.position.set(975, Y1 + 190, -287);
    aiguillePivot.add(K.mesh(new T.BoxGeometry(4, 58, 2), C(K.plastique(0xc9451a, 0.4)), 0, 26, 0));
    aiguillePivot.add(cyl('z', 6, -1, 2, 0, 0, noir, 12));
    manometre.add(boitier, face, aiguillePivot, boite(955, 995, Y1, Y1 + 120, -320, -300, galva));
    const tuyauP = (x, couleur) => K.fil([[x, Y1, -250], [x, Y1 + 40, -250], [975 + (x < 975 ? -40 : 40), Y1 + 110, -300], [975 + (x < 975 ? -20 : 20), Y1 + 120, -310]], 6, C(K.plastique(couleur, 0.35))).mesh;
    manometre.add(tuyauP(730, 0x2f6db5), tuyauP(1220, 0xc0392b));
    [730, 1220].forEach(x => manometre.add(cyl('y', 10, Y1, Y1 + 18, x, -250, M.laiton, 12)));
    cFil.g.add(manometre);

    /* ================================================================ LES BATTERIES
       Les tubes courent le long de Z, serrés dans des ailettes ; les coudes en épingle dépassent
       des plaques d'extrémité. Vue de l'amont, une batterie est une grille d'arêtes d'ailettes. */
    const texAilettes = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d'); x.fillStyle = '#c3c8cd'; x.fillRect(0, 0, 128, 128);
      x.fillStyle = '#9097a0'; for (let i = 0; i < 128; i += 4) x.fillRect(i, 0, 1.4, 128);
      x.fillStyle = 'rgba(184,104,60,.85)'; for (let j = 14; j < 128; j += 32) x.fillRect(0, j, 128, 5);
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const batterie = (xa, xb, y0, y1, rangs, tuyau) => {
      const g = new T.Group();
      const tex = texAilettes.clone(); tex.needsUpdate = true; tex.repeat.set(6, (y1 - y0) / 120);
      const ail = C(new T.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0.55 }));
      const bloc = boite(xa, xb, y0, y1, -380, 380, ail);
      g.add(bloc);
      g.add(boite(xa - 10, xb + 10, y0 - 10, y1 + 10, 380, 395, plaqueBat), boite(xa - 10, xb + 10, y0 - 10, y1 + 10, -395, -380, plaqueBat));
      g.add(boite(xa - 10, xb + 10, y1, y1 + 15, -395, 395, plaqueBat), boite(xa - 10, xb + 10, y0 - 15, y0, -395, 395, plaqueBat));
      /* les coudes en épingle, avant et arrière (une seule géométrie, posée N fois) */
      const pasY = 45, ys = []; for (let y = y0 + 25; y < y1 - 10; y += pasY) ys.push(y);
      const xs = []; for (let r = 0; r < rangs; r++) xs.push(xa + (xb - xa) * (r + 0.5) / rangs);
      const geoCoude = new T.TorusGeometry(pasY / 2, 6, 6, 10, Math.PI);
      const poser = (avant) => {
        const paires = []; xs.forEach(x => { for (let i = avant ? 0 : 1; i + 1 < ys.length; i += 2) paires.push([x, (ys[i] + ys[i + 1]) / 2]); });
        const im = new T.InstancedMesh(geoCoude, cuivre, paires.length);
        const base = new T.Matrix4().makeBasis(V(0, 1, 0), avant ? V(0, 0, 1) : V(0, 0, -1), avant ? V(1, 0, 0) : V(-1, 0, 0));
        paires.forEach(([x, y], i) => im.setMatrixAt(i, new T.Matrix4().makeTranslation(x, y, avant ? 395 : -395).multiply(base)));
        im.instanceMatrix.needsUpdate = true; g.add(im);
      };
      poser(true); poser(false);
      /* les collecteurs, dehors sur la face avant, et la tuyauterie qui monte vers la production */
      const xEnt = xb - 20, xSor = xa + 20;
      [xSor, xEnt].forEach(x => {
        g.add(cyl('y', 21, y0 + 10, y1 - 10, x, 540, cuivre, 20));
        for (let y = y0 + 60; y < y1 - 30; y += 120) g.add(cyl('z', 8, 395, 540, x, y, cuivre, 10));
        g.add(cyl('y', 24, y1 - 10, 1500, x, 540, tuyau, 20));
        g.add(cyl('y', 34, 1290, 1340, x, 540, M.laiton, 6));            /* la vanne d'isolement */
      });
      /* la vanne de régulation et son servomoteur, sur l'arrivée */
      const vr = new T.Group();
      vr.add(boite(-45, 45, -40, 40, -45, 45, M.laiton, 6), boite(-55, 55, 50, 150, -50, 50, servo, 8));
      vr.position.set(xEnt, 1180, 540); g.add(vr);
      return { g, ail, bloc, ys, xs };
    };
    const bc = batterie(1320, 1480, 230, 1030, 2, rouge);
    cBC.g.add(bc.g);
    const bf = batterie(1620, 1840, 270, 1040, 3, bleu);
    cBF.g.add(bf.g);
    /* le bac à condensats, en inox, sa pente, son évacuation et son siphon dehors */
    const bac = new T.Group();
    bac.add(boite(1585, 1990, YI0 + 5, YI0 + 15, -ZI, ZI, inox));
    bac.add(boite(1585, 1595, YI0 + 5, 235, -ZI, ZI, inox), boite(1980, 1990, YI0 + 5, 235, -ZI, ZI, inox));
    const eauBac = boite(1596, 1979, YI0 + 15, YI0 + 32, -ZI + 2, ZI - 2, new T.MeshStandardMaterial({ color: 0x5fa6e6, roughness: 0.2, transparent: true, opacity: 0.55, depthWrite: false }));
    eauBac.userData.voile = true; eauBac.userData.sansOmbre = true; eauBac.visible = false;
    bac.add(eauBac);
    bac.add(cyl('z', 16, 440, 560, 1960, YI0 + 25, pvc, 16));
    bac.add(K.fil([[1960, YI0 + 25, 560], [1960, 120, 600], [1960, 40, 640], [1960, 120, 680], [1960, 160, 700], [1960, 30, 760], [1960, 0, 800]], 16, pvc).mesh);
    cBF.g.add(bac);

    /* ================================================================ L'HUMIDIFICATEUR À VAPEUR */
    const humid = new T.Group();
    humid.add(cyl('z', 22, -ZI + 10, ZI - 10, 2150, YC, vapeurTube, 20));
    for (let z = -380; z <= 380; z += 95) humid.add(cyl('x', 7, 2150, 2185, YC, z, vapeurTube, 10));
    humid.add(K.fil([[2150, YC, ZI - 10], [2150, YC, 560], [2150, YC + 120, 620], [2150, 1500, 640]], 20, C(K.plastique(0xe8e6df, 0.6))).mesh);
    cHum.g.add(humid);

    /* ================================================================ LE VENTILATEUR À ROUE LIBRE */
    const ventil = new T.Group();
    /* la cloison et son pavillon d'aspiration */
    const disque = new T.Shape(); disque.moveTo(-ZI, -450); disque.lineTo(ZI, -450); disque.lineTo(ZI, 450); disque.lineTo(-ZI, 450); disque.lineTo(-ZI, -450);
    const trou = new T.Path(); trou.absarc(0, 0, 330, 0, Math.PI * 2, true); disque.holes.push(trou);
    const cloisonG = new T.ShapeGeometry(disque, 48); cloisonG.rotateY(Math.PI / 2);
    const cloisonDisque = new T.Mesh(cloisonG, panneauInt); cloisonDisque.position.set(2590, YC, 0); cloisonDisque.scale.set(1, (YI1 - YI0) / 900, 1);
    ventil.add(cloisonDisque);
    ventil.add(revolutionX([[330, 2600], [318, 2640], [300, 2680], [288, 2720]], profil, YC, 0, 56));
    /* la roue : flasque d'entrée, disque arrière, sept aubes recourbées vers l'arrière */
    const roue = new T.Group();
    roue.add(revolutionX([[292, 2712], [312, 2730], [336, 2760], [340, 2770]], roueTole, 0, 0, 56));
    roue.add(cyl('x', 340, 2895, 2905, 0, 0, roueTole, 56));
    roue.add(cyl('x', 70, 2860, 2930, 0, 0, roueMat, 24));
    const aube = phi0 => {
      const N = 10, pts = [], bord = [];
      for (let i = 0; i <= N; i++) {
        const u = i / N, r = 180 + u * 156, a = phi0 - u * 38 * D;
        const p = new T.Vector2(Math.cos(a) * r, Math.sin(a) * r), t = new T.Vector2(Math.cos(a + 1.2), Math.sin(a + 1.2));
        pts.push(p.clone().addScaledVector(t, 4)); bord.push(p.clone().addScaledVector(t, -4));
      }
      const s = new T.Shape(pts); bord.reverse().forEach(p => s.lineTo(p.x, p.y));
      const g = new T.ExtrudeGeometry(s, { depth: 128, bevelEnabled: false, curveSegments: 3 });
      g.applyMatrix4(new T.Matrix4().makeBasis(V(0, 1, 0), V(0, 0, 1), V(1, 0, 0)));
      g.translate(2767, 0, 0);
      return new T.Mesh(g, roueMat);
    };
    for (let i = 0; i < 7; i++) roue.add(aube(i * 360 / 7 * D));
    roue.position.set(0, YC, 0);
    ventil.add(roue);
    /* le moteur, en bout d'arbre, sur son support et ses plots antivibratiles */
    const moteur = new T.Group();
    moteur.add(cyl('x', 18, 2900, 2990, YC, 0, moteurAcier, 16));
    moteur.add(cyl('x', 150, 2990, 3290, YC, 0, moteurMat, 40));
    for (let x = 3010; x < 3280; x += 26) moteur.add(cyl('x', 160, x, x + 8, YC, 0, moteurMat, 40));
    moteur.add(cyl('x', 140, 3290, 3320, YC, 0, moteurNoir, 40));
    moteur.add(boite(3080, 3200, YC + 150, YC + 230, -70, 70, moteurMat, 6));
    moteur.add(boite(3000, 3280, YI0 + 60, YC - 150, -110, 110, moteurAcier));
    [-90, 90].forEach(z => [3030, 3250].forEach(x => moteur.add(cyl('y', 26, YI0, YI0 + 60, x, z, moteurNoir, 16))));
    ventil.add(moteur);
    cVen.g.add(ventil);

    /* ================================================================ LES SONDES (derrière l'axe : entières en coupe) */
    const sondes = new T.Group();
    const sonde = (x, yHaut, longueur) => {
      const s = new T.Group();
      s.add(boite(x - 45, x + 45, yHaut, yHaut + 70, -190, -110, sondeMat, 8));
      s.add(cyl('y', 6, yHaut - longueur, yHaut, x, -150, moteurAcier, 10));
      return s;
    };
    sondes.add(sonde(3700, 928, 300), sonde(3000, YG1 + 8, 220));
    racine.add(sondes);

    /* ================================================================ LES FACES DE COUPE (plan z = 0)
       Isolant des panneaux hachuré, béton hachuré, tôle des gaines unie, ailette percée de ses tubes. */
    const hachures = (fond, trait, pas, ep) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = ep || 5;
      for (let i = -64; i <= 64; i += 32) { x.beginPath(); x.moveTo(i, 64); x.lineTo(i + 64, 0); x.stroke(); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / pas, 1 / pas);
      return new T.MeshStandardMaterial({ map: t, roughness: 0.8, side: T.DoubleSide });
    };
    const H = {
      isolant: hachures('#efe2a8', '#9b8a45', 26, 4),
      beton: hachures('#b9b2a4', '#6d665a', 60, 6),
      tole: new T.MeshStandardMaterial({ color: 0x59636d, roughness: 0.5, side: T.DoubleSide })
    };
    const faces = new T.Group(); faces.visible = false; racine.add(faces);
    const rect = (x0, x1, y0, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    const faceDe = (polys, mat, groupe) => {
      const g = new T.ShapeGeometry(polys.map(p => new T.Shape(p.map(q => new T.Vector2(q[0], q[1])))));
      const m = new T.Mesh(g, mat); m.position.z = 0.5; m.userData.sansOmbre = true; m.castShadow = false;
      (groupe || faces).add(m); return m;
    };
    const facesCaisson = X.slice(0, -1).map((xa, i) => {
      const f = new T.Group(); faces.add(f);
      const xb = X[i + 1];
      const p = [rect(xa, xb, Y0, YI0)];
      if (i === 0) p.push(rect(xa, XR0, YI1, Y1), rect(XR1, xb, YI1, Y1), rect(0, 50, Y0, 220), rect(0, 50, 1020, Y1));
      else p.push(rect(xa, xb, YI1, Y1));
      if (i === 5) p.push(rect(3350, 3400, Y0, 320), rect(3350, 3400, 920, Y1));
      faceDe(p, H.isolant, f);
      if (i === 5) faceDe([rect(2580, 2600, YI0, YC - 330), rect(2580, 2600, YC + 330, YI1)], H.tole, f);
      caissons[i].add(f); f.visible = false;
      return f;
    });
    faceDe([rect(XMUR0, XMUR1, 0, 220), rect(XMUR0, XMUR1, 1020, YG0), rect(XMUR0, XMUR1, YG1, YMUR)], H.beton);
    faceDe([rect(XMUR1, 0, 1020, 1028), rect(XMUR1, 0, 212, 220),
            rect(XMUR1, 3900, YG1, YG1 + 8), rect(XMUR1, XR0 - 8, YG0 - 8, YG0), rect(XR1 + 8, 3900, YG0 - 8, YG0),
            rect(XR0 - 8, XR0, Y1, YG0), rect(XR1, XR1 + 8, Y1, YG0)], H.tole);
    const facesSouff = new T.Group(); faces.add(facesSouff); soufflage.add(facesSouff); facesSouff.visible = false;
    faceDe([rect(3480, 3900, 920, 928), rect(3480, 3900, 312, 320)], H.tole, facesSouff);
    /* l'ailette coupée : une tôle d'aluminium percée par les tubes de cuivre */
    const ailetteCoupee = (b, xa, xb, y0, y1, groupe) => {
      const W = 256, Hh = Math.round(256 * (y1 - y0) / (xb - xa));
      const c = document.createElement('canvas'); c.width = W; c.height = Hh;
      const x = c.getContext('2d'); x.fillStyle = '#c7ccd1'; x.fillRect(0, 0, W, Hh);
      const k = W / (xb - xa);
      b.xs.forEach(tx => b.ys.forEach(ty => {
        x.beginPath(); x.arc((tx - xa) * k, (y1 - ty) * k, 8 * k, 0, 2 * Math.PI); x.fillStyle = '#b8683c'; x.fill();
        x.beginPath(); x.arc((tx - xa) * k, (y1 - ty) * k, 5.5 * k, 0, 2 * Math.PI); x.fillStyle = '#7a3c1c'; x.fill();
      }));
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      const m = K.mesh(new T.PlaneGeometry(xb - xa, y1 - y0), new T.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0.3, side: T.DoubleSide }), (xa + xb) / 2, (y0 + y1) / 2, 0.5);
      m.userData.sansOmbre = true; groupe.add(m);
    };
    ailetteCoupee(bc, 1320, 1480, 230, 1030, facesCaisson[2]);
    ailetteCoupee(bf, 1620, 1840, 270, 1040, facesCaisson[3]);
    faceDe([rect(1585, 1990, YI0 + 5, YI0 + 15), rect(1585, 1595, YI0 + 5, 235), rect(1980, 1990, YI0 + 5, 235)], H.tole, facesCaisson[3]);

    /* ================================================================ L'AIR QUI CIRCULE
       Les grains courent dans le plan de coupe, un peu en avant (z = 15) : on les voit par-dessus
       les faces coupées. */
    const Z = 15;
    const courbe = pts => new T.CatmullRomCurve3(pts.map(p => V(p[0], p[1], p[2] === undefined ? Z : p[2])), false, 'centripetal');
    const flot = (pts, couleur, o) => K.courant(courbe(pts), Object.assign({ pas: 150, rayon: 24, couleur, vitesse: 500 }, o || {}));
    const LIGNES = [420, 620, 820];
    const fNeuf = LIGNES.map(y => flot([[-1100, y], [XMUR0, y], [0, y], [250, y + (YC - y) * 0.15], [420, y + (YC - y) * 0.2]], AIR.neuf));
    const fRepris = [1720, 1880].map(y => flot([[3950, y], [2000, y], [XR1 + 40, y]], AIR.repris));
    const fRecy = [300, 500].map(x => flot([[XR1 + 40, 1800], [x + 120, 1760], [x, 1600], [x, Y1], [x + 40, 900], [x + 140, 700]], AIR.repris));
    const fRejet = [1720, 1880].map(y => flot([[XR1 + 40, y], [XR0, y], [XMUR1, y], [-1100, y]], AIR.rejete));
    const fMel = LIGNES.map(y => flot([[420, y + (YC - y) * 0.2], [800, y], [1300, y]], AIR.neuf));
    const fEntre = LIGNES.map(y => flot([[1300, y], [1600, y]], AIR.souffle));
    const fTraite = LIGNES.map(y => flot([[1600, y], [2200, y], [2560, y], [2640, YC + (y - YC) * 0.55], [2760, YC + (y - YC) * 0.2]], AIR.souffle));
    /* dans la roue : l'air entre par l'ouïe, au centre, et sort par le bord, en haut et en bas */
    const fRoue = [1, -1].map(s => flot([[2700, YC], [2790, YC + s * 60], [2830, YC + s * 200], [2840, YC + s * 345], [2900, YC + s * 400], [3150, YC + s * 380], [3380, YC + s * 160], [3480, YC + s * 120]], AIR.souffle, { pas: 120 }));
    const fSouffle = LIGNES.map(y => flot([[3380, YC + (y - YC) * 0.6], [3480, y], [3950, y]], AIR.souffle));
    const groupesFlots = { fNeuf, fRepris, fRecy, fRejet, fMel, fEntre, fTraite, fRoue, fSouffle };
    const tousFlots = Object.values(groupesFlots).flat();
    tousFlots.forEach(f => racine.add(f.objet));

    /* la vapeur et les gouttes de condensation : des grains qui naissent et meurent */
    const bouffees = (() => {
      const N = 36, geo = new T.SphereGeometry(1, 8, 6);
      const mat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.55, depthWrite: false });
      const im = new T.InstancedMesh(geo, mat, N); im.userData.sansOmbre = true; im.userData.voile = true; im.frustumCulled = false;
      const graines = Array.from({ length: N }, (_, i) => ({ u: i / N, z: -380 + (i % 5) * 95, y: YC + ((i * 37) % 60) - 30 }));
      const m4 = new T.Matrix4(), q = new T.Quaternion(), s = new T.Vector3(), p = new T.Vector3();
      return { objet: im, animer(dt) { graines.forEach((g, i) => { g.u = (g.u + dt * 0.35) % 1; p.set(2190 + g.u * 300, g.y + g.u * 40, g.z); s.setScalar(14 + g.u * 46); m4.compose(p, q, s); im.setMatrixAt(i, m4); }); im.instanceMatrix.needsUpdate = true; } };
    })();
    const gouttes = (() => {
      const N = 30, geo = new T.SphereGeometry(7, 8, 6);
      const im = new T.InstancedMesh(geo, K.lumineux(0x2f7fd6), N); im.userData.sansOmbre = true; im.frustumCulled = false;
      const graines = Array.from({ length: N }, (_, i) => ({ u: i / N, x: 1630 + (i * 53) % 200 }));
      const m4 = new T.Matrix4(), q = new T.Quaternion(), s = new T.Vector3(1, 1.5, 1), p = new T.Vector3();
      return { objet: im, animer(dt) { graines.forEach((g, i) => { g.u = (g.u + dt * 0.9) % 1; p.set(g.x, 262 - g.u * 70, Z); m4.compose(p, q, s); im.setMatrixAt(i, m4); }); im.instanceMatrix.needsUpdate = true; } };
    })();
    racine.add(bouffees.objet, gouttes.objet);
    bouffees.animer(0); gouttes.animer(0);

    /* ================================================================ L'ÉTAT */
    const SAISONS = { hiver: { ext: 5, rep: 22, souf: 20 }, ete: { ext: 32, rep: 24, souf: 16 } };
    const PHASES = ['neuf', 'melange', 'filtre', 'batteries', 'humid', 'marche'];
    const E = { marche: false, saison: 'hiver', airNeuf: 35, filtre: 'propre', phase: 'marche', coupe: false, demonte: false };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
    const debitTotal = () => E.filtre === 'encrasse' ? 1700 : 2000;
    const calc = () => {
      const s = SAISONS[E.saison], f = E.airNeuf / 100, q = debitTotal();
      const qn = Math.round(f * q), qr = q - qn;   /* le calcul de la station : chaque température pesée par son débit */
      return { s, f, q, qn, qr, tm: (qn * s.ext + qr * s.rep) / q, dp: E.filtre === 'encrasse' ? 260 : 90 };
    };
    const couleurMelange = () => new T.Color(AIR.neuf).lerp(new T.Color(AIR.repris), 1 - E.airNeuf / 100);
    const air = (cle, mot) => '<b class="air air-' + cle + '">' + mot + '</b>';
    const majMesures = () => {
      const c = calc(), m = E.marche;
      ctx.mesures([
        { libelle: 'L’air neuf', valeur: (m ? nb(c.qn, 0) : '0') + ' m³/h · ' + nb(c.s.ext, 0) + ' °C' },
        { libelle: 'L’air recyclé', valeur: (m ? nb(c.qr, 0) : '0') + ' m³/h · ' + nb(c.s.rep, 0) + ' °C' },
        { libelle: 'Le mélange', valeur: nb(c.tm, 1) + ' °C' },
        { libelle: 'Le soufflage', valeur: (m ? nb(c.q, 0) : '0') + ' m³/h · ' + (m ? nb(c.s.souf, 0) : nb(c.tm, 1)) + ' °C' },
        { libelle: 'L’écart au filtre', valeur: (m ? nb(c.dp, 0) : '0') + ' Pa' }
      ]);
    };
    const majTexte = () => {
      majMesures();
      if (!E.marche) { ctx.dire('<strong>À l’arrêt.</strong> Le ventilateur ne tourne pas : aucun air ne circule dans la centrale.'); return; }
      const c = calc(), hiver = E.saison === 'hiver';
      ctx.dire('<strong>' + (hiver ? 'Hiver' : 'Été') + ', ' + E.airNeuf + ' % d’air neuf.</strong> ' + air('neuf', 'L’air neuf') + ' à ' + nb(c.s.ext, 0) + ' °C et '
        + air('repris', 'l’air repris') + ' à ' + nb(c.s.rep, 0) + ' °C donnent un mélange à ' + nb(c.tm, 1) + ' °C. '
        + (hiver ? 'La batterie chaude le porte à ' : 'La batterie froide le ramène à ') + nb(c.s.souf, 0) + ' °C avant le ' + air('souffle', 'soufflage') + '. '
        + (E.filtre === 'encrasse' ? 'Le filtre encrassé freine l’air : le débit tombe à ' + nb(c.q, 0) + ' m³/h. ' : '')
        + '<em>À l’écran, l’air est très ralenti.</em>');
    };
    const rang = () => PHASES.indexOf(E.phase) + 1;
    const visibles = () => {
      const on = E.marche && !E.demonte, r = rang(), f = E.airNeuf / 100, hiver = E.saison === 'hiver';
      /* le partage fait par les registres : la part d'air neuf commande les trois débits
         (réglé AVANT la visibilité : le kit rallume les grains qu'il avait lui-même éteints) */
      fNeuf.forEach(x => x.regler({ debit: 0.25 + 0.75 * f })); fRejet.forEach(x => x.regler({ debit: 0.25 + 0.75 * f }));
      fRecy.forEach(x => x.regler({ debit: Math.max(0, 1 - f) * 1.1 }));
      const voir = (liste, min) => liste.forEach(x => { x.objet.visible = on && r >= min && !(liste === fRecy && f >= 0.99); });
      voir(fNeuf, 1); voir(fRepris, 2); voir(fRecy, 2); voir(fRejet, 2); voir(fMel, 2);
      voir(fEntre, 4); voir(fTraite, 4); voir(fRoue, 6); voir(fSouffle, 6);
      const cm = couleurMelange();
      fMel.forEach(x => x.objet.material.color.copy(cm));
      /* jusqu'à la batterie qui agit, l'air reste un mélange ; après elle, il est traité */
      fEntre.forEach(x => (hiver ? x.objet.material.color.setHex(AIR.souffle) : x.objet.material.color.copy(cm)));
      bouffees.objet.visible = on && hiver && r >= 5;
      gouttes.objet.visible = on && !hiver && r >= 4;
      eauBac.visible = !hiver && E.coupe;
    };
    const majBatteries = () => {
      const on = E.marche && rang() >= 4;
      K.chaleur(bc.ail, on && E.saison === 'hiver' ? 0.55 : 0);
      if (on && E.saison === 'ete') { bf.ail.emissive.setHex(0x1f5fb0); bf.ail.emissiveIntensity = 0.35; }
      else { bf.ail.emissive.setHex(0x000000); bf.ail.emissiveIntensity = 0; }
    };
    const majRegistres = () => {
      const f = E.airNeuf / 100;
      regAN.ouvrir((1 - f) * 70 * D); regRejet.ouvrir((1 - f) * 70 * D); regRecy.ouvrir(Math.min(85, f * 95) * D);
    };
    let aiguille = 0;
    const cibleAiguille = () => E.marche ? calc().dp : 0;
    const majFiltre = () => { media.color.setHex(E.filtre === 'encrasse' ? 0x8f826b : 0xf0e9d2); };

    const groupesFaces = [faces, ...facesCaisson, facesSouff];
    const voirFaces = on => groupesFaces.forEach(g => { g.visible = on; });
    const basculerCoupe = on => {
      E.coupe = on;
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      const exclus = new Set();
      [...groupesFaces, moteur, sondes, manometre, bouffees.objet, gouttes.objet, ...tousFlots.map(f => f.objet)].forEach(g => g.traverse(o => exclus.add(o)));
      racine.traverse(o => {
        if (!o.isMesh || exclus.has(o)) return;
        [o.material, o.userData.matAvantSurbrillance].forEach(m => { if (m) { m.clippingPlanes = plan; m.needsUpdate = true; } });
      });
      voirFaces(on);
      visibles();
    };

    majRegistres(); majFiltre(); majBatteries(); visibles(); majTexte();

    /* ---------------------------------------------------------------- pièces */
    const pieces = [
      { id: 'prise', nom: 'La prise d’air neuf et le rejet', objets: [grilleAN, gaineAN, grilleRejet], desc: 'Deux grilles dans le mur extérieur : en bas, l’air neuf entre ; en haut, l’air vicié sort. On les écarte l’une de l’autre, sinon la centrale respire son propre rejet.' },
      { id: 'registres', nom: 'Les registres', objets: [regAN.g, regRecy.g, regRejet.g], desc: 'Des volets à lames, ouverts ou fermés par un servomoteur. Ils dosent l’air neuf, l’air recyclé et l’air rejeté.' },
      { id: 'melange', nom: 'Le caisson de mélange', objets: [cMel.g], desc: 'L’air repris du local y rejoint l’air neuf. Il en sort un mélange, à une température comprise entre les deux.' },
      { id: 'filtre', nom: 'Le filtre à poches', objets: [filtre], desc: 'Des poches en fibres arrêtent les poussières. Il est placé avant les batteries, pour les garder propres.' },
      { id: 'manometre', nom: 'Le manomètre du filtre', objets: [manometre], desc: 'Il compare la pression avant et après le filtre. Quand l’écart atteint la valeur du constructeur, on change le filtre.' },
      { id: 'batterieChaude', nom: 'La batterie chaude', objets: [bc.g], desc: 'Des tubes de cuivre où circule l’eau chaude, serrés dans des ailettes. L’air passe entre les ailettes et se réchauffe.' },
      { id: 'batterieFroide', nom: 'La batterie froide et son bac', objets: [bf.g, bac], desc: 'Elle refroidit l’air avec de l’eau glacée. L’eau de l’air condense sur les ailettes, coule dans le bac, puis part au siphon.' },
      { id: 'humidificateur', nom: 'L’humidificateur', objets: [humid], desc: 'Une rampe percée souffle de la vapeur dans l’air. Il sert en hiver, quand l’air réchauffé est trop sec.' },
      { id: 'ventilateur', nom: 'Le ventilateur de soufflage', objets: [roue, moteur], desc: 'Une roue entraînée par un moteur. Elle aspire l’air à travers toute la centrale et le pousse dans les gaines.' },
      { id: 'sondes', nom: 'Les sondes', objets: [sondes], desc: 'Celle du soufflage commande le chauffage et le refroidissement. Celle de la reprise donne l’état du local.' },
      { id: 'gaines', nom: 'Le soufflage et la reprise', objets: [soufflage, reprise], desc: 'La gaine de soufflage porte l’air traité vers le local. La gaine de reprise ramène l’air du local vers la centrale.' },
      { id: 'portes', nom: 'Les portes de visite', objets: [cFil.porte, cVen.porte], desc: 'Des panneaux isolés, avec poignées. On les ouvre en grand pour changer le filtre ou nettoyer : il faut garder la place devant.' }
    ];

    const commandes = [
      { id: 'marche', type: 'choix', options: [['arret', 'Arrêt'], ['marche', 'En marche']], valeur: 'arret' },
      { id: 'saison', type: 'choix', options: [['hiver', 'Hiver'], ['ete', 'Été']], valeur: 'hiver' },
      { id: 'airNeuf', type: 'curseur', libelle: 'Part d’air neuf', min: 20, max: 100, pas: 5, valeur: 35, unite: '%' },
      { id: 'filtre', type: 'choix', options: [['propre', 'Filtre propre'], ['encrasse', 'Filtre encrassé']], valeur: 'propre' }
    ];

    const etapes = [
      { titre: 'La centrale, telle qu’on la pose', piece: 'portes', voirDedans: false, eclate: false, actions: [['marche', 'arret'], ['phase', 'marche']],
        vue: { azimut: 30, elevation: 20, zoom: 1.0, cible: null },
        texte: 'Des caissons posés bout à bout, avec des portes de visite devant. À gauche, le mur extérieur : la prise d’air neuf en bas, le rejet en haut, bien écartés.' },
      { titre: 'L’air neuf entre par la prise d’air', piece: 'prise', voirDedans: true, eclate: false, actions: [['saison', 'hiver'], ['marche', 'marche'], ['phase', 'neuf']],
        vue: { azimut: 14, elevation: 10, zoom: 1.7, cible: [-350, 700, 0] },
        texte: 'Aspiré par le ventilateur, ' + air('neuf', 'l’air du dehors') + ' traverse la grille, puis le registre d’air neuf, qui dose ce qu’on laisse entrer.' },
      { titre: 'L’air repris rejoint l’air neuf', piece: 'registres', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'melange']],
        vue: { azimut: 10, elevation: 12, zoom: 1.35, cible: [250, 1250, 0] },
        texte: air('repris', 'L’air qui revient du local') + ' se partage : une part descend dans le caisson de mélange, le reste sort dehors par le ' + air('rejete', 'rejet') + '. Les registres font ce partage.' },
      { titre: 'Le filtre arrête les poussières', piece: 'filtre', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'filtre']],
        vue: { azimut: 20, elevation: 16, zoom: 1.9, cible: [980, 760, 0] },
        texte: 'Le mélange traverse les poches du filtre. Le manomètre, sur le toit, compare la pression avant et après : plus l’écart grandit, plus le filtre est encrassé.' },
      { titre: 'La batterie change la température de l’air', piece: 'batterieChaude', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'batteries']],
        vue: { azimut: 16, elevation: 14, zoom: 1.75, cible: [1600, 650, 0] },
        texte: 'L’air passe entre les ailettes ; l’eau chaude des tubes le réchauffe. En été, c’est la batterie froide qui le refroidit, et l’eau de l’air condense dans le bac.' },
      { titre: 'L’humidificateur ajoute de la vapeur', piece: 'humidificateur', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'humid']],
        vue: { azimut: 16, elevation: 14, zoom: 1.9, cible: [2250, 650, 0] },
        texte: 'En hiver, l’air réchauffé devient sec. La rampe souffle de la vapeur dans le courant d’air : l’humidité remonte.' },
      { titre: 'Le ventilateur pousse l’air traité dans les gaines', piece: 'ventilateur', voirDedans: true, eclate: false, actions: [['marche', 'marche'], ['phase', 'marche']],
        vue: { azimut: 22, elevation: 14, zoom: 1.5, cible: [3100, 650, 0] },
        texte: 'La roue aspire l’air en son centre et le rejette par le bord. ' + air('souffle', 'L’air traité') + ' part vers le local. C’est elle qui fait circuler l’air dans toute la centrale.' }
    ];

    const eclate = [1, 2, 3, 4, 5].map(i => ({ objets: i === 5 ? [caissons[i], soufflage] : [caissons[i]], vers: [i * 240, 0, 0], debut: (i - 1) * 0.12, fin: 0.5 + i * 0.1 }));
    let angle = 0, w = 0;

    return {
      racine, pieces, commandes, etapes, eclate,
      eclateVue: { azimut: 24, elevation: 24, zoom: 0.8 },
      vue: { azimut: 22, elevation: 18, cadre: [mur, ...caissons, reprise, soufflage], marge: 0.7 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      agir(id, v) {
        if (id === 'phase') { E.phase = v; }
        if (id === 'marche') { E.marche = v === 'marche'; ctx.regler('marche', v); }
        if (id === 'saison') { E.saison = v; ctx.regler('saison', v); }
        if (id === 'airNeuf') { E.airNeuf = +v; ctx.regler('airNeuf', +v); majRegistres(); }
        if (id === 'filtre') { E.filtre = v; ctx.regler('filtre', v); majFiltre(); }
        visibles(); majBatteries(); majTexte();
      },
      surEclate(on) { E.demonte = on; voirFaces(E.coupe); visibles(); },
      animer(dt) {
        const ciblew = E.marche && !E.demonte ? 2 * Math.PI * 0.45 : 0;
        w = K.vers(w, ciblew, 1.6, dt); angle += w * dt; roue.rotation.x = -angle;
        aiguille = K.vers(aiguille, cibleAiguille(), 3, dt);
        aiguillePivot.rotation.z = -(-135 + aiguille / 500 * 270) * D;
        const r = w / (2 * Math.PI * 0.45), k = debitTotal() / 2000;
        tousFlots.forEach(f => { f.regler({ vitesse: 520 * r * k }); if (r > 0.01) f.animer(dt); });
        if (bouffees.objet.visible) bouffees.animer(dt);
        if (gouttes.objet.visible) gouttes.animer(dt);
        return w > 0.002 || ciblew > 0 || Math.abs(aiguille - cibleAiguille()) > 0.5;
      }
    };
  }, { famille: 'cta', titre: 'La centrale de traitement d’air', stations: ['architecture-cta', 'melange-filtration', 'air-neuf-selection', 'humidifier-reguler', 'air-circule'] });
})();
