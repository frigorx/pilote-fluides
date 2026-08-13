# Licence et propriété intellectuelle

**© 2026 Franck Henninot — inerWeb Édu.** Dépôt public ne signifie pas libre de droits :
ce fichier dit précisément ce que chacun peut faire.

## 1. Le contenu pédagogique — CC BY-NC-SA 4.0

Les fiches de cours, questions d'entraînement (indices et remédiations compris), planches SVG,
exercices, séquences de projection et documents de relecture — c'est-à-dire l'essentiel de
`packs/fluides/` — sont placés sous licence
**Creative Commons Attribution - Pas d'utilisation commerciale - Partage dans les mêmes
conditions 4.0 International** (CC BY-NC-SA 4.0) :
https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr

En clair :
- **vous pouvez** utiliser, copier, adapter ce contenu pour votre enseignement, gratuitement ;
- **vous devez** citer l'auteur (Franck Henninot — inerWeb Édu) et repartager vos adaptations
  sous la même licence ;
- **vous ne pouvez pas** en faire un usage commercial — vendre une formation construite sur ce
  contenu exige un accord écrit préalable de l'auteur.

## 2. Le moteur et les scripts de construction

Le moteur générique (`moteur/`, issu de `frigorx/r408`) et les scripts de construction
(`build/`) sont sous **licence MIT** : réutilisation libre, y compris commerciale, à condition
de conserver la mention de copyright.

Exception explicite : `build/voix/generer-audios-piper.py`, qui utilise Piper, porte
`SPDX-License-Identifier: GPL-3.0-or-later`. Cette exception concerne l'outil de fabrication,
pas le lecteur web ni les autres scripts du dépôt.

## 3. Le référentiel officiel — hors licence

`packs/fluides/referentiel-2025.json` transcrit l'annexe II.B de l'arrêté du 21 novembre 2025
(Journal officiel de la République française). Un texte officiel n'est la propriété de
personne : ce fichier est librement réutilisable, et aucune des licences ci-dessus ne
prétend le couvrir.

## 4. Les narrations vocales

Les MP3 de `packs/fluides/res/voix/audio/` sont la mise en voix du contenu pédagogique : la
licence CC BY-NC-SA 4.0 de la section 1 continue donc de s'appliquer à ce contenu. Ils sont
fabriqués avec le modèle Piper `fr_FR-siwis-medium`, entraîné sur le corpus SIWIS sous licence
CC BY 4.0. L'attribution et les sources sont conservées dans
`packs/fluides/res/voix/README.md`. Le modèle et le logiciel Piper ne sont pas embarqués dans
le site publié.

## 5. Antériorité

L'historique git public de ce dépôt (`github.com/frigorx/pilote-fluides`) établit
l'antériorité de chaque contenu, commit par commit, horodatés et signés par la plateforme.

---

*Toute demande d'usage commercial ou question sur cette licence : ouvrir une issue sur le
dépôt, ou contacter l'auteur.*
