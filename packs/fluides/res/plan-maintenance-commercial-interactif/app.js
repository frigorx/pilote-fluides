"use strict";

const PH = {"compresseurs":{"src":"images/compresseurs.webp","t":"Compresseurs","alt":"Quatre compresseurs : à pistons, scroll, à vis, hermétique."},"clapet":{"src":"images/clapet-vannes-service.webp","t":"Clapet et vannes","alt":"Un clapet anti-retour à gauche, deux vannes d’isolement à droite."},"separateur":{"src":"images/separateur-huile.webp","t":"Séparateur d’huile","alt":"Séparateur d’huile bleu, avec ses raccords cuivre."},"condenseur":{"src":"images/condenseur-air.webp","t":"Condenseur à air","alt":"Condenseur à air à deux ventilateurs."},"bouteille":{"src":"images/reservoir-liquide.webp","t":"Bouteille de liquide","alt":"Bouteille de liquide sur pieds."},"evaporateur":{"src":"images/evaporateur-air.webp","t":"Évaporateur","alt":"Évaporateur à deux ventilateurs, suspendu."},"detendeur":{"src":"images/detendeur-thermostatique.webp","t":"Détendeur","alt":"Détendeur thermostatique, avec son bulbe et son capillaire."},"electrovanne":{"src":"images/electrovanne.webp","t":"Électrovanne","alt":"Électrovanne : bobine bleue sur un corps en laiton."},"filtre":{"src":"images/filtre-deshydrateur.webp","t":"Filtre déshydrateur","alt":"Filtre déshydrateur noir à raccords cuivre."},"voyant":{"src":"images/voyant-liquide.webp","t":"Voyant liquide","alt":"Voyant liquide en laiton, avec son hublot."},"pressostats":{"src":"images/pressostats.webp","t":"Pressostats","alt":"Deux pressostats : un gris, un bleu."},"capteur":{"src":"images/capteur-pression.webp","t":"Capteur de pression","alt":"Capteur de pression avec sa prise électrique."},"sonde":{"src":"images/sonde-temperature.webp","t":"Sonde de température","alt":"Sonde de température et son câble."},"compresseur":{"src":"images/compresseur.webp","t":"Compresseur","alt":"Compresseur à pistons semi-hermétique : le moteur est dans le carter."},"pressostatBP":{"src":"images/pressostat-bp.webp","t":"Pressostat BP","alt":"Pressostat basse pression : le boîtier bleu."},"pressostatHP":{"src":"images/pressostat-hp.webp","t":"Pressostat HP","alt":"Pressostat haute pression : le boîtier gris."},"contacteur":{"src":"images/contacteur.webp","t":"Contacteur","alt":"Contacteur tripolaire : ses bornes de puissance en haut et en bas."}};

