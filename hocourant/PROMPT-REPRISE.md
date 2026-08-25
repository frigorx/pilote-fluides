# REPRENDRE inerWeb HoCourant — à lire en premier

Dépôt : `C:\git\hocourant` · vérité de l'avancement : `CHANGELOG.md` ·
plan du chantier : `task_plan.md` · cadrage validé : `Desktop\CADRAGE-HABELEC-LOGICIEL-2026-08-24.md`.

## Ce que c'est

L'application d'entraînement à l'habilitation électrique (B0 → BR) pour la 2nde TNE, le
CAP IFCA et le Bac MFER. Statique pur, anonyme, servie sur `inerweb.fr/hocourant/`.
Mandat de Franck du 24/08/2026 : carte blanche, charte inerWeb intégrale.

⚠️ **Le nom a changé le 25/08/2026.** « HabElec » est abandonné : habelec.fr est un centre
de formation Qualiopi sur le même objet, et « Habilec » désigne une formation en ligne à
l'habilitation électrique. Le produit s'appelle **HoCourant** — *au courant*, avec l'écho
du symbole H0. ⚠️ Le LIVRET PAPIER de la chaîne « full ia » porte encore le nom HabElec :
à renommer aussi avant toute diffusion.

## Décisions du 25/08 (inc. 2) — à ne pas défaire

7. **Le code est une MISSION, pas une classe** : `B0-K7-3N` = cible d'habilitation
   accordée par l'enseignant · élève · échéance. On se désengage du niveau scolaire :
   le système vaut pour un lycée, un CFA, un centre ou une entreprise.
8. **La cible n'est jamais un plafond.** Les paliers au-delà restent ouverts
   (« Pour aller plus loin ») : un élève motivé va jusqu'à BR et le code le dira.
9. **La question vient AVANT le cours.** On apprend en cherchant ; l'erreur ouvre la
   remédiation sur place et la question repart en fin de file. La fiche reste
   consultable à tout moment mais n'est jamais un passage obligé.
10. **Aucune question sans image** (règle Franck du 25/08). Photo de situation sur la
    question, schéma SVG en remédiation. Dérogation R4 actée pour les photos de
    situation uniquement — les schémas techniques restent des SVG faits main.
    ⚠️ Les deux scènes de VAT du livret restent ÉCARTÉES tant que l'audit n'est pas
    soldé (`SOURCES-IMAGES.md`).

## Architecture non négociable (décisions du cadrage, validées par carte blanche)

1. **Rien de nominatif en ligne, jamais.** Pas de compte, pas de courriel, pas de réseau.
   La progression est en localStorage. Les notes qui comptent se passent en classe
   (moteur `inerweb-habilitation`, hors de ce dépôt).
2. **Code de restitution** = seul canal de remontée : filière + palier + score + date +
   contrôle djb2, encodé base 31 (`restitution.js`). Déclaratif, assumé, écrit dans l'interface.
3. **La banque est étiquetée** (`donnees/questions.js`) : `ok` = LA bonne réponse,
   `nok` = distracteurs, l'affichage mélange (Fisher-Yates). **Ne jamais réintroduire un
   ordre fixe ou périodique** — c'est le défaut qui a bloqué le livret v2.1 (cycle A-B-C,
   79/80 en cochant en boucle ; voir `Desktop\AUDIT-HABELEC-V2.1-2026-08-24.md`).
4. **Habilitabilité, jamais un titre** : le garde-fou de vocabulaire est dans le pied de
   chaque page — le conserver.
5. Test de palier : règles dans `REGLES_TEST` (15 questions, 70 %, critiques ≥ 30 %,
   rappels 25 %) — repères INRS ED 6127. Correction en fin seulement.
6. Charte inerWeb v1.1 : jamais de sombre, trois canaux, logo `marque.js`
   (`data-cartouche="HoCourant"`), bouton Aa. Aucune dépendance externe.

## Pièges déjà payés

- **L'échéance des missions tient sur 2 caractères** (semaines depuis 2026) : elle est
  arrondie EN AVANT. Ne pas présenter cela comme « le dimanche de la semaine » —
  l'écart peut aller jusqu'à 6 jours selon le jour de la semaine.
- **Tester dans le navigateur sans `setTimeout`** : quand le panneau est masqué, les
  minuteries sont bridées à 1/s et tout script d'essai part en délai dépassé.
  L'application est synchrone, les clics enchaînés suffisent.

- **Encodage du code de restitution** : la date occupe 6 chiffres (aammjj) → le
  multiplicateur du bloc score/total est `1000000`. Avec `100000`, la date déborde sur le
  champ voisin et TOUT code devient invalide (bogue réparé le 24/08, commit initial).
- Les anciennes questions « RAPPEL » du livret sont rattachées au **module dont elles
  testent le contenu**, pas à leur chapitre d'origine — c'est ce qui rend le tirage
  spiralé propre.
- `Desktop\inerweb full ia\livret-habilitation-electrique-inerweb` est l'atelier du
  LIVRET PAPIER (chaîne externe) : il ne se modifie pas d'ici. Si une v2.2 du livret
  sort, harmoniser la banque dans les deux sens — comparer les TITRES des questions.

## Vérifier après toute modification

Servir (`npx http-server . -p 2031`) puis dérouler : accueil → filière → module (cours +
entraînement) → test de palier → code → « Vérifier un code » (le code doit passer, un
code altéré doit être rejeté). Contrôler 375 px sans défilement horizontal.

## Ce qui reste (voir aussi la fiche mémoire project_habelec_livret)

1. **Relecture métier de Franck** — chiffres et formulations (domaines, seuils mA,
   distances 3 m / 0,30 m / 2 m, repères BS/BR). RIEN n'est publié avant son bon à tirer.
2. **Feu vert de mise en ligne** : copie dans le site servi (même mécanique que
   HydroMétro : atelier ici, copie servie dans pilote-fluides — jamais éditée directement).
3. Volet « test noté en classe » : deuxième référentiel dans `inerweb-habilitation`
   (moteur multi-diplômes prévu pour ça) — chantier séparé, non commencé.
4. Éventuel : illustrations des scènes du livret une fois validées planche par planche.
