# Sources — gare « Préparer le site d'intervention » (ligne « Avant d'intervenir », gare 5.2)

Contenu restructuré, rien d'inventé. Un seul parcours : sur le site, avec la vraie machine, les vrais papiers et les vraies protections.
Repérage au RAG (`chercher-rag.js`) : « préparation de chantier avant d'intervenir accès alimentation protections zone de travail », « permis de feu », « plan de prévention », « accueil sécurité ».

## Le geste (ordre, dangers)
- **Capsule « Préparation de chantier — risques, EPI, zone de travail »** (`pilote-fluides/packs/fluides/res/capsules/donnees/p7.js`, codes 12.04 et 12.05) : l'ordre « analyser le fluide, repérer les dangers de la zone, éliminer ce qui peut l'être, signaler le reste » (étape 4), les cinq points « baliser, dégager une issue, choisir les EPI adaptés, vérifier le matériel, consigner électriquement » (étape 8), et la règle « une issue condamnée, un EPI absent, un détecteur en panne : le chantier n'engage pas » (étapes 6 et 8).
- **HabFluide, chapitre 12 « Hydrocarbures »** (`habilitation-fluide/cours/CONTENU-12-G12-hydrocarbures.md`, § 4 « Analyse de risques et préparation du chantier », codes 12.04 et 12.05) : délimiter la zone, baliser, activer la ventilation, détecteur de gaz portatif vérifié avant de commencer (étapes 6 et 8, fluides inflammables).
- **Fiches pratiques frigoristes 2012** (`profs cour Indexee/03_BAC-MFER/S1-Analyse/fiches_pratiques_frigoristes_2012.pdf`, « SR40 - PREV ») :
  fiche n° 1 « Préparation de l'intervention » : « repérer et vérifier l'état de fonctionnement et/ou la présence des sécurités opérantes : détection de gaz, arrêt d'urgence, extraction d'air, points d'eau (douches, rince œil, …), échappement des soupapes de sécurité ainsi que la localisation des issues de secours libres et accessibles » (étape 5) ;
  fiche n° 4 « Travail en hauteur » : priorité aux protections collectives (nacelle, échafaudage, plateforme individuelle roulante), escabeau pour les opérations courtes sans effort, « les échelles sont des moyens d'accès », quatre conditions pour une échelle dont « en bon état », « à 2 personnes de préférence », « maintenue en pieds par le deuxième opérateur et attachée en tête » (étape 7) ;
  fiche n° 5 « Travail isolé » : un moyen d'alerte, « la simple mise à disposition d'un téléphone pourra suffire » (étape 2).
- **Accueil sécurité d'un site** (`profs cour Indexee/05_Ressources-Partagees/Securite-Risques/Accueil_Securite_ProViande_Marseille.docx`, sujet du CCF EP1 2025-26) : se présenter à l'accueil avec une pièce d'identité, recevoir un badge de visiteur porté en permanence, suivre le briefing sécurité ; gilet, chaussures de sécurité, casque dans les zones signalées (étapes 2 et 6). Seule la structure est reprise ; aucun nom de site, aucun numéro.
- **Papiers du chantier** (étape 3) : stations Législation « Les papiers du chantier » (`risques-papiers-chantier`) et « Le permis de feu » (`incendie-permis-de-feu`), fabriquées dans `D:/git/_wt-st-legis`, **pas encore publiées** : les liens de la gare visent leurs adresses prévues. La gare ne reprend aucun seuil ni aucun article de ces stations : elle dit seulement qu'un papier exigé et non signé arrête le chantier, et que le professeur dit lesquels sont exigés.
- **Classe de sécurité du fluide** (étape 4) : table recopiée de la base fluides d'inerWeb (`pilote-fluides/packs/fluides/res/outils/fluides-data.js`, champ `classe`, 17 fluides). A1 : non inflammable ; A2L, A3 : inflammables (plan « Les classes de sécurité » de Plan thermo-techno).
- **Tension à la prise** (étape 7) : lue sur la prise ou le tableau, comparée à la plaque de l'appareil ; tolérance 10 % + 2 V (celle de la gare « Remplacer un composant électrique », choisie par l'agent de fabrication du lot 1). Aucune mesure sous tension n'est demandée.
- Aucun chiffre réglementaire dans la gare.

## Codes
- CAP IFCA : `skills/referentiels-froid/references/cap-ifca.md` (T7 « Organiser le chantier sur site avant travaux », T8 « Sécuriser son intervention sur site » ; C2.3 « Préparer les conditions d'intervention sur site », C2.1 « Organiser des informations », C2.4 « Sécuriser l'intervention » ; S1.2 « Pièces et autorisations administratives », S6.2 « Principaux risques et moyens de prévention », S6.3 « Identification des dangers et prévention »). La mission donnait C2.3 et C2.1 ; T7, T8, C2.4, S1.2, S6.2, S6.3 sont ajoutés par l'agent de fabrication.
- Bac Pro MFER : `BAC_MFER_2028.json` (A1T3 « Analyser les risques relatifs aux opérations à réaliser », aussi dans `referentiel-mfer.md` ; C4 « Organiser et sécuriser son intervention » ; S1.4 « les procédures administratives », S7.2.3 « La sécurité sur site »). La mission ne donnait pas de code MFER pour cette gare : tous ajoutés par l'agent.
- Attestation fluides : `packs/fluides/referentiel-2025.json` (12.04, 12.05) d'après la capsule p7.

## Dessin (rien dessiné à la main)
Six cartes ; cadres, titres et ombre du poste de `../etancheite-azote/dessin.svg` (`dessin.css` repris, `.entete{flex-wrap:wrap}` ajouté).
- L'accès : symbole « porte » de la collection QElectroTech (`bibliotheque-symboles-energie/.../camaras-muebles/puerta-90.svg`, CC BY 3.0).
- Les papiers : icône « liste de contrôle » de `qcm-travail-hauteur/assets/icons/clipboard.svg` (inerWeb Édu).
- Les protections : illustration `q15-casque-securite.svg` de `qcm-travail-hauteur` (inerWeb Édu, création originale).
- L'alimentation : symbole « prise 16 A » de QElectroTech (`.../20_home_appliances/prise-16.svg`).
- L'accès en hauteur : illustration `q08-echelle-acces.svg` de `qcm-travail-hauteur` (inerWeb Édu).
- La zone : planche `packs/fluides/res/svg/prepa-chantier.svg` (« Avant de toucher quoi que ce soit »).

## Reprise du 22/10/2026 (après la preuve P1)
- Les symboles de schéma sont remplacés par des dessins d'objets reconnaissables, faits main aux couleurs inerWeb (`assets/objets/`) : tableau électrique (alimentation). Les documents (bon, fiche) restent des icônes de document.
- Conformément à la règle « générique », aucun nom de diplôme dans l'attendu commun.
- Sécurité inchangée (P1 : aucune case fragile).
- `dessin.css` : la phrase « sous azote ou sous fluide… » du moteur est masquée et, à 390 px, le bouton « Agrandir » passe au-dessus du schéma.
