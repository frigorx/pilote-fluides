# Sources métier : pressostat BP (exemple Danfoss KP1)

Refonte du 13/11/2026. Chaque valeur de la page vient d'un des documents ci-dessous. Une valeur qui n'y figure pas ne s'écrit pas dans la page. Aucun logo, aucune image, aucun extrait de notice n'est repris.

## 1. Danfoss (appareil pris en exemple)

| Sigle | Document | Référence | Adresse |
|---|---|---|---|
| FD | Fiche de données « Pressure switch, Type KP » | AI213186439478en-001203, 2022.09 | https://assets.danfoss.com/documents/207508/AI213186439478en-001203.pdf |
| NI-KP1 | Guide d'installation « Pressure switch KP 1, 1W, 1A, 2, 4, 5, 5A, 6, 7 » | AN211886440281en-000704, 2024.10 | https://assets.danfoss.com/documents/464307/AN211886440281en-000704.pdf |

| Valeur de la page | Source |
|---|---|
| Version automatique : plage −0,2 à 7,5 bar, différentiel 0,7 à 4 bar réglable (code 060-114166) | FD, tableau des codes |
| Version à réarmement manuel : plage −0,9 à 7 bar, différentiel fixe 0,7 bar | FD, tableau des codes |
| Automatique : la vis de plage règle l'enclenchement ; coupure = enclenchement − différentiel | FD p. 4 « Setting » |
| Manuel : la vis de plage règle la coupure ; réarmement possible à coupure + différentiel | FD p. 4 |
| Un tour de vis : 0,7 bar (plage), 0,15 bar (différentiel) | FD p. 4 |
| La coupure reste au-dessus du vide (−1 bar) | FD p. 4 |
| Bornes 1, 2, 4 : 1 arrivée, 1–4 vers le moteur, s'ouvre quand la pression baisse, 1–2 signal | NI-KP1 p. 2, FD p. 3 |
| Moteur monophasé jusqu'à 2 kW environ branché en direct | FD p. 1 |
| Contact : 16 A sous 400 V (AC1, AC3), 10 A sous 400 V (AC15) | NI-KP1 p. 2 |
| Pression de service maximale 17 bar | NI-KP1 p. 1 |
| Température ambiante −40 à 65 °C ; raccord flare 1/4 de pouce (6 mm) | FD p. 2 et 4 |
| Levier d'essai manœuvré avec les doigts, jamais au tournevis | NI-KP1 p. 2 |

## 2. Fonds de l'auteur

| Valeur ou geste de la page | Document du fonds |
|---|---|
| Essai : fermer la vanne de départ liquide, noter la coupure, rouvrir, noter l'enclenchement, calculer le différentiel | « PROCEDURE REGLAGE PRESSOSTAT BP SECURITE.docx » |
| Exemples de réglage : coupure 0,2 bar ; −5 °C R134a 1,2 / 1,4 bar ; −5 °C R404A 3,8 / 4,0 bar ; −25 °C R404A 1,3 / 1,5 bar | même document |
| Deux emplois : sécurité, ou régulation (arrêt et remise en marche du compresseur par la pression d'aspiration) | « Le pressostat HPet BP prof.docx », fiche ERM n° 4 « La régulation pressostatique » |

Pressions de saturation recalculées le 12/11/2026 (CoolProp, bar relatifs) : R134a à −5 °C : 1,42 ; R404A à −5 °C : 4,09 ; R404A à −25 °C : 1,46.

## 3. Autres fabricants

| Ligne du tableau | Document du fabricant |
|---|---|
| Ranco O16, modèle BP (O16-R6703) : −0,2 à 8 bar, différentiel 0,7 à 4 bar, automatique | Robertshaw, fiche « Pressure Controls O Series », 150-3012, 11/25 |
| Alco (Copeland) PS1 : −0,5 à 7 bar (code 3), autres plages ; différentiel réglable, fixe en manuel ; bornes 1, 2, 4 | Copeland Europe, « Operating instructions, Pressure Controls Series PS1 / PS2 », P/N 0715180 Rev13, 28.11.2024 |
| Johnson Controls Penn P70 à contact inverseur : bornes 1, 2, 3 | Johnson Controls, « P70, P72, and P170 Series Controls », 24-7664-1601 Rev. H, 2018 |

Le repérage des bornes du Ranco O16 récent n'a été trouvé dans aucune notice : la page renvoie à la notice du modèle. Les plages du Penn P70 sont en psig dans la notice : la page ne les donne pas. Détail : `PROJET-VISIBILITE\nuit\AUTRES-MARQUES.md`.

Le sens de rotation des vis ne se lit pas avec certitude sur la notice : la page ne le donne pas.

## 4. Ce que la page ne traite pas (à compléter par l'auteur)

- Les pannes du pressostat lui-même (capillaire percé ou bouché, soufflet fatigué, contacts collés) : rien dans le fonds ni dans les notices lues.
- Les codes du référentiel affichés (repris de l'ancienne page, « à valider »).
