/* ============================================================
   inerWeb R408 — bibliothèque de scènes
   24 scènes de situation, écrites à la main (charte inerWeb § 3.5) :
   trait bleu marine #1b3a63, deux aplats #e8f1fb / #84b7ec, UN SEUL
   accent orange #ff6b35 par scène, fond transparent, viewBox
   0 0 320 180, aucun texte dans le dessin (titre et description
   vivent en dehors, dans <title>/<desc>, ajoutés par sceneHtml).

   Contrôle technique de toute scène montrant un échafaudage (leçon
   du 27/09/2026, relevée par F. Henninot sur une image d'essai :
   échelle extérieure, non réglementaire) : accès par l'INTÉRIEUR de
   l'emprise, échelle avec trappe dans le plancher, garde-corps
   complet à trois éléments (lisse, lisse intermédiaire, plinthe) sur
   tout plancher occupé, personne toujours DERRIÈRE ce garde-corps,
   semelles sous les montants. Seules trois scènes montrent un
   défaut, volontairement, marqué en orange : acces-exterieur-interdit,
   chute-bord-vide, element-manquant.

   Sources d'inspiration (formes redessinées et simplifiées, jamais
   liées ni recopiées telles quelles — voir SOURCES-IMAGES.md) :
   les SVG de la station Législation « risques en hauteur » et ceux
   du QCM travail en hauteur, deux créations inerWeb déjà publiées.
   ============================================================ */

const SC = {}; // id -> { titre, alt, svg }

function scene(id, titre, alt, corps) {
  SC[id] = { titre, alt, svg: corps };
}

