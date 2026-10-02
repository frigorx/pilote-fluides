/* ÉlectroRézo 3D — famille « variation » : le gradateur (7.1, 7.2) et le variateur de fréquence (7.4).
   Unités : mm. Repère : X largeur, Y hauteur (le sol est à y = 0), Z profondeur (+Z = face avant).
   Le moteur asynchrone du fichier moteur.js est ASSEMBLÉ ici (Electro3D.fabriquer).

   CE QUE L'ÉLÈVE DOIT VOIR
   · gradateur : le bouton tourne, le triac attend, reçoit une impulsion, laisse passer la FIN de
     chaque alternance (écran : l'onde découpée), se rouvre seul au passage par zéro ; la lampe baisse.
     Avec un moteur : la vitesse tient, le couple s'écroule, le bobinage chauffe.
   · variateur : trois étages alignés (redresseur, bus continu, onduleur) ; le courant est alternatif
     à l'entrée, continu dans le bus, haché en sortie ; le moteur suit la fréquence ; après la coupure,
     le bus reste chargé (témoin et voltmètre) alors que l'afficheur est éteint. */
(() => {
  'use strict';
  if (!window.Electro3D) return;
  const RAD = Math.PI / 180;

  /* ------------------------------------------------------------ briques locales
     (le fil, le halo et la toile de dessin sont au kit : K.fil, K.halo, K.toile) */
  /* le fantôme d'un boîtier : matières transparentes + arêtes, réversible */
  const fantomeur = (T, K, groupes) => {
    const ms = [];
    groupes.forEach(g => g.traverse(m => { if (m.isMesh) ms.push(m); }));
    const orig = new Map(), gh = new Map();
    const lignes = new T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.28, depthWrite: false });
    return on => ms.forEach(m => {
      if (on) {
        if (!orig.has(m)) orig.set(m, m.material);
        const o = orig.get(m);
        let g = gh.get(o);
        if (!g) { g = K.propre(o); g.transparent = true; g.opacity = 0.13; g.depthWrite = false; gh.set(o, g); }
        m.material = g; m.castShadow = false; m.userData.fantome = true;
        if (!m.userData.aretes) {
          const a = new T.LineSegments(new T.EdgesGeometry(m.geometry, 24), lignes);
          a.raycast = () => {}; a.userData.decor = true; m.add(a); m.userData.aretes = a;
        }
        m.userData.aretes.visible = true;
      } else if (orig.has(m)) {
        m.material = orig.get(m); m.castShadow = true; m.userData.fantome = false;
        if (m.userData.aretes) m.userData.aretes.visible = false;
      }
    });
  };

  /* un fil plus léger (huit pans, un tronçon tous les 6 mm) : le moteur assemblé pèse déjà 43 000 triangles */
  const filLeger = (K, points, rayon, matiere) => K.fil(points, rayon, matiere, { pas: 6, radial: rayon > 3 ? 12 : 8 });

  /* un radiateur d'aluminium : une semelle (plan XY, z de 0 à ep) et des ailettes vers +Z */
  const radiateur = (T, K, l, h, prof, nAil, vide) => {
    const g = new T.Group();
    g.add(K.mesh(K.boite(l, h, 3, 0.6), K.mat.aluminium, 0, 0, 1.5));
    const pas = l / nAil;
    for (let i = 0; i < nAil; i++) {
      const x = -l / 2 + pas * (i + 0.5);
      if (vide && Math.abs(x) < vide) continue;
      g.add(K.mesh(new T.BoxGeometry(1.6, h - 2, prof), K.mat.aluminium, x, 0, 3 + prof / 2));
    }
    return g;
  };

  /* un boîtier TO-220 / TO-247 : corps noir, languette métallique trouée, trois pattes (vers -Y) */
  const transistor = (T, K, grand) => {
    const s = grand ? 1.45 : 1;
    const g = new T.Group();
    const corps = K.mesh(K.boite(10 * s, 15 * s, 4.5 * s, 0.6), K.propre(K.mat.plastiqueNoir), 0, 0, 2.25 * s);
    const lang = K.mesh(new T.BoxGeometry(10 * s, 6 * s, 1.2), K.mat.acier, 0, 10.5 * s, 0.6);
    g.add(corps, lang, K.mesh(K.cylindre(1.6 * s, 1.4, 14), K.mat.sombre, 0, 11.5 * s, 0.6));
    g.children[2].rotation.x = Math.PI / 2;
    [-3.4, 0, 3.4].forEach(x => g.add(K.mesh(new T.BoxGeometry(0.9, 11, 0.5), K.mat.argent, x * s, -12 * s, 1.4)));
    g.userData.corps = corps;
    return g;
  };

  /* un écran d'instrument qu'on dessine soi-même : le canvas du K.ecran, agrandi */
  const ecranDessin = (T, K, Wmm, Hmm, fond) => {
    const e = K.ecran(40, 28, { fond: fond || '#0b1712', encre: '#7dff9a', texte: [''] });
    e.mesh.scale.set(Wmm / 40, Hmm / 28, 1);
    const tex = e.mesh.material.map, cv = tex.image, g = cv.getContext('2d');
    return { mesh: e.mesh, g, w: cv.width, h: cv.height, maj: () => { tex.needsUpdate = true; } };
  };

  /* ================================================================== le gradateur */
  Electro3D.definir('gradateur', (T, K, ctx) => {
    const M = K.mat;
    const opt = ctx.options || {};
    const moteur = opt.charge === 'moteur';
    const racine = new T.Group();
    const UNOM = moteur ? 400 : 230;

    /* ---------------------------------------------------------------- l'état */
    const E = { alpha: 0, ph: 0, tenu: null, ceq: 100 };
    const ueff = a => UNOM * Math.sqrt(Math.max(0, 1 - a / Math.PI + Math.sin(2 * a) / (2 * Math.PI)));
    const angleDe = u => { let lo = 0, hi = Math.PI; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (ueff(m) > u) lo = m; else hi = m; } return (lo + hi) / 2 / RAD; };
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });

    /* ---------------------------------------------------------------- le panneau d'essai */
    const DX = moteur ? -100 : -85;               /* x du gradateur */
    const LARG = moteur ? 300 : 400, CX = moteur ? -70 : 0;
    const panneau = K.mesh(K.boite(LARG, 340, 16, 3), K.propre(M.plastiqueBlanc), CX, 170, 0);
    panneau.material.color.setHex(0xe4dccb);
    const pieds = [-1, 1].map(s => K.mesh(K.boite(20, 24, 70, 2), M.plastiqueSombre, CX + s * (LARG / 2 - 30), 12, 0));
    racine.add(panneau, ...pieds);

    /* ---------------------------------------------------------------- le boîtier du gradateur */
    const HY = 105, ZB = 16;                      /* centre en hauteur ; face arrière */
    const corps = K.mesh(K.boite(76, 76, 40, 3), M.plastique, DX, HY, ZB + 20);
    const capot = new T.Group();
    capot.add(K.mesh(K.boite(84, 84, 7, 3), M.plastique, DX, HY, ZB + 43.5));
    racine.add(corps, capot);
    const boitier = [corps, capot];
    /* le bouton de réglage : il tourne avec le curseur */
    const bouton = new T.Group(); bouton.position.set(DX, HY, ZB + 47);
    const bg = K.mesh(K.cylindre(17, 13, 40, 15.5), M.plastiqueMarine); bg.rotation.x = Math.PI / 2; bg.position.z = 6.5; bouton.add(bg);
    bouton.add(K.mesh(K.boite(3, 12, 1.6, 0.5), M.plastiqueBlanc, 0, 10, 13.4));
    racine.add(bouton);
    /* graduations autour du bouton : des points, du plein au faible */
    const graduations = new T.Group();
    for (let i = 0; i <= 9; i++) {
      const a = (135 - i * 30) * RAD;
      const p = K.mesh(K.cylindre(0.9 + (9 - i) * 0.11, 0.8, 10), M.plastiqueSombre, DX + Math.sin(-a) * 28 * -1 * -1, HY + Math.cos(a) * 0 + 0, ZB + 47.2);
      p.rotation.x = Math.PI / 2;
      p.position.set(DX - Math.sin(a) * 29, HY + Math.cos(a) * 29, ZB + 47.2);
      graduations.add(p);
    }
    racine.add(graduations);

    /* ---------------------------------------------------------------- l'intérieur : triac, radiateur, commande */
    const ZI = ZB + 3;
    const carte = K.mesh(K.boite(66, 66, 2, 0.5), K.plastique(0x2f7a4f, 0.5), DX, HY, ZI);
    const potar = new T.Group();
    const pc = K.mesh(K.cylindre(9, 10, 24), M.acierSombre, DX, HY, ZI + 6); pc.rotation.x = Math.PI / 2;
    const arbre = K.mesh(K.cylindre(3, 20, 16), M.acier, DX, HY, ZI + 20); arbre.rotation.x = Math.PI / 2;
    potar.add(pc, arbre);
    const self = new T.Group();
    const bob = K.mesh(K.cylindre(7, 12, 24), K.propre(M.bobinage), DX + 22, HY + 22, ZI + 7); bob.rotation.x = Math.PI / 2;
    const cond = K.mesh(K.boite(11, 9, 6, 1), M.plastiqueJaune, DX - 24, HY + 24, ZI + 4);
    const diac = K.mesh(K.cylindre(1.6, 6, 10), M.ceramique, DX + 24, HY + 6, ZI + 3); diac.rotation.z = Math.PI / 2;
    self.add(bob, cond, diac);
    const commande = new T.Group(); commande.add(carte, potar, self);
    /* le triac sur son radiateur : ailettes de part et d'autre, le triac visible au milieu */
    const rad = radiateur(T, K, 52, 26, 18, 8, 6);
    rad.position.set(DX, HY - 22, ZI + 4);
    const triac = transistor(T, K, true);
    triac.position.set(DX, HY - 22, ZI + 7);
    triac.rotation.z = 0;
    const vis = K.vis(1.8); vis.rotation.x = Math.PI / 2; vis.position.set(DX, HY - 22 + 15, ZI + 8.5);
    const blocTriac = new T.Group(); blocTriac.add(rad, triac, vis);
    const matTriac = triac.userData.corps.material;
    racine.add(commande, blocTriac);

    /* ---------------------------------------------------------------- la charge */
    let lampe = null, sub = null, halo = null, filament = null, lampeObjets = [];
    const matFil = K.lumineux(0xffe9a8);
    const LX = 90, LY = 105;
    const fils = [];
    const filIn = filLeger(K, [[CX - LARG / 2 + 12, HY - 38, ZB + 3], [DX - 52, HY - 36, ZB + 6], [DX - 42, HY - 12, ZB + 12], [DX - 38, HY, ZB + 22]], 1.9, 'L1');
    let filOut, filN;
    racine.add(filIn.mesh);
    if (!moteur) {
      lampe = new T.Group();
      lampe.position.set(LX, LY - 30, ZB + 30);
      const socle = K.mesh(K.boite(46, 30, 36, 3), M.plastiqueBlanc, 0, -13, -12);
      const douille = K.mesh(K.cylindre(20, 26, 32), M.plastiqueBlanc, 0, 13, 0);
      lampe.add(socle, douille);
      const amp = new T.Group(); amp.position.y = 26; lampe.add(amp);
      amp.add(K.mesh(K.cylindre(13.5, 22, 28), M.laiton, 0, 11, 0));
      amp.add(K.mesh(K.cylindre(13.6, 2, 28), M.sombre, 0, 8, 0), K.mesh(K.cylindre(13.6, 2, 28), M.sombre, 0, 14, 0));
      const verre = K.propre(M.transparent); verre.opacity = 0.24; verre.color.setHex(0x8fb0c4);
      const col = K.mesh(K.cylindre(13, 24, 28, 25), verre, 0, 34, 0);
      const globe = K.mesh(K.sphere(30, 28), verre, 0, 74, 0);
      amp.add(col, globe);
      const fil = K.ressort(4.5, 24, 9, 0.9, matFil); fil.position.set(0, 50, 0);
      amp.add(fil);
      [-2.2, 2.2].forEach(x => amp.add(K.mesh(new T.BoxGeometry(0.5, 30, 0.5), M.acierSombre, x, 36, 0)));
      filament = fil;
      halo = K.halo([[0, 'rgba(255,214,120,.95)'], [.4, 'rgba(255,196,90,.45)'], [1, 'rgba(255,190,80,0)']], { px: 128, rInt: 4, opacite: 0 });
      halo.position.set(0, 74, 0); halo.scale.setScalar(150); halo.userData.sansOmbre = true; amp.add(halo);
      racine.add(lampe);
      lampeObjets = [lampe];
      filOut = filLeger(K, [[DX + 38, HY, ZB + 22], [DX + 46, HY - 8, ZB + 8], [LX - 40, LY - 32, ZB + 6], [LX - 24, LY - 40, ZB + 16]], 1.9, 'L1');
      filN = filLeger(K, [[LX + 24, LY - 40, ZB + 16], [LX + 40, LY - 56, ZB + 6], [LX + 60, 60, ZB + 4], [LX + 70, 6, ZB + 3]], 1.9, 'N');
    } else {
      sub = Electro3D.fabriquer('moteurAsynchrone', T, K, { mode: ctx.mode, options: {}, dire() {}, mesures() {}, regler() {}, reveiller: ctx.reveiller, element: ctx.element });
      sub.racine.position.set(290, 90, 40);
      racine.add(sub.racine);
      /* le câble du moteur : de dessous le boîtier jusqu'au bout de la gaine du moteur */
      filOut = filLeger(K, [[DX + 38, HY - 4, ZB + 22], [DX + 50, HY - 30, ZB + 10], [DX + 60, 40, ZB + 8]], 1.9, 'L1');
      const cable = filLeger(K, [[DX + 60, 40, ZB + 8], [DX + 80, 10, 70], [190, 6, 120], [420, 6, 70], [420, 5, 20], [402, 4, -48]], 5.2, K.plastique(0x8b9096, 0.55));
      racine.add(cable.mesh);
      filN = null;
    }
    racine.add(filOut.mesh); if (filN) racine.add(filN.mesh);
    const gIn = K.courant(filIn.courbe, { pas: 14, rayon: 3, vitesse: 40 });
    const gOut = K.courant(filOut.courbe, { pas: 14, rayon: 3, vitesse: 40 });
    racine.add(gIn.objet, gOut.objet); fils.push(gIn, gOut);
    if (filN) { const gN = K.courant(filN.courbe, { pas: 14, rayon: 3, vitesse: 40 }); racine.add(gN.objet); fils.push(gN); }

    /* ---------------------------------------------------------------- l'oscilloscope (accroché au panneau) */
    const SCX = moteur ? -70 : 0, SCY = 255;
    const scope = new T.Group(); scope.position.set(SCX, SCY, ZB + 14);
    const sc = K.mesh(K.boite(206, 150, 28, 5), K.propre(M.plastiqueSombre), 0, 0, 0);
    const cadreEcran = K.mesh(K.boite(182, 120, 3, 2), M.plastiqueNoir, 0, 10, 14);
    const ecr = ecranDessin(T, K, 172, 113);
    ecr.mesh.position.set(0, 10, 15.7);
    scope.add(sc, cadreEcran, ecr.mesh);
    [-70, -40, -10].forEach(x => {
      const b = K.mesh(K.cylindre(7, 8, 24), M.plastiqueNoir, x, -61, 16); b.rotation.x = Math.PI / 2;
      b.add(K.mesh(K.boite(1.4, 7, 1.2, 0.3), M.plastiqueBlanc, 0, 0, 4.4));
      scope.add(b);
    });
    const bnc = K.mesh(K.cylindre(5, 8, 20), M.laiton, 70, -61, 17); bnc.rotation.x = Math.PI / 2;
    scope.add(bnc);
    const gCH = K.gravure('CH1', 3.2, { couleur: '#e8e6df' }); gCH.position.set(70, -50, 14.3); scope.add(gCH);
    racine.add(scope);
    const pointe = filLeger(K, [[SCX + 70, SCY - 61, ZB + 34], [SCX + 70, SCY - 80, ZB + 40], [SCX + 60, HY + 50, ZB + 30], [DX + (moteur ? 54 : 56), HY - 8, ZB + 12]], 1.4, K.mat.plastiqueNoir);
    racine.add(pointe.mesh);

    /* le tracé : l'onde entière en pâle, l'onde DÉCOUPÉE en vif, les temps où le triac est ouvert en rouge pâle,
       l'impulsion de commande en bas, l'état du triac (interrupteur ouvert / fermé) en haut à droite */
    const dessiner = th => {
      const { g, w, h } = ecr;
      g.fillStyle = '#0b1712'; g.fillRect(0, 0, w, h);
      const m = 30, x0 = m, x1 = w - m, yc = 172, ya = 100, yt = 56, yb = 292;
      const X = d => x0 + (x1 - x0) * d / 720, Y = v => yc - v * ya;
      const a = E.alpha;
      for (let k = 0; k < 4; k++) {
        if (a > 0) { g.fillStyle = 'rgba(255,90,60,.17)'; g.fillRect(X(180 * k), yt, X(180 * k + a) - X(180 * k), yb - yt); }
        g.fillStyle = 'rgba(70,210,120,.10)'; g.fillRect(X(180 * k + a), yt, X(180 * (k + 1)) - X(180 * k + a), yb - yt);
      }
      g.strokeStyle = 'rgba(125,255,154,.2)'; g.lineWidth = 2;
      for (let i = 0; i <= 8; i++) { const x = x0 + (x1 - x0) * i / 8; g.beginPath(); g.moveTo(x, yt); g.lineTo(x, yb); g.stroke(); }
      for (let j = 0; j <= 4; j++) { const y = yt + (yb - yt) * j / 4; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); }
      g.strokeStyle = 'rgba(125,255,154,.5)'; g.beginPath(); g.moveTo(x0, yc); g.lineTo(x1, yc); g.stroke();
      g.strokeStyle = 'rgba(200,210,200,.6)'; g.lineWidth = 3; g.beginPath();
      for (let d = 0; d <= 720; d += 4) { const x = X(d), y = Y(Math.sin(d * RAD)); if (d) g.lineTo(x, y); else g.moveTo(x, y); }
      g.stroke();
      g.strokeStyle = '#ffb21a'; g.lineWidth = 8; g.lineJoin = 'round'; g.beginPath();
      for (let d = 0; d <= 720; d += 2) {
        const on = a <= 0 || d % 180 >= a;
        const x = X(d), y = on ? Y(Math.sin(d * RAD)) : yc;
        if (d) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.stroke();
      /* la commande : une impulsion à chaque angle de retard */
      const yg = 372;
      g.strokeStyle = 'rgba(125,255,154,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, yg); g.lineTo(x1, yg); g.stroke();
      g.strokeStyle = '#7dff9a'; g.lineWidth = 6; g.beginPath();
      for (let k = 0; k < 4; k++) { const x = X(180 * k + Math.max(a, 3)); g.moveTo(x, yg); g.lineTo(x, yg - 50); }
      g.stroke();
      if (th !== undefined) {
        g.strokeStyle = '#ff6b35'; g.lineWidth = 4; g.setLineDash([14, 10]);
        [th, th + 360].forEach(d => { g.beginPath(); g.moveTo(X(d), yt - 6); g.lineTo(X(d), yg + 6); g.stroke(); });
        g.setLineDash([]);
        /* l'interrupteur : fermé si le triac conduit, ouvert sinon */
        const ferme = a <= 0 || th % 180 >= a;
        g.strokeStyle = ferme ? '#46d278' : '#ff5a3c'; g.fillStyle = g.strokeStyle; g.lineWidth = 7; g.lineCap = 'round';
        g.beginPath(); g.arc(520, 26, 6, 0, 7); g.arc(600, 26, 6, 0, 7); g.fill();
        g.beginPath(); g.moveTo(520, 26); if (ferme) g.lineTo(600, 26); else g.lineTo(588, 6); g.stroke();
        g.lineCap = 'butt';
      }
      g.fillStyle = '#7dff9a'; g.font = '700 34px Consolas, monospace'; g.textBaseline = 'middle';
      g.textAlign = 'left'; g.fillText('CH1', 34, 26);
      g.textAlign = 'right'; g.fillText(nb(ueff(E.alpha * RAD)) + ' V eff', w - 34, 424);
      ecr.maj();
    };

    /* ---------------------------------------------------------------- calculs de la charge */
    const calcul = () => {
      const U = ueff(E.alpha * RAD), k = U / UNOM;
      const r = { U, k, lum: k * k };
      if (moteur) {
        const b = 4.8 * k * k;
        r.cale = b < 2;
        if (!r.cale) { const y = (b - Math.sqrt(b * b - 4)) / 2; r.n = Math.round(1500 * (1 - 0.198 * y)); } else r.n = 0;
        r.couple = k * k * 100; r.I = 3.84 / Math.max(0.3, k);
        r.ceq = 100 + 40 * K.clamp((1 - k) / 0.355, 0, 1);
      }
      return r;
    };

    const maj = (parler) => {
      const r = calcul();
      matFil.color.setHex(0x3a0d06).lerp(new T.Color(0xfff0c0), Math.pow(r.lum, 0.55));
      if (halo) { halo.material.opacity = Math.min(1, r.lum * 1.1); halo.scale.setScalar(70 + 90 * r.lum); }
      bouton.rotation.z = (135 - E.alpha / 160 * 270) * RAD;
      if (sub) { sub.agir('charge', r.ceq); if (r.cale) sub.agir('phase', 'champ'); }
      if (moteur) ctx.mesures([
        { libelle: 'La tension appliquée', valeur: nb(r.U) + ' V' },
        { libelle: 'Le couple disponible', valeur: nb(r.couple) + ' %' },
        { libelle: 'La vitesse', valeur: r.cale ? '0 tr/min (calé)' : nb(r.n) + ' tr/min' },
        { libelle: 'L’intensité', valeur: nb(r.I, 1) + ' A' }
      ]);
      else ctx.mesures([
        { libelle: 'La tension efficace', valeur: nb(r.U) + ' V' },
        { libelle: 'La lumière', valeur: nb(r.lum * 100) + ' %' },
        { libelle: 'L’angle de retard', valeur: nb(E.alpha) + '°' }
      ]);
      if (!parler) return;
      if (moteur) ctx.dire(r.cale
        ? '<strong>Le couple ne suffit plus : le moteur cale.</strong> Il tire un courant énorme et chauffe : le relais thermique doit déclencher.'
        : E.alpha < 5 ? '<strong>Pleine tension.</strong> Le moteur tourne à sa vitesse : ' + nb(r.n) + ' tr/min. Baissez la tension et regardez la vitesse, puis le couple.'
        : '<strong>La vitesse tient, le couple s’écroule.</strong> À ' + nb(r.k * 100) + ' % de la tension, il ne reste que ' + nb(r.couple) + ' % du couple. La vitesse ne perd presque rien (' + nb(r.n) + ' tr/min), mais l’intensité monte : le bobinage chauffe.');
      else ctx.dire(E.alpha < 5
        ? '<strong>Le triac conduit pendant toute l’alternance.</strong> La lampe brille à pleine puissance. Tournez le bouton : l’angle de retard grandit.'
        : '<strong>Le triac attend, puis il conduit.</strong> On ne laisse passer que la fin de chaque alternance : la hauteur de l’onde ne change pas, la tension efficace baisse (' + nb(r.U) + ' V) et la lampe aussi.');
    };

    /* ---------------------------------------------------------------- l'étalonnage de la scène */
    const ghost = fantomeur(T, K, boitier);
    let ouvert = false;
    const basculerFantome = on => { ouvert = on; ghost(on); if (sub) sub.basculerFantome(on); };

    const PHASES = {
      cycle: () => { E.tenu = null; },
      attente: () => { E.tenu = Math.max(20, E.alpha) * 0.5; },
      amorcage: () => { E.tenu = E.alpha + 2; },
      passe: () => { E.tenu = E.alpha + (180 - E.alpha) * 0.5; },
      zero: () => { E.tenu = 182; }
    };
    const agir = (id, v) => {
      if (id === 'angle') {
        E.alpha = +v; E.tenu = null;
        ctx.regler('tension', Math.round(ueff(E.alpha * RAD)));
        maj(true);
      } else if (id === 'tension') {
        E.alpha = angleDe(+v); E.tenu = null;
        ctx.regler('angle', Math.round(E.alpha));
        maj(true);
      } else if (id === 'phase') {
        (PHASES[v] || PHASES.cycle)();
        ctx.regler('angle', Math.round(E.alpha)); ctx.regler('tension', Math.round(ueff(E.alpha * RAD)));
        maj(false);
      }
      ctx.reveiller();
    };

    const tmax = moteur ? 400 : 230, tmin = moteur ? 160 : 60;
    const commandes = [
      { id: 'tension', type: 'curseur', libelle: 'La tension appliquée', min: tmin, max: tmax, pas: 5, valeur: tmax, format: v => v + ' V' },
      { id: 'angle', type: 'curseur', libelle: 'L’angle de retard', min: 0, max: 160, pas: 5, valeur: 0, format: v => v + '°' }
    ];

    /* ---------------------------------------------------------------- les pièces */
    const pieces = [
      { id: 'boitier', nom: 'Le boîtier du gradateur', objets: [corps, capot], desc: 'Il se monte en série sur la phase, comme un interrupteur. « Voir dedans » le rend transparent.' },
      { id: 'bouton', nom: 'Le bouton de réglage', objets: [bouton, graduations], desc: 'On le tourne : il règle l’angle de retard. Ce qu’on règle n’est pas une tension, c’est un instant dans l’alternance.' },
      { id: 'commande', nom: 'La commande (potentiomètre)', objets: [commande], desc: 'Le potentiomètre est relié au bouton. Avec un petit condensateur, il décide à quel instant on envoie l’impulsion au triac.' },
      { id: 'triac', nom: 'Le triac', objets: [triac], desc: 'Un interrupteur électronique, sans pièce mobile. Une impulsion le ferme ; il se rouvre tout seul quand le courant passe par zéro.' },
      { id: 'radiateur', nom: 'Le radiateur', objets: [rad], desc: 'Un triac qui conduit chauffe. La plaque d’aluminium à ailettes évacue la chaleur : il faut la laisser respirer.' },
      { id: 'ecran', nom: 'L’oscilloscope', objets: [scope], desc: 'Il trace la tension aux bornes de la charge : la courbe pâle est l’onde entière, la courbe vive est ce qui passe vraiment.' },
      { id: 'fils', nom: 'Les fils', objets: [filIn.mesh, filOut.mesh].concat(filN ? [filN.mesh] : []), desc: 'La phase (marron) entre dans le gradateur, ressort vers la charge. Le gradateur est en série sur la phase.' }
    ];
    if (moteur) pieces.push({ id: 'moteur', nom: 'Le moteur asynchrone', objets: [sub.racine], desc: 'La charge. Sa vitesse est fixée par la fréquence : le gradateur ne la change presque pas, il ne fait qu’affaiblir le moteur.' });
    else pieces.push({ id: 'lampe', nom: 'La lampe', objets: lampeObjets, desc: 'Une ampoule à filament : moins de tension efficace, moins de puissance, moins de lumière. Sur une lampe, ça marche très bien.' });
    pieces.push({ id: 'panneau', nom: 'Le panneau d’essai', objets: [panneau].concat(pieds), desc: 'Tout est monté sur un panneau, comme au laboratoire.' });

    /* ---------------------------------------------------------------- le mouvement pas à pas */
    const charge = moteur ? 'le moteur' : 'la lampe';
    const VUE_T = { azimut: moteur ? 8 : -14, elevation: 8, zoom: 1.3, cible: [(DX + SCX) / 2, 195, 40] };   /* le boîtier et l'écran, entiers */
    const etapes = [
      { titre: 'Le réseau arrive entier', texte: 'Le bouton est à fond : l’angle de retard est nul. Le courant passe pendant toute l’alternance. Sur l’écran, la courbe vive suit la courbe pâle, et ' + charge + ' reçoit toute la tension.',
        actions: [['angle', 0], ['phase', 'cycle']], piece: 'ecran', voirDedans: false, vue: { azimut: -6, elevation: 8, zoom: 1.05, cible: null } },
      { titre: 'Le triac attend', texte: 'On a tourné le bouton : l’angle de retard vaut 90°. Au début de l’alternance, le triac reste ouvert. Rien ne passe, et la courbe vive reste à plat.',
        actions: [['angle', 90], ['phase', 'attente']], piece: 'triac', voirDedans: true, ralenti: true, vue: VUE_T },
      { titre: 'Une impulsion ferme le triac', texte: 'À l’instant choisi par le potentiomètre, la commande envoie une petite impulsion sur le triac. Il se ferme : le courant peut passer.',
        actions: [['phase', 'amorcage']], piece: 'commande', voirDedans: true, ralenti: true, vue: VUE_T },
      { titre: 'Le courant passe', texte: 'Le triac est fermé : la tension du réseau arrive à ' + charge + '. La courbe vive rejoint la courbe pâle, avec sa pleine hauteur.',
        actions: [['phase', 'passe']], piece: 'fils', voirDedans: true, ralenti: true, vue: { azimut: -10, elevation: 10, zoom: 1.05, cible: null } },
      { titre: 'Au passage par zéro, le triac s’ouvre seul', texte: 'Le courant s’annule : le triac n’a plus rien à retenir, il se rouvre tout seul. Cent fois par seconde, on recommence : on garde la fin de chaque alternance.',
        actions: [['phase', 'zero']], piece: 'triac', voirDedans: true, ralenti: true, vue: VUE_T },
      moteur
        ? { titre: 'La vitesse tient, le couple s’écroule', texte: 'La tension efficace baisse : le couple tombe, car il suit le carré de la tension. Mais la vitesse ne bouge presque pas. Le moteur tire plus de courant, et son bobinage chauffe.',
            actions: [['angle', 85], ['phase', 'cycle']], voirDedans: true, vue: { azimut: 30, elevation: 20, zoom: 1.2, cible: null } }
        : { titre: 'La lampe éclaire moins', texte: 'La tension efficace a baissé : la puissance baisse, le filament est moins chaud, la lampe éclaire moins. Sur une lampe, c’est parfait.',
            actions: [['angle', 120], ['phase', 'cycle']], piece: 'lampe', voirDedans: false, vue: { azimut: -14, elevation: 10, zoom: 1.05, cible: null } }
    ];

    /* ---------------------------------------------------------------- l'éclaté */
    const eclate = [
      { objets: [capot, bouton, graduations], vers: [0, 0, 90] },
      { objets: [commande], vers: [0, 0, 28] },
      { objets: [blocTriac], vers: [-8, -48, 52] }
    ];
    let grainsCaches = false;

    maj(false);
    dessiner(0);

    /* le cycle du réseau, ralenti : 0,4 période par seconde à l'écran */
    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -22, elevation: 12, cadre: [panneau, scope].concat(sub ? [sub.racine] : []), marge: 0.9 }
                                    : { azimut: -18, elevation: 14, cadre: [panneau, scope].concat(sub ? [sub.racine] : []), marge: 0.9 },
      fantome: boitier,
      basculerFantome,
      fantomeAuDepart: ctx.mode === 'comprendre',
      phrase: moteur
        ? '<strong>Un gradateur devant un moteur.</strong> Baissez la tension : regardez la vitesse, le couple et l’intensité.'
        : '<strong>Un gradateur, comme celui d’un variateur de lumière.</strong> Tournez le bouton : la lampe baisse, et l’écran montre l’onde découpée.',
      pieces, commandes, etapes, eclate,
      eclateVue: { azimut: -40, elevation: 18, zoom: 1.0 },
      surEclate(on) { grainsCaches = on; fils.forEach(f => { f.objet.visible = !on; }); },
      agir,
      animer(dt) {
        const th0 = E.tenu !== null ? E.tenu : (E.ph = (E.ph + dt * 0.4) % 1) * 360;
        const th = th0 % 360, demi = th % 180;
        const passe = E.alpha <= 0 || demi >= E.alpha;
        const sens = th < 180 ? 1 : -1;
        fils.forEach(f => { f.regler({ debit: passe ? 1 : 0, sens }); if (!grainsCaches) f.animer(dt); });
        matTriac.emissive.setHex(0xff6b35); matTriac.emissiveIntensity = passe ? 0.9 : 0;
        dessiner(th);
        if (sub) sub.animer(dt);
        return true;
      }
    };
  }, { famille: 'variation', titre: 'Le gradateur', stations: ['7.1', '7.2'] });

  /* un condensateur électrolytique : manchon bleu, bande blanche (−), capuchon d'aluminium (axe Y) */
  const condensateur = (T, K, r, h) => {
    const g = new T.Group();
    g.add(K.mesh(K.cylindre(r, h, 32), K.plastique(0x1d4f9a, 0.4), 0, 0, 0));
    g.add(K.mesh(K.cylindre(r * 0.96, 2.5, 32), K.mat.aluminium, 0, h / 2 + 0.6, 0));
    g.add(K.mesh(K.cylindre(r * 0.96, 3, 32), K.mat.aluminium, 0, -h / 2 - 0.6, 0));
    const bande = K.mesh(new T.BoxGeometry(r * 0.5, h * 0.9, 0.5), K.mat.plastiqueBlanc, 0, 0, r + 0.1);
    g.add(bande);
    [-0.45, 0.45].forEach(k => g.add(K.mesh(K.cylindre(2.2, 7, 12), K.mat.laiton, k * r, h / 2 + 4, 0)));
    return g;
  };

  /* une diode de puissance : corps noir, bague d'argent côté cathode (axe Y, cathode vers +Y) */
  const diode = (T, K) => {
    const g = new T.Group();
    g.add(K.mesh(K.cylindre(5.2, 12, 20), K.mat.plastiqueNoir, 0, 0, 0));
    g.add(K.mesh(K.cylindre(5.3, 2.4, 20), K.mat.argent, 0, 4.4, 0));
    [-1, 1].forEach(s => g.add(K.mesh(K.cylindre(1.2, 6, 10), K.mat.argent, 0, s * 8.5, 0)));
    return g;
  };

  /* ================================================================== le variateur de fréquence */
  Electro3D.definir('variateur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
    const E = { f: 50, loi: 'suit', reseau: true, vbus: 565, show: 'tout', t: 0 };

    /* ---------------------------------------------------------------- panneau et boîtier */
    const PX = 30;                                   /* centre du panneau */
    const panneau = K.mesh(K.boite(340, 420, 16, 3), K.propre(M.plastiqueBlanc), PX, 210, 0);
    panneau.material.color.setHex(0xe4dccb);
    const pieds = [-1, 1].map(s => K.mesh(K.boite(20, 24, 70, 2), M.plastiqueSombre, PX + s * 140, 12, 0));
    racine.add(panneau, ...pieds);
    const DXV = -45, CY = 235, ZB = 16;
    const corps = K.mesh(K.boite(130, 240, 118, 4), K.plastique(0xdfe1dc, 0.6), DXV, CY, ZB + 59);
    const capot = new T.Group();
    capot.add(K.mesh(K.boite(134, 244, 22, 4), K.plastique(0xd5d8d3, 0.6), DXV, CY, ZB + 129));
    /* l'afficheur et le clavier, sur la façade (z = 156) */
    const ZF = ZB + 140.2;
    capot.add(K.mesh(K.boite(96, 40, 1.4, 1), M.plastiqueNoir, DXV, CY + 88, ZF - 0.4));
    const aff = K.toile(70, 24, 12);
    aff.mesh.position.set(DXV, CY + 90, ZF + 0.5);
    capot.add(aff.mesh);
    [-30, -10, 10, 30].forEach((dx, i) => {
      const b = K.mesh(K.cylindre(5.6, 3, 24), i < 2 ? M.plastiqueMarine : M.plastiqueMarine, DXV + dx, CY + 52, ZF + 0.8); b.rotation.x = Math.PI / 2; capot.add(b);
    });
    const run = K.mesh(K.cylindre(6, 3, 24), M.plastiqueVert, DXV - 18, CY + 28, ZF + 0.8); run.rotation.x = Math.PI / 2;
    const stop = K.mesh(K.cylindre(6, 3, 24), M.plastiqueRouge, DXV + 18, CY + 28, ZF + 0.8); stop.rotation.x = Math.PI / 2;
    capot.add(run, stop);
    /* des ouïes de ventilation, comme sur l'appareil réel */
    for (let i = 0; i < 8; i++) capot.add(K.mesh(new T.BoxGeometry(70, 2.2, 0.8), M.sombre, DXV, CY - 60 - i * 6, ZF - 0.3));
    racine.add(corps, capot);
    const boitier = [corps, capot];

    /* ---------------------------------------------------------------- les trois étages, du haut vers le bas */
    const YR = 310, YB = 235, YO = 160;              /* centres du redresseur, du bus, de l'onduleur */
    const COL = [-30, 0, 30];
    const XD = x => DXV + x;
    /* 1. le redresseur : six diodes, deux par phase */
    const redresseur = new T.Group();
    redresseur.add(K.mesh(K.boite(96, 6, 8, 1), M.aluminium, DXV, YR, ZB + 28));
    COL.forEach(x => [1, -1].forEach(s => { const d = diode(T, K); if (s < 0) d.rotation.z = Math.PI; d.position.set(XD(x), YR + s * 15, ZB + 28); redresseur.add(d); }));
    /* 2. le bus continu : deux gros condensateurs et le témoin de charge */
    const busG = new T.Group();
    const cap1 = condensateur(T, K, 17, 62), cap2 = condensateur(T, K, 17, 62);
    cap1.position.set(XD(-24), YB, ZB + 50); cap2.position.set(XD(24), YB, ZB + 50);
    const voyant = new T.Group();
    const matVoy = K.propre(M.plastiqueRouge); matVoy.emissive = new T.Color(0xff2a10); matVoy.emissiveIntensity = 1.2;
    const led = K.mesh(K.cylindre(4, 4, 20), matVoy, XD(0), YB + 6, ZB + 70); led.rotation.x = Math.PI / 2;
    voyant.add(led, K.mesh(K.boite(14, 14, 2, 0.5), K.plastique(0x2f7a4f, 0.5), XD(0), YB + 6, ZB + 66));
    busG.add(cap1, cap2, voyant);
    /* 3. l'onduleur : six transistors IGBT sur un radiateur */
    const onduleur = new T.Group();
    const rad = radiateur(T, K, 92, 62, 18, 9, 0);
    rad.rotation.y = Math.PI; rad.position.set(XD(0), YO, ZB + 44);
    onduleur.add(rad);
    COL.forEach(x => [1, -1].forEach(s => {
      const t = transistor(T, K, false); t.rotation.z = Math.PI / 2 * 0;
      t.position.set(XD(x), YO + s * 17 + (s > 0 ? 2 : -2), ZB + 44);
      onduleur.add(t);
    }));
    racine.add(redresseur, busG, onduleur);
    /* les barres de cuivre : le plus (droite), le moins (gauche), et les liaisons */
    const barres = new T.Group();
    const bar = (w, h, x, y, z) => barres.add(K.mesh(K.boite(w, h, 3, 0.6), M.cuivre, x, y, z));
    bar(100, 5, XD(0), 333, ZB + 34);  bar(5, 150, XD(52), 262, ZB + 34);
    bar(100, 5, XD(0), 187, ZB + 34);
    bar(100, 5, XD(0), 288, ZB + 40);  bar(5, 150, XD(-52), 211, ZB + 40);
    bar(100, 5, XD(0), 136, ZB + 40);
    bar(52, 4, XD(26), 270, ZB + 34);  bar(52, 4, XD(-26), 200, ZB + 40);
    racine.add(barres);

    /* ---------------------------------------------------------------- les bornes et les fils */
    const bornes = new T.Group();
    const borneEn = (x, y, bas) => {
      const b = K.mesh(K.boite(16, 12, 14, 1.5), K.plastique(0x30363d, 0.5), XD(x), y, ZB + 110);
      bornes.add(b, K.mesh(K.cylindre(4, 4, 20), M.zingue, XD(x), y + (bas ? -6.5 : 6.5), ZB + 110));
    };
    COL.forEach(x => { borneEn(x, 346, false); borneEn(x, 124, true); });
    /* les repères sur la façade, au ras des bornes (ce qui est écrit sur l'appareil réel) */
    ['L1', 'L2', 'L3'].forEach((t, i) => { const g = K.gravure(t, 3.4, { couleur: '#2b3138' }); g.position.set(XD(COL[i]), 349, ZF + 0.2); capot.add(g); });
    ['U', 'V', 'W'].forEach((t, i) => { const g = K.gravure(t, 3.4, { couleur: '#2b3138' }); g.position.set(XD(COL[i]), 121, ZF + 0.2); capot.add(g); });
    racine.add(bornes);
    const fils = [], grains = { ac: [], dc: [], sortie: [] };
    const COUL = ['L1', 'L2', 'L3'];
    const filsAC = COL.map((x, i) => filLeger(K, [[XD(x), 346, ZB + 110], [XD(x), 332, ZB + 96], [XD(x), YR + 2, ZB + 40], [XD(x), YR, ZB + 29]], 1.6, COUL[i]));
    const filsU = COL.map((x, i) => filLeger(K, [[XD(x), YO + 2, ZB + 46], [XD(x), YO - 16, ZB + 70], [XD(x), 135, ZB + 96], [XD(x), 124, ZB + 110]], 1.6, COUL[i]));
    filsAC.concat(filsU).forEach(f => racine.add(f.mesh));
    /* le câble moteur, du bas du boîtier jusqu'au bout de la gaine du moteur */
    const XM = 440;
    const cable = filLeger(K, [[XD(0), 118, ZB + 110], [XD(0), 70, 150], [220, 6, 170], [500, 6, 150], [XM + 140, 5, 60], [XM + 130, 4, -48]], 5.2, K.plastique(0x8b9096, 0.55));
    racine.add(cable.mesh);
    const unGrain = (courbe, groupe, o) => { const c = K.courant(courbe, Object.assign({ pas: 15, rayon: 3, vitesse: 40 }, o || {})); racine.add(c.objet); grains[groupe].push(c); fils.push(c); return c; };
    filsAC.forEach(f => unGrain(f.courbe, 'ac').regler({ alternatif: true, frequence: 0.7 }));
    filsU.forEach(f => unGrain(f.courbe, 'sortie').regler({ alternatif: true, frequence: 0.7 }));
    const cheminPlus = K.chemin([[XD(-30), 333, ZB + 34], [XD(52), 333, ZB + 34], [XD(52), 187, ZB + 34], [XD(-30), 187, ZB + 34]]);
    const cheminMoins = K.chemin([[XD(30), 136, ZB + 40], [XD(-52), 136, ZB + 40], [XD(-52), 288, ZB + 40], [XD(30), 288, ZB + 40]]);
    unGrain(cheminPlus, 'dc', { pas: 18 }).regler({ alternatif: false });
    unGrain(cheminMoins, 'dc', { pas: 18 }).regler({ alternatif: false });

    /* ---------------------------------------------------------------- le voltmètre sur le bus, et le moteur */
    const compteur = new T.Group(); compteur.position.set(PX + 118, 290, ZB + 14);
    compteur.add(K.mesh(K.boite(86, 62, 26, 4), K.propre(M.plastiqueSombre), 0, 0, 0));
    const vol = K.toile(70, 40, 12);
    vol.mesh.position.set(0, 0, 13.6);
    compteur.add(K.mesh(K.boite(76, 46, 2, 1.5), M.plastiqueNoir, 0, 0, 12.6), vol.mesh);
    racine.add(compteur);
    const pointesV = [['rouge', 52, 262, 34, 6], ['noir', -52, 211, 40, -6]].map(([c, x, y, z, dy]) => {
      const f = filLeger(K, [[PX + 118 + dy, 262, ZB + 28], [PX + 60, 245 + dy * 2, ZB + 60], [XD(x), y, ZB + z + 4]], 1.2, c === 'rouge' ? 'rouge' : 'noir');
      racine.add(f.mesh); return f;
    });
    const sub = Electro3D.fabriquer('moteurAsynchrone', T, K, { mode: ctx.mode, options: { pilotage: 'frequence' }, dire() {}, mesures() {}, regler() {}, reveiller: ctx.reveiller, element: ctx.element });
    sub.racine.position.set(XM, 90, 40);
    racine.add(sub.racine);

    /* ---------------------------------------------------------------- dessin des afficheurs */
    const dessinerAff = () => {
      const { x: g, w, h } = aff;
      g.fillStyle = E.reseau ? '#c9d6b3' : '#1b1f1c'; g.fillRect(0, 0, w, h);
      if (E.reseau) {
        g.fillStyle = '#1a2a14'; g.font = '700 ' + Math.round(h * 0.68) + 'px Consolas, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText(nb(E.f, 1) + ' Hz', w / 2, h * 0.54);
      }
      aff.maj();
    };
    const dessinerVol = () => {
      const { x: g, w, h } = vol;
      g.fillStyle = '#10201a'; g.fillRect(0, 0, w, h);
      g.fillStyle = E.vbus > 50 ? '#ff6b35' : '#7dff9a'; g.font = '700 ' + Math.round(h * 0.52) + 'px Consolas, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(nb(E.vbus) + ' V', w / 2, h * 0.46);
      g.font = '700 ' + Math.round(h * 0.2) + 'px Consolas, monospace'; g.fillStyle = '#7dff9a';
      g.fillText('DC', w / 2, h * 0.86);
      vol.maj();
    };

    /* ---------------------------------------------------------------- l'état */
    const GROUPES = { tout: ['ac', 'dc', 'sortie'], entree: ['ac'], redresseur: ['ac', 'dc'], bus: ['dc'], onduleur: ['dc', 'sortie'], moteur: ['sortie'], coupe: [] };
    const maj = parler => {
      const r = E.loi === 'suit' ? 400 * E.f / 50 : 400;
      ctx.mesures([
        { libelle: 'La fréquence de sortie', valeur: nb(E.f, 1) + ' Hz' },
        { libelle: 'La tension de sortie', valeur: E.reseau ? nb(r) + ' V' : '0 V' },
        { libelle: 'Le bus continu', valeur: nb(E.vbus) + ' V' }
      ]);
      if (!parler) return;
      if (!E.reseau) ctx.dire(E.vbus > 50
        ? '<strong>Le réseau est coupé, l’afficheur est éteint — mais le bus garde sa charge : ' + nb(E.vbus) + ' V.</strong> Le témoin rouge reste allumé. On attend le temps écrit sur l’appareil (souvent cinq minutes) avant d’ouvrir. <em>À l’écran, le temps est accéléré.</em>'
        : '<strong>Le bus est déchargé.</strong> Le témoin est éteint : on peut ouvrir, après avoir vérifié l’absence de tension.');
      else ctx.dire('<strong>Le variateur défait, puis refait.</strong> Le redresseur passe l’alternatif en continu, le bus lisse, l’onduleur refabrique un alternatif à ' + nb(E.f, 1) + ' Hz. Le moteur suit cette fréquence.');
    };
    const agir = (id, v) => {
      const secteur = on => {
        E.reseau = on; if (on) E.vbus = 565;
        ctx.regler('reseau', undefined, { libelle: on ? 'Couper le réseau' : 'Remettre le réseau' });
        if (on) { sub.agir('freq', E.f); sub.agir('loi', E.loi); sub.agir('phase', 'marche'); } else sub.agir('phase', 'arret');
      };
      if (id === 'freq') { E.f = +v; if (E.reseau) sub.agir('freq', E.f); }
      else if (id === 'loi') { E.loi = v; if (E.reseau) sub.agir('loi', v); }
      else if (id === 'reseau') { secteur(!E.reseau); E.show = E.reseau ? 'tout' : 'coupe'; }
      else if (id === 'mains') secteur(v === 'marche');
      else if (id === 'etage') {
        E.show = v;
      }
      dessinerAff(); dessinerVol(); maj(id === 'freq' || id === 'loi' || id === 'reseau');
      ctx.reveiller();
    };

    const ghost = fantomeur(T, K, boitier);
    const basculerFantome = on => { ghost(on); sub.basculerFantome(on); };
    const CV = [DXV, 235, 60], CM = [XM, 70, 40];

    /* ---------------------------------------------------------------- les pièces */
    const pieces = [
      { id: 'boitier', nom: 'Le boîtier du variateur', objets: [corps, capot], desc: 'Il se monte au mur ou sur un panneau. « Voir dedans » le rend transparent : on voit ses trois étages.' },
      { id: 'face', nom: 'L’afficheur et le clavier', objets: [aff.mesh, run, stop], desc: 'On y lit la fréquence de sortie et on règle les paramètres. Éteint, il ne dit pas que le bus est déchargé.' },
      { id: 'bornesIn', nom: 'Les bornes du réseau (L1 L2 L3)', objets: [bornes], desc: 'Le réseau triphasé entre en haut. Les trois phases arrivent en alternatif.' },
      { id: 'redresseur', nom: 'Étage 1 : le redresseur', objets: [redresseur], desc: 'Six diodes. Une diode ne laisse passer le courant que dans un sens : l’alternatif sort en continu.' },
      { id: 'bus', nom: 'Étage 2 : le bus continu', objets: [busG, barres], desc: 'De gros condensateurs lissent le continu et stockent l’énergie. Ils restent chargés, à plus de 500 volts, après la coupure.' },
      { id: 'onduleur', nom: 'Étage 3 : l’onduleur', objets: [onduleur], desc: 'Six transistors (IGBT) sur un radiateur. Ils découpent le continu très vite et refabriquent un alternatif à la fréquence voulue.' },
      { id: 'sortie', nom: 'Les fils et le câble du moteur', objets: filsAC.map(f => f.mesh).concat(filsU.map(f => f.mesh), [cable.mesh]), desc: 'En haut, trois phases du réseau ; en bas, trois phases vers le moteur. Aucun contacteur entre le variateur et le moteur.' },
      { id: 'voltmetre', nom: 'Le voltmètre du bus', objets: [compteur].concat(pointesV.map(f => f.mesh)), desc: 'Il est branché sur les condensateurs. Après la coupure, il montre la tension qui reste, et le témoin rouge reste allumé tant qu’elle est dangereuse.' },
      { id: 'moteur', nom: 'Le moteur asynchrone', objets: [sub.racine], desc: 'Il suit la fréquence que lui envoie le variateur : plus la fréquence est basse, plus il tourne lentement.' },
      { id: 'panneau', nom: 'Le panneau d’essai', objets: [panneau].concat(pieds), desc: 'Tout est monté sur un panneau, comme au laboratoire.' }
    ];
    const commandes = [
      { id: 'freq', type: 'curseur', libelle: 'La fréquence de sortie', min: 10, max: 50, pas: 1, valeur: 50, format: v => v + ' Hz' },
      { id: 'loi', type: 'choix', options: [['suit', 'La tension suit la fréquence'], ['fixe', 'La tension reste à 400 V']], valeur: 'suit' },
      { id: 'reseau', type: 'action', libelle: 'Couper le réseau', accent: false }
    ];

    /* ---------------------------------------------------------------- le mouvement pas à pas */
    const VUE_H = { azimut: 12, elevation: 10, zoom: 2.2, cible: [DXV, 315, 60] };
    const etapes = [
      { titre: 'Le réseau entre en alternatif', texte: 'Les trois phases du réseau arrivent par les bornes du haut. Le courant va et vient, cinquante fois par seconde : c’est de l’alternatif.',
        actions: [['mains', 'marche'], ['freq', 35], ['etage', 'entree']], piece: 'bornesIn', voirDedans: true, ralenti: true, vue: VUE_H },
      { titre: 'Le redresseur fait passer tout du même côté', texte: 'Chaque diode ne laisse passer le courant que dans un sens. À la sortie des six diodes, le courant ne va plus et vient : il avance toujours dans le même sens.',
        actions: [['etage', 'redresseur']], piece: 'redresseur', voirDedans: true, ralenti: true, vue: VUE_H },
      { titre: 'Le bus continu stocke l’énergie', texte: 'Les gros condensateurs se chargent et lissent le courant : on a une tension continue, plus de 500 volts, prête à servir.',
        actions: [['etage', 'bus']], piece: 'bus', voirDedans: true, ralenti: true, vue: { azimut: 12, elevation: 10, zoom: 2.2, cible: [DXV, 235, 60] } },
      { titre: 'L’onduleur hache ce continu', texte: 'Six transistors s’ouvrent et se ferment très vite. Ils découpent le continu pour refaire un alternatif, à la fréquence qu’on a réglée : ici 35 hertz.',
        actions: [['etage', 'onduleur']], piece: 'onduleur', voirDedans: true, ralenti: true, vue: { azimut: 12, elevation: 10, zoom: 2.2, cible: [DXV, 165, 60] } },
      { titre: 'Le moteur suit cette fréquence', texte: 'Le moteur reçoit cet alternatif par son câble. Le champ tourne à 35 hertz : le moteur tourne moins vite que sur le réseau. Sur l’afficheur, on lit « 35.0 Hz ».',
        actions: [['etage', 'moteur']], piece: 'moteur', voirDedans: true, vue: { azimut: 25, elevation: 18, zoom: 1.45, cible: CM } },
      { titre: 'On coupe le réseau : le bus reste chargé', texte: 'L’afficheur s’éteint, mais les condensateurs gardent leur charge : le voltmètre lit encore plus de 500 volts et le témoin rouge reste allumé. On attend le temps écrit sur l’appareil avant d’ouvrir.',
        actions: [['mains', 'coupe'], ['etage', 'coupe']], piece: 'voltmetre', voirDedans: true, vue: { azimut: 20, elevation: 8, zoom: 2.1, cible: [CV[0] + 75, 255, 40] } }
    ];
    const eclate = [
      { objets: [capot], vers: [0, 0, 110] },
      { objets: [redresseur], vers: [0, 60, 40] },
      { objets: [busG], vers: [0, 0, 60] },
      { objets: [onduleur], vers: [0, -60, 40] }
    ];
    let grainsCaches = false;

    maj(false); dessinerAff(); dessinerVol();

    return {
      racine,
      vue: { azimut: ctx.mode === 'decouvrir' ? -22 : -18, elevation: 14, cadre: [panneau, sub.racine], marge: 0.92 },
      fantome: boitier, basculerFantome, fantomeAuDepart: ctx.mode === 'comprendre',
      phrase: '<strong>Un variateur de fréquence.</strong> Réglez la fréquence : l’afficheur et la vitesse du moteur suivent. Ouvrez-le avec « Voir dedans » pour voir ses trois étages.',
      pieces, commandes, etapes, eclate,
      eclateVue: { azimut: -30, elevation: 16, zoom: 1.4, cible: CV },
      surEclate(on) { grainsCaches = on; fils.forEach(f => { f.objet.visible = !on; }); },
      agir(id, v) {
        agir(id, v);
      },
      animer(dt) {
        E.t += dt;
        if (!E.reseau && E.vbus > 0) { const av = E.vbus; E.vbus = Math.max(0, E.vbus * Math.exp(-dt / 10)); if (Math.round(av) !== Math.round(E.vbus)) { dessinerVol(); maj(false); } if (E.vbus < 50 && av >= 50) maj(true); }
        matVoy.emissiveIntensity = E.vbus > 50 ? 1.2 : 0.05;
        const montrer = GROUPES[E.reseau ? E.show : 'coupe'] || GROUPES.tout;
        const hache = (E.t * 6) % 1 < 0.6 ? 1 : 0.3;
        const fr = 0.7 * E.f / 50 + 0.05;
        Object.keys(grains).forEach(k => grains[k].forEach(c => {
          const vu = montrer.indexOf(k) >= 0 && E.reseau;
          const o = { debit: vu ? (k === 'sortie' ? hache : 1) : 0 };
          if (k === 'sortie') o.frequence = fr;
          c.regler(o);
          if (!grainsCaches) c.animer(dt);
        }));
        sub.animer(dt);
        return true;
      }
    };
  }, { famille: 'variation', titre: 'Le variateur de fréquence', stations: ['7.4'] });

})();
