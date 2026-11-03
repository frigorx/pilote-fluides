/* ÉlectroRézo — la page d'aide à trois paliers (03/11/2026). Conception : CONCEPTION-AIDE-TROIS-PALIERS.md.

   aide/?tri3   carnet « tri » (un TD), exercice 3 : le palier 1 s'ouvre, les suivants à la demande.
   aide/?tri    le bilan de l'élève pour ce TD : jusqu'à quel palier il est allé, exercice par exercice.

   Le carnet est un <script> et non un fetch : la page s'ouvre aussi en double-clic, comme les stations.
   Le compteur reste sur le téléphone (localStorage), sans nom, et repart à zéro un autre jour. */
(function () {
  'use strict';

  const PALIERS = ['Ce que l’on vous demande', 'Pourquoi et comment', 'Un exemple résolu'];
  const PROF = 4;
  const page = document.getElementById('page');
  /* le premier morceau seulement : certaines applications de scan ajoutent leurs propres paramètres */
  const adresse = /^([a-z]+)(\d{0,2})$/.exec(location.search.slice(1).split('&')[0].toLowerCase());

  function el(tag, cls, texte) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texte != null) e.textContent = texte;
    return e;
  }

  function erreur() {
    page.innerHTML = '';
    page.appendChild(el('p', 'erreur', 'Cette aide n’existe pas. Vérifiez l’adresse sur votre feuille.'));
  }

  /* ------------------------------------------------------------ le compteur */

  const jour = new Date().toLocaleDateString('sv'); // AAAA-MM-JJ à l'heure du téléphone
  function lire(id) {
    try {
      const c = JSON.parse(localStorage.getItem('inerweb.aide.' + id));
      if (c && c.jour === jour) return c;
    } catch (e) {}
    return { jour: jour, ex: {} };
  }
  function noter(id, n, palier) {
    const c = lire(id);
    if ((c.ex[n] || 0) >= palier) return;
    c.ex[n] = palier;
    try { localStorage.setItem('inerweb.aide.' + id, JSON.stringify(c)); } catch (e) {}
  }

  /* ------------------------------------------------------------ un exercice */

  /* Le texte des carnets peut porter du gras : **400 V** → <strong>. Rien d'autre n'est interprété. */
  function paragraphe(texte) {
    const p = el('p');
    /* espaces insécables : « et : ne restent jamais seuls en bout de ligne */
    String(texte).replace(/« /g, '« ').replace(/ ([»:])/g, ' $1').split(/\*\*(.+?)\*\*/).forEach((bout, i) => {
      p.appendChild(i % 2 ? el('strong', null, bout) : document.createTextNode(bout));
    });
    return p;
  }

  function image(hote, im) {
    if (!im) return;
    const i = el('img');
    i.src = im.src; i.alt = im.alt || '';
    hote.appendChild(i);
  }

  function monterPalier(rang, contenu) {
    const s = el('section', 'palier');
    const h = el('h2');
    h.appendChild(el('span', 'num', String(rang + 1)));
    h.appendChild(document.createTextNode(PALIERS[rang]));
    s.appendChild(h);
    if (contenu.texte) s.appendChild(paragraphe(contenu.texte));
    image(s, contenu.image);
    (contenu.etapes || []).forEach(et => {
      const d = el('div', 'etape');
      d.appendChild(paragraphe(et.texte));
      image(d, et.image);
      s.appendChild(d);
    });
    return s;
  }

  function exercice(carnet, n) {
    const ex = carnet.exercices[n];
    if (!ex) return erreur();
    document.getElementById('titre').textContent = 'Exercice ' + n + ' · ' + ex.titre;
    document.title = 'Aide · exercice ' + n + ' · ' + carnet.titre;

    const deja = lire(carnet.id).ex[n] || 0;
    let ouverts = Math.min(Math.max(deja, 1), 3);
    noter(carnet.id, n, 1);

    const paliers = el('div');
    for (let i = 0; i < ouverts; i++) paliers.appendChild(monterPalier(i, ex.paliers[i]));

    const boutons = el('div', 'boutons');
    const compris = el(ex.station ? 'a' : 'p', ex.station ? 'compris' : 'prof');
    if (ex.station) {
      compris.href = '../stations/' + ex.station.dossier + '/index.html?temps=' + ex.station.temps;
      compris.textContent = 'J’ai compris : j’ouvre la station ' + ex.station.id;
    } else compris.textContent = 'J’ai compris : je reviens à ma feuille.';

    const encore = el('button', 'encore');
    encore.type = 'button';
    const message = el('p', 'prof', 'Levez la main : le professeur passe vous voir.');
    function etiqueter() {
      encore.textContent = ouverts < 3 ? 'Je n’ai toujours pas compris' : 'J’appelle le professeur';
    }
    encore.addEventListener('click', () => {
      if (ouverts < 3) {
        const s = monterPalier(ouverts, ex.paliers[ouverts]);
        paliers.appendChild(s);
        ouverts++;
        noter(carnet.id, n, ouverts);
        etiqueter();
        s.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        noter(carnet.id, n, PROF);
        encore.replaceWith(message);
      }
    });
    etiqueter();

    boutons.append(compris, deja >= PROF ? message : encore);
    page.innerHTML = '';
    page.append(paliers, boutons);
  }

  /* ------------------------------------------------------------ le bilan */

  function bilan(carnet) {
    document.getElementById('titre').textContent = 'Mon bilan d’aide';
    const c = lire(carnet.id);
    const t = el('table', 'bilan');
    const tete = el('tr');
    tete.append(el('th', null, 'Exercice'), el('th', null, 'Aide ouverte'));
    t.appendChild(tete);
    Object.keys(carnet.exercices).sort((a, b) => a - b).forEach(n => {
      const v = c.ex[n] || 0;
      const tr = el('tr');
      tr.append(el('td', null, n + ' · ' + carnet.exercices[n].titre),
        el('td', null, v === 0 ? 'aucune' : v === PROF ? 'palier 3, puis le professeur' : 'palier ' + v));
      t.appendChild(tr);
    });
    page.innerHTML = '';
    page.appendChild(t);
    page.appendChild(el('p', null, 'Montrez cet écran à votre professeur.'));
  }

  /* ------------------------------------------------------------ démarrage */

  window.AIDE = {
    carnet(carnet) {
      if (!adresse || carnet.id !== adresse[1]) return erreur();
      document.getElementById('kicker').textContent = carnet.titre + ' · ' + carnet.classe;
      if (adresse[2]) exercice(carnet, +adresse[2]);
      else bilan(carnet);
    }
  };

  if (!adresse) erreur();
  else {
    const s = document.createElement('script');
    s.src = 'carnets/' + adresse[1] + '.js';
    s.onerror = erreur;
    document.head.appendChild(s);
  }
})();
