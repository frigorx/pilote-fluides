"use strict";

const assetLibrary = "assets/symboles-bibliotheque/";
const assetCvc = "assets/symboles-cvc/";
const moduleRegistry = globalThis.HydroModules || { stations: {}, lines: {} };
const integrationVersion = "20260823g";

function navigateLocal(href) {
  const separator = href.includes("?") ? "&" : "?";
  window.location.assign(`${href}${separator}v=${integrationVersion}`);
}

const lines = {
  P: {
    name: "Principes",
    color: "#c9451a",
    radius: "50%",
    path: "M75 120 H815",
    stations: ["boucle", "energie", "debit", "delta-t", "puissance", "mesurer"]
  },
  E: {
    name: "Équipements",
    color: "#1e7e54",
    radius: "5px",
    path: "M340 25 V500",
    stations: ["production", "echangeur", "debit", "circulateur", "pertes", "vase", "securite"]
  },
  D: {
    name: "Distribution",
    color: "#3d7fca",
    radius: "50%",
    path: "M75 305 H820",
    stations: ["monotube", "bitube", "pertes", "v3v", "equilibrage", "plancher"]
  },
  M: {
    name: "Mesure & diagnostic",
    color: "#71508f",
    radius: "50%",
    path: "M815 120 V205 Q815 250 650 305 Q610 320 540 395 H150",
    stations: ["mesurer", "releves", "equilibrage", "tampon", "decouplage", "diagnostic", "mission"]
  }
};

