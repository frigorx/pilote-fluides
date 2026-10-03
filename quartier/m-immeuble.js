/* =====================================================================
   m-immeuble.js — L'IMMEUBLE DES RÈGLES (zone « bureau »)

   Un immeuble de bureaux FERMÉ, de la même famille que le bâtiment
   Législation : murs crème, fenêtres à cadres bleu ardoise, bandeaux de
   plancher, brise-soleil à lames, deux PAC en toiture devant leur écran
   acoustique en lames. Il mène au réseau des règles, il a donc l'air
   sérieux et institutionnel : soubassement en pierre à refends, ailettes
   verticales, entrée vitrée sous auvent, plaque bleue à la balance,
   drapeaux français et européen (la F-Gaz est un règlement européen).

   Emprise : x −22..−13,5 ; z −5,5..2,6 ; quatre niveaux de 3,2 m
   (y 0..12,8) et un acrotère jusqu'à 13,4. La façade sur rue est posée
   en z = 1,75 : auvent, brise-soleil, ailettes et drapeaux tiennent
   ainsi dans l'emprise (rien au-delà de z = 2,6, sauf la marquise du cinéma,
   qui avance jusqu'à z = 3,55 au-dessus du trottoir).
   Toute la géométrie est dans la zone « bureau », sauf le cinéma de quartier
   (zone « cinema » : travée gauche du rez-de-chaussée et sa marquise) et le
   local à louer (décor, travée droite) : un clic sur le reste de l'immeuble
   ouvre le réseau des règles.
   ===================================================================== */
