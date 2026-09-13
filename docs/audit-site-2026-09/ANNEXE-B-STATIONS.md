# Audit chiffré des stations — inerweb.fr (copie servie C:/git/pilote-fluides)

_Généré le 2026-09-12 par script Node (`audit-stations.mjs`), lecture seule sur le dépôt. État des lieux factuel, sans recommandation._

## Méthode : heuristique retenue par réseau

Chaque réseau range son contenu différemment ; la mesure s'y adapte plutôt que de forcer un moule unique.

- **Plan thermo-techno** (modules) : « écrans » = champ `ecrans` de `couverture.json` quand il existe (31 modules sur 73) ; sinon, nombre d'occurrences de la clé `narration:` dans le script principal ; sinon nombre de `<section>` HTML. « Narrations / mots narrés » = entrées de `build/voix/corpus.json` (`type: "narration"`) dont une source pointe vers le module ; MP3 = même compte (fichiers `packs/fluides/res/voix/audio/<cle>.mp3`, nommage vérifié).
- **Plan thermo-techno — capsules** (`capsules/donnees/<id>.js`, un fichier = une station) : « écrans » = nombre de champs `dire:` (un par écran) ; « questions » = nombre de champs `bonne:`. Ces stations n'apparaissent pas dans `corpus.json` : narrations et mots narrés sont donc mesurés directement sur le champ `dire:` du fichier, sans MP3 identifiable.
- **Législation** : « écrans » = nombre de `class="slide"` dans le HTML (inclut l'écran d'accueil et les écrans de question — c'est la structure réelle : le FOND.md d'`aptitude-capacite` l'annonce explicitement comme « 8 écrans + 4 questions » soit 12-13 `.slide`). « Questions » = nombre de `quiz-options`. Narrations/MP3 = `corpus.json`, sources `legislation/stations/<slug>/app.js`.
- **HydroMétro** : « écrans » = nombre de champs `narration:` dans `content.js`. 6 stations sur 22 (`boucle`, `debit`, `delta-t`, `energie`, `mesurer`, `puissance`) utilisent un `shell.js` de structure différente, sans champ `narration:` : l'heuristique y renvoie 0 écran/0 narration bien qu'elles portent un texte réel (voir section 4) — limite documentée, pas une absence de contenu.
- **AéroRézo** : « écrans » = nombre de phases présentes dans l'objet `narration: {decouvrir, comprendre, manipuler, verifier}` de `manifest.js` (structure fixe à 4 temps, pas un compteur variable). Narrations/MP3 = `corpus.json`, sources `aerorezo/stations/<slug>/manifest.js`.
- **ÉlectroRézo** : « écrans » = nombre de phases présentes dans l'objet `NARRATION` de `narration.js` (`decouvrir, comprendre, manipuler, representer` — structure fixe à 4 temps). Ce réseau est absent de `corpus.json` : narrations et mots narrés sont mesurés directement sur `narration.js` ; MP3 = fichiers de `voix/homme/` + `voix/femme/` (nommage vérifié sur deux stations : quatre fichiers par voix, un par phase).
- **Toutes réseaux** : « mots de cours » = texte visible du HTML (balises retirées) + chaînes de caractères « prose » des fichiers de contenu JS de la station, à l'exclusion des champs de narration orale (pour ne pas compter deux fois le même texte). « Images absentes » et « liens cassés » : chemin résolu depuis le fichier qui le porte, avec repli sur les sous-dossiers `assets/`, `images/`, les bibliothèques partagées du Plan (`svg/`, `bibliotheque/icones/`, `img/`, `illustrations/`, `vignettes/`), et une recherche par nom de fichier dans l'arborescence propre de la station — nécessaire car plusieurs moteurs stockent un nom de fichier nu et ajoutent eux-mêmes un préfixe (`../svg/`, `assets/`, une constante JS `ASSET`). Une valeur assemblée dynamiquement à l'exécution (ex. `${fichier}` dans une boucle) n'est pas vérifiable statiquement et n'est pas comptée.

## 1. Tables par réseau

### Plan thermo-techno (97 stations)

| Station | Écrans | Mots | Images | Images absentes | Questions | Narrations | Mots narrés | MP3 | Animation | Moteur voix | Charte commune | Marqueurs | Liens cassés |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bilan-thermique-performance-interactif | 16 | 5082 | 5 | 0 | 10 | 16 | 1330 | 16 | 11 | Oui | Non | — | 0 |
| bouteille-liquide-pedagogique | 14 | 3938 | 16 | 0 | 0 | 14 | 1102 | 14 | 10 | Oui | Non | — | 0 |
| capsules/cl2 | 7 | 1865 | 2 | 0 | 2 | 0 | 602 | 0 | 0 | Oui | Non | — | 0 |
| capsules/cl3 | 7 | 2202 | 2 | 0 | 2 | 0 | 813 | 0 | 0 | Oui | Non | — | 0 |
| capsules/cl4 | 8 | 2152 | 1 | 0 | 2 | 0 | 761 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g0 | 8 | 1922 | 1 | 0 | 3 | 0 | 582 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g10 | 5 | 1319 | 1 | 0 | 2 | 0 | 414 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g13 | 6 | 1697 | 1 | 0 | 2 | 0 | 559 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g1d | 7 | 1992 | 0 | 0 | 2 | 0 | 680 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g2 | 7 | 1524 | 0 | 0 | 2 | 0 | 465 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g2a | 7 | 1541 | 0 | 0 | 2 | 0 | 463 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g3 | 7 | 1803 | 2 | 0 | 2 | 0 | 561 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g5a | 7 | 1656 | 3 | 0 | 2 | 0 | 509 | 0 | 0 | Oui | Non | — | 0 |
| capsules/g5b | 8 | 2039 | 1 | 0 | 2 | 0 | 739 | 0 | 0 | Oui | Non | — | 0 |
| capsules/p4 | 5 | 1420 | 1 | 0 | 2 | 0 | 394 | 0 | 0 | Oui | Non | — | 0 |
| capsules/p7 | 6 | 1721 | 1 | 0 | 2 | 0 | 552 | 0 | 0 | Oui | Non | — | 0 |
| capsules/s1 | 6 | 2009 | 1 | 0 | 2 | 0 | 608 | 0 | 0 | Oui | Non | — | 0 |
| capsules/s2 | 5 | 1302 | 1 | 0 | 2 | 0 | 328 | 0 | 0 | Oui | Non | — | 0 |
| capsules/s3 | 6 | 1625 | 2 | 0 | 2 | 0 | 451 | 0 | 0 | Oui | Non | — | 0 |
| capsules/s4 | 7 | 2022 | 2 | 0 | 2 | 0 | 613 | 0 | 0 | Oui | Non | — | 0 |
| capsules/s5 | 7 | 1965 | 1 | 0 | 2 | 0 | 597 | 0 | 0 | Oui | Non | — | 0 |
| capsules/x1 | 5 | 892 | 0 | 0 | 1 | 0 | 296 | 0 | 0 | Oui | Non | — | 0 |
| capsules/x2 | 5 | 1264 | 2 | 0 | 1 | 0 | 417 | 0 | 0 | Oui | Non | — | 0 |
| capsules/x3 | 5 | 1213 | 2 | 0 | 1 | 0 | 366 | 0 | 0 | Oui | Non | — | 0 |
| capsules/x4 | 5 | 1247 | 2 | 0 | 1 | 0 | 419 | 0 | 0 | Oui | Non | — | 0 |
| capsules/x5 | 5 | 1190 | 0 | 0 | 1 | 0 | 378 | 0 | 0 | Oui | Non | — | 0 |
| chaine-intervention-interactive | 25 | 1558 | 31 | 0 | 0 | 0 | 0 | 0 | 1 | Oui | Non | — | 0 |
| chaleur-circuit-interactif | 12 | 2997 | 6 | 0 | 12 | 12 | 888 | 0 | 22 | Oui | Non | — | 0 |
| chaleur-interactive | 4 | 5345 | 1 | 0 | 9 | 0 | 0 | 0 | 26 | Oui | Non | — | 0 |
| circuit-huile-interactif | 2 | 1087 | 1 | 0 | 0 | 0 | 0 | 0 | 2 | Oui | Non | prototype, brouillon | 0 |
| circuit-organe-par-organe | 22 | 5586 | 16 | 0 | 10 | 12 | 629 | 12 | 34 | Oui | Non | — | 0 |
| clapet-differentiel-huile-pedagogique | 7 | 1619 | 1 | 0 | 6 | 7 | 633 | 7 | 0 | Oui | Non | — | 0 |
| co2-r744 | 100 | 19466 | 6 | 0 | 33 | 54 | 6088 | 54 | 30 | Oui | Non | — | 0 |
| commande-directe-thermostat | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| compresseur-interactif | 13 | 2966 | 3 | 0 | 0 | 14 | 1169 | 14 | 2 | Oui | Non | prototype | 0 |
| condenseur-interactif | 25 | 4153 | 7 | 0 | 0 | 28 | 2174 | 28 | 3 | Oui | Non | — | 0 |
| cours-classes-securite | 11 | 1101 | 2 | 0 | 0 | 0 | 0 | 0 | 16 | Oui | Non | — | 0 |
| degivrage-electrique | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| degivrage-gaz-chauds | 0 | 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| degivrage-inversion-cycle | 0 | 24 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| degivrage-naturel | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| detendeur-interactif | 14 | 4593 | 6 | 0 | 0 | 14 | 1171 | 14 | 7 | Oui | Non | prototype | 0 |
| diagnostic-circuit-huile | 5 | 1191 | 1 | 0 | 4 | 5 | 443 | 5 | 0 | Oui | Non | — | 0 |
| diagnostic-circuit-huile-conclure | 4 | 999 | 1 | 0 | 4 | 4 | 352 | 4 | 0 | Oui | Non | — | 0 |
| diagramme-enthalpique | 50 | 1388 | 29 | 0 | 0 | 0 | 0 | 0 | 56 | Non | Non | brouillon | 2 |
| electrovanne-interactive | 14 | 4030 | 7 | 0 | 0 | 14 | 1097 | 14 | 18 | Oui | Non | prototype | 0 |
| elements-circuit-huile | 4 | 1206 | 1 | 0 | 3 | 4 | 410 | 4 | 0 | Oui | Non | — | 0 |
| elements-circuit-huile-regler | 4 | 1251 | 1 | 0 | 4 | 4 | 410 | 4 | 0 | Oui | Non | — | 0 |
| etancheite-interactive | 27 | 1635 | 26 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| evaporateur-interactif | 27 | 6265 | 12 | 0 | 0 | 27 | 1859 | 27 | 3 | Oui | Non | — | 0 |
| fil-conducteur-intervention | 0 | 139 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | brouillon | 0 |
| film-effet-de-serre | 0 | 7148 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | Oui | Non | — | 0 |
| film-ozone | 0 | 6886 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | Oui | Non | — | 0 |
| filtre-deshydrateur-pedagogique | 15 | 2624 | 26 | 0 | 0 | 0 | 0 | 0 | 13 | Oui | Non | — | 0 |
| frise-vivante | 10 | 771 | 3 | 0 | 0 | 10 | 381 | 0 | 11 | Oui | Non | — | 0 |
| froid-clim-academie | 5 | 579 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | Oui | Non | — | 0 |
| glissement-temperature | 13 | 3810 | 3 | 0 | 0 | 0 | 0 | 0 | 3 | Oui | Non | brouillon | 0 |
| hydrocarbures-a1-a2 | 28 | 7788 | 57 | 0 | 0 | 28 | 1962 | 28 | 17 | Oui | Non | — | 0 |
| intervention-hydrocarbures-interactive | 27 | 3260 | 11 | 0 | 0 | 27 | 1727 | 27 | 0 | Oui | Non | — | 0 |
| mission-bouteilles | 4 | 1640 | 1 | 0 | 6 | 0 | 0 | 0 | 12 | Oui | Non | ??? | 0 |
| module-compresseur | 6 | 3935 | 27 | 0 | 0 | 0 | 0 | 0 | 23 | Non | Non | à compléter, prototype | 0 |
| nomenclature-interactive | 4 | 6189 | 1 | 0 | 12 | 0 | 0 | 0 | 18 | Oui | Non | — | 0 |
| parcours-manometres | 27 | 3607 | 20 | 0 | 10 | 0 | 0 | 0 | 1 | Oui | Non | prototype, brouillon | 1 |
| pose-manifold-2-voies-interactive | 8 | 14580 | 5 | 0 | 19 | 0 | 0 | 0 | 11 | Oui | Non | à compléter, brouillon | 0 |
| pose-manifold-interactive | 6 | 2875 | 3 | 0 | 0 | 0 | 0 | 0 | 6 | Oui | Non | brouillon | 0 |
| pression-temperature-interactive | 4 | 4262 | 1 | 0 | 10 | 0 | 0 | 0 | 12 | Oui | Non | — | 0 |
| pressostat-bp-kp1 | 26 | 62 | 15 | 0 | 0 | 16 | 1223 | 16 | 7 | Oui | Non | — | 0 |
| pressostat-combine-kp15 | 26 | 66 | 2 | 0 | 0 | 16 | 1171 | 16 | 7 | Oui | Non | — | 0 |
| pressostat-differentiel-huile-pedagogique | 5 | 1490 | 2 | 0 | 4 | 5 | 431 | 5 | 5 | Oui | Non | — | 0 |
| pressostat-hp-kp5 | 26 | 62 | 15 | 0 | 0 | 16 | 1229 | 16 | 7 | Oui | Non | — | 0 |
| pressostat-huile-securite | 5 | 1266 | 1 | 0 | 4 | 5 | 447 | 5 | 0 | Oui | Non | — | 0 |
| protection-minimum-serie | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| pump-down-ameliore | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| pump-down-automatique | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| pump-down-unique | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| pupitre-reglage-interactif | 9 | 2515 | 3 | 0 | 0 | 9 | 628 | 9 | 2 | Oui | Non | prototype | 0 |
| recuperation-fluide-interactive | 8 | 6502 | 6 | 0 | 0 | 8 | 643 | 8 | 12 | Oui | Non | brouillon | 0 |
| regulateur-electronique-interactif | 24 | 10383 | 2 | 0 | 0 | 24 | 1826 | 24 | 2 | Oui | Non | brouillon | 0 |
| regulateur-huile-mecanique-pedagogique | 8 | 1753 | 1 | 0 | 7 | 8 | 734 | 8 | 0 | Oui | Non | — | 0 |
| regulateur-kvl-pedagogique | 0 | 92 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Non | Non | — | 0 |
| regulateur-kvr-nrd | 9 | 7705 | 0 | 0 | 0 | 0 | 0 | 0 | 12 | Oui | Non | — | 0 |
| regulateurs-kv-pedagogiques | 8 | 5698 | 1 | 0 | 0 | 0 | 0 | 0 | 13 | Oui | Non | prototype | 0 |
| regules-interactif | 0 | 19 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Non | Non | — | 0 |
| reservoir-huile-pedagogique | 8 | 1813 | 1 | 0 | 7 | 8 | 704 | 8 | 0 | Oui | Non | — | 0 |
| retour-huile-naturel | 5 | 1492 | 1 | 0 | 4 | 5 | 521 | 5 | 0 | Oui | Non | — | 0 |
| retour-huile-verifier | 5 | 2728 | 2 | 0 | 6 | 5 | 526 | 5 | 9 | Oui | Non | — | 0 |
| sans-degivrage-commande | 0 | 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| separateur-eclatement-pedagogique | 5 | 2941 | 1 | 0 | 5 | 5 | 617 | 5 | 8 | Oui | Non | — | 0 |
| separateur-huile-pedagogique | 8 | 1936 | 1 | 0 | 7 | 8 | 786 | 8 | 0 | Oui | Non | — | 0 |
| surchauffe-sous-refroidissement-interactif | 13 | 2927 | 1 | 0 | 10 | 0 | 0 | 0 | 0 | Oui | Non | prototype | 0 |
| technologie-huiles-choix-controle | 6 | 2116 | 1 | 0 | 4 | 6 | 748 | 6 | 0 | Oui | Non | — | 0 |
| technologie-huiles-frigorifiques | 6 | 1857 | 1 | 0 | 4 | 6 | 615 | 6 | 0 | Oui | Non | — | 0 |
| tome-3-technologie-organes | 112 | 17546 | 26 | 0 | 0 | 113 | 10570 | 113 | 14 | Oui | Non | à compléter | 0 |
| traxoil-installer | 5 | 1205 | 1 | 0 | 4 | 5 | 440 | 5 | 0 | Oui | Non | — | 0 |
| traxoil-pedagogique | 4 | 987 | 1 | 0 | 3 | 4 | 388 | 4 | 0 | Oui | Non | — | 0 |
| vanne-service-interactive | 4 | 3021 | 2 | 0 | 0 | 0 | 0 | 0 | 9 | Oui | Non | — | 0 |
| voyant-liquide-pedagogique | 18 | 3970 | 8 | 0 | 0 | 14 | 1106 | 14 | 10 | Oui | Non | — | 0 |

### Législation (29 stations)

| Station | Écrans | Mots | Images | Images absentes | Questions | Narrations | Mots narrés | MP3 | Animation | Moteur voix | Charte commune | Marqueurs | Liens cassés |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| aptitude-capacite | 13 | 1381 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| dechets-dangereux | 13 | 1088 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| dechets-rep-batiment | 13 | 1095 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| dechets-responsabilites | 13 | 1139 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| dechets-sept-flux | 13 | 1108 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| dechets-valoriser | 13 | 929 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| desp-categories | 13 | 1411 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| desp-en-service | 13 | 1127 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| desp-la-directive | 13 | 1317 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| desp-marquage-papiers | 13 | 1151 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| desp-soupapes-securites | 13 | 1157 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| fgaz-3 | 13 | 1267 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| impact-acv-carbone | 13 | 932 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| impact-ecoconception | 13 | 1186 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| impact-montreal-kigali | 13 | 1215 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| impact-prp-odp | 13 | 1240 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| impact-tewi | 13 | 1321 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| risques-atex | 13 | 953 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| risques-chimique | 13 | 909 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| risques-duerp | 13 | 937 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| risques-epi | 13 | 1036 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| risques-hauteur | 13 | 850 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| risques-neuf-principes | 13 | 1175 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| thermique-cee | 13 | 990 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| thermique-confort-ete | 13 | 1081 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| thermique-dpe | 13 | 1006 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| thermique-existant | 13 | 1009 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| thermique-pourquoi-une-rt | 13 | 1109 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |
| thermique-re2020 | 13 | 1088 | 25 | 0 | 4 | 0 | 0 | 0 | 5 | Oui | Non | — | 0 |

### HydroMétro (22 stations)

| Station | Écrans | Mots | Images | Images absentes | Questions | Narrations | Mots narrés | MP3 | Animation | Moteur voix | Charte commune | Marqueurs | Liens cassés |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| bitube | 5 | 2702 | 2 | 0 | 4 | 5 | 479 | 5 | 3 | Oui | Non | — | 0 |
| boucle | 8 | 2768 | 3 | 0 | 3 | 8 | 734 | 8 | 5 | Oui | Non | à compléter | 0 |
| circulateur | 5 | 2649 | 1 | 0 | 4 | 5 | 487 | 5 | 1 | Oui | Non | — | 0 |
| debit | 0 | 566 | 2 | 0 | 3 | 0 | 0 | 0 | 0 | Oui | Non | brouillon | 0 |
| decouplage | 5 | 2735 | 2 | 0 | 4 | 5 | 462 | 5 | 1 | Oui | Non | — | 0 |
| delta-t | 0 | 592 | 2 | 0 | 3 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| diagnostic | 5 | 2505 | 2 | 0 | 4 | 5 | 434 | 5 | 1 | Oui | Non | — | 0 |
| echangeur | 5 | 2549 | 1 | 0 | 4 | 5 | 479 | 5 | 1 | Oui | Non | — | 0 |
| energie | 0 | 513 | 2 | 0 | 3 | 0 | 0 | 0 | 0 | Oui | Non | brouillon | 0 |
| equilibrage | 5 | 2584 | 2 | 0 | 4 | 5 | 461 | 5 | 1 | Oui | Non | — | 0 |
| mesurer | 0 | 529 | 3 | 0 | 3 | 0 | 0 | 0 | 0 | Oui | Non | à compléter | 0 |
| mission | 5 | 2630 | 4 | 0 | 4 | 5 | 435 | 5 | 1 | Oui | Non | — | 0 |
| monotube | 5 | 2777 | 3 | 0 | 4 | 5 | 476 | 5 | 3 | Oui | Non | — | 0 |
| pertes | 5 | 2556 | 2 | 0 | 4 | 5 | 461 | 5 | 1 | Oui | Non | — | 0 |
| plancher | 5 | 2587 | 1 | 0 | 4 | 5 | 447 | 5 | 1 | Oui | Non | — | 0 |
| production | 5 | 2609 | 0 | 0 | 4 | 5 | 466 | 5 | 1 | Oui | Non | — | 0 |
| puissance | 0 | 556 | 2 | 0 | 3 | 0 | 0 | 0 | 0 | Oui | Non | brouillon | 0 |
| releves | 5 | 2496 | 0 | 0 | 4 | 5 | 444 | 5 | 1 | Oui | Non | à écrire | 0 |
| securite | 5 | 2592 | 4 | 0 | 4 | 5 | 471 | 5 | 1 | Oui | Non | — | 0 |
| tampon | 5 | 2698 | 4 | 0 | 4 | 5 | 450 | 5 | 1 | Oui | Non | — | 0 |
| v3v | 5 | 2529 | 3 | 0 | 4 | 5 | 459 | 5 | 1 | Oui | Non | — | 0 |
| vase | 5 | 2593 | 1 | 0 | 4 | 5 | 470 | 5 | 1 | Oui | Non | — | 0 |

### AéroRézo (36 stations)

| Station | Écrans | Mots | Images | Images absentes | Questions | Narrations | Mots narrés | MP3 | Animation | Moteur voix | Charte commune | Marqueurs | Liens cassés |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| air-circule | 4 | 787 | 0 | 0 | 1 | 4 | 395 | 4 | 0 | Oui | Non | — | 0 |
| air-neuf-selection | 4 | 897 | 0 | 0 | 1 | 4 | 446 | 4 | 0 | Oui | Non | — | 0 |
| apport-latent | 4 | 912 | 0 | 0 | 1 | 4 | 452 | 4 | 0 | Oui | Non | — | 0 |
| apport-sensible | 4 | 871 | 0 | 0 | 1 | 4 | 456 | 4 | 0 | Oui | Non | — | 0 |
| architecture-cta | 4 | 932 | 0 | 0 | 1 | 4 | 463 | 4 | 0 | Oui | Non | — | 0 |
| batteries | 4 | 1018 | 0 | 0 | 1 | 4 | 483 | 4 | 0 | Oui | Non | — | 0 |
| besoin-air | 4 | 806 | 0 | 0 | 1 | 4 | 401 | 4 | 0 | Oui | Non | — | 0 |
| conduits | 4 | 822 | 0 | 0 | 1 | 4 | 440 | 4 | 0 | Oui | Non | — | 0 |
| debit-vitesse | 4 | 688 | 0 | 0 | 1 | 4 | 417 | 4 | 0 | Oui | Non | — | 0 |
| diagnostic | 4 | 846 | 0 | 0 | 1 | 4 | 432 | 4 | 0 | Oui | Non | — | 0 |
| dimensionner-vmc | 4 | 923 | 0 | 0 | 1 | 4 | 403 | 4 | 0 | Oui | Non | — | 0 |
| double-flux | 4 | 852 | 0 | 0 | 1 | 4 | 388 | 4 | 0 | Oui | Non | — | 0 |
| evaluation-a | 0 | 70 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| evaluation-c | 0 | 70 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| evaluation-d | 0 | 66 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| evaluation-m | 0 | 70 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| evaluation-t | 0 | 66 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| evaluation-v | 0 | 66 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | Oui | Non | — | 0 |
| humidifier-reguler | 4 | 1004 | 0 | 0 | 1 | 4 | 475 | 4 | 0 | Oui | Non | — | 0 |
| hygrometrie | 4 | 861 | 0 | 0 | 1 | 4 | 392 | 4 | 0 | Oui | Non | — | 0 |
| hygroreglable | 4 | 825 | 0 | 0 | 1 | 4 | 363 | 4 | 0 | Oui | Non | — | 0 |
| instruments | 4 | 824 | 0 | 0 | 1 | 4 | 409 | 4 | 0 | Oui | Non | — | 0 |
| internes-solaires | 4 | 954 | 0 | 0 | 1 | 4 | 464 | 4 | 0 | Oui | Non | — | 0 |
| melange-filtration | 4 | 942 | 0 | 0 | 1 | 4 | 475 | 4 | 0 | Oui | Non | — | 0 |
| mesure-debit | 4 | 874 | 0 | 0 | 1 | 4 | 426 | 4 | 0 | Oui | Non | — | 0 |
| mesure-humidite | 4 | 874 | 0 | 0 | 1 | 4 | 422 | 4 | 0 | Oui | Non | — | 0 |
| pertes-lineaires | 4 | 867 | 0 | 0 | 1 | 4 | 449 | 4 | 0 | Oui | Non | — | 0 |
| pertes-singulieres | 4 | 882 | 0 | 0 | 1 | 4 | 443 | 4 | 0 | Oui | Non | — | 0 |
| pressions | 4 | 846 | 0 | 0 | 1 | 4 | 409 | 4 | 0 | Oui | Non | — | 0 |
| pressions-reseau | 4 | 896 | 0 | 0 | 1 | 4 | 434 | 4 | 0 | Oui | Non | — | 0 |
| recuperation | 4 | 834 | 0 | 0 | 1 | 4 | 371 | 4 | 0 | Oui | Non | — | 0 |
| rosee-psychro | 4 | 995 | 0 | 0 | 1 | 4 | 470 | 4 | 0 | Oui | Non | — | 0 |
| sections | 4 | 877 | 0 | 0 | 1 | 4 | 444 | 4 | 0 | Oui | Non | — | 0 |
| simple-flux | 4 | 894 | 0 | 0 | 1 | 4 | 445 | 4 | 0 | Oui | Non | — | 0 |
| transmission | 4 | 953 | 0 | 0 | 1 | 4 | 453 | 4 | 0 | Oui | Non | — | 0 |
| ventilateur-equilibrage | 4 | 884 | 0 | 0 | 1 | 4 | 457 | 4 | 0 | Oui | Non | — | 0 |

### ÉlectroRézo (59 stations)

| Station | Écrans | Mots | Images | Images absentes | Questions | Narrations | Mots narrés | MP3 | Animation | Moteur voix | Charte commune | Marqueurs | Liens cassés |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1-1-courant-intensite | 4 | 1089 | 3 | 0 | 4 | 4 | 746 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-2-tension | 4 | 1059 | 2 | 0 | 4 | 4 | 706 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-3-resistance-loi-ohm | 4 | 1006 | 2 | 0 | 4 | 4 | 777 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-4-puissance-energie | 4 | 985 | 2 | 0 | 4 | 4 | 683 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-5-continu-alternatif | 4 | 1058 | 1 | 0 | 4 | 4 | 704 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-6-frequence | 4 | 984 | 2 | 0 | 4 | 4 | 696 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-7-plaque-signaletique | 4 | 1079 | 3 | 0 | 4 | 4 | 744 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-8-trois-defauts | 4 | 976 | 2 | 0 | 4 | 4 | 708 | 8 | 0 | Non | Non | brouillon | 0 |
| 1-9-mesurer | 4 | 1016 | 3 | 0 | 4 | 4 | 716 | 8 | 0 | Non | Non | brouillon | 0 |
| 2-1-phase-neutre-pe | 4 | 1103 | 2 | 0 | 4 | 4 | 746 | 8 | 0 | Non | Non | brouillon | 0 |
| 2-2-monophase | 4 | 971 | 2 | 0 | 4 | 4 | 685 | 8 | 0 | Non | Non | brouillon | 0 |
| 2-3-triphase | 4 | 1005 | 3 | 0 | 4 | 4 | 768 | 8 | 0 | Non | Non | brouillon | 0 |
| 2-4-tension-simple | 4 | 996 | 2 | 0 | 4 | 4 | 750 | 8 | 0 | Non | Non | brouillon | 0 |
| 2-5-tension-composee | 4 | 939 | 2 | 0 | 4 | 4 | 786 | 8 | 0 | Non | Non | brouillon | 0 |
| 2-6-champ-tournant | 4 | 964 | 2 | 0 | 4 | 4 | 790 | 8 | 0 | Non | Non | brouillon | 0 |
| 3-1-interrupteur | 4 | 1054 | 3 | 0 | 4 | 4 | 590 | 8 | 0 | Non | Non | brouillon | 0 |
| 3-2-sectionneur | 4 | 1070 | 4 | 0 | 4 | 4 | 564 | 8 | 0 | Non | Non | brouillon | 0 |
| 3-3-interrupteur-sectionneur | 4 | 1029 | 4 | 0 | 4 | 4 | 496 | 8 | 0 | Non | Non | brouillon | 0 |
| 3-4-porte-fusible | 4 | 1117 | 4 | 0 | 4 | 4 | 519 | 8 | 0 | Non | Non | brouillon | 0 |
| 3-5-sectionneur-porte-fusible | 4 | 1353 | 4 | 0 | 4 | 4 | 468 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-1-fusible-gg | 4 | 1060 | 5 | 0 | 4 | 4 | 518 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-2-fusible-am | 4 | 1073 | 5 | 0 | 4 | 4 | 464 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-3-disjoncteur-magneto-thermique | 4 | 1160 | 6 | 0 | 4 | 4 | 488 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-4-disjoncteur-moteur | 4 | 994 | 4 | 0 | 4 | 4 | 437 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-5-interrupteur-differentiel | 4 | 1036 | 4 | 0 | 4 | 4 | 493 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-6-disjoncteur-differentiel | 4 | 881 | 4 | 0 | 4 | 4 | 409 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-7-relais-thermique | 4 | 1000 | 4 | 0 | 4 | 4 | 435 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-8-terre | 4 | 1027 | 4 | 0 | 4 | 4 | 445 | 8 | 0 | Non | Non | brouillon | 0 |
| 4-9-cable-section | 4 | 960 | 4 | 0 | 4 | 4 | 499 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-1-contact-no-nf | 4 | 1174 | 5 | 0 | 4 | 4 | 468 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-2-contacteur | 4 | 1365 | 6 | 0 | 4 | 4 | 522 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-3-contact-auxiliaire | 4 | 1265 | 7 | 0 | 4 | 4 | 488 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-4-relais | 4 | 1192 | 6 | 0 | 4 | 4 | 447 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-5-relais-temporise | 4 | 1216 | 5 | 0 | 4 | 4 | 503 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-6-contacts-temporises | 4 | 1147 | 7 | 0 | 4 | 4 | 502 | 8 | 0 | Non | Non | à écrire, brouillon | 0 |
| 5-7-boutons | 4 | 1246 | 7 | 0 | 4 | 4 | 567 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-8-securite-signalisation | 4 | 1307 | 7 | 0 | 4 | 4 | 607 | 8 | 0 | Non | Non | brouillon | 0 |
| 5-9-lire-un-schema | 4 | 1252 | 6 | 0 | 4 | 4 | 550 | 8 | 0 | Non | Non | brouillon | 0 |
| 6-1-bobine-electro-aimant | 4 | 1220 | 4 | 0 | 4 | 4 | 556 | 8 | 0 | Non | Non | brouillon | 0 |
| 6-2-transformateur | 4 | 1132 | 5 | 0 | 4 | 4 | 653 | 8 | 0 | Non | Non | brouillon | 0 |
| 6-3-moteur-asynchrone | 4 | 1099 | 5 | 0 | 4 | 4 | 680 | 8 | 0 | Non | Non | brouillon | 0 |
| 6-4-couplage | 5 | 1931 | 4 | 0 | 5 | 5 | 753 | 8 | 0 | Non | Non | brouillon | 0 |
| 6-5-moteur-monophase | 4 | 1133 | 4 | 0 | 4 | 4 | 580 | 8 | 0 | Non | Non | brouillon | 0 |
| 6-6-synchrone-et-continu | 4 | 1188 | 5 | 0 | 4 | 4 | 592 | 8 | 0 | Non | Non | brouillon | 0 |
| 7-1-varier-la-tension | 4 | 967 | 1 | 0 | 4 | 4 | 656 | 8 | 0 | Non | Non | brouillon | 0 |
| 7-2-variateur-tension | 4 | 1065 | 3 | 0 | 4 | 4 | 523 | 8 | 0 | Non | Non | brouillon | 0 |
| 7-3-varier-la-frequence | 4 | 988 | 1 | 0 | 4 | 4 | 738 | 8 | 0 | Non | Non | brouillon | 0 |
| 7-4-variateur-frequence | 4 | 1207 | 5 | 0 | 4 | 4 | 691 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-1-trait-et-point | 4 | 891 | 3 | 0 | 4 | 4 | 460 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-10-dechiffrer | 4 | 1113 | 2 | 0 | 4 | 4 | 388 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-11-jeu-des-symboles | 4 | 1103 | 38 | 0 | 4 | 4 | 501 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-2-contact | 4 | 781 | 2 | 0 | 4 | 4 | 421 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-3-barre-sectionnement | 4 | 696 | 1 | 0 | 4 | 4 | 334 | 8 | 0 | Non | Non | à écrire, brouillon | 0 |
| 8-4-rectangle | 4 | 718 | 1 | 0 | 4 | 4 | 347 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-5-declencheur-thermique | 4 | 712 | 1 | 0 | 4 | 4 | 576 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-6-declencheur-magnetique | 4 | 690 | 2 | 0 | 4 | 4 | 367 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-7-pointille | 4 | 697 | 2 | 0 | 4 | 4 | 347 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-8-bobine-et-rond | 4 | 680 | 1 | 0 | 4 | 4 | 370 | 8 | 0 | Non | Non | brouillon | 0 |
| 8-9-reperes | 4 | 681 | 1 | 0 | 4 | 4 | 423 | 8 | 0 | Non | Non | brouillon | 0 |

## 2. Statistiques par réseau

| Réseau | Stations | Mots min/médiane/max | Écrans min/médiane/max | Narrations min/médiane/max | Sans narration | Sans question | Sans image | Sans moteur voix commun |
|---|---|---|---|---|---|---|---|---|
| Plan thermo-techno | 97 | 19 / 1753 / 19466 | 0 / 6 / 112 | 0 / 0 / 113 | 59 | 45 | 22 | 4 |
| Législation | 29 | 850 / 1108 / 1411 | 13 / 13 / 13 | 0 / 0 / 0 | 29 | 0 | 0 | 0 |
| HydroMétro | 22 | 513 / 2586 / 2777 | 0 / 5 / 8 | 0 / 5 / 8 | 5 | 0 | 2 | 0 |
| AéroRézo | 36 | 66 / 869 / 1018 | 0 / 4 / 4 | 0 / 4 / 4 | 6 | 0 | 36 | 0 |
| ÉlectroRézo | 59 | 680 / 1058 / 1931 | 4 / 4 / 5 | 4 / 4 / 5 | 0 | 0 | 0 | 59 |

_Note méthode : le calcul du ratio « minceur » (section 3) utilise la médiane des MOTS de cette table, propre à chaque réseau — comparer un réseau à un autre n'a pas de sens, chaque réseau a son propre gabarit._

## 3. Classements — site entier

### 20 stations les plus MINCES (ratio mots / médiane de leur réseau)

_Interprétation retenue : ratio = mots de la station ÷ médiane des mots de son réseau. Plus le ratio est proche de 0, plus la station est mince par rapport aux autres de son propre réseau. Une station « page-relais » vers un moteur partagé (colonne dédiée, réseau Plan thermo-techno) est signalée : sa mesure locale ne reflète pas un manque de contenu, le contenu vit dans le moteur commun exclu du périmètre.

| # | Réseau | Station | Mots | Médiane réseau | Ratio | Page-relais |
|---|---|---|---|---|---|---|
| 1 | Plan thermo-techno | regules-interactif | 19 | 1753 | 0.01 | Oui |
| 2 | Plan thermo-techno | commande-directe-thermostat | 21 | 1753 | 0.01 | Oui |
| 3 | Plan thermo-techno | degivrage-electrique | 21 | 1753 | 0.01 | Oui |
| 4 | Plan thermo-techno | degivrage-naturel | 21 | 1753 | 0.01 | Oui |
| 5 | Plan thermo-techno | protection-minimum-serie | 21 | 1753 | 0.01 | Oui |
| 6 | Plan thermo-techno | pump-down-ameliore | 21 | 1753 | 0.01 | Oui |
| 7 | Plan thermo-techno | pump-down-automatique | 21 | 1753 | 0.01 | Oui |
| 8 | Plan thermo-techno | pump-down-unique | 21 | 1753 | 0.01 | Oui |
| 9 | Plan thermo-techno | sans-degivrage-commande | 21 | 1753 | 0.01 | Oui |
| 10 | Plan thermo-techno | degivrage-gaz-chauds | 23 | 1753 | 0.01 | Oui |
| 11 | Plan thermo-techno | degivrage-inversion-cycle | 24 | 1753 | 0.01 | Oui |
| 12 | Plan thermo-techno | pressostat-bp-kp1 | 62 | 1753 | 0.04 |  |
| 13 | Plan thermo-techno | pressostat-hp-kp5 | 62 | 1753 | 0.04 |  |
| 14 | Plan thermo-techno | pressostat-combine-kp15 | 66 | 1753 | 0.04 |  |
| 15 | Plan thermo-techno | regulateur-kvl-pedagogique | 92 | 1753 | 0.05 |  |
| 16 | AéroRézo | evaluation-d | 66 | 869 | 0.08 |  |
| 17 | AéroRézo | evaluation-t | 66 | 869 | 0.08 |  |
| 18 | AéroRézo | evaluation-v | 66 | 869 | 0.08 |  |
| 19 | Plan thermo-techno | fil-conducteur-intervention | 139 | 1753 | 0.08 |  |
| 20 | AéroRézo | evaluation-a | 70 | 869 | 0.08 |  |

### 10 stations les plus LOURDES (octets totaux)

_Interprétation retenue : « lourd » = poids en octets (mesure 1 de la méthode), pour compléter — sans redoubler — le classement par mots ci-dessus._

| # | Réseau | Station | Octets | Mots |
|---|---|---|---|---|
| 1 | Plan thermo-techno | regulateurs-kv-pedagogiques | 1 164 606 | 5698 |
| 2 | Plan thermo-techno | diagramme-enthalpique | 743 085 | 1388 |
| 3 | Plan thermo-techno | pressostat-bp-kp1 | 440 939 | 62 |
| 4 | Plan thermo-techno | pressostat-hp-kp5 | 439 093 | 62 |
| 5 | Plan thermo-techno | pressostat-combine-kp15 | 418 497 | 66 |
| 6 | Plan thermo-techno | regulateur-kvr-nrd | 355 008 | 7705 |
| 7 | Plan thermo-techno | module-compresseur | 331 563 | 3935 |
| 8 | Plan thermo-techno | co2-r744 | 327 670 | 19466 |
| 9 | Plan thermo-techno | pose-manifold-2-voies-interactive | 326 425 | 14580 |
| 10 | Plan thermo-techno | film-effet-de-serre | 306 176 | 7148 |

### Stations avec marqueurs de chantier (83)

| Réseau | Station | Marqueurs |
|---|---|---|
| Plan thermo-techno | circuit-huile-interactif | prototype, brouillon |
| Plan thermo-techno | compresseur-interactif | prototype |
| Plan thermo-techno | detendeur-interactif | prototype |
| Plan thermo-techno | diagramme-enthalpique | brouillon |
| Plan thermo-techno | electrovanne-interactive | prototype |
| Plan thermo-techno | fil-conducteur-intervention | brouillon |
| Plan thermo-techno | glissement-temperature | brouillon |
| Plan thermo-techno | mission-bouteilles | ??? |
| Plan thermo-techno | module-compresseur | à compléter, prototype |
| Plan thermo-techno | parcours-manometres | prototype, brouillon |
| Plan thermo-techno | pose-manifold-2-voies-interactive | à compléter, brouillon |
| Plan thermo-techno | pose-manifold-interactive | brouillon |
| Plan thermo-techno | pupitre-reglage-interactif | prototype |
| Plan thermo-techno | recuperation-fluide-interactive | brouillon |
| Plan thermo-techno | regulateur-electronique-interactif | brouillon |
| Plan thermo-techno | regulateurs-kv-pedagogiques | prototype |
| Plan thermo-techno | surchauffe-sous-refroidissement-interactif | prototype |
| Plan thermo-techno | tome-3-technologie-organes | à compléter |
| HydroMétro | boucle | à compléter |
| HydroMétro | debit | brouillon |
| HydroMétro | energie | brouillon |
| HydroMétro | mesurer | à compléter |
| HydroMétro | puissance | brouillon |
| HydroMétro | releves | à écrire |
| ÉlectroRézo | 1-1-courant-intensite | brouillon |
| ÉlectroRézo | 1-2-tension | brouillon |
| ÉlectroRézo | 1-3-resistance-loi-ohm | brouillon |
| ÉlectroRézo | 1-4-puissance-energie | brouillon |
| ÉlectroRézo | 1-5-continu-alternatif | brouillon |
| ÉlectroRézo | 1-6-frequence | brouillon |
| ÉlectroRézo | 1-7-plaque-signaletique | brouillon |
| ÉlectroRézo | 1-8-trois-defauts | brouillon |
| ÉlectroRézo | 1-9-mesurer | brouillon |
| ÉlectroRézo | 2-1-phase-neutre-pe | brouillon |
| ÉlectroRézo | 2-2-monophase | brouillon |
| ÉlectroRézo | 2-3-triphase | brouillon |
| ÉlectroRézo | 2-4-tension-simple | brouillon |
| ÉlectroRézo | 2-5-tension-composee | brouillon |
| ÉlectroRézo | 2-6-champ-tournant | brouillon |
| ÉlectroRézo | 3-1-interrupteur | brouillon |
| ÉlectroRézo | 3-2-sectionneur | brouillon |
| ÉlectroRézo | 3-3-interrupteur-sectionneur | brouillon |
| ÉlectroRézo | 3-4-porte-fusible | brouillon |
| ÉlectroRézo | 3-5-sectionneur-porte-fusible | brouillon |
| ÉlectroRézo | 4-1-fusible-gg | brouillon |
| ÉlectroRézo | 4-2-fusible-am | brouillon |
| ÉlectroRézo | 4-3-disjoncteur-magneto-thermique | brouillon |
| ÉlectroRézo | 4-4-disjoncteur-moteur | brouillon |
| ÉlectroRézo | 4-5-interrupteur-differentiel | brouillon |
| ÉlectroRézo | 4-6-disjoncteur-differentiel | brouillon |
| ÉlectroRézo | 4-7-relais-thermique | brouillon |
| ÉlectroRézo | 4-8-terre | brouillon |
| ÉlectroRézo | 4-9-cable-section | brouillon |
| ÉlectroRézo | 5-1-contact-no-nf | brouillon |
| ÉlectroRézo | 5-2-contacteur | brouillon |
| ÉlectroRézo | 5-3-contact-auxiliaire | brouillon |
| ÉlectroRézo | 5-4-relais | brouillon |
| ÉlectroRézo | 5-5-relais-temporise | brouillon |
| ÉlectroRézo | 5-6-contacts-temporises | à écrire, brouillon |
| ÉlectroRézo | 5-7-boutons | brouillon |
| ÉlectroRézo | 5-8-securite-signalisation | brouillon |
| ÉlectroRézo | 5-9-lire-un-schema | brouillon |
| ÉlectroRézo | 6-1-bobine-electro-aimant | brouillon |
| ÉlectroRézo | 6-2-transformateur | brouillon |
| ÉlectroRézo | 6-3-moteur-asynchrone | brouillon |
| ÉlectroRézo | 6-4-couplage | brouillon |
| ÉlectroRézo | 6-5-moteur-monophase | brouillon |
| ÉlectroRézo | 6-6-synchrone-et-continu | brouillon |
| ÉlectroRézo | 7-1-varier-la-tension | brouillon |
| ÉlectroRézo | 7-2-variateur-tension | brouillon |
| ÉlectroRézo | 7-3-varier-la-frequence | brouillon |
| ÉlectroRézo | 7-4-variateur-frequence | brouillon |
| ÉlectroRézo | 8-1-trait-et-point | brouillon |
| ÉlectroRézo | 8-10-dechiffrer | brouillon |
| ÉlectroRézo | 8-11-jeu-des-symboles | brouillon |
| ÉlectroRézo | 8-2-contact | brouillon |
| ÉlectroRézo | 8-3-barre-sectionnement | à écrire, brouillon |
| ÉlectroRézo | 8-4-rectangle | brouillon |
| ÉlectroRézo | 8-5-declencheur-thermique | brouillon |
| ÉlectroRézo | 8-6-declencheur-magnetique | brouillon |
| ÉlectroRézo | 8-7-pointille | brouillon |
| ÉlectroRézo | 8-8-bobine-et-rond | brouillon |
| ÉlectroRézo | 8-9-reperes | brouillon |

### Stations avec images absentes (0)

_Aucune station._

### Stations avec liens internes cassés (2)

| Réseau | Station | Liens cassés |
|---|---|---|
| Plan thermo-techno | diagramme-enthalpique | 2 |
| Plan thermo-techno | parcours-manometres | 1 |

### Stations avec liens absolus https://inerweb.fr (36)

| Réseau | Station | Occurrences |
|---|---|---|
| Plan thermo-techno | chaleur-circuit-interactif | 2 |
| Plan thermo-techno | chaleur-interactive | 2 |
| Plan thermo-techno | circuit-organe-par-organe | 2 |
| Plan thermo-techno | diagramme-enthalpique | 4 |
| Plan thermo-techno | pression-temperature-interactive | 2 |
| Plan thermo-techno | pressostat-combine-kp15 | 2 |
| Plan thermo-techno | surchauffe-sous-refroidissement-interactif | 2 |
| Législation | aptitude-capacite | 3 |
| Législation | dechets-dangereux | 3 |
| Législation | dechets-rep-batiment | 3 |
| Législation | dechets-responsabilites | 3 |
| Législation | dechets-sept-flux | 3 |
| Législation | dechets-valoriser | 3 |
| Législation | desp-categories | 3 |
| Législation | desp-en-service | 3 |
| Législation | desp-la-directive | 3 |
| Législation | desp-marquage-papiers | 3 |
| Législation | desp-soupapes-securites | 3 |
| Législation | fgaz-3 | 3 |
| Législation | impact-acv-carbone | 3 |
| Législation | impact-ecoconception | 3 |
| Législation | impact-montreal-kigali | 3 |
| Législation | impact-prp-odp | 3 |
| Législation | impact-tewi | 3 |
| Législation | risques-atex | 3 |
| Législation | risques-chimique | 3 |
| Législation | risques-duerp | 3 |
| Législation | risques-epi | 3 |
| Législation | risques-hauteur | 3 |
| Législation | risques-neuf-principes | 3 |
| Législation | thermique-cee | 3 |
| Législation | thermique-confort-ete | 3 |
| Législation | thermique-dpe | 3 |
| Législation | thermique-existant | 3 |
| Législation | thermique-pourquoi-une-rt | 3 |
| Législation | thermique-re2020 | 3 |

## 4. Homogénéité par réseau

**Plan thermo-techno.** C'est le réseau le plus ancien des cinq, et le seul où trois gabarits distincts coexistent sans qu'aucun ne domine franchement. 43 modules sur 73 (59 %) n'ont pas de fichier `app.js` : ils portent leur logique sous un autre nom (`cours.js`, `nomenclature.js`, `moteur.js`...) ou ne la portent pas du tout — c'est le cas de 28 modules (29 % du total des 97 « stations » comptées, capsules incluses) qui sont en réalité de fines pages-relais chargeant un moteur partagé (`_regules-commun`, `_circuit-huile-commun`) : leur poids local (souvent 20 à 25 mots) ne signale aucune misère de contenu, le contenu vit dans le moteur exclu du périmètre d'audit par construction. Les 24 capsules forment un troisième gabarit à part (moteur `capsule.js`, vocabulaire `dire`/`texte`/`bonne`), sans `app.js` ni `referentiel.js`. Sur les 73 modules restants, 34 n'ont pas de `couverture.json` et 43 n'ont pas de `referentiel.js` : le badge « codes du référentiel couverts » n'est donc affiché que sur une minorité de modules. Une station, `frise-vivante`, s'ouvre par `frise-vivante.html` et non par `index.html` — seule exception à la convention de nommage du réseau. Deux défauts de fabrication ponctuels, sans lien avec le contenu pédagogique : un jeton de gabarit non remplacé (`__MARQUE_JS__` dans `diagramme-enthalpique/src/course-shell.html`) et une faute de frappe de chemin (`.../moteur/impression.css` dans `parcours-manometres/shared/impression.css`).

**Législation.** Le réseau le plus homogène des cinq : les 29 stations suivent exactement le même gabarit de fichiers (`index.html`, `app.js`, `styles.css`, `FOND.md`, `svg/`), la même mécanique d'écrans (`.slide` + `data-narration`) et le même moteur vocal — aucune déviation n'a été détectée sur aucune des 29. C'est aussi le seul réseau à ne fabriquer aucun MP3 : la voix vient entièrement de la synthèse vocale du navigateur (choix documenté dans `app.js`). Les 29 stations portent chacune 3 liens absolus vers `https://inerweb.fr` (favicon et URL canonique) — une pratique cohérente avec un souci de référencement, mais qui, comme le signale la méthode d'audit, empêche un usage strictement hors ligne de ces pages précises.

**HydroMétro.** Un réseau à deux gabarits plutôt qu'un : 16 stations sur 22 tiennent leur contenu dans `content.js` avec un champ `narration:` par écran (le gabarit historique, celui de `bitube`), tandis que 6 stations (`boucle`, `debit`, `delta-t`, `energie`, `mesurer`, `puissance`) utilisent un `shell.js` de structure différente. Ce second gabarit n'est pas plus pauvre — `boucle` porte 2 768 mots, plus que la médiane du réseau — mais il est invisible à l'heuristique « écrans/narrations » propre à ce réseau, d'où les 0 affichés dans la table pour ces 6 stations. 5 stations sur 22 n'ont pas de lien de retour vers le plan détecté dans leur HTML statique.

**AéroRézo.** Le réseau le plus « invisible » à une lecture statique des fichiers : 0 image, 0 lien de retour et 0 feuille de style propre ne sont détectés sur AUCUNE des 36 stations. Ce n'est pas une absence réelle : ce réseau construit ses schémas, sa navigation et sa mise en forme entièrement en JavaScript au chargement, via le moteur partagé `_commun/moteur.js` et le fichier `scenes.js` du réseau — rien de tout cela n'existe comme texte ou balise dans le fichier source lu à froid. Les 6 stations `evaluation-*` (contrôles de fin de ligne) ne portent aucune des 4 phases de narration `decouvrir/comprendre/manipuler/verifier` : leur gabarit est celui d'un contrôle noté, pas celui d'une leçon, et il ne faut pas lire ce « 0 » comme une leçon incomplète.

**ÉlectroRézo.** Le réseau le plus indépendant du moteur commun du site : aucune des 59 stations ne charge `moteur/voix.js` ni `moteur/marque.js` — chacune a son propre moteur (`_commun/station.js`, `_commun/reseau.js`, `_commun/schemas-*.js`) et sa propre cartouche de marque (`assets/marque.js`). C'est en contrepartie le seul réseau à parler avec de vrais enregistrements MP3 (une voix homme et une voix femme, quatre fichiers chacune) plutôt qu'avec la synthèse vocale du site — et le seul absent de l'index central `build/voix/corpus.json`, qui ne couvre pas ce mécanisme séparé. Fait notable et uniforme : les 59 stations affichent la même mention « brouillon » dans leur pied de page (`ÉlectroRézo · ligne 1 · brouillon — CC BY-NC-ND`) — un statut de chantier porté par le gabarit commun, donc par la totalité du réseau, non une exception isolée.

## 5. Dix constats

1. Législation est, de loin, le réseau le plus homogène : ses 29 stations suivent toutes le même gabarit de fichiers, sans aucune déviation détectée.
2. Plan thermo-techno est le plus hétérogène : trois gabarits y coexistent (modules classiques à `app.js`, pages-relais vers un moteur `_xxx-commun`, capsules).
3. 28 des 97 « stations » du Plan thermo-techno (29 %) sont de fines pages-relais vers un moteur partagé : leur petit nombre de mots ne signale pas un manque de contenu.
4. HydroMétro cache un second gabarit : 6 stations sur 22 utilisent un `shell.js` que l'heuristique « écrans/narrations » de ce réseau ne sait pas lire, malgré un texte réel de 500 à 2 800 mots.
5. AéroRézo est le seul réseau où 0 image, 0 lien de retour et 0 feuille de style propre sont détectés sur la totalité de ses 36 stations, parce que tout y est injecté par JavaScript au chargement.
6. ÉlectroRézo est le seul réseau à parler avec de vrais enregistrements MP3 (deux voix) et le seul à ne jamais charger le moteur de voix partagé du site.
7. Les 6 stations `evaluation-*` d'AéroRézo sont des contrôles sans aucune phase de narration : un gabarit de contrôle, pas une leçon incomplète.
8. Aucune image cassée et aucun lien absolu cassé n'ont été confirmés sur les 243 stations une fois retirées les fausses alertes dues aux conventions de préfixe propres à chaque moteur (bibliothèques partagées, sous-dossiers `assets/`, constantes JS de type `ASSET`).
9. Deux vraies anomalies de fabrication subsistent, toutes deux dans le Plan thermo-techno : un jeton non remplacé (`__MARQUE_JS__`) et une faute de frappe de chemin (`.../moteur/impression.css`).
10. Les marqueurs de chantier touchent 83 stations sur 243 (34 %) à des degrés très différents : « brouillon » est un statut de pied de page porté par la totalité du réseau ÉlectroRézo, alors que « à compléter », « ??? » ou « à écrire » ne touchent que de rares stations isolées, surtout dans le Plan thermo-techno.

