/* CartoClim 2.3 — scènes des compresseurs rotatif et scroll.
   Temps 2 : deux vues du dessus, en coupe, chacune en pas à pas.
     · le scroll en cinq pas : une poche s'ouvre au pourtour, se ferme, glisse vers le centre en
       rétrécissant, puis s'ouvre sur le refoulement. Les spirales sont de vraies développantes de
       cercle : les poches dessinées sont celles qui existent, pas une image approximative.
     · le rotatif en quatre pas : le rouleau, la palette, l'aspiration derrière, la compression devant.
   Temps 5 : le récapitulatif des deux compresseurs côte à côte.
   Règles de maison : aucun texte sur un tracé (vérifié par outils/controler-station-navigateur.mjs),
   la pièce qui agit s'allume, basse pression en bleu et haute pression en rouge (SceneKit.C).
   Tout est dessiné en coordonnées absolues (pas de transform) pour que le contrôleur mesure juste. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const PI = Math.PI;
  const f1 = n => String(Math.round(n * 10) / 10);
  const pts = a => a.map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L');
  const hex = x => [1, 3, 5].map(i => parseInt(x.slice(i, i + 2), 16));
  const melange = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  const borne = (x, a, b) => Math.min(b, Math.max(a, x));
  const GAZ_BP = '#dbe7f6';                      /* le gaz froid, basse pression : un bleu très pâle */
  const GAZ_ENTRE = melange(GAZ_BP, '#3d7fca', .35);   /* le gaz froid qui vient d'entrer dans le rotatif */

  /* ================================================================== le scroll
     Deux spirales identiques (développantes d'un cercle de rayon a). La mobile est la fixe tournée
     d'un demi-tour et décalée de rho : son centre décrit un cercle de rayon rho, sans que la spirale
     tourne sur elle-même. Les points de contact entre les deux parois tombent à des paramètres
     connus (theta - pi/2 pour une face, theta + pi/2 pour l'autre, tous les 2 pi) : de proche en
     proche, ils bornent les poches fermées. */
  const SC = { a: 9, ep: 7, t0: 2.0, t1: 17.5 };
  SC.delta = SC.ep / (2 * SC.a);                 /* décalage des deux faces d'une paroi */
  SC.rho = PI * SC.a - SC.ep;                    /* rayon de l'orbite */
  SC.vie = SC.t1 - 3 * PI - SC.t0;               /* la durée de vie d'une poche fermée, en radians d'orbite */
  const dev = (t, al) => [SC.a * (Math.cos(t) + (t - al) * Math.sin(t)), SC.a * (Math.sin(t) - (t - al) * Math.cos(t))];
  const faceExt = t => dev(t, -SC.delta), faceInt = t => dev(t, SC.delta);
  const echant = (f, a, b) => { const n = Math.max(2, Math.ceil(Math.abs(b - a) / 0.08)); return Array.from({ length: n + 1 }, (_, i) => f(a + (b - a) * i / n)); };

  /* phi = ce qui s'est écoulé depuis la fermeture de la poche suivie (en radians d'orbite) :
     négatif, elle est encore ouverte au pourtour ; au-delà de SC.vie, elle débouche au centre. */
  function poches(phi) {
    const { t0, t1, rho } = SC;
    const theta = t1 - PI / 2 - phi;
    const d = [rho * Math.cos(theta), rho * Math.sin(theta)];
    const miroir = f => s => { const p = f(s); return [d[0] - p[0], d[1] - p[1]]; };
    const mobInt = miroir(faceInt), mobExt = miroir(faceExt);
    const liste = [];
    for (let fam = 1; fam <= 2; fam++) {
      for (let k = -6; k <= 4; k++) {
        const c = fam === 1 ? theta - PI / 2 + 2 * PI * k : theta + PI / 2 + 2 * PI * k;
        const fa = Math.max(c, t0), fb = Math.min(c + 2 * PI, t1);
        const oa0 = fam === 1 ? c + PI : c - PI, ob0 = fam === 1 ? c + 3 * PI : c + PI;
        const oa = Math.max(oa0, t0), ob = Math.min(ob0, t1);
        if (fb <= fa + 0.05 || ob <= oa + 0.05) continue;
        const fixe = echant(fam === 1 ? faceExt : faceInt, fa, fb);
        const mob = echant(fam === 1 ? mobInt : mobExt, oa, ob).reverse();
        const base = fam === 1 ? t1 - 3 * PI : t1 - 2 * PI;
        liste.push({ fam, k, suivie: fam === 1 && k === -1, poly: fixe.concat(mob),
          ouvert: (c + 2 * PI > t1) || (ob0 > t1), centre: c < t0,
          prog: borne((base - c) / SC.vie, 0, 1) });
      }
    }
    return { theta, d, liste };
  }

  /* Le scroll lui-même, centré en (cx, cy), à l'échelle k. Une seule poche est suivie (en couleur vive) ;
   sa symétrique, de l'autre côté, fait la même chose et reste pâle, comme toutes les autres. */
  function scrollDessin(phi, cx, cy, k) {
    const { d, liste } = poches(phi);
    const T = p => [cx + k * p[0], cy + k * p[1]];
    let s = `<circle cx="${cx}" cy="${cy}" r="${f1(172 * k)}" fill="${GAZ_BP}" stroke="${C.gris}" stroke-width="${f1(Math.max(1, 1.5 * k))}" stroke-dasharray="${f1(6 * k)} ${f1(5 * k)}"/>`;
    liste.forEach(p => {
      if (p.ouvert && !p.suivie) return;                   /* le gaz du pourtour : déjà le fond bleu pâle */
      const col = p.ouvert ? C.froid : melange(C.froid, C.chaud, p.prog);
      s += `<path d="M${pts(p.poly.map(T))} Z" fill="${col}" fill-opacity="${p.suivie ? .85 : .3}" stroke="none"/>`;
    });
    const fixe = echant(t => dev(t, 0), SC.t0, SC.t1).map(T);
    const mob = echant(t => { const p = dev(t, 0); return [d[0] - p[0], d[1] - p[1]]; }, SC.t0, SC.t1).map(T);
    const e = f1(SC.ep * k);
    s += `<path d="M${pts(fixe)}" fill="none" stroke="${C.navy}" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path d="M${pts(mob)}" fill="none" stroke="${C.ambre}" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round"/>`;
    const ouvre = phi > SC.vie;
    s += `<circle cx="${cx}" cy="${cy}" r="${f1(6 * k)}" fill="${ouvre ? C.chaud : C.papier}" stroke="${C.chaud}" stroke-width="${f1(Math.max(1, 2 * k))}"/>`;
    return { markup: s, d };
  }

  function scrollPasAPas() {
    const dess = svg('0 0 820 440',
      'Un compresseur scroll vu du dessus, en coupe : une spirale fixe bleu marine, une spirale mobile ocre qui orbite. Entre les deux, une poche de gaz colorée glisse du pourtour vers le centre en rétrécissant, et passe du bleu au rouge.');
    let phi = -1.3;
    const cx = 215, cy = 220;

    const peindre = () => {
      const { markup } = scrollDessin(phi, cx, cy, 1);
      /* le gaz qui entre : une flèche au-delà de chacune des deux extrémités de spirale, là où le pourtour est libre */
      const bout = dev(SC.t1, 0), aF = Math.atan2(bout[1], bout[0]);
      const fleches = [aF + 0.55, aF + 0.55 + PI].map(a => {
        const u = [Math.cos(a), Math.sin(a)];
        return `<path d="M${f1(cx + 214 * u[0])} ${f1(cy + 214 * u[1])} L${f1(cx + 170 * u[0])} ${f1(cy + 170 * u[1])}" fill="none" stroke="${C.froid}" stroke-width="4" marker-end="url(#sc-bp)"/>`;
      }).join('');
      /* l'orbite : le centre de la spirale mobile se déplace sur ce petit cercle */
      const theta = SC.t1 - PI / 2 - phi, ox = 490, oy = 305, ro = 30;
      const pt = a => [ox + ro * Math.cos(a), oy + ro * Math.sin(a)];
      const dot = pt(theta), debut = pt(theta - 0.35), fin = pt(theta - 1.9);
      const ligne = (y, sw, txt) => sw + `<text x="${470}" y="${y + 5}" font-size="14" fill="${C.navy}">${txt}</text>`;
      const barre = (y, col) => `<line x1="440" y1="${y}" x2="462" y2="${y}" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;
      const carre = (y, col, op) => `<rect x="440" y="${y - 7}" width="22" height="14" rx="3" fill="${col}" fill-opacity="${op || 1}" stroke="none"/>`;
      dess.innerHTML = `
<defs>
  <marker id="sc-bp" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 1 L12 7 L0 13 z" fill="${C.froid}"/></marker>
  <marker id="sc-orb" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0 1 L11 6 L0 11 z" fill="${C.ambre}"/></marker>
  <linearGradient id="sc-deg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${C.froid}"/><stop offset="1" stop-color="${C.chaud}"/></linearGradient>
</defs>
<rect x="10" y="10" width="800" height="420" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${markup}
${fleches}
${ligne(66, barre(66, C.navy), 'spirale fixe')}
${ligne(96, barre(96, C.ambre), 'spirale mobile : elle orbite')}
${ligne(126, carre(126, GAZ_BP), 'gaz froid, basse pression')}
${ligne(156, `<rect x="440" y="149" width="22" height="14" rx="3" fill="url(#sc-deg)" stroke="none"/>`, 'poche suivie : le gaz s’y comprime')}
${ligne(186, `<circle cx="451" cy="186" r="7" fill="${C.chaud}" stroke="none"/>`, 'refoulement : le gaz chaud sort au centre')}
<text x="440" y="250" font-size="15" font-weight="700" fill="${C.navy}">Le mouvement orbital</text>
<circle cx="${ox}" cy="${oy}" r="${ro}" fill="none" stroke="${C.gris}" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M${f1(debut[0])} ${f1(debut[1])} A${ro} ${ro} 0 0 0 ${f1(fin[0])} ${f1(fin[1])}" fill="none" stroke="${C.ambre}" stroke-width="3" marker-end="url(#sc-orb)"/>
<circle cx="${f1(dot[0])}" cy="${f1(dot[1])}" r="8" fill="${C.ambre}" stroke="none"/>
<text x="550" y="296" font-size="14" fill="${C.navy}">le centre de la spirale mobile</text>
<text x="550" y="316" font-size="14" fill="${C.navy}">décrit un petit cercle ;</text>
<text x="550" y="336" font-size="14" fill="${C.navy}">elle ne tourne pas sur elle-même.</text>`;
    };

    const etapes = [
      { titre: 'La poche s’ouvre au pourtour', dire: 'Les deux spirales sont emboîtées. En orbitant, la spirale mobile s’écarte de la fixe : une poche s’ouvre sur le pourtour, et le gaz froid, à basse pression, y entre.',
        peindre: () => { phi = -1.3; peindre(); } },
      { titre: 'Elle se ferme : le gaz est enfermé', dire: 'Les deux spirales se rejoignent à l’entrée de la poche : elle est fermée. Le gaz qui y est entré est prisonnier, l’aspiration est terminée.',
        peindre: () => { phi = 0.3; peindre(); } },
      { titre: 'Elle glisse vers le centre en rétrécissant', dire: 'Le mouvement orbital pousse la poche le long de la spirale, vers le centre. Elle rétrécit : le gaz est comprimé, il monte en pression et il chauffe.',
        peindre: () => { phi = 2.6; peindre(); } },
      { titre: 'Plus petite, plus comprimé', dire: 'Plus la poche est petite, plus le gaz est serré. La pression monte sans à-coup, tout au long du trajet.',
        peindre: () => { phi = 4.9; peindre(); } },
      { titre: 'Au centre, elle s’ouvre sur le refoulement', dire: 'Arrivée au centre, la poche s’ouvre sur l’orifice de refoulement : le gaz chaud, sous haute pression, part vers le condenseur. Au pourtour, une autre poche s’ouvre déjà.',
        peindre: () => { phi = 6.9; peindre(); } }
    ];
    return pasAPas(dess, etapes, 'Vue du dessus, en coupe. La poche suivie est en couleur vive ; sa symétrique, de l’autre côté, fait la même chose, en pâle.');
  }

  /* ================================================================== le rotatif
     Un cylindre fixe de rayon R, un rouleau de rayon r monté sur un arbre excentré de e = R - r :
     le rouleau touche toujours la paroi en un point, qui fait le tour. La palette, poussée par son
     ressort, s'appuie sur le rouleau : elle coupe la lunule en deux chambres, l'aspiration derrière
     le point de contact, la compression devant. Les angles sont comptés depuis la palette, dans le
     sens de rotation de l'arbre. */
  const RO = { R: 124, r: 94, ep: 12 };
  RO.e = RO.R - RO.r;
  const PORT_ASP = 15, PORT_REF = 345, DEMI = 3.5;     /* orifices : angles du milieu et demi-largeur, en degrés */

  function rotatifDessin(phi, cx, cy, k, o) {
    const { R, r, e, ep } = RO, mini = !!(o && o.mini), vanneOuverte = !!(o && o.vanneOuverte);
    const rad = a => a * PI / 180;
    const dir = a => [-Math.sin(rad(a)), -Math.cos(rad(a))];
    const P = (rho, a) => { const u = dir(a); return [cx + k * rho * u[0], cy + k * rho * u[1]]; };
    const sDe = (a, ph) => e * Math.cos(rad(a - ph)) + Math.sqrt(r * r - Math.pow(e * Math.sin(rad(a - ph)), 2));
    const s = a => sDe(a, phi);
    const bords = (a, b, f) => { const n = Math.max(2, Math.ceil(Math.abs(b - a) / 3)); return Array.from({ length: n + 1 }, (_, i) => f(a + (b - a) * i / n)); };
    const chambre = (a, b) => 'M' + pts(bords(a, b, x => P(R, x)).concat(bords(b, a, x => P(s(x), x)))) + ' Z';
    const aire = (a, b, ph) => { let t = 0; const n = 60; for (let i = 0; i < n; i++) { const x = a + (b - a) * (i + .5) / n; t += R * R - Math.pow(sDe(x, ph), 2); } return t * rad(b - a) / n / 2; };
    const arc = (a, b, rho) => { const p = P(rho, a), q = P(rho, b); return `M${f1(p[0])} ${f1(p[1])} A${f1(rho * k)} ${f1(rho * k)} 0 ${b - a > 180 ? 1 : 0} 0 ${f1(q[0])} ${f1(q[1])}`; };
    const w = (x, mini2) => f1(Math.max(mini2 || 1.2, x * k));
    const dessus = dir(phi);
    const Cx = cx + k * e * dessus[0], Cy = cy + k * e * dessus[1];
    const prog = borne(1 - aire(phi, 356.5, phi) / aire(55, 356.5, 55), 0, 1);

    let m = `<circle cx="${cx}" cy="${cy}" r="${f1(R * k)}" fill="${C.creme}" stroke="none"/>`;
    if (phi > 6) m += `<path d="${chambre(3.5, phi)}" fill="${GAZ_ENTRE}" stroke="none"/>`;
    m += `<path d="${chambre(phi, 356.5)}" fill="${melange(C.froid, C.chaud, prog)}" fill-opacity=".7" stroke="none"/>`;

    /* le rouleau, sa came excentrée, l'arbre */
    m += `<circle cx="${f1(Cx)}" cy="${f1(Cy)}" r="${f1(r * k)}" fill="#d9dfe8" stroke="${C.navy}" stroke-width="${w(3)}"/>`;
    m += `<circle cx="${f1(Cx)}" cy="${f1(Cy)}" r="${f1(50 * k)}" fill="${C.papier}" stroke="${C.gris}" stroke-width="${w(2)}"/>`;
    m += `<circle cx="${cx}" cy="${cy}" r="${f1(14 * k)}" fill="${C.navy}" stroke="none"/>`;

    /* la palette, son ressort, son logement */
    const pointe = cy - k * s(0), haut = pointe - 70 * k, fond = cy - k * (R + 86);
    const ressort = Array.from({ length: 7 }, (_, i) => [cx + (i === 0 || i === 6 ? 0 : (i % 2 ? -7 : 7)) * k, haut - (haut - fond) * i / 6]);
    m += `<path d="M${f1(cx - 16 * k)} ${f1(cy - k * (R + ep))} V${f1(fond)} H${f1(cx + 16 * k)} V${f1(cy - k * (R + ep))}" fill="none" stroke="${C.navy}" stroke-width="${w(3)}"/>`;
    m += `<path d="M${pts(ressort)}" fill="none" stroke="${C.gris}" stroke-width="${w(2.5)}" stroke-linejoin="round"/>`;
    m += `<rect x="${f1(cx - 6 * k)}" y="${f1(haut)}" width="${f1(12 * k)}" height="${f1(pointe - haut)}" rx="${f1(2 * k)}" fill="${C.ambre}" stroke="${C.navy}" stroke-width="${w(1.5)}"/>`;

    /* la paroi du cylindre, percée de la palette et des deux orifices */
    const rho = R + ep / 2;
    [[4, PORT_ASP - DEMI], [PORT_ASP + DEMI, PORT_REF - DEMI], [PORT_REF + DEMI, 356]].forEach(([a, b]) => {
      m += `<path d="${arc(a, b, rho)}" fill="none" stroke="${C.navy}" stroke-width="${w(ep)}"/>`;
    });

    /* les deux tubes ; le gaz qui y circule les allume */
    const tube = (a, actif, pale) => {
      const p = P(R + ep, a), q = P(R + ep + 46, a);
      return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${C.navy}" stroke-width="${w(15)}"/>` +
             `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${actif ? pale : C.papier}" stroke-width="${w(9)}"/>`;
    };
    m += tube(PORT_ASP, phi > PORT_ASP + DEMI, '#cfe0f5') + tube(PORT_REF, vanneOuverte, '#f2cfc9');
    if (!mini) {
      const ent = [P(R + ep + 42, PORT_ASP), P(R + ep + 6, PORT_ASP)], sor = [P(R + ep + 6, PORT_REF), P(R + ep + 42, PORT_REF)];
      m += `<line x1="${f1(ent[0][0])}" y1="${f1(ent[0][1])}" x2="${f1(ent[1][0])}" y2="${f1(ent[1][1])}" stroke="${C.froid}" stroke-width="3" marker-end="url(#ro-bp)"/>`;
      if (vanneOuverte) m += `<line x1="${f1(sor[0][0])}" y1="${f1(sor[0][1])}" x2="${f1(sor[1][0])}" y2="${f1(sor[1][1])}" stroke="${C.chaud}" stroke-width="3" marker-end="url(#ro-hp)"/>`;
    }

    /* le clapet de refoulement : couché sur l'orifice, ou soulevé */
    const c1 = P(R - 2, PORT_REF - DEMI), c2 = P(R - 2, PORT_REF + DEMI);
    if (vanneOuverte) {
      const t = [c2[0] - c1[0], c2[1] - c1[1]], n = dir(PORT_REF).map(v => -v);
      const h = Math.hypot(t[0], t[1]) || 1, ux = t[0] / h, uy = t[1] / h;
      m += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(c1[0] + 17 * k * (0.5 * ux + 0.87 * n[0]))}" y2="${f1(c1[1] + 17 * k * (0.5 * uy + 0.87 * n[1]))}" stroke="${C.chaud}" stroke-width="${w(3.5)}" stroke-linecap="round"/>`;
    } else {
      m += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(c2[0])}" y2="${f1(c2[1])}" stroke="${C.navy}" stroke-width="${w(3.5)}" stroke-linecap="round"/>`;
    }
    if (!mini) {
      const q = P(R, phi);
      m += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="5" fill="${C.navy}" stroke="${C.papier}" stroke-width="2"/>`;
      m += `<path d="${arc(118, 160, 150)}" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#ro-rot)"/>`;
    }
    return m;
  }

  function rotatifPasAPas() {
    const dess = svg('0 0 820 410',
      'Un compresseur rotatif vu du dessus, en coupe : un rouleau excentré roule dans un cylindre, une palette poussée par un ressort sépare l’aspiration, à gauche, du refoulement, à droite. Le gaz entre derrière le rouleau, est comprimé devant lui et sort par un clapet.');
    let phi = 55, ouverte = false;
    const cx = 250, cy = 240;

    const peindre = () => {
      const ligne = (y, sw, txt) => sw + `<text x="530" y="${y + 5}" font-size="14" fill="${C.navy}">${txt}</text>`;
      const barre = (y, col) => `<line x1="500" y1="${y}" x2="522" y2="${y}" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;
      const carre = (y, col, op) => `<rect x="500" y="${y - 7}" width="22" height="14" rx="3" fill="${col}" fill-opacity="${op || 1}" stroke="none"/>`;
      dess.innerHTML = `
<defs>
  <marker id="ro-bp" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 1 L12 7 L0 13 z" fill="${C.froid}"/></marker>
  <marker id="ro-hp" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 1 L12 7 L0 13 z" fill="${C.chaud}"/></marker>
  <marker id="ro-rot" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0 1 L11 6 L0 11 z" fill="${C.navy}"/></marker>
  <linearGradient id="ro-deg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${C.froid}"/><stop offset="1" stop-color="${C.chaud}"/></linearGradient>
</defs>
<rect x="10" y="10" width="800" height="390" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${rotatifDessin(phi, cx, cy, 1, { vanneOuverte: ouverte })}
<text x="${cx - 80}" y="68" text-anchor="end" font-size="14" font-weight="700" fill="${phi > 18 ? C.froid : C.gris}">aspiration</text>
<text x="${cx + 82}" y="68" font-size="14" font-weight="700" fill="${ouverte ? C.chaud : C.gris}">refoulement</text>
${ligne(66, barre(66, C.ambre), 'palette, poussée par son ressort')}
${ligne(96, carre(96, '#d9dfe8'), 'rouleau, sur l’arbre excentré')}
${ligne(126, barre(126, C.navy), 'cylindre fixe')}
${ligne(156, `<path d="M502 162 A10 10 0 1 0 502 150" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#ro-rot)"/>`, 'sens de rotation de l’arbre')}
${ligne(196, carre(196, GAZ_ENTRE), 'gaz froid : il entre')}
${ligne(226, `<rect x="500" y="219" width="22" height="14" rx="3" fill="url(#ro-deg)" stroke="none"/>`, 'gaz enfermé : il se comprime')}
${ligne(256, carre(256, C.chaud, .7), 'gaz chaud : il sort')}`;
    };

    const etapes = [
      { titre: 'Le rouleau roule, la palette sépare', dire: 'L’arbre excentré fait rouler le rouleau le long de la paroi. La palette, poussée par son ressort, reste appuyée sur lui : elle coupe l’espace en deux, l’aspiration d’un côté, le refoulement de l’autre.',
        peindre: () => { phi = 55; ouverte = false; peindre(); } },
      { titre: 'Derrière le rouleau, le gaz entre', dire: 'Derrière le rouleau, l’espace grandit : le gaz froid est aspiré par l’orifice d’aspiration.',
        peindre: () => { phi = 135; ouverte = false; peindre(); } },
      { titre: 'Devant le rouleau, le gaz est comprimé', dire: 'Devant le rouleau, l’espace rétrécit : le gaz enfermé est de plus en plus serré. Il monte en pression et il chauffe.',
        peindre: () => { phi = 230; ouverte = false; peindre(); } },
      { titre: 'Le clapet s’ouvre, le gaz chaud sort', dire: 'Quand la pression est assez haute, le clapet s’ouvre et le gaz chaud part vers le condenseur. Le rouleau revient contre la palette, et le tour recommence.',
        peindre: () => { phi = 305; ouverte = true; peindre(); } }
    ];
    return pasAPas(dess, etapes, 'Vue du dessus, en coupe. Le rouleau et la palette ne se quittent jamais : c’est ce contact qui sépare les deux côtés.');
  }

  /* ================================================================== temps 2 : les deux, l'un sous l'autre */
  function compresseurs() {
    const hote = document.createElement('div');
    const titre = t => { const h = document.createElement('h3'); h.textContent = t; h.style.cssText = 'margin:.9rem 0 .3rem;font-size:1em;color:' + C.navy; return h; };
    hote.append(titre('Le scroll : une poche, du pourtour au centre'), scrollPasAPas(),
                titre('Le rotatif : un rouleau, une palette'), rotatifPasAPas());
    return hote;
  }

  /* ================================================================== temps 5 : les deux côte à côte */
  function recapitulatif() {
    const d = svg('0 0 820 376', 'Récapitulatif : à gauche le rotatif, un rouleau et une palette, pour les petits splits ; à droite le scroll, deux spirales, pour les gros splits, les DRV, les roof-top et les pompes à chaleur. Même rôle : aspirer un gaz froid et le refouler chaud, sous pression.');
    d.innerHTML = `
<rect x="10" y="10" width="800" height="356" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="215" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Rotatif</text>
<text x="605" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Scroll</text>
${rotatifDessin(135, 215, 190, 0.58, { mini: true })}
${scrollDessin(2.6, 605, 178, 0.58).markup}
<text x="215" y="300" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">un rouleau et une palette</text>
<text x="215" y="320" text-anchor="middle" font-size="14" fill="${C.gris}">petits splits, monoblocs</text>
<text x="605" y="300" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">deux spirales, une fixe, une qui orbite</text>
<text x="605" y="320" text-anchor="middle" font-size="14" fill="${C.gris}">gros splits, DRV, roof-top, pompes à chaleur</text>
<text x="410" y="350" text-anchor="middle" font-size="14" font-weight="700" fill="${C.chaud}">Même rôle : aspirer un gaz froid, le refouler chaud et sous pression.</text>`;
    return d;
  }

  return { compresseurs, recapitulatif };
})();
