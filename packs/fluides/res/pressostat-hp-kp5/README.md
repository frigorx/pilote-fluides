# Pressostat HP de sécurité — inerWeb Édu

Module pédagogique hors ligne consacré au pressostat mécanique haute pression de sécurité, construit dans le même moule que le module BP.

Statut : **version 1.2.0, brouillon pédagogique à valider**. Il n’est ni publié ni indexé dans le RAG actif.

Cette version rattache les sept illustrations KP5 à la variante consolidée `Animations pressostat KP1 KP5 KP15.zip` transmise par Franck. Les écrans concernés proposent `Illustration Claude` puis `Schéma / activité` : le dessin guide la lecture, tandis que la manipulation inerWeb conserve le raisonnement, le calcul et la mesure. Le cycle Claude représente un modèle automatique ; le cas manuel maximum reste explicitement distingué dans le cours. Les sept rendus KP5 sont visuellement identiques à la série précédente, désormais archivée, mais la source corrige l’état initial de l’hystérésis.

## Ouvrir le module

- depuis la racine du Bureau : `TESTER-LE-PRESSOSTAT-HP.cmd` ;
- depuis ce dossier : `OUVRIR-LE-MODULE.cmd` ;
- page autonome : `index.html` ;
- aperçu local fiable : `http://127.0.0.1:18766/`.

Le lanceur démarre un petit serveur limité à `127.0.0.1`. Aucun accès Internet n’est nécessaire au module.

## Parcours

Le cours comporte 16 étapes, 8 questions formatives et un bilan :

1. rôle de la sécurité HP ;
2. symboles frigorifiques et contact électrique ;
3. pression, soufflet, ressorts, bras et bascule rapide ;
4. zone neutre et mémoire de l’état ;
5. calcul HP du différentiel ;
6. bornes 1–2–4 ;
7. KP5 automatique et manuel maximum ;
8. détermination documentaire de CUT OUT ;
9. préréglage de la face KP5 ;
10. réglage sous azote ;
11. contrôle en fonctionnement strictement encadré ;
12. trois cycles, répétabilité et traçabilité.

## Relations enseignées

Pour un KP5 automatique :

- `DIFF = CUT OUT − CUT IN` ;
- `CUT IN = CUT OUT − DIFF` ;
- `CUT OUT = CUT IN + DIFF`.

L’exemple `24 / 21 / 3 bar` sert uniquement à apprendre le calcul. Ce n’est pas une consigne de réglage universelle.

## Sécurité

- le réglage au banc utilise uniquement de l’azote sec et du matériel compatible avec la pression d’essai ;
- la machine reste isolée pendant le réglage au banc ;
- aucun shunt de sécurité ;
- aucune fermeture de vanne de refoulement ;
- un essai par réduction d’échange au condenseur n’est montré que comme méthode de site autorisée et surveillée ;
- la notice machine, la référence du pressostat et les limites des composants font foi.

## Construction et QA

```powershell
node build.mjs
node tests/qa.mjs
node tests/browser-qa.mjs
```

Les sources éditables sont dans `src/`. `index.html` et `manifest.json` sont générés par `build.mjs`.

Les illustrations Claude et leur manifeste de provenance sont dans `assets/illustrations-claude/`.
