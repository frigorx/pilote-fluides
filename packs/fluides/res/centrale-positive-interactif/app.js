"use strict";

const PH = {"compresseurs":{"src":"images/compresseurs.webp","t":"Compresseurs","alt":"Quatre compresseurs : à pistons, scroll, à vis, hermétique."},"clapet":{"src":"images/clapet-vannes-service.webp","t":"Clapet et vannes","alt":"Un clapet anti-retour à gauche, deux vannes d’isolement à droite."},"separateur":{"src":"images/separateur-huile.webp","t":"Séparateur d’huile","alt":"Séparateur d’huile bleu, avec ses raccords cuivre."},"condenseur":{"src":"images/condenseur-air.webp","t":"Condenseur à air","alt":"Condenseur à air à deux ventilateurs."},"bouteille":{"src":"images/reservoir-liquide.webp","t":"Bouteille de liquide","alt":"Bouteille de liquide sur pieds."},"evaporateur":{"src":"images/evaporateur-air.webp","t":"Évaporateur","alt":"Évaporateur à deux ventilateurs, suspendu."},"detendeur":{"src":"images/detendeur-thermostatique.webp","t":"Détendeur","alt":"Détendeur thermostatique, avec son bulbe et son capillaire."},"electrovanne":{"src":"images/electrovanne.webp","t":"Électrovanne","alt":"Électrovanne : bobine bleue sur un corps en laiton."},"filtre":{"src":"images/filtre-deshydrateur.webp","t":"Filtre déshydrateur","alt":"Filtre déshydrateur noir à raccords cuivre."},"voyant":{"src":"images/voyant-liquide.webp","t":"Voyant liquide","alt":"Voyant liquide en laiton, avec son hublot."},"pressostats":{"src":"images/pressostats.webp","t":"Pressostats","alt":"Deux pressostats : un gris, un bleu."},"capteur":{"src":"images/capteur-pression.webp","t":"Capteur de pression","alt":"Capteur de pression avec sa prise électrique."},"sonde":{"src":"images/sonde-temperature.webp","t":"Sonde de température","alt":"Sonde de température et son câble."},"compresseur":{"src":"images/compresseur.webp","t":"Compresseur","alt":"Compresseur à pistons semi-hermétique : le moteur est dans le carter."},"pressostatBP":{"src":"images/pressostat-bp.webp","t":"Pressostat BP","alt":"Pressostat basse pression : le boîtier bleu."},"pressostatHP":{"src":"images/pressostat-hp.webp","t":"Pressostat HP","alt":"Pressostat haute pression : le boîtier gris."},"contacteur":{"src":"images/contacteur.webp","t":"Contacteur","alt":"Contacteur tripolaire : ses bornes de puissance en haut et en bas."}};

