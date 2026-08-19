# Sources des images et schémas

## Symboles validés

Les fichiers suivants sont des copies locales de la bibliothèque inerWeb située dans `C:\git\usine-contenu\bibliotheque-symboles` :

| Fichier du module | Source |
|---|---|
| `assets/symboles/pressostat_hp.svg` | `svg/frigo_schema/pressostat_hp.svg` |
| `assets/symboles/pressostat.svg` | `svg/capteurs_froid/pressostat.svg` |
| `assets/symboles/contact_inverseur_no_nf.svg` | `svg/contacts/contact_inverseur_no_nf.svg` |
| `assets/symboles/manometres.svg` | `svg/frigo_schema/manometres.svg` |
| `assets/symboles/compresseur_general.svg` | `svg/frigo_schema/compresseur_general.svg` |

Leurs tracés n’ont pas été redessinés. Les fichiers BP conservés dans le dossier d’assets proviennent du moule d’origine mais ne sont pas utilisés dans le parcours HP.

## Schémas originaux du module

Les visuels suivants sont construits manuellement en SVG/HTML dans `src/visuals.js` :

- vue extérieure et ouverture du KP5 pédagogique ;
- chaîne pression → soufflet → ressorts → bras → contact ;
- action brusque en trois états ;
- zone neutre avec trajet montant/descendant ;
- contact 1–2–4 et voyants marche/défaut ;
- comparaison KP5 automatique / manuel maximum ;
- garde de limite haute ;
- face KP5 interactive et manomètre ;
- banc à l’azote avec mano-détendeur à deux cadrans ;
- cycle de réglage et tableau de répétabilité.

Ces dessins sont des représentations fonctionnelles pédagogiques. Ils ne reproduisent ni une coupe constructeur ni une photographie tierce.

## Provenance fonctionnelle

La face KP5 interactive adapte les idées du prototype canonique `C:\git\inerweb-frigolo\outils\kp5-pressostat-hp.html`, sans reprendre ses dépendances distantes ni ses tables P/T.

## Nouvelle variante Claude fournie par Franck

Les sept PNG actifs de `assets/illustrations-claude/` ont été exportés à leur définition source 1920×1081 depuis le projet consolidé fourni par Franck :

- archive source : `C:\Users\henni\Downloads\Animations pressostat KP1 KP5 KP15.zip` ;
- SHA-256 de l’archive reçue : `B57BE3BD1DCC7479A9B7F8F52B72881B7DC19F8EBB2DEE191F1A49792F7FA1E6` ;
- composant utilisé : `pressostat-simple.jsx`, SHA-256 `1A7FBB57A785E81933C9F48B0BD6F6B0F0BAEDEA1B41CC29B3AFC4D6185E9ACD` ;
- export : 19 août 2026, aux instants documentés dans `assets/illustrations-claude/manifest.json` ;
- statut : illustrations de travail Claude, intégrées au brouillon à la demande de Franck ; droits de diffusion externe à confirmer avec lui.

Elles couvrent l’ouverture, le soufflet, les contacts, les seuils, le réglage, le cycle et la synthèse. Les vues de seuils et de cycle décrivent le KP5 automatique illustré. Elles ne doivent pas masquer la différence avec le réarmement manuel maximum enseignée dans le module.

La série précédente, visuellement identique aux sept instants exportés, est conservée dans `assets/illustrations-claude/variantes/premiere-variante-20260819/`. Les fichiers KP15, `scraps/` et `uploads/` du nouveau paquet ne sont pas intégrés au module HP : le combiné est hors périmètre et les droits des images collées ne sont pas établis.
