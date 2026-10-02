/* ÉlectroRézo 3D — famille « commande » : le contacteur (modèle étalon).
   Unités : millimètres. Repère : X largeur, Y hauteur, Z profondeur (0 = rail, +Z = face avant).

   Ce que l'élève doit VOIR : la bobine alimentée devient un aimant, l'armature est attirée,
   elle entraîne la traverse et les quatre ponts se ferment ENSEMBLE ; à la coupure, le ressort
   ramène tout et un arc jaillit aux contacts de puissance. Le contacteur porte et commande,
   il ne protège pas. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('contacteur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const opt = ctx.options || {};
    const avecBlocAdditif = !!opt.blocAdditif;

    /* ---------------------------------------------------------------- dimensions */
    const L = 45, H_SOCLE = 80, Z_SOCLE = 40, H_CAPOT = 70, Z_AVANT = 74;
    const COLS = [-17, -8.5, 0, 8.5, 17];
    const HAUT = ['A1', '1/L1', '3/L2', '5/L3', '13 NO'];
    const BAS = ['A2', '2/T1', '4/T2', '6/T3', '14 NO'];
    const POLES = [-8.5, 0, 8.5], AUX = 17;
    const COURSE = 4;                 /* course de l'armature */
    const Z_PASTILLE_FIXE = 56.85;    /* face avant des pastilles fixes */
    const Z_TRAVERSE = 66;            /* centre de la traverse, contacteur ouvert */

    /* ---------------------------------------------------------------- le rail */
    const rail = K.railDIN(110); racine.add(rail);

    /* ---------------------------------------------------------------- le boîtier */
    const socle = K.mesh(K.boite(L, H_SOCLE, Z_SOCLE, 2.2), M.plastiqueSombre, 0, 0, Z_SOCLE / 2);
    const capot = K.mesh(K.boite(L, H_CAPOT, Z_AVANT - Z_SOCLE, 3), M.plastique, 0, 0, (Z_SOCLE + Z_AVANT) / 2);
    /* la griffe de fixation sur le rail, en bas du socle */
    const griffe = K.mesh(K.boite(14, 6, 5, 1), M.plastiqueSombre, 0, -H_SOCLE / 2 + 1, 2.5);
    racine.add(socle, capot, griffe);

    /* ---------------------------------------------------------------- les bornes */
    const bornesPuissance = new T.Group(), bornesBobine = new T.Group(), bornesAux = new T.Group();
    const marquages = new T.Group();
    const borne = (x, y, texte, groupe) => {
      const sens = Math.sign(y);
      const creux = K.mesh(K.cylindre(3.5, 1.2, 24), M.sombre, x, y, Z_AVANT - 0.4); creux.rotation.x = Math.PI / 2;
      const vis = K.vis(2.5); vis.rotation.x = Math.PI / 2; vis.position.set(x, y, Z_AVANT - 0.9);
      const entree = K.mesh(K.boite(5.6, 1.6, 5.6, 0.4), M.sombre, x, sens * (H_CAPOT / 2 - 0.55), 66);
      groupe.add(creux, vis, entree);
      const g = K.gravure(texte, 2.9, { couleur: '#2b3138' });
      g.position.set(x, y - sens * 7.4, Z_AVANT + 0.05);
      marquages.add(g);
    };
    COLS.forEach((x, i) => {
      const gHaut = i === 0 ? bornesBobine : i === 4 ? bornesAux : bornesPuissance;
      borne(x, 27, HAUT[i], gHaut);
      borne(x, -27, BAS[i], gHaut);
    });
    racine.add(bornesPuissance, bornesBobine, bornesAux, marquages);

    /* la fenêtre du témoin */
    const fenetre = K.mesh(K.boite(10, 6, 2.4, 0.6), M.sombre, 4.25, 0, Z_AVANT - 0.9);
    racine.add(fenetre);

    /* ---------------------------------------------------------------- le circuit magnétique */
    const tole = K.toleFeuilletee();
    const tolePlaque = K.repeter(tole, 7, 1);
    const circuitFixe = new T.Group();
    circuitFixe.add(K.mesh(new T.BoxGeometry(30, 38, 6), tolePlaque, 0, 0, 7));
    circuitFixe.add(K.mesh(new T.BoxGeometry(30, 10, 12), tolePlaque, 0, 0, 16));
    circuitFixe.add(K.mesh(new T.BoxGeometry(30, 6, 12), tolePlaque, 0, 16, 16));
    circuitFixe.add(K.mesh(new T.BoxGeometry(30, 6, 12), tolePlaque, 0, -16, 16));
    racine.add(circuitFixe);

    /* la bobine : un anneau de fil verni autour de la colonne centrale, entre deux joues */
    const bobine = new T.Group();
    const anneau = (we, he, wi, hi, r, ep, mat) => {
      const f = K.formeArrondie(we, he, r);
      const trou = K.formeArrondie(wi, hi, Math.min(r, 1.5));
      f.holes.push(trou);
      return K.mesh(K.extrusion(f, ep, 0.6), mat);
    };
    const enroulement = anneau(40, 22, 31.5, 11.5, 5, 9.4, K.bobinageMat(0.9));
    enroulement.position.set(0, 0, 16);
    const joue1 = anneau(42, 24.5, 31, 11, 4, 1, M.plastiqueNoir); joue1.position.set(0, 0, 10.8);
    const joue2 = joue1.clone(); joue2.position.z = 21.2;
    bobine.add(enroulement, joue1, joue2);
    /* les deux fils de la bobine vers A1 et A2 */
    const filA1 = K.fil([[-15, 9, 16], [-16.5, 13, 24], [-17, 22, 48], [-17, 27, 66]], 0.55, M.bobinage);
    const filA2 = K.fil([[-15, -9, 16], [-16.5, -13, 24], [-17, -22, 48], [-17, -27, 66]], 0.55, M.bobinage);
    bobine.add(filA1.mesh, filA2.mesh);
    racine.add(bobine);

    /* ---------------------------------------------------------------- l'équipage mobile */
    const mobile = new T.Group();              /* tout ce qui recule d'un bloc */
    const armature = K.mesh(new T.BoxGeometry(30, 38, 6), tolePlaque, 0, 0, 29);
    const equipage = new T.Group();
    const traverse = K.mesh(K.boite(36, 8, 4, 1), M.plastiqueMarine, 4.25, 0, Z_TRAVERSE);
    const tigeA = K.mesh(K.boite(2.6, 6, 32, 0.6), M.plastiqueMarine, -4.25, 0, 48);
    const tigeB = K.mesh(K.boite(2.6, 6, 32, 0.6), M.plastiqueMarine, 12.75, 0, 48);
    const talon = K.mesh(K.boite(10, 7, 4, 0.8), M.plastiqueMarine, 0, -25.5, 30);
    const liaison = K.mesh(K.boite(4, 7, 6, 0.6), M.plastiqueMarine, 0, -21, 29.5);
    const temoin = K.mesh(K.boite(8, 4, 5, 0.8), M.plastiqueOrange, 4.25, 0, 70.5);
    equipage.add(traverse, tigeA, tigeB, talon, liaison);
    mobile.add(armature, equipage, temoin);
    racine.add(mobile);

    /* le ressort de rappel : du socle au talon de l'équipage */
    const ressortRappel = K.ressort(2.7, 22, 6, 0.42, M.acier);
    ressortRappel.rotation.x = Math.PI / 2;          /* son axe Y passe en Z */
    ressortRappel.position.set(0, -25.5, 6);
    racine.add(ressortRappel);

    /* ---------------------------------------------------------------- les contacts */
    const contactsFixes = new T.Group(), ponts = new T.Group(), auxiliaire = new T.Group();
    const auxFixes = new T.Group(), auxMobile = new T.Group(); auxiliaire.add(auxFixes, auxMobile);
    const pontsListe = [];
    const ressortsPont = [];
    const poserFixe = (x, groupe, petit) => {
      const w = petit ? 3.6 : 4.6;
      [1, -1].forEach(s => {
        groupe.add(K.mesh(new T.BoxGeometry(w, 16, 1.6), M.cuivre, x, s * 18.5, 55.2));
        groupe.add(K.mesh(new T.BoxGeometry(w, 1.6, 17), M.cuivre, x, s * 26.5, 63));
        groupe.add(K.mesh(new T.BoxGeometry(w - 0.8, 3, 0.9), M.argent, x, s * 11.5, 56.4));
      });
    };
    const poserPont = (x, groupe, petit) => {
      const w = petit ? 3.6 : 4.6;
      const p = new T.Group();
      p.add(K.mesh(new T.BoxGeometry(w, 27, 1.6), M.cuivre, 0, 0, 0));
      p.add(K.mesh(new T.BoxGeometry(w - 0.8, 3, 0.9), M.argent, 0, 11.5, -1.25));
      p.add(K.mesh(new T.BoxGeometry(w - 0.8, 3, 0.9), M.argent, 0, -11.5, -1.25));
      p.position.set(x, 0, Z_TRAVERSE - 4.05);
      groupe.add(p);
      const r = K.ressort(1.1, 2.6, 3, 0.22, M.acier);
      r.rotation.x = Math.PI / 2; r.position.set(x, 0, 0);
      groupe.add(r);
      pontsListe.push(p); ressortsPont.push(r);
    };
    POLES.forEach(x => { poserFixe(x, contactsFixes); poserPont(x, ponts); });
    poserFixe(AUX, auxFixes, true); poserPont(AUX, auxMobile, true);
    racine.add(contactsFixes, ponts, auxiliaire);

    /* ---------------------------------------------------------------- les fils extérieurs */
    const fils = new T.Group();
    const filsHaut = [], filsBas = [];
    const COUL = ['L1', 'L2', 'L3'];
    POLES.forEach((x, i) => {
      const h = K.fil([[x, 58, 26], [x, 57, 44], [x, 50, 62], [x, 40, 66], [x, 33.8, 66]], 1.7, COUL[i]);
      const b = K.fil([[x, -33.8, 66], [x, -40, 66], [x, -50, 62], [x, -57, 44], [x, -58, 26]], 1.7, COUL[i]);
      fils.add(h.mesh, b.mesh); filsHaut.push(h); filsBas.push(b);
    });
    const filCmdA1 = K.fil([[-24, 56, 28], [-21, 53, 50], [-17, 43, 66], [-17, 33.8, 66]], 1.1, 'rouge');
    const filCmdA2 = K.fil([[-17, -33.8, 66], [-17, -43, 66], [-21, -53, 50], [-24, -56, 28]], 1.1, 'N');
    const fil13 = K.fil([[24, 56, 28], [21, 53, 50], [17, 43, 66], [17, 33.8, 66]], 1.1, 'rouge');
    const fil14 = K.fil([[17, -33.8, 66], [17, -43, 66], [21, -53, 50], [24, -56, 28]], 1.1, 'rouge');
    fils.add(filCmdA1.mesh, filCmdA2.mesh, fil13.mesh, fil14.mesh);
    racine.add(fils);

    /* ---------------------------------------------------------------- le courant */
    const grains = [];
    const cheminPole = (x, fh, fb) => K.chemin([
      fh.courbe, [x, 26.5, 66], [x, 26.5, 55.2], [x, 11.5, 55.2], [x, 11.5, 58.6], [x, -11.5, 58.6],
      [x, -11.5, 55.2], [x, -26.5, 55.2], [x, -26.5, 66], fb.courbe
    ]);
    const courantsPuissance = POLES.map((x, i) => {
      const c = K.courant(cheminPole(x, filsHaut[i], filsBas[i]), { pas: 6.5, rayon: 1.05, vitesse: 38 });
      c.regler({ debit: 0, alternatif: true, frequence: 0.7 });
      racine.add(c.objet); grains.push(c); return c;
    });
    const courantAux = K.courant(cheminPole(AUX, fil13, fil14), { pas: 6.5, rayon: 0.8, vitesse: 30 });
    courantAux.regler({ debit: 0, alternatif: true, frequence: 0.7 });
    racine.add(courantAux.objet); grains.push(courantAux);
    /* dans la bobine, le courant TOURNE : deux spires de grains autour de l'enroulement */
    const spires = [];
    const a0 = Math.atan2(9 / 11.9, -15 / 20.9), a1 = Math.atan2(-9 / 11.9, -15 / 20.9) + Math.PI * 2;
    const tour = (a1 - a0) + Math.PI * 4;     /* un peu plus de deux tours, de A1 vers A2 */
    for (let i = 0; i <= 110; i++) {
      const u = i / 110, a = a0 + u * tour, z = 11.6 + u * 8.8;
      const cx = Math.cos(a), cy = Math.sin(a);
      /* une ellipse arrondie qui épouse l'enroulement (40 × 22) */
      const ex = 20.9 * Math.sign(cx) * Math.pow(Math.abs(cx), 0.55), ey = 11.9 * Math.sign(cy) * Math.pow(Math.abs(cy), 0.55);
      spires.push(new T.Vector3(ex, ey, z));
    }
    const cheminBobine = K.chemin([filCmdA1.courbe, [-17, 27, 66], K.inverse(filA1), ...spires, filA2.courbe, [-17, -27, 66], filCmdA2.courbe]);
    const courantBobine = K.courant(cheminBobine, { pas: 5, rayon: 0.75, vitesse: 26 });
    courantBobine.regler({ debit: 0, alternatif: true, frequence: 0.7 });
    racine.add(courantBobine.objet); grains.push(courantBobine);

    /* le champ : il boucle dans le fer, par la colonne centrale et les colonnes extérieures */
    const champ = new T.Group();
    const flux = [];
    [-15.7, 15.7].forEach(x => [1, -1].forEach(s => {
      const f = K.formeArrondie(17, 19, 3.5);
      const pts = f.getSpacedPoints(60).map(p => new T.Vector3(x, s * 8 + p.x * 1, 16 + p.y));
      const fl = K.flux(new T.CatmullRomCurve3(pts, true), { rayon: 0.5, pas: 6, vitesse: 0.9, ferme: true });
      fl.regler({ intensite: 0, alternatif: false });
      champ.add(fl.objet); flux.push(fl);
    }));
    racine.add(champ);

    /* l'arc, à l'ouverture sous charge, sur chaque pôle de puissance */
    const arcs = POLES.map(x => {
      const a = K.arc(new T.Vector3(x, 11.5, 57.0), new T.Vector3(x, 11.5, 60.2), { rayon: 0.45, halo: 0.7 });
      const b = K.arc(new T.Vector3(x, -11.5, 57.0), new T.Vector3(x, -11.5, 60.2), { rayon: 0.45, halo: 0.7 });
      racine.add(a.objet, b.objet); return [a, b];
    }).flat();

    /* ---------------------------------------------------------------- l'état et le mouvement */
    const pos = K.mobile(0, 1100, 34);   /* 0 = ouvert, -COURSE = fermé ; raide : ça claque */
    let alimentee = false, ferme = false, tArc = 0, eclatee = false;
    /* raideur « atelier » (ça claque) ou « leçon » (l'œil suit l'armature, avec son rebond) */
    const raideur = lecon => { pos.k = lecon ? 160 : 1100; pos.c = lecon ? 13 : 34; };

    const placer = () => {
      const c = pos.x;
      mobile.position.z = c;
      /* le talon et le ressort de rappel */
      ressortRappel.longueur(22 + c);
      /* chaque pont suit la traverse, mais s'arrête sur les pastilles fixes (surcourse) */
      const zLibre = Z_TRAVERSE + c - 4.05, zButee = Z_PASTILLE_FIXE + 1.7;
      pontsListe.forEach((p, i) => {
        p.position.z = Math.max(zLibre, zButee);
        const r = ressortsPont[i];
        const zDosPont = p.position.z + 0.8, zTraverse = Z_TRAVERSE + c - 2;
        r.position.z = zDosPont; r.longueur(Math.max(0.3, zTraverse - zDosPont));
      });
      const contact = zLibre <= zButee + 0.02;
      if (contact !== ferme) {
        ferme = contact;
        if (!ferme && alimentee === false && !eclatee) tArc = 0.32;   /* coupure sous charge : l'arc */
        majCourant();
      }
    };
    const majCourant = () => {
      courantsPuissance.forEach(c => c.regler({ debit: ferme && !eclatee ? 1 : 0 }));
      courantAux.regler({ debit: ferme && !eclatee ? 1 : 0 });
      courantBobine.regler({ debit: alimentee && !eclatee ? 1 : 0 });
      flux.forEach(f => f.regler({ intensite: alimentee && !eclatee ? 1 : 0 }));
      ctx.mesures([
        { libelle: 'Bobine A1-A2', valeur: alimentee ? '230 V' : '0 V' },
        { libelle: 'Pôles de puissance', valeur: ferme ? 'fermés' : 'ouverts' },
        { libelle: 'Courant vers le moteur', valeur: ferme ? '6,5 A' : '0 A' }
      ]);
    };

    const PHRASES = {
      repos: '<strong>Bobine au repos.</strong> Le ressort de rappel tient l’armature éloignée du circuit fixe. Les ponts ne touchent pas les contacts fixes : rien ne passe vers le moteur.',
      alimentee: '<strong>Bobine alimentée.</strong> Entre A1 et A2, elle devient un aimant : l’armature est attirée et entraîne la traverse. Les quatre ponts se ferment <em>ensemble</em> — les trois pôles de puissance et le contact 13-14.'
    };

    const agir = (id, v) => {
      if (id === 'phase') {
        /* le mouvement découpé pour la leçon : le champ AVANT que l'armature bouge */
        raideur(true);
        if (v === 'repos') { alimentee = false; pos.cible = 0; }
        if (v === 'champ') { alimentee = true; pos.cible = 0; }
        if (v === 'attire') { alimentee = true; pos.cible = -COURSE; }
        if (v === 'coupure') { alimentee = false; pos.cible = 0; }
        ctx.regler('bobine', alimentee ? 'alimentee' : 'repos');
        majCourant(); return;
      }
      if (id !== 'bobine') return;
      raideur(false);
      alimentee = v === 'alimentee';
      pos.cible = alimentee ? -COURSE : 0;
      majCourant();
      ctx.dire(PHRASES[alimentee ? 'alimentee' : 'repos'] + (alimentee ? '' : ' À l’ouverture, un arc jaillit entre les contacts : la chambre de coupure l’étouffe.'));
    };

    placer(); majCourant();

    return {
      racine,
      /* « comprendre » : de côté, là où l'on voit l'armature avancer et reculer ;
         « découvrir » : de trois quarts face, comme on le voit dans l'armoire */
      vue: ctx.mode === 'decouvrir' ? { azimut: -26, elevation: 12, cadre: [socle, capot], marge: 1.12 }
                                    : { azimut: -62, elevation: 12, cadre: [socle, capot], marge: 1.1 },
      fond: 'platine',
      fantome: [socle, capot],
      phrase: PHRASES.repos,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier', objets: [capot, socle, griffe], desc: 'Il isole et protège. En vrai on ne l’ouvre pas : « Voir dedans » le rend transparent.' },
        { id: 'bobine', nom: 'La bobine (A1 – A2)', objets: [bobine], desc: 'Un enroulement de fil de cuivre verni. Alimentée entre A1 et A2, elle crée un champ magnétique.' },
        { id: 'fixe', nom: 'Le circuit magnétique fixe', objets: [circuitFixe], desc: 'Des tôles d’acier empilées : elles canalisent le champ de la bobine.' },
        { id: 'armature', nom: 'L’armature mobile', objets: [armature], desc: 'Attirée vers le circuit fixe quand la bobine est alimentée. Elle entraîne tout l’équipage.' },
        { id: 'equipage', nom: 'La traverse et le témoin', objets: [equipage, temoin], desc: 'La pièce qui porte les ponts. Le témoin orange, visible en façade, recule quand le contacteur est fermé.' },
        { id: 'ressort', nom: 'Le ressort de rappel', objets: [ressortRappel], desc: 'Dès que la bobine n’est plus alimentée, il repousse l’armature : le contacteur s’ouvre tout seul.' },
        { id: 'fixes', nom: 'Les contacts fixes', objets: [contactsFixes], desc: 'Reliés aux bornes : 1, 3, 5 en haut (l’arrivée), 2, 4, 6 en bas (vers le moteur).' },
        { id: 'ponts', nom: 'Les ponts de contact', objets: [ponts], desc: 'Trois ponts mobiles, un par phase. Un petit ressort les plaque sur les contacts fixes.' },
        { id: 'aux', nom: 'Le contact 13 – 14', objets: [auxiliaire, bornesAux], desc: 'Un contact « NO » de commande. Il se ferme en même temps que les pôles : c’est lui qui sert à l’auto-maintien.' },
        { id: 'bornes', nom: 'Les bornes de puissance', objets: [bornesPuissance], desc: '1/L1, 3/L2, 5/L3 reçoivent le réseau ; 2/T1, 4/T2, 6/T3 partent vers le moteur.' },
        { id: 'bornesBobine', nom: 'Les bornes A1 et A2', objets: [bornesBobine], desc: 'L’entrée de la bobine. C’est le circuit de COMMANDE : quelques watts suffisent à commander des kilowatts.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], desc: 'Le contacteur s’y clipse, comme tout l’appareillage modulaire.' }
      ],
      commandes: [
        { id: 'bobine', type: 'choix', options: [['repos', 'Bobine au repos'], ['alimentee', 'Bobine alimentée']], valeur: 'repos' }
      ],
      /* le mouvement, pas à pas : un seul évènement par étape, vu de là où il se voit */
      etapes: [
        { titre: 'Au repos', piece: 'ressort', voirDedans: true, actions: [['phase', 'repos']],
          vue: { azimut: -62, elevation: 12, zoom: 1.12 },
          texte: 'Le ressort de rappel tient l’armature éloignée du circuit fixe. Les ponts ne touchent pas les contacts fixes : le moteur n’est pas alimenté.' },
        { titre: 'On alimente la bobine : le champ apparaît', piece: 'bobine', ralenti: true, actions: [['phase', 'champ']],
          vue: { azimut: -72, elevation: 16, zoom: 1.7, cible: [0, 0, 22] },
          texte: 'Le courant de commande entre par A1 et ressort par A2. Il tourne dans la bobine — suivez les grains — et crée un champ magnétique, les tirets bleus, qui se referme dans les tôles.' },
        { titre: 'L’armature est attirée', piece: 'armature', ralenti: true, actions: [['phase', 'attire']],
          vue: { azimut: -88, elevation: 6, zoom: 1.5, cible: [0, 0, 34] }, duree: 7,
          texte: 'Le champ tire l’armature contre le circuit fixe : l’espace entre les deux se ferme d’un coup. L’armature emporte la traverse et tous les ponts avec elle.' },
        { titre: 'Les quatre ponts se ferment ensemble', piece: 'ponts',
          vue: { azimut: -30, elevation: 10, zoom: 1.45, cible: [4, 0, 56] },
          texte: 'Les trois ponts de puissance touchent leurs contacts fixes en même temps : le courant passe vers le moteur. Le contact 13-14 se ferme aussi. En façade, le témoin orange a reculé.' },
        { titre: 'On coupe la bobine : le ressort ramène tout', piece: 'ressort', ralenti: true, actions: [['phase', 'coupure']],
          vue: { azimut: -62, elevation: 12, zoom: 1.12 }, duree: 7,
          texte: 'Plus de courant dans la bobine, plus de champ : le ressort repousse l’armature. Les contacts s’écartent sous charge, un arc jaillit — la chambre de coupure l’étouffe.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : l'équipage mobile sort, puis le capot avec les
         contacts fixes et les bornes, puis la bobine glisse hors de son noyau */
      eclate: [
        { objets: [mobile, ponts, auxMobile], vers: [0, 92, 22], debut: 0, fin: 0.45 },
        { objets: [capot, marquages, fenetre], vers: [0, 0, 128], debut: 0.25, fin: 0.75 },
        { objets: [bornesPuissance, bornesBobine, bornesAux, contactsFixes, auxFixes, fils], vers: [0, 0, 62], debut: 0.4, fin: 0.9 },
        { objets: [bobine], vers: [0, 0, 20], debut: 0.55, fin: 1 },
        { objets: [ressortRappel], vers: [0, -18, 26], debut: 0.55, fin: 1 }
      ],
      eclateVue: { azimut: -44, elevation: 20, zoom: 0.5, cible: [0, 30, 75] },
      surEclate(on) { eclatee = on; if (on) { tArc = 0; arcs.forEach(a => a.regler(false)); } majCourant(); },
      agir,
      animer(dt) {
        const bouge = pos.pas(dt);
        if (bouge) placer();
        let actif = bouge;
        grains.forEach(g => { if (g.animer(dt)) actif = true; });
        flux.forEach(f => { if (f.animer(dt)) actif = true; });
        if (tArc > 0) { tArc -= dt; arcs.forEach(a => a.regler(tArc > 0)); }
        arcs.forEach(a => { if (a.animer(dt)) actif = true; });
        return actif || tArc > 0;
      }
    };
  }, { famille: 'commande', titre: 'Le contacteur', stations: ['5.2', '5.3', '5.9'] });
})();
