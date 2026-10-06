/* =====================================================================
   metier/scene-commun.js — ce que les cinq scènes de la suite de « Une journée
   type » ont en commun avec le pilote « diagnostiquer une panne »
   ---------------------------------------------------------------------
   Page : metier.html. Le pilote (metier/scene-journee.js) reste tel quel, avec
   sa propre copie ; ce fichier porte la même vitrine pour les cinq scènes
   suivantes (scene-intervenir.js, scene-regler.js, scene-tracer.js,
   scene-expliquer.js, scene-mesurer.js), qui n'écrivent plus que leur dessin :
   · le technicien : le bonhomme « plein » de HoCourant (option B, décision de
     F. Henninot du 30/09/2026), recopié du pilote ;
   · les instruments : le manomètre à couronne R-134a (bague BP bleue / HP
     rouge, échelle en bar, chiffre ôté sous l'aiguille) et le thermomètre
     électronique à pince, recopiés du pilote ;
   · le cadre : fond papier, filigrane R9 (cartouche « .fr »), sol, caisse à
     outils, bulle de la question, plateau à droite ; le pas à pas de SceneKit
     (cartoclim/stations/_commun/scene-kit.js) et son « ▶ Dérouler », qui joue
     chaque étape le temps de son cycle ;
   · l'interrupteur « Animations » du site (panneau Aa de lisibilite.js, clé
     inerweb_animations) : sur « non », chaque étape se fige sur son image
     finale. Aucune autre condition ne coupe le mouvement.
   Tout bouge par le temps t (requestAnimationFrame), jamais par SMIL ni par
   animation CSS. Une scène hors de l'écran ne dessine pas ; elle repart du
   début de son étape quand elle revient à l'écran.
   Ce fichier ne dessine rien seul : il expose window.METIER_SCENE.
   ===================================================================== */
