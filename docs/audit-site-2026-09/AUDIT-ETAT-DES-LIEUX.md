# inerweb.fr — audit d'état des lieux, 12 septembre 2026

> Demande de F. Henninot : « faire le touriste », dire ce que vaut le site tel qu'il est servi,
> sur quatre axes — la technique (cinématique et dynamique vocale), le graphisme des parcours,
> l'inégalité de qualité entre stations, et la langue des voix (répétitions, mots anglais).
> Ce document est l'état des lieux. Il ne corrige rien. La section 8 dit ce qui peut se faire,
> dans un ordre.

## 0. Ce qui a été regardé, et comment

- **Le site en ligne**, tel qu'un visiteur le reçoit : l'accueil, les cinq pages d'entrée des
  réseaux, neuf stations de types différents (cours du plan, régule à lecteur, film narré,
  « Académie » de révision, Tome 3, une station par réseau satellite). Trois formats :
  téléphone 375 px, tablette 800 px, ordinateur 1 280 px.
- **Des sondes dans le navigateur** sur chaque page visitée : ressources en erreur, poids,
  animations actives, voix installées, et surtout **ce qui joue vraiment** quand on clique
  « Écouter » (fichier MP3 du site, MP3 propre au réseau, ou voix du navigateur).
- **Des mesures sur la copie servie** (dépôt `pilote-fluides`, commit `9b2d0d62`, arbre propre) :
  gabarits et feuilles de style, commandes vocales, corpus des 5 405 narrations, inventaire des
  stations des cinq réseaux. Deux scripts, deux rapports en annexe (`audit-voix.md`,
  `audit-stations.md`), réalisés par des agents Sonnet sur brief écrit et relus ici.
- **Ce qui n'a pas été fait** : écouter. Aucune oreille dans cet audit — les défauts de voix
  sont mesurés sur le texte et sur la mécanique, jamais sur le rendu sonore. L'écoute reste à
  F. Henninot. Le fond métier des cours n'est pas jugé non plus.

## 1. Le résumé, en dix constats

1. **Le site tient techniquement** : HTTPS, redirections, page 404, cache, hors-ligne — rien de
   cassé côté serveur. Les seules erreurs de console viennent d'un script Cloudflare, pas du code.
2. **La voix n'a pas une mécanique, elle en a quatre.** Selon le réseau, « Écouter » joue un MP3
   du fonds commun, un MP3 propre au réseau, ou la voix du navigateur du visiteur. Sur AéroRézo,
   **la voix change au milieu d'une station** : 18 narrations sur 120 (14 stations sur 30) sont
   oralisées avant le calcul de leur clé, leur MP3 n'est jamais trouvé, et la voix de la machine
   prend le relais — Hortense sur ce PC, une voix anglaise sur un appareil sans voix française.
   Cause localisée à une ligne (`aerorezo/app.js`, ligne 134).
3. **Quatre interfaces de commande vocale différentes** (bouton seul · bouton + « − / + » ·
   bouton + curseur + choix de voix · bouton + Pause + Stop + 0,95× + Aa). Deux réseaux offrent
   le choix de la voix, contre la décision « pas le choix entre les deux ».
4. **Animation et voix ne sont pas synchronisées dans les modules à lecteur** (pressostats, films
   narrés) : l'animation démarre seule au chargement, la voix attend le clic. On voit la suite en
   entendant le début.
5. **Le mode professeur (enchaînement automatique) n'existe que sur 48 pages sur 304.** Partout
   ailleurs, l'élève relance la voix à chaque écran.
6. **Le graphisme n'est pas une charte, c'est une collection** : 5 réseaux, 4 identités ; dans le
   plan thermo-techno, 32 feuilles de style pour 32 modules, 31 différentes, aucune ne lit les
   variables de la charte, et `moteur/charte-edu.css` n'est chargé par aucun module.
7. **Des défauts de mise en page visibles sans chercher** : barre HydroMétro chevauchée sur
   téléphone, carte AéroRézo illisible avec un grand blanc sur téléphone, volet « Infos » de
   l'accueil ouvert par défaut sur ordinateur et qui couvre le titre, bouton « Transcription » du
   film Ozone posé sur le logo.
