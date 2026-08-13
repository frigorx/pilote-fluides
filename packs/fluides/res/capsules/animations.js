/* =====================================================================
   ANIMATIONS — bibliothèque de motifs vectoriels pour les capsules.
   ---------------------------------------------------------------------
   CONTRAT : script autonome, sans dépendance. Il expose `ANIM.rendre(spec)`
   qui retourne une CHAÎNE SVG animée, prête à insérer. Les capsules ne
   dessinent jamais elles-mêmes : elles décrivent (`{motif:"etages", ...}`).
   Douze motifs : etages · duo · sequence · jauge · frise · alerte · flux ·
   zone · balance · checklist · barres · cycle.

   RÈGLES TENUES (charte) :
   · aucun texte ne chevauche un tracé — chaque libellé a sa zone réservée ;
   · lisible à l'impression A4 en noir et blanc : la couleur ne porte
     jamais l'information seule (forme, position ou pictogramme la doublent) ;
   · l'animation porte du CONTENU : `prefers-reduced-motion` la calme
     (durée ramenée à zéro par capsule.css) mais ne l'efface pas — l'état
     final reste lisible, jamais un écran vide ;
   · viewBox fixe 800 × 460 : une seule échelle pour tous les motifs, donc
     un texte de taille constante d'une capsule à l'autre.
   PIÈGE : tout texte passe par `t()` (échappement) — un libellé contenant
   « & » ou « < » casserait le SVG.
   ===================================================================== */
"use strict";

