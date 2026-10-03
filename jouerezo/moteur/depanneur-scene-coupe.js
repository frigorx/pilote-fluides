/* =====================================================================
   depanneur-scene.js — la scène du dépanneur, piste A « coupe vivante »
   ---------------------------------------------------------------------
   RÔLE : dessiner, à plat et de face, une chambre froide et son groupe
   extérieur, en coupe : on voit DEDANS. Serpentins de l'évaporateur et du
   condenseur avec leurs ailettes, fluide qui circule dans les tubes avec son
   état en chaque point (vapeur basse pression bleue, traits rapides ; vapeur
   chaude rouge ; condensation qui vire du rouge à l'orange ; liquide orange
   sombre, plein et lent ; brouillard liquide-vapeur après le détendeur ;
   évaporation du bleu clair au bleu), bouteille avec son niveau, voyant avec
   ou sans bulles, compresseur en fantôme (moteur et piston devinés), bulbe
   du détendeur sur l'aspiration. La situation décide : givre (aucun / fin /
   partiel / bloc), hélices qui tournent ou pas, ailettes encrassées, bulles,
   aspiration givrée, compresseur qui vibre fort ou faiblement, afficheur.
   Puis les gestes du dépanneur, animés : le manifold se branche (flexibles,
   aiguilles jusqu'à la pression), le thermomètre électronique se pince sur
   un tube (l'afficheur compte), la pince ampèremétrique se referme sur le
   câble, la main touche un tube (halo chaud ou froid).
   DISPOSITION : la CROIX DU FRIGORISTE, toujours. DÉTENDEUR à GAUCHE,
   COMPRESSEUR à DROITE, CONDENSEUR en HAUT, ÉVAPORATEUR en BAS. Moitié haute
   (dehors, groupe de condensation) = haute pression ; moitié basse (chambre
   froide) = basse pression ; la paroi hachurée les sépare. Le fluide tourne
   dans le sens inverse des aiguilles d'une montre : haut (condenseur) →
   gauche (détendeur) → bas (évaporateur) → droite (compresseur) → haut.
   Conduites repérées : 1 refoulement (compresseur → condenseur), 2 ligne
   liquide (condenseur → bouteille → filtre → voyant → descend à gauche →
   détendeur), 3 sortie du détendeur (liquide + vapeur), 4 aspiration
   (évaporateur → monte à droite → compresseur).
   CE QUI EST RÉEMPLOYÉ : de moteur/depanneur-scene.js, les expressions
   régulières qui lisent le cas, angle() (échelle BP −1 à 10 bar, HP −1 à
   30 bar, de −135° à +135°, même lecture que les cadrans à couronnes du
   jeu), gauge() (même graduation), compter() (valeur finale aussi posée par
   minuterie quand l'onglet est caché), le principe des points de relevé et
   de l'événement « releve ».
   API : window.JR_SCENE_COUPE.monter(conteneur, cas, inst, { bp, hp }) → objet
   { manifold(cote), thermo(point, valeur), pince(pct), toucher(point) }.
   Six points cliquables .sc-pt[data-pt] : bp, hp, tasp, tliq, tref, pince.
   DÉPEND : rien (SVG + CSS de scene.css ; aucune image, aucune bibliothèque).
   ===================================================================== */
