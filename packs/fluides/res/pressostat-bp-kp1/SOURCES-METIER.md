# Sources métier et arbitrages

Consultation effectuée le 19 août 2026. Le RAG a été interrogé en lecture seule par familles : technologie, zone neutre/différentiel, contacts/câblage, réglage sous azote et contrôle en fonctionnement. Le filtre de diffusion cloud a été conservé ; aucune donnée sensible n’a été extraite.

## Prototype canonique réemployé

| Source | Autorité | Apport repris |
|---|---|---|
| `C:\git\inerweb-frigolo\outils\kp1-pressostat-bp.html` | dépôt Git `frigorx/inerweb-frigolo`, commit d’ajout `56f3df1` | face KP1, manomètre, contact 1–2–4, réglages CUT IN/DIFF et exercices progressifs |
| `C:\git\pilote-fluides\packs\fluides\cartes.js` | dépôt Pilote Fluides | confirme que ce prototype GitHub est déjà l’outil KP1 relié au parcours |
| RAG `kp1-pressostat-bp.html` | `doc/5a00e6e43ab4abf704fcfec2810248b9` | confirme l’usage en formation professionnelle |

Le prototype publié reste intact. La présente refonte est un brouillon dérivé, entièrement hors ligne. Son écran pump-down n’est pas repris dans le cœur du chapitre sécurité.

## Fonds local utilisé

| Source | Référence RAG | Apport retenu |
|---|---|---|
| `les-pressostats.pdf` | `doc/a3678655de0e81bb7fd1d981f61c8611` | panorama technologique : BP, HP, combiné, différentiel d’huile, fonctions de régulation et de sécurité |
| `Activité n°1 Découverte des pressostat.docx` | `doc/185bc2280c415c4211b1e41aede4e943` | identification, préréglage, mesure de pression et analyse de l’action sur l’installation |
| `TP_Pressostat_BP_Raynaud.html` | `doc/6b790be62bf66b0e81c08c356bb69b80` | cut-in, cut-out, différentiel, manomètres et travail sous azote |
| `TP_Reglage_Visuel_Pressostat_BP.docx` | `doc/d557ce1c2a4c94ab16b307c9f2e61740` | exemple visuel CUT IN `0,3 bar` / CUT OUT `0,2 bar`, conservé comme cas d’exercice uniquement |
| `PROCEDURE REGLAGE PRESSOSTAT BP SECURITE.docx` | `doc/ddda154e648a5f613b0bdb30e99f97ac` | fermeture/ouverture du départ liquide, relevé des deux basculements, calcul du différentiel et répétition du contrôle |
| `PROCEDURE REGLAGE PRESSOSTAT BP REGULATION.docx` | `doc/a217415638950ca3a40f8d50fba45cb0` | logique de mesure dans les deux sens et nécessité de distinguer sécurité et régulation |
| `reglage bp sous azote.docx` | `doc/3a0766fbc02fe19d101a134841158e78` | préparation du banc, manipulation sécurisée de l’azote, contrôle des pressions et pose/dépose des manifolds |
| `TP_Réglage_Pressostat_Sans_Illustrations.docx` | `doc/2ea6eb0505e0620f67a4d5a621d03fa5` | installation, manifold, bouteille d’azote et progression pratique |
| `4.2 Electricité (réglage pressostat BP).pdf` | `doc/9c97eba5755f0fe3c7a2c50226a7d2da` | identification des réglages CUT IN et DIFF en fonctionnement ou à l’arrêt |
| `Pressostat 2 CABALAGE.docx` | `doc/c3e89eedc00a3da9b427effa04d499e2` | raccordement électrique en atelier et contrôle de mise en œuvre |
| `Pressostat 2 CABALAGE.pdf` | `doc/fef50556b076388ab199bbb503cdca5b` et `doc/d00277162af12a45f4e6b14bda54c31b` | variantes BAC MFER et CAP IFCA du TP de câblage |
| `Synthèse activité N° 22 seconde.docx` | `doc/77eb585af9ba859634e5cdc0e7a85175` | rôle sécurité, piquage aspiration et états `1–4` / `1–2` |
| `Doc. Ressource pressostat BP.docx` | `doc/1117125f82e55699c0364a0e5ceb646e` | schéma de raccordement et principes de fonctionnement |
| `Pressostat BP.docx` | `doc/c094a97c8d268fee5d935499b4f65608` | distinction sécurité/régulation et exemple historique à `0,2 bar` |

## Documentation primaire Danfoss

- fiche produit KP1 `060-205191` : plage `−0,2 à 7,5 bar Pe`, différentiel `0,7 à 4,0 bar`, SPDT, réarmement automatique : <https://designcenter.danfoss.com/products/climate-solutions-for-cooling/switches/pressure-switches/kp/p/060-205191> ;
- fiche produit KP1 `060-111166` : plage `−0,9 à 7,0 bar Pe`, différentiel fixe `0,7 bar`, réarmement manuel minimum : <https://designcenter.danfoss.com/products/climate-solutions-for-cooling/switches/pressure-switches/kp/p/060-111166> ;
- fiche de données KP : réglage LP sur CUT IN, différentiel sur DIFF, `CUT OUT = CUT IN − DIFF`, vérification au manomètre précis : <https://assets.danfoss.com/documents/latest/207508/AI213186439478en-001203.pdf> ;
- guide d’installation KP : contact `1–4` ouvert à la baisse, `1–2` ouvert à la hausse et mise hors tension avant câblage : <https://assets.danfoss.com/documents/latest/464307/AN211886440281en-000704.pdf>.

## Arbitrages et limites

- La zone neutre est définie comme l’intervalle entre CUT OUT et CUT IN ; sa largeur en bar est le différentiel. Dans cet intervalle, l’état dépend du dernier seuil franchi.
- Les valeurs locales à `0,2 bar` sont des exemples historiques, pas une règle universelle.
- Les tables P/T du prototype GitHub ne sont pas embarquées : leur provenance et, pour les zéotropes, le choix bulle/rosée ne sont pas documentés.
- La direction de rotation des vis n’est pas enseignée comme invariant. L’apprenant suit les repères du modèle puis mesure les basculements.
- Toute coupure visée doit rester au-dessus de la limite basse autorisée du compresseur et de la machine.
