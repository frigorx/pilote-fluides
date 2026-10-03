/* =====================================================================
   voyage-regulation-scenes-c.js — la haute pression fixe, la haute
   pression flottante, le plancher, l'écran du régulateur, le résumé
   (édition « la régulation d'une centrale »)
   ---------------------------------------------------------------------
   MÊME CONTRAT que les autres éditions : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f) } : début / fin des phrases du récit
   donnees/voyage-regulation.js ; maj(t) rend { temp, etat, humeur, diag,
   diag0, calques } ; fonction pure de t). Les gestes sont accrochés au RANG
   des phrases : ajouter une phrase au récit décale tout.
   COURBES ET SCÈNE RACONTENT LA MÊME CHOSE : les scènes qui suivent l'année
   de haute pression calculent w, le rendent (diag / diag0) et lisent
   D.regul(w) (air, fixe, flot) pour le niveau de la colonne, la neige ou le
   soleil, et les ventilateurs. Règles des ventilateurs (brief) :
     · HP fixe : n = air > 25 ? 4 : arrondi(air / 7) ;
     · HP flottante : les quatre tournent tant que air > 9, puis
       n = max(1, arrondi(air / 3)) (au plancher).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760.
   REPÈRE COMMUN DES TROIS PREMIÈRES SCÈNES : le toit (D.vueToit, k 0,64) à
   gauche ; à droite le panneau « haute pression » : un tube d'air extérieur
   et un tube de haute pression sur LA MÊME échelle (Yv), la consigne et son
   plancher posés dessus ; ensuite, l'échelle de la basse pression (en bas) à
   la haute pression (en haut).
   PIÈGE : une aide qui manque s'écrit ici ; aucun état gardé d'une image à
   l'autre (tout est recalculé à chaque appel de maj).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const POLICE = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const BP = "#2f6fb8", HP = D.ORANGE, AIR = "#1e7e8c", PLANCHER = "#7a4fa0", ALARME = "#e74c3c", MARCHE = "#2ecc71", ENCRE = "#10233c", GRIS = "#637285";

  /* ---------- petites aides locales ---------- */
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const txt = (p, x, y, s, taille, fill, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille || 28, fill: fill || ENCRE, "font-family": POLICE, "font-weight": 700 }, at || {}));
  const lignes = (p, x, y, ls, taille, fill, pas, at) => ls.map((l, i) => txt(p, x, y + i * (pas || taille * 1.08), l, taille, fill, at));
  /* un geste visible pendant la phrase k (fondu à l'entrée et à la sortie) ; entre(c, k0, k1, t) : de la phrase k0 à la phrase k1 */
  const phr = (c, k, t) => D.fenetre(t, c.T[k] + 0.1, c.E[k] + 0.35, 0.35);
  const entre = (c, k0, k1, t) => D.fenetre(t, c.T[k0] + 0.1, c.E[k1] + 0.35, 0.35);
  const jusquaFin = (c, k, t) => D.fenetre(t, c.T[k] + 0.1, c.D + 1, 0.4);
  /* une flèche pleine (corps + pointe) de (x1, y1) à (x2, y2) ; double : une pointe à chaque bout */
  function fleche(p, x1, y1, x2, y2, coul, ep, double) {
    ep = ep || 8;
    const g = D.el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), ca = Math.cos(a), sa = Math.sin(a), L = ep * 2.4, W = ep * 1.5;
    const tete = (x, y, s) => {
      const bx = x - s * ca * L, by = y - s * sa * L;
      return "M " + x.toFixed(1) + " " + y.toFixed(1) + " L " + (bx - sa * W).toFixed(1) + " " + (by + ca * W).toFixed(1) + " L " + (bx + sa * W).toFixed(1) + " " + (by - ca * W).toFixed(1) + " Z ";
    };
    const dx = double ? L * 0.8 : 0;
    D.el("line", { x1: x1 + ca * dx, y1: y1 + sa * dx, x2: x2 - ca * L * 0.8, y2: y2 - sa * L * 0.8, stroke: coul, "stroke-width": ep, "stroke-linecap": "butt" }, g);
    D.el("path", { d: tete(x2, y2, 1) + (double ? tete(x1, y1, -1) : ""), fill: coul }, g);
    return g;
  }
  /* un symbole de D.ORGANES posé par son axe */
  function sym(p, nom, x, y, s, rot) {
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe;
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") rotate(" + (rot || 0) + ") scale(" + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, p);
    D.image(g, nom, vx, vy, vl, vh);
    return g;
  }
  /* un compteur électrique (boîte légendée par l'appelant) : le disque tourne ; rend a → angle */
  function compteur(p, x, y) {
    const g = D.el("g", {}, p);
    D.el("rect", { x: x, y: y, width: 150, height: 120, rx: 14, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: x + 18, y: y + 16, width: 114, height: 88, rx: 8, fill: ENCRE }, g);
    D.el("circle", { cx: x + 75, cy: y + 60, r: 34, fill: "#e9edf1", stroke: "#9aa7b5", "stroke-width": 3 }, g);
    const marques = D.el("g", {}, g);
    D.el("path", { d: "M 18 0 L 32 0 M -18 0 L -32 0", stroke: ALARME, "stroke-width": 7, "stroke-linecap": "round" }, marques);
    return a => marques.setAttribute("transform", "translate(" + (x + 75) + " " + (y + 60) + ") rotate(" + (a % 360).toFixed(1) + ")");
  }

  /* ---------- le panneau « haute pression » (à droite du toit) ----------
     deux tubes sur la même échelle (Yv, 0 → 46, en bas → en haut) : l'air du dehors (turquoise) et la haute pression
     (orange). Les repères (consigne, plancher, écart) se posent dessus par Yv. */
  const PX = { xa: 624, wa: 36, xh: 700, wh: 52, haut: 262, bas: 700 };
  const Yv = v => PX.bas - v * (PX.bas - PX.haut) / 46;
  function panneau(p, avecAir) {
    const ga = D.el("g", {}, p), gh = D.el("g", {}, p);
    const tube = (g, x, w, coul) => {
      D.el("rect", { x: x, y: PX.haut, width: w, height: PX.bas - PX.haut, rx: 12, fill: "#fff", stroke: coul, "stroke-width": 4 }, g);
      const f = D.el("rect", { x: x + 6, width: w - 12, rx: 6, fill: coul, opacity: 0.85 }, g);
      return v => { const y = Yv(v); f.setAttribute("y", y.toFixed(1)); f.setAttribute("height", Math.max(0, PX.bas - 6 - y).toFixed(1)); };
    };
    lignes(gh, PX.xh, 212, ["haute", "pression"], 30, HP, 35);
    const hp = tube(gh, PX.xh, PX.wh, HP);
    let air = null;
    if (avecAir) {
      lignes(ga, PX.xa + PX.wa / 2, 214, ["air du", "dehors"], 28, AIR, 32, { "text-anchor": "middle" });
      air = tube(ga, PX.xa, PX.wa, AIR);
    }
    return { ga: ga, gh: gh, hp: hp, air: air };
  }
  /* un repère posé sur le tube de haute pression : trait qui le traverse + nom à droite (à poser avec translate(0 y)) */
  function marque(p, coul, ls, pointille) {
    const g = D.el("g", {}, p);
    D.el("line", { x1: PX.xh - 8, y1: 0, x2: PX.xh + PX.wh + 22, y2: 0, stroke: coul, "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": pointille || "none" }, g);
    lignes(g, PX.xh + PX.wh + 36, 10 - (ls.length - 1) * 15, ls, 28, coul, 30);
    return g;
  }
  const poseY = (g, y) => g.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
  /* l'échelle de la basse pression (pied, y 700) à la haute pression (sommet : maj(yHaut)) */
  function echelle(p) {
    const g = D.el("g", {}, p), XG = 40, XD = 164, pas = 36, n = Math.floor((PX.bas - PX.haut) / pas);
    const rails = [XG, XD].map(x => D.el("rect", { x: x, width: 12, rx: 5, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g));
    const barreaux = [];
    for (let i = 0; i < n; i++) barreaux.push(D.el("rect", { x: XG + 12, width: XD - XG - 12, height: 10, rx: 4, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 1.5 }, g));
    const maj = function (yh) {
      rails.forEach(r => { r.setAttribute("y", yh.toFixed(1)); r.setAttribute("height", (PX.bas - yh).toFixed(1)); });
      barreaux.forEach((b, i) => { const y = PX.bas - 22 - i * pas; b.setAttribute("y", (y - 5).toFixed(1)); b.setAttribute("opacity", y > yh + 10 ? 1 : 0); });
    };
    maj.g = g;
    return maj;
  }
  /* le toit : la molécule le traverse de l'entrée à la sortie (repère local de D.vueToit) */
  const TK = 0.66, TX = 20, TY = 335;
  const CHEMIN = [[60, 150], [130, 150], [756, 150], [756, 285], [810, 285]];
  function surChemin(f) {
    const seg = [];
    let L = 0;
    for (let i = 1; i < CHEMIN.length; i++) { const d = Math.hypot(CHEMIN[i][0] - CHEMIN[i - 1][0], CHEMIN[i][1] - CHEMIN[i - 1][1]); seg.push(d); L += d; }
    let s = D.borne(f, 0, 1) * L;
    for (let i = 0; i < seg.length; i++) {
      if (s <= seg[i] || i === seg.length - 1) { const u = seg[i] ? D.borne(s / seg[i], 0, 1) : 0; return [TX + D.lerp(CHEMIN[i][0], CHEMIN[i + 1][0], u) * TK, TY + D.lerp(CHEMIN[i][1], CHEMIN[i + 1][1], u) * TK]; }
      s -= seg[i];
    }
  }
  const ventFixe = air => [3.5, 10.5, 17.5, 24.5].map(s => air >= s ? 1 : 0);
  const ventFlot = air => air > 9 ? [1, 1, 1, 1] : [1, air >= 4.5 ? 1 : 0, air >= 7.5 ? 1 : 0, 0];

  /* ---------- 10 · la haute pression fixe ---------- */
  S.hpfixe = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const gToit = D.el("g", {}, g), toit = D.vueToit(gToit, TX, TY, TK);
    const pan = panneau(g, true);
    const yFixe = Yv(40);
    const mCons = marque(g, HP, ["consigne", "fixe"]);
    poseY(mCons, yFixe);
    const gFroid = D.el("g", {}, g);
    fleche(gFroid, 310, 264, 310, 420, BP, 20);
    const pFroid = D.pastille(gFroid, 310, 240, "il pourrait condenser plus bas", BP, 30, "middle");
    const pGarde = D.pastille(g, 310, 240, "on garde la HP en haut", HP, 30, "middle");
    // l'échelle (k4) : de la BP, en bas, à la HP, en haut
    const gEch = D.el("g", {}, g), ech = echelle(gEch);
    ech(yFixe);
    D.trait(gEch, 192, yFixe, PX.xh - 8, yFixe, HP); D.trait(gEch, 192, PX.bas, PX.xh - 8, PX.bas, BP);
    txt(gEch, 216, yFixe - 14, "haute pression", 30, HP); txt(gEch, 216, PX.bas - 16, "basse pression", 30, BP);
    // l'écart et le compteur (k5)
    const gEcart = D.el("g", {}, g);
    fleche(gEcart, 560, yFixe + 8, 560, PX.bas - 8, ENCRE, 9, true);
    txt(gEcart, 536, (yFixe + PX.bas) / 2 + 12, "écart", 36, ENCRE, { "text-anchor": "end" });
    const tourne = compteur(gEcart, 250, 440);
    txt(gEcart, 325, 604, "compteur", 30, ENCRE, { "text-anchor": "middle" });
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      const w = D.courbe([[T[0], 60], [E[0], 64], [T[1], 64], [E[1], 71], [T[2], 71], [E[3], 79]], t, true);
      const r = D.regul(w, 60), air = r.air;
      toit.maj({ t: t, vent: ventFixe(air), air: air / 32 });
      pan.hp(r.fixe); pan.air(air);
      const aToit = 1 - D.lisse((t - (E[3] + 0.1)) / 0.7);
      opa(gToit, aToit); opa(pan.ga, aToit);
      opa(mCons, D.lisse((t - (T[0] + 0.5)) / 0.8));
      opa(gFroid, phr(c, 2, t)); opa(pGarde, phr(c, 3, t));
      opa(gEch, D.lisse((t - (T[4] - 0.1)) / 0.6));
      opa(gEcart, jusquaFin(c, 5, t));
      tourne(t * 900);
      // la molécule : elle traverse le condenseur (k0 à k3), puis grimpe l'échelle (k4)
      const f = D.borne((t - (T[0] + 0.6)) / (E[3] - T[0] - 1), 0, 1);
      const [px0, py0] = surChemin(f);
      const vers = D.lisse((t - (E[3] + 0.1)) / (T[4] + 0.5 - E[3] - 0.1)), grimpe = D.lisse((t - (T[4] + 0.6)) / (E[4] - T[4] - 1));
      const yHaut = yFixe + 28, yEch = D.lerp(PX.bas - 30, yHaut, grimpe);
      let x = D.lerp(px0, 108, vers), y = D.lerp(py0, PX.bas - 30, vers);
      if (t > T[4] + 0.6) { x = 108 + Math.sin(t * 6) * 3; y = yEch + Math.sin(t * 9) * 2.5; }
      const s = D.lerp(0.55, 0.95, vers);
      const humeur = t < T[1] ? "sourire" : t < T[2] ? "chaud" : t < T[3] ? "sourire" : t < T[4] ? "triste" : "chaud";
      const etat = t < T[4] ? (f > 0.7 && vers < 0.5 ? "liquide" : vers > 0.5 ? "vapeur" : "vapeur") : "vapeur";
      const temp = t < T[4] ? D.lerp(0.6, 0.45, f) : D.lerp(0.15, 0.62, grimpe);
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
      return { temp: temp, etat: etat, humeur: humeur, diag: w, diag0: 60 };
    };
  };

  /* ---------- 11 · la haute pression flottante ---------- */
  const MOIS = ["janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"];
  S.hpflottante = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const gToit = D.el("g", {}, g), toit = D.vueToit(gToit, TX, TY, TK);
    const pan = panneau(g, true);
    const mCons = marque(g, HP, ["consigne"]);
    // k1 : la sonde d'air extérieur, entourée
    const rx = 40 * TK, ry = 125 * TK, cx = TX + 841 * TK, cy = TY + 160 * TK;
    const gSonde = D.el("g", {}, g);
    const anneau = D.el("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, fill: "none", stroke: HP, "stroke-width": 5 }, gSonde);
    D.trait(gSonde, cx, 262, cx, cy - ry - 6, GRIS);
    txt(gSonde, cx, 250, "sonde d'air extérieur", 30, HP, { "text-anchor": "end" });
    // la règle d'écart : de l'air du dehors à la consigne, « + un petit écart »
    const gReg = D.el("g", {}, g), xr = PX.xh + PX.wh + 10;
    const rLigne = D.el("line", { x1: xr, x2: xr, stroke: ENCRE, "stroke-width": 4, "stroke-linecap": "round" }, gReg);
    const rAir = D.el("line", { x1: PX.xa + PX.wa, x2: PX.xh + PX.wh + 22, stroke: AIR, "stroke-width": 4, "stroke-linecap": "round" }, gReg);
    const rTxt = D.el("g", {}, gReg);
    lignes(rTxt, PX.xh + PX.wh + 36, -5, ["+ un petit", "écart"], 28, ENCRE, 30);
    // k3 à k5 : l'échelle, plus courte que celle de la haute pression fixe
    const gEch = D.el("g", {}, g), gFant = D.el("g", { opacity: 0.25 }, gEch);
    echelle(gFant)(Yv(40));
    const ech = echelle(gEch);
    const lHP = D.trait(gEch, 192, 0, PX.xh - 8, 0, HP), tHP = txt(gEch, 216, 0, "haute pression", 30, HP);
    D.trait(gEch, 192, PX.bas, PX.xh - 8, PX.bas, BP); txt(gEch, 216, PX.bas - 16, "basse pression", 30, BP);
    const gGain = D.el("g", {}, g);
    fleche(gGain, 250, 600, 650, 600, HP, 20);
    txt(gGain, 450, 566, "énergie gagnée", 34, HP, { "text-anchor": "middle" });
    const pPct = D.pastille(g, 450, 612, "2 à 3 % par degré (repère)", HP, 30, "middle");
    // k6 : le calendrier qui se remplit d'économies
    const gCal = D.el("g", {}, g), CX0 = 196, CY0 = 292, CL = 112, CH = 104, PAS = 8;
    txt(gCal, CX0 + (4 * CL + 3 * PAS) / 2, 252, "économies sur l'année", 32, HP, { "text-anchor": "middle" });
    const cases = MOIS.map((m, i) => {
      const x = CX0 + (i % 4) * (CL + PAS), y = CY0 + Math.floor(i / 4) * (CH + PAS), r = D.regul(60 + (i + 0.5) * 20 / 12, 60);
      D.el("rect", { x: x, y: y, width: CL, height: CH, rx: 10, fill: "#fff", stroke: "rgba(27,58,99,.35)", "stroke-width": 3 }, gCal);
      txt(gCal, x + 12, y + 32, m, 28, ENCRE);
      const barre = D.el("rect", { x: x + 12, width: CL - 24, rx: 5, fill: HP, opacity: 0.9 }, gCal);
      return { barre: barre, bas: y + CH - 10, h: Math.max(3, (r.fixe - r.flot) / 16 * 50) };
    });
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      const w = D.courbe([[T[0], 60], [E[1], 69.5], [T[2], 69.5], [E[2], 79]], t, true);
      const r = D.regul(w, 60), air = r.air;
      toit.maj({ t: t, vent: ventFlot(air), air: air / 32 });
      pan.hp(r.flot); pan.air(air);
      const aToit = 1 - D.lisse((t - (E[2] + 0.1)) / 0.7);
      opa(gToit, aToit); opa(pan.ga, aToit);
      const yc = Yv(r.flot), ya = Yv(air);
      poseY(mCons, yc);
      // la sonde et la règle d'écart ; la règle disparaît quand la consigne est au plancher (air + écart < plancher)
      opa(gSonde, D.fenetre(t, T[1] + 0.1, T[1] + (E[1] - T[1]) * 0.62, 0.4));
      anneau.setAttribute("transform", "translate(" + cx + " " + cy + ") scale(" + (1 + 0.05 * Math.sin(t * 5)).toFixed(3) + ") translate(" + (-cx) + " " + (-cy) + ")");
      const reg = D.lisse((t - (T[1] + (E[1] - T[1]) * 0.5)) / 0.6) * D.lisse((air - 9.2) / 1.5) * aToit;
      opa(gReg, reg);
      rLigne.setAttribute("y1", yc.toFixed(1)); rLigne.setAttribute("y2", ya.toFixed(1));
      rAir.setAttribute("y1", ya.toFixed(1)); rAir.setAttribute("y2", ya.toFixed(1));
      rTxt.setAttribute("transform", "translate(0 " + ((yc + ya) / 2).toFixed(1) + ")");
      // l'échelle
      const yHP = Yv(r.flot);
      ech(yHP); lHP.setAttribute("y1", yHP.toFixed(1)); lHP.setAttribute("y2", yHP.toFixed(1)); tHP.setAttribute("y", (yHP - 14).toFixed(1));
      opa(gEch, entre(c, 3, 5, t));
      opa(gGain, phr(c, 4, t)); opa(pPct, phr(c, 5, t));
      opa(gCal, jusquaFin(c, 6, t));
      cases.forEach((k, i) => {
        const f = D.lisse((t - (T[6] + 0.2 + i * 0.22)) / 0.4), h = k.h * f;
        k.barre.setAttribute("y", (k.bas - h).toFixed(1)); k.barre.setAttribute("height", Math.max(0, h).toFixed(1));
      });
      // la molécule : le condenseur (k0 à k2), puis l'échelle (k3), puis le calendrier (k6)
      const f = D.borne((t - (T[0] + 0.6)) / (E[2] - T[0] - 1), 0, 1);
      const [px0, py0] = surChemin(f);
      const vers = D.lisse((t - (E[2] + 0.1)) / (T[3] + 0.5 - E[2] - 0.1)), grimpe = D.lisse((t - (T[3] + 0.6)) / (E[3] - T[3] - 1)), cal = D.lisse((t - (T[6] - 0.1)) / 0.9);
      const yTop = yHP + 28;
      let x = D.lerp(px0, 108, vers), y = D.lerp(py0, PX.bas - 30, vers);
      if (t > T[3] + 0.6) { x = 108 + Math.sin(t * 6) * 3 * (1 - cal); y = D.lerp(PX.bas - 30, yTop, grimpe) + Math.sin(t * 9) * 2.5 * (1 - grimpe * 0); }
      x = D.lerp(x, 96, cal); y = D.lerp(y, 440, cal);
      const s = D.lerp(D.lerp(0.55, 0.95, vers), 1.2, cal);
      const etat = t < T[3] ? (f > 0.7 && vers < 0.5 ? "liquide" : "vapeur") : "vapeur";
      const temp = t < T[3] ? D.lerp(0.6, 0.45, f) : D.lerp(0.15, 0.5, grimpe);
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: "sourire", regard: [1, 0] });
      return { temp: temp, etat: etat, humeur: "sourire", diag: w, diag0: 60 };
    };
  };

  /* ---------- 12 · le plancher ---------- */
  const VERT_TXT = "#1e7e54";
  S.plancher = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const gToit = D.el("g", {}, g), toit = D.vueToit(gToit, TX, TY, TK);
    const gPan = D.el("g", {}, g), pan = panneau(gPan, true);
    const yPl = Yv(24), yBas2 = Yv(14), ySec = Yv(45);
    const mPlTrait = marque(gPan, PLANCHER, []); poseY(mPlTrait, yPl);
    const mPl = D.el("g", {}, gPan); lignes(mPl, PX.xh + PX.wh + 36, yPl + 10, ["plancher"], 28, PLANCHER, 30);
    const mPl2 = marque(gPan, PLANCHER, [], "10 7"); poseY(mPl2, yBas2);
    const mSec = marque(gPan, ALARME, [], "7 6"); poseY(mSec, ySec);
    // k1 : la coupe du détendeur, entre « entrée » et « sortie », et l'évaporateur à côté
    const gDet = D.el("g", {}, g), PY = 520;
    const tubeJauge = (x, w, coul) => {
      D.el("rect", { x: x, y: 270, width: w, height: PY - 270, rx: 10, fill: "#fff", stroke: coul, "stroke-width": 4 }, gDet);
      const f = D.el("rect", { x: x + 6, width: w - 12, rx: 5, fill: coul, opacity: 0.85 }, gDet);
      return v => { const h = v * (PY - 270 - 10), y = PY - h; f.setAttribute("y", y.toFixed(1)); f.setAttribute("height", Math.max(0, h).toFixed(1)); };
    };
    const jEntree = tubeJauge(90, 50, HP), jSortie = tubeJauge(520, 50, BP);
    D.el("rect", { x: 40, y: PY - 8, width: 222, height: 16, fill: "url(#vm-cuivre)" }, gDet);
    D.el("rect", { x: 398, y: PY - 8, width: 242, height: 16, fill: "url(#vm-cuivre)" }, gDet);
    sym(gDet, "detendeur", 330, PY, 6.5);
    txt(gDet, 115, 250, "entrée", 32, HP, { "text-anchor": "middle" }); txt(gDet, 545, 250, "sortie", 32, BP, { "text-anchor": "middle" });
    fleche(gDet, 150, 488, 225, 488, HP, 10); fleche(gDet, 425, 488, 500, 488, BP, 10);
    D.el("rect", { x: 640, y: 452, width: 300, height: 14, fill: "url(#vm-cuivre)" }, gDet); D.el("rect", { x: 640, y: 574, width: 300, height: 14, fill: "url(#vm-cuivre)" }, gDet);
    D.el("rect", { x: 640, y: 466, width: 300, height: 108, fill: "#f4f8fc" }, gDet);
    const gNappe = D.el("g", {}, gDet), mil = D.heroine(gDet, { r: 30 });
    let niv = 0.8;
    const liq = D.liquide(gNappe, { x0: 640, x1: 940, yh: 466, yb: 574, niveau: () => niv, couleur: () => D.couleur(0.08, false), pas: 20 });
    const gouttes = D.bulles(gNappe, 7, 31, true);
    txt(gDet, 790, 632, "évaporateur", 32, ENCRE, { "text-anchor": "middle" });
    const pSuffit = D.pastille(gDet, 330, 340, "écart suffisant", BP, 30, "middle");
    const pPetit = D.pastille(gDet, 330, 340, "écart trop petit", ALARME, 30, "middle");
    const pPeu = D.pastille(gDet, 790, 420, "peu de liquide", ALARME, 30, "middle");
    // k3 : deux détendeurs côte à côte, deux planchers
    const gCartes = D.el("g", {}, g);
    [[380, "detendeur", "thermostatique", "plancher haut", 455, 2.3], [525, "detendeurElec", "électronique", "plancher plus bas", 600, 2.3]].forEach(([y, nom, nm, desc, ay, k]) => {
      D.el("rect", { x: 45, y: y, width: 605, height: 125, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.35)", "stroke-width": 3 }, gCartes);
      sym(gCartes, nom, 140, ay, k);
      txt(gCartes, 235, y + 55, nm, 34, ENCRE); txt(gCartes, 235, y + 96, desc, 30, PLANCHER);
    });
    D.trait(gCartes, 650, 443, 692, yPl, PLANCHER); D.trait(gCartes, 650, 588, 692, yBas2, PLANCHER);
    const gGagne = D.el("g", {}, g);
    fleche(gGagne, 784, yPl + 18, 784, yBas2 - 8, MARCHE, 9);
    lignes(gGagne, 806, (yPl + yBas2) / 2 + 3, ["on gagne", "encore"], 28, VERT_TXT, 30);
    // k4 : la documentation du constructeur
    const gLivre = D.el("g", {}, g);
    D.el("rect", { x: 176, y: 346, width: 380, height: 280, rx: 8, fill: "#fffdf8", stroke: "#9aa7b5", "stroke-width": 3 }, gLivre);
    D.el("rect", { x: 160, y: 330, width: 380, height: 280, rx: 10, fill: "url(#vm-marine)", stroke: ENCRE, "stroke-width": 3 }, gLivre);
    D.el("rect", { x: 160, y: 330, width: 40, height: 280, rx: 10, fill: "#0c1d33" }, gLivre);
    lignes(gLivre, 370, 440, ["documentation", "du constructeur"], 38, "#fff", 50, { "text-anchor": "middle" });
    D.el("line", { x1: 235, y1: 530, x2: 505, y2: 530, stroke: "#e8914a", "stroke-width": 6, "stroke-linecap": "round" }, gLivre);
    const pJuge = D.pastille(g, 350, 678, "jamais au jugé", ENCRE, 32, "middle");
    // k5 : le soleil, la colonne monte, le pressostat HP de sécurité veille
    const gSec = D.el("g", {}, g);
    D.trait(gSec, 580, 213, PX.xh - 8, ySec, ALARME);
    D.el("rect", { x: 330, y: 168, width: 250, height: 90, rx: 14, fill: "#fff", stroke: ALARME, "stroke-width": 4 }, gSec);
    lignes(gSec, 455, 206, ["pressostat HP", "de sécurité"], 30, ENCRE, 36, { "text-anchor": "middle" });
    const veille = D.el("circle", { cx: 560, cy: 188, r: 9, fill: MARCHE, stroke: ENCRE, "stroke-width": 2 }, gSec);
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      // le temps des courbes : avant k2 le début de l'année ; k2-k3 toute l'année ; k5 on revoit l'été
      let w = D.temps(c, t, 60, 80, 2, 3);
      if (t > c.T[5] - 0.2) w = D.temps(c, t, 68, 70.5, 5, 5);
      const r = D.regul(w, 60), air = r.air;
      // la colonne : k0 elle descend et bute sur le trait violet, ensuite elle suit la consigne flottante
      let hp = r.flot;
      if (t < T[2]) hp = D.lerp(24, 35, 1 - D.lisse((t - (T[0] + 0.5)) / (E[0] - T[0] - 0.9)));
      pan.hp(hp); pan.air(air);
      toit.maj({ t: t, vent: ventFlot(air), air: air / 32 });
      const sans = 1 - D.fenetre(t, T[1] - 0.3, E[1] + 0.35, 0.4); // le panneau s'efface pendant la coupe du détendeur
      const ouToit = Math.max(D.fenetre(t, -1, E[0] + 0.35, 0.5), D.fenetre(t, T[2] - 0.4, T[3], 0.5), D.fenetre(t, T[5] - 0.4, c.D + 1, 0.5));
      opa(gToit, ouToit * sans); opa(gPan, sans);
      opa(pan.ga, D.fenetre(t, -1, T[3], 0.4));
      opa(mPl, D.lisse((t - (T[2] + 0.2)) / 0.6));
      opa(mPl2, D.lisse((t - A(3, 0.45)) / 0.5) * (1 - D.lisse((t - (E[3] + 0.2)) / 0.5)));
      opa(gGagne, D.lisse((t - A(3, 0.55)) / 0.5) * (1 - D.lisse((t - (E[3] + 0.2)) / 0.5)));
      opa(mSec, D.lisse((t - (T[5] + 0.1)) / 0.6));
      // k1 : l'écart se réduit, l'évaporateur ne reçoit plus que quelques gouttes
      const ecart = D.courbe([[T[1], 0.95], [T[1] + 2.4, 0.9], [E[1] - 1, 0.1], [E[1] + 1, 0.08]], t);
      jEntree(0.3 + 0.65 * ecart); jSortie(0.3);
      niv = 0.03 + 0.8 * Math.pow(ecart, 1.5);
      opa(gDet, D.fenetre(t, T[1] + 0.1, E[1] + 0.35, 0.4));
      liq.maj(t);
      gouttes(t, q => [662 + q * 260, 472, liq.surface(662 + q * 260, t) + 2, q < ecart * 1.1 - 0.05 ? 1 : 0, D.couleur(0.08, false)]);
      opa(pSuffit, D.fenetre(t, T[1] + 0.2, T[1] + 2.9, 0.4));
      opa(pPetit, D.fenetre(t, T[1] + 3.6, E[1] + 0.3, 0.4));
      opa(pPeu, D.fenetre(t, A(1, 0.62), E[1] + 0.3, 0.4));
      const triste = ecart < 0.45;
      mil({ x: 790, y: Math.min(528, liq.surface(790, t) + 8), s: 0.8, t: t, temp: 0.08, etat: "liquide", humeur: triste ? "triste" : "sourire", regard: [1, 0] });
      opa(gCartes, entre(c, 3, 3, t)); opa(gLivre, phr(c, 4, t)); opa(pJuge, phr(c, 4, t)); opa(gSec, jusquaFin(c, 5, t));
      veille.setAttribute("opacity", (0.45 + 0.55 * Math.max(0, Math.sin(t * 3))).toFixed(2));
      // la molécule
      let x = 0, y = 0, sc = 0.55, op = 1, etat = "vapeur", temp = 0.6, humeur = "sourire";
      if (t < T[1]) { [x, y] = surChemin(0.05 + 0.4 * D.borne((t - T[0]) / (E[0] - T[0]), 0, 1)); op = D.fenetre(t, -1, E[0] + 0.1, 0.35); humeur = t > E[0] - 1.2 ? "surprise" : "sourire"; }
      else if (t < T[2]) { x = 800; y = 540; op = 0; etat = "liquide"; temp = 0.08; humeur = triste ? "triste" : "sourire"; }
      else if (t < T[4]) { [x, y] = surChemin(0.2 + 0.7 * D.borne((t - T[2]) / (E[2] - T[2]), 0, 1)); op = D.fenetre(t, T[2], E[2] + 0.1, 0.35); }
      else if (t < T[5]) { x = 96; y = 520; sc = 1.1; op = D.fenetre(t, T[4] + 0.2, E[4] + 0.2, 0.4); etat = "liquide"; temp = 0.1; }
      else { [x, y] = surChemin(0.5 + 0.4 * D.borne((t - T[5]) / (E[5] - T[5]), 0, 1)); op = D.fenetre(t, T[5], c.D + 1, 0.4); humeur = "chaud"; temp = 0.6; }
      mila({ x: x, y: y, s: sc, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0], op: op });
      const dia = t < T[2] ? { diag: 60, diag0: 60 } : { diag: w, diag0: 60 };
      return Object.assign({ temp: t >= T[1] && t < T[2] ? 0.08 : temp, etat: t >= T[1] && t < T[2] ? "liquide" : etat, humeur: humeur }, dia);
    };
  };

  /* ---------- 13 · l'écran du régulateur ---------- */
  let nclip = 0;
  S.ecran = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const DIAG = window.VOYAGE_DIAGRAMME.episodes[1], CLAIR = "#c8d3df", PIEDS = "Consolas, Courier New, monospace";
    // le décompte des démarrages et des heures de marche, échantillon par échantillon (même source que les courbes)
    const cumDem = [0], cumOn = [0, 1, 2, 3].map(() => [0]);
    DIAG.ech.forEach((s, i) => {
      let d = cumDem[i];
      [0, 1, 2, 3].forEach(n => {
        const on = !!(s[1] & (1 << n)), avant = i > 0 && !!(DIAG.ech[i - 1][1] & (1 << n));
        if (on && !avant && i > 0) d++;
        cumOn[n].push(cumOn[n][i] + (on ? 1 : 0));
      });
      cumDem.push(d);
    });
    const SX = 45, SY = 228;
    // k0 : l'armoire s'ouvre, puis on entre dans son écran (rien au-delà de la scène : découpe)
    const idc = "vrc-ecran-" + (++nclip);
    D.el("rect", { x: 20, y: 150, width: 945, height: 610 }, D.el("clipPath", { id: idc }, g));
    const gArm = D.el("g", { "clip-path": "url(#" + idc + ")" }, g), gA = D.el("g", {}, gArm);
    const arm = D.armoire(gA, 0, 0, 1);
    const gArmTxt = D.el("g", {}, g);
    txt(gArmTxt, 700, 352, "armoire", 34, ENCRE); txt(gArmTxt, 700, 392, "électrique", 34, ENCRE);
    D.trait(gArmTxt, 690, 362, 672, 372, GRIS);
    // le grand écran
    const gEcr = D.el("g", { transform: "translate(" + SX + " " + SY + ")" }, g);
    D.el("rect", { x: -10, y: -10, width: 900, height: 540, rx: 30, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, gEcr);
    D.el("rect", { x: 0, y: 0, width: 880, height: 520, rx: 20, fill: ENCRE }, gEcr);
    txt(gEcr, 28, 46, "régulateur de centrale", 28, "#9fe3b8");
    const lampe = D.el("circle", { cx: 840, cy: 34, r: 13, fill: ALARME }, gEcr);
    const BX = 170, BL = 360, rangs = [[95, "BP", 34, "#9fbfe0", "#5b9be0"], [145, "consigne", 28, CLAIR, "rgba(200,211,223,.55)"], [215, "HP", 34, "#f3a37a", "#e2662c"], [265, "consigne", 28, CLAIR, "rgba(200,211,223,.55)"]];
    const barres = rangs.map(([cy, nom, taille, coul, rempl]) => {
      txt(gEcr, 28, cy + (taille > 30 ? 12 : 10), nom, taille, coul);
      D.el("rect", { x: BX, y: cy - 15, width: BL, height: 30, rx: 8, fill: "#1c3550", stroke: "#3b5878", "stroke-width": 2 }, gEcr);
      return D.el("rect", { x: BX, y: cy - 15, height: 30, rx: 8, fill: rempl }, gEcr);
    });
    D.el("rect", { x: BX + 0.275 * BL, y: 80, width: 0.5 * BL, height: 30, fill: "rgba(95,155,224,.28)" }, gEcr);
    [0.275, 0.775].forEach(f => D.el("line", { x1: BX + f * BL, y1: 76, x2: BX + f * BL, y2: 114, stroke: "#9fe3b8", "stroke-width": 2.5 }, gEcr));
    const seuil = txt(gEcr, BX + 0.775 * BL, 68, "seuil haut", 28, "#9fe3b8", { "text-anchor": "middle" });
    const boites = [0, 1, 2, 3].map(i => {
      const x = 28 + i * 130;
      const cadre = D.el("rect", { x: x, y: 326, width: 118, height: 164, rx: 14, "stroke-width": 4 }, gEcr);
      D.el("rect", { x: x + 9, y: 342, width: 100, height: 80, rx: 10, fill: "#fff" }, gEcr);
      D.image(gEcr, "compresseur", x + 14, 350, 90, 64);
      txt(gEcr, x + 59, 466, "C" + (i + 1), 32, "#fff", { "text-anchor": "middle" });
      return cadre;
    });
    txt(gEcr, 580, 86, "heures", 30, "#f3c98a");
    const hBarres = [0, 1, 2, 3].map(i => {
      const b = D.el("rect", { x: 580 + i * 70, width: 48, rx: 6, fill: "#e8914a" }, gEcr);
      txt(gEcr, 604 + i * 70, 332, "C" + (i + 1), 28, "#fff", { "text-anchor": "middle" });
      return b;
    });
    D.el("line", { x1: 570, y1: 296, x2: 850, y2: 296, stroke: "#9aa7b5", "stroke-width": 3 }, gEcr);
    D.el("rect", { x: 570, y: 372, width: 292, height: 120, rx: 14, fill: "#0c1d33", stroke: "#56636f", "stroke-width": 3 }, gEcr);
    txt(gEcr, 588, 410, "démarrages", 28, CLAIR);
    const chiffres = D.texte(gEcr, 588, 474, "0000", { "font-size": 64, "font-weight": 700, fill: "#9fe3b8", "font-family": PIEDS });
    const surlignage = [[12, 62, 538, 234], [562, 56, 292, 300], [560, 364, 308, 136]].map(([x, y, l, h]) => D.el("rect", { x: x, y: y, width: l, height: h, rx: 16, fill: "none", stroke: "#ff9f43", "stroke-width": 6 }, gEcr));
    const cadreRouge = D.el("rect", { x: -10, y: -10, width: 900, height: 540, rx: 30, fill: "none", stroke: ALARME, "stroke-width": 12 }, gEcr);
    const pProches = D.pastille(g, 485, 195, "elles restent proches", D.BLEU, 30, "middle");
    const pZone = D.pastille(g, 330, 195, "zone neutre ?", HP, 30, "middle");
    const pTempo = D.pastille(g, 640, 195, "temporisations ?", HP, 30, "middle");
    const pSuit = D.pastille(g, 485, 195, "la centrale ne suit plus", ALARME, 30, "middle");
    // k5 : le téléphone qui sonne
    const gTel = D.el("g", {}, g), arm2 = D.armoire(gTel, 50, 200, 1.3);
    D.el("path", { d: "M 446 353 H 596", stroke: ALARME, "stroke-width": 4, "stroke-dasharray": "2 9", "stroke-linecap": "round", fill: "none" }, gTel);
    const signal = D.el("circle", { r: 10, fill: ALARME, cy: 353 }, gTel);
    const tel = D.el("g", {}, gTel);
    D.el("rect", { x: -60, y: -120, width: 120, height: 240, rx: 22, fill: ENCRE, stroke: "#56636f", "stroke-width": 4 }, tel);
    D.el("rect", { x: -48, y: -96, width: 96, height: 170, rx: 8, fill: "#e9edf1" }, tel);
    D.el("circle", { cx: 0, cy: 96, r: 13, fill: "#56636f" }, tel);
    D.el("path", { d: "M -20 -30 q 20 -22 40 0 M -30 -52 q 30 -34 60 0", fill: "none", stroke: ALARME, "stroke-width": 6, "stroke-linecap": "round" }, tel);
    D.el("circle", { cx: 0, cy: 0, r: 22, fill: ALARME }, tel);
    D.el("path", { d: "M -9 -3 q 9 -12 18 0 v 10 h -18 Z", fill: "#fff" }, tel);
    const ondes = D.el("g", {}, gTel);
    [0, 1].forEach(i => { D.el("path", { d: "M " + (66 + i * 22) + " -40 q 18 40 0 80", fill: "none", stroke: ALARME, "stroke-width": 6, "stroke-linecap": "round", opacity: 0.8 - i * 0.3 }, ondes); D.el("path", { d: "M " + (-66 - i * 22) + " -40 q -18 40 0 80", fill: "none", stroke: ALARME, "stroke-width": 6, "stroke-linecap": "round", opacity: 0.8 - i * 0.3 }, ondes); });
    txt(gTel, 735, 606, "technicien d'astreinte", 32, ENCRE, { "text-anchor": "middle" });
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      const w = D.temps(c, t, 10, 40, 1, 4);
      const r = D.regul(w), idx = Math.round((w - 10) * 10);
      const a4 = D.lisse((t - (T[4] + 0.3)) / 0.8); // k4 : la centrale ne suit plus (compresseurs tous en marche, BP trop haute)
      const marche = r.marche.map(m => m || a4 > 0.5), bp = D.lerp(r.valeur, 1.75, a4);
      // k0 : l'armoire grandit jusqu'à l'écran
      const zoom = D.lisse((t - (T[0] + 1.6)) / (E[0] - T[0] - 2.3)), s = D.lerp(1.3, 3.5, zoom);
      const px = D.lerp(480, SX + 440, zoom), py = D.lerp(450 - 120 * 1.3, SY + 260, zoom);
      gA.setAttribute("transform", "translate(" + (px - 150 * s).toFixed(1) + " " + (py - 90 * s).toFixed(1) + ") scale(" + s.toFixed(3) + ")");
      arm.maj({ t: t, marche: marche, alarme: false });
      const parti = D.lisse((t - (E[0] - 0.85)) / 0.55);
      opa(gArm, D.lisse(t / 0.6) * (1 - parti));
      opa(gArmTxt, D.lisse(t / 0.6) * (1 - D.lisse((t - (T[0] + 1.3)) / 0.5)));
      // le grand écran
      const ecr = D.lisse((t - (E[0] - 0.4)) / 0.6) * (1 - D.lisse((t - (T[5] - 0.2)) / 0.5));
      opa(gEcr, ecr);
      const fr = v => (BL * D.borne(v, 0, 1)).toFixed(1);
      barres[0].setAttribute("width", fr((bp + 2.1) / 4)); barres[1].setAttribute("width", fr(2.1 / 4));
      const hp = 0.58 + 0.1 * D.courbe([[10, -0.5], [17, 0], [25, 1], [33, 0.2], [40, -0.4]], w);
      barres[2].setAttribute("width", fr(hp)); barres[3].setAttribute("width", fr(0.58));
      boites.forEach((b, i) => { b.setAttribute("fill", marche[i] ? "rgba(46,204,113,.30)" : "#1c3550"); b.setAttribute("stroke", marche[i] ? MARCHE : "#56636f"); });
      [0, 1, 2, 3].forEach(i => {
        const h = (DIAG.heures.debut[i] + cumOn[i][D.borne(idx, 0, cumOn[i].length - 1)] * 0.1 * 16 / 30) / 30 * 190;
        hBarres[i].setAttribute("y", (296 - h).toFixed(1)); hBarres[i].setAttribute("height", h.toFixed(1));
      });
      const course = D.lisse((t - (T[3] + 0.3)) / (E[3] - T[3] - 0.3));
      const n = 276 + cumDem[D.borne(idx, 0, cumDem.length - 1)] + Math.round(course * 320) + (t > E[3] ? Math.floor((t - E[3]) * 9) : 0);
      chiffres.textContent = String(n).padStart(4, "0");
      chiffres.setAttribute("fill", t > T[3] + 0.3 ? "#ff6b6b" : "#9fe3b8");
      const puls = 0.65 + 0.35 * Math.sin(t * 6);
      surlignage[0].setAttribute("opacity", (phr(c, 1, t) * puls).toFixed(2));
      surlignage[1].setAttribute("opacity", (phr(c, 2, t) * puls).toFixed(2));
      surlignage[2].setAttribute("opacity", (phr(c, 3, t) * puls).toFixed(2));
      opa(seuil, D.lisse((t - (T[4] + 0.3)) / 0.5));
      const clignote = a4 * (0.5 + 0.5 * Math.sin(t * 7));
      opa(cadreRouge, clignote); lampe.setAttribute("opacity", (a4 > 0.2 ? 0.35 + 0.65 * Math.max(0, Math.sin(t * 7)) : 0.25).toFixed(2));
      opa(pProches, phr(c, 2, t)); opa(pZone, phr(c, 3, t)); opa(pTempo, D.fenetre(t, A(3, 0.3), E[3] + 0.35, 0.35)); opa(pSuit, phr(c, 4, t));
      // k5 : le téléphone sonne, le technicien d'astreinte est prévenu
      const tl = jusquaFin(c, 5, t);
      opa(gTel, tl);
      arm2.maj({ t: t, marche: [true, true, true, true], alarme: true });
      tel.setAttribute("transform", "translate(735 440) rotate(" + (Math.sin(t * 28) * 5).toFixed(1) + ")");
      ondes.setAttribute("transform", "translate(735 440)"); opa(ondes, 0.4 + 0.6 * Math.max(0, Math.sin(t * 9)));
      signal.setAttribute("cx", (446 + 150 * D.frac(t * 0.7)).toFixed(1));
      // la molécule : elle regarde l'armoire (k0), puis le téléphone (k5)
      const humeur = t > T[4] && t < T[5] ? "surprise" : "sourire";
      const op = Math.max(D.fenetre(t, -1, T[0] + 1.9, 0.5), D.fenetre(t, T[5] + 0.2, c.D + 1, 0.5));
      const x = t < T[5] ? 170 : 520, y = t < T[5] ? 470 : 540;
      mila({ x: x, y: y, s: 1.1, t: t, temp: 0.12, etat: "liquide", humeur: t >= T[5] ? "surprise" : "sourire", regard: [1, 0], op: op });
      return { temp: 0.12, etat: "liquide", humeur: humeur, diag: w, diag0: 10 };
    };
  };

  /* ---------- le résumé : six vignettes qui s'allument une à une (phrases 1 à 6) ---------- */
  S.resume = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const CW = 293, CH = 244, COLS = [30, 348, 666], LIGNES = [236, 500];
    const cartes = [0, 1, 2, 3, 4, 5].map(i => {
      const gc = D.el("g", { transform: "translate(" + COLS[i % 3] + " " + LIGNES[Math.floor(i / 3)] + ")" }, g);
      const cadre = D.el("rect", { x: 0, y: 0, width: CW, height: CH, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, gc);
      return { gc: gc, cadre: cadre, dedans: D.el("g", {}, gc) };
    });
    const legende = (i, ls, coul) => ls.forEach((l, j) => txt(cartes[i].dedans, CW / 2, (ls.length > 1 ? 196 : 224) + j * 32, l, 28, (coul && coul[j]) || ENCRE, { "text-anchor": "middle" }));
    // 1 · le collecteur : la vapeur qui arrive, celle qui part
    const v1 = cartes[0].dedans;
    D.tube(v1, 72, 72, 200, 44, "noir", false, "#eef5fc");
    const mols1 = [0, 1, 2, 3, 4].map(() => D.mol(v1));
    fleche(v1, 6, 94, 74, 94, BP, 14);
    fleche(v1, 150, 74, 150, 20, HP, 12); fleche(v1, 226, 74, 226, 20, HP, 12);
    legende(0, ["vapeur qui arrive,", "vapeur qui part"]);
    // 2 · la colonne, la zone neutre, « + 1 » / « − 1 »
    const v2 = cartes[1].dedans;
    D.el("rect", { x: 30, y: 18, width: 42, height: 150, rx: 12, fill: "#fff", stroke: BP, "stroke-width": 4 }, v2);
    D.el("rect", { x: 36, y: 76, width: 30, height: 44, fill: "rgba(47,111,184,.22)" }, v2);
    D.trait(v2, 24, 76, 96, 76, BP); D.trait(v2, 24, 120, 96, 120, BP);
    const niveau = D.el("circle", { cx: 51, r: 10, fill: HP, stroke: "#fff", "stroke-width": 3 }, v2);
    fleche(v2, 112, 68, 112, 24, MARCHE, 9); txt(v2, 136, 56, "+ 1", 36, VERT_TXT);
    fleche(v2, 112, 128, 112, 166, ALARME, 9); txt(v2, 136, 158, "− 1", 36, ALARME);
    legende(1, ["zone neutre"]);
    // 3 · l'horloge et les flèches qui tournent : chacun son tour
    const v3 = cartes[2].dedans;
    D.el("circle", { cx: 146, cy: 92, r: 46, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, v3);
    const secteur = D.el("path", { fill: "rgba(201,69,26,.75)" }, v3);
    const tours = D.el("g", { transform: "translate(146 92)" }, v3);
    [0, 180].forEach(a => {
      const R = 68, b = a * Math.PI / 180, e = (a + 110) * Math.PI / 180;
      const gArc = D.el("g", {}, tours);
      D.el("path", { d: "M " + (R * Math.cos(b)).toFixed(1) + " " + (R * Math.sin(b)).toFixed(1) + " A " + R + " " + R + " 0 0 1 " + (R * Math.cos(e)).toFixed(1) + " " + (R * Math.sin(e)).toFixed(1), fill: "none", stroke: HP, "stroke-width": 9, "stroke-linecap": "round" }, gArc);
      D.el("path", { d: "M 0 -17 L 22 6 L -22 6 Z", fill: HP, transform: "translate(" + (R * Math.cos(e)).toFixed(1) + " " + (R * Math.sin(e)).toFixed(1) + ") rotate(" + (e * 180 / Math.PI + 180).toFixed(1) + ")" }, gArc);
    });
    legende(2, ["chacun son tour"]);
    // 4 · le condenseur et ses ventilateurs
    const v4 = cartes[3].dedans, toitP = D.vueToit(v4, 11, 28, 0.3);
    legende(3, ["ventilateurs"]);
    // 5 · la haute pression qui suit l'air et bute sur le plancher
    const v5 = cartes[4].dedans, PX0 = 16, PXL = 261, Y0 = 150, YL = 132;
    D.el("rect", { x: PX0, y: 18, width: PXL, height: 132, fill: "none", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, v5);
    const Xw = w => PX0 + (w - 60) / 20 * PXL, Yh = v => Y0 - v / 44 * YL;
    D.el("line", { x1: PX0, y1: Yh(24), x2: PX0 + PXL, y2: Yh(24), stroke: PLANCHER, "stroke-width": 4, "stroke-dasharray": "9 6" }, v5);
    const cAir = D.el("polyline", { fill: "none", stroke: AIR, "stroke-width": 5, "stroke-linejoin": "round" }, v5);
    const cHP = D.el("polyline", { fill: "none", stroke: HP, "stroke-width": 6, "stroke-linejoin": "round" }, v5);
    const pt5 = D.el("circle", { r: 9, fill: HP, stroke: "#fff", "stroke-width": 3 }, v5);
    legende(4, ["HP flottante", "et son plancher"], [HP, PLANCHER]);
    // 6 · le bouclier des sécurités
    const v6 = cartes[5].dedans, bouclier = D.el("g", {}, v6);
    D.el("path", { d: "M 0 -62 L 52 -42 V 4 C 52 36 26 56 0 70 C -26 56 -52 36 -52 4 V -42 Z", fill: D.BLEU, stroke: "#e8914a", "stroke-width": 7, "stroke-linejoin": "round" }, bouclier);
    D.el("path", { d: "M -24 6 L -7 26 L 26 -18", fill: "none", stroke: "#fff", "stroke-width": 13, "stroke-linecap": "round", "stroke-linejoin": "round" }, bouclier);
    legende(5, ["sécurités"]);
    const mila = D.heroine(g, { r: 30 });
    const COURBE_AIR = [], COURBE_HP = [];
    for (let w = 60; w <= 80.001; w += 0.5) { const r = D.regul(w, 60); COURBE_AIR.push([w, r.air]); COURBE_HP.push([w, r.flot]); }
    return function (t) {
      // les vignettes : éteintes, puis allumées à la phrase k = i + 1 ; la vignette en cours est encadrée
      let courant = -1;
      cartes.forEach((k, i) => {
        const ph = i + 1, lit = D.lisse((t - (T[ph] - 0.1)) / 0.5), enCours = t >= T[ph] - 0.1 && t < E[ph] + 0.4;
        opa(k.dedans, 0.22 + 0.78 * lit);
        k.cadre.setAttribute("stroke", enCours ? "#ff6b35" : "rgba(27,58,99,.3)"); k.cadre.setAttribute("stroke-width", enCours ? 7 : 3);
        k.cadre.setAttribute("fill", lit > 0.5 ? "#fffdf8" : "#f1ece2");
        if (enCours) courant = i;
      });
      // 1
      mols1.forEach((m, i) => { const u = D.frac(i / 5 + t * 0.09); m(86 + u * 172, 94 + Math.sin(t * 3 + i) * 4, 0.15, true, 1); });
      // 2
      niveau.setAttribute("cy", (98 + Math.sin(t * 2.2) * 8 + Math.sin(t * 0.9) * 22 * D.lisse((t - T[2]) / 3)).toFixed(1));
      // 3
      const f3 = D.frac(t * 0.22), a3 = f3 * 2 * Math.PI;
      secteur.setAttribute("d", "M 146 92 L 146 46 A 46 46 0 " + (a3 > Math.PI ? 1 : 0) + " 1 " + (146 + 46 * Math.sin(a3)).toFixed(1) + " " + (92 - 46 * Math.cos(a3)).toFixed(1) + " Z");
      tours.setAttribute("transform", "translate(146 92) rotate(" + (t * 70 % 360).toFixed(1) + ")");
      // 4
      const lit4 = D.lisse((t - T[4]) / 0.5), air4 = 0.55 + 0.1 * Math.sin(t);
      toitP.maj({ t: t, vent: [lit4, lit4, lit4, lit4], air: air4 });
      // 5 : la courbe se dessine pendant la phrase 5
      const w5 = D.temps(c, t, 60, 80, 5, 5);
      const vus = COURBE_AIR.filter(p => p[0] <= w5 + 0.001);
      const pts = lst => lst.map(p => Xw(p[0]).toFixed(1) + "," + Yh(p[1]).toFixed(1)).join(" ");
      cAir.setAttribute("points", pts(vus)); cHP.setAttribute("points", pts(COURBE_HP.filter(p => p[0] <= w5 + 0.001)));
      const r5 = D.regul(w5, 60); pt5.setAttribute("cx", Xw(w5).toFixed(1)); pt5.setAttribute("cy", Yh(r5.flot).toFixed(1)); opa(pt5, D.lisse((t - T[5]) / 0.4));
      // 6
      bouclier.setAttribute("transform", "translate(146 90) scale(" + (1 + 0.04 * Math.sin(t * 3)).toFixed(3) + ")");
      // la molécule : au centre (k0), puis en haut à gauche
      const va = D.lisse((t - (E[0] - 0.3)) / 1.2);
      mila({ x: D.lerp(495, 82, va), y: D.lerp(490, 194, va) + (1 - va) * Math.sin(t * 2) * 8, s: D.lerp(1.7, 0.85, va), t: t, temp: 0.12, etat: "liquide", humeur: "sourire", regard: [D.lerp(0, 1, va), 0] });
      // les courbes de droite
      const r = { temp: 0.12, etat: "liquide", humeur: "sourire" };
      if (t > T[2] - 0.2 && t < E[3] + 0.4) { r.diag = D.temps(c, t, 10, 40, 2, 3); r.diag0 = 10; r.calques = { consigne: true, zone: true }; }
      else if (t > T[5] - 0.2 && t < E[5] + 0.4) { r.diag = w5; r.diag0 = 60; r.calques = { exterieur: true, hpFlot: true, plancher: true }; }
      return r;
    };
  };
})();
