/* =====================================================================
   Station « F-Gaz 3 » — navigation, voix et quiz
   ---------------------------------------------------------------------
   CONTRAT VOCAL. Le moteur du site fournit deux briques, chargées en
   absolu depuis https://inerweb.fr/moteur/ :
     · voix.js       — remplace une narration connue par son fichier audio
                       local ; un texte absent de l'index RETOMBE sur la
                       voix du navigateur. Cette station n'a aucun audio
                       fabriqué : elle parle donc entièrement en
                       SpeechSynthesis, sans dépendance à un service tiers.
                       C'est pourquoi voix-index.js (468 Ko d'index audio)
                       n'est PAS chargé ici : il ne servirait à rien.
     · prof-vocal.js — le « professeur » qui enchaîne les écrans tout seul.
                       Il s'active en trouvant #listen et #next, lit le
                       périmètre .slide.active, et s'arrête sur les
                       questions. Ne pas renommer ces identifiants.

   RÈGLE PÉDAGOGIQUE (celle de prof-vocal.js, tenue ici) : rien n'est dit
   qui ne soit aussi écrit, et aucune réponse n'est choisie à la place de
   l'élève. La narration de chaque écran est portée par data-narration —
   elle explique ce que l'on VOIT, elle ne relit pas le texte mot à mot.

   R2 — l'animation ne conditionne jamais du contenu : la station reste
   entièrement lisible et imprimable sans jamais lancer la voix.
   ===================================================================== */