const stations = {
  boucle: {
    title: "Boucle",
    kicker: "Se repérer",
    lines: ["P"], x: 75, y: 120, dx: 0, dy: -26, anchor: "middle",
    lead: "L’eau quitte la production, traverse le réseau puis revient. Le départ et le retour appartiennent au même circuit fermé.",
    key: "Sans continuité de la boucle, aucune circulation durable n’est possible.",
    visual: ["DÉPART", "USAGES", "RETOUR"], symbol: assetCvc + "radiateur.svg",
    question: "Que forment le départ et le retour d’un réseau fermé ?",
    answers: ["Deux installations indépendantes", "Une même boucle de circulation", "Une réserve d’eau sanitaire"], correct: 1,
    explain: "Le départ et le retour sont deux parties de la même boucle hydraulique."
  },
  energie: {
    title: "Énergie",
    kicker: "Transporter la chaleur",
    lines: ["P"], x: 200, y: 120, dx: 0, dy: -26, anchor: "middle",
    lead: "L’eau transporte de l’énergie entre la production et les usages. Elle n’est pas elle-même la source de chaleur.",
    key: "Suivre le trajet de l’eau aide à suivre le transfert d’énergie.",
    visual: ["PRODUCTION", "EAU", "ÉMETTEUR"], symbol: assetLibrary + "echangeur_a_plaques.svg",
    question: "Quel est ici le rôle principal de l’eau ?",
    answers: ["Transporter de l’énergie", "Créer seule de la chaleur", "Supprimer les pertes de charge"], correct: 0,
    explain: "Dans ce modèle, l’eau est le fluide qui transporte l’énergie thermique."
  },
  debit: {
    title: "Débit",
    kicker: "Correspondance P ↔ E",
    lines: ["P", "E"], x: 340, y: 120, dx: 25, dy: -26, anchor: "start",
    lead: "Le débit indique la quantité d’eau qui traverse une section pendant un temps donné. Il résulte de la pompe et de la résistance du réseau.",
    key: "Le débit n’est pas fixé par le circulateur seul : le réseau participe au point de fonctionnement.",
    visual: ["POMPE", "DÉBIT", "RÉSEAU"], symbol: assetLibrary + "pompe_debit_variable.svg",
    question: "De quoi dépend le débit réellement obtenu ?",
    answers: ["De la pompe seule", "De la couleur des tubes", "De la pompe et de la résistance du réseau"], correct: 2,
    explain: "Le point de fonctionnement naît de la rencontre entre le circulateur et le réseau."
  },
  "delta-t": {
    title: "Écart ΔT",
    kicker: "Comparer deux températures",
    lines: ["P"], x: 500, y: 120, dx: 0, dy: -26, anchor: "middle",
    lead: "Le ΔT hydraulique compare la température de départ à celle du retour. Il doit être associé au débit pour raisonner sur la puissance.",
    key: "Un ΔT isolé décrit un écart ; il ne nomme pas, à lui seul, une panne.",
    visual: ["DÉPART 45 °C", "ΔT", "RETOUR 38 °C"], symbol: null,
    question: "Avec un départ à 45 °C et un retour à 38 °C, quel est le ΔT ?",
    answers: ["7 K", "38 K", "83 K"], correct: 0,
    explain: "45 − 38 = 7. Un écart de température peut s’exprimer en kelvins."
  },
  puissance: {
    title: "Puissance",
    kicker: "Relier Q et ΔT",
    lines: ["P"], x: 650, y: 120, dx: 0, dy: -26, anchor: "middle",
    lead: "Pour l’eau, la relation pédagogique P ≈ 1,16 × Q × ΔT relie puissance, débit et écart de température.",
    key: "Avec Q en m³/h et ΔT en K, le résultat approché P est exprimé en kW.",
    visual: ["Q", "× 1,16 ×", "ΔT = P"], symbol: null,
    question: "Si le débit double et que le ΔT reste identique, que devient la puissance transportée dans ce modèle ?",
    answers: ["Elle double", "Elle est divisée par deux", "Elle ne change pas"], correct: 0,
    explain: "Dans cette relation, la puissance est proportionnelle au débit."
  },
  mesurer: {
    title: "Mesurer",
    kicker: "Correspondance P ↔ M",
    lines: ["P", "M"], x: 815, y: 120, dx: 0, dy: -26, anchor: "middle",
    lead: "Une grandeur devient utile si son point de mesure, son unité et l’état de fonctionnement sont connus.",
    key: "Noter où, quoi, quand et avec quelle unité avant d’interpréter.",
    visual: ["POINT", "MESURE", "CONTEXTE"], symbol: null,
    question: "Quel relevé est le plus exploitable ?",
    answers: ["« C’est chaud »", "« 42 °C au départ, installation stabilisée »", "« La pompe semble normale »"], correct: 1,
    explain: "La valeur, le lieu et l’état de fonctionnement rendent le relevé interprétable."
  },
  production: {
    title: "Production",
    kicker: "Entrée de la ligne E",
    lines: ["E"], x: 340, y: 25, dx: 25, dy: 5, anchor: "start",
    lead: "La production transmet de l’énergie à l’eau. Le composant réel peut être une chaudière, une pompe à chaleur ou un échangeur.",
    key: "Distinguer la fonction hydraulique du type exact de générateur.",
    visual: ["SOURCE", "TRANSFERT", "EAU"], symbol: assetLibrary + "echangeur_a_plaques.svg",
    question: "Que faut-il identifier en premier sur un schéma simplifié ?",
    answers: ["La fonction de production", "La marque commerciale", "La couleur du capot"], correct: 0,
    explain: "La fonction permet de lire le circuit avant d’entrer dans les détails du matériel."
  },
  echangeur: {
    title: "Échangeur",
    kicker: "Séparer deux fluides",
    lines: ["E"], x: 340, y: 67, dx: 25, dy: 5, anchor: "start",
    lead: "Un échangeur transfère de l’énergie entre deux circuits sans les mélanger dans son fonctionnement normal.",
    key: "Deux circuits peuvent échanger de la chaleur tout en restant hydrauliquement séparés.",
    visual: ["PRIMAIRE", "ÉCHANGE", "SECONDAIRE"], symbol: assetLibrary + "echangeur_a_plaques.svg",
    question: "Dans un échangeur à plaques en état normal, les deux fluides…",
    answers: ["se mélangent", "échangent de la chaleur sans se mélanger", "circulent toujours au même débit"], correct: 1,
    explain: "Les plaques permettent le transfert thermique tout en séparant les fluides."
  },
  circulateur: {
    title: "Circulateur",
    kicker: "Mettre l’eau en mouvement",
    lines: ["E"], x: 340, y: 200, dx: 25, dy: 5, anchor: "start",
    lead: "Le circulateur fournit l’énergie nécessaire pour vaincre les pertes de charge et maintenir la circulation.",
    key: "Augmenter la vitesse peut modifier débit, bruit et consommation ; il faut mesurer l’effet.",
    visual: ["ASPIRATION", "POMPE", "REFOULEMENT"], symbol: assetLibrary + "pompe_debit_variable.svg",
    question: "Quel contrôle accompagne un changement de réglage du circulateur ?",
    answers: ["Mesurer l’effet obtenu", "Repeindre les tuyaux", "Fermer toutes les branches"], correct: 0,
    explain: "Le nouveau réglage doit être vérifié par des mesures et des observations."
  },
  pertes: {
    title: "Pertes de charge",
    kicker: "Correspondance E ↔ D",
    lines: ["E", "D"], x: 340, y: 305, dx: 0, dy: 36, anchor: "middle",
    lead: "Tubes, coudes, filtres et vannes s’opposent à l’écoulement. Leur effet cumulé influence le débit.",
    key: "Réduire un passage augmente généralement la résistance de cette branche.",
    visual: ["AMONT", "RÉSISTANCE", "AVAL"], symbol: assetLibrary + "filtre_hydraulique.svg",
    question: "Que provoque la fermeture progressive d’une vanne sur une branche ?",
    answers: ["Une baisse de sa résistance", "Une hausse de sa résistance", "La disparition du retour"], correct: 1,
    explain: "Le passage plus réduit augmente la résistance et tend à diminuer le débit de la branche."
  },
  vase: {
    title: "Vase d’expansion",
    kicker: "Accompagner la dilatation",
    lines: ["E"], x: 340, y: 410, dx: 25, dy: 40, anchor: "start",
    lead: "Dans un réseau fermé, le vase reçoit une partie de la variation de volume de l’eau lorsque sa température change.",
    key: "Le vase contribue à maîtriser la pression, mais ne remplace pas la soupape.",
    visual: ["RÉSEAU", "VARIATION", "VASE"], symbol: assetCvc + "vase-expansion.svg",
    question: "Quel est le rôle principal du vase d’expansion ?",
    answers: ["Filtrer l’eau", "Recevoir la variation de volume", "Créer le débit"], correct: 1,
    explain: "Le vase accompagne la dilatation de l’eau dans la boucle fermée."
  },
  securite: {
    title: "Sécurité",
    kicker: "Sortie de la ligne E",
    lines: ["E"], x: 340, y: 500, dx: 25, dy: 5, anchor: "start",
    lead: "Les dispositifs de sécurité protègent l’installation. Leur présence, leur tarage et leur évacuation doivent correspondre au système réel.",
    key: "Ne jamais condamner un organe de sécurité pour masquer un symptôme.",
    visual: ["PRESSION", "SOUPAPE", "ÉVACUATION"], symbol: assetCvc + "soupape-securite.svg",
    question: "Que faire si une soupape évacue régulièrement ?",
    answers: ["La bloquer", "Chercher la cause et contrôler l’installation", "Supprimer le vase"], correct: 1,
    explain: "L’écoulement est un symptôme à diagnostiquer ; neutraliser la protection serait dangereux."
  },
  monotube: {
    title: "Monotube",
    kicker: "Entrée de la ligne D",
    lines: ["D"], x: 75, y: 305, dx: 0, dy: -25, anchor: "middle",
    lead: "Dans une distribution monotube, les émetteurs partagent une boucle principale et influencent les conditions rencontrées en aval.",
    key: "Observer le chemin unique et l’ordre des émetteurs.",
    visual: ["ÉMETTEUR 1", "BOUCLE", "ÉMETTEUR 2"], symbol: assetCvc + "radiateur.svg",
    question: "Quel repère caractérise le monotube simplifié ?",
    answers: ["Une boucle principale commune", "Un départ indépendant par émetteur", "L’absence de retour"], correct: 0,
    explain: "La succession sur une boucle principale est le repère essentiel de ce schéma."
  },
  bitube: {
    title: "Bitube",
    kicker: "Distribuer en parallèle",
    lines: ["D"], x: 210, y: 305, dx: 0, dy: 29, anchor: "middle",
    lead: "Dans un réseau bitube, chaque émetteur est relié à un départ et à un retour communs, ce qui crée des branches en parallèle.",
    key: "Les branches proches et éloignées ne présentent pas nécessairement la même résistance.",
    visual: ["DÉPART", "BRANCHES", "RETOUR"], symbol: assetCvc + "radiateur.svg",
    question: "Comment les émetteurs d’un bitube sont-ils organisés ?",
    answers: ["En branches entre départ et retour", "Tous en série sans dérivation", "Sans circulateur possible"], correct: 0,
    explain: "Les émetteurs forment des branches parallèles entre les collecteurs de départ et de retour."
  },
  v3v: {
    title: "Vanne trois voies",
    kicker: "Mélanger ou répartir",
    lines: ["D"], x: 490, y: 305, dx: 0, dy: -25, anchor: "middle",
    lead: "Une vanne trois voies peut assurer des fonctions différentes selon le raccordement et le sens de circulation.",
    key: "Identifier les trois voies et les flèches avant de nommer mélange ou décharge.",
    visual: ["VOIE A", "V3V", "VOIES B / AB"], symbol: assetLibrary + "vanne_3_voies.svg",
    question: "Que faut-il vérifier avant de nommer le rôle d’une V3V ?",
    answers: ["Sa couleur", "Les voies et le sens de circulation", "La taille du local"], correct: 1,
    explain: "Le raccordement hydraulique détermine la fonction réelle de la vanne."
  },
  equilibrage: {
    title: "Équilibrage",
    kicker: "Correspondance D ↔ M",
    lines: ["D", "M"], x: 650, y: 305, dx: 0, dy: 29, anchor: "middle",
    lead: "L’équilibrage ajuste les résistances pour rapprocher le débit de chaque branche de son besoin.",
    key: "Une action, une stabilisation, un nouveau relevé : le réglage doit être prouvé.",
    visual: ["BRANCHE A", "RÉGLAGE", "BRANCHE B"], symbol: assetLibrary + "vanne_manuelle.svg",
    question: "Quelle méthode convient à un réglage d’équilibrage ?",
    answers: ["Tout modifier en même temps", "Régler, stabiliser, mesurer à nouveau", "Se fier seulement au bruit"], correct: 1,
    explain: "Procéder par étapes permet de relier l’action à l’effet mesuré."
  },
  plancher: {
    title: "Plancher chauffant",
    kicker: "Sortie de la ligne D",
    lines: ["D"], x: 820, y: 305, dx: 0, dy: -25, anchor: "middle",
    lead: "Les boucles d’un plancher sont réparties par des collecteurs. Leur longueur et leur réglage influencent les débits.",
    key: "Repérer départ, retour, collecteurs et boucles avant tout réglage.",
    visual: ["COLLECTEUR", "BOUCLES", "RETOUR"], symbol: assetCvc + "collecteur.svg",
    question: "Quel organe répartit l’eau entre les boucles d’un plancher ?",
    answers: ["Le collecteur", "Le vase seul", "La soupape"], correct: 0,
    explain: "Les collecteurs alimentent et recueillent les différentes boucles."
  },
  releves: {
    title: "Relevés",
    kicker: "Comparer des états",
    lines: ["M"], x: 815, y: 210, dx: 25, dy: 5, anchor: "start",
    lead: "Un relevé devient une preuve lorsqu’il est daté, localisé et comparé dans des conditions connues.",
    key: "Conserver les valeurs avant et après l’action, avec le même protocole.",
    visual: ["AVANT", "ACTION", "APRÈS"], symbol: null,
    question: "Quelle comparaison est la plus fiable ?",
    answers: ["Deux mesures prises dans des conditions connues", "Un souvenir et une impression", "Deux unités différentes non converties"], correct: 0,
    explain: "Des conditions et un protocole identifiables rendent la comparaison utile."
  },
  tampon: {
    title: "Volume tampon",
    kicker: "Stabiliser le fonctionnement",
    lines: ["M"], x: 540, y: 395, dx: 0, dy: 29, anchor: "middle",
    lead: "Un volume tampon ajoute de l’inertie et peut limiter certains cycles courts. Son rôle exact dépend du raccordement.",
    key: "Lire le schéma des piquages avant d’attribuer une fonction au ballon.",
    visual: ["PRODUCTION", "TAMPON", "USAGES"], symbol: assetCvc + "ballon-tampon.svg",
    question: "Pourquoi faut-il regarder les raccordements du ballon tampon ?",
    answers: ["Ils déterminent son rôle hydraulique", "Ils donnent sa couleur", "Ils remplacent les mesures"], correct: 0,
    explain: "Un même volume peut remplir des fonctions différentes selon la manière dont il est raccordé."
  },
  decouplage: {
    title: "Découplage",
    kicker: "Dissocier deux débits",
    lines: ["M"], x: 410, y: 395, dx: 0, dy: -22, anchor: "middle",
    lead: "Un découplage correctement conçu permet aux boucles primaire et secondaire de fonctionner avec des débits différents.",
    key: "Deux circulateurs peuvent alors répondre à deux réseaux distincts.",
    visual: ["PRIMAIRE", "DÉCOUPLAGE", "SECONDAIRE"], symbol: assetCvc + "ballon-tampon.svg",
    question: "Que permet le découplage hydraulique ?",
    answers: ["Supprimer tous les circulateurs", "Dissocier les débits primaire et secondaire", "Mélanger obligatoirement tous les retours"], correct: 1,
    explain: "Les deux boucles peuvent porter des débits différents tout en échangeant de l’énergie."
  },
  diagnostic: {
    title: "Diagnostic",
    kicker: "Croiser les indices",
    lines: ["M"], x: 280, y: 395, dx: 0, dy: 29, anchor: "middle",
    lead: "Un symptôme oriente la recherche, mais plusieurs mesures concordantes sont nécessaires avant de retenir une cause.",
    key: "Symptôme → mesures → hypothèse → vérification → décision.",
    visual: ["SYMPTÔME", "HYPOTHÈSE", "VÉRIFICATION"], symbol: assetLibrary + "filtre_hydraulique.svg",
    question: "Quel enchaînement produit le diagnostic le plus solide ?",
    answers: ["Une valeur puis une conclusion", "Plusieurs indices, une hypothèse et une vérification", "Un remplacement au hasard"], correct: 1,
    explain: "Le croisement des indices et la vérification limitent les conclusions hâtives."
  },
  mission: {
    title: "Mission réseau",
    kicker: "Terminus de la ligne M",
    lines: ["M"], x: 150, y: 395, dx: 0, dy: -22, anchor: "middle",
    lead: "Face à une branche froide, commencez par décrire l’état, relever les grandeurs utiles et comparer les chemins hydrauliques.",
    key: "La bonne décision est celle que les observations et les mesures permettent de justifier.",
    visual: ["OBSERVER", "MESURER", "DÉCIDER"], symbol: assetLibrary + "vanne_manuelle.svg",
    question: "Une branche reste froide. Quelle est la première démarche ?",
    answers: ["Changer immédiatement la pompe", "Relever l’état, les températures et les organes de la branche", "Augmenter tous les réglages"], correct: 1,
    explain: "Décrire et mesurer d’abord évite de confondre le symptôme avec sa cause."
  }
};

