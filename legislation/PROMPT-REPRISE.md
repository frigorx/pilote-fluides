# PROMPT-REPRISE — le réseau Législation

> **À LIRE EN PREMIER** dans toute nouvelle session sur ce chantier.
> Ouvert le 23/08/2026. Tout ce qu'il faut pour reprendre est ici.
> La vérité du réseau technique voisin reste le `REPRISE.md` à la racine du dépôt
> (section du 23/08) ; ce fichier-ci est la vérité DU RÉSEAU LÉGISLATION.

## Ce que c'est

Un **deuxième réseau** de cours inerWeb, **niveau BTS**, sur la réglementation, la
sécurité et l'environnement. Né d'un besoin de F. Henninot : désengorger le plan
technique (15 lignes, 108 stations) au lieu d'y empiler des stations.

## Les six décisions de F. Henninot — cadre non négociable

1. **Réseau de réseaux.** Une entrée n'est pas une station terminale, c'est la
   **tête d'une sous-ligne** qui descend (« l'acoustique, c'est une ligne ;
   l'incendie, c'est une ligne »).
2. **Maillage.** Les sous-réseaux se répondent entre eux, pas seulement vers le
   réseau technique. Son exemple fondateur : Électrique ⇄ Risques professionnels,
   par l'habilitation et les EPI. « Une carte mémoire avec des interactions. »
3. **« Presque un autre site. »** La Législation ne se mélange PAS à la
   thermo-techno. D'où l'architecture SATELLITE (voir plus bas) — c'est la
   décision structurante du chantier.
4. **Création libre.** « Tu es assez doué pour faire mieux que le livre. » Le
   sommaire du manuel photographié n'est qu'une **ossature de chapitres** ; rien
   n'est recopié, le découpage en stations est une conception maison.