8. **Les parcours reviennent au plan** : 24 modules sur 73 mènent à un autre module ; les 49
   autres renvoient l'élève au plan de 108 stations. Les vues de ligne `#ligne=huile`,
   `#ligne=regules`, `#ligne=co2` montrent tout le plan (connu depuis le 05/09, non corrigé).
9. **L'inégalité des stations est celle du plan thermo-techno** — section 6 : de 19 à 19 466 mots,
   de 0 à 112 écrans, 19 modules sans question, trois modèles de cours qui cohabitent (écrans
   narrés, lecteurs, films) ; les quatre réseaux satellites sont homogènes, sauf la ligne
   Principes d'HydroMétro, muette sur cinq stations sur six. 83 stations affichent un marqueur de
   chantier.
10. **La langue des voix** — section 7 : le texte est propre (60 termes anglais sur 72 à zéro) ;
    ce qui s'entend vient des termes de métier, des 552 étiquettes d'interface qui ont un MP3,
    et d'AéroRézo qui retombe sur une voix anglaise dès qu'un appareil n'a pas de voix française.
    Les répétitions sont des formules : « Retenez » 54 fois, « Maintenant » 47 fois dans
    ÉlectroRézo, cinq doublons de tête dans le Tome 3.

## 2. Technique — ce qui tient, ce qui pèse

**Ce qui tient (mesuré le 12/09).**

| Point | Résultat |
|---|---|
| HTTPS, `http://` → `https://`, `www` → apex | 301 puis 200, Cloudflare devant GitHub Pages |
| Page inexistante | 404 propre, page dédiée (2,5 Ko) |
| Cache HTML | `max-age=600` ; le service worker sert « réseau d'abord » pour les pages |
| Ressources en erreur sur les 13 pages sondées | 0 |
| Images cassées sur les pages sondées | 0 |
| Erreurs de console | 4 par page, toutes `email-decode.min.js` (option Cloudflare « obfuscation des e-mails » qui bute sur les liens du SVG du plan) — connu, hors code |

**Ce qui pèse.**

| Mesure | Valeur |
|---|---|
| Pages HTML servies (hors QR, build, docs) | 304 |
| Accueil | 162 Ko de HTML — plan, données et moteur de carte dans la page ; la page la plus lourde du site hors films |
| Trois modules « pressostat » (KP1, KP5, KP15) | 405 Ko de HTML chacun, React et styles en ligne |
| Dossier `packs/` | 657 Mo, dont **530 Mo de voix** (5 738 MP3) |
| ÉlectroRézo | 105 Mo (ses 464 MP3 propres) |
| Adresses dans `sitemap.xml` | 10 (les réseaux satellites sont hors sitemap, par choix) |

Le bruit des quatre erreurs Cloudflare a un coût réel : il masque toute erreur nouvelle dans la
console. À désactiver côté Cloudflare, ou à filtrer.

## 3. Cinématique et dynamique vocale

### 3.1 Ce qui joue quand on clique « Écouter » (mesuré, une station par réseau)

| Réseau · station sondée | Ce qui joue | Choix de voix offert | Commande à l'écran |
|---|---|---|---|
| Plan thermo-techno · Du glaçon au circuit | MP3 du fonds commun (`audio/f244f662-482.mp3`), mode prof passe en « lecture » | non | « 🔊 Voix active » + pastille « Mode prof vocal » |
| Plan · Pressostat BP (lecteur) | MP3 du fonds commun | non | « ▶ Écouter · ■ Stop · 0,95× · Aa · ⛶ » |
| Plan · Film Ozone | un MP3 unique (`voix-ozone.mp3`), lecteur React | non | « ▶ Écouter le film · Débit » |
| Législation · Aptitude & capacité | MP3 du fonds commun | non | « ▶ Écouter · ■ Arrêter » + « Mode prof vocal » |
| HydroMétro · Bitube | MP3 du fonds commun | non | « ▶ Écouter · ■ Arrêter · − 0,95× + » |
| **AéroRézo · L'air se déplace** | **voix du navigateur** (`speechSynthesis`), aucun MP3 | **oui : Hortense · Julie · Paul** (voix Windows de ce PC) | « Vitesse [curseur] 0,95× · [voix] · ▶ Écouter », et un 2ᵉ « Écouter » dans la station |
| **ÉlectroRézo · 1.1** | **MP3 propre au réseau** (`voix/homme/decouvrir.mp3`) | **oui : Henri · Denise** | « ▶ Écouter · vitesse [curseur] · 0,95× · [voix] » |

