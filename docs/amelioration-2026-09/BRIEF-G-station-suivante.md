# BRIEF G — « Station suivante » sur les modules du plan (`C:\git\pilote-fluides`) : une brique, pas 49 retouches

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot G (vague 2, après les lots D et E).
État des lieux : `docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md`, § 5 : 24 modules sur 73 mènent vers un
autre module ; les 49 autres ne proposent que le retour au plan de 108 stations — sur téléphone, remonter
tout le plan après chaque cours pour trouver le suivant.

## Ce qu'on veut
Sur chaque page de module du plan (`packs/fluides/res/<module>/index.html`), une navigation de ligne
discrète et **identique partout** : « ← station précédente · ↑ la ligne · station suivante → », fabriquée
à l'exécution depuis la source unique de l'ordre, `moteur/plan-donnees.js` (`window.PLAN_DONNEES`, les
lignes et leurs arrêts dans l'ordre ; les correspondances y sont marquées `corr`). Pas de texte gravé
dans 49 pages : une brique `moteur/suivant.js` (< 150 lignes, en-tête de contrat en 3-6 lignes : rôle,
entrées, sorties, pièges) qui :
1. déduit le module courant de `location.pathname` (`/packs/fluides/res/<module>/`) ;
2. trouve la ou les lignes qui le portent (un module peut être sur deux lignes : afficher la première,
   ou la ligne passée dans `?ligne=<slug>` si présente) ;
3. rend précédente / ligne / suivante — le lien « ↑ la ligne » ouvre `../../../../index.html#ligne=<slug>`
   (les vues de ligne sont réparées par le lot D) ; en tête et en fin de ligne, le lien absent est
   remplacé par « départ » / « 🏁 fin de ligne » vers le plan ;
4. s'insère dans un emplacement fixe et non intrusif — une barre fine en bas de page, sous le contenu
   (pas un élément flottant qui couvrirait un bouton ; le site a déjà « Aa » et « Mode prof vocal » qui
   flottent) — avec la charte : Trebuchet, `--bleu` `#1B3A63`, `--orange` `#FF6B35` ;
5. ne fait rien si le module n'est pas dans le plan (page hors plan) ou si `PLAN_DONNEES` est absent.

## Branchement
Dans les pages de module qui n'ont pas déjà de lien vers un autre module (liste à établir par script :
`href="../<autre-module>/"` ou libellé « station suivante » / « cours suivant » absent), ajouter avant
`</head>` (ancre `</head>`, jamais un motif texte — un motif peut vivre dans une chaîne JavaScript,
leçon du 02/09) :
```
<script src="../../../../moteur/plan-donnees.js"></script>
<script src="../../../../moteur/suivant.js" defer></script>
```
Sur les 24 modules qui ont déjà leur propre navigation, ne rien ajouter (le dire, avec la liste).
Les six lecteurs du lot E et le Tome 3 (lot D) ne se touchent qu'une fois les lots D et E terminés
(Fable le confirme au lancement).

## Règles
- Aucun texte parlé ne change. Aucune page hors `packs/fluides/res/*/index.html` et `moteur/suivant.js`.
- Ne pas modifier `moteur/plan-donnees.js` (source unique, versionnée par `version.mjs`).
- Pas de `build/version.mjs`, pas de commit, pas de push. Français partout.

## Contrôles
`node outils/controle-syntaxe.mjs` (aucune erreur nouvelle) ; un script de vérification qui, pour chaque
module du plan, calcule précédente / suivante depuis `plan-donnees.js` et l'imprime (Fable compare avec
le plan) ; ce que Fable doit observer sur http://localhost:8791/packs/fluides/res/detendeur-interactif/index.html
(ligne Organes : précédente « Tome 3 », suivante « Le compresseur ») et sur une tête et une fin de ligne.

## Rapport attendu (15 lignes au plus)
Fichiers modifiés (nombre de pages branchées, liste des 24 non branchées), contrat de la brique,
sortie des contrôles, ce que Fable doit observer.
