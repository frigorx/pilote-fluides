# Audit — Fluidique & thermique (2 stations) — 27/09/2026

Sources croisées : `packs/fluides/referentiel-2025.json` (arrêté du 21/11/2025, annexe II)
et connaissance générale du règlement (UE) 2024/573. Aucune station modifiée, aucun navigateur
utilisé — les défauts d'affichage SVG sont estimés par calcul (largeur de police × nombre de
caractères vs `viewBox`), pas par rendu réel : à vérifier à l'écran avant correction.

## fgaz-3

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:298 | Le maillage dit « Les stations correspondantes ne sont pas encore ouvertes » en citant Aptitude & capacité — or cette station est ouverte et pointe déjà vers fgaz-3 en retour (aptitude-capacite/index.html:286-292, lien réel + « F-Gaz 3 est ouverte »). Le lien réciproque manque. | Ajouter `<a href="../aptitude-capacite/">` et corriger la phrase, sur le modèle de l'autre station. |
| 🟠 | index.html:18-22 | Commentaire d'en-tête : « voix-index.js n'est pas chargé : aucun audio n'est fabriqué… tout passe par la voix du navigateur ». Faux : `voix-index.js` est chargé (ligne 318), le fichier existe et porte 12 narrations réellement générées par Piper (voir son propre en-tête, et le commentaire lignes 305-317 du même index.html, qui le confirme). | Supprimer ou réécrire ce commentaire périmé ; il contredit le reste du même fichier. |
| 🔴 | svg/le-reflexe.svg:33-34 | Deux `<text class="bi">` de bilan (117 et 133 caractères réels, police 13,5 px) sur une seule ligne sans retour (`tspan`), dans un `viewBox` de 880 px de large démarrant à x=30. Largeur nécessaire estimée ≈ 820-930 px pour ≈ 800 px disponibles : débordement hors cadre à droite, illisible à l'impression. | Scinder chaque ligne en 2 `tspan` (ou 2 lignes de texte) plus courtes. |
| 🟡 | svg/aptitude-capacite-categories.svg (fin) | Trois lignes `.lg` de 107 à 147 caractères (police 13,5 px, x=30-48, boîte 880 px) : même risque, moins net que ci-dessus. Fichier partagé avec aptitude-capacite (identique). | Vérifier au rendu ; si débordement confirmé, corriger une fois pour les deux stations. |
| 🟡 | FOND.md | Pas de liste « À sourcer » (aptitude-capacite en a une). Les chiffres (PRP 675/2088/3922, seuils 5/50/500 t éq. CO₂, échéancier 2025→2035) ne sont rattachés à aucun article ou annexe précis du règlement 2024/573 — seulement au principe général « se vérifie sur le texte en vigueur ». | Ajouter la liste, même courte, avec au moins les numéros d'annexe/article visés. |
| 🟡 (certitude modérée) | FOND.md écran 5 / index.html:154-155 | Seuils de contrôle d'étanchéité « 5 / 50 / 500 t éq. CO₂ » : valeurs héritées de F-Gas II (règlement 517/2014, art. 4). Je n'ai pas pu vérifier si le règlement 2024/573 les reprend à l'identique (pas d'accès au texte pour cet audit). | À confirmer sur le texte en vigueur avant tout envoi à Design. |
| 🟡 | FOND.md vs index.html | FOND dit « Écrans 5 et 8 : pas de SVG, mise en forme HTML seule » ; le HTML livré a pourtant un SVG sur chacun (trois-obligations.svg, le-reflexe.svg). FOND non mis à jour après la production réelle. | Mettre à jour le FOND pour qu'il reflète le livrable. |
| 🟡 | index.html:87-286 (Q4) | Dans le quiz, la bonne réponse de Q4 (90 caractères) est nettement plus longue que les trois autres options (45-55 caractères) — biais classique de rédaction de QCM, en partie devinable sans le cours. | Rallonger les distracteurs ou raccourcir la bonne réponse. |
| 🟡 | index.html:324 / FOND.md | `data-prototype` (« la station attend sa relecture métier ») encore présent alors que la station compte parmi les « 2 stations ouvertes » de la branche à auditer. Statut à clarifier, pas forcément une erreur. | Confirmer si l'attribut doit tomber au passage en production. |

