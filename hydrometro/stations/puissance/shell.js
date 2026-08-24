"use strict";

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function init(config) {
    function hacherTexte(texte) {
      let hash = 5381;
      for (let i = 0; i < texte.length; i += 1) hash = ((hash * 33) ^ texte.charCodeAt(i)) >>> 0;
      hash ^= hash >>> 16; hash = Math.imul(hash, 0x45d9f3b) >>> 0;
      hash ^= hash >>> 16; hash = Math.imul(hash, 0x45d9f3b) >>> 0;
      hash ^= hash >>> 16;
      return hash >>> 0;
    }

    function permutationDepuisIndex(n, graine) {
      const factorielles = [1];
      for (let i = 1; i <= n; i += 1) factorielles[i] = factorielles[i - 1] * i;
      let reste = graine % factorielles[n];
      const disponibles = Array.from({ length: n }, (_, i) => i);
      const permutation = [];
      for (let i = n; i > 0; i -= 1) {
        const f = factorielles[i - 1];
        const choix = Math.floor(reste / f);
        permutation.push(disponibles.splice(choix, 1)[0]);
        reste %= f;
      }
      return permutation;
    }

    function melangerReponses(prompt, options, correct) {
      const n = options.length;
      if (n < 2) return { options, correct };
      const permutation = permutationDepuisIndex(n, hacherTexte(prompt || ""));
      return { options: permutation.map((i) => options[i]), correct: permutation.indexOf(correct) };
    }

    config.quiz = config.quiz.map((question) => ({ ...question, ...melangerReponses(question.prompt, question.options, question.correct) }));

    let level = "TP";
    let quizIndex = 0;
    let score = 0;
    let answered = false;

    const activityView = $("#activityView");
    const quizView = $("#quizView");
    const resultView = $("#resultView");
    const startQuiz = $("#startQuiz");
    const infoDialog = $("#infoDialog");

    function renderLevel() {
      const current = config.levels[level] || config.levels.TP;
      $("#levelObjective").textContent = current.objective;
      $("#levelDetails").innerHTML = `<h3>${current.name}</h3><p><strong>Objectif :</strong> ${current.objective}</p><p><strong>Attendus :</strong> ${current.learn.join(" · ")}</p>`;
      $$("[data-level]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.level === level)));
    }

    $$("[data-level]").forEach((button) => button.addEventListener("click", () => {
      level = button.dataset.level;
      renderLevel();
    }));

    $("#infoButton").addEventListener("click", () => {
      if (typeof infoDialog.showModal === "function") infoDialog.showModal();
      else infoDialog.setAttribute("open", "");
    });
    $("#closeInfo").addEventListener("click", () => infoDialog.close ? infoDialog.close() : infoDialog.removeAttribute("open"));
    $("#backPlan").addEventListener("click", () => { window.location.href = "../../index.html#visited=puissance"; });

    function renderQuiz() {
      const q = config.quiz[quizIndex];
      answered = false;
      quizView.innerHTML = `<article class="quiz-card"><div class="quiz-progress">Question ${quizIndex + 1} sur ${config.quiz.length} · réponse verrouillée après validation</div><div class="question">${q.prompt}</div><div class="answers" role="group" aria-label="Réponses">${q.options.map((option, index) => `<button type="button" data-answer="${index}">${option}</button>`).join("")}</div><div><p class="explanation" aria-live="polite">Choisis une réponse.</p><div class="quiz-actions"><button type="button" data-quiz-action="activity">Revoir la manipulation</button><button type="button" class="primary" data-quiz-action="next" disabled>${quizIndex === config.quiz.length - 1 ? "Voir le bilan" : "Question suivante"}</button></div></div></article>`;
      $$("[data-answer]", quizView).forEach((button) => button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer))));
      $("[data-quiz-action='activity']", quizView).addEventListener("click", showActivity);
      $("[data-quiz-action='next']", quizView).addEventListener("click", nextQuestion);
    }

    function answerQuestion(choice) {
      if (answered) return;
      answered = true;
      const q = config.quiz[quizIndex];
      if (choice === q.correct) score += 1;
      $$("[data-answer]", quizView).forEach((button, index) => {
        button.disabled = true;
        if (index === q.correct) button.classList.add("correct");
        else if (index === choice) button.classList.add("wrong");
      });
      $(".explanation", quizView).textContent = `${choice === q.correct ? "Correct. " : "À revoir. "}${q.explanation}`;
      $("[data-quiz-action='next']", quizView).disabled = false;
    }

    function nextQuestion() {
      if (!answered) return;
      if (quizIndex < config.quiz.length - 1) {
        quizIndex += 1;
        renderQuiz();
      } else renderResult();
    }

    function renderResult() {
      quizView.classList.add("hidden");
      resultView.classList.remove("hidden");
      const state = score >= 3 ? "Acquis formatif" : score === 2 ? "Fragile" : "À renforcer";
      const stateClass = score >= 3 ? "ok" : "wait";
      resultView.innerHTML = `<article class="result-card"><div class="kicker">Bilan de station</div><h2>${config.title}</h2><p class="result-state ${stateClass}">${state}</p><p><strong>${score} / ${config.quiz.length}</strong> réponses justes.</p><p>${score >= 3 ? config.successMessage : "Refais la manipulation et lis les corrections avant un nouvel essai."}</p><p>Ce résultat est un entraînement. Il ne valide aucun diplôme.</p><div class="choice-grid"><button type="button" data-result="retry">Refaire les questions</button><button type="button" class="primary" data-result="next">${config.nextLabel}</button></div></article>`;
      $("[data-result='retry']", resultView).addEventListener("click", startAssessment);
      $("[data-result='next']", resultView).addEventListener("click", () => { window.location.href = config.nextHref; });
    }

    function showActivity() {
      quizView.classList.add("hidden");
      resultView.classList.add("hidden");
      activityView.classList.remove("hidden");
    }

    function startAssessment() {
      quizIndex = 0;
      score = 0;
      activityView.classList.add("hidden");
      resultView.classList.add("hidden");
      quizView.classList.remove("hidden");
      renderQuiz();
    }

    startQuiz.addEventListener("click", startAssessment);
    renderLevel();

    return {
      unlockQuiz() { startQuiz.disabled = false; },
      setStatus(text, kind = "") {
        const status = $("#activityStatus");
        status.textContent = text;
        status.className = `status-pill ${kind}`.trim();
      },
      showActivity
    };
  }

  globalThis.HydroStation = { init };
})();
