/* =====================================================================
   voyage-diagramme.js — le diagramme enthalpique, à côté de l'installation
   ---------------------------------------------------------------------
   RÔLE : demande de Franck (03/10/2026) : « en parallèle, on dessine le
   cycle » — pendant que la molécule voyage dans l'installation, son point
   avance sur le diagramme log p-h et y dessine son cycle. Écran partagé
   (choix de Franck) : la scène à gauche (x < 970), à droite la carte « où
   je suis » (en haut) et ce diagramme (dessous). OPTIONNEL : seule une
   édition qui charge ses données (window.VOYAGE_DIAGRAMME) l'affiche ; les
   éditions déjà en ligne ne changent pas.
   DONNÉES (window.VOYAGE_DIAGRAMME, une par édition) :
     cloche  [[p, hl, hv], …]  saturation (bar abs, kJ/kg), p croissant
     pcrit   [p, h]            sommet de la cloche
     BP, HP, PI                isobares (PI facultative, montrée avec un calque)
     chemin  [[h, p], …]       le cycle de la molécule, FERMÉ (dernier = premier)
     calques { id: { traits: [[[h, p], …], …], texte, ou: [h, p], ancre, coul, pi } }
     chiffres false            aucun chiffre à l'écran (schéma) — seul cas codé pour l'instant
     plage   { h: [min, max], p: [min, max] }
   Le récit dit, par chapitre, `diag: [w0, w1]` (position sur `chemin`,
   comme `carte` sur le circuit ; au-delà du dernier point, on reboucle) et
   `calques: { id: k }` (calque montré à partir de la phrase k).
   RIGUEUR (mémoire feedback_rigueur_diagramme_enthalpique) : la zone du
   milieu s'appelle « liquide + vapeur » (pas « il bout ») ; h = l'énergie
   de 1 kg ; pas de chiffres, donc pas de piège relatif / absolu.
   RÉEMPLOI : la forme de la cloche vient des tables de SimuRézo / AquiBlue
   (C:\git\inerweb-dep\src\donnees\fluides.json).
   PUR : maj(w0, w, calques) ne dépend que de ses arguments.
   ===================================================================== */
