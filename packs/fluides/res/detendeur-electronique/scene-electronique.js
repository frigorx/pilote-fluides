/* =====================================================================
   scene-electronique.js — gare 6 « Le détendeur électronique » : les dessins qui vivent
   ---------------------------------------------------------------------
   RÔLE : une fonction par écran qui dessine. app.js les appelle dans render() :
     ELECTRONIQUE_SCENES.accueil(hote)               le dessin du sommaire (la boucle de réglage qui suit la charge)
     ELECTRONIQUE_SCENES.identite(hote, symboles)    écran 1 : carte d'identité (DS.coupe("electronique") + les trois acteurs)
     ELECTRONIQUE_SCENES.boucle(hote)                écran 2 : la boucle de réglage, pas à pas (sondes → régulateur → vanne)
     ELECTRONIQUE_SCENES.vannes(hote)                écran 3 : pas à pas / impulsions côte à côte, puis « et si on arrête ? »
     ELECTRONIQUE_SCENES.exo(hote, etat)             écran 4 : régler la consigne de surchauffe (l'élève appuie sur − et +)
   BRIQUES AJOUTÉES (absentes de DETENDEURS_SCENES) :
     · « construire » : la coupe d'un détendeur électronique devant son évaporateur, en trois vues :
         "boucle" : vanne à moteur pas à pas + transmetteur de pression + sonde de température + régulateur
                    (écran de lecture : surchauffe calculée, consigne, ordre donné) ;
         "pas"    : la vanne à moteur pas à pas seule (le pointeau avance par crans ; escalier des crans) ;
         "imp"    : la vanne à impulsions seule (bobine, clapet qui claque ; barre de temps du cycle) ;
     · « le signal » : des petits points qui courent sur les fils pointillés (sondes → régulateur → vanne) ;
     · le transmetteur de pression et la sonde de température (pince sur le tube) ;
     · le régulateur et son écran (texte SVG sur fond clair : jamais sur un tracé).
   Les briques communes (DS.bande, DS.jouer, DS.animer, DS.fond, DS.svg, DS.coupe) viennent de
   ../_detendeurs-commun/scenes-detendeurs.js ; le dessin de base, de VOYAGE_DESSIN.
   RÈGLES TENUES : valeurs QUALITATIVES ou « exemple » (la pastille « exemple » est posée sur l'écran du régulateur) ;
   texte jamais sur un tracé ; le liquide se voit liquide (nappe, bulles qui naissent au fond, vapeur en petites molécules) ;
   FLUIDE CONTINU : un tube = une paroi + un intérieur d'un seul tenant, le vide du raccord du transmetteur TRAVERSE la
   paroi du tube, l'ouverture entre le corps et le tube est dégagée ; filigrane inerWeb (R9) derrière chaque dessin ;
   rien n'est animé en CSS.
   MODÈLE (qualitatif) :
     besoin(c) = 0,15 + 0,7·c  (l'ouverture dont l'évaporateur a besoin pour la charge c)
     remplissage xf = 0,85 · ouverture / besoin  (xf = 0,85 : la nappe va « presque jusqu'à la sortie »)
     surchauffe (exemple, en K) = 7 + 40 · (0,85 − xf)  (bornée à 0 … 30) ; consigne « normale » : 7 K (exemple)
     la nappe SUIT la surchauffe avec un retard (le système met quelques secondes à se stabiliser).
   ===================================================================== */
