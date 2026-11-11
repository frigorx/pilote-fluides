# Accueil à quatre entrées (11/11/2026)

Branche `accueil-quatre-entrees`, atelier `D:\git\_wt-accueil`, créée depuis `origin/main` (aaddd727d).
Rien n'est en ligne tant que Franck n'a pas donné son feu vert.

## Pourquoi

Retour d'un visiteur rapporté par Franck le 11/11/2026 : « le site est trop dense, il y a trop de choses,
on ne sait pas où aller ni comment faire ». Audit du même jour sur le site en ligne :

| Mesure | Accueil à huit portes | Accueil à quatre entrées |
|---|---|---|
| Choses à cliquer sur la page (1 366 × 768) | 80 | 25 |
| Choses à cliquer au premier écran | 37 (à 1 024 px) | 12 |
| Hauteur, ordinateur | 4,5 écrans | 3 écrans |
| Hauteur, téléphone 375 × 812 | 8,4 écrans | 4,2 écrans |
| Premier écran au téléphone | le volet, qui couvre tout | le titre et les quatre entrées |

## Ce qui change

- `index.html` : « Vous êtes… » et quatre entrées (élève ou apprenti, candidat à une habilitation,
  enseignant ou formateur, curieux du métier). Chaque entrée ouvre un écran de quatre à six choix dans la
  même page : `#eleve`, `#habilitation`, `#enseignant`, `#decouvrir`. Le bouton Retour du navigateur marche,
  chaque écran a son adresse. Sans script, les écrans s'affichent à la suite.
- Les diplômes de l'écran « élève » ouvrent `mon-parcours/#diplome=…` : plus d'étape « Niveau 3 ou 4 ».
- Un bandeau « Essayer ce cours » (« Du glaçon au circuit ») et six images tirées des productions
  (demande de Franck du 11/11 : « texte et images, ça manque d'illustrations »). Toutes les images existaient
  déjà dans le dépôt : vignettes des portes, couvertures, affiche de film, quartier, jeux, câblage, cuivre.
- Menu du haut de l'accueil : Cours, Habilitations, Outils, Enseignants.
- `portes.html` (nouveau) : les huit portes du 01/11/2026, telles quelles, sans volet ni bandeau
  établissement. « Voir tout le site » y mène ; le gros logo y mène toujours à `reseaux.html`.
- `build/version.mjs` : `portes.html` entre dans PAGES.

## Deux décisions de Franck du 01/11 sur lesquelles cette page revient

1. **Le volet « Actualités et espaces » arrive fermé.** La bande du bas de page l'annonce et l'ouvre.
   Pour revenir à l'ouverture d'office : dans le script du volet, remettre `var replie = false;`.
2. **Le bandeau « établissement partenaire » ne s'affiche plus tant qu'il est vide** (`actif:false`).
   Il apparaît de lui-même quand `actif` passe à `true` dans `moteur/etablissement.js`. Son bloc reste
   dans le volet. Pour le revoir en maquette : retirer le petit script qui suit `etablissement.js`.

## Contrôles passés le 11/11/2026

- Contrôle téléphone (`controle-telephone.cjs`, 360 × 640 et 640 × 360) : `index.html`,
  `index.html#enseignant` et `portes.html`, aucun bloquant.
- Liens : 57 adresses locales dans `index.html`, 59 dans `portes.html`, aucune cassée.
- Style (`controle-style.py`) : 0 passage à réécrire.
- Navigateur : clic sur une entrée, focus sur le titre de l'écran, retour arrière, aucune image cassée,
  aucune erreur en console.

## Reste à faire

- Relecture des textes par Franck.
- Mise en ligne sur son accord : `git -C D:\git\_wt-accueil push origin accueil-quatre-entrees:main`
  (refaire `git fetch` et fusionner `origin/main` avant, puis `node build/version.mjs` depuis `D:`).
- Suite de l'audit, chantiers à part : un seul haut de page pour tout le site, libellés qui annoncent
  leur page d'arrivée, « CAP ou Bac pro » à la place de « Niveau 3 ou 4 » dans `mon-parcours/`.
