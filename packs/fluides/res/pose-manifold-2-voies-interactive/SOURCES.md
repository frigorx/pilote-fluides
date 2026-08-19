# Sources métier

## Archive de fiches métier fournie le 13 août 2026

- `~\OneDrive\Bureau\25 26\Fiches méthodes + exercices CERFA.zip` — SHA-256 `07AD49E78CF116682DC8C35751253414189AE102663AFE2C0D849D18194020A2`.
- `01 Fiche méthode pose des manos.docx` — pose du manifold, mise au vide des lignes et passage en lecture.
- `02 Fiche méthode dépose des manifolds avec EVM.docx` — dépose par retour du fluide des lignes et remise en état.
- `03 Fiche métode MSP.docx` — mise sous pression à l’azote et recherche de fuite.
- `04 Fiche métode Tirage au vide.docx` — raccordement pompe/vacuomètre et ordre du tirage au vide.
- `05 Fiche métode charge installation.docx` — charge par masse connue et traçabilité.
- `06 Fiche méthode récupération de fluide frigorigène.docx` — raccordement station/bouteille, récupération et purge interne.

Les originaux restent dans le ZIP fourni. Ils n’ont pas été modifiés ni copiés dans le livrable. La comparaison et les écarts de sécurité sont détaillés dans `COMPARAISON-FICHES-METIER-2-VOIES.md`.

## Production inerWeb explicitement fournie

- `~\Desktop\inerweb full ia\vanne-rotalock-pedagogique\animation-technique.html` — animation technique à réutiliser selon la demande du 13 août 2026.
- `~\Desktop\inerweb full ia\vanne-rotalock-pedagogique\simple-diagrams.js` — source des schémas fixes manuels, notamment la position arrière avec P après le siège et P1 côté circuit.
- `../vanne-service-interactive/vanne-3d.webp` et son `SOURCES.md` — rendu local en perspective d’après la géométrie constructeur, produit et autorisé par F. Henninot pour la reconnaissance pédagogique de l’organe.
- `visuals.js` — adaptation SVG manuelle pour ce parcours : séparation clé/vanne, scènes ciblées, coupe P après siège arrière et commandes interactives.
- `../svg/manifold-lecture.svg` — fonction des robinets d’un manifold 2 voies : lecture robinets fermés, communication avec la voie centrale lorsqu’un robinet est ouvert.
- `../svg/ordre-vannes.svg` — isolement, stabilisation, pression résiduelle et déconnexion contrôlée.
- `../svg/secu-projection.svg` — projection dans l’axe du raccord, brûlure froide, lunettes et gants avant manipulation ; ressource interne inerWeb déjà versionnée.

## Fonds pédagogique local consulté par le RAG

- `02_CAP-IFCA/C3-Realiser/DT3 Le manifold du frigoriste-Ressources.docx` — constitution du manifold frigoriste 2 voies.
- `02_CAP-IFCA/C4-MettreEnService/TD_Pose-manifold-tirage-au-vide_version-modifiable.docx` — outillage, EPI et ordre de pose/tirage au vide.
- `02_CAP-IFCA/C4-MettreEnService/pose-du-manomètre-2.pdf` — joints, étalonnage, raccordements BP/HP, flexible central et pompe.
- `02_CAP-IFCA/C3-Realiser/_Fiche synthese Activité 1 Pose et dépose bipasse.pdf` — étalonnage, vannes de service, flexibles et contrôle du vide.
- `02_CAP-IFCA/C4-MettreEnService/pose des mano et deposedes mano.docx` — état du manifold, joints, pompe, serrages, vide et position de lecture.
- `02_CAP-IFCA/C4-MettreEnService/TRAVAUX PRATIQUES POSE des manifold et réglage Pressostat BP.docx` — pose/dépose sans perte et réglage du pressostat BP.
- `02_CAP-IFCA/C4-MettreEnService/Pose-et-depose-des-manometres_atelier-24-25.docx` — enchaînement atelier de pose, lecture et dépose.
- `02_CAP-IFCA/C4-MettreEnService/TP_CAPIFCA_manometres.docx` — contrôles et étanchéité finale après manipulation.
- `02_CAP-IFCA/C4-MettreEnService/Pose et dépose d’une paire de manomètre sur un climatiseur.docx` — fonctionnement en froid, isolement liquide et vidage successif des flexibles.
- `05_Ressources-Partagees/Pressostats-Manometres/Pose des manifolds V2 (1).docx` — mise en ordre d’une fiche méthode CAP IFCA.
- `habilitation-fluide/CONTENU-05-G5-recuperation.md` — fermeture côté circuit, stabilisation de pression, desserrage lent et réduction des émissions.
- `habilitation-fluide/CONTENU-04-G4-etancheite.md` et `points-de-fuite.svg` — raccords mécaniques et presse-étoupes comme points de fuite ; balayage lent et confirmation d’une alerte.
- `pilote-fluides/CAPSULES-SECURITE.md`, capsule « Le froid brûle » — mécanisme de la brûlure froide, axe du jet et protections des yeux et des mains.
- `habilitation-fluide/formation-presentielle/plans-de-seance/M3-plan-de-seance.md` — risques du jour, lunettes et gants de protection au froid avant manipulation, pression résiduelle et conduite en cas d’incident.
- `05_Ressources-Partagees/Pressostats-Manometres/InerWeb_Identification.html` — identification du fluide par informations techniques et relation pression-température dans les conditions prévues.
- `habilitation-fluide/CONTENU-03-G3-controles-mes.md` — azote sec, interdiction de l’oxygène et de l’air, pression limitée par le composant admissible le plus faible.
- `tirage-au-vide.svg` — position du vacuomètre près du circuit, isolement avant arrêt de la pompe et contrôle de tenue.
- `circuit-complet-manifold.svg` et le module local `recuperation-fluide-interactive` — trajet manifold, station et bouteille ; réemploi du principe sans copier une procédure de sélecteur propre à une autre station.

## Cadre réglementaire vérifié le 13 août 2026

- Règlement d’exécution (UE) 2024/2215, annexe I, compétence `5.01` — connexion et déconnexion des jauges et lignes avec un minimum d’émissions : <https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215>.
- Arrêté français du 21 novembre 2025 relatif aux attestations d’aptitude, compétence `5.01` — même exigence de minimum d’émissions : <https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000053005893/2026-03-21>.

Ces textes imposent le résultat de réduction des émissions. Ils ne prescrivent pas explicitement, dans les passages consultés, qu’un modèle déterminé de mini-vanne équipe chaque flexible. La mini-vanne quart de tour dessinée correspond au matériel de plateau indiqué par F. Henninot.

## Limites documentées

- aucune pression, durée, couple ou nombre de tours universel n’est affiché ;
- le seuil QCM `16/19` est un repère interne à l’entraînement, pas un seuil d’examen ;
- le choix de l’organe d’isolement liquide, le critère d’arrêt du pump-down et la méthode de recherche de fuite restent soumis à la procédure validée du plateau ;
- le retrait de bobine avec tournevis et la neutralisation d’un pressostat BP ne sont pas généralisés ;
- la dépressurisation finale de l’azote, la charge liquide côté aspiration et la séquence exacte d’auto-purge restent soumises au matériel du plateau ;
- la notice constructeur et la procédure locale priment sur la simulation.
