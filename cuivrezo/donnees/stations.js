/* FICHIER FABRIQUÉ par outils/construire.mjs — ne pas éditer : corriger donnees/commun.js ou donnees/stations/*.js */
/* CuivRézo — le commun des stations : lignes, référentiel. SOURCE UNIQUE avec donnees/stations/*.js.
   node outils/construire.mjs assemble le tout dans donnees/stations.js (fichier fabriqué : ne pas l'éditer).
   Chaque station suit le contrat des six temps écrits (moteur/station.js ; le défi, septième temps, se tire de ces données). Chaque texte affiché a sa
   `narration` à part, écrite pour l'oreille (charte VOIX-ET-NARRATION). Vouvoiement.
   `aValider` : ce qui n'est pas dans les fiches de F. Henninot et attend sa validation (visible avec ?revue).
   Codes du référentiel : sources-metier/referentiel-cap-ifca.md (arrêté du 2 juin 2015, CAP IFCA). */

var CUIVREZO = window.CUIVREZO = window.CUIVREZO || {};
CUIVREZO.stations = [];
CUIVREZO.lignes = { 1: 'Les gestes de base', 2: 'Le chalumeau', 3: 'Braser', 4: 'Les pièces complexes' };
CUIVREZO.lignesAVenir = [
  { n: 5, titre: 'Le réseau complet', contenu: 'piquage, dessautage, pièce d’examen : une ligne frigorifique façonnée de bout en bout' }
];

/* libellés exacts, lus dans l'arrêté (voir sources-metier/referentiel-cap-ifca.md) */
var REF = {
  T6: 'T6 Préparer, vérifier les matériels et les outillages',
  T10: 'T10 Repérer, raccorder, assembler les réseaux fluidiques, aérauliques et électriques',
  T12: 'T12 Respecter les consignes de sécurité et protéger la zone de travail durant les travaux',
  C22: 'C2.2 Contrôler les éléments nécessaires à la réalisation',
  C31: 'C3.1 Organiser le poste de travail',
  C34: 'C3.4 Façonner, raccorder, assembler, isoler, les circuits (frigorifique, hydraulique, aéraulique)',
  S02: 'S0.2 Gestion de l’environnement du site d’intervention et des déchets',
  S21: 'S2.1 Outils, normes et représentation',
  S55: 'S5.5 Réseaux fluidiques et mécanique des fluides',
  S62: 'S6.2 Connaissance des principaux risques et des moyens de prévention',
  S63: 'S6.3 Identification des dangers et prévention des risques',
  S64: 'S6.4 PRAP - SST'
};

/* l'échelle de F. Henninot, cinq niveaux, chacun avec son critère observable (mémoire « Échelle à CINQ niveaux ») ;
   une absence se note ABS, hors échelle */
CUIVREZO.echelle = [
  { n: 0, nom: 'Non évalué', critere: 'La station n’a pas été traitée.' },
  { n: 1, nom: 'Non acquis', critere: 'Pièce non conforme : le geste doit être remontré par le professeur.' },
  { n: 2, nom: 'En cours', critere: 'Pièce conforme après une reprise, ou avec l’aide du professeur.' },
  { n: 3, nom: 'Acquis', critere: 'Pièce conforme, geste correct, autocontrôle fait seul.' },
  { n: 4, nom: 'Parfaitement maîtrisé', critere: 'Pièce conforme du premier coup, geste sûr, et l’élève explique le pourquoi de chaque étape.' }
];

/* Station 1-0 — Mon poste de travail. Source : sources-metier/1-0-poste-de-travail.md
   L'étau est presque absent des fiches : mordaches, posture et hauteur TRANCHÉES le 30/09/2026 (DECISIONS-2026-09-30.md),
   de même que les lunettes (pendant tout le façonnage). */
CUIVREZO.stations.push({
  id: '1-0', ligne: 1, titre: 'Mon poste de travail', duree: '10 min',
  sources: ['sources-metier/1-0-poste-de-travail.md'],
  referentiel: { taches: [REF.T12], competences: [REF.C31], savoirs: [REF.S63, REF.S62, REF.S02, REF.S64] },
  obtenir: {
    titre: 'Un poste prêt, un élève protégé',
    texte: 'Avant le premier geste, vous êtes équipé, votre établi est dégagé, vos outils sont vérifiés et vous savez où sont les secours.',
    criteres: ['Tenue complète, chaussures de sécurité, rien qui flotte', 'Établi et passages dégagés, rien au sol', 'Outils du jour rassemblés et en bon état', 'Fiche de sécurité cochée, puis visée'],
    figure: { img: 'images/1-0-poste.webp', alt: 'Un élève équipé devant un établi rangé', legende: 'Équipé, établi dégagé, outils alignés, bac à chutes à côté.' },
    narration: 'Cette station ne fabrique pas de pièce. Elle prépare toutes les autres. À l’atelier, un tube coupé tranche comme une lame, un étau pince, et un poste encombré fait tomber les outils. Un bon professionnel ne commence jamais un geste sans avoir d’abord préparé son poste. C’est aussi ce que regarde l’examinateur : au CAP, un poste préparé fait partie de la note. Dix minutes, et vous serez prêt pour la journée.'
  },
  materiel: {
    titre: 'Ce que je dois avoir sur moi et près de moi',
    figure: { img: 'images/reprises/epi-familles.svg', alt: 'Les familles d’équipements de protection', legende: 'Les protections du métier.' },
    items: [
      { nom: 'Le bleu de travail', detail: 'ou une combinaison en coton, ni trop large, ni trop juste' },
      { nom: 'Les chaussures de sécurité', detail: 'aux pieds dès l’entrée dans l’atelier' },
      { nom: 'Les lunettes de protection', detail: 'sur les yeux pendant tout le façonnage' },
      { nom: 'Les gants de travail anti-coupure', detail: 'pour manipuler un tube coupé' },
      { nom: 'La fiche de sécurité à cocher', detail: 'celle de la séance du jour' },
      { nom: 'Le bac de récupération des chutes', detail: 'à portée de main, près de l’établi' }
    ],
    narration: 'Deux sortes de matériel ici. Ce que vous portez : le bleu, les chaussures de sécurité, les lunettes, les gants. Et ce qui organise le poste : la fiche de sécurité et le bac à chutes. Les chutes de cuivre se recyclent, et surtout elles coupent : elles ont leur place, et ce n’est ni l’établi ni le sol. Cochez chaque élément quand il est sur vous ou devant vous.'
  },
  gestes: [
    { titre: 'Je m’équipe', texte: 'Bleu de travail et chaussures de sécurité. Retirez bague et gourmette, attachez vos cheveux.',
      pointCle: 'Rien ne doit pendre ni flotter.',
      pourquoi: 'Un vêtement flottant, une gourmette ou des cheveux longs s’accrochent à un outil et vous entraînent avec lui.',
      figure: { img: 'images/1-0-poste.webp', alt: 'Élève en tenue de travail' }, clip: 'clips/1-0/01-equiper.mp4',
      narration: 'On commence par soi. Le bleu de travail, fermé. Les chaussures de sécurité, parce qu’un outil ou une barre de cuivre finit toujours par tomber. Puis on retire ce qui peut s’accrocher : la bague, la gourmette. Les cheveux longs s’attachent. Ce n’est pas une question de règlement : c’est ce qui s’accroche à un outil qui vous blesse.' },
    { titre: 'Je repère les secours', texte: 'Montrez du doigt l’arrêt d’urgence, la trousse de secours, l’extincteur et le point d’eau.',
      pointCle: 'Vous les montrez sans chercher.',
      pourquoi: 'En cas d’incident, il n’y a pas le temps de chercher. Le premier réflexe est de couper, puis d’appeler.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/1-0/02-secours.mp4',
      narration: 'Levez les yeux et repérez quatre choses : l’arrêt d’urgence, la trousse de secours, l’extincteur et le point d’eau. Montrez-les du doigt. Le jour où quelqu’un se coupe ou se brûle, personne n’aura le temps de chercher. Et même une petite coupure se signale et se désinfecte : une blessure au cuivre s’infecte facilement.' },
    { titre: 'Je dégage mon poste', texte: 'Dégagez l’établi et les passages. Rien au sol.',
      pointCle: 'Un sol libre, un établi libre.',
      pourquoi: 'On trébuche sur ce qui traîne, et un établi encombré fait tomber les outils.',
      figure: { svg: 'poste', etat: 'range' }, clip: 'clips/1-0/03-degager.mp4',
      narration: 'Regardez autour de vous. Un sac, une chute de tube, un outil par terre : c’est une chute de plain-pied qui attend quelqu’un. On dégage le sol, on dégage les passages, et on libère l’établi de tout ce qui ne sert pas à la séance.' },
    { titre: 'Je rassemble et je vérifie mes outils', texte: 'Posez sur l’établi les outils du jour. Vérifiez chacun : bien emmanché, molette libre, rien d’ébréché.',
      pointCle: 'Un outil douteux se pose de côté, et on le signale.',
      pourquoi: 'Un outil abîmé fait un mauvais travail, et il blesse.',
      figure: { img: 'images/1-0-poste.webp', alt: 'Outils alignés sur l’établi' }, clip: 'clips/1-0/04-outils.mp4',
      narration: 'Sortez les outils de la séance, et seulement ceux-là. Chacun passe entre vos mains : le manche tient, la molette du coupe-tube tourne librement, la lame n’est pas ébréchée. Si un outil vous paraît douteux, vous ne bricolez pas : vous le posez de côté et vous le signalez au professeur.' },
    { titre: 'Je coche ma fiche de sécurité', texte: 'Cochez la tâche du jour, les risques et les protections. Faites-la viser par le professeur.',
      pointCle: 'Pour le façonnage : coupures, projections, écrasement.',
      pourquoi: 'La fiche vous fait penser aux risques avant de les rencontrer. Le visa du professeur vous autorise à commencer.',
      figure: { img: 'images/reprises/fiche-securite.webp', alt: 'La fiche de sécurité à cocher', legende: 'La fiche de sécurité de l’atelier.' }, clip: 'clips/1-0/05-fiche.mp4',
      narration: 'La fiche de sécurité se remplit avant de commencer, pas après. On coche la tâche du jour, ici le façonnage. On coche les risques qu’elle apporte : les coupures, les projections, l’écrasement. Puis les protections qui y répondent. La fiche ne sert pas à faire plaisir au professeur : elle vous oblige à penser au danger avant de le rencontrer. Quand elle est visée, vous pouvez commencer.' },
    { titre: 'Lunettes et gants, au bon moment', texte: 'Lunettes sur les yeux pendant tout le façonnage : couper, ébavurer, cintrer, évaser. Gants pour toucher un tube coupé.',
      pointCle: 'Jamais de gants près d’un outil qui tourne tout seul, comme une perceuse à colonne.',
      pourquoi: 'La limaille vole vers les yeux, le bord coupé tranche les doigts. Mais un gant happé par une machine entraîne la main.',
      figure: { img: 'images/reprises/epi-porter-correctement.svg', alt: 'Lunettes portées sur les yeux, pas sur le front' }, clip: 'clips/1-0/06-epi.mp4',
      narration: 'Les lunettes se portent sur les yeux, pas sur le front, pendant tout le façonnage, pas seulement au moment de couper : la limaille vole aussi quand on ébavure, quand on cintre, quand on évase. Les gants protègent vos doigts du bord tranchant d’un tube coupé. Une seule exception, et elle est importante : près d’une machine qui tourne toute seule, comme une perceuse à colonne, on ne porte pas de gants, parce qu’un gant happé entraîne la main avec lui.' },
    { titre: 'Je serre l’étau sans me pincer', texte: 'Serrez progressivement, les doigts hors de l’axe de serrage. Pour un tube, des mordaches. Pieds stables, face à l’étau, mors à hauteur du coude.',
      pointCle: 'Juste de quoi tenir : un tube en cuivre s’écrase vite.',
      pourquoi: 'Entre les mors, c’est la zone de pincement. Et des mors striés marquent ou écrasent un tube mince.',
      figure: { img: 'images/1-0-etau.webp', alt: 'Serrer un tube dans un étau à mordaches' }, clip: 'clips/1-0/07-etau.mp4',
      narration: 'L’étau tient la pièce pour vous, mais il ne fait pas la différence entre un tube et un doigt. On serre progressivement, et les doigts restent hors de l’axe, jamais entre les mors. Pour un tube de cuivre, on pose des mordaches, des mors doux, parce que les mors striés marquent le cuivre, et qu’un serrage trop fort l’écrase. Juste de quoi tenir, pas plus. Et l’étau est à la bonne hauteur quand les mors sont au niveau de votre coude : ni penché, ni les bras en l’air.' },
    { titre: 'Je range au fil de l’eau', texte: 'Chaque outil tranchant revient à sa place. Chaque chute va au bac, debout, tout de suite.',
      pointCle: 'Jamais d’outil chez le voisin, jamais de chute sur l’établi.',
      pourquoi: 'Les chutes coupent, et un outil qui traîne tombe ou se perd.',
      figure: { svg: 'poste', etat: 'range' }, clip: 'clips/1-0/08-ranger.mp4',
      narration: 'Le rangement ne se fait pas qu’à la fin. Chaque fois que vous posez un outil tranchant, il retourne à sa place, et pas chez le voisin. Chaque chute de tube part au bac, debout, tout de suite : couchée sur l’établi, elle coupe la main qui passe. Un poste qui reste rangé pendant le travail, c’est un poste où l’on travaille vite.' },
    { titre: 'Je rends mon poste propre', texte: 'Desserrez la molette du coupe-tube, nettoyez et rangez les outils, triez les chutes, balayez. Retirez vos protections en dernier.',
      pointCle: 'Le poste suivant doit trouver un poste prêt.',
      pourquoi: 'Le cuivre se recycle. Et les protections protègent jusqu’au dernier geste, rangement compris.',
      figure: { svg: 'poste', etat: 'range' }, clip: 'clips/1-0/09-rendre.mp4',
      narration: 'En fin de séance, on rend le poste comme on voudrait le trouver. La molette du coupe-tube est desserrée, les outils sont nettoyés et rangés, les chutes triées dans le bac, parce que le cuivre se recycle. On balaie les copeaux. Et les protections se retirent en dernier : on se coupe aussi en rangeant.' }
  ],
  pieges: [
    { titre: 'Les protections oubliées ou retirées trop tôt', voit: 'Lunettes sur le front, gants dans la poche au moment de couper.', cause: 'L’habitude, ou la hâte de finir.',
      eviter: 'Fiche visée avant de commencer, protections retirées en dernier.', geste: 5,
      figure: { img: 'images/reprises/epi-porter-correctement.svg', alt: 'Lunettes remontées sur le front : incorrect' },
      narration: 'Le piège le plus courant n’est pas d’oublier les lunettes : c’est de les remonter sur le front juste au moment où la limaille vole. Une protection qui n’est pas en place ne protège rien. Elles se mettent avant le geste, et se retirent après le rangement.' },
    { titre: 'Le doigt nu sur un tube coupé', voit: 'Une coupure au doigt, souvent profonde.', cause: 'Un bord de tube coupé tranche comme une lame.',
      eviter: 'Gants pour manipuler, et ébavurer aussitôt après la coupe.', geste: 5,
      figure: { svg: 'bout', etat: 'bavure' },
      narration: 'Un tube fraîchement coupé a un bord tranchant, dedans comme dehors. Un doigt nu qui glisse dessus, et c’est la coupure. On manipule avec des gants, et on ébavure tout de suite après la coupe, ce qui rend aussi le bout moins dangereux.' },
    { titre: 'Les doigts dans l’étau', voit: 'Un doigt pincé ou écrasé.', cause: 'Serrage trop rapide, main entre les mors.',
      eviter: 'Serrer progressivement, doigts hors de l’axe de serrage.', geste: 6,
      figure: { svg: 'poste', etat: 'etau' },
      narration: 'L’étau ne s’arrête pas quand il rencontre un doigt. Le pincement arrive quand on serre vite en tenant la pièce trop près des mors. Serrer doucement, la main loin de la zone de pincement.' },
    { titre: 'La chute au sol', voit: 'Une chute de tube par terre ou sur l’établi.', cause: 'Rangement remis à plus tard.',
      eviter: 'Au bac, debout, tout de suite.', geste: 7,
      figure: { svg: 'poste', etat: 'range' },
      narration: 'Une chute au sol, c’est une glissade ; sur l’établi, c’est une coupure. Le bac est là pour ça, et on y met la chute debout, au moment où on la coupe, pas à la fin de la séance.' },
    { titre: 'Souffler dans un tube', voit: 'Rien, et c’est le problème.', cause: 'On veut chasser les copeaux.',
      eviter: 'Bout vers le bas et tapoter. Jamais de souffle, et les bouts restent bouchés.',
      figure: { svg: 'tube', etat: 'bouchons' },
      narration: 'Souffler dans un tube pour le nettoyer, c’est y mettre l’humidité de votre souffle. Dans un circuit frigorifique, cette eau devient un acide qui ronge le compresseur. Les copeaux se font tomber bout vers le bas, et un tube qui attend reste bouché.' }
  ],
  controles: [
    { question: 'Ma tenue est-elle complète ?', comment: 'Regardez vos manches, vos mains, vos pieds : bleu fermé, rien qui pend, chaussures de sécurité.',
      siNon: 'Complétez votre tenue avant de toucher un outil.', geste: 0, figure: { img: 'images/1-0-poste.webp', alt: 'Tenue complète' },
      narration: 'Premier contrôle, sur vous-même : les manches, les mains, les pieds.' },
    { question: 'Lunettes et gants sont-ils à portée de main ?', comment: 'Vous les avez sur vous avant de saisir le coupe-tube.',
      siNon: 'Allez les chercher maintenant, pas au moment de couper.', geste: 5, figure: { img: 'images/reprises/epi-familles.svg', alt: 'Les protections' },
      narration: 'Deuxième contrôle : les lunettes et les gants sont là, prêts, avant le premier geste.' },
    { question: 'Rien ne traîne au sol autour de moi ?', comment: 'Faites un tour du regard autour de votre poste.',
      siNon: 'Dégagez le sol et les passages.', geste: 2, figure: { svg: 'poste', etat: 'range' },
      narration: 'Troisième contrôle : un tour du regard autour du poste. Rien au sol.' },
    { question: 'Mes outils sont-ils en état ?', comment: 'Manches qui tiennent, molette libre, rien d’ébréché.',
      siNon: 'Posez l’outil douteux de côté et signalez-le.', geste: 3, figure: { svg: 'coupeTube', etat: '' },
      narration: 'Quatrième contrôle : vos outils. Un outil douteux ne sert pas, il se signale.' },
    { question: 'Je sais montrer l’arrêt d’urgence et la trousse ?', comment: 'Montrez-les du doigt sans chercher.',
      siNon: 'Repérez-les de nouveau, et retenez-les.', geste: 1, figure: { svg: 'poste', etat: 'secours' },
      narration: 'Cinquième contrôle : sans chercher, montrez l’arrêt d’urgence et la trousse de secours.' },
    { question: 'Ma fiche de sécurité est-elle cochée ?', comment: 'Tâche, risques et protections cochés, visa demandé.',
      siNon: 'Complétez-la et faites-la viser.', geste: 4, figure: { img: 'images/reprises/fiche-securite.webp', alt: 'La fiche de sécurité' },
      narration: 'Dernier contrôle : la fiche est cochée. Il ne manque que le visa du professeur.' }
  ],
  prof: {
    verifie: ['La tenue et les protections', 'La fiche de sécurité : il la vise', 'Les secours montrés sans hésiter', 'Le poste : dégagé au départ, propre à la fin'],
    narration: 'Votre poste est prêt. Le professeur vérifie votre tenue, vise votre fiche de sécurité, et vous demande peut-être de lui montrer l’arrêt d’urgence et la trousse. C’est lui qui vous autorise à commencer. Et à la fin de la séance, il regardera aussi comment vous avez rendu le poste.'
  }
});

/* Station 1-1 — Reconnaître le tube. Source : sources-metier/1-1-tube.md
   Tableau et règle de conversion : fiche S1.1 de F. Henninot (pouces × 25,4, deux décimales). */
