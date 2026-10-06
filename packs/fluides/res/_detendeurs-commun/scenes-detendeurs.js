/* =====================================================================
   scenes-detendeurs.js — les briques communes de la ligne « LES DÉTENDEURS »
   ---------------------------------------------------------------------
   RÔLE : une coupe animée simplifiée PAR TYPE de détendeur, pilotable par
   un état, que toutes les gares de la ligne réemploient (gare 0 « La
   famille » : detendeurs-famille/ ; gares 2 à 6 : recopier ce moule).
   Dessin avec VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js, lu seulement) :
   nappe de liquide qui ondule, bulles qui naissent au fond, vapeur en petites
   molécules, jamais de billes. HP orangé, BP bleu. AUCUN texte dans les
   coupes (les légendes sont en HTML), sauf les pastilles « HP » / « BP ».
   Aucun symbole ni schéma de circuit n'est dessiné ici : les symboles
   normalisés sont des fichiers de la bibliothèque, copiés dans
   assets/symboles/ de chaque gare (voir DS.SYMBOLES).

   CHARGEMENT (avant app.js) :
     voyage-dessin.js  →  scenes-detendeurs.js  →  scene-<gare>.js  →  app.js

   API (tout est sur window.DETENDEURS_SCENES, abrégé DS) :
   · DS.TYPES      ["capillaire","automatique","thermostatique","electronique"]
   · DS.NOMS[type] { nom, regle, regleCourt, symbole }   (textes de la famille)
   · DS.coupe(type, svg)  → { maj(etat, t, info), lire(), parties, type }
       svg   <svg> déjà dans la page (viewBox 0 0 300 470 posé ici : portrait,
             fluide de droite à gauche comme sur la croix, évaporateur en bas).
       etat  { charge: 0..1, ouverture: 0..1 }   charge 0,5 = régime normal ; thermostatique seulement : signal 0..1 (la
             pression du bulbe arrive-t-elle à la chambre ? 1 par défaut : oui ; 0 → 1 = les impulsions filent dans le tube du
             bulbe puis la chambre se fonce) et pouls 0..1 (impulsions toujours visibles, pour une carte) ;
             ouverture : défaut = celle que le détendeur choisit tout seul pour
             cette charge (DS.ouverture). Le capillaire ignore l'ouverture.
       t     le temps en secondes (ondulations, bulles : tout est calculé, rien
             n'est animé en CSS ni en SMIL).
       info  { agit }  la pièce à allumer : un nom de pièce ou { type: nom }.
             Pièces : evaporateur, bulbe, capillaire (le tube du bulbe), membrane, ressort, aiguille, moteur,
             regulateur, sondes, tube.
       lire() → { ouverture, xf, bp, sortie, surchauffe, pBulbe, pTete }   (valeurs qualitatives ; pBulbe/pTete : thermostatique)
   · DS.legendeForces(prefixe) → <p> HTML : pastilles violette « pression du bulbe : ouvre », bleue « pression d'évaporation :
       ferme », grise « ressort : ferme » ; à insérer sous le dessin (jamais sur un tracé)
   · DS.bande(g, {x0,x1,yh,yb})  le tube où le liquide s'évapore (brique de DS.coupe et DS.passage) → { maj({xf,flash,froid,sortie}, t) }
   · DS.manometre(g, cx, cy, r) → {maj(p)} et DS.thermometre(g, x, yReservoir, h) → {maj(t)} : instruments lisibles
   · DS.ouverture(type, charge)   l'ouverture « choisie par le détendeur »
   · DS.besoin(charge)            l'ouverture dont l'évaporateur a besoin
   · DS.passage(svg)  → { maj(etat, t, info) }  la scène « orifice + évaporateur »
       (viewBox 960 × 330/350) ; o.mode "melange" (tube BP large) ou "evap" (évaporateur) ;
       etat { ouv, passe, chute, flash, froid, v1, v2, v3 } : voir la fonction. Pièces à allumer :
       hp, passage, pressions, melange, evaporateur. Sert aux écrans « pourquoi détendre » et « deux missions ».
   · DS.jouer(hote, def)   le PAS À PAS : 3 à 6 étapes, chacune = un évènement
       cause → effet ; la pièce qui agit est allumée ; ▶/⏸, un bouton par étape,
       « Ralenti ». def = { init, etapes:[{nom,dire,cible,agit}], construire(dessin)
       → maj(etat,t,info) }. Renvoie { aller(k), joue(), pause() }.
   · DS.animer(hote, maj(t))   un dessin qui vit seul (cartes, accueil) : maj est rappelée à chaque image.
   · DS.fond(hote)   filigrane inerWeb (R9) derrière les dessins : 3 exemplaires,
       dont un au centre, ~10 %, cartouche « .fr ».
   · DS.svg(hote, classe, aria)   crée un <svg> dans hote.
   · DS.symbole(nom, base)   URL du symbole normalisé (dossier assets/symboles/).

   PASTILLES : HP / BP / verdicts sont des groupes de classe .ds-pastille ; sur les coupes, elles sont masquées sous 760 px
   (CSS de la gare : `.ds-coupe .ds-pastille{display:none}`), trop petites pour être lues ; DS.passage les redessine en
   grand sur téléphone (ResizeObserver).

   RÈGLES TENUES : le fluide va de droite à gauche (haute pression arrive à
   droite, basse pression repart à gauche vers l'évaporateur en bas, comme sur
   la croix du frigoriste) ; le dessin au repos est déjà l'image finale ;
   les valeurs sont QUALITATIVES (jamais de chiffres de chantier).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  if (!D) { console.warn("DETENDEURS_SCENES : voyage-dessin.js doit être chargé avant ce fichier."); return; }
  const DS = window.DETENDEURS_SCENES = {};
  const el = D.el, lerp = D.lerp, bn = D.borne, lisse = D.lisse, frac = D.frac;
  const KM = 0.7;                                  // échelle des petites molécules
  const POLICE = { "font-family": "Calibri, Arial, sans-serif" };

  /* ---------- la famille : noms, ce que chacun règle, symbole normalisé ---------- */
  DS.TYPES = ["capillaire", "automatique", "thermostatique", "electronique"];
  DS.NOMS = {
    capillaire:     { nom: "Capillaire",     regle: "rien",                           regleCourt: "rien",            symbole: "tube_capillaire.svg" },
    automatique:    { nom: "Automatique",    regle: "la pression d’évaporation",      regleCourt: "la pression",     symbole: "vanne_pression_constante.svg" },
    thermostatique: { nom: "Thermostatique", regle: "la surchauffe",                  regleCourt: "la surchauffe",   symbole: "detendeur_thermo_int.svg" },
    electronique:   { nom: "Électronique",   regle: "la surchauffe, calculée",        regleCourt: "la surchauffe calculée", symbole: "detendeur_electronique.svg" }
  };
  DS.SYMBOLES = { thermostatique_ext: "detendeur_thermo_ext.svg" };
  DS.symbole = (nom, base) => (base || "assets/symboles/") + (DS.NOMS[nom] ? DS.NOMS[nom].symbole : (DS.SYMBOLES[nom] || nom));

  /* ---------- le modèle qualitatif (0 = peu, 1 = beaucoup ; jamais de chiffres de chantier) ---------- */
  DS.besoin = c => 0.15 + 0.7 * c;                 // l'ouverture dont l'évaporateur a besoin pour cette charge
  DS.ouverture = function (type, charge) {
    const c = bn(charge, 0, 1);
    if (type === "capillaire") return 0.5;                        // fixe : rien ne bouge
    if (type === "automatique") return bn(0.5 - 0.6 * (c - 0.5), 0.05, 0.95); // la BP monte avec la charge : il FERME
    if (type === "thermostatique") return bn(DS.besoin(c) * 0.96, 0.05, 0.98); // le bulbe chaud : il OUVRE
    return bn(DS.besoin(c), 0.05, 0.98);                          // électronique : calculée, juste
  };
  DS.dose = (ouv, charge) => bn(0.85 * ouv / DS.besoin(charge), 0.08, 1.3);  // où finit le liquide dans l'évaporateur (0 entrée … 1 sortie)
  DS.sortie = xf => xf >= 1 ? 0.1 : lerp(0.12, 0.62, bn((1 - xf) / 0.7, 0, 1)); // température du tube à la sortie (0 froid … 1 chaud)
  DS.bp = (c, ouv) => bn(0.3 + 0.4 * c + 0.2 * ouv, 0, 1);       // pression d'évaporation, qualitative

  /* ---------- définitions (dégradés métal, petite molécule) : une fois par page ---------- */
  DS.pret = function () {
    if (document.getElementById("vm-mol")) return;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.setAttribute("aria-hidden", "true");
    defs.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    D.defs(defs);
    document.body.appendChild(defs);
  };
  DS.svg = function (hote, classe, aria) {
    DS.pret();
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", classe || "ds-svg"); s.setAttribute("role", "img"); s.setAttribute("aria-label", aria || "");
    hote.appendChild(s);
    return s;
  };

  /* ---------- le filigrane inerWeb (charte R9) derrière les dessins ---------- */
  DS.fond = function (hote) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "ds-fond"); s.setAttribute("aria-hidden", "true"); s.setAttribute("viewBox", "0 0 1000 500");
    s.setAttribute("preserveAspectRatio", "xMidYMid slice");
    const f = D.filigrane(s, [[500, 250], [150, 420], [850, 90]], 300);
    f.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = ".fr"; });
    hote.insertBefore(s, hote.firstChild);
    return s;
  };

  /* ---------- outils : chemin (polyligne paramétrée), particules du mélange ---------- */
  function chemin(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L[i] = L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const len = L[L.length - 1];
    return { len: len, pts: pts, tronc: function (s0, s1) {          // le morceau [s0, s1] du chemin, sommets compris (un coude n'est jamais coupé)
      const o = [this.at(s0).slice(0, 2)];
      for (let i = 1; i < pts.length - 1; i++) if (L[i] > s0 && L[i] < s1) o.push(pts[i].slice(0, 2));
      o.push(this.at(s1).slice(0, 2)); return o;
    }, at: function (s) {
      s = bn(s, 0, len); let i = 1;
      while (i < L.length - 1 && s > L[i]) i++;
      const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f), pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]];
    } };
  }
  /* le mélange liquide + vapeur qui sort de l'orifice : gouttes froides et petites molécules */
  function melange(g, ch, n, graine) {
    const r = D.alea(graine), P = [], gg = el("g", {}, g), gm = el("g", { transform: "scale(" + KM + ")" }, g);
    for (let i = 0; i < n; i++) {
      const vap = i % 3 === 0;
      P.push({ ph: i / n, vap: vap, dy: (r() - 0.5) * 16, e: vap ? D.mol(gm) : el("circle", { r: 4 + r() * 2.5, fill: D.couleur(0.12, false), stroke: "#fff", "stroke-width": 1.4 }, gg) });
    }
    return function (t, dens, vit, froid) {
      P.forEach((p, i) => {
        const q = frac(p.ph + t * vit), a = ch.at(q * ch.len), h = Math.hypot(a[2], a[3]) || 1;
        const x = a[0] - a[3] / h * p.dy, y = a[1] + a[2] / h * p.dy, vis = (i / n) < dens ? D.fenetre(q, 0, 1, 0.08) : 0;
        if (p.vap) p.e(x / KM, y / KM, lerp(0.4, 0.1, froid), true, vis * 0.9);
        else { p.e.setAttribute("cx", x.toFixed(1)); p.e.setAttribute("cy", y.toFixed(1)); p.e.setAttribute("opacity", vis.toFixed(2)); p.e.setAttribute("fill", D.couleur(lerp(0.4, 0.06, froid), false)); }
      });
    };
  }
  /* nappe + mise à jour de la couleur (D.liquide fixe ses couleurs à la création : on relit son dégradé) */
  function nappeVive(g, o) {
    const liq = D.liquide(g, o), n = g.children.length, grad = g.children[n - 3];
    let dernier = null;
    return { maj: liq.maj, surface: liq.surface, teinte: function (temp) {
      if (temp === dernier) return; dernier = temp;
      const c = D.couleur(temp, false);
      grad.querySelectorAll("stop").forEach(s => s.setAttribute("stop-color", c));
    } };
  }
  /* la pièce qui agit : un cadre orange qui bat doucement */
  function anneau(g) {
    const r = el("rect", { rx: 12, fill: "none", stroke: "#ff6b35", "stroke-width": 5, opacity: 0 }, g);
    return function (zone, t) {
      if (!zone) { r.setAttribute("opacity", 0); return; }
      r.setAttribute("x", zone[0]); r.setAttribute("y", zone[1]); r.setAttribute("width", zone[2]); r.setAttribute("height", zone[3]);
      r.setAttribute("opacity", (0.65 + 0.35 * Math.sin(t * 5)).toFixed(2));
    };
  }
  /* une pastille HP / BP / verdict : D.pastille + une classe, pour la masquer sur petit écran (CSS) */
  const pastille = (g, x, y, s, fond, taille, ancre) => { const p = D.pastille(g, x, y, s, fond, taille, ancre); p.setAttribute("class", "ds-pastille"); return p; };
  const agitDe = (info, type) => { const a = info && info.agit; return a && typeof a === "object" ? a[type] : a; };

  /* ---------- la bande : un tube où le liquide s'évapore (évaporateur, ou tube BP après l'orifice) ----------
     La QUANTITÉ DE LIQUIDE se lit sur la NAPPE : sa longueur (elle s'arrête là où tout a bouilli). Les bulles naissent au
     fond de la nappe et y restent ; la vapeur ne se montre qu'en quelques petites molécules séparées, au-delà de la nappe
     (et très peu au-dessus d'elle). Jamais de ronds serrés qui se liraient comme des billes.
     o : { x0, x1, yh, yb (intérieur), prof:[départ, fin] (profondeur de la nappe), graine, nbMols, nbBulles, vit,
           vapSurNappe (0..1 : part des molécules montrées au-dessus de la nappe, 0,25 par défaut) }
     état : { xf (où finit le liquide, 0..1,3 : au-delà de 1 le liquide sort), flash (bulles), froid, sortie } */
  function bande(g, o) {
    const x0 = o.x0, x1 = o.x1, yh = o.yh, yb = o.yb, L = x1 - x0, prof = o.prof || [0.8, 0.18], vit = o.vit || 70;
    const KB = 0.5, surNappe = o.vapSurNappe === undefined ? 0.25 : o.vapSurNappe;
    const st = { xf: 1.3, flash: 1, froid: 1, sortie: 0.12 };
    if (!o.sansTube) D.tube(g, x0, yh - 10, L, yb - yh + 20, "cuivre", false, "#f4f8fc");
    const r = D.alea(o.graine || 7);
    const mols = el("g", { transform: "scale(" + KB + ")" }, g), V = [], nbm = o.nbMols || Math.max(6, Math.round(L / 36));
    for (let i = 0; i < nbm; i++) V.push({ s: (i + r()) / nbm, ry: r(), ph: r() * 6.28, th: r(), maj: D.mol(mols) });
    const niveau = x => { const f = (x - x0) / L; if (f >= st.xf) return 0; return lerp(prof[0], prof[1], bn(f / Math.max(st.xf, 0.2), 0, 1)) * lisse((st.xf - f) / 0.05); };
    const liq = nappeVive(g, { x0: x0, x1: x1, yh: yh, yb: yb, niveau: niveau, couleur: () => D.couleur(0, false), pas: o.pas || 10, opacite: 0.82 });
    const gb = el("g", {}, g), Bu = [], nbb = o.nbBulles || Math.max(8, Math.round(L / 24));
    for (let i = 0; i < nbb; i++) Bu.push({ p: r(), per: 1.3 + r() * 1.2, ph: r() * 3, rr: 2.5 + r() * 2.5, c: el("circle", { fill: "rgba(255,255,255,.28)", stroke: "#fff", "stroke-width": 1.8 }, gb) });
    const temp = f => f < st.xf ? lerp(0.5, 0.1, st.froid) : lerp(0.12, st.sortie, bn((f - st.xf) / Math.max(1 - st.xf, 0.05), 0, 1));
    function maj(s, t) {
      if (s) Object.assign(st, s);
      liq.teinte(lerp(0.5, 0, st.froid)); liq.maj(t);
      const span = Math.max(0, Math.min(st.xf, 1) * L - 24);
      Bu.forEach(b => {                              // une bulle naît au fond de la nappe, monte, éclate à sa surface
        const cyc = Math.floor((t + b.ph) / b.per), f = frac((t + b.ph) / b.per), xs = x0 + 12 + frac(b.p + cyc * 0.618) * span;
        const vis = niveau(xs) > 0.14 ? st.flash * D.fenetre(f, 0, 1, 0.12) : 0;
        b.c.setAttribute("cx", xs.toFixed(1)); b.c.setAttribute("cy", lerp(yb - 4, liq.surface(xs, t) + 4, f).toFixed(1));
        b.c.setAttribute("r", lerp(1.5, b.rr, f).toFixed(1)); b.c.setAttribute("opacity", vis.toFixed(2));
      });
      V.forEach(m => {                               // la vapeur : quelques petites molécules séparées
        const f = frac(m.s + t * vit / L), x = x0 + f * L, surf = liq.surface(x, t), ymin = yh + 8, ymax = Math.max(ymin, surf - 8);
        const y = ymin + m.ry * (ymax - ymin) + Math.sin(t * 3 + m.ph) * 2;
        const op = f < st.xf ? (m.th < surNappe ? 0.8 * bn((ymax - ymin - 6) / 20, 0, 1) : 0) : lisse((f - st.xf) / 0.05);
        m.maj(x / KB, y / KB, temp(f), true, (ymax - ymin) > 8 ? op : 0);
      });
    }
    return { maj: maj, niveau: niveau, surface: liq.surface, st: st };
  }
  /* ---------- deux instruments lisibles : un manomètre (cadran, aiguille) et un thermomètre (tube, réservoir, niveau) ----------
     manometre(g, cx, cy, r) → { g, maj(p) }   p : 0 pression basse … 1 haute
     thermometre(g, x, yReservoir, hauteur) → { g, maj(t) }   t : 0 froid (niveau bas, bleu) … 1 chaud (niveau haut, rouge) */
  function manometre(g, cx, cy, r) {
    const gg = el("g", {}, g), pol = (a, R) => [cx + R * Math.sin(a * Math.PI / 180), cy - R * Math.cos(a * Math.PI / 180)];
    el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, gg);
    const arc = (a0, a1, coul) => { const p0 = pol(a0, r - 9), p1 = pol(a1, r - 9); el("path", { d: "M " + p0[0].toFixed(1) + " " + p0[1].toFixed(1) + " A " + (r - 9) + " " + (r - 9) + " 0 0 1 " + p1[0].toFixed(1) + " " + p1[1].toFixed(1), fill: "none", stroke: coul, "stroke-width": 7 }, gg); };
    arc(-115, -40, "#3d7fca"); arc(-37, 37, "#e8914a"); arc(40, 115, "#c9451a");
    const aig = el("line", { x1: cx, y1: cy, x2: cx, y2: cy - r + 12, stroke: "#10233c", "stroke-width": 4.5, "stroke-linecap": "round" }, gg);
    el("circle", { cx: cx, cy: cy, r: 4.5, fill: "#10233c" }, gg);
    return { g: gg, maj: p => { const q = pol(lerp(-115, 115, bn(p, 0, 1)), r - 12); aig.setAttribute("x2", q[0].toFixed(1)); aig.setAttribute("y2", q[1].toFixed(1)); } };
  }
  function thermometre(g, x, yR, h) {
    const gg = el("g", {}, g), R = 10, yTop = yR - h;
    el("rect", { x: x - 6, y: yTop, width: 12, height: h, rx: 6, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, gg);
    const res = el("circle", { cx: x, cy: yR, r: R, stroke: D.BLEU, "stroke-width": 3 }, gg);
    el("rect", { x: x - 4, y: yR - R, width: 8, height: R, fill: "#fff" }, gg);          // masque le haut du réservoir dans le tube
    const noy = el("circle", { cx: x, cy: yR, r: R - 2 }, gg), col = el("rect", { x: x - 3, width: 6 }, gg);
    [0.3, 0.55, 0.8].forEach(f => { const y = yR - R - f * (h - R - 8); el("line", { x1: x + 8, x2: x + 15, y1: y, y2: y, stroke: D.BLEU, "stroke-width": 2.5, "stroke-linecap": "round" }, gg); });
    return { g: gg, maj: t => {
      const c = D.couleur(t, false), yN = yR - R - lerp(0.12, 0.92, bn(t, 0, 1)) * (h - R - 8);
      res.setAttribute("fill", c); noy.setAttribute("fill", c); col.setAttribute("fill", c);
      col.setAttribute("y", yN.toFixed(1)); col.setAttribute("height", (yR - yN).toFixed(1));
    } };
  }

  /* ---------- la coupe d'un détendeur à aiguille (automatique, thermostatique, électronique) : le corps ----------
     Repère 300 × 470. HP à droite (conduite à y 252–308), chambre HP en bas, siège (trou x 138–162, y 226–238),
     chambre BP au-dessus (sous la membrane), sortie BP à gauche puis vers le bas, évaporateur en bas. */
  const NY0 = 224;                                  // haut de l'aiguille fermée
  const SORTIE = [[150, 232], [150, 170], [36, 170], [36, 406], [66, 406]];
  const evapo = { x0: 18, x1: 300, yh: 388, yb: 424 };

  /* CONVENTION DE LA LIGNE : la charge du bulbe et sa pression sont VIOLETTES (#8e44ad), jamais orangées (l'orangé est le liquide HP).
     Pression du bulbe (violet) : ouvre · pression d'évaporation (bleu) : ferme · ressort (gris acier) : ferme. */
  const VIOLET = "#8e44ad";
  const hex = h => h[0] === "r" ? h.match(/\d+/g).map(Number) : [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));   // « #rrggbb » ou « rgb(r,g,b) »
  const mixHex = (a, b, f) => { const A = hex(a), B = hex(b); return "rgb(" + A.map((v, i) => Math.round(lerp(v, B[i], bn(f, 0, 1)))).join(",") + ")"; };
  const violetDe = p => { const q = bn((p - 0.3) / 0.6, 0, 1); return q < 0.3 ? mixHex("#c9a0dc", VIOLET, q / 0.3) : mixHex(VIOLET, "#4a1d63", (q - 0.3) / 0.7); };   // pression basse : clair ; haute : foncé ; régime normal : #8e44ad
  const pBulbeDe = tout => 0.3 + 0.6 * bn((tout - 0.1) / 0.5, 0, 1);                       // pression de la charge du bulbe, qualitative
  const P_NOM = pBulbeDe(DS.sortie(DS.dose(DS.ouverture("thermostatique", 0.5), 0.5)));    // … au régime normal
  const fleche = (x, yQueue, h, vers) => { const sg = vers === "bas" ? 1 : -1, yP = yQueue + sg * h, yE = yP - sg * 12; return "M " + (x - 4) + " " + yQueue + " V " + yE + " H " + (x - 11) + " L " + x + " " + yP + " L " + (x + 11) + " " + yE + " H " + (x + 4) + " V " + yQueue + " Z"; };
  /* la légende des forces, en HTML sous le dessin (jamais sur un tracé) : à insérer sous la coupe du thermostatique */
  DS.legendeForces = function (prefixe) {
    const p = document.createElement("p");
    p.className = "ds-forces";
    p.setAttribute("style", "margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;font-size:18.7px;line-height:1.25");
    const pil = (txt, fond) => '<span style="display:inline-block;padding:2px 12px;border-radius:999px;background:' + fond + ';color:#fff;font-weight:800">' + txt + "</span>";
    p.innerHTML = '<strong style="color:#1b3a63">' + (prefixe === undefined ? "Thermostatique :" : prefixe) + "</strong>" + pil("pression du bulbe : ouvre", VIOLET) + pil("pression d’évaporation : ferme", "#2f6fb8") + pil("ressort : ferme", "#5d6b7a");
    return p;
  };
  function coupe(type, svg) {
    svg.setAttribute("viewBox", "0 0 300 470");
    const g = el("g", {}, svg);
    const capi = type === "capillaire", mem = type === "automatique" || type === "thermostatique", elec = type === "electronique";
    const tubeHP = D.couleur(0.62, false);
    const parties = {
      evaporateur: [2, 368, 296, 102],
      bulbe: [226, 338, 66, 50], capillaire: [246, 52, 54, 312], membrane: [84, 4, 132, 148], ressort: [112, 282, 76, 56], aiguille: [96, 220, 108, 70],
      moteur: [100, 6, 100, 100], regulateur: [206, 0, 94, 94], sondes: [206, 336, 90, 50], tube: [90, 40, 176, 270]
    };
    // ----- 1. les lignes de mesure (tube capillaire du bulbe, câbles) : tracées EN DERNIER, par-dessus les conduites -----
    let capInt = null, chCap = null;
    const pulses = [];
    const tracerLignes = () => {
      const lg = el("g", {}, g);
      if (type === "thermostatique") {
        // le tube du bulbe : un vrai tube (paroi + intérieur continu), rempli de la charge violette, d'un seul tenant du bulbe
        // jusqu'à la chambre AU-DESSUS de la membrane ; il passe devant la conduite HP
        const pO = [[257, 352], [257, 328], [291, 328], [291, 60], [212, 60]], pI = [[257, 357], [257, 328], [291, 328], [291, 60], [204, 60]];
        const trait = (pp, st, w) => el("path", { d: "M " + pp.map(q => q.join(" ")).join(" L "), fill: "none", "stroke-linejoin": "round", "stroke-linecap": "butt", stroke: st, "stroke-width": w }, lg);
        trait(pO, "#6e3818", 17); trait(pO, "#bd7a44", 14);
        capInt = trait(pI, VIOLET, 8);
        chCap = chemin(pI);
        for (let k = 0; k < 4; k++) pulses.push(el("path", { fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, lg));   // les impulsions : des ondes plus claires
      } else if (elec) {
        el("path", { d: "M 276 362 V 346 H 296 V 86", fill: "none", stroke: "#33475b", "stroke-width": 3, "stroke-dasharray": "2 6", "stroke-linecap": "round" }, lg);
        el("path", { d: "M 234 350 V 330 H 288 V 86", fill: "none", stroke: "#33475b", "stroke-width": 3, "stroke-dasharray": "2 6", "stroke-linecap": "round" }, lg);
      }
    };

    // ----- 2. les conduites : TOUS les murs d'abord, TOUS les vides ensuite. Un tube = une paroi extérieure continue +
    //          un intérieur continu ; un coude est une courbe (jonction arrondie) ; là où un tube entre dans le corps,
    //          son vide traverse la paroi du corps : jamais un trait de paroi dans le passage du fluide. -----
    const FOND = "#f4f8fc", murs = [], vides = [];
    const tuyau = (pts, o) => { o = o || {}; murs.push([pts, o]); vides.push([o.int || pts, o]); };
    const reseau = () => {
      const trait = (pp, st, w, extra) => el("path", Object.assign({ d: "M " + pp.map(q => q.join(" ")).join(" L "), fill: "none", "stroke-linejoin": "round", stroke: st, "stroke-width": w }, extra), g);
      murs.forEach(m => {
        if (typeof m === "function") return m();
        const w = m[1].w || 56, c = { "stroke-linecap": m[1].cap || "butt" };
        trait(m[0], "#6e3818", w + 3, c); trait(m[0], "#bd7a44", w, c);
        if (w > 30) trait(m[0], "#e7a978", w - 9, Object.assign({ opacity: 0.5 }, c));
      });
      vides.forEach(m => typeof m === "function" ? m() : trait(m[0], FOND, m[1].wi || 36, { "stroke-linecap": m[1].cap || "butt" }));
    };

    // ----- 3. la partie qui change selon le type -----
    let majType = () => {};
    const flux = [];
    if (capi) {
      // la conduite HP se rétrécit (réducteur) en tube capillaire : très fin, très long, enroulé ; le fluide y change peu à peu
      const pts = [[238, 72], [100, 72], [100, 128], [240, 128], [240, 184], [100, 184], [100, 240], [240, 240], [240, 296], [100, 296], [40, 296]];
      const ptsMur = pts.slice(0, -1).concat([[64, 296]]);                       // le mur du capillaire s'arrête à la paroi de la conduite BP…
      const ptsVide = pts.slice(0, -1).concat([[36, 296]]);                      // …son vide la traverse et rejoint l'intérieur
      murs.push(() => el("polygon", { points: "304,44 262,44 238,63.5 238,80.5 262,100 304,100", fill: "url(#vm-cuivre)", stroke: "#6e3818", "stroke-width": 1.5, "stroke-linejoin": "round" }, g));
      vides.push(() => el("polygon", { points: "304,54 262,54 238,67.5 238,76.5 262,90 304,90", fill: FOND }, g));
      tuyau(ptsMur, { w: 17, wi: 9, int: ptsVide });
      tuyau([[36, 296], [36, 406], [304, 406]]);                                  // la conduite BP : coude arrondi, évaporateur (bout droit ouvert, comme les autres coupes)
      const demi = r => "M " + (36 - r) + " 296 A " + r + " " + r + " 0 0 1 " + (36 + r) + " 296 Z";   // le haut de la conduite : un bouchon arrondi (demi-disque), mur continu
      murs.push(() => [[29.5, "#6e3818", 1], [28, "#bd7a44", 1], [23.5, "#e7a978", 0.5]].forEach(c => el("path", { d: demi(c[0]), fill: c[1], opacity: c[2] }, g)));
      vides.push(() => el("path", { d: demi(18), fill: FOND }, g));
      reseau();
      el("polygon", { points: "304,54 262,54 238,67.5 238,76.5 262,90 304,90", fill: tubeHP, opacity: 0.88 }, g);
      const ch = chemin(pts), N = 26, seg = [];
      for (let k = 0; k < N; k++) {
        const a = k / N, b = (k + 1) / N + 0.012, p = ch.tronc(a * ch.len, b * ch.len).map(q => q[0].toFixed(1) + " " + q[1].toFixed(1));
        seg.push(el("path", { d: "M " + p.join(" L "), fill: "none", "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round", stroke: D.couleur(lerp(0.62, 0.06, lisse((a - 0.55) / 0.4)), false) }, g));
      }
      const refl = [], bulles = [];
      for (let i = 0; i < 16; i++) refl.push({ ph: i / 16, e: el("line", { stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.6 }, g) });
      for (let i = 0; i < 12; i++) bulles.push({ ph: i / 12, e: el("circle", { fill: "#fff", "fill-opacity": 0.55, stroke: "#fff", "stroke-width": 1.5 }, g) });
      const mel = melange(g, chemin([[36, 296], [36, 406], [66, 406]]), 10, 21);
      majType = function (t, ouv) {
        const vit = 0.05 + 0.04 * ouv;
        refl.forEach(c => { const q = frac(c.ph + t * vit), a = ch.at(q * ch.len * 0.62), b = ch.at(q * ch.len * 0.62 + 7); c.e.setAttribute("x1", a[0].toFixed(1)); c.e.setAttribute("y1", a[1].toFixed(1)); c.e.setAttribute("x2", b[0].toFixed(1)); c.e.setAttribute("y2", b[1].toFixed(1)); });
        bulles.forEach(b => { const q = frac(b.ph + t * vit), s = ch.len * (0.58 + 0.42 * q), a = ch.at(s); b.e.setAttribute("cx", a[0].toFixed(1)); b.e.setAttribute("cy", a[1].toFixed(1)); b.e.setAttribute("r", (1.5 + 2.5 * q).toFixed(1)); b.e.setAttribute("opacity", D.fenetre(q, 0, 1, 0.15).toFixed(2)); });
        mel(t, 0.55 + 0.4 * ouv, 0.07 + 0.05 * ouv, 1);
      };
    } else {
      // ----- corps commun : laiton, chambres, siège -----
      el("rect", { x: 80, y: elec ? 96 : 100, width: 140, height: 336 - (elec ? 96 : 100), rx: 12, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2.5 }, g);
      // la conduite BP : sort de la chambre BP vers la gauche, tourne en une courbe et descend jusqu'à l'évaporateur (un seul tube)
      tuyau([[96, 170], [36, 170], [36, 406], [304, 406]], { int: [[130, 170], [36, 170], [36, 406], [304, 406]] });
      // la conduite HP : arrive par la droite ; son vide traverse la paroi du corps et se raccorde à la chambre HP
      tuyau([[304, 280], [218, 280]], { int: [[304, 280], [190, 280]] });
      reseau();
      el("rect", { x: 95, y: 112, width: 110, height: 114, fill: FOND }, g);            // chambre BP
      const brume = el("rect", { x: 95, y: 112, width: 110, height: 114, fill: D.couleur(0.1, false), opacity: 0 }, g);
      el("rect", { x: 95, y: 226, width: 43, height: 12, fill: "#8a6a1f" }, g); el("rect", { x: 162, y: 226, width: 43, height: 12, fill: "#8a6a1f" }, g);   // le siège
      el("rect", { x: 95, y: 238, width: 110, height: 84, fill: FOND }, g);             // chambre HP
      el("path", { d: "M 95 238 H 205 V 262 H 304 V 298 H 205 V 322 H 95 Z", fill: tubeHP, opacity: 0.85 }, g);   // le liquide HP : chambre + conduite, d'un seul tenant
      flux.push(D.courant(g, 100, 200, 242, 318, 5, 31), D.courant(g, 205, 298, 266, 294, 6, 33));
      // l'aiguille, la tige, le ressort, la membrane ou le moteur
      const tige = el("rect", { x: 148, width: 4, fill: "#3f4a55" }, g);
      const aig = el("path", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
      const ressort = el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
      let majTete = () => {};
      if (type === "thermostatique" || type === "automatique") {
        el("path", { d: "M 87 112 V 70 Q 87 8 150 8 Q 213 8 213 70 V 112 Z", fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2.5 }, g);
        const chambre = el("path", { fill: "#f4f8fc" }, g), fluide = el("path", { fill: VIOLET, opacity: 0 }, g);
        const membrane = el("path", { fill: "none", stroke: "#24384f", "stroke-width": 5, "stroke-linecap": "round" }, g);
        const ressortHaut = el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3.5, "stroke-linejoin": "round" }, g);
        let flBP = null, flBulbe = null, flRessort = null;
        if (type === "automatique") el("rect", { x: 134, y: 0, width: 32, height: 12, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);   // la vis de réglage du ressort
        flBP = [0, 1].map(k => el("path", { fill: D.couleur(0.05, false), stroke: "#fff", "stroke-width": 1.5 }, g));          // pression d'évaporation : bleu, vers le haut, FERME
        if (type === "thermostatique") {
          flBulbe = [0, 1, 2].map(k => el("path", { fill: VIOLET, stroke: "#fff", "stroke-width": 1.5 }, g));                    // pression du bulbe : violet, vers le bas, OUVRE
          flRessort = [0, 1].map(k => el("path", { fill: "#5d6b7a", stroke: "#fff", "stroke-width": 1.5 }, g));                  // ressort : gris acier, vers le haut, FERME
        }
        majTete = function (gap, tout, bpv, sh, dOuv, ex, ouv) {
          const dm = gap, ym = 112 + dm, dCh = "M 95 112 V 70 Q 95 18 150 18 Q 205 18 205 70 V 112 Q 150 " + (112 + 2 * dm) + " 95 112 Z";
          chambre.setAttribute("d", dCh);
          if (type === "thermostatique") {            // la chambre au-dessus de la membrane est pleine de la charge violette : elle se fonce quand la pression monte
            fluide.setAttribute("d", dCh); fluide.setAttribute("fill", mixHex(violetDe(ex.pT), "#ffffff", 0.3)); fluide.setAttribute("opacity", 1);   // un ton plus clair que le tube : les flèches (#8e44ad) restent lisibles
            const hv = 24 + 62 * ex.pT;
            flBulbe.forEach((p, k) => { const x = [118, 150, 182][k], u = (x - 95) / 110, yt = 112 + 4 * dm * u * (1 - u) - 4; p.setAttribute("d", fleche(x, yt - hv, hv, "bas")); });
            flRessort.forEach((p, k) => p.setAttribute("d", fleche(k ? 188 : 112, 312, 8 + 26 * ouv, "haut")));
          } else fluide.setAttribute("opacity", 0);
          membrane.setAttribute("d", "M 95 112 Q 150 " + (112 + 2 * dm) + " 205 112");
          tige.setAttribute("y", ym); tige.setAttribute("height", (NY0 + gap + 4 - ym).toFixed(1));
          flBP.forEach((p, k) => p.setAttribute("d", fleche(k ? 182 : 118, 214, type === "thermostatique" ? 8 + 40 * bpv : 14 + 62 * bpv, "haut")));   // la pression d'évaporation pousse la membrane vers le haut
          if (type === "automatique") {
            let d = "M 150 24"; const top = 24, bot = ym - 2;
            for (let k = 1; k <= 8; k++) d += " L " + (k % 2 ? 133 : 167) + " " + (top + (bot - top) * k / 8).toFixed(1);
            ressortHaut.setAttribute("d", d + " L 150 " + bot.toFixed(1));
          }
        };
      } else {                                      // électronique : un moteur pas à pas sur la tige
        el("rect", { x: 87, y: 96, width: 126, height: 16, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2 }, g);
        el("rect", { x: 108, y: 6, width: 84, height: 92, rx: 10, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2.5 }, g);
        [24, 78].forEach(y => el("rect", { x: 108, y: y, width: 84, height: 8, fill: "#4e5a66" }, g));
        el("circle", { cx: 150, cy: 52, r: 22, fill: "#e3e8ee", stroke: "#4e5a66", "stroke-width": 3 }, g);
        const rotor = el("g", {}, g); el("rect", { x: 146, y: 32, width: 8, height: 20, rx: 3, fill: "#c9451a" }, rotor);
        let rot = 0, derniere = null;
        // le régulateur : deux barres, la surchauffe mesurée et la consigne
        el("rect", { x: 212, y: 4, width: 84, height: 82, rx: 9, fill: D.BLEU }, g);
        el("rect", { x: 220, y: 12, width: 68, height: 50, rx: 4, fill: "#e9f1fa" }, g);
        const mesure = el("rect", { x: 232, width: 14, rx: 2 }, g), consigne = el("rect", { x: 262, width: 14, rx: 2, fill: "#1e7e54" }, g);
        el("line", { x1: 224, x2: 284, y1: 58, y2: 58, stroke: D.BLEU, "stroke-width": 2 }, g);
        const voyant = el("circle", { cx: 254, cy: 74, r: 6, fill: "#e9f1fa" }, g);
        el("path", { d: "M 212 50 H 192", stroke: "#33475b", "stroke-width": 3, "stroke-dasharray": "2 6", "stroke-linecap": "round", fill: "none" }, g);
        // les sondes sur le tube de sortie : thermomètre (pince) et capteur de pression
        el("rect", { x: 224, y: 346, width: 20, height: 30, rx: 4, fill: "url(#vm-noir)" }, g);
        el("rect", { x: 266, y: 360, width: 20, height: 16, rx: 3, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
        majTete = function (gap, tout, bpv, sh, ouvOrdre) {
          tige.setAttribute("y", 108); tige.setAttribute("height", (NY0 + gap + 4 - 108).toFixed(1));
          if (derniere !== null) rot += (gap - derniere) * 0.55; derniere = gap;
          rotor.setAttribute("transform", "rotate(" + (rot * 57.3).toFixed(1) + " 150 52)");
          const h = 4 + 44 * bn(sh, 0, 1);
          mesure.setAttribute("y", 58 - h); mesure.setAttribute("height", h); mesure.setAttribute("fill", sh > 0.42 ? "#c9451a" : D.couleur(0.2, false));
          consigne.setAttribute("y", 58 - 17); consigne.setAttribute("height", 17);
          voyant.setAttribute("fill", ouvOrdre > 0.02 ? "#ff6b35" : ouvOrdre < -0.02 ? "#3d7fca" : "#e9f1fa");
        };
      }
      const chSortie = chemin(SORTIE), mel = melange(g, chSortie, 14, 17);
      let ouvPrec = 0.5;
      majType = function (t, ouv, tout, bpv, sh, ex) {
        const gap = 25 * ouv, ny = NY0 + gap;
        aig.setAttribute("d", "M 143 " + ny.toFixed(1) + " H 157 L 172 " + (ny + 34).toFixed(1) + " H 128 Z");
        if (type === "thermostatique") {            // le ressort sous l'aiguille, qui la remonte
          let d = "M 150 " + (ny + 34).toFixed(1); const top = ny + 34, bot = 316;
          for (let k = 1; k <= 8; k++) d += " L " + (k % 2 ? 134 : 166) + " " + (top + (bot - top) * k / 8).toFixed(1);
          ressort.setAttribute("d", d + " L 150 316");
        } else ressort.setAttribute("d", "");
        majTete(gap, tout, bpv, sh, ouv - ouvPrec, ex, ouv);
        ouvPrec = ouv;
        flux.forEach(f => f(-t, 55 + 90 * ouv));
        brume.setAttribute("opacity", (0.35 * (0.2 + ouv)).toFixed(2));
        mel(t, 0.2 + 0.8 * ouv, 0.12 + 0.12 * ouv, 1);
      };
      el("rect", { x: 120, y: 316, width: 60, height: 6, fill: "url(#vm-acier)" }, g);
      if (type === "thermostatique") el("rect", { x: 138, y: 336, width: 24, height: 14, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);   // la vis de réglage du ressort
    }

    // l'évaporateur : le liquide, les bulles, la vapeur dans le tube dont les murs sont déjà posés ; la chaleur de la chambre dessous
    const bandeE = bande(g, { x0: evapo.x0, x1: evapo.x1, yh: evapo.yh, yb: evapo.yb, graine: 11, sansTube: true });
    const chaleurs = [0, 1, 2, 3, 4].map(k => ({ x: 40 + k * 58, f: k * 0.19, maj: D.chaleur(el("g", {}, g)) }));   // plus la charge est forte, plus il y a de flèches

    // ----- 4. le bulbe (thermostatique) : un petit réservoir sur le tube de sortie, plein de la charge violette -----
    let bulbeInt = null;
    if (type === "thermostatique") {
      el("rect", { x: 232, y: 350, width: 50, height: 28, rx: 11, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
      bulbeInt = el("rect", { x: 237, y: 355, width: 40, height: 18, rx: 7 }, g);
      [244, 270].forEach(x => el("rect", { x: x - 4, y: 345, width: 8, height: 38, rx: 3, fill: "#5d6b7a" }, g));
    }

    // ----- 5. l'évaporateur, pastilles, anneau -----
    tracerLignes();
    pastille(g, capi ? 254 : 253, capi ? 26 : 230, "HP", "#c9451a", 22, "middle"); pastille(g, 36, capi ? 250 : 124, "BP", "#1b3a63", 24, "middle");
    const voirZone = anneau(el("g", {}, g));          // l'anneau est posé en dernier : il passe par-dessus tout

    let derniers = { xf: 1, bp: 0.5, sortie: 0.1, ouverture: 0.5, surchauffe: 0 };
    function maj(etat, t, info) {
      const c = bn(etat && etat.charge !== undefined ? etat.charge : 0.5, 0, 1);
      const ouv = bn(etat && etat.ouverture !== undefined && !capi ? etat.ouverture : DS.ouverture(type, c), 0, 1);
      const o = capi ? 0.5 : ouv, xf = DS.dose(o, c), tout = DS.sortie(xf), bpv = DS.bp(c, o), sh = xf >= 1 ? 0 : (1 - xf) / 0.7;
      bandeE.maj({ xf: xf, flash: 0.4 + 0.6 * o, froid: 1, sortie: tout }, t);
      chaleurs.forEach((h, k) => { const q = frac(h.f + t * 0.5); h.maj(h.x, 436 + 5 * (1 - q), 180, D.fenetre(q, 0, 1, 0.25) * bn(c * 5.2 - k * 0.9 + 0.2, 0, 1) * 0.95); });
      let ex = null;
      if (type === "thermostatique") {                // la chaîne : sortie plus chaude → bulbe → impulsions dans le tube → chambre → membrane
        const sig = etat && etat.signal !== undefined ? bn(etat.signal, 0, 1) : 1, pB = pBulbeDe(tout), pT = lerp(P_NOM, pB, lisse((sig - 0.35) / 0.5));
        const pouls = etat && etat.pouls !== undefined ? bn(etat.pouls, 0, 1) : 0;
        ex = { pB: pB, pT: pT, transit: Math.max(lisse(sig * 6) * lisse((1 - sig) * 6), pouls) };
      }
      majType(t, o, tout, bpv, sh, ex);
      if (ex) {
        bulbeInt.setAttribute("fill", violetDe(ex.pB));
        capInt.setAttribute("stroke", violetDe((ex.pB + ex.pT) / 2));
        pulses.forEach((pp, k) => {
          const sd = frac(t * 0.28 + k / 4) * chCap.len, q = chCap.tronc(sd, Math.min(chCap.len, sd + 20));
          pp.setAttribute("d", "M " + q.map(z => z[0].toFixed(1) + " " + z[1].toFixed(1)).join(" L "));
          pp.setAttribute("opacity", (0.8 * ex.transit * D.fenetre(sd / chCap.len, 0, 1, 0.08)).toFixed(2));
        });
      }
      const a = agitDe(info, type);
      voirZone(a && parties[a] ? parties[a] : null, t);
      derniers = { xf: xf, bp: bpv, sortie: tout, ouverture: o, surchauffe: sh, pBulbe: ex ? ex.pB : null, pTete: ex ? ex.pT : null };
    }
    return { maj: maj, lire: () => derniers, parties: parties, type: type };
  }
  DS.coupe = coupe;
  DS.bande = bande; DS.manometre = manometre; DS.thermometre = thermometre;

  /* ---------- le passage : l'orifice et ce qui suit (écrans « pourquoi détendre » et « deux missions ») ----------
     DS.passage(svg, o) : viewBox 960 × 330 (mode melange ; recadré sur téléphone) ou 350 (mode evap). La conduite HP (liquide tiède, orangé) arrive à gauche, traverse une plaque
     percée d'un passage étroit, et repart en BP (bleu) dans un tube plus gros (o.mode = "melange") ou dans l'évaporateur
     (o.mode = "evap", dont la fin du liquide dépend de l'ouverture).
     État : ouv (largeur du passage 0..1) · passe (le liquide franchit le passage : 0..1) · chute (la pression baisse : 0..1)
            flash (les bulles naissent : 0..1) · froid (le mélange se refroidit : 0..1) · v1 v2 v3 (pastilles de verdict, 0/1).
     Pièces à allumer (info.agit) : hp, passage, pressions, melange, evaporateur. */
  DS.passage = function (svg, o) {
    o = o || {};
    const evap = o.mode === "evap";
    svg.setAttribute("viewBox", evap ? "0 40 960 350" : "0 40 960 330");
    const g = el("g", {}, svg), xp = evap ? 150 : 330, yc = 240;
    const hpIn = evap ? [170, 310] : [190, 290], bpIn = evap ? [170, 310] : [130, 350];
    const tiede = D.couleur(0.62, false);
    // la conduite HP : tube plein de liquide tiède
    D.tube(g, 0, hpIn[0] - 10, xp + 18, hpIn[1] - hpIn[0] + 20, "cuivre", false, "#f4f8fc");   // jusqu'au bord de la plaque : le fluide traverse le passage sans trait
    el("rect", { x: 0, y: hpIn[0], width: xp + 18, height: hpIn[1] - hpIn[0], fill: tiede, opacity: 0.88 }, g);
    const flux = D.courant(g, 0, xp - 24, hpIn[0], hpIn[1], 7, 5);
    // le côté BP : un groupe qui apparaît quand le liquide passe
    const bpg = el("g", {}, g);
    const x0 = xp + 18, B = bande(bpg, { x0: x0, x1: 960, yh: bpIn[0], yb: bpIn[1], prof: evap ? [0.8, 0.18] : [0.58, 0.3], graine: 13, vapSurNappe: evap ? 0.2 : 0.6, nbBulles: evap ? 24 : 30, vit: 85 });
    const jet = el("path", { fill: tiede, opacity: 0.9 }, g);
    // la plaque percée : deux blocs de laiton, le passage entre eux
    const hautP = el("rect", { x: xp - 18, y: bpIn[0] - 10, width: 36, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2 }, g);
    const basP = el("rect", { x: xp - 18, width: 36, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2 }, g);
    // la chaleur qui entre par l'évaporateur
    const chaleurs = [];
    if (evap) { const gc = el("g", {}, g); for (let k = 0; k < 6; k++) chaleurs.push({ x: 430 + k * 100, f: k * 0.17, maj: D.chaleur(gc) }); }
    // les instruments au-dessus des tubes : un manomètre par côté ; en mode "melange" aussi un thermomètre par côté.
    // Les pastilles existent en deux tailles (la grande sert sur téléphone). yc = le centre vertical de la rangée.
    const paires = [], yd = evap ? 96 : 80;
    const duo = (x, s, fond, ancre, yc) => { const d = { p: pastille(g, x, yc + 8.4, s, fond, 28, ancre), G: pastille(g, x, yc + 12, s, fond, 40, ancre) }; paires.push(d); return d; };
    const mHP = manometre(g, evap ? 60 : 80, yd, 30), mBP = manometre(g, evap ? 270 : x0 + 50, yd, 30);
    duo(evap ? 148 : 166, "HP", "#c9451a", "middle", yd);
    const pBP = duo(evap ? 350 : x0 + 140, "BP", "#1b3a63", "middle", yd);
    let tHP = null, tBP = null, pTiede = null, pFroid = null;
    if (!evap) {
      tHP = thermometre(g, 250, 170, 56); tBP = thermometre(g, 556, 111, 56);
      pTiede = duo(232, "tiède", "#b06a00", "end", 144); pFroid = duo(584, "froid", "#1f5b99", "start", 80);
    }
    const verdicts = evap ? [["il manque du liquide", "#b06a00"], ["du liquide revient au compresseur", "#c0392b"], ["juste ce qu’il faut", "#1e7e54"]].map(([s, c]) => duo(950, s, c, "end", 358)) : [];
    let etroit = null;
    const bascule = () => { const r = svg.getBoundingClientRect(), e = r.width > 0 && r.width < 700; if (e === etroit) return; etroit = e; if (!evap) svg.setAttribute("viewBox", e ? "40 40 700 330" : "0 40 960 330"); paires.forEach(d => { d.p.style.display = e ? "none" : ""; d.G.style.display = e ? "" : "none"; }); };
    if (window.ResizeObserver) new ResizeObserver(bascule).observe(svg);
    bascule();
    const opa = (d, v) => { d.p.setAttribute("opacity", v); d.G.setAttribute("opacity", v); };
    const zone = anneau(el("g", {}, g));
    const ZONES = { passage: [xp - 30, bpIn[0] - 16, 60, bpIn[1] - bpIn[0] + 32], pressions: evap ? [28, 58, 400, 76] : [44, 42, 700, 76], evaporateur: [x0 - 6, bpIn[0] - 16, 960 - x0 + 6, bpIn[1] - bpIn[0] + 32], melange: [x0 - 6, bpIn[0] - 16, 960 - x0 + 6, bpIn[1] - bpIn[0] + 32], hp: [0, hpIn[0] - 16, xp - 18, hpIn[1] - hpIn[0] + 32] };
    let dernier = {};
    function maj(e, t, info) {
      e = e || {};
      const ouv = bn(e.ouv === undefined ? 0.5 : e.ouv, 0, 1), passe = bn(e.passe === undefined ? 1 : e.passe, 0, 1), chute = bn(e.chute === undefined ? 1 : e.chute, 0, 1);
      const flash = bn(e.flash === undefined ? 1 : e.flash, 0, 1), froid = bn(e.froid === undefined ? 1 : e.froid, 0, 1);
      const gap = 3 + 21 * ouv;
      hautP.setAttribute("height", Math.max(0, yc - gap - (bpIn[0] - 10)).toFixed(1)); hautP.setAttribute("y", bpIn[0] - 10);
      basP.setAttribute("y", (yc + gap).toFixed(1)); basP.setAttribute("height", Math.max(0, bpIn[1] + 10 - (yc + gap)).toFixed(1));
      flux(t, (30 + 90 * ouv) * (0.3 + 0.7 * passe));
      bpg.setAttribute("opacity", passe.toFixed(2));
      const xf = evap ? DS.dose(ouv, 0.5) : 1.3, sortie = DS.sortie(xf);
      B.maj({ xf: xf, flash: flash, froid: evap ? 1 : froid, sortie: sortie }, t);
      // le jet : du passage vers la droite, il s'élargit ; orangé tant qu'il n'a pas refroidi
      const jc = D.couleur(evap ? lerp(0.62, 0.06, flash) : lerp(0.62, 0.06, froid), false), jl = 70 + 90 * flash;
      jet.setAttribute("d", "M " + (xp + 18) + " " + (yc - gap).toFixed(1) + " L " + (xp + 18 + jl) + " " + (yc - gap * 2.2).toFixed(1) + " L " + (xp + 18 + jl) + " " + (yc + gap * 2.2).toFixed(1) + " L " + (xp + 18) + " " + (yc + gap).toFixed(1) + " Z");
      jet.setAttribute("fill", jc); jet.setAttribute("opacity", (0.85 * passe * (1 - 0.85 * flash)).toFixed(2));
      // les instruments : la pression tombe (aiguille), le liquide se refroidit (niveau du thermomètre)
      mHP.maj(0.92); mBP.maj(lerp(0.92, 0.18, chute));
      mBP.g.setAttribute("opacity", passe.toFixed(2)); opa(pBP, passe.toFixed(2));
      if (tHP) {
        tHP.maj(0.62); tBP.maj(lerp(0.62, 0, froid)); tBP.g.setAttribute("opacity", passe.toFixed(2));
        opa(pFroid, (lisse((froid - 0.05) / 0.35) * passe).toFixed(2)); opa(pTiede, 1);
      }
      chaleurs.forEach(c => { const q = frac(c.f + t * 0.4); c.maj(c.x, 112 + 26 * q, 0, D.fenetre(q, 0, 1, 0.25) * 0.9); });
      verdicts.forEach((v, k) => opa(v, bn(e["v" + (k + 1)] || 0, 0, 1).toFixed(2)));
      const a = info && info.agit; zone(a && ZONES[a] ? ZONES[a] : null, t);
      dernier = { ouverture: ouv, xf: xf, sortie: sortie };
    }
    return { maj: maj, lire: () => dernier };
  };

  /* ---------- le pas à pas : 3 à 6 étapes, une étape = un évènement cause → effet ----------
     def : { init: {...état de départ}, etapes: [{ nom, dire, cible: {...}, agit, duree }], construire(dessin) → maj(etat, t, info) }
     Les nombres de `cible` sont rejoints en douceur pendant l'étape ; la pièce `agit` est allumée.
     Boutons : ⏸/▶ (le dessin vit tant qu'on ne l'arrête pas), une pastille par étape (l'étape se joue puis le dessin
     reste dessus), ↻ tout rejouer (le bouton ⏸ devient ↻ à la fin), 🐢 ralenti. */
  const scenes = [];
  let avant = 0, tourne = false;
  function boucle(now) {
    const dt = avant ? Math.min(0.1, (now - avant) / 1000) : 0;
    avant = now;
    for (let i = scenes.length - 1; i >= 0; i--) {
      const s = scenes[i];
      if (!s.hote.isConnected) { scenes.splice(i, 1); continue; }
      if (s.hote.getClientRects().length) s.pas(dt);
    }
    requestAnimationFrame(boucle);
  }
  DS.jouer = function (hote, def) {
    DS.pret();
    const etapes = def.etapes, n = etapes.length, fin = [];
    let acc = Object.assign({}, def.init);
    etapes.forEach(e => { acc = Object.assign({}, acc, e.cible || {}); fin.push(acc); });
    hote.classList.add("ds-scene");
    const dessin = document.createElement("div"); dessin.className = "ds-dessin"; hote.appendChild(dessin);
    DS.fond(dessin);
    const maj = def.construire(dessin);
    const barre = document.createElement("div"); barre.className = "ds-barre";
    barre.innerHTML = '<button type="button" class="ds-lecture" aria-pressed="true" aria-label="Pause"><span class="ico">⏸</span><span class="lib"> Pause</span></button>' +
      etapes.map((e, i) => '<button type="button" class="ds-etape" data-etape="' + i + '" aria-label="Étape ' + (i + 1) + " : " + e.nom.replace(/"/g, "") + '" title="' + e.nom.replace(/"/g, "") + '">' + (i + 1) + "</button>").join("") +
      '<button type="button" class="ds-ralenti" aria-pressed="false" aria-label="Ralenti"><span class="ico">🐢</span><span class="lib"> Ralenti</span></button><p class="ds-legende" aria-live="polite"></p>';
    hote.appendChild(barre);
    const S = { k: -1, f: 1, de: def.init, vers: def.init, etat: Object.assign({}, def.init), joue: true, tout: false, t: 0, lent: false, attente: 0 };
    const legende = barre.querySelector(".ds-legende"), bLecture = barre.querySelector(".ds-lecture"), bLent = barre.querySelector(".ds-ralenti");
    const boutons = () => {
      barre.querySelectorAll(".ds-etape").forEach((b, i) => { if (i === S.k) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
      const fini = S.k === n - 1 && S.f >= 1 && !S.tout;
      const lib = !S.joue ? ["▶", "Reprendre"] : fini ? ["↻", "Rejouer"] : ["⏸", "Pause"];
      bLecture.innerHTML = '<span class="ico">' + lib[0] + '</span><span class="lib"> ' + lib[1] + "</span>";
      bLecture.setAttribute("aria-label", lib[1]);
      bLecture.setAttribute("aria-pressed", String(S.joue));
    };
    function aller(k, tout) {
      S.k = k; S.f = 0; S.attente = 0; S.tout = !!tout; S.joue = true; S.vers = fin[k];
      S.de = tout ? Object.assign({}, S.etat) : Object.assign({}, k > 0 ? fin[k - 1] : def.init);
      if (k === 0) S.de = Object.assign({}, def.init);
      const e = etapes[k];
      legende.innerHTML = "<strong>" + (k + 1) + " · " + e.nom + "</strong> — " + e.dire;
      boutons();
    }
    barre.querySelectorAll(".ds-etape").forEach(b => b.addEventListener("click", () => aller(Number(b.dataset.etape), false)));
    bLecture.addEventListener("click", () => {
      if (S.joue && S.k === n - 1 && S.f >= 1 && !S.tout) return aller(0, true);   // fini : on rejoue tout
      S.joue = !S.joue; boutons();
    });
    bLent.addEventListener("click", () => { S.lent = !S.lent; bLent.setAttribute("aria-pressed", String(S.lent)); });
    S.pas = function (dt) {
      const agit = S.k >= 0 ? etapes[S.k].agit : null;
      if (!S.joue) { maj(S.etat, S.t, { k: S.k, f: S.f, agit: agit }); return; }
      const v = S.lent ? 0.4 : 1;
      S.t += dt * v;
      if (S.k >= 0 && S.f < 1) {
        S.f = Math.min(1, S.f + dt * v / (etapes[S.k].duree || 2.4));
        if (S.f >= 1) boutons();
      } else if (S.k >= 0 && S.tout && S.k < n - 1) {
        S.attente += dt * v;
        if (S.attente > 2.2) aller(S.k + 1, true);
      } else if (S.k >= 0 && S.tout && S.k === n - 1) { S.tout = false; boutons(); }
      const q = lisse(S.f);
      for (const key in S.vers) { const a = S.de[key], b = S.vers[key]; S.etat[key] = typeof b === "number" ? lerp(typeof a === "number" ? a : b, b, q) : b; }
      maj(S.etat, S.t, { k: S.k, f: S.f, agit: agit });
    };
    S.hote = hote;
    scenes.push(S);
    if (!tourne) { tourne = true; requestAnimationFrame(boucle); }
    aller(0, true);
    S.pas(0);
    return { aller: aller, joue: () => { S.joue = true; boutons(); }, pause: () => { S.joue = false; boutons(); }, etat: () => S.etat };
  };
  /* un dessin qui vit seul (pas de boutons) : maj(t) est rappelée à chaque image tant que `hote` est dans la page */
  DS.animer = function (hote, maj) {
    DS.pret();
    const S = { hote: hote, t: 0, pas: function (dt) { S.t += dt; maj(S.t); } };
    scenes.push(S);
    if (!tourne) { tourne = true; requestAnimationFrame(boucle); }
    S.pas(0);
    return S;
  };
})();
