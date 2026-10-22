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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("cout-du-froid-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
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


/* ===== Les données de ce cours (cout-du-froid-interactif) ===== */
const dossiers = [
  { id:"electricite", label:"L’électricité", note:"estimer ce que ça coûte" },
  { id:"fuites", label:"Les fuites", note:"fluide, performance, climat" },
  { id:"entretien", label:"L’entretien", note:"ce qui rapporte" },
  { id:"devis", label:"Le devis", note:"chiffrer pour le client" },
  { id:"bilan", label:"Bilan", note:"un cas, puis l’essentiel" },
];
const screenIllustrations = {};
const PRINT = {
  titre: "Ce que coûte le froid : énergie, fuites, entretien",
  codes: "Sert notamment pour : Bac Pro MFER (référentiel 2028), savoir S2.3.1 « La dimension économique » (S2.3 : la démarche écoresponsable en entreprise ; S2 : enjeux énergétiques et environnementaux).",
  loi: "ce cours ne cite aucun texte réglementaire. Le prix du kilowattheure (0,20 € par kWh) est un prix d’exemple, pas un tarif. Les pourcentages de perte viennent du document « Froid commercial et chambres froides » ; le PRP du R-404A (3 922) est celui du réseau.",
};
const CODES = "Bac S2.3.1";
const PRIX = "0,20 €/kWh";

/* ---- Les données des activités ---- */
const GESTES = ["Économise", "Gaspille"];
const gestesExemple = { text: "Éteindre la lumière de la chambre en la quittant", good: 0, why: "L’éclairage est une charge de plus à évacuer par la machine : le couper économise." };
const gestesLignes = [
  { text: "Nettoyer le condenseur des feuilles et du pollen", good: 0, why: "Un condenseur propre échange mieux : le compresseur travaille moins.", bad: "Un condenseur encrassé fait perdre de l’efficacité : le nettoyer économise." },
  { text: "Laisser la porte ouverte pendant tout le rangement", good: 1, why: "L’air chaud entre, la machine doit le refroidir : c’est de l’énergie perdue.", bad: "Chaque minute de porte ouverte fait entrer de la chaleur : ça gaspille." },
  { text: "Garder un condenseur collé au mur dans une cave non ventilée", good: 1, why: "L’air chaud ne part pas : le compresseur tourne sans arrêt.", bad: "Un condenseur étouffé fait tourner le compresseur en permanence : ça gaspille." },
  { text: "Régler la température de stockage au plus juste", good: 0, why: "Plus froid que nécessaire coûte de l’énergie pour rien.", bad: "Régler au plus juste, dans le respect des maximums des denrées, économise." },
  { text: "Mettre une résistance de porte sur une chambre positive", good: 1, why: "Elle chauffe en permanence pour rien : la porte ne givre pas en positif.", bad: "En positif, la porte ne givre pas : la résistance consomme pour rien." },
];
const cas = "<div class=\"cas-boite\"><strong>Le cas.</strong> Un restaurateur a une chambre négative avec un compresseur de 2,2 kW (électrique, 60 % du temps en marche). Le condenseur est sur la terrasse, couvert de feuilles. Chaque année on lui « complète » 3 kg de R-404A. On estime à 15 % la perte due au condenseur encrassé. Prix de l’électricité d’exemple : 0,20 €/kWh.</div>";
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Électricité :</b> 8 760 h × 60 % × 2,2 kW × 0,20 € = 2 312,64 € par an environ.</li><li><b>Condenseur :</b> encrassé, il fait perdre de 12,5 % à 25 % d’efficacité : à 15 %, environ 350 € de plus par an. Un nettoyage coûte moins cher que cette perte.</li><li><b>Fuite :</b> 3 kg de R-404A perdus par an, c’est 3 × 3 922 = 11 766 kg de CO₂ équivalent, environ 11,8 tonnes. Et le fluide, le déplacement et la baisse de performance se paient aussi. Il faut chercher et réparer la fuite, pas la compenser.</li><li><b>Ce que vous proposez :</b> nettoyage du condenseur chaque année, recherche de fuite, contrôle d’étanchéité noté au registre, puis un devis qui compare ce qu’on dépense à ce qu’on économise.</li></ol>";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"ou-passe-largent",dossier:"electricite",title:"Le froid se paie en électricité",kicker:"L’électricité · 1",codes:[CODES],level:"comprendre",
    text:"Une chambre froide fonctionne jour et nuit. Le compresseur est le plus gros consommateur d’électricité de la machine. Son coût dépend de sa puissance, du temps de marche et du prix du kilowattheure.",
    prompt:"Lisez les trois repères. L’écran suivant vous fait estimer un coût annuel.",
    render:()=>cardsMarkup([
      {title:"Une machine de froid commercial",rows:[["Régulation :","tout ou rien, en général."],["Temps de marche moyen :","environ 60 % du temps."]]},
      {title:"Une chambre positive",rows:[["Consomme :","de 5 à 15 kWh par mètre carré et par jour, selon l’usage."]]},
      {title:"Une chambre négative",rows:[["Consomme :","de 20 à 35 kWh par mètre carré et par jour."]]},
    ])+"<p class=\"source\">Source : document « Froid commercial et chambres froides » (aspects énergétiques, valeurs Eurovent citées).</p>"}),

  screen({id:"estimer-le-cout",dossier:"electricite",title:"Estimer le coût d’un compresseur",kicker:"L’électricité · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Une année compte 8 760 heures. Avec un compresseur en marche 60 % du temps : coût par an = 8 760 × 0,60 × puissance électrique (kW) × prix du kWh.",
    prompt:"Lisez l’exemple résolu, puis calculez le cas « À vous » (écrivez le nombre d’euros, puis « Vérifier »).",
    render:()=>exempleMarkup({text:"Compresseur de 1,5 kW, prix d’exemple "+PRIX,answer:"8 760 × 0,60 × 1,5 × 0,20 = 1 576,80 € par an",why:"8 760 × 0,60 = 5 256 heures de marche. 5 256 × 1,5 = 7 884 kWh. 7 884 × 0,20 = 1 576,80 €."})+numberMarkup("À vous : compresseur de 2,2 kW, même prix. Coût par an ?","€"),
    wire:()=>wireNumber(2312.64,5,"5 256 heures × 2,2 kW = 11 563,2 kWh. × 0,20 € = 2 312,64 € par an.","Heures de marche : 8 760 × 0,60 = 5 256. Puis × 2,2 kW, puis × 0,20 €."),
    correction:"5 256 h × 2,2 kW × 0,20 € = 2 312,64 € par an. Formule du document « Froid commercial » ; prix d’exemple."}),

  screen({id:"quatre-leviers",dossier:"electricite",title:"Quatre leviers pour consommer moins",kicker:"L’électricité · 3",codes:[CODES],level:"comprendre",
    text:"Avant tout réglage, quatre leviers d’énergie : la condensation flottante, la vitesse variable, un sous-refroidissement soigné, la chaleur récupérée. La condensation flottante et la vitesse variable demandent du matériel adapté : elles sont surtout rentables sur de grosses installations.",
    prompt:"Lisez les quatre cartes.",
    render:()=>cardsMarkup([{title:"Condensation flottante",rows:[["Principe :","l’air froid du dehors fait baisser la haute pression."],["À condition :","que le détendeur suive (électronique, pas thermostatique)."]]},{title:"Vitesse variable",rows:[["Principe :","le compresseur et les ventilateurs modulent leur puissance selon le besoin."]]},{title:"Sous-refroidissement soigné",rows:[["Principe :","quelques kelvins de mieux au liquide : plus de froid pour la même compression."]]},{title:"Chaleur récupérée",rows:[["Principe :","un désurchauffeur reprend la chaleur rejetée au condenseur : rien ne se perd."]]}],"deux")+"<p class=\"source\">Rentabilité des régulations évoluées surtout sur de grosses installations : document « Froid commercial et chambres froides ».</p>"}),

  screen({id:"petits-gestes",dossier:"electricite",title:"Les gestes qui coûtent ou qui rapportent",kicker:"L’électricité · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Beaucoup d’économies ne demandent aucun matériel : un bon geste suffit. Quatre repères : un condenseur propre et dégagé (l’air chaud doit pouvoir partir, sinon le compresseur tourne sans arrêt) ; la porte fermée ; la température réglée au plus juste ; pas de résistance de porte en chambre positive (elle sert au négatif).",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez « Économise » ou « Gaspille ».",
    render:()=>sortMarkup(gestesLignes,GESTES,gestesExemple)+"<p class=\"source\">Source : document « Froid commercial et chambres froides » (gestion des chambres froides, condenseur).</p>",wire:()=>wireSort(gestesLignes),
    correction:"Économise : nettoyer le condenseur, régler au plus juste. Gaspille : porte ouverte, condenseur étouffé, résistance de porte en positif."}),

  screen({id:"fuite-qui-coute",dossier:"fuites",title:"Une fuite coûte de trois façons",kicker:"Les fuites · 1",codes:[CODES],level:"comprendre",
    text:"Une fuite se paie en fluide à remplacer, en performance perdue (la machine consomme plus), et en climat : le fluide perdu réchauffe l’atmosphère. Compléter sans chercher la fuite, c’est payer chaque année.",
    prompt:"Lisez les quatre cartes. Les deux écrans suivants vous font calculer, puis conseiller.",
    render:()=>cardsMarkup([
      {title:"Le fluide",rows:[["On paie :","le fluide perdu et le temps d’intervention."]]},
      {title:"La performance",rows:[["Une fuite :","fait baisser les performances de l’installation."]]},
      {title:"Le climat",rows:[["Part directe du TEWI :","fuites × PRP. Le PRP dit combien de fois un fluide réchauffe plus que le CO₂."]]},
      {title:"Le registre",rows:[["On note :","chaque fluide ajouté. Sans réparer, il faudra en ajouter encore."]]},
    ],"deux")+"<p class=\"renvoi\">Pour aller plus loin : <a href=\"../../../../legislation/stations/impact-tewi/index.html\">le TEWI</a> (station Législation) et <a href=\"../etancheite-interactive/index.html\">L’étanchéité</a>.</p><p class=\"source\">Sources : « Froid commercial et chambres froides » (fuites et baisse de performance), station TEWI du réseau.</p>"}),

  screen({id:"calcul-co2",dossier:"fuites",title:"Calculer l’équivalent CO₂ d’une fuite",kicker:"Les fuites · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Équivalent CO₂ (en kg) = masse de fluide perdue (en kg) × PRP du fluide. Pour passer en tonnes, divisez par 1 000.",
    prompt:"Lisez l’exemple résolu, puis calculez le cas « À vous » en tonnes d’équivalent CO₂.",
    render:()=>exempleMarkup({text:"2 kg de R-134a perdus (PRP 1 430)",answer:"2 × 1 430 = 2 860 kg, soit 2,86 tonnes de CO₂ équivalent",why:"On multiplie la masse par le PRP, puis on divise par 1 000 pour les tonnes."})+numberMarkup("À vous : 3 kg de R-404A perdus (PRP 3 922). Tonnes de CO₂ équivalent ?","t")+"<p class=\"source\">PRP du réseau (valeurs de la Mission F-GAZ) : R-134a 1 430, R-404A 3 922.</p>",
    wire:()=>wireNumber(11.77,0.05,"3 × 3 922 = 11 766 kg, soit 11,77 tonnes de CO₂ équivalent.","Multipliez 3 kg par 3 922, puis divisez par 1 000 pour passer en tonnes."),
    correction:"3 × 3 922 = 11 766 kg, soit 11,77 tonnes de CO₂ équivalent."}),

  screen({id:"conseil-fuite",dossier:"fuites",title:"« Je complète chaque année »",kicker:"Les fuites · 3",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Compléter la charge coûte moins cher que réparer, à court terme. À long terme, c’est l’inverse.",
    prompt:"Un client fait compléter sa chambre froide chaque année et vous demande si c’est la bonne solution. Cliquez votre conseil.",
    render:()=>choiceMarkup([{title:"Oui, c’est le moins cher",note:"On continue de compléter"},{title:"Non : on cherche et on répare la fuite",note:"Puis on note au registre"},{title:"On change la machine tout de suite",note:"Sans chercher"}]),
    wire:()=>wireChoice(1,["Chaque année il faut payer du fluide, un déplacement, une performance en baisse et du climat en plus. À long terme, c’est plus cher.","Trouver et réparer la fuite arrête les dépenses qui reviennent chaque année. C’est la bonne démarche.","Changer sans chercher est souvent plus cher qu’une réparation : on cherche d’abord où est la fuite."]),
    correction:"Chercher et réparer la fuite, puis noter au registre : compléter chaque année coûte plus cher à long terme."}),

  screen({id:"entretien-rentable",dossier:"entretien",title:"L’entretien qui rapporte",kicker:"L’entretien · 1",codes:[CODES],level:"comprendre",
    text:"Un échangeur encrassé travaille moins bien et fait consommer plus. Nettoyer le condenseur et l’évaporateur est l’entretien le plus rentable.",
    prompt:"Lisez les trois cartes. Les deux écrans suivants vous font chiffrer.",
    render:()=>cardsMarkup([
      {title:"Condenseur encrassé",rows:[["Perte :","de 12,5 % à 25 %."],["Remède :","nettoyer régulièrement (feuilles en automne, pollen au printemps)."]]},
      {title:"Évaporateur encrassé",rows:[["Perte :","de 5 % à 12,5 %."],["Effet :","baisse de 2 à 5 °C."],["Remède :","nettoyer, contrôler."]]},
      {title:"Joints de porte et dégivrage",rows:[["À contrôler :","l’étanchéité des portes, et le réglage des dégivrages."]]},
    ])+"<p class=\"source\">Source : document « Froid commercial et chambres froides » (optimisation énergétique : condenseur, évaporateur).</p>"}),

  screen({id:"entretien-exo",dossier:"entretien",title:"Le compresseur ne s’arrête jamais",kicker:"L’entretien · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Quand le compresseur tourne sans arrêt, la machine n’arrive plus à évacuer la chaleur. Cherchez d’abord ce qui l’en empêche.",
    prompt:"Le groupe est dans une cave non ventilée, le condenseur collé au mur. Cliquez ce que vous faites en premier.",
    render:()=>exempleMarkup({text:"Un condenseur encrassé par les feuilles",answer:"je le nettoie",why:"Il échange mal : on retire d’abord la saleté, avant de toucher à autre chose."})+choiceMarkup([{title:"Je dégage et je ventile le condenseur",note:"L’air chaud doit partir"},{title:"Je change le compresseur",note:"Il tourne trop"},{title:"J’augmente la puissance de la chambre",note:"Un plus gros groupe"}]),
    wire:()=>wireChoice(0,["Un condenseur collé au mur dans une cave étouffée ne peut pas évacuer sa chaleur : il faut le dégager et le ventiler.","Le compresseur n’est pas en cause : il tourne parce que la chaleur ne part pas.","Un plus gros groupe n’évacue pas mieux la chaleur : le problème est l’air autour du condenseur."]),
    correction:"Dégager et ventiler le condenseur : c’est l’exemple du document, où le compresseur tournait sans arrêt."}),

  screen({id:"chiffrer-lentretien",dossier:"devis",title:"Chiffrer l’entretien pour le client",kicker:"Le devis · 1",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Pour convaincre un client, comparez ce que l’entretien coûte et ce qu’il fait économiser. Gain net = économie moins coût de l’entretien.",
    prompt:"Lisez l’exemple résolu, puis calculez le cas « À vous » (écrivez le nombre d’euros).",
    render:()=>exempleMarkup({text:"Facture de froid : 1 000 € par an. Condenseur encrassé : 20 % de plus. Nettoyage : 80 € par an",answer:"économie 200 € − nettoyage 80 € = 120 € de gain net",why:"20 % de 1 000 € font 200 € : c’est ce qu’on gagne en nettoyant. On retire le prix du nettoyage."})+numberMarkup("À vous : facture de 2 000 € par an, condenseur encrassé qui coûte 15 % de plus, nettoyage à 120 € par an. Gain net ?","€"),
    wire:()=>wireNumber(180,1,"15 % de 2 000 € font 300 €. 300 − 120 = 180 € de gain net par an.","D’abord 15 % de 2 000 €, c’est 2 000 × 0,15. Puis retirez 120 € de nettoyage."),
    correction:"15 % de 2 000 € = 300 €. 300 − 120 = 180 € de gain net par an. Valeurs d’exemple."}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : une chambre négative qui coûte cher en électricité et en fluide.",
    prompt:"Seul : écrivez l’estimation du coût d’électricité, ce que coûte le condenseur encrassé, ce que coûte la fuite et ce que vous proposez. Puis comparez avec la réponse type.",
    render:()=>cas+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : 2 312,64 € par an, condenseur à nettoyer, fuite de 11,77 tonnes de CO₂ équivalent à réparer."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis continuer",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Le froid se paie en électricité : puissance × temps de marche × prix. Une fuite coûte du fluide, de la performance et du climat. Un échangeur propre économise. Comparez toujours ce que coûte l’entretien et ce qu’il fait gagner.",
    prompt:"Pour continuer : ouvrez l’une des trois suites.",
    render:()=>liensMarkup([{href:"../bilan-thermique-performance-interactif/index.html",title:"Bilan et performance",note:"COP, EER, puissances"},{href:"../detecteurs-fuite-interactif/index.html",title:"Les détecteurs de fuite",note:"Trouver la fuite pour la réparer"},{href:"../../../../legislation/stations/impact-tewi/index.html",title:"Le TEWI",note:"La part directe et la part indirecte"}])}),
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

