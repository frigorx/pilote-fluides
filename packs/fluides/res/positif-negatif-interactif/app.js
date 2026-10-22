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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("positif-negatif-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
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


/* ===== Les données de ce cours (positif-negatif-interactif) ===== */
const dossiers = [
  { id:"positif-negatif", label:"Positif, négatif", note:"deux familles de froid" },
  { id:"refrigerer", label:"Réfrigérer", note:"ce qui peut mal tourner" },
  { id:"congeler", label:"Congeler", note:"le palier, les cristaux" },
  { id:"surgeler", label:"Surgeler", note:"congeler très vite" },
  { id:"decongeler", label:"Décongeler", note:"la règle de l’arrêté" },
  { id:"bilan", label:"Bilan", note:"un cas, puis l’essentiel" },
];
const screenIllustrations = {
  "cristaux": ["images/cristaux-de-glace.jpg", "Cristaux de glace vus de près."],
};
const PRINT = {
  titre: "Positif, négatif, congélation, surgélation : ce que le froid fait au produit",
  codes: "Sert notamment pour : CAP IFCA, savoir associé S4.2 « Action du froid sur la conservation des denrées » · Bac Pro MFER (référentiel 2028), savoir S4.1.1 « L’action du froid au service de la conservation des produits ».",
  loi: "la décongélation (enceinte réfrigérée entre 0 °C et +4 °C, pas de recongélation) vient de l’arrêté du 21 décembre 2009, annexe VI. Les définitions de la congélation et de la surgélation viennent du corrigé d’un sujet d’examen Monteur dépanneur en froid et climatisation (épreuve E2/C, session 2010).",
};
const CODES = "CAP S4.2 · Bac S4.1.1";

/* ---- Les données des activités ---- */
const CH = ["Chambre positive", "Chambre négative"];
const chExemple = { text: "Du lait frais conservé à +3 °C", good: 0, why: "+3 °C est au-dessus de 0 °C : le lait ne gèle pas. C’est une chambre positive." };
const chLignes = [
  { text: "Des glaces à −18 °C", good: 1, why: "−18 °C est sous 0 °C : c’est une chambre négative.", bad: "−18 °C est sous 0 °C : l’eau gèle. C’est une chambre négative." },
  { text: "Des tomates à +5 °C", good: 0, why: "+5 °C : froid positif, les tomates ne gèlent pas.", bad: "+5 °C est au-dessus de 0 °C : c’est une chambre positive." },
  { text: "Du poisson congelé", good: 1, why: "Congelé veut dire que son eau a gelé : froid négatif.", bad: "Un produit congelé a son eau gelée : il faut du froid négatif." },
  { text: "De la viande hachée fraîche à +2 °C", good: 0, why: "Fraîche et à +2 °C : froid positif.", bad: "+2 °C est au-dessus de 0 °C : c’est une chambre positive." },
  { text: "Des plats surgelés", good: 1, why: "Surgelés : conservés à −18 °C, en froid négatif.", bad: "Surgelés veut dire −18 °C : c’est du froid négatif." },
  { text: "Des yaourts", good: 0, why: "Produits laitiers frais : froid positif.", bad: "Des yaourts qui gèlent sont abîmés : ils restent en froid positif." },
];
const PROC = ["Plaque froide", "Saumure", "Air ou gaz froid"];
const procExemple = { text: "Des blocs de poisson pressés entre deux plaques refroidies", good: 0, why: "Le produit touche une paroi froide : la chaleur passe par contact (conduction)." };
const procLignes = [
  { text: "Des filets de poisson plongés dans de l’eau salée très froide", good: 1, why: "L’eau salée très froide (saumure) gèle le poisson.", bad: "Le produit est plongé dans un liquide : c’est la saumure." },
  { text: "Des petits pois portés par un fort courant d’air très froid", good: 2, why: "L’air froid soufflé les gèle (convection).", bad: "C’est de l’air froid soufflé sur le produit." },
  { text: "Des crevettes arrosées d’azote liquide", good: 2, why: "L’azote liquide est un gaz très froid projeté sur le produit.", bad: "L’azote liquide agit comme un gaz très froid sur le produit." },
  { text: "Des steaks serrés entre deux plaques refroidies", good: 0, why: "Contact avec une paroi froide : conduction.", bad: "Il y a contact avec une paroi froide : c’est la plaque." },
  { text: "Des poissons entiers plongés dans l’eau salée glacée", good: 1, why: "Immersion dans la saumure : c’est l’usage cité pour les poissons.", bad: "Plongés dans l’eau salée : c’est la saumure." },
];
const CS = ["Congélation", "Surgélation"];
const csExemple = { text: "Un tunnel d’azote liquide fait descendre le produit à cœur en quelques minutes", good: 1, why: "Très rapide, avec des cristaux très petits : c’est de la surgélation." };
const csLignes = [
  { text: "Un produit de bonne qualité, refroidi très vite, avec des cristaux minuscules", good: 1, why: "C’est la définition de la surgélation.", bad: "Congeler très vite un produit de bonne qualité : c’est la surgélation." },
  { text: "Un produit mis au congélateur de la cuisine, qui gèle pendant des heures", good: 0, why: "La congélation lente donne de plus gros cristaux.", bad: "Une congélation qui dure des heures est lente : c’est la congélation." },
  { text: "Un lit fluidisé : de l’air soufflé fait flotter de petits produits pendant qu’ils gèlent", good: 1, why: "Le lit fluidisé est une technique de surgélation citée dans le corrigé d’un sujet d’examen.", bad: "Le lit fluidisé gèle très vite : c’est une technique de surgélation." },
  { text: "Les gros cristaux de glace percent les cellules du produit", good: 0, why: "Quand la congélation est lente, les cristaux sont gros et abîment les cellules.", bad: "Ce sont les gros cristaux d’une congélation lente qui abîment les cellules." },
];
const DECO = ["Oui", "Non"];
const decoExemple = { text: "Décongeler un steak haché dans une chambre positive à +3 °C", good: 0, why: "Entre 0 °C et +4 °C : c’est la méthode de l’arrêté." };
const decoLignes = [
  { text: "Le laisser décongeler sur le plan de travail, à 20 °C", good: 1, why: "Hors des 0 à +4 °C, les micro-organismes se multiplient : non.", bad: "À 20 °C les micro-organismes se multiplient : ce n’est pas la méthode de l’arrêté." },
  { text: "Le cuire directement sans le décongeler d’abord", good: 0, why: "L’arrêté admet la cuisson sans décongélation préalable.", bad: "L’arrêté admet la cuisson sans décongélation préalable : oui." },
  { text: "Le décongeler dans une enceinte réfrigérée à +4 °C", good: 0, why: "Entre 0 °C et +4 °C : c’est conforme.", bad: "La limite est +4 °C : c’est accepté." },
  { text: "Remettre au congélateur un produit déjà décongelé", good: 1, why: "Un produit décongelé ne se recongèle pas, sauf analyse des dangers validée.", bad: "La recongélation d’un produit décongelé n’est pas admise." },
];

const cas = "<div class=\"cas-boite\"><strong>Le cas.</strong> Un boucher veut tout mettre dans une seule chambre négative à −18 °C : sa viande fraîche, qu’il vend sous trois jours, et ses steaks hachés qu’il veut garder des mois.</div>";
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Viande fraîche :</b> elle se conserve en froid positif, au-dessus de son point de congélation (réfrigération), à +2 °C pour les viandes hachées. À −18 °C elle gèlerait : ce n’est plus de la viande fraîche, et il faudrait la décongeler pour la vendre.</li><li><b>Steaks hachés gardés des mois :</b> il faut les congeler, mieux : les surgeler vite, pour que les cristaux soient petits et que la qualité reste bonne. Puis les garder à −18 °C, sans jamais remonter.</li><li><b>Ce que vous conseillez :</b> deux chambres, une positive et une négative. Au moment de servir, décongeler en enceinte réfrigérée entre 0 °C et +4 °C, et ne jamais recongeler.</li></ol>";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"positif-negatif",dossier:"positif-negatif",title:"Froid positif, froid négatif",kicker:"Positif, négatif · 1",codes:[CODES],level:"comprendre",
    text:"Le froid positif reste au-dessus de 0 °C : le produit ne gèle pas. Le froid négatif descend sous 0 °C : l’eau du produit gèle. Une chambre positive et une chambre négative ne servent pas aux mêmes produits.",
    prompt:"Lisez les deux cartes. L’écran suivant vous fait ranger des produits.",
    render:()=>cardsMarkup([
      {title:"Froid positif",rows:[["Température :","au-dessus de 0 °C, par exemple de +2 °C à +4 °C."],["Le produit :","se refroidit, mais ne gèle pas."],["Procédé :","la réfrigération."],["Exemples :","viande fraîche, laitages, légumes."]]},
      {title:"Froid négatif",rows:[["Température :","sous 0 °C, par exemple de −18 °C à −20 °C."],["Le produit :","son eau gèle."],["Procédés :","la congélation, la surgélation."],["Exemples :","glaces, poisson congelé, plats surgelés."]]},
    ],"deux")+"<p class=\"source\">Chambre positive +2/+4 °C et chambre négative −20/−18 °C : travaux pratiques de mise en service du fonds de F. Henninot. Procédés : corrigé d’un sujet d’examen du fonds (conservation des denrées, 2010).</p>"}),

  screen({id:"ranger-positif-negatif",dossier:"positif-negatif",title:"Quelle chambre ?",kicker:"Positif, négatif · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Pour chaque produit, regardez sa température ou son état : au-dessus de 0 °C, c’est du froid positif ; congelé ou surgelé, c’est du froid négatif.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les six autres : cliquez « Chambre positive » ou « Chambre négative ».",
    render:()=>sortMarkup(chLignes,CH,chExemple),wire:()=>wireSort(chLignes),
    correction:"Chambre négative : glaces, poisson congelé, plats surgelés. Chambre positive : tomates, viande hachée fraîche, yaourts."}),

  screen({id:"refrigerer",dossier:"refrigerer",title:"Ce que fait la réfrigération",kicker:"Réfrigérer · 1",codes:[CODES],level:"comprendre",
    text:"Réfrigérer, c’est conserver un aliment au froid, au-dessus de son point de congélation. Le froid limite les micro-organismes et ralentit les enzymes. Mais l’entreposage peut aussi abîmer le produit.",
    prompt:"Lisez les quatre altérations. L’écran suivant vous fait trouver comment les éviter.",
    render:()=>cardsMarkup([
      {title:"La déshydratation",rows:[["C’est :","le produit perd son eau (on parle de ressuage pour la viande)."]]},
      {title:"Les moisissures",rows:[["C’est :","des champignons qui poussent à la surface."]]},
      {title:"La poisse",rows:[["C’est :","un film gluant à la surface de la viande."]]},
      {title:"Le cryochoc (bœuf)",rows:[["C’est :","la viande de bœuf se contracte si on la refroidit trop vite."]]},
    ],"deux")+"<p class=\"source\">Source : corrigé d’un sujet d’examen du fonds (conservation des denrées, 2010).</p>"}),

  screen({id:"quatre-facteurs",dossier:"refrigerer",title:"Éviter les altérations",kicker:"Réfrigérer · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Quatre facteurs se règlent dans la chambre : la température, l’humidité relative, la vitesse de l’air et son sens de circulation.",
    prompt:"Des gouttes d’eau se forment sur des carcasses. Cliquez ce qu’on règle pour l’éviter.",
    quiz:{choices:["La vitesse de l’air et son sens de circulation.","La couleur des panneaux de la chambre.","La taille de la porte.","Le nombre de clayettes."],good:0,explain:"Le corrigé d’un sujet d’examen cite la vitesse de l’air et son sens de circulation pour éviter la condensation d’eau sur les carcasses."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"trois-phases",dossier:"congeler",title:"Congeler : trois temps",kicker:"Congeler · 1",codes:[CODES],level:"comprendre",
    text:"Congeler, c’est descendre la température au cœur du produit sous son point de congélation (environ −0,5 °C à −2 °C). Cela se passe en trois temps. Le deuxième est un palier : la température ne baisse presque plus.",
    prompt:"Lisez les trois temps. Les deux écrans suivants vous les font retrouver.",
    render:()=>cardsMarkup([
      {title:"1 · Refroidir",rows:[["Ce qui se passe :","le produit descend jusqu’à son point de congélation."]]},
      {title:"2 · Le palier",rows:[["Ce qui se passe :","l’eau devient glace : des cristaux se forment."],["La température :","presque immobile."]]},
      {title:"3 · Refroidir le congelé",rows:[["Ce qui se passe :","le produit congelé descend jusqu’à −18 °C à cœur."]]},
    ])+"<p class=\"source\">À cœur : au milieu du produit, pas en surface. Source : corrigé d’un sujet d’examen du fonds (conservation des denrées, 2010).</p>"}),

  screen({id:"palier-figure",dossier:"congeler",title:"Pourquoi la température s’arrête",kicker:"Congeler · 2",codes:[CODES],level:"comprendre",
    text:"Pendant le palier, le froid continue d’enlever de la chaleur, mais la température ne baisse plus : cette chaleur sert à changer l’eau en glace. Le schéma montre un palier du même genre : de l’eau qu’on chauffe, dont la température reste plate pendant qu’elle devient vapeur. En congélation, c’est l’inverse : on enlève de la chaleur, et la température reste presque plate pendant que l’eau devient glace.",
    prompt:"Regardez le palier plat du schéma (ici l’eau qui s’évapore). Pour la congélation, imaginez la même chose dans l’autre sens.",
    render:()=>figureMarkup("../illustrations/palier-chaleur-latente.svg","Schéma : la température reste plate pendant le changement d’état, alors que l’énergie passe.","Schéma du réseau : un palier de changement d’état (ici l’évaporation).")}),

  screen({id:"ordre-phases",dossier:"congeler",title:"Remettre les trois temps dans l’ordre",kicker:"Congeler · 3",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Vous avez lu les trois temps de la congélation. Remettez-les dans l’ordre où ils se passent.",
    prompt:"Cliquez les trois temps dans l’ordre : d’abord le premier, puis le suivant.",
    render:()=>orderMarkup(["Refroidir le produit jusqu’à son point de congélation.","Le palier : l’eau devient glace, des cristaux se forment.","Refroidir le produit congelé jusqu’à −18 °C à cœur."],[1,2,0]),
    wire:()=>wireOrder(["x","x","x"],["Il faut d’abord descendre jusqu’au point de congélation : l’eau ne gèle pas avant.","Ensuite l’eau devient glace : c’est le palier, la température reste presque stable.","Une fois tout gelé, le produit congelé continue de descendre jusqu’à −18 °C."]),
    correction:"Ordre : refroidir jusqu’au point de congélation, le palier (cristaux), refroidir le congelé jusqu’à −18 °C à cœur."}),

  screen({id:"cristaux",dossier:"congeler",title:"Pourquoi aller vite",kicker:"Congeler · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Plus la congélation est rapide, plus les cristaux de glace sont petits. Les petits cristaux abîment moins les cellules du produit.",
    prompt:"Cliquez pourquoi on cherche à raccourcir la durée de congélation.",
    quiz:{choices:["Les cristaux sont plus petits : la structure des cellules est mieux préservée.","Le produit consomme moins d’électricité.","L’eau du produit ne gèle pas du tout.","Le produit devient plus sucré."],good:0,explain:"Si la durée de congélation est raccourcie, les cristaux de glace sont plus petits : la structure cellulaire est préservée et la qualité du produit est meilleure (corrigé d’un sujet d’examen du fonds)."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"procedes",dossier:"congeler",title:"Comment on congèle",kicker:"Congeler · 5",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Trois façons d’enlever la chaleur : par contact avec une plaque froide, par immersion dans de l’eau salée très froide (la saumure), par de l’air ou un gaz très froid soufflé ou projeté sur le produit : air froid, azote liquide, neige carbonique.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les cinq autres : cliquez le procédé.",
    render:()=>sortMarkup(procLignes,PROC,procExemple),wire:()=>wireSort(procLignes),
    correction:"Saumure : filets et poissons plongés. Air ou gaz froid : petits pois, crevettes à l’azote liquide. Plaque froide : steaks serrés entre deux plaques."}),

  screen({id:"surgelation",dossier:"surgeler",title:"Surgeler : congeler très vite",kicker:"Surgeler · 1",codes:[CODES],level:"comprendre",
    text:"Surgeler, c’est congeler très vite un produit de bonne qualité. La température à cœur passe sous le point de congélation, puis descend jusqu’à environ −18 °C. Les cristaux sont très petits : le produit garde sa qualité.",
    prompt:"Lisez la comparaison. L’écran suivant vous la fait appliquer.",
    render:()=>cardsMarkup([
      {title:"Congélation",rows:[["Vitesse :","plus lente."],["Cristaux :","plus gros."],["Qualité du produit :","moins bien préservée."]]},
      {title:"Surgélation",rows:[["Vitesse :","très rapide."],["Cristaux :","beaucoup plus petits."],["Qualité du produit :","mieux préservée."],["Techniques :","azote liquide, lit fluidisé, air."]]},
    ],"deux")+"<p class=\"source\">Source : corrigé d’un sujet d’examen du fonds (conservation des denrées, 2010).</p>"}),

  screen({id:"congeler-ou-surgeler",dossier:"surgeler",title:"Congélation ou surgélation ?",kicker:"Surgeler · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"La différence tient à la vitesse : surgeler, c’est congeler beaucoup plus vite, donc avec des cristaux plus petits.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les quatre autres : cliquez « Congélation » ou « Surgélation ».",
    render:()=>sortMarkup(csLignes,CS,csExemple),wire:()=>wireSort(csLignes),
    correction:"Surgélation : le produit refroidi très vite, le lit fluidisé. Congélation : le congélateur de cuisine qui gèle pendant des heures, les gros cristaux."}),

  screen({id:"garder-le-froid",dossier:"surgeler",title:"Garder un produit congelé",kicker:"Surgeler · 3",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Pour conserver un produit congelé, on garde la chaîne du froid à −18 °C, sans rupture. Un produit décongelé ne se recongèle pas.",
    prompt:"Une chambre négative tombe en panne, puis redémarre : le produit a fondu en surface. Cliquez la bonne conduite.",
    render:()=>choiceMarkup([{title:"Je le remets tel quel au froid",note:"Il durcira de nouveau"},{title:"Je préviens l’exploitant : la chaîne du froid a été rompue",note:"Le produit ne se recongèle pas sans décision"},{title:"Je règle la chambre à −30 °C",note:"Pour rattraper"}]),
    wire:()=>wireChoice(1,["Un produit décongelé ne se recongèle pas : sa chaîne du froid a été rompue.","La rupture est un fait : l’exploitant doit décider de ce que devient le produit, d’après son analyse des dangers.","Un réglage plus froid ne répare pas la rupture : le produit a déjà fondu."]),
    correction:"Prévenir l’exploitant : la chaîne du froid est rompue, le produit décongelé ne se recongèle pas."}),

  screen({id:"decongeler",dossier:"decongeler",title:"Décongeler : la règle",kicker:"Décongeler · 1",codes:[CODES],level:"comprendre",
    text:"On décongèle dans une enceinte réfrigérée entre 0 °C et +4 °C (ou à la température maximale du produit si elle est fixée), ou on cuit sans décongeler d’abord. Une fois décongelé, le produit suit les règles du réfrigéré. On ne le recongèle pas.",
    prompt:"Lisez les trois règles. L’écran suivant vous les fait appliquer.",
    render:()=>cardsMarkup([
      {title:"Où",rows:[["Dans :","une enceinte réfrigérée entre 0 °C et +4 °C."],["Ou :","directement à la cuisson, sans décongélation préalable."]]},
      {title:"Après",rows:[["Le produit :","suit les règles du réfrigéré (maximums de l’arrêté)."]]},
      {title:"Recongeler ?",rows:[["Non :","sauf si une analyse des dangers validée montre que c’est aussi sûr."]]},
    ])+"<p class=\"source\">Source : arrêté du 21/12/2009, annexe VI (lue dans le texte initial publié au JO du 31/12/2009 ; consolidé à relire).</p>"}),

  screen({id:"decongeler-exo",dossier:"decongeler",title:"Cette décongélation est-elle admise ?",kicker:"Décongeler · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Appliquez la règle de l’écran précédent : où, comment, et ce qu’on ne fait pas.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les quatre autres : cliquez « Oui » ou « Non ».",
    render:()=>sortMarkup(decoLignes,DECO,decoExemple),wire:()=>wireSort(decoLignes),
    correction:"Oui : la cuisson directe, la décongélation à +4 °C. Non : le plan de travail à 20 °C, la recongélation."}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : une seule chambre négative pour deux besoins différents.",
    prompt:"Seul : écrivez votre réponse (pourquoi la viande fraîche ne va pas à −18 °C, ce qu’il fait des steaks hachés, ce que vous conseillez). Puis comparez avec la réponse type.",
    render:()=>cas+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : viande fraîche en froid positif, steaks hachés surgelés puis gardés à −18 °C, deux chambres."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis continuer",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Positif : au-dessus de 0 °C, le produit ne gèle pas. Négatif : sous 0 °C, l’eau gèle. Surgeler, c’est congeler très vite, pour des cristaux très petits. Un produit décongelé ne se recongèle pas.",
    prompt:"Pour continuer : ouvrez l’une des trois suites.",
    render:()=>liensMarkup([{href:"../conservation-denrees-interactif/index.html",title:"Conserver les denrées par le froid",note:"Températures maximales, humidité, chaîne du froid"},{href:"../chambre-froide-enceinte-interactif/index.html",title:"La chambre froide, enceinte isotherme",note:"Panneaux, porte, soupape, implantation"},{href:"../chaleur-interactive/index.html",title:"Du glaçon au circuit",note:"Le cours sur la chaleur et le changement d’état"}])}),
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

