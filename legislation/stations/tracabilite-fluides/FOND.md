# Station « Traçabilité » — FOND à valider

> Réseau Législation · sous-ligne Fluidique & thermique (#0f766e) · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Titre du plan : « Traçabilité »,
> sous-titre « BSD, Trackdéchets ».
> **Statut : FOND et station produits le 30/09/2026, EN ATTENTE de relecture métier
> (`data-prototype` posé).** Sources consultées le 30/09/2026.
> Ligne maison : les mécanismes s'apprennent ; toute valeur non lue dans un texte
> officiel est omise et listée sous « À sourcer ».

## Objectif

À la fin de la station, l'étudiant sait dire quels papiers accompagnent un fluide
frigorigène du chargement à la filière (fiche d'intervention, registre de
l'équipement, bordereau BSFF dans Trackdéchets), qui les établit et les signe, à quel
moment un fluide récupéré devient un déchet tracé, et ce qu'un contrôle vérifie en
« remontant le fil ».

## Référentiel

- **TP TECVC, REAC TP-00133 — CP9 (installation de climatisation).** Justification :
  la recette d'une installation de climatisation ne se limite pas à la machine qui
  tourne ; le technicien d'études ou le chargé d'affaires réunit et contrôle les pièces
  qui prouvent où est passé le fluide.
- **Attestation d'aptitude 2025** (`packs/fluides/referentiel-2025.json`, arrêté du
  21 novembre 2025) : **1.00** (législation applicable), **4.02** (consulter le registre
  de l'équipement avant tout contrôle d'étanchéité), **4.09** (consigner les données
  dans le registre lors du contrôle d'étanchéité), **5.07** (consigner dans le
  registre tout réfrigérant récupéré ou ajouté), **5.08** (prescriptions et
  procédures de gestion, réutilisation, récupération, stockage et transport des
  réfrigérants).

## Fonds de l'enseignant consultés (inspiration, rien recopié)

RAG de HAL (`chercher-rag.js`) : planche « Deux papiers, deux rôles : CERFA 15497 et
BSFF (Trackdéchets) » (pack fluides), fond de la station `dechets-dangereux`
(écrans 3, 4, 6), guidance du TP en fluide réel (phase Traçabilité : registre + CERFA).
La présente station va plus loin : registre, acteurs, fluide → déchet, signatures,
lien fiche ↔ bordereau, contrôle.

## Déroulé des 8 écrans

1. **Un fluide n'est jamais « sans papier »** — deux documents se relaient : fiche
   d'intervention puis BSFF. *Visuel animé* `fil-du-fluide.svg` : cinq étapes, deux
   bandeaux, une goutte qui parcourt le fil.
2. **La fiche d'intervention** — une opération, une fiche ; contenu ; deux signatures
   au-delà d'un seuil de charge ; conservation. *Visuel fixe* `fiche-intervention.svg`.
3. **Le registre : la mémoire de l'équipement** — différence fiche / registre ;
   compétences 4.02, 4.09, 5.07. *Visuel animé* `registre-equipement.svg` (les lignes
   du carnet s'ajoutent).
4. **Qui est qui** — détenteur, opérateur, transporteur, distributeur, installation de
   traitement. *Visuel animé* `cinq-acteurs.svg` (les lignes apparaissent).
5. **Quand le fluide devient un déchet** — récupération intégrale, deux destins :
   réintroduit (fluide, pas de bordereau) ou déchet (bouteille + BSFF) ; bilan annuel de
   la filière. *Visuel animé* `du-fluide-au-dechet.svg` (deux gouttes, deux chemins).
6. **Le BSFF dans Trackdéchets : trois signatures** — émetteur, transporteur,
   installation de destination ; validation par signature électronique ; nouveau
   bordereau en cas de regroupement. *Visuel animé* `bsff-trackdechets.svg` (les
   signatures se posent une à une).
7. **Le lien entre la fiche et le bordereau** — quatre repères reportés ; SIRET du
   détenteur ; suivi par contenant. *Visuel fixe* `lien-fiche-bordereau.svg`.
8. **Bilan : ce que vérifie un contrôle** — cinq contrôles, sanctions, réflexe.
   *Visuel fixe* `bilan-tracabilite.svg`.

Total : **8 SVG, dont 5 animés** (SMIL autonome, sans script, état au repos = image
finale, boucle de 12 s avec temps de repos).

## Les 4 questions (quiz) et corrigés

**Q1 (écran 2).** Au-delà du seuil de charge, qui signe la fiche d'intervention ?
- a) L'opérateur seul, qui conserve l'original
- b) Le détenteur seul, qui conserve l'original
- c) L'opérateur et le détenteur, ensemble ✔
- d) L'opérateur, puis le distributeur du fluide

