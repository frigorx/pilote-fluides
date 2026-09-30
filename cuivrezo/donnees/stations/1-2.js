/* Station 1-2 — Mesurer et tracer. Source : sources-metier/1-2-mesurer-tracer.md
   ATTENTION : aucune fiche ne décrit ce geste complet sur tube droit. Le pas à pas est reconstitué
   à partir de fragments (tp-cintrage : mesurer contre une butée ; fiches de façonnage) : il est à
   faire valider par F. Henninot avant de filmer. L'instrument de traçage (feutre, crayon, pointe)
   n'est pas tranché par les fiches. */
CUIVREZO.stations.push({
  id: '1-2', ligne: 1, titre: 'Mesurer et tracer', duree: '15 min',
  sources: ['sources-metier/1-2-mesurer-tracer.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S21] },
  obtenir: {
    titre: 'Un trait fin, à la bonne cote, sur tout le tour',
    texte: 'Le tube porte un trait net, exactement à la cote du plan, qui fait le tour complet du tube.',
    criteres: ['Le trait à la cote du plan (pièce finie : ± 2 mm)', 'Un trait fin et net : on sait où couper', 'Le trait fait tout le tour du tube', 'Le trait est perpendiculaire au tube'],
    figure: { svg: 'mesure', etat: 'trait', legende: 'Un trait fin, sur tout le tour du tube.' },
    narration: 'Tout le façonnage commence par un trait. Une coupe, un coude, un dudgeon : chaque geste se fait sur un trait, et chaque trait vient d’une mesure. Une erreur de deux millimètres ici, et c’est toute la pièce qui est fausse, quel que soit le soin que vous mettrez ensuite. Cette station vous apprend à mesurer d’une façon qui ne peut pas glisser : contre une butée.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/1-2-tracer.webp', alt: 'Tube et mètre contre une équerre, tracé au feutre' },
    items: [
      { nom: 'Le mètre à ruban', detail: 'crochet en bon état' },
      { nom: 'L’équerre', detail: 'posée à plat : c’est la butée' },
      { nom: 'Le feutre fin', detail: 'pour un trait fin et visible', aValider: 'Instrument de traçage à trancher : feutre, crayon ou pointe à tracer' },
      { nom: 'Le plan, ou la cote à tracer', detail: 'donné par le professeur' },
      { nom: 'Le tube, bout coupé d’équerre', detail: 'le bout de départ doit être droit' }
    ],
    narration: 'Trois outils suffisent : un mètre à ruban, une équerre et un feutre fin. L’équerre sert ici de butée : c’est contre elle que partiront le tube et le mètre. Pour tracer, un feutre fin laisse un trait bien visible sur le cuivre sans le rayer. Et le tube doit avoir un bout de départ coupé d’équerre, sinon la mesure part de travers.'
  },
  gestes: [
    { titre: 'Lire la cote et le diamètre', texte: 'Sur le plan, repérez la cote en millimètres et le diamètre du tube en pouces.',
      pointCle: 'La cote en mm, le tube en pouces : 70 mm de tube 1/4″.',
      pourquoi: 'Deux unités se croisent sur un même plan. Les confondre, c’est prendre le mauvais tube ou tracer la mauvaise longueur.',
      figure: { svg: 'pouce', etat: 'fraction' }, clip: 'clips/1-2/01-lire-plan.mp4',
      narration: 'Avant de toucher le mètre, on lit le plan. Deux informations, dans deux unités différentes : la longueur, en millimètres, et le tube, en pouces. Soixante-dix millimètres de tube un quart, par exemple. On les lit toutes les deux, et on prend le bon tube avant de mesurer.' },
    { titre: 'Choisir le bout de référence', texte: 'Décidez de quel bout part la cote. Ce sera toujours le même.',
      pointCle: 'Attention au sens de la cote.',
      pourquoi: 'Une cote mesurée depuis le mauvais bout donne un trait au mauvais endroit, surtout sur une pièce à plusieurs coudes.',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/1-2/02-reference.mp4',
      narration: 'Une cote part toujours de quelque part. Sur un tube droit, peu importe le bout, mais on en choisit un et on s’y tient. Sur une pièce à plusieurs coudes, le sens de la cote devient essentiel : c’est lui qui dira, plus tard, sur quel repère de la cintreuse poser le trait.' },
    { titre: 'Plaquer le tube contre la butée', texte: 'Posez l’équerre à plat sur l’établi. Poussez le bout de référence du tube contre elle.',
      pointCle: 'Le bout touche l’équerre, sans jour.',
      pourquoi: 'La butée fixe le départ de la mesure : il ne peut plus glisser pendant que vous lisez.',
      aValider: 'La mesure contre une butée est écrite pour un coude fini (tp-cintrage) ; sa reprise pour un tube droit est à valider',
      figure: { img: 'images/1-2-tracer.webp', alt: 'Tube plaqué contre l’équerre' }, clip: 'clips/1-2/03-butee.mp4',
      narration: 'Voici le cœur de la méthode. On pose l’équerre à plat sur l’établi, et on pousse le bout du tube contre elle. Pourquoi ? Parce qu’un mètre tenu en l’air, au bout d’un tube qui roule, se décale à chaque seconde. Contre une butée, le point de départ ne bouge plus.' },
    { titre: 'Poser le mètre contre la même butée', texte: 'Posez le ruban le long du tube, son crochet poussé contre l’équerre.',
      pointCle: 'Tube et mètre partent du même point.',
      pourquoi: 'Le crochet du mètre bouge un peu : poussé contre une butée, il recule de son épaisseur, et la mesure reste juste.',
      aValider: 'Le jeu du crochet n’est décrit dans aucune fiche : savoir général',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/1-2/04-metre.mp4',
      narration: 'On déroule le mètre le long du tube, et on pousse son crochet contre la même équerre. Tube et mètre partent maintenant du même point. Vous avez peut-être remarqué que le crochet d’un mètre bouge un peu : ce n’est pas un défaut. Il recule de son épaisseur quand on le pousse, et avance quand on l’accroche, pour que la mesure reste juste dans les deux cas.' },
    { titre: 'Lire la cote de face', texte: 'Placez l’œil juste au-dessus de la graduation.',
      pointCle: 'L’œil au-dessus du trait, jamais de biais.',
      pourquoi: 'Vue de biais, la graduation semble décalée de un ou deux millimètres.',
      aValider: 'L’erreur de lecture de biais n’est pas dans les fiches',
      figure: { svg: 'mesure', etat: 'lecture' }, clip: 'clips/1-2/05-lire.mp4',
      narration: 'Pour lire, on met l’œil juste au-dessus de la graduation. Le ruban est posé à côté du tube, pas dessus : vu de biais, le trait de la graduation semble glisser d’un ou deux millimètres. Deux millimètres, c’est la tolérance entière d’une pièce de CAP.' },
    { titre: 'Marquer un trait fin', texte: 'Au feutre fin, marquez un petit trait sur le tube, pile en face de la graduation.',
      pointCle: 'Un trait fin : son milieu est la cote.',
      pourquoi: 'Un trait épais fait un millimètre de large : on ne sait plus de quel côté couper.',
      figure: { img: 'images/1-2-tracer.webp', alt: 'Tracé au feutre fin en face de la graduation' }, clip: 'clips/1-2/06-marquer.mp4',
      narration: 'On marque un petit trait sur le tube, au feutre fin, pile en face de la graduation. Fin, parce qu’un gros trait fait presque un millimètre de large : au moment de couper, on ne saurait plus s’il faut couper à gauche, au milieu ou à droite du trait.' },
    { titre: 'Faire le tour du tube', texte: 'Tenez le feutre immobile sur le trait et faites tourner le tube : le trait fait le tour.',
      pointCle: 'Le tube tourne, le feutre ne bouge pas.',
      pourquoi: 'Le coupe-tube tourne autour du tube : il doit trouver le trait partout. Et un trait qui fait le tour montre tout de suite s’il est de travers.',
      aValider: 'La méthode du tour complet n’est décrite dans aucune fiche : seul le résultat est demandé',
      figure: { svg: 'mesure', etat: 'trait' }, clip: 'clips/1-2/07-tour.mp4',
      narration: 'Un petit trait d’un côté ne suffit pas : le coupe-tube tourne autour du tube, et la molette doit trouver le trait sur tout le tour. On tient le feutre immobile, posé sur le trait, et on fait rouler le tube d’un tour. Le trait se referme sur lui-même. S’il ne se referme pas, le feutre a bougé : on recommence.' },
    { titre: 'Remesurer', texte: 'Replacez tube et mètre contre la butée, et relisez. Trois mesures, pas une seule.',
      pointCle: 'Trois fois la même valeur, ou on ne coupe pas.',
      pourquoi: 'On recoupe un tube trop long ; un tube trop court est perdu.',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/1-2/08-remesurer.mp4',
      narration: 'Avant de couper, on remesure. Une fois, deux fois, trois fois, en replaçant chaque fois le tube et le mètre contre la butée. Trois mesures qui donnent la même valeur, c’est un trait juste. Rappelez-vous : un tube trop long se recoupe, un tube trop court est perdu.' }
  ],
  pieges: [
    { titre: 'La cote prise du mauvais bout', voit: 'Le trait est au bon nombre de millimètres, mais depuis l’autre bout.', cause: 'Bout de référence changé en cours de route.',
      eviter: 'Choisir le bout de référence avant de mesurer, et s’y tenir.', geste: 1, figure: { svg: 'mesure', etat: 'butee' },
      narration: 'Premier piège : mesurer depuis le mauvais bout. Le nombre est juste, l’emplacement est faux. Sur un tube droit, cela ne change rien ; sur une pièce à plusieurs coudes, tout est décalé.' },
    { titre: 'Le tube qui ne touche pas la butée', voit: 'Une pièce trop longue ou trop courte de quelques millimètres.', cause: 'Un jour entre le bout du tube et l’équerre.',
      eviter: 'Pousser le tube contre l’équerre à chaque mesure.', geste: 2, aValider: 'Piège déduit de la méthode, non écrit dans les fiches',
      figure: { svg: 'mesure', etat: 'butee' },
      narration: 'Deuxième piège : le tube a reculé, et un jour s’est ouvert entre son bout et l’équerre. La mesure part de l’équerre, pas du tube : la cote est fausse du jour exactement. On repousse le tube contre la butée à chaque mesure.' },
    { titre: 'La lecture de biais', voit: 'Un ou deux millimètres d’écart, sans comprendre pourquoi.', cause: 'L’œil n’était pas au-dessus de la graduation.',
      eviter: 'L’œil juste au-dessus du trait.', geste: 4, aValider: 'Non écrit dans les fiches', figure: { svg: 'mesure', etat: 'parallaxe' },
      narration: 'Troisième piège, sournois : la lecture de biais. Le mètre dit juste, mais l’œil le lit de côté, et on croit voir soixante-douze au lieu de soixante-dix. La solution tient en une position : l’œil au-dessus du trait.' },
    { titre: 'Le trait épais', voit: 'On hésite au moment de couper : à gauche ou à droite du trait ?', cause: 'Feutre trop gros, ou trait repassé plusieurs fois.',
      eviter: 'Un feutre fin, un seul trait.', geste: 5, aValider: 'Non écrit dans les fiches', figure: { svg: 'mesure', etat: 'lecture' },
      narration: 'Quatrième piège : le trait trop épais. Il fait un millimètre de large, et on ne sait plus où couper. Un feutre fin, un seul passage.' },
    { titre: 'La rayure profonde', voit: 'Un sillon gravé dans le cuivre.', cause: 'Une pointe à tracer appuyée sur le tube.',
      eviter: 'Tracer au feutre fin, sans entailler la paroi.', geste: 5,
      aValider: 'Hypothèse : la paroi fait 0,6 à 1 mm ; une rayure profonde pourrait la fragiliser. À trancher par F. Henninot',
      figure: { svg: 'tube', etat: 'section' },
      narration: 'Dernier piège possible : graver le trait à la pointe à tracer. La paroi d’un tube frigorifique ne fait qu’un millimètre environ ; une entaille profonde l’affaiblit à l’endroit même où l’on va la travailler. Le feutre fin suffit.' }
  ],
  controles: [
    { question: 'Mon trait est-il à la cote du plan ?', comment: 'Tube et mètre contre la butée, lisez de face.', siNon: 'Effacez et retracez à la bonne cote.', geste: 2,
      figure: { svg: 'mesure', etat: 'butee' }, narration: 'Premier contrôle : la cote, relue contre la butée.' },
    { question: 'Trois mesures donnent-elles la même valeur ?', comment: 'Replacez tout contre la butée à chaque fois.', siNon: 'Cherchez ce qui bouge : le tube, le crochet, votre œil.', geste: 7,
      figure: { svg: 'mesure', etat: 'lecture' }, narration: 'Deuxième contrôle : trois mesures, une seule valeur.' },
    { question: 'Mon trait est-il fin et net ?', comment: 'On voit sans hésiter où couper.', siNon: 'Effacez, retracez d’un seul passage au feutre fin.', geste: 5,
      figure: { svg: 'mesure', etat: 'lecture' }, narration: 'Troisième contrôle : le trait est fin, on sait où couper.' },
    { question: 'Le trait fait-il tout le tour ?', comment: 'Faites rouler le tube : le trait se referme sur lui-même.', siNon: 'Refaites le tour, feutre immobile.', geste: 6,
      figure: { svg: 'mesure', etat: 'trait' }, narration: 'Quatrième contrôle : le trait fait le tour du tube et se referme.' },
    { question: 'Le trait est-il perpendiculaire au tube ?', comment: 'Posez l’équerre contre le tube : le trait suit son bord.', siNon: 'Refaites le tour du tube, plus lentement.', geste: 6,
      aValider: 'Méthode de contrôle non décrite dans les fiches', figure: { svg: 'bout', etat: 'equerre' },
      narration: 'Dernier contrôle : le trait est bien droit, perpendiculaire au tube.' }
  ],
  prof: {
    verifie: ['La longueur tracée, avant toute coupe', 'Le trait : fin, sur tout le tour, perpendiculaire', 'La méthode : tube et mètre contre la butée, lecture de face'],
    narration: 'Avant de couper, on fait vérifier la longueur : c’est ce que demandent les fiches d’atelier. Le professeur relit votre trait, et il regarde comment vous avez mesuré. Une fois confirmé, vous pouvez passer à la coupe : c’est la station suivante.'
  }
});
