/* ÉlectroRézo — modèle de station « une grandeur » (ligne 1).
   On n'étudie ni un objet, ni un signe : on étudie une chose qui se mesure.
   Les cinq temps changent donc de nom, et le troisième devient MESURER — parce
   qu'une grandeur qu'on ne sait pas mesurer n'est qu'un mot.

   ModeleGrandeur.construire({
     id, ligne, kicker, titre, narration{},
     photos[{src, alt, titre, sous}], creditPhoto,
     lIdee,                          texte d'ouverture
     ouOnLaRencontre,                deuxième paragraphe, facultatif
     scene(),                        la scène du temps 2 — obligatoire
     ceQuiSePasse[[titre, texte]],   ce qui se passe vraiment
     aRetenir[],                     les points du temps 2, en liste
     mesure(),                       la scène du temps 3 — obligatoire
     instrument[],                   comment on mesure, en liste
     dangerDeMesure,                 l'avertissement du temps 3, facultatif
     ecriture{symbole, unite, nomUnite, multiples[[quoi, vaut]]},
     surUnePlaque[],                 où on la lit dans la vraie vie
     quiz[], jeu | retenir[], objectifs, credits[], correspondances[] }) */

const ModeleGrandeur = (() => {
  'use strict';
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const carte = titre => { const s = el('section', 'card'); if (titre) s.appendChild(el('h2', null, titre)); return s; };

  function construire(D) {

    /* ---------------------------------------------- 1 · l'idée */
    function decouvrir(hote) {
      const w = el('div', 'workspace');
      const g = carte('De quoi on parle');
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
      Station.credit(g, D.creditPhoto || 'Illustrations : base de connaissances inerWeb. Détail dans « Crédits ».');

      const d = carte('L’idée');
      d.appendChild(el('p', null, D.lIdee));
      if (D.ouOnLaRencontre) d.appendChild(el('p', null, D.ouOnLaRencontre));
      d.appendChild(el('p', 'legende', 'Écoutez d’abord, puis passez au temps suivant.'));
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 2 · ce qui se passe */
    function comprendre(hote) {
      const w = el('div', 'workspace');
      const g = carte('Ce qui se passe vraiment');
      g.appendChild(D.scene());

      const d = carte('Le raisonnement');
      D.ceQuiSePasse.forEach(([t, x]) => {
        const p = el('p'); p.innerHTML = '<strong>' + t + '</strong> — ' + x; d.appendChild(p);
      });
      if (D.aRetenir && D.aRetenir.length) {
        d.appendChild(el('h2', null, 'À retenir'));
        const ul = el('ul');
        D.aRetenir.forEach(x => { const li = el('li'); li.innerHTML = x; ul.appendChild(li); });
        d.appendChild(ul);
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 3 · mesurer
       Une grandeur qu'on ne sait pas mesurer n'est qu'un mot. */
    function manipuler(hote) {
      const w = el('div', 'workspace');
      const g = carte('La mesurer');
      g.appendChild(D.mesure());

      const d = carte('Comment on s’y prend');
      const ul = el('ul');
      D.instrument.forEach(x => { const li = el('li'); li.innerHTML = x; ul.appendChild(li); });
      d.appendChild(ul);
      if (D.dangerDeMesure) {
        const p = el('p', 'verdict bad');
        p.innerHTML = '<span class="signe">⚠</span>' + D.dangerDeMesure;
        d.appendChild(p);
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 4 · l'écrire */
    function representer(hote) {
      const w = el('div', 'workspace');
      const g = carte('Son symbole et son unité');
      const E = D.ecriture;
      const lect = el('div', 'lecture');

      const b1 = el('div', 'metric');
      b1.appendChild(el('span', null, 'La grandeur s’écrit'));
      const s1 = el('b', null, E.symbole); s1.style.fontSize = '2.6rem'; s1.style.display = 'block';
      b1.appendChild(s1);
      lect.appendChild(b1);

      const b2 = el('div', 'metric');
      b2.appendChild(el('span', null, 'Elle se mesure en'));
      const s2 = el('b', null, E.unite); s2.style.fontSize = '2.6rem'; s2.style.display = 'block';
      b2.appendChild(s2);
      b2.appendChild(el('span', null, E.nomUnite));
      lect.appendChild(b2);
      g.appendChild(lect);

      if (E.multiples && E.multiples.length) {
        const t = document.createElement('table');
        t.className = 'tab';
        t.innerHTML = '<thead><tr><th>On écrit</th><th>Cela vaut</th></tr></thead><tbody>' +
          E.multiples.map(([q, v]) => '<tr><td><strong>' + q + '</strong></td><td>' + v + '</td></tr>').join('') +
          '</tbody>';
        g.appendChild(t);
      }
      g.appendChild(el('p', 'legende',
        'Le symbole de la grandeur et celui de l’unité ne sont pas la même chose. On les confond souvent : ce sont deux écritures différentes, pour deux idées différentes.'));

      const d = carte('Où vous la lirez');
      D.surUnePlaque.forEach(x => { const p = el('p'); p.innerHTML = x; d.appendChild(p); });
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 5 · vérifier */
    function verifier(hote) {
      const w = el('div', 'workspace');
      const g = el('div'), d = el('div');
      Station.monterQuiz(g, D.quiz);
      if (D.jeu) Station.monterJeu(d, D.jeu);
      else {
        const c = carte('Ce qu’il faut retenir');
        D.retenir.forEach(x => { const p = el('p'); p.innerHTML = x; c.appendChild(p); });
        d.appendChild(c);
      }
      w.append(g, d);
      hote.appendChild(w);
    }

    const bt = document.getElementById('btObjectifs');
    if (bt) bt.addEventListener('click', () => {
      document.getElementById('dlgTexte').innerHTML = D.objectifs;
      document.getElementById('dlg').showModal();
    });

    Station.demarrer({
      id: D.id, ligne: D.ligne || 1, kicker: D.kicker, titre: D.titre,
      niveaux: D.niveaux || [{ id: 'CAP', libelle: 'CAP' }, { id: 'BAC', libelle: 'Bac pro' }],
      credits: D.credits, correspondances: D.correspondances || [],
      temps: [
        { id: 'decouvrir',   onglet: '1 · L’idée',     titre: 'De quoi on parle',        monter: decouvrir,   narration: D.narration.decouvrir },
        { id: 'comprendre',  onglet: '2 · Comprendre', titre: 'Ce qui se passe vraiment', monter: comprendre,  narration: D.narration.comprendre },
        { id: 'manipuler',   onglet: '3 · Mesurer',    titre: 'La mesurer',              monter: manipuler,   narration: D.narration.manipuler },
        { id: 'representer', onglet: '4 · L’écrire',   titre: 'Son symbole et son unité', monter: representer, narration: D.narration.representer },
        { id: 'verifier',    onglet: '5 · Vérifier',   titre: 'Questions',               monter: verifier,    narration: '' }
      ]
    });
  }

  return { construire };
})();