**Q2 (écran 5).** Le fluide récupéré est remis dans la même machine. Faut-il un BSFF ?
- a) Non : ce n'est pas un déchet, la fiche suffit ✔
- b) Oui : tout fluide récupéré passe par un BSFF
- c) Oui, mais seulement au-delà du seuil de charge
- d) Non : le BSFF ne concerne que les installations neuves

**Q3 (écran 6).** Qui clôt la chaîne du bordereau, après l'émetteur et le transporteur ?
- a) Le transporteur, dès qu'il a livré la bouteille
- b) L'opérateur, dès que la bouteille est remplie
- c) Le détenteur, en recevant le récépissé final
- d) L'installation qui reçoit et traite le fluide ✔

**Q4 (écran 4).** Qui peut émettre le premier bordereau d'un fluide usagé ?
- a) Le transporteur qui emporte la bouteille pleine
- b) L'opérateur qui collecte, ou le détenteur ✔
- c) L'installation qui traitera le fluide
- d) Trackdéchets lui-même, automatiquement

Bonnes réponses en positions 3, 1, 4, 2 ; aucune n'est la plus longue de façon systématique.

## Correspondances (liens réels)

`../fgaz-3/` (récupération obligatoire, registre) · `../aptitude-capacite/` (numéro
d'attestation de capacité) · `../dechets-dangereux/` (le BSD côté producteur) ·
`../dechets-responsabilites/` (prouver maillon par maillon). Stations de la vague
non liées : `en-378` (une station à part, pas de lien direct ici).

## Sources officielles (consultées le 30/09/2026)

- **Code de l'environnement, R. 543-75 à R. 543-123** (section 6, fluides
  frigorigènes), Légifrance :
  - R. 543-76 — définitions (détenteur : contrôle effectif du fonctionnement technique,
    propriétaire ou non ; opérateur : entreprise intervenant à titre professionnel) —
    https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033628884
  - R. 543-78 — recours à un opérateur titulaire de l'attestation de capacité —
    https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790649
  - R. 543-80 — le détenteur conserve au moins cinq ans les documents attestant les
    contrôles d'étanchéité et les réparations (lu dans la section 6 :
    https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006176997/ )
  - **R. 543-82 — fiche d'intervention** (signature conjointe au-delà de 3 kg de HCFC
    ou 5 t éq. CO₂ de HFC/PFC ; conservation de cinq ans au moins ; renvoi à un
    arrêté pour le contenu) —
    https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790617
  - R. 543-83 — documents, fiches et registres établis sous forme électronique
    (section 6 ci-dessus).
  - R. 543-88 — récupération de la totalité du fluide retiré —
    https://www.legifrance.gouv.fr/affichCodeArticle.do?categorieLien=cid&cidTexte=LEGITEXT000006074220&dateTexte=&idArticle=LEGIARTI000006839321
  - R. 543-92 — l'opérateur remet au distributeur les fluides qui ne peuvent être
    réintroduits ou dont la réutilisation est interdite (et les emballages), ou les
    fait traiter sous sa responsabilité — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839325
  - R. 543-98 — transmission annuelle à l'ADEME par distributeurs et producteurs des
    quantités mises sur le marché, stockées, reprises ou retraitées —
    https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790556
  - R. 543-123 — contraventions de 5^e classe (récupération, attestation de capacité,
    registres…) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790504
- **Code de l'environnement, R. 541-45** — système de gestion électronique des
  bordereaux de suivi de déchets (version en vigueur au 05/06/2026) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043308106
