/* ÉlectroRézo — les schémas de la ligne 5 « Commander ».
   Même règle que les lignes 3 et 4 : quand la narration parle de la bobine, du
   ressort, de l'auto-maintien ou du parachute, on les montre.

   GÉOMÉTRIE RELEVÉE, PAS INVENTÉE. Les symboles dessinés ici reprennent les
   coordonnées des fichiers de la bibliothèque QElectroTech :
     · contact NO  — con_simple.svg      polyline "-5,-10 0,10 0,20"
     · contact NF  — con_simple_nf.svg   polyline "5,-10 0,10 0,20" + barre 0,-9 → 6,-9
     · bobine      — bobine3.svg         rect -14,-8 28×16
     · puissance   — com_puiss1.svg      contact NO + demi-cercle M 0,-14.5 A 2.5,2.5
     · poussoir    — poussoir.svg        tête "-7,-5 -10,-5 -10,5 -7,5" + liaison pointillée
     · arrêt d'urg — au.svg              chapeau M -7,-5 A 4,5 + contact NF
     · voyant      — lampe2.svg          cercle r=10 barré d'une croix
     · temporisé   — con_simple_tmp_t.svg  parachute M -10,-5 A 5,5 + hampe
   Échelle ×3 comme dans signes.js. */

const SchemasCommande = (() => {
  'use strict';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', doux:'#84b7ec', orange:'#c9451a', feu:'#ff6b35',
              vert:'#1e7e54', rouge:'#c0392b', gris:'#637285', papier:'#fffdf8',
              creme:'#f7f1e7', trait:'rgba(27,58,99,.18)' };

  const svg = (vb, aria) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria); return s;
  };

  /* Un contact dessiné pour qu'on le VOIE, ouvert comme fermé.
     Un contact fermé tracé en ligne droite ne se distingue pas d'un fil : la lame
     garde donc son inclinaison, et gagne la petite barre de touche — exactement la
     façon dont con_simple_nf.svg dessine un contact qui touche.
       cx        colonne du contact         yh · yb   haut et bas de la lame
       penche    -1 vers la gauche (NO), +1 vers la droite (NF)
       ferme     la lame touche-t-elle ?    couleur   trait vivant ou mort */
  function contact(cx, yh, yb, penche, ferme, couleur, ep) {
    const dx = penche * 18, e = ep || 4;
    return `<polyline points="${cx + dx},${yh} ${cx},${yb} ${cx},${yb + 36}"
              fill="none" stroke="${couleur}" stroke-width="${e}" stroke-linejoin="round"/>`
      + (ferme ? `<line x1="${cx}" y1="${yh + 3}" x2="${cx + dx}" y2="${yh + 3}"
                       stroke="${couleur}" stroke-width="${e}"/>` : '');
  }

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

  /* ============================================================ les trois questions
     Le fil rouge de la ligne 5. Un appareil de commande se juge sur trois choses,
     et presque aucun ne les réunit toutes. */
  const COLONNES = [
    { id: 'puissance', libelle: 'Porter la puissance', aide: 'ses contacts supportent le courant du moteur',
      dessin: (x, y) => `
        <line x1="${x-34}" y1="${y}" x2="${x+34}" y2="${y}" stroke="${C.orange}" stroke-width="11" stroke-linecap="round"/>
        <line x1="${x-34}" y1="${y-16}" x2="${x+34}" y2="${y-16}" stroke="${C.orange}" stroke-width="11" stroke-linecap="round"/>
        <line x1="${x-34}" y1="${y+16}" x2="${x+34}" y2="${y+16}" stroke="${C.orange}" stroke-width="11" stroke-linecap="round"/>
        <text x="${x}" y="${y+44}" text-anchor="middle" font-size="12" fill="${C.gris}">trois gros fils</text>` },
    { id: 'distance', libelle: 'Être commandé à distance', aide: 'une bobine l’actionne, pas une main',
      dessin: (x, y) => `
        <rect x="${x-24}" y="${y-14}" width="48" height="28" rx="3" fill="none" stroke="${C.navy}" stroke-width="5"/>
        <line x1="${x}" y1="${y-30}" x2="${x}" y2="${y-14}" stroke="${C.navy}" stroke-width="4"/>
        <line x1="${x}" y1="${y+14}" x2="${x}" y2="${y+30}" stroke="${C.navy}" stroke-width="4"/>
        <text x="${x}" y="${y+48}" text-anchor="middle" font-size="12" fill="${C.gris}">une bobine</text>` },
    { id: 'maintien', libelle: 'Garder sa position', aide: 'il reste où on l’a mis, tout seul',
      dessin: (x, y) => `
        <path d="M${x-26} ${y+8} L${x-26} ${y-6} A 26 26 0 0 1 ${x+26} ${y-6} L${x+26} ${y+8}"
              fill="none" stroke="${C.vert}" stroke-width="6" stroke-linecap="round"/>
        <rect x="${x-20}" y="${y+8}" width="40" height="24" rx="4" fill="${C.vert}"/>
        <text x="${x}" y="${y+52}" text-anchor="middle" font-size="12" fill="${C.gris}">ça reste fermé</text>` }
  ];

  function pictoTrois(defs) {
    const cols = defs || COLONNES;
    const d = svg('0 0 640 200', 'Les trois questions que l’on pose à un appareil de commande.');
    const pas = 640 / cols.length;
    d.innerHTML = `<rect x="6" y="6" width="628" height="188" rx="14" fill="${C.papier}" stroke="${C.trait}"/>` +
      cols.map((c, i) => {
        const x = pas * (i + .5);
        return `<g id="pic-${c.id}" opacity=".38">${c.dessin(x, 92)}
          <text x="${x}" y="176" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">${c.libelle}</text></g>`;
      }).join('');
    return {
      element: d,
      marquer(rep) {
        cols.forEach(c => {
          const g = d.querySelector('#pic-' + c.id);
          if (!g) return;
          g.setAttribute('opacity', rep[c.id] ? '1' : '.22');
          if (!rep[c.id]) {
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('x', pas * (cols.indexOf(c) + .5)); t.setAttribute('y', '52');
            t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '26');
            t.setAttribute('fill', C.rouge); t.textContent = 'non';
            g.appendChild(t);
          }
        });
      }
    };
  }

  /* ============================================================ 5.1 — repos et travail
     Les deux contacts, à l'échelle des vrais fichiers, et ce qu'ils font quand
     on les actionne. Le point que personne ne retient : « au repos » est un
     état du DESSIN, pas de l'installation. */
  function contactReposTravail() {
    const d = svg('0 0 760 400', 'Un contact normalement ouvert et un contact normalement fermé, au repos puis actionnés.');

    /* Géométrie con_simple.svg / con_simple_nf.svg, ×3, centrée en (cx, 210).
       Le NO penche à gauche, le NF à droite : c'est la convention des fichiers sources. */
    const fixe = cx => `<line x1="${cx}" y1="150" x2="${cx}" y2="180" stroke="${C.navy}" stroke-width="4"/>`;

    const peindre = (actionne) => {
      d.innerHTML = `
<rect x="8" y="8" width="744" height="384" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${actionne ? 'On appuie' : 'Au repos — personne n’appuie'}</text>

<text x="200" y="88" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Normalement ouvert</text>
<text x="200" y="110" text-anchor="middle" font-size="13" fill="${C.gris}">repères 13 · 14</text>
${fixe(200)}${contact(200, 180, 240, -1, actionne, C.navy)}
<text x="200" y="330" text-anchor="middle" font-size="16" font-weight="700"
      fill="${actionne ? C.vert : C.rouge}">${actionne ? 'fermé — ça passe' : 'ouvert — ça ne passe pas'}</text>

<line x1="380" y1="80" x2="380" y2="340" stroke="${C.trait}" stroke-width="2" stroke-dasharray="6 6"/>

<text x="560" y="88" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Normalement fermé</text>
<text x="560" y="110" text-anchor="middle" font-size="13" fill="${C.gris}">repères 21 · 22</text>
${fixe(560)}${contact(560, 180, 240, 1, !actionne, C.navy)}
<text x="560" y="330" text-anchor="middle" font-size="16" font-weight="700"
      fill="${actionne ? C.rouge : C.vert}">${actionne ? 'ouvert — ça ne passe pas' : 'fermé — ça passe'}</text>

<text x="380" y="372" text-anchor="middle" font-size="13" fill="${C.gris}">Sur un plan, un contact est toujours dessiné au repos. Ce n’est pas forcément l’état où vous le trouverez.</text>`;
    };
    peindre(false);

    return bloc(d, [
      { id: 'repos', libelle: 'Au repos', legende: 'Personne n’appuie, aucune bobine n’est alimentée. C’est l’état dans lequel le plan est dessiné.', appliquer: () => peindre(false) },
      { id: 'actionne', libelle: 'On appuie', legende: 'Les deux basculent en même temps. Le NO se ferme, le NF s’ouvre.', appliquer: () => peindre(true) }
    ], 'repos', 'Personne n’appuie, aucune bobine n’est alimentée. C’est l’état dans lequel le plan est dessiné.');
  }

  /* ============================================================ 5.2 — la coupe du contacteur
     Ce que montre la vue éclatée du LC1-D, redessiné en coupe pour qu'on voie
     le mouvement : bobine, circuit magnétique, armature, ressort, contacts. */
  function coupeContacteur() {
    const d = svg('0 0 760 460', 'Coupe d’un contacteur : bobine, circuit magnétique, armature mobile, ressort de rappel et contacts.');

    /* Ce qui bouge : l'armature, le porte-contacts et les plots mobiles (en haut), tous ensemble.
       Ce qui ne bouge pas : les plots fixes (en bas) et le circuit magnétique. L'armature descend de
       38 quand la bobine l'attire : elle touche alors le circuit magnétique (l'entrefer disparaît)
       et chaque plot mobile vient s'appuyer sur son plot fixe (l'écart de 38 disparaît aussi). */
    const peindre = (alimente) => {
      const dy = alimente ? 38 : 0;
      const spires = alimente ? C.orange : C.gris;
      /* ressort : il se comprime entre le porte-contacts et le socle */
      const hautRessort = 262 + dy, basRessort = 338;
      const pasRessort = (basRessort - 10 - (hautRessort + 10)) / 5;
      const zigzag = Array.from({length: 6}, (_, i) =>
        `L${i % 2 ? 196 : 144} ${(hautRessort + 10 + i * pasRessort).toFixed(1)}`).join(' ');
      d.innerHTML = `
<rect x="8" y="8" width="744" height="444" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${alimente ? 'Bobine alimentée — tout se ferme d’un coup' : 'Bobine au repos — le ressort tient tout ouvert'}</text>

<!-- chambre de coupure -->
<rect x="120" y="70" width="520" height="34" rx="5" fill="none" stroke="${C.trait}" stroke-width="2"/>
<text x="380" y="93" text-anchor="middle" font-size="12" fill="${C.gris}">boîtier d’arc — il découpe et refroidit l’étincelle</text>

<!-- trois contacts de puissance : plot mobile en haut (il descend), plot fixe en bas -->
${[210, 310, 410].map((x, i) => `
<line x1="${x}" y1="110" x2="${x}" y2="${140 + dy}" stroke="${C.navy}" stroke-width="5"/>
<rect x="${x - 16}" y="${140 + dy}" width="32" height="10" fill="${C.navy}"/>
<path d="M${x + 16} ${145 + dy} H${x + 26} V${256 + dy}" fill="none" stroke="${C.navy}" stroke-width="3"/>
<rect x="${x - 16}" y="188" width="32" height="10" fill="${C.navy}"/>
<line x1="${x}" y1="198" x2="${x}" y2="226" stroke="${C.navy}" stroke-width="5"/>
<text x="${x}" y="248" text-anchor="middle" font-size="11" fill="${C.gris}">${['1/2','3/4','5/6'][i]}</text>`).join('')}
<text x="140" y="170" font-size="12" fill="${C.gris}">puissance</text>

<!-- un contact auxiliaire, plus petit, sur le même axe -->
<line x1="530" y1="110" x2="530" y2="${146 + dy}" stroke="${C.navy}" stroke-width="3"/>
<rect x="${530 - 10}" y="${146 + dy}" width="20" height="7" fill="${C.bleu}"/>
<path d="M${530 + 10} ${150 + dy} H${530 + 18} V${256 + dy}" fill="none" stroke="${C.navy}" stroke-width="2"/>
<rect x="${530 - 10}" y="191" width="20" height="7" fill="${C.bleu}"/>
<line x1="530" y1="198" x2="530" y2="226" stroke="${C.navy}" stroke-width="3"/>
<text x="530" y="248" text-anchor="middle" font-size="11" fill="${C.gris}">13/14</text>
<text x="576" y="170" font-size="12" fill="${C.gris}">auxiliaire</text>

<!-- porte-contacts : la barre qui les tient tous -->
<rect x="180" y="${256 + dy}" width="380" height="18" rx="4" fill="${C.navy}"/>
<text x="640" y="${269 + dy}" font-size="12" fill="${C.navy}">porte-contacts</text>
<text x="640" y="${285 + dy}" font-size="11" fill="${C.gris}">ils bougent</text>
<text x="640" y="${299 + dy}" font-size="11" fill="${C.gris}">tous ensemble</text>

<!-- armature mobile -->
<rect x="250" y="${284 + dy}" width="240" height="26" rx="3" fill="#c9d6e6" stroke="${C.navy}" stroke-width="3"/>
<text x="370" y="${302 + dy}" text-anchor="middle" font-size="12" fill="${C.navy}">armature mobile</text>

<!-- ressort de rappel -->
<path d="M170 ${hautRessort} ${zigzag} L170 ${basRessort}"
      fill="none" stroke="${C.orange}" stroke-width="4"/>
<text x="86" y="${310}" font-size="12" fill="${C.orange}">ressort</text>
<text x="86" y="${326}" font-size="12" fill="${C.orange}">de rappel</text>

<!-- entrefer -->
${alimente ? '' : `<line x1="250" y1="342" x2="490" y2="342" stroke="${C.rouge}" stroke-width="2" stroke-dasharray="5 5"/>
<text x="500" y="346" font-size="12" fill="${C.rouge}">entrefer</text>`}

<!-- bobine et circuit magnétique fixe -->
<rect x="250" y="348" width="240" height="26" rx="3" fill="#c9d6e6" stroke="${C.navy}" stroke-width="3"/>
<text x="370" y="366" text-anchor="middle" font-size="12" fill="${C.navy}">circuit magnétique fixe</text>
<rect x="286" y="380" width="168" height="42" rx="4" fill="none" stroke="${spires}" stroke-width="5"/>
<text x="370" y="406" text-anchor="middle" font-size="13" font-weight="700" fill="${spires}">bobine A1 · A2</text>
<text x="470" y="406" font-size="12" fill="${spires}">${alimente ? 'sous tension' : 'hors tension'}</text>
<text x="380" y="444" text-anchor="middle" font-size="13" fill="${C.gris}">Un courant de commande minuscule fait fermer trois contacts qui portent des dizaines d’ampères.</text>`;
    };
    peindre(false);

    return bloc(d, [
      { id: 'repos', libelle: 'Bobine au repos', legende: 'Rien n’est alimenté. Le ressort maintient l’armature écartée et tous les contacts ouverts : chaque plot mobile est loin de son plot fixe.', appliquer: () => peindre(false) },
      { id: 'colle', libelle: 'Bobine alimentée', legende: 'La bobine attire l’armature, qui écrase le ressort. Les contacts se ferment ensemble : chaque plot mobile vient toucher son plot fixe, tous sont sur la même barre.', appliquer: () => peindre(true) }
    ], 'repos', 'Rien n’est alimenté. Le ressort maintient l’armature écartée et tous les contacts ouverts : chaque plot mobile est loin de son plot fixe.');
  }

  /* ============================================================ 5.3 — l'auto-maintien
     La scène la plus importante de la ligne. Trois temps : on appuie, ça colle,
     on relâche et ça TIENT. Sans elle, personne ne comprend un schéma de commande. */
  function autoMaintien() {
    const d = svg('0 0 700 480', 'Le circuit d’auto-maintien : le contacteur se tient lui-même après qu’on a relâché le bouton.');

    /* trois temps : 0 = repos · 1 = doigt sur S1 · 2 = doigt relâché */
    const peindre = (t) => {
      const colle = (t >= 1);                       /* la bobine est-elle alimentée ? */
      const s1 = (t === 1);                         /* le doigt appuie-t-il ? */
      /* convention de la maison : phase alimentée en ROUGE, retour neutre en ORANGE, le reste en gris */
      const actif = C.rouge, retour = C.feu, mort = 'rgba(27,58,99,.22)';
      const fil = colle ? actif : mort;
      const titre = ['Au repos', 'On appuie sur S1', 'On relâche S1 — et ça tient'][t];
      const sous = ['Rien n’est alimenté. Le contact 13-14 est ouvert, S1 est ouvert.',
                    'Le courant passe par S1, la bobine colle. Et le contact 13-14 se ferme en même temps.',
                    'S1 s’est rouvert. Mais le courant passe maintenant par 13-14. La bobine se tient elle-même.'][t];
      d.innerHTML = `
<rect x="8" y="8" width="684" height="464" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="42" text-anchor="middle" font-size="18" font-weight="700" fill="${C.navy}">${titre}</text>

<!-- phase en haut, neutre en bas : convention de la maison ; la protection en tête, toujours dessinée -->
<line x1="100" y1="76" x2="124" y2="76" stroke="${actif}" stroke-width="4"/>
<rect x="124" y="66" width="60" height="20" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<line x1="124" y1="76" x2="184" y2="76" stroke="${C.navy}" stroke-width="3"/>
<line x1="184" y1="76" x2="600" y2="76" stroke="${actif}" stroke-width="4"/>
<text x="154" y="58" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">F1</text>
<text x="86" y="80" text-anchor="end" font-size="14" font-weight="700" fill="${actif}">Ph</text>

<!-- la boucle : deux branches en parallèle -->
<line x1="240" y1="76" x2="240" y2="120" stroke="${fil}" stroke-width="4"/>
<line x1="240" y1="120" x2="470" y2="120" stroke="${fil}" stroke-width="4"/>

<!-- branche gauche : le contact d'auto-maintien 13-14 -->
<line x1="240" y1="120" x2="240" y2="160" stroke="${colle ? actif : mort}" stroke-width="4"/>
${contact(240, 160, 208, -1, colle, colle ? actif : mort)}
<text x="196" y="186" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">KM1</text>
<text x="196" y="204" text-anchor="end" font-size="12" fill="${C.gris}">13 · 14</text>
<text x="262" y="192" font-size="12" fill="${colle ? actif : C.gris}">${colle ? 'fermé' : 'ouvert'}</text>

<!-- branche droite : le bouton de marche S1 -->
<line x1="470" y1="120" x2="470" y2="160" stroke="${s1 ? actif : mort}" stroke-width="4"/>
${contact(470, 160, 208, -1, s1, s1 ? actif : mort)}
<polyline points="440,178 428,178 428,196 440,196" fill="none" stroke="${C.navy}" stroke-width="2"/>
<line x1="428" y1="187" x2="452" y2="187" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="412" y="164" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">S1</text>
<text x="412" y="182" text-anchor="end" font-size="12" fill="${C.gris}">marche</text>
${s1 ? `<text x="492" y="192" font-size="13" font-weight="700" fill="${actif}">le doigt appuie</text>` : ''}

<!-- les deux branches se rejoignent -->
<line x1="240" y1="244" x2="470" y2="244" stroke="${fil}" stroke-width="4"/>
<line x1="350" y1="244" x2="350" y2="282" stroke="${fil}" stroke-width="4"/>

<!-- le bouton d'arrêt S2, en série, normalement fermé : personne n'appuie, il touche -->
${contact(350, 282, 326, 1, true, fil)}
<polyline points="320,304 308,304 308,322 320,322" fill="none" stroke="${C.navy}" stroke-width="2"/>
<line x1="308" y1="313" x2="332" y2="313" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="292" y="290" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">S2</text>
<text x="292" y="308" text-anchor="end" font-size="12" fill="${C.gris}">arrêt</text>
<text x="376" y="318" font-size="12" fill="${C.gris}">fermé au repos</text>

<!-- la bobine -->
<rect x="308" y="362" width="84" height="48" rx="2" fill="none" stroke="${colle ? actif : C.navy}" stroke-width="${colle ? 5 : 4}"/>
<text x="350" y="392" text-anchor="middle" font-size="15" font-weight="700" fill="${colle ? actif : C.navy}">KM1</text>
<text x="404" y="380" font-size="12" fill="${C.gris}">A1</text>
<text x="404" y="404" font-size="12" fill="${C.gris}">A2</text>
<line x1="350" y1="410" x2="350" y2="436" stroke="${colle ? retour : mort}" stroke-width="4"/>

<line x1="100" y1="436" x2="600" y2="436" stroke="${C.feu}" stroke-width="4"/>
<text x="86" y="440" text-anchor="end" font-size="14" font-weight="700" fill="${C.feu}">N</text>

<text x="350" y="464" text-anchor="middle" font-size="13" fill="${C.gris}">${sous}</text>`;
    };
    peindre(0);

    return bloc(d, [
      { id: 't0', libelle: '1 · Au repos', legende: 'Rien ne passe. Le contact 13-14 de KM1 est ouvert, S1 est ouvert. La bobine n’est pas alimentée.', appliquer: () => peindre(0) },
      { id: 't1', libelle: '2 · On appuie', legende: 'Le courant emprunte S1, la bobine colle. Le contact 13-14, qui est monté sur la même armature, se ferme au même instant.', appliquer: () => peindre(1) },
      { id: 't2', libelle: '3 · On relâche', legende: 'S1 s’est rouvert, mais 13-14 est fermé : le courant a maintenant un deuxième chemin. La bobine s’alimente à travers son propre contact. C’est l’auto-maintien.', appliquer: () => peindre(2) }
    ], 't0', 'Rien ne passe. Le contact 13-14 de KM1 est ouvert, S1 est ouvert. La bobine n’est pas alimentée.');
  }

  /* ============================================================ 5.4 — relais ou contacteur
     La même mécanique, deux tailles, deux métiers. */
  function relaisEtContacteur() {
    const d = svg('0 0 760 340', 'Un relais et un contacteur côte à côte : même principe, contacts de tailles très différentes.');
    d.innerHTML = `
<rect x="8" y="8" width="744" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Même principe. Ce qui change, c’est la taille des contacts.</text>

<line x1="380" y1="66" x2="380" y2="292" stroke="${C.trait}" stroke-width="2" stroke-dasharray="6 6"/>

<text x="190" y="92" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Le relais</text>
<rect x="140" y="106" width="100" height="40" rx="3" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="190" y="132" text-anchor="middle" font-size="13" fill="${C.navy}">bobine</text>
${[130, 190, 250].map(x => `
<line x1="${x}" y1="170" x2="${x}" y2="196" stroke="${C.bleu}" stroke-width="3"/>
<line x1="${x}" y1="222" x2="${x}" y2="248" stroke="${C.bleu}" stroke-width="3"/>
<rect x="${x - 9}" y="196" width="18" height="6" fill="${C.bleu}"/>
<rect x="${x - 9}" y="216" width="18" height="6" fill="${C.bleu}"/>`).join('')}
<text x="190" y="272" text-anchor="middle" font-size="13" fill="${C.gris}">des contacts fins</text>
<text x="190" y="292" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">quelques ampères — commande seulement</text>

<text x="570" y="92" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Le contacteur</text>
<rect x="520" y="106" width="100" height="40" rx="3" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="570" y="132" text-anchor="middle" font-size="13" fill="${C.navy}">bobine</text>
${[500, 570, 640].map(x => `
<line x1="${x}" y1="170" x2="${x}" y2="192" stroke="${C.orange}" stroke-width="7"/>
<line x1="${x}" y1="226" x2="${x}" y2="248" stroke="${C.orange}" stroke-width="7"/>
<rect x="${x - 15}" y="192" width="30" height="9" fill="${C.orange}"/>
<rect x="${x - 15}" y="217" width="30" height="9" fill="${C.orange}"/>`).join('')}
<text x="570" y="272" text-anchor="middle" font-size="13" fill="${C.gris}">des contacts épais, dans un boîtier d’arc</text>
<text x="570" y="292" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">des dizaines d’ampères — puissance</text>

<text x="380" y="320" text-anchor="middle" font-size="13" fill="${C.gris}">Brancher un moteur sur un relais, c’est souder ses contacts au premier démarrage.</text>`;
    return bloc(d, [], null,
      'Le relais commande. Le contacteur porte. On ne remplace jamais l’un par l’autre sous prétexte que le symbole se ressemble.');
  }

  /* ============================================================ 5.5 / 5.6 — le chronogramme
     Ce que « temporisé au travail » et « temporisé au repos » veulent dire,
     lu sur le temps et non sur la forme du dessin. */
  function chronogramme(mode) {
    const travail = (mode !== 'repos');
    const d = svg('0 0 760 320',
      travail ? 'Chronogramme d’un contact temporisé au travail : il ferme après un délai.'
              : 'Chronogramme d’un contact temporisé au repos : il rouvre après un délai.');
    const t0 = 150, t1 = 330, t2 = 470, t3 = 650;   /* instants sur l'axe */
    const bascule = travail ? t1 : t0;
    const retour  = travail ? t2 : t3;
    d.innerHTML = `
<rect x="8" y="8" width="744" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${travail ? 'Contact NO temporisé au travail — il attend avant de fermer' : 'Contact NO temporisé au repos — il attend avant de rouvrir'}</text>

<text x="120" y="96" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">bobine</text>
<polyline points="130,120 ${t0},120 ${t0},80 ${t2},80 ${t2},120 730,120"
          fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="${(t0 + t2) / 2}" y="72" text-anchor="middle" font-size="12" fill="${C.gris}">alimentée</text>

<text x="120" y="216" text-anchor="end" font-size="14" font-weight="700" fill="${C.orange}">contact</text>
<polyline points="130,240 ${bascule},240 ${bascule},200 ${retour},200 ${retour},240 730,240"
          fill="none" stroke="${C.orange}" stroke-width="4"/>
<text x="${(bascule + retour) / 2}" y="192" text-anchor="middle" font-size="12" fill="${C.gris}">fermé</text>

<line x1="${travail ? t0 : t2}" y1="120" x2="${travail ? t0 : t2}" y2="248" stroke="${C.trait}" stroke-width="2" stroke-dasharray="4 4"/>
<line x1="${travail ? t1 : t3}" y1="200" x2="${travail ? t1 : t3}" y2="248" stroke="${C.trait}" stroke-width="2" stroke-dasharray="4 4"/>
<line x1="${travail ? t0 : t2}" y1="272" x2="${travail ? t1 : t3}" y2="272" stroke="${C.rouge}" stroke-width="4"/>
<text x="${travail ? (t0 + t1) / 2 : (t2 + t3) / 2}" y="292" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">le délai réglé</text>

<line x1="130" y1="252" x2="730" y2="252" stroke="${C.navy}" stroke-width="2"/>
<text x="730" y="270" text-anchor="end" font-size="12" fill="${C.gris}">le temps →</text>`;
    /* le temps qui passe : un curseur balaie le chronogramme, deux points suivent la bobine et le
       contact et s'allument quand ils sont actifs — on VOIT le contact attendre, puis basculer.
       Le curseur passe hors des lignes de texte ; il ne sort pas à l'impression. Pas de condition
       « animations réduites » : ce mouvement porte le contenu (règle du réseau). */
    const NS = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'curseur-temps');
    const st = document.createElementNS(NS, 'style'); st.textContent = '@media print{.curseur-temps{display:none}}';
    const trait = (y1, y2) => { const l = document.createElementNS(NS, 'line'); l.setAttribute('y1', y1); l.setAttribute('y2', y2); l.setAttribute('stroke', C.navy); l.setAttribute('stroke-width', '2'); l.setAttribute('opacity', '.55'); g.appendChild(l); return l; };
    const point = () => { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', '8'); c.setAttribute('stroke', '#fffdf8'); c.setAttribute('stroke-width', '2'); g.appendChild(c); return c; };
    const l1 = trait(78, 124), l2 = trait(196, 248), pb = point(), pc = point();
    d.append(st, g);
    const debut = performance.now();
    const image = (now) => {
      if (!d.isConnected && now - debut > 2000) return;
      const u = ((now - debut) / 9000) % 1, x = 130 + 600 * u;
      const bob = x >= t0 && x < t2, con = x >= bascule && x < retour;
      [l1, l2].forEach(l => { l.setAttribute('x1', x); l.setAttribute('x2', x); });
      pb.setAttribute('cx', x); pb.setAttribute('cy', bob ? 80 : 120); pb.setAttribute('fill', bob ? C.navy : '#9aa6b5');
      pc.setAttribute('cx', x); pc.setAttribute('cy', con ? 200 : 240); pc.setAttribute('fill', con ? C.orange : '#9aa6b5');
      requestAnimationFrame(image);
    };
    requestAnimationFrame(image);
    return d;
  }

  function deuxTemporisations() {
    const hote = document.createElement('div');
    const zone = document.createElement('div');
    zone.appendChild(chronogramme('travail'));
    hote.appendChild(zone);
    return bloc(hote, [
      { id: 'trav', libelle: 'Temporisé au travail', legende: 'La bobine est alimentée : le contact attend le délai réglé, puis ferme. Il rouvre tout de suite à la coupure.', appliquer: () => { zone.innerHTML = ''; zone.appendChild(chronogramme('travail')); } },
      { id: 'rep', libelle: 'Temporisé au repos', legende: 'Le contact ferme tout de suite. C’est à la coupure qu’il attend le délai réglé avant de rouvrir.', appliquer: () => { zone.innerHTML = ''; zone.appendChild(chronogramme('repos')); } }
    ], 'trav', 'La bobine est alimentée : le contact attend le délai réglé, puis ferme. Il rouvre tout de suite à la coupure.');
  }

  /* ============================================================ 5.7 — les trois étages
     Un appareil de commande n'est pas un bloc : c'est une tête, un corps, et
     des blocs de contacts que l'on empile. */
  function troisEtages() {
    const d = svg('0 0 700 400', 'Un appareil de commande se monte en trois étages : la tête, le corps, les blocs de contacts.');
    d.innerHTML = `
<rect x="8" y="8" width="684" height="384" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Ce n’est pas un bloc : ça se monte</text>

<ellipse cx="250" cy="96" rx="62" ry="24" fill="#2e8b57" stroke="${C.navy}" stroke-width="3"/>
<text x="250" y="102" text-anchor="middle" font-size="14" font-weight="700" fill="#fffdf8">la tête</text>
<text x="360" y="90" font-size="13" font-weight="700" fill="${C.navy}">Ce que le doigt touche.</text>
<text x="360" y="110" font-size="12" fill="${C.gris}">Sa couleur et sa forme disent ce qu’elle fait.</text>

<rect x="196" y="132" width="108" height="56" rx="4" fill="#c9d6e6" stroke="${C.navy}" stroke-width="3"/>
<text x="250" y="166" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">le corps</text>
<text x="360" y="152" font-size="13" font-weight="700" fill="${C.navy}">Ce qui traverse la tôle.</text>
<text x="360" y="172" font-size="12" fill="${C.gris}">C’est lui qui se fixe sur la porte de l’armoire.</text>

${[[210, 'NO', C.vert], [268, 'NF', C.rouge]].map(([x, t, c]) => `
<rect x="${x - 26}" y="212" width="52" height="64" rx="4" fill="none" stroke="${c}" stroke-width="3"/>
<text x="${x}" y="250" text-anchor="middle" font-size="14" font-weight="700" fill="${c}">${t}</text>`).join('')}
<text x="360" y="232" font-size="13" font-weight="700" fill="${C.navy}">Les blocs de contacts.</text>
<text x="360" y="252" font-size="12" fill="${C.gris}">On en clipse autant qu’il en faut, NO ou NF.</text>
<text x="360" y="272" font-size="12" fill="${C.gris}">C’est là que se fait le vrai travail électrique.</text>

<line x1="250" y1="120" x2="250" y2="132" stroke="${C.navy}" stroke-width="2" stroke-dasharray="4 3"/>
<line x1="250" y1="188" x2="250" y2="212" stroke="${C.navy}" stroke-width="2" stroke-dasharray="4 3"/>

<text x="350" y="322" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">La couleur de la tête ne change rien au bloc qui est derrière.</text>
<text x="350" y="346" text-anchor="middle" font-size="13" fill="${C.gris}">Un bouton vert peut très bien porter un contact NF. C’est le montage qui décide, pas la couleur.</text>
<text x="350" y="374" text-anchor="middle" font-size="13" fill="${C.gris}">Alors on lit le repère écrit sur le bloc — 13-14 ou 21-22 — et jamais la couleur du capuchon.</text>`;
    return bloc(d, [], null,
      'La tête, le corps, les blocs. Trois pièces qui se commandent séparément, et qui se remplacent séparément.');
  }

  /* ============================================================ 5.8 — la chaîne de sécurité
     Pourquoi les sécurités sont en NF, et ce qui se passe quand un fil casse. */
  function chaineSecurite() {
    /* En colonne, comme un folio : phase en haut (avec sa protection F1), les trois contacts normalement
       fermés en série, la bobine KM1, le neutre en bas. Phase alimentée en rouge, retour neutre en orange,
       ce qui n'est plus alimenté en gris : on voit d'un coup d'œil où le rouge s'arrête. */
    const d = svg('0 0 760 580', 'La chaîne de sécurité, dessinée en colonne : un bouton d’arrêt, un arrêt d’urgence et une fin de course, tous normalement fermés, en série entre la phase et la bobine.');
    const X = 380, MORT = 'rgba(27,58,99,.22)';
    const CT = [
      { id: 'S2', nom: 'bouton d’arrêt', rep: 'NF · 11-12', yh: 132 },
      { id: 'S0', nom: 'arrêt d’urgence', rep: 'NF · 11-12', yh: 246 },
      { id: 'S3', nom: 'fin de course', rep: 'NF · 21-22', yh: 360 }
    ];
    const H = 40;                                   /* hauteur pivot de chaque contact : yb = yh + H */

    const peindre = (cas) => {
      /* cas : 'ok' · 'au' (on frappe l'arrêt d'urgence) · 'fil' (un fil casse sous le deuxième contact)
         limite = dernier élément encore alimenté, dans l'ordre :
         0 fil du haut · 1 S2 · 2 fil · 3 S0 · 4 fil (goulotte) · 5 S3 · 6 fil · 7 bobine · 8 retour */
      const limite = cas === 'au' ? 3 : cas === 'fil' ? 4 : 8;
      const vif = i => i <= limite;
      const rouge = i => vif(i) ? C.rouge : MORT;
      const titre = { ok: 'Tout est en ordre — la bobine est alimentée',
                      au: 'Quelqu’un frappe l’arrêt d’urgence',
                      fil: 'Un fil se casse dans la goulotte' }[cas];
      const sous = { ok: 'Les trois contacts sont fermés. Le courant traverse toute la chaîne et atteint la bobine.',
                     au: 'Le champignon s’enfonce et reste enfoncé. Son contact s’ouvre, la chaîne est coupée, la machine s’arrête.',
                     fil: 'Personne n’a rien demandé. Mais la chaîne est coupée quand même, et la machine s’arrête. C’est exactement ce que l’on veut.' }[cas];
      const ouvert = cas === 'au' ? 1 : -1;          /* indice du contact ouvert */

      const bas = c => c.yh + H + 36;                /* bas d'un contact */
      const tetes = [
        /* S2 : tête de poussoir, carré ouvert vers le contact (poussoir.svg) */
        c => `<polyline points="${X - 34},${c.yh + 14} ${X - 46},${c.yh + 14} ${X - 46},${c.yh + 34} ${X - 34},${c.yh + 34}" fill="none" stroke="${C.navy}" stroke-width="2.5"/>
              <line x1="${X - 46}" y1="${c.yh + 24}" x2="${X - 6}" y2="${c.yh + 24}" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="6 4"/>`,
        /* S0 : champignon (au.svg), enfoncé quand on le frappe */
        c => { const dx = cas === 'au' ? 10 : 0;
          return `<path d="M${X - 36 + dx} ${c.yh + 6} A 22 26 0 0 0 ${X - 36 + dx} ${c.yh + 50}" fill="${C.rouge}" stroke="${C.navy}" stroke-width="2"/>
              <line x1="${X - 36 + dx}" y1="${c.yh + 6}" x2="${X - 36 + dx}" y2="${c.yh + 50}" stroke="${C.navy}" stroke-width="2"/>
              <line x1="${X - 36 + dx}" y1="${c.yh + 28}" x2="${X - 6}" y2="${c.yh + 28}" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="6 4"/>`; },
        /* S3 : galet (fin_de_course_came_no.svg) */
        c => `<circle cx="${X - 46}" cy="${c.yh + 28}" r="11" fill="none" stroke="${C.navy}" stroke-width="2"/>
              <line x1="${X - 35}" y1="${c.yh + 28}" x2="${X - 6}" y2="${c.yh + 28}" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="6 4"/>`
      ];

      let s = `
<rect x="8" y="8" width="744" height="564" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="42" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${titre}</text>

<!-- phase en haut avec sa protection en tête, neutre en bas -->
<line x1="90" y1="86" x2="118" y2="86" stroke="${C.rouge}" stroke-width="5"/>
<rect x="118" y="76" width="60" height="20" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<line x1="118" y1="86" x2="178" y2="86" stroke="${C.navy}" stroke-width="3"/>
<line x1="178" y1="86" x2="${X}" y2="86" stroke="${C.rouge}" stroke-width="5"/>
<text x="148" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">F1</text>
<text x="76" y="91" text-anchor="end" font-size="14" font-weight="700" fill="${C.rouge}">Ph</text>
<line x1="${X}" y1="86" x2="${X}" y2="${CT[0].yh + 3}" stroke="${rouge(0)}" stroke-width="5"/>`;

      CT.forEach((c, k) => {
        const idx = 1 + 2 * k;                        /* 1, 3, 5 */
        const ferme = ouvert !== k;
        s += `
${contact(X, c.yh, c.yh + H, 1, ferme, ouvert === k ? MORT : rouge(idx), 5)}
${tetes[k](c)}
<text x="${X + 66}" y="${c.yh + 26}" font-size="14" font-weight="700" fill="${C.navy}">${c.id} · ${c.nom}</text>
<text x="${X + 66}" y="${c.yh + 46}" font-size="12" fill="${C.gris}">${c.rep}${ouvert === k ? ' · ouvert' : ''}</text>`;
        /* le fil qui descend vers l'élément suivant */
        const y0 = bas(c), y1 = (k < 2 ? CT[k + 1].yh + 3 : 452);
        if (k === 1 && cas === 'fil') {
          const ym = Math.round((y0 + y1) / 2);
          s += `
<line x1="${X}" y1="${y0}" x2="${X}" y2="${ym - 14}" stroke="${C.rouge}" stroke-width="5"/>
<line x1="${X}" y1="${ym + 14}" x2="${X}" y2="${y1}" stroke="${MORT}" stroke-width="5"/>
<line x1="${X - 12}" y1="${ym - 10}" x2="${X + 12}" y2="${ym - 2}" stroke="${C.navy}" stroke-width="3"/>
<line x1="${X - 12}" y1="${ym + 2}" x2="${X + 12}" y2="${ym + 10}" stroke="${C.navy}" stroke-width="3"/>
<text x="${X + 66}" y="${ym + 5}" font-size="14" font-weight="700" fill="${C.navy}">fil coupé</text>`;
        } else {
          s += `
<line x1="${X}" y1="${y0}" x2="${X}" y2="${y1}" stroke="${rouge(idx + 1)}" stroke-width="5"/>`;
        }
      });

      s += `
<!-- la bobine, au bout : là où le rouge devient orange -->
<rect x="${X - 42}" y="452" width="84" height="48" rx="2" fill="none"
      stroke="${vif(7) ? C.rouge : C.navy}" stroke-width="${vif(7) ? 5 : 4}"/>
<text x="${X}" y="482" text-anchor="middle" font-size="15" font-weight="700" fill="${vif(7) ? C.rouge : C.navy}">KM1</text>
<text x="${X + 52}" y="466" font-size="12" fill="${C.gris}">A1</text>
<text x="${X + 52}" y="494" font-size="12" fill="${C.gris}">A2</text>
<line x1="${X}" y1="500" x2="${X}" y2="526" stroke="${vif(8) ? C.feu : MORT}" stroke-width="5"/>
<line x1="90" y1="526" x2="${X + 250}" y2="526" stroke="${C.feu}" stroke-width="5"/>
<text x="76" y="531" text-anchor="end" font-size="14" font-weight="700" fill="${C.feu}">N</text>

<text x="380" y="558" text-anchor="middle" font-size="13" fill="${C.gris}">${sous}</text>`;
      d.innerHTML = s;
    };
    peindre('ok');

    return bloc(d, [
      { id: 'ok', libelle: 'Tout va bien', legende: 'Les trois contacts sont fermés. Le courant traverse la chaîne et la bobine est alimentée.', appliquer: () => peindre('ok') },
      { id: 'au', libelle: 'On frappe l’arrêt d’urgence', legende: 'Le contact NF s’ouvre. La chaîne est coupée, la bobine retombe, la machine s’arrête.', appliquer: () => peindre('au') },
      { id: 'fil', libelle: 'Un fil casse', legende: 'Personne n’a rien demandé — et pourtant la machine s’arrête. C’est là tout l’intérêt du NF : la panne tombe du bon côté.', appliquer: () => peindre('fil') }
    ], 'ok', 'Les trois contacts sont fermés. Le courant traverse la chaîne et la bobine est alimentée.');
  }

  /* ============================================================ 5.9 — les deux schémas
     Le même appareil, dessiné à deux endroits. Ce que la ligne 8 avait annoncé. */
  function deuxSchemas() {
    /* Le départ moteur complet, comme dans un dossier : à gauche la puissance (Q1 sectionneur, F1 fusibles,
       KM1 contacts, M1), à droite la commande (F2, un arrêt d'urgence S0, la marche S1 avec son auto-maintien
       KM1 13-14, l'arrêt S2, la bobine KM1). Phase alimentée en rouge, retour neutre en orange, hors tension
       en gris. Les trois conducteurs vont aux trois bornes du moteur. */
    const d = svg('0 0 780 610', 'Le schéma de puissance et le schéma de commande d’un démarrage direct, côte à côte : Q1, F1, les contacts de KM1 et le moteur à gauche ; F2, S0, S1 avec 13-14, S2 et la bobine KM1 à droite.');
    const MORT = 'rgba(27,58,99,.25)';

    const peindre = (marche) => {
      const vive = marche ? C.rouge : MORT;           /* ce qui n'est alimenté qu'en marche */
      const XS = [140, 196, 252];

      /* ---------------- puissance ---------------- */
      let s = `
<rect x="8" y="8" width="764" height="594" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="390" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Un seul appareil, dessiné sur deux pages</text>

<text x="196" y="68" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Puissance</text>
<text x="196" y="86" text-anchor="middle" font-size="12" fill="${C.gris}">trois fils, le courant du moteur</text>`;

      XS.forEach((x, i) => {
        s += `
<text x="${x}" y="108" text-anchor="middle" font-size="11" fill="${C.gris}">${['L1', 'L2', 'L3'][i]}</text>
<line x1="${x}" y1="114" x2="${x}" y2="134" stroke="${C.rouge}" stroke-width="4"/>
${contact(x, 134, 174, -1, true, C.rouge, 4)}
<line x1="${x - 6}" y1="134" x2="${x + 6}" y2="134" stroke="${C.navy}" stroke-width="3"/>
<line x1="${x}" y1="210" x2="${x}" y2="236" stroke="${C.rouge}" stroke-width="4"/>
<rect x="${x - 7}" y="236" width="14" height="42" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<line x1="${x}" y1="236" x2="${x}" y2="278" stroke="${C.navy}" stroke-width="2"/>
<line x1="${x}" y1="278" x2="${x}" y2="326" stroke="${C.rouge}" stroke-width="4"/>
${contact(x, 326, 366, -1, marche, vive, 4)}
<path d="M ${x} 318 A 7 7 0 0 0 ${x} 332" fill="none" stroke="${C.navy}" stroke-width="2"/>
<line x1="${x}" y1="402" x2="${x}" y2="${i === 1 ? 452 : 430}" stroke="${vive}" stroke-width="4"/>`;
      });
      s += `
<line x1="140" y1="154" x2="252" y2="154" stroke="${C.gris}" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="104" y="160" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">Q1</text>
<text x="104" y="176" text-anchor="end" font-size="11" fill="${C.gris}">sectionneur</text>
<text x="104" y="262" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">F1</text>
<text x="104" y="278" text-anchor="end" font-size="11" fill="${C.gris}">protection</text>
<line x1="140" y1="346" x2="252" y2="346" stroke="${marche ? C.bleu : C.gris}" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="104" y="350" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">KM1</text>
<text x="104" y="366" text-anchor="end" font-size="11" fill="${C.gris}">1/2 3/4 5/6</text>

<!-- les trois conducteurs atteignent les trois bornes du moteur -->
<polyline points="140,430 179,457" fill="none" stroke="${vive}" stroke-width="4"/>
<polyline points="252,430 213,457" fill="none" stroke="${vive}" stroke-width="4"/>
<text x="124" y="424" text-anchor="end" font-size="11" fill="${C.gris}">U1</text>
<text x="212" y="424" font-size="11" fill="${C.gris}">V1</text>
<text x="268" y="424" font-size="11" fill="${C.gris}">W1</text>
<circle cx="196" cy="486" r="34" fill="none" stroke="${marche ? C.rouge : C.navy}" stroke-width="4"/>
<text x="196" y="484" text-anchor="middle" font-size="15" font-weight="700" fill="${marche ? C.rouge : C.navy}">M1</text>
<text x="196" y="504" text-anchor="middle" font-size="13" fill="${marche ? C.rouge : C.navy}">3 ~</text>
<text x="196" y="548" text-anchor="middle" font-size="13" font-weight="700"
      fill="${marche ? C.vert : C.gris}">${marche ? 'le moteur tourne' : 'le moteur est à l’arrêt'}</text>`;

      /* ---------------- commande ---------------- */
      s += `
<text x="584" y="68" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Commande</text>
<text x="584" y="86" text-anchor="middle" font-size="12" fill="${C.gris}">deux fils fins, quelques watts</text>

<line x1="470" y1="112" x2="490" y2="112" stroke="${C.rouge}" stroke-width="4"/>
<rect x="490" y="103" width="60" height="18" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<line x1="490" y1="112" x2="550" y2="112" stroke="${C.navy}" stroke-width="2"/>
<line x1="550" y1="112" x2="700" y2="112" stroke="${C.rouge}" stroke-width="4"/>
<text x="458" y="116" text-anchor="end" font-size="13" font-weight="700" fill="${C.rouge}">Ph</text>
<text x="520" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="${C.navy}">F2</text>

<!-- S0 : un arrêt d'urgence, normalement fermé, tout en haut -->
<line x1="584" y1="112" x2="584" y2="143" stroke="${C.rouge}" stroke-width="3"/>
${contact(584, 140, 180, 1, true, C.rouge, 3)}
<path d="M548 146 A 16 20 0 0 0 548 186" fill="${C.rouge}" stroke="${C.navy}" stroke-width="2"/>
<line x1="548" y1="146" x2="548" y2="186" stroke="${C.navy}" stroke-width="2"/>
<line x1="548" y1="166" x2="576" y2="166" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="618" y="164" font-size="13" font-weight="700" fill="${C.navy}">S0</text>
<text x="618" y="180" font-size="11" fill="${C.gris}">arrêt d’urgence</text>
<line x1="584" y1="216" x2="584" y2="248" stroke="${C.rouge}" stroke-width="3"/>

<!-- la marche S1 et son auto-maintien KM1 13-14, en parallèle -->
<line x1="520" y1="248" x2="648" y2="248" stroke="${C.rouge}" stroke-width="3"/>
<line x1="520" y1="248" x2="520" y2="268" stroke="${vive}" stroke-width="3"/>
<line x1="648" y1="248" x2="648" y2="268" stroke="${MORT}" stroke-width="3"/>
${contact(520, 268, 308, -1, marche, vive, 3)}
${contact(648, 268, 308, -1, false, MORT, 3)}
<polyline points="626,284 616,284 616,300 626,300" fill="none" stroke="${C.navy}" stroke-width="2"/>
<line x1="616" y1="292" x2="632" y2="292" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="5 3"/>
<text x="504" y="294" text-anchor="end" font-size="13" font-weight="700" fill="${C.navy}">KM1</text>
<text x="504" y="310" text-anchor="end" font-size="11" fill="${C.gris}">13-14</text>
<text x="676" y="292" font-size="13" font-weight="700" fill="${C.navy}">S1</text>
<text x="676" y="308" font-size="11" fill="${C.gris}">marche</text>
<line x1="520" y1="344" x2="520" y2="364" stroke="${vive}" stroke-width="3"/>
<line x1="648" y1="344" x2="648" y2="364" stroke="${MORT}" stroke-width="3"/>
<line x1="520" y1="364" x2="648" y2="364" stroke="${vive}" stroke-width="3"/>

<!-- l'arrêt S2, normalement fermé, en série -->
<line x1="584" y1="364" x2="584" y2="387" stroke="${vive}" stroke-width="3"/>
${contact(584, 384, 424, 1, true, vive, 3)}
<polyline points="552,398 542,398 542,414 552,414" fill="none" stroke="${C.navy}" stroke-width="2"/>
<line x1="542" y1="406" x2="568" y2="406" stroke="${C.navy}" stroke-width="1.5" stroke-dasharray="5 3"/>
<text x="618" y="408" font-size="13" font-weight="700" fill="${C.navy}">S2</text>
<text x="618" y="424" font-size="11" fill="${C.gris}">arrêt · NF</text>
<line x1="584" y1="460" x2="584" y2="484" stroke="${vive}" stroke-width="3"/>

<!-- la bobine, au bout : là où le rouge devient orange -->
<rect x="552" y="484" width="64" height="36" rx="2" fill="none" stroke="${marche ? C.rouge : C.navy}" stroke-width="${marche ? 4 : 3}"/>
<text x="584" y="507" text-anchor="middle" font-size="14" font-weight="700" fill="${marche ? C.rouge : C.navy}">KM1</text>
<text x="626" y="498" font-size="11" fill="${C.gris}">A1</text>
<text x="626" y="516" font-size="11" fill="${C.gris}">A2</text>
<line x1="584" y1="520" x2="584" y2="548" stroke="${marche ? C.feu : MORT}" stroke-width="3"/>
<line x1="470" y1="548" x2="700" y2="548" stroke="${C.feu}" stroke-width="3"/>
<text x="458" y="552" text-anchor="end" font-size="13" font-weight="700" fill="${C.feu}">N</text>

<!-- le lien mécanique : de la bobine jusqu'aux trois contacts de KM1, qu'il fait bouger ensemble -->
<path d="M552 502 H 430 V 346 H 262" fill="none" stroke="${marche ? C.bleu : C.trait}"
      stroke-width="2.5" stroke-dasharray="7 5"/>
<text x="390" y="578" text-anchor="middle" font-size="13" font-weight="700" fill="${marche ? C.bleu : C.gris}">le même KM1 — la bobine à droite, ses contacts à gauche</text>
<text x="390" y="596" text-anchor="middle" font-size="12" fill="${C.gris}">Le pointillé n’est pas un fil. C’est le lien mécanique, et sur un vrai plan c’est le repère qui le dit.</text>`;
      d.innerHTML = s;
    };
    peindre(false);

    return bloc(d, [
      { id: 'arret', libelle: 'À l’arrêt', legende: 'La bobine n’est pas alimentée. Les trois contacts de puissance sont ouverts : le courant va jusqu’à eux, pas plus. Le moteur ne reçoit rien.', appliquer: () => peindre(false) },
      { id: 'marche', libelle: 'En marche', legende: 'La bobine est alimentée par le circuit de commande. Elle ferme les trois contacts de puissance, et le moteur tourne. Le contact 13-14 tient la bobine : S1 n’est plus pressé. Deux fils fins commandent trois gros fils.', appliquer: () => peindre(true) }
    ], 'arret', 'La bobine n’est pas alimentée. Les trois contacts de puissance sont ouverts : le courant va jusqu’à eux, pas plus. Le moteur ne reçoit rien.');
  }

  /* ============================================================ le tableau de la ligne */
  const LIGNE5 = [
    ['5.1', 'Le contact', false, false, false, 'La brique. Ni puissance, ni commande : une lettre.'],
    ['5.2', 'Le contacteur', true, true, false, 'Le seul à porter la puissance et à obéir à distance.'],
    ['5.3', 'Le contact auxiliaire', false, true, false, 'Il ne porte rien. Il informe, et il fait tenir.'],
    ['5.4', 'Le relais', false, true, false, 'Comme le contacteur, en petit. Commande seulement.'],
    ['5.5', 'Le relais temporisé', false, true, false, 'Un relais qui compte.'],
    ['5.6', 'Les contacts temporisés', false, true, false, 'Les contacts d’un relais qui compte.'],
    ['5.7', 'Bouton-poussoir', false, false, false, 'À impulsion : il ne garde rien.'],
    ['5.7', 'Sélecteur', false, false, true, 'À position maintenue : il garde.'],
    ['5.8', 'Arrêt d’urgence', false, false, true, 'Il reste enfoncé. Il faut aller le déverrouiller.'],
    ['5.8', 'Voyant, fin de course', false, false, false, 'Ils informent la commande, ils ne commandent rien.']
  ];

  function tableauCommande(idCourant) {
    const t = document.createElement('table');
    t.className = 'tab';
    t.innerHTML = '<thead><tr><th>Appareil</th><th>Porte la puissance</th><th>Commandé à distance</th><th>Garde sa position</th></tr></thead><tbody>' +
      LIGNE5.map(([id, nom, p, dd, m, note]) => {
        const ici = id === idCourant;
        const case_ = v => v ? '<td><strong>oui</strong></td>' : '<td>non</td>';
        return '<tr' + (ici ? ' class="ici"' : '') + '><td><strong>' + id + '</strong> ' + nom +
               '<br><span class="legende">' + note + '</span></td>' +
               case_(p) + case_(dd) + case_(m) + '</tr>';
      }).join('') + '</tbody>';
    return t;
  }

  return { COLONNES, pictoTrois, contactReposTravail, coupeContacteur, autoMaintien,
           relaisEtContacteur, chronogramme, deuxTemporisations, troisEtages,
           chaineSecurite, deuxSchemas, tableauCommande };
})();