Chiffres sans source : seuils 5/50/500 t éq. CO₂, échéancier d'interdiction 2025→2035, horizon
2050 — présents dans FOND et la page (donc pas absents du fond), mais sans référence d'article
ou d'annexe précise dans FOND ni dans `referentiel-2025.json` (qui ne couvre que l'annexe II,
l'attestation d'aptitude — pas le corps du règlement).
À sourcer (fond) : liste absente du fond (voir ci-dessus).
Ce qui manque : le renvoi précis à l'annexe du règlement pour l'échéancier des interdictions ;
aucune mention du registre européen / de la déclaration annuelle des quotas ; les codes BTS
d'adossement restent en `⟦…⟧`, assumé par le fond lui-même.

## aptitude-capacite

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html Q2, Q3, Q4 (et un peu Q1) | Dans trois questions sur quatre, la bonne réponse est systématiquement l'option la plus longue — Q2 : 92 car. contre 33-40 pour les distracteurs ; Q3 : 63 contre 24-44 ; Q4 : 78 contre 33-51. Motif répété, donc devinable sans avoir suivi le cours. | Rallonger les distracteurs à une longueur comparable, question par question. |
| 🔴 | svg/maintien-7-ans.svg:58 | `<text class="note" x="450" ... text-anchor="middle">` de 133 caractères réels, police 15 px, centrée dans un `viewBox` de 900 px : largeur nécessaire estimée ≈ 1000 px pour 900 disponibles, donc débordement hors cadre des deux côtés (texte centré). Les autres lignes `.note` du même fichier et des fichiers voisins font 94-98 caractères et tiennent ; celle-ci est nettement plus longue. | Scinder en 2 lignes (`tspan`) ou raccourcir. |
| 🟡 | svg/aptitude-capacite-categories.svg | Même fichier que fgaz-3 (identique), même réserve sur les 3 lignes longues en bas du schéma. | Voir la ligne correspondante de fgaz-3 ; une seule correction sert les deux stations. |
| 🟢 | index.html:29-33, 291-292 | Bon traitement à signaler (pas un défaut) : l'écart avec le FOND sur l'écran 4 (durée de validité et organisme de la capacité, non sourcés) est documenté en commentaire et les infos non sourcées ont bien été retirées plutôt qu'inventées ; le maillage vers F-Gaz 3 est un vrai lien, à jour. | — |

Chiffres sans source : aucun relevé — tous les chiffres cités (7 ans, 3 ans, 12 mars 2029,
groupes G1-G14, catégories I-IV et A1-E-V) se retrouvent à l'identique dans
`referentiel-2025.json` (`regles_composition`, `remise_a_niveau_periodique`,
`remise_a_niveau_ponctuelle`). Station la mieux sourcée des deux.
À sourcer (fond) : durée de validité et organisme délivrant l'attestation de capacité
(FOND.md:98-100, 248-250) — absent de `referentiel-2025.json` qui ne couvre que l'aptitude ;
correctement retiré de l'écran 4 plutôt que deviné.
Ce qui manque : rien sur l'attestation de capacité provisoire ni sur le cas d'un
auto-entrepreneur sans salarié ; les codes BTS d'adossement restent eux aussi en `⟦…⟧`.

## Synthèse de la branche

- Défauts transversaux : maillage entre les deux stations à sens unique (aptitude-capacite
  pointe vers fgaz-3, pas l'inverse) ; le SVG partagé `aptitude-capacite-categories.svg` porte
  le même risque de débordement de texte dans les deux dossiers ; le biais « bonne réponse la
  plus longue » touche surtout aptitude-capacite mais aussi une question de fgaz-3.
- aptitude-capacite est nettement mieux sourcée que fgaz-3 (tous ses chiffres sont vérifiables
  dans `referentiel-2025.json` ; ceux de fgaz-3 portent sur le corps du règlement 2024/573,
  hors du périmètre de ce fichier, et ne sont adossés à aucune annexe précise).
- Les 5 corrections les plus utiles, dans l'ordre :
1. Rendre réciproque le lien fgaz-3 ↔ aptitude-capacite (index.html:298 de fgaz-3).
2. Corriger le commentaire périmé sur la voix dans fgaz-3/index.html (lignes 18-22).
3. Rallonger les distracteurs trop courts du quiz d'aptitude-capacite (Q2, Q3, Q4).
4. Vérifier au rendu réel et corriger les textes SVG trop longs : maintien-7-ans.svg (le plus
   net), le-reflexe.svg, et le fichier partagé aptitude-capacite-categories.svg.
5. Ajouter une liste « À sourcer » au FOND.md de fgaz-3, avec les numéros d'annexe du règlement
   2024/573 pour les seuils et échéances cités.
