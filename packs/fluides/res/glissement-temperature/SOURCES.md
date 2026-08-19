# Sources métier et ressources réemployées

## RAG local consulté le 18 août 2026

- `02_CAP-IFCA/C4-MettreEnService/RELATION PRESSION TEMPÉRATURE.docx`
- `03_BAC-MFER/Froid-Frigorifique/Application sur les fluides ZEOTROPIQUE R407C.docx`
- `02_CAP-IFCA/C1-Communiquer/Dossier technique EP1 2016 v2.pdf`
- `pilote-fluides/CONSIGNES-SOCLE-THEORIQUE.md`
- planche `pilote-fluides/packs/fluides/res/svg/chaleur-sensible-latente.svg`
- plan de séance M1 : démonstration bouilloire + thermomètre, observer → nommer → expliciter le palier
- planche `pilote-fluides/packs/fluides/res/svg/diagramme-logph.svg`
- ressources thermodynamiques et diagrammes log p-h recensés par le RAG local.

Ces sources ont servi au cadrage. Aucun extrait tiers n'est reproduit dans l'interface.

## Ressources inerWeb locales

- `C:\git\pilote-fluides\packs\fluides\res\pression-temperature-interactive\`
- `C:\git\pilote-fluides\packs\fluides\res\surchauffe-sous-refroidissement-interactif\`
- `C:\git\pilote-fluides\packs\fluides\res\svg\diagramme-logph.svg`
- `C:\git\pilote-fluides\README.md`
- `C:\git\pilote-fluides\REPRISE.md`

## Références techniques externes

Les pages et PDF suivants ont été consultés pour vérifier les définitions et les conséquences métier. Ils restent des références ; aucune illustration n'en est copiée.

- ASHRAE Terminology, définitions de *azeotropic refrigerant*, *zeotropic refrigerant* et *bubble point* : <https://terminology.ashrae.org/?term=zeotropic+refrigerant>
- ASHRAE, addendum u à Standard 34-2022, séries de désignation 400/4000 et 500 : <https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20errata/standards/34_2022_u_20240422.pdf>
- ASHRAE Refrigerant Designations, composition et classement du R-507A parmi les azéotropes : <https://www.ashrae.org/technical-resources/standards-and-guidelines/ashrae-refrigerant-designations>
- Chemours, *Temperature Glide in Freon MP, HP and 407C Refrigerant Blends*, bulle, rosée, glissement, composition des phases et références de mesure : <https://www.chemours.com/en/-/media/files/freon/temperature-glide-freon-mp-hp-407c-refrigerant-blends.pdf>
- Chemours, *Freon 407C and 407A — Push Bulletin*, diagramme pression-enthalpie du R-407C utilisé pour contrôler la géométrie qualitative des isobares et isothermes : <https://www.chemours.com/en/-/media/files/freon/freon-r407c-r407a-push-bulletin.pdf>
- BITZER, *Refrigerants with temperature glide*, confirmation qu'un mélange zéotropique change de température pendant l'évaporation ou la condensation à pression constante : <https://www.bitzer.de/shared_media/html/at-540/en-GB/154516235154576267.html>
- Copeland, bulletin 95-14, rosée pour la surchauffe, bulle pour le sous-refroidissement et prélèvement liquide des zéotropes : <https://webapps.copeland.com/online-product-information/Publication/LaunchPDF?Index=AEB&PDF=95-14>
- Danfoss Ref Tools, affichage séparé dew/bubble pour les fluides avec glissement : <https://www.danfoss.com/fr-fr/service-and-support/downloads/dcs/ref-tools/>
- Danfoss, *Application Guidelines - Dew temperature and mean temperature for R407C*, figure de principe log p-h montrant que les lignes de température constante inclinées ne correspondent pas aux lignes de pression constante : <https://assets.danfoss.com/documents/latest/90056/AB23798644164301-000501.pdf>
- La GFF, *Le bypass double échelle Blondelle*, référence pédagogique fournie par F. Henninot pour vérifier qu'une isotempérature est représentée comme une courbe entière en zones liquide, diphasique et vapeur : <https://lagff.com/le-mag/le-bypass-double-echelle-blondelle>

## Choix de transposition pédagogique

- Le parcours V2 reprend l'ordre recommandé par le socle local, mais sépare désormais explicitement « chaleur latente » de « température forcément constante ».
- Le palier horizontal appartient au cas pur sans glissement ; la zone latente du zéotrope relie T bulle à T rosée avec variation de température à pression constante.
- Les composants A, B et C sont des repères symboliques, jamais une composition réelle.
- Le dessin montre une évolution de proportions et corrige explicitement la fausse idée « A s'évapore entièrement, puis B ».
- Le diagramme log p-h arrive comme confirmation d'un phénomène déjà observé : isobare horizontale, isothermes inclinées et intersections successives de bulle à rosée.
- Le dessin reste un SVG inerWeb original. La figure Danfoss sert uniquement à vérifier le principe ; elle n'est ni copiée ni intégrée.
- L'illustration La GFF fournie en référence n'est ni copiée ni intégrée ; seul le principe de continuité de l'isotherme est retenu.

## Prudence sur les valeurs

Les valeurs de glissement dépendent du fluide et des conditions. Le module V2 n'affiche aucune valeur de table ni aucune proportion de composition. Les tracés sont qualitatifs et explicitement présentés comme tels.
