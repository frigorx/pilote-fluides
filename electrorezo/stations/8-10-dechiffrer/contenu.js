/* ÉlectroRézo 8.10 — Déchiffrer. La station qui couronne la ligne :
   lire un symbole qu'on n'a jamais vu. */

ModeleSigne.construire({
  id: '8.10',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 10 · fin de ligne',
  titre: 'Déchiffrer',
  lettre: 'contact',
  narration: NARRATION,

  prerequis: [
    { id: '8.5', quoi: "le crochet" },
    { id: '8.6', quoi: "le demi-cercle" },
    { id: '8.3', quoi: "la barre" },
    { id: '8.2', quoi: "le contact" },
    { id: '8.7', quoi: "le pointillé" },
    { id: '8.8', quoi: "la bobine" },
    { id: '8.9', quoi: "les repères" },
  ],

  ceQuelleDit: 'Vous connaissez l’alphabet : le trait, le point, le contact, la barre, le rectangle, le crochet, le demi-cercle, le pointillé, la bobine, le rond, les repères. Une dizaine de signes — de quoi lire beaucoup de symboles, et savoir quoi demander pour le reste.',
  ouOnLaVoit: 'Partout, et surtout dans les symboles que personne ne vous a jamais montrés. C’est là que la méthode se prouve.',

  /* Le temps 2 : la méthode en trois gestes, dessinée. À l'étape 2, ce sont les vraies lettres
     de signes.js (contact, barre, crochet, demi-cercle), tracées d'après les fichiers de la
     bibliothèque, qui sont montrées : pas des traits de couleur. */
  scene: () => {
    const L = Signes.LETTRES;
    /* une lettre, centrée sur (X, Y) et réduite à k ; le trait garde son épaisseur d'écran */
    const lettre = (nom, X, Y, k) => {
      const b = L[nom].boite, cx = (b[0] + b[2]) / 2 * 3, cy = (b[1] + b[3]) / 2 * 3;
      return `<g class="nss" transform="translate(${(X - cx * k).toFixed(1)} ${(Y - cy * k).toFixed(1)}) scale(${k})">${L[nom].dessin(0, 0)}</g>`;
    };
    const d = Signes.svg('0 0 820 380',
      'La méthode en trois gestes : trouver la colonne, nommer chaque signe avec sa vraie lettre, additionner.');
    d.innerHTML = `
<style>.nss *{vector-effect:non-scaling-stroke}</style>
<rect x="12" y="10" width="796" height="360" rx="16" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="#1b3a63">Trois gestes, et ça marche presque toujours</text>

<g>
  <rect x="34" y="70" width="240" height="280" rx="12" fill="#f7f1e7" stroke="rgba(27,58,99,.18)"/>
  <text x="154" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">1 · La colonne</text>
  <line x1="154" y1="130" x2="154" y2="270" stroke="#1b3a63" stroke-width="8"/>
  <text x="154" y="300" text-anchor="middle" font-size="13" fill="#637285">le trait vertical :</text>
  <text x="154" y="320" text-anchor="middle" font-size="13" fill="#637285">par où passe le courant</text>
</g>

<g>
  <rect x="290" y="70" width="240" height="280" rx="12" fill="#f7f1e7" stroke="rgba(27,58,99,.18)"/>
  <text x="410" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">2 · Chaque signe</text>
  ${lettre('contact', 334, 150, .4)}
  <text x="372" y="155" font-size="14" fill="#1b3a63">ça s’ouvre</text>
  ${lettre('sectionnement', 334, 205, 1.4)}
  <text x="372" y="210" font-size="14" fill="#1b3a63">ça peut isoler</text>
  ${lettre('thermique', 334, 260, 1.8)}
  <text x="372" y="265" font-size="14" fill="#1b3a63">la chaleur</text>
  ${lettre('magnetique', 334, 315, 2.2)}
  <text x="372" y="320" font-size="14" fill="#1b3a63">l’aimant</text>
</g>

<g>
  <rect x="546" y="70" width="240" height="280" rx="12" fill="#e3f5ec" stroke="#1e7e54" stroke-width="2"/>
  <text x="666" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="#1e7e54">3 · On additionne</text>
  <text x="666" y="150" text-anchor="middle" font-size="14" fill="#1b3a63">ça s’ouvre</text>
  <text x="666" y="176" text-anchor="middle" font-size="14" fill="#1b3a63">+ ça peut isoler</text>
  <text x="666" y="202" text-anchor="middle" font-size="14" fill="#1b3a63">+ la chaleur</text>
  <text x="666" y="228" text-anchor="middle" font-size="14" fill="#1b3a63">+ l’aimant</text>
  <line x1="586" y1="248" x2="746" y2="248" stroke="#1e7e54" stroke-width="2"/>
  <text x="666" y="278" text-anchor="middle" font-size="15" font-weight="700" fill="#1e7e54">un disjoncteur</text>
  <text x="666" y="320" text-anchor="middle" font-size="13" fill="#637285">lu, pas reconnu</text>
</g>`;
    return d;
  },

  pourquoiCetteForme: [
    '<strong>Premier geste : trouvez la colonne.</strong> Un symbole est presque toujours bâti autour d’un trait vertical, le passage du courant. Repérez-le, et vous savez par où ça entre et par où ça sort.',
    '<strong>Deuxième geste : nommez chaque signe</strong> accroché à cette colonne, un par un, sans vous presser.',
    '<strong>Troisième geste : additionnez.</strong> Ça s’ouvre, ça peut isoler, ça surveille la chaleur et l’aimant : c’est un disjoncteur. La petite croix × posée sur la colonne le confirme : c’est son signe. Vous ne l’avez pas reconnu, vous l’avez lu.',
    '<strong>Toute la différence est là.</strong> Celui qui a appris par cœur est perdu devant un symbole nouveau. Celui qui sait lire sait toujours quoi chercher.'
  ],

  motsOuOnLaTrouve: ['relaisThermique', 'sectionneurFusible', 'contacteur'],
  motVedette: 'sectionneurFusible',

  symbolesBiblio: [
    { src: 'assets/disjonct-m_1f.svg',
      alt: 'Symbole normalisé d’un disjoncteur : contact incliné avec sa barre courte, crochet carré du thermique, demi-cercle du magnétique, et une croix × sur la colonne.',
      legende: 'À déchiffrer : un contact, une barre, un crochet carré, un demi-cercle, et une croix' },
    { src: 'assets/dis_mag_term_2f-2.svg',
      alt: 'Symbole normalisé d’un disjoncteur magnéto-thermique à deux pôles, avec ses repères de bornes.',
      legende: 'Un disjoncteur à deux pôles, écrit autrement : avec « I> » et des numéros de bornes' }
  ],
  duDessinAuPlan: [
    'Sur ces deux symboles, il y a des signes que l’alphabet ne contient pas : la <strong>croix ×</strong> posée sur la colonne, qui est le signe du <strong>disjoncteur</strong> (il coupe tout seul quand il détecte un défaut), le <strong>« I> »</strong> (courant supérieur à) et les numéros de bornes. Ce n’est pas un échec de la méthode : nommez ce que vous savez, et vous saurez quoi demander pour le reste.',
    'Un dernier conseil, et il vaut pour toute une carrière : <strong>quand vous tombez sur un symbole inconnu, ne cherchez pas à deviner l’appareil</strong>.',
    '<strong>Décomposez-le.</strong> Nommez les signes un par un. La réponse arrive presque toujours toute seule.',
    'Et quand elle n’arrive pas, vous savez au moins <strong>quelle question poser</strong> — ce qui vaut déjà mieux que de câbler au hasard.'
  ],

  quiz: [
    { question: 'Premier geste devant un symbole inconnu : que cherchez-vous ?',
      confirmation: 'La colonne dit par où entre et par où sort le courant.',
      reponses: [
        { texte: 'La date du plan.', pourquoi: 'La date figure au cartouche et ne renseigne pas sur le symbole.' },
        { texte: 'La colonne verticale, le passage du courant.', juste: true },
        { texte: 'Le repère écrit à côté.', pourquoi: 'Le repère aide, mais il ne décrit pas l’appareil : KM1 ne vous dit pas combien de pôles il a.' },
        { texte: 'La couleur du trait.', pourquoi: 'Sur un plan imprimé en noir et blanc, la couleur ne dit rien : ce n’est pas un indice sur lequel compter.' } ] },

    { question: 'Un symbole porte : un contact, une barre courte, un crochet carré, un demi-cercle, et une petite croix sur la colonne. C’est…',
      confirmation: 'Il s’ouvre, il peut isoler, il voit la chaleur et l’aimant, et la croix dit : un disjoncteur.',
      reponses: [
        { texte: 'Un relais thermique.', pourquoi: 'Le relais thermique n’a ni barre de sectionnement, ni demi-cercle magnétique.' },
        { texte: 'Un sectionneur porte-fusible.', pourquoi: 'Celui-là porte un rectangle de fusible, et aucun déclencheur.' },
        { texte: 'Un disjoncteur.', juste: true },
        { texte: 'Un contacteur.', pourquoi: 'Un contacteur a une bobine et un pointillé, pas de déclencheurs.' } ] },

    { question: 'Vous ne reconnaissez aucun des signes d’un symbole. Que faites-vous ?',
      confirmation: 'Savoir quelle question poser vaut mieux que câbler au hasard.',
      reponses: [
        { texte: 'Je passe : ce n’est probablement pas important.', pourquoi: 'Aucun symbole n’est posé sur un plan sans raison.' },
        { texte: 'Je choisis l’appareil qui ressemble le plus.', pourquoi: 'Deux symboles voisins peuvent désigner des appareils aux capacités très différentes — un interrupteur et un sectionneur, par exemple.' },
        { texte: 'Je câble en suivant les fils existants, ça revient au même.', pourquoi: 'Suivre un câblage existant reproduit ses erreurs, et ne dit rien du rôle de l’appareil.' },
        { texte: 'Je note ce que je vois et je demande, en sachant quoi demander.', juste: true } ] },

    { question: 'Pourquoi cette méthode vaut-elle mieux que d’apprendre les symboles par cœur ?',
      confirmation: 'Un alphabet court permet de lire des mots qu’on n’a jamais vus.',
      reponses: [
        { texte: 'Parce qu’elle permet de lire des symboles jamais vus.', juste: true },
        { texte: 'Parce qu’elle est plus rapide à apprendre.', pourquoi: 'Elle demande au contraire un peu plus d’effort au début. Le gain vient après.' },
        { texte: 'Parce qu’elle dispense de connaître les appareils.', pourquoi: 'Au contraire : elle ne sert que si vous savez ce qu’est un bilame ou une bobine.' },
        { texte: 'Parce que les symboles changent tous les ans.', pourquoi: 'La norme est très stable : ce n’est pas la raison.' } ] }
  ],

  jeu: {
    titre: 'Le déchiffreur — le test de la ligne 8',
    regle: 'Cinq symboles, décrits signe par signe. Pour chacun, additionnez les signes et dites quel appareil c’est.',
    actions: [
      { id: 'interrupteur', libelle: 'Un interrupteur' },
      { id: 'sectionneur', libelle: 'Un sectionneur' },
      { id: 'thermique', libelle: 'Un relais thermique' },
      { id: 'disjoncteur', libelle: 'Un disjoncteur' },
      { id: 'contacteur', libelle: 'Un contacteur' } ],
    cas: [
      { enonce: 'Un contact, avec un petit cercle à chacune de ses deux extrémités, et rien d’autre.',
        fiche: [['Signes lus', 'contact + deux bornes (petits cercles)'], ['Déjà vu ?', 'oui, stations 8.2 et 8.9 ; le symbole : station 3.1']],
        bonne: 'interrupteur',
        explication: 'Ça s’ouvre, et rien d’autre n’est dessiné : ni barre, ni crochet, ni bobine. Parmi ces appareils, c’est l’interrupteur, tel qu’on le voit à la station 3.1.' },
      { enonce: 'Un contact, et une barre courte à son extrémité.',
        fiche: [['Signes lus', 'contact + aptitude au sectionnement'], ['Déjà vu ?', 'oui, station 8.3']],
        bonne: 'sectionneur',
        explication: 'Ça s’ouvre et ça peut isoler : un sectionneur.' },
      { enonce: 'Un contact, et un crochet carré accroché sous lui.',
        fiche: [['Signes lus', 'contact + déclencheur thermique'], ['Déjà vu ?', 'oui, station 8.5']],
        bonne: 'thermique',
        explication: 'Ça s’ouvre, et ça surveille la chaleur — mais pas l’aimant : un relais thermique.' },
      { enonce: 'Un contact, un crochet carré, un demi-cercle, et une petite croix sur la colonne.',
        fiche: [['Signes lus', 'contact + thermique + magnétique + croix du disjoncteur'], ['Déjà vu ?', 'oui, stations 8.5 et 8.6 ; la croix : temps 4']],
        bonne: 'disjoncteur',
        explication: 'Chaleur et aimant, et la croix : un disjoncteur (ici, magnéto-thermique).' },
      { enonce: 'Une bobine, des contacts éloignés, et un pointillé entre les deux.',
        fiche: [['Signes lus', 'bobine + contacts + liaison mécanique'], ['Déjà vu ?', 'oui, stations 8.7 et 8.8']],
        bonne: 'contacteur',
        explication: 'Une bobine commande des contacts solidaires mais dessinés loin : un contacteur.' } ],
    fin: 'Relisez le journal : pour chaque symbole, il dit quels signes il fallait additionner. Reprenez la méthode quand vous voulez : la colonne, puis chaque signe, puis l’addition.'
  },

  objectifs: '<p><strong>Objectif.</strong> Déchiffrer un symbole inconnu par décomposition : trouver la colonne, nommer chaque signe, additionner.</p><p><strong>Fin de la ligne 8.</strong> Le jeu applique la méthode : on lit les signes d’un symbole, on les additionne, on nomme l’appareil.</p>',

  credits: [
    { quoi: 'Symbole officiel à déchiffrer',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/11_circuit_breakers/ (disjonct-m_1f.svg) · 12_magneto_thermal_circuit_breakers/ (dis_mag_term_2f-2.svg)' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: '5.9 Lire un schéma' },
    { ligne: 4, couleur: '#c0392b', texte: '4.4 Le disjoncteur moteur' },
    { ligne: 8, couleur: '#7c3aed', texte: '8.1 Le trait et le point' } ]
});
