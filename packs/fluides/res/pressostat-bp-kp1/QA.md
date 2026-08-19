# Contrôle qualité — 19 août 2026

## Résultats automatisés

- génération : `16` étapes de cours, `8` questions, `1` bilan ;
- QA statique : `46` contrôles réussis ;
- QA navigateur : `649` contrôles réussis ;
- erreurs console : `0` ;
- requêtes réseau : `0` ;
- voix au chargement : `0` déclenchement ;
- débordement de page, application, carte texte ou carte visuelle : `0`.
- serveur d’aperçu : écoute uniquement sur `127.0.0.1`, sortie du dossier refusée et point `/health` validé.

## Formats parcourus écran par écran

- `1366 × 768` ;
- `1024 × 768` ;
- `390 × 844` ;
- `360 × 640`.

Les 25 écrans ont été parcourus dans chaque format. Les tests exercent le soufflet/contact, la mémoire de zone neutre, le choix de formule, le calcul de DIFF, le contact 1–2–4, l’enveloppe compresseur, le portage interactif de la face KP1, le cycle azote et la répétabilité de trois relevés.

## Inspection visuelle

Les écrans mécanisme, zone neutre, différentiel, face KP1, banc azote et cycle de mesure ont été inspectés en `1366 × 768` et `360 × 640`. Les captures sont conservées dans `_qa/screens/`.

Le prototype GitHub d’origine a également été audité écran par écran avant le portage. Ses captures de comparaison sont dans `_qa/prototype-github/`.

## Contrôles humains encore nécessaires

- validation métier de la méthode exacte par Franck ;
- essai avec le pressostat et le compresseur réellement utilisés au lycée ;
- validation des procédures électriques et fluidiques locales ;
- écoute humaine de la voix sur le poste de projection ;
- bon à tirer pédagogique et décision de publication.

Le module reste un **brouillon non indexé dans le RAG**.
