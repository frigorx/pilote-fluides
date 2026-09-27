/* La mise sous tension à l'écran (docs/PLAN-2026-09-27-MISE-SOUS-TENSION.md, maquette validée par Franck le 27/09) :
   le bouton « Mise sous tension », la barre du bas qui devient le pupitre, les conducteurs sous tension surlignés,
   une pastille d'état par appareil, les défauts dans la consigne. Le calcul est dans moteur/tension.js.
   Décisions du 27/09 : Guidé et Aidé, l'essai quand l'élève veut ; Réel, seulement après « Contrôler ». Le fil en cause
   d'un court-circuit : une aide comptée, absente en Réel. La carte s'allume aussi, sauf en Réel. L'essai ne change pas
   le niveau : il est noté à part. Exercice de puissance seule : on ferme le contacteur à la main (poussoir de test). */
(function () {
'use strict';
const NS = 'http://www.w3.org/2000/svg';
const $ = s => document.querySelector(s);
const phase = p => !!p && p !== 'N' && p !== 'PE' && p !== 'défaut';

document.addEventListener('cablage-pret', () => {
  const API = window.CABLAGE_API, EX = API.ex();
  if (!window.CABLAGE_TENSION || API.activite !== 'cabler' || API.vue === 'carte') return;
  if (!EX.appareils.some(a => window.CABLAGE_TENSION.role(a) === 'source')) return;
  const REEL = API.mode === 'reel';
  let sim = null, e = null, horloge = null, vu = 0, defautAffiche = null, aideMontree = false, signature = '';
  let bilanEssai = null;

  const b = document.createElement('button');
  b.className = 'action'; b.id = 'btn-tension'; b.textContent = '⚡ Mise sous tension';
  b.title = 'Essayer le câblage comme à l’examen : enclencher, appuyer sur marche, voir ce qui se passe';
  $('.outils .actions').insertBefore(b, $('#btn-controler'));
  b.onclick = entrer;

  // sous tension, on ne câble pas : bornes et fils de la platine ne répondent plus (le zoom et le déplacement, si)
  const bloquer = ev => { if (sim && ev.target.closest && ev.target.closest('.borne, .fil')) { ev.stopPropagation(); ev.preventDefault(); } };
  ['pointerdown', 'click'].forEach(t => $('#platine-corps').addEventListener(t, bloquer, true));

  function entrer() {
    if (REEL && !API.controleAJour()) {
      API.dire('En Réel, contrôlez votre câblage avant de le mettre sous tension.', 'ko', 'Comme à l’examen : on vérifie d’abord, puis on essaie.');
      return;
    }
    sim = window.CABLAGE_TENSION.creer(EX, API.fils(), { reelle: API.reelle() });
    e = sim.etat(); vu = e.journal.length; defautAffiche = null; aideMontree = false; signature = '';
    bilanEssai = { debut: Date.now(), defauts: [], marche: new Set() };
    document.body.classList.add('sous-tension');
    construirePupitre();
    rendre();
    horloge = setInterval(() => { e = sim.avancer(100); rendre(); }, 100);
  }
  function consigner() {
    clearInterval(horloge); horloge = null;
    tracerEssai();
    sim = null; e = null;
    document.body.classList.remove('sous-tension');
    const p = $('#pupitre'); if (p) p.remove();
    API.fils().forEach(f => { if (f.contour) { f.contour.style.stroke = ''; f.contour.style.strokeWidth = ''; } if (f.el) f.el.classList.remove('suspect'); });
    const g = $('#pastilles'); if (g) g.remove();
    document.querySelectorAll('#carte-corps polyline.vivant').forEach(pl => pl.classList.remove('vivant'));
    API.dire('Installation consignée.', null, 'Vous pouvez de nouveau câbler, contrôler, puis remettre sous tension.');
  }
  function geste(rep, g) { e = sim.agir({ rep, geste: g }); rendre(true); }

  // ------------------------------------------------------------ le pupitre (la barre du bas, sous tension)
  function construirePupitre() {
    const roles = sim.roles(), par = r => Object.keys(roles).filter(x => roles[x] === r);
    const nom = r => { const a = EX.appareils.find(x => x.repere === r); return a ? a.nom.replace(/^Bouton /, '').replace(/ du départ \d+$/, '') : r; };
    const horloges = EX.appareils.filter(a => a.type === 'moteur_horloge').map(a => a.repere);
    const commande = par('bouton').length || par('capteur').length || horloges.length;
    const contacteurs = commande ? [] : EX.appareils.filter(a => roles[a.repere] === 'bobine' && /^com_puiss/.test(a.type)).map(a => a.repere);
    const p = document.createElement('div'); p.id = 'pupitre'; p.className = 'pupitre';
    const groupe = (titre, liste, faire) => {
      if (!liste.length) return;
      const g = document.createElement('div'); g.className = 'groupe';
      const t = document.createElement('b'); t.textContent = titre; g.append(t);
      const l = document.createElement('div'); g.append(l);
      liste.forEach(r => { const x = document.createElement('button'); x.dataset.rep = r; faire(x, r); l.append(x); });
      p.append(g);
    };
    groupe('Protections', par('protection'), x => { x.dataset.g = 'q'; x.onclick = () => { const v = e.appareils[x.dataset.rep]; geste(x.dataset.rep, v.enclenche && !v.declenche ? 'ouvrir' : 'enclencher'); }; });
    groupe('Boutons (maintenir)', par('bouton'), (x, r) => {
      x.dataset.g = 'b'; x.textContent = r + ' ' + nom(r);
      const lacher = () => { if (sim && e.appareils[r].appuye) geste(r, 'relacher'); };
      x.addEventListener('pointerdown', ev => { ev.preventDefault(); x.setPointerCapture && x.setPointerCapture(ev.pointerId); geste(r, 'appuyer'); });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => x.addEventListener(t, lacher));
    });
    groupe('Capteurs', par('capteur').concat(horloges), x => { x.dataset.g = 'c'; x.onclick = () => geste(x.dataset.rep, 'basculer'); });
    groupe('Contacteurs (poussoir de test)', contacteurs, x => { x.dataset.g = 'f'; x.onclick = () => geste(x.dataset.rep, 'forcer'); });
    groupe('Essai des sécurités', par('thermique'), x => { x.dataset.g = 't'; x.onclick = () => geste(x.dataset.rep, e.appareils[x.dataset.rep].declenche ? 'rearmer' : 'declencher'); });
    const droite = document.createElement('div'); droite.className = 'droite';
    if (!REEL) {
      const a = document.createElement('button'); a.id = 'btn-fil-cause'; a.hidden = true; a.textContent = 'Aide : le fil en cause';
      a.onclick = () => { aideMontree = true; API.compterAide(); rendre(true); };
      droite.append(a);
    }
    const c = document.createElement('button'); c.className = 'consigner'; c.textContent = 'Consigner et revenir au câblage'; c.onclick = consigner;
    droite.append(c); p.append(droite);
    $('.outils').append(p);
  }
  function majPupitre() {
    document.querySelectorAll('#pupitre button[data-rep]').forEach(x => {
      const r = x.dataset.rep, v = e.appareils[r], g = x.dataset.g;
      if (g === 'q') { x.textContent = r + (v.declenche ? ' réarmer' : ''); x.classList.toggle('on', v.enclenche && !v.declenche); x.classList.toggle('ko', v.declenche); }
      if (g === 'b') x.classList.toggle('appui', !!v.appuye);
      if (g === 'c') x.textContent = r + ' : ' + v.texte;
      if (g === 'f') { x.textContent = r + (v.force ? ' relâcher' : ' fermer'); x.classList.toggle('on', !!v.force); }
      if (g === 't') { x.textContent = r + (v.declenche ? ' réarmer' : ' déclencher'); x.classList.toggle('ko', v.declenche); }
    });
  }

  // ------------------------------------------------------------ ce qu'on voit
  function rendre(force) {
    const svgP = $('#platine-corps svg'), m = svgP && svgP.getScreenCTM();
    const sig = JSON.stringify(e.appareils) + e.journal.length + aideMontree + (m ? m.a.toFixed(3) : '');   // le zoom change : les pastilles se redimensionnent
    if (!force && sig === signature) return;
    signature = sig;
    const suspects = defautAffiche && aideMontree && defautAffiche.suspects || [];
    API.fils().forEach(f => {
      if (!f.contour) return;
      const suspect = suspects.some(s => (s.de === f.de && s.a === f.a) || (s.de === f.a && s.a === f.de));
      const vivant = phase(e.bornes[f.de]);
      f.contour.style.stroke = suspect ? 'var(--ko)' : vivant ? '#ffb300' : '';
      f.contour.style.strokeWidth = suspect ? '13' : vivant ? '11' : '';
      if (f.el) f.el.classList.toggle('suspect', suspect);
    });
    if (!REEL) carte();
    pastilles();
    majPupitre();
    consigne();
    for (const [r, v] of Object.entries(e.appareils)) if (v.marche === 'tourne' || v.marche === 'oui') bilanEssai.marche.add(r);
  }
  function carte() {
    document.querySelectorAll('#carte-corps #conducteurs polyline').forEach(pl => {
      const pts = pl.getAttribute('points').trim().split(/\s+/), d = pts[0].split(',').map(Number), f = pts[pts.length - 1].split(',').map(Number);
      const refs = [API.borneCarte(d[0], d[1]), API.borneCarte(f[0], f[1])].filter(Boolean);
      pl.classList.toggle('vivant', refs.some(r => phase(e.bornes[r])));
    });
  }
  function consigne() {
    const nouveaux = e.journal.slice(vu); vu = e.journal.length;
    const d = nouveaux.filter(j => j.gravite === 'defaut').pop();
    if (d) { defautAffiche = d; aideMontree = false; bilanEssai.defauts.push(d.texte); }
    const declenche = e.coupure || Object.values(e.appareils).some(v => v.declenche && v.enclenche !== undefined);
    if (defautAffiche && !declenche && !d && nouveaux.some(j => j.gravite !== 'defaut')) defautAffiche = null;   // réarmé : on repart
    const bf = $('#btn-fil-cause'); if (bf) bf.hidden = !(defautAffiche && defautAffiche.suspects && defautAffiche.suspects.length);
    if (defautAffiche) {
      const s = defautAffiche.suspects;
      API.dire(defautAffiche.texte, 'ko', aideMontree && s ? 'Aide : le fil en rouge, ' + s.map(f => f.de + ' → ' + f.a).join(', ') + '. Consignez, corrigez, puis remettez sous tension.'
        : 'Consignez, cherchez le défaut, corrigez, puis remettez sous tension.');
      return;
    }
    const faits = e.journal.filter(j => !/ (enclenché|ouvert|appuyé|relâché|basculé)\.$/.test(j.texte)).slice(-2).map(j => j.texte);
    const enclenche = Object.values(e.appareils).some(v => v.enclenche);
    API.dire('Sous tension. ' + (faits.length ? faits.join(' ') : ''), null,
      enclenche ? 'Les conducteurs sous tension sont surlignés. Maintenez un bouton pour l’actionner.' : 'Enclenchez les protections, de l’amont vers l’aval.');
  }
  function pastilles() {
    const svg = $('#platine-corps svg'); if (!svg) return;
    let g = svg.querySelector('#pastilles');
    if (g) g.remove();
    g = document.createElementNS(NS, 'g'); g.id = 'pastilles'; svg.append(g);
    const roles = sim.roles(), poses = [];
    const m = svg.getScreenCTM(), k = m && m.a ? 1 / m.a : 1;   // 16 px à l'écran, quel que soit le zoom
    for (const [r, v] of Object.entries(e.appareils)) {
      const ro = roles[r];
      if (!['bobine', 'moteur', 'recepteur', 'protection', 'thermique'].includes(ro)) continue;
      const app = svg.querySelector('.app[data-rep="' + CSS.escape(r) + '"]'); if (!app) continue;
      const bb = app.getBBox();
      let cls = 'repos', txt = r + ' ' + v.texte;
      if (ro === 'bobine') cls = v.grillee ? 'ko' : v.colle ? 'ok' : 'repos';
      if (ro === 'moteur') cls = v.marche === 'tourne' ? 'ok' : v.marche === 'ronfle' ? 'ko' : 'repos';
      if (ro === 'recepteur') cls = v.marche === 'oui' ? 'ok' : 'repos';
      if (ro === 'protection') cls = v.declenche ? 'ko' : v.enclenche ? 'ok' : 'repos';
      if (ro === 'thermique') cls = v.declenche ? 'ko' : 'repos';
      const p = document.createElementNS(NS, 'g'); p.setAttribute('class', 'pastille ' + cls);
      const rect = document.createElementNS(NS, 'rect'), t = document.createElementNS(NS, 'text');
      t.style.fontSize = (16 * k) + 'px';
      t.textContent = (ro === 'moteur' && v.marche === 'tourne' ? '⟳ ' : '') + txt;
      p.append(rect, t); g.append(p);
      const l = t.getComputedTextLength() + 16 * k, h = 26 * k;
      let x = bb.x + bb.width / 2 - l / 2, y = bb.y - h - 3 * k;
      for (let k = 0; k < 10; k++) {   // jamais deux pastilles l'une sur l'autre : on remonte
        const gene = poses.find(o => x < o.x + o.l && o.x < x + l && y < o.y + h && o.y < y + h);
        if (!gene) break;
        y = gene.y - h - 3 * k;
      }
      poses.push({ x, y, l });
      rect.setAttribute('x', x); rect.setAttribute('y', y); rect.setAttribute('width', l); rect.setAttribute('height', h); rect.setAttribute('rx', h / 2);
      t.setAttribute('x', x + l / 2); t.setAttribute('y', y + h / 2 + 5.5 * k); t.setAttribute('text-anchor', 'middle');
    }
  }
  function tracerEssai() {   // à côté des contrôles, dans le même carnet : l'essai ne change pas le niveau
    try {
      const cle = 'cablage-virtuel:resultats', liste = JSON.parse(localStorage.getItem(cle) || '[]');
      liste.push({ date: new Date().toISOString(), exercice: EX.id, activite: 'essai', mode: API.mode, defauts: bilanEssai.defauts,
                   marche: [...bilanEssai.marche], secondes: Math.round((Date.now() - bilanEssai.debut) / 1000) });
      localStorage.setItem(cle, JSON.stringify(liste.slice(-200)));
    } catch (err) { /* stockage indisponible : l'essai continue */ }
  }
  window.CABLAGE_TENSION_ECRAN = { entrer, consigner, geste, etat: () => e };   // pour les vérifications automatiques
});
})();
