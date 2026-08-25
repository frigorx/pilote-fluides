# inerWeb HoCourant

S'entraîner en autonomie à l'habilitation électrique — de B0 à BR — pour trois filières :
2nde TNE, CAP IFCA, Bac Pro MFER. Application statique (HTML/CSS/JS), sans compte, sans
serveur, sans donnée personnelle : la progression vit dans le navigateur de l'élève.

## Ce que fait l'application

- **Parcours par paliers** : P0 socle → P1 (B0/H0/H0V) → P2 (BS/BE Manœuvre) → P3 (B1V)
  → P4 (BR). Chaque filière voit son parcours borné à l'objectif de son référentiel
  (TNE → P1 · IFCA → P3, savoir S6.2 · MFER → P4, savoir S7).
- **13 modules** : cours en écrans courts (< 10 min), puis entraînement à correction
  immédiate. Questions et propositions **mélangées à chaque affichage**.
- **Test de palier** : 15 questions, seuil 70 %, thèmes critiques (zones, limites) ≥ 30 %
  du tirage, un quart de rappels spiralés des paliers précédents (repères INRS ED 6127).
  Correction en fin de test seulement.
- **Code de restitution** : en fin de test, un code compact (filière, palier, score, date,
  contrôle d'intégrité — **aucun nom**) que l'élève rapporte. La page « Professeur :
  vérifier un code » le décode hors ligne.
- **Ancrage référentiel affiché** : chaque parcours montre les codes officiels couverts
  (S6.2/T8/T10/T12/T13 · S7/C4/C7/C8 · CC21/CC22).

L'application mesure une **habilitabilité** — jamais un titre : l'avis appartient au
formateur après l'évaluation pratique, le titre à l'employeur (C. trav. R4544-10).
La NF C 18-510 est citée, jamais reproduite.

## Lancer

Aucune fabrication. Servir le dossier tel quel (n'importe quel serveur statique), ou
ouvrir `index.html`. Exemple :

```
npx http-server . -p 2031
```

Destination : `inerweb.fr/hocourant/` (dossier autonome, comme HydroMétro).

**Le nom.** « HoCourant » se lit *au courant* — être informé — et fait écho au symbole
**H0**. Le nom « HabElec » a été abandonné le 25/08/2026 : habelec.fr est un centre de
formation Qualiopi sur le même objet, et « Habilec » désigne déjà une formation en ligne
à l'habilitation électrique.

## Architecture

| Fichier | Rôle |
|---|---|
| `index.html` | coquille unique, charge tout en local |
| `hocourant.css` | charte graphique inerWeb v1.1 (fond crème, trois canaux, jamais de sombre) |
| `app.js` | vues (accueil, parcours, module, test, vérification), état localStorage |
| `restitution.js` | encodage/décodage du code de restitution |
| `donnees/programme.js` | paliers, filières, modules, codes référentiels, règles de test |
| `donnees/cours.js` | les 13 modules de cours (écrans, SVG faits main) |
| `donnees/questions.js` | banque de 103 questions étiquetées (module → palier → thème) |
| `moteur/` | briques communes inerWeb : `lisibilite.js` (bouton Aa + police DYS), `marque.js` (logo), `impression.css`, police Lexend |

## Origine du contenu

- 79 questions et la trame des chapitres proviennent du **livret HoCourant v2.1** produit par
  la chaîne « inerweb full ia » de F. Henninot, reprises après l'audit du 24/08/2026.
- Les corrections v2.2 identifiées par cet audit sont **appliquées ici** : mélange
  aléatoire des propositions (le cycle A-B-C du livret ne peut plus exister), domaines de
  tension, effets physiologiques chiffrés, zones et distances, consignation et documents,
  repères BR, ancrage référentiel (24 questions nouvelles).
- Les 3 schémas SVG sont des créations originales inerWeb (voir `SOURCES-IMAGES.md`).

## Licence

Régime double, détaillé dans [`LICENCE.md`](LICENCE.md) :
**contenu pédagogique** en CC BY-NC-ND 4.0 (attribution « inerWeb — F. Henninot »,
usage en classe libre, usage commercial et republication interdits) ·
**code** visible mais tous droits réservés (redistribution et déploiement interdits
sans accord écrit). L'usage commercial — centres de formation en tête — passe par une
licence négociée : inerweb.fh@gmail.com.

© inerWeb 2026 — F. Henninot.
