/* inerWeb — LES DÉTENDEURS, gare 1 : le détendeur thermostatique à égalisation interne, en 3D.
   Moteur : celui d'ÉlectroRézo (electrorezo/stations/_commun/3d/), lu et réemployé, jamais modifié.
   Unités : millimètres. Repère : X vers la droite (le fluide va de la gauche vers la droite),
   Y vers le haut, Z vers l'élève (+Z = face avant).

   CE QUE L'ÉLÈVE DOIT COMPRENDRE (consigne de Franck : comprendre le mouvement d'abord)
   · L'objet fermé est celui de l'atelier : corps en laiton, deux tubes à braser, tête ronde en acier,
     capillaire, bulbe serré par son collier sur le tube de sortie de l'évaporateur.
   · L'éclaté suit l'ordre du démontage : bulbe, tête (avec sa tige), puis, par le bas, capuchon, vis,
     ressort, clapet.
   · La coupe montre le chemin du fluide : liquide HP (orangé, volume translucide continu) qui entre par
     le bas, passe l'orifice, puis mélange plus clair (BP) avec de petites bulles qui NAISSENT à
     l'orifice ; vapeur en petites molécules dans l'évaporateur et le tube de sortie.
   · Le mouvement : la sortie chauffe → le bulbe chauffe → sa pression monte (impulsions dans le
     capillaire) → la membrane pousse → la tige ouvre le clapet → plus de liquide → la sortie refroidit
     → la pression du bulbe baisse → le ressort referme.

   LE MODÈLE PHYSIQUE (qualitatif, jamais de chiffres de chantier) : une petite boucle bouclée.
     charge thermique → front de liquide dans l'évaporateur → température de sortie (surchauffe)
     → pression du bulbe → équilibre de la membrane (bulbe contre évaporation + ressort) → ouverture
     du clapet → débit → front de liquide… Chaque grandeur suit la suivante avec un retard ; le récit
     pas à pas coupe volontairement certains liens pour que chaque étape ne montre qu'un évènement.

   Un seul modèle, cinq « programmes » (options.ecran) choisis par l'écran du module :
     reconnaitre — fermé, éclaté, coupe (3 étapes) · pieces — coupe, survol des pièces ·
     debit — faible, moyenne, forte ouverture · forces — trois états de la membrane ·
     boucle — la boucle de régulation en 6 étapes + chaud/froid. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  Electro3D.definir('detendeurThermo', (T, K, ctx) => {
    const opt = ctx.options || {};
    const PROG = ({ reconnaitre: 1, pieces: 1, debit: 1, forces: 1, boucle: 1 })[opt.ecran] ? opt.ecran : 'pieces';
    const M = K.mat, clamp = K.clamp;
    const racine = new T.Group();
    const std = (c, r, m, x) => new T.MeshStandardMaterial(Object.assign({ color: c, roughness: r, metalness: m || 0 }, x || {}));
    const mesh = (g, m, x, y, z) => { const o = new T.Mesh(g, m); if (x !== undefined) o.position.set(x, y || 0, z || 0); return o; };
    const sansOmbre = o => { o.traverse(n => { n.userData.sansOmbre = true; }); return o; };
    const lisser = (a, b, t) => { const u = clamp((t - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };

    /* ------------------------------------------------------------------ la coupe : plan z = 0
       Tout ce qui est « mince » (tubes, coques, bulbe) est coupé par un plan (la moitié avant disparaît) ;
       le corps de laiton, lui, est refait en tranche (rectangles creusés). */
    const PLAN = new T.Plane(new T.Vector3(0, 0, -1), 0);
    const aCouper = [];
    const coupable = m => { m.side = T.DoubleSide; aCouper.push(m); return m; };
    const faces = [];                       /* les faces de coupe : visibles seulement en coupe */

    /* ------------------------------------------------------------------ matières */
    /* la coupe se reconnaît aux hachures : un trait à 45° tous les 2 mm, comme sur un dessin technique */
    const hachure = (fond, trait) => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'); x.fillStyle = fond; x.fillRect(0, 0, 64, 64);
      x.strokeStyle = trait; x.lineWidth = 5; x.lineCap = 'butt';
      [[-8, 40, 40, -8], [24, 72, 72, 24], [-8, 8, 8, -8], [56, 72, 72, 56]].forEach(l => { x.beginPath(); x.moveTo(l[0], l[1]); x.lineTo(l[2], l[3]); x.stroke(); });
      x.beginPath(); x.moveTo(0, 64); x.lineTo(64, 0); x.stroke();
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
    };
    const laitonCoupe = std(0xffffff, 0.7, 0, { map: hachure('#ecc474', '#a97a2a') });
    const PAS_HACHURE = 3.2;                                 /* mm par motif */
    /* UV en millimètres : les hachures se prolongent d'un rectangle au suivant */
    const uvMillimetres = (geo, cx, cy) => {
      const uv = geo.attributes.uv, p = geo.attributes.position;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, (cx + p.getX(i)) / PAS_HACHURE, (cy + p.getY(i)) / PAS_HACHURE);
    };
    const laitonCavite = std(0xc89a45, 0.42, 0.85);
    const metalCoupe = std(0xe2e6e9, 0.5, 0.25, { side: T.DoubleSide });
    const cuivreCoupe = std(0xefb086, 0.55, 0.2, { side: T.DoubleSide });
    const laitonFerme = M.laiton.clone();
    const cuivre = coupable(M.cuivre.clone());
    const cuivreTube = coupable(M.cuivre.clone()); cuivreTube.vertexColors = true;   /* même cuivre que les raccords : aucun changement de teinte à la jonction */
    const cuivreBulbe = coupable(std(0xd8875a, 0.28, 1, { emissive: 0x000000 }));
    const inox = coupable(K.metal(0xd3d8dc, 0.26).clone());
    const inoxSombre = coupable(M.acierSombre.clone());
    const laitonCoque = coupable(M.laiton.clone());
    const zingue = coupable(M.zingue.clone());
    const noir = std(0x23262a, 0.8, 0);
    const acier = std(0x8d98a3, 0.3, 0.95);

    const fl = (c, op, x) => std(c, 0.08, 0, Object.assign({ transparent: true, opacity: op, depthWrite: false }, x || {}));
    const matHP = fl(0xff7a10, 0.84, { emissive: 0xb04000, emissiveIntensity: 0.55 });
    const matHPc = coupable(matHP.clone());
    const matMelange = fl(0x2f9be8, 0.7, { emissive: 0x1a6fb0, emissiveIntensity: 0.5 });
    const matVapeur = fl(0x74bff0, 0.78, { emissive: 0x2a7fb0, emissiveIntensity: 0.35 });
    /* CONVENTION DE LA LIGNE « LES DÉTENDEURS » : la charge du bulbe et sa pression sont VIOLETTES (#8e44ad) ; l'orangé est réservé au
       liquide HP. Le bulbe, le capillaire et la chambre au-dessus de la membrane sont remplis du même violet, d'un seul tenant. */
    const flMat = (c, op, x) => std(c, 0.6, 0, Object.assign({ transparent: true, opacity: op, depthWrite: false }, x || {}));   /* mat : pas de reflet qui délave la couleur */
    const matCharge = coupable(flMat(0x8e44ad, 0.85, { emissive: 0x4b1a66, emissiveIntensity: 0.3 }));
    const matChargeTete = coupable(flMat(0x8e44ad, 0.55, { emissive: 0x3a1352, emissiveIntensity: 0.3 }));   /* se fonce quand la pression monte */
    const matSous = coupable(flMat(0x3f9be0, 0.6, { emissive: 0x1f6fb0, emissiveIntensity: 0.4 }));          /* chambre sous la membrane : pression d'évaporation (bleu) */
    const matRemplissage = coupable(fl(0xffffff, 1, { vertexColors: true, roughness: 0.65, emissive: 0x1f7fc8, emissiveIntensity: 0.55 }));
    const matFilet = K.lumineux(0xffe4a8, 0.9);
    const matBulle = fl(0xf4fbff, 0.55, { roughness: 0.1, emissive: 0x7fc0e0, emissiveIntensity: 0.4 });
    const matMolecule = K.lumineux(0x9fd0e8, 0.85);
    const matImpulsion = K.lumineux(0xf3e2fc);                        /* impulsions de pression : violet clair */

    /* ------------------------------------------------------------------ pièces de révolution (axe Y)
       profil : [[r, y], …] (polygone fermé : on répète le premier point à la fin si besoin).
       Arêtes vives, ou lissées quand l'angle entre deux arêtes est faible : les dômes sont ronds,
       les épaulements restent francs. */
    const tour = (profil, seg) => {
      seg = seg || 36;
      const n = profil.length - 1, nor = [], pos = [], nrm = [], uv = [], idx = [];
      for (let i = 0; i < n; i++) {
        const dr = profil[i + 1][0] - profil[i][0], dy = profil[i + 1][1] - profil[i][1], L = Math.hypot(dr, dy) || 1;
        nor.push([dy / L, -dr / L, L]);
      }
      let base = 0, arc = 0;
      for (let i = 0; i < n; i++) {
        for (let e = 0; e < 2; e++) {
          const k = i + e, j = e ? i + 1 : i - 1;
          let nr = nor[i][0], ny = nor[i][1];
          if (j >= 0 && j < n) {
            const c = nor[i][0] * nor[j][0] + nor[i][1] * nor[j][1];
            if (Math.acos(clamp(c, -1, 1)) < 0.62) { nr += nor[j][0]; ny += nor[j][1]; const l = Math.hypot(nr, ny) || 1; nr /= l; ny /= l; }
          }
          for (let s = 0; s <= seg; s++) {
            const a = Math.PI * 2 * s / seg, sa = Math.sin(a), ca = Math.cos(a);
            pos.push(profil[k][0] * sa, profil[k][1], profil[k][0] * ca);
            nrm.push(nr * sa, ny, nr * ca);
            uv.push(s / seg, (arc + e * nor[i][2]) / 20);
          }
        }
        for (let s = 0; s < seg; s++) { const a = base + s, b = a + 1, c = base + seg + 1 + s, d = c + 1; idx.push(a, c, b, b, c, d); }
        base += 2 * (seg + 1); arc += nor[i][2];
      }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
      g.setAttribute('normal', new T.Float32BufferAttribute(nrm, 3));
      g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
      g.setIndex(idx);
      return g;
    };
    /* la face de coupe d'une pièce de révolution : le polygone du profil, à droite et à gauche de l'axe */
    const faceProfil = (profil, mat) => {
      const g = new T.Group();
      [1, -1].forEach(s => {
        const m = mesh(new T.ShapeGeometry(new T.Shape(profil.map(p => new T.Vector2(s * p[0], p[1])))), mat);
        m.position.z = 0.05; m.userData.sansOmbre = true; g.add(m);
      });
      g.visible = false; faces.push(g);
      return g;
    };
    /* une pièce complète : sa coque + sa face de coupe */
    const revol = (profil, mat, matFace, seg) => {
      const g = new T.Group();
      g.add(mesh(tour(profil, seg || 36), mat));
      if (matFace) g.add(faceProfil(profil, matFace));
      return g;
    };
    const arc = (n, f) => Array.from({ length: n + 1 }, (_, k) => f(k / n));

    /* ------------------------------------------------------------------ l'état (qualitatif, 0 → 1)
       charge thermique ch · front de liquide uf · température de sortie s · pression du bulbe Pb ·
       ouverture D (mm, vers le bas) · débit · vis. */
    const FE = 0.18;                                         /* pression d'évaporation, constante */
    const PB = s => 0.15 + 0.7 * s;
    const FR = v => 0.32 + 0.6 * (v - 0.5);                  /* force du ressort selon la vis */
    const D_DE = (pb, v) => clamp(1.4 + 5 * (pb - FE - FR(v)), 0, 3.2);
    const DEB = d => clamp(d / 3.2, 0, 1);
    const UF = (deb, ch) => clamp(0.35 + 0.45 * deb - 0.5 * (ch - 0.5), 0.12, 0.95);
    const S_DE = uf => clamp(2.15 - 3 * uf, 0, 1);
    const nominal = () => {                                  /* le point d'équilibre, calculé et non écrit (bissection) */
      const boucle = s => S_DE(UF(DEB(D_DE(PB(s), 0.5)), 0.5)) - s;
      let a = 0, b = 1;
      for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (boucle(m) > 0) a = m; else b = m; }
      const s = (a + b) / 2, pb = PB(s), d = D_DE(pb, 0.5), deb = DEB(d);
      return { s, Pb: pb, D: d, debit: deb, uf: UF(deb, 0.5), vis: 0.5 };
    };
    const E = nominal();                                     /* valeurs affichées */
    const C = { ch: 0.5, vis: 0.5, forceD: null };           /* consignes ; forceD : l'ouverture imposée (écran « débit ») */
    const LIEN = { pb: true, d: true, deb: true, uf: true };  /* qui suit qui */
    const VITESSE = { pb: 3.2, d: 2.2, deb: 3, uf: 0.75, s: 2.2, vis: 4 };

    /* ------------------------------------------------------------------ le corps : fermé et en tranche */
    /* rectangles du corps (x0, x1, y0, y1, profondeur) et creux (même format) ; la profondeur d'un creux
       rond est son rayon. Le corps coupé est la grille de ces rectangles, fusionnée en bandes. */
    const BLOC = [[-24, 24, -26, 30, 18], [-8.5, 8.5, -34, -26, 8.5], [-14, 14, 30, 34, 14]];
    const CREUX = [
      [-20.6, -11.4, -26, -10, 4.6],      /* 0 · perçage d'entrée (liquide HP) */
      [-20.6, -6.2, -16, -10, 4.6],       /* 1 · passage vers le logement du clapet */
      [-6.2, 6.2, -33, -4.5, 6.2],        /* 2 · logement du clapet et du ressort (liquide HP) */
      [-2, 2, -4.5, -1.5, 2],             /* 3 · l'orifice */
      [-9, 14, -1.5, 17, 7],              /* 4 · chambre de détente (mélange BP) */
      [14, 24, 2.4, 13.6, 5.6],           /* 5 · perçage de sortie */
      [-2.6, 2.6, 17, 30, 2.6],           /* 6 · passage de la tige */
      [-8, 8, 30, 34, 8],                 /* 7 · col, sous la tête */
      [8, 10.8, 17, 32, 1.4]              /* 8 · prise de pression interne */
    ];
    const corpsFerme = new T.Group();
    corpsFerme.add(mesh(K.boite(48, 56, 36, 4), laitonFerme, 0, 2, 0));
    corpsFerme.add(mesh(K.cylindre(8.5, 8, 32), laitonFerme, 0, -30, 0));
    corpsFerme.add(mesh(K.cylindre(14, 4, 40), laitonFerme, 0, 32, 0));
    /* deux méplats et des congés légers : l'œil reconnaît une pièce forgée, pas un cube */
    corpsFerme.add(mesh(K.boite(2, 40, 26, 0.6), laitonFerme, 24.4, 2, 0));
    corpsFerme.add(mesh(K.boite(2, 40, 26, 0.6), laitonFerme, -24.4, 2, 0));
    racine.add(corpsFerme);

    const corpsCoupe = new T.Group();
    (() => {
      const xs = new Set(), ys = new Set();
      BLOC.concat(CREUX).forEach(r => { xs.add(r[0]); xs.add(r[1]); ys.add(r[2]); ys.add(r[3]); });
      const X = [...xs].sort((a, b) => a - b), Y = [...ys].sort((a, b) => a - b);
      const cellule = (x, y) => {
        const o = BLOC.find(r => x > r[0] && x < r[1] && y > r[2] && y < r[3]); if (!o) return null;
        const c = CREUX.find(r => x > r[0] && x < r[1] && y > r[2] && y < r[3]);
        return { bas: -o[4], haut: c ? -c[4] : 0 };
      };
      let bandes = [];
      for (let j = 0; j < Y.length - 1; j++) {
        let cur = null;
        for (let i = 0; i < X.length - 1; i++) {
          const c = cellule((X[i] + X[i + 1]) / 2, (Y[j] + Y[j + 1]) / 2);
          if (c && cur && cur.bas === c.bas && cur.haut === c.haut && cur.x1 === X[i]) cur.x1 = X[i + 1];
          else { cur = c ? { x0: X[i], x1: X[i + 1], y0: Y[j], y1: Y[j + 1], bas: c.bas, haut: c.haut } : null; if (cur) bandes.push(cur); }
        }
      }
      bandes.sort((a, b) => a.x0 - b.x0 || a.x1 - b.x1 || a.bas - b.bas || a.haut - b.haut || a.y0 - b.y0);
      const fus = [];
      bandes.forEach(b => {
        const p = fus[fus.length - 1];
        if (p && p.x0 === b.x0 && p.x1 === b.x1 && p.bas === b.bas && p.haut === b.haut && p.y1 === b.y0) p.y1 = b.y1; else fus.push(Object.assign({}, b));
      });
      fus.forEach(b => {
        const cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
        corpsCoupe.add(mesh(new T.BoxGeometry(b.x1 - b.x0, b.y1 - b.y0, b.haut - b.bas), laitonCavite, cx, cy, (b.haut + b.bas) / 2));
        /* la face de coupe : un plan clair, juste devant le bloc (le moteur ne sait pas allumer un tableau de matières) */
        if (b.haut === 0) {
          const g = new T.PlaneGeometry(b.x1 - b.x0, b.y1 - b.y0); uvMillimetres(g, cx, cy);
          const f = mesh(g, laitonCoupe, cx, cy, 0.02); f.userData.sansOmbre = true; corpsCoupe.add(f);
        }
      });
    })();
    corpsCoupe.visible = false;
    racine.add(corpsCoupe);

    /* ------------------------------------------------------------------ les tubes à braser */
    /* Un tube = deux parois OUVERTES (extérieure, intérieure) : ni bague, ni couvercle, ni face qui ferme l'alésage. En coupe,
       la section de la paroi est une bande fine le long du tube. Même rayon (alésage 5,6 · extérieur 6,5) du corps au bout
       de l'évaporateur : les jonctions ne montrent aucune marche. */
    const RAD = 14;
    /* Les anneaux des tubes : un par sommet de la ligne brisée (un tous les 5° dans les coudes), au plus 8 mm d'écart sur les
       tronçons droits. Serrés dans les coudes, ils évitent les éclats qu'un pas régulier de 2,3 mm y laissait ; `u` est l'abscisse
       curviligne de l'anneau (0 → 1), qui sert à teinter le fluide. */
    const echantillon = pts => {
      const R = [[pts[0][0], pts[0][1]]], S = [0]; let s = 0;
      for (let i = 1; i < pts.length; i++) {
        const dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1], L = Math.hypot(dx, dy), k = Math.max(1, Math.ceil(L / 8));
        if (L < 1e-6) continue;                                    /* deux points confondus (fin du tronçon droit = début du coude) : un seul anneau */
        for (let m = 1; m <= k; m++) { s += L / k; R.push([pts[i - 1][0] + dx * m / k, pts[i - 1][1] + dy * m / k]); S.push(s); }
      }
      return { R, u: S.map(x => x / s) };
    };
    /* Tube dans le plan de coupe (z = 0) : les sommets sont décalés d'un demi-pas, le plan de coupe passe donc au milieu d'une
       facette ; le rayon est majoré (1 / cos) pour que la coupe tombe exactement au rayon voulu : la bande de coupe ferme la
       paroi sans éclat. Même rangement des sommets que TubeGeometry (anneau par anneau). */
    const tubePlan = (anneaux, r) => {
      const P = anneaux.R, n = P.length, pos = [], nor = [], uv = [], idx = [], rr = r / Math.cos(Math.PI / RAD);
      for (let i = 0; i < n; i++) {
        const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)];
        let tx = b[0] - a[0], ty = b[1] - a[1]; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
        for (let j = 0; j <= RAD; j++) {
          const th = (j + 0.5) / RAD * Math.PI * 2, c = Math.cos(th), sn = Math.sin(th), ex = -ty * c, ey = tx * c;
          pos.push(P[i][0] + ex * rr, P[i][1] + ey * rr, sn * rr); nor.push(ex, ey, sn); uv.push(anneaux.u[i], j / RAD);
        }
      }
      for (let i = 0; i < n - 1; i++) for (let j = 0; j < RAD; j++) { const a = i * (RAD + 1) + j, b = a + RAD + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
      g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
      return g;
    };
    const paroi = (rIn, rOut, y0, y1) => {
      const g = new T.Group();
      g.add(mesh(tour([[rOut, y0], [rOut, y1]], 32), cuivre), mesh(tour([[rIn, y1], [rIn, y0]], 32), cuivre));
      return g;
    };
    const bandesTube = (pts, rIn, rOut) => {                 /* pts : [[x, y], …] dans le plan de coupe */
      const n = pts.length, pos = [], nor = [], idx = [];
      for (let i = 0; i < n; i++) {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
        const nx = -ty / L, ny = tx / L, x = pts[i][0], y = pts[i][1];
        pos.push(x + nx * rIn, y + ny * rIn, 0, x + nx * rOut, y + ny * rOut, 0, x - nx * rIn, y - ny * rIn, 0, x - nx * rOut, y - ny * rOut, 0);
        for (let k = 0; k < 4; k++) nor.push(0, 0, 1);
      }
      for (let i = 0; i < n - 1; i++) { const a = i * 4, b = a + 4; idx.push(a, a + 1, b + 1, a, b + 1, b, a + 2, a + 3, b + 3, a + 2, b + 3, b + 2); }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3)); g.setIndex(idx);
      const m = mesh(g, cuivreCoupe); m.position.z = 0.05; m.userData.sansOmbre = true;
      const grp = new T.Group(); grp.add(m); grp.visible = false; faces.push(grp);
      return grp;
    };
    const tubeEntree = new T.Group();
    tubeEntree.add(paroi(4.6, 5.5, -62, -26), bandesTube([[0, -62], [0, -26]], 4.6, 5.5));
    tubeEntree.position.set(-16, 0, 0);
    const tubeSortie = new T.Group();
    const anneauxSortie = echantillon([[24, 8], [40, 8]]);                      /* même section que le serpentin, qui lui fait suite */
    tubeSortie.add(mesh(tubePlan(anneauxSortie, 6.5), cuivre), mesh(tubePlan(anneauxSortie, 5.6), cuivre), bandesTube(anneauxSortie.R, 5.6, 6.5));
    racine.add(tubeEntree, tubeSortie);

    /* ------------------------------------------------------------------ l'orifice (bague d'acier) */
    const orifice = new T.Group();
    [-5.1, 5.1].forEach(x => { const m = mesh(K.boite(6, 3, 0.9, 0.3), acier, x, -3, 0.3); orifice.add(m); });
    orifice.visible = false; faces.push(orifice);
    racine.add(orifice);

    /* ------------------------------------------------------------------ la tête thermostatique */
    const grpTete = new T.Group();
    /* le dôme est percé à l'axe (Ø 2,8) : le gaz du capillaire passe par l'embout creux jusque sous le dôme */
    const aM1 = Math.acos(1.4 / 27), aM2 = Math.acos(1.4 / 25.4);
    const domeSup = revol(
      arc(14, t => [27 * Math.cos(t * aM1), 44 + 11 * Math.sin(t * aM1)])
        .concat(arc(14, t => [25.4 * Math.cos((1 - t) * aM2), 44 + 9.4 * Math.sin((1 - t) * aM2)]), [[27, 44]]),
      inox, metalCoupe, 44);
    const domeInf = revol(
      arc(10, t => [13.5 + 13.5 * (1 - t), 36 + 8 * (1 - t) * (1 - t)])
        .concat([[13.5, 34], [8, 34], [8, 37.8]], arc(10, t => [8 + 17.3 * t, 37.8 + 6 * t * t]), [[27, 44]]),
      inox, metalCoupe, 44);
    const jonc = revol([[24.6, 42.2], [29.2, 42.2], [29.2, 45.8], [24.6, 45.8], [24.6, 42.2]], inoxSombre, metalCoupe, 44);
    const embout = revol([[1.4, 53], [2.6, 53], [2.6, 60], [1.8, 61.5], [1.4, 61.5], [1.4, 53]], inoxSombre, metalCoupe, 24);
    grpTete.add(domeSup, domeInf, jonc, embout);

    /* la membrane : un disque d'acier très fin qui se creuse ; le piston la tient en son centre */
    const RM = 25.4, RP = 7.5;
    const pointsMembrane = [];
    for (let i = 0; i <= 24; i++) pointsMembrane.push(new T.Vector2(RM * i / 24, 0.45));
    for (let i = 24; i >= 0; i--) pointsMembrane.push(new T.Vector2(RM * i / 24, -0.45));
    const geoMembrane = new T.LatheGeometry(pointsMembrane, 44);
    const yMembrane0 = Float32Array.from(geoMembrane.attributes.position.array.filter((_, i) => i % 3 === 1));
    const matMembrane = coupable(std(0x5f6a75, 0.4, 0.8));            /* acier : l'orangé est réservé au liquide HP */
    const membrane = mesh(geoMembrane, matMembrane);
    const fMembrane = r => r <= RP ? 1 : 0.5 * (1 + Math.cos(Math.PI * clamp((r - RP) / (RM - RP), 0, 1)));
    const NR = 40, ruban = new T.BufferGeometry();
    ruban.setAttribute('position', new T.Float32BufferAttribute(new Float32Array((NR + 1) * 2 * 3), 3));
    ruban.setIndex(Array.from({ length: NR }, (_, i) => { const a = i * 2; return [a, a + 1, a + 2, a + 1, a + 3, a + 2]; }).flat());
    ruban.setAttribute('normal', new T.Float32BufferAttribute(new Float32Array((NR + 1) * 2 * 3).map((_, i) => i % 3 === 2 ? 1 : 0), 3));
    const faceMembrane = mesh(ruban, std(0x9aa6b2, 0.5, 0.3, { side: T.DoubleSide }));
    faceMembrane.position.z = 0.05; faceMembrane.visible = false; faceMembrane.userData.sansOmbre = true; faces.push(faceMembrane);
    const grpMembrane = new T.Group(); grpMembrane.add(membrane, faceMembrane);
    grpTete.add(grpMembrane);
    const majMembrane = () => {
      const p = geoMembrane.attributes.position, dz = 0.35 - E.D;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), z = p.getZ(i);
        p.setY(i, yMembrane0[i] + 44 + dz * fMembrane(Math.hypot(x, z)));
      }
      p.needsUpdate = true;
      const nm = geoMembrane.attributes.normal;
      for (let i = 0; i < p.count; i++) {                  /* la membrane est mince : normales haut / bas, penchées par la courbure */
        const x = p.getX(i), z = p.getZ(i), r = Math.hypot(x, z) || 1, haut = yMembrane0[i] > 0 ? 1 : -1;
        const f1 = r <= RP ? 0 : -0.5 * Math.sin(Math.PI * clamp((r - RP) / (RM - RP), 0, 1)) * Math.PI / (RM - RP);
        const pente = dz * f1;
        nm.setXYZ(i, -haut * pente * x / r, haut, -haut * pente * z / r);
      }
      nm.needsUpdate = true;
      const q = ruban.attributes.position;
      for (let i = 0; i <= NR; i++) {
        const x = -RM + 2 * RM * i / NR, y = 44 + dz * fMembrane(Math.abs(x));
        q.setXYZ(i * 2, x, y + 0.45, 0); q.setXYZ(i * 2 + 1, x, y - 0.45, 0);
      }
      q.needsUpdate = true;
      majChambreSous(); majChambreHaut();
    };

    /* La chambre sous la membrane : la pression d'évaporation y arrive par la prise interne (bleu). Son plafond est la membrane :
       il la suit quand elle se creuse ; son plancher est l'intérieur de la coque basse. */
    const chambreSous = mesh(new T.BufferGeometry(), matSous); chambreSous.userData.sansOmbre = true; chambreSous.renderOrder = 1;
    const majChambreSous = () => {
      const dz = 0.35 - E.D, R1 = 24.2, bas = [[0, 34.1], [7.85, 34.1], [7.85, 37.95]], haut = [];
      for (let k = 1; k <= 8; k++) { const t = k / 8; bas.push([7.85 + (R1 - 7.85) * t, 37.95 + 6 * Math.pow((7.85 + (R1 - 7.85) * t - 8) / 17.3, 2) + 0.1]); }
      for (let k = 8; k >= 0; k--) { const r = R1 * k / 8; haut.push([r, 44 + dz * fMembrane(r) - 0.6]); }
      chambreSous.geometry.dispose();
      chambreSous.geometry = tour(bas.concat(haut, [[0, 34.1]]), 40);
    };
    /* La chambre au-dessus de la membrane (violet) : son plancher est la membrane, son plafond la coque haute ; elle est reliée au
       capillaire par l'embout creux (Ø 2,8). Elle suit la membrane quand celle-ci se creuse. */
    const majChambreHaut = () => {
      const dz = 0.35 - E.D, R2 = 24.9, bas = [], haut = [];
      for (let k = 0; k <= 8; k++) { const r = R2 * k / 8; bas.push([r, 44 + dz * fMembrane(r) + 0.6]); }
      for (let k = 8; k >= 0; k--) { const r = Math.max(R2 * k / 8, 0); haut.push([r, 44 + 9.4 * Math.sqrt(Math.max(0, 1 - Math.pow(r / 25.4, 2))) - 0.25]); }
      chargeTete.geometry.dispose();
      chargeTete.geometry = tour(bas.concat(haut), 40);
    };
    /* la chambre au-dessus se FONCE quand la pression du bulbe monte : plus de gaz serré, une couleur plus dense */
    const couleurClaire = new T.Color(0xa86fc6), couleurSombre = new T.Color(0x4b1572);
    const majTeinteTete = () => {
      const t = clamp((E.Pb - 0.35) / 0.4, 0, 1);
      matChargeTete.color.copy(couleurClaire).lerp(couleurSombre, t);
      matChargeTete.opacity = 0.42 + 0.5 * t;
    };

    /* l'équipage mobile : piston, tige ; le clapet s'y appuie (il est à part, il sort par le bas) */
    const equipage = new T.Group();
    const piston = revol([[0, 41.9], [RP, 41.9], [RP, 43.5], [0, 43.5], [0, 41.9]], inoxSombre, metalCoupe, 40);
    const tige = mesh(K.cylindre(1.2, 44.7, 20, 1.2), acier, 0, 42.1 - 22.35 - 0.0, 0);
    equipage.add(piston, tige);
    grpTete.add(equipage);
    /* la charge du dessus de la membrane : même fluide que le bulbe */
    const chargeTete = mesh(new T.BufferGeometry(), matChargeTete);
    chargeTete.visible = false;
    const chargeEmbout = mesh(K.cylindre(1.25, 9, 14), matCharge, 0, 57.2, 0); chargeEmbout.visible = false;
    grpTete.add(chargeTete, chargeEmbout);
    const ancreTete = new T.Object3D(); ancreTete.position.set(0, 61.5, 0); grpTete.add(ancreTete);
    racine.add(grpTete);

    /* ------------------------------------------------------------------ le clapet, le ressort, la vis, le capuchon */
    const clapet = revol([[0, -10.2], [5.6, -10.2], [5.6, -9.2], [4, -9.2], [1.1, -2.5], [0, -2.5], [0, -10.2]], acier, null, 32);
    racine.add(clapet);
    const ressort = K.ressort(5, 16, 7, 0.75, acier);
    racine.add(ressort);

    const vis = new T.Group();
    vis.add(revol([[0, 0], [6, 0], [6, -6], [2.6, -6], [2.6, -14], [0, -14], [0, 0]], zingue, metalCoupe, 28));
    const joint = mesh(K.tore(6, 0.7, 8, 28), noir, 0, -3, 0); joint.rotation.x = Math.PI / 2; vis.add(joint);
    vis.position.y = -24;
    racine.add(vis);
    const capFerme = new T.Group();
    capFerme.add(mesh(new T.CylinderGeometry(10, 10, 11, 6), laitonFerme, 0, -39.5, 0));
    capFerme.add(mesh(K.cylindre(9, 1, 28), noir, 0, -33.6, 0));
    capFerme.children[0].rotation.y = Math.PI / 6;
    const capCoupe = revol([[7.2, -34], [9.8, -34], [9.8, -45], [0, -45], [0, -43], [7.2, -43], [7.2, -34]], laitonCoque, laitonCoupe, 40);
    capCoupe.visible = false;
    racine.add(capFerme, capCoupe);

    /* ------------------------------------------------------------------ l'évaporateur et son tube de sortie */
    const XR = 125, XL = 48, Y1 = 8, Y2 = -8, Y3 = -24, XFIN = 200;
    const serpentin = [[40, Y1, 0], [XR, Y1, 0]];
    for (let a = 90; a >= -90; a -= 5) serpentin.push([XR + 8 * Math.cos(a * Math.PI / 180), 8 * Math.sin(a * Math.PI / 180), 0]);
    serpentin.push([XL, Y2, 0]);
    for (let a = 90; a <= 270; a += 5) serpentin.push([XL + 8 * Math.cos(a * Math.PI / 180), -16 + 8 * Math.sin(a * Math.PI / 180), 0]);
    serpentin.push([XFIN, Y3, 0]);
    const cheminTube = K.chemin(serpentin);
    const cheminRempl = K.chemin([[24, Y1, 0]].concat(serpentin));       /* le fluide part de la face du corps */
    const LS = cheminRempl.getLength(), LT = cheminTube.getLength(), L0 = LS - LT;
    const anneauxTube = echantillon(serpentin), anneauxFluide = echantillon([[24, Y1, 0]].concat(serpentin));
    const geoTube = tubePlan(anneauxTube, 6.5);
    const geoTubeI = tubePlan(anneauxTube, 5.6);
    [geoTube, geoTubeI].forEach(g => g.setAttribute('color', new T.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 3).fill(1), 3)));
    const tubeEvap = new T.Group();
    tubeEvap.add(mesh(geoTube, cuivreTube), mesh(geoTubeI, cuivreTube), bandesTube(anneauxTube.R, 5.6, 6.5));
    racine.add(tubeEvap);
    /* la chaleur du tube de sortie : une enveloppe rouge-orangé (ou bleutée quand il refroidit), seulement sur la dernière passe */
    const geoChaleur = tubePlan(anneauxTube, 6.95);
    geoChaleur.setAttribute('color', new T.Float32BufferAttribute(new Float32Array(geoChaleur.attributes.position.count * 4), 4));
    const matChaleur = coupable(new T.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, toneMapped: false }));
    const chaleurTube = mesh(geoChaleur, matChaleur); chaleurTube.renderOrder = 4; chaleurTube.userData.sansOmbre = true;
    racine.add(chaleurTube);
    /* le remplissage : fluide dans le serpentin, couleur par anneau (mélange puis vapeur) */
    const geoRempl = tubePlan(anneauxFluide, 5.3);
    geoRempl.setAttribute('color', new T.Float32BufferAttribute(new Float32Array(geoRempl.attributes.position.count * 4), 4));
    const rempl = mesh(geoRempl, matRemplissage);
    rempl.renderOrder = 2; rempl.userData.sansOmbre = true;

    /* ------------------------------------------------------------------ le bulbe, son collier, le capillaire */
    const BX = 138, BY = -12.3, LB = 56;                 /* départ, hauteur de l'axe, longueur */
    const bulbe = new T.Group();
    const coqueB = [[0, 0], [2, 0.35], [3.8, 1.3], [5, 3], [5.2, 4.4], [5.2, LB - 4.4], [5, LB - 3], [3.8, LB - 1.3], [2, LB - 0.35], [1, LB - 0.12],
      [1, LB - 0.85], [1.8, LB - 1.1], [3.4, LB - 2], [4.4, LB - 3.4], [4.4, 4.4], [3.4, 3.4], [1.8, 2.1], [0, 0.8], [0, 0]];
    bulbe.add(revol(coqueB, cuivreBulbe, cuivreCoupe, 36));
    bulbe.add(revol([[1, LB - 0.5], [1.7, LB - 0.5], [1.7, LB + 3.2], [1, LB + 3.2], [1, LB - 0.5]], cuivreBulbe, cuivreCoupe, 16));
    const chargeBulbe = mesh(tour([[0, 1.2], [2.5, 1.5], [4, 2.6], [4.3, 4], [4.3, LB - 4], [4, LB - 2.6], [2.5, LB - 1.5], [0, LB - 1.2]], 32), matCharge);
    chargeBulbe.visible = false;
    const chargeEmboutB = mesh(K.cylindre(0.9, 4.9, 12), matCharge, 0, LB + 0.95, 0); chargeEmboutB.visible = false;
    bulbe.add(chargeBulbe, chargeEmboutB);
    bulbe.rotation.z = -Math.PI / 2; bulbe.position.set(BX, BY, 0);
    const grpBulbe = new T.Group(); grpBulbe.add(bulbe);
    /* deux colliers de serrage, boulonnés sur le dessus ; chacun entoure le tube ET le bulbe */
    [BX + 11, BX + LB - 11].forEach(x => {
      const exter = K.formeArrondie(14.6, 25.4, 6.6), inter = K.formeArrondie(12.8, 23.6, 5.7);
      exter.holes.push(inter);
      const g = new T.ExtrudeGeometry(exter, { depth: 3.4, bevelEnabled: false, curveSegments: 10 });
      g.translate(0, 0, -1.7); g.rotateY(Math.PI / 2);
      const c = mesh(g, zingue, x, (BY + 5.2 + Y3 - 6.5) / 2 - 0.2, 0);
      const bride = mesh(K.boite(3.4, 4.4, 9, 0.8), zingue, x, BY + 5.2 + 1.6, 0);
      const boulon = K.vis(2.4); boulon.position.set(x, BY + 5.2 + 3.8, 0);
      grpBulbe.add(c, bride, boulon);
    });
    const ancreBulbe = new T.Object3D(); ancreBulbe.position.set(BX + LB + 3.2, BY, 0); grpBulbe.add(ancreBulbe);
    racine.add(grpBulbe);

    /* le capillaire : un tube de cuivre qui relie l'embout de la tête au bulbe, toujours d'une seule pièce */
    const cuivreFil = M.cuivre.clone();
    const capillaire = mesh(new T.BufferGeometry(), cuivreFil); capillaire.renderOrder = 1;
    const chargeCap = mesh(new T.BufferGeometry(), matCharge); chargeCap.userData.sansOmbre = true; chargeCap.visible = false; chargeCap.renderOrder = 2;
    racine.add(capillaire, chargeCap);
    let courbeCap = null; const posA = new T.Vector3(), posB = new T.Vector3(), memA = new T.Vector3(1e9, 0, 0), memB = new T.Vector3(1e9, 0, 0);
    const majCapillaire = () => {
      ancreTete.getWorldPosition(posA); ancreBulbe.getWorldPosition(posB);
      if (posA.distanceToSquared(memA) < 1e-4 && posB.distanceToSquared(memB) < 1e-4) return false;
      memA.copy(posA); memB.copy(posB);
      courbeCap = new T.CubicBezierCurve3(posA.clone(), posA.clone().add(new T.Vector3(0, 38, -26)), posB.clone().add(new T.Vector3(46, 34, -26)), posB.clone());
      capillaire.geometry.dispose();
      capillaire.geometry = new T.TubeGeometry(courbeCap, 96, 1.25, 8, false);
      chargeCap.geometry.dispose();
      chargeCap.geometry = new T.TubeGeometry(courbeCap, 96, 1.0, 8, false);
      return true;
    };

    /* ------------------------------------------------------------------ les fluides (visibles en coupe) */
    const fluides = new T.Group(); fluides.visible = false; racine.add(fluides);
    /* Les volumes se touchent sans se recouvrir et sans interstice (0,02 mm) : aucune ligne claire entre deux, aucune
       bande plus dense là où deux se superposeraient ; leurs largeurs sont celles des tubes (alésage 4,6 et 5,6). */
    const boiteFluide = (r, mat) => {
      const w = r[1] - r[0] - 0.04, h = r[3] - r[2] - 0.04, d = r[4] - 0.02;
      const o = mesh(new T.BoxGeometry(w, h, d), mat, (r[0] + r[1]) / 2, (r[2] + r[3]) / 2, 0.03 - d / 2);
      o.userData.sansOmbre = true; o.renderOrder = 1; return o;
    };
    /* liquide haute pression, de l'entrée à l'orifice : tube, perçage, passage, logement du clapet */
    [[-20.6, -11.4, -26, -16, 4.6], CREUX[1], [-6.2, 6.2, -24, -4.5, 6.2]].forEach(r => fluides.add(boiteFluide(r, matHP)));
    const remplEntree = mesh(K.cylindre(4.58, 36, 24), matHPc, -16, -44, 0); remplEntree.userData.sansOmbre = true; remplEntree.renderOrder = 1; fluides.add(remplEntree);
    /* mélange basse pression : orifice, chambre de détente, perçage de sortie */
    [CREUX[3], CREUX[4], CREUX[5]].forEach(r => fluides.add(boiteFluide(r, matMelange)));
    fluides.add(rempl);
    /* la prise de pression interne : toujours visible en coupe (c'est une pièce) */
    const prise = new T.Group();
    [CREUX[6], CREUX[7], CREUX[8]].forEach(r => { const b = boiteFluide(r, matVapeur); b.userData.voile = true; prise.add(b); });
    prise.add(chambreSous); prise.visible = false; racine.add(prise);

    /* filets de liquide (jamais des billes) : de petits traits clairs qui avancent dans le liquide HP */
    const cheminHP = K.chemin([[-16, -61, 0], [-16, -13, 0], [0, -13, 0], [0, -6, 0]]);
    const NF = 22, filets = new T.InstancedMesh(new T.CapsuleGeometry(0.3, 2.8, 3, 6), matFilet, NF);
    filets.frustumCulled = false; filets.userData.sansOmbre = true; fluides.add(filets);
    const alea = Array.from({ length: 160 }, (_, i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); });
    /* bulles qui naissent à l'orifice, grossissent en avançant, disparaissent au front de liquide ;
       petites molécules de vapeur ensuite */
    const cheminBulles = K.chemin([[0, -3, 0], [0, 4, 0], [8, 8, 0], [24, Y1, 0]].concat(serpentin));
    const LP = cheminBulles.getLength(), LB0 = LP - LS;
    const NB = 44, bulles = new T.InstancedMesh(new T.SphereGeometry(1, 8, 6), matBulle, NB);
    const NM = 46, molecules = new T.InstancedMesh(new T.SphereGeometry(0.62, 6, 4), matMolecule, NM);
    [bulles, molecules].forEach(o => { o.frustumCulled = false; o.userData.sansOmbre = true; o.renderOrder = 3; fluides.add(o); });

    /* impulsions de pression dans le capillaire (violet clair) */
    const NI = 12, impulsions = new T.InstancedMesh(new T.SphereGeometry(1.9, 8, 6), matImpulsion, NI);
    impulsions.frustumCulled = false; impulsions.userData.sansOmbre = true; impulsions.visible = false; racine.add(impulsions);

    /* ------------------------------------------------------------------ les trois forces sur la membrane */
    const fleche = (hex) => {
      const g = new T.Group(), m = K.lumineux(hex);
      const tigeF = mesh(K.cylindre(1, 1, 12), m), pointe = mesh(new T.ConeGeometry(2.8, 5.6, 16), m);
      g.add(tigeF, pointe);
      g.userData.regler = (xb, yb, yp, epais) => {                 /* base (xb, yb), pointe en yp */
        const h = Math.abs(yp - yb), s = yp >= yb ? 1 : -1, c = Math.max(0, h - 5.6);
        g.position.set(xb, yb, 6.5); g.scale.set(epais, s, epais);
        tigeF.scale.set(1, Math.max(0.01, c), 1); tigeF.position.y = c / 2;
        pointe.position.y = c + 2.8;
      };
      return g;
    };
    const flBulbe = fleche(0x8e44ad), flEvap = fleche(0x3d7fca), flRessort = fleche(0x6b7885);   /* violet : bulbe (ouvre) · bleu : évaporation (ferme) · gris acier : ressort (ferme) */
    const forces = new T.Group(); forces.add(flBulbe, flEvap, flRessort); forces.visible = false; racine.add(forces);
    sansOmbre(forces); forces.traverse(n => { n.renderOrder = 5; });

    /* un anneau orange autour de la pièce allumée : le lueur du moteur est trop discrète sur une petite pièce
       (un orifice de 4 mm, un ressort) ; l'anneau se voit à n'importe quelle échelle */
    const anneau = K.halo([[0, 'rgba(255,107,53,0)'], [0.74, 'rgba(255,107,53,0)'], [0.8, 'rgba(255,107,53,0.9)'], [0.88, 'rgba(255,107,53,0.9)'], [0.94, 'rgba(255,107,53,0)']], { px: 256, rInt: 0 });
    anneau.material.depthTest = false; anneau.material.opacity = (PROG === 'pieces' || PROG === 'reconnaitre') ? 1 : 0.42; anneau.renderOrder = 20; anneau.visible = false; anneau.userData.sansOmbre = true;
    racine.add(anneau);

    /* ------------------------------------------------------------------ l'état affiché → les objets */
    const etat = { coupe: false, eclate: false, fluide: PROG !== 'pieces' && PROG !== 'reconnaitre', fleches: PROG === 'forces' || PROG === 'boucle' };
    let tempsFluide = 0, tempsAnneau = 0, mesuresTxt = '', memCouleurs = '';
    const m4 = new T.Matrix4(), qI = new T.Quaternion(), sI = new T.Vector3(), pI = new T.Vector3(), dir = new T.Vector3(), HAUT = new T.Vector3(0, 1, 0);

    const majVisibilites = () => {
      const coupe = etat.coupe;
      corpsFerme.visible = !coupe; corpsCoupe.visible = coupe;
      faces.forEach(f => { f.visible = coupe; });
      aCouper.forEach(m => { m.clippingPlanes = coupe ? [PLAN] : null; m.needsUpdate = true; });
      capFerme.visible = !coupe; capCoupe.visible = coupe;
      chargeTete.visible = chargeBulbe.visible = chargeEmbout.visible = chargeEmboutB.visible = chargeCap.visible = prise.visible = coupe;
      cuivreFil.transparent = coupe; cuivreFil.opacity = coupe ? 0.25 : 1; cuivreFil.depthWrite = !coupe; cuivreFil.needsUpdate = true;
      fluides.visible = coupe && etat.fluide && !etat.eclate;
      forces.visible = coupe && etat.fleches && !etat.eclate;
    };

    const poser = () => {
      /* équipage : tout descend de D ; le clapet suit ; le ressort se comprime entre le clapet et la vis */
      const vp = (E.vis - 0.5) * 6;
      equipage.position.y = -E.D + 0;
      clapet.position.y = -E.D;
      vis.position.y = -24 + vp;
      const base = -24 + vp, haut = -10.2 - E.D;
      ressort.position.set(0, base, 0); ressort.longueur(Math.max(2, haut - base));
      majMembrane();
    };

    /* couleur du remplissage du serpentin : mélange jusqu'au front, vapeur ensuite, teintée par la sortie */
    const majRemplissage = () => {
      const cle = [E.uf.toFixed(3), E.s.toFixed(3), E.debit.toFixed(2)].join('|');
      if (cle === memCouleurs) return false;
      memCouleurs = cle;
      const col = geoRempl.attributes.color, tcol = geoTube.attributes.color, tcolI = geoTubeI.attributes.color;
      const tiede = clamp((E.s - 0.5) * 2, 0, 1), froid = clamp((0.5 - E.s) * 2, 0, 1);
      const liq = [0.14, 0.56, 0.94], vap = [0.5, 0.78, 0.96];             /* mélange : bleu franc ; vapeur : bleu pâle, toujours visible */
      const forme = u => { const m = lisser(E.uf + 0.07, E.uf - 0.07, u), z = (1 - m) * lisser(E.uf, 1, u); return { m, chaud: z * tiede, glace: z * froid }; };
      for (let i = 0; i < anneauxFluide.R.length; i++) {
        const { m, chaud, glace } = forme(anneauxFluide.u[i]);
        const a = 0.55 * (1 - m) + m * (0.7 + 0.22 * clamp(E.debit * 1.3, 0, 1));
        for (let k = 0; k < RAD + 1; k++) {
          const j = i * (RAD + 1) + k;
          col.setXYZ(j, (liq[0] * m + vap[0] * (1 - m)) + 0.1 * chaud - 0.1 * glace, (liq[1] * m + vap[1] * (1 - m)) - 0.2 * chaud - 0.04 * glace, (liq[2] * m + vap[2] * (1 - m)) - 0.34 * chaud + 0.02 * glace);
          col.setW(j, a);
        }
      }
      for (let i = 0; i < anneauxTube.R.length; i++) {                    /* la même teinte sur le tube : son abscisse est décalée de L0 */
        const f = forme((L0 + anneauxTube.u[i] * LT) / LS);
        for (let k = 0; k < RAD + 1; k++) {
          const j = i * (RAD + 1) + k;
          tcol.setXYZ(j, 1 - 0.45 * f.glace, 1 - 0.62 * f.chaud - 0.08 * f.glace, 1 - 0.8 * f.chaud);
          tcolI.setXYZ(j, 1 - 0.45 * f.glace, 1 - 0.62 * f.chaud - 0.08 * f.glace, 1 - 0.8 * f.chaud);
        }
      }
      col.needsUpdate = true; tcol.needsUpdate = true; tcolI.needsUpdate = true;
      return true;
    };

    const majMesures = () => {
      if (PROG !== 'forces' && PROG !== 'boucle') return;
      const nivP = f => f < 0.4 ? 'faible' : f < 0.6 ? 'moyenne' : 'forte';
      const nivR = f => f < 0.25 ? 'faible' : f < 0.45 ? 'moyenne' : 'forte';
      const t = [nivP(E.Pb), 'faible', nivR(FR(E.vis))].join('|');
      if (t === mesuresTxt) return; mesuresTxt = t;
      const v = t.split('|');
      ctx.mesures([
        { libelle: 'Pression du bulbe : ouvre', valeur: v[0] },
        { libelle: 'Pression d’évaporation : ferme', valeur: v[1] },
        { libelle: 'Ressort : ferme', valeur: v[2] }
      ]);
    };

    const majFleches = () => {
      const dz = 0.35 - E.D, haut = f => 40 * f;
      const yBulbe = 44 + dz * fMembrane(10) + 0.5;
      flBulbe.userData.regler(-10, yBulbe + Math.max(7, haut(E.Pb)), yBulbe, 1 + 0.5 * lisser(0.55, 0.85, E.Pb));
      const yBas = r => 44 + dz * fMembrane(r) - 0.5;
      flEvap.userData.regler(8, yBas(8) - Math.max(7, haut(FE)), yBas(8), 1);
      flRessort.userData.regler(18, yBas(18) - Math.max(7, haut(FR(E.vis))), yBas(18), 1 + 0.5 * lisser(0.45, 0.62, FR(E.vis)));
    };

    /* le fluide qui bouge : filets HP, bulles, molécules, impulsions ; rend true tant qu'il y a du mouvement */
    const bougerFluide = (dt) => {
      tempsFluide += dt;
      const Lh = cheminHP.getLength(), v = 14 + 40 * E.debit;
      for (let i = 0; i < NF; i++) {
        const u = ((i / NF + tempsFluide * v / Lh) % 1 + 1) % 1;
        cheminHP.getPointAt(u, pI); cheminHP.getTangentAt(u, dir);
        const lat = (alea[i] - 0.5) * (u < 0.5 ? 6.5 : 8.5), z = -0.8 - alea[i + 30] * 3.2;
        if (dir.y > 0.5) pI.x += lat * 0.7; else pI.y += lat * 0.7;
        pI.z = z;
        qI.setFromUnitVectors(HAUT, dir);
        const vu = u < 0.04 || u > 0.98 ? 0 : (E.debit > 0.03 ? 1 : 0);
        sI.set(vu, vu * (0.8 + 0.6 * E.debit), vu);
        m4.compose(pI, qI, sI); filets.setMatrixAt(i, m4);
      }
      filets.instanceMatrix.needsUpdate = true; filets.count = E.debit > 0.03 ? NF : 0;

      const sFront = LB0 + E.uf * LS, nb = Math.round(NB * clamp(E.debit * 1.25, 0, 1));
      const vb = 10 + 34 * E.debit;
      for (let i = 0; i < NB; i++) {
        const u0 = (i / NB + tempsFluide * vb / Math.max(40, sFront)) % 1;
        const s = u0 * sFront, u = s / LP;
        cheminBulles.getPointAt(Math.min(u, 0.9999), pI); cheminBulles.getTangentAt(Math.min(u, 0.9999), dir);
        const r = (0.25 + 1.5 * lisser(0, 90, s)) * (0.7 + 0.5 * alea[i + 60]);
        const lat = (alea[i + 90] - 0.5) * (s < 10 ? 2.4 : 6.2) * 0.9;
        pI.x += -dir.y * lat; pI.y += dir.x * lat; pI.z = -0.6 - alea[i + 120] * Math.min(3.4, 0.5 + s * 0.3);
        const vu = i < nb && E.debit > 0.03 ? r : 0;
        sI.set(vu, vu, vu); m4.compose(pI, qI.identity(), sI); bulles.setMatrixAt(i, m4);
      }
      bulles.instanceMatrix.needsUpdate = true; bulles.count = E.debit > 0.03 ? nb : 0;
      const lv = LP - sFront, nm = Math.round(NM * (0.35 + 0.65 * clamp(E.debit * 1.3, 0, 1)));
      for (let i = 0; i < NM; i++) {
        const s = sFront + ((i / NM + tempsFluide * (22 + 40 * E.debit) / Math.max(60, lv)) % 1) * lv, u = clamp(s / LP, 0, 0.9999);
        cheminBulles.getPointAt(u, pI); cheminBulles.getTangentAt(u, dir);
        const lat = (alea[i + 20] - 0.5) * 8.6;
        pI.x += -dir.y * lat; pI.y += dir.x * lat; pI.z = -0.5 - alea[i + 70] * 3.6;
        const vu = i < nm ? 1 : 0;
        sI.set(vu, vu, vu); m4.compose(pI, qI.identity(), sI); molecules.setMatrixAt(i, m4);
      }
      molecules.instanceMatrix.needsUpdate = true; molecules.count = nm;
      matMelange.opacity = 0.56 + 0.34 * clamp(E.debit * 1.4, 0, 1);
    };

    const bougerImpulsions = (dt, dPb) => {
      /* des grains violet clair du bulbe vers la tête quand la pression monte, de la tête vers le bulbe quand elle baisse */
      const actif = Math.abs(dPb) > 0.012 && courbeCap;
      impulsions.visible = !!actif && !etat.eclate;
      if (!actif) return false;
      etat.phaseImp = ((etat.phaseImp || 0) + dt * 0.55 * (dPb > 0 ? -1 : 1) + 1) % 1;
      for (let i = 0; i < NI; i++) {
        const u = ((i / NI + etat.phaseImp) % 1 + 1) % 1;
        courbeCap.getPointAt(u, pI);
        const k = 0.6 + 0.4 * Math.sin(u * Math.PI);
        sI.set(k, k, k); m4.compose(pI, qI.identity(), sI); impulsions.setMatrixAt(i, m4);
      }
      impulsions.instanceMatrix.needsUpdate = true;
      return true;
    };

    const boiteA = new T.Box3(), boiteB = new T.Box3();
    const estVisible = o => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
    const majAnneau = (t) => {
      let lit = null;
      for (const p of pieces) {
        let on = false;
        p.objets.forEach(o => o.traverse(m => { if (m.userData && m.userData.allumee) on = true; }));
        if (on) { lit = p; break; }
      }
      if (!lit) { if (anneau.visible) { anneau.visible = false; return true; } return false; }
      boiteA.makeEmpty();
      lit.objets.forEach(o => o.traverse(m => { if (m.isMesh && estVisible(m)) { boiteB.setFromObject(m); if (!boiteB.isEmpty()) boiteA.union(boiteB); } }));
      if (boiteA.isEmpty()) { anneau.visible = false; return false; }
      const dim = Math.max(boiteA.max.x - boiteA.min.x, boiteA.max.y - boiteA.min.y);
      if (dim > 80) { anneau.visible = false; return true; }
      boiteA.getCenter(anneau.position);
      const d = clamp(dim * 1.18 + 6, 18, 76) * (1 + 0.03 * Math.sin(t * 4.2));
      anneau.scale.set(d, d, 1); anneau.visible = true;
      return true;
    };

    /* un pas de la boucle de régulation */
    const avancer = (dt) => {
      const av = Object.assign({}, E);
      const suivre = (cle, cible, k) => { E[cle] = K.vers(E[cle], cible, k, dt); };
      if (LIEN.pb) suivre('Pb', PB(E.s), VITESSE.pb);
      if (LIEN.d) suivre('D', C.forceD !== null ? C.forceD : D_DE(E.Pb, C.vis), VITESSE.d);
      if (LIEN.deb) suivre('debit', DEB(E.D), VITESSE.deb);
      if (LIEN.uf) suivre('uf', UF(E.debit, C.ch), VITESSE.uf);
      suivre('s', S_DE(E.uf), VITESSE.s);
      suivre('vis', C.vis, VITESSE.vis);
      let bouge = false;
      for (const k in E) if (Math.abs(E[k] - av[k]) > 2e-4) bouge = true;
      return { bouge, dPb: (E.Pb - av.Pb) / Math.max(dt, 1e-3) };
    };

    /* ------------------------------------------------------------------ chauffer le bulbe (K.chaleur) */
    let memChaleur = -1;
    const majChaleur = () => {
      const chaud = clamp((E.s - 0.5) * 2.2, 0, 1), froid = clamp((0.5 - E.s) * 2.2, 0, 1);
      K.chaleur(cuivreBulbe, clamp((E.s - 0.5) * 3, 0, 1.4));
      cuivreBulbe.emissiveIntensity *= 1.4;
      const cle = (chaud - froid).toFixed(3);
      if (cle === memChaleur) return; memChaleur = cle;
      const col = geoChaleur.attributes.color, a = 0.62 * Math.max(chaud, froid);
      const c = chaud >= froid ? [1, 0.36, 0.1] : [0.35, 0.68, 1];
      for (let i = 0; i < anneauxTube.R.length; i++) {
        const al = a * lisser(0.56, 0.62, anneauxTube.u[i]);
        for (let k = 0; k < RAD + 1; k++) { const j = i * (RAD + 1) + k; col.setXYZW(j, c[0], c[1], c[2], al); }
      }
      col.needsUpdate = true;
    };

    /* ------------------------------------------------------------------ la coupe (bouton « Voir en coupe ») */
    const basculerFantome = on => { etat.coupe = !!on; majVisibilites(); };

    /* ------------------------------------------------------------------ les pièces */
    const pieces = [
      { id: 'corps', nom: 'Le corps en laiton', objets: [corpsFerme, corpsCoupe, tubeEntree, tubeSortie], ancre: [-14, 6, 18],
        desc: 'Un bloc de laiton creux. Le liquide arrive par le tube du bas, le mélange froid repart vers l’évaporateur par le tube de côté.' },
      { id: 'orifice', nom: 'L’orifice (la buse)', objets: [orifice], ancre: [0, -3, 0],
        desc: 'Un trou minuscule dans une bague d’acier. Le liquide s’y écrase : sa pression chute d’un coup. C’est lui qui limite le débit maximal.' },
      { id: 'clapet', nom: 'Le clapet et sa tige', objets: [tige, clapet],
        desc: 'La tige pousse le clapet. Clapet loin de l’orifice : le passage s’ouvre. Clapet contre l’orifice : il se ferme.' },
      { id: 'ressort', nom: 'Le ressort', objets: [ressort],
        desc: 'Il repousse le clapet vers l’orifice pour fermer le passage.' },
      { id: 'vis', nom: 'La vis de réglage et son capuchon', objets: [vis, capFerme, capCoupe],
        desc: 'La vis comprime plus ou moins le ressort. Le capuchon la protège. On ne la tourne qu’après avoir mesuré et diagnostiqué.' },
      { id: 'membrane', nom: 'La membrane', objets: [grpMembrane, piston],
        desc: 'Un disque d’acier très mince. Le gaz violet du bulbe la pousse vers le bas (ouvrir). L’évaporation (bleu) et le ressort (gris) la poussent vers le haut (fermer).' },
      { id: 'tete', nom: 'La tête thermostatique', objets: [domeSup, domeInf, jonc, embout], ancre: [-22, 50, 0],
        desc: 'Deux coques d’acier soudées autour de la membrane. Au-dessus : la pression du bulbe (violet). En dessous : la pression d’évaporation (bleu).' },
      { id: 'prise', nom: 'La prise de pression interne', objets: [prise], ancre: [10, 24, 0],
        desc: 'Un petit passage dans le corps. Il amène sous la membrane (en bleu) la pression qui règne juste après l’orifice.' },
      { id: 'capillaire', nom: 'Le capillaire', objets: [capillaire], ancre: [100, 66, -20],
        desc: 'Un tube de cuivre très fin, rempli du même fluide violet que le bulbe. Il relie le bulbe à la tête et transmet la pression.' },
      { id: 'bulbe', nom: 'Le bulbe et son collier', objets: [grpBulbe],
        desc: 'Un petit tube fermé, rempli de fluide violet, serré sur le tube de sortie de l’évaporateur. Plus il chauffe, plus la pression de ce fluide monte.' },
      { id: 'charge', nom: 'La charge du bulbe', objets: [chargeBulbe, chargeTete, chargeEmbout, chargeEmboutB, chargeCap],
        desc: 'Le fluide violet enfermé dans le bulbe, le capillaire et le dessus de la membrane : il passe d’un bout à l’autre, sans cloison. C’est lui qui pousse la membrane.' },
      { id: 'evap', nom: 'La sortie de l’évaporateur', objets: [tubeEvap], ancre: [90, -16, 8],
        desc: 'Le tube où l’on serre le bulbe. Sa température dit si le fluide en sort trop chaud (surchauffe forte) ou non.' }
    ];

    /* ------------------------------------------------------------------ les vues */
    const VUE = {
      tout: { azimut: -14, elevation: 10, zoom: 1.4, cible: [86, 6, 0] },
      objet: { azimut: -30, elevation: 16, zoom: 1.45, cible: [86, 6, 0] },
      valve: { azimut: -9, elevation: 7, zoom: 1.85, cible: [14, 6, 0] },
      tete: { azimut: -9, elevation: 7, zoom: 1.85, cible: [14, 6, 0] },
      sortie: { azimut: -12, elevation: 12, zoom: 3, cible: [150, -10, 0] },
      evap: { azimut: -12, elevation: 10, zoom: 2.4, cible: [112, -8, 0] },
      chaine: { azimut: -12, elevation: 12, zoom: 1.85, cible: [92, 22, 0] },
      orifice: { azimut: -9, elevation: 7, zoom: 3.4, cible: [6, 4, 0] },
      bulbe: { azimut: -12, elevation: 12, zoom: 4.2, cible: [166, -8, 0] },
      teteHaut: { azimut: -9, elevation: 7, zoom: 3.4, cible: [16, 46, 0] },
      chemin: { azimut: -10, elevation: 8, zoom: 1.95, cible: [26, 0, 0] },
      eclate: { azimut: -28, elevation: 12, zoom: 1.02, cible: [64, -8, 0] }
    };

    /* ------------------------------------------------------------------ les programmes, étape par étape */
    const liens = (pb, d, deb, uf, vpb) => { LIEN.pb = pb; LIEN.d = d; LIEN.deb = deb; LIEN.uf = uf; VITESSE.pb = vpb || 3.2; };
    /* Un déroulé : [[seconde, fonction], …] dans le temps du modèle (donc étiré par le ralenti, et rejoué par `avancer` des tests).
       Il sert à montrer l'ordre : le bulbe d'abord, puis la pression qui file dans le capillaire, puis la tête, puis seulement le clapet. */
    let seq = null;
    const deroule = liste => { seq = { t: 0, i: 0, liste }; };
    const avancerSeq = dt => {
      if (!seq) return false;
      seq.t += dt;
      while (seq && seq.i < seq.liste.length && seq.liste[seq.i][0] <= seq.t) { const f = seq.liste[seq.i][1]; seq.i++; f(); }
      if (seq && seq.i >= seq.liste.length) seq = null;
      return !!seq;
    };
    const camera = v => { if (ctx.element && ctx.element.orienter) ctx.element.orienter(v.azimut, v.elevation, v.zoom, v.cible || null); };
    const consigne = (ch, v) => { C.ch = ch; C.vis = v; C.forceD = null; };

    const ETAPES = {
      reconnaitre: [
        { titre: 'L’objet, tel qu’à l’atelier', piece: null, voirDedans: false, eclate: false, vue: VUE.objet, duree: 6,
          actions: [['fluide', false]],
          texte: 'Un corps en laiton avec deux tubes, une tête ronde en acier, un capillaire et un bulbe serré sur le tube.' },
        { titre: 'Éclaté, dans l’ordre du démontage', piece: null, voirDedans: false, eclate: true, vue: VUE.eclate, duree: 8,
          actions: [['fluide', false]],
          texte: 'Le bulbe se détache, la tête se lève, puis le capuchon, la vis, le ressort et le clapet sortent par le bas.' },
        { titre: 'La coupe : le chemin du fluide', piece: null, voirDedans: true, eclate: false, vue: VUE.chemin, duree: 10,
          actions: [['fluide', true], ['phase', 'stable']],
          texte: 'Le liquide arrive par le bas, passe l’orifice, puis repart en mélange froid : du liquide et de petites bulles.' }
      ],
      forces: [
        { titre: 'Équilibre', piece: 'membrane', voirDedans: true, eclate: false, vue: VUE.tete, duree: 9, actions: [['phase', 'f1']],
          texte: 'F bulbe = F évaporation + F ressort : la flèche violette équilibre la bleue et la grise. Le clapet garde sa position.' },
        { titre: 'Le bulbe est plus chaud', piece: null, voirDedans: true, eclate: false, vue: VUE.bulbe, duree: 14, actions: [['phase', 'f2']],
          texte: 'Le bulbe chauffe : sa pression (violet) file dans le capillaire et la chambre se fonce. La flèche violette pousse la membrane : le clapet s’éloigne et le passage augmente.' },
        { titre: 'La vis comprime le ressort', piece: 'ressort', voirDedans: true, eclate: false, vue: VUE.valve, duree: 10, ralenti: true, actions: [['phase', 'f3']],
          texte: 'Le ressort ferme plus fort : le clapet remonte, le passage diminue. On ne tourne la vis qu’après mesure et diagnostic.' }
      ],
      boucle: [
        { titre: 'Régime stable', piece: 'clapet', voirDedans: true, eclate: false, vue: VUE.valve, duree: 7, actions: [['phase', 'b1']],
          texte: 'La membrane est en équilibre : le clapet laisse passer juste ce qu’il faut de liquide.' },
        { titre: 'La sortie de l’évaporateur se réchauffe', piece: null, voirDedans: true, eclate: false, vue: VUE.bulbe, duree: 9, actions: [['phase', 'b2']],
          texte: 'La charge monte : le liquide s’évapore plus tôt, la vapeur sort plus chaude. Le bulbe, serré sur ce tube, chauffe avec lui.' },
        { titre: 'Le bulbe chauffe : sa pression monte', piece: null, voirDedans: true, eclate: false, vue: VUE.bulbe, duree: 11, actions: [['phase', 'b3']],
          texte: 'Le fluide violet du bulbe se dilate : sa pression monte. Des impulsions plus claires filent dans le capillaire jusqu’à la tête, dont la chambre se fonce.' },
        { titre: 'La membrane est poussée : le clapet s’ouvre', piece: 'membrane', voirDedans: true, eclate: false, vue: VUE.valve, duree: 10, ralenti: true, actions: [['phase', 'b4']],
          texte: 'La flèche violette l’emporte sur la bleue et la grise : la membrane descend, la tige pousse le clapet loin de l’orifice, le passage s’agrandit.' },
        { titre: 'Plus de liquide entre dans l’évaporateur', piece: 'evap', voirDedans: true, eclate: false, vue: VUE.evap, duree: 10, actions: [['phase', 'b5']],
          texte: 'Le liquide va plus loin dans le serpentin : la vapeur sort moins chaude, la surchauffe redescend.' },
        { titre: 'La pression du bulbe baisse : le ressort referme', piece: 'ressort', voirDedans: true, eclate: false, vue: VUE.valve, duree: 11, ralenti: true, actions: [['phase', 'b6']],
          texte: 'Le ressort et la pression d’évaporation ramènent le clapet : le détendeur trouve un nouvel équilibre.' }
      ],
      pieces: [],
      debit: []
    };

    const PHASES = {
      stable: () => { seq = null; liens(1, 1, 1, 1); consigne(0.5, 0.5); },
      f1: () => { seq = null; liens(1, 1, 1, 1); consigne(0.5, 0.5); },
      /* le bulbe d'abord (la sortie chauffe), puis la pression qui file dans le capillaire, puis la tête, puis seulement la membrane et le clapet */
      f2: () => {
        liens(0, 0, 0, 1, 0.55); consigne(0.8, 0.5);
        deroule([[2.4, () => { liens(1, 0, 0, 1, 0.55); camera(VUE.chaine); }], [4.6, () => camera(VUE.teteHaut)], [6.4, () => { liens(1, 1, 1, 0); camera(VUE.tete); }]]);   /* le bulbe reste chaud : on regarde la membrane et le clapet, la boucle se referme à l'écran 7 */
      },
      f3: () => { seq = null; liens(1, 1, 1, 1); consigne(0.5, 0.9); },
      b1: () => { seq = null; liens(1, 1, 1, 1); consigne(0.5, 0.5); },
      b2: () => { seq = null; liens(0, 0, 0, 1); consigne(0.8, 0.5); },
      b3: () => {
        liens(1, 0, 0, 1, 0.5); consigne(0.8, 0.5);
        deroule([[2.6, () => camera(VUE.chaine)], [5, () => camera(VUE.teteHaut)]]);
      },
      b4: () => { seq = null; liens(1, 1, 1, 0); consigne(0.8, 0.5); },
      b5: () => { seq = null; liens(0, 0, 0, 1); consigne(0.8, 0.5); },
      b6: () => { seq = null; liens(1, 1, 1, 1); consigne(0.8, 0.5); }
    };

    const PHRASES = {
      reconnaitre: 'Voici le détendeur tel qu’on le trouve à l’atelier. Tourne-le avec la souris ou le doigt, puis appuie sur « Commencer ».',
      pieces: 'Survole ou touche une pièce : son nom s’allume dans la liste et dans l’image. Un clic donne son rôle.',
      debit: 'Compare faible, moyenne et forte ouverture : regarde le clapet, le liquide et les petites bulles.',
      forces: 'Les trois flèches sont les forces sur la membrane. Appuie sur « Commencer ».',
      boucle: 'Suis la boucle pas à pas, ou teste directement : la sortie chauffe, la sortie refroidit.'
    };
    const OUVERTURES = {
      small: { D: 0.55, texte: '<strong>Faible ouverture :</strong> petit passage : le débit massique est limité.' },
      modulating: { D: null, texte: '<strong>Modulation :</strong> le passage s’adapte ; le débit massique se conserve entre entrée et sortie au régime permanent.' },
      large: { D: 2.8, texte: '<strong>Forte ouverture :</strong> grand passage : davantage de fluide peut être injecté, puis partiellement vaporisé.' }
    };
    const REPONSES = {
      chaud: '<strong>La sortie chauffe :</strong> la pression du bulbe augmente, le clapet ouvre et le débit augmente.',
      froid: '<strong>La sortie refroidit :</strong> la pression du bulbe baisse, le ressort referme et le débit diminue.'
    };

    const agir = (id, v) => {
      if (id === 'fluide') { etat.fluide = !!v; majVisibilites(); return; }
      if (id === 'phase') { if (PHASES[v]) PHASES[v](); ctx.regler('sortie', ''); ctx.reveiller(); return; }
      if (id === 'ouverture') {
        seq = null;
        const o = OUVERTURES[v]; if (!o) return;
        liens(1, 1, 1, 1); consigne(0.5, 0.5); C.forceD = o.D;
        ctx.dire(o.texte); ctx.reveiller(); return;
      }
      if (id === 'sortie') {
        seq = null;
        liens(1, 1, 1, 1); consigne(v === 'chaud' ? 0.8 : 0.2, 0.5);
        ctx.dire(REPONSES[v] || '');
        ctx.reveiller(); return;
      }
    };

    /* un clic sur une pièce (dans l'image ou dans la liste) : son nom et son rôle en mots simples, la caméra
       s'approche, et la coupe s'ouvre si la pièce est à l'intérieur */
    const PLAN_PIECE = {
      corps: VUE.valve, tete: { azimut: -9, elevation: 7, zoom: 3, cible: [0, 46, 0] },
      orifice: { azimut: -9, elevation: 7, zoom: 4.8, cible: [0, -2, 0] }, clapet: { azimut: -9, elevation: 7, zoom: 3.2, cible: [0, 10, 0] },
      ressort: { azimut: -9, elevation: 7, zoom: 4.4, cible: [0, -16, 0] }, vis: { azimut: -9, elevation: 7, zoom: 3.6, cible: [0, -32, 0] },
      membrane: VUE.tete, prise: { azimut: -9, elevation: 7, zoom: 4.4, cible: [8, 26, 0] },
      capillaire: VUE.chaine, bulbe: VUE.sortie, charge: VUE.chaine, evap: VUE.evap
    };
    const INTERNES = { orifice: 1, clapet: 1, ressort: 1, membrane: 1, prise: 1, charge: 1 };
    if (ctx.element && (PROG === 'pieces' || PROG === 'reconnaitre')) {
      ctx.element.addEventListener('e3d-choix', ev => {
        const p = pieces.find(x => x.id === ev.detail.id);
        const el = ctx.element;
        if (p) {
          ctx.dire('<strong>' + p.nom + '.</strong> ' + p.desc);
          if (INTERNES[p.id] && !etat.coupe && !etat.eclate) el.fantome(true);
          const v = PLAN_PIECE[p.id]; if (v && !etat.eclate) el.orienter(v.azimut, v.elevation, v.zoom, v.cible || null);
        } else if (PROG === 'pieces') { ctx.dire(PHRASES.pieces); el.orienter(VUE.tout.azimut, VUE.tout.elevation, VUE.tout.zoom, VUE.tout.cible); }
      });
    }

    { const bt = ctx.element && ctx.element.querySelector('.e3d-bt-fantome'); if (bt) bt.textContent = '◐ Voir en coupe'; }

    /* le modèle de départ : l'équilibre, tout posé */
    poser(); majTeinteTete(); majRemplissage(); majFleches(); majChaleur(); majVisibilites(); majMesures();
    majCapillaire();
    const commandes = PROG === 'boucle'
      ? [{ id: 'sortie', type: 'choix', options: [['chaud', 'La sortie chauffe'], ['froid', 'La sortie refroidit']], valeur: '' }]
      : PROG === 'debit'
        ? [{ id: 'ouverture', type: 'choix', options: [['small', 'Faible ouverture'], ['modulating', 'Modulation'], ['large', 'Forte ouverture']], valeur: 'modulating' }]
        : [];

    return {
      racine,
      vue: PROG === 'reconnaitre' ? VUE.objet : (PROG === 'pieces' ? VUE.tout : (PROG === 'debit' ? VUE.orifice : VUE.valve)),
      phrase: PHRASES[PROG],
      pieces, commandes,
      etapes: ETAPES[PROG],
      fantome: [],
      fantomeAuDepart: PROG !== 'reconnaitre',
      basculerFantome,
      libellesFantome: ['◐ Voir en coupe', '◑ Refermer'],
      eclate: [
        { objets: [grpBulbe], vers: [14, 34, 0], debut: 0, fin: 0.35 },
        { objets: [grpTete], vers: [0, 56, 0], debut: 0.15, fin: 0.55 },
        { objets: [capFerme, capCoupe], vers: [0, -100, 0], debut: 0.3, fin: 0.7 },
        { objets: [vis], vers: [0, -78, 0], debut: 0.4, fin: 0.8 },
        { objets: [ressort], vers: [0, -56, 0], debut: 0.5, fin: 0.9 },
        { objets: [clapet], vers: [0, -34, 0], debut: 0.6, fin: 1 }
      ],
      eclateVue: VUE.eclate,
      surEclate(on) { etat.eclate = !!on; majVisibilites(); },
      agir,
      /* pour le contrôle automatique (tests/qa.mjs) : l'état physique affiché */
      etat: () => Object.assign({}, E, { coupe: etat.coupe, eclate: etat.eclate, fluide: etat.fluide }),
      animer(dt) {
        const r = avancer(dt);
        let actif = r.bouge;
        if (avancerSeq(dt)) actif = true;
        if (r.bouge) { poser(); majMembrane(); majTeinteTete(); majChaleur(); majMesures(); if (etat.fleches) majFleches(); }
        if (majRemplissage()) actif = true;
        if (majCapillaire()) actif = true;
        if (bougerImpulsions(dt, r.dPb)) actif = true;
        if (etat.coupe && etat.fluide && !etat.eclate) { bougerFluide(dt); actif = true; }
        tempsAnneau += dt; if (majAnneau(tempsAnneau)) actif = true;
        return actif;
      },
      detruire() { seq = null; }
    };
  }, { famille: 'detendeurs', titre: 'Le détendeur thermostatique', stations: [] });
})();
