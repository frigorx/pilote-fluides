/* ÉlectroRézo 8.1 — Le trait et le point. */

ModeleSigne.construire({
  id: '8.1',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 1',
  titre: 'Le trait et le point',
  lettre: 'conducteur',
  narration: NARRATION,

  prerequis: [],   /* première de sa ligne : elle ne suppose rien */

  ceQuelleDit: 'Le trait, c’est un conducteur : un fil, une piste, quelque chose par où le courant peut passer. C’est la lettre la plus fréquente de toute l’écriture du schéma.',
  ouOnLaVoit: 'Partout. Un plan est fait de traits reliés entre eux ; tous les autres signes viennent s’insérer dessus.',

  /* Le temps 2 dessine le croisement — avec point et sans point. */
  scene: () => {
    const d = Signes.svg('0 0 760 320',
      'Deux traits qui se croisent : avec un point ils sont reliés, sans point ils passent l’un devant l’autre.');
    d.innerHTML = `
<rect x="12" y="10" width="736" height="300" rx="16" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
<text x="380" y="44" text-anchor="middle" font-size="17" font-weight="700" fill="#1b3a63">Tout se joue sur un point</text>

<g>
  <line x1="120" y1="110" x2="300" y2="110" stroke="#1b3a63" stroke-width="5"/>
  <line x1="210" y1="80"  x2="210" y2="200" stroke="#1b3a63" stroke-width="5"/>
  <circle cx="210" cy="110" r="9" fill="#1b3a63"/>
  <text x="210" y="238" text-anchor="middle" font-size="16" font-weight="700" fill="#1e7e54">avec le point</text>
  <text x="210" y="262" text-anchor="middle" font-size="14" fill="#637285">les deux fils sont reliés</text>
  <text x="210" y="284" text-anchor="middle" font-size="14" fill="#637285">le courant passe de l’un à l’autre</text>
</g>

<g>
  <line x1="470" y1="110" x2="650" y2="110" stroke="#1b3a63" stroke-width="5"/>
  <line x1="560" y1="80"  x2="560" y2="200" stroke="#1b3a63" stroke-width="5"/>
  <text x="560" y="238" text-anchor="middle" font-size="16" font-weight="700" fill="#c0392b">sans le point</text>
  <text x="560" y="262" text-anchor="middle" font-size="14" fill="#637285">ils se croisent sans se toucher</text>
  <text x="560" y="284" text-anchor="middle" font-size="14" fill="#637285">comme une route qui passe en pont</text>
</g>

<line x1="385" y1="80" x2="385" y2="200" stroke="rgba(27,58,99,.18)" stroke-width="2"/>`;
    return d;
  },

  pourquoiCetteForme: [
    '<strong>Le trait n’a pas de forme à justifier</strong> : c’est le fil lui-même, vu de loin. C’est la seule lettre de l’alphabet qui ressemble exactement à ce qu’elle désigne.',
    '<strong>Le point, lui, a été inventé</strong> — parce qu’il fallait bien distinguer deux fils qui se rencontrent de deux fils qui se croisent. Un plan est plat : sans ce point, l’information serait perdue.',
    'Sur des plans anciens ou étrangers, l’enjambement se dessine parfois par une <strong>petite demi-lune</strong> qui saute par-dessus l’autre trait. On ne l’écrit plus, mais on la rencontre encore.',
    '<strong>Ce que ça coûte de confondre</strong> : au mieux une machine qui ne démarre pas, au pire deux phases reliées — un court-circuit franc.'
  ],

  exercice: () => Signes.exerciceCroisements(),
  motsOuOnLaTrouve: ['interrupteur', 'fusible', 'moteur'],
  motVedette: 'moteur',

  symbolesBiblio: [
    { src: 'assets/splice.svg', alt: 'Symbole normalisé d’une connexion entre conducteurs.', legende: 'Une connexion' },
    { src: 'assets/cross.svg', alt: 'Symbole normalisé d’un croisement sans connexion.', legende: 'Un croisement sans connexion' },
    { src: 'assets/jump.svg', alt: 'Symbole normalisé d’un enjambement de conducteurs.', legende: 'Un enjambement' }
  ],
  duDessinAuPlan: [
    'Sur un vrai plan, <strong>aucune légende n’accompagne ces signes</strong>. Ils sont trop courants pour qu’on les explique : personne n’écrit « ici, connexion ».',
    'C’est pour cela qu’il faut les connaître par cœur, <strong>eux et seulement eux</strong> : les autres lettres, vous les déduirez.',
    'Attention aux plans redessinés ou photocopiés : un point mal imprimé disparaît. Dans le doute, on suit le fil, on ne devine pas.'
  ],

  quiz: [
    { question: 'Deux traits se croisent, avec un gros point noir au croisement. Cela veut dire…',
      confirmation: 'Le point marque la connexion : les deux fils n’en font plus qu’un.',
      reponses: [
        { texte: 'Les deux fils sont reliés, le courant passe de l’un à l’autre.', juste: true },
        { texte: 'Les deux fils se croisent sans se toucher.', pourquoi: 'C’est justement le contraire : sans point, ils se croisent ; avec point, ils se relient.' },
        { texte: 'C’est un repère de mesure.', pourquoi: 'Les points de mesure se signalent autrement, et sont toujours annotés.' },
        { texte: 'Il y a une soudure à faire à cet endroit.', pourquoi: 'Le point dit une liaison électrique, pas une technique d’assemblage. La soudure, l’embout ou la borne se lisent ailleurs.' } ] },

    { question: 'Sur un plan, un trait tout seul représente…',
      confirmation: 'C’est la lettre la plus simple, et la plus fréquente.',
      reponses: [
        { texte: 'Une cote de longueur.', pourquoi: 'Un schéma électrique n’est pas un plan coté : les longueurs s’écrivent dans le carnet de câbles.' },
        { texte: 'Un conducteur — un fil.', juste: true },
        { texte: 'Une limite de zone.', pourquoi: 'Les limites de zone se dessinent en trait fin interrompu, jamais en trait plein comme un conducteur.' },
        { texte: 'Une liaison mécanique.', pourquoi: 'La liaison mécanique se dessine en pointillé — c’est la station 8.7.' } ] },

    { question: 'Pourquoi le point a-t-il été inventé ?',
      confirmation: 'Un plan est plat : il faut bien distinguer se rencontrer de se croiser.',
      reponses: [
        { texte: 'Pour indiquer où mesurer la tension.', pourquoi: 'Aucun rapport : la mesure ne se marque pas ainsi.' },
        { texte: 'Pour marquer le début d’un circuit.', pourquoi: 'Le début d’un circuit se lit à l’arrivée du réseau, pas à un point de connexion.' },
        { texte: 'Parce qu’un plan est plat : sans lui, on ne saurait pas si deux fils se touchent.', juste: true },
        { texte: 'Pour faire joli et aérer le dessin.', pourquoi: 'Aucun signe de la norme n’est décoratif. Chacun porte une information.' } ] },

    { question: 'Un plan photocopié, un point qui a disparu à l’impression. Que faites-vous ?',
      confirmation: 'On suit le fil et on vérifie ailleurs. On ne parie pas sur un point.',
      reponses: [
        { texte: 'Je regarde la couleur des fils sur la machine, c’est équivalent.', pourquoi: 'Les couleurs renseignent sur la fonction du conducteur, pas sur la topologie du schéma.' },
        { texte: 'Je relie quand même : dans le doute, mieux vaut connecter.', pourquoi: 'Relier deux conducteurs qui ne devaient pas l’être peut créer un court-circuit franc.' },
        { texte: 'Je suppose qu’il n’y a pas de connexion, c’est le cas le plus courant.', pourquoi: 'Une supposition sur un plan, c’est une erreur de câblage qui attend son heure.' },
        { texte: 'Je demande un plan à jour, ou je suis le fil sur l’installation.', juste: true } ] }
  ],

  retenir: [
    '<strong>Le trait = un conducteur.</strong> La lettre la plus fréquente.',
    '<strong>Le point = une connexion.</strong> Sans lui, les fils se croisent sans se toucher.',
    'Ces deux-là ne sont jamais légendés sur un plan : c’est à vous de les lire.',
    'Un point douteux se vérifie, il ne se devine pas.'
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire les deux signes les plus fréquents du schéma : le trait qui est un conducteur, et le point qui dit si deux fils sont reliés. Savoir ce que coûte la confusion.</p>',

  credits: [
    { quoi: 'Symboles de connexion, croisement et enjambement',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/114_connections/' } ],

  correspondances: [
    { ligne: 8, couleur: '#7c3aed', texte: '8.2 Le contact' },
    { ligne: 5, couleur: '#1e7e54', texte: '5.9 Lire un schéma' } ]
});
