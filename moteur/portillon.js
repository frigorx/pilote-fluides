/* =====================================================================
   portillon.js — la porte des pages réservées au formateur
   ---------------------------------------------------------------------
   Sert `formateur.html` et `projection.html`, qui ne chargent leurs
   scripts qu'APRÈS validation : rien ne démarre avant.

   ▶ 27/08/2026 — CE PORTILLON N'EST PLUS UN RIDEAU, IL EST NOMINATIF.
   Avant, il comparait un `djb2` de 32 bits à un code court, le même pour
   tout le monde, donné en salle. C'était assumé comme un rideau. Mais
   depuis que l'espace enseignant est nominatif (AE-4) et que la console
   formateur peut FABRIQUER des séances (AE-5), laisser un code partagé
   devant ces pages, c'était laisser n'importe qui ouvrir des accès au
   nom d'un autre. Le portillon demande donc maintenant un vrai accès
   enseignant : `moteur/acces.js` en est seul juge.

   CE QUE ÇA CHANGE POUR LE VISITEUR : un code court ne fonctionne plus.
   Il faut un code d'accès enseignant délivré par la racine, collé une
   fois sur `activer.html`. L'application élève reste libre, sans code.

   ⚠️ CE QUE ÇA NE PRÉTEND TOUJOURS PAS FAIRE. Les bonnes réponses des
   questions d'entraînement sont en clair dans `pack.eleve.js` — elles
   doivent y être, c'est le navigateur qui corrige. Fermer ces pages ne
   cache donc pas les corrigés ; ça empêche de FABRIQUER en votre nom.
   La vraie confidentialité est ailleurs, et elle y était déjà : les 85
   questions officielles et les 10 sujets vivent dans le dépôt privé
   `habilitation-fluide`, hors ligne. Voir REPRISE § 4.

   API : Portillon.exiger("Titre", ["a.js", "b.js"], fin, "habilitation")
   Le 4e argument est le produit exigé ; « habilitation » par défaut.
   L'écran se superpose à la page (il ne l'écrase pas : `projection.html`
   a besoin de son DOM intact).

   DÉPENDANCE : `moteur/acces.js` doit être chargé AVANT ce fichier. S'il
   manque, on refuse — on ne retombe pas sur un régime plus faible.
   ===================================================================== */
(function () {
  "use strict";

  var PRODUIT_PAR_DEFAUT = "habilitation";

  /* Le seul juge : un accès enseignant rangé pour ce produit. Un code de
     séance ne suffit pas — `estTitulaire` exige le certificat et le
     secret, qu'un élève n'obtient jamais en scannant un QR. */
  function deverrouille(produit) {
    var A = window.inerwebAcces;
    if (!A || typeof A.estTitulaire !== "function") return false;
    try { return A.estTitulaire(produit); } catch (e) { return false; }
  }

  /* Charge les scripts dans l'ordre, puis appelle `fin`. */
  function charger(sources, fin) {
    if (!sources || !sources.length) return fin && fin();
    var s = document.createElement("script");
    s.src = sources[0];
    s.onload = function () { charger(sources.slice(1), fin); };
    s.onerror = function () {
      alert("Fichier introuvable : " + sources[0]);
    };
    document.head.appendChild(s);
  }

  /* Il n'y a plus de champ à remplir : on ne peut pas « taper » un accès
     enseignant, il se colle une fois sur `activer.html` et il est rangé.
     L'écran explique donc, et donne les deux portes. */
  function ecran(titre, produit) {
    var v = document.createElement("div");
    v.id = "portillon";
    v.setAttribute("role", "dialog");
    v.setAttribute("aria-modal", "true");
    v.style.cssText =
      "position:fixed; inset:0; z-index:99999; background:#fff; overflow:auto; " +
      "font-family:system-ui,-apple-system,'Segoe UI',sans-serif; line-height:1.6; color:#1b2430";

    var A = window.inerwebAcces;
    var seance = null;
    try { seance = A && A.accesDe(produit); } catch (e) {}

    /* Le cas qui va se produire souvent : un élève arrive ici depuis un
       lien de séance. Il a un accès, mais pas celui-là. On le dit sans
       le traiter en intrus. */
    var explication = (seance && !deverrouille(produit))
      ? "<p style='color:#5b6472'>Vous avez bien un accès ouvert pour une <b>séance</b>, mais cette page-ci "
        + "est la console du formateur : elle demande un accès <b>enseignant</b>.</p>"
      : "<p style='color:#5b6472'>Cette page est réservée au formateur. Elle s'ouvre avec un "
        + "<b>code d'accès enseignant</b>, délivré nominativement et valable un an.</p>";

    v.innerHTML =
      "<div style='max-width:32em; margin:12vh auto; padding:0 1.5em'>" +
      "<h1 style='font-size:1.4em; margin:0 0 .3em'>🔒 " + titre + "</h1>" +
      explication +
      "<p style='margin:1.4em 0'>" +
      "<a href='activer.html' style='display:inline-block; font-size:1.05em; padding:.55em 1.3em; " +
      "border-radius:999px; background:#1e5fa8; color:#fff; text-decoration:none; font-weight:600'>" +
      "Coller mon code d'accès ▸</a></p>" +
      "<p style='color:#5b6472; font-size:.92em'>Vous n'en avez pas encore ? " +
      "<a href='demander-un-acces.html' style='color:#1e5fa8'>Demander un accès enseignant</a>. " +
      "L'<a href='./' style='color:#1e5fa8'>application élève</a>, elle, reste accessible sans aucun code.</p>" +
      "</div>";
    document.body.appendChild(v);
  }

  window.Portillon = {
    exiger: function (titre, sources, fin, produit) {
      var cible = produit || PRODUIT_PAR_DEFAUT;
      if (deverrouille(cible)) return charger(sources, fin);
      if (document.body) ecran(titre, cible);
      else document.addEventListener("DOMContentLoaded", function () { ecran(titre, cible); });
    },
  };
})();
