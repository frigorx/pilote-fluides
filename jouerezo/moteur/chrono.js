/* =====================================================================
   chrono.js — « Chrono vrai ou faux » de JouéRézo
   ---------------------------------------------------------------------
   RÔLE : 60 secondes. Chaque tour : une question de la banque et UNE
   réponse proposée — la vraie (ok) une fois sur deux, un distracteur
   (nok) sinon. Le joueur dit Vrai ou Faux. Juste → +1, suite immédiate.
   Faux → l'explication s'affiche 1,8 s (le chrono continue). À la fin :
   score = bonnes réponses, total = questions vues.
   ENTRÉES : theme.questions et/ou theme.sources (JR.chargerQuestions).
   DÉPEND : JR (commun.js). Pièges : le chrono s'arrête si l'onglet est
   quitté (on compte des secondes de jeu, pas du calendrier).
   ===================================================================== */
(function () {
  "use strict";
  const DUREE = 60;

  function demarrer(theme, main) {
    main.innerHTML = '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1><p class="legende">Chargement des questions…</p>';
    JR.chargerQuestions(theme).then(function (banque) {
      if (!banque.length) { main.innerHTML += '<p class="retour nok"><strong>✗ Banque indisponible.</strong>Vérifiez la connexion, puis rechargez la page.</p>'; return; }
      ecranDepart(banque);
    });

    function ecranDepart(banque) {
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<section class="carte"><p class="chapo">' + JR.esc(window.JR_JEUX.chrono.regle) + '</p>' +
        '<p class="legende">' + banque.length + ' questions dans la banque.</p>' +
        '<div class="actions"><button type="button" class="btn" id="c-go">Lancer le chrono</button></div></section>';
      main.querySelector("#c-go").addEventListener("click", function () { JR.sons.tap(); jouer(banque); });
    }

    function jouer(banque) {
      const file = JR.melanger(banque);
      let i = 0, bons = 0, vus = 0, reste = DUREE, verrou = false, fini = false;
      main.innerHTML =
        '<div class="bord"><span class="chrono" id="c-temps" aria-live="off">' + DUREE + ' s</span><span>Justes : <span id="c-bons">0</span></span><span>Vues : <span id="c-vus">0</span></span></div>' +
        '<div class="jauge"><span id="c-jauge" style="width:100%"></span></div>' +
        '<section class="carte" id="c-zone" aria-live="polite"></section>';
      const zone = main.querySelector("#c-zone"), temps = main.querySelector("#c-temps"), jauge = main.querySelector("#c-jauge");
      const tic = setInterval(function () {
        if (document.hidden) return;
        reste--;
        temps.textContent = reste + " s";
        jauge.style.width = (reste / DUREE * 100) + "%";
        if (reste <= 10) temps.classList.add("presse");
        if (reste <= 0) terminer();
      }, 1000);

      function question() {
        if (fini) return;
        if (i >= file.length) { terminer(); return; }
        const q = file[i++];
        const vrai = Math.random() < 0.5;
        const prop = vrai ? q.ok : q.nok[Math.floor(Math.random() * q.nok.length)];
        zone.innerHTML =
          '<p class="question">' + JR.esc(q.q) + '</p>' +
          '<p class="proposition">' + JR.esc(prop) + '</p>' +
          '<div class="vf"><button type="button" class="btn" data-v="1">Vrai</button><button type="button" class="btn sec" data-v="0">Faux</button></div>' +
          '<div id="c-retour"></div>';
        zone.querySelectorAll("[data-v]").forEach(function (b) {
          b.addEventListener("click", function () {
            if (verrou || fini) return;
            vus++; main.querySelector("#c-vus").textContent = vus;
            const juste = (b.dataset.v === "1") === vrai;
            if (juste) { bons++; main.querySelector("#c-bons").textContent = bons; JR.sons.ok(); question(); }
            else {
              JR.sons.nok(); verrou = true;
              zone.querySelector("#c-retour").innerHTML = '<p class="retour nok"><strong>✗ ' + (vrai ? "C'était vrai." : "C'était faux.") + '</strong>' +
                JR.esc(vrai ? q.exp : "La bonne réponse : " + q.ok + " — " + q.exp) + '</p>';
              setTimeout(function () { verrou = false; question(); }, 2200);
            }
          });
        });
      }
      function terminer() {
        if (fini) return;
        fini = true; clearInterval(tic);
        JR.fin({ score: bons, total: vus, unite: "justes", texte: "En " + DUREE + " secondes.", rejouer: function () { jouer(banque); } });
      }
      question();
    }
  }

  JR.lancer("chrono", demarrer);
})();
