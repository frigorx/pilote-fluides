/* Carte du réseau AéroRézo.
   Les tracés ne sont pas dessinés à la main : ils sont construits à partir des parcours
   déclarés dans programme.js. Une ligne passe donc, par construction, par toutes les gares
   qu'elle dessert — c'est ce que `tests/carte-coherence.mjs` vérifie.

   Grammaire retenue, celle des plans de transport :
   - un trait par ligne, épaisseur constante, décalé perpendiculairement quand deux lignes
     empruntent le même segment ;
   - virages à 45° ou 90° seulement, jamais de courbe libre ;
   - une gare simple est un disque, une correspondance un disque à double anneau,
     un terminus une pastille allongée ;
   - le libellé est posé par recherche de place, jamais par coordonnée écrite à la main. */
(function () {
  "use strict";

  const VUE = {largeur: 1180, hauteur: 640};

  /* Grille des gares : elle vit dans programme.js (network.positions), source unique
     partagee avec la QA et le controle de coherence. On la lit, on ne la duplique pas. */
  const GRILLE = new Proxy({}, {get: (_, id) => window.AEROREZO.network.positions[id]});

  /* Ordre du faisceau : décide de quel côté chaque ligne se décale quand elle
     partage un segment. Une seule valeur par ligne, pour rester prévisible. */
  const DECALAGE = {A: 0, V: -13, C: 13, M: 26, D: -26, T: 39};

  const RAYON_GARE = 15;
  const RAYON_VIRAGE = 14;
  const EPAISSEUR = 9;

  /* ---------- géométrie ---------- */

  /* Construit le chemin entre deux gares en segments à 0°, 45° ou 90°.
     La diagonale est placée au milieu, les deux extrémités restent droites :
     c'est ce qui donne l'allure « plan de métro » et rend les virages lisibles. */
  function segments(depart, arrivee) {
    const [x1, y1] = depart, [x2, y2] = arrivee;
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 || dy === 0) return [[x1, y1], [x2, y2]];

    const ax = Math.abs(dx), ay = Math.abs(dy);
    const sx = Math.sign(dx), sy = Math.sign(dy);
    const diag = Math.min(ax, ay);

    if (ax >= ay) {
      /* trajet à dominante horizontale : droite, diagonale centrée, droite */
      const reste = (ax - diag) / 2;
      return [
        [x1, y1],
        [x1 + sx * reste, y1],
        [x1 + sx * (reste + diag), y1 + sy * diag],
        [x2, y2]
      ];
    }
    const reste = (ay - diag) / 2;
    return [
      [x1, y1],
      [x1, y1 + sy * reste],
      [x1 + sx * diag, y1 + sy * (reste + diag)],
      [x2, y2]
    ];
  }

  /* Décale les points intermédiaires d'un segment, en laissant les deux extrémités en
     place : le trait s'écarte de sa voisine entre deux gares, mais revient au centre de
     chaque gare qu'il dessert. Sans cela, une ligne passerait à côté de ses propres gares. */
  function decaler(points, ecart) {
    if (!ecart || points.length < 2) return points;
    return points.map((point, i) => {
      if (i === 0 || i === points.length - 1) return point;
      const precedent = points[i - 1], suivant = points[i + 1];
      const dx = suivant[0] - precedent[0], dy = suivant[1] - precedent[1];
      const norme = Math.hypot(dx, dy) || 1;
      return [point[0] + (dy / norme) * ecart, point[1] - (dx / norme) * ecart];
    });
  }

  /* Un segment n'est décalé que s'il est réellement emprunté par plusieurs lignes. */
  function segmentsPartages(routes) {
    const compte = {};
    for (const ids of Object.values(routes)) {
      for (let i = 0; i < ids.length - 1; i++) {
        const cle = [ids[i], ids[i + 1]].sort().join("|");
        compte[cle] = (compte[cle] || 0) + 1;
      }
    }
    return compte;
  }

  /* Un segment droit n'a pas de sommet à écarter : on lui en ajoute deux, au quart et
     aux trois quarts, pour que le fuseau puisse s'ouvrir puis se refermer. */
  function densifier(points) {
    if (points.length > 2) return points;
    const [a, b] = points;
    return [
      a,
      [a[0] + (b[0] - a[0]) * 0.25, a[1] + (b[1] - a[1]) * 0.25],
      [a[0] + (b[0] - a[0]) * 0.75, a[1] + (b[1] - a[1]) * 0.75],
      b
    ];
  }

  /* Écrit un chemin SVG en arrondissant chaque sommet. */
  function versChemin(points) {
    const nets = points.filter((point, i) => i === 0 || point[0] !== points[i - 1][0] || point[1] !== points[i - 1][1]);
    if (nets.length < 2) return "";
    let d = `M${nets[0][0].toFixed(1)} ${nets[0][1].toFixed(1)}`;
    for (let i = 1; i < nets.length - 1; i++) {
      const [xa, ya] = nets[i - 1], [x, y] = nets[i], [xb, yb] = nets[i + 1];
      const avant = Math.hypot(x - xa, y - ya), apres = Math.hypot(xb - x, yb - y);
      const r = Math.min(RAYON_VIRAGE, avant / 2, apres / 2);
      const ex = x - ((x - xa) / (avant || 1)) * r, ey = y - ((y - ya) / (avant || 1)) * r;
      const sx = x + ((xb - x) / (apres || 1)) * r, sy = y + ((yb - y) / (apres || 1)) * r;
      d += `L${ex.toFixed(1)} ${ey.toFixed(1)}Q${x.toFixed(1)} ${y.toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    }
    const fin = nets[nets.length - 1];
    return `${d}L${fin[0].toFixed(1)} ${fin[1].toFixed(1)}`;
  }

  function cheminLigne(ids, ecart, partages) {
    const compte = partages || segmentsPartages(window.AEROREZO.network.routes);
    let points = [];
    for (let i = 0; i < ids.length - 1; i++) {
      const brut = segments(GRILLE[ids[i]], GRILLE[ids[i + 1]]);
      const seul = (compte[[ids[i], ids[i + 1]].sort().join("|")] || 1) < 2;
      const part = seul ? brut : decaler(densifier(brut), ecart);
      points = points.concat(i ? part.slice(1) : part);
    }
    return versChemin(points);
  }

  /* ---------- la couronne d'une gare ----------
     Le contour d'une gare est découpé en autant d'arcs que de lignes desservies, chacun
     à la couleur de sa ligne. Les arcs sont séparés par une coupure franche : à
     l'impression noir et blanc les couleurs disparaissent, mais les coupures restent —
     on compte encore les lignes. L'arc de la ligne propriétaire part du haut. */
  const ORDRE_LIGNES = ["A", "V", "D", "C", "T", "M"];

  function couronne(x, y, rayon, routes, proprietaire, couleurs) {
    const ordonnees = ORDRE_LIGNES.filter(code => routes.includes(code));
    const depart = ordonnees.indexOf(proprietaire);
    const lignes = depart > 0 ? ordonnees.slice(depart).concat(ordonnees.slice(0, depart)) : ordonnees;
    const n = lignes.length;
    if (n === 1) return `<circle class="gare-arc" cx="${x}" cy="${y}" r="${rayon}" stroke="${couleurs[lignes[0]]}"/>`;

    const pas = 360 / n;
    /* la coupure s'élargit quand il y a peu d'arcs, pour rester visible sans les manger */
    const coupure = n <= 2 ? 14 : n === 3 ? 12 : n === 4 ? 10 : 9;
    const point = angle => {
      const rad = (angle - 90) * Math.PI / 180;
      return `${(x + rayon * Math.cos(rad)).toFixed(1)} ${(y + rayon * Math.sin(rad)).toFixed(1)}`;
    };
    return lignes.map((code, i) => {
      const debut = i * pas + coupure / 2;
      const fin = (i + 1) * pas - coupure / 2;
      const grandArc = fin - debut > 180 ? 1 : 0;
      return `<path class="gare-arc" d="M${point(debut)}A${rayon} ${rayon} 0 ${grandArc} 1 ${point(fin)}" stroke="${couleurs[code]}"/>`;
    }).join("");
  }

  /* ---------- libellés : on cherche une place, on n'en impose pas ---------- */

  const CANDIDATS = [
    [0, -30, "middle"], [0, 36, "middle"],
    [24, 5, "start"], [-24, 5, "end"],
    [0, -44, "middle"], [0, 50, "middle"],
    [24, -22, "start"], [-24, -22, "end"],
    [24, 30, "start"], [-24, 30, "end"]
  ];

  function boite(x, y, texte, ancrage, taille) {
    const largeur = texte.length * taille * 0.52;
    const gauche = ancrage === "middle" ? x - largeur / 2 : ancrage === "start" ? x - 4 : x - largeur + 4;
    return {x1: gauche, y1: y - taille * 0.85, x2: gauche + largeur, y2: y + taille * 0.28};
  }

  const chevauche = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

  /* Place les libellés un par un, en refusant toute boîte qui heurte une gare déjà
     posée, un libellé déjà posé, ou le bord de la vue. */
  function placerLibelles(gares, taille) {
    const occupe = gares.map(g => ({x1: g.x - RAYON_GARE - 4, y1: g.y - RAYON_GARE - 4, x2: g.x + RAYON_GARE + 4, y2: g.y + RAYON_GARE + 4}));
    const places = [];
    /* les gares les plus contraintes (correspondances) choisissent en premier */
    const ordre = gares.slice().sort((a, b) => b.routes.length - a.routes.length);
    for (const gare of ordre) {
      let choix = null;
      for (const [dx, dy, ancrage] of CANDIDATS) {
        const x = gare.x + dx, y = gare.y + dy;
        const b = boite(x, y, gare.label, ancrage, taille);
        if (b.x1 < 4 || b.x2 > VUE.largeur - 4 || b.y1 < 4 || b.y2 > VUE.hauteur - 4) continue;
        if (occupe.some(autre => chevauche(b, autre))) continue;
        choix = {x, y, ancrage, boite: b};
        break;
      }
      if (!choix) {
        const [dx, dy, ancrage] = CANDIDATS[0];
        const x = gare.x + dx, y = gare.y + dy;
        choix = {x, y, ancrage, boite: boite(x, y, gare.label, ancrage, taille), force: true};
      }
      occupe.push(choix.boite);
      places.push({id: gare.id, ...choix});
    }
    return new Map(places.map(p => [p.id, p]));
  }

  window.AEROREZO_CARTE = {VUE, GRILLE, DECALAGE, RAYON_GARE, EPAISSEUR, cheminLigne, placerLibelles, couronne};
})();
