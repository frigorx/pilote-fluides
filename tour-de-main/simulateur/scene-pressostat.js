/* Le réglage des pressostats — les DESSINS. Le filigrane et les dégradés sont repris de cuivrezo/simulateur/scene.js.
   CONTRAT : aucune règle ici ; tout se lit dans l'état S de pressostat.js, dont S.app décrit l'appareil :
   { modele, sous, ech: { nom, min, max, vals }, dif: { nom, min, max, vals } | null (différentiel fixe), difFixe,
     reset (bouton de réarmement), testeurs: [{ borne, cle }] } — cle = le champ de S qui dit si le contact est fermé.
   Éléments touchables : data-cible="…".
   Le banc : bouteille d'azote (ogive NOIRE) et son mano-détendeur → flexible jaune → té avec vanne de purge →
   manomètre de contrôle et pressostat → testeur(s) de continuité.
   Le pressostat a la forme d'un KP (mémoire « organe reconnaissable ») : boîtier gris plus haut que large, fenêtre
   d'échelle en haut, vis de réglage sur le dessus, écrou laiton en bas. Le RT 1AL et le pressostat de découpage du
   sujet 2012 sont dessinés sur le même gabarit : seuls le nom et les échelles changent. */
window.ScenePressostat = (() => {
  'use strict';
  /* repris de cuivrezo/simulateur/scene.js : le filigrane et les dégradés */
  const FIL = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle" style="font:800 ${t}px 'Trebuchet MS',Calibri,sans-serif;fill:#1b3a63;opacity:.07">by inerweb.fr</text>`;
  const DEFS = `<defs>
    <linearGradient id="g-acier" x1="0" x2="1"><stop offset="0" stop-color="#8f99a4"/><stop offset=".45" stop-color="#e4e8ec"/><stop offset="1" stop-color="#7f8994"/></linearGradient>
    <linearGradient id="g-laiton" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dc95"/><stop offset=".5" stop-color="#d4ad55"/><stop offset="1" stop-color="#a47a28"/></linearGradient>
    <linearGradient id="g-cuivre" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eab489"/><stop offset=".5" stop-color="#b8692e"/><stop offset="1" stop-color="#8a4a1d"/></linearGradient>
  </defs>`;
  const borne = (v, a, b) => Math.max(a, Math.min(b, v));
  const virg = v => (Math.round(v * 100) / 100).toString().replace('.', ',');
  const T = (x, y, t, taille = 24, poids = 800, coul = '#1b3a63', ancre = 'middle') =>
    `<text x="${x}" y="${y}" text-anchor="${ancre}" style="font:${poids} ${taille}px Calibri,Arial;fill:${coul}">${t}</text>`;
  const ferme = (S, t) => !!S[t.cle];

  /* manomètre de contrôle, gradué finement : un trait par pas, un plus long à chaque demi-étiquette */
  const ECH = { BP: { max: 5, pas: 0.1, lab: 1 }, BP10: { max: 10, pas: 0.2, lab: 1 }, HP: { max: 40, pas: 1, lab: 5 } };
  /* l'échelle en °C du fluide, à l'intérieur du cadran, comme sur un vrai manifold : an = { T0, P: [pression effective
     au degré près à partir de T0] } ; un trait par degré, un plus long tous les 5, un nombre tous les 10 */
  function anneau(cx, cy, r, e, an) {
    if (!an) return '';
    const ang = v => -135 + 270 * borne(v / e.max, 0, 1.02);
    const pol = (a, d) => { const t = (a - 90) * Math.PI / 180; return [cx + Math.cos(t) * d, cy + Math.sin(t) * d]; };
    let s = '';
    an.P.forEach((p, i) => {
      const T = an.T0 + i; if (p < 0 || p > e.max) return;
      const cinq = T % 5 === 0, dix = T % 10 === 0;
      const [x1, y1] = pol(ang(p), r * (cinq ? .5 : .54)), [x2, y2] = pol(ang(p), r * .6);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1f6fa8" stroke-width="${r * (cinq ? .016 : .008)}"/>`;
      if (dix) { const [x, y] = pol(ang(p), r * .42); s += T_(x, y + r * .04, String(T), r * .11, 700, '#1f6fa8'); }
    });
    return s + T_(cx, cy - r * .22, '°C', r * .12, 800, '#1f6fa8');
  }
  const T_ = (x, y, t, taille, poids, coul) => `<text x="${x}" y="${y}" text-anchor="middle" style="font:${poids} ${taille}px Calibri,Arial;fill:${coul}">${t}</text>`;
  function cadran(cx, cy, r, cas, val, an) {
    const e = ECH[cas], n = Math.round(e.max / e.pas);
    const ang = v => -135 + 270 * borne(v / e.max, 0, 1.02);
    const pol = (a, d) => { const t = (a - 90) * Math.PI / 180; return [cx + Math.cos(t) * d, cy + Math.sin(t) * d]; };
    let s = `<circle cx="${cx}" cy="${cy}" r="${r * 1.11}" fill="#56657a"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffdf8" stroke="#1b3a63" stroke-width="${r * .05}"/>`;
    for (let i = 0; i <= n; i++) {
      const v = i * e.pas, grand = Math.abs(v / e.lab - Math.round(v / e.lab)) < 1e-6, moyen = Math.abs(2 * v / e.lab - Math.round(2 * v / e.lab)) < 1e-6;
      const [x1, y1] = pol(ang(v), r * (an ? (grand ? .8 : moyen ? .84 : .87) : (grand ? .74 : moyen ? .8 : .85))), [x2, y2] = pol(ang(v), r * (an ? .95 : .93));
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1b3a63" stroke-width="${r * (grand ? .03 : .014)}"/>`;
    }
    for (let v = 0; v <= e.max + 1e-6; v += e.lab) { const [x, y] = pol(ang(v), r * (an ? .7 : .58)); s += T(x, y + r * .08, virg(v), r * (an ? .17 : .22), 700, '#10233c'); }
    s += anneau(cx, cy, r, e, an);
    s += T(cx, cy + r * .5, cas.slice(0, 2), r * .24) + T(cx, cy + r * .7, 'bar', r * .15, 700, '#56657a');
    const [nx, ny] = pol(ang(val), r * .82);
    return s + `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#c9451a" stroke-width="${r * .045}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r * .08}" fill="#1b3a63"/>`;
  }

  /* le pressostat vu de face, à l'échelle k, coin haut gauche (x, y) : 160 × 290 à k = 1 */
  function kp(S, x, y, k, touche) {
    const A = S.app, w = 160 * k, h = 290 * k;
    const vis = (cx, nom) => `<g${touche ? ` data-cible="${nom}" class="touche"` : ''}><circle cx="${cx}" cy="${y - 4 * k}" r="${15 * k}" fill="url(#g-acier)" stroke="#4d5763" stroke-width="${2 * k}"/>
      <line x1="${cx - 10 * k}" y1="${y - 4 * k}" x2="${cx + 10 * k}" y2="${y - 4 * k}" stroke="#2c333b" stroke-width="${4 * k}"/></g>`;
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${10 * k}" fill="#c4cad1" stroke="#4d5763" stroke-width="${3 * k}"/>
      <rect x="${x + 16 * k}" y="${y + 20 * k}" width="${w - 32 * k}" height="${110 * k}" rx="${6 * k}" fill="#eef1f4" stroke="#56657a" stroke-width="${2 * k}"/>
      <rect x="${x + 36 * k}" y="${y + 30 * k}" width="${12 * k}" height="${90 * k}" fill="#fffdf8" stroke="#56657a" stroke-width="${1.5 * k}"/>
      <rect x="${x + w - 48 * k}" y="${y + 30 * k}" width="${12 * k}" height="${90 * k}" fill="${A.dif ? '#fffdf8' : '#d6dbe0'}" stroke="#56657a" stroke-width="${1.5 * k}"/>
      ${T(x + w / 2, y + 170 * k, A.modele, (A.modele.length > 5 ? 24 : 30) * k)}${T(x + w / 2, y + 198 * k, A.sous, 13 * k, 700, '#56657a')}
      <rect x="${x + w / 2 - 22 * k}" y="${y + h}" width="${44 * k}" height="${26 * k}" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="${2 * k}"/>
      <rect x="${x + w}" y="${y + 220 * k}" width="${18 * k}" height="${30 * k}" rx="${4 * k}" fill="#2c333b"/>`;
    // graduations des deux fenêtres (chiffrées quand la face est vue de près) et repères, en position relative
    const yp = (v, g) => y + (120 - 90 * (v - g.min) / (g.max - g.min)) * k;
    const grad = (xr, g) => g.vals.map(v => `<line x1="${xr}" y1="${yp(v, g)}" x2="${xr + 12 * k}" y2="${yp(v, g)}" stroke="#1b3a63" stroke-width="${1.5 * k}"/>`
      + (k >= 1.2 ? T(xr - 4 * k, yp(v, g) + 4 * k, virg(v), 10 * k, 700, '#10233c', 'end') : '')).join('');
    s += grad(x + 36 * k, A.ech) + `<path d="M${x + 50 * k} ${yp(S.face.ech, A.ech)} l${12 * k} ${-6 * k} v${12 * k} Z" fill="#c9451a"/>`;
    if (A.dif) s += grad(x + w - 48 * k, A.dif) + `<path d="M${x + w - 34 * k} ${yp(S.face.diff, A.dif)} l${12 * k} ${-6 * k} v${12 * k} Z" fill="#c9451a"/>`;
    s += vis(x + 42 * k, 'vis-ech');
    s += A.reset ? `<g${touche ? ' data-cible="reset" class="touche"' : ''}><rect x="${x + w - 62 * k}" y="${y - 22 * k}" width="${40 * k}" height="${22 * k}" rx="${5 * k}" fill="#b3261e" stroke="#4d5763" stroke-width="${2 * k}"/>
      ${T(x + w - 42 * k, y - 6 * k, 'Reset', 12 * k, 800, '#fffdf8')}</g>` : A.dif ? vis(x + w - 42 * k, 'vis-diff') : '';
    return s;
  }

  /* un testeur de continuité : boîtier jaune, voyant, repère des bornes */
  function testeur(S, t, x, y) {
    const on = ferme(S, t);
    return `<g data-cible="testeur"><rect x="${x}" y="${y}" width="130" height="${t.court ? 150 : 200}" rx="14" fill="#f2c230" stroke="#4d5763" stroke-width="3"/>
      <circle cx="${x + 65}" cy="${y + 52}" r="${t.court ? 30 : 38}" fill="${on ? '#2fb36b' : '#3a4048'}" stroke="#2c333b" stroke-width="3"/>
      ${on ? `<circle cx="${x + 65}" cy="${y + 52}" r="${t.court ? 42 : 52}" fill="#2fb36b" opacity=".25"/>` : ''}
      ${T(x + 65, y + (t.court ? 110 : 135), t.borne, 26)}${T(x + 65, y + (t.court ? 138 : 165), on ? 'fermé' : 'ouvert', 22, 700, '#10233c')}</g>`;
  }

  function poste(S) {
    const H = S.hp, tt = S.app.testeurs;
    let s = `${DEFS}<g id="poste">${FIL(640, 330, 64)}
      <rect x="0" y="592" width="1200" height="28" fill="#e9dfcf"/>
      <g data-cible="bouteille"><path d="M70 576 V232 Q70 172 125 168 Q180 172 180 232 V576 Z" fill="url(#g-acier)" stroke="#4d5763" stroke-width="3"/>
      <path d="M70 262 V232 Q70 172 125 168 Q180 172 180 232 V262 Z" fill="#1f2328" stroke="#4d5763" stroke-width="3"/>
      <rect x="84" y="330" width="82" height="170" rx="10" fill="#fffdf8" stroke="#4d5763" stroke-width="2"/>
      <text transform="translate(134 415) rotate(-90)" text-anchor="middle" style="font:800 28px Calibri,Arial;fill:#1b3a63">AZOTE</text>
      <rect x="111" y="140" width="28" height="30" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>
      <rect x="104" y="112" width="42" height="30" rx="5" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="146" y="116" width="74" height="34" rx="9" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <rect x="220" y="124" width="14" height="12" fill="#8a96a3"/><rect x="232" y="112" width="15" height="36" rx="5" fill="#2c333b"/></g>
      ${T(125, 612, 'azote + détendeur', 20, 700, '#56657a')}`;
    // le flexible jaune, le té et sa vanne de purge, puis les tubes vers le manomètre et le pressostat
    s += `<path d="M195 150 V300 C195 470 300 470 470 470" fill="none" stroke="#9a7b00" stroke-width="13" stroke-linecap="round"/>
      <path d="M195 150 V300 C195 470 300 470 470 470" fill="none" stroke="#f2c230" stroke-width="8" stroke-linecap="round"/>
      <path d="M470 470 V336 M470 470 H840 V466" fill="none" stroke="url(#g-cuivre)" stroke-width="8"/>
      <rect x="452" y="452" width="36" height="36" rx="6" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <g data-cible="purge" class="touche"><line x1="470" y1="488" x2="470" y2="526" stroke="#6b5420" stroke-width="8"/>
      <circle cx="470" cy="536" r="18" fill="#1f5fae" stroke="#2c333b" stroke-width="2.5"/></g>
      ${T(470, 584, 'purge', 20, 700, '#56657a')}
      <g class="jauge" data-j="mano">${cadran(470, 236, 96, S.mano || (H ? 'HP' : 'BP'), S.p, S.anneau)}</g>
      ${T(470, 112, 'manomètre de contrôle', 20, 700, '#56657a')}`;
    s += kp(S, 760, 150, 1, true) + T(840, 520, H ? 'pressostat HP' : 'pressostat BP', 22);
    // le ou les testeurs de continuité
    if (tt.length === 1) s += `<path d="M936 385 C990 385 990 330 1040 330" fill="none" stroke="#b3261e" stroke-width="5"/>
      <path d="M936 395 C1000 395 1000 360 1040 360" fill="none" stroke="#1b3a63" stroke-width="5"/>${testeur(S, tt[0], 1040, 250)}${T(1105, 480, 'testeur', 22)}`;
    else s += `<path d="M936 380 C990 380 990 240 1040 240" fill="none" stroke="#b3261e" stroke-width="5"/>
      <path d="M936 400 C1000 400 1000 420 1040 420" fill="none" stroke="#1b3a63" stroke-width="5"/>
      ${testeur(S, Object.assign({ court: true }, tt[0]), 1040, 150)}${testeur(S, Object.assign({ court: true }, tt[1]), 1040, 340)}${T(1105, 518, 'deux testeurs', 22)}`;
    if (S.anim && S.anim.pfff) s += `<g class="pfff">${[0, 1, 2, 3].map(i => `<circle cx="${494 + i * 16}" cy="${540 - i * 6}" r="${8 + i * 5}" fill="#c9d1da" opacity="${.8 - i * .15}"/>`).join('')}</g>`;
    return s + '</g>';
  }
  const JAUGES = { mano: { cx: 470, cy: 236, r: 106, txt: 'Manomètre de contrôle : la pression dans le pressostat. C’est lui qui fait foi, pas l’échelle du pressostat.' } };

  /* ---------- les vues de près ---------- */
  function vueFace(S) {
    const A = S.app;
    return { vb: '0 0 640 470', svg: `${DEFS}${FIL(320, 462, 30)}${kp(S, 230, 60, 1.25, true)}
      ${T(150, 120, 'échelle', 24)}${T(150, 148, A.ech.nom, 24, 800, '#c9451a')}
      ${T(150, 180, `repère : ${virg(S.face.ech)} bar`, 22, 700, '#10233c')}
      ${T(150, 40, 'vis de l’échelle', 20, 700, '#56657a')}
      ${A.dif ? T(520, 120, A.dif.nom, 24, 800, '#c9451a') + T(520, 150, `repère : ${virg(S.face.diff)} bar`, 22, 700, '#10233c') + T(520, 40, A.dif.vis || 'vis du différentiel', 20, 700, '#56657a')
        : T(520, 120, 'DIFF', 24) + T(520, 148, A.difFixe, 22, 700, '#10233c') + (A.reset ? T(520, 40, 'bouton de réarmement', 20, 700, '#56657a') : '')}` };
  }
  /* l'atelier : la face (repères), le manomètre de contrôle et le ou les testeurs, côte à côte */
  function vueAtelier(S) {
    const A = S.app, tt = A.testeurs;
    const lampe = (t, cy, r) => { const on = ferme(S, t); return `<circle cx="870" cy="${cy}" r="${r}" fill="${on ? '#2fb36b' : '#3a4048'}" stroke="#2c333b" stroke-width="4"/>`; };
    let droite;
    if (tt.length === 1) droite = `${lampe(tt[0], 150, 56)}${T(870, 245, `testeur sur ${tt[0].borne}`, 21)}
      ${T(870, 275, ferme(S, tt[0]) ? 'allumé : fermé' : 'éteint : ouvert', 20, 700, '#10233c')}${A.reset && S.verrou ? T(870, 305, 'verrouillé', 21, 800, '#b3261e') : ''}`;
    else droite = `${lampe(tt[0], 95, 42)}${T(870, 160, `${tt[0].borne} : ${ferme(S, tt[0]) ? 'fermé' : 'ouvert'}`, 21)}
      ${lampe(tt[1], 250, 42)}${T(870, 315, `${tt[1].borne} : ${ferme(S, tt[1]) ? 'fermé' : 'ouvert'}`, 21)}`;
    return { vb: '0 0 980 430', svg: `${DEFS}${FIL(490, 422, 34)}${kp(S, 30, 70, 1, false)}
      ${T(205, 110, 'repères de l’échelle', 20, 700, '#56657a', 'start')}
      ${T(205, 142, `${A.ech.nom} : ${virg(S.face.ech)} bar`, 22, 800, '#10233c', 'start')}
      ${T(205, 172, A.dif ? `${A.dif.nom} : ${virg(S.face.diff)} bar` : `DIFF ${A.difFixe}`, 22, 800, '#10233c', 'start')}
      ${cadran(590, 210, 150, S.mano || (S.hp ? 'HP' : 'BP'), S.p, S.anneau)}${droite}` };
  }
  /* le système de contact, capot retiré (d'après la vue en coupe de la fiche technique Danfoss KP du fonds,
     « Doc. Ressource pressostat BP » : système de contact (12), bornes de raccordement (13), borne de terre (14),
     gaine de passage du câble (15)). La lame part de la borne 1 et bascule entre le contact du haut (4) et celui du
     bas (2). etat = 'haut' | 'bas' | 'milieu' ; bornes = repères des trois vis (commun d'abord). */
  function systemeContact(x, y, etat, bornes, legende) {
    const [b1, b2, b4] = bornes, fils = ['#7a4a1d', '#2c333b', '#8a96a3'];
    const yb = etat === 'haut' ? y + 46 : etat === 'bas' ? y + 104 : y + 75;
    const vis = (cx, cy, n) => `<rect x="${cx - 26}" y="${cy - 26}" width="52" height="52" rx="6" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="17" fill="url(#g-acier)" stroke="#4d5763" stroke-width="2"/>
      <line x1="${cx - 11}" y1="${cy}" x2="${cx + 11}" y2="${cy}" stroke="#2c333b" stroke-width="4"/><line x1="${cx}" y1="${cy - 11}" x2="${cx}" y2="${cy + 11}" stroke="#2c333b" stroke-width="4"/>
      <rect x="${cx - 16}" y="${cy - 48}" width="32" height="20" rx="4" fill="#fffdf8" stroke="#4d5763" stroke-width="1.5"/>
      ${T(cx, cy - 32, n, 18, 800, '#10233c')}`;
    // le bloc isolant, les deux contacts fixes, la lame, le bornier à vis, le presse-étoupe et ses trois fils
    return `<g>
      <rect x="${x}" y="${y}" width="280" height="300" rx="14" fill="#c4cad1" stroke="#4d5763" stroke-width="3"/>
      <rect x="${x + 16}" y="${y + 16}" width="248" height="120" rx="10" fill="#3a4048"/>
      <rect x="${x + 196}" y="${y + 28}" width="40" height="14" rx="3" fill="url(#g-acier)"/><circle cx="${x + 206}" cy="${y + 46}" r="6" fill="#e4e8ec"/>
      <rect x="${x + 196}" y="${y + 108}" width="40" height="14" rx="3" fill="url(#g-acier)"/><circle cx="${x + 206}" cy="${y + 104}" r="6" fill="#e4e8ec"/>
      ${T(x + 252, y + 52, b4, 22, 800, '#fffdf8')}${T(x + 252, y + 122, b2, 22, 800, '#fffdf8')}
      <circle cx="${x + 54}" cy="${y + 75}" r="9" fill="url(#g-laiton)" stroke="#6b5420" stroke-width="2"/>
      <path d="M${x + 54} ${y + 75} L${x + 200} ${yb}" stroke="#e8c27a" stroke-width="9" stroke-linecap="round"/>
      <circle cx="${x + 200}" cy="${yb}" r="7" fill="#e4e8ec" stroke="#4d5763" stroke-width="1.5"/>
      <path d="M${x + 54} ${y + 84} V${y + 128}" stroke="#e8c27a" stroke-width="6"/>
      ${vis(x + 62, y + 186, b1)}${vis(x + 140, y + 186, b2)}${vis(x + 218, y + 186, b4)}
      <path d="M${x + 62} ${y + 212} C${x + 62} ${y + 255} ${x + 120} ${y + 262} ${x + 140} ${y + 290}" fill="none" stroke="${fils[0]}" stroke-width="7"/>
      <path d="M${x + 140} ${y + 212} V${y + 290}" fill="none" stroke="${fils[1]}" stroke-width="7"/>
      <path d="M${x + 218} ${y + 212} C${x + 218} ${y + 255} ${x + 160} ${y + 262} ${x + 140} ${y + 290}" fill="none" stroke="${fils[2]}" stroke-width="7"/>
      <path d="M${x + 34} ${y + 262} C${x + 34} ${y + 285} ${x + 100} ${y + 280} ${x + 128} ${y + 292}" fill="none" stroke="#2e8b3d" stroke-width="7"/>
      <path d="M${x + 34} ${y + 262} C${x + 34} ${y + 285} ${x + 100} ${y + 280} ${x + 128} ${y + 292}" fill="none" stroke="#f2c230" stroke-width="7" stroke-dasharray="10 10"/>
      <circle cx="${x + 34}" cy="${y + 252}" r="13" fill="url(#g-acier)" stroke="#4d5763" stroke-width="2"/><line x1="${x + 26}" y1="${y + 252}" x2="${x + 42}" y2="${y + 252}" stroke="#2c333b" stroke-width="3"/>
      ${T(x + 34, y + 230, 'terre', 15, 800, '#2e8b3d')}
      <rect x="${x + 112}" y="${y + 284}" width="56" height="30" rx="6" fill="#2c333b"/>
      ${T(x + 140, y + 348, legende, 22, 800, '#1b3a63')}</g>`;
  }
  /* la vue des bornes : deux états (pression haute / basse), ou trois pour la zone neutre */
  function vueContact(S) {
    const A = S.app;
    if (A.bornes) return { vb: '0 0 640 420', svg: `${DEFS}${FIL(320, 410, 30)}
      ${T(320, 40, A.contacts[0], 24)}${T(320, 72, A.contacts[1], 24, 800, '#c9451a')}
      ${systemeContact(180, 90, 'milieu', A.bornes, 'repérez A, B et C')}` };
    if (S.deux) return { vb: '0 0 940 440', svg: `${DEFS}${FIL(470, 430, 30)}
      ${T(470, 36, 'RT à zone neutre, capot retiré : la lame suivant la pression', 24)}
      ${systemeContact(10, 60, 'haut', ['1', '2', '4'], 'BP trop haute')}${systemeContact(330, 60, 'milieu', ['1', '2', '4'], 'zone neutre')}${systemeContact(650, 60, 'bas', ['1', '2', '4'], 'BP trop basse')}` };
    return { vb: '0 0 640 440', svg: `${DEFS}${FIL(320, 430, 30)}
      ${T(320, 36, 'Le contact du KP, capot retiré', 24)}
      ${systemeContact(10, 60, 'haut', ['1', '2', '4'], 'pression haute')}${systemeContact(340, 60, 'bas', ['1', '2', '4'], 'pression basse')}` };
  }

  /* ---------- la régulation pressostatique : la chambre froide simulée ----------
     S.th = température de la chambre, S.t0 = température d'évaporation, S.comp = compresseur en marche,
     S.histo = [{ th, comp }] (la courbe), S.prs = { tmin, tmax, dt }. Le manomètre BP (avec son échelle en °C) et le
     KP1 gardent la place qu'ils ont sur le banc (la loupe du manomètre vise les mêmes coordonnées). */
  const deg = v => (Math.round(v * 10) / 10).toString().replace('.', ',');
  function posteChambre(S) {
    const givre = S.t0 < 0, marche = S.comp;
    let s = `${DEFS}<g id="poste">${FIL(640, 330, 64)}
      <rect x="0" y="592" width="1200" height="28" fill="#e9dfcf"/>
      <rect x="30" y="60" width="320" height="520" rx="10" fill="#e8f1f8" stroke="#56657a" stroke-width="12"/>
      <rect x="30" y="60" width="320" height="520" rx="10" fill="none" stroke="#fffdf8" stroke-width="4"/>
      ${T(190, 612, 'la chambre froide', 20, 700, '#56657a')}
      <g><rect x="140" y="90" width="190" height="66" rx="6" fill="#c9d1da" stroke="#4d5763" stroke-width="2"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${152 + i * 22}" y1="96" x2="${152 + i * 22}" y2="150" stroke="#8a96a3" stroke-width="3"/>`).join('')}
      ${givre ? `<rect x="140" y="90" width="190" height="66" rx="6" fill="#ffffff" opacity="${Math.min(.8, -S.t0 / 12)}"/>` : ''}
      <circle cx="176" cy="123" r="22" fill="#56657a"/>${marche ? '<circle cx="176" cy="123" r="22" fill="none" stroke="#fffdf8" stroke-width="3" stroke-dasharray="8 6"/>' : ''}</g>
      ${T(235, 182, givre ? 'évaporateur givré' : 'évaporateur', 18, 700, '#1b3a63')}
      <rect x="60" y="250" width="150" height="80" rx="10" fill="#10233c"/>
      ${T(135, 302, deg(S.th) + ' °C', 34, 800, '#7ee2a8')}${T(135, 352, 'thermomètre', 18, 700, '#56657a')}`;
    // les tuyauteries : aspiration (évaporateur → manomètre → compresseur), liquide (groupe → évaporateur)
    s += `<path d="M330 112 H960 V420" fill="none" stroke="url(#g-cuivre)" stroke-width="10"/>
      <path d="M1100 560 V575 H300 V156" fill="none" stroke="#b8692e" stroke-width="5"/>
      ${T(700, 102, 'aspiration', 18, 700, '#56657a')}${T(700, 562, 'liquide', 18, 700, '#56657a')}
      <path d="M470 112 V128" stroke="url(#g-cuivre)" stroke-width="8"/>
      <g class="jauge" data-j="mano">${cadran(470, 236, 96, S.mano || 'BP', S.p, S.anneau)}</g>
      <path d="M704 473 V490 H610 V112" fill="none" stroke="#b8692e" stroke-width="3"/>`;
    s += kp(S, 640, 220, 0.8, true);
    // le groupe : compresseur (son voyant de marche) et condenseur
    s += `<rect x="1030" y="300" width="150" height="260" rx="10" fill="#dfe4ea" stroke="#4d5763" stroke-width="3"/>
      <circle cx="1105" cy="430" r="58" fill="#c9d1da" stroke="#4d5763" stroke-width="3"/>
      <path d="M900 560 V440 Q900 400 960 400 Q1020 400 1020 440 V560 Z" fill="#2c333b"/>
      <circle cx="960" cy="470" r="16" fill="${marche ? '#2fb36b' : '#6b7480'}"/>
      ${T(960, 535, marche ? 'en marche' : 'arrêt', 18, 800, '#fffdf8')}
      ${T(1040, 612, 'groupe de condensation', 20, 700, '#56657a')}
      <path d="M778 330 C860 330 880 470 900 470" fill="none" stroke="#1b3a63" stroke-width="3" stroke-dasharray="8 6"/>
      ${T(850, 360, '1 – 4', 18, 800, '#1b3a63')}`;
    return s + '</g>';
  }
  function vueChambre(S) {
    const P = S.prs, h = S.histo || [], x0 = 560, x1 = 960, y0 = 120, y1 = 400;
    const lo = P.tmin - 3, hi = P.tmax + 3, yT = t => y1 - (borne(t, lo, hi) - lo) / (hi - lo) * (y1 - y0);
    const pts = h.map((e, i) => `${x0 + (x1 - x0) * i / 299},${yT(e.th)}`).join(' ');
    const bande = (t, nom) => `<line x1="${x0}" y1="${yT(t)}" x2="${x1}" y2="${yT(t)}" stroke="#c9451a" stroke-width="2" stroke-dasharray="8 6"/>
      ${T(x1 - 4, yT(t) - 8, `${nom} ${deg(t)} °C`, 16, 800, '#c9451a', 'end')}`;
    return { vb: '0 0 980 430', svg: `${DEFS}${FIL(560, 424, 32)}${kp(S, 20, 60, 0.85, false)}
      ${T(20, 360, `CUT IN : ${deg(S.face.ech)} bar`, 19, 800, '#10233c', 'start')}${T(20, 388, `DIFF : ${deg(S.face.diff)} bar`, 19, 800, '#10233c', 'start')}
      ${cadran(340, 210, 150, S.mano || 'BP', S.p, S.anneau)}
      ${T(760, 48, `chambre : ${deg(S.th)} °C`, 26, 800, '#10233c')}
      ${T(760, 82, S.comp ? 'compresseur en marche' : 'compresseur à l’arrêt', 20, 800, S.comp ? '#1e7e54' : '#56657a')}
      <rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#fffdf8" stroke="#56657a" stroke-width="2"/>
      ${bande(P.tmax, 'maxi')}${bande(P.tmin, 'mini')}
      ${pts ? `<polyline points="${pts}" fill="none" stroke="#1f6fa8" stroke-width="3"/>` : ''}
      ${T((x0 + x1) / 2, y1 + 22, 'la température de la chambre, au fil du temps', 16, 700, '#56657a')}` };
  }

  return { poste, posteChambre, JAUGES, vueFace, vueAtelier, vueChambre, vueContact, kp, cadran, systemeContact, DEFS };
})();
