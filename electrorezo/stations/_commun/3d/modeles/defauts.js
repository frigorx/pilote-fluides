/* ÉlectroRézo 3D — famille « defauts » : troisDefauts, priseDeTerre, cablesSections.
   Ce que le courant fait quand ça tourne mal, et ce qui l’en protège.
   Unités : mm. Repère : X largeur, Y hauteur, Z profondeur (+Z = face avant).

   Ce que l’élève doit COMPRENDRE (chaque modèle le raconte pas à pas, voir `etapes`) :
   · troisDefauts — le bon chemin du courant (phase → machine → neutre), puis les trois façons
     de le quitter : trop fort et longtemps (la surcharge), un raccourci (le court-circuit),
     une fuite vers la carcasse puis vers la terre (le défaut d’isolement) ;
   · priseDeTerre — la terre ne coupe rien : elle offre au courant de défaut un chemin franc ;
     sans elle, la carcasse reste sous tension et le courant attend ;
   · cablesSections — le même courant, des fils de grosseurs différentes : le fin chauffe d’abord. */
(() => {
  'use strict';
  if (!window.Electro3D) return;

  /* ====================================================================== briques locales
     Écrites ici faute de mieux dans le kit ; la fiche dit lesquelles remonter. */
  const briques = (T, K) => {
    const M = K.mat;
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const pt = p => (p && p.isVector3) ? p.clone() : new T.Vector3(p[0], p[1], p[2]);
    const lisse = pts => new T.CatmullRomCurve3(pts.map(pt), false, 'centripetal', 0.5);
    const chemin = pts => K.chemin(pts.map(pt));
    const axeZ = m => { m.rotation.x = Math.PI / 2; return m; };
    const axeX = m => { m.rotation.z = Math.PI / 2; return m; };

    /* un tube le long d'une courbe (segments modérés : le budget est de 80 000 triangles) */
    const tube = (c, r, mat, o) => {
      o = o || {};
      const segs = Math.max(4, Math.min(o.max || 400, Math.round(c.getLength() / (o.pas || 4))));
      return new T.Mesh(new T.TubeGeometry(c, segs, r, o.radial || 10, false), mat);
    };

    /* le COURANT : des grains dorés, régulièrement espacés, qui vont et viennent (alternatif).
       densite 0..1 : la part des grains visibles (le kit ne règle que la longueur de la file) ;
       xray : les grains se voient à travers la matière (dans le cuivre sous l'isolant). */
    const geoGrain = new T.SphereGeometry(1, 7, 5);
    const flux = (c, o) => {
      o = o || {};
      const L = c.getLength();
      const M0 = Math.max(8, Math.ceil(L / 2));
      const pts = c.getSpacedPoints(M0);
      const N = Math.max(3, Math.min(240, Math.round(L / (o.pas || 9))));
      const mat = new T.MeshBasicMaterial({ color: 0xffb21a, toneMapped: false });
      if (o.xray) mat.depthTest = false;
      const im = new T.InstancedMesh(geoGrain, mat, N);
      im.userData.sansOmbre = true; im.castShadow = false; im.receiveShadow = false; im.frustumCulled = false;
      if (o.xray) im.renderOrder = 9;
      const e = { densite: 0, amplitude: 8, frequence: 0.7, rayon: 1.6, t: 0 };
      Object.assign(e, o);
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3(), p = new T.Vector3();
      const poser = () => {
        const d = K.clamp(e.densite, 0, 1);
        const dec = d > 0 ? e.amplitude * Math.sin(e.t * 2 * Math.PI * e.frequence) : 0;
        for (let i = 0; i < N; i++) {
          const u = (i + 0.5) / N + dec / L;
          const garde = Math.floor((i + 1) * d + 1e-9) > Math.floor(i * d + 1e-9);
          if (garde && u > 0 && u < 1) {
            const f = u * M0, i0 = Math.min(M0 - 1, Math.floor(f));
            p.copy(pts[i0]).lerp(pts[i0 + 1], f - i0); sc.setScalar(e.rayon);
          } else { p.set(0, 0, 0); sc.setScalar(0); }
          m4.compose(p, q, sc); im.setMatrixAt(i, m4);
        }
        im.instanceMatrix.needsUpdate = true;
        im.visible = d > 0 && !e.masque;
      };
      poser();
      return {
        objet: im, longueur: L,
        regler(o2) { Object.assign(e, o2); poser(); },
        animer(dt) { if (e.densite <= 0) return false; e.t += dt; poser(); return true; }
      };
    };

    /* la FUMÉE : des bouffées grises qui montent, grossissent et s'effacent */
    const texFumee = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 2, 32, 32, 31);
      g.addColorStop(0, 'rgba(92,89,87,.95)'); g.addColorStop(0.5, 'rgba(108,104,101,.55)'); g.addColorStop(1, 'rgba(120,116,112,0)');
      x.fillStyle = g; x.fillRect(0, 0, 64, 64);
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const fumee = (n, o) => {
      o = o || {};
      const g = new T.Group(), spr = [];
      for (let i = 0; i < n; i++) {
        const s = new T.Sprite(new T.SpriteMaterial({ map: texFumee, transparent: true, depthWrite: false, opacity: 0 }));
        s.visible = false; g.add(s); spr.push(s);
      }
      const e = { intensite: 0, t: 0 };
      const haut = o.hauteur || 70, cycle = o.cycle || 2.6, taille = o.taille || 14;
      return {
        objet: g,
        regler(v) { e.intensite = v; if (v <= 0.02) spr.forEach(s => { s.visible = false; }); },
        animer(dt) {
          if (e.intensite <= 0.02) return false;
          e.t += dt;
          spr.forEach((s, i) => {
            const ph = (e.t / cycle + i / n) % 1;
            s.visible = true;
            s.position.set(Math.sin(ph * 5 + i * 2.1) * 3 * ph, ph * haut, Math.cos(ph * 4 + i) * 2 * ph);
            s.scale.setScalar(taille * (0.45 + ph * 1.9));
            s.material.opacity = e.intensite * 0.62 * Math.pow(1 - ph, 1.2) * K.lisse(Math.min(1, ph * 5));
          });
          return true;
        }
      };
    };

    /* le sol en coupe : des couches empilées vers le bas à partir de y = 0, toujours claires */
    const texSol = (hex, o) => {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d'); x.fillStyle = hex; x.fillRect(0, 0, 128, 128);
      let s = o.graine || 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < 520; i++) {
        x.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,.17)' : 'rgba(70,45,20,.13)';
        const w = 1 + rnd() * 2.4; x.fillRect(rnd() * 128, rnd() * 128, w, w * (0.6 + rnd() * 0.8));
      }
      for (let i = 0; i < (o.cailloux || 0); i++) {
        const r = 3 + rnd() * 7; x.fillStyle = rnd() < 0.5 ? 'rgba(255,255,255,.38)' : 'rgba(95,82,70,.22)';
        x.beginPath(); x.ellipse(rnd() * 128, rnd() * 128, r, r * (0.6 + rnd() * 0.3), rnd() * 3, 0, 6.283); x.fill();
      }
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      return t;
    };
    const couches = (largeur, profondeur, liste, echelle) => {
      let y = 0; const meshes = [];
      liste.forEach(cc => {
        const t = texSol(cc.couleur, cc);
        t.repeat.set(largeur / (echelle || 60), cc.h / (echelle || 60));
        const m = new T.Mesh(new T.BoxGeometry(largeur, cc.h, profondeur), new T.MeshStandardMaterial({ color: 0xffffff, map: t, roughness: 0.95, metalness: 0 }));
        m.position.set(0, -(y + cc.h / 2), 0); m.name = 'sol-' + cc.id;
        meshes.push(m); y += cc.h;
      });
      return { meshes };
    };

    /* le symbole de la terre : trois traits de longueur décroissante (il existe sur les bornes de terre) */
    const symboleTerre = (h, couleur) => {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d'); x.strokeStyle = couleur || '#2b3138'; x.lineWidth = 10; x.lineCap = 'round';
      x.beginPath(); x.moveTo(64, 8); x.lineTo(64, 52);
      x.moveTo(14, 56); x.lineTo(114, 56); x.moveTo(34, 82); x.lineTo(94, 82); x.moveTo(52, 108); x.lineTo(76, 108);
      x.stroke();
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
      const m = new T.Mesh(new T.PlaneGeometry(h, h), new T.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 }));
      m.userData.sansOmbre = true; m.castShadow = false; m.renderOrder = 2;
      return m;
    };

    /* l'ÉCLAIR : un soleil jaune-orange à cœur blanc, qui scintille (visible sur fond clair, où un halo blanc se perd) */
    const texFlash = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 62);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.16, 'rgba(255,248,190,1)'); g.addColorStop(0.38, 'rgba(255,196,64,.82)');
      g.addColorStop(0.7, 'rgba(255,128,30,.3)'); g.addColorStop(1, 'rgba(255,90,0,0)');
      x.fillStyle = g; x.fillRect(0, 0, 128, 128);
      x.translate(64, 64); x.strokeStyle = 'rgba(255,240,170,.95)'; x.lineCap = 'round'; x.lineWidth = 3;
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 + 0.3, r = 38 + (i % 2) * 18; x.beginPath(); x.moveTo(Math.cos(a) * 9, Math.sin(a) * 9); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke(); }
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
    })();
    const eclair = (taille) => {
      const s = new T.Sprite(new T.SpriteMaterial({ map: texFlash, transparent: true, depthWrite: false, depthTest: false }));
      s.renderOrder = 10; s.visible = false; s.userData.sansOmbre = true; s.raycast = () => {};
      let t = 0, on = false;
      return {
        objet: s,
        regler(v) { on = !!v; s.visible = on; },
        placer(p) { s.position.copy(pt(p)); },
        animer(dt) {
          if (!on) return false;
          t += dt; s.scale.setScalar(taille * (0.8 + 0.2 * Math.sin(t * 38) + 0.12 * Math.sin(t * 23 + 1))); s.material.rotation = t * 2.4;
          return true;
        }
      };
    };

    /* les ÉTINCELLES : des points brillants lancés en l'air, qui retombent et rebondissent sur le sol */
    const etincelles = (n, taille) => {
      const im = new T.InstancedMesh(geoGrain, new T.MeshBasicMaterial({ color: 0xffeaa6, toneMapped: false }), n);
      im.userData.sansOmbre = true; im.castShadow = false; im.frustumCulled = false; im.visible = false;
      const S = Array.from({ length: n }, () => ({ p: V(0, 0, 0), v: V(0, 0, 0), vie: 9, duree: 1 }));
      let on = false;
      const origine = V(0, 0, 0);
      const m4 = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3();
      const lancer = s => {
        const a = Math.random() * Math.PI * 2, el = 0.15 + Math.random() * 1.1, vit = 70 + Math.random() * 150;
        s.p.copy(origine); s.v.set(Math.cos(a) * Math.cos(el), Math.sin(el), Math.sin(a) * Math.cos(el)).multiplyScalar(vit);
        s.vie = 0; s.duree = 0.3 + Math.random() * 0.45;
      };
      return {
        objet: im,
        placer(p) { origine.copy(pt(p)); },
        regler(v) { on = !!v; if (on) S.forEach(s => { lancer(s); s.vie = Math.random() * s.duree; }); im.visible = on; },
        animer(dt) {
          let vivant = false;
          S.forEach((s, i) => {
            if (s.vie >= s.duree && on) lancer(s);
            if (s.vie < s.duree) {
              s.vie += dt; s.v.y -= 520 * dt; s.p.addScaledVector(s.v, dt);
              if (s.p.y < origine.y - 4 && s.v.y < 0) { s.p.y = origine.y - 4; s.v.y *= -0.35; s.v.x *= 0.6; s.v.z *= 0.6; }
              sc.setScalar((taille || 1) * (0.05 + 0.95 * Math.max(0, 1 - s.vie / s.duree))); vivant = true;
            } else sc.setScalar(0);
            m4.compose(s.p, q, sc); im.setMatrixAt(i, m4);
          });
          im.instanceMatrix.needsUpdate = true; im.visible = vivant;
          return vivant;
        }
      };
    };

    /* les fractions de longueur des points d'un tracé (pour dire « à telle fraction du câble ») */
    const fractions = pts => {
      const v = pts.map(pt), cum = [0];
      for (let i = 1; i < v.length; i++) cum.push(cum[i - 1] + v[i].distanceTo(v[i - 1]));
      return cum.map(c => c / cum[cum.length - 1]);
    };

    /* un FAISCEAU : la ligne médiane d'un câble et, en chaque point, un repère (haut, côté) pour y ranger
       des conducteurs. cles = [[fraction, direction « haut »]…] : à ces fractions-là, le haut du faisceau
       pointe dans la direction donnée ; entre deux, il se vrille doucement (on interpole l'ANGLE autour
       du câble, jamais un vecteur : le faisceau ne se retourne pas d'un coup). */
    const faisceau = (pts, cles, n) => {
      const c = lisse(pts);
      const L = c.getLength();
      n = n || Math.max(30, Math.round(L / 4));
      const P = [], Tg = [];
      for (let i = 0; i <= n; i++) { P.push(c.getPointAt(i / n)); Tg.push(c.getTangentAt(i / n).normalize()); }
      const perp = (v, t) => { const r = pt(v); r.addScaledVector(t, -r.dot(t)); return r.normalize(); };
      /* un « haut » transporté sans torsion le long du câble */
      const H = [perp(cles[0][1], Tg[0])], q = new T.Quaternion();
      for (let i = 1; i <= n; i++) { q.setFromUnitVectors(Tg[i - 1], Tg[i]); H.push(H[i - 1].clone().applyQuaternion(q).normalize()); }
      /* la torsion qu'il faut ajouter à chaque clé pour que le haut pointe où l'on veut */
      const angle = (a, b, t) => Math.atan2(t.dot(new T.Vector3().crossVectors(a, b)), a.dot(b));
      const tw = cles.map(([f, r]) => { const i = Math.min(n, Math.round(f * n)); return [i, angle(H[i], perp(r, Tg[i]), Tg[i])]; });
      for (let k = 1; k < tw.length; k++) {
        while (tw[k][1] - tw[k - 1][1] > Math.PI) tw[k][1] -= 2 * Math.PI;
        while (tw[k][1] - tw[k - 1][1] < -Math.PI) tw[k][1] += 2 * Math.PI;
      }
      const torsion = i => {
        if (i <= tw[0][0]) return tw[0][1];
        for (let k = 0; k < tw.length - 1; k++) if (i <= tw[k + 1][0]) return tw[k][1] + (tw[k + 1][1] - tw[k][1]) * K.lisse((i - tw[k][0]) / Math.max(1, tw[k + 1][0] - tw[k][0]));
        return tw[tw.length - 1][1];
      };
      const HAUT = [], COTE = [];
      for (let i = 0; i <= n; i++) {
        const h = H[i].clone().applyAxisAngle(Tg[i], torsion(i)).normalize();
        HAUT.push(h); COTE.push(new T.Vector3().crossVectors(Tg[i], h));
      }
      return { courbe: c, n, L, P, HAUT, COTE, decale: (i, dx, dy) => P[i].clone().addScaledVector(COTE[i], dx).addScaledVector(HAUT[i], dy) };
    };

    /* un bornier à vis, sur rail : un bloc de 12 mm de large, deux vis de face, l'entrée du fil en haut et en bas */
    const bornier = (mat, h) => {
      h = h || 50;
      const g = new T.Group();
      g.add(K.mesh(K.boite(12, h, 36, 1.2), mat));
      [h / 2 - 9, -h / 2 + 9].forEach(y => { const v = K.vis(3); v.rotation.x = Math.PI / 2; v.position.set(0, y, 18); g.add(v); });
      [h / 2, -h / 2].forEach(y => g.add(K.mesh(K.boite(6, 1.4, 8, 0.3), M.sombre, 0, y, 0)));
      return g;
    };

    /* une barre de terre : un socle isolant, une barre de laiton avec ses n bornes à vis (qui se lève d'un bloc) ;
       le symbole de la terre sur le socle */
    const barreTerre = (n) => {
      const pas = 14, L = n * pas + 8;
      const g = new T.Group(), barre = new T.Group();
      g.add(K.mesh(K.boite(L + 6, 15, 16, 1.2), M.plastiqueBlanc, 0, 0, 0));
      barre.add(K.mesh(K.boite(L, 6, 9, 0.6), M.laiton, 0, 3.5, 1));
      const bornes = [];
      for (let i = 0; i < n; i++) {
        const x = (i - (n - 1) / 2) * pas;
        const v = K.vis(2.8); v.rotation.x = Math.PI / 2; v.position.set(x, 3.5, 5.5); barre.add(v);
        bornes.push(V(x, -7.5, 0));
      }
      g.add(barre);
      const sym = symboleTerre(7); sym.position.set(0, -3.2, 8.15); g.add(sym);
      return { groupe: g, barre, bornes };
    };

    /* un piquet de terre : une tige de cuivre (acier cuivré), sa pointe, sa tête et son collier.
       Origine = la tête ; la tige descend vers −Y. Le collier est à 14 mm sous la tête. */
    const piquet = (o) => {
      o = o || {};
      const r = o.rayon || 7, Lg = o.longueur || 200;
      const g = new T.Group();
      g.add(K.mesh(K.cylindre(r, Lg, 22), M.cuivre, 0, -Lg / 2, 0));
      const pointe = new T.Mesh(new T.ConeGeometry(r, 16, 22), M.cuivre); pointe.rotation.x = Math.PI; pointe.position.set(0, -Lg - 8, 0); g.add(pointe);
      g.add(K.mesh(K.cylindre(r + 1.6, 7, 22), M.acierSombre, 0, 3.5, 0));
      const collier = new T.Group(); collier.position.set(0, -14, 0);
      collier.add(K.mesh(K.boite(2 * r + 9, 14, 2 * r + 9, 1.4), M.laiton));
      [-1, 1].forEach(s => { const v = K.vis(2.6); v.rotation.x = Math.PI / 2; v.position.set(s * (r + 1.2), 0, r + 4.6); collier.add(v); });
      g.add(collier);
      return { groupe: g };
    };

    /* le MOTEUR : une machine à carcasse métallique (taille 71, 0,37 kW environ), ses ailettes, son capot
       de ventilateur, son arbre, sa boîte à bornes (une cuve, un couvercle) et son presse-étoupe.
       Origine = le sol sous l'axe ; X = l'axe (bout d'arbre vers +X) ; la boîte est dessus. */
    const moteur = (o) => {
      o = o || {};
      const g = new T.Group();
      const matC = K.propre(M.fonte);
      const AXE = 74, R = 57, BX = 4, BZ = 0;
      const corps = [], boite = [], interieur = [];
      const poser = (m, liste, x, y, z) => { m.position.set(x, y, z); g.add(m); if (liste) liste.push(m); return m; };
      /* le stator, ses ailettes, ses flasques */
      poser(axeX(K.mesh(K.cylindre(R, 114, 44), matC)), corps, 5, AXE, 0);
      [45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315].forEach(a0 => {
        const a = a0 * K.D2R, f = K.mesh(new T.BoxGeometry(106, 7, 2.4), matC);
        f.position.set(5, AXE + Math.cos(a) * (R + 2.8), Math.sin(a) * (R + 2.8)); f.rotation.x = a; g.add(f); corps.push(f);
      });
      poser(axeX(K.mesh(K.cylindre(R - 3, 14, 44), matC)), corps, 69, AXE, 0);
      poser(axeX(K.mesh(K.cylindre(20, 10, 28), matC)), corps, 81, AXE, 0);
      poser(axeX(K.mesh(K.cylindre(R - 3, 10, 44), matC)), corps, -57, AXE, 0);
      /* le capot de ventilateur (un groupe, pour l'éclater d'un bloc) et ses fentes d'aération */
      const capot = new T.Group(); capot.position.set(-62, AXE, 0); g.add(capot); corps.push(capot);
      const profil = [[R - 4, 0], [R - 6, 8], [R - 10, 32], [R - 18, 41], [R - 34, 44.5], [R - 52, 45.5], [0, 45.5]].map(p => new T.Vector2(p[0], p[1]));
      capot.add(axeX(new T.Mesh(new T.LatheGeometry(profil, 40), matC)));
      for (let i = 0; i < 28; i++) {
        const a = i / 28 * Math.PI * 2, s = K.mesh(new T.BoxGeometry(12, 1.2, 3.2), M.sombre);
        s.position.set(-24, Math.cos(a) * 48.9, Math.sin(a) * 48.9); s.rotation.x = a; capot.add(s);
      }
      /* l'arbre et sa clavette : ce qui tourne */
      const arbre = new T.Group(); arbre.position.set(0, AXE, 0); g.add(arbre); corps.push(arbre);
      const tige = axeX(K.mesh(K.cylindre(7, 36, 24), M.acier)); tige.position.x = 104; arbre.add(tige);
      arbre.add(K.mesh(K.boite(22, 3.6, 5, 0.6), M.acierSombre, 108, 7.2, 0));
      /* les pattes et la visserie */
      poser(K.mesh(K.boite(100, 10, 124, 1.6), matC), corps, -2, 5, 0);
      poser(K.mesh(K.boite(96, 22, 56, 1.2), matC), corps, -2, 20, 0);
      [[-38, -50], [38, -50], [-38, 50], [38, 50]].forEach(([x, z]) => { const v = K.vis(5); v.position.set(x, 10, z); g.add(v); corps.push(v); });
      /* la boîte à bornes : une cuve ouverte (fond et quatre parois) et son couvercle */
      [[84, 34, 4, BX, 140, BZ - 34], [84, 34, 4, BX, 140, BZ + 34], [4, 34, 64, BX - 40, 140, BZ], [4, 34, 64, BX + 40, 140, BZ], [76, 5, 64, BX, 129.5, BZ]]
        .forEach(([w, h, d, x, y, z]) => poser(K.mesh(K.boite(w, h, d, 1), matC), boite, x, y, z));
      const couvercle = K.mesh(K.boite(84, 8, 72, 2), matC); poser(couvercle, boite, BX, 160.5, BZ);
      [[-34, -28], [34, -28], [-34, 28], [34, 28]].forEach(([x, z]) => { const v = K.vis(3.2); v.position.set(x, 4, z); couvercle.add(v); });
      /* la plaque à bornes : trois vis, de gauche à droite PE, neutre, phase */
      poser(K.mesh(K.boite(62, 7, 26, 1), M.plastiqueNoir), interieur, BX, 135.5, -2);
      const bornes = { PE: V(BX - 20, 143, -2), N: V(BX, 143, -2), L: V(BX + 20, 143, -2) };
      [bornes.PE, bornes.N, bornes.L].forEach(b => { const v = K.vis(3); v.position.set(b.x, 139, b.z); g.add(v); interieur.push(v); });
      /* le PE est relié à la cuve : une tresse de cuivre */
      const tresse = tube(lisse([[BX - 20, 141, -2], [BX - 28, 140.6, -2], [BX - 35, 144, -2]]), 1.2, M.cuivre, { pas: 3, radial: 8 });
      g.add(tresse); interieur.push(tresse);
      /* le brin : un fil dont l'isolant est abîmé frôle la paroi (visible seulement pendant le défaut) */
      const contact = V(BX + 37.8, 146, 0);
      const brin = tube(lisse([[BX + 20, 142.4, -2], [BX + 27, 147, -1], [BX + 34, 149, 0], [contact.x, contact.y, 0]]), 0.9, M.cuivre, { pas: 2, radial: 8 });
      brin.visible = false; g.add(brin);
      /* le presse-étoupe : par où le câble entre (devant, ou derrière) */
      const presse = new T.Group(); presse.position.set(BX, 141, o.arriere ? -36 : 36); if (o.arriere) presse.rotation.y = Math.PI; g.add(presse);
      presse.add(axeZ(K.mesh(K.cylindre(7.2, 12, 24), M.laiton, 0, 0, 4)));
      presse.add(axeZ(K.mesh(K.cylindre(9.6, 6, 6), M.laiton, 0, 0, 8.5)));
      presse.add(axeZ(K.mesh(K.cylindre(7.2, 8, 24, 5.4), M.plastiqueNoir, 0, 0, 15)));
      corps.push(presse);
      /* la vis de terre sur la patte, devant (facultative) */
      let cosse = null;
      if (o.cosse) {
        const v = K.vis(3.4); v.rotation.x = Math.PI / 2; v.position.set(-34, 7, 63); g.add(v); corps.push(v);
        cosse = V(-34, 7, 66.5);
      }
      return { groupe: g, mat: matC, corps, boite, interieur, arbre, couvercle, capot, presse, brin, tresse, bornes, contact, cosse };
    };

    return { V, pt, lisse, chemin, axeZ, axeX, tube, flux, fumee, couches, symboleTerre, eclair, etincelles, fractions, faisceau, bornier, barreTerre, piquet, moteur };
  };

  /* ====================================================================== 1.8 — trois façons de mal tourner
     Un coffret, un câble (phase marron, neutre bleu, PE vert-jaune) et une machine à carcasse métallique.
     Quand tout va bien, le courant part par la phase, traverse la machine et revient par le neutre ; le PE
     ne transporte rien. Puis il quitte ce chemin de trois façons :
       · la surcharge : trop de courant, longtemps — les fils chauffent ;
       · le court-circuit : la phase touche le neutre — un raccourci, des milliers d'ampères ;
       · le défaut d'isolement : la phase touche la carcasse — le courant part par le PE vers la terre. */
  Electro3D.definir('troisDefauts', (T, K, ctx) => {
    const B = briques(T, K), M = K.mat, V = B.V;
    const racine = new T.Group();
    /* un marron foncé (la lumière de l'atelier l'éclaircit) et un bleu clair : les couleurs NF C 15-100 */
    const BRUN = 0x4f2e18, BLEU = 0x2a62a8;

    /* ---------------------------------------------------------------- le décor : un sol et un mur clairs */
    const sol = K.mesh(K.boite(590, 16, 270, 1.5), K.plastique(0xe4dfd3, 0.9), -15, -8, 15);
    const mur = K.mesh(K.boite(590, 380, 20, 1.5), K.plastique(0xf1ede4, 0.9), -15, 190, -130);
    racine.add(sol, mur);

    /* ---------------------------------------------------------------- le coffret (contre le mur) */
    const XC = -195, YC = 240, ZC = -75, GX = -157.5, GZ = -91.5;
    const coffret = K.mesh(K.boite(180, 240, 90, 4), K.plastique(0xdcdcd6, 0.6), XC, YC, ZC);
    [[-78, 108], [78, 108], [-78, -108], [78, -108]].forEach(([x, y]) => { const v = K.vis(3.4); v.rotation.x = Math.PI / 2; v.position.set(x, y, 45); coffret.add(v); });
    coffret.add(B.axeZ(K.mesh(K.cylindre(7, 4, 28), M.plastiqueNoir, 70, 0, 46)));
    coffret.add(K.mesh(new T.BoxGeometry(1.4, 9, 1), M.sombre, 70, 0, 48.3));
    racine.add(coffret);
    /* dedans : un rail, deux bornes (neutre à gauche, phase à droite) et la barre de terre */
    const rail = K.railDIN(150); rail.position.set(GX, 200, -111.5); racine.add(rail);
    const blocN = B.bornier(K.plastique(BLEU, 0.5), 50); blocN.position.set(GX - 7, 200, GZ);
    const blocL = B.bornier(K.plastique(0xa9aaa6, 0.5), 50); blocL.position.set(GX + 7, 200, GZ);
    racine.add(blocN, blocL);
    const barre = B.barreTerre(3); barre.groupe.position.set(-250, 150, -112); racine.add(barre.groupe);
    const bornesBarre = barre.bornes.map(b => b.clone().add(barre.groupe.position));
    /* sous le coffret : le presse-étoupe du câble, celui du fil de terre */
    const presseBas = (x, z, r) => {
      const g = new T.Group(); g.position.set(x, 120, z);
      g.add(K.mesh(K.cylindre(r, 12, 24), M.laiton, 0, 0, 0));
      g.add(K.mesh(K.cylindre(r * 1.33, 5, 6), M.laiton, 0, -3.5, 0));
      g.add(K.mesh(K.cylindre(r * 0.75, 8, 24, r), M.plastiqueNoir, 0, -9.5, 0));
      return g;
    };
    const presseCable = presseBas(GX, GZ, 7.2), presseTerre = presseBas(-262, -90, 4.6);
    racine.add(presseCable, presseTerre);

    /* ---------------------------------------------------------------- la machine */
    const XM = 120, ZM = 10;
    const mot = B.moteur();
    mot.groupe.position.set(XM, 0, ZM); racine.add(mot.groupe);
    const mw = p => p.clone().add(mot.groupe.position);
    const bornesMot = { L: mw(mot.bornes.L), N: mw(mot.bornes.N), PE: mw(mot.bornes.PE) };

    /* ---------------------------------------------------------------- le câble : sa ligne médiane et ses trois fils */
    const CAB = [
      [GX, 152, GZ], [GX, 126, GZ], [GX, 106, GZ], [GX + 1, 80, -88], [GX + 4, 50, -79], [GX + 12, 24, -63],
      [-132, 9, -43], [-96, 6, -14], [-30, 6, 28], [38, 6, 68], [92, 7, 104], [122, 14, 116],
      [134, 50, 106], [131, 98, 88], [126, 130, 74], [XM + 4, 141, ZM + 54], [XM + 4, 141, ZM + 30]
    ];
    const FR = B.fractions(CAB), X = V(1, 0, 0), Y = V(0, 1, 0);
    const F = B.faisceau(CAB, [[0, X], [FR[4], X], [FR[7], Y], [FR[10], Y], [FR[12], X], [1, X]]);
    const proche = p => { let k = 0, d = 1e9; F.P.forEach((q, i) => { const e = q.distanceTo(p); if (e < d) { d = e; k = i; } }); return k; };
    const KD = proche(V(CAB[8][0], CAB[8][1], CAB[8][2]));     /* là où le câble est écrasé */
    const K0 = KD - 2, K1 = KD + 2;
    let iA = 0; while (F.P[iA].y > 107) iA++;                  /* la gaine commence sous le coffret… */
    let iB = F.n; while (F.P[iB].z < 64) iB--;                 /* …et finit au presse-étoupe de la machine */

    const POS = { L: [0, 2.3], N: [2.0, -1.2], PE: [-2.0, -1.2] };
    const ligne = id => Array.from({ length: F.n + 1 }, (_, i) => F.decale(i, POS[id][0], POS[id][1]));
    const milieu = (a, b, t) => a.clone().lerp(b, t);
    const bas = { L: V(GX + 7, 175, GZ), N: V(GX - 7, 175, GZ), PE: bornesBarre[2] };
    const p0 = id => F.decale(0, POS[id][0], POS[id][1]), pn = id => F.decale(F.n, POS[id][0], POS[id][1]);
    const debut = {
      L: [bas.L, milieu(bas.L, p0('L'), 0.55)],
      N: [bas.N, milieu(bas.N, p0('N'), 0.55)],
      PE: [bas.PE, V(-212, 145, -106), V(-186, 149, -99)]
    };
    const fin = { L: [milieu(pn('L'), bornesMot.L, 0.5), bornesMot.L], N: [milieu(pn('N'), bornesMot.N, 0.5), bornesMot.N], PE: [milieu(pn('PE'), bornesMot.PE, 0.5), bornesMot.PE] };
    const pts = {};
    ['L', 'N', 'PE'].forEach(id => { pts[id] = [...debut[id], ...ligne(id), ...fin[id]]; });

    const matL = K.propre(K.isolant(BRUN)), matN = K.propre(K.isolant(BLEU)), matPE = K.isolant('PE', 1100);
    [matL, matN, matPE].forEach(m => { m.side = T.DoubleSide; });
    const RF = 1.9;
    const fil = (id, mat) => B.tube(B.lisse(pts[id]), RF, mat, { pas: 5, radial: 10 });
    /* la phase et le neutre : en trois morceaux, le morceau du milieu est « l'isolant intact » du point écrasé */
    const morceaux = (id, mat) => {
      const p = pts[id], b = debut[id].length, a = b + K0, z = b + K1;
      const avant = B.tube(B.lisse(p.slice(0, a + 1)), RF, mat, { pas: 5, radial: 10 });
      const manchon = B.tube(B.lisse(p.slice(a, z + 1)), RF, mat, { pas: 4, radial: 10 });
      const apres = B.tube(B.lisse(p.slice(z)), RF, mat, { pas: 5, radial: 10 });
      const cuivre = B.tube(B.lisse(p.slice(a - 1, z + 2)), 1.05, M.cuivre, { pas: 2, radial: 8 });
      return { avant, manchon, apres, cuivre };
    };
    const mL = morceaux('L', matL), mN = morceaux('N', matN);
    const fPE = fil('PE', matPE);
    /* les fils qui entrent dans le mur, au-dessus des bornes (d'où vient le courant) */
    const entree = (x, mat) => B.tube(B.lisse([[x, 225, GZ], [x, 236, GZ - 3], [x, 246, -106], [x, 252, -119.5]]), RF, mat, { pas: 4, radial: 10 });
    const stubL = entree(GX + 7, matL), stubN = entree(GX - 7, matN);
    const gaine = B.tube(B.lisse(F.P.slice(iA, iB + 1)), 5.4, K.propre(M.caoutchouc), { pas: 5, radial: 16 });
    const matHalo = new T.MeshBasicMaterial({ color: 0xff7a35, transparent: true, opacity: 0, depthWrite: false });
    const halo = B.tube(B.lisse(F.P.slice(iA, iB + 1)), 8.4, matHalo, { pas: 8, radial: 12 });
    halo.visible = false; halo.userData.sansOmbre = true; halo.raycast = () => {};
    racine.add(mL.avant, mL.manchon, mL.apres, mL.cuivre, mN.avant, mN.manchon, mN.apres, mN.cuivre, fPE, stubL, stubN, gaine, halo);

    /* ---------------------------------------------------------------- la terre : un bloc de sol et un piquet */
    const sable = B.couches(80, 66, [
      { id: 'terre', h: 22, couleur: '#c8a679', graine: 5 }, { id: 'argile', h: 22, couleur: '#d8a869', graine: 11 }, { id: 'sable', h: 22, couleur: '#dcc27a', graine: 17 }
    ], 40);
    const blocSol = new T.Group(); blocSol.position.set(-250, 66, -85); sable.meshes.forEach(m => blocSol.add(m)); racine.add(blocSol);
    const piq = B.piquet({ rayon: 6, longueur: 100 });
    piq.groupe.position.set(-250, 100, -52); racine.add(piq.groupe);
    const TERRE = [bornesBarre[0], V(-264, 134, -102), V(-262, 122, -91), V(-260, 106, -80), V(-256, 94, -64), V(-252, 87, -54), V(-254, 84, -52)];
    const matPE2 = K.isolant('PE', 120); matPE2.side = T.DoubleSide;
    const fTerre = B.tube(B.lisse(TERRE), RF - 0.3, matPE2, { pas: 5, radial: 10 });
    racine.add(fTerre);

    /* ---------------------------------------------------------------- le point écrasé : le pont de cuivre, l'arc, les étincelles */
    const Lc = F.decale(KD, POS.L[0], POS.L[1]), Nc = F.decale(KD, POS.N[0], POS.N[1]);
    const pont = new T.Mesh(new T.CylinderGeometry(0.9, 0.9, Lc.distanceTo(Nc), 10), M.cuivre);
    pont.position.copy(Lc).lerp(Nc, 0.5); pont.quaternion.setFromUnitVectors(V(0, 1, 0), Nc.clone().sub(Lc).normalize()); pont.visible = false; racine.add(pont);
    const tg = F.P[Math.min(F.n, KD + 3)].clone().sub(F.P[Math.max(0, KD - 3)]).normalize();
    const arcsCC = [0, 1].map(k => K.arc(Lc.clone().addScaledVector(tg, -6 + k * 2), Nc.clone().addScaledVector(tg, 6 - k * 2), { rayon: 0.7, halo: 0.01 }));
    arcsCC.forEach(a => racine.add(a.objet));
    const flashCC = B.eclair(62); flashCC.placer(Lc.clone().lerp(Nc, 0.5)); racine.add(flashCC.objet);
    const etincCC = B.etincelles(22, 2.1); etincCC.placer(Lc.clone().lerp(Nc, 0.5)); racine.add(etincCC.objet);
    /* le contact dans la boîte à bornes : le brin touche la paroi (étincelle discrète) */
    const arcBoite = K.arc(mw(mot.contact).add(V(-1.6, -0.8, 0)), mw(mot.contact), { rayon: 0.5, halo: 0.01 });
    racine.add(arcBoite.objet);
    const flashBoite = B.eclair(30); flashBoite.placer(mw(mot.contact)); racine.add(flashBoite.objet);

    /* ---------------------------------------------------------------- le courant */
    const murL = [V(GX + 7, 252, -119.5), V(GX + 7, 246, -106), V(GX + 7, 236, GZ - 3), V(GX + 7, 225, GZ), V(GX + 7, 175, GZ)];
    const murN = [V(GX - 7, 252, -119.5), V(GX - 7, 246, -106), V(GX - 7, 236, GZ - 3), V(GX - 7, 225, GZ), V(GX - 7, 175, GZ)];
    const trajL = [...murL.slice(0, -1), ...pts.L], trajN = [...murN.slice(0, -1), ...pts.N];
    const dL = murL.length - 1 + debut.L.length + KD, dN = murN.length - 1 + debut.N.length + KD;
    const fL = B.flux(B.chemin(trajL), { pas: 9, rayon: 2.3, amplitude: 8 });
    const fN = B.flux(B.chemin(trajN), { pas: 9, rayon: 2.3, amplitude: 8 });
    const fCL = B.flux(B.chemin(trajL.slice(0, dL + 1)), { pas: 5, rayon: 2.3, amplitude: 20, frequence: 2.2 });
    const fCN = B.flux(B.chemin(trajN.slice(0, dN + 1)), { pas: 5, rayon: 2.3, amplitude: 20, frequence: 2.2 });
    /* la fuite : de la paroi de la boîte au PE de la machine, puis le long du PE jusqu'à la barre de terre… */
    const boiteChemin = [mw(mot.contact), mw(V(41.5, 134, 0)), mw(V(30, 133.4, -1)), mw(V(10, 133.4, -2)), mw(V(-16, 138, -2)), bornesMot.PE];
    const fPE1 = B.flux(B.chemin([...boiteChemin, ...pts.PE.slice().reverse()]), { pas: 8, rayon: 2.8, amplitude: 14, frequence: 0.6 });
    /* … puis, de la barre, le fil de terre, le piquet et le sol */
    const fPE2 = B.flux(B.chemin([bornesBarre[2], bornesBarre[1], ...TERRE, V(-250, 84, -44.6), V(-250, 22, -44.6)]), { pas: 8, rayon: 2.5, amplitude: 14, frequence: 0.6 });
    const arcsSol = [
      [[-246, 62, -51], [-236, 54, -51], [-226, 42, -51], [-218, 26, -51]],
      [[-254, 62, -51], [-264, 54, -51], [-274, 42, -51], [-282, 26, -51]],
      [[-249, 34, -51], [-243, 22, -51], [-237, 10, -51]]
    ].map(p => B.flux(B.chemin(p), { pas: 10, rayon: 1.5, amplitude: 9, frequence: 0.6 }));
    const flux = [fL, fN, fCL, fCN, fPE1, fPE2, ...arcsSol];
    flux.forEach(f => racine.add(f.objet));

    /* ---------------------------------------------------------------- les états : un tableau, et une seule fonction pour les appliquer */
    const ETATS = {
      normal: { chaleur: 0, dens: 0.45, cc: false, brin: false, rouge: 0, rot: 1, pe1: 0, pe2: 0, bouton: 'normal' },
      surcharge: { chaleur: 1.05, dens: 1, cc: false, brin: false, rouge: 0, rot: 1, pe1: 0, pe2: 0, bouton: 'surcharge' },
      court: { chaleur: 0, dens: 0, cc: true, brin: false, rouge: 0, rot: 0, pe1: 0, pe2: 0, bouton: 'court' },
      contact: { chaleur: 0, dens: 0.22, cc: false, brin: true, rouge: 1, rot: 1, pe1: 0, pe2: 0, bouton: 'isolement' },
      chemin: { chaleur: 0, dens: 0.22, cc: false, brin: true, rouge: 1, rot: 1, pe1: 1, pe2: 0, bouton: 'isolement' },
      terre: { chaleur: 0, dens: 0.22, cc: false, brin: true, rouge: 1, rot: 1, pe1: 1, pe2: 1, bouton: 'isolement' }
    };
    const MESURES = {
      normal: [{ libelle: 'Phase et neutre', valeur: 'courant normal' }, { libelle: 'Fil de terre (PE)', valeur: '0 A' }],
      surcharge: [{ libelle: 'Courant dans le câble', valeur: '+ 20 %' }, { libelle: 'Pendant', valeur: 'des minutes' }, { libelle: 'Le câble', valeur: 'chauffe' }],
      court: [{ libelle: 'Courant', valeur: '× 1 000' }, { libelle: 'Pendant', valeur: 'quelques millièmes de seconde' }, { libelle: 'La machine', valeur: 'ne reçoit plus rien' }],
      contact: [{ libelle: 'La carcasse', valeur: 'sous tension' }, { libelle: 'Le courant', valeur: 'cherche un chemin' }],
      chemin: [{ libelle: 'Fil de terre (PE)', valeur: 'le courant de défaut passe' }, { libelle: 'La carcasse', valeur: 'sous tension' }],
      terre: [{ libelle: 'Courant vers la terre', valeur: '30 mA' }, { libelle: 'Courant dans la machine', valeur: 'normal' }]
    };
    const PHRASES = {
      normal: '<strong>Tout va bien.</strong> Le courant part du coffret par la phase (fil marron), traverse la machine, puis revient par le neutre (fil bleu). Le fil vert-jaune, le PE, ne transporte rien.',
      surcharge: '<strong>La surcharge.</strong> Le courant emprunte le bon chemin, mais il est trop fort et il dure. Le conducteur chauffe, l’isolant vieillit. Dans la vraie vie, rien ne se voit : ici, on a rendu la chaleur visible.',
      court: '<strong>Le court-circuit.</strong> Deux conducteurs se touchent : le courant n’a plus rien pour le freiner. Des milliers d’ampères, en quelques millièmes de seconde.',
      terre: '<strong>Le défaut d’isolement.</strong> Le courant quitte son chemin et part vers la terre — par une carcasse, ou par une personne. Quelques centièmes d’ampère suffisent à tuer.'
    };
    let eclatee = false;
    let chaleur = 0, rouge = 0, vitRot = 1;
    let cible = ETATS.normal;
    const matC = mot.mat, ROUGE = new T.Color(0xd23a22), BASE_C = matC.color.clone(), ROUGE_C = new T.Color(0x8e1f16);
    const carcasse = tt => {
      matC.color.copy(BASE_C).lerp(ROUGE_C, 0.8 * rouge);
      matC.emissive.copy(ROUGE); matC.emissiveIntensity = 0.5 * rouge * (0.8 + 0.2 * Math.sin((tt || 0) * 5));
    };
    const peindre = () => {
      K.chaleur(matL, chaleur); K.chaleur(matN, chaleur);
      matHalo.opacity = 0.34 * Math.min(1, chaleur); halo.visible = chaleur > 0.03;
      carcasse(0);
    };
    const appliquer = (nom, instant) => {
      const c = cible = ETATS[nom];
      mL.manchon.visible = mN.manchon.visible = !c.cc;
      pont.visible = c.cc;
      mot.brin.visible = c.brin;
      const aff = (f, d) => f.regler({ densite: d });
      aff(fL, c.cc ? 0 : c.dens); aff(fN, c.cc ? 0 : c.dens);
      aff(fCL, c.cc ? 1 : 0); aff(fCN, c.cc ? 1 : 0);
      aff(fPE1, c.pe1 ? 0.9 : 0); aff(fPE2, c.pe2 ? 0.9 : 0);
      arcsSol.forEach(f => aff(f, c.pe2 ? 0.9 : 0));
      arcsCC.forEach(a => a.regler(c.cc && !eclatee)); etincCC.regler(c.cc && !eclatee); flashCC.regler(c.cc && !eclatee);
      arcBoite.regler(c.brin && !eclatee); flashBoite.regler(c.brin && !eclatee);
      if (instant) { chaleur = c.chaleur; rouge = c.rouge; vitRot = c.rot; }
      peindre();
      ctx.mesures(MESURES[nom]);
      ctx.regler('defaut', c.bouton);
      ctx.dire(PHRASES[nom] || PHRASES.terre);
      ctx.reveiller();
    };
    appliquer('normal', true);

    const agir = (id, v) => {
      if (id === 'defaut') appliquer(v === 'isolement' ? 'terre' : v);
      else if (id === 'phase' && ETATS[v]) appliquer(v);
    };

    /* ---------------------------------------------------------------- les vues : où regarder pour comprendre */
    const POINT_CC = [-30, 14, 28], POINT_BOITE = [XM + 4, 140, ZM], POINT_PIQUET = [-250, 62, -70];
    const vueBase = ctx.mode === 'decouvrir' ? { azimut: -30, elevation: 20, zoom: 1 } : { azimut: -22, elevation: 18, zoom: 1 };

    return {
      racine,
      vue: Object.assign({ cadre: [sol, mur], marge: 0.68 }, vueBase),
      phrase: PHRASES.normal,
      fantome: [coffret, gaine, ...mot.boite],
      pieces: [
        { id: 'coffret', nom: 'Le coffret', objets: [coffret], desc: 'Il alimente la machine. Dedans, on voit le départ : la phase, le neutre et la terre.' },
        { id: 'bornes', nom: 'Les bornes : neutre et phase', objets: [rail, blocN, blocL], ancre: [GX, 200, GZ], desc: 'Le câble se raccorde ici. Le neutre (bloc bleu) est à gauche, la phase (bloc gris) à droite.' },
        { id: 'barre', nom: 'La barre de terre', objets: [barre.groupe], desc: 'Tous les fils vert-jaune se rejoignent ici, puis le fil de terre part vers le piquet.' },
        { id: 'cable', nom: 'Le câble', objets: [gaine, presseCable, presseTerre, mot.presse], ancre: [-60, 6, 10], desc: 'La gaine réunit les trois fils et les protège. Ici elle est transparente, pour qu’on voie dedans.' },
        { id: 'phase', nom: 'La phase (fil marron)', objets: [mL.avant, mL.manchon, mL.apres, stubL], ancre: [38, 9, 66], desc: 'Le fil qui apporte le courant à la machine. Il est marron.' },
        { id: 'neutre', nom: 'Le neutre (fil bleu)', objets: [mN.avant, mN.manchon, mN.apres, stubN], ancre: [92, 4, 104], desc: 'Le fil qui ramène le courant vers la source. Il est bleu.' },
        { id: 'pe', nom: 'Le PE (fil vert-jaune)', objets: [fPE, fTerre, mot.tresse], ancre: [-96, 6, -14], desc: 'En marche normale, il ne transporte rien. Il sert seulement en cas de défaut : il ramène le courant vers la terre.' },
        { id: 'machine', nom: 'La machine (carcasse en métal)', objets: mot.corps.filter(o => o !== mot.presse), desc: 'Un petit moteur. Sa carcasse est en métal : si un fil la touche, elle passe sous tension.' },
        { id: 'boite', nom: 'La boîte à bornes', objets: [...mot.boite, ...mot.interieur.filter(o => o !== mot.tresse)], desc: 'C’est là qu’on branche le câble. C’est aussi là qu’un fil abîmé peut toucher le métal.' },
        { id: 'piquet', nom: 'La prise de terre', objets: [piq.groupe, blocSol], desc: 'Un piquet de cuivre planté dans le sol. Le courant de défaut s’y écoule vers la terre.' },
        { id: 'defaut', nom: 'Le point où ça tourne mal', objets: [pont, mL.cuivre, mN.cuivre, mot.brin], ancre: [-30, 8, 28], desc: 'On ne le voit que pendant un défaut. En court-circuit, deux fils se touchent. En défaut d’isolement, un fil touche la carcasse.' }
      ],
      commandes: [
        { id: 'defaut', type: 'choix', options: [['surcharge', 'La surcharge'], ['court', 'Le court-circuit'], ['isolement', 'Le défaut d’isolement']], valeur: 'normal' }
      ],
      agir,
      animer(dt, t) {
        let actif = false;
        if (Math.abs(chaleur - cible.chaleur) > 0.004) { chaleur = K.vers(chaleur, cible.chaleur, 2.2, dt); peindre(); actif = true; }
        if (Math.abs(rouge - cible.rouge) > 0.004 || cible.rouge > 0) {
          rouge = K.vers(rouge, cible.rouge, 4, dt); actif = true; carcasse(t);
        }
        vitRot = K.vers(vitRot, cible.rot, 2.4, dt);
        if (vitRot > 0.01) { mot.arbre.rotation.x += vitRot * dt * 6; actif = true; }
        flux.forEach(f => { if (f.animer(dt)) actif = true; });
        arcsCC.forEach(a => { if (a.animer(dt)) actif = true; });
        if (etincCC.animer(dt)) actif = true;
        if (flashCC.animer(dt)) actif = true;
        if (arcBoite.animer(dt)) actif = true;
        if (flashBoite.animer(dt)) actif = true;
        return actif;
      },
      /* l'éclaté, dans l'ordre du démontage : l'arbre et le capot sortent, le couvercle se lève, le coffret s'ouvre */
      eclate: [
        { objets: [mot.arbre], vers: [60, 0, 0], debut: 0, fin: 0.5 },
        { objets: [mot.capot], vers: [-70, 0, 0], debut: 0.1, fin: 0.6 },
        { objets: [mot.couvercle], vers: [0, 70, 0], debut: 0.3, fin: 0.8 },
        { objets: [coffret], vers: [0, 175, 0], debut: 0.4, fin: 1 }
      ],
      eclateVue: { azimut: -34, elevation: 24, zoom: 0.72, cible: [-15, 196, 5] },
      surEclate(on) {
        eclatee = on;
        flux.forEach(f => f.regler({ masque: on }));
        arcsCC.forEach(a => a.regler(cible.cc && !on)); etincCC.regler(cible.cc && !on); flashCC.regler(cible.cc && !on);
        arcBoite.regler(cible.brin && !on); flashBoite.regler(cible.brin && !on);
      },
      etapes: [
        { titre: 'Tout va bien', texte: 'Le courant part du coffret par la phase (fil marron), passe dans la machine, puis revient par le neutre (fil bleu). Le fil vert-jaune, le PE, ne transporte rien.',
          actions: [['phase', 'normal']], voirDedans: true, piece: 'phase', vue: { azimut: -22, elevation: 18, zoom: 1, cible: null }, duree: 7 },
        { titre: 'Surcharge : trop de courant, longtemps', texte: 'La machine tire plus de courant que prévu, et ça dure. Les fils chauffent (ici on les voit rougir ; en vrai, rien ne se voit) : l’isolant vieillit, puis craque.',
          actions: [['phase', 'surcharge']], voirDedans: true, vue: { azimut: -24, elevation: 22, zoom: 1, cible: null }, duree: 7 },
        { titre: 'Court-circuit : la phase touche le neutre', texte: 'Un câble écrasé : le fil marron touche le fil bleu. Plus rien ne freine le courant, qui prend le raccourci sans passer par la machine : des milliers d’ampères en un instant.',
          actions: [['phase', 'court']], voirDedans: true, ralenti: true, piece: 'defaut', vue: { azimut: -28, elevation: 28, zoom: 1.7, cible: [POINT_CC[0] + 30, POINT_CC[1] + 20, POINT_CC[2]] }, duree: 8 },
        { titre: 'Défaut d’isolement : la phase touche la carcasse', texte: 'Dans la boîte à bornes, l’isolant d’un fil est abîmé : le fil marron touche le métal, et la carcasse passe sous tension. Elle a l’air normale : rien ne se voit.',
          actions: [['phase', 'contact']], voirDedans: true, ralenti: true, piece: 'defaut', vue: { azimut: -24, elevation: 26, zoom: 1.75, cible: [POINT_BOITE[0], POINT_BOITE[1] - 30, POINT_BOITE[2]] }, duree: 8 },
        { titre: 'Le courant trouve un autre chemin : le PE', texte: 'La carcasse est reliée au fil vert-jaune, le PE : le courant le suit jusqu’au coffret. Ce n’est plus le chemin prévu : il est ailleurs.',
          actions: [['phase', 'chemin']], voirDedans: true, piece: 'pe', vue: { azimut: -20, elevation: 34, zoom: 1.25, cible: [0, 70, 0] }, duree: 8 },
        { titre: 'Il part vers la terre', texte: 'Du coffret, le fil de terre descend jusqu’au piquet planté dans le sol : le courant s’écoule dans la terre. Seul un différentiel voit ce courant qui part ailleurs.',
          actions: [['phase', 'terre']], voirDedans: true, piece: 'piquet', vue: { azimut: -18, elevation: 20, zoom: 1.8, cible: POINT_PIQUET }, duree: 8 }
      ]
    };
  }, { famille: 'defauts', titre: 'Les trois défauts', stations: ['1.8'] });

  /* ====================================================================== 4.8 — la terre ne coupe rien : elle offre un chemin
     Une coupe du sol, un piquet de cuivre, un conducteur de terre qui vient du bâtiment par une barrette de
     mesure et la borne principale de terre, un fil vert-jaune (PE) jusqu'à la carcasse d'une machine.
       · machine saine : le PE ne transporte rien ;
       · défaut avec la terre : la carcasse passe sous tension, le courant part tout de suite par le PE,
         descend au piquet et se répand dans le sol — le différentiel peut le voir ;
       · défaut sans la terre : aucun PE posé (un PE ne se coupe jamais), la carcasse reste sous tension, le courant ATTEND. */
  Electro3D.definir('priseDeTerre', (T, K, ctx) => {
    const B = briques(T, K), M = K.mat, V = B.V;
    const racine = new T.Group();
    const BRUN = 0x4f2e18, BLEU = 0x2a62a8;

    /* ---------------------------------------------------------------- le sol en coupe, la dalle, le mur */
    const sol = B.couches(630, 180, [
      { id: 'herbe', h: 8, couleur: '#a8cf84', graine: 3 }, { id: 'terre', h: 44, couleur: '#c8a679', graine: 5 },
      { id: 'argile', h: 54, couleur: '#d8a869', graine: 11 }, { id: 'sable', h: 60, couleur: '#dcc27a', graine: 17 },
      { id: 'gravier', h: 54, couleur: '#aaa498', graine: 23, cailloux: 44 }
    ], 60);
    const couchesSol = new T.Group(); couchesSol.position.x = -15; sol.meshes.forEach(m => couchesSol.add(m)); racine.add(couchesSol);
    const dalle = K.mesh(K.boite(360, 20, 180, 1.5), K.plastique(0xdad8d1, 0.9), -150, 10, 0);
    const mur = K.mesh(K.boite(360, 250, 18, 1.5), K.plastique(0xf0ece3, 0.9), -150, 145, -81);
    racine.add(dalle, mur);

    /* ---------------------------------------------------------------- la machine (réduite à 0,8) */
    const mot = B.moteur({ arriere: true, cosse: true });
    const ECH = 0.8, MX = -150, MY = 20, MZ = 8;
    mot.groupe.position.set(MX, MY, MZ); mot.groupe.scale.setScalar(ECH); racine.add(mot.groupe);
    const mw = p => V(MX + ECH * p.x, MY + ECH * p.y, MZ + ECH * p.z);
    const mwl = (x, y, z) => mw(V(x, y, z));
    const bL = mw(mot.bornes.L), bN = mw(mot.bornes.N), cosse = mw(mot.cosse), contact = mw(mot.contact);
    /* la carcasse : une matière à elle, qui peut rougir */
    const matC = mot.mat, ROUGE = new T.Color(0xd23a22), BASE_C = matC.color.clone(), ROUGE_C = new T.Color(0x8e1f16);

    /* ---------------------------------------------------------------- l'alimentation : un câble court, du mur à la boîte */
    const gx = mw(V(4, 141, -55)).x, gy = mw(V(4, 141, -55)).y;   /* le bout du presse-étoupe, derrière la machine */
    const gz = mw(V(4, 141, -55)).z;
    const matL = K.propre(K.isolant(BRUN)), matN = K.propre(K.isolant(BLEU));
    [matL, matN].forEach(m => { m.side = T.DoubleSide; });
    const RF = 1.9;
    const fil = (pts, mat, r, pas) => B.tube(B.lisse(pts), r || RF, mat, { pas: pas || 5, radial: 10 });
    /* un fil vert-jaune : ses rayures ont la bonne longueur, quelle que soit celle du fil */
    const filPE = (pts, r, pas) => {
      const c = B.lisse(pts), m = K.isolant('PE', c.getLength()); m.side = T.DoubleSide;
      return B.tube(c, r || RF, m, { pas: pas || 5, radial: 10 });
    };
    const ptsL = [bL, V(bL.x - 4, 136, bL.z - 14), V(gx + 2.4, gy + 1.4, gz + 14), V(gx + 2.4, gy, gz), V(gx + 2.4, gy, -72), V(gx + 2.4, gy, -80)];
    const ptsN = [bN, V(bN.x - 1, 136, bN.z - 14), V(gx - 2.4, gy + 1.4, gz + 14), V(gx - 2.4, gy, gz), V(gx - 2.4, gy, -72), V(gx - 2.4, gy, -80)];
    const filL = fil(ptsL, matL), filN = fil(ptsN, matN);
    const gaine = B.axeZ(K.mesh(K.cylindre(5.4, 36, 16), K.propre(M.caoutchouc), gx, gy, (gz - 72) / 2 - 0.4));
    const rosace = B.axeZ(K.mesh(K.cylindre(15, 2.4, 28), M.plastiqueBlanc, gx, gy, -73.2));
    racine.add(filL, filN, gaine, rosace);

    /* ---------------------------------------------------------------- la borne principale de terre, la barrette, le conducteur de terre */
    const bpt = B.barreTerre(3); bpt.groupe.position.set(-290, 140, -64); racine.add(bpt.groupe);
    const bornesBpt = bpt.bornes.map(b => b.clone().add(bpt.groupe.position));          /* gauche, milieu, droite */
    const barrette = new T.Group(); barrette.position.set(-304, 96, -64);
    barrette.add(K.mesh(K.boite(34, 24, 16, 1.2), K.plastique(0xc9cbc8, 0.5)));
    const lien = new T.Group(); barrette.add(lien);
    lien.add(K.mesh(K.boite(26, 4, 2.4, 0.5), M.laiton, 0, 0, 9.4));
    [-10, 10].forEach(x => { const v = K.vis(2.4); v.rotation.x = Math.PI / 2; v.position.set(x, 0, 10.6); lien.add(v); });
    racine.add(barrette);
    const hautBarrette = V(-304, 108, -64), basBarrette = V(-304, 84, -64);
    const filBpt = filPE([bornesBpt[0], V(-304, 120, -64), hautBarrette]);
    /* le conducteur de terre : le long du mur, sur la dalle, sur la face de la coupe, enterré, jusqu'au piquet */
    const XP = 160, YC = -44, ZC = 90.5;
    const TERRE = [basBarrette, V(-304, 52, -66), V(-304, 25, -69), V(-304, 21.8, -30), V(-304, 21.8, 50), V(-304, 21.8, 86), V(-304, 17, 90.6),
      V(-304, 6, ZC), V(-304, -22, ZC), V(-300, -40, ZC), V(-286, YC, ZC), V(-100, YC, ZC), V(80, YC, ZC), V(XP - 14, YC, ZC), V(XP - 8, YC, ZC)];
    const fTerre = filPE(TERRE, 2, 6);
    racine.add(filBpt, fTerre);
    const piq = B.piquet({ rayon: 8, longueur: 170 });
    piq.groupe.position.set(XP, -30, 90); racine.add(piq.groupe);

    /* ---------------------------------------------------------------- le PE : de la vis de la patte à la borne de terre ; absent dans le défaut « sans la terre » */
    const PE = [cosse.clone().add(V(0, 0, 1.5)), V(-195, 22.6, 58), V(-215, 22.6, 54), V(-235, 22.6, 48), V(-262, 24, 30), V(-282, 30, 0), V(-292, 52, -40), V(-282, 92, -62), V(-276, 120, -63), bornesBpt[2]];
    const courbePE = B.lisse(PE), nPE = 90;
    const echant = Array.from({ length: nPE + 1 }, (_, i) => courbePE.getPointAt(i / nPE));
    const filCarcasse = filPE(echant);
    racine.add(filCarcasse);

    /* ---------------------------------------------------------------- l'étincelle du défaut, et le courant */
    const flashBoite = B.eclair(26); flashBoite.placer(contact); racine.add(flashBoite.objet);
    /* le courant de défaut : de la paroi de la boîte à la patte, par la carcasse (des grains posés sur le métal) */
    const surface = (x, y, z) => { const AX = 74; return mwl(x, AX + (y - AX) * 1.04, z * 1.04); };
    const corps = [mwl(41.8, 146, 0), mwl(43, 139, 6), surface(30, 128, 20), surface(10, 118, 36), surface(-6, 104, 50), surface(-20, 84, 59), surface(-30, 56, 63), surface(-33, 30, 64), cosse.clone().add(V(0, 0, 1))];
    const fPE1 = B.flux(B.chemin([...corps, ...echant.slice(1), bornesBpt[2]]), { pas: 8, rayon: 2.6, amplitude: 12, frequence: 0.6 });
    const fPE2 = B.flux(B.chemin([bornesBpt[2], bornesBpt[1], bornesBpt[0], hautBarrette, basBarrette, ...TERRE.slice(1), V(XP, YC, ZC + 8.5), V(XP, -100, ZC + 8.5), V(XP, -196, ZC + 8.5)]), { pas: 9, rayon: 2.3, amplitude: 14, frequence: 0.6 });
    const arcsSol = [
      [[XP + 9, -66], [XP + 38, -78], [XP + 80, -94], [XP + 128, -112]],
      [[XP + 9, -116], [XP + 48, -132], [XP + 92, -148], [XP + 136, -164]],
      [[XP + 9, -168], [XP + 44, -182], [XP + 88, -192], [XP + 134, -204]],
      [[XP - 9, -86], [XP - 40, -100], [XP - 72, -120], [XP - 104, -144]],
      [[XP - 9, -146], [XP - 42, -162], [XP - 78, -176], [XP - 112, -194]]
    ].map(p => B.flux(B.chemin(p.map(q => V(q[0], q[1], ZC + 0.6))), { pas: 9, rayon: 2, amplitude: 9, frequence: 0.6 }));
    /* le courant normal (phase et neutre) et celui qui ATTEND, à la paroi, quand il n’y a pas de PE */
    const fL = B.flux(B.chemin(ptsL), { pas: 9, rayon: 2.3, amplitude: 7 }), fN = B.flux(B.chemin(ptsN), { pas: 9, rayon: 2.3, amplitude: 7 });
    const fAttente = B.flux(B.chemin([contact, mwl(41.8, 138, 0)]), { pas: 3, rayon: 1.9, amplitude: 1.6, frequence: 1.4 });
    const flux = [fL, fN, fPE1, fPE2, fAttente, ...arcsSol];
    flux.forEach(f => racine.add(f.objet));

    /* ---------------------------------------------------------------- les états */
    const ETATS = {
      sain: { brin: false, rouge: 0, pe: true, pe1: 0, pe2: 0, attente: 0, bouton: 'sain' },
      contact: { brin: true, rouge: 1, pe: true, pe1: 0, pe2: 0, attente: 0, bouton: 'defaut' },
      chemin: { brin: true, rouge: 1, pe: true, pe1: 1, pe2: 0, attente: 0, bouton: 'defaut' },
      sol: { brin: true, rouge: 1, pe: true, pe1: 1, pe2: 1, attente: 0, bouton: 'defaut' },
      sansPE: { brin: true, rouge: 1, pe: false, pe1: 0, pe2: 0, attente: 1, bouton: 'sansPE' }
    };
    const MESURES = {
      sain: [{ libelle: 'Courant dans le PE', valeur: '0 A' }, { libelle: 'La carcasse', valeur: 'hors tension' }],
      contact: [{ libelle: 'La carcasse', valeur: 'sous tension' }, { libelle: 'Le courant', valeur: 'cherche un chemin' }],
      chemin: [{ libelle: 'Fil de terre (PE)', valeur: 'le courant de défaut passe' }, { libelle: 'La carcasse', valeur: 'sous tension' }],
      sol: [{ libelle: 'Le courant de défaut', valeur: 'part dans le sol' }, { libelle: 'Le différentiel', valeur: 'peut le voir et couper' }],
      sansPE: [{ libelle: 'Conducteur de protection', valeur: 'absent' }, { libelle: 'La carcasse', valeur: 'sous tension' }, { libelle: 'Le courant', valeur: 'attend : 0 A' }]
    };
    const PHRASES = {
      sain: 'L’isolant fait son travail. Aucun courant ne circule dans le conducteur de protection : il attend.',
      sol: 'L’isolant a lâché, la carcasse est sous tension. Le courant part par le conducteur de protection et revient à la source. Ce courant-là, le différentiel le mesure — et il coupe.',
      sansPE: 'Même défaut, mais aucun conducteur de protection. La carcasse reste sous tension et rien ne se passe — jusqu’à ce que quelqu’un la touche. Le corps devient alors le chemin de retour.'
    };
    let cible = ETATS.sain, rouge = 0, eclatee = false;
    const carcasse = tt => {
      matC.color.copy(BASE_C).lerp(ROUGE_C, 0.8 * rouge);
      matC.emissive.copy(ROUGE); matC.emissiveIntensity = 0.5 * rouge * (0.8 + 0.2 * Math.sin((tt || 0) * 5));
    };
    const appliquer = (nom, instant) => {
      const c = cible = ETATS[nom];
      mot.brin.visible = c.brin;
      filCarcasse.visible = c.pe;
      const aff = (f, d) => f.regler({ densite: d });
      aff(fL, 0.45); aff(fN, 0.45);
      aff(fPE1, c.pe1 ? 0.9 : 0); aff(fPE2, c.pe2 ? 0.9 : 0); aff(fAttente, c.attente);
      arcsSol.forEach(f => aff(f, c.pe2 ? 0.9 : 0));
      flashBoite.regler(c.brin && !eclatee);
      if (instant) rouge = c.rouge;
      carcasse(0);
      ctx.mesures(MESURES[nom]);
      ctx.regler('etat', c.bouton);
      ctx.dire(PHRASES[nom] || PHRASES.sol);
      ctx.reveiller();
    };
    appliquer('sain', true);
    const agir = (id, v) => {
      if (id === 'etat') appliquer(v === 'defaut' ? 'sol' : v);
      else if (id === 'phase' && ETATS[v]) appliquer(v);
    };

    const POINT_BOITE = [contact.x, contact.y, contact.z];
    const vueBase = ctx.mode === 'decouvrir' ? { azimut: -28, elevation: 20, zoom: 1 } : { azimut: -18, elevation: 14, zoom: 1 };
    const tousSol = sol.meshes;

    return {
      racine,
      vue: Object.assign({ cadre: [...tousSol, mur], marge: 0.71 }, vueBase),
      phrase: PHRASES.sain,
      fantome: [gaine, ...mot.boite],
      pieces: [
        { id: 'machine', nom: 'La machine (carcasse en métal)', objets: mot.corps.filter(o => o !== mot.presse), desc: 'Une machine à carcasse en métal, par exemple un moteur. C’est sa carcasse qui peut passer sous tension.' },
        { id: 'boite', nom: 'La boîte à bornes', objets: [...mot.boite, ...mot.interieur, mot.presse], desc: 'La boîte à bornes de la machine. C’est ici que l’isolant d’un fil peut lâcher et toucher le métal.' },
        { id: 'alim', nom: 'Le câble d’alimentation', objets: [gaine, filL, filN, rosace], desc: 'Il alimente la machine : un fil marron, la phase, et un fil bleu, le neutre.' },
        { id: 'pe', nom: 'Le PE (fil vert-jaune)', objets: [filCarcasse, filBpt], ancre: [-262, 24, 30], desc: 'Le conducteur de protection. Il relie la carcasse de la machine à la borne de terre. Il ne se coupe jamais.' },
        { id: 'bpt', nom: 'La borne principale de terre', objets: [bpt.groupe], desc: 'Tous les fils de terre du bâtiment s’y rejoignent.' },
        { id: 'barrette', nom: 'La barrette de coupure', objets: [barrette], desc: 'On ne l’ouvre que pour mesurer la prise de terre, avec un outil, et on la remet aussitôt.' },
        { id: 'terre', nom: 'Le conducteur de terre', objets: [fTerre], ancre: [-100, -44, 90.5], desc: 'Il relie la borne de terre au piquet. Il passe sous le sol.' },
        { id: 'piquet', nom: 'Le piquet de terre', objets: [piq.groupe], desc: 'Une tige de cuivre enfoncée dans le sol. Elle donne au courant de défaut un chemin vers la terre.' },
        { id: 'sol', nom: 'Le sol : les couches de terre', objets: tousSol, ancre: [260, -140, 90], desc: 'De la terre, de l’argile, du sable, du gravier. Le courant s’y répand : sa qualité se mesure en ohms, plus c’est bas, mieux c’est.' },
        { id: 'defaut', nom: 'Là où l’isolant a lâché', objets: [mot.brin], ancre: [contact.x, contact.y, contact.z], desc: 'On ne le voit que pendant un défaut : un fil abîmé touche la carcasse.' }
      ],
      commandes: [
        { id: 'etat', type: 'choix', options: [['sain', 'Machine saine'], ['defaut', 'Défaut, avec la terre'], ['sansPE', 'Défaut, sans la terre']], valeur: 'sain' }
      ],
      agir,
      animer(dt, t) {
        let actif = false;
        if (Math.abs(rouge - cible.rouge) > 0.004 || cible.rouge > 0) { rouge = K.vers(rouge, cible.rouge, 4, dt); actif = true; carcasse(t); }
        mot.arbre.rotation.x += dt * 6; actif = true;
        flux.forEach(f => { if (f.animer(dt)) actif = true; });
        if (flashBoite.animer(dt)) actif = true;
        return actif;
      },
      /* l'éclaté : la machine se démonte, la barre de terre et la barrette se défont, les couches de terre s'écartent vers le bas */
      eclate: [
        { objets: [mot.arbre], vers: [60, 0, 0], debut: 0, fin: 0.5 },
        { objets: [mot.capot], vers: [-70, 0, 0], debut: 0.1, fin: 0.6 },
        { objets: [mot.couvercle], vers: [0, 70, 0], debut: 0.3, fin: 0.8 },
        { objets: [bpt.barre], vers: [0, 0, 40], debut: 0.2, fin: 0.7 },
        { objets: [lien], vers: [0, 0, 36], debut: 0.2, fin: 0.7 },
        { objets: [sol.meshes[2]], vers: [0, -30, 0], debut: 0.4, fin: 1 },
        { objets: [sol.meshes[3]], vers: [0, -60, 0], debut: 0.4, fin: 1 },
        { objets: [sol.meshes[4]], vers: [0, -90, 0], debut: 0.4, fin: 1 }
      ],
      eclateVue: { azimut: -24, elevation: 16, zoom: 0.78, cible: [-15, 0, 0] },
      surEclate(on) { eclatee = on; flux.forEach(f => f.regler({ masque: on })); flashBoite.regler(cible.brin && !on); },
      etapes: [
        { titre: 'Machine saine', texte: 'L’isolant des fils fait son travail : le courant passe par la phase (marron) et le neutre (bleu). Le fil vert-jaune relie la carcasse à la terre, mais il ne transporte rien.',
          actions: [['phase', 'sain']], voirDedans: true, piece: 'pe', vue: { azimut: -18, elevation: 14, zoom: 1, cible: null }, duree: 7 },
        { titre: 'L’isolant lâche : la carcasse est sous tension', texte: 'Dans la boîte à bornes, un fil abîmé touche le métal : la carcasse passe sous tension. Elle a l’air normale, et rien ne l’indique.',
          actions: [['phase', 'contact']], voirDedans: true, ralenti: true, piece: 'defaut', vue: { azimut: -22, elevation: 24, zoom: 1.8, cible: [POINT_BOITE[0], POINT_BOITE[1] - 30, POINT_BOITE[2]] }, duree: 8 },
        { titre: 'Le courant part par le fil vert-jaune', texte: 'La carcasse est reliée au PE, le fil vert-jaune. Le courant le prend tout de suite : il le suit jusqu’à la borne principale de terre.',
          actions: [['phase', 'chemin']], voirDedans: true, piece: 'pe', vue: { azimut: -14, elevation: 24, zoom: 1.45, cible: [-210, 70, 20] }, duree: 8 },
        { titre: 'Il descend au piquet et s’écoule dans le sol', texte: 'De la borne de terre, le conducteur de terre l’emmène au piquet : le courant se répand dans le sol et revient vers la source. C’est ce courant de défaut que le différentiel peut voir : il coupe.',
          actions: [['phase', 'sol']], voirDedans: true, piece: 'piquet', vue: { azimut: -14, elevation: 16, zoom: 1.1, cible: [40, -55, 85] }, duree: 9 },
        { titre: 'Sans la terre : la carcasse reste sous tension', texte: 'Même défaut, mais le fil vert-jaune n’a jamais été posé : le courant n’a pas de chemin, il attend. La carcasse reste sous tension jusqu’à ce que quelqu’un la touche ; alors son corps devient le chemin.',
          actions: [['phase', 'sansPE']], voirDedans: true, piece: 'defaut', vue: { azimut: -16, elevation: 26, zoom: 1.5, cible: [-210, 50, 30] }, duree: 9 }
      ]
    };
  }, { famille: 'defauts', titre: 'La prise de terre', stations: ['4.8'] });

  /* ====================================================================== 4.9 et 4.10 — des fils, un courant
     Quatre fils de cuivre de grosseurs différentes, coupés net pour montrer l'âme, sont traversés
     par le MÊME courant. L'échauffement suit le carré du courant rapporté à ce que le fil supporte :
     T = 30 °C + 40 K × (I / Iz)². À I = Iz, l'isolant PVC est à ses 70 °C. */
  Electro3D.definir('cablesSections', (T, K, ctx) => {
    const B = briques(T, K), M = K.mat;
    const racine = new T.Group();
    const opt = ctx.options || {};
    const LONG = 84, T_AMB = 30, T_MAX = 70;
    /* âme : diamètres réels de fils rigides ; Iz : NF C 15-100, tableau 52H, cuivre, PVC,
       3 conducteurs chargés sous conduit — les « environ 16, 21, 36 A » de la station 4.9 */
    const SECTIONS = [
      { id: 'f15', nom: '1,5', mm2: 1.5, dAme: 1.38, ep: 0.7, iz: 15.5, x: -33 },
      { id: 'f25', nom: '2,5', mm2: 2.5, dAme: 1.78, ep: 0.8, iz: 21, x: -11 },
      { id: 'f6', nom: '6', mm2: 6, dAme: 2.76, ep: 0.8, iz: 36, x: 11 },
      { id: 'f16', nom: '16', mm2: 16, dAme: 4.5, ep: 0.9, iz: 68, x: 33 }
    ];
    if (Array.isArray(opt.iz) && opt.iz.length === 4) SECTIONS.forEach((s, i) => { s.iz = opt.iz[i]; });
    const CHARBON = new T.Color(0x15110e);
    /* un marron foncé : sous la lumière de l'atelier, le marron NF C 15-100 (0x7a4a2c) vire au saumon */
    const BRUN = 0x4f2e18;

    /* le support : une plaque claire, les sections gravées devant chaque fil (comme sur un porte-échantillons) */
    const plaque = K.mesh(K.boite(106, 8, 120, 1.4), K.plastique(0xe6d8b8, 0.8), 0, -4, 8);
    racine.add(plaque);
    const marquages = new T.Group(); racine.add(marquages);

    const fils = SECTIONS.map(s => {
      const rA = s.dAme / 2, rE = rA + s.ep;
      const matAme = K.propre(M.cuivre), matIso = K.propre(K.isolant(BRUN));
      const g = new T.Group(); g.position.set(s.x, rE, 0); racine.add(g);
      const corps = K.mesh(K.cylindre(rA * 0.99, LONG - 0.3, 28), matAme); corps.rotation.x = Math.PI / 2; corps.position.z = -0.15;
      const iso = K.mesh(K.anneau(rE, rA * 0.99, LONG, 40), matIso); iso.rotation.x = Math.PI / 2;
      const coupe = K.mesh(K.cylindre(rA * 0.99, 0.3, 28), matAme); coupe.rotation.x = Math.PI / 2; coupe.position.z = LONG / 2 - 0.15;
      g.add(corps, iso, coupe);
      /* le courant : des grains dans le cuivre, vus à travers l'isolant */
      const fl = B.flux(B.chemin([[0, 0, -LONG / 2 + 4], [0, 0, LONG / 2 - 4]]), { pas: 3.6, rayon: Math.min(0.42, rA * 0.62), xray: true, amplitude: 5, frequence: 0.7 });
      g.add(fl.objet);
      const fu = B.fumee(9, { hauteur: 54, taille: 10 + rE * 2 }); fu.objet.position.set(0, rE + 1, 0); g.add(fu.objet);
      const gr = K.gravure(s.nom + '\nmm²', 3.4, { couleur: '#2b3138' });
      gr.rotation.x = -Math.PI / 2; gr.position.set(s.x, 0.06, 55); marquages.add(gr);
      return { s, g, corps, iso, coupe, matAme, matIso, baseIso: matIso.color.clone(), fl, fu, T: T_AMB, cible: T_AMB };
    });

    /* ---------------------------------------------------------------- l'état : le courant, la chaleur */
    let I = 16, dernierePhrase = '';
    const temperature = (i, s) => Math.min(230, T_AMB + (T_MAX - T_AMB) * Math.pow(i / s.iz, 2));
    /* de la température au niveau de K.chaleur : rien sous 40 °C, un rouge discret à la limite (70 °C), orange vif au-delà */
    const niveau = t => t < 40 ? 0 : t < 70 ? 0.62 * (t - 40) / 30 : t < 100 ? 0.62 + 0.38 * (t - 70) / 30 : t < 140 ? 1 + 0.3 * (t - 100) / 40 : 1.3 + 0.2 * K.clamp((t - 140) / 40, 0, 1);
    const qualif = t => t < 40 ? 'froid' : t < 60 ? 'tiède' : t < 75 ? 'chaud : à la limite' : t < 100 ? 'trop chaud' : t < 140 ? 'l’isolant ramollit' : 'l’isolant fume';
    const fmt = t => t > 160 ? 'plus de 160 °C' : Math.round(t / 5) * 5 + ' °C';
    const joindre = l => l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' et ' + l[l.length - 1];

    const peindre = f => {
      const n = niveau(f.T), noir = K.clamp((f.T - 150) / 45, 0, 1);
      K.chaleur(f.matAme, n); K.chaleur(f.matIso, n * 0.9 * (1 - 0.85 * noir));
      f.matIso.color.copy(f.baseIso).lerp(CHARBON, noir);
      f.fu.regler(K.clamp((f.T - 125) / 40, 0, 1));
    };
    const texte = () => {
      const sur = fils.filter(f => I > f.s.iz).map(f => f.s.nom);
      const fume = fils.filter(f => f.cible >= 140).map(f => f.s.nom);
      const pl = l => l.length > 1;
      if (fume.length) return '<strong>L’isolant ' + (pl(fume) ? 'des fils de ' : 'du fil de ') + joindre(fume) + ' mm² fume.</strong> Il noircit et finira par brûler. Plus un fil est gros, moins il chauffe : c’est pourquoi on choisit la section d’abord, puis le calibre du disjoncteur.';
      if (sur.length) return '<strong>' + (pl(sur) ? 'Les fils de ' : 'Le fil de ') + joindre(sur) + ' mm² ' + (pl(sur) ? 'dépassent' : 'dépasse') + ' ce qu’' + (pl(sur) ? 'ils supportent' : 'il supporte') + '.</strong> ' + (pl(sur) ? 'Ils chauffent' : 'Il chauffe') + ' trop. Les plus gros fils restent plus frais.';
      if (I >= 0.55 * fils[0].s.iz) return '<strong>Le courant monte.</strong> Le fil de 1,5 mm² est le premier à chauffer : c’est lui qui a le moins de cuivre.';
      return '<strong>Le même courant traverse les quatre fils.</strong> Il est faible : aucun ne chauffe.';
    };
    const appliquer = instant => {
      fils.forEach(f => {
        f.cible = temperature(I, f.s);
        if (instant) f.T = f.cible;
        f.fl.regler({ densite: 0.08 + 0.92 * Math.pow(I / 100, 0.8) });
        peindre(f);
      });
      ctx.mesures(fils.map(f => ({ libelle: 'Fil de ' + f.s.nom + ' mm²', valeur: fmt(f.cible) + ' · ' + qualif(f.cible) })));
      const t = texte();
      if (t !== dernierePhrase) { dernierePhrase = t; ctx.dire(t); }
    };
    appliquer(true);

    const agir = (id, v) => { if (id === 'intensite') { I = +v; appliquer(false); } };

    /* l'éclaté : l'isolant se retire le long du fil, l'âme de cuivre apparaît nue */
    const eclatement = fils.map(f => ({ objets: [f.iso], vers: [0, 0, -50] }));

    const vueBase = ctx.mode === 'decouvrir' ? { azimut: -34, elevation: 30, zoom: 1 } : { azimut: -26, elevation: 26, zoom: 1 };
    const env = i => 'environ ' + Math.round(fils[i].s.iz) + ' A';
    return {
      racine,
      vue: Object.assign({ cadre: fils.map(f => f.g), marge: 0.95 }, vueBase),
      phrase: dernierePhrase,
      pieces: [
        { id: 'f15', nom: 'Le fil de 1,5 mm²', objets: [fils[0].corps, fils[0].iso], desc: 'Le plus fin. Il supporte ' + env(0) + '. C’est le premier à chauffer.' },
        { id: 'f25', nom: 'Le fil de 2,5 mm²', objets: [fils[1].corps, fils[1].iso], desc: 'Il supporte ' + env(1) + ' : c’est le fil des prises du logement.' },
        { id: 'f6', nom: 'Le fil de 6 mm²', objets: [fils[2].corps, fils[2].iso], desc: 'Il supporte ' + env(2) + ' : plaque de cuisson, par exemple.' },
        { id: 'f16', nom: 'Le fil de 16 mm²', objets: [fils[3].corps, fils[3].iso], desc: 'Le plus gros. Il supporte ' + env(3) + ' et reste froid longtemps.' },
        { id: 'ames', nom: 'Le cuivre, vu en coupe', objets: fils.map(f => f.coupe), ancre: [33, 3.2, 42], desc: 'C’est l’âme du fil : le cuivre qui porte le courant. Sa surface, c’est la section : plus elle est grande, mieux le courant passe.' },
        { id: 'plaque', nom: 'Le support', objets: [plaque, marquages], desc: 'Il porte les quatre fils côte à côte. La section de chacun est gravée devant lui.' }
      ],
      commandes: [
        { id: 'intensite', type: 'curseur', libelle: 'L’intensité', min: 1, max: 100, pas: 1, unite: 'A', valeur: 16 }
      ],
      agir,
      animer(dt) {
        let actif = false;
        fils.forEach(f => {
          if (Math.abs(f.T - f.cible) > 0.05) { f.T = K.vers(f.T, f.cible, 2.4, dt); peindre(f); actif = true; }
          if (f.fl.animer(dt)) actif = true;
          if (f.fu.animer(dt)) actif = true;
        });
        return actif;
      },
      eclate: eclatement,
      eclateVue: { azimut: -32, elevation: 22, zoom: 0.92, cible: null },
      surEclate(on) { fils.forEach(f => f.fl.regler({ masque: on })); },
      etapes: [
        { titre: 'Un fil, c’est du cuivre dans de l’isolant', texte: 'Chaque fil a un cœur de cuivre (l’âme) entouré d’isolant ; sa section, c’est la surface du cuivre vue en coupe : 1,5 – 2,5 – 6 – 16 mm². Le courant est faible : rien ne chauffe.',
          actions: [['intensite', 6]], eclate: true, piece: 'ames', duree: 7 },
        { titre: 'Le même courant passe dans les quatre fils', texte: 'À 16 A, le fil de 1,5 mm², qui a le moins de cuivre, atteint sa limite le premier et commence à rougir. Les gros restent froids.',
          actions: [['intensite', 16]], eclate: false, vue: { azimut: -20, elevation: 22, zoom: 1.05, cible: [0, 10, 18] } },
        { titre: 'Au-dessus de sa limite, le fil chauffe trop', texte: 'À 30 A, les fils de 1,5 et de 2,5 mm² dépassent ce qu’ils supportent : ils chauffent trop et leur isolant ramollit.',
          actions: [['intensite', 30]], eclate: false, vue: { azimut: -20, elevation: 22, zoom: 1.0, cible: [0, 12, 18] } },
        { titre: 'L’isolant fume', texte: 'À 40 A, l’isolant des fils de 1,5 et de 2,5 mm² fume ; le plus fin noircit déjà. Sans protection qui coupe, il finirait par brûler.',
          actions: [['intensite', 40]], eclate: false, vue: { azimut: -20, elevation: 20, zoom: 0.98, cible: [-10, 18, 16] } },
        { titre: 'Le gros fil reste froid', texte: 'Avec le même courant de 40 A, le fil de 16 mm² reste presque froid : plus il y a de cuivre, moins le fil chauffe.',
          actions: [['intensite', 40]], eclate: false, vue: { azimut: -28, elevation: 20, zoom: 1.05, cible: [22, 12, 18] } }
      ]
    };
  }, { famille: 'defauts', titre: 'Le câble et sa section', stations: ['4.9', '4.10'] });
})();
