/* ÉlectroRézo — l'alphabet du schéma, tracé d'après les symboles RÉELS.
   Ligne 8 : chaque symbole normalisé est un mot, composé de lettres.

   ⚠️ GÉOMÉTRIE RELEVÉE, PAS INVENTÉE. Chaque lettre ci-dessous reprend le tracé exact
   du symbole correspondant dans C:\git\bibliotheque-symboles-energie (converti depuis
   QElectroTech), à l'échelle ×3 pour la lisibilité à l'écran. Le fichier source est cité
   dans chaque entrée. Ce qui a été corrigé le 28/08 après relecture des sources :

     · le contact s'ouvre vers la GAUCHE, pivot en bas — polyline "-5,-10 0,10 0,20"
     · la barre du sectionnement est un TRAIT HORIZONTAL COURT sur la borne fixe,
       et non une barre oblique — line "-8,-10 → -12,-10"
     · le déclencheur thermique est un CROCHET RECTANGULAIRE accolé à la ligne,
       et non une courbe — polyline "0,10 5,10 5,4 0,4"
     · le fusible est un rectangle étroit 6 × 20 traversé par le conducteur

   Chaque lettre est posée dans un <g data-signe="..."> : on peut donc, dans un symbole
   composé, cliquer dessus et la reconnaître. C'est tout l'exercice de la ligne. */

