/* =====================================================================
   voyage-co2-scenes-a.js — le voyage, l'évaporateur, le compresseur,
   le point critique, le refroidisseur de gaz (édition CO₂)
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (g = groupe SVG de la scène, 1600 × 770 utiles ; c = { T, E, D, A(k, f) } où
   T[k]/E[k] bornent la phrase k du récit donnees/voyage-co2.js ; maj(t) rend
   { carte, temp, etat, humeur } pour la petite molécule de la carte).
   Les gestes sont accrochés au RANG des phrases : ajouter une phrase au récit
   décale tout. Les scènes avec organe (evaporateur, compresseur, refroidisseur)
   commencent leur coupe à la phrase 2 (les phrases 0-1 : la carte d'identité) ;
   intro et critique sont visibles dès le début.
   CE QUE L'ÉDITION CO₂ CHANGE ICI :
     · compresseur : le refoulement est SUPERCRITIQUE (D.supercritique), plus de
       vapeur chaude ; deux coupes de tube (fluide classique / CO₂) ;
     · critique : scène neuve — le tube de verre, la surface qui s'estompe, le
       fluide supercritique qui remplit tout ;
     · refroidisseur : plus de condensation, le fluide reste supercritique de
       bout en bout (couleur 0,95 → 0,50, grains qui se serrent) ; l'hiver, une
       nappe se forme dans la dernière partie (comme le condenseur d'origine).
   ZONES INTERDITES : en-tête (x < 760, y < 140), carte (x > 1200, y < 285),
   rien sous y = 760. LIQUIDE = nappe (D.liquide) ; VAPEUR = petites molécules ;
   SUPERCRITIQUE = volume plein sans surface, grains serrés.
   PIÈGE : fonction pure de t — les variables (hiver, niveau…) sont refaites à
   chaque appel de maj, jamais gardées d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const TITRE = "Trebuchet MS, Arial, sans-serif";
  let nid = 0;
  const ident = p => "vca-" + p + "-" + (++nid);
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));

  /* une rangée de pastilles centrée autour de cx (la largeur vraie vient de D.pastille) */
  function rangee(parent, cx, y, liste, taille, ecart) {
    const gs = liste.map(([s, fond]) => D.pastille(parent, 0, y, s, fond, taille));
    let x = cx - (gs.reduce((a, p) => a + p.largeur, 0) + ecart * (gs.length - 1)) / 2;
    gs.forEach(p => { p.setAttribute("transform", "translate(" + x.toFixed(1) + " 0)"); p.x0 = x; x += p.largeur + ecart; });
    return gs;
  }
  /* une étiquette (ou plusieurs lignes) avec son trait en pointillés, dans un groupe qu'on peut estomper */
  function etiquette(parent, x, y, lignes, at, trait) {
    const gr = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(lignes) ? lignes : [lignes]).forEach((l, i) => D.etiquette(gr, x, y + i * 38, l, at));
    if (trait) D.trait(gr, ...trait);
    return gr;
  }

  /* ---------- 0 · le voyage : titre, héroïne, la carte, ses quatre états ---------- */
  S.intro = function (g, c) {
    const titre = D.el("g", {}, g), corps = D.el("g", {}, g), fin = D.el("g", { opacity: 0 }, g);
    D.texte(titre, 800, 360, c.recit.titre, { "text-anchor": "middle", "font-size": 86, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    D.texte(titre, 800, 440, c.recit.sousTitre, { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    const cir = D.circuit(corps, 330, 150, 960, true);
    cir.g.setAttribute("opacity", 0);
    const petite = D.heroine(corps, { r: 30 });
    // pastilles de la présentation : sous la grande héroïne (k0, k1, k2), puis dans le vide de la carte (k5, k6)
    const pCO2 = D.pastille(corps, 800, 640, "CO₂", D.BLEU, 48, "middle");
    const [pR744, pPRP] = rangee(corps, 800, 640, [["R744", D.ORANGE], ["PRP = 1", D.BLEU]], 44, 36);
    const [pAvant, pApres] = rangee(corps, 800, 640, [["il y a plus de cent ans…", "#637285"], ["…et aujourd'hui", D.ORANGE]], 38, 70);
    const fleche = D.el("path", { d: "M 0 0 H 46 M 30 -14 L 46 0 L 30 14", fill: "none", stroke: D.BLEU, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, corps);
    fleche.setAttribute("transform", "translate(" + (pAvant.x0 + pAvant.largeur + 12).toFixed(1) + " 626)");
    // k5 et k6 : l'héroïne les « dit » depuis la colonne de gauche (le vide de la carte est trop étroit entre les noms des organes)
    const pBar = D.pastille(corps, 170, 330, "26 à 90 bar", D.ORANGE, 34, "middle");
    const [pDessus, pCond] = [D.pastille(corps, 170, 266, "au-dessus de 31 °C", "#c0392b", 28, "middle"), D.pastille(corps, 170, 316, "plus de condensation", "#c0392b", 28, "middle")];
    const grande = D.heroine(g, { r: 60 });
    // la fin : quatre états
    const ETATS = [["vapeur", "vapeur", 0.28, "sourire"], ["supercritique", "supercritique", 0.55, "chaud"], ["liquide", "liquide", 0.1, "sourire"], ["solide", "solide", 0.05, "froid"]];
    const quatre = ETATS.map(([nom, etat, temp, humeur], i) => {
      const x = 285 + i * 343, gr = D.el("g", {}, fin);
      D.texte(gr, x, 600, nom, { "text-anchor": "middle", "font-size": 46, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
      return { g: gr, h: D.heroine(gr, { r: 40 }), x: x, etat: etat, temp: temp, humeur: humeur };
    });
    // la molécule fait le tour de la carte : l'état change comme dans le circuit de la centrale
    const POS = { evaporateur: 0.5, compresseur: 3.5, refroidisseur: 6.5, detendeurHP: 8, bouteille: 10, detendeur: 13 };
    const tempDe = w => D.courbe([[0, 0.08], [1, 0.1], [3, 0.3], [3.6, 0.95], [6, 0.9], [8, 0.5], [8.2, 0.22], [12.6, 0.22], [13.3, 0.08], [15, 0.08]], w, true);
    const etatDe = w => w > 0.25 && w <= 0.6 ? "bout" : w > 0.6 && w < 3.6 ? "vapeur" : w >= 3.6 && w < 8.05 ? "supercritique" : "liquide";
    const tour = [c.A(3, 0.3), c.E[4]];
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      opa(titre, 1 - D.lisse((t - (T[0] - 1.4)) / 0.6));
      // la grande héroïne : sous le titre, puis au centre, puis à gauche de la carte
      const gx = D.courbe([[0, 800], [T[3] - 0.5, 800], [T[3] + 0.9, 160]], t);
      const gy = D.courbe([[0, 560], [T[0] - 0.8, 560], [T[0] + 0.6, 340], [T[3] - 0.5, 340], [T[3] + 0.9, 470]], t) + Math.sin(t * 2.2) * 8;
      const gs = D.courbe([[0, 0.9], [T[0] - 0.8, 0.9], [T[0] + 0.6, 1.6], [T[3] - 0.5, 1.6], [T[3] + 0.9, 1]], t);
      const humeur = t > A(2, 0.42) && t < A(2, 0.7) ? "triste" : t > T[5] && t < E[5] ? "surprise" : "sourire";
      grande({ x: gx, y: gy, s: gs, t: t, temp: 0.1, etat: "liquide", regard: [D.lisse((t - T[3]) / 1.4), 0], humeur: humeur, op: 1 - D.lisse((t - (T[7] - 0.6)) / 0.5) });
      // pastilles
      opa(pCO2, D.fenetre(t, A(0, 0.35), E[0] + 0.3));
      opa(pR744, D.fenetre(t, A(1, 0.12), E[1] + 0.3)); opa(pPRP, D.fenetre(t, A(1, 0.5), E[1] + 0.3));
      opa(pAvant, D.fenetre(t, T[2] + 0.2, E[2] + 0.3)); opa(pApres, D.fenetre(t, A(2, 0.68), E[2] + 0.3)); opa(fleche, D.fenetre(t, A(2, 0.62), E[2] + 0.3));
      opa(pBar, D.fenetre(t, T[5] + 0.3, E[5] + 0.3));
      opa(pDessus, D.fenetre(t, T[6] + 0.3, E[6] + 0.5)); opa(pCond, D.fenetre(t, A(6, 0.55), E[6] + 0.5));
      // la carte
      const carte = D.lisse((t - (T[3] - 0.2)) / 1) * (1 - D.lisse((t - (T[7] - 0.6)) / 0.6));
      opa(cir.g, carte);
      const w = D.courbe([[tour[0], 0], [tour[1], 15]], t, true), wm = ((w % 15) + 15) % 15;
      const vue = t > tour[0] && t < tour[1] + 0.3;
      for (const nom in POS) cir.surligne(nom, vue && Math.abs(w - POS[nom]) < 0.75 || nom === "compresseur" && t > T[5] + 0.2 && t < E[5] + 0.4 || nom === "refroidisseur" && t > T[6] + 0.2 && t < E[6] + 0.4);
      const [px, py] = cir.ecran(...D.circuitPoint(w));
      petite({ x: px, y: py, s: 0.85, t: t, temp: tempDe(wm), etat: etatDe(wm), humeur: wm > 3.3 && wm < 6.5 ? "chaud" : "sourire",
        op: carte * D.lisse((t - A(3, 0.12)) / 0.5) });
      // les quatre états
      opa(fin, 1);
      quatre.forEach((q, i) => {
        const a = D.lisse((t - (T[7] + 0.1 + i * 0.5)) / 0.5);
        opa(q.g, a);
        q.h({ x: q.x, y: 420 + Math.sin(t * 2 + i) * 8, s: 1.5, t: t, temp: q.temp, etat: q.etat, humeur: q.humeur, regard: [0, 0] });
      });
      return {};
    };
  };

  /* ---------- échangeur : ailettes, tube coupé, air, chaleur, liquide, bulles, vapeur ----------
     o.sens : +1 (gauche → droite) ou −1 ; p = 0 à l'entrée, 1 à la sortie ;
     o.air : [couleur au-dessus, au-dessous] (relue à chaque image) ; o.chaleur : +1 vers le tube, −1 vers les ailettes ;
     o.niveau(p) hauteur de liquide 0..1 ; o.tempLiq(p), o.tempVap(p) ; o.gouttes : condensation ;
     o.vapeurOp(p) : visibilité des molécules de vapeur (1 par défaut) ; o.colonnes : abscisses des flux d'air.
     rend { fond (groupe sous le liquide : ce qui y flotte), sc (groupe sous tout : le fluide supercritique),
            air, chaud (groupes de flèches), maj(t, chaleur), surface(x, t) } */
  const X0 = 60, X1 = 1540, YH = 400, YB = 560;
  function echangeur(g, o) {
    const pDe = x => o.sens > 0 ? (x - X0) / (X1 - X0) : (X1 - x) / (X1 - X0);
    const xDe = p => o.sens > 0 ? X0 + p * (X1 - X0) : X1 - p * (X1 - X0);
    for (let x = 280; x <= 1320; x += 26) D.el("rect", { x: x, y: 300, width: 7, height: 360, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g);
    const chevrons = [];
    for (let k = 0; k < 6; k++) for (let j = 0; j < 3; j++) chevrons.push({ x: o.colonnes ? o.colonnes[k] : 362 + k * 190, f: j / 3, maj: D.chevron(air) });
    const vagues = [];
    for (let k = 0; k < 7; k++) [-1, 1].forEach(cote => vagues.push({ x: 330 + k * 160 + (cote > 0 ? 80 : 0), cote: cote, f: D.frac(k * 0.37), maj: D.chaleur(chaud) }));
    D.el("rect", { x: X0, y: YH - 16, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YB, width: X1 - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YH, width: X1 - X0, height: YB - YH, fill: "#f4f8fc" }, g);
    const sc = D.el("g", {}, g), vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    const liq = D.liquide(g, { x0: X0, x1: X1, yh: YH, yb: YB, niveau: x => o.niveau(pDe(x)), couleur: x => D.couleur(o.tempLiq(pDe(x)), false) });
    const bul = D.bulles(D.el("g", {}, g), 54, o.graine + 1, o.gouttes);
    const r = D.alea(o.graine), V = [];
    for (let i = 0; i < 46; i++) V.push({ s: r(), ry: r(), ph: r() * TOUR, maj: D.mol(vap) });
    return {
      fond: fond, sc: sc, air: air, chaud: chaud, surface: liq.surface,
      maj: function (t, chaleurOp) {
        chevrons.forEach(ch => {
          const f = D.frac(ch.f + t * 0.16), y = 300 + f * 360;
          ch.maj(ch.x, y, 0, y < YH ? o.air[0] : o.air[1], D.fenetre(f, 0, 1, 0.12) * (y > YH - 26 && y < YB + 26 ? 0 : 0.9));
        });
        vagues.forEach(v => {
          const f = D.frac(v.f + t * 0.45), d = 40 * f;
          const y = v.cote < 0 ? (o.chaleur > 0 ? YH - 60 + d : YH - 20 - d) : (o.chaleur > 0 ? YB + 60 - d : YB + 20 + d);
          v.maj(v.x, y, (v.cote < 0) === (o.chaleur > 0) ? 0 : 180, chaleurOp * D.fenetre(f, 0, 1, 0.25));
        });
        liq.maj(t);
        bul(t, q => {
          const p = o.gouttes ? 0.2 + q * 0.62 : 0.02 + q * 0.74, x = xDe(p), surf = liq.surface(x, t), nv = o.niveau(p);
          if (o.gouttes) return [x, YH + 6, surf, nv > 0.02 && nv < 0.95 ? 0.95 : 0, D.couleur(o.tempLiq(p), false)];
          return [x, YB - 6, surf + 4, nv > 0.08 ? 1 : 0];
        });
        V.forEach(m => {
          const p = D.frac(m.s + t / 16), x = xDe(p), libre = liq.surface(x, t) - YH;
          const y = YH + 16 + m.ry * Math.max(0, libre - 32) + Math.sin(t * 3 + m.ph) * 5;
          m.maj(x, y, o.tempVap(p), true, D.borne((libre - 34) / 30, 0, 1) * (o.vapeurOp ? o.vapeurOp(p) : 1));
        });
      }
    };
  }
  /* la molécule qui flotte (à moitié dans le liquide) ou qui vole dans la vapeur */
  function flotte(ech, x, t, vapeur) {
    const surf = ech.surface(x, t);
    return vapeur ? Math.min(YH + 54 + Math.sin(t * 2.5) * 8, surf - 46) : Math.max(surf + 4 + Math.sin(t * 2) * 4, YH + 40);
  }

  /* ---------- 1 · l'évaporateur ---------- */
  S.evaporateur = function (g, c) {
    const ech = echangeur(g, { graine: 11, sens: 1, air: ["#e8914a", "#3d7fca"], chaleur: 1,
      niveau: p => 0.82 * (1 - D.lisse(p / 0.78)), tempLiq: () => 0.08,
      tempVap: p => p > 0.85 ? 0.08 + (p - 0.85) / 0.15 * 0.2 : 0.08 });
    const vent = D.ventilateur(g, 130, 255, 42);
    D.etiquette(g, 190, 268, "air tiède de la chambre");
    D.etiquette(g, 280, 712, "air refroidi");
    D.etiquette(g, 60, 328, "entrée : −10 °C", { "font-weight": 700 }); D.etiquette(g, 60, 366, "mélange froid"); // liquide + un peu de vapeur, comme à la sortie du détendeur
    D.etiquette(g, 1540, 328, "sortie :", { "font-weight": 700, "text-anchor": "end" }); D.etiquette(g, 1540, 366, "vapeur", { "text-anchor": "end" });
    const bar = D.pastille(g, 900, 232, "≈ 26 bar", D.BLEU, 36, "middle");
    const ebul = D.pastille(g, 800, 724, "ébullition : le liquide fait des bulles", "#2f6fb8", 30, "middle");
    const surch = D.pastille(g, 1540, 724, "surchauffe : pas une goutte au compresseur", D.ORANGE, 30, "end");
    const mila = D.heroine(ech.fond, { r: 30 });
    const tb = c.A(5, 0.2), tv = c.A(5, 0.7);
    return function (t) {
      vent(t * 520);
      ech.maj(t, 0.35 + 0.65 * D.lisse((t - c.T[4]) / 0.8));
      opa(bar, D.fenetre(t, c.T[3] + 0.3, c.E[3] + 0.4));
      opa(ebul, D.fenetre(t, c.T[5], c.E[5] + 0.4));
      opa(surch, D.lisse((t - c.T[6]) / 0.4));
      const p = D.courbe([[c.T[2], 0.03], [c.E[2], 0.15], [c.E[3], 0.28], [c.T[5], 0.4], [tv, 0.52], [c.E[5], 0.62], [c.E[6], 0.9], [c.D - 0.2, 1.06]], t);
      const x = X0 + p * (X1 - X0), envol = D.lisse((t - tv) / 1.4);
      const etat = t < tb ? "liquide" : t < tv + 0.6 ? "bout" : "vapeur", temp = D.courbe([[c.T[6], 0.08], [c.E[6], 0.28]], t);
      const humeur = t > tb && t < tv + 1.2 ? "surprise" : "sourire";
      mila({ x: x, y: D.lerp(flotte(ech, x, t, false), flotte(ech, x, t, true), envol), s: 0.9, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
      return { carte: D.borne(p, 0, 1) * 2, temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 2 · le compresseur (à piston, en coupe) ---------- */
  S.compresseur = function (g, c) {
    const YP0 = 424, COURSE = 196;
    D.el("rect", { x: 60, y: 308, width: 545, height: 74, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 995, y: 308, width: 545, height: 74, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 60, y: 320, width: 545, height: 50, fill: "#eef4fa" }, g);
    D.el("rect", { x: 995, y: 320, width: 545, height: 50, fill: "#fbefe6" }, g);
    D.el("rect", { x: 590, y: 290, width: 420, height: 112, rx: 10, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: 600, y: 300, width: 190, height: 100, fill: "#eef4fa" }, g);
    D.el("rect", { x: 810, y: 300, width: 190, height: 100, fill: "#fbefe6" }, g);
    D.el("rect", { x: 590, y: 320, width: 14, height: 50, fill: "#eef4fa" }, g);
    D.el("rect", { x: 996, y: 320, width: 14, height: 50, fill: "#fbefe6" }, g);
    D.el("rect", { x: 590, y: 418, width: 420, height: 272, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 610, y: 418, width: 380, height: 272, fill: "#f3f6fa" }, g);
    const refoul = D.supercritique(g, { x0: 996, y0: 320, x1: 1540, y1: 370, pas: 24, graine: 5 }); // le refoulement : supercritique
    const mols = D.el("g", {}, g);
    const bielle = D.el("rect", { x: 785, y: 0, width: 30, height: 10, fill: "url(#vm-acier-h)" }, g);
    const piston = D.el("g", {}, g);
    D.el("rect", { x: 612, y: 0, width: 376, height: 56, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [16, 30].forEach(y => D.el("line", { x1: 612, y1: y, x2: 988, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("rect", { x: 590, y: 400, width: 60, height: 18, fill: "#6b7785" }, g);
    D.el("rect", { x: 720, y: 400, width: 160, height: 18, fill: "#6b7785" }, g);
    D.el("rect", { x: 950, y: 400, width: 60, height: 18, fill: "#6b7785" }, g);
    const clapA = D.el("rect", { x: 645, y: 418, width: 82, height: 8, rx: 3, fill: "#24384f" }, g);
    const clapR = D.el("rect", { x: 875, y: 392, width: 82, height: 8, rx: 3, fill: "#24384f" }, g);
    D.el("rect", { x: 540, y: 690, width: 520, height: 70, rx: 14, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 6 }, g);
    D.el("path", { d: "M 600 700 L 584 730 L 598 730 L 588 752 L 616 722 L 602 722 L 614 700 Z", fill: "#ffd166" }, g);
    D.texte(g, 820, 736, "moteur électrique", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", "font-family": "Calibri, Arial, sans-serif" });
    const lab = D.el("g", {}, g);
    D.etiquette(g, 60, 246, "aspiration :", { "font-weight": 700 }); D.etiquette(g, 60, 282, "vapeur froide, 26 bar");
    D.etiquette(g, 1030, 432, "refoulement :", { "font-weight": 700 }); D.etiquette(g, 1030, 470, "90 bar, plus de 100 °C");
    D.etiquette(lab, 150, 476, "clapet d'aspiration"); D.trait(lab, 440, 468, 660, 428);
    D.etiquette(g, 640, 250, "clapet de refoulement"); D.trait(g, 905, 260, 915, 388);
    D.etiquette(lab, 200, 610, "piston");
    const ligneP = D.trait(lab, 300, 600, 612, 600);
    // k6 : deux coupes de tube, côte à côte
    const fins = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 40, y: 450, width: 485, height: 258, rx: 18, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, fins);
    [[170, 62, 56, "fluide classique", "grand diamètre,", "paroi mince"], [405, 40, 19, "CO₂", "petit diamètre,", "paroi épaisse"]].forEach(([cx, R, r, nom, l1, l2]) => {
      D.el("circle", { cx: cx, cy: 535, r: R, fill: "url(#vm-cuivre)", stroke: "#6e3818", "stroke-width": 2 }, fins);
      D.el("circle", { cx: cx, cy: 535, r: r, fill: cx > 300 ? "#fbefe6" : "#eef4fa", stroke: "#6e3818", "stroke-width": 2 }, fins);
      D.etiquette(fins, cx, 636, nom, { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU });
      D.etiquette(fins, cx, 666, l1, { "text-anchor": "middle", "font-size": 28 });
      D.etiquette(fins, cx, 696, l2, { "text-anchor": "middle", "font-size": 28 });
    });
    const alerte = D.el("g", {}, g);
    D.el("rect", { x: 60, y: 500, width: 470, height: 150, rx: 16, fill: "#fff", stroke: "#c0392b", "stroke-width": 5, "stroke-dasharray": "16 10" }, alerte);
    D.lignes(alerte, 90, 560, ["Jamais de liquide ici :", "il ne se comprime pas."], { "font-size": 34, "font-weight": 700, fill: "#c0392b", "font-family": "Calibri, Arial, sans-serif" }, 46);
    const ralenti = D.pastille(g, 148, 186, "au ralenti", "#637285", 28);
    const pBar = D.pastille(g, 1030, 574, "26 → 90 bar", D.ORANGE, 38);
    const r = D.alea(23), M = 24, LOTS = [0, 1, 2].map(() => {
      const l = [];
      for (let j = 0; j < M; j++) l.push({ u: 0.06 + r() * 0.88, v: 0.06 + r() * 0.88, e: r() * 0.6, w: r(), maj: D.mol(mols) });
      return l;
    });
    const MOI = { u: 0.45, v: 0.5, e: 0.12, w: 0.5 };
    const mila = D.heroine(g, { r: 30 });
    const yp = phi => YP0 + (1 - Math.cos(phi)) / 2 * COURSE;
    const tempDe = y => 0.1 + 0.85 * D.lisse((620 - y) / (620 - 452));
    function place(m, L, y) { // position, température, visibilité d'une molécule de phase locale L
      const cx = 612 + 14 + m.u * 348, cyc = 418 + 14 + m.v * Math.max(4, y - 418 - 28);
      if (L < 0) { const q = 1 + L / TOUR; return [D.lerp(80 + m.w * 500, 640, q * q), 345 + (m.v - 0.5) * 36, 0.1, 1]; }
      if (L < Math.PI) {
        const k = D.lisse((L / Math.PI - m.e) / 0.35);
        return k < 0.5 ? [D.lerp(640, 686, k * 2), D.lerp(345, 412, k * 2), 0.1, 1] : [D.lerp(686, cx, k * 2 - 1), D.lerp(412, cyc, k * 2 - 1), 0.1, 1];
      }
      if (L < 1.75 * Math.PI) return [cx, cyc, tempDe(y), 1];
      if (L < TOUR) {
        const k = D.lisse(((L - 1.75 * Math.PI) / (0.25 * Math.PI) - m.w * 0.4) / 0.6);
        return k < 0.5 ? [D.lerp(cx, 915, k * 2), D.lerp(cyc, 405, k * 2), 0.9, 1] : [D.lerp(915, 930 + m.u * 60, k * 2 - 1), D.lerp(405, 345 + (m.v - 0.5) * 36, k * 2 - 1), 0.92, 1];
      }
      const q = (L - TOUR) / TOUR, x = 930 + m.u * 60 + q * (640 + m.w * 260); // le tube de refoulement : c'est le fluide supercritique qui y est dessiné
      return [x, 345 + (m.v - 0.5) * 36, 0.92, L < 2 * TOUR ? D.borne((1000 - x) / 30, 0, 1) : 0];
    }
    const t5 = c.E[5];
    return function (t) {
      const T = c.T, E = c.E;
      // un premier tour lent (la molécule arrive devant le clapet), puis aspiration (k2), compression (k3-k4), refoulement (k5), régime normal
      const phi = t < t5 ? D.courbe([[T[1], 0], [T[2] + 0.4, TOUR], [E[2], 1.5 * TOUR], [T[3], 1.5 * TOUR], [T[5], 1.875 * TOUR], [t5, 2 * TOUR]], t, true)
        : 2 * TOUR + (t - t5) * TOUR / 1.3;
      const y = yp(phi), n = Math.floor(phi / TOUR), f = phi - n * TOUR;
      piston.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
      bielle.setAttribute("y", (y + 50).toFixed(1)); bielle.setAttribute("height", (700 - y - 50).toFixed(1));
      ligneP.setAttribute("y2", (y + 28).toFixed(1));
      clapA.setAttribute("transform", "rotate(" + (f > 0.03 * TOUR && f < 0.48 * TOUR ? 28 : 0) + " 645 418)");
      clapR.setAttribute("transform", "rotate(" + (f > 0.875 * TOUR && f < 0.995 * TOUR ? 28 : 0) + " 957 400)");
      for (let m = n - 1; m <= n + 1; m++) {
        const lot = LOTS[((m % 3) + 3) % 3], L = phi - m * TOUR;
        lot.forEach(mo => { const [x, yy, temp, op] = place(mo, L, y); mo.maj(x, yy, temp, true, op); });
      }
      refoul(t, 0.92, 70, D.lisse((t - (T[5] - 0.1)) / 1.2));
      let mx, my, temp;
      if (t < t5) [mx, my, temp] = place(MOI, phi - TOUR, y);
      else { mx = D.lerp(930, 1640, D.borne((t - t5) / (c.D - t5 - 0.3), 0, 1)); my = 345; temp = 0.92; }
      const L = phi - TOUR, serre = L > Math.PI && L < 1.8 * Math.PI ? D.lisse((620 - y) / 168) : 0;
      const etat = t < T[5] ? "vapeur" : "supercritique";
      const humeur = t < T[3] ? "sourire" : t < T[5] ? "surprise" : "chaud";
      mila({ x: mx, y: my, s: L > 0 && L < TOUR ? 0.68 : 0.62, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: serre * 0.8, regard: [1, 0] });
      opa(ralenti, t < t5 ? 1 : 0);
      opa(pBar, D.fenetre(t, T[4], E[4] + 0.6));
      opa(lab, 1 - D.lisse((t - (T[6] - 0.4)) / 0.3));
      opa(fins, D.fenetre(t, T[6] - 0.1, T[7] - 0.05, 0.4));
      opa(alerte, D.lisse((t - T[7]) / 0.4));
      const w = D.courbe([[T[2], 2], [T[3], 3.1], [T[5], 3.6], [t5, 4], [c.D - 0.3, 5]], t, true);
      return { carte: w, temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- le tube de verre : thermomètre et manomètre (instruments de la scène « critique ») ---------- */
  function thermometre(parent, x, yHaut, yBas, tMax, repere) {
    const yBoule = yBas + 26, tick = y => D.el("line", { x1: x + 17, y1: y, x2: x + 31, y2: y, stroke: D.BLEU, "stroke-width": 3 }, parent);
    const hg = t => yBas - t / tMax * (yBas - yHaut);
    D.el("rect", { x: x - 14, y: yHaut - 12, width: 28, height: yBas - yHaut + 40, rx: 14, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, parent);
    D.el("circle", { cx: x, cy: yBoule, r: 31, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, parent);
    D.el("rect", { x: x - 10, y: yBoule - 38, width: 20, height: 18, fill: "#fff" }, parent);
    [0, 10, 20, 40].forEach(v => tick(hg(v)));
    const mercure = D.el("rect", { x: x - 5, width: 10, fill: "#d64530" }, parent);
    D.el("circle", { cx: x, cy: yBoule, r: 22, fill: "#d64530" }, parent);
    D.el("line", { x1: x - 24, y1: hg(repere), x2: x + 24, y2: hg(repere), stroke: "#c0392b", "stroke-width": 4 }, parent);
    D.etiquette(parent, x + 36, hg(repere) + 10, String(repere), { "font-size": 28, "font-weight": 700, fill: "#c0392b" });
    return function (v) { mercure.setAttribute("y", hg(v).toFixed(1)); mercure.setAttribute("height", (yBoule - hg(v)).toFixed(1)); };
  }
  function cadran(parent, cx, cy, R, pMax, repere) {
    const th = p => -135 + 270 * p / pMax, pt = (a, r) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    const arc = (a1, a2, r, coul) => {
      const [x1, y1] = pt(a1, r), [x2, y2] = pt(a2, r);
      D.el("path", { d: "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " A " + r + " " + r + " 0 " + (a2 - a1 > 180 ? 1 : 0) + " 1 " + x2.toFixed(1) + " " + y2.toFixed(1), fill: "none", stroke: coul, "stroke-width": 11 }, parent);
    };
    D.el("circle", { cx: cx, cy: cy, r: R + 6, fill: "#fff", stroke: "#56636f", "stroke-width": 12 }, parent);
    arc(th(0), th(repere), R - 30, "#4aa36b"); arc(th(repere), th(pMax), R - 30, "#d4562a");
    for (let p = 0; p <= pMax; p += 10) {
      const [x1, y1] = pt(th(p), R), [x2, y2] = pt(th(p), R - (p % 20 ? 10 : 18));
      D.el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: D.BLEU, "stroke-width": p % 20 ? 3 : 5 }, parent);
    }
    for (let p = 0; p <= pMax; p += 20) { const [x, y] = pt(th(p), R + 40); D.etiquette(parent, x, y + 10, String(p), { "text-anchor": "middle", "font-size": 28, "font-weight": 700 }); }
    const [rx, ry] = pt(th(repere), R + 40);
    D.el("line", { x1: pt(th(repere), R + 8)[0], y1: pt(th(repere), R + 8)[1], x2: pt(th(repere), R - 22)[0], y2: pt(th(repere), R - 22)[1], stroke: "#c0392b", "stroke-width": 5 }, parent);
    const aiguille = D.el("g", {}, parent);
    D.el("path", { d: "M " + (cx - 6) + " " + cy + " L " + cx + " " + (cy - (R - 40)) + " L " + (cx + 6) + " " + cy + " Z", fill: "#10233c" }, aiguille);
    D.el("circle", { cx: cx, cy: cy, r: 10, fill: "#10233c" }, parent);
    return function (p) { aiguille.setAttribute("transform", "rotate(" + th(D.borne(p, 0, pMax)).toFixed(1) + " " + cx + " " + cy + ")"); };
  }
  function afficheur(parent, cx, y, l) { // la fenêtre du chiffre : un cadre et un texte à changer
    D.el("rect", { x: cx - l / 2, y: y, width: l, height: 60, rx: 14, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, parent);
    const t = D.texte(parent, cx, y + 44, "", { "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    return function (s, rouge) { t.textContent = s; t.setAttribute("fill", rouge ? "#c0392b" : D.BLEU); };
  }

  /* ---------- 3 · le point critique (un tube de verre, du CO₂ dedans, qu'on chauffe) ---------- */
  S.critique = function (g, c) {
    const XE0 = 650, XE1 = 850, XI0 = 668, XI1 = 832, YI0 = 222, YI1 = 613, L = XI1 - XI0, H = YI1 - YI0, XM = (XI0 + XI1) / 2;
    // les instruments : thermomètre à gauche, manomètre à droite, chiffres dans leur fenêtre
    D.etiquette(g, 250, 190, "température", { "text-anchor": "middle", "font-size": 28, fill: "#637285" });
    D.etiquette(g, 1380, 336, "pression", { "text-anchor": "middle", "font-size": 28, fill: "#637285" });
    const thermo = thermometre(g, 250, 215, 560, 40, 31), cad = cadran(g, 1380, 506, 112, 100, 73.8);
    const lireT = afficheur(g, 250, 640, 190), lireP = afficheur(g, 1380, 652, 230);
    // le tube : verre épais, bouchons de métal
    D.el("rect", { x: XE0, y: 205, width: XE1 - XE0, height: 425, rx: 16, fill: "#cfe3f3", stroke: "#7fa3c4", "stroke-width": 4 }, g);
    D.el("rect", { x: XI0, y: YI0, width: L, height: H, fill: "#f7fafd" }, g);
    const cid = ident("tube"), fid = ident("flou");
    D.el("rect", { x: XI0, y: YI0, width: L, height: H }, D.el("clipPath", { id: cid }, g));
    const gauss = D.el("feGaussianBlur", { stdDeviation: 0 }, D.el("filter", { id: fid, filterUnits: "userSpaceOnUse", x: 600, y: 150, width: 300, height: 520 }, g));
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    const teinte = D.el("rect", { x: XI0, y: YI0, width: L, height: 10 }, dedans);
    const sc = D.supercritique(dedans, { x0: XI0, y0: YI0, x1: XI1, y1: YI1, pas: 22, graine: 9 });
    const fond = D.el("g", {}, dedans);
    const mila = D.heroine(fond, { r: 30 });
    const flou = D.el("g", {}, dedans);
    let nv = 0.5;
    const liq = D.liquide(flou, { x0: 640, x1: 860, yh: 205, yb: 640, niveau: () => nv, couleur: () => D.couleur(0.4, false), pas: 14 });
    const degrade = flou.firstChild, nappe = flou.children[1], reflet = flou.lastChild;
    const gb = D.el("linearGradient", { id: ident("brume"), x1: 0, x2: 0, y1: 0, y2: 1 }, g);
    [[0, 0], [0.5, 0.75], [1, 0]].forEach(([o, a]) => D.el("stop", { offset: o, "stop-color": "#fff", "stop-opacity": a }, gb));
    const brume = D.el("rect", { x: XI0, width: L, fill: "url(#" + gb.getAttribute("id") + ")" }, dedans);
    const reflets = D.el("g", {}, dedans), brillance = D.courant(reflets, XI0, XI1, 450, 600, 7, 29); // reflets qui filent dans le liquide
    const bul = D.bulles(D.el("g", {}, dedans), 12, 41, false);
    const vap = D.el("g", {}, dedans), r = D.alea(17), V = [], N = 46;
    for (let i = 0; i < N; i++) V.push({ s: i / N, u: D.frac(0.5 + i * 0.7548776662), v: D.frac(0.5 + i * 0.5698402909), ph: r() * TOUR, maj: D.mol(vap) }); // répartition régulière (suite R2) : pas d'amas
    D.el("rect", { x: XI0 + 4, y: YI0, width: 9, height: H, rx: 4, fill: "#fff", opacity: 0.55 }, g); // reflets du verre
    D.el("rect", { x: XI1 - 12, y: YI0, width: 5, height: H, rx: 3, fill: "#fff", opacity: 0.35 }, g);
    [[172, 222], [613, 663]].forEach(([y0, y1]) => {
      D.el("rect", { x: 640, y: y0, width: 220, height: y1 - y0, rx: 10, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, g);
      D.el("rect", { x: 660, y: y0 + 10, width: 180, height: 6, rx: 3, fill: "#fff", opacity: 0.45 }, g);
    });
    // la chaleur sous le tube
    const chaud = D.el("g", {}, g), vagues = [0, 1, 2, 3, 4].map(k => ({ x: 686 + k * 32, f: k / 5, maj: D.chaleur(chaud) }));
    const lChaleur = etiquette(g, 856, 700, "chaleur");
    // les étiquettes, une par geste
    const lVerre = etiquette(g, 885, 262, "verre épais", null, [880, 255, 846, 262]);
    const lLiq = etiquette(g, 612, 545, "liquide", { "text-anchor": "end" }, [622, 536, 706, 536]);
    const lVap = etiquette(g, 612, 340, "vapeur", { "text-anchor": "end" }, [622, 331, 706, 331]);
    const lSurf = etiquette(g, 612, 432, "plus de surface", { "text-anchor": "end" }, [622, 422, 706, 422]);
    const lSC = etiquette(g, 885, 440, ["fluide", "supercritique"], null, [878, 452, 806, 452]);
    const lDense = etiquette(g, 612, 318, ["dense comme", "un liquide"], { "text-anchor": "end" }, [622, 336, 706, 336]);
    const lRempl = etiquette(g, 885, 562, ["remplit tout", "comme un gaz"], null, [878, 574, 806, 574]);
    const acc = D.pastille(g, 800, 736, "en accéléré", "#637285", 30, "middle");
    const [pAutres, pCO2] = [D.pastille(g, 785, 738, "bien des fluides : vers 70 °C ou plus", "#637285", 32, "end"), D.pastille(g, 815, 738, "CO₂ : 31 °C", "#c0392b", 32, "start")];
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      // 20 °C / 57 bar au repos ; on chauffe (k2) jusqu'à 30 °C / 72 bar ; 31 °C / 73,8 bar au point critique (k3) ; 33 °C / 80 bar au-dessus (k4-k5)
      const temp = D.courbe([[T[2] + 0.3, 20], [E[2], 30], [A(3, 0.25), 31], [A(3, 0.9), 31], [E[4], 33]], t, true);
      const pres = D.courbe([[T[2] + 0.3, 57], [E[2], 72], [A(3, 0.25), 73.8], [A(3, 0.9), 73.8], [E[4], 80]], t, true);
      const tn = D.lerp(0.4, 0.5, D.borne((temp - 20) / 13, 0, 1)), chaleur = D.lisse((temp - 20) / 11);
      const sup = D.lisse((t - A(3, 0.62)) / (A(4, 0.3) - A(3, 0.62))); // le fluide supercritique prend tout le tube
      const ys = YI1 - D.lerp(0.45, 0.52, chaleur) * H;
      nv = (640 - ys) / 435;
      // l'indicateur : chiffres, thermomètre, aiguille
      thermo(temp); cad(pres);
      lireT((temp < 31 ? Math.floor(temp + 0.001) : Math.round(temp)) + " °C", temp >= 31);
      lireP((pres < 73.79 ? Math.floor(pres + 0.001) : pres < 73.81 ? "73,8" : Math.round(pres)) + " bar", pres >= 73.79);
      // le liquide : sa couleur suit la température ; sa surface s'estompe (reflet, puis flou qui s'élargit) puis disparaît
      Array.from(degrade.children).forEach(s => s.setAttribute("stop-color", D.couleur(tn, false)));
      liq.maj(t);
      const flouT = D.lisse((t - A(3, 0.4)) / (A(3, 0.85) - A(3, 0.4)));
      gauss.setAttribute("stdDeviation", (1 + 15 * flouT).toFixed(1));
      flou.setAttribute("filter", flouT > 0.01 ? "url(#" + fid + ")" : "none");
      opa(reflet, 0.75 * (1 - D.lisse((t - A(3, 0.2)) / (A(3, 0.5) - A(3, 0.2)))));
      opa(nappe, 0.82 * (1 - sup)); opa(reflets, 1 - sup); brillance(t, 9);
      const hb = 30 + 190 * D.lisse((t - A(3, 0.45)) / (A(3, 0.85) - A(3, 0.45)));
      brume.setAttribute("y", (ys - hb / 2).toFixed(1)); brume.setAttribute("height", hb.toFixed(1));
      opa(brume, 0.7 * D.lisse((t - A(3, 0.45)) / 0.8) * (1 - D.lisse((t - A(4, 0.1)) / 2)));
      // la vapeur : de plus en plus de molécules, fond qui se teinte
      const dens = D.lerp(0.3, 1, chaleur), libre = ys - YI0 - 44;
      V.forEach(m => m.maj(XI0 + 16 + m.u * (L - 32) + Math.sin(t * 1.7 + m.ph) * 6, YI0 + 20 + m.v * Math.max(0, libre) + Math.cos(t * 1.3 + m.ph) * 6, tn, true,
        D.borne((dens - m.s) * 8, 0, 1) * (1 - sup)));
      teinte.setAttribute("height", Math.max(0, ys - YI0).toFixed(1));
      teinte.setAttribute("fill", D.couleur(tn, true)); opa(teinte, (0.04 + 0.3 * dens * dens) * (1 - sup));
      // quelques bulles qui montent pendant qu'on chauffe, plus du tout au point critique
      const bAct = D.lisse((t - A(2, 0.45)) / (E[2] - A(2, 0.45))) * (1 - D.lisse((t - A(3, 0.55)) / (A(3, 0.85) - A(3, 0.55))));
      bul(t, q => { const x = XI0 + 24 + q * (L - 48); return [x, YI1 - 14, liq.surface(x, t) + 6, bAct, null]; });
      sc(t, tn, 0, sup);
      // l'héroïne flotte à la surface ; quand la surface disparaît, elle se retrouve dans le fluide
      const quitte = D.lisse((t - A(3, 0.8)) / 2.2);
      const hx = XM + Math.sin(t * 0.8) * 20, hy = D.lerp(ys + 4 + Math.sin(t * 2) * 4, 515 + Math.sin(t * 1.1) * 12, quitte); // elle s'enfonce un peu : plus rien ne la porte
      const etat = t < A(4, 0.12) ? "liquide" : "supercritique";
      const humeur = t > A(3, 0.5) && t < T[5] ? "surprise" : t > A(2, 0.3) && t < A(3, 0.5) ? "chaud" : "sourire";
      mila({ x: hx, y: hy, s: 1.1, t: t, temp: tn, etat: etat, humeur: humeur, regard: [0, 0] });
      // la chaleur sous le tube : de k2 à la fin du chauffage
      const ch = D.fenetre(t, A(2, 0.05), T[5] + 0.3, 0.6);
      vagues.forEach(v => { const f = D.frac(v.f + t * 0.5); v.maj(v.x, 700 - f * 16, 180, ch * D.fenetre(f, 0, 1, 0.3)); });
      opa(lChaleur, ch);
      // étiquettes et pastilles
      opa(lVerre, D.lisse((t - A(1, 0.12)) / 0.4));
      opa(lLiq, D.lisse((t - A(1, 0.45)) / 0.4) * (1 - D.lisse((t - A(3, 0.45)) / 0.4)));
      opa(lVap, D.lisse((t - A(1, 0.75)) / 0.4) * (1 - D.lisse((t - A(3, 0.45)) / 0.4)));
      opa(lSurf, D.fenetre(t, A(3, 0.78), A(4, 0.28), 0.4));
      opa(lSC, D.lisse((t - A(4, 0.3)) / 0.5));
      opa(lDense, D.fenetre(t, T[5] + 0.2, E[5] + 0.2, 0.4)); opa(lRempl, D.fenetre(t, A(5, 0.5), E[5] + 0.2, 0.4));
      opa(acc, D.fenetre(t, T[0] + 0.8, E[0] + 0.3));
      opa(pAutres, D.fenetre(t, T[6] + 0.3, E[6] + 0.8)); opa(pCO2, D.fenetre(t, A(6, 0.55), E[6] + 0.8));
      return { temp: tn, etat: etat, humeur: humeur };
    };
  };

  /* ---------- fluide supercritique qui se serre le long du tube (grains plus rapprochés, plus froids vers la sortie) ----------
     o : { x0, x1, y0, y1, sens (+1 : p = 0 à gauche), pasDe(p), tempDe(p), rangs, graine } → { maj(t, vitesse, facteur(p)) } ;
     les grains avancent et ralentissent en se serrant (le débit se conserve) ; facteur(p) : visibilité 0..1 selon p. */
  function fluideSerre(parent, o) {
    const g2 = D.el("g", {}, parent), Lg = o.x1 - o.x0, rangs = o.rangs || 6, hr = (o.y1 - o.y0) / rangs;
    const gid = ident("sc"), grad = D.el("linearGradient", { id: gid, x1: o.x0, x2: o.x1, y1: 0, y2: 0, gradientUnits: "userSpaceOnUse" }, g2), stops = [];
    for (let k = 0; k <= 12; k++) { const p = o.sens > 0 ? k / 12 : 1 - k / 12; stops.push([p, D.el("stop", { offset: k / 12, "stop-color": D.couleur(o.tempDe(p), false) }, grad)]); }
    D.el("rect", { x: o.x0, y: o.y0, width: Lg, height: o.y1 - o.y0, fill: "url(#" + gid + ")" }, g2);
    const fond = g2.lastChild;
    // table : u (rang du grain) → p (abscisse réduite), pas variable
    const P = [0]; let p = 0;
    while (p < 1) { p += o.pasDe(p) / Lg; P.push(Math.min(p, 1.2)); }
    const U = P.length - 1, G = [], al = D.alea(o.graine || 3);
    for (let j = 0; j < rangs; j++) for (let k = 0; k < U; k++) G.push({ u: k + (j % 2 ? 0.5 : 0), y: o.y0 + (j + 0.5) * hr, ph: al() * 6.28, maj: D.mol(g2) });
    const pDe = u => { const i = Math.min(U - 1, Math.floor(u)), f = u - i; return D.lerp(P[i], P[i + 1], f); };
    return function (t, vitesse, facteur, op) {
      op = op === undefined ? 1 : op;
      stops.forEach(([pp, s]) => s.setAttribute("stop-opacity", (0.42 * op * facteur(pp)).toFixed(2)));
      G.forEach(m => {
        const u = (((m.u + t * vitesse) % U) + U) % U, pp = D.borne(pDe(u), 0, 1), x = o.sens > 0 ? o.x0 + pp * Lg : o.x1 - pp * Lg;
        const bord = D.borne((Math.min(pp * Lg, (1 - pp) * Lg) - 8) / 18, 0, 1);
        m.maj(x + Math.sin(t * 3.3 + m.ph) * 2.6, m.y + Math.cos(t * 2.9 + m.ph) * 2.6, o.tempDe(pp), true, op * bord * facteur(pp));
      });
    };
  }

  /* ---------- 4 · le refroidisseur de gaz (le fluide va de droite à gauche, comme sur la croix) ---------- */
  S.refroidisseur = function (g, c) {
    let hiver = 0; // 0 en été, 1 en hiver : calculé à chaque image
    const air = ["#3d7fca", "#e8914a"];
    const tSC = p => D.courbe([[0, 0.95], [0.35, 0.72], [0.7, 0.56], [1, 0.5]], p, true);
    const ech = echangeur(g, { graine: 53, sens: -1, air: air, chaleur: -1, gouttes: true, colonnes: [340, 520, 700, 880, 1060, 1230],
      niveau: p => hiver * 0.85 * D.lisse((p - 0.55) / 0.4),
      tempLiq: p => D.lerp(0.5, 0.4, D.lisse((p - 0.6) / 0.4)),
      tempVap: p => D.lerp(0.9, 0.55, D.lisse(p / 0.6)),
      vapeurOp: p => hiver * D.lisse((p - 0.45) / 0.25) });
    const fluide = fluideSerre(ech.sc, { x0: X0, x1: X1, y0: YH, y1: YB, sens: -1, rangs: 6, graine: 71,
      pasDe: p => D.lerp(36, 19, D.lisse(p)), tempDe: tSC });
    const perte = p => 1 - hiver * D.lisse((p - 0.45) / 0.25); // l'hiver, le fluide supercritique cède la place à la vapeur et à la nappe
    const vent = D.ventilateur(g, 130, 255, 42);
    const lAirE = etiquette(g, 190, 268, "air extérieur : 30 °C"), lAirF = etiquette(g, 190, 268, "air froid");
    const lAirR = etiquette(g, 280, 712, "air réchauffé");
    const lEntree = etiquette(g, 1540, 328, ["entrée : 90 bar", "plus de 100 °C"], { "text-anchor": "end" }); lEntree.firstChild.setAttribute("font-weight", 700);
    const lSortie = etiquette(g, 60, 328, ["sortie :", "vers 35 °C"]); lSortie.firstChild.setAttribute("font-weight", 700);
    const pNon = D.pastille(g, 1320, 724, "ni gouttes, ni nappe", D.ORANGE, 30, "end");
    const pHiver = D.pastille(g, 1320, 724, "l'hiver", "#2f6fb8", 36, "end");
    // k6 : la sonde de température, posée sur le tube de sortie (collier + afficheur)
    const sonde = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 138, y: 380, width: 24, height: 200, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 3 }, sonde);
    D.el("rect", { x: 143, y: 580, width: 14, height: 24, fill: "#4e5a66" }, sonde);
    D.el("rect", { x: 60, y: 604, width: 180, height: 62, rx: 12, fill: "#10233c", stroke: "#4e5a66", "stroke-width": 3 }, sonde);
    D.el("rect", { x: 84, y: 614, width: 12, height: 32, rx: 6, fill: "#fff" }, sonde); D.el("circle", { cx: 90, cy: 650, r: 10, fill: "#d64530", stroke: "#fff", "stroke-width": 3 }, sonde); D.el("rect", { x: 87, y: 628, width: 6, height: 20, fill: "#d64530" }, sonde); // petit thermomètre
    D.texte(sonde, 170, 650, "35 °C", { "text-anchor": "middle", "font-size": 44, "font-weight": 700, fill: "#ffd166", "font-family": TITRE });
    D.trait(sonde, 150, 672, 150, 706);
    D.etiquette(sonde, 60, 738, "on surveille cette température");
    const mila = D.heroine(ech.fond, { r: 30 });
    return function (t) {
      const T = c.T, E = c.E, A = c.A;
      hiver = D.lisse((t - A(7, 0.2)) / (A(7, 0.62) - A(7, 0.2)));
      air[0] = hiver > 0.5 ? "#1f5fa9" : "#3d7fca"; air[1] = hiver > 0.5 ? "#9dbfe3" : "#e8914a";
      vent(t * 520);
      opa(ech.air, D.lisse((t - T[3]) / 0.8));
      ech.maj(t, D.lisse((t - T[3]) / 0.8));
      fluide(t, 1.5, perte);
      // étiquettes et pastilles
      opa(lEntree, D.lisse((t - T[2]) / 0.5));
      opa(lAirE, D.lisse((t - T[3]) / 0.5) * (1 - D.lisse((t - T[7] - 0.2) / 0.3))); opa(lAirF, D.lisse((t - T[7] - 0.9) / 0.5)); // l'un s'efface avant que l'autre paraisse
      opa(lAirR, D.fenetre(t, T[3] + 0.6, T[6] - 0.2));
      opa(pNon, D.fenetre(t, T[4] + 0.3, E[4] + 0.4));
      opa(lSortie, D.fenetre(t, T[5], T[7] - 0.1));
      opa(sonde, D.fenetre(t, T[6], T[7] - 0.1, 0.5));
      opa(pHiver, D.fenetre(t, T[7] + 0.2, c.D + 1, 0.5));
      // la molécule : elle traverse tout le tube, supercritique de bout en bout (l'hiver, elle finit liquide dans la nappe)
      const p = D.courbe([[T[2], 0.03], [E[2], 0.12], [E[3], 0.3], [E[4], 0.52], [E[5], 0.62], [E[6], 0.7], [A(7, 0.35), 0.72], [A(7, 0.75), 0.87], [c.D - 0.2, 1.07]], t);
      const x = X1 - p * (X1 - X0), ll = hiver * D.lisse((p - 0.78) / 0.12), etat = ll > 0.5 ? "liquide" : "supercritique";
      const temp = D.lerp(tSC(D.borne(p, 0, 1)), 0.4, ll);
      const humeur = p < 0.4 ? "chaud" : t > A(7, 0.3) && t < A(7, 0.85) ? "surprise" : "sourire";
      mila({ x: x, y: D.lerp(480 + Math.sin(t * 2.2) * 8, flotte(ech, x, t, false), ll), s: 0.9, t: t, temp: temp, etat: etat, humeur: humeur, regard: [-1, 0] });
      return { carte: D.lerp(5.6, 7.6, D.borne(p, 0, 1)), temp: temp, etat: etat, humeur: humeur };
    };
  };
})();
