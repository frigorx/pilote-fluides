(() => {
  "use strict";
  const modules = Array.isArray(window.__INERWEB_MODULES__) ? window.__INERWEB_MODULES__ : [];
  const coreIds = new Set(window.__INERWEB_CORE_IDS__ || []);
  const grid = document.getElementById("moduleGrid");
  const list = document.getElementById("standaloneList");
  const summary = document.getElementById("selectionSummary");
  const learnLink = document.getElementById("learnLink");
  const revisionLink = document.getElementById("revisionLink");

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  grid.innerHTML = modules.map((module) => `
    <label class="module-choice" for="module-${escapeHtml(module.id)}">
      <input type="checkbox" id="module-${escapeHtml(module.id)}" value="${escapeHtml(module.id)}" ${coreIds.has(module.id) ? "checked" : ""}>
      <span>
        <span class="level">${module.level === "essentiel" ? "Essentiel habilitation" : "Approfondissement"}</span>
        <strong>${escapeHtml(module.order)}. ${escapeHtml(module.short)}</strong>
        <span>${escapeHtml(module.goal)}</span>
      </span>
    </label>`).join("");

  list.innerHTML = modules.map((module) => `
    <article class="standalone-item">
      <span class="standalone-number">${module.order}</span>
      <div><div class="standalone-title">${escapeHtml(module.title)}</div><div class="standalone-objective">${escapeHtml(module.goal)}</div></div>
      <a href="modules-autonomes/${String(module.order).padStart(2, "0")}-${escapeHtml(module.id)}.html">Ouvrir ce module →</a>
    </article>`).join("");

  function checkedIds() {
    return [...grid.querySelectorAll("input:checked")].map((input) => input.value);
  }

  function updateLinks() {
    const ids = checkedIds();
    summary.textContent = ids.length ? `${ids.length} module${ids.length > 1 ? "s" : ""} sélectionné${ids.length > 1 ? "s" : ""}.` : "Sélectionnez au moins un module.";
    [learnLink, revisionLink].forEach((link) => {
      link.classList.toggle("disabled", ids.length === 0);
      link.setAttribute("aria-disabled", String(ids.length === 0));
    });
    if (ids.length) {
      const query = encodeURIComponent(ids.join(",")).replaceAll("%2C", ",");
      learnLink.href = `cours-complet.html?modules=${query}&mode=apprentissage`;
      revisionLink.href = `cours-complet.html?modules=${query}&mode=revision`;
    } else {
      learnLink.removeAttribute("href");
      revisionLink.removeAttribute("href");
    }
  }

  grid.addEventListener("change", updateLinks);
  document.getElementById("corePreset").addEventListener("click", () => {
    grid.querySelectorAll("input").forEach((input) => { input.checked = coreIds.has(input.value); });
    updateLinks();
  });
  document.getElementById("allPreset").addEventListener("click", () => {
    grid.querySelectorAll("input").forEach((input) => { input.checked = true; });
    updateLinks();
  });
  updateLinks();

  /* La voix de l'accueil (chantier prof vocal, 18/10/2026) : une narration écrite pour l'oreille explique la page, au
     clic seulement, à la vitesse commune du site ; changer la vitesse arrête la lecture. */
  const NARRATION = "Cette page vous permet de construire votre parcours sur le diagramme enthalpique, avec uniquement ce qui sert à votre programme. Chaque module porte une étiquette : huit sont essentiels pour l'habilitation, deux relèvent de l'approfondissement. Vous composez votre sélection, module par module ou d'un coup, puis vous partez en apprentissage ou en révision express. Chaque courbe peut aussi s'ouvrir seule. Les schémas restent qualitatifs : on y reconnaît des courbes, on n'y relève aucune valeur. Quant à la méthode, elle suit trois temps : découvrir, comprendre, vérifier.";
  const ecoute = document.getElementById("listen");
  let parle = false, lecture = 0;
  const voixFr = () => {
    const fr = ("speechSynthesis" in window ? speechSynthesis.getVoices() : []).filter((v) => v.lang.toLowerCase().startsWith("fr"));
    return fr.find((v) => /natural|neural|online/i.test(v.name)) || fr.find((v) => /google/i.test(v.name)) || fr.find((v) => v.lang.toLowerCase() === "fr-fr") || fr[0] || null;
  };
  const majEcoute = () => { ecoute.textContent = parle ? "■ Arrêter" : "▶ Écouter"; ecoute.setAttribute("aria-pressed", String(parle)); };
  function taire() { lecture += 1; parle = false; if ("speechSynthesis" in window) speechSynthesis.cancel(); majEcoute(); }
  ecoute.addEventListener("click", () => {
    if (parle) { taire(); return; }
    if (!("speechSynthesis" in window)) return;
    taire();
    const run = lecture, u = new SpeechSynthesisUtterance(NARRATION), v = voixFr();
    u.lang = "fr-FR"; if (v) u.voice = v;
    u.rate = window.PILOTE_VOIX_REGLAGE ? window.PILOTE_VOIX_REGLAGE.vitesse() : 0.95;
    u.onstart = () => { if (run !== lecture) return; parle = true; majEcoute(); };
    u.onend = u.onerror = () => { if (run !== lecture) return; parle = false; majEcoute(); };
    speechSynthesis.speak(u);
  });
  document.addEventListener("pilotevoix:vitesse", taire);
  document.addEventListener("visibilitychange", () => { if (document.hidden) taire(); });
})();
