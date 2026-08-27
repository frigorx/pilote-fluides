/* Le moteur d'une station ouverte seule.
   Contrat d'HydroMétro : « une station doit fonctionner seule, hors du réseau ».

   Ce fichier ne réécrit pas le rendu d'une station — il serait condamné à diverger de
   celui du réseau. Il monte le même squelette, fabrique un réseau réduit à cette seule
   station, puis laisse le moteur du réseau faire son travail. Une correction faite dans
   app.js profite donc aussi aux pages autonomes. */
(function () {
  "use strict";

  const brique = (window.AEROREZO_STATIONS || [])[0];
  const socle = document.getElementById("socle");
  if (!brique || !socle) return;

  /* Les intitulés de ligne, repris du réseau. Une station seule n'a pas besoin des six,
     mais elle doit afficher le bon rattachement au référentiel. */
  const LIGNES = {
    A: {name: "Air & hygrométrie", color: "#3D7FCA", competence: "Socle commun · appui CP8, CP9 et CP10"},
    V: {name: "VMC", color: "#1E7E54", competence: "CP4 · Réaliser l’étude d’une installation de VMC"},
    D: {name: "Distribution", color: "#B06A00", competence: "CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire"},
    C: {name: "Climatisation & apports", color: "#C9451A", competence: "CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation"},
    T: {name: "CTA", color: "#6B5FB5", competence: "CP10 · Réaliser l’étude d’une centrale de traitement d’air"},
    M: {name: "Mesure & diagnostic", color: "#176B73", competence: "Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10"}
  };

  const ligne = LIGNES[brique.line];

  /* Le réseau réduit : une ligne, une station. Le moteur du réseau s'en contente. */
  window.AEROREZO = {
    levels: {cap: "CAP · découvrir et agir", bac: "Bac Pro · mesurer et régler", bts: "BTS · calculer et justifier"},
    lines: {[brique.line]: ligne},
    stations: [brique],
    network: {
      routes: {[brique.line]: [brique.id]},
      positions: {[brique.id]: [590, 320]},
      labels: {[brique.id]: brique.title}
    }
  };

  const ech = v => String(v).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));

  socle.outerHTML = `
  <header class="topbar">
    <a class="brand" href="../../index.html" aria-label="Retour au réseau AéroRézo">
      <svg class="logo" viewBox="0 0 310 66" role="img" aria-label="inerWeb AéroRézo">
        <text fill="#1b3a63" font-size="36" x="10" y="50">❄️</text>
        <text fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif" font-size="32" font-weight="bold" x="55" y="48">iner</text>
        <text fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive" font-size="32" x="115" y="48">Web</text>
        <line stroke="#e8914a" stroke-width="3" x1="55" x2="185" y1="52" y2="52"/>
        <rect fill="#e8914a" x="190" y="8" rx="6" ry="6" width="112" height="30"/>
        <text fill="#ffffff" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="16" font-weight="bold" x="246" y="29" text-anchor="middle">AéroRézo</text>
      </svg>
    </a>
    <div class="title-block"><span>Station ouverte seule · ${ech(ligne.name)}</span></div>
    <!-- Une station servie seule en TP doit avoir les mêmes réglages de voix que le
         réseau : c'est la même page pour l'élève, il ne sait pas par où il est entré. -->
    <label class="voice-rate" for="voiceRate">Vitesse
      <input type="range" id="voiceRate" min="0.6" max="1.4" step="0.05" value="0.95">
      <output id="voiceRateOut" for="voiceRate">0,95×</output>
    </label>
    <select id="voicePick" class="voice-pick" aria-label="Voix de lecture" hidden></select>
    <button id="voiceButton" class="small-button" type="button" aria-pressed="false">▶ Écouter</button>
  </header>

  <main id="app">
    <!-- La vue réseau existe mais reste masquée : le moteur du réseau s'attend à la trouver.
         « Quitter » y ramènerait, on l'utilise donc pour revenir au plan complet. -->
    <section id="networkView" class="network-view" hidden aria-labelledby="networkTitle">
      <div class="intro"><div><p id="networkStats" class="eyebrow"></p><h1 id="networkTitle">${ech(brique.title)}</h1></div><p></p></div>
      <div class="toolbar"><div class="level-switch" role="group" aria-label="Niveau de profondeur">
        <button type="button" data-level="cap">CAP · N3</button>
        <button type="button" data-level="bac" class="active" aria-pressed="true">Bac Pro · N4</button>
        <button type="button" data-level="bts">BTS · N5</button>
      </div><button id="startButton" class="primary" type="button">Commencer</button></div>
      <div class="map-shell"><svg id="networkMap" viewBox="0 0 1180 640" role="img" aria-label="Plan réduit à cette station"></svg></div>
      <div id="lineLegend" class="line-legend"></div>
      <p class="status-note"><b>Brouillon technique local.</b> <span class="signature">© inerWeb 2026</span></p>
    </section>

    <section id="stationView" class="station-view" hidden aria-live="polite">
      <aside class="station-rail" aria-label="Progression">
        <button id="backNetwork" class="small-button" type="button">← Réseau</button>
        <div id="stationProgress" class="station-progress"></div>
      </aside>
      <article class="lesson-card">
        <header class="lesson-head">
          <div><p id="stationKicker" class="eyebrow"></p><h2 id="stationTitle"></h2><p id="stationCompetence" class="competence"></p><div id="interchangeSwitch" class="interchange-switch"></div></div>
          <div class="lesson-actions"><button id="stationVoice" class="small-button" type="button">▶ Écouter</button><button id="exitStation" class="small-button" type="button">Quitter</button></div>
        </header>
        <nav id="phaseProgress" class="phase-progress" aria-label="Étapes de la station"></nav>
        <div class="lesson-grid">
          <div class="lesson-copy">
            <p id="stationText"></p>
            <div id="methodBox" class="method-box"><strong>La méthode</strong><span id="stationMethod"></span></div>
            <p id="stationFormula" class="formula"></p>
            <p id="stationLecture" class="lecture"></p>
            <p id="stationLimites" class="limites"></p>
          </div>
          <div id="activity" class="activity" aria-label="Manipulation interactive"></div>
        </div>
        <footer class="lesson-nav">
          <button id="previousButton" type="button">← Étape précédente</button>
          <span id="stepStatus"></span>
          <button id="nextButton" class="primary" type="button">Étape suivante →</button>
        </footer>
      </article>
    </section>
  </main>`;

  /* Le moteur du réseau ouvre la station indiquée par le fragment d'URL. On le pose
     avant de le charger, pour que la page s'ouvre directement sur la station. */
  if (!location.hash) history.replaceState(null, "", `#${brique.id}@${brique.line}@0`);

  const charger = src => new Promise(suite => {
    const balise = document.createElement("script");
    balise.src = src;
    balise.onload = suite;
    document.body.appendChild(balise);
  });

  charger("../../carte.js").then(() => charger("../../app.js")).then(() => {
    /* Le moteur du réseau leur donne un comportement de navigation interne ; ici il n y a
       pas de réseau à rejoindre, ils ramènent au plan complet. */
    for (const id of ["backNetwork", "exitStation"]) {
      const bouton = document.getElementById(id);
      if (bouton) bouton.onclick = () => { location.href = "../../index.html"; };
    }
  });
})();
