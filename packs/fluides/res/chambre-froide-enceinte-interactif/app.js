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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("chambre-froide-enceinte-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
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


/* ===== Les données de ce cours (chambre-froide-enceinte-interactif) ===== */
const dossiers = [
  { id:"panneaux", label:"Les panneaux", note:"quatre composants, une épaisseur" },
  { id:"porte", label:"La porte", note:"joint, secours, résistance, soupape" },
  { id:"implantation", label:"L’implantation", note:"où et comment poser" },
  { id:"bilan", label:"Bilan", note:"un cas, puis l’essentiel" },
];
const screenIllustrations = {
  "un-panneau": ["images/panneau-coupe.jpg", "Coupe d’un panneau isolant : les deux tôles et, sur le chant, les boîtiers d’assemblage."],
  "la-porte": ["images/porte-pivotante.jpg", "Dessin d’une porte de chambre froide pivotante, avec son huisserie."],
};
const PRINT = {
  titre: "La chambre froide, enceinte isotherme : panneaux, porte, soupape d’équilibrage, résistance de porte, implantation",
  codes: "Sert notamment pour : CAP IFCA, savoir associé S5.7 « Enceintes isothermes positives et négatives » · Bac Pro MFER (référentiel 2028), savoir S4.1.5 « Les chambres froides ».",
  loi: "ce cours ne cite aucun texte réglementaire. Les valeurs (épaisseurs, écarts, distances) viennent de documents de cours et d’une fiche de constructeur : la notice du fabricant de la chambre prime toujours.",
};
const CODES = "CAP S5.7 · Bac S4.1.5";

/* ---- Les données des activités ---- */
const COMPO = ["Revêtement", "Isolant", "Assemblage", "Joint"];
const compoExemple = { text: "De la mousse de polyuréthane injectée entre les deux tôles", good: 1, why: "C’est l’isolant : il empêche la chaleur de la salle d’entrer dans la chambre." };
const compoLignes = [
  { text: "Une tôle prélaquée cuite au four, facile à nettoyer", good: 0, why: "Le revêtement résiste à la corrosion et se nettoie facilement.", bad: "La tôle laquée qui se nettoie est le revêtement." },
  { text: "Une came et un axe : un quart de tour de clé serre deux panneaux", good: 2, why: "C’est le système d’assemblage, placé dans un boîtier sur le chant du panneau.", bad: "Ce qui serre deux panneaux ensemble, c’est l’assemblage." },
  { text: "Une double protection contre les pertes de chaleur, posée au bord de chaque paroi", good: 3, why: "Les joints d’étanchéité, une fois deux panneaux assemblés.", bad: "Au bord de chaque paroi, ce qui rend la jonction étanche, ce sont les joints." },
  { text: "Il garde le froid dedans : plus il est épais, plus la chambre peut être froide", good: 1, why: "L’épaisseur d’isolant décide de l’écart de température que la paroi supporte.", bad: "Ce qui garde le froid dedans est l’isolant." },
  { text: "Il protège la tôle de la rouille", good: 0, why: "C’est la fonction du revêtement.", bad: "La protection contre la corrosion vient du revêtement." },
];
const EPAIS = ["60 mm", "105 mm", "150 mm"];
const epaisExemple = { text: "Chambre à +3 °C dans un local à +30 °C : écart de 27 K", good: 0, why: "27 K est sous 35 K : 60 mm suffisent." };
const epaisLignes = [
  { text: "Chambre à −20 °C dans un local à +30 °C : écart de 50 K", good: 1, why: "50 K dépasse 35 K mais reste sous 60 K : 105 mm.", bad: "50 K dépasse ce que 60 mm acceptent (35 K) et reste sous 60 K : il faut 105 mm." },
  { text: "Chambre à +4 °C dans un local à +25 °C : écart de 21 K", good: 0, why: "21 K est sous 35 K : 60 mm suffisent.", bad: "21 K est sous 35 K : l’épaisseur de 60 mm suffit." },
  { text: "Chambre à −25 °C dans un local à +35 °C : écart de 60 K", good: 1, why: "60 K est juste la limite des 105 mm.", bad: "60 K correspond aux 105 mm. 150 mm ne sont pas nécessaires." },
  { text: "Chambre à −25 °C dans un local à +40 °C : écart de 65 K", good: 2, why: "65 K dépasse les 60 K de 105 mm : il faut 150 mm.", bad: "65 K dépasse ce que 105 mm acceptent (60 K) : il faut 150 mm." },
];
const OUINON = ["Oui", "Non"];
const implExemple = { text: "Poser une chambre à +3 °C dans une réserve à +20 °C, avec 50 mm de vide jusqu’au mur", good: 0, why: "Le local est à +20 °C, au-dessus de 0 °C : 50 mm au moins, c’est bon. Oui." };
const implLignes = [
  { text: "Poser une chambre à −20 °C directement sur un sol en béton", good: 1, why: "Sous −5 °C, le sol gèle : il faut des plaques de protection antigel ou un chauffage du sol.", bad: "En dessous de −5 °C, le sol gèle. Le constructeur demande des plaques antigel ou un chauffage du sol." },
  { text: "Poser une chambre à −20 °C dans une réserve à +30 °C, avec 50 mm de vide jusqu’au mur", good: 0, why: "C’est la température du local qui décide : +30 °C est au-dessus de 0 °C, 50 mm suffisent.", bad: "La règle suit la température du local (+30 °C), pas celle de la chambre : 50 mm suffisent." },
  { text: "Poser une chambre dans un local à −5 °C, avec 50 mm de vide jusqu’au mur", good: 1, why: "Un local sous 0 °C demande 100 mm.", bad: "Sous 0 °C, le local demande 100 mm, pas 50." },
  { text: "Placer le groupe frigorifique dans un local bien aéré", good: 0, why: "La chaleur du groupe doit pouvoir partir : sinon le local chauffe et le groupe consomme plus.", bad: "Un local aéré évacue la chaleur du groupe : c’est ce qu’il faut." },
  { text: "Suspendre un lourd rail à viande au plafond de la chambre, sans renfort", good: 1, why: "Les panneaux de plafond ne sont pas faits pour porter des charges en plus : il faut un renfort.", bad: "Le plafond de la chambre ne porte pas de charge en plus sans renfort." },
  { text: "Poser la chambre contre un four", good: 1, why: "Une source de chaleur proche augmente les pertes : il faut l’éviter.", bad: "Il faut éviter la proximité d’un four ou du soleil." },
];

const casSeul = "<div class=\"cas-boite\"><strong>Le cas.</strong> Un restaurateur veut une chambre négative à −20 °C dans une réserve à +30 °C, sur un sol en béton, collée au mur du fond. Le groupe irait dans un placard fermé. La porte donne sur un couloir où passent des chariots.</div>";
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Panneaux :</b> écart 50 K, donc 105 mm d’isolant (60 mm ne suffisent pas, ils vont jusqu’à 35 K).</li><li><b>Porte :</b> une porte prévue pour le négatif (120 mm de mousse), avec résistance de cadre pour éviter le givre, et une soupape d’équilibrage. L’ouverture de secours se rouvre toujours de l’intérieur.</li><li><b>Sol :</b> sous −5 °C, plaques antigel ou chauffage du sol : pas de pose directe sur le béton.</li><li><b>Dégagements :</b> 50 mm de vide avec le mur : c’est la température du local (+30 °C, au-dessus de 0 °C) qui décide, pas celle de la chambre ; le groupe dans un local aéré, pas dans un placard fermé ; porte adaptée au trafic des chariots.</li></ol>";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"un-panneau",dossier:"panneaux",title:"Une chambre, des panneaux",kicker:"Les panneaux · 1",codes:[CODES],level:"comprendre",
    text:"Une chambre froide moderne se monte comme un jeu de construction : des panneaux préfabriqués en usine. Chaque panneau réunit quatre composants. On parle d’enceinte isotherme : une enceinte qui garde sa température.",
    prompt:"Lisez les quatre cartes. L’écran suivant vous fait retrouver chaque composant.",
    render:()=>cardsMarkup([
      {title:"Le revêtement",rows:[["C’est :","une tôle prélaquée, cuite au four."],["Il sert à :","résister à la corrosion, se nettoyer."]]},
      {title:"L’isolant",rows:[["C’est :","de la mousse de polyuréthane, injectée entre les deux tôles."],["Il sert à :","empêcher la chaleur d’entrer."]]},
      {title:"L’assemblage",rows:[["C’est :","une came et un axe dans un boîtier sur le chant."],["Il sert à :","serrer deux panneaux d’un quart de tour de clé."]]},
      {title:"Les joints",rows:[["C’est :","un joint au bord de chaque paroi."],["Il sert à :","doubler la protection contre les pertes de chaleur."]]},
    ],"deux")+"<p class=\"source\">Source : document « Chambres froides, généralités » (AFPA, 2001, fonds de F. Henninot).</p>"}),

  screen({id:"composants",dossier:"panneaux",title:"Quel composant fait quoi ?",kicker:"Les panneaux · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Quatre composants : le revêtement, l’isolant, l’assemblage, le joint. Chacun a un rôle bien à lui.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez le composant.",
    render:()=>sortMarkup(compoLignes,COMPO,compoExemple),wire:()=>wireSort(compoLignes),
    correction:"Revêtement : tôle laquée, protection contre la rouille. Isolant : garde le froid dedans. Assemblage : came et axe. Joint : double protection au bord."}),

  screen({id:"epaisseur-lire",dossier:"panneaux",title:"Quelle épaisseur d’isolant ?",kicker:"Les panneaux · 3",codes:[CODES],level:"comprendre",
    text:"Plus l’écart de température entre la chambre et le local est grand, plus l’isolant doit être épais. Le coefficient K dit combien de chaleur traverse 1 m² de paroi pour 1 K d’écart : plus il est petit, mieux la paroi isole.",
    prompt:"Lisez le tableau. Une épaisseur convient jusqu’à un écart maximal.",
    render:()=>tableMarkup("Trois épaisseurs d’isolant (série d’un constructeur)",["Épaisseur","Écart de température accepté","Coefficient K"],[["60 mm","35 K (35 °C d’écart)","0,360 W/m²·K"],["105 mm","60 K","0,211 W/m²·K"],["150 mm","95 K","0,149 W/m²·K"]])+"<p class=\"source\">Source : document « Chambres froides, généralités » (AFPA, 2001). En pratique, d’après le document « Froid commercial et chambres froides » : environ 60 mm en positif et 100 mm en négatif. Un écart de 1 K est un écart de 1 °C.</p>"}),

  screen({id:"epaisseur-choisir",dossier:"panneaux",title:"Choisir l’épaisseur",kicker:"Les panneaux · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Calculez l’écart : température du local moins température de la chambre. Puis cherchez la plus petite épaisseur qui l’accepte.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les quatre autres : cliquez l’épaisseur.",
    render:()=>sortMarkup(epaisLignes,EPAIS,epaisExemple),wire:()=>wireSort(epaisLignes),
    correction:"−20 °C dans +30 °C : écart 50 K, 105 mm. +4 °C dans +25 °C : écart 21 K, 60 mm. −25 °C dans +35 °C : 60 K, 105 mm. −25 °C dans +40 °C : 65 K, 150 mm."}),

  screen({id:"la-porte",dossier:"porte",title:"La porte d’une chambre froide",kicker:"La porte · 1",codes:[CODES],level:"comprendre",
    text:"La porte est le point faible : c’est par elle que la chaleur entre. Elle a la même mousse isolante, mais plus épaisse en négatif. Elle se ferme à clé, et elle se rouvre toujours de l’intérieur.",
    prompt:"Lisez les cartes. Retenez la dernière : l’ouverture de secours.",
    render:()=>cardsMarkup([
      {title:"Isolant",rows:[["Positif :","60 mm de mousse."],["Négatif :","120 mm de mousse."]]},
      {title:"Étanchéité",rows:[["Sur trois côtés :","un bourrelet en caoutchouc."],["En bas :","un balai racleur."]]},
      {title:"Fermeture",rows:[["À clé :","oui."],["De l’intérieur :","un système de décondamnation : une personne enfermée peut sortir."]]},
    ],"deux")+"<p class=\"source\">Source : AFPA 2001, portes pivotantes (60 mm ou 120 mm selon positif ou négatif). Une fiche de constructeur ajoute un dispositif d’ouverture de secours depuis l’intérieur de la porte fermée.</p>"}),

  screen({id:"quelle-porte",dossier:"porte",title:"Quelle porte pour quel passage ?",kicker:"La porte · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Le choix dépend du passage. Pivotante : le cas courant. Coulissante : passage étroit. Va-et-vient : passage fréquent de personnes ou de chariots. À lanières : freine les pertes quand on passe souvent.",
    prompt:"Une cuisine de collectivité : des chariots passent toute la journée. Cliquez la porte qui convient.",
    render:()=>choiceMarkup([{title:"Pivotante, fermée à clé",note:"La porte courante"},{title:"Va-et-vient à double effet",note:"Hublot, protection en bas"},{title:"Iso-plane de bureau",note:"Cadre aluminium, 25 mm"}]),
    wire:()=>wireChoice(1,["Une porte pivotante s’ouvre et se ferme à la main : à chaque passage de chariot, elle reste ouverte ou attend.","Elle est faite pour le passage fréquent des personnes et des chariots : battants à double effet, hublot, protection basse.","L’iso-plane (25 mm) sert aux locaux administratifs voisins, pas à une chambre qui travaille."]),
    correction:"Va-et-vient : battants à double effet, hublot, protection en bas, pour les chariots."}),

  screen({id:"soupape",dossier:"porte",title:"La soupape d’équilibrage",kicker:"La porte · 3",codes:[CODES],level:"comprendre",
    text:"Quand on ouvre la porte, de l’air chaud entre. Une fois la porte fermée, cet air se refroidit et se contracte : la pression baisse à l’intérieur. La soupape laisse passer un peu d’air pour égaliser la pression. Sans elle, la porte se plaque et s’ouvre mal.",
    prompt:"Lisez les trois repères. L’écran suivant vous les fait appliquer.",
    render:()=>cardsMarkup([
      {title:"Où ?",rows:[["Dans :","le cadre de la porte, près du thermomètre et de l’interrupteur de lumière."]]},
      {title:"Quel modèle ?",rows:[["Deux versions :","avec ou sans chauffage. Le chauffage empêche le givre de la bloquer en chambre négative."]]},
      {title:"Quelle taille ?",rows:[["Une soupape :","pour une puissance frigorifique jusqu’à 5 kW (un constructeur)."],["Au-delà :","une plus grande, ou plusieurs."]]},
    ])+"<p class=\"source\">Source : fiche d’un constructeur de chambres froides (tableau de commande avec clapet compensateur de pression, ajusté jusqu’à 5 kW). Le rôle de la soupape est expliqué d’après la pratique du métier.</p>"}),

  screen({id:"soupape-quiz",dossier:"porte",title:"Sans soupape, que se passe-t-il ?",kicker:"La porte · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"L’air chaud entré par la porte se refroidit et se contracte. Qu’arrive-t-il dans la chambre fermée sans soupape ?",
    prompt:"Cliquez la bonne conséquence.",
    quiz:{choices:["Une dépression : la porte se plaque et s’ouvre difficilement.","La chambre monte en température.","Le compresseur s’arrête de lui-même.","Le givre de l’évaporateur disparaît."],good:0,explain:"L’air froid occupe moins de place : la pression baisse. Le joint plaque la porte, et les panneaux peuvent souffrir. La soupape laisse entrer un peu d’air pour égaliser."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"resistance-de-porte",dossier:"porte",title:"La résistance de porte",kicker:"La porte · 5",codes:[CODES],level:"comprendre",
    text:"En chambre négative, l’humidité de l’air qui entre gèle sur le joint et le cadre : la porte colle, le sol devient glissant. Des câbles chauffants dans le cadre l’empêchent. On les réserve aux chambres négatives, avec une horloge pour couper.",
    prompt:"Lisez les trois consignes. L’écran suivant vous les fait appliquer.",
    render:()=>cardsMarkup([
      {title:"Pourquoi",rows:[["Le givre :","colle les portes et rend le sol glissant (risque de chute)."]]},
      {title:"Pour qui",rows:[["Les chambres :","négatives seulement."],["En positif :","la porte ne givre pas : de l’énergie perdue."]]},
      {title:"Comment",rows:[["À contrôler :","la température à tenir et les horaires."],["Exemple :","horloge, 15 minutes en marche puis 15 minutes à l’arrêt."]]},
    ])+"<p class=\"source\">Source : document « Froid commercial et chambres froides » (câbles chauffants des portes et du sol). Le cadre de porte chauffant est aussi proposé par la fiche du constructeur.</p>"}),

  screen({id:"resistance-quiz",dossier:"porte",title:"Une résistance de porte, ou pas ?",kicker:"La porte · 6",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Une résistance de porte consomme de l’électricité en permanence. Elle doit servir à quelque chose.",
    prompt:"Une chambre positive à +3 °C. Le client demande une résistance de porte « par sécurité ». Cliquez votre réponse.",
    render:()=>choiceMarkup([{title:"Oui, on en met toujours",note:"Au cas où"},{title:"Non : à +3 °C la porte ne givre pas",note:"On réserve la résistance au négatif"},{title:"Oui, pour réchauffer la chambre",note:"Elle aide le froid"}]),
    wire:()=>wireChoice(1,["Systématique serait un gaspillage : elle consomme sans servir à rien en positif.","À +3 °C, aucun givre ne se forme sur le joint : la résistance est réservée aux chambres négatives.","Une résistance de porte chauffe le cadre, pas la chambre : elle ne « réchauffe » rien d’utile et coûte de l’énergie."]),
    correction:"Non : en positif la porte ne givre pas, la résistance de porte est réservée au négatif."}),

  screen({id:"implanter-regles",dossier:"implantation",title:"Où et comment poser la chambre",kicker:"L’implantation · 1",codes:[CODES],level:"comprendre",
    text:"On pose la chambre loin des sources de chaleur, sur un sol qui ne gèle pas, avec un vide autour, et un groupe bien aéré. Chaque règle a une raison.",
    prompt:"Lisez les quatre cartes. L’écran suivant vous les fait appliquer.",
    render:()=>cardsMarkup([
      {title:"Le vide autour",rows:[["Il dépend du local,","pas de la chambre : c’est la température de la pièce où on la pose."],["Local au-dessus de 0 °C :","50 mm au moins entre chambre et mur ou plafond."],["Local sous 0 °C :","100 mm."]]},
      {title:"Le sol",rows:[["Chambre sous −5 °C :","plaques de protection antigel, ou chauffage du sol."],["Sans éléments de sol :","seulement au-dessus de 0 °C."]]},
      {title:"Le local",rows:[["Du groupe :","bien aéré, pour évacuer sa chaleur."],["À éviter :","four, soleil, humidité proche."]]},
      {title:"Le plafond",rows:[["Les panneaux :","ne portent pas de charge en plus (groupe, rails, tuyaux) sans renfort."]]},
    ],"deux")+"<p class=\"source\">Source : fiche d’un constructeur (montage) et document « Froid commercial et chambres froides » (disposition des chambres). Les distances viennent du constructeur : la notice de votre chambre prime.</p>"}),

  screen({id:"implanter-exo",dossier:"implantation",title:"Cette pose est-elle bonne ?",kicker:"L’implantation · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Appliquez les quatre règles de l’écran précédent.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les six autres : cliquez « Oui » si la pose est bonne, « Non » sinon.",
    render:()=>sortMarkup(implLignes,OUINON,implExemple),wire:()=>wireSort(implLignes),
    correction:"Oui : 50 mm dans un local à +30 °C, le groupe dans un local aéré. Non : pose directe à −20 °C sur le béton, 50 mm dans un local à −5 °C (il faut 100), charge au plafond sans renfort, chambre contre un four."}),

  screen({id:"position-porte",dossier:"implantation",title:"Lire la position de la porte",kicker:"L’implantation · 3",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"La porte se place à l’endroit voulu sur la paroi. Le plan donne deux cotes : la distance à gauche de la porte et la distance à droite, en millimètres. Leur somme est la longueur de la paroi : ici 2 100 mm.",
    prompt:"Lisez l’exemple résolu (position C), puis cliquez la position qui convient pour 1 200 mm à gauche et 900 mm à droite.",
    render:()=>exempleMarkup({text:"Position C : 600 mm à gauche de la porte, 1 500 mm à droite",answer:"600 + 1 500 = 2 100 mm",why:"Les deux cotes font toujours 2 100 mm : la porte coulisse le long de la paroi."})+tableMarkup("Positions de la porte sur la paroi de 2 100 mm (cotes en mm)",["Position","À gauche","À droite"],[["A","0","2 100"],["B","300","1 800"],["C","600","1 500"],["D","900","1 200"],["E","1 200","900"],["F","1 500","600"],["G","1 800","300"],["H","2 100","0"]])+choiceMarkup([{title:"Position D",note:"900 à gauche, 1 200 à droite"},{title:"Position E",note:"1 200 à gauche, 900 à droite"},{title:"Position F",note:"1 500 à gauche, 600 à droite"}])+"<p class=\"source\">Source : plan « Chambre froide implantation porte » (fonds de F. Henninot, plan de constructeur : plan, plafond, sol, vue de face, douze positions de porte).</p>",
    wire:()=>wireChoice(1,["En D, il y a 900 mm à gauche, pas 1 200 : vous avez inversé les deux cotes.","1 200 à gauche et 900 à droite : c’est la position E.","En F, il y a 1 500 à gauche : cherchez la ligne avec 1 200 à gauche."]),
    correction:"Position E : 1 200 mm à gauche et 900 mm à droite (1 200 + 900 = 2 100)."}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : une chambre négative à installer dans une réserve chaude.",
    prompt:"Seul : écrivez vos conseils (épaisseur, porte, sol, dégagements et groupe). Puis comparez avec la réponse type.",
    render:()=>casSeul+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : 105 mm, porte négative avec résistance et soupape, plaques antigel, 50 mm de vide (local à +30 °C), groupe aéré."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis continuer",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Quatre composants par panneau. Une épaisseur choisie selon l’écart de température. Une porte qui se rouvre toujours de l’intérieur, avec une soupape d’équilibrage, et une résistance seulement en négatif. Du vide autour, un sol qui ne gèle pas, un groupe aéré.",
    prompt:"Pour continuer : ouvrez l’une des trois suites.",
    render:()=>liensMarkup([{href:"../chambre-froide-securites-interactif/index.html",title:"Dégivrage, condensats et sécurités de la chambre",note:"La suite : l’évaporateur, l’eau, la personne enfermée"},{href:"../conservation-denrees-interactif/index.html",title:"Conserver les denrées par le froid",note:"Pourquoi on garde cette température"},{href:"../evaporateur-interactif/index.html",title:"L’évaporateur",note:"Givre et dégivrage, côté machine"}])}),
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

