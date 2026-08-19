# REPRISE — fluides à glissement

## État exact

Ce dossier est un **brouillon autonome**, créé hors des deux racines Pilote Fluides afin de ne pas arbitrer à la place de F. Henninot entre :

- `C:\git\pilote-fluides` — dépôt GitHub canonique observé ;
- `C:\Users\henni\Desktop\inerweb full ia\pilote-fluides` — copie Bureau divergente.

Aucune synchronisation, publication ou indexation RAG n'a été effectuée.

La V1, jugée trop proche d'une révision, est conservée intacte dans
`C:\Users\henni\Desktop\inerweb full ia\fluides-glissement-pedagogique-v1-revision`.

## Ce qui a été réemployé

- architecture de navigation et contrat vocal du module canonique `pression-temperature-interactive` ;
- notions déjà présentes dans les modules pression-température et surchauffe/sous-refroidissement ;
- vocabulaire et géométrie générale du SVG inerWeb `diagramme-logph.svg` ;
- palette et contrats du skill `appliquer-charte-inerweb`.

Le nouveau SVG `assets/chaine-glissement.svg` et les diagrammes SVG intégrés dans `app.js` sont des dessins manuels originaux. Aucune image tierce n'est intégrée.

## Scénario V2

- **Étage 1 — je vois** : chaleur sensible, chaleur latente dans le cas pur, évaporateur à un seul constituant, mélange A-B, extension à A-B-C, apparition du glissement dans la zone latente, puis seulement les mots zéotrope et azéotrope.
- **Étage 2 — je m'en sers** : bulle et rosée, condenseur en sens inverse, distinction isobare/isotherme, confirmation sur log p-h, références de mesure et récit causal final.
- **Activités** : 2 pauses seulement, après 11 scènes d'explication ; aucun seuil de quiz.

## Contrat vocal V2

- le chargement reste silencieux ;
- le clic sur `Lancer l'explication racontée` autorise le parcours vocal de la séance ;
- les parties `voiceSteps` pilotent les états successifs de chaque illustration ;
- `onend` lance la partie suivante, puis la scène suivante après 1 050 ms ;
- les scènes `pauseForActivity` arrêtent l'avance sans désactiver l'autorisation ;
- l'activité réussie relance le parcours ;
- `speechRun` invalide les anciens callbacks ;
- la voix s'arrête au changement de scène, à la sortie, au masquage de l'onglet et avant la fermeture.

## Points à faire valider humainement

1. Le rythme réel de la voix et le délai de 1 050 ms entre deux scènes.
2. Le niveau de détail de l'image A-B : « A part davantage » sans faire croire à une séparation totale.
3. La formulation « change d'état ensemble » pour l'azéotrope, explicitement rattachée à la condition azéotropique.
4. Le nombre d'arrêts pédagogiques : mesure métier puis récit final.
5. Le niveau de simplification du diagramme log p-h : une seule isotherme complète est suivie dans les zones liquide, diphasique et vapeur ; sa portion diphasique se superpose à l'isobare sans glissement et la coupe avec glissement.

## Après bon à tirer

Ne pas agir avant décision de F. Henninot sur la racine cible. Une fois la cible choisie :

1. intégrer le dossier sous `packs/fluides/res/` ;
2. créer la couverture de compétences à partir du référentiel réel, sans inventer de code ;
3. relier la carte ou la galerie selon l'architecture de la copie choisie ;
4. lancer le build complet de cette copie ;
5. seulement après validation explicite, indexer les ressources RAG hors fonds documentaire ;
6. annoncer les chunks avant/après et les sources ajoutées.
