# Sources — station 4.10

## Chiffres

- **Courants admissibles** : NF C 15-100, tableau 52H (cuivre, 30 °C, un seul circuit),
  transcrits case par case depuis la photo `assets/biblio/tableau-sections-cuivre.jpeg`
  (la même qu'en 4.9). Sections 1,5 à 95 mm², lettres de pose B, C, E. La lettre F
  (monoconducteurs à l'air libre) n'est pas reprise.
- **Méthode** : cours 1re MFER « 1.1 Électricité (choix des conducteurs) » du fonds
  (Ib ≤ In ≤ Iz, puis vérification de la chute de tension). Contrôle : l'exemple du cours,
  32 A, pose C, PVC, donne 4 mm² ; la station donne aussi 4 mm².
- **Limites de chute de tension** : 3 % éclairage, 5 % autres usages. Recoupé dans le TD3
  de Sous tension et dans le cours MFER.
- **Résistivité** ρ = 0,0225 Ω·mm²/m (cuivre en service, guide UTE C 15-105).
  Recoupement avec le tableau du cours MFER : 4 mm², 32 A, 100 m, 400 V donnent 7,4 %
  dans le cours et 7,8 % ici. La station est un peu plus sévère, d'environ 5 %.
  **À trancher par F. Henninot** : garder la valeur du guide, ou s'aligner sur le cours.
- **Sections du logement** (1,5 / 2,5 / 6 mm², 16 / 20 / 32 A) : tableau « section par usage »
  du document de cours `04_section_d_un_cable.docx` (BAC_MFER).

Le premier tableau de ce document (« Top Câble », sections adéquates avec des chutes de
12,9 %) n'est **pas** repris : ses chiffres sont incohérents avec la limite de 5 % qu'il annonce.

## Illustrations

- `section-chute-tension.svg` : parcours Sous tension, `12_section_chute_tension.svg`,
  F. Henninot, même auteur, même licence.
- Les scènes de `scenes.js` sont des dessins pédagogiques : un disque de cuivre à l'échelle,
  des cadres de texte. **Aucun symbole normalisé ni schéma électrique dessiné.**

## Narration

Écrite le 01/10/2026, pour l'oreille. **Non validée.** Aucun MP3 fabriqué.
