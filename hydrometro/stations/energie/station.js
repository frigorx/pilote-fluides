"use strict";

(() => {
  const shell = HydroStation.init({
    title: "Énergie",
    nextHref: "../debit/index.html",
    nextLabel: "Station suivante : Débit",
    successMessage: "Vous distinguez la circulation de l’eau et le transfert d’énergie.",
    levels: {
      CAP: { name: "CAP · niveau 3", objective: "Suivre l’eau qui transporte la chaleur vers le local.", learn: ["suivre l’eau dans le circuit", "nommer production et émetteur", "montrer où la chaleur arrive"] },
      TP: { name: "Bac pro · niveau 4", objective: "Relier eau et transport de chaleur.", learn: ["repérer réception et cession", "distinguer température et énergie", "expliquer le trajet"] },
      BTS: { name: "BTS / titre pro CVC · niveau 5", objective: "Délimiter une chaîne énergétique hydraulique.", learn: ["poser les frontières", "associer flux et puissance", "commenter les pertes"] }
    },
    quiz: [
      { prompt: "Dans la conduite, qu’est-ce qui transporte l’énergie thermique ?", options: ["L’eau en circulation", "La couleur rouge du tuyau", "La température seule"], correct: 0, explanation: "L’eau est le fluide caloporteur. Sa température est une grandeur d’état, pas l’énergie elle-même." },
      { prompt: "Où l’eau cède-t-elle de l’énergie au local dans le modèle ?", options: ["Dans l’émetteur", "Dans la flèche de sens", "Dans le retour uniquement"], correct: 0, explanation: "L’émetteur assure le transfert entre l’eau et l’ambiance du local." },
      { prompt: "Quelle chaîne est cohérente ?", options: ["Production → eau → émetteur → local", "Local → retour → couleur → production", "Eau → énergie → tuyau → débit"], correct: 0, explanation: "La production fournit, l’eau transporte, l’émetteur transfère et le local reçoit." },
      { prompt: "Une température élevée prouve-t-elle à elle seule une forte puissance ?", options: ["Non, il manque notamment le débit et un écart de température", "Oui, toujours", "Oui, si le tuyau est rouge"], correct: 0, explanation: "La puissance transportée dépend du débit et de l’écart de température, dans des conditions définies." }
    ]
  });

  const order = [];
  const expected = ["Production", "Eau", "Émetteur", "Local"];
  const cards = [...document.querySelectorAll("[data-card]")];
  const feedback = document.querySelector("#feedback");
  const labelNodes = [...document.querySelectorAll("#chainLabels text")];

  function render() {
    labelNodes.forEach((node, index) => { node.textContent = `${index + 1} · ${order[index] || "?"}`; });
    cards.forEach((button) => { button.disabled = order.includes(button.dataset.card); });
    document.querySelector("#energyPath1").setAttribute("opacity", order.length >= 2 ? "1" : "0");
    document.querySelector("#energyPath2").setAttribute("opacity", order.length >= 4 ? "1" : "0");
  }

  cards.forEach((button) => button.addEventListener("click", () => {
    if (order.length < 4 && !order.includes(button.dataset.card)) order.push(button.dataset.card);
    feedback.textContent = order.length < 4 ? "Continue jusqu’au local." : "Chaîne complète : vérifie-la.";
    feedback.className = "feedback";
    render();
  }));
  document.querySelector("#undoCard").addEventListener("click", () => { order.pop(); render(); });
  document.querySelector("#checkActivity").addEventListener("click", () => {
    const ok = expected.every((item, index) => order[index] === item);
    if (ok) {
      feedback.textContent = "Chaîne juste : l’eau transporte l’énergie de la production vers l’émetteur, puis le local.";
      feedback.className = "feedback good";
      shell.setStatus("Chaîne reliée", "ok");
      shell.unlockQuiz();
    } else {
      const bad = expected.findIndex((item, index) => order[index] !== item);
      feedback.textContent = `Ordre à revoir dès l’étape ${bad + 1}. Demandez-vous qui fournit, transporte, transfère et reçoit.`;
      feedback.className = "feedback error";
      shell.setStatus("Chaîne à revoir", "bad");
    }
  });
  render();
})();
