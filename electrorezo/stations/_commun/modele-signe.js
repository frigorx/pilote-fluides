/* ÉlectroRézo — modèle de station « une lettre du schéma » (ligne 8).
   On n'étudie pas un objet, on étudie un signe. Cinq temps, tous illustrés.

   ModeleSigne.construire({ id, kicker, titre, lettre, pourquoiCetteForme[],
     motsOuOnLaTrouve[], symbolesBiblio[], quiz[], jeu, retenir[], objectifs,
     credits[], correspondances[], narration{} }) */

const ModeleSigne = (() => {
  'use strict';
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const carte = titre => { const s = el('section', 'card'); if (titre) s.appendChild(el('h2', null, titre)); return s; };

  function construire(D) {

    /* ---------------------------------------------- 1 · la lettre, en grand */
    function decouvrir(hote) {
      const w = el('div', 'workspace');
      const g = carte('La lettre');
      g.appendChild(Signes.lettreSeule(D.lettre, D.argLettre));
      g.appendChild(el('p', 'legende',
        'Ce signe-là, isolé. Vous allez le retrouver dans des dizaines de symboles.'));

      const d = carte('Ce qu’elle dit');
      d.appendChild(el('p', null, D.ceQuelleDit));
      if (D.ouOnLaVoit) d.appendChild(el('p', null, D.ouOnLaVoit));
      d.appendChild(el('p', 'legende', 'Écoutez d’abord, puis passez au temps suivant.'));
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 2 · pourquoi cette forme
       Le point central de la ligne : la forme n'est jamais arbitraire. */
    function comprendre(hote) {
      const w = el('div', 'workspace');
      const g = carte('Pourquoi cette forme, et pas une autre');
      if (D.scene) g.appendChild(D.scene());
      else g.appendChild(Signes.lettreSeule(D.lettre, D.argLettre));
      g.appendChild(el('p', 'legende',
        'Le dessin vient du mécanisme. Il n’a pas été choisi au hasard : c’est pour cela qu’on peut le reconnaître au lieu de l’apprendre par cœur.'));

      const d = carte('Le raisonnement');
      D.pourquoiCetteForme.forEach(x => { const p = el('p'); p.innerHTML = x; d.appendChild(p); });
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 3 · la retrouver */
    function manipuler(hote) {
      const w = el('div', 'workspace');
      const g = carte('Retrouvez-la');
      g.appendChild(D.exercice ? D.exercice() : Signes.retrouver(D.lettre, D.motsOuOnLaTrouve));

      const d = carte('Les mots où elle entre');
      D.motsOuOnLaTrouve.forEach(m => {
        const M = Signes.MOTS[m];
        const p = el('p');
        p.innerHTML = '<strong>' + M.nom + '</strong> — ' + M.lecture;
        d.appendChild(p);
      });
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 4 · le vrai symbole */
    function representer(hote) {
      const w = el('div', 'workspace');
      const g = carte('Le symbole officiel');
      const lect = el('div', 'lecture');
      D.symbolesBiblio.forEach(s => {
        const b = el('div', 'metric');
        b.appendChild(el('span', null, s.legende));
        const i = document.createElement('img');
        i.src = s.src; i.alt = s.alt;
        i.style.width = '100%'; i.style.maxHeight = '170px'; i.style.objectFit = 'contain';
        i.style.marginTop = '.3rem';
        b.appendChild(i);
        lect.appendChild(b);
      });
      g.appendChild(lect);
      Station.credit(g, 'Symboles EN 60617 — bibliothèque inerWeb, convertie depuis QElectroTech. Les dessins des temps 1 à 3 sont, eux, des représentations pédagogiques faites pour être décomposées.');

      const d = carte('Du dessin d’école au vrai plan');
      D.duDessinAuPlan.forEach(x => { const p = el('p'); p.innerHTML = x; d.appendChild(p); });
      w.append(g, d);
      hote.appendChild(w);
    }

    /* ---------------------------------------------- 5 · vérifier */
    function verifier(hote) {
      const w = el('div', 'workspace');
      const g = el('div'), d = el('div');
      const rappel = carte('Le mot le plus dense où elle apparaît');
      rappel.appendChild(Signes.motDecompose(D.motVedette || D.motsOuOnLaTrouve[0]));
      g.appendChild(rappel);
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
      id: D.id, ligne: 8, kicker: D.kicker, titre: D.titre,
      niveaux: D.niveaux || [{ id: 'CAP', libelle: 'CAP' }, { id: 'BAC', libelle: 'Bac pro' }],
      credits: D.credits, correspondances: D.correspondances || [],
      temps: [
        { id: 'decouvrir',   onglet: '1 · La lettre',    titre: 'La lettre',            monter: decouvrir,   narration: D.narration.decouvrir },
        { id: 'comprendre',  onglet: '2 · Sa forme',     titre: 'Pourquoi cette forme', monter: comprendre,  narration: D.narration.comprendre },
        { id: 'manipuler',   onglet: '3 · La retrouver', titre: 'Retrouvez-la',         monter: manipuler,   narration: D.narration.manipuler },
        { id: 'representer', onglet: '4 · Le vrai',      titre: 'Le symbole officiel',  monter: representer, narration: D.narration.representer },
        { id: 'verifier',    onglet: '5 · Vérifier',     titre: 'Questions',            monter: verifier,    narration: '' }
      ]
    });
  }

  return { construire };
})();
