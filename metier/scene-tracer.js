/* =====================================================================
   metier/scene-tracer.js — « Une journée type » : la quatrième scène,
   TRACER, dessinée et animée pas à pas
   ---------------------------------------------------------------------
   Page : metier.html, sous la puce « Tracer » de la section « Une journée
   type » (#journee). Hôte : <figure class="scene-journee scene-suite"
   data-scene-journee="tracer">. Cadre, technicien et « ▶ Dérouler » :
   metier/scene-commun.js (même vitrine que le pilote « diagnostiquer une panne »).
   La scène suit la phrase de la page : « Tracer : registre d'équipement, fiche
   d'intervention, pesée des fluides. Ce qui n'est pas écrit n'a pas été fait. »
   Trois étapes : la fiche d'intervention · le registre de l'équipement · ce qui
   n'est pas écrit n'a pas été fait. Le technicien (à gauche, la fiche à la main)
   pose la question de l'étape ; à droite, le papier y répond, la plume écrit.

   CONTENU, tiré du cours :
   · les quatre rubriques de la fiche (l'opérateur avec son n° d'attestation de
     capacité ; l'intervention, date et nature du travail ; le fluide récupéré,
     nature et quantité ; le fluide remis dans l'équipement) et la vie du registre
     (mise en service, contrôle d'étanchéité, réparation ou appoint, fin de vie ;
     chaque ligne porte la date, le fluide et la personne) : station Traçabilité
     (legislation/stations/tracabilite-fluides/, écrans 2 et 3, planches
     fiche-intervention.svg et registre-equipement.svg) ; chapitre G5, code 5.07 :
     « chaque intervention est tracée : date, opérateur, fluide, quantité,
     machine » ;
   · « les quantités se recoupent : la fiche, la bouteille et le registre racontent
     la même histoire » (planche bilan-tracabilite.svg) ;
   · valeurs : celles de la scène « Intervenir » (R-134a du pilote ; 12,0 kg →
     14,3 kg, soit 2,3 kg récupérés puis 2,3 kg remis dans la même machine : pas de
     bordereau de déchet, la fiche suffit, station Traçabilité, question 2).
   Aucun numéro, nom, date ni durée de conservation n'est écrit : le papier montre
   ses rubriques, la plume n'écrit que les quantités du cours.
   RÈGLES TENUES : aucun texte sur un tracé (contrôle navigateur, par les pixels) ;
   textes du dessin ≥ 21 unités ; filigrane R9.
   ===================================================================== */
