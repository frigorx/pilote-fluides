# Voix locales de Pilote Fluides

Ce dossier contient les narrations MP3 générées pour les cours interactifs. Elles sont lues par
`moteur/voix.js`, sans appel réseau et sans dépendance à un service vocal au moment de la séance.

## Comportement dans les cours

- aucune lecture et aucun téléchargement audio ne démarrent à l'ouverture d'une page ;
- l'utilisateur déclenche la voix avec le bouton déjà présent dans le cours ;
- la vitesse choisie dans le cours est appliquée au fichier local sans déformer la hauteur ;
- changer d'étape, quitter la page ou masquer l'onglet arrête la lecture ;
- le texte lu est le texte visible, normalisé seulement pour la prononciation ;
- si un texte est modifié sans que son MP3 soit régénéré, sa clé change et la synthèse du
  navigateur prend automatiquement le relais. Un ancien audio ne peut donc pas lire un contenu
  devenu faux.

Le lot du 6 août 2026 couvre 660 narrations, dont les 112 écrans dynamiques du Tome 3 : 5,18 h
d'audio pour 106,8 Mio. L'index généré est `moteur/voix-index.js`.

## Voix et droits

- moteur de synthèse de fabrication : Piper 1.4.1 / VITS, logiciel GPL-3.0 ;
- modèle français : `fr_FR-siwis-medium`, qualité medium, 22 050 Hz ;
- données vocales SIWIS : voix française professionnelle, licence CC BY 4.0 ;
- fichiers de modèle : conservés dans le cache de fabrication et jamais publiés avec le cours ;
- livrables publiables : uniquement les MP3, cet avis et le code du lecteur.

Sources de traçabilité :

- https://huggingface.co/rhasspy/piper-voices/blob/main/fr/fr_FR/siwis/medium/MODEL_CARD
- https://github.com/OHF-Voice/piper1-gpl
- https://datashare.ed.ac.uk/handle/10283/2353

Ces narrations restent un lot à écouter et à valider par F. Henninot avant bon à tirer. Une voix
naturelle ne valide ni la formulation métier, ni la prononciation des références de fluides.

## Refaire le lot après une correction éditoriale

Les sources de fabrication sont dans `build/voix/` :

1. `npm install --prefix build/voix`
2. `npm run collecter --prefix build/voix`
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
