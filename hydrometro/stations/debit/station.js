"use strict";

(() => {
  const shell = HydroStation.init({
    title: "Débit",
    nextHref: "../delta-t/index.html",
    nextLabel: "Station suivante : Écart ΔT",
    successMessage: "Tu lis le débit comme le résultat commun de la pompe et du réseau.",
    levels: {
      CAP: { name: "CAP · niveau 3", objective: "Lire un débit avec son unité.", learn: ["lire le débit affiché", "reconnaître L/min et m³/h", "signaler un débit anormal"] },
      TP: { name: "Bac pro · niveau 4", objective: "Régler puis lire un débit.", learn: ["convertir m³/h et L/min", "observer pompe et réseau", "contrôler la cohérence"] },
      BTS: { name: "BTS / titre pro CVC · niveau 5", objective: "Interpréter le point de fonctionnement pompe-réseau.", learn: ["croiser deux courbes", "relier résistance et débit", "justifier le réglage"] }
    },
    quiz: [
      { prompt: "2,0 m³/h correspondent à combien de litres par minute environ ?", options: ["33,3 L/min", "2 L/min", "120 L/min"], correct: 0, explanation: "2,0 m³/h = 2 000 L/h, puis 2 000 ÷ 60 ≈ 33,3 L/min." },
      { prompt: "Qui fixe le débit réel d’une boucle ?", options: ["Le croisement entre la pompe et le réseau", "La pompe seule", "La vanne seule"], correct: 0, explanation: "Le point de fonctionnement résulte simultanément de la capacité de la pompe et de la résistance du réseau." },
      { prompt: "À commande pompe inchangée, fermer davantage une vanne produit généralement quoi ?", options: ["Le débit diminue", "Le débit augmente toujours", "Le débit devient une température"], correct: 0, explanation: "La résistance du réseau augmente ; le nouveau croisement se déplace vers un débit plus faible." },
      { prompt: "Quel énoncé définit un débit volumique ?", options: ["Un volume traversé par unité de temps", "Une énergie divisée par une température", "Une pression sans point de mesure"], correct: 0, explanation: "Le débit volumique relie un volume à une durée, par exemple m³/h ou L/s." }
    ]
  });

  const pump = document.querySelector("#pumpSpeed");
  const valve = document.querySelector("#valveOpening");
  const feedback = document.querySelector("#feedback");
  let currentFlow = 0;

  const x = (q) => 455 + (q / 4) * 300;
  const y = (h) => 350 - (Math.max(0, Math.min(6.5, h)) / 6.5) * 250;

  function compute() {
    const speed = Number(pump.value) / 100;
    const opening = Number(valve.value) / 100;
    const h0 = 6 * speed * speed;
    const qMax = 4 * speed;
    const k = .4 + 3.5 * (1 - opening) ** 2;
    currentFlow = Math.sqrt(h0 / (h0 / (qMax * qMax) + k));
    const hPoint = k * currentFlow * currentFlow;
    const pumpPoints = [];
    const networkPoints = [];
    for (let i = 0; i <= 40; i += 1) {
      const q = (i / 40) * 4;
      const hp = Math.max(0, h0 * (1 - (q / qMax) ** 2));
      pumpPoints.push(`${i ? "L" : "M"}${x(q).toFixed(1)} ${y(hp).toFixed(1)}`);
      networkPoints.push(`${i ? "L" : "M"}${x(q).toFixed(1)} ${y(k * q * q).toFixed(1)}`);
    }
    document.querySelector("#pumpCurve").setAttribute("d", pumpPoints.join(" "));
    document.querySelector("#networkCurve").setAttribute("d", networkPoints.join(" "));
    document.querySelector("#operatingPoint").setAttribute("cx", x(currentFlow));
    document.querySelector("#operatingPoint").setAttribute("cy", y(hPoint));
    document.querySelector("#pointLabel").setAttribute("x", Math.min(680, x(currentFlow) + 18));
    document.querySelector("#pointLabel").setAttribute("y", Math.max(105, y(hPoint) - 18));
    document.querySelector("#pumpOut").textContent = `${pump.value} %`;
    document.querySelector("#valveOut").textContent = `${valve.value} %`;
    const formatted = currentFlow.toFixed(2).replace(".", ",");
    document.querySelector("#flowValue").textContent = `${formatted} m³/h`;
    document.querySelector("#svgFlowValue").textContent = formatted;
    document.querySelector("#litreValue").textContent = `${(currentFlow * 1000 / 60).toFixed(1).replace(".", ",")} L/min`;
    feedback.textContent = currentFlow < 2 ? "Débit trop faible : augmente la pompe ou ouvre le réseau." : currentFlow > 2.4 ? "Débit trop fort : réduis la pompe ou augmente la résistance." : "La cible est atteinte. Valide le point obtenu.";
    feedback.className = currentFlow >= 2 && currentFlow <= 2.4 ? "feedback good" : "feedback";
  }

  [pump, valve].forEach((input) => input.addEventListener("input", compute));
  document.querySelector("#checkActivity").addEventListener("click", () => {
    if (currentFlow >= 2 && currentFlow <= 2.4) {
      feedback.textContent = "Point validé : le débit cible résulte de la pompe et de la résistance du réseau.";
      feedback.className = "feedback good";
      shell.setStatus("Débit cohérent", "ok");
      shell.unlockQuiz();
    } else {
      feedback.textContent = "Le point n’est pas dans la plage 2,0 à 2,4 m³/h. Ajuste un seul réglage puis relis.";
      feedback.className = "feedback error";
      shell.setStatus("Hors cible", "bad");
    }
  });
  compute();
})();