Trois régimes sonores coexistent donc : le fonds commun (une voix par module, parité 50/50,
hachage stable), le fonds propre d'ÉlectroRézo (deux voix au choix), et la synthèse du navigateur
sur une partie d'AéroRézo.

**AéroRézo : la voix change au milieu de la station — cause trouvée et mesurée.** Les 153 MP3
d'AéroRézo existent bien dans le fonds commun (153 sur 153 sur le disque, textes identiques aux
sources servies, 120 sur 120). Mais `aerorezo/app.js` (ligne 134) passe le texte par
`PILOTE_PRONONCIATION.oraliser()` **avant** de le donner à la voix ; la table remplace le tiret
cadratin « — » par une virgule ; le texte dit n'a plus la longueur du texte collecté (502 au lieu
de 503, 839 au lieu de 840), la clé du MP3 ne correspond plus, et `moteur/voix.js` retombe sur la
voix du navigateur. C'est le piège écrit noir sur blanc dans `voix.js` (« on oralise à la
lecture, jamais avant `textKey()` »). Mesuré sur la station « L'air se déplace » : écrans 1 et 2
lus par Hortense (voix Windows de ce PC), écran 3 joué par le MP3 `1ece4bf5-439` (voix
neuronale du fonds). **18 narrations sur 120, réparties sur 14 stations sur 30**, sont dans ce
cas : l'élève change de professeur d'un écran à l'autre. Sur un appareil sans voix française,
`app.js` (ligne 98) prend `voices[0]`, la première voix installée — une voix anglaise lit alors
ces 18 écrans en français.

### 3.2 La mécanique, comptée sur les 304 pages

| Mécanique | Pages |
|---|---|
| `moteur/voix.js` (MP3 du fonds commun, repli navigateur) | 167 |
| `moteur/reglage-voix.js` (le réglage de débit commun) | 123 |
| `moteur/prof-vocal.js` (le mode professeur : enchaînement automatique) | **48** |
| Fichiers qui appellent `speechSynthesis` en direct, hors moteur | 85 |
| Fichiers avec leur propre sélecteur de voix (`voixPick`, `getVoices`) | 142 (60 ÉlectroRézo, 29 Législation, 6 modules du plan + leurs scripts) |

Le mode professeur — celui qui fait qu'« un prof explique » sans que l'élève clique à chaque
écran — est l'exception, pas la règle. Sur les 256 autres pages, chaque écran attend un clic.

### 3.3 Animation et voix : découplées dans les lecteurs

Observé sur le Pressostat BP (KP1) et sur le film Ozone : au chargement, le lecteur démarre seul
(compteur à 0:02 puis 0:03 sans aucun clic) ; la voix, elle, attend « Écouter ». Un visiteur qui
lit la consigne dix secondes avant de cliquer entend le début du texte sur la fin de l'image.
Le contrat écrit dans `prof-vocal.js` (« l'écran suivant ne part qu'après la fin de la narration »)
vaut pour les cours à écrans, pas pour ces lecteurs, qui ont leur propre horloge.

### 3.4 La cinématique : trois techniques, pas une

Aucune vidéo MP4 sur le site. Les mouvements sont de trois natures :
- **des animations CSS en boucle** (16 actives sur « Du glaçon au circuit », 0 sur les huit
  autres stations sondées) ;
