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
  const ID = P.get('ex') || '', CLE = 'cablage-virtuel:tuto:' + ID;
  const $ = (s) => document.querySelector(s);
  const page = { activite: ['colorier', 'reperer', 'cabler'].includes(P.get('activite')) ? P.get('activite') : 'cabler',
                 mode: ['guide', 'aide', 'reel'].includes(P.get('mode')) ? P.get('mode') : 'guide',
                 reelle: P.get('platine') === 'reelle' };
  const E = (activite, mode, reelle) => ({ activite, mode, reelle: !!reelle });
  const meme = (a, b) => a.activite === b.activite && a.mode === b.mode && a.reelle === b.reelle;
  const juste = (etat) => etat && etat.carte.some(i => i.reponse && i.reponse === i.attendu);

  // Les étapes : ecran attendu, cibles (sélecteurs, ou fonction de l'état), textes, et « fait » (le geste est accompli).
  // « saut » : l'étape se termine par un rechargement de la page (l'écran suivant est celui de l'étape d'après).
  const ETAPES = [
    { ecran: E('cabler', 'guide'), titre: 'Bienvenue dans le câblage virtuel',
      texte: 'À gauche, <b>la carte</b> : le schéma à lire. À droite, <b>la platine</b> : les appareils et leurs bornes. En douze étapes, vous allez colorier, repérer, poser des fils, demander de l’aide et contrôler.',
      bouton: 'Commencer' },
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
      texte: 'Le fil qui clignote sur la carte : lisez ses <b>deux numéros</b>, trouvez-les sur la platine. Posez le doigt sur la première borne, glissez jusqu’à la seconde, lâchez. Pas besoin de viser juste : la borne la plus proche s’allume.',
      attend: 'J’attends le fil.', fait: (etat) => etat && etat.fils.length >= 1 },
    { ecran: E('cabler', 'guide'), cibles: ['#btn-aide'], titre: 'Demander de l’aide',
      texte: 'Pour le fil suivant, appuyez sur <b>Aide</b>. Une fois : les deux appareils s’éclairent. Deux fois : les numéros s’écrivent. Trois fois : les bornes clignotent. <b>Chaque aide est comptée.</b>',
      attend: 'J’attends l’appui sur Aide, puis le fil.', fait: (etat) => etat && etat.aides >= 1 && etat.fils.length >= 2 },
    { ecran: E('cabler', 'guide'), cibles: ['#btn-supprimer'], titre: 'Supprimer un fil',
      texte: 'Un fil mal posé s’enlève : touchez-le sur la platine, puis <b>Supprimer le fil</b>. Reposez-le ensuite.',
      attend: 'J’attends la suppression, puis le fil reposé.',
      fait: (etat, ctx) => { if (!etat) return false; ctx.max = Math.max(ctx.max || 0, etat.fils.length);
                             if (etat.fils.length < ctx.max) ctx.supprime = true; return !!ctx.supprime && etat.fils.length >= ctx.max; } },
    { ecran: E('cabler', 'guide'), cibles: ['#carte polyline.etape'], titre: 'À vous',
      texte: 'Posez les fils qui restent. Le fil à poser clignote toujours sur la carte ; l’aide reste là si besoin. Quand tout est posé, le contrôle se lance tout seul.',
      attend: 'J’attends le contrôle.', fait: (etat) => etat && etat.controle },
    { ecran: E('cabler', 'guide'), cibles: ['#resultat'], titre: 'Lire le résultat',
      texte: 'Le niveau va de <b>0 à 4</b>. Le logiciel compte aussi les <b>aides</b> et les <b>fils refusés</b> : ils comptent pour la note. Fermez avec <b>« Revoir la platine »</b>.',
      attend: 'J’attends la fermeture.', fait: (etat) => etat && !etat.controle },
    { ecran: E('cabler', 'guide'), cibles: ['#btn-vue-reelle'], titre: 'La vue réelle',
      texte: 'Appuyez sur <b>« Vue réelle »</b> : la platine montre les vrais appareils.', attend: 'J’attends l’appui.', saut: true },
    { ecran: E('cabler', 'guide', true), cibles: ['#modes'], titre: 'Le vrai disjoncteur, et les trois modes',
      texte: 'Q1 est maintenant le vrai appareil. Ses numéros sont les mêmes : <b>1 et 2 pour le neutre, à gauche</b> ; 3 et 4 pour la phase. En haut, les trois modes : <b>Guidé</b> montre le fil à poser, <b>Aidé</b> vous laisse l’ordre, <b>Réel</b> ne montre rien et contrôle à la fin, comme à l’examen. Appuyez sur <b>« Réel »</b>.',
      attend: 'J’attends l’appui sur Réel.', saut: true },
    { ecran: E('cabler', 'reel', true), cibles: ['#btn-controler'], titre: 'Comme à l’examen',
      texte: 'Câblez les <b>6 fils</b> sans aide, puis appuyez sur <b>Contrôler</b>.', attend: 'J’attends le contrôle.',
      fait: (etat) => etat && etat.controle },
    { ecran: E('cabler', 'reel', true), titre: 'Tutoriel terminé',
      texte: 'Bravo. Notez sur votre feuille : <b>le niveau</b>, les <b>aides</b> et les <b>fils refusés</b> de chaque temps. Vous savez maintenant colorier, repérer, câbler, demander de l’aide, contrôler et passer en vue réelle.',
      bouton: 'Retour aux chapitres', fin: true },
  ];

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
    bulle.innerHTML = (et.fin ? '' : '<a class="tuto-passer" href="#">Passer le tutoriel</a>') +
      '<h3><span class="tuto-num">' + n + '</span>' + et.titre + '</h3><p>' + (redirection || et.texte) + '</p>' +
      (et.attend && !redirection ? '<p class="tuto-attend">' + et.attend + '</p>' : '') +
      (et.bouton && !redirection ? '<button class="tuto-bouton">' + et.bouton + ' ›</button>' : '');
    const passer = bulle.querySelector('.tuto-passer'); if (passer) passer.onclick = (e) => { e.preventDefault(); quitter(); };
    const b = bulle.querySelector('.tuto-bouton');
    if (b) b.onclick = () => { if (et.fin) { effacer(); location.href = 'index.html'; } else avancer(); };
  }
  function poser(rs) {
    halos.forEach(h => h.remove()); halos = [];
    const H = window.innerHeight, L = window.innerWidth;
    rs.forEach(r => { const h = document.createElement('div'); h.className = 'tuto-halo';
      h.style.cssText = 'left:' + (r.x - 6) + 'px;top:' + (r.y - 6) + 'px;width:' + (r.x1 - r.x + 12) + 'px;height:' + (r.y1 - r.y + 12) + 'px';
      document.body.appendChild(h); halos.push(h); });
    bulle.classList.remove('sous', 'sur', 'centre');
    const bw = Math.min(400, L - 24), bh = bulle.offsetHeight || 160;
    if (!rs.length) { bulle.classList.add('centre'); bulle.style.left = (L / 2 - bw / 2) + 'px'; bulle.style.top = (H / 2 - bh / 2) + 'px'; bulle.style.width = bw + 'px'; return; }
    const r = { x: Math.min(...rs.map(q => q.x)), y: Math.min(...rs.map(q => q.y)), x1: Math.max(...rs.map(q => q.x1)), y1: Math.max(...rs.map(q => q.y1)) };
    const cx = (r.x + r.x1) / 2, sous = r.y1 + 16 + bh < H, sur = r.y - 16 - bh > 0;
    let left = Math.max(12, Math.min(L - bw - 12, cx - bw / 2)), top;
    if (sous) { top = r.y1 + 16; bulle.classList.add('sous'); }
    else if (sur) { top = r.y - 16 - bh; bulle.classList.add('sur'); if (r.y > 0.75 * H) left = 12; }   // cible dans la barre du bas : la bulle à gauche, hors de la platine
    else { top = Math.max(12, H - bh - 12); left = Math.max(12, Math.min(L - bw - 12, r.x1 + 16 <= L - bw - 12 ? r.x1 + 16 : r.x - bw - 16)); bulle.classList.add('centre'); }
    bulle.style.left = left + 'px'; bulle.style.top = top + 'px'; bulle.style.width = bw + 'px';
    bulle.style.setProperty('--fl', Math.max(18, Math.min(bw - 18, cx - left)) + 'px');
  }
  function redirection() {   // l'écran n'est pas celui de l'étape : dire quel bouton appuyer, et le viser
    const e = ETAPES[i].ecran;
    if (e.activite !== page.activite) return { sel: '#activites [data-activite="' + e.activite + '"]', texte: 'Appuyez sur <b>« ' + { colorier: '1 Colorier', reperer: '2 Repérer', cabler: '3 Câbler' }[e.activite] + ' »</b> en haut pour reprendre le tutoriel.' };
    if (e.mode !== page.mode) return { sel: '#modes [data-mode="' + e.mode + '"]', texte: 'Appuyez sur <b>« ' + { guide: 'Guidé', aide: 'Aidé', reel: 'Réel' }[e.mode] + ' »</b> en haut pour reprendre le tutoriel.' };
    if (e.reelle !== page.reelle) return { sel: '#btn-vue-reelle', texte: 'Appuyez sur <b>« ' + (e.reelle ? 'Vue réelle' : 'Symboles') + ' »</b> pour reprendre le tutoriel.' };
    return null;
  }
  function avancer() { if (i < ETAPES.length - 1) { i++; ctx = {}; sauver(); courant = -1; } }
  function battre() {
    const et = ETAPES[i];
    let etat = null; try { etat = window.CABLAGE_ETAT ? window.CABLAGE_ETAT() : null; } catch (e) { etat = null; }
    const red = redirection();
    if (!red && et.fait && et.fait(etat, ctx)) { avancer(); return battre(); }
    if (courant !== i || bulle.dataset.red !== String(!!red)) { ecrire(et, red && red.texte); courant = i; bulle.dataset.red = String(!!red); }
    poser(red ? [rect(red.sel)].filter(Boolean) : cibles(et, etat));
  }
  battre();
  setInterval(battre, 300);
  window.addEventListener('resize', battre);
})();
