/* Le jeu de l'azote — les RÈGLES et le déroulé (5 temps). Demande de Franck (06/10/2026) : « je connecte le mano à
   l'azote, je lis la pression primaire, je règle le détendeur à la pression secondaire en fonction de la pression de
   sécurité de l'installation… quand j'ai terminé je ferme, je détends le détendeur et je dégage ». Pression : jamais
   au-dessus de la PS la plus basse lue sur la plaque. Ordre de fin : bouteille fermée, circuit et flexibles vidés à
   l'air libre (la vis encore réglée, sinon l'azote reste enfermé côté bouteille), vis desserrée, détendeur et
   manifold démontés (poste mobile). Données : regles-azote.js. Dessins : scene-azote.js. Moteur : moteur.js. */
Moteur.lancer(api => {
  'use strict';
  const { dire, faute, btn, suite, texte, choix, repondre, terminer, afficher, dessiner, E, borne, bar, melanger } = api;
  const R = window.REGLES_AZOTE;
  const PAS = 0.5, VIS_MAX = 60;  // vis du détendeur : un appui = 0,5 bar ; cadran de sortie gradué jusqu'à 60 bar

  let S;
  function neuf() {
    S = {
      ordre: melanger(['O', 'A', 'N']), k: 0, monte: false, ouverte: false, vis: 0, p: { hp: 0, bp: 0 },
      HP0: [130, 150, 170, 190][Math.floor(Math.random() * 4)],
      plaque: R.PLAQUES[Math.floor(Math.random() * R.PLAQUES.length)],
      flexible: false, manifold: true, raccorde: true, vannes: false, circuit: 0, purge: false, vidange: false,
      fuite: Math.random() < .5, bulles: false, surveille: 0, anim: { pfff: null }
    };
    return S;
  }
  const psMin = () => Math.min(S.plaque.psHP, S.plaque.psBP);

  /* pressions : bouteille ouverte → cadran bouteille ; la vis règle le cadran de sortie ; vannes du manifold
     ouvertes → le circuit se remplit ; à la vidange, tout se vide — sauf la HP si la vis est déjà desserrée */
  function physique() {
    const p = S.p; let { hp, bp } = p, c = S.circuit;
    if (S.ouverte) hp += (S.HP0 - hp) * .3;
    const passe = S.vis > 0 && hp > 0;
    if (S.vidange) {
      c *= .82;
      if (passe) { hp *= .85; bp = Math.min(bp * .85, hp); } else bp *= .8;
    } else {
      if (passe) bp += (Math.min(S.vis, hp) - bp) * .4;
      if (S.flexible && S.vannes) c += (bp - c) * .25;
      else if (S.surveille && S.fuite) c = Math.max(0, c - .08);
    }
    if (hp < .05) hp = 0; if (bp < .05) bp = 0; if (c < .05) c = 0;
    const change = Math.abs(hp - p.hp) > .05 || Math.abs(bp - p.bp) > .02 || Math.abs(c - S.circuit) > .02;
    p.hp = hp; p.bp = bp; S.circuit = c;
    return change;
  }
  const pfff = (x, y) => { S.anim.pfff = [x, y]; Son.pfff(); setTimeout(() => { S.anim.pfff = null; dessiner(); }, 700); };
  const vis = quoi => `<div class="robinet"><div><span class="nom">Vis du détendeur</span><span class="pos">${quoi || ''}</span></div>
      ${btn('<b>↻</b>serrer', 'vis', '1', 'tourner', true)}${btn('<b>↺</b>desserrer', 'vis', '-1', 'tourner', true)}</div>`;
  /* les trois lectures proposées du cadran bouteille : une seule est la bonne */
  const lectures = () => S.q.valeurs.map(v => ({ t: v + ' bar', ok: v === S.HP0, faute: 'Pression de la bouteille mal lue',
    pourquoi: v === S.HP0 ? 'C’est la pression primaire : ce qu’il reste dans la bouteille.' : 'Relisez le cadran bouteille : l’aiguille et les chiffres les plus proches.' }));
  function tournerVis(v) { S.vis = borne(Math.round((S.vis + PAS * +v) / PAS) * PAS, 0, VIS_MAX); }

  const ETAPES = [
    { id: 'accueil', temps: 0, petit: 'CuivRézo · l’azote au froid', titre: 'Le jeu de l’azote',
      zoom: () => SceneAzote.vueDetendeur({ p: { hp: 170, bp: 0 } }),
      ui: () => `<p class="intro">Pourquoi de l’azote dans un circuit frigorifique ? Puis vous montez le mano-détendeur, vous réglez la pression d’après la plaque de l’installation, vous faites l’épreuve, et vous rangez le poste. Chaque erreur est expliquée sur le moment.</p>
        <div class="choix">${btn('<b>Commencer</b>la bouteille vous attend', 'niveau', '1', 'btn-plein')}</div>` },

    /* TEMPS 1 — Pourquoi l'azote */
    { id: 'pourquoi', temps: 1, petit: 'Trois usages, un seul gaz', titre: 'Pourquoi de l’azote ?',
      zoom: () => texte(`<ul class="liste">${R.USAGES.map(u => `<li>${u}</li>`).join('')}</ul>`),
      ui: () => S.q.bonc1 == null ? `<p class="question">${R.Q_BALAYAGE.question}</p>${choix(R.Q_BALAYAGE.choix, 'c1')}`
        : `<p class="question">${R.Q_GAZ.question}</p>${choix(R.Q_GAZ.choix, 'c2')}${S.q.bonc2 != null ? suite() : ''}`,
      act(a, v) { if (a !== 'choix') return; const [c, i] = v.split(':'); repondre(c === 'c1' ? R.Q_BALAYAGE.choix : R.Q_GAZ.choix, c, +i); } },
    { id: 'bouteille', temps: 1, petit: 'Les étiquettes sont illisibles : regardez l’ogive', titre: 'Touchez la bouteille d’azote',
      zoom: () => SceneAzote.vueBouteilles(S),
      ui: () => S.q.ok ? suite() : '<p class="aide">L’ogive, c’est le haut de la bouteille.</p>',
      cible(c) {
        if (S.q.ok || !/^b-/.test(c)) return;
        if (c === 'b-N') { S.q.ok = true; return dire('<p><b>Oui.</b> Ogive noire : l’azote. Blanche : l’oxygène ; marron : l’acétylène.</p>', 'ok'); }
        faute('bouteille', 'Bouteille d’azote mal reconnue');
        dire(`<p><b>Non.</b> Ogive ${c === 'b-O' ? 'blanche : c’est l’oxygène, jamais pour mettre un circuit en pression' : 'marron : c’est l’acétylène'}. L’azote a l’ogive noire.</p>`, 'bad');
      } },

    /* TEMPS 2 — Le mano-détendeur */
    { id: 'direct', temps: 2, petit: 'Avant de monter quoi que ce soit', titre: 'Peut-on brancher la bouteille directement sur le circuit ?',
      zoom: () => Scene.cadre([30, 60, 420, 320]),
      ui: () => `${choix(R.Q_DIRECT)}${S.q.bonc != null ? suite('Monter le mano-détendeur') : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_DIRECT, 'c', +v.split(':')[1]) },
    { id: 'vis', temps: 2, petit: 'Le mano-détendeur est monté, la bouteille encore fermée', titre: 'Mettez la vis dans la bonne position',
      entrer: () => { S.monte = true; S.vis = [0, 12, 30][Math.floor(Math.random() * 3)]; },
      zoom: () => Scene.cadre([140, 20, 180, 150]),
      ui: () => S.q.ok ? suite() : `${vis()}<div class="ligne-suite">${btn('La vis est en position, j’ouvre la bouteille', 'valider', '', 'btn-plein')}</div>`,
      act(a, v) {
        if (a === 'vis') return tournerVis(v);
        if (a !== 'valider') return;
        if (S.vis === 0) { S.q.ok = true; return dire('<p><b>Vis desserrée.</b> Aucune pression ne partira en sortie à l’ouverture de la bouteille. On lira la bouteille, puis on vissera peu à peu.</p>', 'ok'); }
        faute('vis', 'Vis du détendeur pas desserrée avant d’ouvrir la bouteille');
        dire('<p><b>Non.</b> La vis est encore serrée : à l’ouverture, un à-coup de pression partirait vers le circuit. Desserrez-la à fond, sens inverse des aiguilles d’une montre.</p>', 'bad');
      } },
    { id: 'ouvrir', temps: 2, petit: 'À la main, sur le côté, l’œil sur le cadran bouteille', titre: 'Ouvrez la bouteille d’azote',
      zoom: () => SceneAzote.vueDetendeur(S),
      ui: () => S.q.bonc == null ? choix(R.Q_OUVRIR) : S.p.hp > S.HP0 - 2 ? suite('Lire la bouteille') : '<p class="aide">La pression monte…</p>',
      act: (a, v) => a === 'choix' && repondre(R.Q_OUVRIR, 'c', +v.split(':')[1], () => { S.ouverte = true; }),
      tic() { if (S.q.bonc != null && !S.q.pret && S.p.hp > S.HP0 - 2) { S.q.pret = true; afficher(true); } } },
    { id: 'lire', temps: 2, petit: 'Lisez le cadran bouteille', titre: 'Combien reste-t-il dans la bouteille ?',
      entrer: () => { S.q.valeurs = melanger([S.HP0, S.HP0 - 50, Math.min(300, S.HP0 + 60)]); },
      zoom: () => SceneAzote.vueDetendeur(S),
      ui: () => `${choix(lectures())}${S.q.bonc != null ? suite() : ''}`,
      act(a, v) { if (a === 'choix') repondre(lectures(), 'c', +v.split(':')[1]); } },

    /* TEMPS 3 — Régler sur la PS */
    { id: 'plaque', temps: 3, petit: 'Touchez la plaque signalétique du groupe', titre: 'Jusqu’où pouvez-vous monter ?',
      zoom: () => S.q.vue ? SceneAzote.vuePlaque(S.plaque) : Scene.cadre([840, 320, 340, 300]),
      ui() {
        if (!S.q.vue) return '<p class="aide">La plaque est sur le groupe de condensation, à droite.</p>';
        const P = S.plaque, l = this.liste();
        return `<p class="question">Tout le circuit va être mis sous azote. Jusqu’à quelle pression ?</p>${choix(l)}${S.q.bonc != null ? suite() : ''}`;
      },
      liste() {
        const P = S.plaque, haute = Math.max(P.psHP, P.psBP), basse = psMin();
        return [
          { t: `${bar(haute)} bar, la PS la plus haute`, ok: false, faute: 'Pression d’épreuve au-dessus de la PS la plus basse', pourquoi: `Le côté le plus faible du circuit n’est fait que pour ${bar(basse)} bar. On ne dépasse jamais la PS la plus basse.` },
          { t: `${bar(basse)} bar, la PS la plus basse`, ok: true, pourquoi: `Tout le circuit est sous azote : c’est son côté le plus faible qui fixe le plafond, ${bar(basse)} bar.` },
          { t: `${S.HP0} bar, la pression de la bouteille`, ok: false, grave: true, faute: 'Pression de la bouteille envoyée dans le circuit', pourquoi: 'Jamais : de quoi faire éclater le circuit. La pression envoyée se règle au détendeur, sous la PS.' }
        ];
      },
      cible(c) { if (c === 'plaque' || c === 'groupe') S.q.vue = true; },
      act(a, v) { if (a === 'choix') repondre(this.liste(), 'c', +v.split(':')[1]); } },
    { id: 'regler', temps: 3, petit: 'Vannes du manifold fermées : on règle d’abord la sortie du détendeur', titre: () => `Réglez la sortie à la PS la plus basse : ${bar(psMin())} bar, sans la dépasser`,
      zoom: () => SceneAzote.vueDetendeur(S),
      ui: () => S.q.ok ? suite() : `${vis('lisez le cadran de sortie')}<div class="ligne-suite">${btn('C’est réglé', 'valider', '', 'btn-plein')}</div>`,
      act(a, v) {
        const ps = psMin();
        if (a === 'vis') {
          tournerVis(v);
          if (S.vis > ps + 1e-9 && faute('au-dessus-ps', 'Détendeur réglé au-dessus de la PS la plus basse', true))
            dire(`<p><b>Danger : au-dessus de ${bar(ps)} bar.</b> Le côté le plus faible du circuit n’est pas fait pour ça : il peut éclater. Redescendez.</p>`, 'bad');
          return;
        }
        if (a !== 'valider') return;
        if (S.vis <= ps + 1e-9 && S.vis >= ps - 1) { S.q.ok = true; return dire(`<p><b>Réglé.</b> Le cadran de sortie indique ${bar(S.vis)} bar : sous la PS la plus basse, ${bar(ps)} bar.</p>`, 'ok'); }
        faute('reglage', 'Pression de sortie mal réglée');
        dire(`<p>Le cadran de sortie indique ${bar(S.vis)} bar ; il faut ${bar(ps)} bar, sans les dépasser. ${S.vis < ps ? 'Serrez' : 'Desserrez'} un peu la vis.</p>`, 'bad');
      } },

    /* TEMPS 4 — L'épreuve */
    { id: 'flexible', temps: 4, petit: 'Le flexible jaune va du détendeur au manifold', titre: 'Raccordez le flexible',
      zoom: () => Scene.cadre([150, 120, 520, 330]),
      ui: () => S.flexible ? suite() : `<div class="choix">${btn('Purger le flexible : un bref jet d’azote', 'purger')}${btn('Raccorder le flexible au manifold', 'raccorder')}</div>`,
      act(a) {
        if (a === 'purger') { S.purge = true; pfff(215, 300); return dire('<p><b>Pfff…</b> L’air du flexible est chassé. Sinon, vous l’enverriez dans le circuit.</p>', 'ok'); }
        if (a !== 'raccorder') return;
        if (!S.purge) { faute('purge-flexible', 'Flexible raccordé sans être purgé'); return dire('<p><b>Non.</b> D’abord, purgez le flexible : l’air qu’il contient partirait dans le circuit.</p>', 'bad'); }
        S.flexible = true; dire('<p><b>Flexible raccordé</b> au centre du manifold. Les vannes sont encore fermées.</p>', 'ok');
      } },
    { id: 'position', temps: 4, petit: 'Avant d’ouvrir les vannes du manifold', titre: 'Où êtes-vous pendant la montée en pression ?',
      zoom: () => Scene.cadre([440, 180, 760, 420]),
      ui: () => `${choix(R.Q_POSITION)}${S.q.bonc != null ? suite() : ''}`,
      act: (a, v) => a === 'choix' && repondre(R.Q_POSITION, 'c', +v.split(':')[1]) },
    { id: 'monter', temps: 4, petit: 'Touchez les vannes du manifold, ou le bouton', titre: 'Mettez le circuit en pression',
      zoom: () => SceneAzote.vueManifold(S),
      ui: () => S.q.ok ? suite('Surveiller') : S.vannes ? '<p class="aide">Le circuit se remplit…</p>' : `<div class="ligne-suite">${btn('Ouvrir les vannes du manifold', 'ouvrir', '', 'btn-plein')}</div>`,
      cible(c) { if (c === 'vanne-bp' || c === 'vanne-hp') this.act('ouvrir'); },
      act(a) { if (a === 'ouvrir' && !S.vannes) { S.vannes = true; dire('<p>L’azote entre dans le circuit : les deux manomètres du manifold montent jusqu’à la pression réglée.</p>'); } },
      tic() { if (S.vannes && !S.q.ok && S.circuit > S.vis - .3) { S.q.ok = true; dire(`<p><b>Le circuit est à ${bar(S.vis)} bar.</b> On l’isole et on surveille.</p>`, 'ok'); afficher(true); } } },
    { id: 'surveiller', temps: 4, petit: 'Vannes du manifold fermées : la pression doit tenir', titre: 'La pression tient-elle ?',
      entrer: () => { S.vannes = false; S.surveille = Date.now(); },
      zoom: () => SceneAzote.vueManifold(S),
      ui() {
        if (Date.now() - S.surveille < 3500) return '<p class="aide">Vous surveillez le manifold…</p>';
        if (!S.fuite) return suite('Vider et ranger');
        if (S.q.bonc == null) return `<p class="question">La pression baisse. Que faites-vous ?</p>${choix(R.Q_FUITE)}`;
        return S.q.repare ? suite('Vider et ranger') : `<div class="ligne-suite">${btn('Je préviens le professeur', 'reparer', '', 'btn-plein')}</div>`;
      },
      act(a, v) {
        if (a === 'choix') return repondre(R.Q_FUITE, 'c', +v.split(':')[1], () => { S.bulles = true; dire('<p><b>Des bulles</b> à la vanne de service côté BP : la fuite est là.</p>', 'ok'); });
        if (a === 'reparer') {
          S.q.repare = true; S.fuite = false; S.bulles = false; S.circuit = S.vis;
          dire('<p>On ne serre jamais un raccord sous pression : le professeur fait vider le circuit, resserre le raccord, et l’épreuve est refaite. Cette fois, la pression tient.</p>', 'ok');
        }
      },
      tic() {
        if (S.q.affiche) return;
        if (Date.now() - S.surveille >= 3500) {
          S.q.affiche = true;
          if (!S.fuite) dire(`<p><b>La pression tient</b> à ${bar(S.circuit)} bar : le circuit ne fuit pas.</p>`, 'ok');
          afficher(true);
        }
      } },

    /* TEMPS 5 — Vider et ranger */
    { id: 'fermer', temps: 5, petit: 'L’épreuve est finie', titre: 'Fermez la bouteille d’azote',
      zoom: () => SceneAzote.vueDetendeur(S),
      ui: () => S.ouverte ? `<div class="ligne-suite">${btn('Fermer la bouteille', 'fermer', '', 'btn-plein')}</div>` : suite(),
      cible(c) { if (c === 'robinet' || c === 'bouteille') this.act('fermer'); },
      act(a) { if (a === 'fermer' && S.ouverte) { S.ouverte = false; dire('<p><b>Bouteille fermée.</b> Les cadrans indiquent encore une pression : il reste de l’azote dans le détendeur, le flexible et le circuit.</p>', 'ok'); } } },
    { id: 'vider', temps: 5, petit: 'L’azote du circuit et des flexibles s’évacue à l’air libre', titre: 'Videz le poste jusqu’à zéro',
      zoom: () => SceneAzote.vueDetendeur(S),
      ui() {
        if (S.q.ok) return suite();
        return `<div class="choix">${S.vis > 0 ? btn('Desserrer d’abord la vis du détendeur', 'desserrer') : btn('Resserrer un peu la vis pour laisser passer', 'resserrer')}
          ${btn(S.vidange ? 'Le poste se vide…' : 'Ouvrir les vannes et vider à l’air libre', 'vider', '', S.vidange ? '' : 'btn-plein')}</div>`;
      },
      act(a) {
        if (a === 'desserrer') { S.vis = 0; faute('ordre-vidange', 'Vis desserrée avant d’avoir vidé le poste'); return dire('<p><b>Trop tôt.</b> Vis desserrée, le détendeur est fermé : l’azote reste enfermé côté bouteille, le cadran bouteille ne descend pas. On vide d’abord, vis encore réglée ; on desserre à la fin.</p>', 'bad'); }
        if (a === 'resserrer') { S.vis = PAS * 4; return dire('<p>Vis un peu resserrée : le détendeur laisse passer, il peut se vider.</p>'); }
        if (a === 'vider' && !S.vidange) { S.vidange = true; S.vannes = true; pfff(600, 470); dire('<p>Vannes ouvertes, l’azote s’échappe à l’air libre…</p>'); }
      },
      tic() {
        if (!S.q.ok && S.vidange && S.circuit === 0 && S.p.bp === 0 && S.p.hp === 0) {
          S.q.ok = true; S.vidange = false; S.vannes = false;
          dire('<p><b>Tous les cadrans sont à zéro.</b> Le poste est vide.</p>', 'ok'); afficher(true);
        }
      } },
    { id: 'detendre', temps: 5, petit: 'On ne laisse jamais un détendeur réglé', titre: 'Détendez le détendeur',
      zoom: () => Scene.cadre([140, 20, 180, 150]),
      ui: () => S.vis === 0 ? suite() : vis(),
      act(a, v) { if (a === 'vis') { tournerVis(v); if (S.vis === 0) { dire('<p><b>Vis desserrée à fond.</b> À la prochaine ouverture, rien ne partira d’un coup.</p>', 'ok'); afficher(true); } } } },
    { id: 'deposer', temps: 5, petit: 'Poste mobile : il repart avec vous', titre: 'Et le détendeur, et le manifold ?',
      zoom: () => Scene.cadre([30, 20, 760, 420]),
      ui: () => `${choix(R.Q_DEPOSER)}${S.q.bonc != null ? `<div class="ligne-suite">${btn('Voir le bilan →', 'bilan', '', 'btn-plein')}</div>` : ''}`,
      act(a, v) {
        if (a === 'choix') repondre(R.Q_DEPOSER, 'c', +v.split(':')[1], () => { S.monte = S.flexible = S.manifold = false; });
        if (a === 'bilan') terminer();
      } },
    { id: 'bilan', temps: 6, petit: 'Bilan', titre: () => S.fautes.length ? 'Poste rangé' : 'Poste rangé, sans faute',
      zoom: () => SceneAzote.vueManifold({ circuit: 0 }),
      ui: () => `<div class="choix">${btn('Rejouer', 'niveau', '1')}</div>` }
  ];

  return {
    neuf, etapes: ETAPES, code: 'AZOTE', jauges: SceneAzote.JAUGES,
    sansFaute: 'Le détendeur a été réglé sous la PS, l’épreuve faite, le poste vidé et rangé.',
    revoir: f => f.temps === 1 ? '3-2' : null,
    scene: () => SceneAzote.poste(S),
    physique,
    son() {
      const coule = (S.flexible && S.vannes && Math.abs(S.p.bp - S.circuit) > .5) || (S.vidange && S.circuit + S.p.bp > .5);
      Son.regler(0, coule ? .05 : 0);
    }
  };
});
