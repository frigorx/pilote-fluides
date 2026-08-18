# Animation — Le fil conducteur d'une intervention fluide

> **Statut : BROUILLON DE CONCEPTION.** Non publié, non canonique, non indexé dans le RAG.

## Intention

Produire une seule slide de synthèse, simple et linéaire, inspirée du principe narratif de la vidéo CEDEO : un trait continu fait apparaître progressivement les idées. Aucun dessin, personnage ou élément graphique de la vidéo n'est repris.

La planche résume le parcours attendu d'un stagiaire :

1. **Comprendre** — climat, santé et sécurité ;
2. **Être autorisé** — aptitude de la personne et capacité de l'entreprise ;
3. **Préparer** — identifier le fluide, la charge, les risques et les EPI ;
4. **Intervenir** — récupérer, employer l'azote, tirer au vide et charger ;
5. **Contrôler** — étanchéité, mesures et remise en service ;
6. **Tracer** — peser, renseigner les documents et orienter le fluide récupéré vers le traitement.

Durée de l'animation et de la piste vocale : environ **32 secondes**. L'état initial est volontairement visible en retrait ; l'animation active chaque étape. L'état final reste une planche fixe lisible et imprimable.

La voix ne démarre jamais au chargement. Le bouton **Animation + voix** relance le SVG et la piste locale au même instant. La lecture peut être arrêtée ; le changement d'onglet arrête également la voix. Le texte prononcé est affiché intégralement sous la slide et l'animation reste utilisable sans audio.

## Fichiers

- `animation-fil-conducteur-fluides.svg` — SVG autonome, 1600 × 900, sans dépendance ;
- `index.html` — prévisualisation plein écran, commandes vocales et texte intégral ;
- `narration-fil-conducteur.mp3` — voix française locale, 32,26 s ;
- `narration-fil-conducteur.json` — six phrases et leurs instants de départ ;
- `generer-vocal.py` — script de fabrication reproductible avec Piper ;
- `SOURCES-AUDIO.md` — voix, modèle, licence et méthode de fabrication ;
- `SOURCES-IMAGES.md` — traçabilité graphique et documentaire.

## Placement proposé

Après la planche **« aptitude et capacité »** du module M1, comme vue d'ensemble de ce que la formation va apprendre. Une seconde utilisation est possible en ouverture du module M8 pour la synthèse.

Ne pas intégrer dans les supports M0–M8 ni reconstruire les PowerPoint avant validation humaine du dessin, du rythme et des six formulations.

## Texte équivalent

« Comprendre : protéger le climat, la santé et la sécurité. Être autorisé : aptitude pour la personne, capacité pour l'entreprise. Préparer : identifier le fluide, la charge, les risques et les équipements de protection. Intervenir : récupérer, travailler à l'azote, tirer au vide, puis charger. Contrôler : étanchéité, mesures et remise en service. Tracer : peser, renseigner les documents et traiter le fluide récupéré. Zéro rejet volontaire. »

## Sources métier

- `BIBLE-F-GAS-III.md` — cadre réglementaire général ;
- `PLAN-BRIQUE-MANIPULATION.md` — fil pratique : pose, récupération, azote, vide, charge, contrôle et traçabilité ;
- arrêté du 21 novembre 2025 relatif à l'attestation d'aptitude : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053004604
