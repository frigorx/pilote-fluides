/* ÉlectroRézo — les scènes des stations « geste de métier » (2.7, 4.11, 6.7).

   Ce sont des RENDEUSES : elles ne contiennent aucun texte de cours, seulement la mise en
   forme. Les données (noms, légendes, fichiers) viennent du contenu.js de la station, qui est
   la seule source éditoriale.

   Règles de maison tenues ici :
     · un appareil se montre comme l'appareil réel (photographie de la base), jamais un rectangle ni
       un symbole de schéma à sa place ; les symboles de la bibliothèque (jamais redessinés) vivent
       au temps « Représenter », et dans le schéma de mesure ;
     · la mise en page est du HTML : elle suit la largeur de l'écran, du poste au téléphone,
       là où un dessin SVG à texte incrusté devient illisible à 375 px ;
     · la couleur ne porte jamais seule l'information : chaque état est aussi écrit ;
     · aucun texte ne chevauche un tracé ;
     · l'image bouge toute seule (le courant avance, la démonstration tourne) et l'élève
       reprend la main au toucher — voir demontrer() dans station.js.

   Styles : stations/_commun/pratique.css. */

const SchemasPratique = (() => {
  'use strict';
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const svgNs = 'http://www.w3.org/2000/svg';
  const img = (src, alt, cls) => { const i = document.createElement('img'); i.src = src; i.alt = alt || ''; if (cls) i.className = cls; i.loading = 'lazy'; return i; };

  /* un petit tracé qui relie deux étages : le courant y avance (animation CSS, pratique.css) */
  const flux = () => {
    const s = document.createElementNS(svgNs, 'svg');
    s.setAttribute('class', 'flux'); s.setAttribute('viewBox', '0 0 20 44');
    s.setAttribute('preserveAspectRatio', 'none'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<line class="fil" x1="10" y1="0" x2="10" y2="44"/><line class="courant" x1="10" y1="0" x2="10" y2="44"/>';
    return s;
  };

  /* barre de boutons d'état : même mécanique que les autres scènes (aria-pressed),
     c'est elle que la démonstration automatique de station.js fait défiler */
  function barre(etats, actif, quand, etiquette) {
    const b = el('div', 'choix');
    b.setAttribute('role', 'group'); if (etiquette) b.setAttribute('aria-label', etiquette);
    etats.forEach(e => {
      const x = el('button', null, e.libelle); x.type = 'button';
      x.dataset.etat = e.id;
      x.setAttribute('aria-pressed', String(e.id === actif));
      x.addEventListener('click', () => {
        b.querySelectorAll('button').forEach(y => y.setAttribute('aria-pressed', String(y === x)));
        quand(e.id);
      });
      b.appendChild(x);
    });
    return b;
  }

  /* ============================================================ 2.7 — la chaîne du courant
     conf = { cas: { <id>: { libelle, legende, maillons: [{ nom, ou, quoi, photo, alt }] } },
              terre: { nom, quoi, photo, alt } } */
  function chaine(conf) {
    const hote = el('div', 'chaine');
    const ids = Object.keys(conf.cas);
    let cas = ids[0], actif = 0, libre = false, minuteur = null;
    const liste = el('ol', 'maillons');
    const lecture = el('p', 'verdict wait'); lecture.setAttribute('aria-live', 'polite');
    const note = el('p', 'legende');
    const terre = el('div', 'terre');
    terre.appendChild(img(conf.terre.photo, conf.terre.alt));
    const tt = el('span', 't'); tt.appendChild(el('strong', null, conf.terre.nom)); tt.appendChild(el('small', null, conf.terre.quoi));
    terre.appendChild(tt);

    function montrer(i) {
      actif = i;
      const m = conf.cas[cas].maillons[i];
      liste.querySelectorAll('.maillon').forEach((li, k) => {
        li.classList.toggle('actif', k === i);
        li.querySelector('button').setAttribute('aria-pressed', String(k === i));
      });
      lecture.innerHTML = '<span class="signe">•</span><strong>' + m.nom + '.</strong> ' + m.quoi;
    }
    function construire() {
      const c = conf.cas[cas];
      liste.innerHTML = '';
      c.maillons.forEach((m, i) => {
        const li = el('li', 'maillon');
        const b = el('button'); b.type = 'button';
        b.appendChild(img(m.photo, m.alt));
        const t = el('span', 't'); t.appendChild(el('strong', null, (i + 1) + '. ' + m.nom)); t.appendChild(el('small', null, m.ou));
        b.appendChild(t);
        b.addEventListener('click', () => { libre = true; clearInterval(minuteur); montrer(i); });
        li.appendChild(b);
        if (i < c.maillons.length - 1) li.appendChild(flux());
        liste.appendChild(li);
      });
      note.textContent = c.legende;
      montrer(0);
    }
    /* le courant fait le trajet tout seul, maillon après maillon, jusqu'à ce que l'élève touche */
    function lancer() {
      clearInterval(minuteur);
      minuteur = setInterval(() => {
        if (!hote.isConnected || libre) return clearInterval(minuteur);
        montrer((actif + 1) % conf.cas[cas].maillons.length);
      }, 2200);
    }
    const choix = barre(ids.map(id => ({ id, libelle: conf.cas[id].libelle })), cas, id => {
      cas = id; libre = false; construire(); lancer();
    }, 'Type de site');
    hote.append(choix, liste, terre, lecture, note);
    construire(); lancer();
    return hote;
  }

  /* ============================================================ 2.7 — les cinq conducteurs d'un câble 5G
     Le câble est coupé : on voit cinq ronds de cuivre, chacun numéroté ET nommé. */
  function coupeCable(conf) {
    const hote = el('figure', 'coupe');
    const s = document.createElementNS(svgNs, 'svg');
    s.setAttribute('viewBox', '0 0 300 190'); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', conf.alt);
    const pos = [[78, 70], [150, 70], [222, 70], [114, 128], [186, 128]];
    let h = '<rect x="6" y="6" width="288" height="178" rx="86" fill="#d9d3c7" stroke="#637285" stroke-width="3"/>';
    conf.conducteurs.forEach((c, i) => {
      const [x, y] = pos[i];
      h += '<circle cx="' + x + '" cy="' + y + '" r="26" fill="' + c.couleur + '"/>';
      /* le vert et jaune : des bandes jaunes, coupées au rond par un clipPath */
      if (c.rayure) h += '<clipPath id="cc' + i + '"><circle cx="' + x + '" cy="' + y + '" r="26"/></clipPath>'
        + '<g clip-path="url(#cc' + i + ')"><path d="M' + (x - 30) + ' ' + (y + 6) + ' L' + (x + 6) + ' ' + (y - 30) + ' M' + (x - 22) + ' ' + (y + 28) + ' L' + (x + 28) + ' ' + (y - 22) + ' M' + (x - 6) + ' ' + (y + 34) + ' L' + (x + 34) + ' ' + (y - 6) + '" stroke="' + c.rayure + '" stroke-width="9" fill="none"/></g>';
      h += '<circle cx="' + x + '" cy="' + y + '" r="26" fill="none" stroke="#10233c" stroke-width="2.5"/>';
      h += '<rect x="' + (x - 11) + '" y="' + (y - 14) + '" width="22" height="26" rx="5" fill="#fffdf8" opacity=".92"/>'
        + '<text x="' + x + '" y="' + (y + 7) + '" text-anchor="middle" font-size="22" font-weight="700" fill="#10233c">' + (i + 1) + '</text>';
    });
    s.innerHTML = h;
    hote.appendChild(s);
    const leg = el('figcaption', 'legende', conf.legende);
    hote.appendChild(leg);
    return hote;
  }

  /* ============================================================ 4.11 — un tableau, un défaut, ce qui s'éteint
     conf = { branchement: { nom, photo, alt }, rangees: [{ id: { nom, photo, alt }, departs: [{ id, nom, photo, alt }] }],
              etats: [{ id, libelle, legende, ouvre: { differentiels: [n], departs: [id] } }] } */
  function tableau(conf) {
    const hote = el('div', 'tabl');
    const coffret = el('div', 'coffret');
    const tete = el('div', 'entree');
    tete.appendChild(img(conf.branchement.photo, conf.branchement.alt));
    const th = el('span', 't'); th.appendChild(el('strong', null, conf.branchement.nom)); th.appendChild(el('small', null, conf.branchement.ou));
    tete.appendChild(th);
    coffret.append(tete, flux());
    const rangees = [];
    conf.rangees.forEach((r, n) => {
      const bloc = el('div', 'rangee');
      const idb = el('div', 'dif');
      idb.appendChild(img(r.id.photo, r.id.alt));
      const t = el('span', 't'); t.appendChild(el('strong', null, r.id.nom)); t.appendChild(el('small', null, 'rangée ' + (n + 1)));
      idb.appendChild(t);
      const etat = el('em', 'etat', 'enclenché');
      idb.appendChild(etat);
      bloc.appendChild(idb);
      const deps = el('div', 'departs');
      const lignes = r.departs.map(d => {
        const x = el('div', 'depart');
        x.appendChild(img(d.photo, d.alt));
        x.appendChild(el('span', 'u', d.nom));
        const e2 = el('em', 'etat', 'alimenté');
        x.appendChild(e2);
        deps.appendChild(x);
        return { id: d.id, noeud: x, etat: e2 };
      });
      bloc.appendChild(deps);
      coffret.appendChild(bloc);
      rangees.push({ bloc, etat, lignes });
    });
    const lecture = el('p', 'verdict wait'); lecture.setAttribute('aria-live', 'polite');

    function appliquer(id) {
      const e = conf.etats.find(x => x.id === id);
      rangees.forEach((r, n) => {
        const dif = e.ouvre.differentiels.indexOf(n) >= 0;
        r.bloc.classList.toggle('coupee', dif);
        r.etat.textContent = dif ? 'déclenché' : 'enclenché';
        r.lignes.forEach(l => {
          const seul = e.ouvre.departs.indexOf(l.id) >= 0;
          const coupe = dif || seul;
          l.noeud.classList.toggle('coupe', coupe);
          l.noeud.classList.toggle('declenche', seul);
          l.etat.textContent = seul ? 'déclenché' : (coupe ? 'plus alimenté' : 'alimenté');
        });
      });
      lecture.className = 'verdict ' + (e.ouvre.differentiels.length || e.ouvre.departs.length ? 'bad' : 'ok');
      lecture.innerHTML = '<span class="signe">' + (e.ouvre.differentiels.length || e.ouvre.departs.length ? '✘' : '✔') + '</span>' + e.legende;
    }
    const choix = barre(conf.etats.map(e => ({ id: e.id, libelle: e.libelle })), conf.etats[0].id, appliquer, 'Ce qui arrive');
    hote.append(choix, coffret, lecture);
    appliquer(conf.etats[0].id);
    return hote;
  }

  /* ============================================================ 6.7 — l'afficheur d'un appareil de mesure
     conf = { appareil, position, valeur, unite, note, photo } : la photo du vrai appareil, avec la valeur affichée sur son écran. */
  function afficheur(conf) {
    const f = el('figure', 'afficheur');
    const lib = conf.appareil + ', ' + conf.position + ' : l’écran affiche ' + conf.valeur + (conf.unite ? ' ' + conf.unite : '');
    const corps = el('div', 'multimetre');
    const im = img(conf.photo, lib);
    const lcd = el('div', 'lcd');
    lcd.setAttribute('aria-hidden', 'true');
    lcd.appendChild(el('span', 'a-valeur', conf.valeur));
    if (conf.unite) lcd.appendChild(el('span', 'a-unite', conf.unite));
    corps.append(im, lcd);
    f.appendChild(corps);
    f.appendChild(el('figcaption', 'legende', conf.appareil + ' · ' + conf.position + (conf.note ? ' — ' + conf.note : '')));
    return f;
  }

  /* ============================================================ 6.7 — l'échelle des contrôles
     conf = { etapes: [{ nom, quand, outil, geste, verifie, neVerifiePas, attention, arret }] } */
  function echelle(conf) {
    const hote = el('div', 'echelle');
    const n = conf.etapes.length;
    /* la ligne : sept stations, comme sur le plan du réseau ; l'arrêt est cerclé de rouge */
    const s = document.createElementNS(svgNs, 'svg');
    s.setAttribute('class', 'scene ligne-etapes'); s.setAttribute('viewBox', '0 0 ' + (n * 60) + ' 46');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', 'Les ' + n + ' temps du contrôle, dans l’ordre, du premier à la mise sous tension.');
    let h = '<line x1="30" y1="23" x2="' + (n * 60 - 30) + '" y2="23" stroke="#1b3a63" stroke-width="5" stroke-linecap="round"/>';
    conf.etapes.forEach((e, i) => {
      h += '<circle class="pt' + (e.arret ? ' arret-pt' : '') + '" data-i="' + i + '" cx="' + (30 + i * 60) + '" cy="23" r="13" fill="#fffdf8" stroke="' + (e.arret ? '#c0392b' : '#1b3a63') + '" stroke-width="4"/>'
        + '<text x="' + (30 + i * 60) + '" y="28.5" text-anchor="middle" font-size="15" font-weight="700" fill="' + (e.arret ? '#c0392b' : '#1b3a63') + '">' + (e.arret ? '■' : (i + 1)) + '</text>';
    });
    s.innerHTML = h;
    const panneau = el('div', 'panneau');
    function montrer(i) {
      const e = conf.etapes[i];
      s.querySelectorAll('.pt').forEach((p, k) => p.classList.toggle('actif', k === i));
      panneau.classList.toggle('arret-panneau', !!e.arret);
      panneau.innerHTML = (e.photo ? '<img class="img-etape" src="' + e.photo + '" alt="' + (e.alt || '') + '">' : '')
        + '<h3>' + (e.arret ? '■ ' : (i + 1) + '. ') + e.nom + '</h3>'
        + '<p class="quand">' + e.quand + '</p>'
        + (e.outil ? '<p><strong>Avec quoi :</strong> ' + e.outil + '</p>' : '')
        + '<p><strong>Le geste :</strong> ' + e.geste + '</p>'
        + (e.verifie ? '<p class="ok-l"><span class="signe">✔</span><strong>Ce que ça vérifie :</strong> ' + e.verifie + '</p>' : '')
        + (e.neVerifiePas ? '<p class="non-l"><span class="signe">✘</span><strong>Ce que ça ne vérifie pas :</strong> ' + e.neVerifiePas + '</p>' : '')
        + (e.attention ? '<p class="att-l"><span class="signe">⚠</span><strong>Attention :</strong> ' + e.attention + '</p>' : '');
    }
    const choix = barre(conf.etapes.map((e, i) => ({ id: String(i), libelle: e.arret ? '■ Arrêt' : String(i + 1) })), '0', id => montrer(+id), 'Les temps du contrôle');
    hote.append(s, choix, panneau);
    montrer(0);
    return hote;
  }

  /* ============================================================ 6.7 — une mesure, sur le schéma
     Le symbole de l'ohmmètre entre deux points : ce que l'élève verra au bout de ses pointes.
     conf = { ohm, moteur, terre, alt } : chemins des fichiers de la bibliothèque. */
  function mesureSurSchema(conf) {
    const hote = el('figure', 'mesure-schema');
    const s = document.createElementNS(svgNs, 'svg');
    s.setAttribute('viewBox', '0 0 420 250'); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', conf.alt);
    s.innerHTML =
      '<rect x="4" y="4" width="412" height="242" rx="14" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>'
      + '<image href="' + conf.ohm + '" x="150" y="14" width="120" height="72"/>'
      + '<image href="' + conf.moteur + '" x="40" y="118" width="110" height="110"/>'
      + '<image href="' + conf.terre + '" x="300" y="150" width="60" height="70"/>'
      /* les deux pointes : un trait de chaque côté de l'ohmmètre, jusqu'aux deux points mesurés */
      + '<path d="M150 50 L96 50 L96 124" fill="none" stroke="#c0392b" stroke-width="4" stroke-linejoin="round"/>'
      + '<path d="M270 50 L330 50 L330 152" fill="none" stroke="#10233c" stroke-width="4" stroke-linejoin="round"/>'
      + '<circle cx="96" cy="124" r="6" fill="#c0392b"/><circle cx="330" cy="152" r="6" fill="#10233c"/>';
    hote.appendChild(s);
    if (conf.legende) hote.appendChild(el('figcaption', 'legende', conf.legende));
    return hote;
  }

  return { chaine, coupeCable, tableau, afficheur, echelle, mesureSurSchema };
})();
