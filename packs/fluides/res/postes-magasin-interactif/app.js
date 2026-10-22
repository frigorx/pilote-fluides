"use strict";

const PH = {"compresseurs":{"src":"images/compresseurs.webp","t":"Compresseurs","alt":"Quatre compresseurs : à pistons, scroll, à vis, hermétique."},"clapet":{"src":"images/clapet-vannes-service.webp","t":"Clapet et vannes","alt":"Un clapet anti-retour à gauche, deux vannes d’isolement à droite."},"separateur":{"src":"images/separateur-huile.webp","t":"Séparateur d’huile","alt":"Séparateur d’huile bleu, avec ses raccords cuivre."},"condenseur":{"src":"images/condenseur-air.webp","t":"Condenseur à air","alt":"Condenseur à air à deux ventilateurs."},"bouteille":{"src":"images/reservoir-liquide.webp","t":"Bouteille de liquide","alt":"Bouteille de liquide sur pieds."},"evaporateur":{"src":"images/evaporateur-air.webp","t":"Évaporateur","alt":"Évaporateur à deux ventilateurs, suspendu."},"detendeur":{"src":"images/detendeur-thermostatique.webp","t":"Détendeur","alt":"Détendeur thermostatique, avec son bulbe et son capillaire."},"electrovanne":{"src":"images/electrovanne.webp","t":"Électrovanne","alt":"Électrovanne : bobine bleue sur un corps en laiton."},"filtre":{"src":"images/filtre-deshydrateur.webp","t":"Filtre déshydrateur","alt":"Filtre déshydrateur noir à raccords cuivre."},"voyant":{"src":"images/voyant-liquide.webp","t":"Voyant liquide","alt":"Voyant liquide en laiton, avec son hublot."},"pressostats":{"src":"images/pressostats.webp","t":"Pressostats","alt":"Deux pressostats : un gris, un bleu."},"capteur":{"src":"images/capteur-pression.webp","t":"Capteur de pression","alt":"Capteur de pression avec sa prise électrique."},"sonde":{"src":"images/sonde-temperature.webp","t":"Sonde de température","alt":"Sonde de température et son câble."},"compresseur":{"src":"images/compresseur.webp","t":"Compresseur","alt":"Compresseur à pistons semi-hermétique : le moteur est dans le carter."},"pressostatBP":{"src":"images/pressostat-bp.webp","t":"Pressostat BP","alt":"Pressostat basse pression : le boîtier bleu."},"pressostatHP":{"src":"images/pressostat-hp.webp","t":"Pressostat HP","alt":"Pressostat haute pression : le boîtier gris."},"contacteur":{"src":"images/contacteur.webp","t":"Contacteur","alt":"Contacteur tripolaire : ses bornes de puissance en haut et en bas."}};

const ORG = "../../../../jouerezo/voyage/organes/";
const STATION = {
  slug: "postes-magasin-interactif", cle: "postes-magasin", port: 8799, carte: true, supportPc: true,
  titre: "Raccorder les postes d’un magasin : meubles, chambres, électrovannes",
  titreCourt: "Raccorder les postes d’un magasin — meubles, chambres, électrovannes",
  titleTag: "Raccorder les postes d’un magasin — meubles, chambres, électrovannes",
  description: "Cours interactif : raccorder un poste (meuble ou chambre froide) à une centrale positive : l’ordre sur la ligne liquide, le sens de l’électrovanne, qui l’ouvre et la ferme, le bulbe du détendeur, la conduite d’aspiration, les contrôles.",
  brandSmall: "Postes d’un magasin",
  eyebrow: "FLUIDES · LES POSTES D’UN MAGASIN",
  h1: ["Raccorder les postes", "d’un magasin"],
  intro: "Dans un magasin, chaque meuble et chaque chambre est un poste, relié à la même centrale. Vous apprenez ce qui appartient à un poste, l’ordre des pièces sur sa ligne liquide, le rôle de l’électrovanne, la place du bulbe, puis les contrôles avant d’ouvrir.",
  homeVisual: { carte: true, legende: "Une ligne liquide, une électrovanne, un détendeur, un évaporateur : un poste.", images: [
    { src: ORG + "electrovanne.webp", alt: "Électrovanne : une bobine bleue sur un corps en laiton, avec ses deux raccords cuivre." },
    { src: ORG + "detendeur.webp", alt: "Détendeur thermostatique : tête, bulbe et capillaire." },
    { src: ORG + "evaporateur.webp", alt: "Évaporateur à deux ventilateurs, celui d’un meuble ou d’une chambre froide." } ] },
  homeNote: "<strong>Cours sur le raccordement d’un poste.</strong> Le poste décrit est un modèle courant (électrovanne, détendeur thermostatique, évaporateur sur une centrale positive). Sur le chantier, le schéma de l’installation et la notice des pièces font foi. Aucune pression ni température chiffrée.",
  codesBox: [
    ["TP Monteur dépanneur frigoriste (RNCP37876) — compétence professionnelle CP7", "« Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée »."],
    ["Avant ce cours", "Assembler une centrale positive (la centrale elle-même : compresseurs, collecteurs, bouteille)."]
  ],
  printCodes: "TP Monteur dépanneur frigoriste (RNCP37876), compétence professionnelle CP7 « Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée ».",
  printLoi: "",
  reference: "TP Monteur dépanneur frigoriste (RNCP37876) : CP7",
  codeCle: { "TP CP7": "tp_mdf" },
  dossiers: [
    { id: "poste", label: "Un poste", note: "ce qui lui appartient" },
    { id: "liquide", label: "La ligne liquide", note: "l’ordre, le sens" },
    { id: "commande", label: "Qui commande", note: "l’électrovanne, le régulateur" },
    { id: "retour", label: "Le retour", note: "bulbe, aspiration" },
    { id: "controler", label: "Contrôler", note: "avant d’ouvrir" },
    { id: "bilan", label: "Bilan", note: "un cas, puis l’essentiel" }
  ],
  sceneDefaut: { t: "La centrale.", d: "Trois postes à gauche, trois compresseurs entre deux collecteurs, séparateur, condenseur et bouteille en haut." },
  src: {
    reg: [],
    ref: [
      "**TP Monteur dépanneur frigoriste (RNCP37876), CP7** : « Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée » (libellé de `rattachement/entrees/referentiels-pilotes.json` ; la fiche de mission donnait la forme abrégée). Le TP MDF n’est pas dans `HAL-v3/donnees/referentiels/peda/` : à confirmer."
    ],
    fonds: [
      "**Le « Voyage dans tous ses états — les centrales frigorifiques »** (`jouerezo/donnees/voyage-centrale.js`, `voyage/centrale.html`) : chaque poste a son électrovanne, son détendeur et son évaporateur ; le régulateur du meuble ouvre l’électrovanne quand l’air se réchauffe et la ferme quand il est assez froid ; la conduite d’aspiration est un gros tube isolé ; tous les meubles bouillent à la même basse pression ; les surgelés ont leur propre centrale ; le bulbe du détendeur se pose à la sortie de l’évaporateur (carte d’identité du détendeur, décision de Franck du 03/10).",
      "**La croix du frigoriste, circuit de base du Voyage** (`jouerezo/moteur/voyage-dessin.js`, `D.CIRCUIT_PTS`) : bouteille, filtre déshydrateur, voyant, électrovanne, détendeur, évaporateur, dans cet ordre le long de la ligne liquide.",
      "`03_BAC-MFER/Froid-Frigorifique/TP Centrale de supermarché.docx` : la liste des organes d’une centrale (électrovanne, détendeur, évaporateur par poste).",
      "`jouerezo/voyage/organes/*.webp` : images de synthèse des organes, déjà en ligne sur le site (voir SOURCES-IMAGES.md).",
      "Renvois vers l’existant, sans le refaire : L’électrovanne, Le détendeur, Le filtre déshydrateur, Le voyant liquide, Le retour d’huile naturel (pentes et siphons), la station azote du Tour de main."
    ],
    sans: [
      "**L’ordre des pièces sur la ligne liquide d’un poste** (filtre, voyant, électrovanne, détendeur, évaporateur) : celui du circuit de base du Voyage ; il peut varier selon les installations (un filtre par poste, voyant avant ou après). **À relire par Franck.**",
      "Pourquoi isoler la conduite d’aspiration (perte de froid, eau de condensation) : pratique courante ; le Voyage dit seulement « un gros tube isolé ».",
      "Les six contrôles avant d’ouvrir : pratique courante, sans valeur chiffrée.",
      "Aucune pression, température, pente, diamètre, tension de bobine ou couple n’est donné : ils viennent du schéma et de la notice."
    ]
  },
  images: [
    ["`jouerezo/moteur/voyage-dessin.js` et `voyage-centrale-dessin.js` (carte de la centrale, surlignages)", "Dessin du « Voyage dans tous ses états » (inerWeb Studio), repris sans retouche ; les organes sont les symboles posés par le Voyage", "Droits réservés inerWeb"],
    ["`jouerezo/voyage/symboles/*.svg`", "Planche Éduscol « Le circuit frigorifique » et collection QElectroTech (convertie dans la bibliothèque de F. Henninot), chargés depuis le Voyage, non copiés", "CC BY 3.0 — <https://github.com/qelectrotech/qelectrotech-elements>"],
    ["`jouerezo/voyage/organes/filtre.webp`, `voyant.webp`, `electrovanne.webp`, `detendeur.webp`, `evaporateur.webp`", "Images de synthèse des organes, déjà en ligne sur inerweb.fr (`tome-3-technologie-organes/images-organes/`, juillet 2026), reprises par le Voyage le 03/10/2026", "Droits réservés inerWeb (voir `jouerezo/voyage/organes/SOURCES.md`)"]
  ],
  lireMoi: {
    ligne: "Cours interactif du plan thermo-techno, ligne « Les centrales », après « Assembler une centrale positive ».",
    fait: "  Il prend un poste (meuble ou chambre froide) et le raccorde à la centrale : ce qui lui appartient, l’ordre des pièces sur sa ligne\n  liquide, le sens de l’électrovanne, qui l’ouvre et la ferme, la place du bulbe du détendeur, la conduite d’aspiration, les contrôles\n  avant d’ouvrir. Il renvoie aux cours de chaque pièce plutôt que de les refaire.",
    codes: "  TP Monteur dépanneur frigoriste (RNCP37876) : CP7 « Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée ».",
    regl: ""
  }
};

