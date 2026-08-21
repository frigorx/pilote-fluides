# Voix locales de Pilote Fluides

Ce dossier contient les narrations MP3 générées pour les cours interactifs. Elles sont lues par
`moteur/voix.js`, sans appel réseau et sans dépendance à un service vocal au moment de la séance.

## Comportement dans les cours

- aucune lecture et aucun téléchargement audio ne démarrent à l'ouverture d'une page ;
- l'utilisateur déclenche la voix avec le bouton déjà présent dans le cours ;
- dans les 16 tutoriels, ce premier clic active le mode professeur pour la séance courante ;
- un écran explicatif passe automatiquement au suivant après sa narration ;
- une activité ou une question arrête l'enchaînement et attend une action humaine ;
- la correction visible est lue, puis la voix demande si elle est comprise et propose de
  continuer, réécouter ou rester sur l'écran ;
- la vitesse choisie dans le cours est appliquée au fichier local sans déformer la hauteur ;
- changer d'étape, quitter la page ou masquer l'onglet arrête la lecture ;
- le texte lu est le texte visible, normalisé seulement pour la prononciation ;
- si un texte est modifié sans que son MP3 soit régénéré, sa clé change et la synthèse du
  navigateur prend automatiquement le relais. Un ancien audio ne peut donc pas lire un contenu
  devenu faux.

Le lot du 6 août 2026 couvre 1 423 éléments vocaux, dont les 112 écrans dynamiques du Tome 3 :
5,90 h d'audio pour 121,5 Mio. Il contient 660 narrations longues et 763 questions, choix,
corrections ou répliques d'interface. L'index généré est `moteur/voix-index.js`.

## Mode professeur vocal

`moteur/prof-vocal.js` écoute les événements publics émis par `moteur/voix.js`. Il ne remplace
ni les données, ni le quiz, ni la fonction de navigation d'un module.

- `Commencer`, `Écouter` ou le bouton `Mode prof vocal` constitue le clic initial ;
- aucune autorisation n'est conservée après la visite ;
- aucun microphone et aucune reconnaissance vocale ne sont employés : l'apprenant répond avec
  les boutons visibles, ce qui préserve le fonctionnement hors ligne et la confidentialité ;
- les parcours qui possédaient déjà leur propre enchaînement, comme la frise et la nomenclature,
  le conservent ; le contrôleur détecte leur changement d'écran avant d'agir ;
- un texte parlé par le contrôleur est toujours affiché intégralement dans sa carte ;
- `Quitter`, l'onglet caché ou l'arrêt du mode annule la lecture et tous les délais ;
- la page reste entièrement utilisable si JavaScript vocal, l'audio ou le stockage sont absents.

Le fichier `build/voix/fixture-prof-vocal.html` sert uniquement au contrôle du passage automatique,
de l'arrêt sur question et de la remédiation. Il n'est relié à aucune page élève.

## Voix et droits

Le lot est mixte depuis le 21 août 2026. `moteur/voix-index.js` porte, entrée par entrée, un
champ `voix` quand la synthèse n'est pas Piper — son absence signifie Piper.

- fonds historique : Piper 1.4.1 / VITS, logiciel GPL-3.0, modèle `fr_FR-siwis-medium`
  (22 050 Hz), données SIWIS sous licence CC BY 4.0 ;
- tronc (9 stations, 706 narrations) : `edge-tts` (voix Microsoft Neural), deux voix affectées
  par rôle — `fr-FR-RemyMultilingualNeural` pour les narrations suivies,
  `fr-FR-VivienneMultilingualNeural` pour les questions et corrections ;
- stations de l'huile (20 stations) : `edge-tts fr-FR-HenriNeural` / `fr-FR-DeniseNeural`,
  fabriquées via `atelier-animations/refonte/voix/fabriquer-stations.mjs` ;
- fichiers de modèle et outillage de fabrication : conservés hors dépôt, jamais publiés
  avec le cours ;
- livrables publiables : uniquement les MP3, cet avis et le code du lecteur.

⚠️ `edge-tts` envoie le texte des narrations à Microsoft **au moment de la fabrication en
atelier**, jamais en séance ni chez le stagiaire. Voir `build/voix/generer-audios-edge-tts.py`,
qui exige `--confirmer` pour ce motif.

Sources de traçabilité (fonds Piper) :

- https://huggingface.co/rhasspy/piper-voices/blob/main/fr/fr_FR/siwis/medium/MODEL_CARD
- https://github.com/OHF-Voice/piper1-gpl
- https://datashare.ed.ac.uk/handle/10283/2353

Contrôle et mesures ayant motivé le passage à edge-tts sur le tronc :
`CONTROLE-VOIX-2026-08-21.md`, à la racine du dépôt.

Ces narrations restent un lot à écouter et à valider par F. Henninot avant bon à tirer. Une voix
naturelle ne valide ni la formulation métier, ni la prononciation des références de fluides.

## Refaire le lot après une correction éditoriale

Les sources de fabrication sont dans `build/voix/` :

1. `npm install --prefix build/voix`
2. `npm run collecter --prefix build/voix` — collecte aussi questions, choix et corrections ;
3. créer un environnement Python et installer `build/voix/requirements.txt` ;
4. télécharger `fr_FR-siwis-medium` hors du dépôt avec `python -m piper.download_voices` ;
5. lancer `build/voix/generer-audios-piper.py` avec `--model`, `--config`, `--output` et `--index`.
6. lancer `build/voix/verifier-audios.py` avec `--audio` et `--index` avant toute livraison.

La génération est reprenable avec `--offset` et `--limit`. À chaque lot, le script reconstruit
l'index de toutes les narrations déjà présentes. L'accélération GPU n'est qu'un confort de
fabrication ; elle n'est jamais requise chez le stagiaire.

Exemple depuis la racine du dépôt, une fois l'environnement Python activé :

```powershell
python -m piper.download_voices --data-dir "$env:LOCALAPPDATA\PiloteVoix" fr_FR-siwis-medium
python build\voix\generer-audios-piper.py `
  --model "$env:LOCALAPPDATA\PiloteVoix\fr_FR-siwis-medium.onnx" `
  --config "$env:LOCALAPPDATA\PiloteVoix\fr_FR-siwis-medium.onnx.json" `
  --output packs\fluides\res\voix\audio `
  --index moteur\voix-index.js
python build\voix\verifier-audios.py `
  --audio packs\fluides\res\voix\audio `
  --index moteur\voix-index.js
```

## Refaire une station du lot edge-tts (tronc)

```powershell
python -m pip install edge-tts
python build\voix\generer-audios-edge-tts.py --modules chaleur-interactive --confirmer
```

`--modules` accepte plusieurs dossiers séparés par des virgules. Le script ne touche que les
entrées des modules demandés : le fonds Piper et les autres stations edge-tts déjà fabriquées
restent intacts. `--confirmer` est obligatoire — sans lui, rien n'est envoyé à Microsoft.
