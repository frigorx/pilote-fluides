/* Station 1-4 — Cintrer à la cintrette. Source : sources-metier/1-4-1-5-cintrage.md (partie 1)
   Reprise du TP cintrette (C:\git\tp-cintrage) : PRINCIPE À NE PAS CASSER, le rayon Rc se découvre
   par la mesure (coude d'essai), il n'est écrit nulle part. « Traçage = 300 − Rc » ne vaut qu'à 90°.
   La ligne tracée sur le tube contrôle le vrillage : ce n'est pas la fibre neutre.
   Le TP d'origine travaille du multicouche Ø16 ; cette station parle du cuivre recuit. */
CUIVREZO.stations.push({
  id: '1-4', ligne: 1, titre: 'Cintrer à la cintrette', duree: '30 min',
  sources: ['sources-metier/1-4-1-5-cintrage.md', 'C:/git/tp-cintrage'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un coude à 90°, 300 mm à l’axe',
    texte: 'Le coude est d’équerre, la branche mesure 300 mm jusqu’à l’axe de l’autre branche, et le tube n’est ni écrasé ni vrillé.',
    criteres: ['Angle de 90°, contrôlé à l’équerre', 'Cote de 300 mm à l’axe, à ± 3 mm', 'Tube ni écrasé ni marqué', 'Ligne de contrôle droite : pas de vrille'],
    figure: { svg: 'coude', etat: 'equerre', legende: 'Un coude d’équerre, sans écrasement.' },
    narration: 'Le cintrage remplace un raccord par un coude fait dans le tube lui-même. Moins de raccords, c’est moins de brasures, moins de fuites et moins de pertes de charge. Mais un coude se rate de trois façons : trop long, écrasé, ou vrillé. Cette station vous apprend à les éviter toutes les trois. Et vous allez découvrir vous-même le chiffre qui rend un coude juste : le rayon de votre cintrette.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { composant: 'cintrette-lab', attributs: { angle: '0' }, legende: 'La cintrette : poignée fixe, poignée mobile, guide, forme et repère 0.' },
    items: [
      { nom: 'La cintrette adaptée au tube', detail: 'l’inscription (5/8″…) désigne le tube accepté, pas le rayon' },
      { nom: 'Un tube de cuivre recuit', detail: 'en couronne ; une barre écrouie se recuit d’abord : voir le professeur' },
      { nom: 'Une chute de tube pour l’essai', detail: 'le coude d’essai ne se fait jamais sur la pièce' },
      { nom: 'Feutre fin, mètre, équerre', detail: 'l’équerre sert de butée et de contrôle' }
    ],
    narration: 'La cintrette est une pince à cintrer : une forme ronde, creusée d’une gorge, et deux poignées, l’une fixe, l’autre mobile, qui entraîne un guide autour de la forme. Attention à l’inscription gravée dessus, par exemple cinq huitièmes : elle dit quel tube l’outil accepte, pas quel rayon il donne. Le rayon, vous allez le trouver vous-même, sur une chute de tube.'
  },
  gestes: [
    { titre: 'Contrôler l’outil, les mains hors de la pince', texte: 'Vérifiez la cintrette. Tenez-la par les poignées, jamais près du guide.',
      pointCle: 'Deux mains sur les deux poignées, personne dans l’axe du tube.',
      pourquoi: 'Entre la forme et le guide, c’est une zone de pincement. Et un tube qui glisse part dans l’axe.',
      figure: { img: 'images/1-4-cintrette.webp', alt: 'Les deux mains sur les poignées de la cintrette' }, clip: 'clips/1-4/01-outil.mp4',
      narration: 'Avant de cintrer, on vérifie l’outil et on place ses mains. Les deux mains sur les deux poignées, et nulle part ailleurs : entre la forme et le guide, un doigt serait pincé. Et on regarde l’axe du tube : personne ne doit s’y trouver, parce qu’un tube qui glisse part droit devant.' },
    { titre: 'Tracer la ligne de contrôle', texte: 'Tracez une ligne droite sur toute la longueur du tube, sur le dessus.',
      pointCle: 'Cette ligne doit rester sur le dessus pendant tout le cintrage.',
      pourquoi: 'Si la ligne tourne, le tube a vrillé et le coude sort de son plan. Elle sert à contrôler, ce n’est pas un trait de mesure.',
      figure: { svg: 'coude', etat: 'vrille', legende: 'Ce qu’on veut éviter : la ligne qui tourne.' }, clip: 'clips/1-4/02-ligne.mp4',
      narration: 'Premier trait, un peu surprenant : une longue ligne droite sur le dessus du tube, d’un bout à l’autre. Elle ne mesure rien. Elle sert de témoin : pendant le cintrage, elle doit rester sur le dessus. Si elle tourne, c’est que le tube a vrillé dans la gorge, et votre coude sortira de son plan.' },
    { titre: 'Trouver le rayon de votre cintrette', texte: 'Sur une chute : tracez à 300 mm, posez ce trait sur le 0, cintrez à 90°. Mesurez la branche à l’axe, contre la butée.',
      pointCle: 'Rc = ce que vous mesurez − 300.',
      pourquoi: 'Le coude ne commence pas au trait : il s’enroule autour de la forme. La branche finie est donc plus longue de la valeur du rayon.',
      figure: { svg: 'coude', etat: 'rc' }, clip: 'clips/1-4/03-essai.mp4',
      narration: 'Voici l’expérience qui rend tout le reste juste. Sur une chute, tracez un trait à trois cents millimètres, posez-le sur le repère zéro, et cintrez à quatre-vingt-dix degrés. Puis plaquez la branche contre la butée et mesurez jusqu’à l’axe de l’autre branche. Vous ne trouvez pas trois cents : vous trouvez davantage. La différence, c’est le rayon de votre cintrette, le chiffre qu’on appelle R c. Notez-le : c’est lui qui corrigera tous vos traçages.' },
    { titre: 'Tracer le début du cintrage', texte: 'Sur la pièce, depuis le bout de référence, tracez à 300 − Rc.',
      pointCle: 'Cette soustraction ne vaut que pour un coude à 90°.',
      pourquoi: 'En reculant le trait de la valeur du rayon, la branche finie tombe pile à 300 mm à l’axe.',
      figure: { svg: 'mesure', etat: 'butee', legende: 'Toujours contre une butée.' }, clip: 'clips/1-4/04-tracer.mp4',
      narration: 'Maintenant, la vraie pièce. Puisque le coude ajoute la valeur du rayon, on recule le trait d’autant : on trace à trois cents moins R c, en mesurant contre la butée comme à la station un point deux. Attention : cette règle simple ne vaut que pour un coude à quatre-vingt-dix degrés. À quarante-cinq degrés, la correction est différente.' },
    { titre: 'Engager le tube, trait sur le 0', texte: 'Engagez le tube au fond de la gorge. Placez le trait exactement en face du repère 0, ligne de contrôle dessus.',
      pointCle: 'Exactement sur le 0 : le 0, c’est le début du coude.',
      pourquoi: 'Un trait posé avant ou après le 0 décale tout le coude d’autant.',
      figure: { composant: 'cintrette-lab', attributs: { angle: '0' } }, clip: 'clips/1-4/05-zero.mp4',
      narration: 'On engage le tube bien au fond de la gorge, sans quoi il s’écrasera. Puis on fait coulisser le tube jusqu’à ce que le trait soit exactement en face du repère zéro de la cintrette. Le zéro, c’est l’endroit où le coude va commencer. Un millimètre d’écart ici, c’est un millimètre d’erreur sur la pièce. Dernière vérification : la ligne de contrôle est bien sur le dessus.' },
    { titre: 'Cintrer doucement, à deux mains', texte: 'Rapprochez les poignées lentement, d’un mouvement continu.',
      pointCle: 'Lentement, et d’un seul mouvement.',
      pourquoi: 'Trop vite, le tube s’ovalise ; s’il glisse, il plisse.',
      figure: { composant: 'cintrette-lab', attributs: { angle: '0' }, anime: true }, clip: 'clips/1-4/06-cintrer.mp4',
      narration: 'On rapproche les poignées lentement, sans à-coups. Le guide pousse le tube dans la gorge et l’enroule autour de la forme. Si l’on va trop vite, le tube n’a pas le temps de suivre : il s’aplatit, il s’ovalise. S’il glisse, il fait des plis à l’intérieur du coude. Un seul mouvement, régulier.' },
    { titre: 'Arrêter au repère des 90°', texte: 'Arrêtez quand le 0 arrive en face du repère des 90°. Relâchez et regardez l’équerrage.',
      pointCle: 'Le cuivre revient un peu en arrière quand on relâche.',
      pourquoi: 'C’est la détente du métal. On arrête quand, après la détente, le coude est d’équerre.',
      figure: { composant: 'cintrette-lab', attributs: { angle: '90' } }, clip: 'clips/1-4/07-arreter.mp4',
      narration: 'On arrête quand le zéro arrive en face du repère des quatre-vingt-dix degrés. Puis on relâche, et on regarde : le cuivre revient légèrement en arrière. C’est sa détente, comme un ressort. Si le coude n’est plus d’équerre après la détente, on cintre encore un tout petit peu. C’est l’équerrage final qui compte, pas le repère.' },
    { titre: 'Sortir la pièce', texte: 'Ouvrez les poignées et sortez le tube sans forcer.',
      pointCle: 'On ne redresse pas un coude à la main.',
      pourquoi: 'Chaque reprise écrouit le cuivre à cet endroit et l’abîme.',
      figure: { svg: 'coude', etat: 'equerre' }, clip: 'clips/1-4/08-sortir.mp4',
      narration: 'On ouvre les poignées, et le tube sort sans effort. Ne cherchez pas à corriger le coude à la main : chaque reprise durcit le cuivre à cet endroit et l’abîme. Votre pièce est faite. Place au contrôle.' }
  ],
  pieges: [
    { titre: 'Le coude écrasé', voit: 'Le tube est aplati dans le coude.', cause: 'Cintrage trop rapide, ou tube pas au fond de la gorge.',
      eviter: 'Tube au fond de la gorge, mouvement lent.', geste: 5, figure: { svg: 'coude', etat: 'ovale' },
      narration: 'Premier piège : le coude écrasé. Le tube s’est aplati, et le passage du fluide est réduit. Soit on a cintré trop vite, soit le tube n’était pas au fond de la gorge.' },
    { titre: 'Les plis', voit: 'Des plis en accordéon à l’intérieur du coude.', cause: 'Le tube a glissé pendant le cintrage.',
      eviter: 'Tube bien maintenu, un seul mouvement.', geste: 5, figure: { svg: 'coude', etat: 'pli' },
      narration: 'Deuxième piège : les plis à l’intérieur du coude. Le tube a glissé dans l’outil. Un coude plissé est à refaire.' },
    { titre: 'Le coude vrillé', voit: 'La ligne de contrôle a tourné ; la pièce sort de son plan.', cause: 'Le tube a tourné dans la gorge.',
      eviter: 'Ligne de contrôle sur le dessus, du début à la fin.', geste: 1, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Troisième piège : la vrille. La ligne de contrôle n’est plus sur le dessus, elle a tourné. La pièce ne sera pas plane. C’est exactement pour le voir que l’on trace cette ligne.' },
    { titre: 'Le coude trop long', voit: 'La branche dépasse 300 mm à l’axe.', cause: 'Le rayon n’a pas été retiré au traçage.',
      eviter: 'Tracer à 300 − Rc.', geste: 3, figure: { svg: 'coude', etat: 'rc' },
      narration: 'Quatrième piège : la branche trop longue, d’environ la valeur du rayon. On a tracé à trois cents au lieu de trois cents moins R c.' },
    { titre: 'Le coude trop court', voit: 'La branche est plus courte que prévu.', cause: 'Le trait n’était pas exactement sur le 0.',
      eviter: 'Aligner le trait pile sur le 0, et faire un essai sur une chute.', geste: 4, figure: { composant: 'cintrette-lab', attributs: { angle: '0' } },
      narration: 'Cinquième piège : la branche trop courte. Le trait n’était pas pile en face du zéro. Un seul millimètre d’écart au départ se retrouve sur la pièce.' },
    { titre: 'L’angle qui n’est pas à 90°', voit: 'Le coude s’ouvre un peu quand on relâche.', cause: 'Arrêt au repère sans tenir compte de la détente.',
      eviter: 'Relâcher, contrôler, reprendre un tout petit peu si besoin.', geste: 6, figure: { svg: 'coude', etat: 'equerre' },
      narration: 'Dernier piège : un angle un peu ouvert. On s’est arrêté au repère, mais le cuivre s’est détendu. C’est l’équerre qui décide, pas le repère.' }
  ],
  controles: [
    { question: 'La branche mesure-t-elle 300 mm à l’axe (± 3) ?', comment: 'Plaquez la branche contre la butée, mesurez jusqu’au bord de l’autre branche, retirez la moitié du diamètre du tube. Trois mesures.',
      siNon: 'Trop long : Rc non retiré. Trop court : trait mal posé sur le 0.', geste: 3,
      aValider: 'Retrait de la moitié du diamètre : écrit pour le multicouche Ø16 (8 mm) ; pour le cuivre, D/2 du tube utilisé',
      figure: { svg: 'coude', etat: 'rc' }, narration: 'Premier contrôle : la cote à l’axe, contre la butée, trois fois.' },
    { question: 'Le coude est-il à 90° ?', comment: 'Posez l’équerre : les deux branches la touchent.', siNon: 'Reprenez un tout petit peu à la cintrette, sans forcer.', geste: 6,
      figure: { svg: 'coude', etat: 'equerre' }, narration: 'Deuxième contrôle : l’équerre touche les deux branches.' },
    { question: 'Le tube est-il resté rond dans le coude ?', comment: 'Une chute de tube passe encore dans le coude.', siNon: 'Coude écrasé : pièce à refaire, plus lentement.', geste: 5,
      figure: { svg: 'coude', etat: 'ovale' }, narration: 'Troisième contrôle : le coude n’est pas écrasé.' },
    { question: 'La ligne de contrôle est-elle restée droite, sur le dessus ?', comment: 'Suivez-la des yeux d’un bout à l’autre.', siNon: 'Coude vrillé : pièce à refaire, ligne sur le dessus.', geste: 1,
      figure: { svg: 'coude', etat: 'vrille' }, narration: 'Quatrième contrôle : pas de vrille.' },
    { question: 'Le tube est-il sans pli ni marque ?', comment: 'Regardez l’intérieur et l’extérieur du coude.', siNon: 'Pièce à refaire : le tube a glissé ou le guide l’a marqué.', geste: 5,
      figure: { svg: 'coude', etat: 'pli' }, narration: 'Dernier contrôle : ni pli ni marque.' }
  ],
  prof: {
    verifie: ['Le rayon Rc trouvé par l’essai', 'La cote à l’axe et l’angle', 'L’aspect : ni écrasé, ni plissé, ni vrillé'],
    narration: 'Le professeur regarde votre coude d’essai, le rayon que vous avez trouvé, puis la pièce : sa cote, son angle et son aspect. Si tout est bon, vous savez cintrer à la cintrette. La station suivante vous attend avec un outil plus précis : la cintreuse à levier.'
  }
});
