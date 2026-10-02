/* =====================================================================
   aventure.js — « Nuit à l'atelier » : le moteur de l'aventure à choix
   ---------------------------------------------------------------------
   RÔLE : joue le scénario window.JR_AVENTURE[theme.id] (donnees/
   aventure.js). Trois cœurs. Choix bon → +1, texte de retour vert ;
   choix faux → −1 cœur, retour rouge + porte vers la planche. À zéro
   cœur, fin perdue. Dernière scène (sans choix) : fin gagnée.
   Score : bons choix / scènes à choix.
   DÉPEND : JR (commun.js), JR_AVENTURE.
   ===================================================================== */
(function () {
  "use strict";
  const COEURS = 3;

  function demarrer(theme, main) {
    const sc = window.JR_AVENTURE[theme.id];
    const aChoix = sc.scenes.filter(s => s.choix.length).length;
    let i = 0, coeurs = COEURS, bons = 0;

    function vies() { return "❤️".repeat(coeurs) + "🖤".repeat(COEURS - coeurs); }

    function intro() {
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + sc.titre) + '</h1>' +
        '<section class="carte scene"><div class="texte">' + sc.intro.map(p => '<p>' + JR.esc(p) + '</p>').join("") + '</div>' +
        '<p class="legende">' + JR.esc(window.JR_JEUX.aventure.regle) + '</p>' +
        '<div class="actions"><button type="button" class="btn" id="a-go">Entrer dans l\'atelier</button></div></section>';
      main.querySelector("#a-go").addEventListener("click", function () { JR.sons.tap(); scene(); });
    }

    function scene() {
      const s = sc.scenes[i];
      if (!s.choix.length) { fin(true); return; }
      main.innerHTML =
        '<div class="bord"><span class="vies" aria-label="' + coeurs + ' cœurs sur ' + COEURS + '">' + vies() + '</span><span>Scène ' + (i + 1) + ' / ' + sc.scenes.length + '</span><span>Gestes sûrs : ' + bons + '</span></div>' +
        '<section class="carte scene"><div class="vignette" aria-hidden="true">' + s.vignette + '</div><h2>' + JR.esc(s.titre) + '</h2>' +
        '<div class="texte">' + s.texte.map(p => '<p>' + JR.esc(p) + '</p>').join("") + '</div>' +
        '<div class="choix" role="group" aria-label="Que faites-vous ?">' +
        JR.melanger(s.choix.map((c, k) => k)).map(k => '<button type="button" class="reponse" data-k="' + k + '">' + JR.esc(s.choix[k].t) + '</button>').join("") +
        '</div><div id="a-retour"></div></section>';
      main.querySelectorAll(".reponse").forEach(function (b) {
        b.addEventListener("click", function () {
          const c = s.choix[Number(b.dataset.k)];
          main.querySelectorAll(".reponse").forEach(x => { x.disabled = true; });
          if (c.bon) { bons++; b.classList.add("ok"); JR.sons.ok(); }
          else { coeurs--; b.classList.add("nok"); JR.sons.nok(); }
          const r = main.querySelector("#a-retour");
          r.innerHTML = '<p class="retour ' + (c.bon ? "ok" : "nok") + '"><strong>' + (c.bon ? "✓ Geste sûr. " : "✗ Le zombie gagne un pas. ") + vies() + '</strong>' + JR.esc(c.retour) +
            (c.porte ? '<br><a href="' + JR.esc(c.porte.h) + '">→ Revoir : ' + JR.esc(c.porte.t) + '</a>' : "") + '</p>' +
            '<div class="actions"><button type="button" class="btn" id="a-suite">' + (coeurs > 0 ? "Continuer" : "Voir la fin") + '</button></div>';
          const bs = r.querySelector("#a-suite"); bs.focus();
          bs.addEventListener("click", function () {
            JR.sons.tap();
            if (coeurs <= 0) { fin(false); return; }
            i++; scene();
          });
        });
      });
    }

    function fin(gagne) {
      JR.fin({ score: bons, total: aChoix, unite: "gestes sûrs", texte: gagne ? sc.finGagnee : sc.finPerdue, rejouer: function () { demarrer(theme, main); } });
    }

    intro();
  }

  JR.lancer("aventure", demarrer);
})();
