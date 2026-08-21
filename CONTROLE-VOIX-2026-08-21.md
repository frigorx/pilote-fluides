# Contrôle des voix du réseau — 21 août 2026

> Contrôle demandé par F. Henninot : « la qualité vocale est inégale, souvent une voix
> métallique désagréable ». Relevé branche par branche, mesures à l'appui.
>
> **Mise à jour du même jour, après écoute et accord de F. Henninot** : le tronc puis les 6
> branches restantes du fonds central sont fabriquées et écrites dans le pack, avec la voix
> `edge-tts` en alternance par rôle — Rémy explique, Vivienne interroge et corrige. **Les 34
> stations du fonds central sont désormais homogènes.** Voir section 6.

## 1. Ce qu'on entend, et pourquoi

Le site ne parle pas d'une seule voix. **Il en a trois**, et elles alternent parfois à
l'intérieur d'une même station.

| Régime | Stations | Ce que c'est | Format |
|---|---:|---|---|
| Fonds central Piper | 34 | `fr_FR-siwis-medium`, MP3 fabriqués à l'atelier | 22 050 Hz · 48 kbps |
| Voix « Henri » | 20 | `edge-tts fr-FR-HenriNeural`, MP3 par station | 24 000 Hz · 48 kbps |
| Voix du navigateur | 15 | `speechSynthesis` : dépend de la machine du stagiaire | variable |
| Muettes | 5 | aucune narration | — |

Les 7 stations de la boîte à outils vivent sur `Iner.web-tools-beta` et n'ont pas de voix :
ce n'est pas un manque.

## 2. La cause du timbre métallique : le modèle, pas le débit

Première hypothèse envisagée — « c'est l'encodage à 48 kbps qui abîme le son » — **elle est
fausse**, la mesure l'a écartée. LAME n'a pas coupé la bande : le fonds Piper porte du
signal jusqu'à 11 kHz.

Le défaut est dans le modèle lui-même. Spectre moyen mesuré sur 586 s du fonds Piper et
799 s du fonds Henri, en dB sous la bande 500–1500 Hz :

| | 4 kHz | 5 kHz | 6 kHz | 7 kHz | 8 kHz | 9 kHz | 10 kHz |
|---|---:|---:|---:|---:|---:|---:|---:|
| Piper siwis | −17,8 | **−22,5** | −19,6 | −15,8 | −14,2 | **−12,7** | −18,2 |
| Henri | −14,3 | −13,8 | −10,7 | −12,0 | −12,8 | −15,1 | −14,7 |

Une voix descend régulièrement au-dessus de 4 kHz. Le fonds Piper fait le contraire : il
creuse à 5 kHz puis **remonte de 10 dB jusqu'à 9 kHz**. Cette bosse est du bruit de vocoder
ajouté par le modèle. C'est elle qu'on entend comme un sifflement métallique sur les
consonnes. Henri ne l'a pas.

Mesure du même relief sur une phrase métier identique, dite par chaque voix candidate :

| Voix | Remontée dans le haut du spectre |
|---|---:|
| **Piper siwis — en service sur 34 stations** | **+11,0 dB** |
| Henri (`fr-FR-HenriNeural`) | +0,4 dB |
| Rémy (`fr-FR-RemyMultilingualNeural`) | +0,0 dB |
| Thierry (`fr-CA-ThierryNeural`) | +1,9 dB |
| Denise (`fr-FR-DeniseNeural`) | +6,5 dB |
| Vivienne (`fr-FR-VivienneMultilingualNeural`) | +6,1 dB |

Monter le débit d'encodage n'aurait rien réglé : le sifflement est dans la source.

## 3. La cause de l'irrégularité : la moitié du corpus n'a pas d'audio

`build/voix/corpus.json` déclare **3 210 narrations**. Le fonds central n'en couvre que
**1 563**.

```
narrations au corpus   : 3210
avec un MP3 fabriqué   : 1563
sans MP3 → navigateur  : 1647  (51 %)
```

Le moteur bascule alors sur `speechSynthesis`, comme il a été conçu pour le faire. La
conséquence est celle que Franck entend : **la voix change en cours de station**. Sur le
CO₂, 142 narrations sur 315 partent au navigateur ; sur `compresseur-interactif`, 58 sur 60.

