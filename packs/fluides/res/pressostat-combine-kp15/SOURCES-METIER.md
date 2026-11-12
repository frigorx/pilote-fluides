# Sources métier : pressostat combiné HP/BP (exemple Danfoss KP15)

Refonte du 13/11/2026. Chaque valeur de la page vient d'un des documents ci-dessous. Une valeur qui n'y figure pas ne s'écrit pas dans la page. Aucun logo, aucune image, aucun extrait de notice n'est repris.

## 1. Danfoss (appareil pris en exemple)

| Sigle | Document | Référence | Adresse |
|---|---|---|---|
| FD | Fiche de données « Pressure switch, Type KP » | AI213186439478en-001203, 2022.09 | https://assets.danfoss.com/documents/207508/AI213186439478en-001203.pdf |
| NI-KP15 | Guide d'installation « Pressure switch KP 15, KP 15A, KP 17W, KP 17B, KP 17WB » | AN211686434433en-000701, 2021.05 | https://assets.danfoss.com/documents/188038/AN211686434433en-000701.pdf |
| NI-KP1 | Guide d'installation « Pressure switch KP 1, 1W, 1A, 2, 4, 5, 5A, 6, 7 » | AN211886440281en-000704, 2024.10 | https://assets.danfoss.com/documents/464307/AN211886440281en-000704.pdf |

Le guide AN211886440281en ne couvre pas le KP15. Les bornes A, B, C, D sont dans le guide AN211686434433en, lu en image le 12/11/2026.

| Valeur de la page | Source |
|---|---|
| Plage BP −0,2 à 7,5 bar, différentiel BP 0,7 à 4 bar | FD p. 8 |
| Plage HP 8 à 32 bar, différentiel HP fixe 4 bar sur tous les KP15 | FD p. 8 |
| Versions : BP auto et HP auto ; BP auto et HP manuel ; BP manuel et HP manuel ; convertible, livré en manuel des deux côtés | FD p. 8 et 11, NI-KP15 p. 2 |
| Ce que règle la vis de plage selon le côté et le réarmement | FD p. 4, NI-KP15 p. 2 |
| Réarmement manuel possible à : coupure − différentiel (HP), coupure + différentiel (BP) | FD p. 4 |
| Un tour de vis : 0,7 bar (plage BP), 0,15 bar (différentiel BP), 2,3 bar (plage HP) | NI-KP15 p. 2 |
| La coupure BP reste au-dessus du vide (−1 bar) | NI-KP15 p. 2 |
| Bornes : A arrivée, C vers le moteur, B signal BP, D signal HP (50 VA au plus), borne de terre | NI-KP15 p. 1 et 2, FD p. 3 |
| A–C s'ouvre quand la BP baisse et quand la HP monte ; A–B se ferme sur défaut BP ; A–D se ferme sur défaut HP | NI-KP15 p. 2 |
| Version à un seul signal : bornes A, B, C | NI-KP15 p. 2, FD p. 3 |
| Moteur monophasé jusqu'à 2 kW environ branché en direct | FD p. 1 |
| Contact : 16 A sous 400 V (AC1, AC3), 10 A sous 400 V (AC15) | NI-KP15 p. 2 |
| Pression de service maximale 17 bar côté BP, 35 bar côté HP | NI-KP15 p. 1 |
| Température ambiante −40 à 65 °C | NI-KP15 p. 1 |
| Raccords flare 1/4 de pouce (6 mm) | FD p. 4 |
| Levier d'essai manœuvré avec les doigts, jamais au tournevis | NI-KP15 p. 2 |
| Bouton de réarmement sur le dessus du boîtier | NI-KP15 p. 2 (dessin « Manual reset ») |
| Ne jamais toucher une partie sous tension, ni avec les doigts ni avec un outil ; couper l'alimentation avant de câbler | NI-KP15 p. 2 (encadré « CAUTION ») |
| Convertible : un disque dans l'appareil choisit le réarmement de chaque côté | NI-KP15 p. 2 (« Convertible reset ») |

Le sens de rotation des vis (horaire ou antihoraire) ne se lit pas avec certitude sur la notice : la page ne le donne pas.

Code de l'appareil suivi : 060-126466 (code européen ; BP automatique, HP manuel, signaux BP et HP, raccords flare). L'ancienne page citait 060-126491, code du marché asiatique.

## 2. Fonds de l'auteur (procédures d'atelier)

