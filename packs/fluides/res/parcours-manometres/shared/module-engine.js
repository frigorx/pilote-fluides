(function (root) {
  "use strict";

  function start(config) {
    const lessons = config.lessons || [];
    const $ = selector => document.querySelector(selector);
    const scene = $("#scene");
    const title = $("#lesson-title");
    const eyebrow = $("#lesson-eyebrow");
    const text = $("#lesson-text");
    const previous = $("#previous");
    const next = $("#next");
    const status = $("#step-status");
    const progress = $("#progress");
    const listen = $("#listen");
    const stop = $("#voice-stop");
    let current = 0;
    const visited = new Set([0]);
    let unlocked = true;
    let speechToken = 0;
    let speaking = false;
    let paused = false;


    function voiceAvailable() {
      return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    }

    function selectVoice() {
      if (!voiceAvailable()) return null;
      const voices = speechSynthesis.getVoices();
      const french = voices.filter(voice => /^fr(?:-|$)/i.test(voice.lang));
      const score = voice => {
        let value = /^fr-FR$/i.test(voice.lang) ? 50 : 20;
        if (/natural|naturel|neural|online|google|microsoft/i.test(voice.name)) value += 30;
        if (/denise|henri|julie|paul|hortense/i.test(voice.name)) value += 10;
        return value;
      };
      return french.sort((a, b) => score(b) - score(a))[0] || voices[0] || null;
    }

    function updateVoiceButton() {
      listen.classList.toggle("active", speaking || paused);
      listen.setAttribute("aria-pressed", String(speaking || paused));
      const icon = listen.querySelector("[aria-hidden]");
      const label = listen.querySelector(".voice-label");
      if (paused) { icon.textContent = "▶"; label.textContent = "Reprendre"; }
      else if (speaking) { icon.textContent = "Ⅱ"; label.textContent = "Pause"; }
      else { icon.textContent = "▶"; label.textContent = "Écouter"; }
    }

    function stopVoice() {
      speechToken += 1;
      if (voiceAvailable()) speechSynthesis.cancel();
      speaking = false;
      paused = false;
      updateVoiceButton();
    }

    function speak() {
      if (!voiceAvailable()) {
        listen.disabled = true;
        listen.title = "Synthèse vocale indisponible sur ce navigateur";
        return;
      }
      if (speaking) {
        speechSynthesis.pause();
        speaking = false;
        paused = true;
        updateVoiceButton();
        return;
      }
      if (paused) {
        speechSynthesis.resume();
        speaking = true;
        paused = false;
        updateVoiceButton();
        return;
      }
      stopVoice();
      const lesson = lessons[current];
      /* chantier prof vocal (18/10/2026) : la voix dit la narration de l'écran, écrite pour l'oreille ; elle ne relit plus
         le titre et le texte affichés (repli seulement pour une étape qui n'aurait pas encore la sienne) */
      const utterance = new SpeechSynthesisUtterance(lesson.narration || [lesson.title, lesson.text].join(". "));
      const token = speechToken;
      utterance.lang = "fr-FR";
      utterance.rate = root.PILOTE_VOIX_REGLAGE ? root.PILOTE_VOIX_REGLAGE.vitesse() : .95;   // la vitesse commune du site
      utterance.pitch = 1;
      const voice = selectVoice();
      if (voice) utterance.voice = voice;
      utterance.onstart = () => {
        if (token !== speechToken) return;
        speaking = true;
        paused = false;
        updateVoiceButton();
      };
      utterance.onend = () => {
        if (token !== speechToken) return;
        speaking = false;
        paused = false;
        updateVoiceButton();
      };
      utterance.onerror = event => {
        if (token !== speechToken || event.error === "canceled" || event.error === "interrupted") return;
        speaking = false;
        paused = false;
        updateVoiceButton();
      };
      speechSynthesis.speak(utterance);
    }

    function buildProgress() {
      progress.style.setProperty("--steps", lessons.length);
      progress.innerHTML = lessons.map((lesson, index) => `<button type="button" class="progress-step" data-step="${index}" aria-label="Aller à l’étape ${index + 1} : ${lesson.short || lesson.title}"></button>`).join("");
      progress.addEventListener("click", event => {
        const button = event.target.closest("[data-step]");
        if (!button) return;
        const index = Number(button.dataset.step);
        go(index);
      });
    }

    function updateNavigation() {
      previous.disabled = current === 0;
      next.disabled = false;
      next.textContent = current === lessons.length - 1 ? (config.finishLabel || "Terminer") : "Continuer →";
      status.innerHTML = `<strong>Étape ${current + 1}</strong> sur ${lessons.length}`;
      progress.querySelectorAll(".progress-step").forEach((button, index) => {
        button.classList.toggle("done", visited.has(index) && index !== current);
        button.classList.toggle("current", index === current);
        button.disabled = false;
        if (index === current) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
    }

    function api() {
      return {
        get current() { return current; },
        unlock(message) {
          unlocked = true;
          if (message) status.innerHTML = message;
        },
        lock() {
          unlocked = false;
        },
        go,
        render,
        stopVoice
      };
    }

    function render() {
      stopVoice();
      const lesson = lessons[current];
      unlocked = !lesson.locked;
      eyebrow.textContent = lesson.kicker || `Étape ${current + 1}`;
      title.textContent = lesson.title;
      text.textContent = lesson.text;
      scene.innerHTML = lesson.markup ? lesson.markup() : "";
      if (typeof lesson.mount === "function") lesson.mount(scene, api());
      updateNavigation();
      title.focus({ preventScroll: true });
    }

    function go(index) {
      if (index < 0 || index >= lessons.length) return;
      current = index;
      visited.add(current);
      render();
    }

    previous.addEventListener("click", () => go(current - 1));
    next.addEventListener("click", () => {
      if (current < lessons.length - 1) go(current + 1);
      else if (typeof config.onFinish === "function") config.onFinish();
      else if (config.finishHref) window.location.href = config.finishHref;
    });
    listen.addEventListener("click", speak);
    stop.addEventListener("click", stopVoice);
    /* la vitesse commune (moteur/reglage-voix.js) : la changer arrête la lecture ; la suivante la prend */
    document.addEventListener("pilotevoix:vitesse", stopVoice);
    /* pour le prof vocal du site : une étape verrouillée attend le geste de l'élève */
    root.PILOTE_PROF_ACTIVITE = () => !unlocked;
    document.addEventListener("keydown", event => {
      const tag = event.target.tagName;
      if (["INPUT", "SELECT", "TEXTAREA", "BUTTON", "A"].includes(tag)) return;
      if (event.key === "ArrowLeft") go(current - 1);
      if (event.key === "ArrowRight") {
        if (current < lessons.length - 1) go(current + 1);
      }
    });
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopVoice(); });
    window.addEventListener("beforeunload", stopVoice);
    if (voiceAvailable()) speechSynthesis.addEventListener?.("voiceschanged", selectVoice);
    else listen.disabled = true;

    buildProgress();
    render();
    return api();
  }

  root.ModuleEngine = Object.freeze({ start });
}(window));
