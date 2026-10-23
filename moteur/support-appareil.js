(function () {
  "use strict";
  // 23/10/2026 : remplacé par moteur/appareils.js (source unique, chargé par retour-accueil.js sur
  // toutes les pages). Ce fichier, encore appelé par 25 cours, ne fait plus rien.
  return;

  function installer() {
    var support = document.querySelector('meta[name="inerweb-support"]');
    if (!support || support.content !== "pc-tablette" || document.getElementById("inerweb-support-appareil")) return;

    var panneau = document.createElement("aside");
    panneau.id = "inerweb-support-appareil";
    panneau.className = "inerweb-support-appareil";
    panneau.setAttribute("role", "note");
    panneau.setAttribute("aria-label", "Conseil pour cet appareil");
    panneau.innerHTML =
      '<div><strong>Pour en profiter pleinement : PC ou tablette</strong>' +
      '<p>Le téléphone convient à la consultation. Pour manipuler les schémas, lire tous les repères et réaliser les activités sans perte pédagogique, utilisez un écran plus large.</p></div>' +
      '<button type="button" aria-label="Fermer ce conseil">Fermer</button>';

    panneau.querySelector("button").addEventListener("click", function () {
      panneau.hidden = true;
    });
    document.body.appendChild(panneau);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installer, { once: true });
  else installer();
}());
