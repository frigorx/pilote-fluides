"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const dossiers = [
  { id: "observer", label: "Comprendre", note: "deux nombres, un cycle" },
  { id: "regler", label: "Régler", note: "au pupitre" },
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
    const stored = Number(localStorage.getItem("pupitre-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("pupitre-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
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

/* Le simulateur du pupitre : une consigne, un différentiel, et la machine qui
   enclenche et déclenche. Valeurs D'EXERCICE, affichées comme telles — la notice
   et les conditions de l'installation font foi, c'est répété à chaque écran. */
function reglageMarkup(cfg) {
  return `<div class="panel">
    <div class="panel-title">${esc(cfg.titre)}</div>
    <div class="pupitre" data-pupitre="${cfg.nom}">
      <label>Consigne (${cfg.unite}) : <output id="out-consigne-${cfg.nom}">${cfg.consigne}</output>
        <input type="range" id="consigne-${cfg.nom}" min="${cfg.min}" max="${cfg.max}" step="${cfg.pas}" value="${cfg.consigne}"></label>
      <label>Différentiel (${cfg.unite}) : <output id="out-diff-${cfg.nom}">${cfg.diff}</output>
        <input type="range" id="diff-${cfg.nom}" min="${cfg.diffMin}" max="${cfg.diffMax}" step="${cfg.pas}" value="${cfg.diff}"></label>
      <div class="feedback" id="lecture-${cfg.nom}" aria-live="polite"></div>
      <p style="margin:8px 0 0;font-size:12px;opacity:.75">Valeurs d’exercice — sur une machine réelle, la notice et les conditions de l’installation font foi, et le point d’action se prouve à l’instrument.</p>
    </div></div>`;
}
function wireReglage(cfg) {
  const consigne = $(`#consigne-${cfg.nom}`), diff = $(`#diff-${cfg.nom}`);
  const lire = () => {
    const c = Number(consigne.value), d = Number(diff.value);
    $(`#out-consigne-${cfg.nom}`).textContent = c;
    $(`#out-diff-${cfg.nom}`).textContent = d;
    const box = $(`#lecture-${cfg.nom}`);
    box.className = "feedback " + (d < cfg.diffAlerte ? "bad" : "good");
    box.innerHTML = `<strong>${esc(cfg.action)} à ${c} ${cfg.unite} · ${esc(cfg.retour)} à ${(c + d).toFixed(1).replace(/\.0$/, "")} ${cfg.unite}.</strong> ` +
      (d < cfg.diffAlerte ? "Différentiel trop serré : la machine enchaîne les courts-cycles — elle bat comme une porte mal fermée." : cfg.commentaire);
  };
  consigne.addEventListener("input", lire);
  diff.addEventListener("input", lire);
  lire();
}

const screens = [

  /* ---------------- COMPRENDRE ---------------- */

  screen({ id:"consigne-differentiel", narration: "Tout organe de régulation se règle avec deux nombres, et deux seulement. La consigne : la valeur à laquelle on veut agir. Le différentiel : l'écart nécessaire pour revenir à l'état de départ. Sans différentiel, un organe basculerait sans arrêt autour de sa consigne — c'est ce qu'on appelle le pompage, et il détruit le matériel. Ces deux nombres forment le cycle de fonctionnement. Quel que soit l'organe devant vous, votre travail consiste à les choisir et à les prouver.", dossier:"observer", title:"Deux nombres font un cycle", kicker:"Comprendre · 1", level:"comprendre", text:"Tout organe de régulation se règle avec deux nombres. La CONSIGNE : la valeur où l’on veut agir. Le DIFFÉRENTIEL : l’écart entre le point d’action et le point de retour. Sans différentiel, l’organe agirait et reviendrait sans cesse autour du même point — des courts-cycles qui usent le matériel.", prompt:"À quoi sert le différentiel ?", render:()=>choiceMarkup([{title:"À espacer l’action et le retour",note:"le cycle respire au lieu de battre"},{title:"À rendre la mesure plus précise",note:"la précision vient de l’instrument"},{title:"À protéger contre la surpression",note:"ça, c’est le rôle des sécurités"}],"diff"), wire:()=>wireChoice({good:0,messages:["L’écart entre enclenchement et déclenchement donne au cycle le temps de vivre.","Non — le différentiel n’améliore pas la mesure, il structure le cycle de marche.","Non — la borne de sécurité est un autre organe : le différentiel organise la marche normale."]}) }),

  screen({ id:"familles-pupitre", narration: "Qui règle quoi ? Le thermostat commande selon une température. Le pressostat de régulation commande selon une pression — du côté de l'évaporateur pour la production de froid, du côté du condenseur pour la ventilation. Ce sont les mêmes deux nombres, appliqués à des grandeurs différentes. Comprendre cela vous évite d'apprendre chaque organe séparément : il n'y a qu'une seule logique, déclinée selon ce qu'on mesure.", dossier:"observer", title:"Qui règle quoi, au pupitre", kicker:"Comprendre · 2", level:"comprendre", text:"Le THERMOSTAT commande selon une température. Le PRESSOSTAT DE RÉGULATION commande selon une pression — côté condenseur, c’est lui qui étage les ventilateurs. Le LIMITEUR borne la marche. Et la SÉCURITÉ, à réarmement manuel, n’est pas un organe de réglage : elle attend le jour où tout le reste a échoué — on l’a vue aux modules compresseur et condenseur.", prompt:"Le pressostat qui commande les ventilateurs du condenseur est…", render:()=>choiceMarkup([{title:"Un organe de contrôle",note:"il travaille tous les jours, en marche normale"},{title:"Une sécurité",note:"non : il ne protège pas, il régule"},{title:"Un limiteur",note:"il ne borne rien, il commande"}],"familles"), wire:()=>wireChoice({good:0,messages:["Il enclenche et déclenche la ventilation au fil de la pression : c’est de la régulation.","Non — la sécurité HP à réarmement manuel est un AUTRE appareil, réglé à part.","Non — il commande un actionneur en marche normale : contrôle, pas borne."]}) }),

  /* ---------------- RÉGLER (9.04 · 9.06 · 7.04) ---------------- */

  screen({ id:"simulateur-thermostat", narration: "Prenons le thermostat sur une chambre froide d'exercice. Il déclenche la production quand la température atteint la consigne, et il la relance quand elle remonte au-delà du différentiel. Notez le sens : en froid, c'est la montée en température qui redemande de la production. C'est l'inverse du chauffage, et c'est une source d'erreur classique quand on passe d'un domaine à l'autre. Prenez l'habitude de vous demander, à chaque réglage : qu'est-ce qui déclenche, et dans quel sens ?", dossier:"regler", title:"Le thermostat au pupitre : chambre froide d’exercice", kicker:"Régler · 1", codes:["9.04"], level:"appliquer", text:"Un thermostat de froid DÉCLENCHE la production quand la température atteint la consigne, et la RELANCE quand elle est remontée du différentiel. Manipulez les deux molettes et lisez le cycle. Sur un mécanique, ce sont des molettes et le point réel se prouve au thermomètre ; sur un électronique, les mêmes nombres s’entrent au clavier — la logique ne change pas.", prompt:"Réglez, puis resserrez le différentiel jusqu’à l’alerte.", render:()=>reglageMarkup({nom:"thermo", titre:"Thermostat de chambre froide (exercice)", unite:"°C", min:-10, max:10, pas:0.5, consigne:2, diff:3, diffMin:0.5, diffMax:8, diffAlerte:2, action:"Arrêt du froid", retour:"relance", commentaire:"La chambre vit entre ces deux températures : c’est son cycle normal."}), wire:()=>wireReglage({nom:"thermo", unite:"°C", diffAlerte:2, action:"Arrêt du froid", retour:"relance", commentaire:"La chambre vit entre ces deux températures : c’est son cycle normal."}) }),

  screen({ id:"mecanique-electronique", narration: "Mécanique ou électronique, la méthode ne change pas. Le mécanique se règle aux molettes, l'électronique aux paramètres — l'interface diffère, le raisonnement est identique. Dans les deux cas, les valeurs viennent de la notice et des conditions de l'installation. Et dans les deux cas, le réglage se prouve à l'instrument. Un régulateur électronique affiche ce qu'il croit faire : cela ne remplace pas la mesure de ce qu'il fait réellement.", dossier:"regler", title:"Mécanique ou électronique : la méthode ne change pas", kicker:"Régler · 2", codes:["9.04"], level:"comprendre", text:"Le mécanique se règle aux molettes, l’électronique aux paramètres — mais dans les deux cas les valeurs viennent de la notice et des besoins de l’installation, et le point d’action réel se PROUVE avec un instrument indépendant. L’écran d’un régulateur affiche sa propre lecture : la preuve, elle, vient d’ailleurs.", prompt:"Qu’est-ce qui est commun aux deux familles ?", render:()=>choiceMarkup([{title:"Consigne, différentiel, et la preuve à l’instrument",note:"la méthode est la même"},{title:"Rien : l’électronique se règle seule",note:"les paramètres ne tombent pas du ciel"},{title:"Le différentiel disparaît en électronique",note:"il change de nom, jamais de rôle"}],"meca"), wire:()=>wireChoice({good:0,messages:["Les organes changent, la méthode reste : deux nombres, et une preuve mesurée.","Non — l’électronique exécute ce qu’on lui entre : la responsabilité du réglage demeure.","Non — sous d’autres noms de paramètres, l’écart action/retour existe toujours."]}) }),

  screen({ id:"simulateur-limiteur", narration: "Le pressostat basse pression arrête le compresseur quand l'aspiration descend à la consigne : il borne la marche normale par le bas. Pourquoi vouloir arrêter sur une basse pression ? Parce qu'une aspiration trop basse signifie que l'évaporateur ne reçoit plus assez de fluide — la machine tourne pour rien et se met en danger. C'est un limiteur : il définit une frontière du fonctionnement normal, il ne protège pas d'un accident.", dossier:"regler", title:"Le limiteur basse pression au pupitre", kicker:"Régler · 3", codes:["9.06"], level:"appliquer", text:"Le pressostat basse pression ARRÊTE le compresseur quand l’aspiration descend à la consigne — il borne la marche — et le RELANCE une fois la pression remontée du différentiel. Un différentiel trop serré fait pomper la machine ; les valeurs réelles se calculent d’après le fluide et l’application, notice en main.", prompt:"Réglez la borne basse d’exercice.", render:()=>reglageMarkup({nom:"limiteur", titre:"Pressostat basse pression (exercice)", unite:"bar", min:0, max:4, pas:0.1, consigne:0.6, diff:0.8, diffMin:0.2, diffMax:2, diffAlerte:0.5, action:"Arrêt compresseur", retour:"redémarrage", commentaire:"La machine s’arrête avant de travailler trop bas, et repart sans battre."}), wire:()=>wireReglage({nom:"limiteur", unite:"bar", diffAlerte:0.5, action:"Arrêt compresseur", retour:"redémarrage", commentaire:"La machine s’arrête avant de travailler trop bas, et repart sans battre."}) }),

  screen({ id:"limiteur-ou-securite", narration: "Et voici la distinction la plus importante du pupitre. Un limiteur borne la marche normale : il se règle, s'ajuste, se prouve, et il déclenche régulièrement — c'est son travail. Une sécurité, elle, se respecte : elle a un tarage fixé, souvent un réarmement manuel, et elle n'intervient qu'en dernier recours. On ne règle pas une sécurité comme on règle un limiteur. Confondre les deux, c'est ajuster une protection pour faire tenir une machine.", dossier:"regler", title:"Un limiteur se règle, une sécurité se respecte", kicker:"Régler · 4", codes:["9.06"], level:"appliquer", text:"Le limiteur mécanique ou électronique borne la marche NORMALE : il se règle, s’ajuste, se prouve. La sécurité — souvent à réarmement manuel — est réglée pour l’ultime recours : on ne la décale JAMAIS pour faire taire un défaut, et son point d’action se contrôle aussi, instrument à l’appui.", prompt:"Ouvrez les trois règles du limiteur.", render:()=>checklistMarkup([{title:"D’après la notice",note:"fluide, application, conditions réelles",detail:"Les valeurs se calculent pour CETTE installation — jamais recopiées d’une machine voisine."},{title:"Prouvé à l’instrument",note:"le point d’action se constate",detail:"On fait réellement varier la pression et on lit l’action au manomètre."},{title:"Jamais confondu avec la sécurité",note:"deux appareils, deux rôles",detail:"Décaler une sécurité pour masquer un défaut, c’est retirer le dernier filet."}]), wire:()=>wireChecklist([0,1,2]) }),

  screen({ id:"cote-condenseur", narration: "Du côté du condenseur, ce sont les mêmes gestes, en pression de condensation. Les interrupteurs de contrôle y commandent l'étage de ventilation : on démarre ou on arrête des ventilateurs selon la pression, pour maintenir la condensation dans sa plage utile. Consigne et différentiel, exactement comme ailleurs. Vous retrouvez ici le régulateur de pression de condensation vu sur le module condenseur, mais commandé électriquement au lieu d'agir mécaniquement.", dossier:"regler", title:"Côté condenseur : les mêmes gestes, en pression", kicker:"Régler · 5", codes:["7.04"], level:"appliquer", text:"Autour du condenseur, les interrupteurs de contrôle travaillent en pression de condensation : l’étage de ventilation s’enclenche quand elle monte, se coupe quand elle redescend — consigne et différentiel, encore. Et la sécurité haute pression, elle, reste intouchable : son rôle a été vu au module condenseur.", prompt:"La pression de condensation monte, un ventilateur de plus démarre. Qui a agi ?", render:()=>choiceMarkup([{title:"Un pressostat de contrôle, à sa consigne",note:"l’étagement de ventilation, marche normale"},{title:"La sécurité haute pression",note:"si elle agit, tout s’arrête — et quelqu’un doit venir"},{title:"Le limiteur basse pression",note:"lui borne l’aspiration, à l’autre bout"}],"cond"), wire:()=>wireChoice({good:0,messages:["L’étagement de la ventilation est de la régulation : consigne, différentiel, et la HP qui respire.","Non — la sécurité HP coupe et exige un réarmement : ce n’est pas elle qui étage les ventilateurs.","Non — le limiteur BP borne l’aspiration : ici tout se joue côté condensation."]}) }),

  /* ---------------- CONTRÔLER ---------------- */

  screen({ id:"quiz-pupitre", narration: "Faisons le contrôle. Régler, c'est toujours la même opération : deux nombres choisis d'après la notice, et une preuve mesurée. Si vous pouvez répondre à ces trois questions devant n'importe quel organe — quelle consigne, quel différentiel, quelle preuve — vous savez régler. Le reste n'est que la variété des interfaces et des grandeurs mesurées.", dossier:"controler", title:"Contrôle · Le pupitre", kicker:"Contrôler · 1", codes:["9.04","9.06","7.04"], level:"evaluer", text:"Régler, c’est toujours la même chose : deux nombres choisis d’après la notice, et une preuve mesurée.", prompt:"Quelle intervention est correcte ?", quiz:{choices:["Consigne et différentiel d’après la notice, point d’action prouvé au manomètre","Différentiel à zéro « pour plus de précision »","Sécurité HP remontée pour arrêter les déclenchements","Valeurs recopiées de la machine d’à côté, « c’est la même »"],good:0,explain:"La notice et les conditions de l’installation donnent les valeurs ; l’instrument prouve le point d’action. Un différentiel nul fait battre la machine, et une sécurité décalée n’est plus une sécurité."}, render(){return quizMarkup(this)}, wire(){wireQuiz(this)} }),

  screen({ id:"bilan", narration: "Deux nombres, une preuve : voilà ce qu'il faut emporter. Thermostats, pressostats de régulation, limiteurs — tous parlent la même langue. Une consigne, un différentiel, et une vérification à l'instrument. Ce qui change d'un organe à l'autre, c'est la grandeur mesurée et la façon d'entrer les valeurs. Ce qui ne change jamais, c'est que les valeurs viennent du dossier et que le réglage se démontre.", dossier:"controler", title:"Deux nombres, une preuve", kicker:"Contrôler · bilan", level:"comprendre", text:"Thermostats, pressostats de régulation, limiteurs : tous parlent la même langue — une consigne, un différentiel, un cycle qui respire. Les valeurs viennent de la notice, la preuve vient de l’instrument, et les sécurités restent hors du pupitre : elles ne se règlent pas pour rattraper une panne.", prompt:"", render:()=>statement({visual:"Consigne · Différentiel · Preuve", diagram:"<p style='margin:8px 0 0;font-size:15px;line-height:1.55'>La notice donne les nombres · l’instrument donne la preuve · la sécurité reste un filet, jamais un réglage de confort.</p>"}), wire:()=>{} }),

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
function speakCurrent(){if(!speechSupported()){showStatus("La voix n’est pas disponible. Le texte reste complet.");return;} stopSpeech(false); autoplay=true; const item=currentItem(); const token=++speechRun; const utterance=new SpeechSynthesisUtterance(item.narration || item.speak || ""); utterance.lang="fr-FR";utterance.pitch=1;if(window.PILOTE_VOIX_REGLAGE)window.PILOTE_VOIX_REGLAGE.appliquer(utterance);else utterance.rate=voiceRates[rateIndex];const voice=bestFrenchVoice();if(voice)utterance.voice=voice;utterance.onstart=()=>{if(token!==speechRun)return;speaking=true;paused=false;updateVoiceButtons();};utterance.onend=()=>{if(token!==speechRun)return;speaking=false;paused=false;updateVoiceButtons();};utterance.onerror=e=>{if(token!==speechRun||["canceled","interrupted"].includes(e.error))return;speaking=false;paused=false;updateVoiceButtons();showStatus("Lecture vocale indisponible.");};speechSynthesis.speak(utterance);}
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
