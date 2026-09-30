/* CuivRézo — moteur des stations-geste. Écrit une fois, partagé par toutes les stations.
   CONTRAT : la page porte <body data-station="1-3" data-racine="../../"> et charge, dans l'ordre,
   donnees/stations.js · moteur/figures.js · moteur/voix.js · ce fichier. Rien d'autre à écrire.
   Les SIX TEMPS, toujours dans le même ordre : le but · le matériel · le geste (un écran par geste)
   · les pièges · je contrôle (un écran par critère, puis le bilan) · le professeur confirme.
   Figures : { svg, etat } dessiné par CuivFigures · { img, alt } · et, sur un geste, `clip` :
   la vidéo des mains du professeur, prise si le fichier existe, sinon repli sur la figure.
   `?revue` dans l'adresse montre ce qui manque encore (clips à filmer, images à valider).
   État de l'élève : localStorage, sur l'appareil seulement, jamais de nom. */

const Station = (() => {
  'use strict';
  const TEMPS = [
    { cle: 'obtenir',   court: 'Le but' },
    { cle: 'materiel',  court: 'Le matériel' },
    { cle: 'gestes',    court: 'Le geste' },
    { cle: 'pieges',    court: 'Les pièges' },
    { cle: 'controles', court: 'Je contrôle' },
    { cle: 'prof',      court: 'Le professeur' }
  ];
  const ECHELLE = ['Non évalué', 'Non acquis', 'En cours', 'Acquis', 'Parfaitement maîtrisé'];
  const S = { st: null, t: 0, p: 0, racine: '', revue: /[?&]revue\b/.test(location.search), auto: false, memo: {} };
  const $ = s => document.querySelector(s);
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };

  /* ------------------------------------------------ mémoire de l'appareil */
  const cleMemo = () => 'cuivrezo:' + S.st.id;
  function lireMemo() { try { S.memo = JSON.parse(localStorage.getItem(cleMemo())) || {}; } catch (e) { S.memo = {}; } }
  function ecrireMemo() { try { localStorage.setItem(cleMemo(), JSON.stringify(S.memo)); } catch (e) {} }
  const memo = k => (S.memo[k] = S.memo[k] || {});

  /* ------------------------------------------------ pages d'un temps */
  function pages(t) {
    const st = S.st;
    switch (TEMPS[t].cle) {
      case 'gestes': return st.gestes.length;
      case 'pieges': return st.pieges.length;
      case 'controles': return st.controles.length + 1;   /* + le bilan */
      default: return 1;
    }
  }

  /* ------------------------------------------------ figures */
  function figure(spec, clip) {
    const boite = el('div', 'figure');
    const poserRepli = () => {
      boite.replaceChildren();
      if (!spec) { boite.append(el('div', 'attente', 'Illustration à venir')); return; }
      if (spec.outil && typeof CuivOutils !== 'undefined' && CuivOutils[spec.outil]) {
        CuivOutils[spec.outil](boite, spec);
      } else if (spec.composant) {
        /* un composant repris d'un autre dépôt (la cintrette de tp-cintrage) ; `anime` fait
           varier son angle de 0 à 90° en boucle, pour montrer le geste en mouvement */
        const c = document.createElement(spec.composant);
        Object.entries(spec.attributs || {}).forEach(([k, v]) => c.setAttribute(k, v));
        c.style.cssText = 'display:block;width:100%;height:min(46dvh,420px)';
        boite.append(c);
        if (spec.anime) {
          let a = 0, sens = 1;
          const t = setInterval(() => { if (!c.isConnected) return clearInterval(t);
            a += sens * 1.5; if (a >= 90 || a <= 0) sens = -sens; c.setAttribute('angle', String(Math.max(0, Math.min(90, a)))); }, 40);
        }
      } else if (spec.svg) {
        const tpl = document.createElement('template');
        tpl.innerHTML = CuivFigures.dessiner(spec.svg, spec.etat || '').trim();
        boite.append(tpl.content);
      } else if (spec.img) {
        const im = el('img'); im.src = S.racine + spec.img; im.alt = spec.alt || ''; im.loading = 'lazy';
        boite.append(im);
      }
      if (spec.legende) boite.append(el('div', 'legende', spec.legende));
      if (S.revue && clip) boite.append(el('div', 'attente', 'Clip à filmer : ' + clip));
      if (S.revue && spec.aValider) boite.append(el('div', 'attente', 'À valider : ' + spec.aValider));
    };
    /* le clip n'est tenté que s'il existe : la liste est relevée sur le disque à la construction */
    const presents = window.CUIVREZO.clipsPresents;
    if (clip && presents && !presents.includes(clip)) clip = S.revue ? clip : null;
    if (clip && presents && !presents.includes(clip)) { poserRepli(); return boite; }
    if (clip) {
      const v = el('video');
      Object.assign(v, { autoplay: true, muted: true, loop: true, playsInline: true });
      v.setAttribute('aria-label', spec && spec.legende ? spec.legende : 'Le geste filmé');
      v.addEventListener('error', poserRepli, { once: true });
      v.src = S.racine + clip;
      boite.append(v);
      if (spec && spec.legende) boite.append(el('div', 'legende', spec.legende));
    } else poserRepli();
    return boite;
  }

  /* ------------------------------------------------ contenu de chaque temps */
  function pointsDe(n, ici) {
    const d = el('div', 'points'); d.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < n; i++) d.append(el('span', i < ici ? 'vu' : i === ici ? 'ici' : ''));
    return d;
  }

  function codes() {
    const r = S.st.referentiel; if (!r) return null;
    const d = el('div', 'codes');
    const ligne = (nom, l) => { if (!l || !l.length) return; const p = el('p'); p.append(el('b', '', nom + ' : ')); p.append(l.join(' · ')); d.append(p); };
    ligne('Tâches CAP IFCA', r.taches); ligne('Compétences', r.competences); ligne('Savoirs associés', r.savoirs);
    return d;
  }

  function rendre() {
    const st = S.st, T = TEMPS[S.t].cle, main = $('main'), pan = el('div', 'panneau');
    pan.setAttribute('aria-live', 'polite');
    let fig = null, narration = '';

    if (T === 'obtenir') {
      const o = st.obtenir;
      fig = figure(o.figure);
      pan.append(el('div', 'compteur', 'Ce que vous devez obtenir'), el('h2', '', o.titre), el('p', '', o.texte));
      if (o.criteres) { const ul = el('ul', 'liste'); o.criteres.forEach(c => ul.append(el('li', '', c))); pan.append(ul); }
      if (st.duree) pan.append(el('p', 'compteur', 'Durée visée : ' + st.duree));
      const c = codes(); if (c) pan.append(c);
      narration = o.narration;
    }

    if (T === 'materiel') {
      const m = st.materiel, coches = memo('materiel');
      fig = figure(m.figure);
      pan.append(el('div', 'compteur', 'Sortez votre matériel'), el('h2', '', m.titre || 'Je prépare mon poste'));
      m.items.forEach((it, i) => {
        const b = el('button', 'outil'); b.type = 'button';
        b.setAttribute('aria-pressed', coches[i] ? 'true' : 'false');
        const cs = el('span', 'case', coches[i] ? '✔' : ''); cs.setAttribute('aria-hidden', 'true');
        const tx = el('span'); tx.append(el('strong', '', it.nom)); if (it.detail) tx.append(el('span', 'detail', it.detail));
        b.append(cs, tx);
        b.addEventListener('click', () => { coches[i] = !coches[i]; ecrireMemo(); rendre(); });
        pan.append(b);
      });
      narration = m.narration;
    }

    if (T === 'gestes') {
      const g = st.gestes[S.p];
      fig = figure(g.figure, g.clip);
      pan.append(el('div', 'compteur', 'Geste ' + (S.p + 1) + ' sur ' + st.gestes.length), pointsDe(st.gestes.length, S.p),
                 el('h2', '', g.titre), el('p', '', g.texte));
      if (g.pointCle) { const c = el('div', 'cle'); c.append(el('strong', '', 'Point clé : '), g.pointCle); pan.append(c); }
      if (g.pourquoi) { const d = el('details', 'pourquoi'); d.append(el('summary', '', 'Pourquoi ?'), el('p', '', g.pourquoi)); pan.append(d); }
      narration = g.narration;
    }

    if (T === 'pieges') {
      const pg = st.pieges[S.p];
      fig = figure(pg.figure);
      const box = el('div', 'piege'), dl = el('dl');
      box.append(el('h3', '', pg.titre));
      [['Ce que vous voyez', pg.voit], ['Pourquoi', pg.cause], ['Pour l’éviter', pg.eviter]].forEach(([k, v]) => { if (v) dl.append(el('dt', '', k), el('dd', '', v)); });
      box.append(dl);
      pan.append(el('div', 'compteur', 'Piège ' + (S.p + 1) + ' sur ' + st.pieges.length), pointsDe(st.pieges.length, S.p), box);
      if (pg.geste != null) pan.append(boutonRetour(pg.geste));
      narration = pg.narration;
    }

    if (T === 'controles') {
      const rep = memo('controles'), n = st.controles.length;
      if (S.p < n) {
        const c = st.controles[S.p];
        fig = figure(c.figure || st.obtenir.figure);
        const box = el('div', 'controle');
        box.append(el('div', 'q', c.question), el('div', 'comment', c.comment));
        const on = el('div', 'ouinon');
        [['oui', 'Oui'], ['non', 'Non']].forEach(([k, lib]) => {
          const b = el('button', k, lib); b.type = 'button'; b.setAttribute('aria-pressed', rep[S.p] === k ? 'true' : 'false');
          b.addEventListener('click', () => { rep[S.p] = k; ecrireMemo(); if (k === 'oui') aller(1); else rendre(); });
          on.append(b);
        });
        box.append(on);
        if (rep[S.p] === 'non') {
          const r = el('div', 'remede'); r.append(el('p', '', c.siNon));
          if (c.geste != null) r.append(boutonRetour(c.geste));
          box.append(r);
        }
        pan.append(el('div', 'compteur', 'Contrôle ' + (S.p + 1) + ' sur ' + n), pointsDe(n, S.p), box);
        narration = c.narration;
      } else {
        fig = figure(st.obtenir.figure);
        const nonFaits = st.controles.filter((c, i) => rep[i] !== 'oui');
        pan.append(el('div', 'compteur', 'Bilan de votre contrôle'));
        if (!nonFaits.length) {
          pan.append(el('div', 'bilan ok', 'Tous les contrôles sont bons. Votre pièce est prête à être montrée.'));
          narration = st.bilanNarration || 'Vous avez contrôlé votre pièce point par point. Il reste une étape : la montrer à votre professeur, qui confirme le geste.';
        } else {
          pan.append(el('div', 'bilan attente', 'Encore ' + nonFaits.length + ' point(s) à reprendre avant d’appeler le professeur.'));
          const ul = el('ul', 'liste'); nonFaits.forEach(c => ul.append(el('li', '', c.question))); pan.append(ul);
          narration = 'Tant qu’un contrôle n’est pas bon, la pièce n’est pas finie. Reprenez le geste qui corrige ce point, puis contrôlez de nouveau.';
        }
      }
    }

    if (T === 'prof') {
      const pr = st.prof, conf = memo('confirmation');
      fig = figure(pr.figure || st.obtenir.figure);
      const ap = el('div', 'appel'); ap.append(el('h2', '', 'Appelez votre professeur'), el('p', '', 'Montrez-lui votre pièce. Il regarde le geste et le résultat.'));
      pan.append(ap, el('div', 'compteur', 'Ce que le professeur vérifie'));
      const ul = el('ul', 'liste'); pr.verifie.forEach(v => ul.append(el('li', '', v))); pan.append(ul);
      pan.append(el('div', 'compteur', 'Réservé au professeur : niveau du geste'));
      const ech = el('div', 'echelle');
      ECHELLE.forEach((lib, i) => {
        const b = el('button'); b.type = 'button'; b.setAttribute('aria-pressed', conf.niveau === i ? 'true' : 'false');
        b.append(el('span', 'n', String(i)), lib);
        b.addEventListener('click', () => { conf.niveau = i; conf.date = new Date().toLocaleString('fr-FR'); ecrireMemo(); rendre(); });
        ech.append(b);
      });
      pan.append(ech);
      const ech5 = window.CUIVREZO.echelle;
      if (ech5 && conf.niveau != null) pan.append(el('p', 'compteur', ech5[conf.niveau].critere));
      if (conf.niveau != null) pan.append(el('div', 'tampon', 'Geste confirmé : ' + conf.niveau + ' · ' + ECHELLE[conf.niveau] + ' — ' + conf.date));
      const c = codes(); if (c) pan.append(c);
      narration = pr.narration;
    }

    if (S.revue) {
      const obj = T === 'gestes' ? st.gestes[S.p] : T === 'pieges' ? st.pieges[S.p] : T === 'controles' ? st.controles[S.p] : null;
      if (obj && obj.aValider) pan.append(el('div', 'attente', 'À valider : ' + obj.aValider));
      if (T === 'materiel') st.materiel.items.forEach(it => { if (it.aValider) pan.append(el('div', 'attente', it.nom + ' — à valider : ' + it.aValider)); });
    }
    main.replaceChildren(fig || el('div'), pan);
    S.narration = narration;
    majCommande();
    marquerTemps();
    history.replaceState(null, '', '#' + (S.t + 1) + '.' + (S.p + 1));
  }

  function boutonRetour(n) {
    const b = el('button', '', 'Revoir le geste ' + (n + 1) + ' : ' + S.st.gestes[n].titre); b.type = 'button';
    b.style.cssText = 'min-height:56px;border:2px solid var(--navy);border-radius:12px;background:var(--paper);color:var(--navy);font-weight:700;padding:.2rem .8rem;text-align:left';
    b.addEventListener('click', () => { S.t = 2; S.p = n; CuivVoix.couper(); rendre(); if (S.auto) CuivVoix.dire(S.narration); });
    return b;
  }

  /* ------------------------------------------------ navigation */
  function aller(sens) {
    CuivVoix.couper();
    const faits = memo('faits');
    if (sens > 0) {
      if (S.p + 1 < pages(S.t)) S.p++;
      else if (S.t + 1 < TEMPS.length) { faits[S.t] = true; ecrireMemo(); S.t++; S.p = 0; }
      else { faits[S.t] = true; ecrireMemo(); return sortir(); }
    } else {
      if (S.p > 0) S.p--;
      else if (S.t > 0) { S.t--; S.p = pages(S.t) - 1; }
    }
    rendre();
    window.scrollTo(0, 0);
    if (S.auto) CuivVoix.dire(S.narration);
  }

  function sortir() {
    const ordre = (window.CUIVREZO.stations || []).map(s => s.id), i = ordre.indexOf(S.st.id);
    location.href = i >= 0 && i + 1 < ordre.length ? S.racine + 'stations/' + ordre[i + 1] + '/' : S.racine + 'index.html';
  }

  function libelleSuivant() {
    const derPage = S.p + 1 >= pages(S.t);
    if (!derPage) return TEMPS[S.t].cle === 'gestes' ? 'Geste suivant ▶' : 'Suivant ▶';
    if (S.t + 1 < TEMPS.length) return TEMPS[S.t + 1].court + ' ▶';
    const ordre = (window.CUIVREZO.stations || []).map(s => s.id), i = ordre.indexOf(S.st.id);
    return i >= 0 && i + 1 < ordre.length ? 'Station suivante ▶' : 'Retour à la carte ▶';
  }

  function majCommande() {
    $('#suivant').textContent = libelleSuivant();
    $('#precedent').disabled = S.t === 0 && S.p === 0;
  }

  function marquerTemps() {
    const faits = memo('faits');
    document.querySelectorAll('.temps button').forEach((b, i) => {
      if (i === S.t) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      b.classList.toggle('fait', !!faits[i]);
    });
  }

  /* ------------------------------------------------ coque de la page */
  function coque() {
    const st = S.st, L = window.CUIVREZO.lignes[st.ligne];
    document.title = st.id.replace('-', '.') + ' ' + st.titre + ' · CuivRézo';
    const haut = el('header', 'haut');
    const res = el('a', 'reseau'); res.href = S.racine + 'index.html'; res.innerHTML = 'Cuiv<b>Rézo</b>';
    const ti = el('div', 'titres'); ti.append(el('div', 'kicker', 'Ligne ' + st.ligne + ' · ' + L + ' · station ' + st.id.replace('-', '.')), el('h1', '', st.titre));
    const ca = el('a', 'carte', 'La carte'); ca.href = S.racine + 'index.html';
    const mq = el('div', 'marque-hote'); mq.setAttribute('data-marque-hote', '');   /* le logo inerWeb se range ici (moteur/marque.js) */
    haut.append(res, ti, mq, ca);

    const nav = el('nav', 'temps'); nav.setAttribute('aria-label', 'Les six temps de la station');
    TEMPS.forEach((t, i) => {
      const b = el('button'); b.type = 'button'; b.append(el('span', 'n', String(i + 1)), t.court);
      b.addEventListener('click', () => { CuivVoix.couper(); S.t = i; S.p = 0; rendre(); if (S.auto) CuivVoix.dire(S.narration); });
      nav.append(b);
    });

    const main = el('main'); main.id = 'contenu';
    const bas = el('footer', 'bas');
    const prec = el('button', '', '◀'); prec.id = 'precedent'; prec.type = 'button'; prec.setAttribute('aria-label', 'Revenir en arrière');
    prec.addEventListener('click', () => aller(-1));
    const voix = el('div', 'voix');
    const ecoute = el('button', '', '🔊 Écouter'); ecoute.type = 'button'; ecoute.id = 'ecouter';
    ecoute.addEventListener('click', () => { if (CuivVoix.parle()) CuivVoix.couper(); else CuivVoix.dire(S.narration); });
    const lab = el('label'); const rg = el('input'); Object.assign(rg, { type: 'range', min: 0.6, max: 1.4, step: 0.05, value: CuivVoix.vitesse() });
    rg.addEventListener('input', () => CuivVoix.vitesse(parseFloat(rg.value)));
    lab.append('Vitesse', rg);
    const auto = el('button', 'auto', 'Voix à chaque écran'); auto.type = 'button';
    try { S.auto = sessionStorage.getItem('cuivrezo-auto') === '1'; } catch (e) {}
    auto.setAttribute('aria-pressed', S.auto ? 'true' : 'false');
    auto.addEventListener('click', () => { S.auto = !S.auto; auto.setAttribute('aria-pressed', S.auto ? 'true' : 'false');
      try { sessionStorage.setItem('cuivrezo-auto', S.auto ? '1' : '0'); } catch (e) {} if (S.auto) CuivVoix.dire(S.narration); else CuivVoix.couper(); });
    voix.append(ecoute, lab, auto);
    const suiv = el('button', 'suivant'); suiv.id = 'suivant'; suiv.type = 'button';
    suiv.addEventListener('click', () => aller(1));
    bas.append(prec, voix, suiv);
    CuivVoix.surEtat(e => { ecoute.textContent = e === 'parle' ? '⏹ Arrêter' : e === 'indisponible' ? 'Voix indisponible' : '🔊 Écouter'; });

    document.body.prepend(haut, nav, main, bas);
  }

  function demarrer() {
    const id = document.body.dataset.station;
    S.racine = document.body.dataset.racine || '';
    S.st = (window.CUIVREZO.stations || []).find(s => s.id === id);
    if (!S.st) { document.body.textContent = 'Station inconnue : ' + id; return; }
    lireMemo();
    const m = /^#(\d+)\.(\d+)$/.exec(location.hash);
    if (m) { S.t = Math.min(TEMPS.length - 1, Math.max(0, +m[1] - 1)); S.p = Math.min(pages(S.t) - 1, Math.max(0, +m[2] - 1)); }
    coque();
    rendre();
  }

  /* le script est le dernier du <body> : la coque se bâtit tout de suite, AVANT moteur/marque.js
     (chargé en defer), pour que la marque trouve sa place dans l'en-tête */
  if (document.body) demarrer(); else document.addEventListener('DOMContentLoaded', demarrer);
  return { TEMPS };
})();
