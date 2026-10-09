# PROMPT-REPRISE — le réseau Législation

## 09/10/2026 — « Trier : les 8 flux » (commit local, non poussé)

Des sept textes signalés le 04/10, cinq étaient déjà corrigés en ligne le 04/10 au soir (pyramide, RT2012 → Tic, PRP
d'un mélange, euroclasse E, « BTS » sourcé R121-1) ; l'émergence chez un particulier est nuancée dans « PAC & voisinage » ;
« se former 4/8 ans » n'existe plus dans la station (montants CPF à relire chaque rentrée, FOND). Restait le vrai faux :
**D. 543-281 = huit flux depuis le 01/01/2025 (textiles)**, lu sur Légifrance. Corrigé (Franck : « 1 ») : station
`dechets-sept-flux` (titre, écrans 1-2, FOND, dessin des bennes), RESEAU du plan, zones 3D, carnet-data, scène animée
`scenes/dechets.js`, renvoi de Déchets dangereux, catalogue. Adresse conservée. **Restes** : MP3 de la narration de
l'écran 2 (edge-tts, feu vert non donné → voix du navigateur) ; carnet papier (carte 44 « Trier : 7 flux ») à refaire
à la prochaine édition ; « Mesurer » (phrase sur le particulier) et la publication : non décidés.

## 01/10/2026 — corrections pédagogiques et préparation locale à la publication

Lire d'abord [le contrôle de publication](CONTROLE-PUBLICATION-2026-10-01.md) pour le dernier état du chantier. Travail local dans `C:\git\pilote-fluides-chantier`, non poussé et non publié ; aucune indexation RAG avant BAT. Les indications historiques de 122 pages et de validation par tampon ci-dessous sont remplacées par : carnet élève 124 pages, tampon de réussite au quiz seulement, production professionnelle évaluée séparément. Guide, mission finale et aide décroissante ajoutés ; corrections ciblées dans huit stations ; sept PDF et dépendance 3D locale préparés pour inclusion Git. Les contrôles de liens et de QR passent ; la réserve de remplissage du livret professeur et la relecture métier restent explicites dans le rapport.

> **À LIRE EN PREMIER** dans toute nouvelle session sur ce chantier.
> Ouvert le 23/08/2026. Dernière mise à jour : **30/09/2026** — LE RÉSEAU EST COMPLET (57 stations), carnet du
> chargé d'affaires, bâtiment 3D. (27/09 : audit des 29 premières, plan replié, scènes Codex.)
> (Les sections datées du 24/08 restent vraies sauf mention contraire ci-dessous.)
> La vérité du réseau technique voisin reste le `REPRISE.md` à la racine du dépôt ;
> ce fichier-ci est la vérité DU RÉSEAU LÉGISLATION.

**En ligne** : https://inerweb.fr/legislation/

## ▶ 30/09/2026 — réseau complet, carnet, bâtiment 3D (état qui fait foi)

Commande de F. Henninot (autonomie totale, « aucune décision ne m'est confiée ») : finir le réseau,
effet waouh, apprentissage ludique, livret papier qui renvoie à chaque station, progression BTS.
Travail fait dans le worktree `C:\git\pilote-fluides-chantier` (branche `chantier-2026-09-30`),
**soumis à validation avant toute mise en ligne**. Plan, briefs et journal :
`.planning/2026-09-30-finir-le-reseau/`.

- **28 stations produites** (une par agent Sonnet, gabarit aptitude-capacite) : Électrique (6),
  Fluidique (NF EN 378, Traçabilité), Incendie (6), Acoustique (5), Certifications (4), Droit du
  travail (5). **57 stations sur 57.** Chaque FOND.md porte ses sources et son « À sourcer ».
  Doctrine tenue : aucun chiffre non sourcé ; 3 à 5 SVG animés (SMIL) par station.
- **Référentiel d'adossement tranché** (décision d'architecte) : **TP TECVC, REAC TP-00133, CP1-CP10**
  (déjà employé par AéroRézo), + attestation d'aptitude 2025 pour le fluidique ; « Hors REAC : culture
  professionnelle… » là où aucune CP n'est honnêtement mobilisée (droit du travail, DESP…).
- **Le carnet du chargé d'affaires** : l'étudiant est un jeune technicien d'études chez **Clim'Études Sud**
  (fictif). Chaque station = une mission (`stations/<slug>/mission.json`) ; ≥ 3/4 au quiz = un tampon ;
  une sous-ligne = un certificat. Progression annuelle P1-P5 : `progression.json`.
  Numérique : `moteur-legislation/missions.js` (carte mission + tampon, posé par
  `outils/poser-les-missions.mjs`), page `carnet.html`. Papier : `outils/carnet-papier.mjs` →
  `carnet/` (carnet élève complet 122 p. + un par période P1-P5 + livret professeur, HTML/PDF/docx,
  14 pt min, QR relus : `python outils/verifier-carnet.py`).
- **Le bâtiment réglementaire en 3D** (Three.js) en tête du plan : `batiment3d/` ; zones générées
  depuis RESEAU : `node batiment3d/generer-zones.mjs` ; clic → panneau des stations, « Voir sur le
  plan » défile jusqu’à la sous-ligne (`id="ligne-<id>"` sur les têtes).
- Cohérence Incendie vérifiée : deux arrêtés du 22/03/2004 distincts (IT 246 en vigueur ; résistance au
  feu abrogé le 27/03/2026 par l'arrêté du 22/03/2026) ; R. 4216-* abrogés à compter du 01/01/2027.
- Voix : MP3 edge-tts des nouvelles narrations (`build/voix/collecter-narrations.mjs` puis
  `generer-audios-edge-tts.py --alternance-module --sources legislation --confirmer`).

**Après toute production, relancer** : couleur-des-sous-lignes, poser-les-scenes, poser-les-missions,
fiches-a-valider, `batiment3d/generer-zones.mjs`, `outils/carnet-papier.mjs` + verifier-carnet.

**Reste pour F. Henninot** : relecture métier (data-prototype partout) ; les listes « À sourcer » ; les
valeurs DESP (VALEURS-A-VALIDER-DESP.md) ; l'essai de la 3D sur une vraie tablette.

## ▶ 27/09/2026 — audit complet, plan replié, scènes (état qui fait foi)

Demande de F. Henninot : « le réseau est en partie tronqué, audit entier de tout ce
qui se dit et se fait, plus de visuel, avec Codex ». Plan et pièces :
`.planning/2026-09-27-legislation-audit/` (task_plan, findings, `audit-<branche>.md`,
`corrections-<branche>.md`, briefs).

**Ce qui a changé :**
- **Le plan tient dans la page.** Le SVG faisait 1 790 unités pour une page de
  1 080 px : le quart droit (Certifications, Droit du travail) était caché à tout le
  monde. Une ligne mère se replie désormais en **rangées de 4 têtes** (`parRang`),
  elle fait un coude à droite et revient ; `W = 1070`, `H` calculé, `rangees()`,
  `trace()`, `fleche()`. Halo blanc sous les sous-titres de tête (ils étaient
  traversés par le trait), **une icône par tête** (`ico`).
- **Voix : dette réglée depuis le 02/09** (commits 6e77dd97 → 40f7c878) — MP3 edge-tts
  servis, index global `moteur/voix-index.js`, 88 narrations réécrites. Les commentaires
  HTML des 29 stations qui disaient le contraire sont corrigés ; les stations sont
  revenues en **LF** (elles étaient en CRLF sur le disque).
- **Audit par branche (6 agents Sonnet, lecture seule)** : aucune valeur non sourcée
  nulle part — la doctrine a tenu. Défauts trouvés et corrigés : quiz devinables (bonne
  réponse toujours la plus longue, jamais en position 1 ou 4), narrations qui décrivaient
  la géométrie (Impact), correspondances « en préparation » vers des stations ouvertes
  (11 stations, liens réels posés), textes périmés des FOND DESP, note de fabrication
  visible dans un SVG, pictogramme GHS07/GHS08 (risques-chimique), pressostat de
  sécurité à réarmement manuel (desp-soupapes, écran 7 — **à confirmer par F. Henninot**),
  textes SVG qui débordaient (tspan).
- **Scènes Codex** (décisions F. Henninot 27/09 : *dessin inerWeb*, *marque inerWeb*) :
  une scène par sous-ligne ouverte, `img/scene-<branche>.webp`, consignes conservées
  dans `img/consignes/`, posée en tête de l'accueil de chaque station par
  `outils/poser-les-scenes.mjs` (idempotent), masquée à l'impression.
- Outils : `.planning/…/planches.mjs` (planches-contact des 232 SVG) ; captures par
  Chrome sans fenêtre (`--headless=new --screenshot`) quand le volet navigateur expire.

**Narrations modifiées → MP3 à refabriquer** (chaîne edge-tts, feu vert du 24/08) :
listées dans chaque `corrections-<branche>.md` (Impact : 8 écrans ; DESP : soupapes
écran 7 ; autres : voir comptes rendus).

**Reste pour F. Henninot** (les comptes rendus en portent le détail) :
1. Arbitrer `VALEURS-A-VALIDER-DESP.md` (attend depuis le 26/08).
2. Confirmer le réarmement manuel du pressostat de sécurité (desp-soupapes-securites).
3. Le plan affiche « PS > 0,5 bar » sous « La directive » (valeur sourcée, non arbitrée).
4. Les « ce qui manque » par station (2-3 lignes chacune) : ajouter ou non.
5. Relecture métier (`data-prototype` toujours posé), codes du référentiel dans les
   stations fluidiques.

## Ce que c'est

Un **deuxième réseau** de cours inerWeb, **niveau BTS**, sur la réglementation, la
sécurité et l'environnement. Né d'un besoin de F. Henninot : désengorger le plan
technique au lieu d'y empiler des stations.

## Les huit décisions de F. Henninot — cadre non négociable

1. **Réseau de réseaux.** Une entrée du plan n'est pas une station terminale mais la
   **tête d'une sous-ligne** qui descend (« l'acoustique, c'est une ligne ;
   l'incendie, c'est une ligne »).
2. **Maillage.** Les sous-réseaux se répondent entre eux, pas seulement vers le
   réseau technique. Son exemple fondateur : Électrique ⇄ Risques professionnels,
   par l'habilitation et les EPI. « Une carte mémoire avec des interactions. »
3. **« Presque un autre site. »** La Législation ne se mélange PAS à la
   thermo-techno. D'où l'architecture SATELLITE — décision structurante.
4. **Création libre.** « Tu es assez doué pour faire mieux que le livre. » Le
   sommaire de manuel photographié n'est qu'une ossature de chapitres.
5. **La DESP est indépendante et transversale.** Sous-ligne à part entière, « au
   même titre que l'incendie et l'acoustique ». Elle touche aussi l'incendie :
   sprinkler et RIA sont des réseaux d'eau sous pression, lot CVC de bureau d'études.
6. **Projet inerWeb** (pas scolaire) → logo inerWeb. *(La question se repose à
   chaque production, même quand le cas paraît évident.)*
7. **▶ 24/08 — LES ILLUSTRATIONS DOIVENT S'ANIMER.** « On va utiliser Claude Design
   pour les illustrations en animation, pour rendre vivant le parcours de formation,
   et toujours le professeur en vocal qui explique. »
8. **▶ 24/08 — ON AVANCE BRANCHE PAR BRANCHE.** Une sous-ligne est menée jusqu'au
   bout — animations comprises — avant d'ouvrir la suivante. Plus de vague large.

## Architecture — le satellite

`legislation/index.html` se comporte comme les satellites existants
(`sous-tension`, `qcm-travail-hauteur`), pas comme une page du site :

- identité propre (« inerWeb Législation »), **aucun menu du site technique** — une
  seule passerelle, « ⇄ Le réseau thermo-techno » ;
- `lisibilite.js`, `marque.js`, `voix.js` et `prof-vocal.js` chargés **en absolu**
  depuis `https://inerweb.fr/moteur/` (règle du 20/08 : une source, zéro divergence) ;
- **le dossier doit rester déplaçable d'un bloc** vers un dépôt ou un sous-domaine ;
- il n'entre PAS dans `PAGES` de `build/version.mjs` ;
- `noindex` partout, hors sitemap, tant que le réseau est en construction.

## État au 24/08/2026 — 29 stations ouvertes sur 57

**Sous-lignes complètes** : Thermique (6) · La DESP (5) · Risques professionnels (6) ·
Déchets (5) · Impact environnemental (5).
**Partielle** : Fluidique & thermique — F-Gaz 3 et Aptitude & capacité, sur 4.

239 illustrations (220 fixes, **19 animées** — voir ci-dessous), 29 fonds rédigés.
Chaque station : 12 écrans (8 + 4 questions), 12 narrations, une illustration par
écran, quiz corrigé, `data-prototype` posé.

**▶ 24/08 — PREMIÈRE BRANCHE ANIMÉE : Impact environnemental.** Les 19 illustrations
qui gagnaient à bouger (sur 40) sont passées en SVG animé SMIL autonome — sans script,
état au repos = image finale (impression intacte), boucle 12-14 s avec temps de repos.
Validées par F. Henninot sur pages avant/après du projet Design
« Législation — Animations Impact environnemental » (`78a71ea1-d37d-40bb-bc59-638296de8064`).
Plan, tri écran par écran et SOURCES des SVG : `.planning/2026-08-24-animation-impact/`.
⚠️ **Claude Design ASSAINIT les .svg à l'écriture** (animate/style retirés du stockage
même) : pour les branches suivantes, sources SVG en local, validation par pages HTML
à SVG inline (le HTML n'est pas assaini) — jamais récupérer un SVG depuis Design.
Deux défauts hérités corrigés au passage : légende gris sur gris de `lien-tewi`,
trajets sur texte de `montreal-1987`.

Sur le plan, une station ouverte porte son **nom souligné** — pas seulement une
pastille pleine. C'est le correctif du défaut signalé le 24/08 : « il n'y a aucun
lien à cliquer » alors que le lien existait, invisible parmi 57 pastilles.

### Les 28 stations qui restent

| Sous-ligne | Reste | Couleur | Préfixe de slug |
|---|---|---|---|
| Acoustique | 5 | #6d28d9 | `acoustique-` |
| Incendie | 6 (dont Sprinkler & RIA) | #b91c1c | `incendie-` |
| Électrique | 6 | #a16207 | `elec-` |
| Certifications & normes | 4 | #3730a3 | `certif-` |
| Droit du travail | 5 | #9d174d | `travail-` |
| Fluidique & thermique | 2 (NF EN 378, Traçabilité) | #0f766e | — |

Noms et sous-titres exacts : tableau `RESEAU` de `legislation/index.html`.
Le préfixe de slug commande le rattachement des couleurs — voir
`outils/couleur-des-sous-lignes.mjs`.

## ▶ LA DIRECTION POUR LA SUITE

**Branche par branche**, et les illustrations **s'animent**.

Les 239 illustrations actuelles sont des SVG fixes. Le cap : les rendre vivantes via
**Claude Design**, en gardant le professeur vocal qui commente.

Ce qui est en place et ne doit pas être défait :
- **le professeur vocal** (`prof-vocal.js`) enchaîne les écrans seul et s'arrête sur
  les questions ; les identifiants `#listen`, `#next`, `#prev`, `#start`,
  `#stop-voice` et la classe `.slide.active` sont son CONTRAT — ne jamais renommer ;
- **`data-narration`** sur chaque écran : le texte décrit CE QUE L'ON VOIT, il ne
  relit pas la page. C'est lui qui rendra l'animation compréhensible — et il est
  déjà écrit pour les 29 stations ;
- **rien n'est dit qui ne soit aussi écrit**, et l'animation ne conditionne jamais
  du contenu : la station reste lisible et imprimable sans elle.

À tenir en animant :
- `prefers-reduced-motion` respecté, **sauf** si l'animation porte du contenu — dans
  ce cas elle ne s'y conditionne pas, elle se déclenche au clic ;
- **une animation se livre EN ANIMATION**, jamais en captures (échec du 20/08) ;
- sortie **SVG ou HTML**, jamais de bitmap — le résultat doit rester réintégrable ;
- **aucun texte sur un tracé**, police lisible à l'impression A4 noir et blanc ;
- annoncer le coût Design AVANT chaque envoi, et regrouper les corrections en une
  seule demande.

⚠️ **La connexion à Claude Design n'est pas accordée dans ce chantier.** F. Henninot
doit taper `/design consent` dans la session qui en aura besoin. Charte à utiliser :
projet « Charte graphique inerWeb » (`1394c5be-3bc5-441f-93d9-251c89f48ba8`),
11 pièces poussées le 13/08 — ne rien resynchroniser.

## ✅ QUATRE DÉCISIONS DE F. HENNINOT — 24/08/2026 au soir

Prises en réponse à des questions posées une par une. **Elles s'appliquent à la
suite du chantier, il n'y a plus à les redemander.**

1. **VOIX : `edge-tts`.** Feu vert donné pour la Législation, en connaissance de
   cause : le texte des narrations part chez Microsoft **au moment de la
   fabrication** — jamais en séance, jamais chez l'élève. Ce sont les voix qu'il a
   validées à l'écoute sur le réseau technique le 21/08. Chaîne :
   `build/voix/collecter-narrations.mjs` puis
   `build/voix/generer-audios-edge-tts.py --confirmer`, puis réduire l'index à la
   station. Piper est abandonné pour ce réseau (jugé métallique, et non installé).
2. **BRANCHE SUIVANTE À ANIMER : La DESP** (5 stations). La pression qui monte
   jusqu'au tarage, la soupape qui s'ouvre puis se referme, le pressostat qui coupe
   avant : le mouvement y est physique. Dérouler `CONSIGNES-ANIMATION.md`.
3. **VALEURS MANQUANTES : Claude cherche, F. Henninot valide.** Aller chercher
   chaque valeur **aux sources officielles** (Légifrance, textes en vigueur), puis
   lui livrer **un tableau valeur par valeur AVEC SA SOURCE**, qu'il arbitre en une
   fois. Il ne fournit rien lui-même. ⚠️ Rien n'entre dans une station avant son
   arbitrage : la règle « aucun chiffre non sourcé » reste entière.
4. **RÉFÉRENTIEL D'ADOSSEMENT : l'attestation d'aptitude 2025**
   (`packs/fluides/referentiel-2025.json`, arrêté du 21 novembre 2025), et non le
   BTS FED. ⚠️ **Conséquence à assumer, elle lui a été dite** : ce référentiel
   couvre les stations fluidiques, mais **ni le thermique, ni l'acoustique, ni
   l'incendie, ni le droit du travail**. Les stations hors périmètre resteront donc
   sans codes tant qu'une autre source n'est pas tranchée — ne pas leur inventer
   d'adossement pour faire nombre.

## La dette — ce qui attend F. Henninot

1. **Les valeurs réglementaires manquantes.** Consigne tenue à la production :
   *aucun chiffre inventé*. Tout ce dont la source n'était pas certaine a été
   **omis volontairement**, jamais approximé. Chaque `FOND.md` porte sa liste sous
   « À sourcer ». Principaux manques : seuils Bbio / Cep / carbone de la RE2020,
   seuil de degrés-heures du confort d'été, seuils et calendrier du DPE, montants
   des aides CEE, seuils de pression et périodicités de la DESP, valeurs de tarage,
   seuil de hauteur et périodicité de vérification des échafaudages, limites
   d'explosivité ATEX, année de l'amendement de Kigali.
   **Les cours enseignent les mécanismes correctement ; il leur manque des chiffres,
   tous identifiés.** C'est une passe de complétion, pas une réécriture.
   ▶ **Méthode tranchée le 24/08** : Claude cherche aux sources officielles et livre
   un tableau valeur / source, F. Henninot arbitre en une fois (décision 3).
   ▶ **26/08 — FAIT pour la branche La DESP** : `VALEURS-A-VALIDER-DESP.md`
   (commit `793dee3`). Les cinq stations y sont couvertes, valeur par valeur, avec
   l'article exact — directive 2014/68/UE lue sur EUR-Lex, arrêté du 20/11/2017 en
   version consolidée du jour (⚠️ modifié le 05/09/2025), décret 2015-799. Trouvé
   entre autres : PS > 0,5 bar (champ), les seuils PS·V et PS·DN des tableaux 1 à 9,
   **la surpression momentanée limitée à 10 % de la PS** (annexe I, 2.11.2 et 7.3),
   accessoires de sécurité en catégorie IV, inspection 4 ans / requalification 10 ans,
   dossier d'exploitation conservé toute la vie de l'équipement, contrôle DREAL
   (L. 557-46). Non trouvé et non inventé : classement CLP fluide par fluide, tarages
   NF EN 378 (norme payante), équation des courbes de l'annexe II, procédure de
   sanction. 🔴 **AUCUNE station modifiée — en attente de l'arbitrage de F. Henninot.**
2. **La relecture métier** : aucune des 29 stations n'a été relue par un
   professionnel. `data-prototype` posé partout.
3. **Le référentiel d'adossement** : tranché le 24/08 — **attestation d'aptitude
   2025**, pas le BTS FED (décision 4). Reste à faire : coder les stations
   fluidiques ; les stations thermique, acoustique, incendie et droit du travail
   restent hors périmètre, sans codes.
4. **La voix fabriquée** : seule F-Gaz 3 a ses 12 MP3 (Piper). Les 28 autres parlent
   avec la voix du navigateur. ▶ **Tranché le 24/08 : `edge-tts`** (décision 1), feu
   vert donné. À fabriquer branche par branche, en commençant par celle qui est
   animée (Impact environnemental), puis la DESP.
5. **L'hébergement définitif** : rester en `inerweb.fr/legislation/` ou partir en
   dépôt / sous-domaine séparé. Le dossier est déplaçable d'un bloc.

## Les outils du chantier

| Outil | Ce qu'il fait |
|---|---|
| `outils/fiches-a-valider.mjs` | publie les fonds à relire sur https://inerweb.fr/legislation/a-valider.html — **c'est par là que F. Henninot valide**, sans compte ni connexion |
| `outils/couleur-des-sous-lignes.mjs` | rend à chaque station la couleur de SA sous-ligne, lue DANS le plan |
| `outils/md2pdf.py` | conversion des fonds en PDF |

Relancer les deux premiers après toute production. Le second corrige un défaut
structurel : les stations copient le gabarit, feuille de style comprise, donc elles
héritent de l'accent de la sous-ligne Fluidique tant qu'on ne le réaligne pas.

## Le rail de production — pour chaque station

1. **Fond** : rédiger `stations/<slug>/FOND.md` → il apparaît automatiquement sur la
   page « à valider » → **F. Henninot valide**.
2. **Production** : bâtir sur le gabarit `stations/aptitude-capacite/` (12 écrans,
   narrations, quiz, illustrations). **Nouveau cap : les illustrations passent par
   Claude Design et s'animent.**
3. **Intégration** : `couleur-des-sous-lignes.mjs`, puis brancher le `href` dans le
   tableau `RESEAU` du plan, puis mettre à jour le bandeau « N stations ouvertes ».
4. **Vérification en ligne**, jamais seulement en local.

## Ce que la vague 1 a appris — à ne pas répéter

- **Un sous-agent à qui l'on confie 5 ou 6 stations d'un coup délègue au lieu de
  produire**, et ses propres sous-agents ne rendent rien. Deux salves ont été
  perdues ainsi. Ce qui a marché : une consigne explicite d'**écrire soi-même**,
  station par station. Le mieux reste **un agent pour une station**.
- **Les agents se marchent dessus** sur les mêmes fichiers : des illustrations ont
  été réécrites en cours de route, et 7 SVG orphelins ont dû être retirés de
  `desp-la-directive`. Contrôle à refaire après chaque branche : *tout SVG du
  dossier est-il référencé par son `index.html` ?*
- **Un agent peut détourner l'onglet du navigateur** partagé : renaviguer
  explicitement avant toute mesure.
- **Le contrôle qui a le plus servi** : ouvrir les illustrations dans un navigateur.
  Un agent y a trouvé trois débordements de texte qu'aucun contrôle de fichier
  n'aurait vus.

## Pièges déjà payés — ne pas les repayer

- Le **DÉPART** posé sur une ligne mère s'écrase contre son cartouche : il vit
  au-dessus, sur un court tronc vertical commun.
- Le **trait d'une ligne doit courir au-delà de sa dernière station**, sinon les
  pastilles flottent. Contrôle : le `H` final du path > le `cx` de la dernière.
- Mesurer les chevauchements en **`getBoundingClientRect`**, jamais `getBBox`.
- Ajouter une tête de sous-ligne **élargit le SVG** : penser `W`, la pointe de
  flèche, la position du jalon et `min-width` ensemble.
- **Vérifier toujours le site servi**, jamais le seul dépôt.
- Le **service worker** fige les fichiers audio sans les revalider : un MP3 à nom
  fixe corrigé ne sera pas réentendu. Point ouvert, noté dans
  `CONSIGNES-INTEGRATION-GLOBALE.md`.

## Voir en local

`.claude/launch.json` déclare `pilote-fluides-local` : serveur statique sur le port
**8123** servant `C:/git/pilote-fluides`. Le réseau :
`http://localhost:8123/legislation/`.

## Journal des commits (branche `main`)

- `98c0e87` → `804165b` — ouverture du réseau, réseau de réseaux maillé, bascule en
  satellite, 57 stations nommées, la DESP en sous-ligne indépendante
- `bea217f` — inventaire des gisements · `7ed83aa` — fond de F-Gaz 3
- `dee65ca` → `c29f441` — F-Gaz 3 produite, écrans navigables, professeur vocal,
  illustrations animées, voix Piper
- `955bc11` — connecteur en tête du plan principal · `da4526d` — bandeau des stations
  ouvertes · `0aaa3f8` — page « à valider » sur le site
- `975db58` — station Aptitude & capacité
- `1fce0c3` — **vague 1 : 29 stations ouvertes sur 57**
