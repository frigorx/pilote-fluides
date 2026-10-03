/* =====================================================================
   voyage-vertical.js — la série verticale (9:16) : un épisode par chapitre
   ---------------------------------------------------------------------
   RÔLE : rejouer les MÊMES scènes (voyage-scenes-*.js) dans un cadre
   1080 × 1920 pour TikTok, Reels, Shorts : bandeau « Épisode N », la scène
   (sans son en-tête), le sous-titre en grand (la plupart des gens
   regardent sans le son), le circuit des huit organes avec la molécule,
   puis une carte de fin (épisode suivant, inerweb.fr, signature commune).
   API : VOYAGE_VERTICAL.creer(svg, { recit, pistes }) →
         { episodes:[{ i, debut, D, duree }], duree, rendreSerie(t) }
   Les épisodes se suivent dans une seule composition ; outils/voyage-film.mjs
   les découpe ensuite en fichiers séparés.
   ZONES : rien d'important sous y = 1700 ni à droite de x = 960 (boutons et
   légende des applications) ; tout tient dans le centre.
   DÉPEND : VOYAGE_DESSIN, VOYAGE_THEATRE.horaire, VOYAGE_SCENES.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, FIN_EP = 4.5, K = 0.675, Y0 = 312, CROP = 140;
  const COUL = { BP: D.BLEU, HP: D.ORANGE, froid: "#2f6fb8", chaud: "#c0392b", fuite: "#c0392b", recup: "#1e7e54", liq: "#2f6fb8" };
  const titreFont = { "font-family": "Trebuchet MS, Arial, sans-serif", "font-weight": 700 };

  function creer(svg, o) {
    const R = o.recit;
    svg.setAttribute("viewBox", "0 0 1080 1920");
    svg.innerHTML = "";
    D.defs(svg);
    D.el("rect", { width: 1080, height: 1920, fill: D.CREME }, svg);
    const cid = "vm-cadre-v";
    D.el("rect", { x: 0, y: Y0 - 8, width: 1080, height: 630 * K + 16 }, D.el("clipPath", { id: cid }, svg));
    D.el("rect", { x: 0, y: Y0 - 8, width: 1080, height: 630 * K + 16, fill: "#fbf7f0" }, svg);
    const cadre = D.el("g", { "clip-path": "url(#" + cid + ")" }, svg);
    const plateau = D.el("g", { transform: "translate(0 " + (Y0 - CROP * K) + ") scale(" + K + ")" }, cadre);
    const scene = D.el("g", {}, plateau), vitrine = D.el("g", {}, plateau);
    const haut = D.el("g", {}, svg), sous = D.el("g", {}, svg), carte = D.el("g", {}, svg), fin = D.el("g", {}, svg);
    const H = R.scenes.map(s => window.VOYAGE_THEATRE.horaire(s, o.pistes));
    let debut = 0;
    const episodes = H.map((h, i) => { const e = { i: i, debut: debut, D: h.D, duree: h.D + FIN_EP }; debut += e.duree; return e; });
    let courant = -1, maj = null, vue = null, finVue = 0, cir = null, majMini = null, ligne = null, etatFin = -1;

    function poser(i) {
      courant = i; etatFin = -1;
      const s = R.scenes[i], h = H[i];
      [scene, vitrine, haut, sous, carte, fin].forEach(g => { g.innerHTML = ""; g.setAttribute("opacity", 1); });
      D.texte(haut, 540, 74, R.titre.toUpperCase(), Object.assign({ "text-anchor": "middle", "font-size": 34, fill: D.ORANGE, "letter-spacing": 2 }, titreFont));
      const ep = D.pastille(haut, 540, 150, i ? "Épisode " + i + " / " + (R.scenes.length - 1) : "Épisode 0 · la bande-annonce", D.BLEU, 34, "middle");
      D.texte(haut, 540, 232, s.titre, Object.assign({ "text-anchor": "middle", "font-size": s.titre.length > 20 ? 58 : 66, fill: D.BLEU }, titreFont));
      D.texte(haut, 540, 282, s.sous, { "text-anchor": "middle", "font-size": 38, fill: D.ORANGE, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
      const ctx = { T: h.T, E: h.E, D: h.D, A: (k, f) => h.T[k] + (f || 0) * (h.E[k] - h.T[k]), film: true, recit: R };
      maj = window.VOYAGE_SCENES[s.id](scene, ctx);
      vue = s.organe && s.pres ? D.carteIdentite(vitrine, s) : null;
      finVue = vue ? h.E[s.pres - 1] + 0.35 : 0;
      ligne = null;
      cir = null;
      if (s.carte) {
        cir = D.circuit(carte, 210, 1236, 660, false);
        if (s.organe) cir.surligne(s.organe, true);
        majMini = D.heroine(carte, { r: 30 });
        const rang = D.el("g", {}, carte);
        let x = 0;
        (s.puces || []).forEach((p, k) => {
          if (k) { D.texte(rang, x + 8, 1676, /BP|HP/.test(s.puces[0][0]) && /BP|HP/.test(p[0]) ? "→" : "·", { "font-size": 38, fill: D.BLEU, "font-weight": 700 }); x += 44; }
          x += D.pastille(rang, x, 1676, p[1], COUL[p[0]] || D.BLEU, 34).largeur;
        });
        rang.setAttribute("transform", "translate(" + (540 - x / 2).toFixed(1) + " 0)");
      }
    }
    function sousTitre(s, h, t) {
      let k = -1;
      for (let m = 0; m < h.T.length; m++) if (t >= h.T[m] - 0.15) k = m;
      const p = k >= 0 && t < h.E[k] + 0.75 ? s.phrases[k] : "";
      const txt = Array.isArray(p) ? p[0] : p;
      if (txt === ligne) return;
      ligne = txt; sous.innerHTML = "";
      const l = D.couper(txt, 30), y0 = 1000 - (l.length - 1) * 33;
      D.lignes(sous, 540, y0, l, { "text-anchor": "middle", "font-size": 56, fill: "#10233c", "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" }, 66);
    }
    function carteDeFin(i) {
      if (etatFin === i) return;
      etatFin = i;
      [scene, vitrine, sous, carte].forEach(g => { g.innerHTML = ""; });
      const suivant = R.scenes[i + 1];
      D.texte(fin, 540, 820, suivant ? "Épisode suivant" : "Fin du voyage", { "text-anchor": "middle", "font-size": 44, fill: D.ORANGE, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
      if (suivant) D.texte(fin, 540, 900, suivant.titre, Object.assign({ "text-anchor": "middle", "font-size": 64, fill: D.BLEU }, titreFont));
      D.heroine(fin, { r: 54 })({ x: 540, y: 1060, t: 1, humeur: "sourire", etat: "liquide", temp: 0.1 });
      D.lignes(fin, 540, 1230, ["Tout le voyage, gratuit :", "inerweb.fr"], Object.assign({ "text-anchor": "middle", "font-size": 58, fill: D.BLEU }, titreFont), 70);
      D.signature(fin, 540, 1360, 900);
      D.texte(fin, 540, 1560, "Formations froid et climatisation : CAP IFCA · Bac pro MFER", { "text-anchor": "middle", "font-size": 32, fill: "#3b4a5e", "font-weight": 600, "font-family": "Calibri, Arial, sans-serif" });
    }
    function rendreSerie(t) {
      let e = episodes.find(x => t < x.debut + x.duree) || episodes[episodes.length - 1];
      if (e.i !== courant) poser(e.i);
      const lt = t - e.debut, s = R.scenes[e.i], h = H[e.i];
      if (lt >= h.D) { carteDeFin(e.i); fin.setAttribute("opacity", D.lisse((lt - h.D) / 0.5).toFixed(2)); return; }
      const r = maj(lt) || {};
      let dedans = 1;
      if (vue) {
        dedans = D.lisse((lt - finVue + 0.2) / 0.9);
        const z = 1 + 0.04 * D.borne(lt / finVue, 0, 1) + 0.8 * dedans;
        vue.setAttribute("transform", "translate(710 425) scale(" + z.toFixed(3) + ") translate(-710 -425)");
        vitrine.setAttribute("opacity", (1 - dedans).toFixed(3));
      }
      const fondu = D.fenetre(lt, 0, h.D, 0.5);
      scene.setAttribute("opacity", (fondu * (vue ? 0.22 + 0.78 * dedans : 1)).toFixed(3));
      if (vue && dedans < 0.99) scene.setAttribute("data-layout-allow-overlap", ""); else scene.removeAttribute("data-layout-allow-overlap"); // coupe derrière la carte opaque : voulu
      if (cir) {
        const w = r.carte !== undefined && lt > finVue ? r.carte : s.carte[0];
        const [x, y] = cir.ecran(...D.circuitPoint(w));
        majMini({ x: x, y: y, s: 0.85, t: lt, temp: r.temp !== undefined ? r.temp : 0.1, etat: r.etat || "liquide", humeur: r.humeur });
      }
      sousTitre(s, h, lt);
    }
    return { episodes: episodes, duree: debut, rendreSerie: rendreSerie, FIN_EP: FIN_EP };
  }
  window.VOYAGE_VERTICAL = { creer: creer };
})();
