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

function safeStoredRateIndex(){try{const stored=Number(localStorage.getItem("chambre-froide-securites-interactif-voice-rate"));const index=voiceRates.indexOf(stored);return index>=0?index:1}catch(_){return 1}}
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


/* ===== Les données de ce cours (chambre-froide-securites-interactif) ===== */
const dossiers = [
  { id:"givre", label:"Le givre", note:"d’où il vient, ce qu’il fait" },
  { id:"degivrage", label:"Le dégivrage", note:"le cycle, l’horloge, le réglage" },
  { id:"eau", label:"L’eau", note:"bac, tuyau, siphon" },
  { id:"personne", label:"La personne", note:"ouverture de secours, lumière" },
  { id:"bilan", label:"Bilan", note:"un cas, puis l’essentiel" },
];
const screenIllustrations = {
  "commande-degivrage": ["images/horloge-degivrage.jpg", "Horloge de dégivrage : un cadran de 24 heures avec ses taquets rouges et bleus."],
};
const PRINT = {
  titre: "Dégivrage, évacuation des condensats, sécurités de la chambre (personne enfermée)",
  codes: "Sert notamment pour : CAP IFCA, savoir associé S5.7 « Enceintes isothermes positives et négatives » · Bac Pro MFER (référentiel 2028), savoir S4.1.5 « Les chambres froides ».",
  loi: "ce cours ne cite aucun texte réglementaire. Il décrit des dispositifs de sécurité que les fiches de constructeur et les documents de cours présentent ; le texte qui les rend obligatoires n’a pas été retrouvé (voir SOURCES.md). La notice du fabricant prime.",
};
const CODES = "CAP S5.7 · Bac S4.1.5";

/* ---- Les données des activités ---- */
const OUINON = ["Oui", "Non"];
const givreExemple = { text: "Le givre forme une couche qui isole la batterie", good: 0, why: "Oui : la couche de glace gêne l’échange de chaleur entre l’air et l’évaporateur." };
const givreLignes = [
  { text: "La chambre se refroidit mieux", good: 1, why: "Non : l’échange s’étouffe, la chambre refroidit moins bien.", bad: "C’est l’inverse : un évaporateur givré échange moins." },
  { text: "La pression à l’aspiration du compresseur baisse", good: 0, why: "Oui : le fluide s’évapore moins bien, la pression d’entrée est plus basse. Le compresseur risque des coups de liquide.", bad: "Oui : avec moins d’échange, la pression à l’aspiration baisse." },
  { text: "La consommation d’électricité baisse", good: 1, why: "Non : la machine travaille plus longtemps pour un résultat moindre.", bad: "Non : la machine travaille plus longtemps, elle consomme plus." },
  { text: "L’air passe plus difficilement entre les ailettes", good: 0, why: "Oui : le givre bouche peu à peu le passage de l’air.", bad: "Oui : le givre se dépose entre les ailettes et gêne l’air." },
];
const ordreDegivrage = {
  items: ["On arrête le fluide frigorigène dans la batterie.", "On arrête le ventilateur de l’évaporateur.", "On réchauffe la batterie au-dessus de 0 °C : le givre fond.", "On remet le fluide frigorigène en circulation.", "On relance le ventilateur.", "Le refroidissement normal reprend."],
  shown: [3, 0, 5, 2, 1, 4],
  hints: ["Avant de chauffer, on coupe d’abord l’arrivée de froid dans la batterie.", "Le ventilateur s’arrête aussi : il soufflerait la chaleur et l’eau dans la chambre.", "Une fois le froid et l’air coupés, on peut chauffer au-dessus de 0 °C : c’est ce qui fait fondre le givre.", "Le givre a fondu : le fluide revient dans la batterie.", "Le fluide est revenu : on relance le ventilateur.", "Tout est reparti : c’est le cycle normal."],
};
const reponseType = "<strong>Réponse type.</strong><ol><li><b>Dégivrage :</b> je regarde l’évaporateur à la fin d’un cycle. S’il reste du givre, j’allonge la durée (la qualité d’abord). Je contrôle les résistances et la sonde ou le thermostat de fin de dégivrage.</li><li><b>Eau :</b> sol mouillé et givre qui revient : je contrôle l’écoulement, c’est-à-dire le bac, le tuyau et le siphon. Bouché ? Gelé ? En négatif, je regarde la résistance qui chauffe l’écoulement.</li><li><b>Porte :</b> elle colle : je contrôle le joint et la résistance de cadre. Je regarde aussi la soupape d’équilibrage.</li><li><b>Sécurité avant de partir :</b> l’ouverture de secours fonctionne depuis l’intérieur (avec quelqu’un dehors), la lumière marche, le sol glissant est traité. Je note le tout au carnet.</li></ol>";