5. **La DESP est indépendante et transversale.** Pas un sous-chapitre de la
   fluidique : une sous-ligne à part entière, « au même titre que l'incendie et
   l'acoustique ». Elle touche aussi l'incendie (sprinkler et RIA : réseaux d'eau
   sous pression, lot CVC de bureau d'études).
6. **Projet inerWeb** (pas scolaire) → logo inerWeb. *(La question se repose à
   chaque nouvelle production, même quand le cas paraît évident.)*

## Architecture — le satellite

`legislation/index.html` se comporte comme les satellites existants
(`sous-tension`, `qcm-travail-hauteur`), pas comme une page du site :

- identité propre dans l'en-tête (« inerWeb Législation »), **aucun menu du site
  technique** — une seule passerelle, « ⇄ Le réseau thermo-techno » ;
- `lisibilite.js` et `marque.js` chargés **en absolu** depuis
  `https://inerweb.fr/moteur/` (règle du 20/08 : une source, zéro divergence) ;
  le pied de page et la licence viennent de là ;
- liens sortants en absolu ;
- **le dossier doit rester déplaçable d'un bloc** vers un dépôt ou un
  sous-domaine séparé, sans rien casser ;
- il n'entre PAS dans `PAGES` de `build/version.mjs` (commentaire posé là-bas) ;
- `noindex`, hors sitemap, tant que le réseau est en construction.

## État au 23/08/2026

**Le plan : 2 lignes mères · 11 sous-lignes · 57 stations, toutes EN PRÉPARATION**
(pastille en pointillé, aucun lien). Mesuré sur la page servie : 144 textes,
**0 chevauchement**, 0 débordement du cadre, console vide.

- 📜 **LES RÉGLEMENTATIONS** (#1e40af) — 8 têtes : Thermique 6 · Acoustique 5 ·
  Incendie 6 (dont Sprinkler & RIA) · Électrique 6 · Fluidique & thermique 4 ·
  **La DESP 5** · Certifications & normes 4 · Droit du travail 5.
- 🦺 **SÉCURITÉ & ENVIRONNEMENT** (#166534) — 3 têtes : Risques professionnels 6 ·
  Déchets 5 · Impact environnemental 5.
- **14 anneaux de correspondance**, dont 6 paires de maillage interne listées
  sous le plan.

**Une station a son fond écrit et VALIDÉ par F. Henninot** :
`stations/fgaz-3/FOND.md` — 8 écrans + 4 questions. C'est le **gabarit** des 56
autres.

## Le rail de production — à suivre pour CHAQUE station

1. **Code** : rédiger le fond dans `stations/<slug>/FOND.md` (objectif, écrans,
   questions, maillage, consignes Design en fin de document) → **faire valider
   par F. Henninot**. Rien ne part avant.
2. **Design** : envoyer le fond validé + la charte en **une seule demande cadrée**
   (annoncer le coût estimé avant). Sortie **HTML/SVG, jamais bitmap**.
3. **Code** : transposer au format maison, la station devient cliquable — lui
   donner un `href` et reprendre le motif `station()` complet du plan principal
   (lien, trajet, coche) à la place de la pastille en pointillé.

## ✅ LA PREMIÈRE STATION EST OUVERTE — F-Gaz 3, 23/08

Le rail a été déroulé en entier sur la première station. **57 stations, dont
1 ouverte.** Elle vit dans le dépôt et nulle part ailleurs :

    legislation/stations/fgaz-3/
      index.html   8 écrans + 4 questions + le maillage
      styles.css   feuille autonome (le dossier reste déplaçable d'un bloc)
      svg/         6 schémas : frise, phase-down, conversion, deux régimes,
                   aptitude + les 7 catégories, raisonnement du technicien
      FOND.md      le fond validé, mis à jour des arbitrages du 23/08

Le plan (`index.html`) a gagné **`stationOuverte()`** : même géométrie que la
pastille en préparation — l'œil ne doit pas se réhabituer — mais pastille pleine,
nom souligné, et un lien. Compteur et légende suivent.

**Vérifié sur le site local**, pas sur le code : console vide, plan → station en
200, aucun débordement de 1265 px à 375 px, et **0 chevauchement sur les 110
textes** des 6 SVG (mesure en `getBoundingClientRect`, jamais `getBBox`).

### Les quatre arbitrages de F. Henninot (23/08)

1. **Sept catégories d'aptitude, pas six** — V ajoutée d'après
   `referentiel-2025.json`, encadrée en pointillé (référentiel distinct II.D).
   Le fond a été corrigé en conséquence.
2. **HTML simple, pas `.dc.html`** — la page se lit et s'exporte, elle n'est pas
   cliquable-éditable dans l'éditeur Design. Choix assumé : le format à runtime
   de Design aurait compliqué la transposition.
3. **Rapatrier ET rendre cliquable** dans la foulée, sans attendre la relecture.
4. **Auditer les SVG du pack sans les corriger** → `AUDIT-SVG-DEBORDEMENTS.md`
   à la racine : 19 fichiers sur 198 débordent dès que Calibri manque, contre 10
   sur un poste Windows. `aptitude-capacite.svg` du pack garde son défaut ; seule
   la copie de la station est saine.

### Ce qui n'a PAS été greffé, et pourquoi

Le moteur du site est chargé (`lisibilite.js`, `marque.js`, en absolu). Trois
choses ont été écartées **volontairement**, pas oubliées :

- **les curseurs de lisibilité** rendus par Design : doublon avec le bouton
  « Aa » de `lisibilite.js`, qui fait mieux (70→160 %, police DYS, mémorisé).
  Le contraste disparaît avec eux : s'il manque vraiment, sa place est **dans**
  `lisibilite.js`, pas dans une station ;
- **la voix** : elle suppose de fabriquer les audios, donc un service tiers, donc
  un feu vert séparé de F. Henninot ;
- **le rail de progression écran par écran** et **`referentiel.js`** : le premier
  n'apprend rien tant qu'une seule station existe, le second attend que le
  référentiel BTS d'adossement soit tranché (point b ci-dessous). La page défile,
  elle s'imprime, elle se lit.

## ▶ PROCHAINE ACTION

**Relecture métier des 8 écrans par F. Henninot**, sur le site local :
`http://localhost:8124/legislation/stations/fgaz-3/` (le port 8123 était occupé
par une autre session — entrée `pilote-fluides-legislation` dans
`.claude/launch.json`).

La station s'annonce d'elle-même comme document de travail : l'attribut
`data-prototype` sur `marque.js` affiche « Prototype — document de travail » en
pied. **Il se retire une fois la relecture faite.**

Ensuite seulement : la station 2, en repartant de l'étape 1 du rail.

