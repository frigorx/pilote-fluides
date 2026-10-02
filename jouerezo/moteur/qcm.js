/* =====================================================================
   qcm.js — « QCM éclair » de JouéRézo
   ---------------------------------------------------------------------
   RÔLE : 10 questions tirées au sort dans la banque du thème, trois
   réponses mélangées (ok + 2 nok), une seule juste. Réponse choisie →
   la juste passe en vert double trait ✓, la fausse choisie en rouge
   tireté ✗, l'explication s'affiche, bouton « Suivante ».
   ENTRÉES : theme.questions et/ou theme.sources (JR.chargerQuestions).
   DÉPEND : JR (commun.js).
   ===================================================================== */
(function () {
  "use strict";
  const N = 10;

  function demarrer(theme, main) {
    main.innerHTML = '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1><p class="legende">Chargement des questions…</p>';
    JR.chargerQuestions(theme).then(function (banque) {
      if (!banque.length) { main.innerHTML += '<p class="retour nok"><strong>✗ Banque indisponible.</strong>Vérifiez la connexion, puis rechargez la page.</p>'; return; }
      jouer(banque);
    });

    function jouer(banque) {
      const file = JR.tirer(banque, N);
      let i = 0, bons = 0;
      function question() {
        const q = file[i];
        const reponses = JR.melanger([{ t: q.ok, ok: true }].concat(q.nok.map(n => ({ t: n, ok: false }))));
        main.innerHTML =
          '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
          '<div class="bord"><span>Question ' + (i + 1) + ' / ' + file.length + '</span><span>Justes : ' + bons + '</span></div>' +
          '<div class="jauge"><span style="width:' + Math.round(i / file.length * 100) + '%"></span></div>' +
          '<section class="carte"><p class="question">' + JR.esc(q.q) + '</p>' +
          '<div class="reponses" role="group" aria-label="Réponses">' +
          reponses.map((r, k) => '<button type="button" class="reponse" data-k="' + k + '">' + JR.esc(r.t) + '</button>').join("") +
          '</div><div id="q-retour"></div></section>';
        main.querySelectorAll(".reponse").forEach(function (b) {
          b.addEventListener("click", function () {
            const k = Number(b.dataset.k);
            main.querySelectorAll(".reponse").forEach(function (x, j) {
              x.disabled = true;
              if (reponses[j].ok) { x.classList.add("ok"); x.textContent = "✓ " + x.textContent; }
              else if (j === k) { x.classList.add("nok"); x.textContent = "✗ " + x.textContent; }
            });
            const juste = reponses[k].ok;
            if (juste) { bons++; JR.sons.ok(); } else JR.sons.nok();
            const r = main.querySelector("#q-retour");
            r.innerHTML = '<p class="retour ' + (juste ? "ok" : "nok") + '"><strong>' + (juste ? "✓ Juste." : "✗ Non.") + '</strong>' + JR.esc(q.exp) + '</p>' +
              '<div class="actions"><button type="button" class="btn" id="q-suite">' + (i + 1 < file.length ? "Question suivante" : "Voir le résultat") + '</button></div>';
            const bs = r.querySelector("#q-suite"); bs.focus();
            bs.addEventListener("click", function () {
              JR.sons.tap(); i++;
              if (i < file.length) question();
              else JR.fin({ score: bons, total: file.length, unite: "justes", rejouer: function () { jouer(banque); } });
            });
          });
        });
      }
      question();
    }
  }

  JR.lancer("qcm", demarrer);
})();
