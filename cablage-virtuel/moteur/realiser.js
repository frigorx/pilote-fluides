/* L'étape 5 « Réaliser » (docs/PLAN-2026-09-29-REFONTE-ACCES.md § 5, maquette validée par Franck, écran 4) : de l'écran à la
   vraie platine. moteur/cablage.js dessine la platine (vrais appareils quand l'exercice en a) avec les fils gardés par l'étape
   Câbler, sans geste de câblage ; ici, la colonne d'à côté : hors tension · le matériel · votre ordre de câblage · avant
   d'appeler le professeur. Rien d'inventé : le matériel vient de l'exercice, l'ordre des fils de l'élève. La grille 0-4 du réel
   reste sur la feuille : le professeur la remplit après son contrôle et sa mise sous tension.
   Adresse : jouer.html?ex=<id>&activite=realiser[&atelier=deux|fil]. */
(function () {
'use strict';
const $ = s => document.querySelector(s);
let fait = false;
document.addEventListener('cablage-realiser', demarrer);
if (window.CABLAGE_API && window.CABLAGE_API.realiserPret) demarrer();   // la platine était déjà dessinée

function el(tag, attrs, texte) {
  const e = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => { if (k === 'class') e.className = v; else e.setAttribute(k, v); });
  if (texte != null) e.textContent = texte;
  return e;
}
function demarrer() {
  if (fait) return; fait = true;
  const API = window.CABLAGE_API, EX = API && API.ex();
  if (!EX || API.activite !== 'realiser') return;
  const memo = API.memoire(), fils = memo && Array.isArray(memo.fils) ? memo.fils : [];
  const cle = (a, b) => [a, b].sort().join('|');
  const fixes = new Set(API.liaisonsFixes().map(([a, b]) => cle(a, b)));

  const section = el('section', { class: 'panneau', id: 'realiser', 'aria-label': 'Réaliser' });
  const entete = el('div', { class: 'entete' }); entete.append(el('b', null, 'Réaliser'), ' ', el('span', null, 'de l’écran à votre platine'));
  const col = el('div', { class: 'colonne' });
  section.append(entete, col);

  // ---- hors tension
  const danger = el('div', { class: 'bloc danger' });
  danger.append(el('h3', null, 'Hors tension, toujours'),
    el('p', null, 'Vous câblez platine débranchée. Vous ne mettez jamais sous tension vous-même : c’est le professeur qui le fait, après son contrôle.'));
  col.append(danger);

  // ---- le matériel (l'arrivée réseau et les masses ne sont pas du matériel à poser)
  const rang = a => (a.rang === 5 ? 3.5 : a.rang);   // l'ordre de la nomenclature : protections, commande, puissance, bornier, récepteurs
  const apps = EX.appareils.filter(a => a.rang > 0).sort((p, q) => rang(p) - rang(q));
  const bornier = apps.filter(a => a.rang === 5);
  const mat = el('div', { class: 'bloc', id: 'bloc-materiel' });
  mat.append(el('h3', null, 'Le matériel'));
  const tm = el('table');
  const tete = el('tr'); ['Repère', 'Désignation', 'Qté'].forEach(t => tete.append(el('th', null, t))); tm.append(tete);
  let bornierFait = false;
  apps.forEach(a => {
    const tr = el('tr');
    if (a.rang === 5) {
      if (bornierFait) return; bornierFait = true;
      const reel = API.reelle() && EX.reel ? EX.reel.appareils : null;   // en vrais appareils, le modèle dit les bornes vert-jaune
      const vj = reel ? bornier.filter(b => reel[b.repere] && /(^|[_-])vj($|[_-])/.test(reel[b.repere].modele || '')).length : 0;
      tr.append(el('td', null, API.compacter(bornier.filter(b => !API.sansRepere(b.repere)).map(b => b.repere)) +
                (bornier.some(b => API.sansRepere(b.repere)) ? ' (et les bornes de terre sans repère)' : '')),
        el('td', null, (bornier.length > 1 ? 'Bornes du bornier' : 'Borne du bornier') + (vj ? ', dont ' + vj + ' vert-jaune' : '')),
        el('td', { class: 'n' }, String(bornier.length)));
    } else tr.append(el('td', null, a.repere), el('td', null, a.nom), el('td', { class: 'n' }, '1'));
    tm.append(tr);
  });
  const boite = el('div', { class: 'tab' }); boite.append(tm); mat.append(boite);
  if (EX.reels && Object.keys(EX.reels).length > 1 && API.reelle()) {   // le domestique : mural ou 22 mm, au choix du professeur
    const noms = { mural: 'mural (interrupteurs, poussoirs et douilles)', '22mm': '22 mm (boutons, voyants et boutons tournants dans leurs boîtes)' };
    mat.append(el('p', { class: 'note' }, 'Appareillage : ' + (noms[API.materiel()] || API.materiel()) + '.'));
  }
  col.append(mat);

  // ---- votre ordre de câblage : les fils posés à l'écran, dans l'ordre de l'élève
  const ordre = el('div', { class: 'bloc', id: 'bloc-ordre' });
  ordre.append(el('h3', null, 'Votre ordre de câblage'));
  col.append(ordre);
  if (!fils.length) {
    ordre.classList.add('vide');
    // 30/09 (constat X8) : stockage bloqué, on le dit honnêtement (l'élève a peut-être câblé : c'est le navigateur qui n'a rien gardé)
    if (API.stockageBloque && API.stockageBloque()) ordre.append(el('p', null, 'Votre navigateur n’a pas gardé vos fils : il ne garde rien sur cet appareil.'),
      el('p', { class: 'note' }, 'Câblez à l’écran (étape 3), puis venez ici par « Réaliser (étape 5) », dans le même onglet : vos fils suivront.'));
    else ordre.append(el('p', null, 'Aucun fil n’est gardé pour cet exercice sur cet appareil.'),
      el('p', { class: 'note' }, 'Câblez d’abord à l’écran : chaque fil posé y est gardé pour cette étape, dans votre ordre.'));
    const aller = el('button', { class: 'principal', id: 'btn-aller-cabler' }, 'Aller câbler à l’écran (étape 3)');
    aller.onclick = () => API.aller('cabler', API.mode);
    ordre.append(aller);
    document.querySelector('.scene').append(section);
    return;
  }
  // 30/09 (constat E14) : la liste et le compte en tête de platine disent la même chose : seuls les fils à câbler sont numérotés ;
  // en vrais appareils, une liaison faite par embrochage (le relais thermique sous son contacteur) est dite à part, sans numéro
  const aCabler = fils.filter(f => API.borne(f.de) && API.borne(f.a)), aPart = fils.length - aCabler.length;
  const nEmbr = fils.filter(f => !API.borne(f.de) && !API.borne(f.a) && fixes.has(cle(f.de, f.a))).length;
  ordre.append(el('p', { class: 'note', id: 'compte-ordre' }, aCabler.length + (aCabler.length > 1 ? ' fils à câbler' : ' fil à câbler') + ', dans votre ordre. Cochez à mesure.' +
    (nEmbr ? ' Et ' + nEmbr + (nEmbr > 1 ? ' liaisons faites' : ' liaison faite') + ' par embrochage, rien à câbler.' : '') +
    (aPart > nEmbr ? ' ' + (aPart - nEmbr) + ' fil(s) sans borne sur cette platine.' : '')));
  // le dernier contrôle à l'écran, s'il a eu lieu après le dernier fil : on ne reproduit pas une erreur sur la vraie platine
  let controle = null;
  try {
    const liste = JSON.parse(localStorage.getItem('cablage-virtuel:resultats') || '[]');
    controle = (Array.isArray(liste) ? liste : []).filter(e => e && e.exercice === EX.id && e.activite === 'cabler' && (!memo.date || e.date >= memo.date)).pop() || null;
  } catch (err) { controle = null; }
  const etat = el('p', { class: 'etat-controle' + (controle && controle.niveau === 4 ? ' ok' : ' ko') });
  etat.textContent = controle ? 'Contrôlé à l’écran : niveau ' + controle.niveau + ' sur 4.' + (controle.niveau === 4 ? '' : ' Corrigez à l’écran (étape 3) avant de câbler.')
                              : 'Pas encore contrôlé à l’écran : contrôlez à l’étape 3 avant de câbler.';
  ordre.append(etat);
  const to = el('table', { id: 'ordre-fils' });
  const t2 = el('tr'); ['N°', 'De → à', 'Couleur', 'Posé'].forEach(t => t2.append(el('th', null, t))); to.append(t2);
  let n = 0;
  fils.forEach(f => {
    const aPoser = API.borne(f.de) && API.borne(f.a), embroche = !API.borne(f.de) && !API.borne(f.a) && fixes.has(cle(f.de, f.a));
    const tr = el('tr');
    tr.append(el('td', { class: 'n' }, aPoser ? String(++n) : '—'), el('td', null, API.lib(f.de) + ' → ' + API.lib(f.a)));
    const tc = el('td', { class: 'couleur-fil' }), pastille = el('span', { class: 'teinte ' + f.couleur, 'aria-hidden': 'true' });
    if (f.couleur !== 'vert-jaune' && API.couleurs[f.couleur]) pastille.style.background = API.couleurs[f.couleur];
    tc.append(pastille, f.couleur); tr.append(tc);
    const tp = el('td', { class: 'case' });
    if (!aPoser) { tr.classList.add('embroche'); tp.append(el('small', null, embroche ? 'par embrochage, rien à câbler' : 'pas sur cette platine')); }
    else { const l = el('label'), c = el('input', { type: 'checkbox', 'aria-label': 'Fil ' + n + ' posé' }); l.append(c); tp.append(l); c.onchange = () => tr.classList.toggle('pose', c.checked); }
    tr.append(tp); to.append(tr);
  });
  const boite2 = el('div', { class: 'tab' }); boite2.append(to); ordre.append(boite2);

  // ---- avant d'appeler le professeur
  const avant = el('div', { class: 'bloc', id: 'bloc-avant' });
  avant.append(el('h3', null, 'Avant d’appeler le professeur'));
  ['Chaque fil est sur la bonne borne : comparez avec l’écran.', 'Chaque fil a la bonne couleur : celle de votre ordre de câblage.',
   'Chaque fil est serré : tirez dessus.', 'Les goulottes sont fermées, les outils rangés.'].forEach(t => {
    const l = el('label', { class: 'coche' }), c = el('input', { type: 'checkbox' }); l.append(c, el('span', null, t)); avant.append(l);
  });
  const fini = el('button', { class: 'principal gros', id: 'btn-fini' }, 'J’ai fini : j’appelle le professeur');
  const message = el('p', { class: 'appel', id: 'message-fini', role: 'status' }, 'Levez la main. Le professeur contrôle votre platine, puis la met sous tension. Il note le réel sur votre feuille (grille 0 à 4).');
  message.hidden = true;
  fini.onclick = () => {
    fini.hidden = true; message.hidden = false;
    API.dire('Levez la main : le professeur contrôle votre platine.', 'ok', 'Il la met sous tension lui-même, puis note le réel sur votre feuille.');
    try {
      const cle = 'cablage-virtuel:resultats', liste = JSON.parse(localStorage.getItem(cle) || '[]');
      liste.push({ date: new Date().toISOString(), exercice: EX.id, activite: 'realiser', fini: true, mode: API.mode, atelier: API.atelier, fils: fils.length,
                   poses: to.querySelectorAll('input:checked').length, verifs: avant.querySelectorAll('input:checked').length });
      localStorage.setItem(cle, JSON.stringify(liste.slice(-200)));
    } catch (err) { /* stockage indisponible : l'appel au professeur suffit */ }
    const e5 = $('#activites [data-activite="realiser"]'); if (e5) { e5.classList.add('faite'); e5.setAttribute('aria-label', 'Étape 5 : Réaliser, réussie'); }   // le numéro reste, la coche vient à côté
  };
  avant.append(fini, message);
  col.append(avant);
  document.querySelector('.scene').append(section);
}
})();
