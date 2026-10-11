/* CuivRézo — figures des pièces complexes : chapeau de gendarme et baïonnette.
   CONTRAT : enregistre « chapeau » (mesure · tableau · repere-x · traits · plan · central · controle · desaxe ·
   decale) et « baionnette » (plan · premier · deplacer · parallele · tordue).
   Station 4-1, refonte du 11/10/2026 : « mesure » (le dépassement d, vue de face, À L'ÉCHELLE : 10 px par mm),
   « tableau » (le tableau du chapeau, CALCULÉ ici et jamais tapé : fibre neutre, tube 1/4″, cintreuse 1/4″ de
   rayon 9/16″ = 14,3 mm, chapeau 45°-90°-45°, jeu 10 mm ; mêmes nombres que le tableur de l'atelier [TAB]),
   « repere-x » (le trait X à l'aplomb du milieu de l'obstacle), « traits » (collet, A, X, M, B et leurs cotes),
   « decale » (M tracé sur X). L'exemple suivi est la planche du TP : dessus du multicouche à 30, dessus du tube à
   23, d = 7 → H 25, X → M 9, MA 40. Le COLLET est toujours à gauche : A du côté du collet, M du côté opposé.
   Les formes sont TRACÉES comme un tube réel : des droites et des coudes de rayon donné, enchaînés
   (petit traceur, en coordonnées mathématiques puis retournées pour l'écran). Pas à l'échelle, sauf « mesure ». */

