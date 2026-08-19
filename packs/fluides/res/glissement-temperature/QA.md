# QA — Pourquoi la température glisse ? — V2

Contrôles exécutés le 18 août 2026 sur le brouillon local reconstruit après retour pédagogique.

## Correction de fond vérifiée

- le parcours commence par une observation et non par une classification ;
- chaleur sensible puis chaleur latente précèdent le vocabulaire zéotrope/azéotrope ;
- la chaleur latente est définie comme l'énergie du changement d'état et n'est plus assimilée, en général, à une température constante ;
- le palier horizontal est explicitement limité au cas de référence d'un fluide pur à pression constante ;
- la zone latente du zéotrope est inclinée entre T bulle et T rosée ;
- l'évaporateur A-B montre une évolution de proportions et dit explicitement que A ne disparaît pas entièrement avant B ;
- une scène A-B-C étend le raisonnement aux mélanges de trois composants ;
- le mot **glissement** n'arrive qu'après la comparaison des courbes ;
- la scène 10 distingue explicitement l'isobare horizontale d'une seule isotherme complète ;
- l'isotherme est visible d'un seul tenant dans les zones liquide, liquide-vapeur et vapeur ;
- sans glissement, seule sa portion diphasique se superpose à l'isobare ; avec glissement, cette portion est légèrement inclinée et la coupe ;
- les deux familles de lignes restent lisibles pendant toute la narration, sans passage fantôme à 12 % d'opacité ;
- la scène 11 montre une isotherme complète qui traverse les trois zones et une isobare d'évaporation qui la coupe sous la cloche ;
- le segment bulle-rosée n'est pas présenté comme l'entrée obligatoirement liquide d'un évaporateur réel : la présence possible d'un mélange après détente est signalée ;
- la vérification ne comporte que deux pauses, après onze scènes d'enseignement.

## Structure et code

- `node --check app.js` : réussi ;
- `node tests/test-module.mjs` : réussi ;
- 13 scènes détectées ;
- 2 scènes `pauseForActivity` détectées ;
- jeton `speechRun` présent ;
- narration découpée en `voiceSteps` ;
- avance pilotée par la fin réelle de la synthèse vocale ;
- SVG doté d'un titre et d'une description ;
- aucun script, CSS, police ou média distant chargé ;
- aucun thème sombre ;
- aucune règle `print-color-adjust: exact` ;
- feuille d'impression avec marge `15mm`.

## QA navigateur

Le navigateur de test bloque les URL `file://`. La QA visuelle a donc été réalisée avec un serveur temporaire limité à `127.0.0.1`. Rien n'a été publié sur Internet.

L'autonomie `file://` a été contrôlée structurellement : chemins relatifs et absence de ressource distante. Le rendu visuel direct en `file://` n'est pas revendiqué comme testé dans ce navigateur.

### Formats et densité

Les 13 scènes, leurs blocs internes et le bilan ont été contrôlés dans chacun des quatre formats.

| Format | Scènes | Défilement page | Débordement carte/zone | Débordement interne | Bilan |
|---|---:|---|---|---|---|
| 1024 × 768 | 13/13 | aucun | aucun | aucun | complet |
| 1366 × 768 | 13/13 | aucun | aucun | aucun | complet |
| 390 × 844 | 13/13 | aucun | aucun | aucun | complet |
| 360 × 640 | 13/13 | aucun | aucun | aucun | complet |

La QA de cette correction a détecté que les deux mini-diagrammes isobare/isothermes tenaient côte à côte sur 360 × 640, mais devenaient pédagogiquement illisibles. Ils sont désormais empilés sur téléphone. Le schéma d'accueil reste également visible à 360 × 640. Aucun débordement n'est apparu après cette reprise.

### Mode raconté réel

- aucun départ vocal au chargement ;
- clic sur `Lancer l'explication racontée` : scène 1 lancée ;
- après la fin de la voix : passage automatique confirmé de la scène 1 à la scène 2 ;
- changement manuel de scène pendant la voix : ancienne lecture annulée ;
- scènes 10 et 11 : les trois états racontés atteignent bien l'affichage de l'isotherme complète ;
- après la scène 11 : avance automatique vers la scène 12 puis arrêt confirmé sur `Mode raconté · vous attend` ;
- bouton `Continuer` désactivé pendant l'activité ;
- après les deux bonnes réponses : reprise automatique confirmée vers la scène 13 ;
- Pause : libellé `Reprendre` et scène immobile ;
- Reprendre : lecture relancée ;
- Arrêter : mode raconté désactivé et navigation manuelle disponible ;
- texte prononcé intégralement présent dans la transcription ;
- libellés vocaux accessibles conservés sur téléphone même lorsque le texte des boutons est masqué visuellement ;
- changement de visibilité et sortie reliés à l'arrêt vocal.