- **des étapes déclenchées au clic** (« ▶ Lancer l'eau », « ▶ Animation ») — l'image bouge quand
  l'élève appuie, sans lien avec la voix ;
- **des lecteurs React à horloge** (les trois pressostats, KVR/NRD, les deux films) — une
  frise temporelle, un compteur, une voix à part.

L'inégalité ressentie vient de là : d'une station à l'autre, « l'animation » n'est pas le même
objet, et le rapport entre ce qui bouge et ce qui parle change à chaque gabarit.

## 4. Graphisme — une collection, pas une charte

### 4.1 Cinq réseaux, quatre identités

| Réseau | Logo | Barre du haut | Titres | Ce qui le distingue |
|---|---|---|---|---|
| Accueil et plan thermo-techno | flocon + « inerWeb · Édu » | Accueil · Catalogue · Outils · Le métier · Formateurs | Trebuchet, bleu + orange | la charte de référence |
| Législation | idem + « Législation » | liens ⇄ vers les deux autres réseaux | idem | conforme |
| HydroMétro | flocon + cartouche « Hydro » | titre + liens ⇄ + « ? Mode d'emploi » + « − 0,95× + » | idem | composants propres (« JOUABLE », cartes de ligne) ; **barre chevauchée sur téléphone** |
| AéroRézo | flocon + cartouche « AéroRézo » | sous-titre écrasé en colonne, curseur, sélecteur de voix, ▶ | idem | **carte illisible + grand blanc sur téléphone** ; sous-titre illisible à toute largeur |
| ÉlectroRézo | texte « inerWeb · ÉlectroRézo », pas de flocon | aucune (pas de lien vers le site) | **serif Bitter/Georgia** | l'identité la plus éloignée ; « brouillon » écrit au pied des 60 stations |

### 4.2 Le plan thermo-techno : 32 feuilles de style, 31 différentes

| Mesure | Valeur |
|---|---|
| Modules avec leur propre `styles.css` | 32 |
| Empreintes distinctes de ces fichiers | **31** |
| Taille de ces feuilles (min · médiane · max) | 3,6 Ko · 31 Ko · 99 Ko |
| Feuilles qui utilisent la variable `--bleu` de la charte | 1 sur 32 |
| Modules qui chargent `moteur/charte-edu.css` | **0 sur 73** |
| Modules bâtis sur React en ligne (styles inclus) | 6 (3 pressostats, KVR/NRD, 2 films) |

Quatre familles visuelles cohabitent dans le seul plan : le cours « héros » à la charte
(« Du glaçon au circuit », Tome 3), le lecteur des régules (cadre sombre, frise, panneau latéral),
le film React plein écran, et l'« Académie interactive du froid » — un autre site dans le site,
avec sa propre barre (Modules · Simulateur · Atelier · Quiz) et sans le logo.

Polices : Trebuchet MS et Calibri dominent (plus de 350 déclarations). Hors charte : Bitter/Georgia
(ÉlectroRézo), Verdana (2 déclarations), Inter et Times New Roman (film Ozone, police de repli
non déclarée sur une partie du SVG).

### 4.3 Défauts de mise en page vus pendant la visite

| Où | Format | Défaut |
|---|---|---|
| Accueil | ordinateur 1 280 px | le volet « Infos » s'ouvre à l'arrivée et couvre le début du titre (« …métier de frigoriste ») — comportement voulu depuis le 19/08, mais il coûte le premier écran |
| Accueil | téléphone | la poignée « Infos ▸ » flotte sur les cartes ; la barre de navigation passe sur deux lignes (« Formateurs » seul) ; le flocon décoratif laisse un blanc entre les boutons et l'organigramme |
| HydroMétro (entrée) | téléphone | la barre du haut se chevauche : logo, « ⇄ Le réseau thermo-techno », « Législation » et le titre s'écrivent les uns sur les autres |
| AéroRézo (entrée) | téléphone | la carte SVG est réduite à une vignette illisible au bas d'un cadre vide (deux tiers d'écran blancs) |
| AéroRézo (entrée) | toute largeur | le sous-titre « de l'air relevé à l'installation calculée » est écrasé en colonne de trois mots à côté du cartouche |
| AéroRézo (station) | tablette | deux boutons « ▶ Écouter » sur le même écran (barre + station) |
| Film Ozone | tablette | le bouton « ▶ Transcription du film (13 passages) » est posé sur le logo inerWeb |
| ÉlectroRézo (station) | tablette 800 px | les onglets des cinq temps débordent à droite (le 5ᵉ coupé) |
| Tome 3 | tablette | une ligne de pied de page est coupée par la barre du bas |

