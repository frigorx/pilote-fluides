/* =====================================================================
   voyage-theatre.js — la scène commune de « Voyage dans tous ses états »
   ---------------------------------------------------------------------
   RÔLE : poser le décor commun (fond, en-tête de chapitre, carte « où je
   suis » avec les huit organes réels, sous-titres en mode film), montrer
   l'organe EN VRAI pendant les `pres` premières phrases (vue isolée du
   Tome 3, léger zoom), puis plonger dans la coupe ; calculer l'horaire de
   chaque scène à partir des durées de voix ; rendre UNE image pour un
   instant donné.
   API : VOYAGE_THEATRE.creer(svg, { recit, pistes, film })
     → { scenes:[{id, T, E, D}], aller(i), rendre(i, t), rendreFilm(t), duree }
   T[k]/E[k] = début/fin de la phrase k dans la scène ; D = durée de scène.
   DÉPEND : VOYAGE_DESSIN, VOYAGE_SCENES (moteur/voyage-scenes-*.js).
   PIÈGE : tout est fonction pure de t — revenir en arrière dans le film
   reconstruit la scène, aucun état n'est gardé d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const ECART = 0.45, DEBUT = 1.2, DEBUT_INTRO = 4.2, FIN_SCENE = 1.6, FIN = 6;
  const COUL = { BP: D.BLEU, HP: D.ORANGE, froid: "#2f6fb8", chaud: "#c0392b", fuite: "#c0392b", recup: "#1e7e54", liq: "#2f6fb8" };

  function horaire(s, pistes) {
    let t = s.id === "intro" ? DEBUT_INTRO : DEBUT;
    const T = [], E = [];
    s.phrases.forEach((p, k) => {
      const d = pistes[s.id + "-" + k].d;
      T.push(t); E.push(t + d); t += d + ECART;
    });
    return { id: s.id, T: T, E: E, D: t - ECART + FIN_SCENE };
  }
  const ecrit = p => Array.isArray(p) ? p[0] : p;
  function couper(s, max) {
    const l = [""];
    s.split(" ").forEach(m => { if ((l[l.length - 1] + " " + m).trim().length > max) l.push(m); else l[l.length - 1] = (l[l.length - 1] + " " + m).trim(); });
    return l;
  }

  function creer(svg, o) {
    const R = o.recit, H = o.film ? 900 : 770;
    svg.setAttribute("viewBox", "0 0 1600 " + H);
    svg.innerHTML = "";
    D.defs(svg);
    D.el("rect", { width: 1600, height: H, fill: D.CREME }, svg);
    const scene = D.el("g", {}, svg), vitrine = D.el("g", {}, svg), haut = D.el("g", {}, svg), carte = D.el("g", {}, svg), bas = D.el("g", {}, svg);
    const scenes = R.scenes.map(s => horaire(s, o.pistes));
    let courant = -1, maj = null, mini = null, majMini = null, sousTitre = null, vue = null, finVue = 0;

    function poserCarte(s) { // la carte « où je suis » : les huit organes, la molécule dessus
      carte.innerHTML = ""; mini = null;
      if (!s.carte) return;
      D.el("rect", { x: 1206, y: 14, width: 380, height: 268, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, carte);
      mini = D.circuit(carte, 1222, 20, 348, false);
      if (s.organe) mini.surligne(s.organe, true);
      majMini = D.heroine(carte, { r: 30 });
      const rang = D.el("g", {}, carte);
      let x = 0;
      (s.puces || []).forEach((p, k) => {
        if (k) { D.texte(rang, x + 6, 268, /BP|HP/.test(s.puces[0][0]) && /BP|HP/.test(p[0]) ? "→" : "·", { "font-size": 28, fill: D.BLEU, "font-weight": 700 }); x += 34; }
        x += D.pastille(rang, x, 266, p[1], COUL[p[0]] || D.BLEU, 24).largeur;
      });
      const kx = Math.min(1, 352 / Math.max(1, x));
      rang.setAttribute("transform", "translate(" + (1396 - x * kx / 2).toFixed(1) + " " + (266 * (1 - kx)).toFixed(1) + ") scale(" + kx.toFixed(3) + ")");
    }
    function poserHaut(s) {
      haut.innerHTML = "";
      let x = 40;
      if (s.num) {
        D.el("circle", { cx: 84, cy: 76, r: 44, fill: D.BLEU }, haut);
        D.texte(haut, 84, 93, s.num, { "text-anchor": "middle", fill: "#fff", "font-size": s.num.length > 1 ? 40 : 50, "font-weight": 700, "font-family": "Trebuchet MS, Arial, sans-serif" });
        x = 148;
      }
      D.texte(haut, x, 78, s.titre, { fill: D.BLEU, "font-size": 50, "font-weight": 700, "font-family": "Trebuchet MS, Arial, sans-serif" });
      D.texte(haut, x, 124, s.sous, { fill: D.ORANGE, "font-size": 34, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
    }
    function poserVitrine(s, h) { // l'organe en vrai, avant d'entrer dedans
      vitrine.innerHTML = ""; vue = null; finVue = 0;
      if (!s.organe || !s.pres) return;
      vue = D.el("g", {}, vitrine);
      D.el("rect", { x: 250, y: 158, width: 930, height: 548, rx: 26, fill: "#fff", stroke: "rgba(27,58,99,.2)", "stroke-width": 2 }, vue);
      D.image(vue, s.organe, 276, 176, 878, 512);
      D.pastille(vitrine, 715, 748, D.ORGANES[s.organe].nom + " : " + s.role, D.BLEU, 32, "middle");
      finVue = h.E[s.pres - 1] + 0.35;
    }
    function poserBas() {
      bas.innerHTML = ""; sousTitre = null;
      if (!o.film) return;
      D.el("rect", { x: 50, y: 782, width: 1500, height: 104, rx: 20, fill: "#fffdf8", stroke: "rgba(27,58,99,.22)", "stroke-width": 2 }, bas);
      sousTitre = D.el("g", {}, bas);
    }

    function aller(i) {
      if (i === courant) return;
      courant = i;
      scene.innerHTML = "";
      const s = R.scenes[i], h = scenes[i];
      poserHaut(s); poserCarte(s); poserVitrine(s, h); poserBas();
      const ctx = { T: h.T, E: h.E, D: h.D, A: (k, f) => h.T[k] + (f || 0) * (h.E[k] - h.T[k]), film: !!o.film, recit: R };
      maj = window.VOYAGE_SCENES[s.id](scene, ctx);
    }
    let derniereLigne = "";
    function rendre(i, t) {
      aller(i);
      const s = R.scenes[i], h = scenes[i];
      const r = maj(t) || {};
      const fondu = o.film ? D.fenetre(t, 0, h.D, 0.5) : 1;
      let dedans = 1;
      if (vue) { // la vitrine grossit puis s'efface : on entre dans l'organe
        dedans = D.lisse((t - finVue + 0.2) / 0.9);
        const z = 1 + 0.05 * D.borne(t / finVue, 0, 1) + 0.8 * dedans;
        vue.setAttribute("transform", "translate(715 432) scale(" + z.toFixed(3) + ") translate(-715 -432)");
        vitrine.setAttribute("opacity", (fondu * (1 - dedans)).toFixed(3));
      }
      scene.setAttribute("opacity", (fondu * dedans).toFixed(3));
      if (mini) {
        const w = r.carte !== undefined && t > finVue ? r.carte : s.carte[0] + (s.carte[1] - s.carte[0]) * (t > finVue ? D.lisse((t - finVue) / (h.D - finVue)) : 0);
        const [x, y] = mini.ecran(...D.circuitPoint(w));
        majMini({ x: x, y: y, s: 0.6, t: t, temp: r.temp, etat: r.etat, humeur: r.humeur });
      }
      if (sousTitre) {
        let k = -1;
        for (let m = 0; m < h.T.length; m++) if (t >= h.T[m] - 0.15) k = m;
        const ligne = k >= 0 && t < h.E[k] + ECART + 0.3 ? ecrit(s.phrases[k]) : "";
        if (ligne !== derniereLigne) {
          derniereLigne = ligne;
          sousTitre.innerHTML = "";
          const l = couper(ligne, 74);
          D.lignes(sousTitre, 800, l.length > 1 ? 826 : 846, l, { "text-anchor": "middle", "font-size": 34, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 42);
        }
      }
      return r;
    }

    const duree = scenes.reduce((a, h) => a + h.D, 0) + (o.film ? FIN : 0);
    let finPosee = false;
    function rendreFilm(t) {
      let a = 0;
      for (let i = 0; i < scenes.length; i++) {
        if (t < a + scenes[i].D) { finPosee = false; return rendre(i, t - a); }
        a += scenes[i].D;
      }
      if (!finPosee) { // carte de fin
        finPosee = true; courant = -1;
        [scene, vitrine, haut, carte].forEach(g => { g.innerHTML = ""; g.setAttribute("opacity", 1); });
        D.texte(scene, 800, 300, R.titre, { "text-anchor": "middle", "font-size": 76, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
        D.texte(scene, 800, 370, R.sousTitre, { "text-anchor": "middle", "font-size": 38, fill: D.ORANGE, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
        D.heroine(scene, { r: 46 })({ x: 800, y: 500, t: 1, humeur: "sourire", etat: "liquide", temp: 0.1 });
        D.lignes(scene, 800, 660, couper(R.credit, 80), { "text-anchor": "middle", "font-size": 28, fill: "#3b4a5e", "font-family": "Calibri, Arial, sans-serif" }, 38);
        D.texte(scene, 800, 760, "inerWeb · JouéRézo", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
        if (sousTitre) sousTitre.innerHTML = "";
        derniereLigne = "";
      }
      return {};
    }
    return { scenes: scenes, aller: aller, rendre: rendre, rendreFilm: rendreFilm, duree: duree };
  }
  window.VOYAGE_THEATRE = { creer: creer };
})();
