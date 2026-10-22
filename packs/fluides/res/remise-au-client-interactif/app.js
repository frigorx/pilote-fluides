"use strict";

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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("remise-au-client-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
function saveRate(){try{localStorage.setItem("detecteurs-voice-rate",String(voiceRates[rateIndex]))}catch(_){}}
function esc(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function stripHtml(value){const box=document.createElement("div");box.innerHTML=value;return box.textContent||""}
function screen(data){const visual=screenIllustrations[data.id]||["",""];return{level:"comprendre",codes:[],prompt:"",speak:"",requiresAction:false,image:visual[0],imageAlt:visual[1]||"Illustration pédagogique de l’étape.",...data}}
function completeCurrent(message="Action réalisée. Vous pouvez continuer."){completed.add(activeScreens[current].id);updateNav();setStatus(message)}
function setStatus(message){clearTimeout(statusTimer);$("#status-message").textContent=message;statusTimer=setTimeout(()=>{$("#status-message").textContent=""},2600)}

function choiceMarkup(choices){return `<div class="panel"><div class="cards" style="--cols:${Math.min(choices.length,3)}">${choices.map((choice,index)=>`<button class="choice" type="button" data-choice="${index}"><strong>${esc(choice.title)}</strong><small>${esc(choice.note||"")}</small></button>`).join("")}</div><div class="feedback" id="feedback">Choisissez, puis lisez la conséquence.</div></div>`}
function wireChoice(good,messages){window.__qa={type:'choice',good};$$('[data-choice]').forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.choice);$$('[data-choice]').forEach(item=>item.classList.remove("good","bad"));button.classList.add(index===good?"good":"bad");const feedback=$("#feedback");feedback.className=`feedback ${index===good?"good":"bad"}`;feedback.innerHTML=`<strong>${index===good?"Correct.":"À corriger."}</strong> ${esc(messages[index])}`;if(index===good)completeCurrent("Décision correcte. Vous pouvez continuer.")}))}
function checklistMarkup(items){return `<div class="panel"><div class="cards" style="--cols:${Math.min(items.length,3)}">${items.map((item,index)=>`<button class="check-card" type="button" data-check="${index}" aria-pressed="false"><strong>${esc(item.title)}</strong><small>${esc(item.note)}</small></button>`).join("")}</div><div class="feedback" id="feedback">Ouvrez chaque point.</div></div>`}
function wireChecklist(items){window.__qa={type:'check',n:items.length};$$('[data-check]').forEach(button=>button.addEventListener("click",()=>{button.classList.add("good");button.setAttribute("aria-pressed","true");const item=items[Number(button.dataset.check)];const feedback=$("#feedback");feedback.className="feedback good";feedback.innerHTML=`<strong>${esc(item.title)}.</strong> ${esc(item.detail)}`;if($$('[data-check][aria-pressed="false"]').length===0)completeCurrent("Tous les points ont été examinés.")}))}
function sequenceMarkup(items){return `<div class="panel"><div class="sequence">${items.map((item,index)=>`<button class="sequence-step" type="button" data-sequence="${index}">${index+1}<br>${esc(item)}</button>${index<items.length-1?'<span class="sequence-arrow">→</span>':''}`).join("")}</div><div class="feedback" id="feedback">Cliquez dans l’ordre.</div></div>`}
function wireSequence(items){window.__qa={type:'seq',n:items.length};let next=0;$$('[data-sequence]').forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.sequence);const feedback=$("#feedback");if(index!==next){feedback.className="feedback bad";feedback.textContent="À corriger : revenez au premier geste non validé.";return}button.classList.add("done");next+=1;feedback.className="feedback good";feedback.textContent=next===items.length?"Ordre complet.":"Étape validée. Continuez.";if(next===items.length)completeCurrent("Ordre complet. Vous pouvez continuer.")}))}
function quizMarkup(item){const saved=quizAnswers[item.id];return `<div class="panel"><div class="cards" style="--cols:2">${item.quiz.choices.map((choice,index)=>`<button class="choice ${saved===index?(index===item.quiz.good?"good":"bad"):""}" type="button" data-quiz="${index}" ${saved!==undefined?"disabled":""}><strong>${String.fromCharCode(65+index)}.</strong><small>${esc(choice)}</small></button>`).join("")}</div><div class="feedback ${saved===undefined?"":saved===item.quiz.good?"good":"bad"}" id="feedback">${saved===undefined?"Choisissez une réponse.":`<strong>${saved===item.quiz.good?"Correct.":"À revoir."}</strong> ${esc(item.quiz.explain)}`}</div></div>`}
function wireQuiz(item){window.__qa={type:'quiz',good:item.quiz.good};$$('[data-quiz]').forEach(button=>button.addEventListener("click",()=>{if(quizAnswers[item.id]!==undefined)return;quizAnswers[item.id]=Number(button.dataset.quiz);completed.add(item.id);renderCurrent(false)}))}