CUIVREZO.stations.push({
  id: '1-1', ligne: 1, titre: 'Reconnaître le tube', duree: '15 min',
  sources: ['sources-metier/1-1-tube.md'],
  referentiel: { taches: [REF.T10, REF.T6], competences: [REF.C34, REF.C22], savoirs: [REF.S55] },
  obtenir: {
    titre: 'Le bon tube, nommé juste',
    texte: 'Devant un tube, vous dites son nom en pouces, sa valeur en millimètres et son état : recuit en couronne, ou écroui en barre. Ses bouts restent bouchés.',
    criteres: ['Le tube nommé par son diamètre extérieur, en pouces : « trois huitièmes »', 'Sa valeur en millimètres, juste : 3/8″ = 9,53 mm', 'Son état nommé : recuit (couronne) ou écroui (barre)', 'Ses bouts bouchés'],
    figure: { img: 'images/1-1-livraison.webp', alt: 'Une couronne de cuivre et des barres droites, bouts bouchés', legende: 'À gauche la couronne, à droite les barres : bouts bouchés.' },
    narration: 'En froid, les tubes de cuivre portent un nom en pouces : un quart, trois huitièmes, un demi. C’est une habitude venue des fabricants de matériel, et tout le métier parle ainsi : les raccords, les outils et les appareils. Pourtant votre mètre et votre pied à coulisse parlent en millimètres. Cette station vous apprend à passer de l’un à l’autre, et à reconnaître d’un regard si un tube se cintre à la main ou non.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { svg: 'tube', etat: 'section', legende: 'Un tube se nomme par son diamètre extérieur.' },
    items: [
      { nom: 'Le pied à coulisse', detail: 'à vernier ou à affichage, becs propres' },
      { nom: 'Des tubes de plusieurs diamètres', detail: 'en couronne et en barre' },
      { nom: 'La calculatrice', detail: 'pour vérifier la conversion' },
      { nom: 'Le tableau des diamètres', detail: 'il est dans cette station, au geste 6' }
    ],
    narration: 'Le pied à coulisse est l’instrument de la station. Il mesure au dixième de millimètre, bien mieux qu’un mètre, et c’est ce qu’il faut pour distinguer deux tubes voisins. Prenez aussi quelques tubes de diamètres différents, en couronne et en barre, et une calculatrice. Le tableau des diamètres frigorifiques est dans la station.'
  },
  gestes: [
    { titre: 'Regarder comment le tube est livré', texte: 'En couronne, le tube est recuit : il se cintre à la main. En barre droite, il est écroui : il reste rigide.',
      pointCle: 'Couronne = recuit. Barre = écroui.',
      pourquoi: 'Le même cuivre existe dans deux états. Le recuit est souple ; l’écroui est dur, et il doit être recuit avant d’être cintré ou évasé, sinon il se pince et casse.',
      figure: { svg: 'tube', etat: 'couronne-barre' }, clip: 'clips/1-1/01-livraison.mp4',
      narration: 'Premier indice, avant même de mesurer : la forme sous laquelle le tube est livré. Enroulé en couronne, il est recuit, c’est-à-dire souple : il se cintre à la main. Livré en barre droite, il est écroui, c’est-à-dire durci : il reste rigide, et il faut le recuire avant de le cintrer ou de l’évaser, sinon il se pince et il casse. Même métal, deux états.' },
    { titre: 'Regarder les bouts', texte: 'Les bouts d’un tube neuf sont bouchés, ou écrasés pour une couronne.',
      pointCle: 'Un tube frigorifique reste fermé jusqu’au dernier moment.',
      pourquoi: 'Il est livré propre et sec. L’humidité et la poussière qui entrent finissent en panne dans le circuit.',
      figure: { svg: 'tube', etat: 'bouchons' }, clip: 'clips/1-1/02-bouts.mp4',
      narration: 'Regardez ensuite les bouts. Un tube frigorifique est livré propre et sec, et ses extrémités sont bouchées, ou écrasées à la pince pour une couronne. Ce n’est pas un détail d’emballage : l’eau qui entre dans un circuit devient un acide qui ronge le compresseur, et la poussière bouche les capillaires. Un tube reste fermé jusqu’au moment où l’on s’en sert.' },
    { titre: 'Vérifier le zéro du pied à coulisse', texte: 'Fermez les becs : le zéro du vernier doit tomber pile sur le zéro de la règle.',
      pointCle: 'Becs joints, on lit 0.',
      pourquoi: 'Si le zéro est décalé, toutes les mesures le seront aussi.',
      figure: { svg: 'vernier', etat: 'zero' }, clip: 'clips/1-1/03-zero.mp4',
      narration: 'Avant toute mesure, on ferme les becs du pied à coulisse et on regarde les deux zéros : celui de la règle et celui du vernier, la petite échelle qui coulisse. Ils doivent être alignés. Un peu de saleté entre les becs, et le zéro se décale : toutes vos mesures seraient fausses, sans que vous le sachiez.' },
    { titre: 'Poser les becs sur l’extérieur du tube', texte: 'Ouvrez, posez le tube entre les grands becs, bien en travers de son axe, refermez jusqu’au contact, sans serrer. Refaites la mesure après un quart de tour du tube.',
      pointCle: 'C’est le diamètre EXTÉRIEUR qui nomme le tube.',
      pourquoi: 'Le raccord et l’écrou se montent sur l’extérieur du tube : c’est donc lui qui compte, et c’est lui que porte le nom.',
      figure: { img: 'images/1-1-pied.webp', alt: 'Les becs du pied à coulisse sur l’extérieur du tube' }, clip: 'clips/1-1/04-becs.mp4',
      narration: 'On ouvre le pied à coulisse et on place le tube entre les grands becs, bien en travers, puis on referme jusqu’à ce que les becs touchent le tube, sans serrer. On mesure l’extérieur, parce que c’est sur l’extérieur que viennent le raccord et l’écrou. C’est pour cela que le nom d’un tube frigorifique est toujours celui de son diamètre extérieur. Puis on tourne le tube d’un quart de tour et on mesure encore : si les deux valeurs sont presque les mêmes, le tube est rond.' },
    { titre: 'Lire la mesure', texte: 'Les millimètres entiers se lisent à gauche du zéro du vernier. Puis cherchez le trait du vernier qui tombe pile sur un trait de la règle : c’est le dixième.',
      pointCle: '9 mm entiers, trait aligné sur le 5 : 9,5 mm.',
      pourquoi: 'Le vernier partage le millimètre en dix. Le trait aligné dit combien de dixièmes s’ajoutent.',
      figure: { svg: 'vernier', etat: 'lecture' }, clip: 'clips/1-1/05-lire.mp4',
      narration: 'La lecture se fait en deux temps. D’abord les millimètres entiers : on regarde où tombe le zéro du vernier sur la règle. Ici, entre neuf et dix : neuf millimètres entiers. Ensuite les dixièmes : on cherche le trait du vernier qui tombe pile en face d’un trait de la règle. Ici, c’est le cinquième. Neuf millimètres et cinq dixièmes : neuf virgule cinq. Sur un pied à affichage, le chiffre est écrit, mais le zéro se vérifie quand même.' },
    { titre: 'Trouver le nom du tube', texte: 'Tapez votre mesure : la station cherche le tube frigorifique le plus proche.',
      pointCle: 'Votre mesure tombe près d’une ligne du tableau.',
      pourquoi: 'Un tube réel n’est jamais au centième près : on cherche la ligne la plus proche. Si aucune n’est proche, la mesure est à refaire.',
      figure: { outil: 'identifier' }, clip: null,
      narration: 'Votre mesure ne tombe jamais pile sur la valeur du tableau : le tube a une petite tolérance de fabrication, et votre lecture aussi. On cherche donc la ligne la plus proche. Tapez votre mesure : la station vous donne le nom du tube. Proche veut dire à moins de quatre dixièmes de millimètre : deux tubes voisins du tableau sont toujours plus éloignés que cela. Si elle ne trouve aucun tube proche, c’est presque toujours que le zéro était décalé, ou que les becs ne touchaient pas l’extérieur.' },
    { titre: 'Vérifier par le calcul', texte: 'Un pouce vaut 25,4 mm. La fraction multipliée par 25,4 donne les millimètres.',
      pointCle: '3/8 = 0,375 ; 0,375 × 25,4 = 9,525 ; arrondi : 9,53 mm.',
      pourquoi: 'Le calcul vous rend indépendant du tableau : sur chantier, vous retrouvez n’importe quel diamètre.',
      figure: { outil: 'convertir' }, clip: null,
      narration: 'Le tableau est pratique, mais un professionnel sait le refaire. Un pouce vaut vingt-cinq virgule quatre millimètres. Trois huitièmes de pouce, c’est donc trois huitièmes de vingt-cinq virgule quatre : on divise trois par huit, puis on multiplie par vingt-cinq virgule quatre. On trouve neuf virgule cinq cent vingt-cinq, qu’on arrondit au centième. Touchez une fraction : la station pose le calcul.' },
    { titre: 'Reboucher le tube', texte: 'Remettez le bouchon, ou écrasez le bout d’une couronne. Ne soufflez jamais dedans.',
      pointCle: 'Le tube ressort comme il est entré : fermé.',
      pourquoi: 'Votre souffle est humide. Dans un circuit, l’eau devient un acide.',
      figure: { svg: 'tube', etat: 'bouchons' }, clip: 'clips/1-1/08-reboucher.mp4',
      narration: 'Le tube a servi à la mesure : il retourne fermé à sa place. On remet le bouchon sur une barre, on écrase le bout d’une couronne. Et on ne souffle jamais dedans pour le nettoyer : votre souffle est humide, et l’humidité est l’ennemie d’un circuit frigorifique.' }
  ],
  pieges: [
    { titre: 'Mesurer l’intérieur', voit: 'Une mesure trop petite, qui ne correspond à aucun tube.', cause: 'Les becs placés à l’intérieur du tube.',
      eviter: 'Toujours l’extérieur, entre les grands becs.', geste: 3, figure: { svg: 'tube', etat: 'section' },
      narration: 'Premier piège : glisser les petits becs à l’intérieur du tube. On mesure alors le passage, pas le tube, et on trouve une valeur qui ne correspond à rien. Le nom d’un tube est celui de son diamètre extérieur.' },
    { titre: 'Le zéro oublié, la lecture à l’envers', voit: 'Une valeur décalée de quelques dixièmes, ou d’un millimètre.', cause: 'Zéro non vérifié, ou millimètres lus à droite du zéro du vernier.',
      eviter: 'Zéro vérifié becs fermés, millimètres lus à gauche du zéro.', geste: 2, figure: { svg: 'vernier', etat: 'zero' },
      narration: 'Deuxième piège, sur l’instrument : un zéro non vérifié, ou des millimètres lus du mauvais côté du zéro du vernier. Le résultat est faux, et il a l’air juste. D’où le réflexe : becs fermés, on vérifie le zéro avant de commencer.' },
    { titre: 'Oublier le pouce entier', voit: 'Un tube de 1″1/8 annoncé à 3 mm.', cause: 'On n’a calculé que le huitième.',
      eviter: '1″1/8, c’est 1 pouce ET 1/8 : 1,125 × 25,4 = 28,58 mm.', geste: 6, figure: { svg: 'pouce', etat: 'regle' },
      narration: 'Troisième piège, sur les gros diamètres : un pouce un huitième. Beaucoup ne calculent que le huitième et oublient le pouce entier devant. Un pouce un huitième, c’est un plus un huitième, soit un virgule cent vingt-cinq pouce : vingt-huit virgule cinquante-huit millimètres.' },
    { titre: 'Le tube laissé ouvert', voit: 'Rien à l’œil : la saleté et l’humidité sont déjà entrées.', cause: 'Bouchon oublié, ou tube soufflé.',
      eviter: 'Reboucher tout de suite, ne jamais souffler.', geste: 7, figure: { svg: 'tube', etat: 'bouchons' },
      narration: 'Quatrième piège : le tube laissé ouvert sur l’établi. On ne voit rien, et c’est le problème : la poussière et l’humidité sont entrées, et on les retrouvera un jour sous forme de panne.' },
    { titre: 'La barre cintrée sans recuit', voit: 'Un pli, une cassure dans le coude.', cause: 'Le tube était écroui et on l’a pris pour un recuit.',
      eviter: 'Reconnaître l’état avant de façonner : barre = écroui.', geste: 0, figure: { svg: 'tube', etat: 'couronne-barre' },
      narration: 'Dernier piège : prendre une barre pour un tube souple et la cintrer telle quelle. Le cuivre écroui se pince, se plie mal et casse. Reconnaître l’état du tube avant de le façonner, c’est ce qui évite de gâcher une barre.' }
  ],
  controles: [
    { question: 'Le zéro était-il juste ?', comment: 'Becs fermés, on lit 0.', siNon: 'Nettoyez les becs, vérifiez de nouveau, puis remesurez.', geste: 2,
      figure: { svg: 'vernier', etat: 'zero' }, narration: 'Premier contrôle : le zéro, becs fermés.' },
    { question: 'Ma mesure tombe-t-elle près d’une ligne du tableau ?', comment: 'Tapez-la dans l’identificateur.', siNon: 'Remesurez : becs sur l’extérieur, sans serrer.', geste: 3,
      figure: { outil: 'identifier' }, narration: 'Deuxième contrôle : votre mesure tombe près d’un tube du tableau.' },
    { question: 'Le calcul confirme-t-il ?', comment: 'La fraction × 25,4, arrondie au centième.', siNon: 'Refaites le calcul pas à pas : la fraction d’abord en décimal.', geste: 6,
      figure: { outil: 'convertir' }, narration: 'Troisième contrôle : le calcul donne bien la valeur du tableau.' },
    { question: 'Le nom du tube va-t-il avec l’outil ou le raccord ?', comment: 'Un tube 1/4″ avec une cintreuse 1/4″ et un écrou 1/4″.', siNon: 'Changez d’outil ou de raccord : on ne mélange jamais les diamètres.', geste: 5,
      figure: { svg: 'pouce', etat: 'fraction' }, narration: 'Quatrième contrôle : le tube, l’outil et le raccord portent le même nom.' },
    { question: 'J’ai nommé l’état du tube ?', comment: 'Couronne : recuit. Barre : écroui.', siNon: 'Regardez comment il a été livré.', geste: 0,
      figure: { svg: 'tube', etat: 'couronne-barre' }, narration: 'Cinquième contrôle : l’état du tube est nommé.' },
    { question: 'Les bouts sont-ils rebouchés ?', comment: 'Bouchon sur la barre, bout écrasé sur la couronne.', siNon: 'Rebouchez maintenant.', geste: 7,
      figure: { svg: 'tube', etat: 'bouchons' }, narration: 'Dernier contrôle : le tube est refermé.' }
  ],
  prof: {
    verifie: ['Le diamètre dit en pouces (« un demi-pouce ») et en millimètres', 'Le geste au pied à coulisse : zéro, becs, lecture', 'Le calcul écrit et juste', 'L’état du tube nommé, les bouts refermés'],
    narration: 'Le professeur vous tend un tube que vous n’avez pas encore vu. Vous le mesurez devant lui, vous dites son nom en pouces, sa valeur en millimètres, et son état. C’est la preuve que vous savez le faire seul, avec n’importe quel tube.'
  }
});

/* Station 1-2 — Mesurer et tracer. Source : sources-metier/1-2-mesurer-tracer.md
   ATTENTION : aucune fiche ne décrit ce geste complet sur tube droit. Le pas à pas est reconstitué
   à partir de fragments (tp-cintrage : mesurer contre une butée ; fiches de façonnage). Chaque point
   a été TRANCHÉ le 30/09/2026 (DECISIONS-2026-09-30.md), dont l'instrument de traçage : le feutre fin,
   jamais la pointe à tracer sur le cuivre. Le geste se confirme au tournage. */
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
      { nom: 'Le feutre fin', detail: 'pour un trait fin et visible, sans rayer le cuivre' },
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
      figure: { img: 'images/1-2-tracer.webp', alt: 'Tube plaqué contre l’équerre' }, clip: 'clips/1-2/03-butee.mp4',
      narration: 'Voici le cœur de la méthode. On pose l’équerre à plat sur l’établi, et on pousse le bout du tube contre elle. Pourquoi ? Parce qu’un mètre tenu en l’air, au bout d’un tube qui roule, se décale à chaque seconde. Contre une butée, le point de départ ne bouge plus.' },
    { titre: 'Poser le mètre contre la même butée', texte: 'Posez le ruban le long du tube, son crochet poussé contre l’équerre.',
      pointCle: 'Tube et mètre partent du même point.',
      pourquoi: 'Le crochet du mètre bouge un peu : poussé contre une butée, il recule de son épaisseur, et la mesure reste juste.',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/1-2/04-metre.mp4',
      narration: 'On déroule le mètre le long du tube, et on pousse son crochet contre la même équerre. Tube et mètre partent maintenant du même point. Vous avez peut-être remarqué que le crochet d’un mètre bouge un peu : ce n’est pas un défaut. Il recule de son épaisseur quand on le pousse, et avance quand on l’accroche, pour que la mesure reste juste dans les deux cas.' },
    { titre: 'Lire la cote de face', texte: 'Placez l’œil juste au-dessus de la graduation.',
      pointCle: 'L’œil au-dessus du trait, jamais de biais.',
      pourquoi: 'Vue de biais, la graduation semble décalée de un ou deux millimètres, parfois plus.',
      figure: { svg: 'mesure', etat: 'lecture' }, clip: 'clips/1-2/05-lire.mp4',
      narration: 'Pour lire, on met l’œil juste au-dessus de la graduation. Le ruban est posé à côté du tube, pas dessus : vu de biais, le trait de la graduation semble glisser d’un ou deux millimètres, parfois plus. Deux millimètres, c’est la tolérance entière d’une pièce de CAP.' },
    { titre: 'Marquer un trait fin', texte: 'Au feutre fin, marquez un petit trait sur le tube, pile en face de la graduation.',
      pointCle: 'Un trait fin : son milieu est la cote.',
      pourquoi: 'Un trait épais fait un millimètre de large : on ne sait plus de quel côté couper.',
      figure: { img: 'images/1-2-tracer.webp', alt: 'Tracé au feutre fin en face de la graduation' }, clip: 'clips/1-2/06-marquer.mp4',
      narration: 'On marque un petit trait sur le tube, au feutre fin, pile en face de la graduation. Fin, parce qu’un gros trait fait presque un millimètre de large : au moment de couper, on ne saurait plus s’il faut couper à gauche, au milieu ou à droite du trait.' },
    { titre: 'Faire le tour du tube', texte: 'Tenez le feutre immobile sur le trait et faites tourner le tube : le trait fait le tour.',
      pointCle: 'Le tube tourne, le feutre ne bouge pas.',
      pourquoi: 'Le coupe-tube tourne autour du tube : il doit trouver le trait partout. Et un trait qui fait le tour montre tout de suite s’il est de travers.',
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
      eviter: 'Pousser le tube contre l’équerre à chaque mesure.', geste: 2,
      figure: { svg: 'mesure', etat: 'butee' },
      narration: 'Deuxième piège : le tube a reculé, et un jour s’est ouvert entre son bout et l’équerre. La mesure part de l’équerre, pas du tube : la cote est fausse du jour exactement. On repousse le tube contre la butée à chaque mesure.' },
    { titre: 'La lecture de biais', voit: 'Un ou deux millimètres d’écart, sans comprendre pourquoi.', cause: 'L’œil n’était pas au-dessus de la graduation.',
      eviter: 'L’œil juste au-dessus du trait.', geste: 4, figure: { svg: 'mesure', etat: 'parallaxe' },
      narration: 'Troisième piège, sournois : la lecture de biais. Le mètre dit juste, mais l’œil le lit de côté, et on croit voir soixante-douze au lieu de soixante-dix. La solution tient en une position : l’œil au-dessus du trait.' },
    { titre: 'Le trait épais', voit: 'On hésite au moment de couper : à gauche ou à droite du trait ?', cause: 'Feutre trop gros, ou trait repassé plusieurs fois.',
      eviter: 'Un feutre fin, un seul trait.', geste: 5, figure: { svg: 'mesure', etat: 'lecture' },
      narration: 'Quatrième piège : le trait trop épais. Il fait un millimètre de large, et on ne sait plus où couper. Un feutre fin, un seul passage.' },
    { titre: 'La rayure profonde', voit: 'Un sillon gravé dans le cuivre.', cause: 'Une pointe à tracer appuyée sur le tube.',
      eviter: 'Tracer au feutre fin, sans entailler la paroi.', geste: 5,
      figure: { svg: 'tube', etat: 'section' },
      narration: 'Dernier piège : graver le trait à la pointe à tracer. Sur le cuivre, on ne grave jamais. La paroi d’un tube frigorifique ne fait qu’un millimètre environ ; une entaille profonde l’affaiblit à l’endroit même où l’on va la travailler. Le feutre fin suffit.' }
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
      figure: { svg: 'bout', etat: 'equerre' },
      narration: 'Dernier contrôle : le trait est bien droit, perpendiculaire au tube.' }
  ],
  prof: {
    verifie: ['La longueur tracée, avant toute coupe', 'Le trait : fin, sur tout le tour, perpendiculaire', 'La méthode : tube et mètre contre la butée, lecture de face'],
    narration: 'Avant de couper, on fait vérifier la longueur : c’est ce que demandent les fiches d’atelier. Le professeur relit votre trait, et il regarde comment vous avez mesuré. Une fois confirmé, vous pouvez passer à la coupe : c’est la station suivante.'
  }
});