const ORG = "../../../../jouerezo/voyage/organes/";
const STATION = {
  slug: "centrale-positive-interactif", cle: "centrale-positive", port: 8799, carte: true, supportPc: true,
  titre: "Assembler une centrale positive : compresseurs en parallèle, collecteurs, bouteille",
  titreCourt: "Assembler une centrale positive — compresseurs en parallèle, collecteurs, bouteille",
  titleTag: "Assembler une centrale positive — compresseurs, collecteurs, bouteille",
  description: "Cours interactif : lire une centrale frigorifique positive de supermarché, comprendre les compresseurs en parallèle, les collecteurs d’aspiration et de refoulement, le séparateur d’huile, le condenseur et la bouteille, puis monter dans l’ordre.",
  brandSmall: "Centrale positive",
  eyebrow: "FLUIDES · LA CENTRALE POSITIVE",
  h1: ["Assembler une", "centrale positive"],
  intro: "Une centrale refroidit tout un magasin avec une seule machine. Vous apprenez à la lire (aspiration, refoulement, ligne liquide), à connaître ce qui appartient à chaque compresseur et ce qui est commun, puis à monter dans l’ordre et à contrôler avant de refermer.",
  homeVisual: { carte: true, legende: "Compresseurs en parallèle · collecteurs · séparateur · condenseur · bouteille.", images: [
    { src: ORG + "compresseur.webp", alt: "Compresseur à pistons semi-hermétique : trois d’entre eux travaillent côte à côte sur une centrale." },
    { src: ORG + "condenseur.webp", alt: "Condenseur à air à deux ventilateurs, posé sur le toit ou dehors." },
    { src: ORG + "bouteille.webp", alt: "Bouteille de liquide : le réservoir de la centrale." } ] },
  homeNote: "<strong>Cours sur la centrale positive.</strong> La centrale décrite est un modèle courant (trois compresseurs à pistons, plusieurs postes). Sur le chantier, le dossier technique et la notice du constructeur de la centrale font foi. Aucune pression ni température chiffrée : elles viennent du dossier.",
  codesBox: [
    ["TP Monteur dépanneur frigoriste (RNCP37876) — compétence professionnelle CP7", "« Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée »."],
    ["À voir ensuite sur la même ligne", "Raccorder les postes d’un magasin (CP7), puis la maintenance systématique de la centrale (CP8)."]
  ],
  printCodes: "TP Monteur dépanneur frigoriste (RNCP37876), compétence professionnelle CP7 « Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée ».",
  printLoi: "",
  reference: "TP Monteur dépanneur frigoriste (RNCP37876) : CP7",
  codeCle: { "TP CP7": "tp_mdf" },
  dossiers: [
    { id: "lire", label: "Lire la centrale", note: "six blocs, deux pressions" },
    { id: "compresseurs", label: "Les compresseurs", note: "en parallèle, chacun isolable" },
    { id: "collecteurs", label: "Les collecteurs", note: "aspiration, refoulement" },
    { id: "toit", label: "Du refoulement à la bouteille", note: "huile, condenseur, liquide" },
    { id: "monter", label: "Monter dans l’ordre", note: "l’ordre, les contrôles" },
    { id: "bilan", label: "Bilan", note: "un cas, puis l’essentiel" }
  ],
  sceneDefaut: { t: "La centrale.", d: "Trois postes à gauche, trois compresseurs entre deux collecteurs, séparateur, condenseur et bouteille en haut." },
  src: {
    reg: [
      "**Règlement (UE) 2024/573**, article 4, paragraphe 1 (« Le rejet intentionnel de gaz à effet de serre fluorés dans l’atmosphère est interdit lorsque ce rejet n’est pas techniquement nécessaire pour l’usage prévu »), lu le 19/10/2026 sur le texte du Journal officiel du 20/02/2024 (publications.europa.eu) : fondement de « on essaie à l’azote, jamais avec le fluide » (écran « Épreuve, fuite, vide »)."
    ],
    ref: [
      "**TP Monteur dépanneur frigoriste (RNCP37876), CP7** : « Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée » (libellé de `rattachement/entrees/referentiels-pilotes.json`, dossier RESEAU-PAR-DIPLOME-2026-10-18 ; la fiche de mission donnait la forme abrégée). Le TP MDF n’est pas dans `HAL-v3/donnees/referentiels/peda/` : à confirmer."
    ],
    fonds: [
      "`03_BAC-MFER/Froid-Frigorifique/TP Centrale de supermarché.docx` : trois compresseurs semi-hermétiques, réservoir de liquide, organes (compresseur, séparateur d’huile, condenseur, réservoir, filtre déshydrateur, voyant, électrovanne, détendeur, évaporateur, pressostats BP régulation, HP sécurité et HP régulation), « intérêt d’installer trois compresseurs ».",
      "**Le « Voyage dans tous ses états — les centrales frigorifiques »** (`jouerezo/donnees/voyage-centrale.js`, `voyage/centrale.html`) : le circuit (trois postes en parallèle, collecteurs d’aspiration et de refoulement, clapet anti-retour sur chaque refoulement, vannes d’isolement de chaque compresseur, séparateur d’huile commun, condenseur sur le toit, bouteille, ligne liquide, filtre et voyant), la régulation par la basse pression, les pressostats de sécurité de chaque compresseur. Le Voyage dit lui-même : « fonds maigre sur la centrale elle-même ; le reste suit la pratique courante » — à relire par Franck.",
      "`jouerezo/voyage/organes/*.webp` : images de synthèse des organes, déjà en ligne sur le site (voir SOURCES-IMAGES.md).",
      "Renvois vers l’existant, sans le refaire : le circuit d’huile (`elements-circuit-huile`, `separateur-huile-pedagogique`), la bouteille, le filtre, le voyant, le compresseur, la capsule g10 (brasage sous azote), la station azote du Tour de main, L’étanchéité, la chaîne de l’intervention."
    ],
    sans: [
      "**L’ordre de montage** (châssis, gros éléments, collecteurs, tuyauteries, épreuve et fuites, vide) : ordre logique de la pratique, présenté comme tel dans le cours ; le fonds n’en contient pas de version écrite. La notice du constructeur et le dossier technique priment. **À relire par Franck.**",
      "Les six contrôles avant de refermer (sens des clapets, vannes, châssis, supports, repères, électricité) : pratique courante, sans valeur chiffrée.",
      "Aucune pression, température, pente, diamètre ou couple n’est donné : ils viennent du dossier technique et de la notice."
    ]
  },
  images: [
    ["`jouerezo/moteur/voyage-dessin.js` et `voyage-centrale-dessin.js` (carte de la centrale, surlignages)", "Dessin du « Voyage dans tous ses états » (inerWeb Studio), repris sans retouche ; les organes sont les symboles posés par le Voyage", "Droits réservés inerWeb"],
    ["`jouerezo/voyage/symboles/*.svg` (compresseur, échangeur, bouteille, séparateur d’huile, détendeur, électrovanne, filtre, voyant)", "Planche Éduscol « Le circuit frigorifique » et collection de symboles QElectroTech (convertie dans la bibliothèque de F. Henninot), chargés depuis le Voyage, non copiés", "CC BY 3.0 — <https://github.com/qelectrotech/qelectrotech-elements>"],
    ["`jouerezo/voyage/organes/compresseur.webp`, `condenseur.webp`, `bouteille.webp`, `evaporateur.webp` (accueil, écran 1)", "Images de synthèse des organes, déjà en ligne sur inerweb.fr (`tome-3-technologie-organes/images-organes/`, juillet 2026), reprises par le Voyage le 03/10/2026", "Droits réservés inerWeb (voir `jouerezo/voyage/organes/SOURCES.md`)"]
  ],
  lireMoi: {
    ligne: "Cours interactif du plan thermo-techno, ligne « Les centrales », après « L’éjecteur ».",
    fait: "  Il apprend à lire une centrale positive de supermarché (aspiration et refoulement, six blocs), à distinguer ce qui appartient à\n  chaque compresseur (vannes, clapet, pressostats) de ce qui est commun (collecteurs, séparateur, condenseur, bouteille), à suivre le\n  gaz, puis à monter dans l’ordre et à contrôler avant la charge. Il renvoie au Voyage (film et module) et aux cours des organes\n  plutôt que de les refaire ; il se prolonge par « Raccorder les postes d’un magasin ».",
    codes: "  TP Monteur dépanneur frigoriste (RNCP37876) : CP7 « Réaliser l’assemblage d’une installation de froid commercial complexe et centralisée ».",
    regl: "  Règlement (UE) 2024/573, article 4 § 1 : un seul renvoi (on n’essaie pas avec le fluide). Aucun autre chiffre réglementaire."
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

/* Le trajet du fluide : un exemple résolu (deux premières étapes), puis six étapes à ordonner */
const TRAJET = {
  items: ["Le collecteur d’aspiration", "Le compresseur, puis son clapet anti-retour", "Le collecteur de refoulement", "Le séparateur d’huile", "Le condenseur", "La bouteille"],
  shown: [3, 0, 5, 2, 4, 1],
  hints: ["Après la conduite d’aspiration, toutes les vapeurs se rejoignent : le collecteur d’aspiration.", "La vapeur est ensuite aspirée par un compresseur, qui la comprime ; son clapet laisse sortir le gaz.", "Les refoulements de tous les compresseurs se rejoignent dans le collecteur de refoulement.", "Le gaz chaud emporte de l’huile : le séparateur d’huile la récupère avant le condenseur.", "Le gaz, débarrassé de son huile, va au condenseur, qui rejette la chaleur dehors.", "Le liquide qui sort du condenseur descend dans la bouteille."]
};

const ORDRE_MONTAGE = {
  items: [
    "Poser le châssis de niveau, sur ses plots antivibratoires.",
    "Fixer sur le châssis les compresseurs, le séparateur d’huile et la bouteille.",
    "Poser les collecteurs et les relier aux compresseurs, avec leurs vannes et leurs clapets.",
    "Braser les tuyauteries sous balayage d’azote, puis les fixer sur leurs supports.",
    "Faire l’épreuve sous azote et chercher les fuites.",
    "Tirer au vide."
  ],
  shown: [3, 0, 5, 2, 4, 1],
  hints: [
    "On commence par le châssis : on ne règle pas le niveau d’une machine déjà chargée de tuyaux.",
    "Les gros éléments se fixent avant les collecteurs : les collecteurs se placent par rapport à eux.",
    "Les collecteurs se posent une fois les compresseurs en place : leurs piquages doivent tomber juste.",
    "Les tuyauteries se brasent quand tout est en place ; chaque tube est ensuite fixé pour ne pas tirer sur les compresseurs.",
    "L’épreuve vient quand tous les joints sont faits : on cherche les fuites avant de mettre le circuit au vide.",
    "Le tirage au vide vient en dernier, une fois le circuit reconnu étanche, juste avant la charge."
  ],
  example: { text: "Étape 1 : lire le dossier technique et contrôler le matériel livré", answer: "avant de toucher quoi que ce soit", why: "On ne monte rien sans plan : on compare le matériel livré au schéma frigorifique et à la liste de pièces." }
};

const screens = [
  /* ============ LIRE LA CENTRALE ============ */
  screen({ id: "centrale-en-blocs", dossier: "lire", title: "Une centrale, six blocs", kicker: "Lire · 1", codes: [CP7], level: "comprendre",
    text: "Une centrale positive refroidit plusieurs meubles et chambres avec une seule machine, installée au local technique. « Positive » veut dire : des produits frais, gardés au-dessus de zéro. La machine se lit en six blocs.",
    prompt: "Regardez la carte à gauche et les six cartes ci-dessous. Les écrans suivants les reprennent un par un.",
    blocks: [
      { k: "cartes", cls: "trois", cards: [
        { img: V("evaporateur"), alt: "Évaporateur à deux ventilateurs", title: "1. Les postes", rows: [["Rôle :", "refroidir les produits : un évaporateur par meuble ou chambre."]] },
        { title: "2. Le collecteur d’aspiration", rows: [["Rôle :", "rassembler les vapeurs de tous les postes, avant les compresseurs."]] },
        { img: V("compresseur"), alt: "Compresseur à pistons", title: "3. Les compresseurs", rows: [["Rôle :", "aspirer la vapeur et la comprimer, plusieurs en parallèle."]] },
        { title: "4. Le refoulement", rows: [["Rôle :", "collecteur de refoulement, puis séparateur d’huile."]] },
        { img: V("condenseur"), alt: "Condenseur à air", title: "5. Le condenseur", rows: [["Rôle :", "rejeter dehors la chaleur du magasin."]] },
        { img: V("bouteille"), alt: "Bouteille de liquide", title: "6. La bouteille", rows: [["Rôle :", "garder la réserve de liquide, avant la ligne liquide."]] } ] },
      { k: "def", html: "<strong>En parallèle :</strong> côte à côte, chaque compresseur relié aux deux mêmes gros tubes. <strong>Collecteur :</strong> gros tube sur lequel plusieurs tuyaux se branchent." },
      { k: "renvoi", html: "Pour suivre une molécule dans cette centrale, avec son film : <a href=\"../../../../voyage/module-centrale.html\">Voyage dans tous ses états, les centrales frigorifiques</a>." }
    ] }),

  screen({ id: "deux-pressions", dossier: "lire", title: "Basse pression, haute pression : où ?", kicker: "Lire · 2", codes: [CP7], level: "comprendre",
    text: "Avant le compresseur, le fluide est à basse pression : c’est le côté aspiration. Après le compresseur, il est à haute pression, jusqu’au détendeur. Le détendeur sépare les deux.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : cliquez « Basse pression » ou « Haute pression ».",
    scene: { imgs: ["compresseurs","condenseur"], t: "Avant, après le compresseur.", d: "Côté aspiration (avant les compresseurs) : basse pression. Côté refoulement (après) : haute pression jusqu’au détendeur." },
    act: { type: "sort", labels: ["Basse pression", "Haute pression"],
      example: { text: "Le collecteur d’aspiration", good: 0, why: "Il reçoit les vapeurs des meubles, avant le compresseur : c’est le côté basse pression." },
      rows: [
        { text: "Le collecteur de refoulement", good: 1, why: "Il reçoit le gaz comprimé à la sortie des compresseurs.", bad: "Il est après les compresseurs : le gaz y est comprimé, donc à haute pression." },
        { text: "L’évaporateur d’un meuble", good: 0, why: "Il est après le détendeur : le fluide y bout à basse pression.", bad: "L’évaporateur est après le détendeur, donc à basse pression." },
        { text: "Le condenseur", good: 1, why: "Le gaz comprimé s’y condense, à haute pression.", bad: "Le condenseur est entre le compresseur et le détendeur : haute pression." },
        { text: "La bouteille de liquide", good: 1, why: "Elle reçoit le liquide du condenseur : même pression que lui, donc haute.", bad: "Elle est entre le condenseur et le détendeur : haute pression." },
        { text: "Le séparateur d’huile", good: 1, why: "Il est sur le refoulement, avant le condenseur.", bad: "Il est sur le refoulement, donc à haute pression." },
        { text: "La conduite d’aspiration, du meuble au collecteur", good: 0, why: "Elle ramène la vapeur des meubles vers les compresseurs.", bad: "Elle ramène la vapeur vers les compresseurs : basse pression." }
      ] },
    correction: "Basse pression : collecteur d’aspiration, évaporateur, conduite d’aspiration. Haute pression : collecteur de refoulement, séparateur d’huile, condenseur, bouteille." }),

  /* ============ LES COMPRESSEURS ============ */
  screen({ id: "pourquoi-plusieurs", dossier: "compresseurs", title: "Pourquoi plusieurs compresseurs ?", kicker: "Compresseurs · 1", codes: [CP7], level: "comprendre",
    text: "Le froid demandé change toute la journée : les clients se servent, on remplit les rayons, on baisse les rideaux le soir. Avec trois compresseurs, on fait tourner seulement ceux qu’il faut. Et si l’un tombe en panne, les autres continuent.",
    prompt: "Un des trois compresseurs tombe en panne. Cliquez ce qui se passe.",
    scene: { imgs: ["compresseurs"], t: "Les compresseurs.", d: "Plusieurs compresseurs côte à côte, sur le même châssis." },
    act: { type: "quiz", choices: ["Les deux autres continuent à refroidir : les produits restent au froid.", "Toute la centrale s’arrête, par sécurité.", "Les meubles ferment leur électrovanne.", "Les deux autres tournent plus lentement."], good: 0,
      explain: "Les compresseurs sont en parallèle : un compresseur arrêté ne bloque pas les autres. Chacun a ses vannes, on peut l’isoler pour le réparer sans arrêter le magasin." },
    correction: "Un compresseur en panne : les autres continuent." }),

  screen({ id: "chaque-compresseur", dossier: "compresseurs", title: "Ce que chaque compresseur a pour lui seul", kicker: "Compresseurs · 2", codes: [CP7], level: "appliquer",
    text: "Sur la centrale, certaines pièces sont communes à tous les compresseurs, d’autres sont en un exemplaire par compresseur. À l’assemblage, il faut les poser autant de fois qu’il y a de compresseurs.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : « Un par compresseur » ou « Commun à la centrale ».",
    scene: { imgs: ["clapet","pressostats"], t: "En un exemplaire par compresseur.", d: "Un clapet, des vannes, des pressostats de sécurité pour chacun." },
    act: { type: "sort", labels: ["Un par compresseur", "Commun à la centrale"],
      example: { text: "Le clapet anti-retour au refoulement", good: 0, why: "Chaque compresseur a le sien : un compresseur à l’arrêt ne reçoit pas le gaz des autres." },
      rows: [
        { text: "Les vannes d’isolement (aspiration et refoulement)", good: 0, why: "Elles permettent d’isoler un compresseur pour le réparer sans arrêter le magasin.", bad: "Pour réparer un compresseur seul, il faut pouvoir l’isoler : chacun a ses vannes." },
        { text: "Le pressostat de sécurité", good: 0, why: "Chaque compresseur a ses pressostats de sécurité, haute et basse pression.", bad: "Chaque compresseur a ses propres pressostats de sécurité." },
        { text: "Le collecteur d’aspiration", good: 1, why: "Un seul gros tube sur lequel tous les compresseurs sont branchés.", bad: "Il est unique : tous les compresseurs y sont branchés." },
        { text: "Le séparateur d’huile", good: 1, why: "Un séparateur commun récupère l’huile de tous les refoulements.", bad: "Un seul séparateur est placé sur le refoulement commun." },
        { text: "Le condenseur", good: 1, why: "Un seul condenseur rejette la chaleur de toute la centrale.", bad: "Il est unique : il rejette la chaleur de tous les compresseurs ensemble." },
        { text: "La bouteille de liquide", good: 1, why: "Une réserve de liquide pour toute la centrale.", bad: "Elle est unique : elle sert à toute la centrale." }
      ] },
    correction: "Un par compresseur : vannes, clapet, pressostats de sécurité. Commun : collecteur d’aspiration, séparateur d’huile, condenseur, bouteille." }),

  screen({ id: "sens-du-clapet", dossier: "compresseurs", title: "Le clapet anti-retour : dans quel sens ?", kicker: "Compresseurs · 3", codes: [CP7], level: "appliquer",
    text: "Le clapet anti-retour ne laisse passer le gaz que dans un sens. Au refoulement, il laisse sortir le gaz du compresseur et ferme dans l’autre sens. Un clapet monté à l’envers bloque le compresseur.",
    prompt: "Lisez l’exemple résolu, puis cliquez la bonne réponse pour le cas « À vous ».",
    scene: { imgs: ["clapet"], t: "Clapet et vannes.", d: "Le clapet se monte entre le compresseur et le collecteur de refoulement." },
    blocks: [
      { k: "exemple", text: "Le compresseur 1 est arrêté, les compresseurs 2 et 3 tournent", answer: "le clapet du compresseur 1 est fermé", why: "Le gaz comprimé des compresseurs 2 et 3 pousse sur le clapet du compresseur 1 : il se plaque et reste fermé." },
      { k: "cas", html: "<strong>À vous :</strong> vous montez le clapet du compresseur 2. La flèche gravée sur son corps indique le sens de passage. Où la tournez-vous ?" }
    ],
    act: { type: "choice", good: 0, cards: [
      { title: "Vers le collecteur de refoulement", note: "du compresseur vers le collecteur" },
      { title: "Vers le compresseur", note: "du collecteur vers le compresseur" },
      { title: "Peu importe", note: "un clapet marche dans les deux sens" } ],
      msgs: ["La flèche suit le sens du gaz : il sort du compresseur et va au collecteur. Dans l’autre sens, le clapet ferme.", "Dans ce sens, le clapet laisserait le gaz des autres compresseurs entrer dans celui qui est arrêté, et il bloquerait le gaz du compresseur qui tourne.", "Un clapet ne laisse passer le gaz que dans un sens : c’est tout son rôle. La flèche gravée sur le corps donne ce sens."] },
    correction: "La flèche du clapet pointe du compresseur vers le collecteur de refoulement." }),

  /* ============ LES COLLECTEURS ============ */
  screen({ id: "collecteur-aspiration", dossier: "collecteurs", title: "Le collecteur d’aspiration : une seule basse pression", kicker: "Collecteurs · 1", codes: [CP7], level: "comprendre",
    text: "Les vapeurs de tous les meubles arrivent dans le collecteur d’aspiration, un gros tube sur lequel tous les compresseurs sont branchés. Il n’y a donc qu’une seule basse pression dans la centrale. Un capteur de pression, posé sur ce collecteur, la mesure.",
    prompt: "Lisez, puis cliquez où se pose le capteur de basse pression de la centrale.",
    scene: { imgs: ["capteur"], t: "Le capteur de basse pression.", d: "Il se pose sur le collecteur d’aspiration." },
    act: { type: "choice", good: 0, cards: [
      { title: "Sur le collecteur d’aspiration", note: "là où la basse pression est commune" },
      { title: "Sur chaque meuble", note: "un capteur par évaporateur" },
      { title: "Sur la bouteille", note: "la réserve de liquide" } ],
      msgs: ["Sur le collecteur, tous les meubles bouillent à la même pression : une seule mesure suffit pour piloter les compresseurs.", "Les meubles règlent leur température avec leur électrovanne. La pression commune se mesure au collecteur.", "La bouteille est à haute pression, côté liquide : elle ne dit rien de la basse pression."] },
    correction: "Le capteur de basse pression se pose sur le collecteur d’aspiration." }),

  screen({ id: "collecteur-refoulement", dossier: "collecteurs", title: "Le collecteur de refoulement, et le trajet du gaz", kicker: "Collecteurs · 2", codes: [CP7], level: "appliquer",
    text: "Les refoulements de tous les compresseurs, chacun avec son clapet, se rejoignent dans le collecteur de refoulement. Le gaz suit toujours le même chemin : collecteur d’aspiration, compresseur, collecteur de refoulement, puis l’huile est récupérée avant le condenseur.",
    prompt: "Deux étapes sont déjà faites en exemple. Cliquez les six autres dans l’ordre : d’abord la première, puis la suivante.",
    scene: { imgs: ["compresseurs","separateur"], t: "Du compresseur au séparateur.", d: "Le gaz comprimé passe par le collecteur de refoulement, puis par le séparateur d’huile." },
    act: { type: "order", items: TRAJET.items, shown: TRAJET.shown, hints: TRAJET.hints,
      example: { text: "Départ : l’évaporateur du meuble, puis la conduite d’aspiration", answer: "les deux premières étapes", why: "Le fluide bout dans l’évaporateur, puis la vapeur part par la conduite d’aspiration jusqu’au local technique." } },
    correction: "Collecteur d’aspiration, compresseur et clapet, collecteur de refoulement, séparateur d’huile, condenseur, bouteille." }),

  /* ============ DU REFOULEMENT À LA BOUTEILLE ============ */
  screen({ id: "separateur-huile", dossier: "toit", title: "Le séparateur d’huile : pourquoi là ?", kicker: "Du refoulement · 1", codes: [CP7], level: "comprendre",
    text: "Avec le gaz chaud, les compresseurs envoient quelques gouttelettes d’huile. Un séparateur d’huile commun, sur le refoulement, les récupère avant le condenseur. Il faut ensuite rendre l’huile aux compresseurs : c’est tout un circuit.",
    prompt: "Lisez, puis cliquez où se place le séparateur d’huile.",
    scene: { imgs: ["separateur"], t: "Le séparateur d’huile.", d: "Sur le refoulement commun, avant le condenseur." },
    act: { type: "quiz", choices: ["Sur le refoulement commun, avant le condenseur.", "Sur le collecteur d’aspiration.", "Après la bouteille, sur la ligne liquide.", "Un séparateur par meuble."], good: 0,
      explain: "L’huile part avec le gaz au refoulement : on la récupère là, avant qu’elle aille au condenseur. Le circuit d’huile (séparateur, réservoir, régulateurs de niveau) a ses propres cours." },
    blocks: [{ k: "renvoi", html: "Le circuit d’huile en détail : <a href=\"../elements-circuit-huile/index.html\">Séparer et stocker</a> · <a href=\"../separateur-huile-pedagogique/index.html\">Le séparateur</a>." }],
    correction: "Sur le refoulement commun, avant le condenseur." }),

  screen({ id: "bouteille-ligne-liquide", dossier: "toit", title: "La bouteille et la ligne liquide", kicker: "Du refoulement · 2", codes: [CP7], level: "comprendre",
    text: "Le liquide qui sort du condenseur descend dans la bouteille, au local technique. Elle garde une réserve : quand des meubles s’arrêtent, le fluide qu’ils n’utilisent pas attend là. Il repart par la ligne liquide, avec un filtre déshydrateur et un voyant.",
    prompt: "Lisez, puis cliquez le rôle de la bouteille.",
    scene: { imgs: ["bouteille","filtre","voyant"], t: "La bouteille et la ligne liquide.", d: "Le liquide quitte la bouteille par le filtre déshydrateur et le voyant." },
    blocks: [{ k: "def", html: "<strong>Bouteille :</strong> réservoir de liquide sur la ligne liquide. <strong>Voyant :</strong> petit hublot où l’on voit passer le liquide." },
      { k: "renvoi", html: "Pour chaque pièce : <a href=\"../bouteille-liquide-pedagogique/index.html\">La bouteille liquide</a> · <a href=\"../filtre-deshydrateur-pedagogique/index.html\">Le filtre déshydrateur</a> · <a href=\"../voyant-liquide-pedagogique/index.html\">Le voyant liquide</a>." }],
    act: { type: "choice", good: 1, cards: [
      { title: "Elle refroidit le liquide", note: "comme un petit évaporateur" },
      { title: "Elle garde une réserve de liquide", note: "quand des meubles s’arrêtent" },
      { title: "Elle sépare l’huile du gaz", note: "avant le condenseur" } ],
      msgs: ["La bouteille ne refroidit rien : elle stocke le liquide.", "C’est une réserve : le fluide que les meubles n’utilisent pas attend dans la bouteille.", "L’huile est récupérée plus haut, par le séparateur d’huile, sur le refoulement."] },
    correction: "La bouteille garde une réserve de liquide." }),

  /* ============ MONTER DANS L'ORDRE ============ */
  screen({ id: "ordre-de-montage", dossier: "monter", title: "Dans quel ordre monter ?", kicker: "Monter · 1", codes: [CP7], level: "appliquer",
    text: "On monte du plus lourd au plus fin : le châssis, les gros éléments, les collecteurs, les tuyauteries, puis les contrôles : l’épreuve sous azote et la recherche de fuite d’abord, le tirage au vide en dernier, juste avant la charge. C’est un ordre de montage logique ; l’électricité se prépare en même temps. Sur le chantier, le dossier technique et la notice du constructeur font foi.",
    prompt: "L’étape 1 est déjà faite en exemple. Cliquez les six autres dans l’ordre : d’abord la première, puis la suivante.",
    scene: { imgs: ["compresseurs","separateur","bouteille"], t: "Ce qui se fixe sur le châssis.", d: "Compresseurs, séparateur d’huile et bouteille se posent avant les collecteurs." },
    act: { type: "order", items: ORDRE_MONTAGE.items, shown: ORDRE_MONTAGE.shown, hints: ORDRE_MONTAGE.hints, example: ORDRE_MONTAGE.example },
    correction: "Châssis de niveau, fixer les gros éléments, collecteurs et vannes, brasage sous azote et supports, épreuve et fuites, puis tirage au vide." }),

  screen({ id: "points-a-controler", dossier: "monter", title: "Ce qui se contrôle avant de refermer", kicker: "Monter · 2", codes: [CP7], level: "appliquer",
    text: "Une centrale montée se contrôle point par point avant la première mise sous tension. Chaque contrôle évite une panne que l’on ne verrait que plus tard, quand la centrale tourne.",
    prompt: "Ouvrez chaque carte, une par une, pour lire le contrôle à faire.",
    scene: { imgs: ["clapet","compresseurs"], t: "Là où se jouent les erreurs.", d: "Sens des clapets, vannes accessibles, tubes qui tirent." },
    act: { type: "check", items: [
      { title: "Le sens des clapets", note: "un par compresseur", detail: "La flèche pointe du compresseur vers le collecteur de refoulement. Un clapet à l’envers bloque le gaz." },
      { title: "Les vannes d’isolement", note: "aspiration et refoulement", detail: "Elles sont montées sur chaque compresseur et accessibles à la main : on doit pouvoir isoler un compresseur sans démonter autre chose." },
      { title: "Le châssis", note: "niveau et plots", detail: "Le châssis est de niveau, posé sur ses plots antivibratoires, comme le prévoit la notice du constructeur." },
      { title: "Les supports de tuyauteries", note: "aucun tube ne tire", detail: "Chaque tube est fixé sur un support : il ne tire pas sur un compresseur, un collecteur ou une vanne." },
      { title: "Les repères", note: "compresseurs, sens du fluide, fluide", detail: "Les compresseurs sont numérotés, les tubes repérés et l’étiquette du fluide posée, comme sur le schéma frigorifique." },
      { title: "L’électricité", note: "bornes et protections", detail: "Les bornes sont serrées et repérées, les pressostats et protections câblés comme sur le schéma électrique. Aucun compresseur ne démarre avant la charge." } ] },
    correction: "Six contrôles : clapets, vannes, châssis, supports, repères, électricité." }),

  screen({ id: "epreuve-vide-charge", dossier: "monter", title: "Épreuve, fuite, vide : trois contrôles avant la charge", kicker: "Monter · 3", codes: [CP7], level: "appliquer",
    text: "Avant de charger une centrale neuve, on fait trois contrôles, dans cet ordre : l’épreuve de pression sous azote, la recherche de fuite, puis le tirage au vide. Pour essayer, on utilise de l’azote, jamais le fluide de la centrale.",
    prompt: "Vous trouvez une fuite sur un raccord brasé pendant l’épreuve sous azote. Cliquez ce que vous faites.",
    blocks: [{ k: "renvoi", html: "Les trois gestes ont leurs cours : <a href=\"../../../../tour-de-main/interventions/etancheite-azote/\">Contrôler l’étanchéité sous azote</a> · <a href=\"../etancheite-interactive/index.html\">L’étanchéité</a> · <a href=\"../chaine-intervention-interactive/index.html\">La chaîne de l’intervention</a> · <a href=\"../capsules/index.html?c=g10\">Capsule : tuyauterie et brasage sous azote</a>." }],
    act: { type: "quiz", choices: ["Je repère la fuite, je vide l’azote, je refais le raccord, puis je recommence l’épreuve.", "Je continue : on verra à la mise en service.", "Je serre le raccord pendant que le circuit est sous pression.", "Je charge un peu de fluide pour mieux entendre la fuite."], good: 0,
      explain: "Une fuite trouvée à l’épreuve se répare avant de continuer, hors pression, puis on recommence l’essai. Le fluide ne sert pas à essayer : il ne doit pas être rejeté dans l’air quand ce n’est pas nécessaire (règlement (UE) 2024/573, article 4)." },
    correction: "Réparer hors pression, puis refaire l’épreuve : on ne charge pas avant." }),

  /* ============ BILAN ============ */
  screen({ id: "cas-seul", dossier: "bilan", title: "Un cas complet, seul", kicker: "Bilan · 1 · à vous, sans guide", codes: [CP7], level: "evaluer",
    text: "Cas complet, à faire seul : une centrale à trois compresseurs arrive sur son châssis, au local technique d’un magasin. Elle doit être raccordée à trois postes.",
    prompt: "Seul : écrivez en quelques lignes ce que vous contrôlez et dans quel ordre vous montez. Puis comparez avec la réponse type.",
    blocks: [{ k: "cas-boite", html: "<strong>Le cas.</strong> La centrale est livrée montée sur son châssis, sans fluide. Le condenseur est à poser sur le toit. Les trois postes (deux meubles, une chambre) attendent leurs tuyauteries." }],
    act: { type: "libre", label: "Votre plan, en quelques lignes :", placeholder: "Ce que je contrôle, l’ordre des gestes, ce que je ne fais pas…",
      answer: "<strong>Réponse type.</strong><ol><li><b>Avant tout :</b> je lis le dossier technique et je compare le matériel au schéma frigorifique.</li><li><b>Contrôle de la centrale livrée :</b> châssis de niveau sur ses plots, sens des clapets, vannes accessibles, repères.</li><li><b>Raccordements :</b> condenseur, puis les tuyauteries vers les postes, brasées sous balayage d’azote et fixées sur leurs supports.</li><li><b>Électricité :</b> bornes, pressostats et protections câblés comme au schéma ; aucun compresseur ne démarre avant la charge.</li><li><b>Contrôles :</b> épreuve sous azote, recherche de fuite, puis tirage au vide.</li><li><b>Ce que je ne fais pas :</b> charger avant l’épreuve, essayer avec le fluide, laisser un tube tirer sur un compresseur.</li></ol>" },
    correction: "Voir la réponse type : plan, contrôle de la centrale, raccordements, électricité, épreuve, fuites et vide." }),

  screen({ id: "bilan", dossier: "bilan", title: "À retenir, puis pratiquer", kicker: "Bilan · 2", codes: [CP7], level: "evaluer",
    text: "Une centrale, c’est plusieurs compresseurs en parallèle, deux collecteurs, un séparateur d’huile, un condenseur, une bouteille et une ligne liquide. Chaque compresseur a ses vannes et son clapet. On monte du plus lourd au plus fin, puis on contrôle avant de charger.",
    prompt: "Pour continuer : ouvrez une des suites.",
    blocks: [{ k: "liens", links: [
      { href: "../postes-magasin-interactif/index.html", title: "Raccorder les postes d’un magasin", note: "La suite : meubles, chambres, électrovannes (CP7)" },
      { href: "../../../../voyage/module-centrale.html", title: "Voyage dans tous ses états : les centrales", note: "Le même circuit raconté par une molécule, avec le diagramme enthalpique" },
      { href: "../../../../voyage/centrale.html", title: "Le film de la centrale (Studio)", note: "Les onze épisodes, à regarder d’un trait ou en trois temps" },
      { href: "../co2-r744/index.html?e=booster", title: "La centrale booster CO₂", note: "Autre famille de centrale : le CO₂ en deux étages" },
      { href: "../compresseur-interactif/index.html", title: "Le compresseur — installer, régler, vérifier", note: "Le cours sur l’organe lui-même" } ] }] })
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
