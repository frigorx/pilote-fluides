/* Le réglage des pressostats — les RÈGLES et le déroulé (6 temps). Demande de Franck (06/10/2026) : apprendre à
   RÉGLER un pressostat (pas à le câbler), au banc d'azote avec un détendeur ; puis « finir la ligne des pressostats ».
   Six cas (niveaux) : 1 = BP sécurité (KP1) ; 2 = HP sécurité (KP5 manuel, DIFF fixe 3 bar) ; 3 = BP régulation en
   pump-down (KP1) ; 4 = HP régulation du ventilateur (KP5 automatique, contact 1-4) ; 5 = découpage BP d'une centrale
   (sujet Bac Pro TFCA 2012) ; 6 = pressostat à zone neutre (Danfoss RT 1AL, deux contacts).
   L'échelle du pressostat n'est qu'un repère : chaque appareil a un petit écart (S.offset), et le vrai point
   d'action se prouve au manomètre de contrôle, trois cycles justes de suite. Données : regles-pressostat.js.
   Dessins : scene-pressostat.js (S.app décrit l'appareil). Moteur : moteur.js (copié de CuivRézo). */
Moteur.lancer(api => {
  'use strict';
  const { dire, faute, btn, suite, texte, choix, repondre, terminer, afficher, dessiner, E, borne, bar, melanger } = api;
  const R = window.REGLES_PRESSOSTAT, K1 = R.KP1, K5 = R.KP5, K5A = R.KP5A, CE = R.CENTRALE, RT = R.RT1AL;
  const PLAQUES = R.PLAQUES.filter(p => p.psHP <= K5.max);
  const un = l => l[Math.floor(Math.random() * l.length)];
  const r1 = v => Math.round(v * 10) / 10, demi = v => Math.floor(v * 2 + 1e-9) / 2, auDemi = v => Math.round(v * 2) / 2;
  const EPS = 1e-6, TOL_HP = 1.5;

  /* les appareils, tels que la scène les dessine */
  const HP_CONTACTS = ['KP haute pression : à la hausse,', '1 – 2 s’ouvre et 1 – 4 se ferme'];
  const APP = {
    KP1: { modele: 'KP1', sous: 'BP · réarmement auto', ech: { nom: 'CUT IN', min: K1.min, max: K1.max, vals: [0, 1, 2, 3, 4, 5, 6, 7], pas: 0.1 },
      dif: { nom: 'DIFF', min: K1.dmin, max: K1.dmax, vals: [1, 2, 3, 4], pas: 0.1 }, testeurs: [{ borne: '1 – 4', cle: 'contact' }],
      contacts: ['KP basse pression : à la baisse,', '1 – 4 s’ouvre et 1 – 2 se ferme'] },
    KP5M: { modele: 'KP5', sous: 'HP · réarmement manuel', ech: { nom: 'CUT OUT', min: K5.min, max: K5.max, vals: [8, 12, 16, 20, 24, 28, 32], pas: 0.5 },
      dif: null, difFixe: 'fixe : 3 bar', reset: true, testeurs: [{ borne: '1 – 2', cle: 'contact' }], contacts: HP_CONTACTS },
    KP5A: { modele: 'KP5', sous: 'HP · réarmement auto', ech: { nom: 'CUT OUT', min: K5A.min, max: K5A.max, vals: [8, 12, 16, 20, 24, 28, 32], pas: 0.5 },
      // DIFF au pas de 0,5 bar, de 2 à 6 : le pas du banc HP
      dif: { nom: 'DIFF', min: K5A.dmin, max: K5A.dmax, bmin: 2, vals: [2, 3, 4, 5, 6], pas: 0.5 }, testeurs: [{ borne: '1 – 4', cle: 'contact' }], contacts: HP_CONTACTS },
    PPL: { modele: 'PPL', sous: 'BP · découpage', ech: { nom: 'RANGE', min: 0, max: 4, vals: [0, 1, 2, 3, 4], pas: 0.1 },
      dif: { nom: 'DIFF', min: 0.1, max: 0.4, vals: [0.1, 0.2, 0.3, 0.4], pas: 0.1 }, testeurs: [{ borne: 'étage', cle: 'contact' }],
      bornes: ['A', 'B', 'C'], contacts: ['Pressostat de découpage : quand la BP monte,', 'son contact se ferme et l’étage démarre'] },
    RT: { modele: 'RT 1AL', sous: 'BP · zone neutre', ech: { nom: 'RANGE', min: RT.min, max: RT.max, vals: [0, 1, 2, 3, 4, 5], pas: 0.1 },
      dif: { nom: 'ZONE NEUTRE', vis: 'bague de zone neutre', min: RT.znMin, max: RT.znMax, vals: [0.2, 0.4, 0.6, 0.8], pas: 0.1 },
      testeurs: [{ borne: '1 – 4', cle: 'c14' }, { borne: '1 – 2', cle: 'c12' }],
      contacts: ['Zone neutre : 1 – 4 se ferme quand la BP monte,', '1 – 2 se ferme quand elle descend'] }
  };

  /* les six cas : ce qui change d'un pressostat à l'autre */
  const CAS = {
    BP: { niveau: 1, app: 'KP1', titre: 'Le pressostat BP de sécurité', sous: 'KP1, réarmement automatique',
      lib: ['enclenchement', 'coupure'], col: ['Enclenche', 'Coupe'], objet: 'quand le compresseur est autorisé', calc: 'Calculez les réglages du KP1',
      affiner: 'La vis de l’échelle déplace l’enclenchement ET la coupure ; celle du différentiel, la coupure seule' },
    HP: { niveau: 2, app: 'KP5M', hp: true, manuel: true, titre: 'Le pressostat HP de sécurité', sous: 'KP5, réarmement manuel',
      lib: ['', 'coupure'], col: ['', 'Coupe'], objet: 'quand le compresseur est autorisé', calc: 'Calculez la coupure HP',
      affiner: 'Corrigez à la vis, puis coupure et réarmement' },
    BPR: { niveau: 3, app: 'KP1', titre: 'Le pressostat BP de régulation', sous: 'KP1 en pump-down',
      lib: ['enclenchement', 'coupure'], col: ['Enclenche', 'Coupe'], objet: 'quand le compresseur est autorisé', calc: 'Calculez les réglages du KP1 en pump-down',
      affiner: 'La vis de l’échelle déplace l’enclenchement ET la coupure ; celle du différentiel, la coupure seule' },
    HPR: { niveau: 4, app: 'KP5A', hp: true, titre: 'Le pressostat HP de régulation', sous: 'KP5 automatique, le ventilateur du condenseur',
      lib: ['mise en route du ventilateur', 'arrêt du ventilateur'], col: ['En route', 'Arrêt'], objet: 'quand le ventilateur tourne', calc: 'Calculez les réglages du ventilateur',
      affiner: 'La vis de l’échelle déplace la mise en route ET l’arrêt ; celle du différentiel, l’arrêt seul' },
    CEN: { niveau: 5, app: 'PPL', titre: 'Les pressostats d’une centrale', sous: 'découpage BP, sujet Bac Pro TFCA 2012',
      lib: ['enclenchement de l’étage', 'coupure de l’étage'], col: ['Enclenche', 'Coupe'], objet: 'quand l’étage est en route', calc: 'Lisez les réglages de la centrale',
      affiner: 'Le Range déplace l’enclenchement ET la coupure ; le Diff, la coupure seule' },
    RTZ: { niveau: 6, app: 'RT', deux: true, titre: 'Le pressostat à zone neutre', sous: 'Danfoss RT 1AL, deux contacts',
      lib: ['fermeture de 1 – 4', 'fermeture de 1 – 2'], col: ['1 – 4 se ferme', '1 – 2 se ferme'], objet: 'les deux ordres du pressostat', calc: 'Calculez les deux basculements',
      affiner: 'Le Range déplace les deux basculements ; la bague de zone neutre, celui de 1 – 2 seul' },
    PRS: { niveau: 7, app: 'KP1', titre: 'La régulation pressostatique', sous: 'le KP1 seul tient la chambre froide (simulée)',
      lib: ['redémarrage', 'coupure'], col: ['Redémarre', 'Coupe'], objet: 'quand le compresseur est autorisé', calc: 'Calculez les réglages de la chambre',
      affiner: 'La vis de l’échelle déplace le redémarrage ET la coupure ; celle du différentiel, la coupure seule' }
  };
  const PAR_NIVEAU = {}; Object.keys(CAS).forEach(k => { PAR_NIVEAU[CAS[k].niveau] = k; });

  let S;
  function neuf(niveau) {
    const cas = PAR_NIVEAU[niveau] || 'BP', Cc = CAS[cas];
    S = { cas, hp: !!Cc.hp, manuel: !!Cc.manuel, deux: !!Cc.deux, app: Object.assign({}, APP[Cc.app]), p: 0,
      contact: !!Cc.manuel, c14: false, c12: true, verrou: false, attente: null, lectures: [], nLect: 0, cycles: [], enCours: {},
      anim: { pfff: null }, pas: Cc.hp ? 0.5 : 0.1 };
    if (cas === 'HP') {
      S.plaque = un(PLAQUES); S.soupape = Math.random() < .5;
      S.limite = S.soupape ? demi(0.9 * S.plaque.psHP) : S.plaque.psHP;
      S.cible = { out: S.limite }; S.cibleFace = { ech: S.limite };
      S.face = { ech: 16, diff: K5.diff };
      S.offset = un([-2.5, -2, 1, 1.5].filter(o => S.limite - o - TOL_HP <= K5.max && S.limite - o >= K5.min));
    } else if (cas === 'HPR') {
      S.fluide = un(Object.keys(R.TABLES_HP)); S.tc = un(R.CAS_HPR);
      const h = auDemi(ligneHP(S.tc)[2]);
      S.cible = { in: h, out: h - R.DIFF_HPR, diff: R.DIFF_HPR }; S.cibleFace = { ech: h, diff: R.DIFF_HPR };
      S.face = { ech: 16, diff: 4 };
      S.offset = un([-1.5, -1, 1, 1.5].filter(o => h - o >= K5A.min && h - o <= K5A.max));
    } else if (cas === 'CEN') {
      S.etage = un([1, 2, 3, 4]); S.app.modele = 'PPL' + S.etage;
      const h = CE.ranges[S.etage - 1];
      S.cible = { in: h, out: r1(h - CE.diff), diff: CE.diff }; S.cibleFace = { ech: h, diff: CE.diff };
      S.face = { ech: 3, diff: 0.4 };
      S.offset = un([-0.2, 0.2, 0.3]);
    } else if (cas === 'RTZ') {
      S.consigne = un(RT.consignes); S.zn = un(RT.zones);
      S.cible = { in: r1(S.consigne + RT.diff), out: r1(S.consigne + RT.diff - S.zn) }; S.cibleFace = { ech: S.consigne, diff: S.zn };
      S.face = { ech: 4, diff: 0.8 };
      S.offset = un([-0.2, 0.2, 0.3]);
    } else if (cas === 'PRS') {
      const k = un(R.CAS_PRS); S.fluide = k.fluide; S.prs = { tmin: k.tmin, tmax: k.tmax, dt: k.dt };
      const pin = r1(pRos(k.tmax)), pout = r1(pRos(k.tmin - k.dt));
      S.cible = { in: pin, out: pout, diff: r1(pin - pout) }; S.cibleFace = { ech: pin, diff: S.cible.diff };
      S.face = { ech: 4, diff: 2 }; S.mano = 'BP10';
      S.offset = un([-0.2, 0.2, 0.3]);
      // la chambre démarre un peu sous son maxi, compresseur en marche
      S.th = k.tmax - 0.5; S.t0 = S.th - k.dt; S.comp = true; S.contact = true; S.marche = false; S.histo = []; S.p = pRos(S.t0);
    } else {
      const regul = cas === 'BPR', table = regul ? R.CAS_BPR : R.CAS_BP;
      S.fluide = un(Object.keys(table)); S.t = un(table[S.fluide]);
      if (regul) S.tch = S.t + R.DT_CHAMBRE;
      const out = regul ? r1(R.COUPURE_BP + R.ECART_REGUL) : R.COUPURE_BP, h = r1(ligne(S.t)[1]);
      S.cible = { in: h, out, diff: r1(h - out) }; S.cibleFace = { ech: h, diff: S.cible.diff };
      S.face = { ech: 4, diff: 2 };
      // jamais plus bas que −0,2 : la coupure (cible + écart) doit rester mesurable à l'azote, au-dessus de 0
      S.offset = un([-0.2, 0.2, 0.3]);
    }
    // l'échelle en °C du manomètre : rosée côté BP, bulle côté HP (décision de Franck) ; pas d'échelle sans fluide connu
    const fl = S.fluide || (S.plaque && S.plaque.fluide === 'R134a' ? 'R-134a' : null);
    S.anneau = fl ? (S.hp ? { T0: FIN.bulT0, P: FIN[fl].bul } : { T0: FIN.rosT0, P: FIN[fl].ros }) : null;
    const h2 = document.querySelector('#carte-poste h2'); if (h2) h2.textContent = cas === 'PRS' ? 'L’installation' : 'Le banc';
    return S;
  }
  /* conversions au degré près, par les tables fines : pression effective ↔ température de saturation */
  const FIN = R.FIN;
  const interp = (x, xs, ys) => { for (let i = 1; i < xs.length; i++) if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (x - xs[i - 1]) / (xs[i] - xs[i - 1]); return ys[ys.length - 1]; };
  const deg = (T0, n) => Array.from({ length: n }, (_, i) => T0 + i);
  const pRos = t => { const P = FIN[S.fluide].ros; return interp(t, deg(FIN.rosT0, P.length), P); };
  const tRos = p => { const P = FIN[S.fluide].ros; return interp(p, P, deg(FIN.rosT0, P.length)); };
  const tBul = p => { const P = FIN[S.fluide].bul; return interp(p, P, deg(FIN.bulT0, P.length)); };
  const C = () => CAS[S.cas];
  // la méthode visuelle de Franck vaut au banc d'azote pour les pressostats à une lame ; pas pour la chambre ni le RT
  const visuel = () => S.cas !== 'PRS' && S.cas !== 'RTZ';
  const cibleHaut = () => S.manuel ? S.limite : S.cible.in;
  const ligne = t => R.TABLES[S.fluide].find(l => l[0] === t);
  const ligneHP = t => R.TABLES_HP[S.fluide].find(l => l[0] === t);
  const arr = v => S.hp ? auDemi(v) : r1(v);
  const haut = () => arr(S.face.ech + S.offset);           // basculement à la hausse (contact qui se ferme, ou coupure HP manuelle)
  const bas = () => arr(haut() - S.face.diff);              // basculement à la baisse
  // RT 1AL : Range réel, DIFF fixe, zone neutre de la bague
  const rt = () => { const Rg = r1(S.face.ech + S.offset), D = RT.diff, Z = S.face.diff;
    return { f14: r1(Rg + D), o14: Rg, f12: r1(Rg + D - Z), o12: r1(Rg + 2 * D - Z) }; };
  const tol = () => S.hp ? 0.5 : 0.1;
  const MAX = () => S.hp ? 34 : 5;
  const R449 = () => S.fluide === 'R-449A';

  /* ---------- les contacts : zone neutre entre les basculements ; HP manuel, verrouillé jusqu'au Reset ---------- */
  function majContact(silence) {
    if (S.deux) return majDeux(silence);
    const avant = S.contact;
    if (!S.manuel) {
      if (S.p >= haut() - EPS) S.contact = true;
      else if (S.p <= bas() + EPS) S.contact = false;
    } else if (!S.verrou && S.p >= haut() - EPS) { S.verrou = true; S.contact = false; }
    if (silence || S.contact === avant) return;
    Son.claque();
    attendre(S.manuel ? 'out' : S.contact ? 'in' : 'out', `Le testeur ${S.contact ? 's’est allumé' : 's’est éteint'}`);
  }
  /* RT 1AL : on s'arrête lire le manomètre quand un contact se FERME (l'ordre donné) ; quand il s'ouvre, on le dit */
  function majDeux(silence) {
    const b = rt(), a14 = S.c14, a12 = S.c12;
    if (S.p >= b.f14 - EPS) S.c14 = true; else if (S.p <= b.o14 + EPS) S.c14 = false;
    if (S.p <= b.f12 + EPS) S.c12 = true; else if (S.p >= b.o12 - EPS) S.c12 = false;
    if (silence) return;
    if (S.c14 && !a14) { Son.claque(); return attendre('in', 'Le testeur 1 – 4 s’est allumé : « BP trop haute »'); }
    if (S.c12 && !a12) { Son.claque(); return attendre('out', 'Le testeur 1 – 2 s’est allumé : « BP trop basse »'); }
    if (!S.c14 && a14) { Son.claque(); dire('<p><b>Clac.</b> 1 – 4 s’ouvre : la BP rentre dans la zone neutre. Continuez à descendre.</p>'); }
    if (!S.c12 && a12) { Son.claque(); dire('<p><b>Clac.</b> 1 – 2 s’ouvre : la BP rentre dans la zone neutre. Continuez à monter.</p>'); }
  }
  function attendre(type, quoi) {
    S.attente = { type, p: S.p, quoi, th: S.th };
    if (S.cas === 'PRS') {
      // la chambre : on lit la TEMPÉRATURE d'évaporation sur l'échelle en °C du manomètre
      const t = Math.round(tRos(S.p)); S.attente.tC = t; S.lectures = melanger([t, t + 3, t - 3]);
    } else {
      const d = 2 * S.pas, autre = S.p - d >= 0 ? S.p - d : S.p + 3 * S.pas;
      S.lectures = melanger([S.p, S.p + d, autre]);
    }
    clac();
    afficher(true);
  }

  /* ---------- la chambre froide simulée (régulation pressostatique) : le temps passe tout seul ----------
     En marche, l'évaporateur suit la chambre moins l'écart ΔT1 et la chambre se refroidit ; à l'arrêt, l'évaporateur
     remonte vers la température de la chambre, qui se réchauffe (parois, portes). Le KP1 (avec son écart d'échelle)
     arrête le compresseur à sa coupure et le relance à son enclenchement. */
  const FROID = 0.1, CHAUD = 0.07;
  function physique() {
    if (S.cas !== 'PRS' || !S.marche || S.attente || !['mesure', 'affiner'].includes(E().id)) return false;
    const P = S.prs;
    if (S.comp) { S.th = Math.max(P.tmin - 10, S.th - FROID); S.t0 += (S.th - P.dt - S.t0) * 0.5; }
    else { S.th = Math.min(P.tmax + 10, S.th + CHAUD); S.t0 += (S.th - S.t0) * 0.3; }
    S.p = Math.max(0, pRos(S.t0));
    S.histo.push({ th: S.th, comp: S.comp }); if (S.histo.length > 300) S.histo.shift();
    const h = haut(), b = bas();
    if (S.comp && S.p <= b + EPS) { S.comp = false; S.contact = false; S.p = b; Son.claque(); attendre('out', 'Le compresseur s’arrête'); }
    else if (!S.comp && S.p >= h - EPS) { S.comp = true; S.contact = true; S.p = h; Son.claque(); attendre('in', 'Le compresseur redémarre'); }
    else if (!S.comp && S.th >= P.tmax + 9.9) dire('<p>La chambre se réchauffe et le compresseur ne repart pas : l’enclenchement est réglé trop haut.</p>', 'bad');
    else if (S.comp && S.th <= P.tmin - 9.9) dire('<p>La chambre descend bien sous son mini et le compresseur ne s’arrête pas : la coupure est réglée trop bas.</p>', 'bad');
    return true;
  }
  const clac = () => dire(`<p><b>Clac !</b> ${S.attente.quoi}. Arrêtez-vous et lisez le manomètre de contrôle (touchez-le pour le voir de près).</p>`, 'wait');

  function bouger(sens) {
    if (S.attente) return clac();
    const avant = S.p;
    S.p = borne(Math.round(Math.round((S.p + sens * S.pas) / S.pas) * S.pas * 100) / 100, 0, MAX());
    if (sens < 0 && S.p < avant && !S.anim.pfff) { S.anim.pfff = true; setTimeout(() => { S.anim.pfff = null; dessiner(); }, 400); }
    majContact();
    if (S.attente) return;
    const rienEnHaut = S.deux ? !S.c14 : S.manuel ? !S.verrou : !S.contact;
    if (sens > 0 && S.p === MAX() && rienEnHaut) dire(`<p>Le banc est à ${bar(MAX())} bar et rien n’a basculé. Revoyez le préréglage.</p>`, 'bad');
    if (sens < 0 && S.p === 0 && !S.deux && S.contact && !S.manuel) dire('<p>Le banc est à zéro et le testeur reste allumé : le basculement du bas est réglé sous 0 bar. Revoyez le différentiel.</p>', 'bad');
  }
  function reset() {
    if (S.attente) return clac();
    if (!S.verrou) return dire('<p>Le pressostat n’a pas coupé : il n’y a rien à réarmer.</p>');
    if (S.p > haut() - K5.diff + EPS)
      return dire(`<p><b>Le bouton ne s’enclenche pas.</b> La pression est encore trop haute : un KP5 manuel ne se réarme qu’une fois descendu de ${bar(K5.diff)} bar sous sa coupure.</p>`, 'wait');
    S.verrou = false; S.contact = true; Son.claque();
    dire('<p><b>Réarmé.</b> Le testeur se rallume : le compresseur serait de nouveau autorisé.</p>', 'ok');
    if (S.enCours.out != null) finirCycle({ out: S.enCours.out });
  }
  function tourner(v) {
    if (S.attente) return clac();
    const [quoi, sens] = v.split(':'), A = S.app;
    if (quoi === 'ech') S.face.ech = borne(Math.round((S.face.ech + +sens * A.ech.pas) * 100) / 100, A.ech.min, A.ech.max);
    else if (A.dif) S.face.diff = borne(Math.round((S.face.diff + +sens * A.dif.pas) * 100) / 100, A.dif.bmin != null ? A.dif.bmin : A.dif.min, A.dif.max);
    // le réglage a bougé : les cycles d'avant ne prouvent plus rien
    S.cycles = []; S.enCours = {}; S.q.fini = false;
    if (S.cas === 'PRS') return; // la chambre : c'est le temps qui fait basculer (physique)
    // méthode visuelle de Franck : à pression fixe, on tourne jusqu'au clac — ce clac-là est le réglage
    if (['haut', 'bas'].includes(E().id)) return majContact();
    // à pression constante, tourner la vis peut faire basculer le contact (comme sur le vrai) : on le dit
    const avant = [S.contact, S.c14, S.c12];
    majContact(true);
    if (S.p > 0 && (avant[0] !== S.contact || avant[1] !== S.c14 || avant[2] !== S.c12))
      dire('<p>Le testeur a changé d’état pendant que vous tourniez : le réglage est passé par la pression du banc. Refaites un cycle complet, en partant d’en bas.</p>', 'wait');
  }

  /* ---------- les lectures et les cycles ---------- */
  const listeLectures = () => S.cas === 'PRS'
    ? S.lectures.map(v => ({ t: v + ' °C', ok: v === S.attente.tC, faute: 'Échelle en °C du manomètre mal lue',
      pourquoi: v === S.attente.tC ? 'Bien lu sur l’échelle en °C : c’est la température d’évaporation. Elle va dans le cahier de relevés.' : 'Relisez l’échelle en °C (les chiffres bleus, dans le cadran). Touchez le manomètre pour le voir de près.' }))
    : S.lectures.map(v => ({ t: bar(v) + ' bar', ok: Math.abs(v - S.attente.p) < EPS, faute: 'Manomètre de contrôle mal lu',
      pourquoi: Math.abs(v - S.attente.p) < EPS ? 'Bien lu. La valeur va dans le cahier de relevés.' : 'Relisez : l’aiguille, et les traits les plus proches. Touchez le manomètre pour le voir de près.' }));
  function noter(i) {
    const cle = 'l' + S.nLect;
    repondre(listeLectures(), cle, i, () => {
      const a = S.attente; S.attente = null; S.nLect++;
      if (['haut', 'bas'].includes(E().id)) return evaluerReglage(a);
      if (S.manuel) { S.enCours.out = a.p; return; }
      if (a.type === 'in') S.enCours = { in: a.p, thHaut: a.th };
      else if (S.enCours.in != null) finirCycle({ in: S.enCours.in, out: a.p, thHaut: S.enCours.thHaut, thBas: a.th });
    });
  }
  /* méthode visuelle : le basculement obtenu à la vis tombe-t-il à la pression voulue ? */
  function evaluerReglage(a) {
    const enHaut = E().id === 'haut', cible = enHaut ? (S.manuel ? S.limite : S.cible.in) : S.cible.out;
    const bonSens = enHaut ? (S.manuel ? S.verrou : a.type === 'in') : a.type === 'out';
    const juste_ = S.manuel ? a.p <= S.limite + EPS && a.p >= S.limite - 0.5 - EPS : Math.abs(a.p - cible) <= tol() + EPS;
    if (bonSens && juste_) { S.q.ok = true; return dire(`<p><b>Réglé.</b> Le pressostat bascule à ${bar(a.p)} bar : la pression voulue, lue au manomètre.</p>`, 'ok'); }
    if (enHaut && bonSens) return dire(`<p>Le pressostat a basculé à ${bar(a.p)} bar au lieu de ${bar(cible)}. Remontez la vis de l’échelle au maximum, ramenez l’azote à ${bar(cible)} bar, puis baissez la vis jusqu’au clac.</p>`, 'bad');
    if (!enHaut && bonSens) return dire(`<p>Le contact s’est ouvert à ${bar(a.p)} bar au lieu de ${bar(cible)}. ${a.p > cible ? 'Le différentiel était trop petit : il a coupé pendant la descente.' : 'Vous étiez descendu trop bas.'} Remontez au-dessus de l’enclenchement, remettez le différentiel au maximum, descendez à ${bar(cible)} bar, puis diminuez-le jusqu’au clac.</p>`, 'bad');
    return dire(`<p>Le contact a basculé dans l’autre sens, à ${bar(a.p)} bar. Reprenez la consigne au-dessus.</p>`, 'wait');
  }
  function juste(c) {
    if (S.cas === 'PRS') return Math.abs(tRos(c.in) - S.prs.tmax) <= 1 + EPS && Math.abs(tRos(c.out) - (S.prs.tmin - S.prs.dt)) <= 1 + EPS;
    return S.manuel ? c.out <= S.limite + EPS && c.out >= S.limite - TOL_HP - EPS
      : Math.abs(c.in - S.cible.in) <= tol() + EPS && Math.abs(c.out - S.cible.out) <= tol() + EPS;
  }
  function finirCycle(c) {
    c.ok = juste(c); S.cycles.push(c); S.enCours = {};
    const n = S.cycles.length, trois = n >= 3 && S.cycles.slice(-3).every(x => x.ok);
    if (E().id === 'affiner' && trois) { S.q.fini = true; return dire('<p><b>Trois cycles justes de suite.</b> Le réglage est prouvé au manomètre.</p>', 'ok'); }
    if (c.ok) return dire(`<p><b>Cycle ${n} juste.</b> ${E().id === 'affiner' ? 'Refaites-en d’autres sans toucher aux réglages.' : ''}</p>`, 'ok');
    let pb;
    if (S.manuel) pb = c.out > S.limite + EPS ? `Coupure à ${bar(c.out)} bar : <b>au-dessus de la limite de ${bar(S.limite)} bar</b>. Baissez le repère de l’échelle.`
      : `Coupure à ${bar(c.out)} bar : trop bas, le pressostat couperait sans raison par forte chaleur. Montez le repère, sans dépasser ${bar(S.limite)} bar.`;
    else if (S.cas === 'PRS') {
      const P = S.prs, ti = Math.round(tRos(c.in)), to = Math.round(tRos(c.out)), l = [];
      if (Math.abs(tRos(c.in) - P.tmax) > 1) l.push(`le compresseur repart quand l’évaporateur, donc la chambre, est à ${ti} °C au lieu de ${P.tmax} °C`);
      if (Math.abs(tRos(c.out) - (P.tmin - P.dt)) > 1) l.push(`il s’arrête à ${to} °C d’évaporation au lieu de ${P.tmin - P.dt} °C : la chambre descend à ${to + P.dt} °C au lieu de ${P.tmin} °C`);
      pb = `Cycle ${n} : ${l.join(' ; ')}.`;
    } else {
      const l = [], [li, lo] = C().lib;
      if (Math.abs(c.in - S.cible.in) > tol() + EPS) l.push(`${li} à ${bar(c.in)} bar au lieu de ${bar(S.cible.in)}`);
      if (Math.abs(c.out - S.cible.out) > tol() + EPS) l.push(`${lo} à ${bar(c.out)} bar au lieu de ${bar(S.cible.out)}`);
      pb = `Cycle ${n} : ${l.join(', ')}.`;
    }
    dire(`<p>${pb}</p>`, 'bad');
  }

  /* ---------- l'interface ---------- */
  const ligneCmd = (id, nom, pos, boutons) => `<div class="robinet" id="${id}"><div><span class="nom">${nom}</span><span class="pos">${pos}</span></div>${boutons}</div>`;
  const cmdPression = () => ligneCmd('l-det', 'Vis du détendeur', 'appui long : la pression monte', btn('<b>↻</b>monter', 'monter', '', 'tourner', true))
    + ligneCmd('l-purge', 'Vanne de purge', 'appui long : la pression baisse', btn('<b>↓</b>purger', 'baisser', '', 'tourner', true))
    + (S.manuel ? ligneCmd('l-reset', 'Bouton Reset du KP5', 'réarmement manuel', btn('<b>●</b>réarmer', 'reset', '', 'tourner')) : '');
  function cmdVis(seule) {
    const A = S.app, ech = ({ HPR: 'repère CUT OUT : la mise en route (déplace aussi l’arrêt)', HP: 'repère CUT OUT', CEN: 'repère RANGE : l’enclenchement (déplace aussi la coupure)',
      RTZ: 'repère RANGE : la pression voulue (déplace les deux basculements)' })[S.cas] || 'repère CUT IN (déplace aussi la coupure)';
    const dif = ({ HPR: 'repère DIFF (ne déplace que l’arrêt)', RTZ: 'repère ZONE NEUTRE (ne déplace que 1 – 2)' })[S.cas] || 'repère DIFF (ne déplace que la coupure)';
    return (seule === 'diff' ? '' : ligneCmd('l-ech', S.cas === 'RTZ' ? 'Bouton de réglage' : 'Vis de l’échelle', ech, btn('<b>+</b>monter', 'vis', 'ech:1', 'tourner', true) + btn('<b>−</b>baisser', 'vis', 'ech:-1', 'tourner', true)))
      + (A.dif && seule !== 'ech' ? ligneCmd('l-diff', A.dif.vis ? 'Bague de zone neutre' : 'Vis du différentiel', dif,
        btn('<b>+</b>élargir', 'vis', 'diff:1', 'tourner', true) + btn('<b>−</b>serrer', 'vis', 'diff:-1', 'tourner', true)) : '');
  }
  function cahier() {
    if (!S.cycles.length) return '';
    const [ci, co] = C().col;
    if (S.cas === 'PRS') return `<table class="cahier"><caption>Cahier de relevés, depuis le dernier réglage</caption>
      <tr><th>Cycle</th><th>${ci}</th><th>${co}</th><th>Chambre</th><th></th></tr>
      ${S.cycles.map((c, i) => `<tr><td>${i + 1}</td><td>${bar(c.in)} bar · ${Math.round(tRos(c.in))} °C</td><td>${bar(c.out)} bar · ${Math.round(tRos(c.out))} °C</td>
        <td>${bar(Math.round(c.thBas * 10) / 10)} à ${bar(Math.round(c.thHaut * 10) / 10)} °C</td><td class="${c.ok ? 'juste' : 'faux'}">${c.ok ? 'juste' : 'à corriger'}</td></tr>`).join('')}</table>`;
    return `<table class="cahier"><caption>Cahier de relevés, depuis le dernier réglage</caption>
      <tr><th>Cycle</th>${S.manuel ? '' : `<th>${ci}</th>`}<th>${co}</th><th></th></tr>
      ${S.cycles.map((c, i) => `<tr><td>${i + 1}</td>${S.manuel ? '' : `<td>${bar(c.in)} bar</td>`}<td>${bar(c.out)} bar</td><td class="${c.ok ? 'juste' : 'faux'}">${c.ok ? 'juste' : 'à corriger'}</td></tr>`).join('')}</table>`;
  }
  const lecture = () => S.cas === 'PRS'
    ? `<p class="question">${S.attente.quoi} : lisez l’échelle en °C du manomètre. Quelle température d’évaporation ?</p>${choix(listeLectures(), 'l' + S.nLect)}`
    : `<p class="question">${S.attente.quoi} : que lit le manomètre de contrôle ?</p>${choix(listeLectures(), 'l' + S.nLect)}`;
  const cmdMarche = () => ligneCmd('l-marche', 'L’installation', S.marche ? 'en route, temps accéléré' : 'à l’arrêt',
    btn(S.marche ? '<b>⏸</b>pause' : '<b>▶</b>en route', 'marche', '', 'tourner'));
  function atelier(avecVis) {
    if (S.attente) return lecture();
    return `${avecVis ? cmdVis() : ''}${S.cas === 'PRS' ? cmdMarche() : cmdPression()}${cahier()}`;
  }
  function act(a, v) {
    if (a === 'marche') { S.marche = !S.marche; return; }
    if (a === 'monter') return bouger(1);
    if (a === 'baisser') return bouger(-1);
    if (a === 'reset') return reset();
    if (a === 'vis') return tourner(v);
    if (a === 'choix' && v.startsWith('l')) return noter(+v.split(':')[1]);
  }

  /* ---------- la fiche du cas et les questions de calcul ---------- */
  const tableau = (lignes, entete) => `<table class="table-fluide"><tr><th>T (°C)</th>${entete}</tr>
    ${lignes.map(l => `<tr><td>${l[0]}</td><td>${bar(l[1])}</td>${R449() ? `<td>${bar(l[2])}</td>` : ''}</tr>`).join('')}</table>`;
  function fiche() {
    if (S.cas === 'HP') return texte(`<p><b>Groupe</b> : ${S.plaque.fabricant} ${S.plaque.modele}, ${S.plaque.fluide}.</p>
      <p><b>PS côté HP</b> (plaque) : <b>${bar(S.plaque.psHP)} bar</b> · PS côté BP : ${bar(S.plaque.psBP)} bar.</p>
      <p><b>Soupape côté HP</b> : ${S.soupape ? `oui, tarée à la PS, ${bar(S.plaque.psHP)} bar` : 'non'}.</p>
      <p><b>La règle</b> (NF EN 378-2) : sans soupape, la coupure ne dépasse pas la PS. Avec une soupape, elle ne dépasse pas 0,9 × son tarage : le pressostat coupe avant que la soupape s’ouvre.</p>
      <p class="aide">D’après la ${S.plaque.source}. On règle sur le pas de l’échelle (0,5 bar), toujours en dessous de la limite.</p>`);
    if (S.cas === 'HPR') return texte(`<p><b>Installation</b> : ${S.fluide}, condensation visée <b>${S.tc} °C</b>.</p>
      <p><b>La règle</b> : le ventilateur se met en route à la pression de saturation de la condensation visée ; il s’arrête ${bar(R.DIFF_HPR)} bar plus bas.</p>
      ${tableau(R.TABLES_HP[S.fluide], R449() ? '<th>P rosée</th><th>P bulle (HP)</th>' : '<th>P (bar)</th>')}
      <p class="aide">Pressions effectives en bar.${R449() ? ' R-449A : côté HP, on lit la bulle.' : ''} On règle au pas de l’échelle, 0,5 bar.</p>`);
    if (S.cas === 'CEN') return texte(`<p><b>Centrale à 3 compresseurs</b>, chambre à ${CE.chambre} °C. Quatre pressostats de découpage, PPL1 à PPL4, et un pressostat BP général de sécurité (PSL).</p>
      <table class="table-fluide"><tr><th>Pressostat</th><th>Range</th><th>Diff</th></tr>
      ${CE.ranges.map((r, i) => `<tr${i + 1 === S.etage ? ' style="font-weight:800"' : ''}><td>PPL${i + 1}</td><td>${bar(r)} bar</td><td>${bar(CE.diff)} bar</td></tr>`).join('')}</table>
      <p><b>Vous réglez PPL${S.etage}.</b> Le Range porte l’enclenchement ; la coupure, c’est Range − Diff (comme sur un KP basse pression).</p>
      <p class="aide">D’après le ${CE.source}.</p>`);
    if (S.cas === 'RTZ') return texte(`<p><b>Pressostat à zone neutre RT 1AL.</b> Pression voulue : <b>${bar(S.consigne)} bar</b> ; zone neutre voulue : <b>${bar(S.zn)} bar</b> ; différentiel fixe : ${bar(RT.diff)} bar.</p>
      <p><b>La notice</b> : la pression voulue, c’est le Range, où 1 – 4 s’ouvre en descendant. 1 – 4 se ferme à Range + DIFF ; 1 – 2 se ferme à Range + DIFF − zone neutre. Entre les deux, aucun contact n’est fermé.</p>
      <p class="aide">D’après la ${RT.source} (exemple : 2,5 bar, zone neutre 0,5 → 2,7 et 2,2 bar). Sur le vrai RT, la bague se lit sur le diagramme de la notice ; ici, elle est graduée en bar.</p>`);
    if (S.cas === 'PRS') {
      const P = S.prs, autour = t => [t - 2, t - 1, t, t + 1, t + 2];
      const tab = ts => `<table class="table-fluide"><tr><th>T (°C)</th><th>${R449() ? 'P rosée (BP)' : 'P (bar)'}</th></tr>${ts.map(t => `<tr><td>${t}</td><td>${bar(Math.round(pRos(t) * 100) / 100)}</td></tr>`).join('')}</table>`;
      return texte(`<p><b>Chambre froide</b> au ${S.fluide}, à tenir entre <b>${P.tmin} °C</b> et <b>${P.tmax} °C</b>. Écart à l’évaporateur (ΔT1) : <b>${P.dt} K</b>.</p>
        <p><b>La règle</b> (fiche n° 4 du banc FG10) : à l’arrêt, l’évaporateur se met à la température de la chambre : enclenchement à la pression de saturation du MAXI. En marche, il est ΔT1 plus froid que la chambre : coupure à la pression de saturation du MINI moins ΔT1.</p>
        <div style="display:flex;gap:16px;flex-wrap:wrap">${tab(autour(P.tmax))}${tab(autour(P.tmin - P.dt))}</div>
        <p class="aide">Extraits de la table du fluide, pressions effectives.${R449() ? ' R-449A : côté BP, on lit la rosée.' : ''} Le manomètre porte aussi l’échelle en °C.</p>`);
    }
    const regul = S.cas === 'BPR';
    return texte(`<p><b>Installation</b>${regul ? ' en pump-down' : ''} : ${S.fluide}, évaporation à <b>${S.t} °C</b>${regul ? `, chambre à <b>${S.tch} °C</b>` : ''}.</p>
      <p><b>La règle</b> : ${regul ? `coupure (CUT OUT) au-dessus de la BP de sécurité (${bar(R.COUPURE_BP)} bar), ici de ${bar(R.ECART_REGUL)} bar ; enclenchement (CUT IN) à la pression de saturation de l’évaporation, toujours sous celle de la chambre.`
        : `coupure (CUT OUT) à ${bar(R.COUPURE_BP)} bar ; enclenchement (CUT IN) à la pression de saturation de l’évaporation.`}</p>
      ${tableau(R.TABLES[S.fluide], R449() ? '<th>P rosée (BP)</th><th>P bulle</th>' : '<th>P (bar)</th>')}
      <p class="aide">Pressions effectives en bar : celles que lit le manomètre.${R449() ? ' R-449A : côté BP, on lit la rosée.' : ''}</p>`);
  }
  /* l'ordre des réponses est tiré une fois par question, puis gardé (la liste est recalculée à chaque affichage) */
  function melangeFixe(liste, cle) { S.ordres = S.ordres || {}; if (!S.ordres[cle]) S.ordres[cle] = melanger(liste.map((_, i) => i)); return S.ordres[cle].map(i => liste[i]); }
  function qEnclenchementBP(cle) {
    const l = ligne(S.t), c = S.cible;
    // R-449A : la ligne plus froide, pour ne pas tomber sur la valeur de bulle ; corps purs : la ligne plus chaude
    const voisin = R449() ? ligne(S.t - 5) : ligne(S.t + 5) || ligne(S.t - 5),
      autre = R449() ? r1(l[2]) : r1((ligne(S.t - 5) || ligne(S.t + 10))[1]);
    return melangeFixe([
      { t: `${bar(c.in)} bar`, ok: true, pourquoi: `La ligne ${S.t} °C${R449() ? ', colonne rosée' : ''} : ${bar(l[1])} bar, soit ${bar(c.in)} bar.` },
      { t: `${bar(r1(voisin[1]))} bar`, ok: false, faute: 'Mauvaise ligne lue dans la table', pourquoi: `C’est la ligne ${voisin[0]} °C. Cherchez la ligne ${S.t} °C.` },
      { t: `${bar(autre)} bar`, ok: false, faute: R449() ? 'Bulle lue au lieu de la rosée côté BP' : 'Mauvaise ligne lue dans la table',
        pourquoi: R449() ? 'C’est la colonne bulle. Côté BP, pour le R-449A, on lit la rosée.' : 'Ce n’est pas la ligne de la température d’évaporation.' }
    ], cle);
  }
  function qDiffBP(cle) {
    const c = S.cible;
    return melangeFixe([
      { t: `${bar(r1(c.in + c.out))} bar`, ok: false, faute: 'Différentiel BP calculé en additionnant', pourquoi: 'Le différentiel, c’est l’écart entre les deux : CUT IN − CUT OUT.' },
      { t: `${bar(c.diff)} bar`, ok: true, pourquoi: `DIFF = CUT IN − CUT OUT = ${bar(c.in)} − ${bar(c.out)} = ${bar(c.diff)} bar.` },
      { t: `${bar(c.in)} bar`, ok: false, faute: 'Enclenchement pris pour le différentiel', pourquoi: 'Ça, c’est l’enclenchement. Le différentiel est l’écart entre l’enclenchement et la coupure.' }
    ], cle);
  }
  /* le rapport pression-température : une pression de réglage, quelle température de saturation ? */
  function qConversion(p, cote, cle) {
    const T = Math.round(cote === 'ros' ? tRos(p) : tBul(p)), quoi = cote === 'ros' ? 'd’évaporation' : 'de condensation';
    const piege = Math.round(p), autre = piege === T + 8 ? T - 8 : T + 8;
    return melangeFixe([
      { t: `${T} °C`, ok: true, pourquoi: `Table du fluide, ou échelle en °C du manomètre : ${bar(p)} bar ↔ ${T} °C. Régler une pression, c’est régler une température ${quoi}.` },
      { t: `${autre} °C`, ok: false, faute: 'Correspondance pression-température mal lue', pourquoi: 'Relisez la table du fluide, ou l’échelle en °C du manomètre (touchez-le pour le voir de près).' },
      { t: `${piege} °C`, ok: false, faute: 'Pression prise pour une température', pourquoi: `${bar(p)} bar ne veut pas dire ${piege} °C : une pression n’est pas une température. On passe par la table du fluide.` }
    ], cle);
  }
  /* trois réponses distinctes : si un piège tombe sur la même valeur qu'une autre réponse, on prend le suivant */
  const distinctes = l => { const vus = new Set(); return l.filter(x => !vus.has(x.t) && vus.add(x.t)).slice(0, 3); };
  function questions() {
    const c = S.cible;
    if (S.cas === 'BP') return [{ q: 'Enclenchement (CUT IN) : quelle pression ?', l: qEnclenchementBP('c0') }, { q: 'Différentiel (DIFF) : combien ?', l: qDiffBP('c1') },
      { q: `La coupure à ${bar(c.out)} bar, au ${S.fluide} : quelle température d’évaporation ?`, l: qConversion(c.out, 'ros', 'c2') }];
    if (S.cas === 'PRS') {
      const P = S.prs, tc = P.tmin - P.dt;
      return [
        { q: 'Enclenchement : à quelle température d’évaporation correspond-il ?', l: melangeFixe([
          { t: `${P.tmax} °C, le maxi de la chambre`, ok: true, pourquoi: 'À l’arrêt, l’évaporateur se met à la température de la chambre : le compresseur doit repartir quand elle atteint son maxi.' },
          { t: `${P.tmin} °C, le mini de la chambre`, ok: false, faute: 'Enclenchement calé sur le mini de la chambre', pourquoi: 'Le compresseur repartirait trop tôt, sans laisser la chambre remonter. On le relance au maxi.' },
          { t: `${P.tmax - P.dt} °C`, ok: false, faute: 'Écart de l’évaporateur appliqué à l’enclenchement', pourquoi: 'À l’arrêt, il n’y a plus d’écart : l’évaporateur rejoint la température de la chambre.' }
        ], 'c0') },
        { q: `Et en pression, au ${S.fluide} ?`, l: melangeFixe(distinctes([
          { t: `${bar(c.in)} bar`, ok: true, pourquoi: `Ligne ${P.tmax} °C : ${bar(Math.round(pRos(P.tmax) * 100) / 100)} bar effectifs, soit ${bar(c.in)} bar.` },
          { t: `${bar(r1(c.in + 1))} bar`, ok: false, faute: 'Pression absolue prise pour la pression effective', pourquoi: 'C’est à peu près la pression ABSOLUE (1 bar de plus). Le manomètre et le pressostat lisent en pression effective.' },
          { t: `${bar(r1(pRos(P.tmax - 2)))} bar`, ok: false, faute: 'Mauvaise ligne lue dans la table', pourquoi: `C’est la ligne ${P.tmax - 2} °C. Cherchez la ligne ${P.tmax} °C.` }
        ]), 'c1') },
        { q: 'Coupure : à quelle température d’évaporation ?', l: melangeFixe([
          { t: `${tc} °C : le mini moins ΔT1`, ok: true, pourquoi: `En marche, l’évaporateur est ${P.dt} K plus froid que la chambre : quand il atteint ${tc} °C, la chambre est à ${P.tmin} °C.` },
          { t: `${P.tmin} °C, le mini de la chambre`, ok: false, faute: 'Écart de l’évaporateur oublié à la coupure', pourquoi: `Sans l’écart, le compresseur s’arrêterait quand la chambre est encore à ${P.tmin + P.dt} °C.` },
          { t: `${P.tmin + P.dt} °C`, ok: false, faute: 'Écart de l’évaporateur ajouté au lieu d’être retranché', pourquoi: 'En marche, l’évaporateur est plus FROID que la chambre : on retranche l’écart.' }
        ], 'c2') },
        { q: `Et en pression, au ${S.fluide} ?`, l: melangeFixe(distinctes([
          { t: `${bar(c.out)} bar`, ok: true, pourquoi: `Ligne ${tc} °C : ${bar(Math.round(pRos(tc) * 100) / 100)} bar, soit ${bar(c.out)} bar.` },
          { t: `${bar(r1(pRos(P.tmin)))} bar`, ok: false, faute: 'Coupure lue à la température de la chambre', pourquoi: `C’est la pression à ${P.tmin} °C. La coupure se lit à ${tc} °C.` },
          { t: `${bar(r1(c.out + 1))} bar`, ok: false, faute: 'Pression absolue prise pour la pression effective', pourquoi: 'C’est à peu près la pression absolue. Le pressostat se règle en pression effective.' },
          { t: `${bar(r1(pRos(tc + 2)))} bar`, ok: false, faute: 'Mauvaise ligne lue dans la table', pourquoi: `C’est la ligne ${tc + 2} °C. Cherchez la ligne ${tc} °C.` }
        ]), 'c3') },
        { q: 'Différentiel (DIFF) : combien ?', l: qDiffBP('c4') }
      ];
    }
    if (S.cas === 'BPR') {
      const pch = ligne(S.tch)[1];
      return [
        { q: 'Enclenchement (CUT IN) : quelle pression ?', l: qEnclenchementBP('c0') },
        { q: 'Coupure (CUT OUT) : quelle pression ?', l: melangeFixe([
          { t: `${bar(R.COUPURE_BP)} bar`, ok: false, faute: 'Coupure de régulation au niveau de la sécurité', pourquoi: 'C’est la coupure de la BP de sécurité. Si la régulation coupait au même endroit, la sécurité arrêterait le compresseur à chaque cycle.' },
          { t: `${bar(c.out)} bar`, ok: true, pourquoi: `${bar(R.COUPURE_BP)} + ${bar(R.ECART_REGUL)} = ${bar(c.out)} bar : la régulation coupe avant que la sécurité n’ait à le faire.` },
          { t: `${bar(R.ECART_REGUL)} bar`, ok: false, faute: 'Écart pris pour la coupure', pourquoi: `${bar(R.ECART_REGUL)} bar, c’est l’écart. La coupure, c’est ${bar(R.COUPURE_BP)} + ${bar(R.ECART_REGUL)}.` }
        ], 'c1') },
        { q: 'Différentiel (DIFF) : combien ?', l: qDiffBP('c2') },
        { q: `La chambre est à ${S.tch} °C : à saturation, ${bar(pch)} bar. Pourquoi l’enclenchement (${bar(c.in)} bar) doit-il rester en dessous ?`, l: melangeFixe([
          { t: 'Électrovanne rouverte, la pression remonte vers celle de la chambre : elle doit dépasser l’enclenchement pour relancer le compresseur', ok: true, pourquoi: `Au repos, l’évaporateur se met à la température de la chambre. Si l’enclenchement dépassait ${bar(pch)} bar, la pression ne l’atteindrait jamais : le compresseur ne repartirait pas.` },
          { t: 'Pour protéger le compresseur', ok: false, faute: 'Rôle de la BP de régulation mal compris', pourquoi: 'Protéger, c’est la BP de sécurité. Ici, c’est pour que le compresseur puisse repartir.' },
          { t: 'Pour que le compresseur ne s’arrête jamais', ok: false, faute: 'Rôle de l’enclenchement mal compris', pourquoi: 'L’enclenchement règle la relance, pas l’arrêt. S’il était trop haut, le compresseur ne repartirait plus.' }
        ], 'c3') },
        { q: `La coupure à ${bar(c.out)} bar, au ${S.fluide} : quelle température d’évaporation ?`, l: qConversion(c.out, 'ros', 'c4') }
      ];
    }
    if (S.cas === 'HPR') {
      const l = ligneHP(S.tc), voisin = ligneHP(S.tc + 5) || ligneHP(S.tc - 5),
        autre = R449() ? auDemi(l[1]) : auDemi((ligneHP(S.tc - 5) || ligneHP(S.tc + 10))[2]);
      return [
        { q: 'Mise en route du ventilateur : quelle pression ?', l: melangeFixe([
          { t: `${bar(c.in)} bar`, ok: true, pourquoi: `La ligne ${S.tc} °C${R449() ? ', colonne bulle' : ''} : ${bar(l[2])} bar ; au pas de 0,5 bar, ${bar(c.in)} bar.` },
          { t: `${bar(auDemi(voisin[2]))} bar`, ok: false, faute: 'Mauvaise ligne lue dans la table HP', pourquoi: `C’est la ligne ${voisin[0]} °C. Cherchez la ligne ${S.tc} °C.` },
          { t: `${bar(autre)} bar`, ok: false, faute: R449() ? 'Rosée lue au lieu de la bulle côté HP' : 'Mauvaise ligne lue dans la table HP',
            pourquoi: R449() ? 'C’est la colonne rosée. Côté HP, pour le R-449A, on lit la bulle.' : 'Ce n’est pas la ligne de la condensation visée.' }
        ], 'c0') },
        { q: 'Arrêt du ventilateur : quelle pression ?', l: melangeFixe([
          { t: `${bar(c.in + R.DIFF_HPR)} bar`, ok: false, faute: 'Arrêt du ventilateur placé au-dessus de sa mise en route', pourquoi: 'Le ventilateur s’arrête quand la HP redescend : plus bas que sa mise en route.' },
          { t: `${bar(c.out)} bar`, ok: true, pourquoi: `${bar(c.in)} − ${bar(R.DIFF_HPR)} = ${bar(c.out)} bar.` },
          { t: `${bar(R.DIFF_HPR)} bar`, ok: false, faute: 'Différentiel pris pour la pression d’arrêt', pourquoi: `${bar(R.DIFF_HPR)} bar, c’est le différentiel. L’arrêt, c’est ${bar(c.in)} − ${bar(R.DIFF_HPR)}.` }
        ], 'c1') },
        { q: 'Sur la face du KP5, quelle échelle porte la mise en route du ventilateur ?', l: [
          { t: 'L’échelle CUT IN', ok: false, faute: 'Échelle du KP haute pression mal lue', pourquoi: 'Sur un KP haute pression, l’échelle porte le CUT OUT. À la hausse, 1 – 2 s’ouvre et 1 – 4 se ferme : c’est là que le ventilateur démarre.' },
          { t: 'L’échelle CUT OUT', ok: true, pourquoi: 'Sur un KP haute pression, l’échelle porte le CUT OUT : 1 – 4 se ferme à cette pression, le ventilateur démarre. Le nom « CUT OUT » parle du contact 1 – 2, pas du ventilateur.' }
        ] },
        { q: `L’arrêt du ventilateur à ${bar(c.out)} bar, au ${S.fluide} : quelle température de condensation ?`, l: qConversion(c.out, 'bul', 'c3') }
      ];
    }
    if (S.cas === 'CEN') return [
      { q: 'Quand la BP monte, quel étage démarre le premier ?', l: melangeFixe([
        { t: 'PPL1, réglé à 1,6 bar', ok: true, pourquoi: 'Le Range le plus bas : c’est lui que la BP atteint d’abord. Les autres suivent à 1,8, 2 et 2,2 bar si elle monte encore.' },
        { t: 'PPL4, réglé à 2,2 bar', ok: false, faute: 'Ordre des étages inversé', pourquoi: 'PPL4 est le dernier : il faut que la BP monte jusqu’à 2,2 bar.' },
        { t: 'Tous en même temps', ok: false, faute: 'Étagement mal compris', pourquoi: 'Justement non : les réglages sont décalés pour que les étages démarrent un par un.' }
      ], 'c0') },
      { q: `PPL${S.etage} : Range ${bar(c.in)} bar, Diff ${bar(c.diff)} bar. À quelle pression coupe-t-il ?`, l: melangeFixe([
        { t: `${bar(c.out)} bar`, ok: true, pourquoi: `Range − Diff = ${bar(c.in)} − ${bar(c.diff)} = ${bar(c.out)} bar.` },
        { t: `${bar(r1(c.in + c.diff))} bar`, ok: false, faute: 'Coupure placée au-dessus de l’enclenchement', pourquoi: 'En basse pression, l’étage coupe quand la BP DESCEND : sous l’enclenchement.' },
        { t: `${bar(c.in)} bar`, ok: false, faute: 'Différentiel oublié', pourquoi: `${bar(c.in)} bar, c’est l’enclenchement. La coupure est ${bar(c.diff)} bar plus bas.` }
      ], 'c1') },
      { q: 'Pourquoi les quatre réglages sont-ils décalés de 0,2 bar ?', l: melangeFixe([
        { t: 'Pour que les étages démarrent et s’arrêtent un par un, selon la demande de froid', ok: true, pourquoi: 'Chaque étage a sa marche : la puissance suit la BP, donc la demande des évaporateurs.' },
        { t: 'Pour protéger chaque compresseur', ok: false, faute: 'Découpage confondu avec la sécurité', pourquoi: 'La protection, c’est le PSL et les pressostats HP de sécurité. Le découpage règle la puissance.' },
        { t: 'Pour que la BP ne bouge jamais', ok: false, faute: 'Rôle du découpage mal compris', pourquoi: 'La BP bouge toujours un peu : c’est elle qui donne les ordres aux étages.' }
      ], 'c2') }
    ];
    if (S.cas === 'RTZ') return [
      { q: '1 – 4 (« BP trop haute ») se ferme à quelle pression ?', l: melangeFixe([
        { t: `${bar(c.in)} bar`, ok: true, pourquoi: `Range + DIFF = ${bar(S.consigne)} + ${bar(RT.diff)} = ${bar(c.in)} bar.` },
        { t: `${bar(S.consigne)} bar`, ok: false, faute: 'Fermeture de 1 – 4 placée au Range', pourquoi: `À ${bar(S.consigne)} bar, 1 – 4 s’OUVRE, en descendant : c’est le Range. Il se ferme ${bar(RT.diff)} bar plus haut.` },
        { t: `${bar(r1(S.consigne + S.zn))} bar`, ok: false, faute: 'Zone neutre ajoutée au Range', pourquoi: 'La zone neutre se compte vers le bas, pour 1 – 2. Pour 1 – 4 : Range + DIFF.' }
      ], 'c0') },
      { q: '1 – 2 (« BP trop basse ») se ferme à quelle pression ?', l: melangeFixe([
        { t: `${bar(r1(S.consigne - S.zn))} bar`, ok: false, faute: 'Différentiel oublié pour 1 – 2', pourquoi: `On part de la fermeture de 1 – 4 (${bar(c.in)} bar), pas du Range : ${bar(c.in)} − ${bar(S.zn)}.` },
        { t: `${bar(c.out)} bar`, ok: true, pourquoi: `Range + DIFF − zone neutre = ${bar(c.in)} − ${bar(S.zn)} = ${bar(c.out)} bar.` },
        { t: `${bar(c.in)} bar`, ok: false, faute: 'Les deux contacts au même point', pourquoi: 'Ce serait une zone neutre nulle : les deux ordres se contrediraient sans cesse.' }
      ], 'c1') },
      { q: `Entre ${bar(c.out)} et ${bar(c.in)} bar, que se passe-t-il ?`, l: melangeFixe([
        { t: 'Aucun contact n’est fermé : rien ne bouge, c’est la zone neutre', ok: true, pourquoi: 'C’est tout l’intérêt : tant que la BP reste dans la zone, le pressostat ne donne aucun ordre.' },
        { t: 'Les deux contacts sont fermés', ok: false, faute: 'Zone neutre mal comprise', pourquoi: 'Ils ne sont jamais fermés en même temps : « trop haute » et « trop basse » s’excluent.' },
        { t: 'Le compresseur s’arrête en sécurité', ok: false, faute: 'Zone neutre prise pour une sécurité', pourquoi: 'Le RT à zone neutre commande, il ne protège pas.' }
      ], 'c2') }
    ];
    const P = S.plaque, L = S.limite;
    return [
      { q: 'Jusqu’où réglez-vous la coupure (CUT OUT) ?', l: S.soupape ? [
        { t: `${bar(L)} bar`, ok: true, pourquoi: `0,9 × ${bar(P.psHP)} = ${bar(Math.round(0.9 * P.psHP * 100) / 100)} bar ; sur le pas de l’échelle, ${bar(L)} bar. Le pressostat coupe avant la soupape.` },
        { t: `${bar(P.psHP)} bar`, ok: false, grave: true, faute: 'Coupure HP à la PS alors qu’une soupape est montée', pourquoi: 'Avec une soupape tarée à la PS, elle s’ouvrirait en même temps que le pressostat coupe. Avec soupape : 0,9 × son tarage au plus.' },
        { t: `${bar(P.psBP)} bar`, ok: false, faute: 'PS côté BP prise pour la HP', pourquoi: 'C’est la PS côté BP. Le pressostat HP se règle d’après le côté HP.' }
      ] : [
        { t: `${bar(r1(P.psHP * 1.1))} bar`, ok: false, grave: true, faute: 'Coupure HP au-dessus de la PS', pourquoi: 'Jamais au-dessus de la PS : c’est la pression que l’installation est faite pour tenir.' },
        { t: `${bar(P.psBP)} bar`, ok: false, faute: 'PS côté BP prise pour la HP', pourquoi: 'C’est la PS côté BP. Le pressostat HP se règle d’après le côté HP.' },
        { t: `${bar(L)} bar`, ok: true, pourquoi: `Sans soupape, la coupure ne dépasse pas la PS : ${bar(L)} bar au plus.` }
      ] },
      { q: 'Le KP5 manuel a un différentiel fixe. Après une coupure, quand pourra-t-on réarmer ?', l: [
        { t: 'Il se réarme seul quand la pression redescend', ok: false, faute: 'KP5 manuel cru à réarmement automatique', pourquoi: 'Un KP5 à réarmement manuel ne repart pas seul : quelqu’un doit venir voir pourquoi la HP est montée.' },
        { t: `Sous ${bar(L - K5.diff)} bar, en appuyant sur Reset`, ok: true, pourquoi: `Différentiel fixe de ${bar(K5.diff)} bar : le bouton ne s’enclenche que sous ${bar(L)} − ${bar(K5.diff)} = ${bar(L - K5.diff)} bar.` },
        { t: `Dès que la pression repasse sous ${bar(L)} bar`, ok: false, faute: 'Différentiel du KP5 oublié', pourquoi: `Il faut redescendre de tout le différentiel, ${bar(K5.diff)} bar, sous la coupure.` }
      ] }
    ];
  }
  const titrePrereglage = () => S.manuel ? `Préréglez la coupure : ${bar(S.cibleFace.ech)} bar`
    : `Préréglez : ${S.app.ech.nom} ${bar(S.cibleFace.ech)} bar${S.cas === 'HPR' ? ' (mise en route)' : ''}, ${S.app.dif.nom} ${bar(S.cibleFace.diff)} bar`;

  const vueTravail = () => S.cas === 'PRS' ? ScenePressostat.vueChambre(S) : ScenePressostat.vueAtelier(S);
  const finale = () => S.cas === 'PRS' ? R.Q_FIN_PRS : R.Q_RANGER;
  const enC = p => S.cas === 'PRS' ? ` (${Math.round(tRos(p))} °C)` : '';
  const choixCas = actuel => `<div class="choix">${Object.keys(CAS).map(k => btn(`<b>${k === actuel ? 'Rejouer : ' : ''}${CAS[k].titre}</b>${CAS[k].sous}`, 'niveau', CAS[k].niveau, k === actuel ? '' : 'btn-plein')).join('')}</div>`;

  const ETAPES = [
    { id: 'accueil', temps: 0, petit: 'ManiRézo · les jeux de poste', titre: 'Le réglage des pressostats',
      zoom: () => ScenePressostat.vueFace(S),
      ui: () => `<p class="intro">Vous calculez le réglage, vous le préréglez sur le pressostat, puis vous le prouvez au banc d’azote, au manomètre, trois fois de suite. Chaque erreur est expliquée sur le moment.</p>${choixCas()}` },

    /* TEMPS 1 — Le rôle */
    { id: 'role', temps: 1, petit: () => S.hp ? 'Côté refoulement' : 'Côté aspiration', titre: () => R.Q_ROLE[S.cas].question,
      zoom: () => ScenePressostat.vueFace(S),
      ui: () => `${choix(R.Q_ROLE[S.cas].choix)}${S.q.bonc != null ? suite() : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_ROLE[S.cas].choix, 'c', +v.split(':')[1]) },
    { id: 'contact', temps: 1, petit: 'Le testeur s’allume quand le contact est fermé', titre: () => S.deux ? 'Comment branchez-vous les testeurs ?' : 'Sur quel contact branchez-vous le testeur ?',
      zoom: () => ScenePressostat.vueContact(S),
      ui: () => `<p class="question">On veut voir ${C().objet}.</p>${choix(R.Q_CONTACT[S.cas] || R.Q_CONTACT.BP)}${S.q.bonc != null ? suite() : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_CONTACT[S.cas] || R.Q_CONTACT.BP, 'c', +v.split(':')[1]) },

    /* TEMPS 2 — Je calcule */
    { id: 'calcul', temps: 2, petit: () => S.cas === 'HP' ? 'Lisez la plaque et la fiche' : S.cas === 'CEN' || S.cas === 'RTZ' ? 'Lisez la fiche' : 'Lisez la fiche et la table du fluide',
      titre: () => C().calc,
      entrer: () => { S.ordres = {}; },
      zoom: fiche,
      ui() {
        const Q = questions(), k = Q.findIndex((_, i) => S.q['bonc' + i] == null);
        if (k < 0) return suite('Régler le pressostat');
        return `<p class="question">${Q[k].q}</p>${choix(Q[k].l, 'c' + k)}`;
      },
      act(a, v) { if (a !== 'choix') return; const [c, i] = v.split(':'); repondre(questions()[+c.slice(1)].l, c, +i); } },

    /* TEMPS 3 — Je règle. Méthode visuelle de Franck (banc d'azote, KP et pressostats de découpage) : échelle et
       différentiel au maximum ; azote à l'enclenchement voulu, on BAISSE la vis de l'échelle jusqu'au clac ; azote à la
       coupure voulue, on DIMINUE le différentiel jusqu'au clac. La chambre (PRS) et le RT à zone neutre gardent le
       préréglage aux repères (préréglage, preuve, correction). */
    { id: 'depart', temps: 3, saute: () => !visuel(), petit: 'Avant tout : le pressostat ne doit pas pouvoir basculer trop tôt',
      titre: () => S.manuel ? 'Mettez la vis de l’échelle au maximum' : 'Mettez l’échelle et le différentiel au maximum',
      zoom: () => ScenePressostat.vueFace(S),
      ui: () => S.q.ok ? suite('Régler au manomètre') : `${cmdVis()}<div class="ligne-suite">${btn('C’est au maximum', 'valider', '', 'btn-plein')}</div>`,
      act(a, v) {
        if (a === 'vis') return tourner(v);
        if (a !== 'valider') return;
        const A = S.app, bon = Math.abs(S.face.ech - A.ech.max) < EPS && (!A.dif || Math.abs(S.face.diff - A.dif.max) < EPS);
        if (bon) { S.q.ok = true; return dire('<p><b>Au maximum.</b> Le pressostat ne basculera qu’au moment où vous le déciderez, à la vis.</p>', 'ok'); }
        faute('depart', 'Préréglage de départ pas au maximum');
        dire(`<p><b>Pas encore.</b> ${S.manuel ? 'La vis de l’échelle' : 'L’échelle et le différentiel'} doivent être au bout de leur course, au maximum.</p>`, 'bad');
      } },
    { id: 'haut', temps: 3, saute: () => !visuel(),
      petit: () => `Amenez l’azote à ${bar(cibleHaut())} bar, puis baissez la vis de l’échelle jusqu’au clac`,
      titre: () => `${({ BP: 'Réglez l’enclenchement (CUT IN)', BPR: 'Réglez l’enclenchement (CUT IN)', CEN: 'Réglez l’enclenchement de l’étage', HPR: 'Réglez la mise en route du ventilateur', HP: 'Réglez la coupure (CUT OUT)' })[S.cas]} : ${bar(cibleHaut())} bar`,
      zoom: () => vueTravail(),
      ui: () => S.attente ? lecture() : S.q.ok ? suite(S.manuel ? 'Comparer à l’échelle' : 'Régler la coupure') : `${cmdPression()}${cmdVis('ech')}`,
      act },
    { id: 'bas', temps: 3, saute: () => !visuel() || S.manuel,
      petit: () => `Descendez l’azote à ${bar(S.cible.out)} bar (le testeur reste allumé), puis diminuez le différentiel jusqu’au clac`,
      titre: () => `${({ BP: 'Réglez la coupure (CUT OUT)', BPR: 'Réglez la coupure (CUT OUT)', CEN: 'Réglez la coupure de l’étage', HPR: 'Réglez l’arrêt du ventilateur' })[S.cas]} : ${bar(S.cible.out)} bar`,
      zoom: () => vueTravail(),
      ui: () => S.attente ? lecture() : S.q.ok ? suite('Comparer à l’échelle') : `${cmdPression()}${cmdVis('diff')}`,
      act },
    { id: 'preregler', temps: 3, saute: () => visuel(), petit: () => S.cas === 'PRS' ? 'L’installation est à l’arrêt : on règle d’abord la face' : 'Le banc est à zéro : on règle d’abord la face', titre: titrePrereglage,
      zoom: () => ScenePressostat.vueFace(S),
      ui: () => S.q.ok ? suite('Prouver au manomètre') : `${cmdVis()}<div class="ligne-suite">${btn('Le préréglage est fait', 'valider', '', 'btn-plein')}</div>`,
      act(a, v) {
        if (a === 'vis') return tourner(v);
        if (a !== 'valider') return;
        const F = S.cibleFace, bon = Math.abs(S.face.ech - F.ech) < EPS && (F.diff == null || S.manuel || Math.abs(S.face.diff - F.diff) < EPS);
        if (bon) { S.q.ok = true; return dire('<p><b>Préréglé.</b> L’échelle indique les valeurs calculées. Reste à prouver que le pressostat bascule vraiment là : seul le manomètre le dit.</p>', 'ok'); }
        faute('prereglage', 'Préréglage de la face différent du calcul');
        dire(`<p><b>Pas encore.</b> Lisez les repères dans la vue de près. Il faut : ${titrePrereglage().replace(/^Préréglez( la coupure)? : /, '')}.</p>`, 'bad');
      } },

    /* TEMPS 4 — Je compare : l'échelle n'est qu'un repère */
    { id: 'echelle', temps: 4, saute: () => !visuel(), petit: 'Le pressostat est réglé au manomètre. Et son échelle ?', titre: 'Que croire : l’échelle ou le manomètre ?',
      zoom() {
        const [li, lo] = C().lib, repBas = Math.round((S.face.ech - S.face.diff) * 100) / 100;
        return texte(`<table class="table-fluide"><tr><th></th><th>repère de l’échelle</th><th>basculement au manomètre</th></tr>
          <tr><td>${api.maj(S.manuel ? 'coupure' : li)}</td><td>${bar(S.face.ech)} bar</td><td>${bar(haut())} bar</td></tr>
          ${S.manuel ? '' : `<tr><td>${api.maj(lo)}</td><td>${bar(repBas)} bar</td><td>${bar(bas())} bar</td></tr>`}</table>
          <p>Le repère gravé et la pression réelle ne tombent pas pile : chaque pressostat a son petit écart.</p>`);
      },
      ui: () => `${choix(R.Q_ECHELLE)}${S.q.bonc != null ? suite('Prouver : trois cycles') : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_ECHELLE, 'c', +v.split(':')[1]) },
    { id: 'mesure', temps: 4, saute: () => visuel(), petit: () => S.cas === 'PRS' ? 'Mettez l’installation en route : à chaque clac, lisez la température sur le manomètre' : S.manuel ? 'Montez jusqu’à la coupure, redescendez de 3 bar, réarmez' : 'Montez doucement jusqu’au clac, puis redescendez jusqu’au clac',
      titre: () => S.cas === 'PRS' ? 'Prouvez le réglage sur la chambre' : 'Prouvez le réglage au manomètre',
      entrer: () => { S.cycles = []; S.enCours = {}; },
      zoom: () => vueTravail(),
      ui: () => S.cycles.length && !S.attente ? `${cahier()}${suite('Comparer au calcul')}` : atelier(false),
      act },
    { id: 'ecart', temps: 4, saute: () => visuel(), petit: 'L’échelle disait une chose, le manomètre une autre', titre: 'Le pressostat tombe-t-il juste ?',
      zoom() {
        const c = S.cycles[0], [li, lo] = C().lib;
        return texte(`<table class="table-fluide"><tr><th></th><th>visé</th><th>mesuré</th></tr>
          ${S.manuel ? '' : `<tr><td>${api.maj(li)}</td><td>${bar(S.cible.in)} bar${enC(S.cible.in)}</td><td>${bar(c.in)} bar${enC(c.in)}</td></tr>`}
          <tr><td>${api.maj(lo)}</td><td>${S.manuel ? `≤ ${bar(S.limite)}` : bar(S.cible.out)} bar${enC(S.cible.out)}</td><td>${bar(c.out)} bar${enC(c.out)}</td></tr></table>
          <p>L’échelle est un repère : chaque pressostat a un petit écart. C’est pour ça qu’on mesure.</p>`);
      },
      ui: () => `${choix(R.Q_ECART)}${S.q.bonc != null ? suite('Affiner') : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_ECART, 'c', +v.split(':')[1]) },

    /* TEMPS 5 — Je prouve : trois cycles justes de suite */
    { id: 'affiner', temps: 5,
      petit: () => !visuel() ? C().affiner : S.manuel ? 'Redescendez de 3 bar, réarmez, remontez jusqu’à la coupure : trois fois' : 'Montez jusqu’au clac, descendez jusqu’au clac : trois fois. Une petite retouche à la vis si besoin',
      titre: () => visuel() ? 'Prouvez : trois cycles justes de suite' : 'Affinez jusqu’à trois cycles justes de suite',
      entrer: () => { S.cycles = []; S.enCours = {}; },
      zoom: () => vueTravail(),
      ui: () => S.q.fini ? `${cahier()}${suite('Ranger le banc')}` : atelier(true),
      act },

    /* TEMPS 6 — Je range */
    { id: 'ranger', temps: 6, petit: 'Le réglage est prouvé', titre: () => S.cas === 'PRS' ? 'Et cette régulation, que vaut-elle ?' : 'Et maintenant ?',
      zoom: () => vueTravail(),
      ui: () => `${choix(finale())}${S.q.bonc != null ? `<div class="ligne-suite">${btn('Voir le bilan →', 'bilan', '', 'btn-plein')}</div>` : ''}`,
      act(a, v) {
        if (a === 'choix') repondre(finale(), 'c', +v.split(':')[1], () => { if (S.cas !== 'PRS') { S.p = 0; majContact(true); } else S.marche = false; });
        if (a === 'bilan') terminer();
      } },
    { id: 'bilan', temps: 7, petit: 'Bilan', titre: () => S.fautes.length ? 'Pressostat réglé' : 'Pressostat réglé, sans faute',
      zoom: () => ScenePressostat.vueFace(S),
      ui: () => `${cahier()}${choixCas(S.cas)}` }
  ];

  window.__presso = { physique }; // pour la vérification automatique (faire passer le temps de la chambre)
  return {
    neuf, etapes: ETAPES, code: 'PRESSO', jauges: ScenePressostat.JAUGES, invite: 'Choisissez le pressostat à régler.',
    sansFaute: 'Le réglage a été calculé, prérèglé, puis prouvé au manomètre trois fois de suite.',
    revoir: () => null,
    scene: () => S.cas === 'PRS' ? ScenePressostat.posteChambre(S) : ScenePressostat.poste(S),
    physique,
    repere: c => ({ 'vis-ech': 'l-ech', 'vis-diff': 'l-diff', purge: 'l-purge', reset: 'l-reset', bouteille: 'l-det' })[c]
  };
});