const ANIM = (() => {
  const L = 800, H = 460;
  const C = {
    bleu: "#1B3A63", bleu2: "#2f5689", orange: "#FF6B35", orangeClair: "#ffe2d6",
    vert: "#1e7e54", vertClair: "#e3f5ec", rouge: "#c0392b", rougeClair: "#fbe7e4",
    gris: "#5a6b7d", ligne: "#d6dee7", fond: "#fbfcfe", blanc: "#ffffff",
  };

  const t = (v) => String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* Coupe un libellé en lignes d'au plus `max` caractères, sans couper un mot. */
  function lignes(texte, max) {
    const mots = String(texte || "").split(/\s+/);
    const out = [];
    let courante = "";
    for (const mot of mots) {
      if (!courante) courante = mot;
      else if ((courante + " " + mot).length <= max) courante += " " + mot;
      else { out.push(courante); courante = mot; }
    }
    if (courante) out.push(courante);
    return out;
  }

  /* Largeur approchée d'une chaîne, en unités du viewBox. Suffisant pour
     décider d'un placement ; on garde une marge et on ne mesure jamais au
     pixel près (le vrai rendu dépend de la police du poste). */
  const largeurApprox = (texte, taille) => String(texte || "").length * taille * 0.52;

  /* Bloc de texte centré, chaque ligne sur son propre <text> (jamais de
     tspan à dy : l'export PDF de certains navigateurs les décale).
     `maxLignes` : au-delà, le texte RÉTRÉCIT au lieu de déborder — sans
     quoi une rédaction un peu longue sortait du cadre (constaté sur 11
     animations d'un coup, motifs duo, alerte et checklist). */
  function texteBloc(texte, x, y, max, opts = {}) {
    const base = opts.taille || 16;
    let taille = base;
    let ls = lignes(texte, max);
    if (opts.maxLignes) {
      while (ls.length > opts.maxLignes && taille > 10.5) {
        taille -= 0.75;
        ls = lignes(texte, Math.round(max * (base / taille)));
      }
    }
    const couleur = opts.couleur || C.gris;
    const poids = opts.poids || 400;
    const interligne = opts.interligne || taille * 1.28;
    const ancre = opts.ancre || "middle";
    return ls
      .map((l, i) => `<text x="${x}" y="${y + i * interligne}" text-anchor="${ancre}" font-size="${taille}" font-weight="${poids}" fill="${couleur}">${t(l)}</text>`)
      .join("");
  }

  /* La phrase de pied de page. Elle se pose depuis le BAS : sur deux ou
     trois lignes, une position fixe faisait sortir la dernière du cadre. */
  function pied(texte, max = 90, taille = 15, opts = {}) {
    if (!texte) return "";
    const n = lignes(texte, max).length;
    const interligne = taille * 1.28;
    return texteBloc(texte, L / 2, H - 16 - (n - 1) * interligne, max,
      { taille, poids: opts.poids || 700, couleur: opts.couleur || C.bleu });
  }

  /* Ramène l'abscisse d'un bloc centré à l'intérieur du cadre : les
     libellés des extrémités (premier et dernier jalon d'une frise)
     sortaient à gauche et à droite. */
  const dansLeCadre = (x, texte, max, taille) => {
    /* `max` = largeur de coupe en caractères. Sans coupe (un <text> d'une
       seule ligne, comme une date), la largeur réelle fait foi — sinon on
       la sous-estime et le libellé ressort du cadre. */
    const large = largeurApprox(texte, taille);
    const demi = (max ? Math.min(large, max * taille * 0.52) : large) / 2;
    return Math.max(demi + 8, Math.min(L - demi - 8, x));
  };

  const cadre = (contenu, style = "") =>
    `<svg viewBox="0 0 ${L} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" data-anime>` +
    `<style>
      text{font-family:"Trebuchet MS",Calibri,Arial,sans-serif}
      .apparait{opacity:0;animation:apparait .55s ease-out forwards}
      .glisse{opacity:0;animation:glisse .6s ease-out forwards}
      .pulse{animation:pulse 2.2s ease-in-out infinite}
      .file{stroke-dasharray:10 8;animation:file 1.4s linear infinite}
      .grandit{transform-origin:center bottom;animation:grandit .9s ease-out forwards}
      @keyframes apparait{to{opacity:1}}
      @keyframes glisse{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
      @keyframes file{to{stroke-dashoffset:-36}}
      @keyframes grandit{from{transform:scaleY(0)}to{transform:scaleY(1)}}
      ${style}
    </style>` +
    `<rect width="${L}" height="${H}" fill="${C.fond}" rx="10"/>` + contenu + `</svg>`;

  const titre = (texte) =>
    texte ? `<text x="${L / 2}" y="34" text-anchor="middle" font-size="21" font-weight="700" fill="${C.bleu}">${t(texte)}</text>` : "";

  /* ---------------------------------------------------------------- 1. ÉTAGES
     Des strates empilées, du général au particulier (Europe → France →
     l'entreprise). Chaque étage arrive après le précédent. */
  function etages(s) {
    const items = s.etages || [];
    const hautDispo = H - 80;
    const hEtage = Math.min(96, (hautDispo - (items.length - 1) * 14) / items.length);
    let y = 66;
    let out = titre(s.titre);
    items.forEach((e, i) => {
      const fond = i === 0 ? C.bleu : i === 1 ? C.bleu2 : C.orange;
      out += `<g class="glisse" style="animation-delay:${i * .45}s">
        <rect x="60" y="${y}" width="${L - 120}" height="${hEtage}" rx="12" fill="${fond}"/>
        <text x="86" y="${y + 30}" font-size="18" font-weight="700" fill="#fff">${t(e.niveau)}</text>
        <text x="86" y="${y + 56}" font-size="16" fill="#e7eef7">${t(e.texte)}</text>
        ${e.marque ? `<text x="${L - 86}" y="${y + 43}" text-anchor="end" font-size="15" font-weight="700" fill="${C.orangeClair}">${t(e.marque)}</text>` : ""}
      </g>`;
      if (i < items.length - 1) {
        out += `<path class="apparait" style="animation-delay:${i * .45 + .3}s" d="M ${L / 2} ${y + hEtage + 2} l 0 8" stroke="${C.gris}" stroke-width="3" marker-end="url(#fleche-bas)"/>`;
      }
      y += hEtage + 14;
    });
    out += `<defs><marker id="fleche-bas" markerWidth="9" markerHeight="9" refX="4.5" refY="8" orient="auto"><path d="M0,0 L9,0 L4.5,9 z" fill="${C.gris}"/></marker></defs>`;
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 2. DUO
     Deux notions qu'on confond, mises côte à côte. Chaque carte porte un
     pictogramme distinct : la couleur ne fait pas seule la différence. */
  function duo(s) {
    const [a, b] = s.cartes || [];
    const larg = 320, x1 = 42, x2 = L - larg - 42, yb = 72, haut = 300;
    const carte = (c, x, delai, teinte) => `
      <g class="glisse" style="animation-delay:${delai}s">
        <rect x="${x}" y="${yb}" width="${larg}" height="${haut}" rx="14" fill="${C.blanc}" stroke="${teinte}" stroke-width="3"/>
        <rect x="${x}" y="${yb}" width="${larg}" height="52" rx="14" fill="${teinte}"/>
        <rect x="${x}" y="${yb + 38}" width="${larg}" height="14" fill="${teinte}"/>
        <text x="${x + larg / 2}" y="${yb + 34}" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">${t(c.titre)}</text>
        <text x="${x + larg / 2}" y="${yb + 108}" text-anchor="middle" font-size="42">${t(c.picto || "")}</text>
        ${texteBloc(c.pour, x + larg / 2, yb + 148, 30, { taille: 17, poids: 700, couleur: C.bleu, maxLignes: 2 })}
        ${texteBloc(c.texte, x + larg / 2, yb + 196, 32, { taille: 15, couleur: C.gris, maxLignes: 6 })}
      </g>`;
    let out = titre(s.titre);
    out += carte(a || {}, x1, 0, C.bleu);
    out += carte(b || {}, x2, .4, C.orange);
    out += `<g class="apparait" style="animation-delay:.9s">
      <circle cx="${L / 2}" cy="${yb + haut / 2}" r="27" fill="${C.blanc}" stroke="${C.ligne}" stroke-width="2"/>
      <text x="${L / 2}" y="${yb + haut / 2 + 8}" text-anchor="middle" font-size="22" font-weight="700" fill="${C.gris}">${t(s.lien || "≠")}</text>
    </g>`;
    if (s.pied) out += pied(s.pied, 88);
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 3. SÉQUENCE
     Des étapes numérotées qui s'allument dans l'ordre : une procédure. */
  function sequence(s) {
    const items = s.etapes || [];
    const n = items.length || 1;
    const pas = (L - 120) / n;
    let out = titre(s.titre);
    const y = 190;
    out += `<line x1="60" y1="${y}" x2="${L - 60}" y2="${y}" stroke="${C.ligne}" stroke-width="4"/>`;
    items.forEach((e, i) => {
      const x = 60 + pas * (i + .5);
      const teinte = e.danger ? C.rouge : C.bleu;
      out += `<g class="glisse" style="animation-delay:${i * .5}s">
        <circle cx="${x}" cy="${y}" r="30" fill="${teinte}"/>
        <text x="${x}" y="${y + 9}" text-anchor="middle" font-size="24" font-weight="700" fill="#fff">${e.danger ? "!" : i + 1}</text>
        ${texteBloc(e.titre, x, y + 62, Math.max(14, Math.floor(pas / 8)), { taille: 16, poids: 700, couleur: C.bleu })}
        ${texteBloc(e.texte || "", x, y + 62 + 24 * lignes(e.titre, Math.max(14, Math.floor(pas / 8))).length, Math.max(16, Math.floor(pas / 7)), { taille: 14, couleur: C.gris })}
      </g>`;
      if (i < n - 1) {
        out += `<line class="file" x1="${x + 34}" y1="${y}" x2="${x + pas - 34}" y2="${y}" stroke="${C.orange}" stroke-width="4"/>`;
      }
    });
    if (s.pied) out += pied(s.pied, 90);
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 4. JAUGE
     Une échelle verticale avec des seuils nommés et un curseur qui monte.
     Sert aux pressions, aux concentrations, aux teneurs. */
  function jauge(s) {
    const seuils = (s.seuils || []).slice().sort((a, b) => a.part - b.part);
    const x = 190, larg = 92, bas = H - 60, haut = 76;
    const hDispo = bas - haut;
    let out = titre(s.titre);
    out += `<rect x="${x}" y="${haut}" width="${larg}" height="${hDispo}" rx="10" fill="${C.blanc}" stroke="${C.ligne}" stroke-width="2"/>`;
    const remplissage = Math.max(0, Math.min(1, s.niveau == null ? 1 : s.niveau));
    out += `<g class="grandit" style="transform-origin:${x + larg / 2}px ${bas}px">
      <rect x="${x + 3}" y="${bas - hDispo * remplissage}" width="${larg - 6}" height="${hDispo * remplissage}" rx="8" fill="${s.teinte === "danger" ? C.rouge : C.orange}" opacity=".85"/>
    </g>`;
    seuils.forEach((seuil, i) => {
      const y = bas - hDispo * Math.max(0, Math.min(1, seuil.part));
      out += `<g class="apparait" style="animation-delay:${.5 + i * .4}s">
        <line x1="${x - 14}" y1="${y}" x2="${x + larg + 18}" y2="${y}" stroke="${C.bleu}" stroke-width="2.5" stroke-dasharray="7 5"/>
        <circle cx="${x + larg + 18}" cy="${y}" r="5" fill="${C.bleu}"/>
        <text x="${x + larg + 32}" y="${y - 6}" font-size="17" font-weight="700" fill="${C.bleu}">${t(seuil.titre)}</text>
        ${texteBloc(seuil.texte || "", x + larg + 32, y + 15, 44, { taille: 14, couleur: C.gris, ancre: "start" })}
      </g>`;
    });
    if (s.bas) out += `<text x="${x + larg / 2}" y="${bas + 26}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}">${t(s.bas)}</text>`;
    if (s.hautLibelle) out += `<text x="${x + larg / 2}" y="${haut - 12}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}">${t(s.hautLibelle)}</text>`;
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 5. FRISE
     Une ligne du temps : les jalons se posent l'un après l'autre. Les
     libellés alternent au-dessus et en dessous pour ne jamais se toucher. */
  function frise(s) {
    const jalons = s.jalons || [];
    const n = jalons.length || 1;
    const y = H / 2 + 6;
    const pas = (L - 130) / Math.max(1, n - 1);
    let out = titre(s.titre);
    out += `<line x1="60" y1="${y}" x2="${L - 60}" y2="${y}" stroke="${C.bleu}" stroke-width="5"/>`;
    out += `<path d="M ${L - 62} ${y - 11} l 20 11 l -20 11 z" fill="${C.bleu}"/>`;
    jalons.forEach((j, i) => {
      const x = 65 + pas * i;
      const haut = i % 2 === 0;
      const yT = haut ? y - 40 : y + 44;
      /* Les jalons des deux bouts sortaient du cadre : on ramène leur
         libellé à l'intérieur, le repère reste sur la ligne du temps. */
      const xT = dansLeCadre(x, j.texte, 20, 14);
      out += `<g class="glisse" style="animation-delay:${i * .35}s">
        <circle cx="${x}" cy="${y}" r="11" fill="${j.fort ? C.orange : C.blanc}" stroke="${C.bleu}" stroke-width="4"/>
        <text x="${dansLeCadre(x, j.date, 0, 18)}" y="${yT}" text-anchor="middle" font-size="18" font-weight="700" fill="${C.bleu}">${t(j.date)}</text>
        ${texteBloc(j.texte, xT, haut ? yT - 46 : yT + 22, 20, { taille: 14, couleur: C.gris, maxLignes: 3 })}
      </g>`;
    });
    if (s.pied) out += pied(s.pied, 92);
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 6. ALERTE
     Trois vignettes : ce qui arrive · ce qu'on ressent · ce qu'on fait.
     Le pictogramme de danger pulse — c'est le seul motif où ça se justifie. */
  function alerte(s) {
    const v = s.vignettes || [];
    const larg = 226, y = 84, haut = 292;
    const teintes = [[C.rougeClair, C.rouge], [C.orangeClair, C.orange], [C.vertClair, C.vert]];
    let out = titre(s.titre);
    v.slice(0, 3).forEach((vi, i) => {
      const x = 42 + i * (larg + 24);
      const [fond, bord] = teintes[i] || teintes[2];
      out += `<g class="glisse" style="animation-delay:${i * .4}s">
        <rect x="${x}" y="${y}" width="${larg}" height="${haut}" rx="14" fill="${fond}" stroke="${bord}" stroke-width="2.5"/>
        <text x="${x + larg / 2}" y="${y + 68}" text-anchor="middle" font-size="46" ${i === 0 ? 'class="pulse"' : ""}>${t(vi.picto || "⚠")}</text>
        <text x="${x + larg / 2}" y="${y + 106}" text-anchor="middle" font-size="13" font-weight="700" fill="${bord}" letter-spacing="1.5">${t((vi.etiquette || "").toUpperCase())}</text>
        ${texteBloc(vi.titre, x + larg / 2, y + 138, 22, { taille: 17, poids: 700, couleur: C.bleu, maxLignes: 2 })}
        ${texteBloc(vi.texte, x + larg / 2, y + 138 + 24 * Math.min(2, lignes(vi.titre, 22).length), 26, { taille: 14.5, couleur: C.gris, maxLignes: 5 })}
      </g>`;
    });
    if (s.pied) out += pied(s.pied, 92);
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 7. FLUX
     Des boîtes reliées par des flèches qui défilent : le chemin d'une
     matière (fluide récupéré, machine en fin de vie, document). */
  function flux(s) {
    const b = s.boites || [];
    const n = b.length || 1;
    const larg = Math.min(190, (L - 80 - (n - 1) * 44) / n);
    const y = 150, haut = 118;
    let out = titre(s.titre);
    b.forEach((bo, i) => {
      const x = 44 + i * (larg + 44);
      const teinte = bo.teinte === "danger" ? C.rouge : bo.teinte === "ok" ? C.vert : C.bleu;
      out += `<g class="glisse" style="animation-delay:${i * .4}s">
        <rect x="${x}" y="${y}" width="${larg}" height="${haut}" rx="12" fill="${C.blanc}" stroke="${teinte}" stroke-width="3"/>
        <text x="${x + larg / 2}" y="${y + 46}" text-anchor="middle" font-size="30">${t(bo.picto || "")}</text>
        ${texteBloc(bo.titre, x + larg / 2, y + 76, 18, { taille: 16, poids: 700, couleur: teinte })}
      </g>
      ${texteBloc(bo.texte || "", x + larg / 2, y + haut + 32, 24, { taille: 14, couleur: C.gris })}`;
      if (i < n - 1) {
        const xf = x + larg + 6;
        out += `<line class="file" x1="${xf}" y1="${y + haut / 2}" x2="${xf + 32}" y2="${y + haut / 2}" stroke="${C.orange}" stroke-width="4"/>
          <path d="M ${xf + 32} ${y + haut / 2 - 8} l 12 8 l -12 8 z" fill="${C.orange}"/>`;
      }
    });
    if (s.pied) out += pied(s.pied, 92);
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 8. ZONE
     Coupe d'un local : le nuage de fluide descend et s'accumule au point
     bas. Sert au CO₂, aux hydrocarbures, aux locaux enterrés. */
  function zone(s) {
    const x = 60, y = 76, larg = 470, haut = 286;
    const sol = y + haut - 30;                    // la ligne de sol, dans le local
    const nappe = Math.max(20, Math.min(haut - 90, s.hauteurNappe || 78));
    let out = titre(s.titre);
    out += `<rect x="${x}" y="${y}" width="${larg}" height="${haut}" rx="8" fill="${C.blanc}" stroke="${C.bleu}" stroke-width="4"/>
      <line x1="${x}" y1="${sol}" x2="${x + larg}" y2="${sol}" stroke="${C.gris}" stroke-width="2" stroke-dasharray="6 6"/>
      <text x="${x + 14}" y="${sol + 20}" font-size="14" fill="${C.gris}">${t(s.solLibelle || "sol du local")}</text>`;
    /* La nappe monte depuis le sol : c'est l'accumulation, l'idée à retenir. */
    out += `<g class="grandit" style="transform-origin:${x}px ${sol}px;animation-delay:.4s">
      <rect x="${x + 4}" y="${sol - nappe}" width="${larg - 8}" height="${nappe}" fill="${C.orange}" opacity=".45"/>
    </g>`;
    /* Le libellé de la nappe se pose AU-DESSUS d'elle : sa hauteur varie, donc
       une position fixe finirait tôt ou tard sur un autre libellé (constaté). */
    out += texteBloc(s.nappeLibelle || "le fluide s'accumule ici", x + larg / 2, sol - nappe - 14, 38,
      { taille: 16, poids: 700, couleur: C.bleu });
    if (s.capteur) {
      out += `<g class="apparait" style="animation-delay:1s">
        <rect x="${x + 24}" y="${sol - 40}" width="44" height="32" rx="6" fill="${C.vert}"/>
        <text x="${x + 46}" y="${sol - 18}" text-anchor="middle" font-size="16" fill="#fff">◉</text>
      </g>
      ${texteBloc(s.capteur, x + 46, y + haut + 26, 26, { taille: 14, poids: 700, couleur: C.vert })}`;
    }
    if (s.personnage) {
      out += `<g class="apparait" style="animation-delay:.8s">
        <circle cx="${x + larg - 88}" cy="${sol - 96}" r="15" fill="${C.bleu}"/>
        <rect x="${x + larg - 101}" y="${sol - 78}" width="26" height="78" rx="9" fill="${C.bleu}"/>
      </g>
      ${texteBloc(s.personnage, x + larg - 88, y + haut + 26, 22, { taille: 14, poids: 700, couleur: C.bleu })}`;
    }
    /* Colonne de droite : les points à retenir, hors du dessin. */
    (s.points || []).forEach((p, i) => {
      const yp = y + 24 + i * 74;
      out += `<g class="glisse" style="animation-delay:${1.2 + i * .35}s">
        <rect x="${x + larg + 26}" y="${yp - 22}" width="${L - (x + larg + 26) - 42}" height="62" rx="10" fill="${C.blanc}" stroke="${C.ligne}" stroke-width="2"/>
        <text x="${x + larg + 42}" y="${yp}" font-size="16" font-weight="700" fill="${C.bleu}">${t(p.titre)}</text>
        ${texteBloc(p.texte || "", x + larg + 42, yp + 20, 24, { taille: 13.5, couleur: C.gris, ancre: "start" })}
      </g>`;
    });
    return cadre(out);
  }

  /* ---------------------------------------------------------------- 9. BALANCE
     Une pesée : la masse avant, la masse après, l'écart qu'on écrit. */
  function balance(s) {
    let out = titre(s.titre);
    const plateau = (x, etiquette, valeur, delai, teinte) => `
      <g class="glisse" style="animation-delay:${delai}s">
        <rect x="${x - 88}" y="140" width="176" height="118" rx="12" fill="${C.blanc}" stroke="${teinte}" stroke-width="3"/>
        <text x="${x}" y="182" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}" letter-spacing="1.2">${t(etiquette.toUpperCase())}</text>
        <text x="${x}" y="232" text-anchor="middle" font-size="34" font-weight="700" fill="${teinte}">${t(valeur)}</text>
        <rect x="${x - 62}" y="266" width="124" height="16" rx="5" fill="${C.ligne}"/>
        <rect x="${x - 42}" y="282" width="84" height="10" rx="4" fill="${C.gris}"/>
      </g>`;
    out += plateau(190, s.avant?.etiquette || "avant", s.avant?.valeur || "—", 0, C.bleu);
    out += plateau(L - 190, s.apres?.etiquette || "après", s.apres?.valeur || "—", .45, C.bleu2);
    out += `<g class="apparait" style="animation-delay:1s">
      <rect x="${L / 2 - 108}" y="330" width="216" height="76" rx="12" fill="${C.vertClair}" stroke="${C.vert}" stroke-width="3"/>
      <text x="${L / 2}" y="358" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}" letter-spacing="1.2">${t((s.ecart?.etiquette || "l'écart").toUpperCase())}</text>
      <text x="${L / 2}" y="391" text-anchor="middle" font-size="26" font-weight="700" fill="${C.bleu}">${t(s.ecart?.valeur || "—")}</text>
    </g>`;
    out += `<line class="file" x1="288" y1="199" x2="${L - 288}" y2="199" stroke="${C.orange}" stroke-width="4"/>
      <path d="M ${L - 288} 191 l 12 8 l -12 8 z" fill="${C.orange}"/>`;
    if (s.pied) out += texteBloc(s.pied, L / 2, 86, 90, { taille: 15.5, poids: 700, couleur: C.bleu });
    return cadre(out);
  }

  /* -------------------------------------------------------------- 10. CHECKLIST
     Des points qui se cochent un à un : un contrôle, une vérification. */
  function checklist(s) {
    const items = s.items || [];
    const n = Math.max(1, items.length);
    const XT = 116, XFIN = L - 70, DISPO = XFIN - XT;
    /* Titre et précision tiennent-ils sur la même ligne ? Sinon on empile —
       sans ce calcul, une précision un peu longue passait SUR le titre. */
    const empiles = items.map((it) =>
      it.texte ? largeurApprox(it.titre, 17) + largeurApprox(it.texte, 14.5) + 26 > DISPO : false);
    const empileUn = empiles.some(Boolean);
    const y0 = s.pied ? 74 : 66;
    const hL = Math.min(empileUn ? 72 : 56, ((s.pied ? H - 46 : H - 12) - y0) / n);
    let out = titre(s.titre);
    items.forEach((it, i) => {
      const y = y0 + i * hL;
      const hC = hL - 10;                       // hauteur de la carte de l'item
      const milieu = y + hC / 2;
      const refus = it.refus;
      const teinte = refus ? C.rouge : C.vert;
      const corps = empiles[i]
        ? `<text x="${XT}" y="${milieu - 6}" font-size="17" font-weight="700" fill="${C.bleu}">${t(it.titre)}</text>
           ${texteBloc(it.texte, XT, milieu + 15, Math.floor(DISPO / (13.5 * 0.52)), { taille: 13.5, couleur: C.gris, ancre: "start", maxLignes: 1 })}`
        : `<text x="${XT}" y="${milieu + 6}" font-size="17" font-weight="700" fill="${C.bleu}">${t(it.titre)}</text>
           ${it.texte ? `<text x="${XFIN}" y="${milieu + 6}" text-anchor="end" font-size="14.5" fill="${C.gris}">${t(it.texte)}</text>` : ""}`;
      out += `<g class="glisse" style="animation-delay:${i * .38}s">
        <rect x="56" y="${y}" width="${L - 112}" height="${hC}" rx="10" fill="${C.blanc}" stroke="${C.ligne}" stroke-width="2"/>
        <rect x="70" y="${milieu - 14}" width="28" height="28" rx="6" fill="${refus ? C.rougeClair : C.vertClair}" stroke="${teinte}" stroke-width="2.5"/>
        <text x="84" y="${milieu + 7}" text-anchor="middle" font-size="18" font-weight="700" fill="${teinte}">${refus ? "✗" : "✓"}</text>
        ${corps}
      </g>`;
    });
    if (s.pied) out += pied(s.pied, 92);
    return cadre(out);
  }

  /* -------------------------------------------------------------- 11. BARRES
     Comparer des grandeurs : les barres poussent depuis le bas. La valeur
     est écrite au-dessus — jamais dans la barre, où elle serait illisible
     une fois photocopiée. */
  function barres(s) {
    const items = s.valeurs || [];
    const n = items.length || 1;
    const max = Math.max(...items.map((v) => v.valeur || 0), 1);
    const bas = H - 74, hMax = bas - 108;
    const larg = Math.min(110, (L - 120) / n - 26);
    const pas = (L - 120) / n;
    let out = titre(s.titre);
    out += `<line x1="56" y1="${bas}" x2="${L - 56}" y2="${bas}" stroke="${C.gris}" stroke-width="3"/>`;
    items.forEach((v, i) => {
      const x = 60 + pas * (i + .5);
      const h = Math.max(6, (v.valeur / max) * hMax);
      const teinte = v.teinte === "ok" ? C.vert : v.teinte === "danger" ? C.rouge : C.bleu;
      out += `<g class="grandit" style="transform-origin:${x}px ${bas}px;animation-delay:${i * .3}s">
        <rect x="${x - larg / 2}" y="${bas - h}" width="${larg}" height="${h}" rx="6" fill="${teinte}"/>
      </g>
      <text class="apparait" style="animation-delay:${i * .3 + .5}s" x="${x}" y="${bas - h - 12}" text-anchor="middle" font-size="19" font-weight="700" fill="${teinte}">${t(v.affiche != null ? v.affiche : v.valeur)}</text>
      ${texteBloc(v.titre, x, bas + 24, Math.max(12, Math.floor(pas / 8)), { taille: 15, poids: 700, couleur: C.bleu })}`;
    });
    if (s.legende) out += pied(s.legende, 96, 14, { poids: 400, couleur: C.gris });
    return cadre(out);
  }

  /* -------------------------------------------------------------- 12. CYCLE
     La croix du frigoriste — convention absolue : détendeur GAUCHE,
     compresseur DROITE, condenseur HAUT, évaporateur BAS. Un point
     parcourt la boucle. Les organes mis en avant se colorent. */
  function cycle(s) {
    const cx = 330, cy = 250, r = 128;
    const org = [
      { id: "condenseur", x: cx, y: cy - r, l: "CONDENSEUR", sous: "la chaleur sort" },
      { id: "compresseur", x: cx + r, y: cy, l: "COMPRESSEUR", sous: "il pousse" },
      { id: "evaporateur", x: cx, y: cy + r, l: "ÉVAPORATEUR", sous: "le froid se fait" },
      { id: "detendeur", x: cx - r, y: cy, l: "DÉTENDEUR", sous: "la pression chute" },
    ];
    const vus = s.surligne || [];
    let out = titre(s.titre);
    out += `<rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="none" stroke="${C.ligne}" stroke-width="3"/>`;
    out += `<circle class="pulse" cx="${cx}" cy="${cy - r}" r="9" fill="${C.orange}">
      <animateMotion dur="6s" repeatCount="indefinite" path="M 0 0 L ${r} ${r} L 0 ${2 * r} L ${-r} ${r} Z"/></circle>`;
    org.forEach((o, i) => {
      const actif = vus.includes(o.id);
      const teinte = actif ? C.orange : C.bleu;
      const dehors = o.y === cy ? (o.x < cx ? -1 : 1) : 0;
      const tx = o.x + dehors * 8;
      const ancre = dehors === -1 ? "end" : dehors === 1 ? "start" : "middle";
      out += `<g class="glisse" style="animation-delay:${i * .3}s">
        <rect x="${o.x - 34}" y="${o.y - 26}" width="68" height="52" rx="10" fill="${C.blanc}" stroke="${teinte}" stroke-width="${actif ? 4 : 2.5}"/>
        <text x="${o.x}" y="${o.y + 8}" text-anchor="middle" font-size="24">${t(actif ? "★" : "▪")}</text>
        <text x="${tx + (dehors === 0 ? 0 : dehors * 40)}" y="${o.y === cy - r ? o.y - 40 : o.y === cy + r ? o.y + 52 : o.y - 4}" text-anchor="${ancre}" font-size="15" font-weight="700" fill="${teinte}">${t(o.l)}</text>
        <text x="${tx + (dehors === 0 ? 0 : dehors * 40)}" y="${o.y === cy - r ? o.y - 20 : o.y === cy + r ? o.y + 72 : o.y + 16}" text-anchor="${ancre}" font-size="13.5" fill="${C.gris}">${t(o.sous)}</text>
      </g>`;
    });
    (s.points || []).forEach((p, i) => {
      const yp = 106 + i * 84;
      out += `<g class="glisse" style="animation-delay:${1 + i * .35}s">
        <rect x="546" y="${yp - 26}" width="${L - 546 - 40}" height="70" rx="10" fill="${C.blanc}" stroke="${C.ligne}" stroke-width="2"/>
        <text x="562" y="${yp - 2}" font-size="16" font-weight="700" fill="${C.bleu}">${t(p.titre)}</text>
        ${texteBloc(p.texte || "", 562, yp + 20, 24, { taille: 13.5, couleur: C.gris, ancre: "start" })}
      </g>`;
    });
    return cadre(out);
  }

  const motifs = { etages, duo, sequence, jauge, frise, alerte, flux, zone, balance, checklist, barres, cycle };

  return {
    rendre(spec) {
      if (!spec) return "";
      const f = motifs[spec.motif];
      if (!f) return cadre(texteBloc("Motif inconnu : " + spec.motif, L / 2, H / 2, 40, { taille: 18, couleur: C.rouge }));
      return f(spec);
    },
    motifs: Object.keys(motifs),
  };
})();

if (typeof window !== "undefined") window.ANIM = ANIM;
