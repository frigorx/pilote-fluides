/* ÉlectroRézo — les coupes techniques de la ligne 4 « Protéger ».
   Même règle : quand la narration parle du bilame, de la fusion ou du tore, on les montre.
   Ce sont des coupes commutables, pas des animations — le film reste chez Claude Design. */

const SchemasProtection = (() => {
  'use strict';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', doux:'#84b7ec', orange:'#c9451a', feu:'#ff6b35',
              vert:'#1e7e54', rouge:'#c0392b', gris:'#637285', papier:'#fffdf8',
              creme:'#f7f1e7', trait:'rgba(27,58,99,.18)' };
  const svg = (vb, aria) => Signes ? Signes.svg(vb, aria) : (() => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria); return s; })();

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

  /* ---------------------------------------------- les trois défauts, en pictogrammes */
  const COLONNES = [
    { id: 'surcharge', libelle: 'La surcharge', aide: 'trop de courant, longtemps',
      dessin: (x, y) => `
        <path d="M${x-40} ${y+22} L${x-10} ${y+10} L${x+16} ${y-8} L${x+40} ${y-22}"
              fill="none" stroke="${C.orange}" stroke-width="6" stroke-linecap="round"/>
        <text x="${x}" y="${y+44}" text-anchor="middle" font-size="12" fill="${C.gris}">ça monte, ça dure</text>` },
    { id: 'courtCircuit', libelle: 'Le court-circuit', aide: 'énormément de courant, d’un coup',
      dessin: (x, y) => `
        <path d="M${x-30} ${y+24} L${x-30} ${y+4} L${x+2} ${y+4} L${x+2} ${y-26} L${x+34} ${y-26}"
              fill="none" stroke="${C.rouge}" stroke-width="6" stroke-linejoin="round"/>
        <text x="${x}" y="${y+44}" text-anchor="middle" font-size="12" fill="${C.gris}">d’un seul coup</text>` },
    { id: 'defautIsolement', libelle: 'Le défaut d’isolement', aide: 'le courant part à la terre',
      dessin: (x, y) => `
        <line x1="${x}" y1="${y-26}" x2="${x}" y2="${y+10}" stroke="${C.bleu}" stroke-width="6"/>
        <line x1="${x-22}" y1="${y+10}" x2="${x+22}" y2="${y+10}" stroke="${C.navy}" stroke-width="5"/>
        <line x1="${x-14}" y1="${y+18}" x2="${x+14}" y2="${y+18}" stroke="${C.navy}" stroke-width="5"/>
        <line x1="${x-7}" y1="${y+26}" x2="${x+7}" y2="${y+26}" stroke="${C.navy}" stroke-width="5"/>
        <text x="${x}" y="${y+46}" text-anchor="middle" font-size="12" fill="${C.gris}">vers la terre</text>` }
  ];

  /* ---------------------------------------------- 4.1 / 4.2 : la courbe de fusion */
  function courbesFusion() {
    const d = svg('0 0 820 400',
      'Deux courbes de fusion : le fusible gG fond tôt, le fusible aM laisse passer la pointe de démarrage.');
    d.innerHTML = `
<rect x="16" y="14" width="788" height="372" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Combien de temps avant de fondre ?</text>
<line x1="120" y1="320" x2="740" y2="320" stroke="${C.navy}" stroke-width="3"/>
<line x1="120" y1="320" x2="120" y2="80" stroke="${C.navy}" stroke-width="3"/>
<text x="128" y="344" font-size="13" fill="${C.gris}">le courant qui traverse →</text>
<text x="110" y="76" text-anchor="end" font-size="13" fill="${C.gris}">temps</text>
<path id="cGG" d="M150 110 C 260 118 330 200 400 268 C 450 305 520 314 620 316"
      fill="none" stroke="${C.bleu}" stroke-width="6"/>
<path id="cAM" d="M150 118 C 330 122 470 190 560 268 C 600 302 650 314 700 316"
      fill="none" stroke="${C.orange}" stroke-width="6" stroke-dasharray="12 8"/>
<text x="158" y="98" font-size="15" font-weight="700" fill="${C.bleu}">gG — usage général</text>
<text x="452" y="146" font-size="15" font-weight="700" fill="${C.orange}">aM — accompagnement moteur</text>
<g id="pointeDem">
  <rect x="470" y="252" width="150" height="60" rx="10" fill="none" stroke="${C.vert}"
        stroke-width="3" stroke-dasharray="7 5"/>
  <text x="545" y="356" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">la pointe de démarrage</text>
  <text x="545" y="376" text-anchor="middle" font-size="13" fill="${C.gris}">le gG fondrait, l’aM la laisse passer</text>
</g>`;
    const maj = (quoi) => {
      d.querySelector('#cGG').setAttribute('opacity', quoi === 'am' ? '.25' : '1');
      d.querySelector('#cAM').setAttribute('opacity', quoi === 'gg' ? '.25' : '1');
      d.querySelector('#pointeDem').setAttribute('opacity', quoi === 'deux' ? '1' : '.3');
    };
    return bloc(d, [
      { id:'gg', libelle:'gG seul', legende:'Le gG protège tout : câbles, prises, éclairage. Il fond dès que le courant dépasse durablement son calibre.', appliquer:() => maj('gg') },
      { id:'am', libelle:'aM seul', legende:'L’aM laisse passer la pointe du démarrage d’un moteur, qui peut valoir plusieurs fois le courant nominal pendant quelques secondes. En revanche il ne protège pas contre les petites surcharges.', appliquer:() => maj('am') },
      { id:'deux', libelle:'Les deux', legende:'Un moteur démarre en appelant beaucoup de courant. Le gG y verrait une surcharge et fondrait. L’aM attend. C’est toute la différence entre les deux lettres.', appliquer:() => maj('deux') }
    ], 'deux',
      'Un moteur démarre en appelant beaucoup de courant. Le gG y verrait une surcharge et fondrait. L’aM attend.');
  }

  /* ---------------------------------------------- 4.3 / 4.4 : les deux déclencheurs */
  function deuxDeclencheurs() {
    const d = svg('0 0 820 400',
      'Coupe d’un disjoncteur magnéto-thermique : le bilame lent en haut, la bobine instantanée en bas.');
    d.innerHTML = `
<rect x="16" y="14" width="788" height="372" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Deux surveillances dans un seul boîtier</text>
<rect x="120" y="72" width="580" height="290" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>

<line x1="60" y1="120" x2="120" y2="120" stroke="${C.navy}" stroke-width="6"/>
<line x1="700" y1="300" x2="760" y2="300" stroke="${C.navy}" stroke-width="6"/>

<g id="dBilame">
  <path id="lame" d="M180 110 h140" fill="none" stroke="${C.rouge}" stroke-width="10" stroke-linecap="round"/>
  <text x="250" y="134" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">le bilame</text>
  <text x="250" y="158" text-anchor="middle" font-size="13" fill="${C.gris}">il se courbe en chauffant — lentement</text>
</g>

<g id="dBobine">
  <rect x="180" y="240" width="140" height="60" rx="8" fill="${C.papier}" stroke="${C.bleu}" stroke-width="5"/>
  <path d="M196 300 v-60 M216 300 v-60 M236 300 v-60 M256 300 v-60 M276 300 v-60 M296 300 v-60"
        stroke="${C.bleu}" stroke-width="4"/>
  <rect id="noyau" x="330" y="256" width="46" height="28" rx="6" fill="${C.navy}"/>
  <text x="250" y="228" text-anchor="middle" font-size="14" font-weight="700" fill="${C.bleu}">la bobine</text>
  <text x="250" y="336" text-anchor="middle" font-size="13" fill="${C.gris}">elle attire le noyau — instantanément</text>
</g>

<g id="dVerdict">
  <text x="530" y="180" text-anchor="middle" font-size="16" font-weight="700" fill="${C.gris}" id="vTitre">au repos</text>
  <text x="530" y="212" text-anchor="middle" font-size="14" fill="${C.gris}" id="vSous">le courant passe, rien ne bouge</text>
</g>`;
    const lame = () => d.querySelector('#lame');
    const noyau = () => d.querySelector('#noyau');
    const maj = (etat) => {
      const t = d.querySelector('#vTitre'), u = d.querySelector('#vSous');
      if (etat === 'repos') {
        lame().setAttribute('d', 'M180 110 h140'); lame().setAttribute('stroke', C.rouge);
        noyau().setAttribute('x', 330);
        t.textContent = 'au repos'; t.setAttribute('fill', C.gris);
        u.textContent = 'le courant passe, rien ne bouge';
      } else if (etat === 'surcharge') {
        lame().setAttribute('d', 'M180 110 q70 0 100 -34'); lame().setAttribute('stroke', C.feu);
        noyau().setAttribute('x', 330);
        t.textContent = 'surcharge'; t.setAttribute('fill', C.feu);
        u.textContent = 'le bilame chauffe et se courbe — en quelques secondes ou minutes';
      } else {
        lame().setAttribute('d', 'M180 110 h140'); lame().setAttribute('stroke', C.rouge);
        noyau().setAttribute('x', 300);
        t.textContent = 'court-circuit'; t.setAttribute('fill', C.rouge);
        u.textContent = 'la bobine devient un aimant et frappe — en quelques millièmes de seconde';
      }
    };
    return bloc(d, [
      { id:'repos', libelle:'Au repos', legende:'Le courant traverse le bilame puis la bobine. Ni l’un ni l’autre ne réagit.', appliquer:() => maj('repos') },
      { id:'surcharge', libelle:'Surcharge', legende:'Trop de courant, mais pas énormément. Le bilame chauffe, se courbe, et finit par déclencher. Cela peut prendre des secondes ou des minutes : c’est voulu.', appliquer:() => maj('surcharge') },
      { id:'court', libelle:'Court-circuit', legende:'Le courant devient énorme d’un coup. La bobine attire le noyau, qui frappe le mécanisme. Quelques millièmes de seconde — le bilame n’a pas eu le temps de bouger.', appliquer:() => maj('court') }
    ], 'repos', 'Le courant traverse le bilame puis la bobine. Ni l’un ni l’autre ne réagit.');
  }

  /* ---------------------------------------------- 4.5 / 4.6 : le tore différentiel */
  function toreDifferentiel() {
    const d = svg('0 0 820 400',
      'Le tore différentiel compare le courant qui part et celui qui revient : s’ils diffèrent, il coupe.');
    d.innerHTML = `
<rect x="16" y="14" width="788" height="372" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Ce qui part doit revenir</text>

<ellipse cx="300" cy="200" rx="86" ry="66" fill="none" stroke="${C.navy}" stroke-width="14"/>
<text x="300" y="298" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">le tore</text>

<line x1="120" y1="174" x2="560" y2="174" stroke="${C.orange}" stroke-width="6"/>
<line x1="120" y1="228" x2="560" y2="228" stroke="${C.bleu}" stroke-width="6"/>
<text x="404" y="160" font-size="13" font-weight="700" fill="${C.orange}">phase — ce qui part</text>
<text x="404" y="252" font-size="13" font-weight="700" fill="${C.bleu}">neutre — ce qui revient</text>

<g id="fuite" opacity="0">
  <path d="M560 174 L640 174 L640 300" fill="none" stroke="${C.rouge}" stroke-width="6"/>
  <line x1="614" y1="300" x2="666" y2="300" stroke="${C.rouge}" stroke-width="5"/>
  <line x1="622" y1="312" x2="658" y2="312" stroke="${C.rouge}" stroke-width="5"/>
  <line x1="630" y1="324" x2="650" y2="324" stroke="${C.rouge}" stroke-width="5"/>
  <text x="640" y="352" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">le courant s’échappe</text>
</g>

<text x="410" y="98" text-anchor="middle" font-size="16" font-weight="700" fill="${C.gris}" id="tEtat">tout va bien — ce qui part revient</text>
<text x="410" y="372" text-anchor="middle" font-size="14" fill="${C.gris}" id="tSous">le tore ne détecte rien, le courant continue</text>`;
    const maj = (defaut) => {
      d.querySelector('#fuite').setAttribute('opacity', defaut ? '1' : '0');
      const t = d.querySelector('#tEtat'), u = d.querySelector('#tSous');
      t.textContent = defaut ? 'défaut d’isolement — il manque du courant au retour' : 'tout va bien — ce qui part revient';
      t.setAttribute('fill', defaut ? C.rouge : C.gris);
      u.textContent = defaut
        ? 'trente milliampères de différence suffisent : le tore le sent et fait couper'
        : 'le tore ne détecte rien, le courant continue';
    };
    return bloc(d, [
      { id:'ok', libelle:'Fonctionnement normal', legende:'Tout le courant qui part par la phase revient par le neutre. Le tore ne voit aucune différence.', appliquer:() => maj(false) },
      { id:'defaut', libelle:'Défaut d’isolement', legende:'Une partie du courant s’échappe vers la terre — par une carcasse, par un corps. Il manque au retour. Le tore mesure cette différence, et trente milliampères suffisent à faire couper.', appliquer:() => maj(true) }
    ], 'ok', 'Tout le courant qui part par la phase revient par le neutre. Le tore ne voit aucune différence.');
  }

  /* ---------------------------------------------- le tableau des trois défauts */
  function tableauDefauts(idCourant) {
    const L = [
      ['4.1', 'Le fusible gG', 1, 1, 0],
      ['4.2', 'Le fusible aM', 0, 1, 0],
      ['4.3', 'Le disjoncteur magnéto-thermique', 1, 1, 0],
      ['4.4', 'Le disjoncteur moteur', 1, 1, 0],
      ['4.5', 'L’interrupteur différentiel', 0, 0, 1],
      ['4.6', 'Le disjoncteur différentiel', 1, 1, 1],
      ['4.7', 'Le relais thermique', 1, 0, 0],
      ['4.8', 'La terre', 0, 0, 0],
      ['4.9', 'Le câble et sa section', 0, 0, 0]
    ];
    const d = svg('0 0 840 470', 'Tableau des neuf stations de la ligne 4 et des trois défauts.');
    const lignes = L.map(([id, nom, a, b, c], i) => {
      const y = 128 + i * 36, courant = id === idCourant;
      const m = (v, x) => `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="13.5"
        font-weight="800" fill="${v ? C.vert : C.rouge}">${v ? '✔ oui' : '✘ non'}</text>`;
      return `
<rect x="24" y="${y - 20}" width="792" height="32" rx="7"
      fill="${courant ? '#e3f5ec' : (i % 2 ? C.creme : C.papier)}"
      stroke="${courant ? C.vert : 'none'}" stroke-width="${courant ? 3 : 0}"/>
<text x="44" y="${y + 4}" font-size="13" font-weight="${courant ? 800 : 600}" fill="${C.navy}">${id}  ${nom}${courant ? '   ← vous êtes ici' : ''}</text>
${m(a, 556)}${m(b, 668)}${m(c, 782)}`;
    }).join('');
    d.innerHTML = `
<rect x="12" y="12" width="816" height="446" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="420" y="48" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Qui voit quel défaut ?</text>
<text x="556" y="92" text-anchor="middle" font-size="12" fill="${C.gris}">surcharge</text>
<text x="668" y="92" text-anchor="middle" font-size="12" fill="${C.gris}">court-circuit</text>
<text x="782" y="92" text-anchor="middle" font-size="12" fill="${C.gris}">défaut d’isolement</text>
${lignes}
<text x="420" y="446" text-anchor="middle" font-size="13" fill="${C.gris}">4.8 et 4.9 ne détectent rien : ils rendent la protection possible</text>`;
    return d;
  }


  /* ---------------------------------------------- 4.7 : le bilame et son reglage */
  function bilameReglage() {
    const d = svg('0 0 820 400',
      'Coupe d’un relais thermique : le bilame, la molette de réglage, et les contacts 95-96.');
    d.innerHTML = `
<rect x="16" y="14" width="788" height="372" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Un bilame, et une molette</text>
<rect x="110" y="76" width="440" height="280" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>

<line x1="50" y1="130" x2="110" y2="130" stroke="${C.navy}" stroke-width="6"/>
<line x1="550" y1="130" x2="610" y2="130" stroke="${C.navy}" stroke-width="6"/>

<path id="rLame" d="M170 130 h200" fill="none" stroke="${C.rouge}" stroke-width="11" stroke-linecap="round"/>
<text x="270" y="108" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">le bilame</text>

<line id="rTige" x1="376" y1="130" x2="376" y2="238" stroke="${C.navy}" stroke-width="6"/>
<circle cx="376" cy="238" r="8" fill="${C.navy}"/>

<line x1="300" y1="290" x2="460" y2="290" stroke="${C.navy}" stroke-width="5"/>
<circle cx="330" cy="290" r="6" fill="${C.navy}"/>
<line id="rContact" x1="330" y1="290" x2="430" y2="290" stroke="${C.vert}" stroke-width="8" stroke-linecap="round"/>
<text x="286" y="322" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">95</text>
<text x="474" y="322" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">96</text>
<text x="380" y="346" text-anchor="middle" font-size="13" fill="${C.gris}">le contact qui coupe la commande</text>

<circle cx="670" cy="196" r="60" fill="${C.papier}" stroke="${C.navy}" stroke-width="5"/>
<line x1="670" y1="196" x2="670" y2="150" stroke="${C.orange}" stroke-width="6" stroke-linecap="round"/>
<text x="670" y="286" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">la molette</text>
<text x="670" y="308" text-anchor="middle" font-size="13" fill="${C.gris}">réglée sur l’intensité</text>
<text x="670" y="328" text-anchor="middle" font-size="13" fill="${C.gris}">lue sur la plaque du moteur</text>

<text x="380" y="378" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}" id="rEtat">au repos — le contact 95-96 est fermé</text>`;
    const maj = (etat) => {
      const lame = d.querySelector('#rLame'), tige = d.querySelector('#rTige'),
            contact = d.querySelector('#rContact'), t = d.querySelector('#rEtat');
      if (etat === 'repos') {
        lame.setAttribute('d', 'M170 130 h200'); lame.setAttribute('stroke', C.rouge);
        tige.setAttribute('x1', 376); tige.setAttribute('x2', 376);
        contact.setAttribute('x2', 430); contact.setAttribute('stroke', C.vert);
        t.textContent = 'au repos — le contact 95-96 est fermé'; t.setAttribute('fill', C.gris);
      } else {
        lame.setAttribute('d', 'M170 130 q120 0 176 -36'); lame.setAttribute('stroke', C.feu);
        tige.setAttribute('x1', 348); tige.setAttribute('x2', 348);
        contact.setAttribute('x2', 372); contact.setAttribute('stroke', C.rouge);
        t.textContent = 'surcharge — le bilame pousse, 95-96 s’ouvre, la commande tombe';
        t.setAttribute('fill', C.rouge);
      }
    };
    return bloc(d, [
      { id:'repos', libelle:'Au repos', legende:'Le courant du moteur traverse le bilame. Le contact 95-96 est fermé, la bobine du contacteur reste alimentée.', appliquer:() => maj('repos') },
      { id:'surcharge', libelle:'En surcharge', legende:'Le bilame chauffe et se courbe. Il pousse un levier qui ouvre le contact 95-96. La bobine du contacteur retombe — et c’est le contacteur qui coupe la puissance, pas le relais.', appliquer:() => maj('surcharge') }
    ], 'repos', 'Le courant du moteur traverse le bilame. Le contact 95-96 est fermé, la bobine du contacteur reste alimentée.');
  }

  /* ---------------------------------------------- 4.8 : la boucle de defaut */
  function boucleDefaut() {
    const d = svg('0 0 820 400',
      'Le courant de défaut part de la carcasse, passe par le conducteur de protection et revient par la terre.');
    d.innerHTML = `
<rect x="16" y="14" width="788" height="372" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">La terre ne protège pas : elle rend la protection possible</text>

<rect x="110" y="106" width="150" height="130" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="4"/>
<text x="185" y="98" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">la machine</text>
<circle cx="185" cy="171" r="30" fill="${C.papier}" stroke="${C.navy}" stroke-width="4"/>
<text x="185" y="179" text-anchor="middle" font-size="18" font-weight="700" fill="${C.navy}">M</text>

<line x1="50" y1="136" x2="110" y2="136" stroke="${C.orange}" stroke-width="6"/>
<text x="52" y="124" font-size="13" font-weight="700" fill="${C.orange}">phase</text>

<g id="bDefaut" opacity="0">
  <line x1="185" y1="141" x2="258" y2="141" stroke="${C.rouge}" stroke-width="5" stroke-dasharray="8 5"/>
  <text x="296" y="128" font-size="13" font-weight="700" fill="${C.rouge}">l’isolant a lâché</text>
  <text x="296" y="148" font-size="13" fill="${C.gris}">la carcasse est sous tension</text>
</g>

<line x1="185" y1="236" x2="185" y2="296" stroke="${C.vert}" stroke-width="7"/>
<text x="126" y="274" font-size="13" font-weight="700" fill="${C.vert}">le PE</text>
<line x1="130" y1="296" x2="240" y2="296" stroke="${C.vert}" stroke-width="6"/>
<line x1="146" y1="310" x2="224" y2="310" stroke="${C.vert}" stroke-width="6"/>
<line x1="162" y1="324" x2="208" y2="324" stroke="${C.vert}" stroke-width="6"/>
<text x="185" y="352" text-anchor="middle" font-size="13" fill="${C.gris}">la prise de terre</text>

<g id="bCourant" opacity="0">
  <path d="M185 196 v96" fill="none" stroke="${C.rouge}" stroke-width="6"/>
  <path d="M430 296 h-186" fill="none" stroke="${C.rouge}" stroke-width="5" stroke-dasharray="10 6"/>
  <text x="600" y="288" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">le courant de défaut</text>
  <text x="600" y="310" text-anchor="middle" font-size="13" fill="${C.gris}">il revient à la source par la terre</text>
  <text x="600" y="332" text-anchor="middle" font-size="13" fill="${C.gris}">et c’est ce trajet que le différentiel détecte</text>
</g>

<g id="bCorps" opacity="0">
  <circle cx="470" cy="146" r="18" fill="none" stroke="${C.navy}" stroke-width="4"/>
  <line x1="470" y1="164" x2="470" y2="218" stroke="${C.navy}" stroke-width="4"/>
  <line x1="470" y1="180" x2="440" y2="201" stroke="${C.navy}" stroke-width="4"/>
  <line x1="470" y1="180" x2="500" y2="201" stroke="${C.navy}" stroke-width="4"/>
  <line x1="470" y1="218" x2="452" y2="256" stroke="${C.navy}" stroke-width="4"/>
  <line x1="470" y1="218" x2="488" y2="256" stroke="${C.navy}" stroke-width="4"/>
  <path d="M262 144 h186" fill="none" stroke="${C.rouge}" stroke-width="5"/>
  <text x="620" y="176" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">sans le PE, c’est le corps</text>
  <text x="620" y="198" text-anchor="middle" font-size="13" fill="${C.gris}">qui devient le chemin de retour</text>
</g>

<text x="410" y="382" text-anchor="middle" font-size="15" font-weight="700" fill="${C.gris}" id="bEtat">machine saine — rien ne passe par le conducteur de protection</text>`;
    const maj = (etat) => {
      const on = (id, v) => d.querySelector(id).setAttribute('opacity', v ? '1' : '0');
      const t = d.querySelector('#bEtat');
      on('#bDefaut', etat !== 'sain'); on('#bCourant', etat === 'defaut'); on('#bCorps', etat === 'sansPE');
      if (etat === 'sain') { t.textContent = 'machine saine — rien ne passe par le conducteur de protection'; t.setAttribute('fill', C.gris); }
      else if (etat === 'defaut') { t.textContent = 'défaut avec le PE — le courant a un chemin, le différentiel le voit'; t.setAttribute('fill', C.vert); }
      else { t.textContent = 'défaut SANS le PE — le seul chemin possible passe par celui qui touche'; t.setAttribute('fill', C.rouge); }
    };
    return bloc(d, [
      { id:'sain', libelle:'Machine saine', legende:'L’isolant fait son travail. Aucun courant ne circule dans le conducteur de protection : il attend.', appliquer:() => maj('sain') },
      { id:'defaut', libelle:'Défaut, avec la terre', legende:'L’isolant a lâché, la carcasse est sous tension. Le courant part par le conducteur de protection et revient à la source. Ce courant-là, le différentiel le mesure — et il coupe.', appliquer:() => maj('defaut') },
      { id:'sansPE', libelle:'Défaut, sans la terre', legende:'Même défaut, mais aucun conducteur de protection. La carcasse reste sous tension et rien ne se passe — jusqu’à ce que quelqu’un la touche. Le corps devient alors le chemin de retour.', appliquer:() => maj('sansPE') }
    ], 'sain', 'L’isolant fait son travail. Aucun courant ne circule dans le conducteur de protection : il attend.');
  }

  /* ---------------------------------------------- 4.9 : la section et l'echauffement */
  function sectionCable() {
    const d = svg('0 0 820 400',
      'Trois sections de conducteur et le courant qu’elles admettent : plus le fil est fin, plus il chauffe.');
    d.innerHTML = `
<rect x="16" y="14" width="788" height="372" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">La section décide du courant admissible</text>
${[[1.5, 16, 170], [2.5, 21, 410], [6, 36, 650]].map(([sec, amp, x], i) => `
<circle cx="${x}" cy="164" r="${18 + i * 15}" fill="#d98a45" stroke="${C.navy}" stroke-width="4"/>
<text x="${x}" y="252" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${String(sec).replace('.', ',')} mm²</text>
<text x="${x}" y="280" text-anchor="middle" font-size="15" fill="${C.gris}">environ ${amp} A</text>`).join('')}
<text x="410" y="322" text-anchor="middle" font-size="13" fill="${C.gris}">valeurs indicatives : l’intensité vraiment admissible dépend du mode de pose, de l’isolant et de la température</text>
<text x="410" y="360" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Le calibre de la protection se choisit APRÈS la section, jamais l’inverse.</text>`;
    return bloc(d, [], null,
      'Un conducteur qui porte plus de courant qu’il ne peut chauffe. S’il chauffe, l’isolant vieillit, durcit, puis lâche. La protection en amont existe pour que cela n’arrive jamais.');
  }

  return { COLONNES, courbesFusion, deuxDeclencheurs, toreDifferentiel, tableauDefauts,
           bilameReglage, boucleDefaut, sectionCable };
})();
