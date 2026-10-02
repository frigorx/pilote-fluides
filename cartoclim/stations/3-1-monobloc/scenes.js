/* CartoClim 3.1 — scènes du monobloc.
   Temps 2 : (A) le mobile en coupe, dans sa pièce, en quatre pas — l'air de la pièce refroidi, l'air du
   condenseur poussé dehors par la gaine, l'air chaud qui rentre, le bac ; (B) les trois monoblocs côte à côte
   (mobile, fenêtre, mural à deux trous). Temps 5 : le tableau qui les compare.
   Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite, condenseur en haut,
   évaporateur en bas. Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;

  /* Têtes de flèche de taille fixe (14 px), une par couleur ; p = préfixe propre à chaque dessin. */
  const tetes = p => `<defs>${[['bp', C.froid], ['hp', C.chaud], ['air', C.navy], ['ora', C.orange], ['eau', C.eau]]
    .map(([n, c]) => `<marker id="${p}-${n}" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${c}"/></marker>`).join('')}</defs>`;
  /* une flèche par sous-tracé : marker-end ne coiffe que le dernier bout d'un tracé composé */
  const fleche = (p, n, c, d, l = 4) => d.split(/(?=M)/).map(x => `<path d="${x.trim()}" fill="none" stroke="${c}" stroke-width="${l}" marker-end="url(#${p}-${n})"/>`).join('');
  const ailettes = (x0, n, pas, y1, y2) => Array.from({ length: n }, (_, i) => `<line x1="${x0 + i * pas}" y1="${y1}" x2="${x0 + i * pas}" y2="${y2}"/>`).join('');
  const T = (x, y, txt, c = C.navy, t = 13, ancre = 'start') =>
    `<text x="${x}" y="${y}" text-anchor="${ancre}" font-size="${t}" font-weight="700" fill="${c}">${txt}</text>`;

  /* ------------------------------------------------------------------ (A) le mobile en coupe, quatre pas */
  function trajetDeLAir() {
    const d = svg('0 0 820 470',
      'Un climatiseur mobile en coupe, dans une pièce. Tout le circuit est dans le boîtier : condenseur en haut, évaporateur en bas, détendeur à gauche, compresseur à droite. Un courant d’air de la pièce traverse l’évaporateur ; un autre traverse le condenseur et part dehors par une gaine à la fenêtre ; de l’air chaud rentre par la porte ; un bac recueille l’eau.');
    let e = 0;
    const on = (k, c) => e === k ? c : C.trait;
    const w = (k, a, b) => e === k ? a : b;
    const bp = C.froid, hp = C.chaud;

    const peindre = () => {
      d.innerHTML = `${tetes('a')}
<rect x="10" y="10" width="800" height="450" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- la pièce : mur de gauche et sa porte, mur de droite et sa fenêtre, sol -->
${T(56, 38, 'DANS LA PIÈCE', C.navy, 14)}${T(700, 38, 'DEHORS', C.navy, 14)}
<rect x="26" y="44" width="12" height="126" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="26" y="170" width="12" height="260" fill="${C.papier}" stroke="${e === 2 ? C.orange : C.navy}" stroke-width="${w(2, 5, 3)}"/>
<rect x="640" y="44" width="40" height="56" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="640" y="200" width="40" height="230" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<line x1="20" y1="430" x2="800" y2="430" stroke="${C.gris}" stroke-width="4"/>

<!-- le boîtier : tout le circuit dedans -->
${T(390, 84, 'CLIMATISEUR MOBILE · tout dans un boîtier', C.navy, 14, 'middle')}
<rect x="230" y="96" width="320" height="320" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="262" cy="423" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="518" cy="423" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>

<!-- condenseur, en haut : serpentin, ailettes, ventilateur -->
<g stroke="${on(1, hp)}" stroke-width="${w(1, 6, 4)}" fill="none" stroke-linecap="round">
  <path d="M296 126 H376 M296 150 H376 M296 174 H376"/>
  <path d="M296 126 c-14 0 -14 24 0 24 M376 150 c14 0 14 24 0 24"/>
</g>
<g stroke="${C.trait}" stroke-width="2">${ailettes(304, 8, 10, 114, 186)}</g>
${T(336, 208, 'condenseur', e === 1 ? hp : C.navy, 13, 'middle')}
<circle cx="470" cy="150" r="24" fill="none" stroke="${on(1, C.navy)}" stroke-width="3"/>
<path d="M470 126 v48 M446 150 h48" stroke="${on(1, C.navy)}" stroke-width="3"/>
${T(470, 196, 'ventilateur', C.navy, 12, 'middle')}

<!-- compresseur, à droite -->
<rect x="462" y="226" width="76" height="60" rx="10" fill="${C.papier}" stroke="${C.trait}" stroke-width="4"/>
${T(500, 261, 'compr.', C.navy, 12, 'middle')}

<!-- détendeur, à gauche -->
<path d="M240 256 l22 -13 v26 z M284 256 l-22 -13 v26 z" fill="${C.papier}" stroke="${C.trait}" stroke-width="4" stroke-linejoin="round"/>
${T(292, 260, 'détendeur', C.navy, 12)}

<!-- évaporateur, en bas -->
<g stroke="${on(0, bp)}" stroke-width="${w(0, 6, 4)}" fill="none" stroke-linecap="round">
  <path d="M296 312 H376 M296 336 H376 M296 360 H376"/>
  <path d="M376 312 c14 0 14 24 0 24 M296 336 c-14 0 -14 24 0 24"/>
</g>
<g stroke="${C.trait}" stroke-width="2">${ailettes(304, 8, 10, 300, 372)}</g>
${T(336, 292, 'évaporateur', e === 0 ? bp : C.navy, 13, 'middle')}
<circle cx="470" cy="336" r="24" fill="none" stroke="${on(0, C.navy)}" stroke-width="3"/>
<path d="M470 312 v48 M446 336 h48" stroke="${on(0, C.navy)}" stroke-width="3"/>

<!-- le circuit, de l'un à l'autre : haute pression (compresseur → condenseur → détendeur), basse pression -->
<path d="M462 238 H420 V126 H376" fill="none" stroke="${e === 1 ? hp : C.trait}" stroke-width="${w(1, 7, 6)}" stroke-linejoin="round"/>
<path d="M296 174 H262 V243" fill="none" stroke="${C.trait}" stroke-width="6" stroke-linejoin="round"/>
<path d="M262 269 V312 H296" fill="none" stroke="${e === 0 ? bp : C.trait}" stroke-width="${w(0, 6, 6)}" stroke-linejoin="round"/>
<path d="M376 360 H398 V274 H462" fill="none" stroke="${e === 0 ? bp : C.trait}" stroke-width="${w(0, 6, 6)}" stroke-linejoin="round"/>

<!-- le bac à condensats, sous l'évaporateur -->
<rect x="290" y="388" width="92" height="20" rx="4" fill="${C.papier}" stroke="${e === 3 ? C.eau : C.trait}" stroke-width="${w(3, 4, 3)}"/>
${e === 3 ? `<rect x="292" y="396" width="88" height="10" fill="${C.eau}" fill-opacity=".35" stroke="none"/>
${[316, 336, 356].map(x => `<circle cx="${x}" cy="382" r="3.5" fill="${C.eau}" stroke="none"/>`).join('')}` : ''}
${T(336, 402, 'bac', e === 3 ? C.eau : C.navy, 12, 'middle')}

<!-- la gaine : du boîtier à la fenêtre, puis dehors -->
<path d="M550 150 H730" fill="none" stroke="${e === 1 ? hp : C.navy}" stroke-opacity="${e === 1 ? .28 : .14}" stroke-width="28"/>
<path d="M550 150 H730" fill="none" stroke="${C.gris}" stroke-width="28" stroke-dasharray="2 9"/>
${T(568, 128, 'gaine', e === 1 ? hp : C.gris, 13)}${T(566, 192, 'fenêtre', C.gris, 13)}

${e === 0 ? `${fleche('a', 'air', C.navy, 'M110 328 H290 M110 352 H290', 3.5)}
${T(60, 312, 'air de la pièce', C.navy)}
${fleche('a', 'bp', bp, 'M498 328 H620 M498 352 H620')}
${T(566, 378, 'air frais', bp)}` : ''}
${e === 1 ? `${fleche('a', 'air', C.navy, 'M110 138 H290 M110 162 H290', 3.5)}
${T(60, 118, 'air de la pièce', C.navy)}
${fleche('a', 'hp', hp, 'M498 150 H772', 5)}
${T(700, 128, 'air chaud', hp)}${T(700, 188, 'rejeté dehors', hp)}` : ''}
${e === 2 ? `${fleche('a', 'ora', C.orange, 'M44 200 C86 200 92 138 128 138 M44 250 C86 250 92 162 128 162')}
${fleche('a', 'air', C.navy, 'M134 138 H290 M134 162 H290', 3.5)}
${T(60, 118, 'air de la pièce aspiré', C.navy)}
${T(48, 290, 'air chaud qui rentre', C.orange)}${T(48, 308, 'par la porte', C.orange)}${T(48, 326, 'et les fuites', C.orange)}` : ''}
${e === 3 ? `${T(48, 392, 'condensats', C.eau)}${T(48, 412, 'le bac se remplit', C.eau)}
${fleche('a', 'eau', C.eau, 'M160 398 H284')}` : ''}`;
    };

    const etapes = [
      { titre: 'L’air de la pièce traverse l’évaporateur',
        dire: 'Un ventilateur pousse l’air de la pièce à travers la batterie froide. Le fluide y bout et prend la chaleur de l’air. L’air ressort plus frais, dans la pièce.',
        peindre: () => { e = 0; peindre(); } },
      { titre: 'L’air du condenseur part dehors par la gaine',
        dire: 'Le condenseur rend sa chaleur à un autre courant d’air, qui ne se mélange jamais à celui de la pièce. Cet air se réchauffe : la gaine le pousse dehors, par la fenêtre.',
        peindre: () => { e = 1; peindre(); } },
      { titre: 'La pièce manque d’air : du chaud rentre',
        dire: 'L’air qui part par la gaine est de l’air de la pièce. Il est remplacé par de l’air du dehors, chaud, qui entre par la porte, les joints, la fenêtre entrouverte. Le mobile refroidit sans cesse un air qui revient.',
        peindre: () => { e = 2; peindre(); } },
      { titre: 'Et l’eau ? Le bac se remplit',
        dire: 'L’humidité de l’air se dépose sur la batterie froide et tombe dans le bac. Il faut le vider, ou prévoir un tuyau qui l’évacue.',
        peindre: () => { e = 3; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Mobile à une seule gaine. Les modèles qui prennent aussi l’air du condenseur dehors, par une seconde gaine, n’aspirent plus l’air de la pièce : c’est le cas le plus favorable.');
  }

  /* ------------------------------------------------------------------ (B) les trois monoblocs, côte à côte */
  function troisMonoblocs() {
    const d = svg('0 0 820 330',
      'Trois monoblocs en coupe, chacun avec son mur : le mobile (gaine jusqu’à la fenêtre), le climatiseur de fenêtre (le boîtier traverse le mur, un côté dedans, un côté dehors), le monobloc mural (collé au mur, deux trous pour l’air du condenseur).');
    const f = (n, c, dd, l = 4) => fleche('b', n, c, dd, l);
    const base = `${tetes('b')}
<rect x="10" y="10" width="800" height="310" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${T(40, 36, 'DANS LA PIÈCE', C.navy, 14)}${T(700, 36, 'DEHORS', C.navy, 14)}
<line x1="20" y1="290" x2="800" y2="290" stroke="${C.gris}" stroke-width="4"/>`;
    const mur = (x, trous) => {            /* un mur plein de y=40 à y=290, percé aux intervalles donnés */
      let y = 40, s = '';
      trous.concat([[290, 290]]).forEach(([a, b]) => { if (a > y) s += `<rect x="${x}" y="${y}" width="40" height="${a - y}" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>`; y = b; });
      return s;
    };
    const zone = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity=".14" stroke="none"/>`;
    const gaine = (dd, large) => `<path d="${dd}" fill="none" stroke="${C.navy}" stroke-opacity=".14" stroke-width="${large}"/>
<path d="${dd}" fill="none" stroke="${C.gris}" stroke-width="${large}" stroke-dasharray="2 9"/>`;

    const CORPS = {
      mobile: () => `${mur(520, [[80, 180]])}
<rect x="230" y="100" width="150" height="190" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${zone(233, 103, 144, 90, C.chaud)}${zone(233, 196, 144, 91, C.froid)}
<line x1="230" y1="196" x2="380" y2="196" stroke="${C.navy}" stroke-width="2"/>
${T(305, 152, 'condenseur', C.navy, 12, 'middle')}${T(305, 248, 'évaporateur', C.navy, 12, 'middle')}
${gaine('M380 130 H640', 22)}
${T(420, 108, 'gaine', C.gris)}
${f('hp', C.chaud, 'M376 130 H704', 5)}
${T(580, 106, 'air chaud', C.chaud)}${T(580, 172, 'fenêtre entrouverte', C.gris)}
${f('ora', C.orange, 'M70 130 H222')}${T(70, 112, 'air chaud qui rentre', C.orange)}
${f('bp', C.froid, 'M376 244 H492')}${T(400, 270, 'air frais', C.froid)}`,

      fenetre: () => `${mur(470, [[110, 220]])}
<rect x="370" y="118" width="240" height="94" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${zone(373, 121, 97, 88, C.froid)}${zone(510, 121, 97, 88, C.chaud)}
<line x1="470" y1="118" x2="470" y2="212" stroke="${C.navy}" stroke-width="2"/><line x1="510" y1="118" x2="510" y2="212" stroke="${C.navy}" stroke-width="2"/>
${T(421, 170, 'évaporateur', C.navy, 12, 'middle')}${T(558, 170, 'condenseur', C.navy, 12, 'middle')}
${f('air', C.navy, 'M250 150 H364', 3.5)}${T(230, 134, 'air de la pièce', C.navy)}
${f('bp', C.froid, 'M364 190 H250')}${T(250, 216, 'air frais', C.froid)}
${f('air', C.navy, 'M704 150 H616', 3.5)}${T(620, 134, 'air du dehors', C.navy)}
${f('hp', C.chaud, 'M616 190 H704')}${T(620, 216, 'air chaud', C.chaud)}
${T(400, 252, 'moitié dedans', C.gris, 13, 'middle')}${T(582, 252, 'moitié dehors', C.gris, 13, 'middle')}`,

      mural: () => `${mur(470, [[120, 150], [190, 220]])}
<rect x="270" y="96" width="200" height="140" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${zone(273, 99, 97, 134, C.froid)}${zone(370, 99, 97, 134, C.chaud)}
<line x1="370" y1="96" x2="370" y2="236" stroke="${C.navy}" stroke-width="2"/>
${T(321, 170, 'évaporateur', C.navy, 12, 'middle')}${T(419, 170, 'condenseur', C.navy, 12, 'middle')}
${f('air', C.navy, 'M150 135 H264', 3.5)}${T(150, 116, 'air de la pièce', C.navy)}
${f('bp', C.froid, 'M264 205 H150')}${T(150, 232, 'air frais', C.froid)}
${f('air', C.navy, 'M704 135 H420', 3.5)}${T(520, 116, 'air du dehors', C.navy)}
${f('hp', C.chaud, 'M420 205 H704', 5)}${T(520, 240, 'air chaud', C.chaud)}
${T(520, 174, 'deux trous', C.gris)}`
    };

    const liste = [
      { id: 'mobile', libelle: 'Le mobile',
        legende: 'Le mobile : posé dans la pièce, il envoie l’air chaud du condenseur dehors par une gaine. La pièce perd de l’air : l’air chaud du dehors rentre par les fuites.' },
      { id: 'fenetre', libelle: 'Le climatiseur de fenêtre',
        legende: 'Le climatiseur de fenêtre : le boîtier est engagé dans l’ouverture, un côté dans la pièce, un côté dehors. Pas de gaine, mais le compresseur et les ventilateurs sont dans le boîtier : le bruit de fonctionnement entre dans la pièce.' },
      { id: 'mural', libelle: 'Le monobloc mural',
        legende: 'Le monobloc mural : fixé au mur, à l’intérieur, sans unité dehors. Deux trous dans le mur : l’un laisse entrer l’air du condenseur, l’autre le rejette.' }
    ];
    const peindre = id => { d.innerHTML = base + CORPS[id](); };
    liste.forEach(x => { x.appliquer = () => peindre(x.id); });
    peindre('mobile');
    return etats(d, liste, 'mobile', liste[0].legende);
  }

  /* Le temps 2 : le pas à pas du mobile, puis les trois monoblocs comparés. */
  function scene() {
    const hote = document.createElement('div');
    hote.appendChild(trajetDeLAir());
    const t = document.createElement('p');
    t.className = 'legende'; t.style.fontWeight = '700'; t.style.color = C.navy; t.style.marginTop = '1.4rem';
    t.textContent = 'Les trois monoblocs, côte à côte : où part la chaleur ?';
    hote.appendChild(t);
    hote.appendChild(troisMonoblocs());
    return hote;
  }

  /* ------------------------------------------------------------------ temps 5 : le tableau qui les compare */
  function recapitulatif() {
    const d = svg('0 0 820 330', 'Tableau comparatif des trois monoblocs, mobile, fenêtre, mural à deux trous : où est le condenseur, par où sort l’air chaud, ce qu’on pose.');
    const colX = [196, 400, 604], cw = 196;
    const lignes = [
      ['Où est le', 'condenseur ?', [['dans le boîtier,', 'dans la pièce'], ['dans la moitié', 'qui est dehors'], ['dans le boîtier,', 'contre le mur']]],
      ['Par où sort', 'l’air chaud ?', [['par la gaine,', 'jusqu’à la fenêtre'], ['directement dehors,', 'sans gaine'], ['par l’un des deux', 'trous du mur']]],
      ['Qu’est-ce qu’on', 'pose ?', [['rien : on le branche,', 'on passe la gaine'], ['une ouverture dans', 'le mur ou la baie'], ['le boîtier au mur', 'et deux trous']]]
    ];
    let s = `<rect x="10" y="10" width="800" height="310" rx="16" fill="${C.papier}" stroke="${C.trait}"/>`;
    ['Mobile', 'Fenêtre', 'Mural, deux trous'].forEach((t, i) => {
      s += `<rect x="${colX[i]}" y="24" width="${cw}" height="40" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>${T(colX[i] + cw / 2, 50, t, C.navy, 16, 'middle')}`;
    });
    lignes.forEach(([a, b, cases], r) => {
      const y0 = 72 + r * 68;
      s += T(24, y0 + 26, a, C.navy, 14) + T(24, y0 + 46, b, C.navy, 14);
      cases.forEach(([l1, l2], i) => {
        s += `<rect x="${colX[i]}" y="${y0}" width="${cw}" height="60" rx="8" fill="${C.papier}" stroke="${C.trait}" stroke-width="2"/>`
          + `<text x="${colX[i] + cw / 2}" y="${y0 + 26}" text-anchor="middle" font-size="14" fill="${C.navy}">${l1}</text>`
          + `<text x="${colX[i] + cw / 2}" y="${y0 + 46}" text-anchor="middle" font-size="14" fill="${C.navy}">${l2}</text>`;
      });
    });
    s += `<rect x="196" y="278" width="604" height="34" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>`
      + T(498, 300, 'Tous trois : simples à poser, plus bruyants, moins efficaces qu’un split.', C.navy, 14, 'middle');
    d.innerHTML = s;
    return d;
  }

  return { scene, recapitulatif };
})();
