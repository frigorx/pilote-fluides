# Station « PAC & voisinage » — FOND à valider

> Réseau Législation · sous-ligne **Acoustique** · niveau BTS · sous-titre du plan : « l'unité extérieure ».
> Mini-station ≤ 10 min : 8 écrans + 4 questions, 8 illustrations (3 animées).
> **Statut : produite le 30/09/2026, `data-prototype` posé, EN ATTENTE de relecture métier.**
> Toutes les sources ci-dessous ont été consultées le **30/09/2026**.

## Référentiel

TP TECVC, REAC TP-00133 — compétences mobilisées : **CP1** (plans d'implantation : choisir et
reporter l'emplacement de l'unité extérieure), **CP6** (chauffage / ECS : PAC air-eau),
**CP9** (climatisation : unité extérieure d'un split). Station non fluidique : pas de code
d'attestation 2025.

## Objectif

Le cas d'école du technicien d'études CVC : lire la puissance acoustique d'une fiche sans la
confondre avec le niveau chez le voisin, estimer l'effet de la distance et de l'emplacement,
comprendre pourquoi la nuit est la période critique, distinguer les deux régimes du droit du
bruit de voisinage (usage domestique / usage professionnel), lister ce qu'il faut vérifier
avant de poser (urbanisme, copropriété, dialogue avec le voisin).

## Ce qui est démontré et ce qui est cité — la règle appliquée

- **Cité (source lue)** : les seuils du code de la santé publique, la dispense d'urbanisme de
  2026, l'article 25 b de la loi de 1965, l'article 1253 du Code civil, les écarts d'emplacement
  (+3 / +6 / +9 dB(A)) et l'exemple 54 / 48 / 42 dB(A) de la fiche AFPAC n° 1, l'exemple
  30 dB + 30 dB = 33 dB et le résiduel « zone calme, typiquement 25 dB(A) » de la fiche CidB.
- **Démontré à partir de la définition logarithmique** (aucune valeur inventée) : addition de deux
  niveaux (10·log 2 ≈ 3,01 dB pour deux niveaux égaux) ; −6 dB par doublement de la distance
  (10·log 4 = 6,02) ; Lp = Lw − 20·log r − 8 pour une source posée sur un sol réfléchissant en
  champ libre (surface de demi-sphère 2πr², 10·log 2π ≈ 7,98) ; +3 dB à chaque réduction de moitié
  de l'espace de rayonnement (sol → mur → angle). Ces démonstrations retombent exactement sur les
  écarts de la fiche AFPAC — c'est le recoupement qui les autorise. Modèle idéal : source
  ponctuelle, champ libre, parois parfaitement réfléchissantes.
- **Valeurs d'exercice** (dites « fictives » à l'écran) : Lw = 60 dB(A), fenêtre à 4 m. Elles ne
  viennent d'aucune fiche réelle et ne sont pas des données réglementaires.

## Déroulé des 8 écrans

1. **Un appareil, deux chemins pour le bruit.** Sources : ventilateur, compresseur. Bruit aérien
   (écran, capotage) et bruit solidien (socle, plots, liaisons souples : AFPAC fiche n° 2).
   *svg/sources-du-bruit.svg* (fixe).
2. **Lire la fiche technique : Lw n'est pas Lp.** Définitions (AFPAC fiche n° 1). Où lire Lw :
   fiche fabricant, étiquette énergie (règlement délégué (UE) n° 811/2013, considérant 9), bases
   certifiées citées par le CidB (Eurovent Certita Certification, Keymark, Edibatec). NF EN 12102-1 :
   objet seulement. *svg/lw-et-lp.svg* (fixe).
3. **La distance atténue.** −6 dB par doublement (champ libre) ; exemple AFPAC ; formule
   Lp = Lw − 20·log r − 8 ; exemple d'exercice 40 dB(A) à 4 m. *svg/distance-attenue.svg* (**animé** :
   l'onde part, les niveaux apparaissent quand elle les atteint).
