(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  let current = 0;
  let furthest = 0;
  let autoplay = false;
  let voiceEnabled = true;
  let speaking = false;
  let paused = false;
  let speechRun = 0;
  let speechTimer = null;
  let selectedVoice = null;
  let selectedVoiceKey = "";
  let voiceChoiceIsManual = false;
  let rateIndex = 1;
  let quizIndex = 0;
  let score = 0;
  let answered = false;
  let zeotropeMode = "superheat";
  let protocolChecked = new Set();

  const rates = [0.8, 0.95, 1.1, 1.25];
  const R134A = [
    { p: 1.327, t: -20 }, { p: 2.006, t: -10 }, { p: 2.928, t: 0 },
    { p: 4.146, t: 10 }, { p: 5.717, t: 20 }, { p: 7.702, t: 30 },
    { p: 10.166, t: 40 }, { p: 13.179, t: 50 },
  ];
  const R407C_GLIDE = 6.1;

  const lessons = [
    {
      short: "Différence",
      kicker: "Étape 1 · Poser le vocabulaire",
      title: "Ce ne sont pas des températures. Ce sont des écarts.",
      text: "Une température réelle du tube ne devient une surchauffe ou un sous-refroidissement qu’après comparaison avec la température de saturation à la même pression.",
      speak: "Première règle à mémoriser. La surchauffe et le sous-refroidissement ne sont jamais des températures. Ce sont des différences de température, exprimées en kelvins. Dire que le tube d’aspiration est à huit degrés Celsius ne permet pas encore d’annoncer une surchauffe. Il manque la température de saturation du fluide frigorigène à la pression mesurée.",
      render: definitionMarkup,
    },
    {
      short: "Instruments",
      kicker: "Étape 2 · Réunir les informations",
      title: "Un manomètre et une sonde : aucun ne suffit seul.",
      text: "Le manomètre fournit la pression. La table du fluide la traduit en température de saturation. La sonde de contact mesure la température réelle du tube.",
      speak: "La mesure réunit deux instruments et une table. Le manomètre fournit une pression. La table pression-température du fluide frigorigène transforme cette pression en température de saturation. La sonde de contact fournit la température réelle du tube, au point de mesure. La différence entre la température réelle et la saturation donne la valeur recherchée. Un seul instrument ne suffit jamais.",
      render: instrumentsMarkup,
    },
    {
      short: "Référence",
      kicker: "Étape 3 · Choisir le bon côté",
      title: "Vapeur : rosée. Liquide : bulle.",
      text: "La surchauffe se calcule sur une vapeur seule. Le sous-refroidissement se calcule sur un liquide seul. Avec un zéotrope, la référence change donc de colonne.",
      speak: "La surchauffe concerne une vapeur seule, après la disparition de la dernière goutte. Avec un mélange zéotrope, sa référence est le point de rosée. Le sous-refroidissement concerne un liquide seul, après la disparition de la dernière bulle. Sa référence est le point de bulle. Pour un fluide pur, les deux références coïncident. Pour un zéotrope, choisir la mauvaise colonne produit une erreur.",
      render: referenceMarkup,
    },
    {
      short: "Surchauffe",
      kicker: "Étape 4 · Calculer côté basse pression",
      title: "Surchauffe = température réelle − saturation.",
      text: "Réglez la pression absolue du R‑134a puis la température du tube d’aspiration. Le calcul garde toujours cet ordre.",
      speak: "Prenons un exemple au R cent trente-quatre a. À environ deux bars absolus, la température de saturation est proche de moins dix degrés Celsius. Si la sonde mesure moins trois degrés Celsius, la vapeur est sept kelvins au-dessus de la saturation. La surchauffe vaut donc sept kelvins. Température réelle moins température de saturation.",
      voiceSteps: [
        { control: "#sh-pressure", value: 20, text: "Réglez la pression vers deux bars absolus. La table donne une saturation proche de moins dix degrés Celsius." },
        { control: "#sh-tube", value: -3, text: "La sonde mesure moins trois degrés Celsius. Moins trois, moins moins dix, donne sept kelvins de surchauffe." },
      ],
      render: superheatCalcMarkup,
    },
    {
      short: "Utile / totale",
      kicker: "Étape 5 · Localiser les deux mesures",
      title: "La ligne d’aspiration peut ajouter de la surchauffe.",
      text: "La surchauffe utile se mesure à la sortie de l’évaporateur. La surchauffe totale se mesure à l’entrée du compresseur.",
      speak: "La surchauffe utile est gagnée dans l’évaporateur : elle participe à l’effet frigorifique. La surchauffe totale est mesurée à l’entrée du compresseur. Elle comprend la surchauffe utile et ce que la ligne d’aspiration ajoute en traversant son environnement. Dans l’exemple, la pression reste sensiblement identique. Une ligne mal isolée peut donc augmenter la surchauffe totale sans améliorer le refroidissement du local.",
      voiceSteps: [
        { control: "#line-gain", value: 0, text: "À la sortie de l’évaporateur, la surchauffe utile vaut six kelvins." },
        { control: "#line-gain", value: 4, text: "La ligne d’aspiration ajoute quatre kelvins. À l’entrée du compresseur, la surchauffe totale atteint dix kelvins." },
      ],
      render: usefulTotalMarkup,
    },
    {
      short: "Protéger",
      kicker: "Étape 6 · Comprendre la fonction",
      title: "Le compresseur doit recevoir une vapeur surchauffée.",
      text: "La surchauffe confirme que la vaporisation est terminée avant le compresseur. Le détendeur thermostatique agit pour réguler cette surchauffe en sortie d’évaporateur.",
      speak: "Le compresseur doit aspirer une vapeur surchauffée, pas un mélange contenant encore du liquide. La surchauffe confirme que la dernière goutte a disparu. Le détendeur thermostatique module son ouverture pour réguler la surchauffe à la sortie de l’évaporateur. Le repère pédagogique du pack est de cinq à dix kelvins, mais la valeur de réglage de la machine vient toujours de sa documentation constructeur.",
      render: superheatPurposeMarkup,
    },
    {
      short: "Sous-refroidir",
      kicker: "Étape 7 · Calculer côté haute pression",
      title: "Sous-refroidissement = saturation − température réelle.",
      text: "Réglez la pression absolue du R‑134a puis la température de la ligne liquide. Ici, l’ordre de la soustraction s’inverse.",
      speak: "Côté haute pression, prenons environ dix virgule deux bars absolus. La saturation du R cent trente-quatre a est proche de quarante degrés Celsius. Si la ligne liquide est à trente-quatre degrés Celsius, le liquide est six kelvins sous sa température de saturation. Le sous-refroidissement vaut six kelvins. Température de saturation moins température réelle.",
      voiceSteps: [
        { control: "#sc-pressure", value: 102, text: "Réglez la haute pression vers dix virgule deux bars absolus. La table donne une saturation proche de quarante degrés Celsius." },
        { control: "#sc-tube", value: 34, text: "La sonde mesure trente-quatre degrés Celsius. Quarante moins trente-quatre donne six kelvins de sous-refroidissement." },
      ],
      render: subcoolCalcMarkup,
    },
    {
      short: "Garantir",
      kicker: "Étape 8 · Comprendre la fonction",
      title: "Le détendeur doit recevoir du liquide sous-refroidi.",
      text: "Le sous-refroidissement confirme que la liquéfaction est terminée et que la ligne liquide transporte bien du liquide avant la détente.",
      speak: "Le sous-refroidissement se mesure après la disparition de la dernière bulle. Il confirme la présence de liquide avant le détendeur. Le repère pédagogique du pack est de quatre à huit kelvins. Là encore, ce repère oriente la lecture mais ne remplace pas la documentation constructeur. Ce cours établit l’état du fluide frigorigène ; il ne demande pas encore de conclure sur une panne.",
      render: subcoolPurposeMarkup,
    },
    {
      short: "Zéotrope",
      kicker: "Étape 9 · Éviter l’erreur de colonne",
      title: "R‑407C : le glissement sépare bulle et rosée.",
      text: "Comparez le bon calcul au calcul fait avec la mauvaise référence. L’écart observé vient du glissement de 6,1 K utilisé dans l’exemple pédagogique.",
      speak: "Pour le R quatre-cent-sept cé, le point de bulle et le point de rosée sont séparés par un glissement. Pour calculer une surchauffe, choisissez la rosée, car vous observez une vapeur seule. Pour calculer un sous-refroidissement, choisissez la bulle, car vous observez un liquide seul. La mauvaise référence ajoute ici une erreur de six virgule un kelvins : ce n’est pas un détail.",
      render: zeotropeMarkup,
    },
    {
      short: "Protocole",
      kicker: "Étape 10 · Répéter le geste dans l’ordre",
      title: "Identifier, stabiliser, mesurer, traduire, comparer.",
      text: "Cliquez sur chaque geste pour mémoriser le protocole. Toutes les informations restent visibles : l’interaction sert à répéter, pas à cacher.",
      speak: "Le protocole tient en six gestes. Identifier le fluide frigorigène. Laisser l’installation atteindre un fonctionnement stabilisé. Choisir le point de mesure et la pression correspondante. Lire la température de saturation dans la bonne table. Poser correctement la sonde sur le tube au même endroit. Effectuer la soustraction dans le bon ordre et annoncer le résultat en kelvins.",
      render: protocolMarkup,
    },
    {
      short: "État",
      kicker: "Étape 11 · Déterminer l’état du fluide",
      title: "À pression fixée, la saturation devient la frontière.",
      text: "Déplacez la température réelle autour de la saturation. Le signe de l’écart permet de distinguer liquide sous-refroidi, état saturé et vapeur surchauffée.",
      speak: "À pression fixée, la température de saturation forme une frontière. En dessous de cette référence, le liquide est sous-refroidi. À la saturation, le fluide se trouve sur la frontière de changement d’état. Au-dessus, une vapeur seule est surchauffée. Cette lecture relie directement les mesures au code de compétence qui demande de déterminer l’état du fluide frigorigène.",
      voiceSteps: [
        { control: "#state-delta", value: -6, text: "Six kelvins sous la saturation : liquide sous-refroidi." },
        { control: "#state-delta", value: 0, text: "À la température de saturation : frontière de changement d’état." },
        { control: "#state-delta", value: 7, text: "Sept kelvins au-dessus de la saturation : vapeur surchauffée." },
      ],
      render: stateMarkup,
    },
    {
      short: "Mission",
      kicker: "Étape 12 · Réaliser un double relevé",
      title: "Obtenez deux mesures cohérentes sur le même R‑134a.",
      text: "Réglez les températures réelles. Les pressions imposent les références : environ −10 °C côté BP et +40 °C côté HP.",
      speak: "Mission de synthèse. Le R cent trente-quatre a sature vers moins dix degrés Celsius côté basse pression et vers plus quarante degrés Celsius côté haute pression. Réglez la température d’aspiration pour obtenir une surchauffe comprise entre cinq et dix kelvins. Réglez la ligne liquide pour obtenir un sous-refroidissement compris entre quatre et huit kelvins. Ces plages sont des repères pédagogiques ; la documentation constructeur reste prioritaire.",
      render: missionMarkup,
    },
    {
      short: "Défi",
      kicker: "Étape 13 · Vérifier les automatismes",
      title: "Dix questions pour fixer la méthode.",
      text: "Une question à la fois. Après chaque réponse, l’explication reprend la règle métier exacte.",
      speak: "Le défi final comporte dix questions. Le seuil de réussite est fixé à huit bonnes réponses sur dix. Il vérifie la méthode, les références et l’ordre des calculs. Ce mini-quiz est un entraînement et ne remplace pas l’épreuve officielle.",
      render: quizMarkup,
    },
  ];

  const questions = [
    { q: "Une surchauffe est…", answers: ["une température de tube", "une différence de température", "une pression"], correct: 1, why: "Elle compare la température réelle à la température de saturation et s’exprime en kelvins." },
    { q: "Quels éléments faut-il réunir pour calculer une surchauffe ?", answers: ["Une sonde seulement", "Une pression, la table du fluide et une température de tube", "La température du local seulement"], correct: 1, why: "La pression donne la saturation par la table ; la sonde donne la température réelle." },
    { q: "Quel est l’ordre du calcul de surchauffe ?", answers: ["T° réelle − T° saturation", "T° saturation − T° réelle", "Pression − température"], correct: 0, why: "La vapeur est plus chaude que sa saturation : température réelle moins saturation." },
    { q: "Pour un zéotrope, quelle référence sert à la surchauffe ?", answers: ["Point de bulle", "Point de rosée", "Moyenne des deux"], correct: 1, why: "La surchauffe concerne une vapeur seule : la référence est le point de rosée." },
    { q: "Où mesure-t-on la surchauffe utile ?", answers: ["À la sortie de l’évaporateur", "À la sortie du condenseur", "Avant le détendeur"], correct: 0, why: "Elle est gagnée dans l’évaporateur et se mesure à sa sortie." },
    { q: "Que comprend la surchauffe totale ?", answers: ["Seulement l’évaporateur", "L’utile et l’échauffement de la ligne d’aspiration", "Le sous-refroidissement"], correct: 1, why: "Elle est mesurée à l’entrée du compresseur et inclut ce que la ligne d’aspiration ajoute." },
    { q: "Quel est l’ordre du calcul de sous-refroidissement ?", answers: ["T° réelle − T° saturation", "T° saturation − T° réelle", "T° ambiante − T° réelle"], correct: 1, why: "Le liquide est plus froid que sa saturation : saturation moins température réelle." },
    { q: "Pour un zéotrope, quelle référence sert au sous-refroidissement ?", answers: ["Point de bulle", "Point de rosée", "Point critique"], correct: 0, why: "Le sous-refroidissement concerne un liquide seul : la référence est le point de bulle." },
    { q: "Une température d’aspiration de +8 °C suffit-elle pour annoncer 8 K de surchauffe ?", answers: ["Oui", "Non, il manque la saturation déduite de la pression", "Oui, si le tube est froid"], correct: 1, why: "Une température seule ne donne jamais une surchauffe." },
    { q: "Les plages 5–10 K et 4–8 K sont…", answers: ["des réglages universels", "des repères pédagogiques à confronter à la documentation constructeur", "des pressions"], correct: 1, why: "La documentation de la machine reste toujours prioritaire." },
  ];

  function format(value, digits = 1) {
    return Number(value).toLocaleString("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function interpolateTemperature(pressure) {
    if (pressure <= R134A[0].p) return R134A[0].t;
    if (pressure >= R134A[R134A.length - 1].p) return R134A[R134A.length - 1].t;
    for (let i = 1; i < R134A.length; i += 1) {
      if (pressure <= R134A[i].p) {
        const a = R134A[i - 1];
        const b = R134A[i];
        const ratio = (pressure - a.p) / (b.p - a.p);
        return a.t + ratio * (b.t - a.t);
      }
    }
    return 0;
  }

  function definitionMarkup() {
    return `<div class="zone-grid">
      <article class="zone-card definition-card"><small>VAPEUR SEULE</small><strong>Surchauffe</strong><div class="equation">T° tube − T° saturation</div><p>Résultat positif, exprimé en K.</p></article>
      <article class="zone-card definition-card"><small>LIQUIDE SEUL</small><strong>Sous-refroidissement</strong><div class="equation">T° saturation − T° tube</div><p>Résultat positif, exprimé en K.</p></article>
    </div>`;
  }

  function instrumentsMarkup() {
    return `<div class="measure-chain">
      <article><small>1</small><b>Manomètre</b><span>pression</span></article><i>→</i>
      <article><small>2</small><b>Table du fluide</b><span>T° saturation</span></article><i>+</i>
      <article><small>3</small><b>Sonde</b><span>T° réelle</span></article><i>→</i>
      <article><small>4</small><b>Soustraction</b><span>écart en K</span></article>
      <p class="measure-note">LA CLÉ · Le fluide, la pression et le point de mesure doivent correspondre.</p>
    </div>`;
  }

  function referenceMarkup() {
    return `<div class="reference-lab">
      <article class="reference-path"><small>SURCHAUFFE</small><strong>Vapeur seule</strong><span>Après la dernière goutte</span><span>Zéotrope : point de rosée</span></article>
      <article class="reference-path"><small>SOUS-REFROIDISSEMENT</small><strong>Liquide seul</strong><span>Après la dernière bulle</span><span>Zéotrope : point de bulle</span></article>
      <p class="reference-rule">Fluide pur : bulle et rosée coïncident. Zéotrope : la bonne colonne est indispensable.</p>
    </div>`;
  }

  function superheatCalcMarkup() {
    return `<div class="calc-lab">
      <div class="controls-card">
        <div class="control-row"><label for="sh-pressure">Pression absolue R‑134a <b id="sh-pressure-label">2,0 bar abs</b></label><input id="sh-pressure" type="range" min="13" max="41" step="1" value="20"><small>La table fournit la température de saturation.</small></div>
        <div class="control-row"><label for="sh-tube">Température du tube d’aspiration <b id="sh-tube-label">−3,0 °C</b></label><input id="sh-tube" type="range" min="-18" max="18" step="1" value="-3"><small>La sonde se pose au point de mesure.</small></div>
      </div>
      <div class="result-card"><small>SURCHAUFFE CALCULÉE</small><strong class="big-value" id="sh-result">7,0 <small>K</small></strong><div class="formula" id="sh-formula">−3,0 − (−10,0) = 7,0 K</div><div class="verdict" id="sh-verdict">REPÈRE · Dans la plage pédagogique 5–10 K.</div></div>
    </div>`;
  }

  function usefulTotalMarkup() {
    return `<div class="useful-lab">
      <div class="pipe-story">
        <div class="organ-box"><b>ÉVAPORATEUR</b><small>sortie vapeur</small></div>
        <div class="suction-line"><i class="point outlet"></i><span class="pipe-label outlet">mesure utile</span><i class="point suction"></i><span class="pipe-label suction">mesure totale</span></div>
        <div class="organ-box"><b>COMPRESSEUR</b><small>entrée aspiration</small></div>
      </div>
      <div class="control-row"><label for="line-gain">Échauffement ajouté par la ligne <b id="line-gain-label">4 K</b></label><input id="line-gain" type="range" min="0" max="6" step="1" value="4"></div>
      <div class="useful-values"><span>Saturation R‑134a<b>−10 °C</b></span><span>Surchauffe utile<b>6 K</b></span><span>Surchauffe totale<b id="total-superheat">10 K</b></span></div>
    </div>`;
  }

  function superheatPurposeMarkup() {
    return `<div class="purpose-grid">
      <article class="purpose-card"><small>ÉTAT À CONFIRMER</small><strong>Vapeur surchauffée</strong><p>La dernière goutte a disparu avant l’aspiration du compresseur.</p><div class="key">LA CLÉ · La surchauffe confirme la fin de la vaporisation.</div></article>
      <article class="purpose-card"><small>ORGANE QUI RÉGULE</small><strong>Détendeur thermostatique</strong><p>Il module son ouverture pour réguler la surchauffe en sortie d’évaporateur.</p><div class="limit">REPÈRE · 5–10 K dans ce pack ; constructeur prioritaire.</div></article>
    </div>`;
  }

  function subcoolCalcMarkup() {
    return `<div class="calc-lab">
      <div class="controls-card">
        <div class="control-row"><label for="sc-pressure">Pression absolue R‑134a <b id="sc-pressure-label">10,2 bar abs</b></label><input id="sc-pressure" type="range" min="77" max="132" step="1" value="102"><small>La table fournit la température de saturation.</small></div>
        <div class="control-row"><label for="sc-tube">Température de la ligne liquide <b id="sc-tube-label">34,0 °C</b></label><input id="sc-tube" type="range" min="20" max="48" step="1" value="34"><small>La sonde mesure le tube après le condenseur.</small></div>
      </div>
      <div class="result-card sc"><small>SOUS-REFROIDISSEMENT CALCULÉ</small><strong class="big-value" id="sc-result">6,0 <small>K</small></strong><div class="formula" id="sc-formula">40,0 − 34,0 = 6,0 K</div><div class="verdict" id="sc-verdict">REPÈRE · Dans la plage pédagogique 4–8 K.</div></div>
    </div>`;
  }

  function subcoolPurposeMarkup() {
    return `<div class="purpose-grid">
      <article class="purpose-card"><small>ÉTAT À CONFIRMER</small><strong>Liquide sous-refroidi</strong><p>La dernière bulle a disparu après la liquéfaction dans le condenseur.</p><div class="key">LA CLÉ · La ligne liquide transporte du liquide avant la détente.</div></article>
      <article class="purpose-card"><small>POINT DE MESURE</small><strong>Sortie condenseur</strong><p>Pression haute et température réelle sont relevées au point correspondant.</p><div class="limit">REPÈRE · 4–8 K dans ce pack ; constructeur prioritaire.</div></article>
    </div>`;
  }

  function zeotropeMarkup() {
    return `<div class="zeotrope-lab">
      <div class="mode-stack"><button class="mode-button ${zeotropeMode === "superheat" ? "active" : ""}" data-zeotrope="superheat" type="button">Calculer la surchauffe</button><button class="mode-button ${zeotropeMode === "subcool" ? "active" : ""}" data-zeotrope="subcool" type="button">Calculer le sous-refroidissement</button></div>
      <div class="glide-card"><small>R‑407C · EXEMPLE À PRESSION CONSTANTE</small><div class="glide-scale"><span><b>−10,0 °C</b><b>−3,9 °C</b></span></div><div class="glide-result" id="glide-result"></div><div class="wrong-reference" id="wrong-reference"></div></div>
    </div>`;
  }

  function protocolMarkup() {
    const steps = [
      ["Identifier", "Fluide et documentation"], ["Stabiliser", "Fonctionnement établi"],
      ["Choisir", "Côté et point de mesure"], ["Mesurer P", "Pression et référence"],
      ["Lire la table", "Rosée ou bulle"], ["Mesurer T°", "Sonde puis soustraction"],
    ];
    return `<div class="protocol">${steps.map((step, index) => `<button class="${protocolChecked.has(index) ? "checked" : ""}" data-protocol="${index}" type="button"><b>${index + 1}</b><span>${step[0]}</span><small>${step[1]}</small></button>`).join("")}<p class="protocol-status" id="protocol-status">${protocolChecked.size}/6 gestes répétés · cliquez dans l’ordre ou librement.</p></div>`;
  }

  function stateMarkup() {
    return `<div class="state-lab"><div class="state-track"><small>ÉCART À LA SATURATION</small><div class="state-axis"><i class="state-marker" id="state-marker"></i></div><label class="control-row" for="state-delta">Température réelle par rapport à la saturation <b id="state-delta-label">0 K</b></label><input id="state-delta" type="range" min="-10" max="10" step="1" value="0"></div><div class="state-readout"><small>ÉTAT DÉTERMINÉ</small><strong id="state-name">État saturé</strong><p id="state-copy">Le fluide est sur la frontière de changement d’état.</p></div></div>`;
  }

  function missionMarkup() {
    return `<div class="mission-grid">
      <article class="mission-card"><small>CÔTÉ BP · SATURATION −10 °C</small><h3>Surchauffe à l’aspiration</h3><label for="mission-sh">Température du tube : <b id="mission-sh-tube">−6 °C</b></label><input id="mission-sh" type="range" min="-10" max="5" step="1" value="-6"><div class="mission-values"><span>Formule<b>T tube − T sat.</b></span><span>Résultat<b id="mission-sh-value">4 K</b></span></div></article>
      <article class="mission-card"><small>CÔTÉ HP · SATURATION +40 °C</small><h3>Sous-refroidissement liquide</h3><label for="mission-sc">Température du tube : <b id="mission-sc-tube">37 °C</b></label><input id="mission-sc" type="range" min="28" max="40" step="1" value="37"><div class="mission-values"><span>Formule<b>T sat. − T tube</b></span><span>Résultat<b id="mission-sc-value">3 K</b></span></div></article>
      <p class="mission-result" id="mission-result">EN COURS · Atteignez 5–10 K de surchauffe et 4–8 K de sous-refroidissement.</p>
    </div>`;
  }

  function quizMarkup() {
    if (quizIndex >= questions.length) {
      const success = score >= 8;
      return `<div class="quiz-result ${success ? "success" : "retry"}"><small>${success ? "ACQUIS" : "À REPRENDRE"}</small><strong>${score}/10</strong><h3>${success ? "La méthode est stabilisée." : "Reprenez les références et les soustractions."}</h3><p>Seuil attendu : 8 bonnes réponses sur 10. Ce défi reste un entraînement.</p><button class="nav" id="quiz-restart" type="button">Refaire le défi</button></div>`;
    }
    const question = questions[quizIndex];
    return `<div class="quiz-wrap"><div class="quiz-head"><strong>Question ${quizIndex + 1} sur ${questions.length}</strong><span>Score : ${score}</span></div><div class="quiz-progress">${questions.map((_, index) => `<i class="${index < quizIndex ? "done" : index === quizIndex ? "current" : ""}"></i>`).join("")}</div><p class="quiz-question">${question.q}</p><div class="quiz-options">${question.answers.map((answer, index) => `<button class="quiz-option" data-answer="${index}" type="button">${answer}</button>`).join("")}</div><p class="quiz-feedback" id="quiz-feedback">Choisissez une réponse.</p></div>`;
  }

  function buildStepper() {
    $("#stepper").innerHTML = lessons.map((lesson, index) => `<button type="button" data-step="${index}" aria-label="Étape ${index + 1} : ${lesson.short}"><b>${index + 1}</b><span>${lesson.short}</span></button>`).join("");
    document.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => {
      const index = Number(button.dataset.step);
      if (index <= furthest) goTo(index, autoplay);
    }));
  }

  function render() {
    const lesson = lessons[current];
    $("#kicker").textContent = lesson.kicker;
    $("#title").textContent = lesson.title;
    $("#lesson-text").textContent = lesson.text;
    $("#zone").innerHTML = lesson.render();
    document.querySelectorAll("[data-step]").forEach((button, index) => {
      button.classList.toggle("active", index === current);
      button.classList.toggle("done", index < current || index < furthest);
      button.disabled = index > furthest;
      if (index === current) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    wireCurrentActivity();
    updateCourseNavigation();
  }

  function updateCourseNavigation() {
    const onQuiz = current === lessons.length - 1;
    const quizComplete = quizIndex >= questions.length;
    $("#prev").disabled = current === 0;
    $("#next").disabled = onQuiz && !quizComplete;
    $("#next").textContent = onQuiz ? (quizComplete ? "Voir le bilan ↓" : "Terminez le défi") : "Continuer →";
    $("#status").textContent = `Étape ${current + 1} sur ${lessons.length}`;
  }

  function wireCurrentActivity() {
    if ($("#sh-pressure")) {
      $("#sh-pressure").addEventListener("input", updateSuperheat);
      $("#sh-tube").addEventListener("input", updateSuperheat);
      updateSuperheat();
    }
    if ($("#line-gain")) {
      $("#line-gain").addEventListener("input", updateUsefulTotal);
      updateUsefulTotal();
    }
    if ($("#sc-pressure")) {
      $("#sc-pressure").addEventListener("input", updateSubcool);
      $("#sc-tube").addEventListener("input", updateSubcool);
      updateSubcool();
    }
    document.querySelectorAll("[data-zeotrope]").forEach((button) => button.addEventListener("click", () => {
      zeotropeMode = button.dataset.zeotrope;
      $("#zone").innerHTML = zeotropeMarkup();
      wireCurrentActivity();
    }));
    if ($("#glide-result")) updateZeotrope();
    document.querySelectorAll("[data-protocol]").forEach((button) => button.addEventListener("click", () => {
      protocolChecked.add(Number(button.dataset.protocol));
      button.classList.add("checked");
      $("#protocol-status").textContent = protocolChecked.size === 6 ? "ACQUIS · Les six gestes ont été répétés." : `${protocolChecked.size}/6 gestes répétés · continuez.`;
    }));
    if ($("#state-delta")) {
      $("#state-delta").addEventListener("input", updateState);
      updateState();
    }
    if ($("#mission-sh")) {
      $("#mission-sh").addEventListener("input", updateMission);
      $("#mission-sc").addEventListener("input", updateMission);
      updateMission();
    }
    document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer))));
    if ($("#quiz-restart")) $("#quiz-restart").addEventListener("click", () => {
      quizIndex = 0; score = 0; answered = false;
      $("#zone").innerHTML = quizMarkup(); wireCurrentActivity(); updateCourseNavigation();
    });
  }

  function updateSuperheat() {
    const pressure = Number($("#sh-pressure").value) / 10;
    const tube = Number($("#sh-tube").value);
    const saturation = interpolateTemperature(pressure);
    const value = tube - saturation;
    $("#sh-pressure-label").textContent = `${format(pressure)} bar abs`;
    $("#sh-tube-label").textContent = `${tube < 0 ? "−" : "+"}${format(Math.abs(tube))} °C`;
    $("#sh-result").innerHTML = `${format(value)} <small>K</small>`;
    $("#sh-formula").textContent = `${format(tube)} − (${format(saturation)}) = ${format(value)} K`;
    const verdict = $("#sh-verdict");
    verdict.className = "verdict";
    if (value < 0) { verdict.classList.add("bad"); verdict.textContent = "ÉTAT INCOHÉRENT · La température est sous la saturation : ce point ne décrit pas une vapeur surchauffée."; }
    else if (value < 5 || value > 10) { verdict.classList.add("warn"); verdict.textContent = "À COMPARER · Hors du repère pédagogique 5–10 K ; vérifiez la documentation constructeur."; }
    else verdict.textContent = "REPÈRE · Dans la plage pédagogique 5–10 K.";
  }

  function updateUsefulTotal() {
    const gain = Number($("#line-gain").value);
    $("#line-gain-label").textContent = `${gain} K`;
    $("#total-superheat").textContent = `${6 + gain} K`;
  }

  function updateSubcool() {
    const pressure = Number($("#sc-pressure").value) / 10;
    const tube = Number($("#sc-tube").value);
    const saturation = interpolateTemperature(pressure);
    const value = saturation - tube;
    $("#sc-pressure-label").textContent = `${format(pressure)} bar abs`;
    $("#sc-tube-label").textContent = `+${format(tube)} °C`;
    $("#sc-result").innerHTML = `${format(value)} <small>K</small>`;
    $("#sc-formula").textContent = `${format(saturation)} − ${format(tube)} = ${format(value)} K`;
    const verdict = $("#sc-verdict");
    verdict.className = "verdict";
    if (value < 0) { verdict.classList.add("bad"); verdict.textContent = "ÉTAT INCOHÉRENT · La température dépasse la saturation : ce point ne décrit pas un liquide sous-refroidi."; }
    else if (value < 4 || value > 8) { verdict.classList.add("warn"); verdict.textContent = "À COMPARER · Hors du repère pédagogique 4–8 K ; vérifiez la documentation constructeur."; }
    else verdict.textContent = "REPÈRE · Dans la plage pédagogique 4–8 K.";
  }

  function updateZeotrope() {
    const bubble = -10;
    const dew = bubble + R407C_GLIDE;
    if (zeotropeMode === "superheat") {
      const tube = 2.1;
      $("#glide-result").innerHTML = `<span>Référence rosée<b>${format(dew)} °C</b></span><span>Tube vapeur<b>+${format(tube)} °C</b></span><span>Surchauffe correcte<b>${format(tube - dew)} K</b></span>`;
      $("#wrong-reference").textContent = `ERREUR · Avec le point de bulle : ${format(tube - bubble)} K au lieu de ${format(tube - dew)} K.`;
    } else {
      const tube = -16;
      $("#glide-result").innerHTML = `<span>Référence bulle<b>${format(bubble)} °C</b></span><span>Tube liquide<b>${format(tube)} °C</b></span><span>Sous-refroidissement correct<b>${format(bubble - tube)} K</b></span>`;
      $("#wrong-reference").textContent = `ERREUR · Avec le point de rosée : ${format(dew - tube)} K au lieu de ${format(bubble - tube)} K.`;
    }
  }

  function updateState() {
    const delta = Number($("#state-delta").value);
    $("#state-delta-label").textContent = `${delta > 0 ? "+" : ""}${delta} K`;
    $("#state-marker").style.left = `${((delta + 10) / 20) * 100}%`;
    if (delta < 0) { $("#state-name").textContent = "Liquide sous-refroidi"; $("#state-copy").textContent = `${Math.abs(delta)} K sous la saturation.`; }
    else if (delta > 0) { $("#state-name").textContent = "Vapeur surchauffée"; $("#state-copy").textContent = `${delta} K au-dessus de la saturation.`; }
    else { $("#state-name").textContent = "État saturé"; $("#state-copy").textContent = "Le fluide est sur la frontière de changement d’état."; }
  }

  function updateMission() {
    const shTube = Number($("#mission-sh").value);
    const scTube = Number($("#mission-sc").value);
    const sh = shTube - (-10);
    const sc = 40 - scTube;
    $("#mission-sh-tube").textContent = `${shTube < 0 ? "−" : "+"}${Math.abs(shTube)} °C`;
    $("#mission-sc-tube").textContent = `+${scTube} °C`;
    $("#mission-sh-value").textContent = `${sh} K`;
    $("#mission-sc-value").textContent = `${sc} K`;
    const success = sh >= 5 && sh <= 10 && sc >= 4 && sc <= 8;
    $("#mission-result").classList.toggle("success", success);
    $("#mission-result").textContent = success ? `ACQUIS · Surchauffe ${sh} K et sous-refroidissement ${sc} K : les deux repères sont atteints.` : "EN COURS · Atteignez 5–10 K de surchauffe et 4–8 K de sous-refroidissement.";
  }

  function answerQuestion(choice) {
    if (answered) return;
    answered = true;
    const question = questions[quizIndex];
    const correct = choice === question.correct;
    document.querySelectorAll("[data-answer]").forEach((button, index) => {
      button.disabled = true;
      if (index === question.correct) button.classList.add("good");
      else if (index === choice) button.classList.add("bad");
    });
    if (correct) score += 1;
    $("#quiz-feedback").innerHTML = `${correct ? "✓ CORRECT" : "✗ À REVOIR"} · ${question.why} <button class="nav" id="quiz-next" type="button">${quizIndex === questions.length - 1 ? "Voir le résultat" : "Question suivante"}</button>`;
    $("#quiz-next").addEventListener("click", () => {
      quizIndex += 1; answered = false; $("#zone").innerHTML = quizMarkup(); wireCurrentActivity(); updateCourseNavigation();
    });
  }

  function voiceKey(voice) { return `${voice.voiceURI || ""}|${voice.name}|${voice.lang}`; }
  function voiceQuality(voice) {
    const label = `${voice.name} ${voice.voiceURI || ""}`.toLowerCase();
    const lang = String(voice.lang || "").replace("_", "-").toLowerCase();
    const isFrench = lang.startsWith("fr");
    const isFrance = lang === "fr-fr" || /french\s*\(france\)|français\s*\(france\)/i.test(label);
    const isNatural = /natural|naturel|neural/.test(label);
    const isOnline = /online|google/.test(label);
    const isLegacyDesktop = /desktop/.test(label) && !isNatural;
    const namePreference = /julie/.test(label) ? 45 : /paul/.test(label) ? 40 : /denise/.test(label) ? 35 : /henri/.test(label) ? 30 : /hortense/.test(label) ? 5 : 0;
    let family = 0;
    if (isFrance && (isNatural || isOnline)) family = 4;
    else if (isFrance) family = 3;
    else if (isFrench && (isNatural || isOnline)) family = 2;
    else if (isFrench) family = 1;
    return family * 1000 + (isNatural ? 180 : 0) + (isOnline ? 90 : 0) + (/microsoft/.test(label) ? 40 : 0) + namePreference + (voice.default ? 5 : 0) - (isLegacyDesktop ? 60 : 0);
  }
  function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function voiceDisplayName(voice) { return `${voice.name.replace(/\s*-\s*French\s*\(France\)\s*/i, "").trim()} · ${voice.lang}`; }
  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    const voices = speechSynthesis.getVoices();
    const ranked = [...voices].filter((voice) => /^fr(?:-|_)/i.test(voice.lang)).sort((a, b) => voiceQuality(b) - voiceQuality(a) || a.name.localeCompare(b.name, "fr"));
    const manualMatch = voiceChoiceIsManual && selectedVoiceKey ? ranked.find((voice) => voiceKey(voice) === selectedVoiceKey) : null;
    selectedVoice = manualMatch || ranked[0] || voices[0] || null;
    selectedVoiceKey = selectedVoice ? voiceKey(selectedVoice) : "";
    const select = $("#voice-choice");
    if (!ranked.length) { select.innerHTML = '<option value="">Voix française indisponible</option>'; select.disabled = true; $("#speech-warning").hidden = false; return; }
    select.disabled = false;
    select.innerHTML = ranked.map((voice) => `<option value="${escapeHtml(voiceKey(voice))}">${escapeHtml(voiceDisplayName(voice))}</option>`).join("");
    select.value = selectedVoiceKey;
    select.title = selectedVoice ? `Voix utilisée : ${voiceDisplayName(selectedVoice)}` : "";
    $("#speech-warning").hidden = true;
  }
  function prepareSpeechText(text) {
    return String(text).replace(/\bHP\b/g, "haute pression").replace(/\bBP\b/g, "basse pression").replace(/R[\u2011\u2010-]?134a/gi, "R cent trente-quatre a").replace(/R[\u2011\u2010-]?407C/gi, "R quatre-cent-sept cé").replace(/°C/g, " degrés Celsius").replace(/→/g, "vers").replace(/\s+/g, " ").trim();
  }
  function narrationChunks(text) { return prepareSpeechText(text).split(/(?<=[.!?;])\s+/).map((chunk) => chunk.trim()).filter(Boolean); }
  function updateListenButton() {
    const icon = $("#listen span"); const label = $("#listen b");
    if (speaking && !paused) { icon.textContent = "Ⅱ"; label.textContent = " Pause"; }
    else if (paused) { icon.textContent = "▶"; label.textContent = " Reprendre"; }
    else { icon.textContent = "▶"; label.textContent = " Écouter"; }
  }
  function stopSpeech() {
    speechRun += 1;
    if (speechTimer !== null) { window.clearTimeout(speechTimer); speechTimer = null; }
    if ("speechSynthesis" in window) { speechSynthesis.resume(); speechSynthesis.cancel(); }
    speaking = false; paused = false; updateListenButton();
  }
  function applyVoiceCue(cue) {
    if (!cue.control) return;
    const control = $(cue.control);
    if (control) { control.value = String(cue.value); control.dispatchEvent(new Event("input", { bubbles: true })); }
  }
  function speakCurrent() {
    if (!voiceEnabled) return;
    if (!("speechSynthesis" in window)) { $("#speech-warning").hidden = false; return; }
    stopSpeech(); loadVoices();
    const run = speechRun; const lesson = lessons[current];
    const steps = lesson.voiceSteps || narrationChunks(lesson.speak).map((text) => ({ text }));
    let stepIndex = 0;
    const speakStep = () => {
      if (run !== speechRun) return;
      if (stepIndex >= steps.length) { speaking = false; paused = false; updateListenButton(); return; }
      const cue = steps[stepIndex]; stepIndex += 1; applyVoiceCue(cue);
      const utterance = new SpeechSynthesisUtterance(prepareSpeechText(cue.text));
      utterance.lang = selectedVoice ? selectedVoice.lang : "fr-FR"; utterance.voice = selectedVoice; utterance.rate = rates[rateIndex]; utterance.pitch = 1;
      utterance.onstart = () => { if (run !== speechRun) return; speaking = true; paused = false; updateListenButton(); };
      utterance.onend = () => { if (run !== speechRun) return; speechTimer = window.setTimeout(speakStep, 120); };
      utterance.onerror = (event) => { if (event.error === "canceled" || event.error === "interrupted" || run !== speechRun) return; speaking = false; paused = false; updateListenButton(); $("#speech-warning").hidden = false; };
      speechSynthesis.speak(utterance);
    };
    speakStep();
  }
  function toggleSpeech() {
    if (!("speechSynthesis" in window)) { $("#speech-warning").hidden = false; return; }
    if (speaking && !paused) { speechSynthesis.pause(); paused = true; updateListenButton(); return; }
    if (paused) { speechSynthesis.resume(); paused = false; updateListenButton(); return; }
    speakCurrent();
  }
  function saveRate() {
    $("#speed-value").textContent = `${rates[rateIndex].toFixed(2).replace(".", ",")}×`;
    try { localStorage.setItem("surchauffe-sous-refroidissement-rate", String(rates[rateIndex])); } catch (_) {}
    if (speaking || paused) speakCurrent();
  }
  function goTo(index, continueNarration) {
    stopSpeech(); current = Math.max(0, Math.min(lessons.length - 1, index)); furthest = Math.max(furthest, current); render();
    if (continueNarration && voiceEnabled) window.setTimeout(speakCurrent, 320);
  }
  function enterCourseMode() { document.body.classList.remove("summary-running"); document.body.classList.add("course-running"); window.scrollTo({ top: 0, behavior: "auto" }); }
  function exitCourseMode() { stopSpeech(); document.body.classList.remove("course-running", "summary-running"); window.scrollTo({ top: 0, behavior: "auto" }); }
  function showSummary() { stopSpeech(); document.body.classList.remove("course-running"); document.body.classList.add("summary-running"); window.scrollTo({ top: 0, behavior: "auto" }); }
  function startCourse() { autoplay = true; enterCourseMode(); goTo(0, true); }

  buildStepper();
  try { const savedRate = Number(localStorage.getItem("surchauffe-sous-refroidissement-rate")); const savedIndex = rates.indexOf(savedRate); if (savedIndex >= 0) rateIndex = savedIndex; } catch (_) {}
  loadVoices();
  if ("speechSynthesis" in window) speechSynthesis.addEventListener("voiceschanged", loadVoices);
  else { $("#voice-choice").disabled = true; $("#listen").disabled = true; $("#speech-warning").hidden = false; }
  saveRate(); render();

  $("#start").addEventListener("click", startCourse);
  $("#prev").addEventListener("click", () => goTo(current - 1, autoplay));
  $("#next").addEventListener("click", () => { if (current === lessons.length - 1) showSummary(); else goTo(current + 1, autoplay); });
  $("#exit-course").addEventListener("click", exitCourseMode);
  $("#listen").addEventListener("click", toggleSpeech);
  $("#voice-choice").addEventListener("change", (event) => { if (!("speechSynthesis" in window)) return; const voices = speechSynthesis.getVoices(); selectedVoice = voices.find((voice) => voiceKey(voice) === event.target.value) || selectedVoice; selectedVoiceKey = selectedVoice ? voiceKey(selectedVoice) : ""; voiceChoiceIsManual = true; if (speaking || paused) speakCurrent(); });
  $("#slower").addEventListener("click", () => { rateIndex = Math.max(0, rateIndex - 1); saveRate(); });
  $("#faster").addEventListener("click", () => { rateIndex = Math.min(rates.length - 1, rateIndex + 1); saveRate(); });
  $("#voice-toggle").addEventListener("click", () => { voiceEnabled = !voiceEnabled; $("#voice-toggle").setAttribute("aria-pressed", String(voiceEnabled)); $("#voice-toggle").textContent = voiceEnabled ? "🔊 Voix active" : "🔇 Voix coupée"; if (!voiceEnabled) stopSpeech(); });
  $("#refs-toggle").addEventListener("click", () => { const expanded = $("#refs-toggle").getAttribute("aria-expanded") === "true"; $("#refs-toggle").setAttribute("aria-expanded", String(!expanded)); $("#refs").hidden = expanded; if (!expanded) $("#refs").scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("#restart").addEventListener("click", () => { stopSpeech(); current = 0; furthest = 0; autoplay = true; quizIndex = 0; score = 0; answered = false; protocolChecked = new Set(); enterCourseMode(); render(); });
  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    const interactive = ["INPUT", "SELECT", "BUTTON", "A"].includes(tag);
    if (event.key === "Escape" && (document.body.classList.contains("course-running") || document.body.classList.contains("summary-running"))) exitCourseMode();
    else if (!interactive && event.key === "ArrowRight" && document.body.classList.contains("course-running") && current < lessons.length - 1) goTo(current + 1, autoplay);
    else if (!interactive && event.key === "ArrowLeft" && document.body.classList.contains("course-running") && current > 0) goTo(current - 1, autoplay);
    else if (!interactive && event.code === "Space" && document.body.classList.contains("course-running")) { event.preventDefault(); toggleSpeech(); }
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopSpeech(); });
  window.addEventListener("pagehide", stopSpeech);
})();
