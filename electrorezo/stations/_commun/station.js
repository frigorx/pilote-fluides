/* ÉlectroRézo — moteur commun des stations.
   Écrit une fois, partagé par les 48. Une station ne fournit que son contenu.

   Une station appelle :  Station.demarrer(CONTENU)
   CONTENU = { id, ligne, kicker, titre, niveaux, temps[], quiz[], jeu, correspondances[] }
   Chaque temps = { id, onglet, titre, monter(hote, ctx), narration }
   La narration est un TEXTE À PART, écrit pour l'oreille — jamais un collage de l'écran. */

const Station = (() => {
  'use strict';

  const S = { contenu: null, temps: 0, niveau: 'CAP', vitesse: .95, voix: null, tour: 0,
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

  const GENRES = { homme: 'Henri', femme: 'Denise' };
  let lecteur = null;                   /* l'<audio> en cours, s'il y en a un */

  function voixFrancaises() {
    if (!('speechSynthesis' in window)) return [];
    return speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('fr'));
  }

  /* Piège déjà payé sur AéroRézo : un filtre qui accepte « microsoft » retient la plus
     ancienne voix du poste. On classe les vraiment neuronales d'abord. */
  function meilleureVoix() {
    const fr = voixFrancaises();
    if (!fr.length) return null;
    if (S.voix) { const v = fr.find(v => v.name === S.voix); if (v) return v; }
    const neuronale = /natural|neural|online|wavenet|studio/i;
    return fr.find(v => neuronale.test(v.name)) || fr[0];
  }

  function remplirVoix() {
    const sel = $('#voixPick'); if (!sel) return;
    if (S.mp3) {
      sel.classList.remove('hidden');
      sel.innerHTML = '';
      Object.entries(GENRES).forEach(([g, nom]) => {
        const o = el('option', null, nom); o.value = g; sel.appendChild(o);
      });
      sel.value = S.genre;
      return;
    }
    const liste = voixFrancaises();
    if (liste.length < 2) { sel.classList.add('hidden'); return; }
    sel.classList.remove('hidden');
    sel.innerHTML = '';
    const neuronale = /natural|neural|online|wavenet|studio/i;
    [...liste].sort((a, b) => (neuronale.test(b.name) ? 1 : 0) - (neuronale.test(a.name) ? 1 : 0))
      .forEach(v => { const o = el('option', null, v.name.replace(/^Microsoft\s+/, '')); o.value = v.name; sel.appendChild(o); });
    sel.value = (meilleureVoix() || liste[0]).name;
  }

  function couperVoix() {
    S.tour++;
    if (lecteur) { lecteur.pause(); lecteur = null; }
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
    const a = new Audio('voix/' + S.genre + '/' + t.id + '.mp3');
    a.playbackRate = S.vitesse;
    a.addEventListener('playing', () => {
      if (tour === S.tour) { b.textContent = 'Ⅱ Pause'; b.setAttribute('aria-pressed', 'true'); } });
    a.addEventListener('ended', () => {
      if (tour === S.tour) { lecteur = null; b.textContent = '▶ Écouter'; b.setAttribute('aria-pressed', 'false'); } });
    a.addEventListener('error', () => {
      /* pas de fichier ici : on ne réessaiera plus de la séance, le
         sélecteur repasse aux voix du poste, et on dit quand même. */
      if (tour !== S.tour) return;
      lecteur = null; S.mp3 = false; remplirVoix();
      direAuNavigateur((t.narration || '').trim(), tour, b);
    });
    lecteur = a;
    a.play().catch(() => {});
  }

  function direAuNavigateur(texte, tour, b) {
    if (!('speechSynthesis' in window)) { b.textContent = 'Voix indisponible'; b.disabled = true; return; }
    /* la table de prononciation partagée : ce chemin sert quand le MP3 manque ou
       ne se charge pas, et il livrait jusqu'ici le texte brut à la synthèse. */
    const dit = window.PILOTE_PRONONCIATION ? window.PILOTE_PRONONCIATION.oraliser(texte) : texte;
    const u = new SpeechSynthesisUtterance(dit);
    u.lang = 'fr-FR'; u.rate = S.vitesse; u.pitch = 1;
    const v = meilleureVoix(); if (v) u.voice = v;
    u.onstart = () => { if (tour === S.tour) { b.textContent = 'Ⅱ Pause'; b.setAttribute('aria-pressed', 'true'); } };
    u.onend = u.onerror = () => { if (tour === S.tour) { b.textContent = '▶ Écouter'; b.setAttribute('aria-pressed', 'false'); } };
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
    entete.appendChild(compteur); entete.appendChild(chrono);
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
      compteur.textContent = bons + ' bons gestes sur ' + jeu.cas.length;
      fiche.innerHTML = '';
      fiche.appendChild(el('p', null, bons === jeu.cas.length ? jeu.reussite : jeu.echec));
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
    rg.addEventListener('input', () => {
      S.vitesse = +rg.value; out.textContent = S.vitesse.toFixed(2).replace('.', ',') + '×';
      /* Le MP3 change d'allure sans s'interrompre : l'élève entend le
         réglage agir, ce qui vaut mieux qu'une coupure. La voix du poste,
         elle, ne sait pas changer en cours de phrase — là il faut couper,
         sinon le réglage ne servirait qu'au paragraphe suivant. */
      if (lecteur) lecteur.playbackRate = S.vitesse;
      else couperVoix();
    });
    $('#voixPick').addEventListener('change', e => {
      if (S.mp3) S.genre = e.target.value; else S.voix = e.target.value;
      couperVoix();
    });
    if ('speechSynthesis' in window) {
      remplirVoix();
      speechSynthesis.onvoiceschanged = remplirVoix;
    } else { $('#btVoix').disabled = true; $('#btVoix').textContent = 'Voix indisponible'; }

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
      const s = el('span', 'lien');
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

  return { demarrer, monterQuiz, monterJeu, couperVoix, credit, etat: S,
           auDemontage: f => S.nettoyages.push(f) };
})();
