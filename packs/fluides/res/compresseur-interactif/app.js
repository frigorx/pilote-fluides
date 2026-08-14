"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const dossiers = [
  { id: "observer", label: "Observer", note: "reconnaître la machine" },
  { id: "installer", label: "Installer", note: "porter, fixer, protéger" },
  { id: "regler", label: "Régler", note: "sécurité et service" },
  { id: "verifier", label: "Vérifier", note: "l’huile d’abord" },
  { id: "controler", label: "Contrôler", note: "prouver" },
];

const quizAnswers = {};
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

function safeStoredRateIndex() {
  try {
    const stored = Number(localStorage.getItem("compresseur-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("compresseur-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function stripHtml(value) { const box = document.createElement("div"); box.innerHTML = value; return box.textContent || ""; }
function screen(data) { return { level: "comprendre", codes: [], prompt: "", speak: "", ...data }; }

function statement(item) {
  return `<div class="panel"><div class="panel-title">${esc(item.visual || item.title)}</div><div class="diagram">${item.diagram || ""}</div></div>`;
}
function causeScene(dirt = 8, fanOn = true) {
  const severity = !fanOn || dirt > 72 ? "danger" : dirt > 35 ? "warn" : "";
  const word = severity === "danger" ? "PRESSION TRÈS ÉLEVÉE" : severity === "warn" ? "PRESSION EN HAUSSE" : "PRESSION HABITUELLE";
  const needle = !fanOn || dirt > 72 ? 6 : dirt > 35 ? -55 : -130;
  return `<div class="cause-scene">
    <div><div class="air-arrows" style="--air:${fanOn ? Math.max(.16,1-dirt/115) : .08}" aria-hidden="true">→ → →</div><div class="coil" style="--dirt:${(dirt/100*.72).toFixed(2)}"><span class="fan ${fanOn ? "" : "off"}" aria-hidden="true"></span></div><p class="big-label">Batterie ${dirt > 55 ? "grise" : dirt > 20 ? "encrassée" : "propre"} · ventilateur ${fanOn ? "en marche" : "arrêté"}</p></div>
    <div class="gauge-wrap"><div class="gauge" role="img" aria-label="Indication qualitative de la pression de condensation"><span class="needle" style="--needle:${needle}deg"></span></div><span class="state-word ${severity}">${word}</span><p>Lecture qualitative, sans valeur de chantier.</p></div>
  </div>`;
}
function choiceMarkup(choices, name) {
  return `<div class="panel"><div class="cards" style="--cols:${Math.min(choices.length,3)}">${choices.map((c,i)=>`<button class="choice" type="button" data-choice="${i}" data-name="${name}"><strong>${esc(c.title)}</strong><small>${esc(c.note || "")}</small></button>`).join("")}</div><div class="feedback" id="feedback">Choisissez, puis lisez la conséquence.</div></div>`;
}
function wireChoice({ good, messages, lock = false }) {
  $$('[data-choice]').forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.choice);
    if (lock && $$('.choice.good,.choice.bad').length) return;
    $$('.choice').forEach(b => b.classList.remove("selected", "good", "bad"));
    button.classList.add(index === good ? "good" : "bad");
    const feedback = $("#feedback");
    feedback.className = `feedback ${index === good ? "good" : "bad"}`;
    feedback.innerHTML = `<strong>${index === good ? "Correct." : "À corriger."}</strong> ${messages[index]}`;
  }));
}
function checklistMarkup(items) {
  return `<div class="panel"><div class="cards" style="--cols:${Math.min(items.length,3)}">${items.map((item,i)=>`<button class="check-card" type="button" data-check="${i}" aria-pressed="false"><strong>${esc(item.title)}</strong><small>${esc(item.note)}</small></button>`).join("")}</div><div class="feedback" id="feedback">Ouvrez chaque point de contrôle.</div></div>`;
}
function wireChecklist(items) {
  $$('[data-check]').forEach(button => button.addEventListener("click", () => {
    button.classList.add("good"); button.setAttribute("aria-pressed", "true");
    const item = items[Number(button.dataset.check)];
    $("#feedback").className = "feedback good";
    $("#feedback").innerHTML = `<strong>${esc(item.title)}.</strong> ${esc(item.detail)}`;
  }));
}
function quizMarkup(item) {
  const saved = quizAnswers[item.id];
  return `<div class="panel"><div class="cards" style="--cols:2">${item.quiz.choices.map((choice,i)=>`<button class="choice ${saved === i ? (i === item.quiz.good ? "good" : "bad") : ""}" type="button" data-quiz-choice="${i}" ${saved !== undefined ? "disabled" : ""}><strong>${String.fromCharCode(65+i)}.</strong><small>${esc(choice)}</small></button>`).join("")}</div><div class="feedback ${saved === undefined ? "" : saved === item.quiz.good ? "good" : "bad"}" id="feedback">${saved === undefined ? "Choisissez une réponse." : `<strong>${saved === item.quiz.good ? "Correct." : "À revoir."}</strong> ${esc(item.quiz.explain)}`}</div></div>`;
}
function wireQuiz(item) {
  $$('[data-quiz-choice]').forEach(button => button.addEventListener("click", () => {
    if (quizAnswers[item.id] !== undefined) return;
    quizAnswers[item.id] = Number(button.dataset.quizChoice);
    renderCurrent(false);
  }));
}

