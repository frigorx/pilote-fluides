"use strict";

(() => {
  const shell = HydroStation.init({
    title: "Mesurer",
    nextHref: "../../lignes/P/parcours.html",
    nextLabel: "Ouvrir le parcours de la ligne P",
    successMessage: "Tu construis un relevé traçable avant d’interpréter une performance.",
    levels: {
      CAP: { name: "CAP · niveau 3", objective: "Lire une valeur avec son unité.", learn: ["nommer le point mesuré", "lire la valeur et l’unité", "signaler un relevé douteux"] },
      TP: { name: "Bac pro · niveau 4", objective: "Préparer un relevé complet.", learn: ["choisir grandeur et instrument", "nommer point et unité", "noter contexte et stabilisation"] },
      BTS: { name: "BTS / titre pro CVC · niveau 5", objective: "Concevoir une stratégie de mesure.", learn: ["définir les points", "choisir précision et répétabilité", "organiser le traitement"] }
    },
    quiz: [
      { prompt: "Quelle ligne de relevé est exploitable ?", options: ["Débit conduite principale : 2,1 m³/h, régime stabilisé", "Débit : 2,1", "Mesure correcte quelque part"], correct: 0, explanation: "La grandeur, le point, la valeur, l’unité et le contexte sont identifiés." },
      { prompt: "Quel instrument sert à mesurer le débit de la boucle ?", options: ["Un débitmètre adapté", "Une sonde de contact seule", "Un chronomètre sans volume"], correct: 0, explanation: "Le débitmètre doit être adapté à la plage, au fluide et au point prévu." },
      { prompt: "Pourquoi noter l’état stabilisé ?", options: ["Pour rendre la comparaison interprétable", "Pour remplacer l’unité", "Pour éviter de nommer le point"], correct: 0, explanation: "Un transitoire peut modifier les valeurs ; le contexte permet à un tiers d’interpréter le relevé." },
      { prompt: "Avant de conclure sur la puissance, quelles grandeurs faut-il au minimum ici ?", options: ["Débit et deux températures comparables", "Pression ambiante seule", "Couleur des tuyaux"], correct: 0, explanation: "Q et ΔT permettent l’estimation P ≈ 1,16 × Q × ΔT pour l’eau avec les unités prévues." }
    ]
  });

  let contextNoted = false;
  let stable = false;
  const contextButton = document.querySelector("#contextButton");
  const stableButton = document.querySelector("#stableButton");
  const feedback = document.querySelector("#feedback");

  function toggle(button, value) {
    button.setAttribute("aria-pressed", String(value));
    button.classList.toggle("selected", value);
  }

  contextButton.addEventListener("click", () => { contextNoted = !contextNoted; toggle(contextButton, contextNoted); });
  stableButton.addEventListener("click", () => { stable = !stable; toggle(stableButton, stable); });

  document.querySelector("#checkActivity").addEventListener("click", () => {
    const quantity = document.querySelector("#quantity").value;
    const point = document.querySelector("#point").value;
    const unit = document.querySelector("#unit").value;
    const complete = quantity === "power" && point === "loop" && unit === "valid" && contextNoted && stable;
    if (complete) {
      document.querySelector("#flowInstrument").setAttribute("opacity", "1");
      document.querySelector("#tempInstrument").setAttribute("opacity", "1");
      document.querySelector("#svgFlowMeasure").textContent = "2,0 m³/h";
      document.querySelector("#svgTempMeasure").textContent = "60 °C / 50 °C";
      feedback.textContent = "Fiche exploitable : grandeur, points, unités, contexte et stabilisation sont consignés.";
      feedback.className = "feedback good";
      shell.setStatus("Preuve complète", "ok");
      shell.unlockQuiz();
    } else {
      const missing = [];
      if (quantity !== "power") missing.push("grandeurs adaptées");
      if (point !== "loop") missing.push("points non ambigus");
      if (unit !== "valid") missing.push("unités");
      if (!contextNoted) missing.push("contexte");
      if (!stable) missing.push("stabilisation");
      feedback.textContent = `À compléter : ${missing.join(", ")}.`;
      feedback.className = "feedback error";
      shell.setStatus("Fiche incomplète", "bad");
    }
  });
})();
