(() => {
  "use strict";

  const svg = (id, title, desc, body) => `<svg viewBox="0 0 760 430" role="img" aria-labelledby="${id}-title ${id}-desc">
    <title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc>
    <defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker></defs>${body}</svg>`;

  const routeScene = svg("mono-route", "Réseau monotube à dérivations", "Une seule boucle principale dessert trois radiateurs dans l’ordre. À chaque radiateur, une partie du débit peut passer par l’émetteur et l’autre par un bypass avant de se rejoindre en aval. Un repère EAU peut parcourir la boucle ; le texte décrit chaque passage.", `
    <text x="380" y="34" text-anchor="middle" font-size="22" font-weight="700">CAS ÉTUDIÉ : MONOTUBE À DÉRIVATIONS</text>
    <path id="mono-flux-chemin" d="M85 95H675Q715 95 715 140V315Q715 355 675 355H85Q45 355 45 315V140Q45 95 85 95" fill="none" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-mono-route)"/>
    ${[175,380,585].map((x, i) => `<g><path d="M${x-50} 95V205Q${x-50} 230 ${x} 230H${x+50}Q${x+50} 205 ${x+50} 95" fill="none" stroke="#3d7fca" stroke-width="9"/><path d="M${x-45} 95H${x+45}" stroke="#c9451a" stroke-width="6" stroke-dasharray="9 7"/><image href="assets/radiateur.svg" x="${x-48}" y="165" width="96" height="72"/><text x="${x}" y="268" text-anchor="middle" font-size="16" font-weight="700">Émetteur ${i+1}</text></g>`).join("")}
    <rect x="65" y="290" width="160" height="46" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="145" y="319" text-anchor="middle" font-size="15" font-weight="700">PRODUCTION</text>
    <text x="380" y="395" text-anchor="middle" font-size="15">Bleu plein : dérivation · orange tireté : bypass · flèche : sens</text>
    <g id="mono-flux-marqueur" transform="translate(85 95)"><circle r="15" fill="#3d7fca" stroke="#fffdf8" stroke-width="3"/><text y="4" text-anchor="middle" font-size="11" font-weight="700" fill="#fffdf8">EAU</text></g>`);

  const routeSceneAnimee = routeScene + `
    <div class="flux-controls">
      <button type="button" data-flux="lire">▶ Lancer l’eau</button>
      <button type="button" data-flux="rejouer">↺ Recommencer</button>
      <p class="flux-etat" aria-live="polite">Repère EAU au départ. Lancez le trajet : le texte décrit chaque passage.</p>
    </div>`;

  function brancherFlux(scene) {
    const chemin = scene.querySelector("#mono-flux-chemin");
    const marqueur = scene.querySelector("#mono-flux-marqueur");
    const etat = scene.querySelector(".flux-etat");
    const lire = scene.querySelector('[data-flux="lire"]');
    const rejouer = scene.querySelector('[data-flux="rejouer"]');
    if (!chemin || !marqueur || !etat || !lire || !rejouer) return;
    const longueur = chemin.getTotalLength();
    const fractionPresDe = (px, py) => {
      let meilleure = 0, distance = Infinity;
      for (let i = 0; i <= 200; i += 1) {
        const point = chemin.getPointAtLength(longueur * i / 200);
        const d = (point.x - px) ** 2 + (point.y - py) ** 2;
        if (d < distance) { distance = d; meilleure = i / 200; }
      }
      return meilleure;
    };
    const messages = [
      [0, "L’eau quitte la production et suit le départ de la boucle principale."],
      [fractionPresDe(175, 95), "Émetteur 1 : une partie de l’eau traverse, le reste suit le bypass."],
      [fractionPresDe(380, 95), "Émetteur 2 : l’eau arrive après le mélange laissé par l’amont."],
      [fractionPresDe(585, 95), "Émetteur 3 : dernier partage avant le retour."],
      [fractionPresDe(715, 250), "Retour : toute l’eau redescend vers la production."],
      [fractionPresDe(145, 355), "L’eau retraverse la production : la boucle est fermée."]
    ].sort((a, b) => a[0] - b[0]);
    let avancement = 0, enLecture = false, derniereFrame = 0;
    function positionner(p) {
      const point = chemin.getPointAtLength(longueur * p);
      marqueur.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);
      if (!enLecture && p === 0) return;
      const message = messages.filter(([seuil]) => p >= seuil - 1e-6).pop();
      if (message && etat.dataset.cle !== String(message[0])) { etat.dataset.cle = String(message[0]); etat.textContent = message[1]; }
    }
    function animer(temps) {
      if (!enLecture) return;
      if (!derniereFrame) derniereFrame = temps;
      avancement = Math.min(1, avancement + (temps - derniereFrame) / 12000);
      derniereFrame = temps;
      positionner(avancement);
      if (avancement >= 1) { enLecture = false; lire.textContent = "▶ Rejouer le trajet"; return; }
      requestAnimationFrame(animer);
    }
    lire.addEventListener("click", () => {
      if (enLecture) { enLecture = false; lire.textContent = "▶ Reprendre"; return; }
      if (avancement >= 1) avancement = 0;
      enLecture = true; derniereFrame = 0; lire.textContent = "Ⅱ Pause";
      requestAnimationFrame(animer);
    });
    rejouer.addEventListener("click", () => {
      enLecture = false; avancement = 0; delete etat.dataset.cle;
      positionner(0); lire.textContent = "▶ Lancer l’eau";
      etat.textContent = "Repère EAU au départ. Lancez le trajet : le texte décrit chaque passage.";
    });
    positionner(0);
  }

  const orderScene = svg("mono-order", "Amont et aval sur une boucle monotube", "L’émetteur 1 est en amont des émetteurs 2 et 3. Une modification à l’amont peut changer les conditions rencontrées en aval, sans prouver à elle seule une panne.", `
    <path d="M70 220H690" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-mono-order)"/>
    ${[180,380,580].map((x, i) => `<g><circle cx="${x}" cy="220" r="52" fill="#fffdf8" stroke="#3d7fca" stroke-width="6"/><text x="${x}" y="215" text-anchor="middle" font-size="17" font-weight="700">Émetteur ${i+1}</text><text x="${x}" y="240" text-anchor="middle" font-size="14">position ${i+1}</text></g>`).join("")}
    <rect x="95" y="95" width="180" height="54" rx="13" fill="#e3f5ec" stroke="#1e7e54" stroke-width="5"/><text x="185" y="128" text-anchor="middle" font-size="17" font-weight="700">AMONT · premier</text>
    <rect x="485" y="95" width="180" height="54" rx="13" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="575" y="128" text-anchor="middle" font-size="17" font-weight="700">AVAL · ensuite</text>
    <text x="380" y="360" text-anchor="middle" font-size="16">L’ordre hydraulique est celui du sens de circulation.</text>`);

  function bypassScene(percent = 35) {
    const branch = percent / 100;
    const bypass = 1 - branch;
    const mixed = branch * 52 + bypass * 60;
    return svg("mono-bypass", "Partage du débit dans une dérivation monotube", `Donnée pédagogique : le débit principal vaut 1,00 mètre cube par heure. ${branch.toFixed(2)} passe dans l’émetteur et ${bypass.toFixed(2)} dans le bypass. Avec 60 degrés en amont et 52 degrés en sortie d’émetteur, le mélange aval vaut ${mixed.toFixed(1)} degrés.`, `
      <text x="380" y="34" text-anchor="middle" font-size="21" font-weight="700">PARTAGE PUIS MÉLANGE · MODÈLE PÉDAGOGIQUE</text>
      <path d="M65 120H695" stroke="#1b3a63" stroke-width="15" marker-end="url(#arr-mono-bypass)"/>
      <path d="M245 120V275Q245 310 300 310H460Q515 310 515 275V120" fill="none" stroke="#3d7fca" stroke-width="${8 + branch * 12}"/>
      <path d="M260 120H500" stroke="#c9451a" stroke-width="${8 + bypass * 10}" stroke-dasharray="11 8"/>
      <image href="assets/radiateur.svg" x="332" y="240" width="96" height="72"/>
      <rect x="80" y="175" width="190" height="74" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="175" y="204" text-anchor="middle" font-size="15" font-weight="700">DÉBIT PRINCIPAL</text><text x="175" y="231" text-anchor="middle" font-size="18">1,00 m³/h · 60 °C</text>
      <rect x="490" y="175" width="205" height="74" rx="14" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="592" y="204" text-anchor="middle" font-size="15" font-weight="700">MÉLANGE AVAL</text><text x="592" y="231" text-anchor="middle" font-size="18">1,00 m³/h · ${mixed.toFixed(1)} °C</text>
      <text x="380" y="367" text-anchor="middle" font-size="16">Émetteur : ${branch.toFixed(2)} m³/h · bypass : ${bypass.toFixed(2)} m³/h</text>
      <text x="380" y="397" text-anchor="middle" font-size="14">Hypothèses : eau, pertes de ligne négligées, sortie émetteur fixée à 52 °C.</text>`);
  }

  const temperatureScene = svg("mono-temp", "Évolution pédagogique des températures d’amont en aval", "Dans ce cas pédagogique à trois émetteurs, la température mélangée de la boucle vaut 60 degrés avant le premier, 57 degrés avant le deuxième, 54 degrés avant le troisième et 52 degrés au retour. Ces valeurs ne sont pas universelles.", `
    <path d="M70 220H690" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-mono-temp)"/>
    ${[[130,"60 °C","AMONT"],[310,"57 °C","APRÈS E1"],[490,"54 °C","APRÈS E2"],[650,"52 °C","RETOUR"]].map(([x,t,l],i)=>`<g><circle cx="${x}" cy="220" r="43" fill="#fffdf8" stroke="${i===0?"#1e7e54":"#3d7fca"}" stroke-width="${i===0?5:4}"/><text x="${x}" y="216" text-anchor="middle" font-size="18" font-weight="700">${t}</text><text x="${x}" y="239" text-anchor="middle" font-size="12">${l}</text></g>`).join("")}
    <text x="380" y="75" text-anchor="middle" font-size="22" font-weight="700">L’AVAL REÇOIT L’ÉTAT LAISSÉ PAR L’AMONT</text>
    <rect x="155" y="310" width="450" height="64" rx="14" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="380" y="337" text-anchor="middle" font-size="15" font-weight="700">DONNÉES PÉDAGOGIQUES, PAS UN DIMENSIONNEMENT</text><text x="380" y="360" text-anchor="middle" font-size="14">Les températures réelles dépendent du réseau et des puissances.</text>`);

  const methodScene = svg("mono-method", "Méthode de lecture d’un monotube", "La démarche est posée sur le réseau : suivre le sens sur la conduite, repérer la dérivation et son bypass, attendre l’état stable, relever la température avant l’émetteur soit 60 degrés et après l’émetteur soit 54 degrés dans cet exemple, puis justifier par écrit.", `
    <text x="380" y="40" text-anchor="middle" font-size="22" font-weight="700">LA MÉTHODE SE LIT SUR LE RÉSEAU</text>
    <path d="M70 210H690" stroke="#1b3a63" stroke-width="13" marker-end="url(#arr-mono-method)"/>
    <path d="M340 210H420" stroke="#c9451a" stroke-width="6" stroke-dasharray="9 7"/>
    <path d="M340 210V252M420 210V252" stroke="#3d7fca" stroke-width="8"/>
    <image href="assets/radiateur.svg" x="332" y="252" width="96" height="72"/>
    <text x="380" y="343" text-anchor="middle" font-size="14" font-weight="700">émetteur</text>
    ${[[115,"1","Suivre le sens"],[330,"2","Repérer la dérivation"],[545,"3","Attendre l’état stable"]].map(([x,n,l]) => `<g><circle cx="${x}" cy="150" r="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/><text x="${x}" y="156" text-anchor="middle" font-size="15" font-weight="700">${n}</text><text x="${x}" y="118" text-anchor="middle" font-size="14" font-weight="700">${l}</text><path d="M${x} 168V198" stroke="#1e7e54" stroke-width="3" stroke-dasharray="4 4"/></g>`).join("")}
    <circle cx="135" cy="309" r="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/><text x="135" y="315" text-anchor="middle" font-size="15" font-weight="700">4</text>
    <rect x="160" y="285" width="130" height="48" rx="11" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="225" y="315" text-anchor="middle" font-size="15" font-weight="700">AVANT : 60 °C</text>
    <rect x="440" y="285" width="130" height="48" rx="11" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="505" y="315" text-anchor="middle" font-size="15" font-weight="700">APRÈS : 54 °C</text>
    <path d="M250 285V218M505 285V218" stroke="#1b3a63" stroke-width="3" stroke-dasharray="5 4"/>
    <text x="365" y="378" text-anchor="middle" font-size="14" font-weight="700">Relever avant / après l’émetteur</text>
    <circle cx="600" cy="309" r="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/><text x="600" y="315" text-anchor="middle" font-size="15" font-weight="700">5</text>
    <rect x="625" y="275" width="110" height="70" rx="10" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
    <path d="M640 297H720M640 314H720M640 331H700" stroke="rgba(27,58,99,.35)" stroke-width="3"/>
    <text x="680" y="368" text-anchor="middle" font-size="14" font-weight="700">Justifier par écrit</text>
    <text x="380" y="412" text-anchor="middle" font-size="15">Une observation n’est pas encore un diagnostic : comparer dans le même état.</text>`);

  window.STATION_CONFIG = {
    code: "D1", id: "monotube", title: "Monotube — Suivez l’eau", next: "poursuivre vers la station Bitube",
    levels: {
      CAP: { objective: "Suivre le trajet de l’eau et nommer amont et aval.", assessment: "suivre le trajet et nommer amont, aval" },
      TP: { objective: "Suivre la boucle, nommer amont et aval et contrôler une dérivation.", assessment: "repérer le trajet, lire les valeurs et expliquer l’effet amont-aval" },
      BTS: { objective: "Analyser le partage de débit et le mélange thermique d’un monotube simplifié.", assessment: "vérifier le bilan du modèle et en exposer les limites" }
    },
    steps: [
      { short: "Trajet", narration: "En monotube, une seule conduite fait le tour et dessert les émetteurs les uns après les autres. Chaque émetteur est piqué sur cette boucle, souvent avec un bypass qui laisse une partie de l'eau continuer son chemin. Suivez le trajet complet : l'eau part, traverse le premier piquage, poursuit, atteint le deuxième, et ainsi de suite jusqu'au retour. Cette architecture économise beaucoup de tube, ce qui explique qu'on la trouve dans de nombreux bâtiments des années soixante-dix. Elle impose en contrepartie une contrainte que le bitube n'a pas, et c'est ce que vous allez voir.", kicker: "suivre l’eau", title: "Une boucle principale, trois dérivations", text: "Lance le repère EAU pour suivre le trajet, puis clique les repères dans l’ordre suivi par l’eau. Le cas montré comporte un bypass à chaque émetteur.", cap: "Suis le repère EAU pendant son tour complet.", tp: "Repère production, départ, dérivation, mélange et retour.", bts: "Distingue la boucle principale du trajet partiel dans chaque émetteur.", scene: routeSceneAnimee, wire: brancherFlux, equivalent: "Le trajet part de la production, suit la conduite principale, se partage entre émetteur et bypass, se mélange en aval puis revient à la production. L’animation est déclenchée par bouton et le texte décrit chaque passage.", action: { type: "sequence", prompt: "Construis la trace observable du trajet.", items: ["Mélange aval", "Retour", "Production", "Dérivation émetteur", "Départ principal"], correctOrder: [2,4,3,0,1], explain: "La boucle principale reste continue ; chaque dérivation rejoint le bypass avant le tronçon aval." } },
      { short: "Ordre", narration: "L'ordre des émetteurs se lit dans le sens de circulation, jamais d'après leur position sur le plan ou dans le bâtiment. Un radiateur dessiné à gauche peut très bien être le dernier de la boucle. Amont et aval sont des notions hydrauliques, pas géographiques. C'est une source d'erreur constante en diagnostic : on croit remonter la boucle alors qu'on la descend. Le seul moyen sûr, c'est de repérer le départ, puis de suivre le tube dans le sens où l'eau va — au besoin en s'aidant des températures, puisque l'eau se refroidit progressivement le long du parcours.", kicker: "repérer", title: "Amont et aval dépendent du sens", text: "L’ordre des émetteurs se lit dans le sens des flèches, pas selon leur position sur la page.", cap: "Montre l’émetteur qui reçoit l’eau en premier.", tp: "Identifie l’émetteur qui influence les suivants.", bts: "Relie l’ordre hydraulique aux conditions d’entrée de chaque dérivation.", scene: orderScene, equivalent: "Dans le sens de circulation, l’émetteur 1 est en amont des émetteurs 2 et 3.", action: { type: "choice", prompt: "Quel émetteur est le plus en amont ?", options: [{label:"Émetteur 1"},{label:"Émetteur 2"},{label:"Émetteur 3"}], correct: 0, explain: "L’émetteur 1 est rencontré en premier dans le sens indiqué." } },
      { short: "Partager", narration: "Faites varier la part d'eau qui traverse réellement l'émetteur. Vous voyez que le débit se partage au piquage : une fraction entre dans l'émetteur, le reste continue dans la boucle par le bypass, et les deux se recombinent après. Ce partage détermine ce que l'émetteur peut donner. Une part trop faible, et l'émetteur reste tiède même avec une boucle bien chaude. C'est le premier point à vérifier devant un radiateur qui chauffe mal en monotube — bien avant de suspecter la chaudière ou le circulateur, qui alimentent correctement tous les autres.", kicker: "observer", title: "Le débit se partage puis se recombine", text: "Fais varier la part qui traverse l’émetteur. Le débit principal reste 1,00 m³/h dans ce seul modèle.", cap: "Lis les deux débits affichés à l’écran.", tp: "Lis les deux débits et la température mélangée.", bts: "Vérifie conservation du débit et moyenne pondérée sans pertes de ligne.", scene: bypassScene, equivalent: (v) => { const b=v/100, m=b*52+(1-b)*60; return `Donnée pédagogique : ${b.toFixed(2)} m³/h traverse l’émetteur, ${(1-b).toFixed(2)} m³/h le bypass et le mélange aval vaut ${m.toFixed(1)} °C.`; }, action: { type: "range", prompt: "Modifie la part de débit dans l’émetteur.", label: "Part dans l’émetteur", min: 20, max: 60, step: 5, value: 35, evaluate: (v) => { const b=v/100, m=b*52+(1-b)*60; return { readout: `${v} %`, observation: `Émetteur ${b.toFixed(2)} m³/h + bypass ${(1-b).toFixed(2)} m³/h = 1,00 m³/h ; mélange ${m.toFixed(1)} °C.` }; } } },
      { short: "Comparer", narration: "Suivez maintenant les températures d'un émetteur à l'autre. Elles baissent le long de la boucle, et c'est normal : chaque émetteur prélève sa part de chaleur, l'eau repart un peu plus froide vers le suivant. Le dernier travaille donc dans des conditions moins favorables que le premier, par construction. Ce n'est pas un défaut, c'est prévu au dimensionnement — le dernier émetteur est en principe choisi plus grand pour compenser. Ce qu'il faut en retenir sur le terrain : sur une plainte du type « le radiateur du fond chauffe mal », commencez par identifier le type de distribution. En monotube, la position fait partie de l'explication.", kicker: "amont vers aval", title: "Les conditions évoluent le long de la boucle", text: "Lis la série de températures pédagogiques. Elle illustre une influence de l’amont sans définir un réseau réel.", cap: "Compare la température au début et à la fin.", tp: "Compare avant et après chaque émetteur.", bts: "Refuse de dimensionner à partir de cette seule série : puissances et débits réels manquent.", scene: temperatureScene, equivalent: "Exemple pédagogique : 60, 57, 54 puis 52 degrés de l’amont vers le retour.", action: { type: "choice", prompt: "Quelle conclusion est justifiée par ce modèle ?", options: [{label:"L’état reçu en aval dépend ici des échanges précédents."},{label:"Tout monotube réel possède ces quatre températures."},{label:"Le débit réel est prouvé sans mesure."}], correct: 0, explain: "La tendance appartient au modèle ; les valeurs réelles exigent calculs et mesures." } },
      { short: "Justifier", narration: "Concluez par la méthode. Un trajet observé n'est pas encore un diagnostic. Ce que vous avez sous les yeux vous donne l'architecture et l'ordre des émetteurs : c'est une base de raisonnement, pas une preuve. Pour conclure, il faut des mesures — températures d'entrée et de sortie de l'émetteur mis en cause, et si possible une idée du partage de débit à son piquage. Un modèle sert à savoir quoi mesurer et où. C'est déjà énorme, mais il ne remplace jamais le relevé sur l'installation réelle.", kicker: "méthode", title: "Mesurer avant de conclure", text: "Ordonne la démarche qui transforme un trajet observé en conclusion contrôlable.", cap: "Relève une valeur avant et après un émetteur.", tp: "Produis un relevé avec points, valeurs et état.", bts: "Ajoute hypothèses, conservation des débits et limites du modèle.", scene: methodScene, equivalent: "Suivre, repérer, stabiliser, relever puis justifier.", action: { type: "sequence", prompt: "Ordonne le contrôle.", items: ["Relever avant/après", "Justifier avec limites", "Suivre le sens", "Attendre la stabilisation", "Repérer dérivations et mélanges"], correctOrder: [2,4,3,0,1], explain: "Le relevé devient interprétable seulement après repérage et stabilisation." } }
    ],
    quiz: [
      { context: "Un monotube à dérivation est représenté.", question: "Que devient le débit après le partage ?", options: ["Les débits émetteur et bypass se recombinent en aval","Le débit du bypass disparaît","Chaque branche devient un circuit sans retour","La couleur suffit à prouver le sens"], correct: 0, explain: "Les deux chemins se rejoignent avant de poursuivre sur la boucle principale." },
      { context: "La flèche rencontre E1 puis E2.", question: "Quel émetteur est en amont ?", options: ["E1","E2","Les deux sans ordre","Impossible malgré la flèche"], correct: 0, explain: "L’amont se définit par le sens de circulation." },
      { context: "Modèle : 0,35 m³/h dans l’émetteur et 0,65 m³/h dans le bypass.", question: "Quel débit se retrouve après mélange ?", options: ["1,00 m³/h","0,35 m³/h","0,65 m³/h","1,35 m³/h"], correct: 0, explain: "0,35 + 0,65 = 1,00 m³/h dans le modèle sans fuite." },
      { context: "L’émetteur aval reçoit une eau plus froide dans la simulation.", question: "Quelle suite est professionnelle ?", options: ["Stabiliser, relever aux points définis et comparer","Remplacer immédiatement le circulateur","Déclarer le réseau universellement mal conçu","Ignorer les unités"], correct: 0, explain: "Une tendance simulée doit être confrontée à des mesures et au dossier réel." }
    ],
    summaryScene: methodScene,
    summaryEquivalent: "Synthèse : suivre la boucle, distinguer dérivation et bypass, comparer amont et aval puis mesurer dans un état stabilisé."
  };
})();
