# BRIEF F — le mode professeur sur les trois réseaux qui ne l'ont pas (vague 2, après les lots A, B, C)

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot F. État des lieux :
`docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md`, § 3.2 : le mode professeur — l'enchaînement
automatique des écrans après la fin de la narration, les questions comme points d'arrêt — n'existe que
sur 48 pages sur 304 (`moteur/prof-vocal.js`). HydroMétro (22 stations), AéroRézo (36) et ÉlectroRézo
(59) n'en ont pas : l'élève relance la voix à chaque écran.

## Comment `prof-vocal.js` fonctionne (lecture faite, à confirmer dans le code)
- Il se branche sur des identifiants de la page (table `selectors`, l. ~40) : `listen` (`#listen`,
  `#listen-button`, `#speak`, `#play-button`), `next` (`#next`, `#next-button`), `previous`, `start`,
  `exit`, `stop`, `scope` (la zone de l'écran courant : `.slide.active`, `#screen-content`…),
  `quizNext`. **Il se retire s'il ne trouve ni `next` ni `listen`** (l. ~66).
- Il ne lance rien seul : le premier clic (« Commencer », « Écouter » ou son propre bouton) autorise
  l'enchaînement pour la séance. Un écran explicatif avance après la fin de la narration ; un écran
  qui porte un bouton, un champ, une question ou un `Suivant` désactivé est un point d'arrêt ; aucune
  réponse n'est choisie à la place de l'élève (en-tête du fichier et `MISSION-CLAUDE-REFONTE-VOIX.md`,
  « consigne de maintenance du mode professeur » : ne jamais le remplacer par une minuterie fixe).
- Il parle par `window.PiloteVoix` (le moteur commun, MP3 du fonds ou repli navigateur).

## Ce qu'on veut
Le même mode professeur, avec la même pastille « Mode prof vocal · arrêté / lecture », sur les stations
des trois réseaux, **sans dupliquer le moteur** : une seule copie de `prof-vocal.js` dans `moteur/`.

## Comment
1. Dans chaque atelier (`C:\git\hydrometro`, `C:\git\aerorezo`, `C:\git\electrorezo`), donner aux
   boutons existants des stations les identifiants que `prof-vocal.js` connaît, ou étendre sa table
   `selectors` d'un alias par réseau (`#btVoix`, `#suivant`, `#precedent` pour ÉlectroRézo ; ceux
   d'AéroRézo et d'HydroMétro tels qu'ils sont après les lots A et B). Choisir l'option qui touche le
   moins de fichiers ; **ne pas** renommer des identifiants qu'un test d'atelier utilise sans mettre le
   test à jour.
2. La zone d'écran courant (`scope`) doit désigner l'écran affiché de chaque gabarit (ÉlectroRézo :
   `#scene` ; AéroRézo et HydroMétro : à trouver) pour que les questions soient bien des points d'arrêt.
3. Les `outils/livrer.mjs` des trois ateliers injectent aussi `moteur/prof-vocal.js` après
   `moteur/voix.js` (même ancre `</head>`, même `?v=`).
4. ÉlectroRézo parle par son propre lecteur MP3 (`voix/<genre>/<phase>.mp3`), pas par `PiloteVoix` :
   vérifier si `prof-vocal.js` peut s'appuyer sur ses événements (`pilotevoix:*`) ou s'il faut que le
   lecteur d'ÉlectroRézo les émette (fin de lecture = `pilotevoix:fin` ou l'événement que le moteur
   écoute — le lire). Si c'est trop lourd, faire HydroMétro et AéroRézo et expliquer l'obstacle.

## Règles
- Aucun texte parlé ne change. Ateliers seulement (la copie servie se lit, ne s'édite pas) ; le seul
  fichier du site qui peut changer est `moteur/prof-vocal.js` (table `selectors`), et alors le dire.
- Pas de minuterie fixe. Pas de commit, pas de push, pas de livraison réelle. Français partout.

## Contrôles
Les contrôles propres à chaque atelier (voir `findings.md`, tableau des chaînes) ; puis ce que Fable doit
observer sur le serveur local après livraison : sur une station de chaque réseau, pastille « Mode prof
vocal », clic « Écouter » → l'écran suivant part seul après la narration, une question arrête.

## Rapport attendu (15 lignes au plus)
Par réseau : fichiers et lignes modifiés, option retenue (identifiants ou alias), obstacle éventuel ;
sortie des contrôles ; ce que Fable doit observer.
