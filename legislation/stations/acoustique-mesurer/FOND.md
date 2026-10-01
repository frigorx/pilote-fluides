# Station « Mesurer — sonomètre et protocole » — FOND

> Réseau Législation · sous-ligne Acoustique · niveau BTS · slug `acoustique-mesurer`.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Produite le 30/09/2026.
> **Statut : prototype, en attente de relecture métier (acousticien).**
> Doctrine tenue : aucune valeur réglementaire sans source lue ; ce qui relève d'une norme
> payante (NF S 31-010, NF S 31-009, NF S 31-109, NF S 31-139, NF EN ISO 9612) n'est cité que
> par son objet. Les seuils d'émergence sont laissés à la station « Les seuils ».

## Objectif

À la fin de la station, l'étudiant sait régler et contrôler un sonomètre (classe, pondération A,
constante de temps, étalonnage avant et après), conduire le protocole d'une mesure d'émergence
(bruit ambiant machine en marche, bruit résiduel machine arrêtée, mêmes conditions), dire ce que
contient un rapport de mesure, et éviter les trois erreurs de débutant : mesurer trop près, oublier
le résiduel, laisser le vent sur le micro.

## Référentiel

TP TECVC, REAC TP-00133 — **CP9** (climatisation) et **CP7** (ventilation tertiaire).
Justification : le technicien d'études qui dimensionne une installation de climatisation ou de
ventilation tertiaire doit pouvoir vérifier, mesure à l'appui, qu'elle respecte ses contraintes
acoustiques. Attestation d'aptitude 2025 : sans objet (station non fluidique).

## Notions

Sonomètre intégrateur · classe 1 / classe 2 · pondération A (dB(A)) · constante de temps (rapide,
lente) · niveau continu équivalent LAeq · calibreur, étalonnage de terrain avant / après ·
vérification périodique (autre contrôle) · bruit ambiant · bruit résiduel · bruit particulier ·
émergence globale · émergence spectrale · point de mesure (« bruit perçu par autrui ») · météo ·
rapport de mesure.