const els = {
  mapScreen: document.querySelector("#mapScreen"),
  stationScreen: document.querySelector("#stationScreen"),
  diagnosticScreen: document.querySelector("#diagnosticScreen"),
  metroMap: document.querySelector("#metroMap"),
  mobileRoutes: document.querySelector("#mobileRoutes"),
  lineFilters: document.querySelector("#lineFilters"),
  networkStatus: document.querySelector("#networkStatus"),
  routeStrip: document.querySelector("#routeStrip"),
  currentLineName: document.querySelector("#currentLineName"),
  stationBadge: document.querySelector("#stationBadge"),
  stationKicker: document.querySelector("#stationKicker"),
  stationTitle: document.querySelector("#stationTitle"),
  stationLead: document.querySelector("#stationLead"),
  stationVisual: document.querySelector("#stationVisual"),
  stationKey: document.querySelector("#stationKey"),
  interchanges: document.querySelector("#interchanges"),
  levelSwitcher: document.querySelector("#levelSwitcher"),
  programmeObjective: document.querySelector("#programmeObjective"),
  programmeFormats: document.querySelector("#programmeFormats"),
  programmeLearn: document.querySelector("#programmeLearn"),
  programmeCompetencies: document.querySelector("#programmeCompetencies"),
  programmePrompt: document.querySelector("#programmePrompt"),
  programmeGame: document.querySelector("#programmeGame"),
  programmeVirtual: document.querySelector("#programmeVirtual"),
  programmeStatus: document.querySelector("#programmeStatus"),
  visitStatus: document.querySelector("#visitStatus"),
  stationProgress: document.querySelector("#stationProgress"),
  prev: document.querySelector("#prevStationBtn"),
  next: document.querySelector("#nextStationBtn"),
  read: document.querySelector("#readBtn"),
  stopRead: document.querySelector("#stopReadBtn"),
  help: document.querySelector("#helpDialog"),
  diagnosticQuestion: document.querySelector("#diagnosticQuestion"),
  diagnosticResult: document.querySelector("#diagnosticResult"),
  diagnosticLineBadge: document.querySelector("#diagnosticLineBadge"),
  diagnosticVisual: document.querySelector("#diagnosticVisual"),
  diagnosticDomain: document.querySelector("#diagnosticDomain"),
  diagnosticPrompt: document.querySelector("#diagnosticPrompt"),
  diagnosticAnswers: document.querySelector("#diagnosticAnswers"),
  diagnosticFeedback: document.querySelector("#diagnosticFeedback"),
  diagnosticProgressText: document.querySelector("#diagnosticProgressText"),
  diagnosticProgressBar: document.querySelector("#diagnosticProgressBar"),
  diagnosticScore: document.querySelector("#diagnosticScore"),
  diagnosticProfile: document.querySelector("#diagnosticProfile"),
  diagnosticStrong: document.querySelector("#diagnosticStrong"),
  diagnosticReinforce: document.querySelector("#diagnosticReinforce"),
  diagnosticSkillMap: document.querySelector("#diagnosticSkillMap"),
  diagnosticRoute: document.querySelector("#diagnosticRoute"),
  diagnosticFooterStatus: document.querySelector("#diagnosticFooterStatus"),
  diagnosticPrev: document.querySelector("#diagnosticPrevBtn"),
  diagnosticNext: document.querySelector("#diagnosticNextBtn"),
  retryDiagnostic: document.querySelector("#retryDiagnosticBtn"),
  followRoute: document.querySelector("#followRouteBtn"),
  firstStation: document.querySelector("#firstStationBtn")
};