export function immeuble(H) {
  const P = H.P, Z = "bureau";
  const bx = H.bx, bxr = H.bxr, cy = H.cy, cyv = H.cyv, tube = H.tube, canal = H.canal, sp = H.sp, ext = H.ext, extX = H.extX;
  const alea = H.alea;
  const ZC = "#" + H.zones[Z].couleur.getHexString();   /* couleur de la zone : les accents */

  /* ---- gabarit ---- */
  const XG = -21.85, XD = -13.65;       /* faces extérieures des pignons gauche et droit */
  const ZR = -5.4, ZA = 1.75;           /* faces extérieures arrière et avant (façade sur rue) */
  const EP = 0.3;                       /* épaisseur des murs */
  const HN = 3.2;                       /* hauteur d'un niveau */
  const NIV = [0, 3.2, 6.4, 9.6];       /* planchers : rez-de-chaussée et trois étages */
  const HT = 12.8, HA = 13.4;           /* dessus de la dalle de toiture, haut de l'acrotère */
  const YT = HT + 0.05;                 /* dessus de l'étanchéité : on y pose les équipements */
  const XI0 = XG + EP, XI1 = XD - EP, ZI0 = ZR + EP, ZI1 = ZA - EP;   /* le dedans */
  /* les cinq travées de la façade sur rue : 1,5 / 1,5 / 2,2 (entrée) / 1,5 / 1,5 */
  const T = [XG, XG + 1.5, XG + 3.0, XD - 3.0, XD - 1.5, XD];
  const CX0 = -18.75, CX1 = -16.75, CZ0 = -0.55;   /* cage d'escalier derrière le mur-rideau */
  const PIERRE = "#e6dfcf", JOINT = "#cdc3ad", PLINTHE = "#c4bba7", CORDON = "#ebe4d4";
  const AILETTE = "#f6f1e6", INTER = "#ece6d8";

  /* =====================================================================
     1. LES MURS PERCÉS : un outil commun aux quatre façades
     ===================================================================== */
  /* E : l'épaisseur entre d0 et d1 mesurée depuis la face extérieure ex, vers l'intérieur
     (s = +1 si l'extérieur est du côté des coordonnées croissantes, −1 sinon). */
  function E(ex, s, d0, d1) { const a = ex - s * d0, b = ex - s * d1; return a < b ? [a, b] : [b, a]; }
  /* R : une boîte posée dans le plan d'un mur ; axe 'x' = mur le long de x, 'z' = le long de z */
  function R(axe, h, u0, u1, y0, y1, e, o) {
    if (axe === "x") bx(Z, h, u0, u1, y0, y1, e[0], e[1], o);
    else bx(Z, h, e[0], e[1], y0, y1, u0, u1, o);
  }
  /* V : un barreau vertical devant (d < 0) ou dans le mur */
  function V(axe, h, u, y0, y1, ex, s, d, r) {
    const p = ex - s * d;
    if (axe === "x") cyv(Z, h, u, y0, y1, p, r, { seg: 6 }); else cyv(Z, h, p, y0, y1, u, r, { seg: 6 });
  }

  /* une fenêtre : vitrage en retrait de 11 cm, cadre, meneau, imposte, appui de pierre ;
     au rez-de-chaussée une grille de défense ; aux étages, parfois un store à demi baissé */
  function fenetre(axe, a0, a1, ya, yb, ex, s, i) {
    const ec = E(ex, s, 0.08, 0.17), m = (a0 + a1) / 2;
    R(axe, P.verre, a0, a1, ya, yb, E(ex, s, 0.11, 0.14), { t: 0.42 });
    R(axe, P.cadre, a0, a0 + 0.06, ya, yb, ec); R(axe, P.cadre, a1 - 0.06, a1, ya, yb, ec);
    R(axe, P.cadre, a0, a1, ya, ya + 0.06, ec); R(axe, P.cadre, a0, a1, yb - 0.06, yb, ec);
    R(axe, P.cadre, m - 0.025, m + 0.025, ya, yb, ec);                    /* meneau */
    R(axe, P.cadre, a0, a1, yb - 0.44, yb - 0.4, ec);                      /* imposte */
    R(axe, "#f3eee2", a0 - 0.06, a1 + 0.06, ya - 0.06, ya, E(ex, s, -0.07 - (i ? 0 : 0.03), 0.1), { edge: 1 });  /* appui */
    if (i === 0) {
      /* grille de défense en fer : barreaux et deux plats */
      for (let u = a0 + 0.1; u < a1 - 0.05; u += 0.115) V(axe, "#3a424c", u, ya - 0.02, yb + 0.02, ex, s, -0.085, 0.011);
      [ya + 0.3, yb - 0.3].forEach(function (y) { R(axe, "#3a424c", a0 + 0.04, a1 - 0.04, y, y + 0.03, E(ex, s, -0.098, -0.072)); });
    } else if (alea() < 0.45) {
      /* store vénitien intérieur, baissé à une hauteur au hasard */
      const h = 0.3 + alea() * 1.1;
      R(axe, "#ece8de", a0 + 0.06, a1 - 0.06, yb - 0.06 - h, yb - 0.06, E(ex, s, EP + 0.02, EP + 0.04));
      R(axe, "#b9bfc7", a0 + 0.06, a1 - 0.06, yb - 0.1 - h, yb - 0.06 - h, E(ex, s, EP + 0.015, EP + 0.045));
    }
  }
  /* porte de service métallique du local technique, à ventelles basses */
  function porte(axe, a0, a1, yb, ex, s) {
    const ec = E(ex, s, 0.06, 0.16);
    R(axe, P.cadre, a0, a0 + 0.07, 0, yb, ec); R(axe, P.cadre, a1 - 0.07, a1, 0, yb, ec);
    R(axe, P.cadre, a0, a1, yb - 0.07, yb, ec);
    R(axe, "#aab4bf", a0 + 0.07, a1 - 0.07, 0, yb - 0.07, E(ex, s, 0.1, 0.14), { edge: 1 });
    for (let k = 0; k < 5; k++) R(axe, "#7d8794", a0 + 0.18, a1 - 0.18, 0.18 + k * 0.08, 0.21 + k * 0.08, E(ex, s, 0.085, 0.1));
    R(axe, "#2a313b", a1 - 0.165, a1 - 0.135, 0.9, 1.12, E(ex, s, 0.08, 0.1));            /* plaque de serrure */
    R(axe, "#2a313b", a1 - 0.28, a1 - 0.14, 1.06, 1.09, E(ex, s, 0.03, 0.08));             /* béquille */
    R(axe, "#c9d0d8", a1 - 0.158, a1 - 0.142, 0.94, 0.97, E(ex, s, 0.075, 0.08));          /* cylindre */
    /* triangle « danger électrique » : derrière cette porte, le tableau général de l'immeuble */
    if (axe === "z") {
      const xf = ex - s * 0.1, uc = (a0 + a1) / 2;
      extX(Z, "#f5c518", [[0, 0], [0.26, 0], [0.13, 0.23]], 0.01, xf, 1.45, uc + 0.13);
      extX(Z, "#2a313b", [[0.105, 0.05], [0.155, 0.05], [0.136, 0.11], [0.167, 0.11], [0.1, 0.186], [0.118, 0.124], [0.087, 0.124]], 0.004, xf + 0.01, 1.45, uc + 0.13);
    }
  }
  /* grille de ventilation du local technique (lames inclinées) */
  function ventil(axe, a0, a1, ya, yb, ex, s) {
    const ec = E(ex, s, -0.02, 0.12);
    R(axe, P.cadre, a0, a0 + 0.05, ya, yb, ec); R(axe, P.cadre, a1 - 0.05, a1, ya, yb, ec);
    R(axe, P.cadre, a0, a1, ya, ya + 0.05, ec); R(axe, P.cadre, a0, a1, yb - 0.05, yb, ec);
    R(axe, "#2a313b", a0 + 0.05, a1 - 0.05, ya + 0.05, yb - 0.05, E(ex, s, 0.1, 0.12));
    for (let y = ya + 0.11; y < yb - 0.06; y += 0.09) {
      const p = ex - s * 0.04, L = a1 - a0 - 0.1, c = (a0 + a1) / 2;
      if (axe === "x") bxr(Z, "#9aa5b1", c, y, p, L, 0.02, 0.12, s * 35, 0, 0);
      else bxr(Z, "#9aa5b1", p, y, c, 0.12, 0.02, L, 0, 0, -s * 35);
    }
  }

  /* un mur percé de baies, niveau par niveau (le principe de murV dans la Législation).
     baies(i) rend la liste des baies du niveau i : { c, w, a, b, type } — centre, largeur,
     bas et haut de l'ouverture au-dessus du plancher ; type 'vide' (ouverture traitée à
     part), 'porte', 'grille' ou rien (fenêtre). o.socle : soubassement en pierre à refends. */
  function mur(axe, u0, u1, ex, s, baies, o) {
    o = o || {};
    NIV.forEach(function (y0, i) {
      const y1 = y0 + HN, rdc = i === 0 && o.socle;
      const d0 = rdc ? -0.04 : 0;                 /* le soubassement déborde de 4 cm */
      function plein(a, b, ya, yb) {
        if (rdc && a <= u0 + 1e-6) a = u0 - 0.04;   /* il tourne l'angle */
        if (rdc && b >= u1 - 1e-6) b = u1 + 0.04;
        if (b - a < 1e-3 || yb - ya < 1e-3) return;
        R(axe, rdc ? PIERRE : P.mur, a, b, ya, yb, E(ex, s, d0, EP));
        if (!rdc) return;
        /* refends : un joint creux tous les 45 cm, une plinthe en pied */
        for (let y = 0.45; y < 2.8; y += 0.45) {
          if (y > ya + 0.02 && y < yb - 0.02) R(axe, JOINT, a, b, y - 0.013, y + 0.013, E(ex, s, d0 - 0.006, d0 + 0.03));
        }
        if (ya < 0.01) R(axe, PLINTHE, a, b, 0, 0.3, E(ex, s, d0 - 0.025, d0 + 0.05));
      }
      const liste = baies(i).slice().sort(function (p, q) { return p.c - q.c; });
      let cur = u0;
      liste.forEach(function (w) {
        const a0 = w.c - w.w / 2, a1 = w.c + w.w / 2, ya = y0 + w.a, yb = y0 + w.b;
        plein(cur, a0, y0, y1);
        plein(a0, a1, y0, ya);
        plein(a0, a1, yb, y1);
        if (w.type === "porte") porte(axe, a0, a1, yb, ex, s);
        else if (w.type === "grille") ventil(axe, a0, a1, ya, yb, ex, s);
        else if (w.type !== "vide") fenetre(axe, a0, a1, ya, yb, ex, s, i);
        cur = a1;
      });
      plein(cur, u1, y0, y1);
    });
  }

  /* =====================================================================
     2. LES QUATRE FAÇADES
     ===================================================================== */
  const ETG = { a: 0.85, b: 2.65 }, RDC = { a: 0.6, b: 2.6 };
  const baie = function (c, w, n, x) { return Object.assign({ c: c, w: w, a: n.a, b: n.b }, x || {}); };
  /* façade sur rue : travées 1, 2, 4, 5 vitrées ; la travée 3 est l'entrée puis le mur-rideau.
     Au rez-de-chaussée, trois ouvertures : les portes du cinéma (à gauche), le hall (au centre) et
     le local à louer (à droite) ; la plaque et l'interphone se posent sur les piles qui les séparent. */
  const XF = [-21.1, -19.6, -15.9, -14.4];
  mur("x", XG, XD, ZA, +1, function (i) {
    if (i === 0) return [{ c: -20.55, w: 1.3, a: 0, b: 2.75, type: "vide" }, { c: -17.75, w: 2.0, a: 0, b: 2.75, type: "vide" }, { c: -14.84, w: 2.08, a: 0, b: 2.75, type: "vide" }];
    return XF.map(function (c) { return baie(c, 1.1, ETG); }).concat([{ c: -17.75, w: 2.0, a: 0, b: HN, type: "vide" }]);
  }, { socle: true });
  /* pignon droit, côté allée : au rez-de-chaussée, la porte et la ventilation du local technique */
  const ZP = [-4.45, -2.7, -0.95, 0.8];
  mur("z", ZR, ZA, XD, +1, function (i) {
    if (i === 0) return [baie(ZP[0], 1.1, RDC), baie(ZP[1], 1.1, RDC),
      { c: ZP[2], w: 0.95, a: 0, b: 2.15, type: "porte" }, { c: ZP[3], w: 0.8, a: 0.9, b: 2.0, type: "grille" }];
    return ZP.map(function (c) { return baie(c, 1.1, ETG); });
  }, { socle: true });
  /* pignon gauche et façade arrière : fenêtres régulières */
  mur("z", ZR, ZA, XG, -1, function (i) { return ZP.map(function (c) { return baie(c, 1.1, i ? ETG : RDC); }); }, { socle: true });
  mur("x", XG, XD, ZR, -1, function (i) { return [-21.1, -19.6, -17.75, -15.9, -14.4].map(function (c) { return baie(c, 1.1, i ? ETG : RDC); }); }, { socle: true });

  /* cordon de pierre au premier plancher, bandeaux aux étages (ils font le tour) */
  function ceinture(hex, y0, y1, d, o) {
    bx(Z, hex, XG - d, XD + d, y0, y1, ZA - 0.01, ZA + d, o);
    bx(Z, hex, XG - d, XD + d, y0, y1, ZR - d, ZR + 0.01, o);
    bx(Z, hex, XD - 0.01, XD + d, y0, y1, ZR, ZA, o);
    bx(Z, hex, XG - d, XG + 0.01, y0, y1, ZR, ZA, o);
  }
  ceinture(CORDON, 2.84, 3.2, 0.09, { edge: 1 });
  ceinture(P.murF, 6.1, 6.4, 0.03);
  ceinture(P.murF, 9.3, 9.6, 0.03);
  /* acrotère : il prolonge les murs jusqu'à 13,4, couronné de sa couvertine */
  bx(Z, P.mur, XG, XD, HT, HA - 0.06, ZA - EP, ZA);
  bx(Z, P.mur, XG, XD, HT, HA - 0.06, ZR, ZR + EP);
  bx(Z, P.mur, XG, XG + EP, HT, HA - 0.06, ZR, ZA);
  bx(Z, P.mur, XD - EP, XD, HT, HA - 0.06, ZR, ZA);
  bx(Z, "#f6f4ee", XG - 0.05, XD + 0.05, HA - 0.06, HA, ZA - EP - 0.02, ZA + 0.05, { edge: 1 });
  bx(Z, "#f6f4ee", XG - 0.05, XD + 0.05, HA - 0.06, HA, ZR - 0.05, ZR + EP + 0.02, { edge: 1 });
  bx(Z, "#f6f4ee", XG - 0.05, XG + EP + 0.02, HA - 0.06, HA, ZR + EP, ZA - EP, { edge: 1 });
  bx(Z, "#f6f4ee", XD - EP - 0.02, XD + 0.05, HA - 0.06, HA, ZR + EP, ZA - EP, { edge: 1 });
  bx(Z, "#e7e1d3", XI0, XI1, HT, HA - 0.06, ZI0, ZI0 + 0.005);   /* face intérieure de l'acrotère (teinte) */

  /* =====================================================================
     3. LA FAÇADE SUR RUE : ailettes verticales, brise-soleil, mur-rideau
     ===================================================================== */
  /* ailettes : une à chaque limite de travée, du cordon jusqu'au sommet */
  T.forEach(function (x, k) {
    const x0 = k === 0 ? XG : (k === 5 ? XD - 0.16 : x - 0.07), x1 = k === 0 ? XG + 0.16 : (k === 5 ? XD : x + 0.07);
    bx(Z, AILETTE, x0, x1, 3.2, HA, ZA, ZA + 0.22, { edge: 1 });
  });
  /* brise-soleil : trois lames inclinées au-dessus de chaque fenêtre d'étage, sur deux consoles */
  [1, 2, 3].forEach(function (i) {
    const yb = NIV[i] + ETG.b;
    XF.forEach(function (c) {
      for (let k = 0; k < 3; k++) bxr(Z, "#d9cfb8", c, yb + 0.12 + k * 0.12, ZA + 0.32, 1.26, 0.03, 0.5, 14, 0, 0);
      /* consoles triangulaires : profondes contre le mur, effilées vers l'extérieur */
      [c - 0.65, c + 0.615].forEach(function (x) { extX(Z, P.cadre, [[0, 0.04], [0.56, 0], [0.56, 0.4]], 0.035, x, yb + 0.06, ZA + 0.56); });
    });
  });
  /* mur-rideau de la travée d'entrée, sur les trois étages : vitrage affleurant,
     montants tous les 50 cm, allèges en verre émaillé au droit des planchers */
  bx(Z, P.verre, CX0, CX1, 3.2, HT, ZA - 0.09, ZA - 0.06, { t: 0.36 });
  for (let x = CX0; x <= CX1 + 1e-6; x += 0.5) {
    const x0 = Math.max(CX0, x - 0.03), x1 = Math.min(CX1, x + 0.03);
    bx(Z, P.cadre, x0, x1, 3.2, HT, ZA - 0.12, ZA - 0.0);
  }
  [3.2, 6.4, 9.6].forEach(function (y) {
    bx(Z, "#5d7088", CX0, CX1, y === 3.2 ? 3.2 : y - 0.32, y + 0.12, ZA - 0.1, ZA - 0.05);   /* allège */
    bx(Z, P.cadre, CX0, CX1, y + 0.12, y + 0.16, ZA - 0.12, ZA - 0.0);
    bx(Z, P.cadre, CX0, CX1, y + 1.3, y + 1.34, ZA - 0.12, ZA - 0.0);                         /* traverse */
  });
  bx(Z, "#5d7088", CX0, CX1, HT - 0.32, HT, ZA - 0.1, ZA - 0.05);
  bx(Z, P.cadre, CX0, CX1, HT - 0.36, HT - 0.32, ZA - 0.12, ZA - 0.0);

  /* =====================================================================
     4. L'ENTRÉE : portes vitrées, auvent, plaque bleue, interphone, DAE
     ===================================================================== */
  /* parvis en dalles de pierre, tapis-brosse devant les portes */
  bx(Z, "#e4dfd2", XG - 0.1, XD + 0.1, 0, 0.03, ZA, 2.6, { edge: 1 });
  for (let x = XG + 0.6; x < XD; x += 0.8) bx(Z, "#cfc8b8", x - 0.01, x + 0.01, 0.03, 0.034, ZA, 2.6);
  bx(Z, "#cfc8b8", XG - 0.1, XD + 0.1, 0.03, 0.034, 2.17, 2.19);
  bx(Z, "#4a525c", -18.45, -17.05, 0.03, 0.045, ZA + 0.05, ZA + 0.75);
  /* l'ensemble vitré : châssis, deux vantaux à grands tirants inox, impostes et seuil */
  const ZV = E(ZA, 1, 0.15, 0.18), ZK = E(ZA, 1, 0.12, 0.21);
  bx(Z, P.verre, CX0, CX1, 0.02, 2.75, ZV[0], ZV[1], { t: 0.38 });
  [[CX0, CX0 + 0.07], [CX1 - 0.07, CX1], [-18.43, -18.37], [-17.78, -17.72], [-17.13, -17.07]].forEach(function (m) {
    bx(Z, P.cadre, m[0], m[1], 0, 2.75, ZK[0], ZK[1]);
  });
  bx(Z, P.cadre, CX0, CX1, 2.68, 2.75, ZK[0], ZK[1]);
  bx(Z, P.cadre, CX0, CX1, 2.2, 2.26, ZK[0], ZK[1]);
  bx(Z, P.cadre, -18.4, -17.1, 0, 0.12, ZK[0], ZK[1]);                       /* plinthes des vantaux */
  bx(Z, "#9aa5b1", CX0, CX1, 0, 0.03, ZA - 0.2, ZA + 0.04);                  /* seuil */
  [-17.86, -17.64].forEach(function (x) {
    cyv(Z, "#c9d0d8", x, 0.75, 1.65, ZA - 0.08, 0.016, { seg: 8 });
    tube(Z, "#c9d0d8", x, 0.82, ZA - 0.08, x, 0.82, ZA - 0.15, 0.01, { seg: 5 });
    tube(Z, "#c9d0d8", x, 1.58, ZA - 0.08, x, 1.58, ZA - 0.15, 0.01, { seg: 5 });
  });
  /* auvent suspendu : dalle blanche, rive bleue au livre ouvert, deux tirants, spots */
  bx(Z, "#f2efe6", -19.3, -16.2, 2.86, 3.0, ZA, 2.5, { edge: 1 });
  bx(Z, ZC, -19.32, -16.18, 2.82, 3.04, 2.5, 2.58, { edge: 1 });
  ext(Z, "#f7f5ef", [[-0.17, 0.02], [-0.012, 0.0], [-0.012, 0.13], [-0.17, 0.15]], 0.008, -17.75, 2.855, 2.58);
  ext(Z, "#f7f5ef", [[0.012, 0.0], [0.17, 0.02], [0.17, 0.15], [0.012, 0.13]], 0.008, -17.75, 2.855, 2.58);
  [-19.15, -16.35].forEach(function (x) {
    tube(Z, P.acierF, x, 3.0, 2.42, x, 3.62, ZA, 0.018, { seg: 6 });
    bx(Z, P.acierF, x - 0.06, x + 0.06, 3.56, 3.7, ZA, ZA + 0.03);
  });
  [-18.6, -17.75, -16.9].forEach(function (x) { cy(Z, "#fff3c4", x, 2.855, 2.15, 0.06, 0.012, { seg: 10, lum: 1 }); });
  /* la plaque bleue à la balance, cerclée d'or, fixée par quatre rosaces */
  const PX = -16.32, PY = 1.2;
  bx(Z, P.or, PX - 0.39, PX + 0.39, PY - 0.04, PY + 0.94, ZA + 0.04, ZA + 0.06);
  bx(Z, P.bleu, PX - 0.35, PX + 0.35, PY, PY + 0.9, ZA + 0.06, ZA + 0.075);
  [[-0.3, 0.05], [0.3, 0.05], [-0.3, 0.85], [0.3, 0.85]].forEach(function (r) {
    sp(Z, P.or, PX + r[0], PY + r[1], ZA + 0.078, 0.018, 0.018, 0.008, { seg: 8, seg2: 4 });
  });
  (function balance(cx, b, z) {
    const G = P.or;
    bx(Z, G, cx - 0.012, cx + 0.012, b + 0.04, b + 0.52, z, z + 0.01);                       /* fût */
    ext(Z, G, [[-0.1, 0], [0.1, 0], [0.06, 0.045], [-0.06, 0.045]], 0.01, cx, b, z);       /* socle */
    bx(Z, G, cx - 0.2, cx + 0.2, b + 0.48, b + 0.505, z, z + 0.01);                          /* fléau */
    sp(Z, G, cx, b + 0.55, z + 0.005, 0.026, 0.026, 0.008, { seg: 8, seg2: 5 });            /* pommeau */
    [-1, 1].forEach(function (s) {
      const xp = cx + s * 0.19;
      bxr(Z, G, xp - 0.035, b + 0.37, z + 0.005, 0.007, 0.235, 0.01, 0, 0, -16.9);           /* chaînettes */
      bxr(Z, G, xp + 0.035, b + 0.37, z + 0.005, 0.007, 0.235, 0.01, 0, 0, 16.9);
      ext(Z, G, [[-0.09, 0], [0.09, 0], [0.055, -0.05], [-0.055, -0.05]], 0.01, xp, b + 0.255, z);   /* plateau */
    });
  })(PX, PY + 0.18, ZA + 0.075);
  /* interphone à défilement, sur la pile entre le cinéma et le hall */
  bx(Z, "#c9ced6", -19.2, -18.98, 1.12, 1.56, ZA + 0.04, ZA + 0.065, { edge: 1 });
  bx(Z, "#1e2630", -19.17, -19.01, 1.38, 1.5, ZA + 0.065, ZA + 0.07);
  bx(Z, "#8fe3ff", -19.15, -19.03, 1.4, 1.48, ZA + 0.07, ZA + 0.072, { lum: 1 });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) bx(Z, "#3a424c", -19.16 + c * 0.08, -19.1 + c * 0.08, 1.17 + r * 0.06, 1.21 + r * 0.06, ZA + 0.065, ZA + 0.072);

  /* =====================================================================
     4 bis. LE CINÉMA DE QUARTIER (zone « cinema ») : la travée gauche du rez-de-chaussée
        portes doubles vitrées sous une marquise à ampoules, deux vitrines d'affiches
        éclairées, le hall rouge deviné derrière le verre (caisse, moquette, portes de salle)
     ===================================================================== */
  const CN = "cinema";
  const ROUGE = "#9b1b34", MOQ = "#b02440", BORD = "#8c2c40", LAITON = "#c9a24a", SOMBRE = "#2e2328", CREME = "#f1e8d2";
  const DX0 = -21.2, DX1 = -19.9, DXC = -20.55;                  /* l'ouverture des portes et son axe */
  const ZG = E(ZA, 1, 0.15, 0.18), ZO = E(ZA, 1, 0.12, 0.21);    /* vitrage et ossature, en retrait comme au hall */
  const ZS = ZA + 0.04;                                          /* face du soubassement en pierre */

  /* les portes : deux vantaux vitrés, plinthes en laiton, tirants, imposte à petits-bois */
  bx(CN, P.verre, DX0, DX1, 0.03, 2.75, ZG[0], ZG[1], { t: 0.2 });
  [[DX0, DX0 + 0.07], [DX1 - 0.07, DX1], [DXC - 0.04, DXC + 0.04]].forEach(function (m) { bx(CN, SOMBRE, m[0], m[1], 0, 2.75, ZO[0], ZO[1]); });
  bx(CN, SOMBRE, DX0, DX1, 2.68, 2.75, ZO[0], ZO[1]);
  bx(CN, SOMBRE, DX0, DX1, 2.2, 2.26, ZO[0], ZO[1]);
  [DX0 + 0.43, DX1 - 0.43].forEach(function (x) { bx(CN, SOMBRE, x - 0.012, x + 0.012, 2.26, 2.68, ZO[0] + 0.02, ZO[1] - 0.02); });
  [[DX0 + 0.07, DXC - 0.04], [DXC + 0.04, DX1 - 0.07]].forEach(function (v) {
    bx(CN, SOMBRE, v[0], v[1], 2.14, 2.2, ZO[0], ZO[1]);                                  /* traverse haute du vantail */
    bx(CN, LAITON, v[0], v[1], 0.03, 0.2, ZO[1], ZO[1] + 0.015, { edge: 1 });             /* plinthe en laiton */
  });
  [DXC - 0.12, DXC + 0.12].forEach(function (x) {
    cyv(CN, LAITON, x, 0.78, 1.62, ZA - 0.08, 0.014, { seg: 8 });                         /* grands tirants */
    tube(CN, LAITON, x, 0.86, ZA - 0.08, x, 0.86, ZO[1], 0.008, { seg: 5 });
    tube(CN, LAITON, x, 1.54, ZA - 0.08, x, 1.54, ZO[1], 0.008, { seg: 5 });
  });
  bx(CN, "#cfc8b8", DX0, DX1, 0, 0.035, 1.5, ZS, { edge: 1 });                            /* seuil */
  bx(CN, LAITON, DX0 + 0.07, DX1 - 0.07, 0.035, 0.045, ZO[0] - 0.02, ZO[1] + 0.06);

  /* le tapis rouge : sur le parvis jusqu'au seuil, puis dans le hall ; poteaux et cordon de velours */
  bx(CN, MOQ, DXC - 0.5, DXC + 0.5, 0.03, 0.048, ZS, 2.58);
  [DXC - 0.5, DXC + 0.47].forEach(function (x) { bx(CN, "#e0b64a", x, x + 0.03, 0.048, 0.052, ZS, 2.58); });
  [-1, 1].forEach(function (s) {
    const x = DXC + s * 0.66;
    [2.0, 2.5].forEach(function (z) {
      cy(CN, LAITON, x, 0.04, z, 0.075, 0.02, { seg: 12 });
      cyv(CN, LAITON, x, 0.045, 0.88, z, 0.016, { seg: 8 });
      sp(CN, LAITON, x, 0.91, z, 0.033, 0.033, 0.033, { seg: 8, seg2: 6 });
    });
    canal(CN, "#8a1730", [[x, 0.8, 2.0], [x, 0.7, 2.25], [x, 0.8, 2.5]], 0.012, { seg: 5 });
  });

  /* le hall, vu à travers les portes : moquette, murs bordeaux, portes de salle capitonnées, caisse */
  bx(CN, MOQ, DXC - 0.55, DXC + 0.55, 0.02, 0.05, -0.93, 1.5);
  [DXC - 0.55, DXC + 0.52].forEach(function (x) { bx(CN, "#e0b64a", x, x + 0.03, 0.05, 0.054, -0.93, 1.5); });
  bx(CN, BORD, XI0, -19.72, 0.02, 2.9, -0.98, -0.93);                                       /* mur du fond */
  bx(CN, "#6a2030", XI0, -19.72, 0.02, 0.9, -0.93, -0.91);                                   /* lambris */
  bx(CN, LAITON, XI0, -19.72, 0.9, 0.93, -0.93, -0.9);                                       /* main courante */
  bx(CN, BORD, -19.72, -19.7, 0.02, 2.9, -0.93, 1.45);                                       /* mur de droite, habillé */
  bx(CN, LAITON, -21.0, -19.8, 0, 2.12, -0.93, -0.89);                                       /* chambranle des portes de salle */
  [[-20.97, -20.43], [-20.37, -19.83]].forEach(function (v, k) {
    bx(CN, "#a83048", v[0], v[1], 0.02, 2.08, -0.89, -0.86, { edge: 1 });
    for (let q = 1; q < 4; q++) bx(CN, "#82223a", v[0] + q * 0.135 - 0.006, v[0] + q * 0.135 + 0.006, 0.1, 1.2, -0.86, -0.853);   /* capitonnage */
    const hx = (v[0] + v[1]) / 2;
    cy(CN, LAITON, hx, 1.5, -0.855, 0.085, 0.012, { axe: "z", seg: 14 });                     /* hublot : anneau, verre éclairé */
    cy(CN, "#cfe8ff", hx, 1.5, -0.846, 0.065, 0.01, { axe: "z", seg: 14, lum: 1 });
    bx(CN, LAITON, k ? v[0] + 0.04 : v[1] - 0.08, k ? v[0] + 0.08 : v[1] - 0.04, 0.85, 1.2, -0.86, -0.845);   /* plaque de poussée */
  });
  [-21.28, -19.52].forEach(function (x) { bx(CN, "#ffe3a0", x - 0.04, x + 0.04, 1.75, 1.95, -0.93, -0.89, { lum: 1 }); });   /* appliques */
  /* la caisse : guichet vitré sur son comptoir en bois, lampe allumée, machine à billets */
  bx(CN, "#7a4a34", -21.5, -20.7, 0.02, 1.05, 0.15, 0.75, { edge: 1 });
  bx(CN, "#ffd9a0", -21.46, -20.74, 1.3, 1.92, 0.16, 0.18, { lum: 1 });                        /* fond de la cabine, éclairé */
  bx(CN, LAITON, -21.5, -20.7, 0.9, 0.93, 0.75, 0.78);
  bx(CN, "#7a5638", -21.54, -20.66, 1.05, 1.09, 0.1, 0.8, { edge: 1 });
  bx(CN, P.verre, -21.5, -20.7, 1.09, 1.98, 0.72, 0.74, { t: 0.2 });
  bx(CN, P.verre, -20.72, -20.7, 1.09, 1.95, 0.15, 0.72, { t: 0.2 });
  [-21.5, -20.73].forEach(function (x) { bx(CN, SOMBRE, x, x + 0.03, 1.09, 1.98, 0.7, 0.75); });
  bx(CN, SOMBRE, -21.5, -20.7, 1.95, 2.0, 0.15, 0.75);
  bx(CN, "#ffd68a", -21.35, -20.85, 1.9, 1.94, 0.3, 0.6, { lum: 1 });
  bx(CN, "#d9d4c8", -21.2, -20.95, 1.09, 1.28, 0.3, 0.5, { edge: 1 });
  bx(CN, "#8fe3ff", -21.17, -20.98, 1.2, 1.26, 0.5, 0.505, { lum: 1 });

  /* les deux vitrines d'affiches, encastrées dans les piles de pierre : caisson, cadre en laiton,
     bandeau lumineux, verre. Les affiches sont faites de boîtes et de sphères éclairées, sans lettre. */
  function vitrineAffiche(cx, fond, dessin) {
    const x0 = cx - 0.28, x1 = cx + 0.28, yb = 0.98, yh = 2.08, zf = ZS, Y0 = 1.03, pz = zf + 0.066;
    bx(CN, SOMBRE, x0, x1, yb, yh, zf, zf + 0.06, { edge: 1 });
    bx(CN, fond, cx - 0.24, cx + 0.24, Y0, Y0 + 0.9, zf + 0.06, pz, { lum: 1 });
    bx(CN, "#fff0c8", cx - 0.24, cx + 0.24, Y0 + 0.9, 2.03, zf + 0.06, pz, { lum: 1 });     /* bandeau lumineux du haut */
    bx(CN, SOMBRE, cx - 0.24, cx + 0.24, Y0 + 0.9, Y0 + 0.915, pz, pz + 0.004);
    bx(CN, LAITON, x0, x1, yb, yb + 0.05, zf + 0.06, zf + 0.11, { edge: 1 });
    bx(CN, LAITON, x0, x1, yh - 0.05, yh, zf + 0.06, zf + 0.11, { edge: 1 });
    bx(CN, LAITON, x0, x0 + 0.04, yb, yh, zf + 0.06, zf + 0.11, { edge: 1 });
    bx(CN, LAITON, x1 - 0.04, x1, yb, yh, zf + 0.06, zf + 0.11, { edge: 1 });
    bx(CN, P.verre, cx - 0.24, cx + 0.24, Y0, 2.03, zf + 0.095, zf + 0.1, { t: 0.16 });
    /* les trois outils du dessin : boîte, disque, boîte tournée ; u,v partent du coin bas gauche, au centre de l'affiche */
    const B = function (hex, u0, u1, v0, v1, dz) { bx(CN, hex, cx + u0, cx + u1, Y0 + v0, Y0 + v1, pz, pz + 0.004 + (dz || 0), { lum: 1 }); };
    const S = function (hex, u, v, r, dz) { sp(CN, hex, cx + u, Y0 + v, pz + 0.004 + (dz || 0), r, r, 0.003, { lum: 1, seg: 14, seg2: 6 }); };
    const R = function (hex, u, v, w, h, rot, dz) { bxr(CN, hex, cx + u, Y0 + v, pz + 0.006 + (dz || 0), w, h, 0.004, 0, 0, rot, { lum: 1 }); };
    const X = function (hex, pts, u, v, dz) { ext(CN, hex, pts, 0.004, cx + u, Y0 + v, pz + 0.004 + (dz || 0), { lum: 1 }); };
    dessin(B, S, R, X);
  }

  /* affiche 1 : « Voyage dans tous ses états » : la mascotte (molécule bleue, deux oreilles rondes)
     sur fond crème, les trois états de l'eau, un serpentin de cuivre au pied */
  vitrineAffiche(DXC - 0.98, "#f7edd2", function (B, S, R) {
    B("#1d5fa6", -0.24, 0.24, 0, 0.07);                                     /* bande basse */
    B("#1d5fa6", -0.24, 0.24, 0.8, 0.9);                                    /* bandeau du titre, sans lettre */
    B("#e0a82e", -0.24, 0.24, 0.785, 0.8);
    for (let k = 0; k < 9; k++) B("#c3ccd4", -0.152 + k * 0.0375, -0.144 + k * 0.0375, 0.09, 0.25);   /* ailettes */
    B("#c97b48", -0.24, 0.19, 0.096, 0.124, 0.006);                        /* le serpentin de cuivre : trois passes, deux coudes */
    B("#c97b48", -0.19, 0.19, 0.156, 0.184, 0.006);
    B("#c97b48", -0.19, 0.24, 0.216, 0.244, 0.006);
    B("#c97b48", 0.172, 0.2, 0.096, 0.184, 0.006);
    B("#c97b48", -0.2, -0.172, 0.156, 0.244, 0.006);
    B("#6fb6d8", -0.178, -0.102, 0.272, 0.348);                            /* glaçon */
    B("#cdeefa", -0.17, -0.11, 0.28, 0.34, 0.006);
    R("#1a5fae", 0, 0.343, 0.05, 0.05, 45); S("#1a5fae", 0, 0.305, 0.04, 0);                 /* goutte */
    R("#2d86d8", 0, 0.343, 0.04, 0.04, 45, 0.006); S("#2d86d8", 0, 0.305, 0.033, 0.006);
    [[0.115, 0.295, 0.03], [0.15, 0.318, 0.034], [0.18, 0.295, 0.028]].forEach(function (c) { S("#9fb3c0", c[0], c[1], c[2], 0); });   /* vapeur */
    [[0.115, 0.295, 0.023], [0.15, 0.318, 0.027], [0.18, 0.295, 0.021]].forEach(function (c) { S("#eef3f6", c[0], c[1], c[2], 0.006); });
    [-1, 1].forEach(function (s) {                                          /* la mascotte : deux oreilles rondes, une sphère bleue */
      S("#1a5fae", s * 0.105, 0.69, 0.063, 0); S("#2d86d8", s * 0.105, 0.69, 0.056, 0.004); S("#8cc6f5", s * 0.105, 0.69, 0.03, 0.008);
    });
    S("#1a5fae", 0, 0.57, 0.15, 0.012); S("#2d86d8", 0, 0.57, 0.138, 0.016);
    S("#86c3f5", -0.07, 0.64, 0.03, 0.022);
    [-1, 1].forEach(function (s) {
      S("#142a52", s * 0.05, 0.59, 0.018, 0.024); S("#ffffff", s * 0.05 + 0.006, 0.597, 0.006, 0.03);
      S("#ff9db3", s * 0.09, 0.545, 0.018, 0.022);
      R("#142a52", s * 0.03, 0.532, 0.03, 0.01, s * 25, 0.022);
    });
    R("#142a52", 0, 0.525, 0.045, 0.01, 0, 0.022);
  });

  /* affiche 2 : les films des régules : un flocon sur fond bleu nuit, une chambre froide au pied */
  vitrineAffiche(DXC + 0.98, "#13264f", function (B, S, R, X) {
    B("#e8f6ff", -0.24, 0.24, 0.84, 0.9);                                   /* givre en haut, et ses glaçons */
    for (let k = 0; k < 10; k++) {
      const L = 0.05 + (k % 3) * 0.03;
      X("#e8f6ff", [[0, 0], [0.034, 0], [0.017, -L]], -0.22 + k * 0.049, 0.84, 0);
    }
    B("#7fc7ec", -0.24, 0.24, 0, 0.07);                                     /* givre en bas */
    B("#bfe4f6", -0.24, 0.24, 0.07, 0.085);
    [0, 60, 120].forEach(function (a) {
      R("#dff3ff", 0, 0.5, 0.34, 0.022, a, 0.004);                            /* le flocon : trois diamètres, des branches en V */
      [1, -1].forEach(function (s) {
        const t0 = a + (s > 0 ? 0 : 180);
        [0.07, 0.12].forEach(function (r) {
          [1, -1].forEach(function (sg) {
            const t = (t0 + sg * 60) * Math.PI / 180, p = t0 * Math.PI / 180;
            R("#dff3ff", r * Math.cos(p) + 0.035 * Math.cos(t), 0.5 + r * Math.sin(p) + 0.035 * Math.sin(t), 0.07, 0.016, t0 + sg * 60, 0.004);
          });
        });
      });
    });
    S("#ffffff", 0, 0.5, 0.03, 0.012);
    [[-0.19, 0.64], [0.2, 0.62], [-0.21, 0.34], [0.2, 0.38]].forEach(function (p) { R("#cfe9ff", p[0], p[1], 0.022, 0.022, 45, 0.004); });
    B("#9fb0bd", -0.13, 0.13, 0.115, 0.275);                                /* la chambre froide : caisson, porte, poignée, voyant */
    B("#eef3f6", -0.12, 0.12, 0.125, 0.265, 0.006);
    B("#cdd9e2", -0.03, 0.1, 0.13, 0.25, 0.012);
    B("#667482", -0.015, -0.005, 0.17, 0.21, 0.018);
    S("#ff5a5a", -0.08, 0.2, 0.012, 0.018);
  });

  /* la marquise : dalle qui avance de 1,7 m au-dessus du trottoir, jupe rouge et or, pellicule au centre,
     une rangée d'ampoules allumées sur la tranche et sur les côtés, deux tirants vers la façade */
  const XM0 = -22.0, XM1 = -19.4, ZM = 3.44, ZMF = 3.52;
  bx(CN, "#efe6d0", XM0, XM1, 2.98, 3.0, ZA + 0.09, ZM, { edge: 1 });                      /* dessous clair */
  bx(CN, ROUGE, XM0, XM1, 3.0, 3.22, ZA + 0.09, ZM, { edge: 1 });                          /* dalle */
  bx(CN, "#8f98a3", XM0 + 0.02, XM1 - 0.02, 3.22, 3.24, ZA + 0.1, ZM - 0.02);               /* étanchéité */
  bx(CN, ROUGE, XM0, XM1, 2.9, 3.27, ZM, ZMF, { edge: 1 });                                /* la jupe */
  bx(CN, P.or, XM0 - 0.005, XM1 + 0.005, 3.235, 3.27, ZM, ZMF + 0.015);                   /* filets d'or */
  bx(CN, P.or, XM0 - 0.005, XM1 + 0.005, 2.9, 2.935, ZM, ZMF + 0.015);
  bx(CN, P.or, XM0 - 0.005, XM0 + 0.04, 2.9, 3.27, ZM, ZMF + 0.015);
  bx(CN, P.or, XM1 - 0.04, XM1 + 0.005, 2.9, 3.27, ZM, ZMF + 0.015);
  bx(CN, P.or, XM0 - 0.005, XM0 + 0.005, 3.08, 3.12, ZA + 0.09, ZM);                      /* filet d'or sur les côtés */
  bx(CN, P.or, XM1 - 0.005, XM1 + 0.005, 3.08, 3.12, ZA + 0.09, ZM);
  /* ampoules : deux rangées sur la jupe (haut et bas), une sur chaque côté */
  bx(CN, "#3a2a2f", XM0 + 0.06, XM1 - 0.06, 3.205, 3.225, ZMF + 0.005, ZMF + 0.02);
  bx(CN, "#3a2a2f", XM0 + 0.06, XM1 - 0.06, 2.945, 2.965, ZMF + 0.005, ZMF + 0.02);
  for (let x = XM0 + 0.1, k = 0; x < XM1 - 0.05; x += 0.1, k++) {
    const c = k % 2 ? "#fff6d6" : "#ffe9a8";
    sp(CN, c, x, 3.215, ZMF + 0.025, 0.024, 0.024, 0.024, { seg: 6, seg2: 4, lum: 1 });
    sp(CN, c, x, 2.955, ZMF + 0.025, 0.024, 0.024, 0.024, { seg: 6, seg2: 4, lum: 1 });
  }
  [XM0 - 0.012, XM1 + 0.012].forEach(function (x) {
    for (let z = ZA + 0.25, k = 0; z < ZM - 0.05; z += 0.14, k++) sp(CN, k % 2 ? "#fff6d6" : "#ffe9a8", x, 3.1, z, 0.022, 0.022, 0.022, { seg: 6, seg2: 4, lum: 1 });
  });
  /* la pellicule : bande noire à perforations, sept images de couleur éclairées */
  bx(CN, "#15171c", -21.5, -19.9, 2.985, 3.185, ZMF, ZMF + 0.02);
  for (let x = -21.47; x < -19.92; x += 0.07) {
    bx(CN, "#f6efdc", x, x + 0.035, 3.158, 3.176, ZMF + 0.02, ZMF + 0.026, { lum: 1 });
    bx(CN, "#f6efdc", x, x + 0.035, 2.994, 3.012, ZMF + 0.02, ZMF + 0.026, { lum: 1 });
  }
  ["#f0b13c", "#3d8fd6", "#ee5d86", "#f6efdc", "#3d8fd6", "#f0b13c", "#ee5d86"].forEach(function (c, k) {
    bx(CN, c, -21.47 + k * 0.22, -21.47 + k * 0.22 + 0.19, 3.03, 3.14, ZMF + 0.02, ZMF + 0.026, { lum: 1 });
  });
  /* dessous : quatre spots allumés, bandeau lumineux le long de la jupe */
  [-21.5, -20.9, -20.3, -19.7].forEach(function (x) { cy(CN, "#fff3c4", x, 2.974, 2.75, 0.07, 0.012, { seg: 10, lum: 1 }); });
  bx(CN, "#ffe9b0", XM0 + 0.2, XM1 - 0.2, 2.974, 2.98, 3.3, 3.36, { lum: 1 });
  /* tirants en acier, fixés sur la façade sous les appuis du premier étage */
  [DXC - 1.0, DXC + 1.0].forEach(function (x) {
    tube(CN, P.acierF, x, 3.27, ZM - 0.04, x, 3.9, ZA + 0.04, 0.018, { seg: 6 });
    bx(CN, P.acierF, x - 0.06, x + 0.06, 3.84, 3.96, ZA, ZA + 0.04);
    bx(CN, P.acierF, x - 0.05, x + 0.05, 3.22, 3.3, ZM - 0.1, ZM);
  });

  /* =====================================================================
     4 ter. LE LOCAL À LOUER (décor) : la travée droite du rez-de-chaussée
        vitrine en blanc de Meudon, bandeau d'enseigne vide, porte, panneau « à louer » sans lettre
     ===================================================================== */
  const LX0 = -15.88, LX1 = -13.8, LXM = -14.68, GRIS = "#59606a";
  bx(null, PIERRE, LX0, LXM, 0, 0.42, 1.5, ZS - 0.02, { edge: 1 });                         /* allège en pierre */
  bx(null, "#ece5d5", LX0 - 0.02, LXM + 0.02, 0.42, 0.46, 1.5, ZS + 0.01, { edge: 1 });
  bx(null, "#eceae2", LX0, LXM, 0.46, 2.2, ZG[0], ZG[1], { t: 0.97 });                      /* verre blanchi, presque opaque */
  bx(null, "#eceae2", LXM + 0.06, LX1, 0.03, 2.2, ZG[0], ZG[1], { t: 0.97 });
  for (let k = 0; k < 8; k++) {                                                              /* coups de brosse du blanc d'Espagne */
    bxr(null, k % 2 ? "#fbfaf6" : "#d3cfc2", LX0 + 0.12 + k * 0.145 + (k % 3) * 0.04, 0.85 + ((k * 37) % 10) * 0.095, ZG[1] + 0.003, 0.5, 0.045, 0.004, 0, 0, -20 + (k % 4) * 9);
  }
  [[LX0, LX0 + 0.06], [LXM - 0.06, LXM + 0.06], [LX1 - 0.06, LX1]].forEach(function (m) { bx(null, GRIS, m[0], m[1], 0.46, 2.26, ZO[0], ZO[1]); });
  bx(null, GRIS, LX0, LXM, 0.46, 0.52, ZO[0], ZO[1]);
  bx(null, GRIS, LX0, LX1, 2.2, 2.26, ZO[0], ZO[1]);
  [[LXM + 0.06, LXM + 0.11], [LX1 - 0.11, LX1 - 0.06]].forEach(function (m) { bx(null, GRIS, m[0], m[1], 0, 2.2, ZO[0], ZO[1]); });   /* montants du vantail */
  bx(null, GRIS, LXM + 0.06, LX1 - 0.06, 0, 0.14, ZO[0], ZO[1]);
  bx(null, "#c9d0d8", LXM + 0.12, LXM + 0.135, 0.8, 1.5, ZA - 0.1, ZA - 0.075);
  tube(null, "#c9d0d8", LXM + 0.1275, 0.86, ZA - 0.1, LXM + 0.1275, 0.86, ZO[1], 0.008, { seg: 5 });
  tube(null, "#c9d0d8", LXM + 0.1275, 1.44, ZA - 0.1, LXM + 0.1275, 1.44, ZO[1], 0.008, { seg: 5 });
  bx(null, "#2a313b", LXM + 0.115, LXM + 0.145, 0.95, 1.08, ZA - 0.075, ZA - 0.06);          /* serrure */
  bx(null, "#9aa5b1", LXM + 0.06, LX1, 0, 0.03, 1.5, ZS, { edge: 1 });                      /* seuil */
  /* le bandeau d'enseigne : cadre gris, panneau mat et trace claire de l'ancienne enseigne, quatre vis */
  bx(null, GRIS, LX0, LX1, 2.26, 2.75, ZO[0] + 0.02, ZO[1] + 0.12, { edge: 1 });
  bx(null, "#d8d4c6", LX0 + 0.04, LX1 - 0.04, 2.3, 2.71, ZO[1] + 0.12, ZO[1] + 0.135);
  bx(null, "#e5e1d4", LX0 + 0.25, LX1 - 0.25, 2.37, 2.64, ZO[1] + 0.135, ZO[1] + 0.14);
  [[LX0 + 0.12, 2.35], [LX0 + 0.12, 2.66], [LX1 - 0.12, 2.35], [LX1 - 0.12, 2.66]].forEach(function (v) {
    cy(null, "#6e7480", v[0], v[1], ZO[1] + 0.14, 0.012, 0.01, { axe: "z", seg: 6 });
  });
  /* le panneau « à louer » : rectangle rouge, trois barres blanches (pas de lettre) */
  bx(null, "#c93636", -15.5, -15.1, 1.1, 1.65, ZG[1] + 0.003, ZG[1] + 0.012);
  bx(null, "#fafaf6", -15.46, -15.14, 1.5, 1.59, ZG[1] + 0.012, ZG[1] + 0.016);
  bx(null, "#fafaf6", -15.44, -15.16, 1.34, 1.39, ZG[1] + 0.012, ZG[1] + 0.016);
  bx(null, "#fafaf6", -15.44, -15.26, 1.24, 1.29, ZG[1] + 0.012, ZG[1] + 0.016);

  /* =====================================================================
     5. LES DRAPEAUX : France et Europe, sur hampes inclinées à 25°,
        flottant tous deux vers la droite (même vent, bleu-blanc-rouge lisible)
     ===================================================================== */
  const INC = 25, CI = Math.cos(INC * Math.PI / 180), SI = Math.sin(INC * Math.PI / 180), LH = 1.32;
  function hampe(x, sens, etoffe) {
    const y0 = 3.55, z0 = ZA + 0.24;
    bx(Z, P.acierF, x - 0.05, x + 0.05, y0 - 0.1, y0 + 0.1, ZA + 0.22, ZA + 0.25);            /* platine */
    tube(Z, "#eef0f2", x, y0, z0, x, y0 + LH * CI, z0 + LH * SI, 0.018, { seg: 6 });
    sp(Z, P.or, x, y0 + LH * CI + 0.03, z0 + LH * SI + 0.014, 0.035, 0.035, 0.035, { seg: 8, seg2: 6 });
    const s = LH - 0.38;                                                                          /* milieu de l'étoffe */
    etoffe(x, sens, y0 + s * CI, z0 + s * SI);
  }
  /* bande verticale de l'étoffe : u = distance à la hampe, de largeur w */
  function lai(hex, x, sens, yc, zc, u, w) { bxr(Z, hex, x + sens * (0.03 + u + w / 2), yc, zc, w, 0.6, 0.012, INC, 0, 0); }
  hampe(T[2], +1, function (x, sens, yc, zc) {
    lai("#2b4ea2", x, sens, yc, zc, 0, 0.3); lai("#f7f5ef", x, sens, yc, zc, 0.3, 0.3); lai("#d63a3a", x, sens, yc, zc, 0.6, 0.3);
  });
  hampe(T[3], +1, function (x, sens, yc, zc) {
    lai("#1f3f99", x, sens, yc, zc, 0, 0.9);
    const ux = x + sens * (0.03 + 0.45);
    for (let k = 0; k < 12; k++) {
      const a = k * Math.PI / 6, u = 0.19 * Math.cos(a), v = 0.19 * Math.sin(a);
      bxr(Z, "#f5c518", ux + u, yc + v * CI - 0.009 * SI, zc + v * SI + 0.009 * CI, 0.035, 0.035, 0.006, INC, 0, 45);
    }
  });

  /* =====================================================================
     6. LES DESCENTES D'EAUX PLUVIALES (aux deux angles avant)
     ===================================================================== */
  [[XD + 0.08, 1], [XG - 0.08, -1]].forEach(function (d) {
    const x = d[0], z = ZA - 0.22, zx = d[1];
    cyv(Z, "#a3acb6", x, 0.95, HA - 0.55, z, 0.055, { seg: 10 });
    cyv(Z, "#6f7884", x, 0.03, 0.95, z, 0.065, { seg: 10 });                    /* dauphin en fonte */
    for (let y = 2.0; y < HA - 1; y += 2.2) cyv(Z, "#7d8794", x, y, y + 0.05, z, 0.07, { seg: 10 });   /* colliers */
    const xm = zx > 0 ? XD : XG;
    bx(Z, "#a3acb6", Math.min(xm, xm + zx * 0.15), Math.max(xm, xm + zx * 0.15), HA - 0.85, HA - 0.5, z - 0.15, z + 0.15, { edge: 1 });   /* boîte à eau */
    cyv(Z, "#a3acb6", x, HA - 0.98, HA - 0.85, z, 0.04, { seg: 8, rt: 0.07 });
  });

  /* =====================================================================
     7. LE DEDANS DEVINÉ : planchers, luminaires, cage d'escalier, hall
     ===================================================================== */
  /* sol du rez-de-chaussée, planchers des étages (trémie de l'escalier aux niveaux 2 et 3) */
  bx(Z, "#e3dfd3", XI0, XI1, 0, 0.02, ZI0, ZI1);
  bx(Z, P.beton, XI0, XI1, 2.9, 3.2, ZI0, ZI1);
  [6.4, 9.6].forEach(function (y) {
    bx(Z, P.beton, XI0, CX0, y - 0.3, y, ZI0, ZI1);
    bx(Z, P.beton, CX1, XI1, y - 0.3, y, ZI0, ZI1);
    bx(Z, P.beton, CX0, CX1, y - 0.3, y, ZI0, CZ0);
    bx(Z, P.beton, CX0, CX0 + 0.38, y - 0.3, y, CZ0, ZI1);     /* palier d'étage */
  });
  bx(Z, P.beton, XI0, XI1, HT - 0.35, HT, ZI0, ZI1);
  bx(Z, "#8e959f", XI0, XI1, HT, YT, ZI0, ZI1);               /* étanchéité de la toiture */
  /* luminaires : barres lumineuses sous chaque plafond */
  [3.2, 6.4, 9.6, HT - 0.05].forEach(function (yp) {
    const y = yp - 0.3;
    [[XI0 + 0.4, CX0 - 0.35, 0.85], [CX1 + 0.35, XI1 - 0.4, 0.85], [XI0 + 0.4, XI1 - 0.4, -2.6], [XI0 + 0.4, XI1 - 0.4, -4.3]].forEach(function (l) {
      bx(Z, "#fff7dc", l[0], l[1], y - 0.04, y, l[2] - 0.08, l[2] + 0.08, { lum: 1 });
    });
  });
  /* cage d'escalier : murs, deux volées par étage, paliers intermédiaires, main courante */
  bx(Z, "#e6dfd0", CX0 - 0.1, CX0, 3.2, HT - 0.35, CZ0, ZI1);
  bx(Z, "#e6dfd0", CX1, CX1 + 0.1, 3.2, HT - 0.35, CZ0, ZI1);
  bx(Z, "#e6dfd0", CX0 - 0.1, CX1 + 0.1, 3.2, HT - 0.35, CZ0 - 0.1, CZ0);
  function volee(y0, sens, za, zb) {
    const NB = 8, HM = 0.2, RUN = 0.17, xs = sens > 0 ? CX0 + 0.35 : -17.04;
    const pts = [[0, 0]];
    for (let k = 0; k < NB; k++) { pts.push([sens * k * RUN, (k + 1) * HM]); pts.push([sens * (k + 1) * RUN, (k + 1) * HM]); }
    pts.push([sens * NB * RUN, NB * HM - 0.28]);
    ext(Z, "#dcd7ca", pts, zb - za, xs, y0, za);
    const zr = sens > 0 ? za : zb;
    tube(Z, ZC, xs, y0 + 0.95, zr, xs + sens * NB * RUN, y0 + 0.95 + NB * HM, zr, 0.02, { seg: 5 });
  }
  [3.2, 6.4].forEach(function (y0) {
    volee(y0, +1, 0.45, 1.4);
    bx(Z, P.beton, -17.04, CX1, y0 + 1.4, y0 + 1.6, CZ0, ZI1, { edge: 1 });    /* palier intermédiaire */
    volee(y0 + 1.6, -1, -0.5, 0.4);
  });
  /* le hall du rez-de-chaussée, vu à travers les portes : banque d'accueil, panneau, plante */
  bx(Z, INTER, -19.7, -15.8, 0, 2.9, -2.5, -2.4);
  bx(Z, INTER, -19.7, -19.6, 0, 2.9, -2.4, ZI1);
  bx(Z, INTER, -15.9, -15.8, 0, 2.9, -2.4, ZI1);
  bx(Z, "#e9e4d8", -19.6, -15.9, 0.02, 0.04, -2.4, ZI1);
  bx(Z, "#e4e0d6", -18.55, -16.95, 0, 1.05, -1.55, -1.05, { edge: 1 });
  bx(Z, ZC, -18.55, -16.95, 0.85, 0.95, -1.05, -1.03);
  bx(Z, "#8a94a1", -18.6, -16.9, 1.05, 1.1, -1.6, -1.0);
  bx(Z, P.bleu, -18.4, -17.1, 1.5, 2.4, -2.4, -2.38);
  bx(Z, P.or, -18.4, -17.1, 1.46, 1.5, -2.4, -2.37);
  cyv(Z, "#e9e5db", -19.2, 0.02, 0.45, -1.9, 0.18, { seg: 10 });
  sp(Z, P.feuilleF, -19.2, 0.8, -1.9, 0.28, 0.38, 0.28, { seg: 8, seg2: 6 });
  bx(Z, "#fff7dc", -18.6, -16.9, 2.82, 2.86, -0.4, -0.25, { lum: 1 });

  /* =====================================================================
     8. EN TOITURE : deux PAC et leur écran acoustique en lames
     ===================================================================== */
  const PZ0 = -4.4, PZ1 = -2.5;
  function pac(x0) {
    const x1 = x0 + 2.1, xc = (x0 + x1) / 2, zc = (PZ0 + PZ1) / 2, yb = YT + 0.26, yh = YT + 1.66;
    /* deux rails de support sur plots antivibratiles */
    [PZ0 + 0.3, PZ1 - 0.3].forEach(function (z) {
      bx(Z, P.acierF, x0 - 0.12, x1 + 0.12, YT + 0.1, YT + 0.2, z - 0.05, z + 0.05, { edge: 1 });
      [x0 + 0.1, x1 - 0.1].forEach(function (x) {
        bx(Z, "#2a313b", x - 0.09, x + 0.09, YT, YT + 0.1, z - 0.09, z + 0.09);
        cyv(Z, "#3a424c", x, YT + 0.2, yb, z, 0.05, { seg: 8 });
      });
    });
    /* caisson et bandeau de pied */
    bx(Z, "#e3e7eb", x0, x1, yb, yh, PZ0, PZ1, { edge: 1 });
    bx(Z, ZC, x0 - 0.01, x1 + 0.01, yb, yb + 0.12, PZ0 - 0.01, PZ1 + 0.01);
    /* batterie à ailettes sur la face avant et la face gauche, derrière sa grille */
    bx(Z, "#3a424c", x0 + 0.12, x1 - 0.12, yb + 0.2, yh - 0.1, PZ1, PZ1 + 0.03);
    for (let k = 0; k < 10; k++) bx(Z, "#8a94a1", x0 + 0.12, x1 - 0.12, yb + 0.24 + k * 0.11, yb + 0.26 + k * 0.11, PZ1 + 0.03, PZ1 + 0.05);
    bx(Z, "#3a424c", x0 - 0.03, x0, yb + 0.2, yh - 0.1, PZ0 + 0.12, PZ1 - 0.12);
    for (let k = 0; k < 10; k++) bx(Z, "#8a94a1", x0 - 0.05, x0 - 0.03, yb + 0.24 + k * 0.11, yb + 0.26 + k * 0.11, PZ0 + 0.12, PZ1 - 0.12);
    /* panneau de service à droite : poignée, vis, vannes de service sous capuchon */
    bx(Z, "#d3d8de", x1, x1 + 0.02, yb + 0.15, yh - 0.1, PZ0 + 0.15, PZ1 - 0.15, { edge: 1 });
    bx(Z, "#2a313b", x1 + 0.02, x1 + 0.045, yb + 0.85, yb + 0.95, PZ1 - 0.5, PZ1 - 0.3);
    [[yb + 0.2, PZ0 + 0.2], [yb + 0.2, PZ1 - 0.2], [yh - 0.15, PZ0 + 0.2], [yh - 0.15, PZ1 - 0.2]].forEach(function (v) {
      cy(Z, "#7d8794", x1 + 0.025, v[0], v[1], 0.015, 0.01, { axe: "x", seg: 6 });
    });
    cy(Z, P.cuivre, x1 + 0.06, yb + 0.19, PZ1 - 0.35, 0.03, 0.12, { axe: "x", seg: 8 });   /* vanne gaz */
    cy(Z, P.cuivre, x1 + 0.06, yb + 0.12, PZ1 - 0.2, 0.018, 0.12, { axe: "x", seg: 8 });   /* vanne liquide */
    cy(Z, "#3a424c", x1 + 0.13, yb + 0.19, PZ1 - 0.35, 0.034, 0.03, { axe: "x", seg: 8 });
    cy(Z, "#3a424c", x1 + 0.13, yb + 0.12, PZ1 - 0.2, 0.022, 0.03, { axe: "x", seg: 8 });
    /* ventilateur à soufflage vertical : virole, pales, moyeu, grille */
    cy(Z, "#2a313b", xc, yh + 0.08, zc, 0.78, 0.16, { seg: 24 });
    cy(Z, "#e9ecef", xc, yh + 0.165, zc, 0.74, 0.012, { seg: 24 });
    cy(Z, "#1a2028", xc, yh + 0.172, zc, 0.68, 0.012, { seg: 24 });
    for (let k = 0; k < 3; k++) bxr(Z, "#8a94a1", xc, yh + 0.2, zc, 0.58, 0.02, 0.2, 0, k * 60 + 15, 0);
    cy(Z, "#e9ecef", xc, yh + 0.22, zc, 0.08, 0.06, { seg: 8 });
    for (let k = 1; k <= 3; k++) cy(Z, "#c9ced6", xc, yh + 0.25, zc, 0.19 * k + 0.05, 0.006, { seg: 24, open: true });
    for (let k = 0; k < 4; k++) bx(Z, "#c9ced6", xc - 0.74, xc + 0.74, yh + 0.245, yh + 0.257, zc - 0.6 + k * 0.4 - 0.01, zc - 0.6 + k * 0.4 + 0.01);
    /* interrupteur de proximité sur son poteau, câble vers le coffret de l'unité */
    const xi = x0 + 0.35, zi = PZ1 + 0.24;
    cyv(Z, P.galva, xi, YT, YT + 1.0, zi, 0.03, { seg: 6 });
    bx(Z, "#d9dde3", xi - 0.11, xi + 0.11, YT + 0.82, YT + 1.12, zi + 0.03, zi + 0.16, { edge: 1 });
    bx(Z, "#f5c518", xi - 0.07, xi + 0.07, YT + 0.9, YT + 1.04, zi + 0.16, zi + 0.17);
    bxr(Z, "#d63a2f", xi, YT + 0.97, zi + 0.19, 0.14, 0.035, 0.035, 0, 0, 35);
    canal(Z, "#2a313b", [[xi, YT + 0.82, zi + 0.09], [xi, YT + 0.4, zi + 0.09], [xi, YT + 0.4, PZ1 + 0.06]], 0.012, { seg: 5 });
  }
  pac(-21.15); pac(-18.55);
  /* liaisons frigorifiques : gaz isolé (noir) et liquide (cuivre), sur plots, jusqu'à la crosse */
  const XCR = -14.95, ZCR = -2.05;
  [[-19.05, -1.9], [-16.45, -2.14]].forEach(function (u) {
    const x1 = u[0], zr = u[1], yb = YT + 0.26;
    canal(Z, P.armaflex, [[x1 + 0.15, yb + 0.19, PZ1 - 0.35], [x1 + 0.22, yb + 0.19, PZ1 - 0.35], [x1 + 0.22, YT + 0.17, PZ1 - 0.35],
      [x1 + 0.22, YT + 0.17, zr], [XCR - 0.04, YT + 0.17, zr], [XCR - 0.04, YT + 0.62, zr]], 0.035, { seg: 8 });
    canal(Z, P.cuivre, [[x1 + 0.15, yb + 0.12, PZ1 - 0.2], [x1 + 0.32, yb + 0.12, PZ1 - 0.2], [x1 + 0.32, YT + 0.15, PZ1 - 0.2],
      [x1 + 0.32, YT + 0.15, zr - 0.08], [XCR + 0.05, YT + 0.15, zr - 0.08], [XCR + 0.05, YT + 0.62, zr - 0.08]], 0.016, { seg: 6 });
    for (let x = x1 + 0.6; x < XCR - 0.3; x += 0.9) bx(Z, "#3a424c", x - 0.06, x + 0.06, YT, YT + 0.13, zr - 0.13, zr + 0.06);
  });
  /* la crosse de toiture : costière, col de cygne, bouche tournée vers le bas */
  bx(Z, "#d9dde3", XCR + 0.2, XCR + 0.6, YT, YT + 0.25, ZCR - 0.2, ZCR + 0.2, { edge: 1 });
  cyv(Z, "#b9c1ca", XCR + 0.4, YT + 0.25, YT + 0.95, ZCR, 0.13, { seg: 14 });
  sp(Z, "#b9c1ca", XCR + 0.4, YT + 0.95, ZCR, 0.13, 0.13, 0.13, { seg: 12, seg2: 8 });
  tube(Z, "#b9c1ca", XCR + 0.4, YT + 0.95, ZCR, XCR, YT + 0.95, ZCR, 0.13, { seg: 14 });
  sp(Z, "#b9c1ca", XCR, YT + 0.95, ZCR, 0.13, 0.13, 0.13, { seg: 12, seg2: 8 });
  cyv(Z, "#b9c1ca", XCR, YT + 0.62, YT + 0.95, ZCR, 0.15, { seg: 14, open: true });
  /* écran acoustique en lames, au fond et en retour à gauche, sur poteaux */
  const YS = YT + 2.05;
  for (let k = 0; k < 17; k++) bx(Z, k % 2 ? "#c9d3ea" : ZC, -21.35 + k * 0.32, -21.35 + k * 0.32 + 0.27, YT, YS, -4.9, -4.72);
  for (let k = 0; k < 8; k++) bx(Z, k % 2 ? ZC : "#c9d3ea", -21.48, -21.3, YT, YS, -4.7 + k * 0.32, -4.7 + k * 0.32 + 0.27);
  bx(Z, P.acierF, -21.5, -15.9, YS, YS + 0.08, -4.93, -4.69);
  bx(Z, P.acierF, -21.5, -21.28, YS, YS + 0.08, -4.93, -2.1);
  [-21.42, -19.6, -17.75, -15.95].forEach(function (x) { bx(Z, P.acierF, x - 0.05, x + 0.05, YT, YS + 0.08, -4.96, -4.66); });
  bx(Z, P.acierF, -21.5, -21.28, YT, YS + 0.08, -2.2, -2.1);
  /* trappe d'accès avec sa crosse d'échelle jaune, lanterneau de désenfumage */
  bx(Z, "#e9e5db", -18.7, -18.0, YT, YT + 0.45, -0.45, 0.35, { edge: 1 });
  bx(Z, P.galva, -18.74, -17.96, YT + 0.45, YT + 0.51, -0.49, 0.39, { edge: 1 });
  [-18.62, -18.08].forEach(function (x) {
    canal(Z, "#f2c94c", [[x, YT + 0.51, 0.15], [x, YT + 1.45, 0.15], [x, YT + 1.45, 0.45], [x, YT + 0.1, 0.45]], 0.022, { seg: 6 });
  });
  bx(Z, "#e9e5db", -17.55, -16.85, YT, YT + 0.4, 0.35, 1.15, { edge: 1 });
  sp(Z, "#d4e6f2", -17.2, YT + 0.4, 0.75, 0.33, 0.2, 0.38, { seg: 14, seg2: 6, t: 0.55 });
  bx(Z, "#d63a2f", -17.55, -17.45, YT + 0.42, YT + 0.5, 0.65, 0.85);
  /* chemin technique en dalles claires, de la trappe vers les PAC */
  for (let x = -21.0; x < -14.4; x += 0.6) bx(Z, "#d5d2ca", x, x + 0.5, YT, YT + 0.04, -1.45, -1.0);
  bx(Z, "#d5d2ca", -18.6, -18.1, YT, YT + 0.04, -0.95, -0.5);
  /* garde-corps autoportant sur l'avant et le côté droit (protection collective) */
  function gardeCorps(a, b) {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 1.4));
    for (let k = 0; k <= n; k++) {
      const x = a[0] + (b[0] - a[0]) * k / n, z = a[1] + (b[1] - a[1]) * k / n;
      cyv(Z, P.galva, x, YT, YT + 1.1, z, 0.022, { seg: 6 });
      bx(Z, "#3a424c", x - 0.12, x + 0.12, YT, YT + 0.08, z - 0.12, z + 0.12);
    }
    [0.55, 1.1].forEach(function (h) { tube(Z, P.galva, a[0], YT + h, a[1], b[0], YT + h, b[1], 0.02, { seg: 6 }); });
  }
  gardeCorps([XI0 + 0.3, ZI1 - 0.3], [XI1 - 0.3, ZI1 - 0.3]);
  gardeCorps([XI1 - 0.3, ZI1 - 0.3], [XI1 - 0.3, -4.5]);

  /* =====================================================================
     9. LES ZONES : surfaces de clic, repères, caméras
     ===================================================================== */
  /* « bureau » : tout l'immeuble SAUF le cinéma, donc les étages, le rez-de-chaussée à droite de la pile
     de l'interphone, et l'arrière de la travée du cinéma (derrière le plan de façade z = 1,75) */
  H.proxy(Z, -22, -13.5, 3.3, 15.3, -5.5, 2.6);
  H.proxy(Z, -19.25, -13.5, 0, 3.3, -5.5, 2.6);
  H.proxy(Z, -22, -19.25, 0, 3.3, -5.5, 1.75);
  H.ancre(Z, -17.75, 8.0, 2.6);
  /* « cinema » : la devanture, les vitrines d'affiches et la marquise */
  H.proxy(CN, -22.0, -19.25, 0, 3.3, 1.75, 3.55);
  H.ancre(CN, -20.4, 3.9, 3.6);
  return {
    bureau: { zoom: 0.66, az: [-15, 30], el: 10, foyer: [-17.75, 7.5, -1.2] },
    cinema: { zoom: 0.22, az: [-20, 8], el: 8, foyer: [-20.4, 1.8, 2.8] }
  };
}
