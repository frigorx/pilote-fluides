/* ÉlectroRézo 3D — famille « pilotage » : le bloc de contacts, le relais, le relais temporisé,
   les boutons, l'arrêt d'urgence. La ligne 5 apprend à COMMANDER.
   Unités : millimètres. Repère : X largeur, Y hauteur, Z profondeur (+Z = face avant).
   Les appareils de porte (boutons, arrêt d'urgence) ont leur axe le long de Z : la tête est
   à l'avant (+Z), les blocs de contacts sont derrière la tôle (−Z).

   Chaque modèle raconte son mouvement pas à pas (etapes), s'éclate (eclate) et s'ouvre
   (fantome) : l'élève doit comprendre CE QUI BOUGE, POURQUOI et DANS QUEL ORDRE. */
(() => {
  'use strict';
  if (!window.Electro3D) return;
  const PI = Math.PI;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  /* =====================================================================================
     BRIQUES LOCALES — à remonter dans le kit si d'autres familles en ont besoin
     ===================================================================================== */

  /* un cylindre plein dont l'axe est Z, de z0 à z1, au point (x, y) : K.cylZ, mesuré par ses bouts */
  const cylZ = (K, r, z0, z1, mat, x, y, seg) => K.cylZ(r, Math.abs(z1 - z0), mat, x || 0, y || 0, (z0 + z1) / 2, seg || 32);
  /* une surface de révolution autour de Z : profil [[rayon, z], …].
     Doublez un point pour garder une arête vive ; sinon l'ombrage s'adoucit. */
  const revol = (T, profil, seg) => {
    const g = new T.LatheGeometry(profil.map(p => new T.Vector2(p[0], p[1])), seg || 40);
    g.rotateX(PI / 2);
    return g;
  };
  /* un tube (rayon extérieur, rayon intérieur) d'axe Z, de z0 à z1 */
  const tube = (T, rExt, rInt, z0, z1, seg) => revol(T, [[rInt, z0], [rExt, z0], [rExt, z0], [rExt, z1], [rExt, z1], [rInt, z1], [rInt, z1], [rInt, z0]], seg || 40);
  /* un écrou hexagonal (rayon circonscrit, rayon du trou), axe Z */
  const ecrouGeo = (T, rCirc, rTrou, z0, z1) => {
    const s = new T.Shape();
    for (let i = 0; i < 6; i++) { const a = i * PI / 3 + PI / 6; const x = Math.cos(a) * rCirc, y = Math.sin(a) * rCirc; if (i) s.lineTo(x, y); else s.moveTo(x, y); }
    s.closePath();
    const h = new T.Path(); h.absarc(0, 0, rTrou, 0, PI * 2, true); s.holes.push(h);
    const g = new T.ExtrudeGeometry(s, { depth: z1 - z0, bevelEnabled: false, curveSegments: 16 });
    g.translate(0, 0, z0);
    return g;
  };
  /* une tôle découpée : rectangle arrondi (l × h) percé de trous ronds [[x, y, rayon]…], épaisseur ep */
  const plaqueGeo = (T, K, l, h, r, ep, trous) => {
    const f = K.formeArrondie(l, h, r);
    (trous || []).forEach(t => { const p = new T.Path(); p.absarc(t[0], t[1], t[2], 0, PI * 2, true); f.holes.push(p); });
    return new T.ExtrudeGeometry(f, { depth: ep, bevelEnabled: false, curveSegments: 14 });
  };
  /* une lueur douce (voyant allumé) : un disque coloré qui s'estompe, toujours de face */
  const lueur = (K, hex, taille) => {
    const c = 'rgba(' + (hex >> 16 & 255) + ',' + (hex >> 8 & 255) + ',' + (hex & 255) + ',';
    const s = K.halo([[0, c + '.8)'], [.4, c + '.34)'], [1, c + '0)']]);
    s.scale.setScalar(taille); s.renderOrder = 4; s.visible = false; s.raycast = () => {};
    return s;
  };
  /* un dessin plat (flèche, pictogramme) : fn(ctx2d, largeurPx, hauteurPx) ; le plan regarde +Z */
  const dessin = (K, l, h, px, fn) => {
    const t = K.toile(l, h, px, { transparent: true }); fn(t.x, t.w, t.h);
    t.mesh.renderOrder = 2;
    return t.mesh;
  };
  /* un plan gravé qui regarde −X (le flanc gauche d'un appareil) */
  const surFlancGauche = (g, x, y, z) => { g.rotation.y = -PI / 2; g.position.set(x, y, z); return g; };

  /* =====================================================================================
     LE BLOC DE CONTACT D'UN BOUTON, VU DE L'INTÉRIEUR
     Repère local : z = 0 sur la face avant (côté poussoir) ; le bloc va jusqu'à z = −32.
     Le poussoir enfonce une tige (le plongeur) qui porte un PONT : une barre verticale.
       NO : au repos le pont est loin des deux plots fixes ; en fin de course il s'y plaque.
       NF : au repos un petit ressort plaque le pont sur les deux plots ; le plongeur ne le
            pousse qu'après une course à vide (PRE_NF) : le NF s'ouvre tôt, le NO se ferme tard.
     Les deux plots sont reliés aux deux bornes (vis, derrière le bloc) par des lames de cuivre.
     ===================================================================================== */
  const L_BLOC = 32, H_BLOC = 12.5, W_BLOC = 18, ZF_BLOC = -26;
  const PRE_NF = 2.0;      /* NF : course à vide avant que le pont quitte les plots */
  const ECART_NO = 4.6;    /* NO : espace à franchir avant de toucher */
  function construireBloc(T, K, o) {
    const M = K.mat, no = o.type === 'NO';
    const x0 = o.x || 0, yb = o.y || 0, zf = ZF_BLOC;
    const SX = 6.6, SY = 4.65, PY = 3.0;            /* lames : x = ∓SX, y = ±SY ; plots : y = ±PY */
    const BH = 1.0;                                 /* demi-épaisseur du pont */
    const zPont0 = no ? -11 : -20;                  /* centre du pont au repos */
    /* NO : les plots sont derrière le pont ; NF : devant lui, et le pont les touche */
    const zFacePlot = no ? zPont0 - BH - ECART_NO : zPont0 + BH;
    const zPlot = no ? zFacePlot - 0.6 : zFacePlot + 0.6, zLame = no ? zFacePlot - 1.8 : zFacePlot + 1.8;
    const nouveau = () => { const g = new T.Group(); g.position.set(x0, yb, zf); return g; };
    const coque = nouveau(), fixes = nouveau(), mobile = nouveau();

    /* la coque, ses vis, ses marquages */
    const shell = K.mesh(K.boite(W_BLOC, H_BLOC, L_BLOC, 1.0), M.plastiqueSombre, 0, 0, -L_BLOC / 2);
    coque.add(shell);
    const bornesLocales = [[-SX, SY], [SX, -SY]];
    bornesLocales.forEach(b => {
      coque.add(cylZ(K, 3.1, -L_BLOC - 0.35, -L_BLOC, M.acierSombre, b[0], b[1], 20));
      const v = K.vis(2.1); v.rotation.x = -PI / 2; v.position.set(b[0], b[1], -L_BLOC - 0.35); coque.add(v);
    });
    /* deux étiquettes sur le flanc, dans les bandes libres du haut et du bas (le milieu reste ouvert :
       c'est là que la tige avance) : la nature du contact, sur fond vert ou rouge, puis son repère */
    const etiq = (texte, opt, y, z) => {
      coque.add(surFlancGauche(K.gravure(texte, 2.4, opt), -W_BLOC / 2 - 0.06, y, z));
      const d = K.gravure(texte, 2.4, opt); d.rotation.y = PI / 2; d.position.set(W_BLOC / 2 + 0.06, y, z); coque.add(d);   /* et sur l'autre flanc, pour la vue de l'arrière */
    };
    etiq(no ? 'NO' : 'NF', { couleur: '#ffffff', fond: no ? '#1e7e54' : '#c0392b' }, 3.9, -3.6);
    etiq(o.repere || (no ? '13-14' : '21-22'), { couleur: '#1b2a38', fond: '#e9ecee' }, -3.9, -5.6);

    /* les pièces fixes : deux plots d'argent, deux lames de cuivre (haut, bas) jusqu'aux vis */
    [[1, -1], [-1, 1]].forEach(([s, sx]) => {
      /* s = +1 : contact du haut (lame à gauche) ; s = −1 : contact du bas (lame à droite) */
      fixes.add(K.mesh(new T.BoxGeometry(3, 2.4, 1.2), M.argent, 0, s * PY, zPlot));
      const xa = sx * (SX + 0.8), xb = -sx * 1.5;
      fixes.add(K.mesh(new T.BoxGeometry(Math.abs(xa - xb), 3.2, 1.2), M.cuivre, (xa + xb) / 2, s * (PY + 0.6), zLame));
      const long = zLame - (-L_BLOC + 1);
      fixes.add(K.mesh(new T.BoxGeometry(1.6, 1.6, long), M.cuivre, sx * SX, s * SY, zLame - long / 2));
    });

    /* les pièces mobiles : le plongeur (tige + tête) et le pont (barre + deux pastilles) */
    const rod = new T.Group();
    const finTige = no ? zPont0 + BH : zPont0 + BH + 2.6 + PRE_NF;      /* NF : un jeu de PRE_NF devant le pont */
    rod.add(cylZ(K, 1.3, finTige, 2.5, M.acier, 0, 0, 16));
    rod.add(cylZ(K, 2.5, 1.2, 2.5, M.acierSombre, 0, 0, 20));
    const pont = new T.Group();
    pont.add(K.mesh(new T.BoxGeometry(6, 7.8, 2 * BH), M.laiton, 0, 0, 0));
    const zPastille = no ? -BH - 0.25 : BH + 0.25;
    [PY, -PY].forEach(y => pont.add(K.mesh(new T.BoxGeometry(3, 2.4, 0.5), M.argent, 0, y, zPastille)));
    pont.add(K.mesh(K.boite(3.2, 3.2, 2.6, 0.4), M.plastiqueMarine, 0, 0, BH + 1.3));
    pont.position.z = zPont0;
    mobile.add(rod, pont);
    /* le NF a son petit ressort : il plaque le pont sur les plots tant que le plongeur ne le pousse pas */
    let ressortC = null;
    if (!no) {
      ressortC = K.ressort(2.4, zPont0 - BH + L_BLOC - 1, 5, 0.35, M.acier);
      ressortC.rotation.x = PI / 2; ressortC.position.set(0, 0, -L_BLOC + 1);
      mobile.add(ressortC);
    }

    /* une borne = le milieu de la vis, en repère local → repère de l'appareil */
    const borne = i => [x0 + bornesLocales[i][0], yb + bornesLocales[i][1], zf - L_BLOC];
    const etat = { ferme: !no, ouverture: 0 };
    const placer = c => {
      rod.position.z = -c;
      const course = no ? Math.min(c, ECART_NO) : Math.max(0, c - PRE_NF);
      pont.position.z = zPont0 - course;
      if (ressortC) ressortC.longueur(zPont0 - course - BH + L_BLOC - 1);
      etat.ouverture = course;
      etat.ferme = no ? c >= ECART_NO - 0.05 : course < 0.15;
      return etat.ferme;
    };
    /* le trajet du courant, quand le contact est fermé : fil → vis → lame → plot → pont → plot → lame → vis → fil */
    const points = () => {
      const zPont = no ? zPont0 - ECART_NO : zPont0;
      const P = (x, y, z) => [x0 + x, yb + y, zf + z];
      return [borne(0), P(-SX, SY, zLame), P(0, PY, zLame), P(0, PY, zPlot), P(0, PY, zPont), P(0, -PY, zPont), P(0, -PY, zPlot), P(0, -PY, zLame), P(SX, -SY, zLame), borne(1)];
    };
    const chemin = (filHaut, filBas) => K.chemin([K.inverse(filHaut), ...points(), filBas.courbe]);
    placer(0);
    return { type: o.type, coque, fixes, mobile, shell, borne, placer, points, chemin, etat, x0, yb, zf };
  }

  /* =====================================================================================
     L'APPAREIL DE PORTE Ø 22 : collerette, tête, corps et écrou, tige, ressort de rappel, blocs.
     L'axe est Z. La tôle est en z ∈ [−2, 0] ; la face avant de la collerette est en z = 5.
     ===================================================================================== */
  const Z_TETE = 5.1;      /* le dessous de la tête au repos : elle dépasse de 9,6 mm de la collerette */
  function construirePoste(T, K, o) {
    const M = K.mat;
    const course = o.course || 5.0;
    const G = new T.Group(); G.position.set(o.x || 0, o.y || 0, 0);

    /* la collerette (Ø 30) : une bague d'aluminium vissée sur le corps */
    const bezel = new T.Group();
    if (o.collerette) bezel.add(o.collerette);
    else if (!o.sansCollerette) bezel.add(new T.Mesh(revol(T, [[11.3, 0], [15, 0], [15, 0], [15, 4.2], [14.2, 5], [14.2, 5], [11.3, 5], [11.3, 5], [11.3, 0]], 48), o.matCollerette || M.aluminium));

    /* la tête : un capuchon Ø 22 qui dépasse de la collerette */
    const zTete = o.zTete === undefined ? Z_TETE : o.zTete;
    const tete = new T.Group(); tete.position.z = zTete;
    if (o.tete) tete.add(o.tete);
    else tete.add(new T.Mesh(revol(T, [[0, 0], [10.8, 0], [10.8, 0], [11, 0.5], [11, 7.4], [10.4, 8.8], [9, 9.4], [7.5, 9.5], [0, 9.5]], 40), o.matTete || M.plastiqueNoir));
    if (o.marqueTete) tete.add(o.marqueTete);

    /* le corps (tube Ø 22) qui traverse la tôle, et son écrou ; derrière, le support des blocs */
    const corps = new T.Group(), ecrou = new T.Group(), support = new T.Group();
    corps.add(new T.Mesh(tube(T, 11, 9.5, -13, 0, 40), M.plastiqueSombre));
    ecrou.add(new T.Mesh(ecrouGeo(T, 15.5, 11, -6, -2), M.zingue));
    support.add(new T.Mesh(tube(T, 16, 14, -26, -13, 48), M.plastiqueSombre));
    support.add(new T.Mesh(revol(T, [[4.6, -14], [14, -14], [14, -14], [14, -13], [14, -13], [4.6, -13], [4.6, -13], [4.6, -14]], 40), M.plastiqueSombre));

    /* la tige : tête → tôle → support ; une collerette d'appui pour le ressort, une barre au bout */
    const tige = new T.Group();
    const deuxBlocs = (o.blocs || []).length > 1;
    tige.add(o.tigeMesh || cylZ(K, 4, deuxBlocs ? -21.5 : -23.5, 6, M.acier, 0, 0, 24));
    tige.add(cylZ(K, 7.5, -2.1, -0.9, M.acier, 0, 0, 32));
    if (deuxBlocs) tige.add(K.mesh(K.boite(5, 19.8, 2, 0.5), M.acierSombre, 0, 0, -22.5));
    if (o.encoche) tige.add(o.encoche);

    /* le ressort de rappel : dans le corps, entre la collerette de la tige et le fond */
    const ressort = K.ressort(8.0, 11, 6, 0.5, M.acier);
    ressort.rotation.x = PI / 2; ressort.position.set(0, 0, -13);

    /* les blocs */
    const blocs = (o.blocs || []).map(b => construireBloc(T, K, b));
    G.add(bezel, tete, corps, ecrou, support, tige, ressort);
    blocs.forEach(b => G.add(b.coque, b.fixes, b.mobile));

    const placer = c => {
      c = clamp(c, 0, course);
      tete.position.z = zTete - c;
      tige.position.z = -c;
      ressort.longueur(11 - c);
      return blocs.map(b => b.placer(c));
    };
    placer(0);
    return { G, bezel, tete, corps, ecrou, support, tige, ressort, blocs, placer, course };
  }

  /* n'écrire les mesures dans la page que si elles ont changé : maj() tourne à chaque image pendant un mouvement */
  const mesuresSiChange = ctx => { let d = ''; return m => { const c = JSON.stringify(m); if (c !== d) { d = c; ctx.mesures(m); } }; };

  /* un fil de commande qui part d'une vis vers l'arrière, en s'écartant (il finit en l'air : coupé net) */
  const filArriere = (K, p, dx, dy, couleur) => K.fil([p, [p[0], p[1], p[2] - 6], [p[0] + dx * 0.45, p[1] + dy * 0.45, p[2] - 17], [p[0] + dx, p[1] + dy, p[2] - 24]], 0.9, couleur || 'rouge');

  /* =====================================================================================
     5.1 — LE BLOC DE CONTACTS : un bouton Ø 22 en coupe, un NO et un NF derrière
     ===================================================================================== */
  Electro3D.definir('blocContacts', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const P = construirePoste(T, K, { course: 5.0, matTete: M.plastiqueNoir, blocs: [{ type: 'NO', y: 6.65, repere: '13-14' }, { type: 'NF', y: -6.65, repere: '21-22' }] });
    const [no, nf] = P.blocs;
    racine.add(P.G);

    /* un morceau de la tôle de la porte, percé du trou normalisé de 22 mm */
    const tole = new T.Mesh(plaqueGeo(T, K, 58, 58, 4, 2, [[0, 0, 11.25]]), M.plastique);
    tole.position.z = -2;
    racine.add(tole);

    /* les quatre fils (fils de commande : rouges) et le courant dans le contact fermé */
    const fils = new T.Group();
    const dir = [[-7, 3], [8, -2], [-8, 2], [7, -3]];
    const f = [no.borne(0), no.borne(1), nf.borne(0), nf.borne(1)].map((p, i) => filArriere(K, p, dir[i][0], dir[i][1]));
    f.forEach(w => fils.add(w.mesh));
    P.G.add(fils);
    const courants = [K.courant(no.chemin(f[0], f[1]), { pas: 5.5, rayon: 1.1, vitesse: 30 }), K.courant(nf.chemin(f[2], f[3]), { pas: 5.5, rayon: 1.1, vitesse: 30 })];
    courants.forEach(c => { c.regler({ debit: 0, alternatif: true, frequence: 0.7 }); P.G.add(c.objet); });

    /* l'état et le mouvement : le bouton revient seul, comme poussé par son ressort */
    const pos = K.mobile(0, 420, 40);
    const lecon = on => { pos.k = on ? 90 : 420; pos.c = on ? 19 : 40; };   /* la leçon : l'œil doit suivre */
    let actionne = false, eclatee = false;
    const ecrire = mesuresSiChange(ctx);
    const PHRASES = {
      repos: '<strong>Au repos.</strong> Personne n’appuie : le ressort tient le bouton sorti. Le contact NF (21-22) est fermé : le courant passe. Le contact NO (13-14) est ouvert : rien ne passe.',
      actionne: '<strong>On appuie.</strong> Le bouton pousse la tige, et la tige pousse les deux blocs. Le NF s’ouvre en premier ; en fin de course, le NO se ferme. Dès qu’on lâche, le ressort ramène tout.'
    };
    const maj = () => {
      const ferm = P.placer(pos.x);
      courants[0].regler({ debit: ferm[0] && !eclatee ? 1 : 0 });
      courants[1].regler({ debit: ferm[1] && !eclatee ? 1 : 0 });
      ecrire([{ libelle: 'Contact NO · 13-14', valeur: ferm[0] ? 'fermé' : 'ouvert' }, { libelle: 'Contact NF · 21-22', valeur: ferm[1] ? 'fermé' : 'ouvert' }]);
    };
    /* le mouvement découpé pour la leçon : la tige d'abord, puis le NF, puis le NO */
    const PAS = { repos: 0, tige: 1.9, nf: 3.8, no: P.course, relache: 0 };
    const agir = (id, v) => {
      if (id === 'phase') {
        lecon(true); pos.cible = PAS[v]; actionne = pos.cible > 0;
        ctx.regler('etat', actionne ? 'actionne' : 'repos');
        return;
      }
      if (id !== 'etat') return;
      lecon(false);
      actionne = v === 'actionne';
      pos.cible = actionne ? P.course : 0;
      ctx.dire(PHRASES[actionne ? 'actionne' : 'repos']);
    };
    maj();

    const cadre = [P.tete, P.corps, P.support, P.bezel, no.shell, nf.shell, tole];
    const vueDessus = ctx.mode === 'decouvrir' ? { azimut: -40, elevation: 14, cadre, marge: 0.92, zoom: 1.2 } : { azimut: -66, elevation: 10, cadre, marge: 0.92, zoom: 1.27 };
    return {
      racine,
      vue: vueDessus,
      fantome: [P.corps, P.support, no.shell, nf.shell, tole],
      phrase: PHRASES.repos,
      pieces: [
        { id: 'tete', nom: 'La tête du bouton', objets: [P.tete], desc: 'Elle est en plastique noir. C’est ce que le doigt touche : elle pousse la tige.' },
        { id: 'collerette', nom: 'La collerette (Ø 30)', objets: [P.bezel], desc: 'Une bague en aluminium. Elle cache le trou de la tôle et guide la tête.' },
        { id: 'tole', nom: 'La tôle de la porte', objets: [tole], desc: 'Le trou mesure 22 mm : c’est le diamètre normalisé des boutons.' },
        { id: 'corps', nom: 'Le corps et l’écrou', objets: [P.corps, P.ecrou, P.support], desc: 'Le corps traverse la tôle, l’écrou le serre. Derrière, un support reçoit les blocs de contacts.' },
        { id: 'tige', nom: 'La tige', objets: [P.tige], desc: 'La tête pousse la tige. À son bout, une petite barre pousse les deux blocs en même temps.' },
        { id: 'ressort', nom: 'Le ressort de rappel', objets: [P.ressort], desc: 'Dès qu’on lâche, il repousse la tige : le bouton revient tout seul.' },
        { id: 'blocNO', nom: 'Le bloc NO (13 – 14)', objets: [no.coque], desc: 'Un contact normalement ouvert : au repos, il ne laisse rien passer. Il se ferme quand on appuie.' },
        { id: 'blocNF', nom: 'Le bloc NF (21 – 22)', objets: [nf.coque], desc: 'Un contact normalement fermé : au repos, le courant passe. Il s’ouvre quand on appuie.' },
        { id: 'fixes', nom: 'Les pièces fixes', objets: [no.fixes, nf.fixes], desc: 'Deux plots d’argent et leurs lames de cuivre, reliés aux bornes. Elles ne bougent jamais.' },
        { id: 'pontNO', nom: 'Le pont du NO', objets: [no.mobile], desc: 'Une barre de cuivre. Elle part loin des plots et ne les touche qu’en fin de course.' },
        { id: 'pontNF', nom: 'Le pont du NF et son ressort', objets: [nf.mobile], desc: 'Une barre de cuivre. Un petit ressort la plaque sur les plots : le courant passe. Le plongeur la décolle quand on appuie.' },
        { id: 'fils', nom: 'Les fils de commande', objets: [fils], desc: 'Des fils rouges, fins : ils ne portent que le courant de commande.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['repos', 'Au repos'], ['actionne', 'On appuie']], valeur: 'repos' }
      ],
      etapes: [
        { titre: 'Au repos', piece: 'ressort', voirDedans: true, actions: [['phase', 'repos']],
          vue: { azimut: -66, elevation: 10, zoom: 1.27, cible: null },
          texte: 'Personne n’appuie : le ressort de rappel tient le bouton sorti. Le NF (21-22) est fermé, des grains dorés le traversent. Le NO (13-14) est ouvert : son pont est loin des plots.' },
        { titre: 'On appuie : la tige descend', piece: 'tige', ralenti: true, actions: [['phase', 'tige']],
          vue: { azimut: -78, elevation: 8, zoom: 2.0, cible: [0, 0, -8] },
          texte: 'Le doigt enfonce la tête. La tête pousse la tige, et la tige pousse les deux blocs. Rien n’a encore changé dans les contacts : le NF est fermé, le NO est ouvert.' },
        { titre: 'Le NF s’ouvre', piece: 'pontNF', ralenti: true, actions: [['phase', 'nf']],
          vue: { azimut: -80, elevation: 10, zoom: 1.75, cible: [0, -3, -28] },
          texte: 'La tige continue : elle décolle le pont du NF de ses deux plots. Le courant ne passe plus par le NF. Le NO n’est pas encore fermé.' },
        { titre: 'Le NO se ferme', piece: 'pontNO', ralenti: true, actions: [['phase', 'no']],
          vue: { azimut: -80, elevation: 10, zoom: 1.75, cible: [0, 3, -28] },
          texte: 'En fin de course, le pont du NO arrive sur ses deux plots : le courant passe. Les deux contacts ont basculé, d’un seul geste.' },
        { titre: 'On lâche : le ressort ramène tout', piece: 'ressort', ralenti: true, actions: [['phase', 'relache']], duree: 7,
          vue: { azimut: -66, elevation: 10, zoom: 1.27, cible: null },
          texte: 'Le ressort de rappel repousse la tige. Le NO s’ouvre, le NF se referme : on retrouve l’état de repos.' }
      ],
      /* l'éclaté, dans l'ordre du démontage : la tête et la tige sortent par l'avant, la collerette,
         puis le corps, l'écrou, le ressort et le support par l'arrière ; les blocs s'ouvrent sur le côté */
      eclate: [
        { objets: [P.tete, P.tige], vers: [0, 0, 64], debut: 0, fin: 0.4 },
        { objets: [P.bezel], vers: [0, 0, 30], debut: 0.1, fin: 0.5 },
        { objets: [P.corps], vers: [0, 0, -14], debut: 0.3, fin: 0.7 },
        { objets: [P.ecrou], vers: [0, 0, -34], debut: 0.35, fin: 0.75 },
        { objets: [P.ressort], vers: [0, 0, -48], debut: 0.4, fin: 0.8 },
        { objets: [P.support], vers: [0, 0, -62], debut: 0.5, fin: 0.9 },
        { objets: [no.mobile, nf.mobile], vers: [0, 0, -66], debut: 0.6, fin: 1 },
        { objets: [no.fixes, nf.fixes, fils], vers: [0, 0, -80], debut: 0.6, fin: 1 },
        { objets: [no.coque, nf.coque], vers: [-34, 0, -80], debut: 0.7, fin: 1 }
      ],
      eclateVue: { azimut: -52, elevation: 14, zoom: 0.64, cible: [-4, 0, -34] },
      surEclate(on) { eclatee = on; maj(); },
      agir,
      animer(dt) {
        const bouge = pos.pas(dt);
        if (bouge) maj();
        let actif = bouge;
        courants.forEach(c => { if (c.animer(dt)) actif = true; });
        return actif;
      }
    };
  }, { famille: 'pilotage', titre: 'Le bloc de contacts', stations: ['5.1'] });

  /* =====================================================================================
     5.7 — LES BOUTONS : une face avant de coffret, MARCHE (vert, NO 13-14) et ARRÊT (rouge, NF 21-22)
     Vue de face : les têtes. Vue de l'arrière : les blocs, les repères, les fils.
     La couleur de la tête ne commande rien : c'est le repère écrit sur le bloc qui dit NO ou NF.
     ===================================================================================== */
  Electro3D.definir('boutons', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group(), pivot = new T.Group(), monde = new T.Group();
    pivot.position.z = -20; monde.position.z = 20;
    racine.add(pivot); pivot.add(monde);
    const XM = -27.5, XA = 27.5, YB = 8;
    const marque = txt => { const g = K.gravure(txt, 7, { couleur: '#ffffff' }); g.position.z = 9.6; return g; };
    const PM = construirePoste(T, K, { x: XM, y: YB, course: 5.0, matTete: M.plastiqueVert, marqueTete: marque('I'), blocs: [{ type: 'NO', y: 0, repere: '13-14' }] });
    const PA = construirePoste(T, K, { x: XA, y: YB, course: 5.0, matTete: M.plastiqueRouge, marqueTete: marque('O'), blocs: [{ type: 'NF', y: 0, repere: '21-22' }] });
    const bM = PM.blocs[0], bA = PA.blocs[0];

    /* la face avant d'un coffret : une tôle percée de deux trous Ø 22, repliée sur son pourtour */
    const PW = 130, PH = 84;
    const tole = new T.Mesh(plaqueGeo(T, K, PW, PH, 6, 2, [[XM, YB, 11.25], [XA, YB, 11.25]]), M.plastique);
    tole.position.z = -2;
    const bord = K.formeArrondie(PW, PH, 6); bord.holes.push(K.formeArrondie(PW - 3, PH - 3, 4.5));
    const rebord = new T.Mesh(new T.ExtrudeGeometry(bord, { depth: 8, bevelEnabled: false, curveSegments: 10 }), M.plastique);
    rebord.position.z = -10;
    const plaques = new T.Group();
    plaques.add(K.mesh(K.boite(34, 9, 0.8, 0.3), M.plastiqueBlanc, XM, YB - 26, 0.4), K.mesh(K.boite(34, 9, 0.8, 0.3), M.plastiqueBlanc, XA, YB - 26, 0.4));
    const mot = (t, x) => { const g = K.gravure(t, 4.4, { couleur: '#1b2a38' }); g.position.set(x, YB - 26, 0.86); return g; };
    plaques.add(mot('MARCHE', XM), mot('ARRÊT', XA));
    monde.add(tole, rebord, plaques, PM.G, PA.G);

    /* les fils de commande (rouges) et le courant dans le contact fermé */
    const filsM = new T.Group(), filsA = new T.Group();
    const wM = [bM.borne(0), bM.borne(1)].map((p, i) => filArriere(K, p, [-10, -6][i], [4, -4][i]));
    const wA = [bA.borne(0), bA.borne(1)].map((p, i) => filArriere(K, p, [6, 10][i], [4, -4][i]));
    wM.forEach(w => filsM.add(w.mesh)); wA.forEach(w => filsA.add(w.mesh));
    PM.G.add(filsM); PA.G.add(filsA);
    const courM = K.courant(bM.chemin(wM[0], wM[1]), { pas: 5.5, rayon: 1.1, vitesse: 30 });
    const courA = K.courant(bA.chemin(wA[0], wA[1]), { pas: 5.5, rayon: 1.1, vitesse: 30 });
    [courM, courA].forEach(c => c.regler({ debit: 0, alternatif: true, frequence: 0.7 }));
    PM.G.add(courM.objet); PA.G.add(courA.objet);

    /* le mouvement : deux boutons indépendants, et la face avant qui se retourne */
    const posM = K.mobile(0, 420, 40), posA = K.mobile(0, 420, 40), ang = K.mobile(0, 60, 14);
    const lecon = on => { posM.k = posA.k = on ? 90 : 420; posM.c = posA.c = on ? 19 : 40; };
    let eclatee = false;
    const ecrire = mesuresSiChange(ctx);
    const PHRASES = {
      repos: '<strong>Au repos.</strong> Les deux boutons sont sortis. Derrière le vert, le bloc NO (13-14) est ouvert. Derrière le rouge, le bloc NF (21-22) est fermé : le courant passe. Lisez le repère du bloc, pas la couleur.',
      marche: '<strong>On appuie sur MARCHE.</strong> La tête pousse la tige : le contact NO (13-14) se ferme, le courant passe. Dès qu’on lâche, le ressort le rouvre.',
      arret: '<strong>On appuie sur ARRÊT.</strong> La tête pousse la tige : le contact NF (21-22) s’ouvre, le courant ne passe plus. Dès qu’on lâche, le ressort le referme.'
    };
    const maj = () => {
      const a = PM.placer(posM.x)[0], b = PA.placer(posA.x)[0];
      courM.regler({ debit: a && !eclatee ? 1 : 0 }); courA.regler({ debit: b && !eclatee ? 1 : 0 });
      ecrire([{ libelle: 'NO · 13-14 (derrière MARCHE)', valeur: a ? 'fermé' : 'ouvert' }, { libelle: 'NF · 21-22 (derrière ARRÊT)', valeur: b ? 'fermé' : 'ouvert' }]);
    };
    const PAS = { repos: [0, 0, 'repos'], 'm-tige': [3.0, 0, 'marche'], 'm-no': [5.0, 0, 'marche'], lache: [0, 0, 'repos'], 'a-nf': [0, 5.0, 'arret'] };
    /* « solo » : pendant une étape on ne garde qu'un seul bouton, pour que l'autre ne gêne pas la vue de profil */
    const solo = v => { PM.G.visible = v !== 'a'; PA.G.visible = v !== 'm'; };
    const agir = (id, v) => {
      if (id === 'solo') { solo(v); return; }
      if (id === 'vue') { ang.cible = v === 'arriere' ? PI : 0; solo(null); return; }
      if (id === 'phase') {
        lecon(true); const [m, a, e] = PAS[v]; posM.cible = m; posA.cible = a; ctx.regler('etat', e); return;
      }
      if (id !== 'etat') return;
      lecon(false); solo(null);
      posM.cible = v === 'marche' ? PM.course : 0; posA.cible = v === 'arret' ? PA.course : 0;
      ctx.dire(PHRASES[v]);
    };
    maj();

    const cadre = [tole];
    const devant = ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 14, cadre, marge: 1.0, zoom: 1.3 } : { azimut: -42, elevation: 14, cadre, marge: 1.0, zoom: 1.3 };
    /* la cible d'un point de l'arrière, une fois la face avant retournée : (x, z) → (−x, −z − 40) */
    const arriere = (x, y, z) => [-x, y, -z - 40];
    return {
      racine,
      vue: devant,
      fantome: [tole, rebord, PM.corps, PM.support, PA.corps, PA.support, bM.shell, bA.shell],
      phrase: PHRASES.repos,
      pieces: [
        { id: 'teteMarche', nom: 'Le bouton MARCHE (vert, « I »)', objets: [PM.tete, PM.bezel], desc: 'Un bouton-poussoir Ø 22. Le vert est une habitude : il ne change rien au contact qui est derrière.' },
        { id: 'teteArret', nom: 'Le bouton ARRÊT (rouge, « O »)', objets: [PA.tete, PA.bezel], desc: 'Le rouge est une habitude, comme le vert. C’est le bloc derrière qui décide.' },
        { id: 'tole', nom: 'La face avant du coffret', objets: [tole, rebord, plaques], desc: 'Une tôle percée de deux trous de 22 mm. Les plaques blanches disent à quoi sert chaque bouton.' },
        { id: 'corps', nom: 'Les corps et les écrous', objets: [PM.corps, PM.ecrou, PM.support, PA.corps, PA.ecrou, PA.support], desc: 'Chaque corps traverse la tôle, un écrou le serre. Derrière, un support reçoit le bloc de contact.' },
        { id: 'tiges', nom: 'Les tiges', objets: [PM.tige, PA.tige], desc: 'La tête pousse la tige, la tige pousse le bloc de contact.' },
        { id: 'ressorts', nom: 'Les ressorts de rappel', objets: [PM.ressort, PA.ressort], desc: 'Dès qu’on lâche, le ressort repousse la tige : le bouton revient seul. Un poussoir ne garde aucune position.' },
        { id: 'blocNO', nom: 'Le bloc NO (13 – 14), derrière MARCHE', objets: [bM.coque, filsM], desc: 'Un contact normalement ouvert. Le repère 13-14 est écrit sur le bloc : c’est lui qu’il faut lire.' },
        { id: 'blocNF', nom: 'Le bloc NF (21 – 22), derrière ARRÊT', objets: [bA.coque, filsA], desc: 'Un contact normalement fermé. Le repère 21-22 est écrit sur le bloc. Un bouton vert pourrait très bien en porter un.' },
        { id: 'fixes', nom: 'Les pièces fixes des contacts', objets: [bM.fixes, bA.fixes], desc: 'Les plots d’argent et leurs lames de cuivre, reliés aux bornes. Elles ne bougent jamais.' },
        { id: 'pontNO', nom: 'Le pont du NO', objets: [bM.mobile], desc: 'La barre qui vient toucher les plots en fin de course.' },
        { id: 'pontNF', nom: 'Le pont du NF et son ressort', objets: [bA.mobile], desc: 'La barre que le ressort plaque sur les plots. La tige la décolle dès qu’on appuie.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['repos', 'Au repos'], ['marche', 'On appuie sur MARCHE'], ['arret', 'On appuie sur ARRÊT']], valeur: 'repos' },
        { id: 'vue', type: 'choix', options: [['face', 'Vue de face'], ['arriere', 'Vue de l’arrière']], valeur: 'face' }
      ],
      etapes: [
        { titre: 'Au repos', voirDedans: true, actions: [['vue', 'arriere'], ['phase', 'repos']],
          vue: { azimut: -24, elevation: 12, zoom: 1.7, cible: [0, 8, 2] },
          texte: 'Vu de l’arrière : derrière MARCHE, le bloc NO (13-14) est ouvert. Derrière ARRÊT, le bloc NF (21-22) est fermé : le courant passe, regardez les grains dorés.' },
        { titre: 'On appuie sur MARCHE : la tête s’enfonce', piece: 'teteMarche', ralenti: true, voirDedans: true, actions: [['vue', 'face'], ['solo', 'm'], ['phase', 'm-tige']],
          vue: { azimut: -74, elevation: 8, zoom: 1.9, cible: [XM, YB, -8] },
          texte: 'Le doigt enfonce le bouton vert. La tête pousse la tige, qui descend derrière la tôle et appuie sur le bloc. Le contact n’a pas encore bougé.' },
        { titre: 'Le contact NO se ferme', piece: 'pontNO', ralenti: true, voirDedans: true, actions: [['vue', 'arriere'], ['solo', 'm'], ['phase', 'm-no']],
          vue: { azimut: -86, elevation: 6, zoom: 1.85, cible: arriere(XM, YB, -34) },
          texte: 'En fin de course, le pont du NO arrive sur ses deux plots : le courant passe. C’est le bloc NO qui ferme le circuit, pas la couleur du bouton.' },
        { titre: 'On lâche : le ressort ramène le bouton', piece: 'ressorts', ralenti: true, voirDedans: true, actions: [['vue', 'face'], ['solo', 'm'], ['phase', 'lache']], duree: 7,
          vue: { azimut: -74, elevation: 8, zoom: 1.9, cible: [XM, YB, -8] },
          texte: 'Le ressort de rappel repousse la tige et la tête sort : le NO se rouvre. Un bouton-poussoir ne garde aucune position.' },
        { titre: 'On appuie sur ARRÊT : le contact NF s’ouvre', piece: 'pontNF', ralenti: true, voirDedans: true, actions: [['vue', 'arriere'], ['solo', 'a'], ['phase', 'a-nf']],
          vue: { azimut: -86, elevation: 6, zoom: 1.85, cible: arriere(XA, YB, -34) },
          texte: 'La tige décolle le pont du NF de ses deux plots : le courant ne passe plus. Le circuit qui passait par le NF est coupé.' }
      ],
      /* l'éclaté : sur chaque bouton, la tête et la tige sortent par l'avant, tout le reste par l'arrière */
      eclate: [PM, PA].flatMap(P => [
        { objets: [P.tete, P.tige], vers: [0, 0, 52], debut: 0, fin: 0.4 },
        { objets: [P.bezel], vers: [0, 0, 26], debut: 0.1, fin: 0.5 },
        { objets: [P.corps], vers: [0, 0, -12], debut: 0.3, fin: 0.7 },
        { objets: [P.ecrou], vers: [0, 0, -28], debut: 0.35, fin: 0.75 },
        { objets: [P.ressort], vers: [0, 0, -40], debut: 0.4, fin: 0.8 },
        { objets: [P.support], vers: [0, 0, -52], debut: 0.5, fin: 0.9 },
        { objets: [P.blocs[0].mobile], vers: [0, 0, -54], debut: 0.6, fin: 1 },
        { objets: [P.blocs[0].fixes], vers: [0, 0, -66], debut: 0.6, fin: 1 },
        { objets: [P.blocs[0].coque], vers: [0, 34, -66], debut: 0.7, fin: 1 }
      ]).concat([{ objets: [filsM, filsA], vers: [0, 0, -66], debut: 0.6, fin: 1 }]),
      eclateVue: { azimut: -62, elevation: 14, zoom: 0.78, cible: [0, 0, -34] },
      /* éclaté : on repasse de face (les têtes vers l'écran), et le courant n'a plus de sens */
      surEclate(on) { eclatee = on; if (on) { ang.cible = 0; solo(null); ctx.regler('vue', 'face'); } maj(); },
      agir,
      animer(dt) {
        let actif = false;
        const a = posM.pas(dt), b = posA.pas(dt), c = ang.pas(dt);
        if (a || b) { maj(); actif = true; }
        if (c) { pivot.rotation.y = ang.x; actif = true; }
        [courM, courA].forEach(g => { if (g.animer(dt)) actif = true; });
        return actif;
      }
    };
  }, { famille: 'pilotage', titre: 'Les boutons', stations: ['5.7'] });

  /* =====================================================================================
     5.8 — L'ARRÊT D'URGENCE « COUP DE POING » + la chaîne de sécurité + les voyants
     Le champignon s'enfonce et RESTE enfoncé : un cliquet à ressort tombe dans une gorge de la tige
     (l'accrochage). On le libère en le tournant. Son contact NF (11-12) est en série dans la chaîne
     phase → NF → fil → bobine KM1 → neutre : qu'il s'ouvre, ou qu'un fil casse, la bobine retombe.
     Les trois voyants (informent, ne commandent rien) : vert = la bobine est alimentée, rouge = l'arrêt
     d'urgence est frappé, orange = la chaîne est coupée (la machine est arrêtée).
     ===================================================================================== */
  Electro3D.definir('arretUrgence', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const XU = -38, XV = 36;                 /* l'arrêt d'urgence ; la colonne des voyants */
    const COURSE = 6.0, ZT = 10;             /* course du champignon ; dessous de la tête au repos */
    const Z_PIN = -19, Z_GORGE = Z_PIN + COURSE;   /* la gorge de la tige passe devant le cliquet en fin de course */

    /* le champignon rouge Ø 40, plat au sommet, avec sa flèche « tourner pour déverrouiller » */
    const champ = new T.Group();
    champ.add(new T.Mesh(revol(T, [[0, 2], [16, 2], [19.5, 0.2], [20, 0.7], [20, 0.7], [20, 3.5], [19.1, 7], [17, 10.4], [14, 13.4], [10.5, 15.6], [8, 16.4], [0, 16.4]], 48), M.plastiqueRouge));
    const fleche = dessin(K, 10, 10, 48, (x, w, h) => {
      x.translate(w / 2, h / 2); x.strokeStyle = x.fillStyle = '#ffffff'; x.lineWidth = 34;
      const r = 150, a1 = 4.1;
      x.beginPath(); x.arc(0, 0, r, -0.5, a1, false); x.stroke();
      const px = Math.cos(a1) * r, py = Math.sin(a1) * r, tx = -Math.sin(a1), ty = Math.cos(a1), nx = Math.cos(a1), ny = Math.sin(a1);
      x.beginPath(); x.moveTo(px + tx * 78, py + ty * 78); x.lineTo(px + nx * 64, py + ny * 64); x.lineTo(px - nx * 64, py - ny * 64); x.closePath(); x.fill();
    });
    fleche.position.z = 16.5; champ.add(fleche);
    /* la collerette jaune Ø 60 */
    const collier = new T.Group();
    collier.add(new T.Mesh(revol(T, [[11.3, 0], [30, 0], [30, 0], [30, 2.2], [29, 3.2], [29, 3.2], [11.3, 3.2], [11.3, 3.2], [11.3, 0]], 64), M.plastiqueJaune));
    /* la tige, avec sa gorge */
    const tigeMesh = new T.Mesh(revol(T, [[0, -23.5], [4, -23.5], [4, -23.5], [4, Z_GORGE - 1.8], [2.8, Z_GORGE - 1.2], [2.8, Z_GORGE + 1.2], [4, Z_GORGE + 1.8], [4, 6], [4, 6], [0, 6]], 32), M.acier);

    const cle = K.mesh(new T.BoxGeometry(1.6, 9, 1.6), M.acierSombre, 0, 0, -16);          /* clavette : la tige tourne avec la tête */
    const P = construirePoste(T, K, { x: XU, course: COURSE, zTete: ZT, tete: champ, collerette: collier, tigeMesh, encoche: cle, blocs: [{ type: 'NF', y: 0, repere: '11-12' }] });
    const bloc = P.blocs[0];

    /* le cliquet (le cran) : une tige à ressort qui rentre dans la gorge quand la tête est tout en bas */
    const cran = new T.Group();
    const pinRod = new T.Mesh(new T.CylinderGeometry(1.5, 1.5, 18, 16).rotateZ(PI / 2), M.acierSombre); pinRod.position.z = Z_PIN;
    const pinTete = new T.Mesh(new T.CylinderGeometry(2.8, 2.8, 1.5, 20).rotateZ(PI / 2), M.acierSombre); pinTete.position.z = Z_PIN;
    const ressCran = K.ressort(2.2, 6, 4, 0.3, M.acier); ressCran.rotation.z = -PI / 2; ressCran.position.z = Z_PIN;
    cran.add(pinRod, pinTete, ressCran);
    cran.add(K.mesh(K.boite(1.5, 8, 8, 0.3), M.zingue, 30.2, 0, Z_PIN));
    [3.6, -3.6].forEach(y => cran.add(K.mesh(new T.BoxGeometry(14.4, 1.2, 1.2), M.zingue, 23.4, y, Z_PIN)));
    const placerCran = xTip => {
      pinRod.position.x = xTip + 9; pinTete.position.x = xTip + 18.75;
      ressCran.position.x = xTip + 19.5; ressCran.longueur(10 - xTip);
    };
    P.G.add(cran);

    /* la face avant : une tôle percée (l'arrêt d'urgence + trois voyants), repliée sur son pourtour */
    const PW = 150, PH = 112;
    const tole = new T.Mesh(plaqueGeo(T, K, PW, PH, 6, 2, [[XU, 0, 11.25], [XV, 34, 11.25], [XV, 0, 11.25], [XV, -34, 11.25]]), M.plastique);
    tole.position.z = -2;
    const bord = K.formeArrondie(PW, PH, 6); bord.holes.push(K.formeArrondie(PW - 3, PH - 3, 4.5));
    const rebord = new T.Mesh(new T.ExtrudeGeometry(bord, { depth: 8, bevelEnabled: false, curveSegments: 10 }), M.plastique);
    rebord.position.z = -10;

    /* les trois voyants Ø 22 : vert, rouge, orange */
    const lampe = (offHex, onHex, y) => {
      const G = new T.Group(); G.position.set(XV, y, 0);
      const bague = new T.Group(), lentille = new T.Group(), corps = new T.Group(), ecrou = new T.Group();
      bague.add(new T.Mesh(revol(T, [[11.3, 0], [15, 0], [15, 0], [15, 4.2], [14.2, 5], [14.2, 5], [11.3, 5], [11.3, 5], [11.3, 0]], 48), M.aluminium));
      const geo = revol(T, [[0, 3], [10.8, 3], [10.8, 3], [10.8, 5.2], [9.4, 7.4], [6, 8.8], [0, 9.2]], 40);
      const off = new T.Mesh(geo, K.plastique(offHex, 0.28)), on = new T.Mesh(geo, K.lumineux(onHex));
      const lueurV = lueur(K, onHex, 44); lueurV.position.z = 10;
      lentille.add(off, on, lueurV);
      corps.add(new T.Mesh(tube(T, 11, 9.5, -14, 0, 40), M.plastiqueSombre));
      ecrou.add(new T.Mesh(ecrouGeo(T, 15.5, 11, -6, -2), M.zingue));
      const diode = K.mesh(K.sphere(3, 14), K.lumineux(onHex), 0, 0, -6);
      G.add(bague, lentille, corps, ecrou, diode);
      const regler = al => { off.visible = !al; on.visible = al; lueurV.visible = al; diode.visible = al; };
      regler(false);
      return { G, bague, lentille, corps, ecrou, regler };
    };
    const lampes = [lampe(0x1f7a4d, 0x6dffa0, 34), lampe(0x9c2b22, 0xff6a5c, 0), lampe(0xb5651a, 0xffb347, -34)];

    /* la chaîne : phase → vis 11 → contact NF → vis 12 → fil (qui peut casser) → bobine KM1 → neutre */
    const b0 = bloc.borne(0), b1 = bloc.borne(1);              /* repère de l'arrêt d'urgence */
    const X1 = b1[0], Y1 = b1[1];
    const groupeChaine = new T.Group();
    const fPhase = filArriere(K, b0, -14, 8);
    const seg = (z0, z1) => K.fil([[X1, Y1, z0], [X1, Y1, z1]], 0.9, 'rouge', { droit: true });
    const seg1 = seg(-58.35, -76), segMilieu = seg(-76, -84), seg3 = seg(-84, -101.2);
    groupeChaine.add(fPhase.mesh, seg1.mesh, segMilieu.mesh, seg3.mesh);
    [[-76, -78], [-84, -82]].forEach(([a, b]) => groupeChaine.add(cylZ(K, 0.6, a, b, M.cuivre, X1, Y1, 10)));
    /* la bobine du contacteur : un enroulement de cuivre entre deux joues, sur une équerre fixée à la tôle */
    const groupeBobine = new T.Group();
    const Z_AV = -102, Z_AR = -126.2;
    groupeBobine.add(cylZ(K, 11, Z_AR + 1.2, Z_AV - 1.2, K.bobinageMat(10), 0, 0, 40));
    [[Z_AV - 1.2, Z_AV], [Z_AR, Z_AR + 1.2]].forEach(([a, b]) => groupeBobine.add(cylZ(K, 12.5, a, b, M.plastiqueNoir, 0, 0, 40)));
    const A1 = [X1, Y1, Z_AV], A2 = [-X1, -Y1, Z_AV];
    [A1, A2].forEach((a, i) => {
      const v = K.vis(2.1); v.rotation.x = PI / 2; v.position.set(a[0], a[1], Z_AV + 0.05); groupeBobine.add(v);
      const g = K.gravure(i ? 'A2' : 'A1', 2.6, { couleur: '#eef0f2' }); g.position.set(a[0], a[1] + (i ? 8.6 : -8.6), Z_AV + 0.08); groupeBobine.add(g);
    });
    groupeBobine.add(K.mesh(K.boite(10, 2, 125, 0.4), M.zingue, 0, -24, -64.5));
    [-108, -122].forEach(z => groupeBobine.add(K.mesh(K.boite(6, 11.5, 4, 0.4), M.zingue, 0, -18.2, z)));
    const fNeutre = K.fil([[A2[0], A2[1], Z_AV], [A2[0] - 5, A2[1] - 3, Z_AV + 6], [A2[0] - 19, A2[1] - 10, Z_AV + 14], [A2[0] - 33, A2[1] - 16, Z_AV + 20]], 0.9, 'N');
    groupeBobine.add(fNeutre.mesh);
    P.G.add(groupeChaine, groupeBobine);

    /* le courant : une seule boucle, qui s'arrête dès qu'elle est ouverte quelque part */
    const R = 11.9, th0 = Math.atan2(A1[1], A1[0]), tours = 4.5, N = 96;
    const spirale = [];
    for (let i = 0; i <= N; i++) { const u = i / N, a = th0 + u * tours * 2 * PI; spirale.push([Math.cos(a) * R, Math.sin(a) * R, Z_AV - 1.6 - u * 21]); }
    const aFin = th0 + tours * 2 * PI, zRet = Z_AV - 1.6;
    const boucle = K.chemin([K.inverse(fPhase), ...bloc.points(), [X1, Y1, Z_AV], ...spirale, [Math.cos(aFin) * R, Math.sin(aFin) * R, zRet], A2, fNeutre.courbe]);
    const courant = K.courant(boucle, { pas: 6.5, rayon: 1.1, vitesse: 34 });
    courant.regler({ debit: 0, alternatif: true, frequence: 0.7 }); P.G.add(courant.objet);

    const monde = new T.Group();
    monde.add(tole, rebord, P.G, ...lampes.map(l => l.G));
    racine.add(monde);

    /* l'état et le mouvement */
    const pos = K.mobile(0, 420, 40), rot = K.mobile(0, 200, 28), pin = K.mobile(4.0, 300, 34);
    const lecon = on => { pos.k = on ? 90 : 420; pos.c = on ? 19 : 40; };
    let verrou = false, coupe = false, seq = 0, apres = null, eclatee = false, pret = false, derniere = '', dernierVerrou = null;
    const remettre = () => { verrou = false; seq = 0; apres = null; pos.cible = 0; rot.cible = 0; pin.cible = 4.0; };
    const deverrouiller = () => { if (verrou && !seq) { seq = 1; rot.cible = 1; } };
    const PHRASES = {
      ok: '<strong>Tout va bien.</strong> Le courant part de la phase, traverse le contact NF de l’arrêt d’urgence, le fil de la chaîne, puis la bobine du contacteur : la machine tourne. Le voyant vert est allumé.',
      au: '<strong>On frappe l’arrêt d’urgence.</strong> Le champignon s’enfonce et un cran le retient : il reste enfoncé. Le contact NF s’ouvre, la chaîne est coupée, la bobine retombe : la machine s’arrête. Voyants rouge et orange allumés.',
      fil: '<strong>Un fil casse.</strong> Personne n’a touché au champignon, et pourtant la chaîne est coupée : la bobine retombe, la machine s’arrête. C’est voulu : avec un contact NF, la panne tombe du bon côté. Voyant orange allumé.'
    };
    const maj = () => {
      const nfFerme = P.placer(pos.x)[0];
      placerCran(pin.x);
      P.tete.rotation.z = P.tige.rotation.z = -rot.x * PI / 4;
      const chaine = nfFerme && !coupe;
      courant.regler({ debit: chaine && !eclatee ? 1 : 0 });
      segMilieu.mesh.visible = !coupe;
      lampes[0].regler(chaine); lampes[1].regler(pos.x >= 4.6); lampes[2].regler(!chaine);
      const m = [{ libelle: 'Contact NF · 11-12', valeur: nfFerme ? 'fermé' : 'ouvert' }, { libelle: 'Chaîne de sécurité', valeur: chaine ? 'fermée' : 'coupée' }, { libelle: 'Bobine KM1', valeur: chaine ? 'alimentée' : 'hors tension' }];
      const cle = JSON.stringify(m);
      if (cle !== derniere) { derniere = cle; ctx.mesures(m); }
      if (verrou !== dernierVerrou) { dernierVerrou = verrou; ctx.regler('deverrouiller', null, { desactive: !verrou }); }
    };
    /* le mouvement découpé pour la leçon : la tête descend, le NF s'ouvre, le cran accroche, on déverrouille */
    const ETAT_DE = { repos: 'ok', frappe: 'au', coupe: 'au', accroche: 'au', deverrouille: 'ok', fil: 'fil' };
    const agir = (id, v) => {
      if (id === 'deverrouiller') { deverrouiller(); return; }
      if (id === 'phase') {
        lecon(true);
        if (v === 'deverrouille') {
          if (!verrou) { pos.x = COURSE - 0.4; pos.v = 0; pos.cible = COURSE - 0.4; pin.x = 2.8; pin.v = 0; pin.cible = 2.8; verrou = true; coupe = false; }
          apres = null; seq = 0; coupe = false; deverrouiller();
        } else {
          remettre(); coupe = v === 'fil';
          if (v === 'frappe') pos.cible = 1.8;
          if (v === 'coupe') pos.cible = 4.2;
          if (v === 'accroche') pos.cible = COURSE;
        }
        ctx.regler('etat', ETAT_DE[v]);
        maj();
        return;
      }
      if (id !== 'etat') return;
      lecon(false);
      if (v === 'au') { remettre(); coupe = false; pos.cible = COURSE; }
      else {
        const finale = () => { remettre(); coupe = v === 'fil'; maj(); };
        if (verrou) { coupe = v === 'fil'; apres = finale; deverrouiller(); } else finale();
      }
      ctx.dire(PHRASES[v]);
      maj();
    };
    maj();

    const cadreAvant = [tole, rebord, P.tete, P.bezel];
    const cadreChaine = [tole, rebord, P.tete, P.bezel, groupeBobine];
    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 14, cadre: cadreAvant, marge: 0.95, zoom: 1.2 } : { azimut: -58, elevation: 14, cadre: cadreChaine, marge: 0.9, zoom: 1.15 },
      fantome: [tole, rebord, P.corps, P.support, bloc.shell, ...lampes.map(l => l.corps)],
      phrase: PHRASES.ok,
      pieces: [
        { id: 'champignon', nom: 'Le champignon rouge', objets: [P.tete], desc: 'Une grosse tête rouge : on la trouve sans regarder, on la frappe de la paume. La flèche dit dans quel sens la tourner pour la libérer.' },
        { id: 'collerette', nom: 'La collerette jaune', objets: [P.bezel], desc: 'Le fond jaune rend l’arrêt d’urgence facile à repérer, même de loin.' },
        { id: 'cran', nom: 'Le cran d’accrochage', objets: [cran], desc: 'Un petit cliquet à ressort. En bas de course, il tombe dans la gorge de la tige : la tête ne remonte plus toute seule.' },
        { id: 'tige', nom: 'La tige, sa gorge et sa clavette', objets: [P.tige], desc: 'La tête pousse la tige. Elle porte une gorge où le cran vient se loger, et une clavette qui la fait tourner avec la tête.' },
        { id: 'ressort', nom: 'Le ressort de rappel', objets: [P.ressort], desc: 'Dès que le cran est sorti de la gorge, il repousse la tige : la tête remonte.' },
        { id: 'bloc', nom: 'Le bloc NF (11 – 12)', objets: [bloc.coque, bloc.fixes], desc: 'Un contact normalement fermé : le courant passe tant que personne n’a frappé. Son pont est relié à la tige par une liaison rigide : on dit « à ouverture forcée ».' },
        { id: 'pont', nom: 'Le pont du NF', objets: [bloc.mobile], desc: 'Un ressort le plaque sur les plots. La tige le décolle de force quand on frappe.' },
        { id: 'chaine', nom: 'Les fils de la chaîne', objets: [groupeChaine], desc: 'La phase arrive par la vis 11. Le courant sort par la vis 12 et suit ce fil jusqu’à la bobine. Si ce fil casse, plus rien ne passe : la machine s’arrête.' },
        { id: 'bobine', nom: 'La bobine du contacteur (KM1)', objets: [groupeBobine], desc: 'C’est elle qu’on alimente par la chaîne. Plus de courant : elle retombe, le contacteur s’ouvre et la machine s’arrête.' },
        { id: 'voyants', nom: 'Les voyants (vert, rouge, orange)', objets: lampes.map(l => l.G), desc: 'Ils informent, ils ne commandent rien. Vert : la bobine est alimentée. Rouge : l’arrêt d’urgence est frappé. Orange : la chaîne est coupée.' },
        { id: 'tole', nom: 'La face avant du coffret', objets: [tole, rebord], desc: 'Une tôle percée de quatre trous de 22 mm : l’arrêt d’urgence et les trois voyants.' },
        { id: 'corps', nom: 'Le corps, l’écrou et le support', objets: [P.corps, P.ecrou, P.support], desc: 'Le corps traverse la tôle, l’écrou le serre. Derrière, un support reçoit le bloc de contact et le cran.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['ok', 'Tout va bien'], ['au', 'On frappe l’arrêt d’urgence'], ['fil', 'Un fil casse']], valeur: 'ok' },
        { id: 'deverrouiller', type: 'action', libelle: 'Tourner pour déverrouiller' }
      ],
      etapes: [
        { titre: 'Tout va bien', piece: 'chaine', voirDedans: true, actions: [['phase', 'repos']],
          vue: { azimut: -58, elevation: 14, zoom: 1.15, cible: null },
          texte: 'Le courant part de la phase, traverse le contact NF de l’arrêt d’urgence, le fil, puis la bobine du contacteur. Il passe partout : suivez les grains dorés. La bobine est alimentée, le voyant vert est allumé.' },
        { titre: 'On frappe : le champignon s’enfonce', piece: 'champignon', ralenti: true, voirDedans: true, actions: [['phase', 'frappe']],
          vue: { azimut: -86, elevation: 8, zoom: 1.7, cible: [XU, 0, -2] },
          texte: 'La paume pousse le champignon. Il descend et entraîne la tige. Le contact n’a pas encore bougé : le courant passe toujours.' },
        { titre: 'Le NF s’ouvre : la chaîne est coupée', piece: 'pont', ralenti: true, voirDedans: true, actions: [['phase', 'coupe']],
          vue: { azimut: -58, elevation: 14, zoom: 1.15, cible: null },
          texte: 'La tige décolle le pont du NF : le courant ne passe plus nulle part. La bobine n’est plus alimentée, la machine s’arrête. Le voyant vert s’éteint, l’orange s’allume.' },
        { titre: 'Le cran accroche la tige', piece: 'cran', ralenti: true, voirDedans: true, actions: [['phase', 'accroche']],
          vue: { azimut: -140, elevation: 36, zoom: 2.3, cible: [XU + 6, -2, -14] },
          texte: 'Tout en bas de la course, le cliquet à ressort tombe dans la gorge de la tige : la tête reste enfoncée, même si on la lâche. Le voyant rouge s’allume : l’arrêt d’urgence est frappé.' },
        { titre: 'On tourne la tête : le cran se retire', piece: 'cran', ralenti: true, voirDedans: true, actions: [['phase', 'deverrouille']], duree: 8,
          vue: { azimut: -140, elevation: 36, zoom: 2.3, cible: [XU + 6, -2, -14] },
          texte: 'On tourne la tête d’un quart de tour (la flèche dit dans quel sens) : la tige tourne avec elle, et le cliquet est repoussé hors de la gorge. Le ressort de rappel relève alors la tête. Le contact NF se referme ; sur une vraie machine, il faut ensuite appuyer sur MARCHE pour repartir.' },
        { titre: 'Un fil casse : même résultat', piece: 'chaine', ralenti: true, voirDedans: true, actions: [['phase', 'fil']],
          vue: { azimut: -64, elevation: 14, zoom: 2.5, cible: [XU + 6.6, -4.6, -80] },
          texte: 'Personne n’a touché au champignon, mais un fil de la chaîne est coupé : plus rien ne passe, la machine s’arrête. C’est voulu : avec un contact NF, la panne tombe du bon côté.' }
      ],
      /* l'éclaté : la tête et la tige sortent par l'avant, le reste par l'arrière ; les voyants aussi */
      eclate: [
        { objets: [P.tete, P.tige], vers: [0, 0, 56], debut: 0, fin: 0.4 },
        { objets: [P.bezel], vers: [0, 0, 26], debut: 0.1, fin: 0.5 },
        { objets: [P.corps], vers: [0, 0, -12], debut: 0.3, fin: 0.7 },
        { objets: [P.ecrou], vers: [0, 0, -28], debut: 0.35, fin: 0.75 },
        { objets: [P.ressort], vers: [0, 0, -40], debut: 0.4, fin: 0.8 },
        { objets: [P.support, cran], vers: [0, 0, -52], debut: 0.5, fin: 0.9 },
        { objets: [bloc.mobile], vers: [0, 0, -54], debut: 0.6, fin: 1 },
        { objets: [bloc.fixes, groupeChaine, groupeBobine], vers: [0, 0, -66], debut: 0.6, fin: 1 },
        { objets: [bloc.coque], vers: [0, 34, -66], debut: 0.7, fin: 1 }
      ].concat(lampes.flatMap(l => [
        { objets: [l.bague, l.lentille], vers: [0, 0, 26], debut: 0.1, fin: 0.5 },
        { objets: [l.corps], vers: [0, 0, -12], debut: 0.3, fin: 0.7 },
        { objets: [l.ecrou], vers: [0, 0, -28], debut: 0.35, fin: 0.75 }
      ])),
      eclateVue: { azimut: -64, elevation: 14, zoom: 0.8, cible: [-26, 0, -52] },
      surEclate(on) { eclatee = on; maj(); },
      agir,
      animer(dt) {
        if (!pret) { pret = true; ctx.regler('deverrouiller', null, { desactive: !verrou }); }
        const a = pos.pas(dt), b = rot.pas(dt), c = pin.pas(dt);
        /* l'accrochage : en fin de course, le cliquet tombe dans la gorge */
        if (!verrou && !seq && pos.cible >= COURSE - 0.01 && pos.x >= COURSE - 0.25) { verrou = true; pin.cible = 2.8; }
        if (verrou && !seq) pos.cible = COURSE - 0.4;
        /* le déverrouillage : la tête tourne, le cran sort, le ressort relève la tête */
        if (seq === 1 && rot.x > 0.9) { verrou = false; pin.cible = 6.8; pos.cible = 0; seq = 2; }
        if (seq === 2 && pos.x < 0.4) { if (apres) { const f = apres; apres = null; f(); } else seq = 3; }
        const bouge = a || b || c;
        if (bouge || verrou !== dernierVerrou) maj();
        let actif = bouge || seq === 1 || seq === 2 || (!verrou && pos.cible >= COURSE - 0.01 && pos.x < COURSE - 0.25);
        if (courant.animer(dt)) actif = true;
        return actif;
      }
    };
  }, { famille: 'pilotage', titre: 'L’arrêt d’urgence', stations: ['5.8'] });

  /* =====================================================================================
     LE MÉCANISME D'UN RELAIS : bobine, noyau, culasse, palette qui bascule, ressort, champ.
     Repère local : x largeur, y hauteur, zr = profondeur à partir de la base ; le noyau pointe
     vers +zr. La palette est articulée au bout de la culasse ; attirée, elle bascule vers le noyau.
     Elle sert pour le relais (palette = commun) et pour le relais temporisé (palette = poussoir).
     ===================================================================================== */
  const MEC = { YC: -2.5, RB: 5.6, RF: 6.6, YH: -9.45, ZH: 26.2, ZP: 22.4, LA: 17.0, L1: 12.5, PH0: 12.6 * PI / 180, PH1: 25.4 * PI / 180, ZANCRE: 34.0 };
  function construireMecanisme(T, K, o) {
    o = o || {};
    const M = K.mat, C = MEC;
    const g = new T.Group();
    const bobine = new T.Group(), culasse = new T.Group(), palette = new T.Group(), ressortG = new T.Group();

    /* la bobine : un enroulement de cuivre verni entre deux joues, et ses deux sorties vers la base */
    bobine.add(cylZ(K, C.RB, 5, 20.2, K.bobinageMat(8), 0, C.YC, 32));
    bobine.add(cylZ(K, C.RF, 4, 5, M.plastiqueNoir, 0, C.YC, 32), cylZ(K, C.RF, 20.2, 21.2, M.plastiqueNoir, 0, C.YC, 32));
    [-5.4, 5.4].forEach(x => bobine.add(cylZ(K, 0.55, 3.5, 5.2, M.cuivre, x, C.YC, 10)));
    /* le noyau (au centre de la bobine) et la culasse en L : une barre dessous, une plaque derrière */
    culasse.add(cylZ(K, 2.5, 4, C.ZP, M.acier, 0, C.YC, 20));
    culasse.add(K.mesh(K.boite(13, 0.9, 22.4, 0.2), M.acierSombre, 0, C.YH, 15.2));
    culasse.add(K.mesh(K.boite(13, 9.9, 0.8, 0.2), M.acierSombre, 0, -4.95, 3.8));
    /* la palette : une plaque d'acier articulée au bout de la culasse, avec une languette étroite en haut */
    const arm = new T.Group(); arm.position.set(0, C.YH, C.ZH);
    arm.add(K.mesh(K.boite(12.6, C.L1, 0.9, 0.2), M.acier, 0, C.L1 / 2, 0));
    arm.add(K.mesh(K.boite(4.8, C.LA - C.L1, 0.9, 0.2), M.acier, 0, (C.L1 + C.LA) / 2, 0));
    arm.add(cylZ(K, 0.9, -6.6, 6.6, M.zingue, 0, 0, 14).rotateY(PI / 2));
    palette.add(arm);
    /* le ressort de rappel : il tire la palette vers l'avant, loin du noyau */
    const ress = K.ressort(1.5, 6, 8, 0.28, M.acier);
    ressortG.add(ress);
    g.add(bobine, culasse, palette, ressortG);

    const att = new T.Vector3(), anc = new T.Vector3(0, 1.4, o.zAncre || C.ZANCRE);
    const poser = f => {
      arm.rotation.x = -f;
      const s = 11.0, e = 0.45;
      att.set(0, C.YH + s * Math.cos(f) + e * Math.sin(f), C.ZH - s * Math.sin(f) + e * Math.cos(f));
      K.ressortEntre(ress, att, anc);
    };
    /* un point de la palette : s mesuré depuis la charnière le long de la plaque, e perpendiculairement (vers l'avant) */
    const pt = (f, s, e) => [C.YH + s * Math.cos(f) + e * Math.sin(f), C.ZH - s * Math.sin(f) + e * Math.cos(f)];

    /* le champ : deux boucles bleues qui sortent du noyau, passent au-dessus de la bobine et reviennent
       par l'arrière (on les voit dans l'air, pas cachées dans le fer) */
    const flux = [];
    [-3.4, 3.4].forEach(x => {
      const pts = [[C.YC, 4.4], [C.YC, 23.4], [5.5, 26.8], [8.0, 22], [8.2, 12], [8.0, 5], [4.5, 2.2], [C.YC, 3.4]].map(p => new T.Vector3(x, p[0], p[1]));
      const f = K.flux(new T.CatmullRomCurve3(pts, true, 'catmullrom', 0.2), { rayon: 0.55, pas: 5, vitesse: 0.9, ferme: true });
      f.regler({ intensite: 0, alternatif: false });
      g.add(f.objet); flux.push(f);
    });
    /* le trajet du courant dans la bobine : du pied de A1, 4,5 tours d'hélice vers l'avant, retour le long de la bobine, pied de A2 */
    const cheminBobine = () => {
      const R = C.RB + 0.35, N = 90, pts = [[-5.4, C.YC, 3.5], [-R, C.YC, 5.4]];
      for (let i = 0; i <= N; i++) { const u = i / N, a = PI + u * 4.5 * 2 * PI; pts.push([Math.cos(a) * R, C.YC + Math.sin(a) * R, 5.4 + u * 14.4]); }
      pts.push([R, C.YC, 5.4], [5.4, C.YC, 3.5]);
      return pts;
    };
    poser(C.PH0);
    return { g, bobine, culasse, palette, ressortG, arm, poser, pt, flux, cheminBobine, C };
  }

  /* =====================================================================================
     5.4 — LE RELAIS : un relais embrochable sur son embase à bornes à vis
     Même principe que le contacteur, en petit, pour la COMMANDE : une bobine, une palette attirée,
     un ressort, un contact inverseur (commun 11, repos 12, travail 14) et un voyant.
     ===================================================================================== */
  Electro3D.definir('relais', (T, K, ctx) => {
    const M = K.mat, C = MEC;
    const racine = new T.Group();
    const ZR = 24;                                    /* la face avant de l'embase : le relais s'y enfiche */
    const R = (x, y, zr) => [x, y, ZR + zr];

    /* le rail DIN et l'embase */
    const rail = K.railDIN(110);
    const embase = new T.Group();
    const corpsE = K.mesh(K.boite(28, 52, ZR, 1.6), M.plastique, 0, 0, ZR / 2);
    embase.add(corpsE, K.mesh(K.boite(14, 6, 5, 1), M.plastiqueSombre, 0, -25, 2.5));
    racine.add(rail, embase);
    /* les cinq bornes à vis : A1, A2 en haut ; 12, 11, 14 en bas */
    const bornes = new T.Group(), marques = new T.Group();
    const BORNES = [['A1', -7, 19.5], ['A2', 7, 19.5], ['12', -8.5, -19.5], ['11', 0, -19.5], ['14', 8.5, -19.5]];
    const pos3 = {};
    BORNES.forEach(([nom, x, y]) => {
      bornes.add(cylZ(K, 3.4, ZR - 0.2, ZR + 0.3, M.sombre, x, y, 20));
      const v = K.vis(2.3); v.rotation.x = PI / 2; v.position.set(x, y, ZR + 0.3); bornes.add(v);
      const gr = K.gravure(nom, 2.6, { couleur: '#2b3138' }); gr.position.set(x, y + (y > 0 ? 5.0 : -5.0), ZR + 0.06); marques.add(gr);
      pos3[nom] = [x, y, ZR + 1.0];
    });
    racine.add(bornes, marques);

    /* le relais : base noire, capot transparent, voyant, mécanisme */
    const rel = new T.Group(); rel.position.z = ZR;
    const base = new T.Group(); base.add(K.mesh(K.boite(27.5, 21.5, 3.5, 0.8), M.plastiqueNoir, 0, 0, 1.75));
    const f = K.formeArrondie(27.5, 21.5, 2.2); f.holes.push(K.formeArrondie(25.5, 19.5, 1.4));
    const capot = new T.Mesh(new T.ExtrudeGeometry(f, { depth: 34.3, bevelEnabled: false, curveSegments: 8 }), K.propre(M.transparent));
    const dessus = K.mesh(K.boite(27.5, 21.5, 1.4, 0.6), K.propre(M.transparent), 0, 0, 34.8);
    capot.userData.sansOmbre = dessus.userData.sansOmbre = true;
    const boitier = new T.Group(); boitier.add(capot, dessus);
    /* le voyant DEL, dans le capot */
    const led = new T.Group(); led.position.set(0, 6.2, 35.5);
    const domeGeo = revol(T, [[0, 0], [2.2, 0], [2.2, 0.3], [1.6, 1.2], [0, 1.6]], 20);
    const ledOff = new T.Mesh(domeGeo, K.plastique(0x1f7a4d, 0.25)), ledOn = new T.Mesh(domeGeo, K.lumineux(0x6dffa0)), ledGlow = lueur(K, 0x6dffa0, 20);
    ledGlow.position.z = 1.8; led.add(ledOff, ledOn, ledGlow); boitier.add(led);
    const regleLed = on => { ledOff.visible = !on; ledOn.visible = on; ledGlow.visible = on; };
    regleLed(false);

    const mec = construireMecanisme(T, K);
    const contacts = new T.Group();
    /* les rivets bombés du commun, un de chaque côté de la languette */
    const rivetGeo = new T.SphereGeometry(1.3, 16, 10).scale(1, 1, 0.7);
    const sRiv = C.LA - 1.8;
    [0.45, -0.45].forEach(e => { const r = new T.Mesh(rivetGeo, M.laiton); r.position.set(0, sRiv, e); mec.arm.add(r); });
    /* les deux contacts fixes, calés sur la position exacte des rivets au repos et au travail */
    const apR = mec.pt(C.PH0, sRiv, 1.35), apT = mec.pt(C.PH1, sRiv, -1.35);          /* [y, z] des sommets */
    const XR = -4.4, XT = 4.4, YB = 9.0;        /* les lames courent le long du haut du relais, au-dessus des plots */
    const zTabR = apR[1] + 1.5, zTabT = apT[1] - 1.5;
    const tab = (x, apY, z) => { const bas = apY - 2.0, haut = YB + 0.8; return K.mesh(new T.BoxGeometry(7.2, haut - bas, 1.0), M.cuivre, x, (haut + bas) / 2, z); };
    contacts.add(cylZ(K, 2.0, apR[1], apR[1] + 1.0, M.argent, 0, apR[0], 20));                   /* plot repos (devant la palette) */
    contacts.add(tab(-1.5, apR[0], zTabR));
    contacts.add(K.mesh(new T.BoxGeometry(1.6, 1.6, zTabR - 3.0), M.cuivre, XR, YB, 3.0 + (zTabR - 3.0) / 2));
    contacts.add(cylZ(K, 2.0, apT[1] - 1.0, apT[1], M.argent, 0, apT[0], 20));                   /* plot travail (derrière) */
    contacts.add(tab(1.5, apT[0], zTabT));
    contacts.add(K.mesh(new T.BoxGeometry(1.6, 1.6, zTabT - 3.0), M.cuivre, XT, YB, 3.0 + (zTabT - 3.0) / 2));
    rel.add(base, boitier, mec.g, contacts);
    racine.add(rel);

    /* les cinq fils (fils de commande rouges ; A2 au neutre, bleu) */
    const fils = new T.Group();
    const wire = (nom, dx, coul) => {
      const p = pos3[nom], s = p[1] > 0 ? 1 : -1;
      const w = K.fil([p, [p[0], p[1] + s * 4, ZR + 5], [p[0] + dx, p[1] + s * 14, ZR + 7], [p[0] + dx * 1.6, p[1] + s * 28, ZR + 3]], 0.9, coul);
      fils.add(w.mesh); return w;
    };
    const W = { A1: wire('A1', -3, 'rouge'), A2: wire('A2', 3, 'N'), 12: wire('12', -4, 'rouge'), 11: wire('11', 0, 'rouge'), 14: wire('14', 4, 'rouge') };
    racine.add(fils);

    /* le courant : dans la bobine quand elle est alimentée, dans le contact fermé seulement */
    const cache = (nom, y) => [[pos3[nom][0], y, ZR - 4]];            /* le chemin caché dans l'embase, sous la vis */
    const versLaPalette = (f, e) => {
      const pts = [];
      for (let k = 0; k <= 6; k++) { const yz = mec.pt(f, (C.LA - 1.8) * k / 6, 0); pts.push([0, yz[0], ZR + yz[1]]); }
      const ap = mec.pt(f, sRiv, e);
      pts.push([0, ap[0], ZR + ap[1]]);
      return pts;
    };
    const cheminContact = (sortie, f, e, ap, xs) => K.chemin([
      K.inverse(W[11]), pos3[11], [0, -19.5, ZR - 4], [0, C.YH, ZR - 4], [0, C.YH, ZR + 3.8], [0, C.YH, ZR + C.ZH],
      ...versLaPalette(f, e), [0, ap[0], ZR + ap[1] + (e > 0 ? 0.5 : -0.5)], [xs, ap[0], ZR + ap[1] + (e > 0 ? 1.5 : -1.5)], [xs, YB, ZR + ap[1] + (e > 0 ? 1.5 : -1.5)], [xs, YB, ZR + 3.5],
      [xs, YB, ZR - 4], [pos3[sortie][0], pos3[sortie][1], ZR - 4], pos3[sortie], W[sortie].courbe
    ]);
    const cRepos = K.courant(cheminContact('12', C.PH0, 1.35, apR, XR), { pas: 5.5, rayon: 0.7, vitesse: 34 });
    const cTravail = K.courant(cheminContact('14', C.PH1, -1.35, apT, XT), { pas: 5.5, rayon: 0.7, vitesse: 34 });
    const cBobine = K.courant(K.chemin([K.inverse(W.A1), pos3.A1, [pos3.A1[0], pos3.A1[1], ZR - 4], [-5.4, C.YC, ZR - 4], ...mec.cheminBobine().map(p => R(p[0], p[1], p[2])), [5.4, C.YC, ZR - 4], [pos3.A2[0], pos3.A2[1], ZR - 4], pos3.A2, W.A2.courbe]), { pas: 6, rayon: 0.7, vitesse: 34 });
    [cRepos, cTravail, cBobine].forEach(c => { c.regler({ debit: 0, alternatif: true, frequence: 0.7 }); racine.add(c.objet); });

    /* l'état et le mouvement : la palette claque, ou — pour la leçon — bascule lentement */
    const pos = K.mobile(C.PH0, 900, 32);
    const lecon = on => { pos.k = on ? 70 : 900; pos.c = on ? 16 : 32; };
    let alimentee = false, eclatee = false;
    const ecrire = mesuresSiChange(ctx);
    const PHRASES = {
      repos: '<strong>Bobine au repos.</strong> Le ressort tient la palette loin du noyau. Le commun (11) touche le contact repos (12) : le courant passe par là. Le voyant est éteint.',
      alimentee: '<strong>Bobine alimentée.</strong> Le noyau devient un aimant : il attire la palette. Elle quitte le contact repos (12) et vient toucher le contact travail (14). Le voyant s’allume. C’est le même principe que le contacteur, en petit : un relais sert à commander.'
    };
    const maj = () => {
      const fa = clamp(pos.x, C.PH0, C.PH1);
      mec.poser(fa);
      const rep = fa <= C.PH0 + 0.012, tra = fa >= C.PH1 - 0.012;
      const a = alimentee && !eclatee;
      cRepos.regler({ debit: rep && !eclatee ? 1 : 0 }); cTravail.regler({ debit: tra && !eclatee ? 1 : 0 }); cBobine.regler({ debit: a ? 1 : 0 });
      mec.flux.forEach(fl => fl.regler({ intensite: a ? 1 : 0 }));
      regleLed(alimentee);
      ecrire([{ libelle: 'Bobine A1-A2', valeur: alimentee ? 'alimentée' : 'hors tension' }, { libelle: 'Repos 11-12', valeur: rep ? 'fermé' : 'ouvert' }, { libelle: 'Travail 11-14', valeur: tra ? 'fermé' : 'ouvert' }]);
    };
    const MILIEU = (C.PH0 + C.PH1) / 2;
    const PAS = { repos: [false, C.PH0, 'repos'], champ: [true, C.PH0, 'alimentee'], attire: [true, MILIEU, 'alimentee'], ferme: [true, C.PH1, 'alimentee'], coupure: [false, C.PH0, 'repos'] };
    const agir = (id, v) => {
      if (id === 'phase') { lecon(true); const [al, cible, e] = PAS[v]; alimentee = al; pos.cible = cible; ctx.regler('bobine', e); maj(); return; }
      if (id !== 'bobine') return;
      lecon(false);
      alimentee = v === 'alimentee'; pos.cible = alimentee ? C.PH1 : C.PH0;
      ctx.dire(PHRASES[v]); maj();
    };
    maj();

    const cadre = [embase, capot, dessus];
    const vueMeca = { azimut: -80, elevation: 10, zoom: 2.3, cible: [0, 2, 43] };
    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 14, cadre, marge: 1.0, zoom: 1.1 } : { azimut: -62, elevation: 12, cadre, marge: 1.12, zoom: 1.2 },
      fond: 'platine',
      fantome: [capot, dessus],
      fantomeAuDepart: false,           /* le capot est déjà transparent, comme sur l'appareil réel */
      phrase: PHRASES.repos,
      pieces: [
        { id: 'boitier', nom: 'Le boîtier transparent', objets: [boitier], desc: 'Un boîtier en plastique transparent : on voit travailler la mécanique. Le relais s’enfiche sur son embase, sans défaire un fil.' },
        { id: 'bobine', nom: 'La bobine (A1 – A2)', objets: [mec.bobine], desc: 'Un fil de cuivre verni enroulé. Alimentée entre A1 et A2, elle crée un champ magnétique.' },
        { id: 'noyau', nom: 'Le noyau et la culasse', objets: [mec.culasse], desc: 'Des pièces d’acier qui guident le champ de la bobine jusqu’à la palette.' },
        { id: 'palette', nom: 'La palette mobile (le commun 11)', objets: [mec.palette], desc: 'Attirée par le noyau, elle bascule. Elle porte le contact commun : deux rivets d’argent, un de chaque côté.' },
        { id: 'ressort', nom: 'Le ressort de rappel', objets: [mec.ressortG], desc: 'Dès que la bobine n’est plus alimentée, il tire la palette loin du noyau : le relais retombe tout seul.' },
        { id: 'contacts', nom: 'Les contacts fixes : repos (12) et travail (14)', objets: [contacts], desc: 'Deux lames de cuivre portent chacune un plot d’argent : le repos (12) devant la palette, le travail (14) derrière. Le commun touche l’un ou l’autre, jamais les deux.' },
        { id: 'voyant', nom: 'Le voyant DEL', objets: [led], desc: 'Une diode qui s’allume dès que la bobine est alimentée. Très utile au dépannage.' },
        { id: 'embase', nom: 'L’embase à bornes à vis', objets: [embase, base], ancre: [0, 26, 12], desc: 'Elle se clipse sur le rail DIN. Les fils se serrent sur ses vis : le relais se change sans toucher aux fils.' },
        { id: 'bornes', nom: 'Les bornes : A1, A2, 11, 12, 14', objets: [bornes, marques], ancre: [0, -19.5, 25.3], desc: 'A1 et A2 : la bobine. 11 : le commun. 12 : le repos. 14 : le travail.' },
        { id: 'fils', nom: 'Les fils de commande', objets: [fils], ancre: [0, -36, 31], desc: 'Des fils fins, rouges, et un bleu pour le neutre : le relais ne commande qu’un petit courant.' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], ancre: [-40, 15, -0.5], desc: 'Le rail de l’armoire : l’embase s’y clipse.' }
      ],
      commandes: [
        { id: 'bobine', type: 'choix', options: [['repos', 'Bobine au repos'], ['alimentee', 'Bobine alimentée']], valeur: 'repos' }
      ],
      etapes: [
        { titre: 'Au repos', piece: 'ressort', voirDedans: false, actions: [['phase', 'repos']],
          vue: { azimut: -62, elevation: 12, zoom: 1.2, cible: null },
          texte: 'La bobine n’est pas alimentée. Le ressort de rappel tient la palette loin du noyau. Le commun (11) touche le contact repos (12) : le courant passe par là, regardez les grains dorés.' },
        { titre: 'On alimente la bobine : le champ apparaît', piece: 'bobine', ralenti: true, voirDedans: false, actions: [['phase', 'champ']],
          vue: { azimut: -78, elevation: 10, zoom: 2.0, cible: [0, -2, 38] },
          texte: 'Le courant entre par A1 et ressort par A2. Il tourne dans la bobine et crée un champ magnétique : les tirets bleus. Le voyant s’allume. La palette n’a pas encore bougé.' },
        { titre: 'La palette est attirée : le repos s’ouvre', piece: 'palette', ralenti: true, voirDedans: false, actions: [['phase', 'attire']],
          vue: vueMeca,
          texte: 'Le noyau attire la palette. Elle quitte le contact repos (12) : le courant ne passe plus par là. Elle n’a pas encore touché le contact travail.' },
        { titre: 'Le contact travail (14) se ferme', piece: 'contacts', ralenti: true, voirDedans: false, actions: [['phase', 'ferme']],
          vue: vueMeca,
          texte: 'La palette arrive contre le noyau et s’appuie sur le contact travail (14) : le courant passe maintenant par 14. Le commun a basculé du repos au travail.' },
        { titre: 'On coupe : le ressort ramène la palette', piece: 'ressort', ralenti: true, voirDedans: false, actions: [['phase', 'coupure']], duree: 7,
          vue: { azimut: -62, elevation: 12, zoom: 1.2, cible: null },
          texte: 'Plus de courant dans la bobine, plus de champ : le ressort repousse la palette. Elle quitte le travail (14) et retrouve le repos (12). Le voyant s’éteint.' }
      ],
      /* l'éclaté : le capot se soulève, la palette et son ressort, les contacts, la bobine, puis la base */
      eclate: [
        { objets: [boitier], vers: [0, 0, 84], debut: 0, fin: 0.45 },
        { objets: [mec.palette, mec.ressortG], vers: [0, 0, 56], debut: 0.15, fin: 0.6 },
        { objets: [contacts], vers: [0, 0, 40], debut: 0.3, fin: 0.75 },
        { objets: [mec.bobine, mec.culasse], vers: [0, 0, 24], debut: 0.45, fin: 0.9 },
        { objets: [base], vers: [0, 0, 10], debut: 0.6, fin: 1 }
      ],
      eclateVue: { azimut: -52, elevation: 16, zoom: 0.62, cible: [0, 0, 62] },
      surEclate(on) { eclatee = on; maj(); },
      agir,
      animer(dt) {
        const bouge = pos.pas(dt);
        if (bouge) maj();
        let actif = bouge;
        [cRepos, cTravail, cBobine, ...mec.flux].forEach(c => { if (c.animer(dt)) actif = true; });
        return actif;
      }
    };
  }, { famille: 'pilotage', titre: 'Le relais', stations: ['5.4'] });

  /* =====================================================================================
     5.5 / 5.6 — LE RELAIS TEMPORISÉ : un module de 17,5 mm sur rail DIN
     Un compteur de temps (un circuit électronique et son condensateur) décide QUAND alimenter un
     petit relais interne. Le relais pousse, par une carte, deux lames de contact :
     un NF (55-56) et un NO (67-68), tous deux temporisés.
       au travail (options.fonction = 'travail') : on alimente A1-A2, le temps COMPTE, puis ça bascule ;
                                                   à la coupure tout retombe tout de suite.
       au repos   (options.fonction = 'repos')    : on alimente, ça bascule tout de suite ;
                                                   à la coupure le temps COMPTE, puis ça retombe.
     Le temps se voit : un anneau de points s'allume sur la face avant, la DEL R clignote pendant le comptage.
     ===================================================================================== */
  Electro3D.definir('relaisTemporise', (T, K, ctx) => {
    const M = K.mat, C = MEC;
    const opt = ctx.options || {};
    const racine = new T.Group();
    const Z_E = 58.5;                                  /* la surface de l'étiquette, sur la fenêtre */

    /* le rail DIN et le boîtier : 17,5 mm de large, 90 de haut, 45 de profondeur, une fenêtre de 45 mm qui avance */
    const rail = K.railDIN(110);
    const griffe = K.mesh(K.boite(12, 5, 5, 1), M.plastiqueSombre, 0, -42.5, 2.5);
    const base = K.mesh(K.boite(17.5, 90, 45, 1.4), M.plastique, 0, 0, 22.5);
    const fenetre = K.mesh(K.boite(17.5, 45, 14.5, 1.0), M.plastique, 0, 0, 50.75);
    racine.add(rail, griffe, base, fenetre);

    /* ---------------- la face avant ---------------- */
    const facade = new T.Group();
    const etiquette = K.mesh(K.boite(15.6, 43, 0.5, 0.2), M.plastiqueBlanc, 0, 0, 58.25);
    facade.add(etiquette);
    const texte = (t, x, y, h) => { const g = K.gravure(t, h || 2.5, { couleur: '#1b2a38' }); g.position.set(x, y, Z_E + 0.03); return g; };
    /* les deux voyants : U (le module est alimenté), R (le relais est collé ; il clignote pendant le comptage) */
    const voyant = (x, offHex, onHex) => {
      const G = new T.Group(); G.position.set(x, 19.5, Z_E);
      const geo = revol(T, [[0, 0], [1.9, 0], [1.9, 0.2], [1.4, 1.0], [0, 1.4]], 20);
      const off = new T.Mesh(geo, K.plastique(offHex, 0.25)), on = new T.Mesh(geo, K.lumineux(onHex)), glow = lueur(K, onHex, 11);
      glow.position.z = 1.7; G.add(off, on, glow);
      return { G, regler: a => { off.visible = !a; on.visible = a; glow.visible = a; } };
    };
    const vU = voyant(-4.2, 0x14523a, 0x6dffa0), vR = voyant(4.2, 0x8a4a14, 0xffb347);
    const voyants = new T.Group(); voyants.add(vU.G, vR.G, texte('U', -4.2, 16.2), texte('R', 4.2, 16.2));
    /* la molette de durée, son échelle imprimée, et l'anneau de points qui compte le temps */
    const MX = 0, MY = 5.5, A0 = -135, A1 = 135;           /* l'échelle va de −135° à +135°, dans le sens des aiguilles d'une montre */
    const knob = new T.Group(); knob.position.set(MX, MY, Z_E);
    knob.add(cylZ(K, 1.5, -15, 0.2, M.acier, 0, 0, 16));
    knob.add(new T.Mesh(revol(T, [[0, 0], [4.2, 0], [4.2, 0], [4.2, 3.0], [3.6, 3.5], [0, 3.5]], 36), M.plastiqueMarine));
    knob.add(K.mesh(new T.BoxGeometry(0.9, 3.4, 0.3), M.plastiqueBlanc, 0, 2.0, 3.55));
    const graduation = dessin(K, 17, 17, 44, (x, w, h) => {
      x.translate(w / 2, h / 2); x.strokeStyle = x.fillStyle = '#1b2a38'; x.lineCap = 'round';
      for (let i = 0; i <= 10; i++) {
        const a = (A0 + (A1 - A0) * i / 10) * PI / 180, major = i % 5 === 0, r0 = 4.9 * 44, r1 = (major ? 6.2 : 5.6) * 44;
        x.lineWidth = major ? 0.42 * 44 : 0.26 * 44;
        x.beginPath(); x.moveTo(Math.sin(a) * r0, -Math.cos(a) * r0); x.lineTo(Math.sin(a) * r1, -Math.cos(a) * r1); x.stroke();
      }
      x.font = '800 ' + Math.round(2.7 * 44) + 'px Calibri, "Segoe UI", Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      [[A0, '1'], [A1, '6']].forEach(([deg, t]) => { const a = deg * PI / 180; x.fillText(t, Math.sin(a) * 6.9 * 44, -Math.cos(a) * 6.9 * 44 + 1.4 * 44); });
    });
    graduation.position.set(MX, MY, Z_E + 0.02);
    const NP = 14, matPointOff = K.plastique(0xc9c4b8, 0.5), matPointOn = K.lumineux(0xffb21a);
    const anneau = new T.Group(), points = [];
    for (let i = 0; i < NP; i++) {
      const a = (A0 + (A1 - A0) * i / (NP - 1)) * PI / 180;
      const p = cylZ(K, 0.5, Z_E + 0.02, Z_E + 0.34, matPointOff, MX + Math.sin(a) * 7.5, MY + Math.cos(a) * 7.5, 12);
      anneau.add(p); points.push(p);
    }
    /* le sélecteur de fonction (au travail / au repos) et le sélecteur d'échelle (s / min) */
    const fonc = new T.Group(); fonc.position.set(0, -6.8, Z_E);
    fonc.add(cylZ(K, 1.2, -15, 0.2, M.acier, 0, 0, 12));
    fonc.add(new T.Mesh(revol(T, [[0, 0], [3, 0], [3, 0], [3, 2.2], [2.6, 2.5], [0, 2.5]], 28), M.plastiqueNoir));
    fonc.add(K.mesh(new T.BoxGeometry(0.8, 2.6, 0.3), M.plastiqueBlanc, 0, 1.4, 2.55));
    const pictos = dessin(K, 15, 4.4, 60, (x, w, h) => {
      x.strokeStyle = '#1b2a38'; x.lineWidth = 20; x.lineJoin = 'miter';
      const icone = (x0, retardAuTravail) => {
        const u = 60, X = d => x0 + d * u;                          /* 1 mm = 60 px */
        /* la bobine : alimentée de t0 à t2 */
        x.beginPath(); x.moveTo(X(-3), 90); x.lineTo(X(-2), 90); x.lineTo(X(-2), 38); x.lineTo(X(1.2), 38); x.lineTo(X(1.2), 90); x.lineTo(X(3), 90); x.stroke();
        /* le contact : au travail il attend avant de monter ; au repos il monte tout de suite et attend avant de retomber */
        x.beginPath();
        if (retardAuTravail) { x.moveTo(X(-3), 214); x.lineTo(X(-0.4), 214); x.lineTo(X(-0.4), 160); x.lineTo(X(1.2), 160); x.lineTo(X(1.2), 214); x.lineTo(X(3), 214); }
        else { x.moveTo(X(-3), 214); x.lineTo(X(-2), 214); x.lineTo(X(-2), 160); x.lineTo(X(2.4), 160); x.lineTo(X(2.4), 214); x.lineTo(X(3), 214); }
        x.stroke();
      };
      icone(w / 2 - 3.9 * 60, true); icone(w / 2 + 3.9 * 60, false);
    });
    pictos.position.set(0, -12.9, Z_E + 0.02);
    const ech = new T.Group(); ech.position.set(0, -19, Z_E);
    ech.add(cylZ(K, 1.0, -15, 0.2, M.acier, 0, 0, 12));
    ech.add(new T.Mesh(revol(T, [[0, 0], [2.2, 0], [2.2, 0], [2.2, 1.6], [1.9, 1.9], [0, 1.9]], 24), M.plastiqueNoir));
    ech.add(K.mesh(new T.BoxGeometry(0.7, 2.0, 0.3), M.plastiqueBlanc, 0, 1.1, 1.95));
    ech.rotation.z = PI / 2;                                   /* le pointeur vise « s » : secondes */
    const reglages = new T.Group(); reglages.add(fonc, ech, pictos, texte('s', -5.4, -19, 2.4), texte('min', 5.0, -19, 2.4));
    facade.add(voyants, knob, graduation, anneau, reglages);
    racine.add(facade);

    /* ---------------- les bornes : 55, A1, 67 en haut ; 56, A2, 68 en bas ---------------- */
    const bornes = new T.Group(), marques = new T.Group();
    const BORNES = [['55', -6, 36], ['A1', 0, 36], ['67', 6, 36], ['56', -6, -36], ['A2', 0, -36], ['68', 6, -36]];
    const pos3 = {};
    BORNES.forEach(([nom, x, y]) => {
      bornes.add(cylZ(K, 2.6, 44.9, 45.25, M.sombre, x, y, 20));
      const v = K.vis(1.9); v.rotation.x = PI / 2; v.position.set(x, y, 45.25); bornes.add(v);
      const gr = K.gravure(nom, 2.5, { couleur: '#2b3138' }); gr.position.set(x, y > 0 ? 31.6 : -31.6, 45.06); marques.add(gr);
      pos3[nom] = [x, y, 45.8];
    });
    racine.add(bornes, marques);
    const fils = new T.Group();
    const wire = (nom, dx, coul) => {
      const p = pos3[nom], s = p[1] > 0 ? 1 : -1;
      const w = K.fil([p, [p[0], p[1] + s * 5, 47.2], [p[0] + dx, p[1] + s * 14, 46], [p[0] + dx * 1.5, p[1] + s * 28, 42]], 0.9, coul);
      fils.add(w.mesh); return w;
    };
    const W = { 55: wire('55', -2, 'rouge'), A1: wire('A1', 0, 'rouge'), 67: wire('67', 2, 'rouge'), 56: wire('56', -2, 'rouge'), A2: wire('A2', 0, 'N'), 68: wire('68', 2, 'rouge') };
    racine.add(fils);

    /* ---------------- le compteur de temps : un circuit imprimé, son condensateur, sa puce ---------------- */
    const compteur = new T.Group();
    compteur.add(K.mesh(K.boite(13.6, 68, 1.4, 0.3), K.plastique(0x1d6b46, 0.45), 0, 0, 42.8));
    compteur.add(cylZ(K, 3.6, 30.6, 42.1, K.metal(0x274b8f, 0.35), -1.2, 24, 28), cylZ(K, 3.4, 30, 30.6, M.aluminium, -1.2, 24, 28));
    compteur.add(K.mesh(K.boite(5, 9, 2.2, 0.3), M.plastiqueNoir, 3.2, 14, 40.95));
    /* les pistes de cuivre, côté arrière : l'alimentation A1-A2, et la sortie qui alimente la bobine du relais */
    const piste = (l, h, x, y) => compteur.add(K.mesh(new T.BoxGeometry(l, h, 0.3), M.cuivre, x, y, 41.95));
    piste(1.2, 72, 6.0, 0); piste(6.0, 1.2, 3.0, 36); piste(6.0, 1.2, 3.0, -36); piste(12, 1.0, 0, -12);
    [36, -36].forEach(y => compteur.add(K.mesh(new T.BoxGeometry(1.6, 1.6, 3.4), M.cuivre, 0, y, 43.5)));
    racine.add(compteur);

    /* ---------------- le relais interne (le même mécanisme que le relais 5.4) ---------------- */
    const Y0 = -14, Z0 = 6;
    const mec = construireMecanisme(T, K, { zAncre: 36 });
    mec.flux.forEach(fl => { fl.objet.visible = false; });             /* le champ n'est pas le sujet ici : il encombrerait les contacts */
    const mecG = new T.Group(); mecG.position.set(0, Y0, Z0); mecG.add(mec.g);
    mecG.add(K.mesh(K.boite(10, 10, 8, 0.6), M.plastiqueSombre, 0, C.YH - 5.4, 1.4 + 4 - Z0));     /* le pied qui tient la culasse au fond du boîtier */
    /* la carte : poussée par la palette, elle appuie sur les deux lames. Sa tige est fixée à la languette. */
    mec.arm.add(cylZ(K, 0.8, -2.4, -0.45, M.plastiqueMarine, 0, C.LA - 1.2, 10));
    const carte = K.mesh(K.boite(13.2, 3.0, 1.2, 0.3), M.plastiqueMarine);
    racine.add(mecG, carte);

    /* ---------------- les deux lames de contact (NF 55-56 à gauche, NO 67-68 à droite) ---------------- */
    const lames = new T.Group();
    const YR = 36, YP = -3, EB = 0.5, Z_B = 24.9, BX = 5.0, GAP_NO = 2.0, XS = 7.3;
    const lame = (x, patchFace) => {
      const G = new T.Group(); G.position.set(x, YR, Z_B);
      const L = YR + 10;
      G.add(K.mesh(new T.BoxGeometry(3.0, L, EB), M.cuivre, 0, -L / 2, 0));
      G.add(K.mesh(new T.BoxGeometry(2.4, 2.4, 0.3), M.laiton, 0, YP - YR, patchFace * (EB / 2 + 0.1)));
      lames.add(G); return G;
    };
    const lameNF = lame(-BX, +1), lameNO = lame(BX, -1);
    const zNFplot = Z_B + EB / 2 + 0.5, zNOplot = Z_B - EB / 2 - GAP_NO - 0.5;
    const plot = (x, z) => lames.add(cylZ(K, 1.8, z - 0.5, z + 0.5, M.argent, x, YP, 20));
    plot(-BX, zNFplot); plot(BX, zNOplot);
    const zNFtab = zNFplot + 1.0, zNOtab = zNOplot - 1.0;
    const bande = (x, y0, y1, z) => K.mesh(new T.BoxGeometry(0.8, y1 - y0, 0.8), M.cuivre, x, (y0 + y1) / 2, z);
    const rail3 = (x, y, z0, z1) => K.mesh(new T.BoxGeometry(0.8, 0.8, z1 - z0), M.cuivre, x, y, (z0 + z1) / 2);
    const ZDEV = 30.5;                         /* le NF repart vers l'avant avant de descendre : sa lame ne passe pas devant la carte */
    lames.add(K.mesh(new T.BoxGeometry(4.2, 3.4, 1.0), M.cuivre, -5.6, YP, zNFtab), rail3(-XS, YP, zNFtab, ZDEV), bande(-XS, -36, YP, ZDEV), rail3(-XS, -36, ZDEV, 44.5), K.mesh(new T.BoxGeometry(1.6, 0.8, 0.8), M.cuivre, -6.5, -36, 44.5));
    lames.add(K.mesh(new T.BoxGeometry(4.2, 3.4, 1.0), M.cuivre, 5.6, YP, zNOtab), bande(XS, -36, YP, zNOtab), rail3(XS, -36, zNOtab, 44.5), K.mesh(new T.BoxGeometry(1.6, 0.8, 0.8), M.cuivre, 6.5, -36, 44.5));
    lames.add(rail3(-6, YR, Z_B, 44.5), rail3(6, YR, Z_B, 44.5));
    racine.add(lames);

    /* ---------------- le courant ---------------- */
    const Pm = p => [p[0], p[1] + Y0, p[2] + Z0];               /* un point du mécanisme → repère du module */
    const cAlim = K.courant(K.chemin([K.inverse(W.A1), pos3.A1, [0, 36, 43.5], [0, 36, 41.95], [6, 36, 41.95], [6, -36, 41.95], [0, -36, 41.95], [0, -36, 43.5], pos3.A2, W.A2.courbe]), { pas: 6, rayon: 0.9, vitesse: 34 });
    const bobine = mec.cheminBobine().map(Pm);
    const cheminFilBobine = [[-6, -12, 41.95], [-6, -12, 8], [-5.4, Y0 + C.YC, 9.5]];
    const cBobine = K.courant(K.chemin([...cheminFilBobine, ...bobine.slice(1, -1), [5.4, Y0 + C.YC, 9.5], [6, -12, 8], [6, -12, 41.95], [-6, -12, 41.95]]), { pas: 5.5, rayon: 0.7, vitesse: 34 });
    const cNF = K.courant(K.chemin([
      K.inverse(W[55]), pos3[55], [-6, 36, 44.5], [-6, 36, Z_B], [-BX, 36, Z_B], [-BX, YP, Z_B], [-BX, YP, zNFplot], [-BX, YP, zNFtab], [-XS, YP, zNFtab], [-XS, YP, ZDEV], [-XS, -36, ZDEV], [-XS, -36, 44.5], [-6, -36, 44.5], pos3[56], W[56].courbe
    ]), { pas: 6, rayon: 0.9, vitesse: 34 });
    const cNO = K.courant(K.chemin([
      K.inverse(W[67]), pos3[67], [6, 36, 44.5], [6, 36, Z_B], [BX, 36, Z_B], [BX, YP, Z_B - GAP_NO], [BX, YP, zNOplot], [BX, YP, zNOtab], [XS, YP, zNOtab], [XS, -36, zNOtab], [XS, -36, 44.5], [6, -36, 44.5], pos3[68], W[68].courbe
    ]), { pas: 6, rayon: 0.9, vitesse: 34 });
    const courants = [cAlim, cBobine, cNF, cNO];
    courants.forEach(c => { c.regler({ debit: 0, alternatif: true, frequence: 0.7 }); racine.add(c.objet); });

    /* ---------------- l'état : le compteur, le relais, les contacts ---------------- */
    let fonction = opt.fonction === 'repos' ? 'repos' : 'travail';
    let duree = 1, alim = false, prog = 0, compte = false, rel = false, cap = 1, eclatee = false, derniere = '';
    const pos = K.mobile(C.PH0, 900, 32);
    const lecon = on => { pos.k = on ? 70 : 900; pos.c = on ? 16 : 32; };
    const ang = d => d * PI / 180;
    const aFonc = K.mobile(ang(fonction === 'travail' ? 140 : -140), 160, 24);
    const aKnob = K.mobile(-ang(A0 + (A1 - A0) * (duree - 1) / 5), 160, 24);
    const etatContacts = { nf: true, no: false };
    const maj = () => {
      const f = clamp(pos.x, C.PH0, C.PH1);
      mec.poser(f);
      const yz = mec.pt(f, 15.8, -2.5);
      carte.position.set(0, Y0 + yz[0], Z0 + yz[1]);
      const poussee = Math.max(0, (Z_B + EB / 2) - (carte.position.z - 0.6));
      const beta = Math.asin(clamp(poussee / (YR - carte.position.y), 0, 0.5));
      lameNF.rotation.x = lameNO.rotation.x = beta;
      const dep = (YR - YP) * Math.sin(beta);
      etatContacts.nf = dep < 0.12; etatContacts.no = dep >= GAP_NO - 0.08;
      const a = !eclatee;
      cAlim.regler({ debit: alim && a ? 1 : 0 });
      cBobine.regler({ debit: rel && a ? 1 : 0 });
      cNF.regler({ debit: etatContacts.nf && a ? 1 : 0 });
      cNO.regler({ debit: etatContacts.no && a ? 1 : 0 });
      vU.regler(alim);
      const n = Math.round(prog * NP);
      points.forEach((p, i) => { p.material = i < n ? matPointOn : matPointOff; });
      const m = [{ libelle: 'Durée réglée', valeur: String(duree).replace('.', ',') + ' s' }, { libelle: 'NF · 55-56', valeur: etatContacts.nf ? 'fermé' : 'ouvert' }, { libelle: 'NO · 67-68', valeur: etatContacts.no ? 'fermé' : 'ouvert' }];
      const cle = JSON.stringify(m);
      if (cle !== derniere) { derniere = cle; ctx.mesures(m); }
    };
    const PH = {
      travail: '<strong>Temporisé au travail.</strong> On alimente la bobine : le temps compte (l’anneau s’allume, la DEL R clignote), puis les contacts basculent. À la coupure, ils reviennent tout de suite.',
      repos: '<strong>Temporisé au repos.</strong> On alimente la bobine : les contacts basculent tout de suite. C’est à la coupure qu’ils attendent le délai avant de revenir (l’anneau s’allume, la DEL R clignote).'
    };
    /* le temps : on compte jusqu'à 1, ou jusqu'au plafond de l'étape (cap) quand on découpe le mouvement pour la leçon */
    const reinit = () => { prog = 0; compte = false; rel = fonction === 'repos' && alim; cap = 1; };
    const allume = a => {
      if (a === alim) return;
      alim = a;
      if (fonction === 'travail') { if (a) { prog = 0; compte = true; } else { prog = 0; compte = false; rel = false; } }
      else { if (a) { prog = 0; compte = false; rel = true; } else { prog = 0; compte = true; } }
    };
    const PHASES = {
      repos: () => { alim = false; reinit(); },
      alimente: () => { alim = false; reinit(); allume(true); },
      compte: () => { if (fonction === 'travail') { alim = false; reinit(); cap = 0.55; allume(true); } else { alim = true; reinit(); rel = true; cap = 0.55; allume(false); } },
      colle: () => {
        if (!compte && fonction === 'travail' && !rel) { alim = true; prog = 0; compte = true; }
        if (fonction === 'repos' && !rel && !compte) { rel = true; pos.x = C.PH1; pos.v = 0; prog = 0.55; alim = false; compte = true; }   /* saut direct à cette étape : on part d'un contact déjà basculé */
        if (!compte && fonction === 'repos' && rel) { alim = false; prog = 0; compte = true; }
        cap = 1;
      },
      coupe: () => {
        alim = true; reinit(); cap = 1;
        if (fonction === 'travail') { rel = true; prog = 1; pos.x = C.PH1; pos.v = 0; }
        allume(false);
      }
    };
    const agir = (id, v) => {
      if (id === 'fonction') {
        fonction = v === 'repos' ? 'repos' : 'travail'; lecon(false); reinit(); aFonc.cible = ang(fonction === 'travail' ? 140 : -140);
        ctx.dire(PH[fonction]); maj(); return;
      }
      if (id === 'duree') { duree = +v; aKnob.cible = -ang(A0 + (A1 - A0) * (duree - 1) / 5); maj(); return; }
      if (id === 'bobine') { lecon(false); cap = 1; allume(v === 'alimentee'); ctx.dire(PH[fonction]); maj(); return; }
      if (id === 'phase') {
        lecon(true); duree = 1; ctx.regler('duree', 1); aKnob.cible = -ang(A0);
        const [nom, f] = Array.isArray(v) ? v : [v, fonction];
        if (f !== fonction) { fonction = f; aFonc.cible = ang(fonction === 'travail' ? 140 : -140); ctx.regler('fonction', fonction); }
        PHASES[nom]();
        ctx.regler('bobine', alim ? 'alimentee' : 'repos'); maj();
      }
    };
    maj();

    const cadre = [base, fenetre];
    const devant = ctx.mode === 'decouvrir' ? { azimut: -28, elevation: 12, cadre, marge: 1.0, zoom: 1.0 } : { azimut: -48, elevation: 12, cadre, marge: 1.0, zoom: 0.98 };
    const etapes = fonction === 'travail' ? [
      { titre: 'Au repos', piece: 'voyants', voirDedans: true, actions: [['phase', ['repos', 'travail']]],
        vue: { azimut: -48, elevation: 12, zoom: 0.98, cible: null },
        texte: 'La bobine n’est pas alimentée : rien ne compte, les voyants sont éteints. Le contact NF (55-56) est fermé, le NO (67-68) est ouvert.' },
      { titre: 'On alimente : le temps commence à compter', piece: 'anneau', ralenti: true, voirDedans: true, actions: [['phase', ['compte', 'travail']]],
        vue: { azimut: -24, elevation: 8, zoom: 1.35, cible: [0, 0, 50] },
        texte: 'Le voyant U s’allume : le module est alimenté. Le compteur de temps se met en marche : l’anneau de points s’allume peu à peu et le voyant R clignote. Les contacts n’ont pas encore bougé.' },
      { titre: 'Le délai est écoulé : le relais interne colle', piece: 'palette', ralenti: true, voirDedans: true, actions: [['phase', ['colle', 'travail']]],
        vue: { azimut: -66, elevation: 16, zoom: 1.35, cible: [0, -6, 20] }, duree: 8,
        texte: 'Le temps réglé est écoulé : l’électronique alimente la petite bobine interne. Elle attire la palette, la palette pousse la carte, la carte pousse les deux lames : le NF (55-56) s’ouvre, puis le NO (67-68) se ferme. Le voyant R reste allumé.' },
      { titre: 'On coupe : tout retombe d’un coup', piece: 'contacts', ralenti: true, voirDedans: true, actions: [['phase', ['coupe', 'travail']]],
        vue: { azimut: -48, elevation: 12, zoom: 0.98, cible: null },
        texte: 'Plus d’alimentation : au travail, le module retombe tout de suite, sans attendre. Les contacts retrouvent leur état de repos et l’anneau s’éteint.' }
    ] : [
      { titre: 'Au repos', piece: 'voyants', voirDedans: true, actions: [['phase', ['repos', 'repos']]],
        vue: { azimut: -48, elevation: 12, zoom: 0.98, cible: null },
        texte: 'La bobine n’est pas alimentée : rien ne compte, les voyants sont éteints. Le contact NF (55-56) est fermé, le NO (67-68) est ouvert.' },
      { titre: 'On alimente : les contacts basculent tout de suite', piece: 'palette', ralenti: true, voirDedans: true, actions: [['phase', ['alimente', 'repos']]],
        vue: { azimut: -66, elevation: 16, zoom: 1.35, cible: [0, -6, 20] }, duree: 8,
        texte: 'Au repos, le contact ne se fait pas attendre : dès que la bobine est alimentée, la palette colle, pousse la carte, et les deux lames basculent. Le voyant U et le voyant R sont allumés. Le temps ne compte pas encore.' },
      { titre: 'On coupe : le temps commence à compter', piece: 'anneau', ralenti: true, voirDedans: true, actions: [['phase', ['compte', 'repos']]],
        vue: { azimut: -24, elevation: 8, zoom: 1.35, cible: [0, 0, 50] },
        texte: 'On coupe l’alimentation. Le module garde ses contacts basculés et il COMPTE : l’anneau s’allume peu à peu, le voyant R clignote. Le condensateur du compteur fournit encore le courant dont la bobine interne a besoin.' },
      { titre: 'Le délai est écoulé : les contacts retombent', piece: 'contacts', ralenti: true, voirDedans: true, actions: [['phase', ['colle', 'repos']]], duree: 8,
        vue: { azimut: -66, elevation: 16, zoom: 1.35, cible: [0, -6, 20] },
        texte: 'Le temps réglé est écoulé : le compteur coupe la bobine interne. Le ressort ramène la palette, la carte recule, les lames reviennent à leur place. Le voyant R s’éteint : c’est seulement maintenant que le contact retombe.' }
    ];
    return {
      racine,
      vue: devant,
      fantome: [base, fenetre],
      phrase: PH[fonction],
      pieces: [
        { id: 'boitier', nom: 'Le boîtier modulaire (17,5 mm)', objets: [base, fenetre, griffe], ancre: [0, -44, 22], desc: 'Un boîtier étroit qui se clipse sur le rail DIN. Il ne mesure que 17,5 mm de large : on en met beaucoup côte à côte.' },
        { id: 'molette', nom: 'La molette de durée', objets: [knob, graduation], desc: 'Elle règle la valeur du délai, de 1 à 6 ici. La graduation est imprimée autour. Lisez toujours la valeur ET l’échelle.' },
        { id: 'reglages', nom: 'Les sélecteurs : fonction et échelle', objets: [reglages], desc: 'Le sélecteur de fonction choisit « au travail » ou « au repos » (deux petits chronogrammes). L’autre donne l’échelle : s pour secondes, min pour minutes.' },
        { id: 'voyants', nom: 'Les voyants U et R', objets: [voyants], desc: 'U s’allume quand le module est alimenté. R s’allume quand le relais interne est collé, et il clignote pendant que le temps compte.' },
        { id: 'anneau', nom: 'L’anneau du temps (pour comprendre)', objets: [anneau], desc: 'Ces points ne sont pas sur le vrai module : ils montrent le temps qui passe. Quand ils sont tous allumés, le délai est écoulé.' },
        { id: 'compteur', nom: 'Le compteur de temps (électronique)', objets: [compteur], desc: 'Un circuit imprimé : un condensateur qui se charge, une puce qui décide du moment. C’est lui qui compte, pas la mécanique.' },
        { id: 'bobine', nom: 'La bobine du relais interne', objets: [mec.bobine, mec.culasse], desc: 'Le même relais que celui de la station 5.4, en plus petit. L’électronique l’alimente quand le temps est écoulé.' },
        { id: 'palette', nom: 'La palette et la carte', objets: [mec.palette, mec.ressortG, carte], desc: 'Attirée par la bobine, la palette pousse la carte. ' + 'La carte appuie sur les deux lames en même temps. Le ressort la ramène à la coupure.' },
        { id: 'contacts', nom: 'Les contacts temporisés : 55-56 (NF) et 67-68 (NO)', objets: [lames], ancre: [5, 14, Z_B], desc: 'Deux lames de cuivre. Le NF (55-56) touche son plot au repos. Le NO (67-68) ne le touche qu’une fois la carte poussée. Ce sont les repères du cours.' },
        { id: 'bornes', nom: 'Les bornes : A1, A2, 55, 56, 67, 68', objets: [bornes, marques], ancre: [0, 36, 46], desc: 'A1 et A2 : l’alimentation de la bobine. 55-56 : le contact NF temporisé. 67-68 : le contact NO temporisé.' },
        { id: 'fils', nom: 'Les fils', objets: [fils], ancre: [0, -55, 44], desc: 'Des fils fins, rouges, et un bleu pour le neutre (A2).' },
        { id: 'rail', nom: 'Le rail DIN', objets: [rail], ancre: [-40, 15, -0.5], desc: 'Le module s’y clipse, comme tout l’appareillage modulaire.' }
      ],
      commandes: [
        { id: 'fonction', type: 'choix', options: [['travail', 'Temporisé au travail'], ['repos', 'Temporisé au repos']], valeur: fonction },
        { id: 'bobine', type: 'choix', options: [['repos', 'Bobine au repos'], ['alimentee', 'Bobine alimentée']], valeur: 'repos' },
        { id: 'duree', type: 'curseur', libelle: 'La durée réglée', min: 1, max: 6, pas: 0.5, valeur: 1, format: v => String(v).replace('.', ',') + ' s' }
      ],
      etapes,
      /* l'éclaté, par l'avant : la face avant, la fenêtre, le circuit du compteur, les lames, le relais interne */
      eclate: [
        { objets: [facade], vers: [0, 0, 130], debut: 0, fin: 0.4 },
        { objets: [fenetre], vers: [0, 0, 104], debut: 0.12, fin: 0.55 },
        { objets: [compteur], vers: [0, 0, 78], debut: 0.25, fin: 0.7 },
        { objets: [lames, carte, mecG], vers: [0, 0, 52], debut: 0.4, fin: 1 }
      ],
      eclateVue: { azimut: -58, elevation: 14, zoom: 0.5, cible: [0, 0, 92] },
      surEclate(on) { eclatee = on; maj(); },
      agir,
      animer(dt, t) {
        let actif = false;
        if (compte) {
          actif = true;
          prog = Math.min(prog + dt / duree, cap);
          if (prog >= 1 - 1e-6) { prog = 1; compte = false; rel = fonction === 'travail'; }
        }
        pos.cible = rel ? C.PH1 : C.PH0;
        const a = pos.pas(dt), b = aFonc.pas(dt), c = aKnob.pas(dt);
        fonc.rotation.z = aFonc.x; knob.rotation.z = aKnob.x;
        /* la DEL R : clignote pendant le comptage, fixe quand le relais est collé */
        const clignote = compte && prog < 1;
        vR.regler(clignote ? Math.floor((t || 0) * 6) % 2 === 0 : rel);
        maj();
        if (a || b || c) actif = true;
        courants.forEach(g => { if (g.animer(dt)) actif = true; });
        return actif || clignote;
      }
    };
  }, { famille: 'pilotage', titre: 'Le relais temporisé', stations: ['5.5', '5.6'] });
})();
