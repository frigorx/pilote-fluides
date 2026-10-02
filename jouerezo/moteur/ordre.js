/* =====================================================================
   ordre.js — « Le bon ordre » de JouéRézo
   ---------------------------------------------------------------------
   RÔLE : pour chaque série du thème (tirées au sort, theme.parPartie),
   les étapes sont mélangées ; le joueur les touche dans l'ordre. Bonne
   étape → elle se range dans la liste numérotée (vert, ✓). Mauvaise →
   elle tremble (rouge tireté) et compte une erreur. Série finie →
   phrase « apres » puis série suivante. Score : séries sans erreur.
   ENTRÉES : theme.series[] { titre, etapes[], apres }.
   DÉPEND : JR (commun.js).
   ===================================================================== */
(function () {
  "use strict";

  function demarrer(theme, main) {
    const series = JR.tirer(theme.series, theme.parPartie || theme.series.length);
    let idx = 0, sansErreur = 0;

    function serie() {
      const s = series[idx];
      let attendu = 0, erreurs = 0;
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<div class="bord"><span>Série ' + (idx + 1) + ' / ' + series.length + '</span><span>Sans erreur : ' + sansErreur + '</span></div>' +
        '<div class="jauge"><span style="width:' + Math.round(idx / series.length * 100) + '%"></span></div>' +
        '<section class="carte"><h2>' + JR.esc(s.titre) + '</h2>' +
        '<p class="legende">Touchez les étapes dans l\'ordre.</p>' +
        '<ol class="ordre-faites" id="o-faites" aria-label="Étapes rangées"></ol>' +
        '<div class="ordre-restantes" id="o-restantes" role="group" aria-label="Étapes à ranger"></div>' +
        '<div id="o-retour"></div></section>';
      const faites = main.querySelector("#o-faites"), restantes = main.querySelector("#o-restantes");
      JR.melanger(s.etapes.map((e, i) => ({ e: e, i: i }))).forEach(function (o) {
        const b = JR.el('<button type="button" class="etape">' + JR.esc(o.e) + '</button>');
        b.addEventListener("click", function () {
          if (o.i === attendu) {
            JR.sons.ok();
            faites.appendChild(JR.el('<li>' + JR.esc(o.e) + '</li>'));
            b.remove(); attendu++;
            if (attendu === s.etapes.length) finSerie(erreurs);
          } else {
            JR.sons.nok(); erreurs++;
            b.classList.remove("secoue"); void b.offsetWidth; b.classList.add("secoue");
            setTimeout(() => b.classList.remove("secoue"), 400);
          }
        });
        restantes.appendChild(b);
      });
      function finSerie(err) {
        if (err === 0) sansErreur++;
        const r = main.querySelector("#o-retour");
        r.innerHTML = '<p class="retour ' + (err === 0 ? "ok" : "nok") + '"><strong>' +
          (err === 0 ? "✓ Dans l'ordre, sans erreur." : "✗ Dans l'ordre, avec " + err + (err > 1 ? " erreurs." : " erreur.")) + '</strong>' +
          JR.esc(s.apres) + '</p><div class="actions"><button type="button" class="btn" id="o-suite">' +
          (idx + 1 < series.length ? "Série suivante" : "Voir le résultat") + '</button></div>';
        const bs = r.querySelector("#o-suite");
        bs.focus();
        bs.addEventListener("click", function () {
          JR.sons.tap(); idx++;
          if (idx < series.length) serie();
          else JR.fin({ score: sansErreur, total: series.length, unite: "séries sans erreur", rejouer: function () { demarrer(theme, main); } });
        });
      }
    }
    serie();
  }

  JR.lancer("ordre", demarrer);
})();
