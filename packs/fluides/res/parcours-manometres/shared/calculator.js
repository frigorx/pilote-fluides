(function (root) {
  "use strict";

  function compute(expression) {
    const clean = String(expression).replace(/,/g, ".").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/\s+/g, "");
    if (!/^-?\d+(?:\.\d+)?(?:[+\-*/]-?\d+(?:\.\d+)?)*$/.test(clean)) return NaN;
    const tokens = clean.match(/-?\d+(?:\.\d+)?|[+\-*/]/g);
    if (!tokens) return NaN;
    const values = [];
    const operators = [];
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const apply = () => {
      const op = operators.pop();
      const right = values.pop();
      const left = values.pop();
      if (op === "+") values.push(left + right);
      if (op === "-") values.push(left - right);
      if (op === "*") values.push(left * right);
      if (op === "/") values.push(right === 0 ? NaN : left / right);
    };
    tokens.forEach(token => {
      if (/^[+\-*/]$/.test(token)) {
        while (operators.length && precedence[operators.at(-1)] >= precedence[token]) apply();
        operators.push(token);
      } else values.push(Number(token));
    });
    while (operators.length) apply();
    return values.length === 1 ? values[0] : NaN;
  }

  function markup() {
    return `<div class="calculator" aria-label="Calculatrice locale">
      <input class="calculator-display" inputmode="decimal" aria-label="Expression" value="">
      <div class="calculator-keys">
        <button type="button" data-key="7">7</button><button type="button" data-key="8">8</button><button type="button" data-key="9">9</button><button class="op" type="button" data-key="÷">÷</button>
        <button type="button" data-key="4">4</button><button type="button" data-key="5">5</button><button type="button" data-key="6">6</button><button class="op" type="button" data-key="×">×</button>
        <button type="button" data-key="1">1</button><button type="button" data-key="2">2</button><button type="button" data-key="3">3</button><button class="op" type="button" data-key="−">−</button>
        <button type="button" data-key="0">0</button><button type="button" data-key=",">,</button><button type="button" data-key="C">C</button><button class="op" type="button" data-key="+">+</button>
        <button class="equals" type="button" data-key="=" style="grid-column:1/-1">= Calculer</button>
      </div>
    </div>`;
  }

  function mount(container) {
    container.innerHTML = markup();
    const display = container.querySelector(".calculator-display");
    container.querySelectorAll("[data-key]").forEach(button => button.addEventListener("click", () => {
      const key = button.dataset.key;
      if (key === "C") display.value = "";
      else if (key === "=") {
        const result = compute(display.value);
        display.value = Number.isFinite(result) ? String(Math.round(result * 100) / 100).replace(".", ",") : "Erreur";
      } else {
        if (display.value === "Erreur") display.value = "";
        display.value += key;
      }
    }));
    return display;
  }

  root.InerCalculator = Object.freeze({ compute, mount });
}(window));
