/* =====================================================================
   scenes/travail.js — la scène de la branche « Droit du travail »
   ---------------------------------------------------------------------
   Remplace l'image scene-travail.webp en tête de l'accueil des cinq
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="travail" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Le pas à pas : SceneKit (cartoclim/stations/_commun/scene-kit.js), une
   étape par station de la branche, dans l'ordre du plan. L'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche depuis l'étape 1, chaque étape le temps de son cycle (le film du
   kit avance toutes les 2,6 s, trop vite pour lire la phrase).
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — le
   filigrane R9 et les briques SVG.
   Le chargé d'affaires : le bonhomme « plein » de HoCourant (option B,
   décision de F. Henninot du 30/09/2026 pour l'animé), recopié tel quel ;
   les autres personnages (l'employeur et le salarié sur les plateaux de la
   balance, le second retourné ; le salarié qui monte l'escalier ;
   l'entrepreneur devant sa boutique) sont le même bonhomme, avec casquette
   ou carte, jamais un bâton. Formes simples pour le reste : la feuille de
   contrat, le chronomètre, la balance, les marches, la liste à cocher et
   l'enseigne. Aucune image nouvelle. Les deux moteurs sont LUS, jamais
   modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités (≥ 21 px quand le dessin fait
   960 px) ; un seul accent orange par étape ; tout bouge par le temps t
   (requestAnimationFrame), sans jamais interroger la préférence système de
   réduction des animations ; seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape. Faits : ceux des cinq stations,
   aucun montant ni taux qui ne soit écrit dans la station.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="travail"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#9d174d";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const ORANGE_TXT = "#9a3412";   // le texte qui accompagne un aplat orange de la branche (contraste)
  const FOND_ROSE = "#fbe7ef", FOND_BLEU = "#eef3fb", FOND_ORANGE = "#fff4ec";
  const ap = (f, debut, duree) => D.lisse((f - debut) / duree);   // 0 → 1 à partir de « debut », sur « duree » secondes
  const somme = (liste, fn) => { let s = 0; liste.forEach(x => { s += fn(x); }); return s; };

  /* ---------- étape 1 · Le contrat : le CDI est la règle, les autres contrats sont des exceptions encadrées ---------- */
  function contrat(g) {
    const SX = 340, SW = 280, CX = SX + SW / 2;
    // la feuille : un titre, du texte grisé, une ligne de signature
    const feuille = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: SX, y: 74, width: SW, height: 336, rx: 14, fill: "#fff7fa", stroke: ACCENT, "stroke-width": 5 }, feuille);
    ecrire(feuille, CX, 118, "Contrat de travail", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    [[292, 214], [312, 188], [332, 150]].forEach(([y, l]) => D.el("rect", { x: 370, y: y, width: l, height: 8, rx: 4, fill: "#c9d3de" }, feuille));
    D.el("path", { d: "M370 392 H590", stroke: C.gris, "stroke-width": 2.5 }, feuille);
    const cdi = ecrire(g, CX, 206, "CDI", 64, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    const regle = ecrire(g, CX, 262, "la règle", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    // la signature : une courbe à boucles, tracée point après point par le stylo
    const N = 160, pts = [];
    for (let k = 0; k <= N; k++) {   // cinq boucles de cursive, la première plus haute, puis une queue qui file à droite
      const u = k / N, a = u * 10 * Math.PI, env = 0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, u * 1.15));
      pts.push([392 + 186 * u - 15 * Math.sin(a) * env, 372 - 15 * Math.cos(a) * env * (1.15 - 0.5 * u)]);
    }
    const trace = D.el("path", { d: "M0 0", fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, g);
    const stylo = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M0 0 L-4 -13 L4 -13 Z", fill: C.papier, stroke: C.navy, "stroke-width": 2 }, stylo);
    D.el("rect", { x: -4, y: -62, width: 8, height: 49, rx: 2, fill: ACCENT, stroke: C.navy, "stroke-width": 2 }, stylo);
    const signe = coche(g, 598, 366);
    // les exceptions : des cadres en tirets, encadrés par la loi
    const titre = ecrire(g, 680, 98, "Les exceptions", 24, { "font-weight": 700, fill: C.navy, opacity: 0 });
    const cartes = ["CDD", "Intérim", "Apprentissage", "Professionnalisation"].map((nom, i) => {
      const gc = D.el("g", { opacity: 0 }, g), y = 124 + i * 68;
      D.el("rect", { x: 680, y: y, width: 296, height: 56, rx: 12, fill: FOND_ORANGE, stroke: C.orange, "stroke-width": 3, "stroke-dasharray": "10 7" }, gc);
      ecrire(gc, 828, y + 37, nom, 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      return { g: gc, t: 2.4 + i * 0.5 };
    });
    const legende = ecrire(g, 828, 418, "encadrées par la loi", 22, { "text-anchor": "middle", fill: C.gris, opacity: 0 });
    return t => {
      const f = FIGE ? 9 : t % 10, sortie = 1 - D.lisse((f - 9.4) / 0.5);
      voir(feuille, ap(f, 0.2, 0.5) * sortie);
      voir(cdi, ap(f, 0.9, 0.5) * sortie); voir(regle, ap(f, 1.5, 0.4) * sortie);
      voir(titre, ap(f, 2.0, 0.4) * sortie);
      cartes.forEach(c => {
        const a = ap(f, c.t, 0.45);
        voir(c.g, a * sortie); c.g.setAttribute("transform", `translate(${(26 * (1 - a)).toFixed(1)} 0)`);
      });
      voir(legende, ap(f, 4.6, 0.4) * sortie);
      const p = ap(f, 5.4, 2.0), k = Math.round(p * N);
      trace.setAttribute("d", "M" + pts.slice(0, k + 1).map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L"));
      voir(trace, (k > 0 ? 1 : 0) * sortie);
      stylo.setAttribute("transform", `translate(${pts[k][0].toFixed(1)} ${pts[k][1].toFixed(1)}) rotate(28)`);
      voir(stylo, D.fenetre(f, 5.3, 7.6, 0.25) * sortie);
      voir(signe, ap(f, 7.6, 0.3) * sortie);
    };
  }

  /* ---------- étape 2 · Temps & paie : au-delà de 35 h, l'heure est supplémentaire, puis majorée ---------- */
  function heures(g) {
    const X = h => 340 + 13 * h, YB = 150, HB = 50;   // 13 unités par heure : la piste va de 0 à 48 h
    const racine = D.el("g", { opacity: 0 }, g);
    ecrire(racine, 340, 90, "5 jours de 9 heures", 24, { "font-weight": 700, fill: C.navy });
    // la piste, ses remplissages (bleu : heure normale ; orange : heure supplémentaire), puis son contour
    D.el("rect", { x: 340, y: YB, width: 624, height: HB, rx: 10, fill: FOND_BLEU }, racine);
    const bleu = D.el("rect", { x: 343, y: YB + 4, width: 0, height: HB - 8, fill: C.bleu }, racine);
    const orange = D.el("rect", { x: X(35), y: YB + 4, width: 0, height: HB - 8, fill: C.orange }, racine);
    const brun = D.el("rect", { x: X(43), y: YB + 4, width: X(45) - X(43), height: HB - 8, fill: ORANGE_TXT, opacity: 0 }, racine);
    [9, 18, 27, 36].forEach(h => D.el("path", { d: `M${X(h)} ${YB + 4} V${YB + HB - 4}`, stroke: C.papier, "stroke-width": 3 }, racine));
    D.el("rect", { x: 340, y: YB, width: 624, height: HB, rx: 10, fill: "none", stroke: C.navy, "stroke-width": 3 }, racine);
    ["Lun", "Mar", "Mer", "Jeu", "Ven"].forEach((j, i) => ecrire(racine, X(4.5 + 9 * i), 240, j, 22, { "text-anchor": "middle", fill: C.gris }));
    // le seuil (35 h) et le plafond (48 h)
    const seuil = D.el("path", { d: `M${X(35)} 134 V216`, stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "7 5" }, racine);
    ecrire(racine, X(35), 90, "35 h", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(racine, X(35), 120, "durée légale", 22, { "text-anchor": "middle", fill: C.gris });
    D.el("path", { d: `M${X(48)} 134 V216`, stroke: C.rouge, "stroke-width": 3, "stroke-dasharray": "7 5" }, racine);
    ecrire(racine, 988, 90, "48 h", 24, { "text-anchor": "end", "font-weight": 700, fill: C.rouge });
    ecrire(racine, 988, 120, "plafond", 22, { "text-anchor": "end", fill: C.gris });
    // le chronomètre : il compte les heures de travail effectif
    D.el("rect", { x: 400, y: 284, width: 20, height: 10, rx: 3, fill: C.navy }, racine);
    const anneau = D.el("circle", { cx: 410, cy: 340, r: 46, fill: C.papier, stroke: C.navy, "stroke-width": 5 }, racine);
    const compteur = ecrire(racine, 410, 351, "0 h", 30, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(racine, 484, 347, "travail effectif", 22, { fill: C.gris });
    // la carte des heures supplémentaires : deux taux, à défaut d'accord
    const carte = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 690, y: 266, width: 290, height: 154, rx: 14, fill: FOND_ORANGE, stroke: C.orange, "stroke-width": 3.5 }, carte);
    ecrire(carte, 835, 302, "Heures supplémentaires", 22, { "text-anchor": "middle", "font-weight": 700, fill: ORANGE_TXT });
    const ligne = (y, coul, texte) => {
      const gl = D.el("g", { opacity: 0 }, carte);
      D.el("circle", { cx: 716, cy: y - 7, r: 7, fill: coul }, gl);
      ecrire(gl, 732, y, texte, 22, {});
      return gl;
    };
    const l25 = ligne(334, C.orange, "8 premières : +25 %"), l50 = ligne(366, ORANGE_TXT, "les suivantes : +50 %");
    const note = ecrire(carte, 732, 398, "à défaut d'accord", 22, { fill: C.gris, opacity: 0 });
    const HEURES = [[0.9, 0], [1.8, 9], [2.0, 9], [2.9, 18], [3.1, 18], [4.0, 27], [4.2, 27], [5.1, 36], [5.3, 36], [6.2, 45]];
    const heure = f => D.courbe(HEURES, f);
    let tc = 5; for (let s = 4.2; s <= 5.1; s += 0.01) if (heure(s) >= 35) { tc = s; break; }   // l'instant où la 35e heure passe
    return t => {
      const f = FIGE ? 10 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      voir(racine, ap(f, 0.2, 0.5) * sortie);
      const h = heure(f), sup = h > 35;
      bleu.setAttribute("width", Math.max(0, X(Math.min(h, 35)) - 343).toFixed(1));
      orange.setAttribute("width", Math.max(0, X(h) - X(35)).toFixed(1));
      compteur.textContent = Math.round(h) + " h";
      compteur.setAttribute("fill", sup ? ORANGE_TXT : C.navy); anneau.setAttribute("stroke", sup ? C.orange : C.navy);
      seuil.setAttribute("stroke-width", (3 + 3 * D.fenetre(f, tc - 0.1, tc + 0.6, 0.2)).toFixed(1));
      const a = ap(f, 6.6, 0.5);
      voir(carte, a * sortie); carte.setAttribute("transform", `translate(0 ${(14 * (1 - a)).toFixed(1)})`);
      voir(l25, ap(f, 7.2, 0.4) * sortie); voir(l50, ap(f, 7.8, 0.4) * sortie); voir(note, ap(f, 8.4, 0.4) * sortie);
      voir(brun, ap(f, 7.8, 0.4) * sortie);
    };
  }

  /* ---------- étape 3 · Droits & devoirs : chaque pouvoir a sa contrepartie, la balance revient à l'équilibre ---------- */
  function balance(g) {
    const PX = 650, PY = 296, LB = 230, POST = 62, PW = 210, TW = 124, TH = 44, PAS = 48, DX = 22, KP = 1.2;
    const racine = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 641, y: PY, width: 18, height: 76, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3 }, racine);
    D.el("rect", { x: 586, y: 372, width: 128, height: 16, rx: 5, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3 }, racine);
    const fleau = D.el("rect", { x: PX - LB - 12, y: PY - 7, width: 2 * LB + 24, height: 14, rx: 7, fill: C.navy }, racine);
    D.el("circle", { cx: PX, cy: PY, r: 11, fill: ACCENT, stroke: C.navy, "stroke-width": 3 }, racine);
    ecrire(racine, PX, 160, "Le droit du travail", 24, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    D.el("path", { d: `M${PX} 188 V${PY - 18}`, stroke: ACCENT, "stroke-width": 3 }, racine);
    ecrire(racine, PX - LB, 368, "Employeur", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(racine, PX + LB, 368, "Salarié", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    // les deux plateaux, posés au bout de tiges verticales : ils montent et descendent sans pencher
    const plateaux = [-1, 1].map(() => {
      const gp = D.el("g", {}, racine);
      D.el("path", { d: `M0 0 V${-POST}`, stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, gp);
      D.el("rect", { x: -PW / 2, y: -POST - 12, width: PW, height: 12, rx: 4, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3 }, gp);
      return gp;
    });
    // l'employeur et le salarié se tiennent chacun sur leur plateau, face à face (le second est retourné)
    const emp = bonhomme(plateaux[0], { dephasage: 0.2 });
    const sal = bonhomme(D.el("g", { transform: "scale(-1 1)" }, plateaux[1]), { casquette: true, dephasage: 0.6 });
    // les poids : un pouvoir ou un devoir (bleu), puis sa contrepartie (rose)
    const POIDS = [
      { cote: 0, k: 0, txt: "Ordonner", t: 1.6, fond: FOND_BLEU, trait: C.navy },
      { cote: 1, k: 0, txt: "Exécuter", t: 3.4, fond: FOND_BLEU, trait: C.navy },
      { cote: 0, k: 1, txt: "Protéger", t: 5.2, fond: FOND_ROSE, trait: ACCENT },
      { cote: 1, k: 1, txt: "Se retirer", t: 7.0, fond: FOND_ROSE, trait: ACCENT }
    ].map(p => {
      const gt = D.el("g", { opacity: 0 }, plateaux[p.cote]), y = -POST - 12 - TH - p.k * PAS, cx = p.cote ? -DX : DX;
      p.cadre = D.el("rect", { x: cx - TW / 2, y: y, width: TW, height: TH, rx: 8, fill: p.fond, stroke: p.trait, "stroke-width": 3.5 }, gt);
      p.etiq = ecrire(gt, cx, y + 30, p.txt, 22, { "text-anchor": "middle", "font-weight": 700, fill: p.trait });
      p.g = gt;
      return p;
    });
    const morale = ecrire(g, PX, 420, "À chaque pouvoir, sa contrepartie", 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    // chaque poids posé fait osciller le fléau (réponse amortie), l'employeur à gauche (−) ou le salarié à droite (+)
    const EVT = POIDS.map(p => [p.t, p.cote ? 4.5 : -4.5]);
    const reponse = tau => tau <= 0 ? 0 : 1 - Math.exp(-3 * tau) * (Math.cos(7 * tau) + (3 / 7) * Math.sin(7 * tau));
    return t => {
      const f = FIGE ? 10 : t % 11.4, sortie = 1 - D.lisse((f - 10.9) / 0.5);
      voir(racine, ap(f, 0, 0.4) * sortie);
      const th = somme(EVT, e => e[1] * reponse(f - e[0])), r = th * Math.PI / 180;
      fleau.setAttribute("transform", `rotate(${th.toFixed(2)} ${PX} ${PY})`);
      plateaux[0].setAttribute("transform", `translate(${(PX - LB * Math.cos(r)).toFixed(1)} ${(PY - LB * Math.sin(r)).toFixed(1)})`);
      plateaux[1].setAttribute("transform", `translate(${(PX + LB * Math.cos(r)).toFixed(1)} ${(PY + LB * Math.sin(r)).toFixed(1)})`);
      // l'employeur montre du doigt quand il ordonne ; le salarié lève la main quand il se retire
      emp({ x: -80, y: -POST - 12 - 72 * KP, k: KP, t: t, bras: D.courbe([[1.1, -15], [1.6, -78], [3.0, -78], [3.5, -15]], f) });
      sal({ x: -80, y: -POST - 12 - 72 * KP, k: KP, t: t, bras: D.courbe([[6.6, -15], [7.1, -100], [8.6, -100], [9.1, -15]], f) });
      POIDS.forEach(p => {
        const u = D.borne((f - (p.t - 0.45)) / 0.45, 0, 1), neuf = f < p.t + 0.7;   // le poids qui vient d'arriver est orange
        p.g.setAttribute("transform", `translate(0 ${(-46 * (1 - u * u)).toFixed(1)})`);
        voir(p.g, ap(f, p.t - 0.45, 0.15));
        p.cadre.setAttribute("stroke", neuf ? C.orange : p.trait); p.cadre.setAttribute("fill", neuf ? FOND_ORANGE : p.fond);
        p.etiq.setAttribute("fill", neuf ? ORANGE_TXT : p.trait);
      });
      voir(morale, ap(f, 8.0, 0.4) * sortie);
    };
  }

  /* ---------- étape 4 · Se former : cinq marches, le salarié les monte l'une après l'autre ---------- */
  function marches(g) {
    const SX = 336, SW = 130, SOL = 426, K = 1.15;
    const TOP = i => 350 - 50 * i, CXI = i => SX + SW * i + SW / 2;
    const TIT = ["Se former", "Maintenir", "Financer", "Reconnaître", "Piloter"], SOUS = ["diplôme", "habilitation", "CPF", "VAE", "entretien"];
    const HOPS = [2.4, 4.3, 6.2, 8.1], DUR = 0.6, ARRIVEES = [0.9, 3.0, 4.9, 6.8, 8.7];
    const racine = D.el("g", { opacity: 0 }, g);
    const blocs = TIT.map((nom, i) => {
      const r = D.el("rect", { x: SX + SW * i, y: TOP(i), width: SW, height: SOL - TOP(i), fill: "#f4f7fb", stroke: C.navy, "stroke-width": 3 }, racine);
      const lib = D.el("g", { opacity: 0 }, g);
      ecrire(lib, CXI(i), TOP(i) + 33, nom, 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      ecrire(lib, CXI(i), TOP(i) + 62, SOUS[i], 22, { "text-anchor": "middle", fill: C.gris });
      return { r: r, lib: lib };
    });
    const morale = D.el("g", { opacity: 0 }, g);
    ecrire(morale, 340, 132, "On se forme", 24, { "font-weight": 700, fill: ORANGE_TXT });
    ecrire(morale, 340, 164, "toute sa vie", 24, { "font-weight": 700, fill: ORANGE_TXT });
    const gens = D.el("g", { opacity: 0 }, g);
    const sal = bonhomme(gens, { casquette: true, carte: true, dephasage: 0.4 });
    return t => {
      const f = FIGE ? 10 : t % 11.4, sortie = 1 - D.lisse((f - 10.9) / 0.5);
      voir(racine, ap(f, 0.2, 0.5) * sortie);
      blocs.forEach((b, i) => {
        const atteint = f >= ARRIVEES[i];
        b.r.setAttribute("fill", atteint ? FOND_ROSE : "#f4f7fb"); b.r.setAttribute("stroke", atteint ? ACCENT : C.navy); b.r.setAttribute("stroke-width", atteint ? 4 : 3);
        voir(b.lib, ap(f, ARRIVEES[i], 0.35) * sortie);
      });
      // la marche où se trouve le salarié, en nombre décimal pendant le saut (0 à 4)
      const idx = somme(HOPS, t0 => ap(f, t0, DUR)), i0 = Math.min(3, Math.floor(idx + 1e-9)), s = idx - i0;
      const yp = D.lerp(TOP(i0), TOP(i0 + 1), s) - 30 * Math.sin(Math.PI * s);
      const saut = Math.max(...HOPS.map(t0 => D.fenetre(f, t0, t0 + DUR, 0.15)));
      sal({ x: CXI(0) + SW * idx, y: yp - 72 * K, k: K, t: t, bras: D.courbe([[8.7, -15 - 35 * saut], [9.1, -100]], f) });
      voir(gens, ap(f, 0.7, 0.4) * sortie);
      voir(morale, ap(f, 9.0, 0.4) * sortie);
    };
  }

  /* ---------- étape 5 · S'installer : sept cases à cocher, puis l'enseigne s'allume ---------- */
  function installer(g) {
    const racine = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 330, y: 76, width: 320, height: 292, rx: 14, fill: "#f4f7fb", stroke: C.navy, "stroke-width": 3 }, racine);
    const LIGNES = ["Qualification", "Immatriculation", "Attestation de capacité", "Attestation d'aptitude", "Assurances", "Mention RGE", "Cotisations"];
    const YC = i => 110 + 38 * i;
    const lignes = LIGNES.map((nom, i) => {
      D.el("circle", { cx: 358, cy: YC(i), r: 13, fill: C.papier, stroke: C.gris, "stroke-width": 3 }, racine);
      return { txt: ecrire(racine, 384, YC(i) + 8, nom, 22, { fill: C.gris }), ok: coche(g, 358, YC(i)) };
    });
    // la boutique : d'abord au plan (tirets gris), puis construite (traits pleins) quand tout est coché
    D.el("path", { d: "M664 360 H965", stroke: C.navy, "stroke-width": 3 }, racine);
    const boutique = (parent, plein) => {
      const forme = (at, remplissage) => D.el("rect", Object.assign(plein
        ? { fill: remplissage || FOND_BLEU, stroke: C.navy, "stroke-width": 3 }
        : { fill: "none", stroke: C.gris, "stroke-width": 3, "stroke-dasharray": "9 6" }, at), parent);
      forme({ x: 735, y: 212, width: 200, height: 148 });
      forme({ x: 751, y: 244, width: 48, height: 44 }, "#e8f1fb");
      forme({ x: 871, y: 244, width: 48, height: 44 }, "#e8f1fb");
      forme({ x: 815, y: 300, width: 40, height: 60 }, "#e8f1fb");
      forme({ x: 750, y: 142, width: 170, height: 52, rx: 8 });
      D.el("path", { d: "M780 194 V212 M890 194 V212", fill: "none", stroke: plein ? C.navy : C.gris, "stroke-width": 3 }, parent);
    };
    const plan = D.el("g", {}, racine), plein = D.el("g", { opacity: 0 }, racine), lumiere = D.el("g", { opacity: 0 }, racine);
    boutique(plan, false); boutique(plein, true);
    D.el("rect", { x: 750, y: 142, width: 170, height: 52, rx: 8, fill: C.orange, stroke: C.navy, "stroke-width": 3 }, lumiere);
    ecrire(lumiere, 835, 174, "Prêt à ouvrir", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.papier });
    const bande = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 330, y: 378, width: 640, height: 52, rx: 14, fill: FOND_ROSE, stroke: ACCENT, "stroke-width": 3.5 }, bande);
    ecrire(bande, 650, 410, "On s'installe avant de toucher un fluide", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    // l'entrepreneur seul, devant sa future boutique : il montre l'enseigne quand les sept cases sont cochées
    const gens = D.el("g", { opacity: 0 }, g);
    const ent = bonhomme(gens, { casquette: true, carte: true, dephasage: 0.8 });
    return t => {
      const f = FIGE ? 9 : t % 11.6, sortie = 1 - D.lisse((f - 11) / 0.5);
      voir(racine, ap(f, 0.2, 0.5) * sortie);
      voir(gens, ap(f, 0.4, 0.4) * sortie);
      ent({ x: 694, y: 360 - 72 * 1.2, k: 1.2, t: t, bras: D.courbe([[6.9, -15], [7.4, -75]], f) });
      lignes.forEach((l, i) => {
        const a = ap(f, 1.0 + 0.85 * i, 0.25);
        voir(l.ok, a * sortie); l.txt.setAttribute("fill", a > 0.5 ? C.navy : C.gris);
      });
      const fini = ap(f, 6.7, 0.5);
      voir(plan, 1 - fini); voir(plein, fini); voir(lumiere, ap(f, 7.1, 0.4));
      voir(bande, ap(f, 7.7, 0.4) * sortie);
    };
  }

  /* ---------- les cinq étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "travail-le-contrat", titre: "Le CDI, la règle", bulle: ["Quel contrat", "vais-je signer ?"], bras: -72, cycle: 10, dessiner: contrat,
      dire: "Le contrat — Le CDI est la règle ; CDD, intérim, apprentissage et professionnalisation sont des exceptions encadrées par la loi. Avant de signer, relisez votre contrat : durée, essai, convention collective, sortie." },
    { station: "travail-temps-et-paie", titre: "Compter les heures", bulle: ["C'est quand,", "une heure sup ?"], bras: -70, cycle: 12, dessiner: heures,
      dire: "Temps & paie — La durée légale, 35 heures par semaine, est un seuil, non un plafond : au-delà, chaque heure est supplémentaire. Sauf accord, 25 % pour les huit premières, puis 50 %." },
    { station: "travail-droits-devoirs", titre: "La balance", bulle: ["Qui commande,", "qui protège ?"], bras: -84, cycle: 11.4, dessiner: balance,
      dire: "Droits & devoirs — Parce que l'employeur commande, il doit protéger ; le salarié exécute, mais peut alerter et se retirer d'un danger grave et imminent. À chaque pouvoir, sa contrepartie." },
    { station: "travail-se-former", titre: "Marche après marche", bulle: ["Qui décide de", "ma formation ?"], bras: -100, cycle: 11.4, dessiner: marches,
      dire: "Se former — L'employeur adapte chacun à son poste ; vous construisez votre parcours : compte personnel de formation, VAE. Certaines formations s'imposent pour exercer, comme l'habilitation. On se forme toute sa vie." },
    { station: "travail-s-installer", titre: "Sept cases à cocher", bulle: ["Puis-je ouvrir", "mon chantier ?"], bras: -72, cycle: 11.6, dessiner: installer,
      dire: "S'installer — À son compte, le statut simplifie les cotisations, jamais les obligations du métier. Qualification, immatriculation, capacité, aptitude, assurances, RGE, cotisations : sept cases à cocher avant de toucher un fluide." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires parcourt le droit du travail en cinq étapes : le CDI est la règle et les autres contrats des exceptions encadrées (le contrat), " +
    "au-delà de 35 heures par semaine chaque heure est supplémentaire et majorée (temps et paie), l'employeur qui commande doit protéger et le salarié peut alerter et se retirer (droits et devoirs), " +
    "on se forme marche après marche toute sa vie (se former), et sept cases se cochent avant de s'installer à son compte (s'installer).");
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
