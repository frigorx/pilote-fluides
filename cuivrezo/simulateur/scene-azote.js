/* Le jeu de l'azote — les DESSINS. Reprend de scene.js le manomètre, les dégradés, le filigrane et le cadre.
   CONTRAT : aucune règle ici ; tout se lit dans l'état S de azote.js. Éléments touchables : data-cible="…".
   Repères : ogive de la bouteille d'azote NOIRE (NF EN 1089-3, fiche Air Liquide) ; mano-détendeur à deux cadrans,
   bouteille (HP) et sortie (BP) (HabFluide ch. 13) ; manifold : BP bleu, HP rouge, flexible central jaune (ch. 13). */
window.SceneAzote = (() => {
  'use strict';
  const { DEFS, jauge, FIL } = Scene;
  const ECH = {
    hp: { max: 315, labels: [0, 100, 200, 300], titre: 'HP' }, bp: { max: 60, labels: [0, 10, 20, 30, 40, 50, 60], titre: 'BP' },
    mbp: { max: 40, labels: [0, 10, 20, 30, 40], titre: 'BP' }, mhp: { max: 60, labels: [0, 20, 40, 60], titre: 'HP' }
  };
  const cadran = (id, v, cx, cy, r) => { const e = ECH[id]; return jauge(cx, cy, r, e.max, v, e.labels, e.titre, null); };
  const JAUGES = {
    hp: { cx: 195, cy: 62, txt: 'Cadran bouteille : ce qu’il reste dans la bouteille d’azote.' },
    bp: { cx: 274, cy: 62, txt: 'Cadran de sortie : la pression envoyée vers le circuit. Elle se règle à la vis du détendeur.' },
    mbp: { cx: 545, cy: 246, r: 48, txt: 'Manifold, manomètre basse pression : la pression dans le circuit, côté BP.' },
    mhp: { cx: 655, cy: 246, r: 48, txt: 'Manifold, manomètre haute pression : la pression dans le circuit, côté HP.' }
  };
  const halo = (S, c) => S.halo && S.halo.includes(c) ? ' halo' : '';
  const bouteille = (x, ogive, nom, blanc) => `
    <path d="M${x} 576 V232 Q${x} 172 ${x + 55} 168 Q${x + 110} 172 ${x + 110} 232 V576 Z" fill="url(#g-acier)" stroke="#4d5763" stroke-width="3"/>
    <path d="M${x} 262 V232 Q${x} 172 ${x + 55} 168 Q${x + 110} 172 ${x + 110} 232 V262 Z" fill="${ogive}" stroke="#4d5763" stroke-width="3"/>
    <rect x="${x + 14}" y="330" width="82" height="170" rx="10" fill="#fffdf8" stroke="#4d5763" stroke-width="2"/>
    ${blanc ? '' : `<text transform="translate(${x + 64} 415) rotate(-90)" text-anchor="middle" style="font:800 28px Calibri,Arial;fill:#1b3a63">${nom}</text>`}
    <rect x="${x + 41}" y="140" width="28" height="30" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>`;

  function poste(S) {
    let s = `${DEFS}<g id="poste">${FIL(640, 330, 64)}
      <rect x="0" y="592" width="1200" height="28" fill="#e9dfcf"/>
      <rect x="44" y="236" width="12" height="350" rx="5" fill="#56657a"/><rect x="44" y="574" width="170" height="14" rx="6" fill="#56657a"/>
      <circle cx="86" cy="592" r="22" fill="#2c333b"/><circle cx="86" cy="592" r="8" fill="#8a96a3"/>
      <g data-cible="bouteille" class="touche${halo(S, 'bouteille')}">${bouteille(70, '#1f2328', 'AZOTE')}</g>
      <line x1="56" y1="300" x2="186" y2="300" stroke="#4d5763" stroke-width="7" stroke-dasharray="11 6"/>
      <g data-cible="robinet" class="touche${halo(S, 'robinet')}">
      <rect x="104" y="112" width="42" height="30" rx="5" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="121" y="96" width="8" height="18" fill="#4d5763"/>
      <ellipse cx="125" cy="94" rx="30" ry="8" fill="${S.ouverte ? '#1e7e54' : '#2c333b'}"/>
      <rect x="146" y="120" width="${S.monte ? 4 : 18}" height="14" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/></g>`;
    // le flexible jaune (détendeur → manifold) et les flexibles du circuit (manifold → vannes de service)
    if (S.monte && S.flexible) s += `<path d="M215 178 V480 C215 560 600 560 600 470 V388" fill="none" stroke="#9a7b00" stroke-width="13" stroke-linecap="round"/>
      <path d="M215 178 V480 C215 560 600 560 600 470 V388" fill="none" stroke="#f2c230" stroke-width="8" stroke-linecap="round"/>`;
    if (S.manifold && S.raccorde) s += `<path d="M560 388 V430 C560 520 760 540 868 528" fill="none" stroke="#1f5fae" stroke-width="9" stroke-linecap="round"/>
      <path d="M640 388 V420 C640 480 760 470 868 470" fill="none" stroke="#b3261e" stroke-width="9" stroke-linecap="round"/>`;
    if (S.monte) s += `<g data-cible="detendeur">
      <rect x="162" y="110" width="88" height="40" rx="10" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="146" y="116" width="20" height="22" rx="3" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/>
      <line x1="195" y1="96" x2="195" y2="112" stroke="#6b5420" stroke-width="6"/><line x1="272" y1="96" x2="240" y2="116" stroke="#6b5420" stroke-width="6"/>
      <rect x="205" y="150" width="20" height="30" rx="4" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="1.5"/></g>
      <g data-cible="vis" class="touche${halo(S, 'vis')}"><rect x="250" y="124" width="${10 + 10 * (1 - S.vis / 60)}" height="12" fill="#8a96a3"/>
      <rect x="${260 + 10 * (1 - S.vis / 60)}" y="110" width="15" height="40" rx="5" fill="#2c333b"/></g>
      <g class="jauge" data-j="hp">${cadran('hp', S.p.hp, 195, 62, 36)}</g><g class="jauge" data-j="bp">${cadran('bp', S.p.bp, 274, 62, 36)}</g>`;
    // le manifold
    if (S.manifold) s += `<g data-cible="manifold">
      <rect x="490" y="296" width="220" height="64" rx="14" fill="#c9d1da" stroke="#4d5763" stroke-width="2.5"/>
      <rect x="550" y="360" width="20" height="28" fill="#1f5fae"/><rect x="590" y="360" width="20" height="28" fill="#f2c230"/><rect x="630" y="360" width="20" height="28" fill="#b3261e"/></g>
      <g class="jauge" data-j="mbp"><circle cx="545" cy="246" r="54" fill="#1f5fae"/>${cadran('mbp', S.circuit, 545, 246, 48)}</g>
      <g class="jauge" data-j="mhp"><circle cx="655" cy="246" r="54" fill="#b3261e"/>${cadran('mhp', S.circuit, 655, 246, 48)}</g>
      <g data-cible="vanne-bp" class="touche${halo(S, 'vanne-bp')}"><circle cx="480" cy="328" r="22" fill="#1f5fae" stroke="#2c333b" stroke-width="2.5"/><line x1="480" y1="328" x2="${S.vannes ? 480 : 466}" y2="${S.vannes ? 310 : 328}" stroke="#fffdf8" stroke-width="5" stroke-linecap="round"/></g>
      <g data-cible="vanne-hp" class="touche${halo(S, 'vanne-hp')}"><circle cx="720" cy="328" r="22" fill="#b3261e" stroke="#2c333b" stroke-width="2.5"/><line x1="720" y1="328" x2="${S.vannes ? 720 : 734}" y2="${S.vannes ? 310 : 328}" stroke="#fffdf8" stroke-width="5" stroke-linecap="round"/></g>
      <text x="600" y="182" text-anchor="middle" style="font:800 26px Calibri,Arial;fill:#1b3a63">Manifold</text>`;
    // le groupe de condensation et sa plaque
    s += `<g data-cible="groupe"><rect x="868" y="330" width="300" height="250" rx="12" fill="#dfe4ea" stroke="#4d5763" stroke-width="3"/>
      <circle cx="1060" cy="455" r="88" fill="#c9d1da" stroke="#4d5763" stroke-width="3"/>
      ${[0, 72, 144, 216, 288].map(a => `<path d="M1060 455 l${Math.cos(a * Math.PI / 180) * 70} ${Math.sin(a * Math.PI / 180) * 70} l${Math.cos((a + 40) * Math.PI / 180) * 20} ${Math.sin((a + 40) * Math.PI / 180) * 20} Z" fill="#8a96a3"/>`).join('')}
      <rect x="854" y="462" width="18" height="16" fill="url(#g-laiton)" stroke="#6b5420"/><rect x="854" y="520" width="18" height="16" fill="url(#g-laiton)" stroke="#6b5420"/>
      <text x="1018" y="610" text-anchor="middle" style="font:800 24px Calibri,Arial;fill:#1b3a63">Groupe de condensation</text></g>
      <g data-cible="plaque" class="touche${halo(S, 'plaque')}"><rect x="884" y="346" width="96" height="62" rx="4" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/>
      <line x1="894" y1="362" x2="970" y2="362" stroke="#56657a" stroke-width="3"/><line x1="894" y1="376" x2="960" y2="376" stroke="#56657a" stroke-width="3"/>
      <line x1="894" y1="390" x2="966" y2="390" stroke="#b3261e" stroke-width="3"/></g>`;
    if (S.fuite && S.bulles) s += `<g class="bulles">${[0, 1, 2].map(i => `<circle cx="${862 + i * 9}" cy="${512 - i * 4}" r="${4 + i}" fill="#e8f4ff" stroke="#3d7fca" stroke-width="1.5" style="animation-delay:${-i * .4}s"/>`).join('')}</g>`;
    if (S.anim.pfff) {
      const [x, y] = S.anim.pfff;
      s += `<g class="pfff">${[0, 1, 2, 3].map(i => `<circle cx="${x + 18 + i * 16}" cy="${y - i * 6}" r="${8 + i * 5}" fill="#c9d1da" opacity="${.8 - i * .15}"/>`).join('')}</g>`;
    }
    return s + '</g>';
  }

  /* ---------- les vues de près ---------- */
  function vueBouteilles(S) {
    const B = { O: ['#fbfaf5', 'l’oxygène'], A: ['#7a3324', 'l’acétylène'], N: ['#1f2328', 'l’azote'] };
    return { vb: '0 140 600 470', svg: `${FIL(300, 600, 30)}<rect x="0" y="582" width="600" height="28" fill="#e9dfcf"/>
      ${S.ordre.map((g, i) => `<g data-cible="b-${g}" class="touche">${bouteille(40 + i * 190, B[g][0], '', true)}</g>`).join('')}` };
  }
  function vueDetendeur(S) {
    return { vb: '0 0 640 326', svg: `${FIL(320, 318, 30)}
      ${cadran('hp', S.p.hp, 170, 140, 92)}${cadran('bp', S.p.bp, 450, 140, 112)}
      <text x="170" y="272" text-anchor="middle" style="font:700 22px Calibri,Arial;fill:#1b3a63">cadran bouteille</text>
      <text x="450" y="290" text-anchor="middle" style="font:700 22px Calibri,Arial;fill:#1b3a63">cadran de sortie, vers le circuit</text>` };
  }
  function vueManifold(S) {
    return { vb: '0 0 640 300', svg: `${FIL(320, 292, 30)}
      <circle cx="170" cy="140" r="122" fill="#1f5fae"/>${cadran('mbp', S.circuit, 170, 140, 110)}
      <circle cx="470" cy="140" r="122" fill="#b3261e"/>${cadran('mhp', S.circuit, 470, 140, 110)}
      <text x="320" y="286" text-anchor="middle" style="font:700 22px Calibri,Arial;fill:#1b3a63">le manifold : la pression dans le circuit</text>` };
  }
  function vuePlaque(P) {
    const l = (y, t, v, rouge) => `<text x="40" y="${y}" style="font:700 26px Calibri,Arial;fill:#56657a">${t}</text>
      <text x="230" y="${y}"${String(v).length * 15 > 380 ? ' textLength="380" lengthAdjust="spacingAndGlyphs"' : ''} style="font:800 28px Calibri,Arial;fill:${rouge ? '#b3261e' : '#10233c'}">${v}</text>`;
    return { vb: '0 0 640 330', svg: `${FIL(470, 316, 26)}
      <rect x="14" y="14" width="612" height="290" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
      <circle cx="34" cy="34" r="6" fill="#8a96a3"/><circle cx="606" cy="34" r="6" fill="#8a96a3"/><circle cx="34" cy="284" r="6" fill="#8a96a3"/><circle cx="606" cy="284" r="6" fill="#8a96a3"/>
      ${l(70, 'Fabricant', P.fabricant)}${l(112, 'Modèle', P.modele)}${l(154, 'Fluide', P.fluide)}
      ${l(206, 'PS côté HP', String(P.psHP).replace('.', ',') + ' bar', true)}${l(250, 'PS côté BP', String(P.psBP).replace('.', ',') + ' bar', true)}
      <text x="320" y="290" text-anchor="middle" style="font:600 16px Calibri,Arial;fill:#56657a">d’après la ${P.source}</text>` };
  }

  return { poste, JAUGES, vueBouteilles, vueDetendeur, vueManifold, vuePlaque };
})();
