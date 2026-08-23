# PROMPT-REPRISE — le réseau Législation

> **À LIRE EN PREMIER** dans toute nouvelle session sur ce chantier.
> Ouvert le 23/08/2026. Tout ce qu'il faut pour reprendre est ici.
> La vérité du réseau technique voisin reste le `REPRISE.md` à la racine du dépôt
> (section du 23/08) ; ce fichier-ci est la vérité DU RÉSEAU LÉGISLATION.

## Ce que c'est

Un **deuxième réseau** de cours inerWeb, **niveau BTS**, sur la réglementation, la
sécurité et l'environnement. Né d'un besoin de F. Henninot : désengorger le plan
technique (15 lignes, 108 stations) au lieu d'y empiler des stations.

## Les six décisions de F. Henninot — cadre non négociable

1. **Réseau de réseaux.** Une entrée n'est pas une station terminale, c'est la
   **tête d'une sous-ligne** qui descend (« l'acoustique, c'est une ligne ;
   l'incendie, c'est une ligne »).
2. **Maillage.** Les sous-réseaux se répondent entre eux, pas seulement vers le
   réseau technique. Son exemple fondateur : Électrique ⇄ Risques professionnels,
   par l'habilitation et les EPI. « Une carte mémoire avec des interactions. »
3. **« Presque un autre site. »** La Législation ne se mélange PAS à la
   thermo-techno. D'où l'architecture SATELLITE (voir plus bas) — c'est la
   décision structurante du chantier.
4. **Création libre.** « Tu es assez doué pour faire mieux que le livre. » Le
   sommaire du manuel photographié n'est qu'une **ossature de chapitres** ; rien
   n'est recopié, le découpage en stations est une conception maison.
