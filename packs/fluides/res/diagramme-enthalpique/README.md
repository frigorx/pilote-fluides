# Diagramme enthalpique modulaire — V7

Support inerWeb Édu de découverte et de révision des familles de courbes du diagramme log(p)-h. Cette version est un **brouillon pédagogique à valider**. Elle ne remplace pas la V6 d’origine et n’est pas publiée ni indexée dans le RAG.

## Démarrage

- Ouvrir `index.html` pour composer librement un parcours.
- Ouvrir `cours-habilitation.html` pour lancer directement les huit repères essentiels.
- Ouvrir `cours-toutes-courbes.html` pour étudier les dix familles.
- Ouvrir un fichier du dossier `modules-autonomes` pour ne distribuer qu’une seule notion.

Les pages et tous leurs contenus sont autonomes : double-clic possible, aucun CDN et aucune donnée transmise. Le bouton **Écouter** privilégie une voix française locale installée dans le navigateur ou dans Windows. Il ne démarre jamais seul et tout le texte lu reste visible. Si aucun moteur vocal français n’est disponible hors ligne, le texte affiché permet de suivre normalement le module sans voix.

## Découpage pédagogique

| N° | Module | Niveau | Fichier autonome |
|---:|---|---|---|
| 1 | Axes p-h | Essentiel | `01-axes.html` |
| 2 | Courbe de saturation | Essentiel | `02-saturation.html` |
| 3 | Courbes de bulle et de rosée | Essentiel | `03-bulle-rosee.html` |
| 4 | Zones liquide, mélange et vapeur | Essentiel | `04-zones.html` |
| 5 | Isotitres | Essentiel | `05-isotitres.html` |
| 6 | Isobares | Essentiel | `06-isobare.html` |
| 7 | Isothermes | Essentiel | `07-isotherme.html` |
| 8 | Isochores | Approfondissement | `08-isochore.html` |
| 9 | Isentropes | Approfondissement | `09-isentrope.html` |
| 10 | Isenthalpes | Essentiel | `10-isenthalpe.html` |

Chaque module suit la boucle : **je découvre → je comprends → je vérifie**. Le schéma est volontairement qualitatif : il sert à reconnaître les familles, pas à relever des valeurs thermodynamiques.

## Composer un sous-parcours

Le hub permet de cocher les notions voulues. Un lien peut aussi être préparé directement :

```text
cours-complet.html?modules=axes,saturation,isobare,isenthalpe&mode=apprentissage
cours-complet.html?modules=isobare,isotherme&mode=revision
```

`mode=revision` supprime les deux écrans explicatifs et va directement aux questions.

## Sources et maintenance

- Les contenus sont définis dans `src/modules.mjs`.
- Le schéma SVG manuel et le moteur de parcours sont dans `src/course.js`.
- Les fichiers HTML finaux sont régénérés avec `node build.mjs`.
- Les contrôles statiques sont lancés avec `node tests/qa.mjs`.
- Les choix de droits et de provenance sont consignés dans `SOURCES-IMAGES.md`.
- Les consignes de reprise sont dans `REPRISE.md`.

Ne pas corriger directement les pages générées : modifier les sources, reconstruire, puis relancer les contrôles.