const STATION = {
  slug: "plan-maintenance-commercial-interactif", cle: "plan-maintenance", port: 8799, carte: null, supportPc: false,
  titre: "Plan de maintenance du froid commercial : périodicités, contrat",
  titreCourt: "Plan de maintenance du froid commercial — périodicités, contrat",
  titleTag: "Plan de maintenance du froid commercial — périodicités, contrat",
  description: "Cours interactif : construire un plan de maintenance du froid commercial : maintenance systématique, conditionnelle et corrective, périodicités imposées par le règlement (contrôle d’étanchéité tous les 12, 6 ou 3 mois, détection des fuites, registre) et périodicités du contrat, lire un contrat de maintenance.",
  brandSmall: "Plan de maintenance",
  eyebrow: "FLUIDES · PLAN DE MAINTENANCE",
  h1: ["Plan de maintenance", "du froid commercial"],
  intro: "Un plan de maintenance dit quoi faire, quand, et qui l’impose. Vous apprenez la différence entre maintenance systématique, conditionnelle et corrective, les fréquences que fixe le règlement (contrôle d’étanchéité, détection des fuites, registre), puis à lire un contrat et à construire le plan d’une centrale.",
  homeVisual: { carte: false, legende: "Le règlement, le contrat, la fiche : trois documents qui font un plan.", images: [
    { src: "../bibliotheque/illu-g0.webp", alt: "Un registre ouvert avec un tampon, et une balance : le règlement et le registre." },
    { src: "../bibliotheque/illu-g3.webp", alt: "Main qui tient une planchette avec une liste de contrôle à cocher : le plan et la fiche de visite." },
    { src: "../bibliotheque/illu-g7b.webp", alt: "Main gantée qui brosse la batterie d’un condenseur : une opération du plan." } ] },
  homeNote: "<strong>Point réglementaire.</strong> Les fréquences du contrôle d’étanchéité (12, 6 ou 3 mois), le système de détection des fuites et le registre viennent du règlement (UE) 2024/573, articles 5 à 7. Toutes les autres fréquences viennent du contrat et de la notice du constructeur. Sur le chantier, ces textes et le contrat font foi.",
  codesBox: [
    ["TP Monteur dépanneur frigoriste (RNCP37876) — compétence professionnelle CP8", "« Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée »."],
    ["Avant ce cours", "Maintenance systématique d’une centrale : relevés, contrôles, fiche (la visite elle-même)."]
  ],
  printCodes: "TP Monteur dépanneur frigoriste (RNCP37876), compétence professionnelle CP8 « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée ».",
  printLoi: "les fréquences du contrôle d’étanchéité (12, 6 ou 3 mois selon la charge en tonnes équivalent CO₂), le système de détection des fuites et le registre viennent du règlement (UE) 2024/573, articles 5 à 7 ; les autres fréquences viennent du contrat et de la notice du constructeur.",
  reference: "TP Monteur dépanneur frigoriste (RNCP37876) : CP8 ; règlement (UE) 2024/573, articles 5 à 7",
  codeCle: { "TP CP8": "tp_mdf" },
  dossiers: [
    { id: "types", label: "Trois maintenances", note: "systématique, conditionnelle, corrective" },
    { id: "loi", label: "Ce que la loi impose", note: "étanchéité, détection, registre" },
    { id: "contrat", label: "Le contrat", note: "lire, ce qui est compris" },
    { id: "plan", label: "Le plan", note: "qui, quoi, quand" },
    { id: "bilan", label: "Bilan", note: "un cas, puis l’essentiel" }
  ],
  src: {
    reg: [
      "**Règlement (UE) 2024/573 du 7 février 2024** (Journal officiel du 20/02/2024), lu en entier pour les articles cités le 19/10/2026 sur le texte publié par l’Office des publications (<https://publications.europa.eu/resource/celex/32024R0573>, EUR-Lex étant fermé aux robots) :",
      "  **Article 5, paragraphe 1** : contrôles d’étanchéité obligatoires pour les équipements contenant 5 tonnes équivalent CO₂ ou plus de gaz à effet de serre fluorés de l’annexe I (équipements hermétiquement scellés exceptés dans des cas précis, non traités) ; **paragraphe 3** : contrôles faits par des personnes physiques certifiées conformément à l’article 10 ; **paragraphe 6** : fréquence minimale — moins de 50 t : tous les 12 mois, ou 24 mois avec un système de détection des fuites ; de 50 t à moins de 500 t : tous les 6 mois, ou 12 mois avec un système ; 500 t ou plus : tous les 3 mois, ou 6 mois avec un système.",
      "  **Article 6, paragraphes 1 et 3** : système de détection des fuites obligatoire à partir de 500 t éq. CO₂ pour les équipements fixes de réfrigération, climatisation, pompes à chaleur et protection contre l’incendie ; ces systèmes sont contrôlés au moins une fois tous les 12 mois.",
      "  **Article 7, paragraphes 1 et 2** : registre de chaque équipement (quantité et type de gaz, quantités ajoutées et récupérées avec les dates, identité de l’entreprise, dates et résultats des contrôles d’étanchéité et des réparations) ; conservation au moins cinq ans par l’exploitant, copie au moins cinq ans par l’entreprise, sauf base de données des autorités.",
      "Seuils exprimés en tonnes équivalent CO₂ : le PRP des fluides figure aux annexes du règlement ; dans les exercices il est **donné dans l’énoncé** (valeurs d’exemple, pas celles d’un fluide précis)."
    ],
    ref: [
      "**TP Monteur dépanneur frigoriste (RNCP37876), CP8** : « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée » (libellé de `rattachement/entrees/referentiels-pilotes.json` ; la fiche de mission donnait la forme abrégée). Le TP MDF n’est pas dans `HAL-v3/donnees/referentiels/peda/` : à confirmer."
    ],
    fonds: [
      "`03_BAC-MFER/S2-Systemes/contrat-froid-commercial_SMPAC-ENTREPRISE.pdf` (et sa variante `Contrat Maintenance VIVAL par SMPAC`) : structure d’un contrat de maintenance de froid commercial — matériel entretenu, programme d’entretien, périodicité (« 1 visite technique annuelle », avis au client environ deux semaines avant), dépannage sous 48 heures, hors contrat (main d’œuvre, pièces, fluide frigorigène, filtres), durée d’un an renouvelable par avenant trois mois avant l’échéance, redevance annuelle. Les noms de société, adresses et numéros ne sont pas repris ; le montant de 790 € HT est donné comme valeur d’exemple.",
      "`03_BAC-MFER/S2-Systemes/Froid_Commercial_et_Chambres_Froides.pdf` : « nettoyage régulier du condenseur (feuilles en automne, pollen au printemps) » ; « tenir un carnet avec les relevés quotidiens » (le client, pour son exploitation).",
      "Renvois vers l’existant, sans le refaire : Maintenance systématique d’une centrale (la visite), Traçabilité (Législation, registre et fiche d’intervention), F-Gaz III (Législation, seuils 5 / 50 / 500 t), l’outil « CO₂ & F-Gaz » de la boîte à outils (calcul en tonnes équivalent CO₂)."
    ],
    sec: [],
    sans: [
      "**Vocabulaire maintenance systématique, conditionnelle, corrective** : vocabulaire courant de la maintenance (norme NF EN 13306, payante, non consultée) ; définitions en une ligne dans le cours. **À relire par Franck.**",
      "**Transposition française** : le cours ne cite que le règlement européen. L’arrêté du 29 février 2016 (méthodes de contrôle) vise encore l’ancien règlement (UE) n° 517/2014, abrogé par le 2024/573 : **à vérifier par Franck** que les fréquences enseignées sont bien celles appliquées en France aujourd’hui, et s’il existe un arrêté d’application plus récent.",
      "**Les fréquences « exemple » du plan** (visite 1 fois par an, nettoyage du condenseur au printemps et à l’automne) : exemples d’un plan, donnés comme tels ; le contrat et la notice du constructeur les fixent.",
      "**Valeurs des exercices** (charges, PRP, montant de la redevance) : inventées ou reprises du contrat du fonds, annoncées comme valeurs d’exemple."
    ]
  },
  images: [
    ["`../bibliotheque/illu-g0.webp`, `illu-g3.webp`, `illu-g7b.webp` (accueil)", "Illustrations locales du réseau (bibliothèque d’images « Habilitation fluides », juillet 2026), déjà utilisées et validées ailleurs ; aucune n’a été produite pour ce cours", "Droits réservés inerWeb (voir `../bibliotheque/MANIFESTE.md`)"]
  ],
  lireMoi: {
    ligne: "Cours interactif du plan thermo-techno, ligne « Les centrales », après « Maintenance systématique d’une centrale ».",
    fait: "  Il apprend à distinguer maintenance systématique, conditionnelle et corrective ; à séparer ce que fixe le règlement européen\n  (contrôle d’étanchéité tous les 12, 6 ou 3 mois selon la charge en tonnes équivalent CO₂, système de détection des fuites,\n  registre conservé cinq ans) de ce que fixent le contrat et la notice ; à calculer la charge en tonnes équivalent CO₂ ; à lire un\n  contrat de maintenance (matériel, visites, hors contrat, durée) ; à construire un plan « quoi, quand, qui l’impose ».",
    codes: "  TP MDF (RNCP37876) : CP8 « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée ».",
    regl: "  Règlement (UE) 2024/573, articles 5 (fréquences, certification), 6 (détection des fuites) et 7 (registre), lus le 19/10/2026 sur\n  publications.europa.eu. SOURCES.md donne les passages ; le compte rendu liste ce que F. Henninot doit confirmer (transposition française)."
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

const CP8 = "TP CP8";

const screens = [
  /* ============ TROIS MAINTENANCES ============ */
  screen({ id: "trois-maintenances", dossier: "types", title: "Systématique, conditionnelle, corrective", kicker: "Trois maintenances · 1", codes: [CP8], level: "comprendre",
    text: "Il y a trois façons d’entretenir une installation. La systématique se fait à dates fixes. La conditionnelle se fait quand un relevé le demande. La corrective se fait après une panne. Un plan de maintenance règle surtout la première.",
    prompt: "Une opération est déjà rangée en exemple. Rangez les six autres : cliquez le type de maintenance.",
    blocks: [{ k: "def", html: "<strong>Systématique :</strong> à dates fixes, selon un calendrier. <strong>Conditionnelle :</strong> quand un relevé ou un état le demande. <strong>Corrective :</strong> après une panne." }],
    act: { type: "sort", labels: ["Systématique", "Conditionnelle", "Corrective"],
      example: { text: "Contrôler l’étanchéité tous les 12 mois", good: 0, why: "La date est fixée à l’avance, quel que soit l’état de l’installation : c’est de la maintenance systématique." },
      rows: [
        { text: "Visite annuelle prévue au contrat", good: 0, why: "Une visite à date fixe : systématique.", bad: "La visite est prévue au calendrier, même sans défaut : systématique." },
        { text: "Nettoyer le condenseur parce que la température de condensation a monté", good: 1, why: "C’est un relevé qui déclenche l’opération : conditionnelle.", bad: "Aucune panne, et pas de date fixe : c’est un relevé qui le demande, donc conditionnelle." },
        { text: "Remplacer un compresseur tombé en panne", good: 2, why: "On agit après la panne : corrective.", bad: "La panne est déjà là : corrective." },
        { text: "Changer le filtre déshydrateur parce que le voyant montre de l’humidité", good: 1, why: "C’est l’état du voyant qui le demande : conditionnelle.", bad: "Aucune panne, pas de calendrier : c’est l’état du voyant qui le demande, donc conditionnelle." },
        { text: "Dépanner une chambre froide qui ne descend plus en température", good: 2, why: "Elle est déjà en défaut : corrective.", bad: "La chambre est déjà en défaut : corrective." },
        { text: "Relever la température de la chambre chaque jour sur le carnet", good: 0, why: "Tous les jours, à date fixe : systématique.", bad: "Un relevé chaque jour suit un calendrier : systématique." }
      ] },
    correction: "Systématique : visite annuelle, relevé quotidien. Conditionnelle : nettoyage sur relevé, filtre sur voyant. Corrective : compresseur en panne, chambre en défaut." }),

  /* ============ CE QUE LA LOI IMPOSE ============ */
  screen({ id: "qui-fixe-la-frequence", dossier: "loi", title: "Qui fixe la fréquence ?", kicker: "La loi · 1", codes: [CP8], level: "comprendre",
    text: "Pour quelques opérations, la fréquence est fixée par un texte : le règlement européen sur les gaz fluorés. Il en fixe trois : le contrôle d’étanchéité, le contrôle du système de détection des fuites et la conservation du registre. Pour toutes les autres, ce sont le contrat et la notice du constructeur. Un bon plan sépare les deux.",
    prompt: "Une opération est déjà rangée en exemple. Rangez les six autres : « Le règlement » ou « Le contrat et la notice ».",
    blocks: [{ k: "source", html: "Source : règlement (UE) 2024/573, article 5 paragraphe 6 (étanchéité), article 6 paragraphe 3 (détection des fuites), article 7 paragraphe 2 (registre : au moins cinq ans)." }],
    act: { type: "sort", labels: ["Le règlement", "Le contrat et la notice"],
      example: { text: "Graissage des moteurs de ventilateur", good: 1, why: "Aucun texte ne fixe cette fréquence : elle vient de la notice du constructeur et du contrat." },
      rows: [
        { text: "Contrôle d’étanchéité d’un équipement de 60 t éq. CO₂", good: 0, why: "Le règlement fixe sa fréquence selon la charge (article 5, paragraphe 6).", bad: "La fréquence du contrôle d’étanchéité est fixée par le règlement, selon la charge." },
        { text: "Nettoyage de la batterie du condenseur", good: 1, why: "Aucun texte ne la fixe : contrat et notice.", bad: "Aucun règlement ne fixe cette fréquence : elle vient du contrat et de la notice." },
        { text: "Contrôle du système de détection des fuites d’un équipement de 500 t éq. CO₂ ou plus", good: 0, why: "Le règlement impose un contrôle au moins tous les 12 mois (article 6, paragraphe 3).", bad: "Le règlement fixe ce contrôle : au moins tous les 12 mois (article 6)." },
        { text: "Visite d’entretien du compresseur", good: 1, why: "Elle vient du programme du contrat et de la notice.", bad: "Aucun règlement ne fixe la visite d’entretien : contrat et notice." },
        { text: "Durée de conservation du registre de l’équipement", good: 0, why: "Le règlement impose au moins cinq ans (article 7, paragraphe 2).", bad: "Le règlement fixe la durée de conservation du registre : au moins cinq ans." },
        { text: "Resserrage des connexions électriques", good: 1, why: "Aucun règlement ne fixe sa fréquence : contrat et notice.", bad: "Aucun règlement ne fixe cette fréquence : contrat et notice." }
      ] },
    correction: "Le règlement : contrôle d’étanchéité, contrôle du système de détection, conservation du registre. Le contrat et la notice : nettoyage, visite du compresseur, connexions." }),

  screen({ id: "seuils-et-calcul", dossier: "loi", title: "Le contrôle d’étanchéité : 12 ou 6 mois", kicker: "La loi · 2", codes: [CP8], level: "appliquer",
    text: "À partir de 5 tonnes équivalent CO₂, le contrôle d’étanchéité est obligatoire, et fait par une personne certifiée. Sa fréquence dépend de la charge en tonnes équivalent CO₂ : on la calcule avec le PRP du fluide, donné dans l’exercice.",
    prompt: "Une installation est déjà rangée en exemple. Rangez les six autres : cliquez la fréquence minimale du contrôle d’étanchéité, sans système de détection des fuites.",
    blocks: [
      { k: "def", html: "<strong>Tonnes équivalent CO₂ (t éq. CO₂) :</strong> charge en kg × PRP ÷ 1 000. Le PRP dit l’effet de serre du fluide : il est donné dans l’énoncé." },
      { k: "tableau", caption: "Fréquence minimale du contrôle d’étanchéité (règlement (UE) 2024/573, article 5, paragraphe 6)", head: ["Charge", "Sans système de détection", "Avec un système de détection"], rows: [
        ["Moins de 50 t éq. CO₂", "tous les 12 mois", "tous les 24 mois"],
        ["De 50 t à moins de 500 t", "tous les 6 mois", "tous les 12 mois"],
        ["500 t ou plus", "tous les 3 mois", "tous les 6 mois"] ] },
      { k: "source", html: "Source : règlement (UE) 2024/573, article 5, paragraphes 1 et 6. Pour les fluides de l’annexe I du règlement, au-dessous de 5 t éq. CO₂ : pas de contrôle périodique obligatoire." }
    ],
    act: { type: "sort", labels: ["12 mois", "6 mois"],
      example: { text: "40 kg, PRP 1 500 : 40 × 1 500 ÷ 1 000 = 60 t éq. CO₂", good: 1, why: "60 t : entre 50 t et 500 t, donc au moins tous les 6 mois." },
      rows: [
        { text: "20 kg, PRP 1 500", good: 0, why: "20 × 1 500 ÷ 1 000 = 30 t : moins de 50 t, donc tous les 12 mois.", bad: "20 × 1 500 ÷ 1 000 = 30 t : c’est moins de 50 t." },
        { text: "100 kg, PRP 1 500", good: 1, why: "100 × 1 500 ÷ 1 000 = 150 t : entre 50 t et 500 t, donc tous les 6 mois.", bad: "100 × 1 500 ÷ 1 000 = 150 t : c’est plus de 50 t." },
        { text: "40 kg, PRP 4 000", good: 1, why: "40 × 4 000 ÷ 1 000 = 160 t : entre 50 t et 500 t, donc tous les 6 mois.", bad: "40 × 4 000 ÷ 1 000 = 160 t : c’est plus de 50 t." },
        { text: "25 kg, PRP 1 500", good: 0, why: "25 × 1 500 ÷ 1 000 = 37,5 t : moins de 50 t, donc tous les 12 mois.", bad: "25 × 1 500 ÷ 1 000 = 37,5 t : c’est moins de 50 t." },
        { text: "300 kg, PRP 1 500", good: 1, why: "300 × 1 500 ÷ 1 000 = 450 t : entre 50 t et 500 t, donc tous les 6 mois.", bad: "300 × 1 500 ÷ 1 000 = 450 t : c’est plus de 50 t et moins de 500 t." },
        { text: "10 kg, PRP 1 500", good: 0, why: "10 × 1 500 ÷ 1 000 = 15 t : moins de 50 t (et plus de 5 t), donc tous les 12 mois.", bad: "10 × 1 500 ÷ 1 000 = 15 t : c’est moins de 50 t." }
      ] },
    correction: "Moins de 50 t : 12 mois (20 kg, 25 kg, 10 kg). De 50 t à moins de 500 t : 6 mois (100 kg, 40 kg à PRP 4 000, 300 kg)." }),

  screen({ id: "grosse-centrale", dossier: "loi", title: "À partir de 500 t : un système de détection", kicker: "La loi · 3", codes: [CP8], level: "appliquer",
    text: "À partir de 500 tonnes équivalent CO₂, un système de détection des fuites est obligatoire sur une installation de froid. Il alerte l’exploitant ou l’entreprise qui l’entretient, et il est lui-même contrôlé au moins tous les 12 mois.",
    prompt: "Une grande centrale contient 150 kg de fluide de PRP 4 000 : 150 × 4 000 ÷ 1 000 = 600 t éq. CO₂. Cliquez ce que dit le règlement.",
    blocks: [{ k: "source", html: "Source : règlement (UE) 2024/573, article 6, paragraphes 1 et 3 (détection obligatoire à partir de 500 t, contrôlée tous les 12 mois) ; article 5, paragraphe 6, point c (contrôle d’étanchéité tous les 6 mois avec ce système)." }, { k: "renvoi", html: "Les seuils 5, 50 et 500 t en détail : <a href=\"../../../../legislation/stations/fgaz-3/index.html\">F-Gaz III</a> (Législation). Pour calculer une charge : l’outil « CO₂ & F-Gaz » de la boîte à outils, sur le plan." }],
    act: { type: "quiz", choices: ["Système de détection des fuites obligatoire, contrôlé au moins tous les 12 mois ; contrôle d’étanchéité au moins tous les 6 mois.", "Rien de plus que pour une centrale de 100 t.", "Le système de détection remplace le contrôle d’étanchéité.", "Le contrôle d’étanchéité doit se faire chaque mois."], good: 0,
      explain: "À partir de 500 t, le système de détection est obligatoire (article 6, paragraphe 1) et contrôlé tous les 12 mois (paragraphe 3). Le contrôle d’étanchéité reste obligatoire : au moins tous les 6 mois avec ce système (article 5, paragraphe 6)." },
    correction: "Détection des fuites obligatoire (contrôlée tous les 12 mois) et contrôle d’étanchéité tous les 6 mois." }),

  screen({ id: "detection-et-frequence", dossier: "loi", title: "Un système de détection allège le contrôle", kicker: "La loi · 4", codes: [CP8], level: "appliquer",
    text: "Un système de détection des fuites installé fait passer la fréquence au palier du dessus : 12 mois au lieu de 6, 24 mois au lieu de 12. Ce n’est jamais une dispense de contrôle.",
    prompt: "Une centrale de 120 t éq. CO₂ est équipée d’un système de détection des fuites. Cliquez sa fréquence minimale de contrôle d’étanchéité.",
    blocks: [{ k: "source", html: "Source : règlement (UE) 2024/573, article 5, paragraphe 6, points a et b." }],
    act: { type: "quiz", choices: ["Tous les 12 mois.", "Tous les 6 mois.", "Tous les 3 mois.", "Aucun contrôle : le système suffit."], good: 0,
      explain: "120 t : entre 50 t et 500 t. Sans système, ce serait tous les 6 mois ; avec un système de détection des fuites, tous les 12 mois (article 5, paragraphe 6, point b)." },
    correction: "120 t avec système de détection : tous les 12 mois." }),

  screen({ id: "le-registre", dossier: "loi", title: "Le registre de l’équipement", kicker: "La loi · 5", codes: [CP8], level: "appliquer",
    text: "L’exploitant tient un registre pour chaque équipement soumis au contrôle d’étanchéité. On y écrit le fluide, les quantités ajoutées ou récupérées, les dates et résultats des contrôles, l’entreprise qui est intervenue. Il se conserve au moins cinq ans.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : « Au registre » ou « Pas au registre ».",
    blocks: [{ k: "source", html: "Source : règlement (UE) 2024/573, article 7, paragraphes 1 et 2 (contenu du registre, conservation au moins cinq ans)." }, { k: "renvoi", html: "Pour la fiche d’intervention et le registre : <a href=\"../../../../legislation/stations/tracabilite-fluides/index.html\">Traçabilité</a> (Législation)." }],
    act: { type: "sort", labels: ["Au registre", "Pas au registre"],
      example: { text: "La quantité et le type de fluide contenus dans l’équipement", good: 0, why: "C’est la première information que demande le règlement (article 7, paragraphe 1)." },
      rows: [
        { text: "La quantité de fluide ajoutée, avec la date", good: 0, why: "Chaque ajout de fluide se note avec sa date.", bad: "Le règlement demande les quantités ajoutées et leur date." },
        { text: "La quantité de fluide récupérée", good: 0, why: "Elle se note aussi.", bad: "Le règlement demande la quantité récupérée." },
        { text: "Les dates et résultats des contrôles d’étanchéité", good: 0, why: "Avec les dates et résultats des réparations de fuites.", bad: "Le règlement demande les dates et résultats des contrôles." },
        { text: "L’identité de l’entreprise qui a fait l’entretien", good: 0, why: "Et le numéro de son certificat, le cas échéant.", bad: "Le règlement demande l’identité de l’entreprise qui est intervenue." },
        { text: "Le prix du devis", good: 1, why: "Le registre n’est pas un document commercial.", bad: "Le prix n’est pas une information demandée pour le registre." },
        { text: "La couleur de la centrale", good: 1, why: "Rien à voir avec le fluide ou les contrôles.", bad: "La couleur n’a aucun rapport avec le registre." }
      ] },
    correction: "Au registre : fluide, quantités ajoutées et récupérées, contrôles, entreprise. Pas au registre : prix du devis, couleur de la centrale." }),

  /* ============ LE CONTRAT ============ */
  screen({ id: "lire-un-contrat", dossier: "contrat", title: "Lire un contrat de maintenance", kicker: "Le contrat · 1", codes: [CP8], level: "comprendre",
    text: "Un contrat de maintenance dit trois choses : ce qui est entretenu, à quelle fréquence, et ce qui est compris ou non dans le prix. Elles se lisent dans les conditions particulières.",
    prompt: "Exemple résolu : lisez les conditions particulières, puis leur lecture en quatre points.",
    blocks: [
      { k: "constat", caption: "Conditions particulières d’un contrat de maintenance (exemple)", rows: [
        ["Matériel entretenu", "1 chambre froide positive, 1 chambre froide négative"],
        ["Visites d’entretien", "1 visite technique par an ; le client est prévenu environ deux semaines avant"],
        ["Dépannage", "Intervention sous 48 heures sur simple appel, aux heures d’ouverture"],
        ["Hors contrat", "Main d’œuvre, pièces neuves et fluide frigorigène d’un dépannage ; filtres"],
        ["Durée", "1 an, renouvelable chaque année par avenant, 3 mois avant l’échéance"],
        ["Redevance annuelle", "790 € HT (valeur d’exemple)"] ] },
      { k: "lecture", items: [
        "<strong>« Matériel entretenu »</strong> : ce qui est couvert. Un appareil absent de la liste n’est pas entretenu.",
        "<strong>« Visites d’entretien »</strong> : la fréquence du programme de visite. Ici, une fois par an.",
        "<strong>« Hors contrat »</strong> : ce qui se facture en plus lors d’un dépannage.",
        "<strong>« Durée »</strong> : un an, puis renouvellement par avenant, à demander trois mois avant la fin." ] }
    ] }),

  screen({ id: "compris-ou-hors-contrat", dossier: "contrat", title: "À vous : compris ou facturé en plus ?", kicker: "Le contrat · 2", codes: [CP8], level: "appliquer",
    text: "Même lecture, autres lignes. Le programme de la visite est compris dans la redevance. Ce qui sort du programme (main d’œuvre d’un dépannage, pièces, fluide, filtres) est hors contrat : il est facturé en plus, sur devis.",
    prompt: "Une ligne est déjà rangée en exemple. Rangez les six autres : « Compris dans le contrat » ou « Facturé en plus ».",
    act: { type: "sort", labels: ["Compris dans le contrat", "Facturé en plus"],
      example: { text: "La visite d’entretien du programme", good: 0, why: "Elle est prévue au contrat : comprise dans la redevance annuelle." },
      rows: [
        { text: "Le nettoyage des échangeurs prévu au programme", good: 0, why: "Il fait partie du programme de visite : compris.", bad: "Le nettoyage des échangeurs est dans le programme de visite : compris." },
        { text: "La main d’œuvre d’une réparation", good: 1, why: "La main d’œuvre d’un dépannage est hors contrat : facturée en plus.", bad: "La main d’œuvre d’une réparation est hors contrat." },
        { text: "Une pièce neuve pour remplacer une pièce défectueuse", good: 1, why: "Les pièces neuves sont exclues du contrat : facturées en plus.", bad: "Les pièces neuves sont exclues du contrat." },
        { text: "Le fluide frigorigène ajouté après une fuite", good: 1, why: "Le fluide est exclu du contrat : facturé en plus.", bad: "Le fluide frigorigène est exclu du contrat." },
        { text: "Le contrôle des pressions prévu au programme", good: 0, why: "Il fait partie du programme de visite : compris.", bad: "Le contrôle des pressions est dans le programme de visite : compris." },
        { text: "Les filtres à remplacer", good: 1, why: "La fourniture des filtres est exclue du contrat : facturée en plus.", bad: "La fourniture des filtres est exclue du contrat." }
      ] },
    correction: "Compris : nettoyage des échangeurs, contrôle des pressions. Facturé en plus : main d’œuvre, pièce neuve, fluide, filtres." }),

  /* ============ LE PLAN ============ */
  screen({ id: "plan-exemple", dossier: "plan", title: "Un plan de maintenance : qui, quoi, quand", kicker: "Le plan · 1", codes: [CP8], level: "comprendre",
    text: "Le plan range tout sur une page : chaque opération, sa fréquence, et qui l’impose. Les fréquences du règlement sont des minimums : on peut faire plus, jamais moins. Les autres fréquences viennent du contrat et de la notice.",
    prompt: "Exemple résolu : lisez le plan d’une centrale, puis sa lecture en trois points.",
    blocks: [
      { k: "tableau", caption: "Plan de maintenance d’une centrale de 135 t éq. CO₂, sans système de détection (exemple)", head: ["Opération", "Fréquence", "Qui l’impose"], rows: [
        ["Contrôle d’étanchéité", "au moins tous les 6 mois", "Le règlement"],
        ["Registre : chaque contrôle, chaque ajout de fluide", "à chaque intervention ; conservé au moins 5 ans", "Le règlement"],
        ["Visite d’entretien (programme complet)", "1 fois par an (exemple)", "Le contrat"],
        ["Nettoyage de la batterie du condenseur", "au printemps et à l’automne (exemple)", "Le contrat et la notice"],
        ["Relevé de température sur le carnet", "chaque jour (exemple)", "Le client, pour son exploitation"] ] },
      { k: "lecture", items: [
        "<strong>La ligne « Le règlement »</strong> : une fréquence minimale, la même pour tous. 135 t éq. CO₂ sans détection : tous les 6 mois.",
        "<strong>Les lignes « Le contrat et la notice »</strong> : des fréquences à adapter à l’installation. Ici, ce sont des exemples.",
        "<strong>La ligne « Le client »</strong> : le relevé quotidien se fait sur le carnet de la chambre, pas par le technicien." ] },
      { k: "source", html: "Sources : règlement (UE) 2024/573, article 5 paragraphe 6 point b (6 mois, 135 t sans système de détection) et article 7 paragraphe 2 (registre conservé cinq ans). Les autres lignes sont des exemples." }
    ] }),

  /* ============ BILAN ============ */
  screen({ id: "cas-seul", dossier: "bilan", title: "Un cas complet, seul", kicker: "Bilan · 1 · à vous, sans guide", codes: [CP8], level: "evaluer",
    text: "Cas complet, à faire seul : le plan de maintenance d’une centrale positive.",
    prompt: "Seul : écrivez le plan : les opérations, leur fréquence, et qui l’impose. Puis comparez avec la réponse type.",
    blocks: [{ k: "cas-boite", html: "<strong>Le cas.</strong> Une centrale positive contient 90 kg de fluide, de PRP 1 500. Elle n’a pas de système de détection des fuites. Le contrat existant prévoit une visite d’entretien par an." }],
    act: { type: "libre", label: "Votre plan, en quelques lignes :", placeholder: "Le calcul de la charge, les opérations, leur fréquence, qui l’impose…",
      answer: "<strong>Réponse type.</strong><ol><li><b>Charge :</b> 90 × 1 500 ÷ 1 000 = 135 t éq. CO₂ : entre 50 t et 500 t.</li><li><b>Contrôle d’étanchéité :</b> au moins tous les 6 mois, par une personne certifiée (règlement). Avec un système de détection des fuites, ce serait tous les 12 mois.</li><li><b>Registre :</b> chaque contrôle, chaque ajout de fluide, chaque réparation de fuite ; conservé au moins 5 ans (règlement).</li><li><b>Visite d’entretien :</b> une fois par an, programme complet (contrat).</li><li><b>Nettoyage du condenseur :</b> selon le contrat et la notice, par exemple au printemps et à l’automne.</li><li><b>Relevé quotidien :</b> sur le carnet, par le client.</li></ol>" },
    correction: "Voir la réponse type : 135 t, contrôle tous les 6 mois, registre 5 ans, visite annuelle, nettoyage, carnet." }),

  screen({ id: "bilan", dossier: "bilan", title: "À retenir, puis pratiquer", kicker: "Bilan · 2", codes: [CP8], level: "evaluer",
    text: "Trois maintenances : systématique, conditionnelle, corrective. Le règlement fixe le contrôle d’étanchéité (12 ou 6 mois selon la charge en t éq. CO₂), la détection des fuites à partir de 500 t et le registre. Le contrat et la notice fixent le reste.",
    prompt: "Pour continuer : ouvrez une des suites.",
    blocks: [{ k: "source", html: "Source : règlement (UE) 2024/573, articles 5 à 7." }, { k: "liens", links: [
      { href: "../maintenance-centrale-interactif/index.html", title: "Maintenance systématique d’une centrale", note: "La visite elle-même : relevés, contrôles, fiche" },
      { href: "../centrale-positive-interactif/index.html", title: "Assembler une centrale positive", note: "La centrale vue de l’intérieur, pour l’assembler" },
      { href: "../../../../legislation/stations/fgaz-3/index.html", title: "F-Gaz III", note: "Les seuils 5, 50 et 500 t éq. CO₂ (Législation)" },
      { href: "../../../../legislation/stations/tracabilite-fluides/index.html", title: "Traçabilité des fluides", note: "Le registre et la fiche d’intervention (Législation)" },
      { href: "../etancheite-interactive/index.html", title: "L’étanchéité — de l’indice à la preuve", note: "Le cours : registre, relevés, localisation, trace" } ] }] })
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