const screens = [

  /* ---------------- OBSERVER ---------------- */

  screen({ id:"familles-machines", dossier:"observer", title:"Trois enveloppes, trois façons d’intervenir", kicker:"Observer · 1", level:"comprendre", text:"Hermétique : moteur et compression scellés dans une même enveloppe soudée — on remplace, on n’ouvre pas. Semi-hermétique : enveloppe boulonnée, certains organes se déposent. Ouvert : moteur séparé, accouplement et garniture d’étanchéité. La théorie complète — types, piston, volume balayé, rendement volumétrique — est dans le Module Compresseur du portail, relié à la même fiche.", prompt:"Sur quelle enveloppe une réparation interne est-elle possible sur site ?", render:()=>choiceMarkup([{title:"Semi-hermétique",note:"boulonnée, elle se rouvre selon la notice"},{title:"Hermétique",note:"soudée : elle se remplace, elle ne s’ouvre pas"},{title:"Aucune des trois",note:"l’ouvert aussi se répare, moteur séparé"}],"familles"), wire:()=>wireChoice({good:0,messages:["Boulonnée, elle se rouvre — dans les limites de la notice et de l’habilitation.","Non — l’enveloppe soudée ne se rouvre pas : l’hermétique se remplace.","Si — le semi-hermétique et l’ouvert se réparent ; c’est l’hermétique qui ne s’ouvre pas."]}) }),

  screen({ id:"plaque-signaletique", dossier:"observer", title:"La plaque signalétique parle la première", kicker:"Observer · 2", level:"appliquer", text:"Avant tout geste, la plaque dit ce que la machine accepte : alimentation électrique, fluides autorisés, limites de pression. Un compresseur alimenté ou chargé hors de sa plaque est déjà en panne — elle n’est juste pas encore visible.", prompt:"Ouvrez chaque point avant de toucher la machine.", render:()=>checklistMarkup([{title:"Alimentation",note:"tension, fréquence, nombre de phases",detail:"Comparer la plaque au réseau réellement présent au tableau."},{title:"Fluides admis",note:"la liste de la plaque fait foi",detail:"Un fluide absent de la plaque ne rentre pas, même « proche »."},{title:"Limites de pression",note:"basse et haute pression maximales",detail:"Elles bornent les réglages de toutes les sécurités en aval."}]), wire:()=>wireChecklist([0,1,2]) }),

  screen({ id:"carter-et-huile", dossier:"observer", title:"Le carter : là où vivent l’huile et le fluide", kicker:"Observer · 3", level:"comprendre", text:"Le carter porte l’huile de lubrification, et cette huile voyage : une partie part avec le fluide comprimé et doit revenir. Le voyant de carter, la résistance de carter et la pression qui y règne décident de la santé de la machine — c’est ici que se joueront les vérifications.", prompt:"Pourquoi l’huile du carter concerne-t-elle tout le circuit ?", render:()=>choiceMarkup([{title:"Une partie part avec le fluide et doit revenir",note:"le circuit entier participe au retour"},{title:"Elle reste enfermée dans le carter",note:"ce serait plus simple, mais non"},{title:"Elle ne sert qu’au démarrage",note:"la lubrification est permanente"}],"carter"), wire:()=>wireChoice({good:0,messages:["C’est tout l’enjeu du retour d’huile : ce qui part doit revenir, en permanence.","Non — l’huile est entraînée par le fluide comprimé, elle circule.","Non — sans huile en marche, la mécanique se détruit."]}) }),

  /* ---------------- INSTALLER (6.02) ---------------- */

  screen({ id:"assise-vibrations", dossier:"installer", title:"Poser sans transmettre", kicker:"Installer · 1", codes:["6.02"], level:"appliquer", text:"Un compresseur vibre. L’assise doit être plane et porteuse, les plots antivibratiles conformes à la notice, et les tuyauteries raccordées sans contrainte — elles ne tiennent jamais la machine et ne doivent pas transmettre les vibrations au bâti.", prompt:"Quel montage est correct ?", render:()=>choiceMarkup([{title:"Assise plane, plots selon notice, tubes libres de contrainte",note:"la machine vit, le bâti dort"},{title:"Calé sur les tubes, sans plots",note:"les raccords deviennent le support"},{title:"Serré au châssis, sans jeu",note:"toute la vibration part dans le bâti"}],"assise"), wire:()=>wireChoice({good:0,messages:["La vibration reste sur la machine ; les raccords et le voisinage sont protégés.","Non — les tubes ne sont pas un support : contrainte, fatigue, fuite.","Non — sans découplage, la vibration voyage et fatigue tout ce qu’elle touche."]}) }),

  screen({ id:"materiel-securite", dossier:"installer", title:"Installer, c’est AUSSI le matériel de contrôle et de sécurité", kicker:"Installer · 2", codes:["6.02"], level:"appliquer", text:"Le code le dit en toutes lettres : installer correctement un compresseur, « y compris le matériel de contrôle et de sécurité ». Une machine posée sans ses protections raccordées n’est pas installée — elle est en danger.", prompt:"Ouvrez chaque point avant la mise en service.", render:()=>checklistMarkup([{title:"Sécurité haute pression",note:"raccordée, non shuntée",detail:"Le pressostat de sécurité HP protège l’enveloppe : jamais ponté, jamais « pour l’essai »."},{title:"Protection du moteur",note:"selon le schéma électrique",detail:"Protections thermiques et électriques câblées comme le constructeur l’exige."},{title:"Organes de contrôle",note:"régulation raccordée et identifiée",detail:"Pressostats et thermostats de régulation à leur place, repérés, accessibles."}]), wire:()=>wireChecklist([0,1,2]) }),

  /* ---------------- RÉGLER (6.03 · 6.04) ---------------- */

  screen({ id:"securite-ou-controle", dossier:"regler", title:"Sécurité et contrôle : deux familles, deux logiques", kicker:"Régler · 1", codes:["6.03"], level:"comprendre", text:"Un interrupteur de CONTRÔLE régule la marche normale : il enclenche et déclenche tous les jours. Un interrupteur de SÉCURITÉ n’agit qu’en dernier recours — souvent à réarmement manuel, pour qu’un humain vienne voir POURQUOI il a déclenché. Décaler une sécurité pour « faire tenir » une machine, c’est supprimer le dernier filet.", prompt:"Une machine déclenche sa sécurité haute pression chaque après-midi. Le bon geste ?", render:()=>choiceMarkup([{title:"Chercher la cause du déclenchement",note:"la sécurité dit la vérité"},{title:"Remonter le seuil de la sécurité",note:"le filet disparaît"},{title:"Passer en réarmement automatique",note:"plus personne ne viendra voir"}],"secu"), wire:()=>wireChoice({good:0,messages:["La sécurité a fait son travail : elle désigne un défaut à diagnostiquer, pas un seuil à pousser.","Non — le seuil protège l’enveloppe et les personnes ; on ne le décale pas pour masquer une cause.","Non — le réarmement manuel existe précisément pour forcer le diagnostic."]}) }),

  screen({ id:"regler-interrupteurs", dossier:"regler", title:"Régler un interrupteur : la méthode avant le tournevis", kicker:"Régler · 2", codes:["6.03"], level:"appliquer", text:"Les valeurs viennent de la notice et des conditions de l’installation — jamais de mémoire. Et un réglage n’existe que s’il est PROUVÉ : on fait varier réellement la grandeur et on lit le point d’enclenchement et de déclenchement sur un instrument, pas sur l’étiquette du bouton.", prompt:"Ouvrez chaque étape, dans l’ordre.", render:()=>checklistMarkup([{title:"Préparer",note:"notice, valeurs cibles, consignation si besoin",detail:"On sait AVANT ce qu’on doit obtenir, et on sécurise l’intervention."},{title:"Régler",note:"consigne puis différentiel, sur les organes de contrôle",detail:"Petites corrections, une grandeur à la fois."},{title:"Prouver",note:"essai réel, lecture sur instrument",detail:"Le point d’action se constate au manomètre ou au thermomètre — l’échelle du bouton n’est qu’une aide."}]), wire:()=>wireChecklist([0,1,2]) }),

  screen({ id:"soupapes-aspiration", dossier:"regler", title:"La vanne d’aspiration : trois positions, trois usages", kicker:"Régler · 3", codes:["6.04"], level:"appliquer", text:"Sur le compresseur, la vanne de service d’aspiration se règle en position selon le geste : fermée à l’arrière (marche normale, prise de service isolée), intermédiaire (la prise de service communique — c’est la position des mesures), fermée à l’avant (l’aspiration est isolée — position des interventions comme le tirage au vide du carter). Le même savoir que la vanne de service du cours dédié, appliqué à la machine.", prompt:"Pour brancher un manomètre BP sans isoler l’aspiration, la vanne se met…", render:()=>choiceMarkup([{title:"En position intermédiaire",note:"la prise de service communique, le circuit reste ouvert"},{title:"Fermée à l’avant",note:"l’aspiration serait isolée : la machine tire au vide"},{title:"Fermée à l’arrière",note:"la prise de service est isolée : le manomètre ne lit rien"}],"soupape"), wire:()=>wireChoice({good:0,messages:["La mesure passe, l’aspiration reste alimentée : c’est la position de service.","Non — fermée à l’avant, on isole l’aspiration : réservé aux interventions volontaires.","Non — fermée à l’arrière, c’est la marche normale : la prise de service est morte."]}) }),

  /* ---------------- VÉRIFIER (6.05 · 9.07) ---------------- */

  screen({ id:"niveau-huile", dossier:"verifier", title:"Le voyant de carter se lit machine stabilisée", kicker:"Vérifier · 1", codes:["6.05"], level:"appliquer", text:"Le niveau d’huile se lit au voyant de carter, machine dans les conditions que la notice précise — un niveau lu au mauvais moment ment. De la mousse persistante ou un niveau qui baisse de visite en visite ne se « complètent » pas : ils se diagnostiquent.", prompt:"Le niveau a baissé depuis la dernière visite. D’abord ?", render:()=>choiceMarkup([{title:"Chercher où l’huile est partie",note:"elle est quelque part dans le circuit"},{title:"Compléter au même niveau",note:"l’huile ajoutée repartira au même endroit"},{title:"Changer d’huile",note:"la quantité manquante restera inexpliquée"}],"huile"), wire:()=>wireChoice({good:0,messages:["L’huile ne disparaît pas : elle est retenue quelque part — le retour est en défaut, ou une fuite l’emporte.","Non — compléter sans cause, c’est nourrir le problème et fausser la charge en huile.","Non — remplacer ne répond pas à la question : où passe-t-elle ?"]}) }),

  screen({ id:"circuit-retour-huile", dossier:"verifier", title:"Vérifier le circuit de retour de l’huile", kicker:"Vérifier · 2", codes:["6.05"], level:"appliquer", text:"L’huile partie avec le fluide revient par le circuit lui-même : vitesses suffisantes, pentes et siphons prévus par la conception, et — s’il existe — le séparateur d’huile. Vérifier le retour, c’est parcourir ce chemin, pas seulement regarder le voyant.", prompt:"Ouvrez les trois points du parcours.", render:()=>checklistMarkup([{title:"Le voyant",note:"niveau et aspect, machine stabilisée",detail:"Point de départ : que dit le carter, dans les conditions de la notice ?"},{title:"Le chemin",note:"pentes, siphons, points bas",detail:"L’huile revient par les conduites : la position vue au module évaporateur compte ici."},{title:"Les organes",note:"séparateur et sa ligne de retour",detail:"S’il existe, le séparateur doit rendre l’huile au carter — c’est l’écran suivant."}]), wire:()=>wireChecklist([0,1,2]) }),

  screen({ id:"separateur-huile", dossier:"verifier", title:"Le séparateur d’huile : vérifier qu’il REND", kicker:"Vérifier · 3", codes:["9.07"], level:"appliquer", text:"Placé juste après le compresseur, côté refoulement, le séparateur retient l’huile entraînée et la renvoie au carter par sa ligne de retour. Un séparateur qui retient sans rendre affame le carter : la vérification porte sur le RETOUR — la ligne est-elle passante, le niveau du carter reste-t-il stable en marche ?", prompt:"Où se place le séparateur d’huile ?", render:()=>choiceMarkup([{title:"Juste après le compresseur, au refoulement",note:"là où l’huile part avec les gaz chauds"},{title:"Avant le détendeur, sur la ligne liquide",note:"c’est la place du filtre et du voyant"},{title:"Sur l’aspiration, avant le compresseur",note:"c’est celle du séparateur de LIQUIDE"}],"separateur"), wire:()=>wireChoice({good:0,messages:["Au refoulement : il intercepte l’huile au départ et la rend au carter.","Non — la ligne liquide porte réserve, filtre, voyant : pas le séparateur d’huile.","Non — sur l’aspiration, c’est le séparateur de liquide, un autre organe, un autre rôle."]}) }),

  /* ---------------- CONTRÔLER ---------------- */

  screen({ id:"quiz-gestes", dossier:"controler", title:"Contrôle · Les gestes du compresseur", kicker:"Contrôler · 1", codes:["6.02","6.03"], level:"evaluer", text:"Une installation et un réglage corrects se reconnaissent à ce qu’ils protègent : la machine, le circuit, et celui qui intervient.", prompt:"Quel ensemble est conforme ?", quiz:{choices:["Assise découplée, sécurités raccordées, réglages prouvés à l’instrument","Machine posée sur ses tubes, sécurité HP décalée « pour l’été »","Plots corrects mais protection moteur pontée en attente","Réglages recopiés de mémoire d’une machine voisine"],good:0,explain:"La pose découple, les sécurités restent entières, et un réglage n’existe que prouvé par une mesure. Les valeurs viennent de la notice de CETTE machine."}, render(){return quizMarkup(this)}, wire(){wireQuiz(this)} }),

  screen({ id:"quiz-huile", dossier:"controler", title:"Contrôle · L’huile", kicker:"Contrôler · 2", codes:["6.05","9.07"], level:"evaluer", text:"L’huile raconte l’état du circuit entier : son niveau, son aspect et son retour se vérifient — ils ne se supposent pas.", prompt:"Le niveau de carter baisse et le séparateur est brûlant côté retour, ligne froide. Diagnostic le plus probable ?", quiz:{choices:["Le retour du séparateur ne rend plus l’huile au carter","Il manque simplement de l’huile depuis toujours","Le voyant de carter est sale","La machine consomme son huile, c’est normal"],good:0,explain:"Une ligne de retour qui ne passe plus affame le carter pendant que le séparateur retient. On vérifie le chemin du retour avant d’ajouter quoi que ce soit."}, render(){return quizMarkup(this)}, wire(){wireQuiz(this)} }),

  screen({ id:"bilan", dossier:"controler", title:"Ce que la machine attend de vous", kicker:"Contrôler · bilan", level:"comprendre", text:"Observer la plaque avant la machine. Installer avec ses sécurités — sinon ce n’est pas installé. Régler avec la notice puis PROUVER à l’instrument. Vérifier l’huile en parcourant son chemin, du carter au séparateur. Pour la théorie du volume balayé et du rendement volumétrique, le Module Compresseur reste ouvert depuis la même fiche.", prompt:"", render:()=>statement({visual:"Observer · Installer · Régler · Vérifier", diagram:"<p style='margin:8px 0 0;font-size:15px;line-height:1.55'>La plaque parle la première · les sécurités ne se décalent jamais · un réglage se prouve · l’huile qui part doit revenir.</p>"}), wire:()=>{} }),

];


