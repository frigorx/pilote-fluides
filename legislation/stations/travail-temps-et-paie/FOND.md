# Station « Temps & paie » — FOND

> Réseau Législation · sous-ligne Droit du travail (#9d174d) · niveau BTS.
> Slug : `travail-temps-et-paie` · plan : « Temps & paie — durée, heures sup ».
> Mini-station ≤ 12 min : 8 écrans + 4 questions. Produite le 30/09/2026.
> `data-prototype` posé : relecture métier à faire.

## Objectif

À la fin de la station, l'étudiant sait dire **quelles heures comptent** (travail effectif),
distinguer **durée légale** (seuil) et **durées maximales** (plafonds), repérer le moment où
une heure devient **supplémentaire** et comment elle est majorée (règle du Code, ce que la
convention peut changer), connaître les **repos**, situer le **trajet** et le **grand
déplacement** dans le bâtiment, **lire une fiche de paie** de haut en bas et compter ses
**congés payés**. Aucun montant de SMIC, aucun taux de cotisation : ils changent chaque année.

## Référentiel

**Hors REAC : culture professionnelle du technicien et du chargé d'affaires.** Aucune des
compétences CP1 à CP10 du TP TECVC (REAC TP-00133) ne porte sur le temps de travail ni sur la
paie ; on n'en invente pas. Pas de codes d'attestation d'aptitude 2025 (station non fluidique).

## Notions

Travail effectif · durée légale (seuil) · durées maximales (jour, semaine, moyenne sur 12
semaines) · heure supplémentaire · majoration (défaut du Code / accord, plancher 10 %) ·
contingent annuel et contrepartie obligatoire en repos · pause, repos quotidien, repos
hebdomadaire · trajet et déplacement professionnel · petit / grand déplacement (bâtiment,
ouvriers) · fiche de paie (brut, cotisations part salarié / part employeur, net à payer avant
impôt, net imposable, prélèvement à la source) · congés payés (2,5 j ouvrables / mois, période
d'acquisition, caisse de congés du BTP, indemnité).

## Déroulé des 8 écrans

| # | Titre | Illustration | Animée |
|---|---|---|---|
| 1 | Ce qui compte : le temps de travail effectif | `travail-effectif.svg` | non |
| 2 | Un seuil, puis des plafonds | `plafonds.svg` | non |
| 3 | La semaine qui se remplit | `semaine-qui-se-remplit.svg` | **oui** (carrés d'une heure, bascule à la 36e) |
| 4 | Heures supplémentaires : la majoration, et ce que la convention change | `heures-sup-majoration.svg` | **oui** (jetons qui basculent, échelle de décision) |
| 5 | Pauses et repos | `repos.svg` | non |
| 6 | Trajet, petit et grand déplacement dans le bâtiment | `deplacements.svg` | non |
| 7 | Lire une fiche de paie, de haut en bas | `fiche-de-paie.svg` | **oui** (cadre qui descend bande par bande) |
| 8 | Les congés payés — et le réflexe | `conges-payes.svg` | non |

Animations : SMIL autonome, sans script, boucle 14 s avec temps de repos ; **l'état au repos
est l'image finale** (aucun `opacity`/`fill` de repos modifié dans les attributs), rien
d'essentiel n'existe que dans l'animation.

### Contenu et sources écran par écran

1. **Travail effectif** — L. 3121-1 (à disposition, directives, sans vaquer librement) ;
   L. 3121-4 (trajet non travail effectif, contrepartie au-delà du trajet normal) ; L. 3121-2
   (pause et restauration = travail effectif si critères L. 3121-1) ; L. 3121-3 (habillage
   imposé, contreparties).
2. **Seuil et plafonds** — L. 3121-27 (35 h/semaine, temps complet) ; L. 3121-20 (48 h) ;
   L. 3121-22 (44 h en moyenne sur 12 semaines, sauf L. 3121-23 à 25) ; L. 3121-18 (10 h/jour
   sauf dérogation, urgence, L. 3121-19) ; L. 3121-19 (accord : jusqu'à 12 h) ; L. 3162-1
   (moins de 18 ans : 8 h/jour, 35 h/semaine, dérogations encadrées).
3. **Semaine** — L. 3121-35 (lundi 0 h → dimanche 24 h, sauf accord), L. 3121-32 (accord :
   autre période de sept jours), L. 3121-28 (toute heure au-delà de la durée légale = heure
   supplémentaire). Exemple : 5 × 9 h = 45 h ; cumul 27 h fin mercredi, 36e heure = dernière
   heure du jeudi ; 10 h supplémentaires (1 jeudi + 9 vendredi). *Exemple pédagogique, pas une
   valeur réglementaire.*
4. **Majoration** — L. 3121-36 (à défaut d'accord : 25 % pour chacune des 8 premières, 50 %
   ensuite) ; L. 3121-33 (accord d'entreprise/établissement, sinon de branche : taux ≥ 10 %,
   contingent, contrepartie obligatoire en repos ≥ 50 % des heures au-delà du contingent
   pour ≤ 20 salariés, 100 % au-delà — *lu, non repris à l'écran*) ; L. 3121-30 (contingent,
   contrepartie) ; L. 3121-28 (repos compensateur équivalent). Bâtiment ouvriers : 25 % puis
   50 %, art. 3-17 (fiche DREETS). Calcul : 8 × 1,25 + 2 × 1,5 = 13 ; 35 + 13 = 48 h de
   salaire pour 45 h travaillées.
5. **Repos** — L. 3121-16 (pause ≥ 20 min consécutives dès 6 h de travail quotidien) ;
   L. 3131-1 (11 h consécutives, sauf L. 3131-2, L. 3131-3, urgence) ; L. 3132-2 (24 h
   consécutives + repos quotidien) ; L. 3132-1 (pas plus de 6 jours/semaine) ; L. 3132-3
   (dimanche). Bâtiment ouvriers : 5 jours, repos 2 jours consécutifs (art. 3-21), samedi/lundi
   travaillés pour raisons impératives contre repos compensateur (art. 3-22) — fiche DREETS.
6. **Déplacements** — L. 3121-4 et L. 3121-7 (contreparties fixées par convention/accord) ;
   CCN ouvriers du bâtiment IDCC 1596 et 1597, titre VIII : petits déplacements art. 8-11 à
   8-20 (indemnités forfaitaires de trajet, de frais de transport, de repas ; zones
   concentriques autour du siège) ; grands déplacements art. 8-21 à 8-29 (définition art.
   8-21 : chantier métropolitain dont l'éloignement interdit, compte tenu des transports en
   commun, de regagner chaque soir la résidence déclarée à l'embauche ; indemnité journalière
   logement + nourriture ; voyage de retour périodique payé ; trajet indemnisé) — le tout lu
   dans la fiche DREETS (mise à jour février 2024), qui précise que les avenants du 7 mars
   2018 ont été suspendus et que les textes du 8 octobre 1990 restent applicables. **Les
   distances, montants, périodicités et taux de la fiche ne sont pas repris.**
7. **Fiche de paie** — L. 3243-2 (remise à chaque paiement, électronique sauf opposition) ;
   L. 3243-4 (double conservé 5 ans par l'employeur) ; R. 3243-1 (mentions : heures avec
   taux, brut, cotisations et assiette, retenue à la source, somme reçue, date de paiement,
   congés) ; R. 3243-2 (modèle regroupé par arrêté) ; service-public.fr F559 (zones ;
   conserver la fiche sans limite de durée ; contestation 3 ans ; net imposable = base du
   prélèvement à la source ; net à payer avant impôt distinct).
8. **Congés** — L. 3141-3 (2,5 j ouvrables/mois, max 30) ; L. 3141-13 (période de prise
   incluant 1er mai–31 oct.) ; L. 3141-17 (24 j ouvrables d'un seul tenant) ; L. 3141-24
   (indemnité : 1/10 de la rémunération brute totale, plancher = maintien) ; L. 3141-32
   (caisses de congés) ; L. 3141-5 (mise à jour 24/12/2025 : maladie non professionnelle
   assimilée) ; service-public.fr F2258 (période 1er juin–31 mai ; caisse du BTP : 1er avril–
   31 mars ; maladie non pro : 2 j ouvrables/mois ; apprenti : 5 semaines ; ordre des départs
   communiqué au moins un mois avant). Jours ouvrables « autres que dimanche et jours fériés » :
   fiche DREETS.

## Les 4 questions (corrigés)

1. **Écran 3** — 41 heures dans la semaine : combien d'heures supplémentaires ?
   *Bonne : « Six : toutes celles au-delà de 35 heures ».* Leurres : « Aucune : sous le
   plafond de 48 h » (confusion seuil/plafond) ; « Une seule : au-delà de 40 h » (mythe des 40 h) ;
   « Quarante et une » (semaine entière majorée). Corrigé : 41 − 35 = 6 (L. 3121-28).
2. **Écran 4** — à défaut d'accord, deux heures supplémentaires : majoration ?
   *Bonne : « 25 % pour chacune des deux ».* Leurres : 10 % (plancher d'un accord, pris pour le
   taux légal) ; 50 % pour toutes ; remplacement par un repos. Corrigé : L. 3121-36, L. 3121-33.
3. **Écran 6** — chantier plus loin que le trajet habituel : le trajet en plus…
   *Bonne : « N'est pas du travail effectif, mais ouvre une contrepartie ».* Leurres : travail
   effectif minute par minute ; rien ; payé si l'employeur le décide. Corrigé : L. 3121-4, 3121-7.
4. **Écran 7** — base de l'impôt prélevé à la source ?
   *Bonne : « Le net imposable ».* Leurres : brut ; net à payer avant impôt ; total versé par
   l'employeur. Corrigé : service-public.fr F559.

Rang des bonnes réponses : 3 · 1 · 4 · 2 (jamais deux fois de suite au même rang, jamais la
plus longue à coup sûr).

## Correspondances (maillage)

- `../travail-le-contrat/` — l'horaire de référence et la convention applicable, repris sur la fiche.
- `../travail-droits-devoirs/` — durées maximales et repos vus comme des droits.
- `../travail-s-installer/` — le socle du salariat quand on s'installe à son compte.
- `../risques-epi/` — tenue imposée (habillage : contrepartie, L. 3121-3).

## Sources officielles (consultées le 30/09/2026)

- Code du travail numérique — https://code.travail.gouv.fr/code-du-travail/l3121-27 (et
  `l3121-1`, `-2`, `-3`, `-4`, `-7`, `-16`, `-18`, `-19`, `-20`, `-22`, `-28`, `-30`, `-32`,
  `-33` [v. 01/01/2020], `-35`, `-36`, `l3131-1`, `l3132-1`, `-2`, `-3`, `l3162-1`
  [v. 01/01/2019], `l3141-3`, `-5` [v. 24/12/2025], `-13`, `-17`, `-24` [v. 24/04/2024], `-32`,
  `l3243-2`, `l3243-4`, `r3243-1` [v. 01/01/2024], `r3243-2`). Sauf mention, versions du 10/08/2016
  (ou antérieures) inchangées depuis.
- service-public.fr — « Fiche de paie » (vérifié le 01/06/2026) :
  https://www.service-public.fr/particuliers/vosdroits/F559 ; « Congés payés du salarié dans
  le secteur privé » (vérifié le 30/04/2026) : https://www.service-public.fr/particuliers/vosdroits/F2258
- DREETS Grand Est, « Accès au droit — Secteur BÂTIMENT (ouvriers) », fiche mise à jour
  février 2024 (CCN IDCC 1596 et 1597) :
  https://grand-est.dreets.gouv.fr/sites/grand-est.dreets.gouv.fr/IMG/pdf/fiche2023_batiment-ouvriers.pdf

## À sourcer (omis, jamais approximé)

- **Textes consolidés des conventions du bâtiment (Légifrance)** : les dispositions citées (art.
  3-13, 3-14, 3-17, 3-21, 3-22, 8-11 à 8-29) sont lues dans la fiche DREETS (février 2024), pas
  dans le texte consolidé ; statut actuel des avenants du 7 mars 2018 à vérifier.
- **Contingent annuel d'heures supplémentaires** : la fiche DREETS en donne une valeur pour les
  ouvriers du bâtiment (art. 3-13) ; non reprise — à lire sur le texte, pour chaque convention.
- **Convention ETAM du bâtiment (IDCC 2609)** et **convention des bureaux d'études (IDCC 1486)** :
  durée du travail, heures supplémentaires, déplacements, congés — non lues. C'est pourtant
  celle du technicien d'études : c'est le premier point à compléter.
- Montants, zones (distances) et taux des indemnités de trajet, de transport, de repas et de
  grand déplacement (avenants régionaux) ; périodicités des voyages de retour.
- Taux des cotisations, SMIC, plafond de la sécurité sociale : volontairement absents.
- Caisse de congés payés du BTP : organisme, modalités de versement de l'indemnité.
- Non traités (hors périmètre de 8 écrans) : forfait en jours / cadres, temps partiel,
  annualisation et aménagement du temps de travail, travail de nuit, dimanche, jours fériés,
  exonération fiscale et sociale des heures supplémentaires, net social, jours de
  fractionnement, congés supplémentaires (âge, enfants, ancienneté), rémunération des apprentis.
- Durée du travail des apprentis majeurs : supposée de droit commun, non lue explicitement.

## Notes de fabrication

- Les cartes de la station avertissent que les règles de déplacement lues sont celles des
  **ouvriers** ; un technicien ou chargé d'affaires doit lire sa propre convention.
- Voix : narrations écrites (50–110 mots par écran), vouvoiement, chiffres en toutes lettres.
  MP3 à fabriquer (chaîne edge-tts) après relecture ; sans eux, la voix du navigateur sert de filet.
- Couleur de la sous-ligne : `#9d174d`, posée dans `styles.css` (le script
  `outils/couleur-des-sous-lignes.mjs` la réalignerait à l'identique).
