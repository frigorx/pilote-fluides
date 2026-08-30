/* ÉlectroRézo — les scènes de la ligne 2 « Les réseaux d'alimentation ».

   Un réseau ne se photographie pas non plus : ce qu'on en voit, ce sont des fils
   qui se ressemblent tous. Alors on montre ce qui les distingue — le rôle de
   chacun, et ce qu'un voltmètre lit entre deux d'entre eux.

   La pièce maîtresse est le champ tournant : trois bobines, trois courants
   décalés, et une aiguille qui tourne toute seule. C'est la seule façon
   honnête d'expliquer pourquoi un moteur triphasé démarre sans qu'on l'aide.

   Règles de maison : la couleur ne porte jamais seule l'information — chaque
   conducteur est aussi nommé ; aucun texte ne chevauche un tracé. */

const SchemasReseaux = (() => {
  'use strict';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', doux:'#84b7ec', orange:'#c9451a', feu:'#ff6b35',
              vert:'#1e7e54', rouge:'#c0392b', gris:'#637285', papier:'#fffdf8',
              creme:'#f7f1e7', trait:'rgba(27,58,99,.18)', jaune:'#c8a415' };

  const svg = (vb, aria) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria); return s;
  };
  const nb = (v, d) => v.toFixed(d === undefined ? 0 : d).replace('.', ',');
  const bloc = SchemasGrandeurs.bloc;
  const reglette = SchemasGrandeurs.reglette;
  const instrument = SchemasGrandeurs.instrument;

  /* ============================================================ 2.1 — trois conducteurs
     Ils se ressemblent tous. Ce qui les distingue, c'est ce qu'ils font. */
  function troisConducteurs() {
    const d = svg('0 0 760 340', 'Les trois conducteurs d’une installation : la phase qui amène, le neutre qui ramène, et le conducteur de protection qui n’attend que le défaut.');
    const peindre = (cas) => {
      const defaut = cas === 'defaut';
      d.innerHTML = `
<rect x="8" y="8" width="744" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${defaut ? 'Un défaut apparaît — le PE se met au travail' : 'Marche normale — le PE ne fait rien du tout'}</text>

<!-- la phase -->
<line x1="90" y1="86" x2="470" y2="86" stroke="${C.orange}" stroke-width="6"/>
<text x="78" y="91" text-anchor="end" font-size="15" font-weight="700" fill="${C.orange}">Ph</text>
<text x="200" y="76" font-size="12" fill="${C.gris}">elle amène le courant</text>

<!-- la charge -->
<rect x="470" y="60" width="80" height="150" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="510" y="140" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">la machine</text>
<rect x="462" y="52" width="96" height="166" rx="8" fill="none" stroke="${C.gris}" stroke-width="2" stroke-dasharray="6 4"/>
<text x="566" y="58" font-size="11" fill="${C.gris}">carcasse métallique</text>

<!-- le neutre -->
<line x1="90" y1="184" x2="470" y2="184" stroke="${C.bleu}" stroke-width="6"/>
<text x="78" y="189" text-anchor="end" font-size="15" font-weight="700" fill="${C.bleu}">N</text>
<text x="200" y="206" font-size="12" fill="${C.gris}">il ramène le courant</text>

<!-- le PE -->
<line x1="90" y1="262" x2="558" y2="262" stroke="${defaut ? C.jaune : 'rgba(27,58,99,.25)'}" stroke-width="6"/>
<line x1="558" y1="262" x2="558" y2="218" stroke="${defaut ? C.jaune : 'rgba(27,58,99,.25)'}" stroke-width="6"/>
<text x="78" y="267" text-anchor="end" font-size="15" font-weight="700" fill="${C.jaune}">PE</text>
<line x1="66" y1="278" x2="114" y2="278" stroke="${C.navy}" stroke-width="5"/>
<line x1="76" y1="288" x2="104" y2="288" stroke="${C.navy}" stroke-width="5"/>
<line x1="85" y1="298" x2="95" y2="298" stroke="${C.navy}" stroke-width="5"/>

${defaut
  ? `<path d="M500 100 L540 100 L540 214" fill="none" stroke="${C.rouge}" stroke-width="5" stroke-dasharray="8 5"/>
     <circle cx="500" cy="100" r="9" fill="none" stroke="${C.rouge}" stroke-width="3"/>
     <text x="200" y="248" font-size="13" font-weight="700" fill="${C.jaune}">il évacue le courant de défaut, tout de suite</text>
     <text x="380" y="316" text-anchor="middle" font-size="13" fill="${C.gris}">L’isolant a lâché : la phase touche la carcasse. Le courant part par le vert-jaune, et le différentiel le voit.</text>`
  : `<text x="200" y="248" font-size="12" fill="${C.gris}">il ne transporte rien — et c’est bon signe</text>
     <text x="380" y="316" text-anchor="middle" font-size="13" fill="${C.gris}">Un PE parcouru par du courant en marche normale annonce un défaut. Ce n’est jamais normal.</text>`}`;
    };
    peindre('normal');
    return bloc(d, [
      { id: 'normal', libelle: 'Marche normale', legende: 'Le courant part par la phase et revient par le neutre. Le conducteur de protection ne transporte rien : c’est exactement ce qu’on lui demande.', appliquer: () => peindre('normal') },
      { id: 'defaut', libelle: 'Un défaut d’isolement', legende: 'La phase touche la carcasse. Le courant part par le vert-jaune vers la terre, et il manque au retour — c’est ce que le différentiel détecte.', appliquer: () => peindre('defaut') }
    ], 'normal', 'Le courant part par la phase et revient par le neutre. Le conducteur de protection ne transporte rien : c’est exactement ce qu’on lui demande.');
  }

  function troisMesures() {
    const d = svg('0 0 700 300', 'Trois mesures suffisent à identifier trois conducteurs inconnus : entre eux deux à deux, les valeurs ne trompent pas.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Trois fils inconnus : trois mesures, et on sait</text>

${[['entre les deux premiers', '230 V', 'phase et neutre', C.vert],
   ['entre le premier et le troisième', '230 V', 'phase et terre', C.vert],
   ['entre le deuxième et le troisième', '0 V', 'neutre et terre', C.bleu]]
  .map(([quoi, val, quoi2, coul], i) => `
<rect x="40" y="${68 + i * 66}" width="620" height="54" rx="8" fill="${C.creme}" stroke="${C.trait}"/>
<text x="60" y="${100 + i * 66}" font-size="13" fill="${C.gris}">${quoi}</text>
<text x="430" y="${100 + i * 66}" text-anchor="end" font-size="19" font-weight="700" fill="${coul}">${val}</text>
<text x="450" y="${100 + i * 66}" font-size="13" font-weight="700" fill="${C.navy}">→ ${quoi2}</text>`).join('')}

<text x="350" y="286" text-anchor="middle" font-size="13" fill="${C.gris}">Le neutre et la terre sont presque au même potentiel : c’est le zéro qui les distingue de la phase.</text>`;
    return bloc(d, [], null,
      'Cette méthode identifie les conducteurs, elle ne remplace pas le repérage. Un fil sans repère doit être repéré avant qu’on referme le coffret.');
  }

  /* ============================================================ 2.2 — le monophasé */
  function boucleMonophasee() {
    const d = svg('0 0 700 300', 'Le circuit monophasé : une phase, un neutre, et une boucle. Le courant part et revient par le même chemin, cinquante fois par seconde.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Deux fils, une boucle</text>

<rect x="80" y="86" width="60" height="120" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="110" y="152" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">le réseau</text>

<line x1="110" y1="86" x2="110" y2="70" stroke="${C.orange}" stroke-width="5"/>
<line x1="110" y1="70" x2="520" y2="70" stroke="${C.orange}" stroke-width="5"/>
<text x="300" y="60" text-anchor="middle" font-size="13" font-weight="700" fill="${C.orange}">phase</text>
<line x1="110" y1="206" x2="110" y2="222" stroke="${C.bleu}" stroke-width="5"/>
<line x1="110" y1="222" x2="520" y2="222" stroke="${C.bleu}" stroke-width="5"/>
<text x="300" y="242" text-anchor="middle" font-size="13" font-weight="700" fill="${C.bleu}">neutre</text>

<line x1="520" y1="70" x2="520" y2="106" stroke="${C.orange}" stroke-width="5"/>
<rect x="480" y="106" width="80" height="80" rx="6" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="520" y="152" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">la charge</text>
<line x1="520" y1="186" x2="520" y2="222" stroke="${C.bleu}" stroke-width="5"/>

<text x="620" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">230 V</text>
<line x1="620" y1="130" x2="620" y2="166" stroke="${C.navy}" stroke-width="2"/>
<path d="M614 138 L620 130 L626 138" fill="none" stroke="${C.navy}" stroke-width="2"/>
<path d="M614 158 L620 166 L626 158" fill="none" stroke="${C.navy}" stroke-width="2"/>
<text x="620" y="184" text-anchor="middle" font-size="12" fill="${C.gris}">entre les deux</text>

<text x="350" y="272" text-anchor="middle" font-size="13" fill="${C.gris}">Le courant part et revient cinquante fois par seconde. « Aller » et « retour » sont des mots commodes, pas des sens fixes.</text>`;
    return bloc(d, [], null,
      'Phase et neutre ne sont pas deux fils identiques : le neutre est relié à la terre au poste de distribution, la phase non. C’est ce qui rend la phase dangereuse et le neutre presque inoffensif.');
  }

  function monoOuTri() {
    const d = svg('0 0 700 280', 'Comment savoir si une installation est monophasée ou triphasée : on compte les conducteurs actifs, et on mesure entre eux.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="264" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Deux questions, dans cet ordre</text>

<rect x="40" y="66" width="290" height="170" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="185" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">1 · Combien de fils actifs ?</text>
<line x1="80" y1="122" x2="290" y2="122" stroke="${C.orange}" stroke-width="5"/>
<line x1="80" y1="144" x2="290" y2="144" stroke="${C.bleu}" stroke-width="5"/>
<text x="185" y="176" text-anchor="middle" font-size="13" fill="${C.gris}">deux → monophasé</text>
<text x="185" y="200" text-anchor="middle" font-size="13" fill="${C.gris}">trois ou quatre → triphasé</text>
<text x="185" y="224" text-anchor="middle" font-size="12" fill="${C.gris}">le vert-jaune ne compte pas</text>

<rect x="370" y="66" width="290" height="170" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="515" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">2 · Combien entre deux d’entre eux ?</text>
<text x="515" y="132" text-anchor="middle" font-size="19" font-weight="700" fill="${C.orange}">230 V</text>
<text x="515" y="154" text-anchor="middle" font-size="12" fill="${C.gris}">phase et neutre</text>
<text x="515" y="188" text-anchor="middle" font-size="19" font-weight="700" fill="${C.orange}">400 V</text>
<text x="515" y="210" text-anchor="middle" font-size="12" fill="${C.gris}">deux phases : vous êtes en triphasé</text>

<text x="350" y="262" text-anchor="middle" font-size="13" fill="${C.gris}">Compter les fils ne suffit pas : deux phases sans neutre, cela fait aussi deux fils — et 400 volts entre eux.</text>`;
    return bloc(d, [], null,
      'Ne concluez jamais sur le nombre de fils seul. C’est la mesure entre deux d’entre eux qui tranche.');
  }

  /* ============================================================ 2.3 — le triphasé
     Trois sinusoïdes décalées d'un tiers de tour, et leur somme qui s'annule. */
  function troisSinusoides() {
    const d = svg('0 0 760 320', 'Trois tensions de même valeur, décalées d’un tiers de période. À chaque instant, leur somme est nulle.');
    const peindre = (avecSomme) => {
      const cbe = (dec, coul, ep) => {
        const pts = [];
        for (let i = 0; i <= 600; i += 3) {
          const y = 170 - 68 * Math.sin((i / 600) * Math.PI * 4 - dec);
          pts.push((100 + i) + ',' + y.toFixed(1));
        }
        return `<polyline points="${pts.join(' ')}" fill="none" stroke="${coul}" stroke-width="${ep}"/>`;
      };
      d.innerHTML = `
<rect x="8" y="8" width="744" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${avecSomme ? 'Additionnez les trois à n’importe quel instant : zéro' : 'Trois tensions identiques, décalées d’un tiers de tour'}</text>

<line x1="100" y1="170" x2="700" y2="170" stroke="${C.navy}" stroke-width="2"/>
${cbe(0, C.orange, 3.5)}
${cbe(2 * Math.PI / 3, C.navy, 3.5)}
${cbe(4 * Math.PI / 3, C.vert, 3.5)}
${avecSomme ? `<line x1="100" y1="170" x2="700" y2="170" stroke="${C.rouge}" stroke-width="5" stroke-dasharray="12 6"/>` : ''}

<text x="716" y="120" text-anchor="end" font-size="13" font-weight="700" fill="${C.orange}">L1</text>
<text x="716" y="142" text-anchor="end" font-size="13" font-weight="700" fill="${C.navy}">L2</text>
<text x="716" y="164" text-anchor="end" font-size="13" font-weight="700" fill="${C.vert}">L3</text>
${avecSomme ? `<text x="716" y="188" text-anchor="end" font-size="13" font-weight="700" fill="${C.rouge}">somme</text>` : ''}

<text x="380" y="266" text-anchor="middle" font-size="13" fill="${C.gris}">${avecSomme
  ? 'C’est pour cela qu’un neutre peut être plus fin que les phases : sur une installation équilibrée, il ne ramène presque rien.'
  : 'Le décalage est d’un tiers de période, soit 120 degrés. Il n’est pas réglable : il vient de la construction de l’alternateur.'}</text>
<text x="380" y="292" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">${avecSomme
  ? 'Déséquilibrez les charges, et le neutre se met à ramener du courant.'
  : 'Trois phases, et jamais une de plus : c’est la nature du réseau.'}</text>`;
    };
    peindre(false);
    return bloc(d, [
      { id: 'trois', libelle: 'Les trois tensions', legende: 'Même valeur, même fréquence, mais décalées d’un tiers de tour. Ce décalage vient de la construction de l’alternateur : trois bobinages à 120 degrés l’un de l’autre.', appliquer: () => peindre(false) },
      { id: 'somme', libelle: 'Leur somme', legende: 'À chaque instant, les trois s’annulent. Sur une installation équilibrée, le neutre ne ramène donc presque rien — et c’est pour cela qu’il peut être plus fin que les phases.', appliquer: () => peindre(true) }
    ], 'trois', 'Même valeur, même fréquence, mais décalées d’un tiers de tour. Ce décalage vient de la construction de l’alternateur : trois bobinages à 120 degrés l’un de l’autre.');
  }

  function sixMesures() {
    const d = svg('0 0 700 320', 'Sur une prise triphasée avec neutre, il y a six mesures possibles, et deux valeurs seulement.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Six mesures, deux valeurs</text>

<rect x="40" y="66" width="300" height="200" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="190" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.orange}">entre deux phases</text>
${['L1 – L2', 'L1 – L3', 'L2 – L3'].map((t, i) => `
<text x="80" y="${132 + i * 38}" font-size="14" fill="${C.navy}">${t}</text>
<text x="300" y="${132 + i * 38}" text-anchor="end" font-size="17" font-weight="700" fill="${C.orange}">400 V</text>`).join('')}
<text x="190" y="252" text-anchor="middle" font-size="12" fill="${C.gris}">la tension composée</text>

<rect x="360" y="66" width="300" height="200" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="510" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.bleu}">entre une phase et le neutre</text>
${['L1 – N', 'L2 – N', 'L3 – N'].map((t, i) => `
<text x="400" y="${132 + i * 38}" font-size="14" fill="${C.navy}">${t}</text>
<text x="620" y="${132 + i * 38}" text-anchor="end" font-size="17" font-weight="700" fill="${C.bleu}">230 V</text>`).join('')}
<text x="510" y="252" text-anchor="middle" font-size="12" fill="${C.gris}">la tension simple</text>

<text x="350" y="292" text-anchor="middle" font-size="13" fill="${C.gris}">Deux valeurs très différentes sur la même prise. Se tromper de paire de bornes, c’est brancher du 400 sur du 230.</text>`;
    return bloc(d, [], null,
      'Les six mesures doivent donner deux valeurs, et deux seulement. Une valeur qui sort du lot annonce un conducteur coupé, ou un neutre mal raccordé.');
  }

  /* ============================================================ 2.4 / 2.5 — simple et composée
     Le rapport √3, démontré par le dessin plutôt qu'asséné. */
  function simpleEtComposee(mode) {
    const composee = mode === 'composee';
    const d = svg('0 0 700 340',
      composee ? 'La tension composée, entre deux phases : elle vaut racine de trois fois la tension simple, et le dessin le montre.'
               : 'La tension simple, entre une phase et le neutre : trois flèches partant du même centre.');
    const cx = 250, cy = 176, R = 96;
    const P = a => [cx + R * Math.cos(a), cy + R * Math.sin(a)];
    const [x1, y1] = P(-Math.PI / 2), [x2, y2] = P(-Math.PI / 2 + 2 * Math.PI / 3), [x3, y3] = P(-Math.PI / 2 + 4 * Math.PI / 3);
    d.innerHTML = `
<rect x="8" y="8" width="684" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${composee ? 'Entre deux phases : la tension composée' : 'Entre une phase et le neutre : la tension simple'}</text>

<circle cx="${cx}" cy="${cy}" r="4" fill="${C.navy}"/>
<text x="${cx - 10}" y="${cy + 20}" text-anchor="end" font-size="13" font-weight="700" fill="${C.bleu}">N</text>

${[[x1, y1, 'L1', C.orange], [x2, y2, 'L2', C.navy], [x3, y3, 'L3', C.vert]].map(([x, y, t, coul]) => `
<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"
      stroke="${composee ? 'rgba(27,58,99,.3)' : coul}" stroke-width="${composee ? 3 : 5}"/>
<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${coul}"/>
<text x="${(cx + (x - cx) * 1.24).toFixed(1)}" y="${(cy + (y - cy) * 1.24 + 5).toFixed(1)}"
      text-anchor="middle" font-size="14" font-weight="700" fill="${coul}">${t}</text>`).join('')}

${composee
  ? `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${C.rouge}" stroke-width="6"/>
     <line x1="${x2.toFixed(1)}" y1="${y2.toFixed(1)}" x2="${x3.toFixed(1)}" y2="${y3.toFixed(1)}" stroke="${C.rouge}" stroke-width="6"/>
     <line x1="${x3.toFixed(1)}" y1="${y3.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${C.rouge}" stroke-width="6"/>`
  : ''}

<rect x="410" y="76" width="250" height="180" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="535" y="106" text-anchor="middle" font-size="13" fill="${C.gris}">${composee ? 'un côté du triangle' : 'une branche de l’étoile'}</text>
<text x="535" y="146" text-anchor="middle" font-size="30" font-weight="700" fill="${composee ? C.rouge : C.orange}">${composee ? '400 V' : '230 V'}</text>
<text x="535" y="180" text-anchor="middle" font-size="13" fill="${C.gris}">${composee ? 'entre L1 et L2, L2 et L3, L3 et L1' : 'entre L1 et N, L2 et N, L3 et N'}</text>
${composee
  ? `<text x="535" y="212" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">400 ≈ 230 × 1,73</text>
     <text x="535" y="236" text-anchor="middle" font-size="12" fill="${C.gris}">et 1,73, c’est √3</text>`
  : `<text x="535" y="212" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">c’est la valeur de nos prises</text>
     <text x="535" y="236" text-anchor="middle" font-size="12" fill="${C.gris}">une maison en reçoit une seule</text>`}

<text x="350" y="296" text-anchor="middle" font-size="13" fill="${C.gris}">${composee
  ? 'Le côté du triangle est plus long que le rayon de l’étoile — et le rapport entre les deux vaut toujours 1,73.'
  : 'Les trois branches partent du même point : le neutre. Elles ont la même longueur, à 120 degrés l’une de l’autre.'}</text>
<text x="350" y="320" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">${composee
  ? 'Ce n’est pas une convention : c’est de la géométrie.'
  : 'On la note V. La composée, elle, se note U.'}</text>`;
    return d;
  }

  function etoileEtTriangle() {
    const hote = document.createElement('div');
    const zone = document.createElement('div');
    zone.appendChild(simpleEtComposee('simple'));
    hote.appendChild(zone);
    return bloc(hote, [
      { id: 'simple', libelle: 'La tension simple', legende: 'Entre une phase et le neutre : 230 volts. Sur le dessin, c’est une branche de l’étoile, qui part du centre.', appliquer: () => { zone.innerHTML = ''; zone.appendChild(simpleEtComposee('simple')); } },
      { id: 'composee', libelle: 'La tension composée', legende: 'Entre deux phases : 400 volts. Sur le dessin, c’est un côté du triangle. Il est plus long que le rayon, et le rapport vaut 1,73 — c’est-à-dire racine de trois.', appliquer: () => { zone.innerHTML = ''; zone.appendChild(simpleEtComposee('composee')); } }
    ], 'simple', 'Entre une phase et le neutre : 230 volts. Sur le dessin, c’est une branche de l’étoile, qui part du centre.');
  }

  function verifierRacineDeTrois() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 240', 'La relation entre tension simple et tension composée, vérifiée sur plusieurs réseaux.');
    let V = 230;
    const peindre = () => {
      const U = V * Math.sqrt(3);
      d.innerHTML = `
<rect x="8" y="8" width="684" height="224" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Une seule relation, pour tous les réseaux</text>

<rect x="50" y="70" width="180" height="100" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="140" y="96" text-anchor="middle" font-size="12" fill="${C.gris}">tension simple</text>
<text x="140" y="132" text-anchor="middle" font-size="26" font-weight="700" fill="${C.orange}">${nb(V)} V</text>
<text x="140" y="156" text-anchor="middle" font-size="12" fill="${C.gris}">phase et neutre</text>

<text x="290" y="126" text-anchor="middle" font-size="22" font-weight="700" fill="${C.navy}">× 1,73</text>
<line x1="240" y1="140" x2="340" y2="140" stroke="${C.navy}" stroke-width="3"/>
<path d="M330 132 L342 140 L330 148" fill="none" stroke="${C.navy}" stroke-width="3"/>

<rect x="360" y="70" width="180" height="100" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="450" y="96" text-anchor="middle" font-size="12" fill="${C.gris}">tension composée</text>
<text x="450" y="132" text-anchor="middle" font-size="26" font-weight="700" fill="${C.rouge}">${nb(U)} V</text>
<text x="450" y="156" text-anchor="middle" font-size="12" fill="${C.gris}">entre deux phases</text>

<text x="620" y="112" text-anchor="middle" font-size="12" fill="${C.gris}">${Math.abs(V - 230) < 3 ? 'le réseau français' : Math.abs(V - 127) < 3 ? 'l’ancien réseau 127 / 220' : Math.abs(V - 400) < 6 ? 'la distribution industrielle' : 'une valeur d’essai'}</text>

<text x="350" y="206" text-anchor="middle" font-size="13" fill="${C.gris}">Le rapport ne dépend ni du pays ni de l’installation : il vient de la géométrie du triangle.</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'v3', 'La tension simple', 100, 400, 1, V, v => v + ' V', v => { V = v; peindre(); });
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Posez 230 : vous obtenez 400. Posez 127 : vous obtenez 220 — c’est l’ancien réseau français, '
      + 'et vous rencontrerez encore des plaques de moteur qui le mentionnent.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ 2.6 — le champ tournant
     La pièce maîtresse : trois bobines, trois courants décalés, et une aiguille
     qui tourne toute seule. Sans elle, le moteur asynchrone reste magique. */
  function champTournant() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 440', 'Trois bobines disposées à 120 degrés, parcourues par trois courants décalés : leur effet combiné est un champ qui tourne.');
    let t = 0, sens = 1;
    const cx = 220, cy = 208, R = 104;

    const peindre = () => {
      const a = t * Math.PI / 180;
      /* Les trois bobines sont FIXES, à 120° l'une de l'autre. Ce qui change
         quand on échange deux phases, ce n'est pas leur place : c'est quelle
         phase alimente laquelle. */
      const cablage = sens > 0 ? [0, 1, 2] : [0, 2, 1];
      const B = [0, 1, 2].map(i => {
        const pos = -Math.PI / 2 + i * 2 * Math.PI / 3;      /* sa place, jamais modifiée */
        const phase = cablage[i];                            /* la phase qui l'alimente */
        const val = Math.cos(a - phase * 2 * Math.PI / 3);    /* son courant à cet instant */
        return { pos, phase, val, i };
      });
      /* somme vectorielle : c'est elle, le champ tournant */
      let sx = 0, sy = 0;
      B.forEach(b => { sx += b.val * Math.cos(b.pos); sy += b.val * Math.sin(b.pos); });
      sx *= 2 / 3; sy *= 2 / 3;   /* la somme vaut 3/2 : on ramène la longueur à 1 */
      const norme = Math.hypot(sx, sy);
      /* La direction affichée se lit sur le vecteur, jamais sur le curseur : en
         ordre inverse elles ne coïncident plus, et c'est justement ce qu'on veut voir. */
      const angle = Math.round((Math.atan2(sy, sx) * 180 / Math.PI + 450)) % 360;

      d.innerHTML = `
<rect x="8" y="8" width="684" height="424" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Trois bobines fixes, et pourtant quelque chose tourne</text>

<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.trait}" stroke-width="2"/>
${B.map(b => {
  const bx = cx + R * Math.cos(b.pos), by = cy + R * Math.sin(b.pos);
  const ep = 4 + Math.abs(b.val) * 9;
  const coul = [C.orange, C.navy, C.vert][b.phase];
  return `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="17" fill="none" stroke="${coul}" stroke-width="${ep.toFixed(1)}"/>
    <text x="${(cx + (R + 34) * Math.cos(b.pos)).toFixed(1)}" y="${(cy + (R + 34) * Math.sin(b.pos) + 5).toFixed(1)}"
          text-anchor="middle" font-size="14" font-weight="700" fill="${coul}">L${b.phase + 1}</text>
    <text x="${(cx + (R + 34) * Math.cos(b.pos)).toFixed(1)}" y="${(cy + (R + 34) * Math.sin(b.pos) + 5 + (b.pos < 0 ? -17 : 17)).toFixed(1)}"
          text-anchor="middle" font-size="11" fill="${C.gris}">${b.val >= 0 ? '+' : '−'}${Math.abs(b.val).toFixed(2).replace('.', ',')}</text>`;
}).join('')}

<line x1="${cx}" y1="${cy}" x2="${(cx + sx * 76).toFixed(1)}" y2="${(cy + sy * 76).toFixed(1)}"
      stroke="${C.rouge}" stroke-width="7" stroke-linecap="round"/>
<circle cx="${cx}" cy="${cy}" r="7" fill="${C.rouge}"/>
<text x="${cx}" y="366" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">la flèche rouge : le champ résultant</text>

<rect x="410" y="76" width="250" height="180" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="535" y="106" text-anchor="middle" font-size="13" fill="${C.gris}">sa direction</text>
<text x="535" y="142" text-anchor="middle" font-size="26" font-weight="700" fill="${C.rouge}">${nb(angle)}°</text>
<text x="535" y="176" text-anchor="middle" font-size="13" fill="${C.gris}">sa longueur</text>
<text x="535" y="206" text-anchor="middle" font-size="20" font-weight="700" fill="${C.navy}">${norme.toFixed(2).replace('.', ',')}</text>
<text x="535" y="234" text-anchor="middle" font-size="12" fill="${C.gris}">elle ne change pas : il tourne, il ne pulse pas</text>

<text x="350" y="392" text-anchor="middle" font-size="13" fill="${C.gris}">Aucune pièce ne bouge. Ce sont les trois courants qui, en se décalant, font tourner leur effet combiné.</text>
<text x="350" y="414" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">Le rotor n’a qu’à suivre. C’est tout le principe du moteur asynchrone.</text>
<text x="530" y="300" text-anchor="middle" font-size="12.5" fill="${sens > 0 ? C.navy : C.orange}">${sens > 0 ? 'Câblage L1 · L2 · L3 — les bobines sont fixes' : 'L2 et L3 échangées — les bobines n’ont pas bougé, le champ tourne à l’envers'}</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'ct', 'Avancer dans le temps', 0, 360, 5, 0, v => nb(v) + '°', v => { t = v; peindre(); });

    const barre = document.createElement('div');
    barre.className = 'choix'; barre.style.marginTop = '.5rem';
    [[1, 'Ordre L1 · L2 · L3'], [-1, 'Deux phases échangées']].forEach(([s, lib]) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', String(s === sens));
      b.addEventListener('click', () => {
        sens = s;
        barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        peindre();
      });
      barre.appendChild(b);
    });
    hote.appendChild(barre);

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Faites avancer le temps : l’aiguille rouge tourne, et sa longueur ne change pas. '
      + 'Échangez maintenant deux phases : elle tourne dans l’autre sens. C’est exactement ce qui arrive au moteur.';
    hote.appendChild(p);
    return hote;
  }

  function controlerLOrdre() {
    const d = svg('0 0 700 300', 'Deux façons de connaître le sens de rotation avant de démarrer : le contrôleur d’ordre de phases, ou l’essai bref.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Savoir avant de démarrer</text>

<rect x="40" y="66" width="290" height="180" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="185" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Le contrôleur d’ordre de phases</text>
<rect x="120" y="110" width="130" height="76" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<circle cx="160" cy="148" r="14" fill="${C.vert}"/>
<circle cx="212" cy="148" r="14" fill="none" stroke="${C.gris}" stroke-width="2"/>
<text x="160" y="180" text-anchor="middle" font-size="10" fill="${C.gris}">direct</text>
<text x="212" y="180" text-anchor="middle" font-size="10" fill="${C.gris}">inverse</text>
<text x="185" y="212" text-anchor="middle" font-size="12" fill="${C.gris}">trois pointes, une lecture,</text>
<text x="185" y="230" text-anchor="middle" font-size="12" font-weight="700" fill="${C.vert}">et le moteur n’a pas bougé</text>

<rect x="370" y="66" width="290" height="180" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="515" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">L’essai bref</text>
<circle cx="515" cy="146" r="34" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="515" y="152" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">M</text>
<path d="M556 128 A 44 44 0 0 1 556 164" fill="none" stroke="${C.orange}" stroke-width="4"/>
<path d="M550 158 L557 166 L564 156" fill="none" stroke="${C.orange}" stroke-width="4"/>
<text x="515" y="212" text-anchor="middle" font-size="12" fill="${C.gris}">on lance une seconde, on regarde,</text>
<text x="515" y="230" text-anchor="middle" font-size="12" font-weight="700" fill="${C.rouge}">et on croise les doigts</text>

<text x="350" y="276" text-anchor="middle" font-size="13" fill="${C.gris}">Sur une pompe ou un compresseur, l’essai bref suffit parfois à casser quelque chose. Le contrôleur, lui, ne fait rien tourner.</text>`;
    return bloc(d, [], null,
      'Pour inverser le sens, on échange deux phases — deux, jamais trois. Échanger les trois revient à ne rien changer.');
  }

  return { troisConducteurs, troisMesures, boucleMonophasee, monoOuTri,
           troisSinusoides, sixMesures, etoileEtTriangle, verifierRacineDeTrois,
           champTournant, controlerLOrdre };
})();
