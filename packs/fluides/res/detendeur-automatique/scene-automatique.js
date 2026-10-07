/* =====================================================================
   scene-automatique.js — gare 4 « Le détendeur automatique » : les dessins qui vivent
   ---------------------------------------------------------------------
   RÔLE : une fonction par écran qui dessine. app.js les appelle dans render() :
     AUTOMATIQUE_SCENES.accueil(hote)            le dessin du sommaire (la charge varie, le détendeur se trompe)
     AUTOMATIQUE_SCENES.identite(hote, symbole)  écran 1 : carte d'identité (coupe au repos, visite guidée)
     AUTOMATIQUE_SCENES.balance(hote)            écran 2 : la balance ressort / pression (pas à pas, manomètre BP)
     AUTOMATIQUE_SCENES.charge(hote)             écran 3 : et si la charge monte ? puis baisse ? (pas à pas, l'écran clé)
     AUTOMATIQUE_SCENES.reglage(hote, exo)       écran 4 : régler la consigne avec la vis (l'élève tourne et lit la BP)
   LA COUPE, c'est celle de la ligne : DS.coupe("automatique") (scenes-detendeurs.js, lu sans modification). On la pilote
   par { charge, ouverture } ; la BP de l'aiguille vient de coupe.lire().bp.
   BRIQUES AJOUTÉES (absentes de DETENDEURS_SCENES) :
     · « tête » : la vis, le ressort entre deux plateaux, les flèches de force, dans cet ordre, pour que l'ORIGINE de
       chaque force se voie. Convention de couleurs de la ligne : GRIS ACIER = le ressort (il OUVRE, il vient de la vis),
       BLEU = la pression d'évaporation (elle FERME, elle vient de la sortie BP, dont l'intérieur communique avec la chambre
       sous la membrane). L'écart des flèches est ×4 autour de la consigne pour que la balance se voie (les deux flèches
       natives de la coupe, trop peu sensibles, sont masquées et redessinées) ;
     · « légende » : sous les dessins, en HTML, jamais sur un tracé : gris « ressort (réglé par la vis) : ouvre », bleu
       « pression d’évaporation : ferme » (G.LEGENDE) ;
     · « jauge » : DS.manometre + un repère ▼ « consigne » (le milieu du cadran) ; l'aiguille est une BP qualitative
       recentrée sur la consigne ; pour l'exercice, un arc vert « BP demandée (exemple) » ;
     · « trace » : la BP au fil du temps (courbe qui défile, consigne en pointillé ou bande verte) ;
     · « bilan » : ce qu'il faut à l'évaporateur (le trait) contre ce que le détendeur laisse passer (la barre) ;
     · « tête en gros plan » (exercice) : le ressort qui se comprime quand on visse, la membrane, la chambre de BP, la
       vis vue de dessus qui tourne par quarts de tour ; la BP répond avec un retard (il faut laisser stabiliser).
   RÈGLES TENUES : valeurs QUALITATIVES (aucun chiffre de constructeur) ; texte jamais sur un tracé (légendes en HTML,
   pastilles dans des espaces libres) ; le liquide se voit liquide (nappe, bulles qui naissent au fond) ; tubes continus
   (la coupe de la ligne ; le raccord de BP du gros plan : paroi d'abord, vide ensuite, qui traverse la paroi du corps) ;
   filigrane inerWeb (R9) derrière chaque dessin ; rien n'est animé en CSS.
   MODÈLE (qualitatif) : DS.bp(charge, ouverture) = 0,3 + 0,4·charge + 0,2·ouverture ; la consigne vaut 0,6 (charge
   normale, ouverture 0,5) ; l'aiguille : p = 0,5 + 2,5·(BP − consigne), le milieu du cadran = la consigne.
   LE DÉTENDEUR TIENT LA BP : quand une scène donne `ecart` (BP − consigne), la jauge et les flèches de pression le
   suivent, et non DS.bp. L'écart ne dure qu'un instant (la charge change, la BP s'écarte un peu, le détendeur réagit,
   la BP revient à la consigne et y reste) : ce qui trahit la charge, c'est la NAPPE et le bilan, pas la BP.
   ===================================================================== */
