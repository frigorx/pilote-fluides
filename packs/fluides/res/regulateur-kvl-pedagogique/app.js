(function initialiseKvlCourse() {
  "use strict";

  const ui = {
    stepper: document.getElementById("stepper"),
    kicker: document.getElementById("lesson-kicker"),
    title: document.getElementById("lesson-title"),
    intro: document.getElementById("lesson-intro"),
    detail: document.getElementById("lesson-detail"),
    takeaway: document.getElementById("lesson-takeaway"),
    visualTitle: document.getElementById("visual-title"),
    visualHint: document.getElementById("visual-hint"),
    controls: document.getElementById("visual-controls"),
    root: document.getElementById("visual-root"),
    caption: document.getElementById("visual-caption"),
    previous: document.getElementById("previous-button"),
    next: document.getElementById("next-button"),
    progressLabel: document.getElementById("progress-label"),
    progressBar: document.getElementById("progress-bar"),
    voice: document.getElementById("voice-button"),
    rate: document.getElementById("voice-rate"),
    appStatus: document.getElementById("app-status"),
    sources: document.getElementById("sources-dialog"),
    sourceButton: document.getElementById("source-button")
  };

  const RATE_KEY = "inerweb-kvl-rate";
  const VOICE_RATES = [0.8, 0.95, 1.1, 1.25];
  let current = 0;
  let furthest = 0;
  let speechRun = 0;
  let speaking = false;
  let paused = false;
  let preferredVoice = null;
  let quiz = { index: 0, score: 0, answered: false, complete: false };

  function safeStoredRate() {
    try {
      const value = Number(localStorage.getItem(RATE_KEY));
      return VOICE_RATES.includes(value) ? value : 0.95;
    } catch (_) {
      return 0.95;
    }
  }

  function saveRate(value) {
    try { localStorage.setItem(RATE_KEY, String(value)); } catch (_) { /* stockage facultatif */ }
  }

  function defs(id) {
    return `<defs>
      <pattern id="hatch-${id}" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="11" height="11" fill="#ead4a5"/><line x1="0" y1="0" x2="0" y2="11" stroke="#9b6c35" stroke-width="3"/>
      </pattern>
      <marker id="arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3d7fca"/>
      </marker>
      <marker id="green-arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e7e54"/>
      </marker>
      <filter id="soft-${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#1b3a63" flood-opacity=".16"/></filter>
    </defs>`;
  }

  function readout(text, kind = "") {
    const extra = kind === "key" ? " readout-key" : kind === "warning" ? " readout-warning" : "";
    return `<div class="readout${extra}" id="visual-readout">${text}</div>`;
  }

  function button(label, data, value, active = false, extra = "") {
    return `<button type="button" class="action-button${active ? " active" : ""}${extra ? " " + extra : ""}" data-${data}="${value}" aria-pressed="${active}">${label}</button>`;
  }

  function exteriorSvg({ labelled = false } = {}) {
    return `<div class="diagram kvl-exterior" role="img" aria-label="Régulateur de pression de carter schématique avec entrée latérale, sortie basse et réglage supérieur">
      <svg viewBox="0 0 760 470" aria-hidden="true">
        ${defs("outside")}
        <ellipse cx="362" cy="423" rx="130" ry="22" fill="rgba(27,58,99,.10)"/>
        <g filter="url(#soft-outside)">
          <path class="kvl-copper" d="M319 73h112v126h77q42 0 42 42v42q0 42-42 42h-77v96H319v-96h-96q-42 0-42-42v-42q0-42 42-42h96z"/>
          <path class="kvl-band" d="M303 190h144v23H303zM303 318h144v23H303z"/>
          <path class="kvl-pipe-end" d="M181 236h-77v54h77M550 236h87v54h-87M333 421v31h84v-31"/>
          <path class="kvl-cap" d="M326 38h98v72h-98z"/>
          <rect x="316" y="99" width="118" height="22" rx="6" class="kvl-cap-ring"/>
          <path class="kvl-highlight" d="M336 82V49h28M340 155v-28h62"/>
        </g>
        <path class="kvl-flow mobile" d="M112 263H287q48 0 48 48v96" marker-end="url(#arrow-outside)"/>
        <text x="98" y="224" class="svg-label">ENTRÉE</text>
        <text x="332" y="462" class="svg-label">SORTIE vers compresseur</text>
        ${labelled ? `<g class="kvl-labels">
          <path d="M438 59h96" class="label-line"/><text x="545" y="65" class="svg-label">Réglage</text>
          <path d="M451 158h103" class="label-line"/><text x="565" y="164" class="svg-label">Corps</text>
          <path d="M514 305h77" class="label-line"/><text x="602" y="311" class="svg-label">Raccord latéral</text>
          <path d="M423 405h120" class="label-line"/><text x="553" y="411" class="svg-label">Raccord bas</text>
        </g>` : ""}
      </svg>
    </div>`;
  }

  function circuitSvg(focused = false) {
    return `<div class="diagram refrigeration-circuit" role="img" aria-label="Croix du frigoriste avec le régulateur KVL placé sur l'aspiration juste avant le compresseur">
      <svg viewBox="0 0 860 500" aria-hidden="true">
        ${defs("circuit")}
        <path class="circuit-pipe hp-line" d="M635 125H255V375"/>
        <path class="circuit-pipe bp-line" d="M255 375H635V125"/>
        <path class="circuit-flow hp-flow mobile" d="M595 125H295V335" marker-end="url(#arrow-circuit)"/>
        <path class="circuit-flow bp-flow mobile" d="M295 375H590V170" marker-end="url(#arrow-circuit)"/>
        <g class="organ organ-condenser"><rect x="365" y="84" width="160" height="82" rx="14"/><path d="M386 142l24-36 24 36 24-36 24 36"/><text x="445" y="68">CONDENSEUR</text></g>
        <g class="organ organ-evaporator"><rect x="345" y="334" width="190" height="82" rx="14"/><path d="M370 392l26-36 26 36 26-36 26 36"/><text x="440" y="445">ÉVAPORATEUR</text></g>
        <g class="organ organ-expansion"><path d="M221 232l68-42v84zM289 232l-68-42v84z"/><text x="134" y="238">DÉTENDEUR</text></g>
        <g class="organ organ-compressor"><circle cx="635" cy="125" r="58"/><path d="M608 143q24-72 57-30q12 17-14 45"/><text x="635" y="46">COMPRESSEUR</text></g>
        <g class="kvl-location${focused ? " is-focused" : ""}">
          <rect x="542" y="337" width="74" height="76" rx="12"/>
          <path d="M559 347h40v18h18v24h-18v18h-40v-18h-18v-24h18z"/>
          <text x="579" y="432">KVL</text>
        </g>
        <path class="location-bracket" d="M534 450h94"/>
        <text x="581" y="474" class="location-note">ASPIRATION · juste avant le compresseur</text>
        <g class="pressure-key"><rect x="688" y="224" width="136" height="91" rx="12"/><text x="756" y="250">PRESSION LIMITÉE</text><text x="756" y="276">côté sortie</text><text x="756" y="298">→ compresseur</text></g>
      </svg>
    </div>`;
  }

  function protectionScene(mode = "restart") {
    const states = {
      normal: { title: "Régime établi", inlet: "Pression d’évaporation habituelle", outlet: "KVL largement ouvert", kind: "key" },
      restart: { title: "Redémarrage après arrêt long", inlet: "Pression élevée dans l’évaporateur", outlet: "Le KVL limite l’aspiration", kind: "warning" },
      defrost: { title: "Après dégivrage", inlet: "Charge et pression peuvent être élevées", outlet: "Le moteur reste protégé de la surcharge", kind: "warning" }
    };
    const s = states[mode];
    return `<div class="kvl-chain" role="img" aria-label="Chaîne entre situation de démarrage, pression d'aspiration, action du KVL et protection du moteur">
      <div class="chain-card ${mode === "normal" ? "state-ok" : "state-alert"}"><span>1</span><strong>${s.title}</strong><small>${s.inlet}</small></div>
      <div class="chain-link" aria-hidden="true">→</div>
      <div class="chain-card state-limit"><span>2</span><strong>Régulateur KVL</strong><small>${s.outlet}</small></div>
      <div class="chain-link" aria-hidden="true">→</div>
      <div class="chain-card state-ok"><span>3</span><strong>Moteur du compresseur</strong><small>${mode === "normal" ? "fonctionnement stable" : "risque de surcharge réduit"}</small></div>
      ${readout(`<strong>${s.title} :</strong> ${s.outlet}.`, s.kind)}
    </div>`;
  }

  function flowDirectionScene(correct = true) {
    return `<div class="orientation-scene${correct ? "" : " is-wrong"}" role="img" aria-label="Sens du fluide à travers le régulateur, de l'évaporateur vers le compresseur">
      <svg viewBox="0 0 780 430" aria-hidden="true">
        ${defs("direction")}
        <path class="orientation-pipe" d="M80 240h225M380 315v90"/>
        <path class="kvl-body-simple" d="M295 90h100v105h72v90h-72v130h-100V285H188v-90h107z"/>
        <path class="kvl-cap-simple" d="M309 47h72v62h-72z"/>
        <path class="direction-flow mobile" d="${correct ? "M88 240h250v145" : "M338 387V240H88"}" marker-end="url(#arrow-direction)"/>
        <text x="90" y="207" class="orientation-label">depuis l’évaporateur</text>
        <text x="455" y="389" class="orientation-label">vers le compresseur</text>
        <g class="direction-status"><rect x="505" y="90" width="215" height="112" rx="15"/><text x="612" y="128">${correct ? "SENS À RESPECTER" : "MONTAGE À CORRIGER"}</text><text x="612" y="158">${correct ? "entrée → sortie" : "ne pas inverser"}</text><path d="${correct ? "M570 178l25 20 55-56" : "M574 147l78 62M652 147l-78 62"}"/></g>
      </svg>
      ${readout(correct ? "<strong>Sens correct :</strong> le fluide va de l’évaporateur vers le compresseur en suivant la flèche du corps." : "<strong>À corriger :</strong> une silhouette en T ne suffit pas ; la flèche et la notice du modèle posé font foi.", correct ? "key" : "warning")}
    </div>`;
  }

  const PART_LABELS = {
    cap: ["Capuchon", "Protège l’accès au réglage."],
    screw: ["Vis de réglage", "Modifie la compression du ressort principal."],
    spring: ["Ressort principal", "Définit la consigne mécanique avec la vis."],
    bellows: ["Soufflet d’égalisation", "Compense l’action de la pression d’entrée sur l’ouverture."],
    valve: ["Joint mobile", "Module le passage devant le siège."],
    seat: ["Siège", "Définit l’orifice régulé."],
    damper: ["Dispositif d’amortissement", "Réduit l’effet des pulsations sur la régulation."]
  };

  function cutawaySvg({ selected = "", opening = 0.55, showPressure = false } = {}) {
    const lift = 24 * opening;
    const active = (name) => selected === name ? " is-selected" : "";
    return `<div class="diagram kvl-cutaway" role="img" aria-label="Coupe pédagogique originale montrant le ressort, le soufflet, le joint mobile, le siège et le passage du fluide">
      <svg viewBox="0 0 820 520" aria-hidden="true">
        ${defs("cut")}
        <path class="cut-body" fill="url(#hatch-cut)" d="M315 35h190v185h110v160H505v115H315V380H115V220h200z"/>
        <path class="cut-cavity" d="M362 82h96v166h105v86H458v112h-96V334H165v-66h197z"/>
        <g class="part part-cap${active("cap")}"><path class="cut-cap" d="M335 32h150v65H335z"/></g>
        <g class="part part-screw${active("screw")}"><path class="cut-screw" d="M388 48h44v70h-44zM380 58h60M380 73h60M380 88h60"/></g>
        <g class="part part-spring${active("spring")}"><path class="cut-spring" d="M380 124l58 18-58 18 58 18-58 18 58 18-58 18"/></g>
        <g class="part part-bellows${active("bellows")}"><path class="cut-bellows" d="M349 240q20-20 40 0q20-20 40 0q20-20 40 0l-8 64H357z"/></g>
        <path class="cut-stem" d="M410 302v${66 - lift}"/>
        <g class="part part-valve${active("valve")}" transform="translate(0 ${-lift})"><path class="cut-valve" d="M374 360h72l-12 30h-48z"/></g>
        <g class="part part-seat${active("seat")}"><path class="cut-seat" d="M355 394h110"/></g>
        <g class="part part-damper${active("damper")}"><rect class="cut-damper" x="482" y="272" width="48" height="58" rx="10"/><path d="M494 285h24M494 297h24M494 309h24"/></g>
        <path class="cut-flow mobile" d="M145 301h220q45 0 45 45v98" marker-end="url(#arrow-cut)"/>
        <text x="145" y="248" class="svg-label">ENTRÉE</text><text x="476" y="472" class="svg-label">SORTIE</text>
        ${showPressure ? `<g class="pressure-callout pressure-in"><rect x="72" y="74" width="185" height="74" rx="12"/><text x="164" y="103">PRESSION D’ENTRÉE</text><text x="164" y="129">compensée par le soufflet</text></g><g class="pressure-callout pressure-out"><rect x="575" y="405" width="205" height="77" rx="12"/><text x="677" y="435">PRESSION DE SORTIE</text><text x="677" y="462">grandeur régulée</text></g><path class="pressure-sense" d="M562 404l65-63"/>` : ""}
        <g class="section-legend" transform="translate(590 42)"><rect class="section-legend-bg" width="190" height="78" rx="10"/><rect class="section-legend-matter" x="12" y="12" width="28" height="18"/><text x="50" y="27">matière</text><rect class="section-legend-cavity" x="12" y="44" width="28" height="18"/><text x="50" y="59">cavité</text></g>
        <text x="592" y="155" class="cutaway-note">Schéma de principe</text><text x="592" y="178" class="cutaway-note">pas une coupe constructeur</text>
      </svg>
    </div>`;
  }

  function pressureScene(target = "outlet") {
    const outlet = target === "outlet";
    return `<div class="pressure-scene">
      ${cutawaySvg({ showPressure: true, opening: .55 })}
      ${readout(outlet ? "<strong>Bonne grandeur :</strong> le KVL régule la pression de sortie, sur l’aspiration juste avant le compresseur." : "<strong>Ce n’est pas la consigne :</strong> la pression d’entrée peut varier ; le soufflet d’égalisation compense son effet sur l’ouverture.", outlet ? "key" : "warning")}
    </div>`;
  }

  function modulationScene(state = "low") {
    const values = {
      low: { opening: 1, word: "OUVERT", text: "La pression de sortie est sous la consigne : le KVL s’ouvre pour laisser passer le débit.", kind: "key" },
      band: { opening: .55, word: "MODULE", text: "Dans la bande proportionnelle, le passage change progressivement avec la pression de sortie.", kind: "" },
      high: { opening: .05, word: "LIMITE", text: "À pression de sortie élevée, le KVL réduit le passage afin de limiter l’aspiration du compresseur.", kind: "warning" }
    };
    const s = values[state];
    return `<div class="modulation-scene"><span class="state-pill ${state === "low" ? "state-open-label" : state === "high" ? "state-limit-label" : "state-band-label"}">${s.word}</span>${cutawaySvg({ opening: s.opening })}${readout(s.text, s.kind)}</div>`;
  }

  function equalizationScene(mode = "balanced") {
    const changed = mode === "entry-change";
    return `<div class="equalization-lab" role="img" aria-label="Comparaison de l'effet de la pression d'entrée et de la pression de sortie sur le KVL">
      <div class="balance-card ${changed ? "is-active" : ""}"><span class="balance-code">P entrée</span><strong>${changed ? "varie" : "reste stable"}</strong><p>Le soufflet d’égalisation compense son action sur la surface du siège.</p></div>
      <div class="balance-center" aria-hidden="true"><div class="bellows-icon">≋</div><strong>soufflet</strong><small>surfaces équilibrées</small></div>
      <div class="balance-card ${changed ? "" : "is-active"}"><span class="balance-code">P sortie</span><strong>${changed ? "consigne inchangée" : "pilote l’ouverture"}</strong><p>C’est la pression située après la vanne, côté compresseur, qui commande la régulation.</p></div>
      <div class="damper-note"><span aria-hidden="true">〰</span><p><strong>Amortissement :</strong> un dispositif séparé limite l’effet des pulsations et aide à conserver une régulation précise.</p></div>
      ${readout(changed ? "La pression d’entrée change, mais le soufflet d’égalisation évite qu’elle commande directement l’ouverture." : "La pression de sortie reste la grandeur régulée ; l’amortissement traite les pulsations.", "key")}
    </div>`;
  }

  function bandScene(pressure = 3.2) {
    const setpoint = 4;
    const fullOpen = 2.5;
    let state = "Bande proportionnelle";
    let kind = "";
    let markerX = 175 + ((pressure - 2) / 3) * 455;
    if (pressure <= fullOpen) { state = "Entièrement ouvert"; kind = "key"; }
    if (pressure >= setpoint) { state = "Début de fermeture / limitation"; kind = "warning"; }
    return `<div class="band-lab">
      <label class="band-control" for="outlet-pressure"><span>Pression de sortie étudiée</span><output id="pressure-output">${pressure.toFixed(1).replace(".", ",")}&nbsp;bar</output><input id="outlet-pressure" type="range" min="2" max="5" step="0.1" value="${pressure}" aria-label="Pression de sortie en bar"></label>
      <svg viewBox="0 0 780 310" role="img" aria-label="Courbe pédagogique de capacité selon la pression de sortie avec point de consigne à 4 bar et bande P de 1,5 bar">
        ${defs("band")}
        <path class="chart-axis" d="M110 44v210h570"/><text x="25" y="55" class="chart-label">Capacité</text><text x="578" y="294" class="chart-label">Pression sortie</text>
        <path class="band-zone" d="M185 70h230v168H185z"/><text x="300" y="95" class="band-zone-label">BANDE P : 1,5 bar</text>
        <path class="capacity-curve" d="M115 70h70c120 0 210 30 230 168h252"/>
        <path class="setpoint-line" d="M415 48v205"/><text x="415" y="272" class="chart-value">4,0</text><text x="415" y="35" class="chart-small">point de consigne</text>
        <path class="full-line" d="M185 48v205"/><text x="185" y="272" class="chart-value">2,5</text><text x="185" y="35" class="chart-small">ouverture complète</text>
        <g class="chart-marker" transform="translate(${markerX} 0)"><path d="M0 48v205"/><circle cx="0" cy="${pressure <= 2.5 ? 70 : pressure >= 4 ? 238 : 70 + ((pressure - 2.5) / 1.5) * 168}" r="10"/></g>
        <text x="110" y="274" class="chart-value">2,0</text><text x="645" y="274" class="chart-value">5,0 bar</text>
      </svg>
      ${readout(`<strong>${state}.</strong> La bande P relie le début d’ouverture à l’ouverture complète ; ce graphique est une lecture pédagogique du cas KVL 28 documenté.`, kind)}
    </div>`;
  }

  function adjustmentScene(checked = new Set()) {
    const items = [
      ["identify", "1", "Identifier", "numéro de code et modèle"],
      ["measure", "2", "Mesurer", "pression côté compresseur"],
      ["adjust", "3", "Ajuster", "par petites corrections selon notice"],
      ["verify", "4", "Vérifier", "après stabilisation et au redémarrage"]
    ];
    return `<div class="adjustment-lab">
      <div class="adjustment-visual" role="img" aria-label="Manomètre sur la sortie du KVL et vis de réglage protégée par un capuchon">
        <svg viewBox="0 0 520 300" aria-hidden="true">${defs("adjust")}<path class="adjust-pipe" d="M54 212h268v62"/><path class="adjust-body" d="M210 85h105v93h72v75h-72v40H210v-40H118v-75h92z"/><path class="adjust-cap" d="M225 40h75v70h-75z"/><path class="adjust-screw" d="M253 48h20v90"/><path class="adjust-turn" d="M207 34q55-42 111 0" marker-end="url(#arrow-adjust)"/><g class="gauge"><circle cx="434" cy="90" r="58"/><path d="M434 90l30-28"/><text x="434" y="118">P sortie</text></g><path class="gauge-hose" d="M417 144q-25 75-92 86"/></svg>
      </div>
      <div class="adjustment-steps">${items.map(([key, number, title, note]) => `<button type="button" class="method-card${checked.has(key) ? " checked" : ""}" data-method="${key}" aria-pressed="${checked.has(key)}"><span>${checked.has(key) ? "✓" : number}</span><strong>${title}</strong><small>${note}</small></button>`).join("")}</div>
      ${readout(checked.size === items.length ? "<strong>Méthode complète :</strong> identifier, mesurer, ajuster selon la notice, puis vérifier le résultat réel." : `<strong>${checked.size}/4 contrôles.</strong> Le réglage ne commence jamais par une rotation à l’aveugle.`, checked.size === items.length ? "key" : "")}
    </div>`;
  }

  function selectionScene(view = "reference", selected = new Set()) {
    if (view === "reference") {
      return `<div class="product-card-lab">
        <div class="product-silhouette">${exteriorSvg({ labelled: false })}</div>
        <div class="product-data"><p class="product-kicker">CAS DOCUMENTAIRE FOURNI</p><h3>KVL 28 · 034L0046</h3><dl><div><dt>Raccord</dt><dd>ODF à braser · 1&nbsp;1/8&nbsp;po</dd></div><div><dt>Encombrement</dt><dd>H1 259&nbsp;mm · B1 105&nbsp;mm</dd></div><div><dt>Bande P maximale</dt><dd>1,5&nbsp;bar</dd></div><div><dt>Pression de service PS</dt><dd>18&nbsp;bar</dd></div></dl><p>Ces données identifient ce produit. Elles ne suffisent pas, seules, à le sélectionner pour une installation.</p></div>
        ${readout("<strong>034L0046 = KVL 28.</strong> La référence fournie sert de cas documenté ; le choix réel dépend aussi du régime de fonctionnement.")}
      </div>`;
    }
    const criteria = [
      ["fluid", "Fluide", "compatibilité du code produit"],
      ["capacity", "Puissance", "capacité de l’évaporateur"],
      ["liquid", "T° liquide", "avant le détendeur"],
      ["suction", "T° aspiration", "avant le compresseur"],
      ["pressure", "P aspiration max.", "en aval du KVL"],
      ["connection", "Raccord", "type et diamètre"]
    ];
    return `<div class="selection-grid">${criteria.map(([key, title, note]) => `<button type="button" class="selection-card${selected.has(key) ? " checked" : ""}" data-criterion="${key}" aria-pressed="${selected.has(key)}"><span>${selected.has(key) ? "✓" : "+"}</span><strong>${title}</strong><small>${note}</small></button>`).join("")}${readout(selected.size === criteria.length ? "<strong>6/6 critères :</strong> la sélection relie le produit aux conditions réelles, puis se vérifie avec la documentation et l’outil de calcul constructeur." : `<strong>${selected.size}/6 critères.</strong> Une référence ou un diamètre seul ne dimensionne pas le régulateur.`, selected.size === criteria.length ? "key" : "")}</div>`;
  }

  function installationScene(phase = "direction") {
    const phases = {
      direction: { title: "1 · Avant le montage", points: ["Identifier le numéro de code.", "Repérer entrée, sortie et flèche.", "Vérifier fluide, raccords et limites."], icon: "→", kind: "key" },
      braze: { title: "2 · Pendant l’assemblage", points: ["Suivre le guide d’installation à jour.", "Maîtriser la chaleur au raccord.", "Préserver propreté et étanchéité."], icon: "♨", kind: "warning" },
      commission: { title: "3 · À la mise en service", points: ["Contrôler l’étanchéité selon la procédure.", "Mesurer la pression de sortie.", "Vérifier le démarrage et la stabilité."], icon: "✓", kind: "key" }
    };
    const p = phases[phase];
    return `<div class="installation-layout kvl-installation"><div class="installation-visual" role="img" aria-label="Régulateur KVL installé sur l'aspiration avec repères de sens, brasage et contrôle par manomètre"><svg viewBox="0 0 560 360" aria-hidden="true">${defs("install")}<path class="install-line" d="M40 235h260v90"/><path class="install-body-kvl" d="M188 80h112v110h88v90h-88v75H188v-75H70v-90h118z"/><path class="install-cap-kvl" d="M205 37h78v70h-78z"/><path class="install-flow mobile" d="M52 235h190v70" marker-end="url(#arrow-install)"/><g class="install-icon install-${phase}"><circle cx="450" cy="124" r="72"/><text x="450" y="148">${p.icon}</text></g>${phase === "commission" ? `<g class="install-gauge"><circle cx="458" cy="270" r="48"/><path d="M458 270l24-25"/><path d="M425 304q-75 30-124 5"/></g>` : ""}${phase === "braze" ? `<path class="install-flame" d="M72 290q-25-35 4-58q1 22 19 27q12-26 31-32q8 35-9 63z"/>` : ""}</svg></div><div class="installation-card"><h3>${p.title}</h3><ul>${p.points.map((point) => `<li>${point}</li>`).join("")}</ul></div>${readout(`<strong>${p.title} :</strong> ${p.points.join(" ")}`, p.kind)}</div>`;
  }

  function diagnosisScene(type = "overload") {
    const cases = {
      overload: { title: "Surcharge au redémarrage", checks: ["Mesurer la pression après le KVL.", "Comparer la consigne à la notice.", "Vérifier sélection et charge réelle."], note: "Le KVL est un élément de la chaîne ; ne pas conclure sans mesure.", kind: "warning", icon: "M" },
      restriction: { title: "Aspiration trop limitée", checks: ["Comparer amont et aval.", "Vérifier le réglage et le dimensionnement.", "Rechercher un défaut de montage ou une restriction."], note: "Un manque de puissance n’autorise pas une rotation immédiate de la vis.", kind: "warning", icon: "Δp" },
      hunting: { title: "Régulation instable", checks: ["Observer la pression dans le temps.", "Vérifier les pulsations et le montage.", "Contrôler la compatibilité du régulateur."], note: "L’amortisseur réduit les pulsations ; il ne corrige pas une mauvaise sélection.", kind: "", icon: "〰" }
    };
    const d = cases[type];
    return `<div class="diagnosis-flow kvl-diagnosis"><h3>${d.title}</h3><div class="diagnosis-content"><div class="diagnosis-illustration"><svg viewBox="0 0 430 300" aria-hidden="true">${defs("diagkvl")}<path class="diag-kvl-line" d="M36 195h225v75"/><path class="diag-kvl-body" d="M165 58h100v95h74v82h-74v64h-100v-64H73v-82h92z"/><path class="diag-kvl-cap" d="M181 24h68v60h-68z"/><g class="diag-symbol diag-${type}"><circle cx="352" cy="92" r="58"/><text x="352" y="108">${d.icon}</text></g><path class="diag-link" d="M313 133l-55 50"/></svg></div><ol>${d.checks.map((check, index) => `<li><span>${index + 1}</span><p>${check}</p></li>`).join("")}<li class="diagnosis-rule"><span>!</span><p>${d.note}</p></li></ol></div>${readout(`<strong>${d.title} :</strong> mesurer, comparer, puis décider.`, d.kind)}</div>`;
  }

  const questions = [
    { q: "Où place-t-on le régulateur de pression de carter ?", a: ["Sur la ligne liquide après le condenseur", "Sur l’aspiration juste avant le compresseur", "Sur le refoulement après le compresseur"], correct: 1, why: "Le KVL se place en amont du compresseur, sur la conduite d’aspiration." },
    { q: "Quel risque le KVL réduit-il surtout après un arrêt prolongé ?", a: ["La perte de charge du condenseur", "Le givrage du voyant liquide", "La surcharge du moteur du compresseur"], correct: 2, why: "Il limite la pression d’aspiration afin de réduire le risque de surcharge au démarrage." },
    { q: "Quelle pression commande l’ouverture du KVL ?", a: ["La pression de sortie, côté compresseur", "La pression de condensation", "La pression atmosphérique"], correct: 0, why: "Le KVL régule selon sa pression de sortie." },
    { q: "Que fait le KVL quand sa pression de sortie tombe sous la valeur réglée ?", a: ["Il coupe électriquement le compresseur", "Il s’ouvre davantage", "Il ferme le détendeur"], correct: 1, why: "Le KVL s’ouvre lorsque la pression de sortie tombe sous la consigne." },
    { q: "À quoi sert le soufflet d’égalisation ?", a: ["À stocker du fluide liquide", "À mesurer une température", "À compenser l’effet de la pression d’entrée"], correct: 2, why: "Sa surface effective correspond à celle du siège, ce qui compense l’influence de la pression d’entrée." },
    { q: "Comment sélectionne-t-on correctement un KVL ?", a: ["Avec l’ensemble des conditions et la documentation", "Avec le diamètre du tube seulement", "Avec la couleur du capuchon"], correct: 0, why: "Fluide, puissances, températures, pression maximale et raccords sont examinés ensemble." },
    { q: "Quelle différence fondamentale sépare régulateur et pressostat ?", a: ["Aucune : les deux coupent le moteur", "Le pressostat règle un débit massique", "Le régulateur module une pression ; le pressostat agit sur un circuit électrique"], correct: 2, why: "Le KVL module le passage. Un pressostat commande un contact électrique." }
  ];

  function renderQuiz() {
    if (quiz.complete) {
      const success = quiz.score >= 6;
      ui.root.innerHTML = `<div class="quiz-result"><span class="quiz-score">${quiz.score}/7</span><strong>${success ? "Objectif atteint" : "Encore un passage utile"}</strong><p>${success ? "Tu relies correctement emplacement, pression régulée, fonctionnement et méthode de contrôle." : "Relis les corrections puis recommence le défi."}</p><button type="button" class="action-button primary" id="restart-quiz">Refaire le défi</button></div>`;
      document.getElementById("restart-quiz").addEventListener("click", () => {
        quiz = { index: 0, score: 0, answered: false, complete: false };
        renderQuiz();
        updateNavigation();
      });
      updateNavigation();
      return;
    }
    const item = questions[quiz.index];
    ui.root.innerHTML = `<div class="quiz-shell"><div class="quiz-meta"><span>Question ${quiz.index + 1} sur ${questions.length}</span><span>Score ${quiz.score}</span></div><h3 class="quiz-prompt">${item.q}</h3><div class="quiz-answers">${item.a.map((answer, index) => `<button type="button" class="quiz-choice" data-answer="${index}">${answer}</button>`).join("")}</div><div class="quiz-feedback" id="quiz-feedback">Choisis une réponse, puis lis la correction.</div></div>`;
    ui.root.querySelectorAll("[data-answer]").forEach((choice) => choice.addEventListener("click", () => {
      if (quiz.answered) return;
      quiz.answered = true;
      const chosen = Number(choice.dataset.answer);
      if (chosen === item.correct) quiz.score += 1;
      ui.root.querySelectorAll("[data-answer]").forEach((answer) => {
        const index = Number(answer.dataset.answer);
        answer.disabled = true;
        if (index === item.correct) answer.classList.add("good");
        if (index === chosen && chosen !== item.correct) answer.classList.add("bad");
      });
      const feedback = document.getElementById("quiz-feedback");
      feedback.className = `quiz-feedback ${chosen === item.correct ? "feedback-good" : "feedback-bad"}`;
      feedback.innerHTML = `<strong>${chosen === item.correct ? "✓ Correct." : "✗ À revoir."}</strong> ${item.why} <button type="button" class="action-button" id="next-question">${quiz.index === questions.length - 1 ? "Voir le résultat" : "Question suivante"}</button>`;
      document.getElementById("next-question").addEventListener("click", () => {
        if (quiz.index === questions.length - 1) quiz.complete = true;
        else quiz.index += 1;
        quiz.answered = false;
        renderQuiz();
      });
    }));
  }

  const lessons = [
    {
      short: "Reconnaître", kicker: "Écran 1 · Observer", title: "Reconnaître le régulateur de pression de carter",
      intro: "Un corps en T, un réglage protégé en partie haute et deux raccords ne suffisent pas à identifier sa fonction.",
      detail: `<div class="fact"><strong>Repère :</strong> sur la famille étudiée, le fluide entre latéralement et ressort vers le bas.</div><div class="warning-box"><strong>Le piège :</strong> plusieurs régulateurs de la famille KV ont une silhouette proche. Lire le marquage et la flèche.</div>`,
      takeaway: "La forme aide à reconnaître ; le marquage confirme la fonction.", visualTitle: "Extérieur pédagogique", visualHint: "Affiche les repères utiles.", caption: "SVG original inspiré de proportions fonctionnelles, sans reprise d’une image constructeur.",
      render() {
        ui.controls.innerHTML = button("Vue simple", "view", "simple", true) + button("Voir les repères", "view", "labels", false);
        const show = (labelled) => { ui.root.innerHTML = exteriorSvg({ labelled }) + readout(labelled ? "<strong>Repères visibles :</strong> réglage supérieur, corps, entrée latérale et sortie vers le compresseur." : "<strong>Observe :</strong> la silhouette doit ensuite être confirmée par le marquage et le sens."); };
        show(false);
        ui.controls.querySelectorAll("[data-view]").forEach((control) => control.addEventListener("click", () => {
          ui.controls.querySelectorAll("[data-view]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); });
          show(control.dataset.view === "labels");
        }));
      }
    },
    {
      short: "Placer", kicker: "Écran 2 · Situer", title: "Le placer juste avant le compresseur",
      intro: "Le KVL travaille sur la ligne d’aspiration, en aval de l’évaporateur et en amont du compresseur.",
      detail: `<ul><li>La branche reste en basse pression.</li><li>La pression régulée est celle située après le KVL.</li><li>Le compresseur est l’organe protégé.</li></ul>`,
      takeaway: "Évaporateur → KVL → compresseur.", visualTitle: "Emplacement dans la Croix", visualHint: "Repère le KVL sur l’aspiration.", caption: "Disposition conforme à la Croix du frigoriste.",
      render() {
        ui.controls.innerHTML = `<button type="button" class="action-button" id="locate-kvl">Repérer le KVL</button>`;
        ui.root.innerHTML = circuitSvg(false) + readout("Le KVL est sur la branche basse pression, juste avant le compresseur.");
        document.getElementById("locate-kvl").addEventListener("click", () => { ui.root.innerHTML = circuitSvg(true) + readout("<strong>Repéré :</strong> le KVL limite la pression d’aspiration vue par le compresseur.", "key"); });
      }
    },
    {
      short: "Protéger", kicker: "Écran 3 · Comprendre", title: "Réduire le risque de surcharge au démarrage",
      intro: "Après un arrêt prolongé ou un dégivrage, la pression dans l’évaporateur peut être élevée.",
      detail: `<div class="key-box"><strong>Action :</strong> le KVL réduit son ouverture pour limiter la pression d’aspiration.</div><div class="neutral-box"><strong>Limite :</strong> il ne remplace pas la protection électrique du moteur.</div>`,
      takeaway: "Le KVL protège en modulant le passage, pas en coupant le moteur.", visualTitle: "Du redémarrage au moteur", visualHint: "Compare trois situations.", caption: "La chaîne reste lisible sans animation.",
      render() {
        let mode = "restart";
        ui.controls.innerHTML = button("Régime établi", "start", "normal") + button("Arrêt prolongé", "start", "restart", true) + button("Après dégivrage", "start", "defrost");
        const show = () => { ui.root.innerHTML = protectionScene(mode); };
        show();
        ui.controls.querySelectorAll("[data-start]").forEach((control) => control.addEventListener("click", () => { mode = control.dataset.start; ui.controls.querySelectorAll("[data-start]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Sens", kicker: "Écran 4 · Installer", title: "Respecter le sens du fluide",
      intro: "Le fluide arrive de l’évaporateur et repart vers le compresseur. Le corps doit suivre la flèche du produit réel.",
      detail: `<div class="warning-box"><strong>Ne pas deviner :</strong> une forme en T peut être montée dans plusieurs positions, mais le sens entrée-sortie reste imposé.</div>`,
      takeaway: "La position peut varier ; le sens ne s’invente pas.", visualTitle: "Entrée et sortie", visualHint: "Teste le montage inversé.", caption: "La notice et la flèche du corps font foi.",
      render() {
        let correct = true;
        ui.controls.innerHTML = button("Sens correct", "direction", "correct", true) + button("Montage inversé", "direction", "reverse");
        const show = () => { ui.root.innerHTML = flowDirectionScene(correct); };
        show();
        ui.controls.querySelectorAll("[data-direction]").forEach((control) => control.addEventListener("click", () => { correct = control.dataset.direction === "correct"; ui.controls.querySelectorAll("[data-direction]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Pièces", kicker: "Écran 5 · Ouvrir", title: "Nommer les pièces qui régulent",
      intro: "La vis comprime le ressort. Le soufflet, le joint mobile et le siège transforment cet effort en ouverture variable.",
      detail: `<ul><li><strong>Commande :</strong> vis et ressort.</li><li><strong>Équilibre :</strong> soufflet d’égalisation.</li><li><strong>Passage :</strong> joint mobile et siège.</li><li><strong>Stabilité :</strong> amortisseur de pulsations.</li></ul>`,
      takeaway: "Réglage → ressort → pièce mobile → passage.", visualTitle: "Coupe de principe originale", visualHint: "Sélectionne chaque pièce.", caption: "Matière hachurée, cavité blanche ; coupe pédagogique non constructeur.",
      render() {
        ui.controls.innerHTML = Object.entries(PART_LABELS).map(([key, value], index) => button(value[0], "part", key, index === 0)).join("");
        let selected = "cap";
        const show = () => { const [title, note] = PART_LABELS[selected]; ui.root.innerHTML = cutawaySvg({ selected }) + readout(`<strong>${title} :</strong> ${note}`, "key"); };
        show();
        ui.controls.querySelectorAll("[data-part]").forEach((control) => control.addEventListener("click", () => { selected = control.dataset.part; ui.controls.querySelectorAll("[data-part]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Pression", kicker: "Écran 6 · Mesurer", title: "Réguler la pression de sortie",
      intro: "La grandeur régulée se trouve après le KVL, sur l’aspiration en amont immédiat du compresseur.",
      detail: `<div class="key-box"><strong>La clé :</strong> la pression de sortie commande le degré d’ouverture.</div><div class="neutral-box"><strong>Compensation :</strong> le soufflet réduit l’influence de la pression d’entrée.</div>`,
      takeaway: "Pour contrôler le KVL, regarder d’abord la pression côté compresseur.", visualTitle: "Amont ou aval ?", visualHint: "Choisis la grandeur régulée.", caption: "Les deux côtés restent nommés dans le dessin.",
      render() {
        let target = "outlet";
        ui.controls.innerHTML = button("Pression d’entrée", "target", "entry") + button("Pression de sortie", "target", "outlet", true);
        const show = () => { ui.root.innerHTML = pressureScene(target); };
        show();
        ui.controls.querySelectorAll("[data-target]").forEach((control) => control.addEventListener("click", () => { target = control.dataset.target; ui.controls.querySelectorAll("[data-target]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Moduler", kicker: "Écran 7 · Observer", title: "Ouvrir quand la pression baisse, limiter quand elle monte",
      intro: "Le KVL ne fonctionne pas seulement ouvert ou fermé. Il module le passage selon la pression de sortie.",
      detail: `<ul><li><strong>Sous la consigne :</strong> il s’ouvre.</li><li><strong>Dans la bande P :</strong> il module.</li><li><strong>Pression élevée :</strong> il limite davantage.</li></ul>`,
      takeaway: "La pression de sortie pilote une ouverture progressive.", visualTitle: "Trois états du passage", visualHint: "Compare ouverture, modulation et limitation.", caption: "L’état fixe contient déjà le sens complet.",
      render() {
        let state = "low";
        ui.controls.innerHTML = button("Pression basse", "pressure", "low", true) + button("Bande P", "pressure", "band") + button("Pression élevée", "pressure", "high");
        const show = () => { ui.root.innerHTML = modulationScene(state); };
        show();
        ui.controls.querySelectorAll("[data-pressure]").forEach((control) => control.addEventListener("click", () => { state = control.dataset.pressure; ui.controls.querySelectorAll("[data-pressure]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Équilibrer", kicker: "Écran 8 · Stabiliser", title: "Compenser l’amont et amortir les pulsations",
      intro: "Deux fonctions internes évitent qu’une variation parasite ne déforme la régulation.",
      detail: `<div class="fact"><strong>Soufflet :</strong> il compense l’action de la pression d’entrée.</div><div class="fact"><strong>Amortisseur :</strong> il réduit l’effet des pulsations normales de l’installation.</div>`,
      takeaway: "Le soufflet équilibre ; l’amortisseur stabilise.", visualTitle: "Deux aides différentes", visualHint: "Fais varier l’entrée ou la sortie.", caption: "La couleur est doublée par les mots et les contours.",
      render() {
        let mode = "balanced";
        ui.controls.innerHTML = button("La sortie varie", "equal", "balanced", true) + button("L’entrée varie", "equal", "entry-change");
        const show = () => { ui.root.innerHTML = equalizationScene(mode); };
        show();
        ui.controls.querySelectorAll("[data-equal]").forEach((control) => control.addEventListener("click", () => { mode = control.dataset.equal; ui.controls.querySelectorAll("[data-equal]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Bande P", kicker: "Écran 9 · Lire", title: "Comprendre la bande proportionnelle",
      intro: "La bande P sépare la pression de début d’ouverture de la pression d’ouverture complète.",
      detail: `<div class="fact"><strong>Cas KVL 28 documenté :</strong> bande P maximale 1,5&nbsp;bar.</div><div class="warning-box"><strong>Attention :</strong> le graphique explique le principe ; il ne remplace pas la courbe de sélection.</div>`,
      takeaway: "Une consigne n’est pas un interrupteur : l’ouverture évolue dans une bande.", visualTitle: "Consigne et ouverture", visualHint: "Déplace la pression de sortie.", caption: "Exemple pédagogique : consigne 4,0 bar et bande P de 1,5 bar.",
      render() {
        ui.controls.innerHTML = "";
        let pressure = 3.2;
        const show = () => {
          ui.root.innerHTML = bandScene(pressure);
          document.getElementById("outlet-pressure").addEventListener("input", (event) => { pressure = Number(event.target.value); show(); });
        };
        show();
      }
    },
    {
      short: "Régler", kicker: "Écran 10 · Méthode", title: "Mesurer avant de toucher au réglage",
      intro: "La vis agit sur le ressort principal. Une rotation sans mesure peut déplacer la limite dans le mauvais sens.",
      detail: `<div class="key-box"><strong>Ordre :</strong> identifier → mesurer → ajuster selon la notice → vérifier.</div><div class="warning-box"><strong>Jamais :</strong> régler à l’oreille ou à partir d’un seul symptôme.</div>`,
      takeaway: "Le manomètre commande la décision ; la vis ne la remplace pas.", visualTitle: "La méthode en quatre contrôles", visualHint: "Valide chaque étape.", caption: "Le sens et la valeur par tour restent ceux de la notice du modèle posé.",
      render() {
        const checked = new Set();
        ui.controls.innerHTML = "";
        const show = () => {
          ui.root.innerHTML = adjustmentScene(checked);
          ui.root.querySelectorAll("[data-method]").forEach((control) => control.addEventListener("click", () => { if (checked.has(control.dataset.method)) checked.delete(control.dataset.method); else checked.add(control.dataset.method); show(); }));
        };
        show();
      }
    },
    {
      short: "Choisir", kicker: "Écran 11 · Sélection", title: "Relier la référence aux conditions réelles",
      intro: "Le produit 034L0046 est un KVL 28 documenté. Sa référence ne suffit pas à valider une application.",
      detail: `<ul><li>Fluide et conditions thermiques.</li><li>Puissance de l’évaporateur.</li><li>Pression d’aspiration maximale.</li><li>Type et diamètre des raccords.</li></ul>`,
      takeaway: "Identifier un produit n’est pas encore le sélectionner.", visualTitle: "Cas 034L0046 et critères", visualHint: "Passe de la fiche produit au choix réel.", caption: "Données issues de la fiche technique Danfoss d’avril 2026.",
      render() {
        let view = "reference";
        const selected = new Set();
        ui.controls.innerHTML = button("Cas 034L0046", "selection", "reference", true) + button("Critères de choix", "selection", "criteria");
        const show = () => {
          ui.root.innerHTML = selectionScene(view, selected);
          ui.root.querySelectorAll("[data-criterion]").forEach((control) => control.addEventListener("click", () => { if (selected.has(control.dataset.criterion)) selected.delete(control.dataset.criterion); else selected.add(control.dataset.criterion); show(); }));
        };
        show();
        ui.controls.querySelectorAll("[data-selection]").forEach((control) => control.addEventListener("click", () => { view = control.dataset.selection; ui.controls.querySelectorAll("[data-selection]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Installer", kicker: "Écran 12 · Monter", title: "Préserver sens, propreté et contrôle",
      intro: "Le produit peut être orienté pour l’installation, mais son sens de passage, ses limites et sa procédure restent imposés.",
      detail: `<div class="fact"><strong>Avant :</strong> vérifier référence, fluide, flèche et raccords.</div><div class="fact"><strong>Après :</strong> contrôler étanchéité, pression de sortie et comportement au démarrage.</div>`,
      takeaway: "La notice à jour accompagne le produit du montage à la mise en service.", visualTitle: "Trois phases d’installation", visualHint: "Parcours les contrôles.", caption: "Aucune température ou méthode universelle n’est inventée.",
      render() {
        let phase = "direction";
        ui.controls.innerHTML = button("Avant", "phase", "direction", true) + button("Assembler", "phase", "braze") + button("Mettre en service", "phase", "commission");
        const show = () => { ui.root.innerHTML = installationScene(phase); };
        show();
        ui.controls.querySelectorAll("[data-phase]").forEach((control) => control.addEventListener("click", () => { phase = control.dataset.phase; ui.controls.querySelectorAll("[data-phase]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Diagnostiquer", kicker: "Écran 13 · Contrôler", title: "Partir du symptôme, finir par une mesure",
      intro: "Surcharge, restriction ou instabilité ont plusieurs causes possibles. Le KVL ne doit pas devenir le coupable automatique.",
      detail: `<div class="key-box"><strong>Méthode :</strong> observer → mesurer amont/aval → comparer à la notice → décider.</div><div class="warning-box"><strong>Sécurité :</strong> aucune ouverture du circuit chargé ou sous pression.</div>`,
      takeaway: "Un symptôme ouvre un diagnostic ; il ne donne pas encore le réglage.", visualTitle: "Trois familles de symptômes", visualHint: "Choisis une situation.", caption: "Les contrôles restent non intrusifs dans cette page.",
      render() {
        let type = "overload";
        ui.controls.innerHTML = button("Surcharge", "diagnosis", "overload", true) + button("Trop restrictif", "diagnosis", "restriction") + button("Instable", "diagnosis", "hunting");
        const show = () => { ui.root.innerHTML = diagnosisScene(type); };
        show();
        ui.controls.querySelectorAll("[data-diagnosis]").forEach((control) => control.addEventListener("click", () => { type = control.dataset.diagnosis; ui.controls.querySelectorAll("[data-diagnosis]").forEach((item) => { item.classList.toggle("active", item === control); item.setAttribute("aria-pressed", String(item === control)); }); show(); }));
      }
    },
    {
      short: "Vérifier", kicker: "Écran 14 · Défi", title: "Décider correctement avec le KVL",
      intro: "Sept situations vérifient l’emplacement, la pression régulée, le fonctionnement et la méthode de contrôle.",
      detail: `<div class="fact"><strong>Objectif :</strong> 6 bonnes réponses sur 7.</div><div class="neutral-box"><strong>Conseil :</strong> lis la correction avant de poursuivre.</div>`,
      takeaway: "Mesurer et comparer avant d’ajuster.", visualTitle: "Défi final", visualHint: "Une question à la fois.", caption: "Entraînement pédagogique, pas examen officiel.",
      render() { ui.controls.innerHTML = ""; renderQuiz(); }
    }
  ];

  function buildStepper() {
    document.documentElement.style.setProperty("--step-count", String(lessons.length));
    ui.stepper.innerHTML = lessons.map((lesson, index) => `<button type="button" class="step-button" data-step="${index}" aria-label="Étape ${index + 1} : ${lesson.short}"><span class="step-number">${index + 1}</span><span class="step-name">${lesson.short}</span></button>`).join("");
    ui.stepper.querySelectorAll("[data-step]").forEach((control) => control.addEventListener("click", () => changeStep(Number(control.dataset.step), true)));
  }

  function updateNavigation() {
    ui.previous.disabled = current === 0;
    if (current === lessons.length - 1) {
      ui.next.textContent = quiz.complete ? "Recommencer ↺" : "Termine le défi";
      ui.next.disabled = !quiz.complete;
    } else {
      ui.next.textContent = "Continuer →";
      ui.next.disabled = false;
    }
    ui.progressLabel.textContent = `Écran ${current + 1} sur ${lessons.length}`;
    ui.progressBar.style.width = `${((current + 1) / lessons.length) * 100}%`;
    ui.stepper.querySelectorAll("[data-step]").forEach((control, index) => {
      control.classList.toggle("active", index === current);
      control.classList.toggle("reached", index <= furthest);
      if (index === current) control.setAttribute("aria-current", "step"); else control.removeAttribute("aria-current");
    });
  }

  function renderLesson(focusTitle = false) {
    stopSpeech();
    const lesson = lessons[current];
    ui.kicker.textContent = lesson.kicker;
    ui.title.textContent = lesson.title;
    ui.intro.textContent = lesson.intro;
    ui.detail.innerHTML = lesson.detail;
    ui.takeaway.textContent = lesson.takeaway;
    ui.visualTitle.textContent = lesson.visualTitle;
    ui.visualHint.textContent = lesson.visualHint;
    ui.caption.textContent = lesson.caption;
    lesson.render();
    updateNavigation();
    if (focusTitle) ui.title.focus({ preventScroll: true });
  }

  function changeStep(index, focusTitle = false) {
    const bounded = Math.max(0, Math.min(lessons.length - 1, index));
    current = bounded;
    furthest = Math.max(furthest, current);
    renderLesson(focusTitle);
  }

  function selectableVoice() {
    if (!window.speechSynthesis) return null;
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;
    const quality = /(natural|naturel|neural|online|google|microsoft|denise|henri|julie|paul|hortense)/i;
    const scored = voices.map((voice, order) => {
      const lang = (voice.lang || "").toLowerCase();
      let score = 0;
      if (lang === "fr-fr") score += 100;
      else if (lang.startsWith("fr")) score += 55;
      if (quality.test(voice.name || "")) score += 20;
      if (voice.localService) score += 2;
      return { voice, order, score };
    }).sort((a, b) => b.score - a.score || a.order - b.order);
    return scored[0].voice;
  }

  function updateVoiceButton() {
    const label = paused ? "Reprendre" : speaking ? "Pause" : "Écouter";
    ui.voice.innerHTML = `${paused ? "▶" : speaking ? "Ⅱ" : "▶"} <span>${label}</span>`;
    ui.voice.setAttribute("aria-label", `${label} l’écran`);
    ui.voice.classList.toggle("playing", speaking && !paused);
  }

  function stopSpeech() {
    speechRun += 1;
    if (window.speechSynthesis) speechSynthesis.cancel();
    speaking = false;
    paused = false;
    updateVoiceButton();
  }

  function visibleSpeechText() {
    const temporary = document.createElement("div");
    temporary.innerHTML = `${lessons[current].title}. ${lessons[current].intro}. ${lessons[current].detail} À retenir : ${lessons[current].takeaway}.`;
    return (temporary.textContent || "").replace(/\s+/g, " ").trim();
  }

  function startSpeech() {
    if (!window.speechSynthesis) return;
    stopSpeech();
    const run = speechRun;
    const utterance = new SpeechSynthesisUtterance(visibleSpeechText());
    utterance.lang = "fr-FR";
    utterance.rate = Number(ui.rate.value);
    utterance.pitch = 1;
    preferredVoice = preferredVoice || selectableVoice();
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onstart = () => { if (run !== speechRun) return; speaking = true; paused = false; updateVoiceButton(); };
    utterance.onend = () => { if (run !== speechRun) return; speaking = false; paused = false; updateVoiceButton(); };
    utterance.onerror = (event) => {
      if (run !== speechRun || event.error === "canceled" || event.error === "interrupted") return;
      speaking = false; paused = false; updateVoiceButton(); ui.appStatus.textContent = "La lecture vocale est indisponible. Le texte visible reste complet.";
    };
    speechSynthesis.speak(utterance);
  }

  ui.previous.addEventListener("click", () => changeStep(current - 1, true));
  ui.next.addEventListener("click", () => {
    if (current === lessons.length - 1 && quiz.complete) {
      quiz = { index: 0, score: 0, answered: false, complete: false };
      changeStep(0, true);
    } else changeStep(current + 1, true);
  });

  ui.voice.addEventListener("click", () => {
    if (!window.speechSynthesis) return;
    if (speaking && !paused) { speechSynthesis.pause(); paused = true; updateVoiceButton(); return; }
    if (paused) { speechSynthesis.resume(); paused = false; updateVoiceButton(); return; }
    startSpeech();
  });

  ui.rate.value = String(safeStoredRate());
  ui.rate.addEventListener("change", () => {
    saveRate(Number(ui.rate.value));
    if (speaking || paused) startSpeech();
  });

  if (!window.speechSynthesis) {
    ui.voice.disabled = true;
    ui.rate.disabled = true;
    ui.voice.setAttribute("aria-label", "Lecture vocale indisponible");
  } else {
    preferredVoice = selectableVoice();
    speechSynthesis.addEventListener?.("voiceschanged", () => { preferredVoice = selectableVoice(); });
  }

  ui.sourceButton.addEventListener("click", () => ui.sources.showModal());
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(); });
  window.addEventListener("beforeunload", stopSpeech);
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLButtonElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) return;
    if (event.key === "ArrowRight") { event.preventDefault(); if (current < lessons.length - 1) changeStep(current + 1, true); }
    if (event.key === "ArrowLeft") { event.preventDefault(); if (current > 0) changeStep(current - 1, true); }
    if (event.key === "Escape" && ui.sources.open) ui.sources.close();
  });

  buildStepper();
  renderLesson(false);
})();