/* Station 1-3 — Couper et ébavurer. Source : sources-metier/1-3-couper-ebavurer.md */
CUIVREZO.stations.push({
  id: '1-3', ligne: 1, titre: 'Couper et ébavurer', duree: '20 min',
  sources: ['sources-metier/1-3-couper-ebavurer.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S62] },
  obtenir: {
    titre: 'Un tube coupé d’équerre, sans bavure',
    texte: 'Le tube est coupé à la cote. Sa face est droite et plane, son intérieur est lisse, et il est resté rond.',
    criteres: ['Coupe à angle droit avec l’axe du tube', 'Face plane : ni creuse, ni bombée', 'Aucune bavure à l’intérieur', 'Tube resté rond, longueur à la cote'],
    figure: { svg: 'bout', etat: 'equerre', legende: 'La face du tube colle à l’équerre : la coupe est d’équerre.' },
    narration: 'Voici ce que vous devez obtenir : un bout de tube coupé bien droit. Pourquoi tant d’exigence pour une simple coupe ? Parce que ce bout de tube va recevoir un raccord, un collet battu ou une brasure. Si la coupe part de travers, le raccord porte mal, et il fuit. Et s’il reste une bavure à l’intérieur, le fluide finira par l’arracher et l’emporter, jusqu’au compresseur, ou dans un capillaire qu’elle bouchera. Une bonne coupe, c’est la première condition d’un circuit étanche et propre. Vous allez voir le geste écran par écran, puis contrôler vous-même votre pièce avant de la montrer.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { svg: 'coupeTube', etat: '', legende: 'Le coupe-tube vu en bout de tube : la molette coupe, les deux galets tiennent l’outil droit.' },
    items: [
      { nom: 'Le coupe-tube adapté au diamètre', detail: 'molette coupante, deux galets, poignée de serrage ; le mini coupe-tube pour les endroits étroits' },
      { nom: 'L’alésoir ou l’ébavureur', detail: 'la lame fixée sur le côté du coupe-tube, ou un stylo ébavureur' },
      { nom: 'Le tube, tracé à la cote', detail: 'voir la station 1.2 : mesurer et tracer' },
      { nom: 'Le mètre et l’équerre', detail: 'pour contrôler la longueur et l’équerrage' },
      { nom: 'Lunettes et gants de travail', detail: 'lunettes sur les yeux pendant tout le façonnage ; gants pour toucher le tube coupé, dont le bord est tranchant' }
    ],
    narration: 'Avant de couper, tout est sur l’établi. Le coupe-tube d’abord. Regardez la molette, ce petit disque tranchant, et en face, les deux galets. Ce sont les galets qui tiennent l’outil perpendiculaire au tube : voilà pourquoi un coupe-tube coupe droit. Une scie, elle, coupe de travers et laisse des échardes ; pour ces tubes, en froid, elle n’a pas sa place. À côté, l’alésoir ou l’ébavureur, qui enlèvera la fine bavure que la molette laisse toujours à l’intérieur. Cochez chaque outil quand il est devant vous.'
  },
  gestes: [
    { titre: 'Vérifier le tube', texte: 'Le tube est droit, sans bosse ni coude, et le trait de coupe est tracé tout autour.',
      pointCle: 'Un tube cabossé ne se coupe pas droit.',
      pourquoi: 'Le coupe-tube s’appuie sur le tube. Si le tube est déformé, l’outil suit la déformation et la coupe part de travers.',
      figure: { svg: 'mesure', etat: 'trait', legende: 'Le trait fait tout le tour du tube.' }, clip: 'clips/1-3/01-verifier.mp4',
      narration: 'Tout commence avant de toucher l’outil. Le tube doit être droit, sans bosse et sans coude, parce que le coupe-tube prend appui sur lui : un tube cabossé fait dévier l’outil, et la coupe part de travers. Le trait de coupe est déjà tracé, tout autour du tube. C’est lui qui décide de la longueur de votre pièce : vous allez couper exactement dessus.' },
    { titre: 'Poser la molette sur le trait', texte: 'Ouvrez le coupe-tube, posez le tube sur les deux galets et amenez la molette exactement sur le trait.',
      pointCle: 'L’outil est perpendiculaire au tube.',
      pourquoi: 'Les deux galets calent le tube : l’outil ne peut couper qu’à angle droit, à condition d’être posé droit dès le départ.',
      figure: { svg: 'coupeTube', etat: 'poser' }, clip: 'clips/1-3/02-poser.mp4',
      narration: 'On ouvre le coupe-tube en dévissant la poignée, et on pose le tube bien à plat sur les deux galets. Puis on amène la molette pile sur le trait. Tout se joue ici : si l’outil est droit maintenant, il restera droit pendant toute la coupe, parce que les galets le guident. S’il est de travers maintenant, rien ne le rattrapera ensuite.' },
    { titre: 'Serrer jusqu’au contact', texte: 'Tournez la poignée jusqu’à ce que la molette touche le tube, puis serrez encore un peu.',
      pointCle: 'Un peu, pas plus : la molette mord à peine.',
      pourquoi: 'Serré fort d’un coup, la molette écrase le tube au lieu de le couper : il devient ovale, et la bavure intérieure grossit.',
      figure: { svg: 'coupeTube', etat: 'serrer' }, clip: 'clips/1-3/03-serrer.mp4',
      narration: 'On tourne la poignée jusqu’à sentir la molette toucher le tube, puis encore un peu, juste de quoi mordre. C’est tout. La tentation, c’est de serrer fort pour aller plus vite. Mais une molette trop serrée n’a pas le temps de couper : elle pousse le métal, le tube s’écrase et devient ovale. Et un tube ovale n’entre plus dans son raccord.' },
    { titre: 'Faire un premier tour lent', texte: 'Tournez le coupe-tube une fois autour du tube, lentement.',
      pointCle: 'Ce premier tour trace un repère tout autour du tube.',
      pourquoi: 'C’est le chemin que la molette va creuser. S’il fait une spirale au lieu d’un cercle, l’outil est de travers : reposez-le.',
      figure: { svg: 'coupeTube', etat: 'tourner' }, clip: 'clips/1-3/04-premier-tour.mp4',
      narration: 'Le premier tour se fait lentement. La molette grave un repère tout autour du tube : c’est le chemin qu’elle va creuser ensuite. Regardez-le. Un repère qui se referme sur lui-même, c’est un outil bien posé. Un repère qui part en spirale, c’est un outil de travers : on desserre, on repose, et on recommence.' },
    { titre: 'Tourner, dans un sens puis dans l’autre', texte: 'Faites tourner l’outil autour du tube en poussant, puis en tirant la poignée.',
      pointCle: 'C’est l’outil qui tourne. Le tube, lui, ne bouge pas.',
      pourquoi: 'En poussant puis en tirant, vous gardez la main sur l’outil sans lâcher le tube, même quand la place manque.',
      figure: { img: 'images/1-3-couper.webp', alt: 'Les mains font tourner le coupe-tube autour du tube' }, clip: 'clips/1-3/05-tourner.mp4',
      narration: 'Une main tient le tube, l’autre fait tourner l’outil autour, en poussant puis en tirant sur la poignée. Le tube ne tourne pas : c’est l’outil qui fait le tour. Ce va-et-vient permet de couper sans lâcher la prise, et il servira sur chantier, quand le tube est déjà posé contre un mur et qu’on ne peut plus faire un tour complet.' },
    { titre: 'Resserrer un peu à chaque tour', texte: 'Quand l’outil tourne plus facilement, resserrez un peu la molette. Recommencez jusqu’à ce que le tube se sépare.',
      pointCle: 'Lentement. Un peu de serrage à chaque tour, jamais beaucoup d’un coup.',
      pourquoi: 'Quand la résistance diminue, la molette a coupé à cette profondeur : on l’enfonce un peu plus pour continuer. Trop vite, la face devient creuse ou bombée, et le tube s’écrase.',
      figure: { svg: 'coupeTube', etat: 'resserrer' }, clip: 'clips/1-3/06-resserrer.mp4',
      narration: 'Au bout de quelques tours, vous sentez l’outil tourner plus facilement. Ce n’est pas que la coupe est finie : c’est que la molette a coupé à cette profondeur-là. Alors on resserre un peu, et on repart. Un peu de serrage, un tour, un peu de serrage, un tour. Jusqu’à ce que le tube se sépare de lui-même, sans qu’on ait à tirer dessus. Si vous allez trop vite, la face de coupe devient creuse ou bombée, et le tube s’écrase.' },
    { titre: 'Tenir le bout vers le bas', texte: 'Retournez le tube : le bout à ébavurer regarde le sol.',
      pointCle: 'Les copeaux tombent dehors, jamais dans le tube.',
      pourquoi: 'Une limaille restée dans le tube sera emportée par le fluide. Elle bouche un capillaire ou un déshydrateur, ou abîme le compresseur.',
      figure: { img: 'images/1-3-ebavurer.webp', alt: 'Ébavurer, le bout du tube tourné vers le bas' }, clip: 'clips/1-3/07-bout-en-bas.mp4',
      narration: 'Avant d’ébavurer, on retourne le tube, le bout vers le bas. Le geste paraît anodin, il est essentiel. L’ébavurage fait des copeaux de cuivre. Tube vers le haut, ils tombent dedans, et on ne les reverra plus… jusqu’au jour où le fluide les emportera vers un capillaire, un déshydrateur, ou le compresseur. Tube vers le bas, ils tombent par terre. Et on ne souffle jamais dans un tube pour le nettoyer : on y mettrait de l’humidité.' },
    { titre: 'Ébavurer l’intérieur', texte: 'Engagez l’alésoir dans le tube et faites deux à trois quarts de tour, dans un sens puis dans l’autre.',
      pointCle: 'Léger : on enlève la bavure, pas le métal.',
      pourquoi: 'La molette repousse un peu de métal vers l’intérieur : c’est la bavure. Si l’on appuie trop, on amincit la paroi, et le collet battu qui viendra plus tard sera fragile.',
      figure: { svg: 'ebavurer', etat: 'interieur' }, clip: 'clips/1-3/08-ebavurer-int.mp4',
      narration: 'Regardez l’intérieur du bout : un fin rebord de métal en fait le tour. C’est la bavure, que la molette a repoussée vers l’intérieur en coupant. On engage l’alésoir, et deux à trois quarts de tour, dans un sens puis dans l’autre, suffisent à l’enlever. Pas plus. Le but est d’enlever la bavure, pas de creuser le tube : une paroi amincie ferait un collet battu fragile.' },
    { titre: 'Ébavurer l’extérieur', texte: 'Passez l’ébavureur sur l’arête extérieure pour casser le fil de métal.',
      pointCle: 'Un tour léger suffit.',
      pourquoi: 'L’arête extérieure coupe les doigts et accroche à l’entrée d’un raccord.',
      figure: { svg: 'ebavurer', etat: 'exterieur' }, clip: 'clips/1-3/09-ebavurer-ext.mp4',
      narration: 'Dernier geste : l’arête extérieure. Elle aussi garde un fil de métal, qui coupe les doigts et accroche quand on enfile le tube dans un raccord. Un tour léger de l’ébavureur suffit à le casser. Votre pièce est coupée. Il reste à la contrôler.' }
  ],
  pieges: [
    { titre: 'La coupe inclinée', voit: 'La face du tube est oblique.', cause: 'L’outil n’était pas perpendiculaire au tube au départ.',
      eviter: 'Posez le tube bien à plat sur les deux galets avant de serrer, et regardez le premier tour.', geste: 1,
      figure: { svg: 'bout', etat: 'biais' },
      narration: 'Premier piège, la coupe inclinée. La face du tube est oblique, et un raccord posé dessus ne portera que d’un côté. La cause est presque toujours la même : l’outil était posé de travers dès le début. C’est pour cela que le premier tour se fait lentement, et qu’on le regarde.' },
    { titre: 'La face creuse ou bombée', voit: 'La face n’est pas plane : elle se creuse ou se bombe.', cause: 'La poignée a été tournée trop vite.',
      eviter: 'Tournez lentement et serrez peu à chaque tour.', geste: 5,
      figure: { svg: 'bout', etat: 'concave' },
      narration: 'Deuxième piège, plus discret : la face n’est pas plane. Elle se creuse, ou elle se bombe. Le tube a été coupé trop vite, la molette a forcé au lieu de couper. On ne le voit qu’en regardant la face de profil. Le remède, c’est la patience : un peu de serrage, un tour, et encore.' },
    { titre: 'Le tube écrasé', voit: 'Le bout n’est plus rond : il est ovale, avec une grosse bavure à l’intérieur.', cause: 'La molette a été serrée trop fort ou trop vite.',
      eviter: 'Un peu de serrage à chaque tour, jamais beaucoup d’un coup.', geste: 5,
      figure: { svg: 'bout', etat: 'ovale' },
      narration: 'Troisième piège : le tube écrasé. Son bout est devenu ovale, et une grosse bavure fait le tour de l’intérieur. C’est le résultat d’un serrage trop fort. Un tube ovale ne se rattrape pas : il n’entrera plus dans son raccord, et il ne fera pas un collet correct. On recoupe plus loin.' },
    { titre: 'La bavure oubliée', voit: 'Un fil de métal fait le tour de l’intérieur du tube.', cause: 'L’ébavurage a été sauté ou bâclé.',
      eviter: 'Ébavurez chaque bout, sans exception.', geste: 7,
      figure: { svg: 'bout', etat: 'bavure' },
      narration: 'Quatrième piège : la bavure oubliée. On l’oublie parce qu’on ne la voit pas de loin. Pourtant elle est là, sur tous les tubes coupés, et elle réduit le passage. Un jour, le fluide l’arrache et l’emporte dans le circuit. Chaque bout coupé est ébavuré, sans exception.' },
    { titre: 'La limaille dans le tube', voit: 'Des copeaux sont restés dans le tube.', cause: 'Le tube était tenu bout en haut pendant l’ébavurage.',
      eviter: 'Bout en bas, toujours. Et on ne souffle jamais dans un tube.', geste: 6,
      figure: { svg: 'bout', etat: 'limaille' },
      narration: 'Dernier piège : la limaille restée dans le tube. On a ébavuré le bout en l’air, et les copeaux sont tombés dedans. Ce sont eux qui bouchent les capillaires et abîment les compresseurs. Le bon réflexe tient en trois mots : bout en bas. Et jamais de souffle dans le tube, qui y mettrait de l’humidité.' }
  ],
  controles: [
    { question: 'La coupe est-elle d’équerre ?', comment: 'Posez l’équerre contre la face du tube : aucun jour ne doit passer.',
      siNon: 'Recoupez quelques millimètres plus loin, le tube bien posé sur les galets.', geste: 1,
      figure: { svg: 'bout', etat: 'equerre' },
      narration: 'Premier contrôle, l’équerrage. On pose l’équerre contre la face du tube et on regarde s’il passe du jour. Pas de jour, la coupe est d’équerre.' },
    { question: 'La face est-elle plane ?', comment: 'Regardez la face de profil : ni creux, ni bosse.',
      siNon: 'Recoupez, en tournant plus lentement.', geste: 5, figure: { svg: 'bout', etat: 'concave' },
      narration: 'Deuxième contrôle : la face vue de profil. Elle doit être plate, sans creux ni bosse.' },
    { question: 'L’intérieur est-il lisse ?', comment: 'Passez le doigt ganté à l’intérieur du bout, puis regardez à contre-jour.',
      siNon: 'Reprenez l’ébavurage : deux à trois quarts de tour, bout en bas.', geste: 7, figure: { svg: 'bout', etat: 'propre' },
      narration: 'Troisième contrôle : l’intérieur. Le doigt ganté ne doit accrocher sur aucun rebord, et à contre-jour, le bord est net.' },
    { question: 'Le tube est-il resté rond ?', comment: 'Regardez le bout de face. En cas de doute, mesurez le diamètre dans deux sens au pied à coulisse : les deux mesures sont égales.',
      siNon: 'Un bout ovalisé ne se rattrape pas : recoupez plus loin, en serrant moins fort.', geste: 5,
      figure: { svg: 'bout', etat: 'ovale' },
      narration: 'Quatrième contrôle : le tube est-il resté rond ? Regardez-le de face. Au moindre doute, deux mesures au pied à coulisse, dans deux sens différents, doivent donner le même diamètre.' },
    { question: 'La longueur est-elle à la cote ?', comment: 'Mesurez au mètre, le crochet contre le bout du tube.',
      siNon: 'Trop long : recoupez. Trop court : la pièce est à refaire, et la chute se garde.', geste: 0,
      figure: { svg: 'mesure', etat: 'lecture' },
      narration: 'Cinquième contrôle : la longueur. Le crochet du mètre contre le bout du tube, et on lit la cote.' },
    { question: 'Le tube est-il propre à l’intérieur ?', comment: 'Bout en bas, tapotez le tube : rien ne doit tomber.',
      siNon: 'Faites tomber les copeaux, bout en bas. Ne soufflez jamais dedans.', geste: 6,
      figure: { svg: 'ebavurer', etat: 'interieur' },
      narration: 'Dernier contrôle : bout en bas, on tapote le tube. S’il en tombe de la limaille, c’est qu’il y en avait dedans. Recommencez jusqu’à ce que rien ne tombe.' }
  ],
  prof: {
    verifie: ['La coupe : d’équerre, plane, sans bavure', 'Le tube : rond, à la cote, propre à l’intérieur',
              'Le geste : outil posé droit, serrage progressif, ébavurage bout en bas', 'Le poste : chutes triées par diamètre, outils rangés'],
    narration: 'Votre pièce a passé vos propres contrôles. Il reste le regard du professeur. Il regarde la pièce, et, s’il le souhaite, le geste lui-même : c’est ce qu’il confirme, que vous savez couper seul, proprement. Montrez-lui aussi votre poste : les chutes triées par diamètre, les grandes longueurs gardées pour plus tard.'
  }
});

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
    figure: { composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', cote: '300' }, legende: 'Le coude à 90°, 300 mm à l’axe. Tournez-le du doigt.' },
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
      figure: { composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', cote: '300' }, legende: 'Le rayon Rc : du centre du coude à l’axe du tube.' }, clip: 'clips/1-4/03-essai.mp4',
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
    { question: 'La branche mesure-t-elle 300 mm à l’axe (± 3) ?', comment: 'Plaquez la branche contre la butée, mesurez jusqu’au bord de l’autre branche, retirez la moitié du diamètre du tube (par exemple 7,9 mm pour un tube 5/8″). Trois mesures.',
      siNon: 'Trop long : Rc non retiré. Trop court : trait mal posé sur le 0.', geste: 3,
      figure: { svg: 'coude', etat: 'rc' }, narration: 'Premier contrôle : la cote à l’axe, contre la butée, trois fois. On mesure jusqu’au bord de l’autre branche, et l’on retire la moitié du diamètre du tube.' },
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

/* Station 1-5 — Cintrer à la cintreuse (repères L, R et 0). Source : sources-metier/1-4-1-5-cintrage.md (partie 2)
   Repères portés par le bras tournant. L = cote prise depuis l'extrémité GAUCHE (écrit dans les fiches) ;
   R = cote prise depuis l'extrémité DROITE (dessin CINTRAGE 1 p. 8 et article abcclim, décidé le 30/09/2026) ;
   0 = lecture de l'angle sur la forme graduée (0 en face de 90 = coude à 90°). Ordre « 0 R L » : trois
   sources sur quatre ; à vérifier UNE FOIS sur la cintreuse de l'atelier (liste du professeur).
   Pièce de référence : pièce 1 du niveau 3 de tp-cintrage (1/4″, coupe 144, cote 80 sur L).
   Mise en place du tube, dictée par Franck le 01/10/2026 (le geste le plus dur pour les élèves) : bras en
   l'air, tube engagé et bloqué par le CROCHET FIXE (on ne le rabat pas), bras rabattu, trait sur L (pas de
   rayon à ajouter) ou sur 0 (cote moins Rc). Sa fiche « ETAPE CINTRAGE 90 » : « L du bras mobile bien en face
   de la marque ». */
CUIVREZO.stations.push({
  id: '1-5', ligne: 1, titre: 'Cintrer à la cintreuse (L, R, 0)', duree: '30 min', vignette: 'images/1-5-cintreuse.webp',
  sources: ['sources-metier/1-4-1-5-cintrage.md', 'C:/git/tp-cintrage/niveau-3-data.js'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un coude à 90°, à la cote, du premier coup',
    texte: 'Pièce 1 : un tube 1/4″ coupé à 144 mm, un coude à 90°, des branches de 80 et 70 mm jusqu’à l’axe, à ± 1 mm.',
    criteres: ['Branches de 80 et 70 mm à l’axe, à ± 1 mm', 'Angle de 90°', 'Tube ni écrasé ni fortement marqué', 'Pièce plane, sens de cintrage respecté'],
    figure: { img: 'images/reprises/piece-1-coude-1-4.svg', alt: 'Plan de la pièce 1 : coude à 90° en cuivre 1/4 pouce', legende: 'Plan de la pièce 1 (TP cintrage, niveau 3).' },
    narration: 'La cintreuse à levier est plus précise que la cintrette : un millimètre de tolérance au lieu de trois. Sa précision vient de trois repères gravés sur son bras : L, R et zéro. L et R disent où poser le trait selon le bout depuis lequel vous avez mesuré. Le zéro dit quand s’arrêter. Si vous comprenez ces trois lettres, vous faites un coude juste du premier coup.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { svg: 'cintreuse', etat: 'reperes' },
    items: [
      { nom: 'La cintreuse du bon diamètre', detail: 'son marquage (1/4″, 3/8″) est celui du tube' },
      { nom: 'Le tube 1/4″ coupé à 144 mm', detail: 'coupé d’équerre et ébavuré : stations 1.2 et 1.3' },
      { nom: 'Feutre fin, mètre ou réglet', detail: 'pour tracer la cote' },
      { nom: 'L’équerre', detail: 'pour contrôler l’angle' }
    ],
    narration: 'Regardez l’outil. Une forme ronde, graduée : zéro, quarante-cinq, quatre-vingt-dix, cent quatre-vingts. En haut du bras fixe, un crochet fixe qui bloque le tube contre la forme. Un bras fixe, et un bras tournant qui porte trois repères : zéro, R et L. Chaque cintreuse ne fait qu’un diamètre : son marquage, un quart ou trois huitièmes, doit être celui du tube. Son rayon lui est propre.'
  },
  gestes: [
    { titre: 'Prendre la bonne cintreuse', texte: 'Le marquage de la cintreuse doit être celui du tube : 1/4″ avec 1/4″.',
      pointCle: 'Une cintreuse, un diamètre.',
      pourquoi: 'La gorge et le rayon sont faits pour un seul tube. Un autre diamètre s’écrase ou glisse, et les cotes du plan ne tombent plus.',
      figure: { img: 'images/1-5-cintreuse.webp', alt: 'La cintreuse à levier et son tube cintré à 90°' }, clip: 'clips/1-5/01-choisir.mp4',
      narration: 'Premier réflexe : la cintreuse du bon diamètre. Sa gorge est taillée pour un seul tube, et son rayon aussi. Un tube trop petit y glisse, un tube trop gros s’y écrase. Et le plan a été calculé pour le rayon de cet outil-là : avec une autre cintreuse, les cotes ne tomberaient plus.' },
    { titre: 'Choisir le repère : L ou R', texte: 'La cote part de l’extrémité gauche du tube ? Ce sera L. De l’extrémité droite ? Ce sera R.',
      pointCle: 'L comme Left, gauche. R comme Right, droite.',
      pourquoi: 'Le coude s’enroule d’un côté du trait. Le repère compense ce décalage selon le côté d’où vient la cote.',
      figure: { svg: 'cintreuse', etat: 'placer-L' }, clip: 'clips/1-5/02-choisir-repere.mp4',
      narration: 'Avant de tracer, on se demande de quel bout part la cote. Si elle part de l’extrémité gauche du tube, on posera le trait sur L, comme Left, gauche. Si elle part de l’extrémité droite, sur R, comme Right, droite. Pourquoi deux repères ? Parce que le coude s’enroule d’un côté du trait, et que ce décalage ne se compense pas de la même façon selon le côté d’où vient la cote.' },
    { titre: 'Tracer la cote finie', texte: 'Depuis le bout choisi, tracez la cote du plan : 80 mm pour la pièce 1.',
      pointCle: 'On trace la cote finie, telle qu’elle est sur le plan.',
      pourquoi: 'Avec la cintreuse, pas de soustraction : c’est le repère L ou R qui tient compte du rayon.',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/1-5/03-tracer.mp4',
      narration: 'On trace la cote telle qu’elle est sur le plan : quatre-vingts millimètres depuis l’extrémité gauche, pour la pièce une. Avec la cintrette, il fallait retirer le rayon. Ici, non : c’est le repère L, ou R, qui en tient compte à votre place. C’est tout l’intérêt de ces lettres.' },
    { titre: 'Lever le bras tournant', texte: 'Levez le bras tournant, bras en l’air : le guide s’écarte de la forme.',
      pointCle: 'Bras en l’air : la gorge est libre.',
      pourquoi: 'Tant que le guide est posé sur la forme, le tube ne peut pas entrer dans la gorge.',
      figure: { svg: 'cintreuse', etat: 'lever' }, clip: 'clips/1-5/04-lever.mp4',
      narration: 'On commence par lever le bras tournant, bras en l’air. Le guide s’écarte de la forme, et la gorge est libre : le tube va pouvoir s’y poser.' },
    { titre: 'Engager le tube sous le crochet fixe', texte: 'Posez le tube dans la gorge et glissez-le sous le crochet, en haut du bras fixe.',
      pointCle: 'Le tube est bloqué par le crochet.',
      pourquoi: 'Pendant le coude, c’est le crochet qui retient le tube. Un tube hors du crochet glisse : le coude part de travers ou se plisse.',
      figure: { svg: 'cintreuse', etat: 'engager' }, clip: 'clips/1-5/05-engager.mp4',
      narration: 'On pose le tube dans la gorge de la forme, et on le glisse sous le crochet, en haut du bras fixe. Faites bien attention à ce point : le tube doit être bloqué par le crochet. S’il passe au-dessus, rien ne le retient, et il glissera pendant le coude.' },
    { titre: 'Rabattre le bras tournant', texte: 'Rabattez le bras : le guide vient se poser sur le tube.',
      pointCle: 'Le guide est posé sur le tube ; le tube peut encore coulisser.',
      pourquoi: 'Le guide porte les repères 0, R et L : il doit être sur le tube pour qu’on y aligne le trait.',
      figure: { svg: 'cintreuse', etat: 'rabattre' }, clip: 'clips/1-5/06-rabattre.mp4',
      narration: 'On rabat le bras tournant : le guide vient se poser sur le tube. Le tube peut encore coulisser dans la gorge. C’est maintenant qu’on va le placer, au millimètre, grâce aux repères gravés sur le guide.' },
    { titre: 'Amener le trait sur L', texte: 'Faites coulisser le tube jusqu’à ce que le trait soit exactement en face de L.',
      pointCle: 'Exactement sur le repère : un millimètre d’écart, un millimètre d’erreur.',
      pourquoi: 'Avec L, on trace la cote du plan telle quelle : pas de rayon de cintrage à ajouter.',
      figure: { svg: 'cintreuse', etat: 'placer-L' }, clip: 'clips/1-5/07-sur-L.mp4',
      narration: 'On fait coulisser le tube jusqu’à ce que le trait soit exactement en face du repère L. Avec L, pas de rayon de cintrage à ajouter : la cote du plan suffit. Vérifiez une dernière fois l’alignement : c’est ici que se joue la précision de la pièce.' },
    { titre: 'Ou sur R, si la cote part de la droite', texte: 'Même geste, mais le trait se pose en face de R.',
      pointCle: 'Le repère suit le bout d’où part la cote.',
      pourquoi: 'Sur une pièce à plusieurs coudes, on passe parfois d’un repère à l’autre selon le sens des cotes.',
      figure: { svg: 'cintreuse', etat: 'placer-R' }, clip: 'clips/1-5/08-sur-R.mp4',
      narration: 'Si la cote du plan part de l’extrémité droite, le geste est le même, mais le trait se pose en face de R. Sur une pièce à plusieurs coudes, les cotes ne partent pas toujours du même côté : on choisit le repère à chaque coude, en regardant d’où part la cote.' },
    { titre: 'Ou sur le 0, si vous avez retiré Rc', texte: 'Vous avez tracé la cote moins Rc, comme à la cintrette ? Posez alors le trait en face du 0.',
      pointCle: 'Le 0 : le coude commence au trait.',
      pourquoi: 'Le 0 ne compense rien : le rayon, c’est vous qui l’avez retiré en traçant.',
      figure: { svg: 'cintreuse', etat: 'placer-0' }, clip: 'clips/1-5/09-sur-0.mp4',
      narration: 'Il existe une autre façon de faire : tracer la cote moins le rayon de cintrage, comme à la cintrette, puis poser le trait en face du zéro. Le zéro marque l’endroit où le coude commence. Il ne compense rien : le calcul, c’est vous qui l’avez fait en traçant. Avec L, ce calcul est inutile.' },
    { titre: 'Ramener le bras', texte: 'Main gauche : poignée et tube. Main droite : ramenez le bras vers vous, d’un seul mouvement.',
      pointCle: 'Progressivement, sans à-coup.',
      pourquoi: 'Un mouvement haché ovalise ou plisse le tube.',
      figure: { svg: 'cintreuse', etat: 'cintrer' }, clip: 'clips/1-5/10-cintrer.mp4',
      narration: 'La main gauche tient la poignée fixe et le tube ; la main droite ramène le bras tournant vers vous. D’un seul mouvement, régulier. Regardez le tube s’enrouler autour de la forme : le bras le pousse dans la gorge, pendant que le crochet le retient.' },
    { titre: 'Arrêter quand le 0 est face au 90', texte: 'Le 0 du bras arrive en face du 90 de la forme : arrêtez. Tenez compte de la détente.',
      pointCle: '0 face à 90 : coude à 90°.',
      pourquoi: 'La forme est graduée en degrés, et le 0 du bras est l’aiguille qui les lit.',
      figure: { svg: 'cintreuse', etat: 'angle' }, clip: 'clips/1-5/11-angle.mp4',
      narration: 'Le zéro du bras sert maintenant d’aiguille. Il avance devant les graduations de la forme : quarante-cinq, puis quatre-vingt-dix. Quand il est en face de quatre-vingt-dix, le coude est à quatre-vingt-dix degrés : on s’arrête. Comme pour la cintrette, le cuivre se détend un peu quand on relâche : on vérifie à l’équerre.' },
    { titre: 'Dégager, puis enchaîner', texte: 'Relevez le bras, dégagez le tube du crochet, sortez-le. Coude suivant : mesurez depuis l’axe de la branche déjà cintrée.',
      pointCle: 'Toujours de gauche à droite, avec le même mouvement du bras.',
      pourquoi: 'Travailler toujours dans le même sens évite de se tromper de repère et de vriller la pièce.',
      figure: { img: 'images/1-5-cintreuse.webp', alt: 'Coude à 90° dans la cintreuse' }, clip: 'clips/1-5/12-enchainer.mp4',
      narration: 'On relève le bras, on dégage le tube du crochet, et il sort. Pour une pièce à plusieurs coudes, la cote suivante se mesure depuis l’axe de la branche qu’on vient de cintrer. Et on travaille toujours dans le même sens, de gauche à droite, comme on écrit : c’est ce qui évite de se tromper de repère.' }
  ],
  pieges: [
    { titre: 'La mauvaise cintreuse', voit: 'Un tube écrasé, ou des cotes fausses.', cause: 'Une cintreuse 1/4″ pour un tube 3/8″, ou l’inverse.',
      eviter: 'Vérifier le marquage avant de commencer.', geste: 0, figure: { svg: 'cintreuse', etat: 'reperes' },
      narration: 'Premier piège : la cintreuse d’un autre diamètre. Soit le tube s’écrase dans une gorge trop petite, soit il glisse dans une gorge trop grande. Et même s’il passe, le rayon n’est pas celui pour lequel le plan a été calculé.' },
    { titre: 'Le mauvais repère', voit: 'Une branche nettement fausse.', cause: 'Trait posé sur L alors que la cote partait de la droite, ou l’inverse.',
      eviter: 'Se demander à chaque coude : d’où part la cote ?', geste: 1,
      figure: { svg: 'cintreuse', etat: 'placer-R' },
      narration: 'Deuxième piège : poser le trait sur le mauvais repère. La pièce est fausse de la distance qui sépare L de R. Un seul réflexe l’évite : avant chaque coude, se demander de quel bout part la cote.' },
    { titre: 'Le tube hors du crochet', voit: 'Le tube glisse pendant le coude : coude décalé ou plissé.', cause: 'Le tube est passé au-dessus du crochet fixe, pas dessous.',
      eviter: 'Avant de rabattre le bras, vérifier que le crochet bloque le tube.', geste: 4, figure: { svg: 'cintreuse', etat: 'hors-crochet' },
      narration: 'Troisième piège, le plus fréquent : le tube posé au-dessus du crochet, au lieu de dessous. Rien ne le retient : pendant le coude, il glisse. Avant de rabattre le bras, un coup d’œil au crochet : le tube doit être dessous, bloqué.' },
    { titre: 'Le trait mal aligné', voit: 'Une branche un peu trop longue ou trop courte.', cause: 'Le trait n’était pas pile sur le repère.',
      eviter: 'Aligner exactement avant de cintrer.', geste: 6, figure: { svg: 'cintreuse', etat: 'placer-L' },
      narration: 'Quatrième piège : le bon repère, mais un alignement approximatif. Avec un millimètre de tolérance, il n’y a pas de place pour l’à-peu-près.' },
    { titre: 'Le tube plissé ou écrasé', voit: 'Des plis dans le coude, ou un tube aplati.', cause: 'Mouvement haché, ou tube mal bloqué par le crochet.',
      eviter: 'Un seul mouvement continu.', geste: 9, figure: { svg: 'coude', etat: 'pli' },
      narration: 'Cinquième piège : le coude plissé ou aplati. Le mouvement a été haché, ou le crochet n’a pas tenu le tube. Un seul mouvement, régulier.' },
    { titre: 'La pièce vrillée', voit: 'La pièce ne tient pas à plat sur l’établi.', cause: 'Le sens de cintrage a changé, ou le tube a tourné entre deux coudes.',
      eviter: 'Toujours de gauche à droite, même mouvement du bras.', geste: 11, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Dernier piège, sur les pièces à plusieurs coudes : la pièce vrillée, qui ne tient pas à plat. Le sens de travail a changé en cours de route. De gauche à droite, toujours.' }
  ],
  controles: [
    { question: 'Les branches mesurent-elles 80 et 70 mm à l’axe (± 1) ?', comment: 'Plaquez la branche contre la butée, mesurez jusqu’au bord extérieur de l’autre branche, retirez la moitié du diamètre du tube (3,2 mm en 1/4″).', siNon: 'Vérifiez le repère utilisé et l’alignement du trait.', geste: 1,
      figure: { img: 'images/reprises/piece-1-coude-1-4.svg', alt: 'Plan de la pièce 1' }, narration: 'Premier contrôle : les deux branches, à l’axe, au millimètre. On mesure jusqu’au bord extérieur de l’autre branche, et l’on retire la moitié du diamètre du tube.' },
    { question: 'Le coude est-il à 90° ?', comment: 'Posez l’équerre contre les deux branches.', siNon: 'Reprenez un tout petit peu à la cintreuse.', geste: 10,
      figure: { svg: 'coude', etat: 'equerre' }, narration: 'Deuxième contrôle : l’angle, à l’équerre.' },
    { question: 'Le tube est-il ni écrasé ni fortement marqué ?', comment: 'Regardez le coude de près.', siNon: 'Pièce à refaire : bon diamètre de cintreuse, mouvement continu.', geste: 9,
      figure: { svg: 'coude', etat: 'ovale' }, narration: 'Troisième contrôle : le coude est rond et propre.' },
    { question: 'La pièce est-elle plane ?', comment: 'Posez-la à plat : elle touche l’établi partout.', siNon: 'Le tube a tourné : gardez le même sens de travail.', geste: 11,
      figure: { svg: 'coude', etat: 'vrille' }, narration: 'Dernier contrôle : la pièce est plane.' }
  ],
  suite: {
    titre: 'La série du TP cintrage (niveau 3), à enchaîner après la pièce 1',
    pieces: [
      { titre: 'Pièce 2 : un U en 1/4″ (coupe 208 mm, branches 80, entraxe 60)', img: 'images/reprises/piece-2-u-1-4.svg' },
      { titre: 'Pièce 3 : trois coudes en 1/4″ (coupe 232 mm)', img: 'images/reprises/piece-3-marche-1-4.svg' },
      { titre: 'Pièce 4 : un U en 3/8″ (coupe 250 mm, rayon 23,8 mm)', img: 'images/reprises/piece-4-u-3-8.svg' },
      { titre: 'Pièce 5 : deux coudes dans deux plans, 3/8″ (coupe 220 mm)', img: 'images/reprises/piece-5-3d-3-8.svg' }
    ]
  },
  prof: {
    verifie: ['Le repère choisi (L ou R) et pourquoi', 'L’angle lu au 0 du bras, puis à l’équerre', 'Les cotes à l’axe, au millimètre', 'L’aspect du coude', 'Une fois, sur la cintreuse de l’atelier : l’ordre des repères 0, R, L comme sur la figure, et la distance du L au 0, voisine du rayon de cintrage (14,3 mm en 1/4″)'],
    narration: 'Le professeur vous demande quel repère vous avez utilisé, et pourquoi. C’est la vraie preuve : savoir expliquer le choix entre L et R. Puis il mesure la pièce. Les pièces suivantes du TP, un U, trois coudes, deux plans, se font avec exactement la même méthode.'
  }
});

/* Station 1-6 — Le dudgeon (évasement à 45° pour raccord à écrou). Source : sources-metier/1-6-collet-battu.md, partie [B]
   Vocabulaire des fiches : le « dudgeon » est l'évasement frigorifique à 45° (dudgeonnière, écrou, huile,
   clé dynamométrique) ; le « collet battu » est le geste de plomberie (collerette plate au marteau, joint),
   qui demande un recuit au chalumeau : il n'est pas traité ici.
   Dépassement et couples : DÉCIDÉS le 30/09/2026 (DECISIONS-2026-09-30.md) d'après la notice d'un fabricant
   d'appareil (Carrier 42HQE/38YE, p. 8), plus fiable que la fiche d'atelier (unité « N/m » fausse) ;
   la notice de l'appareil raccordé fait foi sur chantier. */
CUIVREZO.stations.push({
  id: '1-6', ligne: 1, titre: 'Le dudgeon', duree: '25 min',
  sources: ['sources-metier/1-6-collet-battu.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un dudgeon régulier, l’écrou en place',
    texte: 'Le bout du tube est évasé en cône à 45°, lisse, sans fissure. L’écrou, enfilé avant, vient le coiffer et se visse sur le raccord.',
    criteres: ['Cône régulier, lisse, sans fissure ni marque d’outil', 'Épaisseur uniforme, bien centré', 'Il épouse le raccord : ni trop grand, ni trop petit', 'L’écrou enfilé, dans le bon sens'],
    figure: { composant: 'cuivre-3d', attributs: { piece: 'dudgeon', angle: '45' }, legende: 'Le dudgeon réussi, l’écrou qui vient le coiffer.' },
    narration: 'Le dudgeon est un raccord sans flamme. Le bout du tube est évasé en cône, et un écrou vient le plaquer contre un raccord en laiton : métal contre métal, sans joint. C’est ce qui raccorde, par exemple, les liaisons d’une climatisation. Tout repose sur la qualité du cône : trop petit, il fuit ; trop grand, l’écrou ne passe plus ; fendu, il fuira un jour. Et un raccord qui fuit, c’est du fluide frigorigène dans l’atmosphère.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/1-6-dudgeon.webp', alt: 'La dudgeonnière : barre à trous, étrier et cône' },
    items: [
      { nom: 'Le tube recuit, coupé d’équerre et ébavuré', detail: 'station 1.3 : c’est la moitié de la réussite' },
      { nom: 'L’écrou du bon diamètre', detail: 'celui du raccord' },
      { nom: 'La dudgeonnière', detail: 'une barre à trous et un étrier à cône de 45°' },
      { nom: 'L’huile frigorifique', detail: 'une goutte sur les cônes au montage ; le professeur donne l’huile' },
      { nom: 'Deux clés, dont une dynamométrique', detail: 'pour serrer au bon couple' },
      { nom: 'Le raccord', detail: 'pour l’essai de montage' }
    ],
    narration: 'La dudgeonnière a deux pièces. La barre à trous, faite de deux mâchoires percées à plusieurs diamètres, qui serre le tube. Et l’étrier, qui porte un cône à quarante-cinq degrés au bout d’une vis. Le cône descend dans le tube et le rabat contre le chanfrein de la barre. Pour le montage, il faudra deux clés, dont une dynamométrique, qui mesure le serrage.'
  },
  gestes: [
    { titre: 'Partir d’un bout parfait', texte: 'Le tube est coupé d’équerre au coupe-tube, jamais à la scie, et ébavuré bout en bas, sans trop enlever de métal.',
      pointCle: 'Un bout de travers fait un dudgeon de travers.',
      pourquoi: 'Le cône reproduit fidèlement le bout du tube : une coupe oblique donne un cône oblique, une bavure donne une portée rugueuse, une paroi trop amincie donne un cône fragile.',
      figure: { svg: 'bout', etat: 'propre' }, clip: 'clips/1-6/01-bout.mp4',
      narration: 'Un dudgeon réussi commence à la station un point trois. Le cône va reproduire fidèlement le bout du tube : une coupe de travers donne un cône de travers, une bavure oubliée donne une portée rugueuse qui fuira. Et un ébavurage trop appuyé amincit la paroi, qui se fendra à l’évasement. Coupe d’équerre, ébavurage léger, bout vers le bas.' },
    { titre: 'Enfiler l’écrou, dans le bon sens', texte: 'Enfilez l’écrou sur le tube, filetage tourné vers le bout à évaser.',
      pointCle: 'Avant d’évaser. Toujours.',
      pourquoi: 'Une fois le cône formé, l’écrou ne peut plus passer : il faudrait recouper.',
      figure: { svg: 'dudgeon', etat: 'ecrou' }, clip: 'clips/1-6/02-ecrou.mp4',
      narration: 'Le geste qu’on oublie une fois, et jamais deux : enfiler l’écrou avant d’évaser. Une fois le cône formé, l’écrou ne passe plus par-dessus. Il ne reste alors qu’à recouper le tube et tout recommencer. L’écrou s’enfile dans le bon sens : son filetage regarde le bout du tube.' },
    { titre: 'Serrer le tube dans la barre', texte: 'Dans le trou du bon diamètre, côté chanfrein. Le tube dépasse de la cote A, puis on serre les écrous papillons.',
      pointCle: 'Dépassement A, entre le mini et le maxi de la notice d’un appareil : 1/4″ 0,7 à 1,3 · 3/8″ 1,0 à 1,6 · 1/2″ 1,0 à 1,8 · 5/8″ 2,2 à 2,4 mm.',
      pourquoi: 'Le métal qui dépasse est celui qui formera le cône. Trop, le cône est trop grand ; pas assez, il est trop petit.',
      figure: { svg: 'dudgeon', etat: 'mors' }, clip: 'clips/1-6/03-barre.mp4',
      narration: 'On place le tube dans le trou de son diamètre, du côté chanfreiné de la barre, et on le fait dépasser d’une petite hauteur, qu’on appelle A. Pour un quart de pouce, entre sept dixièmes et un virgule trois millimètre ; pour un trois huitièmes, entre un et un virgule six millimètre : ce sont les valeurs de la notice d’un fabricant, et le professeur vous donne celles de la dudgeonnière de l’atelier. C’est ce métal qui dépasse qui va former le cône. Puis on serre les deux écrous papillons : le tube ne doit plus bouger.' },
    { titre: 'Poser l’étrier', texte: 'Posez l’étrier sur la barre, le cône bien au centre du tube, et bloquez-le.',
      pointCle: 'Le cône au centre, sinon le dudgeon sera décentré.',
      pourquoi: 'Un cône qui entre de biais pousse le métal d’un seul côté.',
      figure: { img: 'images/1-6-dudgeon.webp', alt: 'L’étrier posé sur la barre, cône au centre du tube' }, clip: 'clips/1-6/04-etrier.mp4',
      narration: 'On pose l’étrier sur la barre, au-dessus du tube, et on le bloque. Le cône doit arriver exactement au centre du tube. Un cône qui entre de biais pousse le métal d’un seul côté, et le dudgeon sera décentré.' },
    { titre: 'Visser jusqu’à la butée', texte: 'Tournez la poignée : le cône descend et rabat le bout du tube à 45°. Continuez jusqu’à la butée.',
      pointCle: 'Régulièrement, sans forcer au-delà de la butée.',
      pourquoi: 'Le cône étire le cuivre recuit contre le chanfrein de la barre. Forcer le fendrait.',
      figure: { svg: 'dudgeon', etat: 'evaser' }, clip: 'clips/1-6/05-evaser.mp4',
      narration: 'On tourne la poignée de l’étrier. Le cône descend dans le tube et l’écarte peu à peu, jusqu’à le plaquer contre le chanfrein de la barre, à quarante-cinq degrés. On tourne régulièrement, jusqu’à la butée. Le cuivre recuit se laisse étirer, mais il a une limite : au-delà, il se fend.' },
    { titre: 'Dévisser et contrôler', texte: 'Remontez le cône, retirez l’étrier, desserrez la barre et regardez le dudgeon.',
      pointCle: 'Lisse, régulier, centré, sans fissure.',
      pourquoi: 'C’est maintenant qu’un défaut se voit, et qu’on peut encore recouper.',
      figure: { svg: 'dudgeon', etat: 'controle' }, clip: 'clips/1-6/06-controler.mp4',
      narration: 'On remonte le cône, on retire l’étrier, on desserre la barre. Et on regarde le dudgeon de près, avant de monter quoi que ce soit. La surface est-elle lisse ? Le cône est-il régulier et centré ? Pas la moindre fissure au bord ? C’est le moment de voir un défaut : une fois monté, il ne se verra plus… jusqu’à la fuite.' },
    { titre: 'Huiler et visser à la main', texte: 'Une goutte d’huile frigorifique sur les cônes. Présentez le tube sur le raccord et vissez l’écrou à la main, jusqu’au contact.',
      pointCle: 'À la main d’abord : l’écrou doit se visser sans résistance.',
      pourquoi: 'Un écrou qui force à la main est mal engagé : à la clé, il abîmerait le filetage.',
      figure: { img: 'images/1-6-serrage.webp', alt: 'Le tube présenté sur le raccord, l’écrou vissé' }, clip: 'clips/1-6/07-main.mp4',
      narration: 'Au montage, une goutte d’huile frigorifique sur les cônes aide les deux surfaces à glisser l’une sur l’autre. On présente le tube bien dans l’axe du raccord, et on visse l’écrou à la main, jusqu’au contact. S’il force à la main, c’est qu’il est mal engagé : on dévisse, on recommence. La clé ne sert qu’à finir le serrage.' },
    { titre: 'Serrer au couple, à deux clés', texte: 'Clé dynamométrique sur l’écrou, contre-clé sur le raccord. Serrez jusqu’au couple.',
      pointCle: 'Couples de la notice d’un appareil : 1/4″ 15,7 · 3/8″ 29,4 · 1/2″ 29,4 · 5/8″ 73,6 N·m. Sur chantier, la notice de l’appareil fait foi.',
      pourquoi: 'Pas assez serré, le raccord fuit. Trop serré, le dudgeon s’écrase ou l’écrou casse. La contre-clé empêche le raccord de tourner et de tordre le tube.',
      figure: { svg: 'dudgeon', etat: 'serrage' }, clip: 'clips/1-6/08-couple.mp4',
      narration: 'Le serrage final se fait à deux clés. La clé dynamométrique sur l’écrou, parce qu’elle mesure l’effort : trop peu, le raccord fuit ; trop, le dudgeon s’écrase ou l’écrou casse. Et une contre-clé sur le raccord, qui l’empêche de tourner et de tordre le tube. Le couple dépend du diamètre, et il se compte en newtons-mètres. Par exemple, la notice d’un appareil donne quinze virgule sept newtons-mètres pour un quart de pouce, et vingt-neuf virgule quatre pour un trois huitièmes. Sur un appareil réel, c’est toujours la notice du fabricant qui fait foi.' }
  ],
  pieges: [
    { titre: 'L’écrou oublié', voit: 'Un beau dudgeon… et l’écrou resté sur l’établi.', cause: 'On a évasé avant d’enfiler l’écrou.',
      eviter: 'L’écrou d’abord, toujours.', geste: 1, figure: { svg: 'dudgeon', etat: 'ecrou' },
      narration: 'Premier piège, le plus connu : l’écrou oublié. Le dudgeon est parfait, et l’écrou est resté sur l’établi. Il n’y a qu’un remède : recouper et tout refaire.' },
    { titre: 'Le dudgeon fendu', voit: 'Une fissure au bord du cône.', cause: 'Cuivre écroui non recuit, paroi amincie à l’ébavurage, ou évasement forcé.',
      eviter: 'Tube recuit, ébavurage léger, arrêt à la butée.', geste: 4, figure: { svg: 'dudgeon', etat: 'fissure' },
      narration: 'Deuxième piège : la fissure. Elle est parfois fine comme un cheveu, et elle fuira à coup sûr. Le cuivre était dur, ou la paroi trop amincie, ou l’on a forcé au-delà de la butée.' },
    { titre: 'Le dudgeon oblique', voit: 'Le cône est plus large d’un côté.', cause: 'Coupe de travers, ou cône posé hors du centre.',
      eviter: 'Coupe d’équerre, cône centré.', geste: 0, figure: { svg: 'dudgeon', etat: 'oblique' },
      narration: 'Troisième piège : le dudgeon oblique, qui ne portera que d’un côté. Il vient presque toujours d’une coupe de travers, ou d’un étrier mal centré.' },
    { titre: 'Trop grand ou trop petit', voit: 'L’écrou ne passe pas, ou le cône ne remplit pas le raccord.', cause: 'Mauvais dépassement dans la barre.',
      eviter: 'Respecter la cote A de votre diamètre.', geste: 2, figure: { svg: 'dudgeon', etat: 'mors' },
      narration: 'Quatrième piège : la mauvaise taille. Trop de tube dépassait de la barre, et le cône est trop grand : l’écrou ne se visse pas. Pas assez, et le cône est trop petit : il fuira. Tout se joue à la cote A.' },
    { titre: 'Le mauvais serrage', voit: 'Une fuite, ou un dudgeon écrasé, un écrou fendu.', cause: 'Serrage au jugé, ou sans contre-clé.',
      eviter: 'Clé dynamométrique au couple, contre-clé sur le raccord.', geste: 7, figure: { svg: 'dudgeon', etat: 'serrage' },
      narration: 'Dernier piège : le serrage au jugé. Trop faible, le raccord fuit ; trop fort, on écrase le dudgeon qu’on a si bien réussi, ou l’on fend l’écrou. La clé dynamométrique n’est pas un luxe : c’est elle qui rend le raccord étanche.' }
  ],
  controles: [
    { question: 'L’écrou est-il enfilé, et coulisse-t-il librement ?', comment: 'Faites glisser l’écrou jusqu’au dudgeon : il vient le coiffer.', siNon: 'Écrou oublié : recoupez. Écrou qui bloque : dudgeon trop grand.', geste: 1,
      figure: { svg: 'dudgeon', etat: 'controle' }, narration: 'Premier contrôle : l’écrou vient coiffer le dudgeon.' },
    { question: 'Le cône est-il sans fissure ?', comment: 'Regardez tout le bord, en tournant le tube à la lumière.', siNon: 'Recoupez et refaites : tube recuit, sans forcer.', geste: 4,
      figure: { svg: 'dudgeon', etat: 'fissure' }, narration: 'Deuxième contrôle : pas la moindre fissure au bord du cône.' },
    { question: 'La portée est-elle lisse et propre ?', comment: 'Ni bavure, ni rayure, ni marque d’outil.', siNon: 'Recoupez : l’ébavurage était insuffisant.', geste: 0,
      figure: { svg: 'bout', etat: 'propre' }, narration: 'Troisième contrôle : la surface du cône est lisse.' },
    { question: 'Le dudgeon est-il centré, d’épaisseur égale ?', comment: 'Regardez-le de face : le bord a la même largeur tout autour.', siNon: 'Recoupez : coupe d’équerre, étrier centré.', geste: 3,
      figure: { svg: 'dudgeon', etat: 'oblique' }, narration: 'Quatrième contrôle : le dudgeon est centré.' },
    { question: 'Le cône épouse-t-il le raccord ?', comment: 'Présentez-le sur le raccord : il porte tout autour.', siNon: 'Trop grand ou trop petit : revoyez le dépassement A.', geste: 2,
      figure: { img: 'images/1-6-serrage.webp', alt: 'Essai sur le raccord' }, narration: 'Dernier contrôle : l’essai sur le raccord.' }
  ],
  prof: {
    verifie: ['L’écrou en place, qui coulisse et coiffe le dudgeon', 'Le cône : sans fissure, lisse, centré', 'Le montage : à la main, puis au couple à deux clés', 'Plus tard : l’essai d’étanchéité'],
    narration: 'Le professeur regarde votre dudgeon avant le montage, puis votre serrage. Un raccord frigorifique se juge sur une seule chose : son étanchéité. Elle se vérifiera plus tard, sous pression d’azote. Aujourd’hui, le professeur confirme que votre dudgeon a tout pour la réussir.'
  }
});

/* Station 1-7 — L'emboîture à la pince (l'expandeur). Source : sources-metier/1-7-emboiture.md
   Outil des fiches : la « pince à emboîture (expandeur) » et ses têtes, une par diamètre.
   Serrage en trois temps avec un quart de tour (fiche « T.P Les assemblages par emboîture ») ;
   recuit exigé sur tube écroui seulement (DÉCIDÉ le 30/09/2026) : la station part d'un tube recuit en
   couronne, le recuit d'une barre est fait par le professeur, au chalumeau (ligne 2).
   Profondeur d'emboîture : DÉCIDÉE le 30/09/2026, de 1 à 1,5 fois le diamètre (DECISIONS-2026-09-30.md). */
CUIVREZO.stations.push({
  id: '1-7', ligne: 1, titre: 'L’emboîture à la pince', duree: '20 min', vignette: 'images/1-7-pince.webp',
  sources: ['sources-metier/1-7-emboiture.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un bout élargi où l’autre tube entre juste',
    texte: 'Le bout du tube est élargi, droit dans l’axe, sans fente. Un tube du même diamètre y entre sans forcer et sans jouer : il est prêt pour la brasure.',
    criteres: ['L’autre tube entre sans forcer, et sans jouer', 'Emboîture sans fente ni bavure', 'Régulière, ronde, alignée sur l’axe du tube', 'Profondeur d’emboîture conforme'],
    figure: { composant: 'cuivre-3d', attributs: { piece: 'emboiture', angle: '90' }, legende: 'Le tube mâle dans l’emboîture : un jeu de quelques dixièmes.' },
    narration: 'Pour raccorder deux tubes de même diamètre, on peut ajouter un manchon, avec deux brasures. Ou bien élargir le bout de l’un pour y glisser l’autre : une seule brasure, donc une seule fuite possible au lieu de deux. C’est l’emboîture. Tout son secret tient dans un jeu minuscule entre les deux tubes : assez pour que la brasure s’y glisse, pas assez pour que le tube joue. Le seul contrôle qui compte, c’est l’essai : l’autre tube doit entrer sans forcer, et sans jouer.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/1-7-pince.webp', alt: 'La pince à emboîture, tête engagée dans le tube' },
    items: [
      { nom: 'La pince à emboîture', detail: 'l’expandeur, avec son jeu de têtes' },
      { nom: 'La tête du diamètre du tube', detail: 'une tête par diamètre' },
      { nom: 'Un tube recuit, coupé d’équerre et ébavuré', detail: 'en couronne, il se travaille tel quel ; une barre écrouie est recuite d’abord par le professeur, au chalumeau' },
      { nom: 'Un bout du même tube pour l’essai', detail: 'c’est lui qui dira si l’emboîture est bonne' },
      { nom: 'Le mètre et le feutre', detail: 'pour la profondeur d’emboîture' }
    ],
    narration: 'La pince à emboîture, qu’on appelle aussi l’expandeur, ressemble à une grosse pince. Au bout, on visse une tête faite de segments : quand on serre les poignées, les segments s’écartent et poussent la paroi du tube vers l’extérieur. Chaque tête correspond à un seul diamètre. Gardez près de vous un bout du même tube : c’est lui qui servira à l’essai final.'
  },
  gestes: [
    { titre: 'Partir d’un bout parfait', texte: 'Coupé d’équerre au coupe-tube, ébavuré bout vers le bas, sans trop enlever de métal.',
      pointCle: 'Une bavure oubliée fait fendre le tube.',
      pourquoi: 'Au moment d’élargir, la moindre entaille au bord devient le départ d’une fente. Et une bavure abîme aussi la tête de la pince.',
      figure: { svg: 'bout', etat: 'propre' }, clip: 'clips/1-7/01-bout.mp4',
      narration: 'Comme pour le dudgeon, tout commence par un bout parfait : coupé d’équerre, ébavuré bout vers le bas. Ici, c’est encore plus important. En élargissant le tube, on étire le cuivre, et la moindre entaille au bord devient le point de départ d’une fente.' },
    { titre: 'Choisir la tête du bon diamètre', texte: 'Prenez la tête qui porte le diamètre du tube.',
      pointCle: 'Une tête par diamètre, jamais « à peu près ».',
      pourquoi: 'Trop grosse, le jeu est trop grand : la brasure ne remplit plus le joint. Trop petite, l’autre tube n’entre pas.',
      figure: { svg: 'emboiture', etat: 'tete' }, clip: 'clips/1-7/02-tete.mp4',
      narration: 'Chaque tête est faite pour un diamètre. Une tête trop grosse élargit trop : l’autre tube flotte, et la brasure, qui monte par capillarité dans un jeu très fin, ne remplit plus le joint. Une tête trop petite n’élargit pas assez : l’autre tube n’entre pas. On prend la tête du diamètre exact.' },
    { titre: 'Visser la tête sur la pince', texte: 'Pince ouverte, vissez la tête à fond, dans le sens des aiguilles d’une montre.',
      pointCle: 'Tête vissée à fond, pince ouverte.',
      pourquoi: 'Une tête mal vissée se désaxe au serrage et élargit de travers.',
      figure: { img: 'images/1-7-pince.webp', alt: 'La pince et sa tête' }, clip: 'clips/1-7/03-visser.mp4',
      narration: 'On ouvre la pince et on visse la tête à fond, dans le sens des aiguilles d’une montre. Une tête mal vissée bouge au serrage, et l’emboîture part de travers.' },
    { titre: 'Enfiler la tête jusqu’à la butée', texte: 'Pince ouverte, enfilez la tête dans le tube jusqu’à la butée. Tenez le tube à la main, la pince dans son axe.',
      pointCle: 'À la main, pas dans l’étau : la pince doit rester dans l’axe du tube.',
      pourquoi: 'Serré dans l’étau, le tube ne peut plus suivre la pince : l’emboîture se désaxe.',
      figure: { svg: 'emboiture', etat: 'tete' }, clip: 'clips/1-7/04-enfiler.mp4',
      narration: 'On enfile la tête dans le bout du tube, jusqu’à la butée. Le tube se tient à la main, pas dans l’étau. Pourquoi ? Parce que la pince doit rester exactement dans l’axe du tube, et qu’un tube bloqué dans l’étau ne peut pas s’aligner avec elle.' },
    { titre: 'Serrer un premier tiers', texte: 'Serrez les poignées environ au tiers de leur course, puis desserrez.',
      pointCle: 'Jamais tout d’un coup.',
      pourquoi: 'Élargi en une seule fois, le cuivre se fend.',
      figure: { svg: 'emboiture', etat: 'ouvrir' }, clip: 'clips/1-7/05-tiers.mp4',
      narration: 'Premier serrage, au tiers de la course environ. Les segments de la tête s’écartent et poussent la paroi. Puis on desserre. On ne va jamais jusqu’au bout du premier coup : le cuivre a besoin d’être élargi par étapes, sinon il se fend.' },
    { titre: 'Tourner d’un quart de tour', texte: 'Pince desserrée, tournez-la d’un quart de tour dans le tube.',
      pointCle: 'Entre deux serrages, un quart de tour.',
      pourquoi: 'Les segments laissent de petites marques entre eux. En tournant, le serrage suivant les efface : l’emboîture reste ronde.',
      figure: { svg: 'emboiture', etat: 'tourner' }, clip: 'clips/1-7/06-quart.mp4',
      narration: 'La pince desserrée, on la fait tourner d’un quart de tour dans le tube. La tête est faite de segments séparés par de petits espaces : chaque serrage laisse une trace à leur place. En tournant avant de serrer de nouveau, on répartit le travail, et l’emboîture reste bien ronde.' },
    { titre: 'Serrer aux deux tiers, puis jusqu’à la butée', texte: 'Serrez aux deux tiers, desserrez, puis serrez jusqu’à la butée de la pince.',
      pointCle: 'Trois serrages progressifs, jusqu’à la butée.',
      pourquoi: 'La butée fixe le diamètre final : c’est elle qui donne le bon jeu.',
      figure: { svg: 'emboiture', etat: 'ouvrir' }, clip: 'clips/1-7/07-butee.mp4',
      narration: 'Deuxième serrage, aux deux tiers de la course. Puis le dernier, jusqu’à la butée de la pince. C’est la butée qui fixe le diamètre final de l’emboîture, et donc le jeu. Trois serrages progressifs, jamais un seul.' },
    { titre: 'Retirer et essayer', texte: 'Desserrez, retirez la tête. Glissez le bout de tube d’essai dans l’emboîture.',
      pointCle: 'Il entre sans forcer, et sans jouer.',
      pourquoi: 'C’est le seul contrôle qui compte : il dit tout du jeu que remplira la brasure.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/1-7/08-essai.mp4',
      narration: 'On desserre, on retire la tête, et on fait l’essai. Le bout de tube d’essai doit entrer à la main, sans forcer, et une fois entré, il ne doit pas jouer. S’il force, l’emboîture est trop étroite ; s’il flotte, elle est trop large. Ce jeu, presque invisible, c’est celui que la brasure viendra remplir.' }
  ],
  pieges: [
    { titre: 'L’emboîture fendue', voit: 'Une fente au bord du tube élargi.', cause: 'Tube écroui non recuit, bavure laissée, ou serrage en une seule fois.',
      eviter: 'Tube recuit, bout ébavuré, trois serrages progressifs.', geste: 4, figure: { svg: 'emboiture', etat: 'fissure' },
      narration: 'Premier piège : la fente. Elle vient d’un cuivre trop dur, d’une bavure oubliée, ou d’un serrage fait d’un seul coup. Une emboîture fendue ne se rattrape pas : la brasure ne tiendra pas.' },
    { titre: 'L’emboîture de travers', voit: 'Le bout élargi n’est pas dans l’axe du tube.', cause: 'Tube serré dans l’étau, ou pince tenue de biais.',
      eviter: 'Tube à la main, pince dans l’axe.', geste: 3, figure: { svg: 'emboiture', etat: 'ovale' },
      narration: 'Deuxième piège : l’emboîture de travers. Les deux tubes ne seront pas alignés, et le jeu sera plus grand d’un côté que de l’autre. Tube à la main, pince dans l’axe.' },
    { titre: 'Le tube qui joue', voit: 'Le tube d’essai flotte dans l’emboîture.', cause: 'Tête trop grosse pour le tube.',
      eviter: 'La tête du diamètre exact.', geste: 1, figure: { svg: 'emboiture', etat: 'profil' },
      narration: 'Troisième piège : le tube d’essai flotte. La tête était trop grosse. Avec trop de jeu, la brasure ne monte plus par capillarité, et le joint reste creux.' },
    { titre: 'L’emboîture ovale', voit: 'Le bout élargi n’est pas rond.', cause: 'Tête engagée de travers, ou pas de quart de tour entre les serrages.',
      eviter: 'Tête enfilée droit, quart de tour entre deux serrages.', geste: 5, figure: { svg: 'emboiture', etat: 'ovale' },
      narration: 'Quatrième piège : l’emboîture ovale. La tête était de biais, ou l’on a serré toujours au même endroit. Le jeu devient irrégulier.' },
    { titre: 'La tête bloquée', voit: 'La tête ne sort plus du tube.', cause: 'On a élargi un tube encore chaud du recuit.',
      eviter: 'Laisser refroidir le tube avant d’élargir.', geste: 3, figure: { svg: 'emboiture', etat: 'tete' },
      narration: 'Dernier piège, quand le tube a été recuit : élargir un tube encore chaud. En refroidissant, il se resserre sur la tête et la bloque. On attend toujours qu’il soit froid.' }
  ],
  controles: [
    { question: 'Le tube d’essai entre-t-il sans forcer ?', comment: 'Glissez-le à la main.', siNon: 'Emboîture trop étroite : vérifiez la tête et allez jusqu’à la butée.', geste: 6,
      figure: { svg: 'emboiture', etat: 'profil' }, narration: 'Premier contrôle : le tube d’essai entre à la main.' },
    { question: 'Une fois entré, ne joue-t-il pas ?', comment: 'Essayez de le faire bouger de côté.', siNon: 'Trop de jeu : la tête était trop grosse. Recoupez et recommencez.', geste: 1,
      figure: { svg: 'emboiture', etat: 'profil' }, narration: 'Deuxième contrôle : entré, il ne bouge pas de côté.' },
    { question: 'L’emboîture est-elle sans fente ?', comment: 'Regardez tout le bord, à la lumière.', siNon: 'Recoupez, et reprenez sur un tube recuit, en trois serrages.', geste: 4,
      figure: { svg: 'emboiture', etat: 'fissure' }, narration: 'Troisième contrôle : aucune fente au bord.' },
    { question: 'Est-elle ronde et dans l’axe ?', comment: 'Regardez le bout de face, puis de profil.', siNon: 'Recoupez : tube à la main, pince dans l’axe, quart de tour.', geste: 5,
      figure: { svg: 'emboiture', etat: 'ovale' }, narration: 'Quatrième contrôle : ronde, et bien dans l’axe du tube.' },
    { question: 'La profondeur est-elle conforme ?', comment: 'Mesurez la longueur élargie : au moins le diamètre du tube, au plus une fois et demie ce diamètre (de 14 à 21 mm pour un tube de 14).', siNon: 'Trop courte : recoupez et recommencez, tête enfilée jusqu’à la butée. Si le plan demande autre chose, voyez le professeur.', geste: 6,
      figure: { svg: 'emboiture', etat: 'profil' }, narration: 'Dernier contrôle : la longueur élargie. Elle doit valoir au moins le diamètre du tube, et au plus une fois et demie ce diamètre.' }
  ],
  prof: {
    verifie: ['L’essai d’emboîtement : sans forcer, sans jouer', 'L’emboîture : sans fente, ronde, dans l’axe', 'Le geste : trois serrages, quart de tour, tube à la main', 'Avant de braser : il voit toutes les emboîtures'],
    narration: 'Le professeur fait l’essai avec vous, et regarde l’emboîture de près. Dans les fiches de l’atelier, les emboîtures se montrent toujours avant de braser : une fois brasées, un défaut ne se corrige plus. La brasure, justement, fera l’objet d’une prochaine ligne.'
  }
});

/* Station 2-1 — Le poste oxyacétylénique en sécurité. Source : sources-metier/2-chalumeau.md (partie 2-1)
   Référence : INRS ED 742, fiche de poste CDG, fiches de l'atelier. Ogive O blanche, A marron.
   Pressions de réglage : valeurs RÉGLÉES PAR LE PROFESSEUR d'après la notice du chalumeau et de la buse
   (INRS ED 742 : « réglages conseillés par le fabricant ») ; jamais plus de 1,5 bar d'acétylène (INRS).
   Ordre du poste : le gaz combustible s'ouvre en dernier et se ferme en premier (DECISIONS-2026-09-30.md). */
CUIVREZO.stations.push({
  id: '2-1', ligne: 2, titre: 'Le poste oxyacétylénique en sécurité', duree: '20 min', vignette: 'images/2-1-poste.webp',
  sources: ['sources-metier/2-chalumeau.md'],
  referentiel: { taches: [REF.T12, REF.T6], competences: [REF.C31, REF.C34], savoirs: [REF.S62, REF.S63] },
  obtenir: {
    titre: 'Un poste prêt à allumer, vérifié, sans fuite',
    texte: 'Rien n’est allumé. Les bouteilles sont debout et arrimées, les pressions réglées, le poste est étanche, et le professeur l’a visé.',
    criteres: ['Protections portées, zone dégagée, extincteur repéré', 'Bouteilles debout, arrimées ; gaz reconnus à l’ogive', 'Basse pression réglée à la valeur donnée', 'Aucune bulle à l’eau savonneuse ; visa du professeur'],
    figure: { img: 'images/2-1-poste.webp', alt: 'Le poste oxyacétylénique : deux bouteilles arrimées, détendeurs, tuyaux, chalumeau' },
    narration: 'Le chalumeau oxyacétylénique produit une flamme de plus de trois mille degrés. Il est indispensable pour braser, et il ne pardonne aucune négligence : l’oxygène fait flamber ce qui est gras, l’acétylène devient instable sous pression, un retour de flamme peut remonter les tuyaux. Cette station ne vous fait pas allumer. Elle vous apprend à préparer et à vérifier le poste, pour que l’allumage, qui se fera toujours devant le professeur, se passe sans surprise.'
  },
  materiel: {
    titre: 'Ce que je vérifie sur le poste',
    figure: { svg: 'oa', etat: 'poste' },
    items: [
      { nom: 'Mes protections', detail: 'lunettes teintées, gants et tablier en cuir, tenue en coton, chaussures montantes' },
      { nom: 'La bouteille d’oxygène', detail: 'ogive blanche' },
      { nom: 'La bouteille d’acétylène', detail: 'ogive marron' },
      { nom: 'Les deux détendeurs', detail: 'manomètre haute pression, manomètre basse pression, vis de détente' },
      { nom: 'Les tuyaux et les clapets anti-retour', detail: 'bleu pour l’oxygène, rouge pour l’acétylène' },
      { nom: 'L’allumeur à pierre, l’extincteur, l’eau savonneuse', detail: 'jamais de briquet' }
    ],
    narration: 'Voici le poste. Deux bouteilles, reconnaissables à la couleur de leur ogive, la partie haute : blanche pour l’oxygène, marron pour l’acétylène. Sur chacune, un détendeur, qui abaisse la pression de la bouteille à celle du travail. Puis deux tuyaux, bleu pour l’oxygène, rouge pour l’acétylène, et près du chalumeau, les clapets anti-retour, qui arrêtent une flamme qui voudrait remonter. On vérifie chaque élément avant d’y mettre la main.'
  },
  gestes: [
    { titre: 'M’équiper', texte: 'Lunettes à verres teintés avec protections sur les côtés, gants et tablier en cuir, tenue en coton, pantalon sur les chaussures. Le professeur vous donne le numéro de teinte.',
      pointCle: 'Rien de gras sur moi ni sur mes gants.',
      pourquoi: 'La flamme rayonne et projette. Et un tissu gras au contact de l’oxygène peut s’enflammer tout seul.',
      figure: { img: 'images/reprises/epi-familles.svg', alt: 'Les protections' }, clip: 'clips/2-1/01-epi.mp4',
      narration: 'On s’équipe avant de toucher au poste. Des lunettes à verres teintés, avec des protections sur les côtés, contre le rayonnement de la flamme et les projections. Le numéro de teinte dépend de la buse : c’est le professeur qui vous le donne. Des gants et un tablier en cuir, une tenue en coton, le pantalon par-dessus les chaussures pour qu’une projection n’y tombe pas. Et rien de gras : un tissu ou un gant graisseux, au contact de l’oxygène, peut s’enflammer tout seul.' },
    { titre: 'Dégager la zone', texte: 'Un mètre libre autour du poste. Repérez l’extincteur.',
      pointCle: 'Ni chiffon, ni carton, ni produit inflammable.',
      pourquoi: 'L’oxygène active le moindre départ de feu.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/2-1/02-zone.mp4',
      narration: 'On dégage un mètre autour du poste : rien qui puisse brûler. L’oxygène rend un feu beaucoup plus violent. Et on repère l’extincteur, pour ne pas avoir à le chercher.' },
    { titre: 'Contrôler les bouteilles', texte: 'Debout, à la verticale, arrimées par leur chaîne, loin de toute chaleur. Reconnaissez-les à l’ogive. Une bouteille d’acétylène qui a été couchée ne s’utilise pas : prévenez le professeur.',
      pointCle: 'L’acétylène ne se couche jamais.',
      pourquoi: 'Couchée, l’acétylène laisse couler l’acétone qui la stabilise. Et une bouteille chauffée voit sa pression monter.',
      figure: { svg: 'oa', etat: 'poste' }, clip: 'clips/2-1/03-bouteilles.mp4',
      narration: 'On regarde les bouteilles. Debout, retenues par leur chaîne, loin de toute source de chaleur. L’acétylène, surtout, ne se couche jamais : à l’intérieur, il est dissous dans un liquide qui le stabilise, et couchée, ce liquide s’écoule par le robinet. Une bouteille d’acétylène qui a été couchée ne se sert pas : on prévient le professeur. On reconnaît chaque gaz à la couleur de l’ogive, pas à l’étiquette qui a pu tomber.' },
    { titre: 'Vérifier le détendeur et le chalumeau fermés', texte: 'Vis de détente desserrées à fond, robinets du chalumeau fermés.',
      pointCle: 'Vis desserrée : rien ne passe vers le chalumeau.',
      pourquoi: 'Si la vis est serrée à l’ouverture de la bouteille, la pression arrive d’un coup sur le détendeur et dans les tuyaux.',
      figure: { svg: 'oa', etat: 'detendeur' }, clip: 'clips/2-1/04-detendeur.mp4',
      narration: 'Avant d’ouvrir une bouteille, on vérifie que la vis de détente du détendeur est desserrée à fond, et que les robinets du chalumeau sont fermés. Une vis desserrée, c’est un détendeur fermé : rien ne passe vers les tuyaux. Si elle était serrée, la pleine pression de la bouteille arriverait d’un coup.' },
    { titre: 'Contrôler tuyaux et clapets', texte: 'Tuyaux sans nœud ni pincement, bien raccordés à leur couleur. Clapets anti-retour en place.',
      pointCle: 'Bleu sur l’oxygène, rouge sur l’acétylène.',
      pourquoi: 'Les clapets arrêtent un retour de flamme avant qu’il ne remonte vers les bouteilles.',
      figure: { svg: 'oa', etat: 'poste' }, clip: 'clips/2-1/05-tuyaux.mp4',
      narration: 'On suit les tuyaux du regard, de la bouteille au chalumeau : pas de nœud, pas de pincement, pas d’entaille. Chacun est raccordé à sa couleur. Près du chalumeau, les clapets anti-retour sont en place : ce sont eux qui arrêtent une flamme qui voudrait remonter vers les bouteilles.' },
    { titre: 'Ouvrir l’oxygène, lentement', texte: 'À la main, un quart de tour, le corps sur le côté du détendeur. Lisez la haute pression.',
      pointCle: 'Un quart de tour suffit, et on reste de côté.',
      pourquoi: 'Un quart de tour se referme vite en cas d’incident. De côté, on n’est pas dans l’axe si le détendeur cède.',
      figure: { svg: 'oa', etat: 'ouvrir' }, clip: 'clips/2-1/06-ouvrir-o.mp4',
      narration: 'On ouvre la bouteille d’oxygène à la main, lentement, d’un quart de tour seulement, en se tenant sur le côté du détendeur, jamais en face. Un quart de tour suffit à faire passer le gaz, et se referme en un geste s’il faut couper vite. Le manomètre de haute pression indique ce qui reste dans la bouteille.' },
    { titre: 'Régler la basse pression d’oxygène', texte: 'Vissez la vis de détente jusqu’à la valeur donnée par le professeur.',
      pointCle: 'La valeur de l’atelier, pas une valeur au hasard.',
      pourquoi: 'Le chalumeau et la buse sont prévus pour une pression donnée : trop, la flamme se décolle ; pas assez, elle claque.',
      figure: { svg: 'oa', etat: 'detendeur' }, clip: 'clips/2-1/07-bp-o.mp4',
      narration: 'On visse doucement la vis de détente, en regardant le manomètre de basse pression, jusqu’à la valeur que donne le professeur pour l’atelier. Cette valeur dépend du chalumeau et de sa buse, d’après la notice du fabricant : ce n’est pas à vous de la deviner, c’est la valeur affichée au poste qui fait foi.' },
    { titre: 'Ouvrir et régler l’acétylène', texte: 'Toujours après l’oxygène : même geste sur la bouteille d’acétylène, clé laissée dessus. Basse pression à la valeur donnée.',
      pointCle: 'Jamais plus de 1,5 bar d’acétylène.',
      pourquoi: 'Au-delà, l’acétylène peut se décomposer violemment, même sans flamme.',
      figure: { svg: 'oa', etat: 'ouvrir' }, clip: 'clips/2-1/08-ouvrir-a.mp4',
      narration: 'Même geste pour l’acétylène, toujours après l’oxygène : le gaz combustible s’ouvre en dernier. Un quart de tour, lentement, de côté. On laisse la clé sur le robinet, pour pouvoir le refermer aussitôt. Puis on règle sa basse pression à la valeur que donne le professeur. L’acétylène ne s’utilise jamais au-dessus d’un bar et demi : au-delà, il peut se décomposer violemment, même sans flamme.' },
    { titre: 'Chercher les fuites à l’eau savonneuse', texte: 'Au pinceau, sur les détendeurs, les robinets et les raccords. Une bulle, c’est une fuite.',
      pointCle: 'Jamais une flamme pour chercher une fuite.',
      pourquoi: 'Une fuite de gaz sur un poste qu’on va allumer, c’est un départ de feu assuré.',
      figure: { svg: 'oa', etat: 'savon' }, clip: 'clips/2-1/09-savon.mp4',
      narration: 'Dernier contrôle avant l’allumage : l’étanchéité. Au pinceau, on passe de l’eau savonneuse sur les raccords des détendeurs, des robinets et des tuyaux. Si une bulle se forme, il y a une fuite : on ferme, et on appelle. On ne cherche jamais une fuite avec une flamme.' },
    { titre: 'Appeler le professeur', texte: 'Le poste est prêt. Le professeur le vérifie et le vise : pas de visa, pas d’allumage.',
      pointCle: 'L’allumage se fait toujours devant le professeur.',
      pourquoi: 'C’est la règle de l’atelier : aucun élève seul à un poste allumé.',
      figure: { img: 'images/2-1-poste.webp', alt: 'Le poste prêt, chalumeau éteint' }, clip: 'clips/2-1/10-visa.mp4',
      narration: 'Le poste est prêt, et rien n’est allumé. On appelle le professeur, qui vérifie à son tour et vise votre fiche. C’est la règle de l’atelier : on n’allume jamais sans lui. La station suivante vous prépare justement à cet allumage.' }
  ],
  pieges: [
    { titre: 'La graisse et l’oxygène', voit: 'Un raccord ou un détendeur qui s’enflamme.', cause: 'Une main, un gant ou un chiffon gras sur le circuit d’oxygène.',
      eviter: 'Rien de gras sur le poste, ni sur les mains.', geste: 0, figure: { svg: 'oa', etat: 'detendeur' },
      narration: 'Premier piège, le plus surprenant : la graisse. Au contact de l’oxygène sous pression, un corps gras peut s’enflammer tout seul. Mains, gants, chiffons : rien de gras près du poste.' },
    { titre: 'La fuite cherchée à la flamme', voit: 'Une explosion, ou un jet de flamme.', cause: 'On a voulu « voir » s’il y avait une fuite.',
      eviter: 'Eau savonneuse, toujours.', geste: 8, figure: { svg: 'oa', etat: 'savon' },
      narration: 'Deuxième piège : chercher une fuite avec une flamme. C’est ainsi que naissent les accidents les plus graves. Une fuite se cherche à l’eau savonneuse.' },
    { titre: 'Le robinet ouvert brutalement', voit: 'Le détendeur prend un coup de pression.', cause: 'Précipitation, vis de détente serrée.',
      eviter: 'Vis desserrée, un quart de tour, lentement.', geste: 5, figure: { svg: 'oa', etat: 'ouvrir' },
      narration: 'Troisième piège : ouvrir une bouteille d’un coup, vis de détente serrée. La pression frappe le détendeur. Lentement, un quart de tour, vis desserrée.' },
    { titre: 'La bouteille couchée ou libre', voit: 'Une bouteille d’acétylène couchée, ou debout sans chaîne.', cause: 'Rangement négligé.',
      eviter: 'Debout, arrimée, toujours.', geste: 2, figure: { svg: 'oa', etat: 'poste' },
      narration: 'Quatrième piège : la bouteille mal tenue. Une bouteille qui tombe peut casser son robinet ; une bouteille d’acétylène couchée laisse s’échapper ce qui la stabilise.' }
  ],
  controles: [
    { question: 'Mes protections sont-elles complètes ?', comment: 'Lunettes teintées, gants et tablier en cuir, tenue en coton.', siNon: 'Complétez avant de toucher au poste.', geste: 0,
      figure: { img: 'images/reprises/epi-familles.svg', alt: 'Les protections' }, narration: 'Premier contrôle : vos protections.' },
    { question: 'La zone est-elle libre sur un mètre ?', comment: 'Regardez autour du poste.', siNon: 'Dégagez tout ce qui peut brûler.', geste: 1,
      figure: { svg: 'poste', etat: 'secours' }, narration: 'Deuxième contrôle : un mètre de libre autour du poste.' },
    { question: 'Les bouteilles sont-elles debout et arrimées ?', comment: 'Chaîne en place, acétylène jamais couchée.', siNon: 'Redressez, arrimez, prévenez le professeur.', geste: 2,
      figure: { svg: 'oa', etat: 'poste' }, narration: 'Troisième contrôle : les bouteilles, debout et arrimées.' },
    { question: 'Les basses pressions sont-elles à la valeur donnée ?', comment: 'Lisez les deux manomètres de basse pression.', siNon: 'Réglez à la vis de détente.', geste: 6,
      figure: { svg: 'oa', etat: 'detendeur' }, narration: 'Quatrième contrôle : les deux basses pressions.' },
    { question: 'Aucune bulle à l’eau savonneuse ?', comment: 'Détendeurs, robinets, raccords.', siNon: 'Fermez les bouteilles et appelez le professeur.', geste: 8,
      figure: { svg: 'oa', etat: 'savon' }, narration: 'Dernier contrôle : pas une bulle.' }
  ],
  prof: {
    verifie: ['La fiche de sécurité, signée', 'Le poste : bouteilles, détendeurs, tuyaux, clapets', 'Les pressions (valeurs de la notice du chalumeau, acétylène au plus 1,5 bar) et l’étanchéité', 'La teinte des lunettes, choisie d’après la buse (NF EN 169 : n° 4 jusqu’à 70 l/h d’acétylène, n° 5 jusqu’à 200, n° 6 jusqu’à 800, n° 7 au-delà)', 'Son visa : sans lui, pas d’allumage'],
    narration: 'Le professeur vérifie le poste à son tour, sans complaisance : c’est sa signature qui autorise l’allumage. Un poste bien préparé, c’est la moitié de la sécurité du chalumeau. L’autre moitié, c’est l’allumage, la flamme et l’extinction : la station suivante.'
  }
});

/* Station 2-2 — Allumer, régler, éteindre la flamme. Source : sources-metier/2-chalumeau.md (partie 2-2)
   RÈGLE DES FICHES : le professeur est présent à CHAQUE allumage ; aucun élève seul à un poste allumé.
   La station prépare le geste, elle ne remplace pas la surveillance.
   DÉCIDÉ le 30/09/2026 (DECISIONS-2026-09-30.md) : le gaz combustible s'ouvre en dernier et se ferme en premier.
   Allumage : oxygène un peu, acétylène largement, allumer, régler (INRS ED 742 p. 22). Extinction : acétylène,
   un peu d'oxygène, oxygène (INRS). Fin de travail : bouteilles fermées (acétylène d'abord), purge à zéro,
   vis desserrées, robinets du chalumeau refermés (OPPBTP, notice WELDTEAM, cinq fiches). */
CUIVREZO.stations.push({
  id: '2-2', ligne: 2, titre: 'Allumer, régler, éteindre la flamme', duree: '25 min', vignette: 'images/2-2-allumer.webp',
  sources: ['sources-metier/2-chalumeau.md'],
  referentiel: { taches: [REF.T12, REF.T10], competences: [REF.C31, REF.C34], savoirs: [REF.S62, REF.S63] },
  obtenir: {
    titre: 'Une flamme neutre, allumée et éteinte dans l’ordre',
    texte: 'Devant le professeur, vous allumez, vous réglez une flamme neutre, vous nommez les deux autres, et vous éteignez dans le bon ordre.',
    criteres: ['Allumage dans l’ordre, avec l’allumeur à pierre', 'Flamme neutre : dard net, arrondi, ni sifflement ni fumée', 'Les deux autres flammes reconnues et nommées', 'Extinction dans l’ordre, poste refermé en fin de travail'],
    figure: { svg: 'flamme', etat: 'neutre', legende: 'La flamme neutre : un dard net, arrondi, bien délimité.' },
    narration: 'Allumer un chalumeau n’a rien de difficile, à condition de toujours faire les gestes dans le même ordre. C’est l’ordre qui protège : il évite le claquement à l’allumage, la fumée noire, et le retour de flamme à l’extinction. Dans cette station, vous apprenez cet ordre et vous apprenez à lire la flamme. Mais retenez la règle de l’atelier : vous n’allumez jamais seul, le professeur est toujours là.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/2-2-allumer.webp', alt: 'Allumer le chalumeau à l’allumeur à pierre' },
    items: [
      { nom: 'Le poste préparé et visé', detail: 'station 2.1 : pressions réglées, sans fuite' },
      { nom: 'Le chalumeau et sa buse', detail: 'la buse adaptée au travail, donnée par le professeur' },
      { nom: 'L’allumeur à pierre', detail: 'jamais un briquet' },
      { nom: 'Mes protections', detail: 'lunettes teintées, gants à manchettes, tablier' }
    ],
    narration: 'On part d’un poste préparé et visé à la station deux point un. Le chalumeau porte deux robinets : le bleu pour l’oxygène, le rouge pour l’acétylène. On allume avec un allumeur à pierre, jamais avec un briquet, qui peut exploser dans la main. Et les lunettes teintées sont sur les yeux avant la première étincelle.'
  },
  gestes: [
    { titre: 'Orienter la buse, préparer l’allumeur', texte: 'Buse vers une zone libre. L’allumeur à pierre en main avant d’ouvrir le moindre robinet.',
      pointCle: 'Jamais vers un camarade, un tuyau, une bouteille.',
      pourquoi: 'Un chalumeau ouvert et pas encore allumé laisse échapper du gaz : l’allumeur doit être prêt.',
      figure: { img: 'images/2-2-allumer.webp', alt: 'Buse vers une zone libre, allumeur en main' }, clip: 'clips/2-2/01-orienter.mp4',
      narration: 'Avant d’ouvrir quoi que ce soit, on oriente la buse vers une zone libre : jamais vers quelqu’un, ni vers un tuyau, ni vers une bouteille. Et l’allumeur est déjà dans l’autre main. Un chalumeau qu’on ouvre sans pouvoir l’allumer aussitôt laisse le gaz s’échapper.' },
    { titre: 'Ouvrir un peu l’oxygène', texte: 'Ouvrez légèrement le robinet bleu.',
      pointCle: 'Un filet d’oxygène, pas plus.',
      pourquoi: 'Ce filet évite les flammèches noires et fumeuses de l’acétylène pur à l’allumage.',
      figure: { svg: 'oa', etat: 'allumer' }, clip: 'clips/2-2/02-oxygene.mp4',
      narration: 'Premier robinet : l’oxygène, le bleu, ouvert légèrement. Juste un filet. Il évite qu’à l’allumage l’acétylène brûle seul, en flammèches noires et en suie. C’est l’ordre que recommande l’INRS : l’oxygène d’abord, le gaz combustible ensuite.' },
    { titre: 'Ouvrir largement l’acétylène', texte: 'Ouvrez le robinet rouge, largement.',
      pointCle: 'Et on allume aussitôt.',
      pourquoi: 'L’acétylène qui sort sans être allumé s’accumule autour de vous.',
      figure: { svg: 'oa', etat: 'allumer' }, clip: 'clips/2-2/03-acetylene.mp4',
      narration: 'Deuxième robinet : l’acétylène, le rouge, ouvert largement. Et l’on n’attend pas : on allume tout de suite.' },
    { titre: 'Allumer à la buse', texte: 'Faites jaillir l’étincelle au bout de la buse.',
      pointCle: 'La flamme est d’abord très chargée en acétylène, jaune et fumeuse.',
      pourquoi: 'C’est normal : il n’y a pas encore assez d’oxygène. On règle ensuite.',
      figure: { img: 'images/2-2-allumer.webp', alt: 'L’étincelle de l’allumeur au bout de la buse' }, clip: 'clips/2-2/04-allumer.mp4',
      narration: 'On présente l’allumeur au bout de la buse et on fait jaillir l’étincelle. La flamme prend, jaune, longue, un peu fumeuse : elle a trop d’acétylène. C’est normal, on va la régler.' },
    { titre: 'Régler à l’oxygène jusqu’au dard net', texte: 'Ouvrez peu à peu l’oxygène : le voile blanc autour du dard disparaît, le dard devient net et arrondi.',
      pointCle: 'On s’arrête dès que le voile blanc a disparu.',
      pourquoi: 'Trop d’oxygène au-delà, et la flamme devient oxydante : elle siffle et brûle le cuivre.',
      figure: { svg: 'flamme', etat: 'trois' }, clip: 'clips/2-2/05-regler.mp4',
      narration: 'On ouvre maintenant l’oxygène, doucement, en regardant le cœur de la flamme, le dard. Il est d’abord long et entouré d’un voile blanc : c’est la flamme carburante. À mesure que l’oxygène arrive, le voile se retire. Dès qu’il a disparu et que le dard est net, arrondi, on s’arrête : c’est la flamme neutre. Si l’on continue, le dard raccourcit, s’affine, et la flamme se met à siffler : elle est oxydante.' },
    { titre: 'Reconnaître les trois flammes', texte: 'Carburante : dard long, voile blanc. Neutre : dard net, arrondi. Oxydante : dard court, pointu, qui siffle.',
      pointCle: 'Le professeur vous demande de les nommer.',
      pourquoi: 'Chaque travail demande sa flamme. Pour braser le cuivre, on règle une flamme neutre, jamais oxydante. Savoir les lire, c’est savoir corriger.',
      figure: { svg: 'flamme', etat: 'trois' }, clip: 'clips/2-2/06-trois.mp4',
      narration: 'Il faut savoir reconnaître les trois flammes d’un coup d’œil. La carburante, trop riche en acétylène : un dard long, entouré d’un voile blanc. La neutre : un dard net et arrondi. L’oxydante, trop riche en oxygène : un dard court et pointu, et une flamme qui siffle. Pour braser le cuivre, vous garderez la flamme neutre, jamais l’oxydante, qui noircit le cuivre. Le professeur vous les fera nommer.' },
    { titre: 'Ne jamais poser le chalumeau allumé', texte: 'Pendant le travail, le chalumeau reste en main. Pour le poser, on l’éteint.',
      pointCle: 'Même « une seconde ».',
      pourquoi: 'Un chalumeau posé allumé glisse, tourne, et brûle ce qu’il touche.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/2-2/07-poser.mp4',
      narration: 'Un chalumeau allumé ne se pose jamais, même une seconde, même sur l’établi. Il bascule, tourne, et la flamme part vers un tuyau ou une main. Pour le poser, on l’éteint.' },
    { titre: 'Éteindre : l’acétylène d’abord', texte: 'Fermez d’abord le robinet d’acétylène. Laissez l’oxygène s’échapper un court instant, puis fermez le robinet d’oxygène.',
      pointCle: 'Rouge d’abord, bleu ensuite.',
      pourquoi: 'En coupant d’abord le gaz combustible, la flamme s’éteint net, sans claquement ni suie.',
      figure: { svg: 'oa', etat: 'eteindre' }, clip: 'clips/2-2/08-eteindre.mp4',
      narration: 'Pour éteindre, on ferme d’abord le robinet d’acétylène, le rouge : la flamme s’éteint net. On laisse l’oxygène s’échapper un court instant, pour chasser ce qui reste d’acétylène dans le chalumeau, puis on ferme celui d’oxygène, le bleu. C’est l’ordre de l’INRS, et toutes les fiches de l’atelier sont d’accord. Le chalumeau éteint se pose sur son crochet, et on surveille la zone : rien ne doit couver.' },
    { titre: 'En fin de travail, refermer le poste', texte: 'Fermez les deux bouteilles, l’acétylène d’abord. Ouvrez les robinets du chalumeau et purgez jusqu’à zéro aux deux manomètres, loin de toute flamme. Desserrez les vis de détente. Refermez les robinets du chalumeau.',
      pointCle: 'Les manomètres retombent à zéro.',
      pourquoi: 'Un poste laissé sous pression fuit pendant la nuit, et fatigue les détendeurs.',
      figure: { svg: 'oa', etat: 'fin' }, clip: 'clips/2-2/09-fin.mp4',
      narration: 'À la fin du travail, on referme tout le poste, toujours dans le même ordre. D’abord les deux bouteilles, en commençant par l’acétylène : le gaz combustible se ferme en premier. Ensuite on purge : on ouvre les robinets du chalumeau, dans un endroit aéré, loin de toute flamme, et le gaz resté dans les tuyaux s’échappe jusqu’à ce que les manomètres retombent à zéro. Alors seulement, on desserre les vis de détente, et on referme les robinets du chalumeau. Le poste est au repos, sans aucune pression.' }
  ],
  pieges: [
    { titre: 'Le chalumeau ouvert, pas allumé', voit: 'Du gaz s’échappe pendant qu’on cherche l’allumeur.', cause: 'Hésitation, allumeur pas prêt.',
      eviter: 'Allumeur en main avant d’ouvrir.', geste: 0, figure: { img: 'images/2-2-allumer.webp', alt: 'L’allumeur prêt' },
      narration: 'Premier piège : ouvrir le chalumeau, puis chercher l’allumeur. Le gaz s’échappe pendant ce temps. L’allumeur est en main avant le premier robinet.' },
    { titre: 'Le briquet', voit: 'Un briquet approché de la buse.', cause: 'L’allumeur n’était pas là.',
      eviter: 'Uniquement l’allumeur à pierre.', geste: 0, figure: { img: 'images/2-2-allumer.webp', alt: 'L’allumeur à pierre' },
      narration: 'Deuxième piège : le briquet. Près d’une flamme de trois mille degrés, il peut exploser dans la main. Seul l’allumeur à pierre est autorisé.' },
    { titre: 'La flamme qui se décolle', voit: 'Le dard ne tient plus à la buse, la flamme souffle.', cause: 'Gaz ouvert trop grand pour la buse.',
      eviter: 'Réduire l’acétylène, ou prendre une buse plus grosse.', geste: 4, figure: { svg: 'flamme', etat: 'oxydante' },
      narration: 'Troisième piège : la flamme décollée, qui souffle au lieu de tenir à la buse. Trop de gaz pour cette buse : on réduit l’acétylène.' },
    { titre: 'Le claquement', voit: 'Un claquement sec, la flamme s’éteint ou siffle dans le chalumeau.', cause: 'Débit trop faible, buse trop chaude ou encrassée.',
      eviter: 'Fermer l’acétylène, puis l’oxygène, et appeler le professeur.', geste: 7, figure: { svg: 'oa', etat: 'eteindre' },
      narration: 'Quatrième piège, le plus sérieux : le claquement, parfois suivi d’un sifflement dans le chalumeau. C’est le signe d’un retour de flamme. On ferme l’acétylène, puis l’oxygène, et on appelle le professeur. On ne rallume pas seul.' },
    { titre: 'Le chalumeau posé allumé', voit: 'Un chalumeau allumé sur l’établi.', cause: 'L’habitude du « juste une seconde ».',
      eviter: 'On l’éteint pour le poser.', geste: 6, figure: { svg: 'poste', etat: 'secours' },
      narration: 'Dernier piège : poser le chalumeau allumé. Il bascule, et brûle ce qu’il touche. On l’éteint.' }
  ],
  controles: [
    { question: 'Ai-je allumé dans l’ordre, avec l’allumeur ?', comment: 'Buse orientée, oxygène un peu, acétylène largement, allumer.', siNon: 'Éteignez, et reprenez l’ordre devant le professeur.', geste: 1,
      figure: { svg: 'oa', etat: 'allumer' }, narration: 'Premier contrôle : l’ordre d’allumage.' },
    { question: 'Ma flamme est-elle neutre ?', comment: 'Dard net et arrondi, sans voile blanc, sans sifflement.', siNon: 'Voile blanc : ajoutez de l’oxygène. Sifflement : retirez-en.', geste: 4,
      figure: { svg: 'flamme', etat: 'neutre' }, narration: 'Deuxième contrôle : la flamme est neutre.' },
    { question: 'Je sais nommer les deux autres flammes ?', comment: 'Carburante et oxydante : à quoi on les reconnaît.', siNon: 'Revoyez les trois flammes.', geste: 5,
      figure: { svg: 'flamme', etat: 'trois' }, narration: 'Troisième contrôle : les trois flammes, reconnues.' },
    { question: 'Ai-je éteint dans l’ordre ?', comment: 'Acétylène d’abord, puis oxygène.', siNon: 'Reprenez l’extinction : rouge d’abord.', geste: 7,
      figure: { svg: 'oa', etat: 'eteindre' }, narration: 'Quatrième contrôle : l’extinction, acétylène d’abord.' },
    { question: 'En fin de travail, le poste est-il sans pression ?', comment: 'Bouteilles fermées, manomètres à zéro, vis desserrées.', siNon: 'Refermez le poste dans l’ordre.', geste: 8,
      figure: { svg: 'oa', etat: 'fin' }, narration: 'Dernier contrôle : le poste est refermé, sans pression.' }
  ],
  prof: {
    verifie: ['Il est présent à l’allumage', 'La flamme neutre obtenue, les deux autres nommées', 'L’extinction dans l’ordre', 'Le poste refermé, le chalumeau froid, la zone surveillée'],
    narration: 'Le professeur est là à chaque allumage : c’est la règle, et elle ne change pas quand on sait faire. Il regarde votre ordre, votre flamme, et votre extinction. Une fois ces gestes sûrs, le chalumeau devient l’outil de la ligne suivante : braser.'
  }
});

/* Station 3-1 — La brasure tendre à l'étain. Source : sources-metier/3-brasures.md (partie 3-1)
   Référence : fiche 02 « brasure tendre » du Centre du cuivre et le cours CICLA. Usage : eau sanitaire et
   chauffage ; en froid, on brase fort (cours T10 de 1re MFER) : la station le dit.
   DÉCIDÉ le 30/09/2026 (DECISIONS-2026-09-30.md) : le chalumeau propane s'allume et se règle devant le
   professeur, d'après la notice du chalumeau ; le décapant va sur les deux surfaces à assembler ; pas de
   couleur de chauffe, le fil d'étain fait le test. */
CUIVREZO.stations.push({
  id: '3-1', ligne: 3, titre: 'La brasure tendre à l’étain', duree: '30 min', vignette: 'images/3-1-tendre.webp',
  sources: ['sources-metier/3-brasures.md'],
  referentiel: { taches: [REF.T10, REF.T12], competences: [REF.C34], savoirs: [REF.S55, REF.S62, REF.S63] },
  obtenir: {
    titre: 'Un anneau d’étain régulier, étanche',
    texte: 'L’étain a filé tout autour du joint et forme un anneau régulier. Le cuivre n’est pas noirci, le décapant est essuyé.',
    criteres: ['Anneau d’étain régulier, tout autour du joint', 'Cuivre non noirci, non brûlé', 'Décapant essuyé, pas de coulure à l’intérieur', 'Pièces restées immobiles pendant le refroidissement'],
    figure: { img: 'images/3-1-tendre.webp', alt: 'L’étain file autour d’un joint chauffé au chalumeau propane', legende: 'L’étain touche le cuivre chaud et file tout autour.' },
    narration: 'La brasure tendre se fait à basse température : l’étain fond vers deux cent cinquante degrés, bien avant que le cuivre ne rougisse. Elle sert sur les réseaux d’eau sanitaire et de chauffage. Sur un circuit frigorifique, qui monte en pression, on brase fort : ce sera la station suivante. Mais le principe est le même, et il est plus facile à voir ici : un métal fondu qui file tout seul dans un joint chaud et propre.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/3-1-tendre.webp', alt: 'Le chalumeau propane et le fil d’étain' },
    items: [
      { nom: 'Le fil d’étain', detail: 'étain-cuivre ou étain-argent : jamais d’étain-plomb sur l’eau potable' },
      { nom: 'La pâte décapante', detail: 'adaptée à la brasure tendre' },
      { nom: 'Le tampon abrasif et un chiffon propre', detail: 'pour nettoyer avant, essuyer après' },
      { nom: 'Le chalumeau propane', detail: 'allumé et réglé devant le professeur, d’après la notice du chalumeau' },
      { nom: 'Le pare-flamme', detail: 'derrière le joint' },
      { nom: 'L’emboîture prête', detail: 'station 1.7 : le tube entre sans forcer ni jouer' }
    ],
    narration: 'Pour la brasure tendre, un petit chalumeau au propane suffit. L’apport est un fil d’étain, allié au cuivre ou à l’argent. Attention : l’étain-plomb est interdit sur l’eau potable. La pâte décapante empêche le cuivre de s’oxyder pendant la chauffe. Et le pare-flamme protège ce qui se trouve derrière le joint.'
  },
  gestes: [
    { titre: 'Protéger autour du joint', texte: 'Posez le pare-flamme derrière le joint. Écartez tout ce qui peut brûler.',
      pointCle: 'Ce qui est derrière le joint est aussi dans la flamme.',
      pourquoi: 'Sur chantier, derrière le tuyau, il y a un mur, un câble, une cloison.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/3-1/01-proteger.mp4',
      narration: 'Avant de chauffer, on pense à ce qui est derrière le joint : la flamme le touchera aussi. À l’atelier, un pare-flamme ; sur chantier, ce sera un mur, un câble, une cloison. On écarte tout ce qui peut brûler.' },
    { titre: 'Emboîter à sec', texte: 'Présentez les deux pièces sans rien : le tube entre sans forcer, sans jouer.',
      pointCle: 'Un jeu faible et régulier.',
      pourquoi: 'L’étain monte par capillarité dans un jeu fin. Trop large, il ne monte plus.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/3-1/02-sec.mp4',
      narration: 'On emboîte d’abord à sec, sans décapant, pour vérifier l’ajustage. Le tube doit entrer sans forcer et ne pas jouer. C’est dans ce jeu très fin que l’étain va monter, tout seul.' },
    { titre: 'Nettoyer au tampon abrasif', texte: 'Nettoyez l’extérieur du mâle et l’intérieur de la femelle jusqu’au métal brillant.',
      pointCle: 'Brillant sur toute la longueur emboîtée.',
      pourquoi: 'L’étain ne mouille pas un cuivre oxydé.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-1/03-nettoyer.mp4',
      narration: 'On nettoie au tampon abrasif l’extérieur du tube mâle et l’intérieur de l’emboîture, jusqu’à ce que le cuivre brille. L’étain ne s’accroche pas à un cuivre terni : il roulerait dessus en billes.' },
    { titre: 'Étaler le décapant sur les deux pièces', texte: 'Une fine couche de pâte décapante sur le mâle, et une autre à l’intérieur de l’emboîture, sans excès, tube tenu vers le haut.',
      pointCle: 'Peu, sur les deux pièces, et pas de coulure dans le tube.',
      pourquoi: 'Le décapant protège le cuivre de l’oxydation à la chauffe. En excès, il coule dans le tube.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-1/04-decapant.mp4',
      narration: 'On étale une fine couche de pâte décapante sur le tube mâle, et une autre à l’intérieur de l’emboîture : partout où l’étain devra s’accrocher. Juste de quoi couvrir : le surplus ne sert à rien, il coule à l’intérieur du tube. Le décapant empêche le cuivre de s’oxyder pendant la chauffe, pour que l’étain puisse s’y accrocher.' },
    { titre: 'Emboîter en tournant', texte: 'Emboîtez les deux pièces en tournant un peu.',
      pointCle: 'Le décapant se répartit tout autour.',
      pourquoi: 'Un côté sans décapant, c’est un côté où l’étain ne prend pas.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/3-1/05-emboiter.mp4',
      narration: 'On emboîte en faisant tourner un peu le tube : le décapant se répartit sur tout le tour du joint.' },
    { titre: 'Chauffer modérément', texte: 'Le chalumeau propane est allumé et réglé devant le professeur. Chauffez toute la longueur de l’emboîture, en balayant.',
      pointCle: 'Modérément : le cuivre ne doit ni noircir ni rougir.',
      pourquoi: 'L’étain fond vers 250 °C. Au-delà, on oxyde le cuivre, et l’étain n’y adhère plus. Il n’y a pas de couleur à attendre : c’est le fil d’étain, au geste suivant, qui dit si le tube est assez chaud.',
      figure: { svg: 'brasure', etat: 'chauffe' }, clip: 'clips/3-1/06-chauffer.mp4',
      narration: 'Le chalumeau propane s’allume et se règle devant le professeur, d’après la notice du chalumeau. Ensuite, on chauffe toute la longueur de l’emboîture, en balayant. Modérément : l’étain fond vers deux cent cinquante degrés, le cuivre ne doit ni noircir ni rougir. Trop chauffé, il s’oxyde, et l’étain n’y tient plus. Il n’y a pas de couleur à attendre : c’est le fil d’étain, au geste suivant, qui dira si le tube est assez chaud.' },
    { titre: 'Toucher le joint avec l’étain', texte: 'Écartez la flamme et touchez le joint avec le fil d’étain.',
      pointCle: 'L’étain fond au contact du tube chaud, pas dans la flamme.',
      pourquoi: 'Si le tube est assez chaud, c’est lui qui fait fondre l’étain et l’aspire dans le joint.',
      figure: { img: 'images/3-1-tendre.webp', alt: 'Le fil d’étain touche le joint chaud' }, clip: 'clips/3-1/07-etain.mp4',
      narration: 'On écarte la flamme, et l’on touche le joint avec le bout du fil d’étain. S’il fond au contact, le tube est à la bonne température. S’il ne fond pas, on rechauffe un peu. On ne fond jamais l’étain dans la flamme : il tomberait en goutte sur un tube trop froid.' },
    { titre: 'Regarder l’étain filer', texte: 'L’étain disparaît dans le joint et forme un anneau tout autour.',
      pointCle: 'Un anneau fermé : le joint est plein.',
      pourquoi: 'C’est la capillarité : le joint aspire l’étain fondu jusqu’au fond.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-1/08-filer.mp4',
      narration: 'Regardez l’étain : il ne coule pas vers le bas, il file dans le joint, tout autour, même vers le haut. C’est la capillarité. Quand un anneau brillant fait le tour complet, on arrête : le joint est plein.' },
    { titre: 'Essuyer, puis laisser refroidir', texte: 'Essuyez le joint au chiffon. Laissez refroidir sans bouger l’assemblage.',
      pointCle: 'Ne rien bouger tant que l’étain n’est pas figé.',
      pourquoi: 'Un joint bougé pendant qu’il fige se fissure. Et un décapant laissé en place ronge le cuivre.',
      figure: { svg: 'brasure', etat: 'reussie' }, clip: 'clips/3-1/09-essuyer.mp4',
      narration: 'On essuie le joint au chiffon pour retirer le décapant, qui rongerait le cuivre avec le temps. Avec un décapant halogéné, on lave même à l’eau chaude. Puis on laisse refroidir sans toucher à l’assemblage : un joint qu’on bouge pendant que l’étain fige se fissure.' }
  ],
  pieges: [
    { titre: 'L’étain qui ne prend pas', voit: 'L’étain roule en billes, sans entrer dans le joint.', cause: 'Cuivre mal nettoyé, ou oxydé par une chauffe trop forte.',
      eviter: 'Cuivre brillant, décapant, chauffe modérée.', geste: 2, figure: { svg: 'brasure', etat: 'surchauffe' },
      narration: 'Premier piège : l’étain qui roule en billes. Le cuivre était sale, ou on l’a trop chauffé et il s’est oxydé.' },
    { titre: 'L’étain fondu dans la flamme', voit: 'Une goutte posée sur le joint.', cause: 'L’étain a été fondu par la flamme sur un tube pas assez chaud.',
      eviter: 'Écarter la flamme, toucher le tube chaud.', geste: 6, figure: { svg: 'brasure', etat: 'seche' },
      narration: 'Deuxième piège : fondre l’étain dans la flamme. Il tombe en goutte sur le joint sans y entrer.' },
    { titre: 'Le décapant oublié', voit: 'Des traces vertes, de la corrosion autour du joint, des semaines plus tard.', cause: 'Le décapant n’a pas été essuyé.',
      eviter: 'Essuyer aussitôt, laver un décapant halogéné.', geste: 8, figure: { svg: 'brasure', etat: 'reussie' },
      narration: 'Troisième piège, qui ne se voit que plus tard : le décapant laissé sur le joint. Il continue de ronger le cuivre.' },
    { titre: 'Le joint bougé', voit: 'Une fissure dans l’anneau d’étain.', cause: 'On a bougé l’assemblage avant que l’étain soit figé.',
      eviter: 'Laisser refroidir sans toucher.', geste: 8, figure: { svg: 'brasure', etat: 'seche' },
      narration: 'Quatrième piège : bouger l’assemblage trop tôt. L’étain qui fige se fissure, et le joint fuit.' },
    { titre: 'L’étain-plomb sur l’eau potable', voit: 'Rien : le plomb se dissout dans l’eau.', cause: 'Mauvais fil d’étain.',
      eviter: 'Étain-cuivre ou étain-argent sur l’eau potable.', geste: null, figure: { img: 'images/3-1-tendre.webp', alt: 'Le fil d’étain' },
      narration: 'Dernier piège : l’étain-plomb sur un réseau d’eau potable. C’est interdit : le plomb passerait dans l’eau qu’on boit.' }
  ],
  controles: [
    { question: 'L’anneau d’étain fait-il tout le tour ?', comment: 'Tournez la pièce et regardez tout le joint.', siNon: 'Rechauffez et complétez, sans surchauffer.', geste: 7,
      figure: { svg: 'brasure', etat: 'reussie' }, narration: 'Premier contrôle : l’anneau est complet.' },
    { question: 'Le cuivre est-il resté propre, pas noirci ?', comment: 'Regardez de part et d’autre du joint.', siNon: 'Chauffe trop forte : réduisez la flamme.', geste: 5,
      figure: { svg: 'brasure', etat: 'surchauffe' }, narration: 'Deuxième contrôle : le cuivre n’est pas noirci.' },
    { question: 'Le décapant est-il essuyé ?', comment: 'Plus aucune trace de pâte autour du joint.', siNon: 'Essuyez, lavez si le décapant est halogéné.', geste: 8,
      figure: { svg: 'brasure', etat: 'reussie' }, narration: 'Troisième contrôle : le décapant est retiré.' },
    { question: 'Pas de goutte ni de bille sur le joint ?', comment: 'Un anneau lisse, pas de goutte posée.', siNon: 'L’étain a fondu dans la flamme : chauffez le tube, pas l’étain.', geste: 6,
      figure: { svg: 'brasure', etat: 'seche' }, narration: 'Dernier contrôle : pas de goutte posée sur le joint.' }
  ],
  prof: {
    verifie: ['Le chalumeau propane, allumé et réglé devant lui', 'Les emboîtures, avant de braser', 'Le joint : anneau complet, cuivre propre', 'Le décapant essuyé', 'Plus tard : l’étanchéité, à la solution moussante'],
    narration: 'Le professeur regarde vos emboîtures avant la brasure, puis le joint fini. L’étanchéité se vérifiera ensuite, sous pression, à la solution moussante. La station suivante passe à la brasure forte, celle des circuits frigorifiques.'
  }
});

