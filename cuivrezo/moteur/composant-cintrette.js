const cintretteTemplate = document.createElement("template");

cintretteTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      contain: content;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    text {
      font-family: Calibri, "Segoe UI", system-ui, Arial, sans-serif;
      fill: #10233c;
      user-select: none;
    }

    .degree { fill: #1b3a63; font-size: 17px; font-weight: 900; }
    .engraving { fill: #1b3a63; font-size: 16px; font-weight: 900; letter-spacing: .06em; }
    .handle-label { fill: #10233c; font-size: 14px; font-weight: 900; letter-spacing: .08em; }
    .guide-label { fill: #c9451a; font-size: 13px; font-weight: 900; }
    .callout { fill: #1b3a63; font-size: 26px; font-weight: 900; }
    .small { fill: #637285; font-size: 14px; font-weight: 700; }

    #moving-assembly, #moving-back { will-change: transform; }
    #radius-guide,
    #neutral-line,
    #tube-mark,
    #mark-label { opacity: 0; transition: opacity 160ms ease; }
    :host([show-radius]) #radius-guide,
    :host([show-neutral]) #neutral-line,
    :host([show-mark]) #tube-mark,
    :host([show-mark]) #mark-label { opacity: 1; }
  </style>

  <!-- Géométrie de la vraie cintrette (01/10/2026) : la poignée fixe pend sous la forme et son
       crochet tient le tube ; le guide, posé sur le tube, est prolongé par la poignée mobile ;
       à 90°, le tube descend entre la forme et le guide. Aplats de la charte, ni dégradé ni ombre. -->
  <svg viewBox="0 0 900 690" role="img" aria-labelledby="cintrette-title cintrette-desc">
    <title id="cintrette-title">Cintrette manuelle à deux poignées</title>
    <desc id="cintrette-desc">Schéma pédagogique d’une cintrette 5/8 pouce. La poignée fixe pend sous la forme et son crochet tient le tube. La poignée mobile entraîne le guide autour de la forme. Le tube de cuivre s’enroule dans la gorge et descend le long du guide.</desc>

    <defs>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="#3d7fca"/>
      </marker>
    </defs>

    <g id="angle-sweep" opacity=".95">
      <path id="sweep-path" d="" fill="none" stroke="#ff6b35" stroke-width="7" stroke-linecap="round"/>
      <path id="sweep-outline" d="" fill="none" stroke="#c9451a" stroke-width="1.5" stroke-linecap="round"/>
      <text id="sweep-label" class="callout" x="120" y="110" text-anchor="middle">0°</text>
    </g>

    <!-- la plaque du guide passe derrière la forme : seul le guide se voit -->
    <g id="moving-back">
      <path d="M450 300 L450 172" fill="none" stroke="#1b3a63" stroke-width="40" stroke-linecap="round"/>
      <path d="M450 300 L450 172" fill="none" stroke="#9aa6b2" stroke-width="30" stroke-linecap="round"/>
    </g>

    <g id="fixed-handle">
      <path d="M300 300 L450 300 M300 206 L300 640" fill="none" stroke="#1b3a63" stroke-width="44" stroke-linecap="round"/>
      <path d="M300 300 L450 300 M300 206 L300 640" fill="none" stroke="#9aa6b2" stroke-width="32" stroke-linecap="round"/>
      <path d="M300 530 L300 640" fill="none" stroke="#1b3a63" stroke-width="48" stroke-linecap="round"/>
      <path d="M300 530 L300 640" fill="none" stroke="#84b7ec" stroke-width="36" stroke-linecap="round"/>
      <text class="handle-label" x="300" y="590" text-anchor="middle" transform="rotate(-90 300 585)">FIXE</text>
    </g>

    <g id="fixed-form">
      <circle cx="450" cy="300" r="118" fill="#cfd8e2" stroke="#1b3a63" stroke-width="4"/>
      <circle cx="450" cy="300" r="102" fill="none" stroke="#9aa6b2" stroke-width="10"/>

      <g aria-label="Graduations de la cintrette">
        <path d="M450 228 V214 M500.9 249.1 L510.8 239.2 M522 300 H536 M500.9 350.9 L510.8 360.8 M450 372 V386"
              stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>
        <text class="degree" x="450" y="250" text-anchor="middle">0</text>
        <text class="degree" x="486" y="270" text-anchor="middle">45</text>
        <text class="degree" x="503" y="306" text-anchor="middle">90</text>
        <text class="degree" x="450" y="364" text-anchor="middle">180</text>
      </g>

      <rect x="350" y="318" width="66" height="30" rx="15" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
      <text class="engraving" x="383" y="339" text-anchor="middle">5/8″</text>
    </g>

    <g id="multilayer-tube" pointer-events="none">
      <path id="tube-outline" d="" fill="none" stroke="#1b3a63" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="tube-main" d="" fill="none" stroke="#c77a3a" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="tube-highlight" d="" fill="none" stroke="#e8a46c" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="neutral-line" d="" fill="none" stroke="#1b3a63" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line id="tube-mark" x1="450" y1="183" x2="450" y2="213" stroke="#10233c" stroke-width="7" stroke-linecap="round"/>
      <g id="mark-label">
        <rect x="320" y="128" width="104" height="32" rx="16" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/>
        <text x="372" y="149" text-anchor="middle" fill="#c9451a" font-size="14" font-weight="900">TRAIT DE COTE</text>
        <path d="M412 160 L446 186" stroke="#c9451a" stroke-width="2"/>
      </g>
    </g>

    <g id="fixed-hook" aria-label="Crochet de la poignée fixe">
      <path d="M284 212 V174 H316 V212" fill="none" stroke="#1b3a63" stroke-width="13" stroke-linejoin="round"/>
      <path d="M284 212 V174 H316 V212" fill="none" stroke="#9aa6b2" stroke-width="7" stroke-linejoin="round"/>
    </g>

    <g id="moving-assembly">
      <path d="M585 172 L798 75" fill="none" stroke="#1b3a63" stroke-width="44" stroke-linecap="round"/>
      <path d="M585 172 L798 75" fill="none" stroke="#9aa6b2" stroke-width="32" stroke-linecap="round"/>
      <path d="M712 115 L798 75" fill="none" stroke="#1b3a63" stroke-width="48" stroke-linecap="round"/>
      <path d="M712 115 L798 75" fill="none" stroke="#ff6b35" stroke-width="36" stroke-linecap="round"/>
      <text class="handle-label" x="755" y="100" text-anchor="middle" transform="rotate(-24.5 755 95)">MOBILE</text>

      <g id="mobile-guide">
        <rect x="430" y="158" width="170" height="28" rx="6" fill="#e3e9ef" stroke="#1b3a63" stroke-width="4"/>
        <path d="M440 182 H590" stroke="#1b3a63" stroke-width="3" opacity=".55"/>
        <rect x="470" y="118" width="120" height="25" rx="12.5" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/>
        <text class="guide-label" x="530" y="135" text-anchor="middle">GUIDE MOBILE</text>
      </g>
      <line x1="450" y1="158" x2="450" y2="146" stroke="#c9451a" stroke-width="5" stroke-linecap="round"/>
      <text class="engraving" x="450" y="138" text-anchor="middle">0</text>
    </g>

    <g id="axis">
      <circle cx="450" cy="300" r="35" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
      <circle cx="450" cy="300" r="23" fill="#cfd8e2" stroke="#65788a" stroke-width="3"/>
      <path d="M450 277 V323 M427 300 H473" stroke="#1b3a63" stroke-width="2" opacity=".42"/>
    </g>

    <g id="radius-guide" pointer-events="none">
      <line x1="450" y1="300" x2="411" y2="206" stroke="#3d7fca" stroke-width="4" stroke-dasharray="10 8" marker-end="url(#arrow-blue)"/>
      <rect x="352" y="238" width="58" height="34" rx="17" fill="#fffdf8" stroke="#3d7fca" stroke-width="3"/>
      <text x="381" y="262" text-anchor="middle" fill="#1b3a63" font-size="18" font-weight="900">Rc</text>
    </g>

    <g aria-hidden="true">
      <text class="small" x="860" y="676" text-anchor="end">Schéma pédagogique</text>
    </g>
  </svg>
`;

class CintretteLab extends HTMLElement {
  static get observedAttributes() { return ["angle", "tube-offset"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(cintretteTemplate.content.cloneNode(true));
    this._angle = 0;
    this._tubeOffset = 0;
  }

  connectedCallback() {
    this._els = {
      movingAssembly: this.shadowRoot.querySelector("#moving-assembly"),
      movingBack: this.shadowRoot.querySelector("#moving-back"),
      tubeOutline: this.shadowRoot.querySelector("#tube-outline"),
      tubeMain: this.shadowRoot.querySelector("#tube-main"),
      tubeHighlight: this.shadowRoot.querySelector("#tube-highlight"),
      neutralLine: this.shadowRoot.querySelector("#neutral-line"),
      multilayerTube: this.shadowRoot.querySelector("#multilayer-tube"),
      sweepPath: this.shadowRoot.querySelector("#sweep-path"),
      sweepOutline: this.shadowRoot.querySelector("#sweep-outline"),
      sweepLabel: this.shadowRoot.querySelector("#sweep-label")
    };
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "angle" && oldValue !== newValue) {
      this._angle = CintretteLab.clampAngle(Number(newValue));
      if (this._els) this.render();
    }
    if (name === "tube-offset" && oldValue !== newValue) {
      this._tubeOffset = CintretteLab.clampTubeOffset(Number(newValue));
      if (this._els) this.render();
    }
  }

  get angle() { return this._angle; }

  set angle(value) {
    const next = CintretteLab.clampAngle(Number(value));
    this._angle = next;
    if (this.getAttribute("angle") !== String(next)) this.setAttribute("angle", String(next));
    if (this._els) this.render();
  }

  get tubeOffset() { return this._tubeOffset; }

  set tubeOffset(value) {
    const next = CintretteLab.clampTubeOffset(Number(value));
    this._tubeOffset = next;
    if (this.getAttribute("tube-offset") !== String(next)) this.setAttribute("tube-offset", String(next));
    if (this._els) this.render();
  }

  static clampAngle(value) {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(180, value));
  }

  static clampTubeOffset(value) {
    if (!Number.isFinite(value)) return 0;
    return Math.max(-100, Math.min(100, value));
  }

  render() {
    const angle = this._angle;
    const cx = 450;
    const cy = 300;
    const radius = 102;
    const startPhi = -Math.PI / 2;
    const endPhi = startPhi + angle * Math.PI / 180;
    const endX = cx + radius * Math.cos(endPhi);
    const endY = cy + radius * Math.sin(endPhi);
    const directionX = Math.cos(angle * Math.PI / 180);
    const directionY = Math.sin(angle * Math.PI / 180);

    const limits = [];
    if (directionX > .001) limits.push((850 - endX) / directionX);
    if (directionX < -.001) limits.push((50 - endX) / directionX);
    if (directionY > .001) limits.push((660 - endY) / directionY);
    if (directionY < -.001) limits.push((45 - endY) / directionY);
    const distanceToEdge = Math.min(400, ...limits.filter((value) => value > 0));
    const outX = endX + directionX * distanceToEdge;
    const outY = endY + directionY * distanceToEdge;
    const largeArc = angle > 180 ? 1 : 0;

    const tubePath = angle < .1
      ? `M50 ${cy - radius} L850 ${cy - radius}`
      : `M50 ${cy - radius} L${cx} ${cy - radius} A${radius} ${radius} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)} L${outX.toFixed(2)} ${outY.toFixed(2)}`;

    this._els.tubeOutline.setAttribute("d", tubePath);
    this._els.tubeMain.setAttribute("d", tubePath);
    this._els.tubeHighlight.setAttribute("d", tubePath);
    this._els.neutralLine.setAttribute("d", tubePath);
    this._els.multilayerTube.setAttribute("transform", `translate(${this._tubeOffset} 0)`);
    this._els.movingAssembly.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);
    this._els.movingBack.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);

    /* l'arc orange suit la poignée mobile, à 287 du centre (point du manche en 680,130) */
    const sweepRadius = 287;
    const handleStart = Math.atan2(-170, 230);
    const handleEnd = handleStart + angle * Math.PI / 180;
    const startX = cx + sweepRadius * Math.cos(handleStart);
    const startY = cy + sweepRadius * Math.sin(handleStart);
    const sweepEndX = cx + sweepRadius * Math.cos(handleEnd);
    const sweepEndY = cy + sweepRadius * Math.sin(handleEnd);
    const sweep = angle < .1
      ? `M${startX.toFixed(2)} ${startY.toFixed(2)} l.01 .01`
      : `M${startX.toFixed(2)} ${startY.toFixed(2)} A${sweepRadius} ${sweepRadius} 0 0 1 ${sweepEndX.toFixed(2)} ${sweepEndY.toFixed(2)}`;
    this._els.sweepPath.setAttribute("d", sweep);
    this._els.sweepOutline.setAttribute("d", sweep);

    /* l'angle s'affiche en haut à gauche, là où ni le tube ni les poignées ne passent */
    this._els.sweepLabel.textContent = `${Math.round(angle)}°`;
  }
}

customElements.define("cintrette-lab", CintretteLab);
