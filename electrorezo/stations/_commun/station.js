/* ÉlectroRézo — moteur commun des stations.
   Écrit une fois, partagé par les 48. Une station ne fournit que son contenu.

   Une station appelle :  Station.demarrer(CONTENU)
   CONTENU = { id, ligne, kicker, titre, niveaux, temps[], quiz[], jeu, correspondances[] }
   Chaque temps = { id, onglet, titre, monter(hote, ctx), narration }
   La narration est un TEXTE À PART, écrit pour l'oreille — jamais un collage de l'écran. */

const Station = (() => {
  'use strict';

  const S = { contenu: null, temps: 0, niveau: 'CAP', vitesse: .95, tour: 0,
              genre: 'homme', mp3: true, faits: new Set(), nettoyages: [] };
  const $ = s => document.querySelector(s);
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };

  /* ---------------------------------------------------------------- la voix
     La voix EXPLIQUE, elle ne lit pas l'écran — 00-charte/VOIX-ET-NARRATION.md.

     DEUX SOURCES, DANS CET ORDRE.
     · Le MP3 fabriqué (edge-tts, Henri ou Denise) : la même voix sur tous
       les postes, et elle marche hors ligne — en atelier, c'est ce qui
       compte. C'est la voix du produit.
     · La voix du navigateur, en repli : elle change d'un appareil à l'autre
       et manque sur certains, mais elle n'a besoin d'aucun fichier.

     On ne teste PAS la présence du MP3 par une requête : une station
     s'ouvre aussi en double-clic, en file://, où fetch est interdit. On
     tente de le jouer ; son erreur nous renseigne, et l'élève ne voit rien
     passer. */

  let lecteur = null;                   /* l'<audio> en cours, s'il y en a un */
  const CLE_VITESSE = 'pilote-voix-vitesse';   /* même clé que moteur/reglage-voix.js, pour tout le site */

  function voixFrancaises() {
    if (!('speechSynthesis' in window)) return [];
    return speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('fr'));
  }

  /* Piège déjà payé sur AéroRézo : un filtre qui accepte « microsoft » retient la plus
     ancienne voix du poste. On classe les vraiment neuronales d'abord. */
  function meilleureVoix() {
    const fr = voixFrancaises();
    if (!fr.length) return null;
    const neuronale = /natural|neural|online|wavenet|studio/i;
    return fr.find(v => neuronale.test(v.name)) || fr[0];
  }

  /* le texte de la voix, dans la bulle du site (moteur/sous-titres.js, injecté à la livraison) */
  const bulle = (methode, ...args) => { if (window.PiloteSousTitres) window.PiloteSousTitres[methode](...args); };

  /* Le professeur vocal du site (moteur/prof-vocal.js) suit la voix par les mêmes événements que
     moteur/voix.js : ce moteur les émet pour SES MP3 (la synthèse passe par voix.js, qui les émet). */
  const annoncer = (nom, texte) => {
    try { document.dispatchEvent(new CustomEvent('pilotevoix:' + nom, { detail: { texte: texte || '', mode: 'audio-station' } })); } catch (e) {}
  };
  /* pour le professeur vocal : « Manipuler » et « Vérifier » attendent l'élève */
  window.PILOTE_PROF_ACTIVITE = () => {
    const t = S.contenu && S.contenu.temps[S.temps];
    return !!t && (t.id === 'manipuler' || t.id === 'verifier');
  };
  const vitesseVoix = () => window.PILOTE_VOIX_REGLAGE ? window.PILOTE_VOIX_REGLAGE.vitesse() : S.vitesse;

  /* Le guidage (29/10/2026, F. Henninot : « si l'élève doit aller chercher l'image de la voix, il est perdu
     instantanément ») : pendant que la voix parle, l'écran montre ce qu'elle explique, sans la souris.
     Une station le déclare dans narration.js : window.GUIDAGE = { <id du temps> : [{ quand, montre, clic }] }.
       quand  : le début d'une phrase de la narration ;
       montre : un texte visible à l'écran (légende, ligne, titre, texte d'une image) ou '3D' ; la page défile
                jusqu'à lui et un cadre l'entoure jusqu'à la consigne suivante ;
       clic   : facultatif, le texte d'un bouton à presser à ce moment (étape de la vue 3D, bouton du schéma).
     La phrase en cours s'estime comme dans la bulle des sous-titres : à la part du texte déjà dite. */
  const GUIDE = { minuterie: null, cadre: null };
  const aplatir = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
  /* la page du temps : l'espace de travail ET la vue 3D, que les modèles posent à côté de lui */
  const guideZone = () => { const w = document.querySelector('.workspace'); return (w && w.parentElement) || document.body; };
  function guideTrouver(montre) {
    const zone = guideZone();
    const visibles = [...zone.querySelectorAll('canvas, img, figcaption, p, li, tr, td, h2, h3, h4, strong, b, button, span, div')].filter(e => e.offsetParent);
    if (aplatir(montre) === '3d') {
      let e = visibles.find(x => x.tagName === 'CANVAS');
      if (e && e.closest('.vue3d')) return e.closest('.vue3d');
      while (e && e.parentElement && !e.querySelector('button')) e = e.parentElement;   /* le bloc de la vue, avec ses boutons */
      return e || null;
    }
    const m = aplatir(montre);
    let choix = null, longueur = Infinity;
    for (const e of visibles) {
      const t = aplatir(e.tagName === 'IMG' ? e.alt : e.textContent);
      if (t.includes(m) && t.length < longueur) { choix = e; longueur = t.length; }
    }
    if (!choix) return null;
    /* le titre d'une vue 3D : la vue entière, ses boutons sont les siens (la 9.3 en a deux) ; une ligne de son tableau reste une ligne */
    if (choix.closest('.vue3d') && !choix.closest('tr, li, p, figure')) return choix.closest('.vue3d');
    if (/^H[2-4]$/.test(choix.tagName)) return choix.closest('section, .card') || choix.parentElement;   /* un titre : tout son cadre */
    return choix.closest('figure') || choix.closest('li, tr, p') || choix;
  }
  function guidePresser(texte, pres) {
    const m = aplatir(texte);
    const boutons = [...guideZone().querySelectorAll('button')].filter(b => b.offsetParent && aplatir(b.textContent).includes(m));
    const exact = boutons.filter(x => aplatir(x.textContent) === m);   /* « 1 » ne doit pas presser « 10 » */
    const b = exact.find(x => pres && pres.contains(x)) || boutons.find(x => pres && pres.contains(x)) || exact[0] || boutons[0];
    if (b) b.click();
  }
  function guideMontrer(c) {
    if (!document.getElementById('guide-style')) {
      const st = document.createElement('style'); st.id = 'guide-style';
      st.textContent = '.guide-cadre{outline:4px solid #c9451a;outline-offset:4px;border-radius:6px;scroll-margin-top:90px;animation:guide-pouls 1.4s ease-in-out 2}'
        + '@keyframes guide-pouls{50%{outline-color:rgba(201,69,26,.3)}}'
        + '@media (prefers-reduced-motion:reduce){.guide-cadre{animation:none}}';
      document.head.appendChild(st);
    }
    const cadrer = cible => {
      if (!cible || cible === GUIDE.cadre) return;
      if (GUIDE.cadre) GUIDE.cadre.classList.remove('guide-cadre');
      GUIDE.cadre = cible;
      cible.classList.add('guide-cadre');
      const doux = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      const grand = cible.getBoundingClientRect().height > window.innerHeight * 0.8;   /* plus haut que l'écran : on montre son début */
      cible.scrollIntoView({ behavior: doux ? 'smooth' : 'auto', block: grand ? 'start' : 'center' });
    };
    const cible = c.montre ? guideTrouver(c.montre) : null;
    /* ce qu'il faut montrer est caché (le tableau derrière « En schéma ») : le bouton d'abord, puis le cadre */
    if (!cible && c.clic) { guidePresser(c.clic, null); setTimeout(() => cadrer(c.montre ? guideTrouver(c.montre) : null), 250); return; }
    cadrer(cible);
    if (c.clic) guidePresser(c.clic, cible);
  }
  function guideArreter() {
    clearInterval(GUIDE.minuterie); GUIDE.minuterie = null;
    if (GUIDE.cadre) { GUIDE.cadre.classList.remove('guide-cadre'); GUIDE.cadre = null; }
  }
  /* progression() rend la part dite, de 0 à 1 */
  function guideSuivre(t, progression) {
    guideArreter();
    const liste = window.GUIDAGE && window.GUIDAGE[t.id];
    if (!liste || !liste.length) return;
    (S.demos || []).forEach(f => f()); S.demos = [];   /* la démonstration automatique s'efface devant la voix */
    const texte = String(t.narration || '');
    const plat = aplatir(texte);
    const total = plat.length || 1;
    /* chaque consigne prend la place de sa phrase dans le texte */
    const etapes = liste.map(c => ({ c, a: plat.indexOf(aplatir(c.quand)) })).filter(x => x.a >= 0).sort((x, y) => x.a - y.a);
    let faite = -1;
    const tic = () => {
      const dit = Math.max(0, Math.min(1, progression() || 0)) * total;
      let k = faite;
      while (k + 1 < etapes.length && etapes[k + 1].a <= dit) k++;
      if (k > faite) { faite = k; guideMontrer(etapes[k].c); }
    };
    tic();
    GUIDE.minuterie = setInterval(tic, 200);
  }

  function couperVoix() {
    S.tour++;
    guideArreter();
    bulle('cacher');
    if (lecteur) { lecteur.pause(); lecteur = null; annoncer('annulation'); }
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const b = $('#btVoix'); if (b) { b.textContent = '▶ Écouter'; b.setAttribute('aria-pressed', 'false'); }
  }

  function direNarration() {
    const b = $('#btVoix');

    /* déjà en train de parler : le bouton met en pause, puis reprend —
       peu importe laquelle des deux sources est au travail. */
    if (lecteur) {
      if (lecteur.paused) { lecteur.play().catch(() => {}); b.textContent = 'Ⅱ Pause'; }
      else { lecteur.pause(); b.textContent = '▶ Reprendre'; }
      return;
    }
    if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking && !speechSynthesis.paused) { speechSynthesis.pause(); b.textContent = '▶ Reprendre'; return; }
      if (speechSynthesis.paused) { speechSynthesis.resume(); b.textContent = 'Ⅱ Pause'; return; }
    }

    const t = S.contenu.temps[S.temps];
    const texte = (t.narration || '').trim();
    if (!texte) return;
    couperVoix();
    const tour = ++S.tour;
    if (S.mp3) jouerLeMp3(t, tour, b);
    else direAuNavigateur(texte, tour, b);
  }

  function jouerLeMp3(t, tour, b) {
    /* La clé ?v= suit le texte dit (25/10/2026, comme CartoClim) : une narration revoicée change d'adresse,
       et ni le CDN ni le navigateur ne ressert l'ancienne voix. */
    let h = 0;
    for (const c of (t.narration || '')) h = (h * 31 + c.charCodeAt(0)) | 0;
    const a = new Audio('voix/' + S.genre + '/' + t.id + '.mp3?v=' + (h >>> 0).toString(36));
    a.playbackRate = vitesseVoix();
    let annonce = false;
    a.addEventListener('playing', () => {
      if (tour === S.tour) {
        b.textContent = 'Ⅱ Pause'; b.setAttribute('aria-pressed', 'true'); bulle('montrer', t.narration, { audio: a });
        if (!annonce) { annonce = true; annoncer('debut', t.narration); guideSuivre(t, () => a.duration > 0 ? a.currentTime / a.duration : 0); }
      } });
    a.addEventListener('ended', () => {
      if (tour === S.tour) { lecteur = null; guideArreter(); b.textContent = '▶ Écouter'; b.setAttribute('aria-pressed', 'false'); bulle('cacher'); annoncer('fin', t.narration); } });
    a.addEventListener('error', () => {
      /* pas de fichier ici : on ne réessaiera plus de la séance — repli sur
         la voix du poste, et on dit quand même. */
      if (tour !== S.tour) return;
      lecteur = null; S.mp3 = false;
      direAuNavigateur((t.narration || '').trim(), tour, b);
    });
    lecteur = a;
    a.play().catch(() => {});
  }

  function direAuNavigateur(texte, tour, b) {
    /* Repli du repli : aucune voix française sur ce poste (ou pas de
       synthèse du tout). On ne parle pas dans une langue au hasard —
       jamais voices[0]. */
    const v = meilleureVoix();
    if (!v) { b.textContent = 'Voix indisponible'; b.disabled = true; return; }
    /* la table de prononciation partagée : ce chemin sert quand le MP3 manque ou
       ne se charge pas, et il livrait jusqu'ici le texte brut à la synthèse. */
    const dit = window.PILOTE_PRONONCIATION ? window.PILOTE_PRONONCIATION.oraliser(texte) : texte;
    const u = new SpeechSynthesisUtterance(dit);
    u.lang = 'fr-FR'; u.rate = vitesseVoix(); u.pitch = 1; u.voice = v;
    u.onstart = () => { if (tour === S.tour) { b.textContent = 'Ⅱ Pause'; b.setAttribute('aria-pressed', 'true'); bulle('montrer', texte, { debit: u.rate });
      const t0 = Date.now(), duree = texte.length / (14 * u.rate) * 1000;   /* 14 caractères par seconde, comme la bulle */
      guideSuivre(S.contenu.temps[S.temps], () => (Date.now() - t0) / duree); } };
    u.onend = u.onerror = () => { if (tour === S.tour) { guideArreter(); b.textContent = '▶ Écouter'; b.setAttribute('aria-pressed', 'false'); bulle('cacher'); } };
    speechSynthesis.speak(u);
  }

  /* ---------------------------------------------------------------- les cinq temps */

  function filTemps() {
    const fil = $('#filTemps');
    fil.querySelectorAll('button[data-temps]').forEach(b => b.remove());
    S.contenu.temps.forEach((t, i) => {
      const b = el('button', S.faits.has(i) ? 'fait' : '', t.onglet);
      b.type = 'button'; b.dataset.temps = i;
      if (i === S.temps) b.setAttribute('aria-current', 'step');
      b.addEventListener('click', () => allerAu(i));
      fil.insertBefore(b, fil.querySelector('.voix-box'));
    });
  }

  /* La station voisine dans l'ordre du réseau, ou null. RESEAU n'est pas
     toujours là : une station ouverte seule, hors du réseau, doit marcher
     quand même — c'est le contrat HydroMétro. */
  function voisine(sens) {
    if (typeof RESEAU === 'undefined' || !S.contenu) return null;
    try { return RESEAU[sens](S.contenu.id); } catch (e) { return null; }
  }

  /* Démonstration à l'ouverture d'un temps (audit animation, 15/10/2026) : une grandeur se comprend par ce qu'elle
     fait quand elle VARIE. La réglette du schéma (ou sa barre d'états) bouge seule pendant deux cycles, puis revient
     à sa valeur : l'écran montre la relation, l'élève la vérifie ensuite. Il reprend la main dès qu'il touche le
     cadre. Interrupteur « Animations » coupé : rien ne bouge. */
  function demontrer(hote) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cartes = [...hote.querySelectorAll('.card')].filter(c => c.querySelector('svg'));
    let carte = null, reglette = null, etats = null;
    for (const c of cartes) {
      reglette = c.querySelector('input[type=range]');
      if (reglette) { carte = c; break; }
      const b = [...c.querySelectorAll('.choix button[aria-pressed]')];
      if (b.length >= 2) { carte = c; etats = b; break; }
    }
    if (!carte) return;
    let minuteur = null, fini = false;
    const arreter = () => { if (fini) return; fini = true; clearInterval(minuteur); carte.removeEventListener('pointerdown', main, true); carte.removeEventListener('keydown', main, true); };
    const main = e => { if (e.isTrusted) arreter(); };
    carte.addEventListener('pointerdown', main, true); carte.addEventListener('keydown', main, true);
    S.nettoyages.push(arreter);
    (S.demos || (S.demos = [])).push(arreter);   /* la voix qui guide l'arrête : un seul maître pour l'écran */
    if (reglette) {
      const min = +reglette.min || 0, max = reglette.max === '' ? 100 : +reglette.max, pas = +reglette.step || 1, v0 = +reglette.value;
      const poser = v => { const x = Math.round(v / pas) * pas; if (+reglette.value !== x) { reglette.value = x; reglette.dispatchEvent(new Event('input', { bubbles: true })); reglette.dispatchEvent(new Event('change', { bubbles: true })); } };
      const t0 = performance.now(), cycle = 7000;
      minuteur = setInterval(() => {
        if (!reglette.isConnected) return arreter();
        const k = (performance.now() - t0) / cycle;
        if (k >= 2) { poser(v0); return arreter(); }
        /* part de la valeur posée, monte au maximum, descend au minimum, revient */
        const a = Math.sin(k * 2 * Math.PI);
        poser(a >= 0 ? v0 + (max - v0) * a : v0 + (v0 - min) * a);
      }, 120);
    } else {
      const depart = Math.max(0, etats.findIndex(b => b.getAttribute('aria-pressed') === 'true'));
      let n = 0;
      minuteur = setInterval(() => {
        if (!carte.isConnected) return arreter();
        n++;
        etats[(depart + n) % etats.length].click();
        if (n >= etats.length * 2) arreter();
      }, 2800);
    }
  }

  /* Le symbole se trace (audit animation, 15/10/2026) : sur « Représenter », chaque symbole de la bibliothèque
     (jamais redessiné : le même fichier, intégré à la page) se trace trait par trait dans l'ordre du fichier, comme
     au tableau, reste affiché, puis se retrace toutes les 12 s. Un fichier qui porte un <style>, un script ou une
     animation reste une image. Interrupteur « Animations » coupé : symbole fixe. Styles : station.css. */
  let nSymbole = 0;
  /* chaque trait d'un dessin reçoit son rang et sa longueur ; les styles .sy-vivant font le reste */
  function tracer(racine) {
    let k = 0;
    racine.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect').forEach(e => {
      if (e.closest('defs, clipPath, mask, marker, symbol')) return;
      const cs = getComputedStyle(e);
      /* un tireté (liaison mécanique…) porte un sens : il apparaît en fondu, il ne se trace pas (son tiret resterait plein) */
      if (cs.stroke && cs.stroke !== 'none' && cs.strokeDasharray && cs.strokeDasharray !== 'none') { e.classList.add('sy-apparait'); e.style.setProperty('--sy-i', k++); }
      else if (cs.stroke && cs.stroke !== 'none' && e.getTotalLength) {
        let L = 0; try { L = e.getTotalLength(); } catch (x) { L = 0; }
        if (L > 0) { e.classList.add('sy-trait'); e.style.setProperty('--sy-l', Math.ceil(L) + 'px'); e.style.setProperty('--sy-i', k++); }
      }
      if (cs.fill && cs.fill !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(cs.fill)) { e.classList.add('sy-plein'); e.style.setProperty('--sy-i', k++); }
    });
  }
  function tracerSymboles(hote) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    /* un dessin déjà dans la page qui demande à se tracer (la lettre de la ligne 8 : Signes.lettreSeule) */
    hote.querySelectorAll('.a-tracer').forEach(g => { g.classList.add('sy-vivant'); tracer(g); });
    if (!window.fetch || !window.DOMParser) return;
    hote.querySelectorAll('.symboles img[src$=".svg"]').forEach(img => {
      fetch(img.src).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(txt => {
        if (!img.isConnected || /<script|<style|@keyframes|<animate/i.test(txt)) return;
        const doc = new DOMParser().parseFromString(txt, 'image/svg+xml'), src = doc.documentElement;
        if (!src || src.tagName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) return;
        const svg = document.importNode(src, true), p = 'sy' + (++nSymbole) + '-', ids = {};
        svg.querySelectorAll('[id]').forEach(e => { ids[e.id] = p + e.id; e.id = p + e.id; });
        svg.querySelectorAll('*').forEach(e => [...e.attributes].forEach(a => {
          if (a.value.indexOf('url(#') >= 0) e.setAttribute(a.name, a.value.replace(/url\(#([^)]+)\)/g, (m, id) => ids[id] ? 'url(#' + ids[id] + ')' : m));
          else if (/^(xlink:)?href$/.test(a.name) && a.value[0] === '#' && ids[a.value.slice(1)]) e.setAttribute(a.name, '#' + ids[a.value.slice(1)]);
        }));
        svg.removeAttribute('width'); svg.removeAttribute('height');
        svg.setAttribute('class', ((svg.getAttribute('class') || '') + ' sy-vivant').trim());
        svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', img.alt || '');
        img.replaceWith(svg);
        tracer(svg);
      }).catch(() => { /* l'image reste */ });
    });
  }

  function allerAu(i) {
    if (i < 0 || i >= S.contenu.temps.length) return;
    couperVoix();
    /* Un temps qui s'en va emporte ses minuteurs : sinon le chrono du mini-jeu
       continue de tourner pendant qu'on lit un autre temps. */
    S.nettoyages.forEach(f => { try { f(); } catch (e) {} });
    S.nettoyages = [];
    S.faits.add(S.temps);
    S.temps = i;
    const hote = $('#scene');
    hote.innerHTML = '';
    S.contenu.temps[i].monter(hote, { niveau: S.niveau, allerAu, majTemps: filTemps });
    demontrer(hote);
    tracerSymboles(hote);
    $('#titreTemps') && ($('#titreTemps').textContent = S.contenu.temps[i].titre);
    const sansVoix = !(S.contenu.temps[i].narration || '').trim();
    $('#btVoix').disabled = sansVoix;
    $('#btVoix').textContent = sansVoix ? 'Pas de voix ici' : '▶ Écouter';
    /* Au bout des cinq temps, « Suivant » ne s'éteint pas : il ouvre la station
       d'après. Sans cela, chaque station est une île et il faut repasser par la
       carte à chaque fois. */
    const dernier = i === S.contenu.temps.length - 1;
    const suite = dernier ? voisine('apres') : null;
    $('#precedent').disabled = i === 0;
    $('#suivant').disabled = dernier && !suite;
    $('#suivant').textContent = suite
      ? (suite.ligne === S.contenu.ligne ? 'Station ' + suite.id + ' ▶' : 'Ligne ' + suite.ligne + ' ▶')
      : 'Suivant ▶';
    $('#suivant').title = suite ? suite.id + ' ' + suite.titre : '';
    filTemps();
    hote.scrollIntoView({ block: 'nearest' });
  }

  /* ---------------------------------------------------------------- le quiz
     Sans note au premier passage. Une réponse fausse explique pourquoi. */

  function monterQuiz(hote, questions) {
    const carte = el('section', 'card');
    carte.appendChild(el('h2', null, 'Questions'));
    carte.appendChild(el('p', 'legende', 'Pas de note ici. On répond, on lit pourquoi, on avance.'));
    questions.forEach((q, iq) => {
      const bloc = el('div', 'q');
      bloc.appendChild(el('p', null, (iq + 1) + '. ' + q.question));
      const rep = el('div', 'reponses');
      q.reponses.forEach((r, ir) => {
        const b = el('button', null, String.fromCharCode(65 + ir) + '.  ' + r.texte);
        b.type = 'button';
        b.addEventListener('click', () => {
          if (bloc.dataset.repondu) return;
          bloc.dataset.repondu = '1';
          rep.querySelectorAll('button').forEach((x, k) => {
            if (q.reponses[k].juste) x.dataset.etat = 'juste';
            else if (k === ir) x.dataset.etat = 'faux';
            x.disabled = true;
          });
          const p = el('p', 'pourquoi');
          p.textContent = r.juste ? '✔ ' + (q.confirmation || 'C’est cela.') : '✘ ' + r.pourquoi;
          bloc.appendChild(p);
        });
        rep.appendChild(b);
      });
      bloc.appendChild(rep);
      carte.appendChild(bloc);
    });
    hote.appendChild(carte);
  }

  /* ---------------------------------------------------------------- le mini-jeu
     Format 7 du catalogue : l'atelier chronométré. Cinq cas, un piège,
     un cas où le bon geste est de dire qu'on ne sait pas. */

  function monterJeu(hote, jeu) {
    const carte = el('section', 'card');
    carte.appendChild(el('h2', null, jeu.titre));
    carte.appendChild(el('p', 'legende', jeu.regle));

    const entete = el('div', 'jeu-entete');
    const compteur = el('span', 'compteur', '');
    const chrono = el('div', 'chrono'); const jauge = el('i'); chrono.appendChild(jauge);
    /* sans jeu.secondes : ni barre ni minuteur (un jeu sans chronomètre) */
    const sansChrono = !jeu.secondes;
    entete.appendChild(compteur); if (!sansChrono) entete.appendChild(chrono);
    const fiche = el('div', 'fiche');
    const choix = el('div', 'choix');
    const journal = el('ul', 'journal');
    carte.append(entete, fiche, choix, journal);
    hote.appendChild(carte);

    let i = 0, bons = 0, minuteur = null, reste = 0;
    S.nettoyages.push(() => clearInterval(minuteur));

    function poser() {
      clearInterval(minuteur);
      if (i >= jeu.cas.length) return conclure();
      const c = jeu.cas[i];
      compteur.textContent = (jeu.etiquette || 'Cas') + ' ' + (i + 1) + ' sur ' + jeu.cas.length;
      fiche.innerHTML = '';
      const dl = el('dl');
      c.fiche.forEach(([k, v]) => { dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); });
      fiche.appendChild(el('p', null, c.enonce));
      fiche.appendChild(dl);
      choix.innerHTML = '';
      jeu.actions.forEach(a => {
        const b = el('button', null, a.libelle); b.type = 'button';
        b.addEventListener('click', () => repondre(a.id));
        choix.appendChild(b);
      });
      if (sansChrono) return;
      reste = jeu.secondes; chrono.classList.remove('presse'); jauge.style.width = '100%';
      minuteur = setInterval(() => {
        reste -= .1;
        jauge.style.width = Math.max(0, reste / jeu.secondes * 100) + '%';
        if (reste <= jeu.secondes * .3) chrono.classList.add('presse');
        if (reste <= 0) repondre(null);
      }, 100);
    }

    function repondre(action) {
      clearInterval(minuteur);
      const c = jeu.cas[i];
      const bon = action === c.bonne;
      if (bon) bons++;
      const li = el('li');
      li.appendChild(el('span', bon ? 'bon' : 'rate', (bon ? '✔ ' : '✘ ') + (jeu.etiquette || 'Cas') + ' ' + (i + 1) + ' — '));
      li.appendChild(document.createTextNode(action === null ? 'temps écoulé. ' + c.explication : c.explication));
      journal.appendChild(li);
      i++; poser();
    }

    function conclure() {
      /* jeu.fin : un seul message, sans décompte ni seuil (doctrine : aucun score affiché) */
      compteur.textContent = jeu.fin ? 'Terminé' : bons + ' bons gestes sur ' + jeu.cas.length;
      fiche.innerHTML = '';
      fiche.appendChild(el('p', null, jeu.fin || (bons === jeu.cas.length ? jeu.reussite : jeu.echec)));
      choix.innerHTML = '';
      const b = el('button', 'primary', 'Rejouer'); b.type = 'button';
      b.addEventListener('click', () => { i = 0; bons = 0; journal.innerHTML = ''; poser(); });
      choix.appendChild(b);
    }

    poser();
  }

  /* ---------------------------------------------------------------- démarrage */

  function demarrer(contenu) {
    S.contenu = contenu;
    S.niveau = contenu.niveaux[0].id;
    /* Une voix par station, fixée par hachage — plus de choix à l'écran.
       genre est calculé une fois dans reseau.js (même règle que le fonds
       commun du site) : une station refabriquée garde sa voix. */
    const fiche = (typeof RESEAU !== 'undefined' && RESEAU.stations)
      ? RESEAU.stations.find(s => s.id === contenu.id) : null;
    if (fiche && fiche.genre) S.genre = fiche.genre;

    $('#kicker').textContent = contenu.kicker;
    $('#titre').textContent = contenu.titre;
    document.title = 'ÉlectroRézo ' + contenu.id + ' — ' + contenu.titre;

    const sw = $('#niveaux');
    contenu.niveaux.forEach((n, k) => {
      const b = el('button', null, n.libelle); b.type = 'button';
      b.dataset.niveau = n.id; b.setAttribute('aria-pressed', String(k === 0));
      b.addEventListener('click', () => {
        S.niveau = n.id;
        sw.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        allerAu(S.temps);
      });
      sw.appendChild(b);
    });

    $('#btVoix').addEventListener('click', direNarration);
    const rg = $('#vitesse'), out = $('#vitesseOut');
    /* Sur le site, le réglage commun (moteur/reglage-voix.js, injecté à la livraison) remplace le
       curseur : un seul réglage, le même partout (décision de F. Henninot, 16/10/2026). Le
       changer coupe la lecture (§ 5 de la charte voix). À l'atelier, le curseur garde la main. */
    if (window.PILOTE_VOIX_REGLAGE) {
      [rg, out, document.querySelector('label[for="vitesse"]')].forEach(x => { if (x) x.hidden = true; });
      window.PILOTE_VOIX_REGLAGE.monter($('#btVoix').parentNode);
      document.addEventListener('pilotevoix:vitesse', couperVoix);
    }
    /* Même clé de session que moteur/reglage-voix.js : le réglage vaut pour
       toute la visite, pas station par station. */
    try {
      const mem = +sessionStorage.getItem(CLE_VITESSE);
      if (mem >= .6 && mem <= 1.4) { S.vitesse = mem; rg.value = mem; out.textContent = mem.toFixed(2).replace('.', ',') + '×'; }
    } catch (e) {}
    rg.addEventListener('input', () => {
      S.vitesse = +rg.value; out.textContent = S.vitesse.toFixed(2).replace('.', ',') + '×';
      /* Le moteur de synthèse ignore un changement de débit en pleine phrase :
         laisser croire le contraire serait un faux réglage. On coupe, comme
         sur le reste du site (moteur/reglage-voix.js). */
      couperVoix();
      try { sessionStorage.setItem(CLE_VITESSE, String(S.vitesse)); } catch (e) {}
    });

    $('#precedent').addEventListener('click', () => {
      if (S.temps > 0) return allerAu(S.temps - 1);
      const v = voisine('avant');
      if (v) location.href = '../' + v.dossier + '/index.html';
    });
    $('#suivant').addEventListener('click', () => {
      if (S.temps < S.contenu.temps.length - 1) return allerAu(S.temps + 1);
      const v = voisine('apres');
      if (v) location.href = '../' + v.dossier + '/index.html';
    });
    $('#btPlan').addEventListener('click', () => { location.href = '../../carte-reseau.html'; });

    /* Crédits : demande de F. Henninot du 28/08 — citer la source, discrètement sous
       l'image et en entier en fin de dossier. */
    const btC = $('#btCredits');
    if (btC && (contenu.credits || []).length) {
      btC.addEventListener('click', () => {
        const d = $('#dlgCredits'), corps = $('#creditsListe');
        corps.innerHTML = '';
        contenu.credits.forEach(c => {
          const li = el('li');
          li.appendChild(el('strong', null, c.quoi));
          li.appendChild(document.createTextNode(' — ' + c.source));
          if (c.detail) { li.appendChild(document.createElement('br'));
                          li.appendChild(el('small', null, c.detail)); }
          corps.appendChild(li);
        });
        d.showModal();
      });
    } else if (btC) btC.classList.add('hidden');

    /* ------------------------------------------------- ce qu'il faut avoir en tête
       LA SPIRALE. Une station ne se lit pas dans le vide : elle suppose des
       choses vues avant. On les rappelle en une ligne, en tête, avec un lien
       vers la station qui les explique — pas un resume, un chemin. Celui qui
       sait passe outre sans y penser ; celui qui a oublie sait ou retourner
       en un clic, au lieu de subir une station qu'il ne comprend pas.

       Le rappel s'abrege de lui-meme au fil du parcours : les premieres
       stations d'une ligne ne supposent rien, les suivantes s'appuient sur
       ce qui vient d'etre vu, et les dernieres sur trois choses au plus. */
    const avant = contenu.prerequis || [];
    if (avant.length) {
      const bande = el('p', 'prerequis');
      bande.appendChild(el('strong', null, 'À avoir en tête : '));
      avant.forEach((p, i) => {
        if (i) bande.appendChild(document.createTextNode(' · '));
        const d = (typeof RESEAU !== 'undefined' && RESEAU.dossierDe)
          ? RESEAU.dossierDe(p.id) : null;
        if (d) {
          const a = document.createElement('a');
          a.href = '../' + d + '/index.html';
          a.textContent = p.quoi + ' (' + p.id + ')';
          bande.appendChild(a);
        } else bande.appendChild(document.createTextNode(p.quoi + ' (' + p.id + ')'));
      });
      const hote = $('#scene');
      hote.parentNode.insertBefore(bande, hote);
    }

    const corr = $('#corresp');
    (contenu.correspondances || []).forEach(c => {
      const s = el(c.href ? 'a' : 'span', 'lien');
      if (c.href) s.href = c.href;
      const p = el('span', 'pastille', String(c.ligne)); p.style.background = c.couleur;
      s.appendChild(p); s.appendChild(document.createTextNode(' ' + c.texte));
      corr.appendChild(s);
    });

    filTemps();
    allerAu(0);
  }

  /* Mention discrète à poser sous une image. Le détail complet va dans le dialogue Crédits. */
  function credit(hote, texte) {
    hote.appendChild(el('p', 'credit', texte));
  }

  /* La loupe : une photo de la bande s'ouvre en grand — un tableau, une courbe, un catalogue
     illisibles en vignette se lisent enfin. */
  document.addEventListener('click', e => {
    const im = e.target.closest && e.target.closest('.vignette img');
    if (!im) return;
    let d = document.getElementById('dlgLoupe');
    if (!d) {
      d = document.createElement('dialog'); d.id = 'dlgLoupe';
      d.innerHTML = '<img alt=""><p></p><form method="dialog"><button>Fermer</button></form>';
      d.addEventListener('click', ev => { if (ev.target === d || ev.target.tagName === 'IMG') d.close(); });
      document.body.appendChild(d);
    }
    d.querySelector('img').src = im.src; d.querySelector('img').alt = im.alt;
    const fc = im.closest('figure').querySelector('figcaption');
    d.querySelector('p').textContent = fc ? fc.textContent : '';
    d.showModal();
  });

  return { demarrer, monterQuiz, monterJeu, couperVoix, credit, etat: S,
           auDemontage: f => S.nettoyages.push(f) };
})();
