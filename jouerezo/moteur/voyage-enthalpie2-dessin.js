/* =====================================================================
   voyage-enthalpie2-dessin.js — ce que l'édition « le diagramme enthalpique, niveau 2 »
   change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé par voyage-enthalpie2.html APRÈS voyage-diagramme.js (il en redéfinit
   D.diagramme). Sans toucher aux fichiers communs :
   1. la CARTE du circuit reste celle du circuit de base (D.CIRCUIT_PTS, croix du
      frigoriste) ; seule change la carte d'identité, DÉCALÉE À GAUCHE (écran partagé :
      x > 970 est pris par la carte « où je suis » et le diagramme) ;
   2. le DIAGRAMME à toutes ses lignes : D.diagramme refait ici. Lit
      window.VOYAGE_DIAGRAMME_GRADUATIONS (donnees/voyage-enthalpie2-diagramme.js).
      La cloche est toujours dessinée (échelle p log, 1 à 45 bar abs). Tout le reste est
      un CALQUE montré à partir d'une phrase (récit : calques: { id: k }) :
        · familles de courbes des données (isobares, isenthalpes, isothermes, isotitres,
          isentropes, isochores) : traits fins 2 px, étiquettes posées à la main
          (table POSE_FAMILLES, en h, p) en 15-16 px gras sur halo crème ;
        · liquideSature, vapeurSaturee : courbe épaisse (5 px) en couleur vive + son nom ;
          pointCritique : rond plein + son nom ;
        · calques de cycle des données (surchauffe, desurchauffe, sousRefroidissement,
          detente, compressionIdeale) : trait + texte, positions dans POSE ;
        · calques ajoutés ICI (pas dans les données) : isobaresCycle (BP et HP en pointillé),
          pt1 à pt4 (point exact + rond numéroté), et le rond « 2s » dans compressionIdeale.
      Plus de chemin gris permanent : le cycle n'apparaît que par les calques et par la trace
      orange de la molécule. Même contrat que le diagramme commun (maj(w0, w, vus, o)).
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

  /* ---------- le diagramme à toutes ses lignes ---------- */
  const POLICE = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };
  const ENCRE = "#10233c", CREME = "#fffdf8";
  /* halo crème : une étiquette n'est jamais coupée par un trait qui passe derrière */
  const HALO = { "paint-order": "stroke", stroke: CREME, "stroke-width": 4, "stroke-linejoin": "round" };
  const VIF = { liquideSature: "#0b6fd1", vapeurSaturee: "#d9480f", pointCritique: ENCRE };

  /* étiquettes des familles de courbes, posées à la main :
     [texte, h, p, ancre, dx, dy] ; (h, p) = repère sur la ligne, (dx, dy) = décalage en px.
     Peu d'étiquettes valent mieux que des étiquettes collées. */
  const POSE_FAMILLES = {
    isobares: [["2 bar", 480, 2, "start", 9, 5], ["5 bar", 480, 5, "start", 9, 5], ["10 bar", 480, 10, "start", 9, 5], ["20 bar", 480, 20, "start", 9, 5]],
    isenthalpes: [["200", 200, 41, "start", 4, 12], ["250", 250, 41, "start", 4, 12], ["300", 300, 41, "start", 4, 12], ["350", 350, 41, "start", 4, 12], ["400", 400, 41, "start", 4, 12], ["450", 450, 41, "start", 4, 12]],
    isothermes: [["−20 °C", 380, 1.333, "end", 0, -6], ["0 °C", 392, 2.93, "end", 0, -6], ["20 °C", 403, 5.72, "end", 0, -6], ["40 °C", 412, 10.2, "end", 0, -6], ["60 °C", 419, 16.8, "end", 0, -6], ["80 °C", 422, 26.3, "end", 0, -6]],
    isotitres: [["0,1", 191.5, 1.15, "start", 4, 4], ["0,3", 234.5, 1.15, "start", 4, 4], ["0,5", 277.5, 1.15, "start", 4, 4], ["0,7", 320.5, 1.15, "start", 4, 4], ["0,9", 363.5, 1.15, "start", 4, 4],
      ["x = titre", 478, 33, "end", 0, 0]],
    isentropes: [["1,72", 448, 39, "end", -6, 5], ["1,80", 410, 2.6, "start", 7, 5], ["s en kJ/(kg·K)", 480, 1.17, "end", -4, 0]],
    isochores: [["0,02 m³/kg", 480, 13.291, "end", -6, -7], ["0,05 m³/kg", 480, 5.613, "end", -6, -7], ["0,1 m³/kg", 480, 2.86, "end", -6, -7], ["0,2 m³/kg", 480, 1.444, "end", -6, -7]],
    liquideSature: [["liquide saturé", 268, 14, "end", -6, 0]],
    vapeurSaturee: [["vapeur saturée", 394, 2.15, "start", 6, 0]]
  };
  /* calques de cycle des données : [h, p, ancre, taille, meneur?] ; meneur = [h1, p1, h2, p2], trait qui rejoint le tracé */
  const POSE = {
    surchauffe: [385, 2.2, "end", 17, [386, 2.12, 394.5, 2.0]],
    desurchauffe: [411, 8.2, "end", 17, [412.5, 8.6, 428, 10.0]],
    sousRefroidissement: [243, 11.6, "end", 17],
    detente: [254, 4.5, "start", 18],
    compressionIdeale: [404, 4.75, "end", 17, [405.5, 5.0, 416.5, 5.0]],
    pointCritique: [348, 36, "end", 17]
  };
  /* décalage (px) du rond numéroté par rapport à son point : libre de tout tracé */
  const RONDS = { "1": [16, 16], "2": [16, -16], "3": [-24, 0], "4": [-38, 0] };
  const FAMILLES = ["isobares", "isenthalpes", "isothermes", "isotitres", "isentropes", "isochores"]; // les noms de zones s'effacent quand une famille est montrée (elles passeraient dessous)
  const COUCHE_HAUTE = ["surchauffe", "desurchauffe", "sousRefroidissement", "detente", "compressionIdeale", "pt1", "pt2", "pt3", "pt4"]; // au-dessus de la trace orange
  const ZONES = { "liquide": [192, 25, "middle"], "liquide + vapeur": [270, 1.12, "middle"], "vapeur": [452, 32, "middle"] };

  const monDiagramme = function (parent, data) {
    const Z = window.VOYAGE_DIAGRAMME_ZONE, g = V.el("g", {}, parent), GR = window.VOYAGE_DIAGRAMME_GRADUATIONS || { p_bar_abs: [], h_kJ_kg: [], points: [] };
    const x0 = Z.x + 84, x1 = Z.x + Z.l - 74, y0 = Z.y + 50, y1 = Z.y + Z.h - 56;
    const [hmin, hmax] = data.plage.h, [pmin, pmax] = data.plage.p;
    const X = h => x0 + (h - hmin) / (hmax - hmin) * (x1 - x0);
    const Y = p => y1 - Math.log10(p / pmin) / Math.log10(pmax / pmin) * (y1 - y0);
    const pt = ([h, p]) => X(h).toFixed(1) + "," + Y(p).toFixed(1);
    const txt = (parent, x, y, s, at) => V.texte(parent, x, y, s, Object.assign({}, POLICE, HALO, at));

    V.el("rect", { x: Z.x, y: Z.y, width: Z.l, height: Z.h, rx: 18, fill: CREME, stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    V.texte(g, Z.x + Z.l / 2, Z.y + 34, "Le diagramme enthalpique du " + (data.fluide || "R134a"), Object.assign({ "text-anchor": "middle", "font-size": 26, fill: V.BLEU }, POLICE));
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
    /* zones (toujours là) */
    const gZones = V.el("g", {}, g);
    (data.zones || []).forEach(([texte]) => {
      const z = ZONES[texte];
      if (z) txt(gZones, X(z[0]), Y(z[1]), texte, { "text-anchor": z[2], "font-size": 20, fill: "#2f6fb8" });
    });

    /* ---------- les calques ---------- */
    const calques = {};
    const gBas = V.el("g", {}, g); // familles, saturation, isobares du cycle
    const gEtiq = V.el("g", {}, g); // leurs étiquettes, par-dessus tous les traits des familles
    const trace = V.el("polyline", { fill: "none", stroke: V.ORANGE, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    const gHaut = V.el("g", {}, g); // calques du cycle et points : par-dessus la trace
    const nouveau = id => {
      const haut = COUCHE_HAUTE.indexOf(id) >= 0, gc = (calques[id] = V.el("g", { opacity: 0 }, haut ? gHaut : gBas));
      gc.etiq = haut ? gc : V.el("g", { opacity: 0 }, gEtiq); // le groupe où poser les étiquettes du calque
      return gc;
    };
    const trait = (gc, tr, coul, ep, plein) => V.el("polyline", Object.assign({ points: tr.map(pt).join(" "), fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "round" }, plein ? {} : { "stroke-dasharray": "10 6" }), gc);
    const eti = (gc, [texte, h, p, ancre, dx, dy], coul, taille) => txt(gc.etiq, X(h) + dx, Y(p) + dy, texte, { "text-anchor": ancre, "font-size": taille || 16, fill: coul });
    const rond = (gc, px, py, dx, dy, etiquette, r, taille) => {
      V.el("circle", { cx: px, cy: py, r: 4.5, fill: ENCRE }, gc);
      V.el("circle", { cx: px + dx, cy: py + dy, r: r, fill: "#fff", stroke: ENCRE, "stroke-width": 2.4 }, gc);
      V.texte(gc, px + dx, py + dy + taille * 0.34, etiquette, Object.assign({ "text-anchor": "middle", "font-size": taille, fill: ENCRE }, POLICE));
    };

    /* calques des données */
    for (const id in (data.calques || {})) {
      const k = data.calques[id], gc = nouveau(id), vif = VIF[id], coul = vif || k.coul || "#c0392b";
      if (id === "pointCritique") { // rond plein sur le sommet de la cloche
        const [p, h] = data.pcrit; // pcrit = [p, h]
        const pose = POSE[id];
        V.el("line", { x1: X(pose[0]) + 3, y1: Y(pose[1]) - 5, x2: X(h) - 4, y2: Y(p) + 4, stroke: ENCRE, "stroke-width": 1.6 }, gc);
        V.el("circle", { cx: X(h), cy: Y(p), r: 7, fill: ENCRE, stroke: CREME, "stroke-width": 2 }, gc);
        txt(gc, X(pose[0]), Y(pose[1]), k.texte, { "text-anchor": pose[2], "font-size": pose[3], fill: ENCRE });
        continue;
      }
      const epais = id === "liquideSature" || id === "vapeurSaturee";
      k.traits.forEach(tr => trait(gc, tr, coul, epais ? 5 : 2, k.plein !== false));
      if (POSE_FAMILLES[id]) POSE_FAMILLES[id].forEach(e => eti(gc, e, coul, epais ? 17 : 15));
      else if (k.texte) { // calques de cycle
        const [h, p, ancre, taille, meneur] = POSE[id] || [k.ou[0], k.ou[1], k.ancre || "middle", 17];
        if (meneur) V.el("line", { x1: X(meneur[0]), y1: Y(meneur[1]), x2: X(meneur[2]), y2: Y(meneur[3]), stroke: coul, "stroke-width": 2, "stroke-dasharray": "4 4" }, gc);
        trait(gc, k.traits[0], coul, 3.5, k.plein !== false);
        txt(gc, X(h), Y(p), k.texte, { "text-anchor": ancre, "font-size": taille, fill: coul });
      }
      if (id === "compressionIdeale" && GR.point2s) { // le rond « 2s » : plus petit, sous la haute pression
        const q = GR.point2s;
        rond(gc, X(q.h), Y(q.p), -3, -19, q.etiquette, 11, 14);
      }
    }
    /* isobares du cycle : BP et HP en pointillé, étiquettes dans la marge de droite */
    const ic = nouveau("isobaresCycle");
    [["BP", "2 bar", data.BP, V.BLEU], ["HP", "10,2 bar", data.HP, V.ORANGE]].forEach(([nom, val, p, coul]) => {
      V.el("line", { x1: x0, y1: Y(p), x2: x1, y2: Y(p), stroke: coul, "stroke-width": 2.4, "stroke-dasharray": "6 6", opacity: 0.9 }, ic);
      V.texte(ic, x1 + 8, Y(p) - 2, nom, Object.assign({ "font-size": 20, fill: coul }, POLICE));
      V.texte(ic, x1 + 8, Y(p) + 15, val, Object.assign({ "font-size": 15, fill: coul }, POLICE));
    });
    /* les points 1 à 4 : petit point exact + rond numéroté à côté, chacun dans son calque */
    (GR.points || []).forEach(q => {
      const [dx, dy] = RONDS[q.etiquette] || [14, 14];
      rond(nouveau("pt" + q.etiquette), X(q.h), Y(q.p), dx, dy, q.etiquette, 12, 16);
    });

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
        for (const id in calques) { const o1 = vus && vus[id] ? 1 : 0; calques[id].setAttribute("opacity", o1); calques[id].etiq.setAttribute("opacity", o1); }
        gZones.setAttribute("opacity", FAMILLES.some(id => vus && vus[id]) ? 0 : 1);
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
   outils/voyage-film.mjs les embarque dans la vidéo (il n'embarque que D.ORGANES). Aucun n'est placé sur la carte.
   Pas de symbole « manifold » dans voyage/symboles/ : la scène des relevés pourra utiliser capteurPression. */
Object.assign(window.VOYAGE_DESSIN.ORGANES, {
  sondeTemperature: { f: "sonde_temperature", vb: [-30, -14, 60, 40], axe: [0, 0], nom: "sonde de température" },
  capteurPression: { f: "capteur_pression", vb: [-12, -20, 24, 40], axe: [0, 0], nom: "manomètre" }
});
