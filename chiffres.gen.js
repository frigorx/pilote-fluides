/* COMPTEURS DU DOSSIER — générés par build/chiffres.mjs. NE PAS éditer à la main.
   Les pages portent des <span data-ch="clé"></span> que ce fichier remplit. */
window.PILOTE_CHIFFRES = {
 "fiches": 44,
 "questions": 266,
 "diapositives": 504,
 "planches": 44,
 "exercices": 5,
 "examens": 22,
 "documents": 38,
 "journees": 5,
 "heures": "35 h",
 "heures_salle": "21 h 25",
 "heures_plateau": "13 h 35",
 "part_pratique": "39 %",
 "autoformation": "7 h 50",
 "epreuve": "4 h 15",
 "couverture": "100 %",
 "profondeur": "94 / 94",
 "competences": "99",
 "tracabilite": "94 / 94",
 "poids": "701 Ko"
};
document.addEventListener('DOMContentLoaded', function () {
  var n = 0;
  Array.prototype.forEach.call(document.querySelectorAll('[data-ch]'), function (e) {
    var v = window.PILOTE_CHIFFRES[e.getAttribute('data-ch')];
    if (v !== undefined) { e.textContent = v; n++; }
    else e.textContent = '—';
  });
  if (window.console && window.location.protocol !== 'https:') console.log('chiffres injectés : ' + n);
});
