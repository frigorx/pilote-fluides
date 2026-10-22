(() => {
  "use strict";

  /* Station « Dimensionner une évacuation » (satellite E5+b, TP TECVC CP3).
     Réécriture du 22/10/2026 : aucun tableau de norme n’est affiché ni embarqué. Chaque exercice reçoit ses DONNÉES DANS L’ÉNONCÉ
     (« données du sujet » : le débit d’évacuation des seuls appareils du cas, la pente, trois diamètres à essayer avec leur
     capacité, le diamètre minimal d’une chute avec WC) ; l’élève applique la méthode. Les valeurs de la vie réelle se lisent dans
     le dossier technique et la norme de l’établissement.
     Tous les nombres calculés (dont la capacité de chaque diamètre, par la formule de Bazin) sortent de ../_commun/sanitaire-dtu.js :
     rien n’est tapé ici. */
  const S = window.SanitaireDTU, fr = S.fr;
  const ligne = new URLSearchParams(location.search).get("line") === "D" ? "D" : "E";
  const retour = ligne === "D" ? { href: "../v3v/index.html?line=D", label: "Station suivante : v3v" } : { href: "../vase/index.html?line=E", label: "Station suivante : vase" };
  const PENTE = 1;   /* cm par mètre : pente donnée par le sujet */

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 20}" font-weight="${o.w || 400}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.style ? ` style="${o.style}"` : ""}>${esc(s)}</text>`;
  const r = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 8}" fill="${o.fond || "#fffdf8"}" stroke="${o.trait || "#1b3a63"}" stroke-opacity="${o.op ?? 0.28}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
  const shell = (id, titre, desc, corps) => `<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-t ${id}-d" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif"><title id="${id}-t">${esc(titre)}</title><desc id="${id}-d">${esc(desc)}</desc><rect x="6" y="6" width="708" height="408" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>${corps}</svg>`;
  const filigrane = (el) => { const svg = el.querySelector("svg"); if (svg && window.HydroEcoulement) window.HydroEcoulement.brancher(svg, { tubes: [] }); };
  const decl = (a) => a.toLowerCase().replace(/^wc/, "WC");
  const nomE = (id) => S.EVAC.find((a) => a.id === id).nom;
  const qe = (id) => S.EVAC.find((a) => a.id === id).qe;

  /* ---------- les données de cas : ce que le sujet de chaque exercice donne ---------- */
  /* « Lire » (étape 2) : trois appareils, trois diamètres à essayer, un débit à évacuer */
  const APP_LIRE = ["lavabo", "baignoire", "wc"], CAND_LIRE = [104, 119, 134], Q_LIRE = 5;
  /* L’exemple et l’exercice : n logements, appareils de chaque logement, diamètres du collecteur à essayer (mm, du plus petit au plus grand) */
  const CAS_EXEMPLE = { n: 2, par: [{ id: "evier", n: 1 }, { id: "lavabo", n: 1 }, { id: "douche", n: 1 }, { id: "baignoire", n: 1 }, { id: "wc", n: 1 }], candidats: [94, 104, 119] };
  const CAS_EXERCICE = { n: 5, par: [{ id: "evier", n: 1 }, { id: "lavabo", n: 1 }, { id: "baignoire", n: 1 }, { id: "wc", n: 1 }], candidats: [104, 119, 134] };
  /* Ventilation (étape 5) : Ø intérieurs (mm) des tubes que le sujet propose */
  const TUBES = [94, 104, 119, 134];

  function calcul(cas) {
    const total = cas.par.map((p) => ({ id: p.id, n: p.n * cas.n }));
    const parLogement = S.somme(cas.par, S.EVAC, "qe");
    const sq = S.somme(total, S.EVAC, "qe"), x = S.nombre(total), y = S.coeff(x), qp = sq * y;
    const col = S.collecteur(qp, PENTE, cas.candidats);
    const chute = S.CHUTE_AVEC_WC;
    const prec = cas.candidats[cas.candidats.indexOf(col.dint) - 1];   /* le diamètre juste en dessous : trop petit */
    return { parLogement, sq, x, y, qp, col, prec, capPrec: S.capacite(prec, PENTE), chute, retenu: Math.max(col.dint, chute), details: cas.par.map((p) => fr(qe(p.id))).join(" + "), nPar: S.nombre(cas.par) };
  }
  const EX = calcul(CAS_EXEMPLE), EXO = calcul(CAS_EXERCICE);
  const BON_LIRE = S.collecteur(Q_LIRE, PENTE, CAND_LIRE);
  const CHUTE_TUBE = S.auMoins(S.CHUTE_AVEC_WC, TUBES), VENT_REGROUPEE = S.suivant(CHUTE_TUBE, TUBES);
  const EX_VENT = TUBES[1], EX_VENT_SUIV = S.suivant(EX_VENT, TUBES);   /* exemple de regroupement, différent de l'exercice */

  /* ---------- les données du sujet, en texte HTML (moteur : aide / aideMobile) ---------- */
  const listeDebits = (cas) => cas.par.map((p) => `${decl(nomE(p.id))} ${fr(qe(p.id))}`).join(" · ");
  const listeCap = (liste) => liste.map((d) => `${d} mm (${fr(S.capacite(d, PENTE))})`).join(" · ");
  /* Ce que cet exercice RETIENT (conventions de l’exercice, pas des règles de norme affirmées) : dit comme tel, à chaque endroit où l’élève en a besoin */
  const CONV = "En situation réelle, vérifiez dans votre dossier technique et la norme de votre établissement.";
  const conventions = () => `<p><strong>Conventions de cet exercice.</strong> Chute avec WC : ${S.CHUTE_AVEC_WC} mm au moins. Coefficient de simultanéité de l’alimentation, repris ici : y = 0,8 ÷ √(x − 1), x étant le nombre total d’appareils de l’immeuble. Collecteur plus petit que la chute : on prend la chute. ${CONV}</p>`;
  const donnees = (cas) => `<p><strong>Données du sujet.</strong> Débit d’évacuation en l/s : ${listeDebits(cas)}. Pente du collecteur : ${PENTE} cm par mètre. Diamètres à essayer (capacité en l/s) : ${listeCap(cas.candidats)}.</p>${conventions()}`;
  const donneesLire = () => `<p><strong>Données du sujet.</strong> Trois exemples de débit d’évacuation d’un appareil, en l/s : ${APP_LIRE.map((id) => `${decl(nomE(id))} ${fr(qe(id))}`).join(" · ")} (on ne les additionne pas ici). Pente : ${PENTE} cm par mètre. Diamètres à essayer (capacité en l/s) : ${listeCap(CAND_LIRE)}. Débit à évacuer : ${fr(Q_LIRE, 1)} l/s, c’est le débit probable d’un immeuble, déjà calculé : le sujet le donne.</p>`;
  const lignesHtml = (cas, c) => `<ol>${lignesDe(cas, c).map(([lib, calc]) => `<li>${lib} : <strong>${calc}</strong></li>`).join("")}</ol>`;
  const aideCalcul = () => `<p>Aide : x = nombre total d’appareils de l’immeuble ; y = 0,8 ÷ √(x − 1) ; QP = ΣQe × y.</p><p><strong>Le cas</strong> : ${CAS_EXERCICE.n} logements, chacun avec ${CAS_EXERCICE.par.map((p) => decl(nomE(p.id))).join(", ")}.</p>`;
  const donneesTubes = () => `<p><strong>Données du sujet.</strong> Tubes proposés (Ø intérieur) : ${TUBES.join(" · ")} mm. Dans cet exercice, une chute qui reçoit un WC fait ${S.CHUTE_AVEC_WC} mm au moins : on prend le plus petit tube proposé qui atteint ${S.CHUTE_AVEC_WC} mm. À l’étape 4, ${S.CHUTE_AVEC_WC} mm était le minimum du sujet ; ici, on choisit un vrai tube de la liste.</p><p><strong>Convention de l’exercice, ventilations regroupées :</strong> la ventilation unique prend le tube qui suit, dans la liste, le plus grand des deux. Exemple, autres chutes : deux chutes de ${EX_VENT} mm sont regroupées ; le tube qui suit ${EX_VENT} est ${EX_VENT_SUIV} : la ventilation unique fait ${EX_VENT_SUIV} mm. ${CONV}</p>`;

  /* ---------- scène 1 : trois sortes d’eau ---------- */
  function sceneEaux() {
    const cartes = [
      { nom: "Eaux usées (EU)", sous: "eaux ménagères", liste: ["éviers", "douches", "lavabos", "lave-linge"], dash: null },
      { nom: "Eaux vannes (EV)", sous: "rejets des WC", liste: ["WC"], dash: null, double: true },
      { nom: "Eaux pluviales (EP)", sous: "eau de pluie", liste: ["toitures", "descentes", "réseau séparé"], dash: "10 6" }
    ];
    let g = "";
    cartes.forEach((c, i) => {
      const x = 24 + i * 232;
      g += r(x, 24, 216, 272, { op: 1, dash: c.dash, sw: c.double ? 5 : 3 }) + t(x + 108, 62, c.nom, { w: 800, anchor: "middle", size: 21 }) + t(x + 108, 90, c.sous, { anchor: "middle", style: "fill:#637285" });
      c.liste.forEach((l, k) => { g += t(x + 28, 140 + k * 36, "• " + l); });
    });
    g += r(24, 316, 672, 84, { fond: "#f3f7fb", op: 1 }) + t(44, 350, "Chaque appareil a un siphon : une garde d’eau permanente.", { w: 700 }) + t(44, 380, "Elle empêche les mauvaises odeurs de remonter des descentes.");
    return shell("evac-d1", "Trois sortes d’eau à évacuer", "Trois cartes : eaux usées (éviers, douches, lavabos, lave-linge), eaux vannes (WC), eaux pluviales (pluie, réseau séparé). Un bandeau rappelle que chaque appareil a un siphon qui garde de l’eau.", g);
  }

  /* ---------- scène 2 : les données du sujet (débits des appareils, capacités des diamètres à essayer) ---------- */
  function sceneDonnees() {
    let g = r(20, 14, 330, 392, { op: 0.5 }) + t(34, 48, "Débit d’évacuation (l/s)", { w: 800, size: 21 }) + t(34, 74, "trois exemples du sujet", { size: 19, style: "fill:#637285" });
    APP_LIRE.forEach((id, i) => {
      const y = 112 + i * 92;
      g += t(34, y, nomE(id), { size: 21 }) + `<rect x="34" y="${y + 10}" width="${(qe(id) * 150).toFixed(1)}" height="34" fill="#1b3a63"/>` + t(44, y + 34, fr(qe(id)), { size: 22, w: 800, style: "fill:#fff" });
    });
    g += t(34, 372, "L’eau sort d’un coup : bien plus", { size: 19 }) + t(34, 396, "qu’au débit d’alimentation.", { size: 19 });
    g += r(370, 14, 330, 392, { op: 0.5 }) + t(384, 48, "Capacité de chaque diamètre", { w: 800, size: 21 }) + t(384, 74, `pente ${PENTE} cm par mètre`, { size: 19, style: "fill:#637285" });
    CAND_LIRE.forEach((d, i) => {
      const y = 112 + i * 92;
      g += t(384, y, `Ø ${d} mm`, { size: 21 }) + `<rect x="384" y="${y + 10}" width="${(S.capacite(d, PENTE) * 40).toFixed(1)}" height="34" fill="#1b3a63"/>` + t(394, y + 34, fr(S.capacite(d, PENTE)), { size: 22, w: 800, style: "fill:#fff" });
    });
    const xq = 384 + Q_LIRE * 40;
    g += `<line x1="${xq}" y1="96" x2="${xq}" y2="350" stroke="#c9451a" stroke-width="3" stroke-dasharray="6 5"/>` + t(690, 372, `à évacuer : ${fr(Q_LIRE, 1)} l/s`, { anchor: "end", w: 700, size: 20 }) + t(690, 396, "débit probable de l’immeuble", { anchor: "end", size: 19 });
    return shell("evac-d2", "Les données du sujet : débits et capacités", `À gauche, trois exemples de débit d’évacuation d’un appareil : ${APP_LIRE.map((id) => `${decl(nomE(id))} ${fr(qe(id))} l/s`).join(", ")}. À droite, la capacité de trois diamètres pour une pente de ${PENTE} cm par mètre : ${CAND_LIRE.map((d) => `${d} mm ${fr(S.capacite(d, PENTE))} l/s`).join(", ")}. Un trait repère le débit à évacuer, ${fr(Q_LIRE, 1)} l/s : c’est le débit probable d’un immeuble, donné par le sujet.`, g);
  }

  /* ---------- scènes 3 et 4 résolue : la feuille de calcul ---------- */
  function lignesDe(cas, c) {
    return [
      ["Débits d’évacuation d’un logement (données du sujet)", `${c.details} = ${fr(c.parLogement)} l/s`],
      ["Somme pour l’immeuble", `ΣQe = ${cas.n} × ${fr(c.parLogement)} = ${fr(c.sq)} l/s`],
      ["Nombre d’appareils et coefficient", `x = ${cas.n} × ${c.nPar} = ${c.x} ; y = 0,8 ÷ √${c.x - 1} = ${fr(c.y, 4)}`],
      ["Débit probable", `QP = ${fr(c.sq)} × ${fr(c.y, 4)} = ${fr(c.qp, 3)} l/s`],
      [`Collecteur (pente ${PENTE} cm/m) : premier diamètre assez grand`, `${c.prec} mm admet ${fr(c.capPrec)} : trop petit ; ${c.col.dint} mm admet ${fr(c.col.capacite)} : assez`],
      ["Chute (elle reçoit des WC) et choix", `chute ${c.chute} mm mini, collecteur retenu : ${c.retenu} mm`]
    ];
  }
  function feuille(cas, c, id, titre) {
    const lignes = lignesDe(cas, c);
    let g = "";
    lignes.forEach(([lib, calc], i) => {
      const y = 14 + i * 65;
      g += r(20, y, 680, 59, { fond: i === 3 ? "#fff4e0" : "#fffdf8", trait: i === 3 ? "#c9451a" : "#1b3a63", op: i === 3 ? 1 : 0.28 })
        + `<circle cx="52" cy="${y + 30}" r="19" fill="#1b3a63"/>` + t(52, y + 37, String(i + 1), { w: 800, anchor: "middle", style: "fill:#fff" })
        + t(86, y + 23, lib, { size: 19, style: "fill:#637285" }) + t(86, y + 49, calc, { size: 21, w: 700 });
    });
    return shell(id, titre, "Feuille de calcul en six lignes : " + lignes.map(([l, c2]) => `${l} : ${c2}`).join(" ; "), g);
  }
  const sceneExemple = () => feuille(CAS_EXEMPLE, EX, "evac-d3", `Exemple résolu : immeuble de ${CAS_EXEMPLE.n} logements`);

  /* ---------- scène 4 : le cas, ses débits et les diamètres à essayer ---------- */
  function sceneExercice(v) {
    if (v === "resolu") return feuille(CAS_EXERCICE, EXO, "evac-d4b", "Exercice corrigé : immeuble de 5 logements");
    let g = r(20, 14, 336, 392, { op: 1 }) + t(40, 52, "LE CAS", { size: 22, w: 800 }) + t(40, 92, `${CAS_EXERCICE.n} logements`, { size: 28, w: 800 }) + t(40, 130, "Chaque logement a :", { w: 700 });
    CAS_EXERCICE.par.forEach((p, i) => { g += t(50, 172 + i * 38, `• ${p.n} ${decl(nomE(p.id))}`, { size: 19 }) + t(340, 172 + i * 38, `${fr(qe(p.id))} l/s`, { size: 19, w: 700, anchor: "end" }); });
    g += t(40, 352, "Débits donnés par le sujet.", { size: 19, style: "fill:#637285" });
    g += r(376, 14, 324, 392, { op: 1, fond: "#f3f7fb" }) + t(396, 52, "DIAMÈTRES À ESSAYER", { size: 22, w: 800 }) + t(396, 82, `pente ${PENTE} cm par mètre`, { size: 19, style: "fill:#637285" });
    CAS_EXERCICE.candidats.forEach((d, i) => { const y = 106 + i * 50; g += r(392, y, 292, 40, { op: 0.4 }) + t(406, y + 28, `Ø ${d} mm`, { size: 21 }) + t(670, y + 28, `${fr(S.capacite(d, PENTE))} l/s`, { size: 21, w: 800, anchor: "end" }); });
    g += t(396, 282, `Chute avec WC : ${S.CHUTE_AVEC_WC} mm au moins.`, { size: 19, w: 700 }) + t(396, 318, "Aide : x = nombre total", { size: 19 }) + t(396, 342, "d’appareils de l’immeuble", { size: 19 }) + t(396, 366, "y = 0,8 ÷ √(x − 1)", { size: 19 }) + t(396, 390, "QP = ΣQe × y", { size: 19 });
    return shell("evac-d4", "Le cas de l’exercice et les diamètres à essayer", `Cas : ${CAS_EXERCICE.n} logements, chacun avec ${CAS_EXERCICE.par.map((p) => `${decl(nomE(p.id))} (${fr(qe(p.id))} l/s)`).join(", ")}. Diamètres à essayer pour une pente de ${PENTE} cm par mètre : ${CAS_EXERCICE.candidats.map((d) => `${d} mm admet ${fr(S.capacite(d, PENTE))} l/s`).join(", ")}. Dans cet exercice, une chute qui reçoit un WC a un diamètre intérieur minimal de ${S.CHUTE_AVEC_WC} mm. Aide : x est le nombre total d’appareils de l’immeuble ; y = 0,8 divisé par la racine de x moins un ; QP = ΣQe × y.`, g);
  }

  /* ---------- scène 5 : la chute et sa ventilation primaire ---------- */
  function sceneVentilation(v) {
    const ok = v === "resolu";
    let g = r(24, 24, 396, 380, { op: 0.2 })
      + `<rect x="24" y="124" width="396" height="8" fill="#637285"/>` + t(34, 116, "Toiture", { size: 19, style: "fill:#637285" })
      + `<rect x="180" y="52" width="36" height="320" fill="#f3f7fb" stroke="#1b3a63" stroke-width="3"/>`
      + t(198, 42, "↑ AIR LIBRE", { anchor: "middle", w: 800, size: 19 })
      + t(230, 70, "ventilation primaire", { size: 19, w: 700 }) + t(230, 94, "même diamètre", { size: 19 }) + t(230, 118, "que la chute", { size: 19 });
    [["WC", 170], ["Salle d’eau", 240], ["Cuisine", 310]].forEach(([nom, y]) => { g += r(34, y, 116, 46, { op: 0.6 }) + t(92, y + 31, nom, { anchor: "middle", size: 19 }) + `<rect x="150" y="${y + 19}" width="30" height="8" fill="#1b3a63"/>`; });
    g += t(230, 196, "L’eau qui tombe", { size: 19 }) + t(230, 220, "aspire l’air.", { size: 19 })
      + t(230, 272, "Sans évent,", { size: 19, w: 700 }) + t(230, 296, "les siphons se", { size: 19, w: 700 }) + t(230, 320, "vident : effet", { size: 19, w: 700 }) + t(230, 344, "de pompe.", { size: 19, w: 700 })
      + t(198, 396, "↓ collecteur", { anchor: "middle", size: 19, w: 700 });
    g += r(436, 24, 260, 380, { fond: "#f3f7fb", op: 1 }) + t(566, 58, "Deux chutes regroupées", { anchor: "middle", w: 800, size: 20 })
      + r(448, 82, 108, 56, { op: 0.6 }) + t(502, 108, "chute A", { anchor: "middle", size: 19 }) + t(502, 130, `Ø ${ok ? CHUTE_TUBE : "?"}`, { anchor: "middle", size: 19, w: 800 })
      + r(576, 82, 108, 56, { op: 0.6 }) + t(630, 108, "chute B", { anchor: "middle", size: 19 }) + t(630, 130, `Ø ${ok ? CHUTE_TUBE : "?"}`, { anchor: "middle", size: 19, w: 800 })
      + t(566, 178, "↓ une seule sortie", { anchor: "middle", size: 19 })
      + r(466, 194, 200, 70, { trait: "#c9451a", op: 1, fond: "#fff4e0", sw: 3 }) + t(566, 224, "ventilation unique", { anchor: "middle", size: 19 }) + t(566, 252, `Ø ${ok ? VENT_REGROUPEE : "?"} mm`, { anchor: "middle", w: 800, size: 22 })
      + t(450, 296, "Dans l’exercice :", { size: 19 }) + t(450, 320, "diamètre juste au-dessus", { size: 19 }) + t(450, 344, "du plus grand des deux.", { size: 19 })
      + t(450, 372, "Parcours horizontal :", { size: 19, w: 700 }) + t(450, 396, "pente vers une chute.", { size: 19, w: 700 });
    return shell("evac-d5", "La chute prolongée en ventilation primaire", "À gauche, une chute reçoit un WC, une salle d’eau et une cuisine et se prolonge au-dessus de la toiture jusqu’à l’air libre, dans son diamètre. À droite, deux chutes sont regroupées en une seule ventilation, d’un diamètre immédiatement supérieur au plus grand (convention de l’exercice). Un parcours horizontal garde une pente vers une chute.", g);
  }

  /* ---------- les cinq étapes ---------- */
  window.STATION_CONFIG = {
    code: "E5+b", id: "sanitaire-evacuation", title: "Dimensionner une évacuation d’eaux usées et vannes", niveau: "BTS",
    next: "poursuivre la ligne", suite: retour,
    levels: {
      CAP: { objective: "Distinguer eaux usées, eaux vannes et eaux pluviales.", assessment: "classer les appareils d’un logement" },
      TP: { objective: "Lire dans le sujet le débit d’un appareil et la capacité d’un diamètre, puis choisir le diamètre.", assessment: "choisir le plus petit diamètre dont la capacité suffit" },
      BTS: { objective: "Dimensionner un collecteur, une chute et sa ventilation primaire.", assessment: "refaire le calcul d’un exemple sur un autre immeuble et justifier les diamètres" }
    },
    steps: [
      {
        short: "Les eaux", kicker: "repérer", title: "Eaux usées, eaux vannes, eaux pluviales",
        text: "Les eaux usées (EU) viennent des éviers, douches, lavabos et lave-linge. Les eaux vannes (EV) viennent des WC. Les eaux pluviales (EP) viennent de la pluie : elles ont leur propre réseau.",
        cap: "Classez un appareil : eaux usées ou eaux vannes ?",
        tp: "Répondez à la question pour le WC. Puis, sur votre feuille, classez de la même façon l’évier, la douche, le lavabo et le lave-linge : eaux usées ou eaux vannes ?",
        bts: "Un égout séparatif reçoit EU et EV d’un côté, EP de l’autre ; un égout unitaire reçoit tout ensemble (cours d’évacuation).",
        narration: `Après usage, l’eau doit être rejetée dans de bonnes conditions. On distingue trois sortes d’eau. Les eaux usées, ou eaux ménagères, sortent des éviers, des douches, des lavabos, des lave-linge. Les eaux vannes sortent des WC. Les eaux pluviales viennent de la pluie : elles partent par des descentes indépendantes. Il est interdit de mélanger les eaux usées ou vannes avec les ouvrages d’eaux pluviales. Chaque appareil a aussi un siphon, qui garde de l’eau en permanence pour empêcher les mauvaises odeurs de remonter. Dans cette station, on dimensionne l’évacuation des eaux usées et vannes d’un immeuble.`,
        scene: sceneEaux, wire: filigrane,
        equivalent: () => "Trois cartes : eaux usées (éviers, douches, lavabos, lave-linge), eaux vannes (WC), eaux pluviales (pluie, réseau séparé). Chaque appareil a un siphon.",
        action: {
          type: "choice", prompt: "Où va l’eau qui sort d’un WC ?",
          options: [{ label: "Eaux vannes (EV)" }, { label: "Eaux usées (EU)" }, { label: "Eaux pluviales (EP)" }], correct: 0,
          explain: "Les rejets des WC sont des eaux vannes (EV). Les eaux usées (EU) sortent des éviers, douches, lavabos et lave-linge. Les eaux pluviales ne se mélangent jamais aux deux autres dans le bâtiment."
        }
      },
      {
        short: "Données", kicker: "lire", title: "Le sujet donne les débits et les capacités",
        text: "Chaque appareil rejette un débit d’évacuation, bien plus grand que son débit d’alimentation : l’eau sort d’un coup. Chaque diamètre peut évacuer au plus un débit : sa capacité. Le sujet donne ces nombres. On prend le plus petit diamètre dont la capacité suffit. Dans la vraie vie, ces valeurs sont dans votre dossier technique et la norme de votre établissement.",
        cap: "Repérez le débit d’un appareil et la capacité d’un diamètre.",
        tp: "Comparez le débit à évacuer à la capacité de chaque diamètre.",
        bts: "La méthode est celle du DTU 60.11 « Règles de calcul des installations de plomberie sanitaire et des installations d’évacuation des eaux pluviales » ; ses valeurs et la pente se lisent dans votre dossier technique et la norme de votre établissement.",
        narration: `Pour évacuer l’eau, on compare deux nombres. Le premier est le débit d’évacuation de chaque appareil : le sujet le donne en litres par seconde. Il est bien plus grand que le débit d’alimentation, parce que l’eau sort d’un coup. Le second est ce que chaque diamètre peut évacuer, pour une pente donnée : sa capacité. Pour un débit à évacuer, on prend le plus petit diamètre dont la capacité est au moins égale. Dans la vraie vie, ces valeurs sont dans votre dossier technique et dans la norme de votre établissement. Lisez la question, puis cherchez la bonne ligne.`,
        scene: sceneDonnees, wire: filigrane, aideMobile: donneesLire,
        equivalent: () => `Données du sujet : débit d’évacuation de trois appareils (${APP_LIRE.map((id) => `${decl(nomE(id))} ${fr(qe(id))} l/s`).join(", ")}) et capacité de trois diamètres à ${PENTE} cm par mètre (${CAND_LIRE.map((d) => `${d} mm : ${fr(S.capacite(d, PENTE))} l/s`).join(", ")}). Débit à évacuer : ${fr(Q_LIRE, 1)} l/s.`,
        action: {
          type: "choice", prompt: `Le sujet demande d’évacuer ${fr(Q_LIRE, 1)} l/s : c’est le débit probable d’un immeuble, déjà calculé (les débits d’appareils sont des exemples, on ne les additionne pas ici). Quel est le plus petit diamètre dont la capacité suffit ?`,
          options: CAND_LIRE.map((d) => ({ label: `${d} mm` })), correct: CAND_LIRE.indexOf(BON_LIRE.dint),
          explain: `${CAND_LIRE.filter((d) => d < BON_LIRE.dint).map((d) => `${d} mm n’évacue que ${fr(S.capacite(d, PENTE))} l/s`).join(" et ")} : c’est moins que ${fr(Q_LIRE, 1)} l/s. ${BON_LIRE.dint} mm évacue ${fr(BON_LIRE.capacite)} l/s : c’est le premier assez grand.`
        }
      },
      {
        short: "Exemple", kicker: "exemple résolu", title: "Exemple complet : un collecteur et sa chute",
        text: `Immeuble de ${CAS_EXEMPLE.n} logements ; chacun a 1 évier, 1 lavabo, 1 douche, 1 baignoire et 1 WC. On cherche le diamètre du collecteur principal et celui de la chute. Les données du sujet sont sous ce texte. Suivez les six lignes de haut en bas.`,
        cap: "Lisez une ligne après l’autre et repérez d’où vient chaque nombre.",
        tp: "Retrouvez l’ordre des opérations.",
        bts: "La capacité de chaque diamètre est donnée par le sujet : elle se calcule par la formule de Bazin (eau à mi-hauteur du tuyau). Le diamètre de la chute est fixé par le sujet.",
        narration: `Voici le calcul complet sur un immeuble de ${CAS_EXEMPLE.n} logements. Ligne 1 : on additionne les débits d’évacuation d’un logement, soit ${fr(EX.parLogement)} litres par seconde. Ligne 2 : pour ${CAS_EXEMPLE.n} logements, ${fr(EX.sq)}. Ligne 3 : on compte ${EX.x} appareils, et, avec la formule de l’exercice, y vaut ${fr(EX.y, 4)}. Ligne 4 : le débit probable est de ${fr(EX.qp, 2)} litres par seconde. Ligne 5 : parmi les diamètres à essayer, à ${PENTE} centimètre par mètre, ${EX.prec} millimètres n’admet que ${fr(EX.capPrec)} : trop petit. On prend le premier diamètre assez grand : ${EX.col.dint}. Ligne 6 : une chute qui reçoit des WC fait, dans cet exercice, ${EX.chute} millimètres au moins. On retient le plus grand des deux pour le collecteur.`,
        scene: sceneExemple, wire: filigrane, aide: () => donnees(CAS_EXEMPLE), aideMobile: () => lignesHtml(CAS_EXEMPLE, EX),
        equivalent: () => `Exemple résolu : ${EX.details} = ${fr(EX.parLogement)} l/s par logement ; ΣQe = ${fr(EX.sq)} l/s ; x = ${EX.x}, y = ${fr(EX.y, 4)} ; QP = ${fr(EX.qp, 3)} l/s ; collecteur ${EX.col.dint} mm ; chute ${EX.chute} mm mini ; collecteur retenu ${EX.retenu} mm.`,
        action: {
          type: "sequence", prompt: "Cliquez les cinq opérations dans l’ordre où l’exemple les fait.",
          items: ["Choisir le collecteur parmi les diamètres à essayer", "Lire les débits d’évacuation et les additionner", "Comparer avec la chute : le plus grand l’emporte", "Multiplier : débit probable", "Compter les appareils et calculer y"],
          correctOrder: [1, 4, 3, 0, 2],
          explain: "Le collecteur se choisit avec le débit probable : il faut donc l’avoir calculé d’abord. La comparaison avec la chute se fait en dernier, parce qu’elle choisit entre deux diamètres déjà trouvés."
        }
      },
      {
        short: "À vous", kicker: "à vous, seul", title: "Un autre immeuble : 5 logements",
        text: "Chaque logement a 1 évier, 1 lavabo, 1 baignoire et 1 WC. Faites seul le même calcul. Les données du sujet sont sous la consigne ; le dessin les rappelle. Règle de l’exercice : si le collecteur calculé est plus petit que la chute, on prend le diamètre de la chute.",
        cap: "Faites la première case ; la solution reste disponible.",
        tp: "Faites les quatre cases, sans l’exemple.",
        bts: "Faites les quatre cases. Puis écrivez sur votre feuille, avec vos mots, pourquoi le collecteur retenu n’est pas plus petit que la chute.",
        narration: `C’est à vous. ${CAS_EXERCICE.n} logements, chacun avec un évier, un lavabo, une baignoire et un WC. Faites le même calcul que dans l’exemple. Additionnez d’abord les débits d’évacuation donnés par le sujet, sous la consigne, comptez les appareils, calculez y, puis le débit probable. Ensuite, parmi les diamètres à essayer, à ${PENTE} centimètre par mètre, prenez le premier dont la capacité est au moins égale à votre débit. Enfin comparez avec la chute : dans cet exercice, si le collecteur est plus petit, on prend la chute. Un arrondi correct est accepté. Un indice vous aide si une case est fausse.`,
        scene: sceneExercice, wire: filigrane, aide: () => donnees(CAS_EXERCICE), aideMobile: (v) => (v === "resolu" ? lignesHtml(CAS_EXERCICE, EXO) : aideCalcul()),
        equivalent: (v) => v === "resolu" ? `Exercice corrigé : ΣQe = ${fr(EXO.sq)} l/s ; x = ${EXO.x}, y = ${fr(EXO.y, 4)} ; QP = ${fr(EXO.qp, 3)} l/s ; collecteur ${EXO.col.dint} mm ; chute ${EXO.chute} mm mini.` : `Cas de l’exercice : ${CAS_EXERCICE.n} logements, chacun avec ${CAS_EXERCICE.par.map((p) => `${decl(nomE(p.id))} (${fr(qe(p.id))} l/s)`).join(", ")}. Diamètres à essayer pour une pente de ${PENTE} cm par mètre : ${listeCap(CAS_EXERCICE.candidats)} (détail dans la description du dessin).`,
        action: {
          type: "calc", sceneFor: true, prompt: `Dimensionnez l’évacuation de l’immeuble de ${CAS_EXERCICE.n} logements. Un arrondi correct est accepté : écrivez le nombre avec le nombre de décimales indiqué.`,
          fields: [
            { label: "Somme des débits ΣQe (2 décimales)", unit: "l/s", answer: EXO.sq, tol: 0.01, dec: 2, hint: "lisez le débit d’évacuation de chaque appareil dans les données du sujet, sous la consigne, additionnez pour un logement, multipliez par " + CAS_EXERCICE.n + "." },
            { label: "Débit probable QP (2 ou 3 décimales)", unit: "l/s", answer: EXO.qp, tol: 0.1, dec: 3, hint: "x = nombre total d’appareils ; y = 0,8 ÷ √(x − 1) (2 à 4 décimales) ; QP = ΣQe × y." },
            { label: "Diamètre du collecteur retenu", unit: "mm", answer: EXO.retenu, tol: 0.5, dec: 0, hint: "parmi les diamètres à essayer (données du sujet), prenez le premier dont la capacité est au moins égale à QP ; comparez ensuite avec la chute." },
            { label: "Diamètre mini de la chute (valeur du sujet)", unit: "mm", answer: EXO.chute, tol: 0.5, dec: 0, hint: "dans cet exercice, le sujet fixe le diamètre intérieur minimal d’une chute qui reçoit un WC : relevez-le dans les conventions de l’exercice. Ce n’est pas encore un tube : le tube se choisit à l’étape suivante." }
          ],
          avant: "La méthode est celle de l’exemple : ΣQe, puis x et y, puis QP, puis le diamètre choisi parmi ceux à essayer, puis la comparaison avec la chute. Les lignes de l’exemple ne sont plus affichées : lisez les données du sujet, sous la consigne, et appliquez les formules.",
          explain: `ΣQe = ${CAS_EXERCICE.n} × ${fr(EXO.parLogement)} = ${fr(EXO.sq)} l/s ; x = ${EXO.x}, y = ${fr(EXO.y, 4)} ; QP = ${fr(EXO.sq)} × ${fr(EXO.y, 4)} = ${fr(EXO.qp, 3)} l/s. Parmi les diamètres à essayer (${PENTE} cm/m), ${EXO.prec} mm n’admet que ${fr(EXO.capPrec)} l/s, ${EXO.col.dint} mm admet ${fr(EXO.col.capacite)} l/s : c’est le premier assez grand. Dans cet exercice, la chute avec WC fait ${EXO.chute} mm au minimum : le collecteur retenu est ${EXO.retenu} mm.`
        }
      },
      {
        short: "Ventilation", kicker: "décider", title: "La ventilation de chute",
        text: "Une chute qui reçoit de l’eau aspire l’air et peut vider les siphons. On la prolonge donc, dans son diamètre, jusqu’à l’air libre au-dessus des locaux habités : c’est la ventilation primaire.",
        cap: "Retenez : la chute se prolonge jusqu’à l’air libre.",
        tp: "Sur votre feuille, écrivez en deux phrases pourquoi on ventile et où s’arrête la ventilation. Puis faites les deux cases.",
        bts: `Dans cet exercice, on retient que, pour des ventilations regroupées, la sortie unique a le diamètre immédiatement supérieur au plus grand des diamètres regroupés. Le système de chute unique demande en plus une ventilation secondaire (cours d’évacuation), non dimensionnée ici.`,
        narration: `Quand une grande quantité d’eau coule dans une chute, elle crée un effet de pompe et risque d’aspirer l’eau des siphons. Les mauvaises odeurs remontent alors. Pour l’éviter, on prolonge la chute jusqu’à l’air libre, au-dessus de la partie la plus haute du bâtiment, dans le même diamètre : c’est la ventilation primaire. Dans cet exercice, quand plusieurs chutes sont regroupées en une seule sortie, on retient le diamètre immédiatement supérieur au plus grand des deux : par exemple, deux chutes de ${EX_VENT} millimètres donnent ${EX_VENT_SUIV}. En situation réelle, vérifiez dans votre dossier technique. Un parcours horizontal doit avoir une pente, pour que l’eau de condensation retourne dans une chute.`,
        scene: sceneVentilation, wire: filigrane, aide: donneesTubes,
        equivalent: (v) => `Une chute reçoit un WC, une salle d’eau et une cuisine et se prolonge jusqu’à l’air libre dans son diamètre. Dans l’exercice, deux chutes regroupées donnent une ventilation unique${v === "resolu" ? ` : chute de ${CHUTE_TUBE} mm, ventilation regroupée de ${VENT_REGROUPEE} mm` : " d’un diamètre immédiatement supérieur"}.`,
        action: {
          type: "calc", sceneFor: true, prompt: `Deux chutes de WC sont regroupées. À l’étape 4, vous avez relevé le minimum du sujet (${S.CHUTE_AVEC_WC} mm) ; ici, vous choisissez de vrais tubes dans la liste sous la consigne.`,
          fields: [
            { label: "Tube de chaque chute (le plus petit d’au moins 90 mm)", unit: "mm", answer: CHUTE_TUBE, tol: 0.5, dec: 0, hint: `parmi les tubes proposés, prenez le plus petit diamètre au moins égal à ${S.CHUTE_AVEC_WC} mm (pas ${S.CHUTE_AVEC_WC} : il n’est pas dans la liste).` },
            { label: "Tube de la ventilation regroupée (celui qui suit)", unit: "mm", answer: VENT_REGROUPEE, tol: 0.5, dec: 0, hint: "dans la même liste, prenez le diamètre qui suit celui des chutes." }
          ],
          avant: "On cherche d’abord le tube de la chute parmi les tubes proposés, puis le diamètre qui le suit dans la liste : c’est celui de la ventilation regroupée.",
          explain: `Parmi les tubes proposés, ${CHUTE_TUBE} mm est le premier d’au moins ${S.CHUTE_AVEC_WC} mm. Le diamètre immédiatement supérieur est ${VENT_REGROUPEE} mm : c’est celui de la ventilation regroupée (convention de l’exercice).`
        }
      }
    ]
  };
})();
