# Chantier du 30/09/2026 — finir Législation, rendre CuivRézo ludique

Commande de F. Henninot (30/09, autonomie totale, « aucune décision ne m'est confiée ») :
finir les réseaux orphelins (CuivRézo, Législation), effet waouh, apprentissage ludique,
3D au besoin, Codex et Claude Design autorisés ; une feuille de guidance numérique ET
papier, élève et professeur ; Législation = BTS, progression + livret qui renvoie à chaque
station. **Sauvegarder, puis soumettre à validation AVANT toute mise en ligne.**
Hors périmètre : HoCourant et Câblage virtuel (sessions en cours).

## Où l'on travaille
- Législation : worktree `C:\git\pilote-fluides-chantier`, branche `chantier-2026-09-30`
  (le dépôt principal reste libre pour les sessions HoCourant / Câblage qui publient).
- CuivRézo : atelier `C:\git\cuivrezo` (livraison dans le worktree à la fin).
- Rien n'est poussé. Fusion + push seulement après validation de Franck.

## Décisions prises (autonomie)
1. **Législation, ludique = le livret du chargé d'affaires.** L'étudiant BTS est un jeune
   chargé d'affaires dans une entreprise CVC ; chaque station est une MISSION (un client,
   une situation réelle, une pièce de dossier à produire). Données : `stations/<slug>/mission.json`.
   Le livret (élève + corrigé professeur) est GÉNÉRÉ de ces fichiers, avec un QR par station.
   Chaque accueil de station affiche sa mission (script idempotent, comme poser-les-scenes).
2. **Législation, waouh = le bâtiment en 3D** en porte d'entrée du réseau : un bâtiment
   tertiaire en coupe (Three.js), une zone par sous-ligne (toiture PAC = acoustique, local
   technique = fluidique + DESP, tableau = électrique, escalier/désenfumage = incendie,
   enveloppe = thermique, bureau = droit du travail + certifications, benne = déchets…).
   Clic sur une zone → sa sous-ligne. Le plan SVG existant reste (accessible, imprimable).
3. **Législation, 28 stations à produire** sur le gabarit `stations/aptitude-capacite/`,
   une station par agent Sonnet, par branche. Doctrine inchangée : aucun chiffre non
   sourcé (source officielle citée dans FOND.md, sinon omis), `data-prototype` posé.
4. **CuivRézo, ludique = le passeport du cuivre** : défis tirés AUTOMATIQUEMENT des
   données existantes (remettre les gestes dans l'ordre, relier piège ↔ cause, bonne ou
   mauvaise pièce), tampons de réussite par station, carte de progression.
5. **CuivRézo, waouh = la pièce en 3D** (Three.js, TubeGeometry) : le coude, le chapeau de
   gendarme, la baïonnette… tournent à l'écran ; sur 1.4/1.5 le tube se cintre au curseur.
6. **CuivRézo papier** : passeport élève (carte de progression, une page par station :
   ce que j'obtiens, défis papier, case tampon, QR) + dossier professeur (grille 0-4 par
   station tirée des critères, corrigés, organisation de l'atelier), générés des données.
7. **Points à valider CuivRézo** : tranchés par moi, avec source, dans `DECISIONS-2026-09-30.md`.
8. Images : Codex (dessin inerWeb) pour les 5 scènes des nouvelles sous-lignes et les
   couvertures des deux livrets. Claude Design seulement si un habillage l'exige.
9. Voix : MP3 edge-tts des nouvelles narrations (chaîne existante, feu vert du 24/08).

## Phases
- [x] P0 Cadrage, briefs sur disque (ce dossier : `brief-station.md`, `brief-mission.md`)
- [x] P1 Législation vague 1 : Fluidique (2) + Électrique (6)
- [x] P2 Législation vague 2 : Incendie (6) ; vague 3 : Acoustique (5) + Certifications (4) ; vague 4 : Droit du travail (5)
- [x] P3 Missions des 57 stations + générateur du livret + boîte mission sur chaque accueil
- [x] P4 Bâtiment 3D (porte d'entrée)
- [x] P5 CuivRézo : moteur de défis + passeport numérique + 3D + livrets papier + décisions
- [x] P6 Scènes Codex, câblage du plan (RESEAU, bandeau), couleurs — voix MP3 Législation EN COURS (commit à part)
- [x] P7 Contrôles (navigateur, débordements, polices ≥ 14 pt sur l'élève, liens), commit local
- [ ] P8 Soumission à validation (lien local + synthèse), PAS de push

## Journal
- 30/09 : worktree créé sur a3df2d16. Briefs : brief-station.md, brief-carnet.md, brief-3d.md,
  `C:\git\cuivrezo\.planning\2026-09-30-passeport\brief.md`. progression.json écrit (P1-P5).
- 30/09 : lancés — vague 1 (en-378, tracabilite-fluides, 6 × elec-) ; CuivRézo lots D, B, A ;
  bâtiment 3D ; couche missions (lot M) ; 7 images Codex (5 scènes, couverture carnet, couverture passeport).
- À lancer : missions des 29 stations existantes (3 agents), lot P (carnet papier) après les
  missions, CuivRézo lot C après le lot D, vagues 2-4 de stations.
- Slugs retenus : acoustique-le-bruit-en-db, acoustique-les-seuils, acoustique-mesurer,
  acoustique-pac-voisinage, acoustique-traiter-le-bruit · incendie-classer-le-bati,
  incendie-euroclasses, incendie-desenfumage, incendie-clapets-coupe-feu, incendie-ssi,
  incendie-sprinkler-ria · certif-loi-norme-dtu, certif-marquage-ce, certif-rge-qualipac,
  certif-garanties · travail-le-contrat, travail-temps-et-paie, travail-droits-devoirs,
  travail-se-former, travail-s-installer. (en-378, tracabilite-fluides → CAS_PARTICULIERS
  de couleur-des-sous-lignes.mjs.)
- Retouches pour l'orchestrateur : aptitude-capacite écran 6 « l'examen complet » → « l'évaluation complète » ;
  couleur-des-sous-lignes.mjs : CAS_PARTICULIERS en-378, tracabilite-fluides ; favicon.ico ajouté (404 sur tout le site).
- Contrôle de cohérence à faire (P7) : deux arrêtés du 22/03/2004 (IT 246 désenfumage vs résistance au feu, abrogé le
  27/03/2026 par l'arrêté du 22/03/2026) — vérifier que incendie-desenfumage et incendie-euroclasses ne se contredisent pas ;
  R. 4216-* abrogés au 01/01/2027 (décret 2025-1100) : aligner incendie-classer-le-bati ; plan : « soumis à la DESP »
  (sprinkler) non sourcé → « à examiner » ; SVG de incendie-euroclasses à recontrôler (scratch partagé).

- 30/09 fin de journée : 57/57 stations, missions, carnet (complet + P1-P5 + livret prof), bâtiment 3D intégré,
  cohérence Incendie corrigée, contrôle structure au vert. Commits : worktree d5323ea1 (branche chantier-2026-09-30),
  cuivrezo c000ed8 (branche passeport-2026-09-30). RIEN POUSSÉ. Reste : commit des MP3 Législation, puis validation
  de F. Henninot → fusion dans main (pilote-fluides + cuivrezo), node build/version.mjs, journal des nouveautés, push.