let activeFilter = "all";
let activeLine = "P";
let activeLevel = "TP";
let currentStation = "boucle";
const returnedStation = new URLSearchParams(window.location.hash.slice(1)).get("visited");
let visited = new Set(returnedStation && stations[returnedStation] ? [returnedStation] : []);
if (returnedStation) window.history.replaceState(null, "", window.location.pathname + window.location.search);
let diagnosticIndex = 0;
let diagnosticAnswers = Array(globalThis.HydroAdaptive.questions.length).fill(null);
let diagnosticOutcome = null;
let recommendedRoute = [];
let adaptiveTravel = false;

function mapMarkup() {
  const lineMarkup = Object.entries(lines).map(([id, line]) =>
    `<path class="metro-line" data-line="${id}" d="${line.path}" aria-hidden="true"></path>`
  ).join("");

  const stationMarkup = Object.entries(stations).map(([id, station]) => {
    const interchange = station.lines.length > 1;
    const playable = Boolean(moduleRegistry.stations[id]);
    const labelClass = station.title.length > 14 ? "station-label small" : "station-label";
    return `<g class="station-node${interchange ? " interchange" : ""}${playable ? " playable" : ""}" data-station="${id}" data-lines="${station.lines.join(" ")}" tabindex="0" role="button" aria-label="Station ${station.title}${interchange ? ", correspondance " + station.lines.join(" et ") : ""}${playable ? ", module jouable en QA technique" : ", cadrage disponible"}">
      <circle class="station-dot" cx="${station.x}" cy="${station.y}" r="${interchange ? 15 : 11}"></circle>
      ${interchange ? `<circle class="interchange-ring" cx="${station.x}" cy="${station.y}" r="8"></circle>` : ""}
      <text class="station-check" x="${station.x}" y="${station.y + 5}" text-anchor="middle">✓</text>
      <text class="station-recommendation" x="${station.x}" y="${station.y + 5}" text-anchor="middle"></text>
      ${playable ? `<text class="station-playable" x="${station.x + 1}" y="${station.y + 3}" text-anchor="middle">▶</text>` : ""}
      <text class="${labelClass}" x="${station.x + station.dx}" y="${station.y + station.dy}" text-anchor="${station.anchor}">${station.title}</text>
    </g>`;
  }).join("");
  return lineMarkup + stationMarkup;
}