/* Station 3-2 — La brasure forte sous azote. Source : sources-metier/3-brasures.md (partie 3-2)
   Référence retenue en cas de désaccord : le TP-06 « brasage fort sous azote » de 1re MFER et le cours G10
   (la pratique actuelle de F. Henninot), puis la fiche 03 du Centre du cuivre. Les désaccords entre fiches
   (température, flux, flamme, côté chauffé, refroidissement, débit d'azote) sont TRANCHÉS le 30/09/2026 :
   voir DECISIONS-2026-09-30.md. L'allumage, le réglage et l'extinction du chalumeau relèvent de la station 2.2. */
CUIVREZO.stations.push({
  id: '3-2', ligne: 3, titre: 'La brasure forte sous azote', duree: '40 min', vignette: 'images/3-2-forte.webp',
  sources: ['sources-metier/3-brasures.md'],
  referentiel: { taches: [REF.T10, REF.T12], competences: [REF.C34], savoirs: [REF.S55, REF.S62, REF.S63] },
  obtenir: {
    titre: 'Un joint brasé plein, propre à l’intérieur',
    texte: 'L’apport a rempli le joint tout autour ; le cuivre n’est pas brûlé ; l’intérieur du tube est resté couleur cuivre, sans calamine.',
    criteres: ['Cordon fin et régulier tout autour, ni trou ni interruption', 'Cuivre à peine coloré, jamais noirci', 'Intérieur couleur cuivre : pas de calamine', 'Étanche : l’épreuve à l’azote en jugera'],
    figure: { svg: 'brasure', etat: 'reussie', legende: 'L’apport remplit le jeu ; un petit cordon régulier au bord.' },
    narration: 'La brasure forte est le raccord le plus courant d’un circuit frigorifique. Elle doit tenir la pression, et rester étanche des années. Mais elle a un ennemi invisible : à cette température, l’intérieur du tube se couvre d’écailles noires, la calamine, qui partiront un jour dans le circuit boucher un détendeur ou un filtre. C’est pour cela qu’on brase sous azote. Dans cette station, deux réussites comptent : un joint plein dehors, et un tube propre dedans.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/3-2-forte.webp', alt: 'Brasage d’un joint en cuivre sous azote' },
    items: [
      { nom: 'Le poste oxyacétylénique, vérifié', detail: 'station 2.1 : bouteilles, détendeurs, clapets anti-retour' },
      { nom: 'Des baguettes de cuivre-phosphore', detail: 'pour un joint cuivre sur cuivre, sans flux' },
      { nom: 'L’azote : bouteille, détendeur, débitmètre, tuyau', detail: 'pour balayer l’intérieur du tube' },
      { nom: 'Le tampon abrasif', detail: 'pour nettoyer les deux pièces' },
      { nom: 'L’écran de brasage, le tapis anti-feu, l’extincteur', detail: 'la zone autour du joint est protégée' },
      { nom: 'Lunettes teintées, gants à manchettes, tablier', detail: 'lunettes à verres teintés : le professeur donne le numéro de teinte, d’après la buse' }
    ],
    narration: 'Le matériel se partage en trois familles. Le feu : le poste oxyacétylénique, vérifié à la station deux point un. L’apport : des baguettes de cuivre-phosphore, qui brasent le cuivre sur le cuivre sans flux. Et l’azote, avec son détendeur et son débitmètre, qui va circuler dans le tube pendant toute la brasure. Autour, on protège : écran, tapis anti-feu, extincteur à portée. Et sur vous : lunettes teintées, gants à manchettes, tablier.'
  },
  gestes: [
    { titre: 'Préparer la zone', texte: 'Posez l’écran de brasage, dégagez un mètre autour du joint, repérez l’extincteur. Mettez vos protections.',
      pointCle: 'Rien d’inflammable à portée de la flamme.',
      pourquoi: 'La flamme oxyacétylénique dépasse 3 000 °C. Un chiffon, un carton, un sac à côté du joint, et c’est l’incendie.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/3-2/01-zone.mp4',
      narration: 'Avant la flamme, la zone. On pose l’écran de brasage derrière le joint, on dégage un mètre autour : pas de chiffon, pas de carton, pas de sac. On repère l’extincteur. La flamme d’un chalumeau oxyacétylénique dépasse trois mille degrés : ce qu’elle touche par erreur prend feu. Puis on met ses protections : lunettes teintées, gants à manchettes, tablier.' },
    { titre: 'Nettoyer les deux pièces', texte: 'Au tampon abrasif, nettoyez l’extérieur du mâle et l’intérieur de la femelle, sur la longueur d’emboîture.',
      pointCle: 'Métal brillant, et pas de doigts gras dessus ensuite.',
      pourquoi: 'L’apport ne mouille pas un cuivre oxydé ou gras : il glisse dessus sans entrer dans le joint.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-2/02-nettoyer.mp4',
      narration: 'Le métal d’apport ne s’accroche qu’à un cuivre propre. On passe le tampon abrasif sur l’extérieur du tube mâle et à l’intérieur de l’emboîture, sur toute la longueur qui sera brasée, jusqu’à ce que le cuivre brille. Ensuite, on ne touche plus ces surfaces avec les doigts : la graisse de la peau suffit à gêner la brasure.' },
    { titre: 'Ajuster l’emboîture', texte: 'Emboîtez : le mâle entre sans forcer, et ne joue pas.',
      pointCle: 'Un jeu faible et régulier.',
      pourquoi: 'L’apport monte dans le jeu par capillarité. Trop serré, il ne passe pas ; trop large, il coule sans entrer.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/3-2/03-ajuster.mp4',
      narration: 'On emboîte les deux pièces. C’est le contrôle de la station un point sept : le tube entre sans forcer, et ne joue pas. Ce jeu minuscule est le chemin de la brasure : le métal fondu y est aspiré, tout seul, par capillarité. S’il est trop serré, il ne passe pas ; trop large, il coule par terre sans entrer.' },
    { titre: 'Choisir la baguette', texte: 'Cuivre sur cuivre : baguette de cuivre-phosphore, sans flux. Cuivre sur laiton : baguette à l’argent, avec flux.',
      pointCle: 'Jamais de cuivre-phosphore sur de l’acier.',
      pourquoi: 'Le phosphore nettoie le cuivre tout seul pendant la brasure : c’est pour cela qu’il se passe de flux. Sur un raccord en laiton, il ne suffit plus.',
      figure: { svg: 'brasure', etat: 'baguette' }, clip: 'clips/3-2/04-baguette.mp4',
      narration: 'Deux baguettes, deux usages. Pour un joint de cuivre sur cuivre, le cuivre-phosphore : le phosphore qu’il contient nettoie le cuivre pendant la brasure, il se passe donc de flux. Pour un raccord en laiton, on prend une baguette à l’argent, avec un flux. Et jamais de cuivre-phosphore sur de l’acier : le joint serait fragile.' },
    { titre: 'Ouvrir l’azote avant d’allumer', texte: 'Branchez l’azote au tube, ouvrez le débit réglé par le professeur au débitmètre (léger et continu), vérifiez qu’il sort à l’autre bout.',
      pointCle: 'L’azote d’abord, la flamme ensuite.',
      pourquoi: 'L’azote chasse l’air du tube. Sans oxygène à l’intérieur, le cuivre chaud ne se couvre pas de calamine.',
      figure: { svg: 'brasure', etat: 'azote' }, clip: 'clips/3-2/05-azote.mp4',
      narration: 'Voici le geste qui fait la différence. Avant même d’allumer, on branche l’azote au tube et on ouvre un débit léger, continu. On vérifie avec la main qu’il sort bien à l’autre bout. L’azote chasse l’air du tube ; sans oxygène à l’intérieur, le cuivre chauffé ne peut plus former de calamine. Le débit exact, c’est le professeur qui vous le donne.' },
    { titre: 'Allumer et régler la flamme', texte: 'Allumez le chalumeau comme à la station 2.2, devant le professeur, et réglez une flamme neutre : ni sifflante, ni fumeuse.',
      pointCle: 'Une flamme neutre : dard net et arrondi.',
      pourquoi: 'Une flamme oxydante brûle le cuivre ; une flamme trop carburante salit le joint.',
      figure: { svg: 'flamme', etat: 'neutre' }, clip: 'clips/3-2/06-flamme.mp4',
      narration: 'On allume le chalumeau exactement comme à la station deux point deux, devant le professeur, et l’on règle la flamme : ni sifflante, ni fumeuse. C’est la flamme neutre, au dard net et arrondi. Une flamme oxydante, qui siffle, brûlerait le cuivre ; une flamme trop chargée en acétylène salirait le joint.' },
    { titre: 'Chauffer les deux pièces', texte: 'Chauffez d’abord le tube, juste avant l’emboîture, puis la femelle. Balayez de l’un à l’autre, en tournant autour, jusqu’au rouge sombre.',
      pointCle: 'On chauffe le tube, pas la baguette.',
      pourquoi: 'L’apport ne coule que vers le métal chaud. Si un seul côté est chaud, il n’ira que d’un côté.',
      figure: { svg: 'brasure', etat: 'chauffe' }, clip: 'clips/3-2/07-chauffer.mp4',
      narration: 'On commence par le tube, juste avant l’emboîture, puis on passe à la femelle, et l’on balaie de l’un à l’autre en faisant tourner la flamme autour, pour que les deux pièces montent ensemble en température. On attend que le cuivre prenne une couleur rouge sombre, à peine rouge, que l’on voit surtout à l’ombre. C’est le tube qu’on chauffe, pas la baguette : le métal d’apport ne coulera que vers le cuivre chaud. Un côté froid, et l’apport ne fera qu’un demi-tour.' },
    { titre: 'Présenter la baguette', texte: 'Posez la baguette sur le joint, du côté opposé à la flamme.',
      pointCle: 'Elle fond au contact du cuivre chaud, jamais dans la flamme.',
      pourquoi: 'Fondue dans la flamme, elle se pose en goutte sur un tube froid : le joint paraît fait, il n’est pas brasé.',
      figure: { svg: 'brasure', etat: 'baguette' }, clip: 'clips/3-2/08-apport.mp4',
      narration: 'Quand la couleur est là, on pose la baguette sur le joint, du côté opposé à la flamme. C’est la chaleur du cuivre qui doit la faire fondre, pas la flamme. Si elle fond d’un coup dans la flamme, elle tombe en goutte sur un tube trop froid : le joint a l’air fait, mais il est seulement collé.' },
    { titre: 'Suivre l’apport tout autour', texte: 'Regardez l’apport entrer dans le joint et en faire le tour complet.',
      pointCle: 'Un anneau fin, régulier, fermé.',
      pourquoi: 'L’apport aspiré par capillarité remplit le jeu : un cordon qui fait tout le tour annonce un joint plein.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-2/09-suivre.mp4',
      narration: 'Regardez : l’apport fondu disparaît dans le joint, aspiré par le jeu. On le suit tout autour du tube. Quand un petit anneau fin et régulier fait le tour complet, le joint est plein. Inutile d’en ajouter : le surplus ne rend pas le joint plus solide, il coule à l’intérieur.' },
    { titre: 'Retirer la flamme, laisser refroidir', texte: 'Écartez la flamme progressivement. Laissez refroidir à l’air, sans toucher, et jamais à l’eau. Coupez l’azote une fois le tube froid.',
      pointCle: 'L’azote reste ouvert jusqu’au refroidissement.',
      pourquoi: 'Le cuivre encore chaud s’oxyde aussi : on protège l’intérieur jusqu’au bout. L’eau sur un joint chaud le fissure par le choc, et elle n’a rien à faire dans un circuit frigorifique. Et un tube brûlant ne change pas d’aspect : il brûle sans prévenir.',
      figure: { svg: 'brasure', etat: 'azote' }, clip: 'clips/3-2/10-refroidir.mp4',
      narration: 'On écarte la flamme doucement, puis on laisse refroidir à l’air, sans toucher, et jamais à l’eau : le choc pourrait fissurer le joint, et l’eau n’a rien à faire dans un circuit frigorifique. Un tube brasé brûlant a exactement le même aspect qu’un tube froid : c’est comme cela qu’on se brûle. L’azote reste ouvert jusqu’au refroidissement, parce que le cuivre encore chaud continue de s’oxyder. Ensuite seulement, on coupe l’azote, et l’on éteint le chalumeau comme à la station deux point deux.' }
  ],
  pieges: [
    { titre: 'La surchauffe', voit: 'Cuivre noirci, bleui ou écaillé ; apport coulé loin du joint.', cause: 'Flamme trop forte, ou trop longtemps au même endroit.',
      eviter: 'Flamme réglée, chauffe large et tournante.', geste: 6, figure: { svg: 'brasure', etat: 'surchauffe' },
      narration: 'Premier piège : la surchauffe. Le cuivre noircit, s’écaille, et l’apport file loin du joint. La flamme était trop forte, ou restée trop longtemps au même point.' },
    { titre: 'La brasure sèche', voit: 'Un cordon bombé, granuleux, terne, en goutte.', cause: 'Baguette fondue dans la flamme sur un tube pas assez chaud.',
      eviter: 'Chauffer le tube, puis poser la baguette côté opposé à la flamme.', geste: 7, figure: { svg: 'brasure', etat: 'seche' },
      narration: 'Deuxième piège, le plus trompeur : la brasure sèche. Le joint a l’air fait, mais l’apport est seulement posé dessus, en goutte. C’est la flamme qui l’a fondu, pas le cuivre. Il fuira.' },
    { titre: 'Le cordon interrompu', voit: 'Un trou, un manque dans l’anneau.', cause: 'Un côté du joint trop froid, ou un jeu trop large ou trop serré.',
      eviter: 'Chauffer tout autour ; ajuster l’emboîture.', geste: 6, figure: { svg: 'brasure', etat: 'capillarite' },
      narration: 'Troisième piège : l’anneau qui ne se referme pas. Un côté est resté froid, ou le jeu était faux. Ce manque, c’est la future fuite.' },
    { titre: 'La calamine', voit: 'À la coupe, l’intérieur est noir, couvert d’écailles.', cause: 'Pas d’azote, ou un débit trop faible, ou coupé trop tôt.',
      eviter: 'L’azote avant la flamme, jusqu’au refroidissement.', geste: 4, figure: { svg: 'brasure', etat: 'calamine' },
      narration: 'Quatrième piège, invisible de l’extérieur : la calamine. On ne la voit qu’à la coupe d’une pièce d’essai. Elle vient d’un tube brasé sans azote, et ses écailles finiront dans le détendeur.' },
    { titre: 'La brûlure et le feu', voit: 'Une main brûlée sur un tube « froid », un chiffon qui fume.', cause: 'Tube touché trop tôt ; matière inflammable près du joint.',
      eviter: 'Gants, ne jamais toucher un joint brasé ; zone dégagée, surveillance après extinction.', geste: 0, figure: { svg: 'poste', etat: 'secours' },
      narration: 'Dernier piège : la brûlure et le feu. Un tube brasé reste brûlant longtemps, sans changer d’aspect. Et un point chaud peut couver après l’extinction : on surveille la zone avant de partir.' }
  ],
  controles: [
    { question: 'Le cordon fait-il tout le tour, sans trou ?', comment: 'Tournez la pièce et regardez tout le joint.', siNon: 'Joint à refaire : chauffez tout autour avant d’apporter.', geste: 6,
      figure: { svg: 'brasure', etat: 'reussie' }, narration: 'Premier contrôle : l’anneau fait le tour complet, sans trou.' },
    { question: 'Le cordon est-il fin et lisse ?', comment: 'Ni goutte, ni surface granuleuse ou terne.', siNon: 'Brasure sèche : le tube n’était pas assez chaud.', geste: 7,
      figure: { svg: 'brasure', etat: 'seche' }, narration: 'Deuxième contrôle : un cordon fin et lisse, pas une goutte posée.' },
    { question: 'Le cuivre est-il à peine coloré, pas noirci ?', comment: 'Regardez de part et d’autre du joint.', siNon: 'Surchauffe : flamme trop forte ou trop proche.', geste: 5,
      figure: { svg: 'brasure', etat: 'surchauffe' }, narration: 'Troisième contrôle : le cuivre n’est pas brûlé.' },
    { question: 'L’intérieur est-il couleur cuivre ?', comment: 'Le professeur coupe en long une pièce d’essai.', siNon: 'Calamine : l’azote manquait ou a été coupé trop tôt.', geste: 4,
      figure: { svg: 'brasure', etat: 'calamine' }, narration: 'Quatrième contrôle, fait avec le professeur : la coupe d’une pièce d’essai montre un intérieur propre.' },
    { question: 'La zone est-elle sûre ?', comment: 'Chalumeau éteint, azote fermé, rien qui fume, pièce posée pour refroidir.', siNon: 'Fermez, surveillez, prévenez.', geste: 9,
      figure: { svg: 'poste', etat: 'secours' }, narration: 'Dernier contrôle : tout est éteint, fermé, et rien ne couve.' }
  ],
  prof: {
    verifie: ['Le poste vérifié avant d’allumer', 'L’azote qui sort au débit réglé, avant la flamme', 'L’allumage, fait devant lui', 'Le joint : cordon plein, cuivre non brûlé', 'La coupe de la pièce d’essai : intérieur propre', 'Plus tard : l’épreuve d’étanchéité à l’azote'],
    narration: 'Le professeur intervient trois fois : il vérifie le poste avant l’allumage, il constate que l’azote sort avant que la flamme ne s’approche, puis il coupe votre pièce d’essai pour regarder l’intérieur. C’est cette coupe qui dit la vérité d’une brasure sous azote.'
  }
});

