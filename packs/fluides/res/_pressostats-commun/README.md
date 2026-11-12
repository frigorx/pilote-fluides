# Socle commun des pages pressostats

Créé le 13/11/2026 pour remplacer les trois monolithes de 400 Ko (sources de fabrication perdues). Pas de build : des fichiers JavaScript et CSS chargés tels quels.

## Pages qui s'en servent

| Page | Modèle | Données |
|---|---|---|
| `pressostat-combine-kp15/` | `combine` | `page.js` |
| `pressostat-bp-kp1/` | `bp` | `page.js` |
| `pressostat-hp-kp5/` | `hp` | `page.js` |

## Fichiers

| Fichier | Rôle |
|---|---|
| `textes.js` | `window.PRESSOSTAT_TEXTES` : tous les libellés du moteur. Le moteur n'écrit aucun texte. |
| `dessins-base.js` | Palette, fabriques SVG, filigrane, registre. `PressostatDessins.creer(type, options)` rend `{ noeud, regler(etat), reperes }`. |
| `dessin-coupe.js` | Type `coupe` : la vue en coupe animée (BP, HP, combiné). Option `compact: true` : sans étiquette de pression ni d'état, pour le dessin réduit du téléphone. |
| `dessins-schemas.js` | Types `circuit`, `face`, `versions`, `bornes`, `plaque`, `famille`. Option `etroit: true` : mise en page en hauteur pour le téléphone (`bornes`, `versions`, `circuit`). |
| `dessins-huile.js` | Types `huile-circuit`, `huile-graissage`, `huile-chrono`, `huile-bornes`, `huile-appareil`, pour les deux pages du pressostat d'huile (socle `_circuit-huile-commun`, entrée `pressostatDessin` de son `engine.js`). |
| `moteur.js` | Construit le cours à partir de `window.PRESSOSTAT_PAGE` : écrans, outils, questions, voix, sources. |
| `styles.css` | Mise en page des trois pages. |
| `planche-coupe.html`, `planche-schemas.html`, `planche-huile.html` | Planches de contrôle : chaque dessin dans chacun de ses états. |
| `tests/parcours.cjs` | Parcourt une page (tous les écrans, tous les outils) et rend les erreurs de console et les débordements. |

## Dans chaque dossier de page

- `index.html` : les balises pour Google, la réponse écrite en haut de page, l'exemple chiffré, les limites, l'auteur et la date. Ces textes sont dans le HTML pour être lus sans exécuter de script.
- `page.js` : `window.PRESSOSTAT_PAGE`. Les valeurs de l'exemple (`valeurs`), les écrans (`ecrans`), les questions (`quiz`), les sources.
- `SOURCES-METIER.md` : d'où vient chaque valeur. Une valeur sans source ne s'écrit pas.

## Règles à tenir

1. Vocabulaire unique : enclenchement, coupure, différentiel, réarmement. Les mots anglais gravés sur la plaque sont donnés une fois, à l'écran qui montre l'appareil.
2. Une page suit une seule version de l'appareil jusqu'au bout. Les autres versions ont leur écran.
3. Aucun texte sur un tracé. Les étiquettes sont des pastilles numérotées ou des étiquettes sur fond clair, hors des traits.
4. La narration d'un écran est dans le champ `narration` d'un fichier `.js` : c'est là que `build/voix/collecter-narrations.mjs` la lit. Un seul caractère changé dans une narration lui fait perdre son enregistrement : `moteur/voix.js` passe alors à la voix du navigateur, sans erreur.
5. Ordre de chargement dans `index.html` : `textes.js`, `page.js`, `dessins-base.js`, `dessin-coupe.js`, `dessins-schemas.js`, `moteur.js`.
6. Contrôle avant livraison : `node tests/parcours.cjs <adresse>` puis `node C:/git/usine-contenu/outils/controle-telephone.cjs <adresse>`, et `python C:/git/usine-contenu/outils/controle-style.py` sur `page.js` et `index.html`.
