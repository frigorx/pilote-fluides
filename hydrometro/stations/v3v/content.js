(() => {
  "use strict";

  const fr = (n, d = 2) => n.toFixed(d).replace(".", ",");

  const svg = (id, title, desc, body) => `<svg viewBox="0 0 760 430" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker></defs>${body}</svg>`;

  const portsScene = svg("v3-ports", "Vanne trois voies avec ports A, B et AB", "Le modèle pédagogique suppose AB commun. A est à gauche, B à droite et AB en bas. Le marquage réel du corps et la notice restent prioritaires.", `
    <text x="380" y="40" text-anchor="middle" font-size="22" font-weight="700">IDENTIFIER AVANT DE RACCORDER</text>
    <path d="M120 185H300M460 185H640M380 265V365" stroke="#1b3a63" stroke-width="14"/>
    <image href="assets/vanne_3_voies.svg" x="295" y="115" width="170" height="170"/>
    ${[[120,185,"A"],[640,185,"B"],[380,365,"AB"]].map(([x,y,t])=>`<g><circle cx="${x}" cy="${y}" r="34" fill="#fffdf8" stroke="#3d7fca" stroke-width="6"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="22" font-weight="700">${t}</text></g>`).join("")}
    <rect x="90" y="315" width="580" height="72" rx="15" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="380" y="344" text-anchor="middle" font-size="20" font-weight="700">HYPOTHÈSE : AB = VOIE COMMUNE</text><text x="380" y="370" text-anchor="middle" font-size="20">Sur le terrain, lire corps, flèches et notice.</text>`);

  const boisseauAnimee = `<svg viewBox="0 0 760 430" role="img" aria-labelledby="v3v-titre v3v-desc" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif">
  <title id="v3v-titre">Vanne trois voies en mélange : trois positions, une sortie plus ou moins chaude</title>
  <desc id="v3v-desc">La voie A reçoit l'eau chaude du départ, la voie B reçoit l'eau du retour, la voie AB envoie le mélange vers les émetteurs. Le boisseau tourne : en position 0 seule B passe, la sortie est froide ; à 50 pour cent les deux se mélangent, la sortie est tiède ; à 100 seule A passe, la sortie est chaude.</desc>
  <defs>
    <marker id="v3v-fl-o" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker>
    <marker id="v3v-fl-b" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#3d7fca"/></marker>
    <marker id="v3v-fl-m" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#b06a00"/></marker>
  </defs>
  <rect x="10" y="10" width="740" height="410" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
  <text x="380" y="46" text-anchor="middle" font-size="22" font-weight="700" fill="#1b3a63">VANNE TROIS VOIES : LE MÉLANGE SE RÈGLE</text>
  <g id="v3v-conduites" stroke-width="12" fill="none">
    <path d="M60 200 H300" stroke="#1b3a63"/>
    <path d="M380 340 V280" stroke="#1b3a63"/>
    <path d="M460 200 H700" stroke="#1b3a63"/>
  </g>
  <g id="v3v-flux-a"><path d="M70 200 H250" stroke="#c9451a" stroke-width="6" fill="none" marker-end="url(#v3v-fl-o)"/></g>
  <g id="v3v-flux-b"><path d="M380 335 V260" stroke="#3d7fca" stroke-width="6" fill="none" marker-end="url(#v3v-fl-b)"/></g>
  <g id="v3v-sortie"><path d="M470 200 H660" stroke="#b06a00" stroke-width="6" fill="none" marker-end="url(#v3v-fl-m)"/></g>
  <g id="v3v-corps">
    <circle cx="380" cy="200" r="80" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/>
    <g id="v3v-boisseau" transform="rotate(45 380 200)">
      <path d="M380 200 L300 200 A80 80 0 0 1 380 120 Z" fill="#1b3a63" opacity=".18"/>
      <path d="M380 200 L320 260" stroke="#1b3a63" stroke-width="10" stroke-linecap="round"/>
    </g>
    <circle cx="380" cy="200" r="10" fill="#1b3a63"/>
  </g>
  <g font-size="20" font-weight="700" text-anchor="middle">
    <rect x="70" y="140" width="190" height="34" rx="9" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/><text x="165" y="164" fill="#c9451a">A · DÉPART CHAUD</text>
    <rect x="300" y="352" width="160" height="34" rx="9" fill="#fffdf8" stroke="#3d7fca" stroke-width="2"/><text x="380" y="376" fill="#3d7fca">B · RETOUR</text>
    <rect x="490" y="140" width="200" height="34" rx="9" fill="#fffdf8" stroke="#b06a00" stroke-width="2"/><text x="590" y="164" fill="#b06a00">AB · VERS ÉMETTEURS</text>
  </g>
  <g id="v3v-position" font-size="20" font-weight="700" text-anchor="middle">
    <rect x="60" y="260" width="170" height="60" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
    <text x="145" y="284" fill="#637285">POSITION</text>
    <text id="v3v-position-valeur" x="145" y="310" fill="#1b3a63">50 %</text>
  </g>
  <g id="v3v-etat" font-size="20" font-weight="700" text-anchor="middle">
    <rect x="530" y="260" width="170" height="60" rx="12" fill="#fffdf8" stroke="#b06a00" stroke-width="2"/>
    <text x="615" y="284" fill="#637285">SORTIE</text>
    <text id="v3v-etat-valeur" x="615" y="310" fill="#b06a00">tiède</text>
  </g>
  <text x="380" y="410" text-anchor="middle" font-size="20" fill="#637285">0 % : froid · 50 % : tiède · 100 % : chaud — le débit de sortie ne change pas.</text>
</svg>
<div class="flux-controls">
  <button type="button" data-position="0">0 %</button>
  <button type="button" data-position="50">50 %</button>
  <button type="button" data-position="100">100 %</button>
  <p class="flux-etat" aria-live="polite">Position 50 % : les deux voies se mélangent, la sortie est tiède.</p>
</div>`;

  function brancherV3V(scene) {
    const boisseau = scene.querySelector("#v3v-boisseau");
    const fluxA = scene.querySelector("#v3v-flux-a");
    const fluxB = scene.querySelector("#v3v-flux-b");
    const sortieTrait = scene.querySelector("#v3v-sortie path");
    const posTexte = scene.querySelector("#v3v-position-valeur");
    const etatTexte = scene.querySelector("#v3v-etat-valeur");
    const etat = scene.querySelector(".flux-etat");
    const boutons = Array.from(scene.querySelectorAll("[data-position]"));
    if (!boisseau || !fluxA || !fluxB || !sortieTrait || !posTexte || !etatTexte || !etat || !boutons.length) return;
    const etats = {
      0: { angle: 0, aOp: .12, bOp: 1, couleur: "#3d7fca", mot: "froide", phrase: "Position 0 % : seule la voie B passe, la sortie est froide." },
      50: { angle: 45, aOp: .6, bOp: .6, couleur: "#b06a00", mot: "tiède", phrase: "Position 50 % : les deux voies se mélangent, la sortie est tiède." },
      100: { angle: 90, aOp: 1, bOp: .12, couleur: "#c9451a", mot: "chaude", phrase: "Position 100 % : seule la voie A passe, la sortie est chaude." }
    };
    let angleActuel = 45, cible = 50, animeEn = false, derniereFrame = 0;
    function peindre(valeur) {
      const e = etats[valeur];
      posTexte.textContent = `${valeur} %`;
      etatTexte.textContent = e.mot;
      etatTexte.setAttribute("fill", e.couleur);
      sortieTrait.setAttribute("stroke", e.couleur);
      fluxA.style.opacity = String(e.aOp);
      fluxB.style.opacity = String(e.bOp);
    }
    function animer(temps) {
      if (!animeEn) return;
      if (!derniereFrame) derniereFrame = temps;
      const dt = temps - derniereFrame;
      derniereFrame = temps;
      const cibleAngle = etats[cible].angle;
      const pas = dt / 5;
      if (Math.abs(cibleAngle - angleActuel) <= pas) { angleActuel = cibleAngle; animeEn = false; }
      else { angleActuel += Math.sign(cibleAngle - angleActuel) * pas; }
      boisseau.setAttribute("transform", `rotate(${angleActuel.toFixed(1)} 380 200)`);
      if (!animeEn) { peindre(cible); etat.textContent = etats[cible].phrase; }
      else requestAnimationFrame(animer);
    }
    boutons.forEach((bouton) => {
      bouton.addEventListener("click", () => {
        const valeur = Number(bouton.dataset.position);
        if (valeur === cible && !animeEn) return;
        cible = valeur; animeEn = true; derniereFrame = 0;
        requestAnimationFrame(animer);
      });
    });
    boisseau.setAttribute("transform", `rotate(${angleActuel} 380 200)`);
    peindre(cible);
    etat.textContent = etats[cible].phrase;
  }

  const divertScene = svg("v3-divert", "Montage en répartition", "Le débit entre par la voie commune AB puis se répartit vers A et B. Le symbole de la vanne trois voies est au centre et les flèches divergent depuis AB.", `
    <text x="380" y="38" text-anchor="middle" font-size="23" font-weight="700">RÉPARTITION : AB → A + B</text>
    <path d="M380 370V255M315 170H90M445 170H670" fill="none" stroke="#1b3a63" stroke-width="14" marker-end="url(#arr-v3-divert)"/>
    <circle cx="380" cy="190" r="80" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/>
    <image href="assets/vanne_3_voies.svg" x="310" y="120" width="140" height="140"/>
    <text x="115" y="145" font-size="20" font-weight="700">A · sortie 1</text><text x="515" y="145" font-size="20" font-weight="700">B · sortie 2</text><rect x="400" y="376" width="270" height="34" rx="6" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><text x="405" y="400" font-size="20" font-weight="700">AB · arrivée commune</text>
    <rect x="220" y="305" width="320" height="60" rx="13" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="380" y="341" text-anchor="middle" font-size="20" font-weight="700">FLÈCHES DIVERGENTES</text>`);

  const methodScene = svg("v3-method", "Contrôle d’un raccordement de vanne trois voies", "La méthode lit le marquage et la notice, repère la voie commune, trace les flèches selon la fonction, vérifie l’actionneur, puis observe températures et débits après stabilisation.", `
    ${["Lire corps","Repérer AB","Tracer sens","Tester","Mesurer"].map((t,i)=>`<g transform="translate(${90+i*145} 215)"><circle r="38" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text y="6" text-anchor="middle" font-size="20" font-weight="700">${i+1}</text><text y="70" text-anchor="middle" font-size="20" font-weight="700">${t}</text>${i<4?`<path d="M43 0H95" stroke="#3d7fca" stroke-width="5" marker-end="url(#arr-v3-method)"/>`:""}</g>`).join("")}
    <text x="380" y="68" text-anchor="middle" font-size="22" font-weight="700">LE NOM DES VOIES NE SUFFIT PAS : CONTRÔLER LE SENS AUTORISÉ</text>
    <text x="380" y="350" text-anchor="middle" font-size="20">Le symbole montre une fonction ;</text><text x="380" y="375" text-anchor="middle" font-size="20">la vanne réelle impose sa documentation.</text>`);

  window.STATION_CONFIG = {
    code: "D4", id: "v3v", title: "Vanne trois voies — Trois voies, une fonction", next: "poursuivre vers la station Équilibrage",
    levels: {
      CAP: { objective: "Nommer les trois voies A, B et AB de la vanne.", assessment: "nommer A, B, AB et suivre une flèche" },
      TP: { objective: "Identifier les trois voies, suivre les flèches et contrôler l’effet du raccordement.", assessment: "nommer A, B, AB et distinguer mélange ou répartition" },
      BTS: { objective: "Analyser le montage et vérifier un bilan de mélange simplifié.", assessment: "justifier la fonction, le sens et les limites du modèle" }
    },
    steps: [
      { short: "Voies", narration: "Trois voies, trois raccordements, et un piège qui fait trébucher beaucoup de professionnels. Deux voies latérales, souvent repérées A et B, et une voie commune, repérée AB. Le module suppose ici que AB est la voie commune, et c'est le cas le plus fréquent — mais ce repère doit être contrôlé sur la vanne réelle. Les marquages varient selon les fabricants, et une vanne remontée dans le mauvais sens fonctionnera à l'envers de ce que le schéma annonce. Lire le corps de la vanne avant de raisonner : c'est le geste qui vous évitera de longues recherches inutiles.", kicker: "identifier", title: "A, B et AB : lire le corps", text: "Le module suppose AB commun. Ce repère doit être contrôlé sur la vanne réelle.", cap: "Nommez les trois voies A, B et AB.", tp: "Associez chaque position visible à son nom.", bts: "Séparez la convention du modèle des prescriptions constructeur.", scene: portsScene, equivalent: "A à gauche, B à droite et AB en bas dans ce modèle pédagogique.", action: { type: "match", prompt: "Identifiez les trois voies.", options: ["A","B","AB"], items: [{label:"Voie gauche",answer:0},{label:"Voie droite",answer:1},{label:"Voie commune basse",answer:2}], explain: "L’identification est exacte pour ce dessin ; le marquage réel reste prioritaire." } },
      { short: "Mélanger", narration: "Voici la première fonction possible : le mélange. Deux arrivées, une sortie commune. Une eau chaude arrive par une voie, une eau plus froide par l'autre, et le mélange repart par la voie commune à une température intermédiaire. C'est le montage le plus courant en chauffage : il permet d'alimenter un circuit à une température plus basse que celle du générateur, en dosant l'apport chaud. Vous verrez juste après que la même vanne peut faire exactement l'inverse — d'où l'importance de savoir dans quel sens l'eau la traverse.", kicker: "converger", title: "Deux entrées vers une sortie commune", text: "En mélange, les flèches de A et B convergent vers AB. Cliquez les trois positions pour voir le boisseau tourner.", cap: "Suivez les deux flèches qui vont vers AB.", tp: "Tracez les arrivées et le départ mélangé.", bts: "Vérifiez la conservation du débit et le bilan thermique.", scene: boisseauAnimee, wire: brancherV3V, equivalent: "Les voies A et B alimentent la voie commune AB : A plus B vers AB.", action: { type: "sequence", prompt: "Construisez le trajet de mélange.", items: ["Sortir par AB","Entrer par B","Se rejoindre dans la vanne","Entrer par A"], correctOrder: [3,1,2,0], explain: "Les deux entrées convergent dans la vanne et ressortent par la voie commune." } },
      { short: "Répartir", narration: "La seconde fonction, c'est la répartition. Cette fois l'eau entre par la voie commune, et se partage vers les deux voies latérales. On envoie plus ou moins de débit d'un côté ou de l'autre. Même corps de vanne, même moteur, même position — et pourtant le service rendu est différent. C'est pour cela que vous ne pouvez pas nommer la fonction d'une vanne trois voies en la regardant. Il faut repérer les voies, établir le sens de circulation, et seulement alors dire s'il s'agit d'un mélange ou d'une répartition.", kicker: "diverger", title: "Une entrée commune vers deux sorties", text: "En répartition, le débit entre par AB puis se partage vers A et B.", cap: "Suivez la flèche qui part de AB.", tp: "Comparez les flèches avec le montage précédent.", bts: "Vérifiez que le type de vanne autorise le service prévu.", scene: divertScene, equivalent: "La voie commune AB alimente A et B : AB vers A plus B.", action: { type: "choice", prompt: "Quel sens correspond à la répartition montrée ?", options: [{label:"AB → A + B"},{label:"A + B → AB"},{label:"A → B sans voie commune"}], correct: 0, explain: "Les flèches divergent depuis la voie commune AB." } },
      { short: "Doser", narration: "Faites varier la part d'eau chaude et suivez la température obtenue. Le principe est simple : la température de sortie se situe entre les deux températures d'entrée, d'autant plus proche de l'une que sa part de débit est importante. Ce n'est pas une moyenne des températures, c'est une moyenne pondérée par les débits — la même logique qu'à la station Découplage. Un point de vigilance de terrain : une vanne qui ne module plus, bloquée en position, donne une température de sortie figée, alors que la commande, elle, continue d'afficher des variations.", kicker: "mesurer", title: "La position change le mélange", text: "Faites varier la part de débit chaud A, puis cliquez les trois positions de la vanne animée pour voir le boisseau tourner et la sortie changer de couleur. Les données sont créées pour l’exercice.", cap: "Lisez la température de sortie après avoir bougé le curseur.", tp: "Lisez les débits et la température de sortie.", bts: "Vérifiez la moyenne pondérée pour l’eau, sans pertes.", scene: boisseauAnimee, wire: brancherV3V, equivalent: (v) => { const a=v/100,m=a*55+(1-a)*30; return `Donnée pédagogique : A fournit ${fr(a)} m³/h à 55 °C, B ${fr(1-a)} m³/h à 30 °C et AB sort à ${fr(m,1)} °C.`; }, action: { type: "range", prompt: "Déplacez la position virtuelle vers A.", label: "Part du débit par A", min: 0, max: 100, step: 10, value: 60, evaluate: (v) => { const a=v/100,m=a*55+(1-a)*30; return {readout:`${v} %`,observation:`T_AB = ${fr(a)} × 55 + ${fr(1-a)} × 30 = ${fr(m,1)} °C.`}; } } },
      { short: "Contrôler", narration: "Le raccordement se prouve par l'effet, jamais par la seule lecture du schéma. Agissez sur la commande, attendez la stabilisation, et observez quelle température bouge et dans quel sens. Si la sortie se réchauffe quand vous augmentez la demande de chaud, l'hypothèse tient. Si rien ne bouge, ou si ça bouge à l'envers, vous avez soit un problème de raccordement, soit un organe bloqué — et c'est là qu'une vérification mécanique locale devient indispensable, comme à la station Diagnostic. Respectez toujours le corps de vanne, la notice, et le temps de stabilisation.", kicker: "terrain", title: "Le raccordement se prouve par l’effet", text: "Ordonnez un contrôle qui respecte le corps de vanne, la notice et la stabilisation.", cap: "Lisez le corps de la vanne avant de la toucher.", tp: "Contrôlez position, sens et températures sans desserrer un raccord.", bts: "Reliez commande, autorité et réponse mesurée dans une étude séparée.", scene: methodScene, equivalent: "Lire, repérer la commune, tracer le sens, tester l’action puis mesurer après stabilisation.", action: { type: "sequence", prompt: "Ordonnez la vérification.", items: ["Observer l’effet stabilisé","Lire le marquage et la notice","Tester l’actionneur selon procédure","Repérer la voie commune","Tracer les flèches attendues"], correctOrder: [1,3,4,2,0], explain: "La fonction n’est confirmée qu’après lecture documentaire et observation cohérente." } }
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
