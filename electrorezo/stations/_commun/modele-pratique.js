/* ÉlectroRézo — modèle de station « un geste de métier, sur place ».
   Pour les stations qui ne présentent pas un appareil mais une lecture ou un contrôle fait
   sur un site : reconnaître un réseau (2.7), lire un tableau (4.11), contrôler avant de
   mettre sous tension (6.7). Monte les cinq temps à partir d'une description, puis appelle
   Station.demarrer().

   Ce que ce modèle ajoute aux autres :
     · une carte « Ce que cette station travaille » : les codes du référentiel, avec leurs
       libellés officiels (jamais un code sans son libellé) ;
     · des exercices en trois paliers — EXEMPLE RÉSOLU, puis QUESTION GUIDÉE (où regarder,
       comment faire), puis QUESTION SEUL — chacun disant OÙ et COMMENT (secrétaire de
       rédaction, règles R2 et R3) ;
     · l'ARRÊT « le professeur vérifie » : ce qui le suit reste caché tant que le visa n'est
       pas donné ;
     · des liens vers ce qui existe déjà ailleurs sur inerWeb (on ne le refait pas).

   ModelePratique.construire({ id, ligne, kicker, titre, narration, prerequis[], codes{},
     photos[], creditPhoto, aQuoiCaSert, ouOnLeTrouve, question,
     scene, technologie[], variantes[], titres{},
     methode{ titre, lignes[] }, exercices{ titre, consigne, items[] },
     symboles[], lecturePlan[], recap, quiz[], retenir[], liens[{ nom, href, quoi }],
     objectifs, credits[], correspondances[], sansMp3, securite }) */

