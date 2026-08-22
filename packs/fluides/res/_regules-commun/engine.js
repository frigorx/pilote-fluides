(function () {
  "use strict";

  var catalog = window.REGULES_CATALOG;
  var moduleId = document.body.getAttribute("data-module-id");
  var module = catalog && catalog.modules.find(function (item) { return item.id === moduleId; });

  if (!catalog || !module) {
    document.body.innerHTML = '<main class="fatal"><h1>Station indisponible</h1><p>Le catalogue commun n\'a pas pu être chargé.</p></main>';
    return;
  }

  window.REGULE_MODULE = module;

  var filmScreenCount = (module.films || []).length ? 1 : 0;
  var lessonOffset = filmScreenCount;
  var quizScreen = lessonOffset + module.lessons.length;
  var totalScreens = quizScreen + 1;

  var state = {
    screen: 0,
    furthest: 0,
    filmIndex: 0,
    quizIndex: 0,
    score: 0,
    answered: false,
    sequenceStep: 0
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char];
    });
  }

  function shell() {
    document.body.innerHTML = [
      '<a class="skip-link" href="#lesson-card">Aller au contenu</a>',
      '<main class="app" id="app">',
      '  <header class="topbar">',
      '    <a class="brand" href="../regules-interactif/index.html" aria-label="Revenir à la carte Les régules">',
      '      <img class="brand-logo" src="../_regules-commun/logo-inerweb-edu.svg" alt="inerWeb Édu">',
      '    </a>',
      '    <div class="module-heading"><p>' + escapeHtml(module.family) + ' · Station ' + module.number + '</p><h1>' + escapeHtml(module.title) + '</h1></div>',
    /* La voix est FABRIQUÉE (MP3 posés par voix/fabriquer-regules.mjs) : le
       bouton n'existe que si le catalogue déclare voixFabriquee. Jamais de
       synthèse navigateur, même en repli (doctrine VOIX-DES-FILMS.md) : un
       fichier manquant reste muet. */
      '    <div class="tools" aria-label="Outils de lecture">',
      (catalog.voixFabriquee
        ? '      <button id="voice-button" class="tool-button" type="button" aria-label="Écouter cet écran" aria-pressed="false" title="Écouter l’écran">▶ <span>Écouter</span></button>' +
          '<button id="stop-voice" class="tool-button" type="button" aria-label="Arrêter la voix" disabled title="Arrêter la voix">■ <span>Stop</span></button>' +
          '<span id="voice-status" class="voice-status" role="status">Voix arrêtée</span>'
        : ""),
      '      <button id="sources-button" class="tool-button" type="button" aria-label="Ouvrir les sources">ⓘ <span>Sources</span></button>',
      '    </div>',
      '  </header>',
      '  <div class="workbench">',
      '    <nav class="station-nav" id="stations" aria-label="Écrans de la station"></nav>',
      '    <article class="lesson-card" id="lesson-card" tabindex="-1" aria-live="off"></article>',
      '  </div>',
      '  <footer class="bottombar">',
      '    <button id="previous-button" class="nav-button secondary" type="button">← Précédent</button>',
      '    <div class="progress-wrap"><span id="progress-text"></span><div class="progress-track" aria-hidden="true"><span id="progress-bar"></span></div></div>',
      '    <button id="next-button" class="nav-button primary" type="button">Suivant →</button>',
      '  </footer>',
      '</main>',
      '<dialog id="sources-dialog" aria-labelledby="sources-title"><div class="dialog-head"><h2 id="sources-title">Sources et statut</h2><button id="close-sources" type="button" aria-label="Fermer">×</button></div><div id="sources-content"></div></dialog>',
      '<p class="sr-only" id="live-status" aria-live="polite"></p>'
    ].join("\n");
  }

  function buildNav() {
    var nav = document.getElementById("stations");
    var items = [];
    if (filmScreenCount) {
      items.push('<button type="button" class="station-tab film-tab" data-screen="0" aria-label="Étape 1 : regarder le film"><span>1</span><b>Film</b></button>');
    }
    module.lessons.forEach(function (lesson, index) {
      var screen = lessonOffset + index;
      var number = filmScreenCount ? "2." + (index + 1) : String(index + 1);
      items.push('<button type="button" class="station-tab" data-screen="' + screen + '" aria-label="Cours, écran ' + (index + 1) + ' : ' + escapeHtml(lesson.short) + '"><span>' + number + '</span><b>' + escapeHtml(lesson.short) + '</b></button>');
    });
    items.push('<button type="button" class="station-tab quiz-tab" data-screen="' + quizScreen + '" aria-label="Questionnaire final"><span>' + (filmScreenCount ? "3" : "✓") + '</span><b>Questionnaire</b></button>');
    nav.innerHTML = items.join("");
    nav.style.setProperty("--screen-count", items.length);
    nav.addEventListener("click", function (event) {
      var button = event.target.closest("[data-screen]");
      if (button) { goTo(Number(button.getAttribute("data-screen"))); }
    });
  }

  function boxMarkup(box) {
    return '<aside class="lesson-box ' + escapeHtml(box.type) + '"><strong>' + escapeHtml(box.label) + '</strong><p>' + escapeHtml(box.text) + '</p></aside>';
  }

  function ladderVisual(visual) {
    var rows = visual.rungs.map(function (rung) {
      var contacts = (rung.contacts || []).map(function (contact) {
        return '<span class="function-chip"><b>' + escapeHtml(contact.code) + '</b><small>' + escapeHtml(contact.label) + '</small></span>';
      });
      contacts.push('<span class="function-chip output"><b>' + escapeHtml(rung.coil.code) + '</b><small>' + escapeHtml(rung.coil.label) + '</small></span>');
      return '<li class="function-row"><strong>' + escapeHtml(rung.label) + '</strong><div class="function-chain">' + contacts.join('<span class="function-arrow" aria-hidden="true">→</span>') + '</div></li>';
    }).join("");
    return '<figure class="functional-figure" role="group" aria-label="' + escapeHtml(visual.label) + '"><div class="functional-head"><p>LECTURE FONCTIONNELLE</p><h3>' + escapeHtml(visual.title) + '</h3></div><ol>' + rows + '</ol><figcaption><strong>Ce n’est pas un schéma de câblage.</strong> Les symboles électriques non validés ont été retirés. Le film conserve la vue complète du fonctionnement.</figcaption></figure>';
  }

  function sequenceVisual(visual) {
    var steps = visual.steps.map(function (step, index) {
      return '<li class="sequence-step' + (index === state.sequenceStep ? ' active' : '') + '" data-sequence-step="' + index + '"><span>' + (index + 1) + '</span><p>' + escapeHtml(step) + '</p></li>';
    }).join("");
    return '<section class="sequence-visual" role="img" aria-label="' + escapeHtml(visual.label) + '"><ol>' + steps + '</ol><div class="sequence-controls"><button class="sequence-next" type="button">Étape suivante →</button><span>' + (state.sequenceStep + 1) + ' / ' + visual.steps.length + '</span></div><p class="visual-note">Déclenchement manuel : aucune animation ne démarre seule.</p></section>';
  }

  function compareVisual(visual) {
    return '<section class="compare-visual" role="img" aria-label="' + escapeHtml(visual.label) + '">' + visual.cards.map(function (card) {
      return '<article class="compare-card state-' + escapeHtml(card.state) + '"><strong>' + escapeHtml(card.title) + '</strong><p>' + escapeHtml(card.text) + '</p></article>';
    }).join("") + '</section>';
  }

  function timelineVisual(visual) {
    return '<section class="timeline-visual" role="img" aria-label="' + escapeHtml(visual.label) + '"><ol>' + visual.phases.map(function (phase, index) {
      return '<li><span>' + (index + 1) + '</span><p>' + escapeHtml(phase) + '</p></li>';
    }).join("") + '</ol><p class="visual-note">Ordre fonctionnel : les temps et seuils dépendent de l’installation.</p></section>';
  }

  function circuitVisual(visual) {
    var mode = visual.mode;
    var electric = mode === "electric" ? '<path d="M248 302 q12 -22 24 0 t24 0 t24 0 t24 0" class="heater"/><text x="296" y="332" text-anchor="middle" class="svg-label hot">RÉSISTANCES</text>' : '';
    var hotgas = mode === "hotgas" ? '<path d="M560 243 C500 320 405 324 362 290" class="hotgas-path"/><text x="462" y="335" text-anchor="middle" class="svg-label hot">GAZ CHAUDS · DÉRIVATION</text>' : '';
    var reverse = mode === "reverse" ? '<rect x="486" y="162" width="76" height="48" rx="10" class="fourway"/><text x="524" y="181" text-anchor="middle" class="svg-code">V4V</text><text x="524" y="198" text-anchor="middle" class="svg-mini">INVERSION</text>' : '';
    var off = mode === "offcycle" ? '<text x="345" y="196" text-anchor="middle" class="off-label">ARRÊT DU FROID · AUCUNE COMMANDE DÉGIVRAGE</text>' : '';
    var modeTitle = { offcycle: "Sans dégivrage commandé", electric: "Dégivrage électrique", hotgas: "Dégivrage par gaz chauds", reverse: "Dégivrage par inversion de cycle" }[mode] || "Circuit frigorifique";
    var directionClass = mode === "reverse" ? "flow reverse-flow" : "flow";
    return '<figure class="visual-figure circuit-figure"><svg viewBox="0 0 690 390" role="img" aria-label="' + escapeHtml(visual.label) + '"><title>' + escapeHtml(visual.label) + '</title><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" class="arrow-fill"/></marker></defs><text x="345" y="27" text-anchor="middle" class="svg-title">' + modeTitle + '</text><path d="M151 103 H510 Q565 103 565 158 V250 Q565 290 520 290 H170 Q110 290 110 236 V145 Q110 103 151 103" class="circuit-pipe"/><path d="M165 103 H480" class="' + directionClass + '" marker-end="url(#arrow)"/><path d="M565 155 V232" class="' + directionClass + '" marker-end="url(#arrow)"/><path d="M500 290 H188" class="' + directionClass + '" marker-end="url(#arrow)"/><path d="M110 232 V155" class="' + directionClass + '" marker-end="url(#arrow)"/>' +
      '<g class="component"><rect x="248" y="62" width="194" height="82" rx="15"/><image href="../symboles/echangeur_a_air.svg" x="270" y="68" width="58" height="58"/><text x="350" y="94" class="svg-code">CONDENSEUR</text><text x="350" y="119" class="svg-mini">échangeur extérieur</text></g>' +
      '<g class="component"><rect x="218" y="248" width="216" height="84" rx="15"/><image href="../symboles/echangeur_a_air.svg" x="234" y="258" width="58" height="58"/><text x="312" y="280" class="svg-code">ÉVAPORATEUR</text><text x="312" y="306" class="svg-mini">batterie à dégivrer</text></g>' +
      '<g class="component small"><rect x="70" y="164" width="80" height="74" rx="15"/><image href="../symboles/detendeur_thermo_ext.svg" x="84" y="173" width="48" height="48"/><text x="110" y="231" text-anchor="middle" class="svg-mini">DÉTENDEUR</text></g>' +
      '<g class="component small"><rect x="522" y="218" width="86" height="83" rx="15"/><image href="../symboles/compresseur_general.svg" x="539" y="228" width="52" height="52"/><text x="565" y="293" text-anchor="middle" class="svg-mini">COMPRESSEUR</text></g>' + electric + hotgas + reverse + off + '</svg><figcaption>Repérage fonctionnel simplifié — les flèches et les mots indiquent le mode étudié.</figcaption></figure>';
  }

  function visualMarkup(visual) {
    if (visual.kind === "ladder") { return ladderVisual(visual); }
    if (visual.kind === "sequence") { return sequenceVisual(visual); }
    if (visual.kind === "compare") { return compareVisual(visual); }
    if (visual.kind === "timeline") { return timelineVisual(visual); }
    return circuitVisual(visual);
  }

  function renderLesson() {
    stopVoix();
    var lesson = module.lessons[state.screen - lessonOffset];
    state.sequenceStep = 0;
    var article = document.getElementById("lesson-card");
    article.className = "lesson-card";
    article.innerHTML = '<section class="copy-panel"><p class="kicker">' + escapeHtml(lesson.kicker) + '</p><h2>' + escapeHtml(lesson.title) + '</h2><p class="lead">' + escapeHtml(lesson.lead) + '</p><ul class="details">' + lesson.details.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>' + boxMarkup(lesson.box) + '</section><section class="visual-panel" aria-label="Illustration pédagogique">' + visualMarkup(lesson.visual) + '</section>';
    bindSequence(lesson.visual);
  }

  function renderFilm() {
    stopVoix();
    var films = module.films || [];
    var film = films[state.filmIndex] || films[0];
    var article = document.getElementById("lesson-card");
    article.className = "lesson-card film-screen";
    var choices = films.length > 1
      ? '<div class="film-choices" aria-label="Choisir le film">' + films.map(function (item, index) {
          return '<button type="button" class="film-choice' + (index === state.filmIndex ? ' active' : '') + '" data-film-index="' + index + '">' + escapeHtml(item.titre) + '</button>';
        }).join("") + '</div>'
      : "";
    var hasNarration = /08-pump-down-et-degivrage-electrique/.test(film.fichier);
    article.innerHTML = '<section class="film-intro"><p class="kicker">1 · Commencer par le film</p><h2>' + escapeHtml(module.title) + '</h2><p class="lead">Regarde d’abord le fonctionnement complet : circuit fluidique, commande électrique et actions restent visibles ensemble.</p>' + choices + '<p class="film-audio-note">' + (hasNarration ? 'La voix du film se lance uniquement avec le bouton « Écouter les explications ».' : 'Ce film est visuel. La voix du cours est disponible à l’écran suivant.') + '</p><a class="film-open" href="../_regules-commun/films/' + escapeHtml(film.fichier) + '" target="_blank" rel="noopener">Ouvrir le film en grand ↗</a></section><section class="film-stage"><iframe id="film-frame" src="../_regules-commun/films/' + escapeHtml(film.fichier) + '" title="Film : ' + escapeHtml(film.titre) + '" loading="eager"></iframe></section>';
    article.querySelectorAll("[data-film-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.filmIndex = Number(button.getAttribute("data-film-index"));
        renderFilm();
        updateChrome();
      });
    });
  }

  function bindSequence(visual) {
    var button = document.querySelector(".sequence-next");
    if (!button) { return; }
    button.addEventListener("click", function () {
      state.sequenceStep = (state.sequenceStep + 1) % visual.steps.length;
      document.querySelectorAll(".sequence-step").forEach(function (item, index) { item.classList.toggle("active", index === state.sequenceStep); });
      button.nextElementSibling.textContent = (state.sequenceStep + 1) + " / " + visual.steps.length;
      announce("Étape " + (state.sequenceStep + 1) + " : " + visual.steps[state.sequenceStep]);
    });
  }

  function renderQuiz() {
    stopVoix();
    var article = document.getElementById("lesson-card");
    article.className = "lesson-card quiz-screen";
    if (state.quizIndex >= module.quiz.length) {
      var perfect = state.score === module.quiz.length;
      article.innerHTML = '<section class="quiz-summary"><p class="kicker">Station ' + module.number + ' terminée</p><div class="score-medal" aria-label="Score ' + state.score + ' sur ' + module.quiz.length + '">' + state.score + '<small>/' + module.quiz.length + '</small></div><h2>' + (perfect ? 'Les causalités sont en place.' : 'Une reprise ciblée sera utile.') + '</h2><p>' + (perfect ? 'Tu peux passer à la régule suivante.' : 'Relis les écrans puis recommence le quiz pour consolider la séquence.') + '</p><div class="summary-actions"><button type="button" id="retry-quiz" class="nav-button secondary">Recommencer le quiz</button><a class="nav-button primary" href="' + escapeHtml(module.nextUrl) + '">' + escapeHtml(module.nextLabel) + ' →</a></div><p class="draft-note">' + escapeHtml(catalog.status) + '</p></section>';
      document.getElementById("retry-quiz").addEventListener("click", resetQuiz);
      return;
    }
    var question = module.quiz[state.quizIndex];
    article.innerHTML = '<section class="quiz-panel"><p class="kicker">Quiz final · Question ' + (state.quizIndex + 1) + ' / ' + module.quiz.length + '</p><h2>' + escapeHtml(question.prompt) + '</h2><div class="quiz-options">' + question.options.map(function (option, index) { return '<button type="button" class="quiz-option" data-option="' + index + '"><span>' + String.fromCharCode(65 + index) + '</span>' + escapeHtml(option) + '</button>'; }).join("") + '</div><div id="quiz-feedback" class="quiz-feedback" aria-live="polite"></div><button id="quiz-next" class="nav-button primary quiz-next" type="button" hidden>' + (state.quizIndex + 1 === module.quiz.length ? 'Voir le résultat →' : 'Question suivante →') + '</button></section>';
    document.querySelector(".quiz-options").addEventListener("click", answerQuiz);
  }

  function answerQuiz(event) {
    var button = event.target.closest("[data-option]");
    if (!button || state.answered) { return; }
    stopVoix();
    state.answered = true;
    var question = module.quiz[state.quizIndex];
    var choice = Number(button.getAttribute("data-option"));
    var correct = choice === question.correct;
    if (correct) { state.score += 1; }
    document.querySelectorAll(".quiz-option").forEach(function (item, index) {
      item.disabled = true;
      if (index === question.correct) { item.classList.add("correct"); item.insertAdjacentHTML("beforeend", '<strong class="answer-word">CORRECT</strong>'); }
      else if (index === choice) { item.classList.add("wrong"); item.insertAdjacentHTML("beforeend", '<strong class="answer-word">À REVOIR</strong>'); }
    });
    var feedback = document.getElementById("quiz-feedback");
    feedback.className = "quiz-feedback " + (correct ? "is-correct" : "is-wrong");
    feedback.innerHTML = '<strong>' + (correct ? 'Oui.' : 'Pas encore.') + '</strong> ' + escapeHtml(question.why);
    var next = document.getElementById("quiz-next");
    next.hidden = false;
    next.addEventListener("click", function () { state.quizIndex += 1; state.answered = false; renderQuiz(); updateChrome(); focusContent(); });
  }

  function resetQuiz() {
    state.quizIndex = 0;
    state.score = 0;
    state.answered = false;
    renderQuiz();
    updateChrome();
  }

  function goTo(index) {
    if (index < 0 || index > quizScreen) { return; }
    state.screen = index;
    state.furthest = Math.max(state.furthest, index);
    if (filmScreenCount && index === 0) { renderFilm(); }
    else if (index < quizScreen) { renderLesson(); }
    else { renderQuiz(); }
    updateChrome();
    focusContent();
  }

  function focusContent() {
    var article = document.getElementById("lesson-card");
    article.focus({ preventScroll: true });
  }

  function updateChrome() {
    var tabs = document.querySelectorAll(".station-tab");
    tabs.forEach(function (tab, index) {
      var active = index === state.screen;
      tab.classList.toggle("active", active);
      tab.classList.toggle("visited", index <= state.furthest);
      tab.setAttribute("aria-current", active ? "step" : "false");
    });
    var current = state.screen + 1;
    document.getElementById("progress-text").textContent = "Étape " + current + " / " + totalScreens;
    document.getElementById("progress-bar").style.width = (current / totalScreens * 100) + "%";
    document.getElementById("previous-button").disabled = state.screen === 0;
    var next = document.getElementById("next-button");
    next.disabled = state.screen === quizScreen;
    next.textContent = filmScreenCount && state.screen === 0
      ? "Passer au cours →"
      : state.screen === quizScreen - 1
        ? "Questionnaire final →"
        : "Suivant →";
    var voice = document.getElementById("voice-button");
    if (voice) {
      voice.disabled = filmScreenCount && state.screen === 0;
      if (voice.disabled) { setVoiceStatus("Voix du cours à l’écran suivant"); }
    }
  }

  function sourceMarkup() {
    var items = module.sourceKeys.map(function (key) {
      var source = catalog.sources[key];
      return '<article class="source-item"><h3>' + escapeHtml(source.title) + '</h3><p>' + escapeHtml(source.use) + '</p><code>' + escapeHtml(source.location) + '</code></article>';
    }).join("");
    return '<p class="status-chip">' + escapeHtml(catalog.status) + '</p><p>Les cours montrent des chaînes fonctionnelles et non des schémas de câblage. Les symboles électriques non validés ont été retirés. Toujours vérifier la notice constructeur et l’installation réelle.</p>' + items + '<p class="terminology-note"><strong>Repère de vocabulaire :</strong> les supports locaux emploient « pump-down amélioré », « single pump-down » et « tirage au vide unique amélioré ». Cette rame sépare leurs fonctions pour éviter de confondre relais anti-redémarrage et pressostat BP de sécurité.</p>';
  }

  function announce(text) { document.getElementById("live-status").textContent = text; }

  /* ── la voix fabriquée — 110 MP3 masculins embarqués, jamais la synthèse du navigateur.
     Écrans : voix/masculine/<écran>.mp3. Questions : q<n>.mp3 avant la réponse
     (l'énoncé seul, sans la livrer), q<n>-reponse.mp3 après. Le bilan reste
     muet : il annonce un score réel, un enregistrement figé mentirait. ── */
  var lecteur = null;
  window.REGULE_VOICE_STATUS = { state: "stopped", src: "", currentTime: 0, error: "" };

  function fichierVoix() {
    if (state.screen >= lessonOffset && state.screen < quizScreen) {
      return "voix/masculine/" + module.lessons[state.screen - lessonOffset].id + ".mp3";
    }
    if (state.quizIndex < module.quiz.length) {
      return "voix/masculine/q" + (state.quizIndex + 1) + (state.answered ? "-reponse" : "") + ".mp3";
    }
    return null;
  }

  function setVoiceStatus(text) {
    var status = document.getElementById("voice-status");
    if (status) { status.textContent = text; }
  }

  function majBoutonVoix(texte, enCours) {
    var bouton = document.getElementById("voice-button");
    if (bouton) {
      bouton.innerHTML = texte;
      bouton.setAttribute("aria-pressed", enCours ? "true" : "false");
      bouton.setAttribute("aria-label", texte.indexOf("Pause") >= 0
        ? "Mettre la voix en pause"
        : texte.indexOf("Reprendre") >= 0
          ? "Reprendre la voix"
          : "Écouter cet écran");
    }
    var stop = document.getElementById("stop-voice");
    if (stop) { stop.disabled = !enCours; }
  }

  function stopVoix() {
    if (lecteur) { lecteur.pause(); lecteur = null; }
    window.REGULE_VOICE_STATUS.state = "stopped";
    window.REGULE_VOICE_STATUS.currentTime = 0;
    majBoutonVoix("▶ <span>Écouter</span>", false);
    setVoiceStatus("Voix arrêtée");
  }

  function ecouter() {
    if (lecteur && !lecteur.paused) { lecteur.pause(); window.REGULE_VOICE_STATUS.state = "paused"; majBoutonVoix("▶ <span>Reprendre</span>", true); setVoiceStatus("Voix en pause"); return; }
    if (lecteur && lecteur.paused) {
      lecteur.play().catch(function () { setVoiceStatus("Lecture bloquée"); });
      majBoutonVoix("Ⅱ <span>Pause</span>", true);
      return;
    }
    var src = fichierVoix();
    if (!src) { return; }
    lecteur = new Audio(src);
    lecteur.preload = "auto";
    lecteur.volume = 1;
    lecteur.muted = false;
    window.REGULE_VOICE_STATUS = { state: "loading", src: src, currentTime: 0, error: "" };
    setVoiceStatus("Chargement de la voix…");
    lecteur.addEventListener("playing", function () {
      window.REGULE_VOICE_STATUS.state = "playing";
      setVoiceStatus("Voix en lecture · volume 100 %");
      announce("Lecture audio en cours.");
    });
    lecteur.addEventListener("timeupdate", function () { window.REGULE_VOICE_STATUS.currentTime = lecteur ? lecteur.currentTime : 0; });
    lecteur.addEventListener("ended", stopVoix);
    lecteur.addEventListener("error", function () {
      window.REGULE_VOICE_STATUS.state = "error";
      window.REGULE_VOICE_STATUS.error = "audio-unavailable";
      lecteur = null;
      majBoutonVoix("▶ <span>Écouter</span>", false);
      setVoiceStatus("Voix indisponible");
      announce("Le son de cet écran n’est pas disponible.");
    });
    var promesse = lecteur.play();
    if (promesse && promesse.catch) {
      promesse.catch(function () {
        window.REGULE_VOICE_STATUS.state = "error";
        window.REGULE_VOICE_STATUS.error = "playback-blocked";
        lecteur = null;
        majBoutonVoix("▶ <span>Écouter</span>", false);
        setVoiceStatus("Lecture bloquée");
        announce("La lecture audio a été bloquée par le navigateur.");
      });
    }
    majBoutonVoix("Ⅱ <span>Pause</span>", true);
  }

  function bindControls() {
    document.getElementById("previous-button").addEventListener("click", function () { goTo(state.screen - 1); });
    document.getElementById("next-button").addEventListener("click", function () { goTo(state.screen + 1); });
    if (catalog.voixFabriquee) {
      document.getElementById("voice-button").addEventListener("click", ecouter);
      document.getElementById("stop-voice").addEventListener("click", stopVoix);
    }
    var dialog = document.getElementById("sources-dialog");
    document.getElementById("sources-content").innerHTML = sourceMarkup();
    document.getElementById("sources-button").addEventListener("click", function () { dialog.showModal(); });
    document.getElementById("close-sources").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) { dialog.close(); } });
    document.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|SELECT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) { return; }
      if (event.key === "ArrowRight") { goTo(state.screen + 1); }
      if (event.key === "ArrowLeft") { goTo(state.screen - 1); }
    });
    window.addEventListener("load", function () {
      var accessibilityButton = document.getElementById("lisib-bouton");
      var tools = document.querySelector(".tools");
      if (accessibilityButton && tools) { tools.appendChild(accessibilityButton); }
    });
    document.addEventListener("visibilitychange", function () { if (document.hidden) { stopVoix(); } });
    window.addEventListener("pagehide", stopVoix);
  }

  shell();
  buildNav();
  bindControls();
  if (filmScreenCount) { renderFilm(); } else { renderLesson(); }
  updateChrome();
})();
