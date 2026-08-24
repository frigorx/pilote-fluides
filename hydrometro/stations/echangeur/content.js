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
     <text x="140" y="303" text-anchor="middle" font-size="18" font-weight="700">SYMBOLE VALIDÉ</text>
     <rect x="315" y="58" width="365" height="305" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
     ${Array.from({length:7},(_,i)=>`<path d="M${385+i*35} 110V312" stroke="${i%2 ? "#c9451a" : "#3d7fca"}" stroke-width="10" stroke-linecap="round"/>`).join("")}
     <path d="M335 125H390" stroke="#c9451a" stroke-width="10" marker-end="url(#arr-ex-symbol)"/><path d="M390 300H335" stroke="#c9451a" stroke-width="10" marker-end="url(#arr-ex-symbol)"/>
     <path d="M660 300H605" stroke="#3d7fca" stroke-width="10" marker-end="url(#arr-ex-symbol)"/><path d="M605 125H660" stroke="#3d7fca" stroke-width="10" marker-end="url(#arr-ex-symbol)"/>
     <text x="360" y="92" text-anchor="middle" font-size="16" font-weight="700">PRIMAIRE</text><text x="632" y="92" text-anchor="middle" font-size="16" font-weight="700">SECONDAIRE</text>
     <text x="498" y="340" text-anchor="middle" font-size="16">plaques : paroi de séparation</text>`);

  const circuits = shell("ex-circuits", "Deux circuits et quatre piquages",
    "Le primaire chaud circule de gauche en haut vers gauche en bas. Le secondaire plus froid circule en sens opposé de droite en bas vers droite en haut. Les eaux ne se mélangent pas dans ce modèle.",
    `<rect x="250" y="62" width="220" height="295" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     ${Array.from({length:9},(_,i)=>`<path d="M${275+i*22} 95V323" stroke="${i%2 ? "#c9451a" : "#3d7fca"}" stroke-width="8"/>`).join("")}
     <path d="M55 108H250" stroke="#c9451a" stroke-width="12" marker-end="url(#arr-ex-circuits)"/><path d="M250 310H55" stroke="#c9451a" stroke-width="12" marker-end="url(#arr-ex-circuits)"/>
     <path d="M665 310H470" stroke="#3d7fca" stroke-width="12" marker-end="url(#arr-ex-circuits)"/><path d="M470 108H665" stroke="#3d7fca" stroke-width="12" marker-end="url(#arr-ex-circuits)"/>
     <g font-size="16" font-weight="700"><text x="145" y="82" text-anchor="middle">P1 · ENTRÉE PRIMAIRE</text><text x="145" y="347" text-anchor="middle">P2 · SORTIE PRIMAIRE</text><text x="575" y="82" text-anchor="middle">S2 · SORTIE SECONDAIRE</text><text x="575" y="347" text-anchor="middle">S1 · ENTRÉE SECONDAIRE</text></g>
     <path d="M332 150h56M332 210h56M332 270h56" stroke="#b06a00" stroke-width="5" marker-end="url(#arr-ex-circuits)"/>
     <text x="360" y="42" text-anchor="middle" font-size="20" font-weight="700">TRANSFERT À TRAVERS LES PLAQUES</text>`);

  const foulScene = (value = 20) => {
    const transfer = Math.max(20, 100 - Math.round(value * .7));
    const resistance = Math.round(20 + value * .8);
    const fouled = Math.round(value / 20);
    return shell("ex-foul", "Encrassement qualitatif de l’échangeur", `Indice d’encrassement ${value} sur 100. Indice de transfert ${transfer}. Indice de résistance hydraulique ${resistance}. Ce sont des indices relatifs, pas des valeurs de dimensionnement.`,
      `<text x="360" y="40" text-anchor="middle" font-size="21" font-weight="700">MODÈLE QUALITATIF · INDICES RELATIFS</text>
       <rect x="210" y="70" width="300" height="270" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
       ${Array.from({length:8},(_,i)=>`<rect x="${245+i*31}" y="100" width="12" height="205" rx="5" fill="${i<fouled ? "url(#foul-ex-foul)" : (i%2 ? "url(#hot-ex-foul)" : "url(#cold-ex-foul)")}" stroke="${i<fouled ? "#b06a00" : "#1b3a63"}" stroke-width="2"/>`).join("")}
       <path d="M65 135H210" stroke="#c9451a" stroke-width="12" marker-end="url(#arr-ex-foul)"/><path d="M655 280H510" stroke="#3d7fca" stroke-width="12" marker-end="url(#arr-ex-foul)"/>
       <g transform="translate(52 352)"><text x="0" y="0" font-size="16" font-weight="700">TRANSFERT : ${transfer}/100</text><text x="365" y="0" font-size="16" font-weight="700">RÉSISTANCE : ${resistance}/100</text></g>
       <text x="360" y="383" text-anchor="middle" font-size="14">Tendance simulée : encrassement ↑ · échange ↓ · résistance hydraulique ↑</text>`);
  };

  const measure = shell("ex-measure", "Mesurer aux quatre piquages",
    "Quatre sondes de température repérées P1, P2, S1, S2 et deux prises de pression encadrent l’échangeur. Les débits des deux circuits sont aussi nécessaires au bilan.",
    `<rect x="255" y="90" width="210" height="245" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     ${Array.from({length:7},(_,i)=>`<path d="M${285+i*25} 120V305" stroke="${i%2 ? "#c9451a" : "#3d7fca"}" stroke-width="8"/>`).join("")}
     ${[[155,115,"P1"],[155,305,"P2"],[565,305,"S1"],[565,115,"S2"]].map(([x,y,t])=>`<circle cx="${x}" cy="${y}" r="27" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="700">${t}</text>`).join("")}
     <path d="M182 115H255M255 305H182" stroke="#c9451a" stroke-width="10"/><path d="M538 305H465M465 115H538" stroke="#3d7fca" stroke-width="10"/>
     <g transform="translate(267 35)"><circle cx="20" cy="20" r="18" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="4 3"/><circle cx="165" cy="20" r="18" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="4 3"/><text x="92" y="26" text-anchor="middle" font-size="15" font-weight="700">Δp échangeur</text></g>
     <text x="360" y="382" text-anchor="middle" font-size="17" font-weight="700">TEMPÉRATURES + DÉBITS + PRESSION DIFFÉRENTIELLE</text>`);

  const diag = shell("ex-diag", "Diagnostic sans nettoyage au hasard",
    "La démarche part des conditions de service, relève quatre températures, les débits et la perte de pression, puis compare avant de formuler une hypothèse.",
    `<text x="360" y="70" text-anchor="middle" font-size="23" font-weight="700">UNE PISTE N’EST PAS UNE PREUVE</text>
     <g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">${["État connu", "4 T° + débits", "Δp", "Comparer"].map((t,i)=>`<rect x="${26+i*174}" y="145" width="145" height="90" rx="16"/><text x="${98+i*174}" y="198" text-anchor="middle" font-size="17" font-weight="700">${t}</text>`).join("")}</g>
     <path d="M171 190H198M345 190H372M519 190H546" stroke="#c9451a" stroke-width="6" marker-end="url(#arr-ex-diag)"/>
     <rect x="170" y="282" width="380" height="70" rx="18" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="5 5"/>
     <text x="360" y="313" text-anchor="middle" font-size="18" font-weight="700">HYPOTHÈSE : débit ? air ? encrassement ?</text><text x="360" y="338" text-anchor="middle" font-size="15">puis contrôle ciblé selon la procédure</text>`);

  window.STATION_CONFIG = {
    code: "E2", id: "echangeur", title: "Échangeur", next: "réinvestir le débit à la correspondance de la ligne P",
    levels: {
      CAP: { objective: "Reconnaître l’échangeur et ses deux circuits séparés.", assessment: "nommer les piquages et lire les températures" },
      TP: { objective: "Repérer les deux circuits et préparer les contrôles avant nettoyage.", assessment: "identifier les piquages et choisir des contrôles cohérents" },
      BTS: { objective: "Relier bilan thermique, débits, températures, pincement et pertes de charge.", assessment: "interpréter les mesures sans transformer le modèle en sélection réelle" }
    },
    steps: [
      {
        short: "Identifier", kicker: "repérer", title: "Du symbole à la coupe",
        text: "Le symbole sert à lire le schéma. La coupe simplifiée explique ce que le symbole ne montre pas.",
        cap: "Reconnais l’échangeur à ses deux circuits séparés.", tp: "Reconnais l’échangeur et ses quatre piquages.", bts: "Distingue représentation normalisée, modèle et appareil réel.",
        scene: symbol, equivalent: "Le symbole validé est accompagné d’une coupe originale : des plaques séparent deux circuits.",
        action: { type: "choice", prompt: "Que représente la coupe ?", options: [{label:"Deux circuits séparés par des plaques"},{label:"Une cuve où les eaux se mélangent"},{label:"Un circulateur double"},{label:"Une soupape"}], correct: 0, explain: "Le transfert thermique traverse les plaques, mais les deux fluides restent séparés dans le modèle normal." }
      },
      {
        short: "Fonction", kicker: "comprendre", title: "Quatre piquages, deux chemins",
        text: "Suis chaque circuit avec les mots et les flèches. Ici, les écoulements sont représentés en sens opposés.",
        cap: "Montre l’entrée et la sortie de chaque circuit.", tp: "Associe entrée et sortie de chaque circuit.", bts: "Explique l’intérêt du contre-courant sans en déduire un pincement universel.",
        scene: circuits, equivalent: "Le primaire va de P1 à P2. Le secondaire va de S1 à S2 en sens opposé. L’énergie traverse les plaques.",
        action: { type: "match", prompt: "Associe les repères à leur chemin.", options:["Entrée primaire","Sortie primaire","Entrée secondaire","Sortie secondaire"], items:[{label:"P1",answer:0},{label:"P2",answer:1},{label:"S1",answer:2},{label:"S2",answer:3}], explain:"Chaque circuit possède sa propre entrée et sa propre sortie. Les raccordements réels se vérifient sur le dossier et la plaque constructeur." }
      },
      {
        short: "Effet", kicker: "observer", title: "Faire varier l’encrassement",
        text: "Déplace l’indice. Observe deux tendances liées : transfert thermique et résistance hydraulique.",
        cap: "Suis la barre de transfert quand l’indice augmente.", tp: "Décris le symptôme sans conclure à une cause unique.", bts: "Relie la tendance à des mesures de températures, débits et pression différentielle.",
        scene: foulScene, equivalent:(value)=>`Indice relatif d’encrassement ${value} sur 100. Le modèle fait diminuer le transfert et augmenter la résistance.`,
        action:{ type:"range", prompt:"Modifie l’état interne simplifié.", label:"Indice d’encrassement", min:0,max:100,step:10,value:20, evaluate:(value)=>({readout:`${value}/100`, observation:value<40?"État peu encrassé dans le modèle.":value<80?"Le transfert baisse et la résistance augmente : des mesures sont nécessaires.":"État très dégradé dans le modèle. Il faut confirmer la cause avant toute décision."}) }
      },
      {
        short: "Mesurer", kicker: "mesurer", title: "Construire une preuve",
        text: "Quatre températures seules ne suffisent pas toujours. Ajoute les débits et la perte de pression de chaque côté utile.",
        cap: "Relève les quatre températures avant de conclure.", tp: "Prépare des relevés traçables dans un état stabilisé.", bts: "Utilise les quatre températures et les débits pour le bilan; compare la perte de charge au dossier.",
        scene: measure, equivalent:"Les points P1, P2, S1 et S2 portent les températures. Des prises de pression encadrent l’échangeur; les débits sont relevés sur les deux circuits.",
        action:{ type:"choice", prompt:"Quel jeu de relevés est le plus complet pour vérifier le service ?", options:[{label:"4 températures + 2 débits + Δp"},{label:"Une température extérieure"},{label:"Le bruit seul"},{label:"La couleur des plaques"}], correct:0, explain:"Le bilan thermique utilise températures et débits. La pression différentielle renseigne la résistance hydraulique dans les conditions relevées." }
      },
      {
        short: "Vérifier", kicker: "hypothèse", title: "Diagnostiquer sans nettoyer au hasard",
        text: "Air, débit inadéquat ou encrassement peuvent produire des symptômes proches. Ordonne la démarche.",
        cap:"Signale l’anomalie sans nettoyer l’échangeur.", tp:"Signale l’anomalie et prépare le contrôle ciblé selon la procédure du site.", bts:"Croise bilan thermique et hydraulique avant de retenir puis tester une hypothèse.",
        scene:diag, equivalent:"La chaîne est : état connu, quatre températures et débits, perte de pression, comparaison, puis hypothèse.",
        action:{ type:"sequence", prompt:"Place les contrôles dans l’ordre.", items:["Définir l’état de service","Relever 4 T° et débits","Mesurer ou relever Δp","Comparer puis formuler l’hypothèse"], correctOrder:[0,1,2,3], explain:"Le nettoyage ou le remplacement vient seulement après une hypothèse étayée et la procédure adaptée." }
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
