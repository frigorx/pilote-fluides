(() => {
  "use strict";

  /* Station « Dimensionner une distribution d’eau sanitaire » (satellite E5+a, TP TECVC CP3).
     Réécriture du 22/10/2026 : aucun tableau de norme n’est affiché ni embarqué. Chaque exercice reçoit ses DONNÉES DANS L’ÉNONCÉ
     (« données du sujet » : le débit de base des seuls appareils du cas, la vitesse maximale, quelques tubes à essayer) ; l’élève
     applique la méthode. Les valeurs de la vie réelle se lisent dans le dossier technique et la norme de l’établissement.
     Tous les nombres calculés sortent de ../_commun/sanitaire-dtu.js (formules) : aucun résultat n’est tapé ici. */
  const S = window.SanitaireDTU, fr = S.fr;
  const ligne = new URLSearchParams(location.search).get("line") === "D" ? "D" : "E";
  const qs = "?line=" + ligne;

  /* ---------- petits outils de dessin (aucun symbole technique : des tableaux, des courbes, des barres) ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 20}" font-weight="${o.w || 400}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.style ? ` style="${o.style}"` : ""}>${esc(s)}</text>`;
  const r = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 8}" fill="${o.fond || "#fffdf8"}" stroke="${o.trait || "#1b3a63"}" stroke-opacity="${o.op ?? 0.28}" stroke-width="${o.sw || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;
  const shell = (id, titre, desc, corps) => `<svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-t ${id}-d" font-family="Calibri, 'Segoe UI', system-ui, Arial, sans-serif"><title id="${id}-t">${esc(titre)}</title><desc id="${id}-d">${esc(desc)}</desc><rect x="6" y="6" width="708" height="408" rx="18" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>${corps}</svg>`;
  /* le filigrane inerWeb (R9) : posé par le moteur commun, sans tuyau */
  const filigrane = (el) => { const svg = el.querySelector("svg"); if (svg && window.HydroEcoulement) window.HydroEcoulement.brancher(svg, { tubes: [] }); };

  const decl = (a) => a.toLowerCase().replace(/^wc/, "WC");
  const nomApp = (id) => S.ALIM.find((a) => a.id === id).nom;
  const qb = (id) => S.ALIM.find((a) => a.id === id).qb;

  /* ---------- les trois cas : lire, l’exemple résolu et l’exercice ---------- */
  const CAS_LIRE = { n: 1, par: [{ id: "douche", n: 1 }, { id: "lavabo", n: 2 }, { id: "wc", n: 1 }] };
  /* l’exemple résolu qui précède la première question : un autre logement, avec d’autres appareils */
  const CAS_MODELE = { n: 1, par: [{ id: "baignoire", n: 1 }, { id: "evier", n: 2 }, { id: "douche", n: 1 }] };
  const CAS_EXEMPLE = { n: 4, par: [{ id: "evier", n: 1 }, { id: "lavabo", n: 1 }, { id: "douche", n: 1 }, { id: "wc", n: 1 }] };
  const CAS_EXERCICE = { n: 6, par: [{ id: "evier", n: 1 }, { id: "lavabo", n: 1 }, { id: "baignoire", n: 1 }, { id: "wc", n: 1 }] };
  /* Ø intérieurs (mm) des tubes que le sujet propose d’essayer */
  const TUBES = [20, 26, 33, 40];

  function calcul(cas) {
    const total = cas.par.map((p) => ({ id: p.id, n: p.n * cas.n }));
    const parLogement = S.somme(cas.par, S.ALIM, "qb");
    const sq = S.somme(total, S.ALIM, "qb"), x = S.nombre(total), y = S.coeff(x), qp = sq * y;
    const d = S.dintMini(qp, S.VMAX), tube = S.auMoins(d, TUBES), v = S.vitesse(qp, tube);
    const details = cas.par.map((p) => fr(qb(p.id))).join(" + ");
    return { parLogement, sq, x, y, qp, d, tube, v, details, nPar: S.nombre(cas.par) };
  }
  const EX = calcul(CAS_EXEMPLE), EXO = calcul(CAS_EXERCICE);

  /* ---------- les données du sujet, en texte HTML (moteur : aide / aideMobile) : ce qu'il faut lire pour répondre, à une taille lisible ---------- */
  const listeDebits = (cas) => cas.par.map((p) => `${decl(nomApp(p.id))} ${fr(qb(p.id))}`).join(" · ");
  const nbApp = (p) => `${p.n} ${decl(nomApp(p.id))}${p.n > 1 && p.id !== "wc" ? "s" : ""}`;
  const donneesLire = () => `<p><strong>Données du sujet.</strong> Un logement a ${CAS_LIRE.par.map(nbApp).join(", ")}. Débit de base d’un seul appareil, en l/s : ${listeDebits(CAS_LIRE)}.</p>`;
  /* exemple résolu de la somme, écrit AVANT la première question (un autre logement) */
  const exempleSomme = () => `<p><strong>Exemple résolu, un autre logement :</strong> ${CAS_MODELE.par.map(nbApp).join(", ")}. Débit de base d’un seul appareil, en l/s : ${listeDebits(CAS_MODELE)}.</p><p>${CAS_MODELE.par.map((p) => `${p.n} × ${fr(qb(p.id))}`).join(" + ")} = <strong>${fr(S.somme(CAS_MODELE.par, S.ALIM, "qb"))} l/s</strong>. On multiplie le débit d’un seul appareil par le nombre d’appareils, puis on additionne.</p>`;
  /* ligne 6 de l’exemple, pas à pas : la formule et les unités écrites AVANT que l’élève ait à les employer (étape 4) */
  const detailLigne6 = () => {
    const Q = fr(EX.qp / 1000, 6), Sx = S.section(EX.qp, S.VMAX), St = S.sectionTube(EX.tube);
    return `<p><strong>Ligne 6, pas à pas.</strong> S = QP ÷ v (la section est le débit divisé par la vitesse) ; d = √(4 × S ÷ π). QP s’écrit en m³/s (1 l/s = 0,001 m³/s) ; d sort en mètres, × 1000 pour des mm.</p><p>Ici : QP = ${Q} m³/s ; S = ${Q} ÷ ${fr(S.VMAX, 1)} = ${fr(Sx, 6)} m² ; d = √(4 × ${fr(Sx, 6)} ÷ π) = ${fr(EX.d / 1000, 4)} m = ${fr(EX.d, 1)} mm, donc le tube Ø ${EX.tube} mm. Sa vitesse : v = QP ÷ S, avec S = π × d² ÷ 4 = π × ${fr(EX.tube / 1000, 3)}² ÷ 4 = ${fr(St, 6)} m² ; v = ${Q} ÷ ${fr(St, 6)} = ${fr(EX.v)} m/s.</p>`;
  };
  const donnees = (cas, avecTubes) => `<p><strong>Données du sujet.</strong> Débit de base en l/s : ${listeDebits(cas)}. Vitesse de l’eau : ${fr(S.VMAX, 1)} m/s au plus.${avecTubes ? ` Tubes proposés (Ø intérieur) : ${TUBES.join(" · ")} mm.` : ""}</p>`;
  const donneesTubes = () => `<p><strong>Données du sujet.</strong> Débit probable : ${fr(EXO.qp, 3)} l/s. Vitesse de l’eau : ${fr(S.VMAX, 1)} m/s au plus. Tubes proposés (Ø intérieur) : ${TUBES.join(" · ")} mm.</p><p><strong>Vitesse dans un tube :</strong> v = QP ÷ S, avec S = π × d² ÷ 4 (d en mètres, QP en m³/s) ; la vitesse sort en m/s. Exemple de l’étape 3 : tube Ø ${EX.tube} mm, S = ${fr(S.sectionTube(EX.tube), 6)} m², v = ${fr(EX.qp / 1000, 6)} ÷ ${fr(S.sectionTube(EX.tube), 6)} = ${fr(EX.v)} m/s.</p>`;
  const feuilleHtml = (cas, c) => `<ol>${lignesDe(cas, c).map(([lib, calc]) => `<li>${lib} : <strong>${calc}</strong></li>`).join("")}</ol>`;
  /* l'aide-mémoire de l'étape 4 : une seule liste, dessinée dans la scène et recopiée en texte (téléphone) */
  const AIDE_MEMOIRE = ["ΣQb = somme des débits de base", "x = nombre total d’appareils", "y = 0,8 ÷ √(x − 1)", "QP = ΣQb × y", "S = QP ÷ v", "d = √(4 × S ÷ π)", `v = ${fr(S.VMAX, 1)} m/s au plus`, "QP en m³/s : 1 l/s = 0,001 m³/s", "d sort en m : × 1000 pour des mm"];
  const formulesHtml = () => `<p><strong>Aide-mémoire</strong> : ${AIDE_MEMOIRE.join(" ; ")}.</p><p><strong>Le cas</strong> : ${CAS_EXERCICE.n} logements, chacun avec ${CAS_EXERCICE.par.map((p) => `${p.n} ${decl(nomApp(p.id))}`).join(", ")}.</p>`;

  /* ---------- scène 1 : les données du sujet pour lire et additionner ---------- */
  function sceneDebits() {
    const x0 = 24, w = 672, y0 = 14, hh = 44, rh = 62;
    let g = `<rect x="${x0}" y="${y0}" width="${w}" height="${hh}" rx="8" fill="#1b3a63"/>`
      + t(x0 + 14, y0 + 30, "DONNÉES DU SUJET", { w: 700, style: "fill:#fff" })
      + t(x0 + w - 14, y0 + 30, "Débit de base d’un appareil (l/s)", { w: 700, anchor: "end", style: "fill:#fff" });
    CAS_LIRE.par.forEach((p, i) => {
      const y = y0 + hh + i * rh;
      g += r(x0, y, w, rh)
        + t(x0 + 22, y + 40, nbApp(p), { size: 26, w: 700 })
        + t(x0 + w - 14, y + 40, `${fr(qb(p.id))} par ${p.id === "wc" ? "WC" : decl(nomApp(p.id))}`, { size: 26, w: 800, anchor: "end" });
    });
    const yb = y0 + hh + CAS_LIRE.par.length * rh + 18;
    g += r(x0, yb, w, 400 - yb, { fond: "#f3f7fb", op: 1 })
      + t(x0 + 18, yb + 34, "Chaque nombre est le débit d’UN seul appareil.", { w: 700 })
      + t(x0 + 18, yb + 62, "Ces valeurs sont données par le sujet.", {})
      + t(x0 + 18, yb + 90, "Dans la vie réelle : votre dossier technique et la", {})
      + t(x0 + 18, yb + 116, "norme de votre établissement les donnent.", {});
    return shell("san-d1", "Les données du sujet : débits de base", `Trois lignes données par le sujet pour un logement : ${CAS_LIRE.par.map(nbApp).join(", ")}. Chaque nombre est le débit de base d’un seul appareil, en litres par seconde : ${listeDebits(CAS_LIRE)}. Dans la vie réelle, ces valeurs sont dans le dossier technique et la norme de l’établissement.`, g);
  }

  /* ---------- scène 2 : la courbe du coefficient de simultanéité ---------- */
  function sceneSimultaneite(x) {
    const X0 = 84, Y0 = 28, W = 410, H = 282, xmin = 6, xmax = 60, ymax = 0.4;
    const px = (v) => X0 + (v - xmin) / (xmax - xmin) * W, py = (v) => Y0 + H - v / ymax * H;
    const pts = []; for (let v = xmin; v <= xmax; v += 1) pts.push(`${pts.length ? "L" : "M"}${px(v).toFixed(1)} ${py(S.coeff(v)).toFixed(1)}`);
    const y = S.coeff(x);
    let g = `<line x1="${X0}" y1="${Y0 + H}" x2="${X0 + W + 10}" y2="${Y0 + H}" stroke="#1b3a63" stroke-width="3"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0 + H}" stroke="#1b3a63" stroke-width="3"/>`
      + `<path d="${pts.join("")}" fill="none" stroke="#3d7fca" stroke-width="5"/>`
      + `<line x1="${px(x).toFixed(1)}" y1="${py(y).toFixed(1)}" x2="${px(x).toFixed(1)}" y2="${Y0 + H}" stroke="#c9451a" stroke-width="3" stroke-dasharray="6 5"/>`
      + `<line x1="${X0}" y1="${py(y).toFixed(1)}" x2="${px(x).toFixed(1)}" y2="${py(y).toFixed(1)}" stroke="#c9451a" stroke-width="3" stroke-dasharray="6 5"/>`
      + `<circle cx="${px(x).toFixed(1)}" cy="${py(y).toFixed(1)}" r="9" fill="#c9451a" stroke="#fff" stroke-width="3"/>`;
    [6, 10, 20, 30, 40, 50, 60].forEach((v) => { g += `<line x1="${px(v).toFixed(1)}" y1="${Y0 + H}" x2="${px(v).toFixed(1)}" y2="${Y0 + H + 7}" stroke="#1b3a63" stroke-width="2"/>` + t(px(v).toFixed(1), Y0 + H + 30, String(v), { size: 19, anchor: "middle" }); });
    [0, 0.1, 0.2, 0.3, 0.4].forEach((v) => { g += `<line x1="${X0 - 7}" y1="${py(v).toFixed(1)}" x2="${X0}" y2="${py(v).toFixed(1)}" stroke="#1b3a63" stroke-width="2"/>` + t(X0 - 12, (py(v) + 6).toFixed(1), fr(v, 1), { size: 19, anchor: "end" }); });
    g += t(X0 + W / 2, 374, "Nombre d’appareils x", { anchor: "middle", w: 700 }) + t(X0 + 12, Y0 + 24, "Coefficient y", { w: 700, size: 19 });
    g += r(524, 40, 180, 88, { trait: "#1b3a63", op: 1 }) + t(614, 76, `x = ${x}`, { size: 26, w: 800, anchor: "middle" }) + t(614, 108, "appareils", { anchor: "middle" })
      + r(524, 148, 180, 88, { trait: "#3d7fca", op: 1 }) + t(614, 184, `y = ${fr(y, 3)}`, { size: 26, w: 800, anchor: "middle" }) + t(614, 216, "coefficient", { anchor: "middle" })
      + r(524, 256, 180, 100, { trait: "#c9451a", op: 1, fond: "#fff4e0" }) + t(614, 294, `${fr(y * 100, 0)} %`, { size: 28, w: 800, anchor: "middle" }) + t(614, 322, "du débit cumulé", { anchor: "middle" }) + t(614, 346, "est retenu", { anchor: "middle" });
    return shell("san-d2", "Coefficient de simultanéité selon le nombre d’appareils", `Courbe de y = 0,8 divisé par la racine de x moins un, pour x de 6 à 60 appareils. Pour ${x} appareils, y vaut ${fr(y, 3)} : on retient ${fr(y * 100, 0)} % de la somme des débits de base.`, g);
  }

  /* ---------- scène 3 et 4 résolue : la feuille de calcul ---------- */
  function lignesDe(cas, c) {
    return [
      ["Débits de base d’un logement (données du sujet)", `${c.details} = ${fr(c.parLogement)} l/s`],
      ["Somme des débits de base", `ΣQb = ${cas.n} × ${fr(c.parLogement)} = ${fr(c.sq)} l/s`],
      ["Nombre d’appareils", `x = ${cas.n} × ${c.nPar} = ${c.x}`],
      ["Coefficient de simultanéité", `y = 0,8 ÷ √${c.x - 1} = ${fr(c.y, 4)}`],
      ["Débit probable", `QP = ${fr(c.sq)} × ${fr(c.y, 4)} = ${fr(c.qp, 3)} l/s`],
      [`Diamètre mini (vitesse ≤ ${fr(S.VMAX, 1)} m/s) et plus petit tube proposé`, `d = ${fr(c.d, 1)} mm → tube Ø ${c.tube} mm, v = ${fr(c.v)} m/s`]
    ];
  }
  function feuille(cas, c, id, titre) {
    const lignes = lignesDe(cas, c);
    let g = "";
    lignes.forEach(([lib, calc], i) => {
      const y = 14 + i * 65;
      g += r(20, y, 680, 59, { fond: i === 4 ? "#fff4e0" : "#fffdf8", trait: i === 4 ? "#c9451a" : "#1b3a63", op: i === 4 ? 1 : 0.28 })
        + `<circle cx="52" cy="${y + 30}" r="19" fill="#1b3a63"/>` + t(52, y + 37, String(i + 1), { w: 800, anchor: "middle", style: "fill:#fff" })
        + t(86, y + 23, lib, { size: 19, style: "fill:#637285" }) + t(86, y + 49, calc, { size: 22, w: 700 });
    });
    return shell(id, titre, "Feuille de calcul en six lignes : " + lignes.map(([l, c]) => `${l} : ${c}`).join(" ; "), g);
  }
  const sceneExemple = () => feuille(CAS_EXEMPLE, EX, "san-d3", "Exemple résolu : immeuble de 4 logements");

  /* ---------- scène 4 : le cas de l’exercice, avec ses données et l’aide-mémoire (les lignes de l’exemple ont disparu) ---------- */
  function sceneExercice(v) {
    if (v === "resolu") return feuille(CAS_EXERCICE, EXO, "san-d4b", "Exercice corrigé : immeuble de 6 logements");
    let g = r(24, 24, 330, 372, { op: 1 }) + t(44, 62, "LE CAS", { size: 22, w: 800 }) + t(44, 104, `${CAS_EXERCICE.n} logements`, { size: 28, w: 800 }) + t(44, 144, "Chaque logement a :", { w: 700 });
    CAS_EXERCICE.par.forEach((p, i) => { g += t(54, 184 + i * 38, `• ${p.n} ${decl(nomApp(p.id))}`, { size: 19 }) + t(336, 184 + i * 38, `${fr(qb(p.id))} l/s`, { size: 19, w: 700, anchor: "end" }); });
    g += t(44, 352, "Débit de base : donné par le sujet.", { size: 19, style: "fill:#637285" });
    g += r(374, 24, 322, 372, { op: 1, fond: "#f3f7fb" }) + t(394, 62, "AIDE-MÉMOIRE", { size: 22, w: 800 });
    AIDE_MEMOIRE.forEach((l, i) => { g += t(394, 100 + i * 33, l, { w: i < 6 ? 700 : 400, size: i < 6 ? 21 : 19 }); });
    return shell("san-d4", "Le cas de l’exercice et l’aide-mémoire", `Cas : ${CAS_EXERCICE.n} logements ayant chacun ${CAS_EXERCICE.par.map((p) => `${p.n} ${decl(nomApp(p.id))} (débit de base ${fr(qb(p.id))} l/s)`).join(", ")}. Aide-mémoire : ΣQb, x nombre total d’appareils, y = 0,8 divisé par la racine de x moins un, QP = ΣQb × y, S = QP divisé par v, d = racine de 4 S divisé par pi, v au plus ${fr(S.VMAX, 1)} m/s.`, g);
  }

  /* ---------- scène 5 : la vitesse dans chaque tube proposé ---------- */
  function sceneTubes(i) {
    const qp = EXO.qp, X = 190, ECH = 120, vmax = 3, H0 = 44, PAS = 60;
    let g = t(24, 30, `Vitesse de l’eau pour QP = ${fr(qp, 3)} l/s`, { w: 800, size: 22 })
      + `<rect x="${X}" y="40" width="${S.VMAX * ECH}" height="${TUBES.length * PAS}" fill="#e3f5ec"/>`;
    TUBES.forEach((d, k) => {
      const v = S.vitesse(qp, d), ok = v <= S.VMAX, y = H0 + k * PAS, sel = k === i;
      g += `<rect x="20" y="${y + 2}" width="680" height="${PAS - 8}" rx="8" fill="none" stroke="#1b3a63" stroke-width="${sel ? 4 : 1}" stroke-opacity="${sel ? 1 : 0.2}"/>`
        + t(32, y + 36, `Ø ${d} mm`, { w: sel ? 800 : 400, size: 24 })
        + `<rect x="${X}" y="${y + 11}" width="${(Math.min(v, vmax) * ECH).toFixed(1)}" height="30" fill="${ok ? "#1e7e54" : "#c9451a"}"/>`
        + t(692, y + 36, `${ok ? "✓" : "✗"} ${fr(v)} m/s`, { w: sel ? 800 : 400, anchor: "end", size: 22 });
    });
    const yb = H0 + TUBES.length * PAS + 24;
    [[0, "0"], [S.VMAX, fr(S.VMAX, 1)], [3, "3"]].forEach(([v, lib]) => { g += t(X + v * ECH, yb, lib, { size: 19, anchor: "middle" }); });
    g += t(X + 3 * ECH + 22, yb, "m/s", { size: 19 });
    g += t(24, yb + 30, `✓ au plus ${fr(S.VMAX, 1)} m/s : vitesse acceptée par le sujet`, { size: 19 }) + t(24, yb + 54, `✗ plus de ${fr(S.VMAX, 1)} m/s : trop vite`, { size: 19 });
    return shell("san-d5", "Vitesse de l’eau dans chaque tube proposé", `Pour un débit probable de ${fr(qp, 3)} l/s, vitesse dans les tubes proposés par le sujet : ${TUBES.map((d) => `Ø ${d} mm : ${fr(S.vitesse(qp, d))} m/s`).join(", ")}. Le sujet impose ${fr(S.VMAX, 1)} m/s au plus.`, g);
  }

  /* ---------- les cinq étapes ---------- */
  const total1 = S.somme(CAS_LIRE.par, S.ALIM, "qb");

  window.STATION_CONFIG = {
    code: "E5+a", id: "sanitaire-distribution", title: "Dimensionner une distribution d’eau sanitaire", niveau: "BTS",
    next: "passer à l’évacuation des eaux usées", suite: { href: "../sanitaire-evacuation/index.html" + qs, label: "Station suivante : évacuation" },
    levels: {
      CAP: { objective: "Lire le débit de base d’un appareil dans les données d’un sujet.", assessment: "lire les données et additionner" },
      TP: { objective: "Calculer le débit probable d’un petit immeuble et en déduire un diamètre.", assessment: "refaire le calcul d’un exemple sur un autre immeuble" },
      BTS: { objective: "Dimensionner une antenne d’eau froide : débit probable, diamètre, vitesse.", assessment: "justifier le tube retenu par la vitesse et nommer ce que le calcul ne couvre pas" }
    },
    steps: [
      {
        short: "Débits", kicker: "lire", title: "Chaque appareil a son débit de base",
        text: "Le débit de base est ce que débite un appareil quand il coule seul. Le sujet le donne pour un seul appareil, en litres par seconde (l/s).",
        cap: "Repérez la ligne de chaque appareil dans les données du sujet.",
        tp: "Lisez les débits de base de plusieurs appareils et additionnez-les.",
        bts: "Dites où retrouver ces valeurs dans la vie réelle : dans votre dossier technique et la norme de votre établissement.",
        narration: `Pour dimensionner une distribution d’eau, on part des appareils. Chaque appareil a un débit de base : le débit qu’il demande quand il fonctionne seul. Ici, le sujet vous donne les valeurs : une douche demande ${fr(qb("douche"))} litre par seconde, un WC à réservoir ${fr(qb("wc"))}. Dans la vraie vie, vous les retrouvez dans votre dossier technique et dans la norme de votre établissement. On ne les apprend pas par cœur : on les lit. Vous allez lire trois lignes puis les additionner. Multipliez le débit de chaque appareil par le nombre d’appareils, et faites la somme. Ce n’est pas encore le débit à prévoir : l’étape suivante explique pourquoi.`,
        scene: sceneDebits, wire: filigrane, aide: exempleSomme, aideMobile: donneesLire,
        equivalent: () => `Données du sujet pour un logement : ${CAS_LIRE.par.map(nbApp).join(", ")}. Débit de base d’un seul appareil, en l/s : ${listeDebits(CAS_LIRE)}.`,
        action: {
          type: "calc", prompt: "Un logement a 1 douche, 2 lavabos et 1 WC à réservoir. Quelle est la somme de leurs débits de base ?",
          fields: [{ label: "Somme des débits de base", unit: "l/s", answer: total1, tol: 0.005, dec: 2, hint: "cherchez chaque appareil dans les données du sujet, multipliez par le nombre d’appareils, puis additionnez." }],
          avant: "On lit trois lignes dans les données du sujet (douche, lavabo, WC), on multiplie chacune par le nombre d’appareils, puis on additionne. Le résultat s’appelle la somme des débits de base. Σ (sigma) veut dire « somme de ».",
          explain: `1 douche × ${fr(qb("douche"))} + 2 lavabos × ${fr(qb("lavabo"))} + 1 WC × ${fr(qb("wc"))} = ${fr(total1)} l/s.`
        }
      },
      {
        short: "Simultanéité", kicker: "comprendre", title: "Tous les robinets ne coulent pas ensemble",
        text: "On ne retient qu’une partie de la somme : le débit probable, celui qu’on prévoit vraiment à l’heure de pointe. QP = ΣQb × y, avec y = 0,8 ÷ √(x − 1), où x est le nombre d’appareils. La formule s’applique à partir de 6 appareils : le curseur va de 6 à 60.",
        cap: "Retenez : plus il y a d’appareils, plus y est petit.",
        tp: `Le curseur est sur x = ${EX.x}. Sur votre feuille, écrivez le calcul de y avec la formule, puis comparez avec la ligne affichée sous le curseur.`,
        bts: "En dessous de 6 appareils, et pour les cas particuliers (écoles, gymnases), la règle est dans votre dossier technique et la norme de votre établissement.",
        narration: `Dans un immeuble, personne n’ouvre tous les robinets en même temps. Si l’on additionnait tous les débits de base, le réseau serait trop gros et trop cher. On applique donc un coefficient de simultanéité, noté y. Il vaut 0,8 divisé par la racine de x moins un, où x est le nombre d’appareils. Plus il y a d’appareils, plus y est petit. Le débit probable est la somme des débits de base multipliée par y. Faites varier le nombre d’appareils et regardez la part de débit retenue. Attention : ce coefficient s’applique à partir de 6 appareils.`,
        scene: sceneSimultaneite, wire: filigrane,
        equivalent: (x) => `Courbe du coefficient y : à ${x} appareils, y = ${fr(S.coeff(x), 3)} ; on retient ${fr(S.coeff(x) * 100, 0)} % de la somme des débits de base.`,
        action: {
          type: "range", prompt: "Faites varier le nombre d’appareils x et lisez le coefficient y.", label: "Nombre d’appareils x", min: 6, max: 60, step: 1, value: EX.x,
          evaluate: (x) => ({ readout: `x = ${x}`, observation: `y = 0,8 ÷ √(${x} − 1) = ${fr(S.coeff(x), 3)}. On retient ${fr(S.coeff(x) * 100, 0)} % de la somme des débits de base.` })
        }
      },
      {
        short: "Exemple", kicker: "exemple résolu", title: "Exemple complet : un immeuble de 4 logements",
        text: "Chaque logement a 1 évier, 1 lavabo, 1 douche et 1 WC à réservoir. Les données du sujet sont sous ce texte. Suivez les six lignes de haut en bas : à l’étape suivante, vous ferez le même calcul sur un autre immeuble.",
        cap: "Lisez une ligne après l’autre et repérez d’où vient chaque nombre.",
        tp: "Retrouvez l’ordre des opérations.",
        bts: "Vérifiez que la vitesse dans le tube choisi reste sous la limite du sujet.",
        narration: `Voici le calcul complet sur un immeuble de 4 logements. Chaque logement a un évier, un lavabo, une douche et un WC. Ligne 1 : on lit les débits de base dans les données du sujet, soit ${fr(EX.parLogement)} litre par seconde par logement. Ligne 2 : pour 4 logements, la somme fait ${fr(EX.sq)}. Ligne 3 : on compte ${EX.x} appareils. Ligne 4 : le coefficient y vaut ${fr(EX.y, 4)}. Ligne 5 : le débit probable est d’environ ${fr(EX.qp, 2)} litre par seconde. Ligne 6 : on cherche le diamètre qui garde l’eau sous 1,5 mètre par seconde, puis on prend le plus petit tube proposé qui convient. Suivez bien l’ordre : c’est le même à l’étape suivante.`,
        scene: sceneExemple, wire: filigrane, aide: () => donnees(CAS_EXEMPLE, true) + detailLigne6(), aideMobile: () => feuilleHtml(CAS_EXEMPLE, EX),
        equivalent: () => `Exemple résolu : ${EX.details} = ${fr(EX.parLogement)} l/s par logement ; ΣQb = ${fr(EX.sq)} l/s ; x = ${EX.x} ; y = ${fr(EX.y, 4)} ; QP = ${fr(EX.qp, 3)} l/s ; d = ${fr(EX.d, 1)} mm, tube Ø ${EX.tube} mm, v = ${fr(EX.v)} m/s.`,
        action: {
          type: "sequence", prompt: "Cliquez les cinq opérations dans l’ordre où l’exemple les fait.",
          items: ["Calculer le diamètre mini", "Lire les débits de base et les additionner", "Choisir le tube et vérifier la vitesse", "Multiplier : débit probable", "Compter les appareils et calculer y"],
          correctOrder: [1, 4, 3, 0, 2],
          explain: "L’ordre est imposé : le débit probable a besoin de la somme et de y ; le diamètre a besoin du débit probable ; la vitesse se vérifie sur le tube choisi."
        }
      },
      {
        short: "À vous", kicker: "à vous, seul", title: "Un autre immeuble : 6 logements",
        text: "Cette fois, vous faites seul le même calcul. Les lignes de l’exemple ont disparu. Les données du sujet sont sous la consigne ; l’aide-mémoire est sur le dessin.",
        cap: "Faites la première case ; la solution reste disponible.",
        tp: "Faites les quatre cases, sans l’exemple.",
        bts: "Faites les quatre cases, puis vérifiez la vitesse à l’étape suivante.",
        narration: `C’est à vous. ${CAS_EXERCICE.n} logements, chacun avec un évier, un lavabo, une baignoire et un WC à réservoir. Faites le même calcul que dans l’exemple. Lisez d’abord les débits de base dans les données du sujet, sous la consigne, additionnez-les pour tout l’immeuble, comptez les appareils, calculez y, puis le débit probable, puis le diamètre intérieur minimal à 1,5 mètre par seconde. Vous n’avez plus les lignes de l’exemple, mais les formules restent affichées. Un arrondi correct est accepté. Si une case est fausse, un indice vous dit où chercher. Vous pouvez aussi afficher la solution.`,
        scene: sceneExercice, wire: filigrane, aide: () => donnees(CAS_EXERCICE, false), aideMobile: (v) => (v === "resolu" ? feuilleHtml(CAS_EXERCICE, EXO) : formulesHtml()),
        equivalent: (v) => v === "resolu" ? `Exercice corrigé : ΣQb = ${fr(EXO.sq)} l/s ; x = ${EXO.x} ; y = ${fr(EXO.y, 4)} ; QP = ${fr(EXO.qp, 3)} l/s ; d = ${fr(EXO.d, 1)} mm.` : `Cas de l’exercice : ${CAS_EXERCICE.n} logements, chacun avec ${CAS_EXERCICE.par.map((p) => `${p.n} ${decl(nomApp(p.id))} (${fr(qb(p.id))} l/s)`).join(", ")}. L’aide-mémoire donne les formules.`,
        action: {
          type: "calc", sceneFor: true, prompt: `Dimensionnez l’alimentation de l’immeuble de ${CAS_EXERCICE.n} logements. Un arrondi correct est accepté : écrivez le nombre avec le nombre de décimales indiqué.`,
          fields: [
            { label: "Somme des débits de base ΣQb (2 décimales)", unit: "l/s", answer: EXO.sq, tol: 0.01, dec: 2, hint: "lisez le débit de base de chaque appareil dans les données du sujet, sous la consigne, additionnez pour un logement, puis multipliez par " + CAS_EXERCICE.n + "." },
            { label: "Coefficient y (2 à 4 décimales)", unit: "", answer: EXO.y, tol: 0.005, dec: 4, hint: "x est le nombre total d’appareils de l’immeuble ; y = 0,8 ÷ √(x − 1)." },
            { label: "Débit probable QP (2 ou 3 décimales)", unit: "l/s", answer: EXO.qp, tol: 0.025, dec: 3, hint: "QP = ΣQb × y." },
            { label: "Diamètre intérieur mini d (1 décimale)", unit: "mm", answer: EXO.d, tol: 0.8, dec: 1, hint: `S = QP ÷ v, puis d = √(4 × S ÷ π), avec QP en m³/s (1 l/s = 0,001 m³/s) et v = ${fr(S.VMAX, 1)} m/s ; le résultat est en mètres, convertissez en mm.` }
          ],
          avant: "La méthode est celle de l’exemple : ΣQb, puis x et y, puis QP, puis le diamètre. Les lignes de l’exemple ne sont plus affichées : lisez les débits dans les données du sujet, sous la consigne, et appliquez les formules de l’aide-mémoire.",
          explain: `ΣQb = ${CAS_EXERCICE.n} × ${fr(EXO.parLogement)} = ${fr(EXO.sq)} l/s ; x = ${EXO.x} ; y = 0,8 ÷ √${EXO.x - 1} = ${fr(EXO.y, 4)} ; QP = ${fr(EXO.sq)} × ${fr(EXO.y, 4)} = ${fr(EXO.qp, 3)} l/s ; d = ${fr(EXO.d, 1)} mm.`
        }
      },
      {
        short: "Tube", kicker: "vérifier", title: "Choisir le tube et vérifier la vitesse",
        text: `Le diamètre calculé est un minimum. Le sujet propose quatre tubes : on prend le plus petit dont le diamètre intérieur le couvre. Puis on vérifie la vitesse : ${fr(S.VMAX, 1)} m/s au plus.`,
        cap: "Regardez quel tube garde la vitesse sous la limite.",
        tp: "Choisissez le plus petit tube assez gros.",
        bts: "Sur votre feuille, concluez en deux lignes : le tube retenu et sa vitesse. Ajoutez ce que ce calcul ne couvre pas encore (pertes de charge, pression au point le plus défavorisé). La limite de vitesse de la vie réelle est dans votre dossier technique.",
        narration: `Le diamètre que vous avez calculé est un minimum. Dans la réalité, on choisit un tube parmi ceux du fabricant. Ici, le sujet en propose quatre. Faites glisser le curseur pour essayer chaque tube, avec le débit probable de l’étape précédente : ${fr(EXO.qp, 2)} litre par seconde. Regardez la vitesse. Un tube trop petit donne une vitesse trop forte. Le sujet impose 1,5 mètre par seconde au plus ; dans la vraie vie, la limite est dans votre dossier technique. Le bon tube est le plus petit dont la vitesse reste sous 1,5. Les pertes de charge et la pression ne sont pas l’objet de cette station.`,
        scene: sceneTubes, wire: filigrane, aide: donneesTubes,
        equivalent: (i) => { const d = TUBES[i]; return `Tube Ø intérieur ${d} mm : vitesse ${fr(S.vitesse(EXO.qp, d))} m/s pour ${fr(EXO.qp, 3)} l/s.`; },
        action: {
          type: "range", prompt: `Essayez chaque tube proposé avec le débit probable de l’exercice (${fr(EXO.qp, 3)} l/s).`, label: "Tube proposé (Ø intérieur, mm)", min: 0, max: TUBES.length - 1, step: 1, value: 1,
          evaluate: (i) => {
            const d = TUBES[i], v = S.vitesse(EXO.qp, d), juste = EXO.tube === d, lib = `Ø ${d} mm`;
            if (v > S.VMAX) return { readout: lib, kind: "wrong", observation: `Vitesse ${fr(v)} m/s : trop vite, au-delà de ${fr(S.VMAX, 1)} m/s. Prenez un tube plus gros.` };
            return { readout: lib, kind: "correct", observation: `Vitesse ${fr(v)} m/s : sous la limite de ${fr(S.VMAX, 1)} m/s. ${juste ? "C’est le plus petit tube qui convient : c’est le tube retenu." : "Ce tube convient, mais un plus petit suffisait."}` };
          }
        }
      }
    ]
  };
})();
