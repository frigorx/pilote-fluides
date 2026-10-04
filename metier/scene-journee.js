/* =====================================================================
   metier/scene-journee.js — « Une journée type » : la première scène,
   DIAGNOSTIQUER UNE PANNE, dessinée et animée pas à pas
   ---------------------------------------------------------------------
   Page : metier.html, en tête de la section « Une journée type » (#journee).
   Hôte : <figure class="scene-journee" data-scene-journee="diagnostiquer"></figure>
   La scène suit le premier moment que la page raconte, dans son ordre :
   « Diagnostiquer une panne : écouter le client, écouter la machine,
   mesurer. Puis comparer aux valeurs attendues — pas à une impression. »
   Quatre étapes : écouter le client · écouter la machine · mesurer ·
   comparer. Le technicien (à gauche) pose la question de l'étape ; le
   plateau (à droite) montre ce qu'il voit, entend, mesure.

   RÉEMPLOI, en lecture (aucun de ces fichiers n'est modifié) :
   · SceneKit (cartoclim/stations/_commun/scene-kit.js) : le pas à pas,
     « ▶ Dérouler » ;
   · VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) : tube cuivre en
     relief, molécules de vapeur, ventilateur, filigrane R9 ;
   · le technicien et le client : le bonhomme « plein » de HoCourant
     (option B, décision de F. Henninot du 30/09/2026), recopié tel quel
     de legislation/scenes/fluidique.js, comme dans les onze scènes de la
     Législation ;
   · le manomètre BP à couronne R-134a et le thermomètre électronique à
     pince : recopiés tels quels de packs/fluides/res/surchauffe-sous-
     refroidissement-interactif/scene-mesure.js (instruments aux règles
     de F. Henninot : bague BP bleue, échelle en bar, couronne du fluide,
     chiffre ôté sous l'aiguille ; thermomètre jamais jumeau du
     manomètre, unité portée comme le vrai appareil).
   CHIFFRES : R-134a ; BP 1,0 bar relatif = 2,006 bar absolus : le fluide
   bout à −10 °C (table du module surchauffe) ; tube à +6 °C ; surchauffe
   16 K ; plage usuelle 5 à 10 K (tableau « Ce qu'on mesure » de la page,
   HabFluide ch. 7). Surchauffe élevée = évaporateur mal alimenté
   (HabFluide ch. 7) : la scène ne tranche pas la cause.
   RÈGLES TENUES : aucun texte sur un tracé (contrôle navigateur, étape par
   étape, sur tout le cycle) ; textes du dessin ≥ 21 unités (dessin de
   940 unités affiché à 878 px à 1 280 px de large : ≥ 19,6 px) ;
   filigrane R9 derrière tout ; tout bouge par le temps t
   (requestAnimationFrame), sans autre condition que l'interrupteur
   « Animations » du site (panneau Aa, choix explicite du visiteur), qui
   fige chaque étape sur son image finale.
   ===================================================================== */
