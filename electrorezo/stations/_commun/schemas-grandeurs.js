/* ÉlectroRézo — les scènes de la ligne 1 « Les grandeurs de l'électricité ».

   Une grandeur ne se photographie pas. Alors on la montre autrement : par ce
   qu'elle FAIT quand on la fait varier. D'où les réglettes — l'élève tourne un
   bouton, et il voit le fil chauffer, le moteur ralentir, la facture monter.

   Deux règles de maison tenues ici :
     · aucune couleur ne porte seule l'information — chaque état est aussi écrit ;
     · aucun texte ne chevauche un tracé.

   Les symboles d'instruments reprennent la géométrie de la bibliothèque :
     · ampèremètre / voltmètre — un cercle de rayon 10 traversé, comme lampe2.svg
     · le rond du moteur — bobine_et_rond, ligne 8. */

const SchemasGrandeurs = (() => {
  'use strict';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', doux:'#84b7ec', orange:'#c9451a', feu:'#ff6b35',
              vert:'#1e7e54', rouge:'#c0392b', gris:'#637285', papier:'#fffdf8',
              creme:'#f7f1e7', trait:'rgba(27,58,99,.18)', cuivre:'#c07a3e' };

  const svg = (vb, aria) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria); return s;
  };
  const nb = (v, d) => v.toFixed(d === undefined ? 1 : d).replace('.', ',');

  /* Un bloc : le dessin, des boutons d'état facultatifs, une légende qui suit. */
  function bloc(dessin, etats, defaut, legende) {
    const hote = document.createElement('div');
    hote.appendChild(dessin);
    const leg = document.createElement('p');
    if (etats && etats.length > 1) {
      const barre = document.createElement('div');
      barre.className = 'choix'; barre.style.marginTop = '.6rem';
      etats.forEach(e => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = e.libelle;
        b.setAttribute('aria-pressed', String(e.id === defaut));
        b.addEventListener('click', () => {
          barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          e.appliquer(); leg.textContent = e.legende;
        });
        barre.appendChild(b);
      });
      hote.appendChild(barre);
    }
    leg.className = 'legende'; leg.textContent = legende;
    hote.appendChild(leg);
    return hote;
  }

  /* Une réglette : étiquette, curseur, valeur lue. */
  function reglette(hote, id, etiquette, min, max, pas, valeur, formater, auChangement) {
    const l = document.createElement('div'); l.className = 'reglette';
    const lab = document.createElement('label'); lab.setAttribute('for', id); lab.textContent = etiquette;
    const r = document.createElement('input');
    r.type = 'range'; r.id = id; r.min = min; r.max = max; r.step = pas; r.value = valeur;
    const o = document.createElement('output'); o.textContent = formater(valeur);
    r.addEventListener('input', () => { o.textContent = formater(+r.value); auChangement(+r.value); });
    l.append(lab, r, o); hote.appendChild(l);
    return r;
  }

  /* Un instrument de mesure : le cercle et sa lettre. */
  const instrument = (x, y, lettre, couleur, r) =>
    `<circle cx="${x}" cy="${y}" r="${r || 20}" fill="${C.papier}" stroke="${couleur}" stroke-width="3.5"/>
     <text x="${x}" y="${y + 7}" text-anchor="middle" font-size="19" font-weight="700" fill="${couleur}">${lettre}</text>`;

  /* ============================================================ 1.1 — le débit
     Ce qui circule dans un fil, et ce que « intensité » veut dire : un débit,
     pas une quantité. */
  function debitDeCharges() {
    const d = svg('0 0 760 300', 'Un conducteur vu de l’intérieur : les charges avancent toutes ensemble, et l’intensité compte celles qui passent une section par seconde.');
    const peindre = (fort) => {
      const n = fort ? 22 : 9;
      d.innerHTML = `
<rect x="8" y="8" width="744" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${fort ? 'Beaucoup de charges passent : l’intensité est forte' : 'Peu de charges passent : l’intensité est faible'}</text>

<rect x="60" y="96" width="640" height="70" rx="8" fill="${C.cuivre}" opacity=".22" stroke="${C.cuivre}" stroke-width="3"/>
<text x="60" y="88" font-size="12" fill="${C.gris}">le conducteur, vu en coupe longitudinale</text>

${Array.from({ length: n }, (_, i) => {
  const x = 78 + (i * 604) / n;
  return `<circle cx="${x}" cy="${112 + (i % 3) * 20}" r="7" fill="${C.navy}"/>`;
}).join('')}

<path d="M300 200 L460 200" stroke="${C.orange}" stroke-width="4"/>
<path d="M448 192 L462 200 L448 208" fill="none" stroke="${C.orange}" stroke-width="4"/>
<text x="380" y="228" text-anchor="middle" font-size="13" fill="${C.orange}">elles avancent toutes dans le même sens</text>

<line x1="500" y1="80" x2="500" y2="182" stroke="${C.rouge}" stroke-width="3" stroke-dasharray="7 5"/>
<text x="512" y="86" font-size="13" font-weight="700" fill="${C.rouge}">une section</text>
<text x="512" y="104" font-size="12" fill="${C.gris}">on compte ce qui la traverse</text>
<text x="512" y="122" font-size="12" fill="${C.gris}">en une seconde</text>

<text x="380" y="264" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">L’intensité est un débit. Pas une quantité : une quantité par seconde.</text>`;
    };
    peindre(false);
    return bloc(d, [
      { id: 'faible', libelle: 'Peu de charges', legende: 'Peu de charges franchissent la section chaque seconde : l’intensité est faible. Le fil ne chauffe presque pas.', appliquer: () => peindre(false) },
      { id: 'fort', libelle: 'Beaucoup de charges', legende: 'Beaucoup de charges franchissent la même section dans le même temps : l’intensité est forte. C’est elle qui fait chauffer le conducteur.', appliquer: () => peindre(true) }
    ], 'faible', 'Peu de charges franchissent la section chaque seconde : l’intensité est faible. Le fil ne chauffe presque pas.');
  }

  /* 1.1 · mesurer — l'ampèremètre se met EN SÉRIE. L'erreur inverse détruit l'appareil. */
  function brancherAmperemetre() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 320', 'Deux façons de brancher un ampèremètre : en série, qui est la bonne, et en parallèle, qui met la source en court-circuit.');
    const verdict = document.createElement('p');

    const peindre = (mode) => {
      const serie = mode === 'serie';
      d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="42" text-anchor="middle" font-size="17" font-weight="700"
      fill="${serie ? C.vert : C.rouge}">${serie ? 'En série — l’appareil est traversé' : 'En parallèle — la source est mise en court-circuit'}</text>

<rect x="120" y="84" width="60" height="120" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="150" y="150" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">source</text>
<line x1="150" y1="68" x2="150" y2="84" stroke="${C.navy}" stroke-width="4"/>
<line x1="150" y1="204" x2="150" y2="222" stroke="${C.navy}" stroke-width="4"/>

<line x1="150" y1="68" x2="${serie ? 300 : 560}" y2="68" stroke="${serie ? C.orange : C.rouge}" stroke-width="4"/>
${serie
  ? `${instrument(330, 68, 'A', C.orange, 22)}
     <line x1="352" y1="68" x2="560" y2="68" stroke="${C.orange}" stroke-width="4"/>`
  : `${instrument(350, 145, 'A', C.rouge, 22)}
     <line x1="350" y1="68" x2="350" y2="123" stroke="${C.rouge}" stroke-width="4"/>
     <line x1="350" y1="167" x2="350" y2="222" stroke="${C.rouge}" stroke-width="4"/>`}

<line x1="560" y1="68" x2="560" y2="110" stroke="${serie ? C.orange : C.rouge}" stroke-width="4"/>
<rect x="530" y="110" width="60" height="90" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="560" y="160" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">charge</text>
<line x1="560" y1="200" x2="560" y2="222" stroke="${serie ? C.orange : C.rouge}" stroke-width="4"/>
<line x1="150" y1="222" x2="560" y2="222" stroke="${serie ? C.orange : C.rouge}" stroke-width="4"/>

${serie
  ? `<text x="350" y="262" text-anchor="middle" font-size="13" fill="${C.gris}">Tout le courant de la charge traverse l’appareil : c’est ce qu’il compte.</text>
     <text x="350" y="286" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">On ouvre le circuit et on met l’appareil dans le trou.</text>`
  : `<text x="350" y="262" text-anchor="middle" font-size="13" fill="${C.gris}">Un ampèremètre est un fil, ou presque : sa résistance est minuscule.</text>
     <text x="350" y="286" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">Branché ainsi, il court-circuite la source. L’appareil est détruit.</text>`}`;
    };
    peindre('serie');
    hote.appendChild(d);

    const barre = document.createElement('div');
    barre.className = 'choix'; barre.style.marginTop = '.6rem';
    [['serie', 'Le brancher en série', 'ok', 'C’est la bonne réponse. Un ampèremètre compte ce qui le traverse : il faut donc qu’il soit traversé. On ouvre le circuit, et on le met dans le trou.'],
     ['parallele', 'Le brancher en parallèle', 'bad', 'Non — et c’est l’erreur qui coûte le plus cher en atelier. Un ampèremètre a une résistance presque nulle : mis en parallèle, il met la source en court-circuit. Le fusible de l’appareil part, quand ce n’est pas l’appareil.']]
      .forEach(([id, lib, cl, txt]) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
        b.setAttribute('aria-pressed', String(id === 'serie'));
        b.addEventListener('click', () => {
          barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          peindre(id);
          verdict.className = 'verdict ' + cl;
          verdict.innerHTML = '<span class="signe">' + (cl === 'ok' ? '✔' : '✘') + '</span>' + txt;
        });
        barre.appendChild(b);
      });
    hote.appendChild(barre);
    verdict.className = 'verdict wait';
    verdict.innerHTML = '<span class="signe">•</span>Vous voulez connaître le courant qui traverse la charge. Où mettez-vous l’appareil ?';
    hote.appendChild(verdict);
    return hote;
  }

  /* ============================================================ 1.2 — la tension
     Une différence, jamais une quantité absolue. C'est le point que tout le
     monde manque, et il explique pourquoi l'oiseau sur la ligne ne meurt pas. */
  function differenceDePotentiel() {
    const d = svg('0 0 760 320', 'La tension est une différence entre deux points. Entre deux points au même niveau, elle est nulle, et rien ne circule.');
    const peindre = (cas) => {
      const [ha, hb] = { normal: [80, 240], egal: [160, 160], fort: [60, 260] }[cas];
      const u = Math.round((hb - ha) * 1.45);
      d.innerHTML = `
<rect x="8" y="8" width="744" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${u === 0 ? 'Deux points au même potentiel — aucune tension' : 'Deux points à des potentiels différents'}</text>

<line x1="120" y1="280" x2="640" y2="280" stroke="${C.navy}" stroke-width="2"/>
<text x="120" y="300" font-size="12" fill="${C.gris}">une référence, choisie une fois pour toutes</text>

<line x1="220" y1="${ha}" x2="320" y2="${ha}" stroke="${C.bleu}" stroke-width="7"/>
<line x1="270" y1="${ha}" x2="270" y2="280" stroke="${C.bleu}" stroke-width="2" stroke-dasharray="5 5"/>
<text x="200" y="${ha - 12}" text-anchor="end" font-size="14" font-weight="700" fill="${C.bleu}">point A</text>

<line x1="440" y1="${hb}" x2="540" y2="${hb}" stroke="${C.orange}" stroke-width="7"/>
<line x1="490" y1="${hb}" x2="490" y2="280" stroke="${C.orange}" stroke-width="2" stroke-dasharray="5 5"/>
<text x="560" y="${hb - 12}" font-size="14" font-weight="700" fill="${C.orange}">point B</text>

${u === 0
  ? `<line x1="320" y1="160" x2="440" y2="160" stroke="${C.gris}" stroke-width="3" stroke-dasharray="6 5"/>
     <text x="380" y="146" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}">aucune différence</text>`
  : `<line x1="380" y1="${ha}" x2="380" y2="${hb}" stroke="${C.rouge}" stroke-width="5"/>
     <path d="M373 ${ha + 10} L380 ${ha} L387 ${ha + 10}" fill="none" stroke="${C.rouge}" stroke-width="4"/>
     <path d="M373 ${hb - 10} L380 ${hb} L387 ${hb - 10}" fill="none" stroke="${C.rouge}" stroke-width="4"/>
     <text x="396" y="${(ha + hb) / 2 + 5}" font-size="17" font-weight="700" fill="${C.rouge}">U = ${u} V</text>`}

<text x="380" y="${u === 0 ? 246 : 300}" text-anchor="middle" font-size="13" fill="${C.gris}">${u === 0
  ? 'Un oiseau posé sur un seul fil a ses deux pattes au même potentiel. Il ne lui arrive rien.'
  : 'La tension ne se mesure jamais « en un point ». Elle se mesure entre deux points, toujours.'}</text>`;
    };
    peindre('normal');
    return bloc(d, [
      { id: 'normal', libelle: 'Deux niveaux', legende: 'Il y a une différence entre A et B : c’est cette différence qu’on appelle la tension. Elle vaut 232 V dans cet exemple.', appliquer: () => peindre('normal') },
      { id: 'fort', libelle: 'Écart plus grand', legende: 'L’écart augmente, la tension augmente. Rien d’autre n’a changé : ni A ni B ne « contient » de la tension.', appliquer: () => peindre('fort') },
      { id: 'egal', libelle: 'Même niveau', legende: 'Les deux points sont au même potentiel. La tension est nulle, et rien ne circulera entre eux, quelle que soit la valeur du potentiel lui-même.', appliquer: () => peindre('egal') }
    ], 'normal', 'Il y a une différence entre A et B : c’est cette différence qu’on appelle la tension. Elle vaut 232 V dans cet exemple.');
  }

  /* 1.2 · mesurer — le voltmètre se met EN PARALLÈLE, aux bornes. */
  function brancherVoltmetre() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 300', 'Deux façons de brancher un voltmètre : en parallèle aux bornes, qui est la bonne, et en série, qui bloque le circuit.');
    const verdict = document.createElement('p');

    const peindre = (mode) => {
      const para = mode === 'parallele';
      d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="42" text-anchor="middle" font-size="17" font-weight="700"
      fill="${para ? C.vert : C.rouge}">${para ? 'En parallèle — aux bornes de ce qu’on veut mesurer' : 'En série — plus rien ne passe'}</text>

<rect x="110" y="80" width="56" height="110" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="138" y="140" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">source</text>
<line x1="138" y1="64" x2="138" y2="80" stroke="${C.navy}" stroke-width="4"/>
<line x1="138" y1="190" x2="138" y2="210" stroke="${C.navy}" stroke-width="4"/>

${para
  ? `<line x1="138" y1="64" x2="540" y2="64" stroke="${C.orange}" stroke-width="4"/>`
  : `<line x1="138" y1="64" x2="308" y2="64" stroke="${C.orange}" stroke-width="4"/>
     ${instrument(338, 64, 'V', C.rouge, 22)}
     <line x1="360" y1="64" x2="540" y2="64" stroke="rgba(27,58,99,.22)" stroke-width="4"/>`}

<line x1="540" y1="64" x2="540" y2="100" stroke="${para ? C.orange : 'rgba(27,58,99,.22)'}" stroke-width="4"/>
<rect x="510" y="100" width="60" height="86" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="540" y="148" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">charge</text>
<line x1="540" y1="186" x2="540" y2="210" stroke="${para ? C.orange : 'rgba(27,58,99,.22)'}" stroke-width="4"/>
<line x1="138" y1="210" x2="540" y2="210" stroke="${para ? C.orange : 'rgba(27,58,99,.22)'}" stroke-width="4"/>

${para
  ? `<line x1="620" y1="64" x2="620" y2="105" stroke="${C.bleu}" stroke-width="3.5"/>
     <line x1="540" y1="64" x2="620" y2="64" stroke="${C.bleu}" stroke-width="3.5"/>
     <line x1="620" y1="185" x2="620" y2="210" stroke="${C.bleu}" stroke-width="3.5"/>
     <line x1="540" y1="210" x2="620" y2="210" stroke="${C.bleu}" stroke-width="3.5"/>
     ${instrument(620, 145, 'V', C.bleu, 20)}
     <text x="350" y="248" text-anchor="middle" font-size="13" fill="${C.gris}">On ne coupe rien : on pose les deux pointes sur les deux bornes.</text>
     <text x="350" y="272" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">Un voltmètre mesure une différence : il lui faut deux points.</text>`
  : `<text x="350" y="248" text-anchor="middle" font-size="13" fill="${C.gris}">Un voltmètre a une résistance énorme : c’est presque un fil coupé.</text>
     <text x="350" y="272" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">Mis en série, il empêche le courant de passer. La charge ne fonctionne plus.</text>`}`;
    };
    peindre('parallele');
    hote.appendChild(d);

    const barre = document.createElement('div');
    barre.className = 'choix'; barre.style.marginTop = '.6rem';
    [['parallele', 'Aux bornes, en parallèle', 'ok', 'Oui. Une tension est une différence entre deux points : on pose donc une pointe sur chacun, sans rien couper. C’est la mesure la plus simple, et la seule qu’on fait sous tension.'],
     ['serie', 'Dans le circuit, en série', 'bad', 'Non. Un voltmètre a une résistance énorme, de l’ordre du million d’ohms. Mis en série, c’est comme si vous aviez coupé le fil : la charge s’arrête, et vous ne mesurez rien d’utile.']]
      .forEach(([id, lib, cl, txt]) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
        b.setAttribute('aria-pressed', String(id === 'parallele'));
        b.addEventListener('click', () => {
          barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          peindre(id);
          verdict.className = 'verdict ' + cl;
          verdict.innerHTML = '<span class="signe">' + (cl === 'ok' ? '✔' : '✘') + '</span>' + txt;
        });
        barre.appendChild(b);
      });
    hote.appendChild(barre);
    verdict.className = 'verdict wait';
    verdict.innerHTML = '<span class="signe">•</span>Vous voulez connaître la tension aux bornes de la charge. Où mettez-vous l’appareil ?';
    hote.appendChild(verdict);
    return hote;
  }

  /* ============================================================ 1.3 — la loi d'Ohm
     LA réglette de la ligne. On tourne, et on voit. */
  function curseurOhm() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 300', 'Un circuit simple : une tension, une résistance, et le courant qui en résulte.');
    let U = 230, R = 100;

    const peindre = () => {
      const I = U / R;
      const P = U * I;
      /* la chaleur du fil : rendue par l'épaisseur ET par le mot, jamais par la seule couleur */
      const chaud = P > 2000 ? 'brûlant' : P > 800 ? 'chaud' : P > 200 ? 'tiède' : 'froid';
      const coul = P > 2000 ? C.rouge : P > 800 ? C.feu : P > 200 ? C.orange : C.bleu;
      d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">La tension pousse, la résistance freine</text>

<rect x="90" y="86" width="56" height="106" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="118" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">U</text>
<text x="118" y="154" text-anchor="middle" font-size="14" fill="${C.navy}">${U} V</text>

<line x1="118" y1="70" x2="480" y2="70" stroke="${coul}" stroke-width="${Math.max(3, Math.min(15, 3 + I * 1.1))}"/>
<line x1="118" y1="70" x2="118" y2="86" stroke="${coul}" stroke-width="4"/>
<line x1="118" y1="192" x2="118" y2="214" stroke="${coul}" stroke-width="4"/>
<line x1="118" y1="214" x2="480" y2="214" stroke="${coul}" stroke-width="${Math.max(3, Math.min(15, 3 + I * 1.1))}"/>

<line x1="480" y1="70" x2="480" y2="104" stroke="${coul}" stroke-width="4"/>
<rect x="446" y="104" width="68" height="76" rx="4" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="480" y="136" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">R</text>
<text x="480" y="158" text-anchor="middle" font-size="14" fill="${C.navy}">${R} Ω</text>
<line x1="480" y1="180" x2="480" y2="214" stroke="${coul}" stroke-width="4"/>

<text x="300" y="56" text-anchor="middle" font-size="13" fill="${coul}">le fil est ${chaud}</text>

<rect x="546" y="86" width="132" height="112" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="612" y="112" text-anchor="middle" font-size="12" fill="${C.gris}">il passe</text>
<text x="612" y="142" text-anchor="middle" font-size="26" font-weight="700" fill="${C.orange}">${nb(I, I < 10 ? 2 : 1)}</text>
<text x="612" y="164" text-anchor="middle" font-size="15" fill="${C.orange}">ampères</text>
<text x="612" y="188" text-anchor="middle" font-size="12" fill="${C.gris}">soit ${Math.round(P)} W dissipés</text>

<text x="350" y="252" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">${U} = ${R} × ${nb(I, I < 10 ? 2 : 1)}</text>
<text x="350" y="276" text-anchor="middle" font-size="13" fill="${C.gris}">Les trois vont toujours ensemble. Fixez-en deux, la troisième est décidée.</text>`;
    };
    peindre();
    hote.appendChild(d);

    reglette(hote, 'ohmU', 'La tension', 12, 400, 1, U, v => v + ' V', v => { U = v; peindre(); });
    reglette(hote, 'ohmR', 'La résistance', 5, 500, 1, R, v => v + ' Ω', v => { R = v; peindre(); });

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Poussez la tension : le courant monte. Augmentez la résistance : il descend. '
      + 'Cherchez le réglage qui fait passer exactement 16 ampères — il y en a plusieurs.';
    hote.appendChild(p);
    return hote;
  }

  /* 1.3 · mesurer — l'ohmmètre ne se branche jamais sous tension. */
  function mesurerResistance() {
    const d = svg('0 0 700 300', 'Un ohmmètre envoie son propre petit courant : il ne peut travailler que hors tension, sur un élément débranché.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">L’ohmmètre fabrique lui-même son courant</text>

${instrument(180, 132, 'Ω', C.navy, 30)}
<line x1="210" y1="112" x2="300" y2="112" stroke="${C.navy}" stroke-width="4"/>
<line x1="210" y1="152" x2="300" y2="152" stroke="${C.navy}" stroke-width="4"/>
<rect x="300" y="96" width="90" height="72" rx="5" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="345" y="138" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">R</text>

<path d="M232 100 L268 100" stroke="${C.orange}" stroke-width="3"/>
<path d="M260 94 L270 100 L260 106" fill="none" stroke="${C.orange}" stroke-width="3"/>
<text x="250" y="88" text-anchor="middle" font-size="12" fill="${C.orange}">son courant à lui</text>

<line x1="440" y1="60" x2="440" y2="230" stroke="${C.trait}" stroke-width="2" stroke-dasharray="6 6"/>

<text x="570" y="90" text-anchor="middle" font-size="15" font-weight="700" fill="${C.rouge}">Ce qu’il ne faut jamais faire</text>
<rect x="500" y="108" width="140" height="58" rx="8" fill="none" stroke="${C.rouge}" stroke-width="3"/>
<text x="570" y="134" text-anchor="middle" font-size="13" fill="${C.rouge}">mesurer une résistance</text>
<text x="570" y="154" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">sous tension</text>
<text x="570" y="192" text-anchor="middle" font-size="12" fill="${C.gris}">La tension du réseau écrase</text>
<text x="570" y="210" text-anchor="middle" font-size="12" fill="${C.gris}">le petit courant de l’appareil.</text>

<text x="350" y="262" text-anchor="middle" font-size="13" fill="${C.gris}">On coupe, on consigne, on débranche au moins un côté — et alors on mesure.</text>
<text x="350" y="282" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">Sinon la valeur lue est fausse, et l’appareil peut être détruit.</text>`;
    return bloc(d, [], null,
      'Un ohmmètre n’écoute pas : il parle. Il envoie son propre courant et regarde ce qui revient. Toute tension étrangère fausse la mesure.');
  }

  /* ============================================================ 1.4 — puissance et énergie
     La confusion la plus fréquente de tout le métier. */
  function puissanceEtEnergie() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 300', 'La puissance est un débit ; l’énergie est ce qui s’accumule. Un appareil puissant allumé une minute consomme moins qu’un appareil modeste allumé toute la nuit.');
    let P = 2000, h = 0.25;

    const peindre = () => {
      const E = P * h / 1000;
      const hauteur = Math.min(150, E * 22);
      d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">La puissance coule, l’énergie s’accumule</text>

<rect x="70" y="72" width="150" height="60" rx="8" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="145" y="98" text-anchor="middle" font-size="13" fill="${C.gris}">l’appareil demande</text>
<text x="145" y="122" text-anchor="middle" font-size="19" font-weight="700" fill="${C.navy}">${P} W</text>

<path d="M230 102 L300 102" stroke="${C.orange}" stroke-width="${Math.max(4, Math.min(22, P / 160))}"/>
<path d="M290 ${102 - Math.max(6, Math.min(16, P / 220))} L306 102 L290 ${102 + Math.max(6, Math.min(16, P / 220))}"
      fill="none" stroke="${C.orange}" stroke-width="4"/>
<text x="266" y="70" text-anchor="middle" font-size="12" fill="${C.orange}">le débit</text>

<rect x="320" y="80" width="120" height="160" rx="6" fill="none" stroke="${C.navy}" stroke-width="3"/>
<rect x="323" y="${240 - hauteur}" width="114" height="${hauteur}" fill="${C.orange}" opacity=".75"/>
<text x="380" y="264" text-anchor="middle" font-size="12" fill="${C.gris}">ce qui s’est accumulé</text>

<rect x="474" y="96" width="176" height="112" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="562" y="124" text-anchor="middle" font-size="12" fill="${C.gris}">pendant ${h < 1 ? Math.round(h * 60) + ' minutes' : nb(h, h % 1 ? 1 : 0) + ' heure' + (h > 1 ? 's' : '')}</text>
<text x="562" y="160" text-anchor="middle" font-size="28" font-weight="700" fill="${C.orange}">${nb(E, E < 10 ? 2 : 1)}</text>
<text x="562" y="182" text-anchor="middle" font-size="15" fill="${C.orange}">kilowattheures</text>
<text x="562" y="202" text-anchor="middle" font-size="12" fill="${C.gris}">c’est ce que compte le compteur</text>

<text x="350" y="286" text-anchor="middle" font-size="13" fill="${C.gris}">Une puissance ne se paie pas. Ce qui se paie, c’est une puissance multipliée par un temps.</text>`;
    };
    peindre();
    hote.appendChild(d);

    reglette(hote, 'pP', 'La puissance', 100, 3500, 50, P, v => v + ' W', v => { P = v; peindre(); });
    reglette(hote, 'pH', 'La durée', 0.25, 8, 0.25, h, v => v < 1 ? Math.round(v * 60) + ' min' : nb(v, v % 1 ? 1 : 0) + ' h',
      v => { h = v; peindre(); });

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Essayez : un radiateur de 2000 W un quart d’heure, contre une veille de 100 W toute la nuit. '
      + 'Le gros appareil n’est pas toujours celui qui coûte le plus cher.';
    hote.appendChild(p);
    return hote;
  }

  function compteurEnergie() {
    const d = svg('0 0 700 280', 'Un compteur d’énergie ne mesure pas des watts : il additionne des kilowattheures.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="264" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Deux appareils, deux métiers</text>

<rect x="60" y="72" width="256" height="140" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="188" y="100" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">La pince, le multimètre</text>
${instrument(188, 142, 'W', C.bleu, 26)}
<text x="188" y="192" text-anchor="middle" font-size="12" fill="${C.gris}">ils disent ce qui passe MAINTENANT</text>

<rect x="384" y="72" width="256" height="140" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="512" y="100" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Le compteur</text>
<rect x="446" y="118" width="132" height="42" rx="4" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<text x="512" y="147" text-anchor="middle" font-size="21" font-weight="700" fill="${C.navy}">041 372</text>
<text x="512" y="192" text-anchor="middle" font-size="12" fill="${C.gris}">il additionne DEPUIS LE DÉBUT</text>

<text x="350" y="240" text-anchor="middle" font-size="13" fill="${C.gris}">Un compteur ne redescend jamais. C’est un total, pas une mesure instantanée.</text>
<text x="350" y="262" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">Deux relevés, une soustraction : voilà l’énergie consommée entre les deux.</text>`;
    return bloc(d, [], null,
      'On ne « mesure » pas une consommation d’un coup d’œil : on relève deux fois, et on soustrait.');
  }

  /* ============================================================ 1.5 — continu et alternatif */
  function continuAlternatif() {
    const d = svg('0 0 760 300', 'Deux allures de courant : le continu, constant, et l’alternatif, qui change de sens cinquante fois par seconde.');
    const trace = (alt) => {
      const pts = [];
      for (let i = 0; i <= 600; i += 4) {
        const y = alt ? 160 - 78 * Math.sin((i / 600) * Math.PI * 6) : 116;
        pts.push((90 + i) + ',' + y.toFixed(1));
      }
      return pts.join(' ');
    };
    const peindre = (alt) => {
      d.innerHTML = `
<rect x="8" y="8" width="744" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${alt ? 'Alternatif — il change de sens sans arrêt' : 'Continu — il garde toujours le même sens'}</text>

<line x1="90" y1="160" x2="700" y2="160" stroke="${C.navy}" stroke-width="2"/>
<line x1="90" y1="60" x2="90" y2="250" stroke="${C.navy}" stroke-width="2"/>
<text x="700" y="180" text-anchor="end" font-size="12" fill="${C.gris}">le temps →</text>
<text x="82" y="70" text-anchor="end" font-size="12" fill="${C.gris}">+</text>
<text x="82" y="250" text-anchor="end" font-size="12" fill="${C.gris}">−</text>

<polyline points="${trace(alt)}" fill="none" stroke="${C.orange}" stroke-width="4"/>

${alt
  ? `<text x="380" y="218" text-anchor="middle" font-size="13" fill="${C.gris}">Cinquante allers-retours par seconde. Il passe cent fois par zéro.</text>
     <text x="380" y="244" text-anchor="middle" font-size="13" fill="${C.gris}">Ce qu’on appelle « 230 V » n’est ni le maximum, ni la moyenne : c’est la valeur efficace.</text>
     <text x="380" y="272" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Le maximum, lui, monte à environ 325 V.</text>`
  : `<text x="380" y="218" text-anchor="middle" font-size="13" fill="${C.gris}">Une batterie, une alimentation, un panneau photovoltaïque.</text>
     <text x="380" y="244" text-anchor="middle" font-size="13" fill="${C.gris}">La valeur ne bouge pas, et le sens non plus. Il y a donc un plus et un moins.</text>
     <text x="380" y="272" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Les brancher à l’envers ne fait pas rien : là, le sens compte.</text>`}`;
    };
    peindre(false);
    return bloc(d, [
      { id: 'continu', libelle: 'Continu', legende: 'La valeur est constante et le sens ne change pas. Il y a un plus et un moins, et les inverser a des conséquences.', appliquer: () => peindre(false) },
      { id: 'alternatif', libelle: 'Alternatif', legende: 'Le courant change de sens cinquante fois par seconde. Il n’y a ni plus ni moins : il y a une phase et un neutre, qui ne sont pas la même chose.', appliquer: () => peindre(true) }
    ], 'continu', 'La valeur est constante et le sens ne change pas. Il y a un plus et un moins, et les inverser a des conséquences.');
  }

  function selecteurContinuAlternatif() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 280', 'Le sélecteur d’un multimètre : la position continu et la position alternatif ne lisent pas la même chose.');
    const verdict = document.createElement('p');

    const peindre = (bon) => {
      d.innerHTML = `
<rect x="8" y="8" width="684" height="264" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Une prise du réseau, mesurée de deux façons</text>

<rect x="80" y="72" width="230" height="150" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="195" y="100" text-anchor="middle" font-size="14" font-weight="700"
      fill="${bon === 'ac' ? C.vert : C.gris}">position alternatif</text>
<rect x="118" y="118" width="154" height="52" rx="5" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<text x="195" y="154" text-anchor="middle" font-size="24" font-weight="700"
      fill="${bon === 'ac' ? C.vert : C.gris}">231 V</text>
<text x="195" y="196" text-anchor="middle" font-size="12" fill="${C.gris}">la vraie valeur efficace</text>

<rect x="390" y="72" width="230" height="150" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="505" y="100" text-anchor="middle" font-size="14" font-weight="700"
      fill="${bon === 'dc' ? C.rouge : C.gris}">position continu</text>
<rect x="428" y="118" width="154" height="52" rx="5" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<text x="505" y="154" text-anchor="middle" font-size="24" font-weight="700"
      fill="${bon === 'dc' ? C.rouge : C.gris}">0,3 V</text>
<text x="505" y="196" text-anchor="middle" font-size="12" fill="${C.gris}">une valeur qui ne veut rien dire</text>

<text x="350" y="252" text-anchor="middle" font-size="13" fill="${C.gris}">Même prise, même appareil, même instant. Seul le sélecteur a changé.</text>`;
    };
    peindre(null);
    hote.appendChild(d);

    const barre = document.createElement('div');
    barre.className = 'choix'; barre.style.marginTop = '.6rem';
    [['ac', 'Position alternatif', 'ok', 'Oui. Sur le réseau, c’est la seule position juste. L’appareil calcule la valeur efficace, celle qui compte : 230 volts.'],
     ['dc', 'Position continu', 'bad', 'Non — et voilà le piège. L’appareil ne refuse pas, il n’affiche pas d’erreur : il affiche presque zéro. Comme le courant fait autant d’allers que de retours, sa moyenne est nulle. Vous pourriez conclure que la prise n’est pas alimentée, et poser la main dessus.']]
      .forEach(([id, lib, cl, txt]) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => {
          barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          peindre(id);
          verdict.className = 'verdict ' + cl;
          verdict.innerHTML = '<span class="signe">' + (cl === 'ok' ? '✔' : '✘') + '</span>' + txt;
        });
        barre.appendChild(b);
      });
    hote.appendChild(barre);
    verdict.className = 'verdict wait';
    verdict.innerHTML = '<span class="signe">•</span>Vous mesurez une prise du réseau. Sur quelle position mettez-vous le sélecteur ?';
    hote.appendChild(verdict);
    return hote;
  }

  /* ============================================================ 1.6 — la fréquence */
  function frequenceReglable() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 300', 'Une sinusoïde dont on fait varier la fréquence, et la vitesse du moteur qui en découle.');
    let f = 50;

    const peindre = () => {
      const pts = [];
      for (let i = 0; i <= 560; i += 3) {
        const y = 140 - 62 * Math.sin((i / 560) * Math.PI * 2 * (f / 12.5));
        pts.push((100 + i) + ',' + y.toFixed(1));
      }
      const tr = Math.round(f * 60);      /* vitesse de synchronisme, moteur 2 pôles */
      return d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">La fréquence, c’est le nombre d’allers-retours par seconde</text>

<line x1="100" y1="140" x2="660" y2="140" stroke="${C.navy}" stroke-width="2"/>
<polyline points="${pts.join(' ')}" fill="none" stroke="${C.orange}" stroke-width="3.5"/>
<text x="660" y="160" text-anchor="end" font-size="12" fill="${C.gris}">une seconde de signal</text>

<rect x="100" y="216" width="240" height="60" rx="8" fill="${C.creme}" stroke="${C.trait}"/>
<text x="220" y="238" text-anchor="middle" font-size="12" fill="${C.gris}">la fréquence</text>
<text x="220" y="266" text-anchor="middle" font-size="22" font-weight="700" fill="${C.orange}">${nb(f, f % 1 ? 1 : 0)} Hz</text>

<rect x="360" y="216" width="240" height="60" rx="8" fill="${C.creme}" stroke="${C.trait}"/>
<text x="480" y="238" text-anchor="middle" font-size="12" fill="${C.gris}">un moteur à deux pôles tournerait à</text>
<text x="480" y="266" text-anchor="middle" font-size="22" font-weight="700" fill="${C.navy}">${tr} tr/min</text>

${Math.abs(f - 50) < 0.6
  ? `<text x="350" y="196" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">50 Hz — la fréquence du réseau européen</text>`
  : `<text x="350" y="196" text-anchor="middle" font-size="13" fill="${C.gris}">Le réseau, lui, ne bouge pas de 50 Hz. Seul un variateur peut fabriquer cette valeur.</text>`}`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'freq', 'La fréquence', 10, 90, 1, f, v => v + ' Hz', v => { f = v; peindre(); });

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'La fréquence du réseau est verrouillée à 50 hertz : c’est une donnée, pas un réglage. '
      + 'Mais un variateur, lui, en fabrique une autre — et c’est comme cela qu’on change la vitesse d’un moteur.';
    hote.appendChild(p);
    return hote;
  }

  function frequenceReseau() {
    const d = svg('0 0 700 260', 'La fréquence du réseau est tenue à 50 hertz : elle est la même partout en Europe, et elle n’est jamais réglée localement.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="244" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Ce qu’un multimètre affiche, et ce qu’il ne dit pas</text>

${instrument(150, 130, 'Hz', C.navy, 34)}
<text x="150" y="188" text-anchor="middle" font-size="12" fill="${C.gris}">beaucoup de multimètres</text>
<text x="150" y="206" text-anchor="middle" font-size="12" fill="${C.gris}">savent l’afficher</text>

<rect x="250" y="84" width="180" height="92" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<text x="340" y="140" text-anchor="middle" font-size="30" font-weight="700" fill="${C.navy}">50,0 Hz</text>

<text x="470" y="106" font-size="13" font-weight="700" fill="${C.navy}">Elle ne varie pas.</text>
<text x="470" y="132" font-size="12" fill="${C.gris}">Sur un réseau public, elle est</text>
<text x="470" y="150" font-size="12" fill="${C.gris}">tenue à quelques centièmes près.</text>
<text x="470" y="176" font-size="12" fill="${C.gris}">Une valeur autre veut dire</text>
<text x="470" y="194" font-size="12" fill="${C.gris}">groupe électrogène, ou variateur.</text>

<text x="350" y="236" text-anchor="middle" font-size="13" fill="${C.gris}">Aux États-Unis, c’est 60 hertz — et un moteur européen y tourne 20 % plus vite.</text>`;
    return bloc(d, [], null,
      'La fréquence n’est pas un réglage d’installation. La lire, c’est surtout savoir d’où vient le courant.');
  }

  /* ============================================================ 1.7 — la plaque
     Valeurs relevées sur une plaque Leroy Somer réelle. */
  function plaqueSignaletique() {
    const d = svg('0 0 760 340', 'Une plaque signalétique de moteur, ligne par ligne : tension et couplage, intensité, puissance, vitesse, facteur de puissance, indice de protection.');
    const lignes = [
      ['Δ 230 V   Y 400 V', 'les deux couplages possibles, et sous quelle tension chacun', C.orange],
      ['6,65 A   3,84 A', 'l’intensité absorbée, dans le même ordre que les tensions', C.orange],
      ['1,5 kW', 'la puissance MÉCANIQUE rendue sur l’arbre, pas celle absorbée', C.navy],
      ['1435 tr/min', 'la vitesse en charge — un peu en dessous des 1500 de synchronisme', C.navy],
      ['cos φ 0,80', 'le facteur de puissance : ce qui travaille sur ce qui est appelé', C.navy],
      ['50 Hz   IP 55', 'la fréquence prévue, et la protection contre poussière et eau', C.gris]
    ];
    d.innerHTML = `
<rect x="8" y="8" width="744" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Tout ce qu’il faut savoir sur ce moteur tient sur une étiquette</text>
<rect x="36" y="58" width="240" height="252" rx="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="52" cy="74" r="4" fill="${C.navy}"/><circle cx="260" cy="74" r="4" fill="${C.navy}"/>
<circle cx="52" cy="294" r="4" fill="${C.navy}"/><circle cx="260" cy="294" r="4" fill="${C.navy}"/>
${lignes.map(([v], i) =>
  `<text x="156" y="${104 + i * 36}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">${v}</text>`).join('')}
${lignes.map(([, x, c], i) => `
<line x1="280" y1="${99 + i * 36}" x2="316" y2="${99 + i * 36}" stroke="${c}" stroke-width="2"/>
<text x="324" y="${104 + i * 36}" font-size="12.5" fill="${c}">${x}</text>`).join('')}`;
    return bloc(d, [], null,
      'Cette étiquette est la fiche d’identité du moteur. C’est elle qu’on lit avant de choisir le couplage, avant de régler le relais thermique, avant de commander une pièce.');
  }

  function plaqueContreMesure() {
    const d = svg('0 0 700 300', 'Comparer ce que la plaque annonce et ce que la pince mesure : c’est ainsi qu’on sait si une machine va bien.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">La plaque dit ce qui devrait être. La pince dit ce qui est.</text>

<rect x="60" y="72" width="240" height="120" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="180" y="100" text-anchor="middle" font-size="13" fill="${C.gris}">la plaque annonce</text>
<text x="180" y="140" text-anchor="middle" font-size="26" font-weight="700" fill="${C.navy}">3,84 A</text>
<text x="180" y="170" text-anchor="middle" font-size="12" fill="${C.gris}">en couplage étoile, à 400 V</text>

<rect x="400" y="72" width="240" height="120" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="520" y="100" text-anchor="middle" font-size="13" fill="${C.gris}">la pince mesure</text>
<text x="520" y="140" text-anchor="middle" font-size="26" font-weight="700" fill="${C.orange}">4,9 A</text>
<text x="520" y="170" text-anchor="middle" font-size="12" fill="${C.gris}">sur la même phase, en marche</text>

<path d="M312 132 L388 132" stroke="${C.rouge}" stroke-width="3"/>
<path d="M378 124 L390 132 L378 140" fill="none" stroke="${C.rouge}" stroke-width="3"/>

<text x="350" y="228" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">Un quart de plus que prévu : quelque chose force.</text>
<text x="350" y="254" text-anchor="middle" font-size="12.5" fill="${C.gris}">Un roulement qui serre, une pale qui frotte, une charge trop lourde, un mauvais couplage.</text>
<text x="350" y="278" text-anchor="middle" font-size="12.5" fill="${C.gris}">Sans la plaque, ce 4,9 A n’aurait rien voulu dire. C’est la comparaison qui informe.</text>`;
    return bloc(d, [], null,
      'Une mesure seule ne dit rien. C’est l’écart entre le mesuré et l’annoncé qui fait le diagnostic.');
  }

  /* ============================================================ 1.8 — les trois défauts
     Les mêmes pictogrammes que la ligne 4 : on les installe ici, on les
     retrouvera là-bas. */
  function troisDefauts() {
    const d = svg('0 0 760 320', 'Les trois façons dont un circuit peut mal se comporter : la surcharge, le court-circuit et le défaut d’isolement.');
    const peindre = (cas) => {
      const commun = `
<rect x="8" y="8" width="744" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<line x1="90" y1="80" x2="640" y2="80" stroke="${C.navy}" stroke-width="3"/>
<text x="76" y="85" text-anchor="end" font-size="13" font-weight="700" fill="${C.navy}">Ph</text>
<line x1="90" y1="250" x2="640" y2="250" stroke="${C.feu}" stroke-width="3"/>
<text x="76" y="255" text-anchor="end" font-size="13" font-weight="700" fill="${C.feu}">N</text>`;

      if (cas === 'surcharge') {
        d.innerHTML = commun + `
<text x="365" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.orange}">La surcharge — le bon chemin, trop de monde dessus</text>
<line x1="300" y1="80" x2="300" y2="130" stroke="${C.orange}" stroke-width="9"/>
<rect x="262" y="130" width="76" height="72" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="300" y="174" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">charge</text>
<line x1="300" y1="202" x2="300" y2="250" stroke="${C.orange}" stroke-width="9"/>
<text x="380" y="140" font-size="13" fill="${C.orange}">le courant est un peu au-dessus du normal…</text>
<text x="380" y="164" font-size="13" font-weight="700" fill="${C.orange}">…et il y reste.</text>
<text x="365" y="292" text-anchor="middle" font-size="13" fill="${C.gris}">Lent, discret, sans étincelle. Le conducteur chauffe, l’isolant vieillit. C’est le bilame qui voit ça.</text>`;
      } else if (cas === 'court') {
        d.innerHTML = commun + `
<text x="365" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.rouge}">Le court-circuit — la phase touche le neutre</text>
<line x1="300" y1="80" x2="300" y2="165" stroke="${C.rouge}" stroke-width="15"/>
<line x1="300" y1="165" x2="300" y2="250" stroke="${C.rouge}" stroke-width="15"/>
<circle cx="300" cy="165" r="20" fill="none" stroke="${C.rouge}" stroke-width="4"/>
<path d="M288 152 L306 164 L292 170 L312 182" fill="none" stroke="${C.feu}" stroke-width="3"/>
<rect x="440" y="130" width="76" height="72" rx="6" fill="none" stroke="rgba(27,58,99,.25)" stroke-width="4"/>
<text x="478" y="174" text-anchor="middle" font-size="14" fill="rgba(27,58,99,.4)">charge</text>
<text x="360" y="176" font-size="13" font-weight="700" fill="${C.rouge}">plus rien ne freine le courant</text>
<text x="365" y="292" text-anchor="middle" font-size="13" fill="${C.gris}">Brutal, énorme, immédiat. Des milliers d’ampères en quelques millièmes de seconde. C’est la bobine qui voit ça.</text>`;
      } else {
        d.innerHTML = commun + `
