/* L'affichage au choix de l'utilisateur (Franck, 28/09/2026, sur le PC-tablette de la classe : « on doit pouvoir choisir :
   afficher les deux schémas, un seul, en plein écran, réduire un peu… selon les besoins et les préférences ; rien d'office »).
   Un bouton « Affichage » dans le bandeau ouvre un menu clair :
   - la disposition : côte à côte · l'un sous l'autre · la platine seule · la carte seule ;
   - la place de la carte quand les deux sont là : petite · moyenne · grande ;
   - plein écran · la carte sur un autre écran · les repères (nomenclature) montrés ou repliés.
   Les choix sont gardés sur l'appareil. Sur un petit écran, le menu s'ouvre UNE fois pour proposer, jamais pour imposer.
   Sur un seul panneau, un gros bouton en tête du panneau bascule vers l'autre. La feuille élève (PDF) est dans « Plus »
   (29/09). Le deuxième écran (vue=carte) et Réaliser ne sont pas concernés ; en Colorier / Repérer (la carte seule), le menu
   garde le plein écran, le zoom et la voix, sans disposition (02/10). */
(function () {
'use strict';
const $ = s => document.querySelector(s);
const CLE = 'cablage-virtuel:affichage';
const PETIT = () => window.innerWidth < 1200 || window.innerHeight < 800;
const DISPOS = [['colonnes', 'Côte à côte', 'la carte à gauche, la platine à droite'],
                ['lignes', 'L’un sous l’autre', 'la carte en haut, la platine en bas'],
                ['platine', 'La platine seule', 'la carte d’un appui, quand on en a besoin'],
                ['carte', 'La carte seule', 'pour lire le schéma en grand'],
                // 30/09 (Franck : « la platine est petite » ; « une série de travail avec le schéma en papier ») : la platine en grand
                ['papier', 'Schéma sur papier', 'la platine en grand, le schéma sur votre feuille (modes Aidé et Avancé)']];
const TAILLES = [['petite', 'Petite'], ['moyenne', 'Moyenne'], ['grande', 'Grande']];

let fait = false;
document.addEventListener('cablage-pret', demarrer);
document.addEventListener('cablage-carte-prete', demarrer);   // colorier, repérer (02/10)
if (document.querySelector('#platine-corps svg')) demarrer();   // l'exercice était déjà là (rechargement servi du cache)
function demarrer() {
  if (fait) return; fait = true;
  const API = window.CABLAGE_API;
  if (!API || API.vue === 'carte' || API.activite === 'realiser') return;   // Réaliser : la platine seule, sa colonne à côté
  const EX = API.ex(), ID = EX && EX.id;
  // colorier, repérer : la carte est seule, pas de disposition à choisir ; 02/10 (Franck : « la sélection d'affichage a disparu »,
  // le bouton n'existait qu'à l'étape 3) : le menu y reste, pour le plein écran, le zoom, la voix
  const carteSeule = document.body.classList.contains('sur-carte');
  // (la feuille élève est passée dans « Plus », 29/09 : moteur/cablage.js, majFeuille)

  // ---- les préférences, gardées sur l'appareil
  // sans choix : côte à côte sur un écran large, l'un sous l'autre sur un écran étroit ou en portrait (comme avant)
  // 08/10 (audit tablette) : au doigt, la platine seule — la carte d'un appui sur « ‹ Carte » — et les repères repliés (Affichage)
  const tactile = document.body.classList.contains('tactile');
  let pref = { dispo: tactile ? 'platine' : window.innerWidth >= 900 && window.innerWidth >= window.innerHeight ? 'colonnes' : 'lignes', taille: 'moyenne', reperes: !tactile, propose: false };
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
  if (!carteSeule) { bascule($('#carte'), 'platine', 'Platine ›'); bascule($('#platine'), 'carte', '‹ Carte'); }

  // ---- le menu
  const voile = document.createElement('div'); voile.className = 'voile'; voile.id = 'voile-affichage';
  voile.innerHTML =
    '<div class="resultat menu-affichage" role="dialog" aria-labelledby="titre-affichage">' +
    '<h2 id="titre-affichage">Affichage</h2><p class="astuce" id="astuce-affichage" hidden></p>' +
    '<h3 id="titre-dispo">Disposition</h3><div class="choix" id="choix-dispo">' +
    DISPOS.map(([v, nom, aide]) => '<button data-dispo="' + v + '"><b>' + nom + '</b><small>' + aide + '</small></button>').join('') + '</div>' +
    '<h3 id="titre-taille">Place de la carte</h3><div class="choix ligne" id="choix-taille">' +
    TAILLES.map(([v, nom]) => '<button data-taille="' + v + '">' + nom + '</button>').join('') + '</div>' +
    '<h3 id="titre-aussi">Aussi</h3><div class="choix ligne" id="choix-autres">' +
    '<button id="aff-plein-ecran">⛶ Plein écran</button><button id="aff-autre-ecran">Carte sur un autre écran</button>' +
    '<button id="aff-reperes">Repères</button></div>' +
    // 02/10 (Franck : « un réglage de sensibilité de souris ; selon les ordinateurs et les pads, zoomer / dézoomer peut être compliqué »)
    '<h3>Zoom à la molette ou au pavé tactile</h3><div class="choix ligne" id="choix-zoom">' +
    '<label style="display:flex;align-items:center;gap:8px;font:600 14px system-ui,sans-serif">Lent <input type="range" id="aff-zoom" min="0.2" max="3" step="0.1" style="width:170px"> Rapide <span id="aff-zoom-v"></span></label>' +
    '<small style="color:var(--mut,#5b6b7d);font-size:13.5px">Le bouton ⟲ de la carte et de la platine les tourne d’un quart de tour.</small></div>' +
    // 30/09 (voix V3) : la voix du professeur se règle ici, pas par un bouton de plus ; la vitesse, obligatoire (doctrine § 5)
    '<h3>Voix du professeur</h3><div class="choix ligne" id="choix-voix"><button id="aff-voix">Voix</button>' +
    '<label style="display:flex;align-items:center;gap:8px;font:600 14px system-ui,sans-serif">Vitesse <input type="range" id="aff-vitesse" min="0.6" max="1.4" step="0.05" style="width:150px"> <span id="aff-vitesse-v"></span></label></div>' +
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
  const V = () => window.CABLAGE_VOIX;
  $('#aff-voix').onclick = () => { if (V()) { V().regler({ actif: !V().reglage().actif }); peindre(); } };
  $('#aff-vitesse').oninput = (e) => { if (V()) { V().regler({ vitesse: +e.target.value }); peindre(); } };
  const Z = () => window.CABLAGE_ZOOM;
  $('#aff-zoom').oninput = (e) => { if (Z()) { Z().regler(+e.target.value); peindre(); } };

  function peindre() {
    voile.querySelectorAll('#choix-dispo button').forEach(b => b.classList.toggle('actif', b.dataset.dispo === pref.dispo));
    voile.querySelectorAll('#choix-taille button').forEach(b => b.classList.toggle('actif', b.dataset.taille === pref.taille));
    const deux = !carteSeule && (pref.dispo === 'colonnes' || pref.dispo === 'lignes');
    $('#titre-taille').hidden = !deux; $('#choix-taille').hidden = !deux;
    $('#titre-dispo').hidden = carteSeule; $('#titre-aussi').textContent = carteSeule ? 'L’écran' : 'Aussi'; $('#choix-dispo').hidden = carteSeule; $('#aff-autre-ecran').hidden = carteSeule;
    const zs = Z() && Z().sens();
    $('#choix-zoom').hidden = !zs;
    if (zs) { $('#aff-zoom').value = zs; $('#aff-zoom-v').textContent = zs.toFixed(1).replace('.', ',') + '×'; }
    if (pref.dispo === 'lignes') $('#titre-taille').textContent = 'Hauteur de la carte'; else $('#titre-taille').textContent = 'Place de la carte';
    const pe = $('#aff-plein-ecran'); pe.classList.toggle('actif', !!document.fullscreenElement); pe.textContent = document.fullscreenElement ? '⛶ Quitter le plein écran' : '⛶ Plein écran';
    const r = $('#aff-reperes'); r.classList.toggle('actif', pref.reperes); r.textContent = pref.reperes ? 'Repères : montrés' : 'Repères : repliés';
    const v = window.CABLAGE_VOIX && window.CABLAGE_VOIX.reglage();
    $('#choix-voix').hidden = !v;
    if (v) { const b = $('#aff-voix'); b.classList.toggle('actif', v.actif); b.textContent = v.actif ? 'Voix : oui' : 'Voix : non';
             $('#aff-vitesse').value = v.vitesse; $('#aff-vitesse-v').textContent = v.vitesse.toFixed(2).replace('.', ',') + '×'; }
  }
  function cadrerPlatine() {   // la platine seule se cadre sur sa zone utile : toutes les bornes, l'arrivée et les moteurs compris
    const p = $('#platine'), svg = p && p.querySelector('.corps svg'), z = p && p._zoom;
    const cadre = svg && (svg.querySelector('.fond-platine.cadre') || svg.querySelector('.fond-platine'));
    if (!z || !cadre || !z.cadrer) return;
    const c = cadre.getBBox(); if (!c.width || !c.height) return;
    // 29/09 (Franck : « les bandes d'alimentation sont souvent en dehors du champ de vision ») : la zone utile prend TOUTES les
    // bornes ; s'arrêter au bornier laissait l'arrivée du réseau et les moteurs hors champ, et le premier fil part de l'arrivée
    const bornes = [...svg.querySelectorAll('.borne')].map(el => el.getBBox());
    let u = null;
    bornes.forEach(b => {
      u = u ? { x1: Math.min(u.x1, b.x), y1: Math.min(u.y1, b.y), x2: Math.max(u.x2, b.x + b.width), y2: Math.max(u.y2, b.y + b.height) }
            : { x1: b.x, y1: b.y, x2: b.x + b.width, y2: b.y + b.height };
    });
    const zone = u ? { x: u.x1, y: u.y1, w: u.x2 - u.x1, h: u.y2 - u.y1 + 55 } : { x: c.x, y: c.y, w: c.width, h: c.height };
    const corps = p.querySelector('.corps'), ratio = corps.clientHeight ? corps.clientWidth / corps.clientHeight : null;
    z.cadrer(zone, 30, ratio);
  }
  function appliquer() {
    const b = document.body.classList;
    if (carteSeule) { b.toggle('reperes-replies', !pref.reperes); return; }   // la carte seule : sa mise en page est celle de l'étape
    ['dispo-colonnes', 'dispo-lignes', 'vue-platine', 'vue-carte-seule', 'vue-papier', 'un-panneau', 'taille-petite', 'taille-moyenne', 'taille-grande', 'reperes-replies'].forEach(c => b.remove(c));
    if (pref.dispo === 'platine') b.add('vue-platine', 'un-panneau');
    else if (pref.dispo === 'papier') b.add('vue-platine', 'vue-papier', 'un-panneau');
    else if (pref.dispo === 'carte') b.add('vue-carte-seule', 'un-panneau');
    else b.add('dispo-' + pref.dispo, 'taille-' + pref.taille);
    if (!pref.reperes) b.add('reperes-replies');
    requestAnimationFrame(() => {   // les panneaux ont changé de taille : on les recadre
      const seule = pref.dispo === 'platine' || pref.dispo === 'papier';
      const ids = pref.dispo === 'carte' ? ['#carte'] : seule ? ['#platine'] : ['#carte', '#platine'];
      ids.forEach(s => { const x = $(s + ' button[data-zoom="ajuster"]'); if (x) x.click(); });
      if (seule) cadrerPlatine();
      if (window.CABLAGE_SUIVRE) window.CABLAGE_SUIVRE();   // en Guidé, les deux bornes du fil en cours restent dans la vue
      window.dispatchEvent(new Event('resize'));
    });
  }
  appliquer();
  // 30/09 (constat E5) : un petit écran, la première fois sur cet appareil : plus de fenêtre qui s'ouvre toute seule. Une petite
  // bulle accrochée au bouton « Affichage », qui ne prend pas le doigt et ne couvre pas la zone de travail ; elle se ferme au
  // premier geste ou toute seule après 8 s, et ne revient plus. Pas par-dessus le tutoriel de prise en main.
  if (!carteSeule && PETIT() && !pref.propose && new URLSearchParams(location.search).get('tuto') === null) {
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
