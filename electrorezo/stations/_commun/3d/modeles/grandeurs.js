/* ÉlectroRézo 3D — famille « grandeurs » : circuit (banc d'expérience, six expériences),
   multimetre, pince, alternateur.
   Unités : millimètres. Repère : X largeur, Y hauteur (0 = dessus de la planche), Z profondeur
   (+Z = face avant, vers l'élève).

   Ce que l'élève doit VOIR : le courant (grains dorés) est le MÊME partout dans une boucle — une
   seule rivière de grains fait tout le tour ; plus d'intensité = grains plus serrés et plus
   rapides ; en alternatif ils vont et viennent. Un instrument porte son unité comme le vrai :
   l'ampèremètre à aiguille dit « A », le multimètre affiche « 230.4 V~ », la pince « A~ ». */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ================================================================== briques locales
     (la toile de dessin et le halo sont au kit : K.toile, K.halo) */

  const POLICE_SYMB = 'Calibri, "Segoe UI", "Segoe UI Symbol", Arial, sans-serif';

  /* un afficheur à cristaux liquides : la valeur en grand, l'unité à droite, comme le vrai */
  function lcd(K, W, H, o) {
    o = o || {};
    const tl = K.toile(W, H, 14);
    const ecrire = (val, unite, coin) => {
      const { x, w, h } = tl;
      x.fillStyle = o.fond || '#c5d1b0'; x.fillRect(0, 0, w, h);
      x.fillStyle = o.encre || '#17230f'; x.textBaseline = 'middle';
      x.font = '700 ' + Math.round(h * (o.grand || 0.5)) + 'px Consolas, "Courier New", monospace';
      x.textAlign = 'right'; x.fillText(val, w * (o.coupe || 0.7), h * 0.56);
      x.font = '700 ' + Math.round(h * 0.3) + 'px ' + POLICE_SYMB;
      x.textAlign = 'left'; x.fillText(unite || '', w * ((o.coupe || 0.7) + 0.03), h * 0.62);
      if (coin) { x.font = '700 ' + Math.round(h * 0.2) + 'px ' + POLICE_SYMB; x.fillText(coin, w * 0.05, h * 0.2); }
      tl.maj();
    };
    ecrire('', '');
    return { mesh: tl.mesh, ecrire };
  }

  /* une douille de sécurité (banane 4 mm), face vers +Z */
  function douille(T, K, coul) {
    const g = new T.Group();
    const col = K.mesh(K.cylindre(5.2, 5, 20), K.plastique(coul, 0.45)); col.rotation.x = Math.PI / 2; col.position.z = 2.5;
    const trou = K.mesh(K.cylindre(2.2, 0.6, 14), K.mat.sombre); trou.rotation.x = Math.PI / 2; trou.position.z = 5.05;
    g.add(col, trou);
    return g;
  }
  /* la fiche banane d'un cordon, enfoncée dans une douille, vers +Z */
  function fiche(T, K, coul) {
    const g = new T.Group();
    const corps = K.mesh(K.cylindre(3.6, 14, 18, 3.2), K.plastique(coul, 0.45)); corps.rotation.x = Math.PI / 2; corps.position.z = 12;
    const bague = K.mesh(K.cylindre(4.2, 3, 18), K.plastique(coul, 0.45)); bague.rotation.x = Math.PI / 2; bague.position.z = 6.5;
    g.add(corps, bague);
    return g;
  }
  /* une borne à vis d'appareil (laiton, capuchon noir), face vers +Z */
  function borneVis(T, K) {
    const g = new T.Group();
    const f = K.mesh(K.cylindre(3.4, 4, 18), K.mat.laiton); f.rotation.x = Math.PI / 2; f.position.z = 2;
    const cap = K.mesh(K.cylindre(4.6, 5, 20), K.mat.plastiqueNoir); cap.rotation.x = Math.PI / 2; cap.position.z = 6.5;
    g.add(f, cap);
    return g;
  }
  /* une lampe sur socle : ampoule, filament, deux bornes en façade.
     rend { groupe, bornes: [entrée, sortie], interne: points (entrée → filament → sortie),
            regler(eclat 0..1.3), pieces } */
  function lampe(T, K, echelle) {
    const e = echelle || 1;
    const g = new T.Group();
    const socle = K.mesh(K.boite(64, 16, 56, 3), K.mat.plastiqueSombre, 0, 8, 0);
    const bornes = [borneVis(T, K), borneVis(T, K)];
    bornes[0].position.set(-18, 8, 28); bornes[1].position.set(18, 8, 28);
    const douilleL = K.mesh(K.cylindre(13, 24, 28), K.mat.plastiqueBlanc, 0, 28, 0);
    const culot = K.mesh(K.cylindre(11 * e, 12, 24), K.mat.aluminium, 0, 46, 0);
    const verreMat = new T.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.32, depthWrite: false, emissive: 0xffc46a, emissiveIntensity: 0 });
    const R = 25 * e;
    const verre = K.mesh(K.sphere(R, 28), verreMat, 0, 52 + R * 0.9, 0);
    const col = K.mesh(K.cylindre(11 * e, 10, 24, 14 * e), verreMat, 0, 55, 0);
    const yF = 52 + R * 0.95;
    const filMat = new T.MeshBasicMaterial({ color: 0x5c5650, toneMapped: false });
    const supportMat = K.mat.acierSombre;
    const s1 = K.fil([[-5, 50, 0], [-6, yF - 8, 0], [-9 * e, yF, 0]], 0.5, supportMat);
    const s2 = K.fil([[5, 50, 0], [6, yF - 8, 0], [9 * e, yF, 0]], 0.5, supportMat);
    const pts = [];
    for (let i = 0; i <= 120; i++) { const u = i / 120, a = u * Math.PI * 2 * 9; pts.push(new T.Vector3(-9 * e + u * 18 * e, yF + Math.sin(a) * 1.3, Math.cos(a) * 1.3)); }
    const filament = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 240, 0.42, 6, false), filMat);
    filament.userData.sansOmbre = true;
    const h = K.halo([[0, 'rgba(255,250,225,1)'], [0.3, 'rgba(255,214,130,.55)'], [1, 'rgba(255,190,90,0)']], { additif: true });
    h.userData.sansOmbre = true; h.userData.decor = true; h.raycast = () => {};
    h.position.set(0, yF, 0); h.visible = false;
    g.add(socle, bornes[0], bornes[1], douilleL, culot, col, verre, s1.mesh, s2.mesh, filament, h);
    const interne = [[-18, 8, 36], [-18, 8, 18], [-5, 30, 0], [-5, 50, 0], [-6, yF - 8, 0], [-9 * e, yF, 0], [9 * e, yF, 0], [6, yF - 8, 0], [5, 50, 0], [5, 30, 0], [18, 8, 18], [18, 8, 36]];
    const froid = new T.Color(0x5c5650), rouge = new T.Color(0xc0400a), clair = new T.Color(0xfff2c0);
    const regler = n => {
      n = K.clamp(n, 0, 1.4);
      const c = n < 0.35 ? froid.clone().lerp(rouge, n / 0.35) : rouge.clone().lerp(clair, Math.min(1, (n - 0.35) / 0.6));
      filMat.color.copy(c);
      verreMat.emissiveIntensity = n * 0.9;
      h.visible = n > 0.08; h.scale.setScalar((22 + 60 * n) * e); h.material.opacity = Math.min(1, 0.25 + n * 0.7);
    };
    regler(0);
    return { groupe: g, bornes: [new T.Vector3(-18, 8, 36), new T.Vector3(18, 8, 36)], interne, regler,
      verre: [verre, col], filament: [filament, s1.mesh, s2.mesh], socle: [socle, douilleL, culot], bornesObj: bornes };
  }

  /* une pointe de touche : la pointe métallique en (0,0,0), le manche monte selon +Y.
     orienter(versHaut) incline la pointe. rend { groupe, arriere: point de sortie du cordon } */
  function sonde(T, K, coul) {
    const g = new T.Group();
    const mat = K.plastique(coul, 0.45);
    const pointe = K.mesh(K.cylindre(0.9, 13, 12, 0.6), K.mat.acier, 0, 7, 0);
    const bout = K.mesh(K.cylindre(0.6, 2, 10, 0.05), K.mat.acier, 0, 0.3, 0);
    const gaine = K.mesh(K.cylindre(3.2, 10, 18, 2.2), mat, 0, 17, 0);
    const garde = K.mesh(K.cylindre(6.5, 3, 24), mat, 0, 23, 0);
    const manche = K.mesh(K.cylindre(4.6, 58, 20, 4.2), mat, 0, 54, 0);
    const queue = K.mesh(K.cylindre(3, 8, 16, 4.2), mat, 0, 87, 0);
    g.add(pointe, bout, gaine, garde, manche, queue);
    return { groupe: g, arriere: new T.Vector3(0, 91, 0) };
  }

  /* une boucle de courant : des fils entre bornes + des passages internes, et UNE rivière de
     grains qui fait tout le tour (le courant est le même partout dans une boucle).
     etapes : { fil: [pts…], mat } | { pts: [pts…] } | { fn: () => [pts…] } — dans l'ordre du trajet.
     refaire() reconstruit la rivière quand un passage interne change (curseur du rhéostat). */
  function boucle(T, K, racine, etapes, o) {
    const fils = [];
    etapes.forEach(e => { if (e.fil) { e.f = K.fil(e.fil, o.rayon || 2.2, e.mat); racine.add(e.f.mesh); fils.push(e.f.mesh); } });
    const grp = new T.Group(); racine.add(grp);
    const b = { fils, groupe: grp, courant: null, etat: { debit: 0, vitesse: o.vitesse || 40, alternatif: false, frequence: 0.7 } };
    b.refaire = () => {
      const morceaux = [];
      etapes.forEach(e => { if (e.f) morceaux.push(e.f.courbe); else (e.pts || e.fn()).forEach(p => morceaux.push(p)); });
      if (b.courant) { grp.remove(b.courant.objet); b.courant.objet.dispose(); }
      b.courant = K.courant(K.chemin(morceaux), { pas: o.pas || 9, rayon: o.grain || 2.7, vitesse: b.etat.vitesse });
      b.courant.regler(b.etat); grp.add(b.courant.objet);
    };
    b.regler = r => { Object.assign(b.etat, r); b.courant.regler(r); };
    b.refaire();
    return b;
  }
  /* un fil couché sur la planche, d'une borne (face +Z) à une autre */
  const tirer = (de, a, via, r) => {
    r = r || 2.4;
    const p = [de[0], de[1], de[2]], q = [a[0], a[1], a[2]];
    return [p, [p[0], Math.max(r, p[1] * 0.45), p[2] + 9], [p[0], r, p[2] + 18], ...(via || []).map(v => [v[0], r, v[1]]), [q[0], r, q[2] + 18], [q[0], Math.max(r, q[1] * 0.45), q[2] + 9], q];
  };
  const pos = (o, v) => { o.updateMatrixWorld(true); return o.localToWorld(v.clone ? v.clone() : new o.position.constructor(v[0], v[1], v[2])); };
  const nb = (v, d) => v.toFixed(d === undefined ? 1 : d).replace('.', ',');

  /* ------------------------------------------------------------------ les appareils du banc
     Chaque appareil est posé sur y = 0, face avant vers +Z. Les bornes rendues sont le point où
     le fil arrive (devant la borne ou au bout de la fiche banane). */

  /* l'alimentation de laboratoire : deux afficheurs (tension, intensité), deux boutons, + et − */
  function alimLabo(T, K) {
    const M = K.mat, g = new T.Group();
    const corps = K.mesh(K.boite(140, 104, 130, 5), M.plastiqueBlanc, 0, 52, 0);
    const facade = K.mesh(K.boite(132, 94, 3, 1.5), M.plastiqueSombre, 0, 52, 64.5);
    const pieds = [-55, 55].map(x => K.mesh(K.boite(16, 4, 110, 1), M.caoutchouc, x, 0.5, 0));
    const ecU = lcd(K, 46, 18, { fond: '#1a0d0a', encre: '#ff5a36', coupe: 0.74 });
    const ecI = lcd(K, 46, 18, { fond: '#0b160e', encre: '#3fe36c', coupe: 0.74 });
    ecU.mesh.position.set(-32, 76, 66.2); ecI.mesh.position.set(32, 76, 66.2);
    const boutons = [-32, 32].map(x => {
      const b = new T.Group(); b.position.set(x, 46, 66);
      const c = K.mesh(K.cylindre(9, 10, 28), M.plastiqueNoir); c.rotation.x = Math.PI / 2; c.position.z = 5;
      const i = K.mesh(K.boite(1.6, 7, 1, 0.3), M.plastiqueBlanc, 0, 4.5, 10.2);
      b.add(c, i); return b;
    });
    const dM = douille(T, K, 0x26282b), dP = douille(T, K, 0xc0392b);
    dM.position.set(-30, 18, 66); dP.position.set(30, 18, 66);
    const marques = [['−', -30], ['+', 30]].map(([s, x]) => { const m = K.gravure(s, 6, { couleur: '#f1efe8' }); m.position.set(x, 30, 66.1); return m; });
    const symb = K.gravure('⎓', 6, { couleur: '#f1efe8' }); symb.position.set(0, 18, 66.1);
    g.add(corps, facade, ...pieds, ecU.mesh, ecI.mesh, ...boutons, dM, dP, ...marques, symb);
    const fM = fiche(T, K, 0x26282b), fP = fiche(T, K, 0xc0392b);
    fM.position.copy(dM.position); fP.position.copy(dP.position); g.add(fM, fP);
    return {
      groupe: g, ecU, ecI, boutons,
      bornes: [new T.Vector3(-30, 18, 87), new T.Vector3(30, 18, 87)],      /* − à gauche, + à droite */
      interne: [[-30, 18, 87], [-30, 18, 50], [30, 18, 50], [30, 18, 87]]
    };
  }

  /* l'arrivée du réseau du banc : 230 V ~, neutre (bleu) à gauche, phase (marron) à droite */
  function boitierReseau(T, K) {
    const M = K.mat, g = new T.Group();
    const corps = K.mesh(K.boite(130, 92, 110, 5), M.plastique, 0, 46, 0);
    const voyant = K.mesh(K.cylindre(5, 4, 20), K.lumineux(0xff8a2a), 34, 70, 55.5); voyant.rotation.x = Math.PI / 2;
    const bague = K.mesh(K.anneau(7.5, 5, 3, 24), M.plastiqueNoir, 34, 70, 55.5); bague.rotation.x = Math.PI / 2;
    const marque = K.gravure('230 V ~', 6.5, { couleur: '#2b3138' }); marque.position.set(-18, 70, 55.2);
    const dN = douille(T, K, 0x2f6db5), dL = douille(T, K, 0x7a4a2c);
    dN.position.set(-30, 18, 55); dL.position.set(30, 18, 55);
    const lettres = [['N', -30], ['L', 30]].map(([s, x]) => { const m = K.gravure(s, 6, { couleur: '#2b3138' }); m.position.set(x, 32, 55.2); return m; });
    const fN = fiche(T, K, 0x2f6db5), fL = fiche(T, K, 0x7a4a2c);
    fN.position.copy(dN.position); fL.position.copy(dL.position);
    /* le câble d'alimentation part par l'arrière jusqu'au bord de la planche */
    const cable = K.fil([[0, 40, -55], [0, 30, -66], [0, 4.5, -78], [0, 4.5, -112]], 4.5, K.isolant(0x9a9fa5));
    g.add(corps, voyant, bague, marque, dN, dL, ...lettres, fN, fL, cable.mesh);
    return {
      groupe: g, voyant,
      bornes: [new T.Vector3(-30, 18, 76), new T.Vector3(30, 18, 76)],       /* N à gauche, L à droite */
      interne: [[30, 18, 76], [30, 18, 40], [-30, 18, 40], [-30, 18, 76]].reverse()
    };
  }

  /* un interrupteur à bascule sur socle, deux bornes en façade */
  function interrupteur(T, K) {
    const M = K.mat, g = new T.Group();
    const socle = K.mesh(K.boite(62, 24, 46, 4), M.plastiqueBlanc, 0, 12, 0);
    const bascule = new T.Group(); bascule.position.set(0, 24, 0);
    const touche = K.mesh(K.boite(22, 10, 30, 3), M.plastiqueNoir, 0, 3, 0);
    bascule.add(touche);
    const bornes = [-20, 20].map(x => { const b = borneVis(T, K); b.position.set(x, 12, 23); return b; });
    const mI = K.gravure('I', 5, { couleur: '#2b3138' }); mI.rotation.x = -Math.PI / 2; mI.position.set(19, 24.1, 9);
    const mO = K.gravure('O', 5, { couleur: '#2b3138' }); mO.rotation.x = -Math.PI / 2; mO.position.set(19, 24.1, -9);
    g.add(socle, bascule, ...bornes, mI, mO);
    return {
      groupe: g, bascule, touche, bornesObj: bornes,
      bornes: [new T.Vector3(-20, 12, 31), new T.Vector3(20, 12, 31)],
      interne: [[-20, 12, 31], [-20, 12, 14], [-8, 17, 0], [8, 17, 0], [20, 12, 14], [20, 12, 31]],
      fermer(on) { bascule.userData.cible = on ? 0.3 : -0.3; }
    };
  }

  /* l'ampèremètre de laboratoire à aiguille : cadran gradué de 0 à 2 A, « A » et « ⎓ » écrits */
  function amperemetre(T, K) {
    const M = K.mat, g = new T.Group();
    const corps = K.mesh(K.boite(112, 88, 52, 5), M.plastiqueNoir, 0, 44, 0);
    const cad = K.toile(92, 56, 10);
    (() => {
      const { x, w, h } = cad, k = w / 92;
      x.fillStyle = '#f7f4ea'; x.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h * 0.93, R = 38 * k;
      x.strokeStyle = '#1b1d20'; x.lineWidth = 0.6 * k;
      x.beginPath(); x.arc(cx, cy, R, (-90 - 50) * Math.PI / 180, (-90 + 50) * Math.PI / 180); x.stroke();
      for (let i = 0; i <= 20; i++) {
        const a = (-50 + i * 5) * Math.PI / 180, l = (i % 5 === 0 ? 5 : 2.8) * k;
        x.beginPath(); x.moveTo(cx + Math.sin(a) * R, cy - Math.cos(a) * R); x.lineTo(cx + Math.sin(a) * (R + l), cy - Math.cos(a) * (R + l)); x.stroke();
        if (i % 5 === 0) {
          x.fillStyle = '#1b1d20'; x.font = '700 ' + Math.round(4.6 * k) + 'px Calibri, Arial'; x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillText(String(i / 10).replace('.', ','), cx + Math.sin(a) * (R + 9 * k), cy - Math.cos(a) * (R + 9 * k));
        }
      }
      x.font = '800 ' + Math.round(13 * k) + 'px Calibri, Arial'; x.fillText('A', cx, cy - 17 * k);
      x.font = '700 ' + Math.round(6 * k) + 'px ' + POLICE_SYMB; x.fillText('⎓', cx + 24 * k, cy - 6 * k);
      cad.maj();
    })();
    cad.mesh.position.set(0, 56, 26.2);
    const aiguille = new T.Group(); aiguille.position.set(0, 56 - 28 + 3.6, 26.9);
    const tige = K.mesh(new T.BoxGeometry(1.5, 40, 0.6), M.plastiqueNoir, 0, 20, 0);
    const pointeA = K.mesh(new T.BoxGeometry(0.5, 10, 0.4), M.plastiqueRouge, 0, 37, 0.1);
    const axe = K.mesh(K.cylindre(2.4, 1.2, 16), M.plastiqueNoir); axe.rotation.x = Math.PI / 2;
    aiguille.add(tige, pointeA, axe);
    const dP = douille(T, K, 0xc0392b), dM = douille(T, K, 0x26282b);
    dP.position.set(-32, 13, 26); dM.position.set(32, 13, 26);
    const mq = [['+', -32], ['−', 32]].map(([s, xx]) => { const m = K.gravure(s, 6, { couleur: '#f1efe8' }); m.position.set(xx + 12, 13, 26.1); return m; });
    const fP = fiche(T, K, 0xc0392b), fM = fiche(T, K, 0x26282b);
    fP.position.copy(dP.position); fM.position.copy(dM.position);
    g.add(corps, cad.mesh, aiguille, dP, dM, ...mq, fP, fM);
    const pos = K.mobile(0, 70, 9);
    return {
      groupe: g, aiguille, corps,
      bornes: [new T.Vector3(-32, 13, 47), new T.Vector3(32, 13, 47)],      /* + entre à gauche */
      interne: [[-32, 13, 47], [-32, 13, 12], [32, 13, 12], [32, 13, 47]],
      regler(I) { pos.cible = K.clamp(I / 2, 0, 1.05); },
      animer(dt) { const b = pos.pas(dt); aiguille.rotation.z = -(-50 + 100 * pos.x) * Math.PI / 180; return b; }
    };
  }

  /* le rhéostat de laboratoire : un tube de céramique bobiné de fil résistant, un curseur qui
     glisse sur une barre. Le courant n'emprunte que la partie du fil entre la borne A et le curseur. */
  function rheostat(T, K) {
    const M = K.mat, g = new T.Group();
    const L = 236, X0 = -L / 2, Y = 50, R = 21;
    const base = K.mesh(K.boite(274, 8, 72, 3), M.plastiqueSombre, 0, 4, 0);
    const flasques = [-130, 130].map(x => K.mesh(K.boite(14, 96, 62, 3), M.plastiqueSombre, x, 52, 0));
    const tube = K.mesh(K.cylindre(R - 1.2, L + 8, 32), M.ceramique, 0, Y, 0); tube.rotation.z = Math.PI / 2;
    const fil = (() => {
      const c = document.createElement('canvas'); c.width = 8; c.height = 64; const x = c.getContext('2d');
      for (let i = 0; i < 64; i += 4) { const gg = x.createLinearGradient(0, i, 0, i + 4); gg.addColorStop(0, '#4f555c'); gg.addColorStop(0.5, '#e7ebef'); gg.addColorStop(1, '#4f555c'); x.fillStyle = gg; x.fillRect(0, i, 8, 4); }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace;
      return t;
    })();
    const matActif = new T.MeshStandardMaterial({ color: 0xd0d6dc, roughness: 0.35, metalness: 0.8, map: fil.clone(), emissive: 0x000000 });
    const matRepos = new T.MeshStandardMaterial({ color: 0xd0d6dc, roughness: 0.35, metalness: 0.8, map: fil.clone() });
    [matActif, matRepos].forEach(m => { m.map.needsUpdate = true; m.map.wrapS = m.map.wrapT = T.RepeatWrapping; });
    const geoBob = new T.CylinderGeometry(R, R, 1, 40, 1, true); geoBob.rotateZ(Math.PI / 2); geoBob.translate(0.5, 0, 0);
    const actif = new T.Mesh(geoBob, matActif), repos = new T.Mesh(geoBob, matRepos);
    actif.position.set(X0, Y, 0); repos.position.y = Y;
    const barre = K.mesh(new T.BoxGeometry(L + 24, 8, 8), M.acier, 0, Y + R + 17, 0);
    const curseur = new T.Group();
    const bloc = K.mesh(K.boite(22, 18, 22, 3), M.plastiqueNoir, 0, Y + R + 17, 0);
    const lame = K.mesh(new T.BoxGeometry(6, 14, 3), M.laiton, 0, Y + R + 3, 0);
    curseur.add(bloc, lame);
    const bA = borneVis(T, K); bA.position.set(-130, 22, 31);
    const bC = borneVis(T, K); bC.position.set(130, 22, 31);
    const feuillard = K.mesh(new T.BoxGeometry(5, Y + R + 17 - 22, 1.2), M.cuivre, 130, (Y + R + 17 + 22) / 2, 31.5);
    g.add(base, ...flasques, tube, actif, repos, barre, curseur, bA, bC, feuillard);
    let xc = 0;
    const placer = r => {          /* r de 0 (curseur à gauche) à 1 (curseur à droite) */
      xc = X0 + 6 + r * (L - 12);
      const la = xc - X0, lr = L - la;
      actif.scale.x = la; repos.position.x = xc; repos.scale.x = lr;
      matActif.map.repeat.set(1, la / 1.6); matRepos.map.repeat.set(1, lr / 1.6);
      curseur.position.x = xc;
    };
    placer(0.2);
    return {
      groupe: g, curseur, actif, repos, tube, matActif, barre,
      bornes: [new T.Vector3(-130, 22, 39), new T.Vector3(130, 22, 39)],
      placer,
      /* le trajet : borne A → le fil bobiné jusqu'au curseur → la barre → borne C */
      interne: () => {
        const p = [[-130, 22, 39], [-130, 22, 26], [-124, Y, R + 1]];
        const n = Math.max(2, Math.round((xc - X0) / 4.5));
        for (let i = 0; i <= n; i++) { const xx = X0 + (xc - X0) * i / n, a = i * 0.9; p.push([xx, Y + Math.sin(a) * (R + 1.5), Math.cos(a) * (R + 1.5)]); }
        p.push([xc, Y + R + 3, 0], [xc, Y + R + 17, 6], [124, Y + R + 17, 6], [130, Y + R + 17, 31.5], [130, 30, 33], [130, 22, 39]);
        return p;
      }
    };
  }

  /* le radiateur : deux résistances chauffantes derrière une grille, un réflecteur */
  function radiateur(T, K) {
    const M = K.mat, g = new T.Group();
    const W = 220, H = 150;
    const dos = K.mesh(K.boite(W, H, 8, 3), M.plastiqueBlanc, 0, H / 2 + 14, -26);
    const reflecteur = K.mesh(new T.BoxGeometry(W - 24, H - 24, 1), M.aluminium, 0, H / 2 + 14, -21.5);
    const joues = [-W / 2 + 5, W / 2 - 5].map(x => K.mesh(K.boite(10, H, 60, 3), M.plastiqueBlanc, x, H / 2 + 14, 0));
    const dessus = K.mesh(K.boite(W, 10, 60, 3), M.plastiqueBlanc, 0, H + 9, 0);
    const dessous = K.mesh(K.boite(W, 10, 60, 3), M.plastiqueBlanc, 0, 19, 0);
    const pieds = [-80, 80].map(x => K.mesh(K.boite(20, 14, 70, 3), M.plastiqueSombre, x, 7, 0));
    const matChaud = K.propre(M.acierSombre);
    const tubes = [60, 110].map(y => { const t = K.mesh(K.cylindre(5.5, W - 22, 24), matChaud, 0, y + 14, 0); t.rotation.z = Math.PI / 2; return t; });
    const supports = [];
    [-60, 0, 60].forEach(x => supports.push(K.mesh(new T.BoxGeometry(3, H - 30, 2), M.ceramique, x, H / 2 + 14, -12)));
    const grille = new T.Group();
    for (let i = 0; i < 9; i++) { const r = K.mesh(K.cylindre(1.1, W - 22, 8), M.acier, 0, 30 + i * 15.5, 26); r.rotation.z = Math.PI / 2; grille.add(r); }
    const bornes = [-92, -70].map(x => { const b = borneVis(T, K); b.position.set(x, 19, 30); return b; });
    g.add(dos, reflecteur, ...joues, dessus, dessous, ...pieds, ...tubes, ...supports, grille, ...bornes);
    const y1 = 74, y2 = 124;
    return {
      groupe: g, tubes, grille, coque: [dos, ...joues, dessus, dessous], matChaud, bornesObj: bornes,
      bornes: [new T.Vector3(-92, 19, 38), new T.Vector3(-70, 19, 38)],
      interne: [[-92, 19, 38], [-92, 19, 22], [-100, 40, 9], [-100, y1, 7.5], [100, y1, 7.5], [100, y2, 7.5], [-96, y2, 7.5], [-84, 60, 9], [-70, 19, 22], [-70, 19, 38]],
      chauffer(n) { K.chaleur(matChaud, n); }
    };
  }

  /* le compteur d'énergie électromécanique : un disque qui tourne d'autant plus vite que la
     puissance est grande, un totalisateur à rouleaux qui ne redescend jamais */
  function compteur(T, K) {
    const M = K.mat, g = new T.Group();
    const socle = K.mesh(K.boite(118, 172, 16, 4), M.plastiqueNoir, 0, 86, -27);
    const platine = K.mesh(K.boite(100, 116, 4, 2), M.plastiqueBlanc, 0, 108, -10);
    const capot = K.mesh(K.boite(108, 124, 50, 8), M.transparent, 0, 108, 0);
    const cache = K.mesh(K.boite(116, 42, 46, 4), M.plastiqueNoir, 0, 24, 2);
    const disque = new T.Group(); disque.position.set(0, 84, 2);
    const plateau = K.mesh(K.cylindre(34, 1.4, 40), M.aluminium); disque.add(plateau);
    const repere = K.mesh(new T.BoxGeometry(10, 1.6, 4), M.plastiqueRouge, 0, 0, 31); disque.add(repere);
    const axeD = K.mesh(K.cylindre(1.2, 30, 8), M.acier, 0, 84, 2);
    const aimant = K.mesh(K.boite(20, 14, 14, 2), M.acierSombre, 0, 70, 12);
    const tot = K.toile(62, 14, 12);
    tot.mesh.position.set(0, 128, -7.6);
    const ecrire = v => {
      const { x, w, h } = tot; const k = w / 62;
      x.fillStyle = '#16181b'; x.fillRect(0, 0, w, h);
      const ent = Math.floor(v), dec = v - ent;
      const chiffres = String(ent).padStart(6, '0').split('');
      for (let i = 0; i < 7; i++) {
        const bx = (2 + i * 8.4) * k;
        x.fillStyle = i === 6 ? '#b8231a' : '#f2efe6'; x.fillRect(bx, 1.5 * k, 7.4 * k, 11 * k);
        x.fillStyle = i === 6 ? '#ffffff' : '#16181b'; x.font = '700 ' + Math.round(9 * k) + 'px Consolas, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
        if (i < 6) x.fillText(chiffres[i], bx + 3.7 * k, 7.4 * k);
        else {
          /* le rouleau des dixièmes tourne : on voit passer le chiffre suivant */
          const d10 = dec * 10, c0 = Math.floor(d10) % 10, f = d10 - Math.floor(d10);
          x.save(); x.beginPath(); x.rect(bx, 1.5 * k, 7.4 * k, 11 * k); x.clip();
          x.fillText(String(c0), bx + 3.7 * k, (7.4 - f * 11) * k); x.fillText(String((c0 + 1) % 10), bx + 3.7 * k, (18.4 - f * 11) * k);
          x.restore();
        }
      }
      tot.maj();
    };
    const kwh = K.gravure('kWh', 4, { couleur: '#2b3138' }); kwh.position.set(0, 146, -7.7);
    const plaque = K.gravure('230 V   50 Hz', 3.2, { couleur: '#2b3138' }); plaque.position.set(0, 112, -7.7);
    const bornesObj = [-13, 13].map(x => { const b = borneVis(T, K); b.position.set(x, 14, 25); return b; });
    /* l'arrivée du distributeur entre sous le cache-bornes, par l'arrière */
    const arrivee = K.fil([[-30, 6, 4], [-52, 4.5, 6], [-70, 4.5, -8], [-72, 4.5, -44], [-72, 4.5, -108]], 4.5, K.isolant(0x9a9fa5));
    g.add(socle, platine, capot, cache, disque, axeD, aimant, tot.mesh, kwh, plaque, ...bornesObj, arrivee.mesh);
    return {
      groupe: g, disque, ecrire, capot, socle, cache, bornesObj, totalisateur: tot.mesh,
      arrivee: arrivee.mesh,
      /* les départs vers l'installation : neutre à gauche, phase à droite */
      bornes: [new T.Vector3(-13, 14, 33), new T.Vector3(13, 14, 33)],
      interne: [[-13, 14, 33], [-13, 14, 12], [13, 14, 12], [13, 14, 33]]
    };
  }

  /* un petit oscilloscope : l'écran trace ce qu'on lui donne */
  function oscillo(T, K) {
    const M = K.mat, g = new T.Group();
    const corps = K.mesh(K.boite(160, 104, 110, 6), M.plastique, 0, 52, 0);
    const facade = K.mesh(K.boite(152, 96, 3, 2), M.plastiqueSombre, 0, 52, 55);
    const ec = K.toile(92, 64, 8);
    ec.mesh.position.set(-25, 56, 56.8);
    const boutons = [[45, 80], [45, 56], [45, 32], [66, 80], [66, 56]].map(([x, y]) => { const c = K.mesh(K.cylindre(6, 8, 20), M.plastiqueNoir, x, y, 60); c.rotation.x = Math.PI / 2; return c; });
    const bnc = [-68, -46].map(x => { const c = K.mesh(K.cylindre(4, 8, 16), M.zingue, x, 14, 60); c.rotation.x = Math.PI / 2; return c; });
    g.add(corps, facade, ec.mesh, ...boutons, ...bnc);
    const tracer = (f) => {          /* f(u 0..1) → -1..1, ou null */
      const { x, w, h } = ec;
      x.fillStyle = '#0d1f17'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(120,200,160,.25)'; x.lineWidth = 1;
      for (let i = 1; i < 10; i++) { x.beginPath(); x.moveTo(i * w / 10, 0); x.lineTo(i * w / 10, h); x.stroke(); }
      for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(0, i * h / 8); x.lineTo(w, i * h / 8); x.stroke(); }
      x.strokeStyle = 'rgba(160,230,190,.55)'; x.beginPath(); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke();
      if (f) {
        x.strokeStyle = '#ffd23a'; x.lineWidth = 3.2; x.beginPath();
        for (let i = 0; i <= 200; i++) { const u = i / 200, y = h / 2 - f(u) * h * 0.36; if (i) x.lineTo(u * w, y); else x.moveTo(u * w, y); }
        x.stroke();
      }
      ec.maj();
    };
    tracer(null);
    return { groupe: g, tracer, ecran: ec.mesh, sorties: [new T.Vector3(-68, 14, 64), new T.Vector3(-46, 14, 64)] };
  }

  /* ------------------------------------------------------------------ le multimètre (brique)
     Debout, penché en arrière sur sa béquille. Coque caoutchouc jaune, façade sombre, afficheur
     en haut, sélecteur rotatif au milieu, trois douilles en bas : A · COM · VΩ.
     Dedans : la carte, le fusible de la borne A, la pile 9 V, le balai du sélecteur. */
  const POSITIONS = [['OFF', -112], ['V~', -66], ['V⎓', -24], ['Ω', 20], ['A~', 64], ['A⎓', 108]];
  const DOUILLES = { A: -24, COM: 0, VO: 24 };
  function multimetreBloc(T, K) {
    const M = K.mat, g = new T.Group();
    const corps = new T.Group(); g.add(corps);
    const jaune = K.plastique(0xf2c230, 0.62);
    const etui = K.mesh(K.boite(88, 182, 44, 11), jaune, 0, 91, 0);
    const facade = K.mesh(K.boite(74, 166, 6, 6), M.plastiqueSombre, 0, 91, 20);
    const cadreLcd = K.mesh(K.boite(66, 36, 2, 2.5), M.plastiqueNoir, 0, 146, 23.4);
    const ecran = lcd(K, 60, 29, {}); ecran.mesh.position.set(0, 146, 24.6);
    const SY = 90;
    const couronne = K.mesh(K.cylindre(23, 1.6, 40), M.plastiqueNoir, 0, SY, 23.6); couronne.rotation.x = Math.PI / 2;
    const bouton = new T.Group(); bouton.position.set(0, SY, 24.4);
    const disque = K.mesh(K.cylindre(18.5, 7, 36), K.plastique(0x30353c, 0.5)); disque.rotation.x = Math.PI / 2; disque.position.z = 3.5;
    const ailette = K.mesh(K.boite(9, 36, 7, 2.5), M.plastiqueNoir, 0, 0, 9);
    const index = K.mesh(K.boite(2.4, 11, 0.8, 0.3), M.plastiqueBlanc, 0, 11, 12.7);
    const balai = K.mesh(new T.BoxGeometry(3, 20, 0.8), M.cuivre, 0, 9, -18.4);
    bouton.add(disque, ailette, index, balai);
    const marques = new T.Group();
    POSITIONS.forEach(([s, a]) => {
      const r = a * Math.PI / 180, R = 29;
      const m = K.gravure(s, 4.2, { couleur: s === 'OFF' ? '#f1efe8' : s[0] === 'A' ? '#ffd23a' : '#f1efe8' });
      m.position.set(Math.sin(r) * R, SY + Math.cos(r) * R, 23.3); marques.add(m);
    });
    const douilles = {}, etiquettes = new T.Group();
    Object.entries(DOUILLES).forEach(([nom, x]) => {
      const d = douille(T, K, nom === 'COM' ? 0x26282b : 0xc0392b); d.position.set(x, 30, 23); douilles[nom] = d;
      const m = K.gravure(nom === 'VO' ? 'VΩ' : nom, 3.6, { couleur: '#f1efe8' }); m.position.set(x, 41, 23.2); etiquettes.add(m);
    });
    const cat = K.gravure('CAT III 600 V', 3, { couleur: '#f1efe8' }); cat.position.set(0, 16, 23.2);
    const maxA = K.gravure('10 A MAX', 2.6, { couleur: '#ffd23a' }); maxA.position.set(-24, 21, 23.2);
    etiquettes.add(cat, maxA);
    /* dedans */
    const carte = K.mesh(K.boite(70, 160, 1.6, 0.6), M.plastiqueVert, 0, 91, 6);
    const fusible = new T.Group(); fusible.position.set(-26, 62, 10);
    const fCorps = K.mesh(K.cylindre(3.4, 24, 18), K.propre(M.ceramique)); fusible.add(fCorps);
    [-13, 13].forEach(y => fusible.add(K.mesh(K.cylindre(3.7, 4, 18), M.acier, 0, y, 0)));
    const piste = K.fil([[-24, 30, 10], [-26, 40, 9], [-26, 49, 10]], 0.9, M.cuivre);
    const pile = K.mesh(K.boite(26, 46, 16, 2), K.plastique(0x2a2d31, 0.5), 16, 40, -10);
    const pileBande = K.mesh(K.boite(26.4, 10, 16.4, 1), M.plastiqueOrange, 16, 56, -10);
    corps.add(etui, facade, cadreLcd, ecran.mesh, couronne, bouton, marques, ...Object.values(douilles), etiquettes, carte, fusible, piste.mesh, pile, pileBande);
    /* la béquille, qui tient l'appareil penché */
    const pivot = new T.Group(); pivot.position.set(0, 80, -22); pivot.rotation.x = 0.64;
    const bequille = K.mesh(K.boite(56, 80, 4, 2), jaune, 0, -40, -2); pivot.add(bequille);
    corps.add(pivot);
    g.rotation.order = 'YXZ'; g.rotation.x = -0.32; g.position.y = 7;
    const angle = K.mobile(-112 * Math.PI / 180, 160, 18);
    bouton.rotation.z = -angle.x;
    const fCeram = fCorps.material;
    return {
      groupe: g, corps, etui, facade, ecran, bouton, carte, fusible, pile: [pile, pileBande], bequille, douilles, marques, etiquettes, cadreLcd, couronne, piste: piste.mesh,
      tourner(nom) { const p = POSITIONS.find(q => q[0] === nom); if (p) angle.cible = p[1] * Math.PI / 180; },
      grille(n) { fCeram.color.setHex(n ? 0x1d1a18 : 0xf3efe6); },
      /* où arrive le cordon d'une douille (bout de la fiche), en coordonnées de la racine */
      sortie(nom) { const d = DOUILLES[nom]; return g.localToWorld(new T.Vector3(d, 30, 44)); },
      axe(nom) { const d = DOUILLES[nom]; return g.localToWorld(new T.Vector3(d, 30, 64)); },
      animer(dt) { const b = angle.pas(dt); bouton.rotation.z = -angle.x; return b; }
    };
  }

  /* un cordon et sa pointe : la pointe posée sur une cible, le manche relevé vers l'appareil */
  function cordonEtPointe(T, K, racine, coul, nomIsolant) {
    const s = sonde(T, K, coul); racine.add(s.groupe);
    const fichePlug = fiche(T, K, coul); racine.add(fichePlug);
    let cordon = null;
    const poser = (sortie, axe, cible, versHaut) => {
      const dir = new T.Vector3().subVectors(sortie, cible); dir.y = 0; dir.normalize();
      const up = versHaut || new T.Vector3(dir.x * 0.75, 1, dir.z * 0.75).normalize();
      s.groupe.position.copy(cible);
      s.groupe.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), up);
      s.groupe.updateMatrixWorld(true);
      const arr = s.groupe.localToWorld(s.arriere.clone());
      const sortieDir = new T.Vector3().subVectors(axe, sortie).normalize();
      const a1 = sortie.clone().addScaledVector(sortieDir, 18);
      const bas = a1.clone().lerp(arr, 0.5); bas.y = Math.max(3, Math.min(a1.y, arr.y) - 40);
      const a3 = arr.clone().addScaledVector(up, 22);
      if (cordon) { racine.remove(cordon.mesh); cordon.mesh.geometry.dispose(); }
      cordon = K.fil([sortie, a1, bas, a3, arr], 1.9, nomIsolant);
      racine.add(cordon.mesh);
      return cordon;
    };
    return { sonde: s, fiche: fichePlug, poser, objets: () => [s.groupe, cordon && cordon.mesh, fichePlug].filter(Boolean) };
  }
  /* la fiche suit la douille de l'appareil penché */
  const enficher = (T, mm, f, nom) => {
    const d = DOUILLES[nom];
    mm.groupe.updateMatrixWorld(true);
    f.position.copy(mm.groupe.localToWorld(new T.Vector3(d, 30, 23)));
    f.quaternion.copy(mm.groupe.quaternion);
  };

  /* ================================================================== 1. le banc : circuit
     Un seul banc, six expériences (ctx.options.experience) :
       courant (1.1) · tension (1.2) · ohm (1.3, défaut) · puissance (1.4) · alternatif (1.5) · monophase (2.2) */
  Electro3D.definir('circuit', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const opt = ctx.options || {};
    const XP = ['courant', 'tension', 'ohm', 'puissance', 'alternatif', 'monophase'];
    const xp = XP.includes(opt.experience) ? opt.experience : 'ohm';
    const at = (o, x, y, z) => { o.position.set(x, y, z); racine.add(o); return o; };
    const W = (g, p) => { const v = p.isVector3 ? p.clone() : new T.Vector3(p[0], p[1], p[2]); return v.add(g.position); };
    const WL = (g, l) => l.map(p => W(g, p));
    const A = v => [v.x, v.y, v.z];

    /* ---------------------------------------------------------------- la planche */
    const planche = K.mesh(K.boite(600, 12, 340, 3), K.plastique(0xd9c8a4, 0.78), 0, -6, 0);
    racine.add(planche);

    /* ---------------------------------------------------------------- la source */
    const avecLabo = xp === 'courant' || xp === 'tension' || xp === 'ohm' || xp === 'alternatif';
    const avecReseau = xp === 'alternatif' || xp === 'monophase';
    const labo = avecLabo ? alimLabo(T, K) : null;
    const reseau = avecReseau ? boitierReseau(T, K) : null;
    const cpt = xp === 'puissance' ? compteur(T, K) : null;
    if (labo) at(labo.groupe, -185, 0, -62);
    if (reseau) at(reseau.groupe, -185, 0, -51);
    if (cpt) at(cpt.groupe, -185, 0, -60);
    /* les deux bornes de la source : gauche (− ou N), droite (+ ou L) — identiques pour les deux */
    const srcG = labo ? W(labo.groupe, labo.bornes[0]) : reseau ? W(reseau.groupe, reseau.bornes[0]) : W(cpt.groupe, cpt.bornes[0]);
    const srcD = labo ? W(labo.groupe, labo.bornes[1]) : reseau ? W(reseau.groupe, reseau.bornes[1]) : W(cpt.groupe, cpt.bornes[1]);
    const srcInterne = labo ? WL(labo.groupe, labo.interne) : reseau ? WL(reseau.groupe, reseau.interne) : WL(cpt.groupe, cpt.interne);

    /* ---------------------------------------------------------------- l'interrupteur */
    const inter = interrupteur(T, K);
    at(inter.groupe, xp === 'puissance' ? -45 : -45, 0, 72);
    const iE = W(inter.groupe, inter.bornes[0]), iS = W(inter.groupe, inter.bornes[1]);

    /* ---------------------------------------------------------------- les charges, les instruments */
    let lampes = [], lampeFaible = null, rheo = null, radia = null, ampe = null, osc = null, mm = null;
    if (xp === 'courant') {
      lampeFaible = lampe(T, K, 0.78); at(lampeFaible.groupe, 175, 0, 0);
      lampes = [lampe(T, K, 1.12)]; at(lampes[0].groupe, 175, 0, 0);
      ampe = amperemetre(T, K); at(ampe.groupe, 55, 0, 70);
    } else if (xp === 'tension') {
      lampes = [lampe(T, K, 1), lampe(T, K, 1)];
      at(lampes[0].groupe, 105, 0, 0); at(lampes[1].groupe, 205, 0, 0);
    } else if (xp === 'ohm') {
      rheo = rheostat(T, K); at(rheo.groupe, 125, 0, -30);
    } else if (xp === 'puissance') {
      radia = radiateur(T, K); at(radia.groupe, 165, 0, -35);
    } else {
      lampes = [lampe(T, K, 1)]; at(lampes[0].groupe, 175, 0, 0);
    }
    if (xp === 'alternatif') { osc = oscillo(T, K); at(osc.groupe, 45, 0, -95); }

    /* ---------------------------------------------------------------- la boucle */
    const DC = avecLabo && xp !== 'monophase';
    const matAller = K.isolant(DC ? 'rouge' : 'L1', 200), matRetour = K.isolant(DC ? 'noir' : 'N', 200);
    const matAllerAC = K.isolant('L1', 200), matRetourAC = K.isolant('N', 200);
    const matAllerDC = matAller, matRetourDC = matRetour;
    const retourDerriere = [[262, 52], [262, -162], [-282, -162], [-282, 50]];
    const et = [{ pts: srcInterne }];
    const allers = [], retours = [];
    const fil = (de, a, via, mat, liste) => { const e = { fil: tirer(A(de), A(a), via), mat }; et.push(e); liste.push(e); return e; };
    fil(srcD, iE, xp === 'puissance' ? [] : [], matAller, allers);
    et.push({ pts: WL(inter.groupe, inter.interne) });
    if (xp === 'courant') {
      const aE = W(ampe.groupe, ampe.bornes[0]), aS = W(ampe.groupe, ampe.bornes[1]);
      fil(iS, aE, [], matAller, allers);
      et.push({ pts: WL(ampe.groupe, ampe.interne) });
      const l = lampes[0];
      fil(aS, W(l.groupe, l.bornes[0]), [[128, 112]], matAller, allers);
      et.push({ pts: WL(l.groupe, l.interne) });
      fil(W(l.groupe, l.bornes[1]), srcG, retourDerriere, matRetour, retours);
    } else if (xp === 'tension') {
      const [l1, l2] = lampes;
      fil(iS, W(l1.groupe, l1.bornes[0]), [], matAller, allers);
      et.push({ pts: WL(l1.groupe, l1.interne) });
      fil(W(l1.groupe, l1.bornes[1]), W(l2.groupe, l2.bornes[0]), [], matAller, allers);
      et.push({ pts: WL(l2.groupe, l2.interne) });
      fil(W(l2.groupe, l2.bornes[1]), srcG, [[250, 54], [288, 30], [288, -162], [-282, -162], [-282, 50]], matRetour, retours);
    } else if (xp === 'ohm') {
      fil(iS, W(rheo.groupe, rheo.bornes[0]), [[8, 112]], matAller, allers);
      et.push({ fn: () => WL(rheo.groupe, rheo.interne()) });
      fil(W(rheo.groupe, rheo.bornes[1]), srcG, [[276, 30], [276, -162], [-282, -162], [-282, 50]], matRetour, retours);
    } else if (xp === 'puissance') {
      fil(iS, W(radia.groupe, radia.bornes[1]), [], matAller, allers);
      et.push({ pts: WL(radia.groupe, radia.interne).reverse() });
      fil(W(radia.groupe, radia.bornes[0]), srcG, [[30, 21], [30, -162], [-288, -162], [-288, 12]], matRetour, retours);
    } else {
      const l = lampes[0];
      fil(iS, W(l.groupe, l.bornes[0]), [], matAller, allers);
      et.push({ pts: WL(l.groupe, l.interne) });
      fil(W(l.groupe, l.bornes[1]), srcG, retourDerriere, matRetour, retours);
    }
    const B = boucle(T, K, racine, et, { rayon: 2.2, grain: 2.45, pas: 12, vitesse: 40 });
    const filsAller = allers.map(e => e.f.mesh), filsRetour = retours.map(e => e.f.mesh);

    /* ---------------------------------------------------------------- le voltmètre de 1.2 */
    let pointeR = null, pointeN = null, ciblesN = null, cibleR = null;
    if (xp === 'tension') {
      mm = multimetreBloc(T, K); at(mm.groupe, 252, 7, 136);
      mm.groupe.rotation.y = -0.62;
      mm.tourner('V⎓');
      pointeR = cordonEtPointe(T, K, racine, 0xc0392b, 'rouge');
      pointeN = cordonEtPointe(T, K, racine, 0x26282b, 'noir');
      mm.groupe.updateMatrixWorld(true);
      enficher(T, mm, pointeR.fiche, 'VO'); enficher(T, mm, pointeN.fiche, 'COM');
      const [l1, l2] = lampes;
      cibleR = W(l1.groupe, [-18, 13.4, 30]);
      const surFil = allers[1].f.courbe.getPointAt(0.8).clone(); surFil.y += 2.1;
      ciblesN = { normal: W(l1.groupe, [18, 13.4, 30]), fort: W(l2.groupe, [18, 13.4, 30]), egal: surFil };
      pointeR.poser(mm.sortie('VO'), mm.axe('VO'), cibleR);
    }

    /* ---------------------------------------------------------------- l'oscilloscope de 1.5 */
    const sondesOsc = [];
    if (osc) {
      const l = lampes[0];
      [0, 1].forEach(i => {
        const de = W(osc.groupe, osc.sorties[i]), b = W(l.groupe, l.bornes[i]);
        const c = K.fil([de, [de.x, 3, de.z + 16], [b.x - 6 + i * 12, 3, b.z - 44], [b.x - 8 + i * 16, 10, b.z - 18], [b.x + (i ? 6 : -6), 14, b.z - 10]], 1.3, K.isolant(0x2a2d31));
        const pince = K.mesh(K.cylindre(2.6, 12, 12), M.plastiqueNoir, b.x + (i ? 6 : -6), 14, b.z - 10); pince.rotation.x = Math.PI / 2;
        racine.add(c.mesh, pince); sondesOsc.push(c.mesh, pince);
      });
    }

    /* ---------------------------------------------------------------- l'état */
    const s = { ferme: true, debit: 'faible', niveau: 'normal', U: 230, R: 100, P: 2000, h: 0.25, type: 'continu' };
    let tOsc = 0, indexAff = 41372.0, indexCible = 41372.0, angleDisque = 0, vDisque = 0;
    const INDEX0 = 41372.0;
    const motChaleur = P => P > 2000 ? 'brûlant' : P > 800 ? 'chaud' : P > 200 ? 'tiède' : 'froid';
    const fmtH = v => v < 1 ? Math.round(v * 60) + ' min' : nb(v, v % 1 ? 2 : 0).replace(/,?0+$/, '') + ' h';
    const fmtI = I => nb(I, I < 10 ? 2 : 1);

    const maj = () => {
      const ouvert = !s.ferme;
      inter.fermer(s.ferme);
      let I = 0, debit = 0, vitesse = 40, alt = false, eclat = 0, phrase = '', mes = [];
      if (xp === 'courant') {
        const fort = s.debit === 'fort';
        I = ouvert ? 0 : fort ? 1.75 : 0.42;
        debit = ouvert ? 0 : fort ? 1 : 0.38; vitesse = fort ? 62 : 24;
        lampes[0].groupe.visible = fort; lampeFaible.groupe.visible = !fort;
        (fort ? lampes[0] : lampeFaible).regler(ouvert ? 0 : fort ? 1.15 : 0.55);
        ampe.regler(I);
        labo.ecU.ecrire('12.0', 'V'); labo.ecI.ecrire(I.toFixed(2), 'A');
        phrase = ouvert ? '<strong>Interrupteur ouvert.</strong> La boucle est coupée : aucune charge ne bouge, nulle part. L’aiguille reste sur zéro.'
          : fort ? '<strong>Beaucoup de charges passent : l’intensité est forte.</strong> Avec une lampe plus puissante, les grains sont plus serrés et plus rapides. L’ampèremètre, branché en série, en compte 1,75 A.'
            : '<strong>Peu de charges passent : l’intensité est faible.</strong> Peu de grains franchissent chaque point du fil par seconde. L’ampèremètre, branché en série, compte 0,42 A.';
        mes = [{ libelle: 'Tension de la source', valeur: '12 V' }, { libelle: 'Intensité', valeur: nb(I, 2) + ' A' }, { libelle: 'Lampe', valeur: fort ? '21 W' : '5 W' }];
      } else if (xp === 'tension') {
        I = ouvert ? 0 : 1.2; debit = ouvert ? 0 : 0.7; vitesse = 40;
        lampes.forEach(l => l.regler(ouvert ? 0 : 0.62));
        labo.ecU.ecrire('12.0', 'V'); labo.ecI.ecrire(I.toFixed(2), 'A');
        const u = { normal: 6.0, fort: 12.0, egal: 0 }[s.niveau];
        mm.ecran.ecrire(u === 0 ? '0.00' : u.toFixed(2), 'V⎓');
        pointeN.poser(mm.sortie('COM'), mm.axe('COM'), ciblesN[s.niveau]);
        phrase = {
          normal: '<strong>Deux points à des niveaux différents.</strong> La pointe rouge est avant la première lampe, la noire juste après : entre les deux, il y a un écart de 6 V. C’est cet écart qu’on appelle la tension.',
          fort: '<strong>Écart plus grand.</strong> La pointe noire est passée après la deuxième lampe : les deux points sont plus éloignés en niveau, la tension monte à 12 V. Rien d’autre n’a changé.',
          egal: '<strong>Même niveau : aucune tension.</strong> Les deux pointes sont sur le même fil. Le fil est pourtant alimenté — mais entre deux points au même potentiel, l’écart est nul : 0 V.'
        }[s.niveau];
        mes = [{ libelle: 'Entre les deux pointes', valeur: nb(u, 1) + ' V' }, { libelle: 'Source', valeur: '12 V' }];
      } else if (xp === 'ohm') {
        I = s.U / s.R; const P = s.U * I;
        const k = K.clamp(Math.log10(Math.max(I, 0.01)) / 2 + 0.5, 0.1, 1);
        debit = ouvert ? 0 : k; vitesse = 14 + 66 * k;
        rheo.placer((s.R - 5) / 495);
        B.refaire();
        K.chaleur(rheo.matActif, ouvert ? 0 : K.clamp(Math.sqrt(P / 2000) * 1.05, 0, 1.5));
        labo.ecU.ecrire(String(s.U), 'V'); labo.ecI.ecrire(ouvert ? '0.00' : (I < 10 ? I.toFixed(2) : I.toFixed(1)), 'A');
        phrase = '<strong>La tension pousse, la résistance freine.</strong> ' + s.U + ' V poussent à travers ' + s.R + ' Ω : il passe ' + fmtI(I) + ' A. Le fil résistant est <strong>' + motChaleur(P) + '</strong> (' + Math.round(P) + ' W dissipés). <em>' + s.U + ' = ' + s.R + ' × ' + fmtI(I) + '</em>';
        mes = [{ libelle: 'Tension U', valeur: s.U + ' V' }, { libelle: 'Résistance R', valeur: s.R + ' Ω' }, { libelle: 'Courant I = U ÷ R', valeur: fmtI(I) + ' A' }];
      } else if (xp === 'puissance') {
        I = s.P / 230; alt = true;
        debit = ouvert ? 0 : K.clamp(0.22 + I / 15 * 0.78, 0, 1); vitesse = 30 + I * 3;
        radia.chauffer(ouvert ? 0 : K.clamp(0.08 + s.P / 2000 * 0.95, 0, 1.5));
        vDisque = ouvert ? 0 : s.P / 2000 * 1.4;
        const E = s.P * s.h / 1000;
        indexCible = INDEX0 + (ouvert ? 0 : E);
        phrase = '<strong>La puissance coule, l’énergie s’accumule.</strong> L’appareil demande ' + s.P + ' W : le disque du compteur tourne ' + (s.P >= 1500 ? 'vite' : s.P >= 500 ? 'tranquillement' : 'lentement') + '. Pendant ' + fmtH(s.h) + ', les rouleaux avancent de ' + nb(E, E < 10 ? 2 : 1) + ' kWh : c’est ce que compte le compteur.';
        mes = [{ libelle: 'Puissance', valeur: s.P + ' W' }, { libelle: 'Durée', valeur: fmtH(s.h) }, { libelle: 'Énergie', valeur: nb(E, E < 10 ? 2 : 1) + ' kWh' }];
      } else if (xp === 'alternatif') {
        const ac = s.type === 'alternatif';
        labo.groupe.visible = !ac; reseau.groupe.visible = ac;
        allers.forEach(e => { e.f.mesh.material = ac ? matAllerAC : matAllerDC; });
        retours.forEach(e => { e.f.mesh.material = ac ? matRetourAC : matRetourDC; });
        I = ac ? 0.26 : 1.75; alt = ac; debit = ouvert ? 0 : 0.55; vitesse = ac ? 48 : 40;
        lampes[0].regler(ouvert ? 0 : 1);
        labo.ecU.ecrire('12.0', 'V'); labo.ecI.ecrire('1.75', 'A');
        phrase = ac ? '<strong>Alternatif — il change de sens sans arrêt.</strong> Sur le réseau, les grains vont et viennent : il n’y a ni plus ni moins, mais une phase (marron) et un neutre (bleu). L’écran trace une vague. <em>En vrai, 50 allers-retours par seconde : ici, ralenti environ 70 fois.</em>'
          : '<strong>Continu — il garde toujours le même sens.</strong> L’alimentation a un + (rouge) et un − (noir) : les grains avancent toujours dans le même sens. L’écran trace une ligne droite.';
        mes = [{ libelle: 'Source', valeur: ac ? '230 V ~ (réseau)' : '12 V ⎓ (alimentation)' }, { libelle: 'Sens du courant', valeur: ac ? 'change 100 fois par seconde' : 'toujours le même' }];
      } else {
        I = ouvert ? 0 : 0.26; alt = true; debit = ouvert ? 0 : 0.5; vitesse = 48;
        lampes[0].regler(ouvert ? 0 : 1);
        phrase = ouvert ? '<strong>Interrupteur ouvert.</strong> La phase arrive jusqu’à l’interrupteur, mais la boucle est coupée : rien ne circule, la lampe est éteinte.'
          : '<strong>Une phase, un neutre, une boucle.</strong> Le courant part du réseau par la phase (marron), traverse la lampe et revient par le neutre (bleu). Cinquante fois par seconde, il fait l’inverse : les grains vont et viennent <em>(ralenti environ 70 fois)</em>.';
        mes = [{ libelle: 'Entre phase et neutre', valeur: '230 V' }, { libelle: 'Courant dans la boucle', valeur: ouvert ? '0 A' : '0,26 A' }];
      }
      if (xp === 'alternatif' || xp === 'puissance' || xp === 'monophase') alt = xp === 'alternatif' ? s.type === 'alternatif' : true;
      B.regler({ debit, vitesse, alternatif: alt, frequence: 0.7 });
      ctx.mesures(mes);
      return phrase;
    };

    const agir = (id, v) => {
      if (id === 'inter') { s.ferme = v !== 'ouvert'; ctx.regler('inter', s.ferme ? 'ferme' : 'ouvert'); }
      else if (id === 'debit') s.debit = v;
      else if (id === 'niveau') s.niveau = v;
      else if (id === 'ohmU') { s.U = +v; ctx.regler('ohmU', s.U); }
      else if (id === 'ohmR') { s.R = +v; ctx.regler('ohmR', s.R); }
      else if (id === 'pP') { s.P = +v; ctx.regler('pP', s.P); }
      else if (id === 'pH') { s.h = +v; ctx.regler('pH', s.h); }
      else if (id === 'type') s.type = v;
      else return;
      if (id !== 'inter' && id !== 'ohmU' && id !== 'ohmR' && id !== 'pP' && id !== 'pH') ctx.regler(id, v);
      ctx.dire(maj());
    };

    const phrase0 = maj();
    if (cpt) { indexAff = indexCible; cpt.ecrire(indexAff); }

    /* ---------------------------------------------------------------- commandes et pièces */
    const COMMANDES = {
      courant: [{ id: 'debit', type: 'choix', options: [['faible', 'Peu de charges'], ['fort', 'Beaucoup de charges']], valeur: 'faible' }],
      tension: [{ id: 'niveau', type: 'choix', options: [['normal', 'Deux niveaux'], ['fort', 'Écart plus grand'], ['egal', 'Même niveau']], valeur: 'normal' }],
      ohm: [{ id: 'ohmU', type: 'curseur', libelle: 'La tension', min: 12, max: 400, pas: 1, unite: 'V', valeur: 230 },
            { id: 'ohmR', type: 'curseur', libelle: 'La résistance', min: 5, max: 500, pas: 1, unite: 'Ω', valeur: 100 }],
      puissance: [{ id: 'pP', type: 'curseur', libelle: 'La puissance', min: 100, max: 3500, pas: 50, unite: 'W', valeur: 2000 },
                  { id: 'pH', type: 'curseur', libelle: 'La durée', min: 0.25, max: 8, pas: 0.25, valeur: 0.25, format: fmtH }],
      alternatif: [{ id: 'type', type: 'choix', options: [['continu', 'Continu'], ['alternatif', 'Alternatif']], valeur: 'continu' }],
      monophase: [{ id: 'inter', type: 'choix', options: [['ferme', 'Interrupteur fermé'], ['ouvert', 'Interrupteur ouvert']], valeur: 'ferme' }]
    }[xp];

    const P = [];
    if (labo) P.push({ id: 'source', nom: 'L’alimentation (+ et −)', objets: [labo.groupe], desc: 'Elle pousse les charges : la borne + rouge est à un niveau haut, la borne − noire à un niveau bas. Ses deux afficheurs donnent la tension (en volts) et l’intensité (en ampères).' });
    if (reseau) P.push({ id: xp === 'alternatif' ? 'reseau' : 'source', nom: 'L’arrivée du réseau (230 V ~)', objets: [reseau.groupe], desc: 'Le courant alternatif du réseau. Le neutre (bleu) à gauche, la phase (marron) à droite. Le voyant dit qu’il y a de la tension.' });
    if (cpt) P.push({ id: 'source', nom: 'Le compteur d’énergie', objets: [cpt.socle, cpt.capot, cpt.cache, cpt.arrivee, ...cpt.bornesObj], desc: 'Le réseau arrive par derrière ; les départs partent par les bornes du bas, neutre à gauche, phase à droite.' },
      { id: 'disque', nom: 'Le disque du compteur', objets: [cpt.disque], desc: 'Il tourne d’autant plus vite que la puissance demandée est grande. Coupez l’appareil : il s’arrête.' },
      { id: 'totalisateur', nom: 'Les rouleaux (kWh)', objets: [cpt.totalisateur], desc: 'Ils additionnent l’énergie depuis la pose du compteur. Ils ne reviennent jamais en arrière : deux relevés, une soustraction.' });
    P.push({ id: 'inter', nom: 'L’interrupteur', objets: [inter.groupe], desc: 'Il ouvre ou ferme la boucle. Ouvert, plus rien ne circule, nulle part.' });
    if (xp === 'courant') P.push({ id: 'lampe', nom: 'La lampe', objets: [lampes[0].groupe, lampeFaible.groupe], desc: 'Plus il passe de charges par seconde, plus elle brille. Une lampe de 21 W en laisse passer plus qu’une lampe de 5 W.' },
      { id: 'amperemetre', nom: 'L’ampèremètre (A)', objets: [ampe.groupe], desc: 'Branché EN SÉRIE : tout le courant le traverse. Son aiguille dit combien de charges passent par seconde, en ampères.' });
    if (xp === 'tension') P.push({ id: 'lampe', nom: 'Les deux lampes', objets: lampes.map(l => l.groupe), desc: 'Deux lampes l’une après l’autre : chacune prend la moitié de l’écart de la source.' },
      { id: 'multimetre', nom: 'Le multimètre (V⎓)', objets: [mm.groupe], desc: 'Utilisé en voltmètre : sélecteur sur V⎓, pointe noire dans COM, rouge dans VΩ. Il se branche EN PARALLÈLE, sans rien couper.' },
      { id: 'pointes', nom: 'Les deux pointes', objets: [...pointeR.objets(), ...pointeN.objets()], desc: 'Une tension se mesure toujours entre DEUX points. La noire ne bouge jamais de COM ; ici on déplace son bout sur le circuit.' });
    if (xp === 'ohm') P.push({ id: 'rheostat', nom: 'Le rhéostat (résistance réglable)', objets: [rheo.groupe], desc: 'Un fil résistant enroulé sur un tube. Le courant ne traverse que la partie entre la borne et le curseur : plus le curseur s’éloigne, plus la résistance est grande.' },
      { id: 'curseur', nom: 'Le curseur', objets: [rheo.curseur], desc: 'Il glisse sur la barre et touche le fil résistant. C’est lui qu’on déplace pour régler la résistance.' });
    if (xp === 'puissance') P.push({ id: 'radiateur', nom: 'Le radiateur', objets: [radia.groupe], desc: 'Deux résistances qui chauffent. Plus la puissance demandée est grande, plus elles rougissent.' });
    if (xp === 'alternatif' || xp === 'monophase') P.push({ id: 'lampe', nom: 'La lampe', objets: [lampes[0].groupe], desc: 'Elle brille dans les deux cas : le continu et l’alternatif font tous deux travailler une lampe.' });
    if (osc) P.push({ id: 'oscillo', nom: 'L’oscilloscope', objets: [osc.groupe, ...sondesOsc], desc: 'Il trace la tension aux bornes de la lampe au fil du temps : une ligne droite en continu, une vague en alternatif.' });
    P.push({ id: 'aller', nom: DC && xp !== 'alternatif' ? 'Le fil rouge (+)' : xp === 'alternatif' ? 'Le fil aller (+ rouge, ou phase marron)' : 'La phase (fil marron)', objets: filsAller, desc: DC ? 'Il part de la borne +. En continu, on câble le + en rouge.' : 'La phase : c’est le conducteur dangereux. En 1P+N, elle est à droite.' });
    P.push({ id: 'retour', nom: DC && xp !== 'alternatif' ? 'Le fil noir (−)' : xp === 'alternatif' ? 'Le fil retour (− noir, ou neutre bleu)' : 'Le neutre (fil bleu)', objets: filsRetour, desc: DC ? 'Il revient à la borne −. En continu, on câble le − en noir.' : 'Le neutre : il est relié à la terre au poste de distribution. En 1P+N, il est à gauche.' });
    P.push({ id: 'grains', nom: 'Le courant (grains dorés)', objets: [B.groupe], desc: 'Les grains montrent les charges qui circulent. Une seule rivière fait tout le tour : le courant est le MÊME partout dans la boucle.' });
    P.push({ id: 'planche', nom: 'La planche d’essai', objets: [planche], desc: 'Tout le montage est posé dessus, sur la table de l’atelier.' });

    /* ---------------------------------------------------------------- les étapes */
    const V = (az, el, zoom, cible) => ({ azimut: az, elevation: el, zoom: (zoom || 1) * 1.25, cible });
    const ETAPES = {
      courant: [
        { titre: 'Interrupteur ouvert', texte: 'La boucle est coupée : aucune charge ne bouge, nulle part. L’aiguille reste sur zéro.', actions: [['debit', 'faible'], ['inter', 'ouvert']], piece: 'inter', vue: V(-18, 34, 1.15) },
        { titre: 'On ferme : tout part en même temps', texte: 'Les charges se mettent en marche partout à la fois, sur toute la boucle. C’est pour cela que la lampe s’allume tout de suite.', actions: [['inter', 'ferme']], piece: 'grains', vue: V(-18, 40, 1.05) },
        { titre: 'L’ampèremètre compte le débit', texte: 'Il est branché en série : tout le courant le traverse. L’aiguille indique 0,42 A — le nombre de charges qui passent chaque seconde.', piece: 'amperemetre', vue: V(-8, 22, 1.9, [55, 40, 70]) },
        { titre: 'Une lampe plus puissante', texte: 'Elle laisse passer beaucoup plus de charges par seconde : les grains sont plus serrés et plus rapides, l’aiguille monte à 1,75 A.', actions: [['debit', 'fort']], piece: 'lampe', vue: V(-14, 30, 1.25) },
        { titre: 'Le même courant partout', texte: 'Dans le fil rouge comme dans le fil noir, avant et après la lampe : la même rivière de grains. Rien ne se perd en chemin.', piece: 'retour', vue: V(-6, 62, 1) }
      ],
      tension: [
        { titre: 'La source a deux niveaux', texte: 'La borne + est à un niveau haut, la borne − à un niveau bas. C’est cet écart qui pousse les charges dans la boucle.', actions: [['inter', 'ferme'], ['niveau', 'normal']], piece: 'source', vue: V(-30, 26, 1.5, [-150, 50, -20]) },
        { titre: 'Deux niveaux', texte: 'Pointe rouge avant la première lampe, pointe noire juste après : entre ces deux points, l’écran lit 6 V.', actions: [['niveau', 'normal']], piece: 'pointes', vue: V(-24, 36, 1.3, [160, 40, 50]) },
        { titre: 'Écart plus grand', texte: 'La pointe noire passe après la deuxième lampe : les deux points sont plus éloignés en niveau. L’écran lit 12 V.', actions: [['niveau', 'fort']], piece: 'pointes', vue: V(-24, 36, 1.3, [160, 40, 50]) },
        { titre: 'Même niveau', texte: 'Les deux pointes sont sur le même fil, alimenté pourtant. Même niveau, aucun écart : l’écran lit 0 V. C’est l’oiseau posé sur un seul fil.', actions: [['niveau', 'egal']], piece: 'pointes', vue: V(-24, 36, 1.3, [140, 40, 60]) }
      ],
      ohm: [
        { titre: 'La tension pousse, la résistance freine', texte: '230 V poussent à travers 100 Ω de fil résistant : il passe 2,3 A.', actions: [['inter', 'ferme'], ['ohmU', 230], ['ohmR', 100]], piece: 'rheostat', vue: V(-20, 30, 1.05) },
        { titre: 'Plus de tension, plus de courant', texte: 'On monte à 400 V sans toucher au curseur : les grains passent plus serrés et plus vite. 4 A au lieu de 2,3 A.', actions: [['ohmU', 400]], piece: 'source', vue: V(-20, 30, 1.05) },
        { titre: 'Plus de résistance, moins de courant', texte: 'On pousse le curseur au bout : le chemin dans le fil résistant s’allonge jusqu’à 500 Ω. Le courant retombe à 0,8 A.', actions: [['ohmR', 500]], piece: 'curseur', vue: V(-14, 24, 1.25, [50, 45, -20]) },
        { titre: 'Peu de résistance : ça chauffe', texte: 'Curseur tout près de la borne : 5 Ω seulement. Il passe 80 A et le fil résistant rougit. La chaleur grandit avec le carré du courant.', actions: [['ohmR', 5]], piece: 'curseur', vue: V(-14, 24, 1.25, [50, 45, -20]) }
      ],
      puissance: [
        { titre: 'Le radiateur demande 2000 W', texte: 'Ses résistances rougissent ; au compteur, le disque tourne vite.', actions: [['inter', 'ferme'], ['pP', 2000], ['pH', 0.25]], piece: 'radiateur', vue: V(-22, 26, 1.05) },
        { titre: 'Le disque montre la puissance', texte: 'Plus l’appareil demande, plus le disque tourne vite. La puissance, c’est ce qui passe MAINTENANT.', piece: 'disque', vue: V(-14, 14, 2.1, [-185, 95, -60]) },
        { titre: 'Les rouleaux additionnent', texte: 'Un quart d’heure à 2000 W : les rouleaux avancent d’un demi-kilowattheure. Ils ne reviennent jamais en arrière.', piece: 'totalisateur', vue: V(-8, 10, 2.6, [-185, 120, -60]) },
        { titre: 'Une veille de 100 W', texte: 'Vingt fois moins de puissance : le disque tourne vingt fois moins vite, le radiateur ne chauffe presque plus.', actions: [['pP', 100]], piece: 'disque', vue: V(-14, 14, 2.1, [-185, 95, -60]) },
        { titre: 'Mais toute la nuit', texte: 'Pendant 8 heures, les rouleaux avancent de 0,8 kWh : la petite veille a consommé plus que le gros radiateur.', actions: [['pH', 8]], piece: 'totalisateur', vue: V(-8, 10, 2.6, [-185, 120, -60]) }
      ],
      alternatif: [
        { titre: 'Le continu', texte: 'L’alimentation a un + et un − : les grains avancent tous dans le même sens, sans jamais revenir. L’écran trace une ligne droite.', actions: [['inter', 'ferme'], ['type', 'continu']], piece: 'source', vue: V(-20, 30, 1.05) },
        { titre: 'L’alternatif', texte: 'Sur le réseau, le courant change de sens sans arrêt : les grains vont et viennent sur place. L’écran trace une vague.', actions: [['type', 'alternatif']], piece: 'reseau', vue: V(-20, 30, 1.05) },
        { titre: 'Un aller-retour, au ralenti', texte: 'En vrai, cinquante allers-retours par seconde : trop vite pour l’œil. Ici, chaque aller-retour dure plus d’une seconde.', actions: [['type', 'alternatif']], piece: 'oscillo', ralenti: true, vue: V(-6, 18, 1.8, [60, 50, -60]) }
      ],
      monophase: [
        { titre: 'Interrupteur ouvert', texte: 'La phase arrive jusqu’à l’interrupteur, mais la boucle est coupée : rien ne circule.', actions: [['inter', 'ouvert']], piece: 'inter', vue: V(-18, 34, 1.1) },
        { titre: 'Le courant part par la phase', texte: 'On ferme : le courant part du réseau par le fil marron et traverse la lampe.', actions: [['inter', 'ferme']], piece: 'aller', vue: V(-18, 34, 1.05) },
        { titre: '… et revient par le neutre', texte: 'Il revient au réseau par le fil bleu. Une seule boucle : phase, charge, neutre.', piece: 'retour', vue: V(-6, 50, 1) },
        { titre: 'Cinquante fois par seconde, l’inverse', texte: 'Les grains vont et viennent : « aller » et « retour » sont des mots commodes, pas des sens fixes. Le mouvement est ralenti.', piece: 'lampe', ralenti: true, vue: V(-14, 28, 1.3) }
      ]
    }[xp];

    const animer = (dt) => {
      let actif = B.courant.animer(dt);
      const b = inter.bascule; if (b.userData.cible !== undefined) { const v = K.vers(b.rotation.x, b.userData.cible, 18, dt); if (Math.abs(v - b.rotation.x) > 1e-4) actif = true; b.rotation.x = v; }
      if (ampe && ampe.animer(dt)) actif = true;
      if (mm && mm.animer(dt)) actif = true;
      if (cpt) {
        if (vDisque > 0) { angleDisque += dt * vDisque * Math.PI * 2; cpt.disque.rotation.y = angleDisque; actif = true; }
        if (Math.abs(indexCible - indexAff) > 1e-4) { indexAff = K.vers(indexAff, indexCible, 2.2, dt); if (Math.abs(indexCible - indexAff) < 0.002) indexAff = indexCible; cpt.ecrire(indexAff); actif = true; }
      }
      if (osc) {
        tOsc += dt;
        const ac = s.type === 'alternatif', ouvert = !s.ferme;
        osc.tracer(ouvert ? (u => 0) : ac ? (u => Math.sin(u * Math.PI * 8 - tOsc * Math.PI * 2 * 0.7)) : (u => 0.75));
        actif = true;
      }
      return actif;
    };

    return {
      racine,
      vue: { azimut: -24, elevation: 34, zoom: 1.3, cadre: [planche], marge: 0.92, cible: [10, 40, 0] },
      phrase: phrase0,
      pieces: P,
      commandes: COMMANDES,
      agir, animer, etapes: ETAPES,
      reperesCote: undefined
    };
  }, { famille: 'grandeurs', titre: 'Le banc d’expérience', stations: ['1.1', '1.2', '1.3', '1.4', '1.5', '2.2'] });

  /* ================================================================== 2. le multimètre (1.9)
     Deux réglages qui doivent dire la même chose : la molette, et la douille de la pointe rouge.
     Ce qu'on mesure dépend de la molette : V~ et Ω → les pointes vont dans la prise ;
     A~ → l'appareil se met « dans le trou » du circuit ouvert d'une lampe (un domino ouvert). */
  Electro3D.definir('multimetre', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const planche = K.mesh(K.boite(400, 12, 280, 3), K.plastique(0xd9c8a4, 0.78), 0, -6, 0);
    const panneau = K.mesh(K.boite(400, 230, 14, 3), K.plastique(0xece6da, 0.8), 0, 115, -133);
    racine.add(planche, panneau);

    /* la prise murale 2P+T en saillie : neutre à gauche, phase à droite */
    const prise = new T.Group(); prise.position.set(-80, 150, -126);
    const boite = K.mesh(K.boite(74, 74, 36, 8), M.plastiqueBlanc, 0, 0, 18);
    const face = K.mesh(K.cylindre(27, 4, 40), M.plastiqueBlanc, 0, 0, 37); face.rotation.x = Math.PI / 2;
    const puits = K.mesh(K.cylindre(20, 2, 40), K.plastique(0xe4e0d6, 0.6), 0, 0, 38.6); puits.rotation.x = Math.PI / 2;
    const trous = [-9.5, 9.5].map(x => { const t = K.mesh(K.cylindre(2.5, 1, 16), M.sombre, x, 0, 39.7); t.rotation.x = Math.PI / 2; return t; });
    const terre = K.mesh(K.cylindre(2.4, 9, 16), M.acier, 0, 11, 43); terre.rotation.x = Math.PI / 2;
    prise.add(boite, face, puits, ...trous, terre);
    racine.add(prise);
    const trouN = new T.Vector3(-89.5, 150, -88.5), trouL = new T.Vector3(-70.5, 150, -88.5);
    /* son câble descend le long du panneau jusqu'à la planche, puis file vers la lampe */
    const cableMur = K.fil([[-80, 113, -110], [-80, 90, -117], [-80, 8, -118], [-70, 4.5, -100], [-40, 4.5, -90]], 4.2, K.isolant(0x9a9fa5));
    racine.add(cableMur.mesh);

    /* la lampe et son domino ouvert */
    const lp = lampe(T, K, 1); lp.groupe.position.set(120, 0, -60); racine.add(lp.groupe);
    const domino = new T.Group(); domino.position.set(40, 0, 24);
    const dCorps = K.mesh(K.boite(44, 16, 22, 2), K.plastique(0xf3f1ea, 0.4), 0, 8, 0);
    const vis = [-11, 11].map(x => { const v = K.vis(3); v.position.set(x, 16, 0); return v; });
    domino.add(dCorps, ...vis); racine.add(domino);
    const bornesDomino = [new T.Vector3(29, 18.5, 24), new T.Vector3(51, 18.5, 24)];
    const lB = [new T.Vector3(102, 8, -24), new T.Vector3(138, 8, -24)];
    const fN = K.fil([[-46, 4.5, -92], [20, 2.4, -72], [80, 2.4, -6], [102, 2.4, -14], [102, 8, -24]], 2, 'N');
    const fL1 = K.fil([[-36, 4.5, -86], [-10, 2.4, -40], [16, 2.4, 24], [24, 8, 24]], 2, 'L1');
    const fL2 = K.fil([[56, 8, 24], [70, 2.4, 26], [140, 2.4, 6], [138, 2.4, -12], [138, 8, -24]], 2, 'L1');
    racine.add(fN.mesh, fL1.mesh, fL2.mesh);

    /* le multimètre et ses cordons */
    const mm = multimetreBloc(T, K);
    mm.groupe.position.set(-150, 7, 70); mm.groupe.rotation.y = 0.42; racine.add(mm.groupe);
    mm.groupe.updateMatrixWorld(true);
    const rouge = cordonEtPointe(T, K, racine, 0xc0392b, 'rouge');
    const noir = cordonEtPointe(T, K, racine, 0x26282b, 'noir');
    enficher(T, mm, noir.fiche, 'COM');

    /* le court-circuit : un éclair aux pointes, les grains qui se ruent */
    const arc = K.arc(trouN.clone().add(new T.Vector3(3, 0, 2)), trouL.clone().add(new T.Vector3(-3, 0, 2)), { rayon: 0.7, halo: 1.6 });
    racine.add(arc.objet);
    const grains = new T.Group(); racine.add(grains);
    let riviere = null;

    const s = { pos: 'V~', borne: 'VO' };
    let tArc = 0, tFlic = 0, fondu = false, flic = 0;
    const CAS = {
      'V~|VO': ['ok', 'Correct. C’est la mesure la plus courante de l’atelier : tension alternative, une pointe dans chaque trou de la prise, rien à couper. L’écran affiche <strong>230,4 V~</strong>.'],
      'V~|A': ['bad', 'Non. Le sélecteur dit « tension », mais la pointe rouge est dans la borne des ampères. Entre ses deux pointes, l’appareil n’est plus qu’un fil : posées sur une prise, elles la mettent <strong>en court-circuit</strong>. Le fusible de l’appareil fond — quand ce n’est pas l’appareil.'],
      'A~|A': ['ok', 'Correct pour un courant — mais il a fallu ouvrir le circuit et mettre l’appareil <strong>dans le trou</strong> : le domino de la lampe est ouvert, le multimètre le referme. Il lit <strong>0,43 A~</strong>. Sur un moteur, on préfère largement la pince.'],
      'A~|VO': ['bad', 'Non. Le sélecteur dit « ampères » mais la pointe n’est pas dans la bonne borne : l’appareil ne voit rien passer (0,00 A), et la lampe reste éteinte.'],
      'Ω|VO': ['bad', 'La borne est bonne, mais la position ohms ne s’emploie que <strong>HORS TENSION</strong>, sur un élément débranché d’au moins un côté. Sur une prise vivante, la valeur affichée ne veut rien dire et l’appareil peut être détruit.'],
      'Ω|A': ['bad', 'Ni la position ni la borne. La position ohms exige un circuit hors tension, et la borne des ampères est un quasi court-circuit : sur la prise, le fusible fond.']
    };
    const NOMS = { 'V~': 'V ~ (tension alternative)', 'A~': 'A ~ (courant alternatif)', 'Ω': 'Ω (résistance)', OFF: 'OFF (arrêt)' };
    const serie = () => s.pos === 'A~';
    const court = () => s.pos !== 'A~' && s.pos !== 'OFF' && s.borne === 'A';

    const poserGrains = (chemin, debit, vitesse, alt) => {
      if (riviere) { grains.remove(riviere.objet); riviere.objet.dispose(); riviere = null; }
      if (!chemin) return;
      riviere = K.courant(chemin, { pas: 9, rayon: 2.2, vitesse });
      riviere.regler({ debit, vitesse, alternatif: !!alt, frequence: 0.7 }); grains.add(riviere.objet);
    };

    const maj = () => {
      mm.tourner(s.pos);
      enficher(T, mm, rouge.fiche, s.borne);
      const cr = serie()
        ? rouge.poser(mm.sortie(s.borne), mm.axe(s.borne), bornesDomino[0])
        : rouge.poser(mm.sortie(s.borne), mm.axe(s.borne), trouL, new T.Vector3(0.25, 0.32, 1).normalize());
      const cn = serie()
        ? noir.poser(mm.sortie('COM'), mm.axe('COM'), bornesDomino[1])
        : noir.poser(mm.sortie('COM'), mm.axe('COM'), trouN, new T.Vector3(-0.1, 0.32, 1).normalize());
      const fermeLampe = serie() && s.borne === 'A';
      lp.regler(fermeLampe ? 1 : 0);
      const avant = fondu;
      fondu = court();
      mm.grille(fondu);
      if (fondu && !avant) tArc = 0.6;
      /* les grains : la boucle de la lampe à travers l'appareil, ou l'éclair du court-circuit */
      const pts = s => s.groupe.localToWorld(new T.Vector3(0, 0, 0));
      if (fermeLampe) {
        poserGrains(K.chemin([fL1.courbe, bornesDomino[0], pts(rouge.sonde), K.inverse(cr), mm.sortie('A'), mm.sortie('COM'), cn.courbe, pts(noir.sonde), bornesDomino[1], fL2.courbe, ...WL0(lp).reverse(), K.inverse(fN)]), 0.75, 40, true);
      } else if (fondu) {
        poserGrains(K.chemin([trouL, K.inverse(cr), mm.sortie(s.borne), mm.sortie('COM'), cn.courbe, trouN]), 1, 260, false);
      } else poserGrains(null);
      const clef = s.pos + '|' + s.borne;
      if (s.pos === 'OFF') mm.ecran.ecrire('', '');
      else if (clef === 'V~|VO') mm.ecran.ecrire('230.4', 'V~', 'AC');
      else if (clef === 'A~|A') mm.ecran.ecrire('0.43', 'A~', 'AC');
      else if (clef === 'A~|VO') mm.ecran.ecrire('0.00', 'A~', 'AC');
      else if (s.pos === 'V~') mm.ecran.ecrire('0.0', 'V~', 'AC');
      else if (clef === 'Ω|A') mm.ecran.ecrire('O.L', 'MΩ');
      const ver = CAS[clef];
      const phrase = s.pos === 'OFF' ? '<strong>Appareil à l’arrêt.</strong> Sélecteur sur OFF : l’écran est vide.'
        : '<strong>' + (ver[0] === 'ok' ? '✔ La combinaison est bonne.' : '✘ La combinaison ne va pas.') + '</strong> ' + ver[1];
      ctx.mesures([
        { libelle: 'Le sélecteur est sur', valeur: NOMS[s.pos] },
        { libelle: 'La pointe rouge est dans', valeur: s.borne === 'A' ? 'la borne A' : 'la borne V Ω' },
        { libelle: 'La pointe noire est dans', valeur: 'COM, toujours' }
      ]);
      return phrase;
    };
    const WL0 = l => l.interne.map(p => new T.Vector3(p[0], p[1], p[2]).add(l.groupe.position));

    let eclatee = false;
    const agir = (id, v) => {
      if (id === 'pos') { s.pos = v; if (v !== 'OFF') ctx.regler('pos', v); else ctx.regler('pos', null); }
      else if (id === 'borne') { s.borne = v; ctx.regler('borne', v); }
      else return;
      ctx.dire(maj());
    };
    const phrase0 = maj();

    const cordons = () => [...rouge.objets(), ...noir.objets()];
    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: 10, elevation: 18, zoom: 2.2, cadre: [planche, panneau], marge: 1, cible: [-150, 80, 50] }
                                    : { azimut: -14, elevation: 22, zoom: 1.25, cadre: [planche, panneau], marge: 0.95, cible: [-30, 80, 0] },
      phrase: phrase0,
      fantome: [mm.etui, mm.facade, mm.cadreLcd],
      fantomeAuDepart: false,
      pieces: [
        { id: 'boitier', nom: 'La coque caoutchouc', objets: [mm.etui, mm.bequille], desc: 'Elle protège l’appareil des chocs. La béquille, derrière, le tient penché sur la table.' },
        { id: 'ecran', nom: 'L’afficheur', objets: [mm.ecran.mesh, mm.cadreLcd], desc: 'Il affiche la valeur ET l’unité : « 230.4 V~ ». Lisez toujours l’unité : elle dit ce que l’appareil croit mesurer.' },
        { id: 'selecteur', nom: 'Le sélecteur (la molette)', objets: [mm.bouton, mm.couronne, mm.marques], desc: 'Il dit CE QU’ON MESURE : V~ tension alternative, V⎓ tension continue, Ω résistance, A~ et A⎓ courant.' },
        { id: 'com', nom: 'La douille COM', objets: [mm.douilles.COM], desc: 'La pointe noire y reste toujours. Elle n’en bouge jamais.' },
        { id: 'vo', nom: 'La douille VΩ', objets: [mm.douilles.VO], desc: 'Pour les tensions et les résistances. C’est là que va la pointe rouge, presque toujours.' },
        { id: 'a', nom: 'La douille A', objets: [mm.douilles.A], desc: 'Pour les courants, appareil EN SÉRIE. Entre A et COM, l’appareil est presque un fil : jamais sur une prise !' },
        { id: 'fusible', nom: 'Le fusible de la borne A', objets: [mm.fusible, mm.piste], desc: 'Caché dans le boîtier. Il fond si l’on met la borne A en court-circuit. « Voir dedans » le montre.' },
        { id: 'carte', nom: 'La carte et la pile', objets: [mm.carte, ...mm.pile], desc: 'L’électronique qui mesure et calcule, alimentée par une pile de 9 V.' },
        { id: 'pointes', nom: 'Les cordons et les pointes', objets: [rouge.sonde.groupe, noir.sonde.groupe, rouge.fiche, noir.fiche], desc: 'Rouge et noir. On les tient par le manche, derrière la garde : les doigts ne touchent jamais le métal.' },
        { id: 'prise', nom: 'La prise (230 V)', objets: [prise, cableMur.mesh], desc: 'Neutre à gauche, phase à droite. On y mesure une TENSION, pointes en parallèle.' },
        { id: 'domino', nom: 'Le domino ouvert et la lampe', objets: [domino, lp.groupe, fL1.mesh, fL2.mesh, fN.mesh], desc: 'Pour mesurer un COURANT, on ouvre le circuit : le domino est desserré, et c’est l’appareil qui le referme.' }
      ],
      commandes: [
        { id: 'pos', type: 'choix', options: [['V~', 'Sélecteur : V ~'], ['A~', 'Sélecteur : A ~'], ['Ω', 'Sélecteur : Ω']], valeur: 'V~' },
        { id: 'borne', type: 'choix', options: [['VO', 'Pointe rouge : borne V Ω'], ['A', 'Pointe rouge : borne A']], valeur: 'VO' }
      ],
      agir,
      etapes: [
        { titre: 'L’appareil à l’arrêt', texte: 'Sélecteur sur OFF : l’écran est vide. Les cordons sont branchés : la pointe noire dans COM, la rouge dans VΩ.', actions: [['borne', 'VO'], ['pos', 'OFF']], piece: 'selecteur', voirDedans: false, vue: { azimut: 12, elevation: 14, zoom: 2.5, cible: [-150, 102, 60] } },
        { titre: 'La molette choisit la mesure', texte: 'On tourne le sélecteur sur V~ : l’appareil se prépare à lire une tension alternative. L’unité s’affiche.', actions: [['pos', 'V~']], piece: 'selecteur', vue: { azimut: 12, elevation: 14, zoom: 2.5, cible: [-150, 102, 60] } },
        { titre: 'Une pointe dans chaque trou', texte: 'Une tension se lit entre deux points, sans rien couper : l’écran affiche 230,4 V~.', piece: 'pointes', vue: { azimut: -8, elevation: 18, zoom: 1.6, cible: [-110, 110, -30] } },
        { titre: 'Pour un courant : dans le trou', texte: 'Sélecteur sur A~, pointe rouge dans A, et l’appareil referme le domino ouvert : tout le courant de la lampe le traverse. 0,43 A.', actions: [['pos', 'A~'], ['borne', 'A']], piece: 'domino', vue: { azimut: -20, elevation: 30, zoom: 1.5, cible: [10, 40, 20] } },
        { titre: 'L’erreur qui coûte cher', texte: 'On revient sur la prise en oubliant la pointe rouge dans A : entre phase et neutre, l’appareil n’est plus qu’un fil. Court-circuit : le fusible fond.', actions: [['pos', 'V~']], piece: 'fusible', voirDedans: true, ralenti: true, vue: { azimut: 4, elevation: 16, zoom: 2.0, cible: [-140, 98, 50] } }
      ],
      eclate: [
        { objets: [mm.etui], vers: [0, 0, -46] },
        { objets: [mm.bequille.parent], vers: [0, 0, -40] },
        { objets: [mm.pile[0], mm.pile[1]], vers: [0, 0, -30] },
        { objets: [mm.facade, mm.cadreLcd, mm.ecran.mesh, mm.couronne, mm.marques, mm.etiquettes, ...Object.values(mm.douilles)], vers: [0, 0, 48] },
        { objets: [mm.bouton], vers: [0, 0, 82] },
        { objets: [mm.fusible], vers: [-22, 0, 22] }
      ],
      eclateVue: { azimut: -58, elevation: 14, zoom: 2.4, cible: [-150, 90, 60] },
      surEclate(on) {
        eclatee = on;
        cordons().forEach(o => { o.visible = !on; });
        grains.visible = !on;
      },
      animer(dt) {
        let actif = mm.animer(dt);
        if (riviere && riviere.animer(dt)) actif = true;
        if (tArc > 0) {
          tArc -= dt; arc.regler(tArc > 0);
          if (tArc <= 0) poserGrains(null);
          actif = true;
        }
        if (arc.animer(dt)) actif = true;
        if (s.pos === 'Ω' && s.borne === 'VO') {
          tFlic += dt;
          if (tFlic > 0.35) { tFlic = 0; flic++; const v = ['12.7', '3.46', 'O.L', '0.91', '57.2'][flic % 5]; mm.ecran.ecrire(v, v === 'O.L' ? 'MΩ' : flic % 2 ? 'kΩ' : 'MΩ'); }
          actif = true;
        }
        return actif;
      }
    };
  }, { famille: 'grandeurs', titre: 'Le multimètre', stations: ['1.9', '1.2', '1.5'] });

  /* ================================================================== 3. la pince ampèremétrique (1.1, 1.9)
     Une mâchoire de fer qui s'ouvre (gâchette) et se referme autour d'un conducteur ; elle
     canalise le champ du courant jusqu'à sa bobine de mesure. Rien n'est coupé, rien n'est touché.
     Phase seule : 4,92 A. Phase + neutre ensemble : l'aller annule le retour, presque 0. */
  Electro3D.definir('pince', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const planche = K.mesh(K.boite(440, 12, 240, 3), K.plastique(0xd9c8a4, 0.78), 0, -6, 0);
    const panneau = K.mesh(K.boite(440, 340, 14, 3), K.plastique(0xece6da, 0.8), 0, 170, -110);
    racine.add(planche, panneau);
    const YC = 270;
    /* deux boîtes de dérivation et le câble entre elles, ses deux conducteurs écartés */
    const boites = [-160, 160].map(x => K.mesh(K.boite(80, 80, 44, 6), M.plastique, x, YC, -81));
    const presse = [-1, 1].map(s => { const c = K.mesh(K.cylindre(9, 10, 20), M.plastiqueNoir, s * 115, YC, -60); c.rotation.z = Math.PI / 2; return c; });
    const gaines = [-1, 1].map(s => { const c = K.mesh(K.cylindre(7.5, 32, 20), K.isolant(0x9a9fa5), s * 104, YC, -54); c.rotation.z = Math.PI / 2; return c; });
    racine.add(...boites, ...presse, ...gaines);
    const brun = K.fil([[-120, YC, -60], [-88, YC, -60], [88, YC, -60], [120, YC, -60]], 2.8, 'L1');
    const bleu = K.fil([[120, YC, -48], [94, YC, -48], [80, YC + 26, -48], [62, YC + 56, -48], [12, YC + 56, -48], [-8, YC + 26, -48], [-24, YC, -48], [-88, YC, -48], [-120, YC, -48]], 2.8, 'N');
    racine.add(brun.mesh, bleu.mesh);
    /* le courant : aller par la phase, retour par le neutre (en alternatif, ils vont et viennent) */
    const cBrun = K.courant(brun.courbe, { pas: 11, rayon: 3.1, vitesse: 40 }), cBleu = K.courant(bleu.courbe, { pas: 11, rayon: 3.1, vitesse: 40 });
    [cBrun, cBleu].forEach(c => { c.regler({ debit: 0.75, alternatif: true, frequence: 0.7 }); racine.add(c.objet); });

    /* ---------------------------------------------------------------- la pince (repère local :
       mâchoire dans le plan XY, centre en 0, manche vers −Y, afficheur vers +Z) */
    const pince = new T.Group(); racine.add(pince);
    pince.rotation.y = -Math.PI / 2;           /* afficheur vers −X, ouverture de la mâchoire vers +Z */
    const R = 28, r = 6.5;
    const gris = K.plastique(0x3d4249, 0.55), rougeP = K.plastique(0xc0392b, 0.45);
    const coqueFixe = K.mesh(K.tore(R, r, 14, 36, Math.PI), rougeP); coqueFixe.rotation.z = Math.PI / 2;
    const noyauFixe = K.mesh(K.tore(R, 3.4, 10, 36, Math.PI), M.tole); noyauFixe.rotation.z = Math.PI / 2;
    const bobineMes = K.mesh(K.cylindre(5.6, 18, 20), K.bobinageMat(3)); bobineMes.position.set(-R * Math.cos(0.5), -R * Math.sin(0.5), 0); bobineMes.rotation.z = 0.5;
    const pivot = new T.Group(); pivot.position.set(0, -R, 0);
    const coqueMobile = K.mesh(K.tore(R, r, 14, 36, Math.PI), rougeP); coqueMobile.rotation.z = -Math.PI / 2; coqueMobile.position.y = R;
    const noyauMobile = K.mesh(K.tore(R, 3.4, 10, 36, Math.PI), M.tole); noyauMobile.rotation.z = -Math.PI / 2; noyauMobile.position.y = R;
    pivot.add(coqueMobile, noyauMobile);
    const charniere = K.mesh(K.cylindre(5, 16, 16), M.acier, 0, -R, 0); charniere.rotation.x = Math.PI / 2;
    const garde = K.mesh(K.boite(84, 9, 32, 3), rougeP, 0, -44, 0);
    const col = K.mesh(K.boite(30, 16, 24, 4), gris, 0, -34, 0);
    const coqueAv = K.mesh(K.boite(66, 150, 18, 9), gris, 0, -123, 9);
    const coqueAr = K.mesh(K.boite(66, 150, 18, 9), gris, 0, -123, -9);
    const carte = K.mesh(K.boite(54, 130, 1.6, 0.6), M.plastiqueVert, 0, -123, 0);
    const ecr = lcd(K, 48, 26, { coupe: 0.66 }); ecr.mesh.position.set(0, -78, 18.6);
    const cadre = K.mesh(K.boite(54, 32, 1.4, 2), M.plastiqueNoir, 0, -78, 18.1);
    const molette = new T.Group(); molette.position.set(0, -132, 18.4);
    const mDisque = K.mesh(K.cylindre(13, 6, 32), K.plastique(0x23262b, 0.5)); mDisque.rotation.x = Math.PI / 2; mDisque.position.z = 3;
    const mAil = K.mesh(K.boite(6, 26, 5, 2), M.plastiqueNoir, 0, 0, 7);
    const mIdx = K.mesh(K.boite(1.8, 8, 0.6, 0.2), M.plastiqueBlanc, 0, 8, 9.8);
    molette.add(mDisque, mAil, mIdx); molette.rotation.z = -0.55;
    const reperes = new T.Group();
    [['OFF', -95], ['A~', -32], ['A⎓', 32], ['V~', 95]].forEach(([t, a]) => { const m = K.gravure(t, 3.6, { couleur: t === 'A~' ? '#ffd23a' : '#f1efe8' }); const ra = a * Math.PI / 180; m.position.set(Math.sin(ra) * 22, -132 + Math.cos(ra) * 22, 18.3); reperes.add(m); });
    const dCom = douille(T, K, 0x26282b), dV = douille(T, K, 0xc0392b); dCom.position.set(-12, -180, 17); dV.position.set(12, -180, 17);
    const gachette = new T.Group(); gachette.position.set(-33, -60, 0);
    const levier = K.mesh(K.boite(14, 44, 20, 5), M.plastiqueNoir, -5, 0, 0); gachette.add(levier);
    pince.add(coqueFixe, noyauFixe, bobineMes, pivot, charniere, garde, col, coqueAv, coqueAr, carte, cadre, ecr.mesh, molette, reperes, dCom, dV, gachette);
    /* le champ canalisé par le fer de la mâchoire */
    const pts = []; for (let i = 0; i <= 72; i++) { const a = i / 72 * Math.PI * 2; pts.push(new T.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0)); }
    const champ = K.flux(new T.CatmullRomCurve3(pts, true), { rayon: 3.9, pas: 7, vitesse: 0.8, ferme: true, opacite: 0.95 });
    pince.add(champ.objet);

    /* ---------------------------------------------------------------- l'état et le mouvement */
    const POS = { deux: { x: -55, z: -54 }, un: { x: 40, z: -60 } };
    const s = { conducteurs: 'un', ouverte: false };
    let u = 1, uCible = 1, eclatee = false;
    const ouv = K.mobile(0, 220, 26);
    const placer = () => {
      const x = POS.deux.x + (POS.un.x - POS.deux.x) * u, z = POS.deux.z + (POS.un.z - POS.deux.z) * u;
      pince.position.set(x, YC - 19, z);
      pivot.rotation.z = -ouv.x;
      gachette.position.x = -33 + ouv.x * 9;
    };
    const lecture = () => {
      const ferme = !s.ouverte && Math.abs(u - uCible) < 1e-3;
      if (!ferme && Math.abs(u - uCible) >= 1e-3) return ['- - -', 0];
      if (s.conducteurs === 'un') return s.ouverte ? ['1.87', 0.25] : ['4.92', 1];
      return s.ouverte ? ['0.01', 0.05] : ['0.03', 0];
    };
    const maj = () => {
      const [v, ch] = lecture();
      ecr.ecrire(v, 'A~', 'AC');
      champ.regler({ intensite: eclatee ? 0 : ch, alternatif: true });
      ctx.mesures([
        { libelle: 'Dans la mâchoire', valeur: s.conducteurs === 'un' ? 'la phase seule' : 'la phase et le neutre' },
        { libelle: 'La mâchoire', valeur: s.ouverte ? 'ouverte' : 'fermée' },
        { libelle: 'L’afficheur', valeur: v === '- - -' ? '—' : v.replace('.', ',') + ' A' }
      ]);
    };
    const PHRASES = {
      un: '<strong>Un seul conducteur dans la pince.</strong> Le courant de la phase crée un champ autour du fil ; la mâchoire fermée le canalise jusqu’à sa bobine de mesure. L’afficheur lit <strong>4,92 A~</strong>. Rien n’a été coupé, rien n’a été touché.',
      deux: '<strong>Les deux conducteurs ensemble.</strong> Le courant va par la phase et revient par le neutre : l’aller annule le retour. L’afficheur montre presque 0 — ce n’est pas une panne. Un seul conducteur à la fois !',
      ouverte: '<strong>Pince ouverte.</strong> On appuie sur la gâchette : la mâchoire mobile pivote. Tant qu’elle n’est pas bien refermée, la lecture est trop basse.'
    };
    const phrase = () => s.ouverte ? PHRASES.ouverte : PHRASES[s.conducteurs];
    const agir = (id, v) => {
      if (id === 'machoire') { s.ouverte = v === 'ouverte'; ctx.regler('machoire', v); }
      else if (id === 'conducteurs') { s.conducteurs = v; uCible = v === 'un' ? 1 : 0; ctx.regler('conducteurs', v); }
      else return;
      if (Math.abs(u - uCible) < 1e-3) ouv.cible = s.ouverte ? 0.62 : 0;
      maj(); ctx.dire(phrase());
    };
    placer(); maj();

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -58, elevation: 10, zoom: 1.7, cadre: [planche, panneau], marge: 1, cible: [40, 170, -60] }
                                    : { azimut: -50, elevation: 12, zoom: 1.9, cadre: [planche, panneau], marge: 0.95, cible: [0, 215, -50] },
      phrase: phrase(),
      fantome: [coqueFixe, coqueMobile, coqueAv, coqueAr],
      fantomeAuDepart: false,
      pieces: [
        { id: 'machoire', nom: 'La mâchoire', objets: [coqueFixe, coqueMobile, charniere], desc: 'Deux demi-anneaux qui s’ouvrent et se referment autour d’UN conducteur. Elle ne touche rien d’électrique.' },
        { id: 'noyau', nom: 'Le fer de la mâchoire', objets: [noyauFixe, noyauMobile], desc: 'Caché dans la mâchoire : il canalise le champ magnétique créé par le courant. « Voir dedans » le montre.' },
        { id: 'champ', nom: 'Le champ magnétique (tirets bleus)', objets: [champ.objet], desc: 'Il tourne autour du fil traversé par le courant. Deux fils en sens contraires : deux champs contraires, qui s’annulent.' },
        { id: 'bobine', nom: 'La bobine de mesure', objets: [bobineMes], desc: 'Enroulée sur le fer : elle transforme le champ en un petit signal que l’électronique lit.' },
        { id: 'gachette', nom: 'La gâchette', objets: [gachette], desc: 'On appuie : la mâchoire mobile pivote et s’ouvre. On relâche : un ressort la referme.' },
        { id: 'ecran', nom: 'L’afficheur', objets: [ecr.mesh, cadre], desc: 'Il affiche le courant ET son unité : « 4.92 A~ ».' },
        { id: 'molette', nom: 'Le sélecteur', objets: [molette, reperes], desc: 'Sur A~ pour un courant alternatif. Beaucoup de pinces mesurent aussi des tensions, avec des cordons.' },
        { id: 'boitier', nom: 'Le boîtier et la garde', objets: [coqueAv, coqueAr, garde, col, carte, dCom, dV, ...boites, ...presse, ...gaines], desc: 'La garde rouge arrête la main : les doigts restent derrière, loin du conducteur.' },
        { id: 'phase', nom: 'La phase (marron)', objets: [brun.mesh], desc: 'Le courant y va… et en alternatif, il y revient : il change de sens 100 fois par seconde.' },
        { id: 'neutre', nom: 'Le neutre (bleu)', objets: [bleu.mesh], desc: 'Le courant y fait le chemin inverse de la phase. Dans la pince avec la phase, il annule sa lecture.' },
        { id: 'grains', nom: 'Le courant (grains dorés)', objets: [cBrun.objet, cBleu.objet], desc: 'Aller par la phase, retour par le neutre : toujours en sens contraires.' },
      ],
      commandes: [
        { id: 'machoire', type: 'choix', options: [['fermee', 'Pince fermée autour du conducteur'], ['ouverte', 'Pince ouverte']], valeur: 'fermee' },
        { id: 'conducteurs', type: 'choix', options: [['un', 'Un conducteur'], ['deux', 'Les deux conducteurs']], valeur: 'un' }
      ],
      agir,
      etapes: [
        { titre: 'On appuie sur la gâchette', texte: 'La mâchoire mobile pivote et s’ouvre : on peut y passer le fil sans rien débrancher.', actions: [['conducteurs', 'un'], ['machoire', 'ouverte']], piece: 'gachette', voirDedans: false, vue: { azimut: -54, elevation: 10, zoom: 2.0, cible: [40, 222, -60] } },
        { titre: 'On referme autour d’un seul fil', texte: 'La mâchoire se referme autour de la phase, et d’elle seule. Elle ne touche rien d’électrique.', actions: [['machoire', 'fermee']], piece: 'machoire', vue: { azimut: -54, elevation: 10, zoom: 2.0, cible: [40, 222, -60] } },
        { titre: 'Le champ tourne dans le fer', texte: 'Le courant de la phase crée un champ magnétique autour du fil ; le fer de la mâchoire le canalise jusqu’à la bobine de mesure.', piece: 'noyau', voirDedans: true, vue: { azimut: -58, elevation: 6, zoom: 2.6, cible: [40, 238, -60] } },
        { titre: 'L’afficheur lit le courant', texte: '4,92 A~ : la machine continue de tourner pendant qu’on mesure.', piece: 'ecran', voirDedans: false, vue: { azimut: -58, elevation: 6, zoom: 2.2, cible: [40, 200, -60] } },
        { titre: 'Les deux fils ensemble : presque zéro', texte: 'Phase et neutre dans la mâchoire : l’aller et le retour créent deux champs contraires qui s’annulent. L’afficheur tombe à 0,03 A.', actions: [['conducteurs', 'deux']], piece: 'ecran', vue: { azimut: -50, elevation: 10, zoom: 2.3, cible: [-55, 225, -55] }, duree: 8 }
      ],
      eclate: [
        { objets: [coqueFixe], vers: [-34, 0, 0] },
        { objets: [coqueMobile], vers: [34, 0, 0] },
        { objets: [coqueAv, cadre, ecr.mesh, molette, reperes, dCom, dV], vers: [0, 0, 44] },
        { objets: [coqueAr], vers: [0, 0, -44] },
        { objets: [gachette], vers: [-36, 0, 0] },
        { objets: [garde], vers: [0, 0, 26] }
      ],
      eclateVue: { azimut: -40, elevation: 14, zoom: 1.9, cible: [40, 190, -60] },
      surEclate(on) { eclatee = on; maj(); },
      animer(dt) {
        let actif = false;
        if (Math.abs(u - uCible) >= 1e-3) {
          /* on ouvre d'abord, on glisse, puis on referme */
          ouv.cible = 0.62;
          if (ouv.x > 0.55) { u = u < uCible ? Math.min(uCible, u + dt * 1.4) : Math.max(uCible, u - dt * 1.4); if (Math.abs(u - uCible) < 1e-3) { u = uCible; ouv.cible = s.ouverte ? 0.62 : 0; maj(); } }
          actif = true;
        }
        if (ouv.pas(dt)) actif = true;
        placer();
        if (cBrun.animer(dt)) actif = true;
        if (cBleu.animer(dt)) actif = true;
        if (champ.animer(dt)) actif = true;
        return actif;
      }
    };
  }, { famille: 'grandeurs', titre: 'La pince ampèremétrique', stations: ['1.1', '1.9'] });

  /* ================================================================== 4. l'alternateur (1.6)
     Un aimant qui tourne devant une bobine : à chaque tour, le courant fait un aller-retour dans
     le circuit. Un tour par seconde = 1 Hz. Le temps est ralenti 25 fois : 50 Hz réels → 2 tours
     par seconde à l'écran. */
  Electro3D.definir('alternateur', (T, K, ctx) => {
    const M = K.mat;
    const racine = new T.Group();
    const RALENTI = 25;
    const planche = K.mesh(K.boite(440, 12, 280, 3), K.plastique(0xd9c8a4, 0.78), 0, -6, 0);
    racine.add(planche);
    const XA = -110, YA = 128, ZA = -30;
    /* le moteur d'entraînement et l'arbre vertical */
    const moteurB = K.mesh(K.boite(90, 64, 90, 6), M.plastique, XA, 32, ZA);
    const capotM = K.mesh(K.cylindre(26, 30, 32), M.fonte, XA, 79, ZA);
    const arbre = K.mesh(K.cylindre(4, 34, 16), M.acier, XA, 105, ZA);
    const aimant = new T.Group(); aimant.position.set(XA, YA, ZA);
    const nord = K.mesh(K.boite(44, 20, 20, 2.5), M.plastiqueRouge, 22, 0, 0);
    const sud = K.mesh(K.boite(44, 20, 20, 2.5), M.plastiqueBleu, -22, 0, 0);
    const moyeu = K.mesh(K.cylindre(8, 24, 20), M.acier, 0, -2, 0);
    const lN = K.gravure('N', 9, { couleur: '#ffffff' }); lN.rotation.x = -Math.PI / 2; lN.position.set(26, 10.2, 0);
    const lS = K.gravure('S', 9, { couleur: '#ffffff' }); lS.rotation.x = -Math.PI / 2; lS.position.set(-26, 10.2, 0);
    aimant.add(nord, sud, moyeu, lN, lS);
    racine.add(moteurB, capotM, arbre, aimant);
    /* la bobine sur son noyau de fer, face à l'aimant */
    const X0 = XA + 50;                                      /* bout du noyau, 6 mm devant l'aimant */
    const noyau = K.mesh(K.cylindre(9, 76, 24), M.tole, X0 + 38, YA, ZA); noyau.rotation.z = Math.PI / 2;
    const enroul = K.mesh(K.cylindre(25, 44, 40), K.bobinageMat(10), X0 + 40, YA, ZA); enroul.rotation.z = Math.PI / 2;
    const joues = [X0 + 16, X0 + 64].map(x => { const j = K.mesh(K.cylindre(29, 3, 40), M.plastiqueNoir, x, YA, ZA); j.rotation.z = Math.PI / 2; return j; });
    const support = K.mesh(K.boite(66, YA - 30, 50, 4), M.plastiqueSombre, X0 + 40, (YA - 30) / 2, ZA);
    racine.add(noyau, enroul, ...joues, support);
    const bobine = [enroul, ...joues];
    /* le circuit : deux fils de la bobine vers une lampe */
    const lp = lampe(T, K, 0.9); lp.groupe.position.set(120, 0, 50); racine.add(lp.groupe);
    const b0 = lp.bornes[0].clone().add(lp.groupe.position), b1 = lp.bornes[1].clone().add(lp.groupe.position);
    const f1 = K.fil([[X0 + 26, YA - 26, ZA + 12], [X0 + 26, 40, ZA + 30], [X0 + 30, 2.4, ZA + 50], [b0.x, 2.4, b0.z + 18], [b0.x, 4, b0.z + 9], b0], 2, 'rouge');
    const f2 = K.fil([b1, [b1.x, 4, b1.z + 9], [b1.x, 2.4, b1.z + 18], [b1.x + 30, 2.4, ZA + 70], [X0 + 56, 2.4, ZA + 46], [X0 + 56, 40, ZA + 28], [X0 + 54, YA - 26, ZA + 12]], 2, 'noir');
    racine.add(f1.mesh, f2.mesh);
    /* les spires parcourues : une hélice autour de l'enroulement */
    const spires = [];
    for (let i = 0; i <= 150; i++) { const v = i / 150, a = -Math.PI / 2 + v * Math.PI * 2 * 5; spires.push(new T.Vector3(X0 + 54 - v * 28, YA + Math.sin(a) * 26.5, ZA + Math.cos(a) * 26.5)); }
    const chemin = K.chemin([f1.courbe, ...lp.interne.map(p => new T.Vector3(p[0], p[1], p[2]).add(lp.groupe.position)), f2.courbe, ...spires, [X0 + 26, YA - 26, ZA + 12]]);
    const grains = K.courant(chemin, { pas: 11, rayon: 2.5, vitesse: 0 });
    grains.regler({ debit: 0.8, alternatif: false, vitesse: 0 }); racine.add(grains.objet);
    /* l'oscilloscope branché sur la lampe */
    const osc = oscillo(T, K); osc.groupe.position.set(110, 0, -85); osc.groupe.scale.setScalar(0.9); racine.add(osc.groupe);
    const sondes = [0, 1].map(i => {
      const de = osc.sorties[i].clone().multiplyScalar(0.9).add(osc.groupe.position), b = i ? b1 : b0;
      const c = K.fil([de, [de.x, 3, de.z + 14], [b.x + (i ? 10 : -10), 3, b.z - 40], [b.x + (i ? 8 : -8), 12, b.z - 14], [b.x + (i ? 5 : -5), 14, b.z - 9]], 1.3, K.isolant(0x2a2d31));
      racine.add(c.mesh); return c.mesh;
    });

    /* ---------------------------------------------------------------- l'état */
    const s = { f: 50 };
    let theta = 0.3, cibleTheta = null;
    const majTexte = () => {
      const tps = s.f / RALENTI;
      ctx.mesures([
        { libelle: 'Fréquence', valeur: s.f + ' Hz (' + s.f + ' allers-retours par seconde)' },
        { libelle: 'Un moteur à deux pôles tournerait à', valeur: (s.f * 60) + ' tr/min' },
        { libelle: 'À l’écran (ralenti 25 fois)', valeur: nb(tps, 1) + ' tour' + (tps >= 2 ? 's' : '') + ' par seconde' }
      ]);
      return '<strong>La fréquence, c’est le nombre d’allers-retours par seconde.</strong> L’aimant fait ' + s.f + ' tours par seconde : à chaque tour, le courant fait un aller-retour dans le circuit — ' + s.f + ' Hz. '
        + (s.f === 50 ? '50 Hz : la fréquence du réseau européen. ' : 'Les centrales, elles, tiennent leurs alternateurs pour donner 50 Hz, sans bouger. ')
        + '<em>Ici, le temps est ralenti 25 fois : ' + nb(tps, 1) + ' tour' + (tps >= 2 ? 's' : '') + ' par seconde à l’écran.</em>';
    };
    const agir = (id, v) => {
      if (id === 'freq') { s.f = +v; ctx.regler('freq', s.f); cibleTheta = null; ctx.dire(majTexte()); }
      else if (id === 'demiTour') {
        /* l'aimant tourne jusqu'à présenter ce pôle à la bobine, puis s'arrête */
        const base = v === 'N' ? 0 : Math.PI;
        let c = base; while (c < theta + 0.6) c += Math.PI * 2;
        cibleTheta = c;
        ctx.dire(v === 'N' ? '<strong>Le pôle nord arrive devant la bobine.</strong> Le champ qui traverse la bobine change : un courant naît et part dans un sens (grains vers la lampe par le fil rouge).'
          : '<strong>Le pôle sud arrive à son tour.</strong> Le champ s’inverse : le courant repart dans l’autre sens. Un tour complet = un aller-retour = une période.');
      }
    };
    const phrase0 = majTexte();
    const tracer = () => {
      const N = s.f / 12.5;
      osc.tracer(u => Math.sin(theta - Math.PI * 2 * N * (1 - u)));
    };
    tracer();

    return {
      racine,
      vue: ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 22, zoom: 1.5, cadre: [planche], marge: 0.95, cible: [-40, 70, -20] }
                                    : { azimut: -26, elevation: 26, zoom: 1.35, cadre: [planche], marge: 0.95, cible: [0, 60, 0] },
      phrase: phrase0,
      pieces: [
        { id: 'aimant', nom: 'L’aimant (N rouge, S bleu)', objets: [aimant], desc: 'Il tourne devant la bobine. À chaque tour, la bobine voit passer un pôle nord puis un pôle sud.' },
        { id: 'moteur', nom: 'Le moteur d’entraînement', objets: [moteurB, capotM, arbre], desc: 'Il fait tourner l’aimant. Plus il tourne vite, plus il y a de tours par seconde.' },
        { id: 'bobine', nom: 'La bobine', objets: bobine, desc: 'Du fil de cuivre enroulé. Quand le champ qui la traverse change, un courant y naît.' },
        { id: 'noyau', nom: 'Le noyau de fer', objets: [noyau, support], desc: 'Il guide le champ de l’aimant à travers la bobine.' },
        { id: 'fils', nom: 'Les fils du circuit', objets: [f1.mesh, f2.mesh], desc: 'Ils relient la bobine à la lampe : c’est la boucle où le courant va et vient.' },
        { id: 'lampe', nom: 'La lampe', objets: [lp.groupe], desc: 'Elle s’allume à chaque passage du courant, dans un sens comme dans l’autre.' },
        { id: 'oscillo', nom: 'L’oscilloscope', objets: [osc.groupe, ...sondes], desc: 'Il trace la tension au fil du temps : une vague. Plus la fréquence est grande, plus les vagues sont serrées.' },
        { id: 'grains', nom: 'Le courant (grains dorés)', objets: [grains.objet], desc: 'Les grains avancent, s’arrêtent, repartent en arrière : un aller-retour par tour d’aimant.' },
        { id: 'planche', nom: 'La planche d’essai', objets: [planche], desc: 'Tout le montage est posé dessus.' }
      ],
      commandes: [
        { id: 'freq', type: 'curseur', libelle: 'La fréquence', min: 10, max: 90, pas: 1, unite: 'Hz', valeur: 50 }
      ],
      agir,
      etapes: [
        { titre: 'L’aimant tourne', texte: 'Un moteur fait tourner l’aimant devant la bobine : 50 tours par seconde en vrai, ralentis 25 fois ici.', actions: [['freq', 50]], piece: 'aimant', vue: { azimut: -26, elevation: 30, zoom: 1.6, cible: [-60, 90, -10] } },
        { titre: 'Le pôle nord passe devant la bobine', texte: 'Le champ qui traverse la bobine change : un courant naît et part dans un sens.', actions: [['freq', 20], ['demiTour', 'N']], piece: 'bobine', vue: { azimut: -8, elevation: 50, zoom: 2.2, cible: [-60, 110, -20] } },
        { titre: 'Le pôle sud arrive', texte: 'Le champ s’inverse : le courant repart dans l’autre sens. Un tour = un aller-retour = une période.', actions: [['demiTour', 'S']], piece: 'grains', vue: { azimut: -8, elevation: 50, zoom: 2.2, cible: [-60, 110, -20] } },
        { titre: 'Plus vite, plus d’allers-retours', texte: '90 tours par seconde, 90 allers-retours : 90 Hz. Sur l’écran, les vagues se resserrent.', actions: [['freq', 90]], piece: 'oscillo', vue: { azimut: -34, elevation: 16, zoom: 1.8, cible: [90, 66, -80] } },
        { titre: 'Le réseau : 50 Hz', texte: '50 tours par seconde, 50 Hz : la fréquence du réseau européen. Un moteur à deux pôles y tourne à 3000 tr/min.', actions: [['freq', 50]], piece: 'oscillo', vue: { azimut: -34, elevation: 16, zoom: 1.8, cible: [90, 66, -80] } }
      ],
      eclate: [
        { objets: [aimant], vers: [0, 70, 0] },
        { objets: bobine, vers: [80, 0, 0] }
      ],
      eclateVue: { azimut: -20, elevation: 24, zoom: 1.7, cible: [-40, 110, -20] },
      surEclate(on) { grains.objet.visible = !on; },
      animer(dt) {
        const w = 2 * Math.PI * s.f / RALENTI;
        let vit;
        if (cibleTheta !== null) {
          const reste = cibleTheta - theta;
          const pas = Math.min(reste, dt * w);
          theta += Math.max(0, pas);
          vit = reste > 1e-3 ? 60 * Math.sin(theta) : 0;
        } else { theta += dt * w; vit = 60 * Math.sin(theta); }
        aimant.rotation.y = -theta;
        grains.regler({ vitesse: vit });
        grains.animer(dt);
        lp.regler(0.25 + 0.85 * Math.abs(Math.sin(theta)) * (cibleTheta !== null && cibleTheta - theta < 1e-3 ? 0.4 : 1));
        tracer();
        return cibleTheta === null || cibleTheta - theta > 1e-3;
      }
    };
  }, { famille: 'grandeurs', titre: 'L’alternateur', stations: ['1.6'] });
})();
