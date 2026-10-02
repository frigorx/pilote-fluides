/* ÉlectroRézo 3D — famille « machines » : l'électro-aimant (6.1), le transformateur (6.2),
   la plaque à bornes (6.4), le moteur monophasé et son condensateur (6.5), la machine à
   courant continu et le moteur synchrone (6.6). Le moteur asynchrone triphasé est dans moteur.js.
   Unités : mm. Repère : X largeur, Y hauteur, Z profondeur (+Z = face avant).

   Le cours de chaque station fait foi : mêmes libellés de commandes que ses scènes dessinées
   (stations/_commun/schemas-machines.js), mêmes valeurs. Les doutes sont dans
   chantier-3d/fiches/machines.md. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  const D = Math.PI / 180;
  const nb = (v, d) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ================================================================ briques de la famille
     (à remonter dans le kit si d'autres familles en ont besoin — voir la fiche) */
  const outils = (T, K) => {
    const M = K.mat;
    /* un bloc de tôles empilées le long de Z (les feuilles sont dans le plan XY) : les
       tranches des tôles se voient sur les quatre côtés, la face avant est la première tôle */
    const toleRayee = K.toleFeuilletee();
    const blocTole = (w, h, d, x, y, z, pas) => {
      pas = pas || 1.2;
      const g = new T.BoxGeometry(w, h, d);
      const uv = g.attributes.uv, p = g.attributes.position;
      for (let i = 0; i < uv.count; i++) {
        const f = Math.floor(i / 4);
        if (f < 4) uv.setXY(i, (p.getZ(i) + d / 2) / (8 * pas), 0.5);
        else uv.setXY(i, 0.04 + ((p.getX(i) + p.getY(i)) > 0 ? 0.0004 : 0), 0.5);
      }
      const m = new T.Mesh(g, toleRayee);
      m.position.set(x, y, z);
      return m;
    };
    /* un anneau à coins arrondis (vu de dessus), extrudé le long de Y : un bobinage, une joue */
    const anneauRect = (wo, dO, wi, di, h, ro, ri) => {
      const f = K.formeArrondie(wo, dO, ro); f.holes.push(K.formeArrondie(wi, di, ri));
      const g = K.extrusion(f, h); g.rotateX(-Math.PI / 2);
      return g;
    };
    /* une hélice qui épouse un bobinage rectangulaire arrondi (demi-côtés hx, hz) */
    const spirale = (hx, hz, y0, y1, a0, tours, n) => {
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const u = i / n, a = a0 + u * tours * Math.PI * 2;
        const s = Math.sin(a), c = Math.cos(a);
        pts.push(new T.Vector3(hx * Math.sign(s) * Math.pow(Math.abs(s), 0.4), y0 + (y1 - y0) * u, hz * Math.sign(c) * Math.pow(Math.abs(c), 0.4)));
      }
      return pts;
    };
    /* une boucle de champ (rectangle arrondi dans le plan XY, à z donné) */
    const boucle = (x0, x1, y0, y1, r, z, dy) => {
      const f = K.formeArrondie(x1 - x0, y1 - y0, r);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 - (dy || 0);
      return new T.CatmullRomCurve3(f.getSpacedPoints(90).map(p => new T.Vector3(cx + p.x, cy + p.y, z)), true);
    };
    return { M, blocTole, anneauRect, spirale, boucle };
  };

  /* ================================================================ 6.1 — l'électro-aimant
     Un noyau en E feuilleté, la bobine sur la colonne centrale, une palette (l'armature) portée
     par deux colonnes de guidage : deux ressorts la repoussent vers le haut, contre ses butées.
     Sous le seuil (0,62 A, la scène de la station), rien ne bouge ; au-delà, elle claque.
     L'entrefer est exagéré (9 mm au lieu de 2 à 3) pour se voir. */
  Electro3D.definir('electroAimant', (T, K, ctx) => {
    const O = outils(T, K), M = O.M;
    const racine = new T.Group();
    const GAP = 9, SEUIL = 0.62;

    /* ---------------------------------------------------------------- le socle et le noyau */
    const socle = new T.Group();
    socle.add(K.mesh(K.boite(170, 10, 90, 2), M.plastique, 0, -5, 0));
    const noyau = new T.Group();
    noyau.add(O.blocTole(66, 11, 30, 0, 5.5, 0));
    [-27.5, 0, 27.5].forEach((x, i) => noyau.add(O.blocTole(i === 1 ? 22 : 11, 33, 30, x, 27.5, 0)));
    /* deux équerres d'acier tiennent le noyau sur le socle */
    [-1, 1].forEach(s => {
      socle.add(K.mesh(K.boite(3, 20, 30, 0.6), M.acierSombre, s * 34.5, 10, 0));
      socle.add(K.mesh(K.boite(10, 3, 30, 0.6), M.acierSombre, s * 39, 1.5, 0));
      [-8, 8].forEach(z => { const v = K.vis(2.2); v.position.set(s * 40, 3, z); socle.add(v); });
    });
    racine.add(socle, noyau);

    /* ---------------------------------------------------------------- la bobine */
    const bobine = new T.Group();
    const matFil = K.bobinageMat(0.055); matFil.side = T.DoubleSide;
    const matJoue = K.propre(M.plastiqueNoir); matJoue.side = T.DoubleSide;
    const enroulement = K.mesh(O.anneauRect(42, 50, 24.6, 32.6, 27, 6, 1.5), matFil, 0, 27.5, 0);
    const manchon = K.mesh(O.anneauRect(24.6, 32.6, 23, 31, 29.6, 1.5, 1), matJoue, 0, 27.5, 0);
    const joueBas = K.mesh(O.anneauRect(47, 55, 23, 31, 1.4, 5, 1), matJoue, 0, 13.3, 0);
    const joueHaut = K.mesh(O.anneauRect(47, 55, 23, 31, 1.4, 5, 1), matJoue, 0, 41.7, 0);
    bobine.add(enroulement, manchon, joueBas, joueHaut);
    /* la coupe : la section du fil, à plat sur le plan z = 0 */
    const sections = new T.Group(); sections.visible = false;
    [-1, 1].forEach(s => sections.add(K.mesh(new T.PlaneGeometry(8.6, 27), K.bobinageMat(0.06), s * 16.6, 27.5, 0.05)));
    bobine.add(sections);
    racine.add(bobine);

    /* ---------------------------------------------------------------- l'équipage mobile */
    const mobile = new T.Group();
    const armature = O.blocTole(66, 11, 30, 0, 44 + GAP + 5.5, 0);
    const porteur = new T.Group();
    porteur.add(K.mesh(K.boite(112, 5, 26, 1.5), M.aluminium, 0, 66.5, 0));
    [-20, 20].forEach(x => { const v = K.vis(2.4); v.position.set(x, 69, 0); porteur.add(v); });
    mobile.add(armature, porteur);
    racine.add(mobile);

    /* les colonnes de guidage, leurs bagues et les écrous de butée */
    const guides = new T.Group(), butees = new T.Group();
    const ressorts = [];
    const groupeRessorts = new T.Group();
    [-48, 48].forEach(x => {
      guides.add(K.mesh(K.cylindre(3, 82, 20), M.acier, x, 41, 0));
      guides.add(K.mesh(K.cylindre(5.2, 4, 20), M.acierSombre, x, 28, 0));
      butees.add(K.mesh(K.cylindre(5.6, 5, 6), M.zingue, x, 71.5, 0));
      const r = K.ressort(5.4, 34, 7, 0.8, M.acier); r.position.set(x, 30, 0);
      groupeRessorts.add(r); ressorts.push(r);
    });
    racine.add(guides, butees, groupeRessorts);

    /* ---------------------------------------------------------------- le bornier et les fils */
    const bornier = new T.Group();
    bornier.add(K.mesh(K.boite(30, 10, 14, 1.5), M.plastiqueSombre, -55, 5, 27));
    const XB = { A1: -62, A2: -48 };
    Object.keys(XB).forEach(n => {
      const b = K.borne(); b.position.set(XB[n], 6.5, 31); bornier.add(b);
      bornier.add(K.mesh(K.boite(4.4, 3.6, 1.2, 0.3), M.sombre, XB[n], 6.5, 19.7));
      const g = K.gravure(n, 3, { couleur: '#f1efe8' }); g.rotation.x = -Math.PI / 2; g.position.set(XB[n], 10.1, 23.5); bornier.add(g);
    });
    const spires = O.spirale(21.8, 25.8, 39, 16, -0.5, 3, 150);
    const S0 = spires[0], S1 = spires[spires.length - 1];
    const sortieA1 = K.fil([[XB.A1, 6.5, 19.6], [-60, 12, 17], [-45, 28, 26], [-24, 40, 30], S0], 0.7, M.bobinage);
    const sortieA2 = K.fil([S1, [-26, 13, 30], [-44, 9, 22], [XB.A2, 6.5, 19.6]], 0.7, M.bobinage);
    bobine.add(sortieA1.mesh, sortieA2.mesh);
    const ext = n => K.fil([[XB[n], 6.5, 34.2], [XB[n], 6.5, 40], [XB[n], 1.5, 46.5], [XB[n], -8.6, 52], [XB[n], -8.6, 88]], 1.4, n === 'A1' ? 'rouge' : 'N');
    const extA1 = ext('A1'), extA2 = ext('A2');
    bornier.add(extA1.mesh, extA2.mesh);
    racine.add(bornier);

    /* ---------------------------------------------------------------- le courant (continu : il avance) */
    const courantFils = K.courant(K.chemin([K.inverse(extA1), [XB.A1, 6.5, 31], [XB.A1, 6.5, 19.6], sortieA1.courbe]), { pas: 6, rayon: 0.9, vitesse: 30 });
    const courantSpires = K.courant(K.chemin(spires), { pas: 5, rayon: 0.9, vitesse: 30 });
    const courantRetour = K.courant(K.chemin([sortieA2.courbe, [XB.A2, 6.5, 31], extA2.courbe]), { pas: 6, rayon: 0.9, vitesse: 30 });
    const courants = [courantFils, courantSpires, courantRetour];
    courants.forEach(c => racine.add(c.objet));

    /* ---------------------------------------------------------------- le champ
       deux boucles de chaque côté : colonne centrale → entrefer → palette → colonne extérieure
       → culasse. Elles suivent la palette (échelle en Y autour de la culasse). */
    const champ = new T.Group(); champ.position.y = 5.5;
    const fluxInt = [], fluxExt = [];
    [-1, 1].forEach(s => {
      const a = K.flux(O.boucle(Math.min(s * 8, s * 25), Math.max(s * 8, s * 25), 7, 55, 4, 15.8, 5.5), { rayon: 0.75, pas: 7, vitesse: 0.9 });
      const b = K.flux(O.boucle(Math.min(s * 3, s * 30.5), Math.max(s * 3, s * 30.5), 2.5, 61.5, 5, 15.8, 5.5), { rayon: 0.75, pas: 7, vitesse: 0.9 });
      champ.add(a.objet, b.objet); fluxInt.push(a); fluxExt.push(b);
    });
    racine.add(champ);
    const flux = fluxInt.concat(fluxExt);

    /* ---------------------------------------------------------------- l'état */
    const pos = K.mobile(0, 1100, 30);   /* 0 = écartée, -GAP = collée ; raide : elle claque */
    const E = { I: 0.5 };
    const placer = () => {
      mobile.position.y = pos.x;
      ressorts.forEach(r => r.longueur(34 + pos.x));
      champ.scale.y = (53 + pos.x) / 53;
    };
    const maj = () => {
      const I = E.I, colle = I > SEUIL, F = Math.round(I * I * 260);
      pos.cible = colle ? -GAP : 0;
      courants.forEach(c => c.regler({ debit: K.clamp(I / 1.1, 0.12, 1), vitesse: 10 + 34 * I }));
      fluxInt.forEach(f => f.regler({ intensite: K.clamp(I / 0.7, 0.15, 1), vitesse: 0.4 + I }));
      fluxExt.forEach(f => f.regler({ intensite: K.clamp((I - 0.3) / 0.45, 0, 1), vitesse: 0.4 + I }));
      ctx.mesures([
        { libelle: 'Le courant', valeur: nb(I, 2) + ' A' },
        { libelle: 'La force d’attraction', valeur: F + ' N' },
        { libelle: 'La palette', valeur: colle ? 'collée' : 'retenue par le ressort' }
      ]);
      ctx.dire(colle
        ? '<strong>Le courant suffit — la palette vient coller.</strong> L’aimant a dépassé la force des ressorts : l’entrefer se referme d’un coup, la palette claque contre le noyau. La force suit le CARRÉ du courant.'
        : '<strong>Le courant est trop faible — le ressort l’emporte.</strong> Le champ traverse le fer et l’entrefer, mais sa force reste sous celle des ressorts : la palette ne bouge pas d’un millimètre. Montez doucement : il y a un seuil.');
    };
    const PHASES = { faible: 0.3, monte: 0.58, seuil: 0.8, baisse: 0.1 };

    const basculerCoupe = on => {
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      [matFil, matJoue, courantSpires.objet.material].forEach(m => { m.clippingPlanes = plan; m.needsUpdate = true; });
      sections.visible = on;
    };

    placer(); maj();
    const vueComprendre = { azimut: 22, elevation: 10, cadre: [noyau, mobile, guides], marge: 1.12 };
    const vueEtape = { azimut: 16, elevation: 6, zoom: 1.08 };

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 34, elevation: 20, cadre: [noyau, mobile, guides, socle], marge: 1.05 } : vueComprendre,
      phrase: undefined,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: false,
      pieces: [
        { id: 'bobine', nom: 'La bobine (A1 – A2)', objets: [bobine], desc: 'Du fil de cuivre verni, enroulé des centaines de fois sur la colonne du milieu. Le courant qui y tourne crée le champ.' },
        { id: 'noyau', nom: 'Le noyau de fer feuilleté', objets: [noyau], desc: 'Des tôles d’acier empilées, en forme de E. Il canalise le champ : sans lui, la bobine attirerait à peine.' },
        { id: 'armature', nom: 'La palette (l’armature)', objets: [armature], desc: 'Le morceau de fer mobile, feuilleté lui aussi. C’est elle que l’aimant attire.' },
        { id: 'porteur', nom: 'Le porte-palette', objets: [porteur], desc: 'Une barre d’aluminium (qui n’est pas attirée) : elle porte la palette et coulisse sur les deux colonnes.' },
        { id: 'ressorts', nom: 'Les ressorts de rappel', objets: [groupeRessorts], desc: 'Ils repoussent la palette vers le haut. Ce sont eux qui fixent le seuil : tant que l’aimant est plus faible qu’eux, rien ne bouge.' },
        { id: 'guides', nom: 'Les colonnes et les butées', objets: [guides, butees], desc: 'Deux tiges d’acier guident la palette ; les écrous du haut l’arrêtent quand le ressort la renvoie.' },
        { id: 'bornier', nom: 'Le bornier et les fils', objets: [bornier], desc: 'Les deux bornes A1 et A2 : c’est par là que le courant entre dans la bobine et en ressort.' },
        { id: 'socle', nom: 'Le socle et les équerres', objets: [socle], desc: 'Tout est vissé dessus : le noyau ne bouge jamais, seule la palette se déplace.' }
      ],
      commandes: [
        { id: 'courant', type: 'curseur', libelle: 'Le courant dans la bobine', min: 0.1, max: 1.2, pas: 0.02, valeur: 0.5, format: v => nb(v, 2) + ' A' }
      ],
      etapes: [
        { titre: 'Un faible courant : la palette ne bouge pas', texte: 'Le courant tourne dans la bobine et fait naître un champ faible dans le fer (les lignes bleues). Les ressorts poussent la palette vers le haut plus fort que l’aimant ne la tire : l’entrefer reste ouvert.', actions: [['phase', 'faible']], piece: 'ressorts', voirDedans: false, vue: vueEtape },
        { titre: 'Le courant monte : le champ grandit', texte: 'Plus de courant, plus de champ : les lignes bleues se doublent et filent plus vite. La force grandit comme le carré du courant… mais elle reste encore sous celle des ressorts.', actions: [['phase', 'monte']], piece: 'noyau', voirDedans: true, vue: vueEtape },
        { titre: 'Au-delà du seuil : la palette claque contre le noyau', texte: 'L’aimant dépasse les ressorts. Dès que l’entrefer se referme, la force grandit encore : tout se fait d’un coup, la palette vient coller.', actions: [['phase', 'seuil']], piece: 'armature', ralenti: true, vue: vueEtape },
        { titre: 'Le courant redescend : les ressorts la renvoient', texte: 'Sous le seuil, l’aimant ne retient plus la palette : les ressorts la repoussent jusqu’aux écrous de butée, l’entrefer se rouvre.', actions: [['phase', 'baisse']], piece: 'ressorts', ralenti: true, vue: vueEtape }
      ],
      eclate: [
        { objets: [butees], vers: [0, 78, 0] },
        { objets: [mobile], vers: [0, 62, 0] },
        { objets: [groupeRessorts], vers: [0, 30, 0] },
        { objets: [bobine], vers: [0, 38, 0] }
      ],
      eclateVue: { azimut: 24, elevation: 14, zoom: 0.6 },
      surEclate(on) { courants.forEach(c => { c.objet.visible = !on; }); champ.visible = !on; },
      agir(id, v) {
        if (id === 'courant') E.I = +v;
        if (id === 'phase' && PHASES[v] !== undefined) { E.I = PHASES[v]; ctx.regler('courant', E.I); }
        maj();
      },
      animer(dt) {
        const bouge = pos.pas(dt);
        if (bouge) placer();
        courants.forEach(c => c.animer(dt));
        flux.forEach(f => f.animer(dt));
        return true;
      }
    };
  }, { famille: 'machines', titre: 'La bobine et l’électro-aimant', stations: ['6.1'] });

  /* ================================================================ 6.2 — le transformateur
     Un transformateur monophasé à colonnes : un circuit magnétique en O (deux colonnes, deux
     culasses, tôles empilées), le primaire sur la colonne de gauche, le secondaire sur celle de
     droite. Aucun fil ne relie les deux côtés : seul le flux, qui va et vient dans le fer.
     Valeurs de la scène de la station : N1 = 1000 spires, U1 = 230 V, P = 460 W.
     Le secondaire garde le même volume de cuivre : peu de spires = du gros fil (beaucoup de
     courant), beaucoup de spires = du fil fin. Ses fils de sortie grossissent avec I2. */
  Electro3D.definir('transformateur', (T, K, ctx) => {
    const O = outils(T, K), M = O.M;
    const racine = new T.Group();
    const N1 = 1000, U1 = 230, P = 460, XP = -55, XS = 55;

    /* ---------------------------------------------------------------- le socle */
    const socle = K.mesh(K.boite(290, 10, 160, 2.5), M.plastique, 0, -5, 0);
    racine.add(socle);

    /* ---------------------------------------------------------------- le circuit magnétique */
    const circuit = new T.Group(), culasseHaut = new T.Group();
    circuit.add(O.blocTole(150, 40, 50, 0, 20, 0, 1.6));
    circuit.add(O.blocTole(40, 100, 50, XP, 90, 0, 1.6));
    circuit.add(O.blocTole(40, 100, 50, XS, 90, 0, 1.6));
    culasseHaut.add(O.blocTole(150, 40, 50, 0, 160, 0, 1.6));
    /* le serrage : deux paires de cornières boulonnées, les pattes posées sur le socle */
    const serrageBas = new T.Group(), serrageHaut = new T.Group();
    [-1, 1].forEach(s => {
      serrageBas.add(K.mesh(K.boite(170, 14, 4, 0.8), M.acierSombre, 0, 7, s * 27));
      serrageBas.add(K.mesh(K.boite(170, 4, 20, 0.8), M.acierSombre, 0, 2, s * 39));
      serrageHaut.add(K.mesh(K.boite(170, 14, 4, 0.8), M.acierSombre, 0, 173, s * 27));
      [-78, 78].forEach(x => { const v = K.vis(2.6); v.position.set(x, 4, s * 42); serrageBas.add(v); });
    });
    [[serrageBas, 7], [serrageHaut, 173]].forEach(([g, y]) => [-80, 80].forEach(x => {
      const b = K.mesh(K.cylindre(2.6, 64, 12), M.zingue, x, y, 0); b.rotation.x = Math.PI / 2; g.add(b);
      [-1, 1].forEach(s => { const e = K.mesh(K.cylindre(4.4, 3, 6), M.zingue, x, y, s * 30.5); e.rotation.x = Math.PI / 2; g.add(e); });
    }));
    racine.add(circuit, culasseHaut, serrageBas, serrageHaut);

    /* ---------------------------------------------------------------- les deux bobinages */
    const coupables = [];
    const bobinage = (cx, teinte) => {
      const g = new T.Group();
      const mat = K.bobinageMat(0.078); mat.side = T.DoubleSide; mat.color.setHex(teinte);
      const joue = K.propre(M.plastiqueNoir); joue.side = T.DoubleSide;
      g.add(K.mesh(O.anneauRect(70, 80, 44, 54, 88, 9, 3), mat, cx, 90, 0));
      g.add(K.mesh(O.anneauRect(44, 54, 41, 51, 92, 3, 2), joue, cx, 90, 0));
      [44.5, 135.5].forEach(y => g.add(K.mesh(O.anneauRect(76, 86, 41, 51, 1.6, 10, 2), joue, cx, y, 0)));
      const sec = new T.Group(); sec.visible = false;
      [-1, 1].forEach(s => sec.add(K.mesh(new T.PlaneGeometry(13, 88), mat, cx + s * 28.5, 90, 0.05)));
      g.add(sec);
      coupables.push(mat, joue);
      return { g, mat, sec };
    };
    const prim = bobinage(XP, 0xffffff), seco = bobinage(XS, 0xffd2b0);
    racine.add(prim.g, seco.g);

    /* ---------------------------------------------------------------- borniers, fils, voltmètres */
    const bornier = (cx, noms) => {
      const g = new T.Group();
      g.add(K.mesh(K.boite(34, 12, 14, 1.5), M.plastiqueSombre, cx, 6, 58));
      const xs = [cx - 8, cx + 8];
      xs.forEach((x, i) => {
        const b = K.borne(); b.position.set(x, 7.5, 62); g.add(b);
        g.add(K.mesh(K.boite(4.4, 3.6, 1.2, 0.3), M.sombre, x, 7.5, 50.7));
        const t = K.gravure(noms[i], 3, { couleur: '#f1efe8' }); t.rotation.x = -Math.PI / 2; t.position.set(x, 12.1, 54); g.add(t);
      });
      return { g, xs };
    };
    const bP = bornier(XP, ['H1', 'H2']), bS = bornier(XS, ['X1', 'X2']);
    racine.add(bP.g, bS.g);
    /* les sorties des bobinages, du bas et du haut de l'enroulement vers le bornier */
    const spiraleDe = cx => O.spirale(35.8, 40.8, 50, 130, 0, 4, 220).map(p => p.add(new T.Vector3(cx, 0, 0)));
    const sorties = (cx, xs, g) => {
      const sp = spiraleDe(cx), a = sp[0], b = sp[sp.length - 1];
      const f1 = K.fil([[xs[0], 7.5, 50.6], [xs[0], 22, 47], [cx - 4, 42, 44], a], 1.0, M.bobinage);
      const f2 = K.fil([b, [cx + 6, 129, 46], [xs[1], 70, 49], [xs[1], 22, 49], [xs[1], 7.5, 50.6]], 1.0, M.bobinage);
      g.add(f1.mesh, f2.mesh);
      return { sp, f1, f2 };
    };
    const sP = sorties(XP, bP.xs, prim.g), sS = sorties(XS, bS.xs, seco.g);
    /* l'arrivée du réseau (marron, bleu) et le départ vers l'utilisation (rouges) */
    const cable = (x, sens, iso, r) => K.fil([[x, 7.5, 65.8], [x, 7.5, 72], [x, 1.5, 80.5], [x, -8, 86], [x + sens * 30, -8, 128]], r, iso);
    const arrivee = new T.Group();
    const aL = cable(bP.xs[0], -1, 'L1', 1.3), aN = cable(bP.xs[1], -1, 'N', 1.3);
    arrivee.add(aL.mesh, aN.mesh);
    const depart = new T.Group();
    const matDepart = K.isolant('rouge');
    const dX1 = cable(bS.xs[0], 1, matDepart, 1.3), dX2 = cable(bS.xs[1], 1, matDepart, 1.3);
    depart.add(dX1.mesh, dX2.mesh);
    racine.add(arrivee, depart);
    const epaisseurDepart = r => [dX1, dX2].forEach(f => {
      const old = f.mesh.geometry;
      f.mesh.geometry = new T.TubeGeometry(f.courbe, Math.max(8, Math.round(f.longueur / 1.2)), r, 12, false);
      old.dispose();
    });
    /* deux voltmètres de tableau, branchés sur les borniers */
    const voltmetre = (cx, xs) => {
      const g = new T.Group();
      g.add(K.mesh(K.boite(54, 10, 30, 2), M.plastiqueSombre, cx, 5, 34));
      const boitier = new T.Group();
      boitier.add(K.mesh(K.boite(60, 38, 24, 2.5), M.plastiqueNoir, 0, 0, 0));
      const ecran = K.ecran(46, 20, { fond: '#c9d6b3', encre: '#1a2a14' });
      ecran.mesh.position.set(0, 2, 12.15); boitier.add(ecran.mesh);
      const unite = K.gravure('V ~', 3.2, { couleur: '#e9edf2' }); unite.position.set(0, -13.5, 12.2); boitier.add(unite);
      boitier.position.set(cx, 29, 34); boitier.rotation.x = -0.32;
      g.add(boitier);
      const fils = [['rouge', xs[0]], ['L2', xs[1]]].map(([c, x], i) => K.fil([[cx + (i ? 10 : -10) * Math.sign(-cx), 18, 26], [cx * 0.75, 16, 46], [x, 14.5, 58], [x, 11.3, 62]], 0.7, c));
      fils.forEach(f => g.add(f.mesh));
      return { g, ecran };
    };
    const vP = voltmetre(-122, bP.xs), vS = voltmetre(122, bS.xs);
    racine.add(vP.g, vS.g);

    /* ---------------------------------------------------------------- le courant (alternatif : il va et vient) */
    const courant = (pts, opts) => { const c = K.courant(K.chemin(pts), opts); c.regler({ alternatif: true, frequence: 0.5, debit: 1 }); racine.add(c.objet); return c; };
    const cPfils = courant([K.inverse(aL), [bP.xs[0], 7.5, 62], [bP.xs[0], 7.5, 50.6], sP.f1.courbe], { pas: 9, rayon: 1.1, vitesse: 26 });
    const cPspires = courant(sP.sp, { nombre: 60, rayon: 1.1, vitesse: 26 });
    const cPretour = courant([sP.f2.courbe, [bP.xs[1], 7.5, 62], aN.courbe], { pas: 9, rayon: 1.1, vitesse: 26 });
    const cSfils = courant([K.inverse(dX1), [bS.xs[0], 7.5, 62], [bS.xs[0], 7.5, 50.6], sS.f1.courbe], { pas: 9, rayon: 1.1, vitesse: 26 });
    const cSspires = courant(sS.sp, { nombre: 60, rayon: 1.1, vitesse: 26 });
    const cSretour = courant([sS.f2.courbe, [bS.xs[1], 7.5, 62], dX2.courbe], { pas: 9, rayon: 1.1, vitesse: 26 });
    const cPrim = [cPfils, cPspires, cPretour], cSec = [cSfils, cSspires, cSretour];
    coupables.push(cPspires.objet.material, cSspires.objet.material);

    /* ---------------------------------------------------------------- le flux, qui va et vient dans le fer */
    const champ = new T.Group();
    const flux = [[-55, 55, 20, 160, 16], [-45, 45, 30, 150, 8]].map(([x0, x1, y0, y1, r]) => {
      const f = K.flux(O.boucle(x0, x1, y0, y1, r, 25.9), { rayon: 1.0, pas: 10 });
      f.regler({ intensite: 1 }); champ.add(f.objet); return f;
    });
    racine.add(champ);

    /* ---------------------------------------------------------------- l'état */
    const E = { N2: 100, primaire: true, flux: true, secondaire: true, t: 0 };
    const calcul = () => { const U2 = U1 * E.N2 / N1; return { U2, I1: P / U1, I2: P / U2 }; };
    const maj = () => {
      const r = calcul();
      /* le fil du secondaire : même volume de cuivre, donc d ∝ 1/√N2 (0,8 mm au primaire) */
      const d = 0.8 * Math.sqrt(N1 / E.N2);
      seco.mat.map.repeat.set(1, 1 / (16 * d));
      epaisseurDepart(K.clamp(1.3 * Math.sqrt(r.I2 / r.I1), 0.8, 5.2));
      cPrim.forEach(c => c.regler({ debit: E.primaire ? 1 : 0 }));
      cSec.forEach(c => c.regler({ debit: E.secondaire ? K.clamp(0.35 + 0.65 * r.I2 / 20, 0.35, 1) : 0, vitesse: 10 + 16 * Math.min(1, r.I2 / 20) }));
      flux.forEach(f => f.regler({ intensite: E.flux ? 1 : 0 }));
      vP.ecran.ecrire(E.primaire ? [nb(U1, 1)] : ['0,0']);
      vS.ecran.ecrire(E.secondaire ? [nb(r.U2, 1)] : ['0,0']);
      ctx.mesures([
        { libelle: 'Primaire (1000 spires)', valeur: U1 + ' V · ' + nb(r.I1, 2) + ' A' },
        { libelle: 'Secondaire (' + E.N2 + ' spires)', valeur: nb(r.U2, 1) + ' V · ' + nb(r.I2, r.I2 < 10 ? 2 : 1) + ' A' },
        { libelle: 'La puissance', valeur: P + ' W' }
      ]);
      const sens = r.U2 < U1 ? 'Il abaisse' : r.U2 > U1 ? 'Il élève' : 'Il laisse la tension telle quelle';
      ctx.dire('<strong>' + sens + '.</strong> ' + E.N2 + ' spires au secondaire pour 1000 au primaire : la tension suit le rapport des spires, ' + nb(r.U2, 1) + ' V. Le courant fait l’inverse (' + nb(r.I2, 1) + ' A) — regardez l’épaisseur des fils de sortie. La puissance, elle, ne bouge pas : ' + P + ' W. <em>À l’écran, l’alternance est ralentie.</em>');
    };
    const PHASES = {
      primaire: { primaire: true, flux: false, secondaire: false },
      flux: { primaire: true, flux: true, secondaire: false },
      induction: { primaire: true, flux: true, secondaire: true, N2: 1000 },
      abaisse: { primaire: true, flux: true, secondaire: true, N2: 100 },
      eleve: { primaire: true, flux: true, secondaire: true, N2: 2000 }
    };
    const basculerCoupe = on => {
      const plan = on ? [new T.Plane(new T.Vector3(0, 0, -1), 0)] : null;
      coupables.forEach(m => { m.clippingPlanes = plan; m.needsUpdate = true; });
      prim.sec.visible = seco.sec.visible = on;
    };
    maj();
    const vueEtape = { azimut: 8, elevation: 12, zoom: 1.0 };

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 30, elevation: 18, cadre: [circuit, culasseHaut, vP.g, vS.g], marge: 1.04 }
                                    : { azimut: 14, elevation: 14, cadre: [circuit, culasseHaut, vP.g, vS.g], marge: 1.02 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: false,
      pieces: [
        { id: 'circuit', nom: 'Le circuit magnétique', objets: [circuit, culasseHaut], desc: 'Un empilement de tôles d’acier isolées les unes des autres. Il guide le flux du primaire vers le secondaire ; l’empilement limite les pertes.' },
        { id: 'primaire', nom: 'Le primaire (H1 – H2)', objets: [prim.g], desc: 'Le bobinage d’entrée : 1000 spires de fil fin. Alimenté en alternatif, il fait naître dans le fer un flux qui varie sans arrêt.' },
        { id: 'secondaire', nom: 'Le secondaire (X1 – X2)', objets: [seco.g], desc: 'Le bobinage de sortie. Le flux qui varie y fait naître une tension : c’est l’induction. Peu de spires : du gros fil ; beaucoup de spires : du fil fin.' },
        { id: 'serrage', nom: 'Les cornières de serrage', objets: [serrageBas, serrageHaut], desc: 'Elles serrent les tôles et fixent le transformateur. La culasse du haut se démonte : on enfile les bobinages sur les colonnes.' },
        { id: 'borniers', nom: 'Les deux borniers', objets: [bP.g, bS.g], desc: 'H1 – H2 pour le primaire, X1 – X2 pour le secondaire. Repérés séparément : rien ne les relie.' },
        { id: 'arrivee', nom: 'L’arrivée du réseau', objets: [arrivee], desc: '230 V alternatif : la phase (marron) et le neutre (bleu).' },
        { id: 'depart', nom: 'Le départ vers l’utilisation', objets: [depart], desc: 'Ses fils doivent porter le courant du SECONDAIRE : quand la tension descend, le courant monte. On ne les choisit jamais sur l’intensité du primaire.' },
        { id: 'voltmetres', nom: 'Les deux voltmètres', objets: [vP.g, vS.g], desc: 'À gauche U1, la tension d’entrée ; à droite U2, celle de sortie.' },
        { id: 'socle', nom: 'Le socle', objets: [socle], desc: 'Le support du banc.' }
      ],
      commandes: [
        { id: 'spires', type: 'curseur', libelle: 'Les spires du secondaire', min: 20, max: 2000, pas: 10, valeur: 100, format: v => v + ' spires' }
      ],
      etapes: [
        { titre: 'Le primaire reçoit l’alternatif', texte: 'Le courant entre par H1 et ressort par H2, en changeant de sens sans arrêt : les grains vont et viennent dans les 1000 spires. Au secondaire, rien encore.', actions: [['phase', 'primaire']], piece: 'primaire', voirDedans: false, vue: vueEtape },
        { titre: 'Un flux va et vient dans le fer', texte: 'Ce courant qui change de sens fait naître dans les tôles un flux qui change de sens lui aussi (les tirets bleus). Le fer le guide d’une colonne à l’autre.', actions: [['phase', 'flux']], piece: 'circuit', voirDedans: true, vue: vueEtape },
        { titre: 'Le flux traverse le secondaire : une tension y naît', texte: 'Le flux qui varie passe dans le secondaire et y fait naître une tension : le voltmètre de droite s’allume. Ici, autant de spires qu’au primaire : 230 V, comme à l’entrée. Aucun fil ne relie les deux côtés.', actions: [['phase', 'induction']], piece: 'secondaire', voirDedans: true, vue: vueEtape },
        { titre: '100 spires au lieu de 1000 : il abaisse', texte: 'Dix fois moins de spires : dix fois moins de tension, 23 V. Mais dix fois plus de courant, 20 A — du gros fil au secondaire, de gros fils au départ.', actions: [['phase', 'abaisse']], piece: 'depart', voirDedans: false, vue: { azimut: 20, elevation: 14, zoom: 1.05 } },
        { titre: '2000 spires : il élève', texte: 'Deux fois plus de spires qu’au primaire : 460 V. Le courant est divisé par deux, 1 A — du fil fin. Et la puissance n’a pas bougé : 460 W.', actions: [['phase', 'eleve']], piece: 'secondaire', voirDedans: false, vue: { azimut: 20, elevation: 14, zoom: 1.05 } }
      ],
      eclate: [
        { objets: [culasseHaut, serrageHaut], vers: [0, 95, 0] },
        { objets: [prim.g, seco.g], vers: [0, 52, 0] }
      ],
      eclateVue: { azimut: 18, elevation: 16, zoom: 0.66 },
      surEclate(on) { cPrim.concat(cSec).forEach(c => { c.objet.visible = !on; }); champ.visible = !on; },
      agir(id, v) {
        if (id === 'spires') { E.N2 = +v; E.primaire = E.flux = E.secondaire = true; }
        if (id === 'phase' && PHASES[v]) { Object.assign(E, PHASES[v]); if (PHASES[v].N2) ctx.regler('spires', E.N2); }
        maj();
      },
      animer(dt) {
        E.t += dt;
        cPrim.concat(cSec).forEach(c => c.animer(dt));
        /* le flux suit le courant : il avance, ralentit, repart dans l'autre sens */
        const off = -Math.sin(E.t * 2 * Math.PI * 0.5) * 1.6;
        flux.forEach(f => { f.objet.material.map.offset.x = off; });
        return true;
      }
    };
  }, { famille: 'machines', titre: 'Le transformateur', stations: ['6.2'] });

  /* ================================================================ 6.4 — la plaque à bornes
     La boîte à bornes d'un moteur triphasé, vue de dessus, en grand. Disposition du COURS
     (station 6.4) : rangée du haut (côté arrivée) U1 V1 W1, rangée du bas W2 U2 V2, décalée
     d'un cran. Étoile : deux barrettes couchées relient W2, U2, V2 (la troisième reste rangée
     dans la boîte). Triangle : trois barrettes debout U1–W2, V1–U2, W1–V2.
     « Voir dedans » rend la plaquette transparente : les trois bobinages apparaissent dessous,
     chacun relié à ses deux bornes ; ils s'allument quand ils reçoivent du courant.
     Options : { reseau: 400 | 230, plaque: 230 | 400 } (tension que tient UN bobinage) ;
     agir('reseau', v) et agir('plaque', v) marchent aussi sans bouton (temps 3 de la station). */
  Electro3D.definir('plaqueABornes', (T, K, ctx) => {
    const O = outils(T, K), M = O.M;
    const opt = ctx.options || {};
    const racine = new T.Group();
    const X = [-34, -10, 14], ZF = -12, ZN = 12, YB = 12.4;
    const peinture = K.propre(M.fonte); peinture.side = T.DoubleSide;

    /* ---------------------------------------------------------------- la carcasse et la boîte */
    const carcasse = new T.Group();
    const gc = new T.CylinderGeometry(90, 90, 210, 64, 1, false, Math.PI / 2 - 0.62, 1.24); gc.rotateZ(Math.PI / 2);
    carcasse.add(K.mesh(gc, peinture, 0, -112, 0));
    [-1, 1].forEach(s => [0.66, 0.82].forEach(a => {
      const f = K.mesh(new T.BoxGeometry(206, 10, 3), peinture, 0, -112 + 94 * Math.sin(Math.PI / 2 + s * a), 94 * Math.cos(Math.PI / 2 + s * a));
      f.rotation.x = -s * a; carcasse.add(f);
    }));
    racine.add(carcasse);
    const socle = K.mesh(K.boite(120, 44, 100, 3), peinture, 0, -22, 0);
    const contour = K.formeArrondie(120, 100, 4); contour.holes.push(K.formeArrondie(108, 88, 2));
    const parois = new T.Mesh(K.extrusion(contour, 34), peinture); parois.rotation.x = -Math.PI / 2; parois.position.y = 17;
    const boite = new T.Group(); boite.add(parois);
    racine.add(socle, boite);
    /* le couvercle, vissé ; il s'en va quand on ouvre */
    const couvercle = new T.Group();
    couvercle.add(K.mesh(K.boite(124, 6, 104, 3), peinture, 0, 37, 0));
    [[-52, -42], [52, -42], [-52, 42], [52, 42]].forEach(([x, z]) => { const v = K.vis(3); v.position.set(x, 40, z); couvercle.add(v); });
    racine.add(couvercle);
    /* la plaque signalétique, sur la face avant de la boîte */
    const signal = new T.Group();
    let texteSignal = null;
    signal.add(K.mesh(K.boite(74, 16, 1.2, 0.5), M.aluminium, 0, 17, 50.6));
    const ecrireSignal = un => {
      if (texteSignal) { signal.remove(texteSignal); texteSignal.geometry.dispose(); }
      texteSignal = K.gravure(un === 400 ? 'Δ 400 V    Y 690 V' : 'Δ 230 V    Y 400 V', 4.4, { couleur: '#1d232a' });
      texteSignal.position.set(0, 17, 51.3); signal.add(texteSignal);
    };
    racine.add(signal);

    /* ---------------------------------------------------------------- la plaquette et les six goujons */
    const plaquette = K.mesh(K.boite(84, 7, 62, 1.5), K.plastique(0x5e4128, 0.6), -10, 3.5, 0);
    racine.add(plaquette);
    const goujons = new T.Group(), ecrous = new T.Group(), reperes = new T.Group();
    const NOMS = { [ZF]: ['U1', 'V1', 'W1'], [ZN]: ['W2', 'U2', 'V2'] };
    const POS = {};
    [ZF, ZN].forEach(z => X.forEach((x, i) => {
      goujons.add(K.mesh(K.cylindre(2.5, 15, 16), M.laiton, x, 12, z));
      goujons.add(K.mesh(K.cylindre(4.6, 3, 6), M.laiton, x, 8.5, z));
      goujons.add(K.mesh(K.cylindre(4.2, 0.6, 16), M.laiton, x, 10.3, z));
      ecrous.add(K.mesh(K.cylindre(4.6, 4, 6), M.laiton, x, YB + 3.2, z));
      const n = K.gravure(NOMS[z][i], 5.2, { couleur: '#fff6e0' }); n.rotation.x = -Math.PI / 2;
      if (z < 0) n.position.set(x - 11, 7.05, z); else n.position.set(x, 7.05, z + 10.5); reperes.add(n);
      POS[NOMS[z][i]] = new T.Vector3(x, 0, z);
    }));
    racine.add(goujons, ecrous, reperes);

    /* ---------------------------------------------------------------- les trois barrettes */
    const barrettes = [0, 1, 2].map(() => {
      const g = new T.Group();
      g.add(K.mesh(K.boite(34, 2, 9, 0.6), M.cuivre, 0, 0, 0));
      racine.add(g); return { g, de: null, vers: null, t: 1 };
    });
    const groupeBarrettes = new T.Group();   /* pour la légende et l'éclaté : un groupe d'accueil */
    barrettes.forEach(b => groupeBarrettes.add(b.g));
    racine.add(groupeBarrettes);
    const RANGEE = k => ({ x: 40, y: 1.2 + k * 2.1, z: 0, ry: Math.PI / 2 });
    const POSES = {
      aucun: [RANGEE(0), RANGEE(1), RANGEE(2)],
      etoile: [{ x: -22, y: YB, z: ZN, ry: 0 }, { x: 2, y: YB, z: ZN, ry: 0 }, RANGEE(0)],
      triangle: X.map(x => ({ x, y: YB, z: 0, ry: Math.PI / 2 }))
    };
    const poser = (b, p) => { b.g.position.set(p.x, p.y, p.z); b.g.rotation.y = p.ry; };
    barrettes.forEach((b, k) => { b.vers = POSES.aucun[k]; poser(b, b.vers); });

    /* ---------------------------------------------------------------- l'arrivée L1 L2 L3 et la terre */
    const arrivee = new T.Group();
    const presse = K.mesh(K.cylindre(9, 16, 24), M.plastiqueNoir, -10, 18, -52); presse.rotation.x = Math.PI / 2;
    arrivee.add(presse);
    const gaine = K.fil([[-10, 18, -58], [-10, 16, -78], [-10, -12, -102], [-10, -70, -112]], 6, K.plastique(0x8b9096, 0.55));
    arrivee.add(gaine.mesh);
    const conducteurs = ['L1', 'L2', 'L3'].map((c, i) => {
      const f = K.fil([[-10 + (i - 1) * 3.2, 18, -44], [X[i], 17, -30], [X[i] + 1, 13, -19], [X[i], 10.9, ZF - 3.6], [X[i], 10.9, ZF]], 1.5, c);
      arrivee.add(f.mesh);
      const cosse = K.mesh(K.anneau(4.4, 2.6, 0.8, 20), M.cuivre, X[i], 10.9, ZF); arrivee.add(cosse);
      return f;
    });
    const terre = new T.Group();
    const pe = K.fil([[-13, 16, -44], [-34, 9, -40], [-46, 3.2, -36]], 1.5, 'PE');
    const vt = K.vis(3); vt.position.set(-46, 1.6, -36);
    terre.add(pe.mesh, vt);
    racine.add(arrivee, terre);
    const courants = conducteurs.map((f, i) => {
      const c = K.courant(f.courbe, { pas: 5, rayon: 1.2, vitesse: 22 });
      c.regler({ alternatif: true, frequence: 0.5, debit: 0, t: i * 2 / 3 });
      racine.add(c.objet); return c;
    });

    /* ---------------------------------------------------------------- les trois bobinages, sous la plaquette */
    const bobinages = new T.Group();
    const BOB = [['U1', 'U2', -9, 0.5], ['V1', 'V2', -9, 0.5], ['W1', 'W2', -20, 0.8]].map(([a, b, y, t], i) => {
      const A = POS[a], B = POS[b];
      const c = A.clone().lerp(B, t); c.y = y;
      const dir = B.clone().sub(A).setY(0).normalize();
      const mat = K.bobinageMat(0.7); mat.emissive = new T.Color(0xff7a1a); mat.emissiveIntensity = 0;
      const m = K.mesh(K.cylindre(5.4, 16, 20), mat, c.x, c.y, c.z);
      m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dir);
      bobinages.add(m);
      const e1 = c.clone().addScaledVector(dir, -8), e2 = c.clone().addScaledVector(dir, 8);
      [[A, e1], [B, e2]].forEach(([s, e]) => bobinages.add(K.fil([[s.x, 0.5, s.z], [s.x, y + 3, s.z], e], 0.7, M.bobinage).mesh));
      return { mat, phase: i * 2 * Math.PI / 3 };
    });
    racine.add(bobinages);

    /* ---------------------------------------------------------------- l'état */
    const RAC3 = Math.sqrt(3), BLANC = new T.Color(0xffffff), ROUGE = new T.Color(0xff3020);
    const E = { couplage: ctx.mode === 'decouvrir' ? 'etoile' : null, U: +opt.reseau || 400, Un: +opt.plaque || 230, ouvert: ctx.mode !== 'decouvrir', tCouv: ctx.mode !== 'decouvrir' ? 1 : 0, t: 0, chaleur: 0 };
    ecrireSignal(E.Un);
    const placerCouvercle = () => {
      const s = K.lisse(K.clamp(E.tCouv, 0, 1));
      couvercle.position.y = s * 70; couvercle.position.x = s * 30;
      couvercle.visible = E.tCouv < 0.98;
    };
    const allerVers = nom => {
      barrettes.forEach((b, k) => {
        const p = POSES[nom][k];
        b.de = { x: b.g.position.x, y: b.g.position.y, z: b.g.position.z, ry: b.g.rotation.y };
        b.vers = p; b.t = -k * 0.25;
      });
    };
    const recue = () => E.couplage === 'etoile' ? E.U / RAC3 : E.couplage === 'triangle' ? E.U : 0;
    const maj = () => {
      const Ue = recue(), ecart = E.couplage ? (Ue - E.Un) / E.Un * 100 : 0;
      courants.forEach(c => c.regler({ debit: E.couplage ? 1 : 0 }));
      ctx.mesures([
        { libelle: 'Le réseau (entre deux fils)', valeur: E.U + ' V' },
        { libelle: 'Chaque bobinage reçoit', valeur: E.couplage ? Math.round(Ue) + ' V' : '—' },
        { libelle: 'Un bobinage tient', valeur: E.Un + ' V' }
      ]);
      const plaque = E.Un === 400 ? 'Δ 400 V / Y 690 V' : 'Δ 230 V / Y 400 V';
      const bon = t => Math.abs(((t === 'etoile' ? E.U / RAC3 : E.U) - E.Un) / E.Un) <= 0.05;
      const conseil = bon('etoile') ? 'Sur un réseau ' + E.U + ' V, avec la plaque ' + plaque + ', on couple en <strong>étoile</strong>.'
                    : bon('triangle') ? 'Sur un réseau ' + E.U + ' V, avec la plaque ' + plaque + ', on couple en <strong>triangle</strong>.'
                    : 'Aucun couplage ne convient : ce moteur n’est pas fait pour ce réseau. On le refuse.';
      if (!E.couplage) {
        ctx.dire('<strong>Aucune barrette posée.</strong> Les trois bobinages ont leurs six bouts libres : le moteur ne peut pas tourner. Le réseau est en ' + E.U + ' V, la plaque dit ' + plaque + ' : choisissez le couplage.');
        return;
      }
      const forme = E.couplage === 'etoile'
        ? '<strong>Étoile — W2, U2 et V2 reliés ensemble.</strong> Deux barrettes couchées font un point commun. Chaque bobinage est tendu entre un fil et ce point : il reçoit ' + E.U + ' ÷ √3 = ' + Math.round(Ue) + ' V.'
        : '<strong>Triangle — U1–W2, V1–U2, W1–V2.</strong> Trois barrettes debout referment la boucle : chaque bobinage est branché entre deux fils et reçoit ' + E.U + ' V.';
      const verdict = Math.abs(ecart) <= 5 ? ' C’est ce que la plaque demande : le moteur tourne normalement.'
                    : ecart > 5 ? ' Pour un bobinage prévu à ' + E.Un + ' V : surtension, le moteur chauffe et grille.'
                    : ' Pour un bobinage prévu à ' + E.Un + ' V : il est sous-alimenté, il tourne mou et n’a pas son couple.';
      ctx.dire(forme + verdict + ' ' + conseil);
    };
    const reglerCouplage = v => {
      const nom = v === 'etoile' || v === 'triangle' ? v : null;
      if (nom !== E.couplage) allerVers(nom || 'aucun');
      E.couplage = nom; maj();
    };
    const PHASES = {
      ferme: () => { E.ouvert = false; E.tCouv = 0; placerCouvercle(); reglerCouplage(null); ctx.regler('couplage', null); },
      ouvrir: () => { E.ouvert = true; E.tCouv = Math.min(E.tCouv, 0); reglerCouplage(null); ctx.regler('couplage', null); }
    };
    barrettes.forEach((b, k) => { b.vers = POSES[E.couplage || 'aucun'][k]; poser(b, b.vers); });
    placerCouvercle(); maj();

    const vueHaut = { azimut: 0, elevation: 62, zoom: 1.0 };
    const vueBobinages = { azimut: 0, elevation: 72, zoom: 1.05 };

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 28, elevation: 32, cadre: [socle, boite], marge: 1.05 }
                                    : { azimut: 0, elevation: 60, cadre: [boite, plaquette], marge: 1.02 },
      fantome: [plaquette, socle],
      fantomeAuDepart: false,
      libellesFantome: ['◐ Voir les bobinages', '◑ Refermer'],
      pieces: [
        { id: 'goujons', nom: 'Les six bornes', objets: [goujons, ecrous], desc: 'Six goujons de laiton : en haut U1 V1 W1, les débuts des trois bobinages ; en bas W2 U2 V2, leurs fins, décalées d’un cran.' },
        { id: 'barrettes', nom: 'Les trois barrettes', objets: [groupeBarrettes], desc: 'Trois plaquettes de cuivre identiques. Couchées sur la rangée du bas : l’étoile. Debout : le triangle.' },
        { id: 'bobinages', nom: 'Les trois bobinages (U1–U2, V1–V2, W1–W2)', objets: [bobinages], desc: 'À l’intérieur du moteur. Chacun a un début et une fin : six bouts, six bornes. Le croisement de W permet des barrettes bien droites.' },
        { id: 'plaquette', nom: 'La plaquette isolante', objets: [plaquette, reperes], desc: 'Elle porte les goujons et leurs repères. « Voir les bobinages » la rend transparente.' },
        { id: 'arrivee', nom: 'L’arrivée L1 L2 L3', objets: [arrivee], desc: 'Le câble entre par le presse-étoupe ; marron, noir et gris arrivent sur U1, V1 et W1.' },
        { id: 'terre', nom: 'La borne de terre', objets: [terre], desc: 'Le vert-jaune se visse à part, sur la carcasse : jamais sur une des six bornes.' },
        { id: 'boite', nom: 'La boîte à bornes', objets: [boite, socle], desc: 'Sur le flanc du moteur. On y câble à l’arrêt, moteur consigné.' },
        { id: 'couvercle', nom: 'Le couvercle', objets: [couvercle], desc: 'Quatre vis. On le referme toujours : il protège des contacts directs et de la poussière.' },
        { id: 'signal', nom: 'La plaque signalétique', objets: [signal], desc: 'Elle dit ce qu’un bobinage tient : Δ 230 V (en triangle, chaque bobinage sous 230 V) ou Y 400 V (en étoile, 400 V entre deux fils).' },
        { id: 'carcasse', nom: 'La carcasse du moteur', objets: [carcasse], desc: 'La boîte est fixée dessus ; les bobinages sont dessous, dans le stator.' }
      ],
      commandes: [
        { id: 'couplage', type: 'choix', options: [['etoile', 'Étoile'], ['triangle', 'Triangle']], valeur: E.couplage }
      ],
      etapes: [
        { titre: 'Le couvercle s’ouvre : six bornes, trois barrettes', texte: 'Sur le flanc du moteur, sous quatre vis : six goujons en laiton sur deux rangées, et trois barrettes de cuivre, ici encore rangées dans la boîte.', actions: [['phase', 'ouvrir']], piece: 'goujons', voirDedans: false, vue: vueHaut },
        { titre: 'Trois bobinages, six bouts', texte: 'Sous la plaquette : trois bobinages. Chacun a un début (en haut : U1, V1, W1) et une fin (en bas). La rangée du bas est décalée d’un cran : W2 est sous U1.', actions: [['phase', 'ouvrir']], piece: 'bobinages', voirDedans: true, vue: vueBobinages },
        { titre: 'L’étoile : deux barrettes couchées sur la rangée du bas', texte: 'Les deux barrettes relient W2, U2 et V2 : les trois fins de bobinage forment un seul point commun.', actions: [['couplage', 'etoile']], piece: 'barrettes', voirDedans: false, vue: vueHaut },
        { titre: 'En étoile, chaque bobinage reçoit 230 V', texte: 'Chaque bobinage est tendu entre un fil du réseau et le point commun : 400 ÷ √3 = 231 V. La plaque dit Y 400 V : sur le réseau 400 V de l’atelier, c’est le bon couplage.', actions: [['couplage', 'etoile']], voirDedans: true, vue: vueBobinages },
        { titre: 'Le triangle : trois barrettes debout', texte: 'Chaque barrette relie une vis du haut à celle du dessous : U1–W2, V1–U2, W1–V2. Grâce au décalage, les trois bobinages se referment en boucle.', actions: [['couplage', 'triangle']], piece: 'barrettes', voirDedans: false, vue: vueHaut },
        { titre: 'En triangle sur 400 V, chaque bobinage reçoit 400 V : il chauffe', texte: 'Chaque bobinage est branché entre deux fils : 400 V sur un bobinage prévu pour 230 V. Il chauffe, et le moteur grille. Sur ce réseau, c’est l’étoile.', actions: [['couplage', 'triangle']], voirDedans: true, vue: vueBobinages }
      ],
      eclate: [
        { objets: [couvercle], vers: [0, 70, 0] },
        { objets: [ecrous], vers: [0, 42, 0] },
        { objets: [groupeBarrettes], vers: [0, 24, 0] }
      ],
      eclateVue: { azimut: 22, elevation: 34, zoom: 0.8 },
      surEclate(on) {
        courants.forEach(c => { c.objet.visible = !on; });
        if (on) { couvercle.visible = true; couvercle.position.set(0, 0, 0); } else placerCouvercle();
      },
      agir(id, v) {
        if (id === 'couplage') { if (!E.ouvert) { E.ouvert = true; } reglerCouplage(v); }
        if (id === 'reseau') { E.U = +v; maj(); }
        if (id === 'plaque') { E.Un = +v; ecrireSignal(E.Un); maj(); }
        if (id === 'phase' && PHASES[v]) PHASES[v]();
      },
      animer(dt) {
        E.t += dt;
        let bouge = false;
        if (E.ouvert && E.tCouv < 1) { E.tCouv = Math.min(1, E.tCouv + dt / 0.9); placerCouvercle(); bouge = true; }
        barrettes.forEach(b => {
          if (b.t >= 1 || !b.de) return;
          b.t += dt / 0.75; bouge = true;
          const s = K.lisse(K.clamp(b.t, 0, 1)), d = b.de, p = b.vers;
          b.g.position.set(d.x + (p.x - d.x) * s, d.y + (p.y - d.y) * s + Math.sin(Math.PI * s) * 16, d.z + (p.z - d.z) * s);
          b.g.rotation.y = d.ry + (p.ry - d.ry) * s;
        });
        /* les bobinages : un courant alternatif dans chacun, décalé d'un tiers de période ;
           au-dessus de ce qu'ils tiennent, ils chauffent */
        const Ue = recue(), rapport = E.couplage ? Ue / E.Un : 0;
        E.chaleur = K.vers(E.chaleur, rapport > 1.05 ? 1 : 0, rapport > 1.05 ? 1.1 : 1.5, dt);
        BOB.forEach(b => {
          const i = Math.max(0, Math.cos(E.t * Math.PI - b.phase)) * Math.min(1, rapport);
          b.mat.color.copy(BLANC).lerp(ROUGE, K.clamp(E.chaleur, 0, 1));
          if (E.chaleur > 0.05) { b.mat.emissive.setHex(0xb00000); b.mat.emissiveIntensity = E.chaleur * (0.7 + 0.3 * i); }
          else { b.mat.emissive.setHex(0xff7a1a); b.mat.emissiveIntensity = i * 0.6; }
        });
        courants.forEach(c => c.animer(dt));
        return true;
      }
    };
  }, { famille: 'machines', titre: 'Le couplage de la plaque à bornes', stations: ['6.4'] });

  /* ================================================================ machines tournantes : briques
     (le tour, la tôle et la coupe sont au kit : K.tourne, K.anneauX, K.facesCoupe, K.tolePile) */
  const tournantes = (T, K) => {
    const M = K.mat;
    /* une pièce tournée en deux versions, entière et coupée (avec ses faces de coupe) */
    const double = (rIn, rOut, x0, x1, mat, matCoupe, seg) => {
      const e = new T.Mesh(K.anneauX(rIn, rOut, x0, x1, false, seg), mat);
      const c = new T.Group(); c.add(new T.Mesh(K.anneauX(rIn, rOut, x0, x1, true, seg), mat), K.facesCoupe(rIn, rOut, x0, x1, matCoupe || mat));
      return { e, c };
    };
    /* la carcasse à ailettes d'un petit moteur, ses pattes, ses flasques, son ventilateur et son capot */
    const carcasseMoteur = (o) => {
      const peinture = K.propre(M.fonte); peinture.side = T.DoubleSide;
      const R = o.r, X = o.demi;
      const carc = double(R - 7, R, -X, X, peinture, peinture, 72);
      const ail = new T.BoxGeometry(2 * X - 8, 8, 2.6);
      for (let i = 0; i < 28; i++) {
        const a = i / 28 * Math.PI * 2 - Math.PI;
        const pres = (u, v, w) => Math.abs(Math.atan2(Math.sin(u - v), Math.cos(u - v))) < w;
        if (pres(a, -Math.PI / 2, 0.45) || (o.libre || []).some(([c, w]) => pres(a, c, w))) continue;
        const m = new T.Mesh(ail, peinture); m.rotation.x = Math.PI / 2 - a; m.position.set(0, (R + 3.5) * Math.sin(a), (R + 3.5) * Math.cos(a));
        carc.e.add(m);
        if (!(Math.sin(a) > 0.02 && Math.cos(a) > 0.02)) carc.c.add(m.clone());
      }
      const pattes = new T.Group();
      [-X * 0.68, X * 0.68].forEach(x => [-1, 1].forEach(s => pattes.add(K.mesh(K.boite(30, 20, 26, 2), peinture, x, -o.h + 10, s * R * 0.72))));
      pattes.add(K.mesh(K.boite(2 * X * 0.86, 8, R * 0.9, 2.5), peinture, 0, -R + 2, 0));
      const flasques = { e: new T.Group(), c: new T.Group() }, fAv = { e: new T.Group(), c: new T.Group() }, fAr = { e: new T.Group(), c: new T.Group() };
      const prof = [[o.rArbre + 1, 0], [R, 0], [R, 7], [R * 0.55, 9], [R * 0.38, 17], [o.rArbre + 1, 17], [o.rArbre + 1, 0]];
      [[1, fAv], [-1, fAr]].forEach(([cote, f]) => [['e', false], ['c', true]].forEach(([k, cp]) => {
        const m = new T.Mesh(K.tourne(prof, cp, 56), peinture); m.scale.x = cote; m.position.x = cote * X; f[k].add(m);
      }));
      flasques.e.add(fAv.e, fAr.e); flasques.c.add(fAv.c, fAr.c);
      const roulements = new T.Group();
      [1, -1].forEach(c => { const r = K.mesh(K.anneau(o.rArbre + 6, o.rArbre + 0.5, 9, 28), M.acier); r.rotation.z = Math.PI / 2; r.position.x = c * (X + 8); roulements.add(r); });
      const ventilateur = new T.Group();
      ventilateur.add(K.cylX(o.rArbre + 5, 14, M.plastiqueNoir, -X - 19, 0, 0, 20));
      for (let i = 0; i < 7; i++) {
        const a = i / 7 * Math.PI * 2;
        const p = K.mesh(K.boite(18, R * 0.62, 2.2, 0.8), M.plastiqueNoir, -X - 19, R * 0.4 * Math.sin(a), R * 0.4 * Math.cos(a));
        p.rotation.x = Math.PI / 2 - a; p.rotateY(0.35); ventilateur.add(p);
      }
      const capot = new T.Group();
      capot.add(new T.Mesh(K.anneauX(R + 1, R + 3.5, -X - 34, -X - 6, false, 56), peinture));
      [R * 0.35, R * 0.6, R * 0.86].forEach(r => { const t = K.mesh(K.tore(r, 1.3, 8, 48), peinture, -X - 35, 0, 0); t.rotation.y = Math.PI / 2; capot.add(t); });
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const b = K.mesh(new T.BoxGeometry(2.4, R * 0.75, 2.6), peinture, -X - 35, R * 0.5 * Math.sin(a), R * 0.5 * Math.cos(a)); b.rotation.x = Math.PI / 2 - a; capot.add(b); }
      return { peinture, carc, pattes, flasques, fAv, fAr, roulements, ventilateur, capot };
    };
    return { double, carcasseMoteur };
  };

  /* ================================================================ 6.5 — le moteur monophasé
     Un petit moteur asynchrone monophasé (hauteur d'axe 71, 0,37 kW, deux pôles) et son
     condensateur permanent, posé sur la carcasse à côté de la boîte à bornes (U1 U2 · Z1 Z2).
     Un seul enroulement : les deux bobines du principal s'allument et s'éteignent ensemble,
     le champ pulse sur un axe (la flèche bleue grandit, s'annule, se retourne) ; le rotor vibre.
     Avec le condensateur : l'auxiliaire reçoit un courant décalé, les bobines s'allument tour à
     tour, la flèche tourne, le rotor démarre. Ralenti à l'écran. */
  Electro3D.definir('moteurMonophase', (T, K, ctx) => {
    const M = K.mat, R = tournantes(T, K);
    const racine = new T.Group();
    const entier = new T.Group(), coupe = new T.Group(); racine.add(entier, coupe);
    const BX = -26, BZ = -28;

    /* ---------------------------------------------------------------- carcasse, stator */
    const C = R.carcasseMoteur({ r: 64, demi: 72, h: 71, rArbre: 9, libre: [[Math.PI / 2 + 0.75, 0.5]] });
    entier.add(C.carc.e, C.flasques.e); coupe.add(C.carc.c, C.flasques.c);
    racine.add(C.pattes, C.roulements, C.capot);
    const stator = R.double(36, 57, -45, 45, K.tolePile(2, 90), K.toleCoupe(90, 2), 64);
    entier.add(stator.e); coupe.add(stator.c);
    /* les têtes de bobines : huit secteurs de 45° par côté.
       principal : en haut (k 5, 6) et en bas (k 1, 2) ; auxiliaire : devant (k 7, 0) et derrière (k 3, 4) */
    const ROLE = { 5: ['p', 1], 6: ['p', 1], 1: ['p', -1], 2: ['p', -1], 7: ['a', 1], 0: ['a', 1], 3: ['a', -1], 4: ['a', -1] };
    const principal = { e: new T.Group(), c: new T.Group() }, auxiliaire = { e: new T.Group(), c: new T.Group() };
    const secteurs = [];
    const profilTete = cote => { const p = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * Math.PI * 2; p.push(new T.Vector2(47 + Math.cos(a) * 8, cote * (52 + Math.sin(a) * 6.5))); } return p; };
    for (let k = 0; k < 8; k++) {
      const [role, signe] = ROLE[k];
      const mat = K.bobinageMat(0.6); mat.side = T.DoubleSide; mat.emissive = new T.Color(0xff7a1a); mat.emissiveIntensity = 0;
      if (role === 'a') mat.color.setHex(0xffd9b8);
      const g = role === 'p' ? principal : auxiliaire;
      [-1, 1].forEach(cote => {
        const geo = new T.LatheGeometry(profilTete(cote), 10, k * Math.PI / 4 + 0.03, Math.PI / 4 - 0.06); geo.rotateZ(-Math.PI / 2);
        g.e.add(new T.Mesh(geo, mat));
        if (k < 6) g.c.add(new T.Mesh(geo, mat));
      });
      secteurs.push({ mat, role, signe });
    }
    entier.add(principal.e, auxiliaire.e); coupe.add(principal.c, auxiliaire.c);

    /* ---------------------------------------------------------------- ce qui tourne */
    const tournant = new T.Group(); racine.add(tournant);
    const arbre = new T.Group();
    arbre.add(K.cylX(9, 221, M.acier, 14.5, 0, 0, 28), K.mesh(K.boite(26, 3.4, 5, 0.6), M.acierSombre, 110, 9.2, 0));
    const rotor = new T.Group();
    const alu = K.propre(M.aluminium);
    rotor.add(new T.Mesh(K.anneauX(9, 35.4, -45, 45, false, 48), K.tolePile(2, 90)));
    const barre = new T.BoxGeometry(94, 4, 3.4);
    for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2; const b = new T.Mesh(barre, alu); b.rotation.x = Math.PI / 2 - a; b.position.set(0, 33.8 * Math.sin(a), 33.8 * Math.cos(a)); rotor.add(b); }
    [-1, 1].forEach(c => rotor.add(new T.Mesh(K.anneauX(22, 35.6, Math.min(c * 45, c * 51), Math.max(c * 45, c * 51), false, 40), alu)));
    rotor.add(K.mesh(K.boite(3, 6, 8, 1), M.plastiqueOrange, 52, 0, 28));
    tournant.add(arbre, rotor);
    const ventil = new T.Group(); ventil.add(C.ventilateur); racine.add(ventil);
    /* la flèche du champ, entre le rotor et la flasque avant */
    const fleche = new T.Group(); fleche.position.x = 64;
    const tige = K.mesh(K.cylindre(2.4, 1, 12), M.champ, 0, 0.5, 0);
    const pointe = K.mesh(K.cylindre(0.01, 11, 16, 6), M.champ, 0, 0, 0);
    fleche.add(tige, pointe); racine.add(fleche);
    [tige, pointe].forEach(m => { m.userData.sansOmbre = true; });
    const poserFleche = (ang, L) => {
      fleche.visible = L > 0.04;
      const l = 40 * L;
      tige.scale.y = Math.max(0.01, 1.75 * l - 11); tige.position.y = (0.25 * l - 11) / 2; pointe.position.y = l - 5.5;
      fleche.rotation.x = ang;
    };

    /* ---------------------------------------------------------------- la boîte à bornes */
    const boite = new T.Group(), couvercle = new T.Group();
    boite.add(K.mesh(K.boite(58, 26, 54, 3), C.peinture, BX, 66, BZ));
    const ct = K.formeArrondie(62, 58, 4); ct.holes.push(K.formeArrondie(54, 50, 2));
    const parois = new T.Mesh(K.extrusion(ct, 22), C.peinture); parois.rotation.x = -Math.PI / 2; parois.position.set(BX, 90, BZ); boite.add(parois);
    couvercle.add(K.mesh(K.boite(64, 5, 60, 2.5), C.peinture, BX, 103.5, BZ));
    [[-26, -24], [26, -24], [-26, 24], [26, 24]].forEach(([dx, dz]) => { const v = K.vis(2.4); v.position.set(BX + dx, 106, BZ + dz); couvercle.add(v); });
    racine.add(boite, couvercle);
    const bornier = new T.Group();
    bornier.add(K.mesh(K.boite(38, 5, 34, 1.2), K.plastique(0x5e4128, 0.6), BX, 81.5, BZ));
    const ST = { U1: [BX - 9, BZ - 9], U2: [BX + 9, BZ - 9], Z1: [BX - 9, BZ + 9], Z2: [BX + 9, BZ + 9] };
    Object.keys(ST).forEach(n => {
      const [x, z] = ST[n];
      bornier.add(K.mesh(K.cylindre(2, 11, 14), M.laiton, x, 88.5, z), K.mesh(K.cylindre(3.8, 2.4, 6), M.laiton, x, 85.2, z), K.mesh(K.cylindre(3.8, 3, 6), M.laiton, x, 92, z));
      const g = K.gravure(n, 3.4, { couleur: '#fff6e0' }); g.rotation.x = -Math.PI / 2; g.position.set(x + (x < BX ? -9 : 9), 84.05, z); bornier.add(g);
    });
    bornier.add(K.mesh(K.boite(6, 1.6, 26, 0.5), M.cuivre, BX - 9, 90.2, BZ));   /* la barrette U1 – Z1 */
    racine.add(bornier);
    /* l'arrivée : phase marron sur U1, neutre bleu sur U2, terre à part */
    const arrivee = new T.Group();
    const presse = K.mesh(K.cylindre(7, 10, 20), M.plastiqueNoir, BX - 33, 90, BZ + 6); presse.rotation.z = Math.PI / 2; arrivee.add(presse);
    arrivee.add(K.fil([[BX - 37, 90, BZ + 6], [BX - 60, 84, BZ + 8], [BX - 80, 20, BZ - 6], [BX - 86, -71, BZ - 26]], 4.6, K.plastique(0x8b9096, 0.55)).mesh);
    const fL = K.fil([[BX - 28, 90, BZ + 4], [BX - 20, 92, BZ - 2], [ST.U1[0] - 2, 92.5, ST.U1[1] + 3], [ST.U1[0], 91, ST.U1[1]]], 1.2, 'L1');
    const fN = K.fil([[BX - 28, 90, BZ + 8], [BX - 8, 95, BZ + 2], [ST.U2[0] - 3, 93, ST.U2[1] + 3], [ST.U2[0], 91, ST.U2[1]]], 1.2, 'N');
    const fPE = K.fil([[BX - 28, 89, BZ + 7], [BX - 18, 84, BZ + 18], [BX - 12, 80.2, BZ + 21]], 1.2, 'PE');
    const vt = K.vis(2.4); vt.position.set(BX - 12, 79.5, BZ + 21);
    arrivee.add(fL.mesh, fN.mesh, fPE.mesh, vt);
    racine.add(arrivee);

    /* ---------------------------------------------------------------- le condensateur permanent */
    const condensateur = new T.Group();
    const CX = 37, CY = 80, CZ = -30;
    const corps = K.cylX(17, 54, K.plastique(0x2a2e33, 0.5), CX, CY, CZ, 28);
    condensateur.add(corps);
    condensateur.add(K.mesh(K.boite(22, 14, 22, 2), C.peinture, CX, 64, CZ));
    const collier = K.mesh(K.tore(17.6, 1.2, 8, 40), M.zingue, CX, CY, CZ); collier.rotation.y = Math.PI / 2; condensateur.add(collier);
    const etiquette = K.gravure('16 µF\n450 V ~', 4, { couleur: '#e9edf2' }); etiquette.position.set(CX + 6, CY + 2, CZ + 17.3); condensateur.add(etiquette);
    [[CX - 28.5, CY + 6, CZ + 5], [CX - 28.5, CY - 6, CZ - 5]].forEach(p => condensateur.add(K.mesh(K.boite(2, 6, 4, 0.4), M.laiton, ...p)));
    const presse2 = K.mesh(K.cylindre(5, 8, 18), M.plastiqueNoir, BX + 32, 90, BZ); presse2.rotation.z = Math.PI / 2; condensateur.add(presse2);
    const fC1 = K.fil([[CX - 29, CY + 6, CZ + 5], [CX - 33, 88, CZ + 2], [BX + 30, 90, BZ - 1.5], [BX + 18, 93, BZ - 6], [ST.U2[0], 91.5, ST.U2[1]]], 1.0, 'noir');
    const fC2 = K.fil([[CX - 29, CY - 6, CZ - 5], [CX - 34, 86, CZ - 2], [BX + 30, 90, BZ + 1.5], [BX + 18, 93, BZ + 6], [ST.Z2[0], 91.5, ST.Z2[1]]], 1.0, 'noir');
    const fC2libre = K.fil([[CX - 29, CY - 6, CZ - 5], [CX - 34, 86, CZ - 2], [BX + 30, 90, BZ + 1.5], [BX + 20, 96, BZ + 8], [BX + 16, 104, BZ + 16]], 1.0, 'noir');
    const cosseLibre = K.mesh(K.anneau(3.4, 2, 0.8, 16), M.cuivre, BX + 16, 104, BZ + 16); cosseLibre.rotation.x = 0.8;
    const cosseZ2 = K.mesh(K.anneau(3.4, 2, 0.8, 16), M.cuivre, ST.Z2[0], 90.6, ST.Z2[1]);
    condensateur.add(fC1.mesh, fC2.mesh, fC2libre.mesh, cosseLibre, cosseZ2);
    racine.add(condensateur);

    /* ---------------------------------------------------------------- le courant (alternatif) */
    const cAlim = K.courant(fL.courbe, { pas: 5, rayon: 1.1, vitesse: 16 }), cAlimN = K.courant(fN.courbe, { pas: 5, rayon: 1.1, vitesse: 16 });
    const cCond = K.courant(K.chemin([K.inverse(fC1), fC2.courbe]), { pas: 5, rayon: 1.1, vitesse: 16 });
    [cAlim, cAlimN, cCond].forEach(c => { c.regler({ alternatif: true, frequence: 0.5 }); racine.add(c.objet); });

    /* ---------------------------------------------------------------- l'état */
    const E = { avec: false, coupe: false, t: 0, wR: 0, aR: 0 };
    const W_CHAMP = 2 * Math.PI * 0.5;   /* le champ : un demi-tour par seconde à l'écran (ralenti) */
    const maj = () => {
      fC2.mesh.visible = cosseZ2.visible = E.avec;
      fC2libre.mesh.visible = cosseLibre.visible = !E.avec;
      cCond.regler({ debit: E.avec ? 1 : 0 });
      [cAlim, cAlimN].forEach(c => c.regler({ debit: 1, vitesse: E.avec ? 14 : 22 }));
      ctx.mesures(E.avec
        ? [{ libelle: 'Le champ', valeur: 'il tourne : 3000 tr/min' }, { libelle: 'Le rotor', valeur: '2820 tr/min' }, { libelle: 'L’intensité', valeur: '2,6 A' }]
        : [{ libelle: 'Le champ', valeur: 'il pulse sur un axe' }, { libelle: 'Le rotor', valeur: '0 tr/min — il ronfle' }, { libelle: 'L’intensité', valeur: '9,5 A — il chauffe' }]);
      ctx.dire(E.avec
        ? '<strong>Avec le condensateur : ça tourne.</strong> Le condensateur décale le courant de l’enroulement auxiliaire. Deux enroulements décalés dans l’espace, deux courants décalés dans le temps : les bobines s’allument tour à tour, le champ tourne, et le moteur démarre seul. <em>À l’écran, tout est ralenti.</em>'
        : '<strong>Un seul enroulement : ça vibre, ça ne démarre pas.</strong> Les deux bobines du principal s’allument et s’éteignent ensemble : le champ grandit, s’annule, repart dans l’autre sens, toujours sur le même axe. Rien n’indique au rotor de quel côté partir : il ronfle sur place. Ici, le fil du condensateur est débranché.');
    };
    const basculerCoupe = on => { E.coupe = on; entier.visible = !on; coupe.visible = on; couvercle.visible = !on && ctx.mode === 'decouvrir'; };
    basculerCoupe(false); maj();
    const vueDedans = { azimut: 46, elevation: 26, zoom: 1.18 };

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 34, elevation: 18, cadre: [C.carc.e, C.capot, boite, condensateur], marge: 1.04 }
                                    : { azimut: 32, elevation: 24, cadre: [C.carc.e, C.capot, boite], marge: 1.02 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      pieces: [
        { id: 'principal', nom: 'L’enroulement principal (U1 – U2)', objets: [principal.e, principal.c], desc: 'Deux bobines face à face, en haut et en bas. Seul, il crée un champ qui pulse sur un axe : il ne tourne pas.' },
        { id: 'auxiliaire', nom: 'L’enroulement auxiliaire (Z1 – Z2)', objets: [auxiliaire.e, auxiliaire.c], desc: 'Deux bobines décalées de 90°, devant et derrière. Il ne sert que si son courant est décalé : c’est le travail du condensateur.' },
        { id: 'condensateur', nom: 'Le condensateur permanent', objets: [condensateur], desc: 'En série avec l’auxiliaire. Sa capacité (16 µF) et sa tension (450 V ~) sont écrites dessus. Il reste chargé après la coupure : on le décharge avant d’y toucher.' },
        { id: 'rotor', nom: 'Le rotor à cage', objets: [rotor], desc: 'Le même que celui du triphasé : des barres d’aluminium, reliées à rien. Le repère orange montre s’il tourne ou s’il vibre.' },
        { id: 'stator', nom: 'Le stator', objets: [stator.e, stator.c], desc: 'Les tôles empilées qui portent les deux enroulements.' },
        { id: 'boite', nom: 'La boîte à bornes', objets: [boite, couvercle, bornier], desc: 'U1 – U2 pour le principal, Z1 – Z2 pour l’auxiliaire. La barrette relie U1 et Z1 ; le condensateur va sur Z2 et U2. Pour inverser le sens, on inverse l’auxiliaire.' },
        { id: 'arrivee', nom: 'L’arrivée 230 V', objets: [arrivee], desc: 'Une seule phase (marron) et le neutre (bleu), plus la terre : pas de triphasé ici.' },
        { id: 'arbre', nom: 'L’arbre', objets: [arbre], desc: 'Il sort côté charge avec sa clavette.' },
        { id: 'flasques', nom: 'Les flasques et les roulements', objets: [C.flasques.e, C.flasques.c, C.roulements], desc: 'Les deux couvercles d’extrémité portent les roulements qui tiennent l’arbre.' },
        { id: 'ventilateur', nom: 'Le ventilateur et son capot', objets: [ventil, C.capot], desc: 'Il refroidit le moteur… mais seulement quand il tourne. Bloqué, le moteur chauffe vite.' },
        { id: 'carcasse', nom: 'La carcasse à ailettes', objets: [C.carc.e, C.carc.c, C.pattes], desc: 'Plus petite que celle du triphasé de la station 6.3, mais faite de la même façon.' }
      ],
      commandes: [
        { id: 'montage', type: 'choix', options: [['sans', 'Un seul enroulement'], ['avec', 'Avec le condensateur']], valeur: 'sans' }
      ],
      etapes: [
        { titre: 'Un seul enroulement : le champ pulse sur place', texte: 'Le fil du condensateur est débranché : seul le principal reçoit le courant. Ses deux bobines s’allument et s’éteignent ensemble ; la flèche bleue du champ grandit, s’annule, se retourne — toujours sur le même axe.', actions: [['montage', 'sans']], piece: 'principal', voirDedans: true, ralenti: true, vue: vueDedans },
        { titre: 'Le rotor ne sait pas de quel côté partir : il vibre', texte: 'Le champ tire vers le haut, puis vers le bas, jamais de côté. Le rotor tremble sur place sans démarrer : le moteur ronfle et chauffe.', actions: [['montage', 'sans']], piece: 'rotor', voirDedans: true, vue: vueDedans },
        { titre: 'On branche le condensateur : l’auxiliaire reçoit un courant décalé', texte: 'Le condensateur, en série avec l’auxiliaire (Z2), met son courant en avance sur celui du principal.', actions: [['montage', 'avec']], piece: 'condensateur', voirDedans: false, vue: { azimut: 12, elevation: 60, zoom: 1.3 } },
        { titre: 'Deux courants décalés : le champ tourne, le rotor démarre seul', texte: 'Les bobines s’allument tour à tour : haut, devant, bas, derrière. La flèche du champ tourne, et le rotor la suit, un peu moins vite — comme le triphasé.', actions: [['montage', 'avec']], piece: 'auxiliaire', voirDedans: true, ralenti: true, vue: vueDedans }
      ],
      eclate: [
        { objets: [C.capot], vers: [-110, 0, 0] },
        { objets: [ventil], vers: [-62, 0, 0] },
        { objets: [C.fAr.e, C.fAr.c], vers: [-40, 0, 0] },
        { objets: [tournant, fleche], vers: [105, 0, 0] },
        { objets: [C.fAv.e, C.fAv.c], vers: [175, 0, 0] },
        { objets: [couvercle], vers: [0, 40, 0] }
      ],
      eclateVue: { azimut: 22, elevation: 20, zoom: 0.62 },
      surEclate(on) { [cAlim, cAlimN, cCond].forEach(c => { c.objet.visible = !on; }); },
      agir(id, v) {
        if (id === 'montage') { const avant = E.avec; E.avec = v === 'avec'; if (E.avec && !avant) E.wR = 0; maj(); }
      },
      animer(dt) {
        E.t += dt;
        const th = E.t * W_CHAMP;
        const ip = Math.cos(th), ia = E.avec ? Math.sin(th) : 0;
        secteurs.forEach(s => {
          let i;
          if (!E.avec) i = s.role === 'p' ? Math.abs(ip) : 0;
          else i = Math.max(0, (s.role === 'p' ? ip : ia) * s.signe);
          s.mat.emissiveIntensity = i * 0.95;
        });
        if (E.avec) poserFleche(th, 1);
        else poserFleche(ip >= 0 ? 0 : Math.PI, Math.abs(ip));
        if (E.avec) { E.wR = K.vers(E.wR, W_CHAMP * 0.94, 1.6, dt); E.aR += E.wR * dt; tournant.rotation.x = E.aR; }
        else { E.wR = 0; tournant.rotation.x = E.aR + Math.sin(E.t * 2 * W_CHAMP * 2) * 0.035; }
        ventil.rotation.x = tournant.rotation.x;
        cAlim.animer(dt); cAlimN.animer(dt); cCond.animer(dt);
        return true;
      }
    };
  }, { famille: 'machines', titre: 'Le moteur monophasé', stations: ['6.5'] });

  /* ================================================================ 6.6 — synchrone et courant continu
     Deux machines, une à la fois (bouton « Synchrone » / « Courant continu ») :
     · le moteur à courant continu (24 V ⎓, aimants permanents) : culasse, deux aimants N et S,
       rotor bobiné, COLLECTEUR à douze lames et deux BALAIS en carbone pressés par des ressorts.
       Les grains des conducteurs du rotor changent de sens quand ils passent devant les balais :
       c'est le collecteur qui inverse le courant à chaque demi-tour. Petites étincelles aux balais.
     · le moteur synchrone (quatre pôles, 1500 tr/min à 50 Hz) : le stator du triphasé, un rotor à
       quatre aimants (N rouge, S bleu) qui suit le champ EXACTEMENT — seul l'écart d'angle grandit
       avec la charge. La scène de la station n'a pas de commande : celles-ci sont propres à la 3D. */
  Electro3D.definir('machineCC', (T, K, ctx) => {
    const M = K.mat, R = tournantes(T, K);
    const racine = new T.Group();
    const NORD = K.plastique(0xc0392b, 0.4), SUD = K.plastique(0x2f6db5, 0.4);
    NORD.side = SUD.side = T.DoubleSide;
    const secteur = (r0, r1, x0, x1, phi0, dphi, mat) => {
      const g = new T.LatheGeometry([[r0, x0], [r1, x0], [r1, x1], [r0, x1], [r0, x0]].map(p => new T.Vector2(p[0], p[1])), 12, phi0, dphi);
      g.rotateZ(-Math.PI / 2); return new T.Mesh(g, mat);
    };

    /* ================================================================ la machine à courant continu */
    const dc = new T.Group(), dcE = new T.Group(), dcC = new T.Group();
    dc.add(dcE, dcC); racine.add(dc);
    const peintureDC = K.propre(M.fonte); peintureDC.side = T.DoubleSide; peintureDC.color.setHex(0x3f5a78);
    const culasse = R.double(50, 58, -50, 50, peintureDC, peintureDC, 64);
    const flasqueAvDC = { e: new T.Group(), c: new T.Group() }, cloche = { e: new T.Group(), c: new T.Group() };
    const profAv = [[9, 0], [58, 0], [58, 6], [32, 9], [20, 16], [9, 16], [9, 0]];
    [['e', false], ['c', true]].forEach(([k, cp]) => {
      const m = new T.Mesh(K.tourne(profAv, cp, 56), peintureDC); m.position.x = 50; flasqueAvDC[k].add(m);
      cloche[k].add(new T.Mesh(K.anneauX(51, 58, -82, -50, cp, 56), peintureDC), new T.Mesh(K.anneauX(9, 58, -86, -82, cp, 56), peintureDC));
    });
    cloche.c.add(K.facesCoupe(51, 58, -82, -50, peintureDC), K.facesCoupe(9, 58, -86, -82, peintureDC));
    dcE.add(culasse.e, flasqueAvDC.e, cloche.e); dcC.add(culasse.c, flasqueAvDC.c, cloche.c);
    const piedsDC = new T.Group();
    [-36, 36].forEach(x => piedsDC.add(K.mesh(K.boite(26, 14, 92, 2), peintureDC, x, -58, 0)));
    piedsDC.add(K.mesh(K.boite(96, 6, 60, 2), peintureDC, 0, -52, 0));
    dc.add(piedsDC);
    /* les deux aimants fixes : N en haut, S en bas (le quart avant-haut part avec la coupe) */
    const aimantsE = new T.Group(), aimantsC = new T.Group();
    const D60 = 60 * D;
    aimantsE.add(secteur(39, 50, -42, 42, 210 * D, D60, NORD), secteur(39, 50, -42, 42, 270 * D, D60, NORD), secteur(39, 50, -42, 42, 30 * D, 2 * D60, SUD));
    aimantsC.add(secteur(39, 50, -42, 42, 210 * D, D60, NORD), secteur(39, 50, -42, 42, 30 * D, 2 * D60, SUD));
    dcE.add(aimantsE); dcC.add(aimantsC);
    /* le rotor bobiné, son arbre et son collecteur */
    const rotorDC = new T.Group(); dc.add(rotorDC);
    const arbreDC = K.cylX(8, 208, M.acier, 8, 0, 0, 24);
    rotorDC.add(arbreDC);
    const induit = new T.Group();
    induit.add(new T.Mesh(K.anneauX(8, 36, -40, 40, false, 48), K.tolePile(2, 80)));
    const bobRot = K.bobinageMat(0.5); bobRot.side = T.DoubleSide;
    [[40, 47], [-47, -40]].forEach(([a, b]) => induit.add(new T.Mesh(K.anneauX(20, 36.4, a, b, false, 40), bobRot)));
    const N_COND = 12, conducteurs = [];
    for (let i = 0; i < N_COND; i++) {
      const b = i / N_COND * Math.PI * 2;
      const m = K.mesh(new T.BoxGeometry(80, 4, 4.6), bobRot, 0, 35 * Math.sin(b), 35 * Math.cos(b)); m.rotation.x = -b; induit.add(m);
      const c = K.courant(new T.LineCurve3(new T.Vector3(-46, 38 * Math.sin(b), 38 * Math.cos(b)), new T.Vector3(46, 38 * Math.sin(b), 38 * Math.cos(b))), { pas: 9, rayon: 1.2, vitesse: 30 });
      induit.add(c.objet); conducteurs.push({ c, b });
    }
    induit.add(K.mesh(K.boite(3, 6, 8, 1), M.plastiqueOrange, 49, 0, 26));
    rotorDC.add(induit);
    const collecteur = new T.Group();
    collecteur.add(K.cylX(13, 17, M.sombre, -59.5, 0, 0, 24));
    for (let i = 0; i < N_COND; i++) {
      const b = (i + 0.5) / N_COND * Math.PI * 2;
      const l = K.mesh(new T.BoxGeometry(16, 1.8, 6.3), M.cuivre, -59.5, 13.6 * Math.sin(b), 13.6 * Math.cos(b)); l.rotation.x = -b; collecteur.add(l);
      const r = K.mesh(new T.BoxGeometry(2.2, 10, 2.4), M.cuivre, -50, 19 * Math.sin(b), 19 * Math.cos(b)); r.rotation.x = -b; collecteur.add(r);
    }
    rotorDC.add(collecteur);
    /* les balais : deux blocs de carbone, devant (+) et derrière (−), pressés par un ressort */
    const balais = new T.Group(), etincelles = [];
    const bornesDC = new T.Group();
    const shunts = [];
    [1, -1].forEach(s => {
      balais.add(K.mesh(K.boite(10, 8, 16, 1), K.plastique(0x34383d, 0.75), -59.5, 0, s * 21.8));
      const porte = new T.Group();
      [-1, 1].forEach(c => porte.add(K.mesh(new T.BoxGeometry(14, 1.2, 13), M.laiton, -59.5, c * 5.2, s * 26)));
      [-1, 1].forEach(c => porte.add(K.mesh(new T.BoxGeometry(1.2, 11.6, 13), M.laiton, -59.5 + c * 6.2, 0, s * 26)));
      porte.add(K.mesh(K.boite(16, 8, 5, 1), K.plastique(0x1f2226), -74, 0, s * 26));
      balais.add(porte);
      const rs = K.ressort(3, 6, 4, 0.5, M.acier); rs.rotation.x = s * Math.PI / 2; rs.position.set(-59.5, 0, s * 29.8); balais.add(rs);
      const sh = K.fil([[-59.5, 3, s * 28], [-66, 10, s * 30], [-76, 14, s * 20], [-84, 16, s * 14]], 0.9, M.cuivre);
      balais.add(sh.mesh); shunts.push(sh);
      const a = K.arc(new T.Vector3(-56, 1, s * 13.9), new T.Vector3(-63, -1, s * 14.2), { rayon: 0.3, halo: 0.35 });
      balais.add(a.objet); etincelles.push(a);
      /* les deux bornes, sur le fond de la cloche */
      const borne = K.mesh(K.cylindre(2.6, 12, 14), M.laiton, -90, 16, s * 14); borne.rotation.z = Math.PI / 2; bornesDC.add(borne);
      const ec = K.mesh(K.cylindre(4.4, 3, 6), M.laiton, -88, 16, s * 14); ec.rotation.z = Math.PI / 2; bornesDC.add(ec);
      const g = K.gravure(s > 0 ? '+' : '−', 6, { couleur: '#f4ead8' }); g.rotation.y = -Math.PI / 2; g.position.set(-86.2, 29, s * 14); bornesDC.add(g);
    });
    dc.add(balais);
    const cablePlus = K.fil([[-96, 16, 14], [-108, 14, 18], [-118, -20, 30], [-122, -64, 40]], 1.6, 'rouge');
    const cableMoins = K.fil([[-96, 16, -14], [-108, 14, -18], [-118, -20, -30], [-122, -64, -40]], 1.6, 'noir');
    bornesDC.add(cablePlus.mesh, cableMoins.mesh);
    dc.add(bornesDC);
    const cPlus = K.courant(K.chemin([K.inverse(cablePlus), K.inverse(shunts[0])]), { pas: 7, rayon: 1.2, vitesse: 30 });
    const cMoins = K.courant(K.chemin([shunts[1].courbe, cableMoins.courbe]), { pas: 7, rayon: 1.2, vitesse: 30 });
    dc.add(cPlus.objet, cMoins.objet);

    /* ================================================================ le moteur synchrone */
    const sy = new T.Group(), syE = new T.Group(), syC = new T.Group();
    sy.add(syE, syC); racine.add(sy);
    const C = R.carcasseMoteur({ r: 64, demi: 72, h: 71, rArbre: 9, libre: [[Math.PI / 2 + 0.62, 0.5]] });
    syE.add(C.carc.e, C.flasques.e); syC.add(C.carc.c, C.flasques.c);
    sy.add(C.pattes, C.roulements, C.capot);
    const statorSy = R.double(36, 57, -45, 45, K.tolePile(2, 90), K.toleCoupe(90, 2), 64);
    syE.add(statorSy.e); syC.add(statorSy.c);
    const SEQ = [[0, 1], [2, -1], [1, 1], [0, -1], [2, 1], [1, -1]];
    const tetes = { e: new T.Group(), c: new T.Group() }, secteurs = [];
    const profilTete = cote => { const p = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * Math.PI * 2; p.push(new T.Vector2(47 + Math.cos(a) * 8, cote * (52 + Math.sin(a) * 6.5))); } return p; };
    for (let k = 0; k < 12; k++) {
      const [phase, signe] = SEQ[k % 6];
      const mat = K.bobinageMat(0.6); mat.side = T.DoubleSide; mat.emissive = new T.Color(0xff7a1a); mat.emissiveIntensity = 0;
      [-1, 1].forEach(cote => {
        const g = new T.LatheGeometry(profilTete(cote), 8, k * 30 * D + 0.02, 30 * D - 0.04); g.rotateZ(-Math.PI / 2);
        tetes.e.add(new T.Mesh(g, mat)); if (k < 9) tetes.c.add(new T.Mesh(g, mat));
      });
      secteurs.push({ mat, phase, signe, theta: -(k * 30 + 15) * D });
    }
    syE.add(tetes.e); syC.add(tetes.c);
    const rotorSy = new T.Group(); sy.add(rotorSy);
    const arbreSy = new T.Group(); arbreSy.add(K.cylX(9, 221, M.acier, 14.5, 0, 0, 28), K.mesh(K.boite(26, 3.4, 5, 0.6), M.acierSombre, 110, 9.2, 0));
    const roueAimants = new T.Group();
    roueAimants.add(new T.Mesh(K.anneauX(9, 32.6, -45, 45, false, 48), K.tolePile(2, 90)));
    [0, 1, 2, 3].forEach(i => roueAimants.add(secteur(32.6, 35.8, -45, 45, -(i * 90 + 38) * D, 76 * D, i % 2 ? SUD : NORD)));
    roueAimants.add(K.mesh(K.boite(3, 6, 8, 1), M.plastiqueOrange, 48, 0, 26));
    rotorSy.add(arbreSy, roueAimants);
    const ventSy = new T.Group(); ventSy.add(C.ventilateur); sy.add(ventSy);
    const boiteSy = new T.Group();
    boiteSy.add(K.mesh(K.boite(60, 30, 50, 3), C.peinture, 10, 68, -38), K.mesh(K.boite(64, 6, 54, 2.5), C.peinture, 10, 86, -38));
    [[-26, -21], [26, -21], [-26, 21], [26, 21]].forEach(([dx, dz]) => { const v = K.vis(2.4); v.position.set(10 + dx, 89, -38 + dz); boiteSy.add(v); });
    boiteSy.add(K.fil([[42, 72, -40], [70, 66, -44], [96, 10, -52], [104, -71, -60]], 5, K.plastique(0x8b9096, 0.55)).mesh);
    sy.add(boiteSy);

    /* ================================================================ l'état */
    const E = { machine: 'continu', charge: 50, sens: 1, coupe: false, aDC: 0, tSy: 0, psi: 0, psiAvant: 0, dir: 1 };
    const calcul = () => {
      if (E.machine === 'continu') { const n = Math.round(3000 - 3 * E.charge), I = 1 + 8 * E.charge / 100; return { n, I }; }
      return { n: 1500, ecart: Math.round(E.charge * 0.3) };
    };
    const maj = () => {
      dc.visible = E.machine === 'continu'; sy.visible = !dc.visible;
      const r = calcul();
      if (E.machine === 'continu') {
        ctx.regler('inverser', null, { libelle: 'Inverser le plus et le moins' });
        ctx.mesures([
          { libelle: 'La tension', valeur: (E.sens > 0 ? '+' : '−') + '24 V ⎓' },
          { libelle: 'Le courant', valeur: nb(r.I, 1) + ' A' },
          { libelle: 'La vitesse', valeur: r.n + ' tr/min' }
        ]);
        ctx.dire('<strong>Le moteur à courant continu : pas de champ tournant.</strong> Deux aimants fixes (N rouge, S bleu), un bobinage sur le rotor, deux balais en carbone qui frottent sur le collecteur. Chaque conducteur change de sens de courant en passant devant les balais : le collecteur relance le rotor à chaque demi-tour. Chargé à ' + E.charge + ' %, il tourne à ' + r.n + ' tr/min et tire ' + nb(r.I, 1) + ' A. <em>Ralenti à l’écran.</em>');
      } else {
        ctx.regler('inverser', null, { libelle: 'Inverser deux phases' });
        ctx.mesures([
          { libelle: 'Le champ', valeur: '1500 tr/min' },
          { libelle: 'Le rotor', valeur: '1500 tr/min' },
          { libelle: 'Le glissement', valeur: '0 %' }
        ]);
        ctx.dire('<strong>Le moteur synchrone : il suit le champ exactement.</strong> Son rotor porte des aimants (N rouge, S bleu) accrochés au champ tournant des trois bobinages : 1500 tr/min pile, quelle que soit la charge. Chargé à ' + E.charge + ' %, seul l’écart entre l’aimant et le champ grandit (' + r.ecart + '°). Il ne démarre pas seul : ici, un variateur l’a lancé. <em>Ralenti à l’écran.</em>');
      }
    };
    const basculerCoupe = on => { E.coupe = on; dcE.visible = syE.visible = !on; dcC.visible = syC.visible = on; };
    basculerCoupe(false); maj();
    const vueCollecteur = { azimut: -52, elevation: 24, zoom: 1.45 };
    const vueDC = { azimut: -34, elevation: 24, zoom: 1.12 };
    const vueSy = { azimut: 40, elevation: 26, zoom: 1.12 };

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 18, cadre: [culasse.e, cloche.e, flasqueAvDC.e], marge: 1.15 }
                                    : { azimut: -34, elevation: 24, cadre: [culasse.e, cloche.e, flasqueAvDC.e], marge: 1.12 },
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      basculerFantome: basculerCoupe,
      fantomeAuDepart: ctx.mode === 'comprendre',
      pieces: [
        { id: 'collecteur', nom: 'Le collecteur (continu)', objets: [collecteur], desc: 'Un anneau fendu en douze lames de cuivre, isolées entre elles. Il tourne avec le rotor et inverse le courant de chaque bobine à chaque demi-tour. C’est la pièce ingénieuse — et celle qui s’use.' },
        { id: 'balais', nom: 'Les balais en carbone (continu)', objets: [balais], desc: 'Deux blocs de carbone, pressés par un ressort, qui frottent sur le collecteur pour amener le courant au rotor. Ils s’usent, font des étincelles, et se remplacent.' },
        { id: 'aimants', nom: 'Les aimants fixes N et S (continu)', objets: [aimantsE, aimantsC], desc: 'Collés dans la culasse. Leur champ ne tourne pas : c’est le collecteur qui fait tout le travail.' },
        { id: 'induit', nom: 'Le rotor bobiné (continu)', objets: [induit], desc: 'Des conducteurs de cuivre dans les encoches. Regardez les grains : sous l’aimant N ils vont dans un sens, sous le S dans l’autre.' },
        { id: 'bornesDC', nom: 'Les bornes + et − (continu)', objets: [bornesDC], desc: 'Il est polarisé : inverser le plus et le moins inverse le sens de rotation.' },
        { id: 'rotorSy', nom: 'Le rotor à aimants (synchrone)', objets: [roueAimants], desc: 'Quatre aimants, nord et sud alternés. Ils s’accrochent au champ tournant et le suivent sans glissement.' },
        { id: 'statorSy', nom: 'Le stator et ses trois bobinages (synchrone)', objets: [statorSy.e, statorSy.c, tetes.e, tetes.c], desc: 'Le même que celui de l’asynchrone : trois bobinages qui s’allument tour à tour, le champ tourne à 1500 tr/min.' },
        { id: 'arbre', nom: 'L’arbre', objets: [arbreDC, arbreSy], desc: 'Il sort côté charge et entraîne la machine.' },
        { id: 'carcasse', nom: 'La carcasse et les flasques', objets: [culasse.e, culasse.c, cloche.e, cloche.c, flasqueAvDC.e, flasqueAvDC.c, piedsDC, C.carc.e, C.carc.c, C.flasques.e, C.flasques.c, C.pattes, C.capot, ventSy, boiteSy, C.roulements], desc: 'L’enveloppe. Sur le moteur à courant continu, la cloche arrière couvre les balais : des trappes permettent de les changer.' }
      ],
      commandes: [
        { id: 'machine', type: 'choix', options: [['synchrone', 'Synchrone'], ['continu', 'Courant continu']], valeur: 'continu' },
        { id: 'charge', type: 'curseur', libelle: 'La charge sur l’arbre', min: 0, max: 100, pas: 5, valeur: 50, format: v => v + ' %' },
        { id: 'inverser', type: 'action', libelle: 'Inverser le plus et le moins' }
      ],
      etapes: [
        { titre: 'Le courant arrive par un balai', texte: 'Du plus, le courant passe dans le balai de carbone, qui frotte sur le collecteur : il entre dans la lame qui se trouve sous lui, puis dans le bobinage du rotor.', actions: [['machine', 'continu'], ['sens', 'normal'], ['charge', 50]], piece: 'balais', voirDedans: true, vue: vueCollecteur },
        { titre: 'Le courant du rotor croise le champ des aimants : le rotor tourne', texte: 'Sous l’aimant N, les grains vont dans un sens ; sous l’aimant S, dans l’autre. L’aimant pousse les deux côtés du même côté du tour : le rotor tourne.', actions: [['machine', 'continu'], ['sens', 'normal']], piece: 'induit', voirDedans: true, vue: vueDC },
        { titre: 'Le collecteur inverse le courant à chaque demi-tour', texte: 'Quand un conducteur passe devant les balais, sa lame change de balai : son courant s’inverse. Sans cela, le rotor ferait un demi-tour et s’arrêterait face à l’aimant.', actions: [['machine', 'continu'], ['sens', 'normal']], piece: 'collecteur', voirDedans: true, ralenti: true, vue: vueCollecteur },
        { titre: 'On inverse le plus et le moins : il tourne dans l’autre sens', texte: 'Tous les courants du rotor s’inversent, les aimants ne changent pas : le moteur repart dans l’autre sens. C’est la façon la plus simple de l’inverser.', actions: [['machine', 'continu'], ['sens', 'inverse']], piece: 'bornesDC', voirDedans: true, vue: vueDC },
        { titre: 'Le synchrone : ses aimants suivent le champ, sans glissement', texte: 'Les trois bobinages s’allument tour à tour : le champ tourne. Les aimants du rotor restent accrochés en face : il tourne exactement à la vitesse du champ, 1500 tr/min.', actions: [['machine', 'synchrone'], ['sens', 'normal'], ['charge', 0]], piece: 'rotorSy', voirDedans: true, vue: vueSy },
        { titre: 'Chargé, il ne ralentit pas : 1500 tr/min pile', texte: 'On charge l’arbre : l’aimant prend un peu de retard sur le champ, mais il tourne toujours à 1500 tr/min. C’est l’indice sur une plaque : un nombre rond, c’est un synchrone.', actions: [['machine', 'synchrone'], ['charge', 100]], piece: 'statorSy', voirDedans: true, vue: vueSy }
      ],
      eclate: [
        { objets: [cloche.e, cloche.c, bornesDC], vers: [-120, 0, 0] },
        { objets: [balais], vers: [-62, 0, 0] },
        { objets: [rotorDC], vers: [96, 0, 0] },
        { objets: [flasqueAvDC.e, flasqueAvDC.c], vers: [178, 0, 0] },
        { objets: [C.capot], vers: [-110, 0, 0] },
        { objets: [ventSy], vers: [-62, 0, 0] },
        { objets: [C.fAr.e, C.fAr.c], vers: [-40, 0, 0] },
        { objets: [rotorSy], vers: [105, 0, 0] },
        { objets: [C.fAv.e, C.fAv.c], vers: [175, 0, 0] }
      ],
      eclateVue: { azimut: 20, elevation: 22, zoom: 0.6 },
      surEclate(on) { [cPlus, cMoins].concat(conducteurs.map(o => o.c)).forEach(c => { c.objet.visible = !on; }); etincelles.forEach(a => a.regler(false)); E.eclate = on; },
      agir(id, v) {
        if (id === 'machine') E.machine = v === 'synchrone' ? 'synchrone' : 'continu';
        if (id === 'charge') { E.charge = +v; ctx.regler('charge', E.charge); }
        if (id === 'inverser') E.sens = -E.sens;
        if (id === 'sens') E.sens = v === 'inverse' ? -1 : 1;
        maj();
      },
      animer(dt) {
        const r = calcul();
        if (E.machine === 'continu') {
          const w = E.sens * 2 * Math.PI * 0.45 * r.n / 3000;
          E.aDC += w * dt; rotorDC.rotation.x = E.aDC;
          const v = 12 + 22 * r.I / 9;
          conducteurs.forEach(o => { o.c.regler({ sens: Math.sin(o.b - E.aDC) >= 0 ? E.sens : -E.sens, vitesse: v }); o.c.animer(dt); });
          [cPlus, cMoins].forEach(c => { c.regler({ sens: E.sens, vitesse: v }); c.animer(dt); });
          etincelles.forEach(a => { a.regler(!E.eclate && Math.random() < 0.08 + 0.25 * E.charge / 100); a.animer(dt); });
        } else {
          E.tSy += E.sens * dt * 2 * Math.PI * 0.3;
          const elec = E.tSy * 2;
          let S = 0, Cc = 0;
          secteurs.forEach(s => {
            const i = Math.cos(elec - s.phase * 2 * Math.PI / 3) * s.signe;
            s.mat.emissiveIntensity = Math.max(0, i) * 0.85;
            S += i * Math.sin(2 * s.theta); Cc += i * Math.cos(2 * s.theta);
          });
          let psi = Math.atan2(S, Cc) / 2;
          while (psi - E.psi > Math.PI / 2) psi -= Math.PI;
          while (psi - E.psi < -Math.PI / 2) psi += Math.PI;
          if (Math.abs(psi - E.psi) > 1e-4) E.dir = Math.sign(psi - E.psi);
          E.psi = psi;
          rotorSy.rotation.x = -(psi - E.dir * r.ecart * D);
          ventSy.rotation.x = rotorSy.rotation.x;
        }
        return true;
      }
    };
  }, { famille: 'machines', titre: 'Synchrone et courant continu', stations: ['6.6'] });
})();