const Signes = (() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', orange:'#c9451a', vert:'#1e7e54',
              rouge:'#c0392b', gris:'#637285', papier:'#fffdf8', creme:'#f7f1e7',
              trait:'rgba(27,58,99,.18)' };
  const E = 3;                       /* échelle : 1 unité QElectroTech = 3 px à l'écran */
  const T = 3.5;                     /* épaisseur de trait, en px */

  const LETTRES = {

    conducteur: {
      nom: 'Le trait', dit: 'un conducteur — un fil',
      source: '114_connections/ · le trait de liaison, présent dans tous les symboles',
      dessin: (x, y) => `<line x1="${x}" y1="${y - 20 * E}" x2="${x}" y2="${y + 20 * E}"
        stroke="${C.navy}" stroke-width="${T}"/>` },

    borne: {
      nom: 'Le point', dit: 'une connexion — les fils se touchent vraiment',
      source: '114_connections/splice.svg',
      dessin: (x, y) => `<circle cx="${x}" cy="${y}" r="${1.6 * E}" fill="${C.navy}"/>` },

    /* act_electromagnetique_no.svg :
         line   0,-20 → 0,-10        la borne du haut
         polyline -5,-10  0,10  0,20 la lame, pivot en bas, ouverte vers la gauche  */
    contact: {
      nom: 'Le trait incliné', dit: 'un contact — il s’ouvre et se ferme',
      source: '310_relays_contactors_contacts/03_contacts/act_electromagnetique_no.svg',
      dessin: (x, y) => `
        <line x1="${x}" y1="${y - 20 * E}" x2="${x}" y2="${y - 10 * E}"
              stroke="${C.navy}" stroke-width="${T}"/>
        <polyline points="${x - 5 * E},${y - 10 * E} ${x},${y + 10 * E} ${x},${y + 20 * E}"
                  fill="none" stroke="${C.orange}" stroke-width="${T}" stroke-linejoin="round"/>
        <circle cx="${x}" cy="${y + 10 * E}" r="${1.2 * E}" fill="${C.navy}"/>` },

    /* sectionneur_general.svg : line -8,-10 → -12,-10
       un trait horizontal court, centré sur la borne fixe. */
    sectionnement: {
      nom: 'La barre courte', dit: 'aptitude au sectionnement — on peut travailler derrière',
      source: '200_fuses_protective_gears/20_disconnecting_switches/sectionneur_general.svg',
      dessin: (x, y) => `
        <line x1="${x - 2.5 * E}" y1="${y - 10 * E}" x2="${x + 2.5 * E}" y2="${y - 10 * E}"
              stroke="${C.vert}" stroke-width="${T + 1}"/>` },

    /* pojistka3p.svg : rect x=7 y=-10 w=6 h=20, traversé par le conducteur. */
    rectangle: {
      nom: 'Le rectangle', dit: 'un fusible — le conducteur le traverse',
      source: '200_fuses_protective_gears/10_fuses/pojistka3p.svg',
      dessin: (x, y) => `
        <line x1="${x}" y1="${y - 20 * E}" x2="${x}" y2="${y + 20 * E}"
              stroke="${C.navy}" stroke-width="${T}"/>
        <rect x="${x - 3 * E}" y="${y - 10 * E}" width="${6 * E}" height="${20 * E}"
              fill="${C.papier}" stroke="${C.navy}" stroke-width="${T}"/>
        <line x1="${x}" y1="${y - 10 * E}" x2="${x}" y2="${y + 10 * E}"
              stroke="${C.navy}" stroke-width="${T}"/>` },

    /* dis_mag_term_2f-1.svg : polyline 0,10  5,10  5,4  0,4
       un crochet RECTANGULAIRE accolé au conducteur — le bilame. */
    thermique: {
      nom: 'Le crochet rectangulaire', dit: 'déclencheur thermique — c’est un bilame',
      source: '200_fuses_protective_gears/12_magneto_thermal_circuit_breakers/dis_mag_term_2f-1.svg',
      dessin: (x, y) => `
        <polyline points="${x},${y + 6 * E} ${x + 5 * E},${y + 6 * E} ${x + 5 * E},${y - 6 * E} ${x},${y - 6 * E}"
                  fill="none" stroke="${C.rouge}" stroke-width="${T}" stroke-linejoin="miter"/>` },

    /* Le déclencheur à maximum de courant se note « I> » sur dis_mag_term_2f-1.svg ;
       la représentation française courante ajoute le demi-cercle de la bobine. */
    magnetique: {
      nom: 'Le demi-cercle', dit: 'déclencheur magnétique — la bobine qui claque',
      source: 'dis_mag_term_2f-1.svg (noté « I> ») · 310_.../01_coils/ pour la bobine',
      dessin: (x, y) => `
        <path d="M${x} ${y + 5 * E} a${5 * E} ${5 * E} 0 0 1 ${10 * E} 0"
              fill="none" stroke="${C.bleu}" stroke-width="${T}"/>
        <line x1="${x}" y1="${y + 5 * E}" x2="${x + 10 * E}" y2="${y + 5 * E}"
              stroke="${C.bleu}" stroke-width="${T}"/>
        <text x="${x + 5 * E}" y="${y - 1 * E}" text-anchor="middle" font-size="${4 * E}"
              font-style="italic" fill="${C.bleu}">I&gt;</text>` },

    /* act_electromagnetique_no.svg : stroke-dasharray="6 3", de -15,0 à -3,0 */
    pointille: {
      nom: 'Le pointillé', dit: 'liaison mécanique — ce qui relie ce qui est loin',
      source: '310_relays_contactors_contacts/03_contacts/act_electromagnetique_no.svg',
      dessin: (x, y) => `
        <line x1="${x - 12 * E}" y1="${y}" x2="${x + 12 * E}" y2="${y}"
              stroke="${C.gris}" stroke-width="${T - 1.5}" stroke-dasharray="${6 * E * 0.5} ${3 * E * 0.5}"/>` },

    /* 310_relays_contactors_contacts/01_coils/ : un rectangle traversé par le conducteur. */
    bobine: {
      nom: 'Le rectangle large', dit: 'une bobine — ce qui commande',
      source: '310_relays_contactors_contacts/01_coils/bobine3.svg',
      dessin: (x, y) => `
        <line x1="${x}" y1="${y - 20 * E}" x2="${x}" y2="${y - 5 * E}"
              stroke="${C.navy}" stroke-width="${T}"/>
        <line x1="${x}" y1="${y + 5 * E}" x2="${x}" y2="${y + 20 * E}"
              stroke="${C.navy}" stroke-width="${T}"/>
        <rect x="${x - 7 * E}" y="${y - 5 * E}" width="${14 * E}" height="${10 * E}"
              fill="${C.papier}" stroke="${C.navy}" stroke-width="${T}"/>` },

    /* moteur_tri.svg / induction_motor : un cercle, une lettre, les traits d'arrivée. */
    machine: {
      nom: 'Le rond', dit: 'une machine — la lettre dedans dit laquelle',
      source: '391_consumers_actuators/10_engines/moteur_tri.svg',
      dessin: (x, y, l) => `
        <circle cx="${x}" cy="${y}" r="${9 * E}" fill="${C.papier}"
                stroke="${C.navy}" stroke-width="${T}"/>
        <text x="${x}" y="${y + 3 * E}" text-anchor="middle" font-size="${8 * E}"
              font-weight="700" fill="${C.navy}">${l || 'M'}</text>` },

    /* 380_signaling_operating/20_push_buttons/ : le trait de commande manuelle
       posé en travers de la lame. */
    manuelle: {
      nom: 'Le trait de commande', dit: 'commande manuelle — une main agit',
      source: '380_signaling_operating/20_push_buttons/',
      dessin: (x, y) => `
        <line x1="${x - 7 * E}" y1="${y - 13 * E}" x2="${x - 1 * E}" y2="${y - 13 * E}"
              stroke="${C.navy}" stroke-width="${T}"/>
        <line x1="${x - 4 * E}" y1="${y - 13 * E}" x2="${x - 4 * E}" y2="${y - 9 * E}"
              stroke="${C.navy}" stroke-width="${T - 1}"/>` },

    temporisation: {
      nom: 'Le demi-disque', dit: 'temporisation — le contact prend son temps',
      source: '310_relays_contactors_contacts/01_coils/bobine_tempo_travail.svg',
      dessin: (x, y) => `
        <path d="M${x - 4 * E} ${y - 4 * E} a${4 * E} ${4 * E} 0 0 1 ${8 * E} 0 z"
              fill="${C.orange}" stroke="${C.orange}" stroke-width="1"/>` }
  };

  /* ---------------------------------------------------------------- les mots
     Chaque symbole composé dit de quelles lettres il est fait, et d'où vient sa forme. */
  const MOTS = {
    interrupteur: { nom: 'Un interrupteur', lettres: ['contact', 'manuelle'],
      lecture: 'un contact, plus le trait de commande manuelle : quelqu’un l’actionne.' },

    sectionneur: { nom: 'Un sectionneur', lettres: ['contact', 'sectionnement'],
      lecture: 'un contact, plus la barre courte sur la borne fixe : on peut le condamner et travailler derrière.' },

    fusible: { nom: 'Un fusible', lettres: ['rectangle'],
      lecture: 'un seul signe : le rectangle étroit que le conducteur traverse.' },

    sectionneurFusible: { nom: 'Un sectionneur porte-fusible', lettres: ['contact', 'sectionnement', 'rectangle'],
      lecture: 'trois lettres : il coupe, il se condamne, il porte la protection.' },

    magnetoThermique: { nom: 'Un disjoncteur magnéto-thermique', lettres: ['contact', 'thermique', 'magnetique'],
      lecture: 'un contact, le crochet rectangulaire du bilame et le demi-cercle de la bobine : il voit la surcharge lente ET le court-circuit brutal.' },

    disjoncteurMoteur: { nom: 'Un disjoncteur moteur', lettres: ['contact', 'thermique', 'magnetique', 'sectionnement'],
      lecture: 'les trois du magnéto-thermique, plus la barre : celui-là se condamne aussi.' },

    contacteur: { nom: 'Un contacteur', lettres: ['bobine', 'contact', 'pointille'],
      lecture: 'une bobine, des contacts, et le pointillé qui les relie : ils sont loin l’un de l’autre sur le plan, mais mécaniquement solidaires.' },

    relaisThermique: { nom: 'Un relais thermique', lettres: ['contact', 'thermique'],
      lecture: 'un contact et le crochet rectangulaire : il ne voit que la surcharge lente, pas le court-circuit.' },

    moteur: { nom: 'Un moteur triphasé', lettres: ['machine'],
      lecture: 'le rond, la lettre M, et trois traits qui arrivent : trois fils l’alimentent.' }
  };

  /* Assemble un symbole à partir des mêmes lettres. Chaque lettre dans un <g cliquable>. */
  function dessinerMot(cle, x, y) {
    const g = [];
    const L = (nom, dx, dy, arg) =>
      `<g data-signe="${nom}" class="lettre">${LETTRES[nom].dessin(x + dx, y + dy, arg)}</g>`;
    const fil = (y1, y2) => `<line x1="${x}" y1="${y + y1}" x2="${x}" y2="${y + y2}"
      stroke="${C.navy}" stroke-width="${T}"/>`;

    switch (cle) {
      case 'interrupteur':
        g.push(L('contact', 0, 0), L('manuelle', 0, 0)); break;
      case 'sectionneur':
        g.push(L('contact', 0, 0), L('sectionnement', 0, 0)); break;
      case 'fusible':
        g.push(L('rectangle', 0, 0)); break;
      case 'sectionneurFusible':
        g.push(L('contact', 0, -32 * E * 0.6), L('sectionnement', 0, -32 * E * 0.6),
               fil(-12 * E * 0.6 + 20 * E * 0.6, 8 * E), L('rectangle', 0, 32 * E * 0.6)); break;
      case 'magnetoThermique':
        g.push(L('contact', 0, -26 * E * 0.6), fil(-6 * E * 0.6, 34 * E * 0.6),
               L('thermique', 0, 12 * E * 0.6), L('magnetique', 0, 34 * E * 0.6)); break;
      case 'disjoncteurMoteur':
        g.push(L('contact', 0, -26 * E * 0.6), L('sectionnement', 0, -26 * E * 0.6),
               fil(-6 * E * 0.6, 34 * E * 0.6),
               L('thermique', 0, 12 * E * 0.6), L('magnetique', 0, 34 * E * 0.6)); break;
      case 'contacteur':
        g.push(L('bobine', -26 * E, 0), L('contact', 26 * E, 0), L('pointille', 0, 0)); break;
      case 'relaisThermique':
        g.push(L('contact', 0, -20 * E * 0.6), fil(0, 30 * E * 0.6),
               L('thermique', 0, 20 * E * 0.6)); break;
      case 'moteur':
        g.push(L('machine', 0, 0, 'M'),
               `<line x1="${x - 5 * E}" y1="${y - 9 * E}" x2="${x - 5 * E}" y2="${y - 19 * E}" stroke="${C.navy}" stroke-width="${T}"/>`,
               `<line x1="${x}" y1="${y - 9 * E}" x2="${x}" y2="${y - 19 * E}" stroke="${C.navy}" stroke-width="${T}"/>`,
               `<line x1="${x + 5 * E}" y1="${y - 9 * E}" x2="${x + 5 * E}" y2="${y - 19 * E}" stroke="${C.navy}" stroke-width="${T}"/>`); break;
    }
    return g.join('\n');
  }

  function svg(vb, aria) {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria);
    return s;
  }

  /* ------------------------------------------------ la lettre seule, en grand */
  function lettreSeule(nom, arg) {
    const L = LETTRES[nom];
    const d = svg('0 0 660 300', L.nom + ' : ' + L.dit);
    d.innerHTML = `
<rect x="12" y="10" width="636" height="280" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="34" y="30" width="200" height="240" rx="12" fill="${C.creme}" stroke="${C.trait}"/>
${L.dessin(134, 150, arg)}
<text x="446" y="118" text-anchor="middle" font-size="21" font-weight="700" fill="${C.navy}">${L.nom}</text>
<text x="446" y="152" text-anchor="middle" font-size="16" fill="${C.gris}">${L.dit}</text>
<text x="446" y="214" text-anchor="middle" font-size="12" fill="${C.gris}">tracé relevé sur le symbole normalisé</text>
<text x="446" y="234" text-anchor="middle" font-size="11" fill="${C.gris}">${L.source.split(' · ')[0].split('/').pop()}</text>`;
    return d;
  }

  /* ------------------------------------------------ un mot, décomposé et légendé */
  function motDecompose(cle) {
    const M = MOTS[cle];
    const d = svg('0 0 620 360', M.nom + ' : ' + M.lecture);
    d.innerHTML = `
<rect x="12" y="10" width="596" height="340" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="310" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${M.nom}</text>
<rect x="180" y="62" width="260" height="230" rx="12" fill="${C.creme}" stroke="${C.trait}"/>
${dessinerMot(cle, 310, 176)}
<text x="310" y="324" text-anchor="middle" font-size="14" fill="${C.gris}">composé de : ${
  M.lettres.map(l => LETTRES[l].nom.toLowerCase()).join(' + ')}</text>`;
    return d;
  }

  /* ------------------------------------------------ l'exercice : retrouver la lettre */
  function retrouver(nomLettre, mots) {
    const hote = document.createElement('div');
    const L = LETTRES[nomLettre];
    const consigne = document.createElement('p');
    consigne.className = 'legende';
    consigne.innerHTML = 'Cliquez sur <strong>' + L.nom.toLowerCase() + '</strong> dans chacun de ces symboles.';
    hote.appendChild(consigne);

    const attendus = mots.filter(m => MOTS[m].lettres.includes(nomLettre)).length;
    const d = svg('0 0 900 340', 'Trois symboles composés : retrouver ' + L.nom + ' dans chacun.');
    const largeur = 300;
    d.innerHTML = `
<rect x="8" y="8" width="884" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${mots.map((m, i) => `
  <rect x="${18 + i * largeur}" y="24" width="${largeur - 20}" height="292" rx="12"
        fill="${C.creme}" stroke="${C.trait}"/>
  <text x="${18 + i * largeur + (largeur - 20) / 2}" y="52" text-anchor="middle"
        font-size="14" font-weight="700" fill="${C.navy}">${MOTS[m].nom}</text>
  ${dessinerMot(m, 18 + i * largeur + (largeur - 20) / 2, 190)}`).join('')}`;
    hote.appendChild(d);

    const verdict = document.createElement('p');
    verdict.className = 'verdict wait';
    verdict.innerHTML = '<span class="signe">•</span>Trouvez-la dans les symboles où elle se cache — elle n’est pas dans tous.';
    hote.appendChild(verdict);

    let trouves = 0, rates = 0;
    d.querySelectorAll('g.lettre').forEach(g => {
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => {
        if (g.dataset.vu) return;
        g.dataset.vu = '1';
        const juste = g.dataset.signe === nomLettre;
        g.querySelectorAll('*').forEach(e => {
          if (e.getAttribute('stroke')) e.setAttribute('stroke', juste ? C.vert : C.rouge);
          const f = e.getAttribute('fill');
          if (f && f !== 'none' && f !== C.papier) e.setAttribute('fill', juste ? C.vert : C.rouge);
        });
        if (juste) trouves++; else rates++;
        if (trouves === attendus && !rates) {
          verdict.className = 'verdict ok';
          verdict.innerHTML = '<span class="signe">✔</span>Les ' + attendus +
            ' trouvées, sans erreur. ' + L.nom + ' : ' + L.dit;
        } else if (rates) {
          verdict.className = 'verdict bad';
          verdict.innerHTML = '<span class="signe">✘</span>Celle-là, c’est autre chose. ' +
            (LETTRES[g.dataset.signe] ? LETTRES[g.dataset.signe].nom + ' dit : ' +
             LETTRES[g.dataset.signe].dit : '') + ' — on cherche ' + L.nom.toLowerCase() + '.';
        } else {
          verdict.className = 'verdict wait';
          verdict.innerHTML = '<span class="signe">•</span>' + trouves + ' sur ' + attendus + '.';
        }
      });
    });
    return hote;
  }

  /* ------------------------------------------------ exercice propre à la station 8.1 */
  function exerciceCroisements() {
    const hote = document.createElement('div');
    const c = document.createElement('p');
    c.className = 'legende';
    c.innerHTML = 'Pour chaque croisement, dites si les deux fils sont <strong>reliés</strong> ou non. Le point seul tranche.';
    hote.appendChild(c);

    const CAS = [true, false, false, true, false, true];
    const d = svg('0 0 900 250', 'Six croisements de conducteurs, certains avec un point de connexion.');
    d.innerHTML = `
<rect x="8" y="8" width="884" height="234" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${CAS.map((relie, i) => {
  const x = 90 + i * 140, y = 110;
  return `
<g data-cas="${i}" class="croisement" style="cursor:pointer">
  <rect x="${x - 56}" y="${y - 74}" width="112" height="152" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
  <line x1="${x - 42}" y1="${y}" x2="${x + 42}" y2="${y}" stroke="${C.navy}" stroke-width="${T}"/>
  <line x1="${x}" y1="${y - 42}" x2="${x}" y2="${y + 42}" stroke="${C.navy}" stroke-width="${T}"/>
  ${relie ? `<circle cx="${x}" cy="${y}" r="${1.6 * E}" fill="${C.navy}"/>` : ''}
  <text x="${x}" y="${y + 66}" text-anchor="middle" font-size="14" font-weight="700"
        fill="${C.gris}" id="cas${i}">?</text>
</g>`;
}).join('')}`;
    hote.appendChild(d);

    const barre = document.createElement('div');
    barre.className = 'choix';
    barre.style.marginTop = '.6rem';
    let choisi = null;
    ['reliés', 'pas reliés'].forEach((lib, k) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        choisi = (k === 0);
        barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        v.className = 'verdict wait';
        v.innerHTML = '<span class="signe">•</span>Cliquez maintenant sur les croisements que vous jugez « ' + lib + ' ».';
      });
      barre.appendChild(b);
    });
    hote.appendChild(barre);

    const v = document.createElement('p');
    v.className = 'verdict wait';
    v.innerHTML = '<span class="signe">•</span>Choisissez d’abord une réponse, puis cliquez sur les croisements concernés.';
    hote.appendChild(v);

    let bons = 0;
    d.querySelectorAll('g.croisement').forEach(g => {
      g.addEventListener('click', () => {
        if (choisi === null || g.dataset.vu) return;
        const i = +g.dataset.cas;
        const juste = (CAS[i] === choisi);
        g.dataset.vu = '1';
        const t = d.querySelector('#cas' + i);
        t.textContent = CAS[i] ? 'reliés' : 'pas reliés';
        t.setAttribute('fill', juste ? C.vert : C.rouge);
        if (juste) { bons++;
          v.className = 'verdict ok';
          v.innerHTML = '<span class="signe">✔</span>' + bons + ' sur 6. ' +
            (CAS[i] ? 'Le point est là : les deux fils n’en font qu’un.'
                    : 'Pas de point : ils se croisent sans se toucher.');
        } else {
          v.className = 'verdict bad';
          v.innerHTML = '<span class="signe">✘</span>Regardez encore : ' +
            (CAS[i] ? 'il y a bien un point, donc ils sont reliés.'
                    : 'il n’y a pas de point, donc ils ne se touchent pas.');
        }
        if (bons === 6) {
          v.className = 'verdict ok';
          v.innerHTML = '<span class="signe">✔</span>Les six. Le point, et rien d’autre, fait la connexion.';
        }
      });
    });
    return hote;
  }

  return { LETTRES, MOTS, lettreSeule, motDecompose, retrouver, dessinerMot, svg,
           exerciceCroisements };
})();
