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
const phase = p => !!p && p !== 'N' && p !== 'PE' && p !== '0' && p !== 'défaut';   // « 24 » (secondaire du transformateur) est vivant, « 0 » non

/* La carte s'allume selon les potentiels des bornes (hors Réel) ; bornes null : elle s'éteint. */
function allumerCarte(bornes) {
  document.querySelectorAll('#carte-corps #conducteurs polyline').forEach(pl => {
    if (!bornes) { pl.classList.remove('vivant'); return; }
    const pts = pl.getAttribute('points').trim().split(/\s+/), d = pts[0].split(',').map(Number), f = pts[pts.length - 1].split(',').map(Number);
    const refs = [window.CABLAGE_API.borneCarte(d[0], d[1]), window.CABLAGE_API.borneCarte(f[0], f[1])].filter(Boolean);
    pl.classList.toggle('vivant', refs.some(r => phase(bornes[r])));
  });
}
const ID = new URLSearchParams(location.search).get('ex');
let canal = null;
try { canal = ID && 'BroadcastChannel' in window ? new BroadcastChannel('cablage-virtuel-tension-' + ID) : null; } catch (err) { canal = null; }
if (canal && window.CABLAGE_API && window.CABLAGE_API.vue === 'carte') canal.onmessage = m => allumerCarte(m.data.bornes);   // la carte sur le deuxième écran

