/* =====================================================================
   metier/scene-expliquer.js — « Une journée type » : la cinquième scène,
   EXPLIQUER AU CLIENT, dessinée et animée pas à pas
   ---------------------------------------------------------------------
   Page : metier.html, sous la puce « Expliquer » de la section « Une journée
   type » (#journee). Hôte : <figure class="scene-journee scene-suite"
   data-scene-journee="expliquer">. Cadre, technicien et « ▶ Dérouler » :
   metier/scene-commun.js (même vitrine que le pilote « diagnostiquer une panne »).
   La scène suit la phrase de la page : « Expliquer au client ce qui a été fait,
   et pourquoi. C'est la partie que les jeunes techniciens sous-estiment le
   plus. » Trois étapes : le froid est revenu · ce qui a été fait, et pourquoi · la
   fiche signée. On retrouve la vitrine et le client du pilote, et l'afficheur qui
   était monté à +9 °C : il redescend à +3 °C, sa valeur du matin.

   REPRISE, en lecture : la vitrine, son afficheur et le client (le bonhomme de
   HoCourant retourné, blouse claire) viennent de metier/scene-journee.js (le
   pilote, étape 1), recopiés. La fiche reprend les rubriques de la station
   Traçabilité (legislation/stations/tracabilite-fluides/, écran 2) : le fluide
   récupéré et le fluide remis, 2,3 kg (scène « Intervenir »).
   VOCABULAIRE : des mots simples pour le client, pas de terme savant (« un filtre
   bouché freinait le froid », « je l'ai changé », « vérifié avec mes instruments »).
   La cause est celle de la scène « Intervenir » : un filtre déshydrateur colmaté,
   changé ; le détendeur n'a pas été réglé (scène « Régler »), on ne le dit donc pas.
   SIGNATURES : la fiche porte celle du technicien ; le client en garde un
   exemplaire. Au-delà d'un seuil de charge (3 kg de HCFC ou 5 t éq. CO₂ de HFC),
   le détenteur signe aussi (Code de l'environnement R. 543-82, lu dans la
   station Traçabilité) : la phrase de l'étape le dit, le dessin ne montre pas de
   seconde signature, puisque 2,3 kg de R-134a restent sous ce seuil.
   RÈGLES TENUES : aucun texte sur un tracé (contrôle navigateur, par les pixels) ;
   textes du dessin ≥ 21 unités ; filigrane R9.
   ===================================================================== */
