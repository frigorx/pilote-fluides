# Voyage dans tous ses états — reprise

> Chantier ouvert le 03/10/2026 (demande de Franck : refaire, en animé, l'idée du feuilleton
> « Voyage d'une molécule de Fréon » paru dans la RPF dans les années 1980, avec un fluide
> actuel). Projet **inerWeb**. Titre choisi par Franck : « Voyage dans tous ses états ».

## Règles de droit retenues (03/10, validées par Franck)
- On reprend l'IDÉE (une molécule raconte le circuit), jamais le texte : rédigé sans le livre
  sous les yeux, personnage, titre et scènes à nous. Pas de « Fréon » (marque déposée).
- Le scan du feuilleton reste chez Franck : ni sur inerweb.fr, ni dans un fonds en ligne.

## Une source, trois sorties
1. Module interactif : `voyage.html` (chapitres, voix, question à chaque arrêt, code de partie).
2. Film MP4 : composition HyperFrames écrite par `outils/voyage-film.mjs`
   dans `C:\Users\henni\Documents\inerweb-video\voyage-etats\`.
3. Livret imprimable avec un QR code par chapitre (images tirées de l'animation).

## Fichiers (tous neufs, aucun fichier partagé du dépôt touché sauf l'accueil à la fin)
- `donnees/voyage.js` — récit (phrases écrites / dites), questions, référentiel.
- `moteur/voyage-dessin.js` — briques SVG (molécule, personnage, croix, couleurs, courbes).
- `moteur/voyage-scenes.js` — les 8 scènes, fonctions pures du temps.
- `moteur/voyage.js` — le lecteur (page) ; `voyage.css`.
- `outils/voyage-voix.py` — une piste par phrase (edge-tts, voix Rémy), `voyage/voix/pistes.json`.

## Étapes
- [ ] récit + questions
- [ ] voix fabriquées + preuve d'écoute
- [ ] moteur + scènes + lecteur, vérifiés au navigateur (bureau et téléphone couché)
- [ ] film MP4 rendu et regardé
- [ ] livret
- [ ] commit, mémoire ; mise en ligne = feu vert de Franck
