/* =====================================================================
   scene-famille.js — gare 0 « La famille des détendeurs » : les dessins qui vivent
   ---------------------------------------------------------------------
   RÔLE : une fonction par écran qui dessine. app.js les appelle dans render() :
     GARE0_SCENES.pourquoi(hote)   écran 1 : le liquide HP passe un orifice, ressort froid (pas à pas)
     GARE0_SCENES.missions(hote)   écran 2 : chuter la pression ET doser le débit (pas à pas)
     GARE0_SCENES.cartes(hote, auChoix)  écran 3 : quatre cartes (symbole + coupe + « il règle : … »)
     GARE0_SCENES.etsi(hote)       écran 4 : la chambre se réchauffe, les quatre côte à côte (pas à pas)
     GARE0_SCENES.variantes(hote)  écran 6 : égalisation externe et MOP, un dessin chacune
     GARE0_SCENES.accueil(hote)    le dessin du sommaire
   Les coupes viennent de ../_detendeurs-commun/scenes-detendeurs.js (DETENDEURS_SCENES).
   Les symboles normalisés sont des fichiers de la bibliothèque (assets/symboles/) : jamais redessinés.
   RÈGLES TENUES : texte jamais sur un tracé (légendes en HTML, sauf pastilles HP/BP) ; le liquide se voit
   liquide (nappe, bulles qui naissent au fond) ; filigrane inerWeb R9 derrière chaque dessin ; rien n'est
   animé en CSS : tout est calculé à partir du temps.
   ===================================================================== */
