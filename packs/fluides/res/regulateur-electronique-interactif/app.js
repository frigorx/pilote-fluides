/* =====================================================================
   LE RÉGULATEUR ÉLECTRONIQUE — lire, régler, câbler
   ---------------------------------------------------------------------
   Station de la ligne 🎛 CE QUI SE RÈGLE. Reprend le fond métier du
   simulateur Régul'Froid (dépôt privé `regulfroid-simulateur`, 06/08/2026)
   dans le moteur d'écrans du pack, et le rend PUBLIABLE :

   - aucun fichier image, aucun extrait de notice : tous les visuels de
     cette page sont des SVG écrits ici ;
   - les marques sont citées à titre descriptif, pour désigner les
     appareils réellement rencontrés en atelier — trois constructeurs
     concurrents, aucune promotion, aucune affiliation ;
   - les valeurs affichées sont des VALEURS D'EXERCICE : la notice de la
     référence installée fait foi, et c'est écrit à chaque écran.

   Le fond métier tenu depuis l'origine, à ne pas perdre en éditant :
   départ toujours protégé par Q1, inversion phase/neutre refusée ET
   expliquée, sonde deux fils sans polarité, hystérésis, dégivrage
   complet (arrêt sur sonde, durée maxi, égouttage, retard ventilateur).
   ===================================================================== */
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const dossiers = [
  { id: "comprendre", label: "Comprendre", note: "la sonde et les deux nombres" },
  { id: "programmer", label: "Programmer", note: "trois façades, une méthode" },
  { id: "degivrer",   label: "Dégivrer",   note: "le cycle en entier" },
  { id: "cabler",     label: "Câbler",     note: "du départ protégé aux sondes" },
  { id: "controler",  label: "Contrôler",  note: "prouver ce qu’on a réglé" },
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
    const stored = Number(localStorage.getItem("regulateur-voice-rate"));
    const index = voiceRates.indexOf(stored);
    return index >= 0 ? index : 1;
  } catch (_) { return 1; }
}
function saveRate() { try { localStorage.setItem("regulateur-voice-rate", String(voiceRates[rateIndex])); } catch (_) {} }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function stripHtml(value) { const box = document.createElement("div"); box.innerHTML = value; return box.textContent || ""; }
function screen(data) { return { level: "comprendre", codes: [], prompt: "", speak: "", ...data }; }

