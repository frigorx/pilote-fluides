/* Le jeu du chalumeau — les RÈGLES et le déroulé (6 temps, 28 étapes).
   Sources : DECISIONS-2026-09-30.md (INRS ED 742 d'abord), sources-metier/2-chalumeau.md, 2-3-simulateur.md.
   Ordres retenus : bouteilles oxygène puis acétylène ; allumage = un peu d'oxygène, l'acétylène largement,
   allumer, régler ; extinction = acétylène, un peu d'oxygène s'échappe, oxygène ; fin de travail = bouteilles
   (acétylène d'abord), purge jusqu'à zéro, vis desserrées, robinets du chalumeau refermés.
   Données (obligations, équipement, buses) : regles.js. Dessins : scene.js. Son : son.js.
   Étapes, questions, fautes, bilan et commandes : moteur.js (commun avec la station azote). */
Moteur.lancer(api => {
  'use strict';
  const { dire, faute, btn, suite, texte, choix, repondre, terminer, avancer, afficher, dessiner, E, borne, maj, bar, melanger } = api;
  const $ = id => document.getElementById(id);
  const R = window.REGLES;
  const PAS_MAX = 24;                 // robinets du chalumeau : 3 tours, en huitièmes de tour
  const KA = 1 / 12, KO = 0.85 / 12;  // débit relatif par huitième de tour (1 = débit nominal de la buse)
  const VIS = { O: { max: 4, pas: 0.1 }, A: { max: 2.5, pas: 0.05 } };
  const NOM = { O: 'oxygène', A: 'acétylène' }, DE = { O: 'd’oxygène', A: 'd’acétylène' };

  const FLAMMES = { carburante: 'Flamme carburante', neutre: 'Flamme neutre', oxydante: 'Flamme oxydante', braser: 'La flamme pour braser le cuivre' };
  const VUE = {
    carburante: 'dard long et flou, entouré d’un voile blanc : trop d’acétylène',
    neutre: 'dard net et arrondi, bien délimité : ni voile blanc, ni sifflement',
    oxydante: 'dard court et pointu, la flamme siffle : trop d’oxygène',
    acetylene: 'flamme jaune qui fume noir : l’acétylène brûle seul'
  };

  /* ---------- l'état ---------- */
  let S;
  function neuf(niveau) {
    S = {
      niveau, plaquesBlanches: false,
      retire: { carton: false, chiffons: false }, extincteurVu: false, chaine: { O: false, A: false },
      b: { O: { monte: false, ouverte: false, purgee: false }, A: { monte: false, ouverte: false } },
      vis: { O: 0, A: 0 }, p: { O: { hp: 0, bp: 0 }, A: { hp: 0, bp: 0 } }, chute: { O: 0, A: 0 },
      tuyau: { O: false, A: false }, clapetVu: { O: false, A: false }, cleRetiree: false,
      choixDet: { 1: null, 2: null }, raccord: { prog: 0, total: 8, angle: 0, dernier: 0 },
      buse: 250, buseMontee: niveau === 1, consigneBP: { O: 1, A: 0.5 }, travail: null,
      points: null, dernierPoint: null, fuitePoint: 1 + Math.floor(Math.random() * 4), fuiteReparee: false,
      o2: 0, ac: 0, allume: false, premier: null, consignes: [...melanger(['carburante', 'neutre', 'oxydante']), 'braser'], n: 0,
      fuiteDepuis: 0, fuiteSignalee: false, clac: false, fumeeSignalee: false, anim: { purge: null }
    };
    return S;
  }

  /* ---------- la physique, simplifiée ---------- */
  const qA = () => S.p.A.bp > 0.05 ? S.ac * KA : 0;
  const qO = () => S.p.O.bp > 0.05 ? S.o2 * KO : 0;
  const rapport = () => qA() ? qO() / qA() : Infinity;
  function sorte() {
    if (!S.allume) return null;
    if (qO() === 0) return 'acetylene';
    const r = rapport();
    return r < 0.98 ? 'carburante' : r <= 1.2 ? 'neutre' : 'oxydante';
  }
  const gazSort = () => (S.ac > 0 && S.p.A.bp > 0.02) || (S.o2 > 0 && S.p.O.bp > 0.02);
  const F = () => ({ allume: S.allume, qA: qA(), r: rapport(), seul: qO() === 0, clac: S.clac,
    fuite: !S.allume && gazSort(), taille: Math.pow(S.buse / 250, 0.35) });
  /* pressions : la bouteille ouverte remplit la HP ; la vis de détente règle la BP ; bouteille fermée et
     robinets du chalumeau ouverts, le poste se vide — mais la HP ne passe que si la vis laisse passer. */
  function physique() {
    let change = false;
    for (const g of ['O', 'A']) {
      const b = S.b[g], p = S.p[g], HP = g === 'O' ? 200 : 15;
      if (!b.monte) continue;
      const sortie = (g === 'O' ? S.o2 : S.ac) > 0 && S.tuyau[g];
      let { hp, bp } = p;
      if (b.ouverte) hp += (HP - hp) * .3;
      if (S.vis[g] > 0 && hp > .02) {
        const regle = Math.min(S.vis[g], hp);
        if (!b.ouverte && sortie) { hp *= .82; bp = Math.min(bp * .9, hp); }
        else bp += (regle - bp) * .4;
      } else if (sortie) bp *= .75;
      if (hp < .03) hp = 0; if (bp < .01) bp = 0;
      if (Math.abs(hp - p.hp) > .01 || Math.abs(bp - p.bp) > .003) change = true;
      p.hp = hp; p.bp = bp;
    }
    return change;
  }

  const fmtTours = p => { if (!p) return 'fermé'; const t = Math.floor(p / 8), f = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'][p % 8];
    return (t ? t + (t > 1 ? ' tours' : ' tour') : '') + (t && f ? ' ' : '') + (f ? f + (t ? '' : ' de tour') : '') + ' ouvert'; };
  const robinets = () => `
    <div class="robinet o2" id="ligne-o2"><div><span class="nom">Oxygène</span><span class="pos" id="pos-o2">${fmtTours(S.o2)}</span></div>
      ${btn('<b>↺</b>ouvrir', 'tourner', 'o2:1', 'tourner', true)}${btn('<b>↻</b>fermer', 'tourner', 'o2:-1', 'tourner', true)}</div>
    <div class="robinet ac" id="ligne-ac"><div><span class="nom">Acétylène</span><span class="pos" id="pos-ac">${fmtTours(S.ac)}</span></div>
      ${btn('<b>↺</b>ouvrir', 'tourner', 'ac:1', 'tourner', true)}${btn('<b>↻</b>fermer', 'tourner', 'ac:-1', 'tourner', true)}</div>
    <p class="aide">Un appui = un huitième de tour. Appui long = on continue de tourner.</p>`;
  const vis = (g, quoi) => `<div class="robinet ${g === 'O' ? 'o2' : 'ac'}"><div><span class="nom">Vis de détente ${DE[g]}</span><span class="pos">${quoi || ''}</span></div>
      ${btn('<b>↻</b>serrer', 'vis', g + ':1', 'tourner', true)}${btn('<b>↺</b>desserrer', 'vis', g + ':-1', 'tourner', true)}</div>`;
  const consigne = g => { const c = S.consigneBP[g]; return Array.isArray(c) ? `entre ${bar(c[0])} et ${bar(c[1])} bar` : `${bar(c)} bar`; };

  /* ---------- les étapes ---------- */
  const ETAPES = [
    { id: 'accueil', temps: 0, petit: 'CuivRézo · le poste oxyacétylénique', titre: 'Le jeu du chalumeau',
      zoom: () => Scene.vueFlamme({ allume: true, qA: 1, r: 1.08, seul: false, taille: 1 }),
      ui: () => `<p class="intro">Vous montez le poste, vous le mettez en pression, vous allumez, vous réglez la flamme demandée, puis vous éteignez et refermez tout. Chaque erreur est expliquée sur le moment.</p>
        <div class="choix">${btn('<b>Niveau 1</b>le poste de l’atelier', 'niveau', '1', 'btn-plein')}${btn('<b>Niveau 2</b>je choisis aussi la buse', 'niveau', '2')}</div>
        <p class="aide">Au vrai poste, on n’allume jamais seul : le professeur est toujours présent.</p>` },

    /* TEMPS 1 — S'équiper et contrôler */
    { id: 'obligations', temps: 1, petit: 'Avant de souder', titre: 'Les obligations du soudeur',
      zoom: () => texte(`<ul class="liste">${R.OBLIGATIONS.map(o => `<li>${o}</li>`).join('')}</ul>`),
      ui: () => S.q.bonc1 == null ? `<p class="question">${R.Q_OBLIG.question}</p>${choix(R.Q_OBLIG.choix, 'c1')}`
        : `<p class="question">${R.Q_APRES.question}</p>${choix(R.Q_APRES.choix, 'c2')}${S.q.bonc2 != null ? suite() : ''}`,
      act(a, v) { if (a !== 'choix') return; const [c, i] = v.split(':'); repondre(c === 'c1' ? R.Q_OBLIG.choix : R.Q_APRES.choix, c, +i); } },
    { id: 'epi', temps: 1, petit: 'Touchez ce que vous portez pour braser, puis validez', titre: 'Équipez-vous',
      entrer: () => { S.q.sel = []; },
      zoom: () => texte(`<p>${R.TEINTE}</p>`),
      ui: () => `<div class="grille">${R.EPI.map(e => `<button class="carte-epi${S.q.sel.includes(e.id) ? ' prise' : ''}" data-act="epi" data-v="${e.id}">${e.t}</button>`).join('')}</div>
        ${S.q.ok ? suite() : `<div class="ligne-suite">${btn('Je suis équipé', 'valider', '', 'btn-plein')}</div>`}`,
      act(a, v) {
        if (S.q.ok) return;
        if (a === 'epi') { const i = S.q.sel.indexOf(v); i < 0 ? S.q.sel.push(v) : S.q.sel.splice(i, 1); return; }
        if (a !== 'valider') return;
        const faux = R.EPI.filter(e => !e.bon && S.q.sel.includes(e.id)), manque = R.EPI.filter(e => e.bon && !S.q.sel.includes(e.id));
        if (!faux.length && !manque.length) { S.q.ok = true; return dire('<p><b>Bien équipé.</b> Lunettes sur les yeux, et rien de gras sur vous : l’oxygène fait flamber ce qui est gras.</p>', 'ok'); }
        faux.forEach(e => faute('epi-' + e.id, 'Équipement : ' + e.t.toLowerCase(), e.grave));
        if (manque.length) faute('epi-manque', 'Équipement incomplet');
        dire(`${faux.map(e => `<p><b>${e.t}.</b> ${maj(e.pourquoi)}</p>`).join('')}${manque.length ? `<p>Il manque ${manque.length > 1 ? 'des protections' : 'une protection'}.</p>` : ''}`, 'bad');
      } },
    { id: 'zone', temps: 1, petit: 'Touchez ce qui n’a rien à faire près du poste, puis montrez l’extincteur', titre: 'Dégagez le poste',
      zoom: () => Scene.cadre([380, 380, 820, 240]),
      ui: () => `<p class="etat-liste">Retirés : ${(S.retire.carton ? 1 : 0) + (S.retire.chiffons ? 1 : 0)} sur 2 · Extincteur : ${S.extincteurVu ? 'repéré' : 'pas encore'}</p>
        ${S.q.ok ? suite() : `<div class="ligne-suite">${btn('Le poste est dégagé', 'valider', '', 'btn-plein')}</div>`}`,
      cible(c) {
        if (c === 'carton' || c === 'chiffons') { S.retire[c] = true; dire(c === 'carton' ? '<p><b>Retiré.</b> Un carton brûle : rien d’inflammable à moins d’un mètre du poste.</p>' : '<p><b>Retiré.</b> Des chiffons gras : avec l’oxygène, ce qui est gras peut s’enflammer tout seul.</p>', 'ok'); }
        else if (c === 'extincteur') { S.extincteurVu = true; dire('<p><b>Repéré.</b> L’extincteur est près du poste, accessible, et vous savez où il est avant d’allumer.</p>', 'ok'); }
        else if (/^(bouteille|robinet|chaine)/.test(c)) dire('<p>Les bouteilles restent sur leur chariot : elles font partie du poste.</p>');
      },
      act(a) {
        if (a !== 'valider') return;
        if (S.retire.carton && S.retire.chiffons && S.extincteurVu) { S.q.ok = true; return dire('<p><b>Zone dégagée, extincteur repéré.</b></p>', 'ok'); }
        faute('zone', 'Zone pas dégagée ou extincteur non repéré');
        dire(`<p>${!S.retire.carton || !S.retire.chiffons ? 'Il reste quelque chose qui brûle près du poste. ' : ''}${!S.extincteurVu ? 'Où est l’extincteur ? Touchez-le.' : ''}</p>`, 'bad');
      } },
    { id: 'chaines', temps: 1, petit: 'Touchez chaque chaîne pour l’attacher', titre: 'Arrimez les bouteilles',
      zoom: () => Scene.cadre([20, 150, 420, 330]),
      ui: () => `<p class="etat-liste">Chaînes attachées : ${(S.chaine.O ? 1 : 0) + (S.chaine.A ? 1 : 0)} sur 2</p>${S.chaine.O && S.chaine.A ? suite() : ''}`,
      cible(c) {
        const g = { 'chaine-O': 'O', 'bouteille-O': 'O', 'chaine-A': 'A', 'bouteille-A': 'A' }[c];
        if (!g) return;
        S.chaine[g] = true;
        dire(S.chaine.O && S.chaine.A ? '<p><b>Les deux bouteilles sont arrimées.</b> Une bouteille qui tombe peut casser son robinet.</p>' : '<p>Chaîne attachée. Et l’autre bouteille ?</p>', 'ok');
      } },
    { id: 'couchee', temps: 1, petit: 'Le magasin vous apporte une bouteille d’acétylène, trouvée couchée', titre: 'Que faites-vous ?',
      zoom: () => Scene.vueCouchee(),
      ui: () => `${choix(R.Q_COUCHEE)}${S.q.bonc != null ? suite() : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_COUCHEE, 'c', +v.split(':')[1]) },
    { id: 'gaz', temps: 1, petit: 'Les étiquettes sont illisibles : reconnaissez le gaz à l’ogive', titre: () => S.q.k >= 2 ? 'Les deux gaz sont reconnus' : `Touchez la bouteille ${DE[S.q.ordre[S.q.k]]}`,
      entrer: () => { S.plaquesBlanches = true; S.q.ordre = melanger(['O', 'A']); S.q.k = 0; },
      zoom: () => Scene.cadre([40, 150, 380, 260]),
      ui: () => S.q.k >= 2 ? suite() : '<p class="aide">L’ogive, c’est le haut de la bouteille.</p>',
      cible(c) {
        if (S.q.k >= 2) return;
        const g = { 'bouteille-O': 'O', 'robinet-O': 'O', 'bouteille-A': 'A', 'robinet-A': 'A' }[c];
        if (!g) return;
        if (g === S.q.ordre[S.q.k]) {
          S.q.k++;
          if (S.q.k >= 2) S.plaquesBlanches = false;
          dire(`<p><b>Oui.</b> Ogive ${g === 'O' ? 'blanche' : 'marron'} : ${NOM[g]}.</p>`, 'ok');
        } else {
          faute('gaz', 'Gaz mal reconnu à l’ogive');
          dire('<p><b>Non.</b> Ogive blanche = oxygène ; ogive marron = acétylène.</p>', 'bad');
        }
      } },

    /* TEMPS 2 — Monter les détendeurs */
    { id: 'purge', temps: 2, petit: 'Debout sur le côté, la sortie du robinet tournée vers une zone libre', titre: 'Chassez les poussières du robinet',
      zoom: () => Scene.cadre([60, 60, 340, 220]),
      ui: () => S.q.ok ? suite() : `<div class="choix">${btn('Ouvrir un instant la bouteille d’oxygène, puis refermer', 'purge', 'O')}${btn('Ouvrir un instant la bouteille d’acétylène, puis refermer', 'purge', 'A')}</div>
        <div class="ligne-suite">${btn('Les robinets sont propres : je monte les détendeurs', 'valider', '', 'btn-plein')}</div>`,
      cible(c) { if (c === 'robinet-O' || c === 'robinet-A') this.act('purge', c.slice(-1)); },
      act(a, v) {
        if (S.q.ok) return;
        if (a === 'purge' && v === 'O') {
          S.b.O.purgee = true; S.anim.purge = 'O'; Son.pfff(); setTimeout(() => { S.anim.purge = null; dessiner(); }, 700);
          return dire('<p><b>Pfff…</b> La poussière du robinet est chassée, on referme aussitôt. Sinon elle partirait dans le détendeur.</p>', 'ok');
        }
        if (a === 'purge' && v === 'A') {
          faute('purge-A', 'Bouteille d’acétylène ouverte pour la purger', true);
          return dire(`<p><b>Jamais l’acétylène.</b> ${R.PURGE_A}</p>`, 'bad');
        }
        if (a === 'valider') {
          if (!S.b.O.purgee) { faute('purge-oubli', 'Robinet d’oxygène pas purgé avant le montage'); return dire('<p>D’abord, chassez les poussières du robinet de la bouteille d’oxygène.</p>', 'bad'); }
          S.q.ok = true; dire('<p>Robinets prêts. On monte les détendeurs.</p>', 'ok');
        }
      } },
    { id: 'detendeurs', temps: 2, petit: 'Lisez le marquage de chaque détendeur', titre: 'Quel détendeur sur quelle bouteille ?',
      zoom: () => Scene.vueDetendeurs(S),
      ui: () => `${[1, 2].map(n => `<div class="robinet"><div><span class="nom">Détendeur ${n}</span><span class="pos">${S.choixDet[n] ? 'sur la bouteille ' + DE[S.choixDet[n]] : ''}</span></div>
        ${S.choixDet[n] ? '' : btn('ogive blanche', 'det', n + ':O') + btn('ogive marron', 'det', n + ':A')}</div>`).join('')}
        ${S.choixDet[1] && S.choixDet[2] ? suite() : ''}`,
      act(a, v) {
        if (a !== 'det') return;
        const [n, g] = v.split(':'), bon = n === '1' ? 'O' : 'A';
        if (g === bon) { S.choixDet[n] = g; return dire(n === '1' ? '<p><b>Oui.</b> Marqué « oxygène » : il va sur l’oxygène. Son raccord a un filetage à droite.</p>' : '<p><b>Oui.</b> Marqué « acétylène » : il va sur l’acétylène. Son raccord a un filetage à gauche.</p>', 'ok'); }
        faute('det-' + n, 'Détendeur présenté sur la mauvaise bouteille');
        dire(`<p><b>Non.</b> Le détendeur ${n} est marqué « ${NOM[bon]} » : il ne va que sur la bouteille ${DE[bon]}. Chaque gaz a son matériel, et les raccords sont différents.</p>`, 'bad');
      } },
    ...['O', 'A'].map(g => ({ id: 'visser-' + g, temps: 2,
      petit: g === 'O' ? 'Oxygène : filetage à droite' : 'Acétylène : filetage à gauche',
      titre: `Vissez le détendeur ${DE[g]}`,
      entrer: () => { S.raccord = { prog: 0, total: 8, angle: 0, dernier: 0 }; S.q.serre = false; },
      zoom: () => Scene.vueRaccord(S, g),
      ui() {
        if (S.q.serre) return suite();
        if (S.q.force) return `<p class="question">L’écrou force un peu. Que faites-vous ?</p>${choix(R.Q_FORCE)}`;
        if (S.raccord.prog >= S.raccord.total) return `<div class="ligne-suite">${btn('Serrer à la clé', 'cle', '', 'btn-plein')}</div>`;
        return `<div class="choix deux">${btn('<b>↻</b> sens des aiguilles d’une montre', 'visser', '1', 'tourner')}${btn('<b>↺</b> sens inverse', 'visser', '-1', 'tourner')}</div>
          <p class="aide">Un appui = un quart de tour. L’écrou vu de face montre le sens.</p>`;
      },
      act(a, v) {
        const R0 = S.raccord, bon = g === 'O' ? 1 : -1;
        if (a === 'choix') return repondre(R.Q_FORCE, 'c', +v.split(':')[1], () => { S.q.force = false; S.q.forceFaite = true; });
        if (a === 'cle') { S.q.serre = true; S.b[g].monte = true; S.vis[g] = 0; return dire(`<p><b>Détendeur ${DE[g]} monté.</b> Serré à la clé, sans forcer.</p>`, 'ok'); }
        if (a !== 'visser') return;
        const s = +v; R0.dernier = s; R0.angle += s * 90;
        if (s === bon) {
          R0.prog++;
          if (g === 'O' && R0.prog === 3 && !S.q.forceFaite) S.q.force = true;
          dire(R0.prog >= R0.total ? '<p>L’écrou est vissé à la main jusqu’au bout.</p>' : '<p>Ça visse.</p>', R0.prog >= R0.total ? 'ok' : '');
        } else if (R0.prog > 0) { R0.prog--; dire('<p>Vous dévissez : l’écrou recule.</p>', 'wait'); }
        else {
          faute('sens-' + g, `Détendeur ${DE[g]} vissé dans le mauvais sens`);
          dire(g === 'O' ? '<p><b>Ça ne prend pas.</b> L’oxygène a un filetage à droite : on visse dans le sens des aiguilles d’une montre.</p>'
            : '<p><b>Ça ne prend pas.</b> L’acétylène a un filetage à gauche : on visse dans le sens inverse des aiguilles d’une montre.</p>', 'bad');
        }
      } })),
    { id: 'buse', temps: 2, niveau2: true, petit: () => S.travail ? `Le travail : braser un tube de cuivre ${S.travail.nom}` : '', titre: 'Choisissez la buse',
      entrer: () => { S.travail = R.TUBES[Math.floor(Math.random() * R.TUBES.length)]; S.buse = 0; },
      zoom: () => Scene.vueBuses(S, R.BUSES),
      ui: () => S.buseMontee ? suite() : `<div class="choix buses">${R.BUSES.map(b => btn(b.debit + ' l/h', 'buse', b.debit)).join('')}</div><p class="aide">${R.AIDE_BUSE}</p>`,
      cible(c) { if (/^\d+$/.test(c)) this.act('buse', c); },
      act(a, v) {
        if (a !== 'buse' || S.buseMontee) return;
        const b = R.BUSES.find(x => x.debit === +v), bonne = R.buseBonne(S.travail);
        if (+v === bonne) {
          S.buse = b.debit; S.buseMontee = true; S.consigneBP = { O: b.O, A: b.A };
          return dire(`<p><b>Buse de ${b.debit} l/h montée.</b> Le document du professeur donne, pour cette buse : oxygène ${consigne('O')}, acétylène ${consigne('A')}.</p>`, 'ok');
        }
        faute('buse', 'Buse mal choisie pour le tube');
        dire(`<p><b>Pas celle-là.</b> ${+v < bonne ? 'Trop petite pour ce tube.' : 'Trop grosse pour ce tube.'} ${R.REGLE_BUSE}</p>`, 'bad');
      } },
    { id: 'tuyaux', temps: 2, petit: 'Un tuyau pour chaque gaz', titre: 'Raccordez les tuyaux',
      zoom: () => Scene.cadre([150, 100, 480, 230]),
      ui: () => `${[['bleu', 'O'], ['rouge', 'A']].map(([c, g]) => `<div class="robinet ${g === 'O' ? 'o2' : 'ac'}"><div><span class="nom">Tuyau ${c}</span><span class="pos">${S.tuyau[g] ? 'raccordé' : ''}</span></div>
        ${S.tuyau[g] ? '' : btn('détendeur d’oxygène', 'tuyau', c + ':O') + btn('détendeur d’acétylène', 'tuyau', c + ':A')}</div>`).join('')}
        ${S.tuyau.O && S.tuyau.A ? suite() : ''}`,
      act(a, v) {
        if (a !== 'tuyau') return;
        const [c, g] = v.split(':'), bon = c === 'bleu' ? 'O' : 'A';
        if (g === bon) { S.tuyau[g] = true; return dire(`<p><b>Oui.</b> Tuyau ${c} : ${NOM[g]}${g === 'A' ? ' ; son raccord a, lui aussi, un filetage à gauche' : ''}.</p>`, 'ok'); }
        faute('tuyau', 'Tuyau raccordé sur le mauvais gaz');
        dire('<p><b>Non.</b> Bleu pour l’oxygène, rouge pour l’acétylène.</p>', 'bad');
      } },
    { id: 'clapets', temps: 2, petit: 'Touchez-les à l’entrée du chalumeau', titre: 'Vérifiez les clapets anti-retour',
      zoom: () => Scene.cadre([560, 400, 320, 130]),
      ui: () => `<p class="etat-liste">Clapets vérifiés : ${(S.clapetVu.O ? 1 : 0) + (S.clapetVu.A ? 1 : 0)} sur 2</p>${S.clapetVu.O && S.clapetVu.A ? suite() : ''}`,
      cible(c) {
        if (c !== 'clapet-O' && c !== 'clapet-A') return;
        S.clapetVu[c.slice(-1)] = true;
        dire('<p><b>Clapet en place.</b> Il laisse passer le gaz vers le chalumeau, jamais dans l’autre sens : il arrête une flamme qui voudrait remonter dans les tuyaux.</p>', 'ok');
      } },

    /* TEMPS 3 — Mettre en pression */
    { id: 'vis', temps: 3, petit: 'Avant d’ouvrir les bouteilles', titre: 'Desserrez les vis de détente à fond',
      entrer: () => { const g = Math.random() < .5 ? 'O' : 'A'; S.vis[g] = g === 'O' ? 1.6 : 0.8; },
      zoom: () => Scene.vueVis(S),
      ui: () => S.q.ok ? suite() : `${vis('O')}${vis('A')}<div class="ligne-suite">${btn('Les deux vis sont desserrées', 'valider', '', 'btn-plein')}</div>`,
      act(a, v) {
        if (a === 'vis') return tournerVis(v);
        if (a !== 'valider') return;
        const serree = ['O', 'A'].find(g => S.vis[g] > 0);
        if (!serree) { S.q.ok = true; return dire('<p><b>Vis desserrées.</b> Le détendeur est fermé : rien ne passera vers le chalumeau quand la bouteille s’ouvrira.</p>', 'ok'); }
        faute('vis', 'Vis de détente pas desserrée avant d’ouvrir la bouteille');
        dire(`<p>La vis ${DE[serree]} est encore serrée : à l’ouverture de la bouteille, la pression arriverait d’un coup dans le détendeur. Desserrez-la, sens inverse des aiguilles d’une montre.</p>`, 'bad');
      } },
    { id: 'ordre', temps: 3, petit: 'Les robinets du chalumeau sont fermés', titre: 'Quelle bouteille ouvrez-vous en premier ?',
      zoom: () => Scene.cadre([40, 60, 460, 300]),
      ui: () => `${choix(R.Q_ORDRE)}${S.q.bonc != null ? suite() : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_ORDRE, 'c', +v.split(':')[1]) },
    ...['O', 'A'].map(g => ({ id: 'ouvrir-' + g, temps: 3, petit: 'À la main, en regardant le manomètre haute pression', titre: `Ouvrez la bouteille ${DE[g]}`,
      zoom: () => Scene.vueJauges(S, g),
      ui() {
        const l = g === 'O' ? R.Q_OUVRIR_O : R.Q_OUVRIR_A;
        if (S.q.bonc2 != null) return S.p[g].hp > (g === 'O' ? 190 : 14) ? suite() : '<p class="aide">La pression monte…</p>';
        if (g === 'O' && S.q.bonc1 == null) return `<p class="question">Où vous placez-vous ?</p>${choix(R.Q_PLACE, 'c1')}`;
        return `<p class="question">Comment ouvrez-vous ?</p>${choix(l, 'c2')}`;
      },
      act(a, v) {
        if (a !== 'choix') return;
        const [cle, i] = v.split(':');
        if (cle === 'c1') return repondre(R.Q_PLACE, 'c1', +i);
        repondre(g === 'O' ? R.Q_OUVRIR_O : R.Q_OUVRIR_A, 'c2', +i, () => { S.b[g].ouverte = true; });
      } })).flatMap(e => [e, {
      id: 'bp-' + e.id.slice(-1), temps: 3, g: e.id.slice(-1),
      petit: () => S.niveau === 2 ? `Plage du document du professeur pour la buse de ${S.buse} l/h` : 'Valeur donnée par le professeur, d’après la notice du chalumeau',
      titre() { return `Réglez la basse pression ${DE[this.g]} : ${consigne(this.g)}`; },
      zoom() { return Scene.vueJauges(S, this.g); },
      ui() { return S.q.ok ? suite() : `${vis(this.g, 'lisez le manomètre BP')}<div class="ligne-suite">${btn('C’est réglé', 'valider', '', 'btn-plein')}</div>`; },
      act(a, v) {
        const g = this.g;
        if (a === 'vis') {
          tournerVis(v);
          if (g === 'A' && S.vis.A > 1.5 + 1e-9 && faute('bpA-max', 'Acétylène réglé au-dessus de 1,5 bar', true))
            dire('<p><b>Danger : plus de 1,5 bar d’acétylène.</b> Au-delà, l’acétylène devient instable et peut se décomposer. Redescendez tout de suite.</p>', 'bad');
          return;
        }
        if (a !== 'valider') return;
        const c = S.consigneBP[g], [mini, maxi] = Array.isArray(c) ? c : [c, c], e = VIS[g].pas / 2;
        if (S.vis[g] > mini - e && S.vis[g] < maxi + e) { S.q.ok = true; return dire(`<p><b>Réglé.</b> Le manomètre basse pression ${DE[g]} indique ${bar(S.vis[g])} bar.</p>`, 'ok'); }
        faute('bp-' + g, `Basse pression ${DE[g]} mal réglée`);
        dire(`<p>Le manomètre indique ${bar(S.vis[g])} bar ; la consigne est ${consigne(g)}. ${S.vis[g] < mini ? 'Serrez' : 'Desserrez'} un peu la vis.</p>`, 'bad');
      } }]),
    { id: 'fuite', temps: 3, petit: 'Au pinceau, sur chaque raccord numéroté', titre: 'Cherchez les fuites à l’eau savonneuse',
      entrer: () => { S.points = { 1: null, 2: null, 3: null, 4: null, 5: null }; },
      zoom: () => Scene.vueBulles(S),
      ui() {
        const n = S.fuitePoint, trouvee = S.points[n] === 'fuite';
        if (Object.values(S.points).every(t => t === 'ok')) return suite();
        return `<div class="choix cinq">${[1, 2, 3, 4, 5].map(k => btn('Raccord ' + k, 'savon', k, S.points[k] === 'ok' ? 'juste' : S.points[k] === 'fuite' ? 'faux' : '')).join('')}</div>
          ${trouvee ? `<div class="ligne-suite">${btn('Je préviens le professeur, qui fait resserrer le raccord ' + n, 'reparer', '', 'btn-plein')}</div>` : ''}
          <div class="ligne-suite">${btn('Approcher la flamme pour voir si ça fuit', 'flamme', '', 'piege')}</div>`;
      },
      cible(c) { if (/^point-\d$/.test(c)) this.act('savon', c.slice(-1)); },
      act(a, v) {
        if (a === 'flamme') { faute('fuite-flamme', 'Fuite cherchée à la flamme', true); return dire('<p><b>Danger : jamais de flamme pour chercher une fuite.</b> Le gaz qui fuit s’enflamme ou explose. Toujours l’eau savonneuse.</p>', 'bad'); }
        if (a === 'reparer') { S.fuiteReparee = true; S.points[S.fuitePoint] = null; return dire(`<p>On ne serre jamais un raccord sous pression : le professeur fait refermer la bouteille et vider le poste, resserre le raccord ${S.fuitePoint}, puis le poste est remis en pression. Repassez de l’eau savonneuse dessus pour vérifier.</p>`, 'wait'); }
        if (a !== 'savon') return;
        const n = +v; S.dernierPoint = n;
        S.points[n] = n === S.fuitePoint && !S.fuiteReparee ? 'fuite' : 'ok';
        dire(S.points[n] === 'fuite' ? `<p><b>Des bulles sur le raccord ${n} : il fuit.</b> On ne touche pas à la flamme ; on prévient le professeur.</p>` : `<p>Raccord ${n} : aucune bulle.</p>`, S.points[n] === 'fuite' ? 'bad' : 'ok');
      } },
    { id: 'visa', temps: 3, petit: 'Pas de visa, pas d’allumage', titre: 'Faites viser le poste',
      zoom: () => Scene.vueJauges(S),
      ui: () => S.q.ok ? suite('Allumer') : `<div class="ligne-suite">${btn('J’appelle le professeur', 'valider', '', 'btn-plein')}</div>`,
      act(a) { if (a === 'valider') { S.q.ok = true; S.points = null; dire('<p><b>Poste visé.</b> Le professeur a vérifié vos protections, les bouteilles, les pressions et l’étanchéité. Vous pouvez allumer, devant lui.</p>', 'ok'); } } },

    /* TEMPS 4, 5, 6 — Allumer, régler, éteindre et refermer le poste */
    { id: 'allumer', temps: 4, petit: 'Lunettes sur les yeux, buse vers une zone libre, le professeur à côté', titre: 'Allumez le chalumeau',
      zoom: () => Scene.vueFlamme(F()),
      ui: () => `${robinets()}<div class="actions">${btn('Allumeur à pierre', 'allumer', 'pierre', 'btn-feu')}${btn('Briquet', 'allumer', 'briquet')}</div>`,
      act(a, v) { if (a === 'tourner') return tourner(v); if (a === 'allumer') allumer(v); } },
    { id: 'regler', temps: 5, petit: () => `Consigne ${Math.min(S.n + 1, 4)} sur 4 · réglez puis montrez`, titre: () => FLAMMES[S.consignes[S.n]] || '',
      zoom: () => Scene.vueFlamme(F()),
      ui: () => `${robinets()}<div class="actions">${btn('Allumeur à pierre', 'allumer', 'pierre', 'btn-feu')}${btn('Je montre ma flamme', 'montrer', '', 'btn-plein')}</div>`,
      act(a, v) { if (a === 'tourner') return tourner(v); if (a === 'allumer') return allumer(v); if (a === 'montrer') montrer(); } },
    { id: 'eteindre', temps: 6, petit: 'Le travail est fini', titre: 'Éteignez dans l’ordre',
      zoom: () => Scene.vueFlamme(F()),
      ui: () => robinets(),
      act(a, v) { if (a === 'tourner') tourner(v); } },
    { id: 'fermer', temps: 6, petit: 'Fin de travail : on referme le poste', titre: 'Fermez les bouteilles',
      zoom: () => Scene.vueJauges(S),
      ui: () => S.b.O.ouverte || S.b.A.ouverte ? `<div class="choix">${S.b.A.ouverte ? btn('Fermer la bouteille d’acétylène', 'fermer', 'A') : ''}${S.b.O.ouverte ? btn('Fermer la bouteille d’oxygène', 'fermer', 'O') : ''}</div>` : suite(),
      cible(c) { if (c === 'robinet-O' || c === 'robinet-A') this.act('fermer', c.slice(-1)); },
      act(a, v) {
        if (a !== 'fermer' || !S.b[v].ouverte) return;
        if (v === 'O' && S.b.A.ouverte) { faute('fermer-ordre', 'Bouteille d’oxygène fermée avant l’acétylène'); dire('<p><b>Non.</b> Le gaz qui brûle se ferme en premier : la bouteille d’acétylène d’abord.</p>', 'bad'); return; }
        S.b[v].ouverte = false;
        dire(v === 'A' ? '<p><b>Bouteille d’acétylène fermée.</b> Puis celle d’oxygène.</p>' : '<p><b>Les deux bouteilles sont fermées.</b> Les manomètres indiquent encore une pression : du gaz reste dans le poste.</p>', 'ok');
      } },
    { id: 'purger', temps: 6, petit: 'Ouvrez les deux robinets du chalumeau, jusqu’à zéro aux quatre manomètres', titre: 'Purgez le poste',
      zoom: () => Scene.vueJauges(S),
      ui: () => S.q.ok ? suite() : robinets(),
      act(a, v) { if (a === 'tourner') tourner(v); },
      tic() {
        if (S.q.ok) return;
        if (['O', 'A'].every(g => S.p[g].hp === 0 && S.p[g].bp === 0)) {
          S.q.ok = true; dire('<p><b>Les quatre manomètres sont à zéro.</b> Le poste est vide de gaz.</p>', 'ok'); afficher(true);
        }
      } },
    { id: 'vis-fin', temps: 6, petit: 'Sens inverse des aiguilles d’une montre, à fond', titre: 'Desserrez les vis de détente',
      zoom: () => Scene.vueVis(S),
      ui: () => S.vis.O === 0 && S.vis.A === 0 ? suite() : `${vis('O')}${vis('A')}`,
      act(a, v) {
        if (a !== 'vis') return;
        tournerVis(v);
        if (S.vis.O === 0 && S.vis.A === 0) { dire('<p><b>Vis desserrées.</b> Le détendeur est au repos.</p>', 'ok'); afficher(true); }
      } },
    { id: 'robinets-fin', temps: 6, petit: 'Dernier geste', titre: 'Refermez les robinets du chalumeau',
      zoom: () => Scene.cadre([760, 360, 360, 200]),
      ui: () => S.o2 === 0 && S.ac === 0 ? suite() : robinets(),
      act(a, v) { if (a === 'tourner') { tourner(v); if (S.o2 === 0 && S.ac === 0) afficher(true); } } },
    { id: 'demonter', temps: 6, petit: 'Poste mobile : il repart avec vous', titre: 'Et les détendeurs ?',
      zoom: () => Scene.cadre([40, 20, 460, 300]),
      ui: () => `${choix(R.Q_DEMONTER)}${S.q.bonc != null ? `<div class="ligne-suite">${btn('Voir le bilan →', 'bilan', '', 'btn-plein')}</div>` : ''}`,
      act(a, v) {
        if (a === 'choix') repondre(R.Q_DEMONTER, 'c', +v.split(':')[1], () => { S.b.O.monte = S.b.A.monte = false; S.tuyau.O = S.tuyau.A = false; });
        if (a === 'bilan') terminer();
      } },
    { id: 'bilan', temps: 7, petit: 'Bilan', titre: () => S.fautes.length ? 'Poste refermé' : 'Poste refermé, sans faute',
      zoom: () => Scene.vueFlamme({ allume: false }),
      ui: () => `<div class="choix">${btn('Rejouer au niveau 1', 'niveau', '1')}${btn('Rejouer au niveau 2', 'niveau', '2')}</div>` }
  ];
  /* ---------- gestes communs ---------- */
  function tournerVis(v) {
    const [g, s] = v.split(':'), V = VIS[g];
    S.vis[g] = borne(Math.round((S.vis[g] + V.pas * +s) / V.pas) * V.pas, 0, V.max);
    dessiner();
  }
  function tourner(v) {
    Son.init();
    if (S.fin) return;
    const [r, s] = v.split(':'), sens = +s, avant = S[r];
    S[r] = borne(S[r] + sens, 0, PAS_MAX);
    if (S[r] === avant) return dire(sens > 0 ? '<p>Le robinet est ouvert en grand.</p>' : '<p>Le robinet est déjà fermé.</p>');
    if (S.premier === null && sens > 0 && !S.allume) S.premier = r;
    if ($('pos-' + r)) $('pos-' + r).textContent = fmtTours(S[r]);
    document.querySelectorAll('.robinet').forEach(l => l.classList.toggle('repere', l.id === 'ligne-' + r));
    apresTour();
    dessiner();
  }
  function apresTour() {
    const e = E();
    if (!S.allume) {
      if (S.ac > 0 && !S.fuiteDepuis) S.fuiteDepuis = Date.now();
      if (S.ac === 0) { S.fuiteDepuis = 0; S.fuiteSignalee = false; }
      if (S.ac === 0 && S.o2 === 0) S.premier = null;
      if (e.id === 'eteindre' && S.ac === 0 && S.o2 === 0) avancer();
      return;
    }
    if (S.ac === 0) {
      S.allume = false;
      if (S.o2 > 0) dire(e.id === 'eteindre'
        ? '<p><b>Bien : l’acétylène d’abord.</b> La flamme s’éteint ; un peu d’oxygène s’échappe et chasse les gaz de la buse.</p><p>Fermez maintenant l’oxygène.</p>'
        : '<p>Flamme éteinte, acétylène fermé d’abord : c’est le bon ordre. Fermez l’oxygène, puis rallumez si besoin.</p>', 'ok');
      else if (e.id === 'eteindre') avancer();
      return;
    }
    if (S.o2 > 0 && qA() < 0.34 && e.id !== 'eteindre') {
      S.allume = false; claquer(); S.fuiteDepuis = Date.now();
      faute('claque-' + S.fautes.length, 'Claquement : débit d’acétylène trop faible');
      dire('<p><b>Claquement !</b> Le débit est trop faible pour la buse : la flamme rentre dans la buse.</p><p>Fermez d’abord l’acétylène, puis l’oxygène, et rallumez avec plus d’acétylène.</p>', 'bad');
      return;
    }
    if (qA() > 1.95 && rapport() > 0.9) {
      S.allume = false; S.fuiteDepuis = Date.now();
      faute('souffle', 'Flamme soufflée : trop de débit');
      dire('<p><b>Flamme soufflée.</b> Trop de gaz pour la buse : la flamme s’est décollée puis éteinte, et le gaz s’échappe.</p><p>Fermez l’acétylène, puis l’oxygène.</p>', 'bad');
      return;
    }
    if (S.o2 === 0) {
      if (!S.fumeeSignalee) {
        S.fumeeSignalee = true;
        faute(e.id === 'eteindre' ? 'eteindre-ordre' : 'fumee', e.id === 'eteindre' ? 'Extinction : oxygène fermé avant l’acétylène' : 'Oxygène fermé, flamme allumée : fumée noire');
        dire(`<p><b>Fumée noire.</b> ${maj(VUE.acetylene)}.</p><p>Pour éteindre, on ferme <b>l’acétylène d’abord</b>, jamais l’oxygène.</p>`, 'bad');
      }
      return;
    }
    S.fumeeSignalee = false;
    if (qA() > 1.45) dire('<p>Le dard se <b>décolle</b> de la buse : trop de débit. Réduisez l’acétylène (puis l’oxygène).</p>', 'wait');
  }
  function allumer(v) {
    Son.init();
    if (S.allume) return dire('<p>La flamme est déjà allumée.</p>');
    if (v === 'briquet') { faute('briquet', 'Allumage au briquet', true); return dire('<p><b>Danger : jamais de briquet.</b> Près de la flamme, il peut exploser dans la main. On allume à l’allumeur à pierre.</p>', 'bad'); }
    if (!S.ac && !S.o2) return dire('<p>Rien ne s’allume : aucun gaz ne sort. Ouvrez les robinets du chalumeau.</p>', 'wait');
    if (!S.ac) return dire('<p>Seul l’oxygène sort : il ne brûle pas, il fait brûler. Il manque l’acétylène.</p>', 'wait');
    if (qA() < 0.5) { claquer(); faute('allumage-faible', 'Allumage : acétylène pas assez ouvert'); return dire('<p><b>Claquement à l’allumage :</b> le débit est trop faible. L’acétylène s’ouvre <b>largement</b> avant d’allumer.</p>', 'bad'); }
    if (rapport() > 0.6) { claquer(); faute('allumage-o2', 'Allumage : trop d’oxygène'); return dire('<p><b>Claquement à l’allumage :</b> trop d’oxygène. On n’ouvre l’oxygène qu’<b>un peu</b> avant d’allumer.</p>', 'bad'); }
    S.allume = true; S.fuiteDepuis = 0; S.fuiteSignalee = false;
    if (!S.o2) { S.fumeeSignalee = true; faute('allumage-seul', 'Allumage à l’acétylène seul'); dire(`<p>Allumée, mais <b>fumée noire</b>. ${maj(VUE.acetylene)}.</p><p>L’ordre : un peu d’oxygène, puis l’acétylène largement, puis on allume. Ouvrez l’oxygène peu à peu.</p>`, 'bad'); }
    else if (S.premier === 'ac') { faute('allumage-ordre', 'Allumage : acétylène ouvert avant l’oxygène'); dire('<p>Allumée. Mais l’ordre est : <b>un peu d’oxygène d’abord</b>, puis l’acétylène largement.</p><p>Ajoutez maintenant de l’oxygène peu à peu.</p>', 'wait'); }
    else dire('<p><b>Bien allumé.</b> La flamme est très carburante : c’est normal à l’allumage.</p><p>Ajoutez de l’oxygène peu à peu jusqu’à la flamme demandée.</p>', 'ok');
    if (E().id === 'allumer') avancer(true); else dessiner();
  }
  function montrer() {
    if (!S.allume) return dire('<p>Pas de flamme à montrer : rallumez d’abord.</p>', 'wait');
    const vu = sorte(), but = S.consignes[S.n], attendu = but === 'braser' ? 'neutre' : but;
    if (qA() < 0.5) { faute('petite-' + S.n, 'Flamme montrée trop petite'); return dire('<p>Flamme trop petite : elle risque de claquer. Ouvrez davantage, dans les mêmes proportions.</p>', 'bad'); }
    if (qA() > 1.45) { faute('decollee-' + S.n, 'Flamme montrée décollée'); return dire('<p>Le dard est décollé de la buse : réduisez l’acétylène, puis l’oxygène.</p>', 'bad'); }
    if (vu === attendu) {
      S.n++;
      const plus = but === 'braser' ? ' Pour braser le cuivre : <b>flamme neutre</b>, jamais oxydante, qui oxyde le cuivre et empêche la brasure de couler.' : '';
      dire(`<p><b>Validé : ${FLAMMES[vu].toLowerCase()}.</b> ${maj(VUE[vu])}.${plus}</p><p>${S.n >= S.consignes.length ? 'Les quatre flammes sont réglées. Éteignez maintenant le chalumeau, dans l’ordre.' : 'Consigne suivante en haut.'}</p>`, 'ok');
      if (S.n >= S.consignes.length) avancer(true); else afficher(true);
      return;
    }
    faute('flamme-' + S.n + '-' + vu, `Flamme ${vu === 'acetylene' ? 'à l’acétylène seul' : vu} montrée au lieu de ${attendu}`);
    const conseil = vu === 'acetylene' ? 'Ouvrez l’oxygène.'
      : ({ carburante: 'Il manque de l’oxygène : ouvrez l’oxygène peu à peu.', oxydante: 'Trop d’oxygène : refermez un peu l’oxygène.' }[vu]
         || (attendu === 'carburante' ? 'Il faut un excès d’acétylène : refermez un peu l’oxygène.' : 'Il faut un excès d’oxygène : ouvrez un peu plus l’oxygène.'));
    dire(`<p><b>Pas encore.</b> Le professeur voit : ${VUE[vu]}.</p><p>${conseil}</p>`, 'bad');
  }
  function claquer() { S.clac = true; Son.claque(); setTimeout(() => { S.clac = false; dessiner(); }, 750); }
  /* ---------- ce que le moteur commun demande ---------- */
  return {
    neuf, etapes: ETAPES, code: 'CHAL', jauges: Scene.JAUGES,
    sansFaute: 'Le poste a été monté, réglé et refermé dans l’ordre.',
    revoir: f => f.temps <= 3 ? '2-1' : '2-2',
    repere: c => ({ 'bouton-ac': 'ligne-ac', 'bouton-o2': 'ligne-o2' })[c],
    scene() {
      S.chute.O = S.allume ? .06 * qO() : 0; S.chute.A = S.allume ? .05 * qA() : 0;
      return Scene.poste(S, F());
    },
    physique,
    son() {
      const r = rapport();
      Son.regler(S.allume ? Math.min(.5, .15 + .2 * qA()) : 0, S.allume ? borne((r - 1.15) * .35, 0, .14) : (gazSort() ? .03 : 0));
    },
    /* le gaz qui s'échappe sans flamme ; la bouteille qui finit de monter en pression */
    tic() {
      const e = E();
      if ((e.id === 'allumer' || e.id === 'regler') && !S.allume && S.ac > 0 && S.fuiteDepuis && !S.fuiteSignalee && Date.now() - S.fuiteDepuis > 12000) {
        S.fuiteSignalee = true; faute('gaz-sans-flamme', 'Acétylène ouvert sans flamme');
        dire('<p><b>Le gaz s’échappe sans flamme.</b> L’allumeur doit être prêt <b>avant</b> d’ouvrir : allumez tout de suite, ou fermez l’acétylène.</p>', 'bad');
        return true;
      }
      if (/^ouvrir-/.test(e.id) && S.q.bonc2 != null && !S.q.pret && S.p[e.id.slice(-1)].hp > (e.id.endsWith('O') ? 190 : 14)) { S.q.pret = true; afficher(true); }
      return false;
    }
  };
});
