# Régulateur de pression de carter — parcours pédagogique inerWeb Édu

Module autonome en quatorze écrans consacré au régulateur mécanique de pression de carter,
couramment désigné par le type KVL. Il part de la silhouette de l’organe, le place sur
l’aspiration, montre son fonctionnement en coupe, puis construit une méthode de sélection,
d’installation, de réglage et de diagnostic.

Le produit Danfoss KVL 28 `034L0046` sert de cas documentaire vérifié. L’interface explique le
principe sans intégrer de photo, de dessin, de coupe ou de modèle 3D constructeur.

## Ouvrir

Double-cliquer sur `index.html`. Aucun serveur, compte, CDN ni accès internet n’est requis.

## Parcours

1. reconnaître la silhouette et les repères extérieurs ;
2. placer le KVL sur l’aspiration juste avant le compresseur ;
3. relier redémarrage, pression élevée et protection du moteur ;
4. respecter le sens entrée-sortie ;
5. nommer capuchon, vis, ressort, soufflet, joint, siège et amortisseur ;
6. identifier la pression de sortie comme grandeur régulée ;
7. observer ouverture, modulation et limitation ;
8. distinguer égalisation et amortissement ;
9. comprendre la bande proportionnelle ;
10. appliquer la méthode identifier → mesurer → ajuster → vérifier ;
11. relier le cas `034L0046` aux critères complets de sélection ;
12. parcourir les contrôles d’installation et de mise en service ;
13. diagnostiquer trois familles de symptômes sans réglage automatique ;
14. vérifier les acquis avec sept situations corrigées.

## Contrat

- une idée principale par écran ;
- écran entier dans `100dvh`, sans défilement ;
- navigation au clavier avec `←` et `→` hors contrôles ;
- lecture vocale facultative, jamais automatique ;
- vitesses `0,80 · 0,95 · 1,10 · 1,25`, défaut `0,95` ;
- clé locale `inerweb-kvl-rate` ;
- arrêt de la voix au changement d’écran, à la sortie et lorsque la page devient cachée ;
- sept questions finales, réussite pédagogique à partir de `6/7` ;
- fonctionnement complet sans voix, sans stockage et sans réseau ;
- impression A4 paysage sobre ;
- aucune dépendance distante.

## Faits métier bornés

- le KVL se monte sur l’aspiration en amont du compresseur ;
- il limite la pression d’aspiration, notamment au démarrage après un arrêt prolongé ou un
  dégivrage, afin de réduire le risque de surcharge du moteur ;
- il régule selon la pression de sortie ;
- il s’ouvre quand cette pression tombe sous la valeur réglée ;
- le soufflet d’égalisation compense l’influence de la pression d’entrée ;
- le dispositif d’amortissement réduit l’effet des pulsations ;
- un régulateur module une pression ; il ne remplace ni pressostat ni protection moteur ;
- aucune valeur propre au KVL 28 n’est présentée comme une règle universelle.

## Dessins et droits

La silhouette, la Croix du frigoriste, la coupe fonctionnelle, la courbe et les activités sont des
SVG originaux écrits dans `app.js`. Les documents, photos, dessins et fichiers CAO Danfoss fournis
ont servi uniquement de références documentaires. Leurs droits de reproduction et de modification
n’étant pas établis, ils restent hors du livrable. Voir `SOURCES-IMAGES.md` et
`SOURCES-TECHNIQUES.md`.

## Fichiers principaux

- `index.html` : structure accessible ;
- `styles.css` : projection, téléphone et visuels ;
- `app.js` : parcours, SVG, activités, voix et quiz ;
- `lisibilite.js` : réglage de taille du texte ;
- `impression.css` : sortie papier ;
- `STORYBOARD.md` : intention des quatorze écrans ;
- `SOURCES-TECHNIQUES.md` : faits et références métier ;
- `SOURCES-IMAGES.md` : registre des médias ;
- `REPRISE.md` : contrat de maintenance ;
- `tests/qa.mjs` : contrôle automatique multi-format et hors ligne.

## État

Brouillon créé le 6 août 2026. Une validation métier explicite de F. Henninot reste nécessaire
avant publication, intégration au fonds ou indexation dans le RAG actif.

