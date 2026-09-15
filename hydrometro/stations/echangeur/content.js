(() => {
  "use strict";

  const shell = (id, title, desc, body) => `
    <svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-title ${id}-desc">
      <title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc>
      <defs>
        <marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker>
        <pattern id="hot-${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="#c9451a" stroke-width="2"/></pattern>
        <pattern id="cold-${id}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#3d7fca"/></pattern>
        <pattern id="foul-${id}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0L8 8M8 0L0 8" stroke="#b06a00" stroke-width="1.5"/></pattern>
      </defs>${body}</svg>`;

  const symbol = shell("ex-symbol", "Symbole validé et coupe pédagogique",
    "À gauche, le symbole inerWeb validé de l’échangeur à plaques. À droite, une coupe pédagogique originale montre deux circuits séparés par des plaques.",
    `<rect x="25" y="75" width="230" height="270" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
     <image href="assets/echangeur_a_plaques.svg" x="68" y="115" width="144" height="144"/>
     <text x="140" y="303" text-anchor="middle" font-size="19" font-weight="700">SYMBOLE VALIDÉ</text>
     <rect x="315" y="58" width="365" height="305" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
     ${Array.from({length:7},(_,i)=>`<path d="M${385+i*35} 110V312" stroke="${i%2 ? "#c9451a" : "#3d7fca"}" stroke-width="10" stroke-linecap="round"/>`).join("")}
     <path d="M335 125H390" stroke="#c9451a" stroke-width="10" marker-end="url(#arr-ex-symbol)"/><path d="M390 300H335" stroke="#c9451a" stroke-width="10" marker-end="url(#arr-ex-symbol)"/>
     <path d="M660 300H605" stroke="#3d7fca" stroke-width="10" marker-end="url(#arr-ex-symbol)"/><path d="M605 125H660" stroke="#3d7fca" stroke-width="10" marker-end="url(#arr-ex-symbol)"/>
     <text x="360" y="92" text-anchor="middle" font-size="19" font-weight="700">PRIMAIRE</text><text x="632" y="92" text-anchor="middle" font-size="19" font-weight="700">SECONDAIRE</text>
     <text x="498" y="392" text-anchor="middle" font-size="19">plaques : paroi de séparation</text>`);

  const circuits = shell("ex-circuits", "Deux circuits et quatre piquages",
    "Le primaire chaud circule de gauche en haut vers gauche en bas. Le secondaire plus froid circule en sens opposé de droite en bas vers droite en haut. Les eaux ne se mélangent pas dans ce modèle.",
    `<rect x="250" y="62" width="220" height="295" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     ${Array.from({length:9},(_,i)=>`<path d="M${275+i*22} 95V323" stroke="${i%2 ? "#c9451a" : "#3d7fca"}" stroke-width="8"/>`).join("")}
     <path d="M55 108H250" stroke="#c9451a" stroke-width="12" marker-end="url(#arr-ex-circuits)"/><path d="M250 310H55" stroke="#c9451a" stroke-width="12" marker-end="url(#arr-ex-circuits)"/>
     <path d="M665 310H470" stroke="#3d7fca" stroke-width="12" marker-end="url(#arr-ex-circuits)"/><path d="M470 108H665" stroke="#3d7fca" stroke-width="12" marker-end="url(#arr-ex-circuits)"/>
     <g font-size="19" font-weight="700"><text x="145" y="82" text-anchor="middle">P1 · ENTRÉE PRIMAIRE</text><text x="145" y="347" text-anchor="middle">P2 · SORTIE PRIMAIRE</text><text x="575" y="82" text-anchor="middle">S2 · SORTIE SECONDAIRE</text><text x="575" y="347" text-anchor="middle">S1 · ENTRÉE SECONDAIRE</text></g>
     <path d="M332 150h56M332 210h56M332 270h56" stroke="#b06a00" stroke-width="5" marker-end="url(#arr-ex-circuits)"/>
     <text x="360" y="42" text-anchor="middle" font-size="20" font-weight="700">TRANSFERT À TRAVERS LES PLAQUES</text>`);

  const circuitsAnimee = `<svg viewBox="0 0 760 430" role="img" aria-labelledby="ech-titre ech-desc" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif">
  <title id="ech-titre">Échangeur à plaques : échange de chaleur à contre-courant</title>
  <desc id="ech-desc">Le circuit primaire, chaud, entre en haut à gauche et ressort en bas à gauche refroidi. Le circuit secondaire, froid, entre en bas à droite et ressort en haut à droite réchauffé. Une paroi les sépare : la chaleur la traverse, l'eau jamais.</desc>
  <defs>
    <marker id="ech-fl-o" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker>
    <marker id="ech-fl-b" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#3d7fca"/></marker>
  </defs>
  <rect x="10" y="10" width="740" height="410" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
  <text x="380" y="46" text-anchor="middle" font-size="22" font-weight="700" fill="#1b3a63">ÉCHANGE À CONTRE-COURANT</text>
  <rect x="200" y="90" width="360" height="220" rx="16" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/>
  <g id="ech-primaire">
    <path d="M60 140 H190" stroke="#c9451a" stroke-width="12" fill="none"/>
    <path d="M200 140 H560" stroke="#e8875f" stroke-width="12" fill="none"/>
    <path d="M200 140 H560" id="ech-primaire-flux" stroke="#fffdf8" stroke-width="4" stroke-dasharray="14 18" fill="none" opacity="0"/>
    <path d="M60 140 H185" stroke="#c9451a" stroke-width="12" fill="none" marker-end="url(#ech-fl-o)"/>
    <path d="M570 140 H700" stroke="#e8a37f" stroke-width="12" fill="none" marker-end="url(#ech-fl-o)"/>
  </g>
  <g id="ech-plaques">
    <rect x="200" y="186" width="360" height="28" fill="#1b3a63" opacity=".85"/>
    <g id="ech-chaleur" fill="#c9451a" opacity="0">
      <path d="M260 178 l10 22 h-20z" transform="rotate(180 260 189)"/>
      <path d="M340 178 l10 22 h-20z" transform="rotate(180 340 189)"/>
      <path d="M420 178 l10 22 h-20z" transform="rotate(180 420 189)"/>
      <path d="M500 178 l10 22 h-20z" transform="rotate(180 500 189)"/>
    </g>
  </g>
  <g id="ech-secondaire">
    <path d="M700 260 H570" stroke="#3d7fca" stroke-width="12" fill="none"/>
    <path d="M560 260 H200" stroke="#7fa9dd" stroke-width="12" fill="none"/>
    <path d="M560 260 H200" id="ech-secondaire-flux" stroke="#fffdf8" stroke-width="4" stroke-dasharray="14 18" fill="none" opacity="0"/>
    <path d="M700 260 H575" stroke="#3d7fca" stroke-width="12" fill="none" marker-end="url(#ech-fl-b)"/>
    <path d="M190 260 H60" stroke="#9fbfe6" stroke-width="12" fill="none" marker-end="url(#ech-fl-b)"/>
  </g>
  <g font-size="20" font-weight="700" text-anchor="middle">
    <g id="ech-t1"><rect x="40" y="86" width="120" height="36" rx="10" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/><text x="100" y="111" fill="#c9451a">T1 · chaud</text></g>
    <g id="ech-t2"><rect x="600" y="86" width="140" height="36" rx="10" fill="#fffdf8" stroke="#8a97a8" stroke-width="2"/><text x="670" y="111" fill="#8a97a8">T2 · refroidi</text></g>
    <g id="ech-t3"><rect x="600" y="280" width="140" height="36" rx="10" fill="#fffdf8" stroke="#3d7fca" stroke-width="2"/><text x="670" y="305" fill="#3d7fca">T3 · froid</text></g>
    <g id="ech-t4"><rect x="30" y="280" width="140" height="36" rx="10" fill="#fffdf8" stroke="#8a97a8" stroke-width="2"/><text x="100" y="305" fill="#8a97a8">T4 · réchauffé</text></g>
  </g>
  <g font-size="20" font-weight="700" fill="#1b3a63">
    <text x="60" y="180">PRIMAIRE</text>
    <text x="700" y="240" text-anchor="end">SECONDAIRE</text>
  </g>
  <rect x="140" y="340" width="480" height="60" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
  <text x="380" y="365" text-anchor="middle" font-size="20" fill="#10233c">La paroi laisse passer la chaleur, jamais l'eau.</text>
  <text x="380" y="390" text-anchor="middle" font-size="20" fill="#637285">Les deux circuits vont en sens contraire : l'échange est meilleur.</text>
</svg>
<div class="flux-controls">
  <button type="button" data-flux="lire">▶ Lancer l'échange</button>
  <button type="button" data-flux="rejouer">↺ Recommencer</button>
  <p class="flux-etat" aria-live="polite">Circuits à l'arrêt. Lancez l'échange : le texte décrit chaque phase.</p>
</div>`;

  function brancherEchange(scene) {
    const fluxP = scene.querySelector("#ech-primaire-flux");
    const fluxS = scene.querySelector("#ech-secondaire-flux");
    const chaleur = scene.querySelector("#ech-chaleur");
    const t2 = scene.querySelector("#ech-t2");
    const t4 = scene.querySelector("#ech-t4");
    const etat = scene.querySelector(".flux-etat");
    const lire = scene.querySelector('[data-flux="lire"]');
    const rejouer = scene.querySelector('[data-flux="rejouer"]');
    if (!fluxP || !fluxS || !chaleur || !t2 || !t4 || !etat || !lire || !rejouer) return;
    const neutre = "#8a97a8";
    const messages = [
      [0, "Le primaire chaud entre à gauche, le secondaire froid entre à droite : ils circulent en sens contraire."],
      [.4, "La chaleur traverse la paroi ; l’eau, elle, ne passe jamais d’un circuit à l’autre."],
      [.85, "En sortie : T2 est refroidi côté primaire, T4 est réchauffé côté secondaire."]
    ];
    function teindre(groupe, couleur) {
      const rect = groupe.querySelector("rect"), texte = groupe.querySelector("text");
      if (rect) rect.setAttribute("stroke", couleur);
      if (texte) texte.setAttribute("fill", couleur);
    }
    let avancement = 0, enLecture = false, derniereFrame = 0;
    function positionner(p) {
      fluxP.style.opacity = p > 0 ? "1" : "0";
      fluxS.style.opacity = p > 0 ? "1" : "0";
      fluxP.setAttribute("stroke-dashoffset", String(-Math.round(p * 640)));
      fluxS.setAttribute("stroke-dashoffset", String(-Math.round(p * 640)));
      chaleur.style.opacity = p >= .35 ? "1" : "0";
      teindre(t2, p >= .85 ? "#3d7fca" : neutre);
      teindre(t4, p >= .85 ? "#c9451a" : neutre);
      if (!enLecture && p === 0) return;
      const message = messages.filter(([seuil]) => p >= seuil - 1e-6).pop();
      if (message && etat.dataset.cle !== String(message[0])) { etat.dataset.cle = String(message[0]); etat.textContent = message[1]; }
    }
    function animer(temps) {
      if (!enLecture) return;
      if (!derniereFrame) derniereFrame = temps;
      avancement = Math.min(1, avancement + (temps - derniereFrame) / 3200);
      derniereFrame = temps;
      positionner(avancement);
      if (avancement >= 1) { enLecture = false; lire.textContent = "▶ Rejouer l’échange"; return; }
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
      positionner(0); lire.textContent = "▶ Lancer l’échange";
      etat.textContent = "Circuits à l’arrêt. Lancez l’échange : le texte décrit chaque phase.";
    });
    positionner(0);
  }

  const foulScene = (value = 20) => {
    const transfer = Math.max(20, 100 - Math.round(value * .7));
    const resistance = Math.round(20 + value * .8);
    const fouled = Math.round(value / 20);
    return shell("ex-foul", "Encrassement qualitatif de l’échangeur", `Indice d’encrassement ${value} sur 100. Indice de transfert ${transfer}. Indice de résistance hydraulique ${resistance}. Ce sont des indices relatifs, pas des valeurs de dimensionnement.`,
      `<text x="360" y="40" text-anchor="middle" font-size="21" font-weight="700">MODÈLE QUALITATIF · INDICES RELATIFS</text>
       <rect x="210" y="70" width="300" height="270" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
       ${Array.from({length:8},(_,i)=>`<rect x="${245+i*31}" y="100" width="12" height="205" rx="5" fill="${i<fouled ? "url(#foul-ex-foul)" : (i%2 ? "url(#hot-ex-foul)" : "url(#cold-ex-foul)")}" stroke="${i<fouled ? "#b06a00" : "#1b3a63"}" stroke-width="2"/>`).join("")}
       <path d="M65 135H210" stroke="#c9451a" stroke-width="12" marker-end="url(#arr-ex-foul)"/><path d="M655 280H510" stroke="#3d7fca" stroke-width="12" marker-end="url(#arr-ex-foul)"/>
       <g transform="translate(52 352)"><text x="0" y="0" font-size="19" font-weight="700">TRANSFERT : ${transfer}/100</text><text x="365" y="0" font-size="19" font-weight="700">RÉSISTANCE : ${resistance}/100</text></g>
       <text x="360" y="400" text-anchor="middle" font-size="19">Tendance simulée : encrassement ↑ · échange ↓ · résistance hydraulique ↑</text>`);
  };

  const measure = shell("ex-measure", "Mesurer aux quatre piquages",
    "Quatre sondes de température repérées P1, P2, S1, S2 et deux prises de pression encadrent l’échangeur. Les débits des deux circuits sont aussi nécessaires au bilan.",
    `<rect x="255" y="90" width="210" height="245" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     ${Array.from({length:7},(_,i)=>`<path d="M${285+i*25} 120V305" stroke="${i%2 ? "#c9451a" : "#3d7fca"}" stroke-width="8"/>`).join("")}
     ${[[155,115,"P1"],[155,305,"P2"],[565,305,"S1"],[565,115,"S2"]].map(([x,y,t])=>`<circle cx="${x}" cy="${y}" r="27" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="19" font-weight="700">${t}</text>`).join("")}
     <path d="M182 115H255M255 305H182" stroke="#c9451a" stroke-width="10"/><path d="M538 305H465M465 115H538" stroke="#3d7fca" stroke-width="10"/>
     <g transform="translate(267 35)"><circle cx="20" cy="20" r="18" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="4 3"/><circle cx="230" cy="20" r="18" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="4 3"/><text x="125" y="26" text-anchor="middle" font-size="19" font-weight="700">Δp échangeur</text></g>
     <text x="360" y="382" text-anchor="middle" font-size="19" font-weight="700">TEMPÉRATURES + DÉBITS + PRESSION DIFFÉRENTIELLE</text>`);

  const diag = shell("ex-diag", "Diagnostic sans nettoyage au hasard",
    "La démarche part des conditions de service, relève quatre températures, les débits et la perte de pression, puis compare avant de formuler une hypothèse.",
    `<text x="360" y="70" text-anchor="middle" font-size="23" font-weight="700">UNE PISTE N’EST PAS UNE PREUVE</text>
     <g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">${["État connu", "4 T° + débits", "Δp", "Comparer"].map((t,i)=>`<rect x="${26+i*174}" y="145" width="145" height="90" rx="16"/><text x="${98+i*174}" y="198" text-anchor="middle" font-size="19" font-weight="700">${t}</text>`).join("")}</g>
     <path d="M171 190H198M345 190H372M519 190H546" stroke="#c9451a" stroke-width="6" marker-end="url(#arr-ex-diag)"/>
     <rect x="60" y="282" width="600" height="70" rx="18" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="5 5"/>
     <text x="360" y="313" text-anchor="middle" font-size="19" font-weight="700">HYPOTHÈSE : débit ? air ? encrassement ?</text><text x="360" y="338" text-anchor="middle" font-size="19">puis contrôle ciblé selon la procédure</text>`);

  window.STATION_CONFIG = {
    code: "E2", id: "echangeur", title: "Échangeur", next: "réinvestir le débit à la correspondance de la ligne P",
    levels: {
      CAP: { objective: "Reconnaître l’échangeur et ses deux circuits séparés.", assessment: "nommer les piquages et lire les températures" },
      TP: { objective: "Repérer les deux circuits et préparer les contrôles avant nettoyage.", assessment: "identifier les piquages et choisir des contrôles cohérents" },
      BTS: { objective: "Relier bilan thermique, débits, températures, pincement et pertes de charge.", assessment: "interpréter les mesures sans transformer le modèle en sélection réelle" }
    },
    steps: [
      {
        narration: "Deux représentations du même appareil, et elles ne servent pas à la même chose. Le symbole est fait pour lire un schéma : il vous dit qu'il y a là un échangeur, et où il se raccorde. Il ne vous dit rien de ce qui se passe dedans. La coupe, elle, montre l'intérieur : des plaques empilées, et entre elles, alternativement, un circuit puis l'autre. Ces deux vues sont complémentaires. Sur le terrain, vous lirez des symboles ; pour comprendre pourquoi un échangeur se comporte comme il le fait, vous aurez besoin de l'image de l'intérieur.",
        short: "Identifier", kicker: "repérer", title: "Du symbole à la coupe",
        text: "Le symbole sert à lire le schéma. La coupe simplifiée explique ce que le symbole ne montre pas.",
        cap: "Reconnaissez l’échangeur à ses deux circuits séparés.", tp: "Reconnaissez l’échangeur et ses quatre piquages.", bts: "Distinguez représentation normalisée, modèle et appareil réel.",
        scene: symbol, equivalent: "Le symbole validé est accompagné d’une coupe originale : des plaques séparent deux circuits.",
        action: { type: "choice", prompt: "Que représente la coupe ?", options: [{label:"Deux circuits séparés par des plaques"},{label:"Une cuve où les eaux se mélangent"},{label:"Un circulateur double"},{label:"Une soupape"}], correct: 0, explain: "Le transfert thermique traverse les plaques, mais les deux fluides restent séparés dans le modèle normal." }
      },
      {
        narration: "Quatre piquages, deux chemins qui ne se rencontrent jamais. Le primaire entre d'un côté et ressort de l'autre. Le secondaire fait de même, dans le sens opposé. Ce sens opposé n'est pas un hasard de dessin : on l'appelle le contre-courant, et il permet un meilleur échange sur toute la longueur, parce que l'écart de température reste réparti au lieu de s'annuler à mi-parcours. Deux conseils pour le terrain : repérez toujours quel piquage appartient à quel circuit avant d'intervenir, et méfiez-vous des installations où les raccordements ont été refaits sans respecter le sens prévu.",
        short: "Fonction", kicker: "comprendre", title: "Quatre piquages, deux chemins",
        text: "Suivez chaque circuit avec les mots et les flèches, puis cliquez « Lancer l’échange » pour voir le flux et la chaleur traverser la paroi.",
        cap: "Montrez l’entrée et la sortie de chaque circuit.", tp: "Associez entrée et sortie de chaque circuit.", bts: "Expliquez l’intérêt du contre-courant sans en déduire un pincement universel.",
        scene: circuitsAnimee, wire: brancherEchange, equivalent: "Le primaire va de P1 à P2. Le secondaire va de S1 à S2 en sens opposé. L’énergie traverse les plaques.",
        action: { type: "match", prompt: "Associez les repères à leur chemin.", options:["Entrée primaire","Sortie primaire","Entrée secondaire","Sortie secondaire"], items:[{label:"P1",answer:0},{label:"P2",answer:1},{label:"S1",answer:2},{label:"S2",answer:3}], explain:"Chaque circuit possède sa propre entrée et sa propre sortie. Les raccordements réels se vérifient sur le dossier et la plaque constructeur." }
      },
      {
        narration: "Faites maintenant varier l'encrassement et suivez deux effets en même temps. Le transfert de chaleur diminue : le dépôt sur les plaques fait obstacle au passage de la chaleur. Et la résistance hydraulique augmente : le passage se rétrécit, l'eau force davantage. Ces deux effets vont ensemble, et c'est ce qui rend le diagnostic possible. Un échangeur qui transfère moins sans que la perte de charge augmente ne souffre probablement pas d'encrassement : cherchez plutôt du côté du débit ou du régime de température. Deux symptômes qui devraient être liés et qui ne le sont pas, c'est une piste.",
        short: "Effet", kicker: "observer", title: "Faire varier l’encrassement",
        text: "Déplacez l’indice. Observez deux tendances liées : transfert thermique et résistance hydraulique.",
        cap: "Suivez la barre de transfert quand l’indice augmente.", tp: "Décrivez le symptôme sans conclure à une cause unique.", bts: "Reliez la tendance à des mesures de températures, débits et pression différentielle.",
        scene: foulScene, equivalent:(value)=>`Indice relatif d’encrassement ${value} sur 100. Le modèle fait diminuer le transfert et augmenter la résistance.`,
        action:{ type:"range", prompt:"Modifiez l’état interne simplifié.", label:"Indice d’encrassement", min:0,max:100,step:10,value:20, evaluate:(value)=>({readout:`${value}/100`, observation:value<40?"État peu encrassé dans le modèle.":value<80?"Le transfert baisse et la résistance augmente : des mesures sont nécessaires.":"État très dégradé dans le modèle. Il faut confirmer la cause avant toute décision."}) }
      },
      {
        narration: "Quatre températures ne suffisent pas toujours à conclure, et voici pourquoi. Un secondaire moins chaud que prévu peut venir d'un échangeur encrassé, mais aussi d'un débit primaire insuffisant, ou d'un régime de température plus bas à l'entrée. Ces situations donnent des relevés de température qui se ressemblent. Ce qui les sépare, ce sont les débits des deux côtés, et la perte de charge. Vous retrouvez ici ce que vous avez vu à la station Puissance : une température seule ne dit rien sur l'énergie transportée, il faut toujours lui associer le débit.",
        short: "Mesurer", kicker: "mesurer", title: "Construire une preuve",
        text: "Quatre températures seules ne suffisent pas toujours. Ajoutez les débits et la perte de pression de chaque côté utile.",
        cap: "Relevez les quatre températures avant de conclure.", tp: "Préparez des relevés traçables dans un état stabilisé.", bts: "Utilisez les quatre températures et les débits pour le bilan; comparez la perte de charge au dossier.",
        scene: measure, equivalent:"Les points P1, P2, S1 et S2 portent les températures. Des prises de pression encadrent l’échangeur; les débits sont relevés sur les deux circuits.",
        action:{ type:"choice", prompt:"Quel jeu de relevés est le plus complet pour vérifier le service ?", options:[{label:"4 températures + 2 débits + Δp"},{label:"Une température extérieure"},{label:"Le bruit seul"},{label:"La couleur des plaques"}], correct:0, explain:"Le bilan thermique utilise températures et débits. La pression différentielle renseigne la résistance hydraulique dans les conditions relevées." }
      },
      {
        narration: "Un échangeur ne se nettoie pas à l'aveugle : le démontage ou le nettoyage chimique coûte cher, immobilise l'installation, et fatigue les joints. La démarche est donc stricte. Établir l'état de service, relever quatre températures et les deux débits, mesurer la perte de charge, comparer au dossier, et seulement alors formuler l'hypothèse. Un mot de vigilance pour finir : sur un échangeur à plaques, une fuite interne fait communiquer les deux circuits sans que rien ne coule à l'extérieur. Rien ne se voit — ça se déduit d'une pression qui monte d'un côté et baisse de l'autre.",
        short: "Vérifier", kicker: "hypothèse", title: "Diagnostiquer sans nettoyer au hasard",
        text: "Air, débit inadéquat ou encrassement peuvent produire des symptômes proches. Ordonnez la démarche.",
        cap:"Signalez l’anomalie sans nettoyer l’échangeur.", tp:"Signalez l’anomalie et préparez le contrôle ciblé selon la procédure du site.", bts:"Croisez bilan thermique et hydraulique avant de retenir puis tester une hypothèse.",
        scene:diag, equivalent:"La chaîne est : état connu, quatre températures et débits, perte de pression, comparaison, puis hypothèse.",
        action:{ type:"sequence", prompt:"Placez les contrôles dans l’ordre.", items:["Définir l’état de service","Relever 4 T° et débits","Mesurer ou relever Δp","Comparer puis formuler l’hypothèse"], correctOrder:[0,1,2,3], explain:"Le nettoyage ou le remplacement vient seulement après une hypothèse étayée et la procédure adaptée." }
      }
    ],
    quiz:[
      {context:"Un échangeur possède quatre piquages.",question:"Quelle lecture est juste ?",options:["Deux circuits séparés avec entrée et sortie chacun","Une seule boucle mélangée","Deux circulateurs","Quatre soupapes"],correct:0,explain:"Les plaques séparent les circuits tout en permettant le transfert thermique."},
      {context:"Le secondaire reçoit moins d’énergie qu’attendu.",question:"Quelle preuve compléter ?",options:["Températures, débits et Δp en état connu","Nettoyer immédiatement","Changer l’échangeur","Neutraliser une sécurité"],correct:0,explain:"Les mesures permettent de distinguer un manque de débit, un problème de régime ou une résistance accrue."},
      {context:"L’indice d’encrassement augmente dans le modèle.",question:"Quelles tendances sont montrées ?",options:["Transfert en baisse et résistance en hausse","Débit garanti","Pression nulle","Circuits mélangés"],correct:0,explain:"Ce sont des tendances qualitatives, pas un calcul de sélection."},
      {context:"Les températures semblent incohérentes.",question:"Quelle action vient d’abord ?",options:["Vérifier repères, sens, état et conditions de mesure","Inverser les tubes au hasard","Ajouter une pompe","Remplacer les plaques"],correct:0,explain:"La validité des points et de l’état de service doit être établie avant l’interprétation."}
    ],
    summaryScene: circuits,
    summaryEquivalent:"Synthèse : deux circuits séparés, quatre piquages, transfert à travers les plaques et vérification par températures, débits et pression différentielle."
  };
})();