(function () {
  "use strict";
  window.VOYAGE_DIAGRAMME_ZONE = { x: 990, y: 296, l: 596, h: 460 }; // le panneau, dans la toile 1600 × 770
  const V = window.VOYAGE_DESSIN;
  const POLICE = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };

  V.diagramme = function (parent, data) {
    const Z = window.VOYAGE_DIAGRAMME_ZONE, g = V.el("g", {}, parent);
    const x0 = Z.x + 62, x1 = Z.x + Z.l - 74, y0 = Z.y + 50, y1 = Z.y + Z.h - 56; // cadre du tracé ; à droite : BP, HP
    const [hmin, hmax] = data.plage.h, [pmin, pmax] = data.plage.p;
    const X = h => x0 + (h - hmin) / (hmax - hmin) * (x1 - x0);
    const Y = p => y1 - Math.log10(p / pmin) / Math.log10(pmax / pmin) * (y1 - y0);
    const pt = ([h, p]) => X(h).toFixed(1) + "," + Y(p).toFixed(1);

    V.el("rect", { x: Z.x, y: Z.y, width: Z.l, height: Z.h, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    V.texte(g, Z.x + Z.l / 2, Z.y + 34, "Le diagramme enthalpique", Object.assign({ "text-anchor": "middle", "font-size": 26, fill: V.BLEU }, POLICE));
    /* la cloche : liquide à gauche, liquide + vapeur dedans, vapeur à droite */
    const c = data.cloche.filter(r => r[0] >= pmin), sommet = data.pcrit; // la cloche commence au bas du cadre
    const d = "M " + c.map(r => pt([r[1], r[0]])).join(" L ") + " L " + pt([sommet[1], sommet[0]]) + " L " + c.slice().reverse().map(r => pt([r[2], r[0]])).join(" L ");
    V.el("path", { d: d, fill: "rgba(47,111,184,.10)", stroke: "#2f6fb8", "stroke-width": 3 }, g);
    V.el("rect", { x: x0, y: y0, width: x1 - x0, height: y1 - y0, fill: "none", stroke: "#637285", "stroke-width": 2 }, g);
    /* axes, sans graduation */
    V.el("path", { d: "M " + x0 + " " + (y1 + 4) + " V " + (y0 - 6) + " m -7 12 l 7 -12 l 7 12", fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, g);
    V.el("path", { d: "M " + (x0 - 4) + " " + y1 + " H " + (x1 + 8) + " m -12 -7 l 12 7 l -12 7", fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, g);
    const axeP = V.texte(g, 0, 0, "pression", Object.assign({ "text-anchor": "middle", "font-size": 22, fill: "#10233c" }, POLICE));
    axeP.setAttribute("transform", "translate(" + (x0 - 16) + " " + ((y0 + y1) / 2) + ") rotate(-90)");
    V.texte(g, (x0 + x1) / 2, y1 + 34, "énergie de 1 kg (enthalpie h)", Object.assign({ "text-anchor": "middle", "font-size": 22, fill: "#10233c" }, POLICE));
    /* zones (positions choisies hors de tout tracé du cycle et des calques) */
    (data.zones || []).forEach(([texte, h, p, ancre]) =>
      V.texte(g, X(h), Y(p), texte, Object.assign({ "text-anchor": ancre || "middle", "font-size": 22, fill: "#2f6fb8" }, POLICE)));
    /* isobares : pointillés sur tout le cadre, nom à droite du cadre */
    const isobare = (nom, p, coul, parentI) => {
      const gi = V.el("g", {}, parentI || g);
      V.el("line", { x1: x0, y1: Y(p), x2: x1, y2: Y(p), stroke: coul, "stroke-width": 2, "stroke-dasharray": "6 6", opacity: 0.8 }, gi);
      V.texte(gi, x1 + 10, Y(p) + 8, nom, Object.assign({ "font-size": 24, fill: coul }, POLICE));
      return gi;
    };
    isobare("BP", data.BP, V.BLEU); isobare("HP", data.HP, V.ORANGE);
    /* le cycle de référence, gris pointillé */
    V.el("polyline", { points: data.chemin.map(pt).join(" "), fill: "none", stroke: "#9aa7b5", "stroke-width": 3, "stroke-dasharray": "8 7", "stroke-linejoin": "round" }, g);
    /* les calques : cachés jusqu'à leur phrase */
    const calques = {};
    for (const id in (data.calques || {})) {
      const k = data.calques[id], gc = V.el("g", { opacity: 0 }, g), coul = k.coul || "#c0392b";
      if (k.pi) isobare("Pi", data.PI, "#1e7e54", gc);
      k.traits.forEach(tr => V.el("polyline", Object.assign({ points: tr.map(pt).join(" "), fill: "none", stroke: coul, "stroke-width": 4, "stroke-linejoin": "round" }, k.plein ? {} : { "stroke-dasharray": "10 6" }), gc));
      if (k.texte) V.texte(gc, X(k.ou[0]), Y(k.ou[1]), k.texte, Object.assign({ "text-anchor": k.ancre || "middle", "font-size": 22, fill: coul }, POLICE));
      calques[id] = gc;
    }
    /* la trace (ce que la molécule a parcouru dans ce chapitre) et la molécule */
    const trace = V.el("polyline", { fill: "none", stroke: V.ORANGE, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    const mol = V.heroine(g, { r: 30 });
    const n = data.chemin.length - 1; // chemin fermé : n segments
    const surChemin = w => {
      const m = ((w % n) + n) % n, i = Math.min(n - 1, Math.floor(m)), f = m - i, a = data.chemin[i], b = data.chemin[i + 1];
      return [V.lerp(a[0], b[0], f), Math.exp(V.lerp(Math.log(a[1]), Math.log(b[1]), f))]; // p interpolée en log : droite sur le diagramme
    };
    return {
      g: g,
      /* w0 : début de la trace (null : pas de trace) ; w : la molécule (null : cachée) ; vus : { id: true } */
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
})();
