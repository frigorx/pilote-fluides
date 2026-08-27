(function(){
  "use strict";
  const {levels,lines,stations,network}=window.AEROREZO;
  const scenes=window.AEROREZO_SCENES;
  const $=id=>document.getElementById(id);
  /* `vitesse` : le débit de la voix, réglable par l'élève. Gardé en mémoire le temps de
     la session seulement — le module ne stocke rien dans le navigateur, et la QA le vérifie. */
  const state={level:"bac",route:"A",phase:0,current:null,visited:new Set(),phaseSeen:new Map(),speechRun:0,quiz:null,localCheck:null,vitesse:.95,voix:null};
  const phaseKeys=["decouvrir","comprendre","manipuler","verifier"];
  const byLine=line=>stations.filter(s=>s.line===line);
  const routeStations=line=>network.routes[line].map(id=>stations.find(s=>s.id===id));
  const stationRoutes=id=>Object.keys(network.routes).filter(line=>network.routes[line].includes(id));
  const levelLabels={cap:"CAP",bac:"Bac Pro",bts:"BTS"};
  const majorTransferIds=new Set(["debit-vitesse","hygrometrie","rosee-psychro","pressions-reseau"]);
  const carte=window.AEROREZO_CARTE;

  function escapeText(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function drawMap(){
    const svg=$("networkMap");
    /* Les tracés sont construits à partir des parcours : une ligne passe par toutes les
       gares qu'elle dessert, et par elles seules. `tests/carte-coherence.mjs` le vérifie. */
    let html="";
    Object.keys(lines).forEach(code=>{
      html+=`<path class="route" data-line="${code}" d="${carte.cheminLigne(network.routes[code],carte.DECALAGE[code])}" stroke="${lines[code].color}"/>`;
    });

    const gares=stations.map(station=>{
      const [x,y]=network.positions[station.id];
      return {id:station.id,x,y,label:network.labels[station.id]||station.title,routes:stationRoutes(station.id),station};
    });
    const libelles=carte.placerLibelles(gares,15);
    const couleursLignes=Object.fromEntries(Object.entries(lines).map(([code,ligne])=>[code,ligne.color]));

    gares.forEach(gare=>{
      const {id,x,y,routes,station}=gare;
      const ownerIndex=byLine(station.line).findIndex(item=>item.id===id)+1;
      const code=`${station.line}${ownerIndex}`;
      const couleur=lines[station.line].color;
      const terminus=station.activity.kind==="evaluation";
      const major=majorTransferIds.has(id);
      const correspondance=routes.length>1;
      const pose=libelles.get(id);

      /* Le contour de la gare est découpé en autant d'arcs que de lignes desservies :
         on compte les parcours sur la couronne, sans dépendre de la seule couleur —
         les coupures entre arcs restent visibles à l'impression noir et blanc.
         Les terminus d'évaluation gardent leur pastille allongée. */
      /* Le fond déborde la couronne de 4 px : ce liseré de papier détache la gare des
         tracés qui y arrivent, sans quoi le trait vient coller aux arcs. */
      const rayon=major?19:15;
      const forme=terminus
        ? `<rect class="terminus" x="${x-27}" y="${y-16}" width="54" height="32" rx="16" stroke="${couleur}"/>`
        : `<circle class="gare-fond" cx="${x}" cy="${y}" r="${rayon+4}"/>${carte.couronne(x,y,rayon,routes,station.line,couleursLignes)}`;
      const lecture=correspondance?` Correspondance vers ${routes.filter(r=>r!==station.line).map(r=>lines[r].name).join(", ")}.`:"";
      html+=`<g class="station-node ${correspondance?"interchange":""} ${major?"major-interchange":""} ${terminus?"terminus-node":""}" role="button" tabindex="0" data-id="${id}" data-owner="${station.line}" data-routes="${routes.join(" ")}" aria-label="${escapeText(station.title+"."+lecture)}">${forme}<text class="code" x="${x}" y="${y+5}" text-anchor="middle">${code}</text><text class="station-label" x="${pose.x}" y="${pose.y}" text-anchor="${pose.ancrage}">${escapeText(gare.label)}</text></g>`;
    });

    $("networkStats").textContent=`6 lignes · 36 stations · 12 correspondances`;
    svg.setAttribute("viewBox",`0 0 ${carte.VUE.largeur} ${carte.VUE.hauteur}`);
    svg.innerHTML=`<title>Plan du réseau AéroRézo</title><desc>Six lignes — Air et hygrométrie, VMC, Distribution, Climatisation, Centrale de traitement d’air, Mesure et diagnostic — reliées par douze correspondances. Chaque tracé passe par toutes les gares de son parcours.</desc>${html}`;
    svg.querySelectorAll(".station-node").forEach(node=>{
      const open=()=>openStation(node.dataset.id,node.dataset.routes.split(" ").includes(state.route)?state.route:stations.find(s=>s.id===node.dataset.id).line);
      node.addEventListener("click",open);
      node.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
    });
    $("lineLegend").innerHTML=`<button class="line-chip" type="button" data-line="ALL" aria-pressed="false" style="--line-color:#1B3A63">Toutes les correspondances</button>`+Object.entries(lines).map(([code,line])=>`<button class="line-chip" type="button" data-line="${code}" aria-pressed="false" style="--line-color:${line.color}">${code} · ${line.name}</button>`).join("");
    $("lineLegend").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>highlightRoute(btn.dataset.line)));
    highlightRoute("ALL");
  }
  function highlightRoute(line){
    const showAll=line==="ALL";
    if(!showAll)state.route=line;
    document.querySelectorAll(".route").forEach(route=>route.classList.toggle("muted",!showAll&&route.dataset.line!==line));
    document.querySelectorAll(".station-node").forEach(node=>node.classList.toggle("muted",!showAll&&node.dataset.owner!==line));
    document.querySelectorAll(".line-chip").forEach(btn=>{const active=btn.dataset.line===line;btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));});
    $("startButton").textContent=showAll?"Commencer par les bases":`Commencer la ligne ${line}`;
  }

  function stopVoice(){
    state.speechRun++;
    if("speechSynthesis" in window) window.speechSynthesis.cancel();
    [$("voiceButton"),$("stationVoice")].forEach(button=>{button.textContent="▶ Écouter";button.setAttribute("aria-pressed","false");});
  }
  /* Le tri précédent acceptait n'importe quel nom contenant « microsoft » : sur une machine
     qui n'a que les anciennes voix Hortense, Julie et Paul, il retenait donc toujours
     Hortense, la plus datée. On classe les voix vraiment neuronales d'abord, et on ne
     descend vers les anciennes qu'à défaut. */
  function voixFrancaises(){
    return window.speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith("fr"));
  }
  function bestVoice(){
    const choisie=state.voix&&voixFrancaises().find(v=>v.name===state.voix);
    if(choisie) return choisie;
    const fr=voixFrancaises(),voices=window.speechSynthesis.getVoices();
    return fr.find(v=>/natural|neural|online/i.test(v.name))
      ||fr.find(v=>/google/i.test(v.name))
      ||fr.find(v=>v.lang.toLowerCase()==="fr-fr")
      ||fr[0]||voices[0];
  }
  /* Quand la machine offre plusieurs voix françaises, l'élève choisit : aucune n'est
     objectivement meilleure, et sur un poste sans voix neuronale l'écart entre elles est
     le seul gain disponible. Le sélecteur reste caché s'il n'y a rien à choisir. */
  function remplirVoix(){
    const liste=voixFrancaises(),pick=$("voicePick");
    if(!pick)return;
    if(liste.length<2){pick.hidden=true;return;}
    if(pick.options.length===liste.length)return;
    const defaut=bestVoice();
    pick.innerHTML=liste.map(v=>`<option value="${escapeText(v.name)}"${v.name===defaut?.name?" selected":""}>${escapeText(v.name.replace(/^Microsoft /,"").replace(/ - French \(France\)/,""))}</option>`).join("");
    pick.hidden=false;
  }

  /* La voix EXPLIQUE, elle ne lit pas l'écran — 00-charte/VOIX-ET-NARRATION.md.
     Elle dit le texte de narration de l'écran courant, écrit pour l'oreille. Tant qu'une
     station n'a pas de narration rédigée, on retombe sur ce qui est affiché : c'est un
     dépannage visible, pas la cible. La formule n'est jamais reprise — prononcée en
     symboles, elle n'est que du bruit. */
  function voiceText(){
    const station=state.current;
    if(!station) return "AéroRézo. Choisissez un niveau puis une station. Le parcours va de la découverte de l’air au calcul et au diagnostic.";
    const dite=station.narration&&station.narration[phaseKeys[state.phase]];
    if(dite) return dite;
    return ["stationTitle","stationText","stationMethod"].map(id=>$(id)).filter(node=>node&&!node.hidden).map(node=>node.textContent.trim().replace(/\.$/,"")).join(". ")+".";
  }

  function speakCurrent(button){
    if(!("speechSynthesis" in window)){button.textContent="Voix indisponible";return;}
    if(window.speechSynthesis.speaking&&!window.speechSynthesis.paused){window.speechSynthesis.pause();button.textContent="▶ Reprendre";return;}
    if(window.speechSynthesis.paused){window.speechSynthesis.resume();button.textContent="Ⅱ Pause";return;}
    stopVoice();
    const text=voiceText();
    const run=state.speechRun;
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang="fr-FR";utterance.rate=state.vitesse;utterance.pitch=1;utterance.voice=bestVoice();
    utterance.onstart=()=>{if(run===state.speechRun){button.textContent="Ⅱ Pause";button.setAttribute("aria-pressed","true");}};
    utterance.onend=utterance.onerror=()=>{if(run===state.speechRun){button.textContent="▶ Écouter";button.setAttribute("aria-pressed","false");}};
    window.speechSynthesis.speak(utterance);
  }

  function openStation(id,route,phase=0){
    const station=stations.find(s=>s.id===id);if(!station)return;
    const changed=state.current?.id!==id;
    stopVoice();state.route=route&&network.routes[route]?.includes(id)?route:station.line;state.current=station;state.phase=station.activity.kind==="evaluation"?0:Math.max(0,Math.min(3,Number(phase)||0));state.visited.add(id);state.quiz=null;if(changed)state.localCheck=null;
    state.phaseSeen.set(id,Math.max(state.phaseSeen.get(id)||0,state.phase));
    $("networkView").hidden=true;$("stationView").hidden=false;document.body.classList.add("course-running");
    renderStation();history.replaceState(null,"",`#${id}@${state.route}@${state.phase}`);
  }
  function closeStation(){
    stopVoice();state.current=null;state.quiz=null;$("stationView").hidden=true;$("networkView").hidden=false;document.body.classList.remove("course-running");history.replaceState(null,"",location.pathname+location.search);
  }
  function renderStation(){
    const s=state.current,line=lines[s.line],list=routeStations(state.route),index=list.findIndex(x=>x.id===s.id),routes=stationRoutes(s.id);
    $("stationKicker").textContent=`Parcours ${state.route} · station propriétaire ${s.line} · ${levels[state.level]}`;
    $("stationTitle").textContent=s.title;$("stationCompetence").textContent=line.competence;
    $("interchangeSwitch").innerHTML=routes.length>1?`<span>Correspondance :</span>${routes.map(code=>`<button type="button" data-route="${code}" class="${code===state.route?"active":""}" style="--line-color:${lines[code].color}" aria-pressed="${code===state.route}">${code}</button>`).join("")}`:"";
    $("interchangeSwitch").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>openStation(s.id,btn.dataset.route,state.phase)));
    $("stationProgress").innerHTML=list.map((item,i)=>`<button type="button" class="progress-stop ${item.id===s.id?"current":""} ${state.visited.has(item.id)?"done":""}" data-id="${item.id}" data-index="${i+1}" style="--line-color:${lines[state.route].color}">${i+1}. ${escapeText(item.title)}</button>`).join("");
    $("stationProgress").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>openStation(btn.dataset.id,state.route)));
    renderPhase(s,list,index);
  }

  const phaseNames=["Découvrir","Comprendre","Manipuler","Vérifier"];
  function setPhase(phase){
    if(!state.current||state.current.activity.kind==="evaluation")return;
    const allowed=(state.phaseSeen.get(state.current.id)||0)+1;
    if(phase>allowed)return;
    stopVoice();state.phase=Math.max(0,Math.min(3,phase));state.phaseSeen.set(state.current.id,Math.max(state.phaseSeen.get(state.current.id)||0,state.phase));
    renderStation();history.replaceState(null,"",`#${state.current.id}@${state.route}@${state.phase}`);
  }
  function renderPhase(s,list,index){
    const evaluation=s.activity.kind==="evaluation";
    $("phaseProgress").hidden=evaluation;
    $("phaseProgress").innerHTML=evaluation?"":phaseNames.map((name,i)=>`<button type="button" data-phase="${i}" class="${i===state.phase?"active":""} ${i<(state.phaseSeen.get(s.id)||0)?"done":""}" aria-current="${i===state.phase?"step":"false"}" ${i>(state.phaseSeen.get(s.id)||0)+1?"disabled":""}><span>${i+1}</span>${name}</button>`).join("");
    $("phaseProgress").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>setPhase(+btn.dataset.phase)));
    if(evaluation){
      $("stationText").textContent=s[state.level];$("methodBox").hidden=true;$("stationFormula").hidden=true;
      $("previousButton").disabled=index===0;$("previousButton").textContent="← Station précédente";$("previousButton").onclick=()=>openStation(list[index-1].id,state.route,3);
      $("nextButton").disabled=true;$("nextButton").textContent="Bilan dans l’évaluation";$("stepStatus").textContent=`Évaluation finale · 12 situations`;
      renderActivity(s.activity);return;
    }
    /* Chaque temps a son texte. Les champs rédigés (découverte, explication, consigne,
       lecture, limites) sont décrits dans CONTRAT-CONTENU.md ; tant qu ils manquent,
       la station retombe sur les formulations génériques du brouillon. */
    $("methodBox").hidden=state.phase===0||state.phase===3;$("stationFormula").hidden=(state.phase===0||state.phase===3)||!s.formula;
    /* En Comprendre, c est le texte qui porte la station : il reprend la place.
       Ailleurs, c est la scène ou la manipulation. */
    document.querySelector(".lesson-grid").dataset.phase=state.phase;
    $("stationLecture").hidden=state.phase!==2||!s.lecture;
    $("stationLimites").hidden=state.phase!==2||!s.limites;
    if(s.lecture)$("stationLecture").textContent=s.lecture;
    if(s.limites)$("stationLimites").textContent=s.limites;
    if(state.phase===0){$("stationText").textContent=s.decouverte||s[state.level];renderDiscovery(s);}
    if(state.phase===1){$("stationText").textContent=s.explication||"Construis le raisonnement avant de toucher aux réglages.";$("stationMethod").textContent=s.method;$("stationFormula").textContent=s.formula;renderMethodScene(s);}
    if(state.phase===2){$("stationText").textContent=s.consigne||`Manipule les paramètres de ${s.title.toLowerCase()}, observe le résultat et explique ce qui change.`;$("stationMethod").textContent=s.method;$("stationFormula").textContent=s.formula;renderActivity(s.activity);}
    if(state.phase===3){$("stationText").textContent="Vérifie ton raisonnement avec deux questions corrigées. Cette étape ne donne aucune note.";renderLocalCheck(s);}
    $("previousButton").disabled=state.phase===0&&index===0;
    $("previousButton").textContent=state.phase>0?`← ${phaseNames[state.phase-1]}`:"← Station précédente";
    $("previousButton").onclick=()=>state.phase>0?setPhase(state.phase-1):openStation(list[index-1].id,state.route,3);
    const localDone=state.phase!==3||state.localCheck?.stationId===s.id&&state.localCheck.completed;
    $("nextButton").disabled=state.phase===3&&!localDone;
    $("nextButton").textContent=state.phase<3?`${phaseNames[state.phase+1]} →`:index<list.length-1?"Station suivante →":"Terminer";
    $("nextButton").onclick=()=>state.phase<3?setPhase(state.phase+1):index<list.length-1?openStation(list[index+1].id,state.route,0):null;
    $("stepStatus").textContent=`${phaseNames[state.phase]} · ${state.phase+1}/4 · station ${index+1}/${list.length}`;
  }

  const conceptLabels={
    flow:["Entrée d’air","Ventilateur","Soufflage ou rejet"],
    flowcalc:["Section du conduit","Vitesse moyenne","Débit d’air"],
    pressure:["Prise statique","Pression dynamique","Pression totale"],
    humidity:["Température sèche","Vapeur présente","Humidité relative"],
    dew:["Refroidissement","100 % HR","Condensation"],
    loss:["Longueur et accidents","Résistance du réseau","Perte de pression"],
    fan:["Courbe ventilateur","Courbe du réseau","Point de fonctionnement"],
    heat:["Débit d’air","Écart de température","Puissance sensible"],
    mix:["Air extérieur","Air repris","Air mélangé"],
    recovery:["Air extérieur","Échangeur","Air soufflé"],
    measure:["Points de mesure","Moyenne représentative","Débit calculé"],
    diagnosis:["Observer","Comparer les mesures","Décider"],
    choice:["Observer","Comparer","Décider"]
  };
  function sequenceMarkup(labels,className="concept-flow"){
    return `<div class="${className}" role="img" aria-label="Chaîne : ${escapeText(labels.join(", puis "))}">${labels.map((label,i)=>`${i?'<span class="concept-arrow" aria-hidden="true">→</span>':''}<div class="concept-step" style="--step:${i}"><span>${i+1}</span><strong>${escapeText(label)}</strong></div>`).join("")}</div>`;
  }
  /* La scène de la station : un dessin par type d'activité. Les valeurs de l'activité
     y entrent, pour que le dessin dise la même chose que les curseurs. */
  const sceneDe=s=>scenes?scenes.rendre(s.activity.kind,s.id,s.activity):null;

  function renderDiscovery(s){
    const labels=conceptLabels[s.activity.kind]||conceptLabels.choice;
    const dessin=sceneDe(s);
    /* La scène montre le phénomène ; la chaîne de repères le nomme. Les deux, pas l'un
       à la place de l'autre : l'élève doit pouvoir mettre un mot sur ce qu'il voit. */
    $("activity").innerHTML=`<section class="concept-panel decouverte">${dessin||""}<p class="eyebrow">Le phénomène en trois repères</p>${sequenceMarkup(labels)}<p class="concept-caption">Observe la scène, puis nomme chaque repère avant de passer à l’explication.</p></section>`;
  }
  function renderMethodScene(s){
    const relation=s.formula||"Observation → comparaison → décision";
    $("activity").innerHTML=`<section class="concept-panel method-panel"><p class="eyebrow">La méthode professionnelle</p>${sequenceMarkup(["Données utiles",relation,"Contrôle de cohérence"],"method-sequence")}<p class="concept-caption">${escapeText(s.method)}</p></section>`;
  }
  function renderLocalCheck(s){
    if(!state.localCheck||state.localCheck.stationId!==s.id)state.localCheck={stationId:s.id,index:0,completed:false,answered:false};
    const checkState=state.localCheck,root=$("activity");
    if(checkState.completed){
      root.innerHTML=`<div class="local-complete result"><p class="eyebrow">Vérification terminée</p><h3>Tu peux poursuivre.</h3><p>Les deux réponses ont été corrigées. Aucune note n’est attribuée ici : l’évaluation sur 20 reste à la fin de la ligne.</p><button id="retryLocal" type="button">Revoir les deux questions</button></div>`;
      $("retryLocal").onclick=()=>{state.localCheck={stationId:s.id,index:0,completed:false,answered:false};renderStation();};
      return;
    }
    /* Les propositions s'affichent dans l'ordre du manifeste. Un remélange à graine
       fixe ne variait rien — il donnait toujours le même ordre — mais il défaisait
       la répartition des rangs construite au palier 3 : 20/20/20 dans les manifestes
       devenaient 16/28/16 à l'écran. C'est ce que voit l'élève qui compte. */
    const item=s.quiz[checkState.index],choices=item[2];
    root.innerHTML=`<div class="local-check"><p class="eyebrow">Question ${checkState.index+1} sur 2 · sans note</p><h3>${escapeText(item[0])}</h3><div class="choices">${choices.map(choice=>`<button type="button">${escapeText(choice)}</button>`).join("")}</div><p class="feedback" aria-live="polite"></p><button id="nextLocal" class="primary" type="button" hidden>${checkState.index===1?"Terminer la vérification":"Question suivante"}</button></div>`;
    root.querySelectorAll(".choices button").forEach(btn=>btn.addEventListener("click",()=>{
      if(checkState.answered)return;checkState.answered=true;const good=btn.textContent===item[1];
      root.querySelectorAll(".choices button").forEach(choice=>{choice.disabled=true;if(choice.textContent===item[1])choice.classList.add("correct");});
      if(!good)btn.classList.add("wrong");root.querySelector(".feedback").textContent=good?"Correct. Relie cette réponse à la manipulation.":`À reprendre. La réponse attendue est : ${item[1]}.`;
      $("nextLocal").hidden=false;
    }));
    $("nextLocal").onclick=()=>{if(checkState.index===1){checkState.completed=true;}else{checkState.index++;checkState.answered=false;}renderStation();};
  }
  function controls(items,result){return `<div class="readout">${items.map(x=>`<div class="control-card"><label for="${x.id}">${x.label} : <output id="${x.id}Out">${x.value}</output> ${x.unit}</label><input id="${x.id}" type="range" min="${x.min}" max="${x.max}" step="${x.step||1}" value="${x.value}"></div>`).join("")}</div><div id="calcResult" class="result">${result}</div>`;}
  function wire(ids,calculate){ids.forEach(id=>$(id).addEventListener("input",()=>{ids.forEach(key=>$(key+"Out").textContent=$(key).value);calculate();}));calculate();}
  function dewPoint(t,rh){const a=17.62,b=243.12,g=Math.log(rh/100)+(a*t)/(b+t);return b*g/(a-g);}
  function renderActivity(a){
    const root=$("activity");
    /* Le dessin de la station, s il en existe un pour ce type d activite. */
    const dessin=(scenes&&state.current?scenes.rendre(a.kind,state.current.id,a):"")||"";
    if(a.kind==="flow"){root.innerHTML=dessin;return;}
    if(a.kind==="flowcalc"){
      root.innerHTML=dessin+controls([{id:"diameter",label:"Diamètre",value:a.diameter,min:80,max:630,step:5,unit:"mm"},{id:"velocity",label:"Vitesse",value:a.velocity,min:.5,max:12,step:.1,unit:"m/s"}],"");
      wire(["diameter","velocity"],()=>{const d=+$('diameter').value/1000,v=+$('velocity').value,q=v*Math.PI*d*d/4*3600;$("calcResult").textContent=`Débit calculé : ${q.toFixed(0)} m³/h. Vérifie ensuite si la vitesse convient au projet.`;});return;
    }
    if(a.kind==="pressure"){
      root.innerHTML=dessin+controls([{id:"pstatic",label:"Pression statique",value:a.static,min:-100,max:500,unit:"Pa"},{id:"pdynamic",label:"Pression dynamique",value:a.dynamic,min:0,max:250,unit:"Pa"}],"");
      wire(["pstatic","pdynamic"],()=>{$("calcResult").textContent=`Pression totale : ${(+$("pstatic").value + +$("pdynamic").value).toFixed(0)} Pa.`;});return;
    }
    if(a.kind==="humidity"||a.kind==="dew"){
      root.innerHTML=dessin+controls([{id:"temperature",label:"Température sèche",value:a.temperature,min:-5,max:40,step:.5,unit:"°C"},{id:"rh",label:"Humidité relative",value:a.rh,min:10,max:100,unit:"%"}],"");
      wire(["temperature","rh"],()=>{const t=+$("temperature").value,r=+$("rh").value,dp=dewPoint(t,r);$("calcResult").textContent=`Point de rosée estimé : ${dp.toFixed(1)} °C. Une paroi plus froide peut condenser.`;});return;
    }
    if(a.kind==="loss"){
      root.innerHTML=dessin+controls([{id:"rate",label:"Perte linéaire",value:a.rate,min:.1,max:3,step:.1,unit:"Pa/m"},{id:"length",label:"Longueur",value:a.length,min:1,max:80,unit:"m"},{id:"local",label:"Pertes singulières",value:a.local,min:0,max:150,unit:"Pa"}],"");
      wire(["rate","length","local"],()=>{$("calcResult").textContent=`Perte de la branche : ${(+$('rate').value*+$('length').value + +$('local').value).toFixed(1)} Pa.`;});return;
    }
    if(a.kind==="heat"){
      root.innerHTML=dessin+controls([{id:"airflow",label:"Débit d’air",value:a.flow,min:100,max:5000,step:50,unit:"m³/h"},{id:"delta",label:"Écart de température",value:a.delta,min:1,max:25,step:.5,unit:"K"}],"");
      wire(["airflow","delta"],()=>{const p=1.2*1005*(+$('airflow').value/3600)*+$('delta').value;$("calcResult").textContent=`Puissance sensible indicative : ${(p/1000).toFixed(2)} kW (ρ = 1,2 kg/m³, cₚ = 1005 J/kg·K).`;});return;
    }
    if(a.kind==="recovery"){
      root.innerHTML=dessin+controls([{id:"outdoor",label:"Air extérieur",value:a.outdoor,min:-10,max:20,unit:"°C"},{id:"extract",label:"Air extrait",value:a.extract,min:15,max:30,unit:"°C"},{id:"supply",label:"Air soufflé",value:a.supply,min:0,max:28,unit:"°C"}],"");
      wire(["outdoor","extract","supply"],()=>{const den=+$('extract').value-+$('outdoor').value,eta=den?100*(+$('supply').value-+$('outdoor').value)/den:0;$("calcResult").textContent=`Efficacité de température calculée : ${eta.toFixed(0)} %. Les trois points de mesure doivent être cohérents.`;});return;
    }
    if(a.kind==="mix"){
      root.innerHTML=dessin+controls([{id:"q1",label:"Débit air extérieur",value:a.q1,min:100,max:2500,step:50,unit:"m³/h"},{id:"t1",label:"Température extérieure",value:a.t1,min:-10,max:35,unit:"°C"},{id:"q2",label:"Débit air repris",value:a.q2,min:100,max:2500,step:50,unit:"m³/h"},{id:"t2",label:"Température reprise",value:a.t2,min:10,max:30,unit:"°C"}],"");
      wire(["q1","t1","q2","t2"],()=>{const q1=+$('q1').value,q2=+$('q2').value,t=(q1*+$('t1').value+q2*+$('t2').value)/(q1+q2);$("calcResult").textContent=`Température de mélange simplifiée : ${t.toFixed(1)} °C.`;});return;
    }
    if(a.kind==="measure"){
      root.innerHTML=dessin+controls([{id:"measuredV",label:"Vitesse moyenne",value:a.velocity,min:.2,max:12,step:.1,unit:"m/s"},{id:"measuredA",label:"Section",value:a.area,min:.01,max:.5,step:.005,unit:"m²"}],"");
      wire(["measuredV","measuredA"],()=>{$("calcResult").textContent=`Débit : ${(+$("measuredV").value*+$("measuredA").value*3600).toFixed(0)} m³/h.`;});return;
    }
    if(a.kind==="fan"){
      root.innerHTML=dessin+controls([{id:"speed",label:"Commande ventilateur",value:a.speed,min:20,max:100,unit:"%"},{id:"resistance",label:"Résistance réseau",value:a.resistance,min:20,max:100,unit:"%"}],"");
      wire(["speed","resistance"],()=>{const balance=+$('speed').value-+$('resistance').value;$("calcResult").textContent=balance>8?"Pression disponible forte : contrôle le débit et le bruit.":balance<-8?"Réseau trop résistant pour cette commande : débit probablement insuffisant.":"Zone d’équilibre : confirme avec des mesures réelles.";});return;
    }
    if(a.kind==="diagnosis"){
      renderChoice(root,dessin,"Débit faible sur une bouche. Quel contrôle vient en premier ?","Mesurer le débit et la pression avant de conclure",["Remplacer immédiatement le ventilateur","Mesurer le débit et la pression avant de conclure","Fermer toutes les autres bouches"]);return;
    }
    if(a.kind==="choice"){renderChoice(root,dessin,a.prompt,a.answer,a.choices);return;}
    if(a.kind==="evaluation"){renderEvaluation(a.line);}
  }
  function renderChoice(root,dessin,prompt,answer,choices){
    root.innerHTML=`${dessin||""}<div><h3>${escapeText(prompt)}</h3><div class="choices">${choices.map(c=>`<button type="button">${escapeText(c)}</button>`).join("")}</div><p class="feedback" aria-live="polite"></p></div>`;
    root.querySelectorAll(".choices button").forEach(btn=>btn.addEventListener("click",()=>{const good=btn.textContent===answer;root.querySelectorAll("button").forEach(b=>{b.disabled=true;if(b.textContent===answer)b.classList.add("correct");});if(!good)btn.classList.add("wrong");root.querySelector(".feedback").textContent=good?"Correct. Explique maintenant pourquoi.":`À reprendre. La réponse attendue est : ${answer}.`; }));
  }
  function seededShuffle(array,seed){const copy=[...array];let n=seed;for(let i=copy.length-1;i>0;i--){n=(n*9301+49297)%233280;const j=Math.floor(n/233280*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
  function renderEvaluation(line){
    /* Douze questions tirées dans le parcours. Un simple mélange coupé à douze laissait
       des gares muettes — la ligne D n'interrogeait jamais sa station terminale. On sert
       donc d'abord une question par station, puis on complète avec le reste. */
    if(!state.quiz){
      const parcours=routeStations(line).filter(s=>s.activity.kind!=="evaluation");
      const paquets=parcours.map(s=>seededShuffle(s.quiz,line.charCodeAt(0)+s.id.length).map(q=>({question:q[0],answer:q[1],choices:q[2]})));
      const retenues=paquets.map(paquet=>paquet[0]).concat(seededShuffle(paquets.flatMap(paquet=>paquet.slice(1)),line.charCodeAt(0))).slice(0,12);
      state.quiz={items:seededShuffle(retenues,line.charCodeAt(0)),index:0,score:0,answered:false};
    }
    const q=state.quiz,root=$("activity");
    if(q.index>=q.items.length){const note=Math.round(q.score/q.items.length*20);root.innerHTML=`<div class="result"><h3>Bilan de la ligne ${line}</h3><p>Score brut : ${q.score}/${q.items.length}</p><p>Note formative : <strong>${note}/20</strong></p><p>${note>=14?"Acquis : poursuis vers une situation complète.":note>=10?"Fragile : reprends les stations signalées.":"À renforcer : reviens aux méthodes avant un nouvel essai."}</p><button id="restartQuiz" type="button">Refaire l’évaluation</button></div>`;$("restartQuiz").onclick=()=>{state.quiz=null;renderEvaluation(line);};return;}
    const item=q.items[q.index],choices=item.choices;
    root.innerHTML=`<div><p class="eyebrow">Question ${q.index+1} sur ${q.items.length}</p><h3>${escapeText(item.question)}</h3><div class="choices">${choices.map(c=>`<button type="button">${escapeText(c)}</button>`).join("")}</div><p class="feedback"></p><button id="nextQuiz" class="primary" type="button" hidden>Question suivante</button></div>`;
    root.querySelectorAll(".choices button").forEach(btn=>btn.addEventListener("click",()=>{if(q.answered)return;q.answered=true;const good=btn.textContent===item.answer;if(good)q.score++;root.querySelectorAll(".choices button").forEach(b=>{b.disabled=true;if(b.textContent===item.answer)b.classList.add("correct");});if(!good)btn.classList.add("wrong");root.querySelector(".feedback").textContent=good?"Correct.":`À reprendre : ${item.answer}.`;$("nextQuiz").hidden=false;}));
    $("nextQuiz").onclick=()=>{q.index++;q.answered=false;renderEvaluation(line);};
  }

  document.querySelectorAll("[data-level]").forEach(btn=>btn.addEventListener("click",()=>{state.level=btn.dataset.level;document.querySelectorAll("[data-level]").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});if(state.current)renderStation();}));
  $("startButton").onclick=()=>openStation(network.routes[state.route][0],state.route);$("backNetwork").onclick=closeStation;$("exitStation").onclick=closeStation;
  $("voiceButton").onclick=()=>speakCurrent($("voiceButton"));$("stationVoice").onclick=()=>speakCurrent($("stationVoice"));
  /* Changer le débit en pleine phrase n'a aucun effet : le moteur de synthèse ne relit pas
     ce qu'il est en train de prononcer. On arrête donc, et l'élève relance au nouveau débit —
     sinon le curseur ment sur ce qu'il fait. */
  if($("voiceRate")){
    $("voiceRate").addEventListener("input",()=>{
      state.vitesse=+$("voiceRate").value;
      const out=$("voiceRateOut");if(out)out.textContent=state.vitesse.toFixed(2).replace(".",",")+"×";
    });
    $("voiceRate").addEventListener("change",()=>{if(window.speechSynthesis?.speaking)stopVoice();});
  }
  if($("voicePick"))$("voicePick").addEventListener("change",()=>{state.voix=$("voicePick").value;if(window.speechSynthesis?.speaking)stopVoice();});
  if("speechSynthesis" in window){remplirVoix();window.speechSynthesis.onvoiceschanged=remplirVoix;}
  document.addEventListener("visibilitychange",()=>{if(document.hidden)stopVoice();});window.addEventListener("beforeunload",stopVoice);
  document.addEventListener("keydown",e=>{
    if(!state.current)return;if(e.key==="Escape"){closeStation();return;}if(["INPUT","BUTTON"].includes(document.activeElement.tagName))return;
    const list=routeStations(state.route),index=list.findIndex(s=>s.id===state.current.id),evaluation=state.current.activity.kind==="evaluation";
    if(e.key==="ArrowRight"){
      if(!evaluation&&state.phase<3)setPhase(state.phase+1);
      else if(!evaluation&&state.localCheck?.stationId===state.current.id&&state.localCheck.completed&&index<list.length-1)openStation(list[index+1].id,state.route,0);
      else if(evaluation&&index<list.length-1)openStation(list[index+1].id,state.route,0);
    }
    if(e.key==="ArrowLeft"){
      if(!evaluation&&state.phase>0)setPhase(state.phase-1);
      else if(index>0)openStation(list[index-1].id,state.route,3);
    }
  });
  drawMap();const [initial,initialRoute,initialPhase]=decodeURIComponent(location.hash.slice(1)).split("@");if(initial&&stations.some(s=>s.id===initial))openStation(initial,initialRoute,Number(initialPhase)||0);
})();