(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;

  var elIndex   = document.getElementById("progression-index");
  var elBarre   = document.getElementById("progression-barre");
  var btnPrev   = document.getElementById("prev");
  var btnNext   = document.getElementById("next");
  var btnListen = document.getElementById("listen");
  var btnStop   = document.getElementById("stop-voice");
  var btnStart  = document.getElementById("start");
  var accueil   = document.getElementById("accueil");
  var cours     = document.getElementById("cours");

  var courant = 0;

  /* Le lien profond se lit MAINTENANT, avant tout affichage : afficher()
     écrit l'ancre #ecran-N dans l'URL, et la relire après reviendrait à
     croire qu'on nous a demandé un écran précis — l'accueil serait sauté
     à chaque ouverture. */
  var ancreDepart = /^#ecran-(\d+)$/.exec(window.location.hash || "");

  /* ---------- la voix ---------- */

  var synth = window.speechSynthesis || null;
  var voixFr = null;

  function choisirVoix() {
    if (!synth || voixFr) return;
    var toutes = synth.getVoices() || [];
    for (var i = 0; i < toutes.length; i += 1) {
      if (/^fr(-|_)/i.test(toutes[i].lang)) { voixFr = toutes[i]; return; }
    }
  }
  if (synth) {
    choisirVoix();
    // Chrome ne peuple la liste qu'après un événement.
    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", choisirVoix);
    }
  }

  function texteNarre(slide) {
    var dit = slide.getAttribute("data-narration");
    if (dit && dit.trim()) return dit.trim();
    // repli : le titre et le premier paragraphe, jamais le tableau brut
    var t = slide.querySelector("h2");
    var p = slide.querySelector("p:not(.numero)");
    return [t ? t.textContent : "", p ? p.textContent : ""].join(". ");
  }

  function arreter() {
    if (synth) { try { synth.cancel(); } catch (e) {} }
    majBoutonsVoix(false);
  }

  function majBoutonsVoix(enCours) {
    if (btnStop) btnStop.disabled = !enCours;
    if (btnListen) {
      btnListen.setAttribute("aria-pressed", enCours ? "true" : "false");
      btnListen.querySelector(".libelle").textContent = enCours ? "Lecture…" : "Écouter";
    }
  }

  function ecouter() {
    if (!synth || !window.SpeechSynthesisUtterance) return;
    arreter();
    var u = new window.SpeechSynthesisUtterance(texteNarre(slides[courant]));
    u.lang = "fr-FR";
    if (voixFr) u.voice = voixFr;
    u.rate = 0.95;
    u.onend = function () { majBoutonsVoix(false); };
    u.onerror = function () { majBoutonsVoix(false); };
    majBoutonsVoix(true);
    synth.speak(u);
  }

  /* ---------- la navigation ---------- */

  function afficher(n, parler) {
    arreter();
    courant = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, i) {
      var actif = i === courant;
      s.classList.toggle("active", actif);
      s.hidden = !actif;
    });
    if (elIndex) elIndex.textContent = (courant + 1) + " / " + slides.length;
    if (elBarre) elBarre.style.width = ((courant + 1) / slides.length * 100) + "%";
    if (btnPrev) btnPrev.disabled = courant === 0;
    if (btnNext) btnNext.disabled = courant === slides.length - 1;
    var titre = slides[courant].querySelector("h2");
    if (titre) titre.focus();
    if (parler) ecouter();
    // L'ancre ne s'écrit QUE si la station est ouverte : sinon un simple
    // rechargement depuis l'accueil relirait #ecran-1 et sauterait l'accueil.
    if (cours && !cours.hidden) {
      try { history.replaceState(null, "", "#ecran-" + (courant + 1)); } catch (e) {}
    }
  }

  function demarrer() {
    if (accueil) accueil.hidden = true;
    if (cours) cours.hidden = false;
    // Le premier clic vaut geste humain : la voix a le droit de parler.
    afficher(0, true);
  }

  /* ---------- le quiz ---------- */

  document.querySelectorAll(".quiz-options").forEach(function (liste) {
    var retour = liste.parentNode.querySelector(".feedback");
    liste.querySelectorAll("button").forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var bonne = bouton.getAttribute("data-answer") === "bonne";
        liste.querySelectorAll("button").forEach(function (b) {
          b.classList.remove("choisi");
          b.disabled = true;
        });
        bouton.classList.add("choisi");
        bouton.classList.add(bonne ? "juste" : "faux");
        if (bonne === false) {
          var vraie = liste.querySelector('[data-answer="bonne"]');
          if (vraie) vraie.classList.add("juste");
        }
        if (retour) {
          retour.hidden = false;
          // Le mot porte le sens, pas la couleur seule (R5).
          retour.textContent = (bonne ? "Juste. " : "À revoir. ") + retour.getAttribute("data-explication");
          retour.className = "feedback " + (bonne ? "feedback--juste" : "feedback--revoir");
        }
      });
    });
  });

  /* ---------- branchements ---------- */

  if (btnNext)   btnNext.addEventListener("click", function () { afficher(courant + 1, false); });
  if (btnPrev)   btnPrev.addEventListener("click", function () { afficher(courant - 1, false); });
  if (btnListen) btnListen.addEventListener("click", ecouter);
  if (btnStop)   btnStop.addEventListener("click", arreter);
  if (btnStart)  btnStart.addEventListener("click", demarrer);

  document.addEventListener("keydown", function (e) {
    if (cours && cours.hidden) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "ArrowRight") { afficher(courant + 1, false); }
    else if (e.key === "ArrowLeft") { afficher(courant - 1, false); }
  });

  document.addEventListener("visibilitychange", function () { if (document.hidden) arreter(); });

  /* ---------- état de départ ---------- */

  slides.forEach(function (s, i) { s.hidden = i !== 0; s.classList.toggle("active", i === 0); });

  if (ancreDepart) {
    // Lien profond : on entre directement sur l'écran demandé, sans voix
    // (aucun geste humain n'a encore eu lieu).
    if (accueil) accueil.hidden = true;
    if (cours) cours.hidden = false;
    afficher(parseInt(ancreDepart[1], 10) - 1, false);
  } else {
    if (accueil) accueil.hidden = false;
    if (cours) cours.hidden = true;
    afficher(0, false);
  }

  /* À l'impression, TOUT doit sortir : les écrans masqués comme les
     réponses du quiz. Sinon la feuille ne porte qu'un seul écran. */
  window.addEventListener("beforeprint", function () {
    if (accueil) accueil.hidden = false;
    if (cours) cours.hidden = false;
    slides.forEach(function (s) { s.hidden = false; });
    document.querySelectorAll(".feedback").forEach(function (f) {
      f.hidden = false;
      if (!f.textContent.trim()) f.textContent = "Réponse : " + f.getAttribute("data-explication");
    });
  });
  window.addEventListener("afterprint", function () {
    if (accueil) accueil.hidden = courant >= 0 && !cours.hidden;
    slides.forEach(function (s, i) { s.hidden = i !== courant; });
  });
})();
