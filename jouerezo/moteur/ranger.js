/* =====================================================================
   ranger.js — « Ranger » de JouéRézo : des étiquettes dans des bacs
   ---------------------------------------------------------------------
   RÔLE : une situation (une intervention, un lot de déchets…), des
   étiquettes à ranger dans 2 à 4 bacs nommés. On pose tout, on vérifie,
   on lit l'explication de chaque erreur. Plusieurs manches par partie.
   GESTE : toucher une étiquette de la pile puis le bac ; ou toucher le
   bac puis l'étiquette ; ou faire glisser l'étiquette (JR.glisser).
   Toucher une étiquette déjà rangée la remet dans la pile.
   ENTRÉES : theme.manches[] { titre, consigne, bacs[{id,nom,aide}],
   etiquettes[{t, bac, exp, img|src|lib}] }, theme.parPartie (nombre de
   manches, défaut : toutes), theme.parManche (étiquettes tirées, défaut 10).
   IMAGES : `img` = symbole de ../symboles/svg/<id>.svg ; `src` = chemin
   relatif à la page ; `lib` = illustrations/bibliotheque/<lib>.svg.
   Le tirage garde au moins une étiquette par bac.
   SCORE : étiquettes bien rangées / étiquettes, toutes manches.
   ÉTATS à trois canaux : bon = vert, double trait, « ✓ » ;
   faux = rouge, tireté, « ✗ ».
   DÉPEND : JR (commun.js, JR.glisser).
   ===================================================================== */
