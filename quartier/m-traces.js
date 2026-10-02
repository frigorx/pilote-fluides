/* =====================================================================
   m-traces.js — LES RÉSEAUX QUI RELIENT LES APPAREILS
   Chaque calque a ses tracés, posés dans une pseudo-zone « trace-<calque> » :
   au repos ils ont leur matière réelle (cuivre, isolant, acier galvanisé,
   câble), et quand on allume leur calque ils prennent sa couleur.
   Les points de départ et d'arrivée sont ceux de SPEC-3D.md (« points de
   raccordement ») : les appareils y ont leur piquage.
   ===================================================================== */
export function traces(H) {
  const P = H.P;

  /* deux lignes frigorifiques côte à côte : l'aspiration isolée (gros, noir),
     la ligne liquide en cuivre nu (fin), décalée de dz */
  function lignesFroid(zn, pts, dz) {
    H.canal(zn, P.armaflex, pts, 0.045);
    H.canal(zn, P.cuivre, pts.map(function (p) { return [p[0], p[1], p[2] + dz]; }), 0.022);
  }

  /* =====================================================================
     1. LE FROID (trace-froid)
     ===================================================================== */
  const F = "trace-froid";
  /* le groupe du toit alimente la chambre froide : sortie au dos du groupe,
     traversée de la dalle, plafond de la boutique, plafond de la chambre */
  lignesFroid(F, [
    [-4.6, 4.7, -4.3], [-4.6, 4.7, -4.55], [-4.6, 3.75, -4.55],
    [-9.6, 3.75, -4.55], [-9.6, 3.75, -4.3], [-9.6, 2.8, -4.3]
  ], 0.14);
  /* la centrale CO₂ alimente le meuble mural : sortie en haut du châssis,
     faux plafond, descente sur le meuble (la vitrine bouchère au R290 est autonome) */
  lignesFroid(F, [
    [-0.2, 2.4, -4.4], [-0.2, 3.55, -4.4], [-5.3, 3.55, -4.4], [-5.3, 2.1, -4.4]
  ], -0.14);
  /* colliers de fixation au plafond */
  [-1.5, -3.0, -6.2, -7.8].forEach(function (x) { H.bx(F, P.acierF, x - 0.03, x + 0.03, 3.8, 4.0, -4.62, -4.48); });

  /* =====================================================================
     2. LA CLIM (trace-clim) : liaisons du split, sous goulotte blanche
     ===================================================================== */
  const C = "trace-clim";
  const split = [[12.6, 4.85, -4.1], [15.08, 4.85, -4.1], [15.08, 4.85, -2.7], [15.62, 4.85, -2.7], [15.62, 3.8, -2.7]];
  H.canal(C, "#f2f1ec", split, 0.04);
  H.canal(C, P.cuivre, split.map(function (p) { return [p[0], p[1] - 0.09, p[2]]; }), 0.02);
  /* évacuation des condensats, tuyau gris qui descend le long du mur extérieur */
  H.canal(C, "#9aa3ad", [[15.62, 3.75, -2.6], [15.62, 0.05, -2.6]], 0.016);

  /* =====================================================================
     3. LE CHAUFFAGE (trace-chauffage) : l'eau de la PAC aux radiateurs
     ===================================================================== */
  const Ch = "trace-chauffage";
  /* départ (rouge) et retour (bleu) : passage du mur, puis au ras du sol le long du fond,
     sous les radiateurs (leurs robinets thermostatiques restent dégagés) */
  H.canal(Ch, P.chaud, [[15.9, 0.55, -2.4], [15.05, 0.55, -2.4], [15.05, 0.05, -2.4], [15.05, 0.05, -4.15], [10.9, 0.05, -4.15]], 0.025);
  H.canal(Ch, P.froidE, [[15.9, 0.42, -2.25], [15.0, 0.42, -2.25], [15.0, 0.05, -2.25], [15.0, 0.05, -4.03], [11.9, 0.05, -4.03]], 0.025);
  /* montées vers chaque radiateur : départ d'un côté, retour de l'autre */
  [[10.9, 11.9], [13.3, 14.3]].forEach(function (r) {
    H.tube(Ch, P.chaud, r[0], 0.05, -4.15, r[0], 0.22, -4.15, 0.02);
    H.tube(Ch, P.froidE, r[1], 0.05, -4.03, r[1], 0.22, -4.03, 0.02);
  });
  /* manchons isolants aux traversées de mur */
  H.cy(Ch, "#e8e2d0", 15.32, 0.55, -2.4, 0.06, 0.32, { axe: "x", seg: 10 });
  H.cy(Ch, "#e8e2d0", 15.32, 0.42, -2.25, 0.06, 0.32, { axe: "x", seg: 10 });

  /* =====================================================================
     4. L'ÉLECTRICITÉ (trace-elec) : chemins de câbles et câbles
     ===================================================================== */
  const E = "trace-elec";
  /* commerce : de l'armoire au chemin de câbles du plafond */
  H.canal(E, P.noir, [[-1.7, 2.1, -0.7], [-1.7, 3.85, -0.7]], 0.03);
  H.gaine(E, "#9aa5b1", [[-1.7, 3.85, -0.7], [-1.7, 3.85, -3.9], [-9.6, 3.85, -3.9]], 0.22, 0.05);
  H.gaine(E, "#9aa5b1", [[-1.7, 3.85, -3.9], [0.0, 3.85, -3.9]], 0.22, 0.05);
  for (let k = 0; k < 18; k++) { const x = -9.4 + k * 0.55; H.bx(E, "#7d8794", x, x + 0.04, 3.82, 3.88, -4.01, -3.79); }
  /* descentes : centrale CO₂, évaporateur de la chambre froide, groupe du toit */
  H.canal(E, P.noir, [[0.0, 3.82, -3.9], [0.0, 2.5, -3.9]], 0.02);
  H.canal(E, P.noir, [[-9.6, 3.82, -3.9], [-9.6, 3.0, -3.9]], 0.02);
  H.canal(E, P.noir, [[-4.6, 3.88, -3.9], [-4.6, 4.62, -3.9]], 0.02);
  /* maison : du tableau vers le frigo, la clim et la PAC */
  H.canal(E, P.noir, [[9.9, 2.1, -0.85], [9.9, 2.62, -0.85], [6.35, 2.62, -0.85], [6.35, 2.62, -4.15], [6.35, 0.4, -4.15]], 0.016);
  H.canal(E, P.noir, [[9.95, 2.1, -0.9], [9.95, 5.5, -0.9], [12.1, 5.5, -0.9], [12.1, 5.5, -4.15], [12.1, 5.0, -4.15]], 0.016);
  H.canal(E, P.noir, [[9.95, 2.1, -0.8], [9.95, 2.58, -0.8], [15.1, 2.58, -0.8], [15.1, 2.58, -1.9], [16.3, 2.58, -1.9], [16.3, 1.3, -1.9]], 0.016);
  H.bx(E, "#f2f1ec", 6.25, 6.45, 0.32, 0.48, -4.2, -4.17);   /* prise du frigo */

  /* =====================================================================
     5. L'AIR (trace-air) : les gaines de la centrale de traitement d'air
     ===================================================================== */
  const A = "trace-air";
  /* soufflage : traverse la dalle, court en faux plafond au-dessus de la vente */
  H.gaine(A, P.galva, [[-8.0, 4.35, -3.0], [-8.0, 3.6, -3.0], [-2.3, 3.6, -3.0]], 0.5, 0.35);
  [-6.6, -4.6, -2.9].forEach(function (x) {
    H.bx(A, "#eef1f4", x - 0.25, x + 0.25, 3.38, 3.42, -3.25, -2.75, { edge: 1 });
    for (let k = 0; k < 4; k++) H.bx(A, "#b9c1ca", x - 0.2, x + 0.2, 3.37, 3.38, -3.18 + k * 0.12, -3.14 + k * 0.12);
  });
  /* reprise : descend au-dessus de la chambre froide, revient devant sa porte */
  H.gaine(A, "#d5dbe2", [[-10.2, 4.35, -3.0], [-10.2, 3.55, -3.0], [-10.2, 3.55, 0.3]], 0.45, 0.3);
  H.bx(A, "#eef1f4", -10.45, -9.95, 3.36, 3.4, 0.05, 0.55, { edge: 1 });
  for (let k = 0; k < 5; k++) H.bx(A, "#8a94a1", -10.42, -9.98, 3.35, 3.36, 0.1 + k * 0.1, 0.13 + k * 0.1);
  /* colliers des gaines */
  [-7.0, -5.5, -4.0].forEach(function (x) { H.bx(A, P.acierF, x - 0.03, x + 0.03, 3.78, 4.0, -3.28, -2.72); });

  return {};
}