/* =====================================================================
   Moteur du cours (19/10/2026) — repris du cours « Les détecteurs de fuite »
   (plan thermo-techno) : mêmes écrans, mêmes boutons, même voix, même
   impression. Seule différence : un écran se DÉCRIT (blocs + une activité)
   au lieu de se programmer ; les activités sont celles du modèle (tri,
   ordre, choix, question, liste à ouvrir, réponse libre). Ce fichier =
   le moteur (partie A) + les données du cours + le moteur (partie B).
   ===================================================================== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const quizAnswers = {};
const completed = new Set();
let current = 0;
let furthest = 0;
let extractMode = false;
let activeScreens = [];
let speechRun = 0;
let speaking = false;
let paused = false;
let autoplay = false;
let statusTimer = 0;
const voiceRates = [0.8, 0.95, 1.1, 1.25];
let rateIndex = safeStoredRateIndex();

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem(STATION.cle+"-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
function saveRate(){try{localStorage.setItem(STATION.cle+"-voice-rate",String(voiceRates[rateIndex]))}catch(_){}}
function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function stripHtml(value){const box=document.createElement("div");box.innerHTML=value;return box.textContent||""}
function screen(data){return{level:"comprendre",codes:[],prompt:"",speak:"",requiresAction:!!data.act&&data.act.type!=="aucune",...data}}
function completeCurrent(message="Action réalisée. Vous pouvez continuer."){completed.add(activeScreens[current].id);updateNav();setStatus(message)}
function setStatus(message){clearTimeout(statusTimer);$("#status-message").textContent=message;statusTimer=setTimeout(()=>{$("#status-message").textContent=""},2600)}

/* ---- Les activités du moteur commun du réseau ---- */
function choiceMarkup(choices){return `<div class="panel"><div class="cards" style="--cols:${Math.min(choices.length,3)}">${choices.map((choice,index)=>`<button class="choice" type="button" data-choice="${index}"><strong>${esc(choice.title)}</strong><small>${esc(choice.note||"")}</small></button>`).join("")}</div><div class="feedback" id="feedback">Choisissez, puis lisez la conséquence.</div></div>`}
function wireChoice(good,messages){$$('[data-choice]').forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.choice);$$('[data-choice]').forEach(item=>item.classList.remove("good","bad"));button.classList.add(index===good?"good":"bad");const feedback=$("#feedback");feedback.className=`feedback ${index===good?"good":"bad"}`;feedback.innerHTML=`<strong>${index===good?"Correct.":"À corriger."}</strong> ${esc(messages[index])}`;if(index===good)completeCurrent("Décision correcte. Vous pouvez continuer.")}))}
function checklistMarkup(items){return `<div class="panel"><div class="cards" style="--cols:${Math.min(items.length,3)}">${items.map((item,index)=>`<button class="check-card" type="button" data-check="${index}" aria-pressed="false"><strong>${esc(item.title)}</strong><small>${esc(item.note||"")}</small></button>`).join("")}</div><div class="feedback" id="feedback">Ouvrez chaque point.</div></div>`}
function wireChecklist(items){$$('[data-check]').forEach(button=>button.addEventListener("click",()=>{button.classList.add("good");button.setAttribute("aria-pressed","true");const item=items[Number(button.dataset.check)];const feedback=$("#feedback");feedback.className="feedback good";feedback.innerHTML=`<strong>${esc(item.title)}.</strong> ${esc(item.detail)}`;if($$('[data-check][aria-pressed="false"]').length===0)completeCurrent("Tous les points ont été examinés.")}))}
function quizMarkup(item){const saved=quizAnswers[item.id];return `<div class="panel"><div class="cards" style="--cols:2">${item.act.choices.map((choice,index)=>`<button class="choice ${saved===index?(index===item.act.good?"good":"bad"):""}" type="button" data-quiz="${index}" ${saved!==undefined?"disabled":""}><strong>${String.fromCharCode(65+index)}.</strong><small>${esc(choice)}</small></button>`).join("")}</div><div class="feedback ${saved===undefined?"":saved===item.act.good?"good":"bad"}" id="feedback">${saved===undefined?"Choisissez une réponse.":`<strong>${saved===item.act.good?"Correct.":"À revoir."}</strong> ${esc(item.act.explain)}`}</div></div>`}
function wireQuiz(item){$$('[data-quiz]').forEach(button=>button.addEventListener("click",()=>{if(quizAnswers[item.id]!==undefined)return;quizAnswers[item.id]=Number(button.dataset.quiz);completed.add(item.id);renderCurrent(false)}))}