(function () {
  "use strict";
  const M = window.METIER_SCENE;
  if (!M) return;
  const { D, C, FIGE, INSTRUMENTS, bonhomme, ecrire, voir, nb, passe } = M;
  const lab = (g, x, y, s, at) => ecrire(g, x, y, s, 22, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const mot = (g, x, y, s, at) => ecrire(g, x, y, s, 24, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const GRIS = "#5a6b7d", FILET = "#c9d3de";

  /* la vitrine réfrigérée du pilote : le meuble, la vitre bombée, les produits, l'afficheur (renvoie le texte de l'afficheur) */
  function vitrine(g) {
    D.el("path", { d: "M318 410 H930", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, g);
    D.el("rect", { x: 336, y: 300, width: 282, height: 106, rx: 6, fill: "#dfe7ef", stroke: C.navy, "stroke-width": 3 }, g);
    D.el("path", { d: "M352 300 Q346 240 380 214 H606 V300 Z", fill: "#eef5fc", stroke: C.navy, "stroke-width": 2.5 }, g);
    D.el("rect", { x: 372, y: 270, width: 64, height: 30, rx: 9, fill: "#f2c94c", stroke: C.navy, "stroke-width": 2 }, g);
    D.el("ellipse", { cx: 404, cy: 272, rx: 29, ry: 6, fill: "#f7dc7f", stroke: C.navy, "stroke-width": 1.5 }, g);
    [452, 482, 512].forEach(x => {
      D.el("path", { d: `M${x} 274 H${x + 22} L${x + 19} 300 H${x + 3} Z`, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, g);
      D.el("rect", { x: x - 1, y: 270, width: 24, height: 5, rx: 2, fill: C.bleu }, g);
    });
    D.el("rect", { x: 548, y: 276, width: 48, height: 24, rx: 7, fill: "#e9a9a0", stroke: C.navy, "stroke-width": 2 }, g);
    D.el("path", { d: "M368 292 Q364 250 388 228", fill: "none", stroke: C.papier, "stroke-width": 4, "stroke-linecap": "round", opacity: 0.85 }, g);
    D.el("rect", { x: 374, y: 206, width: 236, height: 10, rx: 3, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2 }, g);
    D.el("rect", { x: 514, y: 310, width: 92, height: 86, rx: 8, fill: C.navy }, g);
    D.el("rect", { x: 521, y: 316, width: 78, height: 74, rx: 5, fill: INSTRUMENTS.lcd, stroke: "#0f2440", "stroke-width": 2 }, g);
    const valeur = ecrire(g, 591, 345, "3,0", 24, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    ecrire(g, 591, 377, "°C", 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    return valeur;
  }
  /* le client, face au technicien (le bonhomme retourné, blouse claire) ; renvoie son réglage (t, bras) */
  function client(g) {
    const miroir = D.el("g", { transform: "scale(-1 1)" }, g);
    const cli = bonhomme(miroir, { dephasage: 0.5 });
    miroir.querySelector('path[fill="#84b7ec"]').setAttribute("fill", "#f4ead8");
    miroir.querySelector('path[d="M-8 38 H8"]').setAttribute("stroke", "#f4ead8");
    return (t, bras) => cli({ x: -760, y: 205.6, k: 2.8, t: t, bras: bras });
  }
  /* la bulle du client (au-dessus de lui, queue vers lui) : renvoie le groupe, à régler en opacité */
  function bulleClient(g, lignes) {
    const b = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M654 38 H914 Q928 38 928 52 V144 Q928 158 914 158 H786 L760 194 L760 158 H654 Q640 158 640 144 V52 Q640 38 654 38 Z", fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, b);
    lignes.forEach((s, k) => mot(b, 784, 88 + k * 32, s, { "text-anchor": "middle" }));
    return b;
  }

  /* ---------- étape 1 · Le froid est revenu : l'afficheur de la vitrine redescend à +3 °C ---------- */
  function resultat(g) {
    const valeur = vitrine(g), cli = client(g), parole = bulleClient(g, ["Ça refroidit", "de nouveau !"]);
    return t => {
      const f = FIGE ? 8 : t % 10, sortie = 1 - passe(f, 9.4, 9.9);
      const v = FIGE ? 3 : 9 - 6 * passe(f, 0.8, 4);   // l'afficheur redescend de +9 à +3 °C
      valeur.textContent = nb(v, 1);
      valeur.setAttribute("fill", v > 6 ? C.rouge : C.navy);
      voir(parole, passe(f, 4.6, 5.2) * sortie);
      cli(t, FIGE ? -45 : D.courbe([[0, -8], [0.8, -8], [1.5, -45], [8.8, -45], [9.4, -8]], f));
    };
  }

  /* ---------- étape 2 · Ce qui a été fait, et pourquoi : le technicien explique, avec des mots simples ---------- */
  function explication(g) {
    const valeur = vitrine(g), cli = client(g);
    valeur.textContent = nb(3, 1);
    const b = D.el("g", {}, g);
    D.el("path", { d: "M344 36 H836 Q850 36 850 50 V176 Q850 190 836 190 H344 Q330 190 330 176 V152 L296 158 L330 128 V50 Q330 36 344 36 Z", fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, b);
    const lignes = ["Un filtre bouché freinait le froid.", "Je l’ai changé et j’ai remis le fluide.", "Et j’ai tout vérifié avec mes instruments."]
      .map((s, k) => mot(b, 362, 84 + k * 40, s, { opacity: 0 }));
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      lignes.forEach((l, k) => voir(l, passe(f, 0.8 + k * 2.6, 1.4 + k * 2.6) * sortie));
      cli(t, FIGE ? -8 : -8 + 6 * Math.sin(f * 1.4) * passe(f, 2, 3));   // il écoute, il hoche la tête
    };
  }

  /* ---------- étape 3 · La fiche signée : le technicien signe, le client garde un exemplaire ---------- */
  function signature(g) {
    D.el("path", { d: "M318 410 H930", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, g);
    D.el("rect", { x: 342, y: 68, width: 282, height: 340, rx: 14, fill: C.navy, opacity: 0.12 }, g);
    D.el("rect", { x: 336, y: 60, width: 282, height: 340, rx: 14, fill: "#ffffff", stroke: C.navy, "stroke-width": 3 }, g);
    mot(g, 477, 102, "Fiche d’intervention", { "text-anchor": "middle" });
    D.el("path", { d: "M356 118 H598", stroke: FILET, "stroke-width": 2.5 }, g);
    [["Le fluide récupéré", 148], ["Le fluide remis", 222]].forEach(([titre, y], i) => {
      lab(g, 358, y, titre);
      lab(g, 358, y + 28, "R-134a · 2,3 kg", { "font-weight": 600 });
      D.el("path", { d: `M356 ${y + 44} H598`, stroke: FILET, "stroke-width": 2 }, g);
    });
    D.el("path", { d: "M358 338 H596", stroke: C.navy, "stroke-width": 2.5 }, g);
    lab(g, 477, 372, "signature du technicien", { "text-anchor": "middle", "font-weight": 400, fill: GRIS });
    const trace = D.el("path", { d: "M372 326 C384 292 392 340 404 318 C414 300 420 332 432 322 C446 308 450 330 466 318 L476 304 C490 322 500 330 520 312", fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 100, "stroke-dasharray": "100 100", "stroke-dashoffset": 100 }, g);
    const stylo = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M0 0 L7 -13 L45 -50 L52 -43 L14 -6 Z", fill: C.navy, stroke: "#0f2440", "stroke-width": 1.5, "stroke-linejoin": "round" }, stylo);
    D.el("path", { d: "M0 0 L7 -13 L14 -6 Z", fill: "#e2a72b", stroke: "#0f2440", "stroke-width": 1.5, "stroke-linejoin": "round" }, stylo);
    const valide = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: 572, cy: 316, r: 18, fill: C.vert }, valide);
    D.el("path", { d: "M563 316 l6 7 l12 -15", fill: "none", stroke: C.papier, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, valide);
    const cli = client(g), parole = bulleClient(g, ["Merci, je garde", "ma copie."]);
    const pt = k => { const p = trace.getPointAtLength ? trace.getPointAtLength(trace.getTotalLength() * k) : { x: 372, y: 326 }; return p; };
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      const v = FIGE ? 1 : passe(f, 1.2, 4.2);
      trace.setAttribute("stroke-dashoffset", (100 * (1 - v)).toFixed(1)); voir(trace, FIGE ? 1 : sortie);
      const p = pt(v);
      stylo.setAttribute("transform", `translate(${(p.x + 2).toFixed(1)} ${(p.y + 2).toFixed(1)})`);
      voir(stylo, FIGE ? 0 : D.fenetre(f, 1, 4.6, 0.3) * sortie);
      voir(valide, passe(f, 4.8, 5.3) * sortie);
      voir(parole, passe(f, 6.4, 7) * sortie);
      cli(t, FIGE ? -35 : D.courbe([[0, -8], [6, -8], [6.8, -35], [9.8, -35], [10.4, -8]], f));
    };
  }

  const ETAPES = [   // les phrases : espaces insécables avant « : ; » et entre un nombre et son unité
    { titre: "Le froid est revenu", bulle: ["Regardez :", "+3 °C !"], bras: -60, cycle: 10, dessiner: resultat,
      dire: "Le froid est revenu : l’afficheur de la vitrine, monté jusqu’à +9 °C ce matin, est redescendu à +3 °C. Le client le voit de ses yeux." },
    { titre: "Ce qui a été fait", bulle: ["Voilà ce que", "j’ai fait."], bras: -75, cycle: 11, dessiner: explication,
      dire: "Le technicien explique, avec des mots simples, ce qui a été fait et pourquoi : un filtre bouché freinait le froid, il l’a changé, a remis le fluide et tout vérifié avec ses instruments." },
    { titre: "La fiche signée", bulle: ["Je signe la", "fiche."], bras: -50, cycle: 11, dessiner: signature,
      dire: "Le technicien signe la fiche d’intervention et en remet un exemplaire au client : chacun garde le sien. Au-delà d’un seuil de charge, le détenteur de l’installation la signe aussi." }
  ];

  M.monter({ nom: "expliquer", etapes: ETAPES,
    aria: "Un technicien frigoriste explique son intervention au client en trois étapes : l’afficheur de la vitrine, monté à +9 °C ce matin, est redescendu à +3 °C ; le technicien dit avec des mots simples ce qui a été fait et pourquoi ; il signe la fiche d’intervention et en remet un exemplaire au client.",
    legende: "Cinquième scène de la journée : expliquer au client, en trois étapes. « ▶ Dérouler » joue toute la scène." });
})();
