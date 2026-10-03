/* =====================================================================
   memory.js — le Memory de JouéRézo
   ---------------------------------------------------------------------
   RÔLE : 8 paires tirées dans la réserve du thème, 16 cartes mélangées.
   Deux cartes retournées : même paire → elles restent (vert, double
   trait, ✓) ; sinon → rouge tireté 0,9 s puis retour face cachée.
   Score affiché : nombre de coups (une paire retournée = un coup) ;
   le code de partie porte « paires trouvées / coups ».
   ENTRÉES : theme.paires[] { a:{img|txt}, b:{txt} }, theme.type.
   DÉPEND : JR (commun.js).
   ===================================================================== */
(function () {
  "use strict";
  const PAIRES = 8;

  function face(f) {
    if (f.img) return '<span class="face">' + JR.img(f.img, f.alt) + '</span>';
    if (f.src) return '<span class="face"><img src="' + JR.esc(f.src) + '" alt="' + JR.esc(f.alt || "") + '" loading="lazy"></span>';
    return '<span class="face texte">' + JR.esc(f.txt) + '</span>';
  }

  function demarrer(theme, main) {
    const tirage = JR.tirer(theme.paires, PAIRES);
    const cartes = [];
    tirage.forEach(function (p, i) { cartes.push({ paire: i, f: p.a }); cartes.push({ paire: i, f: p.b }); });
    const ordre = JR.melanger(cartes);
    let premiere = null, verrou = false, coups = 0, trouvees = 0;

    main.innerHTML =
      '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
      '<p class="chapo">' + JR.esc(window.JR_JEUX.memory.regle) + '</p>' +
      '<div class="bord"><span>Paires : <span id="m-paires">0</span> / ' + PAIRES + '</span><span>Coups : <span id="m-coups">0</span></span></div>' +
      '<div class="grille-memory" id="m-grille" role="group" aria-label="Cartes du Memory"></div>' +
      '<p class="legende" id="m-trouvees" aria-live="polite"></p>';
    const grille = main.querySelector("#m-grille"), nomsTrouves = [];
    ordre.forEach(function (c, idx) {
      const b = JR.el('<button type="button" class="carte-memory" aria-label="Carte ' + (idx + 1) + ', face cachée"><span class="dos" aria-hidden="true">❄️</span>' + face(c.f) + '</button>');
      b.dataset.paire = c.paire;
      b.dataset.nom = tirage[c.paire].nom || tirage[c.paire].b.txt || "";
      b.addEventListener("click", function () { retourner(b, c); });
      grille.appendChild(b);
    });

    function retourner(b, c) {
      if (verrou || b.classList.contains("vue") || b.classList.contains("trouvee")) return;
      JR.sons.tap();
      b.classList.add("vue");
      b.setAttribute("aria-label", c.f.txt || "image");
      if (!premiere) { premiere = b; return; }
      coups++; main.querySelector("#m-coups").textContent = coups;
      if (premiere.dataset.paire === b.dataset.paire) {
        premiere.classList.add("trouvee"); b.classList.add("trouvee");
        if (b.dataset.nom) { nomsTrouves.push(b.dataset.nom); main.querySelector("#m-trouvees").textContent = "Trouvé : " + nomsTrouves.join(" · "); premiere.setAttribute("aria-label", b.dataset.nom); b.setAttribute("aria-label", b.dataset.nom); }
        premiere = null; trouvees++;
        main.querySelector("#m-paires").textContent = trouvees;
        JR.sons.ok();
        if (trouvees === PAIRES) setTimeout(terminer, 600);
      } else {
        verrou = true;
        premiere.classList.add("erreur"); b.classList.add("erreur");
        JR.sons.nok();
        const p = premiere;
        setTimeout(function () {
          p.classList.remove("vue", "erreur"); b.classList.remove("vue", "erreur");
          p.setAttribute("aria-label", "Carte, face cachée"); b.setAttribute("aria-label", "Carte, face cachée");
          premiere = null; verrou = false;
        }, 900);
      }
    }

    function terminer() {
      /* score = paires sur coups : 8 paires en 8 coups = parfait ; on l'exprime en points sur 16 */
      const score = Math.max(0, 16 - (coups - PAIRES));
      JR.fin({ score: score, total: 16, texte: PAIRES + " paires trouvées en " + coups + " coups.", rejouer: function () { demarrer(theme, main); } });
    }
  }

  JR.lancer("memory", demarrer);
})();
