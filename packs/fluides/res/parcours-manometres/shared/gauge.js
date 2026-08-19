/* Rendu SVG des manomètres, adapté du moteur manometres_v5.html. */
(function (root) {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const START = 135;
  const SWEEP = 270;
  const DEG = Math.PI / 180;

  function el(name, attrs = {}, text = null) {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    if (text !== null) node.textContent = text;
    return node;
  }

  function polar(cx, cy, radius, angle) {
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  }

  function angleOf(value, min, max) {
    return ((value - min) / (max - min)) * SWEEP * DEG + START * DEG;
  }

  function arcPath(cx, cy, radius, startDeg, endDeg) {
    const start = polar(cx, cy, radius, (endDeg - 90) * DEG);
    const end = polar(cx, cy, radius, (startDeg - 90) * DEG);
    const large = endDeg - startDeg <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 0 ${end.x} ${end.y}`;
  }

  function formatTick(value) {
    if (Math.abs(value) < 1e-8) return "0";
    if (Math.abs(value - Math.round(value)) < 1e-6) return String(Math.round(value));
    return value.toFixed(1).replace(/\.0$/, "").replace(".", ",");
  }

  /* Rosee et bulle ne se distinguent que sur un fluide a glissement.
     Sur un corps pur, l'echelle interieure est simplement la saturation. */
  function phaseCaption(opts) {
    const glide = window.ThermoCore.meta(opts.fluid)?.glide;
    if (!glide) return "TEMPÉRATURE · SATURATION";
    return opts.phase === "bubble" ? "TEMPÉRATURE · BULLE" : "TEMPÉRATURE · ROSÉE";
  }

  function clear(svg) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  }

  function render(svg, options) {
    const opts = Object.assign({
      side: "bp",
      fluid: "R134a",
      phase: "dew",
      min: -1,
      max: 5,
      major: 1,
      pressure: 1,
      temperatureStep: 5,
      showTemperature: true,
      showNeedleReadout: false,
      atmosphericBar: window.ThermoCore.ATM_BAR
    }, options || {});

    clear(svg);
    const cx = 230;
    const cy = 230;
    const rOuter = 205;
    const rMajor = 179;
    const rMedium = 187;
    const rFine = 195;
    const rPressureText = 161;
    const rTemp = 140;
    const isBP = opts.side === "bp";
    const rimColor = isBP ? "#2368a8" : "#c9451a";
    const tempColor = "#c9451a";
    const safePressure = Math.max(opts.min, Math.min(opts.max, opts.pressure));
    const gradientId = `${svg.id || "gauge"}-rim`;

    svg.setAttribute("viewBox", "0 0 460 460");
    svg.setAttribute("role", "img");
    const saturation = window.ThermoCore.temperatureAtGaugePressure(opts.fluid, safePressure, opts.phase, opts.atmosphericBar);
    svg.setAttribute("aria-label", `${isBP ? "Manomètre basse pression" : "Manomètre haute pression"}, ${opts.fluid}, aiguille à ${safePressure.toFixed(2).replace(".", ",")} bar relatif, température de saturation ${Number.isFinite(saturation) ? saturation.toFixed(1).replace(".", ",") : "hors plage"} degrés Celsius.`);

    const title = el("title", {}, isBP ? "Manomètre basse pression" : "Manomètre haute pression");
    const desc = el("desc", {}, "Échelle extérieure de pression relative en bar et échelle intérieure de température de saturation.");
    svg.append(title, desc);

    const defs = el("defs");
    const gradient = el("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "100%", y2: "100%" });
    gradient.append(el("stop", { offset: "0%", "stop-color": rimColor }), el("stop", { offset: "100%", "stop-color": rimColor, "stop-opacity": .7 }));
    defs.append(gradient);
    svg.append(defs);

    svg.append(
      el("circle", { cx, cy, r: 220, fill: "#fffdf8", stroke: `url(#${gradientId})`, "stroke-width": 7 }),
      el("path", { d: arcPath(cx, cy, 212, START, START + SWEEP), fill: "none", stroke: "#d9e0e7", "stroke-width": 8, "stroke-linecap": "round" })
    );

    const firstMajor = Math.ceil(opts.min / opts.major) * opts.major;
    const fine = opts.major / 5;
    const medium = opts.major / 2;
    for (let p = firstMajor; p <= opts.max + 1e-7; p += opts.major) {
      const angle = angleOf(p, opts.min, opts.max);
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const zero = Math.abs(p) < 1e-8;
      svg.append(
        el("line", { x1: cx + rOuter * c, y1: cy + rOuter * s, x2: cx + rMajor * c, y2: cy + rMajor * s, stroke: zero ? "#c9451a" : "#10233c", "stroke-width": zero ? 4 : 3 }),
        el("text", { x: cx + rPressureText * c, y: cy + rPressureText * s + 5, "text-anchor": "middle", "font-size": 13, "font-weight": 800, fill: "#10233c", "font-family": "Calibri,Segoe UI,sans-serif" }, formatTick(p))
      );

      const midpoint = p + medium;
      if (midpoint <= opts.max && midpoint >= opts.min) {
        const a = angleOf(midpoint, opts.min, opts.max);
        svg.append(el("line", { x1: cx + rOuter * Math.cos(a), y1: cy + rOuter * Math.sin(a), x2: cx + rMedium * Math.cos(a), y2: cy + rMedium * Math.sin(a), stroke: "#526274", "stroke-width": 1.8 }));
      }
      for (let q = p + fine; q < p + opts.major - 1e-7 && q <= opts.max; q += fine) {
        if (Math.abs(q - midpoint) < fine / 3 || q < opts.min) continue;
        const a = angleOf(q, opts.min, opts.max);
        svg.append(el("line", { x1: cx + rOuter * Math.cos(a), y1: cy + rOuter * Math.sin(a), x2: cx + rFine * Math.cos(a), y2: cy + rFine * Math.sin(a), stroke: "#8694a3", "stroke-width": 1 }));
      }
    }

    if (opts.showTemperature) {
      svg.append(el("path", { d: arcPath(cx, cy, rTemp, START, START + SWEEP), fill: "none", stroke: tempColor, "stroke-width": 2, "stroke-opacity": .62, "stroke-linecap": "round" }));
      const limits = window.ThermoCore.limits(opts.fluid, opts.phase);
      if (limits) {
        const firstTemp = Math.ceil(limits.Tmin / opts.temperatureStep) * opts.temperatureStep;
        for (let temperature = firstTemp; temperature <= limits.Tmax; temperature += opts.temperatureStep) {
          const pressure = window.ThermoCore.pressureGaugeAtTemperature(opts.fluid, temperature, opts.phase, opts.atmosphericBar);
          if (!Number.isFinite(pressure) || pressure < opts.min || pressure > opts.max) continue;
          const angle = angleOf(pressure, opts.min, opts.max);
          const c = Math.cos(angle);
          const s = Math.sin(angle);
          const important = temperature % 10 === 0;
          svg.append(el("line", { x1: cx + rTemp * c, y1: cy + rTemp * s, x2: cx + (rTemp - (important ? 14 : 9)) * c, y2: cy + (rTemp - (important ? 14 : 9)) * s, stroke: tempColor, "stroke-width": important ? 3.2 : 2, "stroke-linecap": "round" }));
          if (important || opts.temperatureStep >= 10) {
            svg.append(el("text", { x: cx + (rTemp - 30) * c, y: cy + (rTemp - 30) * s + 5, "text-anchor": "middle", "font-size": 16, "font-weight": 900, fill: tempColor, "font-family": "Calibri,Segoe UI,sans-serif" }, `${temperature}°`));
          }
        }
      }
    }

    svg.append(
      el("text", { x: cx, y: 198, "text-anchor": "middle", "font-size": 18, "font-weight": 900, fill: "#1b3a63", "font-family": "Trebuchet MS,Calibri,sans-serif" }, "inerWeb"),
      el("text", { x: cx, y: 220, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: "#637285", "font-family": "Calibri,Segoe UI,sans-serif" }, `${opts.fluid} · bar relatif`),
      el("text", { x: cx, y: 244, "text-anchor": "middle", "font-size": 10, "font-weight": 800, fill: tempColor, "font-family": "Calibri,Segoe UI,sans-serif" }, phaseCaption(opts))
    );

    const angle = angleOf(safePressure, opts.min, opts.max);
    const tip = polar(cx, cy, 191, angle);
    const tail = polar(cx, cy, 42, angle + Math.PI);
    const along = { x: Math.cos(angle), y: Math.sin(angle) };
    const across = { x: -along.y, y: along.x };
    const needlePoint = (radius, offset) => `${cx + radius * along.x + offset * across.x},${cy + radius * along.y + offset * across.y}`;
    svg.append(
      el("polygon", { points: [needlePoint(191, 0), needlePoint(14, 4.6), needlePoint(-42, 2.6), needlePoint(-42, -2.6), needlePoint(14, -4.6)].join(" "), fill: "#111827" }),
      el("circle", { cx, cy, r: 17, fill: "#111827" }),
      el("circle", { cx, cy, r: 6, fill: "#fffdf8" })
    );

    if (opts.showNeedleReadout) {
      svg.append(el("text", { x: cx, y: 285, "text-anchor": "middle", "font-size": 15, "font-weight": 900, fill: "#10233c", "font-family": "Consolas,monospace" }, `${safePressure.toFixed(2).replace(".", ",")} bar`));
      if (Number.isFinite(saturation)) svg.append(el("text", { x: cx, y: 305, "text-anchor": "middle", "font-size": 14, "font-weight": 900, fill: tempColor, "font-family": "Consolas,monospace" }, `${saturation.toFixed(1).replace(".", ",")} °C`));
    }
    return { pressure: safePressure, saturation };
  }

  root.GaugeRenderer = Object.freeze({ render });
}(window));
