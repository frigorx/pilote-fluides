# Brief — audit de contenu d'une branche du réseau Législation

Vous auditez UNE sous-ligne du réseau Législation inerWeb (cours niveau BTS, réglementation
du froid/CVC). Dossier : `C:\git\pilote-fluides\legislation\stations\<slug>\`.
Chaque station : `FOND.md` (le fond validé, avec une liste « À sourcer »), `index.html`
(12 écrans `section.slide` : 8 cours + 4 questions, chaque écran a un `data-narration`, une
`figure` avec `img alt` + `figcaption`), `svg/*.svg` (8 illustrations).

## Lecture seule
Vous ne modifiez AUCUN fichier des stations. Vous n'utilisez pas le navigateur. Vous écrivez
un seul fichier : votre rapport. Vous rédigez vous-même, sans sous-agent.

## Ce que vous vérifiez, station par station
1. **Cohérence** écran ↔ `data-narration` ↔ `alt` ↔ `figcaption` ↔ SVG (ouvrir le SVG : les
   textes qu'il contient disent-ils la même chose que l'écran ?). Une narration doit dire
   *ce que ça veut dire*, pas décrire la géométrie (« à gauche un rectangle bleu… »).
2. **Questions** (écrans 9-12) : la bonne réponse est-elle bien celle que le cours enseigne ?
   Est-elle devinable sans le cours (trop longue, seule à contenir un mot-clé) ? Le retour
   (feedback) explique-t-il ?
3. **Chiffres et valeurs réglementaires affichés** dans l'écran ou le SVG : chacun doit être
   dans `FOND.md`. Listez tout chiffre présent dans la page mais absent du fond, et la liste
   « À sourcer » restante du fond.
4. **Exactitude** : signalez toute affirmation réglementaire qui vous paraît fausse ou
   périmée (texte abrogé, seuil changé, sigle mal développé). Dites votre degré de certitude.
   Vous ne corrigez pas, vous signalez.
5. **Texte périmé ou incohérent avec l'état du réseau** : « station en préparation », « voix
   du navigateur », commentaires HTML qui décrivent un état passé, correspondances vers
   des stations qui n'existent pas encore signalées comme ouvertes, etc.
6. **Complétude** : écran vide, `figcaption` absent, `alt` générique, question sans retour,
   SVG contenant du texte manifestement trop long pour sa zone (chaîne > 40 caractères sur
   une ligne dans un `viewBox` étroit), texte posé sur un tracé.
7. **Ce qui manque au cours** pour être complet à ce niveau (2 à 3 lignes par station, pas plus).

## Format du rapport (français, sobre, ≤ 250 lignes)
Fichier : `C:\git\pilote-fluides\.planning\2026-09-27-legislation-audit\audit-<branche>.md`

```
# Audit — <branche> (<n> stations) — 27/09/2026

## <slug>
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
🔴 faux ou cassé · 🟠 incohérent ou périmé · 🟡 amélioration
Chiffres sans source : …
À sourcer (fond) : …
Ce qui manque : …

## Synthèse de la branche
- défauts transversaux (mêmes erreurs dans plusieurs stations)
- les 5 corrections les plus utiles, dans l'ordre
```
Terminez votre réponse par les 5 lignes de la synthèse, rien d'autre.