5. **La DESP est indépendante et transversale.** Pas un sous-chapitre de la
   fluidique : une sous-ligne à part entière, « au même titre que l'incendie et
   l'acoustique ». Elle touche aussi l'incendie (sprinkler et RIA : réseaux d'eau
   sous pression, lot CVC de bureau d'études).
6. **Projet inerWeb** (pas scolaire) → logo inerWeb. *(La question se repose à
   chaque nouvelle production, même quand le cas paraît évident.)*

## Architecture — le satellite

`legislation/index.html` se comporte comme les satellites existants
(`sous-tension`, `qcm-travail-hauteur`), pas comme une page du site :

- identité propre dans l'en-tête (« inerWeb Législation »), **aucun menu du site
  technique** — une seule passerelle, « ⇄ Le réseau thermo-techno » ;
- `lisibilite.js` et `marque.js` chargés **en absolu** depuis
  `https://inerweb.fr/moteur/` (règle du 20/08 : une source, zéro divergence) ;
  le pied de page et la licence viennent de là ;
- liens sortants en absolu ;
- **le dossier doit rester déplaçable d'un bloc** vers un dépôt ou un
  sous-domaine séparé, sans rien casser ;
- il n'entre PAS dans `PAGES` de `build/version.mjs` (commentaire posé là-bas) ;
- `noindex`, hors sitemap, tant que le réseau est en construction.

## État au 23/08/2026

**Le plan : 2 lignes mères · 11 sous-lignes · 57 stations, toutes EN PRÉPARATION**
(pastille en pointillé, aucun lien). Mesuré sur la page servie : 144 textes,
**0 chevauchement**, 0 débordement du cadre, console vide.

- 📜 **LES RÉGLEMENTATIONS** (#1e40af) — 8 têtes : Thermique 6 · Acoustique 5 ·
  Incendie 6 (dont Sprinkler & RIA) · Électrique 6 · Fluidique & thermique 4 ·
  **La DESP 5** · Certifications & normes 4 · Droit du travail 5.
- 🦺 **SÉCURITÉ & ENVIRONNEMENT** (#166534) — 3 têtes : Risques professionnels 6 ·
  Déchets 5 · Impact environnemental 5.
- **14 anneaux de correspondance**, dont 6 paires de maillage interne listées
  sous le plan.

**Une station a son fond écrit et VALIDÉ par F. Henninot** :
`stations/fgaz-3/FOND.md` — 8 écrans + 4 questions. C'est le **gabarit** des 56
autres.

## Le rail de production — à suivre pour CHAQUE station

1. **Code** : rédiger le fond dans `stations/<slug>/FOND.md` (objectif, écrans,
   questions, maillage, consignes Design en fin de document) → **faire valider
   par F. Henninot**. Rien ne part avant.
2. **Design** : envoyer le fond validé + la charte en **une seule demande cadrée**
   (annoncer le coût estimé avant). Sortie **HTML/SVG, jamais bitmap**.
3. **Code** : transposer au format maison, la station devient cliquable — lui
   donner un `href` et reprendre le motif `station()` complet du plan principal
   (lien, trajet, coche) à la place de la pastille en pointillé.

## ▶ PROCHAINE ACTION

**Envoyer `stations/fgaz-3/FOND.md` à Claude Design.** Bloqué le 23/08 sur un
point que seul F. Henninot peut lever : la session n'était pas autorisée à
joindre Claude Design → **il doit taper `/design consent`**. Charte à utiliser :
projet « Charte graphique inerWeb » (`1394c5be-3bc5-441f-93d9-251c89f48ba8`),
11 pièces déjà poussées le 13/08 — ne rien resynchroniser.

## Ce qui attend F. Henninot

- a. la **relecture des 57 stations** proposées (noms, sous-titres, paires de
  maillage) — conception Claude, rien de validé métier ;
- b. le **référentiel BTS d'adossement** (FED ? autre ?) pour coder les stations ;
- c. l'**hébergement définitif** : rester en `inerweb.fr/legislation/` ou dépôt /
  sous-domaine séparé ;
- d. la pose de la correspondance sur l'accueil du réseau technique, puis le push ;
- e. trois **stations candidates** révélées par l'inventaire, non ajoutées :
  Plan de prévention, Permis de feu, Gestes & postures (PRAP).

## Gisements

`GISEMENTS.md` (même dossier) : inventaire du 23/08 mené avec le moteur de
recherche documentaire de l'usine — briques trouvées station par station.
Bien dotées : Électrique, Fluidique, Risques pro, Déchets, Impact env.
À créer de zéro : Certifications & normes, et tout ce qui touche à la DESP et au
sprinkler (rien dans la base).

Relancer une recherche :
`cd C:\git\usine-contenu\moteur-recherche && node chercher.mjs "ma question" 6`
(Ollama doit tourner ; ~13 980 fiches indexées).

## Pièges déjà payés — ne pas les repayer

- Le **DÉPART** posé sur une ligne mère s'écrase contre son cartouche : il vit
  au-dessus, sur un court tronc vertical commun.
- Le **trait d'une ligne doit courir au-delà de sa dernière station** (piège
  documenté du plan principal : sinon les pastilles flottent sans rien qui les
  relie). Contrôle : le `H` final du path > le `cx` de la dernière pastille.
- Mesurer les chevauchements en **`getBoundingClientRect`**, jamais `getBBox`
  (qui ignore les `transform`).
- Ajouter une tête de sous-ligne **élargit le SVG** : penser `W`, la pointe de
  flèche, la position du jalon et `min-width` de `.plan svg` ensemble.
- Le **Bureau de F. Henninot = `~\OneDrive\Bureau\`**, mais le gisement RE2020
  est sur `~\Desktop\` (hors OneDrive) : les deux existent.
- **Diffusion gelée sur ce dépôt** : aucun push sans feu vert explicite.
- Deux sessions ont déjà travaillé en parallèle sur ce dépôt : `git add -A`
  ramasse ce qui n'est pas à soi — **ajouter fichier par fichier**.

## Voir la page en local

`.claude/launch.json` (dans l'espace de travail) déclare `pilote-fluides-local` :
un serveur statique sur le port **8123** servant `C:/git/pilote-fluides`.
La page : `http://localhost:8123/legislation/`.

## Journal des commits (branche `main`, tous LOCAUX — rien poussé)

- `98c0e87` — ouverture du 2e réseau (première forme, page à la racine)
- `8d61e35` — réseau de réseaux maillé
- `66049be` — bascule en satellite `legislation/` + 53 stations nommées
- `396ff43` — « F-Gas 2024 » devient « F-Gaz 3 »
- `bea217f` — inventaire des gisements
- `7ed83aa` — fond de la station F-Gaz 3
- `804165b` — la DESP en sous-ligne indépendante + Sprinkler & RIA
