/* Le jeu du chalumeau — le SON, fait de bruit filtré (aucun fichier audio).
   Grondement de la flamme (grave, suit le débit), sifflement de la flamme oxydante ou du gaz qui
   s'échappe (aigu), claquement (coup sourd), « pfff » d'une bouteille qu'on fait cracher.
   Le contexte audio ne naît qu'au premier geste de l'élève (règle des navigateurs). */
window.Son = (() => {
  'use strict';
  let ac, gGrond, gSiffle, bruit, oui = true;
  function init() {
    if (ac || !oui) return;
    try {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      bruit = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const d = bruit.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource(); src.buffer = bruit; src.loop = true;
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
      const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3800;
      gGrond = ac.createGain(); gSiffle = ac.createGain(); gGrond.gain.value = 0; gSiffle.gain.value = 0;
      src.connect(lp).connect(gGrond).connect(ac.destination);
      src.connect(hp).connect(gSiffle).connect(ac.destination);
      src.start();
    } catch (e) { ac = null; }
  }
  function regler(grond, siffle) {
    if (!ac) return;
    const t = ac.currentTime;
    gGrond.gain.setTargetAtTime(oui ? grond : 0, t, .08);
    gSiffle.gain.setTargetAtTime(oui ? siffle : 0, t, .08);
  }
  function coup(duree, coupure, type, fort) {
    if (!ac || !oui) return;
    const src = ac.createBufferSource(); src.buffer = bruit;
    const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = coupure;
    const g = ac.createGain(), t = ac.currentTime;
    g.gain.setValueAtTime(fort, t); g.gain.exponentialRampToValueAtTime(.001, t + duree);
    src.connect(f).connect(g).connect(ac.destination); src.start(t); src.stop(t + duree + .05);
  }
  return {
    init, regler,
    claque: () => coup(.25, 900, 'lowpass', 1.2),
    pfff: () => coup(.6, 2500, 'highpass', .5),
    basculer() { oui = !oui; if (oui) init(); if (!oui) regler(0, 0); return oui; },
    get actif() { return oui; }
  };
})();