## 5. Parcours

- **L'accueil fait son travail** : organigramme au premier écran, trois portes « Par où
  commencer ? », le plan, puis « Le réseau, en liste » pour le téléphone. C'est la page la plus
  aboutie du site.
- **Le plan est le seul aiguillage.** 24 modules sur 73 mènent vers un autre module ; les 49 autres
  ne proposent que le retour au plan. Sur téléphone, cela veut dire : remonter un plan de 108
  stations après chaque cours pour trouver le suivant.
- **Les vues de ligne sont cassées** : `#ligne=huile`, `#ligne=regules` (liens de retour gravés
  dans les modules par l'atelier) et `#ligne=co2` montrent tout le plan au lieu de la ligne.
  Relevé au REPRISE du 05/09, non corrigé.
- **Les réseaux satellites n'ont pas de navigation commune** (la phase 2 du chantier « réseaux »
  est prévue pour ça). Aujourd'hui, le retour au site dépend du réseau : « Le plan du réseau »
  (Législation), « ⇄ Le réseau thermo-techno » (HydroMétro), « ← Réseau » (AéroRézo, vers sa propre
  carte), « Retour au plan » (ÉlectroRézo, vers sa propre carte ; seule la page d'entrée du réseau
  renvoie au site, par quatre liens relatifs).
- **Les mentions de chantier sont en ligne** : « brouillon — CC BY-NC-ND » au pied de 59 stations
  ÉlectroRézo ; bandeau « Prototype — document de travail » posé par `moteur/marque.js` sur les
  29 stations Législation et les 22 d'HydroMétro (attribut `data-prototype`) ; « prototype » sur les cartes AéroRézo, ÉlectroRézo et
  HoCourant de l'accueil, « en construction » sur Législation, « bêta-test » sur inerWeb Fluide.
  Dès l'organigramme, cinq produits sur huit se présentent comme non finis.

## 6. L'inégalité des stations — mesurée

Périmètre (annexe B, `ANNEXE-B-STATIONS.md`) : 243 stations mesurées par script sur la copie
servie — 97 du plan (dont 24 capsules), 29 Législation, 22 HydroMétro, 36 AéroRézo, 59 ÉlectroRézo.
Mesures : écrans, mots visibles, questions, narrations, MP3, animation, moteur commun, marqueurs
de chantier. Deux limites, vérifiées avant d'écrire : les compteurs « images absentes » et
« liens cassés » du script sont faux (les chemins sont construits par script ; contrôle dans le
navigateur sur les deux stations les plus signalées, Mission 290 et le jeu des symboles :
0 image cassée, 0 ressource en erreur) — ils ne sont pas repris ici ; et dans le plan, « sans
narration » ne veut pas dire « muet », la voix passant souvent par d'autres champs (retours de
correction, captures, fragments). Le décompte de voix ci-dessous vient donc du corpus, pas du
script.

### 6.1 Par réseau : la dispersion

| Réseau | Stations | Mots par station (min · médiane · max) | Écrans (min · médiane · max) | Ce que dit la dispersion |
|---|---|---|---|---|
| Plan thermo-techno | 97 | 19 · 1 753 · 19 466 | 0 · 6 · 112 | un facteur 1 000 en mots, 20 en écrans : ce n'est pas un réseau, c'est 97 objets |
| Législation | 29 | 850 · 1 108 · 1 411 | 13 · 13 · 13 | gabarit strict, le réseau le plus homogène du site |
| HydroMétro | 22 | 513 · 2 586 · 2 777 | 0 · 5 · 8 | homogène, sauf la ligne Principes (6.2) |
| AéroRézo | 36 | 66 · 869 · 1 018 | 0 · 4 · 4 | homogène ; les six pages à 66-70 mots sont les évaluations |
| ÉlectroRézo | 59 | 680 · 1 058 · 1 931 | 4 · 4 · 5 | homogène, un gabarit, une narration par temps |