/* ---- Les activités propres à ce cours (les cinq premières viennent du moteur commun du réseau) ---- */
function exempleMarkup(e){return `<div class="exemple"><span class="tag">Exemple résolu</span><p><strong>${esc(e.text)}</strong> → <b>${esc(e.answer)}</b></p><small>${esc(e.why)}</small></div>`}
function sortMarkup(rows,labels,example){return `<div class="panel sort">${example?exempleMarkup({text:example.text,answer:labels[example.good],why:example.why}):""}<div class="sort-rows">${rows.map((row,index)=>`<div class="sort-row" data-row="${index}"><span class="sort-text">${esc(row.text)}</span><span class="sort-buttons">${labels.map((label,option)=>`<button type="button" class="sort-btn" data-row="${index}" data-opt="${option}">${esc(label)}</button>`).join("")}</span></div>`).join("")}</div><div class="feedback" id="feedback">Choisissez une réponse pour chaque ligne.</div></div>`}
function wireSort(rows){window.__qa={type:'sort',goods:rows.map(r=>r.good),n:Math.max(...rows.map(r=>r.good))+1};let done=0;$$(".sort-btn").forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.row),option=Number(button.dataset.opt),row=$(`.sort-row[data-row="${index}"]`);if(row.classList.contains("done"))return;const feedback=$("#feedback");if(option===rows[index].good){row.classList.add("done");row.querySelectorAll(".sort-btn").forEach(item=>{item.disabled=true});button.classList.add("good");done+=1;feedback.className="feedback good";feedback.innerHTML=`<strong>Correct.</strong> ${esc(rows[index].why)}`;if(done===rows.length)completeCurrent("Tout est rangé. Vous pouvez continuer.")}else{button.classList.add("bad");button.disabled=true;feedback.className="feedback bad";feedback.innerHTML=`<strong>À corriger.</strong> ${esc(rows[index].bad)}`}}))}
function orderMarkup(items,shown){return `<div class="panel"><div class="order-list">${shown.map(index=>`<button type="button" class="order-item" data-order="${index}"><b class="order-n" aria-hidden="true"></b><span>${esc(items[index])}</span></button>`).join("")}</div><div class="feedback" id="feedback">Cliquez d’abord sur la première action.</div></div>`}
function wireOrder(items,hints){window.__qa={type:'order',n:items.length};let next=0;$$("[data-order]").forEach(button=>button.addEventListener("click",()=>{if(button.classList.contains("done"))return;const index=Number(button.dataset.order),feedback=$("#feedback");if(index!==next){button.classList.add("bad");setTimeout(()=>button.classList.remove("bad"),700);feedback.className="feedback bad";feedback.innerHTML=`<strong>Pas encore.</strong> ${esc(hints[next])}`;return}button.classList.add("done");button.querySelector(".order-n").textContent=String(next+1);next+=1;feedback.className="feedback good";feedback.textContent=next===items.length?"Ordre complet.":"Bien. Et ensuite ?";if(next===items.length)completeCurrent("Ordre complet. Vous pouvez continuer.")}))}
function cardsMarkup(cards,cls=""){return `<div class="cartes ${cls}">${cards.map(card=>`<article class="carte"><h3>${esc(card.title)}</h3>${card.rows.map(row=>`<p><strong>${esc(row[0])}</strong> ${esc(row[1])}</p>`).join("")}</article>`).join("")}</div>`}
function libreMarkup(){return `<div class="panel libre"><label for="reponse-libre" class="libre-label">Votre plan, en quelques lignes :</label><textarea id="reponse-libre" rows="4" placeholder="Méthodes, ordre des gestes, ce que je ne fais pas…"></textarea><button type="button" class="primary-button" id="voir-reponse" disabled>Voir la réponse type</button><div class="feedback" id="feedback">Écrivez d’abord. Le bouton s’ouvre après quelques mots.</div></div>`}
function wireLibre(answerHtml){window.__qa={type:'libre'};const area=$("#reponse-libre"),button=$("#voir-reponse");area.addEventListener("input",()=>{button.disabled=area.value.trim().length<40});button.addEventListener("click",()=>{const feedback=$("#feedback");feedback.className="feedback good";feedback.innerHTML=answerHtml;completeCurrent("Comparez avec votre texte, puis continuez.")})}
function liensMarkup(links){return `<div class="liens">${links.map(link=>`<a class="lien-carte" href="${esc(link.href)}"><strong>${esc(link.title)}</strong><small>${esc(link.note)}</small></a>`).join("")}</div>`}
function constatMarkup(rows){return `<table class="constat"><caption>Constat de vérification d’un détecteur (exemple)</caption><tbody>${rows.map(row=>`<tr><th scope="row">${esc(row[0])}</th><td>${esc(row[1])}</td></tr>`).join("")}</tbody></table>`}

