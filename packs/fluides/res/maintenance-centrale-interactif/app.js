"use strict";

const PH = {"compresseurs":{"src":"images/compresseurs.webp","t":"Compresseurs","alt":"Quatre compresseurs : à pistons, scroll, à vis, hermétique."},"clapet":{"src":"images/clapet-vannes-service.webp","t":"Clapet et vannes","alt":"Un clapet anti-retour à gauche, deux vannes d’isolement à droite."},"separateur":{"src":"images/separateur-huile.webp","t":"Séparateur d’huile","alt":"Séparateur d’huile bleu, avec ses raccords cuivre."},"condenseur":{"src":"images/condenseur-air.webp","t":"Condenseur à air","alt":"Condenseur à air à deux ventilateurs."},"bouteille":{"src":"images/reservoir-liquide.webp","t":"Bouteille de liquide","alt":"Bouteille de liquide sur pieds."},"evaporateur":{"src":"images/evaporateur-air.webp","t":"Évaporateur","alt":"Évaporateur à deux ventilateurs, suspendu."},"detendeur":{"src":"images/detendeur-thermostatique.webp","t":"Détendeur","alt":"Détendeur thermostatique, avec son bulbe et son capillaire."},"electrovanne":{"src":"images/electrovanne.webp","t":"Électrovanne","alt":"Électrovanne : bobine bleue sur un corps en laiton."},"filtre":{"src":"images/filtre-deshydrateur.webp","t":"Filtre déshydrateur","alt":"Filtre déshydrateur noir à raccords cuivre."},"voyant":{"src":"images/voyant-liquide.webp","t":"Voyant liquide","alt":"Voyant liquide en laiton, avec son hublot."},"pressostats":{"src":"images/pressostats.webp","t":"Pressostats","alt":"Deux pressostats : un gris, un bleu."},"capteur":{"src":"images/capteur-pression.webp","t":"Capteur de pression","alt":"Capteur de pression avec sa prise électrique."},"sonde":{"src":"images/sonde-temperature.webp","t":"Sonde de température","alt":"Sonde de température et son câble."},"compresseur":{"src":"images/compresseur.webp","t":"Compresseur","alt":"Compresseur à pistons semi-hermétique : le moteur est dans le carter."},"pressostatBP":{"src":"images/pressostat-bp.webp","t":"Pressostat BP","alt":"Pressostat basse pression : le boîtier bleu."},"pressostatHP":{"src":"images/pressostat-hp.webp","t":"Pressostat HP","alt":"Pressostat haute pression : le boîtier gris."},"contacteur":{"src":"images/contacteur.webp","t":"Contacteur","alt":"Contacteur tripolaire : ses bornes de puissance en haut et en bas."}};

