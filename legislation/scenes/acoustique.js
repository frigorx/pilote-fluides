/* =====================================================================
   scenes/acoustique.js — la scène de la branche « Acoustique »
   ---------------------------------------------------------------------
   Remplace l'image scene-acoustique.webp en tête de l'accueil des cinq
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="acoustique" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Même mécanique que scenes/fluidique.js (le pilote) et scenes/thermique.js :
   SceneKit (pas à pas, une étape par station de la branche, dans l'ordre du
   plan ; l'étape de la station est marquée ★ et ouverte d'emblée ;
   « ▶ Dérouler » joue toute la branche, chaque étape le temps de son cycle)
   et VOYAGE_DESSIN pour le dessin et le filigrane R9. Le chargé d'affaires est
   le bonhomme du pilote, recopié tel quel. Les deux moteurs sont LUS, jamais
   modifiés.

   Les cinq dessins montrent le mécanisme de chaque station, avec les seuls
   faits de la station : les niveaux qui ne s'additionnent pas (80, 83, 85,
   86, 87 dB(A) pour une à cinq machines), l'émergence écart entre le bruit
   ambiant et le bruit résiduel (35 et 41 dB(A), chiffres d'école) comparée
   aux limites de jour et de nuit (5 et 3 dB(A), plus un terme correctif),
   le relevé en deux temps au même point (machine en marche, puis machine
   arrêtée), l'exemple de l'unité extérieure de la station PAC et voisinage
   (Lw 60 dB(A) : 46 dB(A) chez le voisin dans un angle, 40 au sol, 34 à
   distance double) et les deux chemins du bruit (l'air, la dalle) avec leur
   traitement (un écran, des plots). Aucune valeur nouvelle, aucune image.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités ; tout bouge par le temps t
   (requestAnimationFrame) ; seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape. Les ondes sont découpées dans la zone
   qui leur est réservée, jamais là où un texte est écrit.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="acoustique"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#6d28d9";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
  const INDIGO = "#1e40af";     // la capacité, comme dans la station Aptitude & capacité
  const LIQUIDE = "#5b9bd5", PEAU = "#f6d7bd", ENCRE = "#10233c";
  const POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);

  const ecrire = (parent, x, y, s, taille, at) =>
    D.texte(parent, x, y, s, Object.assign({ "font-size": taille, "font-family": POLICE, fill: ENCRE }, at || {}));
  const voir = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const coche = (parent, x, y) => {
    const c = D.el("g", { opacity: 0 }, parent);
    D.el("circle", { cx: x, cy: y, r: 15, fill: C.vert }, c);
    D.el("path", { d: `M${x - 7} ${y} l5 5 l9 -10`, fill: "none", stroke: C.papier, "stroke-width": 3.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, c);
    return c;
  };

  /* ---------- le personnage : bonhomme « plein » de HoCourant ----------
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

  /* ===== PROPRE À LA BRANCHE : les dessins des étapes (plateau x 310-990, y 60-435 ; coin x 796-988,
     y 10-52 laissé libre pour « ★ Votre station ») et le tableau ETAPES ===== */

  const GRIS_BLEU = "#c7d3e3";      // le calme du lieu : le bruit résiduel
  const VIOLET_CLAIR = "#c9b5ee";   // le bruit ambiant
  const ORANGE_FOND = "#e8914a";    // l'orange des illustrations des stations
  const ORANGE_TXT = "#9a3412";     // le même, assez foncé pour le texte
  const BETON = "#c9d3de";          // murs et dalle
  const RAD = Math.PI / 180;

  /* des arcs d'onde qui s'éloignent du point (cx, cy) : n arcs entre les rayons rMin et rMax, de l'angle a0 à a1
     (degrés, 0 = vers la droite) ; maj(p, a) : p fait avancer les arcs, a est leur opacité */
  function ondes(parent, cx, cy, a0, a1, rMin, rMax, n, coul, ep) {
    const arcs = [];
    for (let k = 0; k < n; k++) arcs.push(D.el("path", { fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, parent));
    return (p, a) => arcs.forEach((arc, k) => {
      const s = D.frac(p + k / n), r = rMin + (rMax - rMin) * s;
      arc.setAttribute("d", `M${(cx + r * Math.cos(a0 * RAD)).toFixed(1)} ${(cy + r * Math.sin(a0 * RAD)).toFixed(1)} ` +
        `A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(cx + r * Math.cos(a1 * RAD)).toFixed(1)} ${(cy + r * Math.sin(a1 * RAD)).toFixed(1)}`);
      voir(arc, a * D.fenetre(s, 0, 1, 0.2));
    });
  }

  /* une zone de découpe rectangulaire : les ondes n'en sortent jamais (aucun texte n'est écrit dans une zone découpée) */
  function zone(parent, id, x, y, l, h) {
    D.el("rect", { x: x, y: y, width: l, height: h }, D.el("clipPath", { id: id }, parent));
    return "url(#" + id + ")";
  }

  /* une unité extérieure : le caisson et son ventilateur ; tourne(a) fait tourner les pales */
  function unite(parent, x, y, l, h, rayon) {
    const g = D.el("g", {}, parent);
    const caisson = D.el("rect", { x: x, y: y, width: l, height: h, rx: 8, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, g);
    return { g: g, caisson: caisson, tourne: D.ventilateur(g, x + l / 2, y + h / 2, rayon) };
  }

  /* une flèche de (x1,y1) vers (x2,y2) qui se trace : maj(p), p de 0 à 1 */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    const g = D.el("g", { opacity: 0 }, parent), L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const bx = x2 - ux * 14, by = y2 - uy * 14, LL = L - 14;
    const ligne = D.el("path", { d: `M${x1} ${y1} L${bx.toFixed(1)} ${by.toFixed(1)}`, fill: "none", stroke: coul, "stroke-width": ep || 4,
      "stroke-linecap": "round", "stroke-dasharray": `${LL.toFixed(1)} ${LL.toFixed(1)}` }, g);
    const pointe = D.el("path", { d: `M${x2} ${y2} L${(bx - uy * 8).toFixed(1)} ${(by + ux * 8).toFixed(1)} L${(bx + uy * 8).toFixed(1)} ${(by - ux * 8).toFixed(1)} Z`, fill: coul, opacity: 0 }, g);
    return p => {
      voir(g, p > 0 ? 1 : 0);
      ligne.setAttribute("stroke-dashoffset", (LL * (1 - D.borne(p / 0.85, 0, 1))).toFixed(1));
      voir(pointe, D.lisse((p - 0.85) / 0.15));
    };
  }

  /* ---------- étape 1 · Le bruit en dB : chaque machine ajoutée pèse moins que la précédente ---------- */
  function niveaux(g) {
    const SOL = 344, RX = 850, T = [0, 2.2, 4, 5.6, 7], NIV = [80, 83, 85, 86, 87];   // 80, 83, 85, 86, 87 dB(A) : INRS, écran 6
    const yN = L => 372 - (L - 80) * 30;
    const r = D.el("g", {}, g);
    ecrire(r, 330, 80, "Chaque machine : 80 dB(A)", 22, { "font-weight": 700, fill: C.navy });
    D.el("path", { d: `M326 ${SOL} H738`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, r);
    const machines = T.map((_, k) => {
      const x = 334 + 80 * k, m = D.el("g", { opacity: 0 }, r);
      return { g: m, tourne: unite(m, x, SOL - 68, 68, 68, 25).tourne, onde: ondes(m, x + 34, SOL - 68, -130, -50, 16, 124, 3, ACCENT, 4.2) };
    });
    const legende = ecrire(r, 528, 392, "1 machine", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    // la jauge : de 80 à 90 dB(A), un repère par décibel
    D.el("path", { d: `M${RX} 372 V72`, stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round" }, r);
    for (let L = 80; L <= 90; L++) D.el("path", { d: `M${RX - (L % 5 ? 8 : 14)} ${yN(L)} H${RX}`, stroke: C.navy, "stroke-width": 3 }, r);
    ecrire(r, RX + 14, 80, "dB(A)", 22, { fill: C.gris });
    const energie = ecrire(r, 330, 116, "Deux fois plus d'énergie : + 3 dB", 22, { fill: C.navy, opacity: 0 });
    const dix = ecrire(r, RX - 24, 80, "10 machines : 90", 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy, opacity: 0 });
    const paliers = [1, 2, 3, 4].map(k => {   // le gain de chaque machine ajoutée : +3, +2, +1, +1
      const ya = yN(NIV[k - 1]), yb = yN(NIV[k]), p = D.el("g", { opacity: 0 }, r);
      D.el("path", { d: `M938 ${ya - 2} H946 V${yb + 2} H938`, fill: "none", stroke: C.orange, "stroke-width": 3, "stroke-linejoin": "round" }, p);
      ecrire(p, 954, (ya + yb) / 2 + 8, "+" + (NIV[k] - NIV[k - 1]), 22, { "font-weight": 700, fill: ORANGE_TXT });
      return p;
    });
    const repere = D.el("g", {}, r);
    D.el("path", { d: `M${RX + 4} 0 L${RX + 20} -10 V10 Z`, fill: ACCENT }, repere);
    D.el("rect", { x: RX + 18, y: -17, width: 62, height: 34, rx: 8, fill: ACCENT }, repere);
    const nombre = ecrire(repere, RX + 49, 8, "80", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.papier });
    const rep = [[0, 80]];
    for (let k = 1; k < 5; k++) rep.push([T[k], NIV[k - 1]], [T[k] + 0.8, NIV[k]]);
    return t => {
      const f = FIGE ? 9.2 : t % 11, sortie = 1 - D.lisse((f - 10.3) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      const n = Math.max(1, T.filter(x => f >= x).length), L = D.courbe(rep, f);   // n machines en marche, le niveau lu
      machines.forEach((m, k) => {
        voir(m.g, D.lisse((f - T[k]) / 0.4));
        m.tourne(FIGE ? 0 : t * 420 + k * 37);
        m.onde(FIGE ? 0.4 + k * 0.17 : t * 0.8 + k * 0.17, 1);
      });
      legende.textContent = n === 1 ? "1 machine" : n + " machines";
      repere.setAttribute("transform", `translate(0 ${yN(L).toFixed(1)})`);
      nombre.textContent = String(NIV[Math.max(1, T.filter(x => f >= x + 0.4).length) - 1]);   // le nombre change à mi-course du repère
      paliers.forEach((p, i) => voir(p, D.lisse((f - T[i + 1] - 0.8) / 0.3)));
      voir(energie, D.lisse((f - T[1] - 0.8) / 0.4));
      voir(dix, D.lisse((f - 8.4) / 0.5));
    };
  }

  /* ---------- étape 2 · Les seuils : l'émergence (ambiant moins résiduel), puis la limite de jour et de nuit ---------- */
  function emergence(g) {
    const BASE = 350, K = 6, H1 = 35 * K, H2 = 41 * K;   // 35 et 41 dB(A) : les chiffres d'école de la station
    const r = D.el("g", {}, g);
    D.el("path", { d: `M326 ${BASE} H690`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, r);
    const col1 = D.el("rect", { x: 346, y: BASE, width: 112, height: 0, fill: GRIS_BLEU, stroke: C.navy, "stroke-width": 3, opacity: 0 }, r);
    const col2 = D.el("rect", { x: 540, y: BASE, width: 112, height: 0, fill: VIOLET_CLAIR, stroke: C.navy, "stroke-width": 3, opacity: 0 }, r);
    const plus = D.el("rect", { x: 540, y: BASE - H1, width: 112, height: 0, fill: ORANGE_FOND, stroke: C.navy, "stroke-width": 3, opacity: 0 }, r);
    const guide = D.el("path", { d: `M458 ${BASE - H1} H660`, stroke: C.gris, "stroke-width": 2.5, "stroke-dasharray": "8 6", opacity: 0 }, r);
    const exemple = ecrire(r, 330, 84, "Chiffres d'exemple", 22, { "font-weight": 700, fill: C.gris, opacity: 0 });
    const u1 = unite(r, 374, 292, 56, 46, 15), u2 = unite(r, 568, 292, 56, 46, 15);
    u1.caisson.setAttribute("fill", "#e3e8ee");   // la machine est arrêtée
    const v1 = ecrire(r, 402, 232, "35 dB(A)", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    const v2 = ecrire(r, 596, 232, "41 dB(A)", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    const n1 = D.el("g", { opacity: 0 }, r), n2 = D.el("g", { opacity: 0 }, r);
    ecrire(n1, 402, 382, "bruit résiduel", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(n1, 402, 412, "machine arrêtée", 22, { "text-anchor": "middle", fill: C.gris });
    ecrire(n2, 596, 382, "bruit ambiant", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(n2, 596, 412, "machine en marche", 22, { "text-anchor": "middle", fill: C.gris });
    // l'émergence : la part du bruit ambiant qui dépasse le bruit résiduel
    const acc = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: `M664 ${BASE - H2} H676 V${BASE - H1} H664`, fill: "none", stroke: C.orange, "stroke-width": 3.5, "stroke-linejoin": "round" }, acc);
    ecrire(acc, 688, 118, "émergence", 22, { "font-weight": 700, fill: ORANGE_TXT });
    ecrire(acc, 688, 146, "6 dB(A)", 22, { "font-weight": 700, fill: ORANGE_TXT });
    // la limite, avec son terme correctif (valeurs de l'article R. 1336-7, écrans 3 et 4 de la station)
    const carte = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 704, y: 190, width: 284, height: 196, rx: 14, fill: "#f3f6fb", stroke: C.navy, "stroke-width": 3 }, carte);
    ecrire(carte, 722, 230, "Limite de l'émergence", 22, { "font-weight": 700, fill: C.navy });
    const jour = D.el("g", { opacity: 0 }, r), nuit = D.el("g", { opacity: 0 }, r);
    D.el("circle", { cx: 740, cy: 272, r: 8, fill: "#f3c14b", stroke: C.navy, "stroke-width": 2 }, jour);
    for (let a = 0; a < 8; a++) D.el("path", { d: "M0 -13 V-18", stroke: C.navy, "stroke-width": 2.5, "stroke-linecap": "round", transform: `translate(740 272) rotate(${a * 45})` }, jour);
    ecrire(jour, 770, 280, "jour : 5 dB(A)", 22, { "font-weight": 700, fill: C.navy });
    D.el("path", { d: "M745 306 A13 13 0 1 0 745 330 A15 15 0 0 1 745 306 Z", fill: GRIS_BLEU, stroke: C.navy, "stroke-width": 2, "stroke-linejoin": "round" }, nuit);
    ecrire(nuit, 770, 326, "nuit : 3 dB(A)", 22, { "font-weight": 700, fill: C.navy });
    const terme = ecrire(r, 722, 370, "+ terme correctif", 22, { fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 9.6 : t % 10.8, sortie = 1 - D.lisse((f - 9.9) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      const h1 = H1 * D.lisse((f - 0.5) / 1.4), h2 = H1 * D.lisse((f - 3.2) / 1.2), hp = (H2 - H1) * D.lisse((f - 4.4) / 0.6);
      col1.setAttribute("y", (BASE - h1).toFixed(1)); col1.setAttribute("height", h1.toFixed(1)); voir(col1, h1 > 0.5 ? 1 : 0);
      col2.setAttribute("y", (BASE - h2).toFixed(1)); col2.setAttribute("height", h2.toFixed(1)); voir(col2, h2 > 0.5 ? 1 : 0);
      plus.setAttribute("y", (BASE - H1 - hp).toFixed(1)); plus.setAttribute("height", hp.toFixed(1)); voir(plus, hp > 0.5 ? 1 : 0);
      voir(exemple, D.lisse((f - 0.6) / 0.4));
      voir(n1, D.lisse((f - 0.6) / 0.4)); voir(v1, D.lisse((f - 2) / 0.4)); voir(guide, D.lisse((f - 2.3) / 0.5));
      voir(n2, D.lisse((f - 3) / 0.4)); voir(u2.g, D.lisse((f - 3) / 0.4)); voir(v2, D.lisse((f - 4.7) / 0.4));
      u2.tourne(FIGE ? 0 : t * 420);
      voir(acc, D.lisse((f - 5.3) / 0.5));
      voir(carte, D.lisse((f - 6.3) / 0.4)); voir(jour, D.lisse((f - 6.9) / 0.4)); voir(nuit, D.lisse((f - 7.7) / 0.4));
      voir(terme, D.lisse((f - 8.5) / 0.4));
    };
  }

  /* ---------- étape 3 · Mesurer : deux relevés au même point, machine en marche, puis machine arrêtée ---------- */
  function releve(g) {
    const GY = 336, X0 = 360, W = 590, LA = 0.78, LR = 0.46;   // niveaux relatifs : la station ne donne aucun chiffre pour cet écran
    const xa = X0 + LA * W, xr = X0 + LR * W;
    const r = D.el("g", {}, g);
    // l'écran du sonomètre : une barre de niveau et deux repères, l'ambiant puis le résiduel
    D.el("rect", { x: 330, y: 64, width: 650, height: 160, rx: 16, fill: "#f3f6fb", stroke: C.navy, "stroke-width": 3 }, r);
    D.el("rect", { x: X0, y: 116, width: W, height: 30, rx: 15, fill: "#dfe6ee" }, r);
    const barre = D.el("rect", { x: X0, y: 116, width: 0, height: 30, rx: 15, fill: ACCENT, opacity: 0 }, r);
    ecrire(r, 966, 100, "dB(A)", 22, { "text-anchor": "end", fill: C.gris });
    const repere = (x, texte, coul) => {
      const m = D.el("g", { opacity: 0 }, r);
      D.el("path", { d: `M${x} 112 V150`, stroke: C.navy, "stroke-width": 3.5, "stroke-linecap": "round" }, m);
      ecrire(m, x, 100, texte, 22, { "text-anchor": "middle", "font-weight": 700, fill: coul });
      return m;
    };
    const mAmb = repere(xa, "ambiant", ACCENT), mRes = repere(xr, "résiduel", C.gris);
    const acc = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: `M${xr} 158 V170 H${xa} V158`, fill: "none", stroke: C.orange, "stroke-width": 3.5, "stroke-linejoin": "round" }, acc);
    ecrire(acc, (xa + xr) / 2, 208, "émergence", 22, { "text-anchor": "middle", "font-weight": 700, fill: ORANGE_TXT });
    // le terrain : la machine, ses ondes, le sonomètre sur son trépied, les bruits habituels
    D.el("path", { d: `M326 ${GY} H985`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, r);
    const mach = unite(r, 346, 268, 90, 68, 24);
    const bandeM = D.el("g", { "clip-path": zone(r, "acoustique-releve-machine", 440, 238, 190, 98) }, r);
    const ondeM = ondes(bandeM, 440, 302, -30, 30, 24, 200, 5, ACCENT, 4);
    const bandeH = D.el("g", { "clip-path": zone(r, "acoustique-releve-habituel", 700, 238, 240, 98) }, r);
    const ondeH = ondes(bandeH, 940, 296, 146, 214, 20, 230, 3, "#9aaabb", 3.5);
    const so = D.el("g", {}, r);
    D.el("path", { d: "M652 306 L626 336 M652 306 V336 M652 306 L678 336", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round" }, so);
    D.el("rect", { x: 634, y: 250, width: 36, height: 58, rx: 6, fill: "#dfe7f0", stroke: C.navy, "stroke-width": 3 }, so);
    D.el("rect", { x: 640, y: 258, width: 24, height: 16, rx: 3, fill: ENCRE }, so);
    const mini = D.el("rect", { x: 643, y: 263, width: 0, height: 6, rx: 2, fill: "#7fe3a6" }, so);
    D.el("path", { d: "M652 250 V242", stroke: C.navy, "stroke-width": 3 }, so);
    D.el("circle", { cx: 652, cy: 237, r: 6, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, so);
    const meme = D.el("g", { opacity: 0 }, r);
    D.el("ellipse", { cx: 652, cy: 338, rx: 46, ry: 7, fill: "none", stroke: C.navy, "stroke-width": 2.5, "stroke-dasharray": "6 5" }, meme);
    ecrire(meme, 652, 380, "même point", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const etat = ecrire(r, 330, 380, "machine en marche", 22, { "font-weight": 700, fill: ACCENT });
    ecrire(r, 985, 380, "bruits habituels", 22, { "text-anchor": "end", fill: C.gris });
    return t => {
      const f = FIGE ? 10.2 : t % 12, sortie = 1 - D.lisse((f - 11) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      const marche = f < 4.8, d = D.borne((f - 4.8) / 0.7, 0, 1);
      mach.tourne(FIGE ? 0 : 420 * (marche ? f : 4.8 + 0.7 * d * (2 - d) / 2));   // le ventilateur ralentit, puis s'arrête
      mach.caisson.setAttribute("fill", marche ? "#e8f1fb" : "#e3e8ee");
      ondeM(FIGE ? 0.3 : t * 0.7, 1 - D.lisse((f - 4.8) / 0.5));
      ondeH(FIGE ? 0.1 : t * 0.35, 0.8);
      const L = D.courbe([[0, 0], [0.9, 0], [2.1, LA], [5.4, LA], [6.6, LR]], f);   // la barre : l'ambiant, puis le résiduel
      barre.setAttribute("width", (L * W).toFixed(1)); voir(barre, L > 0.02 ? 1 : 0);
      barre.setAttribute("fill", f < 5.5 ? ACCENT : "#8aa0b8");
      mini.setAttribute("width", (18 * L / LA).toFixed(1));
      voir(mAmb, D.lisse((f - 2.3) / 0.4)); voir(mRes, D.lisse((f - 6.8) / 0.4)); voir(acc, D.lisse((f - 8) / 0.5));
      voir(meme, D.lisse((f - 0.9) / 0.4));
      etat.textContent = marche ? "machine en marche" : "machine arrêtée";
      etat.setAttribute("fill", marche ? ACCENT : C.gris);
    };
  }

  /* ---------- étape 4 · PAC et voisinage : l'exemple de la station, dans un angle, au sol, deux fois plus loin ---------- */
  function angle(g) {
    const Y = 226;
    const r = D.el("g", {}, g);
    ecrire(r, 330, 84, "Exemple : Lw = 60 dB(A)", 22, { "font-weight": 700, fill: C.gris });
    // une tuile (vue de dessus) : l'unité à gauche, dans un angle ou non ; la fenêtre du voisin à droite ; les ondes entre les deux
    const tuile = (id, ux, ecart, coin, ep, cx, valeur, dist, lieu) => {
      const t = D.el("g", { opacity: 0 }, r), hx = ux + 58 + ecart;
      if (coin) {
        const mur = { fill: BETON, stroke: C.navy, "stroke-width": 2.5 };
        D.el("rect", Object.assign({ x: ux - 12, y: Y - 38, width: 12, height: 100 }, mur), t);
        D.el("rect", Object.assign({ x: ux - 12, y: Y - 38, width: 82, height: 12 }, mur), t);
      }
      const u = unite(t, ux, Y - 26, 58, 52, 18);
      D.el("rect", { x: hx, y: Y - 66, width: 16, height: 132, fill: BETON, stroke: C.navy, "stroke-width": 2.5 }, t);
      D.el("rect", { x: hx - 3, y: Y - 28, width: 22, height: 56, fill: "#bfe0f5", stroke: C.navy, "stroke-width": 2 }, t);
      const bande = D.el("g", { "clip-path": zone(t, id, ux + 60, Y - 66, ecart - 10, 132) }, t);
      const onde = ondes(bande, ux + 60, Y, -50, 50, 10, ecart - 8, 3, ACCENT, ep);
      D.el("path", { d: `M${ux + 58} ${Y + 86} H${hx} M${ux + 58} ${Y + 78} V${Y + 94} M${hx} ${Y + 78} V${Y + 94}`, stroke: C.gris, "stroke-width": 2.5, "stroke-linecap": "round" }, t);
      const niv = ecrire(t, cx, 144, valeur + " dB(A)", 26, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
      ecrire(t, (ux + 58 + hx) / 2, Y + 118, dist, 22, { "text-anchor": "middle", fill: C.navy });
      ecrire(t, cx, Y + 150, lieu, 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      return { g: t, u: u, onde: onde, niv: niv };
    };
    const A = tuile("acoustique-angle-a", 340, 64, true, 6, 403, 46, "à 4 m", "dans un angle");
    const B = tuile("acoustique-angle-b", 560, 64, false, 4, 629, 40, "à 4 m", "au sol");
    const Cc = tuile("acoustique-angle-c", 770, 128, false, 3, 871, 34, "à 8 m", "au sol");
    // chaque pas fait perdre 6 dB(A) : sortir de l'angle, puis doubler la distance
    const f1 = fleche(r, 466, 134, 567, 134, C.orange, 4), f2 = fleche(r, 692, 134, 809, 134, C.orange, 4);
    const m1 = ecrire(r, 516, 118, "−6", 24, { "text-anchor": "middle", "font-weight": 700, fill: ORANGE_TXT, opacity: 0 });
    const m2 = ecrire(r, 750, 118, "−6", 24, { "text-anchor": "middle", "font-weight": 700, fill: ORANGE_TXT, opacity: 0 });
    const morale = ecrire(r, 330, 418, "Sortir de l'angle vaut un doublement de distance", 22, { "font-weight": 700, fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 9.6 : t % 11.4, sortie = 1 - D.lisse((f - 10.4) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      [[A, 0.5, 1.4], [B, 3, 3.9], [Cc, 5.6, 6.5]].forEach(([o, d, dn], k) => {
        voir(o.g, D.lisse((f - d) / 0.4)); voir(o.niv, D.lisse((f - dn) / 0.4));
        o.u.tourne(FIGE ? 0 : t * 420 + k * 50);
        o.onde(FIGE ? 0.3 : t * 0.75 + k * 0.3, 1);
      });
      f1(D.lisse((f - 4.2) / 0.7)); voir(m1, D.lisse((f - 4.6) / 0.4));
      f2(D.lisse((f - 6.8) / 0.7)); voir(m2, D.lisse((f - 7.2) / 0.4));
      voir(morale, D.lisse((f - 8.2) / 0.5));
    };
  }

  /* ---------- étape 5 · Traiter le bruit : deux chemins, l'air et la dalle, chacun son traitement ---------- */
  function chemins(g) {
    const DALLE = 352;
    const r = D.el("g", {}, g);
    // la dalle, le local occupé à droite, sa fenêtre ouverte côté machine
    D.el("rect", { x: 326, y: DALLE, width: 658, height: 34, rx: 3, fill: BETON, stroke: C.navy, "stroke-width": 3 }, r);
    const mur = { fill: BETON, stroke: C.navy, "stroke-width": 2.5 };
    D.el("rect", Object.assign({ x: 700, y: 176, width: 10, height: 86 }, mur), r);
    D.el("rect", Object.assign({ x: 700, y: 342, width: 10, height: 10 }, mur), r);
    D.el("rect", Object.assign({ x: 964, y: 176, width: 10, height: 176 }, mur), r);
    D.el("rect", Object.assign({ x: 700, y: 166, width: 274, height: 10 }, mur), r);
    ecrire(r, 724, 214, "local occupé", 22, { "font-weight": 700, fill: C.navy });
    ecrire(r, 330, 84, "L'air et la dalle : deux chemins", 22, { "font-weight": 700, fill: C.navy });
    // la machine, posée sur la dalle ; les plots viennent se glisser dessous
    const plots = D.el("g", { opacity: 0 }, r);
    [432, 472].forEach(x => {
      D.el("rect", { x: x, y: 332, width: 26, height: 20, rx: 3, fill: "#aab6c3", stroke: C.navy, "stroke-width": 2.5 }, plots);
      D.el("path", { d: `M${x + 5} 342 H${x + 21}`, stroke: C.navy, "stroke-width": 2 }, plots);
    });
    const machine = D.el("g", {}, r);
    const u = unite(machine, 420, 282, 90, 70, 24);
    // le chemin de l'air : des ondes violettes, découpées en deux zones de part et d'autre de l'écran
    const bande = (id, x, l) => {
      const mobile = D.el("g", {}, D.el("g", { "clip-path": zone(r, id, x, 262, l, 80) }, r));
      return { mobile: mobile, onde: ondes(mobile, 516, 317, -30, 30, 14, 300, 7, ACCENT, 4) };
    };
    const aA = bande("acoustique-air-a", 516, 76), aB = bande("acoustique-air-b", 606, 200);
    const ecran = D.el("g", {}, r);
    D.el("rect", { x: 592, y: 240, width: 12, height: 112, fill: "#dfe7f0", stroke: C.navy, "stroke-width": 2.5 }, ecran);
    // le chemin de la dalle : la vibration (orange) court dans la dalle, puis ressort en bruit dans le local
    const vibre = D.el("path", { fill: "none", stroke: C.orange, "stroke-width": 3.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, r);
    const ondeSol = ondes(r, 884, DALLE, -150, -30, 14, 84, 4, C.orange, 3.5);
    const lAir = ecrire(r, 554, 250, "air", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    const lDalle = ecrire(r, 560, 418, "dalle", 22, { "text-anchor": "middle", "font-weight": 700, fill: ORANGE_TXT, opacity: 0 });
    const lPlots = D.el("g", { opacity: 0 }, r);
    ecrire(lPlots, 334, 338, "plots", 22, { "font-weight": 700, fill: C.navy });
    D.el("path", { d: "M394 332 L428 340", stroke: C.navy, "stroke-width": 2.5, "stroke-linecap": "round" }, lPlots);
    const lEcran = ecrire(r, 598, 222, "écran", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 9.2 : t % 11.4, sortie = 1 - D.lisse((f - 10.5) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      const pP = D.lisse((f - 3.6) / 1.2), eP = D.lisse((f - 6) / 0.8), dy = -20 * pP;   // les plots soulèvent la machine
      const tremble = FIGE ? 0 : Math.sin(t * 38) * 1.3 * (1 - 0.6 * pP);
      machine.setAttribute("transform", `translate(0 ${(dy + tremble).toFixed(2)})`);
      u.tourne(FIGE ? 0 : t * 420);
      voir(plots, pP);
      [aA, aB].forEach(a => { a.mobile.setAttribute("transform", `translate(0 ${dy.toFixed(2)})`); a.onde(FIGE ? 0.3 : t * 0.45, 1); });
      aB.mobile.parentNode.setAttribute("opacity", (1 - 0.62 * eP).toFixed(2));   // derrière l'écran, le bruit baisse
      ecran.setAttribute("transform", `translate(0 ${DALLE}) scale(1 ${Math.max(eP, 0.001).toFixed(3)}) translate(0 ${-DALLE})`);
      voir(ecran, eP > 0.01 ? 1 : 0);
      // la vibration : tant que la machine est posée sur la dalle elle la traverse ; avec les plots elle ne rentre plus et s'éloigne
      const xs = 420 + Math.max(0, f - 3.8) * 320;
      let d = "";
      for (let x = xs; x <= 960; x += 6) d += (d ? " L" : "M") + x.toFixed(0) + " " + (369 + 7 * Math.sin(x / 46 * 2 * Math.PI - (FIGE ? 0 : t * 9))).toFixed(1);
      vibre.setAttribute("d", d || "M0 0"); voir(vibre, d ? 1 : 0);
      ondeSol(FIGE ? 0.2 : t * 0.7, 0.12 + 0.88 * (1 - D.lisse((xs - 700) / 120)));
      voir(lAir, D.lisse((f - 0.8) / 0.4)); voir(lDalle, D.lisse((f - 1.2) / 0.4));
      voir(lPlots, D.lisse((f - 4.6) / 0.4)); voir(lEcran, D.lisse((f - 6.6) / 0.4));
    };
  }

  /* ---------- les cinq étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "acoustique-le-bruit-en-db", titre: "Deux sources : +3 dB", bulle: ["Deux machines,", "deux fois plus ?"], bras: -78, cycle: 11, dessiner: niveaux,
      dire: "Le bruit en dB — Les décibels ne s'additionnent pas comme des nombres : deux machines identiques de 80 dB(A) font 83 dB(A), pas 160. Chaque machine ajoutée pèse moins que la précédente." },
    { station: "acoustique-les-seuils", titre: "Émergence et limites", bulle: ["Elle dépasse le", "calme de combien ?"], bras: -70, cycle: 10.8, dessiner: emergence,
      dire: "Les seuils — L'émergence est l'écart entre le bruit ambiant (machine en marche) et le bruit résiduel (machine arrêtée). Limite : 5 dB(A) le jour, 3 la nuit, plus un terme correctif." },
    { station: "acoustique-mesurer", titre: "Mesurer deux fois", bulle: ["Comment prouver", "la gêne ?"], bras: -66, cycle: 12, dessiner: releve,
      dire: "Mesurer — On relève d'abord le bruit ambiant, machine en marche, puis le bruit résiduel, machine arrêtée, au même point et dans les mêmes conditions. L'émergence est l'écart entre les deux relevés." },
    { station: "acoustique-pac-voisinage", titre: "Angle et distance", bulle: ["Quel bruit reçoit", "le voisin ?"], bras: -76, cycle: 11.4, dessiner: angle,
      dire: "PAC & voisinage — Exemple : le voisin reçoit 46 dB(A) d'un groupe posé dans un angle, 40 au sol, 34 deux fois plus loin. Sortir de l'angle rapporte autant que doubler la distance." },
    { station: "acoustique-traiter-le-bruit", titre: "Couper le chemin", bulle: ["Par où passe", "le bruit ?"], bras: -72, cycle: 11.4, dessiner: chemins,
      dire: "Traiter le bruit — Un bruit passe par l'air ou par la structure : on ne les traite pas pareil. Des plots coupent la dalle, un écran agit sur l'air." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires suit le bruit d'une machine en cinq étapes : " +
    "les niveaux en décibels qui ne s'additionnent pas comme des nombres (Le bruit en dB), l'émergence comparée aux limites de jour et de nuit (Les seuils), " +
    "le relevé du bruit ambiant puis du bruit résiduel au même point (Mesurer), l'exemple d'une unité extérieure dans un angle, au sol, deux fois plus loin (PAC et voisinage), " +
    "les deux chemins du bruit, l'air et la dalle, et leur traitement (Traiter le bruit).");
  D.el("rect", { x: 0, y: 0, width: 1000, height: 440, fill: C.papier }, dessin);
  /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
     cartouche « Édu » (celui de l'en-tête des stations) à la place de « Studio » (vidéos) */
  D.filigrane(dessin, [[205, 120], [500, 236], [800, 352]], 300).querySelectorAll("text")
    .forEach(t => { if (t.textContent === "Studio") t.textContent = "Édu"; });
  D.el("path", { d: "M24 410 H286", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, dessin);
  const charge = bonhomme(dessin, { dossier: true });
  const bulle = D.el("g", {}, dessin);
  D.el("path", { d: "M30 30 H286 Q300 30 300 44 V136 Q300 150 286 150 H168 L136 188 L144 150 H30 Q16 150 16 136 V44 Q16 30 30 30 Z",
    fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, bulle);
  const question = [82, 118].map(y => ecrire(bulle, 158, y, "", 26, { "text-anchor": "middle", "font-weight": 700, fill: C.navy }));
  const plateau = D.el("g", {}, dessin);
  const badge = D.el("g", { opacity: 0 }, dessin);
  D.el("rect", { x: 796, y: 10, width: 192, height: 42, rx: 21, fill: ACCENT }, badge);
  ecrire(badge, 892, 39, "★ Votre station", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.papier });

  let anime = null, debut = 0, brasDe = 0, brasVers = 0, brasIci = 0;
  function image(maintenant) {
    const t = (maintenant - debut) / 1000;
    if (anime) anime(t);
    brasIci = D.lerp(brasDe, brasVers, FIGE ? 1 : D.lisse(t / 0.6));
    charge({ x: 128, y: 205.6, k: 2.8, t: maintenant / 1000, bras: brasIci + (FIGE ? 0 : Math.sin(maintenant / 700) * 3) });
  }
  function peindre(i) {
    while (plateau.firstChild) plateau.removeChild(plateau.firstChild);
    anime = ETAPES[i].dessiner(plateau);
    ETAPES[i].bulle.forEach((s, k) => { question[k].textContent = s; });
    badge.setAttribute("opacity", ETAPES[i].station === hote.dataset.station ? 1 : 0);
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
    "La branche en " + ["", "une", "deux", "trois", "quatre", "cinq", "six"][ETAPES.length] + " étapes, une par station ; ★ marque l'étape de cette station. « ▶ Dérouler » joue toute la branche.");
  hote.appendChild(bloc);

  /* l'étape de la station : marquée ★ et ouverte d'emblée */
  const boutons = Array.from(bloc.querySelectorAll("button[data-etape]"));
  const ici = ETAPES.findIndex(e => e.station === hote.dataset.station);
  if (ici >= 0) {
    boutons[ici].textContent = "★ " + boutons[ici].textContent;
    boutons[ici].classList.add("etape-ici");
    boutons[ici].title = "L'étape de cette station";
    boutons[ici].click();
  }

  /* « ▶ Dérouler » : toute la branche depuis l'étape 1, chaque étape le temps de son cycle.
     Écouteur en capture sur la barre : il passe avant celui du kit, qui ne part donc pas. */
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
    } else if (e.isTrusted && minuterie) finFilm();   // l'élève choisit une étape : le film s'arrête
  }, true);
})();
