/* ÉlectroRézo — schémas techniques en coupe, dessinés pour la ligne 3.
   Règle de maison : aucune page sans illustration. Quand on parle du ressort,
   de l'arc ou du sable, on les montre.

   Chaque fonction rend un bloc { element, etats } : un SVG et des boutons d'état.
   Ce ne sont pas des animations — ce sont des coupes commutables. Le mouvement
   filmé reste le métier de Claude Design. */

const Schemas = (() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', doux:'#84b7ec', orange:'#c9451a',
              feu:'#ff6b35', vert:'#1e7e54', rouge:'#c0392b', gris:'#637285',
              papier:'#fffdf8', creme:'#f7f1e7', trait:'rgba(27,58,99,.18)' };

  function svg(viewBox, aria) {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', viewBox);
    s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', aria);
    return s;
  }

  /* Un bloc = le dessin + la barre d'états sous lui + une légende. */
  function bloc(dessin, etats, defaut, legende) {
    const hote = document.createElement('div');
    hote.appendChild(dessin);
    if (etats.length > 1) {
      const barre = document.createElement('div');
      barre.className = 'choix';
      barre.style.marginTop = '.6rem';
      etats.forEach(e => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = e.libelle;
        b.setAttribute('aria-pressed', String(e.id === defaut));
        b.addEventListener('click', () => {
          barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          e.appliquer();
          if (leg) leg.textContent = e.legende;
        });
        barre.appendChild(b);
      });
      hote.appendChild(barre);
    }
    const leg = document.createElement('p');
    leg.className = 'legende';
    leg.textContent = legende;
    hote.appendChild(leg);
    return hote;
  }

  /* ---------------------------------------------------------- 3.1 le contact et l'arc */
  function coupeContact() {
    const d = svg('0 0 820 400',
      'Coupe d’un interrupteur : bornes, contact fixe, contact mobile, ressort, et l’arc au moment de la séparation.');
    d.innerHTML = `
<rect x="16" y="20" width="788" height="360" rx="18" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="50" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Coupe d’un interrupteur</text>

<!-- boîtier -->
<rect x="150" y="90" width="520" height="220" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>
<text x="410" y="332" text-anchor="middle" font-size="14" fill="${C.gris}">le boîtier tient les pièces à distance et protège les doigts</text>

<!-- bornes -->
<line x1="60" y1="200" x2="150" y2="200" stroke="${C.navy}" stroke-width="7"/>
<line x1="670" y1="200" x2="760" y2="200" stroke="${C.navy}" stroke-width="7"/>
<circle cx="60" cy="200" r="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="5"/>
<circle cx="760" cy="200" r="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="5"/>
<text x="60" y="176" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">entrée</text>
<text x="760" y="176" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">sortie</text>

<!-- contact fixe -->
<rect x="470" y="188" width="90" height="24" rx="6" fill="${C.navy}"/>
<text x="515" y="248" text-anchor="middle" font-size="14" fill="${C.navy}">contact fixe</text>

<!-- contact mobile, pivot à gauche -->
<circle cx="250" cy="200" r="9" fill="${C.navy}"/>
<g id="sMobile">
  <line id="sLame" x1="250" y1="200" x2="480" y2="200" stroke="${C.orange}" stroke-width="14" stroke-linecap="round"/>
</g>
<text x="250" y="228" text-anchor="middle" font-size="14" fill="${C.orange}">contact mobile</text>

<!-- ressort -->
<path id="sRessort" d="M258 236 l16 12 l-24 12 l24 12 l-24 12 l24 12 l-16 10"
      fill="none" stroke="${C.bleu}" stroke-width="6" stroke-linejoin="round"/>
<text x="292" y="302" font-size="14" fill="${C.bleu}">le ressort — il rend le mouvement brusque</text>

<!-- arc -->
<g id="sArc" opacity="0">
  <path d="M486 200 l14 -12 l-6 12 l16 -8 l-10 10 l14 -2"
        fill="none" stroke="${C.feu}" stroke-width="6" stroke-linecap="round"/>
  <path d="M486 206 l16 10 l-8 -12 l18 8 l-12 -10 l16 0"
        fill="none" stroke="${C.feu}" stroke-width="6" stroke-linecap="round"/>
  <text x="560" y="130" text-anchor="middle" font-size="15" font-weight="700" fill="${C.feu}">l’arc — très chaud</text>
  <line x1="560" y1="140" x2="520" y2="180" stroke="${C.feu}" stroke-width="3"/>
</g>

<!-- état écrit, jamais la couleur seule -->
<text x="410" y="76" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}" id="sEtat">fermé — le courant passe</text>`;

    const lame = () => d.querySelector('#sLame');
    const arc = () => d.querySelector('#sArc');
    const etat = () => d.querySelector('#sEtat');
    const pose = (x2, y2, txt, arcOn) => {
      lame().setAttribute('x2', x2); lame().setAttribute('y2', y2);
      arc().setAttribute('opacity', arcOn ? '1' : '0');
      etat().textContent = txt;
    };

    return bloc(d, [
      { id:'ferme', libelle:'Fermé', legende:'Fermé : les deux pièces se touchent, le courant passe. Rien de spectaculaire.',
        appliquer:() => pose(480, 200, 'fermé — le courant passe', false) },
      { id:'arc', libelle:'À l’instant de l’ouverture', legende:'Le contact vient de quitter le fixe. Le courant continue un instant dans l’air : c’est l’arc, et il est très chaud. Le ressort le rend le plus bref possible.',
        appliquer:() => pose(470, 188, 'à l’instant de l’ouverture — l’arc se forme', true) },
      { id:'ouvert', libelle:'Ouvert', legende:'Ouvert : l’arc s’est éteint, le circuit est coupé. Mais l’écart n’est pas garanti — c’est pour cela qu’un interrupteur n’isole pas.',
        appliquer:() => pose(430, 122, 'ouvert — mais l’écart n’est pas garanti', false) }
    ], 'ferme',
      'Fermé : les deux pièces se touchent, le courant passe. Rien de spectaculaire.');
  }

  /* ---------------------------------------------------------- 3.2 le sectionnement */
  function coupeSectionnement() {
    const d = svg('0 0 820 400',
      'Coupe d’un sectionneur ouvert : la distance garantie entre les pièces, et le cadenas de condamnation.');
    d.innerHTML = `
<rect x="16" y="20" width="788" height="360" rx="18" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="50" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Ce qui fait un sectionneur</text>

<rect x="130" y="90" width="380" height="230" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>
<line x1="50" y1="270" x2="130" y2="270" stroke="${C.navy}" stroke-width="7"/>
<line x1="510" y1="270" x2="590" y2="270" stroke="${C.navy}" stroke-width="7"/>

<rect x="380" y="258" width="80" height="24" rx="6" fill="${C.navy}"/>
<circle cx="190" cy="270" r="9" fill="${C.navy}"/>
<line id="tLame" x1="190" y1="270" x2="330" y2="150" stroke="${C.orange}" stroke-width="14" stroke-linecap="round"/>

<!-- cote de distance -->
<g id="tCote">
  <line x1="336" y1="146" x2="392" y2="252" stroke="${C.vert}" stroke-width="3" stroke-dasharray="7 5"/>
  <text x="470" y="180" text-anchor="middle" font-size="15" font-weight="700" fill="${C.vert}">distance garantie</text>
  <text x="470" y="202" text-anchor="middle" font-size="13" fill="${C.vert}">calculée, vérifiée, suffisante</text>
  <line x1="470" y1="190" x2="378" y2="200" stroke="${C.vert}" stroke-width="2"/>
</g>

<!-- cadenas -->
<g id="tCadenas">
  <rect x="620" y="196" width="120" height="96" rx="12" fill="${C.papier}" stroke="${C.navy}" stroke-width="4"/>
  <path d="M652 196 v-24 a28 28 0 0 1 56 0 v24" fill="none" stroke="${C.navy}" stroke-width="8"/>
  <circle cx="680" cy="240" r="12" fill="${C.orange}"/>
  <rect x="674" y="240" width="12" height="26" fill="${C.orange}"/>
  <text x="680" y="322" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">la condamnation</text>
  <text x="680" y="344" text-anchor="middle" font-size="13" fill="${C.gris}">la clé reste dans votre poche</text>
</g>

<text x="320" y="360" text-anchor="middle" font-size="14" fill="${C.gris}">pas de ressort, pas de chambre de coupure : on ne l’ouvre jamais en charge</text>`;
    return bloc(d, [], null,
      'Deux choses seulement, mais elles font tout : un écart garanti par le constructeur, et un trou qui reçoit un cadenas.');
  }

  /* ---------------------------------------------------------- 3.3 le cumul */
  function coupeCumul() {
    const d = svg('0 0 840 380',
      'Les deux mécanismes réunis : la chambre de coupure d’un interrupteur, et la distance garantie d’un sectionneur.');
    d.innerHTML = `
<rect x="16" y="20" width="808" height="340" rx="18" fill="${C.papier}" stroke="${C.trait}"/>
<text x="420" y="50" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Un cumul, pas un compromis</text>

<rect x="50" y="80" width="360" height="250" rx="14" fill="${C.creme}" stroke="${C.bleu}" stroke-width="4"/>
<text x="230" y="110" text-anchor="middle" font-size="15" font-weight="700" fill="${C.bleu}">côté interrupteur</text>
<circle cx="110" cy="230" r="8" fill="${C.navy}"/>
<line x1="110" y1="230" x2="250" y2="230" stroke="${C.orange}" stroke-width="12" stroke-linecap="round"/>
<rect x="250" y="196" width="110" height="70" rx="8" fill="none" stroke="${C.bleu}" stroke-width="4" stroke-dasharray="8 6"/>
<text x="305" y="184" text-anchor="middle" font-size="14" fill="${C.bleu}">chambre de coupure</text>
<text x="230" y="296" text-anchor="middle" font-size="14" fill="${C.gris}">l’arc est étouffé, découpé, refroidi</text>
<text x="230" y="318" text-anchor="middle" font-size="14" font-weight="700" fill="${C.bleu}">→ il coupe en charge</text>

<rect x="430" y="80" width="360" height="250" rx="14" fill="${C.creme}" stroke="${C.vert}" stroke-width="4"/>
<text x="610" y="110" text-anchor="middle" font-size="15" font-weight="700" fill="${C.vert}">côté sectionneur</text>
<circle cx="490" cy="250" r="8" fill="${C.navy}"/>
<line x1="490" y1="250" x2="600" y2="160" stroke="${C.orange}" stroke-width="12" stroke-linecap="round"/>
<line x1="606" y1="156" x2="660" y2="238" stroke="${C.vert}" stroke-width="3" stroke-dasharray="7 5"/>
<rect x="640" y="240" width="60" height="46" rx="8" fill="${C.papier}" stroke="${C.navy}" stroke-width="4"/>
<path d="M656 240 v-12 a14 14 0 0 1 28 0 v12" fill="none" stroke="${C.navy}" stroke-width="6"/>
<text x="610" y="318" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">→ il isole et se condamne</text>`;
    return bloc(d, [], null,
      'À gauche ce qui permet d’ouvrir en marche, à droite ce qui permet de travailler derrière. Les deux, dans le même boîtier.');
  }

  /* ---------------------------------------------------------- 3.4 la cartouche */
  function coupeCartouche() {
    const d = svg('0 0 820 380',
      'Coupe d’une cartouche fusible : le tube, le sable, le fil calibré — intact puis fondu.');
    d.innerHTML = `
<rect x="16" y="20" width="788" height="340" rx="18" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="50" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Coupe d’une cartouche</text>
<text x="410" y="76" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}" id="fEtat">intacte — le courant passe</text>

<!-- embouts -->
<rect x="100" y="150" width="70" height="110" rx="8" fill="${C.navy}"/>
<rect x="650" y="150" width="70" height="110" rx="8" fill="${C.navy}"/>
<text x="135" y="290" text-anchor="middle" font-size="14" fill="${C.navy}">embout</text>
<text x="685" y="290" text-anchor="middle" font-size="14" fill="${C.navy}">embout</text>

<!-- tube + sable -->
<rect x="170" y="150" width="480" height="110" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>
<g fill="${C.doux}" opacity=".9">
  <circle cx="200" cy="175" r="4"/><circle cx="240" cy="192" r="4"/><circle cx="285" cy="170" r="4"/>
  <circle cx="330" cy="196" r="4"/><circle cx="375" cy="172" r="4"/><circle cx="420" cy="194" r="4"/>
  <circle cx="465" cy="174" r="4"/><circle cx="510" cy="192" r="4"/><circle cx="555" cy="176" r="4"/>
  <circle cx="600" cy="194" r="4"/><circle cx="225" cy="232" r="4"/><circle cx="275" cy="240" r="4"/>
  <circle cx="325" cy="228" r="4"/><circle cx="380" cy="242" r="4"/><circle cx="435" cy="230" r="4"/>
  <circle cx="490" cy="240" r="4"/><circle cx="545" cy="228" r="4"/><circle cx="600" cy="238" r="4"/>
</g>
<text x="410" y="322" text-anchor="middle" font-size="14" fill="${C.gris}">le sable n’est pas un remplissage : il éteint l’arc</text>

<!-- fil calibré -->
<g id="fFil">
  <line x1="170" y1="205" x2="650" y2="205" stroke="${C.orange}" stroke-width="7"/>
</g>
<g id="fFondu" opacity="0">
  <line x1="170" y1="205" x2="380" y2="205" stroke="${C.orange}" stroke-width="7"/>
  <line x1="440" y1="205" x2="650" y2="205" stroke="${C.orange}" stroke-width="7"/>
  <circle cx="382" cy="205" r="7" fill="${C.rouge}"/>
  <circle cx="438" cy="205" r="7" fill="${C.rouge}"/>
  <text x="410" y="128" text-anchor="middle" font-size="15" font-weight="700" fill="${C.rouge}">le fil a fondu</text>
  <line x1="410" y1="138" x2="410" y2="188" stroke="${C.rouge}" stroke-width="3"/>
</g>
<text x="410" y="112" text-anchor="middle" font-size="14" fill="${C.orange}" id="fLegFil">le fil calibré — c’est lui qui travaille</text>`;

    const maj = (fondu) => {
      d.querySelector('#fFil').setAttribute('opacity', fondu ? '0' : '1');
      d.querySelector('#fFondu').setAttribute('opacity', fondu ? '1' : '0');
      d.querySelector('#fLegFil').setAttribute('opacity', fondu ? '0' : '1');
      d.querySelector('#fEtat').textContent = fondu
        ? 'fondue — le circuit est ouvert, la cartouche est morte'
        : 'intacte — le courant passe';
    };

    return bloc(d, [
      { id:'intacte', libelle:'Cartouche intacte', legende:'Le fil calibré laisse passer le courant. Il chauffe un peu, sans conséquence.',
        appliquer:() => maj(false) },
      { id:'fondue', libelle:'Après un défaut', legende:'Le courant a trop monté : le fil a fondu. Le sable a absorbé l’arc. La cartouche ne se répare pas, elle se remplace — à l’identique.',
        appliquer:() => maj(true) }
    ], 'intacte',
      'Le fil calibré laisse passer le courant. Il chauffe un peu, sans conséquence.');
  }

  /* ---------------------------------------------------------- 3.5 l'assemblage */
  function coupeAssemblage() {
    const d = svg('0 0 820 400',
      'Sectionneur porte-fusible : les cartouches sont portées par la partie mobile, fermé puis ouvert.');
    d.innerHTML = `
<rect x="16" y="20" width="788" height="360" rx="18" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="50" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Les cartouches sont sur la partie mobile</text>
<text x="410" y="76" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}" id="aEtat">fermé — les cartouches sont dans le circuit</text>

<rect x="120" y="100" width="480" height="240" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>
<line x1="50" y1="300" x2="120" y2="300" stroke="${C.navy}" stroke-width="7"/>
<line x1="600" y1="300" x2="670" y2="300" stroke="${C.navy}" stroke-width="7"/>
<rect x="480" y="288" width="70" height="24" rx="6" fill="${C.navy}"/>
<circle cx="180" cy="300" r="9" fill="${C.navy}"/>

<g id="aBras">
  <line x1="180" y1="300" x2="490" y2="300" stroke="${C.navy}" stroke-width="10" stroke-linecap="round"/>
  <rect x="250" y="282" width="60" height="36" rx="6" fill="${C.orange}" stroke="${C.navy}" stroke-width="3"/>
  <rect x="330" y="282" width="60" height="36" rx="6" fill="${C.orange}" stroke="${C.navy}" stroke-width="3"/>
  <rect x="410" y="282" width="60" height="36" rx="6" fill="${C.orange}" stroke="${C.navy}" stroke-width="3"/>
</g>
<text x="360" y="352" text-anchor="middle" font-size="14" fill="${C.orange}">trois cartouches, portées par le bras</text>

<g id="aCadenas" opacity="0">
  <rect x="690" y="180" width="100" height="80" rx="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="4"/>
  <path d="M716 180 v-20 a24 24 0 0 1 48 0 v20" fill="none" stroke="${C.navy}" stroke-width="7"/>
  <circle cx="740" cy="216" r="10" fill="${C.orange}"/>
  <text x="740" y="286" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">condamné</text>
  <text x="740" y="308" text-anchor="middle" font-size="13" fill="${C.vert}">cartouches hors tension</text>
</g>`;

    const bras = () => d.querySelector('#aBras');
    const maj = (ouvert) => {
      bras().setAttribute('transform', ouvert ? 'rotate(-42 180 300)' : '');
      d.querySelector('#aCadenas').setAttribute('opacity', ouvert ? '1' : '0');
      d.querySelector('#aEtat').textContent = ouvert
        ? 'ouvert et condamné — les cartouches sont sorties du circuit'
        : 'fermé — les cartouches sont dans le circuit';
    };

    return bloc(d, [
      { id:'ferme', libelle:'Fermé', legende:'Le bras porte les trois cartouches et referme le circuit. C’est la position de service.',
        appliquer:() => maj(false) },
      { id:'ouvert', libelle:'Ouvert et cadenassé', legende:'Abaisser la poignée retire les cartouches du circuit. Une fois cadenassé, on les change sans risque : c’est tout l’intérêt de l’assemblage.',
        appliquer:() => maj(true) }
    ], 'ferme',
      'Le bras porte les trois cartouches et referme le circuit. C’est la position de service.');
  }


  /* ------------------------------------- les trois aptitudes, en pictogrammes
     Affichées neutres tant que l'élève n'a pas validé : on ne donne pas la réponse. */
  function pictoAptitudes(defs) {
    const d = svg('0 0 820 230',
      'Trois pictogrammes : commander en marche, couper en charge, isoler et condamner.');
    const col = (x, id, titre, sous, dessin) => `
<g>
  <rect x="${x}" y="40" width="240" height="150" rx="14" fill="${C.creme}" stroke="${C.trait}" stroke-width="2"/>
  ${dessin}
  <text x="${x + 120}" y="152" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">${titre}</text>
  <text x="${x + 120}" y="174" text-anchor="middle" font-size="13" fill="${C.gris}">${sous}</text>
  <text x="${x + 120}" y="212" text-anchor="middle" font-size="26" font-weight="800" fill="${C.gris}" id="${id}">?</text>
</g>`;
    if (defs) {
      /* Trois colonnes sur mesure : la ligne 4 ne pose pas les memes questions que la 3. */
      d.innerHTML = `
<rect x="16" y="10" width="788" height="210" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${defs.map((a, i) => col(40 + i * 250, 'ap_' + a.id, a.libelle, a.aide, a.dessin(160 + i * 250, 96))).join('')}`;
      const marquer2 = (v) => defs.forEach(a => {
        const t = d.querySelector('#ap_' + a.id);
        t.textContent = v[a.id] ? '✔ oui' : '✘ non';
        t.setAttribute('fill', v[a.id] ? C.vert : C.rouge);
        t.setAttribute('font-size', '19');
      });
      return { element: d, marquer: marquer2 };
    }
    d.innerHTML = `
<rect x="16" y="10" width="788" height="210" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${col(40, 'apCommander', 'Commander en marche', 'ouvrir et fermer souvent',
  `<circle cx="160" cy="96" r="26" fill="none" stroke="${C.bleu}" stroke-width="6"/>
   <line x1="160" y1="96" x2="160" y2="62" stroke="${C.bleu}" stroke-width="6" stroke-linecap="round"/>
   <path d="M186 112 l22 -14" stroke="${C.orange}" stroke-width="6" stroke-linecap="round"/>`)}
${col(290, 'apCouper', 'Couper en charge', 'arrêter le courant sans dégât',
  `<path d="M400 66 l-22 34 h20 l-14 30" fill="none" stroke="${C.feu}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
   <line x1="368" y1="118" x2="440" y2="66" stroke="${C.rouge}" stroke-width="6" stroke-linecap="round"/>`)}
${col(540, 'apIsoler', 'Isoler et condamner', 'travailler derrière en sécurité',
  `<rect x="636" y="92" width="68" height="46" rx="8" fill="${C.papier}" stroke="${C.navy}" stroke-width="5"/>
   <path d="M654 92 v-14 a16 16 0 0 1 32 0 v14" fill="none" stroke="${C.navy}" stroke-width="6"/>
   <circle cx="670" cy="112" r="8" fill="${C.orange}"/>`)}`;

    const marquer = (a) => {
      [['apCommander', a.commander], ['apCouper', a.couper], ['apIsoler', a.isoler]]
        .forEach(([id, ok]) => {
          const t = d.querySelector('#' + id);
          t.textContent = ok ? '✔ oui' : '✘ non';
          t.setAttribute('fill', ok ? C.vert : C.rouge);
          t.setAttribute('font-size', '19');
        });
    };
    return { element: d, marquer };
  }

  /* ------------------------------------- le tableau de la ligne 3, en fin de station */
  function tableauLigne3(idCourant) {
    const L = [
      ['3.1', 'L’interrupteur', 1, 1, 0],
      ['3.2', 'Le sectionneur', 0, 0, 1],
      ['3.3', 'L’interrupteur-sectionneur', 1, 1, 1],
      ['3.4', 'Le porte-fusible', 0, 0, 0],
      ['3.5', 'Le sectionneur porte-fusible', 0, 0, 1]
    ];
    const d = svg('0 0 820 320', 'Tableau des cinq appareils de la ligne 3 et de leurs trois aptitudes.');
    const lignes = L.map(([id, nom, a, b, c], i) => {
      const y = 108 + i * 40;
      const courant = id === idCourant;
      const marque = (v, x) => `<text x="${x}" y="${y + 6}" text-anchor="middle" font-size="14" font-weight="800"
        fill="${v ? C.vert : C.rouge}">${v ? '✔ oui' : '✘ non'}</text>`;
      return `
<rect x="30" y="${y - 22}" width="760" height="36" rx="8"
      fill="${courant ? '#e3f5ec' : (i % 2 ? C.creme : C.papier)}"
      stroke="${courant ? C.vert : 'none'}" stroke-width="${courant ? 3 : 0}"/>
<text x="52" y="${y + 5}" font-size="14" font-weight="${courant ? 800 : 600}" fill="${C.navy}">${id}  ${nom}${courant ? '   ← vous êtes ici' : ''}</text>
${marque(a, 540)}${marque(b, 640)}${marque(c, 740)}`;
    }).join('');
    d.innerHTML = `
<rect x="16" y="10" width="788" height="300" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Les cinq appareils de la ligne 3</text>
<text x="540" y="84" text-anchor="middle" font-size="13" fill="${C.gris}">commander</text>
<text x="640" y="84" text-anchor="middle" font-size="13" fill="${C.gris}">couper</text>
<text x="740" y="84" text-anchor="middle" font-size="13" fill="${C.gris}">isoler</text>
${lignes}`;
    return d;
  }


  /* ------------------------------------- 6.4 : les quatre cas réseau x plaque */
  function tableauCouplages() {
    const L = [
      ['400 V', '230 / 400', 'etoile', 'Étoile — 231 V', 'Triangle — 400 V, il grille'],
      ['400 V', '400 / 690', 'triangle', 'Triangle — 400 V', 'Étoile — 231 V, il tourne mou'],
      ['230 V', '230 / 400', 'triangle', 'Triangle — 230 V', 'Étoile — 133 V, il tourne mou'],
      ['230 V', '400 / 690', 'aucun', 'Aucun couplage ne convient', 'Ce moteur n’est pas fait pour ce réseau']
    ];
    const d = svg('0 0 820 300', 'Tableau des quatre cas : réseau, plaque, couplage correct et couplage fautif.');
    const lignes = L.map(([res, pl, bon, ok, ko], i) => {
      const y = 112 + i * 44;
      const vert = bon !== 'aucun';
      return `
<rect x="30" y="${y - 24}" width="760" height="40" rx="8" fill="${i % 2 ? C.creme : C.papier}"/>
<text x="70" y="${y + 3}" font-size="14" font-weight="700" fill="${C.navy}">${res}</text>
<text x="190" y="${y + 3}" font-size="14" font-weight="700" fill="${C.navy}">${pl}</text>
<text x="330" y="${y + 3}" font-size="14" font-weight="700" fill="${vert ? C.vert : C.rouge}">${vert ? '✔' : '✘'} ${ok}</text>
<text x="570" y="${y + 3}" font-size="13" fill="${C.rouge}">✘ ${ko}</text>`;
    }).join('');
    d.innerHTML = `
<rect x="16" y="10" width="788" height="280" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="44" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Les quatre cas, en un tableau</text>
<text x="70" y="80" font-size="13" fill="${C.gris}">réseau</text>
<text x="190" y="80" font-size="13" fill="${C.gris}">plaque</text>
<text x="330" y="80" font-size="13" fill="${C.gris}">ce qu’il faut poser</text>
<text x="570" y="80" font-size="13" fill="${C.gris}">ce qu’il ne faut pas</text>
${lignes}`;
    return d;
  }

  return { coupeContact, coupeSectionnement, coupeCumul, coupeCartouche, coupeAssemblage,
           pictoAptitudes, tableauLigne3, tableauCouplages };
})();
