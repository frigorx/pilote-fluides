/* Le jeu du chalumeau — les DESSINS (SVG en chaînes de caractères).
   CONTRAT : aucune règle de jeu ici. Tout se lit dans l'état S que tient jeu.js ; F (la flamme) est
   calculé par jeu.js. Les éléments touchables portent data-cible="…" (jeu.js écoute les clics).
   Repères : ogive d'oxygène BLANCHE, d'acétylène MARRON ; tuyau bleu = oxygène, rouge = acétylène ;
   clapets anti-retour à l'entrée du chalumeau (station 2-1) ; filetage d'oxygène à droite, d'acétylène
   à gauche ; chaque détendeur porte le nom de son gaz. Vu de côté, un filetage à droite d'axe horizontal montre des filets « \ ». */
window.Scene = (() => {
  'use strict';
  const borne = (v, a, b) => Math.max(a, Math.min(b, v));
  const FIL = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle" style="font:800 ${t}px 'Trebuchet MS',Calibri,sans-serif;fill:#1b3a63;opacity:.07">by inerweb.fr</text>`;
  const DEFS = `<defs>
    <linearGradient id="g-acier" x1="0" x2="1"><stop offset="0" stop-color="#8f99a4"/><stop offset=".45" stop-color="#e4e8ec"/><stop offset="1" stop-color="#7f8994"/></linearGradient>
    <linearGradient id="g-acier-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f99a4"/><stop offset=".45" stop-color="#e4e8ec"/><stop offset="1" stop-color="#7f8994"/></linearGradient>
    <linearGradient id="g-laiton" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dc95"/><stop offset=".5" stop-color="#d4ad55"/><stop offset="1" stop-color="#a47a28"/></linearGradient>
    <linearGradient id="g-cuivre" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eab489"/><stop offset=".5" stop-color="#b8692e"/><stop offset="1" stop-color="#8a4a1d"/></linearGradient>
    <linearGradient id="g-poignee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d6772"/><stop offset=".5" stop-color="#39424c"/><stop offset="1" stop-color="#262d34"/></linearGradient>
  </defs>`;

  /* ---------- manomètre ---------- */
  function jauge(cx, cy, r, max, val, labels, titre, rouge) {
    const ang = v => -135 + 270 * borne(v / max, 0, 1.04);
    const pol = (a, d) => { const t = (a - 90) * Math.PI / 180; return [cx + Math.cos(t) * d, cy + Math.sin(t) * d]; };
    let s = `<circle cx="${cx}" cy="${cy}" r="${r + r * .11}" fill="#56657a"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffdf8" stroke="#1b3a63" stroke-width="${r * .05}"/>`;
    if (rouge != null) {
      const [x1, y1] = pol(ang(rouge), r * .86), [x2, y2] = pol(ang(max), r * .86);
      s += `<path d="M${x1} ${y1} A${r * .86} ${r * .86} 0 0 1 ${x2} ${y2}" fill="none" stroke="#b3261e" stroke-width="${r * .12}"/>`;
    }
    for (let i = 0; i <= 20; i++) {
      const a = -135 + 13.5 * i, [x1, y1] = pol(a, r * (i % 2 ? .84 : .76)), [x2, y2] = pol(a, r * .93);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1b3a63" stroke-width="${r * (i % 2 ? .022 : .04)}"/>`;
    }
    labels.forEach(v => { const [x, y] = pol(ang(v), r * .56);
      s += `<text x="${x}" y="${y + r * .1}" text-anchor="middle" style="font:700 ${r * .27}px Calibri,Arial;fill:#10233c">${String(v).replace('.', ',')}</text>`; });
    s += `<text x="${cx}" y="${cy + r * .55}" text-anchor="middle" style="font:800 ${r * .3}px Calibri,Arial;fill:#1b3a63">${titre}</text>`;
    s += `<text x="${cx}" y="${cy + r * .78}" text-anchor="middle" style="font:700 ${r * .17}px Calibri,Arial;fill:#56657a">bar</text>`;
    const [nx, ny] = pol(ang(val), r * .8);
    s += `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#c9451a" stroke-width="${r * .07}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r * .1}" fill="#1b3a63"/>`;
    return s;
  }
  const ECHELLES = {
    hpO: { max: 315, labels: [0, 100, 200, 300], titre: 'HP' }, bpO: { max: 4, labels: [0, 1, 2, 3, 4], titre: 'BP' },
    hpA: { max: 40, labels: [0, 10, 20, 30, 40], titre: 'HP' }, bpA: { max: 2.5, labels: [0, 0.5, 1, 1.5, 2, 2.5], titre: 'BP', rouge: 1.5 }
  };
  const JAUGES = {
    hpO: { cx: 195, cy: 62, txt: 'Haute pression d’oxygène : ce qui reste dans la bouteille (environ 200 bar quand elle est pleine).' },
    bpO: { cx: 274, cy: 62, txt: 'Basse pression d’oxygène : ce qui part vers le chalumeau. Elle se règle à la vis de détente.' },
    hpA: { cx: 385, cy: 162, txt: 'Haute pression d’acétylène : ce qui reste dans la bouteille (environ 15 bar quand elle est pleine).' },
    bpA: { cx: 464, cy: 162, txt: 'Basse pression d’acétylène : jamais plus de 1,5 bar (zone rouge). Au-delà, l’acétylène devient instable.' }
  };
  const uneJauge = (id, p, cx, cy, r) => { const e = ECHELLES[id]; return jauge(cx, cy, r, e.max, p, e.labels, e.titre, e.rouge); };

  /* ---------- robinet du chalumeau (bouton moleté) ---------- */
  function bouton(cx, cy, couleur, pas) {
    const a = -pas / 8 * 360; // ouvrir = sens inverse des aiguilles d'une montre
    return `<circle cx="${cx}" cy="${cy}" r="24" fill="${couleur}" stroke="#2c333b" stroke-width="2.5"/>
      <g transform="rotate(${a} ${cx} ${cy})">${[0, 60, 120, 180, 240, 300].map(d => `<circle cx="${cx + Math.cos(d * Math.PI / 180) * 24}" cy="${cy + Math.sin(d * Math.PI / 180) * 24}" r="4" fill="${couleur}" stroke="#2c333b" stroke-width="1.5"/>`).join('')}
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 19}" stroke="#fffdf8" stroke-width="5" stroke-linecap="round"/></g>`;
  }

  /* ---------- la flamme (même dessin à toutes les échelles) ----------
     F = { allume, qA (débit d'acétylène / débit nominal de la buse), r (rapport O/A), seul (acétylène seul),
           clac, fuite (gaz sans flamme), taille (facteur de buse) } */
  function flamme(x, y, k, F) {
    let s = '';
    k *= F.taille || 1;
    if (F.fuite) {
      s += `<g class="fuite" stroke="#8a96a3" stroke-width="${2.5 * k}" stroke-dasharray="${6 * k} ${6 * k}" fill="none">
        <path d="M${x} ${y} q${60 * k} ${-20 * k} ${130 * k} ${-36 * k}"/><path d="M${x} ${y} h${140 * k}"/><path d="M${x} ${y} q${60 * k} ${20 * k} ${130 * k} ${36 * k}"/></g>`;
    }
    if (F.clac) {
      const pts = Array.from({ length: 16 }, (_, i) => { const t = i * Math.PI / 8, d = (i % 2 ? 22 : 52) * k; return `${x + 30 * k + Math.cos(t) * d},${y + Math.sin(t) * d}`; }).join(' ');
      s += `<g class="clac"><polygon points="${pts}" fill="#ffd166" stroke="#c9451a" stroke-width="${3 * k}"/>
        <text x="${x + 30 * k}" y="${y - 60 * k}" text-anchor="middle" style="font:900 ${30 * k}px 'Trebuchet MS',Arial;fill:#c9451a">CLAC !</text></g>`;
    }
    if (!F.allume) return s;
    const a = F.qA, r = F.r, seul = F.seul;
    const g = borne((a - 1.4) / 0.5, 0, 1) * 45 * k, x0 = x + g;
    let L = (170 + 110 * Math.min(a, 1.8)) * k, H = (14 + 14 * Math.min(a, 1.8)) * k;
    let fOx = 0, fCa = 0;
    if (seul) { L *= 1.25; H *= 1.2; }
    else if (r > 1.2) { fOx = Math.min(1, (r - 1.2) / 0.8); L *= 1 - .32 * fOx; H *= 1 - .15 * fOx; }
    else if (r < 0.98) { fCa = Math.min(1, (0.98 - r) / 0.7); L *= 1 + .22 * fCa; H *= 1 + .1 * fCa; }
    const forme = (x0, l, h) => `M${x0} ${y - h * .45} C${x0 + l * .28} ${y - h * 1.25} ${x0 + l * .82} ${y - h * .85} ${x0 + l} ${y} C${x0 + l * .82} ${y + h * .85} ${x0 + l * .28} ${y + h * 1.25} ${x0} ${y + h * .45} Z`;
    let fond, trait;
    if (seul) { fond = '#ffc35c'; trait = '#c9451a'; }
    else if (fOx > 0) { fond = '#b3a8f2'; trait = '#5b4bc4'; }
    else if (fCa > 0) { fond = fCa > .5 ? '#f2d9a8' : '#c7d6ee'; trait = '#3d7fca'; }
    else { fond = '#a9c8ef'; trait = '#3d7fca'; }
    if (g > 0) s += `<path d="M${x} ${y - 4 * k} L${x0} ${y - 12 * k} M${x} ${y + 4 * k} L${x0} ${y + 12 * k}" stroke="#8a96a3" stroke-width="${2 * k}" stroke-dasharray="${4 * k} ${4 * k}"/>`;
    const anim = seul ? 'vac lent' : fOx > .15 ? 'vac vite' : 'vac';
    s += `<g class="${g > 0 ? 'danse' : ''}"><g class="${anim}"><path d="${forme(x0, L, H)}" fill="${fond}" stroke="${trait}" stroke-width="${2 * k}" opacity=".95"/>`;
    if (!seul) {
      s += `<path d="${forme(x0, L * .62, H * .55)}" fill="#ffffff" opacity=".25"/>`;
      let Ld = 40 * Math.sqrt(a) * k, Hd = 10 * Math.sqrt(a) * k;
      if (fCa > 0) {
        const Lv = Ld * (1.25 + 3.4 * fCa), Hv = Hd * (1.35 + .4 * fCa);
        s += `<path d="${forme(x0, Lv, Hv * 1.6)}" fill="#ffffff" opacity=".88" stroke="#8a96a3" stroke-width="${2 * k}" stroke-dasharray="${6 * k} ${4 * k}"/>`;
      }
      if (fOx > 0) {
        Ld *= 1 - .5 * fOx; Hd *= 1 - .1 * fOx;
        s += `<path d="M${x0} ${y - Hd} L${x0 + Ld} ${y} L${x0} ${y + Hd} Z" fill="#f4f1ff" stroke="#3b2f9a" stroke-width="${2.5 * k}" stroke-linejoin="round"/>`;
      } else {
        const d = `M${x0} ${y - Hd} C${x0 + Ld * .55} ${y - Hd * 1.15} ${x0 + Ld} ${y - Hd * .7} ${x0 + Ld} ${y} C${x0 + Ld} ${y + Hd * .7} ${x0 + Ld * .55} ${y + Hd * 1.15} ${x0} ${y + Hd} Z`;
        s += fCa > 0
          ? `<path d="${d}" fill="#ffffff" stroke="#7f93ad" stroke-width="${3.5 * k}" opacity=".9"/>`
          : `<path d="${d}" fill="#ffffff" stroke="#1b3a63" stroke-width="${2.5 * k}"/>`;
      }
    }
    s += '</g></g>';
    if (seul) for (let i = 0; i < 6; i++) s += `<circle class="fumee" style="animation-delay:${-i * .3}s" cx="${x0 + L * (.55 + i * .07)}" cy="${y - H * .4}" r="${(8 + i * 2) * k}" fill="#2c333b" opacity=".6"/>`;
    return s;
  }

  /* ---------- le poste ---------- */
  const halo = (S, c) => S.halo && S.halo.includes(c) ? ' halo' : '';
  function detendeurO(S) {
    return `<g data-cible="det-O">
      <rect x="162" y="110" width="88" height="40" rx="10" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="146" y="116" width="20" height="22" rx="3" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      <line x1="195" y1="96" x2="195" y2="112" stroke="#6b5420" stroke-width="6"/>
      <line x1="272" y1="96" x2="240" y2="116" stroke="#6b5420" stroke-width="6"/>
      <rect x="205" y="150" width="20" height="30" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      <rect x="205" y="160" width="20" height="7" fill="#2f74c9"/></g>
      <g data-cible="vis-O" class="touche${halo(S, 'vis-O')}"><rect x="250" y="124" width="${10 + 10 * (1 - S.vis.O / 4)}" height="12" fill="#8a96a3"/>
      <rect x="${260 + 10 * (1 - S.vis.O / 4)}" y="110" width="15" height="40" rx="5" fill="#2c333b"/></g>
      <g class="jauge" data-j="hpO">${uneJauge('hpO', S.p.O.hp, 195, 62, 36)}</g><g class="jauge" data-j="bpO">${uneJauge('bpO', S.p.O.bp - S.chute.O, 274, 62, 36)}</g>`;
  }
  function detendeurA(S) {
    return `<g data-cible="det-A">
      <rect x="352" y="210" width="88" height="40" rx="10" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="336" y="214" width="20" height="22" rx="3" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      <line x1="385" y1="198" x2="385" y2="212" stroke="#6b5420" stroke-width="6"/>
      <line x1="462" y1="198" x2="430" y2="216" stroke="#6b5420" stroke-width="6"/>
      <rect x="395" y="250" width="20" height="30" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      <rect x="395" y="260" width="20" height="7" fill="#d2382c"/></g>
      <g data-cible="vis-A" class="touche${halo(S, 'vis-A')}"><rect x="440" y="224" width="${10 + 10 * (1 - S.vis.A / 2.5)}" height="12" fill="#8a96a3"/>
      <rect x="${450 + 10 * (1 - S.vis.A / 2.5)}" y="210" width="15" height="40" rx="5" fill="#2c333b"/></g>
      <g class="jauge" data-j="hpA">${uneJauge('hpA', S.p.A.hp, 385, 162, 36)}</g><g class="jauge" data-j="bpA">${uneJauge('bpA', S.p.A.bp - S.chute.A, 464, 162, 36)}</g>`;
  }
  const POINTS = { 1: [156, 127], 2: [346, 225], 3: [215, 176], 4: [405, 276], 5: [600, 458] };

  function poste(S, F) {
    const plaque = S.plaquesBlanches;
    let s = `${DEFS}<g id="poste">${FIL(640, 330, 64)}
      <rect x="0" y="592" width="1200" height="28" fill="#e9dfcf"/>
      <rect x="44" y="236" width="12" height="350" rx="5" fill="#56657a"/>
      <rect x="44" y="574" width="370" height="14" rx="6" fill="#56657a"/>
      <circle cx="86" cy="592" r="22" fill="#2c333b"/><circle cx="86" cy="592" r="8" fill="#8a96a3"/>
      <circle cx="376" cy="592" r="22" fill="#2c333b"/><circle cx="376" cy="592" r="8" fill="#8a96a3"/>`;
    // ce qui n'a rien à faire près du poste (temps 1)
    if (!S.retire.carton) s += `<g data-cible="carton" class="touche${halo(S, 'carton')}"><rect x="452" y="514" width="104" height="76" fill="#c8a26a" stroke="#7a5a2a" stroke-width="3"/>
      <path d="M452 514 L476 496 H580 L556 514 M556 514 L580 496 V572 L556 590" fill="#b38d55" stroke="#7a5a2a" stroke-width="3"/>
      <rect x="494" y="514" width="20" height="76" fill="#e8d7a8" opacity=".8"/></g>`;
    if (!S.retire.chiffons) s += `<g data-cible="chiffons" class="touche${halo(S, 'chiffons')}"><path d="M612 592 q6 -26 30 -20 q14 -16 34 -2 q22 -6 26 22 Z" fill="#a39d90" stroke="#5f5a50" stroke-width="2.5"/>
      <ellipse cx="640" cy="584" rx="9" ry="5" fill="#3f3b33"/><ellipse cx="676" cy="580" rx="11" ry="5" fill="#3f3b33"/></g>`;
    // l'extincteur
    s += `<g data-cible="extincteur" class="touche${halo(S, 'extincteur')}">
      ${S.extincteurVu ? '<circle cx="1132" cy="528" r="80" fill="none" stroke="#1e7e54" stroke-width="5" stroke-dasharray="10 6"/>' : ''}
      <rect x="1110" y="478" width="46" height="110" rx="16" fill="#c62828" stroke="#7d1a14" stroke-width="2.5"/>
      <rect x="1124" y="458" width="18" height="22" fill="#2c333b"/><path d="M1124 462 l-22 -10 M1142 462 h22" stroke="#2c333b" stroke-width="6" stroke-linecap="round"/>
      <path d="M1142 470 C1180 480 1176 530 1160 560" fill="none" stroke="#2c333b" stroke-width="6"/>
      <rect x="1118" y="508" width="30" height="44" rx="4" fill="#fffdf8"/></g>`;
    // bouteille d'oxygène (ogive blanche)
    s += `<g data-cible="bouteille-O" class="touche${halo(S, 'bouteille-O')}">
      <path d="M70 576 V232 Q70 172 125 168 Q180 172 180 232 V576 Z" fill="url(#g-acier)" stroke="#4d5763" stroke-width="3"/>
      <path d="M70 262 V232 Q70 172 125 168 Q180 172 180 232 V262 Z" fill="#fbfaf5" stroke="#4d5763" stroke-width="3"/>
      <rect x="84" y="330" width="82" height="170" rx="10" fill="#fffdf8" stroke="#4d5763" stroke-width="2"/>
      ${plaque ? '' : '<text transform="translate(134 415) rotate(-90)" text-anchor="middle" style="font:800 28px Calibri,Arial;fill:#1b3a63">OXYGÈNE</text>'}
      <rect x="111" y="140" width="28" height="30" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/></g>
      <g data-cible="robinet-O" class="touche${halo(S, 'robinet-O')}">
      <rect x="104" y="112" width="42" height="30" rx="5" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="121" y="96" width="8" height="18" fill="#4d5763"/>
      <ellipse cx="125" cy="94" rx="30" ry="8" fill="${S.b.O.ouverte ? '#1e7e54' : '#2c333b'}"/>
      <rect x="146" y="120" width="${S.b.O.monte ? 4 : 18}" height="14" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      ${S.b.O.monte ? '' : '<path d="M150 120 l3 14 M155 120 l3 14 M160 120 l3 14" stroke="#6b5420" stroke-width="1.2"/>'}</g>`;
    // bouteille d'acétylène (ogive marron, clé laissée en place)
    s += `<g data-cible="bouteille-A" class="touche${halo(S, 'bouteille-A')}">
      <path d="M248 576 V322 Q248 270 314 266 Q380 270 380 322 V576 Z" fill="url(#g-acier)" stroke="#4d5763" stroke-width="3"/>
      <path d="M248 352 V322 Q248 270 314 266 Q380 270 380 322 V352 Z" fill="#7a3324" stroke="#4d5763" stroke-width="3"/>
      <rect x="262" y="400" width="104" height="160" rx="10" fill="#fffdf8" stroke="#4d5763" stroke-width="2"/>
      ${plaque ? '' : '<text transform="translate(322 480) rotate(-90)" text-anchor="middle" style="font:800 26px Calibri,Arial;fill:#7a3324">ACÉTYLÈNE</text>'}
      <rect x="300" y="238" width="28" height="30" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/></g>
      <g data-cible="robinet-A" class="touche${halo(S, 'robinet-A')}">
      <rect x="293" y="210" width="42" height="30" rx="5" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      ${S.cleRetiree ? '<rect x="308" y="198" width="12" height="14" fill="#56657a"/>' : `<rect x="308" y="184" width="12" height="28" fill="#2c333b"/><rect x="286" y="178" width="56" height="10" rx="4" fill="${S.b.A.ouverte ? '#1e7e54' : '#2c333b'}"/>`}
      <rect x="335" y="218" width="${S.b.A.monte ? 4 : 18}" height="14" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      ${S.b.A.monte ? '' : '<path d="M342 232 l3 -14 M347 232 l3 -14 M352 232 l3 -14" stroke="#6b5420" stroke-width="1.2"/>'}</g>`;
    // chaînes d'arrimage
    s += `<g data-cible="chaine-O" class="touche${halo(S, 'chaine-O')}">${S.chaine.O
      ? '<line x1="56" y1="300" x2="186" y2="300" stroke="#4d5763" stroke-width="7" stroke-dasharray="11 6"/>'
      : '<path d="M56 300 q16 70 -4 130" fill="none" stroke="#4d5763" stroke-width="7" stroke-dasharray="11 6"/><rect x="40" y="280" width="34" height="160" fill="transparent"/>'}</g>
      <g data-cible="chaine-A" class="touche${halo(S, 'chaine-A')}">${S.chaine.A
      ? '<line x1="56" y1="420" x2="388" y2="420" stroke="#4d5763" stroke-width="7" stroke-dasharray="11 6"/>'
      : '<path d="M56 420 q18 60 -2 120" fill="none" stroke="#4d5763" stroke-width="7" stroke-dasharray="11 6"/><rect x="40" y="400" width="34" height="150" fill="transparent"/>'}</g>`;
    // tuyaux : bleu = oxygène, rouge = acétylène (de la sortie du détendeur au clapet du chalumeau)
    if (S.tuyau.O) s += `<path d="M215 180 V500 C215 600 520 590 556 500 S570 452 588 448" fill="none" stroke="#123f78" stroke-width="15" stroke-linecap="round"/>
      <path d="M215 180 V500 C215 600 520 590 556 500 S570 452 588 448" fill="none" stroke="#2f74c9" stroke-width="10" stroke-linecap="round"/>`;
    if (S.tuyau.A) s += `<path d="M405 280 V470 C405 560 530 560 562 500 S574 470 588 468" fill="none" stroke="#7d1a14" stroke-width="15" stroke-linecap="round"/>
      <path d="M405 280 V470 C405 560 530 560 562 500 S574 470 588 468" fill="none" stroke="#d2382c" stroke-width="10" stroke-linecap="round"/>`;
    if (S.b.O.monte) s += detendeurO(S);
    if (S.b.A.monte) s += detendeurA(S);
    // le chalumeau et ses clapets anti-retour
    s += `<g data-cible="clapet-O" class="touche${halo(S, 'clapet-O')}"><rect x="586" y="440" width="36" height="16" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/><rect x="600" y="440" width="8" height="16" fill="#2f74c9"/>${S.clapetVu.O ? '<circle cx="604" cy="448" r="20" fill="none" stroke="#1e7e54" stroke-width="3"/>' : ''}</g>
      <g data-cible="clapet-A" class="touche${halo(S, 'clapet-A')}"><rect x="586" y="460" width="36" height="16" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/><rect x="600" y="460" width="8" height="16" fill="#d2382c"/>${S.clapetVu.A ? '<circle cx="604" cy="468" r="20" fill="none" stroke="#1e7e54" stroke-width="3"/>' : ''}</g>
      <rect x="622" y="443" width="20" height="10" fill="#8a96a3"/><rect x="622" y="463" width="20" height="10" fill="#8a96a3"/>
      <rect x="640" y="436" width="174" height="44" rx="18" fill="url(#g-poignee)"/>
      <g stroke="#1b2128" stroke-width="2" opacity=".6"><line x1="670" y1="440" x2="670" y2="476"/><line x1="700" y1="440" x2="700" y2="476"/><line x1="730" y1="440" x2="730" y2="476"/><line x1="760" y1="440" x2="760" y2="476"/></g>
      <rect x="806" y="428" width="68" height="60" rx="9" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="874" y="451" width="170" height="14" fill="url(#g-cuivre)" stroke="#6e3a14" stroke-width="1.5"/>
      ${S.buseMontee ? '<path d="M1040 446 L1072 453 L1072 463 L1040 470 Z" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>' : ''}
      <rect x="826" y="410" width="10" height="20" fill="#6b5420"/><rect x="836" y="486" width="10" height="20" fill="#6b5420"/>
      <g data-cible="bouton-ac" class="touche">${bouton(831, 398, '#d2382c', S.ac)}</g>
      <g data-cible="bouton-o2" class="touche">${bouton(841, 518, '#2f74c9', S.o2)}</g>
      <text x="866" y="396" style="font:700 26px Calibri,Arial;fill:#b3261e">acétylène</text>
      <text x="878" y="544" style="font:700 26px Calibri,Arial;fill:#1f5fae">oxygène</text>
      <text x="726" y="420" text-anchor="middle" style="font:800 28px Calibri,Arial;fill:#1b3a63">Chalumeau</text>`;
    // purge d'une bouteille (« faire cracher »)
    if (S.anim.purge) {
      const [x, y] = S.anim.purge === 'O' ? [172, 127] : [361, 225];
      s += `<g class="pfff">${[0, 1, 2, 3].map(i => `<circle cx="${x + 18 + i * 16}" cy="${y - i * 6}" r="${8 + i * 5}" fill="#c9d1da" opacity="${.8 - i * .15}"/>`).join('')}</g>`;
    }
    // points de contrôle à l'eau savonneuse
    if (S.points) for (const [n, [x, y]] of Object.entries(POINTS)) {
      const t = S.points[n];
      s += `<g data-cible="point-${n}" class="touche">
        ${t ? `<circle cx="${x}" cy="${y}" r="13" fill="#ffffff" opacity=".85" stroke="#8a96a3"/>` : ''}
        ${t === 'fuite' ? `<g class="bulles">${[0, 1, 2].map(i => `<circle cx="${x - 8 + i * 8}" cy="${y - 6}" r="${4 + i}" fill="#e8f4ff" stroke="#3d7fca" stroke-width="1.5" style="animation-delay:${-i * .4}s"/>`).join('')}</g>` : ''}
        <circle cx="${x + 20}" cy="${y - 20}" r="15" fill="${t === 'ok' ? '#1e7e54' : t === 'fuite' ? '#b3261e' : '#ff6b35'}"/>
        <text x="${x + 20}" y="${y - 13}" text-anchor="middle" style="font:800 19px Calibri,Arial;fill:#fff">${n}</text></g>`;
    }
    s += `<g id="flamme-scene">${flamme(1072, 458, .36, F)}</g></g>`;
    return s;
  }

  /* ---------- les vues de près ---------- */
  function cadre(vb) { return { vb: vb.join(' '), svg: `<use href="#poste"/>` }; }
  function vueFlamme(F) {
    return { vb: '0 40 760 180', svg: `${FIL(450, 208, 34)}
      <rect x="-10" y="120" width="112" height="20" fill="url(#g-cuivre)" stroke="#6e3a14" stroke-width="1.5"/>
      <path d="M100 114 L150 123 L150 137 L100 146 Z" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      ${flamme(150, 130, 1.35, F)}` };
  }
  function vueJauges(S, g) {
    if (g) {
      const hp = 'hp' + g, bp = 'bp' + g, nom = g === 'O' ? 'd’oxygène' : 'd’acétylène';
      return { vb: '0 0 640 326', svg: `${FIL(320, 318, 30)}
        ${uneJauge(hp, S.p[g].hp, 170, 140, 92)}${uneJauge(bp, S.p[g].bp - S.chute[g], 450, 140, 112)}
        <text x="170" y="272" text-anchor="middle" style="font:700 22px Calibri,Arial;fill:#1b3a63">dans la bouteille</text>
        <text x="450" y="290" text-anchor="middle" style="font:700 22px Calibri,Arial;fill:#1b3a63">vers le chalumeau ${nom}</text>` };
    }
    return { vb: '0 0 680 210', svg: `${FIL(340, 200, 26)}
      ${uneJauge('hpO', S.p.O.hp, 90, 90, 66)}${uneJauge('bpO', S.p.O.bp, 250, 90, 66)}
      ${uneJauge('hpA', S.p.A.hp, 430, 90, 66)}${uneJauge('bpA', S.p.A.bp, 590, 90, 66)}
      <text x="170" y="196" text-anchor="middle" style="font:800 22px Calibri,Arial;fill:#1f5fae">oxygène</text>
      <text x="510" y="196" text-anchor="middle" style="font:800 22px Calibri,Arial;fill:#b3261e">acétylène</text>` };
  }
  /* écrou vu de côté (aucun repère d'encoche : absent des sources françaises, choix de Franck du 06/10) */
  function ecrou(x, y, l, h) {
    return `<rect x="${x}" y="${y}" width="${l}" height="${h}" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2.5"/>
      <line x1="${x}" y1="${y + h * .25}" x2="${x + l}" y2="${y + h * .25}" stroke="#6b5420" stroke-width="2"/>
      <line x1="${x}" y1="${y + h * .75}" x2="${x + l}" y2="${y + h * .75}" stroke="#6b5420" stroke-width="2"/>`;
  }
  function vueRaccord(S, g) {
    const R = S.raccord, prog = R.prog / R.total, gauche = g === 'A';
    const nx = 310 - prog * 170;
    let filets = '';
    for (let x = 128; x < 300; x += 13) filets += gauche
      ? `<line x1="${x}" y1="152" x2="${x + 8}" y2="108" stroke="#6b5420" stroke-width="2"/>`
      : `<line x1="${x}" y1="108" x2="${x + 8}" y2="152" stroke="#6b5420" stroke-width="2"/>`;
    const ang = R.angle;
    const hexa = Array.from({ length: 6 }, (_, i) => { const t = (ang + i * 60) * Math.PI / 180; return `${560 + Math.cos(t) * 46},${70 + Math.sin(t) * 46}`; }).join(' ');
    const fleche = R.dernier ? (R.dernier > 0
      ? `<path d="M604 164 A46 30 0 0 1 516 164" fill="none" stroke="#c9451a" stroke-width="5" marker-end="url(#fl)"/>`
      : `<path d="M516 164 A46 30 0 0 0 604 164" fill="none" stroke="#c9451a" stroke-width="5" marker-end="url(#fl)"/>`) : '';
    return { vb: '0 0 640 260', svg: `<defs><marker id="fl" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#c9451a"/></marker></defs>${FIL(320, 250, 30)}
      <rect x="10" y="60" width="120" height="140" rx="10" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2.5"/>
      <text x="12" y="228" style="font:700 20px Calibri,Arial;fill:#1b3a63">robinet de la bouteille</text>
      <rect x="128" y="108" width="176" height="44" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>${filets}
      <rect x="${nx + 70}" y="96" width="${Math.max(0, 470 - nx - 70)}" height="68" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2" opacity=".55"/>
      ${ecrou(nx, 88, 72, 84)}
      <text x="${nx + 36}" y="200" text-anchor="middle" style="font:700 20px Calibri,Arial;fill:#1b3a63">écrou du détendeur</text>
      <polygon points="${hexa}" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2.5"/>
      <circle cx="${560 + Math.cos(ang * Math.PI / 180) * 30}" cy="${70 + Math.sin(ang * Math.PI / 180) * 30}" r="7" fill="#c9451a"/>
      <circle cx="560" cy="70" r="16" fill="#fffdf8" stroke="#6b5420" stroke-width="2"/>
      <text x="560" y="140" text-anchor="middle" style="font:700 18px Calibri,Arial;fill:#56657a">l’écrou vu de face</text>${fleche}` };
  }
  function vueDetendeurs(S) {
    const un = (x, n, gaz, couleur, pris) => `<g opacity="${pris ? .35 : 1}">
      <circle cx="${x + 70}" cy="34" r="22" fill="#1b3a63"/><text x="${x + 70}" y="43" text-anchor="middle" style="font:800 26px Calibri,Arial;fill:#fff">${n}</text>
      ${ecrou(x - 40, 128, 46, 60)}
      <rect x="${x + 6}" y="122" width="150" height="72" rx="14" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2.5"/>
      <rect x="${x + 22}" y="148" width="118" height="26" rx="4" fill="#fffdf8" stroke="#6b5420" stroke-width="1.5"/>
      <text x="${x + 81}" y="168" text-anchor="middle" style="font:800 19px Calibri,Arial;fill:${couleur}">${gaz}</text>
      ${jauge(x + 44, 92, 30, 4, 0, [], '', null)}${jauge(x + 124, 92, 30, 4, 0, [], '', null)}
      <rect x="${x + 156}" y="146" width="18" height="24" fill="#8a96a3"/><rect x="${x + 174}" y="134" width="16" height="48" rx="5" fill="#2c333b"/>
      <rect x="${x + 66}" y="194" width="26" height="40" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="${x + 66}" y="208" width="26" height="9" fill="${couleur}"/></g>`;
    return { vb: '0 0 640 250', svg: `${FIL(320, 244, 30)}${un(80, 1, 'OXYGÈNE', '#1f5fae', S.choixDet[1])}${un(400, 2, 'ACÉTYLÈNE', '#b3261e', S.choixDet[2])}` };
  }
  function vueVis(S) {
    const une = (x, g, nom, max) => {
      const sort = 60 * (1 - S.vis[g] / max);
      return `<rect x="${x}" y="90" width="150" height="80" rx="14" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2.5"/>
        <rect x="${x + 150}" y="118" width="${12 + sort}" height="24" fill="#8a96a3"/>
        ${Array.from({ length: Math.floor((12 + sort) / 9) }, (_, i) => `<line x1="${x + 154 + i * 9}" y1="118" x2="${x + 159 + i * 9}" y2="142" stroke="#56657a" stroke-width="1.5"/>`).join('')}
        <rect x="${x + 162 + sort}" y="92" width="24" height="76" rx="8" fill="#2c333b"/>
        <text x="${x + 100}" y="210" text-anchor="middle" style="font:800 24px Calibri,Arial;fill:${g === 'O' ? '#1f5fae' : '#b3261e'}">${nom}</text>
        <text x="${x + 100}" y="238" text-anchor="middle" style="font:700 20px Calibri,Arial;fill:#56657a">${S.vis[g] > 0 ? 'vis serrée' : 'vis desserrée'}</text>`;
    };
    return { vb: '0 0 640 260', svg: `${FIL(320, 60, 30)}${une(40, 'O', 'oxygène', 4)}${une(360, 'A', 'acétylène', 2.5)}` };
  }
  function vueBulles(S) {
    const n = S.dernierPoint, t = n ? S.points[n] : null;
    let b = '';
    if (t === 'fuite') for (let i = 0; i < 9; i++) b += `<circle class="bulle" style="animation-delay:${-i * .35}s" cx="${250 + (i % 3) * 40 + (i % 2) * 12}" cy="${118 - (i % 4) * 6}" r="${7 + (i % 3) * 4}" fill="#eef7ff" stroke="#3d7fca" stroke-width="2"/>`;
    return { vb: '0 0 640 240', svg: `${FIL(320, 230, 30)}
      <rect x="20" y="110" width="210" height="40" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      ${ecrou(230, 92, 90, 76)}
      <rect x="320" y="110" width="300" height="40" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      ${t ? '<ellipse cx="275" cy="130" rx="80" ry="52" fill="#ffffff" opacity=".45" stroke="#b9c3cf" stroke-width="2"/>' : ''}${b}
      <text x="320" y="40" text-anchor="middle" style="font:800 26px Calibri,Arial;fill:#1b3a63">${n ? `Raccord ${n}` : 'Touchez un raccord numéroté'}</text>
      <text x="320" y="210" text-anchor="middle" style="font:700 22px Calibri,Arial;fill:${t === 'fuite' ? '#b3261e' : '#1e7e54'}">${t === 'fuite' ? 'des bulles : ça fuit' : t === 'ok' ? 'aucune bulle : étanche' : ''}</text>` };
  }
  function vueBuses(S, BUSES) {
    const pas = 640 / BUSES.length;
    return { vb: '0 0 680 230', svg: `${FIL(340, 222, 26)}${BUSES.map((b, i) => {
      const x = 20 + pas * i + pas / 2, l = 30 + i * 6, choisie = S.buse === b.debit;
      return `<g data-cible="${b.debit}" class="touche"><rect x="${x - 30}" y="20" width="60" height="150" rx="12" fill="${choisie ? '#fff4e0' : 'transparent'}" stroke="${choisie ? '#ff6b35' : 'none'}" stroke-width="3"/>
        <path d="M${x - 8 - i} 40 L${x - 3} ${40 + l + 40} H${x + 3} L${x + 8 + i} 40 Z" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
        <text x="${x}" y="150" text-anchor="middle" style="font:800 24px Calibri,Arial;fill:#1b3a63">${b.debit}</text>
        <text x="${x}" y="196" text-anchor="middle" style="font:700 16px Calibri,Arial;fill:#56657a">l/h</text></g>`;
    }).join('')}` };
  }
  function vueCouchee() {
    return { vb: '0 0 640 240', svg: `${FIL(320, 60, 30)}
      <rect x="0" y="196" width="640" height="44" fill="#e9dfcf"/>
      <path d="M70 140 H460 Q520 140 524 166 Q520 192 460 192 H70 Q52 192 52 166 Q52 140 70 140 Z" transform="translate(0 -6)" fill="url(#g-acier-h)" stroke="#4d5763" stroke-width="3"/>
      <path d="M440 134 H460 Q520 134 524 160 Q520 186 460 186 H440 Z" fill="#7a3324" stroke="#4d5763" stroke-width="3"/>
      <rect x="522" y="148" width="30" height="24" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>
      <rect x="550" y="142" width="30" height="36" rx="5" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>` };
  }

  return { DEFS, poste, flamme, jauge, uneJauge, ECHELLES, JAUGES, POINTS, cadre, vueFlamme, vueJauges, vueRaccord, vueDetendeurs, vueVis, vueBulles, vueBuses, vueCouchee, FIL };
})();
