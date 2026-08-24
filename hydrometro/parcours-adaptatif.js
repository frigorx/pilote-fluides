"use strict";

(function exposeAdaptivePath(global) {
  const skills = {
    schema: { label: "Lire un schéma", short: "Schéma" },
    boucle: { label: "Boucle et énergie", short: "Boucle" },
    debit: { label: "Débit", short: "Débit" },
    puissance: { label: "Température et puissance", short: "Puissance" },
    equipements: { label: "Équipements", short: "Équipements" },
    circulateur: { label: "Circulateur", short: "Pompe" },
    pertes: { label: "Pertes de charge", short: "Pertes" },
    distribution: { label: "Distribution", short: "Réseaux" },
    reglage: { label: "Réglage et équilibrage", short: "Réglage" },
    securite: { label: "Pression et sécurité", short: "Sécurité" },
    mesure: { label: "Mesurer et comparer", short: "Mesure" },
    diagnostic: { label: "Diagnostiquer", short: "Diagnostic" }
  };

  const questions = [
    {
      id: "p1", line: "P", skills: ["schema", "boucle"], visual: "loop",
      prompt: "Sur ce circuit fermé, que représentent le départ et le retour ?",
      answers: ["Deux réseaux indépendants", "Deux parties d’une même boucle", "Une arrivée et une évacuation d’eau sanitaire"],
      correct: 1,
      explain: "Le départ et le retour forment une seule boucle : l’eau quitte la production puis y revient.",
      stations: ["boucle"]
    },
    {
      id: "p2", line: "P", skills: ["boucle", "equipements"], visual: "energy",
      prompt: "Quel est le rôle de l’eau entre la production et l’émetteur ?",
      answers: ["Créer seule la chaleur", "Transporter l’énergie thermique", "Supprimer les pertes de charge"],
      correct: 1,
      explain: "L’eau est ici le fluide caloporteur : elle transporte l’énergie sans être la source.",
      stations: ["energie", "production"]
    },
    {
      id: "p3", line: "P", skills: ["debit", "mesure"], visual: "flow",
      prompt: "Quel relevé décrit correctement un débit volumique ?",
      answers: ["1,4 m³/h au débitmètre", "1,4 bar au thermomètre", "1,4 kW au manomètre"],
      correct: 0,
      explain: "Le débit volumique peut s’exprimer en m³/h. Le point de mesure et l’unité doivent être nommés.",
      stations: ["debit", "mesurer"]
    },
    {
      id: "p4", line: "P", skills: ["puissance", "mesure"], visual: "temperatures",
      prompt: "Le départ est à 45 °C et le retour à 38 °C. Quel est le ΔT ?",
      answers: ["7 K", "38 K", "83 K"],
      correct: 0,
      explain: "45 − 38 = 7. Un écart de température s’exprime ici en kelvins.",
      stations: ["delta-t"]
    },
    {
      id: "p5", line: "P", skills: ["debit", "puissance"], visual: "power",
      prompt: "Avec P ≈ 1,16 × Q × ΔT, Q = 2 m³/h et ΔT = 5 K. Quelle puissance est transportée ?",
      answers: ["2,32 kW", "11,6 kW", "58 kW"],
      correct: 1,
      explain: "1,16 × 2 × 5 = 11,6 kW. Le calcul relie débit, écart de température et puissance.",
      stations: ["puissance", "debit", "delta-t"]
    },
    {
      id: "e1", line: "E", skills: ["schema", "equipements"], visual: "exchanger",
      prompt: "Dans un échangeur en état normal, que font les deux fluides ?",
      answers: ["Ils se mélangent", "Ils échangent de la chaleur sans se mélanger", "Ils ont forcément le même débit"],
      correct: 1,
      explain: "L’échangeur transfère de l’énergie tout en maintenant la séparation hydraulique des circuits.",
      stations: ["echangeur"]
    },
    {
      id: "e2", line: "E", skills: ["debit", "circulateur", "pertes"], visual: "pump",
      prompt: "De quoi dépend le débit réellement obtenu dans ce réseau ?",
      answers: ["Du circulateur seul", "Du réseau seul", "De la rencontre entre la courbe du circulateur et celle du réseau"],
      correct: 2,
      explain: "Le point de fonctionnement résulte de la pompe et de la résistance du réseau.",
      stations: ["debit", "circulateur", "pertes"]
    },
    {
      id: "e3", line: "E", skills: ["pertes", "reglage"], visual: "valve",
      prompt: "Une vanne est progressivement fermée sur une branche. Que devient sa résistance hydraulique ?",
      answers: ["Elle augmente", "Elle disparaît", "Elle diminue toujours"],
      correct: 0,
      explain: "La réduction du passage augmente généralement la résistance et tend à diminuer le débit de la branche.",
      stations: ["pertes", "equilibrage"]
    },
    {
      id: "e4", line: "E", skills: ["equipements", "securite"], visual: "expansion",
      prompt: "Quel organe reçoit une partie de la variation de volume de l’eau quand elle chauffe ?",
      answers: ["Le filtre", "Le vase d’expansion", "Le clapet antiretour"],
      correct: 1,
      explain: "Le vase accompagne la dilatation de l’eau et contribue à maîtriser la pression du circuit fermé.",
      stations: ["vase"]
    },
    {
      id: "e5", line: "E", skills: ["securite", "diagnostic"], visual: "safety",
      prompt: "Une soupape évacue régulièrement. Quelle conduite est correcte ?",
      answers: ["La bloquer pour arrêter la fuite", "Chercher la cause et contrôler l’installation", "Supprimer le vase"],
      correct: 1,
      explain: "La soupape est une protection. Son déclenchement est un symptôme à diagnostiquer, jamais à neutraliser.",
      stations: ["securite", "diagnostic"]
    },
    {
      id: "d1", line: "D", skills: ["schema", "distribution"], visual: "bitube",
      prompt: "Quel schéma représente des émetteurs en branches entre un départ et un retour communs ?",
      answers: ["Le bitube", "Le monotube sans dérivation", "Une évacuation gravitaire"],
      correct: 0,
      explain: "Dans un bitube, les émetteurs sont raccordés en parallèle entre le départ et le retour.",
      stations: ["bitube"]
    },
    {
      id: "d2", line: "D", skills: ["boucle", "distribution"], visual: "monotube",
      prompt: "Dans une boucle monotube simplifiée, que peut provoquer un émetteur sur ceux placés en aval ?",
      answers: ["Aucune influence possible", "Une modification des conditions d’eau rencontrées en aval", "La création d’un second départ général"],
      correct: 1,
      explain: "Les émetteurs se succèdent sur la boucle principale : l’amont influence donc les conditions en aval.",
      stations: ["monotube"]
    },
    {
      id: "d3", line: "D", skills: ["schema", "reglage"], visual: "threeway",
      prompt: "Avant de décider qu’une vanne trois voies mélange ou répartit, que faut-il lire ?",
      answers: ["La couleur de l’actionneur", "Les trois voies et le sens de circulation", "La longueur du local"],
      correct: 1,
      explain: "La fonction réelle dépend du raccordement et du sens de circulation, pas du seul symbole.",
      stations: ["v3v"]
    },
    {
      id: "d4", line: "D", skills: ["reglage", "mesure"], visual: "balance",
      prompt: "Quelle séquence prouve l’effet d’un réglage d’équilibrage ?",
      answers: ["Régler toutes les vannes puis écouter", "Mesurer, régler, stabiliser, mesurer à nouveau", "Augmenter la vitesse du circulateur sans relever de valeur"],
      correct: 1,
      explain: "L’état initial et le nouveau relevé, réalisés selon le même protocole, permettent d’attribuer l’effet au réglage.",
      stations: ["equilibrage", "releves"]
    },
    {
      id: "d5", line: "D", skills: ["distribution", "reglage", "equipements"], visual: "manifold",
      prompt: "Quel organe répartit l’eau entre les boucles d’un plancher chauffant ?",
      answers: ["Le collecteur", "La soupape seule", "Le vase d’expansion"],
      correct: 0,
      explain: "Les collecteurs de départ et de retour distribuent l’eau entre les différentes boucles.",
      stations: ["plancher"]
    },
    {
      id: "m1", line: "M", skills: ["mesure", "diagnostic"], visual: "measurement",
      prompt: "Quel relevé est directement exploitable pour un diagnostic ?",
      answers: ["« C’est chaud »", "« 42 °C au départ, installation stabilisée à 10 h 15 »", "« La pompe semble normale »"],
      correct: 1,
      explain: "La grandeur, le point, l’unité et l’état de fonctionnement rendent le relevé vérifiable.",
      stations: ["mesurer", "releves"]
    },
    {
      id: "m2", line: "M", skills: ["mesure", "reglage"], visual: "beforeafter",
      prompt: "Pour comparer avant et après une action, quelle règle est essentielle ?",
      answers: ["Changer aussi l’unité", "Conserver un protocole et des conditions identifiables", "Se fier au souvenir de la première valeur"],
      correct: 1,
      explain: "Une comparaison exige des mesures localisées et réalisées selon un protocole cohérent.",
      stations: ["releves", "equilibrage"]
    },
    {
      id: "m3", line: "M", skills: ["schema", "equipements", "diagnostic"], visual: "buffer",
      prompt: "Pourquoi faut-il lire les piquages d’un ballon tampon avant de nommer son rôle ?",
      answers: ["Parce que son raccordement détermine sa fonction hydraulique", "Parce qu’ils indiquent sa couleur", "Parce qu’ils remplacent toute mesure"],
      correct: 0,
      explain: "Selon ses raccordements, le volume peut ajouter de l’inertie, découpler des débits ou remplir plusieurs fonctions.",
      stations: ["tampon"]
    },
    {
      id: "m4", line: "M", skills: ["debit", "equipements", "schema"], visual: "decoupling",
      prompt: "Que permet un découplage hydraulique correctement conçu ?",
      answers: ["Dissocier les débits primaire et secondaire", "Supprimer tous les circulateurs", "Imposer le même débit à toutes les boucles"],
      correct: 0,
      explain: "Les boucles primaire et secondaire peuvent fonctionner avec des débits différents.",
      stations: ["decouplage"]
    },
    {
      id: "m5", line: "M", skills: ["diagnostic", "mesure"], visual: "diagnosis",
      prompt: "Une branche reste froide. Quel enchaînement produit le diagnostic le plus solide ?",
      answers: ["Remplacer la pompe immédiatement", "Symptôme, mesures, hypothèse, vérification, décision", "Augmenter tous les réglages"],
      correct: 1,
      explain: "On décrit et mesure d’abord, puis on vérifie une hypothèse avant de décider.",
      stations: ["diagnostic", "mission"]
    }
  ];

  const stationOrder = [
    "boucle", "energie", "debit", "delta-t", "puissance", "mesurer",
    "production", "echangeur", "circulateur", "pertes", "vase", "securite",
    "monotube", "bitube", "v3v", "equilibrage", "plancher", "releves",
    "tampon", "decouplage", "diagnostic", "mission"
  ];

  const foundationalRoute = [
    "boucle", "energie", "debit", "delta-t", "mesurer", "production",
    "circulateur", "pertes", "bitube", "equilibrage", "diagnostic", "mission"
  ];

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function evaluate(answers) {
    const skillTotals = Object.fromEntries(Object.keys(skills).map((id) => [id, { correct: 0, total: 0 }]));
    const missedStations = new Set();
    let correctCount = 0;

    questions.forEach((question, index) => {
      const correct = Number(answers[index]) === question.correct;
      if (correct) correctCount += 1;
      else question.stations.forEach((station) => missedStations.add(station));
      question.skills.forEach((skill) => {
        skillTotals[skill].total += 1;
        if (correct) skillTotals[skill].correct += 1;
      });
    });

    const skillScores = Object.fromEntries(Object.entries(skillTotals).map(([id, score]) => [
      id,
      score.total ? score.correct / score.total : 0
    ]));
    const percent = Math.round((correctCount / questions.length) * 100);
    const strong = Object.keys(skills).filter((id) => skillScores[id] >= 0.75);
    const reinforce = Object.keys(skills).filter((id) => skillScores[id] < 0.6);
    let route;

    if (percent < 45) {
      route = foundationalRoute.slice();
    } else {
      route = stationOrder.filter((station) => missedStations.has(station));
      if (reinforce.includes("mesure") && !route.includes("mesurer")) route.unshift("mesurer");
      if (reinforce.includes("diagnostic") && !route.includes("diagnostic")) route.push("diagnostic");
      if (!route.includes("mission")) route.push("mission");
      route = [...new Set(route)].slice(0, 12);
    }

    if (percent === 100) route = ["mission"];

    return {
      correctCount,
      total: questions.length,
      percent,
      skillScores,
      strong,
      reinforce,
      route,
      profile: percent >= 80 ? "Consolidation ciblée" : percent >= 45 ? "Parcours conseillé" : "Fondations prioritaires"
    };
  }

  function escapeText(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function visualMarkup(type, questionId) {
    const titleId = `diagTitle-${questionId}`;
    const descId = `diagDesc-${questionId}`;
    const common = `viewBox="0 0 520 230" role="img" aria-labelledby="${titleId} ${descId}"`;
    const head = (title, desc) => `<title id="${titleId}">${escapeText(title)}</title><desc id="${descId}">${escapeText(desc)}</desc>`;
    const arrow = `<defs><marker id="arrow-${questionId}" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto"><path d="M0 0 L12 6 L0 12 Z" fill="#c9451a"/></marker></defs>`;
    const pipe = (d, color = "#c9451a", width = 12, marker = true) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${marker ? ` marker-end="url(#arrow-${questionId})"` : ""}/>`;
    const label = (x, y, text, size = 16, anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="#10233c" font-family="Trebuchet MS,Arial,sans-serif" font-size="${size}" font-weight="800">${escapeText(text)}</text>`;
    const station = (x, y, text) => `<circle cx="${x}" cy="${y}" r="24" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>${label(x, y + 6, text, 15)}`;
    let body = "";
    let title = "Schéma hydraulique de positionnement";
    let desc = "Illustration technique simplifiée accompagnant la question.";

    switch (type) {
      case "loop":
        title = "Boucle hydraulique fermée";
        desc = "L’eau part de la production, traverse un émetteur puis revient à la production.";
        body = pipe("M90 62 H420 V168 H90 V62", "#c9451a", 12, false) + station(90, 62, "P") + station(420, 168, "E") + label(255, 44, "DÉPART →") + label(255, 197, "← RETOUR");
        break;
      case "energy":
        title = "Transport d’énergie par l’eau";
        desc = "La production transmet de l’énergie à l’eau, puis l’émetteur la cède au local.";
        body = pipe("M82 116 H438") + `<rect x="38" y="73" width="90" height="86" rx="16" fill="#fff0e9" stroke="#1b3a63" stroke-width="5"/><rect x="392" y="73" width="90" height="86" rx="16" fill="#eaf3fb" stroke="#1b3a63" stroke-width="5"/>` + label(83, 108, "SOURCE", 14) + label(83, 132, "CHALEUR", 14) + label(437, 108, "ÉMETTEUR", 14) + label(437, 132, "LOCAL", 14) + label(260, 95, "EAU = TRANSPORT", 15);
        break;
      case "flow":
        title = "Mesure du débit volumique";
        desc = "Un débitmètre indique 1,4 mètre cube par heure sur une conduite en circulation.";
        body = arrow + pipe("M45 125 H475") + `<rect x="195" y="65" width="130" height="104" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/><circle cx="260" cy="110" r="31" fill="#eaf3fb" stroke="#3d7fca" stroke-width="5"/>` + label(260, 116, "1,4", 25) + label(260, 151, "m³/h", 18) + label(260, 42, "DÉBITMÈTRE", 16);
        break;
      case "temperatures":
        title = "Écart de température départ retour";
        desc = "Le départ est à 45 degrés Celsius et le retour à 38 degrés Celsius.";
        body = arrow + pipe("M58 78 H462") + pipe("M462 170 H58", "#3d7fca") + label(118, 58, "DÉPART 45 °C", 17) + label(400, 211, "RETOUR 38 °C", 17) + `<rect x="205" y="91" width="110" height="58" rx="14" fill="#fffdf8" stroke="#71508f" stroke-width="5"/>` + label(260, 127, "ΔT = ?", 22);
        break;
      case "power":
        title = "Relation débit écart de température puissance";
        desc = "La puissance est calculée avec 1,16 multiplié par le débit de 2 mètres cubes par heure et l’écart de 5 kelvins.";
        body = `<rect x="45" y="73" width="115" height="84" rx="16" fill="#eaf3fb" stroke="#3d7fca" stroke-width="5"/><rect x="203" y="73" width="115" height="84" rx="16" fill="#fff0e9" stroke="#c9451a" stroke-width="5"/><rect x="361" y="73" width="115" height="84" rx="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="5"/>` + label(102, 106, "Q = 2", 19) + label(102, 132, "m³/h", 16) + label(260, 106, "ΔT = 5", 19) + label(260, 132, "K", 16) + label(418, 106, "P = ?", 19) + label(418, 132, "kW", 16) + label(260, 43, "P ≈ 1,16 × Q × ΔT", 20) + label(181, 121, "×", 25) + label(339, 121, "→", 25);
        break;
      case "exchanger":
        title = "Échangeur séparant deux circuits";
        desc = "Le circuit primaire rouge et le circuit secondaire bleu échangent de la chaleur sans se mélanger.";
        body = arrow + pipe("M42 70 H210 V160 H42", "#c9451a") + pipe("M478 160 H310 V70 H478", "#3d7fca") + `<rect x="210" y="45" width="100" height="140" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>` + [230,245,260,275,290].map((x, i) => `<path d="M${x} 62 v106" stroke="${i % 2 ? "#3d7fca" : "#c9451a"}" stroke-width="5"/>`).join("") + label(108, 41, "PRIMAIRE", 15) + label(412, 206, "SECONDAIRE", 15) + label(260, 215, "SÉPARÉS", 15);
        break;
      case "pump":
        title = "Point de fonctionnement du circulateur et du réseau";
        desc = "Une courbe descendante de pompe rencontre une courbe montante de réseau au point de fonctionnement.";
        body = `<path d="M75 185 V35 M75 185 H465" stroke="#1b3a63" stroke-width="5" fill="none"/><path d="M92 55 C200 65 330 120 445 176" stroke="#1e7e54" stroke-width="8" fill="none"/><path d="M93 178 C205 168 330 105 445 48" stroke="#c9451a" stroke-width="8" fill="none"/><circle cx="291" cy="113" r="13" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>` + label(173, 66, "POMPE", 15) + label(391, 67, "RÉSEAU", 15) + label(307, 102, "POINT", 13, "start") + label(270, 219, "DÉBIT →", 16) + `<text x="30" y="112" transform="rotate(-90 30 112)" text-anchor="middle" fill="#10233c" font-family="Trebuchet MS,Arial,sans-serif" font-size="16" font-weight="800">PRESSION</text>`;
        break;
      case "valve":
        title = "Vanne qui réduit le passage";
        desc = "Le passage dans la vanne se rétrécit et la résistance de la branche augmente.";
        body = arrow + pipe("M45 120 H185", "#3d7fca") + pipe("M335 120 H475", "#3d7fca") + `<path d="M185 65 L260 120 L185 175 Z M335 65 L260 120 L335 175 Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="7"/><path d="M260 40 V91" stroke="#c9451a" stroke-width="8"/><circle cx="260" cy="30" r="15" fill="#fff0e9" stroke="#c9451a" stroke-width="5"/>` + label(260, 215, "PASSAGE RÉDUIT", 17);
        break;
      case "expansion":
        title = "Vase d’expansion raccordé au réseau";
        desc = "Un vase à membrane reçoit une partie de la variation de volume du circuit fermé.";
        body = arrow + pipe("M45 70 H475", "#c9451a") + `<path d="M260 70 V105" stroke="#1b3a63" stroke-width="8"/><rect x="205" y="105" width="110" height="100" rx="46" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/><path d="M211 154 Q260 126 309 154" fill="#eaf3fb" stroke="#3d7fca" stroke-width="5"/>` + label(260, 137, "AIR", 15) + label(260, 184, "EAU", 15) + label(98, 48, "RÉSEAU FERMÉ", 16);
        break;
      case "safety":
        title = "Soupape de sécurité";
        desc = "La soupape évacue vers une conduite visible lorsque la pression atteint son seuil.";
        body = arrow + pipe("M45 155 H475", "#c9451a") + `<path d="M260 155 V92" stroke="#1b3a63" stroke-width="8"/><path d="M215 92 H305 L260 48 Z" fill="#fff0e9" stroke="#c9451a" stroke-width="6"/><path d="M305 92 H385 V38" stroke="#71508f" stroke-width="8" fill="none"/>` + label(260, 31, "SOUPAPE", 16) + label(405, 36, "ÉVACUATION", 14, "start") + label(140, 191, "PRESSION RÉSEAU", 15);
        break;
      case "bitube":
        title = "Distribution bitube en parallèle";
        desc = "Trois émetteurs sont raccordés en branches entre un départ rouge et un retour bleu.";
        body = arrow + pipe("M45 55 H475", "#c9451a") + pipe("M475 190 H45", "#3d7fca") + [130,260,390].map((x, i) => `<path d="M${x} 55 V88 M${x} 158 V190" stroke="#1b3a63" stroke-width="7"/><rect x="${x - 36}" y="88" width="72" height="70" rx="10" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>${label(x, 130, `E${i + 1}`, 17)}`).join("");
        break;
      case "monotube":
        title = "Distribution monotube en série hydraulique";
        desc = "Trois émetteurs se succèdent le long d’une boucle principale orientée de gauche à droite.";
        body = arrow + pipe("M40 120 H480", "#c9451a") + [120,260,400].map((x, i) => `<rect x="${x - 42}" y="74" width="84" height="92" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>${label(x, 116, `E${i + 1}`, 18)}${label(x, 141, i === 0 ? "AMONT" : i === 2 ? "AVAL" : "PUIS", 11)}`).join("");
        break;
      case "threeway":
        title = "Vanne trois voies et sens de circulation";
        desc = "Les voies A et B rejoignent la voie AB ; les flèches indiquent ici une fonction de mélange.";
        body = arrow + pipe("M45 70 H225", "#c9451a") + pipe("M45 170 H225", "#3d7fca") + pipe("M295 120 H475", "#71508f") + `<path d="M225 65 L295 120 L225 175 Z M295 65 L225 120 L295 175 Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>` + label(72, 52, "A", 18) + label(72, 205, "B", 18) + label(445, 101, "AB", 18) + label(260, 218, "LIRE LES FLÈCHES", 15);
        break;
      case "balance":
        title = "Réglage et mesure avant après";
        desc = "Une première mesure est suivie d’un réglage, d’une stabilisation et d’une nouvelle mesure.";
        body = [
          [70, "1", "MESURER", "#3d7fca"], [195, "2", "RÉGLER", "#c9451a"],
          [325, "3", "STABILISER", "#71508f"], [450, "4", "REMESURER", "#1e7e54"]
        ].map(([x, n, word, color]) => `<circle cx="${x}" cy="103" r="37" fill="#fffdf8" stroke="${color}" stroke-width="7"/>${label(x, 112, n, 24)}${label(x, 170, word, 12)}`).join("") + `<path d="M108 103 H157 M233 103 H287 M363 103 H412" stroke="#1b3a63" stroke-width="5" marker-end="url(#arrow-${questionId})"/>`;
        break;
      case "manifold":
        title = "Collecteurs et boucles de plancher chauffant";
        desc = "Un collecteur de départ alimente trois boucles qui reviennent vers un collecteur de retour.";
        body = `<rect x="72" y="35" width="376" height="34" rx="16" fill="#fff0e9" stroke="#c9451a" stroke-width="6"/><rect x="72" y="174" width="376" height="34" rx="16" fill="#eaf3fb" stroke="#3d7fca" stroke-width="6"/>` + [145,260,375].map((x, i) => `<path d="M${x} 69 V98 Q${x} 123 ${x + 45} 123 Q${x + 75} 123 ${x + 75} 151 V174" fill="none" stroke="#1b3a63" stroke-width="6"/>${label(x + 38, 116, `BOUCLE ${i + 1}`, 11)}`).join("") + label(260, 25, "COLLECTEUR DÉPART", 15) + label(260, 228, "COLLECTEUR RETOUR", 15);
        break;
      case "measurement":
        title = "Relevé localisé et contextualisé";
        desc = "Le thermomètre au départ indique 42 degrés Celsius à 10 heures 15, installation stabilisée.";
        body = arrow + pipe("M45 138 H475", "#c9451a") + `<circle cx="225" cy="97" r="52" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/><path d="M225 132 V138" stroke="#1b3a63" stroke-width="7"/>` + label(225, 94, "42 °C", 23) + label(225, 118, "DÉPART", 13) + `<rect x="330" y="48" width="145" height="64" rx="12" fill="#e3f5ec" stroke="#1e7e54" stroke-width="5"/>` + label(402, 75, "10 h 15", 16) + label(402, 98, "STABILISÉ", 13);
        break;
      case "beforeafter":
        title = "Comparaison avant et après";
        desc = "Deux mesures sont comparées autour d’une seule action selon le même protocole.";
        body = `<rect x="38" y="62" width="130" height="110" rx="16" fill="#eaf3fb" stroke="#3d7fca" stroke-width="6"/><rect x="352" y="62" width="130" height="110" rx="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="6"/><circle cx="260" cy="117" r="48" fill="#fff0e9" stroke="#c9451a" stroke-width="6"/>` + label(103, 101, "AVANT", 18) + label(103, 132, "VALEUR 1", 15) + label(260, 111, "UNE", 15) + label(260, 134, "ACTION", 15) + label(417, 101, "APRÈS", 18) + label(417, 132, "VALEUR 2", 15) + `<path d="M170 117 H205 M315 117 H350" stroke="#1b3a63" stroke-width="5" marker-end="url(#arrow-${questionId})"/>`;
        break;
      case "buffer":
        title = "Ballon tampon et quatre piquages";
        desc = "Un ballon vertical relie une production et des usages par quatre piquages ; son rôle dépend de ces raccordements.";
        body = arrow + `<rect x="205" y="28" width="110" height="174" rx="52" fill="#fffdf8" stroke="#1b3a63" stroke-width="7"/><path d="M48 68 H205 M48 164 H205 M315 68 H472 M315 164 H472" stroke="#c9451a" stroke-width="9" fill="none"/><path d="M315 164 H472 M48 164 H205" stroke="#3d7fca" stroke-width="9"/>` + label(260, 108, "VOLUME", 17) + label(260, 135, "TAMPON", 17) + label(88, 49, "PRODUCTION", 14) + label(425, 49, "USAGES", 14) + label(260, 225, "LIRE LES 4 PIQUAGES", 15);
        break;
      case "decoupling":
        title = "Découplage des débits primaire et secondaire";
        desc = "Une boucle primaire et une boucle secondaire sont séparées par un organe de découplage et portent des débits différents.";
        body = arrow + `<rect x="230" y="42" width="60" height="146" rx="25" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/><path d="M45 73 H230 M230 158 H45" stroke="#c9451a" stroke-width="10"/><path d="M290 73 H475 M475 158 H290" stroke="#3d7fca" stroke-width="10"/>` + label(112, 42, "PRIMAIRE", 15) + label(408, 42, "SECONDAIRE", 15) + label(110, 121, "Q₁", 22) + label(410, 121, "Q₂", 22) + label(260, 220, "Q₁ PEUT DIFFÉRER DE Q₂", 15);
        break;
      case "diagnosis":
        title = "Chaîne de diagnostic hydraulique";
        desc = "Le diagnostic progresse du symptôme aux mesures, puis à l’hypothèse, à la vérification et à la décision.";
        body = [
          [55, "SYMPTÔME", "?", "#c9451a"], [160, "MESURES", "1 2", "#3d7fca"],
          [260, "HYPOTHÈSE", "H", "#71508f"], [365, "VÉRIFIER", "✓", "#1e7e54"], [465, "DÉCIDER", "→", "#1b3a63"]
        ].map(([x, word, symbol, color]) => `<circle cx="${x}" cy="105" r="34" fill="#fffdf8" stroke="${color}" stroke-width="7"/>${label(x, 114, symbol, 22)}${label(x, 167, word, 11)}`).join("") + `<path d="M90 105 H124 M195 105 H224 M295 105 H329 M400 105 H429" stroke="#1b3a63" stroke-width="5" marker-end="url(#arrow-${questionId})"/>`;
        break;
      default:
        body = station(130, 115, "A") + station(390, 115, "B") + pipe("M155 115 H365");
    }

    const marker = body.includes(`id="arrow-${questionId}"`) ? "" : arrow;
    return `<svg ${common}>${head(title, desc)}${marker}${body}</svg>`;
  }

  global.HydroAdaptive = Object.freeze({
    skills: Object.freeze(skills),
    questions: Object.freeze(questions),
    evaluate,
    visualMarkup,
    clamp
  });
})(globalThis);
