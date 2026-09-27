/* ============================================================
   inerWeb R408 — la matrice de couverture
   Un item par élément de contenu de la partie 1 de docs/COUVERTURE-R408.md
   (référentiel de compétences INRS, DC1 à DC4), plus un item R-01 à R-12
   par point clé de la partie 2 (recommandation R408). Contrat : voir
   docs/BRIEF-COUVERTURE.md § 2.

   MÉTHODE DE DÉCOUPAGE (pour la traçabilité, la source ne donne pas un
   texte "un élément = une ligne") : chaque tiret du document INRS est un
   « indicateur » ; quand son contenu (après « : ») énumère plusieurs
   éléments séparés par un point-virgule, chacun devient un item séparé,
   sinon l'indicateur entier forme un seul item. Pour 3.4 (« seize points
   de vérification » selon le document), ce découpage donne exactement
   16 items (deux indicateurs — plancher, ancrages — portent chacun deux
   points de vérification) : confirme la lecture du document.
   Total obtenu : 91 items (76 N1 + 2 hors-cible en partie 1, 1 hors-cible
   DC5, 12 N1 en partie 2) — coïncide avec le total annoncé par la source.

   ALIAS : 3.1 et 3.2 reprennent respectivement 2.1 et 2.2 (mêmes
   éléments, mêmes libellés dans le document) ; 4.1 reprend 2.1. Ces
   compétences ne dupliquent donc pas d'item : chaque item de 2.1 porte
   `alias: ["3.1", "4.1"]`, chaque item de 2.2 porte `alias: ["3.2"]`.

   HORS-CIBLE : le CAP ne traite ni la responsabilité civile et pénale du
   vérificateur ni la délégation de pouvoir (3.3), ni le domaine DC5
   (vérificateur interne, formation F2 — cf. programme.js HORS_CIBLE).
   Ces items restent dans la liste, avec un champ `pourquoi`, pour que la
   matrice dise pourquoi ils ne sont pas enseignés — jamais oubliés en
   silence (docs/BRIEF-COUVERTURE.md § 2).

   MODULE : celui de la partie 3 de docs/COUVERTURE-R408.md quand elle le
   donne (items R-xx), sinon celui du domaine DC porté par programme.js
   (DC1 → M1-M4 selon la compétence, DC4 → M5-M7, DC3 → M8-M9,
   DC2 → M10-M11). Hésitations signalées en commentaire au fil du fichier.
   Script navigateur : `const COUVERTURE_R408`, pas de module.exports —
   comme les autres fichiers de ce dossier.
   ============================================================ */

