/* =====================================================================
   scene-evaporation.js — evaporateur-interactif : le fluide qui bout dans
   la batterie, en coupe, au ralenti, et son point sur le diagramme enthalpique
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, série du chat B, d'après
   le pilote compresseur-interactif/scene-compression.js) : le dessin vivant du
   module. Le mélange froid de liquide et de vapeur (basse pression) entre dans
   le tube ; l'air tiède de la chambre, soufflé à travers les ailettes, le
   chauffe : le liquide bout (bulles), sans se réchauffer, et la nappe baisse
   jusqu'à la dernière goutte ; il ne reste que de la vapeur, qui se réchauffe
   un peu (surchauffe) avant de sortir. Pendant ce temps, le point du fluide
   avance vers la droite sur la ligne de basse pression du diagramme. Trois
   étapes (entrée, ébullition, surchauffe), au ralenti ; la partie du tube qui
   agit s'allume ; un bouton par étape (l'étape se joue puis s'arrête) et
   Lecture / Pause.
   RÉEMPLOI, en lecture (rien n'y est modifié) :
     · jouerezo/moteur/voyage-dessin.js (VOYAGE_DESSIN) : métaux en relief,
       molécules colorées selon la température, l'héroïne (liquide / bout /
       vapeur), la nappe de liquide, les bulles, le ventilateur, les chevrons
       d'air, les flèches de chaleur, pastille, traits de rappel, filigrane ;
     · jouerezo/moteur/voyage-diagramme.js : le diagramme (cloche, BP/HP,
       cycle de référence, trace, molécule).
   La coupe reprend le principe de la scène « l'évaporateur » du Voyage
   (voyage-scenes-a.js) dans un cadre resserré : là-bas, les légendes font 32
   unités sur 1 600, soit 13 px dans un écran de module ; ici 25 sur 640.
   POSE (index.html) : <figure id="scene-accueil"> (la coupe seule) et
   <figure id="scene-lecon"> (coupe + diagramme + boutons).
   RÈGLES TENUES : texte jamais sur un tracé ; légendes ≥ 25 unités dans la
   coupe, 22 dans le diagramme (≥ 18,7 px à 1 280 px) ; le liquide se voit
   liquide (nappe) ; filigrane R9 derrière le dessin ; l'animation ne lit
   jamais le réglage « réduire les animations » du système.
   PHYSIQUE (rigueur du diagramme enthalpique) : à pression constante, le
   fluide pur bout sans changer de température (couleur constante) ; dans la
   cloche, liquide et vapeur sont à la fois présents (zone « liquide + vapeur ») ;
   la nappe baisse comme le titre en vapeur monte ; après la dernière goutte,
   la vapeur seule se réchauffe un peu : c'est la surchauffe utile (quelques
   kelvins), jamais de liquide vers le compresseur. Mots repris de la planche
   « Surchauffe utile et surchauffe totale » (res/svg/surchauffe-utile-totale.svg).
   DIAGRAMME : schéma sans chiffres. Forme du R-134a et cycle repris des
   calculs de l'édition « vis » (jouerezo/donnees/voyage-vis-diagramme.js) :
   évaporation −10 °C, condensation +40 °C. Ici, seule la partie « évaporateur »
   du cycle est parcourue : le point va de l'entrée (w = 0) à la dernière
   goutte (w = 1), puis jusqu'à la sortie surchauffée (w = 2).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  if (!D || !D.diagramme) { ["scene-accueil", "scene-lecon"].forEach(i => { const f = document.getElementById(i); if (f) f.hidden = true; }); return; } // moteurs du Voyage absents : pas de cadre vide
  const TOUR = 2 * Math.PI;

  const ETAPES = [
    { nom: "Entrée", duree: 3.2, dire: "le mélange froid arrive : surtout liquide, un peu de vapeur." },
    { nom: "Ébullition", duree: 4.6, dire: "l’air tiède fait bouillir le liquide, sans le réchauffer." },
    { nom: "Surchauffe", duree: 3.4, dire: "plus de liquide : la vapeur se réchauffe un peu et sort." }
  ];

  /* chemin : 0 entrée évaporateur · 1 fin d'ébullition · 2 aspiration · 3 refoulement ·
     4 début de condensation · 5 fin de condensation · 6 sortie condenseur · 7 = 0 */
  const DONNEES = { fluide: "R134a (forme seule, non affiché)", chiffres: false,
    plage: { h: [165, 520], p: [1.2, 55] }, pcrit: [40.593, 390.4],
    cloche: [[0.913, 162.9, 381.4], [1.077, 167.5, 383.6], [1.27, 172.3, 385.9], [1.498, 177.3, 388.3], [1.767, 182.5, 390.7], [2.085, 188, 393.3], [2.459, 193.7, 395.8], [2.9, 199.6, 398.4], [3.421, 205.9, 401.1], [4.035, 212.5, 403.9], [4.759, 219.4, 406.6], [5.613, 226.6, 409.4], [6.621, 234.3, 412.2], [7.809, 242.4, 415.1], [9.211, 251, 417.8], [10.864, 260.2, 420.5], [12.814, 269.9, 423], [15.114, 280.3, 425.3], [17.827, 291.6, 427.3], [21.027, 303.8, 428.6], [24.801, 317.2, 429], [29.253, 332.2, 427.8], [34.504, 350.1, 423]],
    BP: 2.006, HP: 10.166,
    chemin: [[252, 2.006], [392.7, 2.006], [402.9, 2.006], [458.2, 10.166], [419.4, 10.166], [256.4, 10.166], [252, 10.166], [252, 2.006]],
    zones: [["liquide", 212, 24], ["liquide +", 326, 5.8], ["vapeur", 326, 3.6], ["vapeur", 509, 20, "end"]] };

  /* ---------- la coupe (repère 640 × 310) ---------- */
  const L = 640, TY = 120, TH = 84, YH = TY + 10, YB = TY + TH - 10; // le tube traverse le cadre ; parois de 10, intérieur de 64
  const PV = 0.7, FINS = [0, 0.22, PV, 1]; // le long du tube (0 entrée, 1 sortie) : PV = la dernière goutte ; FINS = fin de chaque étape
  const NMAX = 0.7, KM = 0.65, KB = 0.6, KC = 0.6; // hauteur de la nappe à l'entrée ; échelles des petites molécules, des bulles, des chevrons et flèches
  const ZONES = [0, 1, 2].map(k => [Math.max(3, FINS[k] * L), Math.min(L - 3, FINS[k + 1] * L)]); // la partie du tube allumée à chaque étape
  const POLICE = { "font-family": "Calibri, Arial, sans-serif" };
  const etiquette = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 25, fill: "#10233c", "font-weight": 600 }, POLICE, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Édu"; }); // cartouche du produit (charte R9)

  const avance = p => p < PV ? D.lisse(p / PV) : 1; // part du liquide déjà passée en vapeur (0 → 1) : le point du diagramme, la nappe
  const niveau = p => NMAX * (1 - avance(p)); // hauteur de la nappe, de 0 à 1 de l'intérieur du tube : elle baisse jusqu'à la dernière goutte
  const tempFluide = p => p < PV ? 0.06 : 0.06 + 0.26 * D.lisse((p - PV) / (1 - PV)); // constante pendant l'ébullition, puis la surchauffe (petite : quelques kelvins)
  const progres = r => { const k = Math.min(2, Math.floor(r)); return D.lerp(FINS[k], FINS[k + 1], r - k); }; // r : le temps en étapes (0 → 3) → place le long du tube

  function coupe(svg) {
    svg.setAttribute("viewBox", "0 0 640 310");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[70, 268], [520, 250]], 220)); // deux exemplaires visibles (le tube opaque cacherait celui du centre) ; le troisième au centre du diagramme
    // les ailettes : le tube les traverse
    for (let x = 124; x <= 516; x += 10) D.el("rect", { x: x, y: TY - 28, width: 3, height: TH + 56, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    // l'air de la chambre : des chevrons, tièdes au-dessus du tube, refroidis au-dessous
    const air = D.el("g", { transform: "scale(" + KC + ")" }, g), chevrons = [];
    for (let k = 0; k < 10; k++) for (let j = 0; j < 4; j++) chevrons.push({ x: 140 + 40 * k, f: j / 4 + (k % 2) * 0.13, maj: D.chevron(air) });
    // la chaleur de l'air : des flèches qui vont vers la paroi du tube, de part et d'autre
    const chaud = D.el("g", { transform: "scale(" + KC + ")" }, g), vagues = [];
    for (let k = 0; k < 5; k++) [-1, 1].forEach(c => vagues.push({ x: 160 + 80 * k, c: c, f: D.frac(k * 0.37 + (c > 0 ? 0.5 : 0)), maj: D.chaleur(chaud) })); // entre deux colonnes de chevrons
    // le tube de cuivre ; dedans : la vapeur, l'héroïne, la nappe (le liquide se voit liquide), les bulles
    D.tube(g, 0, TY, L, TH, "cuivre", false, "#eef4fa");
    const vap = D.el("g", { transform: "scale(" + KM + ")" }, g), fond = D.el("g", {}, g);
    const nappe = D.liquide(g, { x0: 0, x1: L, yh: YH, yb: YB, niveau: x => niveau(x / L), couleur: () => D.couleur(0.06, false), opacite: 0.8, pas: 12 });
    const bul = D.bulles(D.el("g", { transform: "scale(" + KB + ")" }, g), 24, 41);
    const ra = D.alea(17), MOLS = [], NM = 46; // réparties le long du tube, pour qu'elles ne s'empilent pas
    for (let i = 0; i < NM; i++) MOLS.push({ s: (i + 0.5 + (ra() - 0.5) * 0.6) / NM, ry: D.frac(i * 0.382 + 0.13), ph: ra() * TOUR, maj: D.mol(vap) });
    const mila = D.heroine(fond, { r: 30 });
    const zone = D.el("rect", { y: TY - 3, height: TH + 6, rx: 6, fill: "none", stroke: "#ff6b35", "stroke-width": 5 }, g); // la partie du tube qui agit
    const vent = D.ventilateur(g, 262, 33, 22);
    // légendes : jamais sur un tracé ; traits de rappel en pointillé
    etiquette(g, 10, 24, "entrée (BP)", { "font-weight": 700, fill: D.BLEU });
    etiquette(g, 10, 52, "liquide + vapeur");
    etiquette(g, 630, 24, "sortie (BP)", { "font-weight": 700, fill: D.BLEU, "text-anchor": "end" });
    etiquette(g, 630, 52, "vapeur seule", { "text-anchor": "end" });
    etiquette(g, 298, 42, "ventilateur");
    etiquette(g, 10, 98, "air tiède");
    etiquette(g, 10, 236, "air"); etiquette(g, 10, 264, "refroidi");
    etiquette(g, 630, 98, "ailettes", { "text-anchor": "end" }); D.trait(g, 536, 92, 519, 106);
    etiquette(g, 630, 242, "tube", { "text-anchor": "end" }); D.trait(g, 576, 230, 560, 207);
    D.pastille(g, 295, 294, "ébullition", "#2f6fb8", 24, "middle");
    D.pastille(g, 543, 294, "surchauffe", D.ORANGE, 24, "middle");

    return function (u, t) {
      const r = u - 3 * Math.floor(u / 3), etape = Math.min(2, Math.floor(r)), p = progres(r), x = p * L;
      const etat = p < 0.16 ? "liquide" : p < PV ? "bout" : "vapeur", temp = tempFluide(p), humeur = etape === 0 ? "froid" : etape === 1 ? "surprise" : "sourire";
      vent(t * 380);
      nappe.maj(t);
      // l'air : tiède au-dessus, refroidi au-dessous ; il s'efface en approchant du tube
      chevrons.forEach(c => {
        const f = D.frac(c.f + t * 0.2), y = 66 + f * 184;
        const v = y < TY ? D.borne((TY - 6 - y) / 10, 0, 1) : y > TY + TH ? D.borne((y - TY - TH - 6) / 10, 0, 1) : 0;
        c.maj(c.x / KC, y / KC, 0, y < TY ? "#e8914a" : "#3d7fca", v * D.fenetre(f, 0, 1, 0.05));
      });
      // la chaleur passe de l'air au tube : au-dessus la flèche descend, au-dessous elle monte
      vagues.forEach(w => {
        const f = D.frac(w.f + t * 0.45), y = w.c < 0 ? TY - 3 - 18 * (1 - f) : TY + TH + 3 + 18 * (1 - f);
        w.maj(w.x / KC, y / KC, w.c < 0 ? 0 : 180, 0.9 * D.fenetre(f, 0, 1, 0.25));
      });
      // les bulles naissent au fond de la nappe, là où il y a du liquide
      bul(t, q => { const bx = (0.03 + q * 0.52) * L; return [bx / KB, (YB - 5) / KB, (nappe.surface(bx, t) + 3) / KB, niveau(bx / L) > 0.1 ? 1 : 0]; });
      // la vapeur : de petites molécules, seulement là où la nappe laisse de la place ; elles prennent la couleur de leur température
      MOLS.forEach(m => {
        const mp = D.frac(m.s + t / 11), mx = mp * L, libre = nappe.surface(mx, t) - YH;
        m.maj(mx / KM, (YH + 9 + m.ry * Math.max(0, libre - 18) + Math.sin(t * 2.4 + m.ph) * 3) / KM, tempFluide(mp), true, D.borne((libre - 14) / 8, 0, 1));
      });
      // l'héroïne : flotte dans la nappe, bout, puis s'envole en vapeur (elle apparaît à l'entrée, s'efface à la sortie)
      const yLiq = D.borne(nappe.surface(x, t) + 3 + Math.sin(t * 2) * 3, YH + 22, YB - 30), yVap = (YH + YB) / 2 - 3 + Math.sin(t * 2.5) * 4;
      mila({ x: x, y: D.lerp(yLiq, yVap, D.lisse((p - PV + 0.02) / 0.1)), s: 0.6, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0],
        op: Math.min(D.borne(r / 0.25, 0, 1), D.borne((3 - r) / 0.25, 0, 1)) });
      zone.setAttribute("x", ZONES[etape][0].toFixed(1)); zone.setAttribute("width", (ZONES[etape][1] - ZONES[etape][0]).toFixed(1));
      return { etape: etape, temp: temp, w: p < PV ? avance(p) : 1 + (p - PV) / (1 - PV), trace: true, humeur: humeur, etat: etat };
    };
  }

  function diagramme(svg) {
    svg.setAttribute("viewBox", "0 0 460 310");
    window.VOYAGE_DIAGRAMME_ZONE = { x: 1, y: 1, l: 458, h: 308 }; // lue par voyage-diagramme.js à la construction
    const d = D.diagramme(svg, DONNEES), fil = D.filigrane(d.g, [[230, 165]], 200);
    marquer(fil);
    d.g.insertBefore(fil, d.g.children[1]); // derrière la courbe, devant le fond du panneau
    return function (e, t) { d.maj(e.trace ? 0 : null, e.w, {}, { t: t, temp: e.temp, etat: e.etat, humeur: e.humeur }); };
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
    const majCoupe = coupe(svgNeuf(dessins, "scene-coupe", "Animation au ralenti : coupe d’un tube d’évaporateur. Le mélange froid de liquide et de vapeur entre, le liquide bout en prenant la chaleur de l’air tiède de la chambre, puis il ne reste que de la vapeur, qui se réchauffe un peu avant de sortir."));
    const majDiag = complet ? diagramme(svgNeuf(dessins, "scene-diagramme", "Le diagramme enthalpique : pendant le passage dans l’évaporateur, le point du fluide va vers la droite sur la ligne de basse pression : le liquide devient vapeur, puis la vapeur se réchauffe.")) : null;
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