(function () {
  "use strict";
  if (typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = C.orange;      // l'orange de la charte, assez sombre pour un texte sur papier
  const BLEU_BP = "#1f6fa8";    // la bague du manomètre BP
  const ROUGE_HP = "#b3261e";   // la bague du manomètre HP
  const PEAU = "#f6d7bd", ENCRE = "#10233c";
  const POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  /* L'interrupteur « Animations » du site : metier.html ne charge pas moteur/animations.js, la clé est donc lue ici,
     comme le fait lisibilite.js. */
  const FIGE = window.inerwebAnimations ? window.inerwebAnimations.actives === false
    : (() => { try { return localStorage.getItem("inerweb_animations") === "non"; } catch (e) { return false; } })();

  const ecrire = (parent, x, y, s, taille, at) =>
    D.texte(parent, x, y, s, Object.assign({ "font-size": taille, "font-family": POLICE, fill: ENCRE }, at || {}));
  const voir = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const nb = (v, d) => (v < 0 ? "−" : "") + Math.abs(v).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const passe = (t, a, b) => D.lisse((t - a) / (b - a));   // 0 avant a, 1 après b
  /* un symbole de bibliothèque posé tel quel ; multiplier : le fond blanc des symboles QElectroTech s'efface sur le papier */
  const pose = (parent, href, x, y, l, h, multiplier) => {
    const i = D.el("image", { href: href, x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent);
    if (multiplier) i.setAttribute("style", "mix-blend-mode:multiply");
    return i;
  };

  /* ---------- le personnage : bonhomme « plein » de HoCourant (recopié du pilote, lui-même de legislation/scenes/fluidique.js) ----------
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

  /* ---------- les instruments : recopiés du pilote (lui-même de surchauffe-sous-refroidissement-interactif/scene-mesure.js) ---------- */
  const INSTRUMENTS = (function () {
    const C = { navy: "#1b3a63", ink: "#22303f", bp: "#1f6fa8", hp: "#b3261e", r134a: "#1d5f99", orange: "#c9451a", vif: "#ff6b35", gris: "#637285", lcd: "#e8f1e5" };
    const PATM = 1.013;
    const R134A = [[1.327, -20], [2.006, -10], [2.928, 0], [4.146, 10], [5.717, 20], [7.702, 30], [10.166, 40], [13.179, 50]];
    function psat(t) { // la table du module, lue à l'envers : où poser le trait « t » de la couronne
      for (let i = 1; i < R134A.length; i++) if (t <= R134A[i][1]) { const [pa, ta] = R134A[i - 1], [pb, tb] = R134A[i]; return pa + (t - ta) / (tb - ta) * (pb - pa); }
      return R134A[R134A.length - 1][0];
    }

    /* ---------- le manomètre (bague, échelle en bar, couronne R-134a) ---------- */
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
    return { manometre: manometre, thermometre: thermometre, PATM: PATM, R134A: R134A, lcd: C.lcd };
  })();

  /* ---------- le cadre commun : fond, filigrane, technicien, bulle, plateau, pas à pas, « ▶ Dérouler » ----------
     cfg : { nom (data-scene-journee), aria, legende, tech: { casquette, dossier, carte },
             etapes: [{ titre, bulle: [ligne1, ligne2], bras, cycle (s), dessiner(plateau) → t => {…}, dire }] }
     dessiner(plateau) construit le plateau (x 318-935, y 30-438) et renvoie la fonction qui l'anime au temps t
     (secondes depuis le début de l'étape). Renvoie { hote, bloc, dessin }, ou null si la figure est absente. */
  function monter(cfg) {
    const hote = document.querySelector('figure.scene-journee[data-scene-journee="' + cfg.nom + '"]');
    if (!hote) return null;
    const dessin = svg("0 0 940 440", cfg.aria);
    D.el("rect", { x: 0, y: 0, width: 940, height: 440, fill: C.papier }, dessin);
    D.defs(dessin);   // dégradés métal et petite molécule de VOYAGE_DESSIN (tube cuivre, vapeur)
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « .fr » (celui de l'en-tête de la page) à la place de « Studio » (vidéos) */
    D.filigrane(dessin, [[195, 120], [470, 236], [760, 352]], 290).querySelectorAll("text")
      .forEach(t => { if (t.textContent === "Studio") t.textContent = ".fr"; });
    D.el("path", { d: "M24 410 H286", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, dessin);
    const caisse = D.el("g", {}, dessin);                                                                  // sa caisse à outils
    D.el("path", { d: "M218 377 V367 H248 V377", fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linejoin": "round" }, caisse);
    D.el("rect", { x: 198, y: 376, width: 70, height: 32, rx: 4, fill: ACCENT, stroke: C.navy, "stroke-width": 2.5 }, caisse);
    D.el("path", { d: "M198 387 H268", stroke: C.navy, "stroke-width": 2 }, caisse);
    const tech = bonhomme(dessin, cfg.tech || { casquette: true, dossier: true });
    const bulle = D.el("g", {}, dessin);
    D.el("path", { d: "M30 30 H286 Q300 30 300 44 V136 Q300 150 286 150 H168 L136 188 L144 150 H30 Q16 150 16 136 V44 Q16 30 30 30 Z",
      fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, bulle);
    const question = [82, 118].map(y => ecrire(bulle, 158, y, "", 26, { "text-anchor": "middle", "font-weight": 700, fill: C.navy }));
    const plateau = D.el("g", {}, dessin);
    const ETAPES = cfg.etapes;

    let anime = null, debut = 0, brasDe = 0, brasVers = 0, brasIci = 0, visible = true;
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
        if (visible && dessin.isConnected && dessin.getClientRects().length) image(maintenant);
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
      if ("IntersectionObserver" in window) {   // hors de l'écran, la scène ne dessine pas ; elle repart du début de son étape en y revenant
        new IntersectionObserver(es => {
          const v = es.some(e => e.isIntersecting);
          if (v && !visible) debut = performance.now();
          visible = v;
        }).observe(dessin);
      }
    }

    const bloc = pasAPas(dessin, ETAPES.map((e, i) => ({ titre: e.titre, dire: e.dire, peindre: () => peindre(i) })), cfg.legende);
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
    return { hote: hote, bloc: bloc, dessin: dessin };
  }

  window.METIER_SCENE = { D: D, C: C, ACCENT: ACCENT, BLEU_BP: BLEU_BP, ROUGE_HP: ROUGE_HP, PEAU: PEAU, ENCRE: ENCRE, POLICE: POLICE, FIGE: FIGE,
    ecrire: ecrire, voir: voir, nb: nb, passe: passe, pose: pose, bonhomme: bonhomme, INSTRUMENTS: INSTRUMENTS, monter: monter };
})();