document.addEventListener('cablage-pret', () => {
  const API = window.CABLAGE_API, EX = API.ex();
  if (!window.CABLAGE_TENSION || API.activite !== 'cabler' || API.vue === 'carte') return;
  if (!EX.appareils.some(a => window.CABLAGE_TENSION.role(a) === 'source')) return;
  const REEL = API.mode === 'reel';
  let sim = null, e = null, horloge = null, vu = 0, defautAffiche = null, aideMontree = false, signature = '';
  let bilanEssai = null;

  // 29/09 : la mise sous tension est l'étape 4 « Essayer » de la barre des étapes (jouer.html la pose, inactive) ; ici, on l'active
  let b = $('#btn-tension');
  if (!b) { b = document.createElement('button'); b.id = 'btn-tension'; b.className = 'etape'; b.innerHTML = '<i>4</i><span class="nom">Essayer</span>'; $('#activites').append(b); }
  b.removeAttribute('aria-disabled');
  b.title = 'Essayer le câblage : enclencher, appuyer sur marche, voir ce qui se passe';
  b.dataset.actif = b.title;   // moteur/cablage.js la rend inactive tant qu'un fil attend d'être posé sur la platine (fil par fil)
  b.onclick = () => { if (!sim) entrer(); };
  const etapeCabler = $('#activites [data-activite="cabler"]');

  // sous tension, on ne câble pas : bornes et fils de la platine ne répondent plus (le zoom et le déplacement, si)
  const bloquer = ev => { if (sim && ev.target.closest && ev.target.closest('.borne, .fil')) { ev.stopPropagation(); ev.preventDefault(); } };
  ['pointerdown', 'click'].forEach(t => $('#platine-corps').addEventListener(t, bloquer, true));

  function entrer() {
    if (sim) return;
    if (API.enAttente && API.enAttente()) {   // 30/09 (constat R2) : jamais « hors tension » et « sous tension » à la fois
      API.dire('Posez d’abord ce fil sur votre platine.', 'ko', 'Puis appuyez sur « C’est posé sur la platine » : l’essai viendra après.');
      return;
    }
    if (REEL && !API.controleAJour()) {
      API.dire('En mode avancé, contrôlez votre câblage avant de le mettre sous tension.', 'ko', 'On vérifie d’abord, puis on essaie.');
      return;
    }
    sim = window.CABLAGE_TENSION.creer(EX, API.fils(), { reelle: API.reelle() });
    e = sim.etat(); vu = e.journal.length; defautAffiche = null; aideMontree = false; signature = '';
    bilanEssai = { debut: Date.now(), defauts: [], marche: new Set() };
    document.body.classList.add('sous-tension');
    b.setAttribute('aria-current', 'step'); if (etapeCabler) etapeCabler.removeAttribute('aria-current');   // l'étape en cours : 4
    construirePupitre();
    cadrerEssai();
    rendre();
    horloge = setInterval(() => { e = sim.avancer(100); rendre(); }, 100);
  }
  function consigner() {
    clearInterval(horloge); horloge = null;
    tracerEssai();
    if (!bilanEssai.defauts.length && bilanEssai.marche.size) { b.classList.add('faite'); b.setAttribute('aria-label', 'Étape 4 : Essayer, réussie'); }   // un essai sans défaut, où quelque chose a marché (le numéro reste)
    sim = null; e = null;
    document.body.classList.remove('sous-tension');
    b.removeAttribute('aria-current'); if (etapeCabler) etapeCabler.setAttribute('aria-current', 'step');
    const p = $('#pupitre'); if (p) p.remove();
    API.fils().forEach(f => { if (f.contour) { f.contour.style.stroke = ''; f.contour.style.strokeWidth = ''; } if (f.el) f.el.classList.remove('suspect'); });
    const g = $('#pastilles'); if (g) g.remove();
    plan = null; planCle = '';
    cadrerEssai(true);
    allumerCarte(null); if (canal) canal.postMessage({ bornes: null });
    API.dire('Installation consignée.', null, 'Vous pouvez de nouveau câbler, contrôler, puis remettre sous tension.');
  }
  /* 29/09 (nuit 2) : à l'essai, la platine occupe la place — la nomenclature se replie (tension.css), la vue se cadre sur la zone utile
     (toutes les bornes, comme moteur/ecran.js) ; au retour au câblage, la vue entière (ou le cadrage de la platine seule). */
  function cadrerEssai(sortie) {
    requestAnimationFrame(() => {
      const p = $('#platine'), z = p && p._zoom, svg = p && p.querySelector('.corps svg'); if (!z || !svg) return;
      if (sortie && !document.body.classList.contains('vue-platine')) { z.ajuster(); plan = null; return; }
      const bornes = [...svg.querySelectorAll('.borne')].map(el => el.getBBox()); if (!bornes.length) return;
      const x1 = Math.min(...bornes.map(q => q.x)), y1 = Math.min(...bornes.map(q => q.y)),
            x2 = Math.max(...bornes.map(q => q.x + q.width)), y2 = Math.max(...bornes.map(q => q.y + q.height));
      const corps = p.querySelector('.corps'), ratio = corps.clientHeight ? corps.clientWidth / corps.clientHeight : null;
      z.cadrer({ x: x1, y: y1 - 20, w: x2 - x1, h: y2 - y1 + 60 }, 30, ratio);
      plan = null; if (sim) rendre(true);
    });
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
    // 30/09 (constat E13) : chaque bouton dit son geste par un verbe (« Enclencher Q1 », « Appuyer sur S2 (marche) »…)
    groupe('Boutons poussoirs', par('bouton'), (x, r) => {
      x.dataset.g = 'b'; x.textContent = 'Appuyer sur ' + r + ' (' + nom(r) + ')';
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
      a.onclick = () => { if (!aideMontree) API.compterAide(); aideMontree = true; rendre(true); };   // un appui de plus n'apporte rien : pas compté (constat P9)
      droite.append(a);
    }
    const c = document.createElement('button'); c.className = 'consigner'; c.textContent = 'Consigner et revenir au câblage'; c.onclick = consigner;
    droite.append(c); p.append(droite);
    $('.outils').append(p);
  }
  function majPupitre() {
    document.querySelectorAll('#pupitre button[data-rep]').forEach(x => {
      const r = x.dataset.rep, v = e.appareils[r], g = x.dataset.g;
      if (g === 'q') { x.textContent = (v.declenche ? 'Réarmer ' : v.enclenche ? 'Ouvrir ' : 'Enclencher ') + r; x.classList.toggle('on', v.enclenche && !v.declenche); x.classList.toggle('ko', v.declenche); }
      if (g === 'b') x.classList.toggle('appui', !!v.appuye);
      if (g === 'c') x.textContent = 'Basculer ' + r + ' : ' + v.texte;
      if (g === 'f') { x.textContent = v.force ? 'Relâcher ' + r : 'Fermer ' + r + ' à la main'; x.classList.toggle('on', !!v.force); }
      if (g === 't') { x.textContent = (v.declenche ? 'Réarmer ' : 'Déclencher ') + r; x.classList.toggle('ko', v.declenche); }
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
  function carte() { allumerCarte(e.bornes); if (canal) canal.postMessage({ bornes: e.bornes }); }
  function consigne() {
    const nouveaux = e.journal.slice(vu); vu = e.journal.length;
    const d = nouveaux.filter(j => j.gravite === 'defaut').pop();
    if (d) { defautAffiche = d; aideMontree = false; bilanEssai.defauts.push(d.texte); }
    const declenche = e.coupure || Object.values(e.appareils).some(v => v.declenche && v.enclenche !== undefined);
    if (defautAffiche && !declenche && !d && nouveaux.some(j => j.gravite !== 'defaut')) defautAffiche = null;   // réarmé : on repart
    const bf = $('#btn-fil-cause'); if (bf) bf.hidden = !(defautAffiche && defautAffiche.suspects && defautAffiche.suspects.length);
    if (defautAffiche) {
      const s = defautAffiche.suspects;
      API.dire(defautAffiche.texte, 'ko', aideMontree && s ? 'Aide : le fil en rouge, ' + s.map(f => API.lib(f.de) + ' → ' + API.lib(f.a)).join(', ') + '. Consignez, corrigez, puis remettez sous tension.'
        : 'Consignez, cherchez le défaut, corrigez, puis remettez sous tension.');
      return;
    }
    const faits = e.journal.filter(j => !/ (enclenché|ouvert|appuyé|relâché|basculé)\.$/.test(j.texte)).slice(-2).map(j => j.texte);
    const enclenche = Object.values(e.appareils).some(v => v.enclenche);
    // le geste réel (constat E13) : un appui suffit ; un poussoir reste enfoncé tant qu'on le maintient
    const p = $('#pupitre'), f = p && p.querySelector('[data-g="f"]');
    const a = p && p.querySelector('[data-g="b"]') ? 'Appuyez sur un bouton : il reste enfoncé tant que vous le maintenez.'
      : f ? 'Appuyez sur « Fermer ' + f.dataset.rep + ' à la main » : le contacteur reste fermé jusqu’à « Relâcher ' + f.dataset.rep + ' ».'
      : 'Appuyez sur un bouton du pupitre pour agir.';
    API.dire('Sous tension. ' + (faits.length ? faits.join(' ') : ''), null,
      enclenche ? 'Les conducteurs sous tension sont surlignés. ' + a : 'Enclenchez les protections, de l’amont vers l’aval.');
  }
  function pastilles() {
    const svg = $('#platine-corps svg'); if (!svg) return;
    let g = svg.querySelector('#pastilles');
    if (g) g.remove();
    g = document.createElementNS(NS, 'g'); g.id = 'pastilles'; svg.append(g);
    const roles = sim.roles(), liste = [];
    const m = svg.getScreenCTM(), k = m && m.a ? 1 / m.a : 1;   // 12 px à l'écran, quel que soit le zoom
    for (const [r, v] of Object.entries(e.appareils)) {
      const ro = roles[r];
      if (!['bobine', 'moteur', 'recepteur', 'protection', 'thermique', 'transfo'].includes(ro)) continue;
      const app = svg.querySelector('.app[data-rep="' + CSS.escape(r) + '"]'); if (!app) continue;
      let cls = 'repos', txt = r + ' ' + v.texte;
      if (ro === 'bobine') cls = v.grillee ? 'ko' : v.colle ? 'ok' : 'repos';
      if (ro === 'moteur') cls = v.marche === 'tourne' ? 'ok' : v.marche === 'ronfle' ? 'ko' : 'repos';
      if (ro === 'recepteur') cls = v.marche === 'oui' ? 'ok' : 'repos';
      if (ro === 'protection') cls = v.declenche ? 'ko' : v.enclenche ? 'ok' : 'repos';
      if (ro === 'thermique') cls = v.declenche ? 'ko' : 'repos';
      if (ro === 'transfo') cls = v.alim ? 'ok' : 'repos';
      const p = document.createElementNS(NS, 'g'); p.setAttribute('class', 'pastille ' + cls);
      const rect = document.createElementNS(NS, 'rect'), t = document.createElementNS(NS, 'text');
      t.style.fontSize = (12 * k) + 'px';
      t.textContent = txt;
      const icone = ro === 'moteur' && v.marche === 'tourne' ? document.createElementNS(NS, 'text') : null;   // elle tourne dans le sens du moteur
      if (icone) { icone.textContent = '⟳'; icone.style.fontSize = (13 * k) + 'px'; icone.setAttribute('class', 'rotation' + (v.sens === 'inverse' ? ' inverse' : '')); }
      p.append(rect, t); if (icone) p.append(icone); g.append(p);
      const li = icone ? 15 * k : 0, l = t.getComputedTextLength() + 10 * k + li, h = 19 * k;
      liste.push({ r, app, rect, t, icone, li, l, h, txt });
    }
    const places = placer(svg, m, liste);
    liste.forEach(({ rect, t, icone, li, l, h }, i) => {
      const { x, y } = places[i];
      rect.setAttribute('x', x); rect.setAttribute('y', y); rect.setAttribute('width', l); rect.setAttribute('height', h); rect.setAttribute('rx', h / 2);
      t.setAttribute('x', x + (l + li) / 2); t.setAttribute('y', y + h / 2 + 4.2 * k); t.setAttribute('text-anchor', 'middle');
      if (icone) { icone.setAttribute('x', x + 6 * k + li / 2); icone.setAttribute('y', y + h / 2 + 4.5 * k); icone.setAttribute('text-anchor', 'middle'); }
    });
  }
  /* 30/09 (constat E6 ; règle de Franck : un texte ne chevauche jamais un tracé) : l'étiquette d'état se pose À CÔTÉ de son
     appareil — à droite de son repère, dans la zone libre —, jamais sur un appareil, un fil, un repère, une borne ou une autre
     étiquette : la place libre la plus proche, cherchée à l'écran (en pixels), dans la platine visible si possible. Le plan est
     gardé tant que ni les textes, ni le zoom, ni les fils ne changent. */
  let plan = null, planCle = '';
  const PAS = 6, RAYON = 420;
  const ecarts = (() => {   // les décalages essayés, du plus proche au plus loin ; la gauche coûte un peu plus
    const l = [];
    for (let dx = -RAYON; dx <= RAYON; dx += PAS) for (let dy = -RAYON / 2; dy <= RAYON / 2; dy += PAS) l.push([dx, dy, Math.hypot(dx, 1.4 * dy) + (dx < 0 ? 30 : 0)]);
    return l.sort((p, q) => p[2] - q[2]);
  })();
  function placer(svg, m, liste) {
    if (!m) return liste.map(() => ({ x: 0, y: 0 }));
    const cleP = liste.map(q => q.r + ':' + q.txt).join('|') + '#' + (m ? [m.a, m.e, m.f].map(v => v.toFixed(2)).join(',') : '') + '#' + API.fils().length;
    if (plan && planCle === cleP) return plan;
    const boite = el => { const b = el.getBoundingClientRect(); return b.width || b.height ? { x: b.left, y: b.top, x1: b.right, y1: b.bottom } : null; };
    const obst = [];
    svg.querySelectorAll('#symboles .app > g, #symboles .app > text, #etiquettes text, #etiquettes rect, #bornes .borne').forEach(el => { const b = boite(el); if (b) obst.push(b); });
    const demi = 6 * (m ? m.a : 1);   // demi-épaisseur d'un fil sous tension (contour de 11 unités de platine)
    API.fils().forEach(f => {
      const pts = (API.pointsFil ? API.pointsFil(f) : []).map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
      for (let i = 1; i < pts.length; i++) {
        const [a, b] = [pts[i - 1], pts[i]], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 6));
        const droit = Math.abs(a[0] - b[0]) < 0.5 || Math.abs(a[1] - b[1]) < 0.5;
        for (let j = 0; j < (droit ? 1 : n); j++) {   // un segment droit : une boîte ; un biais : de petites boîtes le long
          const p = droit ? a : [a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n], q = droit ? b : [a[0] + (b[0] - a[0]) * (j + 1) / n, a[1] + (b[1] - a[1]) * (j + 1) / n];
          obst.push({ x: Math.min(p[0], q[0]) - demi, y: Math.min(p[1], q[1]) - demi, x1: Math.max(p[0], q[0]) + demi, y1: Math.max(p[1], q[1]) + demi });
        }
      }
    });
    const corps = $('#platine-corps').getBoundingClientRect();
    const libre = (x, y, w, h, dans) => (!dans || (x >= corps.left + 4 && y >= corps.top + 4 && x + w <= corps.right - 4 && y + h <= corps.bottom - 4)) &&
      !obst.some(o => x - 3 < o.x1 && o.x < x + w + 3 && y - 3 < o.y1 && o.y < y + h + 3);
    const inv = m.inverse(), k = 1 / m.a;
    plan = liste.map(q => {
      const w = q.l / k, h = q.h / k;
      const rep = [...q.app.querySelectorAll(':scope > text.repere')].map(boite).find(Boolean);
      const corpsApp = [...q.app.querySelectorAll(':scope > g')].map(boite).filter(Boolean)
        .reduce((u, b) => u ? { x: Math.min(u.x, b.x), y: Math.min(u.y, b.y), x1: Math.max(u.x1, b.x1), y1: Math.max(u.y1, b.y1) } : b, null) || boite(q.app);
      // 30/09 (contre-vérification) : trois ancrages — à droite du repère, au-dessus, au-dessous (centrés) ; des modulaires serrés sur
      // un rail n'ont pas de place à droite, et leurs étiquettes filaient toutes au bout de la rangée
      const cx = (corpsApp.x + corpsApp.x1) / 2;
      const ancres = [[(rep ? Math.max(rep.x1, corpsApp.x1) : corpsApp.x1) + 8, (rep ? (rep.y + rep.y1) / 2 : (corpsApp.y + corpsApp.y1) / 2) - h / 2, 0],
                      [cx - w / 2, corpsApp.y - h - 6, 10], [cx - w / 2, corpsApp.y1 + 6, 10]];
      let meilleur = null;
      for (const dans of [true, false]) {
        ancres.forEach(([ax, ay, pen]) => { const o = ecarts.find(([dx, dy]) => libre(ax + dx, ay + dy, w, h, dans)); if (o && (!meilleur || o[2] + pen < meilleur.c)) meilleur = { x: ax + o[0], y: ay + o[1], c: o[2] + pen }; });
        if (meilleur) break;
      }
      const x = meilleur ? meilleur.x : ancres[0][0], y = meilleur ? meilleur.y : ancres[0][1];
      obst.push({ x, y, x1: x + w, y1: y + h });   // la suivante ne se pose pas dessus
      const p = svg.createSVGPoint(); p.x = x; p.y = y; const s = p.matrixTransform(inv);
      return { x: s.x, y: s.y };
    });
    planCle = cleP;
    return plan;
  }
  function tracerEssai() {   // à côté des contrôles, dans le même carnet : l'essai ne change pas le niveau
    try {
      const cle = 'cablage-virtuel:resultats', liste = JSON.parse(localStorage.getItem(cle) || '[]');
      const entree = { date: new Date().toISOString(), exercice: EX.id, activite: 'essai', mode: API.mode, defauts: bilanEssai.defauts,
                       marche: [...bilanEssai.marche], secondes: Math.round((Date.now() - bilanEssai.debut) / 1000) };
      if (API.tuto) entree.tuto = true;   // 30/09 (constat E12) : l'essai du tutoriel se range au Départ, comme ses contrôles
      liste.push(entree);
      localStorage.setItem(cle, JSON.stringify(liste.slice(-200)));
    } catch (err) { /* stockage indisponible : l'essai continue */ }
  }
  // enCours : « Plus › Recommencer » consigne d'abord (moteur/cablage.js, constats X1 et R1)
  window.CABLAGE_TENSION_ECRAN = { entrer, consigner, geste, etat: () => e, enCours: () => !!sim };   // et les vérifications automatiques
});
})();
