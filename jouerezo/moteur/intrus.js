/* =====================================================================
   intrus.js — « L'intrus » de JouéRézo
   ---------------------------------------------------------------------
   RÔLE : 8 séries tirées au sort dans le thème ; chaque série montre
   quatre cartes mélangées (3 bons + 1 intrus). Touché l'intrus → vert
   double trait ✓ ; touché un bon → il passe en rouge tireté ✗ et
   l'intrus se révèle en vert. Explication, puis série suivante.
   ENTRÉES : theme.series[] { q, bons[3], intrus, pourquoi }.
   DÉPEND : JR (commun.js).
   ===================================================================== */
(function () {
  "use strict";
  const N = 8;

  function demarrer(theme, main) {
    const file = JR.tirer(theme.series, N);
    let i = 0, bons = 0;
    function serie() {
      const s = file[i];
      const cartes = JR.melanger(s.bons.map(b => ({ t: b, intrus: false })).concat([{ t: s.intrus, intrus: true }]));
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<div class="bord"><span>Série ' + (i + 1) + ' / ' + file.length + '</span><span>Trouvés : ' + bons + '</span></div>' +
        '<div class="jauge"><span style="width:' + Math.round(i / file.length * 100) + '%"></span></div>' +
        '<section class="carte"><p class="question">' + JR.esc(s.q) + '</p>' +
        '<div class="intrus-grille" role="group" aria-label="Quatre cartes">' +
        cartes.map((c, k) => '<button type="button" class="intrus-carte" data-k="' + k + '">' + JR.esc(c.t) + '</button>').join("") +
        '</div><div id="i-retour"></div></section>';
      main.querySelectorAll(".intrus-carte").forEach(function (b) {
        b.addEventListener("click", function () {
          const k = Number(b.dataset.k);
          const juste = cartes[k].intrus;
          main.querySelectorAll(".intrus-carte").forEach(function (x, j) {
            x.disabled = true;
            if (cartes[j].intrus) { x.classList.add("ok"); x.textContent = "✓ " + x.textContent; }
            else if (j === k) { x.classList.add("nok"); x.textContent = "✗ " + x.textContent; }
          });
          if (juste) { bons++; JR.sons.ok(); } else JR.sons.nok();
          const r = main.querySelector("#i-retour");
          r.innerHTML = '<p class="retour ' + (juste ? "ok" : "nok") + '"><strong>' + (juste ? "✓ C'est bien l'intrus." : "✗ L'intrus, c'était « " + JR.esc(s.intrus) + " ».") + '</strong>' + JR.esc(s.pourquoi) + '</p>' +
            '<div class="actions"><button type="button" class="btn" id="i-suite">' + (i + 1 < file.length ? "Série suivante" : "Voir le résultat") + '</button></div>';
          const bs = r.querySelector("#i-suite"); bs.focus();
          bs.addEventListener("click", function () {
            JR.sons.tap(); i++;
            if (i < file.length) serie();
            else JR.fin({ score: bons, total: file.length, unite: "intrus trouvés", rejouer: function () { demarrer(theme, main); } });
          });
        });
      });
    }
    serie();
  }

  JR.lancer("intrus", demarrer);
})();