- **Arrêté du 29 février 2016** relatif à certains fluides frigorigènes et aux gaz à
  effet de serre fluorés, **article 11** (contenu de la fiche d'intervention ;
  Cerfa n° 15497), modifié par l'**arrêté du 26 juillet 2022** (Cerfa 15497 « (3) »,
  suppression de l'article 12, entrée en vigueur le 1^er janvier 2023) —
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046131667
- **Arrêté du 26 juillet 2022** définissant le contenu des déclarations au système de
  gestion électronique des bordereaux de suivi de déchets (article R. 541-45) pour les
  déchets dangereux de fluides frigorigènes (NOR TREP2221126A, JO du 4 août 2022,
  entrée en vigueur le 1^er janvier 2023 ; article 2 signature électronique et
  modifications enregistrées ; article 3 informations déclarées par l'émetteur, le
  transporteur, l'installation de destination, et nouveau bordereau lié en cas de
  regroupement ; article 5 récépissé) —
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046138697
- **Attestation d'aptitude 2025** : `packs/fluides/referentiel-2025.json` (arrêté du
  21 novembre 2025, NOR TECP2532494A) pour les codes 1.00, 4.02, 4.09, 5.07, 5.08.
- Sources secondaires (lecture d'appui, non citées comme texte) : OPPBTP « Droit de la
  prévention » (analyses des articles R. 543-82, R. 543-83, article 11 de l'arrêté de
  2016 et de l'arrêté du 26/07/2022, à jour en 2023) ; service Trackdéchets
  (https://trackdechets.beta.gouv.fr/ , FAQ https://faq.trackdechets.fr/fluides-frigorigenes/ ) ;
  note « La petite note sur les déchets de fluides frigorigènes », mars 2023,
  rédigée par l'équipe Trackdéchets (copie hébergée par un distributeur).

## À sourcer (rien de ceci n'est affirmé comme texte officiel dans la station)

1. **Registre d'équipement — règlement (UE) 2024/573** : article exact, contenu
   précis et durée de conservation du registre non lus (EUR-Lex inaccessible à la
   consultation). La station n'en donne que le principe et renvoie à F-Gaz 3.
2. **Renvois du Code aux catégories et règlements anciens** : R. 543-82 renvoie au
   règlement (UE) n° 517/2014 (abrogé par le 2024/573) ; l'article 11 de l'arrêté du
   29/02/2016 vise les catégories I à IV de l'arrêté du 30/06/2008. Vérifier la
   version en vigueur et l'alignement sur les catégories A1 à E de 2025.
3. **Projet de décret en consultation** (18/06 au 08/07/2026, mis en concordance avec
   F-Gaz III — source secondaire) : vérifier s'il est publié et s'il modifie
   R. 543-75 et suivants avant diffusion.
4. **Version du formulaire Cerfa 15497** en vigueur (l'arrêté du 26/07/2022 vise la
   version « (3) » ; le fonds de l'enseignant mentionne « *04 ») : à confirmer sur
   service-public.fr.
5. **Lien fiche → bordereau** (écran 7 : numéro de fiche, fluide, code postal, SIRET du
   détenteur ; gestion par contenant) : lu seulement dans la note de l'équipe
   Trackdéchets de mars 2023, non dans un texte réglementaire. À confirmer sur la
   documentation en ligne actuelle.
6. **Rôle du distributeur** (regroupement des bouteilles, nouveau bordereau vers le
   traitement) : R. 543-91 / R. 543-92 lus ; le rôle de regroupement repose sur la
   note Trackdéchets et sur l'article 3 de l'arrêté du 26/07/2022 (installation qui
   entrepose, regroupe ou reconditionne).
7. **Durées de conservation du bordereau électronique** (R. 541-45 : trois ans /
   cinq ans selon les acteurs, lues seulement pour la version papier des déchets
   radioactifs) : non affirmées pour le BSFF.
8. **R. 543-123** : liste précise des infractions et montants des amendes non lus ;
   la station dit seulement « contraventions de la 5^e classe ».
9. **Bilan annuel de l'opérateur** (déclaration annuelle propre à l'opérateur, hors
   R. 543-98 qui vise distributeurs et producteurs) : existence non établie ici, non
   affirmée.
10. **Qualification exacte d'un fluide « réutilisable » vs « déchet »** hors du cas de
    la réintroduction dans l'équipement d'origine (R. 543-92) : conditions détaillées
    non lues.
11. Normes payantes (NF EN 378) : non citées.

## Défaut connu

- Pas de MP3 fabriqué pour cette station : la voix du navigateur sert de filet, en
  attendant la fabrication edge-tts (les 12 narrations sont prêtes).