Les quatre réseaux satellites sont homogènes par construction — un gabarit, une livraison.
L'inégalité que le visiteur ressent est celle du plan thermo-techno, bâti en dix-huit mois par
gabarits successifs.

### 6.2 Où l'inégalité est réelle

**Le plan thermo-techno, trois familles de taille.**
- **Les très gros** : le CO₂ R744 (19 466 mots, 100 écrans, 33 questions, 370 entrées parlées),
  le Tome 3 (17 546 mots, 112 écrans, 268 entrées parlées), le manifold 2 voies (14 580 mots,
  19 questions), le régulateur électronique (10 383 mots, 24 écrans), le diagramme enthalpique
  (738 entrées parlées, le plus bavard du site). Quatre ou cinq stations qui valent chacune un
  réseau satellite entier.
- **Le cœur** : une quarantaine de modules entre 1 000 et 6 000 mots, 4 à 28 écrans.
- **Les minces** : l'« Académie interactive du froid » (579 mots, 5 écrans, aucune question,
  aucune voix, identité étrangère — sur le tronc, à la 7ᵉ station) ; « Le fil conducteur »
  (139 mots, ni écran ni voix) ; le régulateur KVL (92 mots visibles, aucune entrée parlée) ;
  le circuit d'huile interactif (1 087 mots, aucune entrée parlée).
- **Un troisième modèle de cours, la ligne Régulation** : ses 11 pages ne portent que 19 à
  24 mots et chargent le moteur commun `_regules-commun` ; le moteur interroge (112 choix,
  80 retours parlés) et explique **par ses films** (22 MP3 hors corpus, comme les deux films
  narrés du plan). Aucune narration d'écran : c'est un choix (« les films sont la base »,
  23/08), mais l'élève y change de mécanique sans prévenir.
- **Sans question de QCM** : 19 modules sur 72 (hors capsules), dont les deux films, le
  glissement de température, la récupération de fluide, la pose de manifold 4 voies.

**HydroMétro : la ligne Principes est à part.** Cinq de ses six stations (Débit, Écart ΔT,
Énergie, Mesurer, Puissance) tournent sur un autre moteur (`p-formation.js`), pèsent 513 à
592 mots contre 2 586 de médiane, n'ont **aucune narration ni bouton « Écouter »** (vérifié en
ligne sur Débit : 127 mots à l'écran, « Valider le réglage », « Questions finales »), là où les
17 autres en ont 5 à 8 avec leurs MP3. Un élève qui commence par la ligne P — c'est la
première — découvre un HydroMétro muet.

**AéroRézo** : homogène en structure ; l'inégalité y est sonore (section 3.1), pas de contenu.

**ÉlectroRézo** : homogène ; « brouillon » écrit au pied de 59 stations, « à écrire » sur deux
(contacts temporisés, barre de sectionnement).

**Marqueurs de chantier visibles, en tout : 83 stations** — 18 du plan (« prototype »,
« brouillon », « à compléter »), 6 HydroMétro, 59 ÉlectroRézo. Et un « R-??? » dans Mission
bouteilles (étiquette de bouteille de récupération non renseignée).

## 7. La langue des voix — anglicismes, répétitions, textes d'interface

Périmètre mesuré (annexe A, `ANNEXE-A-VOIX.md`) : le corpus commun `build/voix/corpus.json` —
5 405 entrées en 14 types, dont 823 narrations de cours (73 652 mots), 1 522 retours de
correction, 552 textes d'interface —, les 348 narrations Législation (type `data-narration`,
absentes du type `narration`), et un contrôle à part des 60 fichiers `narration.js`
d'ÉlectroRézo (35 506 mots), qui ne sont **pas** dans le corpus commun.

### 7.1 Les mots anglais : presque aucun dans le texte, mais trois façons de les entendre

Sur 72 termes cherchés dans les 2 345 narrations et retours, **60 sont à zéro**. Les 38 restants
sont du vocabulaire de métier : cut-out (9), cut-in (6), scroll (6), bypass (4), gas cooler et
flash gas (3), burn-out (2), reset (1), bi-flow (1), free cooling (1) ; et, hors liste, booster
(10), pump-down (9), TraxOil (7). Aucune phrase anglaise. Législation et ÉlectroRézo : zéro.

