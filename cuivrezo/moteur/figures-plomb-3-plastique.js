/* CuivRézo — figures des plastiques : « pvc » (raccords · couper · chanfrein · repere · depolir · encoller · emboiter
   · excedent · joint-ok · biais · court · sec · bourrelet) et « per » (raccords · coupe · calibrer · compression ·
   glissement · cintrer · collier · ok · pli).
   Dessinées pour la ligne 5, d'après les fiches de F. Henninot (« Canalisations PVC », « Le P.E.R ») et la fiche du fabricant
   WATTS (coupe, raccords à glissement, support coudé). Le multicouche (calibrage) et les raccords automatiques sont des
   connaissances générales : voir les `aValider` des stations. Se charge après figures-plomb-1-base.js. */

(() => {
  'use strict';
  const { defs, tube, cyl, bloc, souple, STROKE, NAVY } = window.CuivPlomb;
  const OR = '#e6891f';
  const fils = (x0, x1, y0, y1) => Array.from({ length: Math.floor((x1 - x0) / 8) }, (_, i) => `<line x1="${x0 + i * 8}" y1="${y1}" x2="${x0 + i * 8 + 5}" y2="${y0}" stroke="${OR}" stroke-width="3" stroke-linecap="round"/>`).join('');
  const ST = '#4d5763', JAUNE = '#f2b800';

  /* ------------------------------------------------------------------ le PVC */
  /* coupe longitudinale : un tube PVC emboîté dans un raccord, avec sa couche de colle ; v = variante */
  function emb(v) {
    const fin = v === 'court' ? 420 : 500;                           /* où s'arrête le bout du tube */
    const oblique = v === 'biais';
    const mur = (y0, y1, haut) => oblique
      ? `<path d="M90 ${y0} H${haut ? 500 : 450} L${haut ? 500 : 480} ${y1} H90 Z" fill="url(#cz-p-pvc)" stroke="${STROKE.pvc}" stroke-width="2"/>`
      : `<rect x="90" y="${y0}" width="${fin - 90}" height="${y1 - y0}" fill="url(#cz-p-pvc)" stroke="${STROKE.pvc}" stroke-width="2"/>`;
    const colle = (y, plein) => plein ? `<rect x="290" y="${y}" width="${fin - 290}" height="8" fill="${JAUNE}" stroke="#8a6a00" stroke-width="1.5"/>` : '';
    return `
      <path d="M290 180 H560 V320 H290 V292 H500 V268 H560 V232 H500 V208 H290 Z" fill="#8f979f" stroke="#5d656d" stroke-width="3" fill-rule="evenodd"/>
      <rect x="500" y="212" width="60" height="20" fill="#8f979f"/><rect x="500" y="268" width="60" height="20" fill="#8f979f"/>
      ${mur(216, 230, true)}${mur(270, 284, false)}
      ${colle(208, true)}${colle(284, v !== 'sec')}
      ${v === 'bourrelet' ? `<ellipse cx="486" cy="250" rx="22" ry="26" fill="${JAUNE}" stroke="#9a7d10" stroke-width="2"/><ellipse cx="282" cy="212" rx="14" ry="9" fill="${JAUNE}" stroke="#9a7d10" stroke-width="2"/>` : ''}
      ${v === 'court' ? `<rect x="244" y="212" width="8" height="74" fill="#c9451a"/>` : ''}`;
  }

  CuivFigures.ajouter('pvc', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'joint-ok') return cadre(`${defs}${emb('ok')}
      ${etiquette(400, 212, 600, 110, 'Colle')}${etiquette(480, 250, 600, 400, 'Tube en butée')}
      ${verdict(true, 'Joint plein, tube jusqu’au fond', 400, 456)}`, 'Un collage réussi');
    if (etat === 'biais') return cadre(`${defs}${emb('biais')}
      ${etiquette(470, 290, 600, 400, 'Jour au fond')}
      ${verdict(false, 'Coupe de travers : le joint ne sera pas plein', 400, 456)}`, 'Coupe de travers');
    if (etat === 'court') return cadre(`${defs}${emb('court')}
      ${etiquette(248, 250, 180, 120, 'Repère loin')}${etiquette(460, 250, 600, 400, 'Vide au fond')}
      ${verdict(false, 'Pas jusqu’au repère : emboîtement incomplet', 400, 456)}`, 'Emboîtement incomplet');
    if (etat === 'sec') return cadre(`${defs}${emb('sec')}
      ${etiquette(400, 212, 600, 110, 'Colle')}${etiquette(400, 286, 600, 400, 'Pas de colle ici')}
      ${verdict(false, 'Colle sur une seule face : le joint fuira', 400, 456)}`, 'Colle sur une seule pièce');
    if (etat === 'bourrelet') return cadre(`${defs}${emb('bourrelet')}
      ${etiquette(486, 226, 600, 110, 'Colle en trop')}${etiquette(282, 212, 180, 120, 'Bourrelet')}
      ${verdict(false, 'Trop de colle : elle gêne et fragilise', 400, 456)}`, 'Trop de colle');

    if (etat === 'raccords') {
      const g = `fill="url(#cz-p-pvc)" stroke="${NAVY}" stroke-width="2.5" stroke-linejoin="round"`;
      /* tulipe : le bout femelle, plus large, avec son bourrelet */
      const tv = (x, cy, h, sens) => `<rect x="${sens > 0 ? x : x - 30}" y="${cy - h / 2}" width="30" height="${h}" rx="7" ${g}/><rect x="${sens > 0 ? x + 24 : x - 36}" y="${cy - h / 2 - 3}" width="12" height="${h + 6}" rx="4" ${g}/>`;
      const th = (cx, y, w, sens) => `<rect x="${cx - w / 2}" y="${sens > 0 ? y : y - 30}" width="${w}" height="30" rx="7" ${g}/><rect x="${cx - w / 2 - 3}" y="${sens > 0 ? y + 24 : y - 36}" width="${w + 6}" height="12" rx="4" ${g}/>`;
      const L = [
        ['Coude 90°', 'MF ou FF', `<path d="M-40 30 H0 V-40" fill="none" stroke="${NAVY}" stroke-width="40" stroke-linejoin="round"/><path d="M-40 30 H0 V-40" fill="none" stroke="#dfe4ea" stroke-width="35" stroke-linejoin="round"/>${tv(-60, 30, 50, 1)}${th(0, -66, 50, 1)}`],
        ['Coude 45°', 'MF ou FF', `<path d="M-44 34 H-6 L28 -8" fill="none" stroke="${NAVY}" stroke-width="40" stroke-linejoin="round"/><path d="M-44 34 H-6 L28 -8" fill="none" stroke="#dfe4ea" stroke-width="35" stroke-linejoin="round"/>${tv(-64, 34, 50, 1)}<g transform="translate(28,-8) rotate(-50)"><rect x="-2" y="-25" width="30" height="50" rx="7" ${g}/><rect x="22" y="-28" width="12" height="56" rx="4" ${g}/></g>`],
        ['Té', 'FFF', `<rect x="-50" y="-18" width="100" height="36" rx="6" ${g}/><rect x="-18" y="-50" width="36" height="40" rx="6" ${g}/>${tv(-56, 0, 46, 1)}${tv(56, 0, 46, -1)}${th(0, -76, 46, 1)}`],
        ['Manchon', 'FF', `<rect x="-44" y="-20" width="88" height="40" rx="6" ${g}/>${tv(-62, 0, 52, 1)}${tv(62, 0, 52, -1)}<line x1="0" y1="-20" x2="0" y2="20" stroke="${NAVY}" stroke-width="2.5"/>`],
        ['Réduction', 'deux diamètres', `<path d="M-30 -20 L30 -12 V12 L-30 20 Z" ${g}/>${tv(-60, 0, 52, 1)}${tv(46, 0, 36, 1)}`],
        ['Bouchon', 'ferme un bout', `<rect x="-24" y="-24" width="52" height="48" rx="16" ${g}/>${tv(-50, 0, 52, 1)}<path d="M18 -14 q10 14 0 28" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>`]
      ];
      return cadre(`${defs}${L.map(([n, c, d], i) => { const x = 135 + (i % 3) * 265, y = 100 + Math.floor(i / 3) * 170;
        return `<g transform="translate(${x},${y}) scale(1.05)">${d}</g><text x="${x}" y="${y + 84}" text-anchor="middle" class="cz-txt">${n}</text><text x="${x}" y="${y + 106}" text-anchor="middle" class="cz-pt">${c}</text>`; }).join('')}
        <text x="400" y="452" text-anchor="middle" class="cz-txt">Un tube PVC ne se cintre jamais</text>
        <text x="400" y="480" text-anchor="middle" class="cz-pt">pour changer de direction : un raccord</text>`, 'Les raccords PVC');
    }

    if (etat === 'couper') {
      return cadre(`${defs}${tube(70, 730, 300, 70, 'pvc')}
        <rect x="336" y="238" width="120" height="16" rx="3" fill="#6b7d99" stroke="#33415c" stroke-width="2"/><rect x="336" y="346" width="120" height="16" rx="3" fill="#6b7d99" stroke="#33415c" stroke-width="2"/>
        <rect x="383" y="140" width="14" height="250" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2"/>
        ${Array.from({ length: 12 }, (_, i) => `<path d="M383 ${300 + i * 8} l-8 4 l8 4 z" fill="#2c333b"/>`).join('')}
        <rect x="360" y="96" width="60" height="50" rx="12" fill="url(#cz-rouge)" stroke="#6d1610" stroke-width="3"/>
        <path d="M390 392 v-60" stroke="#c9451a" stroke-width="4" stroke-dasharray="7 6"/>
        ${etiquette(390, 120, 520, 100, 'Scie à denture fine')}
        ${etiquette(456, 246, 560, 186, 'Boîte à coupes')}
        ${etiquette(660, 300, 640, 420, 'Tube PVC')}
        <text x="400" y="486" text-anchor="middle" class="cz-pt">La boîte guide la scie : la coupe est nette et droite</text>`, 'Couper le PVC à la scie');
    }

    if (etat === 'chanfrein') {
      const panneau = (x, bon) => `<g transform="translate(${x},0)">
        <rect x="-170" y="226" width="140" height="44" fill="url(#cz-p-pvc)" stroke="${STROKE.pvc}" stroke-width="2"/>
        ${bon ? `<path d="M-30 226 L-6 226 L24 244 L24 270 L-30 270 Z" fill="url(#cz-p-pvc)" stroke="${STROKE.pvc}" stroke-width="2"/>` : `<rect x="-30" y="226" width="54" height="44" fill="url(#cz-p-pvc)" stroke="${STROKE.pvc}" stroke-width="2"/>`}
        <rect x="-170" y="220" width="${bon ? 164 : 190}" height="6" fill="${JAUNE}"/>
        ${bon ? '' : `<path d="M24 226 q16 -8 22 4 q4 14 -12 14 q-18 0 -10 -18z" fill="${JAUNE}" stroke="#9a7d10" stroke-width="2"/>`}
        <circle cx="${bon ? 6 : 24}" cy="${bon ? 232 : 226}" r="22" fill="none" stroke="${bon ? '#1e7e54' : '#b3261e'}" stroke-width="5"/></g>`;
      return cadre(`${defs}${panneau(260, false)}${panneau(660, true)}
        <text x="190" y="340" text-anchor="middle" class="cz-ko">✘ Arête vive</text><text x="190" y="372" text-anchor="middle" class="cz-pt">elle racle la colle</text>
        <text x="590" y="340" text-anchor="middle" class="cz-ok">✔ Chanfrein</text><text x="590" y="372" text-anchor="middle" class="cz-pt">la colle reste sur le tube</text>
        <text x="400" y="120" text-anchor="middle" class="cz-txt">Le bout du tube, vu en coupe</text>
        <text x="400" y="460" text-anchor="middle" class="cz-pt">Toile abrasive : on enlève les bavures, puis on casse l’arête extérieure</text>`, 'Ébavurer et chanfreiner');
    }

    if (etat === 'repere') {
      return cadre(`${defs}${tube(70, 570, 260, 70, 'pvc')}
        <rect x="420" y="190" width="220" height="140" rx="16" fill="#8f979f" fill-opacity=".55" stroke="#5d656d" stroke-width="3"/>
        <rect x="414" y="222" width="8" height="76" rx="2" fill="#c9451a"/>
        <line x1="422" y1="350" x2="570" y2="350" class="cz-cote"/>
        <text x="496" y="386" text-anchor="middle" class="cz-txt">longueur d’emboîtement</text>
        <path d="M250 222 v-22 M520 190 v-22" stroke="#c9451a" stroke-width="6"/><path d="M250 200 L520 168" stroke="#c9451a" stroke-width="2.5" stroke-dasharray="8 6"/>
        ${etiquette(418, 260, 300, 130, 'Repère au feutre')}
        ${etiquette(385, 200, 140, 92, 'Repère de sens', 'cz-txt', 'start')}
        <text x="400" y="460" text-anchor="middle" class="cz-pt">On emboîte à sec jusqu’au fond, puis on marque</text>`, 'Repérer l’emboîtement');
    }

    if (etat === 'depolir') {
      return cadre(`${defs}${tube(70, 520, 270, 70, 'pvc')}
        <g class="cz-va"><rect x="270" y="216" width="100" height="108" rx="10" fill="#c9b27a" stroke="#7a6732" stroke-width="3"/>
          ${Array.from({ length: 22 }, (_, i) => `<circle cx="${282 + (i % 6) * 15}" cy="${232 + Math.floor(i / 6) * 22}" r="2.6" fill="#6a5a2c"/>`).join('')}</g>
        <path d="M290 190 h60 m0 0 l-10 -10 m10 10 l-10 10 M290 190 h-20" stroke="#c9451a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M626 258 Q626 244 640 240 H656 Q670 244 670 258 V352 Q670 364 658 364 H638 Q626 364 626 352 Z" fill="#dbeaf6" stroke="${NAVY}" stroke-width="3"/><rect x="626" y="290" width="44" height="34" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/><rect x="638" y="220" width="20" height="22" rx="3" fill="#dbeaf6" stroke="${NAVY}" stroke-width="3"/><rect x="632" y="204" width="32" height="18" rx="4" fill="${OR}" stroke="${NAVY}" stroke-width="3"/><path d="M664 210 h22 q6 0 6 6" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/><path d="M632 262 v18" stroke="#fff" stroke-width="4" opacity=".7"/>
        <path d="M540 342 Q548 324 582 328 Q606 332 604 358 Q600 380 568 378 Q540 376 540 342 Z" fill="#fff" stroke="${NAVY}" stroke-width="3"/><path d="M546 350 Q572 340 600 350 M548 364 Q574 356 598 366" fill="none" stroke="${NAVY}" stroke-width="2"/><path d="M572 330 Q582 352 568 376" fill="none" stroke="${OR}" stroke-width="2.5"/>
        ${etiquette(320, 320, 330, 410, 'Toile abrasive : on dépolit')}
        ${etiquette(648, 290, 680, 170, 'Nettoyant')}
        <text x="400" y="466" text-anchor="middle" class="cz-pt">Dépolir les deux pièces, puis dégraisser avant de coller</text>`, 'Dépolir et nettoyer');
    }

    if (etat === 'encoller') {
      return cadre(`${defs}${tube(60, 330, 280, 70, 'pvc')}<rect x="250" y="236" width="80" height="12" fill="${JAUNE}"/><rect x="250" y="312" width="80" height="12" fill="${JAUNE}"/>
        <path d="M470 190 H700 V370 H470 Z" fill="#8f979f" fill-opacity=".6" stroke="#5d656d" stroke-width="3"/>
        <rect x="470" y="238" width="170" height="84" fill="#fbf6ee" stroke="#5d656d" stroke-width="2"/><rect x="470" y="238" width="170" height="12" fill="${JAUNE}"/><rect x="470" y="310" width="170" height="12" fill="${JAUNE}"/>
        <g transform="translate(212,170) rotate(28)"><rect x="0" y="0" width="30" height="110" rx="6" fill="#2c333b"/><rect x="-4" y="108" width="38" height="26" rx="4" fill="#c9b27a" stroke="#7a6732" stroke-width="2"/></g>
        ${etiquette(290, 236, 230, 120, 'Colle sur le tube')}
        ${etiquette(560, 244, 500, 130, 'Colle dans le raccord')}
        <text x="400" y="440" text-anchor="middle" class="cz-txt">Une couche mince, sur les deux pièces</text>
        <text x="400" y="476" text-anchor="middle" class="cz-pt">Pinceau : le tube (mâle) d’abord, puis l’intérieur du raccord (femelle)</text>`, 'Encoller les deux pièces');
    }

    if (etat === 'emboiter') {
      return cadre(`${defs}${tube(60, 470, 280, 70, 'pvc')}
        <path d="M470 200 H700 V360 H470 Z" fill="#8f979f" fill-opacity=".6" stroke="#5d656d" stroke-width="3"/><rect x="464" y="242" width="8" height="76" rx="2" fill="#c9451a"/>
        <path d="M110 212 h90 m0 0 l-12 -11 m12 11 l-12 11" stroke="#c9451a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="626" y="44" width="28" height="14" rx="4" fill="${OR}" stroke="${NAVY}" stroke-width="3"/><path d="M684 70 l14 -12" stroke="${NAVY}" stroke-width="7" stroke-linecap="round"/><circle cx="640" cy="110" r="52" fill="#fff" stroke="#1b3a63" stroke-width="5"/><path d="M640 110 V68 M640 110 L670 128" stroke="#1b3a63" stroke-width="6" stroke-linecap="round"/>
        <text x="640" y="190" text-anchor="middle" class="cz-gr">30 s</text>
        <path d="M290 140 a40 40 0 1 1 -10 40" fill="none" stroke="#b3261e" stroke-width="5" marker-end="url(#cz-fl)"/>
        <text x="258" y="120" text-anchor="middle" class="cz-ko" style="font-size:40px">✘</text>
        ${etiquette(468, 280, 520, 410, 'Repère au bord du raccord')}
        <text x="400" y="470" text-anchor="middle" class="cz-pt">Un seul mouvement droit, jusqu’au repère ; on tient sans tourner</text>`, 'Emboîter et tenir');
    }

    if (etat === 'excedent') {
      return cadre(`${defs}${tube(60, 400, 270, 70, 'pvc')}
        <path d="M400 200 H650 V340 H400 Z" fill="#8f979f" fill-opacity=".6" stroke="#5d656d" stroke-width="3"/><rect x="394" y="236" width="12" height="68" rx="3" fill="${JAUNE}"/>
        <path d="M300 160 q30 -40 70 -10 q30 30 -10 52 q-50 8 -60 -42z" fill="#fff" stroke="#8a929b" stroke-width="3"/><path d="M360 200 l30 40" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/>
        <rect x="552" y="82" width="190" height="104" rx="14" fill="#e9f1fb" stroke="#1b3a63" stroke-width="3"/>
        <rect x="595" y="96" width="18" height="9" rx="3" fill="${OR}" stroke="${NAVY}" stroke-width="2.5"/><circle cx="604" cy="134" r="30" fill="#fff" stroke="#1b3a63" stroke-width="4"/><path d="M604 134 V114 M604 134 L618 142" stroke="#1b3a63" stroke-width="4" stroke-linecap="round"/>
        ${bloc(648, 128, 'quelques heures', 11, 'cz-txt', 'start', 26)}
        ${etiquette(400, 270, 480, 420, 'Colle en trop, à essuyer')}
        <text x="400" y="478" text-anchor="middle" class="cz-pt">On essuie, puis on attend avant d’utiliser : temps exact sur la notice de la colle</text>`, 'Essuyer et laisser prendre');
    }
    return CuivFigures.dessiner('pvc', 'raccords');
  });

  /* ------------------------------------------------------------------ le PER et le multicouche */
  CuivFigures.ajouter('per', (etat, { cadre, etiquette, verdict }) => {
    const lai = 'fill="url(#cz-p-laiton)" stroke="#6e5010" stroke-width="3"';
    if (etat === 'raccords') {
      const lg = `fill="url(#cz-p-laiton)" stroke="${NAVY}" stroke-width="2.5" stroke-linejoin="round"`;
      const bague = (x, h) => `<rect x="${x}" y="${60 - h / 2}" width="16" height="${h}" rx="5" fill="url(#cz-p-inox)" stroke="${NAVY}" stroke-width="2.5"/>`;
      const C = [
        { n: 'À sertir', t: 'bague serrée à la presse', ico: `${cyl(4, 52, 60, 24, 'multi', true)}<rect x="44" y="40" width="58" height="40" rx="6" ${lg}/>${bague(50, 52)}<path d="M62 44 v32 M70 44 v32" stroke="${NAVY}" stroke-width="2"/><rect x="102" y="46" width="40" height="28" rx="3" ${lg}/>${fils(106, 140, 48, 72)}` },
        { n: 'À glissement', t: 'bague qui coulisse sur le tube évasé', ico: `${cyl(4, 40, 60, 24, 'bleu')}<path d="M40 48 L58 40 V80 L40 72 Z" fill="url(#cz-p-bleu)" stroke="${NAVY}" stroke-width="2.5"/>${bague(26, 50)}<rect x="62" y="44" width="26" height="32" rx="3" ${lg}/>${[70, 78, 86].map(x => `<rect x="${x - 3}" y="40" width="6" height="40" rx="2" ${lg}/>`).join('')}<rect x="98" y="46" width="42" height="28" rx="3" ${lg}/>${fils(102, 138, 48, 72)}` },
        { n: 'À compression', t: 'écrou, bague et insert', ico: `${cyl(4, 36, 60, 24, 'bleu')}<rect x="36" y="36" width="34" height="48" rx="7" ${lg}/><line x1="36" y1="52" x2="70" y2="52" stroke="${NAVY}" stroke-width="1.8"/><line x1="36" y1="68" x2="70" y2="68" stroke="${NAVY}" stroke-width="1.8"/><rect x="70" y="42" width="34" height="36" rx="4" ${lg}/><rect x="104" y="46" width="38" height="28" rx="3" ${lg}/>${fils(108, 140, 48, 72)}` },
        { n: 'Automatique', t: 'on enfonce, c’est tout', ico: `${cyl(4, 50, 60, 24, 'bleu')}<rect x="46" y="38" width="22" height="44" rx="6" fill="url(#cz-p-inox)" stroke="${NAVY}" stroke-width="2.5"/><rect x="66" y="42" width="52" height="36" rx="6" ${lg}/><rect x="118" y="48" width="24" height="24" rx="3" ${lg}/><path d="M10 22 h36 m0 0 l-10 -9 m10 9 l-10 9" stroke="${OR}" stroke-width="5" fill="none" stroke-linecap="round"/>` }
      ];
      return cadre(`${defs}${C.map((c, i) => { const x = 22 + i * 193;
        return `<rect x="${x}" y="50" width="182" height="360" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><rect x="${x}" y="50" width="182" height="48" rx="14" fill="#1b3a63"/><rect x="${x}" y="76" width="182" height="22" fill="#1b3a63"/>
          <text x="${x + 91}" y="82" text-anchor="middle" class="cz-bl">${c.n}</text><g transform="translate(${x + 12},118) scale(.92)">${c.ico}</g>
          ${bloc(x + 91, 262, c.t, 14, 'cz-txt', 'middle', 28)}`; }).join('')}
        <text x="400" y="456" text-anchor="middle" class="cz-pt">Le choix dépend du tube et de la marque : la notice du fabricant dit lequel</text>`, 'Les quatre familles de raccords');
    }

    if (etat === 'coupe') {
      return cadre(`${defs}${tube(60, 500, 260, 50, 'bleu')}
        <path d="M300 130 L360 232 M420 130 L360 232" stroke="#2c333b" stroke-width="22" stroke-linecap="round"/>
        <path d="M300 130 L360 232 M420 130 L360 232" stroke="url(#cz-rouge)" stroke-width="16" stroke-linecap="round"/>
        <path d="M360 232 L330 292 M360 232 L390 292" stroke="url(#cz-ac)" stroke-width="12" stroke-linecap="round"/><circle cx="360" cy="232" r="10" fill="#2c333b"/>
        <path d="M360 224 V300" stroke="#c9451a" stroke-width="3" stroke-dasharray="6 5"/>
        <rect x="560" y="70" width="210" height="340" rx="14" fill="#fff1ef" stroke="#b3261e" stroke-width="3"/>
        <text x="665" y="110" text-anchor="middle" class="cz-ko">✘ Jamais</text>
        <path d="M600 190 L720 160 L728 176 L610 214 Z" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2.5"/><path d="M600 190 l-26 8 l8 22 l28 -6 z" fill="#2c333b"/>
        <path d="M590 320 h130 l-4 20 h-122 z" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2.5"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${594 + i * 11.5} 340 l5 9 l5 -9" fill="url(#cz-ac)" stroke="${ST}" stroke-width="1.5"/>`).join('')}
        <text x="665" y="240" text-anchor="middle" class="cz-pt">le couteau</text><text x="665" y="378" text-anchor="middle" class="cz-pt">la scie à métaux</text>
        ${etiquette(330, 150, 160, 100, 'Coupe-tube adapté', 'cz-txt', 'start')}
        <text x="300" y="440" text-anchor="middle" class="cz-pt">Une coupe nette, d’équerre</text>`, 'Couper au coupe-tube');
    }

    if (etat === 'calibrer') {
      const mur = (y, h) => `<rect x="80" y="${y}" width="440" height="${h}" fill="url(#cz-p-multi)" stroke="${STROKE.multi}" stroke-width="2"/>`;
      return cadre(`${defs}${mur(150, 22)}<rect x="80" y="172" width="440" height="6" fill="url(#cz-p-inox)" stroke="#8f9aa5" stroke-width="1.5"/>${mur(178, 22)}
        ${mur(250, 22)}<rect x="80" y="272" width="440" height="6" fill="url(#cz-p-inox)" stroke="#8f9aa5" stroke-width="1.5"/>${mur(278, 22)}
        <rect x="80" y="200" width="440" height="50" fill="#f1e8dc"/>
        <path d="M440 225 L560 205 V245 Z" fill="url(#cz-p-laiton)" stroke="#6e5010" stroke-width="3"/><rect x="560" y="212" width="80" height="26" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2"/>
        <circle cx="660" cy="225" r="26" fill="#c9631a" stroke="#6a3208" stroke-width="3"/>
        <ellipse cx="190" cy="388" rx="62" ry="44" fill="none" stroke="#b3261e" stroke-width="12"/><circle cx="500" cy="388" r="46" fill="none" stroke="#1e7e54" stroke-width="12"/>
        <text x="190" y="470" text-anchor="middle" class="cz-ko" style="font-size:22px">avant : ovale</text><text x="500" y="470" text-anchor="middle" class="cz-ok" style="font-size:22px">après : rond</text>
        <path d="M280 388 h120" stroke="#1b3a63" stroke-width="5" marker-end="url(#cz-fl)"/>
        ${etiquette(500, 225, 600, 130, 'Calibreur')}
        ${etiquette(300, 164, 120, 110, 'Aluminium', 'cz-txt', 'start')}`, 'Calibrer et ébavurer le multicouche');
    }

    if (etat === 'compression') {
      const lg = `fill="url(#cz-p-laiton)" stroke="${NAVY}" stroke-width="2.5" stroke-linejoin="round"`;
      const pieces = [
        ['Tube', `${cyl(30, 150, 0, 40, 'bleu')}`],
        ['Écrou', `<rect x="-30" y="-38" width="60" height="76" rx="9" ${lg}/><line x1="-30" y1="-13" x2="30" y2="-13" stroke="${NAVY}" stroke-width="2"/><line x1="-30" y1="13" x2="30" y2="13" stroke="${NAVY}" stroke-width="2"/><ellipse cx="-30" cy="0" rx="8" ry="20" fill="#a77d1f" stroke="${NAVY}" stroke-width="2"/>`],
        ['Bague', `<path d="M-10 -26 L10 -18 V18 L-10 26 Z" fill="url(#cz-p-inox)" stroke="${NAVY}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-4 -20 V20" stroke="#fff" stroke-width="3" opacity=".7"/>`],
        ['Insert', `<rect x="-44" y="-18" width="56" height="36" rx="3" ${lg}/>${fils(-40, 8, -16, 16)}<rect x="12" y="-28" width="14" height="56" rx="4" ${lg}/>`],
        ['Raccord', `<rect x="-26" y="-40" width="40" height="80" rx="8" ${lg}/><line x1="-26" y1="-14" x2="14" y2="-14" stroke="${NAVY}" stroke-width="2"/><line x1="-26" y1="14" x2="14" y2="14" stroke="${NAVY}" stroke-width="2"/><rect x="14" y="-22" width="40" height="44" rx="3" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>${fils(18, 52, -20, 20)}<rect x="-50" y="-26" width="26" height="52" rx="4" ${lg}/>`]
      ];
      return cadre(`${defs}${pieces.map(([n, d], i) => { const x = i === 0 ? 0 : 150 + i * 120;
        return `<g transform="translate(${i === 0 ? 0 : x},250)">${d}</g><text x="${i === 0 ? 90 : x}" y="340" text-anchor="middle" class="cz-txt">${i + 1} · ${n}</text>`; }).join('')}
        <path d="M70 160 h640" stroke="#1b3a63" stroke-width="3" stroke-dasharray="8 7" marker-end="url(#cz-fl)"/>
        <text x="400" y="130" text-anchor="middle" class="cz-pt">dans cet ordre : écrou, bague, puis l’insert dans le tube</text>
        <text x="400" y="420" text-anchor="middle" class="cz-pt">Insert vissé à l’intérieur du tube avec la clé de montage, puis écrou serré sur le raccord</text>
        <text x="400" y="460" text-anchor="middle" class="cz-pt">Sur un tube parfaitement ébavuré</text>`, 'Le raccord à compression');
    }

    if (etat === 'glissement') {
      const P = (x, n, t, d) => `<rect x="${x}" y="60" width="240" height="330" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><circle cx="${x + 30}" cy="94" r="18" fill="#1b3a63"/><text x="${x + 30}" y="101" text-anchor="middle" class="cz-bl">${n}</text>
        <g transform="translate(${x},0)">${d}</g>${bloc(x + 120, 332, t, 18, 'cz-txt', 'middle', 26)}`;
      return cadre(`${defs}
        ${P(14, 1, 'Enfiler la bague', `${tube(20, 220, 200, 36, 'bleu')}<rect x="150" y="170" width="26" height="60" rx="6" fill="url(#cz-p-inox)" stroke="#6c7782" stroke-width="3"/>`)}
        ${P(280, 2, 'Évaser le bout avec l’expandeur', `${tube(20, 140, 200, 36, 'bleu')}<path d="M140 182 L190 168 V232 L140 218 Z" fill="url(#cz-p-bleu)" stroke="${STROKE.bleu}" stroke-width="2"/><path d="M200 200 L150 200" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/><path d="M200 186 L234 200 L200 214 Z" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2"/>`)}
        ${P(546, 3, 'Emmancher, la bague glisse', `${tube(20, 120, 200, 36, 'bleu')}<rect x="104" y="166" width="70" height="68" rx="8" fill="url(#cz-p-inox)" stroke="#6c7782" stroke-width="3"/><rect x="132" y="176" width="70" height="48" rx="6" ${lai}/>${tube(202, 236, 200, 30, 'laiton')}<path d="M150 150 h-40 m0 0 l10 -9 m-10 9 l10 9" stroke="#c9451a" stroke-width="5" fill="none" stroke-linecap="round"/>`)}
        <text x="400" y="446" text-anchor="middle" class="cz-pt">Il faut l’outil du fabricant (pince à emboîtures et pince de montage)</text>`, 'Le raccord à glissement');
    }

    if (etat === 'cintrer') {
      const P = (x, n, t, d) => `<rect x="${x}" y="50" width="248" height="340" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/><rect x="${x}" y="50" width="248" height="46" rx="14" fill="#1b3a63"/><rect x="${x}" y="74" width="248" height="22" fill="#1b3a63"/>
        <text x="${x + 124}" y="82" text-anchor="middle" class="cz-bl">${n}</text><g transform="translate(${x},0)">${d}</g>${bloc(x + 124, 332, t, 20, 'cz-txt', 'middle', 26)}`;
      const coude = (c) => `<path d="M40 280 H110 Q180 280 180 210 V140" fill="none" stroke="${STROKE[c]}" stroke-width="30" stroke-linecap="round"/><path d="M40 280 H110 Q180 280 180 210 V140" fill="none" stroke="url(#cz-p-${c})" stroke-width="24" stroke-linecap="round"/>`;
      return cadre(`${defs}
        ${P(14, 'Ressort', 'le ressort tient le tube rond', coude('bleu') + `<path d="M120 290 q4 -16 12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#2c333b" stroke-width="3"/>`)}
        ${P(276, 'Cintreuse', 'on choisit selon le diamètre', coude('multi') + `<circle cx="118" cy="214" r="34" fill="url(#cz-ac)" stroke="${ST}" stroke-width="3"/><circle cx="118" cy="214" r="8" fill="#2c333b"/>`)}
        ${P(538, 'Support coudé', 'un guide qui donne la courbe', coude('bleu') + `<path d="M104 300 Q220 300 220 190" fill="none" stroke="#6c7782" stroke-width="8" stroke-linecap="round" stroke-dasharray="14 8"/>`)}
        <text x="400" y="438" text-anchor="middle" class="cz-txt">Rayon mini : celui de la notice du fabricant</text>
        <text x="400" y="474" text-anchor="middle" class="cz-pt">En dessous, le tube plisse ou s’écrase</text>`, 'Cintrer sans plier');
    }

    if (etat === 'collier') {
      const mur = `<rect x="40" y="330" width="720" height="70" fill="#d9cfbd" stroke="#8c8576" stroke-width="2"/>${Array.from({ length: 28 }, (_, i) => `<line x1="${50 + i * 26}" y1="332" x2="${30 + i * 26}" y2="398" stroke="#b5a98f" stroke-width="2"/>`).join('')}`;
      const collier = (x, serre) => `<path d="M${x - 24} 330 v-44 a24 24 0 0 1 48 0 v44" fill="none" stroke="#6c7782" stroke-width="8" stroke-linecap="round"/>${serre ? '' : ''}`;
      return cadre(`${defs}${mur}${tube(60, 740, 276, 28, 'bleu')}${collier(200, false)}${collier(600, true)}
        <path d="M80 220 h110 m0 0 l-12 -10 m12 10 l-12 10 M80 220 l12 -10 m-12 10 l12 10" stroke="#1e7e54" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M560 232 h30 M610 232 h30 M575 214 l15 18 M625 214 l-15 18" stroke="#b3261e" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="200" y="168" text-anchor="middle" class="cz-ok">✔ Collier libre</text><text x="200" y="196" text-anchor="middle" class="cz-pt">le tube glisse quand il chauffe</text>
        <text x="600" y="168" text-anchor="middle" class="cz-ko">✘ Collier serré</text><text x="600" y="196" text-anchor="middle" class="cz-pt">le tube force, grince, se déforme</text>
        <text x="400" y="450" text-anchor="middle" class="cz-pt">Le PER se dilate beaucoup : on le laisse libre de bouger dans ses colliers</text>`, 'Fixer sans serrer');
    }

    if (etat === 'pli') return cadre(`${defs}
      <path d="M100 360 H400 V120" fill="none" stroke="${STROKE.bleu}" stroke-width="44" stroke-linejoin="miter"/><path d="M100 360 H400 V120" fill="none" stroke="url(#cz-p-bleu)" stroke-width="38" stroke-linejoin="miter"/>
      <path d="M382 342 l36 36 M360 360 l40 20" stroke="#fff" stroke-width="4" opacity=".7"/>
      ${etiquette(400, 360, 520, 300, 'Pli : le passage est écrasé')}
      ${verdict(false, 'Coude trop serré : le tube est plié', 400, 440)}`, 'Un tube plié');
    /* ok : un coude large, au rayon du fabricant */
    return cadre(`${defs}
      <path d="M100 360 H260 Q400 360 400 220 V120" fill="none" stroke="${STROKE.bleu}" stroke-width="44" stroke-linecap="butt"/><path d="M100 360 H260 Q400 360 400 220 V120" fill="none" stroke="url(#cz-p-bleu)" stroke-width="38" stroke-linecap="butt"/>
      ${etiquette(330, 330, 520, 300, 'Courbe large, tube rond')}
      ${verdict(true, 'Rayon respecté : le tube reste rond', 400, 440)}`, 'Un coude réussi');
  });
})();
