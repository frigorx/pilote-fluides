/* ÉlectroRézo 3D — famille « separation » : l'interrupteur, le sectionneur, l'interrupteur-sectionneur,
   le porte-fusible et le sectionneur porte-fusible (ligne 3 : couper et isoler).
   Unités : millimètres. Repère : X largeur, Y hauteur, Z profondeur (0 = rail, +Z = face avant).

   Ce que l'élève doit VOIR : COMMANDER, COUPER EN CHARGE et ISOLER ne sont pas la même chose.
   · l'interrupteur claque (un ressort) et coupe en charge, mais son écart ouvert n'est pas garanti ;
   · le sectionneur laisse un écart franc, visible, cadenassable — et ne s'ouvre jamais en charge ;
   · l'interrupteur-sectionneur cumule les deux mécanismes ;
   · le porte-fusible porte la cartouche, rien de plus ;
   · le sectionneur porte-fusible isole ET met les cartouches hors tension. */
(() => {
  'use strict';
  if (!window.Electro3D) return;
  const D2R = Math.PI / 180;

  /* ------------------------------------------------------------------ briques locales
     (le cadenas, le ressort et la tige entre deux points sont au kit : K.cadenas, K.ressortEntre, K.tigeEntre) */

  /* un boîtier creux, ouvert vers l'avant : une paroi d'un seul tenant (anneau) sur toute la
     profondeur z0 → z1, plus un fond (« arriere » ou « avant ») s'il y en a un */
  const coque = (T, K, mat, l, h, z0, z1, e, rayon, fond) => {
    const g = new T.Group();
    const f = K.formeArrondie(l - 0.6, h - 0.6, rayon);
    f.holes.push(K.formeArrondie(l - 2 * e, h - 2 * e, Math.max(0.5, rayon - e)));
    g.add(K.mesh(K.extrusion(f, z1 - z0 - 0.6, 0.3), mat, 0, 0, (z0 + z1) / 2));
    if (fond === 'arriere') g.add(K.mesh(K.boite(l - 2 * e + 0.4, h - 2 * e + 0.4, e, 0.5), mat, 0, 0, z0 + e / 2));
    if (fond === 'avant') g.add(K.mesh(K.boite(l - 2 * e + 0.4, h - 2 * e + 0.4, e, 0.5), mat, 0, 0, z1 - e / 2));
    return g;
  };

  /* éclaircir le temps d'une étape (« focus ») : les objets passent en verre pâle, puis reviennent.
     Pour des objets HORS fantôme seulement (le rail, une poignée). Une pièce que le moteur tient
     allumée garde sa surbrillance : on échange alors le matériau qu'il lui rendra. */
  const eclaircir = (objets) => {
    const mailles = [], pales = new Map();
    objets.forEach(o => o.traverse(m => { if (m.isMesh) mailles.push(m); }));
    let actif = false;
    return on => {
      on = !!on; if (on === actif) return; actif = on;
      mailles.forEach(m => {
        const allumee = m.userData.allumee;
        const actuel = allumee ? m.userData.matAvantSurbrillance : m.material;
        let nouveau = on ? pales.get(actuel) : (m.userData.matAvantVoile || actuel);
        if (on) {
          m.userData.matAvantVoile = actuel;
          if (!nouveau) { nouveau = actuel.clone(); nouveau.transparent = true; nouveau.opacity = 0.14; nouveau.depthWrite = false; pales.set(actuel, nouveau); }
        }
        if (allumee) m.userData.matAvantSurbrillance = nouveau; else m.material = nouveau;
      });
    };
  };

  /* ================================================================== brique locale : la cartouche
     Un tube de céramique, deux capsules de laiton, un fil calibré au milieu, du sable tout autour.
     Axe le long de Y, centrée à l'origine. À remonter dans le kit (la station 4.1 la reprendra). */
  const cartouche = (T, K, o) => {
    const M = K.mat;
    const Lg = o.longueur, R = o.rayon, caps = o.capsule, lc = Lg - 2 * caps;
    const g = new T.Group();
    const corps = K.mesh(K.cylindre(R, lc, 32), M.ceramique, 0, 0, 0);
    const capH = K.mesh(K.cylindre(R, caps, 32), M.laiton, 0, lc / 2 + caps / 2, 0);
    const capB = K.mesh(K.cylindre(R, caps, 32), M.laiton, 0, -lc / 2 - caps / 2, 0);
    /* le fil : deux moitiés, qui se séparent quand il fond ; des perles de métal fondu aux bouts */
    const matFil = K.propre(M.cuivre);
    const fil = new T.Group();
    const moitieH = K.mesh(K.cylindre(0.85, 1, 10), matFil), moitieB = K.mesh(K.cylindre(0.85, 1, 10), matFil);
    const perleH = K.mesh(K.sphere(1.5, 12), matFil), perleB = K.mesh(K.sphere(1.5, 12), matFil);
    fil.add(moitieH, moitieB, perleH, perleB);
    const demi = lc / 2 + caps - 1.5;                     /* le fil va d'une capsule à l'autre */
    const regler = (fondu) => {
      const trou = fondu ? 4.2 : 0;                       /* la moitié du vide laissé par la fusion */
      const l = demi - trou;
      moitieH.scale.set(1, l, 1); moitieH.position.set(0, trou + l / 2, 0);
      moitieB.scale.set(1, l, 1); moitieB.position.set(0, -trou - l / 2, 0);
      perleH.visible = perleB.visible = !!fondu;
      perleH.position.set(0, trou, 0); perleB.position.set(0, -trou, 0);
    };
    regler(false);
    /* le sable : des grains posés au hasard dans le tube, sauf autour du fil (on doit le voir) */
    const N = o.grains || 170;
    const sable = new T.InstancedMesh(new T.IcosahedronGeometry(0.65, 0), M.sable, N);
    let graine = 7; const alea = () => (graine = (graine * 16807) % 2147483647) / 2147483647;
    const m4 = new T.Matrix4();
    for (let i = 0; i < N; i++) {
      /* une croix libre le long des deux axes : le fil reste visible de face comme de côté */
      let x, z;
      do { const a = alea() * Math.PI * 2, r = 1.5 + alea() * (R - 2.2); x = Math.cos(a) * r; z = Math.sin(a) * r; } while (Math.abs(x) < 1.7 || Math.abs(z) < 1.7);
      m4.makeTranslation(x, (alea() - 0.5) * (lc - 1.4), z); sable.setMatrixAt(i, m4);
    }
    sable.instanceMatrix.needsUpdate = true; sable.frustumCulled = false;
    g.add(corps, capH, capB, fil, sable);
    return { g, corps, caps: [capH, capB], fil, sable, regler, matFil };
  };

  /* ================================================================== 3.1 L'INTERRUPTEUR
     Modulaire, deux pôles (36 mm) : le neutre à gauche (bleu), la phase à droite (marron).
     Une manette, un ressort, une bascule qui porte les deux lames, deux contacts fixes. */
  Electro3D.definir('interrupteur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const L = 36, H = 85, Z_AV = 68;
    const XP = [-9, 9], COUL = ['N', 'L1'];
    const Y_LAME = -16, Z_PIV = 14;                 /* le pivot de la lame */
    const Z_PASTILLE = 40;                          /* la pastille de contact, à 26 mm du pivot */
    const E_LAME = 2.6, E_PAD = 1.0, E_BANDE = 2.0; /* un peu plus épais que le vrai : on les voit mieux */
    const Y_CONTACT = Y_LAME + E_LAME / 2 + E_PAD;  /* le plan où les deux pastilles se touchent */
    const Y_LANG = Y_CONTACT + E_PAD + E_BANDE / 2; /* la languette du contact fixe */
    const ALPHA_OUVERT = 22 * D2R, ALPHA_ARC = 10 * D2R, THETA = 25 * D2R;
    const AXE_X = new T.Vector3(1, 0, 0);

    /* ---- le rail et le boîtier (creux : on voit dedans quand le capot s'écarte) */
    const rail = K.railDIN(64);
    const socle = coque(T, K, M.plastique, L, H, 0, 40, 2.2, 2.4, 'arriere');
    const capot = coque(T, K, M.plastique, L, H, 40, Z_AV, 2.2, 2.4, 'avant');
    const griffe = K.mesh(K.boite(14, 6, 5, 1), M.plastiqueSombre, 0, -H / 2 + 1, 2.5);
    const fente = K.mesh(K.boite(28, 14, 0.5, 0.2), M.sombre, 0, 0, Z_AV + 0.05);   /* la fente de la manette */
    racine.add(rail, socle, capot, griffe, fente);

    /* ---- les bornes (entrée en haut, sortie en bas) et les marquages */
    const bornes = new T.Group(), marquages = new T.Group();
    const REP = [['1', '2'], ['3', '4']];
    XP.forEach((x, i) => [1, -1].forEach((s, k) => {
      const creux = K.mesh(K.cylindre(3.4, 1.2, 24), M.sombre, x, s * 33, Z_AV - 0.4); creux.rotation.x = Math.PI / 2;
      const vis = K.vis(2.4); vis.rotation.x = Math.PI / 2; vis.position.set(x, s * 33, Z_AV - 0.9);
      const cage = K.mesh(K.boite(9, 9, 12, 0.8), M.zingue, x, s * 32.5, 58);
      const entree = K.mesh(K.boite(6.4, 1.6, 6.4, 0.4), M.sombre, x, s * (H / 2 - 0.55), 60);
      bornes.add(creux, vis, cage, entree);
      const g = K.gravure(REP[i][k], 3, { couleur: '#2b3138' });
      g.position.set(x, s * 25.6, Z_AV + 0.08); marquages.add(g);
    }));
    const gI = K.gravure('I', 3.6, { couleur: '#1e7e54' }); gI.position.set(0, 13, Z_AV + 0.08);
    const gO = K.gravure('O', 3.6, { couleur: '#c0392b' }); gO.position.set(0, -13, Z_AV + 0.08);
    const gCal = K.gravure('16 A\n250 V', 2.6, { couleur: '#2b3138' }); gCal.position.set(0, -20, Z_AV + 0.08);
    marquages.add(gI, gO, gCal);
    racine.add(bornes, marquages);

    /* ---- les contacts fixes : bornes du haut → bande verticale → languette → pastille */
    const fixes = new T.Group();
    const Y_BAS_BANDE = Y_CONTACT + E_PAD;           /* le bas de la languette */
    XP.forEach(x => {
      fixes.add(K.mesh(K.boite(5, E_BANDE, 14, 0.4), M.cuivre, x, 30, 55));                                  /* de la borne vers l'arrière */
      fixes.add(K.mesh(K.boite(5, 30 - Y_BAS_BANDE, E_BANDE, 0.4), M.cuivre, x, (30 + Y_BAS_BANDE) / 2, 48)); /* la bande qui descend */
      fixes.add(K.mesh(K.boite(5, E_BANDE, 14, 0.4), M.cuivre, x, Y_LANG, 41));                              /* la languette */
      fixes.add(K.mesh(K.boite(4, E_PAD, 8, 0.2), M.argent, x, Y_CONTACT + E_PAD / 2, Z_PASTILLE));
    });
    racine.add(fixes);

    /* ---- la partie basse : du pivot à la borne du bas */
    const bas = new T.Group();
    XP.forEach(x => {
      bas.add(K.mesh(K.boite(5, Y_LAME + 33, E_BANDE, 0.4), M.cuivre, x, (Y_LAME - 33) / 2 + 0.0, Z_PIV));   /* du pivot vers le bas */
      bas.add(K.mesh(K.boite(5, E_BANDE, 46, 0.4), M.cuivre, x, -33, 37));                                  /* puis vers la borne */
    });
    racine.add(bas);

    /* ---- l'équipage mobile : une bascule isolante qui porte les deux lames */
    const equipage = new T.Group();
    equipage.position.set(0, Y_LAME, Z_PIV);
    const axe = K.mesh(K.cylindre(2.4, 28, 16), M.zingue); axe.rotation.z = Math.PI / 2;
    const bascule = K.mesh(K.boite(26, 3.8, 7, 0.8), M.plastiqueMarine, 0, 0, 9);
    const queue = K.mesh(K.boite(6, 11, 3, 0.8), M.plastiqueMarine, 0, 5, -4);
    equipage.add(axe, bascule, queue);
    XP.forEach(x => {
      equipage.add(K.mesh(K.boite(5, E_LAME, 30, 0.5), M.cuivre, x, 0, 15));
      equipage.add(K.mesh(K.boite(4, E_PAD, 8, 0.2), M.argent, x, E_LAME / 2 + E_PAD / 2, Z_PASTILLE - Z_PIV));
    });
    racine.add(equipage);

    /* ---- la manette : un moyeu, un bras qui sort, un petit bras à l'intérieur */
    const manette = new T.Group();
    manette.position.set(0, 0, 60);
    const moyeu = K.mesh(K.cylindre(3.2, 30, 20), M.acierSombre); moyeu.rotation.z = Math.PI / 2;
    const bras = K.mesh(K.boite(24, 7, 18, 1.6), M.plastiqueNoir, 0, 0, 9);
    const brasInt = K.mesh(K.boite(14, 4, 9, 1), M.plastiqueNoir, 0, 0, -5.5);
    manette.add(moyeu, bras, brasInt);
    racine.add(manette);

    /* ---- le ressort (de compression) : de la queue de la bascule vers un poussoir que la
       manette fait avancer. Il est le plus comprimé quand la manette passe le point milieu. */
    const ressort = K.ressort(3, 30, 6, 0.65, M.acier);   /* un fil épais, peu de spires : on voit les spires se serrer */
    const poussoir = K.mesh(K.cylindre(1.1, 1, 10), M.acierSombre);
    racine.add(ressort, poussoir);

    /* ---- les fils venus du dehors : le neutre à gauche, la phase à droite */
    const fils = new T.Group(), filsH = [], filsB = [];
    XP.forEach((x, i) => {
      const h = K.fil([[x, 74, 22], [x, 68, 44], [x, 56, 58], [x, 45, 60], [x, 34, 60]], 1.7, COUL[i]);
      const b = K.fil([[x, -34, 60], [x, -45, 60], [x, -56, 58], [x, -68, 44], [x, -74, 22]], 1.7, COUL[i]);
      fils.add(h.mesh, b.mesh); filsH.push(h); filsB.push(b);
    });
    racine.add(fils);

    /* ---- le courant : il ne passe que si les pièces se touchent */
    const grains = XP.map((x, i) => {
      const c = K.courant(K.chemin([filsH[i].courbe, [x, 30, 60], [x, 30, 48], [x, Y_LANG, 48], [x, Y_LANG, Z_PASTILLE], [x, Y_CONTACT, Z_PASTILLE], [x, Y_LAME, Z_PASTILLE],
        [x, Y_LAME, Z_PIV], [x, -33, Z_PIV], [x, -33, 60], filsB[i].courbe]), { pas: 6.5, rayon: 1.05, vitesse: 38 });
      c.regler({ debit: 1, alternatif: true, frequence: 0.7 });
      racine.add(c.objet); return c;
    });

    /* ---- l'arc : pendu sous la pastille fixe, étiré selon l'écart (8 mm de long au départ) */
    const arcs = XP.map(x => {
      const a = K.arc(new T.Vector3(0, 0, 0), new T.Vector3(0, -8, 0), { rayon: 0.8, halo: 1.0 });
      a.objet.position.set(x, Y_CONTACT, Z_PASTILLE); racine.add(a.objet); return a;
    });

    /* ---- l'état et le mouvement */
    const main = K.mobile(-THETA, 170, 24);       /* la main : plutôt lente */
    const lame = K.mobile(0, 900, 34);            /* la bascule : ça claque */
    let etat = 'ferme', attente = null, tArc = 0, contact = true, ecart = 0, eclatee = false;
    const DEMI = { ferme: -THETA, arc: 4 * D2R, ouvert: THETA };

    const placer = () => {
      manette.rotation.x = main.x;
      equipage.rotation.x = lame.x;
      /* le ressort part de la queue de la bascule ; un poussoir le relie à la manette.
         Le ressort est le plus comprimé quand la manette passe le point milieu. */
      const D = new T.Vector3(0, 0, -9).applyAxisAngle(AXE_X, main.x).add(manette.position);
      const Q = new T.Vector3(0, 10, -5).applyAxisAngle(AXE_X, lame.x).add(equipage.position);
      const dir = D.clone().sub(Q), dTD = dir.length(); dir.divideScalar(dTD);
      const tension = Math.max(0, 1 - 0.65 * Math.min(1, Math.abs(main.x) / THETA));
      const Ls = Math.min(dTD - 3, 34 - 12 * tension);
      const bout = Q.clone().addScaledVector(dir, Ls);
      K.ressortEntre(ressort, Q, bout);
      K.tigeEntre(poussoir, bout, D);
      ecart = Math.max(0, 26 * Math.sin(lame.x) + (E_LAME / 2 + E_PAD) * (1 - Math.cos(lame.x)));
      const touche = ecart < 0.16;
      if (touche !== contact) {
        contact = touche;
        if (!contact && etat === 'ouvert' && !eclatee) tArc = 0.32;      /* coupure sous charge : l'arc jaillit */
        majCourant();
      }
      const arcOn = !contact && !eclatee && ((etat === 'arc') || tArc > 0);
      arcs.forEach(a => { a.regler(arcOn); a.objet.scale.set(1, Math.max(0.25, ecart / 8), 1); });
    };
    const MESURES = {
      ferme: [['Les deux pièces', 'se touchent'], ['Courant dans la charge', '10 A'], ['Écart entre les pièces', '0 mm']],
      arc: [['Les deux pièces', 'viennent de se quitter'], ['Courant dans la charge', 'passe dans l’arc'], ['Écart entre les pièces', '4 mm']],
      ouvert: [['Les deux pièces', 'sont séparées'], ['Courant dans la charge', '0 A'], ['Écart entre les pièces', '10 mm, non garanti']]
    };
    const majCourant = () => {
      grains.forEach(g => g.regler({ debit: contact && !eclatee ? 1 : 0 }));
      ctx.mesures(MESURES[etat].map(([libelle, valeur]) => ({ libelle, valeur })));
    };
    const PHRASES = {
      ferme: '<strong>Fermé.</strong> Les deux pièces de métal se touchent : le courant passe. Le ressort tient la lame appuyée.',
      arc: '<strong>À l’instant de l’ouverture.</strong> La lame vient de quitter le contact fixe. Le courant continue un instant dans l’air : c’est l’arc, et il est très chaud. Le ressort le rend le plus bref possible.',
      ouvert: '<strong>Ouvert.</strong> L’arc s’est éteint, le circuit est coupé. Mais l’écart n’est pas garanti : un interrupteur n’isole pas.'
    };

    /* va vers un état : la manette se déplace, la bascule claque quand elle passe le milieu */
    const aller = (v, manetteVers) => {
      if (v === etat && manetteVers === undefined) return;
      const avant = etat; etat = v;
      main.cible = manetteVers !== undefined ? manetteVers : DEMI[v];
      attente = v === 'ferme' ? 0 : v === 'arc' ? ALPHA_ARC : ALPHA_OUVERT;
      if (avant === 'arc' && v === 'ouvert' && !eclatee) tArc = 0.32;
      majCourant();
    };

    const agir = (id, v) => {
      /* « focus » : le rail pâlit pendant la leçon (il ne sert pas au mécanisme) ; une commande le rétablit */
      if (id === 'focus') { focusRail(v === 'meca'); return; }
      if (id !== 'phase') focusRail(false);
      if (id === 'phase') {
        /* le mouvement découpé pour la leçon : la manette AVANT le ressort, le ressort AVANT l'arc */
        if (v === 'repos') aller('ferme');
        if (v === 'tend') aller('ferme', -3 * D2R);       /* presque au milieu : le ressort est comprimé, la lame n'a pas bougé */
        if (v === 'claque') aller('arc');
        if (v === 'ouvert') aller('ouvert');
        ctx.regler('position', etat);
        return;
      }
      if (id !== 'position') return;
      aller(v);
      ctx.dire(PHRASES[v]);
    };

    placer(); majCourant();
    const focusRail = eclaircir([rail, griffe]);

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -28, elevation: 14, cadre: [socle, capot], marge: 1.12 }
                                    : { azimut: -50, elevation: 14, cadre: [socle, capot], marge: 1.16, cible: [0, 0, 44] },
      fond: 'platine',
      fantome: [socle, capot],
      phrase: PHRASES.ferme,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [socle, capot, griffe, fente, marquages], desc: 'Il tient les pièces à distance et protège les doigts. Il porte les deux nombres : le courant qu’il accepte de couper et la tension.' },
        { id: 'manette', nom: 'La manette (I – O)', objets: [manette], desc: 'On la bascule à la main. I : fermé. O : ouvert. Qu’on la pousse lentement ou vite, la suite ne change pas.' },
        { id: 'ressort', nom: 'Le ressort', objets: [ressort, poussoir], desc: 'Il rend le mouvement brusque, quelle que soit la lenteur du doigt. La manette le comprime ; arrivé au milieu, il se détend d’un coup : c’est le claquement.' },
        { id: 'mobile', nom: 'Le contact mobile', objets: [equipage], desc: 'Deux lames de cuivre, une par pôle, portées par une bascule isolante. Une pastille d’argent au bout de chaque lame.' },
        { id: 'fixe', nom: 'Le contact fixe', objets: [fixes], desc: 'Une pièce de cuivre immobile, reliée à la borne du haut. Fermé, la lame s’appuie sur sa pastille.' },
        { id: 'arc', nom: 'L’arc électrique', objets: arcs.map(a => a.objet), desc: 'À l’instant où les pièces se quittent, le courant continue dans l’air : un petit éclair très chaud. S’il dure, il brûle le métal.' },
        { id: 'bornes', nom: 'Les bornes', objets: [bornes, bas], desc: 'L’arrivée en haut (1 et 3), le départ en bas (2 et 4). On serre bien : une borne mal serrée chauffe.' },
        { id: 'fils', nom: 'Le neutre et la phase', objets: [fils], desc: 'À gauche le neutre (bleu), à droite la phase (marron). Cet interrupteur est bipolaire : il coupe les deux.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'L’interrupteur s’y clipse, comme tout l’appareillage modulaire.' }
      ],
      commandes: [
        { id: 'position', type: 'choix', options: [['ferme', 'Fermé'], ['arc', 'À l’instant de l’ouverture'], ['ouvert', 'Ouvert']], valeur: 'ferme' }
      ],
      /* le mouvement, pas à pas : de côté, là où l'on voit la lame se lever */
      etapes: [
        { titre: 'Fermé : le courant passe', piece: 'mobile', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'repos']],
          vue: { azimut: -58, elevation: 12, zoom: 1.2, cible: [0, -2, 40] },
          texte: 'La lame mobile s’appuie sur le contact fixe : les deux pièces de métal se touchent, le courant passe. Les grains dorés le montrent.' },
        { titre: 'On pousse la manette : le ressort se comprime', piece: 'ressort', ralenti: true, actions: [['focus', 'meca'], ['phase', 'tend']],
          vue: { azimut: -78, elevation: 8, zoom: 1.6, cible: [0, -6, 40] }, duree: 7,
          texte: 'La main fait avancer la manette. Elle comprime le ressort. La lame, elle, ne bouge pas encore : les pièces se touchent toujours.' },
        { titre: 'Le ressort se détend : la lame part d’un coup', piece: 'mobile', ralenti: true, actions: [['focus', 'meca'], ['phase', 'claque']],
          vue: { azimut: -78, elevation: 8, zoom: 1.6, cible: [0, -6, 40] }, duree: 7,
          texte: 'La manette a passé le milieu : le ressort se détend d’un coup et chasse la lame, bien plus vite que votre doigt. Les pièces se quittent, un arc jaillit entre elles.' },
        { titre: 'L’arc s’allonge et s’éteint', piece: 'arc', ralenti: true, actions: [['focus', 'meca'], ['phase', 'ouvert']],
          vue: { azimut: -78, elevation: 8, zoom: 2.0, cible: [0, -10, 40] }, duree: 7,
          texte: 'La lame continue de s’éloigner : l’arc s’étire, refroidit et s’éteint. Le circuit est coupé, le courant ne passe plus.' },
        { titre: 'Ouvert : mais l’écart reste petit', piece: 'fixe', actions: [['focus', 'meca']],
          vue: { azimut: -70, elevation: 10, zoom: 2.1, cible: [0, -10, 40] },
          texte: 'Quelques millimètres seulement séparent les pièces, et rien ne les garantit. Un interrupteur coupe en charge, mais il n’isole pas : on ne travaille pas derrière.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : la manette sort, puis le capot, puis les contacts */
      eclate: [
        { objets: [manette], vers: [0, 0, 130], debut: 0, fin: 0.5 },
        { objets: [capot, fente, marquages], vers: [0, 44, 96], debut: 0.2, fin: 0.7 },
        { objets: [fixes, bornes, fils], vers: [0, 0, 56], debut: 0.35, fin: 0.85 },
        { objets: [ressort, poussoir], vers: [0, 26, 70], debut: 0.4, fin: 0.9 },
        { objets: [equipage], vers: [0, -4, 30], debut: 0.5, fin: 1 },
        { objets: [bas], vers: [0, -12, 14], debut: 0.6, fin: 1 }
      ],
      eclateVue: { azimut: -40, elevation: 20, zoom: 0.65, cible: [0, 8, 88] },
      surEclate(on) { eclatee = on; if (on) tArc = 0; majCourant(); placer(); },
      agir,
      animer(dt) {
        const bougeMain = main.pas(dt);
        /* la bascule ne part que lorsque la manette a passé le milieu */
        if (attente !== null) {
          const apres = DEMI[etat] > 0 ? main.x >= 0 : main.x <= 0;
          if (apres) { lame.cible = attente; attente = null; }
        }
        const bougeLame = lame.pas(dt);
        if (tArc > 0) tArc -= dt;
        placer();
        let actif = bougeMain || bougeLame || attente !== null || tArc > 0;
        if (!eclatee) {
          grains.forEach(g => { if (g.animer(dt)) actif = true; });
          arcs.forEach(a => { if (a.animer(dt)) actif = true; });
        }
        return actif;
      }
    };
  }, { famille: 'separation', titre: 'L’interrupteur', stations: ['3.1'] });

  /* ================================================================== 3.2 LE SECTIONNEUR
     Tripolaire, à coupure visible. Pas de ressort, pas de chambre de coupure : les trois lames
     suivent la main et laissent un écart d'air franc, qu'on voit par la fenêtre. On le
     cadenasse ouvert. Ouvert en charge, l'arc s'installe et ne s'éteint pas. */
  Electro3D.definir('sectionneur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const W = 90, H = 120, Z_AV = 72, E = 2.6;
    const XP = [-27, 0, 27], COUL = ['L1', 'L2', 'L3'];
    const Y_ARBRE = 36, Z_ARBRE = 56, LONG_LAME = 64, Y_PINCE = -26;
    const PHI_OUVERT = 38 * D2R, THETA_FERME = -20 * D2R;       /* la manette suit l'arbre : θ = THETA_FERME + φ */
    const Z_TROU = 34, X_OREILLE = 7.6;                          /* le trou de cadenas : à 34 mm de l'arbre sur la manette */
    const AXE_X = new T.Vector3(1, 0, 0);

    /* ---- le rail et le boîtier (creux) ; la face avant a une fenêtre : la coupure visible */
    const rail = K.railDIN(110);
    const socle = coque(T, K, M.plastique, W, H, 0, 40, E, 3, 'arriere');
    const anneau = coque(T, K, M.plastique, W, H, 40, Z_AV, E, 3);
    const FY = -5, FH = 58, FW = 78;
    const forme = K.formeArrondie(W - 2 * E + 0.4, H - 2 * E + 0.4, 1.5);
    forme.holes.push(new T.Path(K.formeArrondie(FW, FH, 3).getPoints(24).map(p => new T.Vector2(p.x, p.y + FY))));
    const face = K.mesh(K.extrusion(forme, E, 0.2), M.plastique, 0, 0, Z_AV - E / 2);
    const capot = K.groupe(anneau, face);
    const vitre = K.mesh(K.boite(FW + 1, FH + 1, 1, 0.3), M.transparent, 0, FY, Z_AV - 1.2);
    vitre.userData.voile = true;
    const griffe = K.mesh(K.boite(16, 6, 5, 1), M.plastiqueSombre, 0, -H / 2 + 1, 2.5);
    const fente = K.mesh(K.boite(16, 20, 0.5, 0.2), M.sombre, 0, 38, Z_AV + 0.05);
    racine.add(rail, socle, capot, vitre, griffe, fente);

    /* ---- les bornes (arrivée en haut, départ en bas) et les marquages */
    const bornes = new T.Group(), marquages = new T.Group();
    const REP = [['1/L1', '3/L2', '5/L3'], ['2/T1', '4/T2', '6/T3']];
    XP.forEach((x, i) => [1, -1].forEach((s, k) => {
      const creux = K.mesh(K.cylindre(3.6, 1.2, 24), M.sombre, x, s * 52, Z_AV - 0.4); creux.rotation.x = Math.PI / 2;
      const vis = K.vis(2.6); vis.rotation.x = Math.PI / 2; vis.position.set(x, s * 52, Z_AV - 0.9);
      const cage = K.mesh(K.boite(11, 11, 14, 1), M.zingue, x, s * 49, 58);
      const entree = K.mesh(K.boite(7, 1.6, 7, 0.4), M.sombre, x, s * (H / 2 - 0.55), 58);
      bornes.add(creux, vis, cage, entree);
      const g = K.gravure(REP[k][i], 3.2, { couleur: '#2b3138' });
      g.position.set(x, s * 43.5, Z_AV + 0.08); marquages.add(g);
    }));
    const gI = K.gravure('I', 3.8, { couleur: '#1e7e54' }); gI.position.set(-17, 44, Z_AV + 0.08);
    const gO = K.gravure('O', 3.8, { couleur: '#c0392b' }); gO.position.set(-17, 30, Z_AV + 0.08);
    const gCal = K.gravure('63 A', 3, { couleur: '#2b3138' }); gCal.position.set(28, 37, Z_AV + 0.08);
    marquages.add(gI, gO, gCal);
    racine.add(bornes, marquages);

    /* ---- les pièces fixes : pinces (deux joues de cuivre autour de la lame) et bandes de raccord */
    const matPince = K.propre(M.cuivre), matPastille = K.propre(M.argent);
    const pinces = new T.Group(), bandes = new T.Group();
    XP.forEach(x => {
      [-1, 1].forEach(s => pinces.add(K.mesh(K.boite(8, 14, 2.2, 0.5), matPince, x, Y_PINCE, Z_ARBRE + s * 2.6)));
      pinces.add(K.mesh(K.boite(8, 5, 8.6, 0.8), matPince, x, Y_PINCE - 9.5, Z_ARBRE));
      bandes.add(K.mesh(K.boite(8, 14, 2.2, 0.5), M.cuivre, x, 43, Z_ARBRE));
      bandes.add(K.mesh(K.boite(8, 17, 2.2, 0.5), M.cuivre, x, -42.5, Z_ARBRE));
    });
    racine.add(pinces, bandes);

    /* ---- l'arbre (isolant, carré : on le voit tourner) et les trois lames qui en descendent */
    const arbre = K.mesh(K.boite(84, 9, 9, 1.2), M.plastiqueMarine, 0, Y_ARBRE, Z_ARBRE);
    const lames = new T.Group(), lamesListe = [];
    XP.forEach(x => {
      const l = new T.Group(); l.position.set(x, Y_ARBRE, Z_ARBRE);
      l.add(K.mesh(K.boite(10, 11, 9, 1.2), M.cuivre, 0, 0, 0));                              /* le palier de la charnière */
      l.add(K.mesh(K.boite(8, LONG_LAME, 3, 0.5), M.cuivre, 0, -LONG_LAME / 2, 0));           /* la lame */
      l.add(K.mesh(K.boite(7.4, 14, 3.6, 0.5), matPastille, 0, -LONG_LAME + 7, 0));           /* le bout d'argent */
      lames.add(l); lamesListe.push(l);
    });
    racine.add(arbre, lames);

    /* ---- la manette : un moyeu sur l'arbre, un bras plat percé d'un trou, une poignée */
    const manette = new T.Group();
    manette.position.set(0, Y_ARBRE, Z_ARBRE);
    manette.add(K.mesh(K.boite(14, 14, 12, 2), M.plastiqueNoir, 0, 0, 0));
    manette.add(K.mesh(K.boite(12, 12, 50, 2), M.plastiqueNoir, 0, 0, 27));
    manette.add(K.mesh(K.boite(12, 14, 18, 3), M.plastiqueNoir, 0, 0, 48));
    const trouM = K.mesh(K.cylindre(3.3, 12.4, 16), M.sombre, 0, 0, Z_TROU); trouM.rotation.z = Math.PI / 2;
    manette.add(trouM);
    racine.add(manette);

    /* ---- l'oreille fixe du boîtier : son trou tombe en face de celui de la manette ouverte */
    const yTrou = Y_ARBRE - Z_TROU * Math.sin(PHI_OUVERT + THETA_FERME), zTrou = Z_ARBRE + Z_TROU * Math.cos(PHI_OUVERT + THETA_FERME);
    const oreille = new T.Group();
    oreille.add(K.mesh(K.boite(3, 24, 28, 0.8), M.plastique, X_OREILLE, yTrou + 0.5, zTrou - 2.3));
    const trouO = K.mesh(K.cylindre(3.3, 3.4, 16), M.sombre, X_OREILLE, yTrou, zTrou); trouO.rotation.z = Math.PI / 2;
    oreille.add(trouO);
    racine.add(oreille);

    /* ---- le cadenas : il entre le long de X, l'anse dans les deux trous */
    const cad = K.cadenas(23);
    cad.position.set(1.5, yTrou, zTrou); cad.visible = false;
    racine.add(cad);

    /* ---- les fils venus du dehors */
    const fils = new T.Group(), filsH = [], filsB = [];
    XP.forEach((x, i) => {
      const h = K.fil([[x, 86, 22], [x, 80, 44], [x, 70, 56], [x, 62, 58], [x, 50, 58]], 2.0, COUL[i]);
      const b = K.fil([[x, -50, 58], [x, -62, 58], [x, -70, 56], [x, -80, 44], [x, -86, 22]], 2.0, COUL[i]);
      fils.add(h.mesh, b.mesh); filsH.push(h); filsB.push(b);
    });
    racine.add(fils);

    /* ---- le courant : seulement lames dans les pinces, et machine en marche */
    const ZG = Z_ARBRE + 1.6;                              /* sur la face avant des bandes : les grains se voient */
    const grains = XP.map((x, i) => {
      const c = K.courant(K.chemin([filsH[i].courbe, [x, 50, ZG], [x, 36, ZG], [x, -28, ZG], [x, -34, ZG], [x, -50, ZG], filsB[i].courbe]),
        { pas: 7, rayon: 1.1, vitesse: 38 });
      c.regler({ debit: 1, alternatif: true, frequence: 0.7 });
      racine.add(c.objet); return c;
    });

    /* ---- l'arc : entre la pince et le bout de la lame, qui s'étire avec elle */
    const arcs = XP.map(() => {
      const a = K.arc(new T.Vector3(0, 0, 0), new T.Vector3(0, 8, 0), { rayon: 0.5, halo: 0.3 });
      racine.add(a.objet); return a;
    });
    const poserArc = (a, A, B) => {
      const d = B.clone().sub(A), L = d.length() || 0.01, s = Math.max(1, L / 14);
      a.objet.position.copy(A); a.objet.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.divideScalar(L));
      a.objet.scale.set(s, L / 8, s);
    };

    /* ---- l'état et le mouvement */
    const phi = K.mobile(0, 110, 21);                      /* la main : ni ressort, ni claquement */
    const ins = K.mobile(0, 70, 17);                       /* le cadenas qui entre (0 à 1) */
    let charge = true, cadenasVoulu = false, fermeVoulu = false, arcInstalle = false, contact = true, eclatee = false, etat = 'ferme';

    const placer = () => {
      const p = eclatee ? 0 : phi.x;                      /* éclaté : les pièces se montrent fermées, rangées */
      lamesListe.forEach(l => { l.rotation.x = p; });
      arbre.rotation.x = p;
      manette.rotation.x = THETA_FERME + p;
      cad.position.x = 1.5 + 36 * (1 - ins.x); cad.visible = ins.x > 0.01 && !eclatee;
      const touche = phi.x < 0.02;
      if (touche !== contact) {
        contact = touche;
        if (!contact && charge && !eclatee) arcInstalle = true;      /* ouvert en charge : l'arc s'installe */
        if (contact) arcInstalle = false;
        majEtat(false);
      }
      const arcOn = arcInstalle && !contact && !eclatee;
      arcs.forEach((a, i) => {
        a.regler(arcOn);
        if (arcOn) poserArc(a, new T.Vector3(XP[i], Y_PINCE + 4, ZG), new T.Vector3(0, -(LONG_LAME - 5), 1.6).applyAxisAngle(AXE_X, phi.x).add(lamesListe[i].position));
      });
      const chaud = arcOn ? 1.0 : 0;
      K.chaleur(matPince, chaud); K.chaleur(matPastille, chaud);
    };

    const phrase = () => {
      if (arcInstalle && !contact) return '<strong>⚠ Ouvert en charge : à ne jamais faire.</strong> Il n’a ni ressort ni chambre de coupure : l’arc s’installe entre la lame et la pince, et il ne s’éteint pas. Les pièces chauffent, le métal fond.';
      if (etat === 'cadenasse') return '<strong>Ouvert et cadenassé.</strong> L’anse du cadenas passe dans le trou de la manette et dans celui de l’oreille fixe : personne ne peut refermer. La clé reste dans votre poche.';
      if (!contact) return '<strong>Ouvert.</strong> Les trois lames sont loin des pinces : un écart d’air franc, garanti par le constructeur. On le voit par la fenêtre.' + (charge ? '' : ' Le courant avait été coupé ailleurs avant : c’est la bonne façon.');
      return charge ? '<strong>Fermé.</strong> Les trois lames sont dans leurs pinces : le courant passe vers la machine. La manette est sur I.'
        : '<strong>Fermé, machine arrêtée.</strong> On a coupé le courant ailleurs : rien ne passe. Le sectionneur est encore fermé : on peut maintenant l’ouvrir.';
    };
    let derniereMesure = '';
    const majEtat = (dire) => {
      const ouvert = !contact, toutOuvert = phi.x > PHI_OUVERT * 0.95;
      grains.forEach(g => g.regler({ debit: contact && charge && !eclatee ? 1 : 0 }));
      const mesures = [
        { libelle: 'Les trois lames', valeur: contact ? 'dans leurs pinces' : toutOuvert ? 'écartées' : 'en route' },
        { libelle: 'Courant vers la machine', valeur: contact && charge ? '6,5 A' : arcInstalle && ouvert ? 'passe dans l’arc' : '0 A' },
        { libelle: 'Écart d’air', valeur: contact ? '0 mm' : toutOuvert ? '40 mm, garantis' : Math.round(2 * LONG_LAME * Math.sin(phi.x / 2)) + ' mm' }
      ];
      const cle = JSON.stringify(mesures);
      if (cle !== derniereMesure) { derniereMesure = cle; ctx.mesures(mesures); }
      if (dire) ctx.dire(phrase());
    };

    const agir = (id, v) => {
      /* « focus » : le rail pâlit pendant la leçon ; une commande le rétablit */
      if (id === 'focus') { focusRail(v === 'meca'); return; }
      if (id !== 'phase') focusRail(false);
      if (id === 'phase') {
        /* le mouvement découpé pour la leçon : on coupe ailleurs, on ouvre, on cadenasse */
        if (v === 'service') { charge = true; cadenasVoulu = false; fermeVoulu = true; etat = 'ferme'; ins.cible = 0; }
        if (v === 'arret') { charge = false; arcInstalle = false; }
        if (v === 'mi') { charge = false; cadenasVoulu = false; ins.cible = 0; phi.cible = PHI_OUVERT / 2; etat = 'ouvert'; }
        if (v === 'ouvert') { charge = false; cadenasVoulu = false; ins.cible = 0; phi.cible = PHI_OUVERT; etat = 'ouvert'; }
        if (v === 'cadenas') { charge = false; arcInstalle = false; phi.cible = PHI_OUVERT; cadenasVoulu = true; etat = 'cadenasse'; }
        if (v === 'erreur') {
          /* on rejoue l'erreur : cadenas retiré, lames refermées, machine en marche… puis on ouvre */
          ins.x = ins.v = ins.cible = 0; phi.x = phi.v = 0; contact = true; arcInstalle = false;
          charge = true; cadenasVoulu = false; etat = 'ouvert'; phi.cible = PHI_OUVERT;
        }
        if (v === 'service') phi.cible = 0;
        ctx.regler('position', etat); ctx.regler('circuit', charge ? 'charge' : 'hors');
        placer(); majEtat(false); return;
      }
      if (id === 'position') {
        etat = v;
        if (v === 'ferme') { cadenasVoulu = false; ins.cible = 0; fermeVoulu = true; }
        if (v === 'ouvert') { cadenasVoulu = false; ins.cible = 0; phi.cible = PHI_OUVERT; }
        if (v === 'cadenasse') { phi.cible = PHI_OUVERT; cadenasVoulu = true; charge = false; arcInstalle = false; ctx.regler('circuit', 'hors'); }
      }
      if (id === 'circuit') {
        charge = v === 'charge';
        if (!charge) arcInstalle = false;               /* on a coupé ailleurs : l'arc s'éteint */
      }
      majEtat(true);
    };

    placer(); majEtat(false);
    const focusRail = eclaircir([rail, griffe]);

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -26, elevation: 12, cadre: [socle, capot], marge: 1.12 }
                                    : { azimut: -52, elevation: 12, cadre: [socle, capot], marge: 1.12 },
      fond: 'platine',
      fantome: [socle, capot],
      phrase: phrase(),
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [socle, capot, griffe, fente, marquages], desc: 'Il tient les pièces à distance. « Voir dedans » le rend transparent. Il porte le courant qu’il laisse passer : 63 A.' },
        { id: 'fenetre', nom: 'La fenêtre', objets: [vitre], desc: 'La coupure visible : on voit les lames séparées des pinces. Une poignée sur zéro ne prouve rien — ce qu’on voit, on peut le croire.' },
        { id: 'manette', nom: 'La manette (I – O)', objets: [manette], desc: 'Elle tourne l’arbre à la main, à la vitesse de la main : il n’y a pas de ressort. Elle porte un trou pour le cadenas.' },
        { id: 'arbre', nom: 'L’arbre isolant', objets: [arbre], desc: 'Il relie la manette aux trois lames : elles s’ouvrent toutes ensemble.' },
        { id: 'lames', nom: 'Les trois lames', objets: [lames], desc: 'Une lame de cuivre par phase, avec un bout d’argent. Elles pivotent sur l’arbre.' },
        { id: 'pinces', nom: 'Les pinces', objets: [pinces], desc: 'Fixes. Fermé, elles serrent le bout de la lame. Ouvert, elles restent loin d’elle : c’est l’écart garanti.' },
        { id: 'cadenas', nom: 'Le cadenas et l’oreille', objets: [cad, oreille], ancre: [X_OREILLE, yTrou, zTrou], desc: 'La condamnation. Ouvert, le trou de la manette tombe en face du trou de l’oreille : l’anse passe dans les deux. La clé reste dans votre poche.' },
        { id: 'arc', nom: 'L’arc électrique', objets: arcs.map(a => a.objet), ancre: [0, Y_PINCE + 4, ZG], desc: 'Il n’apparaît que si on ouvre en charge. Ici, rien pour l’éteindre : il s’installe, brûle le métal et peut sauter au visage.' },
        { id: 'bornes', nom: 'Les bornes', objets: [bornes, bandes], desc: 'L’arrivée en haut (1, 3, 5), le départ en bas (2, 4, 6). Le conducteur de protection n’est jamais coupé.' },
        { id: 'fils', nom: 'Les trois phases', objets: [fils], desc: 'Marron, noir, gris : L1, L2, L3. On sépare tous les conducteurs actifs.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'Le sectionneur s’y clipse.' }
      ],
      commandes: [
        { id: 'position', type: 'choix', options: [['ferme', 'Fermé'], ['ouvert', 'Ouvert'], ['cadenasse', 'Ouvert et cadenassé']], valeur: 'ferme' },
        { id: 'circuit', type: 'choix', titre: 'Le courant dans la machine', options: [['charge', 'En charge'], ['hors', 'Hors charge']], valeur: 'charge' }
      ],
      etapes: [
        { titre: 'Fermé : la machine tourne', piece: 'lames', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'service']],
          vue: { azimut: -46, elevation: 12, zoom: 1.1, cible: [0, 0, 44] },
          texte: 'Les trois lames sont dans leurs pinces : le courant passe vers la machine. Les grains dorés le montrent. La manette est sur I.' },
        { titre: 'On coupe d’abord ailleurs', piece: 'lames', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'arret']],
          vue: { azimut: -46, elevation: 12, zoom: 1.1, cible: [0, 0, 44] },
          texte: 'Avec la commande de la machine, on arrête le courant : les grains s’arrêtent. Le sectionneur est encore fermé, mais plus rien ne passe : on peut l’ouvrir sans danger.' },
        { titre: 'On abaisse la manette : les trois lames se détachent ensemble', piece: 'manette', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'mi']],
          vue: { azimut: -64, elevation: 14, zoom: 1.25, cible: [0, 2, 50] }, duree: 7,
          texte: 'La manette fait tourner l’arbre, et l’arbre emporte les trois lames d’un même mouvement. Il n’y a pas de ressort : les lames vont aussi lentement que votre main.' },
        { titre: 'Ouvert : un écart d’air franc', piece: 'fenetre', voirDedans: false, actions: [['focus', 'meca'], ['phase', 'ouvert']],
          vue: { azimut: -24, elevation: 10, zoom: 1.15, cible: [0, -2, 60] },
          texte: 'Les lames sont loin des pinces : environ 40 mm d’air, calculés et garantis par le constructeur. On le voit à travers la fenêtre : c’est la coupure visible.' },
        { titre: 'On pose le cadenas : personne ne peut refermer', piece: 'cadenas', voirDedans: false, actions: [['focus', 'meca'], ['phase', 'cadenas']],
          vue: { azimut: -36, elevation: 10, zoom: 1.45, cible: [4, 16, 80] },
          texte: 'Le trou de la manette est en face du trou de l’oreille. L’anse du cadenas passe dans les deux : la manette ne peut plus bouger. On garde la clé.' },
        { titre: 'À ne jamais faire : ouvrir en charge', piece: 'arc', voirDedans: true, ralenti: true, actions: [['focus', 'meca'], ['phase', 'erreur']],
          vue: { azimut: -58, elevation: 12, zoom: 1.25, cible: [0, -4, 50] }, duree: 8,
          texte: 'Si on l’ouvre pendant que le courant passe : pas de ressort, pas de chambre de coupure. L’arc s’installe entre la lame et la pince et ne s’éteint pas. Il chauffe et fond le métal.' }
      ],
      /* l'éclaté, le long du sens de montage (vers l'avant) : la manette sort, puis la face avant,
         puis l'arbre et ses trois lames ; les pinces et les bornes restent sur le socle */
      eclate: [
        { objets: [manette], vers: [0, 0, 190], debut: 0, fin: 0.5 },
        { objets: [capot, vitre, fente, marquages, oreille], vers: [0, 0, 140], debut: 0.15, fin: 0.65 },
        { objets: [lames, arbre], vers: [0, 0, 72], debut: 0.35, fin: 0.85 },
        { objets: [pinces, bandes, bornes, fils], vers: [0, 0, 20], debut: 0.55, fin: 1 }
      ],
      eclateVue: { azimut: -50, elevation: 18, zoom: 0.72, cible: [0, 0, 110] },
      surEclate(on) { eclatee = on; placer(); majEtat(false); },
      agir,
      animer(dt) {
        const bougeP = phi.pas(dt);
        /* on ne ferme qu'une fois le cadenas ressorti ; on ne cadenasse qu'une fois ouvert */
        if (fermeVoulu && ins.x < 0.02) { phi.cible = 0; fermeVoulu = false; }
        if (cadenasVoulu && phi.x > PHI_OUVERT * 0.96) ins.cible = 1;
        const bougeI = ins.pas(dt);
        placer();
        let actif = bougeP || bougeI || fermeVoulu || (cadenasVoulu && ins.x < 0.99);
        if (!eclatee) {
          grains.forEach(g => { if (g.animer(dt)) actif = true; });
          arcs.forEach(a => { if (a.animer(dt)) actif = true; });
        }
        if (bougeP || bougeI) majEtat(false);
        return actif;
      }
    };
  }, { famille: 'separation', titre: 'Le sectionneur', stations: ['3.2'] });

  /* ================================================================== 3.3 L'INTERRUPTEUR-SECTIONNEUR
     Rotatif, tripolaire. Il CUMULE les deux métiers : un ressort d'accumulation (ouverture brusque)
     et des plaques de coupure qui découpent l'arc — donc il coupe en charge — puis un grand écart
     d'air garanti et un trou de cadenas — donc il isole. Trois étages, un par phase, sur un
     même arbre ; chaque pont coupe en deux endroits. */
  Electro3D.definir('interSectionneur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const W = 64, H = 72, Z_TETE = 55, Z_AV = 72, E = 2.4;
    const ZC = [46, 28, 10.5], COUL = ['L1', 'L2', 'L3'];             /* L1 devant, L3 derrière */
    const REPG = ['1/L1', '3/L2', '5/L3'], REPD = ['2/T1', '4/T2', '6/T3'];
    const OUVERT = 90 * D2R, ARC_ANGLE = 28 * D2R, TRIP = 45 * D2R, TENDU = 40 * D2R;
    const XB = 19.5;                                                  /* centre des contacts fixes */

    /* ---- le boîtier : un bloc creux, trois étages séparés par des cloisons, une tête */
    const socle = coque(T, K, M.plastique, W, H, 0, Z_TETE, E, 3, 'arriere');
    [18.7, 37].forEach(z => socle.add(K.mesh(K.boite(W - 2 * E + 0.4, H - 2 * E + 0.4, 1.6, 0.4), M.plastique, 0, 0, z)));
    const capot = coque(T, K, M.plastique, W, H, Z_TETE, Z_AV, E, 3, 'avant');
    const pattes = new T.Group();
    [1, -1].forEach(s => {
      pattes.add(K.mesh(K.boite(22, 6, 3, 1), M.plastiqueSombre, 0, s * (H / 2 + 3), 1.5));
      const t = K.mesh(K.cylindre(2, 3.4, 16), M.sombre, 0, s * (H / 2 + 3), 1.5); t.rotation.x = Math.PI / 2; pattes.add(t);
    });
    racine.add(socle, capot, pattes);

    /* ---- les marquages : sur la face avant, et les repères de bornes sur les flancs */
    const marquages = new T.Group();
    const gI = K.gravure('I', 4, { couleur: '#1e7e54' }); gI.position.set(24, 11, Z_AV + 0.08);
    const g0 = K.gravure('0', 4, { couleur: '#c0392b' }); g0.position.set(-11, -24, Z_AV + 0.08);
    const gCal = K.gravure('32 A', 3, { couleur: '#2b3138' }); gCal.position.set(-19, 27, Z_AV + 0.08);
    marquages.add(gI, g0, gCal);
    ZC.forEach((z, k) => {
      const a = K.gravure(REPG[k], 2.8, { couleur: '#2b3138' }); a.rotation.y = -Math.PI / 2; a.position.set(-W / 2 - 0.08, 9.5, z);
      const b = K.gravure(REPD[k], 2.8, { couleur: '#2b3138' }); b.rotation.y = Math.PI / 2; b.position.set(W / 2 + 0.08, 9.5, z);
      marquages.add(a, b);
    });
    racine.add(marquages);

    /* ---- les bornes sur les flancs (arrivée à gauche, départ à droite) et leurs fils */
    const bornes = new T.Group(), fils = new T.Group(), filsG = [], filsD = [];
    ZC.forEach((z, k) => [-1, 1].forEach(s => {
      bornes.add(K.mesh(K.boite(4, 14, 10, 0.8), M.zingue, s * (W / 2 + 2), 0, z));
      const v = K.vis(2.6); v.position.set(s * (W / 2 + 2), 7, z); bornes.add(v);
    }));
    ZC.forEach((z, k) => {
      const xe = W / 2 + 4;
      const g = K.fil([[-xe - 30, -12, z - 24], [-xe - 24, -4, z - 8], [-xe - 12, 0, z], [-xe, 0, z]], 1.8, COUL[k]);
      const d = K.fil([[xe, 0, z], [xe + 12, 0, z], [xe + 24, -4, z - 8], [xe + 30, -12, z - 24]], 1.8, COUL[k]);
      fils.add(g.mesh, d.mesh); filsG.push(g); filsD.push(d);
    });
    racine.add(bornes, fils);

    /* ---- les pièces fixes : un bloc de cuivre de chaque côté, sa bande jusqu'au flanc, et trois
       plaques d'acier (la chambre de coupure) du côté où l'arc sera chassé */
    const fixes = new T.Group(), chambres = new T.Group();
    ZC.forEach(z => [1, -1].forEach(s => {
      fixes.add(K.mesh(K.boite(9, 10, 6, 0.8), M.cuivre, s * XB, 0, z));
      fixes.add(K.mesh(K.boite(6.4, 8, 3, 0.4), M.cuivre, s * 27.2, 0, z));
      for (let j = 0; j < 3; j++) chambres.add(K.mesh(K.boite(8, 1.0, 8, 0.2), M.acier, s * 20, -s * (3 + 2.5 * j), z));
    }));
    racine.add(fixes, chambres);

    /* ---- le rotor : un arbre carré, trois ponts (un par étage), une came pour le ressort */
    const rotor = new T.Group();
    const arbre = new T.Group(), ponts = new T.Group();
    arbre.add(K.mesh(K.boite(8, 8, 55.5, 1), M.plastiqueMarine, 0, 0, 31.75));
    const moyeuC = K.mesh(K.cylindre(7, 3, 24), M.plastiqueMarine, 0, 0, 58); moyeuC.rotation.x = Math.PI / 2;
    arbre.add(moyeuC, K.mesh(K.boite(24, 6, 3, 0.8), M.plastiqueMarine, 8, 0, 58));          /* la came : un bras, le ressort s'y accroche */
    const pinB = K.mesh(K.cylindre(1.8, 4, 12), M.acierSombre, 19, 0, 61.5); pinB.rotation.x = Math.PI / 2;
    arbre.add(pinB);
    ZC.forEach(z => {
      const p = new T.Group();
      const sup = K.mesh(K.cylindre(9, 5, 24), M.plastiqueMarine, 0, 0, z); sup.rotation.x = Math.PI / 2;
      p.add(sup, K.mesh(K.boite(30, 6, 4, 0.6), M.cuivre, 0, 0, z));
      [1, -1].forEach(s => p.add(K.mesh(K.boite(6, 7, 4.4, 0.5), M.argent, s * 12, 0, z)));
      ponts.add(p);
    });
    rotor.add(arbre, ponts);
    racine.add(rotor);

    /* ---- la poignée : un disque derrière la face, un bouton, un bras percé d'un trou de cadenas */
    const poignee = new T.Group();
    poignee.position.set(0, 0, Z_AV);
    const disque = K.mesh(K.cylindre(7, 3, 24), M.plastiqueNoir, 0, 0, -6); disque.rotation.x = Math.PI / 2;
    const brasInt = K.mesh(K.boite(32, 6, 3, 0.8), M.plastiqueNoir, 13, 0, -6);              /* le bras intérieur : le ressort s'y accroche */
    const tige = K.mesh(K.cylindre(5, 8, 20), M.acierSombre, 0, 0, -2); tige.rotation.x = Math.PI / 2;
    const bouton = K.mesh(K.cylindre(15, 6, 36), M.plastiqueNoir, 0, 0, 3); bouton.rotation.x = Math.PI / 2;
    const bras = K.mesh(K.boite(30, 12, 10, 2.5), M.plastiqueNoir, 15, 0, 9);
    const trouB = K.mesh(K.cylindre(3, 12.4, 16), M.sombre, 24, 0, 9);
    const pinA = K.mesh(K.cylindre(1.8, 4, 12), M.acierSombre, 27, 0, -9.5); pinA.rotation.x = Math.PI / 2;
    poignee.add(disque, brasInt, tige, bouton, bras, trouB, pinA);
    racine.add(poignee);

    /* ---- le ressort d'accumulation : de la goupille de la poignée à celle de la came */
    const ressort = K.ressort(2.2, 12, 5, 0.45, M.acier);
    racine.add(ressort);

    /* ---- l'oreille fixe et le cadenas (la poignée pointe vers le bas à l'ouverture) */
    const oreille = K.mesh(K.boite(3, 18, 18, 0.8), M.plastiqueSombre, 12, -24, Z_AV + 9);
    const trouO = K.mesh(K.cylindre(3, 3.4, 16), M.sombre, 12, -24, Z_AV + 9); trouO.rotation.z = Math.PI / 2;
    const oreilleG = K.groupe(oreille, trouO);
    const cad = K.cadenas(25);
    cad.position.set(3.75, -24, Z_AV + 9); cad.visible = false;
    racine.add(oreilleG, cad);

    /* ---- le courant : seulement ponts fermés et machine en marche */
    const grains = ZC.map((z, k) => {
      const zg = z + 2.6;
      const c = K.courant(K.chemin([filsG[k].courbe, [-W / 2 - 2, 0, zg], [-27, 0, zg], [-15, 0, zg], [15, 0, zg], [27, 0, zg], [W / 2 + 2, 0, zg], filsD[k].courbe]),
        { pas: 7, rayon: 1.1, vitesse: 38 });
      c.regler({ debit: 1, alternatif: true, frequence: 0.7 });
      racine.add(c.objet); return c;
    });

    /* ---- les arcs : quatre petits arcs par contact, en série le long des plaques */
    const arcs = ZC.map(() => [0, 1].map(() => [0, 1, 2, 3].map(() => {
      const a = K.arc(new T.Vector3(0, 0, 0), new T.Vector3(0, 8, 0), { rayon: 0.8, halo: 0.9 });
      racine.add(a.objet); return a;
    })));
    const arcsPlat = arcs.flat(2);
    const poserArc = (a, A, B) => {
      const d = B.clone().sub(A), L = d.length() || 0.01;
      a.objet.position.copy(A); a.objet.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.divideScalar(L));
      a.objet.scale.set(1, L / 8, 1);
    };
    /* la chaîne d'un arc côté droit : le contact, les plaques que le bout du pont a dépassées, le bout */
    const chaine = th => {
      const tip = [15 * Math.cos(th), -15 * Math.sin(th)], pts = [[15.2, -0.5]];
      for (let j = 0; j < 3; j++) { const p = [16.3, -3 - 2.5 * j]; if (p[1] > tip[1] + 0.6) pts.push(p); }
      const dernier = pts[pts.length - 1];
      if (Math.hypot(dernier[0] - tip[0], dernier[1] - tip[1]) < 9) pts.push(tip);
      return pts;
    };

    /* ---- l'état et le mouvement */
    const mMain = K.mobile(0, 140, 22);                  /* la main sur la poignée */
    const mRotor = K.mobile(0, 900, 34);                 /* l'arbre : il claque quand le ressort lâche */
    const ins = K.mobile(0, 70, 17);                     /* le cadenas qui entre */
    let etat = 'ferme', charge = true, cadenasVoulu = false, mainEnAttente = null, tArc = 0, contact = true, eclatee = false, derniereMesure = '';
    const MAIN = { ferme: 0, arc: 50 * D2R, ouvert: OUVERT, cadenasse: OUVERT };

    const placer = () => {
      poignee.rotation.z = -mMain.x;
      rotor.rotation.z = -mRotor.x;
      cad.position.x = 3.75 + 36 * (1 - ins.x); cad.visible = ins.x > 0.01 && !eclatee;
      /* le ressort : goupille de la poignée → goupille de la came (il est tendu entre les deux) */
      const A = new T.Vector3(27 * Math.cos(mMain.x), -27 * Math.sin(mMain.x), 62);
      const B = new T.Vector3(19 * Math.cos(mRotor.x), -19 * Math.sin(mRotor.x), 62);
      K.ressortEntre(ressort, B, A);
      const touche = mRotor.x < 0.052;
      if (touche !== contact) {
        contact = touche;
        if (!contact && charge && etat !== 'arc' && !eclatee) tArc = 0.32;
        majEtat(false);
      }
      const arcOn = !contact && charge && !eclatee && (etat === 'arc' || tArc > 0);
      arcsPlat.forEach(a => a.regler(false));
      if (arcOn) {
        const pts = chaine(mRotor.x);
        ZC.forEach((z, k) => [1, -1].forEach((s, c) => {
          for (let i = 0; i + 1 < pts.length; i++) {
            const a = arcs[k][c][i];
            a.regler(true);
            poserArc(a, new T.Vector3(s * pts[i][0], s * pts[i][1], z), new T.Vector3(s * pts[i + 1][0], s * pts[i + 1][1], z));
          }
        }));
      }
    };

    const phrase = () => {
      if (etat === 'cadenasse') return '<strong>Ouvert (0) et cadenassé.</strong> L’anse du cadenas passe dans le trou du bras de la poignée et dans celui de l’oreille fixe : personne ne peut remettre sous tension. Il a coupé en charge ET il isole : c’est le cumul.';
      if (etat === 'arc') return '<strong>À l’instant de l’ouverture.</strong> Le ressort vient de se détendre : les ponts se sont écartés d’un coup. Chaque arc est découpé par les plaques de la chambre : plusieurs petits arcs au lieu d’un grand, qui s’éteignent vite.';
      if (!contact) return '<strong>Ouvert (0).</strong> Les arcs sont éteints. Chaque pont coupe en deux endroits, avec un grand écart d’air garanti : l’appareil isole.';
      return charge ? '<strong>Fermé (I).</strong> Les trois ponts touchent leurs contacts fixes : le courant passe vers la machine. Le ressort est au repos.'
        : '<strong>Fermé (I), machine arrêtée.</strong> Aucun courant ne passe. On peut l’ouvrir : même en marche, il saurait couper.';
    };
    const majEtat = (dire) => {
      grains.forEach(g => g.regler({ debit: contact && charge && !eclatee ? 1 : 0 }));
      const ouvert = !contact, tout = mRotor.x > OUVERT * 0.95;
      const mesures = [
        { libelle: 'Courant vers la machine', valeur: contact && charge ? '12 A' : ouvert && charge && (etat === 'arc' || tArc > 0) ? 'dans les arcs' : '0 A' },
        { libelle: 'Les trois pôles', valeur: contact ? 'fermés' : tout ? 'ouverts' : 'en train de s’ouvrir' },
        { libelle: 'Écart d’air par pôle', valeur: contact ? '0 mm' : tout ? '2 × 21 mm, garantis' : 'se creuse' }
      ];
      const cle = JSON.stringify(mesures);
      if (cle !== derniereMesure) { derniereMesure = cle; ctx.mesures(mesures); }
      if (dire) ctx.dire(phrase());
    };

    /* va vers un état : la main tourne la poignée ; si le cadenas est en place, il sort d'abord */
    const aller = (v, mainVers) => {
      if (v === etat && mainVers === undefined) return;
      const avant = etat; etat = v;
      const cible = mainVers !== undefined ? mainVers : MAIN[v];
      if (avant === 'arc' && (v === 'ouvert' || v === 'cadenasse') && charge && !eclatee) tArc = 0.32;
      cadenasVoulu = v === 'cadenasse';
      if (v !== 'cadenasse' && ins.cible > 0) { ins.cible = 0; mainEnAttente = cible; }
      else { mMain.cible = cible; mainEnAttente = null; }
      majEtat(false);
    };

    const agir = (id, v) => {
      /* « focus » : le bouton, le bras de la poignée et l'oreille pâlissent, pour voir le ressort derrière eux */
      if (id === 'focus') { focusPoignee(v === 'ressort'); return; }
      if (id !== 'phase') focusPoignee(false);
      if (id === 'phase') {
        /* le mouvement découpé pour la leçon : la poignée AVANT le ressort, le ressort AVANT l'arc */
        if (v === 'service') { charge = true; aller('ferme'); }
        if (v === 'tourne') { charge = true; aller('ferme', TENDU); }
        if (v === 'claque') { charge = true; aller('arc'); }
        if (v === 'ouvert') { charge = true; aller('ouvert'); }
        if (v === 'cadenas') { charge = false; aller('cadenasse'); }
        ctx.regler('position', etat === 'arc' ? null : etat); ctx.regler('circuit', charge ? 'charge' : 'hors');
        placer(); majEtat(false); return;
      }
      if (id === 'position') {
        if (v === 'cadenasse') { charge = false; ctx.regler('circuit', 'hors'); }
        aller(v);
      }
      if (id === 'circuit') charge = v === 'charge';
      majEtat(true);
    };

    placer(); majEtat(false);
    const focusPoignee = eclaircir([bouton, bras, tige, trouB, oreilleG]);

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -26, elevation: 14, cadre: [socle, capot], marge: 1.15 }
                                    : { azimut: -36, elevation: 16, cadre: [socle, capot], marge: 1.15 },
      fond: 'platine',
      fantome: [socle, capot],
      phrase: phrase(),
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [socle, capot, pattes, marquages], desc: 'Trois étages séparés par des cloisons : un par phase. Dessus, la tête avec la poignée. « Voir dedans » le rend transparent.' },
        { id: 'poignee', nom: 'La poignée (0 – I)', objets: [poignee], desc: 'Un quart de tour : I est fermé, 0 est ouvert. Noire : le rouge sur jaune est réservé à l’arrêt d’urgence. Son bras est percé d’un trou pour le cadenas.' },
        { id: 'ressort', nom: 'Le ressort d’ouverture brusque', objets: [ressort], desc: 'La poignée le tend, l’arbre reste en place ; au milieu du mouvement il lâche d’un coup et fait claquer l’arbre. Peu importe la lenteur de la main.' },
        { id: 'arbre', nom: 'L’arbre et son petit bras', objets: [arbre], desc: 'Un arbre carré qui traverse les trois étages et porte les ponts. En haut, un petit bras : c’est là que le ressort s’accroche.' },
        { id: 'ponts', nom: 'Les ponts de contact', objets: [ponts], desc: 'Un pont de cuivre par phase, avec une pastille d’argent à chaque bout : il coupe en deux endroits.' },
        { id: 'fixes', nom: 'Les contacts fixes', objets: [fixes], desc: 'Deux blocs de cuivre par phase, reliés aux bornes de chaque flanc. Fermé, les bouts du pont les touchent.' },
        { id: 'chambre', nom: 'Les chambres de coupure', objets: [chambres], desc: 'Des plaques d’acier empilées. L’arc y est attiré, découpé en petits arcs, refroidi : c’est ce qui permet d’ouvrir en marche.' },
        { id: 'arc', nom: 'Les arcs électriques', objets: arcsPlat.map(a => a.objet), ancre: [16, -3, ZC[1]], desc: 'À l’ouverture sous charge, un arc se forme à chaque bout de chaque pont. Les plaques le coupent en tranches : il s’éteint en un instant.' },
        { id: 'cadenas', nom: 'Le cadenas et l’oreille', objets: [cad, oreilleG], ancre: [12, -24, Z_AV + 9], desc: 'La condamnation. En position 0, le trou du bras tombe en face de celui de l’oreille : l’anse passe dans les deux. La clé reste dans votre poche.' },
        { id: 'bornes', nom: 'Les bornes', objets: [bornes, fils], desc: 'L’arrivée à gauche (1, 3, 5), le départ à droite (2, 4, 6). Marron, noir, gris : les trois phases.' }
      ],
      commandes: [
        { id: 'position', type: 'choix', options: [['ferme', 'Fermé'], ['ouvert', 'Ouvert'], ['cadenasse', 'Ouvert et cadenassé']], valeur: 'ferme' },
        { id: 'circuit', type: 'choix', titre: 'Le courant dans la machine', options: [['charge', 'En charge'], ['hors', 'Hors charge']], valeur: 'charge' }
      ],
      etapes: [
        { titre: 'Fermé (I) : le courant passe', piece: 'ponts', voirDedans: true, actions: [['focus', 'tout'], ['phase', 'service']],
          vue: { azimut: -155, elevation: 22, zoom: 1.5, cible: [0, 0, 30] },
          texte: 'Chaque pont touche ses deux contacts fixes : le courant passe vers la machine. Les trois ponts sont sur le même arbre.' },
        { titre: 'On tourne la poignée : le ressort se tend', piece: 'ressort', voirDedans: true, ralenti: true, actions: [['focus', 'ressort'], ['phase', 'tourne']],
          vue: { azimut: 18, elevation: 16, zoom: 1.9, cible: [12, -6, 62] }, duree: 7,
          texte: 'La poignée avance, mais l’arbre ne bouge pas encore : le ressort, tendu entre la poignée et le petit bras de l’arbre, emmagasine de l’énergie. Les ponts touchent toujours.' },
        { titre: 'Le ressort lâche : les ponts s’écartent d’un coup', piece: 'ponts', voirDedans: true, ralenti: true, actions: [['focus', 'tout'], ['phase', 'claque']],
          vue: { azimut: -155, elevation: 22, zoom: 1.7, cible: [0, 0, 30] }, duree: 7,
          texte: 'Au milieu du mouvement, le ressort se détend d’un coup et fait tourner l’arbre bien plus vite que la main. Les ponts quittent leurs contacts : un arc jaillit à chaque bout.' },
        { titre: 'L’arc est découpé, refroidi, éteint', piece: 'chambre', voirDedans: true, ralenti: true, actions: [['focus', 'tout'], ['phase', 'ouvert']],
          vue: { azimut: -155, elevation: 22, zoom: 1.7, cible: [0, 0, 30] }, duree: 7,
          texte: 'L’arc est attiré entre les plaques d’acier, coupé en petits arcs, refroidi : il s’éteint en un instant. C’est la chambre de coupure : elle permet d’ouvrir en marche.' },
        { titre: 'Ouvert (0) : un grand écart d’air', piece: 'ponts', voirDedans: true, actions: [['focus', 'tout'], ['phase', 'ouvert']],
          vue: { azimut: -155, elevation: 22, zoom: 1.5, cible: [0, 0, 30] },
          texte: 'Les ponts sont à angle droit des contacts : chaque pôle est coupé à deux endroits, avec environ 21 mm d’air de chaque côté. Cet écart est garanti : l’appareil isole.' },
        { titre: 'On cadenasse en 0 : il isole pour de bon', piece: 'cadenas', voirDedans: false, actions: [['focus', 'tout'], ['phase', 'cadenas']],
          vue: { azimut: -30, elevation: 10, zoom: 1.5, cible: [0, -20, 80] },
          texte: 'En position 0, le trou du bras est en face du trou de l’oreille. L’anse passe dans les deux : la poignée ne peut plus tourner. On garde la clé. Il a coupé en charge, puis isolé : c’est un cumul.' }
      ],
      eclate: [
        { objets: [poignee], vers: [0, 0, 150], debut: 0, fin: 0.5 },
        { objets: [capot, marquages, oreilleG], vers: [0, 0, 104], debut: 0.2, fin: 0.7 },
        { objets: [ressort], vers: [0, 30, 76], debut: 0.35, fin: 0.85 },
        { objets: [rotor], vers: [0, 0, 70], debut: 0.45, fin: 0.95 },
        { objets: [fixes, chambres], vers: [0, -20, 30], debut: 0.6, fin: 1 }
      ],
      eclateVue: { azimut: -42, elevation: 20, zoom: 0.62, cible: [0, 6, 84] },
      surEclate(on) { eclatee = on; if (on) tArc = 0; placer(); majEtat(false); },
      agir,
      animer(dt) {
        if (mainEnAttente !== null && ins.x < 0.02) { mMain.cible = mainEnAttente; mainEnAttente = null; }
        if (cadenasVoulu && mMain.x > OUVERT * 0.97) ins.cible = 1;
        const bM = mMain.pas(dt);
        /* l'arbre claque quand la poignée passe la mi-course (ou reste arrêté à l'angle de l'arc) */
        mRotor.cible = mMain.x > TRIP ? (etat === 'arc' ? ARC_ANGLE : OUVERT) : 0;
        const bR = mRotor.pas(dt), bI = ins.pas(dt);
        if (tArc > 0) tArc -= dt;
        placer();
        let actif = bM || bR || bI || tArc > 0 || mainEnAttente !== null || (cadenasVoulu && ins.x < 0.99);
        if (!eclatee) {
          grains.forEach(g => { if (g.animer(dt)) actif = true; });
          arcsPlat.forEach(a => { if (a.animer(dt)) actif = true; });
        }
        if (bM || bR || bI) majEtat(false);
        return actif;
      }
    };
  }, { famille: 'separation', titre: 'L’interrupteur-sectionneur', stations: ['3.3'] });

  /* ================================================================== 3.4 LE PORTE-FUSIBLE
     Modulaire, 1P+N (36 mm) : le neutre à GAUCHE (levier marqué N, barrette bleue), la phase à
     droite (la cartouche 10 × 38). Chaque pôle a un tiroir qui bascule vers l'avant autour d'une
     charnière en bas : la cartouche quitte son contact du haut. Le porte-fusible ne fait que
     PORTER : c'est le fil de la cartouche qui fond, une fois, et le sable qui éteint l'arc. */
  Electro3D.definir('porteFusible', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const L = 36, H = 85, Z_AV = 68;
    const XP = [-8.5, 8.5], COUL = ['N', 'L1'];              /* le neutre à gauche, la phase à droite */
    const Y_CH = -29, Z_CH = 63, Z_CART = 58, Y_PAD = 20.1;  /* la charnière, l'axe de la cartouche, le contact du haut */
    const PSI_OUVERT = 72 * D2R, SORTIE = 62;

    /* ---- le rail, le boîtier (creux) et le cadre de la face avant */
    const rail = K.railDIN(64);
    const socle = coque(T, K, M.plastique, L, H, 0, 44, 2.2, 2.4, 'arriere');
    const capot = new T.Group();
    [1, -1].forEach(s => capot.add(K.mesh(K.boite(L, 13, 24, 1.5), M.plastique, 0, s * 36, 56)));       /* les blocs du haut et du bas */
    [1, -1].forEach(s => capot.add(K.mesh(K.boite(1.6, 59, 24, 0.5), M.plastique, s * 17.2, 0, 56)));   /* les flancs */
    capot.add(K.mesh(K.boite(1.2, 59, 24, 0.4), M.plastique, 0, 0, 56));                                 /* la cloison entre les deux pôles */
    const griffe = K.mesh(K.boite(14, 6, 5, 1), M.plastiqueSombre, 0, -H / 2 + 1, 2.5);
    racine.add(rail, socle, capot, griffe);

    /* ---- les bornes (haut : arrivée, bas : départ) et les marquages */
    const bornes = new T.Group(), marquages = new T.Group();
    XP.forEach((x, i) => [1, -1].forEach((s, k) => {
      const creux = K.mesh(K.cylindre(3.4, 1.2, 24), M.sombre, x, s * 36, Z_AV - 0.4); creux.rotation.x = Math.PI / 2;
      const vis = K.vis(2.4); vis.rotation.x = Math.PI / 2; vis.position.set(x, s * 36, Z_AV - 0.9);
      const cage = K.mesh(K.boite(9, 9, 12, 0.8), M.zingue, x, s * 34, 58);
      const entree = K.mesh(K.boite(6.4, 1.6, 6.4, 0.4), M.sombre, x, s * (H / 2 - 0.55), 60);
      bornes.add(creux, vis, cage, entree);
    }));
    const gCal = K.gravure('32 A\n400 V', 2.6, { couleur: '#2b3138' }); gCal.position.set(0, -36, Z_AV + 0.08);
    marquages.add(gCal);
    racine.add(bornes, marquages);

    /* ---- les contacts fixes : bande du haut, plot du haut, axe de charnière relié à la borne du bas */
    const bandes = new T.Group();
    XP.forEach(x => {
      bandes.add(K.mesh(K.boite(8, 15, 1.8, 0.4), M.cuivre, x, 28.7, 52.5));
      bandes.add(K.mesh(K.boite(9.5, 2.2, 9.5, 0.4), M.cuivre, x, Y_PAD, Z_CART));
      const axe = K.mesh(K.cylindre(1.8, 15, 12), M.cuivre, x, Y_CH, Z_CH); axe.rotation.z = Math.PI / 2; bandes.add(axe);
    });
    racine.add(bandes);

    /* ---- les deux tiroirs : un levier noir, deux joues, un support à la charnière */
    const voyantOff = M.sombre, voyantOn = K.lumineux(0xff7a1a);
    const tiroirs = [], chassis = [], joues = [];
    let voyant = null, barrette = null, cart = null, cartGroupe = null;
    const arcFusible = K.arc(new T.Vector3(0, 4.2, 0), new T.Vector3(0, -4.2, 0), { rayon: 0.6, halo: 0.8 });
    XP.forEach((x, i) => {
      const t = new T.Group(); t.position.set(x, Y_CH, Z_CH);
      const c = new T.Group();
      c.add(K.mesh(K.boite(15, 58, 3, 1), M.plastiqueNoir, 0, 29, 3.5));                     /* le levier */
      [-1, 1].forEach(s => { const j = K.mesh(K.boite(1.0, 50, 11, 0.3), M.plastiqueNoir, s * 7.1, 32, -2.5); c.add(j); joues.push(j); });   /* les joues */
      const boss = K.mesh(K.cylindre(3, 15, 16), M.plastiqueNoir, 0, 0, 0); boss.rotation.z = Math.PI / 2; c.add(boss);
      c.add(K.mesh(K.boite(9.5, 2.2, 9.5, 0.4), M.cuivre, 0, 8.9, -5));                       /* le support de cuivre, sous la capsule du bas */
      c.add(K.mesh(K.boite(6, 8.8, 1.2, 0.3), M.cuivre, 0, 4.4, -9.6));                       /* sa tresse vers la charnière */
      if (i === 0) { const n = K.gravure('N', 4, { couleur: '#f1efe8' }); n.position.set(0, 50, 5.15); c.add(n); }
      t.add(c); chassis.push(c);
      racine.add(t); tiroirs.push(t);
      /* le contenu du tiroir : la barrette du neutre (à gauche) ou la cartouche (à droite) */
      if (i === 0) {
        const g = new T.Group();
        const corps = K.mesh(K.cylindre(5.15, 24, 32), M.plastiqueBleu, 0, 0, 0);
        const cH = K.mesh(K.cylindre(5.15, 7, 32), M.laiton, 0, 15.5, 0), cB = K.mesh(K.cylindre(5.15, 7, 32), M.laiton, 0, -15.5, 0);
        g.add(corps, cH, cB); g.position.set(0, 29, -5); t.add(g); barrette = { g, corps };
      } else {
        cart = cartouche(T, K, { longueur: 38, rayon: 5.15, capsule: 7, grains: 170 });
        cart.g.position.set(0, 29, -5); cart.g.add(arcFusible.objet); t.add(cart.g); cartGroupe = cart.g;
        voyant = K.mesh(K.cylindre(2.2, 1, 16), voyantOff, 0, 46, 5.2); voyant.rotation.x = Math.PI / 2; t.add(voyant);
      }
    });

    /* ---- les fils venus du dehors : le neutre à gauche, la phase à droite */
    const fils = new T.Group(), filsH = [], filsB = [];
    XP.forEach((x, i) => {
      const h = K.fil([[x, 74, 22], [x, 68, 44], [x, 56, 58], [x, 45, 60], [x, 36, 60]], 1.7, COUL[i]);
      const b = K.fil([[x, -36, 60], [x, -45, 60], [x, -56, 58], [x, -68, 44], [x, -74, 22]], 1.7, COUL[i]);
      fils.add(h.mesh, b.mesh); filsH.push(h); filsB.push(b);
    });
    racine.add(fils);

    /* ---- le courant : il ne passe que tiroir fermé, cartouche en place et intacte */
    const grains = XP.map((x, i) => {
      const c = K.courant(K.chemin([filsH[i].courbe, [x, 36, 58], [x, 29, 52.5], [x, 21, 52.5], [x, Y_PAD, Z_CART], [x, 15, Z_CART], [x, -15, Z_CART], [x, -20.1, Z_CART],
        [x, -26, 60], [x, -29, Z_CH], [x, -34, 60], filsB[i].courbe]), { pas: 6.5, rayon: 1.05, vitesse: 38 });
      c.regler({ debit: 1, alternatif: true, frequence: 0.7 });
      racine.add(c.objet); return c;
    });

    /* ---- l'état et le mouvement */
    const psi = K.mobile(0, 70, 17);                        /* le tiroir qui bascule */
    const sortie = K.mobile(0, 90, 19);                     /* la cartouche qui sort du tiroir (0 à 1) */
    let fondue = false, chauffe = 0, tArc = 0, eclatee = false, tiroir = 'ferme', attenteSortie = false, attenteFerme = false, derniereMesure = '';

    const placer = () => {
      /* éclaté : les tiroirs se montrent fermés, les pièces sortent alors chacune dans son axe */
      tiroirs.forEach(t => { t.rotation.x = eclatee ? 0 : psi.x; });
      cartGroupe.position.y = 29 + SORTIE * (eclatee ? 0 : sortie.x);
      if (barrette) barrette.g.position.y = 29;
      const chaud = fondue ? 0.55 : chauffe;
      K.chaleur(cart.matFil, chaud);
      arcFusible.regler(tArc > 0 && !eclatee);
    };
    const contact = () => psi.x < 0.05 && sortie.x < 0.02 && !fondue;
    const majEtat = (dire) => {
      const ferme = psi.x < 0.05 && sortie.x < 0.02;
      grains.forEach(g => g.regler({ debit: contact() && !eclatee ? 1 : 0 }));
      voyant.material = fondue ? voyantOn : voyantOff;
      cart.regler(fondue);
      const mesures = [
        { libelle: 'Courant dans le circuit', valeur: contact() ? '6,5 A' : '0 A' },
        { libelle: 'La cartouche', valeur: fondue ? 'fondue' : sortie.x > 0.5 ? 'retirée' : 'intacte' },
        { libelle: 'Le tiroir', valeur: ferme ? 'fermé' : sortie.x > 0.5 ? 'ouvert, cartouche retirée' : psi.x > PSI_OUVERT * 0.9 ? 'ouvert' : 'en train de basculer' }
      ];
      const cle = JSON.stringify(mesures);
      if (cle !== derniereMesure) { derniereMesure = cle; ctx.mesures(mesures); }
      if (dire) ctx.dire(phrase());
    };
    const phrase = () => {
      const ferme = psi.x < 0.05 && sortie.x < 0.02;
      if (sortie.x > 0.5) return '<strong>Cartouche retirée.</strong> Elle sort du tiroir, bout par bout. On la remplace par une cartouche identique : même taille, même courant, même lettre. Le tiroir seul ne coupe rien.';
      if (!ferme) return '<strong>Tiroir ouvert.</strong> La cartouche a quitté son contact du haut : le courant ne passe plus. Mais ce n’est pas un sectionnement : l’écart n’est pas garanti, on ne peut pas le cadenasser. Sous tension, ce geste est dangereux.';
      if (fondue) return '<strong>Après un défaut.</strong> Le courant a trop monté : le fil a fondu, le sable a absorbé l’arc. La cartouche ne se répare pas, elle se remplace. Le voyant orange le dit de l’extérieur.';
      return '<strong>Cartouche intacte.</strong> Le fil calibré laisse passer le courant. Il chauffe un peu, sans conséquence. Le porte-fusible, lui, ne fait que porter.';
    };

    const agir = (id, v) => {
      /* « focus » : le rail pâlit pendant la leçon ; « tiroir » cache aussi les joues des tiroirs
         (vue de côté : on voit la cartouche quitter son plot) ; une commande rétablit tout */
      if (id === 'focus') { focusRail(v === 'meca' || v === 'tiroir'); joues.forEach(j => { j.visible = v !== 'tiroir'; }); return; }
      if (id !== 'phase') { focusRail(false); joues.forEach(j => { j.visible = true; }); }
      if (id === 'phase') {
        /* le mouvement découpé pour la leçon : le fil chauffe, puis fond, puis on ouvre le tiroir */
        if (v === 'service') { fondue = false; chauffe = 0; attenteFerme = true; sortie.cible = 0; }
        if (v === 'chauffe') { fondue = false; chauffe = 0.9; attenteFerme = true; sortie.cible = 0; }
        if (v === 'fond') { if (!fondue && psi.x < 0.05) tArc = 0.45; fondue = true; chauffe = 0; attenteFerme = true; sortie.cible = 0; }
        if (v === 'ouvre') { attenteFerme = false; attenteSortie = false; psi.cible = PSI_OUVERT; sortie.cible = 0; }
        if (v === 'retire') { attenteFerme = false; psi.cible = PSI_OUVERT; attenteSortie = true; }
        ctx.regler('cartouche', fondue ? 'fondue' : 'intacte');
        ctx.regler('tiroir', v === 'retire' ? 'retiree' : v === 'ouvre' ? 'ouvert' : 'ferme');
        placer(); majEtat(false); return;
      }
      if (id === 'cartouche') {
        if (v === 'fondue' && !fondue && psi.x < 0.05) tArc = 0.45;
        fondue = v === 'fondue'; chauffe = 0;
      }
      if (id === 'tiroir') {
        if (v === 'ferme') { attenteSortie = false; sortie.cible = 0; attenteFerme = true; }
        if (v === 'ouvert') { attenteFerme = false; attenteSortie = false; psi.cible = PSI_OUVERT; sortie.cible = 0; }
        if (v === 'retiree') { attenteFerme = false; psi.cible = PSI_OUVERT; attenteSortie = true; }
      }
      majEtat(true);
    };

    placer(); majEtat(false);
    const focusRail = eclaircir([rail, griffe]);

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 12, cadre: [socle, capot], marge: 1.3 }
                                    : { azimut: -46, elevation: 12, cadre: [socle, capot], marge: 1.25, cible: [0, 0, 46] },
      fond: 'platine',
      fantome: [socle, capot, ...chassis, cart.corps, barrette.corps],
      phrase: phrase(),
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [socle, capot, griffe, marquages], desc: 'Il tient les pièces à distance et protège les doigts. Il porte les deux nombres : le courant et la tension de la cartouche.' },
        { id: 'tiroir', nom: 'Le tiroir basculant', objets: chassis, desc: 'Un levier noir qui bascule vers l’avant autour d’une charnière, en bas. Il porte la cartouche : en basculant, il la sort de son contact du haut.' },
        { id: 'cartouche', nom: 'La cartouche (10 × 38)', objets: [cart.corps, ...cart.caps], desc: 'Un tube de céramique et deux capsules de laiton : 10 mm de diamètre, 38 mm de long. La taille fait partie du calibre.' },
        { id: 'fil', nom: 'Le fil calibré', objets: [cart.fil, arcFusible.objet], desc: 'C’est lui qui travaille. Au-delà d’un certain courant, il chauffe, fond, et le circuit s’ouvre. Il ne se répare pas.' },
        { id: 'sable', nom: 'Le sable', objets: [cart.sable], desc: 'Ce n’est pas un remplissage : il absorbe l’arc quand le fil fond, et l’étouffe tout de suite.' },
        { id: 'voyant', nom: 'Le voyant', objets: [voyant], desc: 'Sur les modèles modernes, il s’allume quand la cartouche a fondu. De l’extérieur, sinon, on ne voit rien.' },
        { id: 'barrette', nom: 'La barrette de neutre', objets: [barrette.g], desc: 'À gauche, côté neutre : pas de fusible, un simple barreau plein. On ne protège pas le neutre, on coupe seulement la phase.' },
        { id: 'contacts', nom: 'Les contacts', objets: [bandes], desc: 'Le plot du haut reçoit le bout de la cartouche. En bas, l’axe de la charnière relie le tiroir à la borne.' },
        { id: 'bornes', nom: 'Les bornes', objets: [bornes], desc: 'L’arrivée en haut, le départ en bas. Le neutre à gauche, la phase à droite.' },
        { id: 'fils', nom: 'Le neutre et la phase', objets: [fils], desc: 'À gauche le neutre (bleu), à droite la phase (marron) : le fusible est sur la phase.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'Le porte-fusible s’y clipse, comme tout l’appareillage modulaire.' }
      ],
      commandes: [
        { id: 'cartouche', type: 'choix', options: [['intacte', 'Cartouche intacte'], ['fondue', 'Après un défaut']], valeur: 'intacte' },
        { id: 'tiroir', type: 'choix', titre: 'Le tiroir', options: [['ferme', 'Tiroir fermé'], ['ouvert', 'Tiroir ouvert'], ['retiree', 'Cartouche retirée']], valeur: 'ferme' }
      ],
      etapes: [
        { titre: 'Le courant passe par le fil de la cartouche', piece: 'fil', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'service']],
          vue: { azimut: 58, elevation: 10, zoom: 1.6, cible: [8, 0, 56] },
          texte: 'Tiroir fermé : la cartouche touche son contact du haut. Le courant traverse le fil calibré, tout droit, d’une capsule à l’autre. Le sable l’entoure.' },
        { titre: 'Trop de courant : le fil chauffe', piece: 'fil', voirDedans: true, ralenti: true, actions: [['focus', 'meca'], ['phase', 'chauffe']],
          vue: { azimut: 58, elevation: 10, zoom: 2.4, cible: [8.5, 0, 58] }, duree: 7,
          texte: 'Si le courant dépasse ce que la cartouche accepte, le fil, qui est très fin, chauffe bien plus que le reste. Il rougit.' },
        { titre: 'Le fil fond : le sable éteint l’arc', piece: 'sable', voirDedans: true, ralenti: true, actions: [['focus', 'meca'], ['phase', 'fond']],
          vue: { azimut: 58, elevation: 10, zoom: 2.4, cible: [8.5, 0, 58] }, duree: 7,
          texte: 'Le fil fond et se coupe en deux : le circuit s’ouvre. Un arc se forme dans le vide, mais le sable l’absorbe aussitôt. Le voyant orange s’allume.' },
        { titre: 'On ouvre le tiroir : la cartouche quitte son contact', piece: 'tiroir', voirDedans: true, ralenti: true, actions: [['focus', 'tiroir'], ['phase', 'ouvre']],
          vue: { azimut: 76, elevation: 12, zoom: 1.35, cible: [6, -6, 74] }, duree: 7,
          texte: 'Le levier bascule vers l’avant, autour de sa charnière. Le haut de la cartouche s’écarte du plot. Ce n’est pas un sectionnement : sous tension, ce geste est dangereux.' },
        { titre: 'On retire la cartouche et on la remplace', piece: 'cartouche', voirDedans: false, actions: [['focus', 'meca'], ['phase', 'retire']],
          vue: { azimut: -50, elevation: 14, zoom: 0.95, cible: [0, 10, 86] }, duree: 7,
          texte: 'La cartouche sort du tiroir. Elle ne se répare pas : on la remplace par une cartouche identique, même taille, même courant, même lettre.' }
      ],
      eclate: [
        { objets: [cartGroupe, barrette.g], vers: [0, 52, 0], debut: 0, fin: 0.45 },
        { objets: tiroirs, vers: [0, 0, 80], debut: 0.2, fin: 0.7 },
        { objets: [capot, marquages], vers: [0, 0, 44], debut: 0.4, fin: 0.85 },
        { objets: [bornes, bandes, fils], vers: [0, 0, 22], debut: 0.55, fin: 1 }
      ],
      eclateVue: { azimut: -42, elevation: 20, zoom: 0.85, cible: [6, 10, 80] },
      surEclate(on) { eclatee = on; if (on) tArc = 0; placer(); majEtat(false); },
      agir,
      animer(dt) {
        /* on referme le tiroir une fois la cartouche rentrée ; on sort la cartouche une fois le tiroir ouvert */
        if (attenteSortie && psi.x > PSI_OUVERT * 0.93) { sortie.cible = 1; attenteSortie = false; }
        if (attenteFerme && sortie.x < 0.03) { psi.cible = 0; attenteFerme = false; }
        const bP = psi.pas(dt), bS = sortie.pas(dt);
        if (tArc > 0) tArc -= dt;
        placer();
        let actif = bP || bS || tArc > 0 || attenteSortie || attenteFerme;
        if (!eclatee) {
          grains.forEach(g => { if (g.animer(dt)) actif = true; });
          if (arcFusible.animer(dt)) actif = true;
        }
        if (bP || bS) majEtat(false);
        return actif;
      }
    };
  }, { famille: 'separation', titre: 'Le porte-fusible', stations: ['3.4'] });

  /* ================================================================== 3.5 LE SECTIONNEUR PORTE-FUSIBLE
     Tripolaire, cartouches 14 × 51. Les trois cartouches sont portées par la PARTIE MOBILE : un
     tiroir commun, que la poignée fait basculer vers l'avant. Ouvert, les cartouches sont sorties
     du circuit (hors tension) : on les change sans risque. Un disque, sur le flanc, a un trou de
     cadenas : ouvert, il tombe en face du trou de l'oreille fixe. Comme le sectionneur, il n'a
     AUCUN pouvoir de coupure : les fusibles ne changent rien à l'arc que l'on crée en ouvrant. */
  Electro3D.definir('sectionneurPF', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const W = 84, H = 108, Z_AV = 70;
    const XP = [-27, 0, 27], COUL = ['L1', 'L2', 'L3'];
    const Y_CH = -40, Z_CH = 64, Z_CART = 58, Y_PAD = 26.6, DEMI_C = 25.5;     /* charnière, axe des cartouches, plot du haut */
    const PSI_OUVERT = 66 * D2R, SORTIE = 70;
    const AXE_X = new T.Vector3(1, 0, 0);
    const X_DISQUE = 43.7, Y_TROU = 7.7, Z_TROU = 12.2;                         /* le trou de cadenas, dans le repère du tiroir */

    /* ---- le rail, le boîtier (creux) et le cadre de la face avant */
    const rail = K.railDIN(110);
    const socle = coque(T, K, M.plastique, W, H, 0, 44, 2.4, 3, 'arriere');
    const capot = new T.Group();
    [1, -1].forEach(s => capot.add(K.mesh(K.boite(W, 14, 26, 1.5), M.plastique, 0, s * 47, 57)));          /* blocs haut et bas */
    [1, -1].forEach(s => capot.add(K.mesh(K.boite(2, 80, 26, 0.5), M.plastique, s * 41, 0, 57)));          /* flancs */
    [1, -1].forEach(s => capot.add(K.mesh(K.boite(1.2, 80, 22, 0.4), M.plastique, s * 13.5, 0, 55)));      /* cloisons entre les pôles */
    const griffe = K.mesh(K.boite(16, 6, 5, 1), M.plastiqueSombre, 0, -H / 2 + 1, 2.5);
    racine.add(rail, socle, capot, griffe);

    /* ---- les bornes et les marquages */
    const bornes = new T.Group(), marquages = new T.Group();
    const REP = [['1/L1', '3/L2', '5/L3'], ['2/T1', '4/T2', '6/T3']];
    XP.forEach((x, i) => [1, -1].forEach((s, k) => {
      const creux = K.mesh(K.cylindre(3.6, 1.2, 24), M.sombre, x, s * 49.5, Z_AV - 0.4); creux.rotation.x = Math.PI / 2;
      const vis = K.vis(2.6); vis.rotation.x = Math.PI / 2; vis.position.set(x, s * 49.5, Z_AV - 0.9);
      const cage = K.mesh(K.boite(11, 9, 12, 0.8), M.zingue, x, s * 47, 58);
      const entree = K.mesh(K.boite(7, 1.6, 7, 0.4), M.sombre, x, s * (H / 2 - 0.55), 60);
      bornes.add(creux, vis, cage, entree);
      const g = K.gravure(REP[k][i], 3, { couleur: '#2b3138' }); g.position.set(x, s * 43, Z_AV + 0.08); marquages.add(g);
    }));
    const gCal = K.gravure('50 A  400 V', 2.8, { couleur: '#2b3138' }); gCal.position.set(0, -43, Z_AV + 0.08);
    marquages.add(gCal);
    racine.add(bornes, marquages);

    /* ---- les contacts fixes : bande et plot du haut ; axe de charnière relié à la borne du bas */
    const matPlot = K.propre(M.cuivre);
    const bandes = new T.Group(), plots = new T.Group();
    XP.forEach(x => {
      bandes.add(K.mesh(K.boite(10, 15, 1.8, 0.4), M.cuivre, x, 35.1, 51.5));
      plots.add(K.mesh(K.boite(12, 2.2, 12, 0.4), matPlot, x, Y_PAD, Z_CART));
      const axe = K.mesh(K.cylindre(2.2, 24, 12), M.cuivre, x, Y_CH, Z_CH); axe.rotation.z = Math.PI / 2; bandes.add(axe);
    });
    bandes.add(plots);
    racine.add(bandes);

    /* ---- le tiroir commun : plaque noire, joues, charnière, poignée, supports des cartouches, disque de cadenas */
    const tiroir = new T.Group(); tiroir.position.set(0, Y_CH, Z_CH);
    const chassis = new T.Group(), joues = [];
    chassis.add(K.mesh(K.boite(78, 78, 3.5, 1.2), M.plastiqueNoir, 0, 39, 4.25));                          /* la plaque avant */
    [-35.2, -18.8, -8.2, 8.2, 18.8, 35.2].forEach(x => { const j = K.mesh(K.boite(1, 56, 14, 0.3), M.plastiqueNoir, x, 40, -3); chassis.add(j); joues.push(j); });
    const boss = K.mesh(K.cylindre(3.2, 78, 16), M.plastiqueNoir, 0, 0, 0); boss.rotation.z = Math.PI / 2; chassis.add(boss);
    chassis.add(K.mesh(K.boite(50, 9, 10, 2.5), M.plastiqueNoir, 0, 62, 11));                              /* la poignée */
    XP.forEach(x => {
      chassis.add(K.mesh(K.boite(12, 2.2, 12, 0.4), M.cuivre, x, 13.4, -6));                               /* le support de cuivre, sous la cartouche */
      chassis.add(K.mesh(K.boite(7, 11.4, 1.2, 0.3), M.cuivre, x, 6.7, -11));                              /* sa tresse vers la charnière */
    });
    const disque = K.mesh(K.cylindre(16, 3, 40), M.plastiqueNoir, X_DISQUE, 0, 0); disque.rotation.z = Math.PI / 2;
    const trouD = K.mesh(K.cylindre(3, 3.4, 16), M.sombre, X_DISQUE, Y_TROU, Z_TROU); trouD.rotation.z = Math.PI / 2;
    const axeD = K.mesh(K.cylindre(3.2, 6, 16), M.acierSombre, 40.6, 0, 0); axeD.rotation.z = Math.PI / 2;
    chassis.add(disque, trouD, axeD);
    tiroir.add(chassis); racine.add(tiroir);

    /* ---- les trois cartouches (14 × 51), posées dans le tiroir */
    const cartes = XP.map(x => {
      const c = cartouche(T, K, { longueur: 51, rayon: 7.15, capsule: 9, grains: 230 });
      c.g.position.set(x, 40, -6); tiroir.add(c.g); return c;
    });

    /* ---- l'oreille fixe (derrière le disque, puis une plaque le long de lui) et le cadenas */
    const yTrou = Y_CH + Y_TROU * Math.cos(PSI_OUVERT) - Z_TROU * Math.sin(PSI_OUVERT);      /* où tombe le trou du disque, ouvert */
    const zTrou = Z_CH + Y_TROU * Math.sin(PSI_OUVERT) + Z_TROU * Math.cos(PSI_OUVERT);
    const oreille = new T.Group();
    oreille.add(K.mesh(K.boite(5, 4, 8, 0.6), M.plastiqueSombre, 44.5, -50, 44));
    oreille.add(K.mesh(K.boite(3, 16, 52, 0.8), M.plastiqueSombre, 48, -50, 66));
    const trouO = K.mesh(K.cylindre(3, 3.4, 16), M.sombre, 48, yTrou, zTrou); trouO.rotation.z = Math.PI / 2; oreille.add(trouO);
    racine.add(oreille);
    const cad = K.cadenas(17);
    cad.position.set(45.85, yTrou, zTrou); cad.visible = false; racine.add(cad);

    /* ---- les fils venus du dehors */
    const fils = new T.Group(), filsH = [], filsB = [];
    XP.forEach((x, i) => {
      const h = K.fil([[x, 88, 22], [x, 82, 44], [x, 70, 58], [x, 58, 60], [x, 49, 60]], 2.0, COUL[i]);
      const b = K.fil([[x, -49, 60], [x, -58, 60], [x, -70, 58], [x, -82, 44], [x, -88, 22]], 2.0, COUL[i]);
      fils.add(h.mesh, b.mesh); filsH.push(h); filsB.push(b);
    });
    racine.add(fils);

    /* ---- le courant : tiroir fermé, machine en marche */
    const grains = XP.map((x, i) => {
      const c = K.courant(K.chemin([filsH[i].courbe, [x, 47, 58], [x, 40, 51.5], [x, 30, 51.5], [x, Y_PAD, Z_CART], [x, DEMI_C, Z_CART], [x, -DEMI_C, Z_CART], [x, -27, Z_CART],
        [x, -34, 60], [x, Y_CH, Z_CH], [x, -47, 60], filsB[i].courbe]), { pas: 7, rayon: 1.15, vitesse: 38 });
      c.regler({ debit: 1, alternatif: true, frequence: 0.7 });
      racine.add(c.objet); return c;
    });

    /* ---- l'arc : entre le plot du haut et le bout de la cartouche, qui s'éloigne avec le tiroir */
    const arcs = XP.map(() => { const a = K.arc(new T.Vector3(0, 0, 0), new T.Vector3(0, 8, 0), { rayon: 0.6, halo: 0.35 }); racine.add(a.objet); return a; });
    const poserArc = (a, A, B) => {
      const d = B.clone().sub(A), L = d.length() || 0.01, s = Math.min(2.2, Math.max(1, L / 24));
      a.objet.position.copy(A); a.objet.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.divideScalar(L));
      a.objet.scale.set(s, L / 8, s);
    };

    /* ---- l'état et le mouvement */
    const psi = K.mobile(0, 80, 18), ins = K.mobile(0, 70, 17), sortie = K.mobile(0, 90, 19);
    let charge = true, cadenasVoulu = false, fermeVoulu = false, changer = false, arcInstalle = false, contact = true, eclatee = false, etat = 'ferme', derniereMesure = '';

    const placer = () => {
      tiroir.rotation.x = eclatee ? 0 : psi.x;                               /* éclaté : le tiroir se montre fermé */
      cad.position.x = 45.85 + 30 * (1 - ins.x); cad.visible = ins.x > 0.01 && !eclatee;
      cartes[1].g.position.y = 40 + SORTIE * (eclatee ? 0 : sortie.x);       /* on change celle du milieu */
      const touche = psi.x < 0.03;
      if (touche !== contact) {
        contact = touche;
        if (!contact && charge && !eclatee) arcInstalle = true;              /* ouvert en charge : l'arc s'installe, les fusibles n'y font rien */
        if (contact) arcInstalle = false;
        majEtat(false);
      }
      const arcOn = arcInstalle && !contact && !eclatee;
      arcs.forEach((a, i) => {
        a.regler(arcOn);
        if (arcOn) poserArc(a, new T.Vector3(XP[i], DEMI_C, Z_CART), new T.Vector3(XP[i], 40 + DEMI_C, -6).applyAxisAngle(AXE_X, psi.x).add(tiroir.position));
      });
      K.chaleur(matPlot, arcOn ? 1.0 : 0);
    };
    const phrase = () => {
      if (arcInstalle && !contact) return '<strong>⚠ Ouvert en charge : à ne jamais faire.</strong> Les fusibles protègent contre les surintensités, pas contre l’arc que vous créez en ouvrant. Sans pouvoir de coupure, l’arc s’installe entre le plot et la cartouche, et il ne s’éteint pas.';
      if (etat === 'cadenasse') return '<strong>Ouvert et cadenassé.</strong> L’anse du cadenas passe dans le disque de la partie mobile et dans l’oreille fixe : personne ne peut refermer. Les cartouches sont hors tension : on peut les changer sans risque.';
      if (!contact) return '<strong>Ouvert.</strong> Les cartouches, portées par le tiroir, sont sorties du circuit : hors tension. L’écart d’air est grand et garanti : l’appareil isole.' + (charge ? '' : ' Le courant avait été coupé ailleurs avant : c’est la bonne façon.');
      return charge ? '<strong>Fermé.</strong> Les trois cartouches sont dans le circuit : le courant passe par elles. C’est la position de service.'
        : '<strong>Fermé, machine arrêtée.</strong> On a coupé le courant ailleurs : rien ne passe. On peut maintenant abaisser la poignée.';
    };
    const majEtat = (dire) => {
      grains.forEach(g => g.regler({ debit: contact && charge && !eclatee ? 1 : 0 }));
      const ouvert = !contact, tout = psi.x > PSI_OUVERT * 0.95;
      const mesures = [
        { libelle: 'Courant dans les cartouches', valeur: contact && charge ? '25 A' : arcInstalle && ouvert ? 'passe dans l’arc' : '0 A' },
        { libelle: 'Les cartouches', valeur: contact ? 'dans le circuit' : 'hors du circuit' },
        { libelle: 'Écart d’air', valeur: contact ? '0 mm' : tout ? 'environ 70 mm, garantis' : 'se creuse' }
      ];
      const cle = JSON.stringify(mesures);
      if (cle !== derniereMesure) { derniereMesure = cle; ctx.mesures(mesures); }
      if (dire) ctx.dire(phrase());
    };

    const agir = (id, v) => {
      /* « focus » : le rail pâlit pendant la leçon ; « tiroir » cache aussi les joues du tiroir
         (on voit les cartouches quitter leurs plots) ; une commande rétablit tout */
      if (id === 'focus') { focusRail(v === 'meca' || v === 'tiroir'); joues.forEach(j => { j.visible = v !== 'tiroir'; }); return; }
      if (id !== 'phase') { focusRail(false); joues.forEach(j => { j.visible = true; }); }
      if (id === 'phase') {
        /* le mouvement découpé pour la leçon : on coupe ailleurs, on abaisse, on cadenasse, on change */
        if (v === 'service') { charge = true; cadenasVoulu = false; fermeVoulu = true; changer = false; etat = 'ferme'; ins.cible = 0; sortie.cible = 0; }
        if (v === 'mi') { charge = false; cadenasVoulu = false; changer = false; ins.cible = 0; sortie.cible = 0; psi.cible = PSI_OUVERT / 2; etat = 'ouvert'; }
        if (v === 'ouvert') { charge = false; cadenasVoulu = false; changer = false; ins.cible = 0; sortie.cible = 0; psi.cible = PSI_OUVERT; etat = 'ouvert'; }
        if (v === 'cadenas') { charge = false; arcInstalle = false; psi.cible = PSI_OUVERT; cadenasVoulu = true; changer = false; sortie.cible = 0; etat = 'cadenasse'; }
        if (v === 'change') { charge = false; arcInstalle = false; psi.cible = PSI_OUVERT; cadenasVoulu = true; changer = true; etat = 'cadenasse'; }
        if (v === 'erreur') {
          ins.x = ins.v = ins.cible = 0; sortie.x = sortie.v = sortie.cible = 0; psi.x = psi.v = 0; contact = true; arcInstalle = false;
          charge = true; cadenasVoulu = false; changer = false; etat = 'ouvert'; psi.cible = PSI_OUVERT;
        }
        if (v === 'service') psi.cible = 0;
        ctx.regler('position', etat); ctx.regler('circuit', charge ? 'charge' : 'hors');
        placer(); majEtat(false); return;
      }
      if (id === 'position') {
        etat = v; changer = false; sortie.cible = 0;
        if (v === 'ferme') { cadenasVoulu = false; ins.cible = 0; fermeVoulu = true; }
        if (v === 'ouvert') { cadenasVoulu = false; ins.cible = 0; psi.cible = PSI_OUVERT; }
        if (v === 'cadenasse') { psi.cible = PSI_OUVERT; cadenasVoulu = true; charge = false; arcInstalle = false; ctx.regler('circuit', 'hors'); }
      }
      if (id === 'circuit') { charge = v === 'charge'; if (!charge) arcInstalle = false; }
      majEtat(true);
    };

    placer(); majEtat(false);
    const focusRail = eclaircir([rail, griffe]);

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 28, elevation: 14, cadre: [socle, capot], marge: 1.3 }
                                    : { azimut: 34, elevation: 14, cadre: [socle, capot], marge: 1.22, cible: [4, -4, 46] },
      fond: 'platine',
      fantome: [socle, capot, chassis, ...cartes.map(c => c.corps)],
      phrase: phrase(),
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [socle, capot, griffe, marquages], desc: 'Il tient les pièces à distance. « Voir dedans » le rend transparent. Il porte le courant et la tension des cartouches.' },
        { id: 'tiroir', nom: 'La partie mobile et sa poignée', objets: [chassis], desc: 'Un tiroir commun aux trois pôles, noir, que la poignée fait basculer vers l’avant. Il PORTE les trois cartouches : abaisser la poignée, c’est les retirer du circuit.' },
        { id: 'cartouches', nom: 'Les trois cartouches (14 × 51)', objets: cartes.flatMap(c => [c.corps, ...c.caps]), desc: 'Une par phase. Elles sont sur la partie mobile : ouvert, elles sortent du circuit et sont hors tension.' },
        { id: 'fils', nom: 'Les fils calibrés', objets: cartes.map(c => c.fil), desc: 'Le fil de chaque cartouche. C’est lui qui fond en cas de surintensité. Il ne coupe jamais à la demande.' },
        { id: 'sable', nom: 'Le sable', objets: cartes.map(c => c.sable), desc: 'Il absorbe l’arc quand un fil fond. Il ne peut rien contre l’arc que vous créez en ouvrant en charge.' },
        { id: 'contacts', nom: 'Les plots et la charnière', objets: [bandes], desc: 'Un plot par phase, en haut : il reçoit le bout de la cartouche. En bas, l’axe de la charnière relie le tiroir à la borne.' },
        { id: 'cadenas', nom: 'Le cadenas et l’oreille', objets: [cad, oreille], ancre: [48, yTrou, zTrou], desc: 'La condamnation. Ouvert, le trou du disque tombe en face de celui de l’oreille fixe : l’anse passe dans les deux. La clé reste dans votre poche.' },
        { id: 'arc', nom: 'L’arc électrique', objets: arcs.map(a => a.objet), ancre: [0, DEMI_C, Z_CART], desc: 'Il n’apparaît que si on ouvre en charge. Les fusibles ne l’éteignent pas : ils protègent contre les surintensités, pas contre cet arc-là.' },
        { id: 'bornes', nom: 'Les bornes', objets: [bornes], desc: 'L’arrivée en haut (1, 3, 5), le départ en bas (2, 4, 6). Une cartouche par phase ; jamais sur le conducteur de protection.' },
        { id: 'cables', nom: 'Les trois phases', objets: [fils], desc: 'Marron, noir, gris : L1, L2, L3.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'L’appareil s’y clipse.' }
      ],
      commandes: [
        { id: 'position', type: 'choix', options: [['ferme', 'Fermé'], ['ouvert', 'Ouvert'], ['cadenasse', 'Ouvert et cadenassé']], valeur: 'ferme' },
        { id: 'circuit', type: 'choix', titre: 'Le courant dans le départ', options: [['charge', 'En charge'], ['hors', 'Hors charge']], valeur: 'charge' }
      ],
      etapes: [
        { titre: 'Fermé : les cartouches sont dans le circuit', piece: 'cartouches', voirDedans: true, actions: [['focus', 'meca'], ['phase', 'service']],
          vue: { azimut: -34, elevation: 12, zoom: 1.2, cible: [0, 0, 52] },
          texte: 'Les trois cartouches, portées par la partie mobile, touchent leurs plots du haut : le courant passe par elles. Le sable entoure chaque fil.' },
        { titre: 'On coupe ailleurs, puis on abaisse la poignée', piece: 'tiroir', voirDedans: true, ralenti: true, actions: [['focus', 'tiroir'], ['phase', 'mi']],
          vue: { azimut: -76, elevation: 12, zoom: 1.3, cible: [0, -6, 76] }, duree: 7,
          texte: 'Le courant a été coupé par la commande de la machine. On abaisse la poignée : la partie mobile bascule autour de sa charnière et emmène les cartouches. Elles se détachent des plots.' },
        { titre: 'Ouvert : les cartouches sont hors tension', piece: 'cartouches', voirDedans: true, actions: [['focus', 'tiroir'], ['phase', 'ouvert']],
          vue: { azimut: -48, elevation: 22, zoom: 1.05, cible: [4, -12, 82] },
          texte: 'Les cartouches sont sorties du circuit : un grand écart d’air, environ 70 mm, garanti par le constructeur. Rien ne les alimente plus : l’appareil isole.' },
        { titre: 'On cadenasse : personne ne peut refermer', piece: 'cadenas', voirDedans: false, actions: [['focus', 'meca'], ['phase', 'cadenas']],
          vue: { azimut: 58, elevation: 10, zoom: 1.15, cible: [28, -32, 80] },
          texte: 'Le trou du disque de la partie mobile est en face du trou de l’oreille fixe. L’anse du cadenas passe dans les deux : le tiroir ne peut plus bouger. La clé reste dans votre poche.' },
        { titre: 'On change une cartouche sans risque', piece: 'cartouches', voirDedans: false, actions: [['focus', 'meca'], ['phase', 'change']],
          vue: { azimut: 38, elevation: 20, zoom: 1.0, cible: [0, 6, 92] }, duree: 7,
          texte: 'Ouvert et cadenassé, les cartouches sont hors tension : on sort celle qui a fondu et on pose une cartouche identique, même taille, même courant, même lettre.' },
        { titre: 'À ne jamais faire : ouvrir en charge', piece: 'arc', voirDedans: true, ralenti: true, actions: [['focus', 'tiroir'], ['phase', 'erreur']],
          vue: { azimut: -56, elevation: 16, zoom: 1.1, cible: [0, 0, 70] }, duree: 8,
          texte: 'Des fusibles, donc je peux ouvrir en charge ? Faux. Ils protègent contre les surintensités, pas contre l’arc que VOUS créez : il s’installe entre le plot et la cartouche et ne s’éteint pas.' }
      ],
      /* l'éclaté, tiroir fermé : le tiroir sort vers l'avant, chaque cartouche sort de son logement
         le long de son axe (côte à côte au-dessus du tiroir), la face avant suit, les bornes restent */
      eclate: [
        { objets: cartes.map(c => c.g), vers: [0, 66, 0], debut: 0, fin: 0.45 },
        { objets: [tiroir], vers: [0, 0, 110], debut: 0.2, fin: 0.7 },
        { objets: [capot, marquages, oreille], vers: [0, 0, 52], debut: 0.4, fin: 0.85 },
        { objets: [bornes, bandes, fils], vers: [0, 0, 20], debut: 0.55, fin: 1 }
      ],
      eclateVue: { azimut: -42, elevation: 20, zoom: 0.72, cible: [0, 14, 96] },
      surEclate(on) { eclatee = on; placer(); majEtat(false); },
      agir,
      animer(dt) {
        /* on referme une fois le cadenas ressorti ; on cadenasse une fois ouvert ; on change quand c'est cadenassé */
        if (fermeVoulu && ins.x < 0.02) { psi.cible = 0; fermeVoulu = false; }
        if (cadenasVoulu && psi.x > PSI_OUVERT * 0.96) ins.cible = 1;
        sortie.cible = changer && ins.x > 0.95 ? 1 : 0;
        const bP = psi.pas(dt), bI = ins.pas(dt), bS = sortie.pas(dt);
        placer();
        let actif = bP || bI || bS || fermeVoulu || (cadenasVoulu && ins.x < 0.99) || (changer && sortie.x < 0.99);
        if (!eclatee) {
          grains.forEach(g => { if (g.animer(dt)) actif = true; });
          arcs.forEach(a => { if (a.animer(dt)) actif = true; });
        }
        if (bP || bI || bS) majEtat(false);
        return actif;
      }
    };
  }, { famille: 'separation', titre: 'Le sectionneur porte-fusible', stations: ['3.5'] });

})();
