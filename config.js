/* Configuration runtime d'inerWeb Pilote (build élève).
   scoring_url : URL du Web App Google Apps Script qui corrige les examens
   côté serveur (le corrigé ne quitte jamais le serveur). Laisser vide
   tant que la phase 2 n'est pas déployée -> score calculé localement. */
window.PILOTE_CONFIG = {
  scoring_url: ""   // ex : "https://script.google.com/macros/s/AKfyc.../exec"
};
