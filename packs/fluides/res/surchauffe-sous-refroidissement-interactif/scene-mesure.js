/* =====================================================================
   scene-mesure.js — surchauffe-sous-refroidissement-interactif : les deux
   mesures sur le circuit et leurs segments sur le diagramme enthalpique
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, pilote) : le dessin
   vivant du module, au-dessus de l'activité de chaque étape. À gauche, la
   ligne liquide (HP) : le liquide coule, plein ; à droite, l'aspiration
   (BP) : la vapeur file. Sur chaque ligne, le manomètre (on lit la
   température de saturation SUR sa couronne R-134a) et le thermomètre
   électronique pincé sur le tube (la température réelle). Au centre, le
   diagramme : le sous-refroidissement avant la bulle (HP), la surchauffe
   après la rosée (BP), avec l'écart en K. À chaque étape, la mesure se
   rejoue dans l'ordre du module : manomètre → couronne → sonde → écart.
   LE MODULE N'EST PAS TOUCHÉ : la scène LIT la page (étape courante,
   curseurs, mode du zéotrope) ; app.js ne sait pas qu'elle existe.
   CHIFFRES : seulement ceux du module. Table R-134a et interpolation
   recopiées de app.js (R134A, interpolateTemperature) ; exemple R-407C
   recopié d'updateZeotrope ; valeurs par défaut = celles que la voix et
   les textes du module annoncent (−10 °C / −3 °C / 7 K ; 40 °C / 34 °C /
   6 K ; mission −10 °C et +40 °C). Le cadran est gradué en bar RELATIF,
   comme un vrai manomètre (pression absolue − 1,013).
   INSTRUMENTS (règles de F. Henninot) : le cadran reprend le générateur
   validé (progression-1re-mfer/outils/generer-interro-03-manometres.py :
   bague BP bleue / HP rouge, échelle en bar, couronne du fluide, chiffre
   ôté sous l'aiguille) ; le thermomètre est électronique, pince sur le
   tube, afficheur « °C » (modèle validé mano-thermo-distincts.svg).
   DIAGRAMME : forme du R-134a (tables SimuRézo, comme voyage-diagramme.js),
   schéma sans graduation ; les deux écarts sont AGRANDIS pour être vus
   (à l'échelle, 7 K de surchauffe feraient 4 unités) : la mention
   « écarts agrandis » est écrite sur le dessin. Ni isotherme ni cycle
   inventés : la cloche, les deux isobares, les deux segments.
   RÉEMPLOI, en lecture : jouerezo/moteur/voyage-dessin.js (tubes, nappe,
   reflets, molécules, couleur selon la température, filigrane).
   RÈGLES TENUES : texte jamais sur un tracé ; textes ≥ 20 unités (dessin
   de 1 060 unités affiché à 1 060 px à 1 280 px de large) ; filigrane R9 ;
   le mouvement suit le temps de la page, sans autre condition.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, hote = document.getElementById("scene-lecon");
  if (!hote) return;
  if (!D) { hote.hidden = true; return; } // moteur du Voyage absent : pas de cadre vide
  const NS = "http://www.w3.org/2000/svg", POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  const C = { navy: "#1b3a63", ink: "#22303f", bp: "#1f6fa8", hp: "#b3261e", r134a: "#1d5f99", orange: "#c9451a", vif: "#ff6b35", gris: "#637285", lcd: "#e8f1e5" };
  const ecrire = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 22, "font-family": POLICE, "font-weight": 700, fill: C.navy }, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = ".fr"; }); // cartouche du produit (charte R9)
  const PATM = 1.013;

  /* ---------- les chiffres du module (copies de app.js, à garder identiques) ---------- */
  const R134A = [[1.327, -20], [2.006, -10], [2.928, 0], [4.146, 10], [5.717, 20], [7.702, 30], [10.166, 40], [13.179, 50]];
  function tsat(p) { // = interpolateTemperature(p)
    if (p <= R134A[0][0]) return R134A[0][1];
    if (p >= R134A[R134A.length - 1][0]) return R134A[R134A.length - 1][1];
    for (let i = 1; i < R134A.length; i++) if (p <= R134A[i][0]) { const [pa, ta] = R134A[i - 1], [pb, tb] = R134A[i]; return ta + (p - pa) / (pb - pa) * (tb - ta); }
    return 0;
  }
  function psat(t) { // la même table, lue à l'envers : où poser le trait « t » de la couronne
    for (let i = 1; i < R134A.length; i++) if (t <= R134A[i][1]) { const [pa, ta] = R134A[i - 1], [pb, tb] = R134A[i]; return pa + (t - ta) / (tb - ta) * (pb - pa); }
    return R134A[R134A.length - 1][0];
  }
  const ZEO = { bulle: -10, rosee: -10 + 6.1, tubeVapeur: 2.1, tubeLiquide: -16 }; // = updateZeotrope (R407C_GLIDE 6,1 K)
  const nb = (v, d) => (v < 0 ? "−" : "") + Math.abs(v).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ---------- l'état de la page : étape courante, curseurs (lus, jamais écrits) ---------- */
  function lire() {
    const b = document.querySelector('[data-step][aria-current="step"]'), k = b ? Number(b.dataset.step) : 0;
    const v = s => { const e = document.querySelector(s); return e ? Number(e.value) : null; };
    const st = { k: k, mode: k === 8 ? "zeo" : k === 10 ? "etat" : "mesure", d: 1,
      bp: { p: 2.006, tube: -3, actif: true }, hp: { p: 10.166, tube: 34, actif: true } };
    if (k === 3 || k === 4 || k === 5) st.hp.actif = false; // surchauffe (calcul, utile ou totale, protéger) : le côté BP
    if (k === 6 || k === 7) st.bp.actif = false;          // sous-refroidissement : le côté HP
    if (k === 3 && v("#sh-pressure") !== null) { st.bp.p = v("#sh-pressure") / 10; st.bp.tube = v("#sh-tube"); }
    if (k === 6 && v("#sc-pressure") !== null) { st.hp.p = v("#sc-pressure") / 10; st.hp.tube = v("#sc-tube"); }
    if (k === 11 && v("#mission-sh") !== null) { st.bp.tube = v("#mission-sh"); st.hp.tube = v("#mission-sc"); st.d = 0; } // la mission affiche des entiers
    if (st.mode === "zeo") { const m = document.querySelector(".mode-button.active"); st.zeo = m ? m.dataset.zeotrope : "superheat"; st.bp.actif = st.hp.actif = false; } // l'exemple R-407C est « à pression constante » : ni la BP ni la HP du dessin
    if (st.mode === "etat") { st.delta = v("#state-delta") || 0; st.bp.actif = st.hp.actif = false; }
    st.bp.tsat = k === 11 ? -10 : tsat(st.bp.p); st.hp.tsat = k === 11 ? 40 : tsat(st.hp.p);
    st.sh = st.bp.tube - st.bp.tsat; st.sc = st.hp.tsat - st.hp.tube;
    return st;
  }

  /* ---------- le manomètre (repris du générateur validé : bague, échelle en bar, couronne R-134a) ---------- */
  const CADRANS = { BP: { vmin: -1, vmax: 10, majeurs: [0, 2, 4, 6, 8], pas: [1, 0.5], tmin: -20, tmax: 30, bague: C.bp },
    HP: { vmin: -1, vmax: 30, majeurs: [0, 20], pas: [5, 1], tmin: 20, tmax: 50, bague: C.hp } }; // HP : « 10 » tomberait sur la couronne R-134a (ce qu'on lit ici)
  function manometre(parent, cx, cy, cote) {
    const cfg = CADRANS[cote], R = 104, g = D.el("g", {}, parent);
    const ang = p => -135 + 270 * (p - cfg.vmin) / (cfg.vmax - cfg.vmin);
    const pt = (r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    D.el("circle", { cx: cx, cy: cy, r: R, fill: cfg.bague }, g);
    D.el("circle", { cx: cx, cy: cy, r: R - 7, fill: "#fdfdfb", stroke: C.ink, "stroke-width": 1.5 }, g);
    for (let p = cfg.vmin; p <= cfg.vmax + 1e-6; p += cfg.pas[1]) { // traits de pression (bord du cadran)
      const majeur = Math.abs(p / cfg.pas[0] - Math.round(p / cfg.pas[0])) < 1e-6, [x1, y1] = pt(R - 9, ang(p)), [x2, y2] = pt(R - 9 - (majeur ? 8 : 4), ang(p));
      D.el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), stroke: C.ink, "stroke-width": majeur ? 2.4 : 1.2 }, g);
    }
    const RC = R - 44, demi = (a, l) => Math.abs(Math.sin(a * Math.PI / 180)) * l / 2 + Math.abs(Math.cos(a * Math.PI / 180)) * 10.5; // couronne ; demi-étendue radiale d'une boîte de chiffre
    const pression = cfg.majeurs.map(p => { const l = 11 * String(p).length, [x, y] = pt(R - 9 - 8 - 2 - demi(ang(p), l), ang(p)); return { a: ang(p), x: x, y: y, l: l, e: D.texte(g, x, y + 7, String(p), { "font-size": 21, "font-weight": 700, "font-family": POLICE, fill: C.ink, "text-anchor": "middle" }) }; });
    const aA = ang(psat(cfg.tmin) - PATM), aB = ang(psat(cfg.tmax) - PATM), [xa, ya] = pt(RC, aA), [xb, yb] = pt(RC, aB);
    D.el("path", { d: `M${xa.toFixed(1)} ${ya.toFixed(1)} A${RC} ${RC} 0 ${aB - aA > 180 ? 1 : 0} 1 ${xb.toFixed(1)} ${yb.toFixed(1)}`, fill: "none", stroke: C.r134a, "stroke-width": 1.6 }, g);
    const couronne = [];
    for (let t = cfg.tmin; t <= cfg.tmax; t += 2) { // couronne : un trait tous les 2 °C, un grand tous les 10 °C (tiré de la table du module)
      const a = ang(psat(t) - PATM), dix = t % 10 === 0, [x1, y1] = pt(RC, a), [x2, y2] = pt(RC - (dix ? 7 : 4), a); // traits vers l'intérieur
      D.el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), stroke: C.r134a, "stroke-width": dix ? 2 : 1.1 }, g);
      if (dix) {
        const s = t === 0 ? "0" : (t > 0 && cfg.tmin < 0 ? "+" : t < 0 ? "−" : "") + Math.abs(t), l = 11 * s.length;
        const rn = RC - 7 - 3 - demi(a, l); // la boîte du chiffre s'arrête avant les traits de la couronne
        const [x, y] = pt(rn, a); couronne.push({ a: a, x: x, y: y, l: l, e: D.texte(g, x, y + 7, s, { "font-size": 21, "font-weight": 700, "font-family": POLICE, fill: C.r134a, "text-anchor": "middle" }) });
      }
    }
    D.texte(g, cx, cy + 36, cote, { "font-size": 24, "font-weight": 700, "font-family": "Trebuchet MS, Arial, sans-serif", fill: cfg.bague, "text-anchor": "middle" });
    D.texte(g, cx, cy + 58, "R-134a °C", { "font-size": 21, "font-weight": 700, "font-family": POLICE, fill: C.r134a, "text-anchor": "middle" });
    D.texte(g, cx, cy + 80, "bar", { "font-size": 21, "font-weight": 700, "font-family": POLICE, fill: C.ink, "text-anchor": "middle" });
    const lu = D.el("circle", { r: 7, fill: "none", stroke: C.vif, "stroke-width": 3.5, opacity: 0 }, g); // le trait lu sur la couronne
    const aiguille = D.el("path", { fill: C.orange }, g);
    D.el("circle", { cx: cx, cy: cy, r: 9, fill: "#333" }, g); D.el("circle", { cx: cx, cy: cy, r: 3, fill: "#bbb" }, g);
    const sous = (c, a) => { // l'aiguille (du talon à la pointe, 8 de large) touche-t-elle la boîte du chiffre ?
      const ux = Math.sin(a * Math.PI / 180), uy = -Math.cos(a * Math.PI / 180), dx = c.x - cx, dy = c.y - cy;
      const le = dx * ux + dy * uy, tr = Math.abs(-dx * uy + dy * ux), bu = Math.abs(ux) * c.l / 2 + Math.abs(uy) * 8.5, bn = Math.abs(uy) * c.l / 2 + Math.abs(ux) * 8.5;
      return tr < bn + 1.5 + 4 * Math.max(0, 1 - Math.max(0, le) / (R - 14)) && le > -18 - bu && le < R - 14 + bu; // demi-largeur de l'aiguille : 4 au moyeu, 0 à la pointe
    };
    let pLisse = 0, aVue = null;
    function chiffres(a) { // règle de F. Henninot : on ôte le chiffre sous l'aiguille ; on garde d'abord ceux qui encadrent la lecture, puis ceux qui ne touchent personne
      pression.forEach(c => c.e.setAttribute("opacity", sous(c, a) ? 0 : 1));
      const gardes = [];
      couronne.filter(c => !sous(c, a)).sort((u, v) => Math.abs(((u.a - a + 540) % 360) - 180) - Math.abs(((v.a - a + 540) % 360) - 180))
        .forEach(c => { if (gardes.every(k => Math.abs(c.x - k.x) >= (c.l + k.l) / 2 + 3 || Math.abs(c.y - k.y) >= 22)) gardes.push(c); }); // boîte contre boîte
      couronne.forEach(c => c.e.setAttribute("opacity", gardes.includes(c) ? 1 : 0));
    }
    return function (pCible, lecture) { // pCible en bar relatif ; lecture 0..1 : le trait lu s'allume
      pLisse += (pCible - pLisse) * 0.18;
      const a = ang(Math.max(cfg.vmin, Math.min(cfg.vmax, pLisse))), [xt, yt] = pt(R - 14, a), [xg, yg] = pt(4, a - 90), [xd, yd] = pt(4, a + 90), [xq, yq] = pt(18, a + 180);
      aiguille.setAttribute("d", `M${xt.toFixed(1)} ${yt.toFixed(1)} L${xg.toFixed(1)} ${yg.toFixed(1)} L${xq.toFixed(1)} ${yq.toFixed(1)} L${xd.toFixed(1)} ${yd.toFixed(1)} Z`);
      if (aVue === null || Math.abs(a - aVue) > 0.3) { aVue = a; chiffres(a); }
      const [xl, yl] = pt(RC, a); lu.setAttribute("cx", xl.toFixed(1)); lu.setAttribute("cy", yl.toFixed(1)); lu.setAttribute("opacity", lecture.toFixed(2));
    };
  }

  /* ---------- le thermomètre électronique, pince sur le tube (modèle validé) ---------- */
  function thermometre(parent, x, y, xPince, yTube) {
    const g = D.el("g", {}, parent);
    D.el("path", { d: `M${x + 46} ${y + 104} C${x + 46} ${y + 150} ${xPince} ${yTube - 60} ${xPince} ${yTube - 8}`, fill: "none", stroke: "#0f2440", "stroke-width": 4, "stroke-linecap": "round" }, g);
    D.el("rect", { x: xPince - 9, y: yTube - 10, width: 18, height: 22, rx: 3, fill: C.navy }, g);
    D.el("circle", { cx: xPince, cy: yTube, r: 3, fill: "#84b7ec" }, g);
    D.el("rect", { x: x, y: y, width: 92, height: 104, rx: 12, fill: C.navy }, g);
    D.el("rect", { x: x + 7, y: y + 9, width: 78, height: 58, rx: 5, fill: C.lcd, stroke: "#0f2440", "stroke-width": 2 }, g);
    const val = D.texte(g, x + 80, y + 37, "--,-", { "font-size": 24, "font-weight": 700, "font-family": POLICE, fill: C.navy, "text-anchor": "end" });
    D.texte(g, x + 80, y + 61, "°C", { "font-size": 21, "font-weight": 700, "font-family": POLICE, fill: C.navy, "text-anchor": "end" });
    [[20, "#84b7ec"], [46, "#e07a3f"], [72, "#fdfdfb"]].forEach(([dx, f]) => D.el("circle", { cx: x + dx, cy: y + 86, r: 7, fill: f }, g));
    return s => { if (val.textContent !== s) val.textContent = s; };
  }

  /* ---------- le diagramme (cloche du R-134a, deux isobares, deux segments) ---------- */
  const CLOCHE = [[1.27, 172.3, 385.9], [1.498, 177.3, 388.3], [1.767, 182.5, 390.7], [2.085, 188, 393.3], [2.459, 193.7, 395.8], [2.9, 199.6, 398.4], [3.421, 205.9, 401.1], [4.035, 212.5, 403.9], [4.759, 219.4, 406.6], [5.613, 226.6, 409.4], [6.621, 234.3, 412.2], [7.809, 242.4, 415.1], [9.211, 251, 417.8], [10.864, 260.2, 420.5], [12.814, 269.9, 423], [15.114, 280.3, 425.3], [17.827, 291.6, 427.3], [21.027, 303.8, 428.6], [24.801, 317.2, 429], [29.253, 332.2, 427.8], [34.504, 350.1, 423]];
  const PCRIT = [40.593, 390.4], H0 = 140, H1 = 500, P0 = 1.2, P1 = 55;
  const DX = 316, PX0 = 374, PX1 = 664, PY0 = 50, PY1 = 226, K_AGRANDI = 3.2; // K_AGRANDI : unités de dessin par kelvin, sur les deux écarts
  const X = h => PX0 + (h - H0) / (H1 - H0) * (PX1 - PX0), Y = p => PY1 - Math.log10(p / P0) / Math.log10(P1 / P0) * (PY1 - PY0);
  const pAt = y => P0 * Math.pow(10, (PY1 - y) / (PY1 - PY0) * Math.log10(P1 / P0)); // la pression à la hauteur y du dessin
  const cote = (p, i) => { // h de bulle (i = 1) ou de rosée (i = 2) à la pression p, sur la cloche
    for (let k = 1; k < CLOCHE.length; k++) if (p <= CLOCHE[k][0]) { const a = CLOCHE[k - 1], b = CLOCHE[k], f = Math.log(p / a[0]) / Math.log(b[0] / a[0]); return a[i] + f * (b[i] - a[i]); }
    return CLOCHE[CLOCHE.length - 1][i];
  };
  function diagramme(parent) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: DX + 2, y: 2, width: 424, height: 296, rx: 16, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    marquer(D.filigrane(g, [[528, 160]], 210));
    ecrire(g, 528, 30, "Le diagramme enthalpique", { "font-size": 23, "text-anchor": "middle" });
    const d = "M " + CLOCHE.map(r => X(r[1]).toFixed(1) + "," + Y(r[0]).toFixed(1)).join(" L ") + " L " + X(PCRIT[1]).toFixed(1) + "," + Y(PCRIT[0]).toFixed(1) + " L " + CLOCHE.slice().reverse().map(r => X(r[2]).toFixed(1) + "," + Y(r[0]).toFixed(1)).join(" L ");
    const fond = D.el("path", { d: d, fill: "rgba(47,111,184,.10)", stroke: "#2f6fb8", "stroke-width": 3 }, g);
    D.el("path", { d: `M${PX0} ${PY1 + 4} V${PY0 - 6} m-7 12 l7 -12 l7 12`, fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, g);
    D.el("path", { d: `M${PX0 - 4} ${PY1} H${PX1 + 8} m-12 -7 l12 7 l-12 7`, fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, g);
    const axeP = ecrire(g, 0, 0, "pression", { "text-anchor": "middle", "font-size": 21 }); axeP.setAttribute("transform", `translate(${PX0 - 14} ${(PY0 + PY1) / 2}) rotate(-90)`);
    ecrire(g, (PX0 + PX1) / 2, 256, "énergie de 1 kg (enthalpie h)", { "text-anchor": "middle", "font-size": 21 });
    ecrire(g, 736, 288, "écarts agrandis", { "text-anchor": "end", "font-size": 21, fill: C.gris, "font-weight": 600 });
    ecrire(g, 392, 82, "liquide", { fill: "#2f6fb8" }); ecrire(g, 708, 80, "vapeur", { fill: "#2f6fb8", "text-anchor": "end" });
    const isob = (coul, nom) => { const gi = D.el("g", {}, g); const l = D.el("line", { x1: PX0, x2: PX1, stroke: coul, "stroke-width": 2, "stroke-dasharray": "6 6", opacity: 0.8 }, gi); const t = ecrire(gi, PX1 + 10, 0, nom, { fill: coul }); return (p, op, nomme) => { const y = Y(p).toFixed(1); l.setAttribute("y1", y); l.setAttribute("y2", y); t.setAttribute("y", (Y(p) + 8).toFixed(1)); t.setAttribute("opacity", nomme === false ? 0 : 1); gi.setAttribute("opacity", op); }; };
    const isoBP = isob(C.navy, "BP"), isoHP = isob(C.orange, "HP");
    // les segments (dessinés progressivement), leurs points, leurs mots
    const seg = (coul, l) => D.el("line", { stroke: coul, "stroke-width": l || 7, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "100 100" }, g);
    const plateau = D.el("line", { "stroke-width": 7, "stroke-linecap": "round", opacity: 0 }, g); // zéotrope / état saturé : tout le palier
    const gid = "sr-glisse-" + Math.random().toString(36).slice(2, 7), grad = D.el("linearGradient", { id: gid, gradientUnits: "userSpaceOnUse" }, g);
    [[0, "#2f6fb8"], [1, "#9fc3e6"]].forEach(([o, c]) => D.el("stop", { offset: o, "stop-color": c }, grad));
    const segSC = seg("#2f6fb8"), segSH = seg(C.vif), faux = seg("#c0392b", 4); faux.setAttribute("stroke-dasharray", "8 7");
    const point = c => D.el("circle", { r: 6.5, fill: c, stroke: "#fffdf8", "stroke-width": 2 }, g);
    const pBulle = point(C.navy), pRosee = point(C.navy), pSC = point("#2f6fb8"), pSH = point(C.vif);
    const mot = at => ecrire(g, 0, 0, "", at);
    const motBulle = mot({ "text-anchor": "start" }), motRosee = mot({ "text-anchor": "end" }), ecartSC = mot({ "text-anchor": "end", fill: "#2f6fb8" }), ecartSH = mot({ "text-anchor": "start", fill: C.orange });
    const motFaux = mot({ "text-anchor": "middle", fill: "#c0392b", "font-size": 21 });
    const poser = (e, x, y, s, op) => { e.setAttribute("x", x.toFixed(1)); e.setAttribute("y", y.toFixed(1)); if (e.textContent !== s) e.textContent = s; e.setAttribute("opacity", op); };
    const placer = (c, x, y, op) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); c.setAttribute("opacity", op); };
    const ligne = (l, x1, x2, y, trace, op) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y1", y.toFixed(1)); l.setAttribute("y2", y.toFixed(1)); l.setAttribute("stroke-dashoffset", (100 * (1 - trace)).toFixed(1)); l.setAttribute("opacity", op); };
    const borne = x => Math.max(PX0 + 6, Math.min(PX1 - 6, x));
    return function (st, trace, ecrit) { // trace 0..1 : les segments se dessinent ; ecrit 0..1 : les écarts s'écrivent
      [plateau, faux, motFaux].forEach(e => e.setAttribute("opacity", 0));
      if (st.mode === "mesure") {
        const pB = st.bp.p, pH = st.hp.p, yB = Y(pB), yH = Y(pH), xR = X(cote(pB, 2)), xBu = X(cote(pH, 1));
        const oB = st.bp.actif ? 1 : 0.3, oH = st.hp.actif ? 1 : 0.3;
        isoBP(pB, oB); isoHP(pH, oH);
        const xSH = borne(xR + K_AGRANDI * Math.max(0, st.sh)), xSC = borne(xBu - K_AGRANDI * Math.max(0, st.sc));
        const okSH = st.sh >= 0, okSC = st.sc >= 0;
        ligne(segSH, xR, xSH, yB, okSH ? trace : 0, oB); ligne(segSC, xBu, xSC, yH, okSC ? trace : 0, oH);
        placer(pRosee, xR, yB, oB); placer(pBulle, xBu, yH, oH);
        placer(pSH, xSH, yB, okSH ? oB * trace : 0); placer(pSC, xSC, yH, okSC ? oH * trace : 0);
        poser(motRosee, xR - 9, yB - 9, "rosée", oB); poser(motBulle, xBu + 9, yH + 25, "bulle", oH);
        const tSH = okSH ? nb(st.sh, st.d) + " K" : "incohérent", tSC = okSC ? nb(st.sc, st.d) + " K" : "incohérent";
        poser(ecartSH, Math.max(xSH + 8, X(cote(pAt(yB - 25), 2)) + 8), yB - 30, tSH, oB * ecrit); // au-dessus de la BP, à droite de la cloche
        poser(ecartSC, Math.max(PX0 + 8 + 11 * tSC.length, Math.min(xSC - 8, X(cote(pAt(yH - 5), 1)) - 8)), yH - 10, tSC, oH * ecrit); // au-dessus de la HP, à gauche de la cloche
        return;
      }
      // zéotrope (R-407C, exemple du module à pression constante) et état : un seul palier, à la pression BP du dessin
      const p = 8, y = Y(p), xBu = X(cote(p, 1)), xR = X(cote(p, 2)), finRosee = X(cote(pAt(y + 29), 2)) - 8;
      isoBP(p, 1, false); isoHP(10.166, 0);
      [segSC, segSH, pSC, pSH].forEach(e => e.setAttribute("opacity", 0));
      placer(pBulle, xBu, y, 1); placer(pRosee, xR, y, 1);
      if (st.mode === "zeo") {
        grad.setAttribute("x1", xBu); grad.setAttribute("x2", xR);
        ligne(plateau, xBu, xR, y, 1, 1); plateau.setAttribute("stroke", `url(#${gid})`); // le glissement : la température monte le long du palier
        poser(motBulle, xBu + 6, y + 24, "bulle", 1); poser(motRosee, Math.min(xR - 8, finRosee), y + 24, "rosée", 1); // les températures sont dans la carte du module, juste dessous
        if (st.zeo === "superheat") {
          const xM = borne(xR + K_AGRANDI * (ZEO.tubeVapeur - ZEO.rosee));
          ligne(segSH, xR, xM, y, trace, 1); placer(pSH, xM, y, trace);
          poser(ecartSH, Math.max(xM + 8, X(cote(pAt(y - 25), 2)) + 8), y - 30, nb(ZEO.tubeVapeur - ZEO.rosee, 1) + " K", ecrit);
          ligne(faux, xBu, xM, y - 10, trace, ecrit); poser(motFaux, Math.max((xBu + xR) / 2, X(cote(pAt(y - 37), 1)) + 4 + 33), y - 20, nb(ZEO.tubeVapeur - ZEO.bulle, 1) + " K", ecrit); // la mauvaise colonne (le module l'écrit en toutes lettres juste dessous)
          poser(ecartSC, 0, 0, "", 0);
        } else {
          const xM = borne(xBu - K_AGRANDI * (ZEO.bulle - ZEO.tubeLiquide));
          ligne(segSC, xBu, xM, y, trace, 1); placer(pSC, xM, y, trace);
          const tSC = nb(ZEO.bulle - ZEO.tubeLiquide, 1) + " K";
          poser(ecartSC, Math.max(PX0 + 8 + 11 * tSC.length, Math.min(xM - 8, X(cote(pAt(y - 5), 1)) - 8)), y - 10, tSC, ecrit);
          ligne(faux, xM, xR, y - 10, trace, ecrit); poser(motFaux, Math.max((xBu + xR) / 2, X(cote(pAt(y - 37), 1)) + 4 + 33), y - 20, nb(ZEO.rosee - ZEO.tubeLiquide, 1) + " K", ecrit);
          poser(ecartSH, 0, 0, "", 0);
        }
        return;
      }
      // état (étape 11) : sous la saturation, un point dans le liquide ; à la saturation, tout le palier ; au-dessus, un point dans la vapeur
      const dl = st.delta, xM = dl < 0 ? borne(xBu + K_AGRANDI * dl) : borne(xR + K_AGRANDI * dl);
      poser(motBulle, xBu + 6, y + 24, "bulle", 1); poser(motRosee, Math.min(xR - 8, finRosee), y + 24, "rosée", 1);
      ligne(plateau, xBu, xR, y, 1, dl === 0 ? 1 : 0); plateau.setAttribute("stroke", C.vif);
      placer(dl < 0 ? pSC : pSH, xM, y, dl === 0 ? 0 : 1);
      poser(ecartSH, 0, 0, "", 0); poser(ecartSC, 0, 0, "", 0);
    };
  }

  /* ---------- une ligne du circuit : le tube, ce qui y coule, le manomètre et le thermomètre ---------- */
  function ligneMesure(parent, o) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: o.xMano - 7, y: 204, width: 14, height: 30, fill: "url(#vm-acier-h)" }, g); // la tige du manomètre
    D.el("rect", { x: o.xMano - 15, y: 210, width: 30, height: 13, rx: 3, fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, g); // le raccord
    const interieur = D.tube(g, o.x0, 234, o.x1 - o.x0, 40, "cuivre", false, "#f4f8fc");
    D.el("rect", { x: o.xMano - 13, y: 226, width: 26, height: 14, rx: 3, fill: C.navy }, g); // la prise de pression sur le tube
    const flux = D.el("g", {}, g);
    let maj;
    if (o.liquide) { // le liquide se voit liquide : tube plein, des reflets qui filent
      interieur.setAttribute("fill", D.couleur(0.48, false)); interieur.setAttribute("opacity", 0.9);
      const reflets = D.courant(flux, o.x0, o.x1, 244, 264, 7, 17);
      maj = t => reflets(t, -46);
    } else { // la vapeur : des molécules séparées qui filent
      const KM = 0.5, mols = D.el("g", { transform: `scale(${KM})` }, flux), r = D.alea(23), M = [];
      for (let i = 0; i < 16; i++) M.push({ s: r(), v: r(), maj: D.mol(mols) });
      maj = t => M.forEach(m => { const x = o.x0 + 8 + D.frac(m.s + t * 46 / (o.x1 - o.x0)) * (o.x1 - o.x0 - 16); m.maj(x / KM, (248 + m.v * 10) / KM, 0.14, true, D.borne(Math.min(x - o.x0, o.x1 - x) / 24, 0, 1)); });
    }
    const mano = manometre(g, o.xMano, 106, o.cote);
    const thermo = thermometre(g, o.xThermo, 40, o.xPince, 254);
    ecrire(g, o.xNom, 296, o.nom, { fill: o.cote === "BP" ? C.bp : C.hp, "text-anchor": o.ancre });
    return { g: g, maj: maj, mano: mano, thermo: thermo };
  }

  /* ---------- la pose ---------- */
  const dessins = document.createElement("div");
  dessins.className = "scene-dessins";
  hote.appendChild(dessins);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "scene-mesure"); svg.setAttribute("viewBox", "0 0 1060 300"); svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Animation : à gauche, la ligne liquide côté haute pression, à droite l'aspiration côté basse pression, chacune avec son manomètre et son thermomètre à pince ; au centre, le diagramme enthalpique avec le sous-refroidissement avant la bulle et la surchauffe après la rosée.");
  dessins.appendChild(svg);
  const defs = document.createElementNS(NS, "svg"); // dégradés métal et petite molécule, une fois pour la page
  defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.setAttribute("aria-hidden", "true");
  defs.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
  D.defs(defs); document.body.appendChild(defs);
  const racine = D.el("g", {}, svg);
  const HP = ligneMesure(racine, { cote: "HP", liquide: true, x0: 0, x1: 308, xMano: 104, xThermo: 214, xPince: 270, xNom: 4, ancre: "start", nom: "ligne liquide · HP" });
  const BP = ligneMesure(racine, { cote: "BP", liquide: false, x0: 752, x1: 1060, xMano: 956, xThermo: 754, xPince: 790, xNom: 1056, ancre: "end", nom: "aspiration · BP" });
  const rendreDiagramme = diagramme(racine);
  const barre = document.createElement("div");
  barre.className = "scene-barre";
  barre.innerHTML = '<button type="button" class="scene-rejouer">↻ Rejouer la mesure</button><p class="scene-legende"></p>';
  hote.appendChild(barre);
  const legende = barre.querySelector(".scene-legende");
  const PHRASES = ["<strong>1 · Manomètre</strong> — il donne la pression.", "<strong>2 · Couronne R-134a</strong> — sous l’aiguille, la température de saturation.",
    "<strong>3 · Sonde</strong> — pincée sur le tube, la température réelle.", "<strong>4 · Écart en K</strong> — surchauffe après la rosée, sous-refroidissement avant la bulle."];
  const PHRASE_ZEO = "<strong>R-407C</strong> — rosée pour la surchauffe, bulle pour le sous-refroidissement.";
  const PHRASE_ETAT = "<strong>À pression fixée</strong> — sous la saturation : liquide ; au-dessus : vapeur.";
  let t = 0, tau = 0, avant = 0, etapeVue = -1, cle = "", phraseVue = "";
  barre.querySelector(".scene-rejouer").addEventListener("click", () => { tau = 0; });
  function boucle(now) {
    const dt = avant ? Math.min(0.1, (now - avant) / 1000) : 0;
    avant = now;
    if (hote.getClientRects().length) {
      t += dt; tau += dt;
      const st = lire();
      if (st.k !== etapeVue || (st.zeo || "") !== cle) { etapeVue = st.k; cle = st.zeo || ""; tau = 0; } // nouvelle étape : la mesure se rejoue
      const n = D.lisse(tau / 1.2), lecture = D.lisse((tau - 1.2) / 0.4), sonde = tau >= 1.9, trace = D.lisse((tau - 2.5) / 1), ecrit = D.lisse((tau - 3.3) / 0.4);
      const mesure = st.mode === "mesure";
      [[HP, st.hp], [BP, st.bp]].forEach(([L, c]) => {
        L.maj(t);
        L.g.setAttribute("opacity", c.actif ? 1 : 0.32);
        L.mano(mesure ? n * (c.p - PATM) : 0, mesure ? lecture : 0);
        L.thermo(!mesure ? "--,-" : sonde ? nb(c.tube, st.d) : "--,-");
      });
      rendreDiagramme(st, mesure || st.mode === "zeo" ? trace : 1, mesure || st.mode === "zeo" ? ecrit : 1);
      const phrase = st.mode === "zeo" ? PHRASE_ZEO : st.mode === "etat" ? PHRASE_ETAT : PHRASES[tau < 1.2 ? 0 : tau < 1.9 ? 1 : tau < 2.5 ? 2 : 3];
      if (phrase !== phraseVue) { phraseVue = phrase; legende.innerHTML = phrase; }
    }
    requestAnimationFrame(boucle);
  }
  requestAnimationFrame(boucle);
})();
