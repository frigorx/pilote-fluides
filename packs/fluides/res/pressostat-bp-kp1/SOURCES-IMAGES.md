# Sources et droits des images

## Symboles de la bibliothèque validée

Les fichiers ci-dessous sont des copies locales à l’identique de `C:\git\usine-contenu\bibliotheque-symboles`, référencées dans son `catalogue.json`. Ils ne proviennent ni d’une recherche web ni d’une bibliothèque tierce.

| Copie locale | Source exacte | Usage |
|---|---|---|
| `assets/symboles/pressostat_bp.svg` | `svg/frigo_schema/pressostat_bp.svg` | symbole fluidique BP |
| `assets/symboles/pressostat.svg` | `svg/capteurs_froid/pressostat.svg` | symbole de capteur/commande |
| `assets/symboles/pressostat_no.svg` et `pressostat_nf.svg` | `svg/capteurs_froid/pressostat_no.svg` et `pressostat_nf.svg` | variantes de contact conservées pour la bibliothèque locale |
| `assets/symboles/contact_inverseur_no_nf.svg` | `svg/contacts/contact_inverseur_no_nf.svg` | lecture du contact inverseur |
| `assets/symboles/manometres.svg` | `svg/frigo_schema/manometres.svg` | ressource de schéma frigorifique |
| `assets/symboles/compresseur_general.svg` | `svg/frigo_schema/compresseur_general.svg` | chaîne de commande et isolement du compresseur |

Titulaire interne à confirmer dans le registre de la bibliothèque avant diffusion externe. La provenance technique est tracée ; aucune licence tierce n’est revendiquée.

## Visuels originaux du brouillon

Les coupes fonctionnelles, le soufflet animé, les ressorts, la bascule, la zone neutre, la face KP1 adaptée, les cadrans et le banc azote sont dessinés manuellement dans `src/visuals.js` pour inerWeb Édu. Ils ne reproduisent pas une coupe constructeur à l’échelle.

La face KP1 et le cadran de préréglage sont un portage graphique et fonctionnel du prototype interne canonique `frigorx/inerweb-frigolo/outils/kp1-pressostat-bp.html`, attribué dans l’écran et dans la documentation du projet.

## Nouvelle variante Claude fournie par Franck

Les sept PNG actifs de `assets/illustrations-claude/` ont été exportés à leur définition source 1920×1081 depuis le projet consolidé fourni par Franck :

- archive source : `C:\Users\henni\Downloads\Animations pressostat KP1 KP5 KP15.zip` ;
- SHA-256 de l’archive reçue : `B57BE3BD1DCC7479A9B7F8F52B72881B7DC19F8EBB2DEE191F1A49792F7FA1E6` ;
- composant utilisé : `pressostat-simple.jsx`, SHA-256 `1A7FBB57A785E81933C9F48B0BD6F6B0F0BAEDEA1B41CC29B3AFC4D6185E9ACD` ;
- export : 19 août 2026, aux instants documentés dans `assets/illustrations-claude/manifest.json` ;
- statut : illustrations de travail Claude, intégrées au brouillon à la demande de Franck ; droits de diffusion externe à confirmer avec lui.

Elles sont utilisées pour l’ouverture, le soufflet, les contacts, les seuils, le réglage, le cycle et la synthèse. Elles ne remplacent pas les activités inerWeb. Les valeurs qu’elles affichent décrivent leur exemple graphique et ne constituent pas une consigne universelle.

La première série issue de `Animation project.zip` est conservée, avec son manifeste, dans `assets/illustrations-claude/variantes/premiere-variante-20260819/`. Les fichiers KP15, `scraps/` et `uploads/` du nouveau paquet ne sont pas intégrés au module BP : le combiné est hors périmètre et les droits des images collées ne sont pas établis.

## Références non intégrées

Les schémas et photographies Danfoss ont servi uniquement à vérifier la nomenclature et le comportement. La photo locale `photo-pressostat-danfoss-kp2.jpeg` et les images des anciens documents Word ne sont pas intégrées, faute de droit de reproduction établi pour ce brouillon.
