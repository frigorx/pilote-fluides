(() => {
  "use strict";

  const svg = (id, title, desc, body) => `<svg viewBox="0 0 760 430" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker></defs>${body}</svg>`;

  const portsScene = svg("v3-ports", "Vanne trois voies avec ports A, B et AB", "Le modèle pédagogique suppose AB commun. A est à gauche, B à droite et AB en bas. Le marquage réel du corps et la notice restent prioritaires.", `
    <text x="380" y="40" text-anchor="middle" font-size="22" font-weight="700">IDENTIFIER AVANT DE RACCORDER</text>
    <path d="M120 185H300M460 185H640M380 265V365" stroke="#1b3a63" stroke-width="14"/>
    <image href="assets/vanne_3_voies.svg" x="295" y="115" width="170" height="170"/>
    ${[[120,185,"A"],[640,185,"B"],[380,365,"AB"]].map(([x,y,t])=>`<g><circle cx="${x}" cy="${y}" r="34" fill="#fffdf8" stroke="#3d7fca" stroke-width="6"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="22" font-weight="700">${t}</text></g>`).join("")}
    <rect x="170" y="315" width="420" height="72" rx="15" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="380" y="344" text-anchor="middle" font-size="16" font-weight="700">HYPOTHÈSE DU MODULE : AB = VOIE COMMUNE</text><text x="380" y="370" text-anchor="middle" font-size="14">Sur le terrain : lire corps, flèches et notice constructeur.</text>`);

  const mixScene = svg("v3-mix", "Montage en mélange", "Deux débits entrent par A et B et ressortent ensemble par AB. Le symbole de la vanne trois voies est au centre et les flèches convergent vers la voie commune AB.", `
    <text x="380" y="38" text-anchor="middle" font-size="23" font-weight="700">MÉLANGE : A + B → AB</text>
    <path d="M90 170H315M670 170H445M380 260V370" fill="none" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-v3-mix)"/>
    <circle cx="380" cy="190" r="80" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>
    <image href="assets/vanne_3_voies.svg" x="310" y="120" width="140" height="140"/>
    <text x="115" y="145" font-size="20" font-weight="700">A · arrivée 1</text><text x="515" y="145" font-size="20" font-weight="700">B · arrivée 2</text><text x="405" y="365" font-size="20" font-weight="700">AB · départ mélangé</text>
    <rect x="220" y="305" width="320" height="60" rx="13" fill="#e3f5ec" stroke="#1e7e54" stroke-width="5"/><text x="380" y="341" text-anchor="middle" font-size="16" font-weight="700">FLÈCHES CONVERGENTES</text>`);

  const divertScene = svg("v3-divert", "Montage en répartition", "Le débit entre par la voie commune AB puis se répartit vers A et B. Le symbole de la vanne trois voies est au centre et les flèches divergent depuis AB.", `
    <text x="380" y="38" text-anchor="middle" font-size="23" font-weight="700">RÉPARTITION : AB → A + B</text>
    <path d="M380 370V255M315 170H90M445 170H670" fill="none" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-v3-divert)"/>
    <circle cx="380" cy="190" r="80" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>
    <image href="assets/vanne_3_voies.svg" x="310" y="120" width="140" height="140"/>
    <text x="115" y="145" font-size="20" font-weight="700">A · sortie 1</text><text x="515" y="145" font-size="20" font-weight="700">B · sortie 2</text><text x="405" y="365" font-size="20" font-weight="700">AB · arrivée commune</text>
    <rect x="220" y="305" width="320" height="60" rx="13" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="380" y="341" text-anchor="middle" font-size="16" font-weight="700">FLÈCHES DIVERGENTES</text>`);

  function temperatureScene(openA = 60) {
    const a = openA / 100;
    const b = 1 - a;
    const mixed = a * 55 + b * 30;
    return svg("v3-temp", "Mélange thermique pédagogique d’une vanne trois voies", `Débit total un mètre cube par heure. La voie A apporte ${a.toFixed(2)} mètre cube par heure à 55 degrés et B ${b.toFixed(2)} à 30 degrés. Sans pertes, le mélange AB vaut ${mixed.toFixed(1)} degrés.`, `
      <text x="380" y="35" text-anchor="middle" font-size="21" font-weight="700">MODÈLE PÉDAGOGIQUE · MÉLANGE SANS PERTES</text>
      <path d="M70 155H315M690 155H445M380 245V365" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-v3-temp)"/>
      <circle cx="380" cy="175" r="78" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/><text x="380" y="170" text-anchor="middle" font-size="17" font-weight="700">V3V</text><text x="380" y="197" text-anchor="middle" font-size="14">AB commune</text>
      <rect x="60" y="235" width="205" height="84" rx="14" fill="#fffdf8" stroke="#c9451a" stroke-width="4" stroke-dasharray="10 6"/><text x="162" y="263" text-anchor="middle" font-size="16" font-weight="700">A · CHAUD</text><text x="162" y="290" text-anchor="middle" font-size="17">${a.toFixed(2)} m³/h · 55 °C</text>
      <rect x="495" y="235" width="205" height="84" rx="14" fill="#fffdf8" stroke="#3d7fca" stroke-width="4"/><text x="597" y="263" text-anchor="middle" font-size="16" font-weight="700">B · RETOUR</text><text x="597" y="290" text-anchor="middle" font-size="17">${b.toFixed(2)} m³/h · 30 °C</text>
      <rect x="270" y="340" width="220" height="66" rx="14" fill="#e3f5ec" stroke="#1e7e54" stroke-width="5"/><text x="380" y="367" text-anchor="middle" font-size="16" font-weight="700">AB · 1,00 m³/h</text><text x="380" y="392" text-anchor="middle" font-size="18">${mixed.toFixed(1)} °C</text>`);
  }

  const methodScene = svg("v3-method", "Contrôle d’un raccordement de vanne trois voies", "La méthode lit le marquage et la notice, repère la voie commune, trace les flèches selon la fonction, vérifie l’actionneur, puis observe températures et débits après stabilisation.", `
    ${["Lire corps","Repérer AB","Tracer sens","Tester action","Mesurer stable"].map((t,i)=>`<g transform="translate(${90+i*145} 215)"><circle r="38" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text y="6" text-anchor="middle" font-size="18" font-weight="700">${i+1}</text><text y="70" text-anchor="middle" font-size="13" font-weight="700">${t}</text>${i<4?`<path d="M43 0H95" stroke="#3d7fca" stroke-width="5" marker-end="url(#arr-v3-method)"/>`:""}</g>`).join("")}
    <text x="380" y="68" text-anchor="middle" font-size="22" font-weight="700">LE NOM DES VOIES NE SUFFIT PAS : CONTRÔLER LE SENS AUTORISÉ</text>
    <text x="380" y="365" text-anchor="middle" font-size="15">Le symbole montre une fonction ; la vanne réelle impose sa documentation.</text>`);

  window.STATION_CONFIG = {
    code: "D4", id: "v3v", title: "Vanne trois voies — Trois voies, une fonction", next: "poursuivre vers la station Équilibrage",
    levels: {
      CAP: { objective: "Nommer les trois voies A, B et AB de la vanne.", assessment: "nommer A, B, AB et suivre une flèche" },
      TP: { objective: "Identifier les trois voies, suivre les flèches et contrôler l’effet du raccordement.", assessment: "nommer A, B, AB et distinguer mélange ou répartition" },
      BTS: { objective: "Analyser le montage et vérifier un bilan de mélange simplifié.", assessment: "justifier la fonction, le sens et les limites du modèle" }
    },
    steps: [
      { short: "Voies", kicker: "identifier", title: "A, B et AB : lire le corps", text: "Le module suppose AB commun. Ce repère doit être contrôlé sur la vanne réelle.", cap: "Nomme les trois voies A, B et AB.", tp: "Associe chaque position visible à son nom.", bts: "Sépare la convention du modèle des prescriptions constructeur.", scene: portsScene, equivalent: "A à gauche, B à droite et AB en bas dans ce modèle pédagogique.", action: { type: "match", prompt: "Identifie les trois voies.", options: ["A","B","AB"], items: [{label:"Voie gauche",answer:0},{label:"Voie droite",answer:1},{label:"Voie commune basse",answer:2}], explain: "L’identification est exacte pour ce dessin ; le marquage réel reste prioritaire." } },
      { short: "Mélanger", kicker: "converger", title: "Deux entrées vers une sortie commune", text: "En mélange, les flèches de A et B convergent vers AB.", cap: "Suis les deux flèches qui vont vers AB.", tp: "Trace les arrivées et le départ mélangé.", bts: "Vérifie la conservation du débit et le bilan thermique.", scene: mixScene, equivalent: "Les voies A et B alimentent la voie commune AB : A plus B vers AB.", action: { type: "sequence", prompt: "Construis le trajet de mélange.", items: ["Sortir par AB","Entrer par B","Se rejoindre dans la vanne","Entrer par A"], correctOrder: [3,1,2,0], explain: "Les deux entrées convergent dans la vanne et ressortent par la voie commune." } },
      { short: "Répartir", kicker: "diverger", title: "Une entrée commune vers deux sorties", text: "En répartition, le débit entre par AB puis se partage vers A et B.", cap: "Suis la flèche qui part de AB.", tp: "Compare les flèches avec le montage précédent.", bts: "Vérifie que le type de vanne autorise le service prévu.", scene: divertScene, equivalent: "La voie commune AB alimente A et B : AB vers A plus B.", action: { type: "choice", prompt: "Quel sens correspond à la répartition montrée ?", options: [{label:"AB → A + B"},{label:"A + B → AB"},{label:"A → B sans voie commune"}], correct: 0, explain: "Les flèches divergent depuis la voie commune AB." } },
      { short: "Doser", kicker: "mesurer", title: "La position change le mélange", text: "Fais varier la part de débit chaud A. Les données sont créées pour l’exercice.", cap: "Lis la température de sortie après avoir bougé le curseur.", tp: "Lis les débits et la température de sortie.", bts: "Vérifie la moyenne pondérée pour l’eau, sans pertes.", scene: temperatureScene, equivalent: (v) => { const a=v/100,m=a*55+(1-a)*30; return `Donnée pédagogique : A fournit ${a.toFixed(2)} m³/h à 55 °C, B ${(1-a).toFixed(2)} m³/h à 30 °C et AB sort à ${m.toFixed(1)} °C.`; }, action: { type: "range", prompt: "Déplace la position virtuelle vers A.", label: "Part du débit par A", min: 0, max: 100, step: 10, value: 60, evaluate: (v) => { const a=v/100,m=a*55+(1-a)*30; return {readout:`${v} %`,observation:`T_AB = ${a.toFixed(2)} × 55 + ${(1-a).toFixed(2)} × 30 = ${m.toFixed(1)} °C.`}; } } },
      { short: "Contrôler", kicker: "terrain", title: "Le raccordement se prouve par l’effet", text: "Ordonne un contrôle qui respecte le corps de vanne, la notice et la stabilisation.", cap: "Lis le corps de la vanne avant de la toucher.", tp: "Contrôle position, sens et températures sans desserrer un raccord.", bts: "Relie commande, autorité et réponse mesurée dans une étude séparée.", scene: methodScene, equivalent: "Lire, repérer la commune, tracer le sens, tester l’action puis mesurer après stabilisation.", action: { type: "sequence", prompt: "Ordonne la vérification.", items: ["Observer l’effet stabilisé","Lire le marquage et la notice","Tester l’actionneur selon procédure","Repérer la voie commune","Tracer les flèches attendues"], correctOrder: [1,3,4,2,0], explain: "La fonction n’est confirmée qu’après lecture documentaire et observation cohérente." } }
    ],
    quiz: [
      { context: "Le modèle suppose AB commun.", question: "Quel trajet représente un mélange ?", options: ["A + B → AB","AB → A + B","A → B seulement","AB fermé sans mesure"], correct: 0, explain: "Deux arrivées convergent vers la voie commune." },
      { context: "La flèche entre par AB puis se sépare.", question: "Quelle fonction est montrée ?", options: ["Répartition","Mélange","Filtration","Purge"], correct: 0, explain: "Une entrée commune alimente deux sorties." },
      { context: "A = 0,60 m³/h et B = 0,40 m³/h.", question: "Quel débit total sort par AB dans le modèle sans fuite ?", options: ["1,00 m³/h","0,60 m³/h","0,40 m³/h","1,40 m³/h"], correct: 0, explain: "Les débits se somment : 0,60 + 0,40 = 1,00 m³/h." },
      { context: "Une vanne réelle porte des flèches différentes du dessin.", question: "Quelle décision est correcte ?", options: ["Suivre le corps et la notice de la vanne réelle","Forcer le raccordement du module","Effacer le marquage","Conclure sans essai"], correct: 0, explain: "Le module enseigne une méthode ; la documentation du matériel réel fait foi." }
    ],
    summaryScene: methodScene,
    summaryEquivalent: "Synthèse : identifier les voies, distinguer convergence et divergence, vérifier la conservation puis contrôler le matériel réel."
  };
})();