<text x="365" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.bleu}">Le défaut d’isolement — le courant part ailleurs</text>
<line x1="300" y1="80" x2="300" y2="130" stroke="${C.orange}" stroke-width="7"/>
<rect x="262" y="130" width="76" height="72" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="300" y="174" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">charge</text>
<line x1="300" y1="202" x2="300" y2="250" stroke="${C.orange}" stroke-width="5"/>
<path d="M338 152 L440 152 L440 268" fill="none" stroke="${C.bleu}" stroke-width="5" stroke-dasharray="9 5"/>
<line x1="414" y1="268" x2="466" y2="268" stroke="${C.navy}" stroke-width="5"/>
<line x1="424" y1="278" x2="456" y2="278" stroke="${C.navy}" stroke-width="5"/>
<line x1="433" y1="288" x2="447" y2="288" stroke="${C.navy}" stroke-width="5"/>
<text x="480" y="152" font-size="13" font-weight="700" fill="${C.bleu}">une partie du courant s’échappe</text>
<text x="480" y="176" font-size="13" fill="${C.bleu}">par la carcasse, ou par un corps</text>
<text x="365" y="308" text-anchor="middle" font-size="13" fill="${C.gris}">Ni fort ni lent : ailleurs. Quelques centièmes d’ampère suffisent à tuer. Seul le différentiel voit ça.</text>`;
      }
    };
    peindre('surcharge');
    return bloc(d, [
      { id: 'surcharge', libelle: 'La surcharge', legende: 'Le courant emprunte le bon chemin, mais il est trop fort et il dure. Le conducteur chauffe, l’isolant vieillit. Rien ne se voit.', appliquer: () => peindre('surcharge') },
      { id: 'court', libelle: 'Le court-circuit', legende: 'Deux conducteurs se touchent : le courant n’a plus rien pour le freiner. Des milliers d’ampères, en quelques millièmes de seconde.', appliquer: () => peindre('court') },
      { id: 'isolement', libelle: 'Le défaut d’isolement', legende: 'Le courant quitte son chemin et part vers la terre — par une carcasse, ou par une personne. Quelques centièmes d’ampère suffisent à tuer.', appliquer: () => peindre('isolement') }
    ], 'surcharge', 'Le courant emprunte le bon chemin, mais il est trop fort et il dure. Le conducteur chauffe, l’isolant vieillit. Rien ne se voit.');
  }

  function quelInstrumentVoitQuoi() {
    const t = document.createElement('div');
    const tab = document.createElement('table');
    tab.className = 'tab';
    tab.innerHTML = `<thead><tr><th>Le défaut</th><th>Ce qu’on mesure</th><th>Ce qui le voit dans l’installation</th></tr></thead>