4. **L'emplacement : mur, angle, cour.** +3 / +6 / +9 dB(A) ; règles d'implantation (ne pas
   diriger les ventilations vers les voisins, s'éloigner des limites de propriété, pas sous une
   fenêtre) ; absorbant sur le mur (au plus 2 dB(A) mur, 4 dB(A) angle). *svg/reflexion-angle.svg*
   (**animé** : des points parcourent les trajets direct et réfléchis).
5. **Les décibels ne s'additionnent pas : l'émergence.** Formule logarithmique ; 30 + 30 = 33 ;
   émergence = ambiant − résiduel (R. 1336-7) ; suite de l'exemple : émergence ≈ 15 dB au sol,
   ≈ 21 dB en angle pour un résiduel de 25 dB(A). *svg/decibels-ne-s-additionnent-pas.svg* (fixe).
6. **La nuit.** 5 dB(A) jour (7 h–22 h) / 3 dB(A) nuit (22 h–7 h) pour l'activité professionnelle,
   avant termes correctifs ; résiduel qui tombe ; mode silencieux et dégivrage à faire chiffrer
   par le fabricant. *svg/la-nuit.svg* (**animé** : un repère soleil puis lune traverse la frise).
7. **Deux régimes.** R. 1336-5 (domestique, pas de seuil chiffré) ; R. 1336-6 à R. 1336-8
   (professionnel : émergence globale, émergence spectrale, seuils de déclenchement 25 / 30 dB(A)) ;
   R. 1336-9 et arrêté du 5 décembre 2006 (mesurage) ; R. 1336-11 (suites) ; réponse ministérielle
   de juin 2024 ; article 1253 du Code civil. *svg/deux-regimes.svg* (fixe).
8. **Avant de poser.** Urbanisme (dispense en façade non visible depuis mars 2026, sauf périmètres
   protégés ; déclaration préalable sinon ; L. 421-8 : la dispense ne dispense pas du PLU),
   copropriété (art. 25 b), prévention du litige, outil de l'AFPAC (et absence constatée d'outil
   public). *svg/avant-de-poser.svg* (fixe).

Illustrations : 8 SVG, un par écran, réutilisés en vignette sur les questions. Trois animées en SMIL
autonome, sans script, état au repos = image finale, boucle de 12 s avec temps de repos
(distance-attenue, reflexion-angle, la-nuit).

## Les 4 questions

**Q1 (écran 2)** — Que représente Lw ? *Corrigé : ce que la machine émet, quel que soit le lieu.*
Leurres : le niveau chez le voisin ; le bruit résiduel ; la limite d'émergence.

**Q2 (écran 4)** — Posée au sol, la PAC passe dans un angle, même distance : que devient le niveau
reçu ? *Corrigé : + 6 dB(A).* Leurres : aucun changement ; + 3 (un seul mur) ; + 9 (cour).

**Q3 (écran 5)** — Résiduel 30 dB, PAC seule 30 dB : ambiant ? *Corrigé : 33 dB.* Leurres : 60 ; 30 ;
31.

**Q4 (écran 7)** — La PAC d'une boulangerie gêne un voisin la nuit : quel critère ? *Corrigé :
émergence limitée à 3 dB(A) la nuit plus terme correctif.* Leurres : aucun seuil (régime du
particulier) ; un niveau absolu en limite de propriété ; 5 dB(A) jour et nuit.

Positions des bonnes réponses : 2, 4, 1, 3.

## Correspondances

- `../acoustique-les-seuils/` — voisinage et émergence (le détail des valeurs citées).
- `../acoustique-traiter-le-bruit/` — plots, silencieux, écrans (les deux chemins du bruit).
- `../acoustique-le-bruit-en-db/` — dB(A), niveaux, addition logarithmique (écrans 3 à 5).
- `../thermique-re2020/` — la PAC est aussi un choix de performance énergétique.
(`../acoustique-mesurer/` est ouverte dans la même vague ; non liée ici, le mesurage n'étant
qu'effleuré à l'écran 7.)

