# Catalogue des tutoriels de manipulation fluidique

**Objet :** la liste ordonnée de tous les tutoriels de geste professionnel (manipulation
fluidique) à produire, chacun destiné à se greffer sur inerWeb Habilitation, décliné en
TP, exercice indépendant, révision ou jeu.
**Marque :** inerWeb (décision Franck du 13/08/2026).
**Statut :** document de pilotage — il désigne le travail, il ne remplace ni la
validation métier ni le bon à tirer humain de chaque module.
**Référentiel d'appui :** arrêté du 21 novembre 2025, annexe II.B (136 codes,
14 groupes) — `packs/fluides/referentiel-2025.json`. La couverture précise se déclare
module par module (elle est mesurée par `node build/registre.mjs`, jamais à la main).

---

## 1. Le gabarit de fait : `pose-manifold-2-voies-interactive`

Le module du 13/08 fixe la forme canonique d'un tutoriel de manipulation. Ses quatre
parcours sont exactement les quatre déclinaisons demandées :

| Parcours du module | Déclinaison pédagogique |
|---|---|
| Parcours complet (écrans illustrés → manipulation → évaluation) | **Révision** autonome |
| Manipulation guidée (un geste à la fois sur le poste virtuel) | **Exercice indépendant** |
| Évaluation (QCM + mini-jeu d'ordre des phases + parcours autonome) | **Jeu** / auto-contrôle |
| Guide atelier (guidance projetable + version imprimable à cases) | **TP** encadré |

Règles de forme héritées (non négociables) :
- HTML autonome hors ligne, aucun compte, réseau, CDN ni serveur ;
- charte inerWeb Édu, moteur commun (`moteur/lisibilite.js`, `moteur/marque.js`,
  `moteur/impression.css`), curseurs de lisibilité ;
- un seul équipement utile à l'écran par geste, vue d'ensemble en écran de synthèse ;
- schémas de principe : la validation sur matériel réel reste obligatoire ;
- badge BROUILLON MÉTIER tant que le bon à tirer humain n'est pas donné ;
- le traitement du fluide piégé renvoie à la procédure réelle du plateau — aucune
  méthode universelle inventée.

**Vidéo :** chaque tutoriel pourra porter une capsule vidéo (démonstration du geste).
Les vidéos externes passent par `VIDEOS-PRESELECTION.md` (visionnage intégral
obligatoire avant usage) ; les deux vidéos « tirage au vide » y ont été écartées faute
de vérification — c'est précisément là qu'une vidéo maison a le plus de valeur.

## 2. L'existant sur le disque (constaté le 13/08/2026)

| Module | État | Codes déclarés |
|---|---|---|
| `vanne-service-interactive` | en place, appelé (p1, p5, g6b, g9b) | 4.01 · 4.05 · 5.01 |
| `pose-manifold-2-voies-interactive` | **orphelin**, brouillon métier | aucun — à déclarer |
| `pose-manifold-interactive` (4 voies) | **orphelin**, brouillon | aucun — à déclarer |
| `recuperation-fluide-interactive` | en place, appelé (p2), 8 écrans | 5.01 à 5.06 |
| `etancheite-interactive` | en place (g4a-g4c), 27 écrans — cours, pas geste | 4.01 à 4.09 |
| `mission-bouteilles` | en place (p6) | 5.02 · 5.05 · 5.06 |
| `intervention-hydrocarbures-interactive` | en place (g12b) | 12.07 à 12.12 |

Première dette à solder avant tout module neuf : **raccorder les deux manifolds aux
fiches et déclarer leur couverture** (ils sont orphelins : du travail fait que
personne n'atteint depuis le parcours).

## 3. Le catalogue, dans l'ordre du geste métier

L'ordre suit la chronologie réelle d'une intervention : on apprend à toucher la vanne
avant de brancher le manifold, à tirer au vide avant de charger.

| # | Tutoriel | Groupes / codes visés | Existant | État / priorité |
|---|---|---|---|---|
| 1 | Vanne de service Rotolock (positions, prises P/P1) | G4 · G5 | ✅ `vanne-service-interactive` | fait — sert de brique aux suivants |
| 2 | Pose, lecture et dépose du manifold 2 voies | G4 · G5 | ✅ brouillon 13/08 | raccorder + déclarer les codes + bon à tirer |
| 3 | Pose et dépose du manifold 4 voies | G4 · G5 | ✅ brouillon | idem n° 2 ; décider s'il reste ou si le 2 voies le remplace |
| 4 | **Tirage au vide et déshydratation** (pompe, vide poussé, remontée de pression) | G3 (3.01-3.05) · 5.x | ❌ | **PROCHAIN MODULE** (décision Franck 13/08) |
| 5 | Charge en fluide (liquide/vapeur, balance, traçabilité) | G5 (fiche g5b : peser, charger, stocker, tracer) | ❌ | après le n° 4 |
| 6 | Recherche de fuites — le geste (détecteur, mousse, azote) | G4 | cours théorique seul (`etancheite-interactive`) | à produire en version geste |
| 7 | Récupération de fluide — enrichissement gestes | G5 | ✅ 8 écrans | étoffer vers la forme gabarit (4 parcours) |
| 8 | Contrôles avant mise en service | G3 (fiche g3, 5 codes portés par texte seul) | ❌ | à produire |
| 9 | Relevé de fonctionnement (surchauffe, sous-refroidissement) et réglage du détendeur | G3 · G9 | cours `detendeur-interactif` (sans couverture déclarée) | à produire en version geste |
| 10 | Tuyauterie : cintrage et brasage | G10 (2 codes) | TP cintrage existant hors dépôt (tp-cintrage) | relier ou adapter |
| 11 | Manipulation des bouteilles (identification, transfert, stockage) | G5 | ✅ `mission-bouteilles` | vérifier s'il faut la forme gabarit |
| 12 | Gestes spécifiques hydrocarbures R290 | G12 | ✅ cours g12 + g12b | compléter côté geste si l'écart apparaît |

Hors catalogue volontairement : G13 (CO₂) et G14 (NH₃) — périmètres B et C,
« reconnaître, ne pas intervenir » pour le public visé (fiche g13). Aucun tutoriel de
manipulation n'y est légitime en catégorie I.

## 4. Déclinaisons : qui sert à quoi

Chaque module livre les quatre formes du gabarit ; c'est la fiche appelante qui choisit
laquelle exposer :

- **TP** → le Guide atelier (projetable + imprimable à cases de contrôle) ;
- **Exercice indépendant** → la Manipulation guidée ;
- **Révision** → le Parcours complet ;
- **Jeu** → le mini-jeu d'ordre des phases et le parcours autonome chronométrable.

## 5. Greffe sur inerWeb Habilitation

Les modules restent fabriqués et éprouvés ici (pilote-fluides), puis entrent dans
inerWeb Habilitation par le mécanisme existant `ressources[]` des questions et le
parcours faux → aide → remédiation → chapitre (point C.9 de son plan). Rien ne se
greffe tant que le module porte le badge BROUILLON MÉTIER.

---

*Créé le 13/08/2026. Tenir ce catalogue à jour à chaque module livré ; la couverture
réelle reste celle que mesure `REGISTRE-COURS-INTERACTIFS.md`, pas celle promise ici.*
