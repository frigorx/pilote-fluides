# Chantier — la gare KVR + NRD et l'éclatement de la branche KV

Ouvert et mené le 20/08/2026. Décision F. Henninot du jour : **éclater KV**.
Marque : **inerWeb**. Non commité, non publié — diffusion gelée.

## Ce qui a été décidé

La gare unique « Les régulateurs KV » devient une **branche**. Raison donnée :
« on n'a pas besoin de tout savoir au début, et selon les cours on a besoin
de l'une ou de l'autre ». L'éclatement crée aussi les embranchements qui
serviront plus tard — le NRD est la porte vers le dégivrage par gaz chauds.

## Ce qui est fait

**Le module** `packs/fluides/res/regulateur-kvr-nrd/`
Animation Claude Design (9 scènes, 92 s) intégrée sur le modèle éprouvé de
`film-ozone` : React vendorisé en local par `build/films.mjs`, `.jsx`
précompilés en `.js`. **Zéro requête vers un tiers, mesuré dans le navigateur.**

- barre d'étapes à la charte, 9 étapes nommées en français ;
- entrée directe `?etape=…` — c'est elle qui porte la sous-station NRD ;
- transcription repliable des 9 étapes, plus les valeurs constructeur ;
- encadré **« NRD n'est pas NRV »** (demande de F. Henninot) : la vanne
  différentielle s'ouvre à 1,4 bar, le clapet anti-retour n'a pas de seuil —
  et on retrouve ce dernier sur les lignes de dégivrage par gaz chauds ;
- `couverture.json` : codes `1.05 · 9.02 · 9.05`, appui `9.09` ;
- palette des neutres alignée sur la charte (le canvas rendait en `#F6F3EC`
  et en blanc pur, que la charte proscrit). Les couleurs de fluide n'ont pas
  été touchées : elles portent la lecture du circuit.

**Les valeurs sont conformes à la fiche Danfoss** (AI251086497566fr) :
NRD ouverture Δp = 1,4 bar ; KVR plage 5–17,5 bar, usine 10 bar. L'animation
affiche 12,0 bar au condenseur et 10,6 bar au réservoir — l'écart fait bien
1,4 bar.

**Le plan** (`index.html`)
La ligne 🎛 CE QUI SE RÈGLE passe de 8 à 10 gares :

1. « Les régulateurs KV » — tête de branche, les trois ensemble
2. « Le KVR » — le nouveau module
3. « Le NRD » — **sous-station** : pastille réduite, crochet de rattachement,
   libellé en retrait, et même animation ouverte à son étape (pas un octet
   dupliqué). Le motif est générique : c'est ainsi que le dégivrage par gaz
   chauds se greffera.

Le plan général n'avait pas la place d'une antenne latérale — 56 px libres
entre deux colonnes, mesuré. La dépendance se lit donc par la taille de la
pastille et le retrait, pas par un embranchement dessiné.

Les repères horizontaux (ceinture, huile, outils, électrotech, correspondances)
descendent de 216 px : une colonne qui s'allonge pousse ce qui est dessous.

## Vérifié au navigateur

- 0 requête externe sur la page du module ;
- les 9 étapes sautent au bon endroit, sous-titres à l'appui ;
- plan : **0 chevauchement de texte sur 199** — il y en avait **2 avant**
  (« 🏁 Réglages maîtrisés » contre le libellé d'en dessous). Défaut
  préexistant, réparé au passage puisqu'il touchait cette ligne ;
- liste crawlable et JSON-LD régénérés : 65 stations, 10 sur cette ligne.

⚠️ **Non vérifié : l'animation en mouvement.** Le volet navigateur de la
session n'était pas affiché — `document.hidden = true`, 0 image en 300 ms,
donc horloge suspendue par le navigateur. Le rendu a été contrôlé étape par
étape, image fixe par image fixe. Le déroulé continu reste à voir de visu.

## Deuxième passe — les explications et la voix (20/08, après retour)

Le premier jet livrait l'animation et ses seuls sous-titres : ni voix, ni
explications. Manque réel, signalé par F. Henninot. Repris :

- **Neuf explications rédigées**, une par étape — le problème, l'effondrement
  de la HP, ce que fait la KVR, pourquoi le condenseur se noie, pourquoi le
  réservoir tombe quand même, ce que règle le NRD, le régime rétabli, et trois
  points à retenir. Vocabulaire d'atelier, valeurs constructeur citées.
- **Le panneau suit l'étape** : l'explication de l'étape en cours est surlignée
  (fond ambré + filet, jamais la couleur seule).
- **Bouton 🔊 Écouter** : lit l'explication de l'étape en cours, via
  `moteur/voix-index.js` + `moteur/voix.js`. Le texte lu est celui qui est
  écrit — une seule source, aucun décalage entre l'oreille et l'œil. Titre
  détaché du corps par un point, et traits d'union insécables normalisés à la
  seule lecture.
- ⚠️ **Les audios de qualité n'existent pas encore pour ces textes** : le
  fonds en compte 1423, aucun ne correspond. La voix de synthèse du navigateur
  prend donc le relais. La collecte + génération Piper se fait **après** le bon
  à tirer du texte — on ne fabrique pas des audios sur un texte non validé.

**Carton d'ouverture raccourci** (retour F. Henninot : « trop devant
l'animation, on ne voit rien »). Il tenait l'écran de 0,5 à 8,6 s, sur 900 px
de large. Désormais : 640 px, effacé à 4,8 s — mesuré, opacité 1 à 3,5 s,
0,38 à 4,5 s, 0 à 5,2 s. Il s'arrête avant le condenseur (x = 700), donc le
circuit reste visible pendant qu'il est là.

**Second zip** `Animate project discussionrd2n.zip` : strictement identique au
premier (mêmes empreintes MD5 sur les quatre fichiers). Rien à reprendre.

## Reste à faire

- **KVP et KVL n'ont pas de module propre.** Leur contenu vit en écrans
  transversaux dans la tête de branche. La branche ouvre donc avec les gares
  qui existent vraiment. Le moule est désormais là pour les écrire.
- **Le module est « orphelin » au registre** : aucune fiche du pack ne
  l'appelle, alors que la tête de branche est rattachée à `g9b`. À rebrancher.
- **« Fonds forcés à l'impression »** en critique d'audit : ça vient de
  `print-color-adjust: exact` dans `support.js`, le runtime Claude Design.
  Même verdict sur `film-ozone` et `film-effet-de-serre`. Code tiers, non
  touché.
- **Indexation RAG** : le dépôt exige le bon à tirer avant toute indexation.
  En attente.
- **Commit et publication** : rien n'est commité, diffusion gelée.
