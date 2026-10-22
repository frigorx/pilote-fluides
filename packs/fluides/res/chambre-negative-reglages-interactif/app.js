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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("chambre-negative-reglages-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
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


/* ===== Les données de ce cours (chambre-negative-reglages-interactif) ===== */
const dossiers = [
  { id:"decor", label:"Le décor", note:"les organes de réglage" },
  { id:"releves", label:"Les relevés", note:"lire, calculer, conclure" },
  { id:"regulation", label:"La régulation", note:"thermostat et pressostats" },
  { id:"degivrage", label:"Le dégivrage", note:"durée, nombre, fin" },
  { id:"bilan", label:"Bilan", note:"un cas, puis le poste" },
];
const screenIllustrations = {};
const PRINT = {
  titre: "Relevés et réglages d’une chambre négative : thermostat, pressostats, dégivrage",
  codes: "Sert notamment pour : titre professionnel Monteur dépanneur frigoriste, CP3 « Mettre en service une installation frigorifique monoposte à température négative » · Bac Pro MFER (référentiel 2028), tâche A2T7 « Réaliser la mise en service de l’installation » (compétences liées dans la matrice : C7 « Mettre en service une installation », C8 « Contrôler, régler et paramétrer l’installation »).",
  loi: "ce cours ne cite aucun texte réglementaire. Les pressions sont celles des tables du simulateur de réglage des pressostats du réseau (pressions effectives, R-449A : basse pression lue à la rosée, haute pression lue à la bulle) ; la notice de l’installation prime.",
};
const CODES = "TP MDF CP3 · Bac A2T7";

/* Tables du réseau (simulateur de réglage des pressostats) : R-449A, pressions EFFECTIVES en bar. */
const TAB_BP = [["−30 °C", "0,59 bar"], ["−25 °C", "0,97 bar"], ["−20 °C", "1,43 bar"], ["−15 °C", "1,96 bar"]];
const TAB_HP = [["30 °C", "13,49 bar"], ["35 °C", "15,44 bar"], ["40 °C", "17,57 bar"], ["45 °C", "19,90 bar"]];
const tablesPT = () => "<div class=\"deux-col\">" + tableMarkup("Basse pression (BP) : lue à la rosée", ["Température d’évaporation", "Pression"], TAB_BP) + tableMarkup("Haute pression (HP) : lue à la bulle", ["Température de condensation", "Pression"], TAB_HP) + "</div>";
const symCard = (img, titre, lignes) => `<article class="carte carte-sym"><img class="symbole" src="${img.startsWith('../')?img:'images/'+img}" alt=""><div><h3>${esc(titre)}</h3>${lignes.map(l => `<p><strong>${esc(l[0])}</strong> ${esc(l[1])}</p>`).join("")}</div></article>`;

/* ---- Les données des activités ---- */
const ROLES = ["BP de régulation", "BP de sécurité", "HP de sécurité", "HP de régulation"];
const rolesExemple = { text: "Il arrête le compresseur si la pression d’aspiration devient trop basse (manque de fluide, fuite)", good: 1, why: "C’est la BP de sécurité : le compresseur ne doit pas tirer au vide." };
const rolesLignes = [
  { text: "Il arrête le compresseur quand l’évaporateur est vidé, puis le relance quand la pression remonte", good: 0, why: "C’est la BP de régulation : elle fait tourner le pump-down, cycle après cycle.", bad: "Ce pressostat travaille à chaque cycle : c’est la BP de régulation." },
  { text: "Il arrête le compresseur si la haute pression monte trop, avant la soupape", good: 2, why: "C’est la HP de sécurité : condenseur encrassé, ventilateur en panne.", bad: "Il coupe quand la haute pression est dangereuse : c’est la HP de sécurité." },
  { text: "Il met en route le ventilateur du condenseur quand la HP monte", good: 3, why: "C’est la HP de régulation : elle pilote le ventilateur.", bad: "Il commande le ventilateur du condenseur : c’est la HP de régulation." },
  { text: "Sa coupure se règle un peu au-dessus de celle du pressostat de sécurité", good: 0, why: "La BP de régulation coupe de 0,2 à 0,5 bar au-dessus de la BP de sécurité : ainsi la sécurité ne joue qu’en cas de défaut.", bad: "C’est la BP de régulation qui coupe un peu au-dessus de la BP de sécurité." },
];
const DEG = ["Le nombre", "La durée", "La fin (sonde)"];
const degExemple = { text: "Du givre reste en bas de la batterie à la fin du cycle", good: 1, why: "Le dégivrage s’arrête trop tôt : on allonge la durée." };
const degLignes = [
  { text: "L’évaporateur est presque propre avant le dégivrage suivant", good: 0, why: "Il y a peu de givre : on retarde, voire on supprime ce cycle, donc on réduit le nombre.", bad: "Il n’y a presque pas de givre avant le cycle : c’est le nombre de dégivrages qu’on réduit." },
  { text: "Sans sonde, le chauffage tourne encore dix minutes alors que le givre a disparu", good: 1, why: "La durée est trop longue : on la réduit, par pas de 5 minutes.", bad: "Chauffer dix minutes de trop, c’est une durée trop longue." },
  { text: "Le dégivrage s’arrête tout seul quand l’évaporateur atteint sa température de fin", good: 2, why: "C’est la fin de dégivrage par sonde : elle s’adapte au givre réel.", bad: "Ce qui arrête le dégivrage à une température, c’est la sonde de fin." },
  { text: "Du givre reste en haut de la batterie à la fin du cycle", good: 1, why: "Le givre reste : le cycle est trop court, on allonge la durée.", bad: "Du givre qui reste prouve que la durée est trop courte." },
];
const ordrePD = {
  items: ["La chambre atteint sa consigne : le thermostat ferme l’électrovanne de liquide.", "Le compresseur continue de tourner et vide l’évaporateur.", "La pression basse descend jusqu’à la coupure du pressostat BP : le compresseur s’arrête.", "La chambre se réchauffe : le thermostat rouvre l’électrovanne.", "La pression remonte jusqu’à l’enclenchement du pressostat BP : le compresseur repart."],
  shown: [3, 0, 4, 1, 2],
  hints: ["Tout commence quand la chambre est assez froide : le thermostat ferme l’électrovanne.", "Sans liquide, l’évaporateur se vide : le compresseur l’aspire encore.", "À la fin du vidage, la pression basse chute jusqu’à la coupure de la BP.", "À l’arrêt, la chambre se réchauffe : le thermostat rouvre l’électrovanne.", "Le liquide revient, la pression remonte jusqu’à l’enclenchement : le compresseur repart."],
};
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Surchauffe :</b> la BP de 0,59 bar donne −30 °C à l’évaporation (R-449A, rosée). Température d’aspiration −15 °C : surchauffe = −15 − (−30) = 15 K, bien au-dessus de 5 à 10 K.</li><li><b>Sous-refroidissement :</b> HP de 15,44 bar : 35 °C de condensation. Liquide à 34 °C : sous-refroidissement = 1 K, très en dessous de 4 à 8 K. Les bulles au voyant vont dans le même sens.</li><li><b>Conclusion :</b> quatre indices vont dans le même sens : il manque du fluide. La chambre ne descend pas parce que l’évaporateur est mal alimenté.</li><li><b>Suite :</b> je ne rajoute pas de fluide avant d’avoir cherché la fuite (détecteur, produit moussant), je la répare, puis je complète la charge et je note tout au registre.</li></ol>";
const cas = "<div class=\"cas-boite\"><strong>Le cas.</strong> Une chambre négative (R-449A, consigne −20 °C) affiche −12 °C après huit heures. Relevés : BP 0,59 bar · température d’aspiration −15 °C · HP 15,44 bar · température du liquide 34 °C · bulles au voyant liquide. Le compresseur tourne sans s’arrêter.</div>";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"les-organes",dossier:"decor",title:"Ce qui se règle sur une chambre négative",kicker:"Le décor · 1",codes:[CODES],level:"comprendre",
    text:"Une chambre négative à −20 °C tient sa température avec une régulation par pump-down : un thermostat, une électrovanne, des pressostats. Un dégivrage régulier enlève le givre. Voici les organes qu’on règle ou qu’on contrôle.",
    prompt:"Lisez les quatre cartes : voici les vrais organes. Les écrans suivants vous les font régler.",
    render:()=>"<div class=\"cartes sym-grille\">"+symCard("thermostat-chambre.jpg","Thermostat de la chambre",[["Règle :","la température, avec une consigne et un différentiel."],["Commande :","l’électrovanne de liquide."]])+symCard("electrovanne.jpg","Électrovanne de liquide",[["Rôle :","couper ou donner le liquide à l’évaporateur."]])+symCard("../illustrations/photo-pressostat-danfoss-kp2.jpeg","Pressostats BP et HP",[["BP :","arrêter et relancer le compresseur (régulation), ou le protéger (sécurité)."],["HP de sécurité :","le protéger d’une haute pression trop forte."],["HP de régulation :","mettre en route le ventilateur du condenseur quand la HP monte."]])+symCard("evaporateur-degivrage.jpg","Évaporateur et résistances de dégivrage",[["Rôle :","les résistances logées dans la batterie font fondre le givre."]])+"</div><p class=\"source\">Photos de composants réels, tirées de documents du fonds de F. Henninot. Chambre négative −20/−18 °C avec régulation pump-down : travaux pratiques de mise en service du fonds.</p>"}),

  screen({id:"lire-un-releve",dossier:"releves",title:"Lire un relevé de chambre négative",kicker:"Les relevés · 1",codes:[CODES],level:"comprendre",
    text:"Un relevé donne des pressions et des températures. Chaque pression se traduit en température grâce à la table du fluide. Deux écarts disent l’état de la machine : la surchauffe et le sous-refroidissement.",
    prompt:"Lisez l’exemple résolu, ligne par ligne. Les deux écrans suivants vous font refaire les deux calculs.",
    render:()=>tableMarkup("Exemple résolu : une chambre à −20 °C (R-449A)",["Relevé","Valeur","Ce qu’on en tire"],[["Température de la chambre","−20 °C","la consigne est atteinte"],["BP lue au manomètre","0,97 bar","évaporation à −25 °C (table)"],["Température d’aspiration","−18 °C","surchauffe = −18 − (−25) = 7 K"],["HP lue au manomètre","15,44 bar","condensation à 35 °C (table)"],["Température du liquide","30 °C","sous-refroidissement = 35 − 30 = 5 K"]])+tablesPT()+"<p class=\"source\">Tables du simulateur de réglage des pressostats du réseau : pressions effectives (celles du manomètre), valeurs pédagogiques. R-449A est un mélange : la BP se lit à la rosée, la HP à la bulle.</p>"}),

  screen({id:"calcul-surchauffe",dossier:"releves",title:"Calculer la surchauffe",kicker:"Les relevés · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Surchauffe = température d’aspiration moins température d’évaporation. Prenez la température d’évaporation dans la table de BP.",
    prompt:"Relevé : BP 1,43 bar, température d’aspiration −10 °C. Calculez la surchauffe, puis cliquez « Vérifier ».",
    render:()=>exempleMarkup({text:"BP 0,97 bar (évaporation −25 °C), aspiration −18 °C",answer:"−18 − (−25) = 7 K",why:"On lit la température d’évaporation dans la table, puis on soustrait."})+tablesPT()+numberMarkup("Votre surchauffe :","K"),
    wire:()=>wireNumber(10,0.2,"BP 1,43 bar : évaporation à −20 °C. −10 − (−20) = 10 K. C’est la limite haute de 5 à 10 K.","Cherchez 1,43 bar dans la table de BP : −20 °C. Puis −10 moins (−20), attention au signe moins."),
    correction:"Évaporation à −20 °C (1,43 bar). Surchauffe = −10 − (−20) = 10 K."}),

  screen({id:"calcul-sous-refroidissement",dossier:"releves",title:"Calculer le sous-refroidissement",kicker:"Les relevés · 3",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Sous-refroidissement = température de condensation moins température du liquide. Prenez la température de condensation dans la table de HP.",
    prompt:"Relevé : HP 17,57 bar, température du liquide 33 °C. Calculez le sous-refroidissement, puis cliquez « Vérifier ».",
    render:()=>exempleMarkup({text:"HP 15,44 bar (condensation 35 °C), liquide 30 °C",answer:"35 − 30 = 5 K",why:"On lit la température de condensation dans la table, puis on soustrait la température du liquide."})+tablesPT()+numberMarkup("Votre sous-refroidissement :","K"),
    wire:()=>wireNumber(7,0.2,"HP 17,57 bar : condensation à 40 °C. 40 − 33 = 7 K, dans la plage habituelle de 4 à 8 K.","Cherchez 17,57 bar dans la table de HP : 40 °C. Puis 40 moins 33."),
    correction:"Condensation à 40 °C (17,57 bar). Sous-refroidissement = 40 − 33 = 7 K."}),

  screen({id:"interpreter-releve",dossier:"releves",title:"Le relevé est-il normal ?",kicker:"Les relevés · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"D’habitude, la surchauffe se tient entre 5 et 10 K, le sous-refroidissement entre 4 et 8 K. Un seul chiffre hors plage ne prouve rien : c’est le groupe qui compte.",
    prompt:"Lisez l’exemple résolu, puis cliquez la conclusion pour le relevé « À vous ».",
    render:()=>exempleMarkup({text:"Surchauffe 7 K · sous-refroidissement 5 K · voyant clair",answer:"relevé normal",why:"Les deux valeurs sont dans leur plage, et le voyant est clair : rien à signaler."})+"<p class=\"cas\"><strong>À vous :</strong> surchauffe 8 K · sous-refroidissement 6 K · voyant clair · chambre à −20 °C. Que concluez-vous ?</p>"+choiceMarkup([{title:"Relevé normal",note:"Les deux valeurs sont dans leur plage"},{title:"Il manque du fluide",note:"Je cherche une fuite"},{title:"Il y a trop de fluide",note:"Je récupère du fluide"}]),
    wire:()=>wireChoice(0,["Surchauffe 8 K (entre 5 et 10), sous-refroidissement 6 K (entre 4 et 8), voyant clair : tout est dans sa plage.","Un manque de fluide donnerait une surchauffe haute, un sous-refroidissement très bas et des bulles. Ce n’est pas le cas.","Un trop-plein donnerait plutôt un sous-refroidissement très fort. Ici, il est normal."]),
    correction:"Relevé normal : surchauffe 8 K et sous-refroidissement 6 K sont dans leurs plages, le voyant est clair."}),

  screen({id:"pump-down-lire",dossier:"regulation",title:"Le pump-down : qui commande quoi",kicker:"La régulation · 1",codes:[CODES],level:"comprendre",
    text:"En pump-down, le thermostat ne commande pas le compresseur : il commande l’électrovanne de liquide. Le compresseur est arrêté, puis relancé, par le pressostat BP. Cinq temps se répètent, cycle après cycle.",
    prompt:"Lisez les cinq temps. L’écran suivant vous les fait remettre dans l’ordre.",
    render:()=>cardsMarkup([
      {title:"1 · La chambre est assez froide",rows:[["Le thermostat :","ferme l’électrovanne de liquide."]]},
      {title:"2 · L’évaporateur se vide",rows:[["Le compresseur :","continue de tourner et aspire le fluide restant."]]},
      {title:"3 · La BP coupe",rows:[["La pression basse :","descend jusqu’à la coupure du pressostat BP : le compresseur s’arrête."],["Réglage :","cette coupure est un peu au-dessus de celle de la BP de sécurité, de 0,2 à 0,5 bar : la sécurité ne joue qu’en cas de défaut."]]},
      {title:"4 · La chambre se réchauffe",rows:[["Le thermostat :","rouvre l’électrovanne de liquide."]]},
      {title:"5 · La BP relance",rows:[["La pression :","remonte jusqu’à l’enclenchement du pressostat BP : le compresseur repart."]]},
    ])+"<p class=\"source\">Source : simulateur « Le réglage des pressostats » du Tour de main (rôles des pressostats en pump-down).</p>"}),

  screen({id:"pump-down",dossier:"regulation",title:"Le pump-down, cycle après cycle",kicker:"La régulation · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Vous avez lu les cinq temps du pump-down. Remettez-les dans l’ordre où ils se passent.",
    prompt:"Cliquez les cinq temps du cycle dans l’ordre : d’abord le premier, puis le suivant.",
    render:()=>orderMarkup(ordrePD.items,ordrePD.shown),wire:()=>wireOrder(ordrePD.items,ordrePD.hints),
    correction:"Ordre : électrovanne fermée, évaporateur vidé, le compresseur s’arrête à la coupure de la BP, la chambre se réchauffe et l’électrovanne rouvre, la pression remonte et le compresseur repart."}),

  screen({id:"roles-pressostats",dossier:"regulation",title:"Quel pressostat fait quoi ?",kicker:"La régulation · 3",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Quatre pressostats, quatre rôles. Deux régulent, deux protègent. Un pressostat de sécurité ne sert jamais à régler la température.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les quatre autres : cliquez le pressostat.",
    render:()=>sortMarkup(rolesLignes,ROLES,rolesExemple),wire:()=>wireSort(rolesLignes),
    correction:"BP de régulation : arrête et relance le compresseur. HP de sécurité : coupe avant la soupape. HP de régulation : commande le ventilateur. BP de sécurité : ne régule jamais."}),

  screen({id:"thermostat",dossier:"regulation",title:"Régler le thermostat : consigne et différentiel",kicker:"La régulation · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"La consigne est la température visée. Le différentiel est l’écart entre la coupure et la remise en marche. Le thermostat ferme l’électrovanne à la consigne, et la rouvre quand la chambre a remonté du différentiel.",
    prompt:"Lisez l’exemple résolu, puis répondez au cas « À vous ».",
    render:()=>exempleMarkup({text:"Consigne −20 °C, différentiel 2 K",answer:"l’électrovanne se ferme à −20 °C et se rouvre à −18 °C",why:"−20 + 2 = −18. On retrouve bien la plage −20/−18 °C d’une chambre négative."})+numberMarkup("À vous : consigne −18 °C, différentiel 3 K. À quelle température le thermostat rouvre-t-il l’électrovanne ?","°C")+"<p class=\"source\">Plage −20/−18 °C : travaux pratiques de mise en service du fonds de F. Henninot.</p>",
    wire:()=>wireNumber(-15,0.2,"−18 + 3 = −15 °C : l’électrovanne se rouvre à −15 °C.","On part de la consigne : −18 puis on ajoute le différentiel de 3 K (la chambre doit remonter avant que le thermostat rouvre)."),
    correction:"−18 + 3 = −15 °C : l’électrovanne se rouvre à −15 °C."}),

  screen({id:"courts-cycles",dossier:"regulation",title:"Le compresseur démarre trop souvent",kicker:"La régulation · 5",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Un grand différentiel diminue la fréquence des cycles et prolonge la vie du compresseur. Un petit différentiel économise de l’électricité et tient mieux la température. Il faut trouver l’équilibre.",
    prompt:"Le compresseur démarre toutes les cinq minutes. Cliquez ce que vous réglez en premier.",
    render:()=>choiceMarkup([{title:"J’augmente un peu le différentiel du thermostat",note:"Les cycles s’espacent"},{title:"Je baisse la consigne de 5 K",note:"Pour tenir plus froid"},{title:"Je supprime le pressostat BP",note:"Il coupe trop souvent"}]),
    wire:()=>wireChoice(0,["Un différentiel plus large espace les cycles : le compresseur démarre moins souvent. On vérifie que la température reste dans les limites du produit.","Baisser la consigne ne change pas le nombre de démarrages et dépense plus d’énergie.","Le pressostat BP est le pilote du pump-down : le supprimer casse la régulation."]),
    correction:"J’augmente un peu le différentiel du thermostat : les cycles s’espacent. Source : document « Froid commercial et chambres froides »."}),

  screen({id:"pressostat-bp-regulation",dossier:"regulation",title:"Régler le pressostat BP de régulation",kicker:"La régulation · 6",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"La BP de régulation redémarre le compresseur quand la pression remonte à celle de la consigne de la chambre. Elle coupe un peu au-dessus de la BP de sécurité, de 0,2 à 0,5 bar. Le différentiel est l’écart entre les deux.",
    prompt:"Lisez l’exemple résolu, puis calculez le différentiel du cas « À vous ».",
    render:()=>exempleMarkup({text:"Chambre à −20 °C (R-449A, 1,43 bar). BP de sécurité : coupure à 0,2 bar. Écart choisi : 0,3 bar",answer:"coupure 0,2 + 0,3 = 0,5 bar ; différentiel 1,43 − 0,5 = 0,93 bar",why:"L’enclenchement est la pression à la consigne de la chambre. La coupure est celle de la BP de sécurité plus l’écart."})+tablesPT()+numberMarkup("À vous : même chambre, écart de 0,5 bar au lieu de 0,3. Différentiel ?","bar")+"<p class=\"source\">Règle du simulateur « Le réglage des pressostats » du Tour de main (procédure de F. Henninot) : l’écart de 0,2 à 0,5 bar est donné par le cas ; aucun constructeur ne le chiffre.</p>",
    wire:()=>wireNumber(0.73,0.02,"Coupure : 0,2 + 0,5 = 0,7 bar. Différentiel : 1,43 − 0,7 = 0,73 bar.","Coupure = 0,2 (sécurité) + 0,5 (écart) = 0,7 bar. Différentiel = 1,43 (enclenchement) moins la coupure."),
    correction:"Coupure 0,2 + 0,5 = 0,7 bar. Différentiel 1,43 − 0,7 = 0,73 bar."}),

  screen({id:"regler-degivrage",dossier:"degivrage",title:"Régler le dégivrage",kicker:"Le dégivrage · 1",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Trois réglages : le nombre de dégivrages par jour ; leur durée (sans sonde, c’est elle qui arrête le chauffage) ; la fin par sonde (la sonde arrête le dégivrage quand l’évaporateur atteint sa température de fin). D’abord un dégivrage complet, ensuite on économise. On observe l’évaporateur à la fin du cycle, de préférence en été.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les quatre autres : cliquez le réglage à toucher.",
    render:()=>sortMarkup(degLignes,DEG,degExemple)+"<p class=\"renvoi\">Pour le détail du dégivrage et de l’écoulement de l’eau : le cours <a href=\"../chambre-froide-securites-interactif/index.html?dossier=degivrage\">Dégivrage, eau et sécurités</a>.</p>",wire:()=>wireSort(degLignes),
    correction:"Le nombre : évaporateur presque propre avant le cycle. La durée : chauffage de trop, ou givre qui reste. La fin : la sonde arrête le dégivrage."}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : une chambre négative qui n’atteint pas sa consigne.",
    prompt:"Seul : calculez la surchauffe et le sous-refroidissement avec les tables, concluez, puis écrivez la suite. Comparez ensuite avec la réponse type.",
    render:()=>cas+tablesPT()+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : surchauffe 15 K, sous-refroidissement 1 K, bulles : il manque du fluide ; chercher la fuite avant de recharger."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis pratiquer au poste",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Une pression se lit en température grâce à la table. Surchauffe et sous-refroidissement disent s’il manque du fluide. Le thermostat commande l’électrovanne, la BP de régulation commande le compresseur. D’abord un dégivrage complet.",
    prompt:"Pour pratiquer au poste : ouvrez l’une des suites.",
    render:()=>liensMarkup([{href:"../../../../tour-de-main/simulateur/pressostat.html",title:"Le réglage des pressostats",note:"Le jeu de poste : calculer, régler, prouver"},{href:"../pressostat-bp-kp1/index.html",title:"Le pressostat BP KP1",note:"CUT OUT, CUT IN, différentiel"},{href:"../chambre-froide-securites-interactif/index.html",title:"Dégivrage, eau et sécurités",note:"La suite côté chambre"}])}),
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

