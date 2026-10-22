"use strict";

const PH = {"compresseurs":{"src":"images/compresseurs.webp","t":"Compresseurs","alt":"Quatre compresseurs : à pistons, scroll, à vis, hermétique."},"clapet":{"src":"images/clapet-vannes-service.webp","t":"Clapet et vannes","alt":"Un clapet anti-retour à gauche, deux vannes d’isolement à droite."},"separateur":{"src":"images/separateur-huile.webp","t":"Séparateur d’huile","alt":"Séparateur d’huile bleu, avec ses raccords cuivre."},"condenseur":{"src":"images/condenseur-air.webp","t":"Condenseur à air","alt":"Condenseur à air à deux ventilateurs."},"bouteille":{"src":"images/reservoir-liquide.webp","t":"Bouteille de liquide","alt":"Bouteille de liquide sur pieds."},"evaporateur":{"src":"images/evaporateur-air.webp","t":"Évaporateur","alt":"Évaporateur à deux ventilateurs, suspendu."},"detendeur":{"src":"images/detendeur-thermostatique.webp","t":"Détendeur","alt":"Détendeur thermostatique, avec son bulbe et son capillaire."},"electrovanne":{"src":"images/electrovanne.webp","t":"Électrovanne","alt":"Électrovanne : bobine bleue sur un corps en laiton."},"filtre":{"src":"images/filtre-deshydrateur.webp","t":"Filtre déshydrateur","alt":"Filtre déshydrateur noir à raccords cuivre."},"voyant":{"src":"images/voyant-liquide.webp","t":"Voyant liquide","alt":"Voyant liquide en laiton, avec son hublot."},"pressostats":{"src":"images/pressostats.webp","t":"Pressostats","alt":"Deux pressostats : un gris, un bleu."},"capteur":{"src":"images/capteur-pression.webp","t":"Capteur de pression","alt":"Capteur de pression avec sa prise électrique."},"sonde":{"src":"images/sonde-temperature.webp","t":"Sonde de température","alt":"Sonde de température et son câble."},"compresseur":{"src":"images/compresseur.webp","t":"Compresseur","alt":"Compresseur à pistons semi-hermétique : le moteur est dans le carter."},"pressostatBP":{"src":"images/pressostat-bp.webp","t":"Pressostat BP","alt":"Pressostat basse pression : le boîtier bleu."},"pressostatHP":{"src":"images/pressostat-hp.webp","t":"Pressostat HP","alt":"Pressostat haute pression : le boîtier gris."},"contacteur":{"src":"images/contacteur.webp","t":"Contacteur","alt":"Contacteur tripolaire : ses bornes de puissance en haut et en bas."}};

