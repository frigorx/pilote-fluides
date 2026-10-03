/* =====================================================================
   schema.js — « Compléter le schéma » : remettre les symboles à leur place
   ---------------------------------------------------------------------
   RÔLE : deux sortes de schémas (donnees/schemas.js) :
   · un câblage du Câblage virtuel, chargé en direct : on retire n symboles
     de la carte SVG (jamais bornes, terre, réseau), on les met dans un
     plateau, et le joueur les repose sur leur emplacement repéré ;
   · un circuit frigorifique décrit en données (croix, ligne liquide).
   GESTE : toucher une pièce puis un emplacement (téléphone, clavier), ou
   la faire glisser (pointeur). Bonne place → la pièce s'installe, cadre
   vert double ; mauvaise → l'emplacement clignote rouge tireté, la pièce
   tremble, une erreur de plus. Score = emplacements − erreurs.
   APPARIEMENT câblage : chaque appareil (repère, type) est relié à son
   groupe <g class="symbole" data-type> par le groupe le plus proche de la
   position du repère (carte.appareils). Validation sur le TYPE.
   DÉPEND : JR (commun.js), JR_SCHEMAS. Les pages viennent de
   fabriquer-pages.mjs (scripts : donnees/schemas.js avant ce moteur).
   ===================================================================== */
