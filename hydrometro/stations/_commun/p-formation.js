(() => {
  "use strict";

  const routes = {
    P: ["boucle", "energie", "debit", "delta-t", "puissance", "mesurer"],
    E: ["production", "echangeur", "debit", "circulateur", "pertes", "vase", "securite"],
    D: ["monotube", "bitube", "pertes", "v3v", "equilibrage", "plancher"],
    M: ["mesurer", "releves", "equilibrage", "tampon", "decouplage", "diagnostic", "mission"]
  };

  const sceneShell = (id, title, desc, body) => `<svg viewBox="0 0 760 420" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1b3a63"/></marker></defs><rect x="12" y="12" width="736" height="396" rx="24" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>${body}</svg>`;

  const scenes = {
    energie: sceneShell("course-energy", "Chaîne de transfert d’énergie", "Production, eau, émetteur et local sont reliés dans l’ordre. L’eau transporte et l’émetteur transfère vers le local.", `<g data-demo="1" class="p-demo-part"><rect x="40" y="150" width="150" height="110" rx="18" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="7 5"/><text x="115" y="210" text-anchor="middle" font-size="19" font-weight="700">PRODUCTION</text></g><g data-demo="2" class="p-demo-part"><path d="M190 205H355" stroke="#3d7fca" stroke-width="13" marker-end="url(#arr-course-energy)"/><text x="272" y="180" text-anchor="middle" font-size="17" font-weight="700">EAU</text></g><g data-demo="3" class="p-demo-part"><rect x="365" y="135" width="145" height="140" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="438" y="210" text-anchor="middle" font-size="19" font-weight="700">ÉMETTEUR</text></g><g data-demo="4" class="p-demo-part"><path d="M510 205H610" stroke="#c9451a" stroke-width="8" stroke-dasharray="8 7" marker-end="url(#arr-course-energy)"/><rect x="620" y="150" width="100" height="110" rx="18" fill="#f7f1e7" stroke="#1b3a63" stroke-width="4"/><text x="670" y="210" text-anchor="middle" font-size="19" font-weight="700">LOCAL</text></g><text x="380" y="340" text-anchor="middle" font-size="17">L’eau circule ; l’énergie est transférée.</text>`),
    debit: sceneShell("course-flow", "Point de fonctionnement pompe-réseau", "La courbe pompe descend, la courbe réseau monte et leur intersection donne le débit obtenu.", `<g data-demo="1" class="p-demo-part"><path d="M80 340V70M80 340H690" stroke="#1b3a63" stroke-width="4"/><text x="390" y="390" text-anchor="middle" font-size="16">DÉBIT Q</text><text x="24" y="205" transform="rotate(-90 24 205)" text-anchor="middle" font-size="16">HAUTEUR H</text></g><g data-demo="2" class="p-demo-part"><path d="M90 95C270 110 470 190 650 330" fill="none" stroke="#3d7fca" stroke-width="7"/><text x="510" y="130" font-size="17" font-weight="700">COURBE POMPE</text></g><g data-demo="3" class="p-demo-part"><path d="M90 340Q360 305 650 90" fill="none" stroke="#c9451a" stroke-width="7" stroke-dasharray="11 8"/><text x="500" y="285" font-size="17" font-weight="700">COURBE RÉSEAU</text></g><g data-demo="4" class="p-demo-part"><circle cx="388" cy="228" r="14" fill="#fffdf8" stroke="#1e7e54" stroke-width="7"/><path d="M388 228V340M80 228H388" stroke="#1e7e54" stroke-width="3" stroke-dasharray="6 5"/><text x="415" y="214" font-size="18" font-weight="700">POINT OBTENU</text></g>`),
    "delta-t": sceneShell("course-dt", "Deux températures comparables autour du même émetteur", "Une sonde est placée au départ immédiat et une autre au retour immédiat du même émetteur. L’état doit être stabilisé.", `<g data-demo="1" class="p-demo-part"><path d="M90 105H650" stroke="#c9451a" stroke-width="14" marker-end="url(#arr-course-dt)"/><text x="300" y="80" text-anchor="middle" font-size="18" font-weight="700">DÉPART</text></g><g data-demo="2" class="p-demo-part"><rect x="570" y="120" width="135" height="160" rx="20" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="638" y="205" text-anchor="middle" font-size="18" font-weight="700">ÉMETTEUR</text></g><g data-demo="3" class="p-demo-part"><path d="M650 315H90" stroke="#3d7fca" stroke-width="14" marker-end="url(#arr-course-dt)"/><text x="300" y="350" text-anchor="middle" font-size="18" font-weight="700">RETOUR</text></g><g data-demo="4" class="p-demo-part"><circle cx="520" cy="105" r="22" fill="#fffdf8" stroke="#c9451a" stroke-width="6"/><text x="520" y="112" text-anchor="middle" font-size="16" font-weight="700">T₁</text><circle cx="520" cy="315" r="22" fill="#fffdf8" stroke="#3d7fca" stroke-width="6"/><text x="520" y="322" text-anchor="middle" font-size="16" font-weight="700">T₂</text><text x="245" y="220" text-anchor="middle" font-size="24" font-weight="700">ΔT = T₁ − T₂</text><text x="245" y="253" text-anchor="middle" font-size="16">mêmes points · même état stabilisé</text></g>`),
    puissance: sceneShell("course-power", "Relation entre puissance, débit et écart de température", "Trois cartes montrent la puissance P, le débit Q et l’écart delta T, reliés par la formule pratique pour l’eau.", `<g data-demo="1" class="p-demo-part"><rect x="55" y="110" width="180" height="170" rx="22" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="7 5"/><text x="145" y="165" text-anchor="middle" font-size="22" font-weight="700">PUISSANCE P</text><text x="145" y="220" text-anchor="middle" font-size="30" font-weight="700">kW</text></g><g data-demo="2" class="p-demo-part"><rect x="290" y="110" width="180" height="170" rx="22" fill="#fffdf8" stroke="#3d7fca" stroke-width="4"/><text x="380" y="165" text-anchor="middle" font-size="22" font-weight="700">DÉBIT Q</text><text x="380" y="220" text-anchor="middle" font-size="25" font-weight="700">m³/h</text></g><g data-demo="3" class="p-demo-part"><rect x="525" y="110" width="180" height="170" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="615" y="165" text-anchor="middle" font-size="22" font-weight="700">ÉCART ΔT</text><text x="615" y="220" text-anchor="middle" font-size="30" font-weight="700">K</text></g><g data-demo="4" class="p-demo-part"><rect x="170" y="320" width="420" height="62" rx="18" fill="#e3f5ec" stroke="#1e7e54" stroke-width="6"/><text x="380" y="359" text-anchor="middle" font-size="26" font-weight="700">P ≈ 1,16 × Q × ΔT</text></g>`),
    mesurer: sceneShell("course-measure", "Construire une mesure traçable", "Grandeur, instrument, point, unité, état et heure forment ensemble une preuve exploitable.", `<g data-demo="1" class="p-demo-part"><rect x="35" y="115" width="150" height="180" rx="20" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="110" y="160" text-anchor="middle" font-size="18" font-weight="700">GRANDEUR</text><text x="110" y="215" text-anchor="middle" font-size="16">débit ?</text><text x="110" y="245" text-anchor="middle" font-size="16">température ?</text></g><g data-demo="2" class="p-demo-part"><rect x="215" y="115" width="150" height="180" rx="20" fill="#fffdf8" stroke="#3d7fca" stroke-width="4"/><text x="290" y="160" text-anchor="middle" font-size="18" font-weight="700">INSTRUMENT</text><text x="290" y="220" text-anchor="middle" font-size="16">plage · état</text></g><g data-demo="3" class="p-demo-part"><rect x="395" y="115" width="150" height="180" rx="20" fill="#fffdf8" stroke="#c9451a" stroke-width="4" stroke-dasharray="9 6"/><text x="470" y="160" text-anchor="middle" font-size="18" font-weight="700">POINT + UNITÉ</text><text x="470" y="220" text-anchor="middle" font-size="16">où ? combien ?</text></g><g data-demo="4" class="p-demo-part"><rect x="575" y="115" width="150" height="180" rx="20" fill="#e3f5ec" stroke="#1e7e54" stroke-width="6"/><text x="650" y="160" text-anchor="middle" font-size="18" font-weight="700">CONTEXTE</text><text x="650" y="210" text-anchor="middle" font-size="16">état · heure</text><text x="650" y="245" text-anchor="middle" font-size="16">avant / après</text></g><text x="380" y="355" text-anchor="middle" font-size="20" font-weight="700">Une valeur seule ne suffit pas.</text>`)
  };

  const catalogue = {
    energie: {
      short: ["Besoin", "Distinguer", "Suivre", "Méthode", "Préparer"],
      titles: ["Pourquoi transporter de l’énergie ?", "L’eau n’est pas l’énergie", "Suis la chaîne complète", "Nommer les quatre fonctions", "Prépare la manipulation"],
      leads: ["Le local a un besoin ; la production transmet de l’énergie à l’eau.", "La température décrit un état. L’énergie désigne ici un transfert.", "Production, eau, émetteur et local ont chacun un rôle.", "Dire qui fournit, transporte, transfère et reçoit évite les confusions.", "Tu vas remettre les quatre fonctions dans l’ordre, avec la solution déjà expliquée."],
      bodies: ["Dans une boucle de chauffage, l’eau circule entre la production et l’émetteur.", "Une eau chaude peut transporter de l’énergie, mais la température seule ne donne pas la puissance.", "L’émetteur transfère une partie de l’énergie au local.", "La chaîne sert à expliquer avant de calculer.", "La manipulation suivante est un entraînement sans note."],
      keys: ["La clé : le besoin du local déclenche une chaîne de transfert.", "La clé : l’eau transporte ; l’énergie est transférée.", "La clé : production → eau → émetteur → local.", "La clé : chaque mot correspond à une fonction différente.", "La clé : observe l’ordre avant de le reproduire."]
    },
    debit: {
      short: ["Besoin", "Courbes", "Croisement", "Effets", "Préparer"],
      titles: ["Pourquoi faut-il un débit ?", "La pompe et le réseau agissent ensemble", "Le débit obtenu est un croisement", "Une commande déplace le point", "Prépare le réglage guidé"],
      leads: ["Le débit décrit un volume d’eau par unité de temps.", "La pompe propose une courbe ; le réseau oppose une résistance.", "L’intersection donne le point de fonctionnement du modèle.", "Changer la vitesse ou la résistance modifie le croisement.", "Tu vas déplacer les deux courbes et lire le résultat."],
      bodies: ["Sans circulation, l’eau ne transporte pas l’énergie vers les usages.", "La pompe seule ne fixe pas le débit réel.", "Le point porte simultanément un débit Q et une hauteur H.", "Il faut observer avant et après, puis stabiliser sur l’installation réelle.", "Les courbes restent simplifiées et ne remplacent pas les données constructeur."],
      keys: ["La clé : un débit possède une valeur, une unité et un point de mesure.", "La clé : pompe + réseau déterminent le résultat.", "La clé : lis l’intersection, pas une courbe isolée.", "La clé : une action produit un nouveau point à vérifier.", "La clé : manipule sans note, puis explique ce qui bouge."]
    },
    "delta-t": {
      short: ["Besoin", "Deux points", "Stabiliser", "Interpréter", "Préparer"],
      titles: ["Pourquoi comparer deux températures ?", "Encadrer le même émetteur", "Attendre un état exploitable", "Un ΔT ne donne pas seul la cause", "Prépare le placement des sondes"],
      leads: ["ΔT décrit un écart entre deux températures choisies.", "Une sonde se place au départ immédiat et l’autre au retour immédiat.", "En régime transitoire, les valeurs évoluent encore.", "Il faut croiser ΔT, débit, charge et état des organes.", "Tu vas placer les sondes puis vérifier la stabilisation."],
      bodies: ["L’écart numérique peut s’exprimer en kelvins pour une différence de température.", "Les deux mesures doivent concerner le même usage et le même état.", "Plusieurs relevés comparables montrent si la situation devient stable.", "Une valeur isolée ne prouve pas un manque de débit.", "La manipulation reste une préparation au geste réel."],
      keys: ["La clé : ΔT = T départ − T retour.", "La clé : deux bons points valent mieux que deux valeurs prises au hasard.", "La clé : attendre et relever de nouveau avant d’interpréter.", "La clé : mesurer, croiser, puis seulement formuler une hypothèse.", "La clé : place, attends, compare."]
    },
    puissance: {
      short: ["Besoin", "Relation", "Unités", "Sens", "Préparer"],
      titles: ["Pourquoi estimer la puissance ?", "Trois grandeurs sont reliées", "Garder les unités prévues", "Contrôler l’ordre de grandeur", "Prépare le calcul à curseurs"],
      leads: ["La puissance décrit un transfert d’énergie par unité de temps.", "Pour l’eau, un calcul pratique relie P, Q et ΔT.", "P en kW, Q en m³/h et ΔT en K utilisent ici le coefficient 1,16.", "Un résultat doit rester cohérent avec le besoin et les mesures.", "Tu vas agir sur Q et ΔT pour atteindre une puissance cible."],
      bodies: ["Le calcul ne remplace ni le cahier des charges ni la mesure.", "Si deux grandeurs sont connues, la relation permet d’estimer la troisième.", "Pour un autre fluide ou un calcul précis, les propriétés adaptées sont nécessaires.", "Une erreur d’unité peut rendre le chiffre inutilisable.", "La manipulation suivante explique immédiatement chaque effet."],
      keys: ["La clé : la puissance relie besoin, débit et écart de température.", "La clé : P ≈ 1,16 × Q × ΔT pour l’eau dans les unités indiquées.", "La clé : écris toujours la valeur avec son unité.", "La clé : calcule puis contrôle la plausibilité.", "La clé : modifie une grandeur et observe le résultat."]
    },
    mesurer: {
      short: ["Besoin", "Choisir", "Repérer", "Tracer", "Préparer"],
      titles: ["Pourquoi préparer une mesure ?", "Choisir l’instrument adapté", "Nommer le point et l’unité", "Garder le contexte", "Prépare la valise de mesure"],
      leads: ["Une valeur doit pouvoir être comprise par une autre personne.", "La grandeur recherchée commande le choix de l’instrument.", "Le même nombre change de sens si le point ou l’unité manque.", "État, heure et conditions rendent l’avant/après comparable.", "Tu vas associer grandeurs, instruments, points et unités."],
      bodies: ["La mesure sert à décrire, comparer ou vérifier une hypothèse.", "Il faut aussi contrôler l’état et la plage de l’appareil.", "Écris par exemple la branche ou la conduite concernée.", "Une seule action entre deux relevés aide à attribuer l’effet.", "Aucune donnée nominative n’est enregistrée."],
      keys: ["La clé : une valeur seule n’est pas une preuve.", "La clé : grandeur → instrument adapté.", "La clé : point + valeur + unité.", "La clé : état initial → action → stabilisation → nouveau relevé.", "La clé : prépare avant d’intervenir."]
    }
  };

  function lessonsFor(id) {
    const data = catalogue[id];
    return data.titles.map((title, index) => ({
      short: data.short[index],
      kicker: `${index + 1} · ${index === 0 ? "Observer" : index === 1 ? "Comprendre" : index === 2 ? "Voir fonctionner" : index === 3 ? "Expliquer" : "Se préparer"}`,
      title, lead: data.leads[index], body: data.bodies[index], key: data.keys[index],
      equivalent: `${data.leads[index]} ${data.bodies[index]}`,
      scene: scenes[id]
    }));
  }

  const originalInit = window.HydroStation?.init;
  if (!originalInit) throw new Error("Moteur HydroStation absent avant la formation.");

  window.HydroStation.init = (stationConfig) => {
    const originalShell = originalInit(stationConfig);
    const id = window.location.pathname.split("/").filter(Boolean).slice(-2, -1)[0];
    const lessons = lessonsFor(id);
    const style = document.createElement("link");
    style.rel = "stylesheet"; style.href = "../_commun/p-formation.css?v=20260823-global1"; document.head.append(style);
    document.body.classList.add("p-course-active");

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const activity = $("#activityView");
    const quiz = $("#quizView");
    const result = $("#resultView");
    const main = $("main");
    const startQuiz = $("#startQuiz");
    startQuiz.classList.add("hidden");
    quiz.classList.add("hidden"); result.classList.add("hidden");

    const progress = document.createElement("nav");
    progress.id = "pCourseProgress"; progress.className = "p-course-progress"; progress.setAttribute("aria-label", "Progression de la formation");
    $(".topbar").after(progress);

    const course = document.createElement("section");
    course.id = "pCourseView"; course.className = "p-course-view"; course.innerHTML = `<article class="p-course-card"><div class="p-course-copy"><p id="pKicker" class="p-course-kicker"></p><h2 id="pTitle" class="p-course-title" tabindex="-1"></h2><p id="pLead" class="p-course-lead"></p><div id="pBody" class="p-course-body"></div><div id="pLevel" class="p-course-level"></div><p id="pKey" class="p-course-key"></p><div id="pControls" class="p-course-controls"></div></div><div class="p-course-scene"><div id="pScene"></div><p id="pEquivalent" class="p-course-equivalent" aria-live="polite"></p></div></article>`;
    main.prepend(course);

    const footerNav = $(".footer-nav");
    const prev = document.createElement("button"); prev.id = "pPrev"; prev.type = "button"; prev.textContent = "Retour";
    const count = document.createElement("span"); count.id = "pCount"; count.setAttribute("aria-live", "polite");
    const next = document.createElement("button"); next.id = "pNext"; next.type = "button"; next.className = "primary"; next.textContent = "Continuer";
    footerNav.insertBefore(prev, startQuiz); footerNav.insertBefore(count, startQuiz); footerNav.insertBefore(next, startQuiz);

    const voice = document.createElement("div");
    voice.className = "p-voice-actions"; voice.setAttribute("aria-label", "Lecture vocale facultative");
    voice.innerHTML = `<button id="pListen" type="button" aria-label="Écouter l’étape">▶ <span>Écouter</span></button><button id="pStop" type="button" aria-label="Arrêter la lecture" disabled>■ <span>Arrêter</span></button><span id="pVoiceStatus" class="p-voice-status" aria-live="polite">Voix coupée.</span>`;
    $(".topbar").append(voice);

    const total = lessons.length + 2;
    let current = 0;
    let furthest = 0;
    let practiceReady = false;
    let timers = [];
    let speechRun = 0;
    let speaking = false;
    let paused = false;

    function activeLine() {
      const asked = new URLSearchParams(window.location.search).get("line")?.toUpperCase();
      return routes[asked]?.includes(id) ? asked : "P";
    }

    function nextDestination() {
      const line = activeLine(); const route = routes[line]; const index = route.indexOf(id);
      if (index < route.length - 1) return { href: `../${route[index + 1]}/index.html?line=${line}`, label: "Station suivante" };
      return { href: `../../lignes/${line}/parcours.html?evaluation=1`, label: `Évaluation finale ${line}` };
    }

    function stopDemo() { timers.forEach(clearTimeout); timers = []; $("#pScene")?.classList.remove("p-demo-running"); }
    function runDemo() {
      stopDemo();
      const scene = $("#pScene"); const parts = $$('[data-demo]', scene);
      scene.classList.add("p-demo-running");
      parts.forEach((part, index) => timers.push(setTimeout(() => {
        parts.forEach((item) => item.classList.remove("p-demo-current")); part.classList.add("p-demo-current");
        $("#pEquivalent").textContent = `${current < lessons.length ? lessons[current].equivalent : "Synthèse."} Démonstration : repère ${index + 1} sur ${parts.length}.`;
      }, index * 850)));
      timers.push(setTimeout(() => { parts.forEach((item) => item.classList.remove("p-demo-current")); scene.classList.remove("p-demo-running"); $("#pEquivalent").textContent = current < lessons.length ? lessons[current].equivalent : "Synthèse."; }, parts.length * 850 + 350));
    }

    function stopSpeech(message = "Lecture arrêtée.") {
      speechRun += 1; if ("speechSynthesis" in window) window.speechSynthesis.cancel(); speaking = false; paused = false;
      $("#pListen").innerHTML = "▶ <span>Écouter</span>"; $("#pStop").disabled = true; if (message) $("#pVoiceStatus").textContent = message;
    }

    function speak() {
      if (!("speechSynthesis" in window)) return;
      if (speaking && paused) { window.speechSynthesis.resume(); paused = false; $("#pListen").innerHTML = "Ⅱ <span>Pause</span>"; return; }
      if (speaking) { window.speechSynthesis.pause(); paused = true; $("#pListen").innerHTML = "▶ <span>Reprendre</span>"; return; }
      stopSpeech(""); const run = speechRun;
      const visible = current === lessons.length ? activity.innerText : [$("#pTitle").innerText, $("#pLead").innerText, $("#pBody").innerText, $("#pLevel").innerText, $("#pKey").innerText, $("#pEquivalent").innerText].join(". ");
      const utterance = new SpeechSynthesisUtterance(visible); utterance.lang = "fr-FR"; utterance.rate = .95; utterance.pitch = 1;
      const voices = window.speechSynthesis.getVoices(); utterance.voice = voices.find((item) => item.lang?.toLowerCase() === "fr-fr") || voices.find((item) => item.lang?.toLowerCase().startsWith("fr")) || null;
      utterance.onstart = () => { if (run !== speechRun) return; speaking = true; $("#pListen").innerHTML = "Ⅱ <span>Pause</span>"; $("#pStop").disabled = false; $("#pVoiceStatus").textContent = "Lecture en cours."; };
      utterance.onend = () => { if (run === speechRun) stopSpeech("Lecture terminée."); };
      utterance.onerror = (event) => { if (run === speechRun && !["canceled", "interrupted"].includes(event.error)) stopSpeech("Voix indisponible. Tout reste écrit."); };
      window.speechSynthesis.speak(utterance);
    }

    function renderProgress() {
      const labels = lessons.map((lesson) => lesson.short).concat(["Essai guidé", "Synthèse"]);
      progress.innerHTML = labels.map((label, index) => `<button type="button" data-course-step="${index}" class="${index < current ? "done" : ""}" ${index === current ? 'aria-current="step"' : ""} ${index > furthest ? "disabled" : ""}><span>${index + 1}</span> <span class="p-label">${label}</span></button>`).join("");
      $$('[data-course-step]', progress).forEach((button) => button.addEventListener("click", () => { const target = Number(button.dataset.courseStep); if (target <= furthest) { current = target; render(); } }));
    }

    function levelNote() {
      const selected = $('[data-level][aria-pressed="true"]')?.dataset.level || "TP";
      return (stationConfig.levels[selected] || stationConfig.levels.TP).objective;
    }

    function renderCourseLesson(lesson) {
      course.classList.remove("hidden"); activity.classList.add("hidden");
      $("#pKicker").textContent = `Station ${id} · ${lesson.kicker}`;
      $("#pTitle").textContent = lesson.title; $("#pLead").textContent = lesson.lead; $("#pBody").innerHTML = `<p>${lesson.body}</p>`;
      $("#pLevel").innerHTML = `<strong>${({CAP:"CAP",TP:"Bac pro",BTS:"BTS"})[$('[data-level][aria-pressed="true"]')?.dataset.level] || "Bac pro"} :</strong> ${levelNote()}`;
      $("#pKey").textContent = lesson.key; $("#pScene").innerHTML = lesson.scene; $("#pEquivalent").textContent = lesson.equivalent;
      $("#pControls").innerHTML = `<button type="button" id="pRunDemo">Montrer pas à pas</button>`; $("#pRunDemo").addEventListener("click", runDemo);
      next.disabled = false;
    }

    function renderSummary() {
      const data = catalogue[id]; const destination = nextDestination();
      course.classList.remove("hidden"); activity.classList.add("hidden");
      $("#pKicker").textContent = "7 · Synthèse"; $("#pTitle").textContent = "Tu as observé, compris puis manipulé";
      $("#pLead").textContent = data.keys[3]; $("#pBody").innerHTML = `<p>${data.leads[4]}</p><p>La note viendra une seule fois, dans la station Évaluation située à la fin de la ligne.</p>`;
      $("#pLevel").innerHTML = `<strong>Suite :</strong> ${destination.label}.`; $("#pKey").textContent = data.keys[4]; $("#pScene").innerHTML = scenes[id]; $("#pEquivalent").textContent = `${data.leads[0]} ${data.keys[3]}`;
      $("#pControls").innerHTML = `<button type="button" id="pRunDemo">Rejouer la démonstration</button>`; $("#pRunDemo").addEventListener("click", runDemo); next.disabled = false;
    }

    function render() {
      stopDemo(); stopSpeech(""); quiz.classList.add("hidden"); result.classList.add("hidden"); renderProgress(); prev.disabled = current === 0;
      if (current < lessons.length) renderCourseLesson(lessons[current]);
      else if (current === lessons.length) { course.classList.add("hidden"); activity.classList.remove("hidden"); next.disabled = !practiceReady; }
      else renderSummary();
      count.textContent = `${current + 1} / ${total}`;
      next.textContent = current < lessons.length ? "Continuer" : current === lessons.length ? "Voir la synthèse" : nextDestination().label;
      requestAnimationFrame(() => (current === lessons.length ? activity : $("#pTitle")).focus?.({ preventScroll: true }));
    }

    prev.addEventListener("click", () => { if (current > 0) { current -= 1; render(); } });
    next.addEventListener("click", () => {
      if (next.disabled) return;
      if (current < total - 1) { current += 1; furthest = Math.max(furthest, current); render(); }
      else window.location.href = nextDestination().href;
    });
    $$('[data-level]').forEach((button) => button.addEventListener("click", () => { if (current !== lessons.length) render(); }));
    $("#pListen").addEventListener("click", speak); $("#pStop").addEventListener("click", () => stopSpeech());
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(""); });
    window.addEventListener("pagehide", () => stopSpeech("")); window.addEventListener("beforeunload", () => stopSpeech(""));
    if (!("speechSynthesis" in window)) { $("#pListen").disabled = true; $("#pVoiceStatus").textContent = "Voix indisponible. Tout reste écrit."; }

    render();
    return {
      ...originalShell,
      unlockQuiz() { practiceReady = true; next.disabled = current !== lessons.length ? next.disabled : false; },
      showActivity() { current = lessons.length; furthest = Math.max(furthest, current); render(); }
    };
  };
})();
