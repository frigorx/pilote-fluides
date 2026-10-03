/* ÉlectroRézo — le kit 3D : matériaux et briques communes, en millimètres.
   window.Electro3DKit(T) → K. Un kit par vue 3D (ses matériaux meurent avec elle).

   Ce qui fait « beau » ici tient en trois choses, à garder partout :
   · des ARÊTES ADOUCIES (K.boite) — un pavé à angles vifs fait maquette ; un rayon de 0,6 à
     2 mm fait objet moulé ;
   · des MATIÈRES JUSTES — plastique d'appareillage gris clair (RAL 7035) et mat, cuivre poli,
     acier, tôle magnétique sombre, isolants aux couleurs de la NF C 15-100 ;
   · le COURANT VISIBLE — des grains dorés qui avancent dans les conducteurs, toujours la même
     couleur dans tout le réseau, pour que l'élève le reconnaisse d'une station à l'autre.

   Couleurs de sens (communes à tous les modèles) :
     courant       or     #ffb21a   (grains qui circulent)
     champ         bleu   #3d7fca   (lignes de champ, flux)
     chaleur       rouge sombre → orange (K.chaleur)
     défaut / arc  blanc bleuté + halo
     pièce allumée orange #ff6b35   (géré par le moteur) */
window.Electro3DKit = function (T) {
  'use strict';
  const K = { T };
  const aDetruire = [];
  const garde = x => { aDetruire.push(x); return x; };
  K.detruire = () => { aDetruire.forEach(x => { try { x.dispose(); } catch (e) {} }); aDetruire.length = 0; };

  const D2R = Math.PI / 180;
  K.D2R = D2R;
  K.clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  /* approche douce d'une cible : k = raideur (1/s) */
  K.vers = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
  K.lisse = t => t * t * (3 - 2 * t);

  /* ------------------------------------------------------------------ matériaux */
  const std = (couleur, rough, metal, extra) => garde(new T.MeshStandardMaterial(Object.assign({ color: couleur, roughness: rough, metalness: metal || 0 }, extra || {})));
  /* un grain fin dans le plastique : il casse le « tout lisse » des images de synthèse */
  const texGrain = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const x = c.getContext('2d'); x.fillStyle = '#bdbdbd'; x.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 2600; i++) { const g = 150 + Math.random() * 105 | 0; x.fillStyle = 'rgb(' + g + ',' + g + ',' + g + ')'; x.fillRect(Math.random() * 128, Math.random() * 128, 1, 1); }
    const t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(3, 3); t.colorSpace = T.NoColorSpace; return t;
  })();
  const texBrosse = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 256;
    const x = c.getContext('2d'); x.fillStyle = '#d0d0d0'; x.fillRect(0, 0, 64, 256);
    for (let i = 0; i < 500; i++) { const g = 150 + Math.random() * 105 | 0; x.fillStyle = 'rgba(' + g + ',' + g + ',' + g + ',.55)'; x.fillRect(Math.random() * 64, Math.random() * 256, 1, 20 + Math.random() * 120); }
    const t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.NoColorSpace; return t;
  })();
  const plast = (c, r) => std(c, r === undefined ? 0.58 : r, 0, { roughnessMap: texGrain });

  K.mat = {
    plastique:       plast(0xd9dbd6),          /* gris clair d'appareillage, RAL 7035 */
    plastiqueBlanc:  plast(0xf1efe8, 0.5),
    plastiqueSombre: plast(0x3a4047, 0.55),    /* boîtier de contacteur, de relais */
    plastiqueNoir:   plast(0x1f2226, 0.5),
    plastiqueMarine: plast(0x1b3a63, 0.45),    /* accent inerWeb : manettes, poignées */
    plastiqueRouge:  plast(0xc0392b, 0.42),
    plastiqueVert:   plast(0x1e7e54, 0.42),
    plastiqueJaune:  plast(0xf2c230, 0.45),
    plastiqueOrange: plast(0xc9451a, 0.45),
    plastiqueBleu:   plast(0x2f6db5, 0.45),
    transparent:     std(0xe9eef2, 0.12, 0, { transparent: true, opacity: 0.32, depthWrite: false }),
    cuivre:          std(0xd8875a, 0.28, 1, { roughnessMap: texBrosse }),
    cuivreSombre:    std(0xb0643c, 0.4, 1),
    bobinage:        std(0xb8572a, 0.36, 0.7),  /* fil émaillé : cuivre verni, rougeâtre */
    laiton:          std(0xd9b061, 0.3, 1),
    acier:           std(0xb9c0c7, 0.32, 0.95, { roughnessMap: texBrosse }),
    acierSombre:     std(0x6f7882, 0.45, 0.85),
    zingue:          std(0xc8ccc8, 0.38, 0.9),  /* vis et rail galvanisés */
    tole:            std(0x56606b, 0.48, 0.75), /* tôle magnétique feuilletée */
    fonte:           std(0x5b6f86, 0.62, 0.25, { roughnessMap: texGrain }), /* carcasse peinte gris-bleu */
    aluminium:       std(0xc4c9cf, 0.42, 0.9),
    caoutchouc:      std(0x26292d, 0.85, 0),
    ceramique:       std(0xf3efe6, 0.55, 0),
    sable:           std(0xe6d9bb, 0.95, 0),
    argent:          std(0xe3e5e8, 0.22, 1),    /* pastilles de contact */
    sombre:          std(0x14181d, 0.7, 0),     /* creux, fentes */
    lumiere:         garde(new T.MeshBasicMaterial({ color: 0xffb21a, toneMapped: false })),
    champ:           garde(new T.MeshBasicMaterial({ color: 0x3d7fca, transparent: true, opacity: 0.85, toneMapped: false })),
    arc:             garde(new T.MeshBasicMaterial({ color: 0xdfeaff, toneMapped: false }))
  };
  K.plastique = (couleur, rough) => plast(couleur, rough);
  K.metal = (couleur, rough) => std(couleur, rough === undefined ? 0.3 : rough, 1);
  K.lumineux = (couleur, opacite) => garde(new T.MeshBasicMaterial({ color: couleur, toneMapped: false, transparent: opacite !== undefined, opacity: opacite === undefined ? 1 : opacite }));
  /* une matière à soi (pour la chauffer, la colorer) sans toucher aux autres */
  K.propre = m => garde(m.clone());

  /* les isolants, NF C 15-100 : phases marron, noir, gris ; neutre bleu ; PE vert-jaune */
  const texPE = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const x = c.getContext('2d'); x.fillStyle = '#2f9a45'; x.fillRect(0, 0, 64, 64);
    x.fillStyle = '#f3d21b';
    for (let i = -64; i < 128; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 16, 0); x.lineTo(i + 16 + 64, 64); x.lineTo(i + 64, 64); x.closePath(); x.fill(); }
    const t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; return t;
  })();
  const ISOLANTS = { L1: 0x7a4a2c, L2: 0x26282b, L3: 0x8d9298, N: 0x2f6db5, rouge: 0xc0392b, noir: 0x26282b, blanc: 0xeeeeea, orange: 0xd86a2a, violet: 0x6b4f9a };
  K.isolant = (nom, longueur) => {
    if (nom === 'PE') {
      const t = garde(texPE.clone()); t.needsUpdate = true; t.repeat.set(Math.max(1, (longueur || 40) / 9), 1);
      return std(0xffffff, 0.5, 0, { map: t });
    }
    return std(ISOLANTS[nom] !== undefined ? ISOLANTS[nom] : nom, 0.5, 0);
  };

  /* ------------------------------------------------------------------ formes */
  const formeArrondie = (w, h, r) => {
    r = Math.max(0.0001, Math.min(r, w / 2, h / 2));
    const s = new T.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  };
  K.formeArrondie = formeArrondie;

  /* un pavé aux arêtes adoucies, centré : largeur (x), hauteur (y), profondeur (z), rayon d'arête */
  K.boite = (w, h, d, r) => {
    r = r === undefined ? Math.min(w, h, d) * 0.08 : r;
    const b = Math.min(r, d / 2 - 0.01, w / 2 - 0.01, h / 2 - 0.01);
    if (b <= 0.05) return garde(new T.BoxGeometry(w, h, d));
    const g = new T.ExtrudeGeometry(formeArrondie(w - 2 * b, h - 2 * b, Math.max(0.01, r - b * 0.6)), {
      depth: Math.max(0.01, d - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 3, curveSegments: 6
    });
    g.translate(0, 0, -(d - 2 * b) / 2);
    g.computeVertexNormals();
    return garde(g);
  };
  K.cylindre = (r, h, seg, r2) => garde(new T.CylinderGeometry(r2 === undefined ? r : r2, r, h, seg || 32));
  /* un anneau épais (tube court), axe Y */
  K.anneau = (rExt, rInt, h, seg) => {
    const p = [new T.Vector2(rInt, -h / 2), new T.Vector2(rExt, -h / 2), new T.Vector2(rExt, h / 2), new T.Vector2(rInt, h / 2), new T.Vector2(rInt, -h / 2)];
    return garde(new T.LatheGeometry(p, seg || 40));
  };
  K.tore = (R, r, segR, segT, arc) => garde(new T.TorusGeometry(R, r, segR || 16, segT || 48, arc || Math.PI * 2));
  K.sphere = (r, seg) => garde(new T.SphereGeometry(r, seg || 20, Math.max(8, (seg || 20) * 0.6 | 0)));
  K.mesh = (geo, mat, x, y, z) => { const m = new T.Mesh(geo, mat); if (x !== undefined) m.position.set(x, y || 0, z || 0); return m; };
  /* un cylindre plein couché sur un axe, centré en (x, y, z), de longueur L : l'axe est dans la
     géométrie (la rotation du mesh reste libre pour le faire tourner) */
  K.cylX = (r, L, mat, x, y, z, seg) => { const g = K.cylindre(r, L, seg); g.rotateZ(Math.PI / 2); return K.mesh(g, mat, x, y, z); };
  K.cylY = (r, L, mat, x, y, z, seg) => K.mesh(K.cylindre(r, L, seg), mat, x, y, z);
  K.cylZ = (r, L, mat, x, y, z, seg) => { const g = K.cylindre(r, L, seg); g.rotateX(Math.PI / 2); return K.mesh(g, mat, x, y, z); };
  K.groupe = (...objets) => { const g = new T.Group(); objets.forEach(o => o && g.add(o)); return g; };
  /* une forme 2D extrudée (profil), épaisseur e, centrée en z */
  K.extrusion = (forme, e, biseau) => {
    const g = new T.ExtrudeGeometry(forme, { depth: e, bevelEnabled: !!biseau, bevelThickness: biseau || 0, bevelSize: biseau || 0, bevelSegments: 2, curveSegments: 10 });
    g.translate(0, 0, -e / 2); g.computeVertexNormals(); return garde(g);
  };

  /* une vis à tête fendue (ou cruciforme), tête vers +Y */
  K.vis = (r, opts) => {
    r = r || 2.2; opts = opts || {};
    const g = new T.Group();
    const tete = K.mesh(K.cylindre(r, r * 0.55, 24, r * 0.92), opts.matiere || K.mat.zingue); tete.position.y = r * 0.27; g.add(tete);
    const fente = K.mesh(garde(new T.BoxGeometry(r * 1.9, r * 0.3, r * 0.28)), K.mat.sombre); fente.position.y = r * 0.5; g.add(fente);
    if (opts.croix !== false) { const f2 = fente.clone(); f2.rotation.y = Math.PI / 2; f2.scale.x = 0.62; g.add(f2); }
    return g;
  };

  /* une borne à cage : une ouverture sombre sur la face, la vis sur le dessus */
  K.borne = (opts) => {
    opts = opts || {};
    const w = opts.largeur || 8, h = opts.hauteur || 7, p = opts.profondeur || 7;
    const g = new T.Group();
    const trou = K.mesh(K.boite(w * 0.62, h * 0.55, p * 0.4, 0.6), K.mat.sombre); trou.position.set(0, 0, p * 0.32); g.add(trou);
    const cage = K.mesh(K.boite(w * 0.7, h * 0.62, 0.6, 0.2), K.mat.zingue); cage.position.set(0, 0, p * 0.42); g.add(cage);
    const v = K.vis(Math.min(w, p) * 0.28); v.position.set(0, h * 0.5, 0); g.add(v);
    g.userData.entree = new T.Vector3(0, 0, p * 0.5);
    return g;
  };

  /* le rail DIN symétrique 35 × 7,5, le long de X */
  K.railDIN = (longueur) => {
    const s = new T.Shape();
    const pts = [[-17.5, 0], [-12.5, 0], [-12.5, 7.5], [12.5, 7.5], [12.5, 0], [17.5, 0], [17.5, 1], [13.5, 1], [13.5, 8.5], [-13.5, 8.5], [-13.5, 1], [-17.5, 1]];
    s.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(q => s.lineTo(q[0], q[1]));
    const g = new T.ExtrudeGeometry(s, { depth: longueur, bevelEnabled: false });
    g.translate(0, 0, -longueur / 2); g.rotateY(Math.PI / 2); g.rotateX(-Math.PI / 2);
    g.computeVertexNormals();
    /* fentes de fixation */
    const rail = new T.Mesh(garde(g), K.mat.zingue);
    return rail;
  };

  /* un ressort hélicoïdal, axe Y, de y = 0 à y = longueur */
  K.ressort = (r, longueur, spires, fil, matiere) => {
    const pts = [], n = Math.max(24, spires * 24);
    for (let i = 0; i <= n; i++) { const a = i / n * spires * Math.PI * 2; pts.push(new T.Vector3(Math.cos(a) * r, i / n * longueur, Math.sin(a) * r)); }
    const c = new T.CatmullRomCurve3(pts);
    const m = new T.Mesh(garde(new T.TubeGeometry(c, n, fil || 0.4, 8, false)), matiere || K.mat.acier);
    m.userData.longueur = longueur;
    /* comprimer ou étirer : on change l'échelle en Y (le fil s'aplatit à peine) */
    m.longueur = L => { m.scale.y = Math.max(0.05, L / longueur); };
    return m;
  };

  /* ------------------------------------------------------------------ entre deux points
     (A et B : Vector3 ou [x, y, z]) */
  const vec = p => p.isVector3 ? p : new T.Vector3(p[0], p[1], p[2]);
  const HAUT = new T.Vector3(0, 1, 0);
  /* une barre fixe (cylindre de la bonne longueur) de A à B */
  K.barre = (A, B, r, mat, seg) => {
    A = vec(A); B = vec(B);
    const d = new T.Vector3().subVectors(B, A), L = d.length();
    const m = K.mesh(K.cylindre(r, L, seg || 12), mat);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(HAUT, d.normalize());
    return m;
  };
  /* une tige mobile entre deux points : m est une pièce de hauteur 1 (axe Y, centrée) qu'on
     étire ; à rappeler à chaque image (bielle, poussoir) */
  K.tigeEntre = (m, A, B) => {
    A = vec(A); B = vec(B);
    const d = B.clone().sub(A), L = d.length() || 0.01;
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(HAUT, d.divideScalar(L));
    m.scale.set(1, L, 1);
    return m;
  };
  /* un ressort (K.ressort) tendu de A vers B : son pied en A, comprimé ou étiré à la distance */
  K.ressortEntre = (r, A, B) => {
    A = vec(A); B = vec(B);
    const d = B.clone().sub(A), L = d.length() || 0.01;
    r.position.copy(A); r.quaternion.setFromUnitVectors(HAUT, d.divideScalar(L));
    r.longueur(L);
    return r;
  };

  /* un cadenas de consignation : l'origine est le milieu de la barre haute de l'anse (là où elle
     traverse les trous), cette barre court le long de X, le corps pend dessous (-Y), face avant +Z */
  K.cadenas = (ecart) => {
    const w = (ecart || 24) / 2;
    const g = new T.Group();
    const anse = K.fil([[-w, -14, 0], [-w, -3, 0], [-w + 1.6, -0.5, 0], [-w + 4, 0, 0], [w - 4, 0, 0], [w - 1.6, -0.5, 0], [w, -3, 0], [w, -14, 0]], 1.5, K.mat.acier);
    const corps = K.mesh(K.boite(2 * w + 8, 22, 11, 2.2), K.mat.laiton, 0, -21, 0);
    const trou = K.mesh(K.cylindre(1.7, 0.8, 16), K.mat.sombre, 0, -23, 5.6); trou.rotation.x = Math.PI / 2;
    g.add(anse.mesh, corps, trou);
    return g;
  };

  /* le boîtier d'un appareil modulaire : socle (z 0 → 44) et nez (z 43 → 70), largeur L, hauteur 85,
     la griffe de fixation sur le rail en bas */
  K.boitierModulaire = (L, mat) => {
    const socle = K.mesh(K.boite(L, 85, 44, 2), mat, 0, 0, 22);
    const nez = K.mesh(K.boite(L, 45, 27, 2.5), mat, 0, 0, 56.5);
    const griffe = K.mesh(K.boite(12, 6, 5, 1), K.mat.plastiqueSombre, 0, -41.5, 2.5);
    return { socle, nez, griffe };
  };
  /* la borne à cage d'un appareil modulaire : la cage en (x, y, zC = 33), l'entrée du fil sur la
     face du dessus (sens = +1) ou du dessous (-1) en y = ±yB, la vis en façade de l'épaulement (zF = 44) ;
     r agrandit le tout */
  K.cageModulaire = (x, y, sens, zF, yB, zC, r) => {
    zF = zF || 44; yB = yB || 42.5; zC = zC || 33; r = r || 1;
    const g = new T.Group();
    g.add(K.mesh(K.boite(8 * r, 7 * r, 8 * r, 0.6), K.mat.zingue, x, y, zC));
    g.add(K.mesh(K.boite(5.4 * r, 0.6, 5.4 * r, 0.2), K.mat.sombre, x, sens * (yB - 0.15), zC));
    const tige = K.mesh(K.cylindre(1.1 * r, zF - zC - 4, 12), K.mat.acier, x, y, (zF + zC + 3) / 2); tige.rotation.x = Math.PI / 2;
    const creux = K.mesh(K.cylindre(3.3 * r, 1, 24), K.mat.sombre, x, y, zF - 0.3); creux.rotation.x = Math.PI / 2;
    const vis = K.vis(2.5 * r); vis.rotation.x = Math.PI / 2; vis.position.set(x, y, zF - 0.7);
    g.add(tige, creux, vis);
    return g;
  };

  /* ------------------------------------------------------------------ machines tournantes
     L'axe est X ; « coupe » retire le quart avant-haut (y > 0, z > 0) : 270° seulement. */
  const texLames = (() => {
    let t = null;
    return () => {
      if (t) return t;
      const c = document.createElement('canvas'); c.width = 8; c.height = 8;
      const x = c.getContext('2d'); x.fillStyle = '#a3acb6'; x.fillRect(0, 0, 8, 8); x.fillStyle = '#4b535c'; x.fillRect(0, 6, 8, 2);
      t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; return t;
    };
  })();
  /* la tôle d'un empilage tourné (K.tourne : v suit le profil, 5 points → le flanc vaut 1/4) */
  K.tolePile = (lameMm, longueur) => {
    const t = garde(texLames().clone()); t.needsUpdate = true; t.repeat.set(1, longueur / lameMm * 4);
    return garde(new T.MeshStandardMaterial({ map: t, roughness: 0.45, metalness: 0.72, side: T.DoubleSide }));
  };
  /* la même tôle vue sur une face de coupe (K.facesCoupe) */
  K.toleCoupe = (longueur, lameMm) => K.repeter(K.toleFeuilletee(), longueur / lameMm, 1);
  /* une pièce tournée autour de X : profil [[rayon, x], …] */
  K.tourne = (profil, coupe, seg) => {
    const g = new T.LatheGeometry(profil.map(p => new T.Vector2(p[0], p[1])), seg || 72, 0, coupe ? Math.PI * 1.5 : Math.PI * 2);
    g.rotateZ(-Math.PI / 2);
    return garde(g);
  };
  /* un anneau tourné (rayons rIn → rOut, de x0 à x1) */
  K.anneauX = (rIn, rOut, x0, x1, coupe, seg) => K.tourne([[rIn, x0], [rOut, x0], [rOut, x1], [rIn, x1], [rIn, x0]], coupe, seg);
  /* les deux faces de coupe d'un anneau (plans z = 0 et y = 0) */
  K.facesCoupe = (rIn, rOut, x0, x1, mat) => {
    const g = new T.Group(), L = x1 - x0, h = rOut - rIn, cx = (x0 + x1) / 2;
    const a = new T.Mesh(garde(new T.PlaneGeometry(L, h)), mat); a.position.set(cx, (rIn + rOut) / 2, 0.05);
    const b = new T.Mesh(garde(new T.PlaneGeometry(L, h)), mat); b.rotation.x = -Math.PI / 2; b.position.set(cx, 0.05, (rIn + rOut) / 2);
    g.add(a, b); return g;
  };

  /* ------------------------------------------------------------------ conducteurs */
  /* un fil souple qui passe par des points : rend { mesh, courbe, longueur } */
  K.fil = (points, rayon, matiere, opts) => {
    opts = opts || {};
    const v = points.map(p => p.isVector3 ? p : new T.Vector3(p[0], p[1], p[2]));
    const courbe = opts.droit ? new T.CurvePath() : new T.CatmullRomCurve3(v, false, 'centripetal', 0.5);
    if (opts.droit) for (let i = 1; i < v.length; i++) courbe.add(new T.LineCurve3(v[i - 1], v[i]));
    const longueur = courbe.getLength();
    /* opts.pas (mm par segment) et opts.radial : un fil « léger » pour les grandes scènes assemblées */
    const segs = Math.max(8, Math.min(240, Math.round(longueur / (opts.pas || 1.2))));
    const mat = (typeof matiere === 'string' || typeof matiere === 'number') ? K.isolant(matiere, longueur) : (matiere || K.isolant('N'));
    const mesh = new T.Mesh(garde(new T.TubeGeometry(courbe, segs, rayon || 1.2, opts.radial || 12, false)), mat);
    return { mesh, courbe, longueur };
  };
  /* un câble droit, coupé net, montrant ses couches (âme cuivre, isolant, gaine) — axe X */
  K.troncon = (longueur, rAme, ep, matIsolant) => {
    const g = new T.Group();
    const ame = K.mesh(K.cylindre(rAme, longueur + ep * 4, 28), K.mat.cuivre); ame.rotation.z = Math.PI / 2; g.add(ame);
    const iso = K.mesh(K.anneau(rAme + ep, rAme, longueur, 32), matIsolant || K.isolant('L1')); iso.rotation.z = Math.PI / 2; g.add(iso);
    return g;
  };

  /* un chemin fait de points (le trajet du courant à travers les pièces) ; les fils déjà
     posés s'y raccordent par leurs courbes : K.chemin([pts…, filA.courbe, pts…, filB.courbe]) */
  K.chemin = (morceaux) => {
    const pts = [];
    morceaux.forEach(m => {
      if (m && m.getPoints) { const n = Math.max(8, Math.round(m.getLength() / 2)); m.getSpacedPoints(n).forEach(p => pts.push(p)); }
      else if (m && m.inverse && m.courbe) { const n = Math.max(8, Math.round(m.courbe.getLength() / 2)); m.courbe.getSpacedPoints(n).reverse().forEach(p => pts.push(p)); }
      else if (m) pts.push(m.isVector3 ? m.clone() : new T.Vector3(m[0], m[1], m[2]));
    });
    const c = new T.CurvePath();
    for (let i = 1; i < pts.length; i++) if (pts[i].distanceToSquared(pts[i - 1]) > 1e-6) c.add(new T.LineCurve3(pts[i - 1], pts[i]));
    return c;
  };
  K.inverse = c => ({ inverse: true, courbe: c.getPoints ? c : c.courbe });

  /* tôle feuilletée : des lames fines, visibles (un circuit magnétique n'est jamais un bloc) */
  K.toleFeuilletee = (pasMm) => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 8;
    const x = c.getContext('2d');
    for (let i = 0; i < 64; i += 8) { x.fillStyle = '#9aa3ad'; x.fillRect(i, 0, 6, 8); x.fillStyle = '#4a525b'; x.fillRect(i + 6, 0, 2, 8); }
    const t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace;
    t.userData = { pas: pasMm || 1 };
    return std(0xffffff, 0.45, 0.7, { map: t });
  };
  /* le fil d'une bobine : des spires serrées, cuivre verni */
  K.bobinageMat = (spiresParUnite) => {
    const c = document.createElement('canvas'); c.width = 8; c.height = 64;
    const x = c.getContext('2d');
    for (let i = 0; i < 64; i += 4) { const g = x.createLinearGradient(0, i, 0, i + 4); g.addColorStop(0, '#6e2a0f'); g.addColorStop(.5, '#e08a52'); g.addColorStop(1, '#6e2a0f'); x.fillStyle = g; x.fillRect(0, i, 8, 4); }
    const t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace;
    t.repeat.set(1, spiresParUnite || 1);
    return std(0xffffff, 0.38, 0.65, { map: t });
  };
  /* une boîte dont la texture se répète en millimètres (BoxGeometry : UV de 0 à 1 par face) */
  K.repeter = (mat, rx, ry) => { const m = garde(mat.clone()); if (m.map) { m.map = garde(m.map.clone()); m.map.needsUpdate = true; m.map.repeat.set(rx, ry); } return m; };

  /* le courant : des grains dorés qui avancent le long d'une courbe.
     regler({ debit: 0..1, vitesse: mm/s, sens: ±1, alternatif: bool, frequence: Hz }) */
  K.courant = (courbe, opts) => {
    opts = opts || {};
    const L = courbe.getLength();
    const N = opts.nombre || Math.max(6, Math.min(140, Math.round(L / (opts.pas || 7))));
    /* un grain se voit de loin et petit : 8 × 6 facettes suffisent (au lieu de 10 × 8) */
    const geo = garde(new T.SphereGeometry(opts.rayon || 0.9, 8, 6));
    const mat = K.lumineux(opts.couleur || 0xffb21a);
    const im = new T.InstancedMesh(geo, mat, N);
    im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false;
    const etat = { debit: opts.debit === undefined ? 1 : opts.debit, vitesse: opts.vitesse || 40, sens: 1, alternatif: false, frequence: 0.5, phase: 0, s: 0, t: 0 };
    const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
    const poser = () => {
      const visibles = Math.round(N * K.clamp(etat.debit, 0, 1));
      /* aucun courant : on ne dessine rien du tout (les grains éteints coûtaient autant) ;
         le kit ne rallume que ce qu'il a lui-même éteint — un modèle qui cache ses grains garde la main */
      if (visibles === 0) { if (im.visible) { im.visible = false; im.userData.eteintParKit = true; } }
      else if (im.userData.eteintParKit) { im.visible = true; im.userData.eteintParKit = false; }
      for (let i = 0; i < N; i++) {
        let u = (i / N + etat.s / L) % 1; if (u < 0) u += 1;
        courbe.getPointAt(u, p);
        const k = i < visibles ? 1 : 0;
        sc.setScalar(k);
        m4.compose(p, q, sc); im.setMatrixAt(i, m4);
      }
      im.instanceMatrix.needsUpdate = true;
    };
    poser();
    return {
      objet: im, courbe, longueur: L,
      regler(o) { Object.assign(etat, o); poser(); },
      animer(dt) {
        if (etat.debit <= 0) return false;
        etat.t += dt;
        if (etat.alternatif) etat.s = Math.sin(etat.t * 2 * Math.PI * etat.frequence) * etat.vitesse / (2 * Math.PI * Math.max(0.05, etat.frequence));
        else etat.s += dt * etat.vitesse * etat.sens;
        poser(); return true;
      }
    };
  };

  /* des lignes de champ : un tube fin dont les tirets avancent */
  const texTirets = (() => {
    const c = document.createElement('canvas'); c.width = 64; c.height = 8;
    const x = c.getContext('2d'); x.clearRect(0, 0, 64, 8); x.fillStyle = '#fff'; x.fillRect(0, 0, 38, 8);
    const t = garde(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; return t;
  })();
  K.flux = (courbe, opts) => {
    opts = opts || {};
    const L = courbe.getLength();
    const tex = garde(texTirets.clone()); tex.needsUpdate = true; tex.repeat.set(Math.max(1, L / (opts.pas || 9)), 1);
    const mat = garde(new T.MeshBasicMaterial({ color: opts.couleur || 0x3d7fca, map: tex, alphaMap: tex, transparent: true, opacity: opts.opacite || 0.9, depthWrite: false, toneMapped: false }));
    const m = new T.Mesh(garde(new T.TubeGeometry(courbe, Math.max(16, Math.round(L / 2)), opts.rayon || 0.45, 6, !!opts.ferme)), mat);
    m.userData.sansOmbre = true; m.castShadow = false;
    const etat = { intensite: opts.intensite === undefined ? 1 : opts.intensite, vitesse: opts.vitesse || 0.6, sens: 1, alternatif: false, t: 0 };
    return {
      objet: m,
      regler(o) { Object.assign(etat, o); m.visible = etat.intensite > 0.02; mat.opacity = (opts.opacite || 0.9) * K.clamp(etat.intensite, 0, 1); },
      animer(dt) {
        if (!m.visible) return false;
        etat.t += dt;
        if (etat.alternatif) tex.offset.x = -Math.sin(etat.t * Math.PI) * 0.5;
        else tex.offset.x -= dt * etat.vitesse * etat.sens * K.clamp(etat.intensite, 0.2, 1.5);
        return true;
      }
    };
  };

  /* un dégradé rond (centre → bord) : arrets = [[0, 'rgba(…)'], …, [1, 'rgba(…,0)']] ;
     px = côté du canevas, rInt = rayon où le dégradé commence */
  const texRadiale = (arrets, px, rInt) => {
    px = px || 64;
    const c = document.createElement('canvas'); c.width = c.height = px;
    const x = c.getContext('2d'), g = x.createRadialGradient(px / 2, px / 2, rInt || 0, px / 2, px / 2, px / 2);
    arrets.forEach(a => g.addColorStop(a[0], a[1]));
    x.fillStyle = g; x.fillRect(0, 0, px, px);
    const t = garde(new T.CanvasTexture(c)); t.colorSpace = T.SRGBColorSpace; return t;
  };
  /* un halo lumineux (lampe, voyant allumé) : un sprite toujours de face.
     o : { px, rInt, couleur, additif, opacite } — le reste (taille, visibilité) est au modèle */
  K.halo = (arrets, o) => {
    o = o || {};
    return new T.Sprite(garde(new T.SpriteMaterial({
      map: texRadiale(arrets, o.px, o.rInt), color: o.couleur === undefined ? 0xffffff : o.couleur, transparent: true, depthWrite: false, toneMapped: false,
      blending: o.additif ? T.AdditiveBlending : T.NormalBlending, opacity: o.opacite === undefined ? 1 : o.opacite
    })));
  };

  /* un arc électrique entre deux points : une ligne brisée qui scintille, et un halo */
  const texHalo = texRadiale([[0, 'rgba(255,255,255,1)'], [.25, 'rgba(200,220,255,.8)'], [1, 'rgba(120,160,255,0)']], 64);
  K.arc = (a, b, opts) => {
    opts = opts || {};
    const g = new T.Group(); g.visible = false;
    const A = a.clone ? a.clone() : new T.Vector3(...a), B = b.clone ? b.clone() : new T.Vector3(...b);
    const n = 9, pos = new Float32Array((n + 1) * 3);
    const geo = garde(new T.BufferGeometry()); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    const ligne = new T.Line(geo, garde(new T.LineBasicMaterial({ color: 0xf2f6ff, toneMapped: false })));
    const coeur = new T.Mesh(garde(new T.TubeGeometry(new T.LineCurve3(A, B), 4, opts.rayon || 0.5, 6)), K.lumineux(0xcfe0ff, 0.85));
    const halo = new T.Sprite(garde(new T.SpriteMaterial({ map: texHalo, color: 0xbad2ff, transparent: true, depthWrite: false, toneMapped: false, blending: T.AdditiveBlending })));
    halo.position.copy(A).lerp(B, 0.5); const d = A.distanceTo(B); halo.scale.setScalar(Math.max(8, d * 2.6) * (opts.halo || 1));
    g.add(ligne, coeur, halo);
    let t = 0;
    const brouiller = () => {
      const perp = new T.Vector3(); const dir = B.clone().sub(A);
      for (let i = 0; i <= n; i++) {
        const u = i / n, p = A.clone().lerp(B, u);
        if (i > 0 && i < n) { perp.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(dir.length() * 0.22); p.add(perp); }
        pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
      }
      geo.attributes.position.needsUpdate = true;
    };
    brouiller();
    return {
      objet: g,
      regler(on) { g.visible = !!on; },
      placer(a2, b2) { A.copy(a2); B.copy(b2); halo.position.copy(A).lerp(B, 0.5); },
      animer(dt) { if (!g.visible) return false; t += dt; if (t > 0.045) { t = 0; brouiller(); halo.material.opacity = 0.6 + Math.random() * 0.4; } return true; }
    };
  };

  /* chauffer une matière (à soi : K.propre) : 0 froid → 1 rouge → 1,5 orange vif */
  K.chaleur = (mat, niveau) => {
    const n = K.clamp(niveau, 0, 1.6);
    if (!mat.emissive) return;
    if (n <= 0.02) { mat.emissive.setHex(0x000000); mat.emissiveIntensity = 0; return; }
    const c = new T.Color(0x5a0a00).lerp(new T.Color(0xff6a10), K.clamp((n - 0.2) / 1.3, 0, 1));
    mat.emissive.copy(c); mat.emissiveIntensity = K.clamp(n, 0, 1.4) * 1.6;
  };

  /* ------------------------------------------------------------------ marquages
     Seulement ce qui est écrit sur l'appareil réel : repères de bornes, symboles moulés. */
  const texteCanvas = (lignes, o) => {
    const px = o.px || 96;
    const c = document.createElement('canvas');
    const x = c.getContext('2d');
    const font = (o.gras === false ? '600 ' : '800 ') + px + 'px Calibri, "Segoe UI", Arial, sans-serif';
    x.font = font;
    const larg = Math.max(...lignes.map(l => x.measureText(l).width)) + px * 0.5;
    c.width = Math.ceil(o.largeurPx || larg); c.height = Math.ceil(px * 1.25 * lignes.length + px * 0.25);
    const y = c.getContext('2d');
    if (o.fond) { y.fillStyle = o.fond; y.fillRect(0, 0, c.width, c.height); }
    y.font = font; y.fillStyle = o.couleur || '#2b3138'; y.textAlign = o.aligne || 'center'; y.textBaseline = 'middle';
    const ax = o.aligne === 'left' ? px * 0.25 : c.width / 2;
    lignes.forEach((l, i) => y.fillText(l, ax, px * 0.75 + i * px * 1.25));
    return c;
  };
  /* un marquage plat de hauteur h (mm) ; il regarde vers +Z */
  K.gravure = (texte, h, o) => {
    o = o || {};
    const lignes = String(texte).split('\n');
    const c = texteCanvas(lignes, o);
    const t = garde(new T.CanvasTexture(c)); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
    const H = h * lignes.length * 1.25 + h * 0.25, W = H * c.width / c.height;
    const m = new T.Mesh(garde(new T.PlaneGeometry(W, H)), garde(new T.MeshBasicMaterial({ map: t, transparent: !o.fond, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 })));
    m.userData.sansOmbre = true; m.castShadow = false; m.renderOrder = 2;
    m.userData.largeur = W; m.userData.hauteur = H;
    return m;
  };
  /* une surface plate (W × H mm, px pixels par mm) sur laquelle on dessine soi-même au canevas
     (cadran, écran d'oscilloscope, pictogramme) ; le plan regarde +Z.
     rend { mesh, x (le contexte 2D), w, h (en pixels), maj() à appeler après chaque dessin }.
     o.transparent : le fond non peint reste transparent (un dessin posé sur une pièce) */
  K.toile = (W, H, px, o) => {
    o = o || {};
    const c = document.createElement('canvas'); c.width = Math.round(W * (px || 12)); c.height = Math.round(H * (px || 12));
    const t = garde(new T.CanvasTexture(c)); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
    const mat = { map: t, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 };
    if (o.transparent) { mat.transparent = true; mat.depthWrite = false; }
    const m = new T.Mesh(garde(new T.PlaneGeometry(W, H)), garde(new T.MeshBasicMaterial(mat)));
    m.userData.sansOmbre = true; m.castShadow = false;
    return { mesh: m, x: c.getContext('2d'), w: c.width, h: c.height, maj: () => { t.needsUpdate = true; } };
  };
  /* un afficheur (LCD, écran de variateur) qu'on réécrit : ecrire(lignes) */
  K.ecran = (W, H, o) => {
    o = o || {};
    const toile = K.toile(W, H, 16), m = toile.mesh, x = toile.x, c = x.canvas;
    const ecrire = (lignes, opts) => {
      opts = opts || {};
      x.fillStyle = o.fond || '#c9d6b3'; x.fillRect(0, 0, c.width, c.height);
      x.fillStyle = o.encre || '#1a2a14'; x.textAlign = opts.aligne || 'right'; x.textBaseline = 'middle';
      const n = lignes.length, hl = c.height / n;
      lignes.forEach((l, i) => {
        const taille = (i === 0 && opts.grand !== false && n > 1) ? hl * 0.82 : hl * 0.62;
        x.font = '700 ' + Math.round(taille) + 'px Consolas, "Courier New", monospace';
        x.fillText(l, opts.aligne === 'left' ? c.width * 0.06 : opts.aligne === 'center' ? c.width / 2 : c.width * 0.94, hl * (i + 0.55));
      });
      toile.maj();
    };
    ecrire(o.texte || ['']);
    return { mesh: m, ecrire };
  };

  /* ------------------------------------------------------------------ mouvements */
  /* une valeur qui rejoint sa cible avec une vraie inertie (masse-ressort amorti) */
  K.mobile = (valeur, raideur, amortissement) => {
    const o = { x: valeur, v: 0, cible: valeur, k: raideur || 260, c: amortissement || 26 };
    o.pas = dt => {
      const n = Math.max(1, Math.ceil(dt / 0.008)), h = dt / n;
      for (let i = 0; i < n; i++) { const a = o.k * (o.cible - o.x) - o.c * o.v; o.v += a * h; o.x += o.v * h; }
      const enMouvement = Math.abs(o.cible - o.x) > 1e-4 || Math.abs(o.v) > 1e-3;
      if (!enMouvement) { o.x = o.cible; o.v = 0; }
      return enMouvement;
    };
    return o;
  };

  return K;
};
