/* =====================================================================
   youtube-films.js — LES FILMS D'INERWEB.FR PUBLIÉS SUR YOUTUBE : une seule source
   ---------------------------------------------------------------------
   06/10/2026 — F. Henninot : « les films sont en MP4 sur le site ; on doit
   pouvoir accéder au lien YouTube au fur et à mesure qu'ils vont arriver ».
   UNE LIGNE PAR FILM PUBLIÉ : l'adresse de la page du film, depuis la racine
   du site (celle du bouton « ▶ Le film » du Studio), et l'identifiant de la
   vidéo — les 11 caractères après « watch?v= » dans l'adresse YouTube.
   APRÈS UN AJOUT : node build/retour-accueil.mjs. Il pose « ▶ Voir sur
   YouTube » dans la barre de retour de la page du film, et renouvelle la clé
   de ce fichier sur studio/index.html, dont chaque carte reçoit son bouton.
   La chaîne elle-même : window.INERWEB_YOUTUBE (moteur/reseaux.js).
   ===================================================================== */
window.INERWEB_YOUTUBE_FILMS = {
  "voyage/index.html": "akt37GPk2zs", // Tome 1, le circuit de base (la chaîne en a une 2e mise en ligne : EtOIekNToXo)
  "voyage/nh3.html": "PMiv_xkR2Xk",   // Tome 2, édition NH₃
  "voyage/co2.html": "8Oh_NTCGgec"    // Tome 3, édition CO₂
};

/* Sur le Studio : chaque carte dont le film est publié reçoit « ▶ YouTube »
   à côté de « ▶ Le film ». Ailleurs (et côté build, sans document), rien. */
(function () {
  "use strict";
  if (typeof document === "undefined") return;
  var s = document.currentScript || document.querySelector('script[src*="youtube-films.js"]');
  function poser() {
    var cartes = document.querySelectorAll(".carte .portes");
    if (!cartes.length || !s) return;
    var racine = new URL("..", new URL(s.getAttribute("src"), location.href)).href;
    for (var i = 0; i < cartes.length; i++) {
      var film = null, liens = cartes[i].querySelectorAll("a[href]");
      for (var j = 0; j < liens.length; j++) if (/^▶ Le film/.test(liens[j].textContent.trim())) { film = liens[j]; break; }
      if (!film || cartes[i].querySelector(".yt")) continue;
      var chemin = new URL(film.getAttribute("href"), location.href).href.split(/[?#]/)[0];
      if (chemin.indexOf(racine) !== 0) continue;
      chemin = chemin.slice(racine.length).replace(/(^|\/)$/, "$1index.html");
      var id = window.INERWEB_YOUTUBE_FILMS[chemin];
      if (!id) continue;
      var a = document.createElement("a");
      a.className = "yt";
      a.href = "https://www.youtube.com/watch?v=" + id;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "▶ YouTube";
      a.title = "Ce film sur la chaîne YouTube inerWeb FR (nouvel onglet)";
      film.insertAdjacentElement("afterend", a);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", poser); else poser();
})();
