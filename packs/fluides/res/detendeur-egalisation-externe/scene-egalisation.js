/* =====================================================================
   scene-egalisation.js — gare 2 « L'égalisation externe » : les dessins qui vivent
   ---------------------------------------------------------------------
   RÔLE : une fonction par écran qui dessine. app.js les appelle dans render() :
     EGALISATION_SCENES.accueil(hote)               le dessin du sommaire
     EGALISATION_SCENES.identite(hote)              écran 1 : carte d'identité (symbole + coupe + visite guidée)
     EGALISATION_SCENES.piege(hote)                 écran 2 : le piège de la perte de charge (pas à pas)
     EGALISATION_SCENES.duo(hote)                   écran 3 : interne / externe côte à côte (pas à pas)
     EGALISATION_SCENES.exo(hote, etat, surChoix)   écran 4 : où brancher le tube ? (points à toucher)
   BRIQUE AJOUTÉE (absente de DETENDEURS_SCENES) : « construire », la coupe d'un détendeur thermostatique
   AVEC son évaporateur long à forte perte de charge, ses deux manomètres (entrée, sortie), son bulbe et — en
   égalisation externe — le tube d'égalisation. Elle se redessine selon la largeur disponible (ResizeObserver).
   Les briques communes (DS.bande, DS.manometre, DS.jouer, DS.animer, DS.fond, DS.svg, DS.sortie) viennent de
   ../_detendeurs-commun/scenes-detendeurs.js ; le dessin de base, de VOYAGE_DESSIN.
   RÈGLES TENUES : valeurs QUALITATIVES ; texte jamais sur un tracé (légendes en HTML, pastilles « entrée » /
   « sortie » dans des espaces libres, lettres des points à toucher dans des disques pleins) ; le liquide se voit
   liquide (nappe, bulles qui naissent au fond, vapeur en petites molécules) ; FLUIDE CONTINU : un tube = une
   paroi + un intérieur d'un seul tenant, un coude = une courbe, la paroi est OUVERTE là où un tube entre dans
   le corps ou dans un autre tube ; filigrane inerWeb (R9) derrière chaque dessin ; rien n'est animé en CSS.
   CONVENTION DE COULEURS DE LA LIGNE : charge du bulbe et sa pression = violet #8e44ad (jamais orangé : l'orangé est le
   liquide HP) ; le capillaire est un tube (paroi + intérieur violet d'un seul tenant) du bulbe à la chambre AU-DESSUS de la
   membrane ; quand le bulbe chauffe, des impulsions plus claires filent dans le capillaire et la chambre se fonce ; flèches
   violettes = pression du bulbe, qui ouvre ; flèches bleues SOUS la membrane = pression qui ferme (interne : celle de
   l'entrée, externe : celle de la sortie, amenée par le tube d'égalisation) ; flèches gris acier = ressort, qui ferme.
   La légende HTML (G.legende) dit les trois.
   MODÈLE (qualitatif) : p entrée = P_OUT + DP × perte ; p sortie = P_OUT. Le détendeur à égalisation interne lit
   p entrée, l'externe lit p sortie (tube pris après le bulbe). Écart lu = (p lue − p sortie) ; plus il est grand,
   plus le détendeur reste fermé (ferme) et plus la nappe est courte (nappe).
   ===================================================================== */