/* ---- Les activités propres à ces cours (tri, ordre, cartes, réponse libre…) ---- */
function exempleMarkup(e){return `<div class="exemple"><span class="tag">Exemple résolu</span><p><strong>${esc(e.text)}</strong> → <b>${esc(e.answer)}</b></p><small>${esc(e.why)}</small></div>`}
function sortMarkup(rows,labels,example){return `<div class="panel sort${labels.length>2?" sort-multi":""}">${example?exempleMarkup({text:example.text,answer:labels[example.good],why:example.why}):""}<div class="sort-rows">${rows.map((row,index)=>`<div class="sort-row" data-row="${index}"><span class="sort-text">${esc(row.text)}</span><span class="sort-buttons">${labels.map((label,option)=>`<button type="button" class="sort-btn" data-row="${index}" data-opt="${option}">${esc(label)}</button>`).join("")}</span></div>`).join("")}</div><div class="feedback" id="feedback">Choisissez une réponse pour chaque ligne.</div></div>`}
function wireSort(rows){let done=0;$$(".sort-btn").forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.row),option=Number(button.dataset.opt),row=$(`.sort-row[data-row="${index}"]`);if(row.classList.contains("done"))return;const feedback=$("#feedback");if(option===rows[index].good){row.classList.add("done");row.querySelectorAll(".sort-btn").forEach(item=>{item.disabled=true});button.classList.add("good");done+=1;feedback.className="feedback good";feedback.innerHTML=`<strong>Correct.</strong> ${esc(rows[index].why)}`;if(done===rows.length)completeCurrent("Tout est rangé. Vous pouvez continuer.")}else{button.classList.add("bad");button.disabled=true;feedback.className="feedback bad";feedback.innerHTML=`<strong>À corriger.</strong> ${esc(rows[index].bad)}`}}))}
function orderMarkup(items,shown,example){return `<div class="panel">${example?exempleMarkup(example):""}<div class="order-list">${shown.map(index=>`<button type="button" class="order-item" data-order="${index}"><b class="order-n" aria-hidden="true"></b><span>${esc(items[index])}</span></button>`).join("")}</div><div class="feedback" id="feedback">Cliquez d’abord sur la première action.</div></div>`}
function wireOrder(items,hints){let next=0;$$("[data-order]").forEach(button=>button.addEventListener("click",()=>{if(button.classList.contains("done"))return;const index=Number(button.dataset.order),feedback=$("#feedback");if(index!==next){button.classList.add("bad");setTimeout(()=>button.classList.remove("bad"),700);feedback.className="feedback bad";feedback.innerHTML=`<strong>Pas encore.</strong> ${esc(hints[next])}`;return}button.classList.add("done");button.querySelector(".order-n").textContent=String(next+1);next+=1;feedback.className="feedback good";feedback.textContent=next===items.length?"Ordre complet.":"Bien. Et ensuite ?";if(next===items.length)completeCurrent("Ordre complet. Vous pouvez continuer.")}))}
function cardsMarkup(cards,cls=""){return `<div class="cartes ${cls}">${cards.map(card=>`<article class="carte${card.cls?" "+card.cls:""}">${card.img?`<img class="carte-img" src="${esc(card.img)}" alt="${esc(card.alt||"")}" loading="lazy">`:""}<h3>${esc(card.title)}</h3>${card.rows.map(row=>`<p><strong>${esc(row[0])}</strong> ${esc(row[1])}</p>`).join("")}</article>`).join("")}</div>`}
function libreMarkup(label,placeholder){return `<div class="panel libre"><label for="reponse-libre" class="libre-label">${esc(label||"Votre réponse, en quelques lignes :")}</label><textarea id="reponse-libre" rows="4" placeholder="${esc(placeholder||"")}"></textarea><button type="button" class="primary-button" id="voir-reponse" disabled>Voir la réponse type</button><div class="feedback" id="feedback">Écrivez d’abord. Le bouton s’ouvre après quelques mots.</div></div>`}
function wireLibre(answerHtml){const area=$("#reponse-libre"),button=$("#voir-reponse");area.addEventListener("input",()=>{button.disabled=area.value.trim().length<40});button.addEventListener("click",()=>{const feedback=$("#feedback");feedback.className="feedback good";feedback.innerHTML=answerHtml;completeCurrent("Comparez avec votre texte, puis continuez.")})}
function liensMarkup(links){return `<div class="liens">${links.map(link=>`<a class="lien-carte" href="${esc(link.href)}"><strong>${esc(link.title)}</strong><small>${esc(link.note)}</small></a>`).join("")}</div>`}
function constatMarkup(rows,caption){return `<table class="constat"><caption>${esc(caption||"Document (exemple)")}</caption><tbody>${rows.map(row=>`<tr><th scope="row">${esc(row[0])}</th><td>${esc(row[1])}</td></tr>`).join("")}</tbody></table>`}
function tableauMarkup(b){return `<table class="tableau"><caption>${esc(b.caption||"")}</caption><thead><tr>${b.head.map(h=>`<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map((c,i)=>i===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`}
function fluxMarkup(b){return `${b.label?`<h3 class="flux-titre ${b.cls||""}">${esc(b.label)}</h3>`:""}<div class="flux ${b.cls||""}" role="group" aria-label="${esc(b.label||"Enchaînement")}">${b.boxes.map((x,i)=>`<div class="flux-case ${x.cls||""}">${x.img?`<img src="${esc(x.img)}" alt="${esc(x.alt||"")}" loading="lazy">`:""}<strong>${esc(x.t)}</strong>${x.s?`<small>${esc(x.s)}</small>`:""}</div>${i<b.boxes.length-1?'<span class="flux-fleche" aria-hidden="true">→</span>':""}`).join("")}</div>${b.note?`<p class="flux-note">${b.note}</p>`:""}`}
function imagesMarkup(b){return `<div class="images-rang">${b.items.map(x=>`<figure><img src="${esc(x.img)}" alt="${esc(x.alt||"")}" loading="lazy"><figcaption><strong>${esc(x.t)}</strong>${x.s?` ${esc(x.s)}`:""}</figcaption></figure>`).join("")}</div>`}

/* Un bloc statique d'écran (l'exemple résolu, des cartes, une définition…) */
function blockMarkup(b){
  switch(b.k){
    case "exemple": return exempleMarkup(b);
    case "exemple-liste": return `<ol class="exemple-liste">${b.items.map(i=>`<li>${i}</li>`).join("")}</ol>`;
    case "def": return `<p class="definition">${b.html}</p>`;
    case "cartes": return cardsMarkup(b.cards,b.cls||"");
    case "gestes": return `<div class="gestes">${b.items.map(g=>`<article class="geste"><h3>${esc(g[0])}</h3><p>${esc(g[1])}</p></article>`).join("")}</div>`;
    case "loi": return `<div class="law-note"><strong>${esc(b.titre)}</strong><p>${b.html}</p></div>`;
    case "cas": return `<p class="cas">${b.html}</p>`;
    case "cas-boite": return `<div class="cas-boite">${b.html}</div>`;
    case "constat": return constatMarkup(b.rows,b.caption);
    case "tableau": return tableauMarkup(b);
    case "lecture": return `<ol class="lecture">${b.items.map(i=>`<li>${i}</li>`).join("")}</ol>`;
    case "interdits": return `<ol class="interdits">${b.items.map(i=>`<li>${i}</li>`).join("")}</ol>`;
    case "renvoi": return `<p class="renvoi">${b.html}</p>`;
    case "source": return `<p class="source">${b.html}</p>`;
    case "liens": return liensMarkup(b.links);
    case "flux": return fluxMarkup(b);
    case "images": return imagesMarkup(b);
    case "duo": return `<div class="duo-bloc">${b.items.map(x=>`<div>${x}</div>`).join("")}</div>`;
    case "html": return b.html;
    default: return "";
  }
}
/* L'activité d'un écran : tri, ordre, choix, question, liste à ouvrir, réponse libre */
function actMarkup(item){
  const a=item.act; if(!a) return "";
  switch(a.type){
    case "choice": return choiceMarkup(a.cards);
    case "sort": return sortMarkup(a.rows,a.labels,a.example);
    case "order": return orderMarkup(a.items,a.shown,a.example);
    case "quiz": return quizMarkup(item);
    case "check": return checklistMarkup(a.items);
    case "libre": return libreMarkup(a.label,a.placeholder);
    default: return "";
  }
}
function actWire(item){
  const a=item.act; if(!a) return;
  if(a.type==="choice") wireChoice(a.good,a.msgs);
  else if(a.type==="sort") wireSort(a.rows);
  else if(a.type==="order") wireOrder(a.items,a.hints);
  else if(a.type==="quiz") wireQuiz(item);
  else if(a.type==="check") wireChecklist(a.items);
  else if(a.type==="libre") wireLibre(a.answer);
}
function activityMarkup(item){
  if(item.render) return item.render();
  const blocs=(item.blocks||[]).map(blockMarkup).join("");
  return blocs+actMarkup(item);
}

const CP7 = "TP CP7";
const V = (nom) => ORG + nom + ".webp";

const screens = [
  /* ============ UN POSTE ============ */
  screen({ id: "poste-et-centrale", dossier: "poste", title: "Un poste : ce qui lui appartient", kicker: "Un poste · 1", codes: [CP7], level: "comprendre",
    text: "Chaque meuble et chaque chambre de la centrale est un poste. Un poste a son électrovanne, son détendeur, son évaporateur et son régulateur de température. Le reste de la centrale, il le partage avec les autres postes.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : « Propre au poste » ou « Partagé par les postes ».",
    scene: { imgs: ["evaporateur","detendeur","electrovanne"], t: "Un poste.", d: "Son évaporateur, son détendeur, son électrovanne." },
    act: { type: "sort", labels: ["Propre au poste", "Partagé par les postes"],
      example: { text: "L’électrovanne du poste", good: 0, why: "Elle s’ouvre et se ferme selon la température de ce poste seulement." },
      rows: [
        { text: "Le détendeur", good: 0, why: "Chaque poste a son détendeur, juste avant son évaporateur.", bad: "Chaque poste a son propre détendeur : il règle le liquide de cet évaporateur." },
        { text: "L’évaporateur", good: 0, why: "C’est lui qui refroidit le meuble ou la chambre.", bad: "Chaque meuble ou chambre a son évaporateur." },
        { text: "Le régulateur de température du poste", good: 0, why: "Il ouvre l’électrovanne quand l’air se réchauffe, et la ferme quand il est assez froid.", bad: "Chaque poste a son régulateur : chacun règle sa température." },
        { text: "Le collecteur d’aspiration", good: 1, why: "Toutes les vapeurs des postes s’y rejoignent : une seule basse pression.", bad: "Il est unique : toutes les vapeurs des postes y arrivent." },
        { text: "Les compresseurs", good: 1, why: "Les mêmes compresseurs aspirent la vapeur de tous les postes.", bad: "Les compresseurs sont communs : ils servent tous les postes." },
        { text: "La bouteille de liquide", good: 1, why: "Une seule réserve de liquide alimente tous les postes.", bad: "Elle est unique : elle alimente tous les postes." }
      ] },
    correction: "Propre au poste : électrovanne, détendeur, évaporateur, régulateur. Partagé : collecteur d’aspiration, compresseurs, bouteille." }),

  /* ============ LA LIGNE LIQUIDE ============ */
  screen({ id: "ordre-ligne-liquide", dossier: "liquide", title: "Sur la ligne liquide, dans quel ordre ?", kicker: "Ligne liquide · 1", codes: [CP7], level: "appliquer",
    text: "Le liquide quitte la bouteille et arrive au poste en passant par quatre pièces, puis il bout dans l’évaporateur. L’ordre compte : chaque pièce a besoin de celle qui la précède.",
    prompt: "La bouteille est déjà posée en exemple. Cliquez les cinq pièces suivantes dans l’ordre : d’abord la première, puis la suivante.",
    blocks: [{ k: "images", items: [
      { img: V("filtre"), alt: "Filtre déshydrateur noir à raccords cuivre", t: "Filtre déshydrateur", s: "retient l’humidité" },
      { img: V("voyant"), alt: "Voyant liquide en laiton", t: "Voyant", s: "hublot du liquide" },
      { img: V("electrovanne"), alt: "Électrovanne à bobine bleue", t: "Électrovanne", s: "ouvre, ferme" },
      { img: V("detendeur"), alt: "Détendeur thermostatique avec bulbe", t: "Détendeur", s: "la pression tombe" },
      { img: V("evaporateur"), alt: "Évaporateur à ventilateurs", t: "Évaporateur", s: "le fluide y bout" } ] }],
    act: { type: "order",
      items: ["Le filtre déshydrateur", "Le voyant liquide", "L’électrovanne", "Le détendeur", "L’évaporateur"], shown: [2, 4, 0, 3, 1],
      hints: ["Juste après la bouteille : le filtre arrête l’humidité et les saletés avant tout le reste.", "Après le filtre : le voyant montre le liquide qui va vers le poste.", "Devant le meuble : l’électrovanne ouvre ou ferme l’arrivée du liquide.", "Après l’électrovanne : quand elle est ouverte, le liquide passe par le détendeur.", "Après le détendeur : le liquide bout dans l’évaporateur."],
      example: { text: "Départ : la bouteille de liquide", answer: "la première pièce de la ligne liquide", why: "Le liquide est stocké dans la bouteille, au local technique, avant de repartir vers les postes." } },
    correction: "Filtre déshydrateur, voyant, électrovanne, détendeur, évaporateur." }),

  screen({ id: "sens-electrovanne", dossier: "liquide", title: "L’électrovanne : le sens de passage", kicker: "Ligne liquide · 2", codes: [CP7], level: "appliquer",
    text: "Une électrovanne se monte dans un sens : une flèche gravée sur son corps indique le sens de passage du liquide. Montée à l’envers, elle peut mal fermer ou mal s’ouvrir. On suit la flèche.",
    prompt: "Lisez l’exemple résolu, puis cliquez la bonne réponse pour le cas « À vous ».",
    scene: { imgs: ["electrovanne"], t: "L’électrovanne.", d: "Elle se monte devant le détendeur, sur la ligne liquide du poste." },
    blocks: [
      { k: "exemple", text: "Le clapet du compresseur 2 (cours « Assembler une centrale positive »)", answer: "flèche du compresseur vers le collecteur", why: "Le gaz sort du compresseur et va au collecteur de refoulement : la flèche suit le sens du fluide." },
      { k: "cas", html: "<strong>À vous :</strong> vous montez l’électrovanne du poste 1 sur sa ligne liquide, entre le voyant et le détendeur. Une flèche est gravée sur son corps. Où la tournez-vous ?" }
    ],
    act: { type: "choice", good: 0, cards: [
      { title: "Vers le détendeur", note: "dans le sens du liquide" },
      { title: "Vers la bouteille", note: "à contre-courant" },
      { title: "Peu importe", note: "le sens ne compte pas" } ],
      msgs: ["La flèche suit le sens du liquide : il arrive de la bouteille et va vers le détendeur.", "À contre-courant, l’électrovanne peut mal fermer ou mal s’ouvrir : on suit la flèche.", "Une électrovanne se monte dans un sens : la flèche gravée sur son corps le donne. La notice de la pièce le dit aussi."] },
    correction: "La flèche de l’électrovanne pointe vers le détendeur, dans le sens du liquide." }),

  /* ============ QUI COMMANDE ============ */
  screen({ id: "poste-assez-froid", dossier: "commande", title: "Le poste est assez froid : que se passe-t-il ?", kicker: "Qui commande · 1", codes: [CP7], level: "appliquer",
    text: "Le régulateur du poste ouvre l’électrovanne quand l’air se réchauffe, et la ferme quand il est assez froid. Quand elle se ferme, le liquide n’arrive plus à l’évaporateur.",
    prompt: "L’étape 1 est déjà faite en exemple. Cliquez les trois autres dans l’ordre : d’abord la première, puis la suivante.",
    scene: { imgs: ["sonde","electrovanne"], t: "La commande du poste.", d: "La sonde mesure l’air ; l’électrovanne ouvre ou ferme le liquide." },
    act: { type: "order",
      items: ["Le régulateur coupe le courant de la bobine.", "L’électrovanne se ferme : le liquide n’arrive plus au détendeur.", "L’évaporateur n’est plus alimenté : le poste arrête de refroidir."], shown: [2, 0, 1],
      hints: ["Le régulateur décide en premier : c’est lui qui coupe le courant de la bobine.", "Sans courant, la bobine lâche : l’électrovanne se ferme.", "Sans liquide au détendeur, l’évaporateur n’est plus alimenté."],
      example: { text: "Étape 1 : l’air du poste atteint la consigne", answer: "le régulateur le mesure", why: "La sonde du régulateur lit la température de l’air du meuble ou de la chambre." } },
    correction: "Le régulateur coupe la bobine, l’électrovanne se ferme, l’évaporateur n’est plus alimenté." }),

  screen({ id: "les-autres-postes", dossier: "commande", title: "Et les autres postes ?", kicker: "Qui commande · 2", codes: [CP7], level: "comprendre",
    text: "Chaque poste a son électrovanne et son régulateur : les postes sont indépendants. Tous bouillent à la même basse pression, car ils partagent le collecteur d’aspiration. Chacun règle sa température avec son électrovanne.",
    prompt: "L’électrovanne du poste 1 se ferme. Cliquez ce qui se passe pour les postes 2 et 3.",
    scene: { imgs: ["capteur"], t: "Une seule basse pression.", d: "Elle se mesure sur le collecteur d’aspiration, commun à tous les postes." },
    act: { type: "quiz", choices: ["Ils continuent à refroidir : chaque poste a sa propre électrovanne.", "Ils s’arrêtent aussi : ils partagent la même ligne liquide.", "Ils reçoivent plus de liquide : celui du poste 1.", "La centrale s’arrête."], good: 0,
      explain: "Chaque poste commande sa propre électrovanne. Les compresseurs adaptent leur marche à la basse pression commune : elle baisse un peu quand un poste s’arrête." },
    correction: "Les autres postes continuent : chacun a sa propre électrovanne." }),

  /* ============ LE RETOUR VERS LES COMPRESSEURS ============ */
  screen({ id: "bulbe-du-detendeur", dossier: "retour", title: "Le bulbe du détendeur : où ?", kicker: "Le retour · 1", codes: [CP7], level: "appliquer",
    text: "Le détendeur thermostatique règle l’arrivée du liquide d’après la température de la vapeur qui sort de l’évaporateur. Son bulbe est relié à la tête par un tube fin, le capillaire. Le bulbe se pose sur le tube de sortie.",
    prompt: "Cliquez où se fixe le bulbe.",
    scene: { imgs: ["detendeur","evaporateur"], t: "Le bulbe du détendeur.", d: "Il se fixe sur le tube de sortie de l’évaporateur." },
    blocks: [{ k: "def", html: "<strong>Bulbe :</strong> petit cylindre qui sent la température du tube. <strong>Capillaire :</strong> tube très fin qui le relie à la tête du détendeur." },
      { k: "renvoi", html: "Pour le geste complet (position, fixation, isolation) : <a href=\"../detendeur-interactif/index.html\">Le détendeur</a>." }],
    act: { type: "choice", good: 0, cards: [
      { title: "Sur la conduite d’aspiration, à la sortie de l’évaporateur", note: "là où sort la vapeur" },
      { title: "Sur la ligne liquide, devant le détendeur", note: "là où arrive le liquide" },
      { title: "Sur la bouteille", note: "au local technique" } ],
      msgs: ["Le bulbe sent la température de la vapeur qui sort de l’évaporateur : c’est elle qui dit si tout le liquide est évaporé.", "Sur la ligne liquide, il mesurerait la température du liquide, pas celle de la vapeur à la sortie de l’évaporateur.", "La bouteille est au local technique, loin du poste : le bulbe se pose à la sortie de l’évaporateur."] },
    correction: "Le bulbe se fixe sur la conduite d’aspiration, à la sortie de l’évaporateur." }),

  screen({ id: "isoler-aspiration", dossier: "retour", title: "La conduite d’aspiration : pourquoi l’isoler ?", kicker: "Le retour · 2", codes: [CP7], level: "comprendre",
    text: "La vapeur quitte l’évaporateur par la conduite d’aspiration, un gros tube qui traverse le magasin jusqu’au local technique. Cette vapeur est froide : sans isolant, le tube prendrait la chaleur du local et se couvrirait de gouttes d’eau. On l’isole donc. Elle rejoint le collecteur d’aspiration, où arrivent aussi les vapeurs des autres postes.",
    prompt: "Lisez, puis cliquez pourquoi on isole la conduite d’aspiration.",
    scene: { imgs: ["evaporateur"], t: "Le poste.", d: "La vapeur quitte l’évaporateur par la conduite d’aspiration." },
    blocks: [{ k: "renvoi", html: "Pentes et siphons pour que l’huile revienne : <a href=\"../retour-huile-naturel/index.html\">Le retour d’huile naturel</a>." }],
    act: { type: "quiz", choices: ["Elle est froide : sans isolant, elle prendrait la chaleur du local et se couvrirait de gouttes d’eau.", "Pour la protéger des chocs.", "Pour la rendre plus brillante.", "Parce qu’elle est brûlante."], good: 0,
      explain: "La conduite d’aspiration est froide. L’isolant évite qu’elle se réchauffe en route et qu’elle goutte sur les produits et sur le sol." },
    correction: "Elle est froide : l’isolant évite la perte de froid et l’eau de condensation." }),

  /* ============ CONTRÔLER ============ */
  screen({ id: "points-avant-ouvrir", dossier: "controler", title: "Ce qui se contrôle avant d’ouvrir", kicker: "Contrôler · 1", codes: [CP7], level: "appliquer",
    text: "Un poste raccordé se contrôle point par point avant d’ouvrir son électrovanne. Chaque contrôle évite une panne que l’on ne verrait que plus tard, quand le poste tourne.",
    prompt: "Ouvrez chaque carte, une par une, pour lire le contrôle à faire.",
    scene: { imgs: ["electrovanne","detendeur"], t: "Les pièces du poste.", d: "Sens de l’électrovanne, bobine, bulbe du détendeur." },
    act: { type: "check", items: [
      { title: "Le sens de l’électrovanne", note: "la flèche", detail: "La flèche gravée sur le corps pointe vers le détendeur, dans le sens du liquide." },
      { title: "La bobine", note: "tension et raccordement", detail: "La tension marquée sur la bobine est celle du circuit de commande, et la bobine est raccordée au régulateur du poste." },
      { title: "Le bulbe", note: "position et contact", detail: "Il est fixé sur la conduite d’aspiration, à la sortie de l’évaporateur, bien plaqué sur le tube et protégé par un isolant." },
      { title: "L’isolation de l’aspiration", note: "tube froid", detail: "La conduite d’aspiration est isolée sur tout son parcours, sans trou : sinon elle goutte." },
      { title: "Les supports", note: "aucun tube ne tire", detail: "Chaque tube est fixé sur un support : il ne tire pas sur l’évaporateur, le détendeur ou l’électrovanne." },
      { title: "Les repères du poste", note: "numéro, sens", detail: "Le numéro du poste est repéré sur la ligne liquide, l’aspiration et le régulateur, comme sur le schéma." } ] },
    correction: "Six contrôles : sens, bobine, bulbe, isolation, supports, repères." }),

  screen({ id: "poste-surgeles", dossier: "controler", title: "Un meuble de surgelés sur cette centrale ?", kicker: "Contrôler · 2", codes: [CP7], level: "evaluer",
    text: "Tous les postes d’une centrale bouillent à la même basse pression. Un poste de froid négatif demande une température d’évaporation plus basse : il ne peut pas se brancher sur une centrale positive.",
    prompt: "On vous demande de raccorder un meuble de surgelés à cette centrale positive. Cliquez votre réponse.",
    scene: { imgs: ["capteur"], t: "Une seule basse pression.", d: "Tous les postes d’une centrale bouillent à la même pression." },
    act: { type: "quiz", choices: ["Non : tous les postes bouillent à la même basse pression ; les surgelés ont leur propre centrale.", "Oui : il suffit de régler son détendeur.", "Oui : on ajoute une électrovanne.", "Oui : le collecteur d’aspiration s’adapte."], good: 0,
      explain: "La basse pression est commune à tous les postes. Les surgelés ont leur propre centrale (froid négatif)." },
    correction: "Non : les surgelés ont leur propre centrale." }),

  /* ============ BILAN ============ */
  screen({ id: "cas-seul", dossier: "bilan", title: "Un cas complet, seul", kicker: "Bilan · 1 · à vous, sans guide", codes: [CP7], level: "evaluer",
    text: "Cas complet, à faire seul : un magasin fait poser une chambre froide de réserve, positive, à raccorder à sa centrale. Le détendeur est monté sur l’évaporateur.",
    prompt: "Seul : écrivez les pièces dans l’ordre sur la ligne liquide, où va l’aspiration, et ce que vous contrôlez. Puis comparez avec la réponse type.",
    scene: { imgs: ["evaporateur"], t: "La chambre froide.", d: "Son évaporateur est posé au plafond." },
    blocks: [{ k: "cas-boite", html: "<strong>Le cas.</strong> Une chambre froide de réserve, au fond du magasin, positive. L’évaporateur est posé au plafond de la chambre. La ligne liquide et la conduite d’aspiration passent par le faux plafond." }],
    act: { type: "libre", label: "Votre plan, en quelques lignes :", placeholder: "Pièces sur la ligne liquide, aspiration, contrôles…",
      answer: "<strong>Réponse type.</strong><ol><li><b>Ligne liquide :</b> filtre déshydrateur, voyant, électrovanne, détendeur, évaporateur. La flèche de l’électrovanne pointe vers le détendeur.</li><li><b>Bulbe :</b> sur la conduite d’aspiration, à la sortie de l’évaporateur, bien plaqué et isolé.</li><li><b>Aspiration :</b> un gros tube isolé jusqu’au collecteur d’aspiration de la centrale.</li><li><b>Commande :</b> le régulateur de la chambre commande la bobine de l’électrovanne.</li><li><b>Contrôles avant d’ouvrir :</b> sens de l’électrovanne, bobine, bulbe, isolation, supports, repères.</li><li><b>Ce que je ne fais pas :</b> brancher un poste de froid négatif sur cette centrale, ouvrir l’électrovanne avant les contrôles.</li></ol>" },
    correction: "Voir la réponse type : ligne liquide, bulbe, aspiration, commande, contrôles." }),

  screen({ id: "bilan", dossier: "bilan", title: "À retenir, puis pratiquer", kicker: "Bilan · 2", codes: [CP7], level: "evaluer",
    text: "Un poste a son électrovanne, son détendeur, son évaporateur et son régulateur. Sur la ligne liquide : filtre, voyant, électrovanne, détendeur, évaporateur. Le bulbe se pose à la sortie de l’évaporateur. Tous les postes partagent une seule basse pression.",
    prompt: "Pour continuer : ouvrez une des suites.",
    blocks: [{ k: "liens", links: [
      { href: "../centrale-positive-interactif/index.html", title: "Assembler une centrale positive", note: "Avant ce cours : la centrale elle-même" },
      { href: "../maintenance-centrale-interactif/index.html", title: "Maintenance systématique d’une centrale", note: "La suite : relevés, contrôles, fiche (CP8)" },
      { href: "../../../../voyage/module-centrale.html", title: "Voyage dans tous ses états : les centrales", note: "Le même circuit raconté par une molécule, avec le diagramme enthalpique" },
      { href: "../electrovanne-interactive/index.html", title: "L’électrovanne", note: "Le cours sur la pièce elle-même" },
      { href: "../detendeur-interactif/index.html", title: "Le détendeur", note: "Le cours sur la pièce elle-même : bulbe, surchauffe, réglage" } ] }] })
];

/* ---- Le cours : accueil, navigation, voix, impression (repris du modèle, sans changement de comportement) ---- */
const dossiers = STATION.dossiers;
function renderHome(){const n=screens.length,exo=screens.filter(s=>s.requiresAction).length;const c=$("#home-count");if(c)c.textContent=`${n} écrans · ${dossiers.length} dossiers · ${exo} exercices`;$("#dossier-grid").innerHTML=dossiers.map((dossier,index)=>`<button class="dossier-button" type="button" data-dossier="${dossier.id}"><b>${index+1}</b><span>${esc(dossier.label)}<small>${esc(dossier.note)}</small></span></button>`).join("");$$('[data-dossier]').forEach(button=>button.addEventListener("click",()=>startCourse(button.dataset.dossier)))}
function showHome(){stopSpeech();document.body.classList.remove("course-running");$("#home").hidden=false;$("#course-shell").hidden=true;$("#home-button").hidden=true;$("#exit-button").hidden=true;$("#mode-badge").textContent="En cours de relecture";history.replaceState(null,"",location.pathname);scrollTo(0,0)}
function startCourse(dossierId=dossiers[0].id,screenNumber=1){extractMode=false;activeScreens=[...screens];const first=Math.max(0,activeScreens.findIndex(item=>item.dossier===dossierId));current=Math.min(activeScreens.length-1,first+Math.max(0,screenNumber-1));furthest=Math.max(furthest,current);openCourse();renderCurrent(false)}
function startExtract(ids){const picked=ids.map(id=>screens.find(item=>item.id===id)).filter(Boolean);if(!picked.length){showHome();setStatus("Extrait introuvable.");return}extractMode=true;activeScreens=picked;current=0;furthest=0;openCourse();renderCurrent(false)}
function openCourse(){document.body.classList.add("course-running");$("#home").hidden=true;$("#course-shell").hidden=false;$("#home-button").hidden=false;$("#exit-button").hidden=false;$("#mode-badge").textContent=extractMode?"Extrait · en cours de relecture":"En cours de relecture";$("#rail-mode").textContent=extractMode?"EXTRAIT":"COURS";scrollTo(0,0)}
function renderStepper(item){const groups=extractMode?[{id:"extrait",label:"Extrait"}]:dossiers;$("#stepper").innerHTML=groups.map((group,index)=>{const indices=activeScreens.map((screenItem,screenIndex)=>({screenItem,screenIndex})).filter(entry=>extractMode||entry.screenItem.dossier===group.id).map(entry=>entry.screenIndex);const first=indices[0]??0;const active=extractMode||item.dossier===group.id;const done=indices.length&&Math.max(...indices)<furthest;return `<button class="step-button ${active?"active":""} ${done?"done":""}" type="button" data-step="${first}" ${active?'aria-current="step"':""}><b>${index+1}</b><span>${esc(group.label)}</span></button>`}).join("");$$('[data-step]').forEach(button=>button.addEventListener("click",()=>goTo(Number(button.dataset.step))));const total=activeScreens.length;$("#rail-progress").textContent=`${current+1} / ${total}`;$("#progress-bar").style.width=`${(current+1)/total*100}%`;$("#progress-copy").textContent=current===total-1?"Fin du parcours":`${total-current-1} écran${total-current-1>1?"s":""} à voir`}
function renderCurrent(moveFocus=true){stopSpeech(false);clearTimeout(statusTimer);$("#status-message").textContent="";const item=activeScreens[current];if(!item)return;$("#lesson-kicker").textContent=item.kicker;$("#lesson-title").textContent=item.title;$("#lesson-text").textContent=item.text;$("#action-prompt").textContent=item.prompt||"Lisez, puis continuez.";$("#activity-zone").innerHTML=activityMarkup(item);actWire(item);$("#reference-box").innerHTML="";renderStepper(item);updateNav();updateUrl();replierTexte();window.SCENE_STATION&&SCENE_STATION.montrer(item);if(moveFocus)$("#lesson-title").focus({preventScroll:true});if(autoplay)setTimeout(()=>speakCurrent(),320)}
/* Un écran = un dessin + 3 lignes (04/10/2026) : le texte reste entier, replié à 3 lignes ; la voix le dit en entier. */
function replierTexte(){const copie=$(".lesson-copy"),bouton=$("#texte-entier"),texte=$("#lesson-text");$(".lesson-content").scrollTop=0;copie.classList.remove("texte-ouvert");bouton.setAttribute("aria-expanded","false");bouton.textContent="Lire tout le texte";bouton.hidden=texte.scrollHeight<=texte.clientHeight+2}
function basculerTexte(){const copie=$(".lesson-copy"),ouvert=copie.classList.toggle("texte-ouvert"),bouton=$("#texte-entier");bouton.setAttribute("aria-expanded",String(ouvert));bouton.textContent=ouvert?"Replier le texte":"Lire tout le texte"}
function updateNav(){const item=activeScreens[current];$("#prev-button").disabled=current===0;const blocked=item?.requiresAction&&!completed.has(item.id);$("#next-button").disabled=blocked;$("#next-button").textContent=current===activeScreens.length-1?"Terminer":"Suivant →"}
function goTo(index){if(index<0||index>=activeScreens.length)return;current=index;furthest=Math.max(furthest,current);renderCurrent()}
function goToId(id){const index=activeScreens.findIndex(item=>item.id===id);if(index>=0)goTo(index)}
function previous(){if(current>0)goTo(current-1)}
function next(){const item=activeScreens[current];if(item.requiresAction&&!completed.has(item.id)){setStatus("Réalisez l’activité avant de continuer.");return}if(current<activeScreens.length-1)goTo(current+1);else showHome()}
function updateUrl(){const item=activeScreens[current];const url=new URL(location.href);url.search="";if(extractMode)url.searchParams.set("extrait",activeScreens.map(screenItem=>screenItem.id).join(","));else{url.searchParams.set("dossier",item.dossier);const dossierScreens=activeScreens.filter(screenItem=>screenItem.dossier===item.dossier);url.searchParams.set("ecran",String(dossierScreens.indexOf(item)+1))}history.replaceState(null,"",url)}
function screenLink(){const url=new URL(location.href);url.search="";url.searchParams.set("extrait",activeScreens[current].id);return url.href}
async function copyCurrentLink(){const link=screenLink();try{await navigator.clipboard.writeText(link)}catch(_){const area=document.createElement("textarea");area.value=link;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";document.body.append(area);area.select();document.execCommand("copy");area.remove()}setStatus("Lien de cet écran copié.")}
function speechSupported(){return"speechSynthesis"in window&&"SpeechSynthesisUtterance"in window}
function chooseFrenchVoice(){const voices=speechSynthesis.getVoices();const quality=voice=>/natural|naturel|neural|online|google|microsoft|denise|henri|julie|paul|hortense/i.test(voice.name);return voices.find(voice=>voice.lang.toLowerCase()==="fr-fr"&&quality(voice))||voices.find(voice=>voice.lang.toLowerCase()==="fr-fr")||voices.find(voice=>voice.lang.toLowerCase().startsWith("fr")&&quality(voice))||voices.find(voice=>voice.lang.toLowerCase().startsWith("fr"))||voices[0]}
function stopSpeech(disableAutoplay=true){speechRun+=1;if(speechSupported())speechSynthesis.cancel();speaking=false;paused=false;if(disableAutoplay)autoplay=false;updateVoiceButtons()}
document.addEventListener("pilotevoix:vitesse", () => stopSpeech());   /* 17/10/2026 (chantier prof vocal) : changer la vitesse commune arrête la lecture et rend « Écouter » */
function speakCurrent(){if(!speechSupported()){setStatus("La synthèse vocale n’est pas disponible. Le texte affiché reste complet.");return}stopSpeech(false);const item=activeScreens[current];const run=++speechRun;const visible=`${item.title}. ${item.text} ${item.prompt}`;const utterance=new SpeechSynthesisUtterance(item.speak||stripHtml(visible));utterance.lang="fr-FR";utterance.pitch=1;utterance.rate=voiceRates[rateIndex];const voice=chooseFrenchVoice();if(voice)utterance.voice=voice;utterance.onstart=()=>{if(run!==speechRun)return;speaking=true;paused=false;updateVoiceButtons()};utterance.onend=()=>{if(run!==speechRun)return;speaking=false;paused=false;updateVoiceButtons()};utterance.onerror=event=>{if(run!==speechRun||["canceled","interrupted"].includes(event.error))return;speaking=false;paused=false;updateVoiceButtons();setStatus("La voix est indisponible ; poursuivez avec le texte affiché.")};speaking=true;paused=false;updateVoiceButtons();speechSynthesis.speak(utterance)}
function toggleSpeech(){if(!speechSupported()){setStatus("La synthèse vocale n’est pas disponible.");return}autoplay=true;if(speaking&&!paused){speechSynthesis.pause();paused=true;updateVoiceButtons();return}if(speaking&&paused){speechSynthesis.resume();paused=false;updateVoiceButtons();return}speakCurrent()}
function updateVoiceButtons(){const button=$("#listen");if(!button)return;button.innerHTML=speaking&&!paused?'<span aria-hidden="true">Ⅱ</span><span>Pause</span>':speaking&&paused?'<span aria-hidden="true">▶</span><span>Reprendre</span>':'<span aria-hidden="true">▶</span><span>Écouter</span>';$("#stop-voice").disabled=!speaking;$("#speed-value").textContent=voiceRates[rateIndex].toFixed(2).replace(".",",")+"×"}
function changeRate(direction){rateIndex=Math.max(0,Math.min(voiceRates.length-1,rateIndex+direction));saveRate();updateVoiceButtons();if(speaking||paused)speakCurrent()}
function printCorrection(item){const a=item.act;if(!a)return "";if(a.type==="quiz")return `<div class="print-answer"><strong>Correction :</strong> ${esc(a.choices[a.good])}. ${esc(a.explain)}</div>`;return item.correction?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.correction)}</div>`:""}
function buildPrintBook(){const quizCount=screens.filter(item=>item.act&&item.act.type==="quiz").length;$("#print-book").innerHTML=`<header class="print-title"><h1>${esc(STATION.titre)}</h1><p>${screens.length} écrans · ${dossiers.length} dossiers · ${quizCount} questions de contrôle. Statut : en cours de relecture.</p><p class="print-codes">Sert notamment pour : ${esc(STATION.printCodes)}</p>${STATION.printLoi?`<p class="print-law"><strong>Point réglementaire :</strong> ${esc(STATION.printLoi)}</p>`:""}</header>`+screens.map((item,index)=>`<article class="print-screen"><h2>${index+1}. ${esc(item.title)}</h2><p>${esc(item.text)}</p>${item.prompt?`<h3>Action à réaliser</h3><p>${esc(item.prompt)}</p>`:""}${printCorrection(item)}</article>`).join("")}
function handleInitialUrl(){const params=new URLSearchParams(location.search);const extract=params.get("extrait");if(extract){startExtract(extract.split(",").map(value=>value.trim()).filter(Boolean));return}const dossier=params.get("dossier");if(dossier){startCourse(dossier,Number(params.get("ecran"))||1);return}showHome()}
function bindGlobalEvents(){$("#start-button").addEventListener("click",()=>startCourse());$("#home-button").addEventListener("click",showHome);$("#exit-button").addEventListener("click",showHome);$("#prev-button").addEventListener("click",previous);$("#next-button").addEventListener("click",next);$("#copy-link").addEventListener("click",copyCurrentLink);$("#listen").addEventListener("click",toggleSpeech);$("#stop-voice").addEventListener("click",()=>stopSpeech());$("#slower").addEventListener("click",()=>changeRate(-1));$("#faster").addEventListener("click",()=>changeRate(1));$("#texte-entier").addEventListener("click",basculerTexte);addEventListener("keydown",event=>{const tag=document.activeElement?.tagName;if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(tag))return;if(event.key==="ArrowRight"){event.preventDefault();next()}else if(event.key==="ArrowLeft"){event.preventDefault();previous()}else if(event.key===" "){event.preventDefault();toggleSpeech()}else if(event.key==="Escape")showHome()});addEventListener("beforeunload",()=>stopSpeech());document.addEventListener("visibilitychange",()=>{if(document.hidden)stopSpeech()});if(speechSupported())speechSynthesis.addEventListener?.("voiceschanged",()=>{})}

renderHome();
buildPrintBook();
bindGlobalEvents();
updateVoiceButtons();
handleInitialUrl();