/* fragments réutilisés dans plusieurs scènes */
const T = {
  /* personne debout : casque (demi-cercle plein), tête, corps, jambes.
     x = axe du corps, y = haut du casque, s = échelle (1 par défaut).
     Chaque scène ajoute ses propres bras selon le geste représenté. */
  pers: (x, y, s) => {
    s = s || 1;
    const h = (v) => y + v * s, l = (v) => x + v * s, r = 9 * s;
    return (
      '<path d="M' + (x - r) + ' ' + h(9) + 'A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + h(9) + 'Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>' +
      '<circle cx="' + x + '" cy="' + h(13) + '" r="' + (7 * s) + '" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
      '<path d="M' + x + ' ' + h(20) + 'V' + h(48) + '" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M' + x + ' ' + h(48) + 'L' + l(-9) + ' ' + h(72) + 'M' + x + ' ' + h(48) + 'L' + l(9) + ' ' + h(72) +
      '" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>'
    );
  },
  /* ligne de sol, repère discret */
  sol: (y) => '<path d="M6 ' + y + 'H314" stroke="#1b3a63" stroke-width="2" opacity=".35"/>',
  /* garde-corps à trois éléments sur un plancher dont la surface de
     marche est à la hauteur py, de x à x+largeur. opts : sansLisse,
     sansPlinthe (retirer un élément, défaut volontaire), accentLisse,
     accentPlinthe (le mettre en orange, l'accent unique de la scène). */
  gc: (x, py, largeur, opts) => {
    opts = opts || {};
    const xd = x + largeur;
    let s = "";
    if (!opts.sansLisse) s += '<path d="M' + x + ' ' + (py - 38) + 'H' + xd + '" stroke="' + (opts.accentLisse ? "#ff6b35" : "#1b3a63") + '" stroke-width="2.5"/>';
    s += '<path d="M' + x + ' ' + (py - 24) + 'H' + xd + '" stroke="#1b3a63" stroke-width="2"/>';
    if (!opts.sansPlinthe) s += '<rect x="' + x + '" y="' + (py - 12) + '" width="' + largeur + '" height="7" fill="' + (opts.accentPlinthe ? "#ff6b35" : "#e8f1fb") + '" stroke="#1b3a63" stroke-width="1.5"/>';
    return s;
  },
  /* échafaudage de pied réglementaire : montants, semelles, planchers,
     garde-corps à trois éléments sur CHAQUE plancher, échelle d'accès
     À L'INTÉRIEUR de l'emprise avec trappe, amarrages vers une façade
     si options.facade. options reprend celles de T.gc (appliquées au
     dernier niveau) + sansTrappe, accentTrappe, accentAmarrage. */
  echaf: (x, y, largeur, niveaux, options) => {
    options = options || {};
    const H = 38, xd = x + largeur, top = y - niveaux * H, sommet = top - 38;
    let s =
      '<rect x="' + (x - 8) + '" y="' + (y - 3) + '" width="16" height="6" fill="#1b3a63"/>' +
      '<rect x="' + (xd - 8) + '" y="' + (y - 3) + '" width="16" height="6" fill="#1b3a63"/>' +
      '<path d="M' + x + ' ' + y + 'V' + sommet + 'M' + xd + ' ' + y + 'V' + sommet + '" stroke="#1b3a63" stroke-width="2.5" fill="none"/>';
    for (let n = 1; n <= niveaux; n++) {
      const py = y - n * H, dernier = n === niveaux;
      s += '<rect x="' + x + '" y="' + (py - 5) + '" width="' + largeur + '" height="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/>';
      s += '<path d="M' + (n % 2 ? x : xd) + ' ' + py + 'L' + (n % 2 ? xd : x) + ' ' + (py - H) + '" stroke="#1b3a63" stroke-width="1.5" opacity=".5" fill="none"/>';
      s += T.gc(x, py, largeur, {
        sansLisse: dernier && options.sansLisse, sansPlinthe: dernier && options.sansPlinthe,
        accentLisse: dernier && options.accentLisse, accentPlinthe: dernier && options.accentPlinthe,
      });
    }
    const lx = x + largeur * 0.3;
    let rungs = "";
    for (let ry = y - 10; ry > top + 6; ry -= 12) rungs += 'M' + (lx - 7) + ' ' + ry + 'H' + (lx + 7);
    if (rungs) s += '<path d="' + rungs + '" stroke="#1b3a63" stroke-width="2"/>';
    s += '<path d="M' + (lx - 7) + ' ' + y + 'V' + top + 'M' + (lx + 7) + ' ' + y + 'V' + top + '" stroke="#1b3a63" stroke-width="2" fill="none"/>';
    if (!options.sansTrappe) s += '<rect x="' + (lx - 9) + '" y="' + (top - 5) + '" width="18" height="5" fill="' + (options.accentTrappe ? "#ff6b35" : "#e8f1fb") + '" stroke="#1b3a63" stroke-width="1.5"/>';
    if (options.facade) {
      const fx = xd + 26;
      s += '<path d="M' + fx + ' ' + y + 'V' + (sommet + 4) + '" stroke="#1b3a63" stroke-width="2" opacity=".4"/>';
      let ties = "";
      for (let n = 1; n <= niveaux; n++) {
        const dernier = n === niveaux, ty = y - n * H + 6;
        if (dernier && options.accentAmarrage) s += '<path d="M' + xd + ' ' + ty + 'L' + fx + ' ' + ty + '" stroke="#ff6b35" stroke-width="3"/>';
        else ties += 'M' + xd + ' ' + ty + 'L' + fx + ' ' + ty;
      }
      if (ties) s += '<path d="' + ties + '" stroke="#1b3a63" stroke-width="2"/>';
    }
    return s;
  },
};

/* ---------- protections et défauts ---------- */

scene("chute-bord-vide", "Le bord sans protection",
  "Une personne se tient au bord d'un plancher sans garde-corps ; le vide est juste devant elle.",
  '<rect x="24" y="96" width="156" height="8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M24 104V150M60 104V150" stroke="#1b3a63" stroke-width="2" opacity=".35"/>' +
  T.pers(140, 26) +
  '<path d="M140 52L168 64" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M180 96V158" stroke="#ff6b35" stroke-width="4" stroke-dasharray="8 6"/>');

