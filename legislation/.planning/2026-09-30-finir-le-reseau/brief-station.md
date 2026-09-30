# BRIEF — produire UNE station du réseau Législation (BTS)

Vous produisez **une seule station**, vous-même, sans déléguer à un autre agent.
Dossier de travail : `C:\git\pilote-fluides-chantier\legislation\` (worktree, branche
`chantier-2026-09-30`). **N'écrivez QUE dans `stations/<votre-slug>/`.** Ne touchez à rien
d'autre (ni au plan `index.html`, ni aux autres stations, ni à `moteur/`). Ne commitez pas.
N'utilisez PAS le volet navigateur partagé (d'autres agents s'en servent) : pour voir un
rendu, Chrome sans fenêtre (voir § 7).

## 1. Lire d'abord (dans cet ordre, lecture ciblée)
1. `legislation/PROMPT-REPRISE.md` — sections « Les huit décisions », « Architecture »,
   « Le rail de production », « Ce que la vague 1 a appris ».
2. Le gabarit : `stations/aptitude-capacite/` (index.html, app.js, styles.css, FOND.md, svg/).
3. Une station ANIMÉE pour le style SMIL : `stations/impact-tewi/svg/` et
   `legislation/CONSIGNES-ANIMATION.md`.
4. Une station de votre sous-ligne voisine déjà ouverte si elle existe (maillage).

## 2. Ce que vous livrez dans `stations/<slug>/`
- `FOND.md` — le fond : objectif, notions, déroulé des 8 écrans, 4 questions + corrigés,
  correspondances, **sources officielles** (URL Légifrance / EUR-Lex / service-public /
  INRS / textes consolidés, avec article et date de consultation), section « À sourcer ».
- `index.html` — copie du gabarit, entièrement réécrite pour votre sujet :
  accueil (fil de sous-ligne, h1, sous-titre, **scène `../../img/scene-<branche>.webp`**
  (nom donné dans votre commande), objectif, bouton Commencer), **8 écrans** + **4 questions**,
  fin, correspondances. Garder TELS QUELS : les identifiants `#listen #next #prev #start
  #stop-voice`, la classe `.slide.active`, la structure du quiz, les scripts du moteur,
  `<meta name="robots" content="noindex">`, `data-prototype`, la marque inerWeb.
