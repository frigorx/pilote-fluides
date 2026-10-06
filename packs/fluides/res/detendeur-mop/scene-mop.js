/* =====================================================================
   scene-mop.js — gare 3 « Le détendeur MOP » : les dessins qui vivent
   ---------------------------------------------------------------------
   RÔLE : une fonction par écran qui dessine. app.js les appelle dans render() :
     MOP_SCENES.accueil(hote)              le dessin du sommaire
     MOP_SCENES.identite(hote)             écran 1 : carte d'identité (coupe au repos, bulbe ouvert, visite guidée)
     MOP_SCENES.bulbe(hote)                écran 2 : le bulbe à charge limitée (pas à pas, gros plan du bulbe)
     MOP_SCENES.chambreChaude(hote)        écran 3 : sans MOP / avec MOP côte à côte (pas à pas)
     MOP_SCENES.exo(hote, etat)            écran 4 : où monter la tête ? (l'élève choisit A, B ou C)
   BRIQUES AJOUTÉES (absentes de DETENDEURS_SCENES) :
     · « bulbe » : un bulbe OUVERT EN COUPE (paroi, petite charge : nappe de liquide au fond, bulles qui naissent
       au fond, vapeur en petites molécules ; il brille quand il chauffe) ;
     · « construire » : la coupe du détendeur thermostatique (tête à membrane, aiguille, ressort) devant son
       évaporateur, avec le bulbe ouvert, le capillaire, une jauge de BP (avec son trait « plafond »), une jauge
       d'intensité du moteur, deux thermomètres (tête, bulbe) ; la charge peut MIGRER vers la tête ;
     · « construireBulbe » : le gros plan du bulbe (manomètre sur le capillaire, thermomètre sur le tube).
   Les briques communes (DS.bande, DS.manometre, DS.thermometre, DS.jouer, DS.animer, DS.fond, DS.svg) viennent de
   ../_detendeurs-commun/scenes-detendeurs.js ; le dessin de base, de VOYAGE_DESSIN.
   RÈGLES TENUES : valeurs QUALITATIVES (aucun chiffre) ; texte jamais sur un tracé (légendes en HTML, pastilles dans
   des espaces libres) ; le liquide se voit liquide (nappe, bulles qui naissent au fond, vapeur en petites molécules) ;
   FLUIDE CONTINU : un tube = une paroi + un intérieur d'un seul tenant, un coude = une courbe, le vide d'un tube
   TRAVERSE la paroi du corps où il entre (capillaire dans le bulbe et dans la tête, raccords des jauges) ; filigrane
   inerWeb (R9) derrière chaque dessin ; rien n'est animé en CSS.
   MODÈLE (qualitatif) : T = température du tube de sortie = du bulbe (0 froid … 1 chaud).
     pression d'un bulbe ordinaire : sat(T) = 0,10 + 0,90 · T^1,3 ;
     pression d'un bulbe MOP : pareille jusqu'à T_MOP (tout le liquide est parti), puis presque plate (pente 0,05).
     ouverture = 0,5 + 3 · (pression du bulbe − BP − ressort) ; BP « plafond » = pression du bulbe MOP − ressort.
     moteur = 0,15 + 0,9 · BP (la vapeur dense à l'aspiration fait forcer le moteur).
   ===================================================================== */