Ce que l'oreille attrape vient donc d'ailleurs :
1. **les termes de métier eux-mêmes**, une quarantaine, dits par une voix française sur les
   pressostats, le CO₂ et l'huile — « cut-in », « pump-down », « gas cooler » ;
2. **les 552 textes d'interface qui ont leur MP3** et passent dans la voix quand un module lit
   sa consigne ou son étiquette : 96 en capitales (« CUT OUT · CUT IN »), 77 avec un point médian,
   29 avec une flèche (« Question suivante → », « QCM technique »). Ils se concentrent sur
   module-compresseur (48), « Du glaçon au circuit » (39), pression-température (33),
   hydrocarbures (32) ;
3. **AéroRézo parle avec la voix du navigateur**, et `aerorezo/app.js` (ligne 98) retombe sur
   `voices[0]` — la première voix installée, quelle que soit sa langue — quand l'appareil n'a
   pas de voix française. Sur un tel appareil, tout le réseau est lu en français par une voix
   anglaise. C'est le piège déjà identifié le 27/08 et corrigé le 01/09 sur le Tome 3 ; il est
   encore là sur AéroRézo.

### 7.2 Les répétitions : trois mécanismes distincts

| Mécanisme | Où, combien |
|---|---|
| **Tics de tête de phrase** | fonds commun : « Retenez » 54 fois, « Notez » 25, « Regardez » 15, « Attention » 14 — 124 sur 823 narrations ; **ÉlectroRézo : « Maintenant » 47 fois, « Regardez » 39 fois** sur 60 stations, le réseau où le tic s'entend le plus |
| **Gabarits recopiés d'une station à l'autre** | AéroRézo ferme ses exercices par la même phrase sur 8 stations (« Deux questions sans note ») et sur 5 autres (« À vous de manœuvrer. Le premier curseur donne… ») |
| **Même phrase deux fois dans le même module** | Tome 3 : cinq paires de narrations s'ouvrent par la même phrase (« Les fuites se cherchent aux raccords d'entrée et… », « À l'entrée, du liquide haute pression… ») pour des organes différents — c'est le module où l'on entend deux fois la même chose |

Aucune phrase complète n'est recopiée à l'identique entre deux écrans d'un même module en
dehors de ces têtes de phrase : la répétition entendue est une répétition de **formules**, pas de
contenu.

### 7.3 Ce qui se prononce mal, ou pas comme il faudrait

| Défaut | Mesure |
|---|---|
| « bar » sans règle dans `prononciation.json` | 30 occurrences, dont 27 dans le CO₂ (R744) |
| Sigle « PE » (borne de terre) sans règle | 1 |
| « R 404 A » avec la lettre séparée du nombre, hors règle | 7 |
| Gras Markdown `**` resté dans le texte parlé | 2 narrations du Tome 3 |
| Point double « .. » | 12, toutes dans glissement-temperature |
| Tutoiement résiduel | 2 phrases, dans vanne-service-interactive |
| Narrations de plus d'une minute (170 mots à 2,89 mots/s) | 3, toutes AéroRézo |
| Médiane de longueur d'une narration | plan 85 mots (≈ 30 s) · HydroMétro 95 · AéroRézo 98 · Législation 59 |

## 8. Ce qu'on peut faire, dans l'ordre

Le principe : d'abord ce qui s'entend et se voit sur toutes les pages pour un coût faible ; ensuite
ce qui unifie ; en dernier ce qui demande de réécrire du contenu. Chaque ligne donne l'effet
attendu, le périmètre et un ordre de grandeur du coût — chantiers menés par Sonnet sur brief
écrit, Fable en cadrage et en contrôle, un chat par chantier.