const COUVERTURE_R408 = [

  /* ---------- DC1 — Se situer et être acteur de la prévention (INRS V07 § 6.1 p. 18) ---------- */

  { id: "DC1.a.01", dc: "DC1", competence: "DC1.a", libelle: "Appréhender les enjeux de la prévention : réglementation", source: "INRS V07 § 6.1 p. 18", module: "M1", niveau: "N1" },
  { id: "DC1.a.02", dc: "DC1", competence: "DC1.a", libelle: "Appréhender les enjeux de la prévention : enjeux de la prévention (humain, juridique, économique)", source: "INRS V07 § 6.1 p. 18", module: "M1", niveau: "N1" },
  { id: "DC1.a.03", dc: "DC1", competence: "DC1.a", libelle: "Appréhender les enjeux de la prévention : risque de chute de hauteur dans le BTP (statistiques, coûts…)", source: "INRS V07 § 6.1 p. 18", module: "M1", niveau: "N1" },

  { id: "DC1.b.01", dc: "DC1", competence: "DC1.b", libelle: "Identifier les rôles et responsabilités des différents acteurs : constructeur/employeur (conformité du matériel, notice d'instructions, formation, aptitude médicale, plan de prévention, vérifications réglementaires, vérification et entretien du matériel, panneau de chantier…)", source: "INRS V07 § 6.1 p. 18", module: "M2", niveau: "N1" },
  { id: "DC1.b.02", dc: "DC1", competence: "DC1.b", libelle: "Identifier les rôles et responsabilités des différents acteurs : les différents acteurs en prévention des risques professionnels concernés", source: "INRS V07 § 6.1 p. 18", module: "M2", niveau: "N1" },
  { id: "DC1.b.03", dc: "DC1", competence: "DC1.b", libelle: "Identifier les rôles et responsabilités des différents acteurs : concepteur, monteur, vérificateur, utilisateur", source: "INRS V07 § 6.1 p. 18", module: "M2", niveau: "N1" },
  { id: "DC1.b.04", dc: "DC1", competence: "DC1.b", libelle: "Identifier les rôles et responsabilités des différents acteurs : opérateur (dont le droit de retrait)", source: "INRS V07 § 6.1 p. 18", module: "M2", niveau: "N1" },

  { id: "DC1.c.01", dc: "DC1", competence: "DC1.c", libelle: "Communiquer — rendre compte : alerter les secours", source: "INRS V07 § 6.1 p. 18", module: "M4", niveau: "N1" },
  { id: "DC1.c.02", dc: "DC1", competence: "DC1.c", libelle: "Communiquer — rendre compte : informer le responsable du chantier", source: "INRS V07 § 6.1 p. 18", module: "M4", niveau: "N1" },
  { id: "DC1.c.03", dc: "DC1", competence: "DC1.c", libelle: "Communiquer — rendre compte : savoir réagir en cas de danger immédiat", source: "INRS V07 § 6.1 p. 18", module: "M4", niveau: "N1" },
  { id: "DC1.c.04", dc: "DC1", competence: "DC1.c", libelle: "Communiquer — rendre compte : savoir réagir en cas d'accident", source: "INRS V07 § 6.1 p. 18", module: "M4", niveau: "N1" },

  { id: "DC1.d.01", dc: "DC1", competence: "DC1.d", libelle: "Signaler les situations dangereuses : notions d'accident du travail (phénomène d'apparition du dommage, pluricausalité)", source: "INRS V07 § 6.1 p. 18", module: "M4", niveau: "N1" },
  { id: "DC1.d.02", dc: "DC1", competence: "DC1.d", libelle: "Signaler les situations dangereuses : situations dangereuses appliquées au métier", source: "INRS V07 § 6.1 p. 18", module: "M4", niveau: "N1" },

  { id: "DC1.e.01", dc: "DC1", competence: "DC1.e", libelle: "Prévenir les risques (notamment liés à l'activité physique) : risques et mesures de prévention appliqués à l'activité", source: "INRS V07 § 6.1 p. 18", module: "M3", niveau: "N1" },

  /* DC1.f : aucun élément de contenu détaillé restitué par l'extraction — l'intitulé de
     l'indicateur sert seul de libellé, comme le prévoit le brief (« aucun libellé inventé »). */
  { id: "DC1.f.01", dc: "DC1", competence: "DC1.f", libelle: "Connaître et faire connaître les consignes de sécurité", source: "INRS V07 § 6.1 p. 18", module: "M2", niveau: "N1" },

  /* ---------- DC2 — Monter et démonter conformément à la notice (INRS V07 § 6.2 p. 20-21) ---------- */

  /* 2.1 : repris tel quel par 3.1 et 4.1 (même contenu, mêmes libellés dans le document) —
     module M5, celui qui porte réellement « 4.1 » dans programme.js. */
  { id: "2.1.01", dc: "DC2", competence: "2.1", libelle: "Identifier les types : échafaudages à cadres, échafaudages multidirectionnels", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },
  { id: "2.1.02", dc: "DC2", competence: "2.1", libelle: "Identifier le domaine d'utilisation : domaine d'utilisation de chacun", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },
  { id: "2.1.03", dc: "DC2", competence: "2.1", libelle: "Identifier le domaine d'utilisation : capacité portante (classe de plancher)", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },
  { id: "2.1.04", dc: "DC2", competence: "2.1", libelle: "Identifier le domaine d'utilisation : classe d'échafaudages", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },
  { id: "2.1.05", dc: "DC2", competence: "2.1", libelle: "Identifier les éléments : terminologie", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },
  { id: "2.1.06", dc: "DC2", competence: "2.1", libelle: "Identifier les éléments : configurations particulières (porte-à-faux, déport…)", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },
  { id: "2.1.07", dc: "DC2", competence: "2.1", libelle: "Justifier le choix et la mise en œuvre des protections collectives de montage : protection collective des monteurs (échafaudages Montage-Démontage en Sécurité, MDS)", source: "INRS V07 § 6.2 p. 20-21", module: "M5", niveau: "N1", alias: ["3.1", "4.1"] },

  /* 2.2 : repris tel quel par 3.2 — module M6, qui porte « 2.2 » et « 3.2 » dans programme.js. */
  { id: "2.2.01", dc: "DC2", competence: "2.2", libelle: "Comprendre une notice : analyse des textes, dessins et plans figurant dans une notice", source: "INRS V07 § 6.2 p. 20-21", module: "M6", niveau: "N1", alias: ["3.2"] },
  { id: "2.2.02", dc: "DC2", competence: "2.2", libelle: "Comprendre une notice : configuration des ancrages selon montages spécifiques", source: "INRS V07 § 6.2 p. 20-21", module: "M6", niveau: "N1", alias: ["3.2"] },
  { id: "2.2.03", dc: "DC2", competence: "2.2", libelle: "Exploiter une notice : cinématique de montage/démontage", source: "INRS V07 § 6.2 p. 20-21", module: "M6", niveau: "N1", alias: ["3.2"] },

  { id: "2.3.01", dc: "DC2", competence: "2.3", libelle: "Aménager l'aire de travail : définition des zones (travail, stockage…)", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.02", dc: "DC2", competence: "2.3", libelle: "Aménager l'aire de travail : balisage et signalisation du chantier", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.03", dc: "DC2", competence: "2.3", libelle: "Réceptionner le matériel : conditionnement et stockage du matériel", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.04", dc: "DC2", competence: "2.3", libelle: "Vérifier l'état du matériel : vérification (cas de rebut)", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.05", dc: "DC2", competence: "2.3", libelle: "Sélectionner l'outillage", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.06", dc: "DC2", competence: "2.3", libelle: "Choisir les équipements de protection du monteur : EPI (casques, chaussures, gants, tenue de travail…)", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.07", dc: "DC2", competence: "2.3", libelle: "Choisir les équipements de protection du monteur : dispositifs de protection individuelle contre les chutes de hauteur", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },
  { id: "2.3.08", dc: "DC2", competence: "2.3", libelle: "Choisir les équipements de protection du monteur : possibilité d'ancrage sur échafaudages", source: "INRS V07 § 6.2 p. 20-21", module: "M10", niveau: "N1" },

  { id: "2.4.01", dc: "DC2", competence: "2.4", libelle: "Utiliser à bon escient les équipements de protection du monteur (mêmes items qu'en 2.3)", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.02", dc: "DC2", competence: "2.4", libelle: "Utiliser l'outillage", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.03", dc: "DC2", competence: "2.4", libelle: "Implanter l'échafaudage : choix des appuis", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.04", dc: "DC2", competence: "2.4", libelle: "Implanter l'échafaudage : calage", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.05", dc: "DC2", competence: "2.4", libelle: "Implanter l'échafaudage : verticalité/horizontalité", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.06", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : cinématique de montage/démontage", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.07", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : poteaux/cadres", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.08", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : garde-corps", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.09", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : planchers préfabriqués", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.10", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : contreventement (rôle et disposition)", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.11", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : accès (positionnement et protection)", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.12", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : verticalité/horizontalité", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.13", dc: "DC2", competence: "2.4", libelle: "Monter et démonter en sécurité : montages spécifiques (console, porte-à-faux, poutre de franchissement et/ou escaliers d'accès, levage de charges par potence)", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.14", dc: "DC2", competence: "2.4", libelle: "Approvisionner les éléments aux différents niveaux : élingage dans le cadre de l'activité", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.15", dc: "DC2", competence: "2.4", libelle: "Mettre en œuvre et apprécier la qualité et la résistance des ancrages et amarrages : ancrages (chevilles, vérins…)", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.16", dc: "DC2", competence: "2.4", libelle: "Mettre en œuvre et apprécier la qualité et la résistance des ancrages et amarrages : utilisation d'un extractomètre", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.17", dc: "DC2", competence: "2.4", libelle: "Mettre en œuvre et apprécier la qualité et la résistance des ancrages et amarrages : amarrages (rôle)", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.18", dc: "DC2", competence: "2.4", libelle: "Mettre en œuvre et apprécier la qualité et la résistance des ancrages et amarrages : vérification du bon montage et de la résistance", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.19", dc: "DC2", competence: "2.4", libelle: "Apposer le(s) panneau(x) indicateur(s) des charges d'exploitation", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },
  { id: "2.4.20", dc: "DC2", competence: "2.4", libelle: "Vérifier la conformité du montage par rapport à la notice et/ou au plan d'installation : autocontrôle de l'échafaudage après montage", source: "INRS V07 § 6.2 p. 20-21", module: "M11", niveau: "N1" },

  /* ---------- DC3 — Vérification journalière (INRS V07 § 6.3 p. 25-26) ---------- */

  /* 3.1 et 3.2 : voir alias sur 2.1 et 2.2 ci-dessus, pas d'item ici (même contenu). */

  { id: "3.3.01", dc: "DC3", competence: "3.3", libelle: "Identifier les responsabilités liées à la mission de vérification : responsabilité civile et pénale", source: "INRS V07 § 6.3 p. 25-26", module: "M8", niveau: "hors-cible", pourquoi: "notion juridique hors périmètre N1 CAP" },
  { id: "3.3.02", dc: "DC3", competence: "3.3", libelle: "Identifier les responsabilités liées à la mission de vérification : délégation de pouvoir en matière de S&ST", source: "INRS V07 § 6.3 p. 25-26", module: "M8", niveau: "hors-cible", pourquoi: "délégation de pouvoir S&ST : relève de l'employeur/encadrement, pas du CAP" },
  { id: "3.3.03", dc: "DC3", competence: "3.3", libelle: "Se référer au cadre réglementaire : réglementation spécifique aux échafaudages", source: "INRS V07 § 6.3 p. 25-26", module: "M8", niveau: "N1" },
  { id: "3.3.04", dc: "DC3", competence: "3.3", libelle: "Se référer au cadre réglementaire : le contenu des vérifications", source: "INRS V07 § 6.3 p. 25-26", module: "M8", niveau: "N1" },

  /* 3.4 : « seize points de vérification » selon le document — deux indicateurs (plancher,
     ancrages/amarrages) portent chacun deux points, d'où 14 tirets → 16 items. */
  { id: "3.4.01", dc: "DC3", competence: "3.4", libelle: "Vérifier l'absence de déformation permanente ou de corrosion des éléments constitutifs pouvant compromettre la solidité", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.02", dc: "DC3", competence: "3.4", libelle: "Vérifier la présence de tous les éléments de fixation ou de liaison des constituants et l'absence de jeu décelable susceptible de les affecter", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.03", dc: "DC3", competence: "3.4", libelle: "Vérifier l'implantation de l'échafaudage : verticalité/horizontalité", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.04", dc: "DC3", competence: "3.4", libelle: "Vérifier l'absence de désordre au niveau des appuis et des surfaces portantes : calage", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.05", dc: "DC3", competence: "3.4", libelle: "Vérifier la présence de tous les éléments de calage et de stabilisation ou d'immobilisation", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.06", dc: "DC3", competence: "3.4", libelle: "Vérifier la présence et la bonne installation des dispositifs de protection collective : continuité des garde-corps", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.07", dc: "DC3", competence: "3.4", libelle: "Vérifier le maintien de la continuité, de la planéité, de l'horizontalité et de la bonne tenue de chaque niveau de plancher : verrouillage anti-soulèvement", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.08", dc: "DC3", competence: "3.4", libelle: "Vérifier le maintien de la continuité, de la planéité, de l'horizontalité et de la bonne tenue de chaque niveau de plancher : trappes", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.09", dc: "DC3", competence: "3.4", libelle: "Vérifier l'absence d'encombrement des planchers", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.10", dc: "DC3", competence: "3.4", libelle: "Vérifier la présence et la bonne tenue des ancrages et amarrages : positionnement/nombre des ancrages et amarrages", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.11", dc: "DC3", competence: "3.4", libelle: "Vérifier la présence et la bonne tenue des ancrages et amarrages : vérification du bon montage et de la résistance", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.12", dc: "DC3", competence: "3.4", libelle: "Vérifier le positionnement/nombre et le bon montage des contreventements", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.13", dc: "DC3", competence: "3.4", libelle: "Vérifier la présence et l'installation des moyens d'accès : montage de la 3ᵉ lisse", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.14", dc: "DC3", competence: "3.4", libelle: "Vérifier la visibilité des indications relatives aux charges admissibles", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.15", dc: "DC3", competence: "3.4", libelle: "Vérifier l'absence de charges dépassant ces limites admissibles", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },
  { id: "3.4.16", dc: "DC3", competence: "3.4", libelle: "Vérifier la bonne fixation des filets et des bâches sur l'échafaudage, ainsi que la continuité du bâchage sur toute la surface extérieure", source: "INRS V07 § 6.3 p. 25", module: "M9", niveau: "N1" },

  /* ---------- DC4 — Utiliser en sécurité (INRS V07 § 6.4 p. 29-30) ---------- */

  /* 4.1 : voir alias sur 2.1 ci-dessus, pas d'item ici (même contenu). */

  { id: "4.2.01", dc: "DC4", competence: "4.2", libelle: "Choisir et utiliser à bon escient les équipements de protection de l'utilisateur : EPI (casques, chaussures, gants, tenue de travail…)", source: "INRS V07 § 6.4 p. 29-30", module: "M7", niveau: "N1" },
  { id: "4.2.02", dc: "DC4", competence: "4.2", libelle: "Accéder et circuler en sécurité : tours d'accès, escaliers, échelles et trappes (fermeture après utilisation)", source: "INRS V07 § 6.4 p. 29-30", module: "M7", niveau: "N1" },
  { id: "4.2.03", dc: "DC4", competence: "4.2", libelle: "Respecter les limites de charges : limites de charges des planchers (en cas de stockage de matériaux)", source: "INRS V07 § 6.4 p. 29-30", module: "M7", niveau: "N1" },
  { id: "4.2.04", dc: "DC4", competence: "4.2", libelle: "Maintenir l'échafaudage en sécurité : aucune modification de l'échafaudage ne doit être opérée", source: "INRS V07 § 6.4 p. 29-30", module: "M7", niveau: "N1" },
  { id: "4.2.05", dc: "DC4", competence: "4.2", libelle: "Tenir compte de la co-activité sur les chantiers : prévention des risques pour les travailleurs avoisinants (chutes d'objets, effondrement de charges)", source: "INRS V07 § 6.4 p. 29-30", module: "M7", niveau: "N1" },

  /* ---------- DC5 — hors périmètre du document INRS lu, nommé pour mémoire ---------- */

  { id: "DC5.01", dc: "DC5", competence: "DC5", libelle: "Vérificateur interne : examens d'adéquation, de montage et d'installation, vérifications trimestrielles (formation F2 de la R408)", source: "programme.js HORS_CIBLE (domaine DC5)", module: null, niveau: "hors-cible", pourquoi: "domaine DC5, au-delà du CAP, jamais enseigné ici (programme.js HORS_CIBLE)" },

  /* ---------- Partie 2 — points clés de la recommandation R408 (docs/COUVERTURE-R408.md) ---------- */

  /* R-01 : la partie 3 (tableau) place ce point en M9 (secondaire M5) ; le brief donne en
     exemple de contrat un module "M7" pour ce même item — écart avec sa propre partie 3, donc
     retenu ici le module de la partie 3 (règle explicite du § 2), pas celui de l'exemple. */
  { id: "R-01", dc: "R408", competence: "§ 5.1.1 / 5.7", libelle: "Pare-gravois, écrans et filets : protéger les tiers contre la chute d'objets ; reconnaître leur présence et leur fixation, savoir qu'ils imposent un amarrage renforcé", source: "R408 § 5.1.1, § 5.7, annexe 8", module: "M9", niveau: "N1" },
  { id: "R-02", dc: "R408", competence: "§ 5.4.3 / 5.6", libelle: "Bâchage et filets : reconnaître un bâchage discontinu ou mal fixé et le signaler ; un échafaudage bâché prend davantage le vent ; on ne bâche jamais un échafaudage en cours de montage", source: "R408 § 5.4.3, § 5.6 ; référentiel INRS DC3.4", module: "M9", niveau: "N1" },
  /* R-03 : module cible M10 (préparation), rappel en M9 (vérification) selon la partie 3. */
  { id: "R-03", dc: "R408", competence: "§ 5.4.2 / 5.5.1 / 5.7", libelle: "Ancrages et amarrages : le nombre et la disposition sont fixés par la notice, jamais par l'utilisateur ; en vérification journalière, reconnaître un ancrage manquant, desserré ou endommagé", source: "R408 § 5.4.2, § 5.5.1, § 5.7 — aucun chiffre (nombre, espacement, résistance) NON VÉRIFIÉ, à ne pas donner", module: "M10", niveau: "N1" },
  { id: "R-04", dc: "R408", competence: "SOURCES-REGLEMENTAIRES C11/D.1", libelle: "Distance plancher-façade : reconnaître un écart excessif (repère : plus de 20 cm sans protection) comme une non-conformité à signaler", source: "document de référence INRS R408 V07, cf. docs/SOURCES-REGLEMENTAIRES.md C11", module: "M10", niveau: "N1" },
  { id: "R-05", dc: "R408", competence: "R4544-24 / arrêté du 5 juillet 2024", libelle: "Lignes électriques aériennes à proximité : point d'arrêt avant montage ; une distance de sécurité réglementaire existe (3 m ou 5 m selon la tension) ; on signale, on ne détermine pas soi-même la tension", source: "Code du travail R4544-24 ; arrêté du 5 juillet 2024, art. 2, tableau A (vérifié)", module: "M10", niveau: "N1" },
  /* R-06 : module cible M6 (notice/étiquette), secondaire M7 (utiliser en sécurité) selon la partie 3. */
  { id: "R-06", dc: "R408", competence: "NF EN 12811-1", libelle: "Classes de charge : lire la classe affichée sur l'étiquette et la charge admissible en kg/m² ; refuser tout stockage au-delà de ce qui est indiqué — pas de calcul ni de conversion exigés", source: "sources professionnelles convergentes, norme non consultée (cf. docs/SOURCES-REGLEMENTAIRES.md C10/D.2) ; classes 4 à 6 plus fragiles, à ne pas donner comme chiffre officiel", module: "M6", niveau: "N1" },
  /* R-07 : module cible M10 (préparation), secondaire M11 (contreventement) selon la partie 3. */
  { id: "R-07", dc: "R408", competence: "R4323-74", libelle: "Lestage et stabilité : un échafaudage de pied doit toujours être ancré/amarré ou stabilisé par un moyen équivalent avant utilisation ; refuser de monter dessus si rien ne l'assure", source: "Code du travail, art. R4323-74 (vérifié pour le principe ; NON VÉRIFIÉ pour tout seuil chiffré)", module: "M10", niveau: "N1" },
  { id: "R-08", dc: "R408", competence: "§ 5.4.3 / annexes 1-2", libelle: "Consoles et configurations spécifiques : nommer une console ou un porte-à-faux comme une configuration qui sort du montage simple appris en CAP, toujours suivie d'une note de calcul propre", source: "R408 § 5.4.3, annexes 1 et 2 ; référentiel INRS DC2.4", module: "M5", niveau: "N1" },
  { id: "R-09", dc: "R408", competence: "§ 5.1.1 / 5.3.1 / annexe 4", libelle: "Stockage sur les planchers : ne stocker que ce que la charge admissible affichée autorise ; refuser un stockage qui encombre ou dépasse le plancher", source: "R408 § 5.1.1, § 5.3.1, annexe 4 ; référentiel INRS DC4.2", module: "M7", niveau: "N1" },
  /* R-10 : déjà couvert (M3 pour le garde-corps, rappelé en M9 pour la vérification) selon la
     partie 3 — aucune absence, l'item existe pour que la matrice le confirme. */
  { id: "R-10", dc: "R408", competence: "R4323-59", libelle: "Plinthes et garde-corps : trois éléments (lisse, lisse intermédiaire, plinthe), hauteurs réglementaires, continuité vérifiée chaque jour", source: "Code du travail R4323-59 (vérifié), cf. docs/SOURCES-REGLEMENTAIRES.md A4", module: "M3", niveau: "N1" },
  { id: "R-11", dc: "R408", competence: "§ 5.9 / annexe 3", libelle: "Signalisation et balisage : reconnaître le panneau apposé sur l'échafaudage (conditions d'utilisation, accès interdit, charges admissibles) ; un échafaudage sans panneau ne s'utilise pas", source: "R408 § 5.9, annexe 3 ; référentiel INRS DC2.3 (cf. docs/SOURCES-REGLEMENTAIRES.md D.3)", module: "M10", niveau: "N1" },
  /* R-12 : module cible M11 (montage/démontage), secondaire M4 (signaler) selon la partie 3. */
  { id: "R-12", dc: "R408", competence: "R4323-69 / § 5.1.2", libelle: "Conditions météo : un montage ou une utilisation s'interrompt en cas de météo dégradée (vent fort, orage, gel) ; on en réfère au responsable de chantier, sans seuil chiffré à donner", source: "Code du travail R4323-69 (vérifié) ; R408 § 5.1.2, § 5.4.3 (principe vérifié, seuil NON VÉRIFIÉ)", module: "M11", niveau: "N1" },

];
