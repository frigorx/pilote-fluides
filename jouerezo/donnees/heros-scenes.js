/* =====================================================================
   heros-scenes.js — les scènes dessinées du « Circuit dont vous êtes le
   héros » (scénario : donnees/heros.js ; moteur : moteur/aventure.js)
   ---------------------------------------------------------------------
   RÔLE : remplir chaque emplacement <div class="heros-scene"
   data-heros="<id>"> posé par le scénario : l'organe EN COUPE avec le
   fluide dedans, l'héroïne du Voyage dans son état (liquide en nappe,
   bulles, vapeur en petites molécules) ; dessous, une bande HTML : la
   carte « où je suis » (circuit des huit organes, croix du frigoriste),
   le symbole de l'organe avec son nom, puis trois pastilles — pression,
   état, température — chaque mot avec son petit dessin.
   L'ÉTAT DU JEU SE LIT DANS LA PAGE, sans rien demander au moteur :
   une réponse .reponse.ok dans la carte → l'héroïne passe l'organe et
   change d'état ; .reponse.nok → elle bute et reste sur place ; sinon
   elle attend à l'entrée. La scène « fin » est le diagramme enthalpique
   (moteur/voyage-diagramme.js) : la molécule y boucle son cycle.
   RÉEMPLOI, RIEN DE NEUF : toutes les briques viennent de VOYAGE_DESSIN
   (moteur/voyage-dessin.js : héroïne, nappe, bulles, gouttes, molécules
   de vapeur, métaux, ventilateur, air, chaleur, circuit, filigrane) ;
   les symboles sont ceux de la bibliothèque (voyage/symboles/).
   ANIMATION : une seule boucle requestAnimationFrame, tout calculé à
   partir du temps. Jamais conditionnée au réglage « réduire les animations » du système : une
   animation de contenu se joue toujours (règle de Franck).
   PIÈGES : (1) aucun texte DANS les dessins (sauf le filigrane, derrière) :
   les mots sont en HTML, lisibles à 14 pt et jamais posés sur un tracé ;
   (2) l'héroïne est dessinée SOUS la nappe : on la voit à travers le
   liquide, comme dans le Voyage ; (3) toile des organes 1000 × 600,
   celle du diagramme = sa zone (VOYAGE_DIAGRAMME_ZONE).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  if (!D) return;
  const L = 1000, H = 600;

  /* les états du fluide — code couleur de la station « Le circuit, organe par organe » :
     liquide HP tiède, mélange BP très froid, vapeur BP encore froide, vapeur HP très chaude */
  const ETATS = {
    liqHP: { pression: "haute", forme: "liquide", mot: "liquide", chaleur: "tiède", temp: 0.52, niveau: 0.55 },
    melBP: { pression: "basse", forme: "bout", mot: "liquide qui bout", chaleur: "très froide", temp: 0.05, niveau: 0.1 },
    vapBP: { pression: "basse", forme: "vapeur", mot: "vapeur", chaleur: "froide", temp: 0.16, niveau: 0.3 },
    vapHP: { pression: "haute", forme: "vapeur", mot: "vapeur", chaleur: "très chaude", temp: 0.95, niveau: 0.95 }
  };
  /* où se trouve chaque organe sur le circuit de D.circuit (repère 1000 × 620, places de voyage-dessin.js) */
  const PLACE = { bouteille: [400, 85], detendeur: [95, 320], evaporateur: [520, 545], compresseur: [890, 320], condenseur: [620, 85] };

  /* ---------- petites briques ---------- */
  function filigrane(parent, points, l) { // le filigrane R9 du Voyage, cartouche au nom du produit (charte : « Cartouche = nom du produit »)
    const g = D.filigrane(parent, points, l);
    g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "JouéRézo"; });
    return g;
  }
  function tube(g, x, y, l, h, interieur) { // tube coupé en long : paroi cuivre, intérieur clair
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 6, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: x, y: y + 12, width: l, height: h - 24, fill: interieur || "#f4f8fc" }, g);
    return { x0: x, x1: x + l, yh: y + 12, yb: y + h - 12 };
  }
  function plein(g, T, temp, graine, vitesse) { // un tube plein de liquide : nappe + reflets qui filent (on voit qu'il coule)
    const liq = D.liquide(g, { x0: T.x0, x1: T.x1, yh: T.yh, yb: T.yb, niveau: () => 1, couleur: () => D.couleur(temp, false) });
    const cour = D.courant(g, T.x0, T.x1, T.yh, T.yb, 6, graine);
    return t => { liq.maj(t); cour(t, vitesse); };
  }
  function vapeurs(g, n, graine, T, sens) { // petites molécules de vapeur qui filent dans un tube
    const r = D.alea(graine), M = [];
    for (let i = 0; i < n; i++) M.push({ s: r(), v: r(), ph: r() * 6.28, maj: D.mol(g) });
    return function (t, vitesse, temp, bas) { // bas(x) : la surface du liquide (la vapeur reste au-dessus)
      M.forEach(m => {
        const f = D.frac(m.s + t * vitesse / (T.x1 - T.x0)), x = sens > 0 ? T.x0 + f * (T.x1 - T.x0) : T.x1 - f * (T.x1 - T.x0);
        const b = bas ? bas(x) : T.yb, libre = b - T.yh;
        const y = T.yh + 16 + m.v * Math.max(0, libre - 32) + Math.sin(t * 3 + m.ph) * 4;
        const op = (bas ? D.borne((libre - 34) / 30, 0, 1) : 1) * D.fenetre(f, 0, 1, 0.05);
        m.maj(x, y, typeof temp === "function" ? temp(x) : temp, true, op);
      });
    };
  }
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); }; // l'héroïne passe sous la nappe ou au-dessus (comme le Voyage)
  const flotte = (surf, yh, t) => Math.max(surf + 4 + Math.sin(t * 2) * 4, yh + 46); // à moitié dans le liquide
  const toile = svg => { // fond, définitions (dégradés, molécule), filigrane derrière tout
    D.defs(svg);
    D.el("rect", { x: 0, y: 0, width: L, height: H, rx: 22, fill: "#f9fbfe" }, svg);
    filigrane(svg, [[210, 110], [500, 300], [800, 500]], 300);
  };
  /* une batterie à ailettes (évaporateur, condenseur) : ailettes derrière le tube, air qui la traverse, chaleur */
  function batterie(svg, o) {
    for (let x = 150; x <= 850; x += 22) D.el("rect", { x: x, y: 190, width: 6, height: 362, fill: "url(#vm-acier-h)", opacity: 0.5 }, svg);
    const air = D.el("g", {}, svg), chaud = D.el("g", {}, svg);
    const ch = [], fl = [];
    for (let k = 0; k < 6; k++) for (let j = 0; j < 3; j++) ch.push({ x: 210 + k * 116, f: j / 3, maj: D.chevron(air) });
    for (let k = 0; k < 5; k++) [-1, 1].forEach(c => fl.push({ x: 268 + k * 116, c: c, f: D.frac(k * 0.37 + (c > 0 ? 0.5 : 0)), maj: D.chaleur(chaud) }));
    return function (t) {
      ch.forEach(c => { // l'air descend du ventilateur à travers les ailettes ; caché là où il croise le tube
        const f = D.frac(c.f + t * 0.16), y = 170 + f * 410;
        c.maj(c.x, y, 0, y < 375 ? o.air[0] : o.air[1], D.fenetre(f, 0, 1, 0.1) * (y > 268 && y < 484 ? 0 : 0.85));
      });
      fl.forEach(a => { // la chaleur : vers le tube (o.chaleur > 0, évaporateur) ou vers l'air (< 0, condenseur)
        const f = D.frac(a.f + t * 0.45), d = 46 * f, entre = o.chaleur > 0;
        const y = a.c < 0 ? (entre ? 240 + d : 286 - d) : (entre ? 512 - d : 466 + d);
        a.maj(a.x, y, (a.c < 0) === entre ? 0 : 180, D.fenetre(f, 0, 1, 0.25));
      });
    };
  }

  /* ---------- les scènes : function (svg) → { organe, nom, avant, apres, carte, bascule, maj(t, phase, tp) → progression 0..1 } ---------- */
  const S = {};

  /* le départ : la bouteille de liquide en coupe ; l'héroïne au fond, dans la nappe */
  S.depart = function (svg) {
    toile(svg);
    const X0 = 380, X1 = 620, YH = 130, YB = 580;
    // arrivée (du condenseur) par le haut, à droite ; départ par le tube plongeur, à gauche — les deux pleins de liquide
    const arrivee = plein(svg, tube(svg, 576, 40, 444, 64), ETATS.liqHP.temp, 3, -60);
    const depart = plein(svg, tube(svg, -20, 40, 460, 64), ETATS.liqHP.temp, 4, -60);
    D.el("rect", { x: X0, y: YH, width: X1 - X0, height: YB - YH, rx: 74, fill: "url(#vm-acier-h)", stroke: "#56636f", "stroke-width": 3 }, svg);
    const cid = "heros-bouteille-" + Math.random().toString(36).slice(2, 8);
    D.el("rect", { x: X0 + 16, y: YH + 16, width: X1 - X0 - 32, height: YB - YH - 32, rx: 60 }, D.el("clipPath", { id: cid }, svg));
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, svg);
    D.el("rect", { x: X0 + 16, y: YH + 16, width: X1 - X0 - 32, height: YB - YH - 32, fill: "#f4f8fc" }, dedans);
    D.el("rect", { x: 410, y: 100, width: 30, height: 448, rx: 6, fill: "url(#vm-cuivre-h)" }, dedans); // le tube plongeur
    D.el("rect", { x: 417, y: 100, width: 16, height: 448, fill: D.couleur(ETATS.liqHP.temp, false), opacity: 0.82 }, dedans); // plein de liquide
    D.el("rect", { x: 410, y: 92, width: 30, height: 62, fill: "url(#vm-cuivre-h)" }, svg); // il traverse le haut de la bouteille
    D.el("rect", { x: 417, y: 92, width: 16, height: 62, fill: D.couleur(ETATS.liqHP.temp, false), opacity: 0.82 }, svg);
    D.el("rect", { x: 576, y: 92, width: 30, height: 62, fill: "url(#vm-cuivre-h)" }, svg); // l'arrivée
    D.el("rect", { x: 583, y: 92, width: 16, height: 62, fill: D.couleur(ETATS.liqHP.temp, false), opacity: 0.82 }, svg);
    const liq = D.liquide(dedans, { x0: X0, x1: X1, yh: YH + 16, yb: YB - 16, niveau: () => 0.6, couleur: () => D.couleur(ETATS.liqHP.temp, false) });
    const gouttes = D.bulles(D.el("g", {}, dedans), 10, 19, true);
    const mila = D.heroine(dedans, { r: 30 }); // dessinée après la nappe : au fond du liquide, on la voit (le liquide bouge en elle)
    return { organe: "bouteille", nom: "Bouteille de liquide", avant: "liqHP", apres: "liqHP", carte: [8, 8], bascule: 0,
      maj: function (t) {
        liq.maj(t); arrivee(t); depart(t);
        gouttes(t, q => { const x = 591 + (q - 0.5) * 12; return [x, 150, liq.surface(x, t), 1, D.couleur(ETATS.liqHP.temp, false)]; });
        mila({ x: 525, y: 470 + Math.sin(t * 1.7) * 7, s: 1.75, t: t, temp: ETATS.liqHP.temp, etat: "liquide", humeur: "sourire", regard: [-0.8, 0.3] });
        return 0;
      } };
  };

  /* le détendeur thermostatique en coupe : le liquide se faufile par l'orifice, la pression chute, il bout */
  S.detendeur = function (svg) {
    toile(svg);
    const tin = tube(svg, -20, 290, 380, 170), tout = tube(svg, 640, 290, 380, 170);
    D.el("path", { d: "M 560 170 C 660 120 780 70 1000 54", fill: "none", stroke: "#10233c", "stroke-width": 4 }, svg); // capillaire vers le bulbe
    D.el("path", { d: "M 424 238 L 424 196 Q 424 150 500 150 Q 576 150 576 196 L 576 238 Z", fill: "url(#vm-acier)", stroke: "#56636f", "stroke-width": 3 }, svg);
    D.el("line", { x1: 428, y1: 202, x2: 572, y2: 202, stroke: "#56636f", "stroke-width": 3 }, svg); // la membrane
    D.el("rect", { x: 360, y: 230, width: 280, height: 290, rx: 26, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 3 }, svg);
    const CE = { x0: 360, x1: 484, yh: 330, yb: 420 }, CS = { x0: 516, x1: 640, yh: 330, yb: 420 };
    [CE, CS].forEach(c => D.el("rect", { x: c.x0, y: c.yh, width: c.x1 - c.x0, height: c.yb - c.yh, fill: "#f4f8fc" }, svg));
    D.el("rect", { x: 484, y: 368, width: 32, height: 14, fill: "#f4f8fc" }, svg); // l'orifice
    D.el("rect", { x: 489, y: 236, width: 22, height: 132, fill: "#f4f8fc" }, svg); // le logement du pointeau
    const vap = D.el("g", {}, svg), sous = D.el("g", {}, svg);
    const entree = plein(svg, tin, ETATS.liqHP.temp, 5, 70), canal = plein(svg, CE, ETATS.liqHP.temp, 9, 70);
    D.el("rect", { x: 484, y: 369, width: 32, height: 12, fill: D.couleur(0.3, false), opacity: 0.8 }, svg); // le filet de liquide
    const nS = D.liquide(svg, { x0: CS.x0, x1: CS.x1, yh: CS.yh, yb: CS.yb, niveau: () => 0.48, couleur: () => D.couleur(0.05, false) });
    const nT = D.liquide(svg, { x0: tout.x0, x1: tout.x1, yh: tout.yh, yb: tout.yb, niveau: () => 0.42, couleur: () => D.couleur(0.05, false) });
    const bul = D.bulles(D.el("g", {}, svg), 26, 13);
    const fume = vapeurs(vap, 14, 17, tout, 1);
    const dessus = D.el("g", {}, svg);
    const pointeau = D.el("path", { d: "M 491 238 L 509 238 L 509 332 L 502 366 L 498 366 L 491 332 Z", fill: "url(#vm-acier)", stroke: "#56636f", "stroke-width": 2 }, svg);
    const mila = D.heroine(dessus, { r: 30 });
    const surf = (x, t) => x < 640 ? nS.surface(x, t) : nT.surface(x, t);
    return { organe: "detendeur", nom: "Détendeur", avant: "liqHP", apres: "melBP", carte: [12.6, 13.6], bascule: 1.4,
      maj: function (t, phase, tp) {
        entree(t); canal(t); nS.maj(t); nT.maj(t);
        bul(t, q => { const x = D.lerp(522, 1010, q); return [x, (x < 640 ? CS.yb : tout.yb) - 6, surf(x, t) + 4, 1]; });
        fume(t, 60, 0.08, x => surf(x, t));
        let x = 200, s = 1.5, y = 375 + Math.sin(t * 2) * 4, etat = "liquide", temp = ETATS.liqHP.temp, humeur = "sourire", ferme = 0, p = 0;
        if (phase === "passe") {
          x = D.courbe([[0, 200], [0.9, 430], [1.5, 570], [2.6, 780]], tp);
          s = D.courbe([[0, 1.5], [0.9, 0.9], [1.2, 0.24], [1.5, 1.0], [2.6, 1.5]], tp);
          const apres = tp > 1.2;
          etat = apres ? "bout" : "liquide";
          temp = D.courbe([[1.1, ETATS.liqHP.temp], [1.7, ETATS.melBP.temp]], tp);
          humeur = tp < 0.4 ? "sourire" : tp < 2.2 ? "surprise" : "froid";
          y = apres ? D.lerp(375, flotte(surf(x, t), tout.yh, t), D.lisse((tp - 1.4) / 0.9)) : 375;
          p = D.borne(tp / 2.6, 0, 1);
        } else if (phase === "bloque") {
          x = D.courbe([[0, 200], [0.6, 330], [1.3, 215]], tp);
          ferme = D.lisse((tp - 0.3) / 0.4);
          humeur = tp < 0.5 ? "surprise" : "triste";
        }
        pointeau.setAttribute("transform", "translate(0 " + (ferme * 14 + Math.sin(t * 1.3) * 1.5).toFixed(1) + ")");
        plan(mila, x < 500 ? dessus : sous); // liquide plein avant l'orifice : au-dessus ; mélange après : à moitié dans la nappe
        mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
        return p;
      } };
  };

  /* l'évaporateur, dans la chambre froide : l'air de la chambre lui cède sa chaleur, le liquide bout jusqu'à la dernière goutte */
  S.evaporateur = function (svg) {
    toile(svg);
    const air = batterie(svg, { air: ["#e8914a", "#3d7fca"], chaleur: 1 });
    const T = tube(svg, -20, 290, 1040, 170);
    const pDe = x => (x - T.x0) / (T.x1 - T.x0), niv = x => 0.5 * (1 - D.lisse(pDe(x) / 0.68));
    const vap = D.el("g", {}, svg), sous = D.el("g", {}, svg);
    const liq = D.liquide(svg, { x0: T.x0, x1: T.x1, yh: T.yh, yb: T.yb, niveau: niv, couleur: () => D.couleur(0.05, false) });
    const bul = D.bulles(D.el("g", {}, svg), 30, 7);
    const vapeur = vapeurs(vap, 36, 5, T, 1);
    const vent = D.ventilateur(svg, 500, 96, 64);
    const mila = D.heroine(sous, { r: 30 });
    const tempVap = x => pDe(x) < 0.7 ? 0.08 : D.lerp(0.08, ETATS.vapBP.temp, (pDe(x) - 0.7) / 0.3);
    return { organe: "evaporateur", nom: "Évaporateur", avant: "melBP", apres: "vapBP", carte: [0.05, 1.6], bascule: 3.0,
      maj: function (t, phase, tp) {
        vent(t * 400); air(t); liq.maj(t);
        bul(t, q => { const x = T.x0 + q * 0.66 * (T.x1 - T.x0); return [x, T.yb - 6, liq.surface(x, t) + 4, niv(x) > 0.06 ? 1 : 0]; });
        vapeur(t, 90, tempVap, x => liq.surface(x, t));
        let x = 110, etat = "bout", temp = ETATS.melBP.temp, humeur = "froid", envol = 0, p = 0;
        if (phase === "passe") {
          x = D.courbe([[0, 110], [4.4, 880]], tp);
          const q = pDe(x);
          etat = q < 0.6 ? "bout" : "vapeur";
          envol = D.lisse((q - 0.52) / 0.14);
          temp = q < 0.7 ? ETATS.melBP.temp : D.lerp(ETATS.melBP.temp, ETATS.vapBP.temp, D.lisse((q - 0.7) / 0.18));
          humeur = q < 0.2 ? "froid" : q < 0.62 ? "surprise" : "sourire";
          p = D.borne(tp / 4.4, 0, 1);
        } else if (phase === "bloque") {
          x = D.courbe([[0, 110], [0.5, 190], [1.1, 115]], tp);
          humeur = tp < 0.4 ? "surprise" : "triste";
        }
        const y = D.lerp(flotte(liq.surface(x, t), T.yh, t), 375 + Math.sin(t * 2.4) * 6, envol);
        mila({ x: x, y: y, s: 1.4, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
        return p;
      } };
  };

  /* le compresseur à piston, en coupe et au ralenti : il aspire la vapeur, la serre, la refoule très chaude */
  S.compresseur = function (svg) {
    toile(svg);
    const P = 2.6, TOUR = 2 * Math.PI, YT = 336, COURSE = 130; // période du ralenti ; piston : haut à YT, course
    const TA = tube(svg, -20, 100, 392, 150), TR = tube(svg, 628, 100, 392, 150, "#fbefe6");
    D.el("rect", { x: 370, y: 80, width: 260, height: 202, rx: 14, fill: "url(#vm-acier)", stroke: "#56636f", "stroke-width": 3 }, svg); // la culasse
    D.el("rect", { x: 370, y: 112, width: 106, height: 158, fill: "#eef4fa" }, svg); // chambre d'aspiration
    D.el("rect", { x: 524, y: 112, width: 106, height: 158, fill: "#fbefe6" }, svg); // chambre de refoulement
    D.el("rect", { x: 370, y: 270, width: 260, height: 12, fill: "#6b7785" }, svg); // plaque à clapets
    D.el("rect", { x: 404, y: 270, width: 70, height: 12, fill: "#eef4fa" }, svg);
    D.el("rect", { x: 526, y: 270, width: 70, height: 12, fill: "#fbefe6" }, svg);
    D.el("rect", { x: 380, y: 282, width: 240, height: 268, fill: "url(#vm-acier-h)" }, svg); // le cylindre
    D.el("rect", { x: 396, y: 282, width: 208, height: 268, fill: "#f3f6fa" }, svg);
    const mols = D.el("g", {}, svg), vA = D.el("g", {}, svg), vR = D.el("g", {}, svg);
    const bielle = D.el("rect", { x: 486, y: 0, width: 28, height: 10, fill: "url(#vm-acier-h)" }, svg);
    const piston = D.el("g", {}, svg);
    D.el("rect", { x: 398, y: 0, width: 204, height: 50, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [14, 26].forEach(y => D.el("line", { x1: 398, y1: y, x2: 602, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    const clapA = D.el("rect", { x: 404, y: 282, width: 70, height: 7, rx: 3, fill: "#24384f" }, svg);
    const clapR = D.el("rect", { x: 526, y: 263, width: 70, height: 7, rx: 3, fill: "#24384f" }, svg);
    const moteur = D.el("rect", { x: 352, y: 540, width: 296, height: 56, rx: 12, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 4 }, svg);
    D.el("path", { d: "M 506 548 L 488 572 L 502 572 L 492 592 L 520 566 L 506 566 L 516 548 Z", fill: "#ffd166" }, svg); // l'énergie du moteur électrique
    const aspi = vapeurs(vA, 12, 21, TA, 1), refo = vapeurs(vR, 12, 22, TR, 1);
    const r = D.alea(23), M = [];
    for (let j = 0; j < 14; j++) M.push({ u: 0.08 + r() * 0.84, v: 0.1 + r() * 0.8, e: r() * 0.7, w: r() * 0.6, maj: D.mol(mols) });
    const mila = D.heroine(svg, { r: 30 });
    const yp = phi => YT + (1 - Math.cos(phi)) / 2 * COURSE; // haut du piston
    let entre = null; // l'instant où l'héroïne entre (début d'une aspiration), fixé au premier passage
    return { organe: "compresseur", nom: "Compresseur", avant: "vapBP", apres: "vapHP", carte: [2.9, 4.3], bascule: 0,
      maj: function (t, phase, tp) {
        const phi = t * TOUR / P, f = D.frac(phi / TOUR) * TOUR, y = yp(phi);
        piston.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
        bielle.setAttribute("y", (y + 46).toFixed(1)); bielle.setAttribute("height", Math.max(0, 560 - y - 46).toFixed(1));
        const ouvA = f > 0.03 * TOUR && f < 0.48 * TOUR, ouvR = f > 0.8 * TOUR && f < 0.99 * TOUR;
        clapA.setAttribute("transform", "rotate(" + (ouvA ? 24 : 0) + " 404 282)");
        clapR.setAttribute("transform", "rotate(" + (ouvR ? -24 : 0) + " 596 270)");
        const serre = f < Math.PI ? 0 : D.borne((f - Math.PI) / (0.8 * Math.PI), 0, 1); // 0 aspiration → 1 fin de compression
        M.forEach(m => { // les voisines : elles entrent à l'aspiration, sont serrées, sortent par le clapet de refoulement
          const haut = 290, bas = y - 6, cx = 410 + m.u * 180, cy = haut + 10 + m.v * Math.max(6, bas - haut - 20);
          let x = cx, yy = cy, op = 1, temp = D.lerp(ETATS.vapBP.temp, 0.92, serre);
          if (f < Math.PI) { const k = D.lisse((f / Math.PI - m.e) / 0.3); x = D.lerp(440, cx, k); yy = D.lerp(276, cy, k); op = k > 0.02 ? 1 : 0; temp = ETATS.vapBP.temp; }
          else if (f > 0.8 * TOUR) { const k = D.lisse((f / TOUR - 0.8 - m.w * 0.12) / 0.07); x = D.lerp(cx, 561, k); yy = D.lerp(cy, 262, k); op = 1 - D.lisse((k - 0.8) / 0.2); temp = 0.92; }
          m.maj(x, yy, temp, true, op);
        });
        aspi(t, 70, ETATS.vapBP.temp); refo(t, 110, 0.92);
        moteur.setAttribute("stroke", D.frac(t * 1.2) < 0.5 ? "#ff6b35" : D.BLEU);
        let x = 200, yh = 175 + Math.sin(t * 2.2) * 6, s = 1.25, temp = ETATS.vapBP.temp, humeur = "sourire", ecrase = 0, p = 0;
        if (phase === "passe") {
          if (entre === null) { // la prochaine aspiration qui laisse au moins 0,6 s pour rejoindre le clapet
            const debut = t - tp, cycle = Math.ceil((debut + 0.6) / P);
            entre = cycle * P - debut;
          }
          const k = tp - entre, milieu = 290 + (y - 290) * 0.5; // k : temps depuis le début de SON aspiration ; milieu : entre plaque et piston
          if (k < 0) { const a = D.lisse(tp / Math.max(0.6, entre)); x = D.lerp(200, 439, a); yh = D.lerp(175, 200, a); humeur = "surprise"; }
          else if (k < P / 2) { const a = D.lisse(k / (P / 2)); x = D.lerp(439, 500, a); yh = D.lerp(200, milieu, a); s = D.lerp(1.25, 0.95, a); humeur = "surprise"; }
          else if (k < 0.8 * P) { const a = (k - P / 2) / (0.3 * P); x = 500; yh = milieu; s = 0.95; ecrase = 0.8 * D.lisse(a); temp = D.lerp(ETATS.vapBP.temp, ETATS.vapHP.temp, D.lisse(a)); humeur = a < 0.5 ? "surprise" : "chaud"; }
          else if (k < P) { const a = D.lisse((k - 0.8 * P) / (0.2 * P)); x = D.lerp(500, 561, a); yh = D.lerp(milieu, 200, a); s = D.lerp(0.95, 1.1, a); ecrase = 0.8 * (1 - a); temp = ETATS.vapHP.temp; humeur = "chaud"; }
          else { const a = D.lisse((k - P) / 1.1); x = D.lerp(561, 820, a); yh = D.lerp(200, 175, a) + Math.sin(t * 2.2) * 6 * a; s = D.lerp(1.1, 1.25, a); temp = ETATS.vapHP.temp; humeur = "chaud"; }
          p = D.borne(tp / (entre + P + 1.1), 0, 1);
          this.bascule = entre + P;
        } else if (phase === "bloque") {
          x = D.courbe([[0, 200], [0.6, 330], [1.3, 210]], tp);
          humeur = tp < 0.5 ? "surprise" : "triste";
        }
        mila({ x: x, y: yh, s: s, t: t, temp: temp, etat: "vapeur", humeur: humeur, ecrase: ecrase, regard: [1, 0] });
        return p;
      } };
  };

  /* le condenseur, dehors : il rend la chaleur à l'air ; la vapeur refroidit, des gouttes tombent, la nappe monte.
     Le fluide va de droite à gauche, comme sur la croix du frigoriste (et comme dans le Voyage). */
  S.condenseur = function (svg) {
    toile(svg);
    const air = batterie(svg, { air: ["#3d7fca", "#e8914a"], chaleur: -1 });
    const T = tube(svg, -20, 290, 1040, 170);
    const pDe = x => (T.x1 - x) / (T.x1 - T.x0), niv = x => D.lisse((pDe(x) - 0.22) / 0.6);
    const tempLiq = x => pDe(x) < 0.8 ? 0.6 : D.lerp(0.6, ETATS.liqHP.temp, (pDe(x) - 0.8) / 0.2);
    const tempVap = x => pDe(x) < 0.25 ? D.lerp(ETATS.vapHP.temp, 0.62, pDe(x) / 0.25) : 0.62;
    const vap = D.el("g", {}, svg), sous = D.el("g", {}, svg);
    const liq = D.liquide(svg, { x0: T.x0, x1: T.x1, yh: T.yh, yb: T.yb, niveau: niv, couleur: x => D.couleur(tempLiq(x), false) });
    const gouttes = D.bulles(D.el("g", {}, svg), 26, 37, true);
    const vapeur = vapeurs(vap, 34, 41, T, -1);
    const dessus = D.el("g", {}, svg);
    const vent = D.ventilateur(svg, 500, 96, 64);
    const mila = D.heroine(sous, { r: 30 });
    return { organe: "condenseur", nom: "Condenseur", avant: "vapHP", apres: "liqHP", carte: [5.4, 7.9], bascule: 2.6,
      maj: function (t, phase, tp) {
        vent(t * 400); air(t); liq.maj(t);
        gouttes(t, q => { const x = T.x1 - (0.2 + q * 0.62) * (T.x1 - T.x0), n = niv(x); return [x, T.yh + 6, liq.surface(x, t), n > 0.02 && n < 0.95 ? 0.95 : 0, D.couleur(tempLiq(x), false)]; });
        vapeur(t, 90, tempVap, x => liq.surface(x, t));
        let x = 900, etat = "vapeur", temp = ETATS.vapHP.temp, humeur = "chaud", pose = 0, p = 0;
        if (phase === "passe") {
          x = D.courbe([[0, 900], [4.6, 120]], tp);
          const q = pDe(x);
          temp = q < 0.25 ? D.lerp(ETATS.vapHP.temp, 0.62, q / 0.25) : q < 0.8 ? D.lerp(0.62, 0.58, (q - 0.25) / 0.55) : D.lerp(0.58, ETATS.liqHP.temp, (q - 0.8) / 0.2);
          etat = q < 0.5 ? "vapeur" : "liquide";
          pose = D.lisse((q - 0.44) / 0.14);
          humeur = q < 0.3 ? "chaud" : q < 0.62 ? "surprise" : "sourire";
          p = D.borne(tp / 4.6, 0, 1);
        } else if (phase === "bloque") {
          x = D.courbe([[0, 900], [0.5, 820], [1.1, 895]], tp);
          humeur = tp < 0.4 ? "surprise" : "triste";
        }
        const y = D.lerp(375 + Math.sin(t * 2.4) * 6, flotte(liq.surface(x, t), T.yh, t), pose);
        plan(mila, niv(x) > 0.86 ? dessus : sous); // tube plein de liquide : au-dessus, sinon on ne la verrait plus
        mila({ x: x, y: y, s: 1.4, t: t, temp: temp, etat: etat, humeur: humeur, regard: [-1, 0] });
        return p;
      } };
  };

  /* la fin : le cycle bouclé sur le diagramme enthalpique (moteur/voyage-diagramme.js) */
  S.fin = function (svg) {
    const Z = window.VOYAGE_DIAGRAMME_ZONE, data = window.JR_HEROS_DIAGRAMME;
    D.defs(svg);
    const dia = D.diagramme(svg, data);
    const fond = dia.g.querySelector("rect"), fil = filigrane(svg, [[Z.x + 150, Z.y + 120], [Z.x + Z.l / 2, Z.y + Z.h / 2], [Z.x + Z.l - 140, Z.y + Z.h - 110]], 190);
    if (fond) fond.after(fil); // le filigrane passe juste au-dessus du fond du diagramme, derrière les courbes
    const n = data.chemin.length - 1, VITESSE = 1; // un tour en 7 s, puis la molécule recommence
    const SEUILS = { detendeur: 1, evaporateur: 3, compresseur: 4, condenseur: n };
    return { organe: null, carte: null,
      maj: function (t) {
        const w = Math.max(0, t - 0.4) * VITESSE, m = w % n, vus = {};
        for (const k in SEUILS) vus[k] = w >= SEUILS[k];
        const etat = m < 0.45 ? "liquide" : m < 2 ? "bout" : m < 6 ? "vapeur" : "liquide";
        const temp = D.courbe([[0, ETATS.liqHP.temp], [0.6, ETATS.melBP.temp], [2, 0.08], [3, ETATS.vapBP.temp], [4, ETATS.vapHP.temp], [5, 0.62], [6, 0.58], [n, ETATS.liqHP.temp]], m, true);
        dia.maj(Math.max(0, w - n), w, vus, { t: t, temp: temp, etat: etat, humeur: m > 3.6 && m < 5 ? "chaud" : m > 0.6 && m < 1.4 ? "froid" : "sourire" });
        return 0;
      } };
  };

  /* ---------- la bande sous le dessin : où je suis · l'organe et son symbole · pression · état · température ---------- */
  function icone(type, e) {
    const c = D.couleur(e.temp, false), b = D.BLEU;
    if (type === "pression") { // un cadran : aiguille à droite (haute) ou à gauche (basse)
      const a = (e.pression === "haute" ? 25 : 155) * Math.PI / 180, x = (18 + 10 * Math.cos(a)).toFixed(1), y = (19 - 10 * Math.sin(a)).toFixed(1);
      return '<svg viewBox="0 0 36 28" aria-hidden="true"><path d="M 5 24 A 13 13 0 1 1 31 24" fill="#fff" stroke="' + b + '" stroke-width="2.6"/>' +
        '<path d="M 7.5 15 A 11 11 0 0 1 12 9.6" fill="none" stroke="#2f6fb8" stroke-width="3"/><path d="M 24 9.6 A 11 11 0 0 1 28.5 15" fill="none" stroke="#c0392b" stroke-width="3"/>' +
        '<line x1="18" y1="19" x2="' + x + '" y2="' + y + '" stroke="' + (e.pression === "haute" ? "#c0392b" : "#2f6fb8") + '" stroke-width="3" stroke-linecap="round"/><circle cx="18" cy="19" r="2.6" fill="' + b + '"/></svg>';
    }
    if (type === "forme") {
      if (e.forme === "vapeur") {
        const v = D.couleur(e.temp, true);
        return '<svg viewBox="0 0 32 28" aria-hidden="true">' + [[8, 9], [22, 6], [15, 18], [26, 20], [6, 22]].map(([x, y]) =>
          '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + v + '" stroke="' + b + '" stroke-width="1.4"/>').join("") + '</svg>';
      }
      return '<svg viewBox="0 0 32 28" aria-hidden="true"><path d="M 16 2 C 16 2 6 13 6 18 A 10 9 0 0 0 26 18 C 26 13 16 2 16 2 Z" fill="' + c + '" stroke="' + b + '" stroke-width="2"/>' +
        (e.forme === "bout" ? '<circle cx="12" cy="19" r="2.6" fill="#fff"/><circle cx="19" cy="15" r="2" fill="#fff"/><circle cx="18" cy="22" r="1.7" fill="#fff"/>' : '<path d="M 11 17 Q 12 12 15 10" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>') + '</svg>';
    }
    const niveau = e.niveau, haut = (24 - 18 * niveau).toFixed(1); // le thermomètre
    return '<svg viewBox="0 0 22 32" aria-hidden="true"><rect x="7.5" y="2" width="7" height="22" rx="3.5" fill="#fff" stroke="' + b + '" stroke-width="2"/>' +
      '<rect x="9.5" y="' + haut + '" width="3" height="' + (25 - haut).toFixed(1) + '" fill="' + c + '"/><circle cx="11" cy="25.5" r="5.2" fill="' + c + '" stroke="' + b + '" stroke-width="2"/></svg>';
  }
  function pastilles(e) {
    return '<span class="heros-p p-' + (e.pression === "haute" ? "hp" : "bp") + '">' + icone("pression", e) + '<span>' + e.pression + ' pression</span></span>' +
      '<span class="heros-p">' + icone("forme", e) + '<span>' + e.mot + '</span></span>' +
      '<span class="heros-p">' + icone("temp", e) + '<span>' + e.chaleur + '</span></span>';
  }
  function bande(el, sc) {
    const b = document.createElement("div");
    b.className = "heros-etat";
    const ou = document.createElement("span");
    ou.className = "heros-ou";
    const carte = D.el("svg", { viewBox: "0 0 1000 620", class: "heros-carte", "aria-hidden": "true", focusable: "false" });
    ou.appendChild(carte);
    const [px, py] = PLACE[sc.organe];
    const halo = D.el("circle", { cx: px, cy: py, r: 110, fill: "#ff6b35", opacity: 0.22 }, carte);
    const cir = D.circuit(carte, 0, 0, 1000, false);
    cir.surligne(sc.organe, true);
    const moi = D.heroine(carte, { r: 30 });
    b.appendChild(ou);
    const o = D.ORGANES[sc.organe];
    b.insertAdjacentHTML("beforeend", '<span class="heros-p heros-organe"><img src="' + D.SYM + o.f + '.svg" alt="" width="44" height="44"><span>' + sc.nom + '</span></span><span class="heros-etats"></span>');
    el.appendChild(b);
    const zone = b.querySelector(".heros-etats");
    let montre = null;
    return function (t, cle, prog) {
      if (cle !== montre) { zone.innerHTML = pastilles(ETATS[cle]); montre = cle; }
      halo.setAttribute("r", (100 + 14 * Math.sin(t * 3)).toFixed(1));
      const [cx, cy] = D.circuitPoint(D.lerp(sc.carte[0], sc.carte[1], prog));
      const e = ETATS[cle];
      moi({ x: cx, y: cy, s: 1.9, t: t, temp: e.temp, etat: e.forme === "bout" ? "bout" : e.forme, humeur: "sourire" });
    };
  }

  /* ---------- la boucle : monte les scènes posées par le moteur, les anime, lit l'état du jeu ---------- */
  const maintenant = () => performance.now() / 1000;
  function monter(el) {
    const id = el.dataset.heros, fab = S[id];
    if (!fab) return null;
    el.textContent = "";
    const fin = id === "fin";
    const svg = D.el("svg", { viewBox: fin ? (function (Z) { return Z.x + " " + Z.y + " " + Z.l + " " + Z.h; })(window.VOYAGE_DIAGRAMME_ZONE) : "0 0 " + L + " " + H,
      class: "heros-svg" + (fin ? " heros-diagramme" : ""), "aria-hidden": "true", focusable: "false" });
    el.appendChild(svg);
    const sc = fab(svg);
    return { sc: sc, bande: sc.organe ? bande(el, sc) : null, debut: maintenant(), phase: "attend", depuis: 0 };
  }
  function phaseDe(el) {
    const carte = el.closest(".scene");
    if (!carte) return "attend";
    if (carte.querySelector(".reponse.ok")) return "passe";
    if (carte.querySelector(".reponse.nok")) return "bloque";
    return "attend";
  }
  function boucle() {
    const now = maintenant();
    document.querySelectorAll(".heros-scene").forEach(function (el) {
      if (!el.__heros) el.__heros = monter(el) || { vide: true };
      const h = el.__heros;
      if (h.vide) return;
      const ph = phaseDe(el);
      if (ph !== h.phase) { h.phase = ph; h.depuis = now; }
      const t = now - h.debut, tp = now - h.depuis;
      const prog = h.sc.maj(t, h.phase, tp);
      if (h.bande) h.bande(t, h.phase === "passe" && tp >= h.sc.bascule ? h.sc.apres : h.sc.avant, prog);
    });
    requestAnimationFrame(boucle);
  }
  window.JR_HEROS_SCENES = S; // pour les essais
  requestAnimationFrame(boucle);
})();
