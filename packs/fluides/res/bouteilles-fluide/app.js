"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const dossiers = [
  { id:"reconnaitre", label:"Reconnaître", note:"quelle bouteille pour quel travail" },
  { id:"robinets", label:"Les robinets", note:"deux phases, le tube plongeur" },
  { id:"plaque", label:"La plaque", note:"TW, WC, PS, la pesée" },
  { id:"charge", label:"Charge maxi", note:"jamais à ras" },
  { id:"inflammables", label:"Inflammables", note:"A2L, A3 : le raccord" },
  { id:"bilan", label:"Ranger, pratiquer", note:"rangement, suites" },
];

/* Les dessins sans texte de la bibliothèque vont dans la vignette de l'écran ; les schémas
   légendés (illustrations/*.svg) sont posés en grand dans l'activité, pour rester lisibles. */
const screenIllustrations = {
  "pesee": ["../bibliotheque/illu-g5b.webp", "Bouteille posée sur une balance, à côté d’un carnet."],
  "flotteur-soupape": ["../bibliotheque/illu-g5a.webp", "Bouteille de récupération à deux robinets ; une flèche montre la prise du milieu."],
  "ranger": ["../bibliotheque/illu-p4.webp", "Bouteille d’azote debout, attachée au mur par une sangle, avec son mano-détendeur."],
};

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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("bouteilles-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
function saveRate(){try{localStorage.setItem("bouteilles-voice-rate",String(voiceRates[rateIndex]))}catch(_){}}
function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function stripHtml(value){const box=document.createElement("div");box.innerHTML=value;return box.textContent||""}
function screen(data){const visual=screenIllustrations[data.id]||["",""];return{level:"comprendre",codes:[],prompt:"",speak:"",requiresAction:false,image:visual[0],imageAlt:visual[1]||"Illustration pédagogique de l’étape.",...data}}
function completeCurrent(message="Action réalisée. Vous pouvez continuer."){completed.add(activeScreens[current].id);updateNav();setStatus(message)}
function setStatus(message){clearTimeout(statusTimer);$("#status-message").textContent=message;statusTimer=setTimeout(()=>{$("#status-message").textContent=""},2600)}

function choiceMarkup(choices){return `<div class="panel"><div class="cards" style="--cols:${Math.min(choices.length,3)}">${choices.map((choice,index)=>`<button class="choice" type="button" data-choice="${index}"><strong>${esc(choice.title)}</strong><small>${esc(choice.note||"")}</small></button>`).join("")}</div><div class="feedback" id="feedback">Choisissez, puis lisez la conséquence.</div></div>`}
function wireChoice(good,messages){$$('[data-choice]').forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.choice);$$('[data-choice]').forEach(item=>item.classList.remove("good","bad"));button.classList.add(index===good?"good":"bad");const feedback=$("#feedback");feedback.className=`feedback ${index===good?"good":"bad"}`;feedback.innerHTML=`<strong>${index===good?"Correct.":"À corriger."}</strong> ${esc(messages[index])}`;if(index===good)completeCurrent("Décision correcte. Vous pouvez continuer.")}))}
function checklistMarkup(items){return `<div class="panel"><div class="cards" style="--cols:${Math.min(items.length,3)}">${items.map((item,index)=>`<button class="check-card" type="button" data-check="${index}" aria-pressed="false"><strong>${esc(item.title)}</strong><small>${esc(item.note)}</small></button>`).join("")}</div><div class="feedback" id="feedback">Ouvrez chaque point.</div></div>`}
function wireChecklist(items){$$('[data-check]').forEach(button=>button.addEventListener("click",()=>{button.classList.add("good");button.setAttribute("aria-pressed","true");const item=items[Number(button.dataset.check)];const feedback=$("#feedback");feedback.className="feedback good";feedback.innerHTML=`<strong>${esc(item.title)}.</strong> ${esc(item.detail)}`;if($$('[data-check][aria-pressed="false"]').length===0)completeCurrent("Tous les points ont été examinés.")}))}
function sequenceMarkup(items){return `<div class="panel"><div class="sequence">${items.map((item,index)=>`<button class="sequence-step" type="button" data-sequence="${index}">${index+1}<br>${esc(item)}</button>${index<items.length-1?'<span class="sequence-arrow">→</span>':''}`).join("")}</div><div class="feedback" id="feedback">Cliquez dans l’ordre.</div></div>`}
function wireSequence(items){let next=0;$$('[data-sequence]').forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.sequence);const feedback=$("#feedback");if(index!==next){feedback.className="feedback bad";feedback.textContent="À corriger : revenez au premier geste non validé.";return}button.classList.add("done");next+=1;feedback.className="feedback good";feedback.textContent=next===items.length?"Ordre complet.":"Étape validée. Continuez.";if(next===items.length)completeCurrent("Ordre complet. Vous pouvez continuer.")}))}
function quizMarkup(item){const saved=quizAnswers[item.id];return `<div class="panel"><div class="cards" style="--cols:2">${item.quiz.choices.map((choice,index)=>`<button class="choice ${saved===index?(index===item.quiz.good?"good":"bad"):""}" type="button" data-quiz="${index}" ${saved!==undefined?"disabled":""}><strong>${String.fromCharCode(65+index)}.</strong><small>${esc(choice)}</small></button>`).join("")}</div><div class="feedback ${saved===undefined?"":saved===item.quiz.good?"good":"bad"}" id="feedback">${saved===undefined?"Choisissez une réponse.":`<strong>${saved===item.quiz.good?"Correct.":"À revoir."}</strong> ${esc(item.quiz.explain)}`}</div></div>`}
function wireQuiz(item){$$('[data-quiz]').forEach(button=>button.addEventListener("click",()=>{if(quizAnswers[item.id]!==undefined)return;quizAnswers[item.id]=Number(button.dataset.quiz);completed.add(item.id);renderCurrent(false)}))}