/* Station 4-1 — Le chapeau de gendarme. Source : sources-metier/4-pieces-complexes.md (partie 1)
   Méthode retenue : « METHODE CHAPEAU DE GENDARME CUIVRE » du dossier CAP IFCA (C3-Réaliser) et fiches
   voisines : coude central d'abord (60 à 90°), puis deux coudes de moitié, A et B à égale distance de l'axe.
   Les fiches divergent (définition de l'axe, espacement des coudes, angles, outil) parce qu'elles décrivent
   des outils différents : choix TRANCHÉS le 30/09/2026 (DECISIONS-2026-09-30.md). Aucune n'emploie les
   repères L et R. Tolérance des fiches : ± 2 mm. */
CUIVREZO.stations.push({
  id: '4-1', ligne: 4, titre: 'Le chapeau de gendarme', duree: '45 min', vignette: 'images/4-1-chapeau.webp',
  sources: ['sources-metier/4-pieces-complexes.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un contournement symétrique, branches alignées',
    texte: 'Le tube passe par-dessus l’obstacle avec un coude central et deux coudes de moitié. Les deux côtés sont égaux, les deux branches restent sur la même ligne.',
    criteres: ['Hauteur H conforme au plan', 'Les deux côtés du chapeau égaux', 'Les deux branches alignées sur une même droite', 'Pièce plane, tube ni écrasé ni marqué (cotes à ± 2 mm)'],
    figure: { composant: 'cuivre-3d', attributs: { piece: 'chapeau', angle: '90' }, legende: 'Le chapeau passe au-dessus de l’obstacle ; H se mesure d’axe à axe.' },
    narration: 'Sur un chantier, un tube rencontre souvent un autre tube, une gaine, un support. Plutôt que de couper et d’ajouter des raccords, on le fait passer par-dessus d’un seul morceau : c’est le chapeau de gendarme. Un coude au sommet, deux coudes plus doux de chaque côté. Sa difficulté n’est pas dans chaque coude, que vous savez faire : elle est dans la symétrie. Les deux branches doivent repartir exactement sur la même ligne.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/4-1-chapeau.webp', alt: 'Un chapeau de gendarme en cuivre au-dessus d’un tuyau' },
    items: [
      { nom: 'Le plan de la pièce', detail: 'la hauteur H, la position de l’obstacle' },
      { nom: 'La cintrette ou la cintreuse du tube', detail: 'stations 1.4 et 1.5' },
      { nom: 'Un tube recuit, coupé et ébavuré', detail: 'avec de la longueur en plus pour les coudes' },
      { nom: 'La règle, l’équerre, la fausse équerre', detail: 'pour contrôler l’alignement, la hauteur et les angles' },
      { nom: 'Le feutre fin et le mètre', detail: 'pour tracer l’axe, A et B' }
    ],
    narration: 'Le chapeau se fait avec les outils que vous connaissez : la cintrette ou la cintreuse, le mètre, le feutre. Il s’y ajoute la règle, qui dira si les deux branches sont alignées, et la fausse équerre, qui compare les angles. Le plan donne la hauteur H du chapeau, d’axe à axe, et l’emplacement de l’obstacle.'
  },
  gestes: [
    { titre: 'Repérer l’axe du chapeau', texte: 'Sur le plan, repérez où passe le milieu de l’obstacle. Reportez cette cote sur le tube, contre la butée : c’est l’axe du chapeau.',
      pointCle: 'L’axe au-dessus du centre de l’obstacle.',
      pourquoi: 'Tout le chapeau se construit symétriquement autour de cet axe : s’il est décalé, le chapeau l’est aussi.',
      figure: { svg: 'chapeau', etat: 'traits' }, clip: 'clips/4-1/01-axe.mp4',
      narration: 'Tout part de l’axe du chapeau : l’endroit du tube qui passera exactement au-dessus du milieu de l’obstacle. On le repère sur le plan, on le reporte sur le tube, en mesurant contre une butée comme toujours. Le chapeau entier va se construire symétriquement autour de ce trait.' },
    { titre: 'Tracer A et B, à égale distance', texte: 'De part et d’autre de l’axe, tracez A et B à la même distance, donnée par le plan, sur tout le tour du tube.',
      pointCle: 'Même distance des deux côtés.',
      pourquoi: 'A et B sont les deux coudes de moitié. S’ils ne sont pas à égale distance, le chapeau penche.',
      figure: { svg: 'chapeau', etat: 'traits' }, clip: 'clips/4-1/02-a-b.mp4',
      narration: 'De chaque côté de l’axe, on trace deux repères, A et B, à exactement la même distance, et sur tout le tour du tube. Ce seront les deux coudes de moitié. La distance dépend de la hauteur du chapeau et de la taille de l’obstacle : c’est le plan, ou le professeur, qui la donne.' },
    { titre: 'Choisir l’angle central', texte: 'L’angle du coude central dépend de la hauteur : entre 60 et 90°.',
      pointCle: 'Plus le chapeau est haut, plus le coude central est fermé.',
      pourquoi: 'Les deux coudes de côté font chacun la moitié de cet angle : c’est ce qui ramène les branches sur la même ligne.',
      figure: { svg: 'chapeau', etat: 'central' }, clip: 'clips/4-1/03-angle.mp4',
      narration: 'On choisit l’angle du coude central, entre soixante et quatre-vingt-dix degrés, selon la hauteur à franchir. Le principe à comprendre est simple : chaque coude de côté fera exactement la moitié de cet angle. Soixante au centre, trente de chaque côté. Quatre-vingt-dix au centre, quarante-cinq de chaque côté. C’est cette moitié qui ramène les deux branches sur la même ligne.' },
    { titre: 'Cintrer le coude central', texte: 'Placez l’axe sur l’outil, au milieu du coude, et cintrez à l’angle choisi.',
      pointCle: 'L’axe au milieu du coude, pas au début.',
      pourquoi: 'Le coude central doit être partagé en deux par l’axe, pour que les deux côtés soient égaux.',
      figure: { composant: 'cuivre-3d', attributs: { piece: 'chapeau', angle: '54' } }, clip: 'clips/4-1/04-central.mp4',
      narration: 'On commence par le coude du sommet. L’axe tracé sur le tube doit tomber au milieu du coude, pas à son début : on le place donc sur l’outil à la moitié de l’angle, par exemple sur le repère trente pour un coude de soixante. Puis on cintre jusqu’à l’angle choisi.' },
    { titre: 'Cintrer le coude A, à la moitié', texte: 'Placez le repère A sur l’outil et cintrez à la moitié de l’angle central, dans l’autre sens.',
      pointCle: 'Le coude de côté tourne en sens inverse du coude central.',
      pourquoi: 'Il ramène la branche à l’horizontale : moitié d’angle, sens contraire.',
      figure: { svg: 'chapeau', etat: 'plan' }, clip: 'clips/4-1/05-coude-a.mp4',
      narration: 'Premier coude de côté, sur le repère A. Il fait la moitié de l’angle central, et il tourne dans l’autre sens : il ramène la branche à l’horizontale. On contrôle à la fausse équerre avant de passer à l’autre côté.' },
    { titre: 'Cintrer le coude B, pareil', texte: 'Même geste sur le repère B : même angle, même sens que A.',
      pointCle: 'B est le jumeau de A.',
      pourquoi: 'Deux coudes identiques de part et d’autre : c’est la symétrie du chapeau.',
      figure: { svg: 'chapeau', etat: 'plan' }, clip: 'clips/4-1/06-coude-b.mp4',
      narration: 'Même geste de l’autre côté, sur le repère B, avec exactement le même angle. Si A et B sont identiques et à égale distance de l’axe, les deux branches se retrouvent sur la même ligne.' },
    { titre: 'Contrôler l’alignement à la règle', texte: 'Posez la règle sous les deux branches : elle doit les toucher toutes les deux.',
      pointCle: 'Les deux branches sur une même droite, la pièce à plat.',
      pourquoi: 'Un chapeau désaxé ne se raccorde plus : le tube suivant arrive de travers.',
      figure: { svg: 'chapeau', etat: 'controle' }, clip: 'clips/4-1/07-regle.mp4',
      narration: 'Le contrôle décisif se fait à la règle. On la pose sous les deux branches : elle doit les toucher toutes les deux, sur toute leur longueur. On mesure aussi la hauteur H à l’équerre, et on pose la pièce à plat sur l’établi : elle doit y reposer partout. Un petit écart se reprend en finissant le dernier coude ; un gros écart, non.' }
  ],
  pieges: [
    { titre: 'Les branches désaxées', voit: 'La règle ne touche qu’une branche.', cause: 'Coudes A et B différents, ou pas à égale distance de l’axe.',
      eviter: 'A et B tracés à égale distance, cintrés au même angle.', geste: 1, figure: { svg: 'chapeau', etat: 'desaxe' },
      narration: 'Premier piège : les branches qui ne sont plus alignées. Presque toujours, A et B n’étaient pas à la même distance de l’axe, ou pas cintrés au même angle.' },
    { titre: 'La hauteur fausse', voit: 'Le chapeau touche l’obstacle, ou passe trop haut.', cause: 'Angle central mal choisi, ou repères A et B mal placés.',
      eviter: 'Mesurer H à l’équerre pendant le travail.', geste: 2, figure: { svg: 'chapeau', etat: 'plan' },
      narration: 'Deuxième piège : la hauteur. Trop bas, le tube touche l’obstacle ; trop haut, il gêne. On mesure H à l’équerre avant de finir.' },
    { titre: 'La pièce gauchie', voit: 'Posée à plat, la pièce bascule.', cause: 'Le tube a tourné entre deux coudes.',
      eviter: 'Vérifier la planéité avant chaque coude.', geste: 6, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Troisième piège : la pièce gauchie, qui ne tient pas à plat. Le tube a tourné entre deux coudes. On vérifie la planéité avant chaque nouveau coude.' },
    { titre: 'Le tube écrasé', voit: 'Un coude aplati ou pincé.', cause: 'Tube écroui non recuit, ou cintrage forcé.',
      eviter: 'Tube recuit, mouvement lent et continu.', geste: 3, figure: { svg: 'coude', etat: 'ovale' },
      narration: 'Dernier piège, commun à tous les coudes : l’écrasement. Sur une pièce à trois coudes, un seul coude écrasé suffit à la rendre inutilisable.' }
  ],
  controles: [
    { question: 'La règle touche-t-elle les deux branches ?', comment: 'Posez-la sous les deux branches.', siNon: 'Reprenez le dernier coude, ou refaites la pièce si l’écart est grand.', geste: 6,
      figure: { svg: 'chapeau', etat: 'controle' }, narration: 'Premier contrôle : les deux branches alignées.' },
    { question: 'La hauteur H est-elle celle du plan ?', comment: 'Équerre posée sur la branche, mesurez jusqu’à l’axe du sommet.', siNon: 'Revoyez l’angle central et la place de A et B.', geste: 2,
      figure: { svg: 'chapeau', etat: 'plan' }, narration: 'Deuxième contrôle : la hauteur, d’axe à axe.' },
    { question: 'Les deux côtés sont-ils égaux ?', comment: 'Comparez les deux angles à la fausse équerre.', siNon: 'Les coudes A et B n’ont pas le même angle.', geste: 5,
      figure: { svg: 'chapeau', etat: 'central' }, narration: 'Troisième contrôle : la symétrie.' },
    { question: 'La pièce est-elle plane et sans écrasement ?', comment: 'Posez-la à plat ; regardez chaque coude.', siNon: 'Pièce à refaire : planéité avant chaque coude, tube recuit.', geste: 6,
      figure: { svg: 'chapeau', etat: 'controle' }, narration: 'Dernier contrôle : la pièce plane, les coudes ronds.' }
  ],
  prof: {
    verifie: ['La distance de A et B à l’axe, prise sur son plan', 'Le positionnement dans l’outil, avant le premier coude', 'La hauteur H et l’alignement des branches', 'La symétrie et la planéité', 'L’aspect des trois coudes'],
    narration: 'Les fiches de l’atelier demandent d’appeler le professeur une fois le tube positionné dans l’outil, avant de cintrer : c’est le moment où une erreur se corrige encore. Puis il contrôle la pièce finie : hauteur, alignement, symétrie, planéité.'
  }
});

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

CUIVREZO.clipsPresents = [];