## Sources officielles et références (lues le 30/09/2026)

Légifrance — code de la santé publique (versions en vigueur depuis le 10/08/2017, décret n° 2017-1244) :
- Article R. 1336-4 (champ d'application) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425977
- Article R. 1336-5 (aucun bruit particulier ne doit porter atteinte à la tranquillité…) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425967
- Article R. 1336-6 (activité professionnelle : émergence globale, émergence spectrale dans les
  pièces principales, seuils de recherche 25 dB(A) intérieur / 30 dB(A) ailleurs) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425954
- Article R. 1336-7 (définition de l'émergence globale ; 5 dB(A) de 7 h à 22 h, 3 dB(A) de 22 h à
  7 h ; termes correctifs de 6 à 0 dB(A) selon la durée cumulée d'apparition) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425946
- Article R. 1336-8 (émergence spectrale : 7 dB à 125 et 250 Hz ; 5 dB à 500, 1 000, 2 000, 4 000 Hz) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425936
- Article R. 1336-9 (modalités de mesure fixées par arrêté) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425927
- Article R. 1336-11 (mesures de l'article L. 171-8 du code de l'environnement) —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035425907
- Arrêté du 5 décembre 2006 relatif aux modalités de mesurage des bruits de voisinage
  (NOR SANP0624911A) — https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000463330/

Assemblée nationale — question écrite n° 12247 (M. Albertini), publiée au JO le 17/10/2023,
réponse publiée au JO le 11/06/2024 : les articles R. 1336-5 à R. 1336-9 s'appliquent aux PAC
selon l'usage ; le Gouvernement ne prévoit pas de modifier cette réglementation ; le Conseil national
du bruit « pourrait » rédiger des guides ou proposer des outils —
https://www.assemblee-nationale.fr/dyn/16/questions/QANR5L16QE12247

Urbanisme :
- Décret n° 2026-117 du 20 février 2026 (JORF du 21/02/2026), article 16 : nouvelle dispense de
  formalité (article R*421-13 du code de l'urbanisme, version du 22/02/2026) pour « l'implantation
  en façade d'une pompe à chaleur qui n'est visible ni depuis le domaine public, ni depuis une voie
  ouverte au public, ni depuis un autre immeuble disposant d'une vue sur l'installation », hors
  périmètres protégés ; applicable aux travaux engagés à compter du mois suivant la publication —
  https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053523983 ;
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053561283
- Article R*421-17 a) : déclaration préalable pour les travaux modifiant l'aspect extérieur d'un
  bâtiment existant — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053561259
- Article L. 421-8 : les travaux dispensés de formalité restent soumis aux règles d'urbanisme —
  https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049398814

Droit civil et copropriété :
- Code civil, article 1253 (troubles anormaux du voisinage, loi n° 2024-346 du 15 avril 2024) —
  https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049423788/2024-08-30
- Loi n° 65-557 du 10 juillet 1965, article 25 b (travaux affectant les parties communes ou l'aspect
  extérieur) — https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000039313590

Professionnels et centres d'information :
- CidB, fiche « Bruits des pompes à chaleur » (à jour au 1er mars 2023) —
  https://www.bruit.fr/images/ressources/fiche_pompe_a_chaleur_cidB.pdf
- AFPAC, fiche technique n° 1 « Pompes à chaleur & environnement acoustique — recommandations pour
  la mise en œuvre » (2012) —
  https://www.bruit.fr/images/particuliers/Ressources/Autres_guides/afpac-fiche-acoustique-pompes-a-chaleur-n1-min.pdf
- AFPAC, fiche technique n° 2 « … Les bonnes pratiques d'installation » (2012) —
  https://www.bruit.fr/images/particuliers/Ressources/Autres_guides/afpac-fiche-acoustique-pompes-a-chaleur-n2-min.pdf
- Outil d'évaluation acoustique de l'AFPAC, annoncé le 14/03/2024, réservé aux professionnels inscrits
  (SIRET), qui calcule une émergence — https://www.effy.fr/pro/actualite/pompes-a-chaleur-afpac-lance-outil-evaluer-impact-acoustique
  (relais de presse ; l'outil est sur afpac.org).
- Règlement délégué (UE) n° 811/2013, considérant 9 (information sur la puissance acoustique sur les
  étiquettes) — https://www.legislation.gov.uk/eur/2013/811/contents/data.html (copie du texte UE).

Normes payantes (objet seulement) : NF EN 12102-1 (détermination du niveau de puissance acoustique
des climatiseurs, pompes à chaleur… avec compresseur entraîné par moteur électrique) ; NF S 31-010
(caractérisation et mesurage des bruits de l'environnement, cité par l'arrêté du 5 décembre 2006).

## À sourcer (omis volontairement, jamais approximés)

1. **Guide ou outil public de l'État / de l'ADEME** pour estimer le niveau chez le voisin : **aucun
   trouvé** (recherche du 30/09/2026 ; les pages ADEME sont derrière un contrôle anti-robot et n'ont
   pu être lues). À rechercher au calme : ADEME (guide d'installation des PAC), CNB (travaux « bruits
   de voisinage » de la feuille de route 2023-2026), Cerema.
2. **Distance minimale recommandée** à la fenêtre du voisin (des sites commerciaux citent 5 à 10 m ou
   20 m) : aucune source officielle lue → omise.
3. **Arrêté du 23 juin 1978, article 6** : 50 dB(A) à 2 m des façades voisines, mais le texte lu vise
   les **chaufferies** ; le CidB l'applique aux PAC. Applicabilité à une unité extérieure non
   établie → omise de la station.
4. **Article R623-2 du Code pénal** (tapage nocturne), cité par le CidB pour les PAC : non relu sur
   Légifrance → omis.
5. **Sanction du particulier** : le CidB indique une contravention de 3e classe (jusqu'à 450 euros) ;
   articles de sanction du code de la santé publique (R. 1337-6 et suivants) non relus → omis.
6. **Unité posée au sol** : la dispense de 2026 vise « l'implantation en façade » ; le régime d'une unité
   posée au sol (PLU, autre article) n'a pas été lu → renvoi à la mairie et au PLU seulement.
7. **Statut actuel du règlement (UE) n° 811/2013** (en vigueur, remplacé, révisé ?) et texte exact
   de l'annexe III sur l'affichage de LWA : seul le considérant 9 a été lu.
8. **Majorité exacte de l'article 25** de la loi de 1965 pour le point b (« autorisation donnée à
   certains copropriétaires… ») : non restituée ; la station dit seulement « autorisation de
   l'assemblée générale ».
9. **Textes préfectoraux et municipaux** locaux sur les équipements bruyants (mentionnés par le CidB) :
   dépendent de la commune, non sourcés.
10. **Fiches AFPAC de 2011-2012** : plus anciennes que la réforme de 2017 du code de la santé
    publique (la fiche renvoie au décret de 2006 et à des mesures « en limite de propriété ») ;
    seuls sont repris les écarts d'emplacement, les définitions Lw/Lp et les règles d'implantation,
    pas leur rappel réglementaire. Relire la fiche n° 3 (« étude de nuisance acoustique au
    voisinage ») si elle est retrouvée.
11. **Valeurs de bruit résiduel** par type de zone : le tableau de la fiche AFPAC n° 1 (±5 dB(A)) n'a
    pas été repris ; seule la valeur « zone calme, typiquement 25 dB(A) » du CidB l'est.
12. **Résultat du calcul d'exercice** à confronter, avant diffusion, à une fiche réelle et à un
    calcul d'acousticien (NF EN ISO 9613-2, norme payante, non lue).

## Relecture du 1er octobre 2026

Corrections synchronisées avec mission.json et le carnet. Sources de contrôle : Données fictives déjà présentes dans le défi ; aucune fiche constructeur attribuée.
La relecture générale et les réserves non traitées restent distinctes de ces corrections ciblées.
