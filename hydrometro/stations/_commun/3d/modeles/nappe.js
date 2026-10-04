/* HydroMétro 3D — l'eau qui COULE en nappe : le petit module commun des modèles HydroMétro.

   « Le liquide se voit liquide » (règle validée par F. Henninot le 04/10/2026) : jamais des grains,
   toujours une nappe continue. La recette est celle de installations.js (commit 6a315c9) : l'eau est
   une surface translucide colorée, et UNE petite texture de bandes plus sombres (64 × 2 pixels)
   défile dans le sens de l'eau, à la vitesse prévue pour les grains. Eau arrêtée : les bandes
   s'immobilisent et s'estompent à 30 %, comme le moteur 2D (ecoulement.js). Aucun objet de plus,
   aucun shader : la texture et son décalage suffisent.

   Chargé avant les familles de modèles (station3d.js, chantier-3d/banc.html). Le kit commun
   (electro3d.js, kit.js), copié dans d'autres réseaux, n'est pas touché.

   const N = HydroNappe(T, K);
   N.nappe(mat, longueur, { pas, sens, fort, quart, k0 })
       donne à la matière `mat` la texture de bandes ; renvoie la nappe { v, … } : poser n.v (mm/s,
       signé, 0 = eau arrêtée), le module fait le reste dans N.animer(dt).
       longueur : la longueur de la surface (mm) le long de la texture, quand ses UV vont de 0 à 1 ;
                  0 quand ses UV sont déjà en millimètres (ShapeGeometry : x, y du dessin) ;
       pas      : une bande tous les `pas` mm (130 par défaut) ;
       sens     : +1 si l'eau va vers la fin de la texture, -1 sinon ;
       fort     : le contraste des bandes (1 dans un tube fin, moins dans une grande nappe) ;
       quart    : vrai si les bandes doivent courir le long de v (cylindre, plan) et non de u ;
       k0       : contraste de départ (0,3 : eau arrêtée au départ ; 1 : eau qui coule d'emblée).
   N.filet(courbe, { rayon, couleur, vitesse, opacite, pas, fort })
       un filet d'eau : un tube translucide le long d'une courbe, bandes comprises. Même interface que
       K.courant (objet, regler({ vitesse, sens, debit }), animer(dt)) : il le remplace tel quel.
   N.animer(dt) fait avancer les nappes de N.nappe (pas les filets, qui s'animent eux-mêmes) ; vrai tant que
       l'une bouge ou s'estompe encore. */
(() => {
  'use strict';
  if (window.HydroNappe) return;

  window.HydroNappe = (T, K) => {
    const PAS = 130;
    const base = (() => {
      const W = 64, c = document.createElement('canvas'); c.width = W; c.height = 2;
      const x = c.getContext('2d'), im = x.createImageData(W, 2);
      for (let i = 0; i < W; i++) {
        const b = Math.round(255 * (0.2 + 0.8 * (0.5 + 0.5 * Math.cos(2 * Math.PI * i / W))));
        [b, 255].forEach((v, j) => { const k = (j * W + i) * 4; im.data[k] = im.data[k + 1] = im.data[k + 2] = v; im.data[k + 3] = 255; });
      }
      x.putImageData(im, 0, 0);
      const t = new T.CanvasTexture(c);
      t.flipY = false; t.wrapS = T.RepeatWrapping; t.wrapT = T.ClampToEdgeWrapping;
      t.minFilter = T.LinearFilter; t.generateMipmaps = false;
      return t;
    })();
    /* la ligne 0 de la texture porte les bandes, la ligne 1 une eau unie : offset.y choisit le mélange
       (l'eau arrêtée estompe ses bandes), offset.x les fait avancer */
    const nappes = [];
    const fabriquer = (mat, longueur, o) => {
      o = o || {};
      const pas = o.pas || PAS, tex = base.clone(); tex.needsUpdate = true;
      tex.repeat.set(longueur ? longueur / pas : 1 / pas, 0);
      if (o.quart) tex.rotation = Math.PI / 2;
      mat.map = tex; mat.needsUpdate = true;
      const n = {
        tex, pas, v: 0, sens: o.sens || 1, fort: o.fort || 1, k: o.k0 === undefined ? 0.3 : o.k0,
        avancer(dt) {
          const v = Math.abs(n.v) > 0.5 ? n.v : 0;
          tex.offset.x = (tex.offset.x - dt * v * n.sens / pas) % 1;
          const kc = (v ? 1 : 0.3) * n.fort;
          n.k = K.vers(n.k, kc, 2.5, dt);
          tex.offset.y = 0.25 + 0.5 * (1 - n.k);
          return v !== 0 || Math.abs(n.k - kc) > 0.004;
        }
      };
      tex.offset.y = 0.25 + 0.5 * (1 - n.k);
      return n;
    };
    const nappe = (mat, longueur, o) => { const n = fabriquer(mat, longueur, o); nappes.push(n); return n; };
    const animer = dt => { let vivant = false; nappes.forEach(n => { if (n.avancer(dt)) vivant = true; }); return vivant; };

    const filet = (courbe, o) => {
      const L = courbe.getLength();
      const geo = new T.TubeGeometry(courbe, Math.max(8, Math.round(L / 10)), o.rayon || 3, 8, false);
      const mat = new T.MeshBasicMaterial({ color: o.couleur, transparent: true, opacity: o.opacite || 0.8, depthWrite: false, side: T.DoubleSide, toneMapped: false });
      const objet = new T.Mesh(geo, mat);
      objet.userData.sansOmbre = true; objet.castShadow = false; objet.renderOrder = 1;
      const n = fabriquer(mat, L, { pas: o.pas, fort: o.fort, k0: 1 });   /* il s'anime lui-même (animer), hors de N.animer */
      const etat = { vitesse: o.vitesse || 40, sens: 1, debit: 1 };
      const poser = () => { n.v = etat.debit > 0 ? etat.vitesse * etat.sens : 0; };
      poser();
      return {
        objet, courbe, longueur: L, nappe: n,
        regler(p) { Object.assign(etat, p); poser(); },
        animer(dt) { return n.avancer(dt); }
      };
    };

    return { nappe, filet, animer };
  };
})();