scene("echafaudage-complet", "Un échafaudage complet",
  "Un échafaudage de pied à deux niveaux : montants, planchers, garde-corps complets, échelle intérieure avec trappe, amarrages à la façade, étiquette au pied du montant.",
  T.sol(160) + T.echaf(68, 160, 150, 2, { facade: true }) +
  T.pers(26, 84) +
  '<path d="M26 108L54 126" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="52" y="120" width="22" height="16" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M68 128L52 128" stroke="#1b3a63" stroke-width="1.5"/>');

scene("garde-corps-trois-elements", "Les trois éléments du garde-corps",
  "Gros plan sur un garde-corps : lisse, lisse intermédiaire et plinthe orange ; une main est posée sur la lisse.",
  '<path d="M30 20V170M290 20V170" stroke="#1b3a63" stroke-width="2.5"/>' +
  T.gc(30, 140, 260, { accentPlinthe: true }) +
  '<path d="M40 165L100 130L162 105" stroke="#1b3a63" stroke-width="4" stroke-linecap="round" fill="none"/>' +
  '<ellipse cx="170" cy="101" rx="12" ry="8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5" transform="rotate(-18 170 101)"/>');

/* ---------- accès ---------- */

scene("acces-interieur-trappe", "L'accès par l'échelle intérieure",
  "Une personne monte par l'échelle intérieure de l'échafaudage ; la trappe orange est ouverte dans le plancher au-dessus.",
  T.sol(160) + T.echaf(90, 160, 120, 2, { accentTrappe: true }) +
  T.pers(126, 58) +
  '<path d="M126 78L119 94M126 78L133 94" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>');

scene("acces-exterieur-interdit", "L'accès interdit par l'extérieur",
  "Une personne grimpe à l'extérieur des montants au lieu de prendre l'échelle intérieure : un geste interdit, marqué d'un signal orange.",
  T.sol(160) + T.echaf(90, 160, 120, 2) +
  '<circle cx="228" cy="98" r="8" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M219 92A8 8 0 0 1 235 92Z" fill="#84b7ec" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M228 106L214 130" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M222 114L208 102M222 120L206 136" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>' +
  '<path d="M214 130L200 150M214 130L224 152" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>' +
  '<g fill="none" stroke="#ff6b35" stroke-width="4"><circle cx="220" cy="120" r="34"/><path d="M196 96L244 144"/></g>');

/* ---------- documents, notice, étiquette ---------- */

scene("etiquette-montant", "L'étiquette au pied du montant",
  "Une étiquette orange est accrochée au montant ; une personne la lit avant de monter.",
  T.sol(160) +
  '<path d="M160 20V160" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="152" y="157" width="16" height="6" fill="#1b3a63"/>' +
  '<rect x="140" y="36" width="40" height="5" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<path d="M160 90V100" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<rect x="148" y="100" width="26" height="20" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  T.pers(88, 72) +
  '<path d="M88 96L118 88" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>');

scene("notice-fabricant", "La notice du fabricant",
  "Une notice ouverte montre le schéma de montage de l'échafaudage ; une main pointe la page.",
  '<rect x="70" y="40" width="80" height="112" rx="4" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="150" y="40" width="80" height="112" rx="4" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M150 40V152" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M84 58H136M84 70H136M84 82H120" stroke="#84b7ec" stroke-width="4" stroke-linecap="round"/>' +
  '<g transform="translate(160 138) scale(.32)">' + T.echaf(0, 0, 120, 2) + '</g>' +
  '<path d="M282 168L222 130" stroke="#1b3a63" stroke-width="4" stroke-linecap="round" fill="none"/>' +
  '<circle cx="215" cy="125" r="5" fill="#ff6b35"/>');

/* ---------- appuis et amarrages ---------- */

