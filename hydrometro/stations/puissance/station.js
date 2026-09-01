"use strict";

(() => {
  const shell = HydroStation.init({
    title: "Puissance",
    nextHref: "../mesurer/index.html",
    nextLabel: "Station suivante : Mesurer",
    successMessage: "Vous utilisez la formule avec les unités prévues et contrôles l’ordre de grandeur.",
    levels: {
      CAP: { name: "CAP · niveau 3", objective: "Lire la puissance affichée et son unité.", learn: ["lire le débit et l’écart", "lire la puissance en kW", "comparer avec la valeur donnée"] },
      TP: { name: "Bac pro · niveau 4", objective: "Estimer la puissance transportée.", learn: ["appliquer la relation", "conserver les unités", "contrôler l’ordre de grandeur"] },
      BTS: { name: "BTS / titre pro CVC · niveau 5", objective: "Dimensionner et vérifier une puissance hydraulique.", learn: ["calculer le débit de projet", "comparer besoin et mesure", "discuter l’approximation"] }
    },
    quiz: [
      { prompt: "Avec Q = 2,0 m³/h et ΔT = 10 K, quelle puissance obtient-on ?", options: ["23,2 kW", "2,32 kW", "232 kW"], correct: 0, explanation: "P ≈ 1,16 × 2,0 × 10 = 23,2 kW." },
      { prompt: "Quelle unité de Q convient directement dans cette formule pratique ?", options: ["m³/h", "L sans durée", "kW"], correct: 0, explanation: "Le coefficient 1,16 utilisé ici suppose Q en m³/h et donne P en kW." },
      { prompt: "À puissance égale, si ΔT diminue, que doit faire le débit ?", options: ["Augmenter", "Diminuer forcément", "Devenir une pression"], correct: 0, explanation: "Comme P est proportionnelle à Q × ΔT, une baisse de ΔT doit être compensée par un débit plus grand." },
      { prompt: "Peut-on appliquer 1,16 sans précaution à une eau glycolée ?", options: ["Non, les propriétés du fluide changent", "Oui, pour tous les liquides", "Oui, si la pompe est bleue"], correct: 0, explanation: "Un autre fluide exige des propriétés adaptées, notamment masse volumique et capacité thermique." }
    ]
  });

  const flow = document.querySelector("#flowSlider");
  const dt = document.querySelector("#dtSlider");
  const feedback = document.querySelector("#feedback");
  const target = 23.2;
  let power = 0;

  function fr(value, decimals = 1) { return Number(value).toFixed(decimals).replace(".", ","); }
  function compute() {
    const q = Number(flow.value);
    const delta = Number(dt.value);
    power = 1.16 * q * delta;
    const gap = Math.abs(target - power);
    document.querySelector("#flowOut").textContent = `${fr(q)} m³/h`;
    document.querySelector("#dtOut").textContent = `${delta} K`;
    document.querySelector("#powerValue").textContent = `${fr(power)} kW`;
    document.querySelector("#targetGap").textContent = `${fr(gap)} kW`;
    document.querySelector("#tRetour").textContent = String(60 - delta);
    document.querySelector("#svgFormula").textContent = `1,16 × ${fr(q)} × ${delta} = ${fr(power)} kW`;
    feedback.textContent = gap <= .6 ? "Cible atteinte. Vérifiez les unités puis valide." : power < target ? "Puissance trop faible : augmente Q, ΔT, ou les deux." : "Puissance trop forte : réduis Q, ΔT, ou les deux.";
    feedback.className = gap <= .6 ? "feedback good" : "feedback";
  }

  [flow, dt].forEach((input) => input.addEventListener("input", compute));
  document.querySelector("#checkActivity").addEventListener("click", () => {
    if (Math.abs(target - power) <= .6) {
      feedback.textContent = "Calcul validé : la puissance est cohérente avec Q en m³/h et ΔT en K.";
      feedback.className = "feedback good";
      shell.setStatus("Puissance atteinte", "ok");
      shell.unlockQuiz();
    } else {
      feedback.textContent = "Le calcul est juste mais la cible n’est pas atteinte. Ajuste une grandeur puis recalcule.";
      feedback.className = "feedback error";
      shell.setStatus("Écart à corriger", "bad");
    }
  });
  compute();
})();