(function () {
  "use strict";
  const hote = document.querySelector('figure.scene-journee[data-scene-journee="diagnostiquer"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = C.orange;      // l'orange de la charte, assez sombre pour un texte sur papier
  const BLEU_BP = "#1f6fa8";    // la bague du manomètre BP (instrument recopié ci-dessous)
  const PEAU = "#f6d7bd", ENCRE = "#10233c";
  const POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  /* L'interrupteur « Animations » du site (panneau Aa de lisibilite.js, clé inerweb_animations) :
     metier.html ne charge pas moteur/animations.js, la clé est donc lue ici, comme le fait lisibilite.js. */
  const FIGE = window.inerwebAnimations ? window.inerwebAnimations.actives === false
    : (() => { try { return localStorage.getItem("inerweb_animations") === "non"; } catch (e) { return false; } })();

  const ecrire = (parent, x, y, s, taille, at) =>
    D.texte(parent, x, y, s, Object.assign({ "font-size": taille, "font-family": POLICE, fill: ENCRE }, at || {}));
  const voir = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const nb = (v, d) => (v < 0 ? "−" : "") + Math.abs(v).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ---------- le personnage : bonhomme « plein » de HoCourant (recopié de legislation/scenes/fluidique.js) ----------
     Repère : tête en haut (y 0), pieds à y 72, ombre à y 73, regard vers la droite. */
  function bonhomme(parent, o) {
    const g = D.el("g", {}, parent);
    D.el("ellipse", { cx: 0, cy: 73, rx: 13, ry: 2.5, fill: C.navy, opacity: 0.15 }, g);
    const corps = D.el("g", {}, g);
    D.el("path", { d: "M-2 25 L-10 46", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, corps);
    if (o.dossier) {
      D.el("rect", { x: -17, y: 40, width: 12, height: 17, rx: 1.5, fill: C.bleu, stroke: C.navy, "stroke-width": 1.2 }, corps);
      D.el("path", { d: "M-15 44 H-7 M-15 47.5 H-7 M-15 51 H-9", stroke: C.papier, "stroke-width": 1 }, corps);
    }
    D.el("circle", { cx: -10, cy: 47, r: 3.6, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, corps);
    const jg = D.el("g", {}, corps), jd = D.el("g", {}, corps);
    D.el("path", { d: "M-2 48 L-9 71", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, jg);
    D.el("path", { d: "M-10 72 H-3", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, jg);
    D.el("path", { d: "M2 48 L9 71", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, jd);
    D.el("path", { d: "M8 72 H15", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, jd);
    D.el("path", { d: "M-8 24 Q-8 19 -3 19 H3 Q8 19 8 24 V49 H-8 Z", fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, corps);
    D.el("path", { d: "M-8 38 H8", stroke: C.papier, "stroke-width": 3 }, corps);
    D.el("path", { d: "M0 20 V49", stroke: C.navy, "stroke-width": 1.2 }, corps);
    D.el("rect", { x: -2.5, y: 16, width: 5, height: 5, fill: PEAU }, corps);
    D.el("circle", { cx: 0, cy: 10, r: 9, fill: PEAU, stroke: C.navy, "stroke-width": 2.2 }, corps);
    D.el("path", { d: "M-9 9.5 Q-9.5 0.5 0 0.8 Q9 0.5 9 7 Q4 4 -1 4.8 Q-6 5.5 -9 9.5Z", fill: C.navy }, corps);
    if (o.casquette) D.el("path", { d: "M-9.6 8 Q-9.6 -1.2 0 -1 Q9 -0.8 9.4 6 L16 7.2 Q16.5 9 14 9 H-9.6 Z", fill: C.navy }, corps);
    D.el("circle", { cx: -4.5, cy: 11, r: 1.7, fill: PEAU, stroke: C.navy, "stroke-width": 1 }, corps);
    const yeux = [2.5, 6.3].map(x => D.el("ellipse", { cx: x, cy: 10, rx: 1.2, ry: 1.2, fill: ENCRE }, corps));
    D.el("path", { d: "M2.8 14 Q4.8 15.6 6.8 14", stroke: ENCRE, "stroke-width": 1.2, fill: "none", "stroke-linecap": "round" }, corps);
    const bras = D.el("g", {}, corps);
    D.el("path", { d: "M2 24 L12 48", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, bras);
    if (o.carte) {
      D.el("rect", { x: 7, y: 47, width: 16, height: 11, rx: 1.5, fill: ACCENT, stroke: C.navy, "stroke-width": 1 }, bras);
      D.el("path", { d: "M10 51 H20 M10 54.5 H17", stroke: C.papier, "stroke-width": 1 }, bras);
    }
    D.el("circle", { cx: 12.5, cy: 49, r: 3.8, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, bras);
    return function (p) { // p : { x, y, k, t, bras (degrés, 0 = bras pendant) }
      g.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${p.k})`);
      corps.setAttribute("transform", `translate(0 ${(Math.sin(p.t * 2.1) * 0.35).toFixed(2)})`);
      bras.setAttribute("transform", `rotate(${p.bras.toFixed(1)} 2 24)`);
      const ferme = !FIGE && D.frac(p.t / 3.7 + (o.dephasage || 0)) < 0.035;
      yeux.forEach(e => e.setAttribute("ry", ferme ? 0.25 : 1.2));
    };
  }

  /* ---------- les instruments : recopiés tels quels de surchauffe-sous-refroidissement-interactif/scene-mesure.js ----------
     (dans leur propre portée : la palette C de ce module n'est pas celle de SceneKit) */
  const INSTRUMENTS = (function () {
    const C = { navy: "#1b3a63", ink: "#22303f", bp: "#1f6fa8", hp: "#b3261e", r134a: "#1d5f99", orange: "#c9451a", vif: "#ff6b35", gris: "#637285", lcd: "#e8f1e5" };
    const PATM = 1.013;
    const R134A = [[1.327, -20], [2.006, -10], [2.928, 0], [4.146, 10], [5.717, 20], [7.702, 30], [10.166, 40], [13.179, 50]];
    function psat(t) { // la même table, lue à l'envers : où poser le trait « t » de la couronne
      for (let i = 1; i < R134A.length; i++) if (t <= R134A[i][1]) { const [pa, ta] = R134A[i - 1], [pb, tb] = R134A[i]; return pa + (t - ta) / (tb - ta) * (pb - pa); }
      return R134A[R134A.length - 1][0];
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
    return { manometre: manometre, thermometre: thermometre, PATM: PATM, lcd: C.lcd };
  })();

  /* ===== LES QUATRE ÉTAPES (plateau x 318-935, y 30-438 ; à gauche, le technicien et sa question) ===== */

  /* ---------- étape 1 · Écouter le client : sa vitrine ne refroidit plus assez ---------- */
  function client(g) {
    D.el("path", { d: "M318 410 H930", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, g);   // le sol de la boutique
    // la vitrine réfrigérée : le meuble, la vitre bombée sur le plan d'exposition, les produits, l'afficheur
    D.el("rect", { x: 336, y: 300, width: 282, height: 106, rx: 6, fill: "#dfe7ef", stroke: C.navy, "stroke-width": 3 }, g);
    D.el("path", { d: "M352 300 Q346 240 380 214 H606 V300 Z", fill: "#eef5fc", stroke: C.navy, "stroke-width": 2.5 }, g);
    D.el("rect", { x: 372, y: 270, width: 64, height: 30, rx: 9, fill: "#f2c94c", stroke: C.navy, "stroke-width": 2 }, g);       // la meule
    D.el("ellipse", { cx: 404, cy: 272, rx: 29, ry: 6, fill: "#f7dc7f", stroke: C.navy, "stroke-width": 1.5 }, g);
    [452, 482, 512].forEach(x => {                                                                                                   // les pots
      D.el("path", { d: `M${x} 274 H${x + 22} L${x + 19} 300 H${x + 3} Z`, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, g);
      D.el("rect", { x: x - 1, y: 270, width: 24, height: 5, rx: 2, fill: C.bleu }, g);
    });
    D.el("rect", { x: 548, y: 276, width: 48, height: 24, rx: 7, fill: "#e9a9a0", stroke: C.navy, "stroke-width": 2 }, g);         // la terrine
    D.el("path", { d: "M368 292 Q364 250 388 228", fill: "none", stroke: C.papier, "stroke-width": 4, "stroke-linecap": "round", opacity: 0.85 }, g); // reflet de la vitre
    D.el("rect", { x: 374, y: 206, width: 236, height: 10, rx: 3, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2 }, g);         // le couvercle
    D.el("rect", { x: 514, y: 310, width: 92, height: 86, rx: 8, fill: C.navy }, g);                                                // l'afficheur
    D.el("rect", { x: 521, y: 316, width: 78, height: 74, rx: 5, fill: INSTRUMENTS.lcd, stroke: "#0f2440", "stroke-width": 2 }, g);
    const valeur = ecrire(g, 591, 345, "3,0", 24, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    ecrire(g, 591, 377, "°C", 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    // le client, face au technicien (le bonhomme retourné), et ce qu'il dit ; il est commerçant : une blouse
    // claire à la place du gilet à bande du technicien (seules deux couleurs changent, le dessin est celui de HoCourant)
    const miroir = D.el("g", { transform: "scale(-1 1)" }, g);
    const cli = bonhomme(miroir, { dephasage: 0.5 });
    miroir.querySelector('path[fill="#84b7ec"]').setAttribute("fill", "#f4ead8");
    miroir.querySelector('path[d="M-8 38 H8"]').setAttribute("stroke", "#f4ead8");
    const parole = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M654 38 H914 Q928 38 928 52 V144 Q928 158 914 158 H786 L760 194 L760 158 H654 Q640 158 640 144 V52 Q640 38 654 38 Z",
      fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, parole);
    ["Depuis ce matin,", "ma vitrine ne refroidit", "plus assez !"].forEach((s, k) =>
      ecrire(parole, 784, 80 + k * 30, s, 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy }));
    return t => {
      const f = FIGE ? 7 : t % 10, sortie = 1 - D.lisse((f - 9.4) / 0.5);
      voir(parole, D.lisse((f - 0.4) / 0.5) * sortie);
      const v = 3 + 6 * D.lisse((f - 1) / 5) * sortie;   // l'afficheur de la vitrine monte de +3 à +9 °C
      valeur.textContent = nb(v, 1);
      valeur.setAttribute("fill", v > 6 ? C.rouge : C.navy);
      cli({ x: -760, y: 205.6, k: 2.8, t: t, bras: D.courbe([[0, -8], [1.6, -8], [2.3, -45], [8.8, -45], [9.4, -8]], f) });
    };
  }

  /* ---------- étape 2 · Écouter la machine : le compresseur tourne sans s'arrêter ---------- */
  function machine(g) {
    D.el("path", { d: "M318 410 H930", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, g);   // le sol, dehors
    [338, 368].forEach(y => {                                                                    // les deux lignes vers la vitrine
      D.el("path", { d: `M324 ${y} H504`, stroke: "#7a3f1c", "stroke-width": 14, "stroke-linecap": "round" }, g);
      D.el("path", { d: `M324 ${y} H504`, stroke: "#d99a6c", "stroke-width": 8, "stroke-linecap": "round" }, g);
    });
    ecrire(g, 412, 314, "vers la vitrine", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.gris });
    // le groupe de condensation : pieds, carrosserie, ventilateur, compartiment du compresseur
    [528, 806].forEach(x => D.el("rect", { x: x, y: 392, width: 26, height: 16, rx: 3, fill: "#9aa7b5", stroke: C.navy, "stroke-width": 2 }, g));
    D.el("rect", { x: 500, y: 196, width: 360, height: 196, rx: 10, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, g);
    D.el("circle", { cx: 530, cy: 222, r: 8, fill: C.vert, stroke: C.navy, "stroke-width": 2 }, g);   // le voyant « marche »
    const pales = D.ventilateur(g, 600, 294, 76);
    const comp = D.el("g", {}, g);
    D.el("rect", { x: 712, y: 214, width: 128, height: 160, rx: 6, fill: "#dfe7ef", stroke: C.navy, "stroke-width": 2.5 }, comp);
    for (let k = 0; k < 6; k++) D.el("path", { d: `M728 ${240 + k * 22} H824`, stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round", opacity: 0.55 }, comp); // les ouïes
    const lueur = D.el("rect", { x: 705, y: 207, width: 142, height: 174, rx: 9, fill: "none", stroke: ACCENT, "stroke-width": 5, opacity: 0 }, g);
    const arcs = [0, 1, 2].map(k => {                                                           // ce qu'on entend
      const r = 36 + k * 18, a = 38 * Math.PI / 180, x0 = 846, y0 = 294;
      return D.el("path", { d: `M${(x0 + r * Math.cos(a)).toFixed(1)} ${(y0 - r * Math.sin(a)).toFixed(1)} A${r} ${r} 0 0 1 ${(x0 + r * Math.cos(a)).toFixed(1)} ${(y0 + r * Math.sin(a)).toFixed(1)}`,
        fill: "none", stroke: ACCENT, "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, g);
    });
    ecrire(g, 600, 180, "ventilateur", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(g, 776, 180, "compresseur", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    const message = ecrire(g, 680, 128, "il tourne sans jamais s’arrêter", 24, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    return t => {
      const f = FIGE ? 6 : t % 9, sortie = 1 - D.lisse((f - 8.4) / 0.5);
      pales(FIGE ? 20 : t * 560);
      comp.setAttribute("transform", `translate(${FIGE ? 0 : (Math.sin(t * 95) * 1.3).toFixed(2)} 0)`);   // il vibre
      voir(lueur, (FIGE ? 0.7 : 0.45 + 0.3 * Math.sin(t * 5)) * D.lisse((f - 1.2) / 0.5) * sortie);
      arcs.forEach((a, k) => voir(a, (FIGE ? 0.9 : D.fenetre(D.frac(t * 0.9 - k * 0.22), 0.05, 0.85, 0.15)) * D.lisse((f - 0.8) / 0.4) * sortie));
      voir(message, D.lisse((f - 3.4) / 0.5) * sortie);
    };
  }

  /* ---------- étape 3 · Mesurer : la pression (et sa couronne), la température du tube ---------- */
  function mesure(g) {
    const XM = 470, PBP = 2.006 - INSTRUMENTS.PATM;        // le fluide bout à −10 °C : 2,006 bar absolus, 0,99 bar au manomètre
    D.el("rect", { x: XM - 7, y: 264, width: 14, height: 30, fill: "url(#vm-acier-h)" }, g);                                   // la tige du manomètre
    D.el("rect", { x: XM - 15, y: 270, width: 30, height: 13, rx: 3, fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, g); // le raccord
    D.tube(g, 322, 294, 612, 40, "cuivre", false, "#f4f8fc");                                                                  // le tube, sortie d'évaporateur
    D.el("rect", { x: XM - 13, y: 286, width: 26, height: 14, rx: 3, fill: C.navy }, g);                                       // la prise de pression
    const KM = 0.5, mols = D.el("g", { transform: `scale(${KM})` }, g), r = D.alea(23), M = [];                                // la vapeur file vers le compresseur
    for (let i = 0; i < 16; i++) M.push({ s: r(), v: r(), maj: D.mol(mols) });
    const flux = t => M.forEach(m => { const x = 330 + D.frac(m.s + t * 46 / 596) * 596; m.maj(x / KM, (308 + m.v * 10) / KM, 0.3, true, D.borne(Math.min(x - 322, 934 - x) / 24, 0, 1)); });
    const mano = INSTRUMENTS.manometre(g, XM, 166, "BP");
    const thermo = INSTRUMENTS.thermometre(g, 640, 100, 800, 314);
    ecrire(g, 330, 362, "sortie d’évaporateur", 22, { "font-weight": 700, fill: BLEU_BP });
    ecrire(g, 930, 362, "vers le compresseur →", 22, { "text-anchor": "end", "font-weight": 700, fill: BLEU_BP });
    const luBP = ecrire(g, XM, 404, "le fluide bout à −10 °C", 24, { "text-anchor": "middle", "font-weight": 700, fill: BLEU_BP, opacity: 0 });
    const luT = ecrire(g, 800, 404, "le tube est à +6 °C", 24, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    return t => {
      const f = FIGE ? 8 : t % 11, sortie = 1 - D.lisse((f - 10.4) / 0.5);
      flux(FIGE ? 0 : t);
      const n = D.lisse(f / 1.2) * sortie, lecture = D.lisse((f - 1.2) / 0.4) * sortie;
      for (let k = 0; k < (FIGE ? 80 : 1); k++) mano(n * PBP, lecture);   // l'aiguille monte (figé : directement à sa valeur)
      thermo(f >= 2.6 && sortie > 0.5 ? nb(6, 1) : "--,-");
      voir(luBP, D.lisse((f - 1.8) / 0.4) * sortie);
      voir(luT, D.lisse((f - 3.2) / 0.4) * sortie);
    };
  }

  /* ---------- étape 4 · Comparer : l'écart (la surchauffe) face à la plage attendue ---------- */
  function comparer(g) {
    const xT = T => 350 + (T + 15) * 22, xK = K => 350 + K * 28;   // règle des températures (−15 … +10 °C) ; jauge de surchauffe (0 … 20 K)
    // la règle des températures : les deux relevés, puis l'écart
    const regle = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M340 130 H910", stroke: C.navy, "stroke-width": 3 }, regle);
    [-15, -10, -5, 0, 5, 10].forEach(T => D.el("path", { d: `M${xT(T)} 122 V138`, stroke: C.navy, "stroke-width": 2 }, regle));
    const ecart = D.el("line", { x1: xT(-10), y1: 130, x2: xT(-10), y2: 130, stroke: ACCENT, "stroke-width": 8, "stroke-linecap": "round", opacity: 0 }, g);
    const pointBP = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: xT(-10), cy: 130, r: 9, fill: BLEU_BP, stroke: C.papier, "stroke-width": 2 }, pointBP);
    ecrire(pointBP, xT(-10), 100, "le fluide bout à −10 °C", 22, { "text-anchor": "middle", "font-weight": 700, fill: BLEU_BP });
    const pointTube = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: xT(6), cy: 130, r: 9, fill: ACCENT, stroke: C.papier, "stroke-width": 2 }, pointTube);
    ecrire(pointTube, xT(6), 100, "le tube est à +6 °C", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    const motEcart = ecrire(g, (xT(-10) + xT(6)) / 2, 174, "écart : la surchauffe, 16 K", 24, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    // la jauge : la plage usuelle 5 à 10 K, puis l'aiguille de la mesure
    const jauge = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: xK(0), y: 262, width: xK(20) - xK(0), height: 26, rx: 13, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, jauge);
    D.el("rect", { x: xK(5), y: 264, width: xK(10) - xK(5), height: 22, fill: C.vert, opacity: 0.4 }, jauge);
    ecrire(jauge, (xK(5) + xK(10)) / 2, 242, "plage usuelle : 5 à 10 K", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.vert });
    [0, 5, 10, 15, 20].forEach(K => {
      D.el("path", { d: `M${xK(K)} 288 V297`, stroke: C.navy, "stroke-width": 2 }, jauge);
      ecrire(jauge, xK(K), 322, K === 20 ? "20 K" : String(K), 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    });
    const aiguille = D.el("line", { y1: 256, y2: 294, stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, g);
    const lu16 = ecrire(g, xK(16), 242, "16 K", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.rouge, opacity: 0 });
    const verdict = ecrire(g, 628, 378, "Trop haute : l’évaporateur est mal alimenté.", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.rouge, opacity: 0 });
    const suite = ecrire(g, 628, 410, "Reste à trouver pourquoi.", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 9 : t % 11.5, sortie = 1 - D.lisse((f - 10.9) / 0.5);
      voir(regle, D.lisse(f / 0.5) * sortie);
      voir(pointBP, D.lisse((f - 0.3) / 0.4) * sortie);
      voir(pointTube, D.lisse((f - 0.9) / 0.4) * sortie);
      ecart.setAttribute("x2", D.lerp(xT(-10), xT(6), D.lisse((f - 1.5) / 1.1)).toFixed(1));   // l'écart se trace, de −10 à +6 °C
      voir(ecart, (f > 1.5 ? 1 : 0) * sortie);
      voir(motEcart, D.lisse((f - 2.7) / 0.4) * sortie);
      voir(jauge, D.lisse((f - 3.3) / 0.5) * sortie);
      const K = 16 * D.lisse((f - 4.1) / 1.9), x = xK(K).toFixed(1);                               // l'aiguille glisse jusqu'à 16 K
      aiguille.setAttribute("x1", x); aiguille.setAttribute("x2", x);
      aiguille.setAttribute("stroke", K > 10 ? C.rouge : C.navy);
      voir(aiguille, D.lisse((f - 3.8) / 0.3) * sortie);
      voir(lu16, D.lisse((f - 6.1) / 0.4) * sortie);
      voir(verdict, D.lisse((f - 6.8) / 0.5) * sortie);
      voir(suite, D.lisse((f - 7.5) / 0.5) * sortie);
    };
  }

  /* ---------- les quatre étapes, dans l'ordre de la page ---------- */
  const ETAPES = [   // les phrases : espaces insécables ( ) avant « : ; » et entre un nombre et son unité
    { titre: "Écouter le client", bulle: ["Qu’est-ce qui", "ne va pas ?"], bras: -25, cycle: 10, dessiner: client,
      dire: "Le client raconte ce qu’il a vu : depuis ce matin, sa vitrine ne refroidit plus assez, son afficheur monte jusqu’à +9 °C. Le technicien note ses mots, sans conclure." },
    { titre: "Écouter la machine", bulle: ["Qu’est-ce que", "j’entends ?"], bras: -70, cycle: 9, dessiner: machine,
      dire: "Le ventilateur tourne, le compresseur aussi, sans jamais s’arrêter : la machine travaille, mais le froid ne vient pas. C’est un indice, pas encore une preuve." },
    { titre: "Mesurer", bulle: ["Combien", "je mesure ?"], bras: -95, cycle: 11, dessiner: mesure,
      dire: "Le manomètre donne la pression ; sur sa couronne R-134a, on lit la température à laquelle le fluide bout : −10 °C. Le thermomètre pincé sur le tube lit +6 °C." },
    { titre: "Comparer", bulle: ["Est-ce", "normal ?"], bras: -60, cycle: 11.5, dessiner: comparer,
      dire: "L’écart entre les deux, la surchauffe, vaut 16 K ; la plage usuelle (tableau plus bas) va de 5 à 10 K. Une valeur, pas une impression : l’évaporateur est mal alimenté. Reste à trouver pourquoi." }
  ];

  /* ---------- le dessin : fond, filigrane, technicien, caisse à outils, bulle, plateau (repris de fluidique.js) ---------- */
  const dessin = svg("0 0 940 440", "Un technicien frigoriste diagnostique une panne en quatre étapes : il écoute le client, dont la vitrine " +
    "ne refroidit plus assez ; il écoute la machine, dont le compresseur tourne sans s’arrêter ; il mesure, au manomètre BP et sur sa couronne " +
    "R-134a, que le fluide bout à −10 °C, et au thermomètre à pince que le tube est à +6 °C ; il compare : 16 K de surchauffe pour une plage " +
    "usuelle de 5 à 10 K, l’évaporateur est mal alimenté.");
  D.el("rect", { x: 0, y: 0, width: 940, height: 440, fill: C.papier }, dessin);
  D.defs(dessin);   // dégradés métal et petite molécule de VOYAGE_DESSIN (tube cuivre, tige du manomètre, vapeur)
  /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
     cartouche « Édu » (celui de l'en-tête de la page) à la place de « Studio » (vidéos) */
  D.filigrane(dessin, [[195, 120], [470, 236], [760, 352]], 290).querySelectorAll("text")
    .forEach(t => { if (t.textContent === "Studio") t.textContent = "Édu"; });
  D.el("path", { d: "M24 410 H286", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, dessin);
  const caisse = D.el("g", {}, dessin);                                                                  // sa caisse à outils
  D.el("path", { d: "M218 377 V367 H248 V377", fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linejoin": "round" }, caisse);
  D.el("rect", { x: 198, y: 376, width: 70, height: 32, rx: 4, fill: ACCENT, stroke: C.navy, "stroke-width": 2.5 }, caisse);
  D.el("path", { d: "M198 387 H268", stroke: C.navy, "stroke-width": 2 }, caisse);
  const tech = bonhomme(dessin, { casquette: true, dossier: true });
  const bulle = D.el("g", {}, dessin);
  D.el("path", { d: "M30 30 H286 Q300 30 300 44 V136 Q300 150 286 150 H168 L136 188 L144 150 H30 Q16 150 16 136 V44 Q16 30 30 30 Z",
    fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, bulle);
  const question = [82, 118].map(y => ecrire(bulle, 158, y, "", 26, { "text-anchor": "middle", "font-weight": 700, fill: C.navy }));
  const plateau = D.el("g", {}, dessin);

  let anime = null, debut = 0, brasDe = 0, brasVers = 0, brasIci = 0;
  function image(maintenant) {
    const t = (maintenant - debut) / 1000;
    if (anime) anime(t);
    brasIci = D.lerp(brasDe, brasVers, FIGE ? 1 : D.lisse(t / 0.6));
    tech({ x: 128, y: 205.6, k: 2.8, t: maintenant / 1000, bras: brasIci + (FIGE ? 0 : Math.sin(maintenant / 700) * 3) });
  }
  function peindre(i) {
    while (plateau.firstChild) plateau.removeChild(plateau.firstChild);
    anime = ETAPES[i].dessiner(plateau);
    ETAPES[i].bulle.forEach((s, k) => { question[k].textContent = s; });
    brasDe = brasIci; brasVers = ETAPES[i].bras; debut = performance.now();
    image(debut);
  }
  if (!FIGE) {
    const boucle = maintenant => {
      if (dessin.isConnected && dessin.getClientRects().length) image(maintenant);
      requestAnimationFrame(boucle);
    };
    requestAnimationFrame(boucle);
  }

  const bloc = pasAPas(dessin, ETAPES.map((e, i) => ({ titre: e.titre, dire: e.dire, peindre: () => peindre(i) })),
    "Première scène de la journée : diagnostiquer une panne, en quatre étapes. « ▶ Dérouler » joue toute la scène.");
  hote.appendChild(bloc);

  /* « ▶ Dérouler » : toute la scène depuis l'étape 1, chaque étape le temps de son cycle (le film du kit avance
     toutes les 2,6 s, trop vite pour lire la phrase). Écouteur en capture sur la barre : il passe avant celui du kit. */
  const boutons = Array.from(bloc.querySelectorAll("button[data-etape]"));
  const barre = bloc.querySelector(".choix"), btFilm = barre.querySelector("button.primary");
  let minuterie = null;
  const finFilm = () => { clearTimeout(minuterie); minuterie = null; btFilm.textContent = "▶ Dérouler"; btFilm.setAttribute("aria-pressed", "false"); };
  const jouer = i => {
    boutons[i].click();
    minuterie = setTimeout(() => (dessin.isConnected && i + 1 < ETAPES.length ? jouer(i + 1) : finFilm()), ETAPES[i].cycle * 1000);
  };
  barre.addEventListener("click", e => {
    if (e.target === btFilm) {
      e.stopPropagation();
      if (minuterie) return finFilm();
      btFilm.textContent = "⏸ Arrêter"; btFilm.setAttribute("aria-pressed", "true");
      jouer(0);
    } else if (e.isTrusted && minuterie) finFilm();   // le visiteur choisit une étape : le film s'arrête
  }, true);
})();