function renderHome() {
  $("#dossier-grid").innerHTML = dossiers.map((dossier,index) => `<button class="dossier-button" type="button" data-dossier="${dossier.id}"><b>${index+1}</b><span>${esc(dossier.label)}<small>${esc(dossier.note)}</small></span></button>`).join("");
  $$('[data-dossier]').forEach(button => button.addEventListener("click", () => startCourse(button.dataset.dossier, 1)));
}
function startCourse(dossierId="observer", screenNumber=1) {
  extractMode=false; activeScreens=screens; const matches=screens.filter(item=>item.dossier===dossierId); const target=matches[Math.max(0,Math.min(matches.length-1,screenNumber-1))]||screens[0]; current=screens.indexOf(target); furthest=Math.max(furthest,current); showCourse(); renderCurrent();
}
function startExtract(ids) {
  const found=ids.map(id=>screens.find(item=>item.id===id)).filter(Boolean); if(!found.length){showHome();showStatus("Extrait introuvable.");return;} extractMode=true; activeScreens=found; current=0; furthest=found.length-1; showCourse(); renderCurrent();
}
function showCourse(){ $("#home").hidden=true; $("#course-shell").hidden=false; $("#home-button").hidden=false; $("#exit-button").hidden=false; document.body.classList.add("course-running"); $("#mode-badge").textContent=extractMode?"Mode extrait":"Cours complet"; $("#rail-mode").textContent=extractMode?"EXTRAIT":"PARCOURS"; }
function showHome(){stopSpeech(); document.body.classList.remove("course-running"); $("#home").hidden=false; $("#course-shell").hidden=true; $("#home-button").hidden=true; $("#exit-button").hidden=true; $("#mode-badge").textContent="Cours complet"; history.replaceState(null,"","index.html");}
function currentItem(){return activeScreens[current]}
function renderCurrent(moveFocus=true){
  const item=currentItem(); if(!item)return; stopSpeech(false); furthest=Math.max(furthest,current); $("#lesson-kicker").textContent=item.kicker; $("#lesson-title").textContent=item.title; $("#lesson-text").innerHTML=item.text; $("#action-prompt").textContent=item.prompt; const zone=$("#activity-zone"); zone.innerHTML=item.render?item.render():statement(item); if(item.wire)item.wire(); renderReference(item); renderStepper(item); renderNavigation(); updateUrl(item); if(moveFocus)$("#lesson-title").focus({preventScroll:true});
}
function renderReference(item){const codes=item.codes.length?item.codes.join(" · "):"contexte"; $("#reference-box").innerHTML=`<strong>référentiel</strong> · ${esc(codes)}<br>${esc(item.level)}`;}
function renderStepper(item){
  const groups=extractMode?[{id:"extrait",label:"Extrait"}]:dossiers; $("#stepper").innerHTML=groups.map((dossier,index)=>{const indices=activeScreens.map((s,i)=>({s,i})).filter(x=>extractMode||x.s.dossier===dossier.id).map(x=>x.i); const first=indices[0]??0; const active=extractMode||item.dossier===dossier.id; const done=indices.length&&Math.max(...indices)<furthest; return `<button class="step-button ${active?'active':''} ${done?'done':''}" type="button" data-step="${first}" ${active?'aria-current="step"':''}><b>${index+1}</b><span>${esc(dossier.label)}</span></button>`;}).join("");
  $$('[data-step]').forEach(button=>button.addEventListener("click",()=>goTo(Number(button.dataset.step)))); const total=activeScreens.length; $("#rail-progress").textContent=`${current+1} / ${total}`; $("#progress-bar").style.width=`${((current+1)/total)*100}%`; $("#progress-copy").textContent=current===total-1?"Fin du parcours":`${total-current-1} écran${total-current-1>1?'s':''} à voir`;
}
function renderNavigation(){ $("#prev-button").disabled=current===0; $("#next-button").textContent=current===activeScreens.length-1?(extractMode?"Cours entier":"Retour au sommaire"):"Suivant →"; }
function goTo(index){if(index<0||index>=activeScreens.length)return; current=index; renderCurrent();}
function goToId(id){const index=activeScreens.findIndex(item=>item.id===id); if(index>=0)goTo(index); else{activeScreens=screens;extractMode=false;const full=screens.findIndex(item=>item.id===id);if(full>=0){current=full;showCourse();renderCurrent();}}}
function next(){if(current<activeScreens.length-1)goTo(current+1);else if(extractMode){activeScreens=screens;extractMode=false;current=screens.findIndex(s=>s.id===currentItem().id);showCourse();renderCurrent();}else showHome();}
function previous(){if(current>0)goTo(current-1)}
function updateUrl(item){const url=new URL(location.href); url.search=""; if(extractMode)url.searchParams.set("extrait",activeScreens.map(s=>s.id).join(",")); else{const same=activeScreens.filter(s=>s.dossier===item.dossier); url.searchParams.set("dossier",item.dossier); url.searchParams.set("ecran",String(same.indexOf(item)+1));} history.replaceState(null,"",url);}
async function copyCurrentLink(){const item=currentItem(); const url=new URL(location.href); url.search=""; url.searchParams.set("extrait",item.id); try{await navigator.clipboard.writeText(url.href);showStatus("Lien de cet écran copié.");}catch(_){const input=document.createElement("textarea");input.value=url.href;document.body.append(input);input.select();document.execCommand("copy");input.remove();showStatus("Lien de cet écran copié.");}}
function showStatus(message){clearTimeout(statusTimer);$("#status-message").textContent=message;statusTimer=setTimeout(()=>$("#status-message").textContent="",2600)}
function bestFrenchVoice(){const voices=speechSynthesis.getVoices(); const ranked=voices.map(voice=>{const lang=(voice.lang||"").toLowerCase(),name=(voice.name||"").toLowerCase();let score=0;if(lang==="fr-fr")score+=50;else if(lang.startsWith("fr"))score+=25;if(/natural|naturel|neural|online|google|microsoft|denise|henri|julie|paul|hortense/.test(name))score+=12;return{voice,score};}).sort((a,b)=>b.score-a.score);return ranked[0]?.voice||voices[0]||null;}
function speechSupported(){return "speechSynthesis" in window&&"SpeechSynthesisUtterance" in window}
function speakCurrent(){if(!speechSupported()){showStatus("La voix n’est pas disponible. Le texte reste complet.");return;} stopSpeech(false); autoplay=true; const item=currentItem(); const token=++speechRun; const utterance=new SpeechSynthesisUtterance(item.speak||`${item.title}. ${stripHtml(item.text)} ${item.prompt}`); utterance.lang="fr-FR";utterance.pitch=1;utterance.rate=voiceRates[rateIndex];const voice=bestFrenchVoice();if(voice)utterance.voice=voice;utterance.onstart=()=>{if(token!==speechRun)return;speaking=true;paused=false;updateVoiceButtons();};utterance.onend=()=>{if(token!==speechRun)return;speaking=false;paused=false;updateVoiceButtons();};utterance.onerror=e=>{if(token!==speechRun||["canceled","interrupted"].includes(e.error))return;speaking=false;paused=false;updateVoiceButtons();showStatus("Lecture vocale indisponible.");};speechSynthesis.speak(utterance);}
function toggleSpeech(){if(!speechSupported()){showStatus("La voix n’est pas disponible.");return;}if(speaking&&!paused){speechSynthesis.pause();paused=true;updateVoiceButtons();}else if(speaking&&paused){speechSynthesis.resume();paused=false;updateVoiceButtons();}else speakCurrent();}
function stopSpeech(disableAutoplay=true){speechRun++;if(speechSupported())speechSynthesis.cancel();speaking=false;paused=false;if(disableAutoplay)autoplay=false;updateVoiceButtons();}
function updateVoiceButtons(){const button=$("#listen");if(!button)return;button.innerHTML=paused?'<span aria-hidden="true">▶</span><span>Reprendre</span>':speaking?'<span aria-hidden="true">Ⅱ</span><span>Pause</span>':'<span aria-hidden="true">▶</span><span>Écouter</span>';$("#stop-voice").disabled=!speaking;$("#speed-value").textContent=voiceRates[rateIndex].toFixed(2).replace(".",",")+"×";}
function changeRate(direction){rateIndex=Math.max(0,Math.min(voiceRates.length-1,rateIndex+direction));saveRate();updateVoiceButtons();if(speaking||paused)speakCurrent();}
function buildPrintBook(){const quizCount=screens.filter(s=>s.quiz).length;$("#print-book").innerHTML=`<header class="print-title"><h1>Condenseur — installer, régler, vérifier</h1><p>Fiche g7b · 24 écrans · ${quizCount} contrôles · arrêté du 21 novembre 2025.</p><p><strong>Principe :</strong> batterie grise → débit d’air réduit → chaleur moins bien rejetée → pression de condensation qui tend à monter.</p></header>`+screens.map((item,index)=>`<article class="print-screen"><h2>${index+1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.prompt?`<h3>Action à réaliser</h3><p>${esc(item.prompt)}</p>`:""}${item.quiz?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.quiz.choices[item.quiz.good])}. ${esc(item.quiz.explain)}</div>`:""}<p class="print-codes">Référentiel · ${item.codes.length?esc(item.codes.join(" · ")):"contexte"}</p></article>`).join("");}
function handleInitialUrl(){const params=new URLSearchParams(location.search);const extract=params.get("extrait");if(extract){startExtract(extract.split(",").map(x=>x.trim()).filter(Boolean));return;}const dossier=params.get("dossier");if(dossier){startCourse(dossier,Number(params.get("ecran"))||1);return;}showHome();}
function bindGlobalEvents(){
  $("#start-button").addEventListener("click",()=>startCourse());$("#home-button").addEventListener("click",showHome);$("#exit-button").addEventListener("click",showHome);$("#prev-button").addEventListener("click",previous);$("#next-button").addEventListener("click",next);$("#copy-link").addEventListener("click",copyCurrentLink);$("#listen").addEventListener("click",toggleSpeech);$("#stop-voice").addEventListener("click",()=>stopSpeech());$("#slower").addEventListener("click",()=>changeRate(-1));$("#faster").addEventListener("click",()=>changeRate(1));
  addEventListener("keydown",event=>{const tag=document.activeElement?.tagName;if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(tag))return;if(event.key==="ArrowRight"){event.preventDefault();next();}else if(event.key==="ArrowLeft"){event.preventDefault();previous();}else if(event.key===" "){event.preventDefault();toggleSpeech();}else if(event.key==="Escape")showHome();});
  addEventListener("beforeunload",()=>stopSpeech());document.addEventListener("visibilitychange",()=>{if(document.hidden)stopSpeech();});if(speechSupported())speechSynthesis.addEventListener?.("voiceschanged",()=>{});
}

renderHome();buildPrintBook();bindGlobalEvents();updateVoiceButtons();handleInitialUrl();