/* ---- Les activités propres à ce cours (les cinq premières viennent du moteur commun du réseau) ---- */
function exempleMarkup(e){return `<div class="exemple"><span class="tag">Exemple résolu</span><p><strong>${esc(e.text)}</strong> → <b>${esc(e.answer)}</b></p><small>${esc(e.why)}</small></div>`}
function sortMarkup(rows,labels,example){return `<div class="panel sort">${example?exempleMarkup({text:example.text,answer:labels[example.good],why:example.why}):""}<div class="sort-rows">${rows.map((row,index)=>`<div class="sort-row" data-row="${index}"><span class="sort-text">${esc(row.text)}</span><span class="sort-buttons">${labels.map((label,option)=>`<button type="button" class="sort-btn" data-row="${index}" data-opt="${option}">${esc(label)}</button>`).join("")}</span></div>`).join("")}</div><div class="feedback" id="feedback">Choisissez une réponse pour chaque ligne.</div></div>`}
function wireSort(rows){let done=0;$$(".sort-btn").forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.row),option=Number(button.dataset.opt),row=$(`.sort-row[data-row="${index}"]`);if(row.classList.contains("done"))return;const feedback=$("#feedback");if(option===rows[index].good){row.classList.add("done");row.querySelectorAll(".sort-btn").forEach(item=>{item.disabled=true});button.classList.add("good");done+=1;feedback.className="feedback good";feedback.innerHTML=`<strong>Correct.</strong> ${esc(rows[index].why)}`;if(done===rows.length)completeCurrent("Tout est rangé. Vous pouvez continuer.")}else{button.classList.add("bad");button.disabled=true;feedback.className="feedback bad";feedback.innerHTML=`<strong>À corriger.</strong> ${esc(rows[index].bad)}`}}))}
function orderMarkup(items,shown){return `<div class="panel"><div class="order-list">${shown.map(index=>`<button type="button" class="order-item" data-order="${index}"><b class="order-n" aria-hidden="true"></b><span>${esc(items[index])}</span></button>`).join("")}</div><div class="feedback" id="feedback">Cliquez d’abord sur la première action.</div></div>`}
function wireOrder(items,hints){let next=0;$$("[data-order]").forEach(button=>button.addEventListener("click",()=>{if(button.classList.contains("done"))return;const index=Number(button.dataset.order),feedback=$("#feedback");if(index!==next){button.classList.add("bad");setTimeout(()=>button.classList.remove("bad"),700);feedback.className="feedback bad";feedback.innerHTML=`<strong>Pas encore.</strong> ${esc(hints[next])}`;return}button.classList.add("done");button.querySelector(".order-n").textContent=String(next+1);next+=1;feedback.className="feedback good";feedback.textContent=next===items.length?"Ordre complet.":"Bien. Et ensuite ?";if(next===items.length)completeCurrent("Ordre complet. Vous pouvez continuer.")}))}
function cardsMarkup(cards,cls=""){return `<div class="cartes ${cls}">${cards.map(card=>`<article class="carte"><h3>${esc(card.title)}</h3>${card.rows.map(row=>`<p><strong>${esc(row[0])}</strong> ${esc(row[1])}</p>`).join("")}</article>`).join("")}</div>`}
function libreMarkup(){return `<div class="panel libre"><label for="reponse-libre" class="libre-label">Votre plan, en quelques lignes :</label><textarea id="reponse-libre" rows="4" placeholder="Méthodes, ordre des gestes, ce que je ne fais pas…"></textarea><button type="button" class="primary-button" id="voir-reponse" disabled>Voir la réponse type</button><div class="feedback" id="feedback">Écrivez d’abord. Le bouton s’ouvre après quelques mots.</div></div>`}
function wireLibre(answerHtml){const area=$("#reponse-libre"),button=$("#voir-reponse");area.addEventListener("input",()=>{button.disabled=area.value.trim().length<40});button.addEventListener("click",()=>{const feedback=$("#feedback");feedback.className="feedback good";feedback.innerHTML=answerHtml;completeCurrent("Comparez avec votre texte, puis continuez.")})}
function liensMarkup(links){return `<div class="liens">${links.map(link=>`<a class="lien-carte" href="${esc(link.href)}"><strong>${esc(link.title)}</strong><small>${esc(link.note)}</small></a>`).join("")}</div>`}
function constatMarkup(rows){return `<table class="constat"><caption>Constat de vérification d’un détecteur (exemple)</caption><tbody>${rows.map(row=>`<tr><th scope="row">${esc(row[0])}</th><td>${esc(row[1])}</td></tr>`).join("")}</tbody></table>`}

