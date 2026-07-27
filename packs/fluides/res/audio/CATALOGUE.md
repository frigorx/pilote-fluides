# Catalogue sonore — pack habilitation fluides

Onze sons courts, qui **habillent** les planches animées. Fournis par F. Henninot
le 27 juillet 2026 (« Pack sonore Pilote Fluides v1 »), avec leur note d'intention.

---

## ⚠️ Ce que ces sons NE sont pas

**Origine déclarée par F. Henninot : générés par ChatGPT.** C'est cohérent avec la règle du
dépôt — *génératif interdit sur les schémas techniques, autorisé sur l'ambiance* — mais cela
emporte une limite qu'il faut écrire une fois pour toutes :

> **Un son généré ne représente pas fidèlement un phénomène réel.**
> Une fuite de fluide ne fait pas *ce* bruit-là. Un compresseur non plus.

Conséquence pédagogique, non négociable : ces sons **habillent une animation**, ils
n'enseignent **jamais** un diagnostic à l'oreille. Aucune question, aucune fiche, aucune
consigne ne doit demander de reconnaître une anomalie à son bruit sur la base de ces fichiers.
Sur le plateau, l'oreille se forme sur le matériel réel — et sous la conduite du formateur.

Le `coeur_ralentit_bip_continu.wav` est une **convention dramatique** (la note d'intention
d'origine le dit elle-même), pas une représentation médicale.

**Droits** : sorties d'un modèle génératif, utilisées ici comme habillage. Si l'un de ces
fichiers se révélait reprendre une œuvre protégée, il serait retiré — même règle que pour les
photos d'atelier dont l'origine reste à confirmer.

---

## Les fichiers

| Fichier | Durée | Poids | Usage prévu |
|---|---:|---:|---|
| `validation.wav` | 0,3 s | 28 Ko | réussite, étape correcte |
| `erreur.wav` | 0,4 s | 37 Ko | erreur pédagogique |
| `vanne_clic.wav` | 0,4 s | 39 Ko | action sur une vanne |
| `transition.wav` | 0,5 s | 43 Ko | changement d'étape |
| `chute_choc.wav` | 1,4 s | 121 Ko | chute et impact |
| `alarme_danger.wav` | 2,5 s | 215 Ko | danger, alerte |
| `fuite_souffle.wav` | 3,0 s | 258 Ko | fuite, détente, gaz |
| `pas_escalier.wav` | 4,2 s | 362 Ko | technicien qui descend |
| `compresseur_ambiance.wav` | 5,0 s | 431 Ko | ambiance machine |
| `coeur_ralentit_bip_continu.wav` | 9,0 s | 775 Ko | battements ralentis puis signal continu |
| `musique_fond_legere.wav` | 12,0 s | 1 034 Ko | fond instrumental discret |

**Format** : WAV PCM, mono, 44,1 kHz, 16 bits. **Total 3,3 Mo.**

---

## Poids : pourquoi cela ne pèse pas sur le pack

Le pack élève tient à 674 Ko et doit s'ouvrir en 4G. Ces 3,3 Mo **n'y entrent pas** :

- aucun son n'est chargé à l'ouverture d'une page (`preload="none"`) ;
- un son n'est téléchargé **que** si le lecteur a activé le son **et** joue la planche
  concernée ;
- le son est **coupé par défaut**, et le choix est mémorisé sur l'appareil.

⏭️ **Allègement à faire** : convertir en OGG ou MP3 diviserait le poids par dix environ
(3,3 Mo → ~330 Ko). `ffmpeg` n'est pas installé sur la machine — c'est la seule raison pour
laquelle ce n'est pas déjà fait. Commande à passer le jour où il le sera :

```bash
for f in packs/fluides/res/audio/*.wav; do ffmpeg -i "$f" -c:a libvorbis -q:a 3 -ac 1 "${f%.wav}.ogg"; done
```

Il faudra alors servir l'OGG en priorité et garder le WAV en repli — `moteur/sons.js` sait
déjà essayer plusieurs extensions.

---

## Règles de mise en œuvre (reprises de la note d'intention, et tenues)

1. **Jamais de son fort au chargement.** Le navigateur le bloquerait de toute façon, mais
   surtout : on ne surprend pas quelqu'un qui ouvre une fiche en salle ou en public.
2. **Un contrôle Son / Silence**, mémorisé (`pilote_son`), respecté partout.
3. La musique de fond reste **très basse** sous les explications — et n'est pas utilisée
   aujourd'hui : elle attend les voix off.
4. Les scènes de sécurité peuvent porter une **dramaturgie plus forte**, sans gore ni effet
   comique.
5. Sur les planches techniques, les bruitages sont **rares et synchronisés** avec l'action.
6. **Voix off** : à prévoir plus tard. `SCRIPTS_VOIX_OFF.txt` (fourni avec le pack) en donne
   la base. ⚠️ Même règle que pour les capsules vidéo : **aucune voix enregistrée avant la
   relecture métier** — une voix est figée, et une erreur enregistrée s'enseigne longtemps.

---

## Comment la synchronisation fonctionne

Les planches sont insérées en `<img>` : le navigateur ne donne **aucun accès** à leur horloge
interne SMIL. Impossible, donc, d'écouter l'animation pour placer un son sur un événement.

La table `packs/fluides/sons.js` porte donc, pour chaque planche, **les instants relevés dans
le SVG lui-même** (attributs `begin` des `<animate>`), et `moteur/sons.js` programme les sons
sur ces instants au moment où l'animation (re)démarre.

⚠️ **Conséquence à connaître** : si l'on modifie les temps d'une planche, il faut reprendre sa
ligne dans `sons.js`. Le contrôle `node build/sons.mjs` compare les deux et signale tout son
programmé après la fin de son animation.

---

*F. Henninot · inerWeb Édu — pack sonore fourni le 27/07/2026.*
