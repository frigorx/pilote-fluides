/* =====================================================================
   HydroMétro — L'EAU COULE DANS LES SCHÉMAS (moteur commun, 04/10/2026)
   ---------------------------------------------------------------------
   POURQUOI : les schémas des stations montraient des flèches immobiles ;
   l'eau ne se voyait pas couler. Règle de Franck : le liquide se voit
   liquide — une nappe translucide qui avance et des reflets qui filent,
   jamais des billes. Une station ne DÉCLARE QUE SES TUBES ; ce moteur
   dessine l'eau dedans et la fait avancer, fait tourner les circulateurs,
   ouvre et ferme les vannes au clic, et pose le filigrane inerWeb (R9).

   UTILISATION — dans la station, une fois le SVG de la scène posé :
     HydroEcoulement.brancher(svg, {
       tubes: [                                    // dans l'ordre où l'eau les parcourt
         { d: "M184 226H466", eau: "chaude" },     // le départ : rouge
         { d: "M466 276H184", eau: "froide" }      // le retour : bleu
       ],
       circulateurs: [{ x: 260, y: 150, r: 28 }],  // le corps de la pompe ; le symbole se pose PAR-DESSUS
       vannes: [{ id: "vd", x: 400, y: 150, nom: "vanne du départ" }],
       annonce: { el: paragrapheAriaLive, base: "texte équivalent de l'étape" }
     });
   Un TUBE : d (tracé SVG, dans le sens de l'eau) ; eau "chaude" | "froide" | "tiede" | [t0, t1]
     (0 froid → 1 chaud, dégradé du début à la fin d'un tube droit) ; largeur (défaut 20) ;
     debit (1 normal, 0,5 deux fois plus lent, 0 arrêté) ; vannes : ["vd"] (celles qui le
     coupent ; défaut : toutes — une boucle en série) ; debut (chemin déjà fait par l'eau à
     l'entrée du tube, pour la mise en route ; défaut : la somme des tubes précédents — à
     poser à la main sur les branches parallèles).
   Une VANNE : id, x, y, angle (0 sur un tube horizontal, 90 sur un vertical), nom (« vanne du
     départ »), fermee (vrai : fermée à l'arrivée). Un CIRCULATEUR : x, y, r (rayon du cercle du
     symbole posé par-dessus), eau (défaut "chaude").
   Options : vitesse (unités du viewBox par seconde, défaut 110) ; miseEnRoute (défaut vrai :
     l'eau chaude part de la production et avance dans l'eau froide) ; filigrane (défaut vrai).
   Rend un pilote : { vanne(id, fermee), debit(valeur, indexTube?), arreter() }.

   COUCHES : sous le dessin de la station (juste après le cadre de fond) le filigrane, les tubes
   et les corps de pompe ; tout en haut, les vannes (on clique dessus). Le dessin, les flèches et
   les mots de la station se posent entre les deux : l'eau ne cache jamais un texte.
   RÈGLES TENUES : tout se calcule à chaque image (requestAnimationFrame) — aucune animation CSS,
   aucun test de prefers-reduced-motion (une animation de contenu ne s'éteint jamais) ; le moteur
   s'arrête seul quand la scène quitte la page. La vanne est le symbole de la bibliothèque
   (hydraulique/vanne_manuelle : le nœud papillon), blanche ouverte, noircie fermée — la
   convention des schémas. Les teintes de l'eau sont celles de la vue 3D de l'installation.
   ===================================================================== */
