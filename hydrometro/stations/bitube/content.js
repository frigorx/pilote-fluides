(() => {
  "use strict";

  const svg = (id, title, desc, body) => `<svg viewBox="0 0 760 430" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker></defs>${body}</svg>`;

  const parallelScene = svg("bi-parallel", "Réseau bitube à trois branches parallèles", "Une conduite de départ alimente trois branches d’émetteurs. Chaque branche rejoint une conduite de retour commune. Les émetteurs ne sont pas traversés successivement par la même branche. Un repère EAU peut parcourir la branche 2 ; le texte décrit chaque passage.", `
    <text x="380" y="35" text-anchor="middle" font-size="22" font-weight="700">DÉPART COMMUN → BRANCHES → RETOUR COMMUN</text>
    <path d="M75 100H685" stroke="#c9451a" stroke-width="15" marker-end="url(#arr-bi-parallel)"/><path d="M685 340H75" stroke="#3d7fca" stroke-width="15" marker-end="url(#arr-bi-parallel)"/>
    ${[190,380,570].map((x,i)=>`<g><path d="M${x} 100V340" stroke="#1b3a63" stroke-width="9"/><image href="assets/radiateur.svg" x="${x-52}" y="185" width="104" height="78"/><text x="${x}" y="292" text-anchor="middle" font-size="15" font-weight="700">BRANCHE ${i+1}</text></g>`).join("")}
    <text x="105" y="78" font-size="16" font-weight="700">DÉPART</text><text x="105" y="380" font-size="16" font-weight="700">RETOUR</text>
    <rect x="270" y="375" width="220" height="40" rx="11" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="380" y="401" text-anchor="middle" font-size="14">Trois chemins en parallèle</text>
    <path id="bi-flux-chemin" d="M75 100H380V340H75" fill="none" stroke="none"/>
    <g id="bi-flux-marqueur" transform="translate(75 100)"><circle r="15" fill="#3d7fca" stroke="#fffdf8" stroke-width="3"/><text y="4" text-anchor="middle" font-size="11" font-weight="700" fill="#fffdf8">EAU</text></g>`);

  const parallelSceneAnimee = parallelScene + `
    <div class="flux-controls">
      <button type="button" data-flux="lire">▶ Lancer l’eau</button>
      <button type="button" data-flux="rejouer">↺ Recommencer</button>
      <p class="flux-etat" aria-live="polite">Repère EAU au départ. Lancez le trajet : il suit la branche 2, les autres branches font pareil en parallèle.</p>
    </div>`;

  function brancherFlux(scene) {
    const chemin = scene.querySelector("#bi-flux-chemin");
    const marqueur = scene.querySelector("#bi-flux-marqueur");
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
      [0, "L’eau suit la conduite de départ commune."],
      [fractionPresDe(380, 110), "Elle entre dans la branche 2 : chaque branche a son propre piquage."],
      [fractionPresDe(380, 220), "Elle traverse l’émetteur 2 et lui cède une partie de l’énergie."],
      [fractionPresDe(370, 340), "Elle rejoint la conduite de retour commune."],
      [fractionPresDe(120, 340), "Retour vers la production. Les branches 1 et 3 font le même trajet en parallèle."]
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
      avancement = Math.min(1, avancement + (temps - derniereFrame) / 10000);
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
      etat.textContent = "Repère EAU au départ. Lancez le trajet : il suit la branche 2, les autres branches font pareil en parallèle.";
    });
    positionner(0);
  }

  const buildScene = svg("bi-build", "Connexions fonctionnelles d’un réseau bitube", "Chaque radiateur possède une entrée raccordée au départ et une sortie raccordée au retour. Une branche qui rejoint départ-départ ou retour-retour n’est pas fonctionnelle dans ce modèle.", `
    <path d="M90 85H670" stroke="#c9451a" stroke-width="13"/><path d="M90 345H670" stroke="#3d7fca" stroke-width="13"/>
    ${[210,380,550].map((x,i)=>`<g><rect x="${x-66}" y="166" width="132" height="92" rx="15" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="${x}" y="205" text-anchor="middle" font-size="16" font-weight="700">ÉMETTEUR ${i+1}</text><text x="${x}" y="231" text-anchor="middle" font-size="14">entrée · sortie</text><path d="M${x} 85V166M${x} 258V345" stroke="#1b3a63" stroke-width="7" stroke-dasharray="10 7"/></g>`).join("")}
    <text x="115" y="61" font-size="16" font-weight="700">DÉPART COMMUN</text><text x="115" y="382" font-size="16" font-weight="700">RETOUR COMMUN</text>`);

  function architectureScene(mode = 0) {
    const reverse = Number(mode) === 1;
    const totals = reverse ? [30,30,30] : [10,20,30];
    return svg(`bi-${reverse?"reverse":"direct"}`, reverse ? "Retour inversé pédagogique" : "Retour direct pédagogique", reverse ? "Dans le retour inversé pédagogique, le premier émetteur alimenté parcourt le retour le plus long et le dernier le plus court. Les longueurs totales sont rapprochées à 30 mètres dans cet exemple." : "Dans le retour direct pédagogique, le premier émetteur alimenté a aussi le retour le plus court. Les longueurs totales valent 10, 20 et 30 mètres dans cet exemple.", `
      <text x="380" y="34" text-anchor="middle" font-size="22" font-weight="700">${reverse?"RETOUR INVERSÉ":"RETOUR DIRECT"} · DONNÉES PÉDAGOGIQUES</text>
      <path d="M80 90H680" stroke="#c9451a" stroke-width="13" marker-end="url(#arr-bi-${reverse?"reverse":"direct"})"/>
      <path d="${reverse?"M680 350H80":"M80 350H680"}" stroke="#3d7fca" stroke-width="13" marker-end="url(#arr-bi-${reverse?"reverse":"direct"})"/>
      ${[190,380,570].map((x,i)=>`<g><path d="M${x} 90V350" stroke="#1b3a63" stroke-width="8"/><image href="assets/radiateur.svg" x="${x-48}" y="180" width="96" height="72"/><rect x="${x-60}" y="277" width="120" height="52" rx="11" fill="#fffdf8" stroke="${totals[i]===totals[0]&&reverse?"#1e7e54":"#1b3a63"}" stroke-width="${reverse?5:3}"/><text x="${x}" y="299" text-anchor="middle" font-size="13" font-weight="700">CHEMIN ${i+1}</text><text x="${x}" y="319" text-anchor="middle" font-size="14">${totals[i]} m</text></g>`).join("")}
      <text x="380" y="400" text-anchor="middle" font-size="14">Longueur seule ≠ perte de charge réelle : diamètres, débits et singularités comptent aussi.</text>`);
  }

  function resistanceScene(fittings = 2) {
    const index = 20 + fittings * 3;
    return svg("bi-resistance", "Chemin hydraulique et résistances locales", `Le chemin pédagogique comporte 20 mètres de tube et ${fittings} singularités. L’indice comparatif vaut ${index}. Cet indice sans unité sert seulement à montrer que la longueur ne suffit pas.`, `
      <text x="380" y="35" text-anchor="middle" font-size="22" font-weight="700">COMPARER LE CHEMIN COMPLET</text>
      <path d="M70 215H690" stroke="#3d7fca" stroke-width="15" marker-end="url(#arr-bi-resistance)"/>
      ${Array.from({length:fittings},(_,i)=>`<g transform="translate(${250+i*(260/Math.max(1,fittings-1))} 215)"><path d="M-28 -38L0 0L-28 38M28 -38L0 0L28 38" fill="#fffdf8" stroke="#1b3a63" stroke-width="6"/></g>`).join("")}
      <rect x="80" y="90" width="220" height="72" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="190" y="120" text-anchor="middle" font-size="16" font-weight="700">TUBE : 20 m</text><text x="190" y="146" text-anchor="middle" font-size="14">même diamètre dans le modèle</text>
      <rect x="455" y="280" width="220" height="72" rx="14" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="6 5"/><text x="565" y="309" text-anchor="middle" font-size="16" font-weight="700">${fittings} SINGULARITÉ(S)</text><text x="565" y="335" text-anchor="middle" font-size="14">indice pédagogique : ${index}</text>`);
  }

  const methodScene = svg("bi-method", "Méthode de comparaison de deux architectures bitube", "La méthode trace chaque chemin, inventorie longueurs, diamètres et singularités, estime les pertes au débit visé, puis mesure et équilibre avant de conclure.", `
    ${["Tracer","Inventorier","Calculer","Mesurer","Équilibrer"].map((t,i)=>`<g transform="translate(${90+i*145} 215)"><circle r="38" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><text y="6" text-anchor="middle" font-size="18" font-weight="700">${i+1}</text><text y="70" text-anchor="middle" font-size="14" font-weight="700">${t}</text>${i<4?`<path d="M43 0H95" stroke="#3d7fca" stroke-width="5" marker-end="url(#arr-bi-method)"/>`:""}</g>`).join("")}
    <text x="380" y="70" text-anchor="middle" font-size="22" font-weight="700">DIRECT OU INVERSÉ : VÉRIFIER, PAS SUPPOSER</text>
    <text x="380" y="365" text-anchor="middle" font-size="15">Le retour inversé rapproche les chemins ; il ne les rend pas automatiquement identiques.</text>`);

  window.STATION_CONFIG = {
    code: "D2", id: "bitube", title: "Bitube — Réseau à construire", next: "ouvrir la correspondance Pertes de charge",
    levels: {
      CAP: { objective: "Reconnaître le départ, le retour et suivre une branche jusqu’à l’émetteur.", assessment: "nommer départ, retour, émetteur et suivre une branche" },
      TP: { objective: "Raccorder chaque émetteur entre départ et retour et repérer les branches favorisées.", assessment: "lire le schéma, suivre une branche et comparer les chemins" },
      BTS: { objective: "Comparer réseau direct et retour inversé en tenant compte du chemin hydraulique réel.", assessment: "justifier l’architecture et les données manquantes pour calculer" }
    },
    steps: [
      { short: "Parallèle", narration: "Reprenons ce que vous savez déjà : en bitube, un départ commun alimente tous les émetteurs, et un retour commun les récupère. Chaque émetteur forme donc sa propre branche entre ces deux conduites. On dit qu'ils sont en parallèle. La conséquence est excellente : chaque émetteur reçoit une eau à peu près à la même température, contrairement au monotube où le dernier hérite d'une eau déjà refroidie. Mais un montage en parallèle apporte son problème à lui, et c'est ce que vous allez découvrir dans cette station : quand plusieurs chemins sont offerts à l'eau, elle ne les emprunte pas de façon égale.", kicker: "rappel", title: "Chaque émetteur forme sa branche", text: "Le départ et le retour sont communs. Les branches sont en parallèle.", cap: "Suis le repère EAU du départ jusqu’au retour.", tp: "Suis une branche de son piquage départ à son piquage retour.", bts: "Distingue les collecteurs communs des pertes propres à chaque chemin.", scene: parallelSceneAnimee, wire: brancherFlux, equivalent: "Trois branches en parallèle relient le départ commun au retour commun. L’animation, déclenchée par bouton, suit la branche 2 et le texte décrit chaque passage.", action: { type: "choice", prompt: "Quel trajet décrit la branche 2 ?", options: [{label:"Départ commun → émetteur 2 → retour commun"},{label:"Émetteur 1 → émetteur 2 → émetteur 3"},{label:"Retour commun → départ sans émetteur"}], correct: 0, explain: "Une branche bitube relie le départ au retour en traversant son propre émetteur." } },
      { short: "Construire", narration: "Chaque émetteur a besoin de deux raccordements, jamais un seul : une arrivée prise sur le départ, un retour renvoyé sur la conduite de retour. Cela paraît évident sur un schéma propre, et ça l'est beaucoup moins devant une installation ancienne où les tubes ont été repeints et passent dans un faux plafond. Le réflexe qui ne trompe pas : suivez le tube depuis l'émetteur jusqu'à la conduite principale, physiquement, sur toute sa longueur. Ne vous fiez ni à la couleur, ni à la température au toucher — un retour bien chaud sur un émetteur peu sollicité vous induira en erreur.", kicker: "raccorder", title: "Deux raccordements par émetteur", text: "Associe chaque extrémité fonctionnelle à la bonne conduite.", cap: "Montre l’entrée reliée au départ et la sortie au retour.", tp: "Raccorde entrée au départ et sortie au retour.", bts: "Conserve le sens et l’identification des trois chemins.", scene: buildScene, equivalent: "Chaque émetteur possède une entrée liée au départ commun et une sortie liée au retour commun.", action: { type: "match", prompt: "Construis les raccordements.", options: ["Départ commun","Retour commun"], items: [{label:"Entrée émetteur 1",answer:0},{label:"Sortie émetteur 1",answer:1},{label:"Entrée émetteur 2",answer:0},{label:"Sortie émetteur 2",answer:1}], explain: "Le schéma construit doit garder chaque émetteur entre les deux conduites communes." } },
      { short: "Comparer", narration: "Comparons maintenant deux façons de câbler le même réseau. En raccordement direct, chaque émetteur est piqué sur le départ puis renvoyé au plus court sur le retour : le premier émetteur a un chemin très court, le dernier un chemin très long. En retour inversé, le retour repart dans l'autre sens, si bien que le premier émetteur a un aller court mais un retour long, et le dernier l'inverse. Résultat : les longueurs totales se rapprochent, et le réseau est naturellement plus équilibré. Ça coûte un peu plus de tube à l'installation, et ça fait gagner beaucoup de temps au réglage.", kicker: "architectures", title: "Direct ou retour inversé", text: "Choisis l’architecture qui rapproche ici les longueurs totales des trois chemins.", cap: "Repère la plus longue des deux branches affichées.", tp: "Compare les longueurs indiquées.", bts: "Explique pourquoi l’égalité de longueur ne suffit pas à garantir l’égalité de perte de charge.", scene: architectureScene, equivalent: (v) => Number(v)===1 ? "Retour inversé pédagogique : trois chemins de 30 m, avant prise en compte des diamètres, débits et singularités." : "Retour direct pédagogique : chemins de 10, 20 et 30 m.", action: { type: "choice", prompt: "Quelle architecture rapproche les longueurs dans cet exemple ?", options: [{label:"Retour direct"},{label:"Retour inversé"},{label:"Monotube en série"}], correct: 1, sceneFor: true, explain: "Le retour inversé compense ici un départ court par un retour long, et inversement." } },
      { short: "Résister", narration: "Attention à une simplification tentante : la longueur du tube n'est qu'une partie de l'histoire. Ce qui freine l'eau, ce sont aussi les singularités — chaque coude, chaque té, chaque vanne, chaque changement de section. Un chemin court truffé de coudes peut résister davantage qu'un chemin long et bien droit. C'est pour cela qu'on ne peut pas conclure sur un déséquilibre en mesurant des mètres de tube au plan. Vous verrez à la station Pertes de charge comment ces résistances s'additionnent, et pourquoi elles augmentent très vite avec le débit.", kicker: "pertes", title: "La longueur n’est qu’un indice", text: "Ajoute des singularités au même chemin. L’indice comparatif augmente.", cap: "Repère les coudes et vannes ajoutés sur le chemin.", tp: "Inventorie tube, coudes et organes.", bts: "Remplace ensuite l’indice par un calcul documenté avec débit, diamètre et coefficients.", scene: resistanceScene, equivalent: (v) => `Modèle comparatif : 20 m de tube, ${v} singularités et indice sans unité ${20+v*3}.`, action: { type: "range", prompt: "Fais varier le nombre de singularités.", label: "Singularités", min: 0, max: 4, step: 1, value: 2, evaluate: (v) => ({readout:`${v}`,observation:`Indice pédagogique = 20 + ${v} × 3 = ${20+v*3}. La longueur seule ne classe plus le chemin.`}) } },
      { short: "Vérifier", narration: "Terminons par la méthode, parce que c'est elle qui vous évitera de perdre une journée. Avant d'équilibrer, on compare. Un déséquilibre supposé d'après la géométrie du réseau n'est pas un déséquilibre constaté : il faut des débits relevés, branche par branche, dans un état stabilisé. Confondre ce que le plan laisse prévoir et ce que l'installation fait réellement, c'est régler à l'aveugle. La bonne séquence est toujours la même : je relève, je constate, j'agis sur une seule chose, j'attends, je relève à nouveau.", kicker: "méthode", title: "Comparer avant d’équilibrer", text: "Ordonne une démarche qui ne confond pas géométrie et perte réelle.", cap: "Relève l’état de chaque branche avant de comparer.", tp: "Relève l’état et compare les branches.", bts: "Calcule au débit visé, puis confronte aux mesures.", scene: methodScene, equivalent: "Tracer, inventorier, calculer, mesurer puis équilibrer.", action: { type: "sequence", prompt: "Ordonne la comparaison.", items: ["Mesurer dans un état connu","Tracer chaque chemin","Équilibrer et contrôler","Inventorier diamètres et singularités","Calculer au débit visé"], correctOrder: [1,3,4,0,2], explain: "Le réglage vient après la compréhension et la mesure du réseau." } }
    ],
    quiz: [
      { context: "Trois radiateurs sont raccordés entre deux conduites communes.", question: "Quelle architecture est représentée ?", options: ["Des branches bitube en parallèle","Un monotube sans dérivation","Trois productions indépendantes","Un rejet ouvert"], correct: 0, explain: "Chaque radiateur relie départ et retour par sa propre branche." },
      { context: "Exemple direct : chemins 10, 20 et 30 m.", question: "Quelle branche paraît favorisée si tout le reste est identique ?", options: ["Le chemin de 10 m","Le chemin de 30 m","Les trois forcément identiques","Aucune car la longueur n’intervient jamais"], correct: 0, explain: "À diamètre, débit visé et singularités comparables, le chemin le plus court offre ici moins de résistance." },
      { context: "Le retour inversé donne trois longueurs de 30 m.", question: "Que peut-on conclure ?", options: ["Les longueurs sont rapprochées, mais les pertes réelles restent à vérifier","Les débits sont garantis exactement égaux","Aucun équilibrage n’est possible","Les singularités disparaissent"], correct: 0, explain: "Diamètres, débits et organes continuent d’influencer les pertes." },
      { context: "Une branche reçoit deux vannes supplémentaires.", question: "Quelle vérification devient nécessaire ?", options: ["Comparer le chemin complet et les mesures","Compter seulement les mètres","Supprimer les unités","Changer la pompe sans relever"], correct: 0, explain: "Les singularités ajoutent une résistance locale et doivent entrer dans l’analyse." }
    ],
    summaryScene: methodScene,
    summaryEquivalent: "Synthèse : construire les branches entre départ et retour, tracer chaque chemin, comparer direct et inversé puis vérifier les pertes réelles."
  };
})();
