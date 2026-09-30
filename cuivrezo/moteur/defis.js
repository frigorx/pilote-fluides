/* CuivRézo — les défis, le tampon et le passeport.
   CONTRAT : ce fichier ne contient AUCUN texte de station. Tout est tiré des données déjà écrites
   (gestes, pièges, figures d'état) : si une station change, son défi suit.
   Le temps « Le défi » (entre « Les pièges » et « Je contrôle ») propose jusqu'à trois épreuves :
     · Dans l'ordre !      les gestes mélangés, à remettre dans l'ordre (toucher deux cartes, ou glisser) ;
     · Le bon diagnostic   un piège dessiné, trois causes, une seule juste ;
     · Bonne pièce ?       une pièce dessinée, « bonne » ou « à refaire », et pourquoi (si la station a des figures d'état).
   Une station dont toutes les épreuves sont réussies reçoit un TAMPON, gardé sur l'appareil seulement
   (localStorage, clé « cuivrezo:<station> », champ `defi`). Rien n'est envoyé nulle part.
   Le passeport (passeport.html) et la carte de l'accueil lisent ces tampons : CuivDefis.remplir().
   API pour station.js : CuivDefis.pages(st) · CuivDefis.ecran(contexte, panneau) → { fig, narration }. */

const CuivDefis = (() => {
  'use strict';

  /* ------------------------------------------------ petits outils */
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const reduit = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  const melanger = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const NS = 'http://www.w3.org/2000/svg';

  /* ------------------------------------------------ mémoire de l'appareil (lecture seule ici) */
  const lireStation = id => { try { return JSON.parse(localStorage.getItem('cuivrezo:' + id)) || {}; } catch (e) { return {}; } };
  const tamponDe = id => (lireStation(id).defi || {}).tampon || null;
  const dateFr = iso => { try { return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR'); } catch (e) { return iso; } };
  const aujourdhui = () => { const d = new Date(), z = n => String(n).padStart(2, '0'); return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); };
  const sonActif = () => { try { return localStorage.getItem('cuivrezo-son') === '1'; } catch (e) { return false; } };
  const regleSon = v => { try { localStorage.setItem('cuivrezo-son', v ? '1' : '0'); } catch (e) {} };

  /* ------------------------------------------------ les épreuves possibles d'une station */
  /* familles de figures d'état : ce qui est une bonne pièce, ce qui est à refaire.
     Seuls les états qui montrent VRAIMENT une pièce (et non un geste) figurent ici. */
  const FAMILLES = {
    bout:       { bon: ['equerre', 'propre'], mauvais: ['biais', 'ovale', 'bavure'] },
    coude:      { bon: ['equerre'], mauvais: ['ovale', 'pli', 'vrille'] },
    dudgeon:    { bon: ['controle'], mauvais: ['fissure', 'oblique'] },
    emboiture:  { bon: ['profil'], mauvais: ['fissure', 'ovale'] },
    brasure:    { bon: ['reussie'], mauvais: ['seche', 'surchauffe', 'calamine'] },
    chapeau:    { bon: ['controle'], mauvais: ['desaxe'] },
    baionnette: { bon: ['parallele'], mauvais: ['tordue'] },
    flamme:     { bon: ['neutre'], mauvais: ['carburante', 'oxydante'] }
  };

  const piegesDiag = st => st.pieges.filter(p => p.cause && p.voit && p.eviter);

  /* les cartes de « Bonne pièce ? » : des pièces ratées prises dans les figures des pièges, plus une bonne pièce */
  function cartesPieces(st) {
    const vus = new Set(), rates = [];
    st.pieges.forEach(pg => {
      const f = pg.figure;
      if (!f || !f.svg || !FAMILLES[f.svg] || !FAMILLES[f.svg].mauvais.includes(f.etat)) return;
      const cle = f.svg + '/' + f.etat;
      if (vus.has(cle)) return; vus.add(cle);
      rates.push({ svg: f.svg, etat: f.etat, piege: pg });
    });
    const of = st.obtenir.figure;
    if (!rates.length || (!(of && FAMILLES[of.svg]) && rates.length < 2)) return [];
    const choisis = melanger(rates).slice(0, 3);
    const familles = [];
    if (of && FAMILLES[of.svg]) familles.push(of.svg);
    choisis.forEach(r => { if (!familles.includes(r.svg)) familles.push(r.svg); });
    const bonnes = familles.slice(0, 2).map(fam => {
      const bons = FAMILLES[fam].bon, etat = bons[Math.floor(Math.random() * bons.length)];
      return { svg: fam, etat, bon: true };
    });
    return melanger([...choisis.map(r => ({ ...r, bon: false })), ...bonnes]);
  }

  function epreuves(st) {
    const l = [];
    if (st.gestes.length >= 3) l.push('ordre');
    if (piegesDiag(st).length >= 3) l.push('diag');
    if (cartesPieces(st).length >= 2) l.push('piece');
    return l;
  }
  const NOMS = { ordre: 'Dans l’ordre !', diag: 'Le bon diagnostic', piece: 'Bonne pièce ?' };
  const pages = st => epreuves(st).length + 1;   /* + la page du tampon */

  /* ------------------------------------------------ le tampon (SVG) */
  function tamponSvg(id, titre, iso, sansFaute) {
    const num = id.replace('-', '.'), uid = 'tp-' + id;
    /* le texte du tour : jamais plus long que la place (police réduite si le titre est long) ; répété s'il est très court */
    let anneau = 'CUIVRÉZO ✦ ' + titre.toUpperCase() + ' ✦ ';
    if (anneau.length <= 22) anneau += anneau;
    const taille = Math.min(14, 425 / (anneau.length * 0.7)).toFixed(1);
    let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 17;
    const angle = (h - 8) * 0.9;   /* chaque tampon est posé un peu de travers, comme à la main */
    const n = document.createElementNS(NS, 'svg');
    n.setAttribute('viewBox', '0 0 200 200'); n.setAttribute('class', 'tampon-svg'); n.setAttribute('role', 'img');
    n.setAttribute('aria-label', 'Tampon de la station ' + num + ' : ' + titre);
    n.innerHTML = `<g class="tp-pose" transform="rotate(${angle} 100 100)"><g class="tp-frappe">
      <circle cx="100" cy="100" r="93" fill="none" stroke="currentColor" stroke-width="6"/>
      <circle cx="100" cy="100" r="53" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path id="${uid}" d="M100 100 m-68 0 a68 68 0 1 1 136 0 a68 68 0 1 1 -136 0" fill="none"/>
      <text font-family="Trebuchet MS,Calibri,sans-serif" font-weight="800" font-size="${taille}" fill="currentColor" letter-spacing="1"><textPath href="#${uid}" textLength="425" lengthAdjust="spacing">${anneau.replace(/&/g, '&amp;')}</textPath></text>
      <text x="100" y="106" text-anchor="middle" font-family="Trebuchet MS,Calibri,sans-serif" font-weight="800" font-size="38" fill="currentColor">${num}</text>
      ${sansFaute ? '<text x="100" y="70" text-anchor="middle" font-size="15" fill="currentColor">★ ★ ★</text>' : ''}
      <text x="100" y="129" text-anchor="middle" font-family="Calibri,Arial,sans-serif" font-weight="700" font-size="13" fill="currentColor">${dateFr(iso)}</text>
    </g></g>`;
    return n;
  }

  /* les effets : confettis cuivrés (discrets) et bruit de tampon (facultatif, coupé par défaut) */
  function confettis(hote) {
    if (reduit()) return;
    const c = el('div', 'confettis'); c.setAttribute('aria-hidden', 'true');
    const couleurs = ['#b8692e', '#e8914a', '#f3dcc6', '#c9451a', '#1b3a63'];
    for (let i = 0; i < 26; i++) {
      const s = el('span');
      s.style.cssText = `--x:${Math.round((Math.random() * 2 - 1) * 200)}px;--y:${-Math.round(50 + Math.random() * 150)}px;--r:${Math.round(Math.random() * 720 - 360)}deg;--d:${(1 + Math.random() * .8).toFixed(2)}s;background:${couleurs[i % couleurs.length]}`;
      c.append(s);
    }
    hote.append(c); setTimeout(() => c.remove(), 2600);
  }
  function bruitTampon() {
    if (!sonActif()) return;
    try {
      const C = new (window.AudioContext || window.webkitAudioContext)(), t = C.currentTime;
      const o = C.createOscillator(), g = C.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(48, t + .2);
      g.gain.setValueAtTime(.6, t); g.gain.exponentialRampToValueAtTime(.001, t + .28);
      o.connect(g); g.connect(C.destination); o.start(t); o.stop(t + .3);
    } catch (e) {}
  }

  /* ------------------------------------------------ mouvements : FLIP (les cartes glissent à leur nouvelle place) */
  function avecGlissement(liste, fn) {
    const avant = new Map([...liste.children].map(n => [n, n.getBoundingClientRect().top]));
    fn();
    if (reduit()) return;
    [...liste.children].forEach(n => {
      const d = avant.get(n) - n.getBoundingClientRect().top;
      if (d && n.animate && !n.classList.contains('glisse')) n.animate([{ transform: `translateY(${d}px)` }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  }

  /* ------------------------------------------------ briques d'écran */
  function points(n, fait) {
    const d = el('div', 'points'); d.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < n; i++) d.append(el('span', i < fait ? 'vu' : i === fait ? 'ici' : ''));
    return d;
  }
  function bouton(txt, cls, fn) {
    const b = el('button', cls, txt); b.type = 'button'; b.addEventListener('click', fn); return b;
  }
  function entete(pan, ep, p, sous) {
    pan.append(el('div', 'compteur', 'Défi ' + (p + 1) + ' sur ' + ep.length + ' · ' + NOMS[ep[p]]), el('h2', '', sous));
  }

  /* une épreuve vient d'être réussie : le tampon est donné quand toutes le sont */
  function reussir(c, ep, p) {
    c.memo[ep[p]] = true;
    const toutes = ep.every(n => c.memo[n]);
    if (toutes && !c.memo.tampon) c.memo.tampon = { date: aujourdhui(), erreurs: c.memo.erreurs || 0, nouveau: true };
    c.sauver();
    return toutes;
  }
  function suite(c, ep, p, pan, toutes) {
    const bar = el('div', 'defi-actions');
    if (toutes) bar.append(bouton('Recevoir mon tampon ▶', 'gros', () => c.page(ep.length)));
    else if (p + 1 < ep.length) bar.append(bouton('Défi suivant ▶', 'gros', () => c.page(p + 1)));
    else bar.append(bouton('Voir mon tampon ▶', 'gros', () => c.page(ep.length)));
    pan.append(bar);
    if (bar.scrollIntoView) bar.scrollIntoView({ block: 'nearest', behavior: reduit() ? 'auto' : 'smooth' });
  }
  const faute = c => { c.memo.erreurs = (c.memo.erreurs || 0) + 1; c.sauver(); };

  /* ------------------------------------------------ épreuve 1 : dans l'ordre */
  function jouerOrdre(c, ep, p, pan) {
    const st = c.st;
    let ids = st.gestes.map((g, i) => i);
    if (ids.length > 6) { const d = Math.floor(Math.random() * (ids.length - 4)); ids = ids.slice(d, d + 5); }
    let ordre = melanger(ids);
    while (ids.length > 1 && ordre.every((v, i) => v === ids[i])) ordre = melanger(ids);

    pan.replaceChildren();
    entete(pan, ep, p, 'Remettez les gestes dans l’ordre');
    pan.append(el('p', '', ids.length < st.gestes.length ? 'Voici ' + ids.length + ' gestes qui se suivent, mélangés.' : 'Voici les gestes, mélangés.'),
      el('p', 'aide', 'Touchez deux cartes pour les échanger, ou faites glisser la poignée ⠿.'));

    const ol = el('ol', 'defi-ordre');
    let choisie = null;
    const rangs = () => [...ol.children].forEach((li, i) => { li.querySelector('.rang').textContent = String(i + 1); });
    const nettoyer = () => { ol.querySelectorAll('li').forEach(li => li.classList.remove('juste', 'faux')); msg.textContent = ''; msg.className = 'defi-msg'; };
    const echanger = (a, b) => avecGlissement(ol, () => {
      const t = document.createComment(''); ol.insertBefore(t, a); ol.insertBefore(a, b); ol.insertBefore(b, t); t.remove(); rangs();
    });

    ordre.forEach(k => {
      const li = el('li'); li.dataset.k = String(k);
      const b = el('button', 'carte-ordre'); b.type = 'button';
      b.append(el('span', 'rang', ''), el('span', 'titre', st.gestes[k].titre));
      const po = el('span', 'poignee', '⠿'); po.setAttribute('aria-label', 'Faire glisser'); po.setAttribute('role', 'img');
      li.append(b, po); ol.append(li);

      b.addEventListener('click', () => {
        nettoyer();
        if (!choisie) { choisie = li; li.classList.add('choisie'); return; }
        const autre = choisie; choisie.classList.remove('choisie'); choisie = null;
        if (autre !== li) echanger(autre, li);
      });
      b.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        const v = e.key === 'ArrowUp' ? li.previousElementSibling : li.nextElementSibling;
        if (!v) return; e.preventDefault(); nettoyer(); echanger(li, v); b.focus();
      });

      /* glisser : la carte suit le doigt, les autres se poussent */
      po.addEventListener('pointerdown', e => {
        e.preventDefault(); nettoyer();
        if (choisie) { choisie.classList.remove('choisie'); choisie = null; }
        po.setPointerCapture(e.pointerId);
        const decal = e.clientY - li.getBoundingClientRect().top;
        li.classList.add('glisse');
        const suivre = ev => {
          const autres = [...ol.children].filter(n => n !== li);
          let idx = 0; autres.forEach(n => { const r = n.getBoundingClientRect(); if (ev.clientY > r.top + r.height / 2) idx++; });
          if (idx !== [...ol.children].indexOf(li)) avecGlissement(ol, () => { ol.insertBefore(li, autres[idx] || null); rangs(); });
          li.style.transform = '';
          const naturel = li.getBoundingClientRect().top;
          li.style.transform = `translateY(${ev.clientY - decal - naturel}px)`;
        };
        const fin = () => {
          po.removeEventListener('pointermove', suivre); po.removeEventListener('pointerup', fin); po.removeEventListener('pointercancel', fin);
          li.classList.remove('glisse');
          if (li.animate && !reduit()) { const t = li.style.transform; li.animate([{ transform: t || 'none' }, { transform: 'none' }], { duration: 180, easing: 'ease-out' }); }
          li.style.transform = '';
        };
        po.addEventListener('pointermove', suivre); po.addEventListener('pointerup', fin); po.addEventListener('pointercancel', fin);
      });
    });
    rangs();
    pan.append(ol);

    const msg = el('div', 'defi-msg'); msg.setAttribute('aria-live', 'polite');
    const bar = el('div', 'defi-actions');
    const verifier = bouton('Vérifier', 'gros', () => {
      const lis = [...ol.children];
      let bons = 0;
      lis.forEach((li, i) => { const ok = +li.dataset.k === ids[i]; li.classList.toggle('juste', ok); li.classList.toggle('faux', !ok); if (ok) bons++; });
      if (bons === lis.length) {
        msg.className = 'defi-msg ok'; msg.textContent = 'Bravo ! C’est bien l’ordre du geste.';
        ol.classList.add('gagne'); lis.forEach((li, i) => li.style.setProperty('--i', String(i)));
        bar.remove(); suite(c, ep, p, pan, reussir(c, ep, p));
      } else {
        faute(c);
        msg.className = 'defi-msg ko';
        msg.textContent = bons + ' carte' + (bons > 1 ? 's' : '') + ' sur ' + lis.length + ' à la bonne place. Regardez les cartes rouges et déplacez-les.';
      }
    });
    bar.append(verifier); pan.append(msg, bar);
  }

  /* ------------------------------------------------ le moteur de questions (diagnostic, pièce) */
  /* q = { fig() → élément, flip, etapes: [{ invite, question, choix: [{ t, ok }] }], fin() → éléments, geste } */
  function jouerQuiz(c, ep, p, pan, figBoite, questions, titre) {
    let file = questions.slice(), fait = 0;
    const total = questions.length;

    function poser() {
      const q = file[0]; let fauteQ = false;
      figBoite.replaceChildren(q.fig());
      const etape = k => {
        const e = q.etapes[k];
        pan.replaceChildren();
        pan.append(el('div', 'compteur', 'Défi ' + (p + 1) + ' sur ' + ep.length + ' · ' + NOMS[ep[p]]), points(total, fait), el('h2', '', titre));
        if (e.invite) pan.append(el('p', 'invite', e.invite));
        pan.append(el('div', 'question', e.question));
        const liste = el('div', 'choix-liste' + (e.lettres === false ? ' deux' : '')), retour = el('div', 'defi-retour'); retour.setAttribute('aria-live', 'polite');
        const boutons = e.choix.map((ch, i) => {
          const b = el('button', 'choix'); b.type = 'button';
          b.append(el('span', 'lettre', e.lettres === false ? '' : 'ABC'[i]), el('span', 'txt', ch.t));
          if (e.lettres === false) b.classList.add('sans-lettre');
          b.addEventListener('click', () => {
            boutons.forEach((x, j) => { x.disabled = true; x.classList.add(e.choix[j].ok ? 'juste' : 'autre'); });
            if (!ch.ok) { b.classList.remove('autre'); b.classList.add('faux'); faute(c); fauteQ = true; }
            if (ch.ok && k < q.etapes.length - 1) { retour.append(el('p', 'defi-msg ok', 'Oui.')); setTimeout(() => etape(k + 1), reduit() ? 300 : 650); return; }
            conclure(retour, ch.ok && !fauteQ);
          });
          liste.append(b); return b;
        });
        pan.append(liste, retour);
      };
      const conclure = (retour, ok) => {
        const f = figBoite.querySelector('.flip'); if (f) f.classList.add('retourne');
        retour.replaceChildren();
        retour.append(el('div', 'defi-msg ' + (ok ? 'ok' : 'ko'), ok ? 'Bien vu !' : 'Pas tout à fait. On la reverra à la fin.'));
        const ex = el('div', 'explication'); q.fin().forEach(n => ex.append(n)); retour.append(ex);
        if (q.geste != null) retour.append(c.revoir(q.geste));
        const dernier = file.length === 1 && ok;
        const bar = el('div', 'defi-actions');
        bar.append(bouton(dernier ? 'Terminer le défi ▶' : 'Question suivante ▶', 'gros', () => {
          file.shift(); if (ok) fait++; else file.push(q);
          if (file.length) poser(); else terminer();
        }));
        retour.append(bar);
        /* la carte finit de se retourner avant que la page descende jusqu'à l'explication */
        setTimeout(() => bar.scrollIntoView && bar.scrollIntoView({ block: 'nearest', behavior: reduit() ? 'auto' : 'smooth' }), f && !reduit() ? 900 : 0);
      };
      etape(0);
    }

    function terminer() {
      const b = el('div', 'figure'); b.append(el('div', 'defi-bravo', '✔')); figBoite.replaceChildren(b);
      pan.replaceChildren();
      pan.append(el('div', 'compteur', 'Défi ' + (p + 1) + ' sur ' + ep.length + ' · ' + NOMS[ep[p]]), points(total, total), el('h2', '', 'Défi réussi'),
        el('div', 'defi-msg ok', 'Toutes les réponses sont justes.'));
      suite(c, ep, p, pan, reussir(c, ep, p));
    }
    poser();
  }

  /* épreuve 2 : le bon diagnostic */
  function questionsDiag(c) {
    const pgs = piegesDiag(c.st);
    return melanger(pgs).slice(0, 3).map(pg => {
      const autres = melanger(pgs.filter(x => x.cause !== pg.cause)).slice(0, 2);
      const choix = melanger([{ t: pg.cause, ok: true }, ...autres.map(x => ({ t: x.cause, ok: false }))]);
      const dessin = figureDiag(c, pg);
      return {
        fig: () => dessin ? c.fig(pg.figure) : loupe(pg.voit),
        geste: pg.geste,
        etapes: [{ invite: dessin ? 'Ce que vous voyez : ' + pg.voit : '', question: 'Quelle est la cause ?', choix }],
        fin: () => {
          const a = el('p'); a.append(el('strong', '', pg.titre + ' : '), pg.cause);
          const b = el('p'); b.append(el('strong', '', 'Pour l’éviter : '), pg.eviter);
          return [a, b];
        }
      };
    });
  }

  /* épreuve 3 : bonne pièce ? */
  /* un piège dessiné qui montre une pièce RÉUSSIE (coche verte, sans croix rouge) contredit le piège :
     on ne le montre pas, on pose à la place ce que l'on voit, en grand */
  function figureDiag(c, pg) {
    const f = pg.figure;
    if (f && f.svg) {
      const s = CuivFigures.dessiner(f.svg, f.etat || '');
      if (/class="cz-ok"/.test(s) && !/class="cz-ko"/.test(s)) return null;
    }
    return f ? c.fig(f) : null;
  }
  function loupe(texte) {
    const b = el('div', 'figure loupe');
    const icone = document.createElementNS(NS, 'svg');
    icone.setAttribute('viewBox', '0 0 64 64'); icone.setAttribute('class', 'loupe-icone'); icone.setAttribute('aria-hidden', 'true');
    icone.innerHTML = '<circle cx="26" cy="26" r="17" fill="#fbf6ee" stroke="#b8692e" stroke-width="6"/><path d="M39 39 L56 56" stroke="#8a4a1f" stroke-width="9" stroke-linecap="round"/>';
    const t = el('div', 'loupe-titre'); t.append(icone, 'Ce que vous voyez');
    b.append(t, el('p', 'loupe-texte', texte));
    return b;
  }

  function figureCarte(carte) {
    const dessin = masque => {
      const tpl = document.createElement('template');
      let s = CuivFigures.dessiner(carte.svg, carte.etat).trim();
      if (masque) s = s.replace('<svg ', '<svg class="masque" ');
      tpl.innerHTML = s; return tpl.content;
    };
    const flip = el('div', 'flip'), av = el('div', 'face avant'), dos = el('div', 'face dos');
    av.append(dessin(true)); dos.append(dessin(false));
    flip.append(av, dos);
    const boite = el('div', 'figure defi-fig'); boite.append(flip);
    return boite;
  }
  function questionsPieces(c) {
    const st = c.st;
    return cartesPieces(st).map(carte => {
      const bon = carte.bon;
      const memes = st.pieges.filter(x => x.figure && x.figure.svg === carte.svg && x.figure.etat === carte.etat);
      const etapes = [{
        invite: 'Regardez bien la pièce dessinée.', question: 'Cette pièce est-elle bonne ?', lettres: false,
        choix: [{ t: '✔ Bonne pièce', ok: bon }, { t: '✘ À refaire', ok: !bon }]
      }];
      if (!bon) {
        const autres = melanger(st.pieges.filter(x => !memes.includes(x))).slice(0, 2);
        etapes.push({
          invite: 'Oui, elle est à refaire.', question: 'Pourquoi ?',
          choix: melanger([{ t: carte.piege.titre, ok: true }, ...autres.map(x => ({ t: x.titre, ok: false }))])
        });
      }
      return {
        fig: () => figureCarte(carte), geste: bon ? null : carte.piege.geste, etapes,
        fin: () => {
          if (bon) { const a = el('p'); a.append(el('strong', '', 'Bonne pièce. '), 'C’est ce que l’on attend : ' + st.obtenir.titre.replace(/^./, m => m.toLowerCase()) + '.'); return [a]; }
          const pg = carte.piege, a = el('p'), b = el('p');
          a.append(el('strong', '', 'À refaire : ' + pg.titre + '. '), pg.cause || pg.voit);
          b.append(el('strong', '', 'Pour l’éviter : '), pg.eviter);
          return [a, b];
        }
      };
    });
  }

  /* ------------------------------------------------ la page du tampon */
  function pageTampon(c, ep, pan, fig) {
    const st = c.st, tp = c.memo.tampon, boite = el('div', 'figure defi-fig');
    fig.replaceChildren(boite);
    if (tp) {
      const sv = tamponSvg(st.id, st.titre, tp.date, tp.erreurs === 0);
      boite.append(sv, el('div', 'legende', 'Station ' + st.id.replace('-', '.') + ' · ' + st.titre));
      if (tp.nouveau) {
        sv.classList.add('frappe'); delete tp.nouveau; c.sauver();
        setTimeout(bruitTampon, reduit() ? 0 : 380);
        setTimeout(() => confettis(boite), reduit() ? 0 : 420);
      }
    } else {
      const vide = document.createElementNS(NS, 'svg');
      vide.setAttribute('viewBox', '0 0 200 200'); vide.setAttribute('class', 'tampon-vide'); vide.setAttribute('role', 'img');
      vide.setAttribute('aria-label', 'La place du tampon de la station ' + st.id.replace('-', '.'));
      vide.innerHTML = '<circle cx="100" cy="100" r="93" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="12 9"/>'
        + '<text x="100" y="118" text-anchor="middle" font-family="Trebuchet MS,Calibri,sans-serif" font-weight="800" font-size="52" fill="currentColor">' + st.id.replace('-', '.') + '</text>';
      boite.append(vide, el('div', 'legende', 'La place de votre tampon'));
    }
    pan.append(el('div', 'compteur', 'Votre tampon'), el('h2', '', tp ? 'Station tamponnée !' : 'Il reste des défis à réussir'));
    const ul = el('ul', 'liste defi-bilan');
    ep.forEach((n, i) => {
      const li = el('li', c.memo[n] ? 'fait' : ''); li.append(el('span', 'coche', c.memo[n] ? '✔' : '○'), el('span', 'txt', NOMS[n]));
      if (!c.memo[n]) li.append(bouton('Le faire', 'petit', () => c.page(i)));
      ul.append(li);
    });
    pan.append(ul);
    if (tp) {
      pan.append(el('p', '', tp.erreurs === 0 ? 'Sans aucune faute : trois étoiles sur votre tampon.' : 'Ce tampon est dans votre passeport, sur cette tablette.'));
      const a = el('a', 'bouton-lien', 'Voir mon passeport'); a.href = c.racine + 'passeport.html'; pan.append(a);
    } else pan.append(el('p', '', 'Réussissez tous les défis : le tampon sera posé tout seul.'));
    const son = el('button', 'petit son'); son.type = 'button';
    const majSon = () => { son.textContent = sonActif() ? '🔊 Bruit du tampon : oui' : '🔇 Bruit du tampon : non'; son.setAttribute('aria-pressed', sonActif() ? 'true' : 'false'); };
    majSon(); son.addEventListener('click', () => { regleSon(!sonActif()); majSon(); if (sonActif()) bruitTampon(); });
    pan.append(son);
  }

  /* ------------------------------------------------ l'écran d'une page du temps « Le défi » */
  /* contexte c : { st, p, racine, fig(spec), memo, sauver, page(n), revoir(n) } */
  /* la figure d'accompagnement du défi : jamais la pièce 3D du « But » (lourde, elle repousse le jeu
     sous la ligne de flottaison) — le dessin de la station à la place, comme le passeport papier */
  function figureCalme(st) {
    const of = st.obtenir.figure;
    if (!of || of.composant !== 'cuivre-3d') return of;
    const img = st.vignette || [st.materiel.figure, ...st.gestes.map(g => g.figure)].find(x => x && x.img)?.img;
    return img ? { img, alt: st.titre } : of;
  }

  function ecran(c, pan) {
    const ep = epreuves(c.st), p = c.p;
    const figBoite = el('div', 'defi-zone');
    if (p >= ep.length) {
      pageTampon(c, ep, pan, figBoite);
      return { fig: figBoite, narration: 'Chaque défi réussi vous rapproche du tampon. Quand tous les défis sont faits, la station est tamponnée dans votre passeport.' };
    }
    const nom = ep[p];
    const jouer = () => {
      if (nom === 'ordre') {
        figBoite.replaceChildren(c.fig(figureCalme(c.st)));
        jouerOrdre(c, ep, p, pan);
      } else {
        jouerQuiz(c, ep, p, pan, figBoite, nom === 'diag' ? questionsDiag(c) : questionsPieces(c), nom === 'diag' ? 'Trouvez la cause' : 'Bonne ou à refaire ?');
      }
    };
    if (c.memo[nom]) {
      /* déjà réussi : on le dit, on propose de rejouer */
      figBoite.replaceChildren(c.fig(figureCalme(c.st)));
      entete(pan, ep, p, 'Défi déjà réussi ✔');
      pan.append(el('p', '', 'Vous avez réussi ce défi. Vous pouvez le rejouer pour vous entraîner.'));
      const bar = el('div', 'defi-actions');
      bar.append(bouton('Rejouer', 'second', jouer));
      if (p + 1 < ep.length) bar.append(bouton('Défi suivant ▶', 'gros', () => c.page(p + 1)));
      else bar.append(bouton('Voir mon tampon ▶', 'gros', () => c.page(ep.length)));
      pan.append(bar);
    } else jouer();
    const narr = {
      ordre: 'Remettez les gestes dans l’ordre, comme vous les feriez à l’établi. Touchez une carte, puis une autre pour les échanger, ou faites glisser la poignée. Puis touchez Vérifier.',
      diag: 'Regardez la figure et lisez ce que l’on voit. Puis choisissez la cause : pourquoi la pièce est-elle ratée ? Une seule réponse est juste.',
      piece: 'Regardez la pièce dessinée. Est-elle bonne, ou faut-il la refaire ? Si elle est à refaire, dites pourquoi.'
    };
    return { fig: figBoite, narration: narr[nom] };
  }

  /* ------------------------------------------------ l'accueil et le passeport : remplir les emplacements de tampons */
  function remplir(racine) {
    const gagnes = {};
    document.querySelectorAll('[data-slot]').forEach(s => {
      const id = s.dataset.slot, tp = tamponDe(id);
      if (!tp) return;
      gagnes[id] = true; s.classList.add('gagne');
      if (s.hasAttribute('data-grand')) s.querySelector('.emplacement').replaceChildren(tamponSvg(id, s.dataset.titre, tp.date, tp.erreurs === 0));
    });
    document.querySelectorAll('.arrets a[data-id]').forEach(a => { if (tamponDe(a.dataset.id)) a.classList.add('tamponne'); });
    document.querySelectorAll('[data-compte]').forEach(n => {
      const v = n.dataset.compte, ids = [...document.querySelectorAll('[data-slot]')].filter(s => v === 'total' || s.dataset.ligne === v).map(s => s.dataset.slot);
      const g = ids.filter(i => gagnes[i]).length;
      n.textContent = v === 'total' ? g + (g > 1 ? ' tampons' : ' tampon') + ' sur ' + ids.length : g + ' / ' + ids.length;
    });
  }
  function toutEffacer() {
    if (!confirm('Effacer tous vos tampons et votre avancement sur cette tablette ?')) return false;
    try { Object.keys(localStorage).filter(k => k.startsWith('cuivrezo:')).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    return true;
  }

  return { pages, ecran, remplir, toutEffacer, epreuves };
})();
