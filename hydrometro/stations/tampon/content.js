(() => {
  "use strict";
  const shell=(id,title,desc,body)=>`<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker><pattern id="warm-${id}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 9L9 0" stroke="#c9451a" stroke-width="2"/></pattern><pattern id="cool-${id}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.5" fill="#3d7fca"/></pattern></defs>${body}</svg>`;
  const tamponAnimee=`<svg viewBox="0 0 760 430" role="img" aria-labelledby="tam-titre tam-desc" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif">
  <title id="tam-titre">Ballon tampon : le sens de circulation dépend du régime</title>
  <desc id="tam-desc">Le ballon relie le circuit de production, à gauche, et le circuit de distribution, à droite. Quand la production dépasse le besoin, l'eau chaude traverse le ballon vers le bas et il se charge. Quand le besoin dépasse la production, le ballon se décharge : le sens s'inverse. À l'équilibre, rien ne traverse.</desc>
  <defs>
    <marker id="tam-fl-o" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#c9451a"/></marker>
    <marker id="tam-fl-b" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#3d7fca"/></marker>
    <clipPath id="tam-ballon-clip"><rect x="310" y="90" width="140" height="250" rx="30"/></clipPath>
  </defs>
  <rect x="10" y="10" width="740" height="410" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
  <text x="380" y="46" text-anchor="middle" font-size="22" font-weight="700" fill="#1b3a63">LE BALLON SE CHARGE OU SE DÉCHARGE</text>
  <g font-size="20" font-weight="700" text-anchor="middle">
    <rect x="40" y="150" width="150" height="130" rx="14" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/>
    <text x="115" y="195" fill="#1b3a63">PRODUCTION</text><text x="115" y="222" fill="#637285">chaudière</text><text x="115" y="248" fill="#637285">ou PAC</text>
    <rect x="570" y="150" width="150" height="130" rx="14" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/>
    <text x="645" y="195" fill="#1b3a63">DISTRIBUTION</text><text x="645" y="222" fill="#637285">émetteurs</text><text x="645" y="248" fill="#637285">du bâtiment</text>
  </g>
  <g stroke-width="12" fill="none" stroke="#1b3a63">
    <path d="M190 130 H310"/><path d="M190 300 H310"/><path d="M450 130 H570"/><path d="M450 300 H570"/>
  </g>
  <g id="tam-flux-prod">
    <path d="M200 130 H290" stroke="#c9451a" stroke-width="6" fill="none" marker-end="url(#tam-fl-o)"/>
    <path d="M300 300 H210" stroke="#3d7fca" stroke-width="6" fill="none" marker-end="url(#tam-fl-b)"/>
  </g>
  <g id="tam-flux-dist">
    <path d="M460 130 H550" stroke="#c9451a" stroke-width="6" fill="none" marker-end="url(#tam-fl-o)"/>
    <path d="M560 300 H470" stroke="#3d7fca" stroke-width="6" fill="none" marker-end="url(#tam-fl-b)"/>
  </g>
  <g id="tam-ballon">
    <rect x="310" y="90" width="140" height="250" rx="30" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/>
    <g clip-path="url(#tam-ballon-clip)">
      <rect id="tam-chaud" x="310" y="90" width="140" height="125" fill="#f0b79b"/>
      <rect id="tam-froid" x="310" y="215" width="140" height="125" fill="#9fbfe6"/>
      <path id="tam-niveau" d="M310 215 H450" stroke="#fffdf8" stroke-width="4"/>
    </g>
    <rect x="310" y="90" width="140" height="250" rx="30" fill="none" stroke="#1b3a63" stroke-width="4"/>
    <g id="tam-sens" transform="translate(380 215)" opacity="0">
      <path d="M0 -40 V40" stroke="#1b3a63" stroke-width="8" stroke-linecap="round"/>
      <path d="M-16 20 L0 44 L16 20" fill="none" stroke="#1b3a63" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
  <g id="tam-regime" font-size="20" font-weight="700" text-anchor="middle">
    <rect x="270" y="352" width="220" height="40" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
    <text id="tam-regime-valeur" x="380" y="379" fill="#1b3a63">ÉQUILIBRE</text>
  </g>
  <g font-size="20" font-weight="700">
    <rect x="200" y="72" width="110" height="32" rx="9" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/><text x="255" y="95" text-anchor="middle" fill="#c9451a">DÉPART</text>
    <rect x="200" y="318" width="110" height="32" rx="9" fill="#fffdf8" stroke="#3d7fca" stroke-width="2"/><text x="255" y="341" text-anchor="middle" fill="#3d7fca">RETOUR</text>
  </g>
  <text x="380" y="412" text-anchor="middle" font-size="20" fill="#637285">Production &gt; besoin : charge · besoin &gt; production : décharge.</text>
</svg>
<div class="flux-controls">
  <button type="button" data-regime="charge">Charge</button>
  <button type="button" data-regime="equilibre">Équilibre</button>
  <button type="button" data-regime="decharge">Décharge</button>
  <p class="flux-etat" aria-live="polite">Production = besoin : rien ne traverse le ballon.</p>
</div>`;

  function brancherTampon(scene) {
    const chaud = scene.querySelector("#tam-chaud");
    const froid = scene.querySelector("#tam-froid");
    const niveau = scene.querySelector("#tam-niveau");
    const sens = scene.querySelector("#tam-sens");
    const fluxProd = scene.querySelector("#tam-flux-prod");
    const regimeTexte = scene.querySelector("#tam-regime-valeur");
    const etat = scene.querySelector(".flux-etat");
    const boutons = Array.from(scene.querySelectorAll("[data-regime]"));
    if (!chaud || !froid || !niveau || !sens || !fluxProd || !regimeTexte || !etat || !boutons.length) return;
    const regimes = {
      charge: { y: 165, angle: 0, opacite: 1, prod: 9, mot: "CHARGE", phrase: "Production > besoin : l’eau chaude descend dans le ballon, il se charge." },
      equilibre: { y: 215, angle: 0, opacite: 0, prod: 6, mot: "ÉQUILIBRE", phrase: "Production = besoin : rien ne traverse le ballon." },
      decharge: { y: 265, angle: 180, opacite: 1, prod: 4, mot: "DÉCHARGE", phrase: "Besoin > production : le ballon restitue son eau chaude, il se décharge." }
    };
    function peindre(cle) {
      const r = regimes[cle];
      chaud.setAttribute("height", String(r.y - 90));
      froid.setAttribute("y", String(r.y));
      froid.setAttribute("height", String(340 - r.y));
      niveau.setAttribute("d", `M310 ${r.y} H450`);
      sens.setAttribute("opacity", String(r.opacite));
      sens.setAttribute("transform", `translate(380 215) rotate(${r.angle})`);
      fluxProd.querySelectorAll("path").forEach((chemin) => chemin.setAttribute("stroke-width", String(r.prod)));
      regimeTexte.textContent = r.mot;
      etat.textContent = r.phrase;
    }
    boutons.forEach((bouton) => bouton.addEventListener("click", () => peindre(bouton.dataset.regime)));
    peindre("equilibre");
  }

  const connection=(mode=0)=>{
    if (mode === 1) return tamponAnimee;
    const id=`tam-mode-${mode}`;
    const data=[
      {title:"DEUX PIQUAGES · EN SÉRIE",desc:"Le même débit traverse le ballon. Le volume utile contribue à l’inertie. Il n’y a pas deux circuits hydrauliquement séparés dans ce schéma.",body:`<path d="M45 115H285M435 305H675" stroke="#1b3a63" stroke-width="12"/><image href="assets/ballon-tampon.svg" x="285" y="75" width="150" height="270"/><path d="M130 115H255" stroke="#c9451a" stroke-width="6" marker-end="url(#arr-${id})"/><path d="M585 305H465" stroke="#3d7fca" stroke-width="6" marker-end="url(#arr-${id})"/><text x="360" y="55" text-anchor="middle" font-size="20" font-weight="700">UN SEUL CHEMIN</text><text x="360" y="385" text-anchor="middle" font-size="19">Inertie : oui · Découplage : non démontré</text>`},
      {title:"QUATRE PIQUAGES · PRIMAIRE / SECONDAIRE",desc:"Deux circuits et deux circulateurs sont reliés au volume commun. Ce schéma peut assurer inertie et découplage hydraulique; les transferts internes restent à analyser.",body:`<image href="assets/ballon-tampon.svg" x="285" y="75" width="150" height="270"/><path d="M45 130H300M300 295H45M420 130H675M675 295H420" stroke="#1b3a63" stroke-width="11"/><circle cx="120" cy="130" r="26" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><circle cx="600" cy="130" r="26" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="120" y="136" text-anchor="middle" font-size="19" font-weight="700">P1</text><text x="600" y="136" text-anchor="middle" font-size="19" font-weight="700">P2</text><path d="M165 130H260M555 130H460" stroke="#c9451a" stroke-width="6" marker-end="url(#arr-${id})"/><text x="360" y="55" text-anchor="middle" font-size="20" font-weight="700">DEUX CIRCUITS · VOLUME COMMUN</text><text x="360" y="385" text-anchor="middle" font-size="19">Inertie + découplage possibles dans ce schéma</text>`},
      {title:"PIQUAGE EN DÉRIVATION",desc:"Le ballon est raccordé sur une branche latérale. La part du volume réellement traversée dépend des conditions hydrauliques; aucun découplage n’est démontré par le dessin seul.",body:`<path d="M45 155H675" stroke="#1b3a63" stroke-width="12"/><path d="M360 155V235" stroke="#1b3a63" stroke-width="10"/><image href="assets/ballon-tampon.svg" x="285" y="215" width="150" height="190"/><path d="M110 155H300" stroke="#c9451a" stroke-width="6" marker-end="url(#arr-${id})"/><text x="360" y="55" text-anchor="middle" font-size="20" font-weight="700">BRANCHE LATÉRALE</text><rect x="440" y="245" width="240" height="85" rx="14" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="5 4"/><text x="560" y="278" text-anchor="middle" font-size="19" font-weight="700">VOLUME UTILE ?</text><text x="560" y="305" text-anchor="middle" font-size="19">circulation à vérifier</text>`}
    ][mode]||null;
    return shell(id,data.title,data.desc,data.body);
  };
  const roles=shell("tam-roles","Fonctions attribuées avec prudence","Trois cartes distinguent fonction montrée, fonction à vérifier et fonction non démontrée. La forme du ballon ne suffit pas.",`<rect x="30" y="75" width="210" height="270" rx="20" fill="#fffdf8" stroke="#1e7e54" stroke-width="5"/><text x="135" y="115" text-anchor="middle" font-size="19" font-weight="700">MONTRÉE</text><text x="135" y="170" text-anchor="middle" font-size="19">volume d’eau</text><text x="135" y="205" text-anchor="middle" font-size="19">chemin traversé</text><rect x="255" y="75" width="210" height="270" rx="20" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="5 4"/><text x="360" y="115" text-anchor="middle" font-size="19" font-weight="700">À VÉRIFIER</text><text x="360" y="170" text-anchor="middle" font-size="19">volume utile</text><text x="360" y="205" text-anchor="middle" font-size="19">transferts internes</text><text x="360" y="240" text-anchor="middle" font-size="19">températures</text><rect x="480" y="75" width="210" height="270" rx="20" fill="#fbe7e4" stroke="#c0392b" stroke-width="4" stroke-dasharray="9 6"/><text x="585" y="115" text-anchor="middle" font-size="19" font-weight="700">NON AUTOMATIQUE</text><text x="585" y="170" text-anchor="middle" font-size="19">découplage</text><text x="585" y="205" text-anchor="middle" font-size="19">stratification</text><text x="585" y="240" text-anchor="middle" font-size="19">rendement</text>`);
  const useful=(value=60)=>shell("tam-useful","Part de volume balayée dans un modèle qualitatif",`La part représentée comme balayée vaut ${value} pour cent du volume dessiné. Cette commande qualitative ne calcule pas le volume utile réel d’un produit.`,`<path d="M260 45C205 45 185 95 185 210S205 375 260 375H460C515 375 535 325 535 210S515 45 460 45Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/><clipPath id="clip-tam-useful"><path d="M260 45C205 45 185 95 185 210S205 375 260 375H460C515 375 535 325 535 210S515 45 460 45Z"/></clipPath><rect x="185" y="${375-3.3*value}" width="350" height="${3.3*value}" fill="url(#cool-tam-useful)" clip-path="url(#clip-tam-useful)"/><path d="M185 110H70M535 310H650" stroke="#1b3a63" stroke-width="11"/><text x="360" y="205" text-anchor="middle" font-size="28" font-weight="700">${value} %</text><text x="360" y="238" text-anchor="middle" font-size="19">part balayée représentée</text><text x="360" y="405" text-anchor="middle" font-size="19">Donnée qualitative du scénario · pas un dimensionnement</text>`);
  const method=shell("tam-method","Vérifier les fonctions du raccordement","Cinq étapes : lire les piquages, suivre les débits, observer le volume mobilisé, vérifier les transferts et températures, conclure seulement sur les fonctions prouvées.",`<g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">${["PIQUAGES","DÉBITS","VOLUME","TRANSFERT","CONCLURE"].map((t,i)=>`<rect x="${10+i*142}" y="150" width="135" height="110" rx="15"/><text x="${77+i*142}" y="194" text-anchor="middle" font-size="19" font-weight="700">${t}</text><text x="${77+i*142}" y="228" text-anchor="middle" font-size="19">${i+1}</text>`).join("")}</g>${[0,1,2,3].map(i=>`<path d="M${145+i*142} 205H${152+i*142}" stroke="#c9451a" stroke-width="5" marker-end="url(#arr-tam-method)"/>`).join("")}`);

  window.STATION_CONFIG={code:"M4",id:"tampon",title:"Volume tampon — Quatre piquages",next:"poursuivre vers le découplage",levels:{CAP:{objective:"Reconnaître le ballon tampon et suivre le chemin de l’eau.",assessment:"nommer le ballon et suivre un piquage"},TP:{objective:"Reconnaître le raccordement et attribuer seulement les fonctions visibles.",assessment:"lire les piquages, suivre le chemin et limiter la conclusion"},BTS:{objective:"Analyser volume utile, transferts et découplage selon l’architecture.",assessment:"comparer les montages et justifier les fonctions avec leurs conditions"}},steps:[
    {short:"Rôle",narration: "Un ballon tampon n'a pas une fonction unique, et c'est la source de bien des malentendus. Ce qu'il apporte à coup sûr, c'est du volume, donc de l'inertie : l'installation réagit plus lentement, et le générateur cesse de démarrer et de s'arrêter sans cesse. Tout le reste — découpler deux circuits, stratifier des températures, stocker de l'énergie pour plus tard — dépend entièrement de la façon dont il est raccordé et des conditions de fonctionnement. Deux ballons identiques, piqués différemment, ne rendent pas le même service. Le volume ne fait pas la fonction.", kicker:"observer",title:"Un ballon n’a pas une seule fonction",text:"Le volume apporte une possibilité d’inertie. Cliquez les trois régimes pour voir le ballon se charger, s’équilibrer ou se décharger. Les autres fonctions dépendent du raccordement et des conditions.",cap:"Montrez le ballon et l’eau qu’il contient.",tp:"Distinguez volume, inertie et découplage.",bts:"Séparez propriété géométrique, fonction hydraulique et performance à vérifier.",scene:tamponAnimee,wire:brancherTampon,equivalent:"Le volume peut contribuer à l’inertie; découplage et stratification restent à démontrer.",action:{type:"choice",prompt:"Quelle affirmation est prudente ?",options:[{label:"Le raccordement détermine les fonctions réellement assurées"},{label:"Tout ballon découple automatiquement"},{label:"Quatre piquages garantissent toute performance"},{label:"Le volume nominal est toujours entièrement utile"}],correct:0,explain:"Il faut suivre les circuits et vérifier les conditions avant d’attribuer une fonction."}},
    {short:"Comparer",narration: "Comparez plusieurs raccordements du même volume. Un ballon en série sur le circuit ajoute simplement de l'inertie. Un ballon avec deux circuits reliés à un volume commun permet en plus aux deux débits d'être différents : c'est ce que vous avez vu à la station Découplage. La différence entre ces montages ne se voit pas de l'extérieur — le ballon a la même allure. Elle se lit sur les piquages : combien, à quelle hauteur, reliés à quoi. C'est le premier examen à faire, avant toute interprétation.", kicker:"manipuler",title:"Trois raccordements, trois lectures",text:"Choisissez le schéma qui montre deux circuits reliés au volume commun.",cap:"Comptez les tuyaux reliés au ballon sur le dessin.",tp:"Repérez les circulateurs et les quatre piquages.",bts:"Reliez l’architecture aux transferts possibles entre primaire et secondaire.",scene:connection,wire:brancherTampon,equivalent:(value)=>["Montage série : un seul chemin; inertie visible, pas de découplage démontré.","Montage quatre piquages : deux circuits et un volume commun; découplage possible dans le schéma. Cliquez les trois régimes pour voir le sens s’inverser.","Montage en dérivation : circulation dans le volume à vérifier; découplage non démontré."][value||0],action:{type:"choice",sceneFor:true,prompt:"Quel dessin montre deux circuits avec deux débits pouvant différer ?",options:[{label:"Deux piquages en série"},{label:"Quatre piquages primaire / secondaire"},{label:"Piquage en dérivation"}],correct:1,explain:"Le montage quatre piquages montré relie deux circuits au volume commun. Il faut encore analyser les transferts."}},
    {short:"Attribuer",narration: "Faites la distinction entre ce que le montage montre et ce que l'on suppose. Dire « ce ballon apporte de l'inertie » est démontrable : il y a du volume, donc de l'inertie. Dire « ce ballon découple les circuits » demande de vérifier qu'il y a bien deux circuits distincts reliés à un volume commun, avec deux circulateurs. Dire « ce ballon stratifie » demande des mesures de température à plusieurs hauteurs. Chaque affirmation a son niveau de preuve, et il ne faut pas les mélanger. La surpromesse, en compte rendu, se retourne toujours contre celui qui l'a écrite.", kicker:"interpréter",title:"Fonction montrée ou supposée ?",text:"Classez les affirmations sans surpromesse.",cap:"Nommez ce que montre vraiment le dessin.",tp:"Écrivez ce que le schéma permet d’affirmer.",bts:"Nommez les vérifications nécessaires avant dimensionnement.",scene:roles,equivalent:"Les fonctions sont classées en montrées, à vérifier et non automatiques.",action:{type:"match",prompt:"Associez chaque affirmation à son niveau de preuve.",options:["Montrée par le schéma","À vérifier par mesures","Non automatique"],items:[{label:"Présence d’un volume d’eau",answer:0},{label:"Part réellement balayée",answer:1},{label:"Découplage pour tout raccordement",answer:2}],explain:"La présence du ballon ne prouve ni le volume utile ni le découplage dans toutes les architectures."}},
    {short:"Volume utile",narration: "Le volume nominal n'est pas le volume utile. Un ballon de cinq cents litres ne met pas cinq cents litres à votre disposition : seule la part effectivement balayée entre les températures de fonctionnement participe. Cette part dépend des piquages, des écarts de température admis, et du régime de l'installation. C'est pourquoi un ballon qui paraît largement dimensionné peut ne pas suffire à supprimer les cycles courts. Le curseur de ce modèle est qualitatif : il illustre l'écart entre nominal et utile, il ne dimensionne aucun produit.", kicker:"mesurer",title:"Nominal ne veut pas dire utile",text:"Déplacez la part balayée représentée. Le curseur est qualitatif et ne dimensionne aucun produit.",cap:"Lisez le pourcentage affiché sur le ballon.",tp:"Observez que le chemin peut mobiliser une part différente du volume.",bts:"Expliquez les limites d’un modèle sans données d’écoulement et de température.",scene:useful,equivalent:(v)=>`Le modèle colore ${v} pour cent du volume comme balayé. Cette part est une donnée pédagogique, pas un résultat de produit.`,action:{type:"range",prompt:"Faites varier la part de volume balayée.",label:"Part représentée",min:20,max:100,step:10,value:60,evaluate:(v)=>({readout:`${v} %`,observation:v<50?"Une faible part est représentée mobilisée : le volume nominal ne suffit pas.":v<100?"Une part importante est mobilisée, mais le modèle ne prouve ni stratification ni performance réelle.":"Tout le volume est coloré dans le dessin; seule une mesure ou une étude réelle confirmerait ce cas."})}},
    {short:"Vérifier",narration: "Pour prouver le rôle réel d'un ballon, mesurez avant d'affirmer. Relevez les températures à ses différents piquages, dans un état de fonctionnement connu, et suivez-les dans le temps. C'est la comparaison de ces valeurs qui vous dira si les circuits sont réellement découplés, s'il y a stratification, et si le volume travaille. Sans ces relevés, vous ne pouvez décrire que le montage, et c'est déjà utile. Mais dire ce que le ballon fait vraiment demande des mesures — comme toujours sur cette ligne. Cette prudence évite de facturer un découplage qui n'existe pas encore dans les faits.", kicker:"conclure",title:"Prouver le rôle réel",text:"Ordonnez les contrôles avant de parler de découplage.",cap:"Suivez les tuyaux avant de nommer le rôle du ballon.",tp:"Suivez les circuits et rendez compte.",bts:"Croisez débits et températures avant le bilan.",scene:method,equivalent:"La méthode lit les piquages, suit les débits, observe le volume utile, vérifie transferts et températures, puis conclut.",action:{type:"sequence",prompt:"Placez la vérification dans l’ordre.",items:["Lire les piquages","Suivre les débits","Observer le volume utile","Vérifier transferts et températures","Conclure"],correctOrder:[0,1,2,3,4],explain:"La fonction se démontre à partir de l’architecture et des grandeurs, pas du nom ballon tampon."}}
  ],quiz:[
    {context:"Un ballon est raccordé en série avec deux piquages.",question:"Quelle fonction est directement visible ?",options:["Ajout de volume sur le chemin","Découplage de deux circuits","Équilibrage automatique","Stratification garantie"],correct:0,explain:"Un seul chemin traverse le volume; le découplage n’est pas démontré."},
    {context:"Un schéma montre quatre piquages et deux circulateurs.",question:"Quelle conclusion est juste ?",options:["Deux débits peuvent différer; les transferts internes sont à analyser","Toutes les températures sont identiques","Le ballon équilibre toutes les branches","Le volume utile est toujours nominal"],correct:0,explain:"Le schéma permet le découplage, mais son fonctionnement se vérifie par les flux et températures."},
    {context:"Le volume nominal est connu.",question:"Que faut-il encore vérifier ?",options:["La part réellement mobilisée dans les conditions du système","La couleur de la cuve","Le nom du fabricant seul","Un seuil universel"],correct:0,explain:"Le volume utile dépend du raccordement et du fonctionnement."},
    {context:"Un dossier attribue trois fonctions au ballon sans schéma.",question:"Quelle démarche adopter ?",options:["Lire piquages, débits et températures avant de confirmer","Recopier les fonctions","Supposer un découplage","Ignorer le raccordement"],correct:0,explain:"Chaque fonction doit être reliée à une preuve du montage."}
  ],summaryScene:connection(1),summaryEquivalent:"Synthèse : le montage quatre piquages peut associer inertie et découplage; les transferts et le volume utile restent à vérifier."};
})();
