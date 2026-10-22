"use strict";

const PH = {"compresseurs":{"src":"images/compresseurs.webp","t":"Compresseurs","alt":"Quatre compresseurs : à pistons, scroll, à vis, hermétique."},"clapet":{"src":"images/clapet-vannes-service.webp","t":"Clapet et vannes","alt":"Un clapet anti-retour à gauche, deux vannes d’isolement à droite."},"separateur":{"src":"images/separateur-huile.webp","t":"Séparateur d’huile","alt":"Séparateur d’huile bleu, avec ses raccords cuivre."},"condenseur":{"src":"images/condenseur-air.webp","t":"Condenseur à air","alt":"Condenseur à air à deux ventilateurs."},"bouteille":{"src":"images/reservoir-liquide.webp","t":"Bouteille de liquide","alt":"Bouteille de liquide sur pieds."},"evaporateur":{"src":"images/evaporateur-air.webp","t":"Évaporateur","alt":"Évaporateur à deux ventilateurs, suspendu."},"detendeur":{"src":"images/detendeur-thermostatique.webp","t":"Détendeur","alt":"Détendeur thermostatique, avec son bulbe et son capillaire."},"electrovanne":{"src":"images/electrovanne.webp","t":"Électrovanne","alt":"Électrovanne : bobine bleue sur un corps en laiton."},"filtre":{"src":"images/filtre-deshydrateur.webp","t":"Filtre déshydrateur","alt":"Filtre déshydrateur noir à raccords cuivre."},"voyant":{"src":"images/voyant-liquide.webp","t":"Voyant liquide","alt":"Voyant liquide en laiton, avec son hublot."},"pressostats":{"src":"images/pressostats.webp","t":"Pressostats","alt":"Deux pressostats : un gris, un bleu."},"capteur":{"src":"images/capteur-pression.webp","t":"Capteur de pression","alt":"Capteur de pression avec sa prise électrique."},"sonde":{"src":"images/sonde-temperature.webp","t":"Sonde de température","alt":"Sonde de température et son câble."},"compresseur":{"src":"images/compresseur.webp","t":"Compresseur","alt":"Compresseur à pistons semi-hermétique : le moteur est dans le carter."},"pressostatBP":{"src":"images/pressostat-bp.webp","t":"Pressostat BP","alt":"Pressostat basse pression : le boîtier bleu."},"pressostatHP":{"src":"images/pressostat-hp.webp","t":"Pressostat HP","alt":"Pressostat haute pression : le boîtier gris."},"contacteur":{"src":"images/contacteur.webp","t":"Contacteur","alt":"Contacteur tripolaire : ses bornes de puissance en haut et en bas."}};

