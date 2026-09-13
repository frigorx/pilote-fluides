# BRIEF E — les six lecteurs à horloge (`C:\git\pilote-fluides\packs\fluides\res\…`) : l'image et la voix partent ensemble

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot E. État des lieux :
`docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md`, § 3.3.

## Le défaut, mesuré
Sur `pressostat-bp-kp1` et `film-ozone`, l'horloge du lecteur démarre **seule au chargement**
(compteur à 0:02 puis 0:03 sans aucun clic) ; la voix, elle, attend le clic sur « Écouter ». Un
visiteur qui lit la consigne dix secondes avant de cliquer entend le début du texte sur la fin de
l'image. Le contrat du site (`moteur/prof-vocal.js`, en-tête) veut que l'écran suivant ne parte
qu'après la fin de la narration ; ces lecteurs ont leur propre horloge et l'ignorent.

## Périmètre : six modules, tous dans `packs/fluides/res/`
`pressostat-bp-kp1`, `pressostat-hp-kp5`, `pressostat-combine-kp15` (même lecteur, trois pages de
405 Ko avec React en ligne — lire d'abord `pressostat-bp-kp1/REPRISE.md` et
`REPRISE-ANIMATION-2026-08-20.md` : ils disent où est la source et comment on refabrique),
`regulateur-kvr-nrd` (React en ligne aussi), `film-ozone` et `film-effet-de-serre` (sources `.jsx` à
côté des `.js` compilés ; chaîne de compilation : `build/films.mjs` du site ou consigne du dossier —
**modifier la source puis recompiler, jamais le `.js` seul**).

## Ce qu'il faut obtenir, pour chacun des six
1. **Rien ne bouge au chargement** : l'horloge de l'animation est à zéro tant que l'utilisateur n'a
   pas cliqué. (Le préchargement, lui, peut se faire.)
2. **Un seul départ** : le clic sur « ▶ Écouter » (ou « ▶ Écouter le film ») lance l'image ET la
   voix ensemble, depuis le début de la scène courante. Le bouton de lecture propre au lecteur
   (▶ de la barre de transport, s'il existe) fait la même chose : il lance aussi la voix de la
   scène. Il n'y a plus deux horloges indépendantes.
3. **Pause et arrêt vont ensemble** : mettre la voix en pause met l'image en pause, et inversement ;
   « Stop » arrête les deux.
4. **Changement de scène** : quand la voix d'une scène se termine, le lecteur peut continuer vers la
   scène suivante comme aujourd'hui, mais la voix de la scène suivante part avec l'image de la
   scène suivante (pas en avance, pas en retard).
5. **Sans son** : un visiteur qui n'active pas la voix peut toujours lancer l'image par le ▶ du
   lecteur ; dans ce cas la voix est proposée par le même clic si le module a un mode « voix
   active », sinon l'image joue seule. Ne pas inventer de nouvel élément d'interface : réutiliser
   les boutons existants.

## En plus, pour `film-ozone` (et `film-effet-de-serre` si même cas)
Le bouton « ▶ Transcription du film (13 passages) » est posé **sur le logo inerWeb** en haut à gauche
(vu à 800 px de large). Le déplacer là où il ne couvre rien (sous la barre du haut, ou à droite à côté
du titre du film), à toutes largeurs — dans la source `.jsx`, puis recompiler.

## Règles du lot (non négociables)
- Français partout. Modifications **chirurgicales** ; ne pas réécrire le lecteur, ne pas changer son
  aspect, ne pas toucher aux scènes ni aux dessins.
- **Ne jamais modifier un texte parlé** : la clé des MP3 est une empreinte du texte. Les MP3 des
  pressostats vivent dans le fonds commun (`moteur/voix.js`) ; ceux des films sont un fichier unique
  par film (`voix-ozone.mp3`, `voix-effet-de-serre.mp3`) découpé en passages.
- Ne pas lancer `build/version.mjs`, ne pas commiter, ne pas pousser.
- Si un des six lecteurs ne peut pas être aligné sans réécriture lourde, **s'arrêter sur celui-là**,
  faire les autres, et expliquer précisément l'obstacle.

## Contrôles à passer (et à rapporter tels quels)
1. `node outils/controle-syntaxe.mjs` (depuis `C:\git\pilote-fluides`) — aucune erreur nouvelle
   (une seule antérieure connue : `document-eleve-compresseur.html`). Ce contrôle compile tous les
   blocs `<script>` en ligne : c'est lui qui avait manqué le 02/09 sur ces mêmes pressostats.
2. Pour chaque module, décrire le point d'entrée exact où l'horloge démarrait seule et ce qui le
   remplace (fichier, fonction, lignes).
3. Fable vérifie ensuite dans le navigateur : à l'ouverture, compteur à 0:00 et rien ne bouge ; au
   clic « Écouter », l'image et le MP3 partent ensemble ; pause commune. Écrire dans le rapport ce
   qu'il doit observer pour chacun des six.

## Rapport attendu (20 lignes au plus)
Par module : fichiers et lignes modifiés, mécanisme retenu, obstacle éventuel. Puis la sortie du
contrôle de syntaxe. Aucune recommandation hors périmètre.