function buildMobileRoutes() {
  els.mobileRoutes.innerHTML = Object.entries(lines).map(([lineId, line]) => `
    <section class="mobile-line" data-mobile-line="${lineId}">
      <h2><span class="line-badge line-${lineId.toLowerCase()}">${lineId}</span>${line.name}</h2>
      <div class="mobile-stations">
        ${line.stations.map((stationId) => {
          const station = stations[stationId];
          const playable = Boolean(moduleRegistry.stations[stationId]);
          return `<button type="button" class="mobile-station${station.lines.length > 1 ? " interchange" : ""}${playable ? " playable" : ""}" data-station="${stationId}" style="--mobile-color:${line.color};--mobile-radius:${line.radius}" aria-label="Ouvrir ${station.title}${playable ? ", module jouable" : ", cadrage"}"><span class="mini-dot" aria-hidden="true"></span><span class="station-name">${station.title}</span>${playable ? `<small class="mobile-ready">Jouable</small>` : ""}</button>`;
        }).join("")}
      </div>
    </section>`).join("");
}

function applyFilter(lineId) {
  activeFilter = lineId;
  els.lineFilters.querySelectorAll("[data-line]").forEach((button) => {
    const active = button.dataset.line === lineId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.metroMap.classList.toggle("is-filtered", lineId !== "all");
  els.metroMap.querySelectorAll(".metro-line").forEach((path) => path.classList.toggle("selected", lineId === "all" || path.dataset.line === lineId));
  els.metroMap.querySelectorAll(".station-node").forEach((node) => node.classList.toggle("selected", lineId === "all" || node.dataset.lines.split(" ").includes(lineId)));
  els.mobileRoutes.querySelectorAll("[data-mobile-line]").forEach((section) => { section.hidden = lineId !== "all" && section.dataset.mobileLine !== lineId; });
  const lineModule = moduleRegistry.lines[lineId];
  const text = lineId === "all" ? "22 stations · 4 lignes · 4 correspondances" : `Ligne ${lineId} · ${lines[lineId].name} · ${lines[lineId].stations.length} stations${lineModule ? " · parcours jouable" : " · cadrage"}`;
  els.networkStatus.textContent = text;
  els.firstStation.textContent = lineModule
    ? `Parcours complet Ligne ${lineId} →`
    : `Entrer par ${stations[lineId === "all" ? "boucle" : lines[lineId].stations[0]].title} →`;
}

function showMap() {
  stopSpeech();
  els.stationScreen.hidden = true;
  els.diagnosticScreen.hidden = true;
  els.mapScreen.hidden = false;
  document.body.dataset.view = "map";
  adaptiveTravel = false;
  refreshVisited();
  refreshRecommended();
  document.querySelector("#mapTitle").focus({ preventScroll: true });
}

function openStation(stationId, requestedLine) {
  const station = stations[stationId];
  if (!station) return;
  stopSpeech();
  const module = moduleRegistry.stations[stationId];
  if (module) {
    navigateLocal(module.href);
    return;
  }
  currentStation = stationId;
  visited.add(stationId);
  if (requestedLine && station.lines.includes(requestedLine)) activeLine = requestedLine;
  else if (!station.lines.includes(activeLine)) activeLine = station.lines[0];
  els.mapScreen.hidden = true;
  els.diagnosticScreen.hidden = true;
  els.stationScreen.hidden = false;
  document.body.dataset.view = "station";
  renderStation();
  els.stationTitle.focus({ preventScroll: true });
}

function renderStation() {
  const station = stations[currentStation];
  const line = lines[activeLine];
  els.currentLineName.textContent = `Ligne ${activeLine} · ${line.name}`;
  els.stationBadge.textContent = activeLine;
  els.stationBadge.className = `line-badge line-${activeLine.toLowerCase()}`;
  els.stationKicker.textContent = station.kicker;
  els.stationTitle.textContent = station.title;
  els.stationLead.textContent = station.lead;
  els.stationKey.innerHTML = `<strong>À retenir —</strong> ${station.key}`;
  renderVisual(station);
  renderRouteStrip();
  renderInterchanges(station);
  renderProgramme();
  updateFooter();
}

function renderVisual(station) {
  const [a, b, c] = station.visual;
  const color = lines[activeLine].color;
  const dash = activeLine === "E" ? "7 5" : activeLine === "M" ? "16 7 3 7" : "none";
  const symbol = station.symbol ? `<img src="${station.symbol}" alt="Symbole SVG associé à la station ${station.title}">` : "";
  els.stationVisual.classList.toggle("no-symbol", !station.symbol);
  els.stationVisual.innerHTML = `
    <svg viewBox="0 0 430 130" role="img" aria-labelledby="visualTitle visualDesc">
      <title id="visualTitle">Repère de la station ${station.title}</title>
      <desc id="visualDesc">Lecture de gauche à droite : ${a}, ${b}, ${c}.</desc>
      <defs><marker id="stationArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${color}"></path></marker></defs>
      <path d="M35 65 H395" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round" stroke-dasharray="${dash}" marker-end="url(#stationArrow)"></path>
      <circle cx="65" cy="65" r="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"></circle>
      <circle cx="215" cy="65" r="24" fill="#fffdf8" stroke="${color}" stroke-width="7"></circle>
      <circle cx="365" cy="65" r="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"></circle>
      <text x="65" y="112" text-anchor="middle" fill="#10233c" font-family="Trebuchet MS, sans-serif" font-size="12" font-weight="700">${a}</text>
      <text x="215" y="26" text-anchor="middle" fill="#10233c" font-family="Trebuchet MS, sans-serif" font-size="13" font-weight="800">${b}</text>
      <text x="365" y="112" text-anchor="middle" fill="#10233c" font-family="Trebuchet MS, sans-serif" font-size="12" font-weight="700">${c}</text>
    </svg>${symbol}`;
}

function renderRouteStrip() {
  const route = adaptiveTravel ? recommendedRoute : lines[activeLine].stations;
  els.routeStrip.setAttribute("aria-label", adaptiveTravel ? "Étapes du trajet conseillé" : "Stations de la ligne active");
  els.routeStrip.innerHTML = route.map((stationId) => {
    const routeLineId = adaptiveTravel ? stations[stationId].lines[0] : activeLine;
    const routeLine = lines[routeLineId];
    return `
    <button class="route-stop${stationId === currentStation ? " current" : ""}${visited.has(stationId) ? " visited" : ""}" type="button" data-station="${stationId}" data-route-line="${routeLineId}" style="--route-color:${routeLine.color};--route-radius:${routeLine.radius}" ${stationId === currentStation ? "aria-current=\"step\"" : ""} aria-label="Ouvrir ${stations[stationId].title}">
      <span class="route-stop-dot" aria-hidden="true"></span><span>${stations[stationId].title}</span>
    </button>`;
  }).join("");
}

function renderInterchanges(station) {
  const otherLines = station.lines.filter((id) => id !== activeLine);
  if (!otherLines.length) {
    els.interchanges.innerHTML = "";
    return;
  }
  els.interchanges.innerHTML = `<span>Correspondance :</span>${otherLines.map((id) => `<button class="interchange-button" type="button" data-switch-line="${id}"><span class="line-badge line-${id.toLowerCase()}">${id}</span>${lines[id].name}</button>`).join("")}`;
}

function renderProgramme() {
  const programme = stationPrograms[currentStation];
  const level = programme[activeLevel] || programme.TP;
  els.levelSwitcher.querySelectorAll("[data-level]").forEach((button) => {
    const active = button.dataset.level === activeLevel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.programmeObjective.textContent = level.objective;
  els.programmeFormats.innerHTML = programme.formats.map((format) => `<span>${format}</span>`).join("");
  els.programmeLearn.innerHTML = level.learn.map((item) => `<li>${item}</li>`).join("");
  els.programmePrompt.textContent = level.prompt;
  els.programmeGame.textContent = programme.game;
  els.programmeVirtual.textContent = `Pratique virtuelle prévue : ${programme.virtual}`;
  els.programmeStatus.textContent = `${trainingFramework.levels[activeLevel]} · station cadrée. Le jeu sera développé indépendamment.`;
  els.visitStatus.textContent = "Cadrée ✓";
  els.visitStatus.className = "status-pill ok";
}

function updateFooter() {
  const route = adaptiveTravel ? recommendedRoute : lines[activeLine].stations;
  const index = route.indexOf(currentStation);
  els.prev.disabled = index <= 0;
  els.next.disabled = index >= route.length - 1;
  els.prev.textContent = adaptiveTravel ? "← Étape précédente" : "← Station précédente";
  els.next.textContent = adaptiveTravel ? "Étape suivante →" : "Station suivante →";
  els.stationProgress.textContent = adaptiveTravel
    ? `Trajet conseillé · étape ${index + 1} sur ${route.length} · ${visited.size}/22 visitées`
    : `Ligne ${activeLine} · station ${index + 1} sur ${route.length} · ${visited.size}/22 visitées`;
}

function moveOnLine(delta) {
  const route = adaptiveTravel ? recommendedRoute : lines[activeLine].stations;
  const index = route.indexOf(currentStation);
  const next = route[index + delta];
  if (next) openStation(next, adaptiveTravel ? stations[next].lines[0] : activeLine);
}

function switchLine(lineId) {
  if (!stations[currentStation].lines.includes(lineId)) return;
  activeLine = lineId;
  renderStation();
  els.stationTitle.focus({ preventScroll: true });
}

function refreshVisited() {
  document.querySelectorAll("[data-station]").forEach((node) => node.classList.toggle("visited", visited.has(node.dataset.station)));
  updateFooterIfVisible();
}

function refreshRecommended() {
  document.querySelectorAll("[data-station]").forEach((node) => {
    const order = recommendedRoute.indexOf(node.dataset.station);
    node.classList.toggle("recommended", order >= 0);
    if (order >= 0) node.dataset.routeOrder = String(order + 1);
    else delete node.dataset.routeOrder;
    const marker = node.querySelector?.(".station-recommendation");
    if (marker) marker.textContent = order >= 0 ? String(order + 1) : "";
  });
}

function startDiagnostic(reset = true) {
  stopSpeech();
  if (reset) {
    diagnosticIndex = 0;
    diagnosticAnswers = Array(globalThis.HydroAdaptive.questions.length).fill(null);
    diagnosticOutcome = null;
  }
  els.mapScreen.hidden = true;
  els.stationScreen.hidden = true;
  els.diagnosticScreen.hidden = false;
  document.body.dataset.view = "diagnostic";
  renderDiagnosticQuestion();
  document.querySelector("#diagnosticTitle").focus({ preventScroll: true });
}

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

function renderDiagnosticQuestion() {
  const adaptive = globalThis.HydroAdaptive;
  const question = adaptive.questions[diagnosticIndex];
  const selected = diagnosticAnswers[diagnosticIndex];
  const answered = selected !== null;

  els.diagnosticQuestion.hidden = false;
  els.diagnosticResult.hidden = true;
  els.retryDiagnostic.hidden = true;
  els.followRoute.hidden = true;
  els.diagnosticPrev.hidden = false;
  els.diagnosticNext.hidden = false;
  els.diagnosticPrev.disabled = diagnosticIndex === 0;
  els.diagnosticNext.disabled = !answered;
  els.diagnosticNext.textContent = diagnosticIndex === adaptive.questions.length - 1 ? "Voir mon trajet →" : "Question suivante →";
  els.diagnosticProgressText.textContent = `Question ${diagnosticIndex + 1} sur ${adaptive.questions.length}`;
  els.diagnosticProgressBar.style.width = `${((diagnosticIndex + (answered ? 1 : 0)) / adaptive.questions.length) * 100}%`;
  els.diagnosticLineBadge.textContent = question.line;
  els.diagnosticLineBadge.className = `line-badge line-${question.line.toLowerCase()}`;
  els.diagnosticDomain.textContent = `Ligne ${question.line} · ${question.skills.map((id) => adaptive.skills[id].short).join(" + ")}`;
  els.diagnosticPrompt.textContent = question.prompt;
  els.diagnosticVisual.innerHTML = adaptive.visualMarkup(question.visual, question.id);
  const ordreAffichage = permutationDepuisIndex(question.answers.length, hacherTexte(question.prompt));
  els.diagnosticAnswers.innerHTML = ordreAffichage.map((originalIndex, position) => {
    const correct = answered && originalIndex === question.correct;
    const wrong = answered && originalIndex === selected && originalIndex !== question.correct;
    return `<button class="answer${correct ? " correct" : ""}${wrong ? " incorrect" : ""}" type="button" data-answer="${originalIndex}" ${answered ? "disabled" : ""} aria-pressed="${selected === originalIndex}"><span>${String.fromCharCode(65 + position)}</span>${question.answers[originalIndex]}</button>`;
  }).join("");

  els.diagnosticFeedback.className = `feedback${answered ? selected === question.correct ? " good" : " bad" : ""}`;
  els.diagnosticFeedback.textContent = answered
    ? `${selected === question.correct ? "Bien vu. " : "À reprendre. "}${question.explain}`
    : "Choisissez la réponse qui vous paraît la plus juste.";
  els.diagnosticFooterStatus.textContent = answered
    ? "Réponse verrouillée · la correction reste visible"
    : "20 questions · environ 8 minutes · aucune donnée enregistrée";
}

function answerDiagnostic(answerIndex) {
  if (diagnosticAnswers[diagnosticIndex] !== null) return;
  diagnosticAnswers[diagnosticIndex] = answerIndex;
  renderDiagnosticQuestion();
  els.diagnosticFeedback.focus?.({ preventScroll: true });
}

function moveDiagnostic(delta) {
  const next = diagnosticIndex + delta;
  if (next < 0 || next >= globalThis.HydroAdaptive.questions.length) return;
  diagnosticIndex = next;
  renderDiagnosticQuestion();
  els.diagnosticPrompt.focus?.({ preventScroll: true });
}

function renderSkillChips(target, skillIds, emptyText) {
  const adaptive = globalThis.HydroAdaptive;
  target.innerHTML = skillIds.length
    ? skillIds.map((id) => `<span>${adaptive.skills[id].short}</span>`).join("")
    : `<span>${emptyText}</span>`;
}

function showDiagnosticResult() {
  const adaptive = globalThis.HydroAdaptive;
  diagnosticOutcome = adaptive.evaluate(diagnosticAnswers);
  recommendedRoute = diagnosticOutcome.route.slice();
  adaptiveTravel = false;
  refreshRecommended();

  els.diagnosticQuestion.hidden = true;
  els.diagnosticResult.hidden = false;
  els.diagnosticPrev.hidden = true;
  els.diagnosticNext.hidden = true;
  els.retryDiagnostic.hidden = false;
  els.followRoute.hidden = false;
  els.diagnosticProgressText.textContent = "Positionnement terminé";
  els.diagnosticProgressBar.style.width = "100%";
  els.diagnosticScore.textContent = `${diagnosticOutcome.correctCount}/${diagnosticOutcome.total}`;
  els.diagnosticProfile.textContent = `${diagnosticOutcome.profile} · ${diagnosticOutcome.percent} % de repères mobilisés.`;
  renderSkillChips(els.diagnosticStrong, diagnosticOutcome.strong, "À construire pendant le parcours");
  renderSkillChips(els.diagnosticReinforce, diagnosticOutcome.reinforce, "Aucun point prioritaire détecté");
  els.diagnosticSkillMap.innerHTML = Object.entries(adaptive.skills).map(([id, skill]) => {
    const percent = Math.round(diagnosticOutcome.skillScores[id] * 100);
    return `<div class="skill-row"><span>${skill.short}</span><span class="skill-bar" aria-hidden="true"><i style="width:${percent}%"></i></span><strong>${percent} %</strong></div>`;
  }).join("");
  els.diagnosticRoute.innerHTML = recommendedRoute.map((stationId, index) => {
    const station = stations[stationId];
    const lineId = station.lines[0];
    return `<li><span class="line-badge line-${lineId.toLowerCase()}">${lineId}</span><strong>${index + 1}. ${station.title}</strong></li>`;
  }).join("");
  els.diagnosticFooterStatus.textContent = `${recommendedRoute.length} station${recommendedRoute.length > 1 ? "s" : ""} conseillée${recommendedRoute.length > 1 ? "s" : ""} · toutes les autres restent accessibles`;
  document.querySelector("#diagnosticResultTitle").focus?.({ preventScroll: true });
}

function followRecommendedRoute() {
  if (!recommendedRoute.length) return;
  adaptiveTravel = true;
  const first = recommendedRoute[0];
  openStation(first, stations[first].lines[0]);
}

function updateFooterIfVisible() {
  if (!els.stationScreen.hidden) updateFooter();
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  els.read.setAttribute("aria-pressed", "false");
  els.read.disabled = false;
  els.stopRead.disabled = true;
}

function readStation() {
  if (!("speechSynthesis" in window)) {
    els.programmeStatus.textContent = "La lecture vocale n’est pas disponible. Le texte complet reste affiché.";
    return;
  }
  stopSpeech();
  const station = stations[currentStation];
  const programme = stationPrograms[currentStation][activeLevel] || stationPrograms[currentStation].TP;
  const utterance = new SpeechSynthesisUtterance(`${station.title}. ${station.lead} Objectif ${trainingFramework.levels[activeLevel]}. ${programme.objective} À apprendre. ${programme.learn.join(" ")} Mission. ${programme.prompt}`);
  utterance.lang = "fr-FR";
  utterance.rate = 0.95;
  utterance.onend = stopSpeech;
  utterance.onerror = stopSpeech;
  els.read.setAttribute("aria-pressed", "true");
  els.read.disabled = true;
  els.stopRead.disabled = false;
  window.speechSynthesis.speak(utterance);
}

els.metroMap.innerHTML += mapMarkup();
buildMobileRoutes();
applyFilter("all");
refreshVisited();
refreshRecommended();

els.lineFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-line]");
  if (button) applyFilter(button.dataset.line);
});

function handleStationChoice(event) {
  const node = event.target.closest("[data-station]");
  if (!node) return;
  const requested = activeFilter !== "all" && stations[node.dataset.station].lines.includes(activeFilter) ? activeFilter : undefined;
  openStation(node.dataset.station, requested);
}

els.metroMap.addEventListener("click", handleStationChoice);
els.metroMap.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const node = event.target.closest("[data-station]");
  if (!node) return;
  event.preventDefault();
  openStation(node.dataset.station, activeFilter !== "all" ? activeFilter : undefined);
});
els.mobileRoutes.addEventListener("click", handleStationChoice);
els.routeStrip.addEventListener("click", (event) => {
  const button = event.target.closest("[data-station]");
  if (button) openStation(button.dataset.station, button.dataset.routeLine || activeLine);
});
els.levelSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-level]");
  if (!button) return;
  activeLevel = button.dataset.level;
  stopSpeech();
  renderProgramme();
});
els.interchanges.addEventListener("click", (event) => {
  const button = event.target.closest("[data-switch-line]");
  if (button) switchLine(button.dataset.switchLine);
});

