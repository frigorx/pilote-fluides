/* Les scènes d'AéroRézo.
   Le brouillon du 26/08 ne portait qu'un seul dessin — un conduit droit avec une hélice —
   affiché par trois types d'activité sur treize ; les dix autres n'avaient que des curseurs.
   Ce fichier donne une scène par type.

   Règles tenues dans chaque scène :
   - le texte n'est jamais posé sur un tracé ni sur une pièce ;
   - les pièces se reconnaissent à leur forme, pas à leur couleur : le dessin reste lisible
     en photocopie noir et blanc ;
   - l'état au repos est déjà compréhensible ; l'animation ne fait que confirmer le sens ;
   - chaque scène porte son texte équivalent, utilisé par le lecteur d'écran et par la voix. */
(function () {
  "use strict";

  const VUE = "0 0 640 300";
  const NAVY = "#1b3a63", AIR = "#3d7fca", GAINE = "#84b7ec", ORANGE = "#ff6b35",
        ORANGE_T = "#c9451a", PAPIER = "#fffdf8", VERT = "#1e7e54", MUET = "#637285";

  const ech = value => String(value).replace(/[&<>"']/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));

  /* ---------- primitives communes ---------- */

  /* Une gaine : deux parois parallèles. Le tronçon est droit, mais il ne s'arrête jamais
     sur un angle vif — un réseau tourne avec un rayon, voir `coude`. */
  const gaine = (x, y, larg, haut) =>
    `<path class="pi-gaine" d="M${x} ${y}h${larg}M${x} ${y + haut}h${larg}"/>`;

  const gaineV = (x, y, haut, larg) =>
    `<path class="pi-gaine" d="M${x} ${y}v${haut}M${x + larg} ${y}v${haut}"/>`;

  /* Un coude : deux parois concentriques, jamais deux tronçons qui se croisent en équerre.
     Un réseau réel tourne avec un rayon — c'est ce qui fait sa continuité, et c'est aussi ce
     qui décide de sa perte de charge : un coude serré coûte cher, un coude ample presque
     rien. Dessiner l'angle vif ferait mentir le schéma sur une notion du référentiel.

     Le quart nommé est celui que l'arc occupe autour du centre de courbure : HD = en haut à
     droite du centre, BD = en bas à droite, etc. Les deux extrémités sont données dans le
     sens horaire, ce qui laisse le drapeau de balayage à 1 dans les quatre cas. */
  const QUARTS = {
    HD: (cx, cy, r) => [cx, cy - r, cx + r, cy],
    BD: (cx, cy, r) => [cx + r, cy, cx, cy + r],
    BG: (cx, cy, r) => [cx, cy + r, cx - r, cy],
    HG: (cx, cy, r) => [cx - r, cy, cx, cy - r]
  };

  function coude(cx, cy, rayon, largeur, quart) {
    const trace = QUARTS[quart];
    if (!trace) return "";
    let d = "";
    /* la paroi extérieure d'abord, puis l'intérieure : deux arcs de même centre */
    for (const r of [rayon + largeur / 2, rayon - largeur / 2]) {
      const [x1, y1, x2, y2] = trace(cx, cy, r);
      d += `M${x1.toFixed(1)} ${y1.toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ` +
        `${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
    return `<path class="pi-gaine" d="${d}"/>`;
  }

  /* L'about d'une gaine circulaire : l'ellipse qu'on voit en bout de tube. Deux traits
     parallèles ne disent pas si la section est carrée ou ronde ; cette ellipse le dit d'un
     coup d'œil, sans couleur et sans texte, donc elle tient à l'impression noir et blanc. */
  const about = (x, cy, demiHaut) =>
    `<ellipse class="pi-about" cx="${x}" cy="${cy}" rx="${(demiHaut * 0.36).toFixed(1)}" ` +
    `ry="${demiHaut}"/>`;

  /* Le flux d'air : des chevrons qui défilent réellement.
     L'air en mouvement est le sujet même du réseau — il doit couler, pas être suggéré.

     La difficulté : une file de chevrons qu'on translate laisse un trou en fin de course.
     On en dessine donc un de plus en amont, et on découpe la zone visible. La translation
     d'exactement un pas boucle alors sans raccord : le chevron supplémentaire prend la
     place du premier au moment précis où le dernier sort.

     Le sens reste lisible à l'arrêt : c'est la forme du chevron qui le porte, pas le
     mouvement. Sous prefers-reduced-motion, le défilement s'arrête, le dessin reste entier. */
  let compteurClip = 0;

  function chevrons(depart, pas, nombre, horizontal, transverse) {
    let d = "";
    const sens = Math.sign(pas) || 1;
    /* de -1 à nombre : le chevron d'indice -1 est celui qui rebouche la file */
    for (let i = -1; i < nombre; i++) {
      const long = depart + pas * (i + 0.5);
      d += horizontal
        ? `M${(long - 7 * sens).toFixed(1)} ${transverse - 7}l${(7 * sens).toFixed(1)} 7l${(-7 * sens).toFixed(1)} 7`
        : `M${transverse - 7} ${(long - 7 * sens).toFixed(1)}l7 ${(7 * sens).toFixed(1)}l7 ${(-7 * sens).toFixed(1)}`;
    }
    return d;
  }

  function fluxAnime(d, clip, pas, horizontal, classe, duree) {
    const id = `fl${++compteurClip}`;
    const rect = `<rect x="${clip.x}" y="${clip.y}" width="${clip.w}" height="${clip.h}"/>`;
    const axe = horizontal ? "--px" : "--py";
    return `<clipPath id="${id}">${rect}</clipPath>` +
      `<g clip-path="url(#${id})"><path class="pi-flux pi-coule ${classe || ""}" d="${d}" ` +
      `style="${axe}:${pas.toFixed(1)}px;--duree:${duree}s"/></g>`;
  }

  /* La longueur d'un tronçon ne doit pas changer la vitesse apparente de l'air : la durée
     suit donc le pas. Mais une scène peut vouloir montrer que deux filets ne vont PAS à la
     même vitesse — c'est à cela que sert `vitesse`, un facteur relatif au-dessus de 1 pour
     plus rapide, en dessous pour plus lent. Sans lui, rien ne change. */
  const dureeFlux = (pas, vitesse) =>
    Math.min(2.2, Math.max(0.8, Math.abs(pas) / 55)) / (vitesse > 0 ? vitesse : 1);

  function flux(x1, y, x2, nombre, classe, vitesse) {
    const pas = (x2 - x1) / nombre;
    const d = chevrons(x1, pas, nombre, true, y);
    const gauche = Math.min(x1, x2), droite = Math.max(x1, x2);
    /* la découpe part du bord de la file, pour que le chevron de réserve reste caché */
    const clip = {x: gauche - 9, y: y - 15, w: droite - gauche + 18, h: 30};
    return fluxAnime(d, clip, pas, true, classe, dureeFlux(pas, vitesse));
  }

  function fluxV(x, y1, y2, nombre, classe, vitesse) {
    const pas = (y2 - y1) / nombre;
    const d = chevrons(y1, pas, nombre, false, x);
    const haut = Math.min(y1, y2), bas = Math.max(y1, y2);
    const clip = {x: x - 15, y: haut - 9, w: 30, h: bas - haut + 18};
    return fluxAnime(d, clip, pas, false, classe, dureeFlux(pas, vitesse));
  }

  /* Un caisson d'organe : rectangle à coins vifs, cadre visible. */
  const caisson = (x, y, larg, haut, titre) =>
    `<rect class="pi-caisson" x="${x}" y="${y}" width="${larg}" height="${haut}"/>` +
    (titre ? `<text class="pi-mot" x="${x + larg / 2}" y="${y + haut + 17}" text-anchor="middle">${ech(titre)}</text>` : "");

  /* Une batterie : un serpentin qui traverse un faisceau d'ailettes. Jamais un
     rectangle plein — c'est la forme qui doit la faire reconnaître. */
  function batterie(x, y, larg, haut) {
    let ailettes = "";
    for (let i = 1; i < 9; i++) {
      const px = x + (larg * i) / 9;
      ailettes += `M${px} ${y}v${haut}`;
    }
    /* Le sommet des boucles est calé sur `y + 8` : sans cela l'arc dépasse du caisson,
       et le serpentin donne l'impression de flotter au-dessus de la batterie. */
    const pas = (larg - 12) / 3, r = pas / 2;
    const bas = y + haut - 8, haut_boucle = y + 8 + r;
    let serpentin = `M${x + 6} ${bas}`;
    for (let i = 0; i < 3; i++) {
      const bx = x + 6 + i * pas;
      serpentin += `L${bx} ${haut_boucle}A${r} ${r} 0 0 1 ${bx + pas} ${haut_boucle}L${bx + pas} ${bas}`;
    }
    return `<rect class="pi-caisson" x="${x}" y="${y}" width="${larg}" height="${haut}"/>` +
      `<path class="pi-ailette" d="${ailettes}"/><path class="pi-serpentin" d="${serpentin}"/>`;
  }

  /* Un capteur : corps, tige, et point de mesure repéré. */
  const capteur = (x, y, longueur, mot) =>
    `<rect class="pi-capteur" x="${x - 15}" y="${y - 26}" width="30" height="22" rx="3"/>` +
    `<path class="pi-tige" d="M${x} ${y - 4}v${longueur}"/>` +
    `<circle class="pi-point" cx="${x}" cy="${y + longueur}" r="4"/>` +
    (mot ? `<text class="pi-mot" x="${x}" y="${y - 32}" text-anchor="middle">${ech(mot)}</text>` : "");

  /* Découpe un texte en lignes, toujours sur un espace : couper au milieu d'un mot
     rend la scène illisible, et c'est le genre de détail qui passe inaperçu au code. */
  function couper(texte, largeur) {
    const lignes = [];
    let courante = "";
    for (const mot of texte.split(" ")) {
      if (courante && (courante + " " + mot).length > largeur) { lignes.push(courante); courante = mot; }
      else courante = courante ? courante + " " + mot : mot;
    }
    if (courante) lignes.push(courante);
    return lignes;
  }

  const mot = (x, y, texte, ancrage) =>
    `<text class="pi-mot" x="${x}" y="${y}" text-anchor="${ancrage || "middle"}">${ech(texte)}</text>`;

  const fort = (x, y, texte, ancrage) =>
    `<text class="pi-fort" x="${x}" y="${y}" text-anchor="${ancrage || "middle"}">${ech(texte)}</text>`;

  /* Le point de rosée, même relation que `dewPoint` dans app.js — pour qu'une scène
     et les curseurs de sa station n'affichent jamais deux valeurs différentes. */
  const rosee = (t, rh) => {
    const a = 17.62, b = 243.12, g = Math.log(rh / 100) + (a * t) / (b + t);
    return b * g / (a - g);
  };

  /* Une cote posée hors du dessin. */
  const cote = (x1, y, x2, texte) =>
    `<path class="pi-cote" d="M${x1} ${y - 5}v10M${x2} ${y - 5}v10M${x1} ${y}h${x2 - x1}"/>` +
    `<text class="pi-mot" x="${(x1 + x2) / 2}" y="${y - 10}" text-anchor="middle">${ech(texte)}</text>`;

  /* ---------- les treize scènes ---------- */

  const SCENES = {

    /* 1 — L'air fait un trajet : la boucle complète, pas un tube droit. */
    flow(variante) {
      const local = variante === "simple" ? "Logement" : variante === "cta" ? "Local traité" : "Local";
      /* Un trajet en Z : l'air entre en haut à gauche, traverse le local, ressort en bas
         à droite. Le dessin doit se suivre du doigt — pas former une boucle fermée. */
      const svg =
        /* les deux murs : ce qui est dehors est de part et d'autre */
        `<path class="pi-mur" d="M28 44v218M612 44v218"/>` +
        mot(34, 36, "Dehors", "start") + mot(606, 36, "Dehors", "end") +
        /* le local */
        caisson(246, 120, 148, 92) + fort(320, 172, local) +
        /* 1 — air neuf, de dehors vers la descente */
        gaine(30, 58, 217, 22) + flux(44, 69, 235, 5) +
        fort(140, 46, "1 · Air neuf") +
        /* Le virage vers le bas. Rayon d'axe 22 pour une gaine de 22 : le rapport R/D = 1
           du coude courant. Les deux parois restent concentriques, l'air n'a pas d'angle
           vif à négocier — et le dessin cesse de faire croire qu'un réseau tourne à 90°. */
        coude(247, 91, 22, 22, "HD") +
        /* 2 — descente de soufflage dans le local */
        gaineV(258, 91, 29, 22) + fluxV(269, 97, 117, 1) +
        fort(292, 104, "2 · Air soufflé", "start") +
        /* 3 — reprise, du local vers le bas */
        gaineV(352, 212, 23, 22) + fluxV(363, 214, 232, 1) +
        fort(388, 236, "3 · Air repris", "start") +
        /* le virage vers dehors, symétrique du premier */
        coude(385, 235, 22, 22, "BG") +
        /* 4 — rejet, vers dehors */
        gaine(385, 246, 225, 22) + flux(400, 257, 600, 4) +
        fort(480, 288, "4 · Air rejeté");
      return {
        svg,
        texte: `L'air fait un trajet en quatre temps : pris dehors, soufflé dans le ${local.toLowerCase()}, repris, puis rejeté dehors. Quatre flux distincts, jamais confondus.`
      };
    },

    /* 2 — Les trois pressions : deux prises qui ne mesurent pas la même chose. */
    pressure() {
      const svg =
        gaine(70, 110, 420, 80) +
        flux(100, 150, 400, 6) +
        /* prise statique : perpendiculaire à la paroi */
        `<path class="pi-tige" d="M180 110v-34"/>` + `<circle class="pi-point" cx="180" cy="110" r="4"/>` +
        fort(180, 66, "Prise statique") + mot(180, 210, "perpendiculaire à la paroi") +
        /* tube de Pitot : face au flux */
        `<path class="pi-tige" d="M360 110v-34M360 145h-22"/>` + `<circle class="pi-point" cx="338" cy="145" r="4"/>` +
        fort(360, 66, "Tube de Pitot") + mot(365, 210, "ouvert face au flux", "start") +
        /* le manomètre, hors de la gaine */
        caisson(250, 236, 140, 44) + fort(320, 264, "p totale = p s + p d") +
        `<path class="pi-liaison" d="M180 76h-60v190h130M360 76h60v190H390"/>`;
      return {
        svg,
        texte: "Deux prises dans la même gaine : l'une perpendiculaire à la paroi lit la pression statique, l'autre ouverte face au flux ajoute la pression dynamique. Leur somme est la pression totale."
      };
    },

    /* 3 — Débit, vitesse, section : la section coupée et le profil de vitesse. */
    flowcalc(variante, v) {
      const diametre = v && v.diameter ? `Ø ${v.diameter} mm` : "Ø 250 mm";
      /* profil de vitesse : rapide au centre, lent en paroi */
      let profil = "";
      for (let i = 0; i <= 8; i++) {
        const py = 118 + i * 9;
        const longueur = 14 + 46 * Math.sin((i / 8) * Math.PI);
        profil += `M300 ${py}h${longueur.toFixed(0)}`;
      }
      /* Trois filets dans la gaine, et ils ne défilent pas à la même vitesse : chacun
         prend celle que le profil annonce à sa hauteur. La même loi en sinus sert au tracé
         et au mouvement — ils ne peuvent donc pas se contredire. C'est le mouvement qui
         démontre « rapide au centre, lent contre la paroi » ; le texte ne fait que le dire. */
      const filet = (y) => flux(85, y, 270, 4, "", Math.sin(((y - 110) / 80) * Math.PI));
      const svg =
        /* l'about d'entrée : deux traits parallèles ne disent pas si la section est carrée
           ou ronde, et c'est précisément la section qui est en jeu ici */
        gaine(60, 110, 240, 80) + about(60, 150, 40) +
        filet(126) + filet(150) + filet(174) +
        /* la coupe */
        `<path class="pi-coupe" d="M300 100v100"/>` +
        `<ellipse class="pi-section" cx="300" cy="150" rx="16" ry="45"/>` +
        fort(300, 88, "Section coupée") +
        `<path class="pi-profil" d="${profil}"/>` +
        `<path class="pi-enveloppe" d="M314 118Q374 150 314 190"/>` +
        fort(430, 130, "Profil des vitesses", "start") +
        mot(430, 152, "rapide au centre,", "start") + mot(430, 172, "lent contre la paroi", "start") +
        cote(60, 232, 300, diametre) +
        mot(320, 270, "Le débit se calcule avec la vitesse moyenne, jamais avec la vitesse du centre.");
      return {
        svg,
        texte: `Une gaine coupée montre sa section et le profil des vitesses : l'air va plus vite au centre et plus lentement contre la paroi. Le débit se calcule avec la vitesse moyenne.`
      };
    },

    /* 4 — L'air humide : la vapeur ne change pas, la capacité si. */
    humidity(variante, v) {
      const t = v && v.temperature != null ? v.temperature : 22;
      /* huit points de vapeur, identiques des deux côtés */
      const points = (cx, cy) => {
        let d = "";
        const places = [[-34, -18], [-12, -30], [12, -22], [32, -8], [-28, 8], [-4, 2], [20, 14], [36, 22]];
        for (const [dx, dy] of places) d += `<circle class="pi-vapeur" cx="${cx + dx}" cy="${cy + dy}" r="5"/>`;
        return d;
      };
      const svg =
        /* air froid : contenant petit, presque plein */
        `<path class="pi-contenant" d="M70 200V120h120v80"/>` +
        points(130, 172) +
        fort(130, 104, "Air à 10 °C") + mot(130, 226, "contenant petit") + mot(130, 248, "→ humidité relative haute") +
        /* air chaud : contenant plus grand, même vapeur */
        `<path class="pi-contenant pi-capacite" d="M400 200V64h150v136"/>` +
        points(475, 168) +
        fort(475, 48, `Air à ${t} °C`) + mot(475, 226, "contenant plus grand") + mot(475, 248, "→ humidité relative basse") +
        /* la flèche du milieu */
        `<path class="pi-fleche" d="M230 150h130"/>` +
        fort(295, 132, "on chauffe") +
        mot(295, 176, "la vapeur");
      return {
        svg,
        texte: `Le même air, à deux températures. Le nombre de points de vapeur ne change pas ; c'est la capacité de l'air à en porter qui grandit avec la température. C'est pourquoi l'humidité relative baisse quand on chauffe sans rien ajouter.`
      };
    },

    /* 5 — Le point de rosée : la buée apparaît sur la paroi froide. */
    dew(variante, v) {
      /* La valeur était figée à 15,6 °C pendant que les curseurs de la station en
         calculaient une autre — deux nombres pour la même grandeur, au même écran.
         On applique ici la formule de `app.js`, sur les valeurs de l'activité. */
      const tr = v && v.dewPoint != null ? v.dewPoint
        : v && v.temperature != null && v.rh != null ? Math.round(rosee(v.temperature, v.rh) * 10) / 10
        : 15.6;
      let buee = "";
      const gouttes = [[188, 118], [196, 148], [186, 178], [198, 205], [190, 232], [200, 96]];
      gouttes.forEach(([gx, gy], i) => { buee += `<path class="pi-goutte" style="--i:${i}" d="M${gx} ${gy}c-6 7-6 13 0 13s6-6 0-13z"/>`; });
      const svg =
        /* la paroi froide, à gauche */
        `<rect class="pi-paroi" x="150" y="70" width="34" height="180"/>` +
        fort(167, 56, "Paroi froide") +
        buee + fort(238, 92, "Buée", "start") + mot(238, 112, "l'eau se dépose", "start") +
        /* l'air qui longe la paroi */
        gaine(230, 140, 340, 70) + flux(540, 175, 260, 5) +
        fort(400, 128, "Air humide qui longe la paroi") +
        /* les deux valeurs à comparer, hors du dessin */
        caisson(300, 232, 260, 48) +
        fort(430, 252, "Paroi : 12 °C") +
        fort(430, 272, `Point de rosée : ${tr} °C`);
      return {
        svg,
        texte: `Un air humide longe une paroi froide. Dès que la paroi descend sous le point de rosée, la vapeur s'y dépose en buée. On compare deux valeurs : la température de la paroi et le point de rosée de l'air.`
      };
    },

    /* 6 — La scène de contexte : le local et son usage. */
    choice() {
      const silhouette = (x, y) =>
        `<circle class="pi-personne" cx="${x}" cy="${y}" r="9"/>` +
        `<path class="pi-personne-corps" d="M${x - 13} ${y + 38}v-16a13 13 0 0 1 26 0v16"/>`;
      const svg =
        /* Le local. Le plafond est interrompu là où la gaine d'extraction le traverse :
           une gaine passe au travers, elle ne se pose pas dessus. */
        `<path class="pi-mur" d="M140 240V90h290M456 90h104v150"/>` +
        `<path class="pi-sol" d="M120 240h460"/>` +
        fort(350, 76, "Le local et son usage") +
        silhouette(230, 168) + silhouette(300, 168) + silhouette(370, 168) +
        mot(300, 232, "occupation") +
        /* entrée d'air en façade, libellé posé hors du mur */
        `<path class="pi-gaine" d="M140 112h-100M140 134h-100"/>` + flux(46, 123, 134, 2) +
        mot(40, 100, "entrée d'air", "start") +
        /* extraction au plafond, libellé posé au-dessus de la gaine */
        gaineV(430, 30, 100, 26) + fluxV(443, 126, 40, 3) +
        `<rect class="pi-caisson" x="418" y="130" width="50" height="18"/>` +
        mot(443, 22, "extraction") +
        mot(350, 268, "Le besoin vient du local et de son occupation, pas de la machine.");
      return {
        svg,
        texte: "Un local occupé, avec son entrée d'air en façade et son extraction au plafond. Le besoin de ventilation se lit d'abord dans l'usage du local et son occupation."
      };
    },

    /* 7 — Le récupérateur : deux flux qui se croisent sans se mélanger. */
    recovery() {
      let plaques = "";
      for (let i = 1; i < 7; i++) plaques += `M${182 + i * 38} 92l-76 116`;
      const svg =
        /* le caisson en losange, plaques visibles */
        `<path class="pi-caisson" d="M180 92h190l-76 116H104z"/>` +
        `<path class="pi-plaque" d="${plaques}"/>` +
        fort(237, 78, "Échangeur à plaques") +
        mot(237, 232, "les deux flux se croisent sans se toucher") +
        /* flux extérieur → soufflé, en haut */
        gaine(40, 92, 140, 34) + flux(55, 109, 165, 3) +
        gaine(370, 92, 140, 34) + flux(385, 109, 495, 3) +
        fort(45, 78, "Air extérieur", "start") + fort(510, 78, "Air soufflé", "end") +
        mot(45, 146, "2 °C", "start") + mot(510, 146, "16 °C", "end") +
        /* flux extrait → rejeté, en bas */
        gaine(370, 174, 140, 34) + flux(495, 191, 385, 3) +
        gaine(40, 174, 140, 34) + flux(165, 191, 55, 3) +
        fort(510, 226, "Air extrait", "end") + fort(45, 226, "Air rejeté", "start") +
        mot(510, 166, "21 °C", "end") + mot(45, 166, "7 °C", "start") +
        mot(320, 272, "L'efficacité se calcule sur les températures des bons flux.");
      return {
        svg,
        texte: "Un échangeur à plaques : l'air extérieur froid se réchauffe au contact des plaques que l'air extrait tiède réchauffe de l'autre côté. Les deux flux se croisent, ils ne se mélangent pas."
      };
    },

    /* 8 — Les pertes de charge : la marche à chaque accident. */
    loss() {
      const svg =
        /* le parcours et ses accidents : droit, coude, té, réduction */
        `<path class="pi-gaine" d="M50 56h120l40 40h210l30 6h140M50 82h120l40 40h178l30 -6h172"/>` +
        `<path class="pi-gaine" d="M306 122v38M332 122v38"/>` +
        flux(62, 69, 158, 3) + flux(232, 109, 296, 2) + flux(462, 109, 578, 3) +
        mot(110, 44, "droit") + mot(190, 44, "coude") + mot(352, 152, "té", "start") + mot(470, 84, "réduction") +
        /* l'échelle de pression, sous le tracé, jamais dessus */
        `<path class="pi-axe" d="M50 272V182"/>` +
        mot(36, 182, "Pa", "end") +
        `<path class="pi-marche" d="M50 190L170 202L170 222L306 232L306 248L398 254L398 266L590 272"/>` +
        `<circle class="pi-descente" r="6" style="offset-path:path(&quot;M50 190L170 202L170 222L306 232L306 248L398 254L398 266L590 272&quot;)"/>` +
        fort(105, 216, "pente douce") + mot(105, 234, "= perte linéaire") +
        fort(420, 226, "marche franche", "start") + mot(420, 244, "= perte singulière", "start") +
        `<path class="pi-repere" d="M170 82v114M306 160v62M398 122v120"/>`;
      return {
        svg,
        texte: "Le long d'un parcours, la pression descend doucement dans les portions droites — c'est la perte linéaire — et chute d'un coup à chaque coude, té ou réduction — c'est la perte singulière."
      };
    },

    /* 9 — Le point de fonctionnement : deux courbes qui se croisent. */
    fan(variante, v) {
      const resistance = v && v.resistance != null ? v.resistance : 55;
      /* la courbe réseau monte au carré ; sa raideur suit la résistance */
      const k = 0.55 + (resistance - 20) / 110;
      /* La courbe est bornée au repère : au-delà, elle sortirait du cadre. */
      let reseau = "M80 250";
      for (let x = 0; x <= 420; x += 20) {
        const y = 250 - k * (x * x) / 380;
        if (y < 66) break;
        reseau += `L${80 + x} ${y.toFixed(0)}`;
      }
      const svg =
        /* le repère */
        `<path class="pi-axe" d="M80 60v190h430"/>` +
        mot(66, 56, "Pression", "end") + mot(520, 268, "Débit", "end") +
        /* courbe du ventilateur : elle descend */
        `<path class="pi-courbe pi-ventilateur" d="M80 96C200 92 330 150 470 244"/>` +
        fort(300, 92, "Courbe du ventilateur", "start") +
        /* courbe du réseau : elle monte au carré */
        `<path class="pi-courbe pi-reseau" d="${reseau}"/>` +
        fort(96, 268, "Courbe du réseau", "start") +
        /* le point de croisement */
        /* Le point suit la courbe du ventilateur elle-même : c est son intersection avec le
           réseau. Le déplacer d un vecteur l en aurait détaché — mesuré à 55 px d écart. */
        `<circle class="pi-croisement pi-glisse" r="9" style="offset-path:path(&quot;M80 96C200 92 330 150 470 244&quot;)"/>` +
        fort(340, 150, "Point de fonctionnement", "start") +
        mot(340, 172, "c'est là que le réseau tourne, et nulle part ailleurs", "start");
      return {
        svg,
        texte: `La courbe du ventilateur descend quand le débit monte ; celle du réseau monte au carré. Le point où elles se croisent est le seul point où l'installation peut fonctionner. Fermer un registre redresse la courbe du réseau et déplace ce point.`
      };
    },

    /* 10 — La batterie : serpentin et ailettes, pas un rectangle plein. */
    heat(variante, v) {
      const froide = variante === "froide";
      const svg =
        gaine(40, 100, 170, 90) + flux(58, 145, 195, 3) +
        batterie(210, 100, 190, 90) +
        /* Titre puis légende, tous deux AU-DESSUS de la gaine (qui commence à y = 100).
           La légende était à y = 214 : en variante froide, le trait inférieur du bac
           (y = 212) la traversait de part en part et la rendait illisible. */
        fort(305, 62, froide ? "Batterie froide" : "Batterie") +
        mot(305, 84, "un serpentin traverse les ailettes") +
        gaine(400, 100, 170, 90) + flux(418, 145, 555, 3) +
        fort(60, 240, "Air entrant", "start") + mot(60, 262, "26 °C", "start") +
        fort(580, 240, "Air sortant", "end") + mot(580, 262, froide ? "14 °C" : "34 °C", "end") +
        (froide
          ? `<path class="pi-bac" d="M228 190v22h154v-22"/>` +
            `<path class="pi-siphon" d="M305 212v20a14 14 0 0 0 28 0v-14"/>` +
            fort(392, 232, "Bac et siphon", "start") +
            /* Centrée sous le siphon : à x = 392 elle touchait l'étiquette « 14 °C ». */
            mot(305, 272, "les condensats doivent partir")
          : "");
      return {
        svg,
        texte: froide
          ? "Une batterie froide : le serpentin traverse un faisceau d'ailettes, l'air se refroidit en passant au travers. L'eau qu'il perd tombe dans un bac et part par un siphon."
          : "Une batterie : le serpentin traverse un faisceau d'ailettes, et l'air change de température en passant au travers."
      };
    },

    /* 11 — Mélange et filtration : l'épaisseur du flux dit la proportion. */
    mix(variante, v) {
      const q1 = v && v.q1 ? v.q1 : 700, q2 = v && v.q2 ? v.q2 : 1300;
      const total = q1 + q2;
      const h1 = Math.max(16, Math.round((q1 / total) * 100));
      const h2 = Math.max(16, Math.round((q2 / total) * 100));
      const y1 = 68, y2 = y1 + h1 + 44;
      const svg =
        /* air extérieur, épaisseur proportionnelle au débit */
        gaine(40, y1, 150, h1) + flux(56, y1 + h1 / 2, 175, 2) +
        fort(46, y1 - 12, `Air extérieur · ${q1} m³/h`, "start") +
        /* air repris */
        gaine(40, y2, 150, h2) + flux(56, y2 + h2 / 2, 175, 2) +
        fort(46, y2 - 12, `Air repris · ${q2} m³/h`, "start") +
        /* le caisson de mélange */
        caisson(190, y1 - 8, 110, y2 + h2 + 8 - y1) + fort(245, (y1 + y2 + h2) / 2, "Mélange") +
        /* le filtre, avec ses prises de part et d'autre */
        `<rect class="pi-filtre" x="330" y="${y1}" width="34" height="${y2 + h2 - y1}"/>` +
        fort(347, y2 + h2 + 20, "Filtre") +
        `<path class="pi-tige" d="M312 ${y1 - 2}v-22M382 ${y1 - 2}v-22"/>` +
        `<path class="pi-liaison" d="M312 ${y1 - 24}h70"/>` +
        mot(347, y1 - 32, "écart de pression = encrassement") +
        /* la sortie */
        gaine(300, y1, 264, y2 + h2 - y1) + flux(392, (y1 + y2 + h2) / 2, 548, 3) +
        fort(560, y1 - 12, "Air mélangé", "end") +
        mot(320, 288, "La température de mélange suit les débits, pas une simple moyenne.");
      return {
        svg,
        texte: `Deux flux se rejoignent dans un caisson de mélange : ${q1} m³/h d'air extérieur et ${q2} m³/h d'air repris — l'épaisseur du trait dit la proportion. Le mélange traverse ensuite le filtre, dont l'encrassement se lit à l'écart de pression entre l'amont et l'aval.`
      };
    },

    /* 12 — La mesure de débit : plusieurs points, pas un seul au centre. */
    measure() {
      let points = "", croix = "";
      const positions = [104, 128, 152, 176];
      let rang = 0;
      for (const py of positions) {
        for (const px of [280, 320, 360]) {
          points += `<circle class="pi-point pi-releve" style="--i:${rang++}" cx="${px}" cy="${py}" r="4"/>`;
        }
      }
      croix = `<path class="pi-repere" d="M280 96v92M320 96v92M360 96v92"/>`;
      const svg =
        gaine(40, 90, 540, 100) +
        flux(60, 140, 250, 3) +
        croix + points +
        capteur(320, 90, 0, "Anémomètre") +
        fort(430, 118, "Douze relevés", "start") +
        mot(430, 140, "répartis dans la section", "start") +
        mot(430, 162, "→ on en fait la moyenne", "start") +
        cote(40, 226, 250, "longueur droite en amont") +
        mot(320, 268, "Un seul point au centre donnerait une vitesse trop forte.");
      return {
        svg,
        texte: "Pour mesurer un débit, on relève la vitesse en plusieurs points répartis dans la section, puis on en fait la moyenne. Une longueur droite en amont est nécessaire. Un seul relevé au centre donnerait une valeur trop forte."
      };
    },

    /* 13 — Le diagnostic : un symptôme, trois causes, un contrôle par cause. */
    diagnosis() {
      const causes = [
        ["Filtre colmaté", "relever l'écart de pression à ses bornes"],
        ["Registre refermé", "vérifier la position sur la branche"],
        ["Gaine écrasée", "suivre le tracé et mesurer plus près"]
      ];
      let colonnes = "";
      causes.forEach(([titre, controle], i) => {
        const x = 44 + i * 190;
        const lignes = couper(controle, 26);
        colonnes +=
          caisson(x, 130, 168, 56) +
          fort(x + 84, 154, titre) +
          mot(x + 84, 176, "cause possible") +
          `<path class="pi-fleche" d="M${x + 84} 190v22"/>` +
          lignes.map((ligne, n) => mot(x + 84, 236 + n * 19, ligne)).join("");
      });
      const svg =
        caisson(230, 44, 180, 46) + fort(320, 74, "Débit trop faible") +
        mot(320, 108, "un symptôme, trois causes possibles") +
        `<path class="pi-fleche pi-eventail" d="M320 90L128 128M320 90v38M320 90l192 38"/>` +
        colonnes +
        mot(320, 286, "Le bon contrôle est celui qui écarte une hypothèse, pas celui qui confirme la première idée.");
      return {
        svg,
        texte: "Un débit trop faible n'a pas une cause unique : filtre colmaté, registre refermé ou gaine écrasée. À chaque cause correspond le contrôle qui permet de l'écarter."
      };
    }
  };

  /* Les variantes de scène par identifiant de station, quand le type ne suffit pas. */
  const VARIANTES = {
    "simple-flux": "simple",
    "architecture-cta": "cta",
    "batteries": "froide"
  };

  /* Une seule pointe de flèche, partagée par toutes les scènes. */
  const DEFS = `<defs><marker id="pointe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${ORANGE_T}"/></marker></defs>`;

  function rendre(kind, stationId, valeurs) {
    const fabrique = SCENES[kind];
    if (!fabrique) return null;
    const {svg, texte} = fabrique(VARIANTES[stationId], valeurs);
    return `<svg class="scene" viewBox="${VUE}" role="img" aria-label="${ech(texte)}">${DEFS}${svg}</svg>`;
  }

  function texteEquivalent(kind, stationId, valeurs) {
    const fabrique = SCENES[kind];
    return fabrique ? fabrique(VARIANTES[stationId], valeurs).texte : "";
  }

  window.AEROREZO_SCENES = {rendre, texteEquivalent, types: Object.keys(SCENES)};
})();