const ORG = "../../../../jouerezo/voyage/organes/";
const STATION = {
  slug: "analyse-fonctionnelle-interactif", cle: "analyse-fonctionnelle", port: 8799, carte: null, supportPc: false,
  titre: "Qui fait quoi : analyse fonctionnelle d’une installation frigorifique",
  titreCourt: "Qui fait quoi — analyse fonctionnelle d’une installation frigorifique",
  titleTag: "Qui fait quoi — analyse fonctionnelle d’une installation frigorifique",
  description: "Cours interactif : l’analyse fonctionnelle et structurelle d’une installation frigorifique : le besoin, la fonction et l’organe, les deux structures (circuit et câblage), capteurs et actionneurs, lire un dossier d’analyse fonctionnelle, étudier une séquence de fonctionnement.",
  brandSmall: "Analyse fonctionnelle",
  eyebrow: "FLUIDES · ANALYSE D’UNE INSTALLATION",
  h1: ["Qui fait quoi dans", "une installation"],
  intro: "Avant de régler ou de dépanner, on veut savoir qui fait quoi. Vous apprenez à séparer le besoin, la fonction et l’organe, à reconnaître les deux structures d’une installation (le circuit et le câblage), les capteurs et les actionneurs, à lire un dossier d’analyse fonctionnelle et à suivre une séquence de fonctionnement.",
  homeVisual: { carte: false, legende: "Chaque organe a une fonction : comprimer, détendre, absorber la chaleur.", images: [
    { src: ORG + "compresseur.webp", alt: "Compresseur à pistons : il comprime la vapeur." },
    { src: ORG + "detendeur.webp", alt: "Détendeur thermostatique : il fait chuter la pression du liquide." },
    { src: ORG + "evaporateur.webp", alt: "Évaporateur à deux ventilateurs : il absorbe la chaleur du local." } ] },
  homeNote: "<strong>Cours sur l’analyse d’une installation.</strong> L’installation étudiée est la chambre froide à pump-down automatique du cours « Les régules » : mêmes repères (B1, Y1, KM1, HP, BP). Aucune valeur chiffrée. Sur le chantier, les schémas et le dossier de l’installation font foi.",
  codesBox: [
    ["Bac Pro MFER 2028 — savoir S3.1 (S3 « Analyse et exploitation technique »)", "« l’analyse fonctionnelle et structurelle »."],
    ["Bac Pro MFER 2028 — savoir S6.1 (S6 « Méthodes et procédures d’intervention »)", "« l’étude du fonctionnement de l’installation »."],
    ["À voir ensuite", "La chaîne d’énergie et d’information d’une installation (mêmes savoirs)."]
  ],
  printCodes: "Bac Pro MFER 2028, savoir S3.1 « l’analyse fonctionnelle et structurelle » (S3 « Analyse et exploitation technique ») · savoir S6.1 « l’étude du fonctionnement de l’installation » (S6 « Méthodes et procédures d’intervention »).",
  printLoi: "",
  reference: "Bac Pro MFER 2028 : S3.1, S6.1",
  codeCle: { "Bac S3.1": "bac_mfer_2028", "Bac S6.1": "bac_mfer_2028" },
  dossiers: [
    { id: "besoin", label: "À quoi ça sert", note: "le besoin, la fonction" },
    { id: "fonctions", label: "Fonctions et structure", note: "qui fait quoi, relié à quoi" },
    { id: "capteurs", label: "Capteurs et actionneurs", note: "mesurer, agir, lire le dossier" },
    { id: "fonctionnement", label: "Le fonctionnement", note: "la séquence, la sécurité" },
    { id: "bilan", label: "Bilan", note: "un cas, puis l’essentiel" }
  ],
  src: {
    reg: [],
    ref: [
      "**Bac Pro MFER 2028, savoirs S3.1 et S6.1** : « l’analyse fonctionnelle et structurelle » (S3.1, sous S3 « Analyse et exploitation technique ») et « l’étude du fonctionnement de l’installation » (S6.1, sous S6 « Méthodes et procédures d’intervention »), libellés de `HAL-v3/donnees/referentiels/peda/BAC_MFER_2028.json`. Le référentiel ne donne pas de limites de connaissance pour ces deux savoirs (champ `limites` vide) : le cours ne les invente pas."
    ],
    fonds: [
      "**Dossiers machine « Analyse fonctionnelle — Montages SF7, DFM2 »** (`_Archives/Themes/Archives-Techniques/DPWA1000007A…SF7.pdf`, `…DFM2.pdf`, machine CTA FLEX) : ils fournissent la **structure** d’un dossier d’analyse fonctionnelle — liste des capteurs et actionneurs avec leurs repères (B capteurs, S sécurités, M moteurs, E résistances…), « Traitement », « Régulation », « Gestions / Mesures / Contrôles », modes de fonctionnement. Seule cette structure est reprise ; la machine (centrale de traitement d’air) n’est pas celle du cours.",
      "**Le cours « Les régules » du réseau** (`packs/fluides/res/_regules-commun/catalog.js`, stations « Le pump-down automatique », « Commande directe », « Protection minimum ») : les repères B1 (thermostat), Y1 (électrovanne), KM1 (contacteur), HP et BP (pressostats), le thermostat qui commande Y1 et le pressostat BP qui commande KM1, la sécurité HP en série avec la commande de KM1, la séquence « Y1 ferme avant que KM1 s’arrête ». Le cours reprend ces repères tels quels pour que l’élève ne rencontre pas deux conventions.",
      "`jouerezo/voyage/organes/*.webp` : images de synthèse des organes, déjà en ligne sur le site (voir SOURCES-IMAGES.md).",
      "Renvois vers l’existant, sans le refaire : Le pump-down automatique, La commande directe, La protection minimum, Le circuit organe par organe, Voyage dans tous ses états — la régulation."
    ],
    sans: [
      "**Vocabulaire** (fonction principale, fonction, organe, analyse fonctionnelle et structurelle, capteur, actionneur) : vocabulaire courant des sciences industrielles, donné en une ligne là où il sert ; le fonds ne contient pas de cours d’analyse fonctionnelle rédigé (hors dossiers machine SF7 et DFM2). Les méthodes nommées (bête à cornes, FAST) ne sont pas enseignées. **À relire par Franck : est-ce bien ce qu’il entend par S3.1 et S6.1 ?**",
      "**Le contacteur rangé avec les actionneurs** : convention du cours, annoncée comme telle.",
      "Aucune valeur chiffrée (pression, température, seuil) n’est donnée."
    ]
  },
  images: [
    ["`jouerezo/voyage/organes/compresseur.webp`, `detendeur.webp`, `evaporateur.webp` (accueil), `filtre.webp`, `voyant.webp`, `electrovanne.webp`, `bouteille.webp`, `condenseur.webp` (écrans 3 et 4)", "Images de synthèse des organes, déjà en ligne sur inerweb.fr (`tome-3-technologie-organes/images-organes/`, juillet 2026), reprises par le Voyage le 03/10/2026", "Droits réservés inerWeb (voir `jouerezo/voyage/organes/SOURCES.md`)"]
  ],
  lireMoi: {
    ligne: "Cours interactif du plan thermo-techno, ligne « Les organes », après « L’évaporateur ».",
    fait: "  Il apprend à passer du besoin (à quoi sert l’installation) à la fonction (ce que ça fait) puis à l’organe (la pièce), à séparer\n  les deux structures d’une installation (circuit frigorifique, câblage), à reconnaître capteurs et actionneurs, à lire un dossier\n  d’analyse fonctionnelle (repères B1, Y1, KM1, HP, BP de la chambre à pump-down automatique) et à suivre une séquence de\n  fonctionnement (arrêt en température puis arrêt de sécurité). Il se prolonge par « La chaîne d’énergie et d’information ».",
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
const V = (nom) => ORG + nom + ".webp";

const screens = [
  /* ============ À QUOI ÇA SERT ============ */
  screen({ id: "a-quoi-ca-sert", dossier: "besoin", title: "À quoi sert l’installation ?", kicker: "À quoi ça sert · 1", codes: [S31], level: "comprendre",
    text: "Avant de regarder les pièces, on demande : à quoi sert l’installation ? C’est sa fonction principale : ce pour quoi elle existe. Les pièces ne sont que les moyens d’y arriver. Cette question se pose en premier, pour toute installation.",
    prompt: "Lisez l’exemple résolu, puis cliquez la fonction principale d’une chambre froide positive.",
    blocks: [{ k: "exemple", text: "Un lave-linge", answer: "laver du linge", why: "On ne répond pas « faire tourner un tambour » : le tambour est un moyen, pas le but." }],
    act: { type: "choice", good: 0, cards: [
      { title: "Conserver des produits frais à une température donnée", note: "le but de la chambre" },
      { title: "Faire tourner un compresseur", note: "un moyen" },
      { title: "Rejeter de la chaleur dehors", note: "un moyen, côté condenseur" } ],
      msgs: ["C’est le but de la chambre froide : garder les produits frais, au-dessus de zéro.", "Le compresseur est un moyen : il n’est pas le but de l’installation.", "Rejeter la chaleur est un moyen, côté condenseur : le but, c’est de garder les produits frais."] },
    correction: "Conserver des produits frais à une température donnée." }),

  screen({ id: "fonction-ou-organe", dossier: "besoin", title: "Une fonction, ou un organe ?", kicker: "À quoi ça sert · 2", codes: [S31], level: "appliquer",
    text: "Une fonction dit ce que ça fait : c’est un verbe. Un organe est la pièce qui le fait : c’est un nom. Analyser une installation, c’est mettre en face de chaque fonction l’organe qui la remplit.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : « Une fonction » ou « Un organe ».",
    act: { type: "sort", labels: ["Une fonction (ce que ça fait)", "Un organe (la pièce)"],
      example: { text: "Le détendeur", good: 1, why: "C’est une pièce que l’on peut toucher : un organe. Sa fonction, c’est « faire chuter la pression »." },
      rows: [
        { text: "Comprimer la vapeur", good: 0, why: "C’est un verbe : ce que le compresseur fait.", bad: "« Comprimer » est un verbe : c’est une fonction." },
        { text: "Le condenseur", good: 1, why: "C’est une pièce : un organe.", bad: "Le condenseur est une pièce : un organe." },
        { text: "Stocker le liquide", good: 0, why: "C’est un verbe : ce que la bouteille fait.", bad: "« Stocker » est un verbe : c’est une fonction." },
        { text: "Le thermostat de chambre", good: 1, why: "C’est une pièce : un organe.", bad: "Le thermostat est une pièce : un organe." },
        { text: "Arrêter le froid à la consigne", good: 0, why: "C’est ce que fait le thermostat : une fonction.", bad: "« Arrêter » est un verbe : c’est une fonction." },
        { text: "La bouteille", good: 1, why: "C’est une pièce : un organe.", bad: "La bouteille est une pièce : un organe." }
      ] },
    correction: "Fonctions : comprimer, stocker, arrêter le froid. Organes : détendeur, condenseur, thermostat, bouteille." }),

  /* ============ FONCTIONS ET STRUCTURE ============ */
  screen({ id: "fonction-du-circuit", dossier: "fonctions", title: "Qui fait quoi dans le circuit ?", kicker: "Fonctions · 1", codes: [S31], level: "appliquer",
    text: "Chaque organe du circuit remplit une fonction. Le compresseur comprime la vapeur, le condenseur évacue la chaleur dehors, le détendeur fait chuter la pression, l’évaporateur absorbe la chaleur du local.",
    prompt: "Un organe est déjà rangé en exemple. Rangez les trois autres : cliquez sa fonction.",
    blocks: [{ k: "images", items: [
      { img: V("compresseur"), alt: "Compresseur à pistons", t: "Compresseur" }, { img: V("condenseur"), alt: "Condenseur à air", t: "Condenseur" },
      { img: V("detendeur"), alt: "Détendeur thermostatique", t: "Détendeur" }, { img: V("evaporateur"), alt: "Évaporateur à ventilateurs", t: "Évaporateur" } ] }],
    act: { type: "sort", labels: ["Comprimer la vapeur", "Évacuer la chaleur dehors", "Faire chuter la pression", "Absorber la chaleur du local"],
      example: { text: "Le compresseur", good: 0, why: "Il aspire la vapeur et la comprime : sa pression et sa température montent." },
      rows: [
        { text: "Le condenseur", good: 1, why: "Il rejette dehors la chaleur du local : il évacue la chaleur.", bad: "Le condenseur est dehors : il rejette la chaleur." },
        { text: "Le détendeur", good: 2, why: "Le liquide passe par un passage étroit : sa pression chute.", bad: "Le détendeur est un passage étroit : la pression chute." },
        { text: "L’évaporateur", good: 3, why: "Le fluide y bout en prenant la chaleur du local : il absorbe la chaleur.", bad: "L’évaporateur est dans le local : il absorbe sa chaleur." }
      ] },
    correction: "Compresseur : comprimer. Condenseur : évacuer la chaleur. Détendeur : faire chuter la pression. Évaporateur : absorber la chaleur." }),

  screen({ id: "fonction-ligne-liquide", dossier: "fonctions", title: "Qui fait quoi sur la ligne liquide ?", kicker: "Fonctions · 2", codes: [S31], level: "appliquer",
    text: "La ligne liquide a ses propres organes, et chacun a sa fonction. Le même geste d’analyse s’applique : une pièce, une fonction.",
    prompt: "Un organe est déjà rangé en exemple. Rangez les trois autres : cliquez sa fonction.",
    blocks: [{ k: "images", items: [
      { img: V("filtre"), alt: "Filtre déshydrateur", t: "Filtre déshydrateur" }, { img: V("voyant"), alt: "Voyant liquide", t: "Voyant" },
      { img: V("electrovanne"), alt: "Électrovanne", t: "Électrovanne" }, { img: V("bouteille"), alt: "Bouteille de liquide", t: "Bouteille" } ] }],
    act: { type: "sort", labels: ["Retenir l’humidité", "Montrer le liquide", "Ouvrir ou fermer le liquide", "Stocker le liquide"],
      example: { text: "Le filtre déshydrateur", good: 0, why: "Il retient l’humidité et les saletés qui circulent avec le liquide." },
      rows: [
        { text: "Le voyant", good: 1, why: "C’est un petit hublot : on y voit passer le liquide.", bad: "Le voyant est un hublot : il montre le liquide." },
        { text: "L’électrovanne", good: 2, why: "Un courant l’ouvre ou la ferme : elle commande l’arrivée du liquide.", bad: "L’électrovanne ouvre ou ferme le passage du liquide." },
        { text: "La bouteille", good: 3, why: "C’est un réservoir de liquide.", bad: "La bouteille est un réservoir : elle stocke le liquide." }
      ] },
    correction: "Filtre : retenir l’humidité. Voyant : montrer le liquide. Électrovanne : ouvrir ou fermer. Bouteille : stocker." }),

  screen({ id: "deux-structures", dossier: "fonctions", title: "Deux structures, une installation", kicker: "Structure · 3", codes: [S31], level: "appliquer",
    text: "Une installation a deux structures. Le circuit frigorifique : les tubes et les organes que le fluide traverse. Le câblage : les fils, les contacts et les appareils électriques. Ce sont deux plans, deux schémas, mais une seule machine.",
    prompt: "Un élément est déjà rangé en exemple. Rangez les cinq autres : « Circuit (tubes) » ou « Câblage (fils) ».",
    blocks: [{ k: "def", html: "<strong>Structure :</strong> de quoi l’installation est faite, et comment les pièces sont reliées. <strong>Fonction :</strong> ce que chaque pièce fait." }],
    act: { type: "sort", labels: ["Circuit (tubes)", "Câblage (fils)"],
      example: { text: "La ligne liquide", good: 0, why: "C’est un tube où passe le fluide : le circuit." },
      rows: [
        { text: "La bobine du contacteur KM1", good: 1, why: "C’est un composant électrique : le câblage.", bad: "La bobine est électrique : le câblage." },
        { text: "Le détendeur", good: 0, why: "Le fluide le traverse : le circuit.", bad: "Le fluide traverse le détendeur : le circuit." },
        { text: "Le contact du thermostat B1", good: 1, why: "C’est un contact électrique : le câblage.", bad: "Un contact est électrique : le câblage." },
        { text: "La conduite d’aspiration", good: 0, why: "C’est un tube : le circuit.", bad: "La conduite d’aspiration est un tube : le circuit." },
        { text: "Les bornes du moteur du compresseur", good: 1, why: "Ce sont des bornes électriques : le câblage.", bad: "Des bornes sont électriques : le câblage." }
      ] },
    correction: "Circuit : ligne liquide, détendeur, conduite d’aspiration. Câblage : bobine de KM1, contact de B1, bornes du moteur." }),

  /* ============ CAPTEURS ET ACTIONNEURS ============ */
  screen({ id: "capteur-ou-actionneur", dossier: "capteurs", title: "Capteur ou actionneur ?", kicker: "Capteurs · 1", codes: [S31], level: "appliquer",
    text: "Un capteur mesure et renseigne : une température, une pression. Un actionneur agit : il ouvre une vanne, il fait tourner un moteur. Les capteurs disent ce qui se passe ; les actionneurs font ce qui est décidé.",
    prompt: "Un élément est déjà rangé en exemple. Rangez les six autres : « Capteur » ou « Actionneur ».",
    blocks: [{ k: "def", html: "<strong>Convention de ce cours :</strong> le contacteur commande la puissance du moteur ; on le range avec les actionneurs." }],
    act: { type: "sort", labels: ["Capteur : il mesure", "Actionneur : il agit"],
      example: { text: "La sonde de température de la chambre", good: 0, why: "Elle mesure la température de l’air : c’est un capteur." },
      rows: [
        { text: "Le pressostat BP", good: 0, why: "Il mesure la basse pression : capteur.", bad: "Il mesure la pression : capteur." },
        { text: "L’électrovanne Y1", good: 1, why: "Elle ouvre ou ferme le liquide : actionneur.", bad: "Elle agit sur le liquide : actionneur." },
        { text: "Le pressostat HP", good: 0, why: "Il mesure la haute pression : capteur.", bad: "Il mesure la pression : capteur." },
        { text: "Le moteur du compresseur M1", good: 1, why: "Il fait tourner le compresseur : actionneur.", bad: "Il fait tourner le compresseur : actionneur." },
        { text: "Le thermostat B1", good: 0, why: "Il mesure la température de la chambre : capteur.", bad: "Il mesure la température : capteur." },
        { text: "Le contacteur KM1", good: 1, why: "Il commande la puissance du moteur : on le range avec les actionneurs.", bad: "Il commande la puissance du moteur : on le range avec les actionneurs." }
      ] },
    correction: "Capteurs : sonde, pressostats BP et HP, thermostat B1. Actionneurs : Y1, M1, KM1." }),

  screen({ id: "lire-le-dossier", dossier: "capteurs", title: "Lire un dossier d’analyse fonctionnelle", kicker: "Capteurs · 2", codes: [S31], level: "comprendre",
    text: "Le dossier d’une machine donne, pour chaque repère, ce que c’est et ce qu’il fait. On lit toujours dans le même ordre : les capteurs et les actionneurs, puis la régulation, puis la sécurité. Ici, une chambre froide à pump-down automatique.",
    prompt: "Exemple résolu : lisez les six repères, puis la régulation et la sécurité.",
    blocks: [
      { k: "def", html: "<strong>Pump-down :</strong> à l’arrêt, le compresseur vide d’abord l’évaporateur de son fluide, puis il s’arrête. <strong>Repère :</strong> lettres et chiffre qui nomment une pièce sur les schémas." },
      { k: "cartes", cls: "trois", cards: [
        { img: PH.sonde.src, alt: "Sonde de température de la chambre", title: "B1 · Thermostat de chambre", rows: [["Il mesure :", "la température de l’air."], ["Il agit sur :", "Y1, par son contact."]] },
        { cls: "bp", img: PH.pressostatBP.src, alt: "Pressostat basse pression : boîtier bleu", title: "BP · Pressostat basse pression", rows: [["Il mesure :", "la pression d’aspiration."], ["Il agit sur :", "KM1 : il l’arrête au seuil bas."]] },
        { cls: "hp", img: PH.pressostatHP.src, alt: "Pressostat haute pression : boîtier gris", title: "HP · Pressostat haute pression", rows: [["Il mesure :", "la pression de refoulement, qui monte si le condenseur est bouché."], ["Il agit sur :", "KM1 : il l’arrête si elle est trop haute."]] },
        { img: PH.electrovanne.src, alt: "Électrovanne", title: "Y1 · Électrovanne", rows: [["Elle agit sur :", "le liquide : elle l’ouvre ou le ferme."], ["Elle obéit à :", "B1."]] },
        { img: PH.contacteur.src, alt: "Contacteur tripolaire", title: "KM1 · Contacteur", rows: [["Il agit sur :", "l’alimentation du moteur."], ["Il obéit à :", "BP et HP."]] },
        { img: PH.compresseur.src, alt: "Compresseur : le moteur est dans le carter", title: "M1 · Moteur du compresseur", rows: [["Il agit sur :", "le compresseur : il le fait tourner."], ["Il obéit à :", "KM1."]] } ] },
      { k: "lecture", items: [
        "<strong>Régulation :</strong> le thermostat B1 commande l’électrovanne Y1 ; la pression BP commande le contacteur KM1.",
        "<strong>Sécurité :</strong> le pressostat HP coupe KM1 si la pression de refoulement est trop haute, par exemple quand le condenseur est bouché : il évacue mal la chaleur et la pression monte.",
        "<strong>Un repère se lit avec sa fonction :</strong> « B1, le thermostat qui commande Y1 »." ] },
      { k: "renvoi", html: "Cette installation est celle du cours <a href=\"../pump-down-automatique/index.html\">Le pump-down automatique</a> (Les régules)." }
    ] }),

  screen({ id: "qui-fait-quoi-dossier", dossier: "capteurs", title: "À vous : B1, BP ou HP ?", kicker: "Capteurs · 3", codes: [S31], level: "appliquer",
    text: "Même lecture, autres phrases. Relisez le dossier de l’écran précédent : pour chaque phrase, trouvez le repère qui fait cette action.",
    prompt: "Une phrase est déjà rangée en exemple. Rangez les cinq autres : cliquez le repère.",
    act: { type: "sort", labels: ["B1 (thermostat)", "BP (basse pression)", "HP (haute pression)"],
      example: { text: "Il mesure la température de l’air de la chambre", good: 0, why: "C’est le rôle du thermostat B1, dans le dossier." },
      rows: [
        { text: "Il commande l’ouverture et la fermeture de Y1", good: 0, why: "B1 commande l’électrovanne Y1, par son contact.", bad: "C’est B1 qui commande Y1 : « B1, le thermostat qui commande Y1 »." },
        { text: "Il arrête KM1 quand la pression d’aspiration est assez basse", good: 1, why: "C’est la basse pression, BP, qui commande KM1.", bad: "C’est la pression d’aspiration qui arrête KM1 : la basse pression, BP." },
        { text: "Il coupe KM1 si la pression de refoulement est trop haute", good: 2, why: "C’est la sécurité haute pression, HP.", bad: "La pression de refoulement est la haute pression : HP." },
        { text: "Il se ferme quand la chambre est trop chaude", good: 0, why: "Son contact se ferme quand la température monte : B1.", bad: "Il réagit à la température de la chambre : B1." },
        { text: "Il protège le compresseur si le condenseur est bouché", good: 2, why: "Un condenseur bouché fait monter la haute pression : HP coupe.", bad: "Un condenseur bouché fait monter la haute pression : HP." }
      ] },
    correction: "B1 : mesure la chambre, commande Y1. BP : arrête KM1 à la pression basse. HP : coupe KM1 sur haute pression." }),

  /* ============ LE FONCTIONNEMENT ============ */
  screen({ id: "sequence-pump-down", dossier: "fonctionnement", title: "La chambre atteint sa consigne : qui agit ?", kicker: "Fonctionnement · 1", codes: [S61, S31], level: "appliquer",
    text: "Étudier le fonctionnement, c’est suivre une séquence : qui agit, puis qui réagit. À la consigne, c’est B1 qui agit en premier. Le compresseur ne s’arrête pas tout de suite : il vide d’abord l’évaporateur.",
    prompt: "L’étape 1 est déjà faite en exemple. Cliquez les quatre autres dans l’ordre : d’abord la première, puis la suivante.",
    act: { type: "order",
      items: ["B1 ouvre son contact : Y1 se ferme.", "Le compresseur continue d’aspirer : la basse pression baisse.", "La basse pression atteint le seuil réglé : le pressostat BP ouvre.", "KM1 retombe : le compresseur s’arrête."], shown: [2, 0, 3, 1],
      hints: ["B1 agit en premier : il ouvre son contact, et l’électrovanne Y1 se ferme.", "Y1 est fermée, mais le compresseur tourne encore : il aspire le fluide qui reste dans l’évaporateur.", "En aspirant, il fait baisser la pression : au seuil réglé, le pressostat BP ouvre.", "BP ouvert : la bobine de KM1 n’est plus alimentée, KM1 retombe et le compresseur s’arrête."],
      example: { text: "Étape 1 : la chambre atteint sa consigne", answer: "B1 le mesure", why: "Le thermostat B1 lit la température de l’air de la chambre." } },
    blocks: [{ k: "renvoi", html: "La séquence en détail, avec le schéma : <a href=\"../pump-down-automatique/index.html\">Le pump-down automatique</a>." }],
    correction: "B1 ouvre et Y1 se ferme, le compresseur aspire, BP ouvre, KM1 retombe." }),

  screen({ id: "securite-hp", dossier: "fonctionnement", title: "Le condenseur est bouché : qui coupe ?", kicker: "Fonctionnement · 2", codes: [S61], level: "appliquer",
    text: "En marche normale, B1 et BP décident. Mais si la haute pression monte trop, une sécurité prend le relais : le pressostat HP. Il est monté sur la commande de KM1 : quand il ouvre, KM1 retombe et le compresseur s’arrête.",
    prompt: "Le condenseur est bouché : la pression de refoulement monte trop. Cliquez qui coupe le compresseur.",
    act: { type: "quiz", choices: ["Le pressostat HP : il ouvre et coupe la bobine de KM1.", "Le thermostat B1.", "L’électrovanne Y1.", "Le pressostat BP."], good: 0,
      explain: "HP est la sécurité haute pression : monté sur la commande de KM1, il ouvre quand la pression est trop haute, et KM1 retombe. B1 mesure la température de la chambre, BP la pression d’aspiration : aucun des deux ne mesure la haute pression." },
    correction: "Le pressostat HP ouvre et coupe KM1." }),

  /* ============ BILAN ============ */
  screen({ id: "cas-seul", dossier: "bilan", title: "Un cas complet, seul", kicker: "Bilan · 1 · à vous, sans guide", codes: [S31, S61], level: "evaluer",
    text: "Cas complet, à faire seul : une petite chambre froide à commande directe. Elle n’a pas d’électrovanne et pas de pump-down.",
    prompt: "Seul : écrivez « qui fait quoi » pour chaque repère, puis ce qui se passe quand la chambre atteint sa consigne, et quand la haute pression monte. Puis comparez avec la réponse type.",
    blocks: [{ k: "cas-boite", html: "<strong>Le cas.</strong> Le dossier donne : B1, thermostat de chambre ; HP et BP, pressostats de sécurité ; KM1, contacteur ; M1, moteur du compresseur. Les contacts de B1, de HP et de BP sont montés en série sur la bobine de KM1." }],
    act: { type: "libre", label: "Votre analyse, en quelques lignes :", placeholder: "Qui fait quoi (repère et rôle), la séquence à la consigne, la sécurité…",
      answer: "<strong>Réponse type.</strong><ol><li><b>B1 :</b> capteur, il mesure la température de la chambre et ouvre son contact à la consigne.</li><li><b>HP et BP :</b> capteurs de sécurité, ils ouvrent leur contact si la pression est trop haute ou trop basse.</li><li><b>KM1 :</b> actionneur, il alimente le moteur du compresseur tant que la bobine est alimentée.</li><li><b>M1 :</b> actionneur, il fait tourner le compresseur.</li><li><b>À la consigne :</b> B1 ouvre, la bobine de KM1 n’est plus alimentée, KM1 retombe : le compresseur s’arrête tout de suite (pas de pump-down).</li><li><b>Haute pression trop haute :</b> HP ouvre, KM1 retombe, le compresseur s’arrête.</li></ol>" },
    correction: "Voir la réponse type : repères et rôles, séquence à la consigne, sécurité haute pression." }),

  screen({ id: "bilan", dossier: "bilan", title: "À retenir, puis pratiquer", kicker: "Bilan · 2", codes: [S31, S61], level: "evaluer",
    text: "Le besoin, puis la fonction, puis l’organe. Deux structures : le circuit et le câblage. Capteurs qui mesurent, actionneurs qui agissent. Un dossier se lit : repères, régulation, sécurité. Une séquence se suit : qui agit, puis qui réagit.",
    prompt: "Pour continuer : ouvrez une des suites.",
    blocks: [{ k: "liens", links: [
      { href: "../chaine-energie-information-interactif/index.html", title: "La chaîne d’énergie et d’information", note: "La suite : deux chaînes dans la même installation" },
      { href: "../pump-down-automatique/index.html", title: "Le pump-down automatique", note: "L’installation de ce cours, avec son schéma et son film" },
      { href: "../commande-directe-thermostat/index.html", title: "La commande directe", note: "Le thermostat commande le compresseur" },
      { href: "../protection-minimum-serie/index.html", title: "La protection minimum", note: "HP, BP et B1 en série" },
      { href: "../circuit-organe-par-organe/index.html", title: "Le circuit, organe par organe", note: "Les organes du circuit, un à un" } ] }] })
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
