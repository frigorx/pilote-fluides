/* =====================================================================
   trous.js — « Texte à trous » de JouéRézo : replacer les mots
   ---------------------------------------------------------------------
   RÔLE : un court texte avec des trous ; une réserve de mots (les bons
   mots + des intrus) ; on remplit, on vérifie, on lit l'explication de
   chaque erreur. `parPartie` textes tirés au sort dans le thème.
   GESTE : toucher un mot de la réserve puis le trou où il va ; ou
   toucher un trou puis un mot ; ou faire glisser le mot (JR.glisser).
   Toucher un mot déjà posé le reprend. Clavier : Tab, Entrée.
   ENTRÉES : theme.textes[] { titre, texte, leurres[], fr?, source?, memo? } (fr = traduction affichée après la vérification, memo = rappel affiché au-dessus du texte) où `texte`
   marque chaque trou par {mot|explication}, par exemple
   « Le {compresseur|il comprime la vapeur} est le moteur du circuit. ».
   Deux trous peuvent attendre le même mot : les deux mots sont alors
   interchangeables (on compare des mots, pas des jetons).
   SCORE : mots bien placés / trous, tous textes confondus. Un seul
   « Vérifier » par texte : l'explication tient lieu de seconde chance.
   ÉTATS à trois canaux : bon = vert, double trait, « ✓ » ;
   faux = rouge, tireté, « ✗ ».
   DÉPEND : JR (commun.js, JR.glisser).
   ===================================================================== */
