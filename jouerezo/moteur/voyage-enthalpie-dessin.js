/* =====================================================================
   voyage-enthalpie-dessin.js — ce que l'édition « le diagramme enthalpique » change
   au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé par voyage-enthalpie.html APRÈS voyage-diagramme.js (il en redéfinit
   D.diagramme). Sans toucher aux fichiers communs :
   1. la CARTE du circuit reste celle du circuit de base (D.CIRCUIT_PTS, croix du
      frigoriste : condenseur en haut, évaporateur en bas, compresseur à droite,
      détendeur à gauche) ; seule change la carte d'identité, DÉCALÉE À GAUCHE
      (écran partagé : x > 970 est pris par la carte « où je suis » et le diagramme) ;
   2. le DIAGRAMME CHIFFRÉ : D.diagramme refait ici, car le moteur commun ne sait pas
      graduer. Lit window.VOYAGE_DIAGRAMME_GRADUATIONS (donnees/voyage-enthalpie-diagramme.js) :
      graduations de p (bar abs, axe log) et de h (kJ/kg), titres d'axes, ronds numérotés
      des points 1 à 4. Les étiquettes de calques sont replacées ici à la main (POSE) pour
      qu'aucun texte ne touche un tracé. Même contrat que le diagramme commun
      (maj(w0, w, vus, o)).
   ===================================================================== */