(function () {
  "use strict";
  const DS = window.DETENDEURS_SCENES, D = window.VOYAGE_DESSIN;
  const G = window.AUTOMATIQUE_SCENES = {};
  if (!DS || !D) { console.warn("scene-automatique.js : DETENDEURS_SCENES absent."); return; }
  const el = D.el, lerp = D.lerp, bn = D.borne, frac = D.frac;
  const H = 470, HR = 250;                          // hauteurs des deux compositions : la coupe, le gros plan de la tête
  const CLAIR = "#f4f8fc", NAVY = "#1b3a63", BLEU = "#3d7fca", GRAPHITE = "#33475b", CUIVRE = "#c57a45";
  const VERT = "#1e7e54", AMBRE = "#b06a00", ROUGE = "#c0392b";
  const GRIS = "#5d6b7a";                            // gris acier : le ressort (comme son dessin)
  const CONS = 0.6;                                 // la consigne, en BP qualitative de la coupe
  const aiguilleP = bp => bn(0.5 + 2.5 * (bp - CONS), 0, 1);   // l'aiguille : la consigne au milieu du cadran
  // l'exercice : la BP de départ, ce que change un quart de tour, la zone demandée, la lenteur de l'aiguille
  const P0 = 0.25, PAS = 0.08, ZONE = [0.58, 0.70], TAU = 0.9;
  const NATIFS = ["aiguille", "evaporateur"];       // pièces allumées par la coupe elle-même

  /* ---------- outils ---------- */
  const angle = p => lerp(-115, 115, bn(p, 0, 1)) * Math.PI / 180;
  function arc(g, cx, cy, R, p0, p1, coul, w) {
    const a0 = angle(p0), a1 = angle(p1), P = a => [cx + R * Math.sin(a), cy - R * Math.cos(a)], A = P(a0), B = P(a1);
    return el("path", { d: "M " + A[0].toFixed(1) + " " + A[1].toFixed(1) + " A " + R + " " + R + " 0 0 1 " + B[0].toFixed(1) + " " + B[1].toFixed(1), fill: "none", stroke: coul, "stroke-width": w, "stroke-linecap": "butt" }, g);
  }
  const flecheBas = (x, y0, h) => "M " + (x - 4) + " " + (y0 - h) + " V " + (y0 - 12) + " H " + (x - 11) + " L " + x + " " + y0 + " L " + (x + 11) + " " + (y0 - 12) + " H " + (x + 4) + " V " + (y0 - h) + " Z";
  const flecheHaut = (x, y0, h) => "M " + (x - 4) + " " + y0 + " V " + (y0 - h + 12) + " H " + (x - 11) + " L " + x + " " + (y0 - h) + " L " + (x + 11) + " " + (y0 - h + 12) + " H " + (x + 4) + " V " + y0 + " Z";
  const ressortD = (top, bot) => { const n = bn(Math.round((bot - top) / 6), 4, 9); let d = "M 150 " + top.toFixed(1); for (let k = 1; k <= n; k++) d += " L " + (k % 2 ? 133 : 167) + " " + (top + (bot - top) * k / n).toFixed(1); return d + " L 150 " + bot.toFixed(1); };
  const hFleche = v => bn(8 + 44 * v, 8, 54);       // la longueur d'une flèche de force (v : force qualitative)
  const yArc = (x, dm) => 112 + 4 * dm * ((x - 95) / 110) * (1 - (x - 95) / 110);   // la membrane au droit d'une flèche (arc de la coupe)
  const LEGENDE = '<p class="au-legende"><span class="gris"><b aria-hidden="true">↓</b> ressort (réglé par la vis) : <strong>ouvre</strong></span><span class="bleu"><b aria-hidden="true">↑</b> pression d’évaporation : <strong>ferme</strong></span></p>';
  const legende = () => { const d = document.createElement("div"); d.innerHTML = LEGENDE; return d.firstChild; };
  G.LEGENDE = LEGENDE;

  /* ---------- la tête : vis → ressort → flèche (le ressort pousse vers le bas, il OUVRE) ; flèche de la BP vers le haut
     (elle FERME). Coordonnées de la coupe. maj(dm, yt, vR, vP, rot) : dm = creux de la membrane, yt = plateau du haut
     (poussé par la vis), vR et vP = forces qualitatives du ressort et de la pression, rot = filets de la vis. ---------- */
  function tete(parent) {
    const g = el("g", {}, parent);
    const chambre = el("path", { fill: CLAIR }, g);                                    // recouvre le ressort natif de la coupe
    const vis = el("rect", { x: 146, y: 12, width: 8, fill: "#3f4a55" }, g);           // la tige de la vis, sous sa tête
    const filets = [0, 1, 2, 3, 4, 5].map(() => el("line", { x1: 144, x2: 156, stroke: "#aab6c3", "stroke-width": 2.5, "stroke-linecap": "round" }, g));
    const haut = el("rect", { x: 122, width: 56, height: 8, rx: 3, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const ressort = el("path", { fill: "none", stroke: GRIS, "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
    const bas = el("rect", { x: 104, width: 92, height: 8, rx: 3, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const fR = [118, 182].map(() => el("path", { fill: GRIS, stroke: "#fff", "stroke-width": 1.5, "stroke-linejoin": "round" }, g));
    const membrane = el("path", { fill: "none", stroke: "#24384f", "stroke-width": 5, "stroke-linecap": "round" }, g);
    const fP = [118, 182].map(() => el("path", { fill: BLEU, stroke: "#fff", "stroke-width": 1.5, "stroke-linejoin": "round" }, g));
    return { maj: function (dm, yt, vR, vP, rot) {
      const d = "M 95 112 V 70 Q 95 18 150 18 Q 205 18 205 70 V 112 Q 150 " + (112 + 2 * dm).toFixed(1);
      chambre.setAttribute("d", d + " 95 112 Z"); membrane.setAttribute("d", "M 95 112 Q 150 " + (112 + 2 * dm).toFixed(1) + " 205 112");
      const ya = yArc(118, dm), hR = hFleche(vR), hP = hFleche(vP), pb = ya - 3 - hR - 8, y1 = Math.min(yt, pb - 20);   // le plateau du bas pose les flèches du ressort sur la membrane
      vis.setAttribute("height", (y1 - 12).toFixed(1)); haut.setAttribute("y", y1.toFixed(1)); bas.setAttribute("y", pb.toFixed(1));
      filets.forEach((f, k) => { const y = 16 + ((k * 8 + rot * 0.08) % 48 + 48) % 48; f.setAttribute("y1", y.toFixed(1)); f.setAttribute("y2", (y - 2).toFixed(1)); f.setAttribute("opacity", y < y1 - 4 ? 1 : 0); });
      ressort.setAttribute("d", ressortD(y1 + 8, pb));
      fR.forEach((f, k) => f.setAttribute("d", flecheBas([118, 182][k], ya - 3, hR)));          // le ressort pousse vers le bas : il ouvre
      fP.forEach((f, k) => f.setAttribute("d", flecheHaut([118, 182][k], ya + 3 + hP, hP)));      // la pression pousse vers le haut : elle ferme
    } };
  }
  function anneau(g) {
    const r = el("rect", { rx: 12, fill: "none", stroke: "#ff6b35", "stroke-width": 5, opacity: 0 }, g);
    return function (zone, t) {
      if (!zone) { r.setAttribute("opacity", 0); return; }
      r.setAttribute("x", zone[0]); r.setAttribute("y", zone[1]); r.setAttribute("width", zone[2]); r.setAttribute("height", zone[3]);
      r.setAttribute("opacity", (0.65 + 0.35 * Math.sin(t * 5)).toFixed(2));
    };
  }
  /* deux anneaux au plus : une pièce qui agit, ou deux (ZONES[nom] = [x, y, largeur, hauteur]) */
  function anneaux(g, ZONES) {
    const A = [anneau(g), anneau(g)];
    return function (noms, t) { const l = noms.map(k => ZONES[k]).filter(Boolean); A.forEach((a, i) => a(l[i] || null, t)); };
  }
  /* le panneau à droite de la coupe est coupé en cellules : côte à côte s'il est large, l'une sous l'autre sinon */
  function decouper(n, x, y, w, h, large) {
    if (n === 1) return [{ x: x, y: y, w: w, h: h }];
    if (large) { const a = Math.round(w * 0.4); return [{ x: x, y: y, w: a, h: h }, { x: x + a, y: y, w: w - a, h: h }]; }
    const a = Math.round(h * 0.52); return [{ x: x, y: y, w: w, h: a }, { x: x, y: y + a, w: w, h: h - a }];
  }

  /* ---------- la jauge de BP : le manomètre de la ligne + le repère « consigne » (milieu du cadran) ----------
     o : { solo, marqueur, zone [p0, p1] (arc vert), etiq, large } → { maj(p), zone, cx, cy, r } */
  function jauge(g, c, o) {
    const ph = 1.35 * o.ps, haut = 10 + ph, bas = 16 + ph;                     // la place des pastilles au-dessus (consigne) et au-dessous (BP)
    const r = bn(Math.min(c.w / 2 - 14, (c.h - haut - bas) / 2, o.solo ? 125 : 105), 44, 140);
    const cx = c.x + c.w / 2, cy = c.y + (c.h - (haut + 2 * r + bas)) / 2 + haut + r;
    if (o.zone) arc(g, cx, cy, r + 10, o.zone[0], o.zone[1], VERT, 10);      // la BP demandée : un arc vert, hors du cadran
    const m = DS.manometre(g, cx, cy, r);
    if (o.marqueur) {
      el("path", { d: "M " + (cx - 9) + " " + (cy - r - 20) + " H " + (cx + 9) + " L " + cx + " " + (cy - r - 5) + " Z", fill: NAVY, stroke: "#fff", "stroke-width": 1.5, "stroke-linejoin": "round" }, g);
      if (o.etiq && o.large) D.pastille(g, cx + 18, cy - r - 6 - 0.4 * o.ps, "consigne", NAVY, o.ps, "start");
    }
    if (o.etiq) D.pastille(g, cx, cy + r + 12 + 0.95 * o.ps, "BP", NAVY, o.ps, "middle");
    return { maj: m.maj, zone: [cx - r - 16, cy - r - 10 - ph, 2 * r + 32, 2 * r + 20 + 2 * ph + 12], cx: cx, cy: cy, r: r };
  }

  /* ---------- la trace : la BP au fil du temps (la courbe défile vers la gauche) ----------
     o : { duree (secondes visibles), consigne (0..1, pointillé), zone [p0, p1] (bande verte), etiq, large } */
  function trace(g, c, o) {
    const w = c.w - 16, h = bn(c.h - 96, 110, 250), x = c.x + 8, y = c.y + (c.h - h) / 2 + 14;
    const yp = p => y + h - 14 - bn(p, 0, 1) * (h - 28), xs = (t, tt) => x + w - 14 - (t - tt) / o.duree * (w - 28);
    const gg = el("g", {}, g);
    el("rect", { x: x, y: y, width: w, height: h, rx: 12, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, gg);
    if (o.zone) el("rect", { x: x + 3, y: yp(o.zone[1]), width: w - 6, height: yp(o.zone[0]) - yp(o.zone[1]), fill: "rgba(30,126,84,.25)" }, gg);
    if (o.consigne !== undefined) el("line", { x1: x + 8, x2: x + w - 8, y1: yp(o.consigne), y2: yp(o.consigne), stroke: NAVY, "stroke-width": 3, "stroke-dasharray": "10 8", "stroke-linecap": "round" }, gg);
    const courbe = el("path", { fill: "none", stroke: BLEU, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, gg);
    const point = el("circle", { r: 7, fill: BLEU, stroke: "#fff", "stroke-width": 2.5 }, gg);
    if (o.etiq && o.large) D.pastille(g, x + w / 2, y - 8 - 0.4 * o.ps, "la BP au fil du temps", NAVY, o.ps, "middle");
    const hist = [];
    return { zone: [x - 6, y - 6, w + 12, h + 12], maj: function (p, t) {
      const dern = hist[hist.length - 1];
      if (dern && t < dern[0]) hist.length = 0;
      if (!hist.length || t - hist[hist.length - 1][0] >= 0.08) hist.push([t, p]); else hist[hist.length - 1][1] = p;
      while (hist.length > 2 && t - hist[1][0] > o.duree) hist.shift();
      let d = "";
      hist.forEach((q, i) => { d += (i ? " L " : "M ") + bn(xs(t, q[0]), x + 6, x + w - 6).toFixed(1) + " " + yp(q[1]).toFixed(1); });
      courbe.setAttribute("d", d);
      point.setAttribute("cx", (x + w - 14).toFixed(1)); point.setAttribute("cy", yp(p).toFixed(1));
    } };
  }

  /* ---------- le bilan : ce qu'il faut à l'évaporateur (le trait) contre ce que le détendeur laisse passer (la barre) ---------- */
  function bilan(g, c, etiq, ps) {
    const w = c.w >= 200 ? 90 : 70, h = bn(c.h - 110, 130, 290), x = c.x + (c.w - w) / 2, y = c.y + (c.h - h - 60) / 2 + 6;
    const bas = y + h - 8, hi = h - 16, gg = el("g", {}, g);
    el("rect", { x: x, y: y, width: w, height: h, rx: 12, fill: "#fff", stroke: NAVY, "stroke-width": 4 }, gg);
    const barre = el("rect", { x: x + 8, width: w - 16, fill: CUIVRE }, gg), ecart = el("rect", { x: x + 8, width: w - 16 }, gg);
    const rep = el("line", { x1: x - 16, x2: x + w + 16, stroke: NAVY, "stroke-width": 8, "stroke-linecap": "round" }, gg);
    const verd = etiq ? [["il en manque", AMBRE], ["juste", VERT], ["trop de liquide", ROUGE]].map(v => D.pastille(g, x + w / 2, y + h + 14 + 0.95 * ps, v[0], v[1], ps, "middle")) : [];
    return { zone: [x - 22, y - 8, w + 44, h + 64], maj: function (besoin, ouv) {
      const yO = bas - bn(ouv, 0, 1) * hi, yB = bas - bn(besoin, 0, 1) * hi;
      barre.setAttribute("y", yO.toFixed(1)); barre.setAttribute("height", (bas - yO).toFixed(1));
      ecart.setAttribute("y", Math.min(yO, yB).toFixed(1)); ecart.setAttribute("height", Math.abs(yO - yB).toFixed(1));
      ecart.setAttribute("fill", ouv < besoin ? "rgba(201,69,26,.30)" : "rgba(61,127,202,.38)");
      rep.setAttribute("y1", yB.toFixed(1)); rep.setAttribute("y2", yB.toFixed(1));
      const d = ouv - besoin, choisi = d < -0.04 ? 0 : d > 0.04 ? 2 : 1;      // un seul verdict à la fois (jamais deux pastilles superposées)
      verd.forEach((v, i) => v.setAttribute("opacity", i === choisi ? 1 : 0));
    } };
  }

  /* =====================================================================
     LA COUPE COMPLÈTE : détendeur automatique + évaporateur (DS.coupe), flèches de force, panneau à droite
     opt.panneau : liste parmi "jauge", "trace", "bilan"
     ===================================================================== */
  function construire(svg, W, opt) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const g = el("g", {}, svg), etiq = !opt.accueil, ps = opt.ps;
    const cs = el("svg", { x: 10, y: 0, width: 300, height: H }, g);              // la coupe de la ligne, posée à gauche
    const coupe = DS.coupe("automatique", cs);
    // les deux flèches natives (la BP sous la membrane) sont masquées : on les redessine avec un écart ×3 autour de la consigne
    const natives = [...cs.querySelectorAll('path[fill="' + D.couleur(0.05, false) + '"]')];
    if (natives.length === 2) natives.forEach(p => p.setAttribute("display", "none"));
    const T = tete(el("g", {}, cs));
    // le panneau
    const px0 = 340, pw = W - px0 - 14, large = pw >= 440, mods = opt.panneau, cel = decouper(mods.length, px0, 0, pw, H, large), inst = {};
    mods.forEach((m, i) => {
      if (m === "jauge") inst.jauge = jauge(g, cel[i], { solo: mods.length === 1, marqueur: true, etiq: etiq, large: large, ps: ps });
      if (m === "trace") inst.trace = trace(g, cel[i], { duree: 16, consigne: 0.5, etiq: etiq, large: large, ps: ps });
      if (m === "bilan") inst.bilan = bilan(g, cel[i], etiq, Math.min(ps, 24));
    });
    const ZONES = {
      ressort: [110, 12, 100, 94], vis: [128, 2, 64, 26], membrane: [100, 98, 120, 50], pression: [106, 126, 108, 78],
      manometre: inst.jauge && inst.jauge.zone, trace: inst.trace && inst.trace.zone, bilan: inst.bilan && inst.bilan.zone
    };
    const voir = anneaux(el("g", {}, g), ZONES);
    function maj(e, t, info) {
      e = e || {};
      const c = e.charge === undefined ? 0.5 : e.charge;
      const noms = !info || info.agit == null ? [] : Array.isArray(info.agit) ? info.agit : [info.agit];
      coupe.maj({ charge: c, ouverture: e.ouverture }, t, { agit: noms.find(n => NATIFS.indexOf(n) >= 0) });
      const L = coupe.lire(), bp = e.ecart === undefined ? L.bp : CONS + e.ecart, p = aiguilleP(bp);
      if (inst.jauge) inst.jauge.maj(p);
      if (inst.trace) inst.trace.maj(p, t);
      if (inst.bilan) inst.bilan.maj(DS.besoin(c), L.ouverture);
      T.maj(25 * L.ouverture, 30, CONS, CONS + 4 * (bp - CONS), 0);
      voir(noms.filter(n => ZONES[n]), t);
    }
    return { maj: maj };
  }

  /* =====================================================================
     LE GROS PLAN DE LA TÊTE (exercice) : le ressort, la membrane, la chambre de BP, la vis ; la jauge, la trace
     exo : { n (quarts de tour vissés), p (BP, qualitative), calme, stable, clics, surStable() } — lu et écrit à chaque image
     ===================================================================== */
  function construireReglage(svg, W, exo, ps) {
    svg.setAttribute("viewBox", "0 0 " + W + " " + HR);
    const g = el("g", {}, svg);
    // ----- la tête, en coordonnées de la coupe (décalée d'un coup de translate) -----
    const z = el("g", { transform: "translate(-50 6)" }, g);
    const trait = (d, st, w, extra) => el("path", Object.assign({ d: d, fill: "none", stroke: st, "stroke-width": w, "stroke-linecap": "butt", "stroke-linejoin": "round" }, extra), z);
    el("rect", { x: 80, y: 100, width: 140, height: 140, rx: 12, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2.5 }, z);
    // le raccord de BP : la paroi du tube d'abord, puis son vide, qui traverse la paroi du corps (jamais un trait de mur dans le passage)
    trait("M 96 170 H 50", "#6e3818", 59); trait("M 96 170 H 50", "#bd7a44", 56); trait("M 96 170 H 50", "#e7a978", 47, { opacity: 0.5 });
    trait("M 130 170 H 50", CLAIR, 36);
    el("rect", { x: 95, y: 112, width: 110, height: 114, fill: CLAIR }, z);                   // la chambre de BP, sous la membrane
    el("rect", { x: 95, y: 226, width: 43, height: 12, fill: "#8a6a1f" }, z); el("rect", { x: 162, y: 226, width: 43, height: 12, fill: "#8a6a1f" }, z);   // le siège
    el("rect", { x: 138, y: 226, width: 24, height: 14, fill: CLAIR }, z);
    el("path", { d: "M 87 112 V 70 Q 87 8 150 8 Q 213 8 213 70 V 112 Z", fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2.5 }, z);     // la tête
    const mols = el("g", { transform: "scale(0.6)" }, z), rr = D.alea(37), M = [];
    for (let i = 0; i < 10; i++) M.push({ u: rr(), v: rr(), ph: rr() * 6.28, maj: D.mol(mols) });
    const tige = el("rect", { x: 148, width: 4, fill: "#3f4a55" }, z);
    const TE = tete(z);
    el("rect", { x: 134, y: 0, width: 32, height: 12, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, z);   // la tête de la vis
    // ----- la vis vue de dessus : elle tourne par quarts de tour -----
    const kx = 215, ky = 120, kr = 30;
    const vis = el("g", { transform: "translate(" + kx + " " + ky + ")" }, g);
    [0, 90, 180, 270].forEach(a => el("line", { x1: 0, x2: 0, y1: -kr - 7, y2: -kr - 17, stroke: NAVY, "stroke-width": 5, "stroke-linecap": "round", transform: "rotate(" + a + ")" }, vis));
    el("circle", { r: kr, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, vis);
    const fente = el("g", {}, vis);
    el("line", { x1: 0, x2: 0, y1: -kr + 6, y2: kr - 6, stroke: "#24384f", "stroke-width": 8, "stroke-linecap": "round" }, fente);
    el("circle", { cy: -kr + 10, r: 4, fill: "#fff" }, fente);
    D.pastille(g, kx, ky + kr + 24 + 0.95 * ps, "vis", NAVY, ps, "middle");
    // ----- la jauge, avec la BP demandée en vert ; la trace si la place le permet -----
    const gx = 345, J = jauge(g, { x: gx - 100, y: 0, w: 200, h: HR }, { zone: ZONE, etiq: true, large: false, solo: false, ps: ps });
    const large = W >= 740, T = large ? trace(g, { x: 455, y: 0, w: W - 465, h: HR }, { duree: 18, zone: ZONE, etiq: true, large: true, ps: ps }) : null;
    let tPrec = 0, rot = 0, nl = 0;
    function maj(e, t) {
      const dt = bn(t - tPrec, 0, 0.1); tPrec = t;
      const pT = bn(P0 + PAS * e.n, 0.02, 0.98);
      if (e.p === undefined) e.p = pT;
      e.p += (pT - e.p) * (1 - Math.exp(-dt / TAU));                     // l'aiguille met du temps : il faut laisser stabiliser
      if (Math.abs(pT - e.p) > 0.006) { e.calme = 0; e.stable = false; }
      else { e.calme += dt; if (!e.stable && e.calme > 0.7) { e.stable = true; if (e.clics > 0 && e.surStable) e.surStable(); } }
      rot += (90 * e.n - rot) * (1 - Math.exp(-dt / 0.18)); nl = rot / 90;
      const p = e.p, dm = bn(10 + 80 * (pT - p), 2, 25), ym = 112 + dm, yt = bn(30 + 2.4 * nl, 24, 90);
      tige.setAttribute("y", ym.toFixed(1)); tige.setAttribute("height", (240 - ym).toFixed(1));
      // plus on visse, plus le plateau descend, plus le ressort est comprimé et plus il pousse ; la BP monte pour le rattraper
      TE.maj(dm, yt, 0.6 + 1.2 * (pT - 0.5), 0.6 + 1.2 * (p - 0.5), rot);
      const n = Math.round(2 + 8 * p);
      M.forEach((m, i) => { const x = 104 + m.u * 92 + 4 * Math.sin(t * 1.7 + m.ph), y = 124 + m.v * 90 + 4 * Math.sin(t * 2.1 + m.ph); m.maj(x / 0.6, y / 0.6, 0.12, true, i < n ? 0.9 : 0); });
      fente.setAttribute("transform", "rotate(" + rot.toFixed(1) + ")");
      J.maj(p); if (T) T.maj(p, t);
    }
    return { maj: maj };
  }

  /* ---------- monter : un <svg> qui se redessine selon la largeur disponible (hauteur fixe) ---------- */
  function monter(hote, opt) {
    const svg = DS.svg(hote, "ds-svg au-svg", opt.aria), reglage = !!opt.exo;
    let W = 0, inst = null, e = opt.exo || {}, t = 0, info = null;
    const bati = () => {
      const r = svg.getBoundingClientRect(), Hh = reglage ? HR : H;
      const ratio = r.width > 40 && r.height > 40 ? r.width / r.height : 2.4;
      const w = Math.round(bn(Hh * ratio, reglage ? 460 : 580, reglage ? 880 : 1000) / 20) * 20;
      if (w === W) return;
      // les pastilles gardent à peu près la même taille À L'ÉCRAN (≈ 17 px), quelle que soit l'échelle du dessin
      const echelle = r.width > 40 && r.height > 40 ? Math.min(r.width / w, r.height / Hh) : 0.7, ps = bn(Math.round(17 / echelle), 14, 34);
      W = w; svg.textContent = ""; inst = reglage ? construireReglage(svg, W, opt.exo, ps) : construire(svg, W, Object.assign({ ps: ps }, opt)); inst.maj(e, t, info);
    };
    if (window.ResizeObserver) new ResizeObserver(bati).observe(svg);
    bati();
    return { svg: svg, maj: function (ee, tt, ii) { e = ee; t = tt; info = ii; if (inst) inst.maj(ee, tt, ii); } };
  }
  G.monter = monter;

  /* un cadre pour la scène + la légende des forces dessous (HTML, jamais sur un tracé) */
  function cadre(dessin) { const c = document.createElement("div"); c.className = "au-cadre"; dessin.append(c, legende()); return c; }
  const ARIA_COUPE = "Coupe d’un détendeur automatique devant son évaporateur : un ressort pousse la membrane vers le bas pour ouvrir, la pression de l’évaporateur la pousse vers le haut pour fermer. À droite, un manomètre de basse pression avec le repère de la consigne.";

  /* ---------- le sommaire : la charge varie doucement, le détendeur suit sa pression et se trompe ---------- */
  G.accueil = function (hote) {
    DS.fond(hote);
    const sc = monter(hote, { accueil: true, panneau: ["jauge", "bilan"], aria: ARIA_COUPE });
    DS.animer(hote, t => sc.maj({ charge: 0.5 + 0.34 * Math.sin(t * 0.42), ecart: 0.05 * Math.cos(t * 0.42) }, t, null));   // la BP ne s'écarte qu'un peu, la nappe, elle, change
  };

  /* ---------- écran 1 : la carte d'identité, avec sa visite guidée (ressort, pression, aiguille, jauge) ---------- */
  const VISITE = [
    [["ressort", "vis"], "Le ressort pousse la membrane vers le bas : il veut ouvrir. La vis règle sa force."],
    ["pression", "La pression de l’évaporateur pousse la membrane vers le haut : elle veut fermer."],
    ["aiguille", "L’aiguille suit la membrane : elle ouvre ou ferme le passage du liquide."],
    ["manometre", "Il garde la BP au repère ▼ : c’est la pression d’évaporation qu’il règle."]
  ];
  G.legende = legende;
  G.identite = function (hote, symbole) {
    const carte = document.createElement("div"); carte.className = "au-carte";
    carte.innerHTML = '<div class="au-tete"><img src="' + symbole + '" alt="Symbole du détendeur automatique : vanne à pression constante"><b>Détendeur automatique</b></div>' +
      '<div class="au-droite"><div class="ds-dessin"></div>' + LEGENDE + '<p class="ds-explic" aria-live="off"></p></div>' +
      '<div class="au-lignes"><p class="ds-regle">il règle : <strong>la pression d’évaporation</strong></p><p class="au-trouve">on le trouve surtout sur les <strong>machines à glace en écailles</strong></p></div>';
    hote.appendChild(carte);
    const dessin = carte.querySelector(".ds-dessin"), explic = carte.querySelector(".ds-explic");
    DS.fond(dessin);
    const sc = monter(dessin, { panneau: ["jauge"], aria: ARIA_COUPE });
    let dernier = -1;
    DS.animer(hote, t => {
      const i = Math.floor(t / 3.8) % VISITE.length;
      if (i !== dernier) { dernier = i; explic.innerHTML = "<strong>" + (i + 1) + ".</strong> " + VISITE[i][1]; }
      sc.maj({ charge: 0.5 }, t, { agit: VISITE[i][0] });
    });
  };

  /* ---------- écran 2 : la balance ressort / pression, pas à pas (la BP vient de la jauge) ---------- */
  G.balance = function (hote) {
    return DS.jouer(hote, {
      init: { charge: 0.5, ouverture: 0.06 },
      etapes: [
        { nom: "La BP est sous la consigne", dire: "Le ressort pousse plus fort que la pression : l’aiguille est à gauche du repère ▼.", cible: {}, agit: "manometre", duree: 2.8 },
        { nom: "La membrane descend", dire: "Le ressort gagne : il pousse la membrane vers le bas.", cible: { ouverture: 0.2 }, agit: "membrane", duree: 3 },
        { nom: "Le clapet ouvre", dire: "L’aiguille descend : le liquide passe et bout. La BP remonte, un peu au-dessus de la consigne.", cible: { ouverture: 0.62 }, agit: "aiguille", duree: 3.4 },
        { nom: "Il referme : équilibre", dire: "La pression gagne un peu : le clapet se referme à moitié. Ressort et pression s’équilibrent, la BP reste à la consigne.", cible: { ouverture: 0.5 }, agit: ["membrane", "manometre"], duree: 3.6 }
      ],
      construire: function (dessin) { const c = cadre(dessin); return monter(c, { panneau: ["jauge", "trace"], aria: ARIA_COUPE }).maj; }
    });
  };

  /* ---------- écran 3 : et si la charge monte ? puis baisse ? (l'écran clé) ---------- */
  G.charge = function (hote) {
    return DS.jouer(hote, {
      init: { charge: 0.5, ouverture: 0.5, ecart: 0 },
      etapes: [
        { nom: "Charge normale", dire: "La BP est à la consigne. La nappe s’arrête juste avant la sortie. Barre : ce qui passe. Trait : ce qu’il faut.", cible: {}, agit: ["evaporateur", "bilan"], duree: 2.6 },
        { nom: "La charge monte", dire: "Plus de chaleur : le liquide bout plus vite, la BP monte un peu au-dessus de la consigne.", cible: { charge: 1, ecart: 0.08 }, agit: ["evaporateur", "manometre"], duree: 3.2 },
        { nom: "Il ferme", dire: "La pression gagne sur le ressort : il ferme. La BP revient à la consigne et y reste.", cible: { ouverture: 0.2, ecart: 0 }, agit: "aiguille", duree: 3 },
        { nom: "L’évaporateur manque de liquide", dire: "La BP est bonne, mais la nappe est courte : il manque du liquide juste quand il en faudrait plus.", cible: {}, agit: ["evaporateur", "bilan"], duree: 2.8 },
        { nom: "La charge baisse", dire: "Moins de chaleur : la BP descend un peu sous la consigne.", cible: { charge: 0.15, ecart: -0.08 }, agit: ["evaporateur", "manometre"], duree: 3.2 },
        { nom: "Il ouvre : du liquide file", dire: "Le ressort gagne : il ouvre, la BP revient à la consigne. Mais la nappe file à la sortie : retour de liquide possible.", cible: { ouverture: 0.72, ecart: 0 }, agit: ["aiguille", "evaporateur"], duree: 3.4 }
      ],
      construire: function (dessin) { const c = cadre(dessin); return monter(c, { panneau: ["jauge", "bilan"], aria: ARIA_COUPE }).maj; }
    });
  };

  /* ---------- écran 4 : régler la consigne ; `exo` est lu et écrit à chaque image (voir app.js) ---------- */
  G.reglage = function (hote, exo) {
    DS.fond(hote);
    const sc = monter(hote, { exo: exo, aria: "Gros plan sur la tête du détendeur automatique : la vis, le ressort, la membrane et la chambre de basse pression ; à droite, un manomètre avec un arc vert qui marque la BP demandée, et la courbe de la BP au fil du temps. La vis tourne par quarts de tour." });
    DS.animer(hote, t => sc.maj(exo, t, null));
    return sc;
  };
  G.P0 = P0; G.PAS = PAS; G.ZONE = ZONE;
})();
