(() => {
  "use strict";
  const fr=(n,d=2)=>n.toFixed(d).replace(".",",");
  const shell=(id,title,desc,body)=>`<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc">${desc}</desc><defs><marker id="arr-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0 0L0 6L9 3Z" fill="#1b3a63"/></marker><pattern id="gas-${id}" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.5" fill="#b06a00"/></pattern><pattern id="water-${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="#3d7fca" stroke-width="2"/></pattern></defs>${body}</svg>`;

  const cut=shell("vase-cut","Vase d’expansion à membrane","Le symbole validé est à gauche. La coupe pédagogique à droite montre une enveloppe, une membrane, un volume de gaz au-dessus et l’eau du réseau en dessous.",
    `<rect x="28" y="82" width="220" height="255" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><image href="assets/vase-expansion.svg" x="78" y="118" width="120" height="150"/><text x="138" y="305" text-anchor="middle" font-size="19" font-weight="700">SYMBOLE VALIDÉ</text>
     <path d="M415 68C340 68 310 120 310 210S340 352 415 352S520 300 520 210S490 68 415 68Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
     <path d="M316 205C350 180 480 180 514 205V210C480 240 350 240 316 210Z" fill="#fff4e0" stroke="#c9451a" stroke-width="5"/>
     <path d="M323 210C350 238 480 238 507 210V330C470 365 360 365 323 330Z" fill="url(#water-vase-cut)"/>
     <path d="M323 205V92C360 55 470 55 507 92V205C475 178 355 178 323 205Z" fill="url(#gas-vase-cut)"/>
     <path d="M415 352V390" stroke="#1b3a63" stroke-width="12"/>
     <path d="M560 118H498" stroke="#b06a00" stroke-width="4" marker-end="url(#arr-vase-cut)"/><rect x="548" y="100" width="160" height="36" rx="9" fill="#fffdf8" stroke="#b06a00" stroke-width="2"/><text x="628" y="123" text-anchor="middle" font-size="19" font-weight="700">GAZ · PRÉCHARGE</text>
     <path d="M560 292H498" stroke="#3d7fca" stroke-width="4" marker-end="url(#arr-vase-cut)"/><rect x="548" y="274" width="160" height="36" rx="9" fill="#fffdf8" stroke="#3d7fca" stroke-width="2"/><text x="628" y="297" text-anchor="middle" font-size="19" font-weight="700">EAU DU RÉSEAU</text>
     <path d="M560 210H505" stroke="#c9451a" stroke-width="4" marker-end="url(#arr-vase-cut)"/><rect x="558" y="187" width="100" height="36" rx="9" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/><text x="608" y="210" text-anchor="middle" font-size="19" font-weight="700">MEMBRANE</text>`);

  function prechargeScene(p=1.2){const y=335-Math.max(35,Math.min(210,(2.8-p)*100));const state=p<1?"TROP BASSE":p>1.4?"TROP HAUTE":"ZONE DU CAS";const color=p<1||p>1.4?"#b06a00":"#1e7e54";const dash=p<1||p>1.4?"5 5":"0";return shell("vase-pre","Pression initiale du cas d’étude",`Précharge réglée à ${fr(p,1)} bar. L’installation pédagogique demande 1,2 bar selon son dossier. État affiché : ${state}.`,
    `<text x="360" y="40" text-anchor="middle" font-size="21" font-weight="700">CAS FICTIF : PRÉCHARGE ATTENDUE 1,2 bar</text>
     <path d="M360 65C280 65 250 120 250 220S280 370 360 370S470 320 470 220S440 65 360 65Z" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
     <path d="M258 ${y}C300 ${y-20} 420 ${y-20} 462 ${y}V${y+5}C420 ${y+25} 300 ${y+25} 258 ${y+5}Z" fill="#fff4e0" stroke="#c9451a" stroke-width="5"/>
     <path d="M258 ${y}V92C300 50 420 50 462 92V${y}C420 ${y-22} 300 ${y-22} 258 ${y}Z" fill="url(#gas-vase-pre)"/>
     <path d="M258 ${y+4}C300 ${y+25} 420 ${y+25} 462 ${y+4}V342C420 382 300 382 258 342Z" fill="url(#water-vase-pre)"/>
     <rect x="28" y="135" width="180" height="90" rx="15" fill="#fffdf8" stroke="${color}" stroke-width="5" stroke-dasharray="${dash}"/><text x="118" y="170" text-anchor="middle" font-size="20" font-weight="700">${fr(p,1)} bar</text><text x="118" y="201" text-anchor="middle" font-size="19" font-weight="700">${state}</text>
     <text x="590" y="165" text-anchor="middle" font-size="19" font-weight="700">PAS DE VALEUR</text><text x="590" y="190" text-anchor="middle" font-size="19" font-weight="700">UNIVERSELLE</text><text x="590" y="225" text-anchor="middle" font-size="19">lire le dossier</text>`);}

  const control=shell("vase-control","Conditions d’un contrôle de précharge","Le schéma ordonne autorisation, arrêt et refroidissement, isolement selon la procédure, pression d’eau relâchée en sécurité, puis mesure côté gaz. Il ne décrit pas un geste complet.",
    `<text x="360" y="62" text-anchor="middle" font-size="22" font-weight="700">CONTRÔLE PAR PERSONNE AUTORISÉE</text>
     <g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">${["Procédure", "Refroidir", "Isoler", "Côté eau à 0", "Mesurer gaz"].map((t,i)=>`<rect x="${15+i*142}" y="150" width="126" height="92" rx="15"/><text x="${78+i*142}" y="188" text-anchor="middle" font-size="19" font-weight="700">${t}</text><text x="${78+i*142}" y="216" text-anchor="middle" font-size="19">étape ${i+1}</text>`).join("")}</g>
     ${Array.from({length:4},(_,i)=>`<path d="M${141+i*142} 196H${155+i*142}" stroke="#c9451a" stroke-width="5" marker-end="url(#arr-vase-control)"/>`).join("")}
     <rect x="130" y="300" width="460" height="66" rx="16" fill="#fbe7e4" stroke="#c0392b" stroke-width="4" stroke-dasharray="8 5"/><text x="360" y="328" text-anchor="middle" font-size="19" font-weight="700">DANGER : pression et température réelles</text><text x="360" y="352" text-anchor="middle" font-size="19">la simulation ne remplace pas la procédure du site</text>`);

  const expansionAnimee = `<svg viewBox="0 0 760 430" role="img" aria-labelledby="vase-titre vase-desc" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif">
  <title id="vase-titre">Vase d'expansion : la membrane absorbe la dilatation de l'eau</title>
  <desc id="vase-desc">Coupe d'un vase à membrane : en haut le gaz de précharge, en bas l'eau du réseau, entre les deux une membrane souple. Quand l'eau chauffe, elle se dilate, pousse la membrane vers le haut et comprime le gaz ; le manomètre monte un peu. Quand l'eau refroidit, la membrane redescend.</desc>
  <defs>
    <pattern id="vase-points" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.6" fill="#1b3a63" opacity=".55"/></pattern>
    <clipPath id="vase-corps-clip"><rect x="250" y="70" width="200" height="270" rx="60"/></clipPath>
  </defs>
  <rect x="10" y="10" width="740" height="410" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
  <text x="380" y="46" text-anchor="middle" font-size="22" font-weight="700" fill="#1b3a63">LA MEMBRANE SUIT LA DILATATION</text>
  <g id="vase-corps">
    <rect x="250" y="70" width="200" height="270" rx="60" fill="#f3f7fb" stroke="#1b3a63" stroke-width="4"/>
    <g clip-path="url(#vase-corps-clip)">
      <rect id="vase-gaz" x="250" y="70" width="200" height="130" fill="url(#vase-points)"/>
      <rect id="vase-eau" x="250" y="200" width="200" height="140" fill="#9fbfe6"/>
      <path id="vase-membrane" d="M250 200 Q350 180 450 200" fill="none" stroke="#c9451a" stroke-width="7"/>
    </g>
    <rect x="250" y="70" width="200" height="270" rx="60" fill="none" stroke="#1b3a63" stroke-width="4"/>
  </g>
  <g id="vase-raccord">
    <path d="M350 340 V385 H520" fill="none" stroke="#1b3a63" stroke-width="12"/>
    <path d="M350 340 V385 H520" fill="none" stroke="#3d7fca" stroke-width="5"/>
  </g>
  <g id="vase-mano" transform="translate(620 150)">
    <circle r="46" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
    <path d="M-30 20 A38 38 0 1 1 30 20" fill="none" stroke="#637285" stroke-width="3"/>
    <g id="vase-mano-aiguille" transform="rotate(-40)"><path d="M0 6 L0 -34" stroke="#c9451a" stroke-width="4"/><circle r="5" fill="#1b3a63"/></g>
  </g>
  <path d="M520 385 H620 V196" fill="none" stroke="#1b3a63" stroke-width="6"/>
  <g id="vase-thermo" transform="translate(140 130)">
    <rect x="-12" y="0" width="24" height="170" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
    <rect id="vase-thermo-colonne" x="-6" y="110" width="12" height="54" rx="6" fill="#c9451a"/>
    <circle cy="170" r="16" fill="#c9451a" stroke="#1b3a63" stroke-width="3"/>
  </g>
  <g font-size="20" font-weight="700">
    <g id="vase-lib-gaz"><rect x="470" y="90" width="120" height="34" rx="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><text x="530" y="114" text-anchor="middle" fill="#1b3a63">GAZ</text><path d="M470 107 H452" stroke="#1b3a63" stroke-width="2"/></g>
    <g id="vase-lib-membrane"><rect x="470" y="230" width="150" height="34" rx="9" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/><text x="545" y="254" text-anchor="middle" fill="#c9451a">MEMBRANE</text><path d="M470 247 L452 220" stroke="#c9451a" stroke-width="2"/></g>
    <g id="vase-lib-eau"><rect x="470" y="290" width="120" height="34" rx="9" fill="#fffdf8" stroke="#3d7fca" stroke-width="2"/><text x="530" y="314" text-anchor="middle" fill="#3d7fca">EAU</text><path d="M470 307 H452" stroke="#3d7fca" stroke-width="2"/></g>
    <rect x="40" y="70" width="200" height="34" rx="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><text x="140" y="94" text-anchor="middle" fill="#1b3a63">EAU DU RÉSEAU</text>
    <rect x="560" y="60" width="150" height="34" rx="9" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><text x="635" y="84" text-anchor="middle" fill="#1b3a63">PRESSION</text>
  </g>
  <text x="380" y="410" text-anchor="middle" font-size="20" fill="#637285">L'eau chauffe : elle se dilate, la membrane monte, le gaz se comprime.</text>
</svg>
<div class="flux-controls">
  <button type="button" data-flux="lire">▶ Chauffer</button>
  <button type="button" data-flux="rejouer">↺ Recommencer</button>
  <p class="flux-etat" aria-live="polite">Eau froide : la membrane est basse, le gaz occupe sa place normale.</p>
</div>`;

  function brancherVase(scene) {
    const gaz = scene.querySelector("#vase-gaz");
    const eau = scene.querySelector("#vase-eau");
    const membrane = scene.querySelector("#vase-membrane");
    const aiguille = scene.querySelector("#vase-mano-aiguille");
    const colonne = scene.querySelector("#vase-thermo-colonne");
    const etat = scene.querySelector(".flux-etat");
    const lire = scene.querySelector('[data-flux="lire"]');
    const rejouer = scene.querySelector('[data-flux="rejouer"]');
    if (!gaz || !eau || !membrane || !aiguille || !colonne || !etat || !lire || !rejouer) return;
    const messages = [
      [0, "Eau froide : la membrane est basse, le gaz occupe sa place normale."],
      [.5, "L’eau chauffe et se dilate : elle pousse la membrane vers le haut."],
      [1, "Membrane haute, gaz comprimé : la pression a un peu augmenté, le thermomètre marque le chaud."]
    ];
    function positionner(p) {
      const yMembrane = 200 - p * 40;
      gaz.setAttribute("height", String(yMembrane - 70));
      eau.setAttribute("y", String(yMembrane));
      eau.setAttribute("height", String(340 - yMembrane));
      membrane.setAttribute("d", `M250 ${yMembrane.toFixed(1)} Q350 ${(yMembrane - 20).toFixed(1)} 450 ${yMembrane.toFixed(1)}`);
      aiguille.setAttribute("transform", `rotate(${(-40 + p * 50).toFixed(1)})`);
      const colY = 110 - p * 50;
      colonne.setAttribute("y", String(colY));
      colonne.setAttribute("height", String(164 - colY));
      const message = messages.filter(([seuil]) => p >= seuil - 1e-6).pop();
      if (message && etat.dataset.cle !== String(message[0])) { etat.dataset.cle = String(message[0]); etat.textContent = message[1]; }
    }
    let avancement = 0, enLecture = false, derniereFrame = 0, cible = 0;
    function animer(temps) {
      if (!enLecture) return;
      if (!derniereFrame) derniereFrame = temps;
      const pas = (temps - derniereFrame) / 1800;
      derniereFrame = temps;
      avancement = cible === 1 ? Math.min(1, avancement + pas) : Math.max(0, avancement - pas);
      positionner(avancement);
      if (avancement === cible) { enLecture = false; lire.textContent = cible === 1 ? "↺ Refroidir" : "▶ Chauffer"; return; }
      requestAnimationFrame(animer);
    }
    lire.addEventListener("click", () => {
      cible = cible === 1 ? 0 : 1;
      enLecture = true; derniereFrame = 0;
      lire.textContent = cible === 1 ? "Ⅱ Chauffe en cours…" : "Ⅱ Refroidit…";
      requestAnimationFrame(animer);
    });
    rejouer.addEventListener("click", () => {
      enLecture = false; avancement = 0; cible = 1; delete etat.dataset.cle;
      positionner(0); lire.textContent = "▶ Chauffer";
      etat.textContent = "Eau froide : la membrane est basse, le gaz occupe sa place normale.";
    });
    positionner(0);
  }

  const diagnosis=shell("vase-diag","Pression qui varie : symptômes et vérifications","Un graphe montre une forte variation entre froid et chaud et une soupape qui évacue. Des flèches mènent vers contrôle du vase et des pressions, jamais vers neutralisation de la soupape.",
    `<path d="M90 320V80M90 320H500" stroke="#1b3a63" stroke-width="4"/><path d="M100 280C180 270 205 120 285 145S390 90 480 115" fill="none" stroke="#c9451a" stroke-width="7"/>
     <path d="M100 260C190 250 280 230 480 220" fill="none" stroke="#3d7fca" stroke-width="5" stroke-dasharray="10 7"/>
     <rect x="212" y="86" width="256" height="27" rx="7" fill="#fffdf8" stroke="#c9451a" stroke-width="2"/><text x="220" y="105" font-size="19" font-weight="700">variation forte · symptôme</text>
     <rect x="292" y="228" width="250" height="27" rx="7" fill="#fffdf8" stroke="#3d7fca" stroke-width="2"/><text x="300" y="247" font-size="19" font-weight="700">plage attendue à vérifier</text>
     <rect x="530" y="90" width="165" height="100" rx="15" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="5 5"/><text x="612" y="125" text-anchor="middle" font-size="19" font-weight="700">SOUPAPE</text><text x="612" y="152" text-anchor="middle" font-size="19">évacuation constatée</text><text x="612" y="176" text-anchor="middle" font-size="19">ne pas neutraliser</text>
     <rect x="525" y="250" width="175" height="85" rx="15" fill="#e3f5ec" stroke="#1e7e54" stroke-width="5"/><text x="612" y="280" text-anchor="middle" font-size="19" font-weight="700">VÉRIFIER</text><text x="612" y="304" text-anchor="middle" font-size="19">vase + pressions</text><text x="612" y="324" text-anchor="middle" font-size="19">conditions sûres</text>`);

  window.STATION_CONFIG={code:"E6",id:"vase",title:"Vase d’expansion",next:"poursuivre vers la sécurité",levels:{CAP:{objective:"Reconnaître le vase, l’eau, le gaz et signaler sans intervenir seul.",assessment:"nommer les deux côtés et signaler sans intervenir"},TP:{objective:"Identifier le vase, ses volumes et les conditions d’un contrôle sûr.",assessment:"relier symptômes, précharge et démarche sans neutraliser la sécurité"},BTS:{objective:"Relier dilatation, volume utile, précharge et plage de pression.",assessment:"analyser le cas d’étude et expliciter les données manquantes"}},steps:[
    {short:"Identifier",narration: "Ouvrons un vase d'expansion pour comprendre ce que le symbole ne montre pas. À l'intérieur, une membrane sépare deux volumes : d'un côté l'eau du circuit, de l'autre un gaz sous pression. La membrane peut se déplacer, et c'est tout le principe. Quand l'eau du circuit se dilate, elle pousse la membrane et comprime le gaz. Le volume supplémentaire trouve ainsi une place, au lieu de faire monter la pression jusqu'à la soupape. En fonctionnement normal, l'eau et le gaz ne se mélangent jamais : c'est précisément le rôle de la membrane.", kicker:"repérer",title:"Eau, membrane et gaz",text:"La coupe explique la fonction derrière le symbole : accepter une variation de volume sans mélange eau-gaz normal.",cap:"Montrez le côté eau et le côté gaz du vase.",tp:"Repérez raccordement eau, membrane et côté gaz.",bts:"Distinguez volume total, volume d’eau admissible et volume de gaz.",scene:cut,equivalent:"À gauche le symbole validé; à droite, eau et gaz sont séparés par une membrane dans une enveloppe raccordée au réseau.",action:{type:"match",prompt:"Associez chaque partie à son rôle.",options:["Volume variable du réseau","Séparation souple","Volume compressible"],items:[{label:"Eau",answer:0},{label:"Membrane",answer:1},{label:"Gaz",answer:2}],explain:"Le gaz se comprime lorsque l’eau dilatée entre dans le vase; la membrane sépare les deux milieux."}},
    {short:"Fonction",narration: "Faites monter la température et suivez le déplacement. L'eau se dilate — de quelques pour cent seulement, mais dans un circuit fermé et incompressible, ces quelques pour cent suffiraient à faire exploser la pression sans le vase. La membrane recule, le gaz se comprime, la pression monte modérément. C'est un accompagnement, pas une régulation : le vase ne maintient pas la pression constante, il en limite la montée. Les valeurs de ce modèle sont qualitatives, elles montrent la logique du déplacement et non une courbe universelle de l'eau.", kicker:"comprendre",title:"La dilatation déplace la membrane",text:"Faites évoluer l’indice thermique, puis cliquez « Chauffer » sur la coupe animée : la membrane monte, le gaz se comprime, l’aiguille et le thermomètre suivent. La pression et le déplacement sont qualitatifs, pas une courbe universelle de l’eau.",cap:"Suivez la membrane qui bouge avec la chaleur.",tp:"Observez le passage froid-vers-chaud et nommez l’effet.",bts:"Listez les données nécessaires à un dimensionnement réel : volume, fluide, températures et pressions limites.",scene:expansionAnimee,wire:brancherVase,equivalent:(v)=>`Indice thermique ${v}/100; dilatation pédagogique ${fr(3*v/100,1)} %; pression simulée ${fr(1.2+1.3*v/100)} bar.`,action:{type:"range",prompt:"Faites varier le cycle thermique.",label:"Indice thermique",min:0,max:100,step:10,value:50,evaluate:(v)=>({readout:`${v}/100`,observation:`Dilatation pédagogique ${fr(3*v/100,1)} % ; pression du cas ${fr(1.2+1.3*v/100)} bar. La vraie relation dépend du projet.`})}},
    {short:"Précharge",narration: "La précharge, c'est la pression de gaz du vase quand il est vide d'eau. Elle vient du dossier de l'installation, pas d'une habitude ni d'un chiffre appris par cœur : elle dépend de la hauteur du bâtiment et de la pression de remplissage prévue. Modifiez-la et observez l'effet sur le volume d'eau que le vase peut réellement accepter. Une précharge trop élevée, et le vase n'accepte presque rien : la pression s'envole au chauffage et la soupape crache. Une précharge trop faible, et le vase se remplit d'eau trop vite : il sature et ne joue plus son rôle en fin de course.", kicker:"observer",title:"La pression initiale vient du dossier",text:"Ce cas fictif demande 1,2 bar. Modifiez la précharge et observez le volume d’eau disponible dans le modèle.",cap:"Comparez la pression affichée avec la valeur de la fiche.",tp:"Comparez la valeur mesurée à la valeur attendue du dossier.",bts:"Justifiez la précharge à partir de la pression statique, des marges et des conditions retenues.",scene:prechargeScene,equivalent:(v)=>`Précharge ${fr(Number(v),1)} bar pour un cas fictif attendu à 1,2 bar. Le dessin de membrane est qualitatif.`,action:{type:"range",prompt:"Modifiez la précharge du cas fictif.",label:"Précharge",min:.5,max:2.5,step:.1,value:1.2,evaluate:(v)=>({readout:`${fr(v,1)} bar`,observation:v<1?"Précharge basse pour ce cas : la réserve utile peut être mal répartie.":v>1.4?"Précharge haute pour ce cas : l’entrée d’eau peut être limitée.":"Valeur proche de la zone attendue de ce seul cas fictif."})}},
    {short:"Contrôler",narration: "La précharge ne se lit pas correctement avec l'eau du circuit appliquée sur la membrane : la pression d'eau la pousse et fausse la lecture. Pour un contrôle valable, il faut que le vase soit isolé et vidangé côté eau. Je vous donne ici les conditions du contrôle, pas la procédure complète du geste : celle-ci dépend du montage, de la présence d'une vanne d'isolement dédiée, et des consignes du site. Le principe reste le même : on ne mesure pas une précharge sur un vase en service, et il faut aller chercher la procédure applicable à l'installation devant vous.", kicker:"mesurer",title:"Préparer un contrôle sûr",text:"La précharge ne se lit pas correctement avec la pression d’eau appliquée. Ordonnez seulement les conditions, pas un geste réel complet.",cap:"Signalez que ce contrôle demande une personne autorisée.",tp:"Travaillez sous autorisation et avec la procédure de l’installation.",bts:"Expliquez pourquoi la pression côté eau doit être relâchée en sécurité avant la mesure du gaz.",scene:control,equivalent:"Conditions : procédure, refroidissement, isolement, côté eau sans pression, mesure côté gaz par personne autorisée.",action:{type:"sequence",prompt:"Placez les conditions dans l’ordre.",items:["Lire la procédure et autoriser","Arrêter et laisser refroidir","Isoler selon le dossier","Relâcher côté eau en sécurité"],correctOrder:[0,1,2,3],explain:"La mesure côté gaz vient ensuite, avec l’instrument et la procédure prévus. La simulation n’autorise aucune intervention."}},
    {short:"Vérifier",narration: "Une pression qui monte fortement et une soupape qui évacue sont des symptômes, pas un diagnostic. Un vase mort ou mal préchargé en est la cause la plus fréquente, et c'est la première piste à explorer. Mais une pression de remplissage trop élevée dès le départ, un vase sous-dimensionné, ou un apport d'eau involontaire par un remplissage qui fuit donnent les mêmes signes. Notez bien : pendant tout ce temps, la protection reste active. La soupape fait son travail. Prenez le temps de chercher la cause, sans jamais la neutraliser.", kicker:"hypothèse",title:"Forte variation ne signifie pas une cause unique",text:"Une pression qui monte fortement et une soupape qui évacue sont des symptômes. La protection reste active.",cap:"Signalez la fuite sans toucher à la soupape.",tp:"Signalez, sécurisez et contrôlez selon la procédure sans dérégler la soupape.",bts:"Vérifiez vase, précharge, volume et plage de pression avant de retenir une cause.",scene:diagnosis,equivalent:"Le graphe compare une variation forte à une plage attendue. La soupape évacue; l’action proposée est vérifier, jamais neutraliser.",action:{type:"choice",prompt:"Quelle conduite est cohérente ?",options:[{label:"Garder la protection et vérifier vase + pressions"},{label:"Bloquer la soupape"},{label:"Gonfler au hasard"},{label:"Remplacer le vase sans mesure"}],correct:0,explain:"La soupape signale ou limite une surpression. On ne la neutralise pas; on traite la cause après contrôles sûrs."}}
  ],quiz:[
    {context:"L’eau chauffe dans un réseau fermé.",question:"Quel rôle remplit le vase ?",options:["Recevoir une partie de la dilatation et limiter la variation de pression","Créer le débit","Mélanger deux circuits","Évacuer toujours l’eau"],correct:0,explain:"La membrane permet au volume d’eau de varier en comprimant le gaz."},
    {context:"Le dossier d’un cas fictif indique une précharge attendue.",question:"Que faut-il faire d’une autre valeur ?",options:["La comparer dans les conditions de contrôle prévues","Utiliser 1,2 bar partout","Gonfler en service au hasard","Neutraliser la soupape"],correct:0,explain:"La précharge dépend de l’installation. Elle se contrôle dans des conditions définies et sûres."},
    {context:"La pression varie fortement entre froid et chaud.",question:"Quelle conclusion est juste ?",options:["C’est un symptôme qui demande plusieurs vérifications","La membrane est forcément percée","La soupape est la cause","Le circulateur doit être remplacé"],correct:0,explain:"Vase, précharge, volume, remplissage et autres conditions doivent être vérifiés."},
    {context:"La soupape évacue pendant la montée en pression.",question:"Quelle action est interdite ?",options:["Neutraliser ou boucher la protection","Signaler l’anomalie","Mettre en sécurité selon la procédure","Vérifier les pressions"],correct:0,explain:"Une protection ne se condamne jamais pour masquer le symptôme."}
  ],summaryScene:cut,summaryEquivalent:"Synthèse : le vase à membrane absorbe la dilatation grâce à un volume de gaz compressible. Précharge et volume se déterminent pour le projet; la sécurité reste active."};
})();