(function () {
  "use strict";
  const DS = window.DETENDEURS_SCENES, D = window.VOYAGE_DESSIN;
  const G = window.MOP_SCENES = {};
  if (!DS || !D) { console.warn("scene-mop.js : DETENDEURS_SCENES absent."); return; }
  const el = D.el, lerp = D.lerp, bn = D.borne, frac = D.frac;
  const H = 360, KM = 0.7, CLAIR = "#f4f8fc", CUIVRE = "#a9672f", NAVY = "#1b3a63";
  const ROUGE = "#c9451a", BLEU = "#3d7fca";
  const NY0 = 238;                                  // haut de l'aiguille fermée
  let uid = 0;                                      // identifiants uniques (clipPath)

  /* ---------- le modèle qualitatif ---------- */
  const T_MOP = 0.55, PENTE = 0.05, RESSORT = 0.08;
  const sat = T => 0.10 + 0.90 * Math.pow(bn(T, 0, 1), 1.3);
  const pBulbe = (T, mop) => mop ? (T <= T_MOP ? sat(T) : sat(T_MOP) + PENTE * (T - T_MOP) / (1 - T_MOP)) : sat(T);
  const P_PLAF = sat(T_MOP) - RESSORT + 0.03;       // le trait « plafond » de la jauge de BP
  const niveauCharge = (T, mop) => mop ? 0.5 * Math.pow(bn(1 - T / T_MOP, 0, 1), 0.8) : 0.55 * (1 - 0.25 * bn(T, 0, 1));
  const CHOIX = { A: { tete: 0.05, migre: 1, air: 1 }, B: { tete: 0.55, migre: 0, air: 0 }, C: { tete: 0.12, migre: 1, air: 0 } };

  /* ---------- outils : chemin, mélange après l'orifice, anneau « la pièce qui agit » ---------- */
  function chemin(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L[i] = L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const len = L[L.length - 1];
    return { len: len, at: function (s) {
      s = bn(s, 0, len); let i = 1;
      while (i < L.length - 1 && s > L[i]) i++;
      const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f), pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]];
    } };
  }
  function melange(g, ch, n, graine) {
    const r = D.alea(graine), P = [], gg = el("g", {}, g), gm = el("g", { transform: "scale(" + KM + ")" }, g);
    for (let i = 0; i < n; i++) {
      const vap = i % 3 === 0;
      P.push({ ph: i / n, vap: vap, dy: (r() - 0.5) * 14, e: vap ? D.mol(gm) : el("circle", { r: 3.5 + r() * 2, fill: D.couleur(0.12, false), stroke: "#fff", "stroke-width": 1.2 }, gg) });
    }
    return function (t, dens, vit) {
      P.forEach((p, i) => {
        const q = frac(p.ph + t * vit), a = ch.at(q * ch.len), h = Math.hypot(a[2], a[3]) || 1;
        const x = a[0] - a[3] / h * p.dy, y = a[1] + a[2] / h * p.dy, vis = (i / n) < dens ? D.fenetre(q, 0, 1, 0.1) : 0;
        if (p.vap) p.e(x / KM, y / KM, 0.1, true, vis * 0.9);
        else { p.e.setAttribute("cx", x.toFixed(1)); p.e.setAttribute("cy", y.toFixed(1)); p.e.setAttribute("opacity", vis.toFixed(2)); p.e.setAttribute("fill", D.couleur(0.08, false)); }
      });
    };
  }
  function anneau(g) {
    const r = el("rect", { rx: 12, fill: "none", stroke: "#ff6b35", "stroke-width": 5, opacity: 0 }, g);
    return function (zone, t) {
      if (!zone) { r.setAttribute("opacity", 0); return; }
      r.setAttribute("x", zone[0]); r.setAttribute("y", zone[1]); r.setAttribute("width", zone[2]); r.setAttribute("height", zone[3]);
      r.setAttribute("opacity", (0.65 + 0.35 * Math.sin(t * 5)).toFixed(2));
    };
  }
  /* deux anneaux au plus : une pièce qui agit, ou deux ; `agit` est un nom, une liste de noms ou rien */
  function anneaux(g, ZONES) {
    const A = [anneau(g), anneau(g)];
    return function (agit, t) {
      const liste = (agit == null ? [] : Array.isArray(agit) ? agit : [agit]).map(k => ZONES[k]).filter(Boolean);
      A.forEach((a, i) => a(liste[i] || null, t));
    };
  }

  /* ---------- le BULBE ouvert en coupe : paroi d'acier, intérieur clair, petite charge ----------
     maj({ niv (0..1 de la hauteur), T, boil (0..1), pres (0..1) }, t) : la nappe de liquide au fond (niv), les bulles qui
     naissent au fond (boil), la vapeur au-dessus en petites molécules (plus il y en a, plus la pression est haute).
     Le vide du capillaire doit TRAVERSER la paroi du bulbe : l'appelant redessine son intérieur par-dessus. */
  function bulbe(g, x0, y0, w, h, graine) {
    const e = 6, xi = x0 + e, yi = y0 + e, wi = w - 2 * e, hi = h - 2 * e, ri = Math.min(10, hi / 2);
    el("rect", { x: x0, y: y0, width: w, height: h, rx: ri + e, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    const chaud = el("rect", { x: x0, y: y0, width: w, height: h, rx: ri + e, fill: "#ff6b35", opacity: 0 }, g);
    el("rect", { x: xi, y: yi, width: wi, height: hi, rx: ri, fill: CLAIR }, g);
    const cid = "mp-bulbe-" + (++uid), cp = el("clipPath", { id: cid }, g);
    el("rect", { x: xi, y: yi, width: wi, height: hi, rx: ri }, cp);
    const gc = el("g", { "clip-path": "url(#" + cid + ")" }, g);
    let niv = 0.3;
    const nap = D.liquide(gc, { x0: xi, x1: xi + wi, yh: yi, yb: yi + hi, niveau: () => niv, couleur: () => D.couleur(0.08, false), pas: 8, opacite: 0.88 });
    const r = D.alea(graine || 3), gb = el("g", {}, gc), Bu = [];
    for (let i = 0; i < 9; i++) Bu.push({ p: r(), per: 1.2 + r() * 1.0, ph: r() * 3, rr: 1.8 + r() * 2.2, c: el("circle", { fill: "rgba(255,255,255,.3)", stroke: "#fff", "stroke-width": 1.6 }, gb) });
    const KB = 0.5, gm = el("g", { transform: "scale(" + KB + ")" }, gc), V = [];
    for (let i = 0; i < 10; i++) V.push({ u: r(), v: r(), ph: r() * 6.28, maj: D.mol(gm) });
    function maj(s, t) {
      niv = bn(s.niv, 0, 1);
      nap.maj(t);
      const nbBulles = niv > 0.04 ? s.boil : 0;
      Bu.forEach(b => {                              // une bulle naît au fond de la nappe, monte, éclate à sa surface
        const cyc = Math.floor((t + b.ph) / b.per), f = frac((t + b.ph) / b.per), xs = xi + 10 + frac(b.p + cyc * 0.618) * (wi - 20);
        b.c.setAttribute("cx", xs.toFixed(1)); b.c.setAttribute("cy", lerp(yi + hi - 3, nap.surface(xs, t) + 2, f).toFixed(1));
        b.c.setAttribute("r", lerp(1.2, b.rr, f).toFixed(1)); b.c.setAttribute("opacity", (nbBulles * D.fenetre(f, 0, 1, 0.12)).toFixed(2));
      });
      const n = Math.round(2 + 8 * bn(s.pres / 0.9, 0, 1)), col = D.couleur(0.2 + 0.5 * bn(s.T, 0, 1), true);
      V.forEach((m, i) => {                          // la vapeur : de petites molécules séparées, plus nombreuses quand la pression monte
        const x = xi + 9 + m.u * (wi - 18) + 3 * Math.sin(t * 1.7 + m.ph), ymin = yi + 6, ymax = nap.surface(x, t) - 6;
        const y = ymin + m.v * Math.max(0, ymax - ymin) + 2 * Math.sin(t * 2.3 + m.ph);
        m.maj(x / KB, y / KB, 0.2 + 0.5 * bn(s.T, 0, 1), true, i < n && ymax - ymin > 8 ? 0.9 : 0);
      });
      chaud.setAttribute("opacity", (0.7 * bn((s.T - 0.18) / 0.5, 0, 1)).toFixed(2));
    }
    return { maj: maj };
  }

  /* un tube mince : paroi de cuivre (dessinée tout de suite) ; l'intérieur clair se dessine plus tard, par-dessus */
  function paroi(g, d, ep) { el("path", { d: d, fill: "none", stroke: CUIVRE, "stroke-width": ep, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g); }
  function vide(g, d, ep) { return el("path", { d: d, fill: "none", stroke: CLAIR, "stroke-width": ep, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g); }
  const flecheH = (x, y0, h) => "M " + (x - 4) + " " + y0 + " V " + (y0 + h - 12) + " H " + (x - 11) + " L " + x + " " + (y0 + h) + " L " + (x + 11) + " " + (y0 + h - 12) + " H " + (x + 4) + " V " + y0 + " Z";
  const flecheB = (x, y0, h) => "M " + (x - 4) + " " + y0 + " V " + (y0 - h + 12) + " H " + (x - 11) + " L " + x + " " + (y0 - h) + " L " + (x + 11) + " " + (y0 - h + 12) + " H " + (x + 4) + " V " + y0 + " Z";

  /* =====================================================================
     LA COUPE COMPLÈTE : détendeur + évaporateur + bulbe ouvert (+ jauges), pour une largeur W
     ===================================================================== */
  function construire(svg, W, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const etiquettes = !opt.accueil, g = el("g", {}, svg);
    const X0 = 184, XEND = W + 30, L = XEND - X0;
    const YT = 194, YH = 204, YB = 240;               // dessus de la paroi du tube ; intérieur haut et bas
    const xb1 = W - 110, xb0 = xb1 - 150, yb0 = 140, yb1 = 196;   // le bulbe : posé sur le tube de sortie
    const xc = xb0 + 28;                              // où le capillaire quitte le bulbe
    const xfBon = (xb0 - 20 - X0) / L;
    const xmBP = Math.min(Math.round((X0 + xb0) / 2) + 10, xb0 - 46), xmM = W - 52, xTh = 244, xTb = W - 64;
    const capD = y0 => "M " + xc + " " + y0 + " V 48 Q " + xc + " 34 " + (xc - 14) + " 34 H 124 Q 110 34 110 48";

    // ----- 1. le capillaire du bulbe (sa paroi, derrière tout) ; l'ambiance autour de la tête (exercice) -----
    paroi(g, capD(yb0), 7);
    const teinte = opt.thermos ? el("rect", { x: 28, y: 44, width: 164, height: 112, rx: 16, fill: "#9fc8f0", opacity: 0 }, g) : null;

    // ----- 2. l'évaporateur, les raccords des jauges, la vapeur dense à l'aspiration, la chaleur de la chambre -----
    const bandeE = DS.bande(g, { x0: X0, x1: XEND, yh: YH, yb: YB, graine: 11, nbMols: Math.max(8, Math.round(L / 56)), nbBulles: Math.max(10, Math.round(L / 26)), prof: [0.8, 0.2], vapSurNappe: 0.2 });
    if (opt.bp) { paroi(g, "M " + xmBP + " 156 V " + YT, 9); }
    const gD = el("g", { transform: "scale(" + KM + ")" }, g), rD = D.alea(23), Dn = [];
    for (let i = 0; i < 22; i++) Dn.push({ s: (i + rD()) / 22, ry: rD(), ph: rD() * 6.28, maj: D.mol(gD) });
    const nbH = Math.max(2, Math.floor((W - 60 - X0 - 50) / 70) + 1), chaleurs = [];
    for (let i = 0; i < nbH; i++) chaleurs.push({ x: X0 + 50 + i * ((W - 60 - X0 - 50) / (nbH - 1)), f: i / nbH, maj: D.chaleur(el("g", {}, g)) });

    // ----- 3. le détendeur : corps, chambres, siège, aiguille, ressort, tige, tête à membrane -----
    el("rect", { x: 36, y: 150, width: 148, height: 180, rx: 12, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2.5 }, g);
    const clair = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: CLAIR }, g);
    const lanc = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: D.couleur(0.62, false), opacity: 0.88 }, g);
    clair(58, 150, 104, 94);                                                          // la chambre basse pression, sous la membrane
    const brume = el("rect", { x: 58, y: 150, width: 104, height: 94, fill: D.couleur(0.1, false), opacity: 0 }, g);
    el("rect", { x: 58, y: 244, width: 40, height: 12, fill: "#8a6a1f" }, g); el("rect", { x: 122, y: 244, width: 40, height: 12, fill: "#8a6a1f" }, g);   // le siège
    clair(58, 256, 104, 62); lanc(58, 256, 104, 62);                                  // la chambre haute pression
    D.tube(g, 0, 262, 44, 44, "cuivre", false, CLAIR);                                // la conduite HP qui arrive
    clair(36, 272, 26, 24); lanc(0, 272, 62, 24);                                     // l'ouverture de la paroi : le liquide passe sans trait en travers
    clair(162, 204, 26, 36);                                                          // l'ouverture vers l'évaporateur
    const gidB = "mp-brume-" + (++uid), gB = el("linearGradient", { id: gidB, x1: 0, x2: 1, y1: 0, y2: 0 }, g);   // la brume de l'ouverture s'efface vers l'évaporateur : aucune arête
    el("stop", { offset: 0, "stop-color": D.couleur(0.1, false), "stop-opacity": 1 }, gB); el("stop", { offset: 1, "stop-color": D.couleur(0.1, false), "stop-opacity": 0 }, gB);
    const brume2 = el("rect", { x: 162, y: 204, width: 26, height: 36, fill: "url(#" + gidB + ")", opacity: 0 }, g);
    const fluxP = D.courant(g, 2, 58, 274, 294, 4, 31), fluxC = D.courant(g, 62, 158, 262, 312, 4, 33);
    const mel = melange(g, chemin([[110, 252], [110, 224], [172, 224], [214, 224]]), 14, 17);
    const tige = el("rect", { x: 108, width: 4, fill: "#3f4a55" }, g);
    const aig = el("path", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const ressort = el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
    el("rect", { x: 90, y: 312, width: 40, height: 6, fill: "url(#vm-acier)" }, g);
    el("rect", { x: 94, y: 330, width: 32, height: 12, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);   // la vis de réglage du ressort
    el("path", { d: "M 40 150 V 100 Q 40 56 110 56 Q 180 56 180 100 V 150 Z", fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2.5 }, g);   // la tête
    const chambre = el("path", { fill: "#fff" }, g);                                  // la chambre de la tête : la charge, au-dessus de la membrane
    const cidT = "mp-tete-" + (++uid), cpT = el("clipPath", { id: cidT }, g), cpP = el("path", {}, cpT);
    const gT = el("g", { "clip-path": "url(#" + cidT + ")" }, g);
    let ysT = 170;                                                                    // la surface du liquide qui migre vers la tête
    const poolT = D.liquide(gT, { x0: 58, x1: 162, yh: 70, yb: 172, niveau: () => bn((172 - ysT) / 102, 0, 1), couleur: () => D.couleur(0.08, false), pas: 8, opacite: 0.88 });
    const mT = el("g", { transform: "scale(0.5)" }, g), rT = D.alea(41), VT = [];
    for (let i = 0; i < 9; i++) VT.push({ u: rT(), v: rT(), ph: rT() * 6.28, maj: D.mol(mT) });
    const membrane = el("path", { fill: "none", stroke: "#24384f", "stroke-width": 5, "stroke-linecap": "round" }, g);
    const bas = [84, 136].map(() => el("path", { fill: "#fff", stroke: ROUGE, "stroke-width": 2.5, "stroke-linejoin": "round" }, g));      // la pression du bulbe, qui pousse vers le bas
    const haut = [84, 136].map(() => el("path", { fill: BLEU, stroke: "#fff", "stroke-width": 1.5, "stroke-linejoin": "round" }, g));      // la BP + le ressort, qui poussent vers le haut
    el("rect", { x: 100, y: 48, width: 20, height: 14, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);        // l'écrou du capillaire

    // ----- 4. le bulbe, ouvert en coupe, posé sur le tube de sortie -----
    const bulb = bulbe(g, xb0, yb0, xb1 - xb0, yb1 - yb0, 5);
    [xb0 + 62, xb1 - 22].forEach(x => el("rect", { x: x, y: yb0 - 4, width: 8, height: 64, rx: 3, fill: "#5d6b7a" }, g));   // les colliers

    // ----- 5. le capillaire : son vide traverse l'écrou, la tête, la paroi du bulbe (d'un seul tenant) ; le liquide qui migre -----
    const dVide = capD(yb0 + 9) + " V 82";
    vide(g, dVide, 3);
    const fil = el("path", { d: dVide, fill: "none", stroke: D.couleur(0.08, false), "stroke-width": 3, "stroke-linecap": "butt", "stroke-linejoin": "round", "stroke-dasharray": "0 9999" }, g);
    let longueurFil = 400; try { longueurFil = fil.getTotalLength(); } catch (_) {}

    // ----- 6. jauges, thermomètres, pastilles, chevrons d'air, anneau -----
    let mBP = null, mMot = null, thT = null, thB = null;
    if (opt.bp) {
      mBP = DS.manometre(g, xmBP, 130, 34);
      const a = lerp(-115, 115, P_PLAF) * Math.PI / 180, c = Math.sin(a), s = Math.cos(a);
      el("line", { x1: xmBP + 36 * c, y1: 130 - 36 * s, x2: xmBP + 46 * c, y2: 130 - 46 * s, stroke: ROUGE, "stroke-width": 6, "stroke-linecap": "round" }, g);   // le plafond
      vide(g, "M " + xmBP + " 158 V 208", 4);          // le vide du raccord traverse la paroi du tube et le bord de la jauge
      if (etiquettes) D.pastille(g, xmBP, 66, "BP", NAVY, 22, "middle");
    }
    if (opt.moteur) {
      mMot = DS.manometre(g, xmM, 130, 34);
      el("path", { d: "M " + (xmM + 34) + " 130 H " + (W + 10), fill: "none", stroke: "#637285", "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, g);
      if (etiquettes) D.pastille(g, xmM, 66, "moteur", NAVY, 22, "middle");
    }
    if (opt.thermos) {
      thT = DS.thermometre(g, xTh, 176, 96); thB = DS.thermometre(g, xTb, 186, 106);
      if (etiquettes) { D.pastille(g, xTh, 66, "tête", NAVY, 22, "middle"); D.pastille(g, xTb, 66, "bulbe", NAVY, 22, "middle"); }
    }
    const chev = opt.thermos ? [0, 1, 2, 3, 4, 5].map(() => D.chevron(el("g", {}, g))) : [];
    const voirZones = anneaux(el("g", {}, g), {
      evaporateur: [X0 - 6, 186, W - 20 - X0 + 6, 110],
      bulbe: [xb0 - 10, yb0 - 10, xb1 - xb0 + 20, yb1 - yb0 + 18],
      membrane: [46, 118, 130, 64],
      aiguille: [82, 228, 56, 76],
      tete: [32, 48, 156, 108],
      bp: [xmBP - 46, 44, 92, 124],
      moteur: [xmM - 46, 44, 92, 124],
      thermoT: [xTh - 30, 44, 66, 150],
      thermoB: [xTb - 30, 44, 66, 170]
    });

    // ----- l'état : lissage de la migration de la charge (exercice) -----
    let tPrec = 0, amorce = false, mig = 0, air = 0, tp = 0.3;
    function maj(e, t, info) {
      e = e || {};
      const dt = bn(t - tPrec, 0, 0.1); tPrec = t;
      const T = e.T === undefined ? 0.3 : e.T, mop = e.mop === undefined ? 1 : e.mop, bp = e.bp === undefined ? 0.21 : e.bp;
      let tete = e.tete === undefined ? T : e.tete, migC = e.migre || 0, airC = 0, choisi = false;
      if (opt.exo) { const c = CHOIX[e.cle]; choisi = !!c; tete = c ? c.tete : T; migC = c ? c.migre : 0; airC = c ? c.air : 0; }
      const lis = opt.exo && amorce ? Math.min(1, dt * 1.5) : 1; amorce = true;
      mig += (migC - mig) * lis; air += (airC - air) * lis; tp += (tete - tp) * lis;
      const pB0 = pBulbe(T, mop), pB = tp < T ? lerp(pB0, Math.min(pB0, sat(tp)), mig) : pB0;
      const ouv = bn(0.5 + 3 * (pB - bp - RESSORT), 0.03, 1);
      const sortie = 0.10 + 0.55 * T, xf = xfBon * bn(0.3 + 0.9 * ouv, 0.12, 1.2);
      const gap = 18 * ouv, dm = 0.8 * gap, ny = NY0 + gap;
      // l'évaporateur : la nappe, les bulles, la vapeur ; la vapeur dense qui part vers le compresseur
      bandeE.maj({ xf: xf, flash: 0.4 + 0.6 * ouv, froid: 1, sortie: sortie }, t);
      const dens = bn((bp - 0.10) / 0.7, 0, 1);
      Dn.forEach((p, i) => { const f = frac(p.s + t * 0.07), x = lerp(xb0 - 30, XEND, f), y = YH + 13 + p.ry * (YB - YH - 26) + 2 * Math.sin(t * 3 + p.ph); p.maj(x / KM, y / KM, sortie, true, (i / Dn.length) < dens ? D.fenetre(f, 0, 1, 0.1) * 0.9 : 0); });
      chaleurs.forEach(h => { const q = frac(h.f + t * 0.5); h.maj(h.x, 266 + 6 * (1 - q), 180, D.fenetre(q, 0, 1, 0.25) * (0.45 + 0.55 * T)); });
      // le détendeur
      aig.setAttribute("d", "M 103 " + ny.toFixed(1) + " H 117 L 132 " + (ny + 34).toFixed(1) + " H 88 Z");
      let d = "M 110 " + (ny + 34).toFixed(1); const top = ny + 34, bot = 312;
      for (let k = 1; k <= 8; k++) d += " L " + (k % 2 ? 94 : 126) + " " + (top + (bot - top) * k / 8).toFixed(1);
      ressort.setAttribute("d", d + " L 110 312");
      tige.setAttribute("y", (150 + dm).toFixed(1)); tige.setAttribute("height", (ny + 2 - 150 - dm).toFixed(1));
      const cd = "M 58 150 V 100 Q 58 70 110 70 Q 162 70 162 100 V 150 Q 110 " + (150 + 2 * dm).toFixed(1) + " 58 150 Z";
      chambre.setAttribute("d", cd); cpP.setAttribute("d", cd);
      membrane.setAttribute("d", "M 58 150 Q 110 " + (150 + 2 * dm).toFixed(1) + " 162 150");
      ysT = 150 + dm - 26 * mig;                                                            // le liquide de la charge, arrivé dans la tête
      const nT = Math.round(2 + 7 * bn(pB / 0.9, 0, 1) * (1 - 0.6 * mig));
      VT.forEach((m, i) => { const x = 66 + m.u * 88 + 2 * Math.sin(t * 1.9 + m.ph), y = 80 + m.v * 50 + 2 * Math.sin(t * 2.4 + m.ph); m.maj(x * 2, y * 2, 0.2 + 0.5 * T, true, i < nT ? 0.9 : 0); });
      const hb = 6 + 46 * pB, hh = 6 + 46 * (bp + RESSORT);
      bas.forEach((p, k) => p.setAttribute("d", flecheH([84, 136][k], 82, hb)));
      haut.forEach((p, k) => p.setAttribute("d", flecheB([84, 136][k], 212, hh)));
      brume.setAttribute("opacity", (0.35 * (0.2 + ouv)).toFixed(2)); brume2.setAttribute("opacity", (0.35 * (0.2 + ouv)).toFixed(2));
      fluxP(t, 55 + 90 * ouv); fluxC(t, 55 + 90 * ouv);
      mel(t, 0.2 + 0.8 * ouv, 0.12 + 0.12 * ouv);
      // le bulbe et son capillaire
      const niv = niveauCharge(T, mop) * (1 - mig);
      bulb.maj({ niv: niv, T: T, boil: bn(0.25 + 0.75 * (T - 0.1) / 0.45, 0, 1), pres: pB }, t);
      fil.setAttribute("stroke-dasharray", (longueurFil * mig).toFixed(1) + " " + (longueurFil + 20));
      gT.setAttribute("opacity", bn(mig * 6, 0, 1) < 0.02 ? 0 : 1);
      poolT.maj(t);
      // les jauges et thermomètres
      if (mBP) mBP.maj(bp);
      if (mMot) mMot.maj(bn(0.15 + 0.9 * bp, 0, 1));
      if (thT) {
        thT.maj(tp); thB.maj(T); thT.g.setAttribute("opacity", choisi ? 1 : 0.35);
        const froid = bn((T - tp) / 0.3, 0, 1), chaudT = bn((tp - T) / 0.15, 0, 1);
        teinte.setAttribute("fill", froid > 0 ? "#9fc8f0" : "#f6c79a"); teinte.setAttribute("opacity", (0.7 * Math.max(froid, chaudT) * (choisi ? 1 : 0)).toFixed(2));
        chev.forEach((c, i) => { const col = i < 3 ? 18 : 190, f = frac(i * 0.37 + t * 0.4); c(col, 62 + f * 84, 0, BLEU, air * 0.85 * D.fenetre(f, 0, 1, 0.2)); });
      }
      voirZones(info && info.agit, t);
    }
    return { maj: maj };
  }

  /* =====================================================================
     LE GROS PLAN DU BULBE : le tube de sortie, le bulbe ouvert, le manomètre sur le capillaire, le thermomètre
     ===================================================================== */
  function construireBulbe(svg, W, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const g = el("g", {}, svg), YHt = 282, YBt = 322, YTt = YHt - 10;
    const x0b = Math.round(W * 0.40), wb = Math.round(W * 0.40), yb0 = 186, hb = 88;
    const xc = x0b + 34, gx = Math.round(W * 0.22), gy = 156, gr = 62, tx = Math.round(W * 0.92);
    const capD = y0 => "M " + xc + " " + y0 + " V 40 Q " + xc + " 24 " + (xc - 16) + " 24 H -10";

    paroi(g, capD(yb0), 7);                                              // le capillaire, qui part vers la membrane
    paroi(g, "M " + xc + " " + gy + " H " + (gx + gr - 6), 9);             // le raccord du manomètre, pris sur le capillaire
    const tube = DS.bande(g, { x0: -30, x1: W + 30, yh: YHt, yb: YBt, graine: 5, nbMols: Math.max(10, Math.round(W / 40)), nbBulles: 10, vapSurNappe: 0.4 });
    const bulb = bulbe(g, x0b, yb0, wb, hb, 7);
    [x0b + 84, x0b + wb - 44].forEach(x => el("rect", { x: x - 7, y: yb0 - 6, width: 14, height: 96, rx: 4, fill: "#5d6b7a" }, g));   // les colliers
    const mano = DS.manometre(g, gx, gy, gr);
    vide(g, capD(yb0 + 9), 3);                                           // le vide du capillaire traverse la paroi du bulbe
    vide(g, "M " + xc + " " + gy + " H " + (gx + gr - 12), 4);           // le vide du raccord traverse le bord du manomètre
    const th = DS.thermometre(g, tx, 266, 170);
    D.pastille(g, gx, gy - gr - 22, "pression", NAVY, 22, "middle");
    D.pastille(g, W - 8, 84, "température", NAVY, 22, "end");
    const voirZones = anneaux(el("g", {}, g), {
      bulbe: [x0b - 10, yb0 - 12, wb + 20, hb + 24],
      charge: [x0b + 4, yb0 + 4, wb - 8, hb - 8],
      manometre: [gx - gr - 8, gy - gr - 8, 2 * gr + 16, 2 * gr + 16],
      thermometre: [tx - 26, 94, 64, 192]
    });
    function maj(e, t, info) {
      e = e || {};
      const T = e.T === undefined ? 0.12 : e.T, pB = pBulbe(T, 1);
      tube.maj({ xf: 0.001, flash: 0, froid: 1, sortie: 0.12 + 0.62 * T }, t);
      bulb.maj({ niv: niveauCharge(T, 1), T: T, boil: bn(0.25 + 0.75 * (T - 0.1) / 0.45, 0, 1) * (T < T_MOP ? 1 : 0), pres: pB }, t);
      mano.maj(pB); th.maj(bn(T, 0, 1));
      voirZones(info && info.agit, t);
    }
    return { maj: maj };
  }

  /* ---------- monter : un <svg> qui se redessine selon la largeur disponible (W = 560 à 1000, hauteur fixe) ---------- */
  function monter(hote, opt) {
    const svg = DS.svg(hote, "ds-svg mp-svg", opt.aria);
    let W = 0, inst = null, e = {}, t = 0, info = null;
    const bati = () => {
      const r = svg.getBoundingClientRect();
      const ratio = r.width > 40 && r.height > 40 ? r.width / r.height : 2.4;
      const w = Math.round(bn(H * ratio, 560, 1000) / 20) * 20;
      if (w === W) return;
      W = w; svg.textContent = ""; inst = (opt.vue === "bulbe" ? construireBulbe : construire)(svg, W, opt); inst.maj(e, t, info);
    };
    if (window.ResizeObserver) new ResizeObserver(bati).observe(svg);
    bati();
    return { svg: svg, maj: function (ee, tt, ii) { e = ee; t = tt; info = ii; if (inst) inst.maj(ee, tt, ii); } };
  }
  G.monter = monter;

  const ARIA_COUPE = "Coupe d’un détendeur thermostatique MOP devant son évaporateur : la tête à membrane, le bulbe ouvert en coupe avec sa petite charge de fluide, le capillaire qui les relie, et une jauge de basse pression avec un trait rouge qui marque le plafond.";
  const ARIA_BULBE = "Gros plan du bulbe, ouvert en coupe, posé sur le tube de sortie de l’évaporateur : un peu de liquide au fond, de la vapeur au-dessus, un manomètre sur le capillaire et un thermomètre sur le tube.";

  /* ---------- le sommaire : le détendeur MOP, qui tourne seul ---------- */
  G.accueil = function (hote) {
    DS.fond(hote);
    const sc = monter(hote, { accueil: true, bp: true, aria: ARIA_COUPE });
    const etat = { T: 0.3, mop: 1, bp: 0.21 };
    DS.animer(hote, t => sc.maj(etat, t, null));
  };

  /* ---------- écran 1 : la carte d'identité, avec sa visite guidée (bulbe, membrane, plafond de BP) ---------- */
  const VISITE = [
    ["bulbe", "Le bulbe, ouvert en coupe : une petite charge, un peu de liquide au fond, de la vapeur au-dessus."],
    ["membrane", "La pression du bulbe pousse la membrane, et la membrane ouvre le détendeur."],
    ["bp", "La basse pression ne dépasse pas le trait rouge : le détendeur la plafonne."]
  ];
  G.identite = function (hote, symbole) {
    const carte = document.createElement("div"); carte.className = "mp-carte";
    carte.innerHTML = '<div class="ds-cel-tete"><img src="' + symbole + '" alt="Symbole du détendeur thermostatique"><b>Détendeur thermostatique MOP</b></div>' +
      '<div class="ds-dessin"></div><p class="ds-explic" aria-live="off"></p><p class="ds-regle">il règle : <strong>la surchauffe, et il plafonne la BP</strong></p>';
    hote.appendChild(carte);
    const dessin = carte.querySelector(".ds-dessin"), explic = carte.querySelector(".ds-explic");
    DS.fond(dessin);
    const sc = monter(dessin, { bp: true, aria: ARIA_COUPE });
    const etat = { T: 0.3, mop: 1, bp: 0.21 };
    let dernier = -1;
    DS.animer(hote, t => {
      const i = Math.floor(t / 3.6) % VISITE.length;
      if (i !== dernier) { dernier = i; explic.innerHTML = "<strong>" + (i + 1) + ".</strong> " + VISITE[i][1]; }
      sc.maj(etat, t, { agit: VISITE[i][0] });
    });
  };

  /* ---------- écran 2 : le bulbe à charge limitée, pas à pas ---------- */
  G.bulbe = function (hote) {
    return DS.jouer(hote, {
      init: { T: 0.12 },
      etapes: [
        { nom: "Le bulbe chauffe", dire: "Le tube de sortie se réchauffe, le bulbe aussi. Dans le bulbe, le liquide de la charge se met à bouillir.", cible: { T: 0.35 }, agit: "bulbe", duree: 3.2 },
        { nom: "La pression monte", dire: "Plus le bulbe est chaud, plus la vapeur pousse : l’aiguille monte et le liquide diminue.", cible: { T: 0.52 }, agit: "manometre", duree: 3.2 },
        { nom: "Le dernier liquide part", dire: "Il ne reste plus une goutte de liquide : toute la charge est en vapeur.", cible: { T: 0.58 }, agit: "charge", duree: 2.6 },
        { nom: "La pression plafonne", dire: "Le thermomètre monte encore, mais l’aiguille ne bouge presque plus : la pression du bulbe est plafonnée.", cible: { T: 0.95 }, agit: ["manometre", "thermometre"], duree: 4 }
      ],
      construire: function (dessin) { return monter(dessin, { vue: "bulbe", aria: ARIA_BULBE }).maj; }
    });
  };

  /* ---------- écran 3 : et si la chambre est chaude au démarrage ? sans MOP / avec MOP côte à côte ---------- */
  G.chambreChaude = function (hote) {
    return DS.jouer(hote, {
      init: { T: 0.3, bp1: 0.21, bp2: 0.21, verdict: 0 },
      etapes: [
        { nom: "Chambre chaude", dire: "C’est le démarrage : la chambre est chaude, le bulbe est chaud. Les deux détendeurs ouvrent en grand.", cible: { T: 0.9 }, agit: { sans: "bulbe", avec: "bulbe" }, duree: 3.2 },
        { nom: "La BP monte", dire: "Beaucoup de liquide bout d’un coup : la basse pression monte dans les deux circuits.", cible: { bp1: 0.42, bp2: 0.42 }, agit: { sans: "bp", avec: "bp" }, duree: 3 },
        { nom: "Avec MOP : la BP plafonne", dire: "La pression du bulbe est plafonnée : quand la BP la rejoint, le détendeur n’ouvre plus davantage et se referme. La BP s’arrête.", cible: { bp2: 0.46 }, agit: { sans: null, avec: "membrane" }, duree: 3.4 },
        { nom: "Sans MOP : la BP continue", dire: "La pression du bulbe monte toujours : le détendeur reste grand ouvert et la BP monte encore, vers le rouge.", cible: { bp1: 0.74 }, agit: { sans: "bp", avec: null }, duree: 3.6 },
        { nom: "Le moteur", dire: "Vapeur dense à l’aspiration : sans MOP, le moteur force. Avec MOP, il n’est pas surchargé.", cible: { verdict: 1 }, agit: { sans: "moteur", avec: "moteur" }, duree: 3.2 }
      ],
      construire: function (dessin) {
        const onglets = document.createElement("div"); onglets.className = "ds-onglets";
        const rang = document.createElement("div"); rang.className = "mp-duo";
        dessin.append(onglets, rang);
        const defs = [
          { cle: "sans", titre: "Sans MOP", mop: 0, bp: "bp1", verdict: ["non", "✗ le moteur force"], aria: "Coupe d’un détendeur thermostatique à charge ordinaire : le bulbe garde du liquide, la pression du bulbe continue de monter, la basse pression monte haut." },
          { cle: "avec", titre: "Avec MOP", mop: 1, bp: "bp2", verdict: ["oui", "✓ le moteur est protégé"], aria: "Coupe d’un détendeur thermostatique MOP : le bulbe se vide de son liquide, la pression du bulbe plafonne, la basse pression s’arrête au plafond." }
        ];
        const cs = defs.map((df, i) => {
          const c = document.createElement("div"); c.className = "mp-cel" + (i === 0 ? " actif" : "");
          c.innerHTML = '<div class="ds-cel-tete"><b>' + df.titre + '</b></div><div class="mp-coupe"></div><p class="ds-verdict ' + df.verdict[0] + '">' + df.verdict[1] + "</p>";
          rang.appendChild(c);
          const b = document.createElement("button"); b.type = "button"; b.textContent = df.titre; b.setAttribute("aria-pressed", String(i === 0));
          b.addEventListener("click", () => { cs.forEach((x, k) => { x.c.classList.toggle("actif", k === i); x.b.setAttribute("aria-pressed", String(k === i)); }); });
          onglets.appendChild(b);
          return { df: df, c: c, b: b, v: c.querySelector(".ds-verdict"), sc: monter(c.querySelector(".mp-coupe"), { bp: true, moteur: true, aria: df.aria }) };
        });
        return function (e, t, info) {
          const a = info && info.agit && typeof info.agit === "object" && !Array.isArray(info.agit) ? info.agit : {};
          cs.forEach(c => {
            c.sc.maj({ T: e.T, mop: c.df.mop, bp: e[c.df.bp] }, t, { agit: a[c.df.cle] });
            c.v.style.opacity = bn(e.verdict, 0, 1).toFixed(2);
          });
        };
      }
    });
  };

  /* ---------- écran 4 : où monter la tête ? l'élève choisit A, B ou C ; `etat.cle` est lu à chaque image ---------- */
  G.exo = function (hote, etat) {
    DS.fond(hote);
    const sc = monter(hote, { exo: true, thermos: true, aria: "Coupe d’un détendeur MOP avec deux thermomètres, un sur la tête, un sur le bulbe. Selon l’endroit choisi pour la tête, elle est plus froide ou plus chaude que le bulbe ; si elle est plus froide, la charge du bulbe migre vers la tête." });
    DS.animer(hote, t => sc.maj(etat, t, { agit: null }));
    return sc;
  };
})();
