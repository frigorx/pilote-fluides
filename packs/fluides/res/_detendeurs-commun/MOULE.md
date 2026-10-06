# MOULE — fabriquer une gare de la ligne LES DÉTENDEURS

**Principe.** Recopier `packs/fluides/res/detendeurs-famille/` (gare 0, pilote validé) sous un nouveau dossier ; ne changer que le contenu (écrans, scène, quiz, codes). **Interdit** : modifier `_detendeurs-commun/`, `condenseur-interactif/`, `moteur/`, `jouerezo/`, `moteur/plan-donnees.js` ; `git commit` et `git push`. Une brique commune manque : la construire dans ta scène et le dire dans ton rapport.

**1. Fichiers** (dossier `<gare>/`) : `index.html`, `app.js`, `scene-famille.js` (renommer `scene-<gare>.js`, exposer `window.<GARE>_SCENES`), `styles.css`, `impression.css`, `referentiel.js`, `couverture.json`, `SOURCES.md`, `REPRISE.md`, `assets/symboles/` (seulement les symboles utilisés), `tests/qa.mjs`.
À changer : dans `index.html` titre, description, `data-cours`, « gare N », h1, intro, nombre d'écrans, fichier scène, clés `?v=` ; dans `app.js` clé `localStorage`, `screens`, `QUIZ`, exercice ; dans `qa.mjs` `PAS` (écrans à pas à pas : nombre d'étapes), codes du badge, bonnes réponses.

**2. Scripts, dans cet ordre** : voix-index, prononciation, voix, reglage-voix, prof-vocal, `voyage-dessin.js`, `_detendeurs-commun/scenes-detendeurs.js`, `scene-<gare>.js`, `app.js`, lisibilite, marque (`data-cartouche=".fr"`), `referentiel.js`. Pas de `animations.js`, `retour-accueil.js`, `suivant.js` (posés par le build). Ne jamais écrire le nom de la requête média « réduire les animations », même en commentaire.

**3. Écrans (5 à 8), dans cet ordre**
- **a. Carte d'identité** : symbole normalisé + coupe animée au repos + « il règle : … » (modèle : écran 3).
- **b. Coupe pas à pas** : 3 à 6 étapes, une étape = un évènement cause → effet, la pièce qui agit allumée (`agit`) ; `DS.jouer` (modèle : écrans 1 et 2).
- **c. « Et si… ? »** : l'organe réagit à un changement (la charge monte) ; état `charge` / `ouverture` de `DS.coupe` (modèle : écran 4).
- **d. Exercice où l'élève FAIT** (associer, régler, placer), correction expliquée (modèle : écran 5).
- **e. Vérifier** : 5 ou 6 questions, une explication par réponse (modèle : écran 7).
Un écran = un dessin + 3 lignes de texte (≤ 110 caractères). Le reste est dit par la voix : `narration` de 60 à 120 mots, phrases courtes, niveau CAP, aucun mot savant sans son dessin.

**4. Dessin** : seulement `DETENDEURS_SCENES` (API en tête de `scenes-detendeurs.js`) et `VOYAGE_DESSIN`. Le liquide se voit liquide (nappe, bulles qui naissent au fond, vapeur en petites molécules, jamais des billes) ; HP orangé, BP bleu ; aucun texte posé sur un tracé (légendes en HTML, pastilles HP/BP seulement) ; tubes : une paroi extérieure continue + un intérieur continu, coudes arrondis, jamais un trait de mur dans le passage du fluide (là où un tube entre dans un corps, son vide traverse la paroi du corps) ; `DS.fond` derrière chaque dessin ; ni photo, ni thème sombre, ni animation CSS. **Aucun symbole ni schéma de circuit dessiné à la main** : `node C:/git/HAL-v3/scripts/chercher-rag.js "symbole <organe>" --source ressource`, copier le SVG dans `assets/symboles/`, le citer dans `SOURCES.md`.

**5. Voix** : champ `narration` seulement ; les MP3 sont générés plus tard par le chat superviseur.

**6. Référentiel** : `couverture.json` et champ `codes` de chaque écran = codes du règlement d'exécution (UE) 2024/2215, annexe I (`codes` = enseigné, `appui` = mobilisé). Seulement ce que l'écran enseigne : 9.01 (principe), 9.03 (si l'écran apprend à régler) ; 1.04, 1.02, 9.10 en appui.

**7. Contrôle avant de rendre** : serveur local `http://localhost:8794/` déjà lancé (ne pas le relancer, ne tuer aucun processus `node`). `CAPTURES=<dossier> node packs/fluides/res/<gare>/tests/qa.mjs` doit finir par « QA : tout passe » (1366×768 et 390×844). Regarder 4 captures (outil Read), corriger ce qui est laid, vide ou illisible. Rapport ≤ 350 mots : fichiers, adresse, écrans, points métier à faire valider.
