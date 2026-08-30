/* ÉlectroRézo — modèle de station « un appareil ».
   Écrit une fois : une station d'appareil se réduit alors à un fichier de données.
   Monte les cinq temps à partir de la description, et appelle Station.demarrer().

   ModeleAppareil.construire({ id, ligne, kicker, titre, couleurLigne,
     photos[], aQuoiCaSert, technologie[], variantes[], reglage, cablage[],
     aptitudes{commander,couper,isoler}, symboles[], quiz[], jeu, credits[],
     correspondances[], narration{} }) */

const ModeleAppareil = (() => {
  'use strict';
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const carte = titre => { const s = el('section', 'card'); if (titre) s.appendChild(el('h2', null, titre)); return s; };

  const APTITUDES_DEFAUT = [
    { id: 'commander', libelle: 'Commander en marche',
      aide: 'ouvrir et fermer souvent, pendant que le courant passe' },
    { id: 'couper',    libelle: 'Couper en charge',
      aide: 'interrompre le courant sans dégât, une fois' },
    { id: 'isoler',    libelle: 'Isoler et condamner',
      aide: 'séparer vraiment, cadenasser, et travailler en sécurité derrière' }
  ];

  function construire(D) {
    /* -------------------------------------------------- temps 1 : découvrir */
    function decouvrir(hote) {
      const w = el('div', 'workspace');
      const g = carte('L’objet');
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

      const d = carte('À quoi ça sert');
      d.appendChild(el('p', null, D.aQuoiCaSert));
      if (D.ouOnLeTrouve) { d.appendChild(el('p', null, D.ouOnLeTrouve)); }
      d.appendChild(el('p', 'legende', 'Écoutez d’abord, puis passez au temps suivant.'));
      w.append(g, d);
      hote.appendChild(w);
    }

    /* -------------------------------------------------- temps 2 : comprendre */
    function comprendre(hote) {
      const w = el('div', 'workspace');
      const g = carte('Ce qu’il y a dedans');
      D.technologie.forEach(([t, x]) => {
        const p = el('p'); p.innerHTML = '<strong>' + t + '</strong> — ' + x; g.appendChild(p);
      });
      /* Règle de maison : aucune page sans illustration. Le temps 2 parle du
         mécanisme — on le montre. */
      if (D.scene) g.insertBefore(D.scene(), g.querySelector('p'));

      const d = carte('Les variantes');
      const ul = el('ul');
      D.variantes.forEach(v => { const li = el('li'); li.innerHTML = v; ul.appendChild(li); });
      d.appendChild(ul);
      if (D.reglage) {
        d.appendChild(el('h2', null, 'Le réglage'));
        d.appendChild(el('p', null, D.reglage));
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    /* -------------------------------------------------- temps 3 : manipuler
       Le fil rouge de la ligne : couper n'est pas commander, et commander n'est
       pas isoler. L'élève coche ce que l'appareil sait faire. */
    function manipuler(hote) {
      const w = el('div', 'workspace');
      const g = carte('Que sait faire cet appareil ?');
      g.appendChild(el('p', 'legende', D.consigneAptitudes ||
        'Trois choses différentes, souvent confondues. Cochez celles que cet appareil sait faire, puis validez.'));

      /* Les trois aptitudes en pictogrammes, neutres tant qu'on n'a pas validé. */
      const APTITUDES = D.colonnes || APTITUDES_DEFAUT;
      /* D.picto : une ligne peut fournir son propre jeu de pictogrammes
         (la ligne 5 ne juge pas les mêmes choses que les lignes 3 et 4). */
      const picto = D.picto ? D.picto(D.colonnes || null)
        : (typeof Schemas !== 'undefined') ? Schemas.pictoAptitudes(D.colonnes || null) : null;
      if (picto) g.appendChild(picto.element);

      const choisi = {};
      APTITUDES.forEach(a => {
        const b = el('button', null, a.libelle + ' — ' + a.aide);
        b.type = 'button'; b.setAttribute('aria-pressed', 'false');
        b.style.width = '100%'; b.style.textAlign = 'left'; b.style.marginTop = '.4rem';
        b.addEventListener('click', () => {
          choisi[a.id] = !choisi[a.id];
          b.setAttribute('aria-pressed', String(!!choisi[a.id]));
        });
        g.appendChild(b);
      });

      const valider = el('button', 'primary', 'Valider');
      valider.type = 'button'; valider.style.marginTop = '.7rem';
      g.appendChild(valider);
      const verdict = el('p', 'verdict wait');
      verdict.innerHTML = '<span class="signe">•</span>Cochez, puis validez.';
      g.appendChild(verdict);

      valider.addEventListener('click', () => {
        const faux = APTITUDES.filter(a => !!choisi[a.id] !== !!D.aptitudes[a.id]);
        if (picto) picto.marquer(D.aptitudes);
        if (!faux.length) {
          verdict.className = 'verdict ok';
          verdict.innerHTML = '<span class="signe">✔</span>' + D.aptitudes.bonneReponse;
        } else {
          verdict.className = 'verdict bad';
          verdict.innerHTML = '<span class="signe">✘</span>' +
            faux.map(a => D.aptitudes.erreurs[a.id]).join(' ');
        }
      });

      const d = carte('Le câblage');
      const ul = el('ul');
      D.cablage.forEach(c => { const li = el('li'); li.innerHTML = c; ul.appendChild(li); });
      d.appendChild(ul);
      if (D.piege) {
        const p = el('p', 'verdict bad');
        p.innerHTML = '<span class="signe">⚠</span>' + D.piege;
        d.appendChild(p);
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    /* -------------------------------------------------- temps 4 : représenter */
    function representer(hote) {
      const w = el('div', 'workspace');
      const g = carte('Le symbole normalisé');
      /* Le symbole a sa propre grille : dans celle des « metric », il
         tombait a 82 pixels et ne se lisait plus. Voir .symboles dans
         station.css. */
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

      const d = carte('Le lire sur un plan');
      D.lecturePlan.forEach(x => { const p = el('p'); p.innerHTML = x; d.appendChild(p); });
      d.appendChild(el('p', 'legende',
        'Convention de la maison : schéma de commande vertical, phase en haut, neutre en bas, retour du neutre en orange.'));
      w.append(g, d);
      hote.appendChild(w);
    }

    /* -------------------------------------------------- temps 5 : vérifier */
    function verifier(hote) {
      const w = el('div', 'workspace');
      const g = el('div'), d = el('div');
      if (D.tableau && typeof Schemas !== 'undefined') {
        const t = carte(D.tableauTitre || 'Récapitulatif');
        t.appendChild(D.tableau(D.id));
        g.appendChild(t);
      } else if (D.tableauLigne && typeof Schemas !== 'undefined') {
        const t = carte('Les cinq appareils de la ligne');
        t.appendChild(Schemas.tableauLigne3(D.id));
        g.appendChild(t);
      }
      Station.monterQuiz(g, D.quiz);
      if (D.jeu) Station.monterJeu(d, D.jeu);
      else {
        const c = carte('Ce qu’il faut retenir');
        if (D.tableauLigne && typeof Schemas !== 'undefined')
          c.appendChild(Schemas.tableauLigne3(D.id));
        D.retenir.forEach(x => { const p = el('p'); p.innerHTML = x; c.appendChild(p); });
        d.appendChild(c);
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    /* -------------------------------------------------- assemblage */
    const bt = document.getElementById('btObjectifs');
    if (bt) bt.addEventListener('click', () => {
      document.getElementById('dlgTexte').innerHTML = D.objectifs;
      document.getElementById('dlg').showModal();
    });

    Station.demarrer({
      id: D.id, ligne: D.ligne, kicker: D.kicker, titre: D.titre,
      niveaux: D.niveaux || [{ id: 'CAP', libelle: 'CAP' }, { id: 'BAC', libelle: 'Bac pro' }],
      credits: D.credits, correspondances: D.correspondances || [],
      /* la spirale : ce qu'il faut avoir en tete, rappele par le moteur */
      prerequis: D.prerequis || [],
      temps: [
        { id: 'decouvrir',   onglet: '1 · Découvrir',   titre: 'L’objet',            monter: decouvrir,   narration: D.narration.decouvrir },
        { id: 'comprendre',  onglet: '2 · Comprendre',  titre: 'Ce qu’il y a dedans', monter: comprendre,  narration: D.narration.comprendre },
        { id: 'manipuler',   onglet: '3 · Manipuler',   titre: 'Ce qu’il sait faire', monter: manipuler,   narration: D.narration.manipuler },
        { id: 'representer', onglet: '4 · Représenter', titre: 'Le symbole',          monter: representer, narration: D.narration.representer },
        { id: 'verifier',    onglet: '5 · Vérifier',    titre: 'Questions',           monter: verifier,    narration: '' }
      ]
    });
  }

  return { construire };
})();
