/* =====================================================================
   scene-compression.js — compresseur-interactif : la compression en
   coupe, au ralenti, et son point sur le diagramme enthalpique
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, pilote du chat B) :
   le dessin vivant du module. La vapeur entre froide en basse pression
   (bleu), le piston la serre, elle sort très chaude en haute pression
   (rouge) ; pendant la compression, son point monte sur le diagramme.
   Trois étapes (aspiration, compression, refoulement), au ralenti ; la
   pièce qui agit s'allume ; un bouton par étape (l'étape se joue puis
   s'arrête) et Lecture / Pause.
   RÉEMPLOI, en lecture (rien n'y est modifié) :
     · jouerezo/moteur/voyage-dessin.js (VOYAGE_DESSIN) : métaux en relief,
       molécules colorées selon la température, l'héroïne, la nappe
       d'huile, pastille, traits de rappel, filigrane ;
     · jouerezo/moteur/voyage-diagramme.js : le diagramme (cloche, BP/HP,
       cycle de référence, trace, molécule).
   La coupe reprend le principe de la scène « le compresseur » du Voyage
   (voyage-scenes-a.js) dans un cadre resserré : là-bas, les légendes font
   32 unités sur 1 600, soit 13 px dans un écran de module ; ici 25 sur 640.
   POSE (index.html) : <figure id="scene-accueil"> (la coupe seule) et
   <figure id="scene-lecon"> (coupe + diagramme + boutons).
   RÈGLES TENUES : texte jamais sur un tracé ; légendes ≥ 25 unités dans la
   coupe, 22 dans le diagramme (≥ 18,7 px à 1 280 px) ; filigrane R9 derrière
   le dessin ; l'animation ne lit jamais prefers-reduced-motion.
   DIAGRAMME : schéma sans chiffres. Forme du R-134a et cycle repris des
   calculs de l'édition « vis » (jouerezo/donnees/voyage-vis-diagramme.js) :
   évaporation −10 °C, condensation +40 °C ; compression d'un compresseur à
   piston, rendement 0,65 (le trait « sans huile » de cette édition).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  if (!D || !D.diagramme) { ["scene-accueil", "scene-lecon"].forEach(i => { const f = document.getElementById(i); if (f) f.hidden = true; }); return; } // moteurs du Voyage absents : pas de cadre vide
  const TOUR = 2 * Math.PI, PI = Math.PI;

  const ETAPES = [
    { nom: "Aspiration", duree: 3.4, dire: "le piston descend : la vapeur froide (BP) entre." },
    { nom: "Compression", duree: 3.8, dire: "clapets fermés, le piston serre la vapeur : elle chauffe." },
    { nom: "Refoulement", duree: 2.6, dire: "le clapet s’ouvre : la vapeur très chaude sort (HP)." }
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
  const PLAQUE = 138, Y_TUBE = 90, CX = 320, CY = 255, RV = 30, LB = 64, PIN = 15;
  const LUM_A = 263, LUM_R = 377, KM = 0.7; // lumières (passages) de la plaque ; échelle des petites molécules
  const yPiston = th => CY - RV * Math.cos(th) - Math.sqrt(LB * LB - Math.pow(RV * Math.sin(th), 2)) - PIN; // dessus du piston
  const Y_PMB = yPiston(PI), Y_OUV = yPiston(1.75 * PI);
  /* avancement de la compression 0 → 1 : la pression monte vite à la fin (elle suit le rapport des volumes) */
  const serrage = th => D.borne(Math.log((Y_PMB - PLAQUE) / Math.max(1, yPiston(th) - PLAQUE)) / Math.log((Y_PMB - PLAQUE) / (Y_OUV - PLAQUE)), 0, 1);
  const POLICE = { "font-family": "Calibri, Arial, sans-serif" };
  const etiquette = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 25, fill: "#10233c", "font-weight": 600 }, POLICE, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Édu"; }); // cartouche du produit (charte R9)

  /* u : le temps en étapes (3 par tour : aspiration, compression, refoulement) → angle du vilebrequin */
  function angle(u) {
    const n = Math.floor(u / 3), r = u - 3 * n;
    return TOUR * n + (r < 1 ? PI * r : r < 2 ? PI * (1 + 0.75 * (r - 1)) : PI * (1.75 + 0.25 * (r - 2)));
  }

  /* position d'une petite molécule d'un lot de phase locale L : [x, y, température, opacité] */
  function place(m, L, yp, g) {
    const cx = 248 + m.u * 144, cy = PLAQUE + 13 + m.v * Math.max(1, yp - PLAQUE - 26);
    if (L < 0) { const q = 1 + L / TOUR; return [D.lerp(10 + m.w * 196, 256, q * q), Y_TUBE + (m.v - 0.5) * 14, 0.1, D.borne(q / 0.12, 0, 1)]; }
    if (L < PI) {
      const k = D.lisse((L / PI - m.e * 0.5) / 0.4);
      return k < 0.5 ? [D.lerp(256, LUM_A, k * 2), D.lerp(Y_TUBE, PLAQUE + 6, k * 2), 0.1, 1] : [D.lerp(LUM_A, cx, k * 2 - 1), D.lerp(PLAQUE + 6, cy, k * 2 - 1), 0.1, 1];
    }
    if (L < 1.75 * PI) return [cx, cy, 0.1 + 0.82 * g, 1];
    if (L < TOUR) {
      const k = D.lisse(((L - 1.75 * PI) / (0.25 * PI) - m.w * 0.4) / 0.6);
      return k < 0.5 ? [D.lerp(cx, LUM_R, k * 2), D.lerp(cy, PLAQUE - 8, k * 2), 0.92, 1] : [D.lerp(LUM_R, 446 + m.u * 30, k * 2 - 1), D.lerp(PLAQUE - 8, Y_TUBE + (m.v - 0.5) * 10, k * 2 - 1), 0.92, 1];
    }
    const q = (L - TOUR) / TOUR, x = 446 + m.u * 30 + q * (190 + m.w * 90);
    return [x, Y_TUBE + (m.v - 0.5) * 10, 0.92, L < 2 * TOUR ? D.borne((640 - x) / 30, 0, 1) : 0];
  }

  function coupe(svg) {
    svg.setAttribute("viewBox", "0 0 640 310");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[548, 238], [96, 284]], 220)); // deux exemplaires visibles (le cylindre opaque cacherait celui du centre) ; le troisième au centre du diagramme
    // tubes : aspiration (intérieur bleuté), refoulement (intérieur orangé)
    D.tube(g, 0, 66, 218, 48, "cuivre", false, "#eef4fa");
    D.tube(g, 422, 66, 218, 48, "cuivre", false, "#fbefe6");
    // culasse : deux chambres séparées, plaque à clapets percée de deux lumières
    D.el("rect", { x: 206, y: 60, width: 228, height: 90, rx: 10, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: 216, y: 68, width: 98, height: 58, fill: "#eef4fa" }, g);
    D.el("rect", { x: 326, y: 68, width: 98, height: 58, fill: "#fbefe6" }, g);
    D.el("rect", { x: 204, y: 76, width: 14, height: 28, fill: "#eef4fa" }, g);
    D.el("rect", { x: 422, y: 76, width: 14, height: 28, fill: "#fbefe6" }, g);
    D.el("rect", { x: 206, y: 126, width: 228, height: 12, fill: "#6b7785" }, g);
    D.el("rect", { x: LUM_A - 23, y: 126, width: 46, height: 12, fill: "#eef4fa" }, g);
    D.el("rect", { x: LUM_R - 23, y: 126, width: 46, height: 12, fill: "#fbefe6" }, g);
    // carter (en bas), cylindre
    D.el("rect", { x: 196, y: 232, width: 248, height: 76, rx: 14, fill: "url(#vm-marine)" }, g);
    D.el("rect", { x: 206, y: 232, width: 228, height: 66, fill: "#eef2f7" }, g);
    D.el("rect", { x: 220, y: 138, width: 200, height: 102, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 234, y: 138, width: 172, height: 102, fill: "#f3f6fa" }, g);
    D.el("rect", { x: 234, y: 232, width: 172, height: 8, fill: "#eef2f7" }, g);
    const gaz = D.el("rect", { x: 234, y: PLAQUE, width: 172, height: 10, opacity: 0.22 }, g); // la vapeur du cylindre prend la couleur de sa température
    // vilebrequin, bielle
    const bras = D.el("line", { stroke: "#4e5a66", "stroke-width": 14, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: CX, cy: CY, r: 13, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const bielleF = D.el("line", { stroke: "#4e5a66", "stroke-width": 16, "stroke-linecap": "round" }, g);
    const bielleC = D.el("line", { stroke: "#c3ccd6", "stroke-width": 8, "stroke-linecap": "round" }, g);
    const maneton = D.el("circle", { r: 7, fill: "#24384f" }, g);
    // l'huile du carter : une nappe (le liquide se voit liquide), le maneton y plonge
    const huile = D.liquide(g, { x0: 206, x1: 434, yh: 232, yb: 298, niveau: () => 0.3, couleur: () => "#c99a2e", opacite: 0.78, pas: 12 });
    // piston
    const piston = D.el("g", {}, g);
    const jupe = D.el("rect", { x: 235, y: 0, width: 170, height: 28, rx: 5, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [9, 18].forEach(y => D.el("line", { x1: 235, y1: y, x2: 405, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("circle", { cx: CX, cy: PIN, r: 7, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 2 }, piston);
    // molécules (trois lots qui se relaient), clapets, héroïne
    const mols = D.el("g", { transform: "scale(" + KM + ")" }, g);
    const r = D.alea(29), LOTS = [0, 1, 2].map(() => {
      const l = [];
      for (let j = 0; j < 12; j++) l.push({ u: 0.05 + r() * 0.9, v: 0.08 + r() * 0.84, e: r() * 0.6, w: r(), maj: D.mol(mols) });
      return l;
    });
    const clapA = D.el("rect", { x: 236, y: 138, width: 56, height: 6, rx: 3 }, g);
    const clapR = D.el("rect", { x: 350, y: 120, width: 56, height: 6, rx: 3 }, g);
    const MOI = { u: 0.5, v: 0.42, e: 0.15, w: 0.5 };
    const mila = D.heroine(g, { r: 30 });
    // légendes : jamais sur un tracé ; traits de rappel en pointillé
    etiquette(g, 10, 24, "aspiration", { "font-weight": 700, fill: D.BLEU });
    etiquette(g, 10, 52, "vapeur froide (BP)");
    etiquette(g, 630, 24, "refoulement", { "font-weight": 700, fill: D.ORANGE, "text-anchor": "end" });
    etiquette(g, 630, 52, "vapeur chaude (HP)", { "text-anchor": "end" });
    D.pastille(g, 320, 32, "au ralenti", "#637285", 24, "middle");
    etiquette(g, 10, 172, "clapet"); etiquette(g, 10, 200, "d’aspiration"); D.trait(g, 160, 186, 246, 146);
    etiquette(g, 456, 172, "clapet de"); etiquette(g, 456, 200, "refoulement"); D.trait(g, 452, 164, 400, 130);
    etiquette(g, 10, 264, "piston"); const ligneP = D.trait(g, 92, 256, 232, 200);
    etiquette(g, 456, 270, "huile"); etiquette(g, 456, 298, "du carter"); D.trait(g, 452, 274, 422, 288);

    return function (u, t) {
      const phi = angle(u), n = Math.floor(phi / TOUR), f = phi - n * TOUR, etape = Math.floor(u - 3 * Math.floor(u / 3));
      const yp = yPiston(phi), g8 = f >= PI && f < 1.75 * PI ? serrage(phi) : f >= 1.75 * PI ? 1 : 0;
      const temp = f < PI ? 0.1 : f < 1.75 * PI ? 0.1 + 0.82 * g8 : 0.92;
      piston.setAttribute("transform", "translate(0 " + yp.toFixed(1) + ")");
      jupe.setAttribute("stroke", etape === 1 ? "#ff6b35" : "#5d6b7a"); jupe.setAttribute("stroke-width", etape === 1 ? 5 : 2);
      ligneP.setAttribute("y2", (yp + 24).toFixed(1));
      const mx = CX + RV * Math.sin(phi), my = CY - RV * Math.cos(phi);
      bras.setAttribute("x1", CX); bras.setAttribute("y1", CY); bras.setAttribute("x2", mx.toFixed(1)); bras.setAttribute("y2", my.toFixed(1));
      [bielleF, bielleC].forEach(b => { b.setAttribute("x1", mx.toFixed(1)); b.setAttribute("y1", my.toFixed(1)); b.setAttribute("x2", CX); b.setAttribute("y2", (yp + PIN).toFixed(1)); });
      maneton.setAttribute("cx", mx.toFixed(1)); maneton.setAttribute("cy", my.toFixed(1));
      huile.maj(t);
      gaz.setAttribute("height", Math.max(0, yp - PLAQUE).toFixed(1)); gaz.setAttribute("fill", D.couleur(temp, true));
      // clapets : l'aspiration s'ouvre quand le piston descend, le refoulement en fin de montée ; ouverts = allumés
      const ouvA = f < PI ? D.fenetre(f / PI, 0.06, 0.96, 0.08) : 0, ouvR = f >= 1.75 * PI ? D.fenetre((f - 1.75 * PI) / (0.25 * PI), 0.02, 0.98, 0.1) : 0;
      clapA.setAttribute("transform", "rotate(" + (24 * ouvA).toFixed(1) + " 236 138)"); clapA.setAttribute("fill", ouvA > 0.05 ? "#ff6b35" : "#24384f");
      clapR.setAttribute("transform", "rotate(" + (24 * ouvR).toFixed(1) + " 406 126)"); clapR.setAttribute("fill", ouvR > 0.05 ? "#ff6b35" : "#24384f");
      for (let m = n - 1; m <= n + 1; m++) {
        const L = phi - m * TOUR;
        LOTS[((m % 3) + 3) % 3].forEach(mo => { const [x, y, tp, op] = place(mo, L, yp, g8); mo.maj(x / KM, y / KM, tp, true, op); });
      }
      // l'héroïne : une molécule du lot qui passe dans le cylindre (elle apparaît à l'aspiration, s'efface au refoulement)
      const [hx, hy0] = place(MOI, f, yp, g8), hy = f >= PI && f < 1.75 * PI ? (PLAQUE + yp) / 2 : hy0;
      const ecrase = f >= PI && f < 1.75 * PI ? 0.7 * g8 : 0;
      const humeur = f < PI ? "sourire" : f < 1.75 * PI ? (temp > 0.6 ? "chaud" : "surprise") : "chaud";
      mila({ x: hx, y: hy, s: 0.5, t: t, temp: temp, etat: "vapeur", humeur: humeur, ecrase: ecrase, regard: [1, 0],
        op: Math.min(D.borne(f / (0.12 * PI), 0, 1), D.borne((TOUR - f) / (0.1 * PI), 0, 1)) });
      return { etape: etape, temp: temp, w: f < PI ? 2 : f < 1.75 * PI ? 2 + g8 : 3, trace: f >= PI, humeur: humeur };
    };
  }

  function diagramme(svg) {
    svg.setAttribute("viewBox", "0 0 460 310");
    window.VOYAGE_DIAGRAMME_ZONE = { x: 1, y: 1, l: 458, h: 308 }; // lue par voyage-diagramme.js à la construction
    const d = D.diagramme(svg, DONNEES), fil = D.filigrane(d.g, [[230, 165]], 200);
    marquer(fil);
    d.g.insertBefore(fil, d.g.children[1]); // derrière la courbe, devant le fond du panneau
    return function (e, t) { d.maj(e.trace ? 2 : null, e.w, {}, { t: t, temp: e.temp, etat: "vapeur", humeur: e.humeur }); };
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
    const majCoupe = coupe(svgNeuf(dessins, "scene-coupe", "Animation au ralenti : coupe d’un compresseur à piston. La vapeur froide entre par l’aspiration, le piston la comprime, elle sort très chaude au refoulement."));
    const majDiag = complet ? diagramme(svgNeuf(dessins, "scene-diagramme", "Le diagramme enthalpique : pendant la compression, le point de la vapeur monte de la basse pression à la haute pression, vers la droite.")) : null;
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
