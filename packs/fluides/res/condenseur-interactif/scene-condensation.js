/* =====================================================================
   scene-condensation.js — condenseur-interactif : la condensation en
   coupe, au ralenti, et son point sur le diagramme enthalpique
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, chat B-condenseur,
   d'après le pilote scene-compression.js du module compresseur) : le
   dessin vivant du module. Un tube du serpentin, coupé dans sa longueur,
   au milieu de ses ailettes. La vapeur chaude (HP) entre à droite et se
   refroidit sans changer d'état (désurchauffe) ; elle se condense à
   température constante : des gouttes se forment, tombent, et une nappe
   de liquide monte dans le tube (condensation) ; le liquide, tube plein,
   se refroidit encore (sous-refroidissement) et sort à gauche. L'air
   extérieur traverse les ailettes et emporte la chaleur. Pendant ce
   temps, le point de la molécule descend vers la gauche sur le diagramme
   enthalpique, à haute pression constante.
   Trois étapes, une par zone ; la zone qui agit s'allume ; un bouton par
   étape (l'étape se joue puis s'arrête) et Lecture / Pause.
   RÉEMPLOI, en lecture (rien n'y est modifié) :
     · jouerezo/moteur/voyage-dessin.js (VOYAGE_DESSIN) : métaux en relief,
       molécules colorées selon la température, l'héroïne, la nappe de
       liquide, les gouttes, le ventilateur, l'air et la chaleur, pastille,
       traits de rappel, filigrane ;
     · jouerezo/moteur/voyage-diagramme.js : le diagramme (cloche, BP/HP,
       cycle de référence, trace, molécule).
   La coupe reprend le principe de la scène « le condenseur » du Voyage
   (voyage-scenes-a.js : le fluide va de droite à gauche, comme sur la croix
   du frigoriste) dans un cadre resserré : là-bas, les légendes font 32
   unités sur 1 600, soit 13 px dans un écran de module ; ici 25 sur 640.
   POSE (index.html) : <figure id="scene-accueil"> (la coupe seule) et
   <figure id="scene-lecon"> (coupe + diagramme + boutons).
   RÈGLES TENUES : texte jamais sur un tracé ; légendes ≥ 25 unités dans la
   coupe, 22 dans le diagramme (≥ 18,7 px à 1 280 px) ; le liquide se voit
   liquide (nappe, jamais des billes) ; filigrane R9 derrière le dessin ;
   l'animation ne lit jamais prefers-reduced-motion.
   DIAGRAMME : schéma sans chiffres. Forme du R-134a et cycle repris des
   calculs de l'édition « vis » (jouerezo/donnees/voyage-vis-diagramme.js) :
   évaporation −10 °C, condensation +40 °C. Le condenseur est le trajet
   3 → 6 du cycle : 3 → 4 désurchauffe, 4 → 5 condensation (le palier),
   5 → 6 sous-refroidissement (court : quelques kelvins).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  if (!D || !D.diagramme) { ["scene-accueil", "scene-lecon"].forEach(i => { const f = document.getElementById(i); if (f) f.hidden = true; }); return; } // moteurs du Voyage absents : pas de cadre vide

  /* ---------- la coupe (repère 640 × 310) ---------- */
  /* le fluide va de droite à gauche (comme sur la croix) : entrée | désurchauffe | condensation | sous-refroidissement | sortie */
  const X_ENT = 620, X_Z2 = 470, X_Z3 = 170, X_SOR = 20;
  const VIT = 62.5;                                  // vitesse du fluide (unités / s) : la durée d'une étape = longueur de sa zone / VIT
  const LONG = [X_ENT - X_Z2, X_Z2 - X_Z3, X_Z3 - X_SOR], DEB = [0, LONG[0], LONG[0] + LONG[1]];
  const ZONES = [[X_Z2, X_ENT], [X_Z3, X_Z2], [X_SOR, X_Z3]];
  const YT = 104, YB = 182, YH = 114, YF = 172, CM = 143; // tube (paroi), intérieur (haut, bas), milieu
  const KM = 0.7;                                    // échelle des petites molécules
  const T_COND = 0.62;                               // température de condensation (0 froid → 1 très chaud) : celle du palier
  const COUL = ["#b83224", "#6d4a77", "#1f5b99"];    // les trois zones : vapeur, mélange, liquide (couleurs de assets/condenseur-trois-zones.svg, foncées)

  const ETAPES = [
    { nom: "Désurchauffe", duree: LONG[0] / VIT, dire: "la vapeur chaude se refroidit sans changer d’état." },
    { nom: "Condensation", duree: LONG[1] / VIT, dire: "la vapeur devient liquide, à température constante." },
    { nom: "Sous-refroidissement", duree: LONG[2] / VIT, dire: "le liquide continue de se refroidir." }
  ];

  /* chemin : 0 entrée évaporateur · 1 fin d'ébullition · 2 aspiration · 3 refoulement = entrée du condenseur ·
     4 début de condensation · 5 fin de condensation · 6 sortie condenseur · 7 = 0 */
  const DONNEES = { fluide: "R134a (forme seule, non affiché)", chiffres: false,
    plage: { h: [165, 520], p: [1.2, 55] }, pcrit: [40.593, 390.4],
    cloche: [[0.913, 162.9, 381.4], [1.077, 167.5, 383.6], [1.27, 172.3, 385.9], [1.498, 177.3, 388.3], [1.767, 182.5, 390.7], [2.085, 188, 393.3], [2.459, 193.7, 395.8], [2.9, 199.6, 398.4], [3.421, 205.9, 401.1], [4.035, 212.5, 403.9], [4.759, 219.4, 406.6], [5.613, 226.6, 409.4], [6.621, 234.3, 412.2], [7.809, 242.4, 415.1], [9.211, 251, 417.8], [10.864, 260.2, 420.5], [12.814, 269.9, 423], [15.114, 280.3, 425.3], [17.827, 291.6, 427.3], [21.027, 303.8, 428.6], [24.801, 317.2, 429], [29.253, 332.2, 427.8], [34.504, 350.1, 423]],
    BP: 2.006, HP: 10.166,
    chemin: [[252, 2.006], [392.7, 2.006], [402.9, 2.006], [458.2, 10.166], [419.4, 10.166], [256.4, 10.166], [252, 10.166], [252, 2.006]],
    // « liquide + » et « vapeur » (deux lignes) sont descendues sous le palier : la molécule, avec son halo, le parcourt de bout en bout (3 → 6)
    zones: [["liquide", 212, 24], ["liquide +", 326, 3.8], ["vapeur", 326, 2.5], ["vapeur", 509, 20, "end"]] };

  const POLICE = { "font-family": "Calibri, Arial, sans-serif" };
  const etiquette = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 25, fill: "#10233c", "font-weight": 600 }, POLICE, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = ".fr"; }); // cartouche du produit (charte R9)

  /* ce que le fluide est, selon l'endroit x du tube */
  const tempDe = x => x > X_Z2 ? D.lerp(0.92, T_COND, D.borne((X_ENT - x) / LONG[0], 0, 1))  // désurchauffe : la vapeur se refroidit jusqu'à sa température de condensation
    : x > X_Z3 ? T_COND                                                                      // condensation : le palier, température constante
    : D.lerp(T_COND, 0.45, D.borne((X_Z3 - x) / LONG[2], 0, 1));                             // sous-refroidissement : le liquide se refroidit encore
  const niveau = x => x >= X_Z2 ? 0 : x > X_Z3 ? D.lisse((X_Z2 - x) / LONG[1]) : 1;          // nappe de liquide : 0 vapeur seule → 1 tube plein

  function coupe(svg) {
    svg.setAttribute("viewBox", "0 0 640 310");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[548, 268], [96, 268]], 220)); // deux exemplaires visibles (le tube opaque cacherait celui du centre) ; le troisième au centre du diagramme
    // les ailettes : de fines plaques d'acier, traversées par le tube
    for (let x = 26; x <= 606; x += 20) D.el("rect", { x: x, y: 64, width: 7, height: 160, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    // l'air (bleu avant la batterie, orange après) et la chaleur qui sort : derrière le tube, qui les cache en passant
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g);
    const chevrons = [], vagues = [];
    for (let k = 0; k < 7; k++) for (let j = 0; j < 2; j++) chevrons.push({ x: 56 + k * 90, f: j / 2 + k * 0.13, maj: D.chevron(air) });
    [[191, -1], [371, -1], [551, -1], [101, 1], [281, 1], [461, 1]].forEach(([x, cote], i) => vagues.push({ x: x, cote: cote, f: D.frac(i * 0.37), maj: D.chaleur(chaud) }));
    // le tube du serpentin, coupé dans sa longueur ; l'intérieur est plus frais à la sortie
    D.tube(g, 0, YT, 640, YB - YT, "cuivre", false, "#fbefe6");
    D.el("rect", { x: 0, y: YH, width: X_Z3, height: YF - YH, fill: "#eef4fa" }, g);
    // la vapeur : de petites molécules qui avancent, colorées selon leur température, et s'effacent quand la nappe monte
    const mols = D.el("g", { transform: "scale(" + KM + ")" }, g);
    const r = D.alea(41), V = [];
    for (let i = 0; i < 48; i++) V.push({ s: (i + r()) / 48, ry: r(), ph: r() * 6.28, maj: D.mol(mols) });
    // le liquide : une nappe (le liquide se voit liquide), des gouttes qui y tombent ; l'héroïne entre deux nappes (la seconde, très translucide,
    // la voile quand elle est plongée : on la voit dans le liquide sans la perdre de vue)
    const nappe = o => D.liquide(g, Object.assign({ x0: 0, x1: 640, yh: YH, yb: YF, niveau: niveau, couleur: x => D.couleur(tempDe(x), false), pas: 10 }, o));
    const liq = nappe({ opacite: 0.72 });
    const mila = D.heroine(g, { r: 30 });
    const voile = nappe({ opacite: 0.3 });
    const gouttes = D.bulles(D.el("g", {}, g), 18, 53, true);
    // la zone qui agit s'allume : le tube et son crochet
    const cadre = D.el("rect", { y: YT - 4, height: YB - YT + 8, rx: 7, fill: "none", stroke: "#ff6b35", "stroke-width": 5 }, g);
    const crochets = ZONES.map(([a, b]) => D.el("path", { d: "M " + (a + 4) + " 232 V 241 H " + (b - 4) + " V 232", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, g));
    const vent = D.ventilateur(g, 326, 31, 21);
    // légendes : jamais sur un tracé ; traits de rappel en pointillé
    etiquette(g, 10, 24, "sortie", { "font-weight": 700, fill: D.BLEU });
    etiquette(g, 10, 52, "liquide (HP)");
    etiquette(g, 630, 24, "entrée", { "font-weight": 700, fill: D.ORANGE, "text-anchor": "end" });
    etiquette(g, 630, 52, "vapeur chaude (HP)", { "text-anchor": "end" });
    D.trait(g, 18, 62, 18, 100); D.trait(g, 622, 62, 622, 100);
    etiquette(g, 160, 24, "air extérieur", { "font-weight": 700, fill: "#2f6fb8" });
    etiquette(g, 160, 52, "air réchauffé", { "font-weight": 700, fill: D.ORANGE });
    etiquette(g, 620, 272, "désurchauffe", { "font-weight": 700, fill: COUL[0], "text-anchor": "end" });
    etiquette(g, 320, 272, "condensation", { "font-weight": 700, fill: COUL[1], "text-anchor": "middle" });
    etiquette(g, 14, 272, "sous-", { "font-weight": 700, fill: COUL[2] });
    etiquette(g, 14, 300, "refroidissement", { "font-weight": 700, fill: COUL[2] });

    return function (u, t) {
      const n = Math.floor(u / 3), reste = u - 3 * n, k = Math.floor(reste), f = reste - k; // étape (0, 1, 2) et avancement dans l'étape (0 → 1)
      const s = DEB[k] + LONG[k] * f, x = X_ENT - s;                                     // la molécule héroïne : distance parcourue depuis l'entrée, puis place dans le tube
      const temp = tempDe(x);
      cadre.setAttribute("x", ZONES[k][0] - 4); cadre.setAttribute("width", ZONES[k][1] - ZONES[k][0] + 8);
      crochets.forEach((c, i) => { c.setAttribute("stroke", i === k ? "#ff6b35" : COUL[i]); c.setAttribute("stroke-width", i === k ? 7 : 4); });
      vent(t * 360);
      liq.maj(t); voile.maj(t);
      // l'air traverse les ailettes de haut en bas : frais avant le tube, réchauffé après (le tube le cache au passage)
      chevrons.forEach(c => {
        const q = D.frac(c.f + t * 0.17), y = D.lerp(72, 214, q);
        c.maj(c.x, y, 0, y < CM ? "#3d7fca" : "#e8914a", 0.9 * D.fenetre(q, 0, 1, 0.1));
      });
      // la chaleur sort du tube, plus vive dans la zone qui agit
      vagues.forEach(v => {
        const q = D.frac(v.f + t * 0.45), vive = 0.4 + 0.6 * D.borne(1 - Math.abs(v.x - (ZONES[k][0] + ZONES[k][1]) / 2) / 220, 0, 1);
        v.maj(v.x, v.cote < 0 ? 74 - 14 * q : 212 + 14 * q, v.cote < 0 ? 180 : 0, vive * D.fenetre(q, 0, 1, 0.25));
      });
      // les gouttes se forment sous la paroi et tombent dans la nappe, tant que le tube n'est pas plein
      gouttes(t, q => {
        const gx = D.lerp(X_Z2 - 6, X_Z3 + 24, q), nv = niveau(gx);
        return [gx, YH + 9, liq.surface(gx, t) - 2, nv < 0.93 ? 0.95 : 0, D.couleur(tempDe(gx), false)];
      });
      // la vapeur : elle avance, se refroidit, et s'efface quand la nappe monte (il ne reste plus de place au-dessus)
      V.forEach(m => {
        const mx = 640 - D.frac(m.s + t * VIT / 640) * 640, libre = liq.surface(mx, t) - YH;
        const my = YH + 10 + m.ry * Math.max(0, libre - 24) + Math.sin(t * 3 + m.ph) * 3;
        m.maj(mx / KM, my / KM, tempDe(mx), true, D.borne((libre - 24) / 22, 0, 1));
      });
      // l'héroïne : vapeur au début, elle touche la nappe et devient liquide à la moitié de la condensation, puis flotte et se refroidit
      const surf = liq.surface(x, t), vap = s < DEB[1] + 0.5 * LONG[1];
      const yv = Math.min(CM + Math.sin(t * 2.5) * 4, Math.max(YH + 18, surf - 14)), yl = Math.max(YH + 20, surf + 3 + Math.sin(t * 2) * 3);
      const humeur = k === 0 ? "chaud" : k === 1 ? (f < 0.4 ? "chaud" : f < 0.75 ? "surprise" : "sourire") : "sourire";
      mila({ x: x, y: D.lerp(yv, yl, D.lisse((s - (DEB[1] + 0.5 * LONG[1])) / 40)), s: 0.5, t: t, temp: temp, etat: vap ? "vapeur" : "liquide", humeur: humeur, regard: [-1, 0],
        op: Math.min(D.borne(s / 18, 0, 1), D.borne((DEB[2] + LONG[2] - s) / 18, 0, 1)) });
      return { etape: k, temp: temp, w: 3 + reste, trace: true, humeur: humeur, etat: vap ? "vapeur" : "liquide" };
    };
  }

  function diagramme(svg) {
    svg.setAttribute("viewBox", "0 0 460 310");
    window.VOYAGE_DIAGRAMME_ZONE = { x: 1, y: 1, l: 458, h: 308 }; // lue par voyage-diagramme.js à la construction
    const d = D.diagramme(svg, DONNEES), fil = D.filigrane(d.g, [[230, 165]], 200);
    marquer(fil);
    d.g.insertBefore(fil, d.g.children[1]); // derrière la courbe, devant le fond du panneau
    return function (e, t) { d.maj(e.trace ? 3 : null, e.w, {}, { t: t, temp: e.temp, etat: e.etat, humeur: e.humeur }); };
  }

  /* ---------- la pose : une figure = un dessin qui vit ---------- */
  const NS = "http://www.w3.org/2000/svg", scenes = [];
  function svgNeuf(hote, cls, aria) {
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("class", cls); s.setAttribute("role", "img"); s.setAttribute("aria-label", aria);
    hote.appendChild(s);
    return s;
  }
  function poser(hote, complet) {
    if (!hote) return;
    const dessins = document.createElement("div");
    dessins.className = "scene-dessins";
    hote.appendChild(dessins);
    const majCoupe = coupe(svgNeuf(dessins, "scene-coupe", "Animation au ralenti : coupe d’un tube de condenseur à air. La vapeur chaude entre à droite et se refroidit, elle se condense en gouttes puis en nappe de liquide, le liquide se refroidit encore et sort à gauche, pendant que l’air emporte la chaleur."));
    const majDiag = complet ? diagramme(svgNeuf(dessins, "scene-diagramme", "Le diagramme enthalpique : pendant la condensation, le point du fluide va de la vapeur chaude jusqu’au liquide, vers la gauche, à haute pression constante.")) : null;
    const s = { hote: hote, u: 0, t: 0, joue: true, arret: null, etape: -1, majCoupe: majCoupe, majDiag: majDiag };
    const barre = document.createElement(complet ? "div" : "figcaption");
    barre.className = complet ? "scene-barre" : "scene-legende-accueil";
    if (complet) {
      barre.innerHTML = '<button type="button" class="scene-lecture" aria-pressed="true">⏸ Pause</button>' +
        ETAPES.map((e, i) => '<button type="button" class="scene-etape" data-etape="' + i + '" aria-label="Étape ' + (i + 1) + " : " + e.nom.toLowerCase() + '" title="' + e.nom + '">' + (i + 1) + "</button>").join("") +
        '<p class="scene-legende"></p>';
      barre.querySelector(".scene-lecture").addEventListener("click", () => { s.joue = !s.joue; s.arret = null; boutons(s); });
      barre.querySelectorAll(".scene-etape").forEach(b => b.addEventListener("click", () => {
        const k = Number(b.dataset.etape), debut = 3 * Math.floor(s.u / 3) + k;
        s.u = debut; s.arret = debut + 0.999; s.joue = true; boutons(s); // l'étape se joue, puis s'arrête sur sa fin
      }));
    }
    hote.appendChild(barre);
    s.legende = complet ? barre.querySelector(".scene-legende") : barre;
    s.barre = complet ? barre : null;
    scenes.push(s);
    rendre(s);
  }
  function boutons(s) {
    if (!s.barre) return;
    const b = s.barre.querySelector(".scene-lecture");
    b.textContent = s.joue ? "⏸ Pause" : "▶ Lecture"; b.setAttribute("aria-pressed", String(s.joue));
    s.barre.querySelectorAll(".scene-etape").forEach((x, i) => { if (i === s.etape) x.setAttribute("aria-current", "step"); else x.removeAttribute("aria-current"); });
  }
  function rendre(s) {
    const e = s.majCoupe(s.u, s.t);
    if (s.majDiag) s.majDiag(e, s.t);
    if (e.etape !== s.etape) { s.etape = e.etape; const et = ETAPES[e.etape]; s.legende.innerHTML = "<strong>" + (s.barre ? "" : e.etape + 1 + " · ") + et.nom + "</strong> — " + et.dire; boutons(s); }
  }
  let avant = 0;
  function boucle(now) {
    const dt = avant ? Math.min(0.1, (now - avant) / 1000) : 0;
    avant = now;
    scenes.forEach(s => {
      if (!s.hote.getClientRects().length || !s.joue) return; // figure cachée ou en pause : rien ne bouge
      s.t += dt;
      s.u += dt / ETAPES[Math.floor(s.u - 3 * Math.floor(s.u / 3))].duree;
      if (s.arret !== null && s.u >= s.arret) { s.u = s.arret; s.arret = null; s.joue = false; boutons(s); }
      rendre(s);
    });
    requestAnimationFrame(boucle);
  }
  // les dégradés métal et la petite molécule, une seule fois pour toute la page (une figure cachée ne les porterait plus)
  const defs = document.createElementNS(NS, "svg");
  defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.setAttribute("aria-hidden", "true");
  defs.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
  D.defs(defs);
  document.body.appendChild(defs);
  poser(document.getElementById("scene-accueil"), false);
  poser(document.getElementById("scene-lecon"), true);
  requestAnimationFrame(boucle);
})();
