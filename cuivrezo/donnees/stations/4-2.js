/* Station 4-2 — La baïonnette (le décalage). Source : sources-metier/4-pieces-complexes.md (partie 2)
   Méthode retenue : la méthode de chantier à 45° (fiche Rothenberger 8, recueil de façonnage, analyse
   baïonnette) : premier coude à 45°, retourner, régler le décalage à la règle, second coude à 45°.
   Les fiches divergent sur l'angle (20/45/60° selon la hauteur ; formule Rothenberger 90° × d / 2 Rc +
   correctif) : TRANCHÉ le 30/09/2026, 45° pour tous les exercices (DECISIONS-2026-09-30.md).
   Tolérance des fiches : ± 2 mm. */
CUIVREZO.stations.push({
  id: '4-2', ligne: 4, titre: 'La baïonnette', duree: '35 min', vignette: 'images/4-2-baionnette.webp',
  sources: ['sources-metier/4-pieces-complexes.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Deux branches parallèles, décalées à la cote',
    texte: 'Deux coudes égaux en sens opposés décalent le tube parallèlement à lui-même, de la valeur du plan.',
    criteres: ['Les deux branches parallèles', 'Le décalage à la cote du plan (± 2 mm)', 'Les deux coudes au même angle', 'Pièce plane, tube ni écrasé ni pincé'],
    figure: { composant: 'cuivre-3d', attributs: { piece: 'baionnette', angle: '90' }, legende: 'Deux coudes égaux, en sens opposés : le décalage.' },
    narration: 'La baïonnette sert à rattraper une différence d’axe : un tube qui doit se décaler de quelques centimètres pour rejoindre un raccord, ou pour longer un mur. Deux coudes identiques, en sens opposés, et le tube repart parallèle à lui-même. Tout tient dans ce mot : parallèle. Si les deux coudes ne sont pas exactement égaux, les branches divergent, et le raccord n’arrive jamais en face.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/4-2-baionnette.webp', alt: 'Une baïonnette en cuivre contrôlée à la règle et à l’équerre' },
    items: [
      { nom: 'Le plan : le décalage à obtenir', detail: 'd’axe à axe' },
      { nom: 'La cintrette ou la cintreuse du tube', detail: 'stations 1.4 et 1.5' },
      { nom: 'Un tube recuit, coupé et ébavuré', detail: 'avec de la longueur en plus' },
      { nom: 'La règle, l’équerre, la fausse équerre réglée à 45°', detail: 'pour le décalage, le parallélisme et l’angle' }
    ],
    narration: 'Même outillage que pour un coude, avec deux instruments de contrôle en plus : la fausse équerre réglée à quarante-cinq degrés, pour que les deux coudes soient identiques, et la règle, qui sert à la fois à régler le décalage et à vérifier que les branches sont parallèles.'
  },
  gestes: [
    { titre: 'Tracer le début du premier coude', texte: 'Tracez sur le tube la cote du plan : c’est là que commence le premier coude.',
      pointCle: 'Mesurée contre une butée, comme toujours.',
      pourquoi: 'Ce trait fixe la longueur de la première branche.',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/4-2/01-tracer.mp4',
      narration: 'On commence par tracer le départ du premier coude, à la cote du plan, mesurée contre une butée. Ce trait fixe la longueur de la première branche droite.' },
    { titre: 'Cintrer le premier coude à 45°', texte: 'Placez le trait au départ du cintrage et cintrez à 45°. Contrôlez à la fausse équerre.',
      pointCle: '45°, pas « à peu près ».',
      pourquoi: 'Le second coude devra être exactement le même : c’est celui-ci qui sert de modèle.',
      figure: { composant: 'cuivre-3d', attributs: { piece: 'baionnette', angle: '45' } }, clip: 'clips/4-2/02-premier.mp4',
      narration: 'On place le trait au départ du cintrage, et l’on cintre à quarante-cinq degrés. On vérifie tout de suite à la fausse équerre : ce premier coude sert de modèle au second, qui devra lui être parfaitement identique.' },
    { titre: 'Retourner le tube', texte: 'Sortez le tube et retournez-le, pour cintrer le second coude dans l’autre sens.',
      pointCle: 'Le second coude tourne en sens inverse, dans le même plan.',
      pourquoi: 'Deux coudes dans le même sens feraient un virage, pas un décalage.',
      figure: { svg: 'baionnette', etat: 'premier' }, clip: 'clips/4-2/03-retourner.mp4',
      narration: 'On sort le tube et on le retourne, sans le faire tourner autour de son axe : le second coude doit tourner dans l’autre sens, mais dans le même plan que le premier. Deux coudes dans le même sens feraient un virage, pas une baïonnette.' },
    { titre: 'Régler le décalage à la règle', texte: 'Faites coulisser le tube dans l’outil jusqu’à ce que le décalage mesuré soit celui du plan, règle parallèle au tube.',
      pointCle: 'Le décalage se mesure d’axe à axe.',
      pourquoi: 'C’est la position du second coude qui décide du décalage final.',
      figure: { svg: 'baionnette', etat: 'deplacer' }, clip: 'clips/4-2/04-decalage.mp4',
      narration: 'Voici le geste qui fait la baïonnette. On fait coulisser le tube dans l’outil, et l’on mesure, avec la règle posée parallèle au tube, l’écart entre la première branche et la ligne du futur second coude. Quand cet écart est celui du plan, d’axe à axe, on bloque le tube.' },
    { titre: 'Cintrer le second coude à 45°', texte: 'Cintrez jusqu’à ce que les deux branches soient parallèles.',
      pointCle: 'Même angle que le premier : 45°.',
      pourquoi: 'Deux coudes égaux, et la seconde branche repart parallèle à la première.',
      figure: { svg: 'baionnette', etat: 'parallele' }, clip: 'clips/4-2/05-second.mp4',
      narration: 'On cintre le second coude, jusqu’à quarante-cinq degrés, c’est-à-dire jusqu’à ce que la seconde branche soit parallèle à la première. On contrôle à la fausse équerre : les deux angles doivent être identiques.' },
    { titre: 'Contrôler le parallélisme et le décalage', texte: 'Règle contre une branche, équerre contre l’autre : parallèles. Mesurez le décalage, posez la pièce à plat.',
      pointCle: 'Parallèles, à la cote, à plat.',
      pourquoi: 'C’est ce qui permettra au raccord d’arriver exactement en face.',
      figure: { img: 'images/4-2-baionnette.webp', alt: 'Contrôle du parallélisme à la règle et à l’équerre' }, clip: 'clips/4-2/06-controle.mp4',
      narration: 'Dernier geste : le contrôle. La règle le long d’une branche, l’équerre contre l’autre : les deux branches sont parallèles. On mesure le décalage, d’axe à axe. Et on pose la pièce à plat : elle doit reposer sur l’établi sur toute sa longueur.' }
  ],
  pieges: [
    { titre: 'Les branches qui divergent', voit: 'Les deux branches ne sont pas parallèles.', cause: 'Les deux coudes n’ont pas le même angle.',
      eviter: 'Fausse équerre à 45° sur chaque coude.', geste: 4, figure: { svg: 'baionnette', etat: 'tordue' },
      narration: 'Premier piège : les branches qui s’écartent. Les deux coudes n’avaient pas le même angle. La fausse équerre, réglée une fois pour toutes, évite cet écart.' },
    { titre: 'Le décalage faux', voit: 'Le décalage mesuré n’est pas celui du plan.', cause: 'Le second coude a été placé au jugé.',
      eviter: 'Régler le décalage à la règle avant de cintrer.', geste: 3, figure: { svg: 'baionnette', etat: 'deplacer' },
      narration: 'Deuxième piège : un décalage faux. On a placé le second coude au jugé. La règle, parallèle au tube, règle ce décalage avant de cintrer.' },
    { titre: 'La pièce gauchie', voit: 'Posée à plat, la pièce bascule.', cause: 'Le tube a tourné autour de son axe en le retournant.',
      eviter: 'Retourner sans faire tourner ; vérifier la planéité avant le second coude.', geste: 2, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Troisième piège : la pièce gauchie. En retournant le tube, on l’a fait tourner sur lui-même. Les deux coudes ne sont plus dans le même plan.' },
    { titre: 'Le coude pincé', voit: 'Un coude aplati.', cause: 'Tube écroui, ou cintrage forcé.',
      eviter: 'Tube recuit, mouvement lent.', geste: 1, figure: { svg: 'coude', etat: 'ovale' },
      narration: 'Dernier piège : le coude pincé ou aplati, qui réduit le passage du fluide.' }
  ],
  controles: [
    { question: 'Les deux branches sont-elles parallèles ?', comment: 'Règle contre une branche, équerre contre l’autre.', siNon: 'Reprenez le second coude jusqu’au parallélisme.', geste: 4,
      figure: { svg: 'baionnette', etat: 'parallele' }, narration: 'Premier contrôle : les branches parallèles.' },
    { question: 'Le décalage est-il celui du plan (± 2 mm) ?', comment: 'Mesurez d’axe à axe.', siNon: 'Le second coude était mal placé : refaites la pièce.', geste: 3,
      figure: { svg: 'baionnette', etat: 'plan' }, narration: 'Deuxième contrôle : le décalage, d’axe à axe.' },
    { question: 'Les deux coudes ont-ils le même angle ?', comment: 'Fausse équerre sur chacun.', siNon: 'Corrigez le coude qui s’écarte de 45°.', geste: 1,
      figure: { svg: 'baionnette', etat: 'premier' }, narration: 'Troisième contrôle : deux angles identiques.' },
    { question: 'La pièce est-elle plane, sans pincement ?', comment: 'Posez-la à plat ; regardez les coudes.', siNon: 'Pièce à refaire.', geste: 2,
      figure: { svg: 'coude', etat: 'ovale' }, narration: 'Dernier contrôle : à plat, sans pincement.' }
  ],
  prof: {
    verifie: ['Le parallélisme des branches', 'Le décalage, d’axe à axe', 'Les deux angles égaux', 'La planéité et l’aspect'],
    narration: 'Le professeur contrôle d’abord le parallélisme, puis le décalage, et regarde vos deux coudes. Une baïonnette juste, c’est un raccord qui arrive pile en face.'
  }
});
