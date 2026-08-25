# Journal — inerWeb HoCourant

## inc. 2 — 25/08/2026 — codes de mission, apprentissage par la question, images partout

Trois demandes de Franck dans la même séance, dans cet ordre.

**1. L'identité vient de l'enseignant, pas de l'école.** Le code n'est plus un
pseudonyme de classe mais une **mission** : `B0-K7-3N` = niveau visé · élève ·
échéance. Le même système sert un lycée, un CFA, un centre ou une entreprise.
- `genererMissions()` : l'enseignant choisit la cible, la date et le nombre, il
  obtient une feuille imprimable avec une colonne « nom » vide — cette feuille est
  la seule chose qui relie un code à un élève, et elle reste chez lui.
- L'échéance tient sur deux caractères (semaines depuis 2026) : arrondie **en avant**,
  jamais avant la date demandée ; la date exacte est affichée avant impression.
- La mission voyage en clair dans le code de restitution mais est **scellée** par le
  condensé : la modifier invalide le code (vérifié, 12 altérations sur 12 rejetées).
- **La cible n'est pas un plafond** : les paliers au-delà restent ouverts sous
  « Pour aller plus loin » — un élève motivé pousse jusqu'à BR, le code dira jusqu'où.
- `VERSION` passe à 2 (aucun code v1 n'était en circulation).

**2. Pédagogie de l'auto-apprentissage : la question d'abord.** Le couple
« cours puis quiz » est remplacé par une **découverte** : on cherche, on répond,
l'information arrive au moment où elle manque. Juste → on confirme et on avance.
Faux → remédiation sur place (bonne réponse, explication, schéma, fiche dépliée) et
**la question repart en fin de file** : on ne quitte pas un point non compris. Le
module n'est « découvert » que lorsque chaque question a été trouvée. La fiche reste
consultable à tout moment (bouton « Fiche »), jamais un passage obligé — la lecture
d'abord doit rester possible pour les lecteurs fragiles.

**3. Aucune question sans image** (règle posée ce jour).
- 27 **scènes SVG** faites main (`donnees/scenes.js`) : trait bleu marine, un accent
  orange, aucun texte dans le dessin, 5 animées avec `.mobile`.
- 30 **photographies de situation** reprises du livret v2.1 — dérogation actée à la
  règle R4 pour les images de situation seulement (schémas techniques toujours SVG).
- Répartition : photo sur la question, schéma en remédiation ; 104/104 questions
  illustrées, 30/30 photos utilisées, aucun fichier manquant, 183 Ko en moyenne,
  chargement paresseux.
- ⚠️ `safe_vat.jpg` et `vat_source.jpg` **écartées** : contrôle visuel confirmant le
  défaut de l'audit (gants mais pas d'écran facial). Voir `SOURCES-IMAGES.md`.

**Éprouvé navigateur** : lot de 20 codes → saisie élève → bandeau de mission avec
compte à rebours → découverte M9 complète (11 questions, une ratée revenue et
réussie, remédiation avec schéma) → code de restitution → décodage enseignant
affichant l'élève, la mission et le palier atteint.

⏳ Reste demandé et non fait : mode examen surveillé et attestation imprimable
« théorie acquise » (chantier séparé — le moteur d'examen existe déjà dans
`inerweb-habilitation`, ne pas le refaire ici).


## inc. 1 — 24/08/2026 — naissance : application complète et éprouvée

Mandat carte blanche de Franck (cadrage `Desktop\CADRAGE-HABELEC-LOGICIEL-2026-08-24.md`).

- **Programme** : 5 paliers (P0 socle → P4 BR), 3 filières bornées à leur objectif
  référentiel (TNE→P1 CC21/CC22 · IFCA→P3 S6.2/T8/T10/T12/T13 · MFER→P4 S7/C4/C7/C8),
  13 modules, règles de test ED 6127 (15 questions · 70 % · critiques ≥ 30 % · rappels 25 %).
- **Cours** : 13 modules en écrans courts ; 3 SVG faits main (échelle des domaines,
  zones BT, étapes de consignation). Contenus v2.2 intégrés : domaines de tension,
  effets chiffrés (0,5/10/30 mA), distances (3 m · 0,30 m), consignation + documents,
  repères BR sans généraliser 500 V.
- **Banque** : 103 questions étiquetées (79 héritées du livret v2.1 après audit — la
  question « disclaimer » remplacée —, 24 nouvelles). Bonne réponse en position 0 des
  données, mélange Fisher-Yates à l'affichage : le cycle A-B-C du livret est
  structurellement impossible.
- **Application** : accueil/parcours/module/entraînement (correction immédiate)/test de
  palier (correction en fin, remédiation par module)/vérification professeur.
  localStorage seul, aucune donnée personnelle, aucune dépendance externe.
- **Code de restitution** : base 31 sans caractères ambigus, contrôle djb2.
  🐛 réparé avant commit : la date (6 chiffres) débordait sur le champ score
  (multiplicateur 100000 → 1000000) — tout code était rejeté « coherence ».
- **Charte** : palette v1.1 exacte, trois canaux (double vert ✔ / tireté rouge ✘ + mots),
  logo cartouche « HoCourant » (marque.js), bouton Aa + Lexend (lisibilite.js),
  impression.css. Jamais de sombre.
- **Éprouvé navigateur** (port 2031) : parcours IFCA complet, entraînement M1 (10 q),
  test P0 et P1 (15 q, 9/15 critiques, 4/15 rappels), code vérifié valide, code altéré
  rejeté 12/12, 375 px sans débordement sur 6 vues, console propre.

⏳ En attente Franck : relecture métier des contenus chiffrés · feu vert mise en ligne.
