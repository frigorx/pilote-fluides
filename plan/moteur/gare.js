"use strict";
/* inerWeb Plan — moteur commun des gares : navigation par écrans + test.
   La page fournit : des <section> (écrans), un <div id="zone-quiz"> et un
   <div id="score"> dans l'écran de test, et ses questions dans
   <script id="quiz" type="application/json"> :
   [{ "e": "énoncé", "r": ["4 réponses"], "bon": 0-3, "x": "explication",
      "spec": "Spécialité MPI" (facultatif) }] */

/* ---------- navigation ---------- */
const ecrans = [...document.querySelectorAll("section")];
const nav = document.createElement("nav");
nav.className = "pied";
nav.innerHTML = '<button class="sec" id="prec">← Précédent</button>' +
  '<span class="prog" id="prog"></span>' +
  '<button id="suiv">Suivant →</button>';
document.body.appendChild(nav);
const prec = document.getElementById("prec"), suiv = document.getElementById("suiv"),
      prog = document.getElementById("prog");
let idx = 0;
function montre(i){
  ecrans[idx].classList.remove("on");
  idx = Math.max(0, Math.min(ecrans.length - 1, i));
  ecrans[idx].classList.add("on");
  prec.disabled = idx === 0;
  suiv.disabled = idx === ecrans.length - 1;
  prog.textContent = "écran " + (idx + 1) + " / " + ecrans.length;
  window.scrollTo(0, 0);
  agrandissables(ecrans[idx]);
}
prec.addEventListener("click", () => montre(idx - 1));
suiv.addEventListener("click", () => montre(idx + 1));
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") montre(idx + 1);
  if (e.key === "ArrowLeft") montre(idx - 1);
});
montre(0);

/* ---------- test ---------- */
const src = document.getElementById("quiz");
const zone = document.getElementById("zone-quiz");
if (src && zone) {
  const QUIZ = JSON.parse(src.textContent);
  const scoreEl = document.getElementById("score");
  let repondu = 0, bons = 0;
  QUIZ.forEach((q, iq) => {
    const d = document.createElement("div");
    d.className = "q";
    if (q.spec) {
      const s = document.createElement("div"); s.className = "spec";
      const h = document.createElement("h3"); h.textContent = "🔀 " + q.spec;
      s.appendChild(h); d.appendChild(s);
    }
    const p = document.createElement("p"); p.className = "enonce";
    p.textContent = (iq + 1) + ". " + q.e; d.appendChild(p);
    q.r.forEach((txt, ir) => {
      const b = document.createElement("button");
      b.className = "rep"; b.textContent = txt;
      b.addEventListener("click", () => {
        if (d.classList.contains("fini")) return;
        d.classList.add("fini");
        repondu++;
        if (ir === q.bon) { b.classList.add("ok"); bons++; }
        else {
          b.classList.add("ko");
          d.querySelectorAll(".rep")[q.bon].classList.add("ok");
        }
        if (repondu === QUIZ.length && scoreEl) {
          scoreEl.textContent = "Score : " + bons + " / " + QUIZ.length +
            (bons >= Math.ceil(QUIZ.length * 0.8)
              ? " — en voiture pour la gare suivante !"
              : " — relisez les écrans clés, puis rejouez le test en rechargeant la page.");
        }
      });
      d.appendChild(b);
    });
    const x = document.createElement("p"); x.className = "explic";
    x.textContent = q.x; d.appendChild(x);
    zone.appendChild(d);
  });
}

/* ---------- outils partagés ---------- */
/* Points d'une face de dé (positions standard) — utilisé par certaines gares. */
const POS_DE = {
  1: [[.5,.5]],
  2: [[.25,.25],[.75,.75]],
  3: [[.25,.25],[.5,.5],[.75,.75]],
  4: [[.25,.25],[.75,.25],[.25,.75],[.75,.75]],
  5: [[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]],
  6: [[.25,.25],[.75,.25],[.25,.5],[.75,.5],[.25,.75],[.75,.75]]
};
const SVGNS = "http://www.w3.org/2000/svg";
function dessinePoints(groupe, n, taille){
  groupe.replaceChildren();
  for (const [px, py] of POS_DE[n]) {
    const c = document.createElementNS(SVGNS, "circle");
    c.setAttribute("cx", px * taille); c.setAttribute("cy", py * taille);
    c.setAttribute("r", taille * 0.075); c.setAttribute("fill", "#10233c");
    groupe.appendChild(c);
  }
}

/* Figures trop petites sur un téléphone : on propose de les agrandir (texte ramené à 12 px au moins). */
const PETIT = window.matchMedia("(max-width:700px)");
function agrandissables(sec){
  sec.querySelectorAll("svg").forEach(s => {
    if (s.closest("#zoom-fig") || !s.viewBox || !s.viewBox.baseVal || !s.viewBox.baseVal.width) return;
    const larg = s.getBoundingClientRect().width;
    if (!larg) return;
    const echelle = larg / s.viewBox.baseVal.width;
    let mini = Infinity;
    s.querySelectorAll("text").forEach(x => { const fs = parseFloat(getComputedStyle(x).fontSize); if (fs && fs < mini) mini = fs; });
    s.dataset.zoomFactor = mini === Infinity ? "" : String(12 / (mini * echelle));
    if (mini === Infinity || mini * echelle >= 12) { s.classList.remove("agrandissable"); return; }
    if (s.classList.contains("agrandissable")) return;
    s.classList.add("agrandissable");
    s.setAttribute("tabindex", "0");
    const aide = document.createElement("p");
    aide.className = "astuce-zoom"; aide.textContent = "🔍 Touchez la figure pour l'agrandir";
    s.insertAdjacentElement("afterend", aide);
    const ouvre = () => {
      if (!PETIT.matches) return;
      const vb = s.viewBox.baseVal, fond = document.createElement("div");
      fond.id = "zoom-fig";
      const fermer = document.createElement("button");
      fermer.type = "button"; fermer.textContent = "✕ Fermer";
      const copie = s.cloneNode(true);
      copie.classList.remove("agrandissable"); copie.removeAttribute("tabindex");
      const facteur = Math.max(1, parseFloat(s.dataset.zoomFactor) || 1);
      copie.setAttribute("width", Math.ceil(s.getBoundingClientRect().width * facteur));
      copie.removeAttribute("height"); copie.style.maxWidth = "none"; copie.style.height = "auto";
      fond.append(fermer, copie); document.body.appendChild(fond);
      const ferme = () => { fond.remove(); document.removeEventListener("keydown", cle); };
      const cle = e => { if (e.key === "Escape") ferme(); };
      fermer.addEventListener("click", ferme); document.addEventListener("keydown", cle);
    };
    s.addEventListener("click", ouvre);
    s.addEventListener("keydown", e => { if (e.key === "Enter") ouvre(); });
  });
}
window.addEventListener("resize", () => agrandissables(ecrans[idx]));
