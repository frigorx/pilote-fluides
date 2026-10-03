/* =====================================================================
   voyage-sous-refroidisseur-dessin.js — ce que l'édition « sous-
   refroidisseur de liquide » change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-sous-refroidisseur.html
   (et par les outils quand ils fabriquent l'édition). Recopié de
   voyage-vis-dessin.js (même installation), sans toucher au fichier
   commun ni à l'édition vis : organes, carte du circuit, carte d'identité
   décalée à gauche (écran partagé), et la BRANCHE DU PIQUAGE.
   CARTE (repère 1000 × 620, sens du fluide, croix du frigoriste) : celle du
   vis ; sur la ligne liquide, entre la bouteille et le détendeur, le
   sous-refroidisseur (échangeur à plaques, symbole frigo_schema). Le
   liquide principal y suit une diagonale (haut gauche → bas droite), le
   piquage l'autre, en sens contraire (bas gauche → haut droite).
   LE PIQUAGE (D.BRANCHE_ECO, trait cuivre à cœur vert) : un té sur la ligne
   liquide, AVANT l'échangeur, sort à l'extérieur de la boucle (électrovanne,
   petit détendeur), entre dans l'échangeur par le bas, ressort en haut et
   traverse l'intérieur de la boucle jusqu'au flanc du compresseur (orifice
   économiseur). Le retour d'huile du vis n'est pas dessiné ici : il
   croiserait cette ligne.
   POSITIONS (`carte` du récit, D.circuitPoint) : 0 → 17 sur D.CIRCUIT_PTS
   (0,5 évaporateur · 3,5 compresseur · 6 séparateur d'huile · 7,5
   condenseur · 9 bouteille · 10,35 le té · 11 → 14 l'échangeur (12,5 au
   milieu) · 15 détendeur · 17 = 0) ; 100 → 104 sur la branche (100 le té ·
   101 le petit détendeur · 102 entrée de l'échangeur · 103 sortie · 104
   l'orifice économiseur). D.branchePoint(w) donne le point brut sur la
   branche (0 → D.BRANCHE_ECO.length - 1).
   HORS CARTE : D.ORGANES.voyant, .filtre (scènes « pas de bulles », « ce
   que l'on mesure »). D.ECO : le vert du piquage (= calque du diagramme).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.HUILE = "#c98a1b";
  D.ECO = "#1e7e54";
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* ---------- les organes ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur", court: "évaporateur" },
    compresseur: { f: "compresseur_vis", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur à vis", court: "compresseur|à vis" },
    separateurHuile: { f: "separateur_huile", vb: [-14, -18, 30, 40], axe: [0, -10], nom: "séparateur d'huile", court: "séparateur d'huile" },
    condenseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "condenseur", court: "condenseur" },
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille", court: "bouteille" },
    sousRefroidisseur: { f: "echangeur_a_plaques", vb: [-21, -15, 40, 40], axe: [-1, 5], nom: "sous-refroidisseur", court: "sous-|refroidisseur" },
    detendeur: { f: "detendeur_thermo_ext", vb: [-19, -28, 40, 40], axe: [0, 0], nom: "détendeur", court: "détendeur", lettres: [0, -12, 4.6, "TC"] },
    electrovanne: { f: "electrovanne_frigo", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "électrovanne", court: "électrovanne" },
    detendeurEco: { f: "detendeur_thermo_ext", vb: [-19, -28, 40, 40], axe: [0, 0], nom: "petit détendeur", court: "petit détendeur", lettres: [0, -12, 4.6, "TC"] },
    voyant: { f: "voyant_liquide", vb: [-15, -10, 50, 20], axe: [0, 0], nom: "voyant liquide", court: "voyant" },        // hors carte
    filtre: { f: "filtre_deshydrateur", vb: [-25, -10, 40, 20], axe: [0, 0], nom: "filtre déshydrateur", court: "filtre" } // hors carte
  };

  /* la carte d'identité : même cadre que l'édition vis, décalée à gauche (x 30 → 930) pour laisser la colonne de droite libre */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 30, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 66, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    D.image(g, s.organe, 86, 246, 340, 260);
    D.texte(g, 256, 566, "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 13 ? D.couper(nom, 15) : [nom], deux = lignes.length > 1;
    D.lignes(g, 482, 296, lignes, { "font-size": deux ? 50 : 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, 56);
    D.lignes(g, 482, deux ? 424 : 372, D.couper("Son rôle : " + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 48);
    D.texte(g, 482, 616, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* ---------- la carte du circuit ---------- */
  D.CIRCUIT_PTS = [[390, 545], [650, 545], [890, 545], [890, 440], [890, 230], [890, 85], [790, 85], [700, 85], [440, 85],
    [330, 85], [150, 85], [150, 240], [150, 255], [210, 315], [210, 330], [210, 450], [210, 545], [390, 545]];
  /* le piquage : té (avant l'échangeur) → dehors à gauche (électrovanne, petit détendeur) → entrée de l'échangeur en bas
     à gauche → diagonale montante → sortie en haut à droite → à travers la boucle → flanc du compresseur */
  D.BRANCHE_ECO = [[150, 140], [48, 140], [48, 330], [150, 330], [150, 315], [210, 255], [210, 240], [800, 240], [800, 290], [826, 290]];
  const CLES = [0, 1.684, 3, 6, 9]; // 100 té · 101 petit détendeur · 102 entrée échangeur · 103 sortie · 104 orifice économiseur
  const PLACES = { evaporateur: [520, 545, 2.4, -90], compresseur: [890, 335, 3.2, -90], separateurHuile: [790, 85, 2.6, 0, true],
    condenseur: [570, 85, 2.4, 90], bouteille: [330, 85, 1.65, 0, true], sousRefroidisseur: [177, 285, 3, 0], detendeur: [210, 450, 2.5, 90],
    electrovanne: [48, 185, 1.4, 90], detendeurEco: [48, 270, 1.4, 90] };
  const NOMS = { evaporateur: [520, 490, "middle"], compresseur: [812, 385, "end"], separateurHuile: [790, 44, "middle", 28],
    condenseur: [570, 184, "middle"], bouteille: [330, 206, "middle"], sousRefroidisseur: [258, 294, "start"], detendeur: [300, 458, "start"] };
  function poser(parent, nom, px, py, s, rot, miroir) { // = voyage-dessin.js (privée là-bas) ; renvoie le cadre du symbole posé
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe, embarque = window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[o.f];
    const g = D.el("g", { transform: "translate(" + px + " " + py + ") rotate(" + rot + ") scale(" + (miroir ? -s : s) + " " + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, parent);
    D.el("image", { href: embarque || D.SYM + o.f + ".svg", x: vx, y: vy, width: vl, height: vh }, g);
    const c = Math.round(Math.cos(rot * Math.PI / 180)), si = Math.round(Math.sin(rot * Math.PI / 180));
    if (o.lettres && rot) {
      const [lx, ly, lr, lt] = o.lettres, u = (lx - ax) * s, v = (ly - ay) * s, qx = px + u * c - v * si, qy = py + u * si + v * c;
      D.el("circle", { cx: qx, cy: qy, r: lr * s, fill: "#fff" }, parent);
      D.texte(parent, qx, qy + 2.1 * s, lt, { "text-anchor": "middle", "font-size": 5.4 * s, fill: "#333", "font-family": "sans-serif" });
    }
    const pts = [[vx, vy], [vx + vl, vy], [vx, vy + vh], [vx + vl, vy + vh]].map(([x, y]) => {
      const u = (x - ax) * (miroir ? -s : s), v = (y - ay) * s;
      return [px + u * c - v * si, py + u * si + v * c];
    });
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
  }
  D.branchePoint = function (w) { // position brute sur D.BRANCHE_ECO : 0 le té → D.BRANCHE_ECO.length - 1 l'orifice économiseur
    const nb = D.BRANCHE_ECO.length - 1;
    w = D.borne(w, 0, nb);
    const i = Math.min(nb - 1, Math.floor(w)), f = w - i, a = D.BRANCHE_ECO[i], b = D.BRANCHE_ECO[i + 1];
    return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
  };
  /* D.circuitPoint enveloppé : au-delà de 100, la molécule est sur la branche du piquage (positions du récit 100 → 104) */
  const surCircuit = D.circuitPoint;
  D.circuitPoint = function (w) {
    if (w < 100) return surCircuit(w);
    const m = D.borne(w - 100, 0, CLES.length - 1), j = Math.min(CLES.length - 2, Math.floor(m));
    return D.branchePoint(D.lerp(CLES[j], CLES[j + 1], m - j));
  };
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const pts = D.CIRCUIT_PTS.map(p => p.join(",")).join(" "), br = D.BRANCHE_ECO.map(p => p.join(",")).join(" ");
    D.el("polyline", { points: br, fill: "none", stroke: "#8a4a24", "stroke-width": 12, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: br, fill: "none", stroke: "#7cc49a", "stroke-width": 5, "stroke-linejoin": "round" }, g); // le piquage : cœur vert
    D.el("polyline", { points: pts, fill: "none", stroke: "#8a4a24", "stroke-width": 16, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: pts, fill: "none", stroke: "#e7a978", "stroke-width": 6, "stroke-linejoin": "round" }, g);
    D.el("circle", { cx: D.BRANCHE_ECO[0][0], cy: D.BRANCHE_ECO[0][1], r: 10, fill: "#8a4a24" }, g); // le té
    const reperes = {};
    for (const nom in PLACES) {
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, nom, ...PLACES[nom]);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([c, v]) => cadre.setAttribute(c, v.toFixed(1)));
      reperes[nom] = cadre;
      if (noms && NOMS[nom]) { const [nx, ny, a, taille] = NOMS[nom]; D.ORGANES[nom].court.split("|").forEach((ligne, i) => D.etiquette(g, nx, ny + i * (taille || 32) * 1.05, ligne, { "text-anchor": a, "font-size": taille || 32, "font-weight": 700, fill: D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();
