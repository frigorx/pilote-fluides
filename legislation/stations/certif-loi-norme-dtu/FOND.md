# Station « Loi, norme ou DTU ? — qui oblige quoi » — FOND

> Réseau Législation · sous-ligne Certifications & normes (#3730a3) · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Tête de la sous-ligne.
> Sources consultées le **30/09/2026**. Normes payantes (NF, EN, DTU) : rien de leur texte
> n'est repris, seuls titre, objet et domaine publics. Rien n'est chiffré sans source.

## Objectif

L'étudiant sait classer une référence citée dans un dossier (CCTP, notice, offre) : texte qui
**oblige** (règlement, directive, loi, décret, arrêté), norme **volontaire** par principe, norme
**rendue obligatoire** par arrêté, DTU, avis technique. Il sait ce qu'est une **présomption de
conformité** et pose, ligne à ligne, la question : qu'est-ce qui oblige ?

## Notions

- Pyramide : droit de l'Union (règlement, directive) > loi > décret > arrêté ; norme, DTU, avis
  technique hors pyramide.
- Règlement : obligatoire dans tous ses éléments, directement applicable. Directive : lie l'État
  quant au résultat, forme et moyens laissés à l'État (transposition).
- Norme : application volontaire (décret 2009-697, art. 17) ; peut être rendue obligatoire par
  arrêté ; alors consultable gratuitement (condition confirmée par CE 28/07/2017 n° 402752).
- Présomption de conformité : NF C 15-100 (arrêté du 3 août 2016) ; norme harmonisée (référence
  publiée au JOUE).
- NF DTU : règles de l'art de mise en œuvre, norme française validée par l'AFNOR, obligatoire
  quand le marché y renvoie. Avis technique : évaluation volontaire du CSTB pour un procédé non
  traditionnel.
- Le contrat tient lieu de loi à ceux qui l'ont fait (Code civil, art. 1103).

## Référentiel — justification

**Hors REAC TP-00133 : culture professionnelle du technicien d'études et du chargé d'affaires.**
Savoir ce qui oblige dans un dossier n'est évalué par aucune des CP1 à CP10 ; en retenir une serait
artificiel. **Attestation d'aptitude 2025** (`packs/fluides/referentiel-2025.json`, arrêté du
21 novembre 2025) : **1.00** (connaissance élémentaire de la législation de l'Union européenne et
nationale applicable) et **11.03** (réglementations et normes de sécurité applicables aux
réfrigérants inflammables ou toxiques) — la station n'est pas fluidique, mais ses exemples (F-Gaz 3,
NF EN 378) le sont.

## Les 8 écrans

