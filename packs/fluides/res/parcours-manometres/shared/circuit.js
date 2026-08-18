/* Croix du Frigoriste interactive construite avec les symboles SVG inerWeb. */
(function (root) {
  "use strict";

  /* Les symboles se trouvent à côté de ce script, quelle que soit la profondeur
     de la page qui l'appelle : un cours à la racine du parcours et une brique
     rangée un cran plus bas n'ont pas le même chemin relatif. Même méthode que
     lisibilite.js : on déduit la racine de l'adresse du script lui-même. */
  const RACINE_SHARED = (document.currentScript && document.currentScript.src ? document.currentScript.src : "").replace(/circuit\.js.*$/, "");

  const ORGANS = {
    condenser: { label: "Condenseur", role: "Rejette la chaleur · vapeur vers liquide", position: "en haut" },
    compressor: { label: "Compresseur", role: "Aspire en BP · refoule en HP", position: "à droite" },
    evaporator: { label: "Évaporateur", role: "Capte la chaleur · liquide vers vapeur", position: "en bas" },
    expansion: { label: "Détendeur", role: "Abaisse la pression · dose le débit", position: "à gauche" }
  };

  const POINTS = {
    evapOutlet: { code: "E1", label: "Sortie évaporateur", x: 555, y: 490 },
    compressorInlet: { code: "C1", label: "Aspiration compresseur", x: 680, y: 420 },
    condenserOutlet: { code: "C2", label: "Sortie condenseur", x: 340, y: 118 },
    expansionInlet: { code: "D1", label: "Entrée détendeur", x: 230, y: 205 }
  };

  function organGroup(id, box, image, imageAttrs, labelAttrs, showLabel) {
    const accessibleName = showLabel
      ? `${ORGANS[id].label}. ${ORGANS[id].role}`
      : `Symbole technique sans nom ${ORGANS[id].position}. À identifier dans l’exercice.`;
    const tab = `tabindex="0" role="button" aria-label="${accessibleName}" data-organ="${id}"`;
    return `<g class="organ-hotspot" ${tab}>
      <rect class="hotspot" x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="18"/>
      <image href="${RACINE_SHARED}symboles/${image}" ${imageAttrs}/>
      ${showLabel ? `<text class="organ-label" ${labelAttrs}>${ORGANS[id].label.toUpperCase()}</text>` : ""}
    </g>`;
  }

  function pointGroup(id) {
    const point = POINTS[id];
    const labelY = point.y < 260 ? point.y - 22 : point.y + 31;
    return `<g class="measure-point" tabindex="0" role="button" data-point="${id}" aria-label="Point ${point.code}, ${point.label}">
      <circle cx="${point.x}" cy="${point.y}" r="15"/>
      <text x="${point.x}" y="${point.y + 4}">${point.code}</text>
      <text class="role-label" x="${point.x}" y="${labelY}" text-anchor="middle">${point.label}</text>
    </g>`;
  }

  function markup(options) {
    const pointIds = options.points || [];
    const showOrganLabels = options.showOrganLabels !== false;
    return `<svg class="circuit-svg" viewBox="0 0 900 600" role="img" aria-labelledby="circuit-title circuit-desc">
      <title id="circuit-title">Croix du Frigoriste</title>
      <desc id="circuit-desc">Détendeur à gauche, compresseur à droite, condenseur à air en haut et évaporateur en bas. Le circuit haute pression est identifié HP et le circuit basse pression BP.</desc>
      <defs>
        <marker id="arrow-hp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker>
        <marker id="arrow-bp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#2368a8"/></marker>
      </defs>
      <rect width="900" height="600" fill="#fff"/>

      <path class="pipe hp" d="M690 248V118H558" marker-end="url(#arrow-hp)"/>
      <path class="pipe hp" d="M342 118H230V258" marker-end="url(#arrow-hp)"/>
      <path class="pipe bp" d="M230 342V490H342" marker-end="url(#arrow-bp)"/>
      <path class="pipe bp" d="M558 490H690V352" marker-end="url(#arrow-bp)"/>
      <path class="flow" d="M690 248V118H558"/><path class="flow" d="M342 118H230V258"/>
      <path class="flow" d="M230 342V490H342"/><path class="flow" d="M558 490H690V352"/>

      ${organGroup("condenser", {x:340,y:28,w:220,h:178}, "echangeur_a_air.svg", 'x="390" y="42" width="120" height="120"', 'x="450" y="190" text-anchor="middle"', showOrganLabels)}
      ${organGroup("evaporator", {x:340,y:408,w:220,h:170}, "echangeur_a_air.svg", 'x="390" y="430" width="120" height="120"', 'x="450" y="575" text-anchor="middle"', showOrganLabels)}
      ${organGroup("compressor", {x:620,y:220,w:240,h:170}, "compresseur_general.svg", 'x="650" y="250" width="100" height="100" transform="rotate(-90 700 300)"', 'x="760" y="306"', showOrganLabels)}
      ${organGroup("expansion", {x:40,y:220,w:250,h:170}, "detendeur_thermo_ext.svg", 'x="180" y="250" width="100" height="100" transform="rotate(-90 230 300)"', 'x="150" y="306" text-anchor="end"', showOrganLabels)}

      <text class="zone-label hp" x="450" y="225" text-anchor="middle">HAUTE PRESSION · HP</text>
      <text class="zone-label bp" x="450" y="398" text-anchor="middle">BASSE PRESSION · BP</text>
      <text class="role-label" x="450" y="245" text-anchor="middle">vapeur chaude → liquide</text>
      <text class="role-label" x="450" y="418" text-anchor="middle">liquide + vapeur → vapeur</text>

      ${pointIds.map(pointGroup).join("")}
    </svg>`;
  }

  function render(container, options = {}) {
    container.innerHTML = markup(options);
    const activate = (element, handler, value) => {
      element.addEventListener("click", () => handler(value, element));
      element.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handler(value, element);
        }
      });
    };
    container.querySelectorAll("[data-organ]").forEach(element => {
      if (typeof options.onOrgan === "function") activate(element, options.onOrgan, element.dataset.organ);
      else element.removeAttribute("tabindex");
    });
    container.querySelectorAll("[data-point]").forEach(element => {
      if (typeof options.onPoint === "function") activate(element, options.onPoint, element.dataset.point);
      else element.removeAttribute("tabindex");
    });
    (options.selectedOrgans || []).forEach(id => container.querySelector(`[data-organ="${id}"]`)?.classList.add("selected"));
    (options.selectedPoints || []).forEach(id => container.querySelector(`[data-point="${id}"]`)?.classList.add("selected"));
    return container.querySelector("svg");
  }

  root.CircuitFrigo = Object.freeze({ render, organs: ORGANS, points: POINTS });
}(window));