(function () {
  "use strict";
  const DS = window.DETENDEURS_SCENES, D = window.VOYAGE_DESSIN;
  const G = window.EGALISATION_SCENES = {};
  if (!DS || !D) { console.warn("scene-egalisation.js : DETENDEURS_SCENES absent."); return; }
  const el = D.el, lerp = D.lerp, bn = D.borne, lisse = D.lisse, frac = D.frac;
  const H = 360, KM = 0.7, CLAIR = "#f4f8fc", CUIVRE = "#a9672f", NAVY = "#1b3a63";
  const VERT = "#1e7e54", AMBRE = "#b06a00";
  const VIOLET = "#8e44ad", BLEU = "#2f6fb6", ACIER = "#5d6b7a";    // convention de la ligne : bulbe = violet (ouvre), sous la membrane = bleu (ferme), ressort = gris acier (ferme)
  const V_FROID = "#d6b9e6", V_PULSE = "#ecdcf5";
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mixe = (a, b, f) => { const A = hex(a), B = hex(b); return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * f)).join(",") + ")"; };
  const P_OUT = 0.10, DP = 0.20;                   // pression de sortie ; écart entrée − sortie à pleine perte de charge
  const NY0 = 238;                                 // haut de l'aiguille fermée

  /* ---------- outils : chemin paramétré, mélange liquide + vapeur après l'orifice, anneau « la pièce qui agit » ---------- */
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
  /* ---------- le modèle qualitatif ---------- */
  function modele(e, ext) {
    const perte = bn(e.perte === undefined ? 1 : e.perte, 0, 1);
    const ferme = bn(e.ferme === undefined ? 1 : e.ferme, 0, 1), nappe = bn(e.nappe === undefined ? 1 : e.nappe, 0, 1);
    const tap = ext ? (e.tap === undefined ? "C" : e.tap) : null;      // C = après le bulbe ; B = avant ; A = entrée ; D = bouchée ; null = pas encore choisi
    let k = 0, libre = false;
    if (ext) { if (tap === "C") k = 1; else if (tap === "B") k = 0.93; else if (tap === "A") k = 0; else libre = true; }
    const pin = P_OUT + DP * perte, pout = P_OUT;
    const plue = libre ? (pin + pout) / 2 : lerp(pin, pout, k);
    const d = libre ? 0.8 * perte : perte * (1 - k);                  // l'erreur de lecture, 0 = la bonne pression
    const ouv = 0.55 - 0.30 * d * ferme;                               // l'ouverture du détendeur
    const xfRel = 1 - 0.55 * d * nappe;                                // la longueur de la nappe, 1 = ce qu'il faut
    return { perte: perte, pin: pin, pout: pout, plue: plue, k: k, libre: libre, tap: tap, ouv: ouv, xfRel: xfRel, tout: DS.sortie(0.85 * xfRel), d: d };
  }

  /* ---------- la coupe : détendeur + évaporateur long + bulbe (+ tube d'égalisation), pour une largeur W ---------- */
  function construire(svg, W, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const ext = !!opt.externe, exo = !!opt.exo, etiquettes = !opt.accueil;
    const g = el("g", {}, svg);
    const X0 = 184, L = W + 30 - X0, x1 = W - 176, xfBon = (x1 - X0) / L;   // le tube déborde du cadre : il continue vers le compresseur
    const xA = X0 + 38, xB = W - 146, xC = W - 30, xm1 = X0 + 96, xm2 = W - 206;
    const xb0 = W - 120, xb1 = W - 58, xbc = (xb0 + xb1) / 2;
    const YT = 194, YH = 204, YB = 240;               // dessus de la paroi du tube ; intérieur haut et bas

    // ----- 1. le capillaire du bulbe (derrière tout), puis la paroi du tube d'égalisation -----
    const dCapHaut = " Q " + xbc + " 32 " + (xbc - 14) + " 32 H 124 Q 110 32 110 46 V 54";
    const dCap = "M " + xbc + " 170 V 46" + dCapHaut;
    const dCapDedans = "M " + xbc + " 184 V 46" + dCapHaut + " V 78";   // du bulbe jusque dans la chambre au-dessus de la membrane
    el("path", { d: dCap, fill: "none", stroke: CUIVRE, "stroke-width": 9, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g);
    const dEq = xt => "M 62 172 H 28 Q 14 172 14 158 V 26 Q 14 12 28 12 H " + (xt - 14) + " Q " + xt + " 12 " + xt + " 26 V ";
    const eqLueur = ext ? el("path", { fill: "none", stroke: "#ff6b35", "stroke-width": 20, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, g) : null;
    const eqParoi = ext ? el("path", { fill: "none", stroke: CUIVRE, "stroke-width": 12, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g) : null;

    // ----- 2. le profil de pression, les raccords des manomètres, l'évaporateur -----
    const profil = el("path", { fill: "rgba(61,127,202,.22)" }, g), profilBord = el("path", { fill: "none", stroke: "#3d7fca", "stroke-width": 3, "stroke-linecap": "round" }, g);
    const bandeE = DS.bande(g, { x0: X0, x1: W + 30, yh: YH, yb: YB, graine: 11, nbMols: Math.max(10, Math.round(L / 34)), nbBulles: Math.max(10, Math.round(L / 26)), prof: [0.8, 0.2] });
    [xm1, xm2].forEach(x => {                         // raccord du manomètre : paroi jusqu'au tube, intérieur qui traverse la paroi du tube
      el("path", { d: "M " + x + " 150 V " + YT, fill: "none", stroke: CUIVRE, "stroke-width": 9, "stroke-linecap": "butt" }, g);
      el("path", { d: "M " + x + " 150 V 208", fill: "none", stroke: CLAIR, "stroke-width": 4, "stroke-linecap": "butt" }, g);
    });
    const nbH = Math.max(2, Math.floor((x1 - X0 - 60) / 70) + 1), chaleurs = [];
    for (let i = 0; i < nbH; i++) chaleurs.push({ x: X0 + 50 + i * ((x1 - X0 - 80) / (nbH - 1)), f: i / nbH, maj: D.chaleur(el("g", {}, g)) });

    // ----- 3. le détendeur : corps, chambres, siège, aiguille, ressort, tige, tête à membrane -----
    el("rect", { x: 36, y: 150, width: 148, height: 180, rx: 12, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2.5 }, g);
    const clair = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: CLAIR }, g);
    const tiede = D.couleur(0.62, false);
    const lanc = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: tiede, opacity: 0.88 }, g);
    if (ext) { clair(58, 150, 104, 44); el("rect", { x: 58, y: 194, width: 48, height: 10, fill: "#8a6a1f" }, g); el("rect", { x: 114, y: 194, width: 48, height: 10, fill: "#8a6a1f" }, g); clair(58, 204, 104, 40); }
    else clair(58, 150, 104, 94);
    const brume = el("rect", { x: 58, y: ext ? 204 : 150, width: 104, height: ext ? 40 : 94, fill: D.couleur(0.1, false), opacity: 0 }, g);
    el("rect", { x: 58, y: 244, width: 40, height: 12, fill: "#8a6a1f" }, g); el("rect", { x: 122, y: 244, width: 40, height: 12, fill: "#8a6a1f" }, g);   // le siège
    clair(58, 256, 104, 62); lanc(58, 256, 104, 62);                                  // la chambre haute pression
    D.tube(g, 0, 262, 44, 44, "cuivre", false, CLAIR);                                // la conduite HP qui arrive
    clair(36, 272, 26, 24); lanc(0, 272, 62, 24);                                     // l'ouverture de la paroi : le liquide passe sans trait en travers
    clair(162, 204, 26, 36);                                                          // l'ouverture vers l'évaporateur
    const brume2 = el("rect", { x: 162, y: 204, width: 26, height: 36, fill: D.couleur(0.1, false), opacity: 0 }, g);
    const fluxP = D.courant(g, 2, 58, 274, 294, 4, 31), fluxC = D.courant(g, 62, 158, 262, 312, 4, 33);
    const mel = melange(g, chemin([[110, 252], [110, 224], [172, 224], [214, 224]]), 14, 17);
    const tige = el("rect", { x: 108, width: 4, fill: "#3f4a55" }, g);
    const aig = el("path", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const ressort = el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
    el("rect", { x: 90, y: 312, width: 40, height: 6, fill: "url(#vm-acier)" }, g);
    el("rect", { x: 94, y: 330, width: 32, height: 12, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);   // la vis de réglage du ressort
    el("path", { d: "M 40 150 V 100 Q 40 56 110 56 Q 180 56 180 100 V 150 Z", fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2.5 }, g);
    const chambre = el("path", { fill: "#fff" }, g), fluide = el("path", { opacity: 0.78 }, g);
    const membrane = el("path", { fill: "none", stroke: "#24384f", "stroke-width": 5, "stroke-linecap": "round" }, g);
    const flecheH = (x, y0, h) => "M " + (x - 4) + " " + y0 + " V " + (y0 + h - 12) + " H " + (x - 11) + " L " + x + " " + (y0 + h) + " L " + (x + 11) + " " + (y0 + h - 12) + " H " + (x + 4) + " V " + y0 + " Z";
    const flecheB = (x, y0, h) => "M " + (x - 4) + " " + y0 + " V " + (y0 - h + 12) + " H " + (x - 11) + " L " + x + " " + (y0 - h) + " L " + (x + 11) + " " + (y0 - h + 12) + " H " + (x + 4) + " V " + y0 + " Z";
    const bas = [84, 136].map(() => el("path", { fill: VIOLET, stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, g));          // la pression du bulbe (violet), qui pousse la membrane vers le bas : elle ouvre
    const haut = [84, 136].map(() => el("path", { fill: BLEU, stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, g));          // la pression sous la membrane (bleu), qui la pousse vers le haut : elle ferme
    const ress = [70, 150].map(() => el("path", { fill: ACIER, stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, g));         // le ressort (gris acier), qui pousse aussi vers le haut : il ferme
    el("rect", { x: 100, y: 48, width: 20, height: 14, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);        // l'écrou du capillaire

    // ----- 4. le bulbe, collé sur le tube de sortie (le capillaire entre dans le bulbe) -----
    const bulbe = el("rect", { x: xb0, y: 170, width: xb1 - xb0, height: 26, rx: 11, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    const charge = el("rect", { x: xb0 + 5, y: 175, width: xb1 - xb0 - 10, height: 16, rx: 7, fill: V_FROID }, g);          // la charge du bulbe, violette : plus il chauffe, plus elle se fonce
    [xb0 + 12, xb1 - 12].forEach(x => el("rect", { x: x - 4, y: 164, width: 8, height: 38, rx: 3, fill: ACIER }, g));
    // le capillaire du bulbe : un vrai tube, intérieur violet d'un seul tenant du bulbe à la chambre au-dessus de la membrane
    const capDedans = el("path", { d: dCapDedans, fill: "none", stroke: V_FROID, "stroke-width": 5, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g);
    const capImpulsions = el("path", { d: dCapDedans, fill: "none", stroke: V_PULSE, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "7 40", opacity: 0 }, g);

    // ----- 5. le tube d'égalisation : intérieur d'un seul tenant, de la prise (dans le tube) jusque dans la chambre -----
    let eqDedans = null, eqPression = null, bouchon = null;
    if (ext) {
      eqDedans = el("path", { fill: "none", stroke: CLAIR, "stroke-width": 6, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g);
      eqPression = el("path", { fill: "none", stroke: VERT, "stroke-width": 3, "stroke-linecap": "round", "stroke-dasharray": "3 11" }, g);
      bouchon = el("rect", { x: 3, y: 164, width: 8, height: 16, rx: 2, fill: "#6b2a14", opacity: 0 }, g);
    }

    // ----- 6. instruments, pastilles, points à toucher, anneau -----
    const m1 = DS.manometre(g, xm1, 122, 34), m2 = DS.manometre(g, xm2, 122, 34);
    const tp = opt.taille || 22, yp = 41.5 + 0.95 * tp;                   // sur petit écran la pastille grandit pour rester lisible
    if (etiquettes) { D.pastille(g, xm1, yp, "entrée", NAVY, tp, "middle"); D.pastille(g, xm2, yp, "sortie", NAVY, tp, "middle"); }
    const spots = {};
    if (exo && ext) {
      const lieu = { A: [xA, YT, "Brancher sur l’entrée de l’évaporateur"], B: [xB, YT, "Brancher avant le bulbe"], C: [xC, YT, "Brancher après le bulbe"], D: [24, 208, "Laisser la prise bouchée"] };
      Object.keys(lieu).forEach(k => {
        const [cx, cy, nom] = lieu[k];
        const s = el("g", { "data-tap": k, role: "button", tabindex: 0, "aria-label": nom, style: "cursor:pointer" }, g);
        const halo = el("circle", { cx: cx, cy: cy, r: 28, fill: "none", stroke: "#ff6b35", "stroke-width": 4, opacity: 0 }, s);
        const disque = el("circle", { cx: cx, cy: cy, r: 21, fill: "#fff", stroke: NAVY, "stroke-width": 3 }, s);
        const lettre = D.texte(s, cx, cy + 8, k, { "text-anchor": "middle", fill: NAVY, "font-size": 24, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif", style: "pointer-events:none" });
        const choisir = () => { if (opt.surChoix) opt.surChoix(k); };
        s.addEventListener("click", choisir);
        s.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ev.stopPropagation(); choisir(); } });
        spots[k] = { halo: halo, disque: disque, lettre: lettre };
      });
    }
    const voirZone = anneau(el("g", {}, g));
    const ZONES = {
      evaporateur: [X0 - 8, 46, x1 - X0 + 20, 214],
      chambre: ext ? [50, 144, 120, 54] : [50, 144, 120, 104],
      membrane: [46, 118, 130, 64],
      aiguille: [82, 228, 56, 76],
      bulbe: [xb0 - 8, 158, xb1 - xb0 + 16, 50]
    };

    let derniers = {};
    function maj(e, t, info) {
      e = e || {};
      const m = modele(e, ext), agit = info && info.agit;
      const gap = 24 * m.ouv, dm = 0.8 * gap, ny = NY0 + gap;
      // les instruments et le profil de pression le long de l'évaporateur
      const hp = p => 6 + 90 * p, yIn = YT - hp(m.pin), yOut = YT - hp(m.pout);
      m1.maj(m.pin); m2.maj(m.pout);
      profil.setAttribute("d", "M " + (X0 + 4) + " " + YT + " V " + yIn.toFixed(1) + " L " + x1 + " " + yOut.toFixed(1) + " V " + YT + " Z");
      profilBord.setAttribute("d", "M " + (X0 + 4) + " " + yIn.toFixed(1) + " L " + x1 + " " + yOut.toFixed(1));
      // l'évaporateur : la nappe, les bulles, la vapeur
      bandeE.maj({ xf: xfBon * m.xfRel, flash: 0.4 + 0.6 * m.ouv, froid: 1, sortie: m.tout }, t);
      chaleurs.forEach(h => { const q = frac(h.f + t * 0.5); h.maj(h.x, 266 + 6 * (1 - q), 180, D.fenetre(q, 0, 1, 0.25) * 0.9); });
      // le détendeur
      aig.setAttribute("d", "M 103 " + ny.toFixed(1) + " H 117 L 132 " + (ny + 34).toFixed(1) + " H 88 Z");
      let d = "M 110 " + (ny + 34).toFixed(1); const top = ny + 34, bot = 312;
      for (let k = 1; k <= 8; k++) d += " L " + (k % 2 ? 94 : 126) + " " + (top + (bot - top) * k / 8).toFixed(1);
      ressort.setAttribute("d", d + " L 110 312");
      tige.setAttribute("y", (150 + dm).toFixed(1)); tige.setAttribute("height", (ny + 2 - 150 - dm).toFixed(1));
      const cd = "M 58 150 V 100 Q 58 70 110 70 Q 162 70 162 100 V 150 Q 110 " + (150 + 2 * dm).toFixed(1) + " 58 150 Z";
      chambre.setAttribute("d", cd); fluide.setAttribute("d", cd);
      const chaud = bn((m.tout - 0.12) / 0.45, 0, 1), violet = mixe(V_FROID, VIOLET, chaud);   // la sortie chauffe : la charge se fonce
      fluide.setAttribute("fill", violet); fluide.setAttribute("opacity", 0.92); charge.setAttribute("fill", violet); capDedans.setAttribute("stroke", violet);
      capImpulsions.setAttribute("stroke-dashoffset", (-t * (30 + 40 * chaud)).toFixed(1)); capImpulsions.setAttribute("opacity", (0.25 + 0.7 * chaud).toFixed(2));   // des impulsions plus claires filent du bulbe vers la tête
      membrane.setAttribute("d", "M 58 150 Q 110 " + (150 + 2 * dm).toFixed(1) + " 162 150");
      const h = 8 + 90 * m.plue;
      const sp = 22 + 14 * m.ouv;                                                  // la force du ressort grandit un peu quand il se comprime
      haut.forEach((p, k) => { p.setAttribute("d", flecheB([84, 136][k], 190, h)); p.setAttribute("opacity", m.libre ? 0.45 : 1); if (m.libre) p.setAttribute("stroke-dasharray", "5 4"); else p.removeAttribute("stroke-dasharray"); });
      ress.forEach((p, k) => p.setAttribute("d", flecheB([70, 150][k], 308, sp)));
      bas.forEach((p, k) => p.setAttribute("d", flecheH([84, 136][k], 82, h + 0.5 * sp)));   // la membrane est en équilibre : bulbe = dessous + ressort
      brume.setAttribute("opacity", (0.35 * (0.2 + m.ouv)).toFixed(2)); brume2.setAttribute("opacity", (0.35 * (0.2 + m.ouv)).toFixed(2));
      fluxP(t, 55 + 90 * m.ouv); fluxC(t, 55 + 90 * m.ouv);
      mel(t, 0.2 + 0.8 * m.ouv, 0.12 + 0.12 * m.ouv);
      // le tube d'égalisation
      if (ext) {
        const pris = m.tap === "A" || m.tap === "B" || m.tap === "C";
        const xt = m.tap === "A" ? xA : m.tap === "B" ? xB : xC;
        const dt = pris ? dEq(xt) : "M 62 172 H 8";
        eqParoi.setAttribute("d", pris ? dt + YT : dt); eqLueur.setAttribute("d", pris ? dt + YT : dt);
        eqDedans.setAttribute("d", pris ? dt + "208" : dt);
        eqPression.setAttribute("d", pris ? dt + "200" : dt);
        // la pression se transmet de la prise vers la membrane : les tirets avancent dans ce sens
        eqPression.setAttribute("stroke-dashoffset", (t * 22).toFixed(1)); eqPression.setAttribute("opacity", pris ? 1 : 0);
        eqPression.setAttribute("stroke", m.k > 0.5 ? VERT : AMBRE);
        eqLueur.setAttribute("opacity", agit === "tube" ? (0.45 + 0.35 * Math.sin(t * 5)).toFixed(2) : 0);
        bouchon.setAttribute("opacity", m.tap === "D" ? 1 : 0);
      }
      Object.keys(spots).forEach(k => {
        const s = spots[k], choisi = e.tap === k, juste = choisi && e.ok;
        s.disque.setAttribute("fill", juste ? VERT : choisi ? NAVY : "#fff"); s.disque.setAttribute("stroke", juste ? VERT : NAVY);
        s.lettre.setAttribute("fill", choisi ? "#fff" : NAVY);
        s.halo.setAttribute("opacity", e.tap == null || (!choisi && !e.ok) ? (0.35 + 0.35 * Math.sin(t * 4 + k.charCodeAt(0))).toFixed(2) : 0);
      });
      const zone = agit && agit !== "tube" ? ZONES[agit] : null;
      voirZone(zone || null, t);
      derniers = { ouverture: m.ouv, nappe: xfBon * m.xfRel, pEntree: m.pin, pSortie: m.pout, pLue: m.plue, erreur: m.d };
    }
    return { maj: maj, lire: () => derniers };
  }

  /* ---------- monter : un <svg> qui se redessine selon la largeur disponible (W = 560 à 1000, hauteur fixe) ---------- */
  function monter(hote, opt) {
    const svg = DS.svg(hote, "ds-svg eg-svg", opt.aria);
    let W = 0, TP = 0, inst = null, e = {}, t = 0, info = null;
    const bati = () => {
      const r = svg.getBoundingClientRect(), mesure = r.width > 40 && r.height > 40;
      const ratio = mesure ? r.width / r.height : 2.4;
      const w = Math.round(bn(H * ratio, 560, 1000) / 20) * 20;
      const tp = mesure ? Math.round(bn(14 / Math.min(r.width / w, r.height / H), 22, 30)) : 22;
      if (w === W && tp === TP) return;
      W = w; TP = tp; opt.taille = tp; svg.textContent = ""; inst = construire(svg, W, opt); inst.maj(e, t, info);
    };
    if (window.ResizeObserver) new ResizeObserver(bati).observe(svg);
    bati();
    return { svg: svg, maj: function (ee, tt, ii) { e = ee; t = tt; info = ii; if (inst) inst.maj(ee, tt, ii); }, lire: () => (inst ? inst.lire() : {}) };
  }
  G.monter = monter;

  const ARIA_INT = "Coupe d’un détendeur thermostatique à égalisation interne devant un évaporateur long : la pression baisse entre l’entrée et la sortie, la membrane lit celle de l’entrée. Le bulbe, rempli de violet, pousse la membrane par son capillaire.";
  const ARIA_EXT = "Coupe d’un détendeur thermostatique à égalisation externe devant un évaporateur long : un tube prend la pression de la sortie, après le bulbe, et l’amène sous la membrane. Le bulbe, rempli de violet, pousse la membrane par son capillaire.";

  /* ---------- la légende des trois forces sur la membrane (HTML, sous le dessin) ---------- */
  G.legendeHtml = '<p class="eg-legende"><span><i class="eg-v"></i><em>pression du </em>bulbe : <b>ouvre</b></span><span><i class="eg-b"></i><em>pression </em>sous la membrane : <b>ferme</b></span><span><i class="eg-g"></i>ressort : <b>ferme</b></span></p>';
  G.legende = function () { const d = document.createElement("div"); d.innerHTML = G.legendeHtml; return d.firstChild; };

  /* ---------- le sommaire : le détendeur à égalisation externe, qui tourne seul ---------- */
  G.accueil = function (hote) {
    DS.fond(hote);
    const sc = monter(hote, { externe: true, accueil: true, aria: ARIA_EXT });
    const etat = { perte: 1, ferme: 1, nappe: 1, tap: "C" };
    DS.animer(hote, t => sc.maj(etat, t, null));
  };

  /* ---------- écran 1 : la carte d'identité, avec sa visite guidée (bulbe, tube, membrane) ---------- */
  const VISITE = [
    ["bulbe", "Le bulbe sent la sortie : sa charge violette pousse la membrane par le capillaire."],
    ["tube", "Le tube amène sous la membrane la pression de la sortie : elle pousse en bleu."],
    ["membrane", "La membrane compare : le violet ouvre, le bleu et le ressort ferment."]
  ];
  G.identite = function (hote, symbole) {
    const carte = document.createElement("div"); carte.className = "eg-carte";
    carte.innerHTML = '<div class="ds-cel-tete"><img src="' + symbole + '" alt="Symbole du détendeur thermostatique à égalisation externe"><b>Détendeur à égalisation externe</b></div>' +
      '<div class="ds-dessin"></div>' + G.legendeHtml + '<p class="ds-explic" aria-live="off"></p><p class="ds-regle">il règle : <strong>la surchauffe, avec la vraie pression de la sortie</strong></p>';
    hote.appendChild(carte);
    const dessin = carte.querySelector(".ds-dessin"), explic = carte.querySelector(".ds-explic");
    DS.fond(dessin);
    const sc = monter(dessin, { externe: true, aria: ARIA_EXT });
    const etat = { perte: 1, ferme: 1, nappe: 1, tap: "C" };
    let dernier = -1;
    DS.animer(hote, t => {
      const i = Math.floor(t / 3.4) % VISITE.length;
      if (i !== dernier) { dernier = i; explic.innerHTML = "<strong>" + (i + 1) + ".</strong> " + VISITE[i][1]; }
      sc.maj(etat, t, { agit: VISITE[i][0] });
    });
  };

  /* ---------- écran 2 : le piège de la perte de charge (égalisation interne), pas à pas ---------- */
  G.piege = function (hote) {
    return DS.jouer(hote, {
      init: { perte: 0, ferme: 0, nappe: 0 },
      etapes: [
        { nom: "Le bulbe pousse", dire: "À la sortie, le bulbe sent la température. Sa charge violette pousse la membrane par le capillaire : cela ouvre.", cible: {}, agit: "bulbe", duree: 3 },
        { nom: "La pression baisse en route", dire: "Le liquide s’évapore en avançant : la pression baisse. À la sortie, elle est plus basse qu’à l’entrée.", cible: { perte: 1 }, agit: "evaporateur", duree: 3.2 },
        { nom: "La membrane lit l’entrée", dire: "Sans tube, la membrane lit la pression de l’entrée : une pression trop haute pour la sortie.", cible: {}, agit: "chambre", duree: 2.6 },
        { nom: "Il reste trop fermé", dire: "Le détendeur croit la surchauffe plus faible qu’elle n’est : il reste trop fermé.", cible: { ferme: 1 }, agit: "aiguille", duree: 3 },
        { nom: "L’évaporateur manque de liquide", dire: "La nappe de liquide est courte : le bout de l’évaporateur est vide, la vapeur sort chaude.", cible: { nappe: 1 }, agit: "evaporateur", duree: 3.4 }
      ],
      construire: function (dessin) { dessin.insertAdjacentElement("afterend", G.legende()); return monter(dessin, { externe: false, aria: ARIA_INT }).maj; }
    });
  };

  /* ---------- écran 3 : et si on branche l'égalisation externe ? interne et externe côte à côte ---------- */
  G.duo = function (hote, symboles) {
    return DS.jouer(hote, {
      init: { perte: 1, ferme: 0, nappe: 0, verdict: 0 },
      etapes: [
        { nom: "Même évaporateur", dire: "Même évaporateur, même perte de charge : la sortie est à une pression plus basse que l’entrée.", cible: {}, agit: { interne: "evaporateur", externe: "evaporateur" }, duree: 2.4 },
        { nom: "Interne : l’entrée est lue", dire: "Interne : la membrane lit l’entrée, trop haute. Le détendeur ferme.", cible: { ferme: 1 }, agit: { interne: "chambre", externe: null }, duree: 3 },
        { nom: "Externe : le tube amène la sortie", dire: "Externe : le tube amène la vraie pression de la sortie. Le détendeur n’est pas trompé.", cible: {}, agit: { interne: null, externe: "tube" }, duree: 3 },
        { nom: "Le résultat", dire: "Interne : il manque du liquide. Externe : la nappe va presque jusqu’à la sortie.", cible: { nappe: 1, verdict: 1 }, agit: { interne: "evaporateur", externe: "evaporateur" }, duree: 3.4 }
      ],
      construire: function (dessin) {
        const onglets = document.createElement("div"); onglets.className = "ds-onglets";
        const rang = document.createElement("div"); rang.className = "eg-duo";
        dessin.append(onglets, rang);
        dessin.insertAdjacentElement("afterend", G.legende());
        const defs = [
          { cle: "interne", titre: "Égalisation interne", img: symboles.interne, ext: false, verdict: ["non", "✗ il manque du liquide"], aria: ARIA_INT },
          { cle: "externe", titre: "Égalisation externe", img: symboles.externe, ext: true, verdict: ["oui", "✓ juste ce qu’il faut"], aria: ARIA_EXT }
        ];
        const cs = defs.map((df, i) => {
          const c = document.createElement("div"); c.className = "eg-cel" + (i === 0 ? " actif" : "");
          c.innerHTML = '<div class="ds-cel-tete"><img src="' + df.img + '" alt=""><b>' + df.titre + '</b></div><div class="eg-coupe"></div><p class="ds-verdict ' + df.verdict[0] + '">' + df.verdict[1] + "</p>";
          rang.appendChild(c);
          const b = document.createElement("button"); b.type = "button"; b.textContent = df.titre; b.setAttribute("aria-pressed", String(i === 0));
          b.addEventListener("click", () => { cs.forEach((x, k) => { x.c.classList.toggle("actif", k === i); x.b.setAttribute("aria-pressed", String(k === i)); }); });
          onglets.appendChild(b);
          return { df: df, c: c, b: b, v: c.querySelector(".ds-verdict"), sc: monter(c.querySelector(".eg-coupe"), { externe: df.ext, aria: df.aria }) };
        });
        return function (e, t, info) {
          const a = info && info.agit && typeof info.agit === "object" ? info.agit : {};
          cs.forEach(c => { c.sc.maj(e, t, { agit: a[c.df.cle] }); c.v.style.opacity = bn(e.verdict, 0, 1).toFixed(2); });
        };
      }
    });
  };

  /* ---------- écran 4 : où brancher le tube ? l'élève touche A, B, C ou D ; `etat` est lu à chaque image ---------- */
  G.exo = function (hote, etat, surChoix) {
    DS.fond(hote);
    const dessin = hote;
    const sc = monter(hote, { externe: true, exo: true, surChoix: surChoix, aria: "Coupe d’un détendeur à égalisation externe dont le tube n’est pas encore branché. Quatre points sont à toucher : A sur l’entrée de l’évaporateur, B avant le bulbe, C après le bulbe, D prise bouchée." });
    DS.animer(dessin, t => sc.maj(etat, t, { agit: null }));
    return sc;
  };
})();