function tableMarkup(caption,head,rows){return `<table class="constat tableau"><caption>${esc(caption)}</caption><thead><tr>${head.map(h=>`<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>i===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`}
function figureMarkup(src,alt,legende){return `<figure class="figure"><img src="${esc(src)}" alt="${esc(alt)}"><figcaption>${esc(legende)} <a href="${esc(src)}" target="_blank" rel="noopener">Ouvrir l’image en grand</a></figcaption></figure>`}
function numberMarkup(label,unit){return `<div class="panel nombre"><label for="reponse-nombre" class="libre-label">${esc(label)}</label><div class="nombre-ligne"><input id="reponse-nombre" type="text" inputmode="decimal" autocomplete="off" aria-describedby="feedback"><span class="unite">${esc(unit)}</span><button type="button" class="primary-button" id="verifier-nombre">Vérifier</button></div><div class="feedback" id="feedback">Écrivez votre résultat, puis cliquez « Vérifier ».</div></div>`}
function wireNumber(answer,tol,okMsg,badMsg){window.__qa={type:'number',answer};const input=$("#reponse-nombre"),feedback=$("#feedback");const check=()=>{const v=parseFloat(String(input.value).replace(",",".").replace(/[−–]/g,"-").replace(/s/g,""));if(Number.isNaN(v)){feedback.className="feedback bad";feedback.innerHTML="<strong>Pas de nombre.</strong> Écrivez des chiffres, par exemple 12,5.";return}if(Math.abs(v-answer)<=tol){feedback.className="feedback good";feedback.innerHTML="<strong>Correct.</strong> "+okMsg;completeCurrent("Résultat juste. Vous pouvez continuer.")}else{feedback.className="feedback bad";feedback.innerHTML="<strong>À corriger.</strong> "+badMsg}};$("#verifier-nombre").addEventListener("click",check);input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();check()}})}


/* ===== Les données de ce cours (remise-au-client-interactif) ===== */
const dossiers = [
  { id:"remettre", label:"Remettre", note:"trois choses à faire" },
  { id:"expliquer", label:"Expliquer", note:"un oral de cinq minutes" },
  { id:"consigner", label:"Consigner", note:"ce qu’on écrit, ce qu’on laisse" },
  { id:"conseiller", label:"Conseiller", note:"écouter, puis proposer" },
  { id:"bilan", label:"Bilan", note:"un cas, puis l’essentiel" },
];
const screenIllustrations = {};
const PRINT = {
  titre: "Remettre l’installation au client : expliquer, consigner, conseiller",
  codes: "Sert notamment pour : CAP IFCA, tâche T3 « Communiquer avec le client, l’utilisateur » · Bac Pro MFER (référentiel 2028), tâche A3T5 « Conseiller le client et/ou l’exploitant », compétence C13 « Conseiller le client et/ou l’exploitant du système », savoir S8.1 « la communication orale ».",
  loi: "ce cours ne cite aucun texte réglementaire. Pour la fiche d’intervention et le registre, le cours renvoie à la station « La fiche d’intervention » du réseau Législation. Les exemples de réglages sont des valeurs d’exemple.",
};
const CODES = "CAP T3 · Bac A3T5 · C13 · S8.1";

/* ---- Les données des activités ---- */
const A_QUI = ["Pour le client", "Pour un collègue"];
const quiExemple = { text: "« La chambre est réglée pour rester entre −20 °C et −18 °C. »", good: 0, why: "Une phrase simple, avec les températures que le client voit : c’est pour le client." };
const quiLignes = [
  { text: "« La BP est à 1,43 bar, la surchauffe à 10 K. »", good: 1, why: "Des pressions et des kelvins : c’est le langage du métier, pas celui du client.", bad: "Le client ne lit pas un manomètre : c’est une phrase de métier." },
  { text: "« Quand le givre se forme, la chambre se dégivre toute seule, deux fois par jour. »", good: 0, why: "Il comprend ce qui se passe et ce qu’il verra : de l’eau, un arrêt du froid un moment.", bad: "C’est dit sans jargon : c’est pour le client." },
  { text: "« J’ai fait le pump-down avant de déposer le manifold. »", good: 1, why: "Pump-down, manifold : des mots de métier.", bad: "Ces deux mots sont du métier, pas du client." },
  { text: "« Si de l’eau coule au sol ou si le givre devient épais, appelez-nous. »", good: 0, why: "Un signe visible et une action claire : c’est pour le client.", bad: "Un signe que le client peut voir, et quoi faire : c’est pour lui." },
  { text: "« La HP de sécurité est tarée à 22 bar, réarmement manuel. »", good: 1, why: "Un réglage de sécurité de technicien : pas pour le client.", bad: "C’est un détail technique de réglage : il s’adresse à un collègue." },
];
const CONSEIL = ["Je conseille", "Je ne conseille pas"];
const conseilExemple = { text: "Noter la température de la chambre chaque jour, matin et soir", good: 0, why: "Un carnet de relevés quotidiens évite les dérives et protège les denrées." };
const conseilLignes = [
  { text: "Gratter le givre de l’évaporateur avec un couteau", good: 1, why: "On risque de percer l’évaporateur ou d’abîmer les ailettes : on laisse le dégivrage faire fondre.", bad: "Un couteau abîme les ailettes et peut percer le tube : on ne conseille jamais ça." },
  { text: "Prévenir le frigoriste si de l’eau coule au sol ou si le givre devient épais", good: 0, why: "Ce sont les premiers signes d’un écoulement bouché ou d’un dégivrage insuffisant.", bad: "Ce sont des signes à signaler vite : on le conseille." },
  { text: "Laisser la porte ouverte pendant tout le rangement", good: 1, why: "L’air chaud entre, la chambre se réchauffe et la machine consomme plus.", bad: "Porte ouverte longtemps : le froid se perd et ça coûte." },
  { text: "Faire nettoyer le condenseur régulièrement", good: 0, why: "Un condenseur propre consomme moins : feuilles en automne, pollen au printemps.", bad: "Un entretien régulier du condenseur fait économiser : on le conseille." },
  { text: "Éteindre la lumière de la chambre en la quittant", good: 0, why: "L’éclairage est une charge de plus pour la machine.", bad: "Éteindre la lumière économise : on le conseille." },
];
const ordreOral = {
  items: ["Je dis ce que j’ai fait, en une phrase.", "J’explique comment la chambre fonctionne, avec des mots simples.", "Je dis les réglages et ce que le client peut toucher ou non.", "Je donne les consignes de sécurité.", "Je dis les réserves et qui appeler."],
  shown: [2, 4, 0, 3, 1],
  hints: ["On commence par la nouvelle principale : ce qui a été fait.", "Après le « quoi », le « comment ça marche », en mots simples.", "Ensuite les réglages : ce que le client peut toucher, et ce qu’il ne touche pas.", "Puis les consignes de sécurité, avant de conclure.", "On finit par les réserves, et à qui téléphoner."],
};
const casSeul = "<div class=\"cas-boite\"><strong>Le cas.</strong> Vous venez de mettre en service la chambre négative d’un restaurateur : consigne −20 °C, dégivrage réglé, condenseur sur la terrasse. Il est pressé : « Dites-moi juste si ça marche. » Un joint de porte abîmé reste à remplacer : la pièce arrive jeudi.</div>";
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Ce que j’ai fait :</b> « J’ai mis votre chambre froide en service. Elle est à −20 °C. »</li><li><b>Comment ça marche :</b> « Elle se refroidit toute seule. Elle se dégivre deux fois par jour : vous verrez un peu d’eau, c’est normal. »</li><li><b>Réglages :</b> « La température est réglée : ne touchez pas au thermostat. Notez la température matin et soir. »</li><li><b>Sécurité :</b> « Prévenez quelqu’un avant d’entrer. La porte s’ouvre toujours de l’intérieur avec la poignée de secours. »</li><li><b>Réserves :</b> « Il reste un joint de porte à changer : la pièce arrive jeudi, je reviens vendredi. En cas de souci, appelez ce numéro. » Tout est écrit sur la fiche que je vous laisse.</li></ol><b>Trois conseils :</b> noter la température chaque jour ; ne pas laisser la porte ouverte ; faire nettoyer le condenseur chaque année.";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"trois-choses",dossier:"remettre",title:"Remettre l’installation : trois choses",kicker:"Remettre · 1",codes:[CODES],level:"comprendre",
    text:"Remettre une installation à un client, c’est trois choses : expliquer, consigner, conseiller. Le client n’est pas frigoriste : à la fin, il doit pouvoir s’en servir sans vous.",
    prompt:"Lisez les trois cartes. Chacune est reprise dans un dossier du cours.",
    render:()=>cardsMarkup([
      {title:"Expliquer",rows:[["Quoi :","ce qui a été fait, comment ça marche, comment s’en servir."],["Comment :","à l’oral, avec des mots simples."]]},
      {title:"Consigner",rows:[["Quoi :","ce qu’on écrit : travaux, relevés, réglages, réserves."],["Pour qui :","le client en garde une trace."]]},
      {title:"Conseiller",rows:[["Quoi :","ce qu’il faut faire, et ne pas faire, pour que ça dure."],["Avant :","écouter ses besoins."]]},
    ])+"<p class=\"source\">D’après les indicateurs d’évaluation d’une compétence de conseil au client (référentiel du fonds de F. Henninot) : écouter et questionner, expliquer le fonctionnement et l’utilisation, informer oralement des consignes de sécurité, proposer une solution technique.</p>"}),

  screen({id:"deux-langages",dossier:"expliquer",title:"Deux langages : le client et le collègue",kicker:"Expliquer · 1",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"On ne parle pas au client comme à un collègue. Au client : peu de mots techniques, des phrases courtes, ce qu’il voit et ce qu’il doit faire. À un collègue : les pressions, les réglages, les mots de métier.",
    prompt:"Une phrase est déjà rangée en exemple. Rangez les cinq autres : cliquez « Pour le client » ou « Pour un collègue ».",
    render:()=>sortMarkup(quiLignes,A_QUI,quiExemple),wire:()=>wireSort(quiLignes),
    correction:"Pour le client : la chambre réglée entre −20 et −18 °C, le dégivrage automatique, l’eau au sol à signaler. Pour un collègue : la BP et la surchauffe, le pump-down, la HP de sécurité."}),

  screen({id:"plan-de-loral",dossier:"expliquer",title:"Un oral de cinq minutes : le plan",kicker:"Expliquer · 2",codes:[CODES],level:"comprendre",
    text:"Devant le client, vous suivez toujours le même plan : ce qui a été fait, comment ça marche, les réglages, la sécurité, les réserves. Cinq phrases suffisent pour commencer.",
    prompt:"Lisez le plan et l’exemple. L’écran suivant vous fait remettre les temps dans l’ordre.",
    render:()=>cardsMarkup([
      {title:"1 · Ce qui a été fait",rows:[["Exemple :","« J’ai mis votre chambre en service. Elle est à −20 °C. »"]]},
      {title:"2 · Comment ça marche",rows:[["Exemple :","« Elle se refroidit seule, et se dégivre deux fois par jour. »"]]},
      {title:"3 · Les réglages",rows:[["Exemple :","« Ne touchez pas au thermostat. Notez la température matin et soir. »"]]},
      {title:"4 · La sécurité",rows:[["Exemple :","« Prévenez quelqu’un avant d’entrer. La porte s’ouvre de l’intérieur. »"]]},
      {title:"5 · Les réserves",rows:[["Exemple :","« Un joint est à changer, la pièce arrive jeudi. Voici qui appeler. »"]]},
    ])+"<p class=\"source\">Plan de l’oral de recette de cinq minutes (plan, vocabulaire, réserves) : progression du fonds de F. Henninot. Les exemples de réglage sont des valeurs d’exemple.</p>"}),

  screen({id:"ordre-oral",dossier:"expliquer",title:"Remettre l’oral dans l’ordre",kicker:"Expliquer · 3",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Vous avez lu le plan de l’oral. Remettez les cinq temps dans l’ordre où vous les dites au client.",
    prompt:"Cliquez les cinq temps dans l’ordre : d’abord le premier, puis le suivant.",
    render:()=>orderMarkup(ordreOral.items,ordreOral.shown),wire:()=>wireOrder(ordreOral.items,ordreOral.hints),
    correction:"Ordre : ce qui a été fait, comment ça marche, les réglages, la sécurité, les réserves."}),

  screen({id:"consigner",dossier:"consigner",title:"Consigner : ce qu’on écrit",kicker:"Consigner · 1",codes:[CODES],level:"comprendre",
    text:"Ce que vous dites s’oublie. Ce que vous écrivez reste. La fiche de remise reprend les mêmes cinq temps que l’oral, avec la date, les relevés et les réglages.",
    prompt:"Lisez la fiche d’exemple. Repérez les réserves : ce qui reste à faire.",
    render:()=>tableMarkup("Fiche de remise (exemple)",["Rubrique","Ce qu’on écrit"],[["Date et installation","la date du jour, chambre négative, restaurant"],["Travail fait","Mise en service, réglages de la régulation et du dégivrage"],["Relevés","Température de la chambre, basse et haute pression"],["Réglages laissés","Consigne −20 °C, différentiel 2 K, dégivrage deux fois par jour"],["Fluide ajouté","Aucun"],["Réserves","Joint de porte à remplacer, pièce attendue jeudi"],["Signatures","Technicien et client"]])+"<p class=\"renvoi\">Pour la fiche d’intervention et le registre des fluides : la station <a href=\"../../../../legislation/stations/tracabilite-fluides/index.html\">La traçabilité des fluides</a> (réseau Législation).</p><p class=\"source\">Valeurs d’exemple.</p>"}),

  screen({id:"une-reserve",dossier:"consigner",title:"Une réserve à dire et à écrire",kicker:"Consigner · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Une réserve, c’est un travail qui reste à faire. On la dit, on l’écrit, et on donne une date.",
    prompt:"Un joint de porte est abîmé, la pièce arrive jeudi. Cliquez ce que vous faites.",
    render:()=>exempleMarkup({text:"Un voyant de lumière extérieur ne s’allume pas, l’ampoule est commandée",answer:"je le dis, je l’écris avec la date prévue",why:"Le client sait ce qui reste et quand : il ne découvre rien plus tard."})+choiceMarkup([{title:"Je ne dis rien, je reviens vendredi",note:"Il verra bien"},{title:"Je le dis et je l’écris sur la fiche, avec la date",note:"Pièce attendue jeudi, retour vendredi"},{title:"Je le dis seulement à l’oral",note:"Pas de papier"}]),
    wire:()=>wireChoice(1,["Le client pourrait croire à une panne ou à un oubli. On dit toujours ce qui reste à faire.","Dit et écrit, avec la date : il sait ce qui reste, et vous aussi.","Ce qu’on dit à l’oral s’oublie : une réserve non écrite se perd ou se conteste."]),
    correction:"Je le dis et je l’écris sur la fiche, avec la date prévue."}),

  screen({id:"ecouter",dossier:"conseiller",title:"Écouter avant de conseiller",kicker:"Conseiller · 1",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Un bon conseil répond à un besoin. Avant de proposer, on écoute et on pose des questions : quels produits, quelles quantités, quelle utilisation.",
    prompt:"Lisez l’exemple résolu, puis cliquez ce que vous faites dans le cas « À vous ».",
    render:()=>exempleMarkup({text:"Le client dit : « Ma chambre est trop froide. »",answer:"je demande ce qu’il y range",why:"Un produit sensible au gel n’a pas les mêmes besoins qu’un produit congelé : la réponse dépend du produit."})+"<p class=\"cas\"><strong>À vous :</strong> un restaurateur dit : « J’ai du poisson frais et des légumes à feuilles, je veux tout dans la même chambre. » Que faites-vous d’abord ?</p>"+choiceMarkup([{title:"Je dis oui, c’est pratique",note:"Une seule chambre"},{title:"Je pose des questions : quels produits, quelles quantités, quelles températures ?",note:"Puis je propose"},{title:"Je dis non, sans expliquer",note:"Ce n’est pas possible"}]),
    wire:()=>wireChoice(1,["Poisson frais et légumes à feuilles n’ont pas les mêmes besoins : il faut d’abord comprendre ce qu’il range et en quelle quantité.","On écoute et on questionne d’abord : les besoins du client décident de la solution (une ou deux chambres, quelle température, quelle humidité).","Un refus sans explication ne l’aide pas : il faut comprendre, puis proposer."]),
    correction:"Poser des questions : quels produits, quelles quantités, quelles températures. Puis proposer, par exemple deux chambres."}),

  screen({id:"conseils-chambre",dossier:"conseiller",title:"Les conseils pour une chambre froide",kicker:"Conseiller · 2",codes:[CODES],level:"comprendre",
    text:"Les conseils tiennent en quatre moments : ce qu’on fait chaque jour, quand ça va mal, une fois par an, et ce qu’on ne fait jamais.",
    prompt:"Lisez les quatre cartes. L’écran suivant vous fait trier des conseils.",
    render:()=>cardsMarkup([
      {title:"Chaque jour",rows:[["Noter :","la température, matin et soir."],["Fermer :","la porte après chaque passage."],["Éteindre :","la lumière en sortant."]]},
      {title:"Quand ça va mal",rows:[["Appeler si :","de l’eau coule au sol, le givre devient épais, l’alarme sonne ou la température monte."]]},
      {title:"Une fois par an",rows:[["Faire nettoyer :","le condenseur, et contrôler l’évaporateur et les joints de porte."]]},
      {title:"Jamais",rows:[["Gratter :","le givre au couteau."],["Laisser :","la porte ouverte pendant un long rangement."]]},
    ],"deux")+"<p class=\"source\">Sources : document « Froid commercial et chambres froides » (carnet de relevés, lumière, portes, nettoyage), cours « Dégivrage, eau et sécurités » et « Ce que coûte le froid ».</p>"}),

  screen({id:"trier-les-conseils",dossier:"conseiller",title:"Trier les conseils",kicker:"Conseiller · 3",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Un bon conseil est simple, utile et sans danger pour l’installation.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez « Je conseille » ou « Je ne conseille pas ».",
    render:()=>sortMarkup(conseilLignes,CONSEIL,conseilExemple),wire:()=>wireSort(conseilLignes),
    correction:"Je conseille : prévenir si de l’eau coule ou si le givre est épais, nettoyer le condenseur, éteindre la lumière. Je ne conseille pas : gratter le givre, laisser la porte ouverte."}),

  screen({id:"consigne-securite",dossier:"conseiller",title:"La consigne de sécurité à dire",kicker:"Conseiller · 4",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Informer oralement des consignes de sécurité fait partie de la remise. Pour une chambre négative, une consigne passe avant les autres.",
    prompt:"Cliquez la consigne de sécurité que vous donnez à l’exploitant d’une chambre négative.",
    quiz:{choices:["Prévenir quelqu’un avant d’entrer, et savoir ouvrir la porte depuis l’intérieur.","Entrer sans manteau pour ne pas avoir chaud en sortant.","Bloquer la porte ouverte avec une cale pendant le travail.","Ne jamais allumer la lumière pour économiser."],good:0,explain:"Une personne enfermée dans le froid est en danger : on prévient quelqu’un, et on sait que la porte se rouvre de l’intérieur avec son système de secours (cours « Dégivrage, eau et sécurités »)."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : remettre la chambre négative à un client pressé.",
    prompt:"Seul : écrivez votre oral en cinq phrases (ce qui a été fait, comment ça marche, les réglages, la sécurité, les réserves), puis trois conseils. Comparez avec la réponse type.",
    render:()=>casSeul+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : cinq phrases dans l’ordre du plan, puis trois conseils."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis continuer",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Remettre, c’est expliquer, consigner, conseiller. Un oral de cinq temps, en mots simples. Un écrit qui garde les réserves et leur date. Des conseils précis, et la consigne de sécurité.",
    prompt:"Pour continuer : ouvrez l’une des trois suites.",
    render:()=>liensMarkup([{href:"../chaine-intervention-interactive/index.html",title:"La chaîne complète",note:"Tout enchaîner proprement, jusqu’à la remise"},{href:"../../../../legislation/stations/tracabilite-fluides/index.html",title:"La traçabilité des fluides",note:"La fiche d’intervention et le registre"},{href:"../chambre-negative-reglages-interactif/index.html",title:"Relevés et réglages d’une chambre négative",note:"Ce qu’on remet au client"}])}),
];


/* ===== Affichage, navigation, voix, impression (moteur commun) ===== */
function renderHome(){const nEx=screens.filter(s=>s.requiresAction).length;$("#home-stats").textContent=`${screens.length} écrans · ${dossiers.length} dossiers · ${nEx} exercices`;$("#dossier-grid").innerHTML=dossiers.map((dossier,index)=>`<button class="dossier-button" type="button" data-dossier="${dossier.id}"><b>${index+1}</b><span>${esc(dossier.label)}<small>${esc(dossier.note)}</small></span></button>`).join("");$$('[data-dossier]').forEach(button=>button.addEventListener("click",()=>startCourse(button.dataset.dossier)))}
function showHome(){stopSpeech();document.body.classList.remove("course-running");$("#home").hidden=false;$("#course-shell").hidden=true;$("#home-button").hidden=true;$("#exit-button").hidden=true;$("#mode-badge").textContent="En cours de relecture";history.replaceState(null,"",location.pathname);scrollTo(0,0)}
function startCourse(dossierId="choisir",screenNumber=1){extractMode=false;activeScreens=[...screens];const first=Math.max(0,activeScreens.findIndex(item=>item.dossier===dossierId));current=Math.min(activeScreens.length-1,first+Math.max(0,screenNumber-1));furthest=Math.max(furthest,current);openCourse();renderCurrent(false)}
function startExtract(ids){const picked=ids.map(id=>screens.find(item=>item.id===id)).filter(Boolean);if(!picked.length){showHome();setStatus("Extrait introuvable.");return}extractMode=true;activeScreens=picked;current=0;furthest=0;openCourse();renderCurrent(false)}
function openCourse(){document.body.classList.add("course-running");$("#home").hidden=true;$("#course-shell").hidden=false;$("#home-button").hidden=false;$("#exit-button").hidden=false;$("#mode-badge").textContent=extractMode?"Extrait · en cours de relecture":"En cours de relecture";$("#rail-mode").textContent=extractMode?"EXTRAIT":"COURS";scrollTo(0,0)}
function renderStepper(item){const groups=extractMode?[{id:"extrait",label:"Extrait"}]:dossiers;$("#stepper").innerHTML=groups.map((group,index)=>{const indices=activeScreens.map((screenItem,screenIndex)=>({screenItem,screenIndex})).filter(entry=>extractMode||entry.screenItem.dossier===group.id).map(entry=>entry.screenIndex);const first=indices[0]??0;const active=extractMode||item.dossier===group.id;const done=indices.length&&Math.max(...indices)<furthest;return `<button class="step-button ${active?"active":""} ${done?"done":""}" type="button" data-step="${first}" ${active?'aria-current="step"':""}><b>${index+1}</b><span>${esc(group.label)}</span></button>`}).join("");$$('[data-step]').forEach(button=>button.addEventListener("click",()=>goTo(Number(button.dataset.step))));const total=activeScreens.length;$("#rail-progress").textContent=`${current+1} / ${total}`;$("#progress-bar").style.width=`${(current+1)/total*100}%`;$("#progress-copy").textContent=current===total-1?"Fin du parcours":`${total-current-1} écran${total-current-1>1?"s":""} à voir`}
function renderCurrent(moveFocus=true){stopSpeech(false);clearTimeout(statusTimer);$("#status-message").textContent="";const item=activeScreens[current];if(!item)return;$("#lesson-kicker").textContent=item.kicker;$("#lesson-title").textContent=item.title;$("#lesson-text").textContent=item.text;$("#action-prompt").textContent=item.prompt||"Lisez, puis continuez.";const activity=item.render?item.render():`<div class="panel"><div class="panel-title">${esc(item.title)}</div><div class="method-line"><div class="method-node">OBSERVER</div><span class="method-arrow">→</span><div class="method-node">COMPRENDRE</div><span class="method-arrow">→</span><div class="method-node">AGIR</div></div></div>`;$("#activity-zone").innerHTML=item.image?`<div class="visual-split"><img src="${esc(item.image)}" alt="${esc(item.imageAlt)}"><div class="visual-host">${activity}</div></div>`:activity;item.wire?.();$("#reference-box").innerHTML="";renderStepper(item);updateNav();updateUrl();replierTexte();if(moveFocus)$("#lesson-title").focus({preventScroll:true});if(autoplay)setTimeout(()=>speakCurrent(),320)}
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
function buildPrintBook(){const quizCount=screens.filter(item=>item.requiresAction).length;$("#print-book").innerHTML=`<header class="print-title"><h1>${esc(PRINT.titre)}</h1><p>${screens.length} écrans · ${dossiers.length} dossiers · ${quizCount} exercices. Statut : en cours de relecture.</p><p class="print-codes">${PRINT.codes}</p><p class="print-law"><strong>Point réglementaire :</strong> ${PRINT.loi}</p></header>`+screens.map((item,index)=>`<article class="print-screen"><h2>${index+1}. ${esc(item.title)}</h2><p>${esc(item.text)}</p>${item.prompt?`<h3>Action à réaliser</h3><p>${esc(item.prompt)}</p>`:""}${item.quiz?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.quiz.choices[item.quiz.good])}. ${esc(item.quiz.explain)}</div>`:item.correction?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.correction)}</div>`:""}</article>`).join("")}
function handleInitialUrl(){const params=new URLSearchParams(location.search);const extract=params.get("extrait");if(extract){startExtract(extract.split(",").map(value=>value.trim()).filter(Boolean));return}const dossier=params.get("dossier");if(dossier){startCourse(dossier,Number(params.get("ecran"))||1);return}showHome()}
function bindGlobalEvents(){$("#start-button").addEventListener("click",()=>startCourse());$("#home-button").addEventListener("click",showHome);$("#exit-button").addEventListener("click",showHome);$("#prev-button").addEventListener("click",previous);$("#next-button").addEventListener("click",next);$("#copy-link").addEventListener("click",copyCurrentLink);$("#listen").addEventListener("click",toggleSpeech);$("#stop-voice").addEventListener("click",()=>stopSpeech());$("#slower").addEventListener("click",()=>changeRate(-1));$("#faster").addEventListener("click",()=>changeRate(1));$("#texte-entier").addEventListener("click",basculerTexte);addEventListener("keydown",event=>{const tag=document.activeElement?.tagName;if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(tag))return;if(event.key==="ArrowRight"){event.preventDefault();next()}else if(event.key==="ArrowLeft"){event.preventDefault();previous()}else if(event.key===" "){event.preventDefault();toggleSpeech()}else if(event.key==="Escape")showHome()});addEventListener("beforeunload",()=>stopSpeech());document.addEventListener("visibilitychange",()=>{if(document.hidden)stopSpeech()});if(speechSupported())speechSynthesis.addEventListener?.("voiceschanged",()=>{})}

renderHome();
buildPrintBook();
bindGlobalEvents();
updateVoiceButtons();
handleInitialUrl();

