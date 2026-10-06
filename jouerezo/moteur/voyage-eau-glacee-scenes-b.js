/* =====================================================================
   voyage-eau-glacee-scenes-b.js — « L'ennemi juré », tome 1 : lot B, le
   voyage de l'eau, pourquoi l'eau, le reste du groupe
   ---------------------------------------------------------------------
   RÔLE : trois scènes du récit donnees/voyage-eau-glacee.js : voyageEau,
   pourquoiEau, tourGroupe. Même contrat que moteur/voyage-scenes-a.js :
   VOYAGE_SCENES[id](g, c) → maj(t), maj rendant { temp, etat, humeur,
   carte?, diag?, diag0? }. Fonction PURE de t : pas d'animation CSS, pas de
   SMIL, hasard par D.alea. Les gestes sont accrochés au RANG des phrases :
   ajouter une phrase au récit décale tout. Brief : voyage-eau-glacee/BRIEF-SCENES.md.
   Ce fichier ne définit que ces trois scènes (intro, frontiere, rencontre :
   -a.js ; sentinelle, gel, armes, resume : -c.js).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête
   x < 760 et y < 140 ; carte « où je suis » et diagramme à droite). Les
   pastilles du bas sont posées à y = 740.
   voyageEau : ON SUIT LA GOUTTE. La scène rend `etat: "eau"` (le double de la
   carte devient la goutte), `temp` 0,1 (glacée) → 0,35 (tiède) et `carte` sur
   la boucle d'eau (200 et plus) ; jamais de `diag`. Deux vues qui se
   fondent : l'immeuble en coupe (départ qui descend à droite, retour qui
   remonte à gauche, la pompe près du groupe) et le gros plan du
   ventilo-convecteur d'un bureau (symbole, puis coupe : batterie en
   serpentin à ailettes, ventilateur, bac à condensats).
   pourquoiEau : l'héroïne reste dans le groupe (`vapeur`, 0,12) ; `carte` et
   `diag` viennent du récit. tourGroupe : compresseur, condenseur sur le
   toit, filtre déshydrateur, détendeur ÉLECTRONIQUE (il fait aussi
   l'électrovanne : coupe simple, moteur pas à pas et pointeau) ; la scène
   rend `diag` (3 → 8, `diag0: 3`) et `carte`, calée sur les phrases : la
   dérive linéaire du récit [5, 14,6] ne suit pas les six phrases.
   AIDES LOCALES (même dessin partout, d'après les éditions voisines) :
   pas / montrer (pastilles), etiq, fleche, suivre / suivreD / echantillon /
   arc (points d'une ligne brisée), reflets (reflets qui filent dans un tuyau
   plein), tuyauEau / reseau / tuyauDegrade (tuyaux d'eau, paroi D.CUIVRE_EAU ;
   le dernier change de couleur le long du chemin), facade / dalle / groupe
   (l'immeuble de bureaux et le groupe d'eau glacée sur son toit, dessin du
   brief), chevrons (D.chevron à l'échelle), melange (couleurs).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TITRE = "Trebuchet MS, Arial, sans-serif";
  const NUIT = "#10233c", ROUGE = "#c0392b", BLEU = "#2f6fb8", CLAIR = "#f4f8fc", VERT = "#1e7e54", AIR_CHAUD = "#e8914a", TOUR = 2 * Math.PI;
  let nid = 0;
  const ident = p => "veb-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => op(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const doux = (t, t0, du) => D.lisse((t - t0) / (du || 0.5)); // 0 → 1 à partir de t0
  const f1 = v => v.toFixed(1);
  const pts = l => l.map(q => f1(q[0]) + "," + f1(q[1])).join(" ");
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const melange = (a, b, f) => { const x = hex(a), y = hex(b), k = D.borne(f, 0, 1); return "rgb(" + x.map((v, i) => Math.round(D.lerp(v, y[i], k))).join(",") + ")"; };
  /* pastilles du bas : [texte, couleur, début (s), fin (s)] ; fenêtre de 0,35 s */
  const pas = (parent, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(parent, 492, 740, s, coul, 30, "middle"), a: a, b: b }));
  const montrer = (liste, t) => liste.forEach(p => fen(p.g, t, p.a, p.b, 0.35));

  /* étiquette (une ou plusieurs lignes) et son trait pointillé : rend le groupe (opacité à régler) */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * (o.pas || 36), l, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || NUIT, "font-weight": o.gras ? 700 : 600 }));
    if (o.trait) D.trait(g, o.trait[0], o.trait[1], o.trait[2], o.trait[3], o.coulTrait);
    return g;
  }
  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, parent), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* lignes brisées : longueur, point à la distance d (px) ou à la fraction u, points régulièrement espacés */
  function longueur(l) { let s = 0; for (let i = 1; i < l.length; i++) s += Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]); return s; }
  function suivreD(l, d) { // → [x, y, angle]
    let i = 1, s = 0;
    while (i < l.length - 1) { const sg = Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]); if (d <= s + sg) break; s += sg; i++; }
    const sg = Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]) || 1, f = D.borne((d - s) / sg, 0, 1);
    return [D.lerp(l[i - 1][0], l[i][0], f), D.lerp(l[i - 1][1], l[i][1], f), Math.atan2(l[i][1] - l[i - 1][1], l[i][0] - l[i - 1][0])];
  }
  const suivre = (l, u) => suivreD(l, D.borne(u, 0, 1) * longueur(l));
  function echantillon(l, pas) { // [[x, y, s], …], s = distance depuis le début
    const P = [[l[0][0], l[0][1], 0]]; let s = 0;
    for (let i = 1; i < l.length; i++) {
      const a = l[i - 1], b = l[i], sg = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(sg / pas));
      for (let k = 1; k <= n; k++) P.push([D.lerp(a[0], b[0], k / n), D.lerp(a[1], b[1], k / n), s + sg * k / n]);
      s += sg;
    }
    return P;
  }
  const arc = (cx, cy, r, a0, a1, n) => { // points d'un arc (degrés ; y vers le bas : a de 0 à 180 passe par le bas, de 0 à −180 par le haut)
    const L = [];
    for (let k = 0; k <= n; k++) { const a = D.lerp(a0, a1, k / n) * Math.PI / 180; L.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return L;
  };
  /* reflets qui filent dans un tuyau plein (le liquide se voit couler) → f(t, vitesse en tours de tuyau par seconde, visibilité) ;
     courts (22 à 38 px) : dans un coude, la corde reste dans le tuyau */
  function reflets(p, l, nb, graine) {
    const r = D.alea(graine), L = [], tot = longueur(l);
    for (let i = 0; i < nb; i++) L.push({ s: r(), lp: 22 + r() * 16, dy: (r() - 0.5) * 6, e: D.el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, p) });
    return function (t, vit, vis) {
      L.forEach(c => {
        const u = D.frac(c.s + t * vit), a = suivreD(l, u * tot), b = suivreD(l, Math.min(tot, u * tot + c.lp));
        c.e.setAttribute("x1", f1(a[0])); c.e.setAttribute("y1", f1(a[1] + c.dy)); c.e.setAttribute("x2", f1(b[0])); c.e.setAttribute("y2", f1(b[1] + c.dy));
        c.e.setAttribute("opacity", (0.6 * vis * D.fenetre(u * tot, 0, tot - c.lp, 30)).toFixed(2));
      });
    };
  }
  /* tuyau d'eau : paroi D.CUIVRE_EAU, eau (couleur choisie) à l'intérieur ; rend l'intérieur */
  function tuyauEau(p, l, ep, coul) {
    D.el("polyline", { points: pts(l), fill: "none", stroke: D.CUIVRE_EAU, "stroke-width": ep + 10, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p);
    return D.el("polyline", { points: pts(l), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p);
  }
  /* plusieurs tuyaux d'eau : toutes les parois d'abord, puis l'eau (les raccords en T restent propres) ;
     liste de [ligne, épaisseur, couleur] → les intérieurs */
  function reseau(p, liste) {
    liste.forEach(([l, ep]) => D.el("polyline", { points: pts(l), fill: "none", stroke: D.CUIVRE_EAU, "stroke-width": ep + 10, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p));
    return liste.map(([l, ep, coul]) => D.el("polyline", { points: pts(l), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p));
  }
  /* tuyau dont la couleur change le long du chemin : l'intérieur est fait de petits tronçons ; rend maj(f), f(s) = couleur à la distance s */
  function tuyauDegrade(p, l, ep, paroi) {
    D.el("polyline", { points: pts(l), fill: "none", stroke: paroi, "stroke-width": ep + 10, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p);
    const P = echantillon(l, 12), seg = [];
    for (let i = 1; i < P.length; i++) seg.push({ s: (P[i - 1][2] + P[i][2]) / 2, e: D.el("line", { x1: f1(P[i - 1][0]), y1: f1(P[i - 1][1]), x2: f1(P[i][0]), y2: f1(P[i][1]), stroke: "#000", "stroke-width": ep, "stroke-linecap": "round" }, p) });
    return f => seg.forEach(q => q.e.setAttribute("stroke", f(q.s)));
  }
  /* façade d'un immeuble de bureaux (même dessin partout) : #e9e2d6 cernée de D.BLEU, fenêtres #cfe3f5 en rangées, toit plat.
     o : { x0, x1, toit, sol, n (étages), fen: [[x, largeur], …], fy (haut de la fenêtre sous le plafond), fh } → hauteurs des planchers */
  function facade(p, o) {
    const h = (o.sol - o.toit) / o.n, haut = [];
    rect(p, o.x0, o.toit, o.x1 - o.x0, o.sol - o.toit, { fill: "#e9e2d6", stroke: D.BLEU, "stroke-width": 4 });
    for (let k = 0; k < o.n; k++) {
      const y = o.toit + k * h;
      haut.push(y);
      if (k) D.el("line", { x1: o.x0, x2: o.x1, y1: y, y2: y, stroke: D.BLEU, "stroke-width": 3 }, p);
      o.fen.forEach(([x, l]) => rect(p, x, y + o.fy, l, o.fh, { rx: 3, fill: "#cfe3f5", stroke: D.BLEU, "stroke-width": 2.5 }));
    }
    haut.push(o.sol);
    return haut;
  }
  const dalle = (p, x0, x1, y) => rect(p, x0, y - 6, x1 - x0, 12, { rx: 2, fill: "#cfc8ba", stroke: D.BLEU, "stroke-width": 3 }); // le toit plat
  /* le groupe d'eau glacée sur le toit (même dessin partout) : caisson #d9dee4 cerné de D.BLEU, deux ventilateurs sur le dessus ;
     (x, y, w, h) : le caisson, r : rayon des ventilateurs, grille : lames de la batterie sur la face → { g, caisson, vent(angle) } */
  function groupe(p, x, y, w, h, r, grille) {
    const g = D.el("g", {}, p);
    const v1 = D.ventilateur(g, x + w * 0.27, y - r * 0.55, r), v2 = D.ventilateur(g, x + w * 0.73, y - r * 0.55, r);
    const caisson = rect(g, x, y, w, h, { rx: 8, fill: "#d9dee4", stroke: D.BLEU, "stroke-width": 4 });
    if (grille) for (let k = 0; x + 18 + k * 14 < x + w - 14; k++) D.el("line", { x1: x + 18 + k * 14, x2: x + 18 + k * 14, y1: y + h * 0.42, y2: y + h - 12, stroke: "#aeb8c4", "stroke-width": 3, "stroke-linecap": "round" }, g);
    return { g: g, caisson: caisson, vent: a => { v1(a); v2(a + 40); } };
  }
  /* chevrons d'air à l'échelle k (D.chevron a une taille fixe) → f(x, y, angle, couleur, opacité) ; angle 0 : vers le bas, 180 : vers le haut, −90 : vers la droite */
  function chevrons(parent, k) {
    const g = D.el("g", { transform: "scale(" + k + ")" }, parent), maj = D.chevron(g);
    return (x, y, ang, coul, o) => maj(x / k, y / k, ang, coul, o);
  }
  /* un coche (✓) et une flamme (pictogramme simple), dessinés autour de (0, 0) */
  const COCHE = "M -24 2 L -8 20 L 26 -22";
  const FLAMME = "M 0 -38 C 6 -22 25 -10 25 12 C 25 29 12 39 0 39 C -12 39 -25 29 -25 12 C -25 -2 -17 -11 -12 -24 C -8 -15 -4 -11 0 -38 Z";
  const FLAMME_C = "M 0 2 C 6 10 13 17 13 26 C 13 33 7 38 0 38 C -7 38 -13 33 -13 26 C -13 17 -6 12 0 2 Z";

  /* =====================================================================
     3 · LE VOYAGE DE L'EAU — on suit la goutte
     Deux vues qui se fondent : (A) l'immeuble en coupe — le groupe sur le toit,
     le départ (turquoise foncé) qui descend à droite, le retour (turquoise pâle)
     qui remonte à gauche, la pompe sur le retour, un ventilo-convecteur au
     plafond de chaque étage ; (B) le gros plan du ventilo-convecteur du bas.
     k0 : la goutte sort du groupe et descend le départ · k1 : la pompe (symbole,
     puis coupe : volute et roue) · k2 : le ventilo-convecteur (symbole, puis
     coupe : batterie en serpentin à ailettes, ventilateur, bac) · k3 : l'air
     cède sa chaleur, la goutte se réchauffe · k4 : le retour · k5 : le régime.
     Rend etat "eau", temp 0,1 → 0,35 et la carte sur la boucle d'eau (jamais de diag).
     ===================================================================== */
  S.voyageEau = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    /* ---------- A · l'immeuble en coupe, le groupe sur le toit ---------- */
    const ov = D.el("g", {}, g);
    const XR = 290, XD = 690, FL = [400, 496, 592, 688], YC = n => FL[n] + 24, YBAS = YC(2);      // risers : retour à gauche, départ à droite
    const idG = ident("fc"), lg = D.el("linearGradient", { id: idG, x1: 1, y1: 0, x2: 0, y2: 0 }, D.el("defs", {}, ov));
    D.el("stop", { offset: 0, "stop-color": D.EAU }, lg); D.el("stop", { offset: 1, "stop-color": D.EAU_TIEDE }, lg);
    D.el("line", { x1: 190, x2: 790, y1: 688, y2: 688, stroke: D.BLEU, "stroke-width": 5, "stroke-linecap": "round" }, ov);   // le sol
    facade(ov, { x0: 260, x1: 720, toit: 400, sol: 688, n: 3, fen: [[340, 70], [465, 70], [590, 70]], fy: 52, fh: 36 });
    dalle(ov, 252, 728, 400);
    const BOUCLE = [[490, 366], [XD, 366], [XD, YBAS], [XR, YBAS], [XR, 340], [490, 340], [490, 366]];
    const halo = D.el("polyline", { points: pts(BOUCLE), fill: "none", stroke: "#ff6b35", "stroke-width": 46, "stroke-linejoin": "round", opacity: 0 }, ov);
    const DEP = [[575, 366], [XD, 366], [XD, YBAS], [598, YBAS]], RET = [[402, YBAS], [XR, YBAS], [XR, 340], [405, 340]];
    const EP = 14, tuyaux = [[[[575, 366], [XD, 366], [XD, YBAS]], EP, D.EAU], [[[XR, YBAS], [XR, 340], [405, 340]], EP, D.EAU_TIEDE]];
    for (let n = 0; n < 3; n++) { tuyaux.push([[[XD, YC(n)], [590, YC(n)]], EP, D.EAU]); tuyaux.push([[[410, YC(n)], [XR, YC(n)]], EP, D.EAU_TIEDE]); }
    reseau(ov, tuyaux);
    for (let n = 0; n < 3; n++) {                                  // un ventilo-convecteur au plafond de chaque bureau
      const x = 410, y = YC(n) - 16, w = 180, h = 32;
      rect(ov, x, y, w, h, { rx: 5, fill: "#d9dee4", stroke: D.BLEU, "stroke-width": 3 });
      rect(ov, x + 16, y + 8, w - 32, h - 16, { rx: 3, fill: "url(#" + idG + ")" });
      for (let k = 1; k < 8; k++) D.el("line", { x1: x + 16 + k * (w - 32) / 8, x2: x + 16 + k * (w - 32) / 8, y1: y + 8, y2: y + h - 8, stroke: "#fff", "stroke-width": 2.5, opacity: 0.7 }, ov);
    }
    const flD = reflets(ov, DEP, 5, 3), flR = reflets(ov, RET, 5, 4);
    const gr = groupe(ov, 395, 306, 190, 88, 32, true);
    /* k1 : la pompe — son symbole sur le retour, près du groupe, puis sa coupe (volute et roue) en haut à gauche */
    const pSym = D.el("g", { opacity: 0 }, ov);
    rect(pSym, 314, 308, 76, 64, { rx: 12, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(pSym, "pompe", 320, 314, 64, 52);
    const PX = 150, PY = 245, PR = 54, pc = D.el("g", { opacity: 0 }, ov), idF = ident("fonte");
    const lf = D.el("linearGradient", { id: idF, x1: 0, y1: 160, x2: 0, y2: PY + PR + 16, gradientUnits: "userSpaceOnUse" }, D.el("defs", {}, pc));
    [[0, "#dfe2e6"], [0.5, "#b4bac1"], [1, "#8e959d"]].forEach(([o, col]) => D.el("stop", { offset: o, "stop-color": col }, lf));
    D.trait(pc, 318, 322, 252, 270);
    const fonte = { fill: "url(#" + idF + ")", stroke: "#3b4249", "stroke-width": 3 }, fonte0 = { fill: "url(#" + idF + ")" };
    D.el("circle", Object.assign({ cx: PX, cy: PY, r: PR + 16 }, fonte), pc); rect(pc, PX + PR - 22, 160, 64, PY - 160, fonte);
    D.el("circle", Object.assign({ cx: PX, cy: PY, r: PR + 14.5 }, fonte0), pc); rect(pc, PX + PR - 20.5, 161.5, 61, PY - 161.5, fonte0);   // la carcasse d'une seule pièce
    D.el("circle", { cx: PX, cy: PY, r: PR, fill: D.EAU_TIEDE }, pc); rect(pc, PX + PR - 6, 160, 32, PY - 160, { fill: D.EAU_TIEDE });
    tuyauEau(pc, [[24, PY], [PX, PY]], 26, D.EAU_TIEDE);
    rect(pc, PX + PR - 26, 154, 72, 10, { rx: 3, fill: "#39424c" });
    const roue = D.el("g", { transform: "translate(" + PX + " " + PY + ")" }, pc), tourne = D.el("g", {}, roue);
    D.el("circle", { r: PR - 8, fill: "rgba(226,243,241,.92)", stroke: "#aab6c3", "stroke-width": 3 }, tourne);
    for (let k = 0; k < 6; k++) D.el("path", { d: "M 9 0 C 18 -3 28 -8 36 -24", fill: "none", stroke: "#56636f", "stroke-width": 7, "stroke-linecap": "round", transform: "rotate(" + k * 60 + ")" }, tourne);
    D.el("circle", { r: 11, fill: "#39424c", stroke: "#1f262d", "stroke-width": 2 }, tourne); D.el("circle", { r: 3.5, fill: "#cfd6de" }, tourne);
    D.etiquette(pc, PX, PY + PR + 56, "pompe", { "text-anchor": "middle" });
    /* k5 : le régime courant, sur les tuyaux, près du groupe */
    const eRet = etiq(ov, 252, 333, ["retour :", "autour de 12 °C"], { ancre: "end", trait: [258, 341, 277, 341] });
    const eDep = etiq(ov, 738, 360, ["départ :", "autour de 7 °C"], { trait: [733, 364, 704, 364] });
    const gOv = D.goutte(ov, { r: 30 });

    /* ---------- B · le gros plan : le ventilo-convecteur d'un bureau ---------- */
    const gp = D.el("g", { opacity: 0 }, g);
    rect(gp, 20, 152, 940, 20, { fill: "#d8d1c3", stroke: D.BLEU, "stroke-width": 3 });          // le plafond du bureau
    const sym = D.el("g", { opacity: 0 }, gp);                       // k2 : le symbole d'abord
    rect(sym, 222, 250, 540, 350, { rx: 22, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(sym, "ventilo", 242, 281, 500, 288);
    D.etiquette(sym, 492, 648, "ventilo-convecteur", { "text-anchor": "middle" });
    const cp = D.el("g", { opacity: 0 }, gp);                        // puis la coupe
    const YT = 345, YB = 465, RB = 38;                               // la batterie : colonnes à x = 190, 266, 342, 418 (haut des tubes, bas des tubes, rayon des coudes)
    rect(cp, 100, 262, 780, 348, { rx: 18, fill: "#d9dee4", stroke: D.BLEU, "stroke-width": 5 });  // le caisson
    rect(cp, 118, 280, 744, 312, { fill: CLAIR, stroke: "#8493a3", "stroke-width": 2 });
    [[98, 330, 22, 190], [860, 330, 24, 210]].forEach(([x, y, w, h]) => {                                  // l'entrée et la sortie de l'air
      rect(cp, x, y, w, h, { fill: CLAIR });
      [y, y + h].forEach(yy => D.el("line", { x1: x, x2: x + w, y1: yy, y2: yy, stroke: D.BLEU, "stroke-width": 5 }, cp));
      for (let k = 1; k < 6; k++) D.el("line", { x1: x, x2: x + w, y1: y + k * h / 6, y2: y + k * h / 6, stroke: "#9aa7b5", "stroke-width": 3 }, cp);
    });
    rect(cp, 160, 288, 290, 236, { fill: "#eef3f8", stroke: "#8493a3", "stroke-width": 2 });             // la batterie : ailettes
    for (let y = 300; y < 520; y += 13) D.el("line", { x1: 160, x2: 450, y1: y, y2: y, stroke: "#9fb0c2", "stroke-width": 3 }, cp);
    rect(cp, 150, 536, 312, 50, { rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });   // le bac à condensats
    rect(cp, 160, 536, 292, 40, { fill: CLAIR });
    const bac = D.liquide(cp, { x0: 160, x1: 452, yh: 536, yb: 576, niveau: () => 0.42, couleur: () => D.EAU_TIEDE, pas: 8 });
    const vent2 = D.ventilateur(cp, 650, 436, 112);                  // le ventilateur
    const seg1 = [[935, 190], [418, 190], [418, YT]], coil = [[418, YT], [418, YB]].concat(arc(380, YB, RB, 0, 180, 14), [[342, YT]], arc(304, YT, RB, 0, -180, 14), [[266, YB]], arc(228, YB, RB, 0, 180, 14), [[190, YT]]);
    const seg3 = [[190, YT], [190, 190], [40, 190]], PATH = seg1.concat(coil.slice(1), seg3.slice(1));
    const S0 = longueur(seg1), S1 = S0 + longueur(coil), STOT = longueur(PATH);
    const majEau = tuyauDegrade(cp, PATH, 30, D.CUIVRE_EAU), flEau = reflets(cp, PATH, 10, 5);
    const air = [];                                                  // l'air de la pièce : tiède à l'entrée, frais à la sortie
    for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) air.push({ r: r, i: i, maj: chevrons(cp, 1) });
    const chal = [170, 246, 322, 398].map(x => ({ x: x, maj: D.chaleur(cp) }));                       // la chaleur de l'air vers l'eau
    const gouttes = D.bulles(cp, 9, 71, true);
    const eBat = etiq(cp, 304, 247, "batterie", { ancre: "middle", trait: [304, 254, 304, 290] });
    const eVen = etiq(cp, 650, 247, "ventilateur", { ancre: "middle", trait: [650, 254, 650, 326] });
    const gGp = D.goutte(cp, { r: 30 });

    const pa = pas(g, [["départ : eau glacée", D.CUIVRE_EAU, T[0] + 0.2, E[0] + 0.3], ["une boucle fermée", D.BLEU, T[1] + 0.2, E[1] + 0.3],
      ["le bureau se rafraîchit", BLEU, T[3] + 0.2, E[3] + 0.3], ["retour : un peu plus chaude", D.ORANGE, T[4] + 0.2, E[4] + 0.3], ["le régime courant", D.BLEU, T[5] + 0.2, DUR + 1]]);
    const L1 = [[565, 366], [XD, 366], [XD, YBAS], [598, YBAS]], L2 = [[404, YBAS], [XR, YBAS], [XR, 340], [398, 340]];
    return function (t) {
      const gv = doux(t, T[2] - 0.25, 0.55) * (1 - doux(t, E[3], 0.55));                 // fondu entre les deux vues
      op(gp, gv); op(ov, 1 - gv);
      gr.vent(t * 520); vent2(t * 520);
      /* la goutte : distance parcourue dans le tuyau du gros plan, réchauffement le long de la batterie */
      const s = D.courbe([[A(2, 0.4), 20], [T[3], S0], [E[3] - 0.1, S1], [E[3] + 0.5, STOT - 30]], t, true);
      const H = D.lisse((t - T[3] - 0.2) / (E[3] - T[3] - 0.4)), tiede = D.borne((s - S0) / (S1 - S0), 0, 1) * H;
      const humeur = t > T[3] + 0.8 && t < E[4] - 0.3 ? "chaud" : "sourire";
      /* A : la boucle */
      op(halo, D.fenetre(t, A(1, 0.55), E[1] + 0.3, 0.4) * (0.32 + 0.2 * Math.sin(t * 5)));
      flD(t, 0.1, 1); flR(t, 0.1, 1);
      fen(pSym, t, T[1] + 0.1, E[1] + 0.2, 0.4); fen(pc, t, A(1, 0.3), E[1] + 0.2, 0.4);
      tourne.setAttribute("transform", "rotate(" + f1(t * 260) + ")");
      op(eDep, doux(t, A(5, 0.45), 0.4)); op(eRet, doux(t, A(5, 0.7), 0.4));
      let gx, gy, ga, go;
      if (t < T[3]) { [gx, gy, ga] = suivre(L1, D.courbe([[T[0] + 0.3, 0], [T[2] + 0.4, 1]], t, true)); go = doux(t, T[0] + 0.3, 0.6); }
      else { [gx, gy, ga] = suivre(L2, D.courbe([[T[4], 0], [E[4] - 0.35, 1]], t, true)); go = doux(t, E[3] + 0.4, 0.3) * (1 - doux(t, E[4] - 0.5, 0.3)); }
      gOv({ x: gx, y: gy, s: 0.6, t: t, tiede: t < T[3] ? 0 : 1, humeur: humeur, regard: [Math.cos(ga), Math.sin(ga)], op: go });
      /* B : le symbole, puis la coupe */
      op(sym, doux(t, T[2] - 0.1, 0.45) * (1 - doux(t, A(2, 0.36), 0.45)));
      op(cp, doux(t, A(2, 0.36), 0.5));
      fen(eBat, t, A(2, 0.5), E[3] + 0.3, 0.4); fen(eVen, t, A(2, 0.72), E[3] + 0.3, 0.4);
      majEau(q => melange(D.EAU, D.EAU_TIEDE, D.borne((q - S0) / (S1 - S0), 0, 1) * H)); flEau(t, 0.045, 1);
      const lair = doux(t, T[3] + 0.1, 0.6);
      air.forEach(a => {
        const f = D.frac(a.i / 5 + a.r * 0.11 + t * 0.16), x = 38 + f * 902, k = D.lisse((x - 140) / 320);
        const vis = D.fenetre(f, 0, 1, 0.05) * (1 - D.lisse((x - 505) / 30) * (1 - D.lisse((x - 790) / 25)));
        a.maj(x, (a.r ? 440 : 368) + Math.sin(t * 2.4 + a.i) * 3, -90, D.couleur(D.lerp(0.7, 0.12, k), false), vis * lair * 0.95);
      });
      chal.forEach((h, i) => { const q = D.frac(t * 0.7 + i * 0.27); h.maj(h.x - 5 + q * 8, 404, -90, doux(t, T[3] + 1.0, 0.5) * D.fenetre(q, 0, 1, 0.25) * 0.95); });
      bac.maj(t);
      gouttes(t, q => { const x = 176 + q * 260; return [x, 524, bac.surface(x, t), doux(t, T[3] + 1.4, 0.5) * (1 - doux(t, E[3] + 0.1, 0.4)), D.EAU_TIEDE]; });
      const [qx, qy, qa] = suivreD(PATH, s);
      gGp({ x: qx, y: qy, s: 0.5, t: t, tiede: tiede, humeur: humeur, regard: [Math.cos(qa), Math.sin(qa)], op: doux(t, A(2, 0.4), 0.3) * (1 - doux(t, E[3] + 0.1, 0.35)) });
      montrer(pa, t);
      return { temp: 0.1 + 0.25 * tiede, etat: "eau", humeur: humeur,
        carte: D.courbe([[T[0], 203], [E[0], 205], [T[1], 205], [E[1], 206], [T[2], 206], [E[2], 206.5], [T[3], 206.5], [E[3], 207], [T[4], 207], [E[4], 212.9], [T[5], 213]], t, true) };
    };
  };

  /* =====================================================================
     4 · POURQUOI L'EAU ? — l'héroïne reste dans le groupe (vapeur, 0,12)
     k0 : l'héroïne et un grand « ? » · k1 : le groupe sur le toit, son caisson
     épaissi, un circuit court et fermé dedans, le tampon « rempli et essayé en
     usine » · k2 : deux immeubles côte à côte — à gauche du cuivre partout et
     des raccords (barré de rouge), à droite le groupe sur le toit et des
     tuyaux d'eau seulement · k3 : la goutte parcourt le long tuyau de l'immeuble
     de droite · k4 : une flamme barrée près des bureaux, le groupe dehors.
     `carte` et `diag` viennent du récit.
     ===================================================================== */
  S.pourquoiEau = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    /* k0 : l'héroïne et un grand « ? » */
    const g0 = D.el("g", {}, g);
    const qm = D.texte(g0, 640, 500, "?", { "text-anchor": "middle", "font-size": 300, "font-weight": 700, fill: D.ORANGE, "font-family": TITRE });
    /* k1 : le groupe sur son toit, vu en coupe, avec son circuit court et fermé */
    const g1 = D.el("g", { opacity: 0 }, g);
    facade(g1, { x0: 90, x1: 620, toit: 586, sol: 700, n: 1, fen: [[130, 80], [255, 80], [380, 80], [505, 80]], fy: 30, fh: 50 });
    dalle(g1, 70, 640, 586);
    const gr1 = groupe(g1, 130, 340, 440, 240, 62);
    rect(g1, 152, 362, 396, 196, { rx: 6, fill: CLAIR });
    const lx0 = 205, lx1 = 495, ly0 = 402, ly1 = 518, lr = 32;
    const LOOP = [[lx0 + lr, ly0], [lx1 - lr, ly0]].concat(arc(lx1 - lr, ly0 + lr, lr, -90, 0, 8), [[lx1, ly1 - lr]], arc(lx1 - lr, ly1 - lr, lr, 0, 90, 8),
      [[lx0 + lr, ly1]], arc(lx0 + lr, ly1 - lr, lr, 90, 180, 8), [[lx0, ly0 + lr]], arc(lx0 + lr, ly0 + lr, lr, 180, 270, 8), [[lx0 + lr, ly0]]);
    D.el("polygon", { points: pts(LOOP.slice(0, -1)), fill: "none", stroke: "#8a4a24", "stroke-width": 42, "stroke-linejoin": "round" }, g1);
    D.el("polygon", { points: pts(LOOP.slice(0, -1)), fill: "none", stroke: "#eef4fa", "stroke-width": 30, "stroke-linejoin": "round" }, g1);
    const eCirc = etiq(g1, 350, 214, "circuit court, fermé", { ancre: "middle" });
    const st = D.el("g", { opacity: 0 }, g1), sp = D.el("g", {}, st);          // le tampon : « rempli et essayé en usine » ✓
    rect(sp, -145, -88, 290, 176, { rx: 16, fill: "rgba(255,255,255,.65)", stroke: VERT, "stroke-width": 7 });
    rect(sp, -135, -78, 270, 156, { rx: 10, fill: "none", stroke: VERT, "stroke-width": 2.5 });
    D.el("path", { d: COCHE, transform: "translate(0 -42)", fill: "none", stroke: VERT, "stroke-width": 11, "stroke-linecap": "round", "stroke-linejoin": "round" }, sp);
    D.etiquette(sp, 0, 8, "rempli et essayé", { "text-anchor": "middle", fill: VERT, "font-size": 30, "font-weight": 700 });
    D.etiquette(sp, 0, 46, "en usine", { "text-anchor": "middle", fill: VERT, "font-size": 30, "font-weight": 700 });
    const mila = D.heroine(g, { r: 30 });

    /* k2-k4 : deux immeubles côte à côte */
    const g2 = D.el("g", { opacity: 0 }, g);
    const gL = D.el("g", {}, g2), gR = D.el("g", {}, g2);
    const FY = [354, 454, 554];                                       // le plafond de chaque étage : là passent les tuyaux
    /* à gauche : le fluide frigorigène partout (cuivre, raccords), barré de rouge */
    facade(gL, { x0: 40, x1: 440, toit: 330, sol: 630, n: 3, fen: [[95, 65], [205, 65], [315, 65]], fy: 52, fh: 36 });
    dalle(gL, 32, 448, 330);
    const XV = [70, 180, 290, 410], cuivre = l => { D.el("polyline", { points: pts(l), fill: "none", stroke: "#8a4a24", "stroke-width": 9, "stroke-linejoin": "round" }, gL); D.el("polyline", { points: pts(l), fill: "none", stroke: "#e7a978", "stroke-width": 4, "stroke-linejoin": "round" }, gL); };
    FY.forEach(y => cuivre([[XV[0], y], [XV[3], y]]));
    XV.forEach(x => cuivre([[x, FY[0]], [x, FY[2]]]));
    const points = [];
    FY.forEach(y => XV.forEach((x, i) => { points.push([x, y]); if (i < 3) points.push([(x + XV[i + 1]) / 2, y]); }));
    XV.forEach(x => [(FY[0] + FY[1]) / 2, (FY[1] + FY[2]) / 2].forEach(y => points.push([x, y])));
    points.forEach(([x, y]) => D.el("circle", { cx: x, cy: y, r: 6, fill: "#f4d9bd", stroke: "#8a4a24", "stroke-width": 2.5 }, gL));
    const croix = D.el("g", { opacity: 0 }, gL);
    [[40, 330, 440, 630], [440, 330, 40, 630]].forEach(([a, b, x2, y2]) => D.el("line", { x1: a, y1: b, x2: x2, y2: y2, stroke: ROUGE, "stroke-width": 13, "stroke-linecap": "round", opacity: 0.6 }, croix));
    const eFlu = etiq(g2, 240, 676, "fluide partout", { ancre: "middle" });
    /* à droite : le groupe sur le toit, des tuyaux d'eau seulement (un long tuyau qui serpente d'étage en étage, puis le retour) */
    facade(gR, { x0: 540, x1: 940, toit: 330, sol: 630, n: 3, fen: [[650, 60], [735, 60], [820, 60]], fy: 52, fh: 36 });
    dalle(gR, 532, 948, 330);
    const SERP = [[810, 300], [905, 300], [905, FY[0]], [605, FY[0]], [605, FY[1]], [905, FY[1]], [905, FY[2]], [605, FY[2]]], RETR = [[605, FY[2]], [565, FY[2]], [565, 300], [672, 300]];
    const tuyauxR = D.el("g", {}, gR);
    reseau(tuyauxR, [[SERP, 14, D.EAU], [RETR, 14, D.EAU_TIEDE]]);
    const flS = reflets(tuyauxR, SERP, 7, 4), flRt = reflets(tuyauxR, RETR, 3, 6);
    [[905, FY[0]], [605, FY[0]], [605, FY[1]], [905, FY[1]], [905, FY[2]], [605, FY[2]]].forEach(([x, y]) => D.el("circle", { cx: x, cy: y, r: 6, fill: "#fff", stroke: D.CUIVRE_EAU, "stroke-width": 2.5 }, tuyauxR));
    const gr2 = groupe(gR, 670, 262, 140, 68, 24, true);
    const eEau = etiq(g2, 740, 676, "eau glacée", { ancre: "middle" });
    const mila2 = D.heroine(gR, { r: 30 });
    const LEN = longueur(SERP), gGt = D.goutte(gR, { r: 30 });
    /* k4 : une flamme barrée près des bureaux, le groupe dehors */
    const fl = D.el("g", { opacity: 0 }, gR), flp = D.el("g", {}, fl);
    D.el("circle", { r: 62, fill: "rgba(255,255,255,.95)" }, flp);
    D.el("path", { d: FLAMME, transform: "scale(1.15)", fill: "#f08a1c", stroke: "#b5431a", "stroke-width": 3, "stroke-linejoin": "round" }, flp);
    D.el("path", { d: FLAMME_C, transform: "scale(1.15)", fill: "#ffd166" }, flp);
    const interdit = D.el("g", { opacity: 0 }, flp);
    D.el("circle", { r: 58, fill: "none", stroke: ROUGE, "stroke-width": 10 }, interdit);
    D.el("line", { x1: -41, y1: -41, x2: 41, y2: 41, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, interdit);
    const hGroupe = rect(gR, 660, 250, 160, 90, { rx: 12, fill: "none", stroke: D.ORANGE, "stroke-width": 7, opacity: 0 });
    const eDehors = etiq(gR, 648, 238, "fluide inflammable : dehors", { ancre: "end", trait: [654, 240, 671, 270] });
    const pa = pas(g, [["pourquoi l'eau ?", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["je reste enfermée", D.ORANGE, T[1] + 0.2, E[1] + 0.3], ["moins de fluide · moins de raccords", VERT, T[2] + 0.2, E[2] + 0.3],
      ["l'eau va loin", D.CUIVRE_EAU, T[3] + 0.2, E[3] + 0.3], ["la norme limite la charge dans les bureaux", "#b5431a", T[4] + 0.2, DUR + 1]]);
    return function (t) {
      const dans1 = doux(t, T[1] - 0.4, 0.6) * (1 - doux(t, T[2] - 0.2, 0.5)), dans2 = doux(t, T[2] - 0.2, 0.5);
      /* k0 */
      op(g0, 1 - doux(t, T[1] - 0.25, 0.5));
      qm.setAttribute("transform", "translate(0 " + f1(Math.sin(t * 2.2) * 8) + ")");
      /* k1 */
      op(g1, dans1);
      gr1.vent(t * 520);
      gr1.caisson.setAttribute("stroke-width", f1(D.lerp(5, 15, doux(t, A(1, 0.12), 0.8))));
      op(eCirc, doux(t, A(1, 0.38), 0.4) * dans1);
      op(st, doux(t, A(1, 0.7), 0.1));
      const pose = doux(t, A(1, 0.7), 0.25);                                // le tampon tombe et se pose (jamais plus large que posé : rien au-delà de x = 965)
      sp.setAttribute("transform", "translate(795 " + f1(452 - 26 * (1 - pose)) + ") rotate(" + f1(-7 - 9 * (1 - pose)) + ")");
      /* l'héroïne : grande pour la question, puis elle rentre dans le groupe et fait le tour de son petit circuit fermé */
      const m = doux(t, T[1] - 0.3, 1.2), [lx, ly, la] = suivre(LOOP, D.frac(Math.max(0, t - T[1]) * 70 / longueur(LOOP)));
      mila({ x: D.lerp(300, lx, m), y: D.lerp(450 + Math.sin(t * 2) * 6, ly, m), s: D.lerp(2.4, 0.62, m), t: t, temp: 0.12, etat: "vapeur", humeur: t < T[1] ? "surprise" : "sourire",
        regard: t < T[1] ? [1, -0.4] : [Math.cos(la), Math.sin(la)], op: 1 - doux(t, T[2] - 0.2, 0.4) });
      /* k2-k4 : les deux immeubles */
      op(g2, dans2);
      op(gL, (1 - 0.78 * doux(t, T[3] - 0.1, 0.5)) * (1 - doux(t, T[4] - 0.25, 0.6)));
      op(eFlu, doux(t, A(2, 0.55), 0.4) * (1 - doux(t, T[4] - 0.25, 0.6)) * (1 - 0.7 * doux(t, T[3] - 0.1, 0.5)));
      op(croix, doux(t, A(2, 0.3), 0.5)); op(eEau, doux(t, A(2, 0.62), 0.4));
      gr2.vent(t * 520); flS(t, 0.045, 1); flRt(t, 0.12, 1);
      mila2({ x: 740, y: 297 + Math.sin(t * 2.4) * 2, s: 0.6, t: t, temp: 0.12, etat: "vapeur", humeur: "sourire", regard: [1, 0], op: doux(t, T[2] + 0.2, 0.5) });
      /* k3 : la goutte parcourt le long tuyau */
      const s = D.courbe([[T[3] + 0.2, 0], [E[3] + 0.2, LEN]], t, true), [gx, gy, ga] = suivreD(SERP, s);
      gGt({ x: gx, y: gy, s: 0.55, t: t, tiede: 0, humeur: "sourire", regard: [Math.cos(ga), Math.sin(ga)], op: doux(t, T[3] + 0.2, 0.3) * (1 - doux(t, E[3] + 0.3, 0.3)) });
      /* k4 : la flamme barrée près des bureaux ; les tuyaux s'effacent, le groupe reste dehors */
      op(tuyauxR, 1 - 0.6 * doux(t, T[4] + 0.2, 0.5));
      op(fl, doux(t, T[4] + 0.3, 0.3));
      flp.setAttribute("transform", "translate(740 482) scale(" + (1 + 0.5 * (1 - doux(t, T[4] + 0.3, 0.3))).toFixed(3) + ")");
      op(interdit, doux(t, A(4, 0.4), 0.3));
      op(eDehors, doux(t, A(4, 0.72), 0.4)); op(hGroupe, D.fenetre(t, A(4, 0.76), DUR + 1, 0.4) * (0.5 + 0.4 * Math.sin(t * 5)));
      montrer(pa, t);
      return { temp: 0.12, etat: "vapeur", humeur: t < T[1] ? "surprise" : "sourire" };
    };
  };

  /* =====================================================================
     5 · LE RESTE DE MON VOYAGE — compresseur, condenseur, filtre, détendeur
     Trois vues qui se fondent. (1) Le compresseur, d'abord son symbole, puis une
     coupe simple (manière de S.compresseur de l'original : un piston, la chambre
     qui se resserre) : k0 l'héroïne entre, k1 elle est écrasée, elle chauffe.
     (2) Le condenseur sur le toit : symbole, puis la batterie (tubes à ailettes,
     en serpentin, sur pieds), deux grands ventilateurs au-dessus ; k2 l'air
     extérieur monte à travers, k3 la chaleur part vers le ciel et l'héroïne
     redevient liquide en traversant la batterie. (3) Le filtre déshydrateur et le
     détendeur ÉLECTRONIQUE (symbole, puis coupe simple : moteur pas à pas, pointeau
     devant un orifice) : k4 il dose (s'ouvre un peu) puis se ferme à l'arrêt,
     comme une électrovanne ; k5 il se rouvre, l'héroïne passe, la pression tombe,
     elle repart froide vers l'évaporateur à plaques (« la frontière »).
     Rend diag 3 → 8 (diag0 3) et carte, calée sur les six phrases.
     ===================================================================== */
  S.tourGroupe = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const rgb = s => s.match(/\d+/g).map(Number);
    const mixC = (a, b, f) => { const x = rgb(a), y = rgb(b); return "rgb(" + x.map((v, i) => Math.round(D.lerp(v, y[i], D.borne(f, 0, 1)))).join(",") + ")"; };
    const cartouche = (p, x, y, w, h) => rect(p, x, y, w, h, { rx: 22, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });

    /* ---------- (1) le compresseur ---------- */
    const v1 = D.el("g", {}, g), carte1 = D.el("g", {}, v1), cut1 = D.el("g", { opacity: 0 }, v1);
    cartouche(carte1, 342, 290, 300, 270); D.image(carte1, "compresseur", 362, 316, 260, 208);
    const TDC = 380, BDC = 530;
    rect(cut1, 40, 262, 340, 56, { fill: "url(#vm-cuivre)" }); rect(cut1, 680, 262, 280, 56, { fill: "url(#vm-cuivre)" });
    const chambre = rect(cut1, 400, 350, 260, 280, { fill: "#f3f6fa" });
    const molsG = D.el("g", {}, cut1);
    const bielle = rect(cut1, 515, 0, 30, 10, { fill: "url(#vm-acier-h)" });
    const piston = D.el("g", {}, cut1);
    rect(piston, 404, 0, 252, 50, { rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });
    [14, 28].forEach(y => D.el("line", { x1: 404, x2: 656, y1: y, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    rect(cut1, 380, 350, 20, 280, { fill: "url(#vm-acier-h)" }); rect(cut1, 660, 350, 20, 280, { fill: "url(#vm-acier-h)" });
    rect(cut1, 380, 250, 300, 100, { rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 });      // la culasse
    rect(cut1, 40, 272, 428, 36, { fill: "#eef4fa" }); rect(cut1, 412, 272, 56, 80, { fill: "#eef4fa" });         // l'aspiration (vapeur froide)
    rect(cut1, 592, 272, 368, 36, { fill: "#fbefe6" }); rect(cut1, 592, 272, 56, 80, { fill: "#fbefe6" });        // le refoulement (vapeur chaude)
    const clapA = rect(cut1, 412, 349, 60, 7, { rx: 3, fill: "#24384f" }), clapR = rect(cut1, 590, 345, 60, 7, { rx: 3, fill: "#24384f" });
    rect(cut1, 360, 630, 340, 70, { rx: 14, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 5 });
    D.el("path", { d: "M 410 642 L 394 670 L 408 670 L 398 692 L 426 662 L 412 662 L 424 642 Z", fill: "#ffd166" }, cut1);
    const rm = D.alea(23), MOLS = [];
    for (let i = 0; i < 14; i++) MOLS.push({ u: 0.08 + 0.84 * rm(), v: 0.08 + 0.84 * rm(), e: i / 14, ph: rm() * TOUR, maj: D.mol(molsG) });
    const m1 = D.heroine(v1, { r: 30 });
    const ENTREE = [[40, 290], [440, 290], [440, 356]], SORTIE = [[530, 366], [620, 356], [620, 290], [920, 290]], LE = longueur(ENTREE), LS = longueur(SORTIE);

    /* ---------- (2) le condenseur sur le toit ---------- */
    const v2 = D.el("g", { opacity: 0 }, g), carte2 = D.el("g", {}, v2), cut2 = D.el("g", { opacity: 0 }, v2);
    cartouche(carte2, 367, 240, 250, 340); D.image(carte2, "condenseur", 392, 262, 200, 291);
    D.etiquette(carte2, 492, 636, "condenseur", { "text-anchor": "middle" });
    facade(cut2, { x0: 60, x1: 910, toit: 656, sol: 698, n: 1, fen: [[110, 70], [250, 70], [390, 70], [530, 70], [670, 70], [810, 70]], fy: 12, fh: 26 });
    dalle(cut2, 30, 940, 650);
    [275, 655].forEach(x => rect(cut2, x, 600, 30, 46, { fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 2 }));    // la batterie est sur pieds : l'air passe dessous
    const vA = D.ventilateur(cut2, 370, 358, 85), vB = D.ventilateur(cut2, 590, 358, 85);
    rect(cut2, 260, 405, 440, 199, { rx: 12, fill: "#d9dee4", stroke: D.BLEU, "stroke-width": 5 });
    rect(cut2, 274, 420, 412, 169, { fill: CLAIR, stroke: "#8493a3", "stroke-width": 2 });
    rect(cut2, 305, 586, 350, 21, { fill: CLAIR }); [305, 655].forEach(x => D.el("line", { x1: x, x2: x, y1: 586, y2: 604, stroke: D.BLEU, "stroke-width": 5 }, cut2));   // dessous ouvert
    for (let x = 290; x <= 670; x += 12) D.el("line", { x1: x, x2: x, y1: 424, y2: 586, stroke: "#b5c2cf", "stroke-width": 3 }, cut2);                                  // les ailettes
    const CY = [456, 508, 560], XA = 322, XB = 638, RC = 26;
    const PCOND = [[936, CY[0]], [XB, CY[0]], [XA, CY[0]]].concat(arc(XA, CY[0] + RC, RC, -90, -270, 14), [[XB, CY[1]]], arc(XB, CY[1] + RC, RC, -90, 90, 14), [[XA, CY[2]], [44, CY[2]]]);
    const SC0 = longueur(PCOND.slice(0, 2)), SC1 = longueur(PCOND.slice(0, PCOND.length - 1)), SCT = longueur(PCOND);
    const LIQ = D.couleur(0.45, false), uC = s => D.borne((s - SC0) / (SC1 - SC0), 0, 1);
    const colCond = s => mixC(LIQ, "rgb(253,241,226)", 1 - D.lisse((uC(s) - 0.28) / 0.4));              // vapeur pâle → liquide le long de la batterie
    const majCond = tuyauDegrade(cut2, PCOND, 28, "#8a4a24"); majCond(colCond);
    const flLiq = reflets(cut2, echantillon(PCOND, 20).filter(q => q[2] > SC0 + 0.62 * (SC1 - SC0)).map(q => [q[0], q[1]]), 5, 9);
    const VM = []; for (let i = 0; i < 7; i++) VM.push({ k: i / 7, maj: D.mol(cut2) });                // les molécules de vapeur, qui disparaissent en cours de route
    const air = [], ciel = [];
    for (let k = 0; k < 7; k++) for (let j = 0; j < 2; j++) air.push({ x: 330 + 48 * k, k: k, j: j, maj: chevrons(cut2, 0.62) });
    [335, 405, 555, 625].forEach((x, i) => { for (let j = 0; j < 2; j++) ciel.push({ x: x, i: i, j: j, maj: chevrons(cut2, 1) }); });
    const fH1 = fleche(cut2, 370, 252, 370, 164, "#e2662c", 17), fH2 = fleche(cut2, 590, 252, 590, 164, ROUGE, 12);
    const eH1 = etiq(cut2, 335, 190, ["chaleur prise", "à l'eau"], { ancre: "end", coul: "#a8430f", gras: true });
    const eH2 = etiq(cut2, 625, 190, ["chaleur du", "compresseur"], { coul: ROUGE, gras: true });
    const m2 = D.heroine(cut2, { r: 30 });

    /* ---------- (3) le filtre déshydrateur, le détendeur électronique ---------- */
    const v3 = D.el("g", { opacity: 0 }, g);
    rect(v3, 24, 392, 266, 56, { fill: "url(#vm-cuivre)" }); rect(v3, 24, 402, 266, 36, { fill: LIQ, opacity: 0.85 });
    const gF = D.el("g", {}, v3), fluxIn = D.courant(gF, 24, 280, 402, 438, 5, 11);
    const cF = D.el("g", { opacity: 0 }, v3); cartouche(cF, 35, 377, 150, 86); D.image(cF, "filtre", 45, 387, 130, 65);
    const eFil = etiq(v3, 110, 504, ["filtre", "déshydrateur"], { ancre: "middle" });
    const cD = D.el("g", { opacity: 0 }, v3); cartouche(cD, 280, 300, 250, 270); D.image(cD, "detendeur", 300, 345, 210, 157.5);
    const cv = D.el("g", { opacity: 0 }, v3);
    const laiton = { fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 };
    rect(cv, 270, 330, 270, 282, Object.assign({ rx: 10 }, laiton));                     // le corps
    rect(cv, 290, 350, 230, 242, { fill: CLAIR });
    rect(cv, 290, 350, 230, 155, { fill: LIQ, opacity: 0.82 });                           // côté haute pression : liquide tiède
    const lp = D.liquide(cv, { x0: 290, x1: 520, yh: 523, yb: 592, niveau: () => 0.5, couleur: () => D.couleur(0.08, false), pas: 10 });
    const jet = rect(cv, 402, 523, 8, 40, { fill: D.couleur(0.2, false), opacity: 0 });
    D.el("polygon", { points: "290,505 392,505 400,523 290,523", fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, cv);       // le siège, avec son orifice
    D.el("polygon", { points: "420,505 520,505 520,523 412,523", fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, cv);
    rect(cv, 520, 529, 306, 56, { fill: "url(#vm-cuivre)" }); rect(cv, 520, 539, 296, 36, { fill: CLAIR });          // le tuyau de sortie
    const lpT = D.liquide(cv, { x0: 520, x1: 816, yh: 539, yb: 575, niveau: () => 0.55, couleur: () => D.couleur(0.08, false), pas: 10 });
    const bulles = D.bulles(cv, 9, 5, false);
    rect(cv, 340, 178, 130, 152, { rx: 8, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 });                // le moteur pas à pas
    rect(cv, 352, 190, 106, 132, { fill: CLAIR });
    [356, 426].forEach(x => { rect(cv, x, 200, 28, 100, { rx: 4, fill: "url(#vm-cuivre)", stroke: "#5a2c10", "stroke-width": 2 }); for (let k = 0; k < 7; k++) D.el("line", { x1: x + 3, x2: x + 25, y1: 208 + k * 13.5, y2: 208 + k * 13.5, stroke: "#5a2c10", "stroke-width": 2, opacity: 0.55 }, cv); });
    rect(cv, 388, 200, 36, 100, { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 });
    for (let k = 0; k < 9; k++) D.el("line", { x1: 388, x2: 424, y1: 208 + k * 10.5, y2: 208 + k * 10.5, stroke: "#4e5a66", "stroke-width": 1.8, opacity: 0.7 }, cv);
    rect(cv, 392, 326, 28, 8, { rx: 2, fill: "#7c5c18" });
    const pointeau = D.el("g", {}, cv);                                                  // la tige et le cône : à (0, yTip)
    rect(pointeau, 400, -240, 12, 222, { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 });
    D.el("polygon", { points: "392,-18 420,-18 412,0 400,0", fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, pointeau);
    const hPoint = rect(cv, 378, 490, 56, 46, { rx: 10, fill: "none", stroke: D.ORANGE, "stroke-width": 6, opacity: 0 });
    const eDet = etiq(cv, 500, 232, "détendeur électronique", { trait: [496, 226, 472, 226] });
    const eFer = etiq(cv, 556, 462, ["fermé à l'arrêt", "= électrovanne"], { coul: ROUGE, gras: true });
    const ev = D.el("g", { opacity: 0 }, cv);                                            // k5 : l'évaporateur à plaques, en petit
    rect(ev, 794, 520, 32, 65, { fill: "url(#vm-cuivre-h)" }); rect(ev, 802, 520, 16, 55, { fill: D.couleur(0.08, false) });
    [[874, 350, 32, 40, "url(#vm-cuivre-h)"], [880, 520, 20, 28, D.CUIVRE_EAU], [800, 352, 20, 40, D.CUIVRE_EAU]].forEach(([x, y, w, h, f]) => rect(ev, x, y, w, h, { fill: f }));
    rect(ev, 775, 380, 150, 140, { rx: 6, fill: "#d3dae2", stroke: "#56636f", "stroke-width": 3 });
    [775, 913].forEach(x => rect(ev, x, 380, 12, 140, { fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 2 }));
    for (let i = 0; i < 7; i++) { const x = 797 + i * 17, l = []; for (let k = 0; k <= 8; k++) l.push([x + (k % 2 ? 3.5 : -3.5), 388 + k * 15.5]); D.el("polyline", { points: pts(l), fill: "none", stroke: "#56636f", "stroke-width": 3, "stroke-linejoin": "round" }, ev); }
    const eFro = etiq(cv, 850, 640, "la frontière", { ancre: "middle", gras: true });
    const fFro = fleche(cv, 565, 470, 765, 470, D.ORANGE, 14);
    const m3 = D.heroine(v3, { r: 30 });

    const pa = pas(g, [["le compresseur", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["pression et température montent", ROUGE, T[1] + 0.1, E[1] + 0.3], ["l'air extérieur", BLEU, A(2, 0.45), E[2] + 0.3],
      ["je redeviens liquide", "#1e7e54", T[3] + 0.2, E[3] + 0.3], ["il fait aussi l'électrovanne", D.ORANGE, A(4, 0.62), E[4] + 0.3], ["me revoilà à la frontière", D.BLEU, T[5] + 0.2, DUR + 1]]);
    const ENT = [[50, 420], [150, 420], [270, 420], [345, 435]], PASSE = [[345, 435], [406, 478], [406, 512], [406, 545], [520, 553], [780, 553]];
    return function (t) {
      const w1 = 1 - doux(t, T[2] - 0.35, 0.4), w2 = doux(t, T[2] - 0.05, 0.4) * (1 - doux(t, T[4] - 0.4, 0.35)), w3 = doux(t, T[4] - 0.05, 0.4);
      op(v1, w1); op(v2, w2); op(v3, w3);

      /* ===== (1) le compresseur ===== */
      op(carte1, 1 - doux(t, A(0, 0.4), 0.5)); op(cut1, doux(t, A(0, 0.4), 0.5));
      const yp = D.courbe([[A(0, 0.45), TDC], [T[1] - 0.05, BDC], [T[1] + 0.15, BDC], [E[1] - 0.25, TDC]], t), prog = t < T[1] ? 0 : (BDC - yp) / (BDC - TDC);      // la compression : 0 pendant l'aspiration, 1 piston en haut
      piston.setAttribute("transform", "translate(0 " + f1(yp) + ")");
      bielle.setAttribute("y", f1(yp + 50)); bielle.setAttribute("height", f1(650 - yp - 50));
      chambre.setAttribute("fill", melange("#f3f6fa", "#fbd2b4", prog));
      clapA.setAttribute("transform", "rotate(" + f1(30 * D.fenetre(t, A(0, 0.45) - 0.1, T[1] + 0.05, 0.2)) + " 412 352)");
      clapR.setAttribute("transform", "rotate(" + f1(30 * D.fenetre(t, E[1] - 0.4, E[1] + 0.9, 0.2)) + " 650 349)");
      MOLS.forEach(m => {
        const vis = doux(t, A(0, 0.62) + m.e * (T[1] - A(0, 0.62)), 0.3) * (1 - doux(t, E[1] - 0.1 + m.e * 0.4, 0.25));
        m.maj(420 + m.u * 220 + Math.sin(t * 1.7 + m.ph) * 5, 364 + m.v * Math.max(4, yp - 392) + Math.cos(t * 1.4 + m.ph) * 3, D.lerp(0.15, 0.62, prog), true, vis * 0.9);
      });
      /* l'héroïne : le tuyau d'aspiration, la chambre qui se remplit, puis le serrage et la sortie par le refoulement */
      const tIn = E[0] + 0.3, mi = doux(t, tIn, 0.6), sIn = D.courbe([[A(0, 0.4), 0], [tIn, LE]], t, true), [ex, ey, ea] = suivreD(ENTREE, sIn);
      const cx = 530 + Math.sin(t * 1.3) * 12, cy = 350 + Math.max(16, (yp - 350) / 2) + Math.sin(t * 2.1) * 3;
      let hx = D.lerp(ex, cx, mi), hy = D.lerp(ey, cy, mi), ec = 0.95 * D.lisse(prog * 1.25);
      const sOut = D.courbe([[E[1] - 0.2, 0], [E[1] + 1.0, LS]], t, true), sortie = doux(t, E[1] - 0.2, 0.15);
      if (sortie > 0) { const [ox, oy] = suivreD(SORTIE, sOut); hx = D.lerp(hx, ox, sortie); hy = D.lerp(hy, oy, sortie); ec *= 1 - D.lisse((sOut - 40) / 80); }
      const temp1 = D.lerp(0.15, 0.62, prog), hum1 = t < A(0, 0.4) ? "sourire" : t < T[1] + 0.5 ? "surprise" : "chaud";
      m1({ x: hx, y: hy, s: 0.7, t: t, temp: temp1, etat: "vapeur", humeur: hum1, ecrase: ec, regard: [Math.cos(ea) * (1 - mi), 0.3], op: doux(t, A(0, 0.4) + 0.1, 0.4) });

      /* ===== (2) le condenseur ===== */
      op(carte2, 1 - doux(t, A(2, 0.18), 0.5)); op(cut2, doux(t, A(2, 0.18), 0.5));
      vA(t * 520); vB(t * 520 + 40);
      const sH = D.courbe([[A(2, 0.8), 20], [T[3] + 0.3, SC0], [E[3] - 0.6, SC1], [T[4] - 0.1, SCT - 30]], t, true), u = uC(sH);
      const [qx, qy, qa] = suivreD(PCOND, sH);
      const etat2 = u < 0.25 ? "vapeur" : u < 0.7 ? "bout" : "liquide";
      const temp2 = u < 0.25 ? D.lerp(0.62, 0.5, u / 0.25) : u < 0.7 ? 0.5 : D.lerp(0.5, 0.45, (u - 0.7) / 0.3), hum2 = u < 0.25 ? "chaud" : u < 0.7 ? "surprise" : "sourire";
      m2({ x: qx, y: qy, s: 0.46, t: t, temp: temp2, etat: etat2, humeur: hum2, regard: [Math.cos(qa), Math.sin(qa)], op: doux(t, A(2, 0.8), 0.3) * (1 - doux(t, T[4], 0.3)) });
      flLiq(t, 0.1, 1);
      VM.forEach(m => {
        const s = SC0 - 130 + D.frac(m.k + t * 0.045) * (0.52 * (SC1 - SC0) + 130), [x, y] = suivreD(PCOND, s), uu = uC(s);
        m.maj(x, y, 0.58, true, D.fenetre(D.frac(m.k + t * 0.045), 0, 1, 0.1) * (1 - D.lisse((uu - 0.3) / 0.2)));
      });
      const lair = doux(t, A(2, 0.45), 0.6);
      air.forEach(a => {
        const f = D.frac(a.k * 0.37 + a.j / 2 + t * 0.28), y = 636 - f * 226;
        a.maj(a.x, y, 180, D.couleur(D.lerp(0.12, 0.7, D.lisse((606 - y) / 170)), false), D.fenetre(f, 0, 1, 0.07) * lair * 0.9);
      });
      const kciel = 1 - doux(t, T[3] + 0.2, 0.5);
      ciel.forEach(a => { const f = D.frac(a.i * 0.43 + a.j / 2 + t * 0.3); a.maj(a.x, 262 - f * 104, 180, AIR_CHAUD, D.fenetre(f, 0, 1, 0.1) * lair * kciel * 0.95); });
      op(fH1, doux(t, A(3, 0.12), 0.5)); op(fH2, doux(t, A(3, 0.4), 0.5));
      op(eH1, doux(t, A(3, 0.15), 0.4)); op(eH2, doux(t, A(3, 0.43), 0.4));

      /* ===== (3) le filtre, le détendeur électronique ===== */
      const lift = D.courbe([[0, 6], [A(4, 0.46), 6], [A(4, 0.5), 12], [A(4, 0.54), 5], [A(4, 0.58), 12], [A(4, 0.62), 8], [A(4, 0.76), 0], [T[5] + 0.15, 0], [T[5] + 0.85, 28], [DUR, 28]], t), yTip = 523 - lift, q = D.borne(lift / 6, 0, 1);
      pointeau.setAttribute("transform", "translate(0 " + f1(yTip) + ")");
      op(gF, q);
      fluxIn(t, 90);
      op(cF, doux(t, T[4] + 0.1, 0.4)); op(eFil, doux(t, T[4] + 0.3, 0.4));
      op(cD, doux(t, A(4, 0.25), 0.4) * (1 - doux(t, A(4, 0.38), 0.45))); op(cv, doux(t, A(4, 0.38), 0.5));
      fen(eDet, t, A(4, 0.44), DUR + 1, 0.4); fen(eFer, t, A(4, 0.72), T[5] + 0.1, 0.4);
      op(hPoint, D.fenetre(t, A(4, 0.76), T[5] + 0.1, 0.3) * (0.55 + 0.4 * Math.sin(t * 6)));
      op(jet, 0.9 * q); jet.setAttribute("height", f1(30 + lift));
      lp.maj(t); lpT.maj(t);
      bulles(t, (p, b) => { const x = 300 + p * 500; return [x, x < 520 ? 584 : 570, (x < 520 ? lp : lpT).surface(x, t) + 4, q * (t > T[5] ? 1 : 0.7), "#fff"]; });
      op(ev, doux(t, A(5, 0.5), 0.5)); op(eFro, doux(t, A(5, 0.5), 0.5)); op(fFro, doux(t, A(5, 0.5), 0.5));
      /* l'héroïne : le tuyau d'arrivée, la chambre haute pression, puis l'orifice, la basse pression, la sortie */
      let x3, y3, ang3 = 0, temp3 = 0.45, hum3 = "sourire", ec3 = 0;
      const tHP = A(4, 0.38) + 0.3, tPass = T[5] + 0.5;
      if (t < tHP) { [x3, y3, ang3] = suivreD(ENT, D.courbe([[T[4] + 0.3, 0], [tHP, longueur(ENT)]], t, true)); }
      else if (t < tPass) { x3 = 345 + Math.sin(t * 1.6) * 14; y3 = 435 + Math.sin(t * 2.3) * 8; }
      else {
        const sP = D.courbe([[tPass, 0], [E[5] - 0.1, longueur(PASSE)]], t, true); [x3, y3, ang3] = suivreD(PASSE, sP);
        temp3 = D.lerp(0.45, 0.08, D.lisse((y3 - 500) / 40)); ec3 = 0.9 * D.fenetre(y3, 494, 535, 12) * (x3 < 430 ? 1 : 0);
        hum3 = y3 < 500 ? "sourire" : y3 < 535 && x3 < 430 ? "surprise" : "froid";
      }
      m3({ x: x3, y: y3, s: 0.55, t: t, temp: temp3, etat: "liquide", humeur: hum3, ecrase: ec3, regard: [Math.cos(ang3), Math.sin(ang3)], op: doux(t, T[4] + 0.3, 0.4) });
      montrer(pa, t);

      /* ===== ce que la carte et le diagramme voient ===== */
      let temp, etat, humeur;
      if (t < T[2]) { temp = temp1; etat = "vapeur"; humeur = hum1; }
      else if (t < T[4]) { temp = t < A(2, 0.8) ? 0.62 : temp2; etat = t < A(2, 0.8) ? "vapeur" : etat2; humeur = t < A(2, 0.8) ? "chaud" : hum2; }
      else { temp = temp3; etat = "liquide"; humeur = hum3; }
      const diag = t < T[2] ? 3 + prog : t < T[3] ? D.lerp(4, 5, D.borne((t - T[2]) / (E[2] - T[2]), 0, 1)) : t < T[4] ? 5 + 2 * D.lisse(u) : t < T[5] ? 7 : D.lerp(7, 8, D.lisse((y3 - 498) / 50 * (x3 > 380 ? 1 : 0)));
      const carte = D.courbe([[T[0], 3], [E[0], 6], [T[1], 6], [E[1], 6.9], [T[2], 6.9], [E[2], 8], [T[3], 8], [E[3], 8.9], [T[4], 9], [E[4], 11], [T[5], 11], [E[5], 14.5]], t, true);
      return { temp: temp, etat: etat, humeur: humeur, carte: carte, diag: diag, diag0: 3 };
    };
  };

})();