function statement(item) {
  return `<div class="panel"><div class="panel-title">${esc(item.visual || item.title)}</div><div class="diagram">${item.diagram || ""}</div></div>`;
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

/* =====================================================================
   LES SONDES RÉSISTIVES — modèles de calcul écrits ici
   ---------------------------------------------------------------------
   Aucune table de constructeur n'est recopiée : chaque famille est
   CALCULÉE par sa loi physique, à partir de sa valeur nominale.

   - NTC : loi en bêta, R = R25 · exp(β(1/T − 1/298,15)), β = 3435 K,
     valeur nominale d'une 10 kΩ courante. C'est un modèle simplifié :
     sur une sonde réelle, β glisse avec la température, et l'écart aux
     extrêmes de la plage se voit. On le dit à l'écran — c'est justement
     ce qui interdit de recopier une valeur d'exercice sur un chantier.
   - PTC silicium 990 Ω : loi quadratique R25(1 + a·ΔT + b·ΔT²),
     a = 7,871·10⁻³, b = 1,878·10⁻⁵, calée sur les deux bouts de la
     plage d'emploi (−40 °C et +100 °C).
   - Pt1000 : équations nominales de la norme IEC 60751, coefficients
     A = 3,9083·10⁻³, B = −5,7750·10⁻⁷, C = −4,1830·10⁻¹².
   ===================================================================== */

const SONDES = {
  ntc: {
    label: "NTC 10 kΩ", nom: "thermistance NTC 10 kΩ", sens: "descend",
    repere: "10 000 Ω à 25 °C", tRepere: 25,
    quoi: "Coefficient négatif : quand la température monte, la résistance descend. La courbe n’est pas une droite — elle plonge.",
    methode: "Loi en bêta, β = 3435 K · modèle d’exercice",
    R: t => 10000 * Math.exp(3435 * (1 / (t + 273.15) - 1 / 298.15)),
  },
  ptc: {
    label: "PTC 990 Ω", nom: "thermistance PTC 990 Ω", sens: "monte",
    repere: "990 Ω à 25 °C", tRepere: 25,
    quoi: "Coefficient positif : quand la température monte, la résistance monte aussi.",
    methode: "Loi quadratique du silicium · modèle d’exercice",
    R: t => { const d = t - 25; return 990 * (1 + 7.871e-3 * d + 1.878e-5 * d * d); },
  },
  pt1000: {
    label: "Pt1000", nom: "sonde platine Pt1000", sens: "monte",
    repere: "1 000 Ω à 0 °C", tRepere: 0,
    quoi: "Fil de platine : la résistance monte avec la température, de façon presque droite. C’est la plus régulière des trois.",
    methode: "Équations nominales IEC 60751",
    R: t => {
      const a = 3.9083e-3, b = -5.775e-7, c = -4.183e-12;
      return 1000 * (t >= 0 ? 1 + a * t + b * t * t
        : 1 + a * t + b * t * t + c * (t - 100) * t ** 3);
    },
  },
};

function ohms(valeur) { return Math.round(valeur).toLocaleString("fr-FR"); }
function nombre(valeur) { return Number.isInteger(valeur) ? String(valeur) : valeur.toFixed(1).replace(".", ","); }

/* --- Le laboratoire deux fils : une sonde, une température, une résistance --- */
function sondeLabMarkup() {
  return `<div class="panel labo-sonde">
    <div class="sonde-choix" role="group" aria-label="Choisir une famille de sonde">
      ${Object.keys(SONDES).map((id, i) => `<button type="button" class="sonde-bouton${i === 0 ? " active" : ""}" data-sonde="${id}" aria-pressed="${i === 0}"><strong>${esc(SONDES[id].label)}</strong><small>${SONDES[id].sens === "descend" ? "R ↓ quand T ↑" : "R ↑ quand T ↑"}</small></button>`).join("")}
    </div>
    <div class="range-row"><span>Température de la sonde</span>
      <input type="range" id="sonde-t" min="-40" max="100" step="1" value="7" aria-label="Température de la sonde en degrés Celsius">
      <output id="sonde-t-val">7 °C</output></div>
    <div class="sonde-lecture">
      <div class="ohmmetre" aria-live="polite"><small>RÉSISTANCE CALCULÉE</small><strong id="sonde-ohms">—</strong><span id="sonde-ecart"></span></div>
      <div class="sonde-courbe"><svg viewBox="0 0 340 150" role="img" aria-labelledby="courbe-t courbe-d">
        <title id="courbe-t">Courbe résistance / température</title><desc id="courbe-d" >Elle se met à jour avec le curseur.</desc>
        <line class="axe" x1="40" y1="120" x2="326" y2="120"></line><line class="axe" x1="40" y1="12" x2="40" y2="120"></line>
        <path id="courbe-trace" d=""></path><line class="repere" id="courbe-guide" x1="0" y1="0" x2="0" y2="0"></line>
        <circle id="courbe-point" cx="0" cy="0" r="5"></circle>
        <text x="40" y="138">−40 °C</text><text x="326" y="138" text-anchor="end">100 °C</text>
        <text id="courbe-haut" x="45" y="20">—</text><text id="courbe-bas" x="45" y="114">—</text>
      </svg></div>
    </div>
    <div class="feedback" id="sonde-mot" aria-live="polite"></div>
    <p class="note-exercice"><strong>Valeurs d’exercice, calculées.</strong> Sur un chantier, la table de la notice fait foi — et la mesure se fait <b>hors tension, sonde débranchée du régulateur</b>.</p>
  </div>`;
}

function wireSondeLab() {
  let choisie = "ntc";
  const curseur = $("#sonde-t");

  function dessiner() {
    const sonde = SONDES[choisie];
    const t = Number(curseur.value);
    const r = sonde.R(t);
    const temperatures = Array.from({ length: 29 }, (_, i) => -40 + i * 5);
    const valeurs = temperatures.map(sonde.R);
    const bas = Math.min(...valeurs), haut = Math.max(...valeurs);
    const x = v => 40 + ((v + 40) / 140) * 286;
    const y = v => 12 + (1 - (v - bas) / (haut - bas)) * 108;

    $("#courbe-trace").setAttribute("d", valeurs.map((v, i) => `${i ? "L" : "M"} ${x(temperatures[i]).toFixed(1)} ${y(v).toFixed(1)}`).join(" "));
    const px = x(t), py = y(r);
    const guide = $("#courbe-guide");
    guide.setAttribute("x1", px); guide.setAttribute("x2", px); guide.setAttribute("y1", 120); guide.setAttribute("y2", py);
    $("#courbe-point").setAttribute("cx", px); $("#courbe-point").setAttribute("cy", py);
    $("#courbe-haut").textContent = `${ohms(haut)} Ω`;
    $("#courbe-bas").textContent = `${ohms(bas)} Ω`;
    $("#sonde-t-val").textContent = `${t} °C`;
    /* Le point nominal est exact par définition ; partout ailleurs la valeur
       vient d'un modèle, et un modèle n'est pas une table de constructeur. */
    const nominal = t === sonde.tRepere;
    $("#sonde-ohms").innerHTML = `${nominal ? "" : "≈ "}${ohms(r)} <small>Ω</small>`;

    const ecart = r - sonde.R(sonde.tRepere);
    $("#sonde-ecart").textContent = `${ecart >= 0 ? "+" : "−"}${ohms(Math.abs(ecart))} Ω par rapport au repère de ${sonde.tRepere} °C`;
    $("#courbe-d").textContent = `À ${t} degrés, la ${sonde.nom} mesure environ ${ohms(r)} ohms.`;

    const mot = $("#sonde-mot");
    mot.className = "feedback good";
    mot.innerHTML = `<strong>${esc(sonde.label)} · ${esc(sonde.repere)}.</strong> ${esc(sonde.quoi)} <em>${esc(sonde.methode)}.</em>`
      + (nominal ? " <b>Point nominal : cette valeur-là est exacte.</b>"
        : " Ailleurs, un modèle reste un modèle — sur une sonde réelle l’écart peut atteindre plusieurs kilohms aux extrêmes de la plage. C’est pourquoi une valeur de contrôle se lit dans la table de la notice, jamais sur un simulateur.");
  }

  $$("[data-sonde]").forEach(bouton => bouton.addEventListener("click", () => {
    choisie = bouton.dataset.sonde;
    $$("[data-sonde]").forEach(b => { b.classList.toggle("active", b === bouton); b.setAttribute("aria-pressed", String(b === bouton)); });
    dessiner();
  }));
  curseur.addEventListener("input", dessiner);
  dessiner();
}

/* --- Le cycle : ce que reglageMarkup ne montre pas, c'est la MÉMOIRE.
   Entre les deux seuils, le relais garde son état — c'est là que
   l'hystérésis devient visible plutôt que récitée. --- */
function cycleMarkup() {
  return `<div class="panel labo-cycle">
    <div class="range-row"><span>Température mesurée</span>
      <input type="range" id="cycle-t" min="-5" max="12" step="0.5" value="8" aria-label="Température mesurée par la sonde">
      <output id="cycle-t-val">8 °C</output></div>
    <div class="range-row"><span>Consigne · arrêt du froid</span>
      <input type="range" id="cycle-sp" min="-5" max="8" step="0.5" value="4" aria-label="Point de consigne">
      <output id="cycle-sp-val">4 °C</output></div>
    <div class="range-row"><span>Différentiel · écart de relance</span>
      <input type="range" id="cycle-hys" min="0.5" max="6" step="0.5" value="2" aria-label="Différentiel">
      <output id="cycle-hys-val">2 K</output></div>
    <div class="cycle-echelle" aria-hidden="true">
      <div class="cycle-barre"><i id="cycle-zone"></i><b id="cycle-curseur"></b></div>
      <div class="cycle-bornes"><span id="cycle-borne-bas">arrêt</span><span id="cycle-borne-haut">relance</span></div>
    </div>
    <div class="cycle-etat" id="cycle-etat"><span class="cycle-pastille" id="cycle-pastille"></span><strong id="cycle-mot">—</strong></div>
    <div class="feedback" id="cycle-lecture" aria-live="polite"></div>
    <p class="note-exercice"><strong>Valeurs d’exercice.</strong> Déplacez la température lentement, de haut en bas puis de bas en haut : entre les deux seuils, le compresseur ne change pas d’avis — il garde l’état qu’il avait.</p>
  </div>`;
}

function wireCycle() {
  let enMarche = true;
  const lire = () => {
    const t = Number($("#cycle-t").value), sp = Number($("#cycle-sp").value), hys = Number($("#cycle-hys").value);
    const relance = sp + hys;
    if (t <= sp) enMarche = false;
    else if (t > relance) enMarche = true;

    $("#cycle-t-val").textContent = `${nombre(t)} °C`;
    $("#cycle-sp-val").textContent = `${nombre(sp)} °C`;
    $("#cycle-hys-val").textContent = `${nombre(hys)} K`;
    $("#cycle-borne-bas").textContent = `arrêt à ${nombre(sp)} °C`;
    $("#cycle-borne-haut").textContent = `relance au-dessus de ${nombre(relance)} °C`;

    const place = v => Math.max(0, Math.min(100, ((v + 5) / 17) * 100));
    const zone = $("#cycle-zone");
    zone.style.left = `${place(sp)}%`;
    zone.style.width = `${Math.max(0, place(relance) - place(sp))}%`;
    $("#cycle-curseur").style.left = `${place(t)}%`;

    $("#cycle-pastille").className = `cycle-pastille ${enMarche ? "on" : "off"}`;
    $("#cycle-mot").textContent = enMarche ? "COMPRESSEUR EN MARCHE" : "COMPRESSEUR À L’ARRÊT";
    $("#cycle-etat").className = `cycle-etat ${enMarche ? "on" : "off"}`;

    const boite = $("#cycle-lecture");
    const dansLaZone = t > sp && t <= relance;
    boite.className = "feedback " + (hys < 1 ? "bad" : dansLaZone ? "" : "good");
    boite.innerHTML = hys < 1
      ? "<strong>Différentiel trop serré.</strong> La machine va battre : elle démarre et s’arrête sans arrêt — courts-cycles, usure du compresseur, consommation en hausse."
      : dansLaZone
        ? `<strong>Zone de maintien.</strong> Entre ${nombre(sp)} et ${nombre(relance)} °C, rien ne se décide : le relais garde son état précédent. C’est l’<b>hystérésis</b>, et c’est elle qui laisse le cycle respirer.`
        : enMarche
          ? `<strong>Froid demandé.</strong> Au-dessus de ${nombre(relance)} °C, le régulateur relance la production.`
          : `<strong>Consigne atteinte.</strong> À ${nombre(sp)} °C, le régulateur coupe le froid.`;
  };
  ["#cycle-t", "#cycle-sp", "#cycle-hys"].forEach(id => $(id).addEventListener("input", lire));
  lire();
}

/* --- La correction d'affichage : le régulateur n'affiche pas ce que la
   sonde mesure, il affiche mesure + correction. Un décalage oublié se
   paye en température produit. --- */
function offsetMarkup() {
  return `<div class="panel labo-offset">
    <div class="range-row"><span>Ce que la sonde mesure</span>
      <input type="range" id="off-mesure" min="-2" max="10" step="0.1" value="5.4" aria-label="Température réellement mesurée">
      <output id="off-mesure-val">5,4 °C</output></div>
    <div class="range-row"><span>Correction d’affichage</span>
      <input type="range" id="off-corr" min="-5" max="5" step="0.1" value="0" aria-label="Correction appliquée à la mesure">
      <output id="off-corr-val">0,0 K</output></div>
    <div class="offset-calcul">
      <div><small>MESURE</small><strong id="off-a">—</strong></div><b>+</b>
      <div><small>CORRECTION</small><strong id="off-b">—</strong></div><b>=</b>
      <div class="offset-resultat"><small>AFFICHÉ ET RÉGULÉ</small><strong id="off-c">—</strong></div>
    </div>
    <div class="feedback" id="off-mot" aria-live="polite"></div>
    <p class="note-exercice">La correction existe pour rattraper un écart <b>constaté</b> entre l’afficheur et un thermomètre étalonné placé au bon endroit. Elle ne sert jamais à « faire descendre l’affichage » parce que le client trouve la chambre trop chaude.</p>
  </div>`;
}

function wireOffset() {
  const lire = () => {
    const m = Number($("#off-mesure").value), c = Number($("#off-corr").value);
    const total = m + c;
    $("#off-mesure-val").textContent = `${nombre(m)} °C`;
    $("#off-corr-val").textContent = `${c >= 0 ? "+" : "−"}${nombre(Math.abs(c))} K`;
    $("#off-a").textContent = `${nombre(m)} °C`;
    $("#off-b").textContent = `${c >= 0 ? "+" : "−"}${nombre(Math.abs(c))} K`;
    $("#off-c").textContent = `${nombre(total)} °C`;
    const boite = $("#off-mot");
    const fort = Math.abs(c) >= 2;
    boite.className = "feedback " + (fort ? "bad" : c === 0 ? "" : "good");
    boite.innerHTML = c === 0
      ? "<strong>Aucune correction.</strong> L’afficheur montre la mesure brute : c’est l’état normal tant qu’aucun écart n’a été constaté à l’instrument."
      : fort
        ? `<strong>Correction de ${nombre(Math.abs(c))} K : c’est beaucoup.</strong> Le régulateur régule sur ${nombre(total)} °C alors que la sonde lit ${nombre(m)} °C. Avant de corriger autant, cherchez la cause : sonde mal placée, mal serrée, dans le flux d’air de la soufflerie, ou proche d’une paroi.`
        : `<strong>Le régulateur travaille sur ${nombre(total)} °C.</strong> Tous les seuils suivent : consigne, relance et alarmes se déplacent avec la valeur corrigée, pas avec la mesure brute.`;
  };
  ["#off-mesure", "#off-corr"].forEach(id => $(id).addEventListener("input", lire));
  lire();
}

/* --- Le schéma de la chaîne : sonde → régulateur → relais → récepteur.
   Dessin, pas photo : il doit rester lisible imprimé en noir et blanc. --- */
function chaineMarkup() {
  return `<div class="panel"><div class="panel-title">De la sonde au compresseur</div>
  <div class="diagram"><svg viewBox="0 0 640 210" class="schema" role="img" aria-labelledby="ch-t ch-d">
    <title id="ch-t">La chaîne de régulation</title>
    <desc id="ch-d">La sonde mesure une résistance, le régulateur la convertit en température, la compare à la consigne, et ferme ou ouvre un contact qui commande le compresseur.</desc>
    <g class="bloc"><rect x="8" y="70" width="118" height="70" rx="10"></rect>
      <text x="67" y="98" class="titre">SONDE</text><text x="67" y="118" class="sous">une résistance</text></g>
    <path class="fil signal" d="M126 105 H188"></path><text x="157" y="95" class="etiquette">Ω</text>
    <g class="bloc fort"><rect x="188" y="46" width="164" height="118" rx="12"></rect>
      <text x="270" y="74" class="titre">RÉGULATEUR</text>
      <text x="270" y="97" class="sous">Ω → °C</text>
      <text x="270" y="118" class="sous">compare à la consigne</text>
      <text x="270" y="139" class="sous">décide, puis commande</text></g>
    <path class="fil phase" d="M352 105 H414"></path><text x="383" y="95" class="etiquette">contact</text>
    <g class="bloc"><rect x="414" y="70" width="118" height="70" rx="10"></rect>
      <text x="473" y="98" class="titre">RELAIS</text><text x="473" y="118" class="sous">il ferme, il ouvre</text></g>
    <path class="fil phase" d="M532 105 H592"></path>
    <g class="bloc"><circle cx="600" cy="105" r="26"></circle><text x="600" y="111" class="titre">M</text></g>
    <text x="600" y="152" class="sous">compresseur</text>
    <path class="fil retour" d="M270 164 V190 H600 V135"></path>
    <text x="420" y="184" class="etiquette">la température de la chambre revient à la sonde</text>
  </svg></div>
  <p class="note-exercice">Le régulateur <b>commande</b> : il ne protège pas. La protection du compresseur reste son propre organe, en amont.</p></div>`;
}
/* =====================================================================
   LES FAÇADES — trois claviers, une seule méthode
   ---------------------------------------------------------------------
   Un régulateur ne se programme pas « au hasard des touches » : cinq
   gestes reviennent toujours, dans le même ordre —
     entrer · choisir · modifier · valider · ENREGISTRER.
   Ce qui change d'un appareil à l'autre, ce sont les gestes d'accès :
   une touche menu ici, un appui maintenu là, un code d'accès ailleurs.
   Un seul moteur d'état sert les trois façades : c'est exactement ce
   que le cours veut faire comprendre.

   Les façades sont DESSINÉES (boîtier, afficheur, touches en HTML/CSS,
   donc réellement cliquables au clavier comme à la souris) : aucune
   photo de produit, aucune reproduction de notice. Les codes de
   paramètres, eux, sont des repères techniques : ils sont nommés pour
   que l'élève retrouve les siens sur l'appareil qu'il a devant lui.
   ===================================================================== */

const FACADES = {
  codes: {
    titre: "Clavier à touches nommées",
    exemple: "façon Johnson Controls MR51+",
    boitier: "large",
    entree: "Appui sur <kbd>M</kbd>",
    sortie: "Appui sur <kbd>×</kbd>",
    gestes: [],
    touches: [
      { id: "info", texte: "i", role: "Information" },
      { id: "degivrage", texte: "❄", role: "Dégivrage manuel" },
      { id: "bas", texte: "▼", role: "Valeur précédente ou diminuer" },
      { id: "haut", texte: "▲", role: "Valeur suivante ou augmenter" },
      { id: "menu", texte: "M", role: "Menu, puis valider" },
      { id: "retour", texte: "×", role: "Retour à la température" },
    ],
    params: [
      { code: "SP", label: "Point de consigne", unite: "°C", min: -30, max: 30, pas: 0.5, valeur: 4, aide: "Température à laquelle le froid s’arrête." },
      { code: "HYS", label: "Différentiel", unite: "K", min: 0.5, max: 10, pas: 0.5, valeur: 2, aide: "Écart à ajouter à la consigne pour relancer le froid." },
      { code: "oS1", label: "Correction de sonde", unite: "K", min: -5, max: 5, pas: 0.5, valeur: 0, aide: "Décalage appliqué à la mesure affichée et régulée." },
      { code: "CRT", label: "Temps mini entre deux démarrages", unite: "min", min: 0, max: 30, pas: 1, valeur: 3, aide: "Protection de marche : le compresseur ne peut pas repartir avant ce délai." },
      { code: "DFr", label: "Dégivrages par jour", unite: "/j", min: 0, max: 24, pas: 1, valeur: 4, aide: "Nombre de départs de dégivrage temporisés en 24 heures." },
      { code: "DTO", label: "Durée de dégivrage", unite: "min", min: 1, max: 120, pas: 1, valeur: 40, aide: "Durée maximale d’un dégivrage." },
    ],
  },
  trois: {
    titre: "Clavier à trois touches",
    exemple: "façon Danfoss EKC 202",
    boitier: "etroit",
    entree: "Maintien de <kbd>▲</kbd> ≈ 2 s",
    sortie: "Maintien de <kbd>▲</kbd> ≈ 2 s",
    gestes: [
      { id: "menu", label: "Maintenir ▲ · 2 s", aide: "ouvre la liste des paramètres" },
      { id: "degivrage", label: "Maintenir ▼ · 4 s", aide: "lance un dégivrage manuel" },
    ],
    touches: [
      { id: "haut", texte: "▲", role: "Paramètre suivant ou augmenter" },
      { id: "menu", texte: "SET", role: "Lire la valeur, puis enregistrer" },
      { id: "bas", texte: "▼", role: "Paramètre précédent ou diminuer" },
    ],
    params: [
      { code: "SP", label: "Point de consigne", unite: "°C", min: -30, max: 20, pas: 0.5, valeur: 4, aide: "Sur cette famille, la consigne s’atteint directement par SET." },
      { code: "r01", label: "Différentiel", unite: "K", min: 0.1, max: 20, pas: 0.1, valeur: 2, aide: "Écart de relance au-dessus de la consigne." },
      { code: "r04", label: "Correction d’affichage", unite: "K", min: -20, max: 20, pas: 0.5, valeur: 0, aide: "Décalage de la valeur lue." },
      { code: "c02", label: "Temps mini à l’arrêt", unite: "min", min: 0, max: 30, pas: 1, valeur: 0, aide: "Le compresseur reste arrêté au moins ce temps-là. Les exigences de son constructeur restent prioritaires." },
      { code: "d01", label: "Type de dégivrage", unite: "", min: 0, max: 2, pas: 1, valeur: 1, aide: "Aucun, électrique, ou gaz chaud.", traduire: v => ["0 · aucun", "1 · électrique", "2 · gaz chaud"][v] },
      { code: "d02", label: "Température de fin de dégivrage", unite: "°C", min: 0, max: 25, pas: 1, valeur: 6, aide: "Le dégivrage s’arrête quand la sonde d’évaporateur atteint cette valeur." },
      { code: "d03", label: "Intervalle entre dégivrages", unite: "h", min: 0, max: 48, pas: 1, valeur: 8, aide: "Temps entre deux départs automatiques." },
      { code: "d04", label: "Durée maximale", unite: "min", min: 0, max: 180, pas: 1, valeur: 45, aide: "Sécurité : au-delà, le dégivrage s’arrête même si la sonde n’a pas atteint sa valeur." },
      { code: "d06", label: "Temps d’égouttage", unite: "min", min: 0, max: 60, pas: 1, valeur: 0, aide: "Après la chauffe, on laisse l’eau partir avant de refaire du froid." },
      { code: "d07", label: "Retard ventilateur", unite: "min", min: 0, max: 60, pas: 1, valeur: 0, aide: "Le ventilateur attend, sinon il projette l’eau restante dans la chambre." },
      { code: "o06", label: "Type de sonde", unite: "", min: 0, max: 2, pas: 1, valeur: 0, aide: "Toutes les sondes raccordées doivent être de ce type.", traduire: v => ["0 · Pt1000", "1 · PTC1000", "2 · NTC 5 kΩ"][v] },
    ],
  },
  "code-acces": {
    titre: "Clavier derrière un code d’accès",
    exemple: "façon CAREL MasterCella MD33",
    boitier: "large",
    entree: "Maintien de <kbd>PRG</kbd> + <kbd>SET</kbd> ≈ 5 s, puis code <b>22</b>",
    sortie: "Maintien de <kbd>PRG</kbd> ≈ 5 s pour enregistrer",
    familles: [
      { id: "Pro", label: "sondes" },
      { id: "Ctl", label: "régulation" },
      { id: "dEF", label: "dégivrage" },
      { id: "FAn", label: "ventilateurs" },
    ],
    gestes: [
      { id: "acces", label: "Maintenir PRG + SET · 5 s", aide: "ouvre la demande de code" },
      { id: "enregistrer", label: "Maintenir PRG · 5 s", aide: "enregistre dans l’appareil" },
    ],
    touches: [
      { id: "veille", texte: "⏻", role: "Marche ou veille" },
      { id: "lumiere", texte: "☼", role: "Lumière" },
      { id: "menu", texte: "SET", role: "Entrer, puis valider" },
      { id: "aux", texte: "AUX", role: "Sortie auxiliaire" },
      { id: "haccp", texte: "HACCP", role: "Mémoire HACCP" },
      { id: "retour", texte: "PRG", role: "Retour ou enregistrement" },
      { id: "haut", texte: "▲", role: "Suivant ou augmenter" },
      { id: "bas", texte: "▼", role: "Précédent ou diminuer" },
    ],
    params: [
      { code: "/P", famille: "Pro", label: "Type de sonde", unite: "", min: 0, max: 2, pas: 1, valeur: 2, aide: "Une seule famille pour tout l’appareil.", traduire: v => ["0 · NTC classique", "1 · NTC haute température", "2 · PTC"][v] },
      { code: "/A2", famille: "Pro", label: "Rôle de la sonde 2", unite: "", min: 0, max: 4, pas: 1, valeur: 0, aide: "À quoi sert la deuxième sonde.", traduire: v => ["0 · absente", "1 · produit", "2 · dégivrage", "3 · condensation", "4 · antigel"][v] },
      { code: "St", famille: "Ctl", label: "Consigne", unite: "°C", min: -20, max: 20, pas: 1, valeur: 4, aide: "Température visée." },
      { code: "rd", famille: "Ctl", label: "Différentiel", unite: "K", min: 1, max: 10, pas: 1, valeur: 2, aide: "Écart de relance." },
      { code: "d0", famille: "dEF", label: "Type de dégivrage", unite: "", min: 0, max: 4, pas: 1, valeur: 1, aide: "Résistance ou gaz chaud, fin sur température ou sur durée.", traduire: v => ["0 · résistance, fin sur température", "1 · gaz chaud, fin sur température", "2 · résistance, fin sur durée", "3 · gaz chaud, fin sur durée", "4 · résistance, fin sur température"][v] },
      { code: "dI", famille: "dEF", label: "Intervalle", unite: "h", min: 0, max: 24, pas: 1, valeur: 8, aide: "Temps entre deux dégivrages." },
      { code: "F3", famille: "FAn", label: "Ventilateur pendant le dégivrage", unite: "", min: 0, max: 1, pas: 1, valeur: 0, aide: "Le laisser tourner pendant la chauffe envoie de l’air chaud dans la chambre.", traduire: v => ["0 · arrêté", "1 · en marche"][v] },
    ],
  },
};

function facadeMarkup(type, mission) {
  const f = FACADES[type];
  const grille = type === "trois" ? "trois" : type === "code-acces" ? "huit" : "sept";
  return `<div class="panel facade-panel" data-facade="${type}">
    <div class="facade-tete">
      <div><strong>${esc(f.titre)}</strong><small>${esc(f.exemple)}</small></div>
      <div class="facade-mode" id="fa-mode">AFFICHAGE</div>
    </div>
    <div class="facade-corps">
      <div class="facade-boitier ${f.boitier}">
        <div class="facade-ecran"><output id="fa-ecran" aria-live="polite">4.6</output><span id="fa-unite">°C</span></div>
        <div class="facade-leds" aria-hidden="true"><i class="on"></i><i></i><i></i></div>
        <div class="facade-clavier ${grille}">
          ${f.touches.map(t => `<button type="button" class="facade-touche" data-touche="${t.id}" aria-label="${esc(t.role)}" title="${esc(t.role)}">${esc(t.texte)}</button>`).join("")}
        </div>
      </div>
      <div class="facade-cote">
        ${f.gestes.length ? `<div class="facade-gestes">${f.gestes.map(g => `<button type="button" class="secondary-button" data-geste="${g.id}">${esc(g.label)}<small>${esc(g.aide)}</small></button>`).join("")}</div>` : ""}
        <div class="facade-aide" id="fa-aide" aria-live="polite"></div>
        ${mission ? `<ol class="facade-cibles" id="fa-cibles">${mission.cibles.map(c => `<li data-cible="${c.code}"><b>${esc(c.code)}</b><span>${esc(c.label)}</span><strong>${esc(c.affiche)}</strong></li>`).join("")}</ol>` : ""}
      </div>
    </div>
    <div class="facade-memoire" id="fa-memoire" aria-label="Valeurs actuellement dans l’appareil"></div>
    ${mission ? `<div class="facade-actions"><button type="button" class="secondary-button" data-facade-reset>Recommencer</button><button type="button" class="primary-button" data-facade-valide>Contrôler la programmation</button></div>
    <div class="feedback" id="fa-bilan" aria-live="polite">Programmez les ${mission.cibles.length} valeurs demandées, puis contrôlez.</div>` : ""}
    <p class="note-exercice"><strong>Entrer :</strong> ${f.entree}. <strong>Sortir :</strong> ${f.sortie}. Les codes affichés sont ceux que porte ce genre d’appareil — sur le vôtre, la notice donne la liste exacte.</p>
  </div>`;
}

function wireFacade(type, mission) {
  const f = FACADES[type];
  const aCode = type === "code-acces";
  const params = f.params.map(p => ({ ...p }));
  const depart = params.map(p => p.valeur);
  let mode = "affichage";      /* affichage · code · famille · menu · edition */
  let iFamille = 0, iParam = 0, brouillon = 0, code = 0, enregistre = false;

  const visibles = () => aCode ? params.filter(p => p.famille === f.familles[iFamille].id) : params;
  const courant = () => visibles()[Math.min(iParam, visibles().length - 1)];

  function decale(sens) {
    if (mode === "code") { code = Math.max(0, Math.min(99, code + sens)); return; }
    if (mode === "famille") { iFamille = (iFamille + sens + f.familles.length) % f.familles.length; iParam = 0; return; }
    if (mode === "menu") { const n = visibles().length; iParam = (iParam + sens + n) % n; return; }
    if (mode === "edition") {
      const p = courant();
      const v = Math.max(p.min, Math.min(p.max, brouillon + sens * p.pas));
      brouillon = Number(v.toFixed(2));
    }
  }

  function valider() {
    if (mode === "affichage") { mode = aCode ? "affichage" : "menu"; iParam = 0; return; }
    if (mode === "code") { if (code === 22) { mode = "famille"; iFamille = 0; iParam = 0; } return; }
    if (mode === "famille") { mode = "menu"; iParam = 0; return; }
    if (mode === "menu") { brouillon = courant().valeur; mode = "edition"; return; }
    if (mode === "edition") {
      courant().valeur = brouillon;
      if (!aCode) enregistre = true;   /* ces appareils écrivent à la validation */
      mode = "menu";
    }
  }

  function sortir() {
    if (mode === "edition") mode = "menu";
    else if (mode === "menu") mode = aCode ? "famille" : "affichage";
    else mode = "affichage";
  }

  function ecran() {
    if (mode === "affichage") return { valeur: enregistre || !aCode ? "4.6" : "4.6", unite: "°C" };
    if (mode === "code") return { valeur: String(code).padStart(2, "0"), unite: "" };
    if (mode === "famille") return { valeur: f.familles[iFamille].id, unite: "" };
    if (mode === "menu") return { valeur: courant().code, unite: "" };
    const p = courant();
    return { valeur: p.traduire ? String(brouillon) : nombre(brouillon), unite: p.unite };
  }

  function motDeMode() {
    return { affichage: "AFFICHAGE", code: "CODE D’ACCÈS", famille: "FAMILLE", menu: "CHOIX DU CODE", edition: "MODIFICATION" }[mode];
  }

  function dessiner() {
    const e = ecran();
    $("#fa-ecran").textContent = e.valeur;
    $("#fa-unite").textContent = e.unite;
    $("#fa-mode").textContent = motDeMode();

    const p = courant();
    const aide = $("#fa-aide");
    if (mode === "affichage") aide.innerHTML = aCode
      ? "L’appareil affiche la température. Les paramètres sont derrière le code d’accès : c’est voulu, tout le monde ne doit pas pouvoir les changer."
      : `L’appareil affiche la température. ${f.entree} pour ouvrir la liste des paramètres.`;
    else if (mode === "code") aide.innerHTML = code === 22
      ? "Code <b>22</b> affiché : validez pour entrer."
      : `Code affiché : <b>${String(code).padStart(2, "0")}</b>. Montez jusqu’à <b>22</b>, puis validez.`;
    else if (mode === "famille") aide.innerHTML = `Famille <b>${esc(f.familles[iFamille].id)}</b> — ${esc(f.familles[iFamille].label)}. Validez pour ouvrir ses paramètres.`;
    else aide.innerHTML = `<b>${esc(p.code)}</b> · ${esc(p.label)}<br><span>${esc(p.aide)}</span>`
      + (mode === "edition" && p.traduire ? `<br><b>${esc(p.traduire(Math.round(brouillon)))}</b>` : "");

    $("#fa-memoire").innerHTML = params.map(p =>
      `<div${courant() === p && mode !== "affichage" ? ' class="actif"' : ""}><b>${esc(p.code)}</b><span>${p.traduire ? Math.round(p.valeur) : nombre(p.valeur)}</span><small>${esc(p.unite)}</small></div>`).join("");

    if (mission) {
      $$("[data-cible]").forEach(li => {
        const p = params.find(x => x.code === li.dataset.cible);
        const attendu = mission.cibles.find(c => c.code === li.dataset.cible).valeur;
        li.classList.toggle("atteinte", p && Math.abs(p.valeur - attendu) < 1e-6);
      });
    }
  }

  $$("[data-touche]").forEach(bouton => bouton.addEventListener("click", () => {
    const id = bouton.dataset.touche;
    if (id === "haut") decale(1);
    else if (id === "bas") decale(-1);
    else if (id === "menu") valider();
    else if (id === "retour") sortir();
    else if (id === "degivrage") {
      $("#fa-aide").innerHTML = "Un appui bref ne lance rien : sur cet appareil, le dégivrage manuel demande un <b>appui maintenu</b>. C’est une protection contre la fausse manœuvre.";
      return;
    } else {
      $("#fa-aide").innerHTML = "Cette touche existe sur l’appareil, mais elle ne sert pas à la programmation. On ne l’utilise pas ici.";
      return;
    }
    dessiner();
  }));

  $$("[data-geste]").forEach(bouton => bouton.addEventListener("click", () => {
    const id = bouton.dataset.geste;
    if (id === "menu") { mode = "menu"; iParam = 0; }
    else if (id === "acces") { mode = "code"; code = 0; }
    else if (id === "enregistrer") { enregistre = true; mode = "affichage"; $("#fa-aide").innerHTML = "<b>Enregistré.</b> Les valeurs sont maintenant écrites dans l’appareil — c’est ce geste-là qu’on oublie."; dessiner(); return; }
    else if (id === "degivrage") { $("#fa-aide").innerHTML = "Dégivrage manuel lancé. Il s’arrêtera comme un dégivrage normal : sur la sonde, ou au bout de la durée maximale."; return; }
    dessiner();
  }));

  const boutonValide = document.querySelector("[data-facade-valide]");
  if (boutonValide) boutonValide.addEventListener("click", () => {
    const justes = mission.cibles.filter(c => {
      const p = params.find(x => x.code === c.code);
      return p && Math.abs(p.valeur - c.valeur) < 1e-6;
    }).length;
    const total = mission.cibles.length;
    const bilan = $("#fa-bilan");
    const complet = justes === total && (!aCode || enregistre);
    bilan.className = "feedback " + (complet ? "good" : "bad");
    bilan.innerHTML = `<strong>${justes}/${total} valeurs justes.</strong> `
      + (justes < total ? "Reprenez les lignes qui ne sont pas encore cochées : chaque valeur se retrouve par son code."
        : aCode && !enregistre ? "Toutes les valeurs sont bonnes… mais rien n’est enregistré. Sur cet appareil, il faut encore <b>maintenir PRG 5 s</b> — sinon tout repart à l’ancienne valeur à la prochaine coupure."
          : "Programmation complète et enregistrée.");
    dessiner();
  });

  const boutonReset = document.querySelector("[data-facade-reset]");
  if (boutonReset) boutonReset.addEventListener("click", () => {
    params.forEach((p, i) => { p.valeur = depart[i]; });
    mode = "affichage"; iFamille = 0; iParam = 0; code = 0; enregistre = false;
    $("#fa-bilan").className = "feedback";
    $("#fa-bilan").textContent = `Programmez les ${mission.cibles.length} valeurs demandées, puis contrôlez.`;
    dessiner();
  });

  dessiner();
}

/* --- Les cinq gestes, dessinés : ce qui ne change jamais d'un appareil à l'autre --- */
function methodeMarkup() {
  const etapes = [
    { n: "1", mot: "Entrer", detail: "touche menu, appui maintenu ou code d’accès" },
    { n: "2", mot: "Choisir", detail: "on circule dans les codes" },
    { n: "3", mot: "Modifier", detail: "on change la valeur, pas encore l’appareil" },
    { n: "4", mot: "Valider", detail: "la valeur est prise" },
    { n: "5", mot: "Enregistrer", detail: "elle survit à la coupure" },
  ];
  return `<div class="panel"><div class="panel-title">Cinq gestes, toujours les mêmes</div>
    <div class="sequence">${etapes.map((e, i) => `${i ? '<span class="sequence-arrow" aria-hidden="true">→</span>' : ""}<div class="sequence-step"><strong>${e.n}. ${esc(e.mot)}</strong><small>${esc(e.detail)}</small></div>`).join("")}</div>
    <p class="note-exercice">Le cinquième geste n’existe pas partout : certains appareils écrivent dès la validation, d’autres attendent un enregistrement explicite. C’est pour ça qu’on relit toujours ses valeurs <b>après</b> avoir quitté le menu.</p></div>`;
}

/* =====================================================================
   LE DÉGIVRAGE — cinq temps, pas un seul
   ---------------------------------------------------------------------
   L'erreur courante est de réduire le dégivrage à « une durée ». Un
   cycle complet a cinq temps, et deux d'entre eux ne chauffent rien :
   l'égouttage et le retard ventilateur. Ce sont eux qu'on saute, et
   c'est de là que vient l'eau projetée dans la chambre, puis le bloc
   de glace au pied de l'évaporateur.
   ===================================================================== */

const TEMPS_DEGIVRAGE = [
  { id: "froid", nom: "Froid", froid: true, chauffe: false, ventilo: true,
    quoi: "Marche normale. Le givre s’installe petit à petit sur l’évaporateur : c’est de l’eau de l’air qui gèle sur la batterie." },
  { id: "chauffe", nom: "Dégivrage", froid: false, chauffe: true, ventilo: false,
    quoi: "Le froid s’arrête, le ventilateur aussi, la résistance chauffe. Souffler pendant la chauffe enverrait de l’air chaud dans la chambre." },
  { id: "egouttage", nom: "Égouttage", froid: false, chauffe: false, ventilo: false,
    quoi: "Tout est arrêté. L’eau fondue quitte la batterie et part au bac. Sans ce temps mort, elle regèle au premier retour du froid." },
  { id: "retard", nom: "Retard ventilateur", froid: true, chauffe: false, ventilo: false,
    quoi: "Le froid peut reprendre, mais le ventilateur attend encore. Sinon il projette dans la chambre l’eau restée sur les ailettes." },
  { id: "reprise", nom: "Reprise", froid: true, chauffe: false, ventilo: true,
    quoi: "Le ventilateur repart. Le cycle normal reprend, batterie propre." },
];

function degivrageMarkup() {
  return `<div class="panel labo-degivrage">
    <div class="degivrage-frise" role="group" aria-label="Les cinq temps du dégivrage">
      ${TEMPS_DEGIVRAGE.map((t, i) => `<button type="button" class="degivrage-temps${i === 0 ? " actif" : ""}" data-temps="${i}"><b>${i + 1}</b><span>${esc(t.nom)}</span></button>`).join("")}
    </div>
    <div class="degivrage-scene">
      <svg viewBox="0 0 320 170" class="schema evaporateur" role="img" aria-labelledby="ev-t ev-d">
        <title id="ev-t">L’évaporateur pendant le cycle</title><desc id="ev-d" >Il se couvre de givre, puis chauffe, puis s’égoutte.</desc>
        <rect x="30" y="34" width="230" height="86" rx="8" class="batterie"></rect>
        <g class="ailettes">${Array.from({ length: 11 }, (_, i) => `<line x1="${44 + i * 20}" y1="40" x2="${44 + i * 20}" y2="114"></line>`).join("")}</g>
        <rect id="ev-givre" x="30" y="34" width="230" height="86" rx="8" class="givre"></rect>
        <g id="ev-resistance" class="resistance"><path d="M36 128 h218"></path></g>
        <g id="ev-ventilo" class="ventilo"><circle cx="284" cy="77" r="24"></circle><path d="M284 55 v44 M262 77 h44"></path></g>
        <g id="ev-gouttes" class="gouttes"><circle cx="90" cy="136" r="4"></circle><circle cx="150" cy="142" r="4"></circle><circle cx="210" cy="136" r="4"></circle></g>
        <text x="145" y="163" class="sous" id="ev-mot">marche normale</text>
      </svg>
      <div class="degivrage-sorties" aria-label="État des sorties">
        <div id="so-froid"><b>FROID</b><span>—</span></div>
        <div id="so-chauffe"><b>RÉSISTANCE</b><span>—</span></div>
        <div id="so-ventilo"><b>VENTILATEUR</b><span>—</span></div>
      </div>
    </div>
    <div class="degivrage-reglages">
      <div class="range-row"><span>Fin sur sonde d’évaporateur</span><input type="range" id="dg-fin" min="0" max="20" step="1" value="8" aria-label="Température de fin de dégivrage"><output id="dg-fin-val">8 °C</output></div>
      <div class="range-row"><span>Durée maximale de sécurité</span><input type="range" id="dg-max" min="10" max="90" step="5" value="45" aria-label="Durée maximale du dégivrage"><output id="dg-max-val">45 min</output></div>
      <div class="range-row"><span>Égouttage</span><input type="range" id="dg-egout" min="0" max="15" step="1" value="3" aria-label="Temps d’égouttage"><output id="dg-egout-val">3 min</output></div>
      <div class="range-row"><span>Retard ventilateur</span><input type="range" id="dg-retard" min="0" max="15" step="1" value="2" aria-label="Retard du ventilateur"><output id="dg-retard-val">2 min</output></div>
    </div>
    <div class="feedback" id="dg-mot" aria-live="polite"></div>
    <p class="note-exercice"><strong>Valeurs d’exercice.</strong> Les vraies dépendent de la chambre, du produit et de l’évaporateur — et un dégivrage qui se termine toujours sur sa durée maximale, jamais sur sa sonde, est un dégivrage à revoir.</p>
  </div>`;
}

function wireDegivrage() {
  let i = 0;
  const lire = () => {
    const t = TEMPS_DEGIVRAGE[i];
    const fin = Number($("#dg-fin").value), max = Number($("#dg-max").value);
    const egout = Number($("#dg-egout").value), retard = Number($("#dg-retard").value);
    $("#dg-fin-val").textContent = `${fin} °C`;
    $("#dg-max-val").textContent = `${max} min`;
    $("#dg-egout-val").textContent = `${egout} min`;
    $("#dg-retard-val").textContent = `${retard} min`;

    $$("[data-temps]").forEach((b, n) => b.classList.toggle("actif", n === i));
    $("#ev-givre").style.opacity = t.id === "froid" ? .85 : t.id === "chauffe" ? .3 : 0;
    $("#ev-resistance").classList.toggle("chauffe", t.chauffe);
    $("#ev-ventilo").classList.toggle("tourne", t.ventilo);
    $("#ev-gouttes").style.opacity = t.id === "chauffe" || t.id === "egouttage" ? 1 : 0;
    $("#ev-mot").textContent = t.nom.toLowerCase();
    $("#ev-d").textContent = t.quoi;

    const etat = (id, actif, mot) => {
      const boite = $(id); boite.className = actif ? "on" : "";
      boite.querySelector("span").textContent = mot;
    };
    etat("#so-froid", t.froid, t.froid ? "demandé" : "coupé");
    etat("#so-chauffe", t.chauffe, t.chauffe ? "alimentée" : "hors tension");
    etat("#so-ventilo", t.ventilo, t.ventilo ? "en marche" : "arrêté");

    const boite = $("#dg-mot");
    boite.className = "feedback " + (t.id === "egouttage" && egout === 0 ? "bad" : t.id === "retard" && retard === 0 ? "bad" : "good");
    boite.innerHTML = `<strong>${esc(t.nom)}.</strong> ${esc(t.quoi)}`
      + (t.id === "chauffe" ? ` <b>Il s’arrêtera quand la sonde atteindra ${fin} °C — ou au plus tard après ${max} min.</b>` : "")
      + (t.id === "egouttage" && egout === 0 ? " <b>Égouttage à zéro : l’eau n’a pas le temps de partir, elle regèle sur la batterie.</b>" : "")
      + (t.id === "retard" && retard === 0 ? " <b>Retard à zéro : le ventilateur repart mouillé et arrose la chambre.</b>" : "");
  };
  $$("[data-temps]").forEach((b, n) => b.addEventListener("click", () => { i = n; lire(); }));
  ["#dg-fin", "#dg-max", "#dg-egout", "#dg-retard"].forEach(id => $(id).addEventListener("input", lire));
  lire();
}

/* =====================================================================
   LE BORNIER — un atelier de câblage, hors tension par construction
   ---------------------------------------------------------------------
   Bornier générique, dessiné pour le cours : la NUMÉROTATION change d'un
   appareil à l'autre, la LOGIQUE non — une alimentation, des relais qui
   ont chacun un commun et une sortie, des entrées de mesure.
   Deux règles y sont tenues dur comme fer, comme dans le simulateur
   d'origine : on part d'un départ déjà protégé (Q1), et l'inversion
   phase/neutre est refusée AVEC son explication.
   ===================================================================== */

const BORNES = [
  { id: "b1", n: "1", role: "Alimentation du régulateur · phase" },
  { id: "b2", n: "2", role: "Alimentation du régulateur · neutre" },
  { id: "b3", n: "3", role: "Relais froid · commun" },
  { id: "b4", n: "4", role: "Relais froid · sortie vers le compresseur" },
  { id: "b5", n: "5", role: "Relais dégivrage · commun" },
  { id: "b6", n: "6", role: "Relais dégivrage · sortie vers la résistance" },
  { id: "b9", n: "9", role: "Sonde d’ambiance · fil 1" },
  { id: "b10", n: "10", role: "Sonde d’ambiance · fil 2" },
];

const ORGANES = [
  { id: "q1-l", n: "L", role: "Départ protégé Q1 · phase", groupe: "q1" },
  { id: "q1-n", n: "N", role: "Départ protégé Q1 · neutre", groupe: "q1" },
  { id: "co-l", n: "L", role: "Compresseur · arrivée", groupe: "compresseur" },
  { id: "co-n", n: "N", role: "Compresseur · retour neutre", groupe: "compresseur" },
  { id: "re-l", n: "L", role: "Résistance de dégivrage · arrivée", groupe: "resistance" },
  { id: "re-n", n: "N", role: "Résistance de dégivrage · retour neutre", groupe: "resistance" },
  { id: "so-a", n: "1", role: "Sonde d’ambiance · un fil", groupe: "sonde" },
  { id: "so-b", n: "2", role: "Sonde d’ambiance · l’autre fil", groupe: "sonde" },
];

const LIAISONS_ATTENDUES = [
  ["b1", "q1-l"], ["b2", "q1-n"],
  ["b3", "q1-l"], ["b4", "co-l"], ["co-n", "q1-n"],
  ["b5", "q1-l"], ["b6", "re-l"], ["re-n", "q1-n"],
];

function cle(a, b) { return [a, b].sort().join("~"); }

function bornierMarkup() {
  return `<div class="panel labo-bornier">
    <div class="bornier-consigne"><div><strong id="bo-titre">Cliquez deux points pour poser un fil</strong><small>Recliquez le même fil pour l’enlever.</small></div><span id="bo-compte">0 / 8 fils</span></div>
    <div class="bornier-cadre"><div class="bornier-plan" id="bo-plan">
      <svg class="bornier-fils" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true"><g id="bo-traces"></g></svg>
      <div class="bornier-appareil"><span>RÉGULATEUR</span><small>bornier — la numérotation change selon l’appareil</small></div>
      ${BORNES.map((b, i) => `<button type="button" class="bornier-point borne" data-point="${b.id}" style="--x:${8 + i * 12}%;--y:31%" aria-label="Borne ${b.n} — ${esc(b.role)}"><span>${b.n}</span></button>`).join("")}
      <div class="bornier-organes">
        <div class="bornier-organe" data-groupe="q1"><b>Q1</b><small>départ protégé</small></div>
        <div class="bornier-organe" data-groupe="compresseur"><b>M</b><small>compresseur</small></div>
        <div class="bornier-organe" data-groupe="resistance"><b>R</b><small>résistance</small></div>
        <div class="bornier-organe" data-groupe="sonde"><b>S1</b><small>sonde d’ambiance</small></div>
      </div>
      ${ORGANES.map((o, i) => `<button type="button" class="bornier-point organe" data-point="${o.id}" style="--x:${9 + i * 11.6}%;--y:82%" aria-label="${esc(o.role)}"><span>${o.n}</span></button>`).join("")}
    </div></div>
    <ul class="sr-only" id="bo-liste" aria-label="Fils actuellement posés"></ul>
    <div class="bornier-actions">
      <button type="button" class="secondary-button" data-bo="annuler">Retirer le dernier fil</button>
      <button type="button" class="secondary-button" data-bo="vider">Tout effacer</button>
      <button type="button" class="primary-button" data-bo="valider">Contrôler le câblage</button>
    </div>
    <div class="feedback" id="bo-bilan" aria-live="polite">La sonde n’est pas dans cet exercice : elle a son propre écran, juste après.</div>
    <p class="note-exercice"><strong>Simulation hors tension.</strong> Sur le matériel : coupure, <b>consignation</b>, vérification d’absence de tension avant d’ouvrir. Le régulateur commande — il ne protège pas : le compresseur garde sa propre protection.</p>
  </div>`;
}

function wireBornier() {
  const points = [...BORNES.map(b => ({ ...b, type: "borne" })), ...ORGANES.map(o => ({ ...o, type: "organe" }))];
  const parId = new Map(points.map(p => [p.id, p]));
  const position = new Map();
  let fils = [];
  let depart = null;

  function mesurer() {
    const plan = $("#bo-plan").getBoundingClientRect();
    $$("[data-point]").forEach(bouton => {
      const r = bouton.getBoundingClientRect();
      position.set(bouton.dataset.point, {
        x: ((r.left + r.width / 2 - plan.left) / plan.width) * 1000,
        y: ((r.top + r.height / 2 - plan.top) / plan.height) * 400,
      });
    });
  }

  function tracer() {
    mesurer();
    $("#bo-traces").innerHTML = fils.map((f, i) => {
      const a = position.get(f[0]), b = position.get(f[1]);
      if (!a || !b) return "";
      const milieu = 176 + (i % 5) * 13;
      const nature = f.some(x => x.startsWith("so") || x === "b9" || x === "b10") ? "signal"
        : f.includes("q1-n") ? "neutre" : "phase";
      return `<path class="trace ${nature}" d="M ${a.x.toFixed(0)} ${a.y.toFixed(0)} C ${a.x.toFixed(0)} ${milieu}, ${b.x.toFixed(0)} ${milieu}, ${b.x.toFixed(0)} ${b.y.toFixed(0)}"></path>`;
    }).join("");
    $("#bo-compte").textContent = `${fils.length} / ${LIAISONS_ATTENDUES.length} fils`;
    $$("[data-point]").forEach(bouton => {
      const id = bouton.dataset.point;
      bouton.classList.toggle("relie", fils.some(f => f.includes(id)));
      bouton.classList.toggle("choisi", depart === id);
    });
    $("#bo-liste").innerHTML = fils.map(f => `<li>${esc(parId.get(f[0]).role)} relié à ${esc(parId.get(f[1]).role)}</li>`).join("");
    $("#bo-titre").textContent = depart
      ? `Départ choisi : ${parId.get(depart).role}`
      : "Cliquez deux points pour poser un fil";
  }

  function poser(id) {
    if (!depart) { depart = id; tracer(); return; }
    if (depart === id) { depart = null; tracer(); return; }
    const k = cle(depart, id);
    const dejaLa = fils.findIndex(f => cle(f[0], f[1]) === k);
    if (dejaLa >= 0) fils.splice(dejaLa, 1); else fils.push([depart, id]);
    depart = null;
    $("#bo-bilan").className = "feedback";
    tracer();
  }

  function controler() {
    const posees = new Set(fils.map(f => cle(f[0], f[1])));
    const attendues = LIAISONS_ATTENDUES.map(([a, b]) => cle(a, b));
    const justes = attendues.filter(k => posees.has(k)).length;
    const enTrop = fils.length - justes;

    /* L'inversion se cherche AVANT de compter : elle mérite son explication,
       pas un simple « 6/8 ». */
    const inverse = posees.has(cle("b1", "q1-n")) && posees.has(cle("b2", "q1-l"));
    const bilan = $("#bo-bilan");

    if (inverse) {
      bilan.className = "feedback bad";
      bilan.innerHTML = "<strong>Phase et neutre inversés sur l’alimentation.</strong> L’appareil fonctionnerait — et c’est bien le problème : plus rien ne serait repérable. Le <b>commun des relais</b> (borne 3, borne 5) doit recevoir la <b>phase</b>, la même que la borne 1. Un dépanneur qui suit votre schéma chercherait la phase du mauvais côté, sur une machine qu’il croit consignée. Remettez la phase en 1 et le neutre en 2.";
      return;
    }
    const complet = justes === attendues.length && enTrop === 0;
    bilan.className = "feedback " + (complet ? "good" : "bad");
    bilan.innerHTML = complet
      ? "<strong>Câblage conforme.</strong> Alimentation repérée, chaque relais reçoit la phase sur son commun et ressort vers son récepteur, chaque récepteur retrouve le neutre. Le régulateur commande, la protection reste ailleurs."
      : `<strong>${justes}/${attendues.length} liaisons justes${enTrop ? `, et ${enTrop} fil${enTrop > 1 ? "s" : ""} en trop` : ""}.</strong> Reprenez relais par relais : un <b>commun</b> alimenté par la phase, une <b>sortie</b> vers le récepteur, et le retour du récepteur au <b>neutre</b>.`;
  }

  $$("[data-point]").forEach(bouton => bouton.addEventListener("click", () => poser(bouton.dataset.point)));
  document.querySelector('[data-bo="annuler"]').addEventListener("click", () => { fils.pop(); depart = null; tracer(); });
  document.querySelector('[data-bo="vider"]').addEventListener("click", () => { fils = []; depart = null; $("#bo-bilan").className = "feedback"; tracer(); });
  document.querySelector('[data-bo="valider"]').addEventListener("click", controler);
  addEventListener("resize", tracer);
  tracer();
}

/* --- Le remplacement : par fonction, jamais par numéro --- */
const REMPLACEMENT = [
  { role: "Alimentation du régulateur", ancien: "bornes 4 et 5", bonne: "1-2", choix: [["4-5", "4 et 5, comme avant"], ["1-2", "1 et 2"], ["9-10", "9 et 10"]] },
  { role: "Commun du relais froid", ancien: "borne 2", bonne: "3", choix: [["2", "2"], ["3", "3"], ["6", "6"]] },
  { role: "Sortie vers le compresseur", ancien: "borne 3", bonne: "4", choix: [["3", "3"], ["4", "4"], ["8", "8"]] },
  { role: "Sonde d’ambiance", ancien: "bornes 10 et 11", bonne: "9-10", choix: [["10-11", "10 et 11, comme avant"], ["9-10", "9 et 10"], ["5-6", "5 et 6"]] },
  { role: "Type de sonde dans les paramètres", ancien: "NTC 10 kΩ", bonne: "verifier", choix: [["copier", "on garde le réglage d’usine"], ["verifier", "on déclare la sonde réellement posée"]] },
  { role: "Calibre des relais", ancien: "inconnu", bonne: "verifier", choix: [["copier", "si ça rentre, ça passe"], ["verifier", "on compare au courant du récepteur"]] },
];

function remplacementMarkup() {
  return `<div class="panel labo-remplacement">
    <div class="remplacement-tete"><strong>L’ancien régulateur est déposé.</strong><small>Ses fils sont repérés par FONCTION, pas par numéro.</small></div>
    <div class="remplacement-grille">
      ${REMPLACEMENT.map((f, i) => `<label data-champ="${i}"><span><b>${esc(f.role)}</b><small>avant : ${esc(f.ancien)}</small></span>
        <select aria-label="Nouvelle affectation pour ${esc(f.role)}"><option value="">Choisir</option>${f.choix.map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join("")}</select>
        <em></em></label>`).join("")}
    </div>
    <div class="facade-actions"><button type="button" class="secondary-button" data-rp="reset">Recommencer</button><button type="button" class="primary-button" data-rp="valider">Contrôler le plan</button></div>
    <div class="feedback" id="rp-bilan" aria-live="polite">Six décisions. Aucune ne se prend en recopiant l’ancien numéro.</div>
  </div>`;
}

function wireRemplacement() {
  const champs = $$("[data-champ]");
  document.querySelector('[data-rp="valider"]').addEventListener("click", () => {
    let justes = 0;
    champs.forEach((label, i) => {
      const bonne = REMPLACEMENT[i].bonne;
      const valeur = label.querySelector("select").value;
      const ok = valeur === bonne;
      if (ok) justes++;
      label.className = valeur ? (ok ? "juste" : "faux") : "";
      label.querySelector("em").textContent = valeur ? (ok ? "correct" : "à revoir") : "";
    });
    const bilan = $("#rp-bilan");
    bilan.className = "feedback " + (justes === REMPLACEMENT.length ? "good" : "bad");
    bilan.innerHTML = justes === REMPLACEMENT.length
      ? "<strong>Plan de conversion correct.</strong> Chaque fil a retrouvé sa fonction sur le nouveau bornier, la sonde est déclarée pour ce qu’elle est, et les calibres ont été vérifiés avant remise sous tension."
      : `<strong>${justes}/${REMPLACEMENT.length}.</strong> Le piège est toujours le même : recopier un numéro de borne. Deux appareils différents ne numérotent pas pareil — on relève la <b>fonction</b> de chaque fil, puis on cherche cette fonction sur le nouveau.`;
  });
  document.querySelector('[data-rp="reset"]').addEventListener("click", () => {
    champs.forEach(label => { label.querySelector("select").value = ""; label.className = ""; label.querySelector("em").textContent = ""; });
    $("#rp-bilan").className = "feedback";
    $("#rp-bilan").textContent = "Six décisions. Aucune ne se prend en recopiant l’ancien numéro.";
  });
}

const screens = [

  /* ======================= COMPRENDRE ======================= */

  screen({
    id: "chaine",
    narration: "Commençons par une phrase qui va vous éviter beaucoup de confusion : un régulateur électronique ne fait pas de froid. Il fait quatre choses, toujours dans le même ordre. Il lit une résistance. Il la convertit en température. Il compare cette température à une consigne. Et il ferme ou ouvre un contact. C'est tout. Le froid, ce sont le compresseur et le circuit qui le produisent. Le régulateur ne fait que décider du moment. Gardez cette distinction : elle vous dira toujours si le défaut vient de la commande ou de la machine.", dossier: "comprendre", title: "Ce que fait vraiment un régulateur", kicker: "Comprendre · 1",
    codes: ["9.04"], level: "comprendre",
    text: "Un régulateur électronique ne « fait pas du froid ». Il fait quatre choses, toujours dans le même ordre : il <b>lit</b> une résistance au bout de deux fils, il la <b>convertit</b> en température, il la <b>compare</b> à la consigne, et il <b>ferme ou ouvre un contact</b>. Tout le reste — compresseur, ventilateur, résistance de dégivrage — obéit à ce contact.",
    prompt: "Suivez la chaîne, puis retenez où s’arrête le rôle du régulateur.",
    speak: "Un régulateur électronique lit une résistance, la convertit en température, la compare à la consigne, puis ferme ou ouvre un contact. Il commande, il ne protège pas.",
    render: () => chaineMarkup(), wire: () => {},
  }),

  screen({
    id: "commande-pas-protege",
    narration: "Voici la confusion la plus coûteuse de l'atelier : commander n'est pas protéger. Le régulateur décide de la marche normale — il arrête le froid à la consigne, il le relance au différentiel, il déclenche les dégivrages. Il travaille tous les jours, c'est son métier. Une sécurité, elle, n'agit qu'en dernier recours, quand tout le reste a échoué. Quand un régulateur est en défaut, l'installation s'arrête ou dérive ; quand une sécurité déclenche, c'est qu'un danger existe. On ne les règle pas de la même façon, et on ne les traite pas de la même façon.", dossier: "comprendre", title: "Il commande, il ne protège pas", kicker: "Comprendre · 2",
    codes: ["6.03"], level: "comprendre",
    text: "C’est la confusion la plus coûteuse de l’atelier. Le régulateur décide de la marche <b>normale</b> : il arrête le froid à la consigne, il le relance plus haut. La <b>protection</b> — thermique du moteur, pressostat de sécurité, disjoncteur — est un autre organe, sur un autre chemin. Un régulateur en panne ne doit jamais pouvoir détruire une machine.",
    prompt: "Le compresseur chauffe anormalement. Qui doit l’arrêter ?",
    render: () => choiceMarkup([
      { title: "Sa protection propre", note: "thermique moteur, pressostat de sécurité" },
      { title: "Le régulateur, par sa consigne", note: "il ne mesure pas le moteur" },
      { title: "Personne, la sonde suffit", note: "la sonde lit l’air, pas le moteur" },
    ], "protege"),
    wire: () => wireChoice({ good: 0, messages: [
      "La protection travaille indépendamment du régulateur — c’est ce qui la rend fiable.",
      "Non — le régulateur lit la température de l’air, pas l’état du moteur. Il n’a aucune raison de couper.",
      "Non — une sonde d’ambiance ne voit pas un moteur qui s’échauffe. Sans protection propre, personne n’arrête la machine.",
    ] }),
  }),

  screen({
    id: "labo-sondes",
    narration: "Comment une sonde parle-t-elle au régulateur ? Elle n'envoie ni chiffre ni signal : elle oppose une résistance qui change avec la température. Le régulateur mesure cette résistance et en déduit la température, à condition de savoir quelle famille de sonde est branchée. C'est un point mécanique important : deux fils, aucune électronique dans la sonde, aucune polarité. C'est ce qui rend ces sondes robustes — et c'est aussi ce qui explique le piège de l'écran suivant.", dossier: "comprendre", title: "Le laboratoire deux fils", kicker: "Comprendre · 3",
    codes: ["9.04"], level: "appliquer",
    text: "Une sonde de régulation n’envoie ni chiffre ni signal : elle oppose une <b>résistance</b> qui change avec la température. Trois familles se croisent en froid commercial : la <b>NTC</b>, dont la résistance descend quand la température monte ; la <b>PTC</b> et la <b>Pt1000</b>, dont la résistance monte. Choisissez une famille, déplacez la température, lisez.",
    prompt: "Comparez les trois familles à −20 °C, puis à +40 °C.",
    speak: "Choisissez une sonde et déplacez la température. Une N T C voit sa résistance descendre quand la température monte. Une P T C et une P T mille voient leur résistance monter.",
    render: () => sondeLabMarkup(), wire: () => wireSondeLab(),
  }),

  screen({
    id: "sonde-exacte",
    narration: "Le type de sonde se déclare, il ne se devine pas. Chaque régulateur possède un paramètre qui annonce quelle famille est raccordée. Si l'appareil attend une Pt mille et qu'on branche une sonde d'une autre famille, il mesure quand même une résistance, il affiche quand même une température — et cette température est fausse. Rien ne signale l'erreur : ni alarme, ni valeur aberrante, juste un écart. C'est le genre de défaut qui fait chercher partout ailleurs pendant des heures.", dossier: "comprendre", title: "Le type de sonde se déclare, il ne se devine pas", kicker: "Comprendre · 4",
    codes: ["9.04"], level: "appliquer",
    text: "Chaque régulateur possède un paramètre qui annonce <b>quelle famille</b> est raccordée. S’il attend une Pt1000 et qu’on branche une NTC, il lit une résistance qu’il traduit avec la mauvaise loi : l’affichage devient faux, sans qu’aucun défaut ne s’allume. Et une NTC 5 kΩ ne remplace pas une NTC 10 kΩ.",
    prompt: "Ouvrez les trois règles de la sonde.",
    render: () => checklistMarkup([
      { title: "Une seule famille à la fois", note: "toutes les sondes de l’appareil", detail: "Le paramètre de type vaut pour l’ensemble des entrées : on ne mélange pas une Pt1000 d’ambiance et une NTC d’évaporateur sur le même régulateur." },
      { title: "La valeur nominale compte", note: "5 kΩ ≠ 10 kΩ", detail: "Deux NTC de valeurs différentes donnent deux lectures différentes du même air. Le remplacement se fait à l’identique, référence en main." },
      { title: "Deux fils, aucune polarité", note: "mais pas n’importe quel chemin", detail: "Une sonde deux fils se branche dans les deux sens. En revanche son câble se sépare des câbles de puissance : rangé avec eux, il ramène du parasite dans la mesure." },
    ]),
    wire: () => wireChecklist([0, 1, 2]),
  }),

  screen({
    id: "cycle",
    narration: "Deux nombres et une mémoire, c'est tout ce qui règle un régulateur. La consigne dit où le froid s'arrête. Le différentiel dit de combien la température doit remonter avant qu'il reparte. Et la mémoire, c'est le fait que ces valeurs doivent être enregistrées — nous y reviendrons, c'est le piège de l'écran treize. Vous retrouvez ici exactement les deux nombres du pupitre de réglage : consigne et différentiel, la même langue, quel que soit l'organe.", dossier: "comprendre", title: "Deux nombres, et une mémoire", kicker: "Comprendre · 5",
    codes: ["9.04"], level: "appliquer",
    text: "La <b>consigne</b> dit où le froid s’arrête. Le <b>différentiel</b> dit de combien la température doit remonter avant qu’il reparte. Entre les deux, il se passe quelque chose qu’on oublie souvent : <b>rien</b>. Le relais garde l’état qu’il avait. Déplacez la température lentement dans un sens, puis dans l’autre, et regardez le compresseur.",
    prompt: "Descendez sous la consigne, puis remontez doucement. À quel moment repart-il ?",
    speak: "La consigne dit où le froid s'arrête. Le différentiel dit de combien la température doit remonter pour qu'il reparte. Entre les deux seuils, le relais garde son état : c'est l'hystérésis.",
    render: () => cycleMarkup(), wire: () => wireCycle(),
  }),

  screen({
    id: "courts-cycles",
    narration: "Un différentiel serré coûte cher, et c'est contre-intuitif. Le resserrer semble donner une chambre plus précise — la température varie moins, cela paraît mieux réglé. En réalité, la machine se met à battre : elle démarre et s'arrête sans arrêt, ce qu'on appelle les cycles courts. Chaque démarrage use le compresseur, dégrade le rendement, et perturbe le retour d'huile. Le différentiel n'est pas un défaut de précision qu'on cherche à réduire : c'est ce qui donne à la machine le temps de travailler.", dossier: "comprendre", title: "Le différentiel serré coûte cher", kicker: "Comprendre · 6",
    codes: ["6.03"], level: "comprendre",
    text: "Resserrer le différentiel semble donner une chambre « plus précise ». En réalité la machine se met à battre : elle démarre, s’arrête, redémarre. Chaque démarrage est le moment le plus dur de la vie d’un compresseur — courant d’appel, huile pas encore revenue. C’est pour ça que les régulateurs offrent un <b>temps minimal entre deux démarrages</b> : une sécurité de marche, pas un confort.",
    prompt: "Un différentiel très serré, qu’est-ce que ça produit ?",
    render: () => choiceMarkup([
      { title: "Des courts-cycles et de l’usure", note: "la machine bat, l’huile ne circule plus" },
      { title: "Une chambre plus précise", note: "l’air, lui, n’est pas plus stable" },
      { title: "Une économie d’énergie", note: "c’est l’inverse : les démarrages coûtent" },
    ], "courts"),
    wire: () => wireChoice({ good: 0, messages: [
      "Le compresseur enchaîne les démarrages : usure mécanique, retour d’huile perturbé, consommation en hausse.",
      "Non — l’inertie de la chambre ne suit pas le régulateur. On gagne des cycles, pas de la précision.",
      "Non — le démarrage est le moment le plus consommateur. Multiplier les démarrages augmente la facture.",
    ] }),
  }),

  screen({
    id: "correction",
    narration: "Tous les régulateurs proposent de décaler la valeur affichée. C'est utile dans un cas précis : quand un thermomètre étalonné, placé au bon endroit, montre un écart constant avec l'affichage. On corrige alors l'affichage pour qu'il dise la vérité. Mais attention à l'usage détourné : décaler l'affichage pour faire croire que la chambre est à la bonne température ne change rien à la température réelle des produits. La correction sert à rendre l'affichage honnête, jamais à masquer un problème.", dossier: "comprendre", title: "La correction d’affichage", kicker: "Comprendre · 7",
    codes: ["9.04"], level: "appliquer",
    text: "Tous les régulateurs proposent de <b>décaler</b> la valeur lue. C’est utile quand un thermomètre étalonné, placé au bon endroit, montre un écart constant avec l’afficheur. Mais attention : le régulateur ne régule pas sur la mesure, il régule sur la valeur <b>corrigée</b>. Un décalage oublié déplace toute la chambre.",
    prompt: "Appliquez une correction, puis regardez ce que le régulateur utilise réellement.",
    render: () => offsetMarkup(), wire: () => wireOffset(),
  }),

  screen({
    id: "quiz-comprendre",
    narration: "Faisons le point avant de toucher un clavier. Une résistance, deux nombres, une mémoire : voilà tout ce qu'il faut avoir compris. Une sonde qui oppose une résistance et dont le type doit être déclaré. Une consigne et un différentiel, qui définissent le cycle. Et l'obligation d'enregistrer. Si ces trois idées sont claires, n'importe quel régulateur devient lisible, quelle que soit sa marque.", dossier: "comprendre", title: "Contrôle · lire avant de régler", kicker: "Comprendre · contrôle",
    codes: ["9.04", "6.03"], level: "evaluer",
    text: "Une résistance, deux nombres, une mémoire : c’est tout ce qu’il faut avoir compris avant de toucher un clavier.",
    prompt: "Quelle affirmation est juste ?",
    quiz: {
      choices: [
        "Entre la consigne et la consigne plus le différentiel, le relais garde son état",
        "Le différentiel rend la mesure plus précise",
        "Une NTC 5 kΩ remplace une NTC 10 kΩ, c’est la même famille",
        "La correction d’affichage change ce qui est affiché, mais pas la régulation",
      ],
      good: 0,
      explain: "C’est l’hystérésis : elle laisse le cycle respirer. Le différentiel n’améliore pas la mesure, il structure la marche. Deux NTC de valeurs nominales différentes se lisent différemment. Et la correction déplace la valeur RÉGULÉE, donc tous les seuils avec elle.",
    },
    render() { return quizMarkup(this); }, wire() { wireQuiz(this); },
  }),


  /* ======================= PROGRAMMER ======================= */

  screen({
    id: "methode",
    narration: "Devant un régulateur inconnu, personne n'appuie au hasard. Les claviers changent — une touche menu, un appui maintenu, un code d'accès — mais les cinq gestes sont toujours les mêmes : entrer dans les paramètres, circuler dans la liste, sélectionner un paramètre, modifier sa valeur, et enregistrer. Cherchez ces cinq gestes dans la notice de l'appareil que vous avez sous les yeux, et vous saurez le manœuvrer, même si vous ne l'aviez jamais vu.", dossier: "programmer", title: "Cinq gestes, sur n’importe quel appareil", kicker: "Programmer · 1",
    codes: ["9.04"], level: "comprendre",
    text: "Devant un régulateur inconnu, personne n’appuie au hasard. Les claviers changent — une touche menu, un appui maintenu, un code d’accès — mais la <b>suite des gestes</b>, elle, ne change pas : entrer, choisir, modifier, valider, enregistrer. Apprenez la suite : les appareils, eux, se remplacent.",
    prompt: "Retenez les cinq gestes, et surtout le dernier.",
    speak: "Les claviers changent, la méthode non : entrer, choisir, modifier, valider, enregistrer. Le dernier geste est celui qu'on oublie le plus souvent.",
    render: () => methodeMarkup(), wire: () => {},
  }),

  screen({
    id: "clavier-nomme",
    narration: "Première famille de clavier : chaque touche porte son rôle. La touche M ouvre la liste des paramètres, les flèches circulent dans les codes, et M valide. C'est la famille la plus lisible, celle sur laquelle on apprend. Mais ne prenez pas cette disposition pour une norme : la touche qui valide sur cet appareil pourrait bien sortir du menu sur le suivant.", dossier: "programmer", title: "Le clavier à touches nommées", kicker: "Programmer · 2",
    codes: ["9.04"], level: "appliquer",
    text: "Première famille : un clavier où chaque touche porte son rôle. <kbd>M</kbd> ouvre la liste, les flèches circulent dans les codes, <kbd>M</kbd> passe en modification, <kbd>M</kbd> valide, <kbd>×</kbd> ramène à la température. C’est la façade la plus bavarde, et donc la plus simple pour comprendre le mécanisme.",
    prompt: "Réglez l’arrêt du froid à 2 °C, le différentiel à 3 K, et 5 minutes entre deux démarrages.",
    speak: "Appuyez sur M pour ouvrir la liste. Les flèches choisissent un code. M passe en modification, les flèches changent la valeur, M valide. La croix ramène à la température.",
    render: () => facadeMarkup("codes", {
      cibles: [
        { code: "SP", label: "arrêt du froid", affiche: "2 °C", valeur: 2 },
        { code: "HYS", label: "différentiel", affiche: "3 K", valeur: 3 },
        { code: "CRT", label: "temps mini entre démarrages", affiche: "5 min", valeur: 5 },
      ],
    }),
    wire: () => wireFacade("codes", {
      cibles: [
        { code: "SP", label: "arrêt du froid", affiche: "2 °C", valeur: 2 },
        { code: "HYS", label: "différentiel", affiche: "3 K", valeur: 3 },
        { code: "CRT", label: "temps mini entre démarrages", affiche: "5 min", valeur: 5 },
      ],
    }),
  }),

  screen({
    id: "clavier-trois",
    narration: "Deuxième famille : trois touches seulement, donc des appuis maintenus. Maintenir la flèche haute ouvre la liste ; la touche SET valide. C'est plus économique en boîtier, et beaucoup moins évident à deviner. Un point à connaître : quand un appareil demande un appui maintenu, la durée compte. Un appui trop bref ne fait rien, un appui trop long peut déclencher autre chose — un dégivrage manuel, par exemple.", dossier: "programmer", title: "Le clavier à trois touches", kicker: "Programmer · 3",
    codes: ["9.04"], level: "appliquer",
    text: "Deuxième famille : trois touches seulement, donc des <b>appuis maintenus</b>. Maintenir la flèche haute ouvre la liste ; <kbd>SET</kbd> lit la valeur puis l’enregistre ; maintenir la flèche basse lance un dégivrage. Les codes deviennent des repères — <b>r</b> pour la régulation, <b>d</b> pour le dégivrage, <b>o</b> pour la configuration.",
    prompt: "Chambre positive : arrêt à 2 °C, relance 3 K plus haut, dégivrage électrique toutes les 6 h qui s’arrête à 8 °C, sondes NTC 5 kΩ.",
    speak: "Maintenez la flèche haute environ deux secondes pour ouvrir la liste. Choisissez un code avec les flèches. SET lit la valeur, puis SET l'enregistre.",
    render: () => facadeMarkup("trois", {
      cibles: [
        { code: "SP", label: "arrêt du froid", affiche: "2 °C", valeur: 2 },
        { code: "r01", label: "différentiel", affiche: "3 K", valeur: 3 },
        { code: "d01", label: "type de dégivrage", affiche: "1 · électrique", valeur: 1 },
        { code: "d02", label: "fin de dégivrage", affiche: "8 °C", valeur: 8 },
        { code: "d03", label: "intervalle", affiche: "6 h", valeur: 6 },
        { code: "o06", label: "type de sonde", affiche: "2 · NTC 5 kΩ", valeur: 2 },
      ],
    }),
    wire: () => wireFacade("trois", {
      cibles: [
        { code: "SP", label: "arrêt du froid", affiche: "2 °C", valeur: 2 },
        { code: "r01", label: "différentiel", affiche: "3 K", valeur: 3 },
        { code: "d01", label: "type de dégivrage", affiche: "1 · électrique", valeur: 1 },
        { code: "d02", label: "fin de dégivrage", affiche: "8 °C", valeur: 8 },
        { code: "d03", label: "intervalle", affiche: "6 h", valeur: 6 },
        { code: "o06", label: "type de sonde", affiche: "2 · NTC 5 kΩ", valeur: 2 },
      ],
    }),
  }),

  screen({
    id: "clavier-code",
    narration: "Troisième famille : les paramètres sont protégés par un code d'accès, et rangés par familles — sondes, régulation, dégivrage, alarmes. Le code n'est pas là pour vous embêter : il évite qu'un utilisateur non formé modifie un réglage en cherchant à faire plus froid. Le classement par familles, lui, vous aide : si vous cherchez une durée de dégivrage, vous savez dans quelle section regarder, sans parcourir toute la liste.", dossier: "programmer", title: "Le clavier derrière un code", kicker: "Programmer · 4",
    codes: ["9.04"], level: "appliquer",
    text: "Troisième famille : les paramètres sont protégés par un <b>code d’accès</b>, et rangés par familles — sondes, régulation, dégivrage, ventilateurs. Deux appuis maintenus encadrent le travail : l’un ouvre la porte, l’autre <b>enregistre</b>. Entre les deux, on est dans la mémoire de travail, pas dans l’appareil.",
    prompt: "Entrez le code 22, réglez sondes PTC, consigne 2 °C, différentiel 3 K, dégivrage toutes les 6 h — puis enregistrez.",
    speak: "Maintenez P R G et SET cinq secondes. L'appareil demande un code : montez jusqu'à vingt-deux, puis validez. Choisissez une famille, un paramètre, une valeur. Et surtout : maintenez P R G cinq secondes pour enregistrer.",
    render: () => facadeMarkup("code-acces", {
      cibles: [
        { code: "/P", label: "type de sonde", affiche: "2 · PTC", valeur: 2 },
        { code: "St", label: "consigne", affiche: "2 °C", valeur: 2 },
        { code: "rd", label: "différentiel", affiche: "3 K", valeur: 3 },
        { code: "dI", label: "intervalle de dégivrage", affiche: "6 h", valeur: 6 },
      ],
    }),
    wire: () => wireFacade("code-acces", {
      cibles: [
        { code: "/P", label: "type de sonde", affiche: "2 · PTC", valeur: 2 },
        { code: "St", label: "consigne", affiche: "2 °C", valeur: 2 },
        { code: "rd", label: "différentiel", affiche: "3 K", valeur: 3 },
        { code: "dI", label: "intervalle de dégivrage", affiche: "6 h", valeur: 6 },
      ],
    }),
  }),

  screen({
    id: "enregistrer",
    narration: "Voici le dépannage le plus vexant du métier. Tout est bien réglé, la chambre descend, on repart satisfait — et à la première coupure de courant, l'appareil retrouve ses anciennes valeurs. Pourquoi ? Parce que modifier n'est pas enregistrer. Sur beaucoup de régulateurs, la valeur affichée change immédiatement mais n'est écrite en mémoire qu'après une validation explicite, ou après être sorti du menu correctement. Vérifiez toujours que vos réglages ont survécu — au besoin en coupant volontairement l'alimentation avant de partir.", dossier: "programmer", title: "Modifier n’est pas enregistrer", kicker: "Programmer · 5",
    codes: ["9.04"], level: "comprendre",
    text: "Le dépannage le plus vexant du métier : tout est bien réglé, la chambre descend, on repart — et à la première coupure de courant l’appareil retrouve ses anciennes valeurs. Une valeur affichée n’est pas une valeur écrite. Trois réflexes suffisent à ne jamais se faire avoir.",
    prompt: "Ouvrez les trois réflexes de fin de réglage.",
    render: () => checklistMarkup([
      { title: "Quitter, puis relire", note: "sortir du menu et revenir", detail: "On sort complètement de la programmation, on rentre à nouveau, et on relit les valeurs. Si elles sont là, elles sont écrites." },
      { title: "Chercher le geste d’enregistrement", note: "il n’existe pas partout", detail: "Certains appareils écrivent dès la validation. D’autres attendent un appui maintenu. La notice le dit en une ligne — c’est la ligne à lire en premier." },
      { title: "Noter ce qu’on a changé", note: "sur le carnet, pas dans la tête", detail: "Valeur d’origine, valeur posée, date. Le prochain intervenant — souvent soi-même, six mois plus tard — a besoin de savoir ce qui a été touché et pourquoi." },
    ]),
    wire: () => wireChecklist([0, 1, 2]),
  }),



  /* ======================= DÉGIVRER ======================= */

  screen({
    id: "pourquoi-degivrer",
    narration: "Le givre est un manteau, et cette image explique tout. L'air d'une chambre contient de l'eau. Au contact d'une batterie plus froide que zéro degré, cette eau gèle sur les ailettes. La couche s'épaissit, elle isole comme un manteau, et l'échange se dégrade — moins d'échange, surface plus froide, plus de givre. C'est pour interrompre cette spirale qu'existe le dégivrage, et c'est pourquoi il n'est pas une option sur une chambre négative.", dossier: "degivrer", title: "Le givre est un manteau", kicker: "Dégivrer · 1",
    codes: ["9.04"], level: "comprendre",
    text: "L’air d’une chambre contient de l’eau. Au contact d’une batterie plus froide que 0 °C, cette eau gèle sur les ailettes. Le givre <b>isole</b> l’échangeur et <b>bouche</b> le passage de l’air : l’évaporateur ne prend plus la chaleur de la chambre, la température monte alors que la machine tourne en continu. Dégivrer n’est pas un confort, c’est ce qui garde l’échange possible.",
    prompt: "Un évaporateur très givré, ça donne quoi ?",
    render: () => choiceMarkup([
      { title: "La chambre remonte alors que ça tourne sans arrêt", note: "l’échange ne se fait plus" },
      { title: "La chambre descend plus vite", note: "le givre n’aide pas l’échange, il l’empêche" },
      { title: "Rien, tant que le compresseur fonctionne", note: "le compresseur peut tourner pour rien" },
    ], "givre"),
    wire: () => wireChoice({ good: 0, messages: [
      "Machine en marche permanente et température qui monte quand même : c’est la signature d’un évaporateur pris en givre.",
      "Non — le givre isole et bouche le passage d’air. Il freine l’échange, il ne l’améliore pas.",
      "Non — un compresseur qui tourne sans échanger, c’est de l’énergie dépensée pour rien, et du liquide qui risque de revenir à l’aspiration.",
    ] }),
  }),

  screen({
    id: "cycle-degivrage",
    narration: "Un cycle de dégivrage ne se règle pas avec une seule valeur : il comporte cinq temps. Le froid normal. La chauffe. L'égouttage — l'eau doit partir avant qu'on relance, sinon elle regèle immédiatement. Le retard des ventilateurs, qui évite de souffler de l'air tiède et humide dans la chambre. Et le retour au froid. Deux de ces temps se passent sans chauffe, et ce sont justement ceux qu'on oublie de régler.", dossier: "degivrer", title: "Cinq temps, dont deux sans chauffe", kicker: "Dégivrer · 2",
    codes: ["9.04"], level: "appliquer",
    text: "Un cycle de dégivrage ne se règle pas avec une seule valeur. Parcourez les cinq temps : froid, chauffe, <b>égouttage</b>, <b>retard ventilateur</b>, reprise. Les deux du milieu ne chauffent rien et ne refroidissent rien — ce sont pourtant eux qui décident si la chambre reçoit de l’eau ou pas.",
    prompt: "Parcourez les cinq temps, puis mettez l’égouttage à zéro et regardez ce qu’on vous dit.",
    speak: "Un dégivrage complet a cinq temps : le froid, la chauffe, l'égouttage, le retard ventilateur, puis la reprise. L'égouttage laisse l'eau partir. Le retard ventilateur évite de projeter cette eau dans la chambre.",
    render: () => degivrageMarkup(), wire: () => wireDegivrage(),
  }),

  screen({
    id: "qui-arrete",
    narration: "Qui arrête le dégivrage ? Deux choses peuvent le faire. La sonde d'évaporateur, quand la batterie est assez chaude pour être propre — c'est le bon critère, celui qui s'adapte à la réalité. Ou la durée maximale, qui arrête au bout d'un temps donné — c'est un filet de sécurité, pas un mode de fonctionnement normal. Un dégivrage qui se termine systématiquement sur la durée maximale vous dit quelque chose : la sonde ne voit pas ce qu'elle devrait voir.", dossier: "degivrer", title: "Qui arrête le dégivrage ?", kicker: "Dégivrer · 3",
    codes: ["9.04", "6.03"], level: "appliquer",
    text: "Deux choses peuvent l’arrêter : la <b>sonde d’évaporateur</b>, quand la batterie est assez chaude pour être propre, ou la <b>durée maximale</b>, qui est une sécurité. Le bon fonctionnement, c’est la sonde. Si le cycle se termine toujours sur la durée maximale, quelque chose ne va pas : sonde mal placée, mal déclarée, résistance faible, ou intervalle trop court.",
    prompt: "Le dégivrage s’arrête toujours sur sa durée maximale. Que fait-on ?",
    render: () => choiceMarkup([
      { title: "On cherche pourquoi la sonde n’arrive pas à la valeur", note: "placement, déclaration, chauffe" },
      { title: "On rallonge la durée maximale", note: "on repousse le symptôme" },
      { title: "On baisse la température de fin", note: "le cycle s’arrêtera trop tôt, batterie encore prise" },
    ], "arret"),
    wire: () => wireChoice({ good: 0, messages: [
      "La durée maximale est un filet, pas un mode de fonctionnement. Si c’est elle qui termine chaque cycle, le vrai réglage est ailleurs.",
      "Non — allonger le filet ne répare rien : ça chauffe plus longtemps, ça consomme plus, et la cause reste.",
      "Non — abaisser la valeur de fin ferait s’arrêter le dégivrage alors que la batterie n’est pas dégagée. Le givre s’accumulerait de cycle en cycle.",
    ] }),
  }),

  screen({
    id: "departs-degivrage",
    narration: "Trois façons de démarrer un dégivrage. L'horloge interne de l'appareil, à intervalles réguliers — le plus simple, et le moins adapté aux variations de charge. Une entrée extérieure : contact de porte, commande centralisée, ou autre automatisme. Ou une condition mesurée. Chaque méthode a sa logique, et il faut savoir laquelle est active sur l'installation devant vous avant de conclure qu'un dégivrage « ne part pas ».", dossier: "degivrer", title: "Trois façons de partir", kicker: "Dégivrer · 4",
    codes: ["6.03"], level: "comprendre",
    text: "Un dégivrage démarre par l’<b>horloge</b> de l’appareil, par une <b>entrée extérieure</b> (contact de porte, commande centralisée, autre régulateur), ou <b>à la main</b> par un appui maintenu. Beaucoup de régulateurs acceptent les trois — et la personne qui règle doit savoir lequel travaille chez elle, sinon les cycles se doublent.",
    prompt: "Ouvrez les trois départs possibles.",
    render: () => checklistMarkup([
      { title: "L’horloge de l’appareil", note: "intervalle ou heures fixes", detail: "Soit un intervalle (« toutes les 6 h »), soit des heures précises. Les heures fixes permettent d’éviter les moments de forte activité — juste après une livraison, par exemple." },
      { title: "Une entrée extérieure", note: "contact, commande centralisée", detail: "L’entrée est configurable : porte, alarme, marche forcée, départ de dégivrage. Il faut savoir ce qu’elle fait AVANT de brancher quoi que ce soit dessus." },
      { title: "L’appui maintenu", note: "le dégivrage manuel", detail: "Utile au dépannage pour voir un cycle complet. Il s’arrête comme les autres : sur la sonde, ou sur la durée maximale." },
    ]),
    wire: () => wireChecklist([0, 1, 2]),
  }),

  /* ======================= CÂBLER ======================= */

  screen({
    id: "depart-protege",
    narration: "Passons au câblage, et commençons par une règle absolue : on ne part jamais du réseau nu. L'alimentation de l'ensemble part d'un départ déjà protégé — un disjoncteur, appelé Q un sur nos schémas. Ce n'est pas une préférence de dessinateur : sans protection en amont, un défaut sur le régulateur ou sur ce qu'il commande n'a rien pour l'arrêter. Le schéma se lit toujours de la protection vers l'organe, jamais l'inverse.", dossier: "cabler", title: "On ne part jamais du réseau nu", kicker: "Câbler · 1",
    codes: ["6.03"], level: "comprendre",
    text: "Avant toute chose : l’alimentation de l’ensemble part d’un <b>départ déjà protégé</b> — un disjoncteur, appelé Q1 sur nos schémas. Le régulateur n’est pas une protection : c’est un appareil de commande, alimenté comme les autres, et qui peut tomber en panne sans que cela devienne dangereux. Le compresseur, lui, garde sa propre protection.",
    prompt: "Où se trouve la protection du compresseur ?",
    render: () => choiceMarkup([
      { title: "Sur le compresseur, indépendante du régulateur", note: "thermique, pressostat de sécurité" },
      { title: "Dans le régulateur, c’est son rôle", note: "il commande, il ne protège pas" },
      { title: "Nulle part si le régulateur est neuf", note: "l’âge de l’appareil ne protège rien" },
    ], "q1"),
    wire: () => wireChoice({ good: 0, messages: [
      "Deux chemins séparés : la commande d’un côté, la protection de l’autre. C’est ce qui permet à l’un de tomber en panne sans emporter la machine.",
      "Non — les relais d’un régulateur ferment et ouvrent un circuit. Rien là-dedans ne surveille le moteur.",
      "Non — la protection ne dépend ni de l’âge ni de la marque : elle se pose, elle se dimensionne, elle se vérifie.",
    ] }),
  }),

  screen({
    id: "bornier",
    narration: "Le principe de câblage est toujours le même. L'appareil reçoit son alimentation. Chaque relais possède un commun, qu'on alimente en phase, et un contact qui part vers l'organe commandé — compresseur, résistance de dégivrage, ventilateurs. Une fois ce principe compris, n'importe quel bornier devient lisible : vous cherchez l'alimentation de l'appareil, puis les communs, puis les départs. Trois questions, dans cet ordre.", dossier: "cabler", title: "L’atelier de câblage", kicker: "Câbler · 2",
    codes: ["6.03"], level: "appliquer",
    text: "Le principe est toujours le même. L’appareil reçoit son <b>alimentation</b>. Chaque relais a un <b>commun</b>, qu’on alimente en phase, et une <b>sortie</b>, qui part vers le récepteur. Le récepteur retrouve le <b>neutre</b> de son côté. Posez les huit fils : alimentation, relais froid, relais dégivrage.",
    prompt: "Huit fils à poser. Cliquez un point, puis l’autre.",
    speak: "Chaque relais a un commun, alimenté par la phase, et une sortie qui part vers le récepteur. Le récepteur retrouve le neutre. Posez les huit fils, puis contrôlez.",
    render: () => bornierMarkup(), wire: () => wireBornier(),
  }),

  screen({
    id: "sondes-cablage",
    narration: "Le câble de sonde n'est pas un câble de puissance, et cela a des conséquences pratiques. Une sonde deux fils n'a pas de polarité : les deux sens sont bons, et c'est bien la seule liberté qu'elle offre. Tout le reste est contraint : on ne rallonge pas n'importe comment, on ne fait pas cheminer le câble de sonde le long d'un câble de puissance — les perturbations électromagnétiques y créent des mesures fantômes — et on ne le pince pas dans un passage de tôle. Une sonde perturbée donne une température qui varie sans raison.", dossier: "cabler", title: "Le câble de sonde n’est pas un câble de puissance", kicker: "Câbler · 3",
    codes: ["9.04"], level: "appliquer",
    text: "Une sonde deux fils n’a pas de polarité : les deux sens sont bons, et c’est bien la seule liberté qu’elle offre. Tout le reste est contraint — le chemin du câble, sa longueur, son voisinage. Un fil de mesure rangé le long des câbles de puissance ramène du parasite dans la mesure, et une mesure fausse fait régler faux.",
    prompt: "Ouvrez les trois règles du câble de sonde.",
    render: () => checklistMarkup([
      { title: "Deux fils, aucun sens", note: "mais le bon type déclaré", detail: "On peut brancher la sonde dans les deux sens. En revanche le paramètre de type doit correspondre à la famille réellement posée, sinon la conversion est fausse sans qu’aucun défaut ne s’allume." },
      { title: "Séparé de la puissance", note: "chemin distinct", detail: "Le câble de mesure suit son propre chemin, à distance des câbles qui alimentent compresseur et résistances. Rangés ensemble, ils se parlent — et c’est la mesure qui écoute." },
      { title: "Placée là où la mesure a un sens", note: "l’endroit compte autant que l’appareil", detail: "Une sonde d’ambiance dans le souffle de l’évaporateur lit l’air soufflé, pas la chambre. Le régulateur, lui, croit ce qu’on lui donne." },
    ]),
    wire: () => wireChecklist([0, 1, 2]),
  }),

  screen({
    id: "remplacement",
    narration: "Le jour où l'appareil est mort, on en pose un autre — souvent d'une autre marque. Et voici le réflexe qui coûte cher : recopier les numéros de paramètres de l'ancien vers le nouveau. Chez un autre constructeur, le paramètre numéro cinq ne désigne pas du tout la même chose. On remplace par FONCTION : quelle était la consigne, quel était le différentiel, quelle durée de dégivrage, quel type de sonde. Puis on retrouve, dans la notice du nouvel appareil, le paramètre qui porte cette fonction.", dossier: "cabler", title: "Remplacer : par fonction, jamais par numéro", kicker: "Câbler · 4",
    codes: ["6.03", "9.04"], level: "appliquer",
    text: "Le jour où l’appareil est mort, on en pose un autre — souvent d’une autre marque. Le réflexe qui coûte cher : recopier les numéros de bornes. Deux appareils différents ne numérotent pas pareil. La méthode sûre tient en une phrase : relever la <b>fonction</b> de chaque fil sur l’ancien, retrouver cette fonction sur le nouveau, et vérifier ce qui ne se voit pas — type de sonde, calibre des relais.",
    prompt: "Établissez le plan de conversion, six décisions.",
    render: () => remplacementMarkup(), wire: () => wireRemplacement(),
  }),

  /* ======================= CONTRÔLER ======================= */

  screen({
    id: "mission-negative",
    narration: "Passons à la mission. Chambre de produits surgelés : le froid doit s'arrêter à moins dix-huit degrés et repartir deux kelvins plus haut. Dégivrage électrique à intervalles réguliers. Vous avez tout ce qu'il faut pour régler — la consigne, le différentiel, le type de dégivrage. Prenez le temps d'identifier chaque paramètre par sa fonction avant d'entrer une valeur, et n'oubliez pas la dernière étape, celle qui fait tenir le réglage.", dossier: "controler", title: "Mission · chambre négative", kicker: "Contrôler · 1",
    codes: ["9.04"], level: "evaluer",
    text: "Chambre de produits surgelés. Le froid doit s’arrêter à <b>−18 °C</b> et repartir <b>2 K</b> plus haut. Dégivrage électrique <b>toutes les 6 h</b>, arrêté quand la batterie atteint <b>10 °C</b>, avec une sécurité de <b>45 min</b>. Sondes <b>Pt1000</b>. À vous : la façade est la même qu’à l’écran « clavier à trois touches ».",
    prompt: "Programmez les six valeurs, puis contrôlez.",
    render: () => facadeMarkup("trois", {
      cibles: [
        { code: "SP", label: "arrêt du froid", affiche: "−18 °C", valeur: -18 },
        { code: "r01", label: "différentiel", affiche: "2 K", valeur: 2 },
        { code: "d02", label: "fin de dégivrage", affiche: "10 °C", valeur: 10 },
        { code: "d03", label: "intervalle", affiche: "6 h", valeur: 6 },
        { code: "d04", label: "durée maximale", affiche: "45 min", valeur: 45 },
        { code: "o06", label: "type de sonde", affiche: "0 · Pt1000", valeur: 0 },
      ],
    }),
    wire: () => wireFacade("trois", {
      cibles: [
        { code: "SP", label: "arrêt du froid", affiche: "−18 °C", valeur: -18 },
        { code: "r01", label: "différentiel", affiche: "2 K", valeur: 2 },
        { code: "d02", label: "fin de dégivrage", affiche: "10 °C", valeur: 10 },
        { code: "d03", label: "intervalle", affiche: "6 h", valeur: 6 },
        { code: "d04", label: "durée maximale", affiche: "45 min", valeur: 45 },
        { code: "o06", label: "type de sonde", affiche: "0 · Pt1000", valeur: 0 },
      ],
    }),
  }),

  screen({
    id: "quiz-final",
    narration: "Dernière vérification, sur ce qui distingue un réglage tenu d'un réglage approximatif. Un réglage tenu, c'est : des valeurs qui viennent du dossier et non de l'habitude, un type de sonde déclaré, un différentiel qui laisse la machine travailler, et un enregistrement vérifié. Un réglage approximatif, c'est la même manœuvre sans ces quatre points — et il ressemble au bon jusqu'à la première coupure de courant.", dossier: "controler", title: "Contrôle · régler et câbler", kicker: "Contrôler · 2",
    codes: ["9.04", "6.03"], level: "evaluer",
    text: "Une dernière vérification sur ce qui distingue un réglage tenu d’un réglage approximatif.",
    prompt: "Quelle intervention est correcte ?",
    quiz: {
      choices: [
        "Relever la fonction de chaque fil avant de poser un autre régulateur, puis vérifier type de sonde et calibres",
        "Recopier les numéros de bornes de l’ancien appareil sur le nouveau",
        "Supprimer l’égouttage pour raccourcir le dégivrage",
        "Allonger la durée maximale quand le dégivrage se termine toujours dessus",
      ],
      good: 0,
      explain: "Les numéros de bornes ne se transposent pas d’un appareil à l’autre — seule la fonction se transpose. Supprimer l’égouttage envoie l’eau dans la chambre et fait regeler la batterie. Et une durée maximale qui termine chaque cycle signale un problème à chercher, pas un réglage à rallonger.",
    },
    render() { return quizMarkup(this); }, wire() { wireQuiz(this); },
  }),

  screen({
    id: "bilan",
    narration: "Ce qu'il faut emporter tient en peu de mots. Un régulateur lit une résistance, la compare à une consigne, et ferme un contact. Il commande, il ne protège pas. Deux nombres suffisent à le régler — consigne et différentiel — mais ils ne valent que s'ils sont enregistrés. Le type de sonde se déclare. Et un remplacement se fait par fonction, jamais par numéro de paramètre. Avec cela, vous êtes capable de reprendre un régulateur que vous n'avez jamais vu.", dossier: "controler", title: "Ce qu’il faut emporter", kicker: "Contrôler · bilan", level: "comprendre",
    text: "Un régulateur lit une résistance, la compare à une consigne, et ferme un contact. Il <b>commande</b>, il ne protège pas. Deux nombres suffisent à décrire son cycle — consigne et différentiel — et entre les deux, la mémoire de l’hystérésis fait respirer la machine. Les claviers changent, les cinq gestes non. Le dégivrage a cinq temps, dont deux sans chauffe. Et au bornier, chaque relais a un commun et une sortie, sur un départ toujours protégé.",
    prompt: "",
    render: () => statement({
      visual: "Lire · Régler · Câbler",
      diagram: "<p style='margin:8px 0 0;font-size:15px;line-height:1.55'>La notice donne les valeurs · l’instrument donne la preuve · la protection reste un organe à part, jamais un paramètre.</p>",
    }),
    wire: () => {},
  }),


];

function renderHome() {
  $("#dossier-grid").innerHTML = dossiers.map((dossier,index) => `<button class="dossier-button" type="button" data-dossier="${dossier.id}"><b>${index+1}</b><span>${esc(dossier.label)}<small>${esc(dossier.note)}</small></span></button>`).join("");
  $$('[data-dossier]').forEach(button => button.addEventListener("click", () => startCourse(button.dataset.dossier, 1)));
}
function startCourse(dossierId="comprendre", screenNumber=1) {
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
function buildPrintBook(){const quizCount=screens.filter(s=>s.quiz).length;$("#print-book").innerHTML=`<header class="print-title"><h1>Le régulateur électronique — lire, régler, câbler</h1><p>Station de la ligne CE QUI SE RÈGLE · ${screens.length} écrans · ${quizCount} contrôles.</p><p><strong>Principe :</strong> une résistance lue au bout de deux fils, convertie en température, comparée à une consigne, puis un contact qui se ferme ou s’ouvre.</p><p><strong>Marques citées à titre descriptif</strong> — aucun lien avec les constructeurs, aucune reproduction de leur documentation. Les valeurs sont des valeurs d’exercice : la notice de la référence installée fait foi.</p></header>`+screens.map((item,index)=>`<article class="print-screen"><h2>${index+1}. ${esc(item.title)}</h2><p>${item.text}</p>${item.prompt?`<h3>Action à réaliser</h3><p>${esc(item.prompt)}</p>`:""}${item.quiz?`<div class="print-answer"><strong>Correction :</strong> ${esc(item.quiz.choices[item.quiz.good])}. ${esc(item.quiz.explain)}</div>`:""}<p class="print-codes">Référentiel · ${item.codes.length?esc(item.codes.join(" · ")):"contexte"}</p></article>`).join("");}
function handleInitialUrl(){const params=new URLSearchParams(location.search);const extract=params.get("extrait");if(extract){startExtract(extract.split(",").map(x=>x.trim()).filter(Boolean));return;}const dossier=params.get("dossier");if(dossier){startCourse(dossier,Number(params.get("ecran"))||1);return;}showHome();}
function bindGlobalEvents(){
  $("#start-button").addEventListener("click",()=>startCourse());$("#home-button").addEventListener("click",showHome);$("#exit-button").addEventListener("click",showHome);$("#prev-button").addEventListener("click",previous);$("#next-button").addEventListener("click",next);$("#copy-link").addEventListener("click",copyCurrentLink);$("#listen").addEventListener("click",toggleSpeech);$("#stop-voice").addEventListener("click",()=>stopSpeech());$("#slower").addEventListener("click",()=>changeRate(-1));$("#faster").addEventListener("click",()=>changeRate(1));
  addEventListener("keydown",event=>{const tag=document.activeElement?.tagName;if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(tag))return;if(event.key==="ArrowRight"){event.preventDefault();next();}else if(event.key==="ArrowLeft"){event.preventDefault();previous();}else if(event.key===" "){event.preventDefault();toggleSpeech();}else if(event.key==="Escape")showHome();});
  addEventListener("beforeunload",()=>stopSpeech());document.addEventListener("visibilitychange",()=>{if(document.hidden)stopSpeech();});if(speechSupported())speechSynthesis.addEventListener?.("voiceschanged",()=>{});
}

renderHome();buildPrintBook();bindGlobalEvents();updateVoiceButtons();handleInitialUrl();
