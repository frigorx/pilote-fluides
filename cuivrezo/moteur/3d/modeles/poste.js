/* CuivRézo — le POSTE DE FAÇONNAGE : la porte d'entrée du réseau, en 3D (03/10/2026).

   Un coin d'atelier : le rack des tubes (couronne, barres bouchées), l'établi et son étau, le panneau
   d'outils (cintrette, cintreuse, coupe-tube, ébavureur, pince à emboîture, équerre), la dudgeonnière,
   le poste de brasage (pare-flamme, chalumeau propane, étain, azote) et le chariot oxyacétylénique.
   Chaque ZONE ouvre ses stations ; la table zone → stations est dans donnees/commun.js (zonesPoste).

   Les outils sont AU REPOS (accrochés, posés) : aucun geste n'est montré ici, les gestes vivent dans
   les stations. Les petits outils à main sont grossis de 30 % pour rester reconnaissables de loin.
   Couleurs des bouteilles : celles que la station 2.1 enseigne — ogive blanche pour l'oxygène, marron
   pour l'acétylène (corps neutres), tuyau bleu pour l'oxygène, rouge pour l'acétylène. */
(() => {
  'use strict';

  Electro3D.definir('poste', (T, K, ctx) => {
    const M = K.mat, D2R = Math.PI / 180;
    const racine = new T.Group();
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const P = (w, h, d, mat, x, y, z) => K.mesh(K.boite(w, h, d, 0), mat, x, y, z);
    const Pr = (w, h, d, r, mat, x, y, z) => K.mesh(K.boite(w, h, d, r), mat, x, y, z);
    const G = (...o) => K.groupe(...o);
    const ici = (g, x, y, z) => { g.position.set(x, y, z); return g; };
    const tuyau = (pts, r, mat, pas) => K.fil(pts.map(p => V(...p)), r, mat, { pas: pas || 8, radial: 12 }).mesh;
    /* un cône ou un tronc de cône, axe Y */
    const cone = (rHaut, rBas, h, mat, x, y, z) => K.mesh(new T.CylinderGeometry(rHaut, rBas, h, 28), mat, x, y, z);
    /* une bouteille tournée, axe Y, pied à y = 0 : le corps, puis l'ogive (la couleur qui dit le gaz) */
    const bouteille = (r, h, mCorps, mOgive) => {
      const v2 = l => l.map(([a, b]) => new T.Vector2(a, b));
      const hc = h * 0.78;
      const corps = K.mesh(new T.LatheGeometry(v2([[0, 0], [r * 0.96, 0], [r, 6], [r, hc]]), 48), mCorps);
      const ogive = K.mesh(new T.LatheGeometry(v2([[r, hc], [r * 0.97, hc + h * 0.05], [r * 0.82, hc + h * 0.11], [r * 0.5, hc + h * 0.17],
        [r * 0.3, hc + h * 0.19], [r * 0.3, h], [0, h]]), 48), mOgive);
      return G(corps, ogive);
    };
    /* un tube cintré : des droites et des arcs dans un plan (u, v), puis posé dans l'espace */
    const cintrer = (morceaux, vers3d) => {
      const pts = [[0, 0]]; let u = 0, v = 0, h = 0;
      for (const m of morceaux) {
        if (m[0] === 'd') {
          const n = Math.max(1, Math.ceil(m[1] / 12));
          for (let i = 1; i <= n; i++) pts.push([u + Math.cos(h) * m[1] * i / n, v + Math.sin(h) * m[1] * i / n]);
          u += Math.cos(h) * m[1]; v += Math.sin(h) * m[1];
        } else {
          const a = m[1] * D2R, R = m[2], s = Math.sign(a);
          const cx = u - Math.sin(h) * R * s, cy = v + Math.cos(h) * R * s, a0 = h - s * Math.PI / 2;
          const n = Math.max(6, Math.ceil(Math.abs(a) * R / 6));
          for (let i = 1; i <= n; i++) { const t = a0 + a * i / n; pts.push([cx + Math.cos(t) * R, cy + Math.sin(t) * R]); }
          h += a; [u, v] = pts[pts.length - 1];
        }
      }
      return pts.map(([a, b]) => vers3d(a, b));
    };

    /* matières */
    const mMur = K.plastique(0xefe7da, 0.95), mPanneau = K.plastique(0xc9d6e3, 0.8), mBois = K.plastique(0xd9bf98, 0.8);
    const mBleu = K.plastique(0x2f5d8a, 0.5), mGris = K.plastique(0x8d9aa8, 0.6), mTapis = K.plastique(0x3b3f45, 0.9);
    const mCorpsGaz = K.metal(0x8a929b, 0.45), mOgiveO2 = K.plastique(0xf4f2ec, 0.4), mOgiveC2H2 = K.plastique(0x6b3a2a, 0.45);
    const mOgiveN2 = K.plastique(0x1f2226, 0.45), mEcran = K.metal(0xb9c0c7, 0.5), mJaune = K.propre(M.plastiqueJaune);
    const mFace = K.plastique(0xfbfaf6, 0.3), mBaguette = K.metal(0xc9a46a, 0.35), mEtain = K.metal(0xd7dbe0, 0.3);
    const mLunette = K.lumineux(0xbfe3f5, 0.45), mGant = K.plastique(0x8d9aa8, 0.85), mGantPoignet = K.plastique(0x1b3a63, 0.7);

    /* ---------------------------------------------------------------- le mur */
    racine.add(P(3900, 2300, 10, mMur, 0, 1150, -5));

    /* ---------------------------------------------------------------- 1. le rack des tubes */
    const rack = G(
      ...[[-1820, 60], [-1380, 60], [-1820, 440], [-1380, 440]].map(([x, z]) => P(36, 1500, 36, M.zingue, x, 750, z)),
      P(480, 22, 420, M.zingue, -1600, 360, 250), P(480, 22, 420, M.zingue, -1600, 900, 250)
    );
    /* la couronne : un tube recuit enroulé, couché sur l'étagère du bas */
    const couronne = G(...[0, 1, 2, 3, 4, 5].map(i => {
      const t = K.mesh(K.tore(185 - (i % 2) * 6, 7, 10, 64), M.cuivre, -1600, 380 + i * 13, 250);
      t.rotation.x = Math.PI / 2; return t;
    }));
    /* les barres droites, bouchées, sur leurs consoles au mur */
    const consoles = G(...[-1800, -1400].map(x => G(P(30, 420, 20, M.zingue, x, 1450, 12),
      ...[0, 1, 2, 3].map(i => P(24, 18, 200, M.zingue, x, 1300 + i * 100, 110)))));
    const barres = G(...[0, 1, 2, 3].map(i => G(
      K.cylX(9 + i, 640, M.cuivre, -1600, 1318 + i * 100, 120 + i * 8),
      K.cylX(10 + i, 18, mJaune, -1929, 1318 + i * 100, 120 + i * 8), K.cylX(10 + i, 18, mJaune, -1271, 1318 + i * 100, 120 + i * 8))));
    racine.add(rack, couronne, consoles, barres);

    /* ---------------------------------------------------------------- l'établi */
    const XE = -450, LE = 1600, ZE = 380, PE = 700, YE = 900;      /* centre x, longueur, centre z, profondeur, dessus */
    const etabli = G(
      Pr(LE, 40, PE, 6, mBois, XE, YE - 20, ZE),
      ...[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([a, b]) => P(60, YE - 40, 60, mBleu, XE + a * (LE / 2 - 50), (YE - 40) / 2, ZE + b * (PE / 2 - 50))),
      P(LE - 100, 50, 40, mBleu, XE, 180, ZE + PE / 2 - 50), P(LE - 100, 50, 40, mBleu, XE, 180, ZE - PE / 2 + 50),
      P(LE - 100, 60, 30, mBleu, XE, YE - 70, ZE + PE / 2 - 30),
      /* le bloc tiroirs, à droite */
      P(340, 600, PE - 80, mGris, XE + LE / 2 - 260, YE - 360, ZE),
      ...[0, 1, 2].map(i => G(P(320, 180, 8, mBleu, XE + LE / 2 - 260, YE - 160 - i * 195, ZE + PE / 2 - 36),
        P(120, 16, 20, M.zingue, XE + LE / 2 - 260, YE - 120 - i * 195, ZE + PE / 2 - 22)))
    );
    racine.add(etabli);

    /* l'étau, au bout de l'établi */
    const etau = G(
      Pr(130, 50, 190, 8, mBleu, 0, 25, 0),
      Pr(170, 120, 80, 10, mBleu, 0, 110, -40), Pr(170, 110, 80, 10, mBleu, 0, 105, 70),
      P(160, 44, 8, M.zingue, 0, 148, 1), P(160, 44, 8, M.zingue, 0, 148, 29),
      K.cylZ(14, 220, M.acier, 0, 90, 150), K.cylX(8, 220, M.acier, 0, 90, 262),
      K.mesh(K.sphere(13), M.acierSombre, -110, 90, 262), K.mesh(K.sphere(13), M.acierSombre, 110, 90, 262)
    );
    ici(etau, 230, YE, 560);
    racine.add(etau);

    /* ---------------------------------------------------------------- 2. mon poste : protections, fiche, bac */
    const lunettes = G(P(150, 10, 10, M.plastiqueNoir, 0, 0, 0),
      K.cylZ(26, 4, mLunette, -38, -14, 3), K.cylZ(26, 4, mLunette, 38, -14, 3),
      P(8, 8, 140, M.plastiqueNoir, -72, 0, -70), P(8, 8, 140, M.plastiqueNoir, 72, 0, -70));
    lunettes.rotation.x = -1.2; ici(lunettes, -60, YE + 30, 640);
    const gant = (x, z, rot) => {
      const g = G(Pr(95, 26, 150, 10, mGant, 0, 13, 0), Pr(100, 30, 80, 10, mGantPoignet, 0, 15, 110),
        ...[-33, -11, 11, 33].map((u, i) => K.mesh(K.boite(20, 20, 70 - Math.abs(i - 1.5) * 10, 9), mGant, u, 12, -105 + Math.abs(i - 1.5) * 5)),
        K.mesh(K.boite(22, 20, 60, 9), mGant, 58, 12, -20));
      g.rotation.y = rot; return ici(g, x, YE, z);
    };
    const gants = G(gant(80, 470, 0.3), gant(150, 640, -0.2));
    /* la fiche de sécurité, punaisée au panneau */
    const fiche = G(P(210, 297, 3, M.plastiqueBlanc, 0, 0, 0),
      P(150, 16, 2, M.plastiqueOrange, 0, 115, 2),
      ...[0, 1, 2, 3, 4, 5].map(i => P(i % 2 ? 120 : 160, 6, 2, M.plastiqueSombre, -10, 70 - i * 32, 2)),
      ...[0, 1, 2, 3, 4, 5].map(i => P(14, 14, 3, M.plastiqueSombre, 82, 70 - i * 32, 2)));
    ici(fiche, 120, 1330, 26);
    /* le bac à chutes, au pied de l'établi : les chutes debout */
    const bac = G(P(300, 14, 240, mGris, 0, 7, 0), P(300, 220, 10, mGris, 0, 110, -115), P(300, 220, 10, mGris, 0, 110, 115),
      P(10, 220, 240, mGris, -145, 110, 0), P(10, 220, 240, mGris, 145, 110, 0),
      ...[[-90, -40, 260, 0.08], [-40, 30, 300, -0.1], [20, -30, 230, 0.12], [80, 40, 280, -0.06], [110, -60, 200, 0.05]]
        .map(([x, z, h, a]) => { const c = K.cylY(8, h, M.cuivre, x, h / 2 + 14, z); c.rotation.z = a; return c; }));
    ici(bac, 520, 0, 760);
    racine.add(lunettes, gants, fiche, bac);

    /* ---------------------------------------------------------------- le panneau d'outils, au mur */
    const YP = 1420;
    const panneau = G(P(1500, 720, 16, mPanneau, -440, YP, 8),
      ...[-1160, 280].map(x => P(30, 720, 30, M.zingue, x, YP, 18)));
    const crochet = (x, y) => K.cylZ(5, 50, M.zingue, x, y, 40);
    racine.add(panneau);

    /* 3. la cintrette, d'après le croquis de Franck (images/consignes/1-4-cintrette-reference.png) : la roue en haut,
       la poignée fixe verticale sous la roue et son crochet, le bras mobile à droite qui prolonge le guide */
    const cintrette = G(
      K.cylZ(72, 22, M.zingue, 0, 0, 0), K.mesh(K.tore(72, 7, 10, 48), M.acierSombre, 0, 0, 0),
      ...[0, 1, 2, 3, 4, 5].map(i => K.cylZ(13, 24, M.sombre, Math.cos(i * Math.PI / 3) * 42, Math.sin(i * Math.PI / 3) * 42, 0)),
      K.cylZ(14, 30, M.acierSombre, 0, 0, 2),
      P(26, 400, 16, M.acier, -30, -215, -14), K.cylY(17, 130, M.caoutchouc, -30, -360, -14),
      Pr(36, 46, 28, 4, M.acierSombre, -58, 66, -4)   /* le crochet, en haut à gauche de la roue (croquis de Franck, 01/10) */
    );
    const brasCintrette = G(P(26, 380, 16, M.acier, 0, -190, 0), Pr(40, 70, 30, 6, M.acierSombre, 0, -95, 6),
      K.cylY(17, 130, M.caoutchouc, 0, -330, 0));
    brasCintrette.position.set(0, 0, 18); brasCintrette.rotation.z = 0.32;
    cintrette.add(brasCintrette);
    ici(cintrette, -1000, 1660, 54);

    /* 4. la cintreuse : le galet et son rapporteur, la poignée fixe, le long bras de levier à poignée orange */
    const rapporteur = K.mesh(new T.CircleGeometry(84, 36, 0, Math.PI), mFace, 0, 0, 16);
    const graduations = G(...Array.from({ length: 13 }, (_, i) => {
      const a = i * 15 * D2R, g = P(2.5, 14, 2, M.plastiqueSombre, Math.cos(a) * 74, Math.sin(a) * 74, 18);
      g.rotation.z = a - Math.PI / 2; return g;
    }));
    const levier = G(P(28, 500, 18, M.acier, 0, -250, 0), Pr(46, 120, 36, 6, M.acierSombre, 0, -110, 8),
      K.cylY(19, 150, M.plastiqueOrange, 0, -440, 0));
    levier.position.set(0, 0, 26); levier.rotation.z = 0.45;
    const cintreuse = G(
      K.cylZ(52, 26, M.acierSombre, 0, 0, 0), K.mesh(K.tore(52, 7, 10, 48), M.acier, 0, 0, 0), rapporteur, graduations,
      P(28, 360, 18, M.acier, 0, -190, -16), K.cylY(18, 130, M.caoutchouc, 0, -330, -16),
      Pr(34, 40, 26, 4, M.acierSombre, -66, 4, -4), levier
    );
    cintreuse.rotation.z = -0.08;
    ici(cintreuse, -690, 1660, 56);

    /* 5. le coupe-tube et l'ébavureur */
    const coupeTube = G(
      Pr(22, 120, 26, 4, M.zingue, -45, 0, 0), Pr(90, 22, 26, 4, M.zingue, 0, 50, 0), Pr(90, 22, 26, 4, M.zingue, 0, -50, 0),
      K.cylZ(11, 20, M.acier, -12, 36, 0), K.cylZ(11, 20, M.acier, 22, 36, 0),
      K.cylZ(15, 4, M.acier, 5, -34, 0), K.cylY(14, 50, M.plastiqueRouge, 5, -88, 0)
    );
    coupeTube.scale.setScalar(1.3); ici(coupeTube, -430, 1560, 50);
    const ebavureur = G(K.cylY(12, 120, M.plastiqueBleu, 0, 0, 0), K.cylY(7, 20, M.acier, 0, 68, 0),
      tuyau([[0, 76, 0], [0, 110, 0], [8, 128, 0], [26, 126, 0]], 2.6, M.acier, 4));
    ebavureur.scale.setScalar(1.3); ici(ebavureur, -330, 1440, 50);
    racine.add(crochet(-430, 1640), crochet(-330, 1540));

    /* 6. la pince à emboîture : la tête et son expanseur, deux longues poignées */
    const pince = G(
      Pr(56, 70, 28, 8, M.acierSombre, 0, 0, 0), cone(9, 15, 56, M.acier, 0, 62, 0), K.cylY(17, 14, M.acier, 0, 30, 0),
      ...[-1, 1].map(s => { const b = G(P(18, 320, 14, M.acier, 0, -160, 0), K.cylY(13, 150, M.plastiqueRouge, 0, -250, 0));
        b.position.set(s * 12, -30, 0); b.rotation.z = s * 0.07; return b; })
    );
    pince.scale.setScalar(1.3); ici(pince, -150, 1640, 46);

    /* 7. le mètre, l'équerre et le feutre — et le tube tracé, sur l'établi */
    const equerre = G(P(30, 320, 6, M.acier, 0, 0, 0), P(210, 30, 6, M.acier, 90, -145, 0),
      ...Array.from({ length: 15 }, (_, i) => P(i % 5 ? 8 : 14, 1.5, 2, M.plastiqueSombre, 11, 150 - i * 20, 4)));
    ici(equerre, 60, 1540, 24);
    const metre = G(Pr(78, 78, 38, 10, mJaune, 0, 39, 0), K.cylZ(22, 40, M.plastiqueNoir, 0, 39, 0), P(110, 3, 20, mJaune, 90, 3, 0));
    ici(metre, -1060, YE, 640);
    const feutre = G(K.cylX(7, 130, M.plastiqueNoir, 0, 7, 0), K.cylX(8, 40, M.plastiqueRouge, 80, 7, 0));
    feutre.rotation.y = 0.4; ici(feutre, -720, YE, 650);
    const tubeTrace = G(K.cylX(8, 640, M.cuivre, 0, 8, 0));
    const trait = K.mesh(K.tore(8.4, 1, 6, 32), M.sombre, 110, 8, 0); trait.rotation.y = Math.PI / 2;
    tubeTrace.add(trait); ici(tubeTrace, -700, YE, 530);
    racine.add(equerre, metre, feutre, tubeTrace);

    /* 8. la dudgeonnière : la barre-bloc percée et son étrier à vis */
    const dudgeon = G(
      Pr(210, 28, 36, 3, M.zingue, 0, 14, 0),
      ...[-75, -45, -15, 15, 45, 75].map((x, i) => K.cylY(4 + i * 0.8, 2, M.sombre, x, 29, 0)),
      ...[-1, 1].map(s => G(K.cylY(5, 50, M.acier, s * 118, 20, 0), P(36, 10, 8, M.acier, s * 118, 48, 0))),
      P(14, 96, 14, M.acier, -40, 76, 0), P(14, 96, 14, M.acier, 40, 76, 0), Pr(110, 20, 20, 3, M.acier, 0, 128, 0),
      K.cylY(6, 120, M.acier, 0, 120, 0), cone(1, 9, 16, M.acier, 0, 54, 0), K.cylX(6, 130, M.acier, 0, 182, 0)
    );
    dudgeon.scale.setScalar(1.3); ici(dudgeon, -310, YE, 430);
    racine.add(cintrette, cintreuse, coupeTube, ebavureur, pince, dudgeon);

    /* 9. les pièces façonnées : le chapeau de gendarme debout au-dessus de son obstacle, la baïonnette à plat */
    const XP = -1230;
    const chapeau = tuyau(cintrer([['d', 160], ['a', 45, 45], ['d', 40], ['a', -90, 45], ['d', 40], ['a', 45, 45], ['d', 160]],
      (u, v) => [XP + u, YE + 8 + v, 150]), 8, M.cuivre, 6);
    const obstacle = K.cylZ(18, 160, mGris, XP + 160 + 2 * 45 * Math.sin(45 * D2R) + 40 * Math.cos(45 * D2R), YE + 18, 150);
    const baionnette = tuyau(cintrer([['d', 200], ['a', 45, 45], ['d', 70], ['a', -45, 45], ['d', 200]],
      (u, v) => [XP + u, YE + 8, 330 - v]), 8, M.cuivre, 6);
    racine.add(chapeau, obstacle, baionnette);

    /* ---------------------------------------------------------------- le poste de brasage */
    const XB = 860, ZB = 400, YB = 850;
    const tableBrasage = G(
      P(620, 30, 620, M.zingue, XB, YB - 15, ZB),
      ...[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([a, b]) => P(40, YB - 30, 40, M.zingue, XB + a * 280, (YB - 30) / 2, ZB + b * 280)),
      P(560, 6, 560, mTapis, XB, YB + 3, ZB)
    );
    const ecran = G(P(420, 320, 6, mEcran, XB, YB + 166, ZB - 230),
      P(6, 320, 210, mEcran, XB - 210, YB + 166, ZB - 125), P(6, 320, 210, mEcran, XB + 210, YB + 166, ZB - 125),
      ...Array.from({ length: 6 }, (_, i) => P(380, 3, 2, M.acierSombre, XB, YB + 40 + i * 50, ZB - 226)));
    const supportsV = G(...[-90, 90].map(x => G(P(50, 40, 70, M.acierSombre, XB + x, YB + 26, ZB + 20),
      P(20, 12, 70, M.sombre, XB + x, YB + 47, ZB + 20))));
    const tubeBrase = G(K.cylX(8, 420, M.cuivre, XB, YB + 60, ZB + 20), K.cylX(9.6, 34, M.cuivre, XB + 10, YB + 60, ZB + 20));
    const anneauEtain = K.mesh(K.tore(9.4, 1.6, 6, 32), mEtain, XB - 7, YB + 60, ZB + 20); anneauEtain.rotation.y = Math.PI / 2;
    tubeBrase.add(anneauEtain);
    /* 10. le chalumeau propane à cartouche et la bobine d'étain */
    const propane = G(K.cylX(36, 190, M.plastiqueBleu, 0, 36, 0), K.cylX(20, 40, M.laiton, 115, 36, 0),
      K.cylZ(9, 30, M.plastiqueNoir, 118, 36, 28),
      tuyau([[135, 36, 0], [230, 36, 0], [270, 50, 0], [300, 72, 0]], 6, M.acier, 5), K.cylX(10, 34, M.laiton, 310, 78, 0));
    propane.rotation.y = -0.15; ici(propane, XB - 230, YB + 6, ZB + 200);
    const etain = G(K.cylY(34, 30, mEtain, 0, 15, 0), K.cylY(12, 34, M.plastiqueNoir, 0, 17, 0),
      tuyau([[30, 20, 0], [70, 8, 10], [110, 3, 30]], 1.4, mEtain, 4));
    ici(etain, XB + 150, YB + 6, ZB + 200);
    racine.add(tableBrasage, ecran, supportsV, tubeBrase, propane, etain);

    /* 11. l'azote : bouteille à ogive noire, détendeur, débitmètre, tuyau jusqu'au tube ; les baguettes */
    const XN = 1280, ZN = 170;
    const azote = G(ici(bouteille(95, 1250, mCorpsGaz, mOgiveN2), 0, 0, 0),
      K.cylY(16, 70, M.laiton, 0, 1285, 0), Pr(60, 50, 44, 6, M.laiton, 0, 1330, 30),
      K.cylZ(30, 18, M.acierSombre, 0, 1385, 40), K.cylZ(26, 3, mFace, 0, 1385, 50),
      K.cylY(9, 110, mLunette, 50, 1330, 50), P(14, 14, 14, M.laiton, 50, 1270, 50));
    ici(azote, XN, 0, ZN);
    const tuyauAzote = tuyau([[XN + 50, 1265, ZN + 50], [XN + 60, 1100, ZN + 140], [XN - 20, 960, ZN + 260], [XB + 230, YB + 60, ZB + 20]], 6, M.plastiqueNoir, 10);
    const baguettes = G(...[0, 1, 2, 3, 4].map(i => K.cylX(1.6, 500, mBaguette, XB, YB + 9 + (i % 2) * 3, ZB - 90 + i * 5)));
    racine.add(azote, tuyauAzote, baguettes);

    /* ---------------------------------------------------------------- 12. le chariot oxyacétylénique */
    const XC = 1650, ZC = 340;
    const chariot = G(
      P(560, 18, 280, M.acierSombre, XC, 60, ZC),
      K.cylY(14, 1320, M.acierSombre, XC - 275, 720, ZC - 140), K.cylY(14, 1320, M.acierSombre, XC + 275, 720, ZC - 140),
      K.cylX(14, 560, M.acierSombre, XC, 1380, ZC - 140), K.cylX(10, 560, M.acierSombre, XC, 300, ZC - 140),
      K.cylX(12, 640, M.acier, XC, 100, ZC - 170),
      K.cylX(100, 50, M.caoutchouc, XC - 330, 100, ZC - 170), K.cylX(100, 50, M.caoutchouc, XC + 330, 100, ZC - 170),
      K.cylX(40, 54, M.zingue, XC - 330, 100, ZC - 170), K.cylX(40, 54, M.zingue, XC + 330, 100, ZC - 170),
      /* la chaîne qui arrime les bouteilles */
      P(560, 12, 8, M.acierSombre, XC, 820, ZC + 104), P(560, 12, 8, M.acierSombre, XC, 480, ZC + 104)
    );
    const posteGaz = (x, mOgive) => G(ici(bouteille(100, 1150, mCorpsGaz, mOgive), x, 70, ZC),
      K.cylY(16, 60, M.laiton, x, 70 + 1180, ZC), K.cylY(30, 10, M.acierSombre, x, 70 + 1215, ZC),
      Pr(56, 56, 44, 6, M.laiton, x, 70 + 1180, ZC + 40),
      ...[-34, 34].map(dx => G(K.cylZ(30, 18, M.acierSombre, x + dx, 70 + 1240, ZC + 56), K.cylZ(26, 3, mFace, x + dx, 70 + 1240, ZC + 66))));
    const o2 = posteGaz(XC - 120, mOgiveO2), c2h2 = posteGaz(XC + 120, mOgiveC2H2);
    /* le chalumeau, accroché au montant droit, ses clapets anti-retour, et les deux tuyaux */
    const chalumeau = G(K.cylY(13, 230, M.laiton, 0, 0, 0), K.cylZ(9, 26, M.plastiqueBleu, -18, -60, 0), K.cylZ(9, 26, M.plastiqueRouge, 18, -60, 0),
      tuyau([[0, 115, 0], [0, 200, 0], [20, 250, 10], [60, 270, 20]], 4.5, M.cuivre, 4), K.cylY(6, 30, M.laiton, -6, -125, 0), K.cylY(6, 30, M.laiton, 6, -125, 0));
    ici(chalumeau, XC + 330, 1060, ZC - 120);
    const tO2 = tuyau([[XC - 120, 1240, ZC + 70], [XC - 100, 1000, ZC + 200], [XC - 40, 400, ZC + 240], [XC + 200, 300, ZC + 160], [XC + 324, 900, ZC - 110], [XC + 324, 930, ZC - 120]], 7, M.plastiqueBleu, 12);
    const tC2H2 = tuyau([[XC + 120, 1240, ZC + 70], [XC + 140, 1000, ZC + 200], [XC + 120, 420, ZC + 250], [XC + 260, 320, ZC + 170], [XC + 336, 900, ZC - 110], [XC + 336, 930, ZC - 120]], 7, M.plastiqueRouge, 12);
    /* l'extincteur, repéré avant d'allumer */
    const extincteur = G(K.cylY(80, 480, M.plastiqueRouge, 0, 240, 0), K.mesh(K.sphere(80, 24), M.plastiqueRouge, 0, 480, 0),
      K.cylY(20, 60, M.plastiqueNoir, 0, 560, 0), Pr(90, 16, 30, 4, M.plastiqueNoir, 30, 600, 0),
      tuyau([[0, 580, 20], [60, 520, 90], [90, 300, 100]], 8, M.plastiqueNoir, 8));
    ici(extincteur, 1290, 0, 640);
    racine.add(chariot, o2, c2h2, chalumeau, tO2, tC2H2, extincteur);

    /* ---------------------------------------------------------------- les zones (même id que donnees/commun.js) */
    const pieces = [
      { id: 'poste', nom: 'Mon poste de travail', objets: [etabli, etau, lunettes, gants, fiche, bac], ancre: [80, YE + 40, 640], desc: 'L’établi, l’étau, les lunettes, les gants, la fiche de sécurité, le bac à chutes.' },
      { id: 'tubes', nom: 'Les tubes, en couronne et en barre', objets: [rack, couronne, consoles, barres], ancre: [-1600, 480, 300], desc: 'La couronne de tube recuit et les barres bouchées.' },
      { id: 'tracer', nom: 'Le mètre, l’équerre et le feutre', objets: [equerre, metre, feutre, tubeTrace], ancre: [-700, YE + 20, 560], desc: 'Mesurer, tracer à la cote, sur tout le tour.' },
      { id: 'couper', nom: 'Le coupe-tube et l’ébavureur', objets: [coupeTube, ebavureur], ancre: [-380, 1500, 70], desc: 'Couper d’équerre, puis ébavurer.' },
      { id: 'cintrette', nom: 'La cintrette', objets: [cintrette], ancre: [-1000, 1660, 80], desc: 'La roue, la poignée fixe et son crochet, le bras mobile.' },
      { id: 'cintreuse', nom: 'La cintreuse', objets: [cintreuse], ancre: [-690, 1660, 90], desc: 'Le galet gradué et le long bras de levier.' },
      { id: 'dudgeon', nom: 'La dudgeonnière', objets: [dudgeon], ancre: [-310, YE + 160, 440], desc: 'La barre-bloc et l’étrier à vis.' },
      { id: 'pince', nom: 'La pince à emboîture', objets: [pince], ancre: [-150, 1650, 70], desc: 'La tête et son expanseur, les deux poignées.' },
      { id: 'oxy', nom: 'Le poste oxyacétylénique', objets: [chariot, o2, c2h2, chalumeau, tO2, tC2H2, extincteur], ancre: [XC, 1300, ZC + 80], desc: 'Ogive blanche : l’oxygène. Ogive marron : l’acétylène. Tuyau bleu, tuyau rouge.' },
      { id: 'tendre', nom: 'Le chalumeau propane et l’étain', objets: [tableBrasage, ecran, supportsV, tubeBrase, propane, etain], ancre: [XB - 100, YB + 100, ZB + 200], desc: 'Le pare-flamme, la cartouche de propane, le fil d’étain.' },
      { id: 'azote', nom: 'L’azote, pour braser fort', objets: [azote, tuyauAzote, baguettes], ancre: [XN, 1150, ZN + 100], desc: 'Ogive noire : l’azote. Les baguettes de cuivre-phosphore.' },
      { id: 'pieces', nom: 'Les pièces façonnées', objets: [chapeau, obstacle, baionnette], ancre: [XP + 250, YE + 70, 200], desc: 'Le chapeau de gendarme, la baïonnette.' }
    ];

    return {
      racine, pieces,
      legendeTitre: 'Les zones',
      commandes: [],
      agir: () => {}, animer: () => false, fantome: [],
      vue: { cadre: [rack, etabli, panneau, tableBrasage, chariot, azote], azimut: 0, elevation: 12, zoom: 1.9, cible: [-60, 1000, 300] },
      reperesCote: null,
      phrase: 'Un poste de façonnage du cuivre. Cliquez sur un outil : ses stations s’ouvrent.',
      etapes: []
    };
  }, { titre: 'Le poste de façonnage' });
})();
