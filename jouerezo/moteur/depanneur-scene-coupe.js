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

  /* ---------- la géométrie du circuit (viewBox 1000 × 690) ----------
     Chambre à gauche, mur, groupe dehors à droite. Cycle lu dans le sens
     inverse des aiguilles : compresseur (haut droite) → refoulement → condenseur
     → bouteille → filtre → voyant → ligne liquide qui traverse le mur et monte
     au détendeur → évaporateur → aspiration qui traverse le mur → compresseur. */
  const EV = { x1: 170, x2: 332, y0: 242, dy: -24, n: 6 };   /* évaporateur : 6 rangées, la 1re (entrée) en bas */
  const CD = { x1: 558, x2: 738, y0: 386, dy: 26, n: 4 };    /* condenseur : 4 rangées, la 1re (entrée) en haut */
  const D_STUB = "M357 242 H332";                            /* sortie du détendeur → 1re rangée */
  const D_ASP = "M332 122 H508 V150 H784";                   /* aspiration : évaporateur → mur → vanne du compresseur */
  const D_REF = "M784 248 H770 V386 H738";                   /* refoulement : vanne → condenseur */
  const D_LIQ_A = "M738 464 H770 V524";                      /* sortie du condenseur → bouteille */
  const D_LIQ_B = "M762 590 H424 V242 H387";                 /* bouteille → filtre → voyant → mur → détendeur */
  const PT = { bp: [590, 150], hp: [770, 346], tasp: [420, 122], tliq: [770, 500], tref: [770, 300], pince: [960, 556] };
  /* le cordon du thermomètre suit des couloirs libres (pas de texte dessous) depuis le boîtier posé en haut, entre les deux titres */
  const CORDON = {
    tasp: "M487 58 V84 H420 V108",
    tref: "M487 58 V74 H700 V290 Q700 298 708 298 H758",
    tliq: "M487 58 V74 H494 V556 H730 V500 H758"
  };

  /* serpentin : n rangées entre x1 et x2, la première à y0, pas dy (signé). Chaque rangée est
     donnée seule (pour colorer par état) et le tout en un seul tracé continu (pour la paroi). */
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

    const ev = serpentin(EV, true), cd = serpentin(CD, true);
    const evTout = D_STUB + " " + ev.segs.join(" ");
    const rangsGivre = givre === "bloc" || givre === "fin" ? [0, 1, 2, 3, 4, 5] : givre === "partiel" ? [0, 1] : [];
    /* états du fluide dans l'évaporateur : mélange près du détendeur, vapeur seule sur les 2 dernières rangées */
    const evEtat = i => i < 2 ? "mel gout" : i < 4 ? "mel2" : "bp";
    /* … et dans le condenseur : vapeur chaude, puis gouttes qui se forment, puis liquide */
    const cdEtat = i => i === 0 ? "hp" : i === 1 ? "hp gout c" : i === 2 ? "liq gout c" : "liq";

    const sch = [];
    sch.push('<svg class="scene coupe" viewBox="0 0 1000 690" role="img" aria-label="' + esc(inst.nom + ", " + inst.fluideNom + " : coupe à plat du circuit. Chambre froide à gauche avec son évaporateur ventilé, groupe de condensation à droite avec compresseur, condenseur, bouteille, filtre et voyant ; ligne liquide et aspiration traversent le mur. Le fluide circule dans les tubes avec son état en chaque point.") + '">');
    sch.push('<defs>' +
      '<pattern id="sc-mur" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="9" fill="#ece3d3"/><line x1="0" y1="0" x2="0" y2="9" stroke="#b3a48b" stroke-width="3"/></pattern>' +
      '<pattern id="sc-crasse" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#7a5a38" opacity=".45"/><circle cx="4" cy="5" r="3.2" fill="#4a3320"/><circle cx="13" cy="12" r="3.8" fill="#4a3320"/><circle cx="10" cy="3" r="1.8" fill="#8a6a45"/><circle cx="3" cy="14" r="2" fill="#8a6a45"/></pattern>' +
      '<pattern id="sc-billes" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.9" fill="#a8742f"/><circle cx="6" cy="6" r="1.9" fill="#a8742f"/></pattern>' +
      '<clipPath id="sc-clip-voyant"><circle cx="560" cy="590" r="13"/></clipPath>' +
      '<clipPath id="sc-clip-coque"><rect x="803" y="123" width="114" height="136" rx="31"/></clipPath><clipPath id="sc-clip-bout"><rect x="747" y="523" width="46" height="89" rx="19"/></clipPath>' +
      '</defs>');

    /* ---- fonds : chambre, mur, dehors ---- */
    sch.push('<rect class="sc-fond-ch" x="16" y="64" width="436" height="608"/>');
    sch.push('<rect class="sc-fond-dehors" x="482" y="64" width="498" height="608"/>');
    sch.push('<rect class="sc-mur" x="452" y="64" width="30" height="608"/>');
    sch.push(lib(234, 50, "Chambre froide · consigne " + inst.consigne, "sc-titre"));
    sch.push(lib(760, 50, "Groupe de condensation, à l'extérieur", "sc-titre"));

    /* ================= ÉVAPORATEUR (dans la chambre) ================= */
    sch.push('<rect class="sc-batterie" x="152" y="104" width="198" height="154" rx="6"/>');
    sch.push(ailettes(160, 342, 108, 254, 9));
    if (ventEvap && givre !== "bloc") {
      let air = ""; for (let k = 0; k < 5; k++) air += '<path d="M346 ' + (134 + 24 * k) + ' H154"/>';
      sch.push('<g class="sc-air froid">' + air + '</g>');
    }
    sch.push(rangsGivre.map(i => '<path class="sc-givre" d="' + ev.rows[i] + '"/>').join(""));
    sch.push(paroi(evTout));
    sch.push(fluide(D_STUB, "mel"));
    sch.push(ev.rows.map((d, i) => fluide(d, "ev", mix("#9fd1f4", "#3d7fca", i / 5))).join(""));
    sch.push(flux(D_STUB, "mel gout"));
    sch.push(ev.rows.map((d, i) => flux(d, evEtat(i))).join(""));
    if (givre === "bloc") sch.push('<rect class="sc-voile" x="152" y="104" width="198" height="154" rx="6" style="opacity:.9"/>' + cristaux(152, 104, 198, 154, 26));
    else if (givre === "partiel") sch.push('<rect class="sc-voile" x="152" y="204" width="198" height="54" rx="6" style="opacity:.8"/>' + cristaux(152, 204, 198, 54, 10));
    else if (givre === "fin") sch.push('<rect class="sc-voile" x="152" y="104" width="198" height="154" rx="6" style="opacity:.16"/>');
    /* ventilateur de l'évaporateur */
    sch.push('<rect class="sc-carter" x="32" y="104" width="112" height="154" rx="10"/>');
    sch.push(helice(88, 181, 40, ventEvap, 0.8));
    sch.push(lib(191, 282, "évaporateur ventilé"));
    if (givre === "bloc") sch.push(lib(191, 302, "bloc de givre", "sc-alerte"));
    if (!ventEvap) sch.push(lib(88, givre === "bloc" ? 320 : 302, "hélice immobile", "sc-alerte"));

    /* ================= LIGNES : aspiration, refoulement, liquide ================= */
    if (aspGivree) sch.push('<path class="sc-givre asp" d="' + D_ASP + '"/><path class="sc-givre-grain" d="' + D_ASP + '"/>');
    sch.push(paroi(D_ASP) + fluide(D_ASP, "bp") + flux(D_ASP, "bp"));
    sch.push(paroi(D_REF) + fluide(D_REF, "hp") + flux(D_REF, "hp"));

    /* ================= CONDENSEUR (dehors) ================= */
    sch.push('<rect class="sc-batterie chaud" x="540" y="368" width="216" height="114" rx="6"/>');
    sch.push(ailettes(548, 750, 372, 478, 9).replace('class="sc-ail"', 'class="sc-ail chaud"'));
    if (ventCond) { let air = ""; for (let k = 0; k < 3; k++) air += '<path d="M546 ' + (399 + 26 * k) + ' H752"/>'; sch.push('<g class="sc-air chaud">' + air + '</g>'); }
    sch.push(paroi(cd.tout));
    sch.push(cd.rows.map((d, i) => fluide(d, "cd", mix("#c0392b", "#c9451a", i / 3))).join(""));
    sch.push(cd.rows.map((d, i) => flux(d, cdEtat(i))).join(""));
    if (encrasse) sch.push('<rect class="sc-crasse" x="540" y="368" width="216" height="114" rx="6" fill="url(#sc-crasse)" opacity=".62"/>');
    sch.push('<rect class="sc-carter" x="790" y="366" width="160" height="118" rx="10"/>');
    sch.push(helice(870, 425, 44, ventCond, 0.9));
    sch.push(lib(640, 506, "condenseur ventilé"));
    let ligneAlerte = 522;
    if (encrasse) { sch.push(lib(640, ligneAlerte, "ailettes bouchées", "sc-alerte")); ligneAlerte += 16; }
    if (!ventCond) sch.push(lib(870, 524, "hélice immobile", "sc-alerte"));

    /* ================= FILTRE (sous le tube), LIGNE LIQUIDE, VOYANT, BOUTEILLE ================= */
    sch.push('<rect class="sc-filtre" x="618" y="572" width="64" height="36" rx="10"/><rect x="626" y="578" width="48" height="24" rx="4" fill="url(#sc-billes)"/>' +
      '<rect class="sc-bride" x="611" y="565" width="9" height="50" rx="3"/><rect class="sc-bride" x="680" y="565" width="9" height="50" rx="3"/>');
    sch.push(paroi(D_LIQ_A) + fluide(D_LIQ_A, "liq") + flux(D_LIQ_A, "liq"));
    sch.push(paroi(D_LIQ_B) + fluide(D_LIQ_B, "liq") + flux(D_LIQ_B, "liq"));
    /* voyant : la vitre au milieu du tube */
    sch.push('<rect class="sc-laiton" x="540" y="570" width="40" height="40" rx="8"/><circle class="sc-vitre" cx="560" cy="590" r="16"/>' +
      '<circle cx="560" cy="590" r="13" fill="#e9a27c"/>' +
      '<g clip-path="url(#sc-clip-voyant)"><path class="sc-flux liq" d="M575 590 H545" style="stroke:rgba(201,69,26,.55);stroke-width:5"/>' +
      (bulles ? '<g class="sc-bulles"><circle cx="566" cy="584" r="3.2"/><circle cx="560" cy="595" r="2.6"/><circle cx="553" cy="587" r="3"/><circle cx="569" cy="596" r="2.2"/><circle cx="557" cy="582" r="2"/></g>' : "") + '</g>' +
      (pastille ? '<circle cx="560" cy="590" r="4.5" fill="#1e7e54" stroke="#fff" stroke-width="1.5"/>' : "") +
      '<path d="M552 582 a10 10 0 0 1 8 -4" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>');
    sch.push(lib(560, 630, "voyant"));
    sch.push(lib(650, 630, "filtre") + lib(650, 646, "déshydrateur"));
    /* bouteille de liquide : niveau visible, tube plongeur en fantôme */
    const nivY = Math.round(612 - niveau * 86);
    sch.push('<rect class="sc-bouteille fond" x="744" y="520" width="52" height="95" rx="22"/>' +
      '<g clip-path="url(#sc-clip-bout)"><g class="sc-vague"><path d="M727 ' + nivY + ' q10 -5 20 0 t20 0 t20 0 t20 0 t20 0 V620 H727 Z" fill="#c9451a"/></g></g>' +
      '<path class="sc-plongeur" d="M770 524 V606"/><rect class="sc-bouteille cadre" x="744" y="520" width="52" height="95" rx="22"/>');
    sch.push(lib(770, 637, "bouteille de liquide"));

    /* ================= COMPRESSEUR (fantôme), pressostat, câble ================= */
    sch.push('<path class="sc-capillaire" d="M742 180 V158 M766 193 H792 V240"/><circle class="sc-raccord" cx="742" cy="158" r="2.6"/><circle class="sc-raccord" cx="792" cy="240" r="2.6"/>');
    sch.push('<rect class="sc-pressostat" x="722" y="180" width="44" height="26" rx="5"/><circle cx="738" cy="193" r="7" fill="#f7f1e7" stroke="#84b7ec" stroke-width="1.5"/><circle cx="754" cy="193" r="7" fill="#f7f1e7" stroke="#84b7ec" stroke-width="1.5"/>');
    sch.push(lib(744, 223, "pressostat") + lib(744, 239, "HP/BP"));
    sch.push('<path class="sc-cable" d="M938 167 H960 V672"/><path class="sc-cable-reflet" d="M938 167 H960 V672"/>');
    sch.push('<g class="sc-compresseur' + (compresseurFaible ? " faible" : " vibre") + '" style="transform-origin:860px 190px">' +
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
      '</g></g>');
    sch.push('<rect class="sc-laiton" x="784" y="142" width="16" height="16" rx="3"/><rect class="sc-laiton" x="784" y="240" width="16" height="16" rx="3"/>');
    sch.push(lib(860, 284, "compresseur"));

    /* ================= DÉTENDEUR et son bulbe ================= */
    sch.push('<path class="sc-capillaire" d="M372 216 C378 190 366 165 372 139"/>');
    sch.push('<rect class="sc-bulbe" x="354" y="128" width="36" height="11" rx="5.5"/><path class="sc-collier" d="M361 113 V141 M383 113 V141"/>');
    sch.push('<path class="sc-laiton" d="M358 230 L372 242 L358 254 Z M386 230 L372 242 L386 254 Z"/><path class="sc-laiton" d="M360 228 a12 12 0 0 1 24 0 Z"/>');
    sch.push(lib(372, 276, "détendeur"));
    sch.push(lib(382, 172, "bulbe", "sc-lib gauche"));

    /* ================= THERMOSTAT D'AMBIANCE ================= */
    sch.push('<rect class="sc-boitier" x="40" y="350" width="150" height="58" rx="10"/><rect class="sc-ecran" x="48" y="358" width="134" height="30" rx="5"/>' +
      '<text x="115" y="373" class="sc-lcd" id="sc-tchambre">' + esc(temp(c.tChambre !== undefined ? c.tChambre : 0)) + ' °C</text>' +
      '<circle cx="70" cy="399" r="3" fill="#84b7ec"/><circle cx="115" cy="399" r="3" fill="#ff6b35"/><circle cx="160" cy="399" r="3" fill="#fffdf8"/>');
    sch.push(lib(115, 430, "thermostat d'ambiance"));

    /* ================= LÉGENDE : le fluide dans les tubes ================= */
    sch.push(lib(40, 480, "Le fluide dans les tubes", "sc-leg-titre"));
    [["bp", "bp", "vapeur basse pression"], ["hp", "hp", "vapeur chaude haute pression"], ["liq", "liq", "liquide sous-refroidi"], ["mel", "mel gout", "liquide + vapeur, après le détendeur"]].forEach((e, i) => {
      const y = 514 + i * 34, d = "M40 " + y + " H94";
      sch.push(paroi(d) + fluide(d, e[0]) + flux(d, e[1]) + lib(108, y + 5, e[2], "sc-lib gauche"));
    });

    /* ================= POINTS DE RELEVÉ ================= */
    sch.push('<g class="sc-points">' +
      point("bp", PT.bp, "prise BP", 0, -20, "middle") + point("hp", PT.hp, "prise HP", 18, 5, "start") +
      point("tasp", PT.tasp, "aspiration", 0, 30, "middle") + point("tliq", PT.tliq, "ligne liquide", 18, 5, "start") +
      point("tref", PT.tref, "refoulement", 18, 5, "start") + point("pince", PT.pince, "câble", -16, 5, "end") +
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
    /* posé dans la zone libre sous la ligne d'aspiration, à gauche du compresseur */
    return '<g id="sc-manifold" class="sc-instrument"><rect x="488" y="186" width="190" height="128" rx="16" fill="#1b3a63"/><rect x="496" y="194" width="174" height="92" rx="10" fill="#f7f1e7"/>' +
      gauge(538, 240, "BP", "sc-aig-bp") + gauge(628, 240, "HP", "sc-aig-hp") +
      '<text x="583" y="302" class="sc-lcd" style="font-size:13px;fill:#fff">MANIFOLD</text>' +
      '<rect x="528" y="178" width="20" height="10" rx="3" fill="#1f6fa8"/><rect x="676" y="266" width="10" height="20" rx="3" fill="#b3261e"/>' +
      '<path id="sc-flex-bp" class="sc-flex bp" d="M538 180 C538 158 590 176 590 156"/>' +
      '<path id="sc-flex-hp" class="sc-flex hp" d="M682 276 C720 276 738 346 759 346"/></g>';
  }
  function thermometre() {
    return '<g id="sc-thermo" class="sc-instrument"><path id="sc-sonde-halo" d="M487 58 V58" class="sc-cordon-halo"/><path id="sc-sonde-cordon" d="M487 58 V58" class="sc-cordon"/>' +
      '<rect x="392" y="2" width="190" height="56" rx="12" fill="#1b3a63"/><rect x="402" y="8" width="170" height="34" rx="6" fill="#eaf2e6" stroke="#0f2440" stroke-width="2"/>' +
      '<text id="sc-lcd-thermo" x="487" y="26" class="sc-lcd" style="font-size:24px">20 °C</text>' +
      '<circle cx="442" cy="50" r="3.5" fill="#84b7ec"/><circle cx="487" cy="50" r="3.5" fill="#d17d43"/><circle cx="532" cy="50" r="3.5" fill="#fffdf8"/>' +
      '<g id="sc-sonde-pince" transform="translate(478 47)"><rect width="18" height="22" rx="4" fill="#1b3a63" stroke="#fff" stroke-width="1.5"/><circle cx="9" cy="8" r="3" fill="#84b7ec"/></g></g>';
  }
  function pinceAmp() {
    /* mâchoire jaune qui se referme sur le câble vertical, boîtier à gauche */
    return '<g id="sc-pince" class="sc-instrument"><rect x="850" y="542" width="90" height="62" rx="8" fill="#1b3a63"/><rect x="856" y="548" width="78" height="28" rx="4" fill="#eaf2e6"/>' +
      '<text id="sc-lcd-pince" x="895" y="563" class="sc-lcd" style="font-size:13px">0 % In</text>' +
      '<circle class="sc-machoire" cx="960" cy="556" r="17" fill="none" stroke="#d1a000" stroke-width="6"/></g>';
  }
  function compter(noeud, de, a, duree, fmt) {
    const t0 = performance.now();
    (function pas(now) { const r = Math.min(1, (now - t0) / duree); const v = de + (a - de) * r; noeud.textContent = fmt(v); if (r < 1) requestAnimationFrame(pas); })(t0);
    /* onglet caché : le rAF ne tourne pas → valeur finale posée aussi par minuterie */
    setTimeout(() => { noeud.textContent = fmt(a); }, duree + 50);
  }

  window.JR_SCENE_COUPE = { monter: monter };
})();
