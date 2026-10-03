/* =====================================================================
   quisuisje.js — « Qui suis-je ? » : une définition, trois noms, un seul juste
   ---------------------------------------------------------------------
   RÔLE : 10 définitions tirées dans la banque du thème (JR_DEFINITIONS
   par famille, ou JR_ELECTROREZO fabriquée depuis les stations) ; trois
   noms proposés : le bon et deux autres de la même banque. Explication :
   « où on le trouve » quand la banque le dit, et la porte vers la station.
   DÉPEND : JR (commun.js), JR.banqueMots (commun.js) qui réunit les banques.
   ===================================================================== */
(function () {
  "use strict";
  const N = 10;

  function demarrer(theme, main) {
    const banque = theme.mots || [];
    const file = JR.tirer(banque, Math.min(N, banque.length));
    let i = 0, bons = 0;
    function question() {
      const q = file[i];
      const autres = JR.tirer(banque.filter(x => x.mot !== q.mot), 2);
      const choix = JR.melanger([q].concat(autres));
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<div class="bord"><span>Définition ' + (i + 1) + ' / ' + file.length + '</span><span>Justes : ' + bons + '</span></div>' +
        '<div class="jauge"><span style="width:' + Math.round(i / file.length * 100) + '%"></span></div>' +
        '<section class="carte"><p class="legende">Qui suis-je ?</p><p class="question">' + JR.esc(q.def) + '</p>' +
        '<div class="reponses" role="group" aria-label="Trois noms">' +
        choix.map((c, k) => '<button type="button" class="reponse" data-k="' + k + '">' + JR.esc(majuscule(c.mot)) + '</button>').join("") +
        '</div><div id="q-retour"></div></section>';
      main.querySelectorAll(".reponse").forEach(function (b) {
        b.addEventListener("click", function () {
          const k = Number(b.dataset.k), juste = choix[k].mot === q.mot;
          main.querySelectorAll(".reponse").forEach(function (x, j) {
            x.disabled = true;
            if (choix[j].mot === q.mot) { x.classList.add("ok"); x.textContent = "✓ " + x.textContent; }
            else if (j === k) { x.classList.add("nok"); x.textContent = "✗ " + x.textContent; }
          });
          if (juste) { bons++; JR.sons.ok(); } else JR.sons.nok();
          const r = main.querySelector("#q-retour");
          r.innerHTML = '<p class="retour ' + (juste ? "ok" : "nok") + '"><strong>' + (juste ? "✓ C'est bien " : "✗ C'était ") + JR.esc(q.mot) + '.</strong>' +
            JR.esc(q.ou || "") + (q.porte ? '<br><a href="' + JR.esc(q.porte.h) + '">→ Revoir : ' + JR.esc(q.porte.t) + '</a>' : "") + '</p>' +
            '<div class="actions"><button type="button" class="btn" id="q-suite">' + (i + 1 < file.length ? "Définition suivante" : "Voir le résultat") + '</button></div>';
          const bs = r.querySelector("#q-suite"); bs.focus();
          bs.addEventListener("click", function () {
            JR.sons.tap(); i++;
            if (i < file.length) question();
            else JR.fin({ score: bons, total: file.length, unite: "justes", rejouer: function () { demarrer(theme, main); } });
          });
        });
      });
    }
    question();
  }
  function majuscule(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  JR.lancer("quisuisje", demarrer);
})();