const STATION = {
  slug: "chaine-energie-information-interactif", cle: "chaine-energie", port: 8799, carte: null, supportPc: false,
  titre: "La chaîne d’énergie et d’information d’une installation",
  titreCourt: "La chaîne d’énergie et d’information d’une installation",
  titleTag: "La chaîne d’énergie et d’information d’une installation",
  description: "Cours interactif : les deux chaînes d’une installation frigorifique, la chaîne d’énergie (alimenter, distribuer, convertir, agir) et la chaîne d’information (acquérir, traiter, communiquer), l’endroit où elles se croisent (la bobine du contacteur), et comment les suivre quand ça ne marche pas.",
  brandSmall: "Chaînes d’énergie et d’information",
  eyebrow: "FLUIDES · ÉNERGIE ET INFORMATION",
  h1: ["La chaîne d’énergie", "et d’information"],
  intro: "Dans une installation, deux chaînes travaillent ensemble. L’une amène la puissance jusqu’au compresseur. L’autre mesure, décide et prévient. Vous apprenez les maillons de chacune, à y ranger les pièces, à voir où l’information commande l’énergie, puis à suivre la bonne chaîne quand ça ne marche pas.",
  homeVisual: { carte: false, legende: "Mesurer, décider, comprimer : deux chaînes, une installation.", images: [
    { src: PH.sonde.src, alt: "Sonde de température : un capteur, début de la chaîne d’information." },
    { src: PH.pressostats.src, alt: "Deux pressostats : des capteurs qui décident, sur la chaîne d’information." },
    { src: PH.compresseur.src, alt: "Compresseur : au bout de la chaîne d’énergie, il agit sur le fluide." } ] },
  homeNote: "<strong>Cours sur les chaînes d’une installation.</strong> L’installation étudiée est la chambre froide du cours « Qui fait quoi » : mêmes repères (B1, KM1, M1, HP, BP). Aucune valeur chiffrée. Sur le chantier, les schémas et le dossier de l’installation font foi. Toute mesure sous tension demande l’habilitation.",
  codesBox: [
    ["Bac Pro MFER 2028 — savoir S3.1 (S3 « Analyse et exploitation technique »)", "« l’analyse fonctionnelle et structurelle »."],
    ["Bac Pro MFER 2028 — savoir S6.1 (S6 « Méthodes et procédures d’intervention »)", "« l’étude du fonctionnement de l’installation »."],
    ["Avant ce cours", "Qui fait quoi : analyse fonctionnelle d’une installation frigorifique (mêmes savoirs)."]
  ],
  printCodes: "Bac Pro MFER 2028, savoir S3.1 « l’analyse fonctionnelle et structurelle » (S3 « Analyse et exploitation technique ») · savoir S6.1 « l’étude du fonctionnement de l’installation » (S6 « Méthodes et procédures d’intervention »).",
  printLoi: "",
  reference: "Bac Pro MFER 2028 : S3.1, S6.1",
  codeCle: { "Bac S3.1": "bac_mfer_2028", "Bac S6.1": "bac_mfer_2028" },
  dossiers: [
    { id: "deux", label: "Deux chaînes", note: "énergie, information" },
    { id: "energie", label: "L’énergie", note: "alimenter à agir" },
    { id: "information", label: "L’information", note: "acquérir, traiter, communiquer" },
    { id: "ensemble", label: "Les deux ensemble", note: "où elles se croisent" },
    { id: "depanner", label: "Suivre la chaîne", note: "un maillon à la fois" },
    { id: "bilan", label: "Bilan", note: "un cas, puis l’essentiel" }
  ],
  src: {
    reg: [],
    ref: [
      "**Bac Pro MFER 2028, savoirs S3.1 et S6.1** : « l’analyse fonctionnelle et structurelle » (S3.1, sous S3 « Analyse et exploitation technique ») et « l’étude du fonctionnement de l’installation » (S6.1, sous S6 « Méthodes et procédures d’intervention »), libellés de `HAL-v3/donnees/referentiels/peda/BAC_MFER_2028.json`. Le référentiel ne donne pas de limites de connaissance pour ces deux savoirs (champ `limites` vide) : le cours ne les invente pas."
    ],
    fonds: [
      "**Le cours « Les régules » du réseau** (`packs/fluides/res/_regules-commun/catalog.js`) et le cours « Le régulateur électronique » (écran « Ce que fait vraiment un régulateur » : « il commande, il ne protège pas ») : repères B1, Y1, KM1, HP, BP ; la bobine de KM1 commandée par les contacts BP et HP ; la chaîne sonde → régulateur → relais → récepteur. Le cours reprend ces repères tels quels.",
      "**Dossiers machine « Analyse fonctionnelle — Montages SF7, DFM2 »** (machine CTA FLEX) : la distinction « capteurs et actionneurs / régulation / sécurités », reprise dans le cours précédent.",
      "`HabFluide`, ch. 10 « Un régulateur ne coupe rien » : le régulateur commande, il ne protège pas (rappelé à l’écran sur la sécurité HP).",
      "`02_CAP-IFCA/C6-Securite/Consignes de securite.odt` : « Seuls les électriciens habilités ont accès aux armoires électriques » (renvoi sécurité de l’écran de dépannage).",
      "Renvois vers l’existant, sans le refaire : Le régulateur électronique (la chaîne de régulation), Câblage virtuel, Sous tension, la consignation et l’habilitation (Législation)."
    ],
    sec: [
      "**Vocabulaire des deux chaînes** : « chaîne d’énergie : alimenter, distribuer, convertir, (transmettre), agir sur la matière d’œuvre ; chaîne d’information : acquérir, traiter, communiquer » est le vocabulaire des programmes de sciences industrielles de l’Éducation nationale ; il n’est pas dans le fonds de Franck sous cette forme, et le texte officiel n’a pas été consulté. Les définitions du cours tiennent en une ligne. **À relire par Franck : est-ce ce vocabulaire que ses élèves de Bac Pro MFER ont vu ?**"
    ],
    sans: [
      "**Maillon « Transmettre »** : cité en une phrase seulement (courroie, accouplement d’un compresseur ouvert) ; non travaillé, la plupart des compresseurs de l’installation étant semi-hermétiques ou hermétiques.",
      "**Le contacteur rangé avec les actionneurs et au maillon « Distribuer »** : convention du cours, annoncée comme telle.",
      "**La méthode « on remonte la chaîne de l’effet vers la cause »** (écran « Par où commencer ») : méthode du cours pour une installation à commande par contacteur ; le fonds propose d’autres démarches de dépannage (outil « Diagnostic »). **À relire par Franck.**",
      "Aucune valeur chiffrée (tension, pression, température) n’est donnée. Les mesures sous tension ne sont pas proposées à l’élève : l’écran de dépannage renvoie à l’habilitation."
    ]
  },
  images: [],
  lireMoi: {
    ligne: "Cours interactif du plan thermo-techno, ligne « Les organes », après « Qui fait quoi ».",
    fait: "  Il met côte à côte les deux chaînes d’une installation : la chaîne d’énergie (alimenter, distribuer, convertir, agir) et la chaîne\n  d’information (acquérir, traiter, communiquer). L’élève y range les pièces de la chambre froide (repères B1, KM1, M1, HP, BP),\n  voit où l’information commande l’énergie (la bobine du contacteur KM1), puis apprend à chercher une panne dans la bonne chaîne.\n  Les mesures sous tension ne sont pas demandées : renvoi à l’habilitation.",
    codes: "  Bac Pro MFER 2028 : savoirs S3.1 « l’analyse fonctionnelle et structurelle » et S6.1 « l’étude du fonctionnement de l’installation ».",
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

const S31 = "Bac S3.1", S61 = "Bac S6.1";
const CHAINE_ENERGIE = { label: "La chaîne d’énergie", cls: "energie", boxes: [
  { t: "Alimenter", s: "le réseau électrique, le sectionneur", cls: "energie" },
  { t: "Distribuer", s: "le contacteur KM1", img: PH.contacteur.src, alt: "Contacteur tripolaire", cls: "energie" },
  { t: "Convertir", s: "le moteur M1, dans le compresseur", cls: "energie" },
  { t: "Agir sur le fluide", s: "le compresseur", img: PH.compresseur.src, alt: "Compresseur à pistons", cls: "energie" } ] };
const CHAINE_INFO = { label: "La chaîne d’information", cls: "info", boxes: [
  { t: "Acquérir", s: "les capteurs : sonde, pressostats", img: PH.sonde.src, alt: "Sonde de température", cls: "info" },
  { t: "Traiter", s: "le régulateur ou les contacts de commande comparent et décident", cls: "info" },
  { t: "Communiquer", s: "l’afficheur, le voyant, l’alarme", cls: "info" } ] };

const screens = [
  /* ============ DEUX CHAÎNES ============ */
  screen({ id: "deux-chaines", dossier: "deux", title: "Deux chaînes dans la même installation", kicker: "Deux chaînes · 1", codes: [S31], level: "comprendre",
    text: "Dans la chambre froide, deux chaînes travaillent ensemble. La chaîne d’énergie amène la puissance jusqu’au compresseur. La chaîne d’information mesure, décide et prévient. Chaque maillon a une fonction.",
    prompt: "Lisez l’exemple résolu, puis cliquez la chaîne du contacteur KM1.",
    blocks: [
      { k: "def", html: "<strong>Chaîne d’énergie :</strong> le chemin de la puissance. <strong>Chaîne d’information :</strong> le chemin de la mesure et de la décision. <strong>Maillon :</strong> un élément de la chaîne, avec sa fonction." },
      Object.assign({ k: "flux" }, CHAINE_ENERGIE),
      Object.assign({ k: "flux" }, CHAINE_INFO),
      { k: "exemple", text: "Le thermostat B1", answer: "chaîne d’information", why: "Il mesure et décide : il ne fournit aucune puissance au compresseur." }
    ],
    act: { type: "choice", good: 0, cards: [
      { title: "La chaîne d’énergie", note: "il distribue la puissance au moteur" },
      { title: "La chaîne d’information", note: "il mesure la pression" },
      { title: "Aucune des deux", note: "c’est un organe du circuit" } ],
      msgs: ["Le contacteur envoie la puissance au moteur du compresseur : il distribue, c’est un maillon de la chaîne d’énergie.", "Il ne mesure rien : les pressostats et le thermostat mesurent. Le contacteur distribue la puissance.", "Le contacteur est un appareil électrique, pas un organe du circuit : il est dans la chaîne d’énergie."] },
    correction: "Le contacteur KM1 est dans la chaîne d’énergie : il distribue la puissance au moteur." }),

  /* ============ L'ÉNERGIE ============ */
  screen({ id: "chaine-d-energie", dossier: "energie", title: "La chaîne d’énergie : quatre maillons", kicker: "L’énergie · 1", codes: [S31], level: "appliquer",
    text: "La puissance suit quatre maillons. Alimenter : amener l’énergie électrique. Distribuer : l’envoyer au bon moment, au bon appareil. Convertir : la changer de forme. Agir : faire le travail sur le fluide.",
    prompt: "Un élément est déjà rangé en exemple. Rangez les quatre autres : cliquez son maillon.",
    blocks: [{ k: "def", html: "Quand le moteur est séparé du compresseur (compresseur ouvert), un maillon « Transmettre » s’ajoute : courroie ou accouplement. Il n’y en a pas ici." }],
    act: { type: "sort", labels: ["Alimenter", "Distribuer", "Convertir", "Agir sur le fluide"],
      example: { text: "Le réseau électrique du bâtiment", good: 0, why: "Il amène l’énergie électrique à l’installation : il alimente." },
      rows: [
        { text: "Le contacteur KM1", good: 1, why: "Il envoie la puissance au moteur quand il colle : il distribue.", bad: "Le contacteur envoie la puissance au bon moment : il distribue." },
        { text: "Le moteur électrique M1", good: 2, why: "Il change l’énergie électrique en mouvement : il convertit.", bad: "Le moteur change l’électricité en mouvement : il convertit." },
        { text: "Le compresseur", good: 3, why: "Il comprime le fluide : il agit sur le fluide.", bad: "Le compresseur comprime le fluide : il agit sur le fluide." },
        { text: "Le sectionneur à l’entrée de l’armoire", good: 0, why: "Il isole l’arrivée du réseau : il fait partie de l’alimentation.", bad: "Le sectionneur est à l’entrée, côté réseau : il fait partie de l’alimentation." }
      ] },
    correction: "Alimenter : réseau, sectionneur. Distribuer : KM1. Convertir : moteur M1. Agir : compresseur." }),

  /* ============ L'INFORMATION ============ */
  screen({ id: "chaine-d-information", dossier: "information", title: "La chaîne d’information : trois maillons", kicker: "L’information · 1", codes: [S31], level: "appliquer",
    text: "L’information suit trois maillons. Acquérir : mesurer. Traiter : comparer la mesure à une consigne et décider. Communiquer : informer l’utilisateur.",
    prompt: "Un élément est déjà rangé en exemple. Rangez les cinq autres : cliquez son maillon.",
    act: { type: "sort", labels: ["Acquérir", "Traiter", "Communiquer"],
      example: { text: "La sonde de température de la chambre", good: 0, why: "Elle mesure la température de l’air : elle acquiert l’information." },
      rows: [
        { text: "Le pressostat BP", good: 0, why: "Il mesure la pression d’aspiration : il acquiert.", bad: "Le pressostat mesure une pression : il acquiert." },
        { text: "Le régulateur qui compare la température à la consigne", good: 1, why: "Il compare et décide : il traite.", bad: "Il compare la mesure à la consigne : il traite." },
        { text: "L’afficheur de température", good: 2, why: "Il montre la valeur à l’utilisateur : il communique.", bad: "L’afficheur montre la valeur : il communique." },
        { text: "Le détecteur de fuite du local technique", good: 0, why: "Il mesure la présence de fluide : il acquiert.", bad: "Le détecteur mesure la présence de fluide : il acquiert." },
        { text: "L’alarme de défaut", good: 2, why: "Elle prévient l’utilisateur : elle communique.", bad: "L’alarme prévient l’utilisateur : elle communique." }
      ] },
    correction: "Acquérir : sonde, pressostat, détecteur. Traiter : régulateur. Communiquer : afficheur, alarme." }),

  /* ============ LES DEUX ENSEMBLE ============ */
  screen({ id: "ou-elles-se-croisent", dossier: "ensemble", title: "Où l’information commande l’énergie", kicker: "Ensemble · 1", codes: [S31], level: "comprendre",
    text: "Les deux chaînes se croisent à un seul endroit : le contacteur. La bobine de KM1 reçoit l’ordre de la chaîne d’information. Ses contacts de puissance ferment ou ouvrent la chaîne d’énergie.",
    prompt: "Exemple résolu : lisez les deux chaînes de la chambre, puis leur lecture en trois points.",
    blocks: [
      { k: "flux", label: "La chaîne d’information de la chambre", cls: "info", boxes: [
        { t: "B1 et BP", s: "mesurent la température et la pression", img: PH.pressostats.src, alt: "Pressostats", cls: "info" },
        { t: "Leurs contacts", s: "se ferment ou s’ouvrent : ils décident", cls: "info" },
        { t: "La bobine de KM1", s: "reçoit l’ordre", cls: "fort info" } ] },
      { k: "flux", label: "La chaîne d’énergie de la chambre", cls: "energie", boxes: [
        { t: "Les contacts de KM1", s: "ferment la puissance", img: PH.contacteur.src, alt: "Contacteur tripolaire", cls: "fort energie" },
        { t: "Le moteur M1", s: "tourne, dans le compresseur", img: PH.compresseur.src, alt: "Compresseur à pistons : le moteur est dans le carter", cls: "energie" },
        { t: "Le fluide", s: "est comprimé", cls: "energie" } ] },
      { k: "lecture", items: [
        "<strong>L’information</strong> n’apporte aucune puissance : elle décide seulement.",
        "<strong>L’énergie</strong> ne décide rien : elle obéit à KM1.",
        "<strong>Le contacteur</strong> est le seul point de rencontre : sa bobine est dans la chaîne d’information, ses contacts de puissance dans la chaîne d’énergie." ] }
    ] }),

  screen({ id: "bobine-ou-contacts", dossier: "ensemble", title: "Où se fait le passage ?", kicker: "Ensemble · 2", codes: [S31], level: "appliquer",
    text: "Le contacteur a deux parties. Sa bobine reçoit l’ordre. Ses contacts de puissance ferment la puissance. C’est là que l’information commande l’énergie.",
    prompt: "Cliquez où l’information commande l’énergie.",
    act: { type: "quiz", choices: ["À la bobine du contacteur KM1 : l’ordre y arrive, et ses contacts ferment la puissance.", "Au moteur M1 : il reçoit l’ordre.", "Au compresseur : il décide de tourner.", "Au sectionneur : il choisit quand démarrer."], good: 0,
      explain: "Le moteur et le compresseur obéissent. Le sectionneur isole, il ne commande pas la marche. La bobine de KM1 reçoit l’ordre, ses contacts ferment la puissance : c’est le seul passage entre les deux chaînes." },
    correction: "À la bobine de KM1 : l’ordre arrive, les contacts ferment la puissance." }),

  screen({ id: "securite-et-chaines", dossier: "ensemble", title: "La sécurité HP ouvre : que coupe-t-elle ?", kicker: "Ensemble · 3", codes: [S31], level: "appliquer",
    text: "Le pressostat HP est dans la chaîne d’information : il mesure la haute pression. Quand il ouvre, il ne coupe pas la puissance lui-même. Il retire l’ordre à KM1, et c’est KM1 qui coupe.",
    prompt: "Le pressostat HP ouvre sur une haute pression trop haute. Cliquez ce qu’il coupe.",
    act: { type: "quiz", choices: ["La commande de KM1 : sans ordre, KM1 retombe et la puissance du moteur est coupée.", "Directement l’arrivée du réseau électrique.", "Le détendeur.", "La sonde de température."], good: 0,
      explain: "HP agit sur la chaîne d’énergie par le contacteur : son contact ouvre la commande de KM1, KM1 retombe, le moteur n’est plus alimenté. Sur d’autres installations, la sécurité peut couper la puissance directement : le dossier de l’installation le dit." },
    correction: "Il coupe la commande de KM1, et KM1 coupe la puissance." }),

  /* ============ SUIVRE LA CHAÎNE ============ */
  screen({ id: "ou-chercher", dossier: "depanner", title: "Dans quelle chaîne chercher ?", kicker: "Suivre la chaîne · 1", codes: [S61, S31], level: "appliquer",
    text: "Quand ça ne marche pas, la première question est : dans quelle chaîne est le défaut ? Un défaut de puissance se cherche dans la chaîne d’énergie. Un ordre qui manque ou une mesure fausse se cherchent dans la chaîne d’information.",
    prompt: "Un symptôme est déjà rangé en exemple. Rangez les six autres : « Chaîne d’énergie » ou « Chaîne d’information ».",
    blocks: [{ k: "loi", titre: "SÉCURITÉ : MESURER SOUS TENSION, SEULEMENT HABILITÉ", html: "Une mesure sous tension demande l’habilitation et les équipements de protection. Sans habilitation, on s’arrête et on appelle la personne habilitée. Voir <a href=\"../../../../legislation/stations/elec-habilitation/index.html\">Habilitation électrique</a> (Législation)." }],
    act: { type: "sort", labels: ["Chaîne d’énergie", "Chaîne d’information"],
      example: { text: "Le voyant de défaut ne s’allume pas alors que le défaut existe", good: 1, why: "Le voyant communique : il est dans la chaîne d’information." },
      rows: [
        { text: "KM1 est collé, mais le moteur ne tourne pas", good: 0, why: "La puissance est bien distribuée, mais n’arrive pas au moteur : chaîne d’énergie.", bad: "KM1 colle : l’ordre est arrivé. Le défaut est côté puissance." },
        { text: "La bobine de KM1 n’est pas alimentée", good: 1, why: "L’ordre n’arrive pas à la bobine : chaîne d’information.", bad: "C’est l’ordre qui manque à la bobine : chaîne d’information." },
        { text: "Le disjoncteur a déclenché", good: 0, why: "Il protège l’alimentation de puissance : chaîne d’énergie.", bad: "Le disjoncteur est dans l’alimentation de puissance : chaîne d’énergie." },
        { text: "La sonde donne une valeur fausse", good: 1, why: "Une mesure fausse : chaîne d’information.", bad: "Une mesure fausse vient de la chaîne d’information." },
        { text: "Le contact du pressostat BP reste ouvert", good: 1, why: "Le contact est un maillon de la commande : chaîne d’information.", bad: "Le contact de BP est dans la commande de KM1 : chaîne d’information." },
        { text: "Un fusible de puissance est fondu", good: 0, why: "Il est sur l’alimentation du moteur : chaîne d’énergie.", bad: "Un fusible de puissance est sur l’alimentation du moteur : chaîne d’énergie." }
      ] },
    correction: "Énergie : KM1 collé sans moteur, disjoncteur, fusible de puissance. Information : bobine non alimentée, sonde fausse, contact de BP ouvert." }),

  screen({ id: "par-ou-commencer", dossier: "depanner", title: "Le compresseur ne démarre pas : par où commencer ?", kicker: "Suivre la chaîne · 2", codes: [S61, S31], level: "appliquer",
    text: "Méthode du cours : on part de l’effet et on remonte la chaîne, un maillon à la fois. Le compresseur ne tourne pas : on regarde si KM1 est collé, puis si sa bobine est alimentée, puis si les contacts de commande sont fermés, enfin si la mesure est juste.",
    prompt: "L’étape 1 est déjà faite en exemple. Cliquez les quatre autres dans l’ordre : d’abord la première, puis la suivante.",
    blocks: [{ k: "renvoi", html: "Avant toute mesure : habilitation et consignation. Voir <a href=\"../../../../legislation/stations/elec-consigner/index.html\">Consigner</a> (Législation)." }],
    act: { type: "order",
      items: ["KM1 est-il collé ?", "La bobine de KM1 est-elle alimentée ?", "Les contacts de la commande (B1, BP, HP) sont-ils fermés ?", "Les capteurs mesurent-ils juste ?"], shown: [2, 0, 3, 1],
      hints: ["On commence par l’effet : le moteur reçoit-il la puissance ? Un contacteur collé distribue la puissance.", "Si KM1 n’est pas collé, on regarde sa bobine : reçoit-elle l’ordre ?", "Si la bobine n’est pas alimentée, on suit l’ordre en amont : les contacts de B1, BP et HP sont-ils fermés ?", "Enfin, si un contact reste ouvert, on vérifie que le capteur qui le commande mesure juste."],
      example: { text: "Étape 1 : le compresseur ne tourne pas", answer: "je constate l’effet", why: "On part de ce que l’on voit, pas de ce que l’on suppose." } },
    correction: "KM1 collé ? Bobine alimentée ? Contacts de commande fermés ? Capteurs justes ?" }),

  /* ============ BILAN ============ */
  screen({ id: "cas-seul", dossier: "bilan", title: "Un cas complet, seul", kicker: "Bilan · 1 · à vous, sans guide", codes: [S31, S61], level: "evaluer",
    text: "Cas complet, à faire seul : une chambre froide à régulateur électronique.",
    prompt: "Seul : écrivez les maillons des deux chaînes, puis par où vous commencez à chercher. Puis comparez avec la réponse type.",
    blocks: [{ k: "cas-boite", html: "<strong>Le cas.</strong> La chambre est trop chaude : l’afficheur du régulateur indique 12 °C pour une consigne de 3 °C. Le compresseur est à l’arrêt. L’installation a une sonde de chambre, un régulateur électronique, un contacteur KM1, un moteur et un compresseur." }],
    act: { type: "libre", label: "Votre réponse, en quelques lignes :", placeholder: "Les maillons de chaque chaîne, la chaîne où je cherche, par quoi je commence…",
      answer: "<strong>Réponse type.</strong><ol><li><b>Chaîne d’information :</b> la sonde acquiert, le régulateur traite, l’afficheur communique.</li><li><b>Chaîne d’énergie :</b> le réseau et le sectionneur alimentent, KM1 distribue, le moteur convertit, le compresseur agit sur le fluide.</li><li><b>Ce que dit l’afficheur :</b> 12 °C, bien au-dessus de la consigne. La chaîne d’information a mesuré et communiqué : la mesure est plausible.</li><li><b>Où je cherche :</b> le régulateur demande du froid, mais le compresseur est à l’arrêt : je cherche entre l’ordre et la puissance. KM1 est-il collé ? Sa bobine est-elle alimentée ? Les contacts de sécurité sont-ils fermés ?</li><li><b>Ce que je ne fais pas :</b> mesurer sous tension sans habilitation. Sans habilitation, j’appelle la personne habilitée.</li></ol>" },
    correction: "Voir la réponse type : maillons des deux chaînes, chaîne où chercher, sécurité." }),

  screen({ id: "bilan", dossier: "bilan", title: "À retenir, puis pratiquer", kicker: "Bilan · 2", codes: [S31, S61], level: "evaluer",
    text: "Deux chaînes. L’énergie : alimenter, distribuer, convertir, agir. L’information : acquérir, traiter, communiquer. Elles se croisent au contacteur : sa bobine reçoit l’ordre, ses contacts ferment la puissance. Une panne se cherche dans la bonne chaîne.",
    prompt: "Pour continuer : ouvrez une des suites.",
    blocks: [{ k: "liens", links: [
      { href: "../analyse-fonctionnelle-interactif/index.html", title: "Qui fait quoi : analyse fonctionnelle", note: "Le cours précédent : fonctions, organes, capteurs, actionneurs" },
      { href: "../regulateur-electronique-interactif/index.html", title: "Le régulateur électronique", note: "La chaîne de régulation : sonde, régulateur, relais, compresseur" },
      { href: "../pump-down-automatique/index.html", title: "Le pump-down automatique", note: "Deux commandes séparées, avec le schéma et le film" },
      { href: "../../../../cablage-virtuel/index.html", title: "Câblage virtuel", note: "Câbler une platine, puis lire les deux chaînes sur le schéma" },
      { href: "../../../../legislation/stations/elec-habilitation/index.html", title: "Habilitation électrique", note: "Avant toute mesure sous tension (Législation)" } ] }] })
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
