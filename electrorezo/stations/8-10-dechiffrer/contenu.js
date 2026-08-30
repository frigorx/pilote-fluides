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
  ],

  ceQuelleDit: 'Vous connaissez l’alphabet : le trait, le point, le contact, la barre, le rectangle, le crochet, le demi-cercle, le pointillé, la bobine, le rond, les repères. Une dizaine de signes — et de quoi lire des centaines de symboles.',
  ouOnLaVoit: 'Partout, et surtout dans les symboles que personne ne vous a jamais montrés. C’est là que la méthode se prouve.',

  /* Le temps 2 : la méthode en trois gestes, dessinée. */
  scene: () => {
    const d = Signes.svg('0 0 820 380',
      'La méthode en trois gestes : trouver la colonne, nommer chaque signe, additionner.');
    d.innerHTML = `
<rect x="12" y="10" width="796" height="360" rx="16" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
<text x="410" y="46" text-anchor="middle" font-size="17" font-weight="700" fill="#1b3a63">Trois gestes, et ça marche à tous les coups</text>

<g>
  <rect x="34" y="70" width="240" height="280" rx="12" fill="#f7f1e7" stroke="rgba(27,58,99,.18)"/>
  <text x="154" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">1 · La colonne</text>
  <line x1="154" y1="130" x2="154" y2="270" stroke="#c9451a" stroke-width="8"/>
  <text x="154" y="300" text-anchor="middle" font-size="13" fill="#637285">le trait vertical :</text>
  <text x="154" y="320" text-anchor="middle" font-size="13" fill="#637285">par où passe le courant</text>
</g>

<g>
  <rect x="290" y="70" width="240" height="280" rx="12" fill="#f7f1e7" stroke="rgba(27,58,99,.18)"/>
  <text x="410" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">2 · Chaque signe</text>
  <line x1="410" y1="130" x2="410" y2="270" stroke="#c9451a" stroke-width="8"/>
  <line x1="410" y1="150" x2="452" y2="150" stroke="#1b3a63" stroke-width="3"/>
  <text x="530" y="155" text-anchor="end" font-size="13" fill="#1b3a63">ça s’ouvre</text>
  <line x1="410" y1="196" x2="452" y2="196" stroke="#c0392b" stroke-width="3"/>
  <text x="530" y="201" text-anchor="end" font-size="13" fill="#c0392b">la chaleur</text>
  <line x1="410" y1="242" x2="452" y2="242" stroke="#3d7fca" stroke-width="3"/>
  <text x="530" y="247" text-anchor="end" font-size="13" fill="#3d7fca">l’aimant</text>
  <text x="410" y="320" text-anchor="middle" font-size="13" fill="#637285">un par un, sans se presser</text>
</g>

<g>
  <rect x="546" y="70" width="240" height="280" rx="12" fill="#e3f5ec" stroke="#1e7e54" stroke-width="2"/>
  <text x="666" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="#1e7e54">3 · On additionne</text>
  <text x="666" y="150" text-anchor="middle" font-size="14" fill="#1b3a63">ça s’ouvre</text>
  <text x="666" y="176" text-anchor="middle" font-size="14" fill="#1b3a63">+ ça se condamne</text>
  <text x="666" y="202" text-anchor="middle" font-size="14" fill="#1b3a63">+ la chaleur</text>
  <text x="666" y="228" text-anchor="middle" font-size="14" fill="#1b3a63">+ l’aimant</text>
  <line x1="586" y1="248" x2="746" y2="248" stroke="#1e7e54" stroke-width="2"/>
  <text x="666" y="278" text-anchor="middle" font-size="15" font-weight="700" fill="#1e7e54">un disjoncteur moteur</text>
  <text x="666" y="320" text-anchor="middle" font-size="13" fill="#637285">lu, pas reconnu</text>
</g>`;
    return d;
  },

  pourquoiCetteForme: [
    '<strong>Premier geste : trouvez la colonne.</strong> Un symbole est presque toujours bâti autour d’un trait vertical, le passage du courant. Repérez-le, et vous savez par où ça entre et par où ça sort.',
    '<strong>Deuxième geste : nommez chaque signe</strong> accroché à cette colonne, un par un, sans vous presser.',
    '<strong>Troisième geste : additionnez.</strong> Ça s’ouvre, ça se condamne, ça surveille la chaleur et l’aimant : c’est un disjoncteur moteur. Vous ne l’avez pas reconnu, vous l’avez lu.',
    '<strong>Toute la différence est là.</strong> Celui qui a appris par cœur est perdu devant un symbole nouveau. Celui qui sait lire ne l’est jamais.'
  ],

  motsOuOnLaTrouve: ['magnetoThermique', 'disjoncteurMoteur', 'relaisThermique'],
  motVedette: 'disjoncteurMoteur',

  symbolesBiblio: [
    { src: 'assets/disjonct-m_1f.svg',
      alt: 'Symbole normalisé d’un disjoncteur : contact incliné, crochet du thermique, demi-cercle du magnétique.',
      legende: 'À déchiffrer : trois signes empilés' },
    { src: 'assets/dis_mag_term_2f-2.svg',
      alt: 'Symbole normalisé d’un disjoncteur magnéto-thermique à deux pôles, avec ses repères de bornes.',
      legende: 'Le même appareil, écrit autrement' }
  ],
  duDessinAuPlan: [
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
        { texte: 'La couleur du trait.', pourquoi: 'Un plan est noir et blanc : la couleur ne porte jamais l’information.' } ] },

    { question: 'Un symbole porte : un contact, une barre courte, un crochet courbe, un demi-cercle. C’est…',
      confirmation: 'Il s’ouvre, il se condamne, il voit la chaleur et l’aimant.',
      reponses: [
        { texte: 'Un relais thermique.', pourquoi: 'Le relais thermique n’a ni barre de sectionnement, ni demi-cercle magnétique.' },
        { texte: 'Un sectionneur porte-fusible.', pourquoi: 'Celui-là porte un rectangle de fusible, et aucun déclencheur.' },
        { texte: 'Un disjoncteur moteur.', juste: true },
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
    regle: 'Cinq symboles. Pour chacun, dites quel appareil c’est, en vingt-cinq secondes. Deux d’entre eux n’ont été montrés nulle part ailleurs dans ce réseau : c’est tout l’enjeu.',
    secondes: 25,
    actions: [
      { id: 'interrupteur', libelle: 'Un interrupteur' },
      { id: 'sectionneur', libelle: 'Un sectionneur' },
      { id: 'thermique', libelle: 'Un relais thermique' },
      { id: 'magnetoThermique', libelle: 'Un disjoncteur magnéto-thermique' },
      { id: 'disjoncteurMoteur', libelle: 'Un disjoncteur moteur' },
      { id: 'contacteur', libelle: 'Un contacteur' } ],
    cas: [
      { enonce: 'Un contact, et un trait horizontal posé dessus.',
        fiche: [['Signes lus', 'contact + commande manuelle'], ['Déjà vu ?', 'oui, station 8.2']],
        bonne: 'interrupteur',
        explication: 'Ça s’ouvre, et une main l’actionne : un interrupteur.' },
      { enonce: 'Un contact, et une barre courte à son extrémité.',
        fiche: [['Signes lus', 'contact + aptitude au sectionnement'], ['Déjà vu ?', 'oui, station 8.3']],
        bonne: 'sectionneur',
        explication: 'Ça s’ouvre et ça se condamne : un sectionneur.' },
      { enonce: 'Un contact, et un crochet courbe accroché sous lui.',
        fiche: [['Signes lus', 'contact + déclencheur thermique'], ['Déjà vu ?', 'oui, station 8.5']],
        bonne: 'thermique',
        explication: 'Ça s’ouvre, et ça surveille la chaleur — mais pas l’aimant : un relais thermique.' },
      { enonce: 'Un contact, un crochet courbe, et un demi-cercle. Pas de barre.',
        fiche: [['Signes lus', 'contact + thermique + magnétique'], ['Déjà vu ?', '⚠ jamais montré tel quel']],
        bonne: 'magnetoThermique',
        explication: 'Chaleur et aimant, mais rien qui autorise à travailler derrière : un disjoncteur magnéto-thermique.' },
      { enonce: 'Une bobine, des contacts éloignés, et un pointillé entre les deux.',
        fiche: [['Signes lus', 'bobine + contacts + liaison mécanique'], ['Déjà vu ?', '⚠ jamais montré tel quel']],
        bonne: 'contacteur',
        explication: 'Une bobine commande des contacts solidaires mais dessinés loin : un contacteur.' } ],
    reussite: 'Cinq sur cinq — dont deux symboles qu’on ne vous avait jamais montrés. Vous ne reconnaissez plus : vous lisez.',
    echec: 'On recommence. Reprenez la méthode : la colonne, puis chaque signe, puis l’addition.'
  },

  objectifs: '<p><strong>Objectif.</strong> Déchiffrer un symbole inconnu par décomposition : trouver la colonne, nommer chaque signe, additionner.</p><p><strong>Fin de la ligne 8.</strong> Le test contient deux symboles qui n’apparaissent nulle part ailleurs dans le réseau : c’est le seul exercice qui vérifie qu’on sait lire, et non qu’on a retenu.</p>',

  credits: [
    { quoi: 'Symbole officiel à déchiffrer',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/12_magneto_thermal_circuit_breakers/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: '5.9 Lire un schéma' },
    { ligne: 4, couleur: '#c0392b', texte: '4.4 Le disjoncteur moteur' },
    { ligne: 8, couleur: '#7c3aed', texte: '8.1 Le trait et le point' } ]
});
