# Module « Classification des fluides et risques » — à produire

> **Demandé par F. Henninot le 26/07/2026.** À traiter dans un projet dédié, pas dans la foulée.
> Son argument, qui est le bon : *« Je ne peux pas former des gens sans les avoir avertis des
> risques. Ne pas faire ça, c'est porter la responsabilité d'un accident. »*

---

## Pourquoi, alors que ce n'est pas au référentiel

Le référentiel n'impose que ce qui est **évalué à l'épreuve**. Il n'impose pas ce qui est
**nécessaire pour ne blesser personne**. C'est le même raisonnement que pour le module sécurité
(fiches `s1` à `s5`) : le risque électrique et l'asphyxie n'ont aucun code, ils sont enseignés
quand même, et les fiches le disent franchement.

Deux raisons d'urgence rendent ce module nécessaire maintenant :
- le **CO₂ (R-744)** arrive dans le parc — inodore, plus lourd que l'air, risque d'**anoxie** ;
- les **hydrocarbures** (R-290, R-600a) se généralisent — risque d'**atmosphère explosive**.

## Ce qui existe déjà, mesuré le 26/07

| | occurrences dans `cartes.js` |
|---|---|
| A2L · A3 · B2L | 15 · 17 · 8 — traitées |
| **B1 · B2 · B3** | **0 · 1 · 1** — la moitié toxique de la matrice est absente |
| **explosimétrie** | **0** |
| **anoxie** | **0** *(l'asphyxie est traitée dans `s1`, pas l'anoxie au CO₂)* |
| LIE (limite inférieure d'explosivité) | 6 — citée, jamais expliquée |
| ATEX | 1 — citée une fois |

Le pack traite donc **les classes qu'il rencontre**, jamais **la classification comme système**.

## Ce que le module doit contenir

1. **La matrice complète NF EN 378 / ASHRAE 34** — les deux axes, et pourquoi ils sont deux :
   - toxicité : **A** (faible) / **B** (élevée) ;
   - inflammabilité : **1** (aucune propagation) / **2L** (faible, propagation lente) / **2** /
     **3** (élevée).
   Soit huit cases : A1 · A2L · A2 · A3 · B1 · B2L · B2 · B3. Aujourd'hui le pack n'en montre
   que quatre, celles qu'il croise.
2. **Ce que la classe commande** — et c'est là qu'est l'enjeu : EPI, matériel électrique,
   ventilation, détection, charge maximale admissible, limites d'occupation du local.
   Se tromper de classe, c'est se tromper de tout le dispositif de sécurité.
3. **L'explosimétrie** : ce qu'est une **LIE** et une **LSE**, ce que mesure un explosimètre,
   pourquoi une atmosphère peut être explosive **avant** de sentir quoi que ce soit.
4. **L'anoxie au CO₂** : inodore, incolore, plus lourd que l'air, il s'accumule en point bas.
   Distinguer du mécanisme de `s1` (déplacement d'oxygène par un fluide fluoré) — le CO₂ agit
   aussi par **toxicité propre**, pas seulement par déplacement.
5. **Le piège central**, déjà présent partout ailleurs dans le pack : **le R-290 est A3, pas A2L**.

## Où il se place

**En préliminaire, avant même le choix de la catégorie A1/A2/D/E.** C'est explicite dans la
demande : le stagiaire voit la sécurité et les familles de fluides *avant* de savoir quel parcours
il suit.

Concrètement : soit en tête du bloc d'accueil existant (`m-secu`, actuellement 1 h 55), soit comme
second bloc juste après. À trancher au moment de le produire.

## Règles à tenir, comme partout

- **Zéro invention chiffrée.** Aucune LIE en %, aucune charge limite en grammes, aucun seuil de
  détection. Ces valeurs se lisent sur la **fiche de données de sécurité du fluide** et sur la
  **NF EN 378** — c'est d'ailleurs ce qu'il faut apprendre à faire.
- **Ne pas généraliser** : « plus lourd que l'air » vaut pour la plupart des fluorés et pour le
  CO₂, **pas pour l'ammoniac**.
- Public adulte : vouvoiement, pas d'emoji en guise d'illustration technique.
- La classification est un **système à comprendre**, pas une liste à retenir : la matrice doit
  s'expliquer par ses deux axes avant d'être mémorisée.

## À prévoir aussi

Des **diapositives** dédiées (le module se projette d'entrée de jeu) et des **questions** —
elles seront à marquer *hors référentiel* avec leur motif, comme les trois questions du risque
électrique (`pk-s5-1` à `pk-s5-3`), puisque la classification comme système n'a pas de code
propre à l'annexe II.B.