const ORG = "../../../../jouerezo/voyage/organes/";
const STATION = {
  slug: "maintenance-centrale-interactif", cle: "maintenance-centrale", port: 8799, carte: true, supportPc: true,
  titre: "Maintenance systématique d’une centrale : relevés, contrôles, fiche",
  titreCourt: "Maintenance systématique d’une centrale — relevés, contrôles, fiche de visite",
  titleTag: "Maintenance systématique d’une centrale — relevés, contrôles, fiche",
  description: "Cours interactif : la visite de maintenance systématique d’une centrale de froid commercial : le programme, les relevés qui se comparent, les contrôles d’huile, de propreté et d’électricité, la fiche de visite, que faire d’un défaut.",
  brandSmall: "Maintenance d’une centrale",
  eyebrow: "FLUIDES · MAINTENANCE D’UNE CENTRALE",
  h1: ["Maintenance", "d’une centrale"],
  intro: "Une visite de maintenance systématique se fait à dates fixes, que la centrale ait un défaut ou non. Vous apprenez le programme d’une visite, à comparer les relevés avec ceux de la visite d’avant, à contrôler l’huile, la propreté et l’électricité, puis à remplir la fiche et à dire quoi faire d’un défaut.",
  homeVisual: { carte: true, legende: "Relever, comparer, contrôler, noter : la visite, du local technique au condenseur.", images: [
    { src: ORG + "compresseur.webp", alt: "Compresseur à pistons dont on contrôle le niveau d’huile et l’intensité." },
    { src: "../bibliotheque/illu-g7b.webp", alt: "Main gantée qui brosse la batterie d’un condenseur : le nettoyage fait partie de chaque visite." },
    { src: "../bibliotheque/illu-g3.webp", alt: "Main qui tient une planchette avec une liste de contrôle à cocher : la fiche de visite." } ] },
  homeNote: "<strong>Cours sur la visite de maintenance.</strong> Le programme de visite vient d’un contrat de maintenance de froid commercial du fonds de F. Henninot. Les valeurs des relevés sont des valeurs d’exemple, données pour l’exercice. Sur le chantier, le contrat, la notice du constructeur et le dossier de l’installation font foi.",
  codesBox: [
    ["TP Monteur dépanneur frigoriste (RNCP37876) — compétence professionnelle CP8", "« Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée »."],
    ["Bac Pro MFER 2028 — tâche A3T1 (activité A3 « Maintenance d’une installation »)", "« Réaliser une opération de maintenance préventive »."],
    ["À voir ensuite sur la même ligne", "Le plan de maintenance du froid commercial : périodicités et contrat (CP8)."]
  ],
  printCodes: "TP Monteur dépanneur frigoriste (RNCP37876), compétence professionnelle CP8 « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée » · Bac Pro MFER 2028, tâche A3T1 « Réaliser une opération de maintenance préventive ».",
  printLoi: "",
  reference: "TP Monteur dépanneur frigoriste (RNCP37876) : CP8 ; Bac Pro MFER 2028 : A3T1",
  codeCle: { "TP CP8": "tp_mdf", "Bac A3T1": "bac_mfer_2028" },
  dossiers: [
    { id: "visite", label: "La visite", note: "le programme, le point de départ" },
    { id: "relever", label: "Relever", note: "comparer, lire un groupe" },
    { id: "controler", label: "Contrôler", note: "huile, propreté, électrique" },
    { id: "fiche", label: "La fiche", note: "lire, remplir, conclure" },
    { id: "bilan", label: "Bilan", note: "un cas, puis l’essentiel" }
  ],
  sceneDefaut: { t: "La centrale.", d: "Trois postes à gauche, trois compresseurs entre deux collecteurs, séparateur, condenseur et bouteille en haut." },
  src: {
    reg: [
      "**Règlement (UE) 2024/573**, article 7, paragraphes 1 et 2 (tenue des registres : quantité et type de gaz, quantités ajoutées, dates et résultats des contrôles d’étanchéité, entreprise qui intervient ; conservation au moins cinq ans) : seul le renvoi « on relit le registre de l’installation avant la visite » en est tiré (écran « Avant de commencer »). Lu le 19/10/2026 sur le texte du Journal officiel du 20/02/2024 (publications.europa.eu)."
    ],
    ref: [
      "**TP Monteur dépanneur frigoriste (RNCP37876), CP8** : « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée » (libellé de `rattachement/entrees/referentiels-pilotes.json` ; la fiche de mission donnait la forme abrégée). Le TP MDF n’est pas dans `HAL-v3/donnees/referentiels/peda/` : à confirmer.",
      "**Bac Pro MFER 2028, tâche A3T1** « Réaliser une opération de maintenance préventive » (activité A3 « Maintenance d’une installation »), libellés de `HAL-v3/donnees/referentiels/peda/BAC_MFER_2028.json`."
    ],
    fonds: [
      "`03_BAC-MFER/S2-Systemes/contrat-froid-commercial_SMPAC-ENTREPRISE.pdf` : **programme d’entretien** (les treize opérations de chaque visite, dont dix sont reprises dans l’exercice : propreté des évaporateurs, butées, arbres, silent-blocs, étanchéité et serrage des raccords, pressions, niveau d’huile, surchauffe et sous-refroidissement, organes de sécurité, charge en fluide, intensités absorbées et sécurités électriques, resserrage des connexions, nettoyage des échangeurs, du bac de condensation, fonctionnement général) ; clause « le prestataire doit signaler au client les travaux indispensables et lui proposer un devis » ; « avant toute réparation, établir un devis à faire valider par le client ». Le nom de la société n’est pas repris.",
      "`03_BAC-MFER/S2-Systemes/Froid_Commercial_et_Chambres_Froides.pdf` : « Condenseur encrassé : nettoyage régulier (feuilles en automne, pollen au printemps) » ; « tenir un carnet avec les relevés quotidiens » ; suivi des principales caractéristiques de l’installation.",
      "`03_BAC-MFER/Froid-Frigorifique/TP Centrale de supermarché.docx` : régime de fonctionnement −10 °C / +45 °C (valeurs d’exemple de l’exercice), pressostats de la centrale.",
      "**Le « Voyage dans tous ses états — les centrales frigorifiques »** (`jouerezo/donnees/voyage-centrale.js`) : le régulateur de centrale garde l’historique des alarmes ; pressostats de sécurité de chaque compresseur ; détecteur de fuite dans le local technique.",
      "Renvois vers l’existant, sans le refaire : L’étanchéité (relevés qui font soupçonner une fuite), Surchauffe et sous-refroidissement, Pression et température, le circuit d’huile, la consignation (Législation).",
      "`jouerezo/voyage/organes/*.webp` : images de synthèse des organes (voir SOURCES-IMAGES.md)."
    ],
    sans: [
      "**La règle « à 1 K près, c’est pareil »** : précision de lecture annoncée comme convention de l’exercice, pas comme une règle ; à relire par Franck.",
      "**Niveau d’huile** (visible au voyant, entre les repères du constructeur) et « on cherche pourquoi avant d’ajouter de l’huile » : pratique courante (cours du circuit d’huile) ; pas de valeur.",
      "**Intensité relevée comparée à l’intensité maximale de la plaque** : principe courant ; les valeurs de l’exercice sont inventées.",
      "**Les trois états de la fiche** (OK, À surveiller, Défaut) : convention du cours ; une fiche réelle suit le modèle de l’entreprise.",
      "Aucune valeur de pression, de température ou de surchauffe « normale » n’est donnée : elles se comparent à la mise en service et à la visite d’avant."
    ]
  },
  images: [
    ["`jouerezo/moteur/voyage-dessin.js` et `voyage-centrale-dessin.js` (carte de la centrale, surlignages)", "Dessin du « Voyage dans tous ses états » (inerWeb Studio), repris sans retouche", "Droits réservés inerWeb"],
    ["`jouerezo/voyage/symboles/*.svg`", "Planche Éduscol « Le circuit frigorifique » et collection QElectroTech (convertie dans la bibliothèque de F. Henninot), chargés depuis le Voyage, non copiés", "CC BY 3.0 — <https://github.com/qelectrotech/qelectrotech-elements>"],
    ["`../bibliotheque/illu-g7b.webp`, `illu-g3.webp` (accueil)", "Illustrations locales du réseau (bibliothèque d’images « Habilitation fluides », juillet 2026), déjà utilisées et validées ailleurs ; aucune n’a été produite pour ce cours", "Droits réservés inerWeb (voir `../bibliotheque/MANIFESTE.md`)"],
    ["`jouerezo/voyage/organes/compresseur.webp` (accueil)", "Images de synthèse des organes, déjà en ligne sur inerweb.fr (`tome-3-technologie-organes/images-organes/`, juillet 2026), reprises par le Voyage le 03/10/2026", "Droits réservés inerWeb (voir `jouerezo/voyage/organes/SOURCES.md`)"]
  ],
  lireMoi: {
    ligne: "Cours interactif du plan thermo-techno, ligne « Les centrales », après « Raccorder les postes d’un magasin ».",
    fait: "  Il déroule une visite de maintenance systématique d’une centrale positive : le programme (dix des treize opérations du contrat type, en quatre groupes),\n  les relevés qui se comparent à ceux de la visite d’avant, un groupe de relevés qui parle, les contrôles de l’huile, de la propreté\n  et de l’électricité, la lecture et le remplissage d’une fiche de visite (OK, À surveiller, Défaut), et que faire d’un défaut\n  (le noter, prévenir le client, proposer un devis). Il se prolonge par « Plan de maintenance du froid commercial ».",
    codes: "  TP MDF (RNCP37876) : CP8 « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée ».\n  Bac Pro MFER 2028 : tâche A3T1 « Réaliser une opération de maintenance préventive » (activité A3).",
    regl: "  Règlement (UE) 2024/573, article 7 : un seul renvoi (relire le registre). Les périodicités de contrôle d’étanchéité sont dans le cours suivant."
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

const CP8 = "TP CP8", A3T1 = "Bac A3T1";
const C2 = [CP8, A3T1];

const screens = [
  /* ============ LA VISITE ============ */
  screen({ id: "programme-de-visite", dossier: "visite", title: "Ce que contient une visite", kicker: "La visite · 1", codes: C2, level: "comprendre",
    text: "La maintenance systématique se fait à dates fixes, selon un calendrier, que la centrale ait un défaut ou non. Chaque visite suit le programme écrit au contrat : les mêmes opérations, à chaque fois. Elles se rangent en quatre groupes.",
    prompt: "Une opération est déjà rangée en exemple. Rangez les neuf autres : cliquez le groupe.",
    blocks: [{ k: "def", html: "<strong>Maintenance systématique :</strong> faite à dates fixes, selon un calendrier. <strong>Programme :</strong> la liste écrite des opérations d’une visite, dans le contrat." }],
    act: { type: "sort", labels: ["Circuit frigorifique", "Huile et mécanique", "Électrique", "Propreté"],
      example: { text: "Vérification de la charge en fluide frigorigène", good: 0, why: "On vérifie qu’il y a assez de fluide dans le circuit : c’est une opération sur le circuit frigorifique." },
      rows: [
        { text: "Contrôle des pressions du circuit", good: 0, why: "Les pressions se lisent sur le circuit frigorifique.", bad: "Les pressions se lisent aux manomètres du circuit frigorifique." },
        { text: "Contrôle de l’étanchéité, serrage éventuel des raccords", good: 0, why: "On cherche les fuites sur le circuit frigorifique.", bad: "L’étanchéité concerne le circuit frigorifique." },
        { text: "Contrôle des températures de surchauffe et de sous-refroidissement", good: 0, why: "Ces deux relevés se prennent sur le circuit frigorifique.", bad: "Surchauffe et sous-refroidissement se relèvent sur le circuit frigorifique." },
        { text: "Vérification du niveau d’huile du compresseur", good: 1, why: "Le niveau d’huile est une opération sur l’huile des compresseurs.", bad: "Le niveau d’huile se lit au voyant du carter : huile et mécanique." },
        { text: "Contrôle des butées, arbres, silent-blocs, graissage éventuel", good: 1, why: "Ce sont des pièces mécaniques.", bad: "Butées, arbres et silent-blocs sont des pièces mécaniques." },
        { text: "Contrôle des intensités absorbées", good: 2, why: "L’intensité se mesure sur l’alimentation électrique.", bad: "L’intensité absorbée se mesure sur l’alimentation électrique." },
        { text: "Resserrage des connexions électriques", good: 2, why: "Ce sont les bornes et les fils : l’électrique.", bad: "Les connexions sont des bornes et des fils : l’électrique." },
        { text: "Nettoyage des échangeurs (évaporateur et condenseur)", good: 3, why: "C’est du nettoyage : la propreté.", bad: "Nettoyer les échangeurs, c’est de la propreté." },
        { text: "Nettoyage du bac de condensation et de son évacuation", good: 3, why: "C’est du nettoyage : la propreté.", bad: "Nettoyer le bac et son évacuation, c’est de la propreté." }
      ] },
    correction: "Circuit : pressions, étanchéité, surchauffe, charge. Huile et mécanique : niveau d’huile, butées. Électrique : intensités, connexions. Propreté : échangeurs, bac." }),

  screen({ id: "avant-de-commencer", dossier: "visite", title: "Avant de mesurer : relire", kicker: "La visite · 2", codes: C2, level: "appliquer",
    text: "Un relevé ne dit rien tout seul : il se compare à celui de la mise en service et à celui de la visite d’avant. Avant de mesurer, on relit donc la dernière fiche de visite, le registre de l’installation et l’historique des alarmes du régulateur.",
    prompt: "Vous arrivez au local technique pour la visite. Cliquez ce que vous faites en premier.",
    act: { type: "choice", good: 0, cards: [
      { title: "Je relis la dernière fiche, le registre et les alarmes", note: "avant de brancher un manomètre" },
      { title: "Je branche les manomètres tout de suite", note: "pour gagner du temps" },
      { title: "Je nettoie le condenseur", note: "c’est la première opération du programme" } ],
      msgs: ["On relit d’abord : sans le point de départ, aucun relevé ne se lit. Le registre et la dernière fiche disent ce qui a déjà été vu.", "Une pression seule ne dit rien : il faut savoir ce qu’elle valait la dernière fois pour la comparer.", "Le nettoyage vient avec les autres opérations du programme, pas avant d’avoir relu le dossier."] },
    correction: "On relit d’abord la dernière fiche, le registre de l’installation et les alarmes du régulateur." }),

  /* ============ RELEVER ============ */
  screen({ id: "comparer-un-releve", dossier: "relever", title: "Un relevé se compare", kicker: "Relever · 1", codes: C2, level: "appliquer",
    text: "Chaque relevé se compare à celui de la visite d’avant. À 1 K près, c’est pareil : c’est la précision de lecture. Pour une intensité, c’est celle de la pince ampèremétrique (voir sa notice) : ici, moins de 0,5 A d’écart, c’est pareil. Un écart plus grand se note, et on cherche pourquoi. Dans cet exercice, l’air extérieur et la charge sont les mêmes qu’à la dernière visite.",
    prompt: "Un relevé est déjà rangé en exemple. Rangez les cinq autres : « Pareil qu’avant » ou « A changé : je cherche pourquoi ».",
    scene: { imgs: ["capteur"], t: "Où se lisent les pressions.", d: "La basse pression se lit sur le collecteur d’aspiration, la haute pression côté refoulement." },
    blocks: [{ k: "def", html: "<strong>K (kelvin) :</strong> unité d’un écart de température, comme le degré. <strong>Température d’évaporation :</strong> celle que donne la basse pression, lue sur le manomètre." }],
    act: { type: "sort", labels: ["Pareil qu’avant", "A changé : je cherche pourquoi"],
      example: { text: "Intensité du compresseur 3 : 16,0 A la dernière fois, 16,1 A aujourd’hui", good: 0, why: "0,1 A d’écart : dans la précision de lecture. On note la valeur et on passe." },
      rows: [
        { text: "Température d’évaporation : −10 °C la dernière fois, −10 °C aujourd’hui", good: 0, why: "Aucun écart : la basse pression est comme avant.", bad: "Aucun écart : rien à chercher." },
        { text: "Température de condensation : 38 °C la dernière fois, 39 °C aujourd’hui", good: 0, why: "1 K d’écart : dans la précision de lecture.", bad: "1 K d’écart seulement : c’est la précision de lecture, rien à chercher." },
        { text: "Surchauffe : 7 K la dernière fois, 16 K aujourd’hui", good: 1, why: "9 K d’écart : la surchauffe a nettement monté, on cherche pourquoi.", bad: "9 K d’écart : bien plus que la précision de lecture." },
        { text: "Sous-refroidissement : 5 K la dernière fois, 0 K aujourd’hui", good: 1, why: "5 K d’écart : le sous-refroidissement a disparu, on cherche pourquoi.", bad: "5 K d’écart : le sous-refroidissement a disparu." },
        { text: "Intensité du compresseur 1 : 14,2 A la dernière fois, 14,4 A aujourd’hui", good: 0, why: "0,2 A d’écart : dans la précision de lecture.", bad: "0,2 A d’écart seulement : dans la précision de lecture." },
        { text: "Température de la chambre : +3 °C la dernière fois, +8 °C aujourd’hui", good: 1, why: "5 K d’écart : la chambre est bien plus chaude, on cherche pourquoi.", bad: "5 K d’écart : la chambre est nettement plus chaude." }
      ] },
    correction: "Pareil : évaporation, condensation, intensité du compresseur 1. A changé : surchauffe, sous-refroidissement, température de la chambre." }),

  screen({ id: "un-groupe-de-releves", dossier: "relever", title: "Un seul relevé ne prouve rien, un groupe parle", kicker: "Relever · 2", codes: C2, level: "appliquer",
    text: "Quand plusieurs relevés changent ensemble, dans le même sens, ils disent quelque chose. Ici, quatre relevés ont changé depuis la dernière visite : la basse pression, la surchauffe, le sous-refroidissement et le voyant.",
    prompt: "Lisez les relevés, puis cliquez ce que vous soupçonnez.",
    scene: { imgs: ["voyant","capteur"], t: "Un groupe de relevés.", d: "La basse pression et le voyant liquide bougent ensemble." },
    blocks: [
      { k: "tableau", caption: "Relevés de la centrale : dernière visite et aujourd’hui (valeurs d’exemple)", head: ["Relevé", "Dernière visite", "Aujourd’hui"], rows: [
        ["Température d’évaporation", "−10 °C", "−16 °C"], ["Surchauffe", "7 K", "18 K"], ["Sous-refroidissement", "5 K", "0 K"], ["Voyant liquide", "clair", "bulles"] ] },
      { k: "lecture", items: [
        "<strong>Température d’évaporation plus basse :</strong> il y a moins de fluide à évaporer, la pression baisse.",
        "<strong>Surchauffe plus haute :</strong> l’évaporateur manque de liquide, la vapeur a le temps de se réchauffer.",
        "<strong>Sous-refroidissement à zéro :</strong> le liquide qui sort du condenseur n’est plus refroidi : il en manque dans la ligne liquide.",
        "<strong>Bulles au voyant :</strong> du gaz passe dans la ligne liquide.",
        "<strong>Quatre relevés qui disent la même chose :</strong> il manque du fluide." ] },
      { k: "renvoi", html: "Pour apprendre à lire ces relevés pas à pas : le cours <a href=\"../etancheite-interactive/index.html?dossier=soupconner\">L’étanchéité, dossier « Soupçonner »</a>." }
    ],
    act: { type: "quiz", choices: ["Un manque de fluide : je cherche la fuite.", "Un condenseur encrassé.", "Un compresseur usé.", "Rien : les relevés varient d’un jour à l’autre."], good: 0,
      explain: "Quatre relevés vont dans le même sens : il manque probablement du fluide. On ne sait pas encore où : on contrôle l’étanchéité et on cherche la fuite, puis on la note sur la fiche." },
    correction: "Un manque de fluide probable : on cherche la fuite." }),

  /* ============ CONTRÔLER ============ */
  screen({ id: "niveau-d-huile", dossier: "controler", title: "Le niveau d’huile d’un compresseur", kicker: "Contrôler · 1", codes: C2, level: "appliquer",
    text: "Le niveau d’huile se lit au voyant du carter de chaque compresseur. Il doit être visible, entre les repères du constructeur. Sur une centrale, l’huile circule : séparateur, réservoir, régulateurs de niveau. Un niveau trop bas se cherche, il ne se corrige pas à l’aveugle.",
    prompt: "Le niveau d’huile du compresseur 2 est sous le repère mini. Cliquez ce que vous faites.",
    scene: { imgs: ["separateur","compresseurs"], t: "L’huile de la centrale.", d: "Elle part avec le gaz, passe par le séparateur, revient aux compresseurs." },
    blocks: [{ k: "renvoi", html: "Le circuit d’huile : <a href=\"../elements-circuit-huile/index.html\">Séparer et stocker</a> · <a href=\"../retour-huile-verifier/index.html\">Vérifier le retour</a>." }],
    act: { type: "quiz", choices: ["Je note le niveau et je cherche pourquoi avant d’ajouter de l’huile.", "J’ajoute de l’huile jusqu’au repère maxi.", "Je ne fais rien : le niveau varie.", "Je remplace le compresseur."], good: 0,
      explain: "Une huile qui manque a une cause : retour d’huile, régulateur de niveau, fuite d’huile. Ajouter sans chercher cache le défaut. On note le niveau sur la fiche et on cherche la cause." },
    correction: "On note le niveau et on cherche la cause avant d’ajouter de l’huile." }),

  screen({ id: "proprete-condenseur", dossier: "controler", title: "Le condenseur encrassé", kicker: "Contrôler · 2", codes: C2, level: "appliquer",
    text: "Le condenseur est dehors : feuilles en automne, pollen au printemps, poussière toute l’année. Encrassé, il évacue moins bien la chaleur. Un nettoyage régulier de la batterie fait partie de chaque visite.",
    prompt: "Le condenseur est encrassé, à air extérieur égal. Cliquez ce que fait la température de condensation.",
    scene: { imgs: ["condenseur"], t: "Le condenseur.", d: "Une grande batterie à ventilateurs, dehors." },
    act: { type: "quiz", choices: ["Elle monte : le condenseur évacue moins bien la chaleur.", "Elle baisse : le condenseur est plus froid.", "Elle ne change pas.", "Elle oscille de façon régulière."], good: 0,
      explain: "Un condenseur encrassé rejette moins de chaleur : la haute pression et la température de condensation montent, et les compresseurs consomment plus. D’où le nettoyage régulier." },
    correction: "La température de condensation monte : on nettoie la batterie." }),

  screen({ id: "controle-electrique", dossier: "controler", title: "Les intensités et les connexions", kicker: "Contrôler · 3", codes: C2, level: "appliquer",
    text: "Chaque compresseur porte une plaque avec son intensité maximale. L’intensité relevée doit rester sous ce maximum. Le resserrage des connexions se fait hors tension, après consignation, par une personne habilitée.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les trois autres : « Dans la plaque » ou « Au-dessus de la plaque ».",
    scene: { imgs: ["compresseurs"], t: "Les compresseurs.", d: "Chacun a sa plaque, son intensité maximale et son relevé." },
    blocks: [{ k: "loi", titre: "SÉCURITÉ : HORS TENSION", html: "On ne resserre jamais une connexion sous tension. Consigner d’abord, vérifier l’absence de tension, et seulement alors intervenir, avec l’habilitation qu’il faut. Voir <a href=\"../../../../legislation/stations/elec-consigner/index.html\">Consigner</a> (Législation)." }],
    act: { type: "sort", labels: ["Dans la plaque", "Au-dessus de la plaque"],
      example: { text: "Ventilateur du condenseur : plaque 1,2 A, relevé 1,1 A", good: 0, why: "Le relevé est sous l’intensité maximale de la plaque : tout va bien." },
      rows: [
        { text: "Compresseur 1 : plaque 14 A, relevé 12,8 A", good: 0, why: "12,8 A est sous les 14 A de la plaque.", bad: "12,8 A est sous les 14 A de la plaque : dans la plaque." },
        { text: "Compresseur 2 : plaque 14 A, relevé 18,5 A", good: 1, why: "18,5 A dépasse les 14 A de la plaque : défaut à noter.", bad: "18,5 A dépasse les 14 A de la plaque." },
        { text: "Compresseur 3 : plaque 14 A, relevé 13,9 A", good: 0, why: "13,9 A reste sous les 14 A de la plaque.", bad: "13,9 A reste sous les 14 A de la plaque : dans la plaque." }
      ] },
    correction: "Compresseurs 1 et 3 : dans la plaque. Compresseur 2 : au-dessus de la plaque." }),

  /* ============ LA FICHE ============ */
  screen({ id: "lire-une-fiche", dossier: "fiche", title: "Lire une fiche de visite", kicker: "La fiche · 1", codes: C2, level: "comprendre",
    text: "À la fin de la visite, on écrit une fiche : pour chaque opération, un résultat et une observation. Elle sert de point de départ à la visite suivante. On écrit la valeur lue, pas seulement « OK ».",
    prompt: "Exemple résolu : lisez la fiche, puis sa lecture en quatre points.",
    blocks: [{ k: "html", html: "" + "<table class=\"tableau\"><caption>Fiche de visite d’une centrale (exemple)</caption><thead><tr><th scope=\"col\">Opération</th><th scope=\"col\">Résultat</th><th scope=\"col\">Observation</th></tr></thead><tbody>" +
      "<tr><th scope=\"row\">Pressions</th><td>OK</td><td>Évaporation −10 °C, condensation 45 °C, comme à la mise en service</td></tr>" +
      "<tr><th scope=\"row\">Surchauffe</th><td>OK</td><td>8 K</td></tr>" +
      "<tr><th scope=\"row\">Huile, compresseur 3</th><td>À surveiller</td><td>Bas du voyant, encore visible</td></tr>" +
      "<tr><th scope=\"row\">Intensités</th><td>OK</td><td>Toutes sous la plaque</td></tr>" +
      "<tr><th scope=\"row\">Condenseur</th><td>Défaut</td><td>Batterie encrassée, nettoyée pendant la visite</td></tr></tbody></table>" +
      "<ol class=\"lecture\"><li><strong>« OK »</strong> : comme avant et dans les limites. On ne fait rien de plus.</li><li><strong>« À surveiller »</strong> : ça a un peu bougé, mais reste dans les limites. On regarde à la prochaine visite.</li><li><strong>« Défaut »</strong> : hors limite, ou panne. On corrige, ou on propose au client de corriger.</li><li><strong>L’observation</strong> : la valeur lue ou ce qui a été fait. C’est elle que le technicien suivant relira.</li></ol>" }] }),

  screen({ id: "remplir-la-fiche", dossier: "fiche", title: "À vous : OK, à surveiller ou défaut ?", kicker: "La fiche · 2", codes: C2, level: "appliquer",
    text: "Même lecture, autres opérations. Les trois états gardent le même sens : « OK » comme avant et dans les limites, « À surveiller » qui a un peu bougé mais reste dans les limites, « Défaut » hors limite ou en panne.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : cliquez le résultat à écrire sur la fiche.",
    act: { type: "sort", labels: ["OK", "À surveiller", "Défaut"],
      example: { text: "Silent-blocs : serrés, aucun jeu", good: 0, why: "Aucun jeu et bien serrés : comme il faut, on écrit « OK »." },
      rows: [
        { text: "Température de condensation : 39 °C, contre 38 °C à la dernière visite", good: 0, why: "1 K d’écart : dans la précision de lecture, OK.", bad: "1 K d’écart seulement : OK." },
        { text: "Niveau d’huile du compresseur 1 : à mi-hauteur du voyant", good: 0, why: "Bien visible, entre les repères : OK.", bad: "À mi-hauteur du voyant, entre les repères : OK." },
        { text: "Niveau d’huile du compresseur 3 : tout en bas du voyant, mais encore visible", good: 1, why: "Encore dans les limites, mais à la limite basse : à surveiller.", bad: "Il est encore visible, donc pas hors limite : à surveiller." },
        { text: "Intensité du compresseur 2 : 18,5 A, plaque 14 A", good: 2, why: "Au-dessus de la plaque : défaut.", bad: "18,5 A dépasse la plaque : c’est hors limite, donc un défaut." },
        { text: "Voyant liquide : des bulles en continu", good: 2, why: "Des bulles continues : quelque chose ne va pas, défaut.", bad: "Des bulles en continu ne sont pas normales : défaut." },
        { text: "Température de la chambre 2 : +3 °C, comme la consigne", good: 0, why: "Comme la consigne : OK.", bad: "Comme la consigne : OK." }
      ] },
    correction: "OK : condensation, huile du compresseur 1, chambre. À surveiller : huile du compresseur 3. Défaut : intensité du compresseur 2, voyant à bulles." }),

  screen({ id: "defaut-et-devis", dossier: "fiche", title: "Un défaut : qu’en fait-on ?", kicker: "La fiche · 3", codes: C2, level: "evaluer",
    text: "Quand on trouve un défaut, on le note sur la fiche et on le signale au client dès qu’on le constate. Le contrat de maintenance prévoit que le technicien propose un devis : la réparation attend l’accord du client.",
    prompt: "Vous avez noté « Défaut » pour l’intensité du compresseur 2. Cliquez la suite.",
    scene: { imgs: ["compresseurs"], t: "Un compresseur.", d: "Il consomme plus que sa plaque." },
    act: { type: "quiz", choices: ["Je le note, je préviens le client et je propose un devis ; la réparation attend son accord.", "Je répare tout de suite, sans rien dire.", "Je ne note rien : ce n’est pas dans le programme de visite.", "J’arrête la centrale et je pars."], good: 0,
      explain: "Le contrat type du fonds dit que le prestataire signale au client les travaux indispensables dès qu’il les constate, et propose un devis avant toute réparation. Le défaut est noté sur la fiche, avec la valeur lue." },
    correction: "Noter, prévenir le client, proposer un devis : la réparation attend son accord." }),

  /* ============ BILAN ============ */
  screen({ id: "cas-seul", dossier: "bilan", title: "Un cas complet, seul", kicker: "Bilan · 1 · à vous, sans guide", codes: C2, level: "evaluer",
    text: "Cas complet, à faire seul : visite annuelle d’une centrale positive de supermarché, à trois compresseurs et trois postes.",
    prompt: "Seul : écrivez le déroulé de votre visite : ce que vous relisez, mesurez, contrôlez et notez. Puis comparez avec la réponse type.",
    blocks: [{ k: "cas-boite", html: "<strong>Le cas.</strong> La dernière fiche de visite dit : tout est OK, sauf le niveau d’huile du compresseur 3, « à surveiller ». Le client se plaint que le meuble des produits laitiers est moins froid depuis une semaine." }],
    act: { type: "libre", label: "Votre déroulé, en quelques lignes :", placeholder: "Ce que je relis, ce que je mesure, ce que je contrôle, ce que je note…",
      answer: "<strong>Réponse type.</strong><ol><li><b>Avant de mesurer :</b> je relis la dernière fiche, le registre et les alarmes du régulateur.</li><li><b>Relevés :</b> pressions, surchauffe, sous-refroidissement, voyant, intensités. Je compare chacun à la dernière fiche.</li><li><b>Contrôles :</b> niveau d’huile (compresseur 3 d’abord), propreté du condenseur et des évaporateurs, étanchéité, connexions hors tension après consignation.</li><li><b>Le meuble moins froid :</b> je regarde son évaporateur, son électrovanne et son régulateur ; je compare ses relevés à ceux des autres postes.</li><li><b>La fiche :</b> pour chaque opération, un résultat (OK, à surveiller, défaut) et la valeur lue.</li><li><b>Défaut trouvé :</b> je le note, je préviens le client et je propose un devis.</li></ol>" },
    correction: "Voir la réponse type : relire, relever et comparer, contrôler, noter, signaler." }),

  screen({ id: "bilan", dossier: "bilan", title: "À retenir, puis pratiquer", kicker: "Bilan · 2", codes: C2, level: "evaluer",
    text: "Une visite suit un programme écrit : circuit, huile et mécanique, électrique, propreté. On relit avant de mesurer, on compare chaque relevé à la visite d’avant, on note la valeur lue. Un défaut se signale au client, avec un devis.",
    prompt: "Pour continuer : ouvrez une des suites.",
    blocks: [{ k: "liens", links: [
      { href: "../plan-maintenance-commercial-interactif/index.html", title: "Plan de maintenance du froid commercial", note: "La suite : périodicités et contrat (CP8)" },
      { href: "../etancheite-interactive/index.html", title: "L’étanchéité — de l’indice à la preuve", note: "Le cours : registre, relevés, localisation, trace" },
      { href: "../surchauffe-sous-refroidissement-interactif/index.html", title: "Surchauffe et sous-refroidissement", note: "Les deux preuves, pour lire les relevés" },
      { href: "../elements-circuit-huile/index.html", title: "Le circuit d’huile", note: "Séparer et stocker, puis régler et vérifier" },
      { href: "../../../../voyage/module-centrale.html", title: "Voyage dans tous ses états : les centrales", note: "Ce que surveille le technicien, à la fin du voyage" } ] }] })
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
