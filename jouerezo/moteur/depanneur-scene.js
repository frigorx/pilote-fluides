/* =====================================================================
   depanneur-scene.js — la scène vivante du dépanneur
   ---------------------------------------------------------------------
   RÔLE : dessiner une chambre froide et son groupe extérieur, et les faire
   vivre selon la situation : fluide qui circule, ventilateurs qui tournent
   (ou pas), compresseur qui vibre, givre sur l'évaporateur, bulles au
   voyant, ailettes encrassées, afficheur de la chambre. Puis les gestes
   du dépanneur, animés : le manifold se branche (flexibles, aiguilles qui
   montent jusqu'à la pression), le thermomètre électronique se pince sur
   un tube (l'afficheur compte), la pince ampèremétrique se referme sur le
   câble, la main touche un tube (halo chaud ou froid).
   CE QUI EST RÉEMPLOYÉ : les vues isolées d'organes du Tome 3 (images),
   la logique d'aiguille du module « pose du manifold » (rotation CSS avec
   transition), le thermomètre électronique du modèle mano-thermo-distincts.
   L'échelle des petits cadrans du manifold est CELLE des grands cadrans à
   couronnes (BP −1 à 10 bar, HP −1 à 30 bar) : même angle, même lecture.
   API : window.JR_SCENE.monter(conteneur, cas, inst, { bp, hp }) → objet
   { manifold(cote), thermo(point, valeur), pince(pct), toucher(point) }.
   DÉPEND : rien (SVG + CSS de jouerezo.css, section « scène »).
   ===================================================================== */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const IMG = "../packs/fluides/res/tome-3-technologie-organes/images-organes/";
  const VB = { BP: [-1, 10], HP: [-1, 30] };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const temp = t => (t < 0 ? "−" + (-t) : "" + t);

  function angle(p, cote) { const [a, b] = VB[cote]; return -135 + 270 * (Math.min(b, Math.max(a, p)) - a) / (b - a); }

  function monter(conteneur, c, inst, pressions) {
    const givre = /bloc/.test(c.evap) ? "bloc" : /premier|seul départ|départ|quart|tiers/.test(c.evap) ? "partiel" : /givre/.test(c.evap) ? "fin" : "aucun";
    const ventEvap = !/dans le vide|arrêt/.test(c.evap) || /ventilateur en marche|souffle/.test(c.evap);
    const ventCond = !/IMMOBILE|immobile|arrêt/.test(c.cond);
    const encrasse = /bouch|poussi|encrass/.test(c.cond);
    const bulles = /bulle/.test(c.voyant);
    const aspGivree = /aspiration givrée|givrée jusqu/.test(c.toucher);
    const compresseurFaible = c.panne === "compresseur";

    conteneur.innerHTML =
      '<svg class="scene" viewBox="0 0 1000 620" role="img" aria-label="' + esc(inst.nom + ", " + inst.fluideNom + " : chambre froide à gauche avec son évaporateur, groupe de condensation à droite, ligne liquide et aspiration entre les deux.") + '">' +
      '<defs><pattern id="sc-hachure" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10 L10 0" stroke="#6b4a2a" stroke-width="3"/></pattern>' +
      '<clipPath id="sc-clip-voyant"><circle cx="486" cy="404" r="16"/></clipPath></defs>' +
      /* ---- la chambre froide ---- */
      '<rect x="30" y="70" width="430" height="500" rx="10" fill="#eef3f9" stroke="#1b3a63" stroke-width="6"/>' +
      '<text x="330" y="56" class="sc-titre">Chambre froide · consigne ' + esc(inst.consigne) + '</text>' +
      '<g class="sc-afficheur"><rect x="60" y="500" width="150" height="48" rx="8" fill="#1b3a63"/><rect x="68" y="508" width="134" height="32" rx="5" fill="#eaf2e6"/>' +
      '<text x="128" y="531" class="sc-lcd" id="sc-tchambre">' + esc(temp(c.tChambre !== undefined ? c.tChambre : 0)) + ' °C</text><text x="135" y="564" class="sc-lib">thermostat d\'ambiance</text></g>' +
      /* évaporateur : image, ventilateur, givre, air */
      '<image href="' + IMG + 'evaporateur-air.webp" x="90" y="100" width="310" height="180" preserveAspectRatio="xMidYMid meet"/>' +
      '<g class="sc-helice' + (ventEvap ? " tourne" : "") + '" style="transform-origin:245px 190px"><circle cx="245" cy="190" r="34" fill="none" stroke="#1b3a63" stroke-width="2" opacity=".7"/><path d="M245 190 L245 158 M245 190 L277 190 M245 190 L245 222 M245 190 L213 190" stroke="#1b3a63" stroke-width="7" stroke-linecap="round" opacity=".75"/></g>' +
      (givre === "aucun" ? "" : '<rect class="sc-givre" x="92" y="112" width="' + (givre === "partiel" ? 100 : 306) + '" height="156" rx="12" fill="#ffffff" opacity="' + (givre === "bloc" ? 0.92 : givre === "partiel" ? 0.8 : 0.35) + '"/>') +
      (givre === "bloc" ? '<text x="245" y="300" class="sc-alerte">bloc de givre</text>' : "") +
      (ventEvap && givre !== "bloc" ? '<g class="sc-air"><path d="M150 300 v70 M245 300 v70 M340 300 v70" stroke="#7fb3e6" stroke-width="4" stroke-dasharray="8 10" stroke-linecap="round"/></g>' : "") +
      '<text x="245" y="470" class="sc-lib">évaporateur</text>' +
      /* ---- le groupe extérieur ---- */
      '<rect x="520" y="300" width="450" height="270" rx="10" fill="#fff6ec" stroke="#1b3a63" stroke-width="4"/>' +
      '<text x="745" y="594" class="sc-lib">groupe de condensation, à l\'extérieur</text>' +
      '<image href="' + IMG + 'condenseur-air.webp" x="540" y="320" width="220" height="150" preserveAspectRatio="xMidYMid meet"/>' +
      (encrasse ? '<rect x="548" y="332" width="204" height="126" rx="8" fill="url(#sc-hachure)" opacity=".55"/><text x="650" y="490" class="sc-alerte">ailettes bouchées</text>' : "") +
      '<g class="sc-helice' + (ventCond ? " tourne" : "") + '" style="transform-origin:650px 395px"><circle cx="650" cy="395" r="30" fill="none" stroke="#1b3a63" stroke-width="2" opacity=".7"/><path d="M650 395 L650 367 M650 395 L678 395 M650 395 L650 423 M650 395 L622 395" stroke="#1b3a63" stroke-width="6" stroke-linecap="round" opacity=".75"/></g>' +
      (ventCond ? "" : '<text x="650" y="490" class="sc-alerte">hélice immobile</text>') +
      '<g class="sc-compresseur' + (compresseurFaible ? " faible" : " vibre") + '" style="transform-origin:860px 460px"><rect x="810" y="400" width="100" height="120" rx="14" fill="#1a1a1a"/><ellipse cx="860" cy="400" rx="50" ry="14" fill="#333"/><rect x="825" y="520" width="70" height="12" rx="3" fill="#444"/><rect x="890" y="430" width="22" height="26" rx="3" fill="#2d2d2d"/></g>' +
      '<text x="860" y="555" class="sc-lib">compresseur</text>' +
      '<path id="sc-cable" d="M912 443 H 950 V 560" stroke="#1b3a63" stroke-width="5" fill="none"/>' +
      /* ---- les tuyaux ---- */
      '<path class="sc-tuyau hp" d="M860 398 V 350 H 770" /><path class="sc-flux hp" d="M860 398 V 350 H 770"/>' +
      '<path class="sc-tuyau liq" d="M560 420 V 520 H 500 V 404 H 440 V 300 H 400"/><path class="sc-flux liq" d="M560 420 V 520 H 500 V 404 H 440 V 300 H 400"/>' +
      '<path class="sc-tuyau bp' + (aspGivree ? " givre" : "") + '" d="M400 240 H 470 V 470 H 810"/><path class="sc-flux bp" d="M400 240 H 470 V 470 H 810"/>' +
      /* filtre, voyant, détendeur sur la ligne liquide */
      '<image href="' + IMG + 'filtre-deshydrateur.webp" x="470" y="490" width="60" height="60" preserveAspectRatio="xMidYMid meet"/><text x="500" y="572" class="sc-lib">filtre</text>' +
      '<rect x="468" y="386" width="36" height="36" rx="6" fill="#c08347"/><circle cx="486" cy="404" r="16" fill="#eaf2e6" stroke="#855425" stroke-width="2"/>' +
      (bulles ? '<g clip-path="url(#sc-clip-voyant)" class="sc-bulles"><circle cx="478" cy="420" r="3" fill="#fff" stroke="#3d7fca"/><circle cx="490" cy="424" r="2.5" fill="#fff" stroke="#3d7fca"/><circle cx="484" cy="426" r="2" fill="#fff" stroke="#3d7fca"/></g>' : '<circle cx="486" cy="404" r="5" fill="#1e7e54"/>') +
      '<text x="486" y="446" class="sc-lib">voyant</text>' +
      '<image href="' + IMG + 'detendeur-thermostatique.webp" x="372" y="268" width="56" height="56" preserveAspectRatio="xMidYMid meet"/><text x="400" y="340" class="sc-lib">détendeur</text>' +
      /* ---- points de relevé ---- */
      '<g class="sc-points">' +
      point("bp", 760, 470, "prise BP", 0, 26) + point("hp", 600, 520, "prise HP", 0, 26) +
      point("tasp", 440, 240, "aspiration", 0, -14) + point("tliq", 500, 460, "ligne liquide", 40, 4) + point("tref", 860, 350, "refoulement", 0, -14) +
      point("pince", 950, 500, "câble", 32, 4) +
      '</g>' +
      /* ---- instruments (cachés tant qu'on ne les branche pas) ---- */
      manifold() + thermometre() + pinceAmp() +
      '<circle id="sc-halo" r="26" fill="none" stroke-width="6" opacity="0"/>' +
      '</svg>';

    const svg = conteneur.querySelector("svg");
    const api = {
      manifold: function (cote) {
        const g = svg.querySelector("#sc-manifold"); g.classList.add("visible");
        const h = svg.querySelector(cote === "BP" ? "#sc-flex-bp" : "#sc-flex-hp"); h.classList.add("branche");
        const aig = svg.querySelector(cote === "BP" ? "#sc-aig-bp" : "#sc-aig-hp");
        const p = cote === "BP" ? pressions.bp : pressions.hp;
        setTimeout(function () { aig.style.transform = "rotate(" + angle(p, cote) + "deg)"; }, 350);
        allumer(cote === "BP" ? "bp" : "hp");
      },
      thermo: function (pt, valeur) {
        const cible = { tasp: [440, 240], tliq: [500, 460], tref: [860, 350] }[pt];
        const g = svg.querySelector("#sc-thermo"); g.classList.add("visible");
        svg.querySelector("#sc-sonde-cordon").setAttribute("d", "M 220 32 C 300 32 " + (cible[0] - 60) + " " + (cible[1] - 40) + " " + cible[0] + " " + cible[1]);
        const clip = svg.querySelector("#sc-sonde-pince"); clip.setAttribute("transform", "translate(" + (cible[0] - 9) + " " + (cible[1] - 11) + ")");
        compter(svg.querySelector("#sc-lcd-thermo"), 20, valeur, 1200, v => temp(Math.round(v * 10) / 10 === Math.round(v) ? Math.round(v) : v.toFixed(1).replace(".", ",")) + " °C");
        allumer(pt);
      },
      pince: function (pct) {
        const g = svg.querySelector("#sc-pince"); g.classList.add("visible");
        compter(svg.querySelector("#sc-lcd-pince"), 0, pct, 900, v => Math.round(v) + " % In");
        allumer("pince");
      },
      toucher: function (pt) {
        const pos = { tasp: [440, 240], tliq: [500, 460], tref: [860, 350], bp: [760, 470], hp: [600, 520] }[pt] || [440, 240];
        const halo = svg.querySelector("#sc-halo");
        halo.setAttribute("cx", pos[0]); halo.setAttribute("cy", pos[1]);
        halo.setAttribute("stroke", pt === "tref" || pt === "hp" ? "#c0392b" : pt === "tliq" ? "#c9451a" : "#3d7fca");
        halo.setAttribute("opacity", "0.9"); setTimeout(() => halo.setAttribute("opacity", "0"), 1800);
      }
    };
    function allumer(pt) { svg.querySelectorAll(".sc-pt").forEach(e => e.classList.toggle("actif", e.dataset.pt === pt)); }
    svg.querySelectorAll(".sc-pt").forEach(e => e.addEventListener("click", () => conteneur.dispatchEvent(new CustomEvent("releve", { detail: e.dataset.pt }))));
    return api;
  }

  function point(id, x, y, lib, dx, dy) {
    return '<g class="sc-pt" data-pt="' + id + '" role="button" tabindex="0" aria-label="' + esc(lib) + '"><circle cx="' + x + '" cy="' + y + '" r="11"/><text x="' + (x + dx) + '" y="' + (y + dy) + '" class="sc-pt-lib">' + esc(lib) + '</text></g>';
  }
  function gauge(x, y, cote, idAig) {
    const coul = cote === "BP" ? "#1f6fa8" : "#b3261e";
    let ticks = "";
    for (let i = 0; i <= 8; i++) { const a = (-135 + i * 33.75) * Math.PI / 180; ticks += '<line x1="' + (x + 32 * Math.sin(a)).toFixed(1) + '" y1="' + (y - 32 * Math.cos(a)).toFixed(1) + '" x2="' + (x + 38 * Math.sin(a)).toFixed(1) + '" y2="' + (y - 38 * Math.cos(a)).toFixed(1) + '" stroke="#22303f" stroke-width="2"/>'; }
    return '<circle cx="' + x + '" cy="' + y + '" r="46" fill="' + coul + '"/><circle cx="' + x + '" cy="' + y + '" r="40" fill="#fdfdfb" stroke="#22303f"/>' + ticks +
      '<text x="' + x + '" y="' + (y + 22) + '" class="sc-gauge-mot" fill="' + coul + '">' + cote + '</text>' +
      '<line id="' + idAig + '" class="sc-aiguille" x1="' + x + '" y1="' + (y + 8) + '" x2="' + x + '" y2="' + (y - 34) + '" style="transform-origin:' + x + 'px ' + y + 'px; transform: rotate(-135deg)"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5" fill="#333"/>';
  }
  function manifold() {
    return '<g id="sc-manifold" class="sc-instrument"><rect x="560" y="40" width="300" height="150" rx="18" fill="#1b3a63"/><rect x="574" y="54" width="272" height="100" rx="12" fill="#f7f1e7"/>' +
      gauge(640, 104, "BP", "sc-aig-bp") + gauge(780, 104, "HP", "sc-aig-hp") +
      '<text x="710" y="178" class="sc-lcd" font-size="14" fill="#fff">MANIFOLD</text>' +
      '<rect x="620" y="186" width="22" height="18" rx="4" fill="#1f6fa8"/><rect x="760" y="186" width="22" height="18" rx="4" fill="#b3261e"/>' +
      '<path id="sc-flex-bp" class="sc-flex bp" d="M631 204 C 631 300 700 380 760 460"/>' +
      '<path id="sc-flex-hp" class="sc-flex hp" d="M771 204 C 771 300 640 420 600 510"/></g>';
  }
  function thermometre() {
    return '<g id="sc-thermo" class="sc-instrument"><rect x="30" y="0" width="190" height="64" rx="12" fill="#1b3a63"/><rect x="42" y="10" width="166" height="36" rx="6" fill="#eaf2e6" stroke="#0f2440" stroke-width="2"/>' +
      '<text id="sc-lcd-thermo" x="125" y="28" class="sc-lcd" font-size="24">20 °C</text>' +
      '<circle cx="90" cy="55" r="4" fill="#84b7ec"/><circle cx="125" cy="55" r="4" fill="#d17d43"/><circle cx="160" cy="55" r="4" fill="#fffdf8"/>' +
      '<path id="sc-sonde-cordon" d="M 220 32 L 220 32" stroke="#0f2440" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<g id="sc-sonde-pince" transform="translate(220 32)"><rect width="18" height="22" rx="4" fill="#1b3a63"/><circle cx="9" cy="8" r="3" fill="#84b7ec"/></g></g>';
  }
  function pinceAmp() {
    return '<g id="sc-pince" class="sc-instrument"><path d="M 935 500 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0" fill="none" stroke="#d1a000" stroke-width="7"/>' +
      '<rect x="905" y="518" width="60" height="70" rx="8" fill="#1b3a63"/><rect x="912" y="526" width="46" height="26" rx="4" fill="#eaf2e6"/>' +
      '<text id="sc-lcd-pince" x="935" y="544" class="sc-lcd" font-size="13">0 % In</text></g>';
  }
  function compter(noeud, de, a, duree, fmt) {
    const t0 = performance.now();
    (function pas(now) { const r = Math.min(1, (now - t0) / duree); const v = de + (a - de) * r; noeud.textContent = fmt(v); if (r < 1) requestAnimationFrame(pas); })(t0);
    /* onglet caché : le rAF ne tourne pas → valeur finale posée aussi par minuterie */
    setTimeout(() => { noeud.textContent = fmt(a); }, duree + 50);
  }

  window.JR_SCENE = { monter: monter };
})();
