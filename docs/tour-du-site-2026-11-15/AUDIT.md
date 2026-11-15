# Tour du site du 15 novembre 2026 : audit et corrections

Demande de Franck, le 15/11/2026 : faire le tour d'inerweb.fr après la refonte de l'accueil, relever ce qui
ne va pas et le corriger. Atelier : `D:\git\_wt-tour-site`, branche `tour-du-site-2026-11-15`, partie de
`origin/main` `6e1244245`. Rien n'est en ligne tant que Franck n'a pas donné son feu vert.

Méthode : trois sous-agents Sonnet ont dépouillé le dépôt en lecture seule (chiffres et actualités, Memory
et jeux, liens et images), un quatrième a posé les corrections de chiffres. Le tour visuel, les choix et le
contrôle de chaque retour sont faits par le modèle principal.

## 1. Corrigé

| Constat | Correction | Fichiers |
|---|---|---|
| « Voir tout le site » menait aux huit portes, page intermédiaire | Le bouton mène à `reseaux.html`, la page complète d'origine | `index.html` |
| CuivRézo affichait 14 stations, il en a 18 | 18 | `moteur/reseaux.js`, `reseaux.html` |
| Le tour de main comptait pour 1 station et affichait « 23 stations · 4 lignes » | 19 pages propres comptées (jeu de poste et 18 interventions), affichage « 1 jeu de poste · 40 stations · 6 lignes », comme sur son plan | idem |
| Total « 449 stations » | 471, recalculé par `build/accueil.mjs` ; 76 lignes | `index.html`, `reseaux.html` |
| « Dix jeux » partout, il y en a quatorze | « Quatorze jeux », liste complétée | `index.html`, `portes.html`, `decouvrir.html`, `moteur/reseaux.js`, `reseaux.html` |
| Studio « 97 films » (93 en ligne avant le dernier envoi) | 99 films : 94 en séries, 5 isolés | `moteur/reseaux.js`, `reseaux.html` |
| Carte du Studio : « Brigade du tableau (huit films) », quatre séries absentes | Vingt-deux films, séries ajoutées | idem |
| Studio, accroche : « une saga, une trilogie, trois séries… un premier film de geste » | Une saga, deux trilogies, six séries, des mini-films de sécurité, trois documentaires, deux films de geste ; descriptions pour les moteurs de recherche alignées | `studio/index.html` |
| Studio, étiquettes : Manos « 4 films », air humide « tome 1 » | 5 films ; tomes 1 et 2 | idem |
| Studio : l'étiquette orange masquait le titre peint en haut de trois affiches (Diagramme, Explorateurs, Brigade) | L'étiquette descend en bas de ces trois affiches | idem |
| Studio : « Câbler une armoire » écrit deux fois sur l'affiche | Le titre ajouté par la page est retiré, celui de l'affiche reste | idem |
| Studio : les cinq premières missions des Explorateurs montraient une affiche portrait rognée dans un cadre paysage | Les miniatures 16:9 des films, comme les seize autres | idem |
| Studio : une étiquette longue dépassait de l'affiche au téléphone | Elle passe à la ligne | idem |
| Affiches des Aventuriers du Froid et de Mission Clim : une seule miniature perdue au milieu d'un cadre vide | Deux miniatures de la série empilées, recomposées à partir des images existantes | `studio/affiches/gestes-*.webp` |
| Memory : des dessins et des photos à reconnaître (pompe à vide, thermomètre, bouteille, vues d'organes, outils) | Un nom d'un côté, son symbole normalisé de l'autre, sur les trois thèmes à symboles ; cartes plus grandes | `jouerezo/donnees/themes.js` |
| Memory : les deux détendeurs avaient le même symbole, impossibles à distinguer | Versions avec repères, « TC » et « TCE » | `jouerezo/illustrations/bibliotheque/frigo_schema/` |
| Jeu Ranger et Memory des outils : six images d'outils absentes du site (404 en ligne) | Les six images rapatriées de l'atelier JouéRézo | `jouerezo/illustrations/outils/` |
| Bureau d'études : « 15 gares » ici, « 16 gares » là | 16 partout (`programme.js` en liste 16) | `moteur/reseaux.js`, `bureau-etudes/index.html` |
| Bureau d'études : « 34 stations prévues, ouvertes une à une » alors qu'elles sont en ligne | « 34 stations de 2 heures » | `moteur/reseaux.js` |
| Habilitations : « 13 réseaux, près de 7 000 narrations » | 14 réseaux, plus de 9 000 narrations | `habilitations/index.html` |
| Plan : « 46 planches » affiché sans JavaScript | 74 | `plan.html` |
| Journal : rien sur le film Un kilo, les pages pressostats refaites, les livres des habilitations | Trois entrées ajoutées aux 11 et 12 novembre | `reseaux.html` |
| Journal : lien vers un PDF CuivRézo qui n'existe pas | Lien vers la page des fiches de poste | `reseaux.html` |

## 2. Le Memory, ce qui change

- « Symboles du froid » : 21 paires, toutes tirées de la bibliothèque de symboles inerWeb (planche Eduscol).
  Les symboles QElectroTech d'avant mêlaient des symboles et des dessins.
- « Symboles électriques » : inchangé, c'était déjà nom et symbole.
- « Le vrai et le symbole : électricité » devient « Symboles du tableau électrique » : le nom de l'appareil
  et son symbole, 18 paires. L'adresse change : `memory.html?t=symboles-tableau`.
- « Le vrai et le symbole : froid » disparaît, ses symboles sont dans « Symboles du froid ».
- « Les outils » sort du Memory : ce sont des photos, et un outil n'a pas de symbole normalisé. Le thème
  reste dans L'intrus, Qui suis-je ? et le pendu, où il se joue avec des mots.
- Les autres jeux n'affichent pas de dessin d'organe à reconnaître. Ranger montre des outils, faute de symbole.
- Le même changement est reporté dans l'atelier source `D:\git\jouerezo` (commit local, non poussé), pour
  qu'une prochaine livraison ne remette pas l'ancien Memory. Son vérificateur passe : 14 thèmes, 0 erreur.

## 3. Laissé à Franck

1. Bureau d'études : le catalogue compte 36 stations (avec les gares 2 bis et 5 bis), le texte en annonce 34.
2. Journal : pas d'entrée pour les lignes E et T du bureau d'études, les dessins de situation du début de
   novembre, le nouvel accueil. À ajouter si Franck veut les annoncer.
3. Narrations : le build en compte 9 042 dans deux dossiers ; environ 2 000 fichiers audio vivent ailleurs
   (JouéRézo, CuivRézo, CartoClim). « Plus de 9 000 » reste vrai.
4. Non vérifiés : « 60 cours et outils » de `plan.html`, « 29 films » et « 253 questions » de la page des
   habilitations, les nombres de pages des livres.
5. Studio, fiche de la Brigade : le sous-titre « Les huit films » désigne la seule initiation.
6. Les deux affiches recomposées dépannent ; une vraie affiche de série reste à dessiner si Franck la veut.
7. Accueil : la vignette du câblage virtuel est rognée d'un quart en hauteur.

## 4. Contrôles

- Memory joué dans l'aperçu local, ordinateur et téléphone (375 px) : 16 cartes, une face nom et une face
  symbole, paire trouvée, aucun texte qui déborde, 3 colonnes au téléphone, pas de défilement horizontal.
- Studio mesuré dans l'aperçu : étiquettes en bas sur les trois affiches voulues, titre unique sur
  « Câbler une armoire », six premières vignettes des Explorateurs en 1280 × 720.
- Ranger : les six images d'outils se chargent.
- `build/accueil.mjs` relancé : 14 réseaux, 471 stations, 76 lignes.
- Les captures d'écran du navigateur intégré ont échoué en fin de séance (volet masqué) : les mesures
  ci-dessus viennent de la page elle-même.

## 5. Mise en ligne

Sur feu vert de Franck seulement : fusion dans `main`, `node build/version.mjs`, envoi. Ne pas lancer
`build/galerie.mjs` seul.