(function () {
  "use strict";
  const PAR_MANCHE = 10;

  function image(e) {
    if (e.img) return '<img src="../symboles/svg/' + JR.esc(e.img) + '.svg" alt="" draggable="false">';
    if (e.lib) return '<img src="illustrations/bibliotheque/' + JR.esc(e.lib) + '.svg" alt="" draggable="false">';
    if (e.src) return '<img src="' + JR.esc(e.src) + '" alt="" draggable="false">';
    return "";
  }

  /* tirage de n étiquettes avec au moins une par bac */
  function tirage(m, n) {
    const toutes = JR.melanger(m.etiquettes);
    if (toutes.length <= n) return toutes;
    const choix = [];
    m.bacs.forEach(function (b) { const e = toutes.find(x => x.bac === b.id && choix.indexOf(x) < 0); if (e) choix.push(e); });
    toutes.forEach(function (e) { if (choix.length < n && choix.indexOf(e) < 0) choix.push(e); });
    return JR.melanger(choix);
  }

  function demarrer(theme, main) {
    const manches = JR.tirer(theme.manches, theme.parPartie || theme.manches.length);
    let i = 0, bons = 0, total = 0;

    function manche() {
      const m = manches[i], liste = tirage(m, theme.parManche || PAR_MANCHE);
      const cartes = liste.map((e, k) => ({ id: k, e: e, bac: null }));
      let choisie = null, verifie = false;

      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<p class="chapo">' + JR.esc(window.JR_JEUX.ranger.regle) + '</p>' +
        '<div class="bord"><span>Série ' + (i + 1) + ' / ' + manches.length + '</span><span>Rangées : <span id="r-rangees">0</span> / ' + cartes.length + '</span></div>' +
        '<div class="jauge"><span style="width:' + Math.round(i / manches.length * 100) + '%"></span></div>' +
        '<section class="carte"><h2>' + JR.esc(m.titre) + '</h2>' +
        (m.consigne ? '<p class="consigne">' + JR.esc(m.consigne) + '</p>' : "") +
        (i === 0 ? '<p class="legende exemple">Comment faire : touchez une étiquette, puis le bac où elle va. Pour la reprendre, touchez-la dans le bac.</p>' : "") +
        '<p class="legende" id="r-tenue" aria-live="polite">Touchez une étiquette.</p>' +
        '<ul class="pile" id="r-pile" aria-label="Étiquettes à ranger"></ul>' +
        '<div class="bacs bacs-' + m.bacs.length + '" id="r-bacs">' +
        m.bacs.map(b => '<section class="bac" data-bac="' + JR.esc(b.id) + '"><button type="button" class="bac-nom">' + JR.esc(b.nom) +
          (b.aide ? '<small>' + JR.esc(b.aide) + '</small>' : "") + '</button><ul class="bac-liste"></ul></section>').join("") + '</div>' +
        '<div class="actions"><button type="button" class="btn" id="r-verif" disabled>Vérifier</button></div>' +
        '<div id="r-retour"></div></section>';

      const pile = main.querySelector("#r-pile"), tenue = main.querySelector("#r-tenue"), verif = main.querySelector("#r-verif");
      const bacsEl = [...main.querySelectorAll(".bac")];
      const btn = {};
      cartes.forEach(function (c) {
        const im = image(c.e);
        const b = JR.el('<button type="button" class="etiquette' + (im ? " avec-image" : "") + '">' + im + '<span>' + JR.esc(c.e.t) + '</span></button>');
        b.dataset.id = c.id; btn[c.id] = b;
        b.addEventListener("click", function () {
          if (verifie) return;
          if (c.bac !== null) { c.bac = null; choisie = null; JR.sons.tap(); maj(); b.focus(); return; }
          choisie = (choisie === c) ? null : c; JR.sons.tap(); maj(); b.focus();
        });
        JR.glisser(b, {
          commencer: function () { if (c.bac === null) { choisie = c; tenue.textContent = "Vous tenez « " + c.e.t + " ». Déposez-la sur un bac."; b.setAttribute("aria-pressed", "true"); } },
          survol: function (x, y) { const q = bacSous(x, y); bacsEl.forEach(be => be.classList.toggle("cible", be === q)); },
          deposer: function (x, y) { const q = bacSous(x, y); if (q) ranger(c, q.dataset.bac); }
        });
      });
      function bacSous(x, y) { const e = document.elementFromPoint(x, y); return e && e.closest ? e.closest(".bac") : null; }

      function ranger(c, idBac) {
        if (verifie) return;
        c.bac = idBac; choisie = null; JR.sons.tap(); maj();
      }
      bacsEl.forEach(function (be) {
        be.addEventListener("click", function (ev) {
          if (verifie || ev.target.closest(".etiquette")) return;
          if (choisie) ranger(choisie, be.dataset.bac);
          else tenue.textContent = "Prenez d'abord une étiquette dans la pile.";
        });
      });

      /* les <li> ne bougent que s'ils changent de liste : déplacer l'étiquette qu'on est en train de glisser
         lui ferait perdre la capture du pointeur (le fantôme resterait collé à l'écran) */
      const lis = {};
      function maj() {
        cartes.forEach(function (c) {
          const b = btn[c.id];
          const li = lis[c.id] || (lis[c.id] = (function () { const x = document.createElement("li"); x.appendChild(b); return x; })());
          b.setAttribute("aria-pressed", choisie === c ? "true" : "false");
          b.setAttribute("aria-label", c.e.t + (c.bac !== null ? ", rangée dans " + m.bacs.find(x => x.id === c.bac).nom + (verifie ? "" : ", touchez pour la reprendre") : ", dans la pile"));
          const cible = c.bac === null ? pile : bacsEl.find(be => be.dataset.bac === c.bac).querySelector(".bac-liste");
          if (li.parentElement !== cible) cible.appendChild(li);
        });
        const n = cartes.filter(c => c.bac !== null).length;
        main.querySelector("#r-rangees").textContent = n;
        verif.disabled = verifie || n < cartes.length;
        if (!verifie) tenue.textContent = choisie ? "Vous tenez « " + choisie.e.t + " ». Touchez le bac où elle va." :
          n < cartes.length ? "Touchez une étiquette." : "Tout est rangé. Touchez « Vérifier ».";
        pile.hidden = n === cartes.length;
      }

      verif.addEventListener("click", function () {
        verifie = true; choisie = null;
        const erreurs = [];
        cartes.forEach(function (c) {
          const b = btn[c.id], bon = c.bac === c.e.bac;
          b.disabled = true; b.classList.add(bon ? "ok" : "nok");
          b.querySelector("span").textContent = (bon ? "✓ " : "✗ ") + c.e.t;
          if (!bon) erreurs.push(c);
        });
        maj();
        verif.hidden = true; tenue.hidden = true;
        main.querySelectorAll(".bac").forEach(be => be.classList.add("ferme"));
        const justes = cartes.length - erreurs.length;
        bons += justes; total += cartes.length;
        if (erreurs.length) JR.sons.nok(); else JR.sons.ok();
        const nom = id => m.bacs.find(x => x.id === id).nom;
        const r = main.querySelector("#r-retour");
        r.innerHTML =
          '<p class="retour ' + (erreurs.length ? "nok" : "ok") + '"><strong>' + (erreurs.length ? "✗ " : "✓ ") + justes + " étiquette" + (justes > 1 ? "s" : "") + " bien rangée" + (justes > 1 ? "s" : "") + " sur " + cartes.length + '.</strong>' +
          (erreurs.length ? "Voici les erreurs, une par une." : "Tout est dans le bon bac.") + '</p>' +
          (erreurs.length ? '<ul class="corrections">' + erreurs.map(c =>
            '<li><strong>« ' + JR.esc(c.e.t) + ' »</strong> allait dans « ' + JR.esc(nom(c.e.bac)) + ' », pas dans « ' + JR.esc(nom(c.bac)) + ' ». ' + JR.esc(c.e.exp || "") + '</li>').join("") + '</ul>' : "") +
          '<div class="actions"><button type="button" class="btn" id="r-suite">' + (i + 1 < manches.length ? "Série suivante" : "Voir le résultat") + '</button></div>';
        const bs = r.querySelector("#r-suite"); bs.focus();
        bs.addEventListener("click", function () {
          JR.sons.tap(); i++;
          if (i < manches.length) manche();
          else JR.fin({ score: bons, total: total, unite: "étiquettes bien rangées", rejouer: function () { demarrer(theme, main); } });
        });
      });

      maj();
    }
    manche();
  }

  JR.lancer("ranger", demarrer);
})();