(function () {
  "use strict";
  const DS = window.DETENDEURS_SCENES, D = window.VOYAGE_DESSIN;
  const G = window.ELECTRONIQUE_SCENES = {};
  if (!DS || !D) { console.warn("scene-electronique.js : DETENDEURS_SCENES absent."); return; }
  const el = D.el, lerp = D.lerp, bn = D.borne, frac = D.frac;
  const H = 412, DX = 30, DY = 62, KM = 0.7, CLAIR = "#f4f8fc", CUIVRE = "#a9672f", NAVY = "#1b3a63";
  const ROUGE = "#c9451a", BLEU = "#3d7fca", VERT = "#1e7e54", ORANGE = "#ff6b35", GRIS = "#637285";
  const NC = 8;                                     // les crans du moteur pas à pas (course complète)
  const NY0 = 238;                                  // haut du pointeau fermé
  const KJ = 7;                                     // la surchauffe « normale » (exemple, en K)
  const CF = 0.786;                                 // charge des vues « vanne seule » : besoin = 0,7
  const PERIODE = 4;                                // un cycle de la vanne à impulsions : quelques secondes

  /* ---------- le modèle qualitatif ---------- */
  const besoin = c => 0.15 + 0.7 * c;
  const dose = (ouv, c) => bn(0.85 * ouv / besoin(c), 0.02, 1.3);
  const xfDeSh = sh => 0.85 - (sh - KJ) / 40;
  const zoneDe = k => k <= 4 ? "bas" : k >= 11 ? "haut" : "juste";
  G.zoneDe = zoneDe;

  /* ---------- outils : chemin, signal sur un fil, anneau « la pièce qui agit » ---------- */
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
  /* un fil pointillé fin (comme dans DS.coupe("electronique")) et les petits points de signal qui y courent */
  function fil(g, pts) {
    el("path", { d: "M " + pts.map(p => p.join(" ")).join(" L "), fill: "none", stroke: "#33475b", "stroke-width": 3, "stroke-dasharray": "2 6", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    const ch = chemin(pts), P = [0, 1, 2].map(() => el("circle", { r: 5, fill: ORANGE, stroke: "#fff", "stroke-width": 1.6, opacity: 0 }, g));
    return function (t, actif, sens) {
      P.forEach((p, i) => {
        const q = frac(t * 0.7 + i / P.length), a = ch.at((sens < 0 ? 1 - q : q) * ch.len);
        p.setAttribute("cx", a[0].toFixed(1)); p.setAttribute("cy", a[1].toFixed(1)); p.setAttribute("opacity", (actif ? 0.95 * D.fenetre(q, 0, 1, 0.12) : 0).toFixed(2));
      });
    };
  }
  function anneau(g) {
    const r = el("rect", { rx: 12, fill: "none", stroke: ORANGE, "stroke-width": 5, opacity: 0 }, g);
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
  /* un tube mince : paroi de cuivre ; l'intérieur clair se dessine plus tard, par-dessus (le vide traverse la paroi) */
  function paroi(g, d, ep) { el("path", { d: d, fill: "none", stroke: CUIVRE, "stroke-width": ep, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g); }
  function vide(g, d, ep) { return el("path", { d: d, fill: "none", stroke: CLAIR, "stroke-width": ep, "stroke-linecap": "butt", "stroke-linejoin": "round" }, g); }
  const T = (g, x, y, s, at) => D.texte(g, x, y, s, Object.assign({ "font-family": "Calibri, Arial, sans-serif", fill: NAVY, "font-size": 22 }, at || {}));

  /* =====================================================================
     LA COUPE COMPLÈTE, pour une largeur W (560 à 1000, hauteur fixe 412).
     Tout est dessiné dans le repère « mécanique » (décalé de DX, DY) : le corps de la vanne à x 36…184, le tube de
     l'évaporateur à partir de x 184, y 194…250 (intérieur 204…240).
     ===================================================================== */
  function construire(svg, W, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const vue = opt.vue || "boucle", boucle = vue === "boucle", pas = vue === "pas", imp = vue === "imp";
    const etiquettes = !opt.accueil;
    const root = el("g", {}, svg), g = el("g", { transform: "translate(" + DX + " " + DY + ")" }, root);
    const Wl = W - DX, X0 = 184, XEND = Wl + 30, L = XEND - X0;
    const YT = 194, YH = 204, YB = 240;               // dessus de la paroi du tube ; intérieur haut et bas
    const xs = Wl - 90, xp = xs - 150, A = xp - X0;   // la sonde de température, le transmetteur de pression
    const REGW = 250, RX1 = xs + 40, RX0 = RX1 - REGW;
    const xb0 = 236, xb1 = Math.min(Wl - 14, xb0 + 300);   // escalier des crans / barre de temps (vues « vanne seule »)

    // la nappe va de plus en plus loin quand la surchauffe baisse ; au-delà du transmetteur, le liquide arrive à la sortie
    const PTS = [[0, XEND + 40], [1.5, xs + 18], [3.5, xp + 16], [5, X0 + 0.90 * A], [7, X0 + 0.80 * A], [10, X0 + 0.68 * A], [14, X0 + 0.54 * A], [20, X0 + 0.40 * A], [30, X0 + 0.24 * A], [40, X0 + 0.02 * A]];
    const xNappe = sh => { sh = bn(sh, 0, 40); let i = 1; while (i < PTS.length - 1 && sh > PTS[i][0]) i++; const a = PTS[i - 1], b = PTS[i]; return lerp(a[1], b[1], (sh - a[0]) / (b[0] - a[0])); };

    // ----- 1. l'évaporateur : le tube, la nappe, les bulles, la vapeur ; la chaleur de la chambre ; le raccord du transmetteur -----
    const bandeE = DS.bande(g, { x0: X0, x1: XEND, yh: YH, yb: YB, graine: 11, nbMols: Math.max(8, Math.round(L / 56)), nbBulles: Math.max(10, Math.round(L / 26)), prof: [0.8, 0.2], vapSurNappe: 0.2 });
    if (boucle) paroi(g, "M " + xp + " 176 V " + YT, 9);
    const nbH = Math.max(2, Math.floor((Wl - 60 - X0 - 50) / 70) + 1), chaleurs = [];
    for (let i = 0; i < nbH; i++) chaleurs.push({ x: X0 + 50 + i * ((Wl - 60 - X0 - 50) / (nbH - 1)), f: i / nbH, maj: D.chaleur(el("g", {}, g)) });

    // ----- 2. le corps de la vanne : laiton, chambres, siège, conduite HP, ouverture vers l'évaporateur -----
    el("rect", { x: 36, y: 150, width: 148, height: 180, rx: 12, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2.5 }, g);
    const clair = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: CLAIR }, g);
    const lanc = (x, y, w, h) => el("rect", { x: x, y: y, width: w, height: h, fill: D.couleur(0.62, false), opacity: 0.88 }, g);
    clair(58, 150, 104, 94);                                                          // la chambre basse pression
    const brume = el("rect", { x: 58, y: 150, width: 104, height: 94, fill: D.couleur(0.1, false), opacity: 0 }, g);
    el("rect", { x: 58, y: 244, width: 40, height: 12, fill: "#8a6a1f" }, g); el("rect", { x: 122, y: 244, width: 40, height: 12, fill: "#8a6a1f" }, g);   // le siège
    clair(58, 256, 104, 62); lanc(58, 256, 104, 62);                                  // la chambre haute pression
    D.tube(g, -DX, 262, 44 + DX, 44, "cuivre", false, CLAIR);                         // la conduite HP qui arrive
    clair(36, 272, 26, 24); lanc(-DX, 272, 62 + DX, 24);                              // l'ouverture de la paroi : le liquide passe sans trait en travers
    clair(162, 204, 26, 36);                                                          // l'ouverture vers l'évaporateur
    const gidB = "el-brume-" + (++G.uid), gB = el("linearGradient", { id: gidB, x1: 0, x2: 1, y1: 0, y2: 0 }, g);   // la brume de l'ouverture s'efface vers l'évaporateur : aucune arête
    el("stop", { offset: 0, "stop-color": D.couleur(0.1, false), "stop-opacity": 1 }, gB); el("stop", { offset: 1, "stop-color": D.couleur(0.1, false), "stop-opacity": 0 }, gB);
    const brume2 = el("rect", { x: 162, y: 204, width: 26, height: 36, fill: "url(#" + gidB + ")", opacity: 0 }, g);
    const fluxP = D.courant(g, -DX + 2, 58, 274, 294, 4, 31), fluxC = D.courant(g, 62, 158, 262, 312, 4, 33);
    const mel = melange(g, imp ? chemin([[110, 256], [110, 236], [152, 236], [172, 224], [214, 224]]) : chemin([[110, 252], [110, 224], [172, 224], [214, 224]]), 14, 17);

    // ----- 3. ce qui bouge : pointeau + tige (pas à pas) ou clapet + ressort de rappel + tige (impulsions) -----
    const tige = el("rect", { x: 108, width: 4, fill: "#3f4a55" }, g);
    const aig = el("path", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const ressort = el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
    const joint = imp ? el("rect", { x: 90, width: 40, height: 3.5, fill: "#2b2f35" }, g) : null;
    el("rect", { x: 56, y: 140, width: 108, height: 14, rx: 3, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2 }, g);   // le chapeau du corps, fermé : la tige le traverse

    // ----- 4. la tête : moteur pas à pas (rotor à repère rouge, crans) ou bobine (enroulement de cuivre) -----
    let rotor = null, voyant = null, cadreBobine = null, spires = [];
    if (imp) {
      el("rect", { x: 70, y: 34, width: 80, height: 106, rx: 10, fill: "url(#vm-noir)", stroke: "#000", "stroke-width": 2 }, g);
      cadreBobine = el("rect", { x: 66, y: 30, width: 88, height: 114, rx: 12, fill: "none", stroke: ORANGE, "stroke-width": 4, opacity: 0 }, g);
      for (let k = 0; k < 7; k++) spires.push(el("line", { x1: 82, x2: 138, y1: 56 + k * 12, y2: 56 + k * 12, stroke: "#d9893f", "stroke-width": 6, "stroke-linecap": "round" }, g));
      voyant = el("circle", { cx: 110, cy: 43, r: 5, fill: "#8a949f", stroke: "#000", "stroke-width": 1.5 }, g);
    } else {
      el("rect", { x: 70, y: 34, width: 80, height: 106, rx: 10, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2.5 }, g);
      [52, 118].forEach(y => el("rect", { x: 70, y: y, width: 80, height: 8, fill: "#4e5a66" }, g));
      el("circle", { cx: 110, cy: 86, r: 24, fill: "#e3e8ee", stroke: "#4e5a66", "stroke-width": 3 }, g);
      for (let k = 0; k < NC; k++) { const a = k * 2 * Math.PI / NC; el("line", { x1: 110 + 28 * Math.sin(a), y1: 86 - 28 * Math.cos(a), x2: 110 + 33 * Math.sin(a), y2: 86 - 33 * Math.cos(a), stroke: "#33475b", "stroke-width": 2.5, "stroke-linecap": "round" }, g); }
      rotor = el("g", {}, g); el("rect", { x: 106, y: 64, width: 8, height: 22, rx: 3, fill: ROUGE }, rotor);
    }
    el("rect", { x: 150, y: 40, width: 12, height: 16, rx: 3, fill: "url(#vm-noir)" }, g);   // le presse-étoupe du câble

    // ----- 5. les fils pointillés, le régulateur, le transmetteur, la sonde (vue « boucle »), l'escalier ou la barre (vues seules) -----
    let signalSondes = null, signalVanne = null, signalPression = null;
    let majEcran = null, majSonde = null, escalier = null, barre = null;
    const zones = { moteur: [60, 24, 100, 126], bobine: [60, 24, 100, 126], pointeau: [68, 224, 84, 106], clapet: [78, 204, 64, 56] };
    if (boucle) {
      signalVanne = fil(g, [[RX0, 48], [162, 48]]);
      signalSondes = fil(g, [[xs, 148], [xs, 106]]);
      signalPression = fil(g, [[xp, 118], [xp, 106]]);
      // le régulateur : boîtier marine, écran clair (jamais de texte sur un tracé), pastilles au-dessus
      el("rect", { x: RX0, y: -20, width: REGW, height: 126, rx: 10, fill: NAVY }, g);
      el("rect", { x: RX0 + 8, y: -12, width: REGW - 16, height: 110, rx: 6, fill: "#e9f1fa" }, g);
      const gx = RX0 + REGW - 16;
      T(g, RX0 + 16, 24, "surchauffe"); T(g, RX0 + 16, 56, "consigne");
      const tSh = T(g, gx, 26, "7 K", { "font-size": 34, "font-weight": 700, "text-anchor": "end" });
      const tKa = T(g, gx, 58, "7 K", { "font-size": 28, "font-weight": 700, "text-anchor": "end" });
      const led = el("circle", { cx: RX0 + 28, cy: 81, r: 9, fill: VERT, stroke: NAVY, "stroke-width": 1.5 }, g);
      const tOr = T(g, RX0 + 46, 88, "ne change rien", { "font-weight": 700 });
      majEcran = function (sh, kappa) {
        const d = sh - kappa, col = d > 1.5 ? ROUGE : d < -1.5 ? "#1f5b99" : VERT;
        tSh.textContent = Math.round(sh) + " K"; tSh.setAttribute("fill", col);
        tKa.textContent = Math.round(kappa) + " K";
        led.setAttribute("fill", d > 1.5 ? ORANGE : d < -1.5 ? BLEU : VERT);
        tOr.textContent = d > 1.5 ? "ouvre la vanne" : d < -1.5 ? "ferme la vanne" : "ne change rien"; tOr.setAttribute("fill", col);
      };
      if (etiquettes) {
        D.pastille(g, RX0, -36, "régulateur", NAVY, 24, "start"); D.pastille(g, RX1, -36, "exemple", GRIS, 24, "end");
        D.pastille(g, 110, 18, "vanne", NAVY, 24, "middle");
        D.pastille(g, (xp + xs) / 2, 168, "sondes", NAVY, 24, "middle");
      }
      // le transmetteur de pression : corps d'acier, raccord de laiton, câble ; son vide traverse la paroi du tube
      el("rect", { x: xp - 14, y: 130, width: 28, height: 36, rx: 5, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
      el("rect", { x: xp - 19, y: 166, width: 38, height: 10, rx: 2, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 1.5 }, g);
      el("rect", { x: xp - 8, y: 118, width: 16, height: 12, rx: 3, fill: "url(#vm-noir)" }, g);
      vide(g, "M " + xp + " 171 V 208", 4);
      // la sonde de température : boîtier noir, pointe qui prend la couleur du gaz, selle d'acier posée sur la paroi du tube
      // (la selle s'arrête à la paroi : rien ne traverse l'intérieur du tube)
      el("rect", { x: xs - 12, y: 148, width: 24, height: 38, rx: 5, fill: "url(#vm-noir)" }, g);
      const pointe = el("rect", { x: xs - 12, y: 172, width: 24, height: 14, rx: 3, fill: "#9fc8f0", opacity: 0.95 }, g);
      el("rect", { x: xs - 17, y: 184, width: 34, height: 19, rx: 3, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
      majSonde = col => pointe.setAttribute("fill", col);
      zones.regulateur = [RX0 - 6, -26, REGW + 12, 138];
      zones.sondes = [xp - 28, 112, xs + 26 - (xp - 28), 148];
      zones.evaporateur = [X0 - 6, 186, Wl - X0 + 6, 110];
    } else {
      const sig = fil(g, [[162, 48], [xb0, 48]]);
      signalVanne = (t, on) => sig(t, on, 1);
      if (etiquettes) { D.pastille(g, 110, 18, imp ? "bobine" : "moteur", NAVY, 24, "middle"); }
      if (pas) {
        const w = (xb1 - xb0 - 6 * (NC - 1)) / NC;
        escalier = [];
        for (let k = 0; k < NC; k++) { const h = 14 + 10 * k; escalier.push(el("rect", { x: xb0 + k * (w + 6), y: 90 - h, width: w, height: h, rx: 4, fill: "#e6edf4", stroke: NAVY, "stroke-width": 2 }, g)); }
        if (etiquettes) D.pastille(g, xb0, -12, "crans", NAVY, 24, "start");
        zones.crans = [xb0 - 8, 0, xb1 - xb0 + 16, 100];
      } else {
        const w = xb1 - xb0;
        el("rect", { x: xb0, y: 30, width: w, height: 36, rx: 8, fill: "#e6edf4", stroke: NAVY, "stroke-width": 2 }, g);
        const ouv = el("rect", { x: xb0, y: 30, width: 1, height: 36, rx: 8, fill: ORANGE, opacity: 0.88 }, g);
        const curseur = el("line", { x1: xb0, x2: xb0, y1: 22, y2: 74, stroke: NAVY, "stroke-width": 4, "stroke-linecap": "round" }, g);
        let pOuvert = null, pFerme = null;
        if (etiquettes) { pOuvert = D.pastille(g, xb0, 4, "ouvert", ROUGE, 24, "start"); pFerme = D.pastille(g, xb0, 4, "fermé", GRIS, 24, "start"); }
        barre = function (phi, t, courant) {
          const wo = Math.max(0, phi * w);
          ouv.setAttribute("width", Math.max(1, wo).toFixed(1)); ouv.setAttribute("rx", Math.min(8, wo / 2).toFixed(1)); ouv.setAttribute("opacity", wo < 1 ? 0 : 0.88);
          const p = courant ? frac(t / PERIODE) : 0, x = xb0 + p * w;
          curseur.setAttribute("x1", x.toFixed(1)); curseur.setAttribute("x2", x.toFixed(1));
          const ouvert = courant && p < phi;
          if (pOuvert) { pOuvert.setAttribute("opacity", ouvert ? 1 : 0); pFerme.setAttribute("opacity", ouvert ? 0 : 1); }
        };
        zones.barre = [xb0 - 8, 12, w + 16, 72];
      }
      zones.evaporateur = [X0 - 6, 186, Wl - X0 + 6, 110];
    }
    if (etiquettes) { D.pastille(g, -DX + 28, 243, "HP", ROUGE, 26, "middle"); D.pastille(g, X0 + 40, 172, "BP", NAVY, 24, "middle"); }
    const voirZones = anneaux(el("g", {}, g), zones);

    // ----- l'état : retard du système (la nappe suit la surchauffe), rotor, claquement du clapet -----
    let tPrec = 0, amorce = false, rotInit = false, xfS = 0.85, rotS = 0, ouvB = 0, dernierEtat = "";
    function maj(e, t, info) {
      e = e || {};
      const dt = bn(t - tPrec, 0, 0.1); tPrec = t;
      const regule = e.kappa !== undefined, kappa = regule ? e.kappa : KJ;
      const c = pas || imp ? CF : (e.c === undefined ? 0.5 : e.c);
      // 1. l'ouverture ordonnée, et le remplissage vers lequel va l'évaporateur
      let ouvVis = 0, xfT = 0.85, phiEff = 0, courant = true;
      if (boucle) {
        const cmd = bn(e.ouv === undefined ? besoin(c) : e.ouv, 0, 1);
        if (regule) { xfT = bn(xfDeSh(kappa), 0.02, 1.3); ouvVis = Math.round(bn(xfS * besoin(c) / 0.85, 0, 1) * NC) / NC; }
        else { ouvVis = Math.round(cmd * NC) / NC; xfT = dose(ouvVis, c); }
      } else if (pas) {
        ouvVis = Math.round(bn(e.pas === undefined ? 0.5 : e.pas, 0, 1) * NC) / NC; xfT = dose(ouvVis, c);
      } else {
        courant = (e.courant === undefined ? 1 : e.courant) > 0.5;
        phiEff = courant ? bn(e.phi === undefined ? 0.5 : e.phi, 0, 1) : 0;
        xfT = dose(phiEff, c);
        ouvB += ((courant && frac(t / PERIODE) < phiEff ? 1 : 0) - ouvB) * Math.min(1, dt * 18);
        ouvVis = ouvB;
      }
      const tau = e.tau || (imp ? 0.9 : 1.1);
      xfS = amorce ? xfS + (xfT - xfS) * (1 - Math.exp(-dt / tau)) : xfT; amorce = true;
      const shR = KJ + 40 * (0.85 - xfS), sh = bn(shR, 0, 30), xN = xNappe(shR), xfD = (xN - X0) / L;
      const tout = 0.1 + 0.55 * bn((sh - 2) / 28, 0, 1);
      // 2. l'évaporateur : la nappe, les bulles, la vapeur, la chaleur de la chambre
      const debit = imp ? Math.max(phiEff, 0.04) : Math.max(ouvVis, 0.04);
      bandeE.maj({ xf: xfD, flash: bn(0.4 + 0.6 * debit, 0, 1), froid: 1, sortie: tout }, t);
      chaleurs.forEach(h => { const q = frac(h.f + t * 0.5); h.maj(h.x, 266 + 6 * (1 - q), 180, D.fenetre(q, 0, 1, 0.25) * (0.45 + 0.55 * c)); });
      // 3. la vanne
      if (imp) {
        const gap = 18 * ouvB, top = 232 - gap;
        aig.setAttribute("d", "M 92 " + top.toFixed(1) + " H 128 Q 132 " + top.toFixed(1) + " 132 " + (top + 4).toFixed(1) + " V " + (top + 12).toFixed(1) + " H 88 V " + (top + 4).toFixed(1) + " Q 88 " + top.toFixed(1) + " 92 " + top.toFixed(1) + " Z");
        joint.setAttribute("y", (top + 9).toFixed(1));
        let d = "M 110 160"; const bas = top - 1;
        for (let k = 1; k <= 8; k++) d += " L " + (k % 2 ? 97 : 123) + " " + (160 + (bas - 160) * k / 8).toFixed(1);
        ressort.setAttribute("d", d + " L 110 " + bas.toFixed(1));
        tige.setAttribute("y", 154); tige.setAttribute("height", (top + 2 - 154).toFixed(1)); tige.setAttribute("x", 108);
        voyant.setAttribute("fill", ouvB > 0.5 ? ORANGE : "#8a949f");
        cadreBobine.setAttribute("opacity", (0.9 * ouvB).toFixed(2));
        spires.forEach(s => s.setAttribute("stroke", ouvB > 0.5 ? "#ffb066" : "#d9893f"));
      } else {
        const gap = 30 * ouvVis, ny = NY0 + gap;
        aig.setAttribute("d", "M 103 " + ny.toFixed(1) + " H 117 L 132 " + (ny + 34).toFixed(1) + " H 88 Z");
        tige.setAttribute("y", 154); tige.setAttribute("height", (ny + 2 - 154).toFixed(1));
        const rotT = ouvVis * NC * (360 / NC);
        rotS = rotInit ? rotS + (rotT - rotS) * Math.min(1, dt * 9) : rotT; rotInit = true;
        rotor.setAttribute("transform", "rotate(" + rotS.toFixed(1) + " 110 86)");
        if (escalier) { const n = Math.round(ouvVis * NC); escalier.forEach((r, k) => r.setAttribute("fill", k < n ? NAVY : "#e6edf4")); }
      }
      brume.setAttribute("opacity", (0.35 * (0.2 + ouvVis) * (ouvVis > 0.02 ? 1 : 0)).toFixed(2)); brume2.setAttribute("opacity", (0.35 * (0.2 + ouvVis) * (ouvVis > 0.02 ? 1 : 0)).toFixed(2));
      fluxP(t, 55 + 90 * ouvVis); fluxC(t, 55 + 90 * ouvVis);
      mel(t, ouvVis > 0.02 ? 0.2 + 0.8 * ouvVis : 0, 0.12 + 0.12 * ouvVis);
      // 4. le régulateur, les signaux, la barre de temps
      const agit = info && info.agit, liste = agit == null ? [] : Array.isArray(agit) ? agit : [agit];
      if (boucle) {
        majEcran(sh, kappa); majSonde(D.couleur(tout, false));
        const d = sh - kappa, vit = opt.exo || opt.accueil;       // exercice et sommaire : la boucle vit seule
        const calc = vit || liste.includes("sondes") || liste.includes("regulateur"), ordre = vit ? Math.abs(d) > 1.5 : liste.includes("moteur");
        signalSondes(t, calc, 1); signalPression(t, calc, 1); signalVanne(t, ordre, -1);
      } else {
        signalVanne(t, imp ? ouvB > 0.5 : liste.includes("moteur") || liste.includes("crans"));
        if (barre) barre(phiEff, t, courant);
      }
      voirZones(agit, t);
      // 5. l'exercice : où en est-on ? (la zone, et si c'est stabilisé)
      if (opt.exo && typeof e.onEtat === "function") {
        const stable = Math.abs(xfS - xfT) < 0.012, z = zoneDe(kappa), cle = z + "/" + stable;
        if (cle !== dernierEtat) { dernierEtat = cle; e.onEtat(z, stable, sh); }
      }
    }
    return { maj: maj };
  }
  G.uid = 0;

  /* ---------- monter : un <svg> qui se redessine selon la largeur disponible (W = 560 à 1000, hauteur fixe 412) ---------- */
  function monter(hote, opt) {
    const svg = DS.svg(hote, "ds-svg el-svg", opt.aria);
    let W = 0, inst = null, e = {}, t = 0, info = null, recu = false;
    const bati = () => {
      const r = svg.getBoundingClientRect();
      const ratio = r.width > 40 && r.height > 40 ? r.width / r.height : 2.3;
      const w = Math.round(bn(H * ratio, 560, 1000) / 20) * 20;
      if (w === W) return;
      W = w; svg.textContent = ""; inst = construire(svg, W, opt); if (recu) inst.maj(e, t, info);   // la première image vient de l'appelant : elle fixe l'état de départ
    };
    if (window.ResizeObserver) new ResizeObserver(bati).observe(svg);
    bati();
    return { svg: svg, maj: function (ee, tt, ii) { e = ee; t = tt; info = ii; recu = true; if (inst) inst.maj(ee, tt, ii); } };
  }
  G.monter = monter;

  const ARIA_BOUCLE = "Coupe d’un détendeur électronique devant son évaporateur : la vanne à moteur pas à pas, un transmetteur de pression et une sonde de température à la sortie de l’évaporateur, et le régulateur, dont l’écran affiche la surchauffe calculée et la consigne. Des fils pointillés relient les sondes au régulateur, et le régulateur à la vanne.";

  /* ---------- le sommaire : la boucle de réglage qui suit une charge qui varie ---------- */
  G.accueil = function (hote) {
    DS.fond(hote);
    const sc = monter(hote, { vue: "boucle", accueil: true, aria: ARIA_BOUCLE });
    DS.animer(hote, t => { const c = 0.55 + 0.25 * Math.sin(t * 0.5); sc.maj({ c: c, ouv: besoin(c) }, t, null); });
  };

  /* ---------- écran 1 : la carte d'identité (la coupe de la gare 0, au repos) et les trois acteurs, en visite guidée ---------- */
  const VISITE = [
    ["sondes", "Les sondes, à la sortie de l’évaporateur, mesurent la pression et la température du gaz."],
    ["regulateur", "Le régulateur calcule la surchauffe : température mesurée moins température de saturation."],
    ["moteur", "Il commande la vanne : un moteur pousse ou relève le pointeau, pas à pas."]
  ];
  G.identite = function (hote, symboles) {
    const carte = document.createElement("div"); carte.className = "el-carte";
    const ic = nom => '<img src="' + symboles[nom] + '" alt="">';
    carte.innerHTML = '<div class="ds-cel-tete"><img src="' + symboles.electronique + '" alt="Symbole du détendeur électronique"><b>Détendeur électronique</b></div>' +
      '<div class="ds-dessin el-id"><div class="el-coupe"></div>' +
      '<ol class="el-acteurs" aria-label="Les trois acteurs de la boucle">' +
        '<li class="el-acteur" data-agit="sondes"><span class="el-ic">' + ic("sonde") + ic("pression") + '</span><span class="el-nom"><b>Les sondes</b><small>pression et température, à la sortie</small></span></li>' +
        '<li class="el-fleche" aria-hidden="true">↓</li>' +
        '<li class="el-acteur" data-agit="regulateur"><span class="el-ic"><svg viewBox="0 0 60 44" aria-hidden="true"><rect x="2" y="2" width="56" height="40" rx="6" fill="#1b3a63"/><rect x="8" y="7" width="44" height="22" rx="3" fill="#e9f1fa"/><rect x="15" y="17" width="8" height="12" fill="#c9451a"/><rect x="31" y="11" width="8" height="18" fill="#1e7e54"/><circle cx="30" cy="36" r="3" fill="#ff6b35"/></svg></span><span class="el-nom"><b>Le régulateur</b><small>calcule la surchauffe</small></span></li>' +
        '<li class="el-fleche" aria-hidden="true">↓</li>' +
        '<li class="el-acteur" data-agit="moteur"><span class="el-ic">' + ic("electronique") + '</span><span class="el-nom"><b>La vanne</b><small>s’ouvre ou se ferme sur ordre</small></span></li>' +
      '</ol></div>' +
      '<p class="ds-explic" aria-live="off"></p><p class="ds-regle">il règle : <strong>la surchauffe, calculée</strong><br>Voir aussi : <a class="ds-lien" href="../regulateur-electronique-interactif/index.html">le régulateur</a> · <a class="ds-lien" href="../../../../cartoclim/stations/2-5-detendre/index.html">CartoClim 2.5</a></p>';
    hote.appendChild(carte);
    const dessin = carte.querySelector(".ds-dessin"), host = carte.querySelector(".el-coupe"), explic = carte.querySelector(".ds-explic");
    const acteurs = [...carte.querySelectorAll(".el-acteur")];
    DS.fond(dessin);
    const svg = DS.svg(host, "ds-svg el-svg", "Coupe d’un détendeur électronique au repos : un moteur pas à pas sur la vanne, un régulateur avec son écran, deux sondes sur le tube de sortie de l’évaporateur, reliés par des fils pointillés.");
    const coupe = DS.coupe("electronique", svg);
    let dernier = -1;
    DS.animer(hote, t => {
      const i = Math.floor(t / 3.6) % VISITE.length;
      if (i !== dernier) {
        dernier = i; explic.innerHTML = "<strong>" + (i + 1) + ".</strong> " + VISITE[i][1];
        acteurs.forEach(a => a.classList.toggle("actif", a.dataset.agit === VISITE[i][0]));
      }
      coupe.maj({ charge: 0.5 }, t, { agit: VISITE[i][0] });
    });
  };

  /* ---------- écran 2 : la boucle de réglage, pas à pas ---------- */
  G.boucle = function (hote) {
    return DS.jouer(hote, {
      init: { c: 0.5, ouv: 0.5 },
      etapes: [
        { nom: "La sortie chauffe", dire: "Il y a plus de chaleur à prendre : le liquide s’arrête plus tôt, et le gaz sort plus chaud.", cible: { c: 0.857 }, agit: "evaporateur", duree: 3.4 },
        { nom: "Les sondes mesurent", dire: "La sonde de température et le transmetteur de pression envoient leurs mesures au régulateur.", cible: {}, agit: "sondes", duree: 2.8 },
        { nom: "Le régulateur calcule", dire: "Surchauffe = température mesurée − température de saturation (lue grâce à la pression). Elle est trop haute.", cible: {}, agit: "regulateur", duree: 3.2 },
        { nom: "Il ouvre la vanne", dire: "Le moteur ouvre la vanne cran par cran : le pointeau recule un peu.", cible: { ouv: 0.75 }, agit: "moteur", duree: 3.6 },
        { nom: "Plus de liquide", dire: "Plus de liquide entre dans l’évaporateur : la nappe s’allonge.", cible: {}, agit: "evaporateur", duree: 3.2 },
        { nom: "La surchauffe redescend", dire: "La surchauffe revient vers la consigne. La boucle continue sans arrêt.", cible: {}, agit: "regulateur", duree: 3.4 }
      ],
      construire: function (dessin) { return monter(dessin, { vue: "boucle", aria: ARIA_BOUCLE }).maj; }
    });
  };

  /* ---------- écran 3 : pas à pas ou impulsions ? deux vannes côte à côte, puis « et si on arrête ? » ---------- */
  G.vannes = function (hote) {
    return DS.jouer(hote, {
      init: { pas: 0.375, phi: 0.35, courant: 1 },
      etapes: [
        { nom: "Pas à pas : cran par cran", dire: "Le moteur tourne par petits crans : le pointeau avance ou recule, l’ouverture change peu à peu.", cible: { pas: 0.75 }, agit: { pas: "moteur", imp: null }, duree: 4 },
        { nom: "Impulsions : ouvert, fermé", dire: "La bobine ouvre et ferme le clapet, par cycles de quelques secondes.", cible: {}, agit: { pas: null, imp: "bobine" }, duree: 4.4 },
        { nom: "Impulsions : la durée dose", dire: "Plus il faut de liquide, plus le clapet reste ouvert dans le cycle.", cible: { phi: 0.75 }, agit: { pas: null, imp: "barre" }, duree: 4.4 },
        { nom: "On arrête : pas à pas", dire: "Le régulateur ferme la vanne, cran par cran. Certains modèles ont une réserve d’énergie pour le faire en cas de coupure.", cible: { pas: 0 }, agit: { pas: "pointeau", imp: null }, duree: 4.4 },
        { nom: "On arrête : impulsions", dire: "Plus de courant : le clapet se ferme tout seul. La vanne fait aussi électrovanne.", cible: { courant: 0 }, agit: { pas: null, imp: "clapet" }, duree: 3.4 }
      ],
      construire: function (dessin) {
        const onglets = document.createElement("div"); onglets.className = "ds-onglets";
        const rang = document.createElement("div"); rang.className = "el-duo";
        dessin.append(onglets, rang);
        const defs = [
          { cle: "pas", titre: "Pas à pas", vue: "pas", aria: "Coupe d’une vanne électronique à moteur pas à pas : le moteur tourne par crans et le pointeau avance ou recule ; un escalier de huit marches montre le cran.", dit: s => s.pas < 0.05 ? "fermée par le régulateur" : "ouvre peu à peu, cran par cran" },
          { cle: "imp", titre: "Impulsions", vue: "imp", aria: "Coupe d’une vanne électronique à impulsions : une bobine tire le clapet, qui s’ouvre et se ferme par cycles ; une barre de temps montre la durée d’ouverture dans le cycle.", dit: s => s.courant < 0.5 ? "sans courant, elle se ferme : elle fait aussi électrovanne" : "ouverte ou fermée, par cycles" }
        ];
        const cs = defs.map((df, i) => {
          const c = document.createElement("div"); c.className = "el-cel" + (i === 0 ? " actif" : "");
          c.innerHTML = '<div class="ds-cel-tete"><b>' + df.titre + '</b></div><div class="el-coupe"></div><p class="ds-verdict info"></p>';
          rang.appendChild(c);
          const b = document.createElement("button"); b.type = "button"; b.textContent = df.titre; b.setAttribute("aria-pressed", String(i === 0));
          b.addEventListener("click", () => { cs.forEach((x, k) => { x.c.classList.toggle("actif", k === i); x.b.setAttribute("aria-pressed", String(k === i)); }); });
          onglets.appendChild(b);
          return { df: df, c: c, b: b, v: c.querySelector(".ds-verdict"), dit: "", sc: monter(c.querySelector(".el-coupe"), { vue: df.vue, aria: df.aria }) };
        });
        let kPrec = -2;
        return function (e, t, info) {
          const a = info && info.agit && typeof info.agit === "object" && !Array.isArray(info.agit) ? info.agit : {};
          if (info && info.k !== kPrec) {          // sur petit écran, on montre la vanne dont il est question
            kPrec = info.k;
            const qui = cs.findIndex(c => a[c.df.cle]);
            if (qui >= 0) cs.forEach((x, k) => { x.c.classList.toggle("actif", k === qui); x.b.setAttribute("aria-pressed", String(k === qui)); });
          }
          cs.forEach(c => {
            c.sc.maj(e, t, { agit: a[c.df.cle] });
            const dit = c.df.dit(e); if (dit !== c.dit) { c.dit = dit; c.v.textContent = dit; }
            c.v.style.opacity = "1";
          });
        };
      }
    });
  };

  /* ---------- écran 4 : régler la consigne de surchauffe ; `etat.kappa` est lu à chaque image, `etat.onEtat` est appelée ---------- */
  G.exo = function (hote, etat) {
    DS.fond(hote);
    const sc = monter(hote, { vue: "boucle", exo: true, aria: ARIA_BOUCLE + " La consigne de surchauffe se règle sur le régulateur, avec les boutons moins et plus ; la nappe de liquide dans l’évaporateur s’allonge ou se raccourcit." });
    DS.animer(hote, t => sc.maj({ kappa: etat.kappa, c: 0.5, onEtat: etat.onEtat, tau: 1.1 }, t, { agit: null }));
    return sc;
  };
})();