(function () {
  "use strict";
  const S = window.JR_SCHEMAS;
  const NS = "http://www.w3.org/2000/svg";
  const LIB = "illustrations/bibliotheque/";

  /* les thèmes (un par schéma) sont dérivés de JR_SCHEMAS dans donnees/themes.js */

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function demarrer(theme, main) {
    main.innerHTML =
      '<h1>' + JR.esc(theme.emoji + " " + theme.nom) + '</h1>' +
      '<p class="chapo" id="s-consigne">' + JR.esc(theme.kind === "fluide" ? theme.data.consigne : "Sur ce schéma, des symboles ont été retirés : chaque emplacement vide porte son repère (Q, KM, F, M, S, H, B, Y…). Chaque pièce porte son nom. Touchez une pièce, puis l'emplacement dont le repère lui correspond — ou faites-la glisser.") + '</p>' +
      '<div class="bord"><span>Placés : <span id="s-places">0</span> / <span id="s-total">…</span></span><span>Erreurs : <span id="s-erreurs">0</span></span>' +
      (theme.kind === "cablage" ? '<span class="zoom"><button type="button" class="btn sec" id="s-moins" aria-label="Réduire le schéma">−</button><button type="button" class="btn sec" id="s-plus" aria-label="Agrandir le schéma">+</button></span>' : "") + '</div>' +
      '<div class="plateau" id="s-plateau" role="group" aria-label="Pièces à placer"><p class="legende" id="s-tenue">Chargement du schéma…</p></div>' +
      '<div class="schema-boite" id="s-boite"></div>' +
      '<div id="s-retour"></div>';
    const boite = main.querySelector("#s-boite"), plateau = main.querySelector("#s-plateau");
    const etat = { slots: [], pieces: [], places: 0, erreurs: 0, choisie: null };

    (theme.kind === "fluide" ? Promise.resolve(construireFluide(theme.data, boite)) : chargerCablage(theme.data, boite))
      .then(function (r) {
        if (!r) { boite.innerHTML = '<p class="retour nok"><strong>✗ Schéma indisponible.</strong>Vérifiez la connexion, puis rechargez la page.</p>'; return; }
        etat.slots = r.slots; etat.pieces = JR.melanger(r.pieces); etat.svg = r.svg; etat.apres = r.apres;
        main.querySelector("#s-total").textContent = etat.slots.length;
        plateau.innerHTML = '<p class="legende" id="s-tenue">Touchez une pièce.</p>';
        etat.pieces.forEach(p => plateau.appendChild(piece(p)));
        etat.slots.forEach(s => brancherSlot(s));
        /* zoom du câblage : la largeur de base vient de chargerCablage (style.minWidth) */
        if (theme.kind === "cablage") {
          let zoom = 1; const base = parseFloat(r.svg.style.minWidth) || 900;
          const appliquer = function () { r.svg.style.minWidth = Math.round(base * zoom) + "px"; };
          main.querySelector("#s-moins").addEventListener("click", function () { zoom = Math.max(0.5, zoom - 0.25); appliquer(); });
          main.querySelector("#s-plus").addEventListener("click", function () { zoom = Math.min(3, zoom + 0.25); appliquer(); });
          /* on arrive sur le premier emplacement vide, pas sur le coin du schéma */
          setTimeout(function () { etat.slots[0].rect.scrollIntoView({ block: "nearest", inline: "center" }); }, 50);
        }
      });

    /* ---------- pièces du plateau ---------- */
    function piece(p) {
      const b = JR.el('<button type="button" class="piece" aria-label="Pièce : ' + JR.esc(p.nom) + '">' + p.html + '</button>');
      b.dataset.id = p.id; b.dataset.type = p.type;
      b.addEventListener("click", function () {
        if (b.disabled) return;
        JR.sons.tap();
        if (etat.choisie === b) { choisir(null); return; }
        choisir(b);
      });
      /* glisser : un fantôme suit le pointeur ; au lâcher, l'emplacement sous le doigt décide */
      b.addEventListener("pointerdown", function (ev) {
        if (b.disabled || ev.button > 0) return;
        let fantome = null, bouge = false;
        const x0 = ev.clientX, y0 = ev.clientY;
        b.setPointerCapture(ev.pointerId);
        function move(e2) {
          if (!bouge && Math.hypot(e2.clientX - x0, e2.clientY - y0) < 6) return;
          if (!fantome) { bouge = true; fantome = b.cloneNode(true); fantome.className = "piece fantome"; document.body.appendChild(fantome); choisir(b); }
          fantome.style.left = (e2.clientX - fantome.offsetWidth / 2) + "px";
          fantome.style.top = (e2.clientY - fantome.offsetHeight / 2) + "px";
          surbrillance(e2.clientX, e2.clientY);
        }
        function up(e2) {
          b.removeEventListener("pointermove", move); b.removeEventListener("pointerup", up); b.removeEventListener("pointercancel", up);
          if (!fantome) return; /* simple toucher : le clic fera le travail */
          fantome.remove();
          surbrillance(-1, -1);
          const cible = sousLePointeur(e2.clientX, e2.clientY);
          if (cible) poser(b, cible);
        }
        b.addEventListener("pointermove", move); b.addEventListener("pointerup", up); b.addEventListener("pointercancel", up);
      });
      return b;
    }
    function choisir(b) {
      if (etat.choisie) etat.choisie.setAttribute("aria-pressed", "false");
      etat.choisie = b;
      if (b) { b.setAttribute("aria-pressed", "true"); main.querySelector("#s-tenue").textContent = "Vous tenez : " + b.getAttribute("aria-label").replace("Pièce : ", "") + ". Touchez son emplacement."; }
      else main.querySelector("#s-tenue").textContent = "Touchez une pièce.";
    }
    function sousLePointeur(x, y) {
      const e = document.elementFromPoint(x, y);
      const r = e && e.closest ? e.closest(".slot") : null;
      return r ? etat.slots.find(s => s.rect === r) : null;
    }
    function surbrillance(x, y) {
      const c = sousLePointeur(x, y);
      etat.slots.forEach(s => s.rect.classList.toggle("vise", s === c));
    }
    function brancherSlot(s) {
      s.rect.classList.add("slot");
      s.rect.setAttribute("tabindex", "0");
      s.rect.setAttribute("role", "button");
      s.rect.setAttribute("aria-label", "Emplacement " + (s.label || s.id));
      const act = function () { if (etat.choisie) poser(etat.choisie, s); else main.querySelector("#s-tenue").textContent = "Prenez d'abord une pièce dans le plateau."; };
      s.rect.addEventListener("click", act);
      s.rect.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    }

    /* ---------- poser une pièce ---------- */
    function poser(b, s) {
      if (s.rempli) return;
      const ok = s.type ? (b.dataset.type === s.type) : (b.dataset.id === s.id);
      if (!ok) {
        etat.erreurs++; main.querySelector("#s-erreurs").textContent = etat.erreurs;
        JR.sons.nok();
        s.rect.classList.add("nok"); b.classList.add("secoue");
        setTimeout(() => { s.rect.classList.remove("nok"); b.classList.remove("secoue"); }, 600);
        return;
      }
      JR.sons.ok();
      s.rempli = true; s.remplir(b);
      s.rect.classList.remove("slot", "vise"); s.rect.classList.add("ok");
      s.rect.removeAttribute("tabindex");
      b.disabled = true; b.classList.add("posee");
      choisir(null);
      etat.places++; main.querySelector("#s-places").textContent = etat.places;
      if (etat.places === etat.slots.length) setTimeout(terminer, 500);
    }
    function terminer() {
      const r = main.querySelector("#s-retour");
      r.innerHTML = '<p class="retour ok"><strong>✓ Schéma complet, ' + etat.erreurs + (etat.erreurs > 1 ? " erreurs." : " erreur.") + '</strong>' + JR.esc(etat.apres || "") + '</p>' +
        '<div class="actions"><button type="button" class="btn" id="s-fin">Voir le résultat</button></div>';
      const bf = r.querySelector("#s-fin"); bf.focus();
      bf.addEventListener("click", function () {
        JR.fin({ score: Math.max(0, etat.slots.length - etat.erreurs), total: etat.slots.length, unite: "points", rejouer: function () { demarrer(theme, main); } });
      });
    }
  }

  /* =====================================================================
     Un circuit frigorifique décrit en données
     ===================================================================== */
  function construireFluide(d, boite) {
    boite.innerHTML = "";
    const svg = el("svg", { viewBox: "0 0 " + d.largeur + " " + d.hauteur, class: "schema fluide", role: "img", "aria-label": d.titre }, boite);
    (d.tuyaux || []).forEach(t => el("path", { d: t.d, fill: "none", stroke: "#1b3a63", "stroke-width": 4, "stroke-linejoin": "round" }, svg));
    (d.fleches || []).forEach(f => el("path", { d: "M -9 -7 L 9 0 L -9 7 Z", fill: "#c9451a", transform: "translate(" + f.x + "," + f.y + ") rotate(" + f.r + ")" }, svg));
    (d.textes || []).forEach(t => { const x = el("text", { x: t.x, y: t.y, "text-anchor": t.a || "middle", "font-size": 15, "font-family": "Calibri, Arial, sans-serif", fill: "#10233c" }, svg); x.textContent = t.t; });
    (d.fixes || []).forEach(f => {
      el("rect", { x: f.x - f.w / 2 - 4, y: f.y - f.h / 2 - 4, width: f.w + 8, height: f.h + 8, fill: "#fffdf8" }, svg);
      el("image", { href: LIB + f.lib + ".svg", x: f.x - f.w / 2, y: f.y - f.h / 2, width: f.w, height: f.h }, svg);
    });
    const slots = d.slots.map(s => {
      const rect = el("rect", { x: s.x - s.w / 2, y: s.y - s.h / 2, width: s.w, height: s.h, rx: 8 }, svg);
      return { id: s.id, rect: rect, label: d.pieces.find(p => p.id === s.id).txt, s: s,
        remplir: function () {
          const p = d.pieces.find(q => q.id === s.id);
          if (p.lib) el("image", { href: LIB + p.lib + ".svg", x: s.x - s.w / 2 + 6, y: s.y - s.h / 2 + 6, width: s.w - 12, height: s.h - 12 }, svg);
          else { const t = el("text", { x: s.x, y: s.y + 6, "text-anchor": "middle", "font-size": 18, "font-weight": "bold", "font-family": "Calibri, Arial, sans-serif", fill: "#1b3a63" }, svg); t.textContent = p.txt; }
        } };
    });
    const pieces = d.pieces.map(p => ({ id: p.id, type: "", nom: p.txt,
      html: (p.lib ? '<img src="' + LIB + p.lib + '.svg" alt="">' : "") + '<span>' + JR.esc(p.txt) + '</span>' }));
    return { svg: svg, slots: slots, pieces: pieces, apres: d.apres };
  }

  /* =====================================================================
     Un câblage du Câblage virtuel
     ===================================================================== */
  function chargerCablage(c, boite) {
    return fetch("../cablage-virtuel/exercices/" + c.id + ".js", { cache: "no-cache" })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (txt) {
        const w = {}; new Function("window", txt)(w);
        const e = w.CABLAGE_EXERCICES[c.id];
        boite.innerHTML = e.carte.svg;
        const svg = boite.querySelector("svg");
        svg.setAttribute("class", "schema cablage");
        svg.setAttribute("role", "img"); svg.setAttribute("aria-label", e.titre);
        const vb = svg.getAttribute("viewBox").split(/\s+/).map(Number);
        svg.style.minWidth = Math.min(1400, Math.max(680, vb[2] * 0.75)) + "px";

        /* appareils ↔ groupes : le groupe du bon type le plus proche du repère */
        const groupes = [...svg.querySelectorAll("g.symbole[data-type]")].map(g => {
          const m = /translate\(([-\d.]+),([-\d.]+)\)/.exec(g.getAttribute("transform") || "");
          return { g: g, type: g.dataset.type, x: m ? +m[1] : 0, y: m ? +m[2] : 0, pris: false };
        });
        const positions = {}; (e.carte.appareils || []).forEach(a => { positions[a.repere] = a; });
        const reperes = el("g", { id: "jr-reperes", "font-family": "Arial, sans-serif", "font-size": 14, "font-weight": "bold", fill: "#1b3a63", stroke: "#ffffff", "stroke-width": 3, "paint-order": "stroke" }, svg);
        const candidats = [];
        e.appareils.forEach(function (a) {
          const p = positions[a.repere]; if (!p) return;
          if (S.jamais.test(a.type) || /^(R[ée]seau|Masse|Terre)/.test(a.repere)) return;
          let meilleur = null, dmin = Infinity;
          groupes.forEach(g => { if (g.pris || g.type !== a.type) return; const d = Math.hypot(g.x - p.x, g.y - p.y); if (d < dmin) { dmin = d; meilleur = g; } });
          if (!meilleur) return;
          meilleur.pris = true;
          const t = el("text", { x: p.x, y: p.y, "text-anchor": "middle" }, reperes); t.textContent = a.repere;
          candidats.push({ a: a, g: meilleur.g, repere: a.repere });
        });
        if (!candidats.length) return null;

        /* retirer n symboles — un seul par TYPE de symbole (trois moteurs identiques ne feraient qu'embrouiller) :
           contenu mis de côté, emplacement à la place */
        const vus = new Set(), choisis = [];
        JR.melanger(candidats).forEach(function (ch) { if (choisis.length < c.n && !vus.has(ch.a.type)) { vus.add(ch.a.type); choisis.push(ch); } });
        const slots = [], pieces = [];
        choisis.forEach(function (ch) {
          const g = ch.g, bb = g.getBBox();
          const enfants = [...g.childNodes];
          enfants.forEach(n => n.remove());
          const rect = el("rect", { x: bb.x - 8, y: bb.y - 8, width: bb.width + 16, height: bb.height + 16, rx: 6 }, g);
          slots.push({ id: ch.repere, type: ch.a.type, rect: rect, label: ch.repere,
            remplir: function () { rect.remove(); enfants.forEach(n => g.appendChild(n)); el("rect", { x: bb.x - 6, y: bb.y - 6, width: bb.width + 12, height: bb.height + 12, rx: 6, class: "cadre-ok" }, g); } });
          const corps = ch.a.symbole.replace(/^<g[^>]*>/, "").replace(/<\/g>\s*$/, "");
          pieces.push({ id: ch.repere, type: ch.a.type, nom: ch.a.nom,
            html: '<svg viewBox="' + (bb.x - 3) + " " + (bb.y - 3) + " " + (bb.width + 6) + " " + (bb.height + 6) + '" aria-hidden="true">' + corps + '</svg><span>' + JR.esc(ch.a.nom) + '</span>' });
        });
        return { svg: svg, slots: slots, pieces: pieces,
          apres: "Les repères disent la fonction : Q coupe ou protège, KM commande la puissance, F protège, M tourne, S donne l'ordre, H signale, B mesure, Y ouvre ou ferme." };
      })
      .catch(() => null);
  }

  JR.lancer("schema", demarrer);
})();
