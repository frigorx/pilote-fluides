/* =====================================================================
   aventure.js — « Nuit à l'atelier » : le moteur de l'aventure à choix
   ---------------------------------------------------------------------
   RÔLE : joue le scénario window.JR_AVENTURE[theme.id] (donnees/
   aventure.js). Trois cœurs. Choix bon → +1, texte de retour vert ;
   choix faux → −1 cœur, retour rouge + porte vers la planche. À zéro
   cœur, fin perdue. Dernière scène (sans choix) : fin gagnée.
   Score : bons choix / scènes à choix.
   RÉEMPLOI (04/10/2026, « Le circuit dont vous êtes le héros ») : une
   autre page relance ce moteur sous son nom (data-jeu sur la balise
   <script>, défaut « aventure ») ; un scénario peut porter ses mots
   (mots), un dessin d'ouverture (vignette), rester sur place après une
   erreur (surPlace : la scène se rejoue, seul le premier coup compte) et
   montrer sa dernière scène dans le panneau de fin gagnée (finMontree).
   Sans ces champs, « Nuit à l'atelier » est inchangée.
   DÉPEND : JR (commun.js), JR_AVENTURE.
   ===================================================================== */
(function () {
  "use strict";
  const COEURS = 3;
  const JEU = (document.currentScript && document.currentScript.dataset.jeu) || "aventure";

  function demarrer(theme, main) {
    const sc = window.JR_AVENTURE[theme.id];
    const M = Object.assign({ entrer: "Entrer dans l'atelier", compte: "Gestes sûrs", unite: "gestes sûrs", ok: "✓ Geste sûr. ", nok: "✗ Le zombie gagne un pas. " }, sc.mots);
    const aChoix = sc.scenes.filter(s => s.choix.length).length;
    let i = 0, coeurs = COEURS, bons = 0, rate = false;

    function vies() { return "❤️".repeat(coeurs) + "🖤".repeat(COEURS - coeurs); }

    function intro() {
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + sc.titre) + '</h1>' +
        '<section class="carte scene">' + (sc.vignette ? '<div class="vignette" aria-hidden="true">' + sc.vignette + '</div>' : "") +
        '<div class="texte">' + sc.intro.map(p => '<p>' + JR.esc(p) + '</p>').join("") + '</div>' +
        '<p class="legende">' + JR.esc(window.JR_JEUX[JEU].regle) + '</p>' +
        '<div class="actions"><button type="button" class="btn" id="a-go">' + JR.esc(M.entrer) + '</button></div></section>';
      main.querySelector("#a-go").addEventListener("click", function () { JR.sons.tap(); scene(); });
    }

    function scene() {
      const s = sc.scenes[i];
      if (!s.choix.length) { fin(true); return; }
      main.innerHTML =
        '<div class="bord"><span class="vies" aria-label="' + coeurs + ' cœurs sur ' + COEURS + '">' + vies() + '</span><span>Scène ' + (i + 1) + ' / ' + sc.scenes.length + '</span><span>' + JR.esc(M.compte) + ' : ' + bons + '</span></div>' +
        '<section class="carte scene"><div class="vignette" aria-hidden="true">' + s.vignette + '</div><h2>' + JR.esc(s.titre) + '</h2>' +
        '<div class="texte">' + s.texte.map(p => '<p>' + JR.esc(p) + '</p>').join("") + '</div>' +
        '<div class="choix" role="group" aria-label="Que faites-vous ?">' +
        JR.melanger(s.choix.map((c, k) => k)).map(k => '<button type="button" class="reponse" data-k="' + k + '">' + JR.esc(s.choix[k].t) + '</button>').join("") +
        '</div><div id="a-retour"></div></section>';
      main.querySelectorAll(".reponse").forEach(function (b) {
        b.addEventListener("click", function () {
          const c = s.choix[Number(b.dataset.k)];
          main.querySelectorAll(".reponse").forEach(x => { x.disabled = true; });
          if (c.bon) { if (!rate) bons++; b.classList.add("ok"); JR.sons.ok(); }
          else { coeurs--; rate = true; b.classList.add("nok"); JR.sons.nok(); }
          const r = main.querySelector("#a-retour");
          r.innerHTML = '<p class="retour ' + (c.bon ? "ok" : "nok") + '"><strong>' + JR.esc(c.bon ? M.ok : M.nok) + vies() + '</strong>' + JR.esc(c.retour) +
            (c.porte ? '<br><a href="' + JR.esc(c.porte.h) + '">→ Revoir : ' + JR.esc(c.porte.t) + '</a>' : "") + '</p>' +
            '<div class="actions"><button type="button" class="btn" id="a-suite">' + (coeurs <= 0 ? "Voir la fin" : !c.bon && sc.surPlace ? "Réessayer" : "Continuer") + '</button></div>';
          const bs = r.querySelector("#a-suite"); bs.focus();
          bs.addEventListener("click", function () {
            JR.sons.tap();
            if (coeurs <= 0) { fin(false); return; }
            if (!c.bon && sc.surPlace) { scene(); return; } /* la mauvaise réponse laisse sur place : même scène */
            i++; rate = false; scene();
          });
        });
      });
    }

    function fin(gagne) {
      JR.fin({ score: bons, total: aChoix, unite: M.unite, texte: gagne ? sc.finGagnee : sc.finPerdue, rejouer: function () { demarrer(theme, main); } });
      const der = sc.scenes[sc.scenes.length - 1], h2 = main.querySelector(".fin h2");
      if (gagne && sc.finMontree && h2) h2.insertAdjacentHTML("afterend", '<div class="vignette" aria-hidden="true">' + der.vignette + '</div>' +
        '<div class="texte">' + der.texte.map(p => '<p>' + JR.esc(p) + '</p>').join("") + '</div>');
    }

    intro();
  }

  JR.lancer(JEU, demarrer);
})();
