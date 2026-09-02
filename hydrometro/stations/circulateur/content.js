(() => {
  "use strict";

  const shell = (id, title, desc, body) => `<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker><pattern id="run-${id}" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 9L9 0" stroke="#3d7fca" stroke-width="2"/></pattern></defs>${body}</svg>`;

  const symbol = shell("circ-symbol", "Circulateur et sens d’écoulement",
    "Le symbole validé de pompe à débit variable est placé sur une conduite. Une flèche et le mot écoulement indiquent le sens. Le circulateur fournit une hauteur au débit du réseau.",
    `<path d="M55 220H260M460 220H665" stroke="#1b3a63" stroke-width="15"/>
     <circle cx="360" cy="220" r="95" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     <image href="assets/pompe_debit_variable.svg" x="300" y="160" width="120" height="120"/>
     <path d="M475 175H615" stroke="#3d7fca" stroke-width="8" marker-end="url(#arr-circ-symbol)"/>
     <text x="545" y="145" text-anchor="middle" font-size="18" font-weight="700">ÉCOULEMENT →</text>
     <rect x="90" y="65" width="540" height="62" rx="18" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="5 5"/>
     <text x="360" y="92" text-anchor="middle" font-size="18" font-weight="700">DÉBIT Q · m³/h</text><text x="360" y="116" text-anchor="middle" font-size="16">HAUTEUR H · mCE</text>
     <text x="360" y="365" text-anchor="middle" font-size="16">Dans une boucle fermée, H sert surtout à vaincre les pertes de charge.</text>`);

  function curveScene({ k = .5, speed = 1, id = "circ-curve" } = {}) {
    const qMax = 5;
    const x = (q) => 80 + q * 108;
    const y = (h) => 350 - h * 46;
    const pumpH = (q) => Math.max(0, 6 * speed * speed - .18 * q * q);
    const netH = (q) => k * q * q;
    const qOp = Math.min(qMax, Math.sqrt((6 * speed * speed) / (k + .18)));
    const hOp = netH(qOp);
    const curve = (fn) => {
      const points = [];
      for (let i = 0; i <= 40; i += 1) {
        const q = i * qMax / 40;
        const h = fn(q);
        points.push(`${points.length ? "L" : "M"}${x(q).toFixed(1)},${y(Math.min(6, h)).toFixed(1)}`);
        if (h > 6) break;
      }
      return points.join(" ");
    };
    const desc = `Graphique débit-hauteur. La courbe pompe descend et la courbe réseau monte. Leur intersection est à environ ${qOp.toFixed(1)} mètre cube par heure et ${hOp.toFixed(1)} mètre de colonne d’eau dans ce modèle simplifié.`;
    return shell(id, "Courbes pompe et réseau", desc,
      `<rect x="55" y="42" width="630" height="335" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
       ${Array.from({length:6},(_,i)=>`<path d="M80 ${y(i)}H650" stroke="rgba(27,58,99,.13)" stroke-width="1"/><text x="70" y="${y(i)+5}" text-anchor="end" font-size="12">${i}</text>`).join("")}
       ${Array.from({length:6},(_,i)=>`<path d="M${x(i)} 350V74" stroke="rgba(27,58,99,.13)" stroke-width="1"/><text x="${x(i)}" y="369" text-anchor="middle" font-size="12">${i}</text>`).join("")}
       <path d="M80 74V350H650" fill="none" stroke="#1b3a63" stroke-width="3"/>
       <path d="${curve(pumpH)}" fill="none" stroke="#3d7fca" stroke-width="6"/>
       <path d="${curve(netH)}" fill="none" stroke="#c9451a" stroke-width="6" stroke-dasharray="10 7"/>
       <circle cx="${x(qOp)}" cy="${y(hOp)}" r="11" fill="#fffdf8" stroke="#1e7e54" stroke-width="6"/>
       <text x="${Math.min(610,x(qOp)+18)}" y="${Math.max(92,y(hOp)-16)}" font-size="14" font-weight="700">POINT DE FONCTIONNEMENT</text>
       <text x="365" y="405" text-anchor="middle" font-size="15" font-weight="700">DÉBIT Q (m³/h)</text><text x="20" y="220" transform="rotate(-90 20 220)" text-anchor="middle" font-size="15" font-weight="700">HAUTEUR H (mCE)</text>
       <text x="505" y="65" font-size="14" fill="#3d7fca" style="fill:#3d7fca" font-weight="700">— POMPE</text><text x="585" y="65" font-size="14" fill="#c9451a" style="fill:#c9451a" font-weight="700">-- RÉSEAU</text>
       <rect x="92" y="88" width="166" height="48" rx="12" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/><text x="175" y="109" text-anchor="middle" font-size="14" font-weight="700">Q ≈ ${qOp.toFixed(1)} m³/h</text><text x="175" y="129" text-anchor="middle" font-size="14" font-weight="700">H ≈ ${hOp.toFixed(1)} mCE</text>`);
  }

  const measurements = shell("circ-measure", "Points de mesure autour du circulateur",
    "Deux prises de pression encadrent le circulateur, un débitmètre est placé sur la boucle et la commande est relevée. Le bruit reste un symptôme, pas une mesure suffisante.",
    `<path d="M70 225H650" stroke="#1b3a63" stroke-width="15"/>
     <circle cx="360" cy="225" r="72" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><path d="M325 260L420 225L325 190Z" fill="url(#run-circ-measure)" stroke="#3d7fca" stroke-width="4"/>
     <circle cx="218" cy="225" r="24" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="4 4"/><text x="218" y="231" text-anchor="middle" font-size="14" font-weight="700">p₁</text>
     <circle cx="502" cy="225" r="24" fill="#fff4e0" stroke="#b06a00" stroke-width="3" stroke-dasharray="4 4"/><text x="502" y="231" text-anchor="middle" font-size="14" font-weight="700">p₂</text>
     <rect x="535" y="78" width="135" height="70" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="603" y="108" text-anchor="middle" font-size="16" font-weight="700">DÉBIT</text><text x="603" y="132" text-anchor="middle" font-size="15">Q (m³/h)</text>
     <rect x="50" y="78" width="150" height="70" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><text x="125" y="108" text-anchor="middle" font-size="16" font-weight="700">COMMANDE</text><text x="125" y="132" text-anchor="middle" font-size="15">mode / vitesse</text>
     <path d="M218 175V148M502 175V148" stroke="#1b3a63" stroke-width="3" stroke-dasharray="5 4"/>
     <text x="360" y="356" text-anchor="middle" font-size="18" font-weight="700">Δp + Q + COMMANDE + ÉTAT DU RÉSEAU</text>`);

  const diagnosis = shell("circ-diag", "Démarche de réglage contrôlé",
    "Deux relevés chiffrés pédagogiques encadrent la séquence : avant, vitesse cent pour cent, débit 2,4 mètre cube par heure, pression différentielle 0,42 bar, bruit notable ; après, vitesse quatre-vingts pour cent, débit 2,0, pression 0,30, bruit atténué à confirmer. La séquence montre état initial, mesure, petite action, stabilisation, nouveau relevé et conclusion. Le circulateur n’est pas remplacé au premier bruit.",
    `<g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">${["État initial", "Mesurer", "Régler", "Stabiliser", "Relever", "Conclure"].map((t,i)=>`<rect x="${18+i*117}" y="160" width="103" height="82" rx="14"/><text x="${69+i*117}" y="194" text-anchor="middle" font-size="14" font-weight="700">${t}</text><text x="${69+i*117}" y="218" text-anchor="middle" font-size="12">${i+1}</text>`).join("")}</g>
     ${Array.from({length:5},(_,i)=>`<path d="M${121+i*117} 201H${135+i*117}" stroke="#c9451a" stroke-width="5" marker-end="url(#arr-circ-diag)"/>`).join("")}
     <rect x="105" y="52" width="230" height="86" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
     <text x="220" y="79" text-anchor="middle" font-size="15" font-weight="700">AVANT · vitesse 100 %</text>
     <text x="220" y="103" text-anchor="middle" font-size="14">Q = 2,4 m³/h · Δp = 0,42 bar</text>
     <text x="220" y="125" text-anchor="middle" font-size="13">bruit d’écoulement notable</text>
     <path d="M345 95H385" stroke="#c9451a" stroke-width="5" marker-end="url(#arr-circ-diag)"/>
     <rect x="395" y="52" width="230" height="86" rx="14" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/>
     <text x="510" y="79" text-anchor="middle" font-size="15" font-weight="700">APRÈS · vitesse 80 %</text>
     <text x="510" y="103" text-anchor="middle" font-size="14">Q = 2,0 m³/h · Δp = 0,30 bar</text>
     <text x="510" y="125" text-anchor="middle" font-size="13">bruit atténué · à confirmer</text>
     <rect x="150" y="292" width="420" height="62" rx="16" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="5 5"/><text x="360" y="319" text-anchor="middle" font-size="16" font-weight="700">Bruit ≠ preuve d’une pompe défectueuse</text><text x="360" y="342" text-anchor="middle" font-size="14">vérifier aussi réseau, air, vannes et débit</text>`);

  window.STATION_CONFIG = {
    code:"E4", id:"circulateur", title:"Circulateur", next:"poursuivre vers les pertes de charge",
    levels:{
      CAP:{objective:"Reconnaître le circulateur, le sens de l’eau et lire le débit.",assessment:"nommer le sens, lire le débit et signaler un bruit"},
      TP:{objective:"Contrôler et régler un circulateur en observant l’effet sur le réseau.",assessment:"identifier, mesurer et conduire un réglage contrôlé"},
      BTS:{objective:"Déterminer le point de fonctionnement issu des courbes pompe et réseau.",assessment:"lire les courbes, les unités et justifier l’effet d’un réglage"}
    },
    steps:[
      {short:"Identifier",narration: "Vous avez vu à la station Débit que la pompe ne décide pas seule du débit. Cette station va vous le montrer en manipulant. Un circulateur ne travaille jamais dans le vide : il agit dans une boucle, et il doit vaincre ce que cette boucle lui oppose. Deux informations vont donc toujours ensemble et ne se lisent jamais séparément : le débit qu'il fait passer, et la hauteur, c'est-à-dire l'effort qu'il doit fournir pour y arriver. Un circulateur n'a pas un débit : il a un couple débit-hauteur, qui dépend du réseau où vous le posez.", kicker:"repérer",title:"Débit et hauteur, ensemble",text:"Un circulateur agit dans une boucle. Son débit dépend aussi de la résistance du réseau.",cap:"Montre le sens de l’écoulement avec la flèche.",tp:"Repère le sens, la commande et les grandeurs Q et H.",bts:"Interprète H comme énergie hydraulique par unité de poids, exprimée ici en mCE.",scene:symbol,equivalent:"Le circulateur est sur une boucle. La flèche indique l’écoulement. Les grandeurs affichées sont débit Q en mètre cube par heure et hauteur H en mètre de colonne d’eau.",action:{type:"choice",prompt:"Dans une boucle fermée, que représente surtout la hauteur du circulateur ?",options:[{label:"L’énergie pour vaincre les pertes de charge"},{label:"La hauteur du bâtiment seule"},{label:"La température de départ"},{label:"Le volume du vase"}],correct:0,explain:"Dans la boucle fermée simplifiée, la hauteur fournie compense principalement les pertes de charge du chemin hydraulique."}},
      {short:"Courbes",narration: "Fermez progressivement la vanne et regardez ce qui se passe. La courbe du réseau se redresse : à chaque débit, il faut désormais davantage de pression pour faire passer la même eau. Le point où les deux courbes se croisent glisse vers la gauche, vers un débit plus faible. Notez bien que la pompe, elle, n'a pas changé : c'est le réseau qui a changé. C'est exactement ce qui arrive quand un filtre s'encrasse, quand un clapet reste à demi ouvert, ou quand une vanne d'isolement a été refermée à moitié après une intervention. Le débit chute sans qu'on ait touché à la pompe.", kicker:"comprendre",title:"La pompe rencontre le réseau",text:"Ferme progressivement la vanne virtuelle : la résistance augmente et la courbe réseau se redresse.",cap:"Suis le point qui se déplace sur le graphique.",tp:"Observe le déplacement du point de fonctionnement.",bts:"Lis Q et H à l’intersection, sans isoler la courbe pompe du réseau.",scene:(value)=>curveScene({k:Number(value),speed:1,id:"circ-resistance"}),equivalent:(value)=>{const q=Math.sqrt(6/(Number(value)+.18));const h=Number(value)*q*q;return`Coefficient pédagogique du réseau ${Number(value).toFixed(2)}. Intersection approximative : ${q.toFixed(1)} m³/h et ${h.toFixed(1)} mCE.`;},action:{type:"range",prompt:"Modifie la résistance du réseau.",label:"Coefficient K pédagogique",min:.15,max:1.2,step:.05,value:.5,evaluate:(value)=>{const q=Math.sqrt(6/(value+.18));const h=value*q*q;return{readout:`K ${value.toFixed(2)}`,observation:`Point du modèle : Q ≈ ${q.toFixed(1)} m³/h ; H ≈ ${h.toFixed(1)} mCE. Résistance plus forte : débit plus faible.`};}}},
      {short:"Régler",narration: "Faites varier maintenant la vitesse. Cette fois, c'est la courbe de la pompe qui se déplace, et le réseau qui reste identique. Augmentez la vitesse, la pompe propose davantage à chaque niveau d'effort, et le point de croisement remonte vers un débit plus élevé. C'est le réglage le plus courant sur les circulateurs modernes. Mais soyez conscient de ce que vous achetez : plus de vitesse, c'est plus de débit, mais aussi plus de consommation, plus de bruit, et davantage de contrainte sur le réseau. Un circulateur poussé au maximum dans un réseau étroit finit par siffler.", kicker:"observer l’effet",title:"Changer la vitesse déplace la courbe pompe",text:"Fais varier la vitesse relative. Le réseau reste identique; la courbe pompe et son intersection changent.",cap:"Compare le débit avant et après le réglage.",tp:"Compare le débit avant et après, puis laisse stabiliser.",bts:"Le tracé applique un modèle simplifié des lois d’affinité; il ne remplace pas les courbes constructeur.",scene:(value)=>curveScene({k:.5,speed:Number(value)/100,id:"circ-speed"}),equivalent:(value)=>{const s=Number(value)/100,q=Math.sqrt(6*s*s/.68),h=.5*q*q;return`Vitesse relative ${value} pour cent. Point modélisé environ ${q.toFixed(1)} m³/h et ${h.toFixed(1)} mCE.`;},action:{type:"range",prompt:"Modifie la vitesse relative.",label:"Vitesse relative",min:60,max:100,step:5,value:80,evaluate:(value)=>{const s=value/100,q=Math.sqrt(6*s*s/.68),h=.5*q*q;return{readout:`${value} %`,observation:`Q ≈ ${q.toFixed(1)} m³/h ; H ≈ ${h.toFixed(1)} mCE. Le réseau fixe avec la pompe le nouveau point.`};}}},
      {short:"Mesurer",narration: "Une règle de métier, maintenant, et elle n'est pas négociable. On ne diagnostique pas un circulateur à l'oreille. Un bruit peut venir d'air dans le circuit, d'une vitesse excessive, d'un roulement fatigué ou d'un défaut de fixation — quatre causes qui n'appellent pas la même réparation. Avant de toucher quoi que ce soit, relevez trois choses dans un état connu : la commande appliquée, le débit obtenu, et la pression différentielle aux bornes de la pompe. Ces trois valeurs, notées ensemble, valent tous les avis. Elles vous serviront aussi de point de comparaison après votre intervention.", kicker:"mesurer",title:"Relever avant de toucher",text:"Le bruit ne suffit pas. Relève commande, débit et pression différentielle dans un état connu.",cap:"Relève le débit et la commande avant de toucher.",tp:"Note le mode, le débit et les pressions avant réglage.",bts:"Compare le point relevé aux courbes et au besoin hydraulique.",scene:measurements,equivalent:"Le circulateur est encadré par deux prises de pression; le débit et la commande sont relevés. Le bruit est présenté comme symptôme complémentaire.",action:{type:"match",prompt:"Associe la grandeur à son usage.",options:["Débit du circuit","Hauteur fournie","État de commande"],items:[{label:"Q en m³/h",answer:0},{label:"Δp convertie selon le protocole",answer:1},{label:"Mode / vitesse",answer:2}],explain:"Ces relevés décrivent un point de fonctionnement et l’action de commande. Leur méthode dépend de l’installation et des instruments."}},
      {short:"Vérifier",narration: "Vous allez conduire un avant et un après complet. La discipline est celle que vous connaissez déjà : un seul changement à la fois, une attente pour que l'installation se stabilise, puis un nouveau relevé dans les mêmes conditions que le premier. Un réglage n'est pas terminé quand vous avez tourné le bouton : il est terminé quand vous pouvez montrer, chiffres à l'appui, ce qu'il a produit. C'est ce qui distingue un réglage d'un tâtonnement — et c'est aussi ce qui vous protège si quelqu'un conteste votre intervention six mois plus tard.", kicker:"hypothèse",title:"Régler sans remplacer au hasard",text:"Conduis un avant/après. Un réglage n’est conclu qu’après stabilisation et nouveau relevé.",cap:"Signale le bruit sans démonter le circulateur.",tp:"Rends compte du symptôme, de l’action et de l’effet mesuré.",bts:"Vérifie si l’intersection mesurée et la consommation répondent au besoin avant d’élargir le diagnostic.",scene:diagnosis,equivalent:"Six étapes : état initial, mesurer, régler, stabiliser, relever, conclure. Le bruit seul ne prouve pas une panne de pompe.",action:{type:"sequence",prompt:"Ordonne le réglage contrôlé.",items:["Noter l’état initial","Relever Q et Δp","Modifier un réglage","Attendre la stabilisation"],correctOrder:[0,1,2,3],explain:"Après stabilisation, un nouveau relevé doit être comparé à l’état initial avant la conclusion."}}
    ],
    quiz:[
      {context:"Une courbe pompe descend et une courbe réseau monte.",question:"Où se trouve le point de fonctionnement ?",options:["À leur intersection","Au débit maximal de la pompe","À l’origine seulement","Sur la courbe réseau seule"],correct:0,explain:"Le débit et la hauteur satisfont simultanément la pompe et le réseau à l’intersection."},
      {context:"Une vanne se ferme davantage sur le réseau du modèle.",question:"Quel effet est attendu ?",options:["Résistance en hausse, débit d’intersection en baisse","Débit garanti en hausse","Courbe réseau supprimée","Hauteur toujours nulle"],correct:0,explain:"La courbe réseau se redresse; l’intersection se déplace vers un débit plus faible."},
      {context:"Un réseau fermé dessert un étage élevé.",question:"Quelle affirmation évite le piège ?",options:["La hauteur du circulateur ne se réduit pas à la hauteur géométrique du bâtiment","H égale toujours l’altitude","Le vase crée le débit","La soupape règle Q"],correct:0,explain:"Dans une boucle fermée, l’effet statique aller/retour se compense dans le modèle; la pompe vainc surtout les pertes de charge."},
      {context:"Le réseau est bruyant après un réglage.",question:"Quelle démarche est sûre ?",options:["Comparer état initial, Q, Δp, commande et réseau","Remplacer le circulateur immédiatement","Fermer toutes les vannes","Neutraliser la soupape"],correct:0,explain:"Le bruit est un indice. La mesure avant/après et l’examen du réseau permettent de tester une hypothèse."}
    ],
    summaryScene:curveScene({k:.5,speed:1,id:"circ-summary"}),
    summaryEquivalent:"Synthèse : le point de fonctionnement est la rencontre de la courbe pompe et de la courbe réseau. Une vanne ou une vitesse modifie cette rencontre."
  };
})();
