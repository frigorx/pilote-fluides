# Sources — station 4.11 « Le tableau d'un logement » (plan : N11)

Station fabriquée le 19/10/2026 (lot 1 « stations manquantes »). Statut : **en cours de relecture**,
non validée par F. Henninot. Aucun MP3, aucun son ajouté, aucun score.

## Ce qui existait, et qu'on renvoie plutôt que de recopier (aucun doublon)
- **Sous tension — TD2 « Le monde du tableau électrique »** : les fils unifilaires d'un tableau (rigide, souple). La 4.11 ne touche pas aux fils : elle LIT les protections et les circuits. Lien.
- **Législation — « NF C 15-100 »** (FOND.md : arrêté du 3 août 2016, art. 2) : statut de la norme, tableau, circuits spécifiques. Lien.
- **Législation — « Terre et différentiel »** : pourquoi 30 mA, ce que compare un différentiel, le bouton test. Lien.
- **Câblage virtuel** : s'entraîner à câbler. Lien (rien n'est refait ici).
- ÉlectroRézo 4.3 (courbes B, C, D), 4.5/4.6 (différentiels), 4.8 (terre), 4.10 (section), 2.7 : rappels par liens.

## Photographies (base d'illustrations, `outils/chercher-images.mjs`)
| Fichier | Origine dans le fonds | Emploi |
|---|---|---|
| `assets/biblio/tableau-etiquete-cuisine.jpeg` | `05_Ressources-Partagees/Electricite/15904-theme-1-activite-2-etiquetage-dun-tableau-electrique` (empreinte f8952e0ea94f) | temps 1 et 3 : lire usage, courbe et calibre. **Lecture vérifiée sur la photo agrandie** : de gauche à droite C 32, C 20, C 20, C 20, C 20, C 10, puis un module 16AX ; étiquettes plaque cuisson, four, lave-vaisselle, réfrigérateur, prise de courant, éclairage. |
| `assets/biblio/tableau-annote.jpeg` | `02_CAP-IFCA/S4-Electricite/tableau électrique.docx` (empreinte 91aca4291604) | temps 1 : les pièces d'un tableau |
| `assets/biblio/differentiel-a-lire.png` | `02_CAP-IFCA/Collegues-Partages/TP2 atelier elec.docx` (empreinte eb0971962524) | temps 3 : sensibilité et calibre d'un différentiel (40 A, 30 mA) |
| `assets/biblio/branchement-differentiel-departs.png` | `02_CAP-IFCA/Froid-Frigorifique/01 Electricité élèves.pdf` (empreinte 52f15fe95c6d) | copiée, **non utilisée** (réserve) |
Image écartée : `02260fe494ac` (copie d'élève corrigée portant un nom) — jamais d'élève dans un support (règle RGPD).
Plusieurs images viennent de dossiers « Collègues partagés » : **droit de reproduction à confirmer par F. Henninot** (FINIR-ELECTROREZO, point A.3).

## Symboles (bibliothèque `bibliotheque-symboles-energie/svg/10_electric/10_allpole/`, jamais redessinés)
Symboles réellement affichés (six) : `plaque_cuisson`, `chauffe_eau` (500_home_installation/20_home_appliances), `prise_fiche` (140_connectors_plugs) ; recopiés depuis les stations voisines : `int_diff2` (4.5, interrupteur différentiel ; remplace `ddr2`, qui est un DISJONCTEUR différentiel avec croix — re-audit lot 2, 22/10/2026), `ddr3` (4.6), `dis_mag_term_2f-1` (4.3).
`four`, `congelateur`, `refrigerateur`, `lampe2`, `compteur_energie`, `ground1` ne sont pas dans le dossier `assets/` (non utilisés).
Serrés par `outils/recadrer-symboles.mjs` (fenêtre seulement). Fichiers cassés dans la bibliothèque, évités : `disjonct-m_1fn.svg`, `lave-vaisselle.svg`.

## Contenu des textes
- Différentiel ≤ 30 mA sur les circuits terminaux d'un logement, sectionnement et protection de chaque circuit, repérage, circuits spécifiques dédiés : arrêté du 3 août 2016, art. 2 3°, 4°, 5° (via `legislation/.../elec-nf-c-15-100/FOND.md`, lu le 30/09/2026).
- Principe du différentiel (comparer l'aller et le retour), bouton test (simule un défaut, le dispositif doit déclencher) : `legislation/.../elec-terre-differentiel/FOND.md` (INRS ED 6345, OPPBTP).
- « sensibilité de 500 mA du disjoncteur de branchement », compteur et disjoncteur « fournis par le distributeur », type A pour la plaque de cuisson et le lave-linge :
  **document de cours CAP IFCA « tableau électrique »** — source secondaire, voir « À vérifier ».
- Courbes B, C, D et lecture « C 20 » : station 4.3.
- **Habilitation et consignation (ajoutées après la P1 du 19/10)** : carte « Avant de toucher » commune aux trois stations (`modele-pratique.js`, `SECURITE`) — habilitation : Code du travail R. 4544-9 et R. 4544-10 (via `legislation/.../elec-habilitation/FOND.md`) ; cinq opérations de consignation : INRS ED 6109 § 5.1 (via `legislation/.../elec-consigner/FOND.md`), capsule « Consigner avant de toucher », HoCourant M9.
- Peigne, bornier de neutre, bornier vert de terre : légende de la photo `tableau-annote.jpeg`.

## Ce qui est nouveau (créé, pas adapté)
La scène « qui s'éteint, quand ? » (3 états), les six exercices en trois paliers, la narration.

## Reprise du 22/10 (règles de Franck : station générique, appareil réel dans les scènes)
- La scène « qui s'éteint, quand ? » montre des **photographies d'appareils réels** : disjoncteur différentiel (4.6), interrupteur différentiel 30 mA (cache `2307a92c12e9`), plafonnier (`4b19c81fc308`), prises murales (`4b609d97bb5f`), armoire congélatrice (`a3d142d020a5`), chauffe-eau (`4a1a913d3cdb`), pompe à chaleur (`f45dd65cd30f`), climatiseur (`ccb038676afc`) ; recadrage `disjoncteurs-modulaires.jpg` tiré de la photo du tableau étiqueté. Le court-circuit se fait sur le chauffe-eau (pas de bonne photo de plaque de cuisson dans la base).
- Les symboles ne sont plus qu'au temps « Représenter ». Codes dans le bloc discret « Sert notamment pour ».