(function () {
  "use strict";
  const PAR_PARTIE = 3;

  /* « Le {a|exp} … » → { morceaux: [texte, trou, texte, …], trous: [{ rep, exp }] } */
  function analyser(brut) {
    const trous = [], morceaux = [];
    let reste = brut;
    const re = /\{([^|}]+)\|([^}]*)\}/;
    let m;
    while ((m = re.exec(reste))) {
      morceaux.push({ t: reste.slice(0, m.index) });
      trous.push({ rep: m[1].trim(), exp: m[2].trim() });
      morceaux.push({ trou: trous.length - 1 });
      reste = reste.slice(m.index + m[0].length);
    }
    morceaux.push({ t: reste });
    return { morceaux: morceaux, trous: trous };
  }

  const maj1 = t => t.charAt(0).toUpperCase() + t.slice(1); /* une explication commence par une majuscule */

  function demarrer(theme, main) {
    const file = JR.tirer(theme.textes, theme.parPartie || PAR_PARTIE);
    let i = 0, bons = 0, total = 0;

    function texte() {
      const t = file[i], a = analyser(t.texte);
      const n = a.trous.length;
      const jetons = JR.melanger(a.trous.map(x => x.rep).concat(t.leurres || [])).map((mot, k) => ({ id: k, mot: mot, place: null }));
      const poseDans = new Array(n).fill(null); /* poseDans[trou] = jeton */
      let choisi = null, vise = null, verifie = false;

      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<p class="chapo">' + JR.esc(window.JR_JEUX.trous.regle) + '</p>' +
        '<div class="bord"><span>Texte ' + (i + 1) + ' / ' + file.length + '</span><span>Posés : <span id="t-poses">0</span> / ' + n + '</span></div>' +
        '<div class="jauge"><span style="width:' + Math.round(i / file.length * 100) + '%"></span></div>' +
        '<section class="carte"><h2 class="titre-texte">' + JR.esc(t.titre) + '</h2>' +
        (t.memo ? '<p class="memo">' + JR.esc(t.memo) + '</p>' : "") +
        (i === 0 ? '<p class="legende exemple">Exemple : dans « Le ____ mesure la pression. », vous touchez le mot « manomètre », puis le trou.</p>' : "") +
        '<p class="texte-trous" id="t-texte">' +
        a.morceaux.map(m => m.trou === undefined ? JR.esc(m.t) :
          '<button type="button" class="trou" data-i="' + m.trou + '" data-n="' + (m.trou + 1) + '"></button>').join("") + '</p>' +
        '<p class="legende" id="t-tenue" aria-live="polite">Touchez un mot de la réserve.</p>' +
        '<div class="reserve" id="t-reserve" role="group" aria-label="Réserve de mots">' +
        jetons.map(j => '<button type="button" class="mot-reserve" data-id="' + j.id + '">' + JR.esc(j.mot) + '</button>').join("") + '</div>' +
        '<div class="actions"><button type="button" class="btn" id="t-verif" disabled>Vérifier</button></div>' +
        '<div id="t-retour"></div></section>';

      const btnTrou = [...main.querySelectorAll(".trou")];
      const btnMot = jetons.map(j => main.querySelector('.mot-reserve[data-id="' + j.id + '"]'));
      const tenue = main.querySelector("#t-tenue"), verif = main.querySelector("#t-verif");

      function maj() {
        btnTrou.forEach(function (b, k) {
          const j = poseDans[k];
          b.textContent = j ? j.mot : "";
          b.classList.toggle("plein", !!j);
          b.classList.toggle("vise", vise === k && !verifie);
          b.setAttribute("aria-label", "Trou " + (k + 1) + " sur " + n + (j ? ", mot posé : " + j.mot + (verifie ? "" : ", touchez pour le reprendre") : ", vide"));
          b.setAttribute("aria-pressed", vise === k && !verifie ? "true" : "false");
        });
        jetons.forEach(function (j) {
          const b = btnMot[j.id];
          b.hidden = j.place !== null;
          b.setAttribute("aria-pressed", choisi === j ? "true" : "false");
        });
        const poses = poseDans.filter(Boolean).length;
        main.querySelector("#t-poses").textContent = poses;
        verif.disabled = verifie || poses < n;
        if (verifie) return;
        tenue.textContent = choisi ? "Vous tenez « " + choisi.mot + " ». Touchez le trou où il va." :
          vise !== null ? "Trou " + (vise + 1) + " choisi. Touchez le mot qui va dedans." : "Touchez un mot de la réserve.";
      }

      function poser(j, k) {
        if (verifie) return;
        const ancien = poseDans[k];
        if (ancien) ancien.place = null;
        if (j.place !== null) poseDans[j.place] = null;
        j.place = k; poseDans[k] = j;
        choisi = null; vise = null;
        JR.sons.tap();
        maj();
      }
      function reprendre(k) {
        const j = poseDans[k]; if (!j) return;
        j.place = null; poseDans[k] = null; vise = k; choisi = null;
        JR.sons.tap(); maj();
      }

      btnTrou.forEach(function (b, k) {
        b.addEventListener("click", function () {
          if (verifie) return;
          if (choisi) { poser(choisi, k); return; }
          if (poseDans[k]) { reprendre(k); return; }
          vise = (vise === k) ? null : k; JR.sons.tap(); maj();
        });
      });
      jetons.forEach(function (j) {
        const b = btnMot[j.id];
        b.addEventListener("click", function () {
          if (verifie) return;
          if (vise !== null && !poseDans[vise]) { poser(j, vise); return; }
          choisi = (choisi === j) ? null : j; vise = choisi ? null : vise; JR.sons.tap(); maj();
        });
        JR.glisser(b, {
          commencer: function () { choisi = j; vise = null; maj(); },
          survol: function (x, y) { const k = trouSous(x, y); btnTrou.forEach((bt, q) => bt.classList.toggle("cible", q === k)); },
          deposer: function (x, y) { const k = trouSous(x, y); if (k !== null) poser(j, k); }
        });
      });
      function trouSous(x, y) {
        const e = document.elementFromPoint(x, y), b = e && e.closest ? e.closest(".trou") : null;
        return b ? btnTrou.indexOf(b) : null;
      }

      verif.addEventListener("click", function () {
        verifie = true; choisi = null; vise = null;
        let justes = 0;
        const erreurs = [];
        btnTrou.forEach(function (b, k) {
          const bon = poseDans[k].mot === a.trous[k].rep;
          b.disabled = true; b.classList.remove("vise", "cible");
          b.classList.add(bon ? "ok" : "nok");
          b.textContent = (bon ? "✓ " : "✗ ") + poseDans[k].mot;
          b.setAttribute("aria-label", "Trou " + (k + 1) + (bon ? ", juste : " : ", faux : ") + poseDans[k].mot);
          if (bon) justes++; else erreurs.push(k);
        });
        main.querySelector("#t-reserve").hidden = true; tenue.hidden = true; /* la réserve et la consigne n'ont plus lieu d'être */
        verif.hidden = true;
        bons += justes; total += n;
        if (erreurs.length) JR.sons.nok(); else JR.sons.ok();
        const r = main.querySelector("#t-retour");
        r.innerHTML =
          '<p class="retour ' + (erreurs.length ? "nok" : "ok") + '"><strong>' + (erreurs.length ? "✗ " : "✓ ") + justes + " mot" + (justes > 1 ? "s" : "") + " bien placé" + (justes > 1 ? "s" : "") + " sur " + n + '.</strong>' +
          (erreurs.length ? "Voici ce qu'il fallait mettre." : "Tout est à sa place.") + '</p>' +
          (erreurs.length ? '<ul class="corrections">' + erreurs.map(k =>
            '<li><strong>Trou ' + (k + 1) + ' :</strong> il fallait « ' + JR.esc(a.trous[k].rep) + ' » (et non « ' + JR.esc(poseDans[k].mot) + ' »). ' + JR.esc(maj1(a.trous[k].exp)) + '</li>').join("") + '</ul>' : "") +
          (erreurs.length ? '<p class="texte-entier"><strong>Le texte en entier :</strong> ' + a.morceaux.map(m => m.trou === undefined ? JR.esc(m.t) : '<strong>' + JR.esc(a.trous[m.trou].rep) + '</strong>').join("") + '</p>' : "") +
          (t.fr ? '<p class="texte-fr"><strong>En français :</strong> ' + JR.esc(t.fr) + '</p>' : "") +
          (t.source ? '<p class="legende">' + JR.esc(t.source) + '</p>' : "") +
          '<div class="actions"><button type="button" class="btn" id="t-suite">' + (i + 1 < file.length ? "Texte suivant" : "Voir le résultat") + '</button></div>';
        const bs = r.querySelector("#t-suite"); bs.focus();
        bs.addEventListener("click", function () {
          JR.sons.tap(); i++;
          if (i < file.length) texte();
          else JR.fin({ score: bons, total: total, unite: "mots bien placés", rejouer: function () { demarrer(theme, main); } });
        });
      });

      maj();
    }
    texte();
  }

  JR.lancer("trous", demarrer);
})();
