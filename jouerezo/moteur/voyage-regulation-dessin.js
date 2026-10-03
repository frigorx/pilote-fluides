/* =====================================================================
   voyage-regulation-dessin.js — ce que l'édition « la régulation d'une
   centrale » change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-regulation.html (et par
   les outils). Remplace, sans toucher aux fichiers communs :
   1. les organes, la carte du circuit (trois meubles en parallèle, QUATRE
      compresseurs en parallèle entre deux collecteurs) et la carte
      d'identité décalée à gauche (« les compresseurs » : quatre symboles) ;
   2. D.diagramme : à la place du diagramme enthalpique, L'ÉCRAN DU
      RÉGULATEUR (choix de Franck, 03/10 : « centrale + courbes ») — la
      pression dans le temps, la zone neutre, les compresseurs ou les
      ventilateurs en marche, l'année de haute pression fixe / flottante.
      Données : donnees/voyage-regulation-diagramme.js (fabriquées par
      voyage-regulation/calcul-courbes.js). PIÈGE : moteur/voyage-
      diagramme.js, chargé APRÈS ce fichier, réécrit D.diagramme ; on le
      protège par une propriété dont l'écriture est ignorée.
   CARTE (repère 1000 × 620) : comme l'édition centrale, compresseurs à
   y 248, 340, 432, 524 ; l'héroïne passe par le n° 2 (y 340).
   D.CIRCUIT_PTS : 0 coin bas gauche · 1 pied du poste · 1,25 détendeur ·
   1,65 évaporateur · 1,82 sortie du meuble · 3 collecteur d'aspiration ·
   3,5 compresseur n° 2 · 4 collecteur de refoulement · 6 séparateur ·
   7 condenseur · 8 bouteille · 10 = 0.
   Repères pour les scènes : D.POSTES, D.COMPRESSEURS, D.COLLECTEURS ;
   D.regul(w) = l'état du régulateur au temps w (même source que les
   courbes : les scènes allument les bons compresseurs et ventilateurs).
   COURBES : maj(w0, w, vus) — w sur la ligne des épisodes (récit,
   `diag`) ; calques : consigne, zone, tempo, marches, permutation,
   delestage, consigneHP, exterieur, hpFixe, hpFlot, gain, plancher.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.HUILE = "#c98a1b";
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* ---------- les organes ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur du meuble", court: "évaporateur" },
    compresseur: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseurs en parallèle", court: "compresseurs", pluriel: true },
    separateurHuile: { f: "separateur_huile", vb: [-14, -18, 30, 40], axe: [0, -10], nom: "séparateur d'huile", court: "séparateur d'huile" },
    condenseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "condenseur à air", court: "condenseur" },
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille", court: "bouteille" },
    detendeur: { f: "detendeur_thermo_ext", vb: [-19, -28, 40, 40], axe: [0, 0], nom: "détendeur", court: "détendeur", lettres: [0, -12, 4.6, "TC"] },
    /* hors carte : pour les scènes */
    electrovanne: { f: "electrovanne_frigo", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "électrovanne", court: "électrovanne" },
    clapet: { f: "clapet_anti_retour", vb: [-19, -10, 40, 20], axe: [0, 0], nom: "clapet anti-retour", court: "clapet" },
    filtre: { f: "filtre_deshydrateur", vb: [-25, -10, 40, 20], axe: [-4.875, 0.495], nom: "filtre déshydrateur", court: "filtre" },
    voyant: { f: "voyant_liquide", vb: [-15, -10, 50, 20], axe: [9.8, -0.054], nom: "voyant", court: "voyant" },
    capteur: { f: "capteur_pression", vb: [-12, -20, 14, 40], axe: [0, 18.7], nom: "capteur de pression", court: "capteur" },
    sonde: { f: "sonde_temperature", vb: [-30, -14, 60, 40], axe: [0, 0], nom: "sonde de température", court: "sonde" },
    detendeurElec: { f: "detendeur_electronique", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "détendeur électronique", court: "détendeur électronique" }
  };

  /* la carte d'identité : cadre décalé à gauche (x 30 → 930) ; « les compresseurs » : quatre symboles, « Leur rôle » */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 30, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 66, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    if (o.pluriel) [0, 1, 2, 3].forEach(i => D.image(g, s.organe, 172, 234 + i * 72, 128, 68));
    else D.image(g, s.organe, 86, 246, 340, 260);
    D.texte(g, 256, 566, o.pluriel ? "leurs symboles" : "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 13 ? D.couper(nom, 15) : [nom], deux = lignes.length > 1;
    D.lignes(g, 482, 296, lignes, { "font-size": deux ? 50 : 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, 56);
    D.lignes(g, 482, deux ? 424 : 372, D.couper((o.pluriel ? "Leur rôle : " : "Son rôle : ") + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 48);
    D.texte(g, 482, 616, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* ---------- la carte du circuit ---------- */
  D.POSTES = [250, 450, 650];
  D.COMPRESSEURS = [248, 340, 432, 524];
  D.COLLECTEURS = { asp: 740, ref: 920 };
  D.CIRCUIT_PTS = [[95, 595], [450, 595], [450, 340], [740, 340], [920, 340], [920, 85], [830, 85], [560, 85], [300, 85], [95, 85], [95, 595]];
  /* les tubes que l'héroïne ne prend pas : les deux autres postes, les trois autres compresseurs, les collecteurs */
  const AUTRES = [
    [[450, 595], [650, 595], [650, 340], [450, 340]], [[250, 595], [250, 340], [450, 340]],
    [[740, 340], [740, 248], [920, 248], [920, 340]], [[740, 340], [740, 524], [920, 524], [920, 340]], [[740, 432], [920, 432]]
  ];
  const PLACES = { evaporateur: [450, 430, 1.5, 0], detendeur: [450, 530, 1.5, -90], compresseur: [830, 340, 1.6, 0],
    separateurHuile: [830, 85, 2.3, 0, true], condenseur: [560, 85, 2.4, 90], bouteille: [300, 85, 1.65, 0, true] };
  /* le décor sans repère : les deux autres postes, les trois autres compresseurs, filtre et voyant sur la ligne liquide */
  const DECOR = [["evaporateur", 250, 430, 1.5, 0], ["detendeur", 250, 530, 1.5, -90], ["evaporateur", 650, 430, 1.5, 0], ["detendeur", 650, 530, 1.5, -90],
    ["compresseur", 830, 248, 1.6, 0], ["compresseur", 830, 432, 1.6, 0], ["compresseur", 830, 524, 1.6, 0], ["filtre", 95, 260, 1.9, 90], ["voyant", 95, 420, 1.7, 90]];
  const NOMS = { evaporateur: [450, 650, "middle", 30, "les meubles"], compresseur: [722, 250, "end"], separateurHuile: [830, 34, "middle", 26],
    condenseur: [560, 168, "middle"], bouteille: [300, 210, "middle"], detendeur: [478, 540, "start", 26] };
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
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const tube = (pts, large) => {
      const p = pts.map(q => q.join(",")).join(" ");
      D.el("polyline", { points: p, fill: "none", stroke: "#8a4a24", "stroke-width": large ? 16 : 12, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: p, fill: "none", stroke: "#e7a978", "stroke-width": large ? 6 : 4, "stroke-linejoin": "round" }, g);
    };
    AUTRES.forEach(a => tube(a, false));
    tube(D.CIRCUIT_PTS, true);
    const encadre = (nom, p, trait) => { // le cadre blanc d'abord (sous le symbole), dimensionné une fois le symbole posé
      const c = D.el("rect", { rx: 14, fill: "#fff", stroke: trait, "stroke-width": 3 }, g), [x0, y0, w, h] = poser(g, nom, ...p);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([a, v]) => c.setAttribute(a, v.toFixed(1)));
      return c;
    };
    DECOR.forEach(([nom, ...p]) => encadre(nom, p, "rgba(27,58,99,.18)"));
    const reperes = {};
    for (const nom in PLACES) {
      reperes[nom] = encadre(nom, PLACES[nom], "rgba(27,58,99,.3)");
      if (noms) { const [nx, ny, a, taille, texte] = NOMS[nom]; (texte || D.ORGANES[nom].court).split("|").forEach((ligne, i) => D.etiquette(g, nx, ny + i * (taille || 30) * 1.05, ligne, { "text-anchor": a, "font-size": taille || 30, "font-weight": 700, fill: D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };

  /* ---------- l'état du régulateur au temps w (pour les scènes) ---------- */
  const episode = (data, w, w0) => { // l'épisode qui contient w0 (s'il est donné), sinon w
    const v = w0 !== null && w0 !== undefined ? w0 : w, E = data.episodes;
    return E.find(e => v >= e.w[0] && v < e.w[1]) || E.find(e => v === e.w[1]) || null;
  };
  const echantillon = (e, w) => e.ech[Math.max(0, Math.min(e.ech.length - 1, Math.round((w - e.w[0]) * 10)))];
  /* { id, valeur, marche: [4 booléens] (compresseurs ou ventilateurs), tempo 0-1 } ; année : { air, fixe, flot } */
  D.regul = function (w, w0) {
    const data = window.VOYAGE_DIAGRAMME, e = data && episode(data, w, w0);
    if (!e) return null;
    const x = echantillon(e, Math.max(e.w[0], Math.min(e.w[1], w)));
    if (e.id === "annee") return { id: e.id, air: x[0], fixe: x[1], flot: x[2] };
    return { id: e.id, valeur: x[0], marche: [0, 1, 2, 3].map(i => !!(x[1] & (1 << i))), tempo: x[2], rangs: e.rangs };
  };

  /* ---------- le temps des courbes dans une scène : w de a à b, du début de la phrase k0 à la fin de k1 ---------- */
  D.temps = (c, t, a, b, k0, k1) => D.lerp(a, b, D.borne((t - c.T[k0]) / Math.max(0.01, c.E[k1] - c.T[k0]), 0, 1));

  /* ---------- trois vues communes aux scènes (même dessin partout) ----------
     Chacune : (parent, x, y, k) → { maj(p), ou: { … } (points en coordonnées de la scène) }. Repère local en pixels × k. */
  const metal = (p, x, y, l, h, nom, at) => D.el("rect", Object.assign({ x: x, y: y, width: l, height: h, rx: 6, fill: "url(#vm-" + nom + ")" }, at || {}), p);
  const symbole = (p, nom, x, y, s, rot) => { // un symbole de D.ORGANES posé par son axe
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe;
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") rotate(" + (rot || 0) + ") scale(" + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, p);
    D.image(g, nom, vx, vy, vl, vh); return g;
  };
  /* LA CENTRALE DE FACE (repère 900 × 470) : collecteur de refoulement en haut (y 60), quatre compresseurs C1…C4
     (centres x 190, 370, 550, 730), collecteur d'aspiration isolé en bas (y 392-456) où la vapeur se serre ou s'écarte,
     capteur BP sur l'aspiration et capteur HP sur le refoulement (x 862). p : { t, marche: [4], defaut: i, densite 0-1, temp } */
  D.vueCentrale = function (parent, x, y, k) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent), CX = [190, 370, 550, 730];
    metal(g, 100, 60, 780, 24, "cuivre");
    const tubeAsp = D.tube(g, 30, 392, 850, 64, "noir", false, "#eef5fc");
    metal(g, 60, 345, 780, 16, "acier"); // le châssis
    const mols = [], A = D.alea(7);
    for (let i = 0; i < 40; i++) mols.push({ m: D.mol(g), x: A(), y: 410 + A() * 28, v: 0.6 + A() * 0.6 });
    const comp = CX.map((cx, i) => {
      D.el("rect", { x: cx - 59, y: 330, width: 18, height: 66, fill: "url(#vm-noir-h)" }, g); // aspiration (isolée)
      metal(g, cx + 33, 84, 14, 116, "cuivre-h");                                       // refoulement
      symbole(g, "clapet", cx + 40, 132, 1.3, -90);
      const corps = D.el("g", {}, g);
      metal(corps, cx - 78, 222, 90, 112, "acier", { rx: 26 });                         // le moteur
      D.el("rect", { x: cx - 78, y: 222, width: 90, height: 112, rx: 26, fill: "rgba(70,110,80,.32)" }, corps);
      metal(corps, cx + 6, 240, 72, 94, "acier", { rx: 10 });                           // le carter
      metal(corps, cx - 2, 196, 72, 46, "acier", { rx: 8 });                            // la culasse, ailettes
      for (let a = 0; a < 5; a++) D.el("line", { x1: cx + 4 + a * 14, y1: 200, x2: cx + 4 + a * 14, y2: 238, stroke: "#4e5a66", "stroke-width": 2.5 }, corps);
      D.el("rect", { x: cx - 64, y: 252, width: 54, height: 36, rx: 8, fill: D.BLEU }, corps);
      D.texte(corps, cx - 37, 280, "C" + (i + 1), { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#fff", "font-family": "Calibri, Arial, sans-serif" });
      const voyant = D.el("circle", { cx: cx + 42, cy: 288, r: 12, stroke: "#10233c", "stroke-width": 2.5 }, corps);
      const tourne = D.el("path", { d: "M 14 0 A 14 14 0 1 1 0 -14 m -6 -5 l 6 5 l -6 5", fill: "none", stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round" }, corps);
      return { corps, voyant, tourne, cx };
    });
    symbole(g, "capteur", 862, 392, 2.2); symbole(g, "capteur", 862, 60, 2.2);
    const ecran = (lx, ly) => [x + lx * k, y + ly * k];
    return {
      ou: { compresseur: i => ecran(CX[i], 280), capteurBP: ecran(862, 330), capteurHP: ecran(862, 0), aspiration: ecran(455, 424), refoulement: ecran(490, 72) },
      maj: function (p) {
        const t = p.t || 0, n = Math.round(D.lerp(6, 40, D.borne(p.densite === undefined ? 0.4 : p.densite, 0, 1)));
        mols.forEach((o, i) => {
          const u = (o.x + t * 0.05 * o.v) % 1;
          o.m(42 + u * 820, o.y + Math.sin(t * 3 + i) * 3, p.temp === undefined ? 0.15 : p.temp, true, i < n ? 1 : 0);
        });
        comp.forEach((c, i) => {
          const on = p.marche && p.marche[i], def = p.defaut === i;
          c.corps.setAttribute("transform", on ? "translate(" + (Math.sin(t * 70 + i) * 1.4).toFixed(2) + " 0)" : "");
          c.voyant.setAttribute("fill", def ? "#e74c3c" : on ? "#2ecc71" : "#9aa7b5");
          c.tourne.setAttribute("transform", "translate(" + (c.cx - 33) + " 312) rotate(" + (t * 300 % 360).toFixed(1) + ")");
          c.tourne.setAttribute("opacity", on ? 1 : 0);
        });
      }
    };
  };
  /* LE TOIT (repère 900 × 380) : le condenseur de face, quatre ventilateurs V1…V4 (centres x 230, 380, 530, 680, y 222),
     l'air chaud qui monte quand un ventilateur tourne, la sonde d'air extérieur et son thermomètre (x 840), la neige
     (air < 0,3) ou le soleil (air > 0,65). p : { t, vent: [4] (0-1 = vitesse), air: 0-1 } */
  D.vueToit = function (parent, x, y, k) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent), CX = [230, 380, 530, 680];
    const ciel = D.el("g", {}, g), soleil = D.el("g", {}, ciel);
    D.el("circle", { cx: 90, cy: 60, r: 30, fill: "#f6c445", stroke: "#e0a31f", "stroke-width": 3 }, soleil);
    for (let a = 0; a < 8; a++) D.el("line", { x1: 90 + 40 * Math.cos(a * 0.785), y1: 60 + 40 * Math.sin(a * 0.785), x2: 90 + 54 * Math.cos(a * 0.785), y2: 60 + 54 * Math.sin(a * 0.785), stroke: "#e0a31f", "stroke-width": 5, "stroke-linecap": "round" }, soleil);
    const flocons = [], A = D.alea(11);
    for (let i = 0; i < 26; i++) flocons.push({ e: D.texte(ciel, 0, 0, "❄", { "font-size": 22, fill: "#9fbfe0" }), x: A() * 900, v: 0.5 + A() });
    metal(g, 0, 340, 900, 26, "acier");                                                  // le toit
    [150, 750].forEach(px => metal(g, px - 8, 300, 16, 42, "acier"));                    // les pieds
    metal(g, 130, 140, 640, 164, "acier", { rx: 12 });                                   // la batterie
    for (let lx = 146; lx < 760; lx += 12) D.el("line", { x1: lx, y1: 150, x2: lx, y2: 294, stroke: "rgba(78,90,102,.35)", "stroke-width": 2 }, g);
    metal(g, 30, 150, 104, 18, "cuivre");  metal(g, 766, 276, 70, 18, "cuivre");        // gaz chaud qui entre, liquide qui sort
    const vents = CX.map(cx => ({ rot: D.ventilateur(g, cx, 222, 62), air: [0, 1, 2].map(() => D.chevron(g)), cx }));
    metal(g, 836, 200, 10, 140, "acier");
    D.el("rect", { x: 828, y: 70, width: 26, height: 120, rx: 13, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    D.el("circle", { cx: 841, cy: 196, r: 18, fill: "#d64541", stroke: D.BLEU, "stroke-width": 3 }, g);
    const colonne = D.el("rect", { x: 835, width: 12, rx: 6, fill: "#d64541" }, g);
    symbole(g, "sonde", 841, 252, 1.1, 90);
    const ecran = (lx, ly) => [x + lx * k, y + ly * k];
    return {
      ou: { ventilateur: i => ecran(CX[i], 222), sonde: ecran(841, 250), thermometre: ecran(841, 120), condenseur: ecran(450, 222), entree: ecran(60, 159), sortie: ecran(820, 285) },
      maj: function (p) {
        const t = p.t || 0, air = p.air === undefined ? 0.5 : p.air;
        vents.forEach((v, i) => {
          const s = p.vent ? Number(p.vent[i]) : 0;
          v.rot(t * 600 * s + i * 40);
          v.air.forEach((ch, j) => { const f = (t * 0.9 + j / 3) % 1; ch(v.cx, 150 - f * 120, 180, "#e2662c", s * D.fenetre(f, 0, 1, 0.25)); });
        });
        const h = D.lerp(14, 104, air); colonne.setAttribute("y", 190 - h); colonne.setAttribute("height", h + 8);
        soleil.setAttribute("opacity", D.borne((air - 0.6) / 0.15, 0, 1).toFixed(2));
        const neige = D.borne((0.35 - air) / 0.15, 0, 1);
        flocons.forEach((f, i) => { const yy = ((t * 30 * f.v + i * 37) % 130); f.e.setAttribute("x", (f.x + Math.sin(t + i) * 8).toFixed(1)); f.e.setAttribute("y", yy.toFixed(1)); f.e.setAttribute("opacity", f.x > 760 && yy > 40 ? 0 : neige.toFixed(2)); });
      }
    };
  };
  /* L'ARMOIRE (repère 300 × 420) : porte ouverte, l'écran du régulateur (BP, HP), les contacteurs KM1…KM4 et leur voyant.
     p : { t, marche: [4], alarme: bool } */
  D.armoire = function (parent, x, y, k) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent), F = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };
    metal(g, 0, 0, 300, 420, "acier", { rx: 10 });
    D.el("rect", { x: 14, y: 14, width: 272, height: 392, rx: 6, fill: "#e9edf1", stroke: "#56636f", "stroke-width": 2 }, g);
    D.el("rect", { x: 34, y: 30, width: 232, height: 120, rx: 8, fill: "#10233c" }, g);
    D.texte(g, 150, 62, "régulateur", Object.assign({ "text-anchor": "middle", "font-size": 22, fill: "#9fe3b8" }, F));
    D.texte(g, 60, 100, "BP", Object.assign({ "font-size": 24, fill: "#9fbfe0" }, F)); D.texte(g, 60, 134, "HP", Object.assign({ "font-size": 24, fill: "#f3a37a" }, F));
    const alarme = D.el("circle", { cx: 236, cy: 118, r: 12, fill: "#e74c3c" }, g);
    const km = [0, 1, 2, 3].map(i => {
      const yy = 190 + i * 52;
      D.el("rect", { x: 40, y: yy - 20, width: 150, height: 40, rx: 6, fill: "#fff", stroke: "#56636f", "stroke-width": 2 }, g);
      D.texte(g, 115, yy + 8, "KM" + (i + 1), Object.assign({ "text-anchor": "middle", "font-size": 24, fill: D.BLEU }, F));
      return D.el("circle", { cx: 230, cy: yy, r: 13, stroke: "#10233c", "stroke-width": 2.5 }, g);
    });
    const ecran = (lx, ly) => [x + lx * k, y + ly * k];
    return {
      ou: { ecran: ecran(150, 90), contacteur: i => ecran(40, 190 + i * 52), bas: ecran(150, 420) },
      maj: function (p) {
        km.forEach((v, i) => v.setAttribute("fill", p.marche && p.marche[i] ? "#2ecc71" : "#9aa7b5"));
        alarme.setAttribute("opacity", p.alarme && Math.sin((p.t || 0) * 8) > 0 ? 1 : 0);
      }
    };
  };

  /* ---------- l'écran du régulateur (remplace le diagramme enthalpique) ---------- */
  const POLICE = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };
  const COUL = { trace: D.BLEU, consigne: "#2f6fb8", zone: "rgba(47,111,184,.12)", delestage: "#c0392b", air: "#1e7e8c",
    fixe: "#637285", flot: D.ORANGE, gain: "rgba(201,69,26,.16)", plancher: "#7a4fa0", rang: "#2f6fb8", heures: "#e8914a" };

  function courbes(parent, data) {
    const Z = window.VOYAGE_DIAGRAMME_ZONE || { x: 990, y: 296, l: 596, h: 460 }, g = D.el("g", {}, parent);
    const t = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 21, fill: "#10233c" }, POLICE, at || {}));
    D.el("rect", { x: Z.x, y: Z.y, width: Z.l, height: Z.h, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    t(g, Z.x + Z.l / 2, Z.y + 32, "L'écran du régulateur", { "text-anchor": "middle", "font-size": 26, fill: D.BLEU });
    const x0 = Z.x + 50, x1 = Z.x + Z.l - 112, yHaut = Z.y + 80;
    const couches = data.episodes.map(e => {
      const c = D.el("g", { opacity: 0 }, g), rangs = !!e.rangs, y1 = rangs ? Z.y + 296 : Z.y + 392;
      const X = w => x0 + (w - e.w[0]) / (e.w[1] - e.w[0]) * (x1 - x0), Y = v => y1 - (v - e.y[0]) / (e.y[1] - e.y[0]) * (y1 - yHaut);
      t(c, Z.x + Z.l / 2, Z.y + 60, e.titre, { "text-anchor": "middle", fill: "#637285", "font-weight": 600 });
      const cal = {}, calque = id => (cal[id] = cal[id] || D.el("g", { opacity: 0 }, c));
      const ligne = (id, v, coul, nom, pointille) => {
        const q = calque(id);
        D.el("line", { x1: x0, y1: Y(v), x2: x1, y2: Y(v), stroke: coul, "stroke-width": 2.5, "stroke-dasharray": pointille || "8 6" }, q);
        if (nom) t(q, x1 + 8, Y(v) + 7, nom, { fill: coul, "font-size": 20 });
      };
      /* les repères, sous la trace */
      if (e.axe === "basse pression") {
        D.el("rect", { x: x0, y: Y(1), width: x1 - x0, height: Y(-1) - Y(1), fill: COUL.zone }, calque("zone"));
        ligne("zone", 1, COUL.consigne, "seuil haut", "3 5"); ligne("zone", -1, COUL.consigne, "seuil bas", "3 5");
        ligne("consigne", 0, COUL.consigne, "consigne"); ligne("delestage", -2.4, COUL.delestage, "délestage");
      }
      if (e.axe === "haute pression") {
        D.el("rect", { x: x0, y: Y(e.consigne + e.zone), width: x1 - x0, height: Y(e.consigne - e.zone) - Y(e.consigne + e.zone), fill: "rgba(201,69,26,.10)" }, calque("consigneHP"));
        ligne("consigneHP", e.consigne, D.ORANGE, "consigne");
      }
      if (e.id === "annee") {
        ligne("plancher", e.plancher, COUL.plancher, null);
        t(calque("plancher"), x0 + 10, Y(e.plancher) + 26, "plancher", { fill: COUL.plancher, "font-size": 20 });
        cal.gainZone = D.el("path", { fill: COUL.gain }, calque("gain"));
        t(calque("gain"), X(60.5), Y(35), "énergie", { fill: D.ORANGE, "font-size": 20 }); t(calque("gain"), X(60.5), Y(31), "gagnée", { fill: D.ORANGE, "font-size": 20 }); // dans le creux de l'hiver, sous la HP fixe, au-dessus du plancher
      }
      /* le cadre, les axes, les étiquettes du temps */
      D.el("rect", { x: x0, y: yHaut, width: x1 - x0, height: y1 - yHaut, fill: "none", stroke: "#637285", "stroke-width": 2 }, c);
      D.el("path", { d: "M " + x0 + " " + (y1 + 4) + " V " + (yHaut - 8) + " m -7 12 l 7 -12 l 7 12", fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, c);
      const axe = t(c, 0, 0, e.axe, { "text-anchor": "middle", "font-size": 20 });
      axe.setAttribute("transform", "translate(" + (x0 - 14) + " " + ((yHaut + y1) / 2) + ") rotate(-90)");
      const yx = rangs ? Z.y + 446 : Z.y + 422;
      if (e.x.length) e.x.forEach(([w, s]) => t(c, X(w), yx, s, { "text-anchor": "middle", fill: "#637285", "font-size": 20 }));
      else t(c, (x0 + x1) / 2, yx, "le temps →", { "text-anchor": "middle", fill: "#637285", "font-size": 20 });
      /* sous la courbe : l'escalier « en marche » (0 à 4) ; avec le calque permutation, les rangées C1…C4 et les heures */
      const rang = [];
      let marches = null, escalier = null;
      if (rangs) {
        const lettre = e.rangs === "compresseurs" ? "C" : "V", bas = Z.y + 410, pas = 24;
        marches = D.el("g", {}, c);
        D.el("rect", { x: x0, y: bas - 4 * pas - 4, width: x1 - x0, height: 4 * pas + 4, fill: "rgba(27,58,99,.05)" }, marches);
        for (let n = 1; n <= 4; n++) {
          D.el("line", { x1: x0, y1: bas - n * pas, x2: x1, y2: bas - n * pas, stroke: "rgba(27,58,99,.15)", "stroke-width": 1.5 }, marches);
          t(marches, x0 - 8, bas - n * pas + 8, String(n), { "text-anchor": "end", "font-size": 20, fill: D.BLEU });
        }
        escalier = { bas: bas, pas: pas, aire: D.el("path", { fill: "rgba(47,111,184,.35)", stroke: COUL.rang, "stroke-width": 2.5, "stroke-linejoin": "round" }, marches) };
        t(marches, x0 + 8, bas - 4 * pas + 16, e.rangs + " en marche", { fill: D.BLEU, "font-size": 20 });
        const gantt = D.el("g", {}, calque("permutation"));
        D.el("rect", { x: x0 - 40, y: bas - 4 * pas - 8, width: x1 - x0 + 40, height: 4 * pas + 10, fill: "#fffdf8" }, gantt);
        for (let i = 0; i < 4; i++) {
          const y = Z.y + 316 + i * 26;
          D.el("rect", { x: x0, y: y - 9, width: x1 - x0, height: 18, rx: 4, fill: "rgba(27,58,99,.06)" }, gantt);
          t(gantt, x0 - 8, y + 7, lettre + (i + 1), { "text-anchor": "end", "font-size": 20, fill: D.BLEU });
          rang.push({ y: y, barre: D.el("path", { fill: COUL.rang }, gantt) });
        }
        if (e.heures) { // la permutation : les heures de marche, à droite des rangées
          t(gantt, x1 + 8, Z.y + 302, "heures", { fill: "#a8521a", "font-size": 20 }); // texte plus foncé que les barres : contraste
          rang.forEach(r => { r.heures = D.el("rect", { x: x1 + 10, y: r.y - 8, height: 16, rx: 3, fill: COUL.heures }, gantt); });
        }
      }
      /* la trace, le point, l'horloge de temporisation */
      const traces = e.id === "annee"
        ? { air: D.el("polyline", { fill: "none", stroke: COUL.air, "stroke-width": 3.5, "stroke-linejoin": "round" }, calque("exterieur")),
            fixe: D.el("polyline", { fill: "none", stroke: COUL.fixe, "stroke-width": 4, "stroke-linejoin": "round" }, calque("hpFixe")),
            flot: D.el("polyline", { fill: "none", stroke: COUL.flot, "stroke-width": 5, "stroke-linejoin": "round" }, calque("hpFlot")) }
        : { avant: D.el("polyline", { fill: "none", stroke: "#9aa7b5", "stroke-width": 3, "stroke-linejoin": "round" }, c),
            v: D.el("polyline", { fill: "none", stroke: COUL.trace, "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round" }, c) };
      if (e.id === "annee") {
        t(calque("exterieur"), X(64.6), Y(5.5), "air extérieur", { fill: COUL.air, "font-size": 20 });
        t(calque("hpFixe"), X(60.4), Y(42.6), "HP fixe", { fill: COUL.fixe, "font-size": 20 });
        t(calque("hpFlot"), X(79.6), Y(19.5), "HP flottante", { fill: COUL.flot, "font-size": 20, "text-anchor": "end" });
      }
      const point = D.el("circle", { r: 9, fill: D.ORANGE, stroke: "#fff", "stroke-width": 3 }, c);
      const horloge = D.el("g", { opacity: 0 }, calque("tempo"));
      D.el("circle", { r: 15, fill: "#fff", stroke: D.BLEU, "stroke-width": 2.5 }, horloge);
      const aiguille = D.el("path", { fill: "rgba(201,69,26,.75)" }, horloge);
      return { e, c, cal, X, Y, rang, escalier, marches, traces, point, horloge, aiguille };
    });

    function majCouche(k, w0, w, vus) {
      const { e, cal, X, Y, rang, escalier, marches, traces, point, horloge, aiguille } = k;
      for (const id in cal) if (cal[id].tagName === "g") cal[id].setAttribute("opacity", vus && vus[id] ? 1 : 0);
      const debut = Math.max(e.w[0], w0 !== null && w0 !== undefined ? w0 : e.w[0]), fin = Math.max(debut, Math.min(e.w[1], w));
      const i0 = Math.round((debut - e.w[0]) * 10), i1 = Math.round((fin - e.w[0]) * 10), seg = e.ech.slice(i0, i1 + 1);
      const pts = (j, n) => seg.map((x, m) => X(e.w[0] + (i0 + m) / 10).toFixed(1) + "," + Y(x[j]).toFixed(1)).join(" ");
      const x = seg[seg.length - 1];
      if (e.id === "annee") { // l'année entière est tracée ; un curseur parcourt les saisons
        if (!k.trace) {
          const tout = j => e.ech.map((x, m) => X(e.w[0] + m / 10).toFixed(1) + "," + Y(x[j]).toFixed(1));
          traces.air.setAttribute("points", tout(0).join(" ")); traces.fixe.setAttribute("points", tout(1).join(" ")); traces.flot.setAttribute("points", tout(2).join(" "));
          cal.gainZone.setAttribute("d", "M " + tout(1).join(" L ") + " L " + tout(2).reverse().join(" L ") + " Z");
          k.curseur = D.el("line", { y1: Y(e.y[1]), y2: Y(e.y[0]), stroke: "rgba(27,58,99,.35)", "stroke-width": 2, "stroke-dasharray": "4 4" }, k.c);
          k.c.appendChild(point); k.trace = true;
        }
        const j = vus && vus.hpFlot ? 2 : 1;
        k.curseur.setAttribute("x1", X(fin)); k.curseur.setAttribute("x2", X(fin));
        point.setAttribute("cx", X(fin)); point.setAttribute("cy", Y(x[j]));
        point.setAttribute("opacity", vus && (vus.hpFlot || vus.hpFixe) ? 1 : 0);
        return;
      }
      traces.v.setAttribute("points", pts(0));
      traces.avant.setAttribute("points", e.ech.slice(0, i0 + 1).map((x, m) => X(e.w[0] + m / 10).toFixed(1) + "," + Y(x[0]).toFixed(1)).join(" "));
      point.setAttribute("cx", X(fin)); point.setAttribute("cy", Y(x[0])); point.setAttribute("opacity", 1);
      /* l'horloge : seulement pendant une temporisation */
      if (x[2] > 0 && x[2] < 1) {
        horloge.setAttribute("opacity", 1);
        horloge.setAttribute("transform", "translate(" + (X(fin) + 30).toFixed(1) + " " + (Y(x[0]) - 30).toFixed(1) + ")");
        const a = x[2] * 2 * Math.PI, gr = a > Math.PI ? 1 : 0;
        aiguille.setAttribute("d", "M 0 0 L 0 -12 A 12 12 0 " + gr + " 1 " + (12 * Math.sin(a)).toFixed(2) + " " + (-12 * Math.cos(a)).toFixed(2) + " Z");
      } else horloge.setAttribute("opacity", 0);
      if (!escalier) return;
      /* sous la courbe : tout ce qui s'est passé depuis le début de l'épisode */
      const tout = e.ech.slice(0, i1 + 1), xm = m => X(e.w[0] + m / 10), nb = s => [0, 1, 2, 3].filter(n => s[1] & (1 << n)).length;
      let d = "M " + X(e.w[0]).toFixed(1) + " " + escalier.bas;
      tout.forEach((s, m) => { const y = escalier.bas - nb(s) * escalier.pas; d += " V " + y + " H " + xm(m + (m < tout.length - 1 ? 1 : 0)).toFixed(1); });
      escalier.aire.setAttribute("d", d + " V " + escalier.bas + " Z");
      marches.setAttribute("opacity", vus && vus.permutation ? 0 : 1);
      rang.forEach((r, n) => { // les rangées : une barre par période de marche
        let dd = "", depuis = null;
        tout.forEach((s, m) => {
          const on = s[1] & (1 << n), xx = xm(m);
          if (on && depuis === null) depuis = xx;
          if ((!on || m === tout.length - 1) && depuis !== null) { dd += "M " + depuis.toFixed(1) + " " + (r.y - 7) + " H " + xx.toFixed(1) + " V " + (r.y + 7) + " H " + depuis.toFixed(1) + " Z "; depuis = null; }
        });
        r.barre.setAttribute("d", dd);
        if (r.heures) { // heures de marche : départ + temps passé en marche jusqu'ici (échelle du panneau)
          const h = e.heures.debut[n] + tout.filter(s => s[1] & (1 << n)).length * 0.1 * 16 / 30;
          r.heures.setAttribute("width", Math.max(2, (h - 8) * 2.6).toFixed(1));
        }
      });
    }

    return {
      g: g,
      maj: function (w0, w, vus) {
        const e = w === null || w === undefined ? null : episode(data, w, w0);
        couches.forEach(k => {
          const vu = k.e === e;
          k.c.setAttribute("opacity", vu ? 1 : 0);
          if (vu) majCouche(k, w0, w, vus);
        });
      }
    };
  }
  /* voyage-diagramme.js (chargé après) réécrit D.diagramme : l'écriture est ignorée, nos courbes restent */
  Object.defineProperty(D, "diagramme", { configurable: true, enumerable: true, get: () => courbes, set: () => {} });
})();
