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
  let selectedVoice = null;
  let rateIndex = 1;
  let quizIndex = 0;
  let score = 0;
  let answered = false;
  let reverseMode = "evap";
  let reversePressure = 0.199;
  let pressureSide = "evap";
  let directionMode = "evap";
  let measureMode = "superheat";

  const rates = [0.8, 0.95, 1.1, 1.25];
  const WATER = [
    { p: 0.0123, t: 10 },
    { p: 0.0234, t: 20 },
    { p: 0.0317, t: 25 },
    { p: 0.0738, t: 40 },
    { p: 0.199, t: 60 },
    { p: 0.474, t: 80 },
    { p: 1.013, t: 100 },
  ];
  const R134A =
    window.FLUIDES && window.FLUIDES.R134a
      ? window.FLUIDES.R134a.table
      : [
          { t: -20, p: 1.327 },
          { t: -10, p: 2.006 },
          { t: 0, p: 2.928 },
          { t: 10, p: 4.146 },
          { t: 20, p: 5.717 },
          { t: 30, p: 7.702 },
          { t: 40, p: 10.166 },
          { t: 50, p: 13.179 },
        ];
  const R407C_GLIDE = window.FLUIDES && window.FLUIDES.R407C ? window.FLUIDES.R407C.glide : 6.1;

  const lessons = [
    {
      short: "Prévoir",
      kicker: "Étape 1 · Commencer par une surprise",
      title: "De l’eau tiède, aucune flamme… peut-elle bouillir ?",
      text: "Placez-vous avant l’expérience. Une pompe retire progressivement l’air sous la cloche. Choisissez ce que vous pensez observer.",
      speak:
        "Nous plaçons un verre d’eau à température ambiante sous une cloche transparente. Il n’y a ni plaque chauffante, ni résistance. La pompe va simplement retirer une partie de l’air. Avant de regarder, faites une prévision. Les bulles ont-elles besoin d’une flamme, ou la pression peut-elle suffire à déclencher l’ébullition ?",
      render: predictionMarkup,
    },
    {
      short: "Faire le vide",
      kicker: "Étape 2 · Faire bouillir sans chauffer",
      title: "La pompe baisse la pression. L’eau finit par bouillir.",
      text: "Actionnez la pompe. Surveillez simultanément la pression absolue, les bulles, la température de l’eau et sa réserve d’énergie.",
      speak:
        "Au départ, l’eau est à vingt-cinq degrés et la pression est proche de la pression atmosphérique. La pompe retire de l’air, mais l’eau ne bout pas encore. Quand la pression descend vers zéro virgule zéro trois bar absolu, des bulles apparaissent. La pression est devenue assez faible pour que l’eau puisse bouillir à sa température actuelle. Si nous tirons davantage au vide, l’ébullition consomme de l’énergie. Comme aucune résistance n’en fournit, l’eau la prend dans sa propre réserve et se refroidit. Sans chauffage ne signifie donc pas sans énergie.",
      voiceSteps: [
        {
          control: "#vacuum-slider",
          value: 0,
          text: "Au départ, l’eau est à vingt-cinq degrés et la pression est proche de la pression atmosphérique. Il n’y a aucune flamme.",
        },
        {
          control: "#vacuum-slider",
          value: 72,
          text: "La pompe retire de l’air. La pression baisse fortement, mais elle est encore trop élevée pour que cette eau à vingt-cinq degrés se mette à bouillir.",
        },
        {
          control: "#vacuum-slider",
          value: 89,
          text: "Vers zéro virgule zéro trois bar absolu, les premières bulles apparaissent. L’eau peut maintenant bouillir à sa température actuelle.",
        },
        {
          control: "#vacuum-slider",
          value: 100,
          text: "En tirant davantage au vide, l’ébullition consomme de la chaleur latente. Sans résistance, l’eau prend cette énergie dans sa propre réserve et se refroidit.",
        },
      ],
      render: vacuumMarkup,
    },
    {
      short: "Expliquer",
      kicker: "Étape 3 · Comprendre la condition d’ébullition",
      title: "Les molécules poussent de l’intérieur. La pression résiste de l’extérieur.",
      text: "Déroulez les trois moments. L’ébullition commence lorsque la pression de vapeur du liquide peut équilibrer la pression qui s’exerce sur lui.",
      speak:
        "Dans le liquide, les molécules bougent et certaines cherchent à former de la vapeur. Cette vapeur exerce une pression propre, appelée pression de vapeur. Au-dessus du liquide, la pression extérieure s’oppose à la formation durable des bulles. La pompe affaiblit cette opposition. Quand la pression de vapeur du liquide atteint la pression extérieure, les bulles peuvent se développer dans tout le volume : l’ébullition commence. Il n’est donc pas nécessaire d’ajouter de la chaleur si l’on déplace la condition d’ébullition en abaissant la pression.",
      render: causeMarkup,
    },
    {
      short: "Relier",
      kicker: "Étape 4 · Construire la relation pression–température",
      title: "À chaque pression correspond une température de saturation.",
      text: "Faites varier la pression absolue de l’eau. Le point se déplace sur une courbe : la relation n’est pas une règle de trois, mais elle est toujours croissante.",
      speak:
        "À environ un bar absolu, l’eau bout vers cent degrés. Si la pression descend, sa température de saturation descend aussi. Vers zéro virgule quarante-sept bar, elle est proche de quatre-vingts degrés. Vers zéro virgule vingt bar, elle est proche de soixante degrés. Et vers zéro virgule zéro deux bar, elle approche vingt degrés. La courbe n’est pas une droite, mais son sens ne change jamais : pression plus basse, température de saturation plus basse.",
      voiceSteps: [
        { control: "#water-pressure-slider", value: 100, text: "À environ un bar absolu, l’eau bout vers cent degrés." },
        { control: "#water-pressure-slider", value: 80, text: "En abaissant la pression vers zéro virgule quarante-sept bar, la saturation descend près de quatre-vingts degrés." },
        { control: "#water-pressure-slider", value: 55, text: "Vers zéro virgule vingt bar absolu, l’eau peut bouillir près de soixante degrés." },
        { control: "#water-pressure-slider", value: 0, text: "Près de zéro virgule zéro deux bar absolu, la saturation approche vingt degrés. Pression plus basse signifie saturation plus basse." },
      ],
      render: ptCurveMarkup,
    },
    {
      short: "Inverser",
      kicker: "Étape 5 · Parcourir la même frontière dans les deux sens",
      title: "Bouillir ou condenser : même pression, même température limite.",
      text: "Choisissez une pression puis inversez le sens. Pour un fluide pur, la température de saturation est la même ; seul le sens du transfert d’énergie change.",
      speak:
        "Prenons un fluide pur à une pression donnée. Si le liquide reçoit de l’énergie à sa température de saturation, il se vaporise. Si la vapeur cède de l’énergie à cette même pression et à cette même température limite, elle se condense. Ce ne sont pas deux lois différentes. C’est la même frontière liquide-vapeur, parcourue dans un sens dans l’évaporateur et dans l’autre sens dans le condenseur.",
      render: reverseMarkup,
    },
    {
      short: "Piloter",
      kicker: "Étape 6 · Donner une température aux deux côtés du circuit",
      title: "Basse pression dedans. Haute pression dehors.",
      text: "Explorez les deux échangeurs. Pour absorber l’énergie, le fluide doit saturer plus froid que le local. Pour la rejeter, il doit saturer plus chaud que l’extérieur.",
      speak:
        "Dans l’évaporateur, la machine maintient une basse pression. La température de saturation devient plus basse que celle du local, donc l’énergie peut aller du local vers le fluide. Dans le condenseur, le compresseur permet d’obtenir une pression plus élevée. La température de saturation devient plus haute que celle de l’air extérieur, donc l’énergie peut quitter le fluide. Le circuit ne crée pas du froid : il place deux températures de changement d’état de part et d’autre des milieux à échanger.",
      voiceSteps: [
        {
          side: "evap",
          text: "Dans l’évaporateur, la basse pression place la température de saturation sous la température du local. L’énergie peut entrer dans le fluide.",
        },
        {
          side: "cond",
          text: "Dans le condenseur, la haute pression place la température de saturation au-dessus de la température extérieure. L’énergie peut sortir du fluide.",
        },
      ],
      render: circuitPressureMarkup,
    },
    {
      short: "Traduire",
      kicker: "Étape 7 · Passer du manomètre à la température",
      title: "La pression est un message. La table le traduit en température.",
      text: "Déplacez le manomètre sur l’exemple R‑134a. On convertit d’abord la pression relative en pression absolue, puis on lit la température de saturation.",
      speak:
        "Le manomètre ne donne pas directement une température. Il donne généralement une pression relative. Dans cette simulation, nous ajoutons environ un bar pour obtenir la pression absolue demandée par la table. La table du fluide traduit ensuite cette pression en température de saturation. Avec du R cent-trente-quatre a, environ un bar relatif correspond à deux bars absolus et à une saturation proche de moins dix degrés. En haute pression, environ neuf virgule deux bars relatifs correspondent à dix virgule deux bars absolus et à une saturation proche de quarante degrés. Toujours vérifier l’unité et le type de pression de la documentation utilisée.",
      voiceSteps: [
        {
          control: "#translator-slider",
          value: 1,
          text: "Sur cet exemple R cent-trente-quatre a, le manomètre indique environ un bar relatif.",
        },
        {
          control: "#translator-slider",
          value: 1,
          text: "Nous ajoutons environ un bar atmosphérique : la table reçoit près de deux bars absolus et annonce une saturation proche de moins dix degrés.",
        },
        {
          control: "#translator-slider",
          value: 9.2,
          text: "À environ neuf virgule deux bars relatifs, nous obtenons près de dix virgule deux bars absolus et une saturation proche de quarante degrés.",
        },
      ],
      render: translatorMarkup,
    },
    {
      short: "Comparer",
      kicker: "Étape 8 · Découvrir l’exception zéotrope",
      title: "Pression constante ne signifie pas toujours température constante.",
      text: "Vaporisez côte à côte un fluide pur et un mélange zéotrope. Le premier reste sur un palier ; la température du second glisse.",
      speak:
        "Pour un fluide pur, à pression constante, la température reste stable pendant tout le changement d’état. Pour un mélange zéotrope, les composants ne s’évaporent pas exactement ensemble. À la même pression constante, la première bulle apparaît à la température de bulle, puis la température monte progressivement jusqu’à la température de rosée, quand la dernière goutte disparaît. Cet écart est le glissement. Sur notre exemple pédagogique inspiré du R quatre-cent-sept C, il vaut environ six kelvins.",
      voiceSteps: [
        { control: "#glide-slider", value: 0, text: "Au départ de la vaporisation, le fluide pur et le zéotrope sont au point de bulle." },
        { control: "#glide-slider", value: 50, text: "À pression constante, le fluide pur reste à la même température. Le zéotrope, lui, monte progressivement en température." },
        { control: "#glide-slider", value: 100, text: "À la dernière goutte, le zéotrope atteint son point de rosée. L’écart bulle-rosée est le glissement." },
      ],
      render: glideMarkup,
    },
    {
      short: "Parcourir",
      kicker: "Étape 9 · Ne plus confondre bulle et rosée",
      title: "Les deux points gardent leur nom. C’est le sens du voyage qui change.",
      text: "Basculez entre évaporation et condensation, puis déplacez le fluide. Observez quel point ouvre et quel point ferme la transformation.",
      speak:
        "En évaporation, le liquide atteint d’abord le point de bulle : la première bulle apparaît. Puis la température monte jusqu’au point de rosée, où la dernière goutte disparaît. En condensation, on parcourt le chemin en sens inverse. La vapeur atteint d’abord le point de rosée : la première goutte apparaît. Puis la température descend jusqu’au point de bulle, où la dernière bulle disparaît. Les noms décrivent les deux frontières, pas l’ordre dans lequel on les rencontre.",
      voiceSteps: [
        { direction: "evap", control: "#direction-slider", value: 0, text: "En évaporation, nous partons du liquide." },
        { direction: "evap", control: "#direction-slider", value: 25, text: "Au point de bulle, la première bulle apparaît et la transformation commence." },
        { direction: "evap", control: "#direction-slider", value: 75, text: "Au point de rosée, la dernière goutte disparaît et la vaporisation est terminée." },
        { direction: "cond", control: "#direction-slider", value: 25, text: "En condensation, nous parcourons les mêmes limites en sens inverse : le point de rosée donne maintenant la première goutte." },
        { direction: "cond", control: "#direction-slider", value: 75, text: "Le point de bulle marque alors la disparition de la dernière bulle et la fin de la liquéfaction." },
      ],
      render: directionMarkup,
    },
    {
      short: "Mesurer",
      kicker: "Étape 10 · Choisir la bonne colonne de saturation",
      title: "Surchauffe : rosée. Sous-refroidissement : bulle.",
      text: "Choisissez la mesure puis la température de référence. Avec un zéotrope, utiliser la mauvaise limite fausse directement le résultat.",
      speak:
        "La surchauffe concerne de la vapeur seule, juste après la disparition de la dernière goutte. Sa référence est donc la température de rosée. Le sous-refroidissement concerne du liquide seul, juste après la disparition de la dernière bulle. Sa référence est donc la température de bulle. Sur un fluide pur, les deux valeurs coïncident. Sur un zéotrope, il faut choisir la bonne colonne.",
      render: measureMarkup,
    },
    {
      short: "Régler",
      kicker: "Étape 11 · Mission frigoriste",
      title: "Placez les deux températures de saturation au bon endroit.",
      text: "Réglez les pressions de l’exemple R‑134a. L’évaporateur doit rester au moins 5 K sous le local et le condenseur au moins 5 K au-dessus de l’extérieur.",
      speak:
        "Voici une mission de raisonnement, pas une valeur universelle de réglage. Le local est à quatre degrés et l’air extérieur à trente degrés. Abaissez la pression d’évaporation jusqu’à obtenir une saturation au moins cinq kelvins sous le local. Augmentez la pression de condensation jusqu’à obtenir une saturation au moins cinq kelvins au-dessus de l’extérieur. Quand les deux écarts sont dans le bon sens, l’énergie peut entrer dans le fluide dedans, puis en sortir dehors.",
      render: missionMarkup,
    },
    {
      short: "Valider",
      kicker: "Étape 12 · Défi pression–température",
      title: "Racontez maintenant ce que la pression change réellement.",
      text: "Neuf situations vérifient l’expérience sous vide, la saturation, le circuit frigorifique et le glissement des zéotropes.",
      speak:
        "Dernière étape. Vous n’avez pas à mémoriser une courbe entière. Vous devez pouvoir expliquer pourquoi l’eau bout sous vide, comment la basse et la haute pression donnent leurs températures aux échangeurs, et pourquoi un zéotrope possède deux températures de saturation à une même pression.",
      zoneClass: "quiz-zone",
      render: quizMarkup,
    },
  ];

  const questions = [
    {
      q: "Pourquoi de l’eau tiède peut-elle bouillir sous une cloche à vide ?",
      answers: ["La baisse de pression abaisse sa température d’ébullition", "La pompe fabrique de la chaleur", "Le vide supprime le besoin d’énergie"],
      correct: 0,
      why: "La pompe déplace la condition de saturation : à pression plus basse, l’eau peut bouillir à plus basse température.",
    },
    {
      q: "Sans résistance chauffante, d’où vient l’énergie nécessaire à la vaporisation ?",
      answers: ["Uniquement de la pompe", "De l’eau elle-même et de son environnement", "De nulle part"],
      correct: 1,
      why: "La chaleur latente est prélevée dans l’eau et son environnement ; l’eau se refroidit.",
    },
    {
      q: "Si la pression d’un fluide pur diminue, sa température de saturation…",
      answers: ["augmente toujours", "ne dépend jamais de la pression", "diminue"],
      correct: 2,
      why: "Pression plus basse signifie température de saturation plus basse.",
    },
    {
      q: "À une pression donnée, un fluide pur bout et condense…",
      answers: ["à deux températures sans rapport", "à la même température de saturation", "uniquement à 100 °C"],
      correct: 1,
      why: "Évaporation et condensation parcourent la même frontière liquide-vapeur dans des sens opposés.",
    },
    {
      q: "Pourquoi maintient-on une basse pression dans l’évaporateur ?",
      answers: ["Pour saturer plus froid que le local", "Pour chauffer le local", "Pour empêcher toute vaporisation"],
      correct: 0,
      why: "La saturation doit être plus froide que le milieu afin que l’énergie entre dans le fluide.",
    },
    {
      q: "Pourquoi le condenseur fonctionne-t-il à une pression plus élevée ?",
      answers: ["Pour produire du vide dehors", "Pour saturer plus chaud que l’extérieur", "Pour supprimer le transfert d’énergie"],
      correct: 1,
      why: "Le fluide doit être plus chaud que le milieu extérieur pour lui céder son énergie.",
    },
    {
      q: "Que fait une table pression–température ?",
      answers: ["Elle remplace le manomètre", "Elle mesure directement la température du tube", "Elle traduit une pression en température de saturation"],
      correct: 2,
      why: "Le manomètre mesure la pression ; la table du fluide donne la température de saturation correspondante.",
    },
    {
      q: "À pression constante, que fait la température d’un zéotrope pendant son changement d’état ?",
      answers: ["Elle est toujours strictement constante", "Elle glisse entre bulle et rosée", "Elle disparaît"],
      correct: 1,
      why: "Les composants ne changent pas d’état ensemble : la température évolue pendant la zone diphasique.",
    },
    {
      q: "Quelles références utilise-t-on avec un zéotrope ?",
      answers: ["Rosée pour la surchauffe, bulle pour le sous-refroidissement", "Bulle pour les deux", "Rosée pour les deux"],
      correct: 0,
      why: "La vapeur seule se réfère à la rosée ; le liquide seul se réfère à la bulle.",
    },
  ];

  function predictionMarkup() {
    return `
      <div class="prediction-lab">
        <div class="prediction-scene" aria-label="Verre d’eau sous une cloche reliée à une pompe">
          <div class="prediction-bell"><div class="prediction-cup"></div></div>
          <div class="prediction-pump">POMPE À VIDE</div>
        </div>
        <div class="prediction-copy">
          <h3>Que va faire l’eau lorsque la pression baissera ?</h3>
          <div class="prediction-options">
            <button class="choice-button" data-prediction="warm" type="button">Elle va chauffer jusqu’à 100 °C.</button>
            <button class="choice-button" data-prediction="boil" type="button">Elle va se mettre à bouillir sans atteindre 100 °C.</button>
            <button class="choice-button" data-prediction="nothing" type="button">Rien : sans flamme, bouillir est impossible.</button>
          </div>
          <p class="feedback" id="prediction-feedback" role="status">Choisissez avant de lancer l’expérience.</p>
        </div>
      </div>`;
  }

  function vacuumMarkup() {
    return `
      <div class="vacuum-lab">
        <div class="bell-chamber" id="bell-chamber">
          <span class="chamber-pressure" id="chamber-pressure">1,013 bar abs</span>
          <span class="chamber-temp" id="chamber-temp">25,0 °C</span>
          <div class="lab-bell">
            <div class="lab-cup">
              <div class="lab-water"></div>
              <div class="lab-bubbles"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <div class="pump-hose"></div><div class="pump-box">POMPE</div>
        </div>
        <div class="vacuum-panel">
          <span class="graph-type sensible" id="vacuum-type">AVANT L’ÉBULLITION</span>
          <h3 id="vacuum-title">La pression baisse, l’eau reste calme</h3>
          <div class="readout-grid">
            <span>Pression absolue<b id="vacuum-pressure">1,013 bar</b></span>
            <span>Température de l’eau<b id="vacuum-temperature">25,0 °C</b></span>
          </div>
          <label for="vacuum-slider">Actionner la pompe : <b id="vacuum-label">0 % de vide pédagogique</b></label>
          <input id="vacuum-slider" type="range" min="0" max="100" value="0">
          <span>Réserve d’énergie thermique de l’eau</span>
          <div class="vacuum-energy"><i id="vacuum-energy"></i></div>
          <p class="energy-caption" id="vacuum-copy">La pression est encore trop élevée pour une eau à 25 °C.</p>
        </div>
      </div>`;
  }

  function causeMarkup() {
    return `
      <div class="cause-lab">
        <div class="molecule-stage" id="molecule-stage" aria-label="Équilibre entre pression de vapeur et pression extérieure">
          <div class="external-pressure"><b>↓</b><b>↓</b><b>↓</b><b>↓</b></div>
          <div class="molecule-vapor"><i></i><i></i><i></i></div>
          <div class="molecule-liquid"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <div class="cause-panel">
          <span class="graph-type sensible" id="cause-type">1 · DANS LE LIQUIDE</span>
          <h3 id="cause-title">Les molécules sont déjà en mouvement</h3>
          <p id="cause-copy">Même sans bouillir, certaines molécules quittent la surface et créent une pression de vapeur.</p>
          <button class="cause-step active" data-cause="move" type="button">1 · Le liquide pousse de l’intérieur</button>
          <button class="cause-step" data-cause="release" type="button">2 · La pompe affaiblit la pression extérieure</button>
          <button class="cause-step" data-cause="boil" type="button">3 · Les bulles peuvent se développer</button>
        </div>
      </div>`;
  }

  function ptCurveMarkup() {
    return `
      <div class="pt-lab">
        <div class="pt-chart-card">
          <canvas id="pt-canvas" width="540" height="300" role="img" aria-label="Courbe de saturation de l’eau : la température augmente avec la pression absolue"></canvas>
          <div class="pt-control">
            <label for="water-pressure-slider">Choisir la pression absolue : <b id="water-pressure-label">1,013 bar</b></label>
            <input id="water-pressure-slider" type="range" min="0" max="100" value="100">
          </div>
        </div>
        <aside class="pt-panel">
          <span class="graph-type sensible">UNE PAIRE INDISSOCIABLE</span>
          <h3>Pression ↔ température de saturation</h3>
          <div class="pt-pair">
            <span>Pression absolue<b id="pt-pressure">1,013 bar</b></span>
            <span>Température de saturation<b id="pt-temperature">100,0 °C</b></span>
          </div>
          <div class="water-landmarks">
            <span>≈ 1,013 bar abs<b>≈ 100 °C</b></span>
            <span>≈ 0,474 bar abs<b>≈ 80 °C</b></span>
            <span>≈ 0,199 bar abs<b>≈ 60 °C</b></span>
            <span>≈ 0,023 bar abs<b>≈ 20 °C</b></span>
          </div>
          <p class="simulation-note">Valeurs arrondies issues des tables de saturation de l’eau.</p>
        </aside>
      </div>`;
  }

  function reverseMarkup() {
    return `
      <div class="reverse-lab">
        <div class="mode-switch" role="group" aria-label="Sens du changement d’état">
          <button class="mode-button active" data-reverse-mode="evap" type="button">Évaporation · le fluide reçoit</button>
          <button class="mode-button" data-reverse-mode="cond" type="button">Condensation · le fluide cède</button>
        </div>
        <div class="mode-switch" role="group" aria-label="Pression absolue choisie">
          <button class="mode-button" data-reverse-pressure="1.013" type="button">1,013 bar</button>
          <button class="mode-button" data-reverse-pressure="0.474" type="button">0,474 bar</button>
          <button class="mode-button active" data-reverse-pressure="0.199" type="button">0,199 bar</button>
        </div>
        <div class="reverse-stage">
          <div class="reverse-vessel" id="reverse-vessel">
            <div class="reverse-liquid"></div>
            <div class="reverse-particles"><i></i><i></i><i></i></div>
          </div>
          <div class="reverse-arrow" id="reverse-arrow">→</div>
          <div class="reverse-copy">
            <span class="graph-type latent" id="reverse-type">VAPORISATION</span>
            <h3 id="reverse-title">À 0,199 bar : environ 60 °C</h3>
            <p id="reverse-copy">Le liquide reçoit de l’énergie et devient vapeur à sa température de saturation.</p>
            <p class="same-boundary"><strong>Même frontière :</strong> <span id="reverse-rule">la vapeur condenserait aussi vers 60 °C à cette pression.</span></p>
          </div>
        </div>
      </div>`;
  }

  function circuitPressureMarkup() {
    return `
      <div class="circuit-pressure">
        <div class="pressure-side-switch" role="group" aria-label="Choisir le côté du circuit">
          <button class="mode-button active" data-pressure-side="evap" type="button">1 · Basse pression · évaporateur</button>
          <button class="mode-button" data-pressure-side="cond" type="button">2 · Haute pression · condenseur</button>
        </div>
        <div class="pressure-stage">
          <article class="pressure-environment">
            <small id="side-environment-kicker">DEDANS</small>
            <strong id="side-environment-title">Local à +4 °C</strong>
            <span id="side-environment-copy">Il doit céder de l’énergie.</span>
          </article>
          <div class="pressure-transfer" id="side-arrow">→</div>
          <article class="pressure-exchanger">
            <small id="side-pressure-kicker">BASSE PRESSION</small>
            <h3 id="side-exchanger-title">Évaporateur</h3>
            <p id="side-exchanger-copy">Exemple R‑134a : vers 2 bar absolus, la saturation est proche de −10 °C.</p>
          </article>
        </div>
        <div class="condition-strip">
          <span id="side-left-condition">Local : +4 °C</span><i>doit être</i><strong id="side-main-condition">plus chaud que le fluide : −10 °C</strong>
        </div>
        <p class="pressure-note" id="side-conclusion"><strong>Conséquence :</strong> l’énergie va du local vers le fluide, qui se vaporise.</p>
      </div>`;
  }

  function translatorMarkup() {
    return `
      <div class="translator-lab">
        <div class="translator-control">
          <span class="graph-type sensible">EXEMPLE R‑134a</span>
          <h3>Faites bouger le manomètre</h3>
          <label for="translator-slider">Pression lue au manomètre : <b id="translator-relative">1,0 bar relatif</b></label>
          <input id="translator-slider" type="range" min="0" max="12.1" step="0.1" value="1">
          <div class="translator-chain">
            <span>manomètre<br><b id="chain-relative">1,0 bar rel.</b></span><i>+</i>
            <span>atmosphère<br><b>≈ 1,0 bar</b></span><i>→</i>
            <strong>table<br><b id="chain-absolute">≈ 2,0 bar abs.</b></strong>
          </div>
          <p class="simulation-note">Toujours vérifier si la table utilisée demande une pression relative ou absolue.</p>
        </div>
        <div class="translator-result">
          <span class="graph-type latent">LA TABLE TRADUIT</span>
          <h3 id="translator-title">Environ 2,0 bar absolus → −10 °C</h3>
          <div class="table-window" aria-label="Extrait simplifié de table pression température R-134a">
            <span>Pression absolue</span><span>Température de saturation</span>
            <span>1,327 bar</span><span>−20 °C</span>
            <span class="selected" id="table-pressure">≈ 2,0 bar</span><span class="selected" id="table-temperature">≈ −10,0 °C</span>
            <span>10,166 bar</span><span>40 °C</span>
          </div>
          <p id="translator-copy">La température de saturation n’est pas mesurée par le manomètre : elle est déduite grâce aux propriétés du fluide présent.</p>
        </div>
      </div>`;
  }

  function glideMarkup() {
    return `
      <div class="glide-lab">
        <div class="glide-comparison">
          <article class="glide-card pure">
            <small>FLUIDE PUR · PRESSION CONSTANTE</small>
            <h3>Un palier horizontal</h3>
            <p>La température de bulle et la température de rosée coïncident.</p>
            <div class="phase-temperature">
              <i class="pure-line"></i><i class="phase-marker" id="pure-marker"></i>
            </div>
            <div class="phase-points"><span>première bulle</span><span>dernière goutte</span></div>
            <div class="glide-readout"><span>Température<b id="pure-temperature">−10,0 °C</b></span><span>Glissement<b>0 K</b></span></div>
          </article>
          <article class="glide-card zeotrope">
            <small>ZÉOTROPE · PRESSION CONSTANTE</small>
            <h3>Une rampe de température</h3>
            <p>Les composants ne se vaporisent pas exactement au même moment.</p>
            <div class="phase-temperature">
              <i class="glide-line"></i><i class="phase-marker" id="zeotrope-marker"></i>
            </div>
            <div class="phase-points"><span>bulle : −10 °C</span><span>rosée : −3,9 °C</span></div>
            <div class="glide-readout"><span>Température<b id="zeotrope-temperature">−10,0 °C</b></span><span>Glissement<b>≈ ${formatNumber(R407C_GLIDE, 1)} K</b></span></div>
          </article>
        </div>
        <div class="glide-control">
          <label for="glide-slider">Faire avancer la vaporisation : <b id="glide-label">première bulle</b></label>
          <input id="glide-slider" type="range" min="0" max="100" value="0">
          <p class="pressure-note" id="glide-conclusion"><strong>Au départ :</strong> les deux fluides sont au point de bulle. La différence apparaîtra pendant la transformation.</p>
        </div>
      </div>`;
  }

  function directionMarkup() {
    return `
      <div class="direction-lab">
        <div class="mode-switch" role="group" aria-label="Choisir le sens du changement d’état">
          <button class="mode-button active" data-direction="evap" type="button">Évaporation →</button>
          <button class="mode-button" data-direction="cond" type="button">← Condensation</button>
        </div>
        <div class="direction-track" id="direction-track">
          ${Array.from({ length: 5 }, (_, index) => `<article id="direction-step-${index}"><small></small><strong></strong><span></span></article>`).join("")}
        </div>
        <div class="direction-control">
          <div>
            <label for="direction-slider">Parcourir la transformation : <b id="direction-label">départ liquide</b></label>
            <input id="direction-slider" type="range" min="0" max="100" value="0">
          </div>
          <p class="direction-copy" id="direction-copy"><strong>Évaporation :</strong> bulle ouvre la transformation ; rosée la ferme.</p>
        </div>
      </div>`;
  }

  function measureMarkup() {
    return `
      <div class="measure-lab">
        <div class="measure-question">
          <div class="mode-switch" role="group" aria-label="Choisir la mesure">
            <button class="mode-button active" data-measure-mode="superheat" type="button">Surchauffe</button>
            <button class="mode-button" data-measure-mode="subcool" type="button">Sous-refroidissement</button>
          </div>
          <h3 id="measure-question">Quelle température de saturation faut-il utiliser ?</h3>
          <p id="measure-context">Nous mesurons une vapeur seule après la disparition de la dernière goutte.</p>
          <div class="measure-options">
            <button class="choice-button" data-measure-answer="dew" type="button">Température de rosée</button>
            <button class="choice-button" data-measure-answer="bubble" type="button">Température de bulle</button>
          </div>
          <p class="feedback" id="measure-feedback" role="status">Choisissez la frontière correspondant à l’état mesuré.</p>
        </div>
        <div class="measure-diagram">
          <span class="graph-type sensible" id="measure-type">VAPEUR SEULE</span>
          <h3 id="measure-title">Surchauffe = température réelle − rosée</h3>
          <div class="measure-equation">
            <span>Température du tube<br><b>réelle</b></span><i>−</i>
            <span>Température de saturation<br><b id="measure-reference">rosée</b></span><i>=</i>
            <strong id="measure-result-name">surchauffe</strong>
          </div>
          <p class="same-boundary" id="measure-rule"><strong>Pourquoi ?</strong> La rosée est la frontière de la vapeur saturée, juste avant la vapeur surchauffée.</p>
        </div>
      </div>`;
  }

  function missionMarkup() {
    return `
      <div class="mission-lab">
        <article class="mission-card" id="low-mission">
          <span class="graph-type sensible">ÉVAPORATEUR · LOCAL À +4 °C</span>
          <h3>Créer une saturation suffisamment froide</h3>
          <p>Objectif pédagogique : température de saturation ≤ −1 °C.</p>
          <div class="mission-readout">
            <span>Pression absolue<b id="low-pressure-value">3,0 bar</b></span>
            <span>Saturation R‑134a<b id="low-temperature-value">0,6 °C</b></span>
          </div>
          <div class="mission-control">
            <label for="low-pressure-slider">Régler la basse pression</label>
            <input id="low-pressure-slider" type="range" min="13" max="41" value="30">
          </div>
        </article>
        <article class="mission-card" id="high-mission">
          <span class="graph-type latent">CONDENSEUR · EXTÉRIEUR À +30 °C</span>
          <h3>Créer une saturation suffisamment chaude</h3>
          <p>Objectif pédagogique : température de saturation ≥ +35 °C.</p>
          <div class="mission-readout">
            <span>Pression absolue<b id="high-pressure-value">8,5 bar</b></span>
            <span>Saturation R‑134a<b id="high-temperature-value">33,2 °C</b></span>
          </div>
          <div class="mission-control">
            <label for="high-pressure-slider">Régler la haute pression</label>
            <input id="high-pressure-slider" type="range" min="77" max="132" value="85">
          </div>
        </article>
        <p class="mission-result" id="mission-result"><strong>Mission en cours :</strong> créez un écart suffisant des deux côtés pour permettre les transferts d’énergie.</p>
      </div>`;
  }

  function quizMarkup() {
    if (quizIndex >= questions.length) {
      const success = score >= 7;
      return `
        <div class="quiz-result">
          <h3>${success ? "Vous savez donner une température à une pression." : "La relation mérite encore un passage."}</h3>
          <b>${score}/${questions.length}</b>
          <span class="result-rule">${success ? "Bases acquises" : "Objectif : au moins 7 réponses justes sur 9"}</span>
          <p>${success
            ? "Vous savez expliquer l’ébullition sous vide, placer les saturations du circuit et distinguer bulle, rosée et glissement."
            : "Reprenez la cloche à vide, les deux côtés du circuit et le sens bulle–rosée, puis rejouez le défi."}</p>
          <button class="nav" id="quiz-restart" type="button">Refaire le défi</button>
        </div>`;
    }

    const question = questions[quizIndex];
    return `
      <div class="quiz-wrap">
        <div class="quiz-head"><strong>Question ${quizIndex + 1} sur ${questions.length}</strong><span>Score : ${score}</span></div>
        <div class="quiz-progress" aria-label="Progression : question ${quizIndex + 1} sur ${questions.length}">
          ${questions.map((_, index) => `<i class="${index < quizIndex ? "done" : index === quizIndex ? "current" : ""}"></i>`).join("")}
        </div>
        <p class="quiz-question">${question.q}</p>
        <div class="quiz-options">
          ${question.answers.map((answer, index) => `<button class="quiz-option" data-answer="${index}" type="button">${answer}</button>`).join("")}
        </div>
        <p class="quiz-feedback" id="quiz-feedback" role="status">Choisissez une réponse.</p>
      </div>`;
  }

  function formatNumber(value, digits = 1) {
    return Number(value).toLocaleString("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function interpolateByPressure(table, pressure) {
    if (pressure <= table[0].p) return table[0].t;
    if (pressure >= table[table.length - 1].p) return table[table.length - 1].t;
    for (let index = 0; index < table.length - 1; index += 1) {
      const a = table[index];
      const b = table[index + 1];
      if (pressure >= a.p && pressure <= b.p) {
        const ratio = (pressure - a.p) / (b.p - a.p);
        return a.t + ratio * (b.t - a.t);
      }
    }
    return table[0].t;
  }

  function waterSaturation(pressure) {
    if (pressure <= WATER[0].p) return WATER[0].t;
    if (pressure >= WATER[WATER.length - 1].p) return WATER[WATER.length - 1].t;
    for (let index = 0; index < WATER.length - 1; index += 1) {
      const a = WATER[index];
      const b = WATER[index + 1];
      if (pressure >= a.p && pressure <= b.p) {
        const ratio = (Math.log(pressure) - Math.log(a.p)) / (Math.log(b.p) - Math.log(a.p));
        return a.t + ratio * (b.t - a.t);
      }
    }
    return 25;
  }

  function pressureFromPercent(percent) {
    const min = Math.log(0.0234);
    const max = Math.log(1.013);
    return Math.exp(min + (max - min) * (percent / 100));
  }

  function vacuumPressure(level) {
    return Math.exp(Math.log(1.013) + (Math.log(0.02) - Math.log(1.013)) * (level / 100));
  }

  function buildStepper() {
    $("#stepper").innerHTML = lessons
      .map((lesson, index) => `<button type="button" data-step="${index}"><b>${String(index + 1).padStart(2, "0")}</b><span>${lesson.short}</span></button>`)
      .join("");
    document.querySelectorAll("[data-step]").forEach((button) => {
      button.addEventListener("click", () => goTo(Number(button.dataset.step), false));
    });
  }

  function updateStepper() {
    document.querySelectorAll("[data-step]").forEach((button, index) => {
      button.classList.toggle("active", index === current);
      button.classList.toggle("done", index < furthest);
    });
  }

  function render() {
    const lesson = lessons[current];
    $("#kicker").textContent = lesson.kicker;
    $("#title").textContent = lesson.title;
    $("#lesson-text").textContent = lesson.text;
    $("#zone").className = `interactive-zone pressure-zone${lesson.zoneClass ? ` ${lesson.zoneClass}` : ""}`;
    $("#zone").innerHTML = lesson.render();
    $("#status").textContent = `Étape ${current + 1} sur ${lessons.length}${autoplay ? " · parcours raconté" : ""}`;
    $("#prev").disabled = current === 0;
    updateCourseNavigation();
    updateStepper();
    wireCurrentActivity();
    updateListenButton();
  }

  function updateCourseNavigation() {
    const onQuiz = current === lessons.length - 1;
    const quizComplete = quizIndex >= questions.length;
    $("#next").disabled = onQuiz && !quizComplete;
    $("#next").textContent = onQuiz ? (quizComplete ? "Voir le bilan ↓" : "Terminez le défi") : "Continuer →";
  }

  function wireCurrentActivity() {
    document.querySelectorAll("[data-prediction]").forEach((button) => button.addEventListener("click", () => updatePrediction(button)));
    if ($("#vacuum-slider")) {
      $("#vacuum-slider").addEventListener("input", updateVacuum);
      updateVacuum();
    }
    document.querySelectorAll("[data-cause]").forEach((button) => button.addEventListener("click", () => updateCause(button.dataset.cause)));
    if ($("#water-pressure-slider")) {
      $("#water-pressure-slider").addEventListener("input", updatePTCurve);
      updatePTCurve();
    }
    document.querySelectorAll("[data-reverse-mode]").forEach((button) => button.addEventListener("click", () => {
      reverseMode = button.dataset.reverseMode;
      updateReverse();
    }));
    document.querySelectorAll("[data-reverse-pressure]").forEach((button) => button.addEventListener("click", () => {
      reversePressure = Number(button.dataset.reversePressure);
      updateReverse();
    }));
    if ($("#reverse-vessel")) updateReverse();
    document.querySelectorAll("[data-pressure-side]").forEach((button) => button.addEventListener("click", () => updatePressureSide(button.dataset.pressureSide)));
    if ($("#side-exchanger-title")) updatePressureSide(pressureSide);
    if ($("#translator-slider")) {
      $("#translator-slider").addEventListener("input", updateTranslator);
      updateTranslator();
    }
    if ($("#glide-slider")) {
      $("#glide-slider").addEventListener("input", updateGlide);
      updateGlide();
    }
    document.querySelectorAll("[data-direction]").forEach((button) => button.addEventListener("click", () => {
      directionMode = button.dataset.direction;
      $("#direction-slider").value = "0";
      updateDirection();
    }));
    if ($("#direction-slider")) {
      $("#direction-slider").addEventListener("input", updateDirection);
      updateDirection();
    }
    document.querySelectorAll("[data-measure-mode]").forEach((button) => button.addEventListener("click", () => updateMeasureMode(button.dataset.measureMode)));
    document.querySelectorAll("[data-measure-answer]").forEach((button) => button.addEventListener("click", () => answerMeasure(button)));
    if ($("#measure-question")) updateMeasureMode(measureMode);
    if ($("#low-pressure-slider")) {
      $("#low-pressure-slider").addEventListener("input", updateMission);
      $("#high-pressure-slider").addEventListener("input", updateMission);
      updateMission();
    }
    document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer))));
    if ($("#quiz-restart")) {
      $("#quiz-restart").addEventListener("click", () => {
        quizIndex = 0;
        score = 0;
        answered = false;
        $("#zone").innerHTML = quizMarkup();
        wireCurrentActivity();
        updateCourseNavigation();
      });
    }
  }

  function updatePrediction(button) {
    const correct = button.dataset.prediction === "boil";
    document.querySelectorAll("[data-prediction]").forEach((item) => {
      item.disabled = true;
      if (item.dataset.prediction === "boil") item.classList.add("good");
      else if (item === button) item.classList.add("bad");
    });
    $("#prediction-feedback").textContent = correct
      ? "✓ Bonne prévision : l’eau peut bouillir bien avant 100 °C si la pression devient assez basse."
      : "La surprise est justement là : 100 °C n’est vrai qu’autour de la pression atmosphérique. Baissez la pression à l’étape suivante.";
  }

  function updateVacuum() {
    const level = Number($("#vacuum-slider").value);
    const pressure = vacuumPressure(level);
    const boiling = pressure <= 0.0317;
    const temperature = boiling ? waterSaturation(pressure) : 25;
    const energy = boiling ? Math.max(48, 100 - (25 - temperature) * 7) : 100;
    $("#bell-chamber").classList.toggle("boiling", boiling);
    $("#chamber-pressure").textContent = `${formatNumber(pressure, pressure < 0.1 ? 3 : 2)} bar abs`;
    $("#chamber-temp").textContent = `${formatNumber(temperature, 1)} °C`;
    $("#vacuum-pressure").textContent = `${formatNumber(pressure, pressure < 0.1 ? 3 : 2)} bar`;
    $("#vacuum-temperature").textContent = `${formatNumber(temperature, 1)} °C`;
    $("#vacuum-label").textContent = `${Math.round(level)} % de vide pédagogique`;
    $("#vacuum-energy").style.width = `${energy}%`;
    $("#vacuum-type").className = `graph-type ${boiling ? "latent" : "sensible"}`;
    $("#vacuum-type").textContent = boiling ? "ÉBULLITION SOUS VIDE" : "AVANT L’ÉBULLITION";
    $("#vacuum-title").textContent = boiling ? "L’eau bout… et se refroidit" : "La pression baisse, l’eau reste calme";
    $("#vacuum-copy").innerHTML = boiling
      ? "<strong>L’énergie n’a pas disparu :</strong> la vaporisation la prélève dans l’eau, dont la température baisse."
      : "La pression est encore trop élevée pour une eau à 25 °C.";
  }

  function updateCause(mode) {
    const content = {
      move: {
        type: "1 · DANS LE LIQUIDE",
        title: "Les molécules sont déjà en mouvement",
        copy: "Même sans bouillir, certaines molécules quittent la surface et créent une pression de vapeur.",
        className: "",
      },
      release: {
        type: "2 · AU-DESSUS DU LIQUIDE",
        title: "La pompe retire une partie de l’opposition",
        copy: "En diminuant la pression extérieure, elle facilite le développement des bulles dans le liquide.",
        className: "release",
      },
      boil: {
        type: "3 · À L’ÉQUILIBRE",
        title: "La pression de vapeur atteint la pression extérieure",
        copy: "Les bulles ne sont plus écrasées : elles grandissent dans tout le volume. L’ébullition commence.",
        className: "release boil",
      },
    };
    document.querySelectorAll("[data-cause]").forEach((button) => button.classList.toggle("active", button.dataset.cause === mode));
    $("#molecule-stage").className = `molecule-stage ${content[mode].className}`.trim();
    $("#cause-type").textContent = content[mode].type;
    $("#cause-title").textContent = content[mode].title;
    $("#cause-copy").textContent = content[mode].copy;
  }

  function drawPTCurve(pressure, temperature) {
    const canvas = $("#pt-canvas");
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const left = 58;
    const right = width - 24;
    const top = 20;
    const bottom = height - 48;
    const pMin = Math.log(WATER[0].p);
    const pMax = Math.log(WATER[WATER.length - 1].p);
    const xFor = (p) => left + ((Math.log(p) - pMin) / (pMax - pMin)) * (right - left);
    const yFor = (t) => bottom - ((t - 10) / 90) * (bottom - top);

    context.clearRect(0, 0, width, height);
    context.strokeStyle = "#d7e0e8";
    context.lineWidth = 1;
    context.font = "12px Segoe UI";
    context.fillStyle = "#637285";
    [20, 40, 60, 80, 100].forEach((value) => {
      const y = yFor(value);
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
      context.fillText(`${value} °C`, 8, y + 4);
    });
    context.strokeStyle = "#10233c";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(left, top);
    context.lineTo(left, bottom);
    context.lineTo(right, bottom);
    context.stroke();

    context.strokeStyle = "#5d65c9";
    context.lineWidth = 6;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    WATER.forEach((point, index) => {
      const x = xFor(point.p);
      const y = yFor(point.t);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();

    const markerX = xFor(pressure);
    const markerY = yFor(temperature);
    context.fillStyle = "#ff6b35";
    context.beginPath();
    context.arc(markerX, markerY, 9, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "#fff";
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = "#10233c";
    context.font = "700 12px Segoe UI";
    context.fillText("pression absolue →", right - 115, height - 13);
  }

  function updatePTCurve() {
    const percent = Number($("#water-pressure-slider").value);
    const pressure = pressureFromPercent(percent);
    const temperature = waterSaturation(pressure);
    $("#water-pressure-label").textContent = `${formatNumber(pressure, pressure < 0.1 ? 3 : 2)} bar`;
    $("#pt-pressure").textContent = `${formatNumber(pressure, pressure < 0.1 ? 3 : 2)} bar`;
    $("#pt-temperature").textContent = `${formatNumber(temperature, 1)} °C`;
    drawPTCurve(pressure, temperature);
  }

  function updateReverse() {
    document.querySelectorAll("[data-reverse-mode]").forEach((button) => button.classList.toggle("active", button.dataset.reverseMode === reverseMode));
    document.querySelectorAll("[data-reverse-pressure]").forEach((button) => button.classList.toggle("active", Number(button.dataset.reversePressure) === reversePressure));
    const temperature = waterSaturation(reversePressure);
    const condensing = reverseMode === "cond";
    $("#reverse-vessel").classList.toggle("condense", condensing);
    $("#reverse-arrow").textContent = condensing ? "←" : "→";
    $("#reverse-type").textContent = condensing ? "LIQUÉFACTION" : "VAPORISATION";
    $("#reverse-title").textContent = `À ${formatNumber(reversePressure, reversePressure < 1 ? 3 : 3)} bar : environ ${formatNumber(temperature, 0)} °C`;
    $("#reverse-copy").textContent = condensing
      ? "La vapeur cède de l’énergie et devient liquide à cette température de saturation."
      : "Le liquide reçoit de l’énergie et devient vapeur à cette température de saturation.";
    $("#reverse-rule").textContent = condensing
      ? `le liquide bouillirait aussi vers ${formatNumber(temperature, 0)} °C à cette pression.`
      : `la vapeur condenserait aussi vers ${formatNumber(temperature, 0)} °C à cette pression.`;
  }

  function updatePressureSide(mode) {
    pressureSide = mode;
    document.querySelectorAll("[data-pressure-side]").forEach((button) => button.classList.toggle("active", button.dataset.pressureSide === mode));
    const condensing = mode === "cond";
    $("#side-environment-kicker").textContent = condensing ? "DEHORS" : "DEDANS";
    $("#side-environment-title").textContent = condensing ? "Air extérieur à +30 °C" : "Local à +4 °C";
    $("#side-environment-copy").textContent = condensing ? "Il doit recevoir l’énergie." : "Il doit céder de l’énergie.";
    $("#side-arrow").textContent = condensing ? "←" : "→";
    $("#side-pressure-kicker").textContent = condensing ? "HAUTE PRESSION" : "BASSE PRESSION";
    $("#side-exchanger-title").textContent = condensing ? "Condenseur" : "Évaporateur";
    $("#side-exchanger-copy").textContent = condensing
      ? "Exemple R‑134a : vers 10,2 bar absolus, la saturation est proche de +40 °C."
      : "Exemple R‑134a : vers 2 bar absolus, la saturation est proche de −10 °C.";
    $("#side-left-condition").textContent = condensing ? "Fluide : +40 °C" : "Local : +4 °C";
    $("#side-main-condition").textContent = condensing ? "plus chaud que l’extérieur : +30 °C" : "plus chaud que le fluide : −10 °C";
    $("#side-conclusion").innerHTML = condensing
      ? "<strong>Conséquence :</strong> l’énergie va du fluide vers l’extérieur, tandis que la vapeur se liquéfie."
      : "<strong>Conséquence :</strong> l’énergie va du local vers le fluide, qui se vaporise.";
  }

  function updateTranslator() {
    const relative = Number($("#translator-slider").value);
    const absolute = relative + 1.013;
    const temperature = interpolateByPressure(R134A, absolute);
    $("#translator-relative").textContent = `${formatNumber(relative, 1)} bar relatif`;
    $("#chain-relative").textContent = `${formatNumber(relative, 1)} bar rel.`;
    $("#chain-absolute").textContent = `≈ ${formatNumber(absolute, 1)} bar abs.`;
    $("#translator-title").textContent = `Environ ${formatNumber(absolute, 1)} bar absolus → ${formatNumber(temperature, 1)} °C`;
    $("#table-pressure").textContent = `≈ ${formatNumber(absolute, 1)} bar`;
    $("#table-temperature").textContent = `≈ ${formatNumber(temperature, 1)} °C`;
  }

  function updateGlide() {
    const progress = Number($("#glide-slider").value);
    const ratio = progress / 100;
    const pureTemperature = -10;
    const zeotropeTemperature = -10 + R407C_GLIDE * ratio;
    const left = 10 + 82 * ratio;
    $("#pure-marker").style.left = `${left}%`;
    $("#pure-marker").style.bottom = "calc(48% - 6px)";
    $("#zeotrope-marker").style.left = `${left}%`;
    $("#zeotrope-marker").style.bottom = `calc(${28 + 22 * ratio}% - 6px)`;
    $("#pure-temperature").textContent = `${formatNumber(pureTemperature, 1)} °C`;
    $("#zeotrope-temperature").textContent = `${formatNumber(zeotropeTemperature, 1)} °C`;
    $("#glide-label").textContent = progress < 15 ? "première bulle" : progress > 85 ? "dernière goutte" : `${Math.round(progress)} % vaporisé`;
    $("#glide-conclusion").innerHTML =
      progress < 15
        ? "<strong>Au départ :</strong> les deux fluides sont au point de bulle. La différence apparaîtra pendant la transformation."
        : progress > 85
          ? `<strong>À l’arrivée :</strong> le pur est resté à −10 °C ; le zéotrope atteint sa rosée vers ${formatNumber(-10 + R407C_GLIDE, 1)} °C.`
          : `<strong>Pendant la transformation :</strong> pression constante pour les deux, mais le zéotrope a déjà glissé jusqu’à ${formatNumber(zeotropeTemperature, 1)} °C.`;
  }

  function updateDirection() {
    const progress = Number($("#direction-slider").value);
    const index = Math.min(4, Math.floor((progress + 12.5) / 25));
    const evaporation = directionMode === "evap";
    const steps = evaporation
      ? [
          ["DÉPART", "Liquide", "sous-refroidi"],
          ["BULLE", "Première bulle", "−10 °C · début"],
          ["DIPHASIQUE", "Liquide + vapeur", "température qui monte"],
          ["ROSÉE", "Dernière goutte", "−3,9 °C · fin"],
          ["ARRIVÉE", "Vapeur", "surchauffable"],
        ]
      : [
          ["DÉPART", "Vapeur", "désurchauffée"],
          ["ROSÉE", "Première goutte", "−3,9 °C · début"],
          ["DIPHASIQUE", "Vapeur + liquide", "température qui descend"],
          ["BULLE", "Dernière bulle", "−10 °C · fin"],
          ["ARRIVÉE", "Liquide", "sous-refroidissable"],
        ];
    document.querySelectorAll("[data-direction]").forEach((button) => button.classList.toggle("active", button.dataset.direction === directionMode));
    $("#direction-track").classList.toggle("reverse", !evaporation);
    steps.forEach((step, stepIndex) => {
      const card = $(`#direction-step-${stepIndex}`);
      card.querySelector("small").textContent = step[0];
      card.querySelector("strong").textContent = step[1];
      card.querySelector("span").textContent = step[2];
      card.classList.toggle("active", stepIndex === index);
    });
    $("#direction-label").textContent = steps[index][1].toLowerCase();
    $("#direction-copy").innerHTML = evaporation
      ? "<strong>Évaporation :</strong> bulle ouvre, la température monte, rosée ferme."
      : "<strong>Condensation :</strong> rosée ouvre, la température descend, bulle ferme.";
  }

  function updateMeasureMode(mode) {
    measureMode = mode;
    const superheat = mode === "superheat";
    document.querySelectorAll("[data-measure-mode]").forEach((button) => button.classList.toggle("active", button.dataset.measureMode === mode));
    document.querySelectorAll("[data-measure-answer]").forEach((button) => {
      button.disabled = false;
      button.classList.remove("good", "bad");
    });
    $("#measure-context").textContent = superheat
      ? "Nous mesurons une vapeur seule après la disparition de la dernière goutte."
      : "Nous mesurons un liquide seul après la disparition de la dernière bulle.";
    $("#measure-type").textContent = superheat ? "VAPEUR SEULE" : "LIQUIDE SEUL";
    $("#measure-title").textContent = superheat
      ? "Surchauffe = température réelle − rosée"
      : "Sous-refroidissement = bulle − température réelle";
    $("#measure-reference").textContent = superheat ? "rosée" : "bulle";
    $("#measure-result-name").textContent = superheat ? "surchauffe" : "sous-refroidissement";
    $("#measure-rule").innerHTML = superheat
      ? "<strong>Pourquoi ?</strong> La rosée est la frontière de la vapeur saturée, juste avant la vapeur surchauffée."
      : "<strong>Pourquoi ?</strong> La bulle est la frontière du liquide saturé, juste avant le liquide sous-refroidi.";
    $("#measure-feedback").textContent = "Choisissez la frontière correspondant à l’état mesuré.";
  }

  function answerMeasure(button) {
    const correctAnswer = measureMode === "superheat" ? "dew" : "bubble";
    const correct = button.dataset.measureAnswer === correctAnswer;
    document.querySelectorAll("[data-measure-answer]").forEach((item) => {
      item.disabled = true;
      if (item.dataset.measureAnswer === correctAnswer) item.classList.add("good");
      else if (item === button) item.classList.add("bad");
    });
    $("#measure-feedback").textContent = correct
      ? measureMode === "superheat"
        ? "✓ Exact : vapeur seule, donc référence rosée."
        : "✓ Exact : liquide seul, donc référence bulle."
      : measureMode === "superheat"
        ? "La surchauffe concerne la vapeur : sa frontière est la rosée."
        : "Le sous-refroidissement concerne le liquide : sa frontière est la bulle.";
  }

  function updateMission() {
    const lowPressure = Number($("#low-pressure-slider").value) / 10;
    const highPressure = Number($("#high-pressure-slider").value) / 10;
    const lowTemperature = interpolateByPressure(R134A, lowPressure);
    const highTemperature = interpolateByPressure(R134A, highPressure);
    const lowOk = lowTemperature <= -1;
    const highOk = highTemperature >= 35;
    $("#low-pressure-value").textContent = `${formatNumber(lowPressure, 1)} bar`;
    $("#low-temperature-value").textContent = `${formatNumber(lowTemperature, 1)} °C`;
    $("#high-pressure-value").textContent = `${formatNumber(highPressure, 1)} bar`;
    $("#high-temperature-value").textContent = `${formatNumber(highTemperature, 1)} °C`;
    $("#low-mission").classList.toggle("ok", lowOk);
    $("#high-mission").classList.toggle("ok", highOk);
    if (lowOk && highOk) {
      $("#mission-result").innerHTML = "<strong>✓ Mission réussie :</strong> la basse pression place l’évaporation assez froid pour absorber dedans, et la haute pression place la condensation assez chaud pour restituer dehors.";
    } else if (!lowOk && !highOk) {
      $("#mission-result").innerHTML = "<strong>Deux actions :</strong> baissez encore la basse pression et augmentez la haute pression.";
    } else if (!lowOk) {
      $("#mission-result").innerHTML = "<strong>Côté froid à corriger :</strong> baissez la pression d’évaporation pour abaisser la température de saturation.";
    } else {
      $("#mission-result").innerHTML = "<strong>Côté chaud à corriger :</strong> augmentez la pression de condensation pour élever la température de saturation.";
    }
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
    $("#quiz-feedback").innerHTML = `${correct ? "✓" : "✗"} ${question.why} <button class="nav" id="quiz-next" type="button">${quizIndex === questions.length - 1 ? "Voir le résultat" : "Question suivante"}</button>`;
    $("#quiz-next").addEventListener("click", () => {
      quizIndex += 1;
      answered = false;
      $("#zone").innerHTML = quizMarkup();
      wireCurrentActivity();
      updateCourseNavigation();
    });
  }

  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    const voices = speechSynthesis.getVoices();
    selectedVoice =
      voices.find((voice) => voice.lang.toLowerCase() === "fr-fr" && /natural|online|google|microsoft/i.test(voice.name)) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("fr")) ||
      null;
  }

  function updateListenButton() {
    const icon = $("#listen span");
    const label = $("#listen b");
    if (speaking && !paused) {
      icon.textContent = "Ⅱ";
      label.textContent = " Pause";
    } else if (paused) {
      icon.textContent = "▶";
      label.textContent = " Reprendre";
    } else {
      icon.textContent = "▶";
      label.textContent = " Écouter";
    }
  }

  function stopSpeech() {
    speechRun += 1;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    speaking = false;
    paused = false;
    updateListenButton();
  }

  function applyVoiceCue(cue) {
    if (cue.control) {
      const control = $(cue.control);
      if (control) {
        control.value = String(cue.value);
        control.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    if (cue.side && $("[data-pressure-side]")) updatePressureSide(cue.side);
    if (cue.direction && $("[data-direction]")) {
      directionMode = cue.direction;
      updateDirection();
    }
  }

  function speakCurrent() {
    if (!voiceEnabled) return;
    if (!("speechSynthesis" in window)) {
      $("#speech-warning").hidden = false;
      return;
    }
    stopSpeech();
    loadVoices();
    const run = speechRun;
    const lesson = lessons[current];
    const steps = lesson.voiceSteps || [{ text: lesson.speak }];
    let stepIndex = 0;

    const speakStep = () => {
      if (run !== speechRun) return;
      if (stepIndex >= steps.length) {
        speaking = false;
        paused = false;
        updateListenButton();
        return;
      }
      const cue = steps[stepIndex];
      stepIndex += 1;
      applyVoiceCue(cue);
      const utterance = new SpeechSynthesisUtterance(cue.text);
      utterance.lang = selectedVoice ? selectedVoice.lang : "fr-FR";
      utterance.voice = selectedVoice;
      utterance.rate = rates[rateIndex];
      utterance.pitch = 1;
      utterance.onstart = () => {
        if (run !== speechRun) return;
        speaking = true;
        paused = false;
        updateListenButton();
      };
      utterance.onend = () => speakStep();
      utterance.onerror = (event) => {
        if (event.error === "canceled" || event.error === "interrupted" || run !== speechRun) return;
        speaking = false;
        paused = false;
        updateListenButton();
        $("#speech-warning").hidden = false;
      };
      speechSynthesis.speak(utterance);
    };
    speakStep();
  }

  function toggleSpeech() {
    if (!("speechSynthesis" in window)) {
      $("#speech-warning").hidden = false;
      return;
    }
    if (speaking && !paused) {
      speechSynthesis.pause();
      paused = true;
      updateListenButton();
      return;
    }
    if (paused) {
      speechSynthesis.resume();
      paused = false;
      updateListenButton();
      return;
    }
    speakCurrent();
  }

  function saveRate() {
    $("#speed-value").textContent = `${rates[rateIndex].toFixed(2).replace(".", ",")}×`;
    try {
      localStorage.setItem("pression-temperature-rate", String(rates[rateIndex]));
    } catch (_) {}
    if (speaking || paused) speakCurrent();
  }

  function goTo(index, continueNarration) {
    stopSpeech();
    current = Math.max(0, Math.min(lessons.length - 1, index));
    furthest = Math.max(furthest, current);
    render();
    if (continueNarration && voiceEnabled) setTimeout(speakCurrent, 300);
  }

  function startCourse() {
    autoplay = true;
    $("#module").scrollIntoView({ behavior: "smooth" });
    goTo(0, true);
  }

  buildStepper();
  try {
    const savedRate = Number(localStorage.getItem("pression-temperature-rate"));
    const savedIndex = rates.indexOf(savedRate);
    if (savedIndex >= 0) rateIndex = savedIndex;
  } catch (_) {}
  loadVoices();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = loadVoices;
  saveRate();
  render();

  $("#start").addEventListener("click", startCourse);
  $("#prev").addEventListener("click", () => goTo(current - 1, autoplay));
  $("#next").addEventListener("click", () => {
    if (current === lessons.length - 1) {
      $(".final-message").scrollIntoView({ behavior: "smooth" });
      return;
    }
    goTo(current + 1, autoplay);
  });
  $("#listen").addEventListener("click", toggleSpeech);
  $("#slower").addEventListener("click", () => {
    rateIndex = Math.max(0, rateIndex - 1);
    saveRate();
  });
  $("#faster").addEventListener("click", () => {
    rateIndex = Math.min(rates.length - 1, rateIndex + 1);
    saveRate();
  });
  $("#voice-toggle").addEventListener("click", () => {
    voiceEnabled = !voiceEnabled;
    $("#voice-toggle").setAttribute("aria-pressed", String(voiceEnabled));
    $("#voice-toggle").textContent = voiceEnabled ? "🔊 Voix active" : "🔇 Voix coupée";
    if (!voiceEnabled) stopSpeech();
  });
  $("#refs-toggle").addEventListener("click", () => {
    const expanded = $("#refs-toggle").getAttribute("aria-expanded") === "true";
    $("#refs-toggle").setAttribute("aria-expanded", String(!expanded));
    $("#refs").hidden = expanded;
    if (!expanded) $("#refs").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#restart").addEventListener("click", () => {
    stopSpeech();
    current = 0;
    furthest = 0;
    autoplay = false;
    quizIndex = 0;
    score = 0;
    answered = false;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