const avantDePartir = [
      {title:"Ouverture de secours",note:"Poignée intérieure",detail:"Avec un collègue dehors, on l’ouvre depuis l’intérieur, porte fermée, pour voir qu’elle fonctionne."},
      {title:"Éclairage",note:"Lampe et signal",detail:"La lampe de la chambre s’allume, et le signal extérieur aussi."},
      {title:"Joint et porte",note:"Étanchéité",detail:"Le joint est entier, la porte ferme bien. En négatif, la résistance du cadre chauffe."},
      {title:"Soupape",note:"Équilibrage",detail:"L’air passe : la porte ne se plaque pas après fermeture."},
      {title:"Écoulement",note:"Bac, tuyau, siphon",detail:"L’eau de dégivrage part, rien n’est gelé ni bouché."},
      {title:"Carnet",note:"Trace écrite",detail:"On note la date, ce qu’on a réglé (dégivrage, consigne) et ce qui reste à surveiller."},
    ];
const cas = "<div class=\"cas-boite\"><strong>Le cas.</strong> Une chambre négative : un givre épais sur l’évaporateur, de l’eau au sol et du verglas devant la porte, et une porte qui colle. Le client dit que « ça marche mal depuis une semaine ».</div>";

/* ---- Les écrans ---- */
const screens = [
  screen({id:"le-givre",dossier:"givre",title:"D’où vient le givre",kicker:"Le givre · 1",codes:[CODES],level:"comprendre",
    text:"L’air d’une chambre contient de l’eau. Cette eau gèle quand elle touche une surface sous 0 °C : l’évaporateur d’une chambre négative. Le givre s’épaissit et isole la batterie : l’échange de chaleur s’étouffe.",
    prompt:"Regardez les deux appareils : d’abord un évaporateur propre, puis un évaporateur givré.",
    render:()=>"<div class=\"deux-col\"><figure class=\"figure\"><img src=\"images/evaporateur-ventilateurs.jpg\" alt=\"Évaporateur de chambre froide : un boîtier blanc avec trois ventilateurs.\"><figcaption>Un évaporateur de chambre froide : sa batterie à ailettes et ses ventilateurs.</figcaption></figure><figure class=\"figure\"><img src=\"../bibliotheque/illu-g8b.webp\" alt=\"Évaporateur dont les ailettes sont couvertes de givre.\"><figcaption>Un évaporateur givré : le givre bouche les ailettes.</figcaption></figure></div>"}),

  screen({id:"consequences-givre",dossier:"givre",title:"Ce que le givre provoque",kicker:"Le givre · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Un évaporateur givré échange moins de chaleur : le fluide s’y évapore moins bien. La pression à l’aspiration du compresseur (la basse pression) baisse, et le compresseur risque des coups de liquide : du liquide qui arrive jusqu’à lui. La machine doit aussi travailler plus longtemps pour refroidir.",
    prompt:"Une ligne est déjà rangée en exemple. Rangez les quatre autres : cliquez « Oui » si le givre provoque cela, « Non » sinon.",
    render:()=>sortMarkup(givreLignes,OUINON,givreExemple)+"<p class=\"source\">Source : document « Froid commercial et chambres froides » (origine du givre, conséquences).</p>",wire:()=>wireSort(givreLignes),
    correction:"Oui : l’échange diminue, la pression d’aspiration baisse, l’air passe mal. Non : la chambre ne refroidit pas mieux, la consommation ne baisse pas."}),

  screen({id:"cycle-de-degivrage",dossier:"degivrage",title:"Le cycle de dégivrage",kicker:"Le dégivrage · 1",codes:[CODES],level:"comprendre",
    text:"Pour dégivrer, on coupe le froid, on coupe le ventilateur, on chauffe la batterie au-dessus de 0 °C, puis on relance le froid et le ventilateur. Il existe quatre façons de chauffer.",
    prompt:"Lisez les quatre façons de chauffer. L’écran suivant vous fait retrouver l’ordre du cycle.",
    render:()=>cardsMarkup([
      {title:"Résistance électrique",rows:[["C’est :","des résistances chauffantes dans la batterie."],["À savoir :","le plus répandu, et le plus gourmand en énergie."]]},
      {title:"Gaz chauds",rows:[["C’est :","le gaz chaud du compresseur envoyé dans l’évaporateur."]]},
      {title:"Aspersion d’eau",rows:[["C’est :","de l’eau qui arrose la batterie et fait fondre le givre."]]},
      {title:"Air de la chambre",rows:[["C’est :","le ventilateur brasse l’air de la chambre, au-dessus de 0 °C, sur l’évaporateur."]]},
    ],"deux")+"<p class=\"renvoi\">Pour chaque méthode, un cours : <a href=\"../degivrage-electrique/index.html\">électrique</a>, <a href=\"../degivrage-gaz-chauds/index.html\">gaz chauds</a>, <a href=\"../degivrage-naturel/index.html\">naturel</a>, <a href=\"../degivrage-inversion-cycle/index.html\">inversion de cycle</a>.</p><p class=\"source\">Source : document « Froid commercial et chambres froides » (cycles de dégivrage).</p>"}),

  screen({id:"ordre-degivrage",dossier:"degivrage",title:"Le cycle dans l’ordre",kicker:"Le dégivrage · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Six temps, toujours dans le même ordre. Vous avez lu les façons de chauffer : remettez maintenant les temps du cycle dans l’ordre.",
    prompt:"Cliquez les six temps dans l’ordre : d’abord le premier, puis le suivant.",
    render:()=>orderMarkup(ordreDegivrage.items,ordreDegivrage.shown),wire:()=>wireOrder(ordreDegivrage.items,ordreDegivrage.hints),
    correction:"Ordre : couper le fluide, arrêter le ventilateur, chauffer, remettre le fluide, relancer le ventilateur, reprendre le refroidissement."}),

  screen({id:"commande-degivrage",dossier:"degivrage",title:"Qui déclenche le dégivrage",kicker:"Le dégivrage · 3",codes:[CODES],level:"comprendre",
    text:"Le dégivrage peut être commandé par une horloge : simple, courante, réglable à la main. Ou par une régulation électronique, avec une sonde de fin de dégivrage : elle s’adapte au givre réel.",
    prompt:"Lisez les deux cartes. Les deux écrans suivants vous font régler un dégivrage.",
    render:()=>cardsMarkup([
      {title:"Par horloge",rows:[["Comment :","des taquets fixent l’heure de départ et la durée."],["Avantage :","simple, réglage facile par le technicien."],["Limite :","elle dégivre même s’il n’y a pas de givre."]]},
      {title:"Régulation électronique",rows:[["Comment :","une sonde dit quand le dégivrage commence et finit."],["Avantage :","elle s’adapte au givre réel."]]},
    ],"deux")+"<p class=\"source\">Source : document « Froid commercial et chambres froides ».</p>"}),

  screen({id:"regler-qualite",dossier:"degivrage",title:"Régler : la qualité d’abord",kicker:"Le dégivrage · 4",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"Règle du technicien : avant de toucher au nombre de dégivrages, on s’assure que chaque dégivrage est complet. La durée doit faire fondre tout le givre.",
    prompt:"Lisez l’exemple résolu, puis cliquez ce que vous faites dans le cas « À vous ».",
    render:()=>exempleMarkup({text:"À la fin d’un dégivrage, il reste du givre en bas de l’évaporateur",answer:"j’allonge la durée du dégivrage",why:"Le dégivrage est incomplet : le givre restant va s’épaissir. On règle d’abord la qualité, pas le nombre."})+"<p class=\"cas\"><strong>À vous :</strong> à la fin d’un autre cycle, une plaque de givre reste collée en haut de la batterie. Que faites-vous en premier ?</p>"+choiceMarkup([{title:"Je supprime un dégivrage",note:"Pour économiser"},{title:"J’allonge la durée du dégivrage",note:"Puis je regarde la fin du cycle suivant"},{title:"Je baisse la consigne de la chambre",note:"Pour compenser"}]),
    wire:()=>wireChoice(1,["Le dégivrage est déjà incomplet : en supprimer un aggraverait le givre.","Comme dans l’exemple : du givre reste, le dégivrage est incomplet, on allonge la durée et on regarde le cycle suivant.","Baisser la consigne n’enlève pas le givre : la machine travaille plus et consomme plus."]),
    correction:"J’allonge la durée : le givre restant prouve que le dégivrage est incomplet. D’abord la qualité."}),

  screen({id:"regler-quantite",dossier:"degivrage",title:"Régler : la durée et le nombre",kicker:"Le dégivrage · 5",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Une fois les dégivrages complets, on peut économiser : on observe l’évaporateur à la fin d’un cycle, et juste avant le suivant. Si le givre a disparu bien avant la fin, on réduit la durée peu à peu, par pas de 5 minutes, jusqu’à la fusion complète. Ajustez de préférence en été, quand le givre se forme le plus.",
    prompt:"À la fin d’un cycle, il ne reste plus de givre depuis un moment, et le chauffage tourne encore dix minutes. Cliquez ce que vous faites.",
    render:()=>choiceMarkup([{title:"Je réduis la durée par pas de 5 minutes",note:"Je regarde le résultat"},{title:"Je double la durée",note:"Pour être tranquille"},{title:"Je supprime tous les dégivrages",note:"Plus de chauffage"}]),
    wire:()=>wireChoice(0,["Si le givre a disparu bien avant la fin, on peut réduire la durée peu à peu, par pas de 5 minutes, jusqu’à la fusion complète.","Doubler la durée chauffe pour rien et consomme : c’est l’inverse de l’économie.","Sans dégivrage, le givre s’accumule : la chambre ne refroidit plus."]),
    correction:"Réduire la durée par pas de 5 minutes, en vérifiant que le givre fond toujours complètement."}),

  screen({id:"ou-va-leau",dossier:"eau",title:"Où va l’eau du dégivrage",kicker:"L’eau · 1",codes:[CODES],level:"comprendre",
    text:"Le givre fond : toute cette eau doit partir. Elle tombe dans un bac sous l’évaporateur, puis suit un tuyau jusqu’à l’évacuation. Un siphon empêche l’air chaud de la salle de remonter dans la chambre par le tuyau.",
    prompt:"Lisez les quatre éléments. L’écran suivant vous fait chercher une panne.",
    render:()=>cardsMarkup([
      {title:"Le bac",rows:[["Où :","sous l’évaporateur."],["Rôle :","recevoir l’eau de fonte."]]},
      {title:"Le tuyau",rows:[["Pente :","continue, sans point bas où l’eau reste."]]},
      {title:"Le siphon",rows:[["Rôle :","un bouchon d’eau : il empêche l’air chaud et les odeurs de remonter."]]},
      {title:"En chambre négative",rows:[["Risque :","l’eau gèle dans le tuyau."],["Remède :","un câble chauffant sur l’écoulement."]]},
    ],"deux")+"<p class=\"source\">Sources : fiches condensats du fonds pour le siphon ; bac, siphon et tuyau à contrôler d’après le schéma « givre et dégivrage » du réseau. Le câble chauffant d’écoulement est une pratique du métier.</p>"}),

  screen({id:"ecoulement-bouche",dossier:"eau",title:"Le givre revient vite : que contrôler ?",kicker:"L’eau · 2",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Si l’eau ne part pas, elle reste dans le bac, puis regèle : le givre revient. C’est une panne classique des chambres négatives.",
    prompt:"Malgré des dégivrages complets, le givre revient en quelques heures et il y a de l’eau au sol. Cliquez ce que vous contrôlez.",
    render:()=>choiceMarkup([{title:"J’ajoute des dégivrages",note:"Plus de chauffage"},{title:"Je contrôle l’écoulement : bac, tuyau, siphon",note:"Bouché ? Gelé ?"},{title:"Je change le détendeur",note:"Le fluide est en cause"}]),
    wire:()=>wireChoice(1,["Plus de dégivrages chauffent plus et consomment plus, sans traiter la cause : l’eau ne part pas.","Un bac, un tuyau ou un siphon bouché ou gelé garde l’eau : elle regèle et le givre revient. On le contrôle en premier.","Un détendeur ne change pas le chemin de l’eau de fonte : l’eau au sol montre un problème d’écoulement."]),
    correction:"Contrôler l’écoulement : bac, tuyau, siphon, bouchés ou gelés. Le givre revient quand l’eau ne part pas."}),

  screen({id:"personne-enfermee",dossier:"personne",title:"Une chambre froide peut être un piège",kicker:"La personne · 1",codes:[CODES],level:"comprendre",
    text:"Porte qui se referme, froid, obscurité : une personne enfermée dans une chambre négative est en danger. Les chambres sont donc équipées de dispositifs qui permettent de sortir et d’être vu.",
    prompt:"Lisez les quatre cartes. L’écran suivant vous les fait appliquer.",
    render:()=>cardsMarkup([
      {title:"Ouverture de secours",rows:[["Rôle :","ouvrir la porte depuis l’intérieur, même si elle est fermée à clé."],["Nom :","système de décondamnation intérieure."]]},
      {title:"Éclairage",rows:[["Où :","dans la chambre, une lampe étanche pour locaux humides."],["Dehors :","un signal clair montre que la lumière est allumée."]]},
      {title:"Sol",rows:[["Le givre :","rend le sol glissant (risque de chute)."],["Remède :","sol antidérapant, câbles chauffants à l’entrée."]]},
      {title:"Avant d’entrer",rows:[["Vous :","prévenez quelqu’un, surtout en chambre négative."]]},
    ],"deux")+"<p class=\"source\">Sources : « Chambres froides, généralités » (AFPA, 2001) pour la décondamnation, fiche d’un constructeur pour l’ouverture de secours, la lampe et le sol antidérapant, « Froid commercial et chambres froides » pour le signal lumineux et les câbles de sol. Ce sont des équipements de constructeur : la notice de la chambre prime.</p>"}),

  screen({id:"ouverture-secours",dossier:"personne",title:"La porte s’est refermée",kicker:"La personne · 2",codes:[CODES],level:"appliquer",requiresAction:true,
    text:"La poignée intérieure et la décondamnation sont le dernier recours d’une personne enfermée. Elles doivent fonctionner tout le temps.",
    prompt:"Une personne referme la porte d’une chambre négative derrière elle, la clé est dehors. Cliquez ce que la porte prévoit.",
    quiz:{choices:["Elle se rouvre depuis l’intérieur, avec le système de décondamnation.","Elle reste fermée jusqu’au retour de quelqu’un avec la clé.","Elle se rouvre seulement si on coupe la chambre.","Elle se rouvre au bout d’une heure."],good:0,explain:"Les portes de chambre froide ont une fermeture à clé avec dispositif de décondamnation intérieure : on peut sortir sans la clé."},
    render(){return quizMarkup(this)},wire(){wireQuiz(this)}}),

  screen({id:"avant-de-partir",dossier:"personne",title:"Avant de rendre la chambre",kicker:"La personne · 3",codes:[CODES],level:"comprendre",requiresAction:true,
    text:"Vous finissez une intervention. Avant de rendre la chambre, vous contrôlez six points. Ouvrez-les un par un.",
    prompt:"Ouvrez chaque point pour lire ce qu’on vérifie.",
    render:()=>checklistMarkup(avantDePartir),wire:()=>wireChecklist(avantDePartir),
    correction:"Six points : ouverture de secours, éclairage, joint et porte, soupape, écoulement, carnet."}),

  screen({id:"cas-seul",dossier:"bilan",title:"Un cas complet, seul",kicker:"Bilan · 1 · à vous, sans guide",codes:[CODES],level:"evaluer",requiresAction:true,
    text:"Cas à faire seul : une chambre négative qui givre, qui mouille et dont la porte colle.",
    prompt:"Seul : écrivez vos contrôles dans l’ordre (dégivrage, eau, porte, sécurité avant de partir). Puis comparez avec la réponse type.",
    render:()=>cas+libreMarkup(),wire:()=>wireLibre(reponseType),
    correction:"Voir la réponse type : fin de cycle, écoulement, joint et résistance de porte, ouverture de secours, carnet."}),

  screen({id:"bilan",dossier:"bilan",title:"À retenir, puis continuer",kicker:"Bilan · 2",codes:[CODES],level:"evaluer",
    text:"Le givre isole la batterie : on dégivre. D’abord un dégivrage complet, ensuite on économise. L’eau doit partir : bac, tuyau, siphon. Et la personne doit toujours pouvoir sortir : ouverture de secours, lumière.",
    prompt:"Pour continuer : ouvrez l’une des trois suites.",
    render:()=>liensMarkup([{href:"../chambre-negative-reglages-interactif/index.html",title:"Relevés et réglages d’une chambre négative",note:"Thermostat, pressostats, dégivrage"},{href:"../degivrage-electrique/index.html",title:"Dégivrage électrique",note:"Résistances et égouttage"},{href:"../chambre-froide-enceinte-interactif/index.html",title:"La chambre froide, enceinte isotherme",note:"Panneaux, porte, soupape, implantation"}])}),
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