(function () {
  "use strict";
  const M = window.METIER_SCENE;
  if (!M) return;
  const { D, C, ACCENT, FIGE, ecrire, voir, passe } = M;
  const lab = (g, x, y, s, at) => ecrire(g, x, y, s, 22, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const mot = (g, x, y, s, at) => ecrire(g, x, y, s, 24, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const GRIS = "#5a6b7d", FILET = "#c9d3de";
  let n = 0;

  /* une feuille : ombre, papier blanc, bord marine */
  function feuille(g, x, y, w, h) {
    D.el("rect", { x: x + 6, y: y + 8, width: w, height: h, rx: 14, fill: C.navy, opacity: 0.12 }, g);
    D.el("rect", { x: x, y: y, width: w, height: h, rx: 14, fill: "#ffffff", stroke: C.navy, "stroke-width": 3 }, g);
  }
  /* un texte qui s'écrit de gauche à droite (clip) ; renvoie son réglage v (0 → 1) et la position du bout de la ligne */
  function ecriture(g, x, y, s, at) {
    const id = "mt-" + (++n), cp = D.el("clipPath", { id: id }, g), r = D.el("rect", { x: x - 2, y: y - 26, width: 0, height: 36 }, cp);
    const t = ecrire(g, x, y, s, 22, Object.assign({ "clip-path": `url(#${id})` }, at || {}));
    const l = (t.getComputedTextLength && t.getComputedTextLength()) || s.length * 10.5;
    return { regler: (v, a) => { r.setAttribute("width", (l + 4) * v); t.setAttribute("opacity", v > 0 ? (a === undefined ? 1 : a.toFixed(2)) : 0); }, x: x, y: y, l: l };
  }
  /* la plume : un stylo marine à pointe dorée, dont la pointe est en (0 0) ; posée dans la marge de la feuille, à hauteur de la ligne qui s'écrit */
  function plume(g) {
    const p = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M0 0 L7 -13 L45 -50 L52 -43 L14 -6 Z", fill: C.navy, stroke: "#0f2440", "stroke-width": 1.5, "stroke-linejoin": "round" }, p);
    D.el("path", { d: "M0 0 L7 -13 L14 -6 Z", fill: "#e2a72b", stroke: "#0f2440", "stroke-width": 1.5, "stroke-linejoin": "round" }, p);
    D.el("path", { d: "M12 -17 L44 -47", stroke: "#84b7ec", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.7 }, p);
    return (x, y, v) => { p.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`); voir(p, v); };
  }
  const badge = (g, x, y, k) => { D.el("circle", { cx: x, cy: y, r: 18, fill: "#dce6f2", stroke: C.navy, "stroke-width": 2.5 }, g); lab(g, x, y + 7, String(k), { "text-anchor": "middle" }); };
  const coche = (g, x, y, r) => { D.el("circle", { cx: x, cy: y, r: r, fill: C.vert }, g); D.el("path", { d: `M${x - r * 0.45} ${y} l${r * 0.4} ${r * 0.5} l${r * 0.75} ${-r * 0.95}`, fill: "none", stroke: C.papier, "stroke-width": r * 0.28, "stroke-linecap": "round", "stroke-linejoin": "round" }, g); };

  /* ---------- étape 1 · La fiche d'intervention : une opération, une fiche ---------- */
  function fiche(g) {
    feuille(g, 390, 48, 480, 352);
    mot(g, 630, 92, "Fiche d’intervention", { "text-anchor": "middle" });
    D.el("path", { d: "M414 108 H846", stroke: FILET, "stroke-width": 2.5 }, g);
    const RUBRIQUES = [["L’opérateur", "nom · n° d’attestation de capacité", false], ["L’intervention", "filtre remplacé, vide, charge", true], ["Le fluide récupéré", "R-134a · 2,3 kg", true], ["Le fluide remis", "R-134a · 2,3 kg", true]];
    const lignes = [];
    RUBRIQUES.forEach(([titre, valeur, ecrite], i) => {
      const y = 130 + i * 66;
      badge(g, 424, y + 33, i + 1);
      lab(g, 460, y + 24, titre);
      if (i < 3) D.el("path", { d: `M414 ${y + 64} H846`, stroke: FILET, "stroke-width": 2 }, g);
      if (ecrite) lignes.push(ecriture(g, 460, y + 52, valeur, { "font-weight": 600, fill: C.navy }));
      else lab(g, 460, y + 52, valeur, { "font-weight": 400, fill: GRIS });
    });
    const stylo = plume(g);
    const DEBUTS = [1.4, 3.8, 6.2], DUREE = 2;
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      let py = 182, vis = 0;
      lignes.forEach((l, k) => {
        const v = FIGE ? 1 : passe(f, DEBUTS[k], DEBUTS[k] + DUREE);
        l.regler(v, sortie);
        if (!FIGE && f >= DEBUTS[k] - 0.4 && f < DEBUTS[k] + DUREE + 0.5) { py = l.y - 6; vis = 1; }
      });
      stylo(876, py, FIGE ? 0 : vis * sortie);
    };
  }

  /* ---------- étape 2 · Le registre de l'équipement : la mémoire de la machine ---------- */
  function registre(g) {
    feuille(g, 390, 48, 480, 352);
    mot(g, 630, 88, "Registre de l’équipement", { "text-anchor": "middle" });
    lab(g, 630, 118, "il suit la vie de la machine", { "text-anchor": "middle", "font-weight": 400, fill: GRIS });
    D.el("path", { d: "M414 132 H846", stroke: FILET, "stroke-width": 2.5 }, g);
    D.el("path", { d: "M426 170 V356", stroke: FILET, "stroke-width": 5, "stroke-linecap": "round" }, g);
    const VIE = [["Mise en service", "date · fluide chargé · qui"], ["Contrôle d’étanchéité", "date · résultat · qui"], ["Réparation, appoint", "date · fluide ajouté · qui"], ["Fin de vie", "date · fluide récupéré · qui"]];
    let ecrit = null, champ = null, point = null;
    VIE.forEach(([titre, champs], i) => {
      const y = 156 + i * 58, actuel = i === 2;
      D.el("circle", { cx: 426, cy: y + 16, r: actuel ? 12 : 9, fill: actuel ? ACCENT : i < 2 ? C.navy : FILET }, g);
      lab(g, 456, y + 22, titre, { fill: i === 3 ? GRIS : C.navy });
      const c = lab(g, 456, y + 48, champs, { "font-weight": 400, fill: GRIS });
      if (actuel) { champ = c; ecrit = ecriture(g, 456, y + 48, "R-134a · 2,3 kg récupérés, remis", { "font-weight": 600, fill: C.navy }); point = y + 16; }
    });
    const halo = D.el("rect", { x: 406, y: 156 + 2 * 58 - 4, width: 448, height: 60, rx: 12, fill: "none", stroke: ACCENT, "stroke-width": 4, opacity: 0 }, g);
    const stylo = plume(g);
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      const v = FIGE ? 1 : passe(f, 2.2, 5);
      ecrit.regler(v, sortie); voir(champ, FIGE ? 0 : 1 - passe(f, 1.6, 2));   // le champ vide s'efface avant que la plume écrive
      voir(halo, FIGE ? 0 : D.fenetre(f, 0.6, 6, 0.4) * sortie);
      stylo(876, ecrit.y - 6, FIGE ? 0 : D.fenetre(f, 1.8, 5.6, 0.3) * sortie);
    };
  }

  /* ---------- étape 3 · Ce qui n'est pas écrit n'a pas été fait : les quantités se recoupent ---------- */
  function recoupe(g) {
    const CARTES = [["balance", "2,3 kg"], ["fiche", "2,3 kg"], ["registre", "2,3 kg"]];
    const titre = lab(g, 550, 94, "les quantités se recoupent", { "text-anchor": "middle", fill: C.vert, opacity: 0 });
    const trait = D.el("path", { d: "M334 108 H766", stroke: C.vert, "stroke-width": 4, "stroke-linecap": "round", fill: "none", opacity: 0 }, g);
    const cartes = CARTES.map(([nom, val], i) => {
      const x = 330 + i * 152, c = D.el("g", { opacity: 0 }, g);
      D.el("rect", { x: x + 5, y: 142, width: 140, height: 150, rx: 14, fill: C.navy, opacity: 0.12 }, c);
      D.el("rect", { x: x, y: 134, width: 140, height: 150, rx: 14, fill: "#ffffff", stroke: C.navy, "stroke-width": 3 }, c);
      lab(c, x + 70, 172, nom, { "text-anchor": "middle" });
      mot(c, x + 70, 226, val, { "text-anchor": "middle", fill: C.navy });
      const k = D.el("g", { opacity: 0 }, c); coche(k, x + 70, 258, 14);
      return { c: c, k: k };
    });
    const vide = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 786, y: 134, width: 140, height: 150, rx: 14, fill: "none", stroke: C.rouge, "stroke-width": 3.5, "stroke-dasharray": "9 8" }, vide);
    lab(vide, 856, 172, "rien", { "text-anchor": "middle", fill: C.rouge });
    D.el("path", { d: "M826 206 L886 262 M886 206 L826 262", stroke: C.rouge, "stroke-width": 8, "stroke-linecap": "round" }, vide);
    const verdict = mot(g, 626, 352, "Ce qui n’est pas écrit", { "text-anchor": "middle", fill: ACCENT, opacity: 0 });
    const verdict2 = mot(g, 626, 384, "n’a pas été fait.", { "text-anchor": "middle", fill: ACCENT, opacity: 0 });
    return t => {
      const f = FIGE ? 9.5 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      cartes.forEach((c, i) => { voir(c.c, passe(f, 0.6 + i * 1.5, 1.1 + i * 1.5) * sortie); voir(c.k, passe(f, 1.2 + i * 1.5, 1.6 + i * 1.5) * sortie); });
      voir(titre, passe(f, 5, 5.5) * sortie); voir(trait, passe(f, 5, 5.5) * sortie);
      voir(vide, passe(f, 6.4, 6.9) * sortie);
      voir(verdict, passe(f, 7.6, 8.2) * sortie); voir(verdict2, passe(f, 8, 8.6) * sortie);
    };
  }

  const ETAPES = [   // les phrases : espaces insécables avant « : ; » et entre un nombre et son unité
    { titre: "La fiche d’intervention", bulle: ["Qu’est-ce que", "j’écris ?"], bras: -50, cycle: 11, dessiner: fiche,
      dire: "Une opération, une fiche. Le technicien y note qui intervient, ce qui a été fait, le fluide récupéré et le fluide remis, avec les quantités lues sur la balance : ici 2,3 kg dans les deux cas." },
    { titre: "Le registre", bulle: ["Où je le note", "pour la suite ?"], bras: -60, cycle: 11, dessiner: registre,
      dire: "Le registre de l’équipement garde la mémoire de la machine, de sa mise en service à sa fin de vie. Chaque fluide récupéré ou ajouté s’y inscrit : la date, le fluide, la quantité, et qui est intervenu." },
    { titre: "Pas écrit, pas fait", bulle: ["Et si on", "me contrôle ?"], bras: -55, cycle: 11, dessiner: recoupe,
      dire: "Un contrôle remonte le fil : la balance, la fiche et le registre doivent raconter la même histoire, 2,3 kg récupérés et 2,3 kg remis. Ce qui n’est pas écrit n’a pas été fait." }
  ];

  M.monter({ nom: "tracer", etapes: ETAPES, tech: { casquette: true, dossier: true, carte: true },
    aria: "Un technicien frigoriste trace son intervention en trois étapes : il remplit la fiche d’intervention, avec le fluide récupéré et le fluide remis, 2,3 kg dans les deux cas ; il inscrit la quantité au registre de l’équipement, qui garde la mémoire de la machine ; un contrôle vérifie que la balance, la fiche et le registre donnent la même quantité. Ce qui n’est pas écrit n’a pas été fait.",
    legende: "Quatrième scène de la journée : tracer, en trois étapes. « ▶ Dérouler » joue toute la scène." });
})();
