/* =====================================================================
   pendu.js — « Le pendu du frigo » : un mot du métier, lettre par lettre
   ---------------------------------------------------------------------
   RÔLE : 5 mots tirés dans la banque du thème ; l'indice est la définition.
   Pas de bonhomme pendu : à chaque lettre fausse, la température du
   compresseur monte d'un cran sur une jauge de 8 ; au huitième, « le
   compresseur a grillé » et le mot se révèle. Les lettres accentuées
   comptent comme leur lettre de base (É = E) et s'affichent avec l'accent ;
   espaces, traits d'union et apostrophes sont donnés d'office.
   Clavier à l'écran (26 touches) et clavier physique.
   DÉPEND : JR (commun.js), JR.banqueMots.
   ===================================================================== */
(function () {
  "use strict";
  const MOTS = 5, MAX = 8;
  const base = c => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();

  function jauge(n) {
    const crans = [];
    for (let i = 0; i < MAX; i++) crans.push('<rect x="22" y="' + (118 - i * 13) + '" width="20" height="11" rx="2" fill="' + (i < n ? (i >= 6 ? "#c0392b" : i >= 4 ? "#ff6b35" : "#3d7fca") : "#e3e9f1") + '"/>');
    return '<svg class="thermo" viewBox="0 0 64 140" width="64" height="140" role="img" aria-label="Température du compresseur : ' + n + ' sur ' + MAX + '">' +
      '<rect x="18" y="8" width="28" height="112" rx="8" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>' + crans.join("") +
      '<circle cx="32" cy="128" r="9" fill="' + (n >= MAX ? "#c0392b" : "#1b3a63") + '"/></svg>';
  }

  function demarrer(theme, main) {
    const banque = theme.mots || [];
    const file = JR.tirer(banque, Math.min(MOTS, banque.length));
    let i = 0, trouves = 0;

    function mot() {
      const q = file[i], lettres = [...q.mot], trouvees = new Set(), essayees = new Set();
      let erreurs = 0, fini = false;
      const aDeviner = new Set(lettres.filter(c => /\p{L}/u.test(c)).map(base));
      main.innerHTML =
        '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
        '<div class="bord"><span>Mot ' + (i + 1) + ' / ' + file.length + '</span><span>Trouvés : ' + trouves + '</span></div>' +
        '<section class="carte pendu"><div class="pendu-haut"><div id="p-jauge">' + jauge(0) + '</div>' +
        '<div><p class="legende">Indice</p><p class="indice">' + JR.esc(q.def) + '</p></div></div>' +
        '<p class="mot" id="p-mot" aria-live="polite"></p>' +
        '<div class="clavier" id="p-clavier" role="group" aria-label="Lettres">' +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => '<button type="button" class="touche" data-l="' + l + '">' + l + '</button>').join("") +
        '</div><div id="p-retour"></div></section>';
      const zoneMot = main.querySelector("#p-mot");
      function afficher(tout) {
        /* un mot ne se coupe jamais en fin de ligne : chaque mot est un bloc insécable */
        zoneMot.innerHTML = q.mot.split(" ").map(m => '<span class="motpart">' + [...m].map(c => {
          if (!/\p{L}/u.test(c)) return '<span class="signe">' + JR.esc(c) + '</span>';
          return '<span class="case' + (tout && !trouvees.has(base(c)) ? " manquee" : "") + '">' + (trouvees.has(base(c)) || tout ? JR.esc(c.toUpperCase()) : "_") + '</span>';
        }).join("") + '</span>').join("");
      }
      afficher(false);
      function jouer(l) {
        if (fini || essayees.has(l)) return;
        essayees.add(l);
        const t = main.querySelector('.touche[data-l="' + l + '"]');
        if (aDeviner.has(l)) { trouvees.add(l); t.classList.add("ok"); t.disabled = true; JR.sons.ok(); afficher(false); if ([...aDeviner].every(x => trouvees.has(x))) finMot(true); }
        else { erreurs++; t.classList.add("nok"); t.disabled = true; JR.sons.nok(); main.querySelector("#p-jauge").innerHTML = jauge(erreurs); if (erreurs >= MAX) finMot(false); }
      }
      main.querySelectorAll(".touche").forEach(t => t.addEventListener("click", () => jouer(t.dataset.l)));
      function clavier(e) { const l = base(e.key); if (l.length === 1 && l >= "A" && l <= "Z" && !e.ctrlKey && !e.metaKey) { e.preventDefault(); jouer(l); } }
      document.addEventListener("keydown", clavier);
      function finMot(gagne) {
        fini = true; document.removeEventListener("keydown", clavier);
        main.querySelectorAll(".touche").forEach(t => { t.disabled = true; });
        afficher(true);
        if (gagne) trouves++;
        const r = main.querySelector("#p-retour");
        r.innerHTML = '<p class="retour ' + (gagne ? "ok" : "nok") + '"><strong>' + (gagne ? "✓ Trouvé : " : "✗ Le compresseur a grillé. C'était : ") + JR.esc(q.mot) + '.</strong>' +
          JR.esc(q.ou || "") + (q.porte ? '<br><a href="' + JR.esc(q.porte.h) + '">→ Revoir : ' + JR.esc(q.porte.t) + '</a>' : "") + '</p>' +
          '<div class="actions"><button type="button" class="btn" id="p-suite">' + (i + 1 < file.length ? "Mot suivant" : "Voir le résultat") + '</button></div>';
        const bs = r.querySelector("#p-suite"); bs.focus();
        bs.addEventListener("click", function () {
          JR.sons.tap(); i++;
          if (i < file.length) mot();
          else JR.fin({ score: trouves, total: file.length, unite: "mots trouvés", rejouer: function () { demarrer(theme, main); } });
        });
      }
    }
    mot();
  }

  JR.lancer("pendu", demarrer);
})();