/* ---- Les données des écrans (28/10/2026) ----
   Contenu validé par F. Henninot le 28/10 (« tout y est »), remis dans le gabarit
   des cours du Plan. Aucun taux de remplissage réglementaire : les valeurs 0,80 et
   0,90 kg/L sont des valeurs d'exercice, annoncées comme telles. */
const ILL = "../illustrations/";
function schema(src,alt,legende=""){return `<figure class="schema"><img src="${esc(src)}" alt="${esc(alt)}">${legende?`<figcaption>${esc(legende)}</figcaption>`:""}</figure>`}
function alerte(html){return `<p class="alerte">${html}</p>`}
function renvoi(html){return `<p class="renvoi">${html}</p>`}

const CODES_CAP = "CAP C4.2";

const tubeExemple = { text: "Bouteille debout, robinet relié au tube plongeur", good: 0, why: "Le tube va chercher le fluide au fond, dans le liquide." };
const tubeLignes = [
  { text: "Bouteille debout, robinet sans tube plongeur", good: 1, why: "Sans tube, le robinet prend le fluide en haut, dans la vapeur.", bad: "Sans tube, le robinet prend le fluide là où il débouche : en haut, dans la vapeur." },
  { text: "Bouteille retournée tête en bas, robinet sans tube plongeur", good: 0, why: "Tête en bas, le robinet se trouve dans le liquide : c'est ainsi qu'on sort du liquide d'une bouteille sans tube, comme l'indique son étiquette.", bad: "Tête en bas, le liquide descend vers le robinet : c'est du liquide qui sort." },
  { text: "Bouteille debout, robinet vapeur d'une bouteille à deux robinets", good: 1, why: "Le robinet vapeur prend le fluide en haut de la bouteille.", bad: "Le robinet vapeur prend le fluide en haut de la bouteille, dans la vapeur." },
];

const rangement = [
  { title: "Debout, attachée", note: "pour qu'elle ne tombe pas", detail: "Attachée à un support fixe, avec une sangle ou une chaîne." },
  { title: "Robinets fermés", note: "chapeau de protection en place", detail: "Pour la déplacer : robinets fermés, chapeau de protection vissé." },
  { title: "Jamais au soleil", note: "ni près d'une source de chaleur", detail: "Jamais dans un véhicule fermé en plein soleil : la pression monte avec la température." },
  { title: "Jamais chauffée", note: "ni flamme, ni eau chaude, ni radiateur", detail: "Chauffer une bouteille fait grimper sa pression : on ne le fait jamais." },
  { title: "Local aéré", note: "loin de ce qui peut enflammer", detail: "Un fluide inflammable qui fuit doit se disperser, loin de toute flamme ou étincelle." },
];