scene("semelle-cale-verin", "Semelle, cale et vérin",
  "Pied de montant : semelle, cale de bois orange et vérin réglable posés sur le sol.",
  '<path d="M20 165H300" stroke="#1b3a63" stroke-width="3"/>' +
  '<rect x="120" y="150" width="90" height="14" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<rect x="145" y="132" width="40" height="18" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M150 138H180M150 144H180" stroke="#1b3a63" stroke-width="1"/>' +
  '<rect x="158" y="92" width="16" height="40" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M158 98H174M158 106H174M158 114H174M158 122H174" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<path d="M166 92V22" stroke="#1b3a63" stroke-width="2.5"/>');

scene("amarrage-facade", "L'amarrage à la façade",
  "Un tirant d'amarrage orange relie le montant de l'échafaudage à la façade.",
  T.sol(160) + T.echaf(60, 160, 110, 2, { facade: true, accentAmarrage: true }) +
  '<path d="M190 150L202 138M190 130L202 118M190 110L202 98" stroke="#1b3a63" stroke-width="1.5" opacity=".3"/>');

/* ---------- charges et surveillance ---------- */

scene("plancher-surcharge", "Le plancher surchargé",
  "Des sacs et des seaux orange sont empilés sur le plancher, plus haut que le garde-corps.",
  T.sol(160) + T.echaf(70, 160, 140, 2) +
  '<g fill="#ff6b35" stroke="#1b3a63" stroke-width="2">' +
  '<rect x="108" y="58" width="30" height="21" rx="6"/>' +
  '<rect x="118" y="40" width="26" height="20" rx="6"/>' +
  '<circle cx="154" cy="68" r="11"/>' +
  '</g>');

scene("objet-tombe", "L'objet qui tombe",
  "Un outil orange tombe le long de l'échafaudage ; une personne se trouve en dessous.",
  T.sol(160) + T.echaf(60, 160, 120, 2) +
  '<g fill="#ff6b35" stroke="#1b3a63" stroke-width="2"><circle cx="196" cy="92" r="7"/><rect x="192" y="98" width="8" height="26" rx="2" transform="rotate(18 196 111)"/></g>' +
  '<path d="M196 130V148" stroke="#1b3a63" stroke-width="2" stroke-dasharray="4 4" opacity=".4"/>' +
  T.pers(230, 70) +
  '<path d="M230 94L216 82" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>');

