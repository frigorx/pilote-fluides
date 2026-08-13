(function initialiseManoTwoWayVisuals(root) {
  "use strict";

  const C = {
    navy: "#10233c", navy2: "#1b3a63", paper: "#fffdf8", cream: "#f7f1e7",
    line: "#cbd5df", muted: "#53677f", blue: "#3d7fca", red: "#c73d2b",
    orange: "#ff6b35", amber: "#b06a00", green: "#247b57", metal: "#dfe7ea"
  };

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  const CONTROL_LABELS = {
    "identify-jet-axis": "Identifier la zone de projection dans l’axe du raccord",
    "select-base-ppe": "Choisir lunettes et gants de protection contre le froid",
    "identify-fluid": "Identifier le fluide avec la plaque, le dossier et la FDS",
    "check-compatibility": "Comparer les caractéristiques du circuit et les limites fabricant",
    "check-work-area": "Confirmer que la zone de travail est préparée",
    "wrong-jet-side": "Choisir le côté comme zone de projection",
    "wrong-ppe-shoes": "Choisir les chaussures seules",
    "wrong-fluid-color": "Identifier le fluide par la couleur des flexibles",
    "wrong-compat-color": "Déclarer la compatibilité avec les seules couleurs",
    "wrong-area-later": "Préparer le poste après l’ouverture",
    "choose-isolation-method": "Choisir l’organe qui coupe l’alimentation liquide",
    "close-liquid-feed": "Fermer l’alimentation liquide du poste",
    "recover-hose-fluid": "Suivre la récupération du fluide des flexibles",
    "pumpdown-stop": "Confirmer l’arrêt de pump-down au critère du poste",
    "pressure-stable": "Confirmer la stabilisation de la pression avant déconnexion",
    "restore-liquid-feed": "Rétablir l’alimentation liquide du poste",
    "leak-final-hp-gland": "Contrôler le presse-étoupe HP au détecteur",
    "leak-final-hp-port": "Contrôler le bouchon P HP au détecteur",
    "leak-final-bp-gland": "Contrôler le presse-étoupe BP au détecteur",
    "leak-final-bp-port": "Contrôler le bouchon P BP au détecteur",
    "leak-final-confirm": "Conclure la recherche de fuite finale",
    "zero-bp": "Contrôler le zéro BP", "zero-hp": "Contrôler le zéro HP",
    "inspect-hoses": "Confirmer le contrôle des trois flexibles", "connect-blue": "Raccorder ou déposer le flexible bleu sur P",
    "connect-red": "Raccorder ou déposer le flexible rouge sur P", "connect-yellow": "Raccorder ou déposer le flexible jaune",
    "check-path": "Confirmer le chemin des flexibles", "manifold-bp": "Manœuvrer le robinet BP du manifold",
    "manifold-hp": "Manœuvrer le robinet HP du manifold", "pump-isolation": "Manœuvrer l’isolement de la pompe",
    "pump-power": "Commander la pompe à vide", "vacuum-check": "Confirmer le vide des lignes",
    "leak-check": "Contrôler l’étanchéité", "read-pressures": "Relever les pressions BP et HP",
    "final-check": "Effectuer le contrôle final",
    "store": "Ranger le manifold", "mini-blue": "Manœuvrer la mini-vanne du flexible bleu",
    "mini-red": "Manœuvrer la mini-vanne du flexible rouge", "mini-yellow": "Manœuvrer la mini-vanne du flexible jaune"
  };
  function controlLabel(id) {
    if (CONTROL_LABELS[id]) return CONTROL_LABELS[id];
    const side = id.startsWith("bp-") || id.endsWith("-bp") ? "BP" : id.startsWith("hp-") || id.endsWith("-hp") ? "HP" : "";
    if (id.startsWith("identify-p-")) return `Identifier la prise P ${side}`;
    if (id.startsWith("p1-")) return `Prise P1 ${side}, réservée au pressostat`;
    if (id.endsWith("-stem-cap")) return `Bouchon du carré ${side}`;
    if (id.endsWith("-port-cap")) return `Bouchon de la prise P ${side}`;
    if (id.endsWith("-gland")) return `Presse-étoupe ${side}`;
    if (id.endsWith("-stem")) return `Carré de manœuvre ${side}`;
    return id;
  }

  const expectedClass = (id, expected) => id && id === expected ? " expected" : "";
  const attrs = (id, expected, disabled = false, extra = "") => id
    ? `class="direct-control${extra ? ` ${extra}` : ""}${expectedClass(id, expected)}${disabled ? " is-disabled" : ""}" data-control="${id}" role="button" tabindex="${disabled ? -1 : 0}" aria-label="${esc(controlLabel(id))}" aria-disabled="${disabled}"`
    : `class="${extra}" aria-hidden="true"`;
  const text = (x, y, value, className = "iv-label", anchor = "middle") => `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${esc(value)}</text>`;
  const pill = (x, y, width, label, kind = "navy") => `<g class="iv-pill ${kind}"><rect x="${x}" y="${y}" width="${width}" height="38" rx="19"/>${text(x + width / 2, y + 25, label, "iv-pill-text")}</g>`;
  const button = (id, expected, x, y, width, title, subtitle = "", kind = "navy") => `<g ${attrs(id, expected, false, `iv-button ${kind}`)}><rect class="hit-target iv-button-shape" x="${x}" y="${y}" width="${width}" height="64" rx="16"/>${text(x + width / 2, y + 27, title, "iv-button-title")}${subtitle ? text(x + width / 2, y + 49, subtitle, "iv-button-subtitle") : ""}</g>`;
  const choiceButton = (id, choice, expected, x, y, width, title, subtitle, kind = "navy") => `<g ${attrs(id, expected, false, `iv-button ${kind}`)} data-choice="${choice}"><rect class="hit-target iv-button-shape" x="${x}" y="${y}" width="${width}" height="72" rx="16"/>${text(x + width / 2, y + 29, title, "iv-button-title")}${text(x + width / 2, y + 54, subtitle, "iv-button-subtitle")}</g>`;
  function hoseValve(id, state, expected, x, y, rotation = 0, scale = 1, showState = true) {
    const control = id ? attrs(id, expected, false, "iv-mini-valve") : `class="iv-mini-valve" aria-hidden="true"`;
    const leverRotation = state === "open" ? 0 : 90;
    return `<g transform="translate(${x} ${y}) scale(${scale})"><g ${control}>
      <g transform="rotate(${rotation})"><rect class="hit-target iv-mini-hit" x="-62" y="-38" width="124" height="76" rx="16"/><path class="iv-mini-fitting" d="M-54-16h18l10-12h52l10 12h18v32H36L26 28h-52l-10-12h-18z"/><rect class="iv-mini-body" x="-31" y="-22" width="62" height="44" rx="9"/><g class="iv-mini-lever" style="transform:rotate(${leverRotation}deg)"><rect x="-49" y="-8" width="98" height="16" rx="8"/><circle r="11"/></g></g>
    </g>${showState ? text(0, 53, state === "open" ? "OUVERTE" : "FERMÉE", `iv-mini-state ${state}`) : ""}</g>`;
  }
  const frame = (title, description, body, viewBox = "0 0 900 560", className = "") => `<svg class="teaching-svg ${className}" viewBox="${viewBox}" role="img" aria-label="${esc(description)}"><rect class="iv-bg" width="100%" height="100%" rx="18"/>${text(36, 42, title, "iv-heading", "start")}${body}</svg>`;

  function gauge(side, cx, cy, state, control, expected) {
    const isBp = side === "bp";
    const color = isBp ? C.blue : C.red;
    const angle = state === "pressure" ? (isBp ? 38 : 68) : state === "vacuum" ? -32 : state === "zero" ? 0 : (isBp ? -8 : 9);
    return `<g transform="translate(${cx} ${cy})">
      <circle class="iv-gauge-case" r="92"/><circle class="iv-gauge-face" r="79" style="stroke:${color};${isBp ? "" : "stroke-dasharray:13 7"}"/>
      <path class="iv-scale" d="M-53 32A62 62 0 1 1 53 32"/>
      ${text(0, 20, side.toUpperCase(), "iv-gauge-word")}
      <line class="iv-needle" y1="12" x2="-37" y2="-49" style="transform:rotate(${angle}deg)"/><circle r="8" fill="${C.navy}"/>
      <g ${attrs(control, expected, false, "iv-zero")}><circle class="hit-target iv-zero-shape" cy="68" r="18"/><path d="M-8 68h16"/></g>
    </g>`;
  }

  function manifoldScene(e, action, expected, annotated = false) {
    const pressure = e.pressureSeen && !e.residualTreated;
    const vacuum = e.vacuumReached && !pressure;
    const stateName = pressure ? "pressure" : vacuum ? "vacuum" : (e.zero.bp && e.zero.hp ? "zero" : "idle");
    const control = action?.control || "";
    const annotation = annotated ? `
      <path class="iv-callout-line" d="M202 142H74V104"/>${pill(34, 65, 214, "MANOMÈTRE BP · BLEU", "blue")}
      <path class="iv-callout-line" d="M698 142H826V104"/>${pill(652, 65, 214, "MANOMÈTRE HP · ROUGE", "red")}
      ${pill(52, 454, 218, "FLEXIBLE BLEU · BP", "blue")}${pill(341, 480, 218, "FLEXIBLE JAUNE · SERVICE", "amber")}${pill(630, 414, 218, "FLEXIBLE ROUGE · HP", "red")}
      ${pill(122, 352, 190, "ROBINET BP", "blue")}${pill(588, 352, 190, "ROBINET HP", "red")}` : "";
    const actionButton = ["read-pressures", "leak-check"].includes(control)
      ? button(control, expected, 326, 454, 248, control === "read-pressures" ? "RELEVER BP / HP" : "CONTRÔLER L’ÉTANCHÉITÉ", control === "read-pressures" ? "robinets fermés" : "raccords et presse-étoupes", control === "leak-check" ? "green" : "navy") : "";
    return frame(annotated ? "ANATOMIE DU MANIFOLD 2 VOIES" : "LE MANIFOLD · UNE ACTION À LA FOIS", "Deux manomètres, deux robinets et trois flexibles clairement séparés.", `
      <g class="iv-manifold">
        <rect class="iv-manifold-body" x="218" y="205" width="464" height="151" rx="32"/>
        <rect class="iv-manifold-face" x="244" y="237" width="412" height="72" rx="18"/>
        ${gauge("bp", 310, 194, stateName, "zero-bp", expected)}${gauge("hp", 590, 194, stateName, "zero-hp", expected)}
        <g ${attrs("manifold-bp", expected, false, "iv-knob")} transform="translate(310 337)"><circle class="hit-target iv-knob-shape bp" r="34"/><path d="M0-21V21" style="transform:rotate(${e.manifold.bp === "open" ? 90 : 0}deg)"/></g>
        <g ${attrs("manifold-hp", expected, false, "iv-knob")} transform="translate(590 337)"><circle class="hit-target iv-knob-shape hp" r="34"/><path d="M0-21V21" style="transform:rotate(${e.manifold.hp === "open" ? 90 : 0}deg)"/></g>
        <circle class="iv-port bp" cx="310" cy="386" r="15"/><circle class="iv-port amber" cx="450" cy="386" r="15"/><circle class="iv-port hp" cx="590" cy="386" r="15"/>
        <path class="iv-hose bp" d="M310 402C275 442 197 452 160 522"/><path class="iv-hose amber" d="M450 402V538"/><path class="iv-hose hp" d="M590 402C625 442 703 452 740 522"/>
        ${hoseValve("", "closed", "", 160, 510, -55, .58, false)}${hoseValve("", "closed", "", 450, 514, 90, .58, false)}${hoseValve("", "closed", "", 740, 510, 55, .58, false)}
      </g>${annotation}${actionButton}`);
  }

  function keyDock(position = "rear") {
    const rotation = position === "mid" ? -24 : position === "front" ? -48 : 0;
    return `<g class="iv-key-dock">
      <rect x="724" y="126" width="152" height="344" rx="22"/>
      ${text(800, 160, "CLÉ DE SERVICE", "iv-box-title")}${text(800, 184, "hors de la vanne", "iv-small")}
      <g transform="translate(800 306) rotate(${rotation})">
        <circle class="iv-key-ring" r="46"/><circle class="iv-key-hole" r="21"/>
        <rect class="iv-key-handle" x="-19" y="32" width="38" height="132" rx="17"/>
      </g>
      ${text(800, 444, "Sur le carré", "iv-small")}${text(800, 462, "pendant la manœuvre", "iv-small")}
    </g>`;
  }

  function keyDockMobile(position = "rear") {
    const rotation = position === "mid" ? -24 : position === "front" ? -48 : 0;
    return `<g class="iv-key-dock iv-key-dock-mobile"><rect x="68" y="552" width="584" height="126" rx="22"/>
      ${text(214, 594, "CLÉ DE SERVICE", "iv-box-title")}${text(214, 621, "toujours hors du dessin de la vanne", "iv-small")}
      <g transform="translate(520 610) rotate(${rotation + 90}) scale(.56)"><circle class="iv-key-ring" r="46"/><circle class="iv-key-hole" r="21"/><rect class="iv-key-handle" x="-19" y="32" width="38" height="132" rx="17"/></g>
    </g>`;
  }

  function rotalockScene(e, action, expected) {
    const mobile = window.matchMedia("(max-width: 650px)").matches;
    const side = action.side || "bp";
    const unit = e[side];
    const isBp = side === "bp";
    const color = isBp ? C.blue : C.red;
    const stemCapOn = unit.stemCap === "on";
    const portCapOn = unit.portCap === "on";
    const identify = `identify-p-${side}`;
    const connect = isBp ? "connect-blue" : "connect-red";
    const serviceControl = action.control === identify ? identify : connect;
    const connected = unit.connected;
    const stemControl = `${side}-stem`;
    const positionName = unit.stem === "mid" ? "POSITION INTERMÉDIAIRE" : unit.stem === "front" ? "SIÈGE AVANT" : "SIÈGE ARRIÈRE";
    const positionTone = unit.stem === "rear" ? "green" : "amber";
    const targetLabels = {
      [`${side}-stem-cap`]: "BOUCHON DU CARRÉ",
      [`${side}-gland`]: action.expect === "loose" ? "1/3 · DESSERRER LÉGÈREMENT" : "3/3 · RESSERRER",
      [`${side}-stem`]: "2/3 · MANŒUVRER LE CARRÉ",
      [`${side}-port-cap`]: "BOUCHON P",
      [identify]: "PRISE P · SERVICE",
      [connect]: connected ? "RACCORD SUR P" : "RACCORDER SUR P",
      [isBp ? "mini-blue" : "mini-red"]: "MINI-VANNE 1/4 TOUR"
    };
    const miniTarget = action.control.startsWith("mini-");
    const targetCallout = targetLabels[action.control]
      ? `${pill(438, 416, 260, targetLabels[action.control], action.control === identify || action.control === connect ? "green" : "navy")}${miniTarget ? "" : '<path class="iv-reference-arrow" d="M568 416v-18"/>'}`
      : "";
    const partsTray = unit.portCap === "removed" || unit.stemCap === "removed" ? `<g class="iv-parts-tray"><rect x="26" y="458" width="170" height="86" rx="16"/>${text(111, 480, "PIÈCES DÉPOSÉES", "iv-note")}</g>` : "";
    const capPark = unit.portCap === "removed" ? `<g ${attrs(`${side}-port-cap`, expected)} transform="translate(150 500) scale(.56)"><path class="iv-cap" d="M-40 0h80l-9 42h-62z"/><rect class="hit-target" x="-68" y="-24" width="136" height="98" rx="15"/>${text(0, 30, "P", "iv-cap-label")}</g>` : "";
    const stemCapPark = unit.stemCap === "removed" ? `<g ${attrs(`${side}-stem-cap`, expected)} transform="translate(70 500) scale(.56)"><path class="iv-cap" d="M-44 0h88l18 30-18 30h-88z"/><rect class="hit-target" x="-72" y="-22" width="152" height="104" rx="15"/>${text(6, 38, "□", "iv-cap-label")}</g>` : "";
    const miniControl = isBp ? "mini-blue" : "mini-red";
    const pHose = connected ? `<path class="iv-hose ${isBp ? "bp" : "hp"}" d="M548 166C560 132 596 126 620 111M680 91l24-16"/>${hoseValve(miniControl, e.mini[isBp ? "blue" : "red"], expected, 650, 101, -18, .76, true)}` : "";
    return frame(`VANNE ROTALOCK ${side.toUpperCase()} · ${positionName}`, "Une seule vanne Rotolock, sa prise P après le siège arrière, sa prise P1 et la clé rangée à l’extérieur.", `
      ${pill(70, 70, 268, "P1 · PRESSOSTAT · SOUS PRESSION", "red")}${pill(360, 70, 128, "P · MANO", "green")}<path class="iv-reference-arrow" d="M488 89l26 38"/>
      <path class="iv-pipe" d="M28 308H174M612 308H672" style="stroke:${color};${isBp ? "" : "stroke-dasharray:18 9"}"/>
      <path class="iv-valve-body" d="M155 224H560L624 308l-64 84H155L91 308z"/>
      <path class="iv-port-neck" d="M250 224V158h92v66"/><path class="iv-port-neck service" d="M500 224V158h92v66"/>
      <g ${attrs(`p1-${side}`, expected)}><rect class="hit-target" x="232" y="128" width="128" height="112" rx="18"/><circle class="iv-p1" cx="296" cy="158" r="30"/>${text(296, 167, "P1", "iv-port-label")}</g>
      <g ${attrs(serviceControl, expected, serviceControl !== identify && portCapOn && !connected)}><rect class="hit-target" x="482" y="127" width="128" height="112" rx="18"/><circle class="iv-p" cx="546" cy="158" r="31"/>${text(546, 167, "P", "iv-port-label")}</g>
      ${portCapOn ? `<g ${attrs(`${side}-port-cap`, expected)}><path class="iv-cap" d="M498 132h96l-12-48h-72z"/><rect class="hit-target" x="486" y="74" width="120" height="92" rx="14"/>${text(546, 116, "CAP P", "iv-cap-label")}</g>` : ""}
      ${pHose}
      <rect class="iv-gland" x="555" y="257" width="64" height="102" rx="14"/><g ${attrs(`${side}-gland`, expected)}><rect class="hit-target" x="541" y="240" width="90" height="136" rx="18"/></g>
      ${stemCapOn ? `<g ${attrs(`${side}-stem-cap`, expected)}><path class="iv-cap" d="M619 257h60l35 51-35 51h-60z"/><rect class="hit-target" x="607" y="240" width="112" height="136" rx="18"/></g>` : `<g ${attrs(stemControl, expected)}><rect class="hit-target" x="620" y="254" width="86" height="108" rx="18"/><rect class="iv-square" x="638" y="279" width="50" height="58" rx="8"/><path class="iv-cross" d="M648 290l30 36m0-36l-30 36"/></g>`}
      ${pill(190, 416, 232, positionName, positionTone)}${targetCallout}${partsTray}${stemCapPark}${capPark}
      <path class="iv-reference-arrow" d="M493 204V185h106v19"/>${text(546, 213, "P EST APRÈS LE SIÈGE ARRIÈRE", "iv-note")}
      ${mobile ? keyDockMobile(unit.stem) : keyDock(unit.stem)}`, mobile ? "0 0 720 700" : "0 0 900 560", "iv-rotalock-scene");
  }

  function cutaway(position = "back", side = "bp") {
    const mobile = window.matchMedia("(max-width: 650px)").matches;
    const isBack = position === "back" || position === "rear";
    const isMid = position === "mid";
    const positionKey = isBack ? "rear" : position;
    const title = isBack ? "SIÈGE ARRIÈRE · P ISOLÉE" : isMid ? "POSITION INTERMÉDIAIRE · TOUT COMMUNIQUE" : "SIÈGE AVANT · T ISOLÉE";
    const tip = isBack ? 510 : isMid ? 430 : 250;
    const chamberClass = isBack ? " isolated" : "";
    const tClass = position === "front" ? " isolated" : "";
    const path = isBack
      ? `<path class="iv-flow" d="M76 303H510M348 303V454"/><path class="iv-block" d="M520 266l22 37-22 37"/>`
      : isMid ? `<path class="iv-flow" d="M76 303H610M348 303V454M538 303V150"/>`
      : `<path class="iv-flow" d="M282 303H610M348 303V454M538 303V150"/><path class="iv-block" d="M257 266l-22 37 22 37"/>`;
    return frame(`COUPE ROTALOCK ${side.toUpperCase()} · ${title}`, "Coupe pédagogique avec P dessinée après le siège arrière et la clé de service rangée hors de la vanne.", `
      <defs><pattern id="cut-hatch-${side}-${positionKey}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line y2="14" stroke="#9aabba" stroke-width="5"/></pattern></defs>
      ${pill(38, 66, 252, "T · TUYAUTERIE", "blue")}${pill(302, 66, 230, "P1 · PRESSOSTAT", "red")}${pill(544, 66, 128, "P · MANO", "green")}
      <path class="iv-cut-body" d="M70 236Q70 190 120 190H600Q664 190 664 256v96q0 66-64 66H120q-50 0-50-46z"/>
      <path class="iv-cut-channel${tClass}" d="M70 266H592v74H70z"/><path class="iv-cut-channel" d="M313 340h70v116h-70z"/>
      <path class="iv-cut-port" d="M308 190v-80h80v80"/><path class="iv-cut-port${chamberClass}" d="M505 190v-80h78v80"/>
      ${isBack ? `<rect x="505" y="110" width="78" height="80" fill="url(#cut-hatch-${side}-${positionKey})" opacity=".8"/>` : ""}
      ${path}
      <path class="iv-stem" d="M646 277H${tip + 20}l-34-37-42 63 42 63 34-37H646z"/>
      <rect class="iv-gland" x="622" y="263" width="54" height="80" rx="12"/><rect class="iv-square" x="650" y="278" width="42" height="50" rx="7"/>
      <path class="iv-cross" d="M659 288l24 30m0-30l-24 30"/>
      ${text(110, 322, "T", "iv-port-label")}${text(348, 489, "C", "iv-port-label")}${text(348, 143, "P1", "iv-port-label")}${text(544, 143, "P", "iv-port-label")}
      ${isBack ? `<path class="iv-reference-arrow" d="M485 204V176h118v28"/>${text(544, 221, "APRÈS LE POINTEAU", "iv-note")}${pill(160, 470, 430, "POINTEAU AU SIÈGE ARRIÈRE → P BLOQUÉE", "green")}` : isMid ? pill(156, 470, 440, "POINTEAU ENTRE LES SIÈGES → P OUVERTE", "amber") : pill(156, 470, 440, "POINTEAU AU SIÈGE AVANT → T BLOQUÉE", "red")}
      ${mobile ? keyDockMobile(positionKey) : keyDock(positionKey)}`, mobile ? "0 0 720 700" : "0 0 900 560", "iv-cutaway-scene");
  }

  function recognitionLesson() {
    return `<div class="recognition-visual"><div class="recognition-image"><img src="../vanne-service-interactive/vanne-3d.webp" alt="Vue en perspective d’une vanne de service Rotolock"/></div><div class="recognition-copy"><span class="recognition-badge">REPÉRAGE SUR LA VANNE</span><h3>P et P1 n’ont pas le même rôle</h3><div class="recognition-points"><p><strong>P · près du carré</strong><span>Prise temporaire du manifold. Elle est située après le siège arrière.</span></p><p><strong>P1 · côté circuit</strong><span>Prise du pressostat. Elle peut rester sous pression.</span></p></div><div class="recognition-warning">Ne jamais choisir une prise uniquement par sa forme : lire le repérage et suivre le circuit.</div></div></div>`;
  }

  function safetyRiskLesson() {
    return `<div class="projection-lesson"><img src="../svg/secu-projection.svg" alt="Un reste de liquide sous pression jaillit dans l’axe du raccord. La personne se tient sur le côté avec lunettes et gants de protection contre le froid."/><div class="projection-rules"><p><strong>PRESSION</strong><span>Le fluide pousse sur les parois, même installation arrêtée.</span></p><p><strong>DÉTENTE</strong><span>À la sortie, le liquide s’évapore et prend de la chaleur à la peau.</span></p><p><strong>CONSÉQUENCE</strong><span>Projection aux yeux et brûlure par le froid : la gelure.</span></p></div></div>`;
  }

  function compatibilityLesson() {
    return frame("IDENTIFIER → COMPARER → DÉCIDER", "La plaque et la documentation identifient le fluide. Les caractéristiques du circuit sont comparées aux limites fabricant du manifold, des flexibles et des raccords.", `
      <g class="iv-decision-card"><rect x="42" y="92" width="244" height="286" rx="22"/>${text(164, 132, "1", "iv-step-number")}${text(164, 172, "IDENTIFIER", "iv-box-title")}<rect class="iv-nameplate" x="74" y="198" width="180" height="98" rx="10"/>${text(92, 226, "PLAQUE INSTALLATION", "iv-small", "start")}${text(92, 254, "FLUIDE : à lire", "iv-label", "start")}${text(92, 280, "DOSSIER + FDS", "iv-label", "start")}${pill(78, 320, 172, "PAS PAR LA COULEUR", "red")}</g>
      <path class="iv-sequence-arrow" d="M300 238h62"/>
      <g class="iv-decision-card"><rect x="374" y="92" width="244" height="286" rx="22"/>${text(496, 132, "2", "iv-step-number")}${text(496, 172, "COMPARER", "iv-box-title")}${pill(404, 202, 184, "CIRCUIT", "navy")}${text(496, 258, "pression de référence", "iv-label")}${text(496, 286, "et fluide identifiés", "iv-label")}${text(496, 320, "↕", "iv-step-number")}${text(496, 354, "limites fabricant du matériel", "iv-small")}</g>
      <path class="iv-sequence-arrow" d="M632 238h62"/>
      <g class="iv-decision-card"><rect x="706" y="92" width="152" height="286" rx="22"/>${text(782, 132, "3", "iv-step-number")}${text(782, 172, "DÉCIDER", "iv-box-title")}${pill(726, 206, 112, "LISIBLE", "green")}${pill(726, 258, 112, "SUFFISANT", "green")}${pill(726, 310, 112, "ADAPTÉ", "green")}</g>
      ${pill(158, 438, 584, "UN DOUTE OU UNE LIMITE ABSENTE → NE PAS RACCORDER", "red")}`);
  }

  function hazardChoiceScene(expected) {
    return frame("OÙ SE TROUVE LA ZONE DE PROJECTION ?", "Choisir la zone dangereuse créée par le desserrage du raccord.", `
      <g transform="translate(116 170)"><path class="iv-hose-hero" d="M0 108H214" style="stroke:${C.blue}"/><path class="iv-mini-fitting" d="M196 82h94l26 26-26 26h-94z"/><circle class="iv-mini-body" cx="244" cy="108" r="34"/><path class="iv-danger-jet" d="M320 108H664"/><path class="iv-danger-cone" d="M320 108l296-72v144z"/>${text(492, 54, "JET POSSIBLE · SOUVENT INVISIBLE", "iv-note")}${text(244, 168, "RACCORD", "iv-box-title")}</g>
      ${button("identify-jet-axis", expected, 466, 388, 362, "DANS L’AXE DU RACCORD", "zone rouge à éviter", "red")}
      ${button("wrong-jet-side", expected, 72, 388, 330, "SUR LE CÔTÉ", "position de retrait", "green")}`);
  }

  function ppeChoiceScene(expected) {
    return frame("QUELLE PROTECTION RÉPOND AU RISQUE ?", "Choisir la protection des yeux et des mains avant une manipulation sous pression.", `
      <g class="iv-ppe-card" transform="translate(74 100)"><rect width="344" height="246" rx="24"/>${text(172, 50, "YEUX + MAINS", "iv-box-title")}<path class="iv-goggles" d="M54 86h88l14 52H76zM202 86h88l-22 52h-80zM142 105q23-20 46 0M42 72h262"/><path class="iv-glove" d="M150 204l-22-48 18-8 16 26-7-50 19-2 10 46 2-54 20 2-1 52 12-44 19 6-8 46 20-29 16 13-28 44-34 22z"/></g>
      <g class="iv-ppe-card warning" transform="translate(482 100)"><rect width="344" height="246" rx="24"/>${text(172, 50, "PIEDS SEULS", "iv-box-title")}<path class="iv-boot" d="M96 102h72v70l54 30v28H78v-28l18-30zM224 102h54v100h34v28H206v-28l18-30z"/></g>
      ${button("select-base-ppe", expected, 74, 392, 344, "LUNETTES + GANTS FROID", "avant de toucher au raccord", "green")}
      ${button("wrong-ppe-shoes", expected, 482, 392, 344, "CHAUSSURES SEULES", "protection incomplète", "red")}`);
  }

  function fluidChoiceScene(expected) {
    return frame("COMMENT IDENTIFIER LE FLUIDE ?", "Choisir une source technique fiable plutôt qu’un indice trompeur.", `
      <g class="iv-source-card"><rect x="42" y="92" width="378" height="264" rx="22"/><rect class="iv-nameplate" x="76" y="126" width="166" height="142" rx="10"/>${text(94, 158, "PLAQUE", "iv-box-title", "start")}${text(94, 190, "FLUIDE : …", "iv-label", "start")}${text(94, 220, "PS : …", "iv-label", "start")}<path class="iv-document" d="M278 126h104v142H278zM294 158h72m-72 28h72m-72 28h52"/>${text(330, 300, "DOSSIER + FDS", "iv-box-title")}</g>
      <g class="iv-source-card warning"><rect x="480" y="92" width="378" height="264" rx="22"/><path class="iv-hose-hero" d="M532 158h272" style="stroke:${C.blue}"/><path class="iv-hose-hero" d="M532 224h272" style="stroke:${C.red};stroke-dasharray:20 10"/>${text(669, 292, "COULEURS BP / HP", "iv-box-title")}${text(669, 326, "fonction des flexibles", "iv-small")}</g>
      ${button("identify-fluid", expected, 42, 402, 378, "PLAQUE + DOSSIER + FDS", "information traçable", "green")}
      ${button("wrong-fluid-color", expected, 480, 402, 378, "COULEUR DES FLEXIBLES", "ne donne pas le fluide", "red")}`);
  }

  function compatibilityChoiceScene(expected) {
    return frame("COMPATIBLE : QUELLE PREUVE ?", "Comparer les caractéristiques du circuit aux limites fabricant du matériel.", `
      <g class="iv-compare-row"><rect x="54" y="98" width="310" height="218" rx="22"/>${text(209, 142, "CIRCUIT", "iv-box-title")}${pill(88, 166, 242, "FLUIDE IDENTIFIÉ", "navy")}${pill(88, 220, 242, "PRESSION DE RÉFÉRENCE", "navy")}${text(209, 286, "plaque · dossier · procédure", "iv-small")}</g>
      ${text(450, 220, "≤", "iv-step-number")}
      <g class="iv-compare-row"><rect x="536" y="98" width="310" height="218" rx="22"/>${text(691, 142, "MATÉRIEL", "iv-box-title")}${pill(570, 166, 242, "LIMITES FABRICANT", "green")}${pill(570, 220, 242, "FLUIDE + RACCORDS ADAPTÉS", "green")}${text(691, 286, "manifold · flexibles · raccords", "iv-small")}</g>
      ${button("check-compatibility", expected, 54, 386, 512, "COMPARER LES SPÉCIFICATIONS", "accepter seulement si tout est lisible et suffisant", "green")}
      ${button("wrong-compat-color", expected, 598, 386, 248, "SE FIER AUX COULEURS", "preuve insuffisante", "red")}`);
  }

  function workAreaChoiceScene(expected) {
    return frame("LE POSTE EST-IL PRÊT ?", "Vérifier les accès, les informations de sécurité et la position des personnes avant d’ouvrir un bouchon.", `
      <g class="iv-work-area"><rect x="58" y="90" width="520" height="282" rx="24"/>${pill(88, 120, 210, "ACCÈS DÉGAGÉ", "green")}${pill(326, 120, 210, "FDS DISPONIBLE", "green")}${pill(88, 184, 210, "ARRÊT D’URGENCE REPÉRÉ", "green")}${pill(326, 184, 210, "PERSONNE DANS L’AXE : NON", "green")}<path class="iv-floor" d="M96 314h442M140 276h70l30-64h88l36 64h130"/>${text(318, 348, "AVANT LE PREMIER RACCORDEMENT", "iv-box-title")}</g>
      <g class="iv-work-area warning"><rect x="626" y="90" width="216" height="282" rx="24"/>${text(734, 142, "IMPROVISER", "iv-box-title")}${text(734, 196, "ouvrir d’abord", "iv-label")}${text(734, 226, "préparer ensuite", "iv-label")}${text(734, 286, "✕", "iv-step-number")}</g>
      ${button("check-work-area", expected, 110, 418, 420, "POSTE PRÉPARÉ AVANT D’AGIR", "accès · FDS · alerte · axe libre", "green")}${button("wrong-area-later", expected, 626, 418, 216, "PRÉPARER APRÈS", "ordre dangereux", "red")}`);
  }

  function glandSequenceLesson() {
    const gland = (x, state, label, note, kind) => `<g class="iv-gland-step ${kind}"><rect x="${x}" y="104" width="248" height="300" rx="22"/>${text(x + 124, 146, label, "iv-box-title")}<path class="iv-gland-stem" d="M${x + 38} 246h172"/><rect class="iv-gland-nut" x="${x + 88}" y="203" width="72" height="86" rx="12"/><rect class="iv-square" x="${x + 166}" y="220" width="48" height="52" rx="7"/>${state === "loose" ? `<path class="iv-turn-arrow" d="M${x + 76} 186q48-44 96 0"/>` : state === "move" ? `<path class="iv-move-arrow" d="M${x + 178} 190h54m-18-16 18 16-18 16"/>` : `<path class="iv-turn-arrow reverse" d="M${x + 76} 186q48-44 96 0"/>`}${text(x + 124, 330, note, "iv-label")}${pill(x + 38, 350, 172, state === "loose" ? "LÉGÈREMENT" : state === "move" ? "SANS FORCER" : "ÉTANCHÉITÉ RÉTABLIE", kind)}</g>`;
    return frame("LA RÈGLE AUTOUR DE CHAQUE MANŒUVRE", "Trois gestes distincts : desserrer légèrement le presse-étoupe, manœuvrer la tige, puis resserrer le presse-étoupe.", `${gland(42, "loose", "1 · DESSERRER", "libérer la tige", "amber")}<path class="iv-sequence-arrow" d="M300 254h48"/>${gland(360, "move", "2 · MANŒUVRER", "placer la tige", "blue")}<path class="iv-sequence-arrow" d="M618 254h48"/>${gland(678, "tight", "3 · RESSERRER", "avant de poursuivre", "green")}`, "0 0 968 500");
  }

  function isolationChoiceScene(expected) {
    return frame("QUEL ORGANE COUPE L’ALIMENTATION LIQUIDE ?", "Deux configurations possibles. Le schéma et la procédure du poste déterminent celle qui est utilisée.", `
      <g class="iv-method-card"><rect x="54" y="96" width="376" height="278" rx="24"/>${text(242, 140, "POSTE AVEC ÉLECTROVANNE NF", "iv-box-title")}<path class="iv-liquid-line" d="M100 236h284"/><g transform="translate(242 236)"><rect class="iv-solenoid" x="-48" y="-30" width="96" height="60" rx="12"/><rect class="iv-coil-body" x="-25" y="-88" width="50" height="58" rx="8"/><path class="iv-block" d="M-16-14l32 28m0-28-32 28"/></g>${pill(120, 302, 244, "COMMANDE → FERMÉE", "green")}</g>
      <g class="iv-method-card"><rect x="470" y="96" width="376" height="278" rx="24"/>${text(658, 140, "POSTE AVEC VANNE DÉPART LIQUIDE", "iv-box-title")}<path class="iv-liquid-line" d="M516 236h284"/><g transform="translate(658 236)"><path class="iv-manual-valve" d="M-58 0l34-34h48L58 0 24 34h-48z"/><path class="iv-valve-wheel" d="M0-34v-48m-42 0h84M-32-96l64 28m0-28-64 28"/></g>${pill(536, 302, 244, "MANŒUVRE → FERMÉE", "green")}</g>
      ${choiceButton("choose-isolation-method", "solenoid", expected, 54, 410, 376, "CHOISIR L’ÉLECTROVANNE", "si elle est prévue par le poste", "green")}
      ${choiceButton("choose-isolation-method", "liquid-valve", expected, 470, 410, 376, "CHOISIR LA VANNE LIQUIDE", "si elle est prévue par le poste", "green")}
      ${pill(194, 506, 512, "UN SEUL CHEMIN EST RETENU · JAMAIS AU HASARD", "red")}`);
  }

  function recoveryScene(e, action, expected) {
    const method = e.recovery.method || "solenoid";
    const liquidClosed = e.recovery.liquidFeed === "closed";
    const flowing = e.recovery.flowing;
    const stopped = e.recovery.stopped;
    const control = action?.control || "";
    if (control === "choose-isolation-method") return isolationChoiceScene(expected);
    const feedControl = method === "solenoid"
      ? `<g ${attrs("close-liquid-feed", expected, false, "iv-feed-control")} transform="translate(244 246)"><rect class="hit-target iv-solenoid" x="-42" y="-25" width="84" height="50" rx="10"/><rect class="iv-coil-body" x="-22" y="-74" width="44" height="49" rx="7"/>${liquidClosed ? `<path class="iv-block" d="M-15-13l30 26m0-26-30 26"/>` : ""}</g>`
      : `<g ${attrs("close-liquid-feed", expected, false, "iv-feed-control")} transform="translate(244 246)"><path class="hit-target iv-manual-valve" d="M-48 0l28-28h40L48 0 20 28h-40z"/><path class="iv-valve-wheel" d="M0-28v-42m-34 0h68M-26-82l52 24m0-24-52 24"/>${liquidClosed ? `<path class="iv-block" d="M-15-13l30 26m0-26-30 26"/>` : ""}</g>`;
    const activeFlow = flowing ? " active" : "";
    const actionButton = control === "recover-hose-fluid" ? button(control, expected, 686, 478, 270, "SUIVRE LE FLUIDE", "rouge → bleu → compresseur", "green")
      : control === "pumpdown-stop" ? button(control, expected, 686, 478, 270, "ARRÊT PUMP-DOWN", "critère du pressostat BP", "green")
      : control === "pressure-stable" ? button(control, expected, 686, 478, 270, "PRESSION STABILISÉE", "critère du plateau", "green")
      : control === "restore-liquid-feed" ? button(control, expected, 686, 478, 270, "RÉTABLIR LE LIQUIDE", method === "solenoid" ? "commande normale" : "position normale", "green") : "";
    return frame("DÉPOSE · LE FLUIDE EST RAMENÉ DANS L’INSTALLATION", "Le flexible rouge isolé communique par le manifold avec le flexible bleu et l’aspiration. Le compresseur ramène le fluide vers le condenseur et la bouteille liquide.", `
      <path class="iv-refrig-line hp" d="M566 154H354Q292 154 292 204v42H244M244 246H120v96"/><path class="iv-refrig-line bp" d="M120 342v118h322q64 0 108-52l38-46"/>
      <g class="iv-component condenser"><rect x="354" y="88" width="212" height="112" rx="18"/>${text(460, 130, "CONDENSEUR", "iv-box-title")}${text(460, 164, "le fluide se liquéfie", "iv-small")}</g>
      <g class="iv-component receiver"><rect x="82" y="154" width="76" height="142" rx="28"/>${text(120, 214, "BOUTEILLE", "iv-small")}${text(120, 238, "LIQUIDE", "iv-small")}</g>
      ${feedControl}${text(244, 310, method === "solenoid" ? "ÉLECTROVANNE NF" : "VANNE DÉPART LIQUIDE", "iv-small")}
      <g class="iv-component expansion"><path d="M88 342l32-28 32 28-32 28z"/>${text(120, 398, "DÉTENDEUR", "iv-small")}</g>
      <g class="iv-component evaporator"><rect x="204" y="414" width="224" height="92" rx="18"/>${text(316, 454, "ÉVAPORATEUR", "iv-box-title")}${text(316, 484, liquidClosed ? "alimentation liquide coupée" : "alimenté", "iv-small")}</g>
      <g class="iv-component compressor"><circle cx="602" cy="330" r="76"/>${text(602, 322, "COMPRESSEUR", "iv-box-title")}${text(602, 352, stopped ? "ARRÊTÉ PAR BP" : "ASPIRE", "iv-small")}</g>
      <path class="iv-refrig-flow${activeFlow}" d="M430 460H510Q554 460 582 398M618 260Q600 208 550 178M354 178H158"/>
      <g class="iv-manifold-mini" transform="translate(752 126)"><rect x="0" y="72" width="198" height="148" rx="22"/>${text(99, 104, "MANIFOLD 2 VOIES", "iv-box-title")}<circle class="iv-gauge-face hp" cx="142" cy="42" r="48"/><circle class="iv-gauge-face bp" cx="56" cy="42" r="48"/>${text(56, 50, "BP", "iv-gauge-word")}${text(142, 50, "HP", "iv-gauge-word")}<g ${attrs("manifold-bp", expected, false, "iv-knob")} transform="translate(56 198)"><circle class="iv-knob-shape bp" r="26"/><path d="M0-16V16" style="transform:rotate(${e.manifold.bp === "open" ? 90 : 0}deg)"/><circle class="hit-target iv-touch-target" r="63"/></g><g ${attrs("manifold-hp", expected, false, "iv-knob")} transform="translate(142 198)"><circle class="iv-knob-shape hp" r="26"/><path d="M0-16V16" style="transform:rotate(${e.manifold.hp === "open" ? 90 : 0}deg)"/><circle class="hit-target iv-touch-target" r="63"/></g></g>
      <circle class="iv-service-point hp" cx="646" cy="228" r="20"/><circle class="iv-service-point bp" cx="646" cy="410" r="20"/>${text(646, 235, "P", "iv-port-label")}${text(646, 417, "P", "iv-port-label")}
      <path class="iv-hose hp" d="M646 228C700 228 716 202 752 198"/><path class="iv-hose bp" d="M646 410C700 410 708 320 808 346"/>
      <path class="iv-hose-flow red${activeFlow}" d="M646 228C700 228 716 202 752 198M894 324H850C786 324 730 410 646 410"/>
      ${pill(682, 388, 282, `HP : ${e.hp.stem === "rear" ? "P ISOLÉE" : "P OUVERTE"}`, e.hp.stem === "rear" ? "green" : "red")}
      ${pill(682, 430, 282, `BP : ${e.bp.stem === "mid" ? "VERS ASPIRATION" : "P ISOLÉE"}`, e.bp.stem === "mid" ? "blue" : "green")}
      ${actionButton}
      ${control === "close-liquid-feed" ? button("close-liquid-feed", expected, 62, 514, 364, liquidClosed ? "ALIMENTATION LIQUIDE FERMÉE" : "FERMER L’ALIMENTATION LIQUIDE", method === "solenoid" ? "électrovanne du poste" : "vanne départ liquide du poste", "green") : pill(64, 548, 560, flowing ? "FLUIDE EN MOUVEMENT → STOCKAGE CÔTÉ LIQUIDE" : stopped ? "PRESSION ABAISSÉE · COMPRESSEUR ARRÊTÉ" : "LE COMPRESSEUR RESTE EN MARCHE POUR RAVALER", flowing ? "green" : "navy")}`,
      "0 0 1000 600", "iv-recovery-scene");
  }

  function finalLeakScene(e, control = "", expected = "", interactive = true) {
    const checked = (id) => e.finalLeaks.has(id);
    const valve = (x, side) => {
      const hp = side === "hp";
      const glandId = `leak-final-${side}-gland`;
      const portId = `leak-final-${side}-port`;
      return `<g class="iv-leak-valve"><rect x="${x}" y="104" width="372" height="310" rx="24"/>${text(x + 186, 146, `ROTALOCK ${side.toUpperCase()}`, "iv-box-title")}<path class="iv-valve-body" d="M${x + 54} 256h250l36 42-36 42h-250l-36-42z"/><rect class="iv-gland-nut" x="${x + 272}" y="264" width="52" height="68" rx="10"/><rect class="iv-cap" x="${x + 318}" y="268" width="42" height="60" rx="8"/><path class="iv-port-neck service" d="M${x + 166} 256v-72h72v72"/><path class="iv-cap" d="M${x + 158} 188h88l-10-38h-68z"/>
        ${interactive ? `<g ${attrs(glandId, expected, false, "iv-leak-target")}><circle class="hit-target" cx="${x + 298}" cy="298" r="46"/><circle class="hit-target iv-touch-target" cx="${x + 298}" cy="298" r="64"/></g>${text(x + 186, 374, checked(glandId) ? "PRESSE-ÉTOUPE · CONTRÔLÉ" : "PRESSE-ÉTOUPE", "iv-small")}<g ${attrs(portId, expected, false, "iv-leak-target")}><circle class="hit-target" cx="${x + 202}" cy="166" r="48"/><circle class="hit-target iv-touch-target" cx="${x + 202}" cy="166" r="64"/></g>${text(x + 186, 406, checked(portId) ? "BOUCHON P · CONTRÔLÉ" : "BOUCHON P", "iv-small")}` : `${pill(x + 66, 356, 240, "PRESSE-ÉTOUPE CONTRÔLÉ", "green")}${pill(x + 66, 398, 240, "BOUCHON P CONTRÔLÉ", "green")}`}
        ${checked(glandId) ? `<path class="iv-check-mark" d="M${x + 276} 294l14 14 30-36"/>` : ""}${checked(portId) ? `<path class="iv-check-mark" d="M${x + 180} 162l14 14 30-36"/>` : ""}</g>`;
    };
    const allFour = ["leak-final-hp-gland", "leak-final-hp-port", "leak-final-bp-gland", "leak-final-bp-port"].every((id) => checked(id));
    return frame("RECHERCHE DE FUITE · TOUS LES POINTS MANIPULÉS", "Balayage lent des deux bouchons P et des deux presse-étoupes. Chaque point est contrôlé séparément après remise en service.", `${valve(56, "bp")}${valve(472, "hp")}${pill(220, 58, 460, "PRESSE-ÉTOUPES SERRÉS · BOUCHONS REMIS", "green")}${interactive && control === "leak-final-confirm" ? button("leak-final-confirm", expected, 250, 464, 400, "CONCLURE LA RECHERCHE", allFour ? "4 points contrôlés · aucune alerte" : "contrôles incomplets", "green") : ""}${!interactive ? pill(248, 466, 404, "4 POINTS · BALAYAGE LENT · SECOND PASSAGE SI ALERTE", "navy") : ""}`);
  }

  function hoseScene(e, expected) {
    const hose = (y, color, label, desc, dash = "") => `<g><path class="iv-hose-hero" d="M150 ${y}C250 ${y - 46} 350 ${y + 46} 470 ${y}S680 ${y - 42} 722 ${y}" style="stroke:${color};${dash}"/><circle class="iv-fitting" cx="126" cy="${y}" r="28"/>${hoseValve("", "closed", "", 770, y, 0, .68, false)}${text(92, y + 8, label, "iv-port-label")}${text(435, y - 48, desc, "iv-note")}</g>`;
    return frame("TROIS FLEXIBLES · TROIS MINI-VANNES QUART DE TOUR", "Trois flexibles largement espacés avec leurs raccords, leurs joints et une mini-vanne sertie à l’extrémité.", `${hose(154, C.blue, "BP", "BLEU · JOINTS · GAINE · MINI-VANNE")}${hose(284, C.red, "HP", "ROUGE · JOINTS · GAINE · MINI-VANNE", "stroke-dasharray:20 10")}${hose(414, C.amber, "S", "JAUNE · JOINTS · GAINE · MINI-VANNE", "stroke-dasharray:4 12")}${button("inspect-hoses", expected, 300, 474, 300, "FLEXIBLES CONTRÔLÉS", "3 mini-vannes présentes", "green")}`);
  }

  function miniRotalock(x, side, connected, miniState = "closed") {
    const bp = side === "bp";
    const color = bp ? C.blue : C.red;
    return `<g transform="translate(${x} 330)"><path class="iv-pipe" d="M0 96h76M310 96h72" style="stroke:${color};${bp ? "" : "stroke-dasharray:18 9"}"/><path class="iv-valve-body" d="M64 44h248l40 52-40 52H64L24 96z"/><path class="iv-port-neck" d="M118 44V0h66v44"/><path class="iv-port-neck service" d="M244 44V0h66v44"/><circle class="iv-p1" cx="151" cy="0" r="25"/><circle class="iv-p" cx="277" cy="0" r="25"/>${text(151, 8, "P1", "iv-port-label")}${text(277, 8, "P", "iv-port-label")}${text(151, -39, "PRESSOSTAT", "iv-small")}${text(277, -39, "MANIFOLD", "iv-small")}${connected ? `<path class="iv-hose ${bp ? "bp" : "hp"}" d="M277-25C277-74 245-92 229-112M201-139l-15-21"/>${hoseValve("", miniState, "", 216, -125, 53, .54, false)}` : ""}</g>`;
  }

  function connectionScene(e, expected, interactive = false) {
    const body = `<g transform="translate(300 70) scale(.67)">${gauge("bp", 170, 156, "zero", "", "")}${gauge("hp", 430, 156, "zero", "", "")}<rect class="iv-manifold-body" x="88" y="218" width="424" height="94" rx="25"/>${text(300, 273, "MANIFOLD 2 VOIES", "iv-box-title")}</g>
      ${miniRotalock(30, "bp", true, e.mini.blue)}${miniRotalock(490, "hp", true, e.mini.red)}
      ${pill(48, 260, 250, "BLEU → P DE LA BP", "blue")}${pill(602, 260, 250, "ROUGE → P DE LA HP", "red")}
      ${pill(310, 500, 280, "JAUNE → ÉQUIPEMENT SERVICE", "amber")}
      <path class="iv-hose amber" d="M450 278V370M450 416V498"/>${hoseValve("", e.mini.yellow, "", 450, 393, 90, .54, false)}
      ${interactive ? button("check-path", expected, 326, 442, 248, "CHEMIN VÉRIFIÉ", "aucun flexible sur P1", "green") : ""}`;
    return frame("RACCORDEMENTS · LES ÉLÉMENTS SONT SÉPARÉS", "Vue d’ensemble claire : les flexibles bleu et rouge vont sur P, jamais sur P1.", body);
  }

  function pumpScene(e, action, expected) {
    const on = e.pump.power === "on";
    const pathOpen = e.pump.isolation === "open" && e.manifold.bp === "open" && e.manifold.hp === "open" && e.mini.blue === "open" && e.mini.red === "open" && e.mini.yellow === "open";
    const control = action.control;
    const extraAction = control === "vacuum-check" || control === "leak-check" ? button(control, expected, 562, 424, 284, control === "vacuum-check" ? "VIDE DES LIGNES" : "TENUE DU VIDE", "critère du plateau", "green") : "";
    return frame("MISE AU VIDE DES LIGNES · INSTALLATION ISOLÉE", "Le manifold et la pompe sont visibles, les vannes Rotolock restent résumées au siège arrière.", `
      <g transform="translate(42 96) scale(.64)">${gauge("bp", 170, 156, e.vacuumReached || on ? "vacuum" : "zero", "zero-bp", expected)}${gauge("hp", 430, 156, e.vacuumReached || on ? "vacuum" : "zero", "zero-hp", expected)}<rect class="iv-manifold-body" x="72" y="218" width="456" height="118" rx="26"/><g ${attrs("manifold-bp", expected, false, "iv-knob")} transform="translate(175 333)"><circle class="hit-target iv-knob-shape bp" r="36"/><path d="M0-21V21" style="transform:rotate(${e.manifold.bp === "open" ? 90 : 0}deg)"/></g><g ${attrs("manifold-hp", expected, false, "iv-knob")} transform="translate(425 333)"><circle class="hit-target iv-knob-shape hp" r="36"/><path d="M0-21V21" style="transform:rotate(${e.manifold.hp === "open" ? 90 : 0}deg)"/></g></g>
      <path class="iv-hose amber${e.pump.connected ? " active" : ""}" d="M234 360C300 406 414 410 526 356"/>${e.pump.connected ? hoseValve("mini-yellow", e.mini.yellow, expected, 468, 378, -14, .68, true) : ""}
      <g class="iv-pump"><rect x="516" y="202" width="330" height="198" rx="24"/><path d="M548 244h132v90H548zM578 244v90m34-90v90m34-90v90"/><g ${attrs("connect-yellow", expected)}><circle class="hit-target iv-p" cx="526" cy="356" r="31"/>${text(526, 365, "P", "iv-port-label")}</g><g ${attrs("pump-isolation", expected, false, "iv-knob")} transform="translate(746 264)"><circle class="hit-target iv-knob-shape pump" r="33"/><path d="M0-20V20" style="transform:rotate(${e.pump.isolation === "open" ? 90 : 0}deg)"/></g><g ${attrs("pump-power", expected)}><rect class="hit-target iv-power ${on ? "on" : ""}" x="704" y="323" width="84" height="52" rx="10"/>${text(746, 357, on ? "MARCHE" : "ARRÊT", "iv-button-title")}</g></g>
      ${pill(52, 432, 416, "ROTALOCK BP + HP : SIÈGE ARRIÈRE · P ISOLÉE", "green")}
      ${pathOpen ? pill(526, 120, 320, on ? "POMPE EN MARCHE · LIGNES SOUS VIDE" : "TRAJET PRÊT · 3 MINI-VANNES OUVERTES", on ? "green" : "amber") : pill(526, 120, 320, "TRAJET EN COURS DE PRÉPARATION", "navy")}${extraAction}`);
  }

  function finalScene(expected, storage = false) {
    if (storage) return frame("RANGER SANS PLI SERRÉ", "Manifold protégé et trois flexibles enroulés, mini-vannes fermées, sans coude serré.", `<g class="iv-storage"><rect x="188" y="112" width="524" height="304" rx="28"/>${text(450, 158, "MANIFOLD PROTÉGÉ", "iv-heading")}</g><circle class="iv-coil bp" cx="305" cy="286" r="78"/><circle class="iv-coil hp" cx="450" cy="286" r="78"/><circle class="iv-coil amber" cx="595" cy="286" r="78"/>${text(305, 294, "BP", "iv-port-label")}${text(450, 294, "HP", "iv-port-label")}${text(595, 294, "S", "iv-port-label")}${hoseValve("", "closed", "", 305, 378, 0, .42, false)}${hoseValve("", "closed", "", 450, 378, 0, .42, false)}${hoseValve("", "closed", "", 595, 378, 0, .42, false)}${button("store", expected, 284, 456, 332, "RANGER LE MANIFOLD", "mini-vannes fermées · aiguilles à zéro", "green")}`);
    const checkedValve = (x, side, kind) => `<g class="iv-final-valve"><rect x="${x}" y="116" width="356" height="276" rx="24"/>${text(x + 178, 158, `ROTALOCK ${side}`, "iv-box-title")}${pill(x + 60, 182, 236, "SIÈGE ARRIÈRE", "green")}${pill(x + 60, 234, 236, "PRESSE-ÉTOUPE SERRÉ", "green")}${pill(x + 60, 286, 236, "BOUCHON P REMIS", "green")}${pill(x + 60, 338, 236, "BOUCHON CARRÉ REMIS", "green")}</g>`;
    return frame("CONTRÔLE FINAL · REMISE EN SERVICE ET ÉTANCHÉITÉ VÉRIFIÉES", "Vannes au siège arrière, presse-étoupes serrés, bouchons remis, alimentation liquide rétablie et recherche de fuite terminée.", `${pill(48, 66, 250, "ALIMENTATION RÉTABLIE", "green")}${pill(325, 66, 250, "3 MINI-VANNES FERMÉES", "green")}${pill(602, 66, 250, "FUITE · 4 POINTS CONTRÔLÉS", "green")}${checkedValve(70, "BP")}${checkedValve(474, "HP")}${button("final-check", expected, 282, 448, 336, "CONTRÔLE FINAL", "positions · presse-étoupes · bouchons · fuite", "green")}`);
  }

  function lesson(kind, options = {}) {
    if (kind === "anatomy") return manifoldScene(options.equipment, null, "", true);
    if (kind === "safety-risk") return safetyRiskLesson();
    if (kind === "compatibility") return compatibilityLesson();
    if (kind === "connections") return recognitionLesson();
    if (kind === "gland-sequence") return glandSequenceLesson();
    if (kind === "valve") return cutaway(options.position, options.side || "bp");
    if (kind === "vacuum") return pumpScene(options.equipment, { control: "" }, "");
    if (kind === "recovery") return recoveryScene(options.equipment, { control: "" }, "");
    if (kind === "final-leak") return finalLeakScene(options.equipment, "", "", false);
    return manifoldScene(options.equipment, null, "", false);
  }

  function practice(equipment, action, expected) {
    const control = action.control;
    if (control === "identify-jet-axis") return hazardChoiceScene(expected);
    if (control === "select-base-ppe") return ppeChoiceScene(expected);
    if (control === "identify-fluid") return fluidChoiceScene(expected);
    if (control === "check-compatibility") return compatibilityChoiceScene(expected);
    if (control === "check-work-area") return workAreaChoiceScene(expected);
    if (["choose-isolation-method", "close-liquid-feed", "recover-hose-fluid", "pumpdown-stop", "pressure-stable", "restore-liquid-feed"].includes(control) || (action.phase === "remove" && ["manifold-bp", "manifold-hp"].includes(control))) return recoveryScene(equipment, action, expected);
    if (control.startsWith("leak-final-")) return finalLeakScene(equipment, control, expected, true);
    if (action.side) return rotalockScene(equipment, action, expected);
    if (control === "inspect-hoses") return hoseScene(equipment, expected);
    if (control === "check-path") return connectionScene(equipment, expected, true);
    if (control === "final-check") return finalScene(expected, false);
    if (control === "store") return finalScene(expected, true);
    if (["connect-yellow", "mini-yellow", "pump-isolation", "pump-power", "vacuum-check"].includes(control) || (control === "leak-check" && action.expect === "vacuum")) return pumpScene(equipment, action, expected);
    return manifoldScene(equipment, action, expected, false);
  }

  root.Mano2Visuals = { lesson, practice, cutaway, connectionScene };
})(window);
