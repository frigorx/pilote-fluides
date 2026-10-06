/* =====================================================================
   scenes/electrique.js — la scène de la branche « Électrique »
   ---------------------------------------------------------------------
   Remplace l'image scene-electrique.webp en tête de l'accueil des six
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="electrique" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Le pas à pas : SceneKit (cartoclim/stations/_commun/scene-kit.js), une
   étape par station de la branche, dans l'ordre du plan. L'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche depuis l'étape 1, chaque étape le temps de son cycle (le film du
   kit avance toutes les 2,6 s, trop vite pour lire la phrase).
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — des formes
   simples, JAMAIS un schéma électrique normalisé : un disjoncteur est vu de
   face (boîtier et levier), la terre est un piquet planté dans le sol, le
   neutre est à gauche, une seule protection par départ (jamais empilées).
   Le chargé d'affaires : le bonhomme « plein » de HoCourant (option B,
   décision de F. Henninot du 30/09/2026 pour l'animé), recopié tel quel ;
   ajouts : un dossier dans la main arrière, ou une casquette et un titre
   dans la main pour le technicien. Aucune image nouvelle.
   Les deux moteurs sont LUS, jamais modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités (≥ 18,7 px quand le dessin fait
   850 px) ; tout bouge par le temps t (requestAnimationFrame), sans jamais
   tester prefers-reduced-motion ; seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape. Faits : ceux des six stations, aucun
   chiffre nouveau (30 mA et IB ≤ In ≤ IZ sont ceux des stations).
   Un seul accent orange par étape : le défaut qui est isolé (1), la
   protection qui coupe (2, 4), l'employeur qui habilite (5), la tension (6).
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="electrique"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#a16207";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const JAUNE = "#f2c230", TEINTE = "#f4eadb", SABLE = "#e3d5b5", COUPE = "#b4bfcb", APPAREIL = "#e8f1fb", ETEINT = "#d3dae3";
  const rgb = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16));
  const melange = (a, b, k) => { const A = rgb(a), B = rgb(b); return "rgb(" + A.map((v, i) => Math.round(D.lerp(v, B[i], D.borne(k, 0, 1)))).join(",") + ")"; };

  /* l'éclair d'un défaut : un polygone plein, posé par son centre */
  function eclair(parent, x, y, k, coul) {
    return D.el("polygon", { points: "5,-22 -11,3 -1,3 -5,22 11,-5 1,-5", fill: coul, stroke: C.navy, "stroke-width": 2, "stroke-linejoin": "round",
      transform: `translate(${x} ${y}) scale(${k})` }, parent);
  }

  /* un fil qui conduit : le trait, puis des tirets clairs qui avancent dans le sens du tracé
     (le tracé va de l'amont vers l'aval ; actif 0 ou 1 allume ou éteint les tirets ; ep change l'épaisseur) */
  function fil(parent, d, coul, ep) {
    const base = D.el("path", { d: d, fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    const tirets = D.el("path", { d: d, fill: "none", stroke: C.papier, "stroke-width": Math.max(2, ep / 3), "stroke-dasharray": "3 15", "stroke-linecap": "round" }, parent);
    return {
      base: base, tirets: tirets,
      maj: (t, actif, e) => {
        if (e !== undefined) { base.setAttribute("stroke-width", e.toFixed(1)); tirets.setAttribute("stroke-width", Math.max(1.5, e / 3).toFixed(1)); }
        tirets.setAttribute("stroke-dashoffset", (-t * 36).toFixed(1));
        voir(tirets, actif);
      }
    };
  }

  /* un disjoncteur vu de face (boîtier et levier, pas un symbole) : levier en haut = enclenché, en bas = déclenché ;
     coulOuvert : la couleur qu'il prend en déclenchant (sans elle, il garde la sienne) */
  function disjoncteur(parent, x, y, h, coulOuvert) {
    const boite = D.el("rect", { x: x - 23, y: y, width: 46, height: h, rx: 8, fill: TEINTE, stroke: C.navy, "stroke-width": 3 }, parent);
    D.el("rect", { x: x - 7, y: y + 9, width: 14, height: h - 18, rx: 7, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, parent);
    const bouton = D.el("rect", { x: x - 9, y: y + 8, width: 18, height: 20, rx: 5, fill: ACCENT, stroke: C.navy, "stroke-width": 2 }, parent);
    return o => {   // o : 0 = enclenché, 1 = déclenché
      bouton.setAttribute("y", (y + 8 + o * (h - 38)).toFixed(1));
      bouton.setAttribute("fill", o > 0.5 && coulOuvert ? coulOuvert : ACCENT);
      boite.setAttribute("stroke", o > 0.5 && coulOuvert ? coulOuvert : C.navy);
    };
  }

  /* un cadenas posé par le haut de son corps : l'anse se lève quand il est ouvert (o = 1) */
  function cadenas(parent, x, y) {
    const anse = D.el("path", { d: `M${x - 8} ${y} V${y - 11} a8 8 0 0 1 16 0 V${y}`, fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round" }, parent);
    D.el("rect", { x: x - 14, y: y, width: 28, height: 22, rx: 4, fill: ACCENT, stroke: C.navy, "stroke-width": 2.5 }, parent);
    D.el("circle", { cx: x, cy: y + 10, r: 3, fill: C.papier }, parent);
    return o => anse.setAttribute("transform", `translate(0 ${(-9 * o).toFixed(1)})`);
  }

  const croix = (parent, x, y) => {
    const c = D.el("g", { opacity: 0 }, parent);
    D.el("circle", { cx: x, cy: y, r: 15, fill: C.rouge }, c);
    D.el("path", { d: `M${x - 6} ${y - 6} l12 12 M${x + 6} ${y - 6} l-12 12`, fill: "none", stroke: C.papier, "stroke-width": 3.5, "stroke-linecap": "round" }, c);
    return c;
  };

  /* ---------- étape 1 · NF C 15-100 : un départ, une protection — le défaut n'ouvre que son départ ---------- */
  function tableau(g) {
    const XS = [385, 497, 609, 721, 833, 945];
    const NOMS = [["Éclairage"], ["Prises"], ["Chauffage"], ["Eau", "chaude"], ["VMC"], ["Cuisson"]];
    ecrire(g, 372, 92, "Tableau", 22, { "font-weight": 700, fill: C.navy });
    const arrivee = fil(g, "M352 62 V118", C.navy, 8);
    D.el("rect", { x: 338, y: 112, width: 642, height: 14, rx: 5, fill: C.navy }, g);
    const circuits = XS.map((x, i) => {
      const haut = fil(g, `M${x} 126 V158`, C.navy, 8), bas = fil(g, `M${x} 218 V280`, C.navy, 8);
      const levier = disjoncteur(g, x, 158, 60, C.orange);
      const halo = D.el("circle", { cx: x, cy: 304, r: 26, fill: JAUNE }, g);
      const voyant = D.el("circle", { cx: x, cy: 304, r: 20, stroke: C.navy, "stroke-width": 3 }, g);
      NOMS[i].forEach((s, k) => ecrire(g, x, 360 + k * 30, s, 22, { "text-anchor": "middle" }));
      return { haut: haut, bas: bas, levier: levier, halo: halo, voyant: voyant };
    });
    const choc = eclair(g, 609, 250, 1.25, JAUNE);
    const legende = ecrire(g, 660, 424, "Seul le départ en défaut s'ouvre", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    return t => {
      const f = FIGE ? 8 : t % 10, reste = 1 - D.lisse((f - 9.2) / 0.6);
      const ouvert = D.lisse((f - 3.4) / 0.4) * reste;   // le levier du chauffage tombe
      const eclat = D.lisse((f - 2.2) / 0.2) * reste * (f < 3.4 ? 0.55 + 0.45 * Math.abs(Math.sin(f * 16)) : 1);
      arrivee.maj(t, 1);
      circuits.forEach((c, i) => {
        const alim = i === 2 ? 1 - ouvert : 1, vif = alim > 0.5;
        c.haut.maj(t, 1);
        c.bas.maj(t, vif ? 1 : 0);
        c.bas.base.setAttribute("stroke", vif ? C.navy : COUPE);
        c.levier(i === 2 ? ouvert : 0);
        c.voyant.setAttribute("fill", vif ? JAUNE : ETEINT);
        voir(c.halo, (vif ? 0.4 : 0) * (i === 2 && f > 2.2 && f < 3.4 ? 0.5 + 0.5 * Math.abs(Math.sin(f * 20)) : 1));
      });
      voir(choc, eclat);
      voir(legende, D.lisse((f - 3.9) / 0.4) * reste);
    };
  }

  /* ---------- étape 2 · Terre & différentiel : il compare l'aller et le retour, l'écart le fait couper ---------- */
  function differentiel(g) {
    const XN = 470, XL = 570;   // le neutre (retour) à gauche, la phase (aller) à droite
    D.el("rect", { x: 420, y: 62, width: 200, height: 48, rx: 10, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, g);
    ecrire(g, 520, 94, "Source", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    D.el("rect", { x: 322, y: 410, width: 108, height: 22, rx: 3, fill: SABLE }, g);
    ecrire(g, 444, 424, "Terre", 22, { "font-weight": 700, fill: C.navy });
    const retourH = fil(g, `M${XN} 262 V110`, C.bleu, 10), retourB = fil(g, `M${XN} 318 V288`, C.bleu, 10);
    const allerH = fil(g, `M${XL} 110 V262`, ACCENT, 10), allerB = fil(g, `M${XL} 288 V318`, ACCENT, 10);
    const lames = [XN, XL].map(x => {   // les contacts : pivot en bas, la lame s'ouvre vers la gauche
      D.el("circle", { cx: x, cy: 262, r: 6, fill: C.navy }, g);
      D.el("circle", { cx: x, cy: 288, r: 6, fill: C.navy }, g);
      const lame = D.el("g", {}, g);
      D.el("path", { d: `M${x} 288 V262`, fill: "none", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, lame);
      return a => lame.setAttribute("transform", `rotate(${a.toFixed(1)} ${x} 288)`);
    });
    const anneau = D.el("ellipse", { cx: 520, cy: 196, rx: 84, ry: 38, fill: "none", stroke: C.navy, "stroke-width": 7 }, g);
    ecrire(g, 454, 142, "Retour", 22, { "text-anchor": "end", "font-weight": 700, fill: C.bleu });
    ecrire(g, 586, 142, "Aller", 22, { "font-weight": 700, fill: ACCENT });
    // la pompe à chaleur, son défaut, son conducteur de protection planté dans le sol
    D.el("rect", { x: 420, y: 318, width: 200, height: 72, rx: 8, fill: APPAREIL, stroke: C.navy, "stroke-width": 3 }, g);
    ecrire(g, 520, 363, "PAC", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const choc = eclair(g, 588, 352, 1.2, JAUNE);
    const pe = fil(g, "M420 354 H372 V416", C.vert, 6);
    pe.tirets.setAttribute("stroke", JAUNE);
    D.el("path", { d: "M372 400 V430", fill: "none", stroke: C.gris, "stroke-width": 7, "stroke-linecap": "round" }, g);
    // la sensibilité : celle qui protège les personnes
    ecrire(g, 872, 150, "Différentiel", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    D.el("path", { d: "M606 196 L782 203", fill: "none", stroke: C.navy, "stroke-width": 3 }, g);
    D.el("rect", { x: 782, y: 168, width: 180, height: 70, rx: 14, fill: TEINTE, stroke: ACCENT, "stroke-width": 3 }, g);
    ecrire(g, 872, 218, "30 mA", 40, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    ecrire(g, 872, 276, "haute sensibilité", 22, { "text-anchor": "middle" });
    ecrire(g, 872, 304, "protège les personnes", 22, { "text-anchor": "middle" });
    return t => {
      const f = FIGE ? 7 : t % 11, reste = 1 - D.lisse((f - 10.2) / 0.7);
      const fuite = D.lisse((f - 2.6) / 0.8) * reste, amincit = D.lisse((f - 2.8) / 1) * reste, coupe = D.lisse((f - 4.4) / 0.5) * reste;
      const vif = coupe < 0.5 ? 1 : 0, wN = D.lerp(10, 5, amincit);   // le retour s'amincit : il en revient moins
      retourH.maj(t, vif, wN); retourB.maj(t, vif, wN);
      allerH.maj(t, vif); allerB.maj(t, vif);
      pe.maj(t, vif * (fuite > 0.3 ? 1 : 0));
      voir(choc, D.lisse((f - 2.2) / 0.2) * reste * (f < 4.4 ? 0.55 + 0.45 * Math.abs(Math.sin(f * 16)) : 1));
      anneau.setAttribute("stroke", f > 4 && reste > 0.5 ? C.orange : C.navy);   // l'anneau voit l'écart
      lames.forEach(l => l(-42 * coupe));
    };
  }

  /* ---------- étape 3 · Protéger un circuit : IB ≤ In ≤ IZ — le calibre protège le câble ---------- */
  function regle(g) {
    const carte = (x0, bonne) => {
      const T = bonne ? { IB: 0.22, In: 0.5, IZ: 0.78 } : { IB: 0.22, IZ: 0.5, In: 0.78 };   // à droite, le calibre dépasse le câble
      const Y = fr => 378 - fr * 244, XC = x0 + 200;
      D.el("rect", { x: x0, y: 64, width: 324, height: 362, rx: 16, fill: bonne ? "#eaf4ee" : "#fbe9e6", stroke: bonne ? C.vert : C.rouge, "stroke-width": 4 }, g);
      ecrire(g, x0 + 150, 106, bonne ? "Correct" : "Faux", 26, { "text-anchor": "middle", "font-weight": 700, fill: bonne ? C.vert : C.rouge });
      const marque = bonne ? coche(g, x0 + 296, 98) : croix(g, x0 + 296, 98);
      // la jauge du courant et ses trois repères
      D.el("rect", { x: x0 + 34, y: 128, width: 34, height: 256, rx: 17, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, g);
      if (!bonne) D.el("rect", { x: x0 + 39, y: Y(T.In), width: 24, height: Y(T.IZ) - Y(T.In), fill: C.rouge, opacity: 0.28 }, g);   // la zone où le câble souffre sans que rien ne coupe
      const niveau = D.el("rect", { x: x0 + 39, width: 24, rx: 8, fill: C.bleu }, g);
      [["IB", C.bleu], ["In", ACCENT], ["IZ", C.navy]].forEach(([k, coul]) => {
        D.el("path", { d: `M${x0 + 72} ${Y(T[k])} H${x0 + 112}`, fill: "none", stroke: coul, "stroke-width": 4, "stroke-linecap": "round" }, g);
        ecrire(g, x0 + 120, Y(T[k]) + 8, k, 22, { "font-weight": 700, fill: coul });
      });
      ecrire(g, x0 + 51, 412, "courant", 22, { "text-anchor": "middle", fill: C.gris });
      // le circuit : l'entrée, le disjoncteur (son calibre), le câble
      const entree = fil(g, `M${XC} 134 V190`, C.navy, 8);
      const levier = disjoncteur(g, XC, 190, 60);
      const cable = fil(g, `M${XC} 250 V372`, C.navy, 18);
      ecrire(g, XC + 34, 226, "calibre", 22, { "font-weight": 700, fill: ACCENT });
      ecrire(g, XC + 24, 316, "câble", 22, { "font-weight": 700, fill: C.navy });
      const chaleur = [292, 322, 352].map(y => D.el("path", { d: `M${XC - 46} ${y} q8 -10 16 0 t16 0`, fill: "none", stroke: C.rouge, "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, g));
      return (t, niv, lev, chauffe, mq) => {
        const y = Y(niv);
        niveau.setAttribute("y", y.toFixed(1)); niveau.setAttribute("height", Math.max(0, 378 - y).toFixed(1));
        niveau.setAttribute("fill", melange(C.bleu, C.rouge, chauffe));
        cable.base.setAttribute("stroke", melange(C.navy, C.rouge, chauffe));
        const circule = niv > 0.02 ? 1 : 0;
        entree.maj(t, circule); cable.maj(t, circule);
        levier(lev);
        chaleur.forEach((w, i) => voir(w, D.lisse((chauffe - 0.3) / 0.4) * (0.65 + 0.35 * Math.sin(t * 7 + i * 1.7))));
        voir(marque, mq);
      };
    };
    const juste = carte(318, true), fausse = carte(656, false);
    return t => {
      const f = FIGE ? 8 : t % 11, reste = 1 - D.lisse((f - 10.2) / 0.7);
      const brut = 0.22 + 0.4 * D.lisse((f - 1.2) / 2.4) * reste;   // la même surcharge arrive des deux côtés
      const coupe = D.lisse((f - 2.75) / 0.3) * reste, chute = D.lisse((f - 2.9) / 0.5) * reste;
      juste(t, Math.min(brut, 0.506) * (1 - chute), coupe, 0, D.lisse((f - 4) / 0.3) * reste);   // le calibre coupe avant le câble
      fausse(t, brut, 0, D.lisse((f - 3) / 2.2) * reste, D.lisse((f - 5.6) / 0.3) * reste);       // le calibre est trop haut : le câble chauffe
    };
  }

  /* le courant de défaut, en orange comme dans les schémas de la station : trait plein qui avance, ou pointillés dans le sol.
     vif : le courant circule ; trace : une fois le défaut coupé, seuls les pointillés du sol restent visibles, pâles */
  function courantDefaut(parent, d, ep, pointille) {
    const trait = D.el("path", { d: d, fill: "none", stroke: C.orange, "stroke-width": ep, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, parent);
    if (pointille) trait.setAttribute("stroke-dasharray", "6 9");
    const tirets = pointille ? null : D.el("path", { d: d, fill: "none", stroke: C.papier, "stroke-width": Math.max(2, ep / 3), "stroke-dasharray": "3 15", "stroke-linecap": "round", opacity: 0 }, parent);
    return (t, vif, trace) => {
      voir(trait, pointille ? Math.max(vif, 2 * trace) : vif);
      if (pointille) trait.setAttribute("stroke-dashoffset", (-t * 30).toFixed(1));
      else { tirets.setAttribute("stroke-dashoffset", (-t * 36).toFixed(1)); voir(tirets, vif); }
    };
  }

  /* ---------- étape 4 · Régimes de neutre : le même défaut, trois boucles, trois façons d'y répondre ----------
     Le poste en haut (neutre à gauche, phase à droite), la machine en bas, le conducteur de protection en vert.
     TT : le neutre du poste a sa prise de terre, la masse de la machine a la sienne : la boucle passe par le sol.
     TN : la masse rejoint directement le neutre du poste, sans passer par le sol : boucle courte, courant fort.
     IT : le neutre du poste est isolé, surveillé par le CPI ; la masse est à la terre ; le 1er défaut ne coupe rien. */
  function regimes(g) {
    const X0 = [316, 536, 756], DEBUT = [1.2, 3.8, 6.4], REAC = [1.5, 1.1, 0.9];
    const VERDICT = [["Le différentiel", "coupe"], ["Disjoncteur ou", "fusible : coupe"], ["Au 1er défaut,", "le CPI signale"]];
    const panneaux = ["TT", "TN", "IT"].map((code, i) => {
      const x0 = X0[i], cx = x0 + 104, XN = cx - 22, XL = cx + 22, TN = i === 1;
      D.el("rect", { x: x0, y: 66, width: 208, height: 358, rx: 16, fill: TEINTE, stroke: ACCENT, "stroke-width": 3 }, g);
      ecrire(g, cx, 106, code, 34, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      // le sol et les prises de terre : celle du poste (TT, TN) et celle de la machine (TT, IT)
      D.el("rect", { x: x0 + 10, y: 332, width: 188, height: 14, rx: 3, fill: SABLE }, g);
      const piquet = x => D.el("path", { d: `M${x} 322 V342`, fill: "none", stroke: C.gris, "stroke-width": 7, "stroke-linecap": "round" }, g);
      if (i < 2) {   // le neutre du poste est relié à la terre
        D.el("path", { d: `M${XN} 178 H${x0 + 18} V334`, fill: "none", stroke: C.bleu, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        piquet(x0 + 18);
      }
      // le conducteur de protection : en TN il remonte au neutre du poste, sinon il descend à la terre de la machine
      D.el("path", { d: TN ? `M${cx - 52} 294 H${x0 + 34} V178` : `M${cx + 52} 294 H${x0 + 184} V334`, fill: "none", stroke: C.vert, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
      if (!TN) piquet(x0 + 184);
      // la boucle du courant de défaut (en IT, le premier défaut est trop faible pour se dessiner : on ne trace rien)
      let boucle = null;
      if (i === 0) {
        const a = courantDefaut(g, `M${cx + 52} 294 H${x0 + 184} V339`, 4, false);
        const b = courantDefaut(g, `M${x0 + 184} 339 H${x0 + 18}`, 4, true);
        const c = courantDefaut(g, `M${x0 + 18} 339 V178 H${XN}`, 4, false);
        boucle = (t, vif, trace) => { a(t, vif, trace); b(t, vif, trace); c(t, vif, trace); };
      } else if (TN) boucle = courantDefaut(g, `M${cx - 52} 294 H${x0 + 34} V178 H${XN}`, 7, false);
      // le poste, ses deux fils : le neutre à gauche (retour), la phase à droite (aller)
      D.el("rect", { x: x0 + 48, y: 124, width: 112, height: 44, rx: 8, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, g);
      ecrire(g, cx, 153, "Poste", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      const nH = fil(g, `M${XN} 232 V168`, C.bleu, 6), nB = fil(g, `M${XN} 262 V232`, C.bleu, 6);
      const lH = fil(g, `M${XL} 168 V232`, ACCENT, 6), lB = fil(g, `M${XL} 232 V262`, ACCENT, 6);
      if (i < 2) D.el("circle", { cx: XN, cy: 178, r: 5, fill: C.navy }, g);   // le point neutre, relié à la terre
      if (TN) D.el("circle", { cx: x0 + 34, cy: 178, r: 5, fill: C.navy }, g);  // la masse y est reliée
      // la protection de ce régime
      let reagit;   // (r 0..1, t, f, début du défaut)
      if (i === 0) {   // le différentiel : l'anneau autour des deux fils
        const halo = D.el("ellipse", { cx: cx, cy: 208, rx: 46, ry: 22, fill: "none", stroke: JAUNE, "stroke-width": 14, opacity: 0 }, g);
        D.el("ellipse", { cx: cx, cy: 208, rx: 46, ry: 22, fill: "none", stroke: ACCENT, "stroke-width": 6 }, g);
        reagit = r => voir(halo, 0.8 * r);
      } else if (TN) {   // le fusible, sur la phase
        D.el("rect", { x: XL - 11, y: 188, width: 22, height: 44, rx: 11, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, g);
        const filament = D.el("path", { d: `M${XL} 196 V224`, fill: "none", stroke: ACCENT, "stroke-width": 3, "stroke-linecap": "round" }, g);
        const etincelle = eclair(g, XL, 210, 0.55, JAUNE);
        reagit = (r, t, f, s) => {
          filament.setAttribute("d", r > 0.5 ? `M${XL} 196 V204 M${XL} 216 V224` : `M${XL} 196 V224`);
          voir(etincelle, D.fenetre(f, s + REAC[1], s + REAC[1] + 0.7, 0.15));
        };
      } else {   // le contrôleur permanent d'isolement, relié au neutre isolé
        D.el("rect", { x: x0 + 10, y: 190, width: 58, height: 44, rx: 8, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, g);
        D.el("path", { d: `M${x0 + 68} 212 H${XN}`, fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "5 4" }, g);
        const halo = D.el("circle", { cx: x0 + 39, cy: 212, r: 19, fill: JAUNE }, g);
        const voyant = D.el("circle", { cx: x0 + 39, cy: 212, r: 12, fill: ETEINT, stroke: C.navy, "stroke-width": 2.5 }, g);
        reagit = (r, t) => { voyant.setAttribute("fill", r > 0.5 ? JAUNE : ETEINT); voir(halo, r > 0.5 ? 0.45 + 0.25 * Math.sin(t * 8) : 0); };
      }
      // la machine, son défaut
      D.el("rect", { x: cx - 52, y: 262, width: 104, height: 56, rx: 8, fill: APPAREIL, stroke: C.navy, "stroke-width": 3 }, g);
      const ventilo = D.ventilateur(g, cx, 290, 20);
      const choc = eclair(g, x0 + 174, 268, 0.9, JAUNE);
      const verdict = D.el("g", { opacity: 0 }, g);
      ecrire(verdict, cx, 378, VERDICT[i][0], 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      ecrire(verdict, cx, 406, VERDICT[i][1], 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
      let ang = 0, tp = null;
      return (t, f, reste) => {
        const s = DEBUT[i], re = REAC[i];
        const a = D.lisse((f - s) / 0.2) * reste, r = D.lisse((f - s - re) / 0.3) * reste, v = D.lisse((f - s - re - 0.6) / 0.4) * reste;
        const flot = D.lisse((f - s - 0.3) / 0.3) * (1 - r) * reste;   // le courant de défaut circule jusqu'à ce que la protection réagisse
        const alim = i === 2 ? 1 : 1 - r, vif = alim > 0.5 ? 1 : 0;   // en IT, le premier défaut ne coupe rien
        nH.maj(t, vif); lH.maj(t, vif); nB.maj(t, vif); lB.maj(t, vif);
        nB.base.setAttribute("stroke", vif ? C.bleu : COUPE); lB.base.setAttribute("stroke", vif ? ACCENT : COUPE);
        const dt = tp === null ? 0 : Math.max(0, t - tp); tp = t; ang += dt * 300 * alim * alim; ventilo(ang);
        voir(choc, a * (f < s + re ? 0.55 + 0.45 * Math.abs(Math.sin(f * 16)) : 1));
        if (boucle) boucle(t, flot, 0.3 * r);
        reagit(r, t, f, s);
        voir(verdict, v);
      };
    });
    return t => {
      const f = FIGE ? 9 : t % 11.5, reste = 1 - D.lisse((f - 10.6) / 0.7);
      panneaux.forEach(p => p(t, f, reste));
    };
  }

  /* ---------- étape 5 · L'habilitation : un titre de l'employeur, trois questions, puis on ouvre ---------- */
  function habilitation(g) {
    D.el("rect", { x: 322, y: 64, width: 232, height: 136, rx: 14, fill: TEINTE, stroke: ACCENT, "stroke-width": 3 }, g);
    ecrire(g, 438, 98, "Titre d'habilitation", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    D.el("rect", { x: 338, y: 112, width: 76, height: 68, rx: 10, fill: ACCENT }, g);
    ecrire(g, 376, 158, "BR", 40, { "text-anchor": "middle", "font-weight": 700, fill: C.papier });
    ecrire(g, 426, 140, "délivré par", 22);
    ecrire(g, 426, 168, "l'employeur", 22, { "font-weight": 700, fill: C.orange });
    const tech = bonhomme(g, { casquette: true, carte: true, dephasage: 0.4 });
    // les trois questions d'avant l'ouverture
    const QUESTIONS = ["Le bon symbole", "Titre à jour", "Consigné"], YS = [132, 214, 296];
    const coches = QUESTIONS.map((q, i) => {
      D.el("circle", { cx: 622, cy: YS[i], r: 18, fill: C.papier, stroke: C.gris, "stroke-width": 3 }, g);
      ecrire(g, 652, YS[i] + 8, q, 22, { "font-weight": 700, fill: C.navy });
      return coche(g, 622, YS[i]);
    });
    // l'armoire : l'intérieur, puis la porte qui pivote sur sa charnière
    D.el("rect", { x: 836, y: 100, width: 132, height: 290, rx: 6, fill: APPAREIL, stroke: C.navy, "stroke-width": 3 }, g);
    D.el("rect", { x: 844, y: 108, width: 116, height: 274, rx: 3, fill: "#2b3f5c" }, g);
    [0, 1, 2].forEach(r => {
      D.el("rect", { x: 852, y: 122 + r * 86, width: 100, height: 62, rx: 3, fill: "#3d587f" }, g);
      [0, 1, 2, 3, 4].forEach(k => D.el("rect", { x: 860 + k * 18, y: 132 + r * 86, width: 12, height: 42, rx: 2, fill: "#dfe8f3" }, g));
    });
    const porte = D.el("g", {}, g);
    D.el("rect", { x: 836, y: 100, width: 132, height: 290, rx: 6, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3 }, porte);
    eclair(porte, 902, 205, 1.7, JAUNE);
    D.el("circle", { cx: 950, cy: 250, r: 6, fill: C.navy }, porte);
    const serrure = cadenas(porte, 930, 306);
    return t => {
      const f = FIGE ? 8 : t % 11.5, reste = 1 - D.lisse((f - 10.6) / 0.7);
      [1.2, 2.6, 4].forEach((d, i) => voir(coches[i], D.lisse((f - d) / 0.3) * reste));
      serrure(D.lisse((f - 5) / 0.4) * reste);
      const ouverte = D.lisse((f - 5.4) / 0.9) * reste;
      porte.setAttribute("transform", `translate(836 0) scale(${D.lerp(1, 0.22, ouverte).toFixed(3)} 1) translate(-836 0)`);
      tech({ x: 392, y: 226, k: 2.1, t: t, bras: D.courbe([[0, -15], [4.6, -15], [5.4, -76], [9.8, -76], [10.8, -15]], f) });
    };
  }

  /* ---------- étape 6 · Consigner : séparer, condamner, identifier, vérifier l'absence de tension ---------- */
  function consigner(g) {
    const YL = 208;
    ecrire(g, 330, 168, "Réseau", 22, { "font-weight": 700, fill: C.navy });
    const amont = fil(g, `M330 ${YL} H520`, C.orange, 9), aval = fil(g, `M612 ${YL} H800`, C.orange, 9);
    D.el("circle", { cx: 520, cy: YL, r: 8, fill: C.navy }, g);
    D.el("circle", { cx: 612, cy: YL, r: 8, fill: C.navy }, g);
    const lame = D.el("path", { d: `M520 ${YL} H612`, fill: "none", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, g);
    D.el("rect", { x: 800, y: 138, width: 178, height: 140, rx: 10, fill: APPAREIL, stroke: C.navy, "stroke-width": 3 }, g);
    const ventilo = D.ventilateur(g, 889, YL, 50);
    // identifier : le même repère sur le sectionneur et sur le groupe
    const reperes = D.el("g", { opacity: 0 }, g);
    [518, 800].forEach(x => {
      D.el("rect", { x: x, y: 88, width: 56, height: 46, rx: 10, fill: TEINTE, stroke: ACCENT, "stroke-width": 3 }, reperes);
      ecrire(reperes, x + 28, 119, "Q2", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    });
    D.el("path", { d: "M574 111 H800", fill: "none", stroke: ACCENT, "stroke-width": 3, "stroke-dasharray": "8 7" }, reperes);
    // condamner : le cadenas et la pancarte
    const condamne = D.el("g", { opacity: 0 }, g);
    const verrou = cadenas(condamne, 566, 246);
    D.el("path", { d: "M566 268 V286", fill: "none", stroke: C.navy, "stroke-width": 3 }, condamne);
    D.el("rect", { x: 500, y: 286, width: 132, height: 46, rx: 6, fill: TEINTE, stroke: ACCENT, "stroke-width": 3 }, condamne);
    ecrire(condamne, 566, 317, "Condamné", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    // vérifier : le vérificateur d'absence de tension, voyant éteint
    const testeur = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: `M707 240 V${YL + 8}`, fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round" }, testeur);
    D.el("rect", { x: 690, y: 240, width: 34, height: 64, rx: 8, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, testeur);
    D.el("circle", { cx: 707, cy: 262, r: 9, fill: ETEINT, stroke: C.navy, "stroke-width": 2.5 }, testeur);
    ecrire(testeur, 742, 280, "VAT", 22, { "font-weight": 700, fill: C.navy });
    const okVat = coche(g, 707, 170);
    // les quatre étapes, dans l'ordre
    const NOMS = ["1 Séparer", "2 Condamner", "3 Identifier", "4 Vérifier"], XS = [316, 486, 656, 826];
    const pilules = NOMS.map((n, i) => ({
      fond: D.el("rect", { x: XS[i], y: 362, width: 162, height: 50, rx: 25, fill: C.papier, stroke: C.gris, "stroke-width": 2.5 }, g),
      txt: ecrire(g, XS[i] + 81, 394, n, 22, { "text-anchor": "middle", "font-weight": 700, fill: C.gris }),
      ok: coche(g, XS[i] + 150, 350)
    }));
    const etat = (p, fait, actif) => {
      p.fond.setAttribute("fill", fait > 0.5 ? "#e6f2ef" : C.papier);
      p.fond.setAttribute("stroke", fait > 0.5 ? C.vert : actif ? ACCENT : C.gris);
      p.fond.setAttribute("stroke-width", actif ? 3.5 : 2.5);
      p.txt.setAttribute("fill", fait > 0.5 || actif ? C.navy : C.gris);
      voir(p.ok, fait);
    };
    let ang = 0, tp = null;
    return t => {
      const f = FIGE ? 9 : t % 12, reste = 1 - D.lisse((f - 11) / 0.7);
      const ouvre = D.lisse((f - 1.5) / 0.7) * reste, ferme = D.lisse((f - 3.2) / 0.5) * reste;
      const repere = D.lisse((f - 5) / 0.5) * reste, vat = D.lisse((f - 6.6) / 0.7) * reste;
      const alim = 1 - ouvre;
      lame.setAttribute("transform", `rotate(${(-38 * ouvre).toFixed(1)} 520 ${YL})`);
      amont.maj(t, 1);
      aval.base.setAttribute("stroke", alim > 0.5 ? C.orange : COUPE); aval.maj(t, alim > 0.5 ? 1 : 0);
      const dt = tp === null ? 0 : Math.max(0, t - tp); tp = t; ang += dt * 280 * alim * alim; ventilo(ang);
      voir(condamne, ferme); verrou(1 - ferme);
      voir(reperes, repere);
      voir(testeur, vat); testeur.setAttribute("transform", `translate(0 ${((1 - vat) * 40).toFixed(1)})`);
      voir(okVat, D.lisse((f - 7.9) / 0.3) * reste);
      [[1.5, 2.4], [3.2, 4.2], [5, 5.9], [6.6, 8.2]].forEach(([debut, fin], i) =>
        etat(pilules[i], D.lisse((f - fin) / 0.3) * reste, f >= debut && f < fin && reste > 0.5));
    };
  }

  /* ---------- les six étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "elec-nf-c-15-100", titre: "Isoler le défaut", bulle: ["Un défaut : que", "coupe-t-on ?"], bras: -72, cycle: 10, dessiner: tableau,
      dire: "NF C 15-100 — Au tableau, chaque circuit a son sectionnement et sa protection : un défaut n'ouvre que son départ, les autres restent alimentés. Le texte fixe le but, la norme la méthode." },
    { station: "elec-terre-differentiel", titre: "Aller et retour", bulle: ["Un courant fuit :", "qui coupe ?"], bras: -70, cycle: 11, dessiner: differentiel,
      dire: "Terre & différentiel — Le différentiel compare le courant d'aller et de retour. Si une partie s'échappe par la terre, l'écart déclenche la coupure ; 30 mA ou moins protègent les personnes." },
    { station: "elec-proteger-un-circuit", titre: "Protéger le câble", bulle: ["Ça déclenche : on", "monte le calibre ?"], bras: -100, cycle: 11, dessiner: regle,
      dire: "Protéger un circuit — La protection protège le câble : IB ≤ In ≤ IZ. Un calibre au-dessus du courant admissible du câble le laisse chauffer sans rien couper." },
    { station: "elec-regimes-de-neutre", titre: "TT, TN ou IT", bulle: ["Quel régime :", "qui coupe ?"], bras: -68, cycle: 11.5, dessiner: regimes,
      dire: "Régimes de neutre — En TT le différentiel coupe, en TN le disjoncteur ou le fusible, en IT le contrôleur d'isolement (CPI) signale. Dans tous les cas, relier la masse au conducteur de protection." },
    { station: "elec-habilitation", titre: "Ouvrir l'armoire", bulle: ["Qui peut ouvrir", "l'armoire ?"], bras: -84, cycle: 11.5, dessiner: habilitation,
      dire: "L'habilitation — C'est l'employeur qui délivre le titre. Avant d'ouvrir l'armoire, trois questions : mon symbole couvre-t-il ce geste, mon titre est-il à jour, l'installation est-elle consignée ?" },
    { station: "elec-consigner", titre: "Consigner, 4 étapes", bulle: ["Machine arrêtée :", "j'y touche ?"], bras: -70, cycle: 12, dessiner: consigner,
      dire: "Consigner — Arrêté n'est pas consigné : on sépare, on condamne, on identifie, puis on vérifie l'absence de tension. La mise à la terre et en court-circuit suit seulement si elle est prescrite." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires suit une installation électrique en six étapes : " +
    "isoler un défaut dans le tableau (NF C 15-100), protéger les personnes par la terre et le différentiel, protéger le câble par un calibre adapté, " +
    "savoir qui coupe selon le régime de neutre, n'ouvrir l'armoire qu'habilité, puis consigner avant d'intervenir.");
  D.el("rect", { x: 0, y: 0, width: 1000, height: 440, fill: C.papier }, dessin);
  /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
     cartouche « .fr » (celui de l'en-tête des stations) à la place de « Studio » (vidéos) */
  D.filigrane(dessin, [[205, 120], [500, 236], [800, 352]], 300).querySelectorAll("text")
    .forEach(t => { if (t.textContent === "Studio") t.textContent = ".fr"; });
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
