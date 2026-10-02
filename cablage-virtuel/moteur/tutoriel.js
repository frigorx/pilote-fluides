// tutoriel.js -- la prise en main du câblage virtuel (27/09/2026), d'après la maquette validée par Franck (docs/maquette-tutoriel).
//
// PRINCIPE : une bulle et un halo posés SUR la vraie page ; une étape = un geste de l'élève (colorier, taper un numéro,
// tirer un fil, appuyer sur un bouton). Rien n'est simulé : l'élève fait l'allumage simple pour de bon. Le module ne touche
// pas au moteur : il lit window.CABLAGE_ETAT() et le DOM toutes les 300 ms, et garde l'étape dans sessionStorage pour
// survivre aux rechargements (changement d'activité, de mode, vue réelle : cablage.js garde « &tuto » dans l'adresse).
// ACTIVATION : jouer.html?ex=<id>&…&tuto  (la tuile « Prise en main » de l'accueil).
(function () {
  const P = new URLSearchParams(location.search);
  if (P.get('tuto') === null) return;
  const ID = P.get('ex') || '', CLE = 'cablage-virtuel:tuto:' + ID + (P.get('tuto') ? ':' + P.get('tuto') : '');
  const $ = (s) => document.querySelector(s);
  const page = { activite: ['colorier', 'reperer', 'cabler'].includes(P.get('activite')) ? P.get('activite') : 'cabler',
                 mode: P.get('mode') === 'avance' ? 'reel' : ['guide', 'aide', 'reel'].includes(P.get('mode')) ? P.get('mode') : 'guide',
                 reelle: P.get('platine') === 'reelle' };
  const E = (activite, mode, reelle) => ({ activite, mode, reelle: !!reelle });
  const meme = (a, b) => a.activite === b.activite && a.mode === b.mode && a.reelle === b.reelle;
  const juste = (etat) => etat && etat.carte.some(i => i.reponse && i.reponse === i.attendu);
  const panneauModes = () => { const m = document.querySelector('#panneau-modes'); return !!m && !m.hidden; };

  // Les étapes : ecran attendu, cibles (sélecteurs, ou fonction de l'état), textes, et « fait » (le geste est accompli).
  // « saut » : l'étape se termine par un rechargement de la page (l'écran suivant est celui de l'étape d'après).
  const ETAPES = [
    { ecran: E('cabler', 'guide'), titre: 'Bienvenue dans le câblage virtuel',
      texte: () => 'À gauche, <b>la carte</b> : le schéma à lire. À droite, <b>la platine</b> : les appareils et leurs bornes. En ' + NB + ' étapes, vous allez colorier, repérer, poser des fils, demander de l’aide et contrôler.',
      bouton: 'Commencer', sansNumero: true },
    { ecran: E('colorier', 'guide'), cibles: ['#couleurs', '#carte .hit.courant'], titre: 'Colorier un fil',
      texte: 'Le fil qui clignote sur la carte porte <b>L</b>, <b>N</b> ou <b>PE</b> : remontez-le jusqu’à l’arrivée, puis touchez sa couleur en bas.',
      attend: 'J’attends un premier fil colorié.', fait: (etat) => juste(etat) },
    { ecran: E('colorier', 'guide'), cibles: (etat) => etat && etat.controle ? ['#btn-suite'] : ['#couleurs'], titre: 'Continuez seul',
      texte: 'Coloriez les autres fils. Quand tout est colorié, le contrôle se fait tout seul : lisez le niveau, puis appuyez sur <b>« Passer au repérage »</b>.',
      attend: 'J’attends le passage au repérage.', saut: true },
    { ecran: E('reperer', 'guide'), cibles: ['#couleurs', '#carte .cible.courant'], titre: 'Repérer une borne',
      texte: 'Les numéros sont cachés. La borne qui clignote : quel numéro ? La règle : <b>en haut les impaires</b> 1, 3, 5 de gauche à droite ; <b>en bas les paires</b> 2, 4, 6. Touchez le numéro en bas.',
      attend: 'J’attends une première borne juste.', fait: (etat) => juste(etat) },
    { ecran: E('reperer', 'guide'), cibles: (etat) => etat && etat.controle ? ['#btn-suite'] : ['#couleurs'], titre: 'Continuez seul',
      texte: 'Numérotez les autres bornes. Quand tout est repéré, le contrôle se fait tout seul : lisez le niveau, puis appuyez sur <b>« Passer au câblage »</b>.',
      attend: 'J’attends le passage au câblage.', saut: true },
    { ecran: E('cabler', 'guide'), cibles: ['#carte polyline.etape'], titre: 'Poser le premier fil',
      texte: 'Le fil qui clignote sur la carte : lisez ses <b>deux numéros</b>, trouvez-les sur la platine. Touchez la première borne : elle s’allume. Touchez la seconde : le fil se pose. Pas besoin de viser juste : la borne la plus proche s’allume.',
      attend: 'J’attends le fil.', fait: (etat) => etat && etat.fils.length >= 1 },
    { ecran: E('cabler', 'guide'), cibles: ['#btn-aide'], titre: 'Demander de l’aide',
      texte: 'Pour le fil suivant, appuyez sur <b>Aide</b>. Une fois : les deux appareils s’éclairent. Deux fois : les numéros s’écrivent. Trois fois : les bornes clignotent. <b>Chaque aide est comptée.</b>',
      attend: 'J’attends l’appui sur Aide, puis le fil.', fait: (etat) => etat && etat.aides >= 1 && etat.fils.length >= 2 },
    // « Supprimer le fil » n'apparaît que sur un fil choisi (29/09) : on vise d'abord les fils, puis le bouton
    { ecran: E('cabler', 'guide'), cibles: () => (document.querySelector('#platine .fil.choisi') ? ['#btn-supprimer'] : ['#platine .fil:not(.contour)']), titre: 'Supprimer un fil',
      texte: 'Un fil mal posé s’enlève : touchez-le sur la platine, puis <b>Supprimer le fil</b>. Reposez-le ensuite : il clignote de nouveau sur la carte.',
      attend: 'J’attends la suppression, puis le fil reposé.',
      fait: (etat, ctx) => { if (!etat) return false; ctx.max = Math.max(ctx.max || 0, etat.fils.length);
                             if (etat.fils.length < ctx.max) ctx.supprime = true; return !!ctx.supprime && etat.fils.length >= ctx.max; } },
    { ecran: E('cabler', 'guide'), cibles: ['#carte polyline.etape'], titre: 'À vous',
      texte: 'Posez les fils qui restent. Le fil à poser clignote toujours sur la carte ; l’aide reste là si besoin. Quand tout est posé, le contrôle se lance tout seul.',
      attend: 'J’attends le contrôle.', fait: (etat) => etat && etat.controle },
    { ecran: E('cabler', 'guide'), cibles: ['#resultat'], titre: 'Lire le résultat',
      texte: () => 'Le niveau va de <b>0 à 4</b>. Le logiciel compte aussi les <b>aides</b> et les <b>fils refusés</b> : ils comptent pour la note. Fermez avec <b>« ' + boutonFermer() + ' »</b>.',
      attend: 'J’attends la fermeture.', fait: (etat) => etat && !etat.controle },
    { ecran: E('cabler', 'guide'), cibles: ['#btn-vue-reelle'], titre: 'La vue réelle',
      texte: 'Appuyez sur <b>« Vue réelle »</b> : la platine montre les vrais appareils.', attend: 'J’attends l’appui.', saut: true },
    // la pastille du mode (29/09) : on la vise, puis, panneau ouvert, le bouton « Avancé »
    { ecran: E('cabler', 'guide', true), cibles: () => (panneauModes() ? ['#modes [data-mode="reel"]'] : ['#modes']), titre: 'Le vrai disjoncteur, et les trois modes',
      texte: 'Q1 est maintenant le vrai appareil. Ses numéros sont les mêmes : <b>1 et 2 pour le neutre, à gauche</b> ; 3 et 4 pour la phase. En haut, la pastille dit le mode : <b>Guidé</b> montre le fil à poser, <b>Aidé</b> vous laisse l’ordre, <b>Avancé</b> ne montre rien et contrôle à la fin. Touchez la pastille <b>« Guidé »</b>, puis <b>« Avancé »</b>.',
      attend: 'J’attends l’appui sur Avancé.', saut: true },
    { ecran: E('cabler', 'reel', true), cibles: ['#btn-controler'], titre: 'Sans aide',
      texte: 'Câblez les <b>6 fils</b> sans aide, puis appuyez sur <b>Contrôler</b>.', attend: 'J’attends le contrôle.',
      fait: (etat) => etat && etat.controle },
    { ecran: E('cabler', 'reel', true), titre: 'Tutoriel terminé',
      texte: 'Bravo. Notez sur votre feuille : <b>le niveau</b>, les <b>aides</b> et les <b>fils refusés</b> de chaque étape. Vous savez maintenant colorier, repérer, câbler, demander de l’aide, contrôler et passer en vue réelle.',
      bouton: 'Retour au réseau', fin: true, sansNumero: true },
  ];

  // 30/09 — LE TUTORIEL DU BORNIER (&tuto=bornier, sur le n° 1 en vue réelle ; maquette docs/maquette-bornier/, Franck :
  // « un bornier n'a pas de numéro de borne », « XA l'alimentation, XB la puissance, XC la commande », « les appellations ne
  // sont pas obligatoires »). En Guidé, les fils viennent dans l'ordre du n° 1 : L1, L2, L3, le neutre, la terre, puis vers Q1.
  const arme = (debut) => { const b = document.querySelector('#platine .borne.armee'); return !!b && b.dataset.ref.startsWith(debut); };
  const pose = (etat, x, y) => !!etat && etat.fils.some(f => (f.de === x && f.a === y) || (f.de === y && f.a === x));
  // 02/10 (Franck : « ok » à la maquette) : à 1366 × 768 les repères du bornier ne se lisaient pas ; chaque bulle cadre la platine
  // sur le bornier et l'arrivée (`cadre`), Q1 en plus pour le fil côté armoire ; la fin rend la vue entière.
  const ZONE = ['#platine .borne[data-ref^="X"]', '#platine .borne[data-ref^="Réseau:"]'];
  const BORNIER = [
    { ecran: E('cabler', 'guide', true), cibles: ['#platine .borne[data-ref^="X"]'], titre: 'Le bornier, la frontière', cadre: ZONE,
      texte: 'En bas de la platine, la rangée de bornes : <b>le bornier</b>. Tout ce qui entre dans l’armoire ou en sort passe par lui.',
      bouton: 'Commencer', sansNumero: true },
    { ecran: E('cabler', 'guide', true), cibles: ['#platine .borne[data-ref^="XA3:"]'], titre: 'Une borne a un nom, pas un numéro', cadre: ZONE,
      texte: 'Chaque borne porte un <b>repère</b> : <b>XA</b> l’alimentation, <b>XB</b> la puissance, <b>XC</b> la commande, puis son numéro. Deux vis : <b>côté armoire</b> en haut, <b>côté terrain</b> en bas. Touchez <b>XA3, côté terrain</b>.',
      attend: 'J’attends XA3, côté terrain (la vis du bas).', fait: () => arme('XA3:1') },
    { ecran: E('cabler', 'guide', true), cibles: ['#platine .borne[data-ref="Réseau:L1"]'], titre: 'Deux côtés, un seul repère', cadre: ZONE,
      texte: 'XA3 s’est allumée. Touchez maintenant <b>L1</b>, à l’arrivée : le fil se pose, côté terrain.',
      attend: 'J’attends le fil de L1.', fait: (etat) => pose(etat, 'Réseau:L1', 'XA3:1') },
    { ecran: E('cabler', 'guide', true), cibles: ['#carte polyline.etape'], titre: 'Les phases, puis le neutre', cadre: ZONE,
      texte: 'Posez les deux autres phases, puis le neutre : sa borne est <b>bleue</b>. Le fil à poser clignote sur la carte.',
      attend: 'J’attends les deux phases et le neutre.', fait: (etat) => pose(etat, 'Réseau:N', 'XA2:1') },
    { ecran: E('cabler', 'guide', true), cibles: ['#platine .borne[data-ref^="XA1:"]', '#platine .borne[data-ref^="XB1:"]'], titre: 'La terre', cadre: ZONE,
      texte: 'Verte et jaune, fixée au rail : <b>la terre</b>. Un repère n’est pas obligatoire : la couleur suffit. Posez le conducteur de terre de l’arrivée.',
      attend: 'J’attends le conducteur de terre.', fait: (etat) => pose(etat, 'Réseau:PE', 'XA1:1') },
    { ecran: E('cabler', 'guide', true), cibles: ['#platine .borne[data-ref="XA3:2"]', '#platine .borne[data-ref="Q1:1"]'], titre: 'Côté armoire', cadre: ZONE.concat('#platine .borne[data-ref^="Q1:"]'),
      texte: 'Le courant de L1 ressort de XA3 <b>côté armoire</b> et monte vers Q1. Posez ce fil.',
      attend: 'J’attends le fil de XA3 vers Q1.', fait: (etat) => pose(etat, 'XA3:2', 'Q1:1') },
    { ecran: E('cabler', 'guide', true), titre: 'Terminé',
      texte: 'Un repère, deux côtés, une couleur. Au bornier : d’abord le repère, puis le côté, armoire ou terrain.',
      bouton: 'Retour au réseau', fin: true, sansNumero: true },
  ];
  if (P.get('tuto') === 'bornier') ETAPES.splice(0, ETAPES.length, ...BORNIER);

  // 30/09 (constat E16) : le nombre annoncé est le vrai — les étapes numérotées (ni la bienvenue ni la fin)
  const NB = ETAPES.filter(e => !e.sansNumero).length;
  // 30/09 (constat E1) : la bulle nomme le bouton qui est vraiment à l'écran
  function boutonFermer() { const b = document.querySelector('#btn-continuer'); return b ? b.textContent.trim() : 'Revoir la platine'; }

  let i = 0;
  try { i = Math.min(ETAPES.length - 1, JSON.parse(sessionStorage.getItem(CLE) || '{"i":0}').i || 0); } catch (e) { i = 0; }
  const sauver = () => { try { sessionStorage.setItem(CLE, JSON.stringify({ i })); } catch (e) { /* sans stockage : la page courante suffit */ } };
  const effacer = () => { try { sessionStorage.removeItem(CLE); } catch (e) { /* rien */ } };
  // après un rechargement, l'écran courant est celui d'une étape plus loin : on y va (jamais plus de deux étapes)
  for (let j = i + 1; j <= Math.min(i + 2, ETAPES.length - 1); j++) if (!meme(ETAPES[i].ecran, page) && meme(ETAPES[j].ecran, page)) { i = j; break; }
  sauver();

  // ---- la bulle, le halo, la barre d'avancement
  const avance = document.createElement('div'); avance.className = 'tuto-avance'; avance.innerHTML = '<i></i>'; document.body.appendChild(avance);
  const bulle = document.createElement('div'); bulle.className = 'tuto-bulle'; bulle.setAttribute('role', 'dialog'); bulle.setAttribute('aria-live', 'polite'); document.body.appendChild(bulle);
  let halos = [], ctx = {}, courant = -1;
  const rect = (sel) => {
    const els = [...document.querySelectorAll(sel)].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height; });
    if (!els.length) return null;
    const rs = els.map(e => e.getBoundingClientRect());
    return { x: Math.min(...rs.map(r => r.left)), y: Math.min(...rs.map(r => r.top)), x1: Math.max(...rs.map(r => r.right)), y1: Math.max(...rs.map(r => r.bottom)) };
  };
  function cibles(et, etat) {
    if (!et) return [];
    const c = typeof et.cibles === 'function' ? et.cibles(etat) : et.cibles;
    return (c || []).map(rect).filter(Boolean);
  }
  function quitter() { effacer(); P.delete('tuto'); location.search = '?' + P.toString(); }
  function ecrire(et, redirection) {
    const n = ETAPES.indexOf(et);
    avance.querySelector('i').style.width = (100 * n / (ETAPES.length - 1)) + '%';
    const texte = typeof et.texte === 'function' ? et.texte() : et.texte;
    bulle.innerHTML = (et.fin ? '' : '<a class="tuto-passer" href="#">Passer le tutoriel</a>') +
      '<h3>' + (et.sansNumero ? '' : '<span class="tuto-num">' + n + '</span>') + et.titre + '</h3><p>' + (redirection || texte) + '</p>' +
      (et.attend && !redirection ? '<p class="tuto-attend">' + et.attend + '</p>' : '') +
      (et.bouton && !redirection ? '<button class="tuto-bouton">' + et.bouton + ' ›</button>' : '');
    const passer = bulle.querySelector('.tuto-passer'); if (passer) passer.onclick = (e) => { e.preventDefault(); quitter(); };
    const b = bulle.querySelector('.tuto-bouton');
    if (b) b.onclick = () => {
      if (et.fin) { effacer(); location.href = 'index.html'; return; }
      avancer();
      // 30/09 (constat E7) : « Commencer » ouvre directement l'écran de la première étape (Colorier) : pas de « reprendre »
      const e = ETAPES[i].ecran;
      if (e.activite !== page.activite) { P.set('activite', e.activite); location.search = '?' + P.toString().replace(/(^|&)tuto=(&|$)/, '$1tuto$2'); }
    };
  }
  function poser(rs) {
    halos.forEach(h => h.remove()); halos = [];
    const H = window.innerHeight, L = window.innerWidth;
    rs.forEach(r => { const h = document.createElement('div'); h.className = 'tuto-halo';
      h.style.cssText = 'left:' + (r.x - 6) + 'px;top:' + (r.y - 6) + 'px;width:' + (r.x1 - r.x + 12) + 'px;height:' + (r.y1 - r.y + 12) + 'px';
      document.body.appendChild(h); halos.push(h); });
    bulle.classList.remove('sous', 'sur', 'centre');
    // 30/09 (constat E8) : la bulle ne cache jamais le schéma à lire, ni la zone de la platine où l'élève agit, ni ce qu'elle
    // vise ; elle se pose du côté libre, la plus proche de sa cible. Les zones gênantes (consigne, palette, boutons) coûtent,
    // sans être interdites. Plusieurs largeurs sont essayées avant de céder.
    const r = rs.length ? { x: Math.min(...rs.map(q => q.x)), y: Math.min(...rs.map(q => q.y)), x1: Math.max(...rs.map(q => q.x1)), y1: Math.max(...rs.map(q => q.y1)) } : null;
    const dures = zonesProtegees().concat(rs.map(q => ({ x: q.x - 8, y: q.y - 8, x1: q.x1 + 8, y1: q.y1 + 8 })));
    const douces = ['#consigne', '#nomenclature', '#carte .entete', '#platine .entete', '#couleurs', '.outils .actions', '#activites', '#pupitre'].map(s => rect(s)).filter(Boolean);
    const inter = (a, b) => Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y, b.y));
    let mieux = null;
    for (const bw of [Math.min(400, L - 24), Math.min(340, L - 24), Math.min(300, L - 24)]) {
      bulle.style.width = bw + 'px';
      const bh = bulle.offsetHeight || 160;
      for (let top = 12; top + bh <= H - 8; top += 8) for (let left = 12; left + bw <= L - 12; left += 8) {
        const b = { x: left, y: top, x1: left + bw, y1: top + bh };
        const dur = dures.reduce((s, z) => s + inter(b, z), 0);
        const loin = r ? Math.hypot(Math.max(0, r.x - b.x1, b.x - r.x1), Math.max(0, r.y - b.y1, b.y - r.y1)) : Math.hypot((left + bw / 2) - L / 2, (top + bh / 2) - H / 2) / 4;
        const cout = dur * 1000 + douces.reduce((s, z) => s + inter(b, z), 0) / 40 + loin + (400 - bw) / 2;
        if (!mieux || cout < mieux.cout) mieux = { cout, left, top, bw, bh, dur };
      }
      if (mieux && mieux.dur === 0) break;
    }
    const { left, top, bw, bh } = mieux;
    bulle.style.left = left + 'px'; bulle.style.top = top + 'px'; bulle.style.width = bw + 'px';
    // la flèche, seulement quand la bulle est juste sous ou juste sur sa cible
    const cx = r ? (r.x + r.x1) / 2 : 0, face = r && cx > left + 18 && cx < left + bw - 18;
    if (face && top >= r.y1 && top - r.y1 < 40) bulle.classList.add('sous');
    else if (face && top + bh <= r.y && r.y - top - bh < 40) bulle.classList.add('sur');
    else bulle.classList.add('centre');
    bulle.style.setProperty('--fl', Math.max(18, Math.min(bw - 18, cx - left)) + 'px');
  }
  /* Ce que la bulle ne cache jamais : le dessin du schéma (la carte) et, sur la platine, les appareils et leurs bornes. */
  function zonesProtegees() {
    const z = [];
    const coupe = (r, c) => { const x = Math.max(r.x, c.left), y = Math.max(r.y, c.top), x1 = Math.min(r.x1, c.right), y1 = Math.min(r.y1, c.bottom); return x1 > x && y1 > y ? { x, y, x1, y1 } : null; };
    const svg = $('#carte-corps svg'), cc = $('#carte-corps') && $('#carte-corps').getBoundingClientRect();
    if (svg && cc && cc.width) {
      const els = [...svg.querySelectorAll('#conducteurs, .symbole, #carte-bornes, #coloriage, #reperage')].map(e => e.getBoundingClientRect()).filter(q => q.width || q.height);
      if (els.length) { const u = { x: Math.min(...els.map(q => q.left)), y: Math.min(...els.map(q => q.top)), x1: Math.max(...els.map(q => q.right)), y1: Math.max(...els.map(q => q.bottom)) }; const k = coupe(u, cc); if (k) z.push(k); }
    }
    const pc = $('#platine-corps') && $('#platine-corps').getBoundingClientRect();
    if (pc && pc.width && !document.body.classList.contains('sur-carte')) {
      const els = [...document.querySelectorAll('#platine-corps .app, #platine-corps .borne')].map(e => e.getBoundingClientRect()).filter(q => q.width || q.height);
      if (els.length) { const u = { x: Math.min(...els.map(q => q.left)), y: Math.min(...els.map(q => q.top)), x1: Math.max(...els.map(q => q.right)), y1: Math.max(...els.map(q => q.bottom)) }; const k = coupe(u, pc); if (k) z.push(k); }
    }
    return z;
  }
  function redirection() {   // l'écran n'est pas celui de l'étape : dire quel bouton appuyer, et le viser
    const e = ETAPES[i].ecran;
    if (e.activite !== page.activite) return { sel: '#activites [data-activite="' + e.activite + '"]', texte: 'Appuyez sur <b>« ' + { colorier: '1 Colorier', reperer: '2 Repérer', cabler: '3 Câbler' }[e.activite] + ' »</b> en haut pour continuer le tutoriel.' };
    if (e.mode !== page.mode) return { sel: panneauModes() ? '#modes [data-mode="' + e.mode + '"]' : '#modes', texte: 'Touchez la pastille du mode en haut, puis <b>« ' + { guide: 'Guidé', aide: 'Aidé', reel: 'Avancé' }[e.mode] + ' »</b>, pour continuer le tutoriel.' };
    if (e.reelle !== page.reelle) return { sel: '#btn-vue-reelle', texte: 'Appuyez sur <b>« ' + (e.reelle ? 'Vue réelle' : 'Symboles') + ' »</b> pour continuer le tutoriel.' };
    return null;
  }
  // une étape à `cadre` cadre la platine sur ces bornes ; l'étape suivante sans `cadre` rend la vue entière (refait tant que la platine n'est pas prête)
  let cadree = -1, cadrage = false;
  function cadrer(et) {
    if (cadree === i || (!et.cadre && !cadrage)) return;
    const p = $('#platine'), z = p && p._zoom, svg = p && p.querySelector('.corps svg'), corps = p && p.querySelector('.corps');
    if (!z || !z.cadrer || !svg || !corps || !corps.clientHeight) return;
    if (!et.cadre) { z.ajuster(); cadrage = false; cadree = i; return; }
    const bs = [...svg.querySelectorAll(et.cadre.join(','))].map(e => e.getBBox()); if (!bs.length) return;
    const x1 = Math.min(...bs.map(q => q.x)), y1 = Math.min(...bs.map(q => q.y)), x2 = Math.max(...bs.map(q => q.x + q.width)), y2 = Math.max(...bs.map(q => q.y + q.height));
    z.cadrer({ x: x1, y: y1 - 30, w: x2 - x1, h: y2 - y1 + 50 }, 30, corps.clientWidth / corps.clientHeight);
    cadrage = true; cadree = i;
  }
  function avancer() { if (i < ETAPES.length - 1) { i++; ctx = {}; sauver(); courant = -1; } }
  function battre() {
    const et = ETAPES[i];
    let etat = null; try { etat = window.CABLAGE_ETAT ? window.CABLAGE_ETAT() : null; } catch (e) { etat = null; }
    const red = redirection();
    if (!red && et.fait && et.fait(etat, ctx)) { avancer(); return battre(); }
    if (!red) cadrer(et);
    if (courant !== i || bulle.dataset.red !== String(!!red)) { ecrire(et, red && red.texte); courant = i; bulle.dataset.red = String(!!red); }
    poser(red ? [rect(red.sel)].filter(Boolean) : cibles(et, etat));
  }
  battre();
  setInterval(battre, 300);
  window.addEventListener('resize', battre);
})();
