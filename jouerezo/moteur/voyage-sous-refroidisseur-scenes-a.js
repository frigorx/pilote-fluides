/* =====================================================================
   voyage-sous-refroidisseur-scenes-a.js — édition « sous-refroidisseur de
   liquide », lot A : le voyage, le condenseur, plus de froid, la vapeur
   de détente, pas de bulles
   ---------------------------------------------------------------------
   RÔLE : les cinq premières scènes du récit donnees/voyage-sous-
   refroidisseur.js (intro, condenseur, plusDeFroid, vapeurDetente, bulles).
   Même contrat que moteur/voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) →
   maj(t), maj rendant { temp, etat, humeur, carte?, diag?, diag0?, calques? }.
   Fonction PURE de t : pas d'animation CSS, pas de SMIL, hasard par D.alea.
   Les gestes sont accrochés au RANG des phrases : ajouter une phrase au
   récit décale tout. Brief : voyage-sous-refroidisseur/BRIEF-SCENES.md.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête
   x < 760 et y < 140 ; carte « où je suis » et diagramme à droite). Les
   pastilles du bas sont posées à y = 740.
   Scènes avec organe (`pres: 2` : condenseur) : le théâtre montre la carte
   d'identité pendant les phrases 0 et 1, la coupe s'anime à partir de la 2.
   AIDES LOCALES (recopiées ou adaptées des éditions vis et CO₂, non
   partagées) : pas / montrer (pastilles), etiq, fleche, grosse, suivre,
   tuyauPoly / reflets (tuyau plein), tubeLiquide (tube coupé, nappe + bulles),
   thermo, rotors (vis vues de côté, version simplifiée).
   LA CARTE DU CIRCUIT de l'intro est posée en (66, 158, 860) et non (40, 170,
   900) : à 900 le cadre de l'évaporateur descend à y ≈ 740 et touche les
   pastilles du bas.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const SANS = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const NUIT = "#10233c", GRIS = "#637285", ROUGE = "#c0392b", BLEU = "#2f6fb8", CLAIR = "#f4f8fc", CUIVRE = "#9a5a2e";
  const TOUR = 2 * Math.PI;
  let nid = 0;
  const ident = p => "vsa-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => op(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const doux = (t, t0, du) => D.lisse((t - t0) / (du || 0.5)); // 0 → 1 à partir de t0
  const f1 = v => v.toFixed(1);
  const pts = l => l.map(q => f1(q[0]) + "," + f1(q[1])).join(" ");
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); }; // l'héroïne change de plan (sous / sur le liquide)
  /* pastilles du bas : [texte, couleur, début (s), fin (s)] ; fenêtre de 0,35 s */
  const pas = (parent, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(parent, 492, 740, s, coul, 30, "middle"), a: a, b: b }));
  const montrer = (liste, t) => liste.forEach(p => fen(p.g, t, p.a, p.b, 0.35));

  /* étiquette (une ou plusieurs lignes) et son trait pointillé : rend le groupe (opacité à régler) */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * (o.pas || 34), l, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || NUIT }));
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
  /* grande flèche pleine horizontale, pointe à droite en (x + l, y) */
  function grosse(parent, x, y, l, h, coul) {
    return D.el("polygon", { points: pts([[x, y - h * 0.18], [x + l - h * 0.62, y - h * 0.18], [x + l - h * 0.62, y - h * 0.5], [x + l, y], [x + l - h * 0.62, y + h * 0.5], [x + l - h * 0.62, y + h * 0.18], [x, y + h * 0.18]]),
      fill: coul, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, parent);
  }
  /* point à la fraction u (0..1) d'une ligne brisée */
  function suivre(l, u) {
    const L = [0];
    for (let i = 1; i < l.length; i++) L.push(L[i - 1] + Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]));
    const d = D.borne(u, 0, 1) * L[L.length - 1];
    let i = 1;
    while (i < l.length - 1 && d > L[i]) i++;
    const f = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
    return [D.lerp(l[i - 1][0], l[i][0], f), D.lerp(l[i - 1][1], l[i][1], f), Math.atan2(l[i][1] - l[i - 1][1], l[i][0] - l[i - 1][0])];
  }
  /* tuyau suivant une ligne brisée : paroi de cuivre, intérieur de la couleur du fluide */
  function tuyauPoly(p, l, ep, coul) {
    D.el("polyline", { points: pts(l), fill: "none", stroke: CUIVRE, "stroke-width": ep + 14, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p);
    return D.el("polyline", { points: pts(l), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "butt" }, p);
  }
  /* reflets qui filent dans un tuyau plein → f(t, vitesse en tours de tuyau par seconde, visibilité) */
  function reflets(p, l, nb, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ s: r(), l: 0.04 + r() * 0.03, dy: (r() - 0.5) * 8, e: D.el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, p) });
    return function (t, vit, vis) {
      L.forEach(c => {
        const u = D.frac(c.s + t * vit), a = suivre(l, u), b = suivre(l, Math.min(1, u + c.l));
        c.e.setAttribute("x1", f1(a[0])); c.e.setAttribute("y1", f1(a[1] + c.dy)); c.e.setAttribute("x2", f1(b[0])); c.e.setAttribute("y2", f1(b[1] + c.dy));
        c.e.setAttribute("opacity", (0.6 * vis * D.fenetre(u, 0, 1, 0.06)).toFixed(2));
      });
    };
  }
  /* thermomètre sans chiffre : verre, boule, colonne ; rend maj(niveau 0..1, couleur) — x : axe, yh/yb : haut et bas du tube */
  function thermo(parent, x, yh, yb, rBoule) {
    const g = D.el("g", {}, parent), cid = ident("th");
    rect(D.el("clipPath", { id: cid }, g), x - 14, yh, 28, yb - yh + 4);
    D.el("circle", { cx: x, cy: yb + rBoule - 6, r: rBoule + 7, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    rect(g, x - 17, yh - 4, 34, yb - yh + 12, { rx: 17, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 });
    const boule = D.el("circle", { cx: x, cy: yb + rBoule - 6, r: rBoule }, g);
    const col = rect(D.el("g", { "clip-path": "url(#" + cid + ")" }, g), x - 9, yh, 18, yb - yh + 12);
    for (let k = 1; k < 8; k++) D.el("line", { x1: x + 17, y1: yh + k * (yb - yh) / 8, x2: x + 31, y2: yh + k * (yb - yh) / 8, stroke: GRIS, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const maj = function (niveau, coul) {
      const h = (yb - yh) * D.borne(niveau, 0, 1);
      col.setAttribute("y", f1(yb + 6 - h)); col.setAttribute("height", f1(h + 6)); col.setAttribute("fill", coul); boule.setAttribute("fill", coul);
    };
    maj.g = g; maj.y = niveau => yb - (yb - yh) * niveau; // y du sommet de la colonne
    return maj;
  }
  /* les rotors à vis, vus de côté (coupe le long des axes) : mâle en haut, femelle en bas, des lobes obliques qui défilent vers la droite.
     Même dessin que l'édition vis, en plus simple. → maj(phase en pas) */
  function rotors(parent, x0, x1, yM, yF, yB, pas) {
    const defs = D.el("defs", {}, parent), idM = ident("rm"), idF = ident("rf"), hw = pas * 0.17, dl = pas * 0.3, n = Math.ceil((x1 - x0) / pas) + 3;
    rect(D.el("clipPath", { id: idM }, defs), x0, yM, x1 - x0, yF - yM);
    rect(D.el("clipPath", { id: idF }, defs), x0, yF, x1 - x0, yB - yF);
    const gM = D.el("g", { "clip-path": "url(#" + idM + ")" }, parent), gF = D.el("g", { "clip-path": "url(#" + idF + ")" }, parent);
    rect(gM, x0, yM, x1 - x0, yF - yM, { fill: "#4b5865" }); rect(gF, x0, yF, x1 - x0, yB - yF, { fill: "#56636f" });
    const LM = [], LF = [];
    for (let m = 0; m < n; m++) {
      LM.push(D.el("polygon", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 2 }, gM));
      LF.push(D.el("polygon", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 2 }, gF));
    }
    rect(parent, x0, yM, x1 - x0, yB - yM, { fill: "none", stroke: "#2d3743", "stroke-width": 4 });
    return function (phase) {
      const ph = phase - Math.floor(phase);
      for (let m = 0; m < n; m++) {
        const xc = x0 + pas * (ph + m - 1);
        LM[m].setAttribute("points", pts([[xc - hw - dl, yM], [xc + hw - dl, yM], [xc + hw + dl, yF], [xc - hw + dl, yF]]));
        LF[m].setAttribute("points", pts([[xc - hw + dl, yF], [xc + hw + dl, yF], [xc + hw - dl, yB], [xc - hw - dl, yB]]));
      }
    };
  }

  /* =====================================================================
     0 · L'INTRO — titre, héroïne, entrepôt, vis et orifice économiseur,
     la carte du circuit, le diagramme, les deux tours
     ===================================================================== */
  /* repères de la carte : position de l'héroïne (0 → 17 sur le circuit principal, 100 → 104 sur le piquage) */
  const W0 = 8;                                        // sortie du condenseur : début du cycle du diagramme
  const MAP_D = [[0, 0], [6, 1], [9, 2], [9.9, 3], [10, 4], [12.2, 5], [12.5, 6], [12.6, 7], [13.1, 8], [16, 9], [16.8, 10], [17, 11]]; // avance sur la carte (depuis W0) → position du diagramme
  const tempCircuit = w => D.courbe([[0, 0.08], [1.1, 0.08], [3, 0.2], [3.6, 0.4], [4.2, 0.62], [7, 0.62], [7.6, 0.5], [8.3, 0.45], [12, 0.45], [13.6, 0.3], [15, 0.3], [15.4, 0.12], [16, 0.08], [17, 0.08]], w, true);
  const etatCircuit = w => w < 1 || w >= 15 ? "bout" : w < 7.3 ? "vapeur" : w < 8 ? "bout" : "liquide";
  const humeurCircuit = w => w > 3.2 && w < 7.2 ? "chaud" : w >= 15.3 || w < 1 ? "froid" : "sourire";
  /* état de la molécule SUR LE DIAGRAMME (position 0 → 18 du cycle double) : c'est lui que le théâtre dessine */
  const tempDiag = d => D.courbe([[0, 0.45], [1, 0.3], [2, 0.08], [3, 0.08], [4, 0.12], [5, 0.2], [6, 0.3], [7, 0.4], [8, 0.62], [9, 0.5], [10, 0.5], [11, 0.45], [12, 0.25], [13, 0.28], [14, 0.4], [15, 0.62], [16, 0.5], [17, 0.5], [18, 0.45]], d, true);
  const etatDiag = d => d < 2 ? "liquide" : d < 3 ? "bout" : d < 9 ? "vapeur" : d < 10.5 ? "bout" : d < 12 ? "liquide" : d < 13 ? "bout" : d < 15.8 ? "vapeur" : d < 17.5 ? "bout" : "liquide";
  const humeurDiag = d => d > 13.6 && d < 14.4 ? "surprise" : d > 7 && d < 9 || d > 14.4 && d < 16 ? "chaud" : d > 2 && d < 3.5 || d > 12 && d < 13 ? "froid" : "sourire";
  const tempBranche = w => D.courbe([[100, 0.45], [101, 0.45], [101.6, 0.25], [102.8, 0.25], [103, 0.28], [104, 0.28]], w, true);
  const etatBranche = w => w < 101.2 ? "liquide" : w < 102.9 ? "bout" : "vapeur";

  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const titre = D.el("g", {}, g), corps = D.el("g", {}, g);
    const [s1, s2] = c.recit.sousTitre.split(/ (?=raconté)/);
    D.texte(titre, 492, 330, c.recit.titre, { "text-anchor": "middle", "font-size": 58, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    D.texte(titre, 492, 388, s1, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: D.ORANGE, "font-family": SANS });
    if (s2) D.texte(titre, 492, 432, s2, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: D.ORANGE, "font-family": SANS });

    /* k1 : un entrepôt, trois portes de chambre froide, et le compresseur à vis (symbole) */
    const entrepot = D.el("g", { opacity: 0 }, corps);
    D.el("polygon", { points: "50,330 215,255 380,330", fill: "#8a96a4", stroke: D.BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, entrepot);
    rect(entrepot, 60, 330, 310, 210, { fill: "#e4ebf3", stroke: D.BLEU, "stroke-width": 4 });
    [0, 1, 2].forEach(k => {
      const x = 84 + k * 98;
      rect(entrepot, x, 392, 76, 148, { fill: "#bcd9f2", stroke: D.BLEU, "stroke-width": 3 });
      D.el("line", { x1: x + 38, y1: 392, x2: x + 38, y2: 540, stroke: D.BLEU, "stroke-width": 2 }, entrepot);
      [0, 60, 120].forEach(a => D.el("line", { x1: x + 38 - 14 * Math.cos(a * Math.PI / 180), y1: 432 - 14 * Math.sin(a * Math.PI / 180), x2: x + 38 + 14 * Math.cos(a * Math.PI / 180), y2: 432 + 14 * Math.sin(a * Math.PI / 180), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, entrepot)); // un flocon sur chaque porte
    });
    const compr = D.el("g", { opacity: 0 }, corps);
    rect(compr, 590, 284, 340, 270, { rx: 18, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(compr, "compresseur", 605, 300, 310, 240);

    /* k2-k3 : les vis en vue longue, simplifiée, l'orifice économiseur sur le côté (vert) */
    const machine = D.el("g", { opacity: 0 }, corps), defs = D.el("defs", {}, machine), idH = ident("hach");
    const pat = D.el("pattern", { id: idH, width: 11, height: 11, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    rect(pat, 0, 0, 11, 11, { fill: "#bcc2c8" }); D.el("line", { x1: 0, y1: 0, x2: 0, y2: 11, stroke: "#767f88", "stroke-width": 2.4 }, pat);
    rect(machine, 70, 430, 810, 210, { rx: 10, fill: "url(#" + idH + ")", stroke: "#39424c", "stroke-width": 4 });
    rect(machine, 130, 470, 700, 138, { rx: 6, fill: "#eef4fa", stroke: "#39424c", "stroke-width": 4 });
    rect(machine, 56, 508, 78, 62, { fill: "#eef4fa", stroke: "#39424c", "stroke-width": 4 }); // l'entrée d'aspiration, à gauche
    const lobes = rotors(machine, 150, 810, 476, 540, 602, 76);
    const OX = 560, orifice = D.el("g", {}, machine);   // l'orifice, dans la paroi du dessus
    rect(orifice, OX - 24, 424, 48, 54, { fill: "#cfeadb", stroke: D.ECO, "stroke-width": 6 });
    const halo = rect(orifice, OX - 36, 416, 72, 70, { rx: 14, fill: "none", stroke: D.ECO, "stroke-width": 10, opacity: 0 });
    const VOIE = [[OX, 452], [OX, 255], [430, 255]];       // la ligne de l'économiseur : de l'orifice jusqu'au sous-refroidisseur
    const flecheOr = fleche(machine, OX, 322, OX, 416, D.ECO, 16);
    const ligne = D.el("g", {}, g);                        // devant la machine
    D.el("polyline", { points: pts(VOIE), fill: "none", stroke: CUIVRE, "stroke-width": 44, "stroke-linejoin": "round", pathLength: 100 }, ligne);
    const coeur = D.el("polyline", { points: pts(VOIE), fill: "none", stroke: "#7cc49a", "stroke-width": 30, "stroke-linejoin": "round", pathLength: 100 }, ligne);
    const brut = ligne.firstChild;
    const chev = [0, 1, 2].map(() => D.el("path", { d: "M -9 -13 L 7 0 L -9 13", fill: "none", stroke: D.ECO, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, ligne));
    const sr = D.el("g", { opacity: 0 }, g);
    rect(sr, 250, 180, 190, 150, { rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(sr, "sousRefroidisseur", 265, 190, 160, 130);
    const qm = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: 428, cy: 196, r: 30, fill: D.ORANGE, stroke: "#fff", "stroke-width": 4 }, qm);
    D.texte(qm, 428, 210, "?", { "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: "#fff", "font-family": TITRE });
    const eOr = etiq(g, 510, 396, "orifice économiseur", { ancre: "end", coul: D.ECO, trait: [518, 402, OX - 18, 428], coulTrait: D.ECO });
    const eSr = etiq(g, 600, 247, ["sous-refroidisseur", "de liquide"], { coul: NUIT, pas: 38 });

    /* k4-k7 : la carte du circuit (halos d'abord : ils passent derrière) */
    const hCarte = D.el("g", { transform: "translate(66 158) scale(0.86)" }, corps);
    const haloP = D.el("polyline", { points: D.CIRCUIT_PTS.map(p => p.join(",")).join(" "), fill: "none", stroke: "#ff6b35", "stroke-width": 36, "stroke-linejoin": "round", opacity: 0 }, hCarte);
    const haloB = D.el("polyline", { points: D.BRANCHE_ECO.map(p => p.join(",")).join(" "), fill: "none", stroke: D.ECO, "stroke-width": 30, "stroke-linejoin": "round", opacity: 0 }, hCarte);
    const cir = D.circuit(corps, 66, 158, 860, true);
    op(cir.g, 0);
    const fl5 = D.el("g", { opacity: 0 }, corps);
    grosse(fl5, 300, 494, 300, 90, D.ORANGE);

    const dessus = D.el("g", {}, g);
    const pa = pas(dessus, [["fluide frigorigène", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["chambres froides · compresseur à vis", BLEU, T[1] + 0.2, E[1] + 0.3],
      ["à droite : le diagramme", D.ORANGE, T[5] + 0.3, E[5] + 0.3], ["1er tour : le liquide principal", D.ORANGE, T[6] + 0.1, A(6, 0.42)], ["2e tour : le piquage", D.ECO, A(6, 0.42), E[6] + 0.4],
      ["on commence au condenseur", D.BLEU, T[7] + 0.1, c.D + 1]]);
    const mila = D.heroine(dessus, { r: 30 });
    const POS = { evaporateur: 0.5, compresseur: 3.5, separateurHuile: 6, condenseur: 7.5, bouteille: 9, detendeur: 15 };
    const [ex, ey] = cir.ecran(...D.circuitPoint(W0));
    const T6B = A(6, 0.42), T6C = A(6, 0.84);
    return function (t) {
      /* la molécule : sur la carte (w) ou dans la scène */
      let w = null, d;
      if (t >= T[4]) {
        if (t < E[4] + 0.2) w = W0 + 17 * D.borne((t - (T[4] + 0.7)) / (E[4] - T[4] - 0.7), 0, 1);
        else if (t < T[6]) w = W0 + 17 * D.borne((t - T[5]) / (E[5] - T[5]), 0, 1);
        else if (t < T6B) w = 25 + D.lerp(0, 10.35 - 8, D.lisse((t - T[6]) / (T6B - T[6])));
        else if (t < T6C + 0.2) w = 100 + 4 * D.borne((t - T6B) / (T6C - T6B), 0, 1);
        else if (t < T[7]) w = 104;
        else w = D.lerp(3.6, 7.5, D.lisse((t - T[7]) / (E[7] - T[7])));
      }
      const wm = w === null ? 0 : w >= 100 ? w : ((w % 17) + 17) % 17;
      const [mx, my] = w === null ? [ex, ey] : cir.ecran(...D.circuitPoint(w));
      const m = doux(t, T[4] - 0.1, 0.7);
      const sx = D.courbe([[0, 492], [T[0] - 0.7, 492], [T[0] + 0.6, 492], [T[1] - 0.1, 492], [T[1] + 0.6, 492], [T[2] - 0.2, 492], [T[2] + 0.6, 135]], t);
      const sy = D.courbe([[0, 560], [T[0] - 0.7, 560], [T[0] + 0.6, 440], [T[1] - 0.1, 440], [T[1] + 0.6, 585], [T[2] - 0.2, 585], [T[2] + 0.6, 335]], t) + Math.sin(t * 2.2) * 6 * (1 - m);
      const ss = D.courbe([[0, 1.8], [T[0] - 0.7, 1.8], [T[0] + 0.6, 2.6], [T[1] - 0.1, 2.6], [T[1] + 0.6, 1.5], [T[2] - 0.2, 1.5], [T[2] + 0.6, 1.6]], t);
      const x = D.lerp(sx, mx, m), y = D.lerp(sy, my, m), s = D.lerp(ss, 0.8, m);
      let temp = 0.1, etat = "liquide", humeur = t > T[2] && t < E[3] ? "surprise" : "sourire";
      if (t >= T[4]) {
        if (w >= 100) { temp = tempBranche(w); etat = etatBranche(w); humeur = etat === "vapeur" ? "sourire" : "froid"; }
        else { temp = tempCircuit(wm); etat = etatCircuit(wm); humeur = humeurCircuit(wm); }
      }
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: m > 0 ? [0, 0] : [D.lisse((t - T[0]) / 1.4), 0] });

      op(titre, 1 - doux(t, T[0] - 1, 0.7)); montrer(pa, t);
      /* k1 */
      fen(entrepot, t, T[1] + 0.3, E[1] + 0.2, 0.5); fen(compr, t, A(1, 0.45), E[1] + 0.2, 0.5);
      /* k2-k3 */
      op(machine, doux(t, T[2] - 0.2, 0.6) * (1 - doux(t, E[3] + 0.05, 0.35)));
      lobes(0.12 * Math.max(0, t - T[2]));
      op(halo, 0.35 + 0.65 * Math.abs(Math.sin(t * 4)) * D.fenetre(t, T[2] + 0.2, E[3] + 0.4, 0.3));
      op(flecheOr, D.fenetre(t, T[2] + 0.5, T[3] + 0.3, 0.4) * (0.55 + 0.45 * Math.abs(Math.sin(t * 5))));
      op(eOr, doux(t, A(2, 0.5), 0.4) * (1 - doux(t, E[3] + 0.05, 0.35)));
      const rem = doux(t, T[3], 0.2) * D.borne((t - T[3]) / 1.8, 0, 1);
      op(ligne, doux(t, T[3] - 0.05, 0.1) * (1 - doux(t, E[3] + 0.05, 0.35)));
      [brut, coeur].forEach(e => e.setAttribute("stroke-dasharray", f1(100 * rem) + " 100"));
      chev.forEach((e, i) => {
        const u = D.frac(t * 0.28 - i / 3), [px, py, a] = suivre(VOIE.slice().reverse(), u);
        e.setAttribute("transform", "translate(" + f1(px) + " " + f1(py) + ") rotate(" + f1(a * 180 / Math.PI) + ")");
        op(e, (rem > 0.97 ? 1 : 0) * D.fenetre(u, 0, 1, 0.12));
      });
      op(sr, doux(t, A(3, 0.35), 0.5) * (1 - doux(t, E[3] + 0.05, 0.35))); op(qm, doux(t, A(3, 0.45), 0.4) * (1 - doux(t, E[3] + 0.05, 0.35)));
      op(eSr, doux(t, A(3, 0.62), 0.5) * (1 - doux(t, E[3] + 0.05, 0.35)));
      /* k4-k7 : la carte */
      op(cir.g, doux(t, T[4] - 0.15, 0.6));
      cir.surligne("sousRefroidisseur", t > T[4] && t < T[6]);
      for (const nom in POS) cir.surligne(nom, w !== null && w < 100 && t < T[6] && Math.abs(wm - POS[nom]) < 0.8 || (nom === "condenseur" && t >= T[7]));
      op(fl5, D.fenetre(t, T[5], E[5] + 0.3, 0.5));
      op(haloP, D.fenetre(t, T[6] - 0.1, T6B + 0.3, 0.4) * (0.7 + 0.3 * Math.sin(t * 5)));
      op(haloB, D.fenetre(t, T6B - 0.1, E[6] + 0.8, 0.4) * (0.7 + 0.3 * Math.sin(t * 5)));
      const r = { temp: temp, etat: etat, humeur: humeur };
      if (t >= T[5]) { // le diagramme : le premier tour (0 → 11), le second par le piquage (11 → 18)
        r.diag0 = 0;
        if (t < T[6]) r.diag = D.courbe(MAP_D, w - W0, true);
        else if (t < T6B) r.diag = 11;
        else if (t < T6C) r.diag = D.lerp(11, 14, (t - T6B) / (T6C - T6B));
        else if (t < T[7]) r.diag = D.lerp(14, 18, D.lisse((t - T6C) / (E[6] - T6C + 0.2)));
        else r.diag = 18;
        r.temp = tempDiag(r.diag); r.etat = etatDiag(r.diag); r.humeur = humeurDiag(r.diag);
      }
      return r;
    };
  };

  /* =====================================================================
     1 · LE CONDENSEUR — une batterie à air coupée dans la longueur : le tube,
     les ailettes, l'air qui traverse, trois zones ; puis trois thermomètres.
     Le fluide va de gauche à droite : désurchauffe (1), condensation (2),
     sous-refroidissement (3). k0-k1 : carte d'identité (théâtre) ; coupe dès k2.
     ===================================================================== */
  S.condenseur = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const X0 = 40, X1 = 940, YH = 420, YB = 520, XA = 270, XB = 690;      // le tube (intérieur y 420 → 520) et les bornes des zones
    const pDe = x => (x - X0) / (X1 - X0), xDe = p => X0 + p * (X1 - X0);
    const coil = D.el("g", {}, g);
    /* teintes de zone, ailettes, air, chaleur */
    const teintes = [[X0, XA, "rgba(224,72,52,.13)"], [XA, XB, "rgba(240,160,50,.16)"], [XB, X1, "rgba(60,120,200,.13)"]].map(([a, b, f]) => rect(coil, a, 340, b - a, 260, { fill: f, opacity: 0 }));
    for (let x = 60; x <= 930; x += 24) rect(coil, x, 340, 7, 260, { fill: "url(#vm-acier-h)", opacity: 0.55 });
    const air = D.el("g", {}, coil), chaud = D.el("g", {}, coil), chevrons = [], vagues = [];
    for (let k = 0; k < 5; k++) for (let j = 0; j < 3; j++) chevrons.push({ x: 360 + k * 140, f: j / 3, maj: D.chevron(air) });
    for (let k = 0; k < 8; k++) [-1, 1].forEach(cote => vagues.push({ x: 100 + k * 110 + (cote > 0 ? 55 : 0), cote: cote, f: D.frac(k * 0.37), maj: D.chaleur(chaud) }));
    const vent = D.ventilateur(coil, 110, 300, 38);
    const eAir = etiq(coil, 180, 312, "air frais", { coul: "#2f6fb8" }), eChaud = etiq(coil, 60, 654, "air réchauffé", { coul: "#c9451a" });
    op(eAir, 1); op(eChaud, 1);
    rect(coil, X0, YH - 14, X1 - X0, 14, { fill: "url(#vm-cuivre)" }); rect(coil, X0, YB, X1 - X0, 14, { fill: "url(#vm-cuivre)" });
    rect(coil, X0, YH, X1 - X0, YB - YH, { fill: CLAIR });
    const vap = D.el("g", {}, coil), fond = D.el("g", {}, coil);
    let G = 0;                                                         // la nappe grandit pendant la phrase 3
    const niveau = p => (D.lisse((p - 0.24) / 0.46) * 0.9 + 0.1 * D.lisse((p - 0.7) / 0.12)) * G;
    const tempLiq = p => p < 0.72 ? 0.5 : D.lerp(0.5, 0.42, (p - 0.72) / 0.28), tempVap = p => p < 0.256 ? D.lerp(0.62, 0.5, p / 0.256) : 0.5;
    const liq = D.liquide(coil, { x0: X0, x1: X1, yh: YH, yb: YB, niveau: x => niveau(pDe(x)), couleur: x => D.couleur(tempLiq(pDe(x)), false) });
    const gouttes = D.bulles(D.el("g", {}, coil), 36, 37, true);
    const reflet = D.courant(coil, XB + 30, X1 - 10, YH, YB, 6, 9);
    const r = D.alea(37), V = [];
    for (let i = 0; i < 40; i++) V.push({ s: r(), ry: r(), ph: r() * TOUR, maj: D.mol(vap) });
    /* les zones : borne, numéro, nom */
    const zones = [["désurchauffe", X0, XA, "#c0392b", 2, 62, 30], ["condensation", XA, XB, "#d9801f", 3, 352, 30], ["sous-refroidissement", XB, X1, BLEU, 4, 612, 28]].map(([nom, a, b, coul, k, x, tf], i) => {
      const gz = D.el("g", { opacity: 0 }, coil);
      D.el("path", { d: "M " + (a + 4) + " 254 V 238 H " + (b - 4) + " V 254", fill: "none", stroke: coul, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, gz);
      D.el("circle", { cx: x + 20, cy: 207, r: 20, fill: coul }, gz);
      D.texte(gz, x + 20, 217, String(i + 1), { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#fff", "font-family": SANS });
      D.etiquette(gz, x + 50, 218, nom, { "font-size": tf, fill: coul === "#d9801f" ? "#a8590a" : coul });
      return { g: gz, k: k, t: teintes[i] };
    });
    const pPres = pas(coil, [["pression constante", D.ORANGE, T[3] + 0.4, E[3]]]);
    const mila = D.heroine(fond, { r: 30 });

    /* k5-k6 : les thermomètres, sans chiffre */
    const th = D.el("g", { opacity: 0 }, g), TX = [190, 480, 770];
    const colonnes = [["température de", "condensation", 0.78, 0.5, T[5]], ["liquide", "sous-refroidi", 0.55, 0.42, T[5] + 0.5], ["air extérieur", "", 0.42, 0.18, T[6]]].map(([l1, l2, niv, temp, a], i) => {
      const gt = D.el("g", { opacity: 0 }, th), m = thermo(gt, TX[i], 210, 520, 26);
      D.etiquette(gt, TX[i], 628, l1, { "text-anchor": "middle" });
      if (l2) D.etiquette(gt, TX[i], 664, l2, { "text-anchor": "middle" });
      return { g: gt, m: m, niv: niv, temp: temp, a: a };
    });
    const Y = niv => colonnes[0].m.y(niv);
    const ecart = D.el("g", { opacity: 0 }, th);            // k5 : ce qui sépare les deux colonnes
    D.el("line", { x1: 222, y1: Y(0.78), x2: 452, y2: Y(0.78), stroke: GRIS, "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, ecart);
    fleche(ecart, 337, Y(0.78) + 6, 337, Y(0.55) - 2, D.BLEU, 8);
    const niveauAir = D.el("g", { opacity: 0 }, th);          // k6 : la colonne du liquide s'arrête juste au-dessus de celle de l'air
    D.el("line", { x1: 512, y1: Y(0.42), x2: 742, y2: Y(0.42), stroke: D.BLEU, "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, niveauAir);
    const pas6 = pas(th, [["pas plus froid que l'air", D.BLEU, T[6] + 0.4, c.D + 1]]);
    const dessus = D.el("g", {}, g);                           // la molécule dans le liquide plein, puis près des thermomètres : au-dessus de tout

    return function (t) {
      vent(t * 520);
      const dedans = 1 - doux(t, T[5] - 0.5, 0.45);
      op(coil, dedans);
      G = doux(t, T[3] + 0.2, E[3] - T[3] - 0.6);
      zones.forEach(z => { const a = doux(t, A(z.k, 0.05), 0.5); op(z.g, a); op(z.t, a); });
      chevrons.forEach(ch => {
        const f = D.frac(ch.f + t * 0.16), y = 262 + f * 430;
        ch.maj(ch.x, y, 0, y < 440 ? "#6fb1ea" : "#e8914a", D.fenetre(f, 0, 1, 0.12) * (y > 392 && y < 548 ? 0 : 0.9));
      });
      vagues.forEach(v => {
        const f = D.frac(v.f + t * 0.45), d = 40 * f, ok = v.x < XB ? 1 : 0.35;
        v.maj(v.x, v.cote < 0 ? YH - 28 - d : YB + 28 + d, v.cote < 0 ? 180 : 0, ok * D.fenetre(f, 0, 1, 0.25) * 0.9);
      });
      liq.maj(t);
      gouttes(t, (q, b) => { const p = 0.27 + q * 0.42, x = xDe(p), nv = niveau(p); return [x, YH + 6, liq.surface(x, t), nv > 0.02 && nv < 0.95 ? 0.95 : 0, D.couleur(tempLiq(p), false)]; });
      reflet(t, 80);
      V.forEach(m => {
        const p = D.frac(m.s + t / 16), x = xDe(p), libre = liq.surface(x, t) - YH;
        m.maj(x, YH + 16 + m.ry * Math.max(0, libre - 32) + Math.sin(t * 3 + m.ph) * 5, tempVap(p), true, D.borne((libre - 34) / 30, 0, 1));
      });
      montrer(pPres, t);
      /* la molécule : sur le tube pendant les phrases 2 à 4, puis près des thermomètres */
      const p = D.courbe([[T[2], 0.02], [E[2], 0.24], [T[3], 0.27], [E[3] - 0.3, 0.7], [T[4], 0.74], [E[4], 0.93]], t);
      const x = xDe(p), surf = liq.surface(x, t);
      const vapeur = t < T[3], flotteY = vapeur ? Math.min(YH + 54 + Math.sin(t * 2.5) * 8, surf - 46) : Math.max(surf + 4 + Math.sin(t * 2) * 4, YH + 40);
      const temp = D.courbe([[T[2], 0.62], [E[2], 0.5], [T[4], 0.5], [E[4], 0.42]], t, true);
      const etat = t < T[3] ? "vapeur" : t < E[3] - 0.6 ? "bout" : "liquide";
      const humeur = t < E[2] ? "chaud" : t < E[3] ? "surprise" : "sourire";
      const ailleurs = doux(t, T[5] - 0.1, 0.5);
      plan(mila, t < E[3] - 0.6 ? fond : dessus);
      mila({ x: D.lerp(x, 85, ailleurs), y: D.lerp(flotteY, 470, ailleurs), s: 0.9, t: t, temp: ailleurs > 0.5 ? 0.42 : temp, etat: ailleurs > 0.5 ? "liquide" : etat, humeur: humeur, regard: [1, 0], op: t < T[2] ? 0 : 1 });
      /* les thermomètres */
      op(th, 1 - dedans);
      colonnes.forEach(k => { op(k.g, doux(t, k.a, 0.45)); k.m(k.niv * doux(t, k.a + 0.3, 1.1), D.couleur(k.temp, false)); });
      op(ecart, doux(t, T[5] + 1.6, 0.5) * (1 - doux(t, T[6], 0.4))); op(niveauAir, doux(t, T[6] + 1.2, 0.5));
      montrer(pas6, t);
      const d = D.courbe([[0, 8], [T[2], 8], [E[2], 9], [E[3], 10], [E[4], 11]], t, true);
      return { temp: t < T[2] ? 0.62 : temp, etat: t < T[2] ? "vapeur" : etat, humeur: t < T[2] ? "chaud" : humeur, diag: d, diag0: 8 };
    };
  };

  /* =====================================================================
     2 · PLUS DE FROID POUR CHAQUE KILO — la scène ACCOMPAGNE le diagramme
     k0 : la loupe et la flèche vers la droite · k1 : le détendeur, la pression
     tombe, l'énergie ne change pas · k2 : deux liquides avant le détendeur ·
     k3 : deux barres, ce que prend chaque kilo · k4 : le compresseur aspire
     autant · k5 : du froid à bon compte. Les calques `sansSR` (k1) et `gain`
     (k3) viennent du récit.
     ===================================================================== */
  S.plusDeFroid = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const BLEU_P = D.couleur(0.3, false), ROUGE_B = "#d6584a", BLEU_B = "#3f86d1";
    /* k0 : la loupe */
    const k0 = D.el("g", { opacity: 0 }, g);
    const loupe = D.el("g", {}, k0);
    D.el("line", { x1: 452, y1: 438, x2: 392, y2: 500, stroke: "#6e3818", "stroke-width": 16, "stroke-linecap": "round" }, loupe);
    D.el("circle", { cx: 500, cy: 396, r: 66, fill: "rgba(255,255,255,.7)", stroke: D.BLEU, "stroke-width": 11 }, loupe);
    D.el("path", { d: "M 468 428 Q 464 372 500 366 Q 536 372 532 428", fill: "rgba(47,111,184,.12)", stroke: BLEU, "stroke-width": 5, "stroke-linecap": "round" }, loupe); // une cloche minuscule dans le verre
    D.el("polyline", { points: "478,410 478,392 522,392 522,410", fill: "none", stroke: D.ORANGE, "stroke-width": 5, "stroke-linejoin": "round" }, loupe);
    const fl0 = grosse(k0, 600, 450, 340, 110, D.ORANGE);
    /* k1-k2 : le détendeur (symbole), posé à droite ; k1 : la flèche de pression qui descend */
    const sym = D.el("g", { opacity: 0 }, g);
    rect(sym, 590, 250, 320, 330, { rx: 20, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(sym, "detendeur", 610, 270, 280, 290);
    D.etiquette(sym, 750, 625, "détendeur", { "text-anchor": "middle" });
    const chute = D.el("g", { opacity: 0 }, g);
    D.el("line", { x1: 440, y1: 235, x2: 440, y2: 600, stroke: "#9fb4cc", "stroke-width": 12, "stroke-linecap": "round" }, chute);
    D.el("polygon", { points: "440,640 408,590 472,590", fill: "#9fb4cc" }, chute);
    D.etiquette(chute, 380, 420, "la pression", { "text-anchor": "end" }); D.etiquette(chute, 380, 456, "tombe", { "text-anchor": "end" });
    /* k2 : deux liquides avant le détendeur */
    const k2 = D.el("g", { opacity: 0 }, g);
    const mA = D.heroine(k2, { r: 30 }), mB = D.heroine(k2, { r: 30 });
    D.etiquette(k2, 170, 392, "juste condensée", { fill: "#a8590a" }); D.etiquette(k2, 170, 552, "plus froide", { fill: BLEU });
    fleche(k2, 420, 394, 578, 458, D.couleur(0.45, false), 9); fleche(k2, 330, 552, 578, 484, BLEU_P, 9);
    /* k3 : deux barres, ce que prend chaque kilo */
    const k3 = D.el("g", { opacity: 0 }, g);
    D.etiquette(k3, 492, 220, "ce que prend chaque kilo", { "text-anchor": "middle" });
    D.etiquette(k3, 492, 258, "à la chambre froide", { "text-anchor": "middle", fill: GRIS, "font-size": 30 });
    const nA = D.heroine(k3, { r: 30 }), nB = D.heroine(k3, { r: 30 });
    D.etiquette(k3, 135, 372, "sans", { fill: ROUGE }); D.etiquette(k3, 135, 512, "plus froide", { fill: BLEU });
    const barA = rect(k3, 360, 330, 0, 58, { rx: 8, fill: ROUGE_B }), barB = rect(k3, 360, 470, 0, 58, { rx: 8, fill: BLEU_B });
    const gain = rect(k3, 630, 470, 0, 58, { rx: 8, fill: "#1d57a5" });
    D.el("line", { x1: 630, y1: 300, x2: 630, y2: 556, stroke: GRIS, "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, k3);
    /* k4-k5 : le compresseur aspire autant, il fait plus de froid */
    const k4 = D.el("g", { opacity: 0 }, g);
    D.image(k4, "compresseur", 340, 280, 300, 240);
    D.etiquette(k4, 60, 372, "autant de vapeur", { fill: NUIT });
    fleche(k4, 60, 404, 330, 404, "#7f8da0", 14);
    D.etiquette(k4, 940, 372, "plus de froid", { "text-anchor": "end", fill: BLEU });
    fleche(k4, 650, 404, 930, 404, BLEU, 18);
    const pa = pas(g, [["regardons le diagramme", D.BLEU, T[0] + 0.2, E[0] + 0.3], ["mon énergie ne change pas", D.ORANGE, T[1] + 0.3, E[1] + 0.3],
      ["plus froide → plus à gauche", BLEU, T[2] + 0.5, E[2] + 0.3], ["du froid à bon compte", "#1e7e54", T[5] + 0.2, c.D + 1]]);
    const mila = D.heroine(g, { r: 30 });
    const tempD = d => D.courbe([[0, 0.45], [1, 0.3], [2, 0.08], [3, 0.08]], d, true);
    return function (t) {
      /* le diagramme : 0 (k0-k1), 0 → 1 → 2 (k2), 2 → 3 (k3), puis 3 */
      const d = D.courbe([[0, 0], [T[2], 0], [A(2, 0.5), 1], [E[2], 2], [T[3], 2], [E[3], 3]], t, true);
      const etat = d < 1.95 ? "liquide" : "bout", temp = tempD(d), humeur = d < 1.1 ? "sourire" : "froid";
      /* k0 : la loupe, la flèche */
      op(k0, doux(t, T[0] - 0.3, 0.6) * (1 - doux(t, E[0] + 0.1, 0.5)));
      loupe.setAttribute("transform", "translate(0 " + f1(Math.sin(t * 1.8) * 5) + ")");
      fl0.setAttribute("transform", "translate(" + f1(Math.max(0, Math.sin(t * 3)) * 18) + " 0)");
      /* k1-k2 : le détendeur et la flèche de pression ; la molécule glisse le long de la flèche */
      op(sym, doux(t, T[1] - 0.2, 0.6) * (1 - doux(t, E[2] - 0.25, 0.5))); // effacé avant les barres (k3)
      op(chute, doux(t, T[1] + 0.2, 0.5) * (1 - doux(t, E[1] + 0.2, 0.5)));
      const yDesc = D.courbe([[T[1], 250], [A(1, 0.45), 300], [E[1], 580]], t), bout = doux(t, A(1, 0.5), 0.5);
      /* k2 */
      op(k2, doux(t, T[2] - 0.1, 0.5) * (1 - doux(t, E[2] - 0.25, 0.5)));
      mA({ x: 105, y: 380, s: 1.1, t: t, temp: 0.45, etat: "liquide", humeur: "sourire", regard: [1, 0] });
      mB({ x: 105, y: 540, s: 1.1, t: t + 1, temp: 0.3, etat: "liquide", humeur: "sourire", regard: [1, 0] });
      /* k3 */
      op(k3, doux(t, T[3], 0.5) * (1 - doux(t, E[3] - 0.25, 0.5))); // un tableau à la fois : k3 part avant que k4 arrive
      nA({ x: 80, y: 350, s: 0.95, t: t, temp: 0.45, etat: "liquide", humeur: "triste", regard: [1, 0] });
      nB({ x: 80, y: 490, s: 0.95, t: t + 1, temp: 0.3, etat: "liquide", humeur: "sourire", regard: [1, 0] });
      barA.setAttribute("width", f1(270 * doux(t, A(3, 0.12), 1.3))); barB.setAttribute("width", f1(270 * doux(t, A(3, 0.5), 1.3)));
      gain.setAttribute("width", f1(310 * doux(t, A(3, 0.5) + 1.1, 1.0))); gain.setAttribute("x", 630);
      /* k4-k5 */
      op(k4, doux(t, T[4], 0.5));
      montrer(pa, t);
      /* la molécule principale */
      let x, y, s = 1, o = 1, e = etat, tp = temp, h = humeur;
      if (t < E[1] + 0.3) {
        const m = doux(t, E[0], 0.8);
        x = D.lerp(300, 440, m); y = D.lerp(470, yDesc, m); s = D.lerp(2.2, 1.0, m);
        o = doux(t, T[0] - 0.3, 0.6);
        if (t >= T[1]) { e = bout > 0.5 ? "bout" : "liquide"; tp = D.lerp(0.45, 0.08, bout); h = "surprise"; } else { e = "liquide"; tp = 0.45; h = "sourire"; }
      } else if (t < T[4] - 0.2) { x = 440; y = 580; o = 0; e = "bout"; tp = 0.08; }
      else { x = 490; y = 612; s = 1.3; o = doux(t, T[4] - 0.2, 0.5); e = "vapeur"; tp = D.lerp(0.12, 0.2, D.borne((t - T[4]) / (E[4] - T[4]), 0, 1)); h = t < T[5] ? "surprise" : "sourire"; }
      mila({ x: x, y: y, s: s, t: t, temp: tp, etat: e, humeur: h, regard: [1, 0], op: o });
      return { temp: temp, etat: etat, humeur: humeur, diag: d, diag0: 0 };
    };
  };

  /* un morceau de tube cuivre coupé dans la longueur, avec sa nappe de liquide (D.liquide), ses bulles qui montent et, au-dessus, de la vapeur.
     o : { x0, x1, yh, yb, temp (liquide), temp2 (liquide refroidi : calque qui bleuit), niv, nb (bulles), nv (molécules de vapeur), graine, tempVap }
     → { g, fond (ce qui flotte : sous la nappe), surface(x, t), maj(t, { dens 0..1 (part des bulles et de la vapeur visibles), froid 0..1 }) } */
  function tubeLiquide(parent, o) {
    const g = D.el("g", {}, parent);
    rect(g, o.x0, o.yh - 14, o.x1 - o.x0, 14, { fill: "url(#vm-cuivre)" }); rect(g, o.x0, o.yb, o.x1 - o.x0, 14, { fill: "url(#vm-cuivre)" });
    rect(g, o.x0, o.yh, o.x1 - o.x0, o.yb - o.yh, { fill: CLAIR });
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g), gW = D.el("g", {}, g), gC = D.el("g", { opacity: 0 }, g);
    const base = { x0: o.x0, x1: o.x1, yh: o.yh, yb: o.yb, niveau: () => o.niv, pas: 5 };
    const L1 = D.liquide(gW, Object.assign({ couleur: () => D.couleur(o.temp, false) }, base));
    const L2 = o.temp2 !== undefined ? D.liquide(gC, Object.assign({ couleur: () => D.couleur(o.temp2, false) }, base)) : null;
    const bul = D.bulles(D.el("g", {}, g), o.nb, o.graine, false);
    const r = D.alea(o.graine + 5), V = [];
    for (let i = 0; i < o.nv; i++) V.push({ s: r(), ry: r(), ph: r() * TOUR, k: (i + 0.5) / o.nv, maj: D.mol(vap) });
    return { g: g, fond: fond, surface: L1.surface, maj: function (t, e) {
      e = e || {};
      const dens = e.dens === undefined ? 1 : e.dens;
      L1.maj(t); if (L2) { L2.maj(t); op(gC, e.froid || 0); }
      bul(t, q => { const x = o.x0 + 16 + q * (o.x1 - o.x0 - 32); return [x, o.yb - 8, L1.surface(x, t) + 4, q < dens ? 1 : 0]; });
      V.forEach(m => {
        const x = o.x0 + 24 + D.frac(m.s + t * 0.03) * (o.x1 - o.x0 - 48), libre = L1.surface(x, t) - o.yh;
        m.maj(x, o.yh + 16 + m.ry * Math.max(0, libre - 36) + Math.sin(t * 3 + m.ph) * 4, o.tempVap === undefined ? 0.12 : o.tempVap, true, (m.k < dens ? 1 : 0) * D.borne((libre - 38) / 24, 0, 1));
      });
    } };
  }

  /* =====================================================================
     3 · LA VAPEUR DE DÉTENTE — juste après le détendeur
     k0 : le tube coupé, la nappe se couvre de bulles · k1 : la chaleur du
     liquide va aux bulles, il bleuit ; rien n'est pris à la chambre froide ·
     k2 : la vapeur part au compresseur · k3 : deux tubes (juste condensé,
     sous-refroidi) · k4 : plus près du bord liquide. Les calques `sansSR`
     (k0) et `detente` (k3) viennent du récit ; ici : diag 1 → 2 (k0), 2.
     ===================================================================== */
  S.vapeurDetente = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const YH = 330, YB = 490, XT0 = 205, XT1 = 650;
    const gA = D.el("g", {}, g);
    /* A : le détendeur (symbole), le tube coupé, la chambre froide puis le compresseur */
    rect(gA, 14, 270, 192, 205, { rx: 18, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(gA, "detendeur", 22, 285, 178, 178);
    const tube = tubeLiquide(gA, { x0: XT0, x1: XT1, yh: YH, yb: YB, temp: 0.42, temp2: 0.08, niv: 0.5, nb: 30, nv: 0, graine: 41 });
    D.el("polygon", { points: "650,314 664,340 646,366 664,392 646,418 664,444 646,470 664,492 650,506 690,506 690,314", fill: D.CREME }, gA); // la coupure, à droite
    D.el("polyline", { points: "650,314 664,340 646,366 664,392 646,418 664,444 646,470 664,492 650,506", fill: "none", stroke: "#39424c", "stroke-width": 3 }, gA);
    const vapG = D.el("g", {}, gA), VAP = [], rv = D.alea(43);
    for (let i = 0; i < 14; i++) VAP.push({ s: rv(), ry: rv(), ph: rv() * TOUR, k: (i + 0.5) / 14, maj: D.mol(vapG) });
    const chal = D.el("g", {}, gA), CH = [0, 1, 2, 3, 4, 5].map(i => ({ x: 270 + i * 66, f: D.frac(i * 0.37), maj: D.chaleur(chal) }));
    const eVap = etiq(gA, 240, 290, "vapeur de détente", { coul: "#6c3483", trait: [400, 298, 400, 314], coulTrait: "#6c3483" });
    /* la chambre froide (k1), barrée : rien ne lui est pris */
    const chambre = D.el("g", { opacity: 0 }, gA);
    D.el("polygon", { points: "756,372 850,324 944,372", fill: "#8a96a4", stroke: D.BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, chambre);
    rect(chambre, 766, 372, 168, 118, { fill: "#e4ebf3", stroke: D.BLEU, "stroke-width": 4 });
    rect(chambre, 840, 420, 56, 70, { fill: "#bcd9f2", stroke: D.BLEU, "stroke-width": 3 });
    [0, 60, 120].forEach(a => D.el("line", { x1: 806 - 17 * Math.cos(a * Math.PI / 180), y1: 440 - 17 * Math.sin(a * Math.PI / 180), x2: 806 + 17 * Math.cos(a * Math.PI / 180), y2: 440 + 17 * Math.sin(a * Math.PI / 180), stroke: D.BLEU, "stroke-width": 3.5, "stroke-linecap": "round" }, chambre));
    D.etiquette(chambre, 955, 548, "chambre froide", { "text-anchor": "end" });
    const barre = D.el("g", { opacity: 0 }, gA);
    fleche(barre, 748, 420, 676, 420, "#e2662c", 12);
    [[-1, -1, 1, 1], [-1, 1, 1, -1]].forEach(([a, b, cc, d]) => D.el("line", { x1: 712 + a * 20, y1: 420 + b * 20, x2: 712 + cc * 20, y2: 420 + d * 20, stroke: ROUGE, "stroke-width": 11, "stroke-linecap": "round" }, barre));
    const compr = D.el("g", { opacity: 0 }, gA);
    rect(compr, 760, 330, 180, 160, { rx: 18, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    D.image(compr, "compresseur", 770, 338, 160, 144);
    D.etiquette(compr, 955, 548, "compresseur", { "text-anchor": "end" });
    const mila = D.heroine(tube.fond, { r: 30 });
    /* B : deux tubes côte à côte (k3-k4) */
    const gB = D.el("g", { opacity: 0 }, g);
    const tA = tubeLiquide(gB, { x0: 40, x1: 470, yh: 400, yb: 500, temp: 0.08, niv: 0.55, nb: 26, nv: 9, graine: 51 }); // après le détendeur : les deux liquides sont froids,
    const tB = tubeLiquide(gB, { x0: 520, x1: 950, yh: 400, yb: 500, temp: 0.08, niv: 0.55, nb: 4, nv: 2, graine: 57 }); // seule la vapeur de détente diffère
    D.etiquette(gB, 495, 312, "après le détendeur", { "text-anchor": "middle", "font-weight": 700, fill: "#6c3483" });
    D.etiquette(gB, 255, 372, "parti juste condensé", { "text-anchor": "middle" }); D.etiquette(gB, 735, 372, "parti sous-refroidi", { "text-anchor": "middle" });
    const versDiag = D.el("g", { opacity: 0 }, g);
    grosse(versDiag, 560, 610, 380, 80, D.ORANGE);
    const pa = pas(g, [["rien pris à la chambre froide", ROUGE, T[1] + 0.6, E[1] + 0.3], ["du travail sans froid", D.ORANGE, T[2] + 0.4, E[2] + 0.3], ["plus près du bord liquide", BLEU, T[4] + 0.2, c.D + 1]]);
    return function (t) {
      const dA = 1 - doux(t, E[2] + 0.1, 0.5);
      op(gA, dA); op(gB, doux(t, T[3] - 0.1, 0.5));
      const dens = doux(t, T[0] + 0.3, E[0] - T[0] - 1.2);
      tube.maj(t, { dens: dens, froid: doux(t, T[1], E[1] - T[1]) });
      tA.maj(t, { dens: 1 }); tB.maj(t, { dens: 1 });
      /* la vapeur : elle file avec le liquide, puis quitte le tube vers le compresseur (k2) */
      VAP.forEach(m => {
        const x = 215 + D.frac(m.s + t * 0.05) * 600, libre = tube.surface(x, t) - YH, dehors = x > 646;
        const yTube = YH + 16 + m.ry * Math.max(0, libre - 36) + Math.sin(t * 3 + m.ph) * 4;
        const y = dehors ? D.lerp(yTube, 410, D.lisse((x - 646) / 90)) : yTube;
        const vis = (m.k < dens ? 1 : 0) * (dehors ? doux(t, T[2] - 0.2, 0.5) * (1 - D.lisse((x - 770) / 25)) : D.borne((libre - 38) / 24, 0, 1));
        m.maj(x, y, 0.12, true, vis);
      });
      /* k1 : la chaleur du liquide vers les bulles */
      CH.forEach(h => { const f = D.frac(h.f + t * 0.4); h.maj(h.x, YB - 30 - 40 * f, 180, 0.9 * D.fenetre(f, 0, 1, 0.25) * D.fenetre(t, T[1] + 0.2, E[1], 0.5)); });
      op(chambre, D.fenetre(t, T[1] - 0.1, E[1] + 0.2, 0.5)); op(barre, D.fenetre(t, A(1, 0.55), E[1] + 0.2, 0.4));
      op(compr, doux(t, T[2] - 0.2, 0.5));
      op(eVap, doux(t, A(0, 0.3), 0.5));
      op(versDiag, doux(t, A(4, 0.45), 0.5));
      montrer(pa, t);
      /* la molécule : elle sort du détendeur, flotte dans la nappe */
      const x = D.courbe([[T[0], 225], [E[0], 400], [E[1], 540], [E[2] + 0.3, 590]], t), s = tube.surface(x, t);
      const etat = t < A(0, 0.5) ? "liquide" : "bout", temp = D.courbe([[T[1], 0.42], [E[1], 0.08]], t, true);
      const humeur = t > T[1] ? "froid" : t > T[0] ? "surprise" : "sourire";
      mila({ x: x, y: Math.max(s - 12 + Math.sin(t * 2) * 4, YH + 40), s: 0.85, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0], op: doux(t, T[0] - 0.4, 0.5) * dA });
      const d = D.courbe([[T[0], 1], [E[0], 2]], t, true);
      return { temp: temp, etat: etat, humeur: humeur, diag: d, diag0: 1 };
    };
  };

  /* =====================================================================
     4 · PAS DE BULLES — la ligne liquide, de la bouteille au détendeur
     k0 : la ligne et ses organes · k1 : à chaque obstacle la pression
     baisse (jauge en marches) · k2 : juste à sa température de condensation
     (cadre rouge), des bulles naissent · k3 : le détendeur reçoit liquide +
     vapeur, l'évaporateur est mal alimenté · k4 : sous-refroidie (cadre
     bleu), pas une bulle · k5 : zoom sur le voyant, clair. Le calque
     `marge` (k4) vient du récit ; `diag` : celui du récit ; `carte` rendue
     ici (la molécule recommence à chaque cas).
     ===================================================================== */
  S.bulles = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const LINE = [[83, 450], [410, 450], [410, 315], [743, 315]];      // l'axe de la ligne : tube, coudes, montée, vers le détendeur
    const SF = 0.21, SC1 = 0.411, SM = 0.496, SC2 = 0.581, SV = 0.82;   // abscisses curvilignes : filtre, 1er coude, milieu de la montée, 2e coude, voyant
    const AVANT = D.couleur(0.45, false), APRES = D.couleur(0.3, false);
    const cid = ident("rev"), clip = rect(D.el("clipPath", { id: cid }, g), 14, 150, 0, 620);
    const gL = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    const liq = tuyauPoly(gL, LINE, 40, AVANT);
    const brille = reflets(gL, LINE, 12, 5);
    const rb = D.alea(23), B = Array.from({ length: 34 }, (_, i) => i < 10 ? 0.25 + i * 0.006 : 0.52 + (i - 10) * 0.016).map(born => ({ born: born, v: 0.05 + rb() * 0.03, ph: rb(), off: (rb() - 0.5) * 14, e: D.el("circle", { fill: "#fff", "fill-opacity": 0.75, stroke: "#7f9bb8", "stroke-width": 2.5 }, gL) }));
    const cadre = (x, y, w, h) => rect(gL, x, y, w, h, { rx: 12, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 });
    cadre(36, 438, 94, 160); D.image(gL, "bouteille", 44, 446, 78, 145);
    cadre(178, 410, 144, 80); D.image(gL, "filtre", 185, 417.5, 130, 65);
    cadre(518, 280, 164, 70); D.image(gL, "voyant", 525, 285, 150, 60);
    cadre(736, 224, 134, 134); D.image(gL, "detendeur", 743, 231, 120, 120);
    /* k0 : les noms, au fil de la ligne qui se dessine */
    const noms = [[["bouteille"], 44, 634, "start", 44], [["tube"], 150, 408, "middle", 150], [["filtre"], 250, 398, "middle", 250], [["coudes et montée"], 456, 392, "start", 456],
      [["voyant"], 600, 262, "middle", 600], [["détendeur"], 803, 214, "middle", 803]].map(([t, x, y, a, xr]) => ({ g: etiq(g, x, y, t, { ancre: a }), x: xr }));
    /* k1 : une petite flèche « pression » à chaque obstacle, et la jauge qui baisse marche par marche */
    const flP = D.el("g", {}, g), obst = [[250, 356, 250, 404, 250, 345, "middle", SF], [452, 362, 452, 406, 480, 393, "start", SM], [600, 252, 600, 276, 600, 240, "middle", SV]].map(([ax, ay, bx, by, tx, ty, an, s]) => {
      const q = D.el("g", { opacity: 0 }, flP);
      fleche(q, ax, ay, bx, by, ROUGE, 8); D.etiquette(q, tx, ty, "pression", { "text-anchor": an, fill: ROUGE, "font-size": 30 });
      return { g: q, s: s };
    });
    const gJ = D.el("g", { opacity: 0 }, g), idJ = ident("jauge"), clipJ = rect(D.el("clipPath", { id: idJ }, gJ), 140, 520, 0, 200);
    const sx = s => 150 + s * 750, MARCHES = [SF, SC1, SM, SC2, SV], YJ = k => 575 + 24 * k;
    let d = "M 150 " + YJ(0);
    MARCHES.forEach((s, k) => { d += " H " + f1(sx(s)) + " V " + YJ(k + 1); });
    D.el("path", { d: d + " H 900", fill: "none", stroke: BLEU, "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round", "clip-path": "url(#" + idJ + ")" }, gJ);
    D.etiquette(gJ, 150, 548, "pression", { fill: BLEU });
    const point = D.el("circle", { r: 11, fill: D.ORANGE, stroke: "#fff", "stroke-width": 3 }, gJ);
    /* cadres des deux cas */
    const cR = D.el("g", { opacity: 0 }, g), cB = D.el("g", { opacity: 0 }, g);
    rect(cR, 22, 165, 936, 528, { rx: 20, fill: "none", stroke: ROUGE, "stroke-width": 7 }); D.etiquette(cR, 46, 676, "juste à sa température de condensation", { fill: ROUGE });
    rect(cB, 22, 165, 936, 528, { rx: 20, fill: "none", stroke: BLEU, "stroke-width": 7 }); D.etiquette(cB, 46, 676, "sous-refroidie", { fill: BLEU });
    /* k3 : la sortie du détendeur, le petit évaporateur à moitié vide */
    const gE = D.el("g", { opacity: 0 }, g);
    tuyauPoly(gE, [[863, 315], [905, 315], [905, 560]], 40, "#c9dcef");
    const evap = tubeLiquide(gE, { x0: 560, x1: 925, yh: 560, yb: 610, temp: 0.08, niv: 0.4, nb: 5, nv: 3, graine: 63 });
    D.etiquette(gE, 925, 664, "évaporateur", { "text-anchor": "end" });
    /* k5 : le voyant en gros plan */
    const gV = D.el("g", { opacity: 0 }, g), idV = ident("vitre"), CX = 492, CY = 455;
    rect(gV, 30, CY - 34, 320, 68, { fill: "url(#vm-cuivre)" }); rect(gV, 634, CY - 34, 296, 68, { fill: "url(#vm-cuivre)" });
    rect(gV, 330, 300, 324, 310, { rx: 46, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 4 });
    D.el("circle", { cx: CX, cy: CY, r: 134, fill: "#6f5214" }, gV);
    D.el("circle", { cx: CX, cy: CY, r: 122 }, D.el("clipPath", { id: idV }, gV));
    const vitre = D.el("g", { "clip-path": "url(#" + idV + ")" }, gV);
    rect(vitre, 360, 320, 270, 270, { fill: APRES });
    const flux = D.courant(vitre, 370, 614, CY - 110, CY + 110, 9, 11);
    rect(gV, 40, CY - 20, 290, 40, { fill: APRES, opacity: 0.9 }); rect(gV, 654, CY - 20, 276, 40, { fill: APRES, opacity: 0.9 });
    const fluxG = D.courant(gV, 40, 330, CY - 20, CY + 20, 4, 12), fluxD = D.courant(gV, 654, 930, CY - 20, CY + 20, 4, 13);
    D.el("path", { d: "M 410 380 A 100 100 0 0 1 520 345", fill: "none", stroke: "#fff", "stroke-width": 9, opacity: 0.6, "stroke-linecap": "round" }, gV);
    D.etiquette(gV, CX, 250, "voyant : clair, sans bulles", { "text-anchor": "middle", fill: "#1e7e54" });
    const pa = pas(g, [["de la marge", BLEU, A(4, 0.2), E[4] + 0.3], ["il alimente mal", ROUGE, T[3] + 0.5, E[3] + 0.3]]);
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      /* k0 : la ligne se dessine de gauche à droite ; ses noms suivent */
      const rev = D.borne((t - (T[0] + 0.3)) / (E[0] - T[0] - 1.1), 0, 1), xr = D.lerp(14, 960, rev);
      clip.setAttribute("width", f1(xr - 14));
      noms.forEach(n => op(n.g, D.borne((xr - n.x) / 50, 0, 1) * (1 - doux(t, E[0] + 0.1, 0.4))));
      /* la ligne : plus bleue pour la molécule sous-refroidie (k4) */
      const froide = doux(t, T[4] - 0.2, 0.6);
      liq.setAttribute("stroke", froide > 0.5 ? APRES : AVANT);
      brille(t, 0.05, 1);
      /* k2-k3 : les bulles naissent après le filtre et après la montée */
      B.forEach(b => {
        const f = D.frac(t * b.v + b.ph), [x, y, a] = suivre(LINE, b.born + f * (0.97 - b.born));
        b.e.setAttribute("cx", f1(x - Math.sin(a) * b.off)); b.e.setAttribute("cy", f1(y + Math.cos(a) * b.off)); b.e.setAttribute("r", f1(D.lerp(4, 11, f)));
        op(b.e, doux(t, b.born < 0.4 ? A(2, 0.3) : A(2, 0.62), 0.4) * (1 - doux(t, E[3] + 0.2, 0.4)) * D.fenetre(f, 0, 1, 0.1));
      });
      /* k1 : les flèches, la jauge */
      const u1 = D.courbe([[T[1], 0.1], [E[1] - 0.1, 0.78]], t, true);
      obst.forEach(o => op(o.g, D.fenetre(t, T[1] + (o.s - 0.1) / 0.68 * (E[1] - T[1] - 0.1), E[1] + 0.2, 0.25)));
      op(gJ, doux(t, T[1] - 0.1, 0.4) * (1 - doux(t, T[2] - 0.1, 0.4)));
      const xs = sx(D.borne(u1, 0, 1)); clipJ.setAttribute("width", f1(Math.max(0, xs - 140 + 8)));
      point.setAttribute("cx", f1(xs)); point.setAttribute("cy", YJ(MARCHES.filter(s => sx(s) <= xs).length));
      /* cadres, k3 */
      const zoom = doux(t, T[5] - 0.3, 0.7);
      op(cR, D.fenetre(t, T[2] - 0.1, E[3] + 0.4, 0.4)); op(cB, D.fenetre(t, T[4] - 0.1, E[4] + 0.4, 0.4) * (1 - zoom));
      op(gE, D.fenetre(t, A(3, 0.1), E[3] + 0.4, 0.5)); evap.maj(t, { dens: 1 });
      /* k5 : on entre dans le voyant */
      op(gV, zoom); gL.setAttribute("opacity", (1 - zoom).toFixed(2));
      fluxG(t, 90); fluxD(t, 90); flux(t, 90);
      montrer(pa, t);
      /* la molécule : elle refait la ligne à chaque cas */
      const u = t < E[1] + 0.4 ? u1 : t < T[4] - 0.2 ? D.courbe([[T[2], 0], [E[2], 0.78], [T[3], 0.78], [E[3] - 0.4, 0.95]], t) : D.courbe([[T[4], 0], [E[4], 0.97]], t);
      const [lx, ly] = suivre(LINE, D.borne(u, 0, 0.97));
      const vue = Math.max(D.fenetre(t, T[0] + 1.3, E[1] + 0.3, 0.3), D.fenetre(t, T[2] - 0.15, E[3] + 0.5, 0.3), D.fenetre(t, T[4] - 0.15, E[4] + 0.3, 0.3));
      let x = lx, y = ly, s = 0.5, o = vue * (1 - zoom), temp = t < T[4] - 0.2 ? 0.45 : 0.3, etat = "liquide", humeur = "sourire";
      if (t >= T[2] - 0.2 && t < T[4] - 0.2) { etat = u > 0.5 ? "bout" : "liquide"; humeur = u > 0.5 ? "triste" : "surprise"; }
      if (t >= T[5] - 0.3) { x = D.courbe([[T[5] - 0.3, 60], [E[5] - 0.2, 895]], t, true); y = CY; s = 0.8; o = zoom; temp = 0.3; humeur = "sourire"; }
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0], op: o });
      return { temp: temp, etat: etat, humeur: humeur, carte: D.lerp(9.2, 15, D.borne(t >= T[5] - 0.3 ? 0.82 : u, 0, 1)) };
    };
  };
})();