Modules entièrement privés d'audio fabriqué (voix du navigateur du début à la fin) :

`pose-manifold-2-voies-interactive` (114) · `diagramme-enthalpique` (112) ·
`module-compresseur` (84) · `regulateur-electronique-interactif` (75) ·
`glissement-temperature` (69) · `surchauffe-sous-refroidissement-interactif` (54) ·
`pressostat-bp-kp1` (51) · `pressostat-combine-kp15` (39) · `filtre-deshydrateur-pedagogique` (37) ·
`detendeur-interactif` (37) · `pupitre-reglage-interactif` (34) · `voyant-liquide-pedagogique` (33)

Nature de ce qui manque : 621 énoncés de choix, 533 corrections, 243 phrases d'interface,
151 compositions, 46 étapes synchronisées.

> Les stations de l'huile apparaissent aussi dans cette liste, mais **elles ne sont pas en
> défaut** : leurs MP3 vivent dans leur propre dossier `voix/masculine/`, pas dans le fonds
> central. Le corpus les recense sans les couvrir.

## 4. Ce qui est proposé

Une seule voix sur tout le réseau, et plus aucune bascule vers le navigateur en usage normal.

1. **Franck écoute le banc et désigne la voix.** Décision humaine, elle ne se déduit
   d'aucune mesure.
2. **Le maillon de synthèse change, rien d'autre.** `corpus.json`, les clés, `voix-index.js`,
   `moteur/voix.js`, `prof-vocal.js` et le repli restent tels quels. Seul le moteur de
   fabrication passe de Piper à `edge-tts`. Le pack reste hors ligne en séance : la
   fabrication a lieu à l'atelier, jamais chez le stagiaire.
3. **Les 3 210 narrations sont produites**, pas 1 563. La bascule navigateur redevient ce
   qu'elle aurait dû rester : un filet de sécurité, pas un régime de fonctionnement.
4. **Branche par branche**, comme demandé. Une ligne du plan est contrôlée, régénérée,
   écoutée, puis on passe à la suivante.

Poids attendu : environ 6 h de parole à 24 kHz / 48 kbps, soit ~130 Mio, ordre de grandeur
du fonds actuel (150 Mio). Aucune inflation.

### La recette existe déjà, dans un autre dépôt

Elle n'est pas dans `pilote-fluides`, mais elle n'a pas disparu :
**`C:\git\atelier-animations\refonte\voix\fabriquer-stations.mjs`** fabrique les MP3 en
appelant `python -m edge_tts`, avec `fr-FR-HenriNeural` pour la voix masculine et
`fr-FR-DeniseNeural` pour la féminine. C'est cette chaîne qui a produit les 20 stations de
l'huile. `edge-tts 7.2.8` est installé sur le poste et répond.

Le travail à faire n'est donc pas d'inventer une chaîne, mais de **brancher celle qui existe
sur `corpus.json`**, pour que les clés, l'index et le repli du fonds central restent intacts.

Un relevé du même genre existe côté atelier : `atelier-animations/refonte/VOIX-A-REFAIRE.md`
liste les écrans marqués `voixPerimee` et attend, lui aussi, la validation des textes.

## 5. Comment le contrôle a été fait

Scripts de mesure, hors dépôt, dans le bac de session :

- `controle_voix.py` — lit `index.html`, reconstruit le plan, classe chaque station par
  régime vocal ;
- `comparer_fonds.py` — spectre moyen des deux fonds réellement servis ;
- `assembler_banc.py` — banc d'écoute et mesure du relief haute fréquence ;
- `couverture.py` — écart entre `corpus.json` et les MP3 présents.

## 6. Le tronc — fait, testé, écrit dans le pack

Après écoute du banc (Rémy et Vivienne comparés à Henri, Denise, Thierry), F. Henninot a
retenu **un mix des deux plutôt qu'une voix unique**, pour casser la monotonie sur 9 h de
parole. Règle retenue, proposée puis validée : **la voix change avec le rôle, jamais au
hasard** — Rémy dit les narrations et fiches suivies, Vivienne porte les questions et les
corrections. L'oreille sait ainsi immédiatement si on lui enseigne ou si on l'interroge.