<tbody>
<tr><td><strong>La surcharge</strong><br><span class="legende">trop de courant, longtemps</span></td>
    <td>une pince ampèremétrique, et on compare à la plaque</td>
    <td>un bilame — relais thermique, disjoncteur magnéto-thermique</td></tr>
<tr><td><strong>Le court-circuit</strong><br><span class="legende">énormément de courant, d’un coup</span></td>
    <td>rien, sur le moment : c’est trop rapide et trop dangereux</td>
    <td>une bobine, ou un fusible qui fond</td></tr>
<tr><td><strong>Le défaut d’isolement</strong><br><span class="legende">le courant part à la terre</span></td>
    <td>un mégohmmètre, hors tension, installation consignée</td>
    <td>un différentiel, et rien d’autre</td></tr>
</tbody>`;
    t.appendChild(tab);
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Trois défauts, trois instruments, trois protections. Aucun appareil ne fait les trois — sauf le disjoncteur différentiel, et vous le verrez à la station 4.6.';
    t.appendChild(p);
    return t;
  }

  /* ============================================================ 1.9 — le multimètre
     La deuxième réglette de la ligne, et la plus utile : choisir la position
     et les bornes, et voir ce qui arrive quand on se trompe. */
  function choisirLaMesure() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 320', 'Un multimètre : le sélecteur, les trois bornes, et ce qui se passe selon la combinaison choisie.');
    let pos = 'V~', borne = 'VΩ';

    const CAS = {
      'V~|VΩ':  ['ok',   'Correct. C’est la mesure la plus courante de l’atelier : tension alternative, pointes aux bornes, rien à couper.'],
      'V~|A':   ['bad',  'Non. Le sélecteur dit « tension », mais la pointe est dans la borne des ampères. Beaucoup d’appareils affichent alors n’importe quoi, et certains protestent.'],
      'A~|A':   ['ok',   'Correct pour un courant — mais il faut ouvrir le circuit et mettre l’appareil dans le trou. Sur un moteur, on préfère largement la pince : elle mesure sans rien débrancher.'],
      'A~|VΩ':  ['bad',  'Non. Le sélecteur dit « ampères » mais la pointe n’est pas dans la bonne borne : l’appareil ne verra rien passer.'],
      'Ω|VΩ':   ['bad',  'La borne est bonne, mais la position ohms ne s’emploie que HORS TENSION, sur un élément débranché d’au moins un côté. Sur une prise vivante, la valeur est fausse et l’appareil peut être détruit.'],
      'Ω|A':    ['bad',  'Ni la position ni la borne. La position ohms exige un circuit hors tension, et la borne des ampères est un quasi court-circuit.']
    };

    const peindre = () => {
      const clef = pos + '|' + borne;
      const [etat] = CAS[clef] || ['bad', ''];
      const bon = etat === 'ok';
      d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Le sélecteur et les bornes doivent dire la même chose</text>

<rect x="90" y="62" width="220" height="216" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="112" y="80" width="176" height="46" rx="4" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>
<text x="200" y="113" text-anchor="middle" font-size="21" font-weight="700"
      fill="${bon ? C.vert : C.gris}">${bon ? (pos === 'V~' ? '231 V' : '4,9 A') : '— — —'}</text>

<circle cx="200" cy="182" r="38" fill="none" stroke="${C.navy}" stroke-width="3"/>
<line x1="200" y1="182" x2="${200 + 30 * Math.cos({ 'V~': -Math.PI / 2, 'A~': Math.PI / 6, 'Ω': Math.PI * 5 / 6 }[pos])}"
      y2="${182 + 30 * Math.sin({ 'V~': -Math.PI / 2, 'A~': Math.PI / 6, 'Ω': Math.PI * 5 / 6 }[pos])}"
      stroke="${C.orange}" stroke-width="5"/>
<text x="200" y="134" text-anchor="middle" font-size="12" font-weight="700" fill="${pos === 'V~' ? C.orange : C.gris}">V ~</text>
<text x="252" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="${pos === 'A~' ? C.orange : C.gris}">A ~</text>
<text x="148" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="${pos === 'Ω' ? C.orange : C.gris}">Ω</text>

<circle cx="140" cy="256" r="9" fill="${borne === 'A' ? C.orange : C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<text x="140" y="240" text-anchor="middle" font-size="11" fill="${C.gris}">A</text>
<circle cx="200" cy="256" r="9" fill="${C.navy}" stroke="${C.navy}" stroke-width="2.5"/>
<text x="200" y="240" text-anchor="middle" font-size="11" fill="${C.gris}">COM</text>
<circle cx="260" cy="256" r="9" fill="${borne === 'VΩ' ? C.orange : C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<text x="260" y="240" text-anchor="middle" font-size="11" fill="${C.gris}">V Ω</text>

<rect x="360" y="72" width="290" height="120" rx="10" fill="none" stroke="${C.trait}" stroke-width="2"/>
<text x="380" y="100" font-size="13" fill="${C.gris}">le sélecteur est sur</text>
<text x="630" y="100" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">${{ 'V~': 'tension alternative', 'A~': 'courant alternatif', 'Ω': 'résistance' }[pos]}</text>
<text x="380" y="134" font-size="13" fill="${C.gris}">la pointe rouge est dans</text>
<text x="630" y="134" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">${borne === 'A' ? 'la borne A' : 'la borne V Ω'}</text>
<text x="380" y="170" font-size="13" fill="${C.gris}">la pointe noire est dans</text>
<text x="630" y="170" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">COM, toujours</text>

<text x="505" y="234" text-anchor="middle" font-size="16" font-weight="700"
      fill="${bon ? C.vert : C.rouge}">${bon ? 'la combinaison est bonne' : 'la combinaison ne va pas'}</text>
<text x="505" y="268" text-anchor="middle" font-size="12" fill="${C.gris}">La pointe noire ne bouge jamais de COM.</text>
<text x="505" y="288" text-anchor="middle" font-size="12" fill="${C.gris}">C’est la rouge qu’on déplace, et c’est elle qui se trompe.</text>`;
    };

    const verdict = document.createElement('p');
    const rendre = () => {
      peindre();
      const [etat, txt] = CAS[pos + '|' + borne] || ['bad', 'Cette combinaison n’a pas de sens.'];
      verdict.className = 'verdict ' + etat;
      verdict.innerHTML = '<span class="signe">' + (etat === 'ok' ? '✔' : '✘') + '</span>' + txt;
    };

    hote.appendChild(d);
    const l1 = document.createElement('div'); l1.className = 'choix'; l1.style.marginTop = '.6rem';
    [['V~', 'Sélecteur : V ~'], ['A~', 'Sélecteur : A ~'], ['Ω', 'Sélecteur : Ω']].forEach(([id, lib]) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', String(id === pos));
      b.addEventListener('click', () => {
        pos = id;
        l1.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        rendre();
      });
      l1.appendChild(b);
    });
    const l2 = document.createElement('div'); l2.className = 'choix'; l2.style.marginTop = '.4rem';
    [['VΩ', 'Pointe rouge : borne V Ω'], ['A', 'Pointe rouge : borne A']].forEach(([id, lib]) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', String(id === borne));
      b.addEventListener('click', () => {
        borne = id;
        l2.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        rendre();
      });
      l2.appendChild(b);
    });
    hote.append(l1, l2);
    rendre();
    hote.appendChild(verdict);
    return hote;
  }

  function pinceEtMultimetre() {
    const d = svg('0 0 700 300', 'Le multimètre demande qu’on ouvre le circuit pour mesurer un courant ; la pince le mesure sans rien débrancher.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Deux façons de mesurer un courant</text>

<text x="175" y="76" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Le multimètre</text>
<line x1="70" y1="130" x2="126" y2="130" stroke="${C.navy}" stroke-width="4"/>
${instrument(156, 130, 'A', C.navy, 26)}
<line x1="186" y1="130" x2="280" y2="130" stroke="${C.navy}" stroke-width="4"/>
<path d="M108 118 L144 118" stroke="${C.rouge}" stroke-width="3"/>
<path d="M120 110 L132 126 M132 110 L120 126" stroke="${C.rouge}" stroke-width="3"/>
<text x="175" y="186" text-anchor="middle" font-size="12.5" fill="${C.gris}">il faut couper le fil</text>
<text x="175" y="206" text-anchor="middle" font-size="12.5" fill="${C.gris}">et mettre l’appareil dans le trou</text>
<text x="175" y="232" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">donc arrêter la machine</text>

<line x1="350" y1="66" x2="350" y2="256" stroke="${C.trait}" stroke-width="2" stroke-dasharray="6 6"/>

<text x="520" y="76" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">La pince</text>
<line x1="420" y1="130" x2="620" y2="130" stroke="${C.orange}" stroke-width="6"/>
<path d="M520 92 A 34 34 0 1 1 519 92" fill="none" stroke="${C.navy}" stroke-width="4"/>
<line x1="520" y1="92" x2="520" y2="104" stroke="${C.papier}" stroke-width="5"/>
<text x="520" y="186" text-anchor="middle" font-size="12.5" fill="${C.gris}">elle s’ouvre, elle enserre le fil,</text>
<text x="520" y="206" text-anchor="middle" font-size="12.5" fill="${C.gris}">elle ne touche rien d’électrique</text>
<text x="520" y="232" text-anchor="middle" font-size="13" font-weight="700" fill="${C.vert}">la machine continue de tourner</text>

<text x="350" y="276" text-anchor="middle" font-size="12.5" fill="${C.gris}">Un seul conducteur dans la pince à la fois. Deux ensemble, et elle affiche presque zéro.</text>`;
    return bloc(d, [], null,
      'Sur une machine en service, la pince est le seul instrument raisonnable. Elle ne demande ni coupure, ni contact.');
  }

  return { bloc, reglette, instrument,
           debitDeCharges, brancherAmperemetre,
           differenceDePotentiel, brancherVoltmetre,
           curseurOhm, mesurerResistance,
           puissanceEtEnergie, compteurEnergie,
           continuAlternatif, selecteurContinuAlternatif,
           frequenceReglable, frequenceReseau,
           plaqueSignaletique, plaqueContreMesure,
           troisDefauts, quelInstrumentVoitQuoi,
           choisirLaMesure, pinceEtMultimetre };
})();
