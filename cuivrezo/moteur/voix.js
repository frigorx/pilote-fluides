/* CuivRézo — la voix des stations.
   CONTRAT : CuivVoix.dire(texte, mp3?) · CuivVoix.couper() · CuivVoix.vitesse(v?) · CuivVoix.surEtat(fn)
   La voix EXPLIQUE, elle ne lit pas l'écran (charte 00-charte/VOIX-ET-NARRATION.md).
   Elle part au clic, jamais seule au chargement.
   Deux sources, dans cet ordre : le MP3 fabriqué s'il existe, sinon la voix du poste.
   On ne teste pas la présence du MP3 par une requête (file:// interdit fetch) : on tente
   de le jouer, son erreur fait basculer. Jamais une voix non française (jamais voices[0]).
   Réglage de vitesse 0,6 à 1,4, défaut 0,95, même clé de session que le site. */

const CuivVoix = (() => {
  'use strict';
  const CLE = 'pilote-voix-vitesse';
  let vitesse = 0.95, lecteur = null, tour = 0, ecouteur = () => {}, mp3Absent = false;
  try { const v = parseFloat(sessionStorage.getItem(CLE)); if (v >= 0.6 && v <= 1.4) vitesse = v; } catch (e) {}

  function voixFrancaise() {
    if (!('speechSynthesis' in window)) return null;
    const fr = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('fr'));
    /* piège payé sur AéroRézo : les voix neuronales d'abord, sinon la plus ancienne gagne */
    return fr.find(v => /natural|neural|online|wavenet|studio/i.test(v.name)) || fr[0] || null;
  }
  if ('speechSynthesis' in window) speechSynthesis.getVoices();

  function etat(e) { try { ecouteur(e); } catch (x) {} }

  /* le texte de la voix, dans la bulle discrète (moteur/sous-titres.js, copie de celle du site) */
  const bulle = (methode, ...args) => { if (window.PiloteSousTitres) window.PiloteSousTitres[methode](...args); };

  function couper() {
    tour++;
    if (lecteur) { lecteur.pause(); lecteur = null; }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    bulle('cacher');
    etat('arret');
  }

  function auPoste(texte, t) {
    const v = voixFrancaise();
    if (!v) { etat('indisponible'); return; }
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = 'fr-FR'; u.rate = vitesse; u.voice = v;
    u.onstart = () => { if (t === tour) { etat('parle'); bulle('montrer', texte, { debit: vitesse }); } };
    u.onend = u.onerror = () => { if (t === tour) { etat('arret'); bulle('cacher'); } };
    speechSynthesis.speak(u);
  }

  function dire(texte, mp3) {
    texte = (texte || '').trim();
    if (!texte) return;
    couper();
    const t = ++tour;
    if (mp3 && !mp3Absent) {
      const a = new Audio(mp3);
      a.playbackRate = vitesse;
      a.addEventListener('playing', () => { if (t === tour) { etat('parle'); bulle('montrer', texte, { audio: a }); } });
      a.addEventListener('ended', () => { if (t === tour) { lecteur = null; etat('arret'); bulle('cacher'); } });
      a.addEventListener('error', () => {
        if (t !== tour) return;
        lecteur = null; mp3Absent = true;   /* pas de fichier ici : repli pour toute la séance */
        auPoste(texte, t);
      });
      lecteur = a;
      a.play().catch(() => {});
      return;
    }
    auPoste(texte, t);
  }

  function reglerVitesse(v) {
    if (v === undefined) return vitesse;
    vitesse = Math.min(1.4, Math.max(0.6, v));
    try { sessionStorage.setItem(CLE, String(vitesse)); } catch (e) {}
    if (lecteur) lecteur.playbackRate = vitesse;        /* le MP3 change sans s'interrompre */
    else if ('speechSynthesis' in window && speechSynthesis.speaking) couper(); /* le poste ne sait pas : on arrête */
    return vitesse;
  }

  function parle() {
    return !!(lecteur && !lecteur.paused) || ('speechSynthesis' in window && speechSynthesis.speaking);
  }

  return { dire, couper, vitesse: reglerVitesse, parle, surEtat: fn => { ecouteur = fn; } };
})();
