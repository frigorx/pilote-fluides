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

  /* ---- le MP3 fabriqué d'un texte (outils/fabriquer-voix.py → voix/<clé>.mp3, donnees/voix-index.js)
     Clé = sha1 du texte normalisé, 12 premiers caractères hexadécimaux, le MÊME calcul que l'outil Python.
     sha1 écrit ici, synchrone, plutôt que SubtleCrypto : celui-ci est asynchrone (le clic n'est plus
     « dans le geste », la tablette refuse de jouer) et absent en http hors localhost (réseau de la classe).
     Le chemin de l'index part de la racine du réseau, qu'on déduit de l'URL de CE script (moteur/voix.js,
     un dossier sous la racine) : c'est vrai depuis l'accueil comme depuis stations/<id>/, en file:// comme en ligne. */
  const RACINE = (() => { try { return new URL('../', document.currentScript.src).href; } catch (e) { return ''; } })();

  function sha1hex(texte) {
    const oct = new TextEncoder().encode(texte), n = oct.length;
    const mots = new Uint32Array(((n + 8 >> 6) + 1) * 16);      /* remplissage : 0x80, zéros, longueur en bits sur 64 bits */
    for (let i = 0; i < n; i++) mots[i >> 2] |= oct[i] << (24 - 8 * (i & 3));
    mots[n >> 2] |= 0x80 << (24 - 8 * (n & 3));
    mots[mots.length - 1] = n * 8;                              /* les textes font bien moins de 512 Mo : le mot de poids fort reste 0 */
    let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
    const w = new Uint32Array(80), rot = (x, k) => (x << k) | (x >>> (32 - k));
    for (let b = 0; b < mots.length; b += 16) {
      for (let i = 0; i < 16; i++) w[i] = mots[b + i];
      for (let i = 16; i < 80; i++) w[i] = rot(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
      let a = h0, bb = h1, c = h2, d = h3, e = h4;
      for (let i = 0; i < 80; i++) {
        const f = i < 20 ? (bb & c) | (~bb & d) : i < 40 ? bb ^ c ^ d : i < 60 ? (bb & c) | (bb & d) | (c & d) : bb ^ c ^ d;
        const k = i < 20 ? 0x5A827999 : i < 40 ? 0x6ED9EBA1 : i < 60 ? 0x8F1BBCDC : 0xCA62C1D6;
        const t = (rot(a, 5) + f + e + k + w[i]) | 0;
        e = d; d = c; c = rot(bb, 30); bb = a; a = t;
      }
      h0 = (h0 + a) | 0; h1 = (h1 + bb) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
    }
    return [h0, h1, h2, h3, h4].map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
  }

  function mp3Fabrique(texte) {
    const index = window.CUIVREZO_VOIX;
    if (!index || !RACINE) return null;
    const chemin = index[sha1hex(texte.replace(/[ \t\r\n\f\v  ]+/g, ' ').trim()).slice(0, 12)];
    return chemin ? RACINE + chemin : null;
  }

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
    if (!mp3) mp3 = mp3Fabrique(texte);   /* pas de MP3 donné : celui de l'index, s'il existe pour ce texte */
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