const ModelePratique = (() => {
  'use strict';
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const htm = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; n.innerHTML = h; return n; };
  const carte = titre => { const s = el('section', 'card'); if (titre) s.appendChild(el('h2', null, titre)); return s; };
  const para = h => htm('p', null, h);

  /* ------------------------------------------------------------ les codes */
  function carteCodes(codes) {
    const c = carte('Sert notamment pour');
    c.classList.add('codes');
    c.appendChild(el('p', 'legende', codes.referentiel));
    const ul = el('ul');
    codes.lignes.forEach(([type, code, libelle]) => {
      const li = el('li');
      li.appendChild(el('span', 'type', type));
      li.appendChild(el('strong', 'code', code));
      li.appendChild(el('span', 'lib', '« ' + libelle + ' »'));
      ul.appendChild(li);
    });
    c.appendChild(ul);
    if (codes.note) c.appendChild(el('p', 'legende', codes.note));
    return c;
  }

  const codesHtml = codes => '<p><strong>' + codes.referentiel + '</strong></p><ul>'
    + codes.lignes.map(([t, c, l]) => '<li>' + t + ' <strong>' + c + '</strong> — « ' + l + ' »</li>').join('') + '</ul>'
    + (codes.note ? '<p><small>' + codes.note + '</small></p>' : '');

  /* ------------------------------------------------------------ avant de toucher : un seul jeu d'étapes
     L'habilitation et la consignation sont décrites ICI, une fois, et reprises par les trois stations
     (2.7, 4.11, 6.7) : même ordre, mêmes mots. Sources : INRS ED 6109 § 5.1 (cinq opérations dans
     l'ordre, la dernière « pas toujours requise en basse tension », NF C 18-510) tel que repris par
     la Législation « Consigner » ; la capsule « Consigner avant de toucher » (cinq étapes) ; HoCourant
     M9 (qui ajoute, avant tout, de pré-identifier l'installation, et de contrôler le vérificateur
     avant et après) ; Code du travail R. 4544-9 et R. 4544-10 pour l'habilitation. */
  const SECURITE = {
    titre: 'Avant de toucher : habilitation et consignation',
    habilitation: 'Sur une installation électrique, seul un travailleur <strong>habilité</strong> par son employeur intervient (Code du travail, R. 4544-9 et R. 4544-10). Au plateau, vous travaillez avec le professeur : c’est lui qui décide.',
    consignation: [
      ['Séparer', 'de toutes les sources, de façon certaine.'],
      ['Condamner', 'maintenir l’organe de séparation ouvert par un blocage mécanique (cadenas, verrou) et une pancarte.'],
      ['Identifier', 'vérifier sur place qu’on est bien sur l’équipement prévu.'],
      ['Vérifier l’absence de tension (VAT)', 'sur chaque conducteur, avec un vérificateur prévu pour cela, contrôlé avant et après. Jamais un simple tournevis testeur.'],
      ['Mettre à la terre et en court-circuit', 'seulement quand elle est prescrite : elle n’est pas toujours requise en basse tension.']
    ],
    source: 'Cinq opérations, dans cet ordre : INRS ED 6109 § 5.1, comme la capsule « Consigner avant de toucher ». HoCourant M9 ajoute, avant tout, de repérer l’installation (pré-identifier).',
    liens: [
      ['HoCourant — module M9', 'https://inerweb.fr/hocourant/?module=M9'],
      ['Capsule « Consigner avant de toucher »', 'https://inerweb.fr/packs/fluides/res/capsules/?c=s5']
    ]
  };
  /* la même suite, en une ligne, pour les endroits où elle sert dans une phrase */
  const consignationEnUneLigne = () => SECURITE.consignation.map(e => e[0].replace(/ \(VAT\)/, '').toLowerCase()).join(', ');

  function carteSecurite() {
    const c = carte(SECURITE.titre);
    c.classList.add('securite');
    c.appendChild(htm('p', null, SECURITE.habilitation));
    c.appendChild(el('p', null, 'La consignation, pour travailler hors tension, se fait dans cet ordre :'));
    const ol = el('ol');
    SECURITE.consignation.forEach(([t, x]) => ol.appendChild(htm('li', null, '<strong>' + t + '</strong> — ' + x)));
    c.appendChild(ol);
    c.appendChild(el('p', 'legende', SECURITE.source));
    SECURITE.liens.forEach(([t, h]) => {
      const a = el('a', 'lien-securite', t + ' ↗'); a.href = h; a.target = '_blank'; a.rel = 'noopener';
      c.appendChild(a);
    });
    return c;
  }

  /* ------------------------------------------------------------ une réponse à choisir
     Même règle que le QCM : sans note, et une réponse fausse dit pourquoi. */
  function choisir(item, bloc, apresReponse) {
    const rep = el('div', 'reponses');
    item.choix.forEach((r, ir) => {
      const b = el('button', null, String.fromCharCode(65 + ir) + '.  ' + r.texte);
      b.type = 'button';
      b.addEventListener('click', () => {
        if (bloc.dataset.repondu) return;
        bloc.dataset.repondu = '1';
        rep.querySelectorAll('button').forEach((x, k) => {
          if (item.choix[k].juste) x.dataset.etat = 'juste';
          else if (k === ir) x.dataset.etat = 'faux';
          x.disabled = true;
        });
        const p = el('p', 'pourquoi');
        p.textContent = r.juste ? '✔ ' + (item.confirmation || 'C’est cela.') : '✘ ' + r.pourquoi;
        bloc.appendChild(p);
        /* sur un téléphone le retour tombait sous le bas de l'écran : on le ramène en vue */
        if (p.scrollIntoView) p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        if (apresReponse) apresReponse();
      });
      rep.appendChild(b);
    });
    return rep;
  }

  /* ------------------------------------------------------------ remettre dans l'ordre
     On touche les étiquettes dans l'ordre. Une erreur ne bloque pas : elle dit ce qui vient avant. */
  function remettreEnOrdre(item, bloc) {
    const zone = el('div', 'ordre');
    const suite = el('ol', 'ordre-suivi');
    const aff = item.melange.map(i => ({ i, texte: item.elements[i] }));
    let attendu = 0;
    const msg = el('p', 'pourquoi'); msg.hidden = true;
    aff.forEach(a => {
      const b = el('button', null, a.texte);
      b.type = 'button';
      b.addEventListener('click', () => {
        if (bloc.dataset.repondu || b.disabled) return;
        if (a.i === attendu) {
          b.disabled = true; b.dataset.etat = 'juste';
          suite.appendChild(el('li', null, a.texte));
          attendu++;
          msg.hidden = false; msg.textContent = '✔ ' + (item.pasJuste ? item.pasJuste[a.i] : 'Bien.');
          if (attendu === item.elements.length) {
            bloc.dataset.repondu = '1';
            msg.textContent = '✔ ' + (item.confirmation || 'Dans l’ordre.');
          }
        } else {
          msg.hidden = false;
          msg.textContent = '✘ ' + (item.pasFaux ? item.pasFaux[attendu] : 'Pas celui-là : regardez ce qui vient juste avant.');
        }
      });
      zone.appendChild(b);
    });
    bloc.append(zone, suite, msg);
  }

  /* ------------------------------------------------------------ la série d'exercices */
  function serie(conf) {
    const c = carte(conf.titre);
    if (conf.consigne) c.appendChild(htm('p', 'legende', conf.consigne));
    let n = 0, hote = c;
    conf.items.forEach(item => {
      if (item.type === 'arret') {
        const a = el('div', 'arret');
        a.setAttribute('role', 'group');
        a.appendChild(el('h3', null, '■ ARRÊT — le professeur vérifie'));
        a.appendChild(htm('p', null, item.texte));
        const lab = el('label');
        const cb = el('input'); cb.type = 'checkbox';
        lab.append(cb, el('span', null, 'Le professeur a vérifié mon travail et m’a donné son accord. (Je ne coche qu’après l’avoir appelé.)'));
        a.appendChild(lab);
        c.appendChild(a);
        const apres = el('div', 'apres-arret'); apres.hidden = true;
        c.appendChild(apres);
        cb.addEventListener('change', () => { apres.hidden = !cb.checked; });
        hote = apres;
        return;
      }
      n++;
      const bloc = el('div', 'etape');
      bloc.dataset.mode = item.mode;
      const tag = item.mode === 'exemple' ? 'Exemple résolu — à imiter'
        : item.mode === 'guide' ? 'Question ' + n + ' · guidée'
        : 'Question ' + n + ' · seul(e)';
      bloc.appendChild(el('span', 'tag', tag));
      bloc.appendChild(htm('p', 'enonce', item.enonce));
      if (item.figure) bloc.appendChild(item.figure());
      if (item.mode !== 'seul') {
        if (item.ou) bloc.appendChild(htm('p', 'ou', '<strong>Où :</strong> ' + item.ou));
        if (item.comment) bloc.appendChild(htm('p', 'comment', '<strong>Comment :</strong> ' + item.comment));
      } else {
        bloc.appendChild(htm('p', 'ou', '<strong>Seul(e) :</strong> choisissez votre méthode. ' + (item.methodeVue || '')));
      }
      if (item.mode === 'exemple') {
        bloc.appendChild(htm('p', 'resolu', '<strong>Réponse :</strong> ' + item.resolu));
      } else if (item.melange) {
        remettreEnOrdre(item, bloc);
      } else {
        bloc.appendChild(choisir(item, bloc));
      }
      hote.appendChild(bloc);
    });
    return c;
  }

  /* ------------------------------------------------------------ la station */
  function construire(D) {
    const T = Object.assign({
      objet: 'Sur place', serviCa: 'À quoi ça sert', dedans: 'Ce qu’il faut comprendre',
      variantes: 'Les cas que vous rencontrerez', methode: 'La méthode, en peu de lignes',
      symboles: 'Les symboles normalisés', plan: 'Le lire sur un plan', retenir: 'Ce qu’il faut retenir',
      liens: 'Déjà en ligne, pour aller plus loin'
    }, D.titres || {});

    /* ---------------- temps 1 : découvrir */
    function decouvrir(hote) {
      const w = el('div', 'workspace');
      const g = carte(T.objet);
      const bande = el('div', 'bande-visuelle');
      D.photos.forEach((p, i) => {
        if (i) bande.appendChild(el('div', 'fleche', '➜'));
        const f = el('figure', 'vignette');
        const im = document.createElement('img');
        im.src = p.src; im.alt = p.alt; im.loading = 'lazy';
        f.appendChild(im);
        const c = el('figcaption');
        c.appendChild(el('strong', null, p.titre));
        c.appendChild(document.createTextNode(' ' + p.sous));
        f.appendChild(c);
        bande.appendChild(f);
      });
      g.appendChild(bande);
      Station.credit(g, D.creditPhoto || 'Photographies : base de connaissances inerWeb. Détail dans « Crédits ».');

      const d = carte(T.serviCa);
      if (D.question) d.appendChild(htm('p', 'question-posee', D.question));
      d.appendChild(para(D.aQuoiCaSert));
      if (D.ouOnLeTrouve) d.appendChild(para(D.ouOnLeTrouve));
      d.appendChild(el('p', 'legende', 'Écoutez d’abord, puis passez au temps suivant.'));
      const droite = el('div', 'colonne');
      droite.append(d, carteCodes(D.codes));
      w.append(g, droite);
      hote.appendChild(w);
    }

    /* ---------------- temps 2 : comprendre */
    function comprendre(hote) {
      const w = el('div', 'workspace');
      const g = carte(T.dedans);
      if (D.scene) g.appendChild(D.scene());
      D.technologie.forEach(([t, x]) => { g.appendChild(htm('p', null, '<strong>' + t + '</strong> — ' + x)); });
      const d = carte(T.variantes);
      const ul = el('ul');
      D.variantes.forEach(v => ul.appendChild(htm('li', null, v)));
      d.appendChild(ul);
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------- temps 3 : manipuler */
    function manipuler(hote) {
      const w = el('div', 'workspace');
      const g = serie(D.exercices);
      const d = carte(D.methode.titre || T.methode);
      const ol = el('ol');
      D.methode.lignes.forEach(x => ol.appendChild(htm('li', null, x)));
      d.appendChild(ol);
      if (D.methode.piege) d.appendChild(htm('p', 'verdict bad', '<span class="signe">⚠</span>' + D.methode.piege));
      const droite = el('div', 'colonne');
      droite.appendChild(d);
      if (D.securite) droite.appendChild(carteSecurite());
      w.append(g, droite);
      hote.appendChild(w);
    }

    /* ---------------- temps 4 : représenter */
    function representer(hote) {
      const w = el('div', 'workspace');
      const g = carte(T.symboles);
      const lect = el('div', 'symboles');
      D.symboles.forEach(s => {
        const b = document.createElement('figure');
        const i = document.createElement('img');
        i.src = s.src; i.alt = s.alt; i.loading = 'lazy';
        b.appendChild(i);
        b.appendChild(el('figcaption', null, s.legende));
        lect.appendChild(b);
      });
      g.appendChild(lect);
      Station.credit(g, 'Symboles EN 60617 — bibliothèque inerWeb, convertie depuis QElectroTech. Rien n’a été redessiné.');
      const d = carte(T.plan);
      if (D.figurePlan) d.appendChild(D.figurePlan());
      D.lecturePlan.forEach(x => d.appendChild(para(x)));
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------- temps 5 : vérifier */
    function verifier(hote) {
      const w = el('div', 'workspace');
      const g = el('div'), d = el('div');
      if (D.recap) { const t = carte(D.recap.titre); t.appendChild(D.recap.corps()); g.appendChild(t); }
      Station.monterQuiz(g, D.quiz);
      const c = carte(T.retenir);
      D.retenir.forEach(x => c.appendChild(para(x)));
      d.appendChild(c);
      if (D.liens && D.liens.length) {
        const l = carte(T.liens);
        l.classList.add('liens-ex');
        D.liens.forEach(x => {
          const a = el('a');
          a.href = x.href; a.target = '_blank'; a.rel = 'noopener';
          a.appendChild(el('strong', null, x.nom));
          a.appendChild(el('span', null, x.quoi));
          l.appendChild(a);
        });
        d.appendChild(l);
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------- assemblage */
    const bt = document.getElementById('btObjectifs');
    if (bt) bt.addEventListener('click', () => {
      document.getElementById('dlgTexte').innerHTML = D.objectifs + '<h3>Sert notamment pour</h3>' + codesHtml(D.codes);
      document.getElementById('dlg').showModal();
    });

    /* Aucun MP3 fabriqué : on parle tout de suite avec la voix du poste, sans demander un fichier
       qui n'existe pas (une requête en échec sur le site). Retirer `sansMp3` du contenu quand voix/ est remplie. */
    if (D.sansMp3) Station.etat.mp3 = false;

    Station.demarrer({
      id: D.id, ligne: D.ligne, kicker: D.kicker, titre: D.titre,
      niveaux: D.niveaux || [{ id: 'CAP', libelle: 'CAP' }, { id: 'BAC', libelle: 'Bac pro' }],
      credits: D.credits, correspondances: D.correspondances || [],
      prerequis: D.prerequis || [],
      temps: [
        { id: 'decouvrir',   onglet: '1 · Découvrir',   titre: T.objet,    monter: decouvrir,   narration: D.narration.decouvrir },
        { id: 'comprendre',  onglet: '2 · Comprendre',  titre: T.dedans,   monter: comprendre,  narration: D.narration.comprendre },
        { id: 'manipuler',   onglet: '3 · Manipuler',   titre: D.exercices.titre, monter: manipuler, narration: D.narration.manipuler },
        { id: 'representer', onglet: '4 · Représenter', titre: T.symboles, monter: representer, narration: D.narration.representer },
        { id: 'verifier',    onglet: '5 · Vérifier',    titre: 'Questions', monter: verifier,   narration: '' }
      ]
    });
  }

  return { construire, SECURITE, consignationEnUneLigne };
})();
