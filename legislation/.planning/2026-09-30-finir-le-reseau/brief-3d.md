# BRIEF — le bâtiment réglementaire en 3D (porte d'entrée du réseau Législation)

Worktree : `C:\git\pilote-fluides-chantier\legislation\` (branche `chantier-2026-09-30`).
Vos fichiers : `batiment3d/` (nouveau dossier) uniquement. Ne pas éditer `index.html`
(écrivez dans `batiment3d/INTEGRATION.md` le bloc exact à insérer, l'orchestrateur le posera).
Ne pas commiter. Pas de volet navigateur partagé : Chrome sans fenêtre (WebGL :
`--use-angle=swiftshader --enable-unsafe-swiftshader`), captures regardées vous-même.
Serveur local si besoin : `python -m http.server 8794` dans `C:\git\pilote-fluides-chantier`.

## L'idée — l'effet « waouh » du réseau
Un **bâtiment tertiaire en coupe** (trois niveaux + sous-sol + toiture), en **Three.js**
(module ES épinglé depuis cdnjs ou jsdelivr), style maquette d'architecte stylisée (volumes
propres, couleurs de la charte : bleu nuit #1b3a63, papier #fffdf8, gris doux, orange
#e8914a en accent, plus la couleur de chaque sous-ligne), lumière douce, ombres légères.
Le bâtiment tourne doucement au repos ; on l'oriente au doigt / à la souris ; on zoome.
Chaque **zone** est cliquable et s'illumine de la couleur de sa sous-ligne au survol, avec
une étiquette HTML (jamais posée sur un trait) :
| Zone du bâtiment | Sous-ligne (id du plan) |
|---|---|
| PAC en toiture + voisinage | regl-acoustique |
| Local technique : groupe frigo, bouteilles | regl-fluidique |
| Réservoirs, soupapes du local technique | regl-desp |
| Tableau électrique | regl-electrique |
| Escalier, désenfumage, clapets, sprinkler | regl-incendie |
| Enveloppe : isolation, vitrages, protections solaires | regl-thermique |
| Bureau du chargé d'affaires (dossiers, certificats) | regl-certifs |
| Salle de pause, planning | regl-travail |
| Échafaudage / nacelle contre la façade | secu-risques |
| Aire de déchets au pied du bâtiment | secu-dechets |
| Ciel / cycle carbone (un halo au-dessus) | secu-impact |
Clic → panneau latéral : nom de la sous-ligne, sa phrase (lire le tableau RESEAU
d'`index.html` : nom, sous, couleur, stations), la liste de ses stations (liens réels
`stations/<slug>/` quand `href` existe), bouton « Voir sur le plan ». Les données se
LISENT depuis le tableau RESEAU (exposez-le ou dupliquez-le en `batiment3d/zones.json`
généré par un petit script `batiment3d/generer-zones.mjs` depuis `index.html` — jamais saisi
à la main).
Tampons : si `localStorage['inerweb-legislation-tampons']` existe (tableau de slugs),
les zones dont toutes les stations sont tamponnées portent un petit sceau doré.

## Exigences
- 60 images/s sur une tablette ordinaire ; géométrie procédurale légère (pas de modèle
  lourd à télécharger) ; chargé seulement quand visible ; `prefers-reduced-motion` → pas
  de rotation automatique.
- Repli sans WebGL : le plan SVG existant reste la vraie navigation (la 3D est un plus).
- Accessibilité : chaque zone existe aussi en liste de boutons sous le canevas.
- Page de démonstration autonome `batiment3d/index.html` + le composant réutilisable
  (`batiment3d/batiment.js`, une fonction `monterBatiment(elementHote, options)`).
- Captures regardées : vue d'ensemble, survol d'une zone, panneau ouvert, écran 390 px.

## Compte rendu (court)
Fichiers, ce qui marche (preuves), bloc d'intégration, limites.