(() => {
  'use strict';
  const RAD = Math.PI / 180;
  /* trace(x, y, cap, [ ['L', longueur] | ['A', angle en degrés (+ gauche), rayon] ]) → chemin SVG */
  function trace(x0, y0, cap, segs) {
    let x = x0, y = 0, h = cap * RAD;
    const sy = v => y0 - v;
    let d = `M${x.toFixed(1)} ${sy(y).toFixed(1)}`;
    for (const s of segs) {
      if (s[0] === 'L') { x += s[1] * Math.cos(h); y += s[1] * Math.sin(h); d += ` L${x.toFixed(1)} ${sy(y).toFixed(1)}`; }
      else {
        const t = s[1] * RAD, r = s[2];
        let cx, cy, ex, ey;
        if (t > 0) { cx = x - r * Math.sin(h); cy = y + r * Math.cos(h); ex = cx + r * Math.sin(h + t); ey = cy - r * Math.cos(h + t); }
        else { cx = x + r * Math.sin(h); cy = y - r * Math.cos(h); ex = cx - r * Math.sin(h + t); ey = cy + r * Math.cos(h + t); }
        d += ` A${r} ${r} 0 0 ${t > 0 ? 0 : 1} ${ex.toFixed(1)} ${sy(ey).toFixed(1)}`;
        x = ex; y = ey; h += t;
      }
    }
    return d;
  }
  /* tube(chemin, couleur, épaisseur) : 22 par défaut, plus gros pour les vues de près */
  const tube = (d, couleur, e) => `<path d="${d}" fill="none" stroke="#6e3a14" stroke-width="${e || 22}" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${couleur || '#c77a3a'}" stroke-width="${(e || 22) - 5}" stroke-linejoin="round"/>`;
  /* un trait fait sur le tube et sa lettre, dessous (défaut) ou dessus ; gris pointillé = un trait de repère déjà fait */
  const marque = (x, y, t, o) => {
    o = o || {};
    const c = o.gris ? '#56657a' : '#10233c', demi = o.demi || 20;
    return `<line x1="${x}" y1="${y - demi}" x2="${x}" y2="${y + demi}" stroke="${c}" stroke-width="4"${o.gris ? ' stroke-dasharray="7 5"' : ''}/>
    <text x="${x}" y="${o.dessus ? y - demi - 10 : y + demi + 26}" text-anchor="middle" class="cz-txt" style="font-size:28px${o.gris ? ';fill:#56657a' : ''}">${t}</text>`;
  };

  /* le collet, toujours à gauche : l'évasement du tube, puis l'écrou laiton (même dessin que figures-dudgeon.js).
     x = bout évasé, y = axe du tube, e = épaisseur du tube ; le tube sort de l'écrou en x + 72 */
  const ecrou = (x, y, l, h) => `<path d="M${x + 8} ${y - h / 2} h${l - 16} l8 10 v${h - 20} l-8 10 h${16 - l} l-8 -10 v${20 - h} z" fill="#d7b24a" stroke="#7a5c00" stroke-width="2.5"/>
    <line x1="${x + 8}" y1="${y - h / 2}" x2="${x + 8}" y2="${y + h / 2}" stroke="#7a5c00" stroke-width="1.5"/>
    <line x1="${x + l - 8}" y1="${y - h / 2}" x2="${x + l - 8}" y2="${y + h / 2}" stroke="#7a5c00" stroke-width="1.5"/>`;
  const collet = (x, y, e) => `<path d="M${x + 20} ${y - e / 2} L${x} ${y - e / 2 - 12} V${y + e / 2 + 12} L${x + 20} ${y + e / 2} z" fill="#c77a3a" stroke="#6e3a14" stroke-width="3" stroke-linejoin="round"/>
    ${ecrou(x + 20, y, 52, e + 28)}`;
  /* le multicouche vu en coupe (gaine blanche, couche d'aluminium, passage) ; r = rayon extérieur */
  const multicouche = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="#56657a" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.75}" fill="#fbf6ee" stroke="#9aa6b2" stroke-width="3"/>`;
  /* la bande de planche vue de face, dessus à y */
  const planche = y => `<rect x="30" y="${y}" width="740" height="44" rx="4" fill="#e4d2b0" stroke="#8a6d3b" stroke-width="2.5"/>
    <line x1="60" y1="${y + 15}" x2="300" y2="${y + 15}" stroke="#c9b48a" stroke-width="2"/><line x1="380" y1="${y + 30}" x2="700" y2="${y + 30}" stroke="#c9b48a" stroke-width="2"/>`;

  /* LE TABLEAU DU CHAPEAU : calculé, jamais tapé (fibre neutre).
     R = 9/16″ = 14,2875 mm ; chapeau 45°-90°-45° ; jeu de 10 mm au-dessus de l'obstacle ; tube de 6,35.
     Hp = H + R(√2 − 1) : hauteur du sommet « pointu » ; rampe = Hp·√2 − R·tan 22,5° − R : la partie droite de la montée ;
     MA = R·π/4 + rampe + R·π/8 : de M au milieu du coude de côté ; X → M = (tube utilisé − largeur occupée) / 2.
     Tout est arrondi au mm. Ligne d'un tableau : d de dMin à dMax, avec dMax = partie entière de (H − jeu − Ø). */
  const RC = 9 / 16 * 25.4, JEU = 10, DIAM = 6.35, T22 = Math.tan(22.5 * RAD);
  const ligneChapeau = H => {
    const hp = H + RC * (Math.SQRT2 - 1);
    const rampe = hp * Math.SQRT2 - RC * T22 - RC;
    const dev = 2 * (RC * Math.PI / 4) + RC * Math.PI / 2 + 2 * rampe;
    const emprise = 2 * (hp + RC * T22);
    const xm = (dev - emprise) / 2, ma = RC * Math.PI / 4 + rampe + RC * Math.PI / 8;
    /* méthode « trait au 0 » (11/10 soir) : le DÉBUT de chaque coude, côté collet, mesuré depuis X (négatif = côté collet) */
    return { H, XM: Math.round(xm), MA: Math.round(ma), S: Math.round(xm - RC * Math.PI / 4), A: Math.round(xm - ma - RC * Math.PI / 8), B: Math.round(xm + ma - RC * Math.PI / 8) };
  };
  const tableauChapeau = () => {
    let avant = -1;
    return [20, 25, 30, 35, 40, 45, 50].map(H => {
      const dMax = Math.floor(H - JEU - DIAM), ligne = { ...ligneChapeau(H), dMin: avant + 1, dMax };
      avant = dMax;
      return ligne;
    });
  };
  /* la planche du TP « franchir un multicouche » : dessus du multicouche à 30, dessus du tube 1/4″ à 23 (mm) */
  const OBS = 30, TUB = 23;
  const exemple = () => { const dep = OBS - TUB; return tableauChapeau().find(l => dep >= l.dMin && dep <= l.dMax); };

  /* le chapeau : droit, demi-coude, montée, coude central, descente, demi-coude, droit */
  const R = 34, a = 45, M = 70, D = 260;                       /* rayon, demi-angle, montée, droits */
  const DEMI = 2 * R * Math.sin(a * RAD) + M * Math.cos(a * RAD);  /* demi-largeur de la bosse */
  const HAUT = 2 * R * (1 - Math.cos(a * RAD)) + M * Math.sin(a * RAD); /* hauteur H, d'axe à axe */
  const X0 = 400 - DEMI - D;                                   /* bosse centrée sur x = 400 */
  const chapeau = (x, y, ecart) => trace(x, y, 0, [['L', D], ['A', a, R], ['L', M], ['A', -2 * a, R], ['L', M], ['A', a + (ecart || 0), R], ['L', D]]);

  CuivFigures.ajouter('chapeau', (etat, { cadre, etiquette, verdict }) => {
    const y = 360;
    if (etat === 'mesure') {
      /* vue de face, À L'ÉCHELLE : 10 px par mm, donc le multicouche Ø 16 fait 160 px et le tube 1/4″ 63,5 px */
      const k = 10, yP = 440, dep = OBS - TUB, yO = yP - OBS * k, yT = yP - TUB * k;
      const rO = 8 * k, xO = 600, cO = yO + rO;                /* multicouche : rayon 8 mm, dessus à 30 */
      const rT = DIAM / 2 * k, xT = 230, cT = yT + rT;         /* tube : Ø 6,35, dessus à 23 */
      const collier = (cx, cy, r, l) => `<rect x="${cx - l / 2}" y="${cy + r}" width="${l}" height="${yP - cy - r}" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2.5"/>
        <path d="M${cx - r - 6} ${cy} A${r + 6} ${r + 6} 0 0 0 ${cx + r + 6} ${cy}" fill="none" stroke="#4d5763" stroke-width="9"/>
        <path d="M${cx - r - 6} ${cy} A${r + 6} ${r + 6} 0 0 0 ${cx + r + 6} ${cy}" fill="none" stroke="#9aa6b2" stroke-width="5"/>`;
      let regle = `<rect x="56" y="${yP - 340}" width="72" height="340" fill="#f2c230" stroke="#8a6d00" stroke-width="2"/>`;
      for (let m = 0; m <= 34; m++) {
        const ym = yP - m * k, l = m % 10 === 0 ? 30 : m % 5 === 0 ? 20 : 12;
        regle += `<line x1="${128 - l}" y1="${ym}" x2="128" y2="${ym}" stroke="#2b2100" stroke-width="2"/>`;
        if (m % 10 === 0 && m > 0) regle += `<text x="62" y="${ym + 7}" style="font:800 22px Calibri,Arial;fill:#2b2100">${m}</text>`;
      }
      return cadre(`${planche(yP)}
        <line x1="132" y1="${yO}" x2="710" y2="${yO}" stroke="#1b3a63" stroke-width="2" stroke-dasharray="10 6"/>
        <line x1="132" y1="${yT}" x2="500" y2="${yT}" stroke="#1b3a63" stroke-width="2" stroke-dasharray="10 6"/>
        ${collier(xO, cO, rO, 60)}${multicouche(xO, cO, rO)}
        ${collier(xT, cT, rT, 34)}
        <circle cx="${xT}" cy="${cT}" r="${rT}" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="3"/>
        <circle cx="${xT}" cy="${cT}" r="${rT * 0.74}" fill="#fbf6ee" stroke="#6e3a14" stroke-width="2"/>
        ${regle}
        <text x="92" y="90" text-anchor="middle" class="cz-txt">réglet</text>
        <text x="140" y="${yO - 10}" class="cz-txt">dessus de l’obstacle : ${OBS}</text>
        <text x="140" y="${yT - 10}" class="cz-txt">dessus du tube : ${TUB}</text>
        <line x1="440" y1="${yO}" x2="440" y2="${yT}" class="cz-cote"/>
        <text x="454" y="${(yO + yT) / 2 + 9}" class="cz-txt" style="font-size:28px;fill:#c9451a">d = ${dep}</text>
        <text x="400" y="44" text-anchor="middle" class="cz-txt">Mesurer le dépassement d</text>
        <text x="400" y="76" text-anchor="middle" class="cz-pt">Planche de l’atelier : ${OBS} − ${TUB} = ${dep} mm</text>`, 'Mesurer le dépassement d');
    }
    if (etat === 'tableau') {
      const lignes = tableauChapeau(), ex = exemple();
      const x0 = 50, L = [130, 90, 240, 240], xs = L.map((_, i) => x0 + L.slice(0, i).reduce((a, b) => a + b, 0)), W = 700;
      const y0 = 58, hE = 48, hL = 44, cx = i => xs[i] + L[i] / 2, bas = y0 + hE + lignes.length * hL;
      const cotes = l => { const c = [], a = []; c.push('A ' + -l.A); if (l.S < 0) c.push('S ' + -l.S); else if (l.S === 0) c.push('S sur X'); else a.push('S ' + l.S); a.push('B ' + l.B); return [c.join(' · '), a.join(' · ')]; };
      const police = (p, c) => `font:${p} 28px Calibri,'Segoe UI',Arial,sans-serif;fill:${c}`;
      let g = `<rect x="${x0}" y="${y0}" width="${W}" height="${hE}" fill="#1b3a63"/>`;
      ['d (mm)', 'H', 'côté collet', 'autre côté'].forEach((c, i) => { g += `<text x="${cx(i)}" y="${y0 + 33}" text-anchor="middle" style="${police(800, '#ffffff')}">${c}</text>`; });
      lignes.forEach((l, r) => {
        const ty = y0 + hE + r * hL, sel = l.H === ex.H;
        g += `<rect x="${x0}" y="${ty}" width="${W}" height="${hL}" fill="${sel ? '#ffd9a0' : r % 2 ? '#f6efe2' : '#fffdf8'}"/>`;
        [`${l.dMin} à ${l.dMax}`, l.H, ...cotes(l)].forEach((v, i) => { g += `<text x="${cx(i)}" y="${ty + 31}" text-anchor="middle" style="${police(sel ? 800 : 700, '#10233c')}">${v}</text>`; });
        if (r) g += `<line x1="${x0}" y1="${ty}" x2="${x0 + W}" y2="${ty}" stroke="#d9cfbd" stroke-width="1.5"/>`;
        if (sel) g += `<rect x="${x0}" y="${ty}" width="${W}" height="${hL}" fill="none" stroke="#c9451a" stroke-width="4"/>`;
      });
      for (let i = 1; i < 4; i++) g += `<line x1="${xs[i]}" y1="${y0 + hE}" x2="${xs[i]}" y2="${bas}" stroke="#d9cfbd" stroke-width="1.5"/>`;
      g += `<rect x="${x0}" y="${y0}" width="${W}" height="${bas - y0}" fill="none" stroke="#1b3a63" stroke-width="2.5"/>`;
      return cadre(`<text x="400" y="38" text-anchor="middle" style="font:800 24px Calibri,'Segoe UI',Arial,sans-serif;fill:#10233c">Tube 1/4″ · cintreuse 1/4″ (rayon 9/16″ = ${RC.toFixed(1).replace('.', ',')} mm)</text>
        ${g}
        <text x="400" y="${bas + 32}" text-anchor="middle" class="cz-pt">Ligne surlignée : la planche de l’atelier, d = ${OBS - TUB}</text>
        <text x="400" y="${bas + 60}" text-anchor="middle" class="cz-pt">En mm. Les traits se mesurent depuis X : chacun est le début d’un coude.</text>`, 'Le tableau du chapeau');
    }
    if (etat === 'repere-x') {
      /* vue de côté : l'obstacle sur la planche, le tube droit posé dessus, le collet vissé à gauche */
      /* méthode du 11/10 soir : X se MESURE (plus de tube posé ni d'œil au-dessus). En bas la planche : le raccord où
         le collet se visse, l'obstacle, la cote du bout du cône à l'axe ; en haut le tube : la même cote depuis le bout évasé */
      const yP = 436, r = 48, xO = 560, cO = yP - r - 10, yR = 350, xR = 150, yTb = 146, yC1 = 288, yC2 = 104;
      const cote = (x1, x2, yc) => `<line x1="${x1}" y1="${yc}" x2="${x2}" y2="${yc}" class="cz-cote"/>`;
      const temoin = (x, y1, y2) => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#1b3a63" stroke-width="1.5" stroke-dasharray="7 5"/>`;
      return cadre(`${planche(yP)}
        <rect x="${xR - 90}" y="${yR - 30}" width="72" height="60" rx="6" fill="#d7b24a" stroke="#7a5c00" stroke-width="2.5"/>
        <path d="M${xR - 18} ${yR - 16} L${xR} ${yR - 7} V${yR + 7} L${xR - 18} ${yR + 16} Z" fill="#d7b24a" stroke="#7a5c00" stroke-width="2.5"/>
        <rect x="${xR - 70}" y="${yR + 30}" width="32" height="${yP - yR - 30}" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <rect x="${xO - 16}" y="${cO + r - 2}" width="32" height="${yP - cO - r + 2}" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2.5"/>
        <path d="M${xO - r - 6} ${cO} A${r + 6} ${r + 6} 0 0 0 ${xO + r + 6} ${cO}" fill="none" stroke="#4d5763" stroke-width="9"/>
        ${multicouche(xO, cO, r)}
        ${temoin(xR, yR - 10, yC1 - 8)}${temoin(xO, cO, yC1 - 8)}${cote(xR, xO, yC1)}
        <text x="${(xR + xO) / 2}" y="${yC1 - 14}" text-anchor="middle" class="cz-pt">du bout du cône à l’axe de l’obstacle</text>
        ${tube(`M${xR + 50} ${yTb} H770`)}${collet(xR, yTb, 22)}
        ${marque(xO, yTb, 'X', { dessus: false })}
        ${temoin(xR, yTb - 24, yC2 - 8)}${temoin(xO, yTb - 24, yC2 - 8)}${cote(xR, xO, yC2)}
        <text x="${(xR + xO) / 2}" y="${yC2 - 14}" text-anchor="middle" class="cz-pt">la même cote, depuis le bout évasé</text>
        ${etiquette(xR - 54, yR, 60, yR - 96, 'raccord', 'cz-txt', 'start')}
        <text x="400" y="44" text-anchor="middle" class="cz-txt">X : la cote du raccord à l’axe de l’obstacle</text>`, 'Mesurer et tracer X');
    }
    if (etat === 'traits') {
      /* pas à l'échelle : la lisibilité d'abord. Le collet est à gauche ; A du côté du collet, M du côté opposé à X */
      const ex = exemple(), yT = 250, xc = 36, xA = 170, xS = 400, xX = 470, xB = 720, l1 = yT + 64, l2 = yT + 124;
      const temoin = (x, bas) => `<line x1="${x}" y1="${yT + 23}" x2="${x}" y2="${bas}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>`;
      const cote = (x1, x2, yc, texte) => `<line x1="${x1}" y1="${yc}" x2="${x2}" y2="${yc}" class="cz-cote"/>
        <text x="${(x1 + x2) / 2}" y="${yc + 30}" text-anchor="middle" class="cz-txt">${texte}</text>`;
      return cadre(`${tube(`M${xc + 50} ${yT} H776`)}${collet(xc, yT, 22)}
        ${marque(xA, yT, 'A', { dessus: true })}${marque(xS, yT, 'S', { dessus: true })}${marque(xX, yT, 'X', { dessus: true, gris: true })}${marque(xB, yT, 'B', { dessus: true })}
        ${temoin(xX, l2)}${temoin(xS, l1)}${temoin(xA, l2)}${temoin(xB, l2)}
        ${cote(xS, xX, l1, `${-ex.S}`)}${cote(xA, xX, l2, `${-ex.A}`)}${cote(xX, xB, l2, `${ex.B}`)}
        ${etiquette(xc + 46, yT - 25, xc + 24, 150, 'collet', 'cz-txt', 'start')}
        <text x="400" y="44" text-anchor="middle" class="cz-txt">Zéro sur X : A et S côté collet, B de l’autre côté</text>
        <text x="400" y="76" text-anchor="middle" class="cz-pt">en mm ; chaque trait est le début d’un coude</text>`, 'Tracer A, S et B depuis X');
    }
    if (etat === 'central') {
      /* seul le coude central est fait : deux bras droits de part et d'autre */
      const d = trace(170, 420, a, [['L', 190], ['A', -2 * a, R], ['L', 190]]);
      return cadre(`${tube(d)}
        <text x="400" y="110" text-anchor="middle" class="cz-txt">D’abord le coude central, l’axe au milieu</text>
        <text x="400" y="142" text-anchor="middle" class="cz-pt">puis les deux coudes de moitié, en A et en B</text>
        ${etiquette(400, 230, 560, 230, 'Coude central')}`, 'Le coude central');
    }
    if (etat === 'desaxe') return cadre(`<circle cx="400" cy="${y - 22}" r="30" fill="#9aa6b2" stroke="#4d5763" stroke-width="2"/>${tube(chapeau(X0, y, 8))}
      <line x1="30" y1="${y + 26}" x2="770" y2="${y + 26}" stroke="#1b3a63" stroke-width="3" stroke-dasharray="10 6"/>
      ${verdict(false, 'Les deux branches ne sont plus alignées', 400, 460)}`, 'Chapeau désaxé');
    const obstacle = `<circle cx="400" cy="${y - 22}" r="30" fill="#9aa6b2" stroke="#4d5763" stroke-width="2"/>`;
    const d = chapeau(X0, y);
    if (etat === 'decale') {
      /* M tracé sur X : le sommet arrive trop tôt, du côté du collet, et l'obstacle n'est plus sous lui */
      const xs = 400 - 56, x0 = 120;
      const dc = trace(x0 - 30, y, 0, [['L', xs - DEMI - x0 + 30], ['A', a, R], ['L', M], ['A', -2 * a, R], ['L', M], ['A', a, R], ['L', 730 - xs - DEMI]]);
      return cadre(`${obstacle}${tube(dc)}${collet(x0 - 72, y, 22)}
        <line x1="400" y1="${y + 40}" x2="400" y2="170" stroke="#56657a" stroke-width="1.5" stroke-dasharray="8 6"/>
        <line x1="${xs}" y1="${y + 40}" x2="${xs}" y2="170" stroke="#b3261e" stroke-width="2" stroke-dasharray="8 6"/>
        ${etiquette(xs, y - HAUT - 11, xs - 70, 190, 'Le sommet')}
        ${etiquette(400, y - 22, 570, 420, 'L’obstacle', 'cz-txt', 'start')}
        ${etiquette(x0 - 40, y - 25, x0 - 70, 280, 'collet', 'cz-txt', 'start')}
        ${verdict(false, 'Un trait mal reporté : le sommet n’est plus au-dessus', 400, 470)}`, 'Chapeau décalé');
    }
    if (etat === 'controle') return cadre(`${obstacle}${tube(d)}
      <rect x="40" y="${y + 14}" width="720" height="14" rx="3" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      ${etiquette(700, y + 21, 640, 440, 'La règle touche les deux branches')}
      ${verdict(true, 'Branches alignées, côtés égaux, pièce plane', 400, 150)}`, 'Contrôler le chapeau');
    /* plan */
    return cadre(`${obstacle}${tube(d)}
      <line x1="400" y1="${y - HAUT}" x2="580" y2="${y - HAUT}" stroke="#56657a" stroke-width="1.5" stroke-dasharray="8 6"/>
      <line x1="560" y1="${y}" x2="560" y2="${y - HAUT}" class="cz-cote"/>
      <text x="572" y="${y - HAUT / 2 + 8}" class="cz-txt">H</text>
      <line x1="400" y1="${y + 40}" x2="400" y2="160" stroke="#56657a" stroke-width="1.5" stroke-dasharray="8 6"/>
      ${etiquette(400, y - 22, 150, 440, 'L’obstacle à franchir', 'cz-txt', 'start')}
      <text x="400" y="100" text-anchor="middle" class="cz-txt">Un coude central, deux coudes de moitié, symétriques</text>`, 'Le chapeau de gendarme');
  });

  /* la baïonnette : droit, coude à 45°, oblique, coude à -45°, droit */
  const DEC = 150 * Math.sin(45 * RAD) + 2 * 34 * (1 - Math.cos(45 * RAD));  /* décalage d'axe à axe */
  const baio = (x, y, fin) => trace(x, y, 0, [['L', 200], ['A', 45, 34], ['L', 150], ...(fin === 'premier' ? [] : [['A', -45 + (fin === 'tordue' ? -10 : 0), 34], ['L', 230]])]);
  CuivFigures.ajouter('baionnette', (etat, { cadre, etiquette, verdict }) => {
    const y = 380;
    if (etat === 'premier') return cadre(`${tube(baio(60, y, 'premier'))}
      <text x="400" y="110" text-anchor="middle" class="cz-txt">Premier coude à 45°</text>
      <text x="400" y="142" text-anchor="middle" class="cz-pt">puis on retourne le tube pour le second, en sens inverse</text>`, 'Le premier coude');
    if (etat === 'deplacer') return cadre(`${tube(baio(60, y, 'premier'))}
      <rect x="40" y="${y + 16}" width="360" height="12" rx="3" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <line x1="520" y1="${y}" x2="520" y2="${y - DEC}" class="cz-cote"/><text x="532" y="${y - 60}" class="cz-txt">le décalage voulu</text>
      <text x="400" y="110" text-anchor="middle" class="cz-txt">Faire coulisser jusqu’au décalage, règle parallèle au tube</text>`, 'Régler le décalage');
    if (etat === 'tordue') return cadre(`${tube(baio(40, y, 'tordue'))}
      ${verdict(false, 'Les deux branches ne sont pas parallèles', 400, 460)}`, 'Baïonnette ratée');
    const d = baio(40, y);
    if (etat === 'parallele') return cadre(`${tube(d)}
      <line x1="30" y1="${y}" x2="770" y2="${y}" stroke="#1e7e54" stroke-width="2" stroke-dasharray="10 6"/>
      <line x1="30" y1="${y - DEC}" x2="770" y2="${y - DEC}" stroke="#1e7e54" stroke-width="2" stroke-dasharray="10 6"/>
      ${verdict(true, 'Branches parallèles, décalage à la cote, pièce plane', 400, 460)}`, 'Contrôler la baïonnette');
    return cadre(`${tube(d)}
      <line x1="620" y1="${y}" x2="620" y2="${y - DEC}" class="cz-cote"/><text x="632" y="${y - 66}" class="cz-txt">décalage</text>
      <text x="400" y="100" text-anchor="middle" class="cz-txt">Deux coudes égaux, en sens opposés</text>
      <text x="400" y="132" text-anchor="middle" class="cz-pt">les deux branches restent parallèles</text>`, 'La baïonnette');
  });
})();
