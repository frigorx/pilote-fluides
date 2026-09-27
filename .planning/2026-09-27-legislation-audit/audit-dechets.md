# Audit — Déchets (5 stations) — 27/09/2026

Lecture complète de FOND.md, index.html et des 8 SVG de chacune des 5 stations
(dechets-responsabilites, dechets-sept-flux, dechets-dangereux,
dechets-rep-batiment, dechets-valoriser). Aucun fichier modifié.

## dechets-responsabilites

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🔴 | index.html:285-286 et :289 | Le commentaire dit « PAS de voix-index.js ici » et trois lignes plus bas le tag charge quand même `moteur/voix-index.js` | Retirer le commentaire, ou retirer le tag — trancher une fois pour les 5 stations |
| 🟡 | index.html Q1, Q2, Q4 (data-answer="bonne") | La bonne réponse est nettement la plus longue des quatre options (ex. Q2 : 21 mots contre 6-11 pour les distracteurs) — devinable sans le cours | Raccourcir la bonne réponse ou étoffer les distracteurs pour égaliser les longueurs |

Chiffres sans source : aucun (le fond exclut volontairement L541-1-1/L541-2, la page ne les cite pas — cohérent).
À sourcer (fond) : numéros d'articles du Code de l'environnement (L541-1-1, L541-2).
Ce qui manque : rien sur ce qui se passe concrètement en cas de contrôle (sanction, mise en demeure) ; la mécanique du registre (durée de conservation, forme) reste implicite.

## dechets-sept-flux

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🔴 | index.html:273-274 et :277 | Même contradiction voix-index.js que ci-dessus | Idem — même correction, 5 fichiers |
| 🟠 | svg/rangee-bennes-matiere.svg (bande de bas de visuel) | Le texte « Composition exacte des flux à vérifier sur le texte en vigueur avant impression finale. » — une note de fabrication — est affiché directement sur le visuel montré à l'élève, pas seulement dans FOND.md | Retirer cette phrase du SVG ; la précaution de sourçage suffit dans FOND.md et le commentaire HTML |
| 🟡 | index.html Q2, Q4 | Bonne réponse nettement plus longue que les distracteurs | Idem station précédente |

Chiffres sans source : aucun.
À sourcer (fond) : composition exacte des « 7 flux » et texte qui les instaure — correctement non cité dans la page.
Ce qui manque : pas de mention du diagnostic déchets avant travaux ; le partage de bennes avec d'autres corps de métier sur un chantier commun (qui tranche en cas de désaccord) n'est pas traité.

## dechets-dangereux

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🔴 | index.html:285-286 et :289 | Même contradiction voix-index.js | Idem |
| 🟡 | index.html Q1, Q3 | Bonne réponse un peu plus longue que les distracteurs, écart plus modéré qu'ailleurs | Vérifier, correction moins urgente que sur les autres stations |

Chiffres sans source : aucun — station la plus rigoureuse des 5 sur ce point (« registre national numérique » sans nom propre ni date, conforme au fond).
À sourcer (fond) : nom exact et cadre juridique de la plateforme de dématérialisation du BSD et date de bascule ; codes de nomenclature déchets (non cités, correctement réservés).
Ce qui manque : rien sur la durée de conservation du bordereau ni sur un contrôle a posteriori ; aucun lien avec le classement ICPE du lieu de stockage des déchets dangereux.

## dechets-rep-batiment

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🔴 | index.html:281-282 et :285 | Même contradiction voix-index.js | Idem |
| 🟡 | index.html Q1, Q2, Q4 | Bonne réponse nettement plus longue que les distracteurs | Idem stations 1 et 2 |

Chiffres sans source : aucun.
À sourcer (fond) : texte instaurant la REP bâtiment (nom, date d'entrée en vigueur) ; conditions précises de gratuité d'un point de reprise.
Ce qui manque : aucune indication sur la marche à suivre si aucun point de reprise n'existe à proximité ; pas de renvoi à un outil de recherche de point de reprise, pourtant la première chose qu'un frigoriste chercherait sur le terrain.

## dechets-valoriser

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🔴 | index.html:271-272 et :275 | Même contradiction voix-index.js | Idem |
| 🟡 | index.html Q2, Q3 | Bonne réponse plus longue que des distracteurs réduits à un seul mot | Étoffer les distracteurs courts (« Recyclage », « Prévention », etc.) |

Chiffres sans source : aucun.
À sourcer (fond) : numéro d'article du Code de l'environnement fixant la hiérarchie des 5 niveaux — non cité, conforme au fond.
Ce qui manque : la valorisation organique (compostage), mode distinct du recyclage matière, n'est jamais mentionnée alors que la hiérarchie officielle la couvre ; aucun arbitrage donné quand deux niveaux sont également possibles (ex. réemploi vs recyclage du même déchet).

## Synthèse de la branche

- Défaut transversal n°1 (les 5 stations) : le bloc de commentaire final de chaque `index.html` affirme « PAS de voix-index.js ici » alors que la ligne suivante charge ce fichier — un commentaire copié-collé jamais mis à jour quand le tag a été ajouté partout.
- Défaut transversal n°2 (4 stations sur 5, à des degrés variables) : dans plusieurs questions, la bonne réponse est nettement la plus longue des quatre options — devinable par la longueur seule, sans avoir suivi le cours.
- Point positif transversal : la discipline « à sourcer » du fond est respectée à la lettre partout — aucun chiffre, date ou numéro d'article non sourcé n'apparaît dans une page ou un SVG.
- Les 5 corrections les plus utiles, dans l'ordre :
  1. Corriger la contradiction voix-index.js / commentaire dans les 5 `index.html` (même correction à répéter 5 fois).
  2. Retirer la phrase de fabrication visible dans `dechets-sept-flux/svg/rangee-bennes-matiere.svg`.
  3. Raccourcir ou étoffer les distracteurs des questions où la bonne réponse est nettement la plus longue (au moins dechets-responsabilites Q1/Q2/Q4 et dechets-rep-batiment Q1/Q2/Q4).
  4. Ajouter dans dechets-responsabilites et dechets-dangereux un mot sur ce qui se passe concrètement en cas de contrôle ou de manquement.
  5. Mentionner la valorisation organique dans dechets-valoriser, pour ne pas laisser croire que la hiérarchie ne compte que les 5 cases de l'escalier.
