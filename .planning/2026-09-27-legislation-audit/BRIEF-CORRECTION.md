# Brief — corriger une branche du réseau Législation à partir de son audit

Vous corrigez UNE sous-ligne. Lisez d'abord son rapport
`C:\git\pilote-fluides\.planning\2026-09-27-legislation-audit\audit-<branche>.md`, puis
les fichiers concernés dans `C:\git\pilote-fluides\legislation\stations\<slug>\`.
Vous écrivez vous-même, sans sous-agent, sans navigateur. Fins de ligne **LF**.

## Ce que vous corrigez
1. **Tous les défauts 🔴 et 🟠 du rapport**, sauf ceux de la liste « ne pas toucher ».
   (Les commentaires HTML « voix-index.js » et « moteur en absolu » sont DÉJÀ corrigés
   dans les 29 stations : ne les reprenez pas.)
2. **Les quiz (écrans 9 à 12)**, selon la règle mesurée de F. Henninot :
   - aucune proposition ne se détache : la plus longue ne dépasse la suivante ni d'un
     cinquième ni de plus de ~5 caractères ; on **resserre la bonne réponse** plutôt que
     de gonfler les distracteurs — l'explication vit dans `data-explication`, pas dans
     la proposition ;
   - le **rang de longueur** de la bonne réponse varie d'une question à l'autre (elle
     n'est pas toujours la plus longue, ni toujours la plus courte) ;
   - la **position** de la bonne réponse varie sur les 4 questions d'une station
     (par exemple 3, 1, 4, 2 — jamais quatre fois la même, jamais « toujours 2 ou 3 ») ;
   - un distracteur est une **erreur réelle d'élève** (confusion, inversion de règle,
     raccourci de chantier), jamais une plaisanterie ; pas d'absolu qui trahit
     (jamais / toujours / aucune).
   - Le marqueur `data-answer="bonne"` et `data-explication` restent sur le bon bouton.
     Si le `FOND.md` annonce l'ordre des réponses, mettez-le à jour.
3. **Les narrations qui décrivent la géométrie** (« à gauche un rectangle bleu… ») :
   réécrire pour dire *ce que ça veut dire* — matière conservée, angle changé.
   ⚠️ Un `data-narration` modifié perd son MP3 (la clé audio est le hachage du texte)
   jusqu'à la prochaine fabrication : **ne modifiez une narration que si le rapport la
   signale**, et listez chaque narration modifiée dans votre compte rendu.
4. **Les SVG dont un texte déborde** : couper en `<tspan>` sur deux lignes dans la zone,
   sans poser de texte sur un tracé. Retirer toute note de fabrication visible.
5. **Textes périmés** dans `FOND.md` ou `index.html` (état des stations sœurs, « n'existe
   pas encore », maillage manquant vers une station sœur déjà ouverte : ajouter le lien
   relatif `../<slug>/`).

## Ne pas toucher
- Aucune **valeur réglementaire** ajoutée (seuils, périodicités, montants, dates) : la
  décision de F. Henninot est « Claude cherche, il arbitre » — rien n'entre sans lui.
- Aucun ajout de contenu « ce qui manque » : listez-le seulement.
- `styles.css`, `app.js`, les identifiants `#listen #next #prev #start #stop-voice`, la
  classe `.slide.active`, `data-prototype`.
- Les stations des autres branches.

## Compte rendu
Fichier `corrections-<branche>.md` dans le même dossier que le brief, ≤ 80 lignes :
- par station : ce qui a été changé (fichier, écran ou question) ;
- les narrations modifiées (slug + numéro d'écran) ;
- ce qui reste pour F. Henninot (arbitrages, valeurs, doutes techniques).
Terminez votre réponse par cette dernière liste, rien d'autre.
