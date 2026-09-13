# BRIEF D — le site lui-même (`C:\git\pilote-fluides`) : accueil, vues de ligne, Tome 3, film Ozone, deux coquilles

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot D. État des lieux :
`docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md` (§ 4.3, § 5) et `ANNEXE-B-STATIONS.md`.

## Règles du lot (non négociables)
- Français partout, commentaires compris. Modifications **chirurgicales** : chaque ligne changée se
  rattache à un point ci-dessous ; on ne retouche ni le code voisin ni la mise en forme « au passage ».
- **Ne jamais modifier un texte parlé** (narration, retour, consigne lue) : la clé des MP3 est une
  empreinte du texte, tout changement orpheline le MP3.
- **Ne pas insérer de balise en visant un motif texte** : viser `</head>` ou un identifiant unique
  (leçon du 02/09 : un motif peut vivre dans une chaîne JavaScript).
- Ne pas lancer `build/version.mjs`, ne pas commiter, ne pas pousser : Fable s'en charge.
- Ne pas toucher aux dossiers `aerorezo/`, `hydrometro/`, `electrorezo/` (copies servies d'ateliers,
  d'autres lots s'en occupent), ni aux six lecteurs React du lot E (`pressostat-bp-kp1`,
  `pressostat-hp-kp5`, `pressostat-combine-kp15`, `regulateur-kvr-nrd`, `film-effet-de-serre`),
  **sauf `film-ozone` pour le seul point 4** (coordination faite : le lot E ne touche pas à sa barre du haut).

## Point 1 — Accueil : le volet « Infos » ne doit plus couvrir le titre
`index.html`, vers la ligne 1848 : sur ordinateur le volet s'ouvre à l'arrivée et, à 1 280 px, couvre
le début du titre « Regardez le métier de frigoriste ». Décision retenue : **le volet démarre replié
partout** (comme sur téléphone), la poignée « Infos ▸ » reste visible, l'état replié/déplié se
conserve en session comme aujourd'hui. Retirer seulement la condition `matchMedia("(max-width: 700px)")`
qui faisait l'exception ordinateur, et mettre à jour le commentaire qui l'explique (il cite le retour
de F. Henninot du 19/08 : le garder, ajouter la date et la raison du 12/09 en une ligne).

## Point 2 — Les trois vues de ligne cassées
Sur l'accueil, `#ligne=huile`, `#ligne=regules` et `#ligne=co2` montrent tout le plan au lieu de la
ligne (REPRISE du 05/09). Diagnostiquer dans `index.html` (`VUES`, l. ~1742 ; `dessinerLigne()` ;
`rendre()` l. ~1791 et sa lecture du hash — regex `[a-z-]+` qui refuse le chiffre de `co2`) et dans
`moteur/plan-donnees.js` (les slugs existent : `huile`, `huile-circuit`, `regules`, `co2`… — vérifier
dans quels tableaux ils vivent et pourquoi `VUES` ne les voit pas). Corriger au plus court : la regex
accepte les chiffres, et chaque slug de ligne du plan est une vue. Vérifier ensuite que
`#ligne=organes` (qui marchait) marche toujours, et que le compteur de trajet n'a pas bougé.
Après toute modification d'`index.html` : `node build/plan-liste.mjs` deux fois de suite doit être
idempotent (le second passage ne change rien) — c'est le contrôle du 05/09.

## Point 3 — Tome 3 : une ligne de pied de page coupée
`packs/fluides/res/tome-3-technologie-organes/` : à 800 × 600, une ligne de texte en bas à gauche
(sous les cartes, au niveau de la barre « Mode prof vocal ») est coupée par la barre du bas.
Identifier l'élément, lui donner la place (marge basse de la page ou empilement) sans toucher au
reste. Aucune modification de texte.

## Point 4 — (déplacé au lot E) Film Ozone : bouton « Transcription » sur le logo
Ce point est traité par le lot E, qui travaille déjà dans `film-ozone/` : **ne pas toucher à
`film-ozone/` ni à `film-effet-de-serre/` dans ce lot.**

## Point 5 — Deux coquilles de fabrication (annexe B)
- Un jeton `__MARQUE_JS__` non remplacé dans `packs/fluides/res/diagramme-enthalpique/src/course-shell.html`
  (c'est un gabarit source ; vérifier si la page servie `diagramme-enthalpique/index.html` en hérite,
  et d'où vient le remplacement — corriger à la source du remplacement, pas en dur si un outil le fait).
- Un chemin `moteur/impression.css` mal tapé dans une page servie (l'annexe B le signale ; le
  retrouver par `grep -rn 'impression.css' --include=*.html` en cherchant un chemin qui ne résout pas
  sur le disque), le corriger.

## Point 6 — À NE PAS corriger, juste confirmer dans le rapport
`packs/fluides/res/mission-bouteilles/index.html` porte une étiquette « R-??? » sur une bouteille de
récupération : c'est vraisemblablement voulu (fluide à identifier par l'élève). Lire le contexte et
dire si c'est voulu ou non ; ne rien changer.

## Contrôles à passer (et à rapporter tels quels)
1. `node outils/controle-syntaxe.mjs` — aucune erreur nouvelle (une seule erreur antérieure connue :
   `document-eleve-compresseur.html`).
2. `node build/plan-liste.mjs` deux fois — idempotent, si `index.html` a été touché.
3. Pour les points 1, 2, 3, 4 : un contrôle de rendu par script est impossible ici ; décrire précisément
   ce qui a changé et ce que Fable doit voir dans le navigateur (adresse, largeur, ce qui doit apparaître).

## Rapport attendu (15 lignes au plus)
Par point : fichiers et lignes modifiés, ce qui a été fait, ce qui n'a pas pu l'être et pourquoi.
Puis la sortie des contrôles. Aucune recommandation hors périmètre.