(function () {
  "use strict";
  const V = window.VOYAGE_DESSIN, D = V;
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* la carte d'identité : même cadre que l'édition vis, décalée à gauche (x 30 → 930) */
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

  /* ---------- le diagramme chiffré ---------- */
  const POLICE = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };
  const ENCRE = "#10233c";
  /* étiquettes de calques replacées à la main : [h, p, ancre, taille, meneur?] ; meneur = [h1, p1, h2, p2], trait qui rejoint le tracé */
  const POSE = {
    surchauffe: [509, 7.45, "end", 20],
    desurchauffe: [592, 50, "end", 16, [538.5, 30.4, 538.5, 46.5]],
    sousRefroidissement: [262, 34, "end", 20],
    detente: [284, 13.5, "start", 20]
  };
  /* décalage (px) du rond numéroté par rapport à son point : libre de tout tracé */
  const RONDS = { "1": [15, 15], "2": [15, -15], "3": [-24, 0], "4": [-24, 0] };

  const monDiagramme = function (parent, data) {
    const Z = window.VOYAGE_DIAGRAMME_ZONE, g = V.el("g", {}, parent), GR = window.VOYAGE_DIAGRAMME_GRADUATIONS || { p_bar_abs: [], h_kJ_kg: [], points: [] };
    const x0 = Z.x + 84, x1 = Z.x + Z.l - 74, y0 = Z.y + 50, y1 = Z.y + Z.h - 56;
    const [hmin, hmax] = data.plage.h, [pmin, pmax] = data.plage.p;
    const X = h => x0 + (h - hmin) / (hmax - hmin) * (x1 - x0);
    const Y = p => y1 - Math.log10(p / pmin) / Math.log10(pmax / pmin) * (y1 - y0);
    const pt = ([h, p]) => X(h).toFixed(1) + "," + Y(p).toFixed(1);

    V.el("rect", { x: Z.x, y: Z.y, width: Z.l, height: Z.h, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    V.texte(g, Z.x + Z.l / 2, Z.y + 34, "Le diagramme enthalpique", Object.assign({ "text-anchor": "middle", "font-size": 26, fill: V.BLEU }, POLICE));
    const c = data.cloche.filter(r => r[0] >= pmin), sommet = data.pcrit;
    const d = "M " + c.map(r => pt([r[1], r[0]])).join(" L ") + " L " + pt([sommet[1], sommet[0]]) + " L " + c.slice().reverse().map(r => pt([r[2], r[0]])).join(" L ");
    V.el("path", { d: d, fill: "rgba(47,111,184,.10)", stroke: "#2f6fb8", "stroke-width": 3 }, g);
    V.el("rect", { x: x0, y: y0, width: x1 - x0, height: y1 - y0, fill: "none", stroke: "#637285", "stroke-width": 2 }, g);
    /* axes avec flèches */
    V.el("path", { d: "M " + x0 + " " + (y1 + 4) + " V " + (y0 - 6) + " m -7 12 l 7 -12 l 7 12", fill: "none", stroke: ENCRE, "stroke-width": 2.4 }, g);
    V.el("path", { d: "M " + (x0 - 4) + " " + y1 + " H " + (x1 + 8) + " m -12 -7 l 12 7 l -12 7", fill: "none", stroke: ENCRE, "stroke-width": 2.4 }, g);
    /* graduations : petits traits en dehors du cadre, chiffres à côté (16-17 px) */
    GR.p_bar_abs.forEach(p => {
      V.el("line", { x1: x0 - 8, y1: Y(p), x2: x0, y2: Y(p), stroke: ENCRE, "stroke-width": 2.4 }, g);
      V.texte(g, x0 - 12, Y(p) + 5.5, String(p), Object.assign({ "text-anchor": "end", "font-size": 17, fill: ENCRE }, POLICE));
    });
    GR.h_kJ_kg.forEach(h => {
      V.el("line", { x1: X(h), y1: y1, x2: X(h), y2: y1 + 8, stroke: ENCRE, "stroke-width": 2.4 }, g);
      V.texte(g, X(h), y1 + 25, String(h), Object.assign({ "text-anchor": "middle", "font-size": 16, fill: ENCRE }, POLICE));
    });
    const axeP = V.texte(g, 0, 0, "p (bar abs)", Object.assign({ "text-anchor": "middle", "font-size": 20, fill: ENCRE }, POLICE));
    axeP.setAttribute("transform", "translate(" + (x0 - 52) + " " + ((y0 + y1) / 2) + ") rotate(-90)");
    V.texte(g, (x0 + x1) / 2, y1 + 50, "h (kJ/kg)", Object.assign({ "text-anchor": "middle", "font-size": 20, fill: ENCRE }, POLICE));
    /* zones */
    (data.zones || []).forEach(([texte, h, p, ancre]) =>
      V.texte(g, X(h), Y(p), texte, Object.assign({ "text-anchor": ancre || "middle", "font-size": 22, fill: "#2f6fb8" }, POLICE)));
    /* isobares */
    const isobare = (nom, p, coul, parentI) => {
      const gi = V.el("g", {}, parentI || g);
      V.el("line", { x1: x0, y1: Y(p), x2: x1, y2: Y(p), stroke: coul, "stroke-width": 2, "stroke-dasharray": "6 6", opacity: 0.8 }, gi);
      V.texte(gi, x1 + 10, Y(p) + 8, nom, Object.assign({ "font-size": 24, fill: coul }, POLICE));
      return gi;
    };
    isobare("BP", data.BP, V.BLEU); isobare("HP", data.HP, V.ORANGE);
    V.el("polyline", { points: data.chemin.map(pt).join(" "), fill: "none", stroke: "#9aa7b5", "stroke-width": 3, "stroke-dasharray": "8 7", "stroke-linejoin": "round" }, g);
    /* les points 1 à 4 : petit point exact + rond numéroté à côté */
    (GR.points || []).forEach(q => {
      const px = X(q.h), py = Y(q.p), [dx, dy] = RONDS[q.etiquette] || [14, 14];
      V.el("circle", { cx: px, cy: py, r: 4.5, fill: ENCRE }, g);
      V.el("circle", { cx: px + dx, cy: py + dy, r: 12, fill: "#fff", stroke: ENCRE, "stroke-width": 2.4 }, g);
      V.texte(g, px + dx, py + dy + 5.5, q.etiquette, Object.assign({ "text-anchor": "middle", "font-size": 16, fill: ENCRE }, POLICE));
    });
    /* les calques : cachés jusqu'à leur phrase ; étiquettes posées par POSE */
    const calques = {};
    for (const id in (data.calques || {})) {
      const k = data.calques[id], gc = V.el("g", { opacity: 0 }, g), coul = k.coul || "#c0392b", pose = POSE[id];
      if (k.pi) isobare("Pi", data.PI, "#1e7e54", gc);
      k.traits.forEach(tr => V.el("polyline", Object.assign({ points: tr.map(pt).join(" "), fill: "none", stroke: coul, "stroke-width": 4, "stroke-linejoin": "round" }, k.plein ? {} : { "stroke-dasharray": "10 6" }), gc));
      if (k.texte) {
        const [h, p, ancre, taille, meneur] = pose || [k.ou[0], k.ou[1], k.ancre || "middle", 22];
        if (meneur) V.el("line", { x1: X(meneur[0]), y1: Y(meneur[1]), x2: X(meneur[2]), y2: Y(meneur[3]), stroke: coul, "stroke-width": 2, "stroke-dasharray": "4 4" }, gc);
        V.texte(gc, X(h), Y(p), k.texte, Object.assign({ "text-anchor": ancre, "font-size": taille, fill: coul }, POLICE));
      }
      calques[id] = gc;
    }
    const trace = V.el("polyline", { fill: "none", stroke: V.ORANGE, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    const mol = V.heroine(g, { r: 30 });
    const n = data.chemin.length - 1;
    const surChemin = w => {
      const m = ((w % n) + n) % n, i = Math.min(n - 1, Math.floor(m)), f = m - i, a = data.chemin[i], b = data.chemin[i + 1];
      return [V.lerp(a[0], b[0], f), Math.exp(V.lerp(Math.log(a[1]), Math.log(b[1]), f))];
    };
    return {
      g: g,
      maj: function (w0, w, vus, o) {
        o = o || {};
        for (const id in calques) calques[id].setAttribute("opacity", vus && vus[id] ? 1 : 0);
        if (w === null || w === undefined) { trace.setAttribute("points", ""); mol({ x: -999, y: -999, s: 0.01, t: 0 }); return; }
        const pts = [];
        if (w0 !== null && w0 !== undefined && w > w0) {
          for (let v = w0; v < w; v = Math.floor(v + 1)) pts.push(surChemin(v));
          pts.push(surChemin(w));
        }
        trace.setAttribute("points", pts.map(pt).join(" "));
        const [h, p] = surChemin(w);
        mol({ x: X(h), y: Y(p), s: 0.55, t: o.t || 0, temp: o.temp, etat: o.etat, humeur: o.humeur });
      }
    };
  };
  /* le film charge ce fichier AVANT moteur/voyage-diagramme.js : sans ce verrou, le diagramme commun (sans chiffres) remplacerait celui-ci */
  Object.defineProperty(D, "diagramme", { configurable: true, get: () => monDiagramme, set: () => {} });
})();

/* Symboles des scènes hors des organes du circuit (sonde, manomètre) : déclarés comme organes pour que
   outils/voyage-film.mjs les embarque dans la vidéo (il n'embarque que D.ORGANES). Aucun n'est placé sur la carte. */
Object.assign(window.VOYAGE_DESSIN.ORGANES, {
  sondeTemperature: { f: "sonde_temperature", vb: [-30, -14, 60, 40], axe: [0, 0], nom: "sonde de température" },
  capteurPression: { f: "capteur_pression", vb: [-12, -20, 24, 40], axe: [0, 0], nom: "manomètre" }
});
