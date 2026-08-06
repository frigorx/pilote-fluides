/* =====================================================================
   voix.js — narration commune de Pilote Fluides
   ---------------------------------------------------------------------
   Les cours historiques utilisent SpeechSynthesis directement. Ce moteur
   conserve cette API, mais remplace une lecture connue par son fichier
   audio local. Un texte modifié ou absent de l'index retombe sur la voix
   du navigateur : le cours ne dépend donc jamais du lot audio.

   Aucun son n'est lancé ici. Une lecture commence uniquement lorsqu'un
   module appelle speechSynthesis.speak() après une action humaine.
   ===================================================================== */
(function () {
  "use strict";

  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;

  var synth = window.speechSynthesis;
  var script = document.currentScript;
  var scriptUrl = script && script.src ? new URL(script.src, window.location.href) : null;
  var audioBase = scriptUrl
    ? new URL("../packs/fluides/res/voix/", scriptUrl)
    : new URL("packs/fluides/res/voix/", window.location.href);
  var index = window.PILOTE_VOIX_INDEX || { entrees: {} };
  var entries = index.entrees || {};

  var nativeSpeak = synth.speak.bind(synth);
  var nativeCancel = synth.cancel.bind(synth);
  var nativePause = synth.pause.bind(synth);
  var nativeResume = synth.resume.bind(synth);

  var active = null;
  var run = 0;
  var lastMode = "inactif";
  var lastKey = null;

  function visibleText(value) {
    var raw = String(value == null ? "" : value);
    if (raw.indexOf("<") === -1 && raw.indexOf("&") === -1) return raw;
    var node = document.createElement("div");
    node.innerHTML = raw.replace(/<\/(p|li|div|h[1-6]|blockquote|td|tr)>/gi, "</$1> ");
    return node.textContent || "";
  }

  function normalizeText(value) {
    return visibleText(value)
      .replace(/[\u00A0\u202F]/g, " ")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  }

  function textKey(value) {
    var text = normalizeText(value);
    var hash = 0x811c9dc5;
    for (var i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0") + "-" + text.length;
  }

  function callHandler(utterance, name, detail) {
    var handler = utterance && utterance[name];
    if (typeof handler !== "function") return;
    window.setTimeout(function () {
      try { handler.call(utterance, detail || { type: name.slice(2) }); } catch (_) { /* le module garde la main */ }
    }, 0);
  }

  function clearAudio(reason) {
    if (!active) return;
    var current = active;
    active = null;
    current.audio.onplaying = null;
    current.audio.onended = null;
    current.audio.onerror = null;
    current.audio.pause();
    current.audio.removeAttribute("src");
    try { current.audio.load(); } catch (_) { /* nettoyage facultatif */ }
    lastMode = "inactif";
    if (reason) callHandler(current.utterance, "onerror", { type: "error", error: reason });
  }

  function fallbackToNative(utterance) {
    clearAudio();
    lastMode = "natif";
    lastKey = textKey(utterance.text);
    nativeSpeak(utterance);
  }

  function speakRecorded(utterance, entry) {
    var localRun = ++run;
    var audio = new Audio(new URL(typeof entry === "string" ? entry : entry.fichier, audioBase).href);
    var requestedRate = Number(utterance.rate);
    var started = false;
    audio.preload = "auto";
    audio.playbackRate = Number.isFinite(requestedRate) && requestedRate > 0 ? requestedRate : 1;
    audio.preservesPitch = true;
    audio.volume = Number.isFinite(Number(utterance.volume)) ? Number(utterance.volume) : 1;

    active = { audio: audio, utterance: utterance, run: localRun };
    lastMode = "audio-local";
    lastKey = textKey(utterance.text);

    audio.onplaying = function () {
      if (!active || active.run !== localRun) return;
      if (started) return;
      started = true;
      callHandler(utterance, "onstart", { type: "start" });
    };
    audio.onended = function () {
      if (!active || active.run !== localRun) return;
      active = null;
      lastMode = "inactif";
      callHandler(utterance, "onend", { type: "end" });
    };
    audio.onerror = function () {
      if (!active || active.run !== localRun) return;
      active = null;
      fallbackToNative(utterance);
    };

    var play = audio.play();
    if (play && typeof play.catch === "function") {
      play.catch(function () {
        if (!active || active.run !== localRun) return;
        active = null;
        fallbackToNative(utterance);
      });
    }
  }

  function speak(utterance) {
    if (!utterance) return;
    var entry = entries[textKey(utterance.text)];
    if (!entry) {
      fallbackToNative(utterance);
      return;
    }
    nativeCancel();
    clearAudio("interrupted");
    speakRecorded(utterance, entry);
  }

  function cancel() {
    run += 1;
    clearAudio("canceled");
    nativeCancel();
  }

  function pause() {
    if (active) {
      active.audio.pause();
      callHandler(active.utterance, "onpause", { type: "pause" });
      return;
    }
    nativePause();
  }

  function resume() {
    if (active) {
      var current = active;
      var play = current.audio.play();
      if (play && typeof play.then === "function") {
        play.then(function () {
          if (active === current) callHandler(current.utterance, "onresume", { type: "resume" });
        }).catch(function () {
          if (active === current) fallbackToNative(current.utterance);
        });
      }
      return;
    }
    nativeResume();
  }

  function patch(name, value) {
    try {
      Object.defineProperty(synth, name, { configurable: true, writable: true, value: value });
      return synth[name] === value;
    } catch (_) {
      try { synth[name] = value; return synth[name] === value; } catch (__) { return false; }
    }
  }

  var patched = patch("speak", speak);
  patch("cancel", cancel);
  patch("pause", pause);
  patch("resume", resume);

  window.PiloteVoix = {
    version: "1.0.0",
    audioDisponible: patched,
    nombreNarrations: Object.keys(entries).length,
    normaliser: normalizeText,
    cle: textKey,
    arreter: cancel,
    parleAvecAudioLocal: function (text) { return !!entries[textKey(text)]; },
    etat: function () { return { mode: lastMode, cle: lastKey, actif: !!active }; }
  };

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancel();
  });
  window.addEventListener("beforeunload", cancel);
})();
