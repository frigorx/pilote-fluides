# Progress — Animation branche Impact environnemental

## Session du 24/08/2026

- Branche Impact environnemental validée par F. Henninot comme première branche.
- Contrôle sessions parallèles : dépôt propre sur `main` (2b6d218), aucune session concurrente.
- Phase 1 faite : extraction des 40 écrans (script Node, annexe-ecrans-impact.md),
  tri selon les critères des consignes → **19 animations fermes, 3 facultatives,
  18 fixes**. Détail dans findings.md.
- Constat : l'« enveloppe qui rétrécit » citée par Franck est dans F-Gaz 3
  (déjà animée), pas dans la branche Impact — signalé.
- Fausse alerte `<\strong>` : artéfact d'affichage de l'outil de recherche,
  fichiers vérifiés propres.
- Phase 2 close : feu vert de Franck (« passe par Claude Design, rendu plus
  percutant et professionnel »). Arbitrages : 19 fermes seules ; rehausser sans
  réinventer ; station pilote d'abord (PRP & ODP), le reste après validation.
- Phase 3 — station pilote produite :
  - Projet Design « Législation — Animations Impact environnemental »
    (`78a71ea1-d37d-40bb-bc59-638296de8064`), charte inerWeb liée, jeton de
    session posé (un seul consentement).
  - 4 SVG animés : mecanisme-odp (molécules qui montent, entaille/coche),
    mecanisme-prp (sol ajouté, chaleur qui circule), repere-deux-axes
    (6 fluides en séquence, zone hachurée), cas-chambre-froide (nuages nés
    égaux, le rouge gonfle ×3922). SMIL autonome sans script, état au repos =
    image finale (charte), boucle 12-14 s avec repos ~5 s.
  - 🔴 DÉCOUVERTE : write_files Design assainit les .svg (animate + style
    retirés du stockage). → Sources dans `svg-proposes/prp-odp/` (local,
    RÉFÉRENCE pour la réintégration) ; page de validation avec les 8 SVG
    inline (préfixés s1-s8 par script `generer-page-validation.mjs`).
  - Vérifications faites (local port 8123 + serve Design) : 0 erreur console,
    8 SVG chargés, styles scopés ; chevauchement texte/mobile contrôlé à 10
    instants par pièce (aucun) ; séquence du repère confirmée aux 4 temps ;
    nuage mesuré 96→266 px entre 4 et 7 s ; timeline figée en onglet masqué
    = comportement Chrome, pas un défaut.
  - Copie locale de contrôle : `page-validation-prp-odp.html` (même dossier),
    aussi servie sur http://localhost:8123/.planning/2026-08-24-animation-impact/page-validation-prp-odp.html
- Direction graphique validée par Franck (« ok je valide »).
- Les 4 autres stations produites dans la foulée : 15 SVG animés
  (svg-proposes/tewi ×5, acv ×3, ecoconception ×3, montreal-kigali ×4)
  + 4 pages de validation inline poussées dans le projet Design
  (générateur : scratchpad/generer-pages-validation-4-stations.mjs).
- Défauts trouvés et corrigés PENDANT la passe :
  - balance-tewi : halo du pivot supprimé (bbox sur le cartouche TEWI) ;
  - part-directe : chute de la goutte raccourcie (finissait sur le texte) ;
  - piege-machine-qui-fuit : chutes des gouttes raccourcies (idem) ;
  - lien-tewi : légende « part directe… » posée sur un cartouche clair —
    elle était gris sur gris dans l'ORIGINAL (défaut hérité corrigé) ;
  - montreal-1987 : légendes de la couche d'ozone déplacées hors des
    trajets — le trait tireté passait sur le texte dans l'ORIGINAL.
- Vérifications : sondes chevauchement texte/mobile à 12 instants par pièce
  (local, port 8123) → zéro chevauchement réel ; rendu Design contrôlé pour
  les 4 pages (animations présentes : TEWI 3/8/9/8/12, ACV 13/4/8,
  Éco 13/14/5 + masque, MK 6/11/13/5 ; séquence Kigali confirmée à t=4 s).
- **En attente : relecture des 19 animations par Franck (une salve), puis
  Phase 4 réintégration depuis svg-proposes/ (jamais depuis Design).**
