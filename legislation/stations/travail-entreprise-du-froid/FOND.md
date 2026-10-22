# Station « L'entreprise du froid » — FOND à valider

> Réseau Législation · sous-ligne Droit du travail (#9d174d). Slug `travail-entreprise-du-froid`.
> Mini-station : 8 écrans + 4 questions. **Statut : produite le 19/10/2026, EN ATTENTE de relecture métier (`data-prototype`).** Sources consultées le 19/10/2026.
> Station générique : aucun diplôme dans le surtitre, la description ni les narrations ; codes dans « Sert notamment pour ».

## Objectif

Savoir dire qui fait quoi dans une entreprise du froid, ce qu'il lui faut pour toucher à un fluide (attestation de capacité, techniciens attestés, outillage),
ce qu'elle doit faire chaque année, ses assurances, ce que sont les qualifications (RGE, QualiPAC, Qualifroid), et qui répond de quoi.

## Codes affichés (libellés exacts de `BAC_MFER_2028.json`)

- **Bac Pro MFER (2028)** : S1.1 « l'entreprise » ; S1.5 « les qualifications, garanties et responsabilités ».
- Cadrage du référentiel (arrêté du 28 juillet 2026, annexe III, `livre-mfer/referentiel/legifrance-arrete-2026-07-28-MFER.txt`) :
  S1.1 = identifier la fonction d'un personnel à partir d'un organigramme, décrire les fonctions qui structurent l'entreprise ;
  S1.5 = responsable de l'ouvrage jusqu'à la réception, parfait achèvement, décennale, responsabilité civile ; qualifications des personnels (aptitude) et des entreprises (attestation de capacité, QualiFroid, QualiClima).

## Déroulé des 8 écrans

1. Qui fait quoi — `organigramme-type.svg` (animé). Les quatre fonctions (dirigeant, chargé d'affaires, administratif, techniciens) sont des **fonctions types** du vocabulaire courant d'une PME, pas un texte officiel ; le référentiel demande seulement de décrire les fonctions et lire un organigramme.
2. L'attestation de capacité — `capacite-organisme.svg` (animé).
3. Ce que l'entreprise doit prouver — `trois-preuves.svg`.
4. Après l'attestation : déclarer, prévenir, être contrôlé — `frise-obligations.svg` (animé).
5. Les assurances — `assurances.svg` (animé).
6. Les qualifications — `quatre-papiers.svg`.
7. Qui répond de quoi — `avant-apres-reception.svg` (animé : barres à la même échelle).
8. Bilan : check-list — `checklist-entreprise.svg` (animé).

8 SVG, dont 5 animés.

## Les 4 questions (bonnes réponses en position 2, 3, 1, 4)

1. Recharger une clim : obligatoire ? -> attestation de capacité d'un organisme agréé (R. 543-99).
2. Capacité de l'entreprise, technicien sans aptitude -> non, aptitude personnelle (R. 543-106).
3. Technicien attesté qui part -> prévenir l'organisme dans le mois (R. 543-102).
4. Décennale : quand la prouver ? -> à l'ouverture de chaque chantier (L. 241-1).

## Correspondances

`../aptitude-capacite/`, `../travail-s-installer/`, `../certif-rge-qualipac/`, `../certif-garanties/`.

## Sources (consultées le 19/10/2026)

- **Code de l'environnement** (consolidation du 07/10/2026) : R. 543-76 https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033628884 ; R. 543-78 https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790649 ; **R. 543-99** (attestation de capacité : organisme agréé, par établissement, 5 ans au plus, types d'équipements et d'activités) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839333 ;
  R. 543-100 (déclaration annuelle) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023875660 ; R. 543-101 (suspension si pas de déclaration) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839335 ; R. 543-102 (informer dans le délai d'un mois) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839336 ;
  R. 543-103 (vérification de l'outillage) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839337 ; R. 543-104 (retrait) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839338 ; **R. 543-106** (capacité professionnelle = personnes titulaires d'une attestation d'aptitude) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790547 ; R. 543-123 (contravention de 5e classe, 9° : opérateur sans attestation) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790504.
- **Arrêté du 21 novembre 2025 relatif à la délivrance des attestations de capacité** (JO n° 286 du 6 décembre 2025) : texte lu sur la base AIDA de l'INERIS https://aida.ineris.fr/reglementation/arrete-211125-relatif-a-delivrance-attestations-capacite-operateurs-prevues-a —
  art. 1 (dossier : liste nominative des intervenants avec aptitudes, outillages : types, quantités, justificatifs, dernière vérification ; déclaration annuelle au plus tard le 31 janvier ; information dans le mois), art. 2 (délivrée dans les 2 mois, 5 ans au plus, pour l'établissement),
  art. 3 (visite de contrôle ; mise en conformité sous 30 jours, sinon retrait), art. 9 (obligatoire le 01/01/2027 ; arrêté du 30/06/2008 abrogé au 31/12/2026). Les annexes ne sont pas lues.
- **Code des assurances** (consolidation du 20/08/2026) : L. 241-1 (décennale, justification à l'ouverture de tout chantier) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031010281 ; L. 243-2 (attestation jointe aux devis et factures) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031010272 ; L. 242-1 (dommages-ouvrage souscrite par le maître d'ouvrage avant l'ouverture du chantier) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019265425.
- **Code civil** : 1240 (réparer le dommage causé) ; 1242 (maîtres et commettants, dommage causé par leurs préposés) ; 1792, 1792-4-1 (décennale, dix ans), 1792-6 (réception, parfait achèvement un an) — mêmes articles que la station `certif-garanties` (liens dans son FOND).
- **RGE / QualiPAC** : FOND de la station `certif-rge-qualipac` (ministère de la Transition écologique, ADEME, France Rénov', Qualit'EnR). **Qualifroid / Qualiclima** : Qualiclimafroid, association délivrant ces qualifications d'entreprise, https://www.batiweb.com/actualites/vie-des-societes/qualiclimafroid-fait-evoluer-ses-qualifications-pour-plus-de-simplicite-35590 (publié 22/11/2019, mis à jour 01/05/2025) ; cités comme exemples par le référentiel.
- Assurance « responsabilité civile professionnelle » : fiche INPI « Climaticien » et service-public F23668, cités dans le FOND de `travail-s-installer` (déjà relus par Franck).

## Corrections du 22/10 (P1)

- Écrans 2, 3, 5, 6 : qui délivre quoi est écrit avant la mission : organisme agréé (R. 543-108, délivré par le ministre chargé de l'environnement), attestation d'aptitude par un organisme certifié (R. 543-106), décennale et RC par un assureur. Le tableau de l'écran 6 est repris en liste HTML.

## À sourcer (non affirmé)

1. **Les « trois piliers » de la station `aptitude-capacite` (personnel, outillage, procédures)** : le texte lu parle du personnel (aptitude), de l'outillage et de la déclaration annuelle ; le mot « procédures » n'y figure pas (annexes non lues). Cette station dit « techniciens, outillage, déclaration » : à harmoniser par Franck.
2. **Fonctions types d'une entreprise** (écran 1) : non réglementaires.
3. **Date du 31 janvier** : arrêté du 21/11/2025, obligatoire seulement à partir du 01/01/2027 ; avant, arrêté du 30/06/2008 (non lu).
4. **Annexes de l'arrêté de capacité** (contenu exact des outillages exigés) : non lues.
5. **Qualifications Qualifroid / Qualiclima** : conditions d'obtention non lues (site de l'association inaccessible).
6. **RC professionnelle** : obligation selon l'activité non tranchée ; la station dit seulement qu'une assurance RC pro couvre ces dommages.
7. Liste publique des opérateurs attestés (ADEME, data.gouv.fr « REP-GF ») : repérée, non reprise (date de validité ambiguë dans sa description).

## À vérifier par Franck

- Harmonisation « procédures » avec `aptitude-capacite` (point 1).
- Aucune station ne change de contenu : seules des correspondances et des codes ont été ajoutés à `aptitude-capacite` et `travail-s-installer`.
