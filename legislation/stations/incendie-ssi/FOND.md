# Station « Le SSI » — FOND

> Réseau Législation · sous-ligne Incendie · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Sous-titre du plan : « détection, asservis. »
> **Statut : produite le 30/09/2026, `data-prototype` posé, en attente de la relecture métier.**
> Textes lus sur Légifrance le **30/09/2026** (version consolidée de l'arrêté). Aucune valeur
> chiffrée n'entre dans la station hors de ces textes.

## Objectif

À la fin de la station, l'étudiant sait décrire le système de sécurité incendie (SSI) comme un
chef d'orchestre — détection, traitement, mise en sécurité —, lire l'emboîtement des zones,
situer les catégories A à E **dans ce que le règlement en dit**, suivre la propagation d'une
alarme depuis un détecteur jusqu'aux dispositifs actionnés de sécurité (DAS) de la zone, dire ce
qu'il demande au lot CVC (commandes, retours de position, arrêt des ventilations) et connaître
le cadre de la vérification et de l'entretien.

## Référentiel

TP TECVC, REAC TP-00133 : **CP7** (ventilation tertiaire) et **CP10** (centrale de traitement
d'air). Justification : le SSI commande l'arrêt des ventilations, la fermeture des clapets et
l'ouverture des volets de désenfumage ; l'étude d'une ventilation tertiaire ou d'une CTA doit
prévoir ces asservissements. Station non fluidique : pas de codes de l'attestation d'aptitude 2025.

## Notions

SSI (MS 53) · système de détection incendie (MS 56-58) · système de mise en sécurité incendie et
DAS (MS 59-60) · centralisateur de mise en sécurité incendie · zones de détection / de mise en
sécurité / de diffusion d'alarme (MS 54-55) · catégories A à E (MS 53, 59, 60, 68) · alarme
générale / restreinte, types d'équipements d'alarme (MS 61-62, seulement cités) · foyer type,
essais fonctionnels (MS 56) · contrat d'entretien, registre de sécurité (MS 58, 68).

## Déroulé des 8 écrans

1. **Un chef d'orchestre** — définition du SSI : recueillir, traiter, agir ; les cinq fonctions
   de mise en sécurité dont « mise à l'arrêt de certaines installations techniques » (MS 53, § 1).
   Visuel `ssi-chef-orchestre.svg` — **animé** (impulsion détecteur → centralisateur → fonctions).
2. **La détection** — détecteurs et déclencheurs manuels ; déceler tout début d'incendie, fausses
   alarmes, personnel permanent qualifié ; foyer type / essais fonctionnels (MS 56 § 2-3, MS 57).
   Visuel `ssi-detection.svg` — fixe.
3. **Les zones** — trois sortes de zones et emboîtement ; découpage proposé à la commission de
   sécurité (MS 54, MS 55). Visuel `ssi-zones.svg` — **animé** (flamme, la zone de mise en
   sécurité qui la contient se teinte).
4. **La mise en sécurité** — centralisateur et DAS ; désenfumage commandé par la détection sauf
   escaliers (manuel) ; PV de laboratoire agréé, marque NF (MS 59, MS 60 § 1 et 4). Visuel
   `ssi-propagation.svg` — **animé** (l'alarme part d'un détecteur et se propage aux DAS de la
   zone : clapet se ferme, volet s'ouvre, porte se ferme, ventilation s'arrête).
5. **Les catégories A à E** — cinq catégories par ordre de sévérité décroissante ; ce que le texte
   attribue à A, à A et B, à D et E ; C laissée à la norme (MS 53, 59, 60, 68). Visuel
   `ssi-categories.svg` — fixe.
6. **Le scénario par zone** — tableau zones × DAS, **exemple fictif** signalé comme tel. Visuel
   `ssi-scenario-zone.svg` — **animé** (bande qui parcourt les lignes).
7. **Ce que le lot CVC doit fournir** — frontière entre les lots : le règlement (marque NF, PV de
   laboratoire) et le cahier des charges (fourniture, câblage, commandes, contacts de position,
   arrêt des ventilations). Visuel `ssi-lot-cvc.svg` — fixe.
8. **Réception, essais, entretien — bilan** — quatre temps : concevoir, installer, vérifier,
   entretenir (MS 55 § 2, MS 58, MS 56 § 3, MS 68). Visuel `ssi-bilan.svg` — fixe.

## Les 4 questions et leurs corrigés

**Q1** (écran 1). L'arrêt d'une CTA sur alarme : à quelle fonction se rattache-t-il ?
Bonne réponse : *la mise à l'arrêt d'installations techniques* (MS 53 § 1). Leurres : compartimentage,
évacuation, extinction automatique.

**Q2** (écran 3). Quelle imbrication des zones respecte le règlement ?
Bonne réponse : *une zone de mise en sécurité englobe des zones de détection* (MS 55 § 1). Leurres :
détection qui englobe la mise en sécurité (inversion), « un seul étage », « mêmes limites toujours »
(faux, MS 54).

**Q3** (écran 5). Catégorie E : quel dispositif l'alarme peut-elle télécommander ?
Bonne réponse : *une porte coupe-feu à fermeture automatique* (MS 60 § 3). Leurres : volet de
désenfumage, clapet coupe-feu, arrêt de CTA — tous plausibles pour un débutant.

**Q4** (écran 8). Détection neuve : comment vérifie-t-on qu'elle remplit sa fonction ?
Bonne réponse : *combustion d'un foyer type* (MS 56 § 3, première vérification d'une installation
neuve ou modifiée). Leurres : essais fonctionnels (valables dans les autres cas), lecture d'un PV,
contrôle visuel.

## Correspondances

- `../incendie-clapets-coupe-feu/` — le DAS qui se ferme dans la gaine.
- `../incendie-desenfumage/` — volets et ventilateurs commandés ; commande manuelle des escaliers.
- `../incendie-classer-le-bati/` — le type et la catégorie de l'établissement (1 à 5) commandent la catégorie de SSI exigée (A à E) ; deux échelles à ne pas confondre.
- `../elec-nf-c-15-100/` — l'alimentation des matériels que le SSI commande.

## Sources officielles (consultées le 30/09/2026)

Arrêté du 25 juin 1980 portant approbation des dispositions générales du règlement de sécurité
contre les risques d'incendie et de panique dans les ERP, version consolidée, Livre I, chapitre XI
(« Moyens de secours contre l'incendie »), section 5 « Système de sécurité incendie (SSI) »,
articles MS 53 à MS 69 :

- **MS 53** (objet ; définition du SSI ; cinq fonctions ; catégories A à E, ordre de sévérité
  décroissante) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317726
- **MS 54** (zones : terminologie) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317725
- **MS 55** (conception des zones ; emboîtement ; proposition à la commission de sécurité) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317720
- **MS 56** (détection : principes généraux ; foyer type, essais fonctionnels) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317738
- **MS 57** (contraintes de la détection : personnel, fausses alarmes) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317737
- **MS 58** (obligations de l'installateur et de l'exploitant) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317731
- **MS 59** (système de mise en sécurité incendie : généralités ; DAS ; centralisateur A ou B, marque NF) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317740
- **MS 60** (automatismes : désenfumage, catégorie A sans temporisation, catégories D et E, PV de
  laboratoire agréé, marque NF) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317739
- **MS 62** (classement des équipements d'alarme, types 1, 2a, 2b, 3, 4 — cités seulement) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317746
- **MS 68** (entretien ; contrat obligatoire en catégories A et B ; registre de sécurité) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020317749
- Code du travail, **R. 4227-34** et **R. 4227-36** (alarme sonore dans les lieux de travail) —
  https://code.travail.gouv.fr/code-du-travail/r4227-34 et …/r4227-36 — *lus, non utilisés à l'écran
  (voir « À sourcer »)*.

Normes payantes, **objet seulement** : NF S 61-932 (règles d'installation du système de mise en
sécurité incendie), NF S 61-951 (composants des systèmes de détection automatique d'incendie),
NF EN 54-2 (équipement de commande et de signalisation). Leur contenu n'est pas reproduit.

Fonds internes : dépôt `ssi-trainer` (simulateur SSIAP, en relecture métier) — vocabulaire seulement,
rien n'en a été repris.

## Honnêteté sur les sources

Les articles MS 53, 54, 55, 56, 57, 58, 59, 60 et 68 ont été lus sur Légifrance le 30/09/2026 ;
les deux articles du Code du travail par la même voie. La lecture s'est faite par un outil de
récupération de pages qui restitue le texte, non par copie manuelle : **la relecture métier doit
recontrôler les renvois d'article et les mots exacts** avant toute diffusion.

## À sourcer (omis volontairement, jamais approximés)

- **Ce qui distingue les catégories B et C** dans la norme d'installation (payante) : la station
  n'affirme rien au-delà de MS 53, 59, 60 et 68.
- **Les catégories de SSI exigées par type et catégorie d'établissement** (dispositions
  particulières de chaque type : M, N, O, W…, articles à lire type par type) — renvoi à la station
  « Classer le bâti ».
- **Les articles du chapitre CH** (arrêt de ventilation, clapets, commande d'arrêt d'urgence) : non
  lus à l'article près faute d'accès fiable ; la station se limite à MS 53 § 1 (« mise à l'arrêt de
  certaines installations techniques ») et MS 60 § 4 (clapets télécommandés, marque NF).
- **La périodicité des vérifications de l'exploitant** (MS 69 : vérification du bon fonctionnement
  et des alimentations) et la périodicité des contrôles réglementaires : non citées.
- **Les types d'équipements d'alarme** (MS 61 à 67) et la durée d'autonomie des alimentations : non
  citées ; le Code du travail R. 4227-36 (autonomie minimale de l'alarme sonore) est lu mais non
  repris à l'écran, faute d'un écran qui s'y prête.
- **Le seuil d'effectif du Code du travail R. 4227-34** (alarme sonore obligatoire) : lu, non repris.
- **Le contenu du lot CVC** (écran 7, 2e carte : commandes, contacts de position, arrêt des
  ventilations, qui câble) est une **pratique de bureau d'études, non un texte** : l'écran le dit.
  À valider par la relecture métier ; le scénario de l'écran 6 est un exemple fictif, signalé tel.
- **La réception technique** (vérification par un organisme, procès-verbal de réception) : non
  documentée ici ; l'écran 8 ne parle que de MS 56 § 3 (première vérification) et MS 58.
- Symboles normalisés du SSI : aucun n'est utilisé (pictogrammes simples seulement).