### Activités

- surchauffe : un choix faux produit une remédiation, rosée valide le cas ;
- sous-refroidissement : bulle valide le cas ;
- récit final : un mauvais premier événement renvoie vers la première bulle ;
- ordre complet validé : bulle → composition qui évolue → température qui glisse → rosée ;
- bilan accessible uniquement après le récit complet ;
- définitions zéotrope, azéotrope et glissement visibles dans le bilan aux quatre formats.

### Console

- 0 erreur ;
- 0 avertissement.

## Reprise du 19 août 2026 — relecture métier

Sept points relevés à la relecture et corrigés. Contrôles rejoués après chaque
correction : `node --check app.js` et `node tests/test-module.mjs` passent.

1. **Le titre de la scène 12 donnait la réponse de son activité.** « Vapeur seule :
   rosée. Liquide seul : bulle. » surplombait l'exercice qui demande justement de
   choisir entre bulle et rosée. Le titre pose désormais la question.
2. **L'isotherme n'avait pas la bonne silhouette dans la zone liquide.** Elle y
   descendait en diagonale alors que l'enthalpie d'un liquide ne bouge presque pas
   quand la pression change : une isotherme y est quasi verticale. C'est le repère
   qui permet de la reconnaître sur un vrai diagramme. Corrigée sur les trois
   tracés (scène 10, deux panneaux, et scène 11) : la dérive horizontale passe de
   38, 40 et 93 unités à 8, 8 et 7. Le test la mesure maintenant et refuse au-delà
   de 25.
3. **Textes posés sur des tracés.** Mesurés au rendu réel, pas à l'œil : un contrôle
   interroge chaque `<text>` de chaque SVG et regarde quel tracé passe dans sa boîte.
   Il a démenti un défaut supposé (« zéotrope · T glisse » est propre) et en a révélé
   d'autres. Les étiquettes portent désormais un liseré de la couleur du fond, posé
   sous le glyphe. Quand l'étiquette nomme la courbe qu'elle touche — « courbe de
   bulle », « T rosée » — le croisement est conservé et c'est le liseré qui assure la
   lisibilité ; ailleurs l'étiquette a été déplacée.
4. **Scène 6 : aucun axe n'était nommé.** Les deux graphiques portent « T° » et
   « chaleur reçue → », comme le schéma d'accueil.
5. **La marque divergeait des autres modules du pack.** Le monogramme dessiné est
   remplacé par `logo-inerweb-edu.svg`, celui du parcours manomètres. La licence
   CC BY-NC-ND 4.0 figure au pied de page — elle n'apparaissait nulle part.
6. **Aucun réglage de lisibilité.** `lisibilite.js` et la police Lexend sont
   embarqués : réglage de taille et bascule vers une police adaptée. C'est le module
   qui vise le débutant, c'était le seul du pack à en être dépourvu.
7. **Aucun fluide réel n'était nommé.** La scène 7 donne maintenant des exemples,
   avec des glissements calculés depuis les tables P/T contrôlées du parcours
   manomètres — jamais saisis de mémoire : R-407C de 5 à 7 K selon la pression,
   R-404A moins de 1 K, R-410A 0,1 K. Le contraste sert le propos du module :
   glissement faible ne veut pas dire azéotrope, seule la table tranche.

### Correction d'une affirmation du contrôle précédent

Le QA du 18 août annonçait « 0 erreur, 0 avertissement » en console. Une 404 sur
`/favicon.ico` apparaît à chaque chargement servi en HTTP. Sans conséquence sur le
module, mais l'affirmation était fausse.


## Limites et validation humaine

- Le contenu reste un brouillon et n'a pas reçu de bon à tirer métier ou pédagogique.
- La synthèse vocale du navigateur reste provisoire ; aucun MP3 n'est produit avant validation des textes.
- L'écoute humaine du rythme et des prononciations reste nécessaire.
- Aucune intégration Pilote Fluides, publication GitHub ou indexation RAG n'a été effectuée.
