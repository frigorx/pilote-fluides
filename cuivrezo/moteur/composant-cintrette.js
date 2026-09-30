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

    .outline { stroke: #1b3a63; stroke-linecap: round; stroke-linejoin: round; }
    .degree { fill: #1b3a63; font-size: 17px; font-weight: 900; }
    .engraving { fill: #1b3a63; font-size: 16px; font-weight: 900; letter-spacing: .06em; }
    .handle-label { fill: #fff; font-size: 14px; font-weight: 900; letter-spacing: .08em; }
    .guide-label { fill: #c9451a; font-size: 13px; font-weight: 900; }
    .callout { fill: #1b3a63; font-size: 17px; font-weight: 900; }
    .small { fill: #637285; font-size: 14px; font-weight: 700; }
    .screen-shadow { filter: url(#soft-shadow); }

    #moving-assembly { will-change: transform; }
    #radius-guide,
    #neutral-line,
    #tube-mark,
    #mark-label { opacity: 0; transition: opacity 160ms ease; }
    :host([show-radius]) #radius-guide,
    :host([show-neutral]) #neutral-line,
    :host([show-mark]) #tube-mark,
    :host([show-mark]) #mark-label { opacity: 1; }

    @media print {
      .screen-shadow { filter: none; }
    }
  </style>

  <svg viewBox="0 0 900 590" role="img" aria-labelledby="cintrette-title cintrette-desc">
    <title id="cintrette-title">Cintrette manuelle à deux poignées</title>
    <desc id="cintrette-desc">Schéma pédagogique original d’une cintrette 5/8 pouce. La poignée fixe reste immobile. La poignée mobile entraîne le guide de zéro à cent quatre-vingts degrés autour de l’axe. Le tube multicouche de diamètre seize millimètres suit la forme.</desc>

    <defs>
      <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f7fafc"/>
        <stop offset=".5" stop-color="#ced8e2"/>
        <stop offset="1" stop-color="#a8b5c2"/>
      </linearGradient>
      <linearGradient id="mobile-grip" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff875c"/>
        <stop offset="1" stop-color="#c9451a"/>
      </linearGradient>
      <linearGradient id="multilayer" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".52" stop-color="#eef4f8"/>
        <stop offset="1" stop-color="#c8d3dc"/>
      </linearGradient>
      <radialGradient id="pivot" cx="35%" cy="30%">
        <stop offset="0" stop-color="#fff"/>
        <stop offset=".38" stop-color="#dbe3ea"/>
        <stop offset="1" stop-color="#8394a4"/>
      </radialGradient>
      <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="7" stdDeviation="7" flood-color="#1b3a63" flood-opacity=".16"/>
      </filter>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="#3d7fca"/>
      </marker>
    </defs>

    <g id="angle-sweep" opacity=".95">
      <path id="sweep-path" d="" fill="none" stroke="#ff6b35" stroke-width="7" stroke-linecap="round"/>
      <path id="sweep-outline" d="" fill="none" stroke="#c9451a" stroke-width="1.5" stroke-linecap="round"/>
      <text id="sweep-label" class="callout" x="450" y="85" text-anchor="middle">0°</text>
    </g>

    <g id="fixed-handle" class="screen-shadow">
      <path d="M450 320 L110 475" fill="none" class="outline" stroke-width="58"/>
      <path d="M450 320 L110 475" fill="none" stroke="url(#steel)" stroke-width="43" stroke-linecap="round"/>
      <path d="M240 416 L110 475" fill="none" stroke="#1b3a63" stroke-width="48" stroke-linecap="round"/>
      <path d="M240 416 L110 475" fill="none" stroke="#3d7fca" stroke-width="37" stroke-linecap="round"/>
      <text class="handle-label" x="174" y="448" text-anchor="middle" transform="rotate(-24.5 174 448)">FIXE</text>
    </g>

    <g id="fixed-form" class="screen-shadow">
      <path d="M450 176 A144 144 0 0 1 450 464 L450 410 A90 90 0 0 0 450 230 Z"
            fill="url(#steel)" stroke="#1b3a63" stroke-width="4" stroke-linejoin="round"/>
      <path d="M450 193 A127 127 0 0 1 450 447" fill="none" stroke="#748696" stroke-width="11"/>
      <path d="M450 202 A118 118 0 0 1 450 438" fill="none" stroke="#fffdf8" stroke-width="4" opacity=".72"/>

      <g aria-label="Graduations de la cintrette">
        <line x1="450" y1="174" x2="450" y2="151" stroke="#1b3a63" stroke-width="5"/>
        <line x1="552" y1="218" x2="568" y2="202" stroke="#1b3a63" stroke-width="5"/>
        <line x1="594" y1="320" x2="617" y2="320" stroke="#1b3a63" stroke-width="5"/>
        <line x1="450" y1="466" x2="450" y2="489" stroke="#1b3a63" stroke-width="5"/>
        <text class="degree" x="450" y="138" text-anchor="middle">0</text>
        <text class="degree" x="582" y="193" text-anchor="middle">45</text>
        <text class="degree" x="636" y="326" text-anchor="middle">90</text>
        <text class="degree" x="450" y="516" text-anchor="middle">180</text>
      </g>

      <rect x="488" y="290" width="75" height="31" rx="15" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
      <text class="engraving" x="525" y="311" text-anchor="middle">5/8″</text>
    </g>

    <g id="multilayer-tube" pointer-events="none">
      <path id="tube-outline" d="" fill="none" stroke="#526779" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="tube-main" d="" fill="none" stroke="url(#multilayer)" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="tube-highlight" d="" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
      <path id="neutral-line" d="" fill="none" stroke="#1b3a63" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line id="tube-mark" x1="450" y1="203" x2="450" y2="233" stroke="#c9451a" stroke-width="7" stroke-linecap="round"/>
      <g id="mark-label">
        <rect x="335" y="150" width="104" height="32" rx="16" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/>
        <text x="387" y="171" text-anchor="middle" fill="#c9451a" font-size="14" font-weight="900">TRAIT DE COTE</text>
        <path d="M430 176 L448 205" stroke="#c9451a" stroke-width="2"/>
      </g>
    </g>

    <g id="moving-assembly" class="screen-shadow">
      <path d="M450 320 L450 196" fill="none" stroke="#c9451a" stroke-width="37" stroke-linecap="round"/>
      <path d="M450 320 L450 196" fill="none" stroke="url(#steel)" stroke-width="26" stroke-linecap="round"/>

      <path d="M450 320 L222 112" fill="none" class="outline" stroke-width="56"/>
      <path d="M450 320 L222 112" fill="none" stroke="url(#steel)" stroke-width="41" stroke-linecap="round"/>
      <path d="M314 196 L222 112" fill="none" stroke="#983116" stroke-width="46" stroke-linecap="round"/>
      <path d="M314 196 L222 112" fill="none" stroke="url(#mobile-grip)" stroke-width="35" stroke-linecap="round"/>
      <text class="handle-label" x="267" y="154" text-anchor="middle" transform="rotate(42.4 267 154)">MOBILE</text>

      <g id="mobile-guide">
        <path d="M388 166 Q450 130 512 166 L502 210 Q450 183 398 210 Z"
              fill="#fff3ec" stroke="#c9451a" stroke-width="6" stroke-linejoin="round"/>
        <path d="M407 190 Q450 166 493 190" fill="none" stroke="#1b3a63" stroke-width="8" stroke-linecap="round"/>
        <circle cx="450" cy="169" r="10" fill="url(#pivot)" stroke="#c9451a" stroke-width="3"/>
        <rect x="398" y="128" width="104" height="25" rx="12.5" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/>
        <text class="guide-label" x="450" y="145" text-anchor="middle">GUIDE MOBILE</text>
      </g>
      <line x1="450" y1="165" x2="450" y2="142" stroke="#c9451a" stroke-width="5" stroke-linecap="round"/>
      <text class="engraving" x="450" y="124" text-anchor="middle">0</text>
    </g>

    <g id="axis" class="screen-shadow">
      <circle cx="450" cy="320" r="35" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
      <circle cx="450" cy="320" r="23" fill="url(#pivot)" stroke="#65788a" stroke-width="3"/>
      <circle cx="443" cy="313" r="7" fill="#fff" opacity=".82"/>
      <path d="M450 297 V343 M427 320 H473" stroke="#1b3a63" stroke-width="2" opacity=".42"/>
    </g>

    <g id="radius-guide" pointer-events="none">
      <line x1="450" y1="320" x2="450" y2="218" stroke="#3d7fca" stroke-width="4" stroke-dasharray="10 8" marker-end="url(#arrow-blue)"/>
      <rect x="365" y="258" width="70" height="36" rx="18" fill="#fffdf8" stroke="#3d7fca" stroke-width="3"/>
      <text x="400" y="283" text-anchor="middle" fill="#1b3a63" font-size="18" font-weight="900">Rc</text>
    </g>

    <g aria-hidden="true">
      <path d="M686 505 H830" stroke="#637285" stroke-width="2"/>
      <text class="small" x="830" y="529" text-anchor="end">Schéma pédagogique</text>
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
    const cy = 320;
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
    if (directionY > .001) limits.push((555 - endY) / directionY);
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

    const sweepRadius = 190;
    const handleStart = Math.atan2(-208, -228);
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

    const labelRadius = 225;
    const labelPhi = handleStart + (angle / 2) * Math.PI / 180;
    this._els.sweepLabel.setAttribute("x", (cx + labelRadius * Math.cos(labelPhi)).toFixed(2));
    this._els.sweepLabel.setAttribute("y", (cy + labelRadius * Math.sin(labelPhi) - 8).toFixed(2));
    this._els.sweepLabel.textContent = `${Math.round(angle)}°`;
  }
}

customElements.define("cintrette-lab", CintretteLab);
