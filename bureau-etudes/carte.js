/* Bureau d'études : le plan du réseau (30/10/2026, version 2, animée).
   Dessiné depuis programme.js, jamais à la main. Deux quais, la gare centrale D0 à gauche et
   le terminus R5 à droite, touchent les six lignes ; les stations sont posées à intervalles
   égaux sur leur voie. Chaque libellé a sa bande, au-dessus ou au-dessous de sa voie (en
   alternance sur la ligne T) : aucune bande ne contient un tracé, donc aucun texte sur un
   trait. Mesuré à 1280 × 800 : plus petit texte 14,2 px, 0 chevauchement.

   Animation (Franck, 30/10 : « ça manque d'image et d'animation ») : à l'ouverture, les lignes
   se tracent de D0 vers R5 l'une après l'autre et les stations apparaissent au passage du
   trait ; ensuite un train parcourt chaque ligne de temps en temps. Survol ou clavier sur une
   station : elle grossit et une fiche dit ce que l'on y rend. Clic sur la lettre d'une ligne :
   la ligne seule reste en couleur. Rien ne bouge si l'interrupteur « Animations » du site est
   coupé (moteur/animations.js répond à prefers-reduced-motion).
   Station ouverte (etat "relecture", "en-ligne" ou "construction") : disque plein et lien ;
   station à venir : cercle en pointillé. */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const DECAL = 200;   /* la ligne P « Lire les plans » occupe le haut ; les six autres descendent d'autant */
  const VUE = {largeur: 1040, hauteur: 685 + DECAL};
  const VOIES = {P: 160, E: 75 + DECAL, A: 180 + DECAL, T: 285 + DECAL, H: 390 + DECAL, F: 495 + DECAL, R: 600 + DECAL};
  const COTE = {E: "haut", A: "haut", T: "alterne", H: "bas", F: "bas", R: "bas"};
  const X0 = 120, X1 = 920, DEBUT = 160, FIN = 900;
  const TRACE = 1100, DECALE = 170;   /* durée du tracé d'une ligne, écart entre deux lignes (ms) */

  const couper = (texte, max) => texte.split(" ").reduce((lignes, mot) => {
    const der = lignes[lignes.length - 1];
    if (der && (der + " " + mot).length <= max) lignes[lignes.length - 1] = der + " " + mot;
    else lignes.push(mot);
    return lignes;
  }, []);

  const ouverte = s => s.etat === "relecture" || s.etat === "en-ligne" || s.etat === "construction";
  const etatTexte = s => ({"en-ligne": "ouverte", relecture: "en relecture", construction: "en construction"})[s.etat] || "à venir";
  const calme = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function dessiner(svg, P) {
    svg.setAttribute("viewBox", `0 0 ${VUE.largeur} ${VUE.hauteur}`);
    const anime = !calme() && typeof svg.animate === "function";
    const el = (nom, attrs, texte, parent = svg) => {
      const n = document.createElementNS(NS, nom);
      for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
      if (texte !== undefined) n.textContent = texte;
      parent.appendChild(n);
      return n;
    };
    const apparait = (n, delai) => anime && n.animate([{opacity: 0}, {opacity: 1}], {duration: 380, delay: delai, fill: "backwards", easing: "ease-out"});

    /* La fiche d'une station, posée par-dessus le plan */
    const hote = svg.parentNode;
    hote.style.position = "relative";
    const fiche = document.createElement("div");
    fiche.className = "carte-fiche";
    fiche.hidden = true;
    fiche.setAttribute("role", "status");
    hote.appendChild(fiche);
    const PL = P.PLANS;
    const lignes = PL ? [PL].concat(P.LIGNES) : P.LIGNES;
    const ligneDe = Object.fromEntries(lignes.map(l => [l.code, l]));

    function montrer(s, x, y, cercle) {
      const l = ligneDe[s.ligne] || {nom: s.code === P.GARE ? "Gare centrale" : "Terminus", couleur: "#1b3a63"};
      fiche.style.setProperty("--c", l.couleur);
      if (s.ligne === "P") {
        fiche.innerHTML = `<strong>Gare ${s.code}, ${s.titre}</strong><span class="carte-ligne">Ligne P, ${l.nom}</span>`
          + `<p>${s.rendu}.</p><p class="carte-pied">${ouverte(s) ? "Cours, test et deux PDF : cliquez pour entrer." : "Gare en relecture, pas encore ouverte."}</p>`;
      } else fiche.innerHTML = `<strong>${s.code}, ${s.titre}</strong><span class="carte-ligne">${s.ligne === "D" ? (s.code === P.GARE ? "Gare centrale" : "Terminus") : "Ligne " + s.ligne + ", " + l.nom}</span>`
        + `<p>Vous rendez : ${s.rendu}</p><p class="carte-pied">2 heures, 3 niveaux. ${ouverte(s) ? "Station " + etatTexte(s) + " : cliquez pour entrer." : "Station à venir."}</p>`;
      fiche.hidden = false;
      const k = svg.getBoundingClientRect().width / VUE.largeur;
      const gauche = Math.min(Math.max(x * k - 150, 4), svg.clientWidth - 304);
      const dessous = y < VUE.hauteur / 2;
      fiche.style.left = gauche + "px";
      fiche.style.top = dessous ? (y * k + 26) + "px" : "";
      fiche.style.bottom = dessous ? "" : (svg.clientHeight - y * k + 26) + "px";
      if (cercle) cercle.setAttribute("r", 17);
    }
    function cacher(cercle, r) { fiche.hidden = true; if (cercle) cercle.setAttribute("r", r); }

    const brancher = (g, s, x, y, cercle, r) => {
      if (!ouverte(s)) { g.setAttribute("tabindex", "0"); g.setAttribute("role", "img"); g.setAttribute("aria-label", `${s.code}, ${s.titre}, à venir. Vous rendez : ${s.rendu}`); }
      g.classList.add("carte-station");
      g.addEventListener("mouseenter", () => montrer(s, x, y, cercle));
      g.addEventListener("focus", () => montrer(s, x, y, cercle));
      g.addEventListener("mouseleave", () => cacher(cercle, r));
      g.addEventListener("blur", () => cacher(cercle, r));
    };

    /* Les quais d'abord */
    const quai = (x, s, role) => {
      const g = ouverte(s) ? el("a", {href: s.href}) : el("g", {});
      el("rect", {x, y: 30 + DECAL, width: 110, height: 615, rx: 22, fill: "#fffdf8", stroke: "#1b3a63", "stroke-width": 4}, undefined, g);
      el("text", {x: x + 55, y: 322 + DECAL, "text-anchor": "middle", fill: "#1b3a63", "font-family": "Trebuchet MS, Arial", "font-size": 30, "font-weight": 700}, s.code, g);
      el("text", {x: x + 55, y: 348 + DECAL, "text-anchor": "middle", fill: "#637285", "font-family": "Calibri, Arial", "font-size": 17}, role, g);
      couper(s.titre, 11).forEach((t, i) => el("text", {x: x + 55, y: 376 + DECAL + i * 21, "text-anchor": "middle", fill: "#10233c", "font-family": "Calibri, Arial", "font-size": 18, "font-weight": 700}, t, g));
      brancher(g, s, x + 55, 300 + DECAL, null, 0);
      apparait(g, 0);
    };

    /* Les voies, chacune avec sa lettre ; la lettre isole la ligne */
    const groupes = {};
    lignes.forEach((l, i) => {
      const y = VOIES[l.code], debut = 200 + i * DECALE;
      const g = groupes[l.code] = el("g", {"data-ligne": l.code, class: "carte-ligne-g"});
      const voie = el("line", {x1: X0, x2: X1, y1: y, y2: y, stroke: l.couleur, "stroke-width": 9, "stroke-linecap": "round"}, undefined, g);
      if (anime) {
        const long = X1 - X0;
        voie.setAttribute("stroke-dasharray", long);
        voie.animate([{strokeDashoffset: long}, {strokeDashoffset: 0}], {duration: TRACE, delay: debut, fill: "backwards", easing: "ease-in-out"})
          .finished.then(() => voie.removeAttribute("stroke-dasharray")).catch(() => {});
      }
      const lettre = el("g", {tabindex: "0", role: "button", "aria-pressed": "false", "aria-label": `Ligne ${l.code}, ${l.nom} : la montrer seule`, class: "carte-lettre"}, undefined, g);
      el("circle", {cx: 142, cy: y, r: 14, fill: l.couleur}, undefined, lettre);
      el("text", {x: 142, y: y + 6, "text-anchor": "middle", fill: "#fff", "font-family": "Trebuchet MS, Arial", "font-size": 17, "font-weight": 700}, l.code, lettre);
      const isoler = () => {
        const seule = lettre.getAttribute("aria-pressed") !== "true";
        svg.querySelectorAll(".carte-lettre").forEach(b => b.setAttribute("aria-pressed", "false"));
        lettre.setAttribute("aria-pressed", String(seule));
        Object.entries(groupes).forEach(([code, gr]) => gr.classList.toggle("carte-pale", seule && code !== l.code));
      };
      lettre.addEventListener("click", isoler);
      lettre.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); isoler(); } });
      apparait(lettre, debut);
    });
    quai(10, P.station(P.GARE), "Gare centrale");
    quai(920, P.station(P.TERMINUS), "Terminus");

    /* La ligne P : des gares numérotées, leur titre en biais au-dessus de la voie (49 px d'écart seulement) */
    if (PL) {
      const y = VOIES.P, n = PL.GARES.length, pas = (FIN - DEBUT) / n, i = 0;
      PL.GARES.forEach((s, k) => {
        const x = DEBUT + (k + 0.5) * pas;
        const g = ouverte(s) ? el("a", {href: s.href, "aria-label": `Gare ${s.code}, ${s.titre}. ${s.rendu}`}, undefined, groupes.P) : el("g", {}, undefined, groupes.P);
        const r = ouverte(s) ? 13 : 12;
        const cercle = el("circle", ouverte(s)
          ? {cx: x, cy: y, r, fill: PL.couleur, stroke: "#fffdf8", "stroke-width": 4}
          : {cx: x, cy: y, r, fill: "#fffdf8", stroke: PL.couleur, "stroke-width": 5, "stroke-dasharray": "6 4"}, undefined, g);
        el("text", {x: x + 6, y: y - 24, transform: `rotate(-40 ${x + 6} ${y - 24})`, fill: "#10233c", "font-family": "Calibri, Arial", "font-size": 16},
          `${s.code}  ${s.titre}`, g);
        brancher(g, s, x, y, cercle, r);
        apparait(g, 200 + i * DECALE + TRACE * (x - X0) / (X1 - X0));
      });
    }

    /* Les stations, qui apparaissent au passage du trait */
    P.LIGNES.forEach((l, i0) => {
      const i = i0 + (PL ? 1 : 0);
      const liste = P.deLaLigne(l.code).filter(s => s.code !== P.TERMINUS);
      const y = VOIES[l.code], n = liste.length, pas = (FIN - DEBUT) / n;
      liste.forEach((s, k) => {
        const x = DEBUT + (k + 0.5) * pas;
        const g = ouverte(s) ? el("a", {href: s.href, "aria-label": `${s.code}, ${s.titre}. Vous rendez : ${s.rendu}`}, undefined, groupes[l.code]) : el("g", {}, undefined, groupes[l.code]);
        const r = ouverte(s) ? 13 : 12;
        const cercle = el("circle", ouverte(s)
          ? {cx: x, cy: y, r, fill: l.couleur, stroke: "#fffdf8", "stroke-width": 4}
          : {cx: x, cy: y, r, fill: "#fffdf8", stroke: l.couleur, "stroke-width": 5, "stroke-dasharray": "6 4"}, undefined, g);
        const haut = COTE[l.code] === "haut" || (COTE[l.code] === "alterne" && k % 2 === 0);
        const largeur = COTE[l.code] === "alterne" ? pas * 2 : pas;
        const bloc = [s.code].concat(couper(s.titre, Math.max(9, Math.floor((largeur - 10) / 8.4))));
        bloc.forEach((texte, j) => {
          const rang = haut ? bloc.length - 1 - j : j;
          const ty = haut ? y - 22 - rang * 19 : y + 34 + j * 19;
          el("text", {x, y: ty, "text-anchor": "middle", fill: j === 0 ? "#1b3a63" : "#10233c", "font-family": "Calibri, Arial", "font-size": j === 0 ? 17 : 16, "font-weight": j === 0 ? 700 : 400}, texte, g);
        });
        brancher(g, s, x, y, cercle, r);
        apparait(g, 200 + i * DECALE + TRACE * (x - X0) / (X1 - X0));
      });
    });

    /* Le train : un passage par ligne, de temps en temps, une fois le plan tracé */
    if (anime) {
      lignes.forEach((l, i) => {
        const train = el("rect", {x: X0 - 14, y: VOIES[l.code] - 6, width: 28, height: 12, rx: 6, fill: "#fffdf8", stroke: l.couleur, "stroke-width": 3, opacity: 0, "pointer-events": "none"}, undefined, groupes[l.code]);
        /* 7 s de trajet, puis 7 s de quai : un train à la fois par ligne, pas un défilé */
        train.animate([
          {transform: "translateX(0px)", opacity: 0},
          {transform: "translateX(40px)", opacity: 1, offset: 0.03},
          {transform: `translateX(${X1 - X0 - 40}px)`, opacity: 1, offset: 0.47},
          {transform: `translateX(${X1 - X0}px)`, opacity: 0, offset: 0.5},
          {transform: `translateX(${X1 - X0}px)`, opacity: 0}
        ], {duration: 14000, delay: 200 + lignes.length * DECALE + TRACE + i * 2300, iterations: Infinity, easing: "linear"});
      });
    }
  }

  window.BE_CARTE = {VUE, VOIES, dessiner, ouverte, etatTexte};
})();