Rappel maison : les décibels ne s'additionnent pas. Ici la règle est **démontrée** à partir de la
définition logarithmique (L = 10 log10 (I/I0) ; les énergies s'additionnent, pas les niveaux),
sans aucune valeur chiffrée.

## Déroulé des 8 écrans

1. **Une plainte se traite par une mesure** — le ressenti du plaignant contre le niveau mesuré ;
   définition de l'émergence (R. 1336-7), bruit « perçu par autrui » (R. 1336-6, activité
   professionnelle, sportive, culturelle ou de loisir : le cas d'un commerce et de sa clim).
   SVG `plainte-et-mesure` (fixe).
2. **Le sonomètre : de l'air à l'affichage** — chaîne micro, filtre A, détecteur, intégrateur,
   affichage ; exigence « sonomètre intégrateur homologué de classe 1 ou de classe 2 » (arrêté du
   5/12/2006 art. 3, rédaction du 1/08/2013) ; arrêté du 27/10/1989 (construction et contrôle des
   sonomètres). SVG `chaine-sonometre` (**animé** : les blocs s'éclairent l'un après l'autre).
3. **Pondération A et constante de temps** — atténuation des graves ; dB pondérés A ; émergence
   spectrale par bandes d'octave (R. 1336-8) ; rapide / lente ; LAeq. SVG `ponderation-et-temps`
   (**animé** : les courbes se tracent).
4. **Étalonner avant, étalonner après** — calibreur sur le micro, note du niveau lu, écart, deux
   issues ; distinction étalonnage de terrain / vérification périodique. SVG
   `etalonnage-avant-apres` (**animé** : les trois temps puis les deux issues).
5. **Le relevé : ambiant, puis résiduel** — la suite des gestes ; formule de l'émergence ; pourquoi
   le résiduel se mesure (énergies, pas décibels). SVG `releve-ambiant-residuel` (**animé** :
   panneau ambiant, puis panneau résiduel, puis la bande).
6. **Où, quand, par quel temps** — mesurer où le bruit est perçu ; 25 / 30 dB pondérés A
   (R. 1336-6, seuil de recherche de l'émergence) ; jour / nuit (R. 1336-7, sans valeurs) ; météo
   encadrée par la norme (renvoi de l'arrêté de 2006). SVG `ou-et-quand-mesurer` (fixe).
7. **Le rapport de mesure** — huit lignes ; critère : quelqu'un d'autre doit pouvoir refaire ;
   autre cadre : bruit au travail (NF EN ISO 9612, arrêté du 11/12/2015, 5 ans / 10 ans).
   SVG `rapport-de-mesure` (**animé** : les cases se cochent une à une).
8. **Les trois erreurs de débutant, et le bilan** — trop près, pas de résiduel, vent sur le micro ;
   réflexe : étalonner avant et après. SVG `erreurs-de-debutant` (fixe).

## Les 4 questions et corrigés

- **Q1 (écran 5)** — *Comment se calcule l'émergence globale ?* Bonne réponse : ambiant moins
  résiduel, mesurés au même point (R. 1336-7). Leurres : somme des niveaux ; niveau de la machine
  de près ; résiduel moins machine.
- **Q2 (écran 4)** — *Quand étalonne-t-on le sonomètre pour une série ?* Bonne réponse : avant la
  série et après, en notant l'écart. Leurres : une seule fois ; une fois par an au laboratoire ;
  seulement en classe 2.
- **Q3 (écran 6)** — *Vous mesurez au ras de l'unité : quel défaut ?* Bonne réponse : ce n'est pas
  le niveau perçu par le voisin (R. 1336-6). Leurres : plus près = plus précis ; correction
  « fixée par le code » ; classe 2 impossible de près.
- **Q4 (écran 8)** — *Vent soutenu le jour de la mesure : que faites-vous ?* Bonne réponse : je
  contrôle la météo et je reporte si elle sort du cadre. Leurres : la protection compense tout ;
  côté abrité ; mesurer plus longtemps.

## Correspondances (maillage)

- `../acoustique-les-seuils/` — les limites d'émergence à comparer au résultat.
- `../acoustique-le-bruit-en-db/` — décibel, échelle logarithmique.
- `../acoustique-pac-voisinage/` — le cas de la pompe à chaleur.
- `../acoustique-traiter-le-bruit/` — que faire quand la mesure donne raison au plaignant.

## Sources officielles (consultées le 30/09/2026)

- **Code de la santé publique, art. R. 1336-4 à R. 1336-13** (section « Dispositions applicables
  aux bruits de voisinage ») : définition de l'émergence globale (R. 1336-7, ambiant moins
  résiduel), de l'émergence spectrale (R. 1336-8), bruit « perçu par autrui » et seuil de recherche
  de l'émergence (R. 1336-6 : 25 décibels pondérés A dans une pièce principale d'un logement,
  30 décibels pondérés A dans les autres cas). Légifrance :
  https://www.legifrance.gouv.fr/codes/id/LEGIARTI000035425967/2019-04-18/ (lecture de synthèse,
  le téléchargement direct du texte est bloqué).
- **Décret n° 2017-1244 du 7 août 2017** relatif à la prévention des risques liés aux bruits et aux
  sons amplifiés, JORF du 9 août 2017, texte 22 : renumérotation des articles R. 1334-30 à R. 1334-37
  en R. 1336-4 à R. 1336-11 et rédaction « 25 décibels pondérés » / « 30 décibels pondérés A »
  (lu dans la copie du Journal officiel : https://www.indre-et-loire.gouv.fr/contenu/telechargement/22397/152043/file/D%C3%A9cret%20no%202017-1244%20du%207%20ao%C3%BBt%202017%20relatif%20%C3%A0%20la%20pr%C3%A9vention%20des%20risques.pdf).
- **Arrêté du 5 décembre 2006 relatif aux modalités de mesurage des bruits de voisinage**
  (NOR SANP0624911A, JO du 20/12/2006), art. 3 dans la rédaction de l'**arrêté du 1er août 2013**
  (NOR DEVP1318650A, JO du 13/08/2013) : sonomètre intégrateur homologué de classe 1 ou 2 ; renvoi
  aux prescriptions de la norme NF S 31-010 pour l'appareillage, les conditions de mesure, la
  météorologie et l'acquisition des données :
  https://aida.ineris.fr/reglementation/arrete-010813-modifiant-larrete-5-decembre-2006-relatif-modalites-mesurage-bruits
- **Arrêté du 27 octobre 1989 relatif à la construction et au contrôle des sonomètres**
  (modifié par l'arrêté du 30 mai 2008) et normes citées par le ministère (NF S 31-009 sonomètres,
  NF S 31-109 sonomètres intégrateurs-moyenneurs, NF S 31-139 calibreurs acoustiques) — objet
  seulement : https://www.entreprises.gouv.fr/espace-entreprises/s-informer-sur-la-reglementation/reglementation-concernant-les-instruments-2
- **INRS**, « Bruit au travail — Les obligations de l'employeur » (mai 2019) : mesurage selon la
  norme NF EN ISO 9612, renouvelé au moins tous les 5 ans, conservé 10 ans ; Code du travail
  R. 4431-1, R. 4433-2 à R. 4433-7 ; arrêté du 11/12/2015 :
  https://inrs.fr/dam/jcr:446a78ac-1189-46b4-8196-b094d550c538/Focus-bruit-obligations.pdf
- Corroboration (non normative) : arrêté préfectoral de Maine-et-Loire n° ARS-PDL-DT49-SSPE 2018/29,
  qui reprend le texte de l'art. R. 1336-6 et définit le bruit résiduel (« le bruit ambiant en
  l'absence du bruit particulier »).

## À sourcer (omis volontairement, jamais approximé)

- **Version consolidée en vigueur de l'arrêté du 5/12/2006** (modifié en 2008 et 2013, peut-être
  depuis) : relire l'art. 3 sur Légifrance ; la norme de référence citée (NF S 31-010) a pu changer.
- **Texte intégral de R. 1336-6 à R. 1336-10** : R. 1336-6, -7, -8 lus par synthèse ; **R. 1336-9 et
  R. 1336-10 non lus, non affirmés**. À relire sur Légifrance.
- **Réglages et paramètres de la méthode** : constante de temps à employer, indicateur retenu pour
  l'émergence globale, hauteur du micro, distance aux parois, durée minimale de relevé, limites
  météo (vent, pluie) — tout est dans NF S 31-010 (payante) : omis.
- **Calibreur** : niveau et fréquence nominaux, classe, tolérance d'écart avant / après — NF S 31-139,
  CEI 60942, notice de l'appareil : omis.
- **Périodicité de la vérification périodique** des sonomètres (arrêté du 27/10/1989 modifié) : non
  trouvée dans la source lue, omise.
- **Contenu du rapport de mesure** : la liste de l'écran 7 est une pratique professionnelle, pas un
  texte réglementaire ; à valider par relecture d'un acousticien.
- **Valeurs limites d'émergence, termes correctifs de durée, seuils spectraux** : volontairement
  laissés à la station « Les seuils ».
- **Champ d'application** d'une PAC ou d'une clim de particulier (hors activité professionnelle) :
  traité dans « PAC et voisinage ».
