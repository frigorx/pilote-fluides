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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("conservation-denrees-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
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


/* ===== Les données de ce cours (conservation-denrees-interactif) ===== */
const dossiers = [
  { id:"pourquoi", label:"Pourquoi", note:"ce qui abîme, ce que fait le froid" },
  { id:"temperatures", label:"Températures", note:"ce que dit l’arrêté" },
  { id:"chambres", label:"Chaque produit", note:"sa chambre, son humidité" },
  { id:"chaine", label:"Chaîne du froid", note:"ne jamais la rompre" },
  { id:"bilan", label:"Bilan", note:"un cas, puis l’essentiel" },
];
const screenIllustrations = {};
const PRINT = {
  titre: "Conserver les denrées par le froid : températures, chaîne du froid",
  codes: "Sert notamment pour : CAP IFCA, savoir associé S4.2 « Action du froid sur la conservation des denrées » · Bac Pro MFER (référentiel 2028), savoir S4.1.1 « L’action du froid au service de la conservation des produits ».",
  loi: "les températures maximales viennent de l’arrêté du 21 décembre 2009, annexe I (texte en vigueur depuis le 9 mai 2020). Il vise les produits d’origine animale. La procédure de l’exploitant et ses guides de bonnes pratiques d’hygiène priment sur le chantier.",
};
const CODES = "CAP S4.2 · Bac S4.1.1";

/* ---- Les données des activités ---- */
const MULTI = ["Favorise", "Freine"];
const multiExemple = { text: "Un steak haché laissé à 20 °C sur le plan de travail", good: 0, why: "Il a de l’eau, de quoi se nourrir, et une température douce : les micro-organismes se multiplient très vite." };
const multiLignes = [
  { text: "Un plat cuisiné tiède, à 35 °C", good: 0, why: "Tiède, humide et nourrissant : c’est le milieu idéal.", bad: "35 °C est proche des 40 °C qu’ils aiment : ça les favorise." },
  { text: "Des viandes en chambre positive, à +3 °C", good: 1, why: "Le froid ralentit les micro-organismes : ils se multiplient très peu.", bad: "À +3 °C ils sont freinés : ce n’est pas leur température." },
  { text: "De la farine sèche dans un sac fermé", good: 1, why: "Sans eau, un micro-organisme ne peut pas se multiplier.", bad: "Il n’y a presque pas d’eau : ils ne peuvent pas se multiplier." },
  { text: "Du lait laissé au soleil sur un rebord de fenêtre", good: 0, why: "Chaud, humide et nourrissant : il tourne vite.", bad: "Le soleil réchauffe le lait : ça favorise la multiplication." },
  { text: "Un produit congelé à −18 °C", good: 1, why: "Le froid bloque le développement de tous les micro-organismes, mais ne les détruit pas.", bad: "À −18 °C ils sont bloqués : ils ne se multiplient plus." },
  { text: "Une viande restée 3 heures dans une cuisine à 25 °C", good: 0, why: "À 25 °C ils se multiplient vite. Le froid n’est plus là pour les freiner.", bad: "25 °C n’est pas du froid : ça favorise la multiplication." },
];

const REF = ["Conforme", "Non conforme"];
const refExemple = { text: "Des viandes de volaille à +3 °C (maximum +4 °C)", good: 0, why: "+3 °C est plus froid que le maximum de +4 °C : c’est conforme." };
const refLignes = [
  { text: "Des viandes hachées à +5 °C (maximum +2 °C)", good: 1, why: "+5 °C est plus chaud que le maximum de +2 °C : c’est non conforme.", bad: "Le maximum est +2 °C pour les viandes hachées. +5 °C dépasse." },
  { text: "Des abats à +3 °C (maximum +3 °C)", good: 0, why: "Pile au maximum : c’est conforme. La limite est une valeur à ne pas dépasser.", bad: "Le maximum est +3 °C : +3 °C est accepté. On ne doit pas dépasser." },
  { text: "Du poisson frais à +4 °C (maximum +2 °C)", good: 1, why: "+4 °C dépasse le maximum de +2 °C : non conforme.", bad: "Pour les produits de la pêche frais, le maximum est +2 °C." },
  { text: "Des ovoproduits (œufs liquides) à +4 °C (maximum +4 °C)", good: 0, why: "C’est pile le maximum : conforme.", bad: "Le maximum est +4 °C : +4 °C est accepté." },
  { text: "Une carcasse entière de bœuf à +7 °C (maximum +7 °C)", good: 0, why: "Pour les carcasses entières, le maximum est +7 °C : conforme.", bad: "Le maximum est +7 °C pour les carcasses entières." },
];
const CONG = ["Conforme", "Non conforme"];
const congExemple = { text: "Des glaces à −20 °C (maximum −18 °C)", good: 0, why: "−20 °C est plus froid que −18 °C : c’est conforme. Au congelé, il n’y a pas de minimum." };
const congLignes = [
  { text: "Des glaces à −15 °C (maximum −18 °C)", good: 1, why: "−15 °C est plus chaud que −18 °C : non conforme.", bad: "−15 °C est plus chaud que le maximum de −18 °C." },
  { text: "Du poisson congelé à −18 °C (maximum −18 °C)", good: 0, why: "Pile au maximum : conforme.", bad: "−18 °C est accepté : on ne doit pas dépasser −18 °C." },
  { text: "Un steak haché congelé à −10 °C (maximum −18 °C)", good: 1, why: "−10 °C dépasse le maximum : non conforme.", bad: "−10 °C est plus chaud que −18 °C." },
  { text: "Un plat cuisiné congelé à −14 °C (« autres denrées congelées » : maximum −12 °C)", good: 0, why: "−14 °C est plus froid que −12 °C : conforme.", bad: "Le maximum est −12 °C pour les autres denrées congelées : −14 °C passe." },
  { text: "Un plat cuisiné congelé à −9 °C (« autres denrées congelées » : maximum −12 °C)", good: 1, why: "−9 °C est plus chaud que −12 °C : non conforme.", bad: "−9 °C est plus chaud que le maximum de −12 °C." },
];
const CATS = ["Catégorie 1", "Catégorie 2", "Catégorie 3", "Catégorie 4"];
const catExemple = { text: "Des champignons", good: 0, why: "Ils sont dans la catégorie 1 : air très humide, de 90 % à 95 %." };
const catLignes = [
  { text: "Du poisson frais", good: 0, why: "Poissons frais : catégorie 1, air très humide.", bad: "Les poissons frais sont dans la catégorie 1 (très humide)." },
  { text: "Du jambon frais", good: 1, why: "Jambon frais : catégorie 2, air humide (85 % à 90 %).", bad: "Le jambon frais est dans la catégorie 2." },
  { text: "Des carcasses de gibier", good: 1, why: "Viande fraîche en carcasse, gibier : catégorie 2.", bad: "La viande en carcasse et le gibier sont dans la catégorie 2." },
  { text: "Des oignons frais", good: 2, why: "Oignons frais : catégorie 3, humidité moyenne (80 % à 85 %).", bad: "Les oignons frais sont dans la catégorie 3." },
  { text: "Du lait et de la crème", good: 3, why: "Lait, crème : catégorie 4, air plus sec (80 % ou moins).", bad: "Le lait et la crème sont dans la catégorie 4 (air plus sec)." },
  { text: "Des conserves", good: 3, why: "Conserves, produits étanches à l’air : catégorie 4.", bad: "Les conserves sont dans la catégorie 4 : leur emballage les protège." },
];
const CHAINE = ["Rupture", "Chaîne tenue"];
const chaineExemple = { text: "Des surgelés restent 2 heures sur le quai, au soleil", good: 0, why: "Ils se réchauffent : la chaîne du froid est rompue." };
const chaineLignes = [
  { text: "Un camion frigorifique arrive à bonne température ; le produit est mesuré et rangé tout de suite", good: 1, why: "Le produit n’a pas eu le temps de se réchauffer.", bad: "Rien ne l’a réchauffé : la chaîne est tenue." },
  { text: "Une chambre froide en panne depuis la nuit : +12 °C à 8 h", good: 0, why: "+12 °C dépasse tous les maximums : la chaîne est rompue.", bad: "+12 °C dépasse les maximums : c’est une rupture." },
  { text: "Un produit décongelé est remis au congélateur", good: 0, why: "Un produit décongelé ne se recongèle pas (arrêté, annexe VI) : sa chaîne a été rompue.", bad: "Le produit s’est réchauffé puis on le recongèle : c’est une rupture." },
  { text: "Un produit congelé passe du camion à la chambre en quelques minutes", good: 1, why: "Une brève période de chargement est admise par l’arrêté, si l’écart ne dépasse pas +3 °C en surface.", bad: "Quelques minutes de chargement sont admises : la chaîne est tenue." },
  { text: "La porte d’une chambre reste grande ouverte pendant tout le rangement", good: 0, why: "L’air chaud entre : la température monte et le froid se perd.", bad: "Porte ouverte longtemps : l’air chaud entre, c’est une rupture." },
];

const cas = "<div class=\"cas-boite\"><strong>Le cas.</strong> Un restaurant range dans une seule chambre positive, réglée à +3 °C : des steaks hachés, du poisson frais, des fromages affinés, des légumes à feuilles et du lait cru. Le cuisinier se plaint : « les légumes sèchent ».</div>";
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Températures maximales :</b> viandes hachées +2 °C et poisson frais +2 °C : +3 °C est trop chaud pour eux, la chambre n’est pas conforme pour ces deux produits. Lait cru +4 °C : conforme. Fromages affinés : température fixée par le fabricant. Légumes : ils ne sont pas dans l’arrêté.</li><li><b>Ce que vous répondez :</b> les légumes ont besoin d’un air très humide (catégorie 1) et les viandes d’un air un peu moins humide : une seule chambre ne convient pas à tous. Proposer une chambre pour les viandes et le poisson (+2 °C maximum), une autre pour les légumes et les produits laitiers.</li><li><b>À noter chaque jour :</b> la température de chaque chambre, le matin et le soir, dans un carnet de relevés, pour voir une dérive avant qu’elle abîme les produits.</li></ol>";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"ce-qui-abime",dossier:"pourquoi",title:"Ce qui abîme un aliment",kicker:"Pourquoi · 1",codes:[CODES],level:"comprendre",
    text:"Un aliment s’abîme pour trois raisons : les micro-organismes, les enzymes et le dessèchement. Le froid freine les deux premières. Il ne les détruit pas : il les bloque.",
    prompt:"Lisez les trois cartes. L’écran suivant vous fait ranger des exemples.",
    render:()=>cardsMarkup([
      {title:"Micro-organismes",rows:[["C’est :","un être vivant trop petit pour être vu à l’œil nu."],["Exemples :","bactéries, moisissures."],["Le froid :","les bloque, sans les tuer."]]},
      {title:"Enzymes",rows:[["C’est :","une substance qui se trouve dans l’aliment lui-même."],["Elle fait :","mûrir, puis pourrir."],["Le froid :","la ralentit."]]},
      {title:"Dessèchement",rows:[["C’est :","l’eau de l’aliment qui part dans l’air."],["On le voit :","viande qui perd son eau, légumes flétris."],["Le froid :","ne l’empêche pas seul : l’air de la chambre doit être assez humide."]]},
    ],"trois")+"<p class=\"source\">Trois maladies à connaître, dues aux micro-organismes : la salmonellose, la listériose, le botulisme. Source : corrigé d’un sujet d’examen du fonds (conservation des denrées, 2010).</p>"}),

  screen({id:"ce-qui-fait-multiplier",dossier:"pourquoi",title:"Ce qui fait multiplier les micro-organismes",kicker:"Pourquoi · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Un micro-organisme se multiplie s’il trouve quatre choses : une température douce (autour de 40 °C), de l’eau, de quoi se nourrir, un milieu ni acide ni basique. Il suffit d’en retirer une pour le freiner. Le froid retire la première.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les six autres : cliquez « Favorise » ou « Freine ».",
    render:()=>sortMarkup(multiLignes,MULTI,multiExemple),wire:()=>wireSort(multiLignes),
    correction:"Favorise : le plat tiède à 35 °C, le lait au soleil, la viande à 25 °C. Freine : la chambre à +3 °C, la farine sèche, le congelé à −18 °C."}),

  screen({id:"arrete-refrigere",dossier:"temperatures",title:"Les températures du réfrigéré",kicker:"Températures · 1",codes:[CODES],level:"comprendre",
    text:"L’arrêté du 21 décembre 2009 fixe des températures maximales. Il vise les produits d’origine animale (viandes, poissons, œufs, lait, fromages…) et ce qui en contient. Les fruits et légumes n’y figurent pas.",
    prompt:"Lisez le tableau. Repérez les trois produits les plus fragiles : +2 °C seulement.",
    render:()=>tableMarkup("Denrées réfrigérées : température maximale (remise directe et restauration collective)",["Denrée","Maximum"],[["Viandes hachées","+2 °C"],["Produits de la pêche frais","+2 °C (glace fondante : 0 à +2 °C)"],["Abats","+3 °C"],["Préparations culinaires faites à l’avance","+3 °C"],["Préparations de viandes, volailles","+4 °C"],["Viandes de bœuf, porc… : morceaux de découpe","+4 °C"],["Viandes de bœuf, porc… : carcasses entières et gros morceaux","+7 °C"],["Œufs transformés (ovoproduits), lait cru","+4 °C"],["Autres denrées très périssables","+4 °C"],["Autres denrées périssables","+8 °C"]])+"<p class=\"source\">Source : arrêté du 21/12/2009, annexe I (Légifrance, version en vigueur depuis le 09/05/2020). Lait pasteurisé et fromages affinés : température fixée par le fabricant. À l’entreposage et au transport, plusieurs lignes renvoient au règlement (CE) n° 853/2004.</p>"}),

  screen({id:"lire-refrigere",dossier:"temperatures",title:"Est-ce conforme ?",kicker:"Températures · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Un maximum est une valeur à ne pas dépasser. Plus froid, c’est accepté. Plus chaud, c’est non conforme.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez « Conforme » ou « Non conforme ».",
    render:()=>sortMarkup(refLignes,REF,refExemple),wire:()=>wireSort(refLignes),
    correction:"Non conforme : les viandes hachées à +5 °C, le poisson frais à +4 °C. Conforme : les abats à +3 °C, les ovoproduits à +4 °C, la carcasse de bœuf à +7 °C."}),

  screen({id:"arrete-congele",dossier:"temperatures",title:"Les températures du congelé",kicker:"Températures · 3",codes:[CODES],level:"comprendre",
    text:"Au congelé, la limite est aussi un maximum, sans minimum : plus froid est toujours accepté. Pour les glaces, les viandes hachées et le poisson congelés, c’est −18 °C. Les autres denrées congelées : −12 °C.",
    prompt:"Lisez le tableau. Retenez −18 °C : c’est le chiffre qui revient le plus.",
    render:()=>tableMarkup("Denrées congelées : température maximale",["Denrée","Maximum"],[["Glaces, crèmes glacées","−18 °C"],["Viandes hachées et préparations de viandes congelées","−18 °C"],["Produits de la pêche congelés","−18 °C"],["Autres denrées congelées","−12 °C"]])+"<p class=\"source\">Source : arrêté du 21/12/2009, annexe I (Légifrance). Pour les viandes hachées et le poisson, la colonne remise directe et restauration collective donne −18 °C. Une denrée surgelée se conserve à −18 °C (corrigé d’un sujet d’examen du fonds). Pendant un chargement, une brève remontée est admise si l’écart ne dépasse pas +3 °C en surface.</p>"}),

  screen({id:"lire-congele",dossier:"temperatures",title:"Congelé : conforme ou non ?",kicker:"Températures · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Même lecture qu’au réfrigéré, avec des nombres négatifs. −20 °C est plus froid que −18 °C. −15 °C est plus chaud.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez « Conforme » ou « Non conforme ».",
    render:()=>sortMarkup(congLignes,CONG,congExemple),wire:()=>wireSort(congLignes),
    correction:"Non conforme : glaces à −15 °C, steak haché à −10 °C, plat cuisiné à −9 °C. Conforme : poisson à −18 °C, plat cuisiné à −14 °C."}),

  screen({id:"qui-decide",dossier:"temperatures",title:"Qui choisit la température ?",kicker:"Températures · 5",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Vous ne fixez pas la température des produits : l’exploitant la choisit, dans le cadre de l’arrêté. Une autre température que celle du tableau n’est admise que si un guide de bonnes pratiques d’hygiène validé, ou une analyse des dangers validée, le prévoit (article 3 de l’arrêté). Vous réglez la chambre, vous la mesurez, et vous la tenez.",
    prompt:"Cliquez à quelle condition une température différente de celle du tableau est admise.",
    quiz:{choices:["Le frigoriste décide, d’après son expérience.","L’exploitant décide seul, au jugé.","Un guide de bonnes pratiques d’hygiène validé, ou une analyse des dangers validée, le permet.","Jamais : le tableau ne laisse aucune exception."],good:2,explain:"L’article 3 de l’arrêté accepte une autre température si un guide de bonnes pratiques d’hygiène validé, ou une analyse des dangers validée, le prévoit."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"quatre-categories",dossier:"chambres",title:"Chaque produit, sa chambre",kicker:"Chaque produit · 1",codes:[CODES],level:"comprendre",
    text:"L’humidité de l’air compte autant que la température. Un document de cours classe les produits en quatre catégories, selon l’humidité relative dont ils ont besoin. Humidité relative : la part d’eau que l’air contient. Des produits qui n’ont pas les mêmes besoins ne vont pas dans la même chambre.",
    prompt:"Lisez le tableau. Retenez : catégorie 1, l’air le plus humide ; catégorie 4, l’air le plus sec.",
    render:()=>tableMarkup("Quatre catégories de conservation",["Catégorie","Humidité relative","Exemples"],[["1 · très haute","de 90 % à 95 %","poissons frais, coquillages, champignons, légumes feuillus (asperges, céleri), fruits stockés longtemps"],["2 · haute","de 85 % à 90 %","viande fraîche en carcasse, gibier, jambon frais, huîtres, agrumes"],["3 · moyenne","de 80 % à 85 %","denrées de restauration, poissons sous glace, viande en quartier, volaille fraîche, œufs, oignons frais"],["4 · basse","80 % et moins","lait, crème, conserves, boissons en bouteille, produits dans un emballage étanche"]])+"<p class=\"source\">Source : tableau « conservation denrées », fonds de F. Henninot (document de cours, auteur non cité).</p>"}),

  screen({id:"ranger-par-categorie",dossier:"chambres",title:"Ranger par catégorie",kicker:"Chaque produit · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Chaque produit va dans la chambre dont l’air a la bonne humidité. Cherchez-le dans le tableau de l’écran précédent.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les six autres : cliquez la catégorie.",
    render:()=>sortMarkup(catLignes,CATS,catExemple),wire:()=>wireSort(catLignes),
    correction:"Poisson frais : 1. Jambon frais, carcasses de gibier : 2. Oignons frais : 3. Lait, crème, conserves : 4."}),

  screen({id:"air-trop-sec",dossier:"chambres",title:"Un air trop sec",kicker:"Chaque produit · 3",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Un évaporateur trop froid par rapport à la chambre sèche l’air : l’eau se dépose sur lui, en givre. Les produits qui ont besoin d’air humide se dessèchent.",
    prompt:"Les légumes à feuilles (catégorie 1) restent dans une chambre à l’air trop sec. Cliquez ce qui leur arrive.",
    quiz:{choices:["Ils se dessèchent et perdent du poids.","Ils gèlent à cœur en une nuit.","Rien : seule la température compte.","Ils moisissent tout de suite."],good:0,explain:"L’air trop sec reprend l’eau des produits. Le corrigé d’un sujet d’examen cite la déshydratation parmi les altérations de l’entreposage."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"chaine-du-froid",dossier:"chaine",title:"La chaîne du froid",kicker:"Chaîne du froid · 1",codes:[CODES],level:"comprendre",
    text:"La chaîne du froid, c’est le trajet du produit, du fournisseur à l’assiette, sans jamais dépasser sa température maximale. Une seule rupture suffit : le froid freine les micro-organismes, mais dès que ça se réchauffe, ils repartent.",
    prompt:"Lisez les quatre maillons. L’écran suivant vous fait repérer des ruptures.",
    render:()=>cardsMarkup([
      {title:"Le transport",rows:[["On vérifie :","la température du camion et du produit."],["Rupture si :","le produit attend au soleil ou sur le quai."]]},
      {title:"La réception",rows:[["On fait :","mesurer le produit, puis le ranger tout de suite au froid."],["Rupture si :","il reste dans la cuisine."]]},
      {title:"La chambre froide",rows:[["On tient :","la température de consigne, porte fermée."],["On note :","un relevé le matin et le soir dans un carnet."]]},
      {title:"Le service",rows:[["On sort :","au plus près de l’utilisation."],["Jamais :","remettre au froid un produit décongelé."]]},
    ])+"<p class=\"source\">Le carnet de relevés quotidiens évite les dérives (document « Froid commercial et chambres froides »). Un produit décongelé ne se recongèle pas : arrêté du 21/12/2009, annexe VI.</p>"}),

  screen({id:"rupture-ou-non",dossier:"chaine",title:"Rupture ou chaîne tenue ?",kicker:"Chaîne du froid · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Une rupture, c’est un moment où le produit dépasse sa température maximale assez longtemps pour se réchauffer.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez « Rupture » ou « Chaîne tenue ».",
    render:()=>sortMarkup(chaineLignes,CHAINE,chaineExemple),wire:()=>wireSort(chaineLignes),
    correction:"Rupture : la chambre en panne, le décongelé remis au froid, la porte grande ouverte. Chaîne tenue : le camion à bonne température, le chargement de quelques minutes."}),

  screen({id:"derive-du-matin",dossier:"chaine",title:"La chambre dérive : que faites-vous ?",kicker:"Chaîne du froid · 3",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Un thermomètre trop chaud ne dit pas tout seul pourquoi. Une porte entrouverte, un dégivrage en cours, un groupe à l’arrêt : il faut chercher avant d’agir. Et l’exploitant doit savoir ce que risquent ses denrées.",
    prompt:"À 8 h, une chambre positive affiche +9 °C pour une consigne de +3 °C. Cliquez ce que vous faites en premier.",
    render:()=>choiceMarkup([{title:"Je baisse la consigne à 0 °C",note:"Pour rattraper vite"},{title:"Je note l’heure et la valeur, je cherche la cause, je préviens l’exploitant",note:"Porte, dégivrage, groupe à l’arrêt"},{title:"Je ne fais rien",note:"C’est normal le matin"}]),
    wire:()=>wireChoice(1,["Changer la consigne ne soigne pas la cause, et peut faire geler les produits. On cherche d’abord pourquoi la chambre chauffe.","On note ce qu’on voit, on cherche la cause (porte entrouverte, dégivrage en cours, groupe arrêté) et on prévient l’exploitant : ce sont ses denrées.","+9 °C dépasse tous les maximums du réfrigéré : ce n’est pas normal."]),
    correction:"Noter l’heure et la valeur, chercher la cause (porte, dégivrage, groupe) et prévenir l’exploitant."}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : une seule chambre pour des produits qui n’ont pas les mêmes besoins.",
    prompt:"Seul : écrivez vos trois réponses (températures maximales, ce que vous répondez au cuisinier, ce qu’il doit noter). Puis comparez avec la réponse type.",
    render:()=>cas+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : steaks hachés et poisson à +2 °C maximum, air humide pour les légumes, relevés chaque jour."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis continuer",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Le froid freine les micro-organismes, il ne les tue pas. Les températures sont des maximums fixés par l’arrêté du 21/12/2009. Chaque produit a besoin d’un air plus ou moins humide. Une seule rupture de la chaîne du froid suffit.",
    prompt:"Pour continuer : ouvrez l’une des trois suites.",
    render:()=>liensMarkup([{href:"../positif-negatif-interactif/index.html",title:"Positif, négatif, congélation, surgélation",note:"Ce que le froid fait au produit"},{href:"../chambre-froide-enceinte-interactif/index.html",title:"La chambre froide, enceinte isotherme",note:"Panneaux, porte, soupape, implantation"},{href:"../chaleur-interactive/index.html",title:"Du glaçon au circuit",note:"Le cours sur la chaleur et le changement d’état"}])}),
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

