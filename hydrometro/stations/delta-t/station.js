"use strict";

(() => {
  const shell = HydroStation.init({
    title: "Écart ΔT",
    nextHref: "../puissance/index.html",
    nextLabel: "Station suivante : Puissance",
    successMessage: "Vous savez placer deux sondes comparables et attendre un état stabilisé.",
    levels: {
      CAP: { name: "CAP · niveau 3", objective: "Lire la température au départ et au retour.", learn: ["lire une température affichée", "reconnaître départ et retour", "attendre avant de lire"] },
      TP: { name: "Bac pro · niveau 4", objective: "Placer deux sondes et attendre.", learn: ["choisir départ et retour", "attendre la stabilisation", "ne pas conclure sur ΔT seul"] },
      BTS: { name: "BTS / titre pro CVC · niveau 5", objective: "Définir un protocole de ΔT interprétable.", learn: ["définir les points", "suivre le transitoire", "discuter incertitude et charge"] }
    },
    quiz: [
      { prompt: "Le départ vaut 60 °C et le retour 50 °C. Quel est le ΔT ?", options: ["10 K", "110 K", "6 K"], correct: 0, explanation: "ΔT = 60 − 50 = 10 K. L’écart numérique vaut aussi 10 °C." },
      { prompt: "Pourquoi attendre plusieurs relevés ?", options: ["Pour vérifier que l’état se stabilise", "Pour changer l’unité", "Pour faire monter artificiellement le score"], correct: 0, explanation: "Pendant le transitoire, les températures évoluent ; une valeur isolée peut être trompeuse." },
      { prompt: "Quelles sondes rendent le ΔT de l’émetteur comparable ?", options: ["Départ et retour immédiats du même émetteur", "Deux points choisis au hasard", "Une sonde d’ambiance et une sonde d’eau"], correct: 0, explanation: "Les deux points doivent encadrer le même objet dans les mêmes conditions de fonctionnement." },
      { prompt: "Un ΔT élevé prouve-t-il seul un débit trop faible ?", options: ["Non, il faut croiser débit, charge et état des organes", "Oui, sans autre mesure", "Oui, si la sonde est orange"], correct: 0, explanation: "Le ΔT isolé n’identifie pas une cause unique. Il faut compléter la preuve." }
    ]
  });

  const selected = new Set();
  const probeButtons = [...document.querySelectorAll("[data-probe]")];
  const feedback = document.querySelector("#feedback");
  const samples = [{ a: 57, b: 44 }, { a: 59, b: 48 }, { a: 60, b: 50 }];
  let sampleIndex = 0;

  function resetSamples() {
    sampleIndex = 0;
    document.querySelector("#sampleCount").textContent = "0 / 3";
    document.querySelector("#deltaValue").textContent = "— K";
    document.querySelector("#tempA").textContent = "— °C";
    document.querySelector("#tempB").textContent = "— °C";
    document.querySelector("#dtReadout").textContent = "Mesure à préparer";
    document.querySelector("#stabilityText").textContent = "État : non stabilisé";
  }

  function renderProbes() {
    probeButtons.forEach((button) => button.setAttribute("aria-pressed", String(selected.has(button.dataset.probe))));
    ["A", "B", "C", "D"].forEach((probe) => document.querySelector(`#probe${probe}`).setAttribute("opacity", selected.has(probe) ? "1" : ".35"));
    document.querySelector("#sampleButton").disabled = selected.size !== 2;
  }

  probeButtons.forEach((button) => button.addEventListener("click", () => {
    const probe = button.dataset.probe;
    if (selected.has(probe)) selected.delete(probe);
    else if (selected.size < 2) selected.add(probe);
    else {
      feedback.textContent = "Retire une sonde avant d’en choisir une autre.";
      feedback.className = "feedback error";
      return;
    }
    resetSamples();
    renderProbes();
    feedback.textContent = selected.size === 2 ? "Deux sondes posées. Lancez le premier relevé." : "Choisis encore un point.";
    feedback.className = "feedback";
  }));

  document.querySelector("#sampleButton").addEventListener("click", () => {
    if (!(selected.has("A") && selected.has("B"))) {
      feedback.textContent = "Ces points n’encadrent pas l’émetteur étudié. Choisis A au départ et B au retour.";
      feedback.className = "feedback error";
      shell.setStatus("Points non comparables", "bad");
      return;
    }
    if (sampleIndex >= samples.length) return;
    const sample = samples[sampleIndex];
    sampleIndex += 1;
    const delta = sample.a - sample.b;
    document.querySelector("#tempA").textContent = `${sample.a} °C`;
    document.querySelector("#tempB").textContent = `${sample.b} °C`;
    document.querySelector("#sampleCount").textContent = `${sampleIndex} / 3`;
    document.querySelector("#deltaValue").textContent = `${delta} K`;
    document.querySelector("#dtReadout").textContent = `ΔT = ${sample.a} − ${sample.b} = ${delta} K`;
    if (sampleIndex < 3) {
      document.querySelector("#stabilityText").textContent = "État : encore transitoire";
      feedback.textContent = "Les valeurs évoluent encore. Attendez puis relève de nouveau.";
    } else {
      document.querySelector("#stabilityText").textContent = "État : stabilisé sur ce modèle";
      feedback.textContent = "Relevé exploitable : points comparables, trois mesures et ΔT stabilisé à 10 K.";
      feedback.className = "feedback good";
      document.querySelector("#sampleButton").disabled = true;
      shell.setStatus("ΔT stabilisé", "ok");
      shell.unlockQuiz();
    }
  });

  renderProbes();
})();