(function () {
  "use strict";
  const VB = { BP: [-1, 10], HP: [-1, 30] };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /* température affichée : virgule décimale, vrai signe moins, entier sans « ,0 » */
  const fmtT = v => { const r = Math.round(v * 10) / 10; return (r < 0 ? "−" : "") + String(Math.abs(r)).replace(".", ",") + " °C"; };
  const temp = t => (t < 0 ? "−" + (-t) : "" + t);
  const mix = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)); const A = p(a), B = p(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };

  function angle(p, cote) { const [a, b] = VB[cote]; return -135 + 270 * (Math.min(b, Math.max(a, p)) - a) / (b - a); }

  /* ---------- la géométrie du circuit (viewBox 1000 × 736) ----------
     Moitié haute (y 64 à 372) : dehors, haute pression. Paroi hachurée (y 372 à 402).
     Moitié basse (y 402 à 724) : chambre froide, basse pression.
     Compresseur à droite, condenseur au centre-haut (ventilateur à sa gauche, pour que le
     refoulement arrive à droite sans traverser l'hélice), liquide qui sort à gauche et passe
     bouteille, filtre, voyant avant de descendre le long du bord gauche jusqu'au détendeur,
     à gauche de l'évaporateur ; l'aspiration sort à droite de l'évaporateur (ventilateur à sa
     droite, le tube passe au-dessus) et monte à droite jusqu'au compresseur. */
  const EV = { x1: 312, x2: 472, y0: 636, dy: -24, n: 5 };   /* évaporateur : 5 rangées, la 1re (entrée) en bas, la dernière (sortie) en haut */
  const CD = { x1: 330, x2: 490, y0: 112, dy: 24, n: 5 };    /* condenseur : 5 rangées, la 1re (entrée) en haut, la dernière (sortie) en bas */
  const D_REF = "M784 210 H762 V112 H490";                   /* 1 · refoulement : vanne du compresseur → monte → 1re rangée du condenseur */
  const D_LIQ_A = "M330 208 H288 V252";                      /* 2 · sortie du condenseur → haut de la bouteille */
  const D_LIQ_B = "M280 322 H50 V636 H236";                  /* 2 · bouteille → filtre → voyant → descend à gauche → détendeur */
  const D_STUB = "M264 636 H312";                            /* 3 · sortie du détendeur → 1re rangée de l'évaporateur */
  const D_ASP = "M472 540 H506 V504 H814 V338";              /* 4 · évaporateur → au-dessus du ventilateur → monte à droite → vanne du compresseur */
  const PT = { bp: [814, 356], hp: [762, 150], tasp: [760, 504], tliq: [50, 440], tref: [700, 112], pince: [942, 131] };
  /* le cordon du thermomètre suit des couloirs libres (rien dessous) depuis le boîtier posé en haut, à droite du titre */
  const CORDON = {
    tasp: "M850 30 H972 V534 H760 V504",
    tref: "M700 30 V112",
    tliq: "M700 22 H30 V440 H50"
  };

  /* serpentin : n rangées entre x1 et x2, la première à y0, pas dy (signé). Chaque rangée est
     donnée seule (pour colorer par état) et le tout en un seul tracé continu (pour la paroi).
     Les coudes de retour sont tournés vers l'EXTÉRIEUR du bloc d'ailettes : le drapeau de balayage
     vaut 1 quand la direction de la rangée et le signe de dy vont dans le même sens, sinon 0. */
  function serpentin(g, depDroite) {
    const r = Math.abs(g.dy) / 2, rows = [], segs = []; let dir = depDroite ? -1 : 1, depart = "";
    for (let i = 0; i < g.n; i++) {
      const y = g.y0 + i * g.dy, xs = dir < 0 ? g.x2 : g.x1, xe = dir < 0 ? g.x1 : g.x2;
      let seg = "H" + xe;
      if (i < g.n - 1) seg += " A" + r + " " + r + " 0 0 " + ((dir > 0) === (g.dy > 0) ? 1 : 0) + " " + xe + " " + (y + g.dy);
      if (i === 0) depart = "M" + xs + " " + y;
      rows.push("M" + xs + " " + y + " " + seg); segs.push(seg); dir = -dir;
    }
    return { rows: rows, segs: segs, tout: depart + " " + segs.join(" ") };
  }

  const paroi = d => '<path class="sc-paroi" d="' + d + '"/>';
  const fluide = (d, genre, coul) => '<path class="sc-fl ' + genre + '"' + (coul ? ' style="stroke:' + coul + '"' : "") + ' d="' + d + '"/>';
  const flux = (d, classes) => classes.split(" ").map(k => '<path class="sc-flux ' + k + '" d="' + d + '"/>').join("");
  const lib = (x, y, t, cls) => '<text x="' + x + '" y="' + y + '" class="' + (cls || "sc-lib") + '">' + esc(t) + '</text>';
  /* repère de conduite : petit cercle blanc cerclé de bleu, chiffre en gras */
  const rep = (n, x, y) => '<g class="sc-rep"><circle cx="' + x + '" cy="' + y + '" r="10"/><text x="' + x + '" y="' + y + '" class="sc-rep-n">' + n + '</text></g>';

  function ailettes(x1, x2, y1, y2, pas) {
    let s = ""; for (let x = x1; x <= x2; x += pas) s += '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '"/>';
    return '<g class="sc-ail">' + s + '</g>';
  }
  /* petits cristaux de givre, répartis sans hasard (même dessin à chaque fois) */
  function cristaux(x, y, w, h, n) {
    let s = "", k = 7;
    for (let i = 0; i < n; i++) { k = (k * 73 + 41) % 997; const cx = x + 8 + (k % 1000) / 1000 * (w - 16); k = (k * 73 + 41) % 997; const cy = y + 6 + (k % 1000) / 1000 * (h - 12);
      s += 'M' + cx.toFixed(1) + ' ' + (cy - 5).toFixed(1) + ' v10 M' + (cx - 4.5).toFixed(1) + ' ' + (cy - 2.5).toFixed(1) + ' l9 5 M' + (cx - 4.5).toFixed(1) + ' ' + (cy + 2.5).toFixed(1) + ' l9 -5 '; }
    return '<path class="sc-cristal" d="' + s + '"/>';
  }
  function helice(cx, cy, r, tourne, duree) {
    let pales = "";
    for (let a = 0; a < 360; a += 90) pales += '<path transform="rotate(' + a + ' ' + cx + ' ' + cy + ')" d="M' + cx + ' ' + cy + ' C' + (cx + r * 0.38) + ' ' + (cy - r * 0.12) + ' ' + (cx + r * 0.78) + ' ' + (cy - r * 0.5) + ' ' + (cx + r * 0.4) + ' ' + (cy - r * 0.9) + ' C' + (cx + r * 0.05) + ' ' + (cy - r * 0.7) + ' ' + (cx - r * 0.06) + ' ' + (cy - r * 0.3) + ' ' + cx + ' ' + cy + 'Z"/>';
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 5) + '" class="sc-anneau"/>' +
      '<g class="sc-helice' + (tourne ? " tourne" : "") + '" style="transform-origin:' + cx + 'px ' + cy + 'px;animation-duration:' + duree + 's">' + pales + '<circle cx="' + cx + '" cy="' + cy + '" r="5.5" class="sc-moyeu"/></g>';
  }

  function monter(conteneur, c, inst, pressions) {
    /* la situation, lue dans les mêmes phrases que l'ancienne scène */
    const givre = /bloc/.test(c.evap) ? "bloc" : /premier|seul départ|départ|quart|tiers/.test(c.evap) ? "partiel" : /givre/.test(c.evap) ? "fin" : "aucun";
    const ventEvap = !/dans le vide|arrêt/.test(c.evap) || /ventilateur en marche|souffle/.test(c.evap);
    const ventCond = !/IMMOBILE|immobile|arrêt/.test(c.cond);
    const encrasse = /bouch|poussi|encrass/.test(c.cond);
    const bulles = /bulle/.test(c.voyant);
    const pastille = /pastille verte/.test(c.voyant);
    const aspGivree = /aspiration givrée|givrée jusqu/.test(c.toucher);
    const compresseurFaible = c.panne === "compresseur";
    const niveau = bulles ? 0.2 : 0.62;                       /* bouteille : bas quand le voyant bulle, sinon normal */

    const ev = serpentin(EV, false), cd = serpentin(CD, true);
    const evTout = D_STUB + " " + ev.segs.join(" ");
    const rangsGivre = givre === "bloc" || givre === "fin" ? [0, 1, 2, 3, 4] : givre === "partiel" ? [0, 1] : [];
    /* états du fluide dans l'évaporateur (la rangée 0, en bas, touche le détendeur) : mélange d'abord, vapeur seule sur les 2 dernières rangées */
    const evEtat = i => i < 2 ? "mel gout" : i < 3 ? "mel2" : "bp";
    /* … et dans le condenseur : vapeur chaude, puis gouttes qui se forment, puis liquide */
    const cdEtat = i => i < 2 ? "hp" : i === 2 ? "hp gout c" : i === 3 ? "liq gout c" : "liq";

    const sch = [];
    sch.push('<svg class="scene coupe" viewBox="0 0 1000 736" role="img" aria-label="' + esc(inst.nom + ", " + inst.fluideNom + " : coupe à plat du circuit, disposé en croix du frigoriste. Moitié haute, dehors : groupe de condensation avec le compresseur à droite, le condenseur ventilé en haut, la bouteille, le filtre déshydrateur et le voyant ; la ligne liquide descend à gauche jusqu'au détendeur. Moitié basse : chambre froide avec son évaporateur ventilé, l'aspiration remonte à droite jusqu'au compresseur. Le fluide circule dans les tubes avec son état en chaque point.") + '">');
    sch.push('<defs>' +
      '<pattern id="sc-mur" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="9" fill="#ece3d3"/><line x1="0" y1="0" x2="0" y2="9" stroke="#b3a48b" stroke-width="3"/></pattern>' +
      '<pattern id="sc-crasse" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#7a5a38" opacity=".45"/><circle cx="4" cy="5" r="3.2" fill="#4a3320"/><circle cx="13" cy="12" r="3.8" fill="#4a3320"/><circle cx="10" cy="3" r="1.8" fill="#8a6a45"/><circle cx="3" cy="14" r="2" fill="#8a6a45"/></pattern>' +
      '<pattern id="sc-billes" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.9" fill="#a8742f"/><circle cx="6" cy="6" r="1.9" fill="#a8742f"/></pattern>' +
      '<clipPath id="sc-clip-voyant"><circle cx="100" cy="322" r="13"/></clipPath>' +
      '<clipPath id="sc-clip-coque"><rect x="803" y="123" width="114" height="136" rx="31"/></clipPath><clipPath id="sc-clip-bout"><rect x="265" y="255" width="46" height="89" rx="19"/></clipPath>' +
      '</defs>');

    /* ---- fonds : dehors en haut, paroi, chambre en bas ---- */
    sch.push('<rect class="sc-fond-dehors" x="16" y="64" width="968" height="308"/>');
    sch.push('<rect class="sc-fond-ch" x="16" y="402" width="968" height="322"/>');
    sch.push('<rect class="sc-mur" x="16" y="372" width="968" height="30"/>');
    sch.push(lib(500, 50, "Groupe de condensation, à l'extérieur", "sc-titre"));
    sch.push(lib(500, 428, "Chambre froide · consigne " + inst.consigne, "sc-titre"));

    /* ================= ÉVAPORATEUR (dans la chambre, moitié basse) ================= */
    sch.push('<rect class="sc-batterie" x="306" y="526" width="172" height="124" rx="6"/>');
    sch.push(ailettes(314, 470, 530, 646, 9));
    if (ventEvap && givre !== "bloc") {
      let air = ""; for (let k = 0; k < 4; k++) air += '<path d="M310 ' + (552 + 24 * k) + ' H474"/>';
      sch.push('<g class="sc-air froid">' + air + '</g>');
    }
    sch.push(rangsGivre.map(i => '<path class="sc-givre" d="' + ev.rows[i] + '"/>').join(""));
    sch.push(paroi(evTout));
    sch.push(fluide(D_STUB, "mel"));
    sch.push(ev.rows.map((d, i) => fluide(d, "ev", mix("#9fd1f4", "#3d7fca", i / 4))).join(""));
    sch.push(flux(D_STUB, "mel gout"));
    sch.push(ev.rows.map((d, i) => flux(d, evEtat(i))).join(""));
    if (givre === "bloc") sch.push('<rect class="sc-voile" x="306" y="526" width="172" height="124" rx="6" style="opacity:.9"/>' + cristaux(306, 526, 172, 124, 22));
    else if (givre === "partiel") sch.push('<rect class="sc-voile" x="306" y="596" width="172" height="54" rx="6" style="opacity:.8"/>' + cristaux(306, 596, 172, 54, 9));
    else if (givre === "fin") sch.push('<rect class="sc-voile" x="306" y="526" width="172" height="124" rx="6" style="opacity:.16"/>');
    /* ventilateur de l'évaporateur : à droite du bloc, l'aspiration passe au-dessus */
    sch.push('<rect class="sc-carter" x="530" y="526" width="112" height="124" rx="10"/>');
    sch.push(helice(586, 588, 40, ventEvap, 0.8));
    sch.push(lib(392, 672, "évaporateur ventilé"));
    if (givre === "bloc") sch.push(lib(392, 690, "bloc de givre", "sc-alerte"));
    if (!ventEvap) sch.push(lib(586, 672, "hélice immobile", "sc-alerte"));

    /* ================= LIGNES : aspiration (4), refoulement (1) ================= */
    if (aspGivree) sch.push('<path class="sc-givre asp" d="' + D_ASP + '"/><path class="sc-givre-grain" d="' + D_ASP + '"/>');
    sch.push(paroi(D_ASP) + fluide(D_ASP, "bp") + flux(D_ASP, "bp"));
    sch.push(paroi(D_REF) + fluide(D_REF, "hp") + flux(D_REF, "hp"));

    /* ================= CONDENSEUR (dehors, moitié haute) ================= */
    sch.push('<rect class="sc-batterie chaud" x="324" y="98" width="172" height="124" rx="6"/>');
    sch.push(ailettes(332, 488, 102, 218, 9).replace('class="sc-ail"', 'class="sc-ail chaud"'));
    if (ventCond) { let air = ""; for (let k = 0; k < 4; k++) air += '<path d="M492 ' + (124 + 24 * k) + ' H328"/>'; sch.push('<g class="sc-air chaud">' + air + '</g>'); }
    sch.push(paroi(cd.tout));
    sch.push(cd.rows.map((d, i) => fluide(d, "cd", mix("#c0392b", "#c9451a", i / 4))).join(""));
    sch.push(cd.rows.map((d, i) => flux(d, cdEtat(i))).join(""));
    if (encrasse) sch.push('<rect class="sc-crasse" x="324" y="98" width="172" height="124" rx="6" fill="url(#sc-crasse)" opacity=".62"/>');
    /* ventilateur du condenseur : à gauche du bloc, le refoulement arrive à droite */
    sch.push('<rect class="sc-carter" x="150" y="98" width="112" height="124" rx="10"/>');
    sch.push(helice(206, 160, 40, ventCond, 0.9));
    sch.push(lib(410, 242, "condenseur ventilé"));
    if (encrasse) sch.push(lib(410, 258, "ailettes bouchées", "sc-alerte"));
    if (!ventCond) sch.push(lib(206, 242, "hélice immobile", "sc-alerte"));

    /* ================= BOUTEILLE, FILTRE, VOYANT, LIGNE LIQUIDE (2) ================= */
    sch.push('<rect class="sc-filtre" x="158" y="304" width="64" height="36" rx="10"/><rect x="166" y="310" width="48" height="24" rx="4" fill="url(#sc-billes)"/>' +
      '<rect class="sc-bride" x="151" y="297" width="9" height="50" rx="3"/><rect class="sc-bride" x="220" y="297" width="9" height="50" rx="3"/>');
    sch.push(paroi(D_LIQ_A) + fluide(D_LIQ_A, "liq") + flux(D_LIQ_A, "liq"));
    sch.push(paroi(D_LIQ_B) + fluide(D_LIQ_B, "liq") + flux(D_LIQ_B, "liq"));
    /* voyant : la vitre au milieu du tube */
    sch.push('<rect class="sc-laiton" x="80" y="302" width="40" height="40" rx="8"/><circle class="sc-vitre" cx="100" cy="322" r="16"/>' +
      '<circle cx="100" cy="322" r="13" fill="#e9a27c"/>' +
      '<g clip-path="url(#sc-clip-voyant)"><path class="sc-flux liq" d="M115 322 H85" style="stroke:rgba(201,69,26,.55);stroke-width:5"/>' +
      (bulles ? '<g class="sc-bulles"><circle cx="106" cy="316" r="3.2"/><circle cx="100" cy="327" r="2.6"/><circle cx="93" cy="319" r="3"/><circle cx="109" cy="328" r="2.2"/><circle cx="97" cy="314" r="2"/></g>' : "") + '</g>' +
      (pastille ? '<circle cx="100" cy="322" r="4.5" fill="#1e7e54" stroke="#fff" stroke-width="1.5"/>' : "") +
      '<path d="M92 314 a10 10 0 0 1 8 -4" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>');
    sch.push(lib(100, 284, "voyant"));
    sch.push(lib(190, 268, "filtre") + lib(190, 284, "déshydrateur"));
    /* bouteille de liquide : niveau visible, tube plongeur en fantôme */
    const nivY = Math.round(344 - niveau * 86);
    sch.push('<rect class="sc-bouteille fond" x="262" y="252" width="52" height="95" rx="22"/>' +
      '<g clip-path="url(#sc-clip-bout)"><g class="sc-vague"><path d="M245 ' + nivY + ' q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 V352 H245 Z" fill="#c9451a"/></g></g>' +
      '<path class="sc-plongeur" d="M288 256 V338"/><rect class="sc-bouteille cadre" x="262" y="252" width="52" height="95" rx="22"/>');
    sch.push(lib(324, 300, "bouteille de liquide", "sc-lib gauche"));

    /* ================= COMPRESSEUR (fantôme), pressostat, câble ================= */
    /* le compresseur est dessiné à sa place d'origine puis descendu de 60 : coque y 180 à 322 */
    sch.push('<path class="sc-cable" d="M938 227 H942 V68"/><path class="sc-cable-reflet" d="M938 227 H942 V68"/>');
    sch.push('<g transform="translate(0 60)"><g class="sc-compresseur' + (compresseurFaible ? " faible" : " vibre") + '" style="transform-origin:860px 190px">' +
      '<rect class="sc-coque" x="800" y="120" width="120" height="142" rx="34"/>' +
      '<rect class="sc-bornier" x="918" y="150" width="20" height="34" rx="4"/>' +
      '<g class="sc-fantome" clip-path="url(#sc-clip-coque)">' +
        '<path d="M806 252 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 V258 H806 Z" fill="#e6cf8e"/>' +
        '<rect x="816" y="146" width="14" height="56" rx="2"/><rect x="890" y="146" width="14" height="56" rx="2"/>' +
        '<rect x="833" y="150" width="54" height="48" rx="3"/>' +
        '<path class="sc-rotor" d="M833 174 H887"/>' +
        '<path class="sc-arbre" d="M860 138 V224"/>' +
        '<circle cx="860" cy="224" r="11"/><g class="sc-vilebrequin" style="transform-origin:860px 224px"><path d="M860 224 V214"/></g>' +
        '<rect x="884" y="212" width="32" height="24" rx="2"/><rect class="sc-piston" x="889" y="217" width="12" height="14" rx="2"/>' +
      '</g></g>' +
      '<rect class="sc-laiton" x="784" y="142" width="16" height="16" rx="3"/><rect class="sc-laiton" x="806" y="262" width="16" height="16" rx="3"/></g>');
    sch.push(lib(884, 340, "compresseur"));
    /* pressostat HP/BP, dans l'angle entre les deux vannes : un capillaire vers le refoulement (haut), un vers l'aspiration (bas) */
    sch.push('<path class="sc-capillaire" d="M766 280 V220 M780 293 H790 V330 H806"/><circle class="sc-raccord" cx="766" cy="220" r="2.6"/><circle class="sc-raccord" cx="806" cy="330" r="2.6"/>');
    sch.push('<rect class="sc-pressostat" x="736" y="280" width="44" height="26" rx="5"/><circle cx="752" cy="293" r="7" fill="#f7f1e7" stroke="#84b7ec" stroke-width="1.5"/><circle cx="768" cy="293" r="7" fill="#f7f1e7" stroke="#84b7ec" stroke-width="1.5"/>');
    sch.push(lib(730, 289, "pressostat", "sc-lib droite") + lib(730, 305, "HP/BP", "sc-lib droite"));

    /* ================= DÉTENDEUR (à gauche, entrée de l'évaporateur) et son bulbe (sur l'aspiration, sortie de l'évaporateur) ================= */
    sch.push('<path class="sc-capillaire" d="M250 610 V470 Q250 460 260 460 H550 Q560 460 560 470 V487"/>');
    sch.push('<rect class="sc-bulbe" x="542" y="487" width="36" height="11" rx="5.5"/><path class="sc-collier" d="M549 483 V514 M571 483 V514"/>');
    sch.push('<path class="sc-laiton" d="M236 624 L250 636 L236 648 Z M264 624 L250 636 L264 648 Z"/><path class="sc-laiton" d="M238 622 a12 12 0 0 1 24 0 Z"/>');
    sch.push(lib(250, 672, "détendeur"));
    sch.push(lib(586, 486, "bulbe", "sc-lib gauche"));

    /* ================= THERMOSTAT D'AMBIANCE ================= */
    sch.push('<rect class="sc-boitier" x="76" y="480" width="150" height="58" rx="10"/><rect class="sc-ecran" x="84" y="488" width="134" height="30" rx="5"/>' +
      '<text x="151" y="503" class="sc-lcd" id="sc-tchambre">' + esc(temp(c.tChambre !== undefined ? c.tChambre : 0)) + ' °C</text>' +
      '<circle cx="106" cy="529" r="3" fill="#84b7ec"/><circle cx="151" cy="529" r="3" fill="#ff6b35"/><circle cx="196" cy="529" r="3" fill="#fffdf8"/>');
    sch.push(lib(151, 560, "thermostat d'ambiance"));

    /* ================= LÉGENDE : le fluide dans les tubes ================= */
    sch.push(lib(700, 562, "Le fluide dans les tubes", "sc-leg-titre"));
    [["bp", "bp", "vapeur basse pression"], ["hp", "hp", "vapeur chaude haute pression"], ["liq", "liq", "liquide sous-refroidi"], ["mel", "mel gout", "liquide + vapeur, après le détendeur"]].forEach((e, i) => {
      const y = 596 + i * 34, d = "M700 " + y + " H754";
      sch.push(paroi(d) + fluide(d, e[0]) + flux(d, e[1]) + lib(768, y + 5, e[2], "sc-lib gauche"));
    });

    /* ================= REPÈRES DES CONDUITES : 1 refoulement, 2 ligne liquide, 3 sortie du détendeur, 4 aspiration ================= */
    sch.push(rep(1, 762, 185) + rep(2, 50, 352) + rep(3, 288, 636) + rep(4, 814, 440));

    /* ================= POINTS DE RELEVÉ ================= */
    sch.push('<g class="sc-points">' +
      point("bp", PT.bp, "prise BP", 18, 5, "start") + point("hp", PT.hp, "prise HP", 18, 5, "start") +
      point("tasp", PT.tasp, "aspiration", 0, -20, "middle") + point("tliq", PT.tliq, "ligne liquide", 18, 5, "start") +
      point("tref", PT.tref, "refoulement", 12, -16, "start") + point("pince", PT.pince, "câble", -8, -38, "end") +
      '</g>');

    /* ================= INSTRUMENTS (cachés tant qu'on ne les branche pas) ================= */
    sch.push(manifold() + thermometre() + pinceAmp());
    sch.push('<circle id="sc-halo" r="28" fill="none" stroke-width="6" opacity="0"/>');
    sch.push('</svg>');
    conteneur.innerHTML = sch.join("");

    const svg = conteneur.querySelector("svg");
    const api = {
      manifold: function (cote) {
        const g = svg.querySelector("#sc-manifold"); g.classList.add("visible");
        svg.querySelector(cote === "BP" ? "#sc-flex-bp" : "#sc-flex-hp").classList.add("branche");
        const aig = svg.querySelector(cote === "BP" ? "#sc-aig-bp" : "#sc-aig-hp");
        const p = cote === "BP" ? pressions.bp : pressions.hp;
        setTimeout(function () { aig.style.transform = "rotate(" + angle(p, cote) + "deg)"; }, 350);
        allumer(cote === "BP" ? "bp" : "hp");
      },
      thermo: function (pt, valeur) {
        const cible = PT[pt] || PT.tasp;
        svg.querySelector("#sc-thermo").classList.add("visible");
        const d = CORDON[pt] || CORDON.tasp;
        svg.querySelector("#sc-sonde-cordon").setAttribute("d", d); svg.querySelector("#sc-sonde-halo").setAttribute("d", d);
        svg.querySelector("#sc-sonde-pince").setAttribute("transform", "translate(" + (cible[0] - 9) + " " + (cible[1] - 11) + ")");
        compter(svg.querySelector("#sc-lcd-thermo"), 20, valeur, 1200, fmtT);
        allumer(pt);
      },
      pince: function (pct) {
        svg.querySelector("#sc-pince").classList.add("visible");
        compter(svg.querySelector("#sc-lcd-pince"), 0, pct, 900, v => Math.round(v) + " % In");
        allumer("pince");
      },
      toucher: function (pt) {
        const pos = PT[pt] || PT.tasp;
        const halo = svg.querySelector("#sc-halo");
        halo.setAttribute("cx", pos[0]); halo.setAttribute("cy", pos[1]);
        halo.style.transformOrigin = pos[0] + "px " + pos[1] + "px";
        halo.setAttribute("stroke", pt === "tref" || pt === "hp" ? "#c0392b" : pt === "tliq" ? "#c9451a" : "#3d7fca");
        halo.classList.remove("on"); void halo.getBoundingClientRect(); halo.classList.add("on");
        halo.setAttribute("opacity", "0.9"); setTimeout(() => halo.setAttribute("opacity", "0"), 1800);
      }
    };
    function allumer(pt) { svg.querySelectorAll(".sc-pt").forEach(e => e.classList.toggle("actif", e.dataset.pt === pt)); }
    svg.querySelectorAll(".sc-pt").forEach(e => {
      const aller = () => conteneur.dispatchEvent(new CustomEvent("releve", { detail: e.dataset.pt }));
      e.addEventListener("click", aller);
      e.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); aller(); } });
    });
    return api;
  }

  function point(id, p, lb, dx, dy, ancre) {
    return '<g class="sc-pt" data-pt="' + id + '" role="button" tabindex="0" aria-label="' + esc(lb) + '"><circle class="sc-zone" cx="' + p[0] + '" cy="' + p[1] + '" r="19"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="11"/>' +
      '<text x="' + (p[0] + dx) + '" y="' + (p[1] + dy) + '" class="sc-pt-lib" text-anchor="' + ancre + '">' + esc(lb) + '</text></g>';
  }
  /* cadran de manifold : même graduation que l'ancienne scène (9 graduations de −135° à +135°) */
  function gauge(x, y, cote, idAig) {
    const coul = cote === "BP" ? "#1f6fa8" : "#b3261e";
    let ticks = "";
    for (let i = 0; i <= 8; i++) { const a = (-135 + i * 33.75) * Math.PI / 180; ticks += '<line x1="' + (x + 26 * Math.sin(a)).toFixed(1) + '" y1="' + (y - 26 * Math.cos(a)).toFixed(1) + '" x2="' + (x + 31 * Math.sin(a)).toFixed(1) + '" y2="' + (y - 31 * Math.cos(a)).toFixed(1) + '" stroke="#22303f" stroke-width="2"/>'; }
    return '<circle cx="' + x + '" cy="' + y + '" r="38" fill="' + coul + '"/><circle cx="' + x + '" cy="' + y + '" r="33" fill="#fdfdfb" stroke="#22303f"/>' + ticks +
      '<text x="' + x + '" y="' + (y + 19) + '" class="sc-gauge-mot" fill="' + coul + '">' + cote + '</text>' +
      '<line id="' + idAig + '" class="sc-aiguille" x1="' + x + '" y1="' + (y + 7) + '" x2="' + x + '" y2="' + (y - 28) + '" style="transform-origin:' + x + 'px ' + y + 'px; transform: rotate(-135deg)"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="#333"/>';
  }
  function manifold() {
    /* posé dans la zone libre de la moitié haute, entre le condenseur et le compresseur : flexible bleu qui descend
       à la prise BP sur la vanne de service d'aspiration du compresseur (conduite 4, côté groupe), flexible rouge vers la
       prise HP sur le refoulement (conduite 1) ; aucun des deux ne croise un tube */
    return '<g id="sc-manifold" class="sc-instrument"><rect x="528" y="140" width="190" height="128" rx="16" fill="#1b3a63"/><rect x="536" y="148" width="174" height="92" rx="10" fill="#f7f1e7"/>' +
      gauge(578, 194, "BP", "sc-aig-bp") + gauge(668, 194, "HP", "sc-aig-hp") +
      '<text x="623" y="256" class="sc-lcd" style="font-size:13px;fill:#fff">MANIFOLD</text>' +
      '<rect x="568" y="268" width="20" height="10" rx="3" fill="#1f6fa8"/><rect x="716" y="176" width="10" height="20" rx="3" fill="#b3261e"/>' +
      '<path id="sc-flex-bp" class="sc-flex bp" d="M578 278 C578 340 700 356 806 356"/>' +
      '<path id="sc-flex-hp" class="sc-flex hp" d="M726 186 C742 186 746 150 758 150"/></g>';
  }
  function thermometre() {
    return '<g id="sc-thermo" class="sc-instrument"><path id="sc-sonde-halo" d="M775 30 V30" class="sc-cordon-halo"/><path id="sc-sonde-cordon" d="M775 30 V30" class="sc-cordon"/>' +
      '<rect x="680" y="2" width="190" height="56" rx="12" fill="#1b3a63"/><rect x="690" y="8" width="170" height="34" rx="6" fill="#eaf2e6" stroke="#0f2440" stroke-width="2"/>' +
      '<text id="sc-lcd-thermo" x="775" y="26" class="sc-lcd" style="font-size:24px">20 °C</text>' +
      '<circle cx="730" cy="50" r="3.5" fill="#84b7ec"/><circle cx="775" cy="50" r="3.5" fill="#d17d43"/><circle cx="820" cy="50" r="3.5" fill="#fffdf8"/>' +
      '<g id="sc-sonde-pince" transform="translate(766 47)"><rect width="18" height="22" rx="4" fill="#1b3a63" stroke="#fff" stroke-width="1.5"/><circle cx="9" cy="8" r="3" fill="#84b7ec"/></g></g>';
  }
  function pinceAmp() {
    /* mâchoire jaune qui se referme sur le câble vertical, boîtier à gauche */
    return '<g id="sc-pince" class="sc-instrument"><rect x="832" y="100" width="90" height="62" rx="8" fill="#1b3a63"/><rect x="838" y="106" width="78" height="28" rx="4" fill="#eaf2e6"/>' +
      '<text id="sc-lcd-pince" x="877" y="121" class="sc-lcd" style="font-size:13px">0 % In</text>' +
      '<circle class="sc-machoire" cx="942" cy="131" r="17" fill="none" stroke="#d1a000" stroke-width="6"/></g>';
  }
  function compter(noeud, de, a, duree, fmt) {
    const t0 = performance.now();
    (function pas(now) { const r = Math.min(1, (now - t0) / duree); const v = de + (a - de) * r; noeud.textContent = fmt(v); if (r < 1) requestAnimationFrame(pas); })(t0);
    /* onglet caché : le rAF ne tourne pas → valeur finale posée aussi par minuterie */
    setTimeout(() => { noeud.textContent = fmt(a); }, duree + 50);
  }

  window.JR_SCENE_COUPE = { monter: monter };
})();