scene("verification-checklist", "La vérification avant usage",
  "Une personne se tient au pied de l'échafaudage, une fiche orange à la main, le regard vers le haut.",
  T.sol(160) + T.echaf(140, 160, 110, 2) +
  T.pers(70, 82) +
  '<path d="M70 106L58 108" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="40" y="96" width="22" height="30" rx="2" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  '<rect x="46" y="92" width="10" height="6" rx="2" fill="#1b3a63"/>');

scene("element-manquant", "Le garde-corps incomplet",
  "Sur le plancher du haut, la lisse manque : un trou orange en pointillé marque l'absence dans le garde-corps.",
  T.sol(160) + T.echaf(90, 160, 120, 2, { sansLisse: true }) +
  '<path d="M90 46H210" stroke="#ff6b35" stroke-width="3" stroke-dasharray="6 5"/>');

/* ---------- montage et démontage ---------- */

scene("montage-niveau", "Poser le garde-corps du niveau supérieur",
  "Depuis le plancher du niveau inférieur, une personne pose la lisse orange du niveau supérieur, avant d'y monter.",
  T.sol(160) + T.echaf(80, 160, 120, 2, { accentLisse: true }) +
  T.pers(140, 50) +
  '<path d="M140 70L150 46M140 70L130 46" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>' +
  T.gc(80, 122, 120));

scene("demontage-ordre", "Un élément passé de main en main",
  "Un élément d'échafaudage orange est passé de main en main vers le sol ; il n'est jamais jeté.",
  T.sol(160) +
  '<path d="M120 55H180" stroke="#ff6b35" stroke-width="8" stroke-linecap="round"/>' +
  '<ellipse cx="112" cy="55" rx="10" ry="7" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<ellipse cx="188" cy="55" rx="10" ry="7" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M150 74L156 86L150 84L144 96" stroke="#1b3a63" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M120 122H180" stroke="#1b3a63" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 10" opacity=".5"/>' +
  '<ellipse cx="112" cy="122" rx="10" ry="7" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<ellipse cx="188" cy="122" rx="10" ry="7" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>');

/* ---------- organisation et alerte ---------- */

scene("signaler-responsable", "Signaler au chef de chantier",
  "Une personne montre l'échafaudage au chef de chantier, le bras tendu en orange.",
  T.sol(160) +
  '<path d="M20 160V100M50 160V100M20 120H50M20 100H50" stroke="#1b3a63" stroke-width="1.5" opacity=".5"/>' +
  T.pers(80, 60) +
  '<path d="M80 86L45 105" stroke="#ff6b35" stroke-width="4" stroke-linecap="round"/>' +
  T.pers(220, 60) +
  '<path d="M220 86L190 95" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>');

scene("alerte-secours", "Alerter les secours",
  "Une personne est au sol, un collègue s'agenouille près d'elle, un autre appelle avec un téléphone orange.",
  T.sol(160) +
  '<circle cx="90" cy="146" r="10" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M100 148H150" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>' +
  '<path d="M150 148L166 138M150 148L166 156" stroke="#1b3a63" stroke-width="3.5" stroke-linecap="round"/>' +
  '<circle cx="60" cy="118" r="9" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  '<path d="M60 127V142" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M60 142L50 150M60 142L70 150" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M60 132L86 142" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  T.pers(255, 50) +
  '<path d="M255 76L266 80" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="264" y="70" width="14" height="24" rx="3" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>');

/* ---------- protection individuelle ---------- */

scene("collectif-avant-individuel", "D'abord le collectif",
  "À gauche, un garde-corps orange ; à droite, un harnais relié à un point d'ancrage ; une flèche montre l'ordre à suivre.",
  '<g fill="none" stroke="#ff6b35" stroke-width="3"><path d="M40 160V90M110 160V90M40 100H110M40 118H110M40 150H110"/></g>' +
  T.pers(220, 90) +
  '<path d="M220 110L205 100M220 110L235 100M212 118H228" stroke="#1b3a63" stroke-width="2.5" fill="none"/>' +
  '<path d="M220 90V60" stroke="#1b3a63" stroke-width="2.5" stroke-dasharray="4 3"/>' +
  '<rect x="212" y="48" width="16" height="10" rx="2" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M170 125L130 125" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M142 117L128 125L142 133" stroke="#1b3a63" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');

scene("harnais-ancrage", "Le harnais relié à son point d'ancrage",
  "Une personne porte un harnais dont la longe rejoint un point d'ancrage orange fixé à la structure.",
  T.sol(160) +
  T.pers(140, 50) +
  '<path d="M140 70L125 95M140 70L155 95M128 88H152" stroke="#1b3a63" stroke-width="2.5" fill="none"/>' +
  '<path d="M148 82Q180 70 210 75" stroke="#1b3a63" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/>' +
  '<circle cx="214" cy="75" r="4" fill="none" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M225 76H262" stroke="#1b3a63" stroke-width="2.5" opacity=".5"/>' +
  '<rect x="222" y="64" width="18" height="22" rx="3" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2"/>' +
  '<circle cx="231" cy="75" r="6" fill="none" stroke="#ff6b35" stroke-width="3.5"/>');

/* ---------- types d'échafaudage et environnement ---------- */

scene("roulant-vs-pied", "Roulant ou de pied",
  "À gauche, un échafaudage roulant sur roues orange ; à droite, un échafaudage de pied sur semelles.",
  T.sol(160) +
  '<path d="M50 150V90M100 150V90M50 100H100M50 130H100" stroke="#1b3a63" stroke-width="2.5" fill="none"/>' +
  '<g fill="#ff6b35" stroke="#1b3a63" stroke-width="2"><circle cx="50" cy="158" r="9"/><circle cx="100" cy="158" r="9"/></g>' +
  '<path d="M200 150V90M250 150V90M200 100H250M200 130H250" stroke="#1b3a63" stroke-width="2.5" fill="none"/>' +
  '<rect x="192" y="150" width="16" height="6" fill="#1b3a63"/><rect x="242" y="150" width="16" height="6" fill="#1b3a63"/>');

scene("vent-bache", "L'échafaudage bâché sous le vent",
  "Une bâche orange enveloppe l'échafaudage ; le vent la gonfle.",
  T.sol(160) + T.echaf(90, 160, 130, 2) +
  '<path d="M90 160C78 122 78 88 90 50H220C232 88 232 122 220 160Z" fill="#ff6b35" opacity=".85" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M240 70Q260 80 240 95M245 100Q268 110 245 128" stroke="#1b3a63" stroke-width="2" fill="none" opacity=".5"/>' +
  T.pers(46, 88));

scene("coactivite-balisage", "Le balisage au pied de l'échafaudage",
  "Un balisage orange délimite le pied de l'échafaudage ; un piéton est dévié autour.",
  T.sol(160) + T.echaf(120, 160, 90, 1) +
  '<path d="M70 150V130M270 150V130" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M70 134H270" stroke="#ff6b35" stroke-width="4" stroke-dasharray="10 6"/>' +
  T.pers(30, 112) +
  '<path d="M30 148Q10 100 60 92Q112 84 132 104" stroke="#1b3a63" stroke-width="2" fill="none" stroke-dasharray="4 3"/>');

scene("port-charge", "Porter une charge près du corps",
  "Une personne porte un élément d'échafaudage orange près du corps, le dos droit.",
  T.sol(160) +
  T.pers(150, 88) +
  '<rect x="120" y="118" width="60" height="10" rx="4" fill="#ff6b35" stroke="#1b3a63" stroke-width="2"/>' +
  '<path d="M150 112L125 122M150 112L175 122" stroke="#1b3a63" stroke-width="3" stroke-linecap="round" fill="none"/>');

scene("terrasse-toiture", "La toiture-terrasse protégée",
  "Sur une toiture-terrasse, un étancheur travaille derrière un garde-corps périphérique orange.",
  '<rect x="10" y="120" width="300" height="14" fill="#e8f1fb" stroke="#1b3a63" stroke-width="2.5"/>' +
  T.pers(160, 48) +
  '<path d="M160 88L188 96" stroke="#1b3a63" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="185" y="95" width="18" height="6" rx="2" fill="#84b7ec" stroke="#1b3a63" stroke-width="1.5"/>' +
  '<g fill="none" stroke="#ff6b35" stroke-width="3"><path d="M40 120V70M280 120V70M40 78H280M40 92H280M40 112H280"/></g>');

/* ---------- affectation ----------
   Une scène par défaut pour chaque module (M1 à M11) : aucune
   question ni écran de cours ne reste sans image. `sc` (question)
   ou `img: "sc:<id>"` (cours) affinent au cas par cas. */
const SCENE_MODULE = {
  M1: "chute-bord-vide",
  M2: "signaler-responsable",
  M3: "collectif-avant-individuel",
  M4: "alerte-secours",
  M5: "roulant-vs-pied",
  M6: "etiquette-montant",
  M7: "echafaudage-complet",
  M8: "verification-checklist",
  M9: "element-manquant",
  M10: "semelle-cale-verin",
  M11: "montage-niveau",
};

const PH = {}; // id de photo -> texte alternatif (aucune photo dans ce projet)
const PHOTO_SCENE = {}; // id de scène -> id de photo correspondante

function sceneDe(q) {
  return SC[q.sc] || SC[SCENE_MODULE[q.m]] || null;
}
function sceneHtml(q, classe) {
  const s = sceneDe(q);
  if (!s) return "";
  if (s.img) {
    return '<figure class="' + (classe || "scene") + ' scene-img">' +
      '<img src="' + s.img + '" alt="' + s.alt + '" loading="lazy" width="1536" height="1024">' +
      "</figure>";
  }
  const id = "sc" + Math.random().toString(36).slice(2, 8);
  return '<figure class="' + (classe || "scene") + '">' +
    '<svg viewBox="0 0 320 180" role="img" aria-labelledby="' + id + 't ' + id + 'd">' +
    '<title id="' + id + 't">' + s.titre + "</title><desc id=\"" + id + 'd">' + s.alt + "</desc>" +
    s.svg + "</svg><figcaption>" + s.titre + "</figcaption></figure>";
}
function photoDe(q) {
  if (q.ph) return q.ph;
  const idScene = q.sc || SCENE_MODULE[q.m];
  const p = PHOTO_SCENE[idScene];
  return p && PH[p] ? p : null;
}
/* La mise en situation d'une question : la photo si elle existe,
   le dessin sinon — pour l'instant, toujours le dessin. */
function situationHtml(q) {
  const p = photoDe(q);
  if (!p) return sceneHtml(q);
  return '<figure class="scene photo">' +
    '<img src="illustrations/' + p + '.jpg" alt="' + PH[p] + '" loading="lazy" decoding="async">' +
    "</figure>";
}

/* ---------- Scènes bitmap (Codex) — renseigné au fur et à mesure des
   validations. chemin est relatif à la racine du dépôt, ex.
   "illustrations/codex/echafaudage-complet.webp". Tant qu'aucune ligne
   n'est ajoutée ici, sceneHtml continue d'afficher le SVG dessiné. ---------- */
scenePng("acces-interieur-trappe", "illustrations/codex/acces-interieur-trappe.webp");
scenePng("echafaudage-complet", "illustrations/codex/echafaudage-complet.webp");
scenePng("acces-exterieur-interdit", "illustrations/codex/acces-exterieur-interdit.webp");
scenePng("garde-corps-trois-elements", "illustrations/codex/garde-corps-trois-elements.webp");
scenePng("etiquette-montant", "illustrations/codex/etiquette-montant.webp");
scenePng("notice-fabricant", "illustrations/codex/notice-fabricant.webp");
scenePng("semelle-cale-verin", "illustrations/codex/semelle-cale-verin.webp");
scenePng("amarrage-facade", "illustrations/codex/amarrage-facade.webp");
scenePng("roulant-vs-pied", "illustrations/codex/roulant-vs-pied.webp");
scenePng("vent-bache", "illustrations/codex/vent-bache.webp");
scenePng("alerte-secours", "illustrations/codex/alerte-secours.webp");
scenePng("chute-bord-vide", "illustrations/codex/chute-bord-vide.webp");
scenePng("coactivite-balisage", "illustrations/codex/coactivite-balisage.webp");
scenePng("collectif-avant-individuel", "illustrations/codex/collectif-avant-individuel.webp");
scenePng("demontage-ordre", "illustrations/codex/demontage-ordre.webp");
scenePng("element-manquant", "illustrations/codex/element-manquant.webp");
scenePng("harnais-ancrage", "illustrations/codex/harnais-ancrage.webp");
scenePng("montage-niveau", "illustrations/codex/montage-niveau.webp");
scenePng("objet-tombe", "illustrations/codex/objet-tombe.webp");
scenePng("plancher-surcharge", "illustrations/codex/plancher-surcharge.webp");
scenePng("port-charge", "illustrations/codex/port-charge.webp");
scenePng("signaler-responsable", "illustrations/codex/signaler-responsable.webp");
scenePng("terrasse-toiture", "illustrations/codex/terrasse-toiture.webp");
scenePng("verification-checklist", "illustrations/codex/verification-checklist.webp");
function scenePng(id, chemin) {
  if (SC[id]) SC[id].img = chemin;
}