/* ---- Les écrans ---- */
const screens = [
  screen({id:"metier",dossier:"reconnaitre",title:"Les bouteilles du métier",kicker:"Reconnaître · 1",codes:[CODES_CAP,"5.02"],level:"comprendre",
    text:"Chaque bouteille a son usage. Avant de brancher un flexible, vous savez laquelle vous tenez : fluide neuf, récupération, azote ou R-744.",
    prompt:"Lisez les quatre cartes. L’écran suivant vous fait choisir.",
    render:()=>cardsMarkup([
      {title:"Fluide neuf",rows:[["Contient :","un seul fluide, propre, nommé sur l’étiquette."],["Vous en faites :","vous chargez l’installation. Vide, elle repart chez le fournisseur pour être remplie à nouveau."]]},
      {title:"Récupération",rows:[["Contient :","le fluide retiré d’une installation. Il peut contenir de l’huile, de l’humidité ou de l’air."],["Vous en faites :","vous y transférez le fluide d’une machine. Un seul fluide par bouteille, toujours."]]},
      {title:"Azote",rows:[["Contient :","de l’azote sec : ce n’est pas un fluide frigorigène. Sa pression est bien plus forte que celle d’un circuit."],["Vous en faites :","vous contrôlez l’étanchéité et vous brasez sous azote, toujours avec un mano-détendeur (l’appareil qui abaisse la pression de la bouteille à la valeur voulue)."]]},
      {title:"R-744 (CO₂)",rows:[["Contient :","un fluide dont la pression est beaucoup plus forte que celle des autres fluides."],["Vous en faites :","vous chargez ou récupérez du R-744 avec une bouteille, des flexibles et des manomètres prévus pour cette pression."]]},
    ],"deux")+schema(ILL+"la-recuperation_une-bouteille-un-fluide.svg","Deux fluides A et B, chacun dans sa bouteille : le bon geste. Les deux mélangés dans une seule bouteille : la faute, plus rien n’est identifiable.","Une bouteille de récupération ne reçoit qu’un seul fluide. Un doute sur son contenu : prenez une autre bouteille.")
      +renvoi('Les bouteilles de fluide inflammable ont leur dossier (5). La bouteille d’azote a sa station : <a href="../capsules/?c=p4">la bouteille d’azote et son mano-détendeur</a>.')}),

  screen({id:"choisir",dossier:"reconnaitre",title:"Quelle bouteille pour vider une installation ?",kicker:"Reconnaître · 2",codes:[CODES_CAP,"5.02"],level:"appliquer",requiresAction:true,
    text:"Vous devez vider une installation au R-404A avant une réparation. Le fluide retiré doit aller dans une bouteille qui ne reçoit que lui.",
    prompt:"Cliquez la bouteille que vous prenez.",
    render:()=>choiceMarkup([{title:"Une bouteille de récupération neuve, ou déjà réservée au R-404A",note:"Elle reçoit le fluide retiré"},{title:"La bouteille de R-404A neuf, presque vide",note:"Elle sert à charger"},{title:"Une bouteille de récupération qui a contenu du R-134a",note:"Elle est à moitié vide"}]),
    wire:()=>wireChoice(0,["Juste : une bouteille de récupération ne reçoit qu’un seul fluide.","Une bouteille de fluide neuf sert à charger. Le fluide retiré d’une machine peut contenir de l’huile ou de l’humidité : il va en récupération.","Elle a contenu du R-134a : vous feriez un mélange. Une bouteille, un fluide."]),
    correction:"Une bouteille de récupération neuve, ou déjà réservée au R-404A. Jamais une bouteille qui a contenu un autre fluide."}),

  screen({id:"jetable",dossier:"reconnaitre",title:"La bouteille jetable est interdite",kicker:"Reconnaître · 3",codes:[CODES_CAP,"CAP S0.2","Bac S2.4.2"],level:"comprendre",requiresAction:true,
    text:"Une bouteille jetable ne se recharge pas. Quand on la croit vide, il reste toujours du fluide dedans, et ce fluide finit dans l’air.",
    prompt:"Lisez la règle, puis cliquez la raison de l’interdiction.",
    quiz:{choices:["Il reste du fluide dedans, et il part dans l’air quand on la jette.","Elle est trop lourde à transporter.","Elle ne porte pas de plaque.","Elle coûte plus cher qu’une bouteille consignée."],good:0,explain:"C’est la raison donnée par le règlement F-Gaz. Interdite à la vente depuis le 4 juillet 2007, son utilisation est interdite aussi."},
    render(){return '<div class="law-note"><strong>LA RÈGLE ET SA SOURCE</strong><p>Les bouteilles non rechargeables de fluides fluorés (les HFC : R-134a, R-32, R-410A, R-404A…) sont interdites à la vente depuis le 4 juillet 2007. Leur utilisation est interdite elle aussi.</p><p>Une bouteille rechargeable compte comme jetable quand rien n’est prévu pour la rendre et la faire remplir à nouveau. C’est pour cela que vos bouteilles de fluide neuf sont consignées : vous les rendez au fournisseur, qui les remplit à nouveau.</p><p>Règlement européen sur les gaz fluorés, dit F-Gaz : règlement (UE) 2024/573, annexe IV, point 1, et article 11, paragraphe 3. L’interdiction date de 2007 ; le règlement de 2024 la reprend.</p></div>'+quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"deux-robinets",dossier:"robinets",title:"Deux robinets, deux phases",kicker:"Les robinets · 1",codes:[CODES_CAP,"5.02","5.05"],level:"comprendre",
    text:"Le robinet vapeur prend le fluide dans le haut de la bouteille. Le robinet liquide est relié au tube plongeur, qui descend jusqu’au fond, dans le liquide.",
    prompt:"Regardez la coupe, puis lisez comment reconnaître les robinets.",
    render:()=>schema(ILL+"bouteille-deux-robinets.svg","Coupe d’une bouteille debout : le robinet vapeur prélève en haut, le robinet liquide est relié au tube plongeur qui descend jusqu’au fond. Une seule pression, celle d’équilibre du fluide.")
      +'<p class="definition"><strong>Reconnaître les robinets :</strong> lisez le mot ou la lettre marqué sur le robinet ou à côté, par exemple LIQUIDE ou L, GAZ ou G. La couleur du volant n’est qu’un repère visuel.</p>'}),

  screen({id:"meme-pression",dossier:"robinets",title:"Deux robinets, deux pressions ?",kicker:"Les robinets · 2",codes:[CODES_CAP,"5.05"],level:"comprendre",requiresAction:true,
    text:"Bouteille au repos, les deux robinets sont à la même pression : celle du fluide dans la bouteille. Ils ne correspondent pas à une basse pression et une haute pression.",
    prompt:"Cliquez la phrase juste.",
    quiz:{choices:["Bouteille au repos, les deux robinets sont à la même pression.","Le robinet liquide est en haute pression, le robinet vapeur en basse pression.","Le robinet liquide est en basse pression, le robinet vapeur en haute pression."],good:0,explain:"Les deux phases du même fluide sont à la même pression : la pression d’équilibre du fluide à sa température."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"tube-plongeur",dossier:"robinets",title:"Le tube plongeur",kicker:"Les robinets · 3",codes:[CODES_CAP,"5.02","5.05"],level:"appliquer",requiresAction:true,
    text:"Le fluide sort de l’endroit où le tube va le chercher. Bouteille debout, le liquide est en bas, la vapeur en haut. L’étiquette dit si la bouteille a un tube plongeur et comment la tenir.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les trois autres : cliquez « Liquide » ou « Vapeur ».",
    render:()=>sortMarkup(tubeLignes,["Liquide","Vapeur"],tubeExemple),wire:()=>wireSort(tubeLignes),
    correction:"Liquide : bouteille debout avec tube plongeur ; bouteille tête en bas sans tube. Vapeur : bouteille debout sans tube ; robinet vapeur."}),

  screen({id:"liquide-vapeur",dossier:"robinets",title:"Charger en liquide, récupérer dans l’ordre",kicker:"Les robinets · 4",codes:[CODES_CAP,"5.02","5.05"],level:"comprendre",
    text:"Un mélange qui glisse (R-407C, R-449A…) se charge en liquide : ses composants ne s’évaporent pas ensemble. En récupération, l’ordre courant est le liquide d’abord, la vapeur ensuite.",
    prompt:"Regardez le geste en deux temps.",
    render:()=>schema(ILL+"la-recuperation_liquide-vapeur.svg","Récupération en deux temps : d’abord la phase liquide par la prise liquide, gros débit ; ensuite la phase vapeur par la prise vapeur, pour le reste.","La station de récupération et sa notice commandent.")
      +renvoi('Pourquoi un mélange glisse : la station <a href="../glissement-temperature/index.html">Le glissement</a>.')}),

  screen({id:"plaque",dossier:"plaque",title:"La plaque : TW, WC, PS",kicker:"La plaque · 1",codes:[CODES_CAP,"5.06"],level:"comprendre",
    text:"Ce qui compte est gravé sur la bouteille. Sa couleur ne prouve jamais le fluide qu’elle contient : vous lisez l’étiquette et la plaque.",
    prompt:"Regardez la plaque, puis lisez les trois cartes.",
    render:()=>schema(ILL+"plaque-bouteille.svg","Plaque d’une bouteille de récupération : TW 6,2 kg, la tare, masse de la bouteille vide ; WC 12 L, la capacité en eau ; PS 45 bar, la pression de service.")
      +cardsMarkup([
        {title:"TW",rows:[["Veut dire :","la tare, masse de la bouteille vide, en kg."],["Sert à :","peser le fluide : masse lue sur la balance − TW."]]},
        {title:"WC",rows:[["Veut dire :","la capacité en eau : le volume intérieur, en litres."],["Sert à :","calculer la charge maximale (dossier 4)."]]},
        {title:"PS",rows:[["Veut dire :","la pression de service maximale, en bar."],["Sert à :","savoir quelle pression la bouteille supporte en service. Les fluides acceptés sont écrits sur son étiquette ou sa notice."]]},
      ])}),

  screen({id:"pesee",dossier:"plaque",title:"Peser le fluide",kicker:"La plaque · 2",codes:[CODES_CAP,"5.06"],level:"appliquer",requiresAction:true,
    text:"La balance donne la masse brute : la bouteille et le fluide ensemble. La masse du fluide est la masse brute moins la tare TW.",
    prompt:"Lisez l’exemple résolu. Une bouteille pèse 15,1 kg sur la balance ; sa plaque indique TW 6,2 kg. Cliquez la masse de fluide.",
    render:()=>exempleMarkup({text:"Balance : 13,4 kg · plaque : TW 6,2 kg",answer:"7,2 kg de fluide",why:"13,4 − 6,2 = 7,2 kg : on retire la bouteille vide."})+choiceMarkup([{title:"8,9 kg"},{title:"21,3 kg"},{title:"15,1 kg"}]),
    wire:()=>wireChoice(0,["Juste : 15,1 − 6,2 = 8,9 kg de fluide.","La tare est la bouteille vide : on la retire, on ne l’ajoute pas.","La balance pèse la bouteille et le fluide ensemble : retirez la tare."]),
    correction:"15,1 − 6,2 = 8,9 kg de fluide."}),

  screen({id:"jamais-a-ras",dossier:"charge",title:"La charge maximale : jamais à ras",kicker:"Charge maxi · 1",codes:[CODES_CAP,"5.02","5.06"],level:"comprendre",
    text:"Quand la température monte, le liquide gonfle. S’il n’a plus de place, la pression grimpe très vite et la bouteille peut éclater. La masse maximale de fluide dépend du fluide.",
    prompt:"Lisez où trouver la valeur, puis l’exemple résolu.",
    render:()=>schema(ILL+"secu-bouteille.svg","Bouteille remplie à ras : le liquide n’a plus de place pour se dilater, la pression grimpe très vite quand la température monte. Bouteille correcte : un volume libre est respecté.")
      +'<ol class="definition"><li>La masse maximale est <strong>écrite sur l’étiquette</strong> ou la notice de la bouteille, pour ce fluide : vous la lisez.</li><li>Ou l’étiquette donne le <strong>taux de remplissage</strong> de ce fluide, en kg par litre : vous calculez <strong>masse maximale = WC × taux</strong>.</li></ol><p class="definition">Si rien n’est écrit, demandez la valeur au fournisseur de la bouteille avant de la remplir. On ne remplit jamais au jugé.</p>'
      +exempleMarkup({text:"WC 12 L · taux 0,80 kg/L (valeur d’exercice) · TW 6,2 kg",answer:"9,6 kg de fluide ; la balance ne dépasse jamais 15,8 kg",why:"12 × 0,80 = 9,6 kg. Sur la balance : 6,2 + 9,6 = 15,8 kg. Sur le terrain, lisez le taux de votre fluide sur l’étiquette de votre bouteille."})
      +alerte("<strong>Erreur courante :</strong> la charge maximale ne se calcule jamais en prenant « 80 % du poids » de la bouteille. Elle dépend de la capacité en eau et du fluide.")}),

  screen({id:"jusqu-ou",dossier:"charge",title:"À vous : jusqu’où remplir ?",kicker:"Charge maxi · 2",codes:[CODES_CAP,"5.02","5.06"],level:"appliquer",requiresAction:true,
    text:"Bouteille de récupération : TW 10,5 kg, WC 20 L. Pour l’exercice, son étiquette donne un taux de remplissage de 0,90 kg/L pour le fluide récupéré.",
    prompt:"Calculez la masse maximale, puis ce que la balance ne doit jamais dépasser. Cliquez la bonne réponse.",
    render:()=>choiceMarkup([{title:"18 kg de fluide",note:"balance : 28,5 kg au plus"},{title:"18 kg de fluide",note:"balance : 18 kg au plus"},{title:"16 kg de fluide",note:"80 % de 20 ; balance : 26,5 kg"}]),
    wire:()=>wireChoice(0,["Juste : 20 × 0,90 = 18 kg de fluide ; 10,5 + 18 = 28,5 kg sur la balance.","18 kg, c’est le fluide seul. La balance pèse aussi la bouteille : ajoutez la tare, 10,5 kg.","80 % n’est pas la règle : on multiplie WC par le taux de l’étiquette, ici 0,90."]),
    correction:"20 × 0,90 = 18 kg de fluide ; 10,5 + 18 = 28,5 kg au plus sur la balance."}),

  screen({id:"flotteur-soupape",dossier:"charge",title:"Le flotteur et la soupape",kicker:"Charge maxi · 3",codes:[CODES_CAP,"5.02"],level:"comprendre",requiresAction:true,
    text:"Beaucoup de bouteilles de récupération ont une troisième prise : un flotteur, relié à la station de récupération, qui arrête la station quand le liquide monte trop haut. La soupape s’ouvre si la pression devient dangereuse.",
    prompt:"Cliquez la phrase juste.",
    quiz:{choices:["Flotteur et soupape sont des aides : la balance reste mon contrôle.","La soupape libère le surplus : je peux remplir un peu plus.","Avec le flotteur branché, je n’ai plus besoin de peser."],good:0,explain:"La soupape est un dernier secours : elle ne vous autorise jamais à remplir davantage. Vous arrêtez le transfert à la masse maximale, balance sous les yeux."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"inflammables",dossier:"inflammables",title:"Les bouteilles de fluide inflammable",kicker:"Inflammables · 1",codes:[CODES_CAP,"Bac S7.2.3"],level:"comprendre",
    text:"Les fluides A2L (R-32, R-1234yf…, peu inflammables) et A3 (R-290, R-600a…, très inflammables) brûlent. Leur bouteille porte une ogive rouge et un raccord spécifique.",
    prompt:"Lisez les trois cartes. L’écran suivant vous met en situation.",
    render:()=>cardsMarkup([
      {title:"L’ogive rouge",rows:[["C’est :","le haut arrondi de la bouteille, peint en rouge."],["Elle dit :","gaz inflammable. Elle vous alerte ; c’est l’étiquette qui nomme le fluide."]]},
      {title:"Le raccord spécifique",rows:[["C’est :","le plus souvent un filetage à gauche : il se visse dans l’autre sens."],["Il sert à :","empêcher d’y brancher un outil qui n’est pas prévu pour ce fluide."]]},
      {title:"Les petites contenances",rows:[["Pourquoi :","vous ne transportez et ne stockez que la quantité de gaz inflammable dont vous avez besoin."]]},
    ])+schema("../../../../legislation/stations/en-378/svg/classes-iso817.svg","Les classes de sécurité des fluides : une lettre pour la toxicité, un chiffre pour l’inflammabilité.")
      +renvoi('Lire une classe : <a href="../cours-classes-securite/index.html">Classes de sécurité</a>. La charge qu’un local accepte : <a href="https://frigorx.github.io/Iner.web-tools-beta/charge_a2l_v5.html">Charge maxi A2L</a>.')}),

  screen({id:"raccord",dossier:"inflammables",title:"Le flexible ne se raccorde pas",kicker:"Inflammables · 2",codes:[CODES_CAP,"Bac S7.2.3"],level:"appliquer",requiresAction:true,
    text:"Le flexible de votre manifold ne se raccorde pas sur une bouteille de R-32. Le raccord de la bouteille est spécifique, à filetage à gauche.",
    prompt:"Cliquez ce que vous faites.",
    quiz:{choices:["Je prends un flexible prévu pour ce fluide.","Je visse un adaptateur pour raccorder mon flexible.","Je force un peu sur le filetage.","Je transvase le R-32 dans une autre bouteille."],good:0,explain:"Le raccord spécifique est une sécurité : on ne le contourne jamais avec un adaptateur. On utilise les flexibles et l’outillage prévus pour ce fluide."},
    render(){return alerte("<strong>Ce raccord est une sécurité.</strong> On ne le contourne jamais avec un adaptateur.")+quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"ranger",dossier:"bilan",title:"Ranger et transporter",kicker:"Bilan · 1",codes:[CODES_CAP,"Bac S7.2.3"],level:"comprendre",requiresAction:true,
    text:"Une bouteille mal rangée tombe, chauffe ou fuit. Cinq règles valent au dépôt comme dans le véhicule.",
    prompt:"Ouvrez chacun des cinq points.",
    render:()=>checklistMarkup(rangement),wire:()=>wireChecklist(rangement),
    correction:"Debout et attachée ; robinets fermés, chapeau en place ; jamais au soleil ; jamais chauffée ; local aéré, loin de ce qui peut enflammer."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis pratiquer",kicker:"Bilan · 2",codes:[CODES_CAP,"5.02","5.05","5.06"],level:"evaluer",
    text:"Une bouteille, un usage, un fluide. Deux robinets, deux phases, une pression. On lit la plaque avant de calculer. On remplit jusqu’à la masse maximale lue ou calculée, jamais à ras. Inflammable : ogive rouge, raccord spécifique, jamais d’adaptateur.",
    prompt:"Pour pratiquer : ouvrez une des trois suites.",
    render:()=>liensMarkup([{href:"../mission-bouteilles/index.html",title:"Mission bouteilles",note:"Choisir, prélever, peser, décider"},{href:"../capsules/?c=x3",title:"Détective, la bouteille de récupération",note:"Laquelle prendre sur l’étagère"},{href:"../recuperation-fluide-interactive/index.html",title:"TP récupération",note:"La station, la pesée, le tirage au vide"}])}),
];

function renderHome(){$("#dossier-grid").innerHTML=dossiers.map((dossier,index)=>`<button class="dossier-button" type="button" data-dossier="${dossier.id}"><b>${index+1}</b><span>${esc(dossier.label)}<small>${esc(dossier.note)}</small></span></button>`).join("");$$('[data-dossier]').forEach(button=>button.addEventListener("click",()=>startCourse(button.dataset.dossier)))}
function showHome(){stopSpeech();document.body.classList.remove("course-running");$("#home").hidden=false;$("#course-shell").hidden=true;$("#home-button").hidden=true;$("#exit-button").hidden=true;$("#mode-badge").textContent="En cours de relecture";history.replaceState(null,"",location.pathname);scrollTo(0,0)}
function startCourse(dossierId="reconnaitre",screenNumber=1){extractMode=false;activeScreens=[...screens];const first=Math.max(0,activeScreens.findIndex(item=>item.dossier===dossierId));current=Math.min(activeScreens.length-1,first+Math.max(0,screenNumber-1));furthest=Math.max(furthest,current);openCourse();renderCurrent(false)}
function startExtract(ids){const picked=ids.map(id=>screens.find(item=>item.id===id)).filter(Boolean);if(!picked.length){showHome();setStatus("Extrait introuvable.");return}extractMode=true;activeScreens=picked;current=0;furthest=0;openCourse();renderCurrent(false)}
function openCourse(){document.body.classList.add("course-running");$("#home").hidden=true;$("#course-shell").hidden=false;$("#home-button").hidden=false;$("#exit-button").hidden=false;$("#mode-badge").textContent=extractMode?"Extrait · en cours de relecture":"En cours de relecture";$("#rail-mode").textContent=extractMode?"EXTRAIT":"COURS";scrollTo(0,0)}
function renderStepper(item){const groups=extractMode?[{id:"extrait",label:"Extrait"}]:dossiers;$("#stepper").innerHTML=groups.map((group,index)=>{const indices=activeScreens.map((screenItem,screenIndex)=>({screenItem,screenIndex})).filter(entry=>extractMode||entry.screenItem.dossier===group.id).map(entry=>entry.screenIndex);const first=indices[0]??0;const active=extractMode||item.dossier===group.id;const done=indices.length&&Math.max(...indices)<furthest;return `<button class="step-button ${active?"active":""} ${done?"done":""}" type="button" data-step="${first}" ${active?'aria-current="step"':""}><b>${index+1}</b><span>${esc(group.label)}</span></button>`}).join("");$$('[data-step]').forEach(button=>button.addEventListener("click",()=>goTo(Number(button.dataset.step))));const total=activeScreens.length;$("#rail-progress").textContent=`${current+1} / ${total}`;$("#progress-bar").style.width=`${(current+1)/total*100}%`;$("#progress-copy").textContent=current===total-1?"Fin du parcours":`${total-current-1} écran${total-current-1>1?"s":""} à voir`}
function renderCurrent(moveFocus=true){stopSpeech(false);clearTimeout(statusTimer);$("#status-message").textContent="";const item=activeScreens[current];if(!item)return;$("#lesson-kicker").textContent=item.kicker;$("#lesson-title").textContent=item.title;$("#lesson-text").textContent=item.text;$("#action-prompt").textContent=item.prompt||"Lisez, puis continuez.";const activity=item.render?item.render():`<div class="panel"><div class="panel-title">${esc(item.title)}</div><div class="method-line"><div class="method-node">OBSERVER</div><span class="method-arrow">→</span><div class="method-node">COMPRENDRE</div><span class="method-arrow">→</span><div class="method-node">AGIR</div></div></div>`;$("#activity-zone").innerHTML=item.image?`<div class="visual-split"><img src="${esc(item.image)}" alt="${esc(item.imageAlt)}"><div class="visual-host">${activity}</div></div>`:activity;item.wire?.();$("#reference-box").innerHTML=item.codes.length?`<strong>Référentiel</strong> · ${item.codes.map(esc).join(" · ")}`:"<strong>Contexte</strong> · hors référentiel";renderStepper(item);updateNav();updateUrl();replierTexte();window.SCENE_GESTE&&SCENE_GESTE.ecran(item.id);if(moveFocus)$("#lesson-title").focus({preventScroll:true});if(autoplay)setTimeout(()=>speakCurrent(),320)}
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
function buildPrintBook(){const quizCount=screens.filter(item=>item.quiz).length;$("#print-book").innerHTML=`<header class="print-title"><h1>Les bouteilles de fluide — types, robinets, plaque, charge maximale, fluides inflammables</h1><p>${screens.length} écrans · 6 dossiers · ${quizCount} questions de contrôle. Statut : en cours de relecture.</p><p class="print-codes">Référentiels : CAP IFCA C4.2 « Manipuler le fluide frigorigène et les huiles », S0.2 ; Bac Pro MFER S4.1.2, S7.2.3, S2.4.2 ; TP MDF CP2, CP5 ; attestation d’aptitude, arrêté du 21 novembre 2025 : 5.02, 5.05, 5.06.</p><p class="print-law"><strong>Point réglementaire :</strong> bouteilles non rechargeables interdites depuis le 4 juillet 2007, règlement (UE) 2024/573, annexe IV point 1 et article 11 § 3. Aucun taux de remplissage réglementaire n’est donné : les valeurs 0,80 et 0,90 kg/L sont des valeurs d’exercice.</p></header>`+screens.map((item,index)=>`<article class="print-screen"><h2>${index+1}. ${esc(item.title)}</h2><p>${esc(item.text)}</p>${item.prompt?`<h3>Action à réaliser</h3><p>${esc(item.prompt)}</p>`:""}${item.quiz?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.quiz.choices[item.quiz.good])}. ${esc(item.quiz.explain)}</div>`:item.correction?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.correction)}</div>`:""}<p class="print-codes">Référentiel · ${item.codes.length?esc(item.codes.join(" · ")):"contexte"}</p></article>`).join("")}
function handleInitialUrl(){const params=new URLSearchParams(location.search);const extract=params.get("extrait");if(extract){startExtract(extract.split(",").map(value=>value.trim()).filter(Boolean));return}const dossier=params.get("dossier");if(dossier){startCourse(dossier,Number(params.get("ecran"))||1);return}showHome()}
function bindGlobalEvents(){$("#start-button").addEventListener("click",()=>startCourse());$("#home-button").addEventListener("click",showHome);$("#exit-button").addEventListener("click",showHome);$("#prev-button").addEventListener("click",previous);$("#next-button").addEventListener("click",next);$("#copy-link").addEventListener("click",copyCurrentLink);$("#listen").addEventListener("click",toggleSpeech);$("#stop-voice").addEventListener("click",()=>stopSpeech());$("#slower").addEventListener("click",()=>changeRate(-1));$("#faster").addEventListener("click",()=>changeRate(1));$("#texte-entier").addEventListener("click",basculerTexte);addEventListener("keydown",event=>{const tag=document.activeElement?.tagName;if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(tag))return;if(event.key==="ArrowRight"){event.preventDefault();next()}else if(event.key==="ArrowLeft"){event.preventDefault();previous()}else if(event.key===" "){event.preventDefault();toggleSpeech()}else if(event.key==="Escape")showHome()});addEventListener("beforeunload",()=>stopSpeech());document.addEventListener("visibilitychange",()=>{if(document.hidden)stopSpeech()});if(speechSupported())speechSynthesis.addEventListener?.("voiceschanged",()=>{})}

renderHome();
buildPrintBook();
bindGlobalEvents();
updateVoiceButtons();
handleInitialUrl();

