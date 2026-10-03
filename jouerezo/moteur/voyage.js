/* =====================================================================
   voyage.js — le lecteur de « Voyage dans tous ses états » (la page)
   ---------------------------------------------------------------------
   RÔLE : jouer les chapitres l'un après l'autre (voix phrase par phrase,
   sous-titre sous l'image), poser la question du chapitre, compter les
   bonnes réponses du premier coup, finir par le panneau commun de
   JouéRézo (code de partie). Sans son, tout reste lisible au même rythme.
   ENTRÉES : window.VOYAGE_RECIT, voyage/voix/pistes.json, les vues
   d'organes du Tome 3 (chargées par les scènes).
   MODE IMAGE : ?image=<scène>&k=<phrase>&f=<0..1> (ou &t=<s>) rend une
   seule image plein cadre, sans interface — pour le livret.
   DÉPEND : commun.js (JR), voyage-dessin, voyage-theatre, voyage-scenes-a/b/c.
   ===================================================================== */
(function () {
  "use strict";
  const R = window.VOYAGE_RECIT;
  window.JR_JEUX = window.JR_JEUX || {};
  window.JR_JEUX.voyage = { nom: R.titre, lettre: "V", emoji: "🧳" };
  const ecrit = p => Array.isArray(p) ? p[0] : p;

  async function charger() {
    return { pistes: await fetch("voyage/voix/pistes.json").then(r => r.json()) };
  }

  function modeImage(res) {
    document.body.classList.add("vy-image");
    document.body.innerHTML = '<svg id="vy-svg" xmlns="http://www.w3.org/2000/svg"></svg>';
    const th = window.VOYAGE_THEATRE.creer(document.getElementById("vy-svg"), { recit: R, pistes: res.pistes });
    const i = R.scenes.findIndex(s => s.id === JR.param("image")), h = th.scenes[i];
    const k = Number(JR.param("k") || 0), f = Number(JR.param("f") || 0.5);
    th.rendre(i, JR.param("t") !== null ? Number(JR.param("t")) : h.T[k] + f * (h.E[k] - h.T[k]));
    document.body.setAttribute("data-pret", "1");
  }

  function lecteur(res) {
    JR.enTete(R.titre);
    const main = document.getElementById("jeu");
    main.innerHTML =
      '<section class="vy">' +
      '<h1 class="sr">' + JR.esc(R.titre) + '</h1>' +
      '<p class="vy-tourner">Tournez le téléphone : l\'animation sera plus grande.</p>' +
      '<div class="vy-cadre"><svg id="vy-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animation : le voyage d\'une molécule dans le circuit frigorifique"></svg>' +
      '<button type="button" class="vy-depart btn">▶ Commencer le voyage</button></div>' +
      '<p class="vy-sous" aria-live="polite"></p>' +
      '<div class="vy-question carte" hidden></div>' +
      '<div class="vy-commandes">' +
      '<button type="button" class="btn sec vy-prec" aria-label="Chapitre précédent">⏮</button>' +
      '<button type="button" class="btn vy-lire">⏸ Pause</button>' +
      '<button type="button" class="btn sec vy-suiv" aria-label="Chapitre suivant">⏭</button>' +
      '<button type="button" class="btn sec vy-voix" aria-pressed="true">🔊 Voix</button></div>' +
      '<nav class="vy-chapitres" aria-label="Chapitres">' +
      R.scenes.map((s, i) => '<button type="button" class="vy-chap" data-i="' + i + '">' + JR.esc((s.num ? s.num + " · " : "") + s.titre) + '</button>').join("") +
      '</nav>' +
      '<section class="carte vy-apropos"><h2>Pour l\'enseignant</h2>' +
      '<p><strong>' + JR.esc(R.referentiel.diplome) + '</strong> — tâches : ' + R.referentiel.taches.map(x => '<abbr title="' + JR.esc(x[1]) + '">' + x[0] + '</abbr>').join(", ") +
      ' · savoirs : ' + R.referentiel.savoirs.map(x => '<abbr title="' + JR.esc(x[1]) + '">' + x[0] + '</abbr>').join(", ") + '.</p>' +
      '<ul class="portes">' + R.portes.map(p => '<li><a href="' + JR.esc(p.h) + '">' + JR.esc(p.t) + '</a></li>').join("") + '</ul>' +
      '<p class="legende">' + JR.esc(R.credit) + '</p></section>' +
      '</section>';
    const $ = s => main.querySelector(s);
    const th = window.VOYAGE_THEATRE.creer($("#vy-svg"), { recit: R, pistes: res.pistes });
    const audio = new Audio();
    let i = 0, t = 0, joue = false, voix = true, k = -1, avant = 0, attente = false;
    const reponses = {};

    function phraseA(tt) { const h = th.scenes[i]; let n = -1; for (let j = 0; j < h.T.length; j++) if (tt >= h.T[j] - 0.15) n = j; return n; }
    function sous() {
      const h = th.scenes[i], n = phraseA(t);
      $(".vy-sous").textContent = n >= 0 && t < h.E[n] + 1.2 ? ecrit(R.scenes[i].phrases[n]) : "";
    }
    function son(depuis) {
      audio.pause();
      if (!voix || k < 0) return;
      const h = th.scenes[i], dans = t - h.T[k];
      if (dans < 0 || t > h.E[k]) return;
      audio.src = "voyage/voix/" + res.pistes[R.scenes[i].id + "-" + k].f;
      audio.currentTime = depuis ? dans : 0;
      audio.play().catch(() => {});
    }
    function boucle(now) {
      if (joue) {
        t += Math.min(0.1, (now - avant) / 1000);
        const n = phraseA(t);
        if (n !== k) { k = n; son(false); }
        if (t >= th.scenes[i].D) { t = th.scenes[i].D; fin(); }
      }
      avant = now;
      th.rendre(i, t);
      sous();
      requestAnimationFrame(boucle);
    }
    function etat() {
      $(".vy-lire").textContent = joue ? "⏸ Pause" : "▶ Lecture";
      main.querySelectorAll(".vy-chap").forEach((b, j) => b.setAttribute("aria-current", j === i ? "step" : "false"));
    }
    function lire(oui) { joue = oui; if (oui) son(true); else audio.pause(); etat(); }
    function aller(j) {
      i = Math.max(0, Math.min(R.scenes.length - 1, j)); t = 0; k = -1; attente = false;
      $(".vy-question").hidden = true;
      lire(true);
    }
    function fin() {
      lire(false);
      const s = R.scenes[i];
      if (!s.question) { if (i < R.scenes.length - 1) aller(i + 1); return; }
      if (attente) return;
      attente = true;
      poser(s);
    }
    function poser(s) {
      const q = s.question, z = $(".vy-question"), choix = JR.melanger(q.choix.slice());
      z.hidden = false;
      z.innerHTML = '<h2>' + JR.esc(q.q) + '</h2><div class="vy-choix">' +
        choix.map((c, n) => '<button type="button" class="btn sec" data-n="' + n + '">' + JR.esc(c[0]) + '</button>').join("") + '</div><p class="vy-retour" aria-live="polite"></p>';
      z.querySelectorAll(".vy-choix button").forEach(b => b.addEventListener("click", function () {
        const bon = choix[Number(b.dataset.n)][1] === 1;
        if (reponses[s.id] === undefined) reponses[s.id] = bon;
        b.classList.add(bon ? "ok" : "nok");
        b.textContent = (bon ? "✓ " : "✗ ") + b.textContent.replace(/^[✓✗] /, "");
        if (bon) { JR.sons.ok(); } else { JR.sons.nok(); return; }
        z.querySelectorAll(".vy-choix button").forEach(x => { x.disabled = true; });
        z.querySelector(".vy-retour").innerHTML = JR.esc(q.pourquoi) + ' <button type="button" class="btn vy-continuer">Continuer ▶</button>';
        z.querySelector(".vy-continuer").addEventListener("click", function () {
          if (i < R.scenes.length - 1) { aller(i + 1); return; }
          const total = R.scenes.filter(x => x.question).length, score = Object.values(reponses).filter(Boolean).length;
          audio.pause();
          JR.fin({ jeu: "voyage", theme: { id: "etats", nom: "", portes: R.portes }, score: score, total: total, unite: "du premier coup",
            texte: "Vous avez fait le tour complet du circuit, et même au-delà.", rejouer: () => location.reload() });
        });
        z.querySelector(".vy-continuer").focus();
      }));
      z.querySelector("h2").setAttribute("tabindex", "-1");
      z.querySelector("h2").focus();
    }

    $(".vy-depart").addEventListener("click", function () { this.remove(); aller(0); });
    $(".vy-lire").addEventListener("click", () => { if (!attente) lire(!joue); });
    $(".vy-prec").addEventListener("click", () => aller(t > 3 ? i : i - 1));
    $(".vy-suiv").addEventListener("click", () => aller(i + 1));
    $(".vy-voix").addEventListener("click", function () {
      voix = !voix;
      this.setAttribute("aria-pressed", String(voix));
      this.textContent = voix ? "🔊 Voix" : "🔇 Sans voix";
      if (voix && joue) son(true); else audio.pause();
    });
    main.querySelectorAll(".vy-chap").forEach(b => b.addEventListener("click", () => aller(Number(b.dataset.i))));
    etat();
    requestAnimationFrame(n => { avant = n; boucle(n); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    charger().then(res => (JR.param("image") ? modeImage(res) : lecteur(res))).catch(e => {
      document.getElementById("jeu").innerHTML = '<p class="carte nok">Le voyage n\'a pas pu se charger (' + JR.esc(e.message) + ').</p>';
    });
  });
})();
