# Chantier « tout améliorer » — inerweb.fr, à partir de l'audit du 12/09/2026

## Goal
Corriger ce que l'audit `docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md` a établi, dans l'ordre de
son § 8, sans rien casser : chaque lot se prouve (contrôle de l'atelier au vert, rendu vérifié dans
le navigateur sur un serveur local, contrôle de syntaxe du site), se commite localement, et **ne se
pousse pas** sans feu vert explicite de F. Henninot (feedback_diffusion_gelee).

Feu vert donné le 12/09 (soir) : « feux vert pour tout améliorer ». Périmètre : le site et ses
quatre ateliers (aerorezo, hydrometro, electrorezo, atelier-animations). Règle des deux copies :
on corrige dans l'atelier, puis on relivre la copie servie ; jamais l'inverse.

## Réglage
Fable : cadrage, briefs, contrôle, relivraison, version. Sonnet : exécution d'un lot par agent, sur
brief écrit, effort élevé pour les lots voix. Lots de 5 agents au plus par vague.

## Phases

### Phase 1 — Plan, reconnaissance des ateliers, briefs
**Status:** complete
- [x] Planning files posés (ce fichier, findings.md, progress.md)
- [x] État git des 5 dépôts relevé (tous propres au départ, sauf electrorezo : 1 fichier non suivi)
- [x] Chaînes de contrôle et de livraison de chaque atelier relevées dans findings.md — et le fait clé : les copies servies sont EN AVANCE (branchement du moteur posé dans la copie, pas dans l'atelier) → chaque atelier reçoit un `outils/livrer.mjs` qui injecte le branchement à la livraison
- [x] Briefs écrits : `BRIEF-A-aerorezo.md`, `BRIEF-B-hydrometro.md`, `BRIEF-C-electrorezo.md`, `BRIEF-D-site.md`, `BRIEF-E-lecteurs.md` (le bouton « Transcription » du film Ozone est passé du lot D au lot E : même dossier)

### Phase 2 — Vague 1 (5 agents Sonnet en parallèle, un dépôt chacun)
**Status:** in_progress
- [x] A · AéroRézo : fait, livré, vérifié (MP3 du fonds joué à l'écran 1, carte 375 px propre), commit atelier `5258513`
- [x] B · HydroMétro : fait, livré, vérifié (0 chevauchement à 375 px, réglage commun monté), commit atelier `7eaf43b`
- [x] C · ÉlectroRézo : fait, livré, vérifié (MP3 sans sélecteur, temps sur deux rangées), commit atelier `1b54e20`
- [x] D · Site : fait (volet replié, 4 vues de ligne OK, Tome 3 sans chevauchement, coquille impression.css) — le bouton « Transcription » est passé au lot E
- [x] E · Lecteurs React : fait, vérifié (KP1 cycle complet, Ozone) après deux corrections de Fable sur les pressostats (état du moteur lu sur son bouton ; pause pendant un MP3)

### Phase 3 — Relivraison et preuve
**Status:** in_progress
- [x] Copies servies relivrées depuis chaque atelier (outils `livrer.mjs`), deux fois pour A et B (lot F)
- [x] Contrôle de syntaxe du site : 521 pages, 1 erreur antérieure (3 passages)
- [x] Rendu vérifié sur serveur local (voir progress.md : 20 preuves)
- [x] Commits locaux des ateliers (aerorezo ×2, hydrometro ×2, electrorezo ×1), aucun push
- [ ] `node build/version.mjs` puis commit de `pilote-fluides` — après le lot G

### Phase 4 — Vague 2
**Status:** in_progress
- [x] F · Mode professeur : AéroRézo et HydroMétro faits et vérifiés (enchaînement automatique prouvé sur « L'air se déplace » après ajout de `#stepStatus` à la signature d'écran) ; ÉlectroRézo non câblé (lecteur MP3 propre) → reste n° 3
- [ ] G · « Station suivante » (brique `moteur/suivant.js`) — agent en cours (`BRIEF-G-station-suivante.md`)

### Phase 5 — Clôture
**Status:** pending
- [ ] REPRISE.md du site et PROMPT-REPRISE de chaque atelier : trace datée
- [ ] Mémoire courte, listing de transfert (fin-de-chantier)
- [ ] Prompt de reprise pour les lots restants : 5 (texte des voix + MP3 edge-tts → feu vert service tiers), 7 (charte commune, un chat par réseau), 8 (stations minces), 10 (mentions de chantier : décision de Franck)

## Decisions Made
| Décision | Raison |
|---|---|
| Aucun push sans feu vert explicite | feedback_diffusion_gelee : accord au cas par cas |
| Pas de refabrication de MP3 dans cette session | edge-tts = service tiers, feu vert séparé et préalable (feedback_service_tiers_pendant_fabrication) |
| Les agents travaillent dans les ateliers et s'arrêtent AVANT la copie servie | une seule relivraison, un seul `version.mjs`, par Fable |
| Charte commune (piste 7) hors de ce chat | gros chantier, un chat par réseau (sobriété § 7) |

## Errors Encountered
| Error | Attempt | Resolution |
|---|---|---|

## Next Step
Relever les chaînes de contrôle des ateliers (findings.md), puis écrire les cinq briefs.
