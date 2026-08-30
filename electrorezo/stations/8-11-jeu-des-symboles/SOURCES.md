# 8.11 — Le jeu des symboles · sources

## Les symboles

Les 38 symboles de cette station ne sont pas de nouveaux fichiers : ce sont les
**mêmes exemplaires** que ceux affichés dans les stations d'origine, recopiés ici
pour que la station reste autonome hors du réseau. Ils viennent tous de la
bibliothèque inerWeb de symboles, convertie depuis **QElectroTech** (licence GPL) :

    C:\git\bibliotheque-symboles-energie\svg\10_electric\10_allpole\

Aucun n'a été redessiné. Tous ont été **recadrés** — `node outils/recadrer-symboles.mjs` —
c'est-à-dire que leur fenêtre a été resserrée sur le tracé : QElectroTech dessine
dans une case fixe où le symbole n'occupait souvent qu'un tiers de la surface.
Seule la fenêtre a changé ; aucun trait n'a bougé.

| Fichier | Ce qu'il représente | Vu d'abord en |
|---|---|---|
| `015_inter_2.svg` | Un interrupteur | 3.1 |
| `sectionneur_general.svg` | Un sectionneur | 3.2 |
| `interrupteur_sectionneur_biphase.svg` | Un interrupteur-sectionneur | 3.3 |
| `porte_fusible_bi.svg` | Un porte-fusible | 3.4 |
| `sectionneur_fusible_bi.svg` | Un sectionneur porte-fusible | 3.5 |
| `pojistka1p.svg` | Un fusible | 4.1 |
| `disjonct-m_1fn.svg` | Un disjoncteur magnéto-thermique | 4.3 |
| `disjonct-m_3f.svg` | Un disjoncteur moteur, trois pôles | 4.4 |
| `ddr2.svg` | Un interrupteur différentiel | 4.5 |
| `ddr3.svg` | Un disjoncteur différentiel | 4.6 |
| `relais_therm4.svg` | Un relais thermique | 4.7 |
| `ground1.svg` · `masse.svg` | La terre, la masse | 4.8 |
| `con_simple.svg` · `con_simple_nf.svg` | Contact NO, contact NF | 5.1 |
| `bobine3.svg` | Une bobine | 5.2 |
| `contact_relais.svg` | Un contact de relais | 5.4 |
| `bobine_tempo_travail.svg` | Une bobine temporisée au travail | 5.5 |
| `con_simple_tmp_t.svg` · `con_simple_tmp_r.svg` | Contacts temporisés | 5.6 |
| `poussoir.svg` · `poussoir_nf.svg` · `commut_2_position_fixe.svg` | Boutons | 5.7 |
| `au.svg` · `fin_de_course_came_no.svg` · `lampe2.svg` | Arrêt d'urgence, fin de course, voyant | 5.8 |
| `electrovanne.svg` | Une électrovanne | 6.1 |
| `transfo_mono.svg` · `transfo_tri.svg` | Transformateurs | 6.2 |
| `moteur_tri.svg` | Un moteur triphasé | 6.3 |
| `moteur_mono.svg` | Un moteur monophasé | 6.5 |
| `moteur_dc.svg` | Un moteur à courant continu | 6.6 |
| `ac1_ac1.svg` | Un gradateur | 7.2 |
| `static_freq_converter.svg` · `redresseur.svg` | Variateur de fréquence, redresseur | 7.4 |
| `cross.svg` · `jump.svg` | Croisement, saut | 8.1 |
| `borne_3.svg` | Un bornier | 8.9 |

## Ce que la station n'invente pas

Aucune image extérieure, aucune photographie, aucun document tiers. La station ne
fait que rejouer ce que les huit lignes ont déjà montré — c'est sa raison d'être.

## Le tirage

Les mauvaises réponses sont tirées **d'abord dans la même famille** que la bonne.
Ce n'est pas pour durcir le jeu : c'est que personne ne confond un moteur avec un
fusible. Ce qu'on confond, ce sont deux appareils voisins dont l'un autorise à
travailler derrière et l'autre non. C'est cette confusion-là qui se travaille.
