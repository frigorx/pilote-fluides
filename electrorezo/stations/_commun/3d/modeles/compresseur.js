/* ÉlectroRézo 3D — famille « compresseur » : le relais d'intensité de démarrage (petits compresseurs
   hermétiques monophasés, jusqu'à environ 600 W).
   Unités : millimètres. Repère : X largeur, Y hauteur (TOP en haut), Z profondeur
   (+Z = face avant, celle qui porte les inscriptions ; −Z = face arrière, celle qui s'embroche).

   Ce que l'élève doit VOIR : la bobine (peu de tours de gros fil) est traversée par le courant du
   principal, entre L et M. Au démarrage ce courant est fort : la bobine attire l'équipage mobile vers le
   haut, le pont ferme le contact S-L et l'auxiliaire est alimenté. Le moteur prend de la vitesse, le
   courant baisse ; vers 80 % de la vitesse l'équipage retombe de tout son poids : le contact s'ouvre,
   l'auxiliaire est retiré. Monté à l'envers (TOP en bas), l'équipage tombe sur le contact et le laisse
   fermé en permanence.

   La coupe : « Voir dedans » rend le boîtier transparent ET la moitié avant de la bobine (fil, tube,
   joues) : on regarde dans la bobine, l'équipage y coulisse. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('relaisIntensite', (T, K, ctx) => {
    const M = K.mat;
    const opt = ctx.options || {};
    const PI = Math.PI;
    const racine = new T.Group();
    const corps = new T.Group();          /* tout ce qui se retourne d'un bloc (montage à l'envers) */
    racine.add(corps);

    /* ---------------------------------------------------------------- cotes (à confirmer sur un relais réel) */
    const L = 40, H = 35, P = 25;                       /* boîtier : largeur, hauteur, profondeur */
    const Z_AR = -P / 2, Z_AV = P / 2, E_AR = 2.5, E_AV = 2.2, E_PAROI = 1.5;
    const Z_INT_AR = Z_AR + E_AR, Z_INT_AV = Z_AV - E_AV;   /* -10 et 10,3 */
    const Y_SOL = -16, Y_CIEL = 16;                     /* l'intérieur du boîtier, en hauteur */
    /* la bobine : un tube, deux joues, cinq tours de gros fil */
    const R_TI = 4.6, R_TE = 5.4, R_FIL = 1.0, R_SP = R_TE + R_FIL, R_JOUE = 9.0;
    const N_SP = 5, PAS = 2.3, Y_SP0 = -8.6, Y_SP1 = Y_SP0 + N_SP * PAS;     /* le fil va de -8,6 à 2,9 */
    const JB = [-10.9, -9.8], JH = [4.0, 5.0];          /* joue du bas, joue du haut (y bas, y haut) */
    const Y_TUBE0 = -14.5, BUTEE = [-16, -14.5];
    /* l'équipage mobile (dessiné au repos : en bas, sur la butée) */
    const R_NOYAU = 3.8, L_NOYAU = 12, Y_NOYAU = -8.5;
    const COURSE = 5.5;
    /* les contacts */
    const XC = 5.5, Y_PAST_FIXE = 14.2;
    const X_BR = 11, Z_BR = -8.2;                       /* colonne des liaisons, fond des fourreaux */
    const PIN = { M: [-11, -8.6], S: [11, -8.6], L: [-11, 9] };
    /* le moteur */
    const SEUIL = 80;                                   /* % de la vitesse : le contact s'ouvre */
    const courantDe = v => v < SEUIL ? 5 - 3 * v / SEUIL : 2 - (v - SEUIL) / 20;   /* en fois le courant nominal */

    /* ---------------------------------------------------------------- matières */
    const noir = K.plastique(0x2b2f34, 0.5);            /* le boîtier : plastique noir */
    const ivoire = K.plastique(0xe6dfcd, 0.55);         /* le support de la bobine */
    const coupeMat = K.plastique(0xf6f1e2, 0.6);        /* les faces de coupe */

    /* ---------------------------------------------------------------- le boîtier */
    const contour = (w, h, r) => K.formeArrondie(w, h, r);
    const fBague = contour(L, H, 3.9);
    fBague.holes.push(contour(L - 2 * E_PAROI, H - 2 * E_PAROI, 2.4));
    const bague = K.mesh(K.extrusion(fBague, Z_INT_AV - Z_INT_AR), noir);
    bague.position.z = (Z_INT_AV + Z_INT_AR) / 2;
    const capotFace = K.mesh(K.boite(L, H, E_AV, 3.5), noir, 0, 0, Z_AV - E_AV / 2);
    /* la plaque arrière, percée de trois trous pour les fourreaux */
    const fPlaque = contour(L, H, 3.9);
    Object.keys(PIN).forEach(k => { const t = new T.Path(); t.absarc(PIN[k][0], PIN[k][1], 2.75, 0, PI * 2, true); fPlaque.holes.push(t); });
    const plaque = K.mesh(K.extrusion(fPlaque, E_AR), noir, 0, 0, Z_AR + E_AR / 2);
    /* le détrompage : un ergot au coin laissé libre par les trois fourreaux */
    const ergot = K.cylZ(1.8, 2.2, noir, 11, 9, Z_AR - 1.0, 20);
    corps.add(bague, capotFace, plaque, ergot);

    /* les inscriptions de la face avant : seulement ce qui existe sur le relais réel */
    const marquages = new T.Group();
    const voileMat = new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
    const grave = (t, h, x, y) => {
      const g = K.gravure(t, h, { couleur: '#dfe2e5' }); g.position.set(x, y, Z_AV + 0.05); g.userData.voile = true; marquages.add(g);
      /* un voile transparent derrière : il s'allume en orange sans cacher la lettre */
      const v = new T.Mesh(new T.PlaneGeometry(g.userData.largeur + 2, g.userData.hauteur + 1.5), voileMat);
      v.position.set(x, y, Z_AV + 0.03); v.userData.voile = true; v.userData.sansOmbre = true; marquages.add(v);
    };
    grave('TOP', 4.2, 0, 12.4);
    grave('M', 4.2, PIN.M[0], -9.4);
    grave('S', 4.2, PIN.S[0], -9.4);
    grave('L', 4.2, PIN.L[0], 9.4);
    corps.add(marquages);

    /* ---------------------------------------------------------------- les fourreaux (broches femelles) */
    const fourreau = (x, y) => {
      const g = new T.Group();
      g.add(K.cylZ(2.7, 5.8, M.laiton, x, y, -11.1, 24));                 /* z -14 → -8,2 */
      g.add(K.cylZ(1.7, 0.3, M.sombre, x, y, -14.1, 20));                 /* l'ouverture, où entrera la broche du compresseur */
      return g;
    };
    const brocheM = fourreau(...PIN.M), brocheS = fourreau(...PIN.S), brocheL = fourreau(...PIN.L);
    corps.add(brocheM, brocheS, brocheL);

    /* ---------------------------------------------------------------- la bobine
       Deux moitiés : l'arrière (opaque, avec les faces de coupe) et l'avant (qui devient fantôme avec le
       boîtier) : on regarde donc DANS la bobine, par la coupe. */
    const bobineArriere = new T.Group(), bobineAvant = new T.Group();
    const demi = (profil, avant) => new T.LatheGeometry(profil.map(p => new T.Vector2(p[0], p[1])), 28, avant ? -PI / 2 : PI / 2, PI);
    const anneauProfil = (r0, r1, y0, y1) => [[r0, y0], [r1, y0], [r1, y1], [r0, y1], [r0, y0]];
    [[true, bobineAvant], [false, bobineArriere]].forEach(([avant, g]) => {
      g.add(new T.Mesh(demi(anneauProfil(R_TI, R_TE, Y_TUBE0, JH[0]), avant), ivoire));                 /* le tube guide */
      g.add(new T.Mesh(demi(anneauProfil(R_TE, R_JOUE, JB[0], JB[1]), avant), ivoire));                 /* la joue du bas */
      g.add(new T.Mesh(demi(anneauProfil(1.95, R_JOUE, JH[0], JH[1]), avant), ivoire));                 /* la joue du haut, percée pour la tige */
    });
    /* cinq tours de gros fil : dix demi-tours, les pairs devant, les impairs derrière */
    for (let h = 0; h < 2 * N_SP; h++) {
      const pts = [];
      for (let i = 0; i <= 8; i++) {
        const u = h + i / 8, phi = -PI / 2 + u * PI;
        pts.push(new T.Vector3(R_SP * Math.sin(phi), Y_SP0 + PAS * u / 2, R_SP * Math.cos(phi)));
      }
      const fil = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 12, R_FIL, 8, false), M.bobinage);
      (h % 2 === 0 ? bobineAvant : bobineArriere).add(fil);
    }
    /* la butée : le pied de la bobine, sur lequel l'équipage repose (posé sur le fond du boîtier) */
    bobineArriere.add(K.cylY(R_TE, BUTEE[1] - BUTEE[0], ivoire, 0, (BUTEE[0] + BUTEE[1]) / 2, 0, 28));
    /* faces de coupe : sections du fil, du tube et des joues, dans le plan z = 0 */
    const faceCoupe = (x, y, w, h) => bobineArriere.add(K.mesh(new T.PlaneGeometry(w, h), coupeMat, x, y, 0.02));
    [-1, 1].forEach(s => {
      faceCoupe(s * (R_TI + R_TE) / 2, (Y_TUBE0 + JH[0]) / 2, R_TE - R_TI, JH[0] - Y_TUBE0);
      faceCoupe(s * (R_TE + R_JOUE) / 2, (JB[0] + JB[1]) / 2, R_JOUE - R_TE, JB[1] - JB[0]);
      faceCoupe(s * (1.95 + R_JOUE) / 2, (JH[0] + JH[1]) / 2, R_JOUE - 1.95, JH[1] - JH[0]);
    });
    for (let h = 0; h <= 2 * N_SP; h++) {
      const d = K.mesh(new T.CircleGeometry(R_FIL, 14), M.cuivre, (h % 2 === 0 ? -1 : 1) * R_SP, Y_SP0 + PAS * h / 2, 0.03);
      bobineArriere.add(d);
    }
    /* les deux fils de sortie : en bas vers M, en haut vers L */
    const filBas = K.fil([[-R_SP, Y_SP0, 0], [-8.8, Y_SP0, 0], [-11, Y_SP0, -1.8], [-11, Y_SP0, -5], [PIN.M[0], Y_SP0, Z_BR]], R_FIL, M.bobinage, { pas: 2.5, radial: 8 });
    const filHaut = K.fil([[-R_SP, Y_SP1, 0], [-8.8, Y_SP1, 0], [-11, Y_SP1, -1.8], [-11, Y_SP1, -5], [-X_BR, Y_SP1, Z_BR]], R_FIL, M.bobinage, { pas: 2.5, radial: 8 });
    bobineArriere.add(filBas.mesh, filHaut.mesh);
    corps.add(bobineArriere, bobineAvant);

    /* ---------------------------------------------------------------- les contacts fixes : deux lames de cuivre */
    const lames = new T.Group();
    const lame = (s, yBas) => {          /* s = -1 : côté L ; +1 : côté S */
      const g = new T.Group(), haut = 15.9, long = haut - yBas;
      g.add(K.mesh(new T.BoxGeometry(2.9, long, 0.8), M.cuivre, s * X_BR, yBas + long / 2, Z_BR));          /* la liaison verticale */
      g.add(K.mesh(new T.BoxGeometry(3, 1, 10.6), M.cuivre, s * X_BR, 15.5, -3.3));                        /* le retour sous le plafond */
      g.add(K.mesh(new T.BoxGeometry(7.3, 0.9, 4), M.cuivre, s * 7.35, 15.5, 0));                          /* le bras vers le pont */
      g.add(K.mesh(new T.BoxGeometry(3.2, 0.8, 3.2), M.argent, s * XC, Y_PAST_FIXE + 0.4, 0));             /* la pastille d'argent */
      return g;
    };
    lames.add(lame(-1, 1.4), lame(1, -10));
    corps.add(lames);

    /* ---------------------------------------------------------------- l'équipage mobile et son pont */
    const mobile = new T.Group();
    const noyau = K.cylY(R_NOYAU, L_NOYAU, M.plastiqueMarine, 0, Y_NOYAU, 0, 32);
    const tige = K.cylY(1.7, 9.2, M.plastiqueMarine, 0, 1.6, 0, 20);
    const tete = K.cylY(4.2, 1.4, M.plastiqueMarine, 0, 6.2, 0, 28);
    const pont = new T.Group();
    pont.add(K.mesh(new T.BoxGeometry(15, 1, 4), M.cuivre, 0, 7.4, 0));
    [-1, 1].forEach(s => pont.add(K.mesh(new T.BoxGeometry(3.2, 0.8, 3.2), M.argent, s * XC, 8.3, 0)));
    mobile.add(noyau, tige, tete, pont);
    corps.add(mobile);

    /* ---------------------------------------------------------------- le courant et le champ */
    const R_G = R_SP + R_FIL * 0.85;       /* les grains roulent sur le fil, pas dedans */
    const spire = [];
    for (let i = 0; i <= 120; i++) {       /* de haut en bas : le courant entre par L, sort par M */
      const t = 1 - i / 120, phi = -PI / 2 + t * N_SP * 2 * PI;
      spire.push([R_G * Math.sin(phi), Y_SP0 + t * N_SP * PAS, R_G * Math.cos(phi)]);
    }
    const cheminBobine = K.chemin([
      [-X_BR, 9, Z_BR + 1], [-X_BR, 3.6, Z_BR + 1], [-X_BR, 3.6, 0], [-R_G, 3.6, 0], ...spire,
      [-R_G, -7.9, 0], [-X_BR, -7.9, 0], [-X_BR, -7.9, Z_BR + 0.2]
    ]);
    const gBobine = K.courant(cheminBobine, { pas: 5, rayon: 0.8, vitesse: 30 });
    gBobine.regler({ debit: 0, alternatif: true, frequence: 0.7 });
    const YP = 7.4 + COURSE;                                  /* hauteur du pont, contact fermé */
    const cheminContact = K.chemin([
      [-X_BR, 9, Z_BR + 1], [-X_BR, 14.4, Z_BR + 1], [-X_BR, 14.4, 2.2], [-XC, 14.4, 2.2], [-XC, YP, 2.2],
      [XC, YP, 2.2], [XC, 14.4, 2.2], [X_BR, 14.4, 2.2], [X_BR, 14.4, Z_BR + 1], [X_BR, PIN.S[1], Z_BR + 1]
    ]);
    const gContact = K.courant(cheminContact, { pas: 4.5, rayon: 0.8, vitesse: 22 });
    gContact.regler({ debit: 0, alternatif: true, frequence: 0.7 });
    corps.add(gBobine.objet, gContact.objet);
    const grains = [gBobine, gContact];

    /* le champ de la bobine : des boucles bleues qui sortent par le haut du noyau et se referment autour */
    const champ = new T.Group(), flux = [];
    const boucle = (s, w, h, yc, r) => {      /* le bord intérieur passe dans le noyau (x = 2,8) : on ne voit que l'arc qui en sort */
      const pts = K.formeArrondie(w, h, r).getSpacedPoints(56).slice(0, -1).map(p => new T.Vector3(s * (2.8 + w / 2 + p.x), yc + p.y, 0.4));
      const f = K.flux(new T.CatmullRomCurve3(pts, true), { rayon: 0.4, pas: 6, vitesse: 0.9, ferme: true });
      f.regler({ intensite: 0, alternatif: true });
      champ.add(f.objet); flux.push(f);
    };
    [-1, 1].forEach(s => boucle(s, 13.5, 24, -1.5, 6));
    corps.add(champ);

    /* ---------------------------------------------------------------- l'état et le mouvement */
    let tension = false, envers = !!opt.envers, retenu = false, pasAPas = false, eclatee = false;
    let v = 0, vCible = 0, rampe = 1e9, vAff = 0;      /* vitesse du moteur, en % */
    let Ilis = 0, ferme = false, cleT = '', cleM = '';
    const pos = K.mobile(envers ? COURSE : 0, 240, 24); /* 0 = en bas ; COURSE = en haut */
    let ang = envers ? PI : 0;
    corps.rotation.z = ang;

    /* la coupe : le boîtier devient transparent et la moitié avant de la bobine disparaît, on regarde dans la bobine.
       Pendant l'éclaté, tout est plein et le relais est remis à l'endroit. */
    const fantomeMat = K.propre(noir); fantomeMat.transparent = true; fantomeMat.opacity = 0.14; fantomeMat.depthWrite = false; fantomeMat.roughness = 0.7;
    const aretesMat = new T.LineBasicMaterial({ color: 0x1b3a63, transparent: true, opacity: 0.16, depthWrite: false });
    const coque = [bague, capotFace, plaque], matPlein = new Map(coque.map(m => [m, m.material])), aretes = new Map();
    let fantomeActif = false;
    const appliquerFantome = () => {
      const on = fantomeActif && !eclatee;
      coque.forEach(m => {
        m.material = on ? fantomeMat : matPlein.get(m); m.castShadow = !on;
        if (on && !aretes.has(m)) {
          const a = new T.LineSegments(new T.EdgesGeometry(m.geometry, 24), aretesMat);
          a.raycast = () => {}; a.userData.decor = true; m.add(a); aretes.set(m, a);
        }
        if (aretes.has(m)) aretes.get(m).visible = on;
      });
      bobineAvant.visible = !on;
    };

    /* l'équipage monte quand le courant est fort ; à l'envers, il tombe sur le contact */
    const haut = () => eclatee ? false : envers ? true : (tension && !retenu && v < SEUIL);
    const placer = () => {
      const y = Math.max(0, Math.min(COURSE, pos.x));
      mobile.position.y = y;
      const f = ferme ? y > COURSE - 0.9 : y >= COURSE - 0.05;
      if (f !== ferme) { ferme = f; majGrains(); }
    };
    const majGrains = () => {
      const ic = tension && !eclatee ? K.clamp(Ilis / 5, 0, 1) : 0;
      gBobine.regler({ debit: ic > 0.02 ? 0.25 + 0.75 * ic : 0, vitesse: 16 + 28 * ic });
      gContact.regler({ debit: ferme && tension && !eclatee ? 1 : 0 });
      flux.forEach(f => f.regler({ intensite: ic > 0.02 ? 0.15 + 0.85 * ic : 0 }));
    };

    /* seuls les repères du cours sont chiffrés (5 fois le nominal à l'arrêt, 80 % de la vitesse) : entre les deux, on dit « en baisse » */
    const texteCourant = () => Ilis < courantDe(v) - 0.15 ? 'il monte'
      : v < 10 ? 'environ 5 fois le nominal' : v < SEUIL ? 'en baisse' : v < 100 ? 'trop faible' : 'le courant nominal';
    const majMesures = () => {
      const liste = !tension ? [
        { libelle: 'Ohmmètre entre M et L', valeur: 'presque 0 Ω' },
        { libelle: 'Ohmmètre entre S et L', valeur: ferme ? 'presque 0 Ω' : 'l’infini' },
        { libelle: 'Ohmmètre entre S et M', valeur: ferme ? 'presque 0 Ω' : 'l’infini' }
      ] : [
        { libelle: 'Courant du principal', valeur: texteCourant() },
        { libelle: 'Vitesse du moteur', valeur: Math.round(v) + ' %' },
        { libelle: 'Contact S – L', valeur: ferme ? 'fermé' : 'ouvert' }
      ];
      const k = JSON.stringify(liste);
      if (k !== cleM) { cleM = k; ctx.mesures(liste); }
    };

    const PH = {
      repos: '<strong>Hors tension.</strong> Le poids de l’équipage mobile le garde en bas. Le pont est loin des deux contacts fixes : le contact S-L est ouvert. À l’ohmmètre, vous lisez l’infini entre S et L, et presque 0 Ω entre M et L.',
      tension: '<strong>Mise sous tension.</strong> Le courant passe dans la bobine, entre L et M, et il monte : environ 5 fois le courant nominal. Le contact S-L est encore ouvert : l’auxiliaire n’est pas alimenté, le moteur ne peut pas démarrer.',
      demarrage: '<strong>Le contact se ferme.</strong> Le fort courant fait de la bobine un aimant : elle attire l’équipage mobile vers le haut. Le pont relie S et L : l’auxiliaire est alimenté et le moteur démarre.',
      accelere: '<strong>Le moteur accélère.</strong> Le courant baisse, mais il reste assez fort pour retenir l’équipage en haut. Le contact S-L reste fermé.',
      lance: '<strong>Moteur lancé.</strong> Vers 80 % de la vitesse, le courant n’est plus assez fort : l’équipage est retombé et le contact S-L est ouvert. L’auxiliaire est retiré, le principal continue seul.',
      envers: '<strong>Monté à l’envers.</strong> TOP est en bas : l’équipage tombe sur le contact et le laisse fermé, même hors tension. L’auxiliaire reste alimenté en permanence : le moteur risque de griller.'
    };
    const texteEtat = () => envers ? PH.envers : !tension ? PH.repos : retenu ? PH.tension : v < SEUIL ? (v < 5 ? PH.demarrage : PH.accelere) : PH.lance;
    const dire = () => { const t = texteEtat(); cleT = t; ctx.dire(t); };

    /* l'état des boutons et du curseur suit l'état du relais */
    const syncCommandes = (bouton) => {
      ctx.regler('etat', bouton);
      ctx.regler('vitesse', Math.round(v), { desactive: !tension });
      ctx.regler('montage', envers ? 'envers' : 'normal');
    };

    /* les temps du mouvement pas à pas : chacun fixe tout l'état, pour qu'on puisse y aller dans n'importe quel ordre */
    const phase = p => {
      pasAPas = true;
      const regle = (t, e, r, vv, vc, rp) => { tension = t; envers = e; retenu = r; v = vv; vCible = vc; if (rp) rampe = rp; };
      if (p === 'repos')    regle(false, false, false, 0, 0, 1e9);
      if (p === 'tension')  regle(true, false, true, 0, 0, 1e9);
      if (p === 'colle')    regle(true, false, false, 0, 0, 1e9);
      if (p === 'accelere') regle(true, false, false, 0, 55, 35);
      if (p === 'retombe')  regle(true, false, false, 55, 100, 30);
      if (p === 'envers')   regle(true, true, false, 100, 100, 1e9);
      vAff = Math.round(v);
      syncCommandes(p === 'repos' ? 'repos' : p === 'envers' ? 'lance' : 'demarrage');
      majGrains(); majMesures();
    };

    const agir = (id, val) => {
      if (id === 'phase') { phase(val); return; }
      pasAPas = false; retenu = false;
      if (id === 'etat') {
        if (val === 'repos') { tension = false; v = vCible = 0; }
        if (val === 'demarrage') { tension = true; v = 0; vCible = 100; rampe = 16; }
        if (val === 'lance') { tension = true; v = vCible = 100; }
        vAff = Math.round(v);
        ctx.regler('vitesse', vAff, { desactive: !tension });
      } else if (id === 'vitesse') {
        tension = true; v = vCible = val; vAff = Math.round(v);
        ctx.regler('vitesse', null, { desactive: false });
        ctx.regler('etat', v >= 100 ? 'lance' : null);
      } else if (id === 'montage') {
        envers = val === 'envers';
      } else return;
      majGrains(); majMesures(); dire();
    };

    placer(); majGrains(); majMesures();
    ctx.regler('vitesse', 0, { desactive: true });
    if (envers) ctx.regler('montage', 'envers');

    return {
      racine,
      /* « comprendre » : de face, là où l'on voit l'équipage monter et descendre ;
         « découvrir » : de trois quarts, avec le dessus et la face qui porte les inscriptions */
      vue: ctx.mode === 'decouvrir' ? { azimut: -34, elevation: 20, zoom: 1.3, cadre: [bague, capotFace, plaque], marge: 1.1 }
                                    : { azimut: -16, elevation: 9, zoom: 1.3, cadre: [bague, capotFace, plaque], marge: 1.1 },
      basculerFantome(on) { fantomeActif = on; appliquerFantome(); },
      phrase: envers ? PH.envers : PH.repos,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [bague, capotFace, plaque], desc: 'Un petit boîtier en plastique noir. Il s’embroche sur le bornier du compresseur. « Voir dedans » le rend transparent.' },
        { id: 'marquage', nom: 'Les inscriptions M, S, L et TOP', objets: [marquages], desc: 'M repère le principal, S l’auxiliaire, L la ligne. TOP doit être en haut quand le relais est monté.' },
        { id: 'bobine', nom: 'La bobine (entre L et M)', objets: [bobineArriere, bobineAvant], desc: 'Quelques tours de gros fil de cuivre : sa résistance est presque nulle. Tout le courant du principal la traverse et elle devient un aimant.' },
        { id: 'equipage', nom: 'L’équipage mobile', objets: [noyau, tige, tete], desc: 'Un noyau d’acier qui coulisse librement dans la bobine, avec sa tige et sa tête isolante. Au repos, son poids le fait descendre.' },
        { id: 'pont', nom: 'Le pont de contact', objets: [pont], desc: 'Il monte avec l’équipage. Quand il touche les deux contacts fixes, il relie S et L.' },
        { id: 'contacts', nom: 'Les contacts fixes (S et L)', objets: [lames], desc: 'Deux lames de cuivre avec une pastille d’argent. L’une est reliée à S, l’autre à L.' },
        { id: 'brocheM', nom: 'La broche M (principal)', objets: [brocheM], desc: 'Reliée à la bobine. Elle va vers l’enroulement principal du compresseur.' },
        { id: 'brocheS', nom: 'La broche S (auxiliaire)', objets: [brocheS], desc: 'Reliée au contact fixe. Elle va vers l’enroulement auxiliaire, qui n’est alimenté que lorsque le contact est fermé.' },
        { id: 'brocheL', nom: 'La broche L (ligne)', objets: [brocheL], desc: 'Commune à la bobine et au contact. Le courant de la ligne passe par la bobine, et par le contact quand il est fermé.' },
        { id: 'detrompage', nom: 'Le détrompage', objets: [ergot], desc: 'Un ergot qui empêche d’embrocher le relais dans le mauvais sens sur le bornier.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', titre: 'Le moteur', options: [['repos', 'Hors tension'], ['demarrage', 'Mise sous tension'], ['lance', 'Moteur lancé']], valeur: 'repos' },
        { id: 'vitesse', type: 'curseur', libelle: 'La vitesse du moteur', min: 0, max: 100, pas: 1, unite: '%', valeur: 0 },
        { id: 'montage', type: 'choix', titre: 'Le sens de montage', options: [['normal', 'TOP en haut'], ['envers', 'Monté à l’envers']], valeur: envers ? 'envers' : 'normal' }
      ],
      etapes: [
        { titre: 'Hors tension', piece: 'equipage', voirDedans: true, actions: [['phase', 'repos']],
          vue: { azimut: -14, elevation: 8, zoom: 1.35 },
          texte: 'Sans courant, le poids de l’équipage mobile le garde en bas. Le pont est loin des deux contacts fixes : le contact S-L est ouvert.' },
        { titre: 'Mise sous tension : le courant monte', piece: 'bobine', voirDedans: true, actions: [['phase', 'tension']],
          vue: { azimut: -20, elevation: 10, zoom: 1.4 }, duree: 7,
          texte: 'Le courant traverse le Klixon, le principal et la bobine, entre L et M. Le contact est ouvert : l’auxiliaire n’est pas alimenté, le moteur ne peut pas démarrer. Le courant monte, environ 5 fois le courant nominal.' },
        { titre: 'La bobine attire l’équipage : le contact se ferme', piece: 'equipage', voirDedans: true, ralenti: true, actions: [['phase', 'colle']],
          vue: { azimut: -10, elevation: 6, zoom: 1.45, cible: [0, 2, 0] }, duree: 7,
          texte: 'Le fort courant fait de la bobine un aimant. Elle attire l’équipage mobile vers le haut, et le pont ferme le contact entre S et L : l’auxiliaire est alimenté.' },
        { titre: 'Le moteur accélère : le courant baisse', piece: 'pont', voirDedans: true, actions: [['phase', 'accelere']],
          vue: { azimut: -24, elevation: 14, zoom: 1.5, cible: [0, 3, 0] }, duree: 7,
          texte: 'Par S, le courant alimente l’auxiliaire et le moteur prend de la vitesse. Le courant du principal baisse : suivez les grains, ils sont moins nombreux dans la bobine.' },
        { titre: 'Vers 80 % de la vitesse : l’équipage retombe', piece: 'equipage', voirDedans: true, ralenti: true, actions: [['phase', 'retombe']],
          vue: { azimut: -10, elevation: 6, zoom: 1.45, cible: [0, 2, 0] }, duree: 8,
          texte: 'Le courant n’est plus assez fort pour retenir l’équipage. Il retombe, le contact S-L s’ouvre et l’auxiliaire est retiré. Le moteur continue avec le principal seul.' },
        { titre: 'Monté à l’envers : le contact reste fermé', piece: 'marquage', voirDedans: true, actions: [['phase', 'envers']],
          vue: { azimut: -14, elevation: 8, zoom: 1.35 }, duree: 8,
          texte: 'Si TOP est en bas, l’équipage tombe sur le contact au lieu de s’en éloigner. Le contact reste fermé en permanence, l’auxiliaire reste alimenté : le moteur risque de griller.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : le capot sort vers l'avant, les lames de contact montent,
         l'équipage monte à son tour, la bobine avance, puis la plaque et les fourreaux sortent par l'arrière */
      eclate: [
        { objets: [bague, capotFace, marquages], vers: [0, 0, 62], debut: 0, fin: 0.5 },
        { objets: [lames], vers: [0, 44, 0], debut: 0.1, fin: 0.6 },
        { objets: [mobile], vers: [0, 24, 0], debut: 0.3, fin: 0.8 },
        { objets: [bobineArriere, bobineAvant], vers: [0, 0, 22], debut: 0.35, fin: 0.8 },
        { objets: [plaque, ergot], vers: [0, 0, -16], debut: 0.5, fin: 0.9 },
        { objets: [brocheM, brocheS, brocheL], vers: [0, 0, -40], debut: 0.55, fin: 1 }
      ],
      eclateVue: { azimut: -50, elevation: 18, zoom: 0.5, cible: [0, 8, 8] },
      surEclate(on) { eclatee = on; appliquerFantome(); majGrains(); },
      agir,
      animer(dt) {
        let actif = false;
        /* la vitesse du moteur */
        if (v !== vCible) {
          const d = vCible - v;
          v = Math.abs(d) <= rampe * dt ? vCible : v + Math.sign(d) * rampe * dt;
          actif = true;
          if (Math.round(v) !== vAff) { vAff = Math.round(v); ctx.regler('vitesse', vAff); }
          if (v === vCible && tension && vCible >= 100) ctx.regler('etat', 'lance');
        }
        /* le courant du principal suit la vitesse : fort à l'arrêt, plus faible quand le moteur tourne */
        const I = tension ? courantDe(v) : 0, avantI = Ilis;
        Ilis = K.vers(Ilis, I, 5, dt);
        if (Math.abs(Ilis - I) < 0.02) Ilis = I;
        if (Ilis !== avantI) { actif = true; majGrains(); }
        /* le retournement du relais */
        const cibleAng = envers && !eclatee ? PI : 0;
        if (ang !== cibleAng) {
          ang = K.vers(ang, cibleAng, 4.5, dt);
          if (Math.abs(ang - cibleAng) < 0.003) ang = cibleAng;
          corps.rotation.z = ang; actif = true;
        }
        /* l'équipage */
        pos.cible = haut() ? COURSE : 0;
        if (pos.pas(dt)) actif = true;
        placer();
        grains.forEach(g => { if (g.animer(dt)) actif = true; });
        flux.forEach(f => { if (f.animer(dt)) actif = true; });
        majMesures();
        if (!pasAPas && texteEtat() !== cleT) dire();
        return actif;
      }
    };
  }, { famille: 'compresseur', titre: 'Le relais d’intensité', stations: ['9.3'] });
})();
