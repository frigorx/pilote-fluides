/* =====================================================================
   voyage-eau-glacee-dessin.js — ce que « L'ennemi juré », tome 1 (la
   frontière, le groupe d'eau glacée) change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-eau-glacee.html (et par
   les outils quand ils fabriquent l'édition). Recopié de
   voyage-sous-refroidisseur-dessin.js, sans toucher au fichier commun :
   organes, carte des DEUX circuits, carte d'identité décalée à gauche
   (écran partagé), et la GOUTTE D'EAU, l'autre personnage.
   CARTE (repère 1000 × 620, croix du frigoriste pour le fluide :
   condenseur en haut, compresseur à droite, évaporateur en bas, détendeur
   à gauche). Le circuit du fluide (cuivre) occupe le haut ; la boucle
   d'eau (bleue) pend sous l'évaporateur à plaques, seul endroit où les
   deux circuits se touchent. Symbole de l'échangeur (frigo_schema) :
   quatre raccords, deux en haut, deux en bas, flux en diagonale. Le
   fluide entre en BAS À GAUCHE et sort en HAUT À DROITE (il monte en
   bouillant) ; l'eau entre en HAUT À GAUCHE et sort en BAS À DROITE (elle
   descend en se refroidissant) : contre-courant. Avec ces diagonales, la
   boucle d'eau croise forcément une fois le circuit du fluide (en 200, 225,
   sur la ligne du détendeur) : un pont crème marque que les tuyaux ne se
   touchent pas.
   POSITIONS (`carte` du récit, D.circuitPoint) : fluide 0 → 14 sur
   D.CIRCUIT_PTS (0 entrée de l'évaporateur · 1 → 2 dans l'échangeur · 3
   sortie · 6 compresseur · 8 condenseur · 9 filtre déshydrateur · 11
   détendeur · 14 = 0) ; eau 200 → 213 sur D.EAU_PTS (200 entrée de l'eau
   dans l'évaporateur · 201 → 202 dans l'échangeur · 203 sortie de l'eau
   glacée · 206 → 207 le ventilo-convecteur du bout · 209 la pompe · 211 →
   212 le filtre à tamis · 213 = 200).
   LA GOUTTE : D.goutte(parent, o) → maj({ x, y, s, t, tiede (0 glacée →
   1 tiède) ou temp, etat: "eau" | "glace", humeur, regard, op }). D.heroine
   est enveloppée : quand la scène rend `etat: "eau"` ou `"glace"`, le
   personnage de la carte « où je suis » devient la goutte (chapitre où
   l'on suit l'eau). Ne jamais rendre `diag` avec un état d'eau.
   HORS CARTE : D.ORGANES.voyant (scène « les armes »), .sonde et .pressostat
   (scène « la sentinelle »). Pas de symbole du contrôleur de débit dans la
   bibliothèque : il ne paraît qu'en coupe, dans les scènes.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.EAU = "#1696aa"; D.EAU_TIEDE = "#82c8be"; D.CUIVRE_EAU = "#1f6f7a"; // l'eau en TURQUOISE : le fluide froid est bleu, on ne les confond pas
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* ---------- les organes ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_plaques", vb: [-21, -15, 40, 40], axe: [-1, 5], nom: "évaporateur à plaques", court: "évaporateur|à plaques" },
    compresseur: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur", court: "compresseur" },
    condenseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "condenseur à air", court: "condenseur" },
    filtre: { f: "filtre_deshydrateur", vb: [-25, -10, 40, 20], axe: [-4.875, 0.495], nom: "filtre déshydrateur", court: "filtre" },
    // détendeur ÉLECTRONIQUE (Franck, 06/10) : il dose le débit ET se ferme à l'arrêt, il fait aussi l'électrovanne
    detendeur: { f: "detendeur_electronique--sans-reperes", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "détendeur électronique", court: "détendeur|électronique" },
    pompe: { f: "pompe", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "pompe", court: "pompe" },
    filtreEau: { f: "filtre_eau", vb: [-35, -25, 70, 50], axe: [0, 0], nom: "filtre à tamis", court: "filtre à tamis" },
    ventilo: { f: "ventilo_convecteur", vb: [-51, -41, 118, 68], axe: [8, -7], nom: "ventilo-convecteur", court: "ventilo-convecteurs" },
    voyant: { f: "voyant_liquide", vb: [-15, -10, 50, 20], axe: [0, 0], nom: "voyant liquide", court: "voyant" },           // hors carte
    sonde: { f: "sonde_temperature", vb: [-30, -14, 60, 40], axe: [0, 0], nom: "sonde de température", court: "sonde" },      // hors carte
    pressostat: { f: "pressostat", vb: [-37, -30, 50, 60], axe: [0, 0], nom: "pressostat basse pression", court: "pressostat" } // hors carte
  };

  /* la carte d'identité : même cadre que l'édition sous-refroidisseur, décalée à gauche (x 30 → 930) */
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

  /* ---------- la carte des deux circuits ---------- */
  D.CIRCUIT_PTS = [[503, 345], [503, 330], [563, 270], [563, 255], [563, 200], [860, 200], [860, 130], [860, 60], [560, 60],
    [340, 60], [200, 60], [200, 300], [200, 380], [503, 380], [503, 345]];
  D.EAU_PTS = [[503, 255], [503, 270], [563, 330], [563, 345], [563, 430], [700, 430], [860, 430], [860, 590], [700, 590],
    [300, 590], [40, 590], [40, 225], [503, 225], [503, 255]];
  const BRANCHE = [[700, 430], [700, 590]]; // le premier ventilo-convecteur (décor : la goutte passe par celui du bout)
  const PONT = [200, 225];                  // la boucle d'eau passe au-dessus de la ligne du détendeur
  const PLACES = { evaporateur: [530, 300, 3, 0], compresseur: [860, 130, 2.4, -90], condenseur: [560, 60, 2.4, 90],
    filtre: [340, 60, 2.2, 0], detendeur: [200, 300, 2.5, 90], pompe: [300, 590, 1.4, 180], filtreEau: [380, 225, 1.3, 0],
    ventilo: [860, 510, 0.95, 0], ventilo2: [700, 510, 0.95, 0] };
  /* noms : 34 dans le repère de la carte, soit ≥ 28 px à l'écran pour la grande carte (posée à 840 en (66, 174) : × 0,84,
     tout entière dans la zone de scène y ≥ 150 et au-dessus des pastilles) ; posés hors des cadres et des tuyaux */
  const NOMS = { evaporateur: [620, 300, "start"], compresseur: [845, 254, "end"], condenseur: [560, 158, "middle"],
    filtre: [340, 124, "middle"], detendeur: [268, 314, "start"], pompe: [300, 538, "middle"],
    filtreEau: [440, 168, "end"], ventilo: [780, 410, "middle"] };
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
  function surPoly(liste, w) {
    const nb = liste.length - 1;
    w = ((w % nb) + nb) % nb;
    const i = Math.min(nb - 1, Math.floor(w)), f = w - i, a = liste[i], b = liste[i + 1];
    return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
  }
  D.eauPoint = w => surPoly(D.EAU_PTS, w); // 0 → 13 (on reboucle)
  /* D.circuitPoint remplacé : 0 → 14 sur le circuit du fluide (on reboucle) ; à partir de 200, la boucle d'eau */
  D.circuitPoint = function (w) { return w >= 200 ? D.eauPoint(w - 200) : surPoly(D.CIRCUIT_PTS, w); };
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const ligne = liste => liste.map(p => p.join(",")).join(" ");
    const cuivre = (liste, ep) => {
      D.el("polyline", { points: ligne(liste), fill: "none", stroke: "#8a4a24", "stroke-width": ep, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: ligne(liste), fill: "none", stroke: "#e7a978", "stroke-width": ep * 0.38, "stroke-linejoin": "round" }, g);
    };
    const eau = (liste, ep) => {
      D.el("polyline", { points: ligne(liste), fill: "none", stroke: D.CUIVRE_EAU, "stroke-width": ep, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: ligne(liste), fill: "none", stroke: "#8fd6d0", "stroke-width": ep * 0.38, "stroke-linejoin": "round" }, g);
    };
    cuivre(D.CIRCUIT_PTS, 16);
    D.el("line", { x1: PONT[0] - 22, y1: PONT[1], x2: PONT[0] + 22, y2: PONT[1], stroke: "#fffdf8", "stroke-width": 30 }, g); // le pont
    eau(D.EAU_PTS, 14); eau(BRANCHE, 14);
    const reperes = {};
    for (const nom in PLACES) {
      const vrai = nom === "ventilo2" ? "ventilo" : nom;
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, vrai, ...PLACES[nom]);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([c, v]) => cadre.setAttribute(c, v.toFixed(1)));
      if (nom !== "ventilo2") reperes[nom] = cadre;
      if (noms && NOMS[nom]) { const [nx, ny, a, taille] = NOMS[nom]; D.ORGANES[nom].court.split("|").forEach((txt, i) => D.etiquette(g, nx, ny + i * (taille || 34) * 1.16, txt, { "text-anchor": a, "font-size": taille || 34, "font-weight": 700, fill: nom === "pompe" || nom === "filtreEau" || nom === "ventilo" ? D.CUIVRE_EAU : D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { if (!reperes[nom]) return; reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };

  /* ---------- la goutte d'eau : l'autre personnage (muet) ----------
     Corps en forme de goutte, eau translucide qui bouge dedans, visage comme
     l'héroïne. tiede 0 → 1 : de l'eau glacée (turquoise franc, D.EAU) à
     l'eau tiède du retour (turquoise pâle, D.EAU_TIEDE). etat "glace" : blanc givré, facettes, figée. */
  const BOUCHE = (R, h) => ({
    sourire: "M " + (-R * 0.3) + " " + R * 0.42 + " Q 0 " + R * 0.7 + " " + R * 0.3 + " " + R * 0.42,
    triste: "M " + (-R * 0.26) + " " + R * 0.6 + " Q 0 " + R * 0.36 + " " + R * 0.26 + " " + R * 0.6,
    surprise: "M " + (-R * 0.09) + " " + R * 0.5 + " a " + R * 0.09 + " " + R * 0.12 + " 0 1 0 " + R * 0.18 + " 0 a " + R * 0.09 + " " + R * 0.12 + " 0 1 0 " + (-R * 0.18) + " 0",
    chaud: "M " + (-R * 0.28) + " " + R * 0.52 + " q " + R * 0.14 + " " + (-R * 0.12) + " " + R * 0.28 + " 0 t " + R * 0.28 + " 0",
    froid: "M " + (-R * 0.27) + " " + R * 0.5 + " l " + R * 0.09 + " " + (-R * 0.08) + " l " + R * 0.09 + " " + R * 0.08 + " l " + R * 0.09 + " " + (-R * 0.08) + " l " + R * 0.09 + " " + R * 0.08 + " l " + R * 0.09 + " " + (-R * 0.08) + " l " + R * 0.09 + " " + R * 0.08
  })[h];
  let nGoutte = 0; // identifiants reproductibles (même image au même instant)
  D.goutte = function (parent, o) {
    o = o || {};
    const R = o.r || 30, trait = { stroke: D.BLEU, "stroke-width": 3.5 };
    const forme = "M 0 " + (-R * 1.55) + " C " + R * 0.35 + " " + (-R * 1.0) + " " + R + " " + (-R * 0.3) + " " + R + " " + R * 0.25 +
      " A " + R + " " + R + " 0 1 1 " + (-R) + " " + R * 0.25 + " C " + (-R) + " " + (-R * 0.3) + " " + (-R * 0.35) + " " + (-R * 1.0) + " 0 " + (-R * 1.55) + " Z";
    const g = D.el("g", {}, parent);
    const halo = D.el("circle", { cy: R * 0.1, r: R * 1.75, fill: D.EAU, opacity: 0.2 }, g);
    const corps = D.el("g", {}, g);
    const cid = "vm-goutte-" + (++nGoutte);
    D.el("path", { d: forme }, D.el("clipPath", { id: cid }, corps));
    const fond = D.el("path", { d: forme, fill: "#eef7ff", "fill-opacity": 0.85 }, corps);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, corps);
    const eau = D.el("path", {}, dedans);
    const surface = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.2 }, dedans);
    const givre = D.el("g", { stroke: "#fff", "stroke-width": 2.4, "stroke-linecap": "round", fill: "none" }, dedans);
    [[-0.6, -0.2, 0.1, 0.5], [0.1, 0.5, 0.7, -0.1], [0.1, 0.5, 0.05, 1.15], [-0.3, -0.9, 0.1, 0.5], [-0.85, 0.6, 0.1, 0.5]].forEach(([a, b, c, d]) =>
      D.el("line", { x1: a * R, y1: b * R, x2: c * R, y2: d * R }, givre));
    D.el("path", Object.assign({ d: forme, fill: "none" }, trait), corps);
    D.el("ellipse", { cx: -R * 0.42, cy: -R * 0.35, rx: R * 0.14, ry: R * 0.3, fill: "#fff", opacity: 0.75, transform: "rotate(18 " + (-R * 0.42) + " " + (-R * 0.35) + ")" }, corps);
    [-1, 1].forEach(s => D.el("circle", { cx: s * R * 0.55, cy: R * 0.42, r: R * 0.13, fill: "#f08a8a", opacity: 0.5 }, corps));
    const pupilles = [-1, 1].map(s => {
      D.el("ellipse", { cx: s * R * 0.3, cy: R * 0.06, rx: R * 0.19, ry: R * 0.25, fill: "#fff", stroke: D.BLEU, "stroke-width": 2 }, corps);
      return D.el("circle", { cx: s * R * 0.3, cy: R * 0.08, r: R * 0.1, fill: D.BLEU }, corps);
    });
    const paupieres = [-1, 1].map(s => D.el("rect", { x: s * R * 0.3 - R * 0.22, y: -R * 0.22, width: R * 0.44, height: R * 0.3, fill: "none" }, corps));
    const bouche = D.el("path", { fill: "none", stroke: D.BLEU, "stroke-width": 3.2, "stroke-linecap": "round", "stroke-linejoin": "round" }, corps);
    const maj = function (p) {
      const t = p.t || 0, glace = p.etat === "glace";
      const ti = D.borne(p.tiede !== undefined ? p.tiede : p.temp !== undefined ? (p.temp - 0.1) / 0.25 : 0, 0, 1);
      const a = [22, 150, 170], b = [130, 200, 190], coul = "rgb(" + a.map((v, k) => Math.round(D.lerp(v, b[k], ti))).join(",") + ")";
      fond.setAttribute("fill", glace ? "#e8f4fb" : "#eef7ff");
      if (!glace) {
        const ys = -R * 0.55 + Math.sin(t * 2.6) * R * 0.06;
        let d = "";
        for (let k = 0; k <= 8; k++) {
          const x = -R + k * R / 4, y = ys + Math.sin(k * 0.9 + t * 4.2) * R * 0.07;
          d += (k ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
        }
        surface.setAttribute("d", d);
        eau.setAttribute("d", d + " L " + R + " " + R * 1.4 + " L " + (-R) + " " + R * 1.4 + " Z");
        eau.setAttribute("fill", coul);
      }
      eau.setAttribute("opacity", glace ? 0 : 0.88); surface.setAttribute("opacity", glace ? 0 : 0.8);
      givre.setAttribute("opacity", glace ? 0.95 : 0);
      g.setAttribute("transform", "translate(" + p.x.toFixed(1) + " " + p.y.toFixed(1) + ") scale(" + (p.s || 1) + ")");
      const [dx, dy] = glace ? [0, 0] : p.regard || [0, 0];
      pupilles.forEach((c, i) => { c.setAttribute("cx", ((i ? 1 : -1) * R * 0.3 + dx * R * 0.08).toFixed(1)); c.setAttribute("cy", (R * 0.08 + dy * R * 0.1).toFixed(1)); });
      const ferme = !glace && D.frac(t / 4.1 + (o.dephasage || 0.37)) < 0.04;
      paupieres.forEach(r => r.setAttribute("fill", ferme ? "#dfeaf6" : "none"));
      bouche.setAttribute("d", BOUCHE(R, glace ? "froid" : p.humeur || "sourire") || BOUCHE(R, "sourire"));
      halo.setAttribute("opacity", o.sansHalo ? 0 : glace ? 0.12 : 0.2);
      g.setAttribute("opacity", p.op === undefined ? 1 : p.op.toFixed(2));
    };
    maj.g = g;
    return maj;
  };

  /* D.heroine enveloppée : un état d'eau (« eau », « glace ») montre la goutte à la place de la molécule
     (carte « où je suis » du chapitre où l'on suit l'eau). Les scènes qui montrent les deux personnages
     appellent D.heroine et D.goutte séparément. */
  const heroine = D.heroine;
  D.heroine = function (parent, o) {
    const g = D.el("g", {}, parent), mol = heroine(g, o), gt = D.goutte(g, { r: (o && o.r) || 30 });
    const maj = function (p) {
      const eau = p.etat === "eau" || p.etat === "glace";
      mol(eau ? Object.assign({}, p, { etat: "liquide", op: 0 }) : p);
      gt(eau ? p : Object.assign({}, p, { op: 0 }));
    };
    maj.g = g;
    return maj;
  };
})();