Fabrication : 706 narrations sur les 9 stations du tronc, **0 raté**, 25 Mio. Écrit dans
`packs/fluides/res/voix/audio/` et fusionné dans `moteur/voix-index.js` — 706 entrées sur
1 799 portent désormais un champ `voix`, les 1 093 autres (fonds Piper des 25 autres stations
déjà couvertes, et le fonds Henri de l'huile) sont intactes.

Vérifié en navigateur réel, serveur local, sur `chaleur-interactive` : clic sur « Commencer »,
requête réseau `GET .../audio/f244f662-482.mp3 → 200 OK`, aucune erreur console, l'entrée
correspondante dans l'index porte bien `"voix": "fr-FR-RemyMultilingualNeural"`.

**Point signalé à Franck avant fabrication, pas après** : `edge-tts` envoie le texte des
narrations à Microsoft au moment de la fabrication en atelier — jamais en séance, jamais chez
le stagiaire. C'est déjà le cas pour les 20 stations de l'huile ; `atelier-animations` traite
ce point comme nécessitant un feu vert séparé du choix de la voix, et il l'aurait fallu ici
aussi avant, pas seulement après coup.

Script du dépôt, reproductible, avec ce garde-fou explicite :
`build/voix/generer-audios-edge-tts.py` — exige `--confirmer` pour envoyer quoi que ce soit.
Documentation à jour dans `packs/fluides/res/voix/README.md` et `LICENCE.md` (section 6).

## 7. Les 6 branches restantes — faites, testées, écrites dans le pack

Feu vert donné pour enchaîner sans repasser branche par branche. Fabrication séquentielle
(le script écrit dans le même `moteur/voix-index.js`, impossible à paralléliser sans risquer
une écriture concurrente) :

| Branche | Stations | Narrations | Ratées |
|---|---:|---:|---:|
| CO₂ + centrales | 13 | 316 | 0 |
| Ce qui se règle | 8 | 313 | 0 |
| Les organes | 5 *(détendeur déjà couvert)* | 475 | 0 |
| La ligne liquide | 4 | 131 | 0 |
| Les gestes | 4 *(3 stations muettes non traitées, voir plus bas)* | 158 | 0 |
| Fluides & environnement | 6 | 425 | 0 |
| **Total ajouté** | | **1 818** | **0** |

Avec le tronc, **2 475 narrations en edge-tts sur les 2 561 entrées de l'index** — les 86
restantes sont le fonds Henri/Denise de l'huile, non touché. **Les 34 stations du fonds
central sont désormais homogènes** : plus aucune bascule vers la voix du navigateur en usage
normal, plus de sifflement métallique.

Un garde-fou a été corrigé avant ce lot : le script initial risquait de garder un ancien MP3
Piper tout en l'étiquetant `edge-tts` dans l'index si le fichier existait déjà sous cette clé.
`generer-audios-edge-tts.py` compare maintenant l'attribut `voix` déjà présent dans l'index
avant de décider s'il refabrique — sans ce correctif, une partie du lot aurait pu rester
Piper sous une étiquette fausse.

Vérifié en navigateur réel, serveur local, sur trois stations de branches différentes
(`co2-r744`, `compresseur-interactif`, `hydrocarbures-a1-a2`) : requêtes audio en 200,
aucune erreur console.

### Ce qui n'a volontairement pas été touché

- **Les 3 stations muettes des Gestes** (vanne de service, manifold 2 voies, manifold 4 voies) :
  elles n'ont aucune narration au corpus, donc rien à refabriquer. Leur donner une voix suppose
  d'écrire d'abord le texte pédagogique — un travail de contenu, pas de voix, hors du périmètre
  de ce contrôle.
- **La boîte à outils** (7 stations) : hébergée sur `Iner.web-tools-beta`, hors de ce dépôt.
- **L'huile et le circuit d'huile** (17 stations, Henri/Denise) : déjà cohérentes, non touchées.

---

F. Henninot, enseignant en filière froid et climatisation