(() => {
  "use strict";
  if (window.HydroEcoulement) return;

  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, at, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in at) e.setAttribute(k, at[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const borne = (x, a, b) => Math.max(a, Math.min(b, x));
  const FROID = [47, 127, 214], CHAUD = [217, 71, 43];
  const teinte = t => "rgb(" + FROID.map((f, i) => Math.round(f + (CHAUD[i] - f) * borne(t, 0, 1))).join(",") + ")";
  const TEMP = { chaude: 1, froide: 0, tiede: 0.5 };
  const PAROI = "#1b3a63", INTERIEUR = "#f4f8fc", PAPIER = "#fffdf8";
  const OPACITE_EAU = 0.62;
  let compteur = 0;

  /* une feuille, pour la main et le focus clavier des vannes (aucune animation CSS) */
  function feuille() {
    if (document.getElementById("hydro-ecoulement-style")) return;
    const s = document.createElement("style");
    s.id = "hydro-ecoulement-style";
    s.textContent = ".eau-vanne{cursor:pointer;outline:none}.eau-vanne .eau-anneau{opacity:0}"
      + ".eau-vanne:hover .eau-anneau,.eau-vanne:focus-visible .eau-anneau{opacity:1}"
      + "@media print{.eau-vanne .eau-anneau{display:none}}";
    document.head.appendChild(s);
  }

  /* la couche du dessous se glisse juste après le cadre de fond (un rect qui couvre le dessin) */
  function pointDeFond(svg, vb) {
    for (const n of svg.children) {
      const t = n.tagName.toLowerCase();
      if (t === "title" || t === "desc" || t === "defs" || t === "style") continue;
      if (t === "rect" && +n.getAttribute("width") >= 0.9 * vb.width) return n.nextSibling;
      return n;
    }
    return null;
  }

  /* le filigrane (charte R9) : le logo inerWeb, cartouche « Hydro », et « by inerweb.fr »,
     pâle, incliné, trois fois dont une au centre — derrière l'eau, le dessin et les mots */
  function filigrane(svg, couche, vb, id) {
    const defs = svg.querySelector("defs") || svg.insertBefore(el("defs", {}), svg.firstChild);
    const sym = el("symbol", { id: id + "-fil", viewBox: "0 0 420 130", overflow: "visible" }, defs);
    sym.innerHTML = '<text x="0" y="80" font-size="56" fill="#1b3a63">❄️</text>'
      + '<text x="76" y="75" font-size="52" font-weight="700" fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif">iner</text>'
      + '<text x="171" y="75" font-size="52" fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive">Web</text>'
      + '<line x1="76" x2="276" y1="80" y2="80" stroke="#e8914a" stroke-width="4"/>'
      + '<rect x="281" y="8" rx="7" width="120" height="38" fill="#e8914a"/>'
      + '<text x="341" y="34" text-anchor="middle" font-size="22" font-weight="700" fill="#fff" font-family="Segoe UI, Helvetica, Arial, sans-serif">Hydro</text>'
      + '<text x="76" y="122" font-size="30" font-weight="700" fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif">by inerweb.fr</text>';
    const g = el("g", { class: "eau-filigrane", opacity: "0.1", "aria-hidden": "true" }, couche);
    const l = vb.width * 0.36, h = l * 130 / 420;
    [[0.5, 0.52], [0.21, 0.16], [0.79, 0.88]].forEach(([fx, fy]) => {
      const cx = vb.x + vb.width * fx, cy = vb.y + vb.height * fy;
      el("use", { href: "#" + id + "-fil", x: (cx - l / 2).toFixed(1), y: (cy - h / 2).toFixed(1), width: l.toFixed(1), height: h.toFixed(1), transform: `rotate(-12 ${cx.toFixed(1)} ${cy.toFixed(1)})` }, g);
    });
  }

  /* une voie parallèle au tracé (décalée de k) : les reflets filent de part et d'autre de l'axe,
     où la station pose sa flèche de convention */
  function voies(chemin, L, decalages) {
    const pts = [];
    const n = Math.max(2, Math.ceil(L / 4));
    for (let i = 0; i <= n; i += 1) pts.push(chemin.getPointAtLength(L * i / n));
    return decalages.map(k => pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const tx = b.x - a.x, ty = b.y - a.y, m = Math.hypot(tx, ty) || 1;
      return (i ? "L" : "M") + (p.x - ty / m * k).toFixed(1) + " " + (p.y + tx / m * k).toFixed(1);
    }).join(""));
  }

  function brancher(cible, decl) {
    const svg = cible && (cible.tagName && cible.tagName.toLowerCase() === "svg" ? cible : cible.querySelector && cible.querySelector("svg"));
    if (!svg || !decl) return null;
    feuille();
    const vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal : { x: 0, y: 0, width: 760, height: 430 };
    const id = "eau" + (++compteur) + Math.random().toString(36).slice(2, 6);
    const vitesse = decl.vitesse || 110;
    const miseEnRoute = decl.miseEnRoute !== false;

    const bas = el("g", { class: "eau-dessous", "aria-hidden": "true" });
    svg.insertBefore(bas, pointDeFond(svg, vb));
    if (decl.filigrane !== false) filigrane(svg, bas, vb, id);
    const defs = svg.querySelector("defs") || svg.insertBefore(el("defs", {}), svg.firstChild);
    /* le flou des vagues de la nappe : une région en unités du dessin (un tube droit a une boîte plate) */
    const flou = el("filter", { id: id + "-flou", filterUnits: "userSpaceOnUse", x: vb.x, y: vb.y, width: vb.width, height: vb.height }, defs);
    el("feGaussianBlur", { stdDeviation: "2.2" }, flou);

    /* ---------------- les tubes ---------------- */
    let cumul = 0;
    const tubes = (decl.tubes || []).map((t, i) => {
      const W = t.largeur || 20;
      const trace = { d: t.d, fill: "none", "stroke-linejoin": "round" };
      const g = el("g", { class: "eau-tube", "data-tube": String(i) }, bas);
      const paroi = el("path", Object.assign({ stroke: PAROI, "stroke-width": W + 5, "stroke-linecap": "round" }, trace), g);
      el("path", Object.assign({ stroke: INTERIEUR, "stroke-width": W, "stroke-linecap": "round" }, trace), g);
      const L = paroi.getTotalLength();
      const [t0, t1] = Array.isArray(t.eau) ? t.eau : [TEMP[t.eau] ?? 0, TEMP[t.eau] ?? 0];
      let peinture = teinte((t0 + t1) / 2);
      if (Math.abs(t0 - t1) > 0.05) {
        const a = paroi.getPointAtLength(0), b = paroi.getPointAtLength(L);
        if (Math.hypot(b.x - a.x, b.y - a.y) > 1) {
          const gid = id + "-g" + i;
          const lg = el("linearGradient", { id: gid, gradientUnits: "userSpaceOnUse", x1: a.x, y1: a.y, x2: b.x, y2: b.y }, defs);
          [0, 0.5, 1].forEach(f => el("stop", { offset: f, "stop-color": teinte(t0 + (t1 - t0) * f) }, lg));
          peinture = "url(#" + gid + ")";
        }
      }
      /* la mise en route : l'eau d'un tube chaud est encore froide, puis le chaud avance dedans */
      const avecFront = miseEnRoute && Math.max(t0, t1) > 0.5;
      const eau = el("path", Object.assign({ stroke: avecFront ? teinte(0) : peinture, "stroke-opacity": OPACITE_EAU, "stroke-width": W, "stroke-linecap": "round" }, trace), g);
      const front = avecFront ? el("path", Object.assign({ stroke: peinture, "stroke-opacity": OPACITE_EAU, "stroke-width": W, "stroke-linecap": "butt", "stroke-dasharray": `0 ${(L + W).toFixed(1)}` }, trace), g) : null;
      /* la nappe : des vagues plus sombres, floues, qui avancent avec l'eau ; puis les reflets qui filent */
      const nappe = el("path", Object.assign({ stroke: "#10233c", "stroke-opacity": 0.14, "stroke-width": W, "stroke-linecap": "butt", "stroke-dasharray": "46 54", filter: "url(#" + id + "-flou)" }, trace), g);
      const [v1, v2] = voies(paroi, L, [W * 0.27, -W * 0.27]);
      const reflets = [
        el("path", { d: v1, fill: "none", stroke: "#ffffff", "stroke-opacity": 0.9, "stroke-width": 3, "stroke-linecap": "round", "stroke-dasharray": "30 62" }, g),
        el("path", { d: v2, fill: "none", stroke: "#ffffff", "stroke-opacity": 0.75, "stroke-width": 2, "stroke-linecap": "round", "stroke-dasharray": "16 48" }, g)
      ];
      const tube = { t, i, L, W, eau, front, nappe, reflets, peinture, debut: t.debut !== undefined ? t.debut : cumul,
        debit: t.debit === undefined ? 1 : t.debit, phase: 7 + i * 23, rempli: 0, plein: !front, vu: 1 };
      cumul += L;
      return tube;
    });

    /* ---------------- les circulateurs : l'eau tourne dans le corps de la pompe ---------------- */
    const pompes = (decl.circulateurs || []).map(c => {
      const g = el("g", { class: "eau-pompe" }, bas);
      el("circle", { cx: c.x, cy: c.y, r: c.r, fill: INTERIEUR }, g);
      el("circle", { cx: c.x, cy: c.y, r: c.r, fill: teinte(TEMP[c.eau || "chaude"] ?? 1), "fill-opacity": OPACITE_EAU }, g);
      const rotor = el("g", {}, g);
      const rr = c.r * 0.66;
      for (let k = 0; k < 3; k += 1) {
        const a = k * 2 * Math.PI / 3, b = a + 1.25;
        el("path", { d: `M${(c.x + rr * Math.cos(a)).toFixed(1)} ${(c.y + rr * Math.sin(a)).toFixed(1)}A${rr.toFixed(1)} ${rr.toFixed(1)} 0 0 1 ${(c.x + rr * Math.cos(b)).toFixed(1)} ${(c.y + rr * Math.sin(b)).toFixed(1)}`,
          fill: "none", stroke: "#ffffff", "stroke-opacity": 0.92, "stroke-width": 2.6, "stroke-linecap": "round" }, rotor);
      }
      return { c, rotor };
    });

    /* ---------------- les vannes : tout en haut, on clique dessus ---------------- */
    const dessus = el("g", { class: "eau-dessus" }, svg);
    const vannes = (decl.vannes || []).map(v => {
      const g = el("g", { class: "eau-vanne", role: "button", tabindex: "0", "data-vanne": v.id, transform: `translate(${v.x} ${v.y}) rotate(${v.angle || 0})` }, dessus);
      el("circle", { r: 30, fill: "#ffffff", "fill-opacity": 0 }, g);
      el("circle", { class: "eau-anneau", r: 25, fill: "none", stroke: "#ff6b35", "stroke-width": 3, "stroke-dasharray": "6 4" }, g);
      const ailes = [el("polygon", { points: "-13,-13 -13,13 0,0" }, g), el("polygon", { points: "13,-13 13,13 0,0" }, g)];
      ailes.forEach(a => { a.setAttribute("stroke", PAROI); a.setAttribute("stroke-width", "3"); a.setAttribute("stroke-linejoin", "round"); });
      const info = el("title", {}, g);
      const vanne = { v, g, ailes, info, fermee: !!v.fermee };
      const peindre = () => {
        ailes.forEach(a => a.setAttribute("fill", vanne.fermee ? PAROI : PAPIER));
        g.setAttribute("aria-pressed", String(vanne.fermee));
        const nom = v.nom || "vanne";
        g.setAttribute("aria-label", (vanne.fermee ? "Ouvrir la " : "Fermer la ") + nom);
        info.textContent = nom.charAt(0).toUpperCase() + nom.slice(1) + (vanne.fermee ? " : fermée. Cliquez pour l’ouvrir." : " : ouverte. Cliquez pour la fermer.");
      };
      vanne.peindre = peindre;
      const basculer = () => { vanne.fermee = !vanne.fermee; peindre(); annoncer(vanne); };
      g.addEventListener("click", basculer);
      g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); basculer(); } });
      peindre();
      return vanne;
    });
    const parId = Object.fromEntries(vannes.map(v => [v.v.id, v]));
    const coupe = tube => (tube.t.vannes || vannes.map(v => v.v.id)).some(k => parId[k] && parId[k].fermee);
    const coule = tube => tube.debit > 0 && !coupe(tube);

    /* ---------------- ce que la station lit (texte équivalent, aria-live) ---------------- */
    const annonce = decl.annonce && decl.annonce.el ? decl.annonce : null;
    const ecrire = phrase => { if (annonce) annonce.el.textContent = ((annonce.base || "") + " " + phrase).trim(); };
    if (annonce && vannes.length) ecrire("Cliquez sur une vanne pour la fermer ou l’ouvrir.");
    function annoncer(vanne) {
      if (!annonce) return;
      const Nom = "La " + (vanne.v.nom || "vanne");
      const encore = tubes.filter(coule).length;
      if (vanne.fermee) {
        if (!encore) ecrire(`${Nom} est fermée : l’eau ne peut plus avancer.${pompes.length ? " Le circulateur tourne toujours, mais" : ""} plus rien ne circule, nulle part dans la boucle.`);
        else ecrire(`${Nom} est fermée : l’eau ne passe plus dans ce tronçon ; elle continue ailleurs.`);
      } else if (encore === tubes.length) ecrire(`${Nom} est ouverte : l’eau circule de nouveau sur tout le trajet.`);
      else ecrire(`${Nom} est ouverte, mais une autre vanne reste fermée : l’eau ne circule toujours pas partout.`);
    }

    /* ---------------- l'image : tout se calcule ici, à chaque image ---------------- */
    let arrete = false, prec = 0, angle = 0, parcours = 0;
    function image(maintenant) {
      if (arrete || !svg.isConnected) return;
      /* un poste lent (3D logicielle) donne peu d'images : le temps de l'eau suit l'horloge, pas les images */
      const dt = prec ? Math.min(0.25, (maintenant - prec) / 1000) : 0;
      prec = maintenant;
      angle = (angle + 380 * dt) % 360;
      pompes.forEach(p => p.rotor.setAttribute("transform", `rotate(${angle.toFixed(1)} ${p.c.x} ${p.c.y})`));
      if (tubes.some(coule)) parcours += vitesse * dt;
      tubes.forEach(tb => {
        const enMarche = coule(tb);
        if (enMarche) tb.phase += vitesse * tb.debit * dt;
        tb.vu = borne(tb.vu + (enMarche ? 1 : -1) * dt * 2.5, 0.3, 1);
        const off = (-tb.phase).toFixed(1);
        tb.nappe.setAttribute("stroke-dashoffset", off);
        tb.nappe.setAttribute("stroke-opacity", (0.14 * tb.vu).toFixed(3));
        tb.reflets[0].setAttribute("stroke-dashoffset", off);
        tb.reflets[1].setAttribute("stroke-dashoffset", (-tb.phase * 1 - 21).toFixed(1));
        tb.reflets[0].setAttribute("stroke-opacity", (0.9 * tb.vu).toFixed(3));
        tb.reflets[1].setAttribute("stroke-opacity", (0.75 * tb.vu).toFixed(3));
        if (!tb.plein && enMarche && parcours > tb.debut) {
          tb.rempli = Math.min(tb.L, tb.rempli + vitesse * tb.debit * dt);
          tb.front.setAttribute("stroke-dasharray", `${tb.rempli.toFixed(1)} ${(tb.L + tb.W).toFixed(1)}`);
          if (tb.rempli >= tb.L) { tb.plein = true; tb.eau.setAttribute("stroke", tb.peinture); tb.front.remove(); }
        }
      });
      requestAnimationFrame(image);
    }
    requestAnimationFrame(image);

    return {
      vanne(idVanne, fermee) { const v = parId[idVanne]; if (!v || v.fermee === !!fermee) return; v.fermee = !!fermee; v.peindre(); annoncer(v); },
      debit(valeur, index) { tubes.forEach(tb => { if (index === undefined || tb.i === index) tb.debit = Math.max(0, valeur); }); },
      arreter() { arrete = true; }
    };
  }

  window.HydroEcoulement = { brancher, version: "2026-10-04" };
})();