(function () {
  "use strict";
  const DS = window.DETENDEURS_SCENES, D = window.VOYAGE_DESSIN;
  const G = window.GARE0_SCENES = {};
  if (!DS || !D) { console.warn("scene-famille.js : DETENDEURS_SCENES absent."); return; }
  const el = D.el, lerp = D.lerp, bn = D.borne, frac = D.frac;
  const T = DS.TYPES, esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const symbole = type => DS.symbole(type);

  /* ---------- sommaire : le passage, en fin d'histoire, qui tourne seul ---------- */
  G.accueil = function (hote) {
    DS.fond(hote);
    const svg = DS.svg(hote, "ds-svg", "Animation : le liquide haute pression, tiède, traverse un passage très étroit et ressort froid, en mélange de liquide et de bulles.");
    const P = DS.passage(svg, { mode: "melange" });
    DS.animer(hote, t => P.maj({ ouv: 0.5, passe: 1, chute: 1, flash: 1, froid: 1 }, t, null));
  };

  /* ---------- écran 1 : pourquoi détendre ? ---------- */
  G.pourquoi = function (hote) {
    return DS.jouer(hote, {
      init: { ouv: 0.5, passe: 0, chute: 0, flash: 0, froid: 0 },
      etapes: [
        { nom: "Le liquide arrive", dire: "Il est tiède et sous haute pression : le tube est plein.", cible: {}, agit: "hp", duree: 1.6 },
        { nom: "Il passe un passage étroit", dire: "Le passage est très étroit : la pression chute d’un coup.", cible: { passe: 1, chute: 1 }, agit: "passage", duree: 2.8 },
        { nom: "Une partie bout", dire: "La pression est tombée : une partie du liquide bout. Les bulles naissent au fond.", cible: { flash: 1 }, agit: "melange", duree: 2.8 },
        { nom: "Le reste se refroidit", dire: "Pour bouillir, cette partie prend de la chaleur au reste du liquide : le mélange devient froid.", cible: { froid: 1 }, agit: "melange", duree: 3 }
      ],
      construire: function (dessin) {
        const svg = DS.svg(dessin, "ds-svg", "Coupe d’un tube : le liquide haute pression arrive à gauche, traverse une plaque percée d’un passage étroit, puis ressort à droite en mélange froid de liquide et de bulles.");
        const P = DS.passage(svg, { mode: "melange" });
        return P.maj;
      }
    });
  };

  /* ---------- écran 2 : les deux missions ---------- */
  G.missions = function (hote) {
    return DS.jouer(hote, {
      init: { ouv: 0.5, passe: 0, chute: 0, flash: 0, froid: 1, v1: 0, v2: 0, v3: 0 },
      etapes: [
        { nom: "Faire chuter la pression", dire: "Mission 1 : la pression baisse en passant. Le liquide peut alors bouillir à basse température.", cible: { passe: 1, chute: 1, flash: 1 }, agit: "pressions", duree: 3 },
        { nom: "Trop peu de liquide", dire: "Mission 2 : doser. Passage trop petit : le liquide finit trop tôt et la vapeur sort très chaude. C’est une forte surchauffe.", cible: { ouv: 0.12, v1: 1 }, agit: "evaporateur", duree: 3 },
        { nom: "Trop de liquide", dire: "Passage trop grand : le liquide n’a pas le temps de bouillir. Il repart vers le compresseur : danger.", cible: { ouv: 0.95, v1: 0, v2: 1 }, agit: "evaporateur", duree: 3 },
        { nom: "Le bon dosage", dire: "Le détendeur doit trouver le bon passage : tout le liquide s’évapore juste avant la sortie.", cible: { ouv: 0.5, v2: 0, v3: 1 }, agit: "passage", duree: 3 }
      ],
      construire: function (dessin) {
        const svg = DS.svg(dessin, "ds-svg", "Coupe : le liquide haute pression traverse un passage réglable puis s’évapore dans l’évaporateur. Passage trop petit : le liquide finit trop tôt. Trop grand : du liquide ressort. Au bon réglage : il finit juste avant la sortie.");
        const P = DS.passage(svg, { mode: "evap" });
        return P.maj;
      }
    });
  };

  /* ---------- écran 3 : qui règle quoi — quatre cartes ---------- */
  const EXPLIC = {
    capillaire: "Un tube très fin et très long. Son passage ne change jamais : il ne règle rien.",
    automatique: "Un ressort s’oppose à la pression de l’évaporateur. Il règle la pression : elle monte, il ferme. On le trouve surtout sur les machines à glace.",
    thermostatique: "Un bulbe sent la sortie de l’évaporateur : sa pression (violet) pousse la membrane. Il règle la surchauffe : sortie plus chaude, il ouvre.",
    electronique: "Des capteurs et un régulateur. Il règle la surchauffe, calculée : le régulateur commande la vanne."
  };
  const PIECE = { capillaire: "tube", automatique: "membrane", thermostatique: "bulbe", electronique: "regulateur" };
  G.EXPLIC = EXPLIC;
  G.cartes = function (hote, auChoix) {
    const dessin = document.createElement("div"); dessin.className = "ds-dessin";
    const grille = document.createElement("div"); grille.className = "ds-cartes";
    const explic = document.createElement("p"); explic.className = "ds-explic";
    DS.fond(dessin); dessin.appendChild(grille); hote.append(dessin, DS.legendeForces(), explic);
    const cs = [];
    T.forEach(type => {
      const n = DS.NOMS[type], b = document.createElement("button");
      b.type = "button"; b.className = "ds-carte"; b.dataset.type = type; b.setAttribute("aria-pressed", "false");
      b.innerHTML = '<span class="ds-cel-tete"><img src="' + symbole(type) + '" alt="Symbole du détendeur ' + n.nom.toLowerCase() + '"><b>' + n.nom + '</b></span><span class="ds-coupe"></span><span class="ds-regle">il règle : <strong>' + esc(n.regleCourt) + "</strong></span>";
      grille.appendChild(b);
      cs.push({ type: type, b: b, coupe: DS.coupe(type, DS.svg(b.querySelector(".ds-coupe"), "ds-svg", "Coupe du détendeur " + n.nom.toLowerCase() + ".")) });
      b.addEventListener("click", () => choisir(type));
    });
    function choisir(type) {
      cs.forEach(c => c.b.setAttribute("aria-pressed", String(c.type === type)));
      explic.innerHTML = "<strong>" + DS.NOMS[type].nom + ".</strong> " + EXPLIC[type];
      if (auChoix) auChoix(type);
    }
    choisir("capillaire");
    DS.animer(hote, t => cs.forEach(c => c.coupe.maj({ charge: 0.5, pouls: 1 }, t, { agit: PIECE[c.type] })));
  };

  /* ---------- écran 4 : et si la chambre se réchauffe ? — l'écran clé ---------- */
  const VERDICT = {
    capillaire: ["non", "il ne suit pas : même débit"], automatique: ["non", "encore moins"],
    thermostatique: ["oui", "il suit la chaleur"], electronique: ["oui", "il suit, au plus juste"]
  };
  G.etsi = function (hote) {
    const init = { charge: 0.5, verdict: 0, signal: 0 }, fin = {};
    T.forEach(t => { init["o_" + t] = DS.ouverture(t, 0.5); fin["o_" + t] = DS.ouverture(t, 1); });
    return DS.jouer(hote, {
      init: init,
      etapes: [
        { nom: "Tout va bien", dire: "La chambre est à bonne température : les quatre laissent passer ce qu’il faut.", cible: {}, agit: null, duree: 1.4 },
        { nom: "La chambre se réchauffe", dire: "L’évaporateur reçoit plus de chaleur : le liquide s’évapore plus vite, la sortie devient plus chaude.", cible: { charge: 1 }, agit: "evaporateur", duree: 3 },
        { nom: "Chacun le sent", dire: "Bulbe qui chauffe, pression qui monte, sondes qui lisent. Le capillaire ne sent rien.", cible: {}, agit: { capillaire: "tube", automatique: "membrane", thermostatique: "bulbe", electronique: "sondes" }, duree: 2.4 },
        { nom: "Le message du bulbe", dire: "Bulbe chaud : sa pression (violet) file dans le tube et pousse la membrane vers le bas.", cible: { signal: 1 }, agit: { thermostatique: "capillaire" }, duree: 4.6 },
        { nom: "Chacun réagit", dire: "Capillaire : rien. Automatique : il ferme. Thermostatique : il ouvre. Électronique : il ouvre, calculé.", cible: fin, agit: { capillaire: "tube", automatique: "aiguille", thermostatique: "aiguille", electronique: "moteur" }, duree: 3.2 },
        { nom: "Qui suit la chaleur ?", dire: "Seuls le thermostatique et l’électronique donnent plus de liquide quand il en faut plus.", cible: { verdict: 1 }, agit: "evaporateur", duree: 1.6 }
      ],
      construire: function (dessin) {
        const rang = document.createElement("div"); rang.className = "ds-rang";
        dessin.appendChild(rang);
        dessin.after(DS.legendeForces());                   // sous le dessin, en HTML : jamais sur un tracé
        const cs = T.map(type => {
          const n = DS.NOMS[type], c = document.createElement("div");
          c.className = "ds-cel"; c.dataset.type = type;
          c.innerHTML = '<div class="ds-cel-tete"><img src="' + symbole(type) + '" alt=""><b>' + n.nom + '</b></div><div class="ds-coupe"></div><p class="ds-verdict ' + VERDICT[type][0] + '">' + (VERDICT[type][0] === "oui" ? "✓ " : "✗ ") + VERDICT[type][1] + "</p>";
          rang.appendChild(c);
          return { type: type, c: c, v: c.querySelector(".ds-verdict"), coupe: DS.coupe(type, DS.svg(c.querySelector(".ds-coupe"), "ds-svg", "Coupe du détendeur " + n.nom.toLowerCase() + ".")) };
        });
        return function (e, t, info) {
          cs.forEach(c => { c.coupe.maj({ charge: e.charge, ouverture: e["o_" + c.type], signal: e.signal }, t, info); c.v.style.opacity = bn(e.verdict, 0, 1).toFixed(2); });
        };
      }
    });
  };

  /* ---------- écran 6 : les variantes du thermostatique ---------- */
  function variantes(hote) {
    const onglets = document.createElement("div"); onglets.className = "ds-onglets";
    const rang = document.createElement("div"); rang.className = "ds-variantes";
    hote.append(onglets, rang);
    // sur téléphone, un seul dessin à la fois (grand) : deux onglets ; sur grand écran, les deux côte à côte
    const montrer = i => { [...rang.children].forEach((c, k) => c.classList.toggle("actif", k === i)); [...onglets.children].forEach((b, k) => b.setAttribute("aria-pressed", String(k === i))); };
    const mk = (titre, symb, phrase, aria) => {
      const c = document.createElement("div"); c.className = "ds-var";
      c.innerHTML = '<div class="ds-cel-tete"><img src="' + symb + '" alt=""><b>' + titre + '</b></div><div class="ds-coupe"></div><p class="ds-phrase">' + phrase + "</p>";
      rang.appendChild(c);
      const b = document.createElement("button"); b.type = "button"; b.textContent = titre; b.addEventListener("click", () => montrer([...rang.children].indexOf(c)));
      onglets.appendChild(b);
      DS.fond(c.querySelector(".ds-coupe"));
      return DS.svg(c.querySelector(".ds-coupe"), "ds-svg", aria);
    };
    // ---- A : égalisation externe — la pression baisse le long de l'évaporateur ; le tube va la chercher à la sortie ----
    const svgA = mk("Égalisation externe", DS.symbole("thermostatique_ext"), "Un petit tube amène la pression de la <strong>sortie</strong> de l’évaporateur, là où elle est la plus basse. Gare 2.",
      "Dessin : la pression baisse le long de l’évaporateur. Le détendeur à égalisation interne lit celle de l’entrée, l’externe lit celle de la sortie.");
    svgA.setAttribute("viewBox", "0 0 440 300");
    const gA = el("g", {}, svgA);
    const evap = DS.bande(gA, { x0: 20, x1: 430, yh: 212, yb: 256, graine: 9, nbMols: 26, nbBulles: 14, prof: [0.8, 0.2] });
    const barres = [];
    for (let i = 0; i < 6; i++) {
      const h = lerp(96, 44, i / 5), x = 50 + i * 68;
      el("rect", { x: x, y: 178 - h, width: 34, height: h, rx: 4, fill: D.couleur(0.06, false), opacity: 0.85 }, gA);
      barres.push([x + 17, 178 - h]);
    }
    const pInterne = D.pastille(gA, 67, 44, "interne", "#b06a00", 26, "middle"), pExterne = D.pastille(gA, 373, 44, "externe", "#1e7e54", 26, "middle");
    const anA = [el("circle", { cx: barres[0][0], cy: barres[0][1] + 10, r: 22, fill: "rgba(176,106,0,.14)", stroke: "#b06a00", "stroke-width": 5 }, gA), el("circle", { cx: barres[5][0], cy: barres[5][1] + 10, r: 22, fill: "rgba(30,126,84,.14)", stroke: "#1e7e54", "stroke-width": 5 }, gA)];
    DS.animer(rang.children[0], t => {
      evap.maj({ xf: 0.85, flash: 1, froid: 1, sortie: 0.2 }, t);
      const ph = frac(t * 0.22), a = ph < 0.5;
      anA[0].setAttribute("opacity", a ? (0.65 + 0.35 * Math.sin(t * 6)).toFixed(2) : 0.15); anA[1].setAttribute("opacity", a ? 0.15 : (0.65 + 0.35 * Math.sin(t * 6)).toFixed(2));
      pInterne.setAttribute("opacity", a ? 1 : 0.4); pExterne.setAttribute("opacity", a ? 0.4 : 1);
    });
    // ---- B : MOP — la charge du bulbe est limitée : la pression du bulbe plafonne ----
    const svgB = mk("Détendeur MOP", DS.symbole("thermostatique"), "La charge du bulbe est limitée : au-delà d’une température, sa pression <strong>ne monte plus</strong>. Gare 3.",
      "Graphique : la pression du bulbe monte avec sa température. Avec une charge limitée, elle atteint un plafond et n’augmente plus.");
    svgB.setAttribute("viewBox", "0 0 440 300");
    const gB = el("g", {}, svgB);
    const X0 = 64, X1 = 424, Y0 = 236, Y1 = 28, YC = 104;
    el("path", { d: "M " + X0 + " " + Y1 + " V " + Y0 + " H " + X1, fill: "none", stroke: "#33475b", "stroke-width": 3.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, gB);
    D.texte(gB, (X0 + X1) / 2 + 10, 280, "température du bulbe", Object.assign({ "text-anchor": "middle", "font-size": 24, fill: "#10233c", "font-weight": 600 }, { "font-family": "Calibri, Arial, sans-serif" }));
    D.texte(gB, 22, 132, "pression", { "text-anchor": "middle", "font-size": 24, fill: "#10233c", "font-weight": 600, "font-family": "Calibri, Arial, sans-serif", transform: "rotate(-90 22 132)" });
    const Af = u => Y0 - 186 * Math.pow(u, 1.7), Bf = u => { const a = Af(u); return (a + YC + Math.sqrt((a - YC) * (a - YC) + 90)) / 2; };
    const poly = f => { let d = ""; for (let i = 0; i <= 60; i++) { const u = i / 60; d += (i ? " L " : "M ") + (X0 + 10 + u * (X1 - X0 - 20)).toFixed(1) + " " + f(u).toFixed(1); } return d; };
    el("path", { d: poly(Af), fill: "none", stroke: "#8494a4", "stroke-width": 4, "stroke-dasharray": "10 8", "stroke-linecap": "round" }, gB);
    el("line", { x1: X0, x2: X1, y1: YC, y2: YC, stroke: "#c9451a", "stroke-width": 3, "stroke-dasharray": "4 8", "stroke-linecap": "round" }, gB);
    el("path", { d: poly(Bf), fill: "none", stroke: "#c9451a", "stroke-width": 6, "stroke-linecap": "round" }, gB);
    D.pastille(gB, 180, YC - 22, "plafond", "#c9451a", 26, "middle");
    const anB = el("circle", { r: 26, fill: "rgba(255,107,53,.18)", stroke: "#ff6b35", "stroke-width": 5 }, gB), pt = el("circle", { r: 9, fill: "#c9451a", stroke: "#fff", "stroke-width": 3 }, gB);
    montrer(0);
    DS.animer(rang.children[1], t => {
      const u = bn(frac(t * 0.13) * 1.25, 0, 1), x = X0 + 10 + u * (X1 - X0 - 20), y = Bf(u);
      pt.setAttribute("cx", x.toFixed(1)); pt.setAttribute("cy", y.toFixed(1)); anB.setAttribute("cx", x.toFixed(1)); anB.setAttribute("cy", y.toFixed(1));
      anB.setAttribute("opacity", u > 0.55 ? (0.6 + 0.4 * Math.sin(t * 6)).toFixed(2) : 0);
    });
  }
  G.variantes = variantes;
})();
