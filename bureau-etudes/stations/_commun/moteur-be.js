/* Moteur d'écrans du réseau Bureau d'études (BE).
   Tiré du gabarit des bouteilles de fluide, sans aucune de ses données.
   Une station appelle BE.station(donnees) depuis son contenu.js.
   Les identifiants et classes du DOM sont ceux du gabarit : les scripts du site (voix, prof vocal) s'y accrochent. */
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const NOMS_NIVEAU = { 1: "guidé", 2: "autonome", 3: "bâtiment tertiaire" };
  const TITRES_AIDES = ["Où chercher", "La méthode", "Le premier pas"];
  const LIEN_DEDIEE = "../../dediee/";   // adresse provisoire de la partie réservée aux classes
  const PHRASE_FILE = "Ouvrez la station par le site ou le serveur local pour afficher ce bloc.";
  const CLE_VITESSE = "be-voix-vitesse";

  /* ---- État ---- */
  let D = null;                 // données de la station
  let screens = [];
  let dossiers = [];
  let couv = null;              // couverture.json (null tant que non lu ou illisible)
  let fiche = null;             // fiche.json
  let jsonLu = false;           // true quand les deux lectures sont terminées
  let jsonOk = false;           // true si les deux fichiers ont été lus
  let niveau = null;            // 1, 2 ou 3
  let aidesVues = 0;            // aides ouvertes sur l'écran courant (jamais enregistrées)
  const quizAnswers = {};
  const completed = new Set();
  let current = 0;
  let furthest = 0;
  let extractMode = false;
  let activeScreens = [];
  let speechRun = 0;
  let speaking = false;
  let paused = false;
  let autoplay = false;
  let statusTimer = 0;
  const voiceRates = [0.8, 0.95, 1.1, 1.25];
  let rateIndex = safeStoredRateIndex();

  /* ---- Petits outils ---- */
  function safeStoredRateIndex() { try { const stored = Number(localStorage.getItem(CLE_VITESSE)); const index = voiceRates.indexOf(stored); return index >= 0 ? index : 1; } catch (_) { return 1; } }
  function saveRate() { try { localStorage.setItem(CLE_VITESSE, String(voiceRates[rateIndex])); } catch (_) { /* stockage indisponible */ } }
  function esc(value) { return String(value === undefined || value === null ? "" : value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function stripHtml(value) { const box = document.createElement("div"); box.innerHTML = value; return box.textContent || ""; }
  function paragraphes(valeur) { return (Array.isArray(valeur) ? valeur : String(valeur || "").split(/\n+/)).filter(Boolean); }
  function dureeTexte(d) {
    if (typeof d === "number") { const h = Math.floor(d / 60), m = d % 60; return h ? (m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`) : `${m} min`; }
    return String(d || "");
  }
  function screen(data) { return { level: "comprendre", codes: [], prompt: "", speak: "", requiresAction: false, image: "", imageAlt: "Illustration pédagogique de l’étape.", ...data }; }
  function completeCurrent(message = "Action réalisée. Vous pouvez continuer.") { completed.add(activeScreens[current].id); updateNav(); setStatus(message); }
  function setStatus(message) { clearTimeout(statusTimer); $("#status-message").textContent = message; statusTimer = setTimeout(() => { $("#status-message").textContent = ""; }, 2600); }
  function lu(cle) { return (D && D[cle] !== undefined && D[cle] !== null && D[cle] !== "") ? D[cle] : (couv ? couv[cle] : undefined); }
  /* Niveaux : liste d'objets { n, nom, batiment, partie } (donnees.niveaux) ; couverture.json peut ne donner que des numéros. */
  function niveaux() {
    const v = lu("niveaux");
    const liste = (Array.isArray(v) && v.length ? v : [1]).map(x => (typeof x === "object" && x) ? x : { n: x });
    return liste.map(x => ({ n: Number(x.n), nom: x.nom || NOMS_NIVEAU[x.n] || "", batiment: x.batiment || "", partie: x.partie === "dediee" ? "dediee" : "publique" })).filter(x => x.n >= 1 && x.n <= 3);
  }
  function infoNiveau(n) { return niveaux().find(x => x.n === n) || { n, nom: NOMS_NIVEAU[n] || "", batiment: "", partie: "publique" }; }
  function libelleNiveau(n) { const i = infoNiveau(n); return `Niveau ${n}${i.nom ? `, ${i.nom}` : ""}`; }
  function niveauParDefaut() { const l = niveaux(); return (l.find(x => x.n === 1) || l[0] || { n: 1 }).n; }
  /* Valeur propre à un niveau : une valeur commune, ou un objet indexé par niveau (à défaut, le niveau le plus proche en dessous, puis au dessus). */
  function parNiveauValeur(v) {
    if (!v || typeof v !== "object" || Array.isArray(v)) return v;
    const cles = Object.keys(v).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
    if (!cles.length) return v;
    const bas = cles.filter(k => k <= niveau).pop();
    return v[bas !== undefined ? bas : cles[0]];
  }
  function texteNiveau(v) { const r = parNiveauValeur(v); return r === undefined || r === null ? "" : r; }
  function aidesDe(item) {
    const a = item.aides;
    if (!a) return [];
    const liste = Array.isArray(a) ? a : parNiveauValeur(a);
    return Array.isArray(liste) ? liste.slice(0, 3) : [];
  }

  /* ---- Marqueurs d'activités (repris du gabarit) ---- */
  function choiceMarkup(choices) { return `<div class="panel"><div class="cards" style="--cols:${Math.min(choices.length, 3)}">${choices.map((choice, index) => `<button class="choice" type="button" data-choice="${index}"><strong>${esc(choice.title)}</strong><small>${esc(choice.note || "")}</small></button>`).join("")}</div><div class="feedback" id="feedback">Choisissez, puis lisez la conséquence.</div></div>`; }
  function wireChoice(good, messages) {
    $$("[data-choice]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.choice);
      $$("[data-choice]").forEach(item => item.classList.remove("good", "bad"));
      button.classList.add(index === good ? "good" : "bad");
      const feedback = $("#feedback");
      feedback.className = `feedback ${index === good ? "good" : "bad"}`;
      feedback.innerHTML = `<strong>${index === good ? "Correct." : "À corriger."}</strong> ${esc(messages[index])}`;
      if (index === good) completeCurrent("Décision correcte. Vous pouvez continuer.");
    }));
  }
  function checklistMarkup(items) { return `<div class="panel"><div class="cards" style="--cols:${Math.min(items.length, 3)}">${items.map((item, index) => `<button class="check-card" type="button" data-check="${index}" aria-pressed="false"><strong>${esc(item.title)}</strong><small>${esc(item.note)}</small></button>`).join("")}</div><div class="feedback" id="feedback">Ouvrez chaque point.</div></div>`; }
  function wireChecklist(items) {
    $$("[data-check]").forEach(button => button.addEventListener("click", () => {
      button.classList.add("good"); button.setAttribute("aria-pressed", "true");
      const item = items[Number(button.dataset.check)];
      const feedback = $("#feedback");
      feedback.className = "feedback good";
      feedback.innerHTML = `<strong>${esc(item.title)}.</strong> ${esc(item.detail)}`;
      if ($$('[data-check][aria-pressed="false"]').length === 0) completeCurrent("Tous les points ont été examinés.");
    }));
  }
  function sequenceMarkup(items) { return `<div class="panel"><div class="sequence">${items.map((item, index) => `<button class="sequence-step" type="button" data-sequence="${index}">${index + 1}<br>${esc(item)}</button>${index < items.length - 1 ? '<span class="sequence-arrow">→</span>' : ""}`).join("")}</div><div class="feedback" id="feedback">Cliquez dans l’ordre.</div></div>`; }
  function wireSequence(items) {
    let next = 0;
    $$("[data-sequence]").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.sequence);
      const feedback = $("#feedback");
      if (index !== next) { feedback.className = "feedback bad"; feedback.textContent = "À corriger : revenez au premier geste non validé."; return; }
      button.classList.add("done"); next += 1;
      feedback.className = "feedback good";
      feedback.textContent = next === items.length ? "Ordre complet." : "Étape validée. Continuez.";
      if (next === items.length) completeCurrent("Ordre complet. Vous pouvez continuer.");
    }));
  }
  function quizMarkup(item, q) {
    const saved = quizAnswers[item.id];
    return `<div class="panel"><div class="cards" style="--cols:2">${q.choices.map((choice, index) => `<button class="choice ${saved === index ? (index === q.good ? "good" : "bad") : ""}" type="button" data-quiz="${index}" ${saved !== undefined ? "disabled" : ""}><strong>${String.fromCharCode(65 + index)}.</strong><small>${esc(choice)}</small></button>`).join("")}</div><div class="feedback ${saved === undefined ? "" : saved === q.good ? "good" : "bad"}" id="feedback">${saved === undefined ? "Choisissez une réponse." : `<strong>${saved === q.good ? "Correct." : "À revoir."}</strong> ${esc(q.explain)}`}</div></div>`;
  }
  function wireQuiz(item, q) {
    $$("[data-quiz]").forEach(button => button.addEventListener("click", () => {
      if (quizAnswers[item.id] !== undefined) return;
      quizAnswers[item.id] = Number(button.dataset.quiz);
      completed.add(item.id);
      renderCurrent(false);
    }));
  }
  function exempleMarkup(e) { return `<div class="exemple"><span class="tag">Exemple résolu</span><p><strong>${esc(e.text)}</strong> → <b>${esc(e.answer)}</b></p><small>${esc(e.why)}</small></div>`; }
  function sortMarkup(rows, labels, example) {
    return `<div class="panel sort">${example ? exempleMarkup({ text: example.text, answer: labels[example.good], why: example.why }) : ""}<div class="sort-rows">${rows.map((row, index) => `<div class="sort-row" data-row="${index}"><span class="sort-text">${esc(row.text)}</span><span class="sort-buttons">${labels.map((label, option) => `<button type="button" class="sort-btn" data-row="${index}" data-opt="${option}">${esc(label)}</button>`).join("")}</span></div>`).join("")}</div><div class="feedback" id="feedback">Choisissez une réponse pour chaque ligne.</div></div>`;
  }
  function wireSort(rows) {
    let done = 0;
    $$(".sort-btn").forEach(button => button.addEventListener("click", () => {
      const index = Number(button.dataset.row), option = Number(button.dataset.opt), row = $(`.sort-row[data-row="${index}"]`);
      if (row.classList.contains("done")) return;
      const feedback = $("#feedback");
      if (option === rows[index].good) {
        row.classList.add("done");
        row.querySelectorAll(".sort-btn").forEach(item => { item.disabled = true; });
        button.classList.add("good"); done += 1;
        feedback.className = "feedback good";
        feedback.innerHTML = `<strong>Correct.</strong> ${esc(rows[index].why)}`;
        if (done === rows.length) completeCurrent("Tout est rangé. Vous pouvez continuer.");
      } else {
        button.classList.add("bad"); button.disabled = true;
        feedback.className = "feedback bad";
        feedback.innerHTML = `<strong>À corriger.</strong> ${esc(rows[index].bad)}`;
      }
    }));
  }
  function orderMarkup(items, shown) { return `<div class="panel"><div class="order-list">${shown.map(index => `<button type="button" class="order-item" data-order="${index}"><b class="order-n" aria-hidden="true"></b><span>${esc(items[index])}</span></button>`).join("")}</div><div class="feedback" id="feedback">Cliquez d’abord sur la première action.</div></div>`; }
  function wireOrder(items, hints) {
    let next = 0;
    $$("[data-order]").forEach(button => button.addEventListener("click", () => {
      if (button.classList.contains("done")) return;
      const index = Number(button.dataset.order), feedback = $("#feedback");
      if (index !== next) {
        button.classList.add("bad"); setTimeout(() => button.classList.remove("bad"), 700);
        feedback.className = "feedback bad";
        feedback.innerHTML = `<strong>Pas encore.</strong> ${esc(hints[next])}`;
        return;
      }
      button.classList.add("done"); button.querySelector(".order-n").textContent = String(next + 1); next += 1;
      feedback.className = "feedback good";
      feedback.textContent = next === items.length ? "Ordre complet." : "Bien. Et ensuite ?";
      if (next === items.length) completeCurrent("Ordre complet. Vous pouvez continuer.");
    }));
  }
  function melange(n) { const pairs = [], impairs = []; for (let i = 0; i < n; i++) (i % 2 ? impairs : pairs).push(i); return n > 2 ? [...impairs, ...pairs] : pairs.concat(impairs).reverse(); }
  function cardsMarkup(cards, cls = "") { return `<div class="cartes ${cls}">${cards.map(card => `<article class="carte"><h3>${esc(card.title)}</h3>${card.rows.map(row => `<p><strong>${esc(row[0])}</strong> ${esc(row[1])}</p>`).join("")}</article>`).join("")}</div>`; }
  function libreMarkup(o) { return `<div class="panel libre"><label for="reponse-libre" class="libre-label">${esc(o.label)}</label><textarea id="reponse-libre" rows="4" placeholder="${esc(o.placeholder)}"></textarea><button type="button" class="primary-button" id="voir-reponse" disabled>${esc(o.bouton)}</button><div class="feedback" id="feedback">Écrivez d’abord. Le bouton s’ouvre après quelques mots.</div></div>`; }
  function wireLibre(answerHtml, min) {
    const area = $("#reponse-libre"), button = $("#voir-reponse");
    area.addEventListener("input", () => { button.disabled = area.value.trim().length < min; });
    button.addEventListener("click", () => {
      const feedback = $("#feedback");
      feedback.className = "feedback good";
      feedback.innerHTML = answerHtml;
      completeCurrent("Comparez avec votre texte, puis continuez.");
    });
  }
  function liensMarkup(links) { return `<div class="liens">${links.map(link => `<a class="lien-carte" href="${esc(link.href)}"><strong>${esc(link.title)}</strong><small>${esc(link.note || "")}</small></a>`).join("")}</div>`; }
  function schema(src, alt, legende = "") { return `<figure class="schema"><img src="${esc(src)}" alt="${esc(alt)}">${legende ? `<figcaption>${esc(legende)}</figcaption>` : ""}</figure>`; }
  function alerte(html) { return `<p class="alerte">${html}</p>`; }
  function renvoi(html) { return `<p class="renvoi">${html}</p>`; }

  /* Activités : chacune rend { render, wire } à étaler dans un écran. render et wire reçoivent l'écran. */
  const choix = (choices, good, messages) => ({ render: () => choiceMarkup(choices), wire: () => wireChoice(good, messages) });
  const checklist = items => ({ render: () => checklistMarkup(items), wire: () => wireChecklist(items) });
  const sequence = items => ({ render: () => sequenceMarkup(items), wire: () => wireSequence(items) });
  const quiz = q => ({ quiz: q, render: item => quizMarkup(item, q), wire: item => wireQuiz(item, q) });
  const tri = (rows, labels, example) => ({ render: () => sortMarkup(rows, labels, example), wire: () => wireSort(rows) });
  const ordre = (items, hints, shown) => ({ render: () => orderMarkup(items, shown || melange(items.length)), wire: () => wireOrder(items, hints) });
  /* Une activité par niveau : BE.parNiveau({ 1: BE.quiz(...), 2: BE.tri(...) }). Le niveau courant, sinon le plus proche en dessous. */
  const parNiveau = map => {
    const act = () => parNiveauValeur(map) || {};
    return { render: item => (act().render || (() => ""))(item), wire: item => { if (act().wire) act().wire(item); } };
  };
  const libre = (answerHtml, opts = {}) => {
    const o = { label: "Votre réponse, en quelques lignes :", placeholder: "Écrivez ici…", bouton: "Voir la réponse type", min: 40, ...opts };
    return { render: () => libreMarkup(o), wire: () => wireLibre(answerHtml, o.min) };
  };

  /* ---- Chargement des fichiers de la station ---- */
  function lireJson(nom) {
    return fetch(nom, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).catch(() => null);
  }
  function chargerFichiers() {
    return Promise.all([lireJson("couverture.json"), lireJson("fiche.json")]).then(([c, f]) => {
      couv = c; fiche = f; jsonLu = true; jsonOk = !!(c && f);
      renderHome(); buildPrintBook();
      if (!$("#course-shell").hidden) renderCurrent(false);
    });
  }

  /* ---- Accueil ---- */
  function listeCodes(liste) { return `<dl class="codes-liste">${(liste || []).map(c => `<dt>${esc(c.code)}</dt><dd>${esc(c.libelle)}</dd>`).join("")}</dl>`; }
  function referentielMarkup() {
    if (!jsonLu) return "";
    const ref = couv && couv.referentiel;
    if (!ref) return `<h2 id="codes-titre">Correspondances de formation</h2><p class="fichier-absent">${esc(PHRASE_FILE)}</p>`;
    let html = `<h2 id="codes-titre">Correspondances de formation</h2>`;
    if (ref.tecvc && ref.tecvc.length) html += `<h3>TP Technicien d’études en CVC (TECVC)</h3>${listeCodes(ref.tecvc)}`;
    const b = ref.bts_fed;
    if (b) {
      html += `<h3>BTS Fluides, énergies, domotique (FED)${b.option ? `, option ${esc(b.option)}` : ""}</h3>`;
      [["Compétences", b.competences], ["Savoirs", b.savoirs], ["Tâches", b.taches]].forEach(([titre, liste]) => {
        if (liste && liste.length) html += `<h4>${titre}</h4>${listeCodes(liste)}`;
      });
    }
    if (ref.apport_propre) html += `<p class="apport"><strong>Apport propre du réseau :</strong> ${esc(ref.apport_propre)}</p>`;
    return html;
  }
  function renderHome() {
    const nv = niveaux();
    const duree = dureeTexte(lu("duree") !== undefined ? lu("duree") : lu("duree_min"));
    document.title = `${lu("titre") || "Station"} | Bureau d’études`;
    $("#station-sub").textContent = `Bureau d’études, ${lu("code") || ""}`;
    $("#station-code").textContent = lu("code") || "";
    $("#station-ligne").textContent = lu("ligne") ? `Ligne : ${lu("ligne")}` : "";
    $("#badge-duree").textContent = duree ? `Station longue · ${duree}` : "Station longue";
    /* Décision 32 : le public visé (diplômes) reste dans fiche.json, il ne s'affiche pas. */
    $("#badge-niveau").textContent = ""; $("#badge-niveau").hidden = true;
    $("#home-title").textContent = lu("titre") || "";
    $("#home-intro").textContent = lu("intro") || "";
    $("#volet-actions").innerHTML = nv.map((x, i) => `<button class="primary-button volet-button niveau-button niveau-${x.n}" type="button" ${i === 0 ? 'id="start-button"' : ""} data-niveau="${x.n}"><span class="niveau-titre">Niveau ${x.n}${x.nom ? `, ${esc(x.nom)}` : ""} <span aria-hidden="true">→</span></span>${x.batiment ? `<small class="niveau-batiment">${esc(x.batiment)}</small>` : ""}</button>`).join("");
    $$("[data-niveau]").forEach(b => b.addEventListener("click", () => { niveau = Number(b.dataset.niveau); startCourse(dossiers[0] && dossiers[0].id); }));
    $("#home-meta").textContent = `${screens.length} écran${screens.length > 1 ? "s" : ""}, ${dossiers.length} dossier${dossiers.length > 1 ? "s" : ""}.${nv.length > 1 ? " Les écrans de méthode sont communs aux niveaux ; les exercices et les aides s’adaptent au niveau choisi." : ""}`;
    $("#dossier-grid").innerHTML = dossiers.map((dossier, index) => `<button class="dossier-button" type="button" data-dossier="${esc(dossier.id)}"><b>${index + 1}</b><span>${esc(dossier.label)}<small>${esc(dossier.note || "")}</small></span></button>`).join("");
    $$("[data-dossier]").forEach(b => b.addEventListener("click", () => { niveau = niveau || niveauParDefaut(); startCourse(b.dataset.dossier); }));
    const note = lu("note");
    $("#home-note").innerHTML = note ? `<strong>Point à retenir.</strong> ${esc(note)}` : ""; $("#home-note").hidden = !note;
    /* Décision 32 (F. Henninot, 30/10/2026) : la page publique ne porte ni diplôme ni code ; un lien discret les ouvre à la demande. */
    $("#codes-box").innerHTML = `<p class="lien-corresp"><a href="#corresp-detail" id="lien-corresp" aria-expanded="false" aria-controls="corresp-detail">Correspondances de formation</a></p><div id="corresp-detail" hidden>${referentielMarkup()}</div>`;
    $("#codes-box").hidden = !jsonLu;
    $("#lien-corresp").addEventListener("click", e => { e.preventDefault(); const d = $("#corresp-detail"); d.hidden = !d.hidden; e.currentTarget.setAttribute("aria-expanded", String(!d.hidden)); });
  }
  function showHome() {
    stopSpeech(); document.body.classList.remove("course-running");
    $("#home").hidden = false; $("#course-shell").hidden = true; $("#home-button").hidden = true; $("#exit-button").hidden = true;
    $("#mode-badge").textContent = "En cours de relecture";
    history.replaceState(null, "", location.pathname); scrollTo(0, 0);
  }

  /* ---- Parcours ---- */
  function startCourse(dossierId, screenNumber = 1) {
    extractMode = false; activeScreens = [...screens];
    niveau = niveau || niveauParDefaut(); aidesVues = 0;
    const first = Math.max(0, activeScreens.findIndex(item => item.dossier === dossierId));
    current = Math.min(activeScreens.length - 1, first + Math.max(0, screenNumber - 1));
    furthest = Math.max(furthest, current);
    openCourse(); renderCurrent(false);
  }
  function startExtract(ids) {
    niveau = niveau || niveauParDefaut(); aidesVues = 0;
    const picked = ids.map(id => screens.find(item => item.id === id)).filter(Boolean);
    if (!picked.length) { showHome(); setStatus("Extrait introuvable."); return; }
    extractMode = true; activeScreens = picked; current = 0; furthest = 0;
    openCourse(); renderCurrent(false);
  }
  function openCourse() {
    document.body.classList.add("course-running");
    $("#home").hidden = true; $("#course-shell").hidden = false; $("#home-button").hidden = false; $("#exit-button").hidden = false;
    $("#mode-badge").textContent = extractMode ? "Extrait, en cours de relecture" : "En cours de relecture";
    $("#rail-mode").textContent = extractMode ? "EXTRAIT" : "COURS";
    scrollTo(0, 0);
  }
  function renderStepper(item) {
    const groups = extractMode ? [{ id: "extrait", label: "Extrait" }] : dossiers;
    $("#stepper").innerHTML = groups.map((group, index) => {
      const indices = activeScreens.map((s, i) => ({ s, i })).filter(e => extractMode || e.s.dossier === group.id).map(e => e.i);
      const first = indices[0] ?? 0;
      const active = extractMode || item.dossier === group.id;
      const done = indices.length && Math.max(...indices) < furthest;
      return `<button class="step-button ${active ? "active" : ""} ${done ? "done" : ""}" type="button" data-step="${first}" ${active ? 'aria-current="step"' : ""}><b>${index + 1}</b><span>${esc(group.label)}</span></button>`;
    }).join("");
    $$("[data-step]").forEach(button => button.addEventListener("click", () => goTo(Number(button.dataset.step))));
    const total = activeScreens.length;
    $("#rail-progress").textContent = `${current + 1} / ${total}`;
    $("#progress-bar").style.width = `${(current + 1) / total * 100}%`;
    $("#progress-copy").textContent = current === total - 1 ? "Fin du parcours" : `${total - current - 1} écran${total - current - 1 > 1 ? "s" : ""} à voir`;
    const rv = $("#rail-volet");
    rv.textContent = niveau ? libelleNiveau(niveau) : ""; rv.hidden = !niveau;
  }
  function renderCurrent(moveFocus = true) {
    stopSpeech(false); clearTimeout(statusTimer); $("#status-message").textContent = "";
    const item = activeScreens[current];
    if (!item) return;
    $("#lesson-kicker").textContent = item.kicker || "";
    $("#lesson-title").textContent = item.title;
    $("#lesson-text").textContent = texteNiveau(item.text);
    $("#action-prompt").textContent = texteNiveau(item.prompt) || "Lisez, puis continuez.";
    const activity = item.render ? item.render(item) : `<div class="panel"><div class="panel-title">${esc(item.title)}</div><div class="method-line"><div class="method-node">OBSERVER</div><span class="method-arrow">→</span><div class="method-node">COMPRENDRE</div><span class="method-arrow">→</span><div class="method-node">AGIR</div></div></div>`;
    /* Image de mise en situation (décision 31) : sous la consigne, dans la colonne du texte, pour laisser au schéma toute sa largeur. */
    let illu = $("#lesson-illu");
    if (!illu) { illu = document.createElement("img"); illu.id = "lesson-illu"; illu.className = "lesson-illu"; $("#action-prompt").after(illu); }
    if (item.image) { illu.src = item.image; illu.alt = item.imageAlt; illu.hidden = false; } else { illu.hidden = true; illu.removeAttribute("src"); illu.alt = ""; }
    $("#activity-zone").innerHTML = activity +(aidesDe(item).length ? '<section class="aides" id="aides" aria-label="Aides"></section>' : "");
    if (item.wire) item.wire(item);
    renderAides(item);
    $("#reference-box").innerHTML = "";
    renderStepper(item); updateNav(); updateUrl(); replierTexte();
    if (moveFocus) $("#lesson-title").focus({ preventScroll: true });
    if (autoplay) setTimeout(() => speakCurrent(), 320);
  }
  /* Trois aides graduées, ouvertes une à une. Rien n'est enregistré ni envoyé ; le compteur repart à zéro à chaque changement d'écran. */
  function renderAides(item) {
    const zone = $("#aides"), liste = aidesDe(item);
    if (!zone) return;
    const n = Math.min(aidesVues, liste.length);
    zone.innerHTML = (n ? `<ol class="aides-liste">${liste.slice(0, n).map((t, i) => `<li><strong class="aide-palier">${TITRES_AIDES[i]}</strong><span class="aide-texte">${esc(t)}</span></li>`).join("")}</ol>` : "")
      + `<p class="aides-pied">${n < liste.length ? `<button type="button" class="aide-bouton" id="aide-bouton">${n ? "Une autre aide" : "Une aide"}</button>` : ""}<span class="aides-compteur" role="status" aria-live="polite">Aides utilisées : ${n} sur ${liste.length}</span></p>`;
    const b = $("#aide-bouton");
    if (b) b.addEventListener("click", () => { aidesVues = n + 1; renderAides(item); const dernier = $$(".aides-liste li", zone).pop(); if (dernier) dernier.scrollIntoView({ block: "nearest" }); });
  }
  function replierTexte() {
    const copie = $(".lesson-copy"), bouton = $("#texte-entier"), texte = $("#lesson-text");
    $(".lesson-content").scrollTop = 0;
    copie.classList.remove("texte-ouvert");
    bouton.setAttribute("aria-expanded", "false"); bouton.textContent = "Lire tout le texte";
    bouton.hidden = texte.scrollHeight <= texte.clientHeight + 2;
  }
  function basculerTexte() {
    const copie = $(".lesson-copy"), ouvert = copie.classList.toggle("texte-ouvert"), bouton = $("#texte-entier");
    bouton.setAttribute("aria-expanded", String(ouvert));
    bouton.textContent = ouvert ? "Replier le texte" : "Lire tout le texte";
  }
  function updateNav() {
    const item = activeScreens[current];
    $("#prev-button").disabled = current === 0;
    const blocked = item && item.requiresAction && !completed.has(item.id);
    $("#next-button").disabled = !!blocked;
    $("#next-button").textContent = current === activeScreens.length - 1 ? "Terminer" : "Suivant →";
  }
  function goTo(index) { if (index < 0 || index >= activeScreens.length) return; current = index; aidesVues = 0; furthest = Math.max(furthest, current); renderCurrent(); }
  function previous() { if (current > 0) goTo(current - 1); }
  function next() {
    const item = activeScreens[current];
    if (item.requiresAction && !completed.has(item.id)) { setStatus("Réalisez l’activité avant de continuer."); return; }
    if (current < activeScreens.length - 1) goTo(current + 1); else showHome();
  }
  function updateUrl() {
    const item = activeScreens[current];
    const url = new URL(location.href);
    url.search = "";
    if (niveau) url.searchParams.set("niveau", String(niveau));
    if (extractMode) url.searchParams.set("extrait", activeScreens.map(s => s.id).join(","));
    else {
      url.searchParams.set("dossier", item.dossier);
      const parDossier = activeScreens.filter(s => s.dossier === item.dossier);
      url.searchParams.set("ecran", String(parDossier.indexOf(item) + 1));
    }
    history.replaceState(null, "", url);
  }
  function screenLink() {
    const url = new URL(location.href);
    url.search = "";
    if (niveau) url.searchParams.set("niveau", String(niveau));
    url.searchParams.set("extrait", activeScreens[current].id);
    return url.href;
  }
  async function copyCurrentLink() {
    const link = screenLink();
    try { await navigator.clipboard.writeText(link); }
    catch (_) {
      const area = document.createElement("textarea");
      area.value = link; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
      document.body.append(area); area.select(); document.execCommand("copy"); area.remove();
    }
    setStatus("Lien de cet écran copié.");
  }

  /* ---- Voix du navigateur ---- */
  function speechSupported() { return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window; }
  function chooseFrenchVoice() {
    const voices = speechSynthesis.getVoices();
    const quality = voice => /natural|naturel|neural|online|google|microsoft|denise|henri|julie|paul|hortense/i.test(voice.name);
    return voices.find(v => v.lang.toLowerCase() === "fr-fr" && quality(v)) || voices.find(v => v.lang.toLowerCase() === "fr-fr") || voices.find(v => v.lang.toLowerCase().startsWith("fr") && quality(v)) || voices.find(v => v.lang.toLowerCase().startsWith("fr")) || voices[0];
  }
  function stopSpeech(disableAutoplay = true) { speechRun += 1; if (speechSupported()) speechSynthesis.cancel(); speaking = false; paused = false; if (disableAutoplay) autoplay = false; updateVoiceButtons(); }
  function speakCurrent() {
    if (!speechSupported()) { setStatus("La synthèse vocale n’est pas disponible. Le texte affiché reste complet."); return; }
    stopSpeech(false);
    const item = activeScreens[current];
    const run = ++speechRun;
    const visible = `${item.title}. ${texteNiveau(item.text)} ${texteNiveau(item.prompt)}`;
    const utterance = new SpeechSynthesisUtterance(texteNiveau(item.speak) || stripHtml(visible));
    utterance.lang = "fr-FR"; utterance.pitch = 1; utterance.rate = voiceRates[rateIndex];
    const voice = chooseFrenchVoice();
    if (voice) utterance.voice = voice;
    utterance.onstart = () => { if (run !== speechRun) return; speaking = true; paused = false; updateVoiceButtons(); };
    utterance.onend = () => { if (run !== speechRun) return; speaking = false; paused = false; updateVoiceButtons(); };
    utterance.onerror = event => { if (run !== speechRun || ["canceled", "interrupted"].includes(event.error)) return; speaking = false; paused = false; updateVoiceButtons(); setStatus("La voix est indisponible ; poursuivez avec le texte affiché."); };
    speaking = true; paused = false; updateVoiceButtons();
    speechSynthesis.speak(utterance);
  }
  function toggleSpeech() {
    if (!speechSupported()) { setStatus("La synthèse vocale n’est pas disponible."); return; }
    autoplay = true;
    if (speaking && !paused) { speechSynthesis.pause(); paused = true; updateVoiceButtons(); return; }
    if (speaking && paused) { speechSynthesis.resume(); paused = false; updateVoiceButtons(); return; }
    speakCurrent();
  }
  function updateVoiceButtons() {
    const button = $("#listen");
    if (!button) return;
    button.innerHTML = speaking && !paused ? '<span aria-hidden="true">Ⅱ</span><span>Pause</span>' : speaking && paused ? '<span aria-hidden="true">▶</span><span>Reprendre</span>' : '<span aria-hidden="true">▶</span><span>Écouter</span>';
    $("#stop-voice").disabled = !speaking;
    $("#speed-value").textContent = voiceRates[rateIndex].toFixed(2).replace(".", ",") + "×";
  }
  function changeRate(direction) {
    rateIndex = Math.max(0, Math.min(voiceRates.length - 1, rateIndex + direction));
    saveRate(); updateVoiceButtons();
    if (speaking || paused) speakCurrent();
  }

  /* ---- Écrans propres au format long ---- */
  function surcharge(base, over) { return screen({ ...base, ...(over || {}) }); }

  /* Encadré affiché à la place des données quand le niveau se travaille dans la partie réservée aux classes. */
  function partieReservee() {
    return `<div class="partie-reservee"><p><strong>Partie réservée aux classes.</strong> Ce niveau se travaille dans la partie réservée aux classes : sujet d’examen, maquette à télécharger par son lien officiel, feuille réponse. Votre enseignant vous donne le code de séance.</p><p><a class="primary-button" href="${esc(LIEN_DEDIEE)}">Aller à la partie réservée aux classes</a></p></div>`;
  }

  /* À vous, le projet : la commande du niveau courant, présentée comme une commande de bureau d'études. */
  function projet(over) {
    return surcharge({
      id: "projet", title: "À vous, le projet", kicker: "Le projet",
      text: "Vous recevez une commande de bureau d’études. Lisez-la, repérez les pièces fournies et où les trouver, puis traitez-la sur votre feuille réponse.",
      prompt: "Ouvrez la feuille réponse, puis traitez la commande.",
      render: () => {
        if (infoNiveau(niveau).partie === "dediee") return partieReservee();
        const p = D.projet && D.projet[niveau];
        if (!p) return `<div class="panel"><div class="feedback">Aucune commande n’est prévue pour ce niveau.</div></div>`;
        const champs = [["De", p.de], ["À", p.a], ["Objet", p.objet], ["Délai", p.delai]].filter(c => c[1]);
        const pieces = (p.pieces || []);
        return `<div class="commande"><div class="commande-entete"><span class="tag">Commande du bureau d’études</span><span class="commande-volet">${esc(libelleNiveau(niveau))}</span></div>`
          + `<dl class="commande-champs">${champs.map(c => `<dt>${c[0]}</dt><dd>${esc(c[1])}</dd>`).join("")}</dl>`
          + `<div class="commande-corps">${paragraphes(p.commande).map(t => `<p>${esc(t)}</p>`).join("")}</div>`
          + (pieces.length ? `<table class="pieces"><caption>Pièces fournies</caption><thead><tr><th scope="col">Pièce</th><th scope="col">Où la trouver</th></tr></thead><tbody>${pieces.map(x => `<tr><td>${esc(x.piece)}</td><td>${esc(x.ou)}</td></tr>`).join("")}</tbody></table>` : "")
          + `<p class="commande-actions"><a class="primary-button lien-feuille" href="feuille-N${esc(niveau)}.html" target="_blank" rel="noopener">Ouvrir la feuille réponse (A4 recto-verso, à imprimer)</a></p>`
          + `<p class="rappel-source"><strong>Écrivez la source de chaque donnée : page du plan, vue de la maquette, texte cité.</strong></p></div>`;
      }
    }, over);
  }

  /* Vérifier : un champ par résultat, réponse « dans la fourchette » ou « à revoir ». Rien n'est stocké ni envoyé. */
  function fourchette(over) {
    return surcharge({
      id: "verifier", title: "Vérifier", kicker: "Vérifier",
      text: "Reportez ici vos résultats. Chaque réponse vous dit seulement si vous êtes dans la fourchette attendue, sans donner la valeur.",
      prompt: "Écrivez chaque résultat, puis cliquez sur Vérifier.",
      render: () => {
        if (infoNiveau(niveau).partie === "dediee") return partieReservee();
        const liste = (D.fourchettes && D.fourchettes[niveau]) || [];
        if (!liste.length) return `<div class="panel"><div class="feedback">Aucune vérification n’est prévue pour ce niveau.</div></div>`;
        return `<div class="panel fourchettes">${liste.map((f, i) => `<div class="fourchette-ligne" data-fl="${i}"><label for="fch-${i}" class="fourchette-libelle">${esc(f.libelle)}</label><span class="fourchette-saisie"><input id="fch-${i}" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="fch-r-${i}"><span class="fourchette-unite">${esc(f.unite || "")}</span><button type="button" class="verifier-bouton" data-verifier="${i}">Vérifier</button></span><p class="fourchette-reponse" id="fch-r-${i}" role="status" aria-live="polite"></p></div>`).join("")}</div>`;
      },
      wire: item => {
        const liste = (D.fourchettes && D.fourchettes[niveau]) || [];
        const juste = new Set();
        const F = window.BE_FOURCHETTE;
        const verifier = i => {
          const f = liste[i], champ = $(`#fch-${i}`), sortie = $(`#fch-r-${i}`);
          if (!F) { sortie.className = "fourchette-reponse revoir"; sortie.textContent = "À revoir : la vérification n’est pas chargée."; return; }
          const r = F.dansFourchette(champ.value, f.min, f.max);
          if (r === true) { sortie.className = "fourchette-reponse juste"; sortie.textContent = "Dans la fourchette attendue"; juste.add(i); }
          else if (r === false) { sortie.className = "fourchette-reponse revoir"; sortie.textContent = `À revoir : ${f.indice || "relisez votre calcul."}`; juste.delete(i); }
          else { sortie.className = "fourchette-reponse revoir"; sortie.textContent = "À revoir : écrivez un nombre, par exemple 12,5."; juste.delete(i); }
          if (juste.size === liste.length) completeCurrent("Tous les résultats sont dans la fourchette.");
        };
        $$("[data-verifier]").forEach(b => b.addEventListener("click", () => verifier(Number(b.dataset.verifier))));
        $$(".fourchette-saisie input").forEach(inp => inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); verifier(Number(inp.id.slice(4))); } }));
      }
    }, over);
  }

  /* Emporter : impression de la fiche aide-mémoire, suite et correspondances. */
  function emporter(over) {
    return surcharge({
      id: "emporter", title: "Emporter", kicker: "Emporter",
      text: "Imprimez la fiche aide-mémoire : une feuille recto verso, la méthode d’un côté, un exemple de l’autre. Gardez-la pour la suite.",
      prompt: "Imprimez la fiche, puis choisissez la suite.",
      render: () => {
        let html = '<div class="emporter">';
        if (!jsonLu) html += `<p class="fichier-absent">Chargement de la fiche…</p>`;
        else if (!fiche) html += `<p class="fichier-absent">${esc(PHRASE_FILE)}</p>`;
        else html += `<p><button type="button" class="primary-button" id="imprimer-fiche">Imprimer la fiche aide-mémoire</button></p>`;
        const livre = couv && couv.livre;
        if (livre) html += `<p class="ligne-livre">Fiche n° ${esc(livre.fiche)} du livre Bureau d’études CVC-R, chapitre ${esc(livre.chapitre)}</p>`;
        if (fiche && fiche.calculette) html += `<p class="renvoi">Calculette associée : <a href="${esc(fiche.calculette.href)}">${esc(fiche.calculette.titre)}</a></p>`;
        if (D.suivante) html += `<h3 class="emporter-titre">Station suivante</h3>${liensMarkup([{ href: D.suivante.href, title: `${D.suivante.code} : ${D.suivante.titre}`, note: "Continuer le parcours" }])}`;
        const corr = D.correspondances || [];
        if (corr.length) html += `<h3 class="emporter-titre">Correspondances avec les autres réseaux</h3>${liensMarkup(corr.map(c => ({ href: c.href, title: `${c.reseau} : ${c.titre}`, note: c.pourquoi })))}`;
        return html + "</div>";
      },
      wire: () => {
        const b = $("#imprimer-fiche");
        if (b) b.addEventListener("click", () => { buildPrintBook(); window.print(); });
      }
    }, over);
  }

  /* ---- Fiche aide-mémoire imprimable ---- */
  function liste(tag, items) { return items && items.length ? `<${tag}>${items.map(t => `<li>${esc(t)}</li>`).join("")}</${tag}>` : ""; }
  function buildPrintBook() {
    const box = $("#print-book");
    if (!box) return;
    if (!fiche) { box.innerHTML = ""; return; }
    const f = fiche, ex = f.exemple || {};
    const valeurs = f.valeurs && f.valeurs.length
      ? `<h2>Valeurs à connaître</h2><table class="fiche-valeurs"><thead><tr><th scope="col">Grandeur</th><th scope="col">Valeur</th><th scope="col">Source</th></tr></thead><tbody>${f.valeurs.map(v => `<tr><td>${esc(v.grandeur)}</td><td>${esc(v.valeur)}</td><td>${esc(v.source)}</td></tr>`).join("")}</tbody></table>` : "";
    box.innerHTML = `<article class="fiche fiche-recto"><header class="fiche-entete"><p class="fiche-ligne">Fiche n° ${esc(f.numero)}${f.ligne ? `, ligne ${esc(f.ligne)}` : ""}${f.code ? `, ${esc(f.code)}` : ""}</p><h1>${esc(f.titre)}</h1></header>`
      + (f.quand ? `<h2>Quand l’utiliser</h2><p>${esc(f.quand)}</p>` : "")
      + (f.methode && f.methode.length ? `<h2>La méthode</h2>${liste("ol", f.methode)}` : "")
      + valeurs + `</article>`
      + `<article class="fiche fiche-verso"><header class="fiche-entete"><p class="fiche-ligne">Fiche n° ${esc(f.numero)}, verso : un exemple</p><h1>${esc(f.titre)}</h1></header>`
      + `<h2>Exemple</h2>${ex.enonce ? `<p class="fiche-enonce">${esc(ex.enonce)}</p>` : ""}${liste("ol", ex.lignes)}${ex.resultat ? `<p class="fiche-resultat"><strong>Résultat :</strong> ${esc(ex.resultat)}</p>` : ""}`
      + (f.pieges && f.pieges.length ? `<h2>Pièges</h2>${liste("ul", f.pieges)}` : "")
      + (f.sources && f.sources.length ? `<h2>Sources</h2>${liste("ul", f.sources)}` : "")
      + (f.calculette ? `<p class="fiche-calculette"><strong>Calculette :</strong> ${esc(f.calculette.titre)} (${esc(f.calculette.href)})</p>` : "")
      + `</article>`;
  }

  /* ---- Événements ---- */
  function handleInitialUrl() {
    const params = new URLSearchParams(location.search);
    const n = Number(params.get("niveau"));
    niveau = niveaux().some(x => x.n === n) ? n : niveauParDefaut();
    const extract = params.get("extrait");
    if (extract) { startExtract(extract.split(",").map(x => x.trim()).filter(Boolean)); return; }
    const dossier = params.get("dossier");
    if (dossier) { startCourse(dossier, Number(params.get("ecran")) || 1); return; }
    showHome();
  }
  function bindGlobalEvents() {
    $("#home-button").addEventListener("click", showHome);
    $("#exit-button").addEventListener("click", showHome);
    $("#prev-button").addEventListener("click", previous);
    $("#next-button").addEventListener("click", next);
    $("#copy-link").addEventListener("click", copyCurrentLink);
    $("#listen").addEventListener("click", toggleSpeech);
    $("#stop-voice").addEventListener("click", () => stopSpeech());
    $("#slower").addEventListener("click", () => changeRate(-1));
    $("#faster").addEventListener("click", () => changeRate(1));
    $("#texte-entier").addEventListener("click", basculerTexte);
    document.addEventListener("pilotevoix:vitesse", () => stopSpeech());   // changer la vitesse commune arrête la lecture
    addEventListener("keydown", event => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return;
      if (event.key === "ArrowRight") { event.preventDefault(); next(); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
      else if (event.key === " ") { event.preventDefault(); toggleSpeech(); }
      else if (event.key === "Escape") showHome();
    });
    addEventListener("beforeunload", () => stopSpeech());
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(); });
  }

  function demarrer() {
    screens = (D.ecrans || []).map(screen);
    dossiers = D.dossiers || [];
    bindGlobalEvents();
    renderHome(); buildPrintBook(); updateVoiceButtons();
    handleInitialUrl();
    chargerFichiers();
  }
  function station(donnees) {
    D = donnees;
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
    else demarrer();
  }

  window.BE = { station, ecran: screen, projet, fourchette, emporter, parNiveau, choix, checklist, sequence, quiz, tri, ordre, cartes: cardsMarkup, libre, liens: liensMarkup, schema, alerte, renvoi, exemple: exempleMarkup, esc };
})();
