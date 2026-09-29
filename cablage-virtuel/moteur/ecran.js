/* L'affichage au choix de l'utilisateur (Franck, 28/09/2026, sur le PC-tablette de la classe : « on doit pouvoir choisir :
   afficher les deux schémas, un seul, en plein écran, réduire un peu… selon les besoins et les préférences ; rien d'office »).
   Un bouton « Affichage » dans le bandeau ouvre un menu clair :
   - la disposition : côte à côte · l'un sous l'autre · la platine seule · la carte seule ;
   - la place de la carte quand les deux sont là : petite · moyenne · grande ;
   - plein écran · la carte sur un autre écran · les repères (nomenclature) montrés ou repliés.
   Les choix sont gardés sur l'appareil. Sur un petit écran, le menu s'ouvre UNE fois pour proposer, jamais pour imposer.
   Sur un seul panneau, un gros bouton en tête du panneau bascule vers l'autre. La feuille élève (PDF) est dans « Plus »
   (29/09). Le deuxième écran (vue=carte), les étapes Colorier / Repérer (la carte seule, déjà) et Réaliser ne sont pas
   concernés. */
(function () {
'use strict';
const $ = s => document.querySelector(s);
const CLE = 'cablage-virtuel:affichage';
const PETIT = () => window.innerWidth < 1200 || window.innerHeight < 800;
const DISPOS = [['colonnes', 'Côte à côte', 'la carte à gauche, la platine à droite'],
                ['lignes', 'L’un sous l’autre', 'la carte en haut, la platine en bas'],
                ['platine', 'La platine seule', 'la carte d’un appui, quand on en a besoin'],
                ['carte', 'La carte seule', 'pour lire le schéma en grand']];
const TAILLES = [['petite', 'Petite'], ['moyenne', 'Moyenne'], ['grande', 'Grande']];

let fait = false;
document.addEventListener('cablage-pret', demarrer);
if (document.querySelector('#platine-corps svg')) demarrer();   // l'exercice était déjà là (rechargement servi du cache)
function demarrer() {
  if (fait) return; fait = true;
  const API = window.CABLAGE_API;
  if (!API || API.vue === 'carte' || API.activite === 'realiser') return;   // Réaliser : la platine seule, sa colonne à côté
  const EX = API.ex(), ID = EX && EX.id;
  const surCarte = document.body.classList.contains('sur-carte');
  // (la feuille élève est passée dans « Plus », 29/09 : moteur/cablage.js, majFeuille)
  if (surCarte) return;   // colorier, repérer : la carte est seule, rien à choisir

  // ---- les préférences, gardées sur l'appareil
  // sans choix : côte à côte sur un écran large, l'un sous l'autre sur un écran étroit ou en portrait (comme avant)
  let pref = { dispo: window.innerWidth >= 900 && window.innerWidth >= window.innerHeight ? 'colonnes' : 'lignes', taille: 'moyenne', reperes: true, propose: false };
  try { Object.assign(pref, JSON.parse(localStorage.getItem(CLE) || '{}')); } catch (err) { /* stockage indisponible */ }
  const garder = () => { try { localStorage.setItem(CLE, JSON.stringify(pref)); } catch (err) { /* stockage indisponible */ } };

  // ---- le bouton du bandeau
  const barre = $('.barre');
  const ba = document.createElement('button'); ba.id = 'btn-affichage'; ba.className = 'affichage'; ba.textContent = 'Affichage'; ba.title = 'Choisir comment afficher la carte et la platine';
  barre.insertBefore(ba, $('#plus'));   // avant « Plus » (29/09) ; à la fin de la barre s'il n'y en a pas
  // le gros bouton de bascule, en tête de chaque panneau (un seul panneau)
  const bascule = (panneau, versDispo, texte) => {
    const b = document.createElement('button'); b.className = 'basculer'; b.textContent = texte; b.onclick = () => { pref.dispo = versDispo; garder(); appliquer(); };
    const entete = panneau.querySelector('.entete'); entete.insertBefore(b, entete.querySelector('.spacer').nextSibling);
  };
  bascule($('#carte'), 'platine', 'Platine ›');
  bascule($('#platine'), 'carte', '‹ Carte');

  // ---- le menu
  const voile = document.createElement('div'); voile.className = 'voile'; voile.id = 'voile-affichage';
  voile.innerHTML =
    '<div class="resultat menu-affichage" role="dialog" aria-labelledby="titre-affichage">' +
    '<h2 id="titre-affichage">Affichage</h2><p class="astuce" id="astuce-affichage" hidden></p>' +
    '<h3>Disposition</h3><div class="choix" id="choix-dispo">' +
    DISPOS.map(([v, nom, aide]) => '<button data-dispo="' + v + '"><b>' + nom + '</b><small>' + aide + '</small></button>').join('') + '</div>' +
    '<h3 id="titre-taille">Place de la carte</h3><div class="choix ligne" id="choix-taille">' +
    TAILLES.map(([v, nom]) => '<button data-taille="' + v + '">' + nom + '</button>').join('') + '</div>' +
    '<h3>Aussi</h3><div class="choix ligne" id="choix-autres">' +
    '<button id="aff-plein-ecran">⛶ Plein écran</button><button id="aff-autre-ecran">Carte sur un autre écran</button>' +
    '<button id="aff-reperes">Repères</button></div>' +
    '<div class="pied"><button class="action principal" id="aff-fermer">Fermer</button></div></div>';
  document.body.appendChild(voile);
  const ouvrir = () => { voile.classList.add('ouvert'); peindre(); };
  const fermer = () => { voile.classList.remove('ouvert'); $('#astuce-affichage').hidden = true; };
  ba.onclick = ouvrir; $('#aff-fermer').onclick = fermer;
  voile.addEventListener('click', e => { if (e.target === voile) fermer(); });
  // 30/09 (constat R4) : Échap ferme la fenêtre, le focus revient au bouton
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && voile.classList.contains('ouvert')) { fermer(); ba.focus(); } });
  voile.querySelectorAll('#choix-dispo button').forEach(b => { b.onclick = () => { pref.dispo = b.dataset.dispo; garder(); appliquer(); peindre(); }; });
  voile.querySelectorAll('#choix-taille button').forEach(b => { b.onclick = () => { pref.taille = b.dataset.taille; garder(); appliquer(); peindre(); }; });
  $('#aff-plein-ecran').onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); };
  document.addEventListener('fullscreenchange', peindre);
  $('#aff-autre-ecran').onclick = () => { const b = $('#btn-detacher'); if (b) b.click(); fermer(); };
  $('#aff-reperes').onclick = () => { pref.reperes = !pref.reperes; garder(); appliquer(); peindre(); };

  function peindre() {
    voile.querySelectorAll('#choix-dispo button').forEach(b => b.classList.toggle('actif', b.dataset.dispo === pref.dispo));
    voile.querySelectorAll('#choix-taille button').forEach(b => b.classList.toggle('actif', b.dataset.taille === pref.taille));
    const deux = pref.dispo === 'colonnes' || pref.dispo === 'lignes';
    $('#titre-taille').hidden = !deux; $('#choix-taille').hidden = !deux;
    if (pref.dispo === 'lignes') $('#titre-taille').textContent = 'Hauteur de la carte'; else $('#titre-taille').textContent = 'Place de la carte';
    const pe = $('#aff-plein-ecran'); pe.classList.toggle('actif', !!document.fullscreenElement); pe.textContent = document.fullscreenElement ? '⛶ Quitter le plein écran' : '⛶ Plein écran';
    const r = $('#aff-reperes'); r.classList.toggle('actif', pref.reperes); r.textContent = pref.reperes ? 'Repères : montrés' : 'Repères : repliés';
  }
  function cadrerPlatine() {   // la platine seule se cadre sur sa zone utile : des appareils du rail 1 aux repères du bornier
    const p = $('#platine'), svg = p && p.querySelector('.corps svg'), z = p && p._zoom;
    const cadre = svg && (svg.querySelector('.fond-platine.cadre') || svg.querySelector('.fond-platine'));
    if (!z || !cadre || !z.cadrer) return;
    const c = cadre.getBBox(); if (!c.width || !c.height) return;
    // 28/09 : quand l'essentiel des bornes est SOUS la platine (appareillage domestique : interrupteurs, poussoirs, douilles),
    // c'est là que l'élève câble — la zone utile les prend ; sinon elle s'arrête au bornier (le réseau et les moteurs se déplient au doigt)
    const bornes = [...svg.querySelectorAll('.borne')].map(el => el.getBBox());
    const dedans = (b) => { const cx = b.x + b.width / 2, cy = b.y + b.height / 2; return cx >= c.x && cx <= c.x + c.width && cy >= c.y && cy <= c.y + c.height; };
    const tout = bornes.filter(dedans).length < bornes.length / 2;
    let u = null;
    bornes.forEach(b => {
      if (!tout && !dedans(b)) return;
      u = u ? { x1: Math.min(u.x1, b.x), y1: Math.min(u.y1, b.y), x2: Math.max(u.x2, b.x + b.width), y2: Math.max(u.y2, b.y + b.height) }
            : { x1: b.x, y1: b.y, x2: b.x + b.width, y2: b.y + b.height };
    });
    const zone = u ? { x: u.x1, y: u.y1, w: u.x2 - u.x1, h: u.y2 - u.y1 + 55 } : { x: c.x, y: c.y, w: c.width, h: c.height };
    const corps = p.querySelector('.corps'), ratio = corps.clientHeight ? corps.clientWidth / corps.clientHeight : null;
    z.cadrer(zone, 30, ratio);
  }
  function appliquer() {
    const b = document.body.classList;
    ['dispo-colonnes', 'dispo-lignes', 'vue-platine', 'vue-carte-seule', 'un-panneau', 'taille-petite', 'taille-moyenne', 'taille-grande', 'reperes-replies'].forEach(c => b.remove(c));
    if (pref.dispo === 'platine') b.add('vue-platine', 'un-panneau');
    else if (pref.dispo === 'carte') b.add('vue-carte-seule', 'un-panneau');
    else b.add('dispo-' + pref.dispo, 'taille-' + pref.taille);
    if (!pref.reperes) b.add('reperes-replies');
    requestAnimationFrame(() => {   // les panneaux ont changé de taille : on les recadre
      const ids = pref.dispo === 'carte' ? ['#carte'] : pref.dispo === 'platine' ? ['#platine'] : ['#carte', '#platine'];
      ids.forEach(s => { const x = $(s + ' button[data-zoom="ajuster"]'); if (x) x.click(); });
      if (pref.dispo === 'platine') cadrerPlatine();
      window.dispatchEvent(new Event('resize'));
    });
  }
  appliquer();
  // 30/09 (constat E5) : un petit écran, la première fois sur cet appareil : plus de fenêtre qui s'ouvre toute seule. Une petite
  // bulle accrochée au bouton « Affichage », qui ne prend pas le doigt et ne couvre pas la zone de travail ; elle se ferme au
  // premier geste ou toute seule après 8 s, et ne revient plus. Pas par-dessus le tutoriel de prise en main.
  if (PETIT() && !pref.propose && new URLSearchParams(location.search).get('tuto') === null) {
    pref.propose = true; garder();
    const bulle = document.createElement('div'); bulle.className = 'bulle-affichage'; bulle.id = 'bulle-affichage'; bulle.setAttribute('role', 'status');
    bulle.textContent = 'Écran petit ? Choisissez votre affichage ici.';
    document.body.appendChild(bulle);
    const r = ba.getBoundingClientRect(), w = bulle.offsetWidth;
    bulle.style.top = (r.bottom + 10) + 'px';
    bulle.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    bulle.style.setProperty('--fl', (r.left + r.width / 2 - parseFloat(bulle.style.left)) + 'px');
    const partir = () => { bulle.remove(); clearTimeout(minuterie); ['pointerdown', 'keydown'].forEach(t => document.removeEventListener(t, partir, true)); };
    const minuterie = setTimeout(partir, 8000);
    ['pointerdown', 'keydown'].forEach(t => document.addEventListener(t, partir, true));
  }
  window.CABLAGE_ECRAN = { pref: () => Object.assign({}, pref), regler: (p) => { Object.assign(pref, p); garder(); appliquer(); }, ouvrir, fermer };
}
})();
