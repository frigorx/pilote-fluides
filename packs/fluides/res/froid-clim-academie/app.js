const modules = [
  {
    title: "1. Le cycle frigorifique",
    text: "Compression, condensation, détente et évaporation avec animation des changements d'état.",
    tags: ["CAP", "Bac Pro", "schéma animé"]
  },
  {
    title: "2. Pressions et températures",
    text: "Lire une relation pression-température, anticiper les effets d'un condenseur encrassé ou d'un manque de charge.",
    tags: ["mesures", "manomètres", "terrain"]
  },
  {
    title: "3. Surchauffe et sous-refroidissement",
    text: "Comprendre les réglages qui protègent le compresseur et garantissent le remplissage liquide.",
    tags: ["détendeur", "contrôle", "diagnostic"]
  },
  {
    title: "4. Fluides et réglementation",
    text: "PRP, tCO2e, récupération, traçabilité, CERFA et séparation stricte entre entraînement et officiel.",
    tags: ["F-Gas", "registre", "sécurité"]
  },
  {
    title: "5. Contrôle d'étanchéité",
    text: "Fréquences, seuils, recherche de fuite, réparation et contrôle de suivi avec logique de décision.",
    tags: ["fuite", "attestation", "procédure"]
  },
  {
    title: "6. Électricité appliquée",
    text: "Protections, pressostats, contacteurs, sondes et lecture de schéma par situations interactives.",
    tags: ["schéma", "mesure", "sécurité"]
  },
  {
    title: "7. Mise en service",
    text: "Tirage au vide, azote, charge, pesée, relevés et compte-rendu enseignant.",
    tags: ["TP", "checklist", "gestes pro"]
  },
  {
    title: "8. Diagnostic avancé",
    text: "Comparer symptômes, mesures et hypothèses pour construire un raisonnement professionnel.",
    tags: ["pannes", "jeu", "oral"]
  }
];

const cases = [
  {
    title: "Charge insuffisante",
    symptoms: ["BP basse", "HP basse", "Surchauffe élevée", "Bulles au voyant liquide"],
    answer: "Manque de fluide",
    options: ["Manque de fluide", "Incondensables", "Détendeur trop ouvert"]
  },
  {
    title: "Condenseur encrassé",
    symptoms: ["HP élevée", "Sous-refroidissement parfois élevé", "Air de rejet très chaud", "Intensité compresseur en hausse"],
    answer: "Échange condenseur insuffisant",
    options: ["Échange condenseur insuffisant", "Évaporateur givré", "Filtre déshydrateur bouché"]
  },
  {
    title: "Détendeur trop fermé",
    symptoms: ["BP basse", "Surchauffe très élevée", "Évaporateur mal alimenté", "Retour compresseur trop chaud"],
    answer: "Débit détendeur insuffisant",
    options: ["Débit détendeur insuffisant", "Surplus de charge", "Ventilateur condenseur bloqué"]
  },
  {
    title: "Présence d'incondensables",
    symptoms: ["HP anormalement élevée", "Sous-refroidissement incohérent", "Température de refoulement haute", "Historique d'intervention douteux"],
    answer: "Air ou azote dans le circuit",
    options: ["Air ou azote dans le circuit", "Évaporateur trop propre", "Thermostat réglé trop bas"]
  }
];

const questions = [
  {
    text: "Quel organe augmente la pression et la température du fluide ?",
    answers: ["Compresseur", "Détendeur", "Évaporateur"],
    correct: 0
  },
  {
    text: "Une surchauffe trop élevée indique souvent…",
    answers: ["Un évaporateur sous-alimenté", "Un condenseur trop grand", "Une bouteille trop froide"],
    correct: 0
  },
  {
    text: "Le sous-refroidissement se mesure sur quelle partie du circuit ?",
    answers: ["Ligne liquide", "Aspiration compresseur", "Sortie evaporateur"],
    correct: 0
  },
  {
    text: "Pourquoi séparer formation et officiel dans les documents fluides ?",
    answers: ["Pour éviter qu'un exercice ressemble à une preuve réglementaire", "Pour accélérer les calculs", "Pour supprimer les signatures"],
    correct: 0
  }
];

const moduleGrid = document.querySelector("#moduleGrid");
const canvas = document.querySelector("#cycleCanvas");
const ctx = canvas.getContext("2d");
const evapTemp = document.querySelector("#evapTemp");
const condTemp = document.querySelector("#condTemp");
const superheat = document.querySelector("#superheat");
const subcool = document.querySelector("#subcool");
const diagnosticChoices = document.querySelector("#diagnosticChoices");
const answerList = document.querySelector("#answerList");