| Ordre | Chantier | Ce que ça corrige | Périmètre | Coût |
|---|---|---|---|---|
| 1 | **AéroRézo : oraliser à la lecture, pas avant.** Retirer l'appel `oraliser()` d'`app.js` (le moteur commun le fait déjà au bon moment), retirer le sélecteur de voix et le repli `voices[0]` | la voix qui change d'écran en écran sur 14 stations ; la voix anglaise possible ; 153 MP3 déjà payés enfin joués | `aerorezo/app.js`, dans l'atelier `C:\git\aerorezo` puis relivré (deux copies) | petit — une demi-journée, ≈ 0,2 M tokens |
| 2 | **Une seule commande vocale.** La barre de `moteur/reglage-voix.js` (Écouter · Pause · débit) montée par le moteur sur les 304 pages à la place des quatre variantes ; ÉlectroRézo garde ses MP3 mais perd le choix Henri/Denise (attribution par hachage, comme partout) | constat 3 | 304 pages, surtout ÉlectroRézo (60) et AéroRézo (38) | moyen — 1 à 2 jours, ≈ 0,5 M |
| 3 | **Synchroniser voix et image dans les lecteurs.** Les six modules React (trois pressostats, KVR/NRD, deux films) ne lancent leur horloge qu'au clic « Écouter », et c'est la voix qui commande l'avance | constat 4 | 6 modules, par l'atelier-animations | moyen — 1 jour, ≈ 0,4 M |
| 4 | **Les défauts de mise en page** de la section 4.3 : barre HydroMétro, carte AéroRézo sur téléphone, volet « Infos » replié par défaut sur ordinateur (ou posé sous le titre), sous-titre AéroRézo, bouton « Transcription », onglets ÉlectroRézo, pied de page du Tome 3 | constat 7 | 7 fichiers | petit — une demi-journée, ≈ 0,2 M |
| 5 | **Le texte des voix.** Les restes mécaniques (2 tutoiements, `**`, « .. », règles « bar », « PE », « R 404 A »), puis une passe de réécriture ciblée : les tics (« Retenez » ×54 dans le fonds commun, « Maintenant » ×47 et « Regardez » ×39 dans ÉlectroRézo), les cinq doublons du Tome 3, les gabarits de fermeture d'AéroRézo ; refabrication des seuls MP3 touchés | constat 10 | ≈ 150 narrations, ≈ 150 MP3 | moyen — 1 jour, ≈ 0,5 M + fabrication edge-tts |
| 6 | **Étendre le mode professeur** (enchaînement automatique après la fin de la narration) aux réseaux qui ne l'ont pas : HydroMétro, AéroRézo, ÉlectroRézo | constat 5 | 3 réseaux, 122 stations, un branchement par gabarit | moyen — 1 jour, ≈ 0,4 M |
| 7 | **La charte commune aux cinq réseaux.** La phase 2 déjà planifiée (barre commune) + `charte-edu.css` chargée par tous les modules, variables de couleur à la place des valeurs codées, polices hors charte retirées ; l'« Académie interactive du froid » rhabillée ou sortie du tronc | constat 6 | 32 feuilles de style, 5 têtes de réseau | gros — 3 à 4 jours, ≈ 1,5 M, à découper par réseau |
| 8 | **Remonter les stations minces** (section 6) au niveau de la médiane de leur réseau : écrans, une question, une narration | constat 9 | la liste de la section 6 | selon la liste, ≈ 0,1 M par station |
| 9 | **Une station mène à la suivante.** Un lien « station suivante » généré depuis `moteur/plan-donnees.js`, qui connaît l'ordre, sur les 49 modules qui ne renvoient qu'au plan ; et les trois vues de ligne cassées | constat 8 | moteur + 49 modules | moyen — 1 jour, ≈ 0,4 M |
| 10 | **Les mentions de chantier** (« brouillon » au pied d'ÉlectroRézo, bandeaux « Prototype », cinq cartes sur huit) se retirent quand la relecture métier est faite — une décision, pas un chantier | constat 8 | — | — |

S'il ne fallait en faire qu'un : le 1, une ligne, effet immédiat à l'oreille. Puis les 2, 3 et 4
ensemble dans un seul chantier « voix et mise en page ». Le 7 se mène réseau par réseau, un
chat par réseau, jamais d'un bloc.

Réglage conseillé pour ces chantiers : Sonnet en exécution sur brief écrit, effort moyen ; Fable
en cadrage et vérification seulement ; le 7 (refonte structurelle) en opus, effort élevé.
