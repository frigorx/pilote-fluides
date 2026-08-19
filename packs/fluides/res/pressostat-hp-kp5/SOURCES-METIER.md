# Sources métier et arbitrages

Consultation effectuée le 19 août 2026. Le catalogue de productions a été contrôlé, puis le RAG local de HAL a été interrogé en lecture seule avec le filtre `--pour-cloud`. Aucune donnée élève ou note de terrain n’a été extraite.

## Prototype canonique réemployé

| Source | Autorité | Apport repris |
|---|---|---|
| `C:\git\inerweb-frigolo\outils\kp5-pressostat-hp.html` | dépôt Git `frigorx/inerweb-frigolo`, commit d’ajout `56f3df1` | face KP5, manomètre, contact 1–2–4, logique CUT OUT/DIFF et exercices progressifs |
| RAG `kp5-pressostat-hp.html` | `doc/bedc0c84dda3110aa91c06596b43829a` | confirme l’usage en formation professionnelle |

Le prototype GitHub reste intact. La présente version est un brouillon dérivé, sans CDN et entièrement hors ligne. Les tables P/T et le calcul `90 % de PS` du prototype ne sont pas repris comme règles générales.

## Fonds local consulté

| Source | Référence RAG | Apport retenu |
|---|---|---|
| `PROCEDURE REGLAGE PRESSOSTAT HP SECURITE.docx` | `doc/89d10b102210e794d60605da9a74d94f` | préréglage, relevé de coupure, baisse de pression, réarmement et répétition du contrôle |
| `4.3 Electricité (réglage pressostat HP).pdf` | `doc/53bf890dccf3d8838ac4c2b5d994ca38` | contrôle en fonctionnement ou sous pression d’azote |
| `Synthèse activité N° 26 seconde.docx` | `doc/03008c70ebebeb1c557420184a2042f1` | rôle de sécurité, défauts de condensation et signalisation électrique |
| `_réglage des pressostat HP sécurité .docx` | `doc/3414a8aa2f7f1f80c3600f3666b55105` | réglage et câblage du pressostat HP en atelier |
| `Le pressostat HP et BP elev.docx` | `doc/1a3a6757a0bbd2eca0bc843ed3e55b30` | distinction sécurité/régulation et réarmement manuel ou automatique |
| `Pressostat combiné prof.docx` | `doc/a5c5950c5f22bba32c59f8c16ba2a614` | fonctions HP et BP réunies mais indépendantes dans un combiné |
| `fonctionnement du pressostat HP.docx` | `doc/971761d00291138b9ceccf43972a03fa` | conséquences d’une condensation trop élevée et arrêt de protection |
| `Raccordement Pressostat HP Prof.doc` | `doc/72878b821aec44b185121533b1cc6216` | raccordement électrique en atelier |

Le fonds local cite l’arrêt du ventilateur ou l’obstruction du débit d’air pour provoquer une montée HP. Le module ne transforme pas cette pratique en geste universel : elle est présentée comme un essai à risque, possible uniquement avec une procédure constructeur/site, des limites d’arrêt et une surveillance directe. Le banc à l’azote reste la méthode pédagogique privilégiée.

## Documentation primaire Danfoss

- KP5 automatique `060-117166` : plage `8 à 32 bar Pe`, différentiel `1,8 à 6 bar`, SPDT, réarmement automatique : <https://designcenter.danfoss.com/en-us/products/climate-solutions-for-cooling/switches/pressure-switches/kp/p/060-117166> ;
- KP5 manuel maximum `060-121266` : plage `8 à 32 bar Pe`, différentiel fixe `3 bar`, SPDT : <https://designcenter.danfoss.com/products/climate-solutions-for-cooling/switches/pressure-switches/kp/p/060-121266> ;
- fiche de données KP : réglage HP sur `CUT OUT`, réglage du différentiel sur `DIFF`, puis `CUT IN = CUT OUT − DIFF` : <https://assets.danfoss.com/documents/latest/207508/AI213186439478en-001203.pdf> ;
- guide d’installation KP : le contact `1–2` s’ouvre à la hausse, câblage hors tension et différentiel fixe de `3 bar` pour KP5 manuel : <https://assets.danfoss.com/documents/latest/464307/AN211886440281en-000704.pdf>.

## Arbitrages et limites

- La zone neutre est l’intervalle entre CUT IN et CUT OUT. Dans cet intervalle, l’état dépend du dernier seuil franchi.
- Sur un modèle automatique, la baisse jusqu’à CUT IN permet le retour du contact.
- Sur un manuel maximum, la baisse rend le réarmement possible mais ne referme pas seule le contact.
- La consigne de coupure est déterminée par la documentation de la machine et par la limite haute la plus contraignante ; aucune valeur générique n’est imposée.
- Le pressostat ne remplace ni la soupape de sécurité ni les autres protections prévues par la machine.
- La direction de rotation d’une vis n’est pas enseignée comme invariant : suivre les repères du modèle puis mesurer les basculements.