els.firstStation.addEventListener("click", () => {
  adaptiveTravel = false;
  const lineModule = moduleRegistry.lines[activeFilter];
  if (lineModule) {
    stopSpeech();
    navigateLocal(lineModule.href);
    return;
  }
  const lineId = activeFilter === "all" ? "P" : activeFilter;
  openStation(lines[lineId].stations[0], lineId);
});
document.querySelector("#diagnosticBtn").addEventListener("click", () => startDiagnostic(true));
document.querySelector("#diagnosticCardBtn").addEventListener("click", () => startDiagnostic(true));
document.querySelector("#diagnosticMapBtn").addEventListener("click", showMap);
els.diagnosticAnswers.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (button) answerDiagnostic(Number(button.dataset.answer));
});
els.diagnosticPrev.addEventListener("click", () => moveDiagnostic(-1));
els.diagnosticNext.addEventListener("click", () => {
  if (diagnosticAnswers[diagnosticIndex] === null) return;
  if (diagnosticIndex === globalThis.HydroAdaptive.questions.length - 1) showDiagnosticResult();
  else moveDiagnostic(1);
});
els.retryDiagnostic.addEventListener("click", () => startDiagnostic(true));
els.followRoute.addEventListener("click", followRecommendedRoute);
document.querySelector("#backToMapBtn").addEventListener("click", showMap);
document.querySelector("#prevStationBtn").addEventListener("click", () => moveOnLine(-1));
document.querySelector("#nextStationBtn").addEventListener("click", () => moveOnLine(1));
document.querySelector("#helpBtn").addEventListener("click", () => {
  if (typeof els.help.showModal === "function") els.help.showModal();
  else els.help.setAttribute("open", "");
});
els.read.addEventListener("click", readStation);
els.stopRead.addEventListener("click", stopSpeech);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && (!els.stationScreen.hidden || !els.diagnosticScreen.hidden) && !els.help.open) showMap();
});
window.addEventListener("beforeunload", stopSpeech);