let cycleTick = 0;
let caseIndex = 0;
let questionIndex = 0;
let score = 0;
let answered = 0;

function renderModules() {
  moduleGrid.innerHTML = modules.map((module) => `
    <article class="module">
      <strong>${module.title}</strong>
      <p>${module.text}</p>
      <div class="tag-row">${module.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function pressureFromTemp(temp, offset) {
  return Math.max(.6, (temp + 38) * offset / 18);
}

function updateSimulator() {
  const evap = Number(evapTemp.value);
  const cond = Number(condTemp.value);
  const sh = Number(superheat.value);
  const sc = Number(subcool.value);
  const bp = pressureFromTemp(evap, 2.1);
  const hp = pressureFromTemp(cond, 3.2);
  let risk = "Réglage cohérent";
  let explain = "Le détendeur alimente correctement l'évaporateur. Les élèves peuvent relier les valeurs aux symptômes terrain.";

  if (sh > 13) {
    risk = "Évaporateur sous-alimenté";
    explain = "La surchauffe élevée oriente vers un manque de débit : charge faible, filtre bouché ou détendeur trop fermé.";
  } else if (sh < 3) {
    risk = "Risque de retour liquide";
    explain = "La surchauffe trop faible peut mettre le compresseur en danger. C'est un excellent débat de classe.";
  } else if (sc < 2) {
    risk = "Ligne liquide fragile";
    explain = "Le sous-refroidissement faible peut favoriser les bulles avant détendeur et perturber l'alimentation.";
  } else if (cond > 55) {
    risk = "Condensation trop haute";
    explain = "La HP augmente : condenseur sale, manque d'air, température ambiante haute ou incondensables.";
  }

  document.querySelector("#evapOut").textContent = `${evap} °C`;
  document.querySelector("#condOut").textContent = `${cond} °C`;
  document.querySelector("#superheatOut").textContent = `${sh} K`;
  document.querySelector("#subcoolOut").textContent = `${sc} K`;
  document.querySelector("#bpValue").textContent = `${bp.toFixed(1)} bar`;
  document.querySelector("#hpValue").textContent = `${hp.toFixed(1)} bar`;
  document.querySelector("#riskValue").textContent = risk;
  document.querySelector("#simExplain").textContent = explain;
}

function drawComponent(x, y, w, h, label, color) {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 16);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#15202b";
  ctx.font = '700 25px "Trebuchet MS", Calibri, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(label, x + w / 2, y + h / 2 + 8);
}

function drawPipe(points, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 16;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.stroke();
}

function pointOnPath(points, t) {
  const segments = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const length = Math.hypot(x2 - x1, y2 - y1);
    segments.push({ x1, y1, x2, y2, length });
    total += length;
  }
  let distance = (t % 1) * total;
  for (const segment of segments) {
    if (distance <= segment.length) {
      const ratio = distance / segment.length;
      return {
        x: segment.x1 + (segment.x2 - segment.x1) * ratio,
        y: segment.y1 + (segment.y2 - segment.y1) * ratio
      };
    }
    distance -= segment.length;
  }
  return { x: points[0][0], y: points[0][1] };
}

function animateCycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const coldPath = [[160, 355], [160, 430], [560, 430], [560, 355]];
  const hotPath = [[560, 165], [560, 90], [160, 90], [160, 165]];
  const leftPath = [[160, 165], [160, 355]];
  const rightPath = [[560, 355], [560, 165]];

  drawPipe(coldPath, "#1069a8");
  drawPipe(hotPath, "#d44838");
  drawPipe(leftPath, "#21a7b8");
  drawPipe(rightPath, "#7b4bb1");
  drawComponent(70, 170, 180, 96, "Détendeur", "#21a7b8");
  drawComponent(470, 170, 180, 96, "Compresseur", "#7b4bb1");
  drawComponent(70, 338, 180, 96, "Évaporateur", "#1069a8");
  drawComponent(470, 72, 180, 96, "Condenseur", "#d44838");

  const paths = [
    { points: coldPath, color: "#ffffff", stroke: "#1069a8" },
    { points: rightPath, color: "#ffffff", stroke: "#7b4bb1" },
    { points: hotPath, color: "#ffffff", stroke: "#d44838" },
    { points: leftPath, color: "#ffffff", stroke: "#21a7b8" }
  ];

  paths.forEach((path, pathIndex) => {
    for (let i = 0; i < 4; i += 1) {
      const dot = pointOnPath(path.points, cycleTick + i * .25 + pathIndex * .04);
      ctx.beginPath();
      ctx.fillStyle = path.color;
      ctx.strokeStyle = path.stroke;
      ctx.lineWidth = 4;
      ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  });

  cycleTick += .004;
  requestAnimationFrame(animateCycle);
}

function renderCase() {
  const item = cases[caseIndex];
  document.querySelector("#caseNumber").textContent = caseIndex + 1;
  document.querySelector("#caseTitle").textContent = item.title;
  document.querySelector("#caseSymptoms").innerHTML = item.symptoms.map((symptom) => `<li>${symptom}</li>`).join("");
  diagnosticChoices.innerHTML = item.options.map((option) => `<button type="button">${option}</button>`).join("");
  [...diagnosticChoices.querySelectorAll("button")].forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add(button.textContent === item.answer ? "correct" : "wrong");
    });
  });
}

function renderQuestion() {
  const question = questions[questionIndex];
  document.querySelector("#questionText").textContent = question.text;
  document.querySelector("#scoreValue").textContent = `${score} / ${answered}`;
  answerList.innerHTML = question.answers.map((answer, index) => `<button type="button" data-index="${index}">${answer}</button>`).join("");
  [...answerList.querySelectorAll("button")].forEach((button) => {
    button.addEventListener("click", () => {
      const chosen = Number(button.dataset.index);
      answered += 1;
      if (chosen === question.correct) {
        score += 1;
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
        answerList.querySelector(`[data-index="${question.correct}"]`).classList.add("correct");
      }
      [...answerList.querySelectorAll("button")].forEach((item) => item.disabled = true);
      setTimeout(() => {
        questionIndex = (questionIndex + 1) % questions.length;
        renderQuestion();
      }, 900);
    });
  });
}

renderModules();
updateSimulator();
animateCycle();
renderCase();
renderQuestion();

[evapTemp, condTemp, superheat, subcool].forEach((control) => {
  control.addEventListener("input", updateSimulator);
});

document.querySelector("#nextCase").addEventListener("click", () => {
  caseIndex = (caseIndex + 1) % cases.length;
  renderCase();
});

/* ---------- la voix (chantier prof vocal, 18/10/2026) ----------
   La page défile en cinq parties ; chacune a son texte pour l'oreille (NARRATIONS) : la voix explique la partie, elle
   ne relit pas l'écran. « Écouter » lit la partie courante (celle qu'on voit, ou celle où « Partie suivante » mène) ;
   changer de partie coupe la voix, changer la vitesse commune aussi. Le prof vocal du site passe d'une partie à la
   suivante et s'arrête à l'atelier panne, la première question. */
(() => {
  const NARRATIONS = {
      "hero": "Cette base de site est pensée pour animer un cours de froid et de climatisation, avec une idée simple : faire manipuler d’abord, faire retenir ensuite. Chaque notion se traduit par une action à faire, un réglage à modifier ou un défi à relever, plutôt que par un texte à lire. En haut, un cycle frigorifique s’anime, avec une légende qui distingue la haute pression, la basse pression et la détente. Plus bas, la page enchaîne le parcours de huit modules, un simulateur, un atelier panne et un quiz.",
      "modules": "Huit modules forment un parcours progressif. Le premier pose le cycle frigorifique. Viennent ensuite les pressions et les températures, puis la surchauffe et le sous-refroidissement, des réglages qui protègent le compresseur. Le cadre à respecter suit, avec les fluides, la réglementation et l’étanchéité, puis l’électricité appliquée. La mise en service rassemble les gestes professionnels, du tirage au vide à la charge. Le diagnostic avancé termine le parcours en comparant symptômes, mesures et hypothèses. Chaque module est prêt à devenir un cours.",
      "simulateur": "Ce simulateur fonctionne avec quatre réglages : les températures d’évaporation et de condensation, la surchauffe et le sous-refroidissement. Les deux pressions ne se règlent pas : elles sont estimées à partir des deux températures. Un indicateur de risque pédagogique dit en plus si l’ensemble reste cohérent. Modifiez un curseur et regardez comment les pressions et le message réagissent. Le but est de relier ces valeurs aux symptômes que l’on rencontre sur le terrain, ce qui prépare l’atelier panne qui suit.",
      "atelier": "Voici un jeu de diagnostic. Chaque cas affiche plusieurs symptômes, et il s’agit d’en déduire la cause probable parmi trois propositions. La bonne méthode consiste à ne pas s’arrêter au premier signe : on confronte chaque cause à l’ensemble des symptômes, et toute cause qui en contredit un est écartée. C’est le raisonnement attendu d’un professionnel : comparer symptômes, mesures et hypothèses. Après chaque choix, la page indique si la cause retenue est la bonne. Le bouton Autre panne propose un nouveau cas. À vous de trouver la cause probable.",
      "quiz": "Ce quiz flash termine la séance. C’est une évaluation automatique : le score, en haut, suit vos réponses, et après chaque choix la page indique si la réponse est juste. Le bouton Recommencer permet de repartir de zéro. Pour répondre, passez en revue les organes du cycle et rappelez-vous ce que chacun fait subir au fluide. Trois réponses sont proposées. Voici la première question. Quel organe augmente la pression et la température du fluide ?"
  };
  const PARTIES = [["hero", ".hero", "le cycle"], ["modules", "#modules", "les modules"], ["simulateur", "#simulateur", "le simulateur"],
    ["atelier", "#atelier", "l'atelier panne"], ["quiz", "#quiz", "le quiz"]].map(([id, sel, nom]) => ({ id, nom, el: document.querySelector(sel) })).filter((p) => p.el);
  const ecoute = document.querySelector("#listen"), compteur = document.querySelector("#step-count"), suivante = document.querySelector("#partie-suivante");
  let courante = 0, parle = false, lecture = 0, guidee = 0;
  const voixFr = () => {
    const fr = ("speechSynthesis" in window ? speechSynthesis.getVoices() : []).filter((v) => v.lang.toLowerCase().startsWith("fr"));
    return fr.find((v) => /natural|neural|online/i.test(v.name)) || fr.find((v) => /google/i.test(v.name)) || fr.find((v) => v.lang.toLowerCase() === "fr-fr") || fr[0] || null;
  };
  const majEcoute = () => { ecoute.textContent = parle ? "■ Arrêter" : "▶ Écouter"; ecoute.setAttribute("aria-pressed", String(parle)); };
  function taire() { lecture++; parle = false; if ("speechSynthesis" in window) speechSynthesis.cancel(); majEcoute(); }
  function marquer(i) {
    courante = i;
    PARTIES.forEach((p, k) => p.el.toggleAttribute("data-prof-zone", k === i));   // la zone que le prof vocal observe
    compteur.textContent = `Partie ${i + 1} sur ${PARTIES.length} · ${PARTIES[i].nom}`;
    suivante.disabled = i === PARTIES.length - 1;
  }
  function aller(i) { taire(); guidee = Date.now(); marquer(i); PARTIES[i].el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function ecouter() {
    if (parle) { taire(); return; }
    const texte = NARRATIONS[PARTIES[courante].id];
    if (!texte || !("speechSynthesis" in window)) return;
    taire();
    const run = lecture, u = new SpeechSynthesisUtterance(texte), v = voixFr();
    u.lang = "fr-FR"; if (v) u.voice = v;
    u.rate = window.PILOTE_VOIX_REGLAGE ? window.PILOTE_VOIX_REGLAGE.vitesse() : 0.95;
    u.onstart = () => { if (run !== lecture) return; parle = true; majEcoute(); };
    u.onend = u.onerror = () => { if (run !== lecture) return; parle = false; majEcoute(); };
    speechSynthesis.speak(u);
  }
  ecoute.addEventListener("click", ecouter);
  suivante.addEventListener("click", () => aller(Math.min(courante + 1, PARTIES.length - 1)));
  document.querySelectorAll('.topbar nav a[href^="#"]').forEach((a) => a.addEventListener("click", () => {
    const i = PARTIES.findIndex((p) => "#" + p.el.id === a.getAttribute("href"));
    if (i >= 0) { taire(); guidee = Date.now(); marquer(i); }
  }));
  /* l'élève qui fait défiler la page : la partie qu'il voit devient la partie courante, sans couper une voix en cours ;
     le prof vocal en marche mène lui-même, le défilement ne le dérange pas */
  if ("IntersectionObserver" in window) {
    const vues = new Map();
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => vues.set(e.target, e.isIntersecting ? e.intersectionRect.height : 0));   // la hauteur vue, en pixels
      if (parle || Date.now() - guidee < 1500 || (window.PiloteProfVocal && window.PiloteProfVocal.etat().actif)) return;
      let meilleure = courante, vu = 0;
      PARTIES.forEach((p, k) => { const h = vues.get(p.el) || 0; if (h > vu) { vu = h; meilleure = k; } });
      if (vu > 0 && meilleure !== courante) marquer(meilleure);
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: "-90px 0px 0px 0px" });
    PARTIES.forEach((p) => io.observe(p.el));
  }
  document.addEventListener("pilotevoix:vitesse", taire);
  document.addEventListener("visibilitychange", () => { if (document.hidden) taire(); });
  marquer(0);
})();

document.querySelector("#resetQuiz").addEventListener("click", () => {
  score = 0;
  answered = 0;
  questionIndex = 0;
  renderQuestion();
});