| Valeur ou geste de la page | Document du fonds |
|---|---|
| Essai BP : fermer la vanne de départ liquide, noter la coupure, rouvrir, noter l'enclenchement | « PROCEDURE REGLAGE PRESSOSTAT BP SECURITE.docx » |
| Exemples de réglage BP : coupure 0,2 bar ; −5 °C R134a 1,2 / 1,4 bar ; −5 °C R404A 3,8 / 4,0 bar ; −25 °C R404A 1,3 / 1,5 bar | même document |
| Essai HP : arrêter le ventilateur du condenseur ou obturer le passage de l'air, noter la coupure, attendre la baisse, réarmer | « PROCEDURE REGLAGE PRESSOSTAT HP SECURITE.docx » |
| Choix de la coupure HP : température maximale du lieu + 10 °C + 10 °C ; elle dépend du fluide, du condenseur et du lieu | même document |
| Causes d'une HP trop haute : condenseur encrassé, ventilateur du condenseur en défaut | « Le pressostat HPet BP prof.docx » |
| Les contacts des deux côtés sont montés en série | « Pressostat combiné prof.docx » |

Écart signalé à l'auteur : la procédure HP donne « 55 °C soit 15 bar effectif au R134a ». Le calcul (CoolProp, 12/11/2026) donne 14,9 bar absolus, soit 13,9 bar au manomètre. La page écrit 13,9 bar et règle 14 bar.

Pressions de saturation recalculées le 12/11/2026 (bar relatifs) : R134a à −5 °C : 1,42 ; R404A à −5 °C : 4,09 ; R404A à −25 °C : 1,46 ; R134a à 55 °C : 13,90.

## 3. Autres fabricants (écran « Chez les autres fabricants »)

| Ligne du tableau | Document du fabricant |
|---|---|
| Ranco O17 : BP −0,2 à 7,5 bar, différentiel 0,7 à 4 bar ; HP 8 à 32 bar, différentiel fixe 4 bar ; réarmement selon le modèle ; bornes A, B, C, D | Robertshaw, « Installation Guide, O-Series Dual Pressure Controls », 352-00354-001, 2025, p. 1 ; fiche « Pressure Controls O Series », 150-3012, 11/25, p. 1 et 2 |
| Johnson Controls Penn P78 : BP −0,5 à 7 bar, différentiel 0,6 à 3 bar ; HP 3 à 30 bar, différentiel fixe 3 bar ; réarmement selon le modèle ; bornes A, B, C, D | Johnson Controls, catalogue européen 2019, p. 375 à 377 ; bulletin PB_P78_01, 2017, p. 3 et 4 |
| Alco (Copeland) PS2 : côté gauche −0,5 à 7 bar, différentiel réglable ; côté droit 6 à 31 bar, différentiel fixe ; réarmement selon le modèle ; bornes 11, 12, 14 et 21, 22, 24 | Copeland Europe, « Operating instructions, Pressure Controls Series PS1 / PS2 », P/N 0715180 Rev13, 28.11.2024, p. 1 et 2 |

Adresses et détail valeur par valeur : `PROJET-VISIBILITE\nuit\AUTRES-MARQUES.md` (relevé du 12/11/2026).

Points laissés hors de la page, faute de notice :
- différentiel BP du PS2 en bar (donné en psig seulement) ;
- côté BP ou HP de chaque jeu de bornes du PS2 ;
- borne basse du PS2 : −0,5 bar dans la notice de 2024, −0,3 bar dans une fiche de 2015 (la page suit la notice de 2024) ;
- Fantini Cosmi, Saginomiya : aucun pressostat combiné frigorifique trouvé dans une notice.

Les copies des documents Penn viennent d'hébergeurs de revendeurs ; les documents sont de Johnson Controls.

## 4. Phrases de sécurité ajoutées sans source dans le fonds (à valider par l'auteur)

- Pendant un essai : la main près de l'arrêt du compresseur ; arrêt à la main si le pressostat ne coupe pas à la valeur prévue.
- La coupure HP reste en dessous de la pression maximale de service de l'installation.
- Soufflet BP large et ressort souple, soufflet HP petit et ressort raide : consigne de l'auteur pour les dessins, non chiffrée dans la notice.

## 5. Ce que la page ne traite pas (à compléter par l'auteur)

- Les pannes du pressostat lui-même (capillaire percé ou bouché, soufflet fatigué, contacts collés) : rien dans le fonds ni dans les notices lues.
- L'ordre entre coupure HP, soupape et pression maximale admissible de l'installation.
- Les codes du référentiel affichés (repris de l'ancienne page, « à valider »).
