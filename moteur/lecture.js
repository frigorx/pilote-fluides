/* =====================================================================
   lecture.js — « Écouter cette fiche » : lecture à voix haute du contenu
   ---------------------------------------------------------------------
   ARCHITECTURE DEPUIS LE 6 AOÛT 2026
   Ce module continue d'appeler l'API standard SpeechSynthesis. La couche
   commune `voix.js` intercepte cet appel : si le texte visible possède
   un MP3 local à jour, elle le lit ; sinon la voix du navigateur prend
   le relais. La clé inclut le texte normalisé, donc une correction de
   contenu ne peut jamais déclencher un ancien enregistrement.

   CE QUE ÇA SERT — une aide à la lecture pour le public FLE / DYS visé
   par le pack ([[feedback_accessibilite_cap]]), en complément de la
   future police adaptable (REPRISE § 6, non codée). Un bouton, jamais
   un déclenchement automatique — même règle que le son des planches.

   CE QUE ÇA NE GARANTIT PAS — tant que le lot n'a pas reçu son bon à
   tirer métier, la synthèse locale reste une aide à la lecture et non
   une narration officielle. Le repli dépend de l'appareil du lecteur.
   ===================================================================== */
(function () {
  "use strict";
  if (!window.speechSynthesis) return; // navigateur trop ancien : rien ne se propose

  var RANG = ["google", "natural", "naturel", "denise", "henri", "julie", "paul", "hortense"];
  var enLecture = null; // le bouton actuellement en lecture, ou null

  function meilleureVoixFr() {
    var toutes = window.speechSynthesis.getVoices() || [];
    var fr = toutes.filter(function (v) { return /^fr/i.test(v.lang); });
    for (var i = 0; i < RANG.length; i++) {
      var cle = RANG[i];
      var v = fr.find(function (x) { return x.name.toLowerCase().indexOf(cle) !== -1; });
      if (v) return v;
    }
    return fr[0] || null;
  }

  /* Le texte à lire : titre puis corps puis blocs, HTML retiré. Les notes
     formateur ne sont de toute façon jamais dans le build élève, mais on
     les exclut explicitement ici aussi — cette fonction ne doit jamais
     dépendre de ce qui a été purgé ailleurs.

     `textContent` ne respecte PAS les limites de blocs : "<p>A</p><p>B</p>"
     donne "AB" collés, pas "A B". Les fiches sont écrites en `<p>` sans
     espace entre eux (concaténation de chaînes dans cartes.js) — sans ce
     correctif, la voix enchaînait « ce module.C'est le scénario » sans
     pause. On force un espace après chaque fermeture de bloc AVANT de
     parser, pendant que c'est encore du texte et non du DOM. */
  function espaceLesBlocs(html) {
    return String(html).replace(/<\/(p|li|div|h[1-6]|blockquote|td|tr)>/gi, "</$1> ");
  }
  function texteDe(carte) {
    var brut = espaceLesBlocs(
      (carte.titre || "") + ". " +
      (carte.corps || "") + " " +
      (carte.blocs || []).map(function (b) {
        return (b.t ? b.t + ". " : "") + (b.html || "");
      }).join(" ")
    );
    var d = document.createElement("div");
    d.innerHTML = brut;
    return d.textContent.replace(/\s+/g, " ").trim();
  }

  function arreter() {
    window.speechSynthesis.cancel();
    if (enLecture) { enLecture.classList.remove("actif"); enLecture.textContent = "🔊 Écouter cette fiche"; }
    enLecture = null;
  }

  function lire(bouton, carte) {
    if (enLecture === bouton) { arreter(); return; } // un second clic arrête
    arreter(); // jamais deux lectures en même temps
    var texte = texteDe(carte);
    if (!texte) return;
    var u = new SpeechSynthesisUtterance(texte);
    u.lang = "fr-FR";
    var v = meilleureVoixFr();
    if (v) u.voice = v;
    u.onend = arreter;
    u.onerror = arreter;
    enLecture = bouton;
    bouton.textContent = "⏸ Arrêter la lecture";
    bouton.classList.add("actif");
    window.speechSynthesis.speak(u);
  }

  window.PiloteLecture = {
    disponible: function () { return !!window.speechSynthesis; },
    html: function () {
      return '<button type="button" class="ecouter" data-lecture>🔊 Écouter cette fiche</button>';
    },
    brancher: function (racine, carte) {
      var b = (racine || document).querySelector("[data-lecture]");
      if (b) b.addEventListener("click", function () { lire(b, carte); });
    },
    arreter: arreter,
  };

  // On ne laisse jamais une lecture continuer sur une page qu'on a quittée.
  document.addEventListener("visibilitychange", function () { if (document.hidden) arreter(); });
})();
