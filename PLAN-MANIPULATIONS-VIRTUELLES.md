# Plan des manipulations virtuelles — combler les 13 derniers codes pratiques

> Écrit le 14/08/2026 sur demande de F. Henninot : *« tous les points du référentiel
> sont-ils balayés ? On peut commencer à préparer la brique de la manipulation virtuelle. »*
> Document manuscrit — il se met à jour à la main, brique par brique.

## 1. L'état mesuré (pas estimé) au 14/08

| Mesure | Valeur | Instrument |
|---|---|---|
| Couverture du référentiel (fiches) | **A1 94/94 · A2 93/93 · D 21/21 · E 17/17 = 100 %** | `COUVERTURE-REFERENTIEL.md` |
| Profondeur (le code est TENU, pas cité) | 0 rouge · 0 orange · 94 sans signal d'absence | `PROFONDEUR-REFERENTIEL.md` |
| Cours interactifs | 28, registre à **0 anomalie** | `REGISTRE-COURS-INTERACTIFS.md` |
| Banque d'entraînement | 99 compétences évaluées par ≥ 1 question | `COUVERTURE-REFERENTIEL.md` |
| Codes **pratiques** A1 | **55**, dont **47 portés** par ≥ 1 cours interactif (au 14/08 après C et D) | croisement `referentiel-2025.json` × `couverture.json` |
| **Le trou** | ~~13~~ → **8 codes pratiques sans aucun cours interactif** (C et D faites le 14/08) : 6.02-6.05, 7.04, 9.04, 9.06, 9.07 | idem — liste au § 2 |

Autrement dit : **le « expliqué » est complet et prouvé** ; le « faire », préparé virtuellement
pour 42 codes sur 55, attend ses quatre dernières briques.

## 2. Les 13 codes nus, groupés en briques

### Brique A — « Le compresseur : installer, régler, vérifier » (la plus grosse — l'organe SANS module)
Le seul organe majeur sans module dédié, alors que l'évaporateur et le condenseur ont le leur.
Même moule que ces deux-là (24-26 écrans, gestes simulés) :
- **6.02** Installer correctement un compresseur (contrôle et sécurité compris)
- **6.03** Régler les interrupteurs de sécurité et de contrôle
- **6.04** Régler les soupapes d'aspiration
- **6.05** Vérifier le circuit de retour de l'huile
- **9.07** Vérifier le fonctionnement d'un séparateur d'huile *(même circuit d'huile)*

### Brique B — « Le pupitre de réglage » (simulateur de consignes)
Un seul simulateur pour la famille « je règle une consigne et un différentiel, je prouve
le résultat » — pressostats, thermostats, limiteurs :
- **9.04** Régler des thermostats mécaniques et électroniques
- **9.06** Régler des limiteurs de pression mécaniques et électroniques
- **7.04** Régler les interrupteurs de sécurité et de contrôle *(côté condenseur, même geste que 6.03)*

### Brique C — « KVL, pression de carter » — ✅ FAITE le 14/08 (bon à tirer « ok pour c et d »)
Le module du Bureau (06/08, 14 étapes, quiz 6/7) couvre **9.05** (régler la soupape de
régulation de la pression). Sa fiche exige le bon à tirer de F. Henninot avant intégration.
Dès le feu vert : intégration + `couverture.json` déclarant 9.05 → un code de moins, en une heure.

### Brique D — Étendre les modules existants — ✅ FAITE le 14/08
L'évaporateur et le condenseur ont déjà leur module « installer, régler, vérifier » :
les codes d'inspection manquants sont des ÉCRANS À AJOUTER, pas des briques à créer :
- `condenseur-interactif` += **7.06** (purge des incondensables) · **7.08** (inspecter la surface)
- `evaporateur-interactif` += **8.05** (conduites en bonne position) · **8.09** (inspecter la surface)

### Déjà en cours ailleurs
- **Pose du manifold 2 voies** — chantier d'une session parallèle, dans `res/`, non commité.
- La partie manipulation RÉELLE (plateau) est hors de ce plan : c'est le centre qui la porte
  (grilles ENR-25, supports M0-M8 — 55/55 codes pratiques annoncés en salle côté habilitation).

## 3. Le contrat d'une brique (le même que les modules en place)
- Autonome : `index.html + app.js + styles.css`, hors ligne, aucune dépendance distante.
- `couverture.json` honnête écran par écran, dès le premier jour ([[feedback_couverture_referentiel]]).
- `marque.js` + `referentiel.js` (badge des codes) + bouton « Aa » (`lisibilite.js`).
- `SOURCES-IMAGES.md` même si tout est SVG original — la traçabilité se déclare.
- Jamais de thème sombre ; texte jamais sur un tracé ; `tests/qa.mjs` quand le module simule.
- Relié à sa fiche par `lienOutil` dans `cartes.js` (jamais dans les fichiers générés).

## 4. Ordre — C et D faites le 14/08, restent les deux briques neuves
1. ~~**C** (KVL)~~ ✅ intégré : 29ᵉ cours du registre, couverture 1.05 + 9.05, appui 9.02, relié à g9b.
2. ~~**D**~~ ✅ : condenseur 24 → 25 écrans (purge des incondensables 7.06 ; 7.08 déclaré sur
   « Nettoyer, puis prouver ») · évaporateur 26 → 27 écrans (position des conduites 8.05 ;
   8.09 déclaré sur « Inspecter la surface »).
3. **A** (compresseur) — la vraie brique neuve, la plus utile : l'organe sans module.
4. **B** (pupitre de réglage) — conception d'interaction la plus originale, en dernier.
