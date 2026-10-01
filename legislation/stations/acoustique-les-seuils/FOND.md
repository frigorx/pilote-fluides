# Station « Les seuils » — FOND

> Réseau Législation · sous-ligne **Acoustique** (#6d28d9) · niveau BTS · slug `acoustique-les-seuils`.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Sous-titre : « voisinage, émergence ».
> Fond rédigé le 30/09/2026. **Aucune valeur réglementaire qui ne soit lue dans une source
> officielle citée plus bas.** Les niveaux des exemples (35, 41, 44, 37, 24, 86 dB(A)…) sont des
> **chiffres d'école**, jamais des valeurs réglementaires.

## Objectif

Savoir définir l'émergence (bruit ambiant moins bruit résiduel), lire les valeurs limites de jour
et de nuit avec leur terme correctif, dire quand l'émergence n'est pas recherchée, nommer ceux qui
constatent et ce qui peut suivre, et situer le bruit au travail (valeurs d'exposition du Code du
travail) comme un autre régime.

## Référentiel

**TP TECVC, REAC TP-00133 : CP9 (climatisation) et CP7 (ventilation tertiaire).**
Justification : le groupe froid, la pompe à chaleur ou le ventilateur que prescrit le technicien
d'études est un « équipement d'activité professionnelle » dont le bruit est jugé par l'émergence
globale et spectrale (R. 1336-6 al. 2). La partie « bruit au travail » (R. 4431-2) n'est adossée à
aucune compétence CP1 à CP10 : **culture professionnelle du technicien et du chargé d'affaires,
hors REAC.** Pas de codes d'attestation d'aptitude 2025 (station non fluidique).

## Notions

- Le principe : aucun bruit particulier ne doit, par sa durée, sa répétition ou son intensité,
  porter atteinte à la tranquillité du voisinage ou à la santé (R. 1336-5).
- Champ et exclusions (R. 1336-4), chantiers (R. 1336-10).
- L'**émergence globale** = niveau ambiant (avec le bruit particulier) − niveau résiduel (sans lui)
  (R. 1336-7 al. 1).
- Valeurs limites : **5 dB(A) le jour (7 h–22 h), 3 dB(A) la nuit (22 h–7 h)** + terme correctif
  fonction de la durée cumulée d'apparition (R. 1336-7 al. 2).
- **Terme correctif** : 6 (≤ 1 min) · 5 (> 1 à 5 min) · 4 (> 5 à 20 min) · 3 (> 20 min à 2 h) ·
  2 (> 2 à 4 h) · 1 (> 4 à 8 h) · 0 (> 8 h) (R. 1336-7). (Détail non repris à l'écran : la durée
  de mesure du bruit ambiant est étendue à 10 secondes quand la durée cumulée est < 10 s.)
- **Seuil d'application** : l'émergence n'est recherchée que si le niveau ambiant mesuré est > 25 dB(A)
  (pièces principales d'un logement, fenêtres ouvertes ou fermées) ou > 30 dB(A) (autres cas)
  (R. 1336-6 al. 3).
- **Émergence spectrale** (équipements d'activités professionnelles, perçu dans les pièces
  principales d'un logement) : 7 dB en bandes d'octave 125 et 250 Hz ; 5 dB en 500, 1 000, 2 000,
  4 000 Hz (R. 1336-6 al. 2 et R. 1336-8).
- Qui constate : OPJ/APJ dont les maires, inspecteurs de l'environnement, agents de santé, agents
  communaux habilités et assermentés (R. 1337-10-2 ; L. 571-18 C. env.). Mesure : arrêté du
  5/12/2006, norme NF S 31-010 (objet seulement).
- Sanctions : R. 1337-6 (contravention de 5e classe, activité professionnelle qui dépasse
  l'émergence globale ou spectrale) ; R. 1337-7 (3e classe, autres bruits particuliers) ; mesures
  administratives R. 1336-11 (renvoi L. 171-8 C. env.).
- **Bruit au travail** (Code du travail) : R. 4431-2 — niveau d'exposition quotidienne : 80 / 85 / 87 dB(A)
  (inférieure / supérieure / limite) ; crête : 135 / 137 / 140 dB(C). R. 4433-1 (évaluer, mesurer),
  R. 4432-1 (réduire), R. 4434-7 (protecteurs : à disposition, port effectif).

## Déroulé des 8 écrans

| Écran | Titre | Illustration | Animée |
|---|---|---|---|
| 1 | Un bruit ne doit pas gêner le voisin | `principe-voisinage.svg` | non |
| 2 | L'émergence : deux mesures, une différence | `emergence-deux-niveaux.svg` | **oui** |
| 3 | Les valeurs limites : cinq le jour, trois la nuit | `limites-jour-nuit.svg` | non |
| 4 | Le terme correctif : plus le bruit dure, moins on le tolère | `terme-correctif-duree.svg` | **oui** |
| 5 | Le seuil d'application et l'émergence spectrale | `seuil-et-spectrale.svg` | non |
| 6 | Qui constate, et ce qui peut suivre | `constater-sanctionner.svg` | **oui** |
| 7 | Le bruit au travail : trois valeurs d'exposition | `bruit-au-travail.svg` | **oui** |
| 8 | Bilan et le réflexe | `bilan-deux-regimes.svg` | non |

Le réflexe : **connaître le bruit résiduel avant d'installer la machine.**

## Les 4 questions et corrigés

1. (écran 2) 44 dB(A) machine en marche, 37 à l'arrêt : émergence ? → **7 dB(A)**, l'écart ; leurres :
   somme (81), niveau ambiant (44), niveau résiduel (37).
2. (écran 4) Groupe qui tourne toute la nuit, > 8 h : limite ? → **3 dB(A)** (3 + 0) ; leurres : 5
   (valeur de jour), 9 (3 + 6), 8 (5 + 3).
3. (écran 5) 24 dB(A) dans une chambre, fenêtres fermées → **émergence non recherchée** (≤ 25) ; leurres :
   recherchée avec 3, recherchée seulement à 30, seule la spectrale.
4. (écran 7) Exposition de 86 dB(A) par jour → **au-dessus de 85 : protecteurs à disposition et port
   à faire respecter** ; leurres : rien à faire (< 87), comparaison à un résiduel, arrêt du poste.

Position de la bonne réponse : 2, 4, 1, 3 ; elle n'est jamais systématiquement la plus longue.

## Correspondances

- `../acoustique-le-bruit-en-db/` — le décibel, la pondération A.
- `../acoustique-mesurer/` — relever ambiant et résiduel.
- `../acoustique-pac-voisinage/` — l'unité extérieure, cas d'application.
- `../risques-duerp/` — le bruit au travail, risque à évaluer.

## Sources officielles (consultées le 30/09/2026)

Textes lus sur Légifrance (pages d'articles, version en vigueur depuis le 10/08/2017,
décret n° 2017-1244 du 7 août 2017) :

- CSP **R. 1336-4** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425977>
- CSP **R. 1336-5** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425967>
- CSP **R. 1336-6** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425954>
- CSP **R. 1336-7** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425946>
- CSP **R. 1336-8** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425936>
- CSP **R. 1336-9** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425927>
- CSP **R. 1336-10** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425918>
- CSP **R. 1336-11** : <https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425907>
- CSP **R. 1337-6 à R. 1337-10-2** (section « bruits de voisinage », dispositions pénales) :
  <https://www.legifrance.gouv.fr/codes/id/LEGIARTI000035426036/2017-08-10/>
- Code du travail **R. 4431-1, R. 4431-2, R. 4432-1, R. 4433-1, R. 4434-7** (mis à jour 1/05/2008) :
  <https://code.travail.gouv.fr/code-du-travail/r4431-2> (et pages r4431-1, r4432-1, r4433-1, r4434-7)

Sources secondaires (explicatives, non officielles) :

- Juribruit 1, fiche B2 (CidB / bruit.fr, 7/05/2018) : agents compétents, arrêté du 5/12/2006,
  procès-verbal, sanctions : <https://www.bruit.fr/images/stories/pdf/Fiche-B2-Lutte-contre-bruit-des-activites.pdf>
- OPPBTP, note sur R. 4431-2 (20/01/2023) : jour nominal de 8 heures, atténuation des protecteurs
  prise en compte pour la seule valeur limite :
  <https://content.preventionbtp.fr/pdf/droit_de_la_prevention/article-r4431-2-du-code-du-travail.pdf>

Normes payantes : **NF S 31-010** (caractérisation et mesurage des bruits de l'environnement) —
objet seulement, aucune valeur reprise.

**Note de méthode.** Les pages Légifrance ont été lues par extraction automatique de page. Les
valeurs (5 / 3, termes 6 à 0, 25 / 30, 7 / 5, 80 / 85 / 87) concordent avec Juribruit et l'OPPBTP.
Le texte mot pour mot de R. 1337-6, R. 1337-7, R. 1337-10-2, R. 4431-1 et des articles employeur
n'a été lu qu'en résumé de page : **à relire mot pour mot sur Légifrance avant diffusion.**

## À sourcer (rien de ceci n'est dans la station)

- **Montants** des amendes (contraventions de 3e et 5e classes) : article 131-13 du Code pénal, à lire.
- **Mesures administratives** de L. 171-8 du Code de l'environnement (mise en demeure, consignation,
  travaux d'office, suspension, amende, astreinte) : l'énumération et les montants sont à lire sur
  Légifrance (Juribruit 2018 cite 15 000 € et 1 500 €/jour : non repris, texte modifié depuis).
- **Arrêté du 5 décembre 2006** (mesurage) : durée minimale d'intervalles de mesurage (Juribruit
  cite 30 minutes, article 4), conditions du bruit résiduel, calcul jour/nuit séparé, classe du
  sonomètre : à lire sur Légifrance avant de les enseigner.
- **L. 571-18 du Code de l'environnement** et **R. 1312-1 CSP** : liste exacte des agents compétents.
- **R. 4431-1** mot pour mot (définition de l'exposition quotidienne et hebdomadaire) et arrêté de
  calcul des paramètres physiques ; **R. 4434-x** (autres obligations : information, surveillance
  médicale, signalisation, programme de mesures techniques).
- **Installations classées (ICPE)** : leur bruit relève d'un régime distinct
  — exclues de R. 1336-4, non traitées ici.
- Lieux ouverts au public diffusant de la musique amplifiée (R. 571-25 et suivants C. env.) :
  renvoi de R. 1336-4, non traité.
- **Arrêté du 30 juin 1999** (acoustique des bâtiments d'habitation) : hors du sujet de cette
  station (isolement de façade et entre logements) ; voir la station « Traiter le bruit ».