- `app.js`, `styles.css` — copies du gabarit (la couleur sera réalignée par un script).
- `svg/*.svg` — **une illustration par écran** (8), réutilisées en vignette sur les questions.
  **Au moins 3 sont animées** (SMIL autonome, sans script, état au repos = image finale,
  boucle 12-14 s avec temps de repos, rien d'essentiel qui n'existe que dans l'animation).
- `mission.json` — la mission du livret (schéma § 5).

## 3. La doctrine — non négociable
- **Aucun chiffre non sourcé.** Une valeur réglementaire (seuil, date, périodicité, montant,
  distance, dB, classe…) n'entre que si vous l'avez lue dans une source officielle, citée
  dans FOND.md. Sinon : omise, et listée sous « À sourcer ». Jamais approximée.
  Normes payantes (NF, EN, DTU) : ne citer que ce qui est public (titre, objet, domaine).
- **La voix explique, elle ne lit pas l'écran.** `data-narration` = texte pour l'oreille,
  il dit ce que l'on VOIT sur l'illustration et pourquoi, 50 à 110 mots, vouvoiement,
  jamais une formule prononcée (on dit ce qu'elle fait), jamais une file d'impératifs,
  sigles développés à la première occurrence. Rien n'est dit qui ne soit aussi écrit.
- **Niveau BTS / technicien d'études CVC** : langage professionnel, exact, sans jargon
  gratuit. Situations d'entreprise concrètes (chantier, client, bureau d'études).
- Le mot « examen » est proscrit dans l'interface : dire « évaluation ».
- Questions **non devinables** : la bonne réponse n'est ni systématiquement la plus longue
  ni toujours au même rang ; les leurres sont plausibles (erreurs réelles de débutant).
- Référentiel (à écrire dans l'accueil, sous l'objectif, comme les stations AéroRézo le font,
  et dans `mission.json`) : **TP TECVC, REAC TP-00133** — compétences CP1 à CP10 :
  CP1 plans d'implantation · CP2 modélisation · CP3 réseaux sanitaires · CP4 VMC ·
  CP5 déperditions · CP6 chauffage / ECS · CP7 ventilation tertiaire · CP8 apports ·
  CP9 climatisation · CP10 CTA. Choisissez les CP réellement mobilisées (1 à 3), avec une
  phrase de justification dans FOND.md. Si aucune ne l'est honnêtement (droit du travail),
  écrivez « Hors REAC : culture professionnelle du technicien et du chargé d'affaires ».
  Stations fluidiques : ajouter les codes de l'attestation d'aptitude 2025
  (`packs/fluides/referentiel-2025.json` à la racine du dépôt).

## 4. Les illustrations (SVG)
- viewBox large (ex. 0 0 800 500), fond transparent ou papier `#fffdf8`, charte :
  bleu `#1b3a63`, orange `#e8914a`, gris `#5a6b7d`, + la couleur de votre sous-ligne.
- **Aucun texte sur un tracé, une flèche ou une forme** ; étiquettes courtes ; corps ≥ 16
  unités de viewBox pour le courant, ≥ 20 pour les titres ; `font-family` système sans-serif.
- Dessins **simples et purs** : pictogrammes, schémas, lignes de temps, tableaux visuels,
  scènes schématiques. Pas de bitmap, pas de silhouette bâton (une personne = un pictogramme
  plein et sobre, ou pas de personne). Chaque illustration a un `alt` qui la décrit vraiment.
- Symboles normalisés (électrique, fluidique) : chercher un symbole existant avant de dessiner :
  `node C:/git/HAL-v3/scripts/chercher-rag.js --source ressource "symbole <nom>"`.

## 5. `mission.json` — le livret du chargé d'affaires
L'étudiant est un jeune chargé d'affaires / technicien d'études dans une entreprise CVC.
Chaque station est une mission : un client, une situation, une pièce à produire.
```json
{
  "slug": "<slug>",
  "branche": "<nom de la sous-ligne>",
  "titre": "Mission : <titre court et vivant>",
  "client": "<qui demande, en une ligne (sans nom propre de personne réelle)>",
  "situation": "<3 à 5 phrases : le cas concret, ce qui se passe, l'enjeu>",
  "piece_a_produire": "<ce que l'étudiant rend : note au client, check-list, tableau, courriel…>",
  "questions": [
    { "q": "<question dont la réponse se trouve dans la station>", "ecran": 3,
      "reponse": "<corrigé professeur, 1 à 3 phrases>" }
  ],
  "defi": { "type": "vrai-faux | relier | classer | calcul | trouver-l-erreur",
            "consigne": "<consigne>", "items": ["..."], "corrige": "<corrigé>" },
  "badge": "<nom du tampon gagné, ex. « Oreille fine »>",
  "duree_min": 25,
  "referentiel": { "tecvc": ["CP9"], "attestation_2025": [], "justification": "<une phrase>" }
}
```
4 questions exactement, chacune renvoie à un écran. Le défi se fait sur papier en 5 minutes.
Aucun chiffre non sourcé ici non plus.

## 6. Correspondances (maillage)
Chaque station propose 2 à 4 correspondances vers d'autres stations du réseau (liens relatifs
`../<slug>/`), y compris vers les stations de cette vague (liste des slugs dans votre
commande — elles existeront toutes) et vers les 29 déjà ouvertes (`ls stations/`).

## 7. Vérifier avant de rendre
- Chaque SVG est référencé par l'index.html, et inversement (aucun orphelin).
- HTML valide (balises fermées), 8 `.slide` + 4 `.slide.question`, chaque écran a son
  `data-narration`, chaque question a exactement une bonne réponse.
- Rendu : pour chaque SVG, capture sans fenêtre puis REGARDEZ l'image (outil Read) :
  `"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --window-size=900,600 --screenshot="<scratch>/x.png" "file:///C:/git/pilote-fluides-chantier/legislation/stations/<slug>/svg/<f>.svg"`
  Corrigez tout texte qui déborde, chevauche un trait ou est illisible.
- `node -e "JSON.parse(require('fs').readFileSync('mission.json','utf8'))"` passe.

## 8. Votre compte rendu (court)
Slug, titre, CP retenues, nombre de SVG (dont animés), sources principales (3 URL max),
liste « À sourcer », tout défaut connu restant. Pas de copie du contenu.
