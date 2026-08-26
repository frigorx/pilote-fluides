# Findings — composants du circuit

## Déjà établi (vérifié sur disque, 13/08 soir)
- Fusion des 3 versions du pack FAITE par un autre chat à 19:39–19:44 :
  1 423 MP3 dans `packs/fluides/res/voix/audio/`, capsules raccordées (06dd52d),
  synchronisé avec origin. Copies HabFlu/DEMO et zip (18:43) PAS à jour — chantier séparé.
- `tp-cintrage` : 0 mp3, rien depuis 07/08. `atelier-animations` : rien depuis 09/08,
  master ahead 4 de origin (push volontairement retenu).
- Bureau `C:\Users\henni\Desktop\inerweb full ia` existe, ~73 500 fichiers, contient
  aussi des pièges (qa-edge-profile-sujet4 = profil Edge de QA, pas une livraison).

## Sources à intégrer (titres vérifiés en Phase 1 — FAIT par le chat « fusion », 13/08 ~20 h)
| Composant | Dossier Bureau | Version retenue | Titre index.html |
|---|---|---|---|
| Bouteille liquide (l'ORGANE, ≠ Mission Bouteilles) | `bouteille-liquide-pedagogique/` | unique, 186 Ko | « Comprendre la bouteille liquide · inerWeb Édu » |
| Filtre déshydrateur v3 | `filtre-deshydrateur-pedagogique/` | unique, 12 Mo dont **8,5 Mo de `qa/` NON référencé** (exclusion sûre, vérifiée) | « Comprendre le filtre-déshydrateur · inerWeb Édu » |
| Vanne Rotalock | `vanne-rotalock-pedagogique/` | **le dossier EST la v5 mini-jeux** (diff vide contre le zip v5 du 02/08 19:38) ; exclure son doublon interne `vanne-rotalock-pedagogique/` et `build/` (non référencé) | « Découvrir la vanne de service Rotalock · inerWeb Édu » |
| Voyant de liquide v6 | `voyant-liquide-pedagogique/` | unique, 220 Ko | « Comprendre le voyant liquide · inerWeb Édu » |

Dossiers d'harmonisation 12-13/08 vérifiés : plans de séance et guidance plateau,
AUCUNE version plus récente des 4 modules.

**Droits d'images vérifiés** : bouteille et voyant 100 % production interne (SOURCES-IMAGES.md,
« aucun média tiers ») ; filtre = registre complet, 1 photo Wikimedia Commons créditée ;
Rotalock = PAS de SOURCES-IMAGES.md mais images = schémas SVG internes numérotés (positions
BP/HP) + 2 aperçus du module lui-même. Décision Franck 13/08 sur ses illustrations : intégrer
sans redemander.

**Vérifs d'import PASSÉES sur les 4** : aucun `prefers-color-scheme` ; les blocs
`prefers-reduced-motion` n'éteignent que du décoratif (états de base visibles — vérifié
`sg-bubbles`, `flow-trace`, `flame`) ; aucun `matchMedia` en JS.

## Sessions parallèles (constat 13/08 ~20 h 15)
- `pilote-fluides` : chantier tiers EN COURS sur `res/pose-manifold-2-voies-interactive/`
  (2 modifiés + 3 nouveaux, non commités). cartes.js PAS touché à cette heure.
  → commits ciblés chemin par chemin, re-contrôle avant édition cartes.js/build/commit.
- `atelier-animations` : propre, personne dessus.

## Cible bibliothèque (Phase 2 — FAIT)
- DOCTRINE (`refonte/DOCTRINE-REFONTE-2026-08-08.md`) lue : § 0.4 = croix du frigoriste,
  jamais de thème sombre, animation porteuse de contenu jamais conditionnée à reduced-motion.
- Étalon régulateurs KV : module dans `refonte/modules/<nom>/` (README, SOURCES-*, app.js,
  assets, tests — PAS de qa/ ni build/) ; relié par (1) `refonte/enseignant.html` section
  « Relecture et fabrique », entrée classe `entree avenir` + badge « à valider », et
  (2) `refonte/moteur/paliers.js`, champ `essai:` d'une entrée `avenir`.
- **Palier 3 « Les organes » a la place exacte** : « La vanne de service — existe, à
  raccorder au moteur ». Bouteille/filtre/voyant : entrées à AJOUTER sur le modèle KV.

## Mécanisme fiche→expérience du pack (Phase 4 — établi)
- ⭐ **La vanne est DÉJÀ dans le pack** : `res/vanne-service-interactive/` (« La vanne de
  service — trois positions, deux prises »), version adaptée avec couverture.json, reliée à
  g6b (`?ecran=positions`) et g9b (`?ecran=geste`). Pour le pack il ne reste QUE bouteille,
  filtre, voyant. La v5 Bureau (mini-jeux) est plus riche → bibliothèque seulement.
- Mécanisme : dossier dans `packs/fluides/res/<module>/` + `couverture.json` (format :
  `codes: {"code": ["ecran", …]}` + `appui` + `hors_referentiel`, voir
  `recuperation-fluide-interactive/couverture.json`) + `lienOutil(url, titre, desc)` dans
  cartes.js sur la carte d'ancrage + rebuild (galerie/registre/matrice/build).
- Cartes d'ancrage identifiées : filtre + voyant → **g9** « Le détendeur et les organes
  annexes » ; bouteille (réservoir) → **g9b** « Régler et contrôler les organes annexes ».
- Codes du référentiel 2025 pour les couverture.json : **1.05** (A1=T) nomme littéralement
  c) « repères transparents et indicateurs d'humidité » (voyant), e) « protecteurs du
  système » (filtre), h) « réservoirs » (bouteille) ; appuis possibles 7.05 (inspecter les
  conduites de liquide), 9.09 (rapport sur l'état des composants), 12.07 (remplacer un
  composant). Écrans des modules à relever dans leur `app.js` (tableau `lessons`, ligne ~77).