| # | Titre | Illustration | Animée |
|---|---|---|---|
| 1 | Qui oblige : la pyramide des textes | `pyramide-des-textes.svg` | oui (étages posés du bas vers le haut) |
| 2 | Règlement ou directive : ce qui s'applique tel quel | `reglement-directive.svg` | oui (la flèche directe se trace, puis les trois étapes) |
| 3 | La norme : volontaire par principe | `norme-volontaire.svg` | non |
| 4 | La flèche « rend obligatoire » | `rend-obligatoire.svg` | oui (l'arrêté, la flèche, la norme en trait plein) |
| 5 | La présomption de conformité : la voie sûre | `presomption.svg` | non |
| 6 | Le DTU et l'avis technique : le marché, pas la loi | `dtu-avis-technique.svg` | non |
| 7 | Lire un CCTP : trois questions par ligne | `lire-un-cctp.svg` | oui (étiquettes posées une à une) |
| 8 | Bilan et le réflexe | `bilan-loi-norme-dtu.svg` | non |

Écrans 1 à 8 : texte écrit dans `index.html` (chaque écran porte son `data-narration`, 50 à 110 mots,
qui décrit ce que l'on voit). Le CCTP de l'écran 7 est un **exemple fictif** (dit à l'écran).

## Les 4 questions

| Q | Écran | Question | Bonne réponse (rang) |
|---|---|---|---|
| Q1 | 2 | Règlement ou directive : quelle différence pour l'entreprise ? | Le règlement s'applique tel quel ; la directive passe par un texte français (3e) |
| Q2 | 4 | Qu'est-ce qui rend une norme d'application obligatoire ? | Un arrêté qui la rend d'application obligatoire (1re) |
| Q3 | 5 | Logement neuf conçu selon la NF C 15-100 : que déduire ? | Présumé conforme aux objectifs de l'arrêté de 2016 (4e) |
| Q4 | 7 | CCTP renvoyant au NF DTU du lot, sans arrêté : s'impose-t-il ? | Oui : le marché y renvoie, clause du contrat (2e) |

Leurres = erreurs réelles : inversion règlement/directive, « facultatif », publication au catalogue
AFNOR = obligation, ancien régime de 1969, « une norme n'a aucun effet », « le DTU a valeur de loi ».
Corrigés dans `index.html` (`data-explication`) et `mission.json`.

## Correspondances

- `../certif-marquage-ce/` — norme harmonisée et présomption de conformité, côté produit.
- `../certif-garanties/` — ce qui se passe quand la règle de l'art n'a pas été suivie.
- `../elec-nf-c-15-100/` — l'exemple de la présomption (de 1969 à 2016).
- `../en-378/` — norme de sécurité frigorifique qui s'impose par texte ou par contrat.
- Lien en ligne dans l'écran 2 : `../fgaz-3/` (règlement (UE) 2024/573).

## Sources officielles

1. **Décret n° 2009-697 du 16 juin 2009 relatif à la normalisation**, JORF n° 0138 du 17 juin 2009,
   **art. 17** : normes d'application volontaire, rendues d'application obligatoire « par arrêté signé
   du ministre chargé de l'industrie et du ou des ministres intéressés » ; les normes rendues
   obligatoires sont consultables gratuitement sur le site de l'AFNOR. Formulation lue dans la
   **réponse ministérielle à la question écrite n° 95669** (Assemblée nationale, 14e législature,
   JO du 5 juillet 2016, p. 6324) :
   https://www.assemblee-nationale.fr/dyn/14/questions/QANR5L14QE95669.pdf
   (titre et date du décret : marche-public.fr,
   https://www.marche-public.fr/contrats-publics/Normalisation-publication-decret-2009-697.htm).
   Le texte consolidé sur Légifrance n'a **pas** pu être lu (page dynamique) : voir « À sourcer ».
2. **Conseil d'État, 28 juillet 2017, n° 402752** — arrêté relatif aux fluides frigorigènes ; article 2
   rendant obligatoires les NF EN 378-2:2012 et 378-3:2012 annulé (accès libre et gratuit non
   garanti) ; le ministre de l'environnement (art. R. 543-81 du code de l'environnement) peut
   renvoyer à des normes en dérogeant à la compétence du ministre de l'industrie de l'art. 17.
   Lu dans la fiche de jurisprudence de la DREAL Auvergne-Rhône-Alpes (source secondaire officielle) :
   https://www.auvergne-rhone-alpes.developpement-durable.gouv.fr/IMG/pdf/4185-fj-2017-opposabilitenormesnf-v2.pdf
3. **Commission européenne, « Harmonised standards »** — l'usage reste volontaire, l'opérateur est
   libre de choisir une autre solution technique ; la publication des références au JOUE est la
   condition de la présomption de conformité ou d'un autre effet juridique :
   https://single-market-economy.ec.europa.eu/single-market/european-standards/harmonised-standards_en
4. **Arrêté du 3 août 2016** (installations électriques des bâtiments d'habitation), NOR LHAL1522022A,
   art. 4 (présomption de conformité, solution équivalente) et art. 6 (abrogation de l'arrêté du
   22 octobre 1969) — repris de la station `elec-nf-c-15-100` (FOND, lu sur Légifrance le 30/09/2026) :
   https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000032975211
5. **Constitution du 4 octobre 1958**, art. 34 (« La loi fixe les règles concernant… »), art. 37
   (« Les matières autres que celles qui sont du domaine de la loi ont un caractère réglementaire »),
   art. 55 (autorité supérieure des traités) :
   https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/texte-integral-de-la-constitution-du-4-octobre-1958-en-vigueur
6. **Code civil, art. 1103** (« Les contrats légalement formés tiennent lieu de loi à ceux qui les ont
   faits »), issu de l'ordonnance n° 2016-131 du 10 février 2016 :
   https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032040777
7. **TFUE, art. 288** (règlement : portée générale, obligatoire dans tous ses éléments, directement
   applicable ; directive : lie l'État quant au résultat, forme et moyens laissés aux autorités
   nationales) — formulation lue via le glossaire EUR-Lex et un résumé secondaire, **pas** sur le
   texte du traité lui-même (EUR-Lex a refusé l'accès automatisé) :
   https://eur-lex.europa.eu/summary/glossary/community_legal_instruments.html?locale=fr
8. **Règlement (UE) 2024/573** (F-Gaz 3) et **directive 2014/68/UE** (équipements sous pression) :
   références reprises des stations `fgaz-3` et `desp-*` du réseau ; l'arrêté du 21 novembre 2025
   (JORF du 10 décembre 2025, NOR TECP2532494A) vient de `fgaz-3` et `aptitude-capacite`.
9. **NF DTU** : FFB, « NF DTU et normes » (règles de l'art, prescriptions de mise en œuvre, référence
   reconnue par la profession) :
   https://www.ffbatiment.fr/techniques-batiment/normalisation-regles-de-lart/nf-dtu-normes ;
   définition et élaboration (professionnels, validation AFNOR) : https://www.obat.fr/blog/nf-dtu
   (source **secondaire**).
10. **Avis technique du CSTB** — évaluation volontaire à la demande du demandeur, produits ou procédés
    non traditionnels, sans changer la répartition des responsabilités ; enquête de technique nouvelle :
    CSTB (présentation aux DREAL, 2013)
    https://www.pays-de-la-loire.developpement-durable.gouv.fr/IMG/pdf/CSTB__Maxime_Roger_2013_10_08_Coll_DREAL-2.pdf

## À sourcer (rien de ceci n'est dans la station)

- **Texte consolidé de l'art. 17 du décret n° 2009-697** et **date de sa dernière version** : la
  formulation vient d'une réponse ministérielle (2016) ; relire Légifrance (page dynamique, non lisible
  par outil). Le décret a pu être modifié depuis.
- **TFUE art. 288** lu sur EUR-Lex directement (accès automatisé refusé) ; **règlement (UE) n° 1025/2012**
  (définition de la norme harmonisée, art. 2) non lu au texte : la station s'appuie sur la page de la
  Commission européenne.
- **Statut actuel de la NF EN 378 en droit français** : quel arrêté en vigueur, le cas échéant, la
  rend obligatoire aujourd'hui pour les contrôles d'étanchéité ? La station ne raconte que
  l'annulation de 2017, sans affirmer l'état présent.
- **Harmonisation de la NF EN 378-2** : « rattachée aux directives équipements sous pression et
  machines » repris de la station `en-378`, dont la source est secondaire (Institute of Refrigeration) ;
  à vérifier sur la liste des références publiées au JOUE.
- **Force contractuelle des NF DTU** : le mécanisme (le marché y renvoie, art. 1103 du Code civil) est
  enseigné ; le fondement propre aux **marchés publics** (Code de la commande publique, CCAG-Travaux,
  références aux normes dans les spécifications techniques) n'est pas lu — non affirmé.
- **Structure d'un NF DTU** (CCT, CGM, CCS) : non reprise faute de source officielle.
- **Avis techniques et assurance** (lien avec la garantie décennale) : renvoyé à la station
  `certif-garanties`, non traité ici.
- **Relecture métier** : `data-prototype` posé, aucune relecture par un professionnel.

## Défauts connus / choix assumés

- Les MP3 des 12 narrations ne sont pas fabriqués (voix du navigateur en filet).
- Les codes 1.00 et 11.03 sont retenus pour les exemples fluidiques ; le cœur de la station reste
  hors REAC.
- Quatre SVG animés en SMIL (autonomes, sans script, état au repos = image finale, boucle de 12 s).
