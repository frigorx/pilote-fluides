# Sources — 9.9 Moteur EC : la vitesse par un signal

## Faits techniques, tirés du fonds (brief FAITS-LOT-3 et énoncés LOT-3, 29/10/2026)

Sigles : [AQ] = notice AquaVent « Ventilo-convecteurs à moteur AC ou EC » (21/06/2021), dossier du banc VC10 (zip
`VC10_240703.zip`, entrée `DTVC10/Documentation technique/Ventilo-convecteur/notice_installation_ventilo_convecteurs_aquavent.pdf`) ;
[FT] = schéma ProFroid « QUIETOR standardisé », feuille « CONDENSEUR » (FT1T2_FR, page 9 sur 16) ;
[BO] = catalogue d'évaporateurs cubiques 3C-A (Bohn) ; [CG] = catalogue de groupes de condensation
(`catalog_condensing_units_eu_fr.pdf`, groupes traditionnels, composants électriques) ;
[WI] = catalogue Wilo, encadré « Technologie ECM » ; [SX] = notice circulateurs Siriux (Salmson), rubrique « Moteur » ;
[VF] = « 5 Electricité (variation de vitesse des moteurs asynchrones).pdf », p. 1 ;
[FH] = décisions écrites de Franck Henninot, 29/10/2026.

| Fait | Source |
|---|---|
| EC veut dire commutation électronique ; moteur « EC (commutation électronique) à commande 0..10 VDC proportionnelle » ; protection thermique incorporée | [AQ] p. 5 |
| Chaque modèle peut être décliné en moteur AC ou EC | [AQ] p. 2 |
| Le moteur EC s'alimente en 230 VAC monophasé, tolérance maxi plus ou moins 5 % ; prévoir un disjoncteur adapté | [AQ] p. 10 |
| Vitesse commandée proportionnellement par un signal 0..10 VDC (rubrique « Modulation de vitesse ») | [AQ] p. 5 et 10 |
| Le régulateur est à installer par l'installateur ; il fournit On, GND, 0..10 VDC, N et L (le PE ne part pas de lui sur le schéma) | [AQ] p. 10, schéma regardé |
| Bornier X1 : L (230 VAC), N, PE (vert/jaune), GND, 0..10 VDC ; COM et On vont à la vanne | [AQ] p. 10, schéma regardé |
| Moto-ventilateur MV avec un bloc INV contre le moteur ; légende « MV : moto-ventilateur EC, INV = inverter ». La station dit « l'électronique du moteur » et cite « inverter » une fois (consigne du brief) | [AQ] p. 10 |
| Se référer obligatoirement au manuel technique du régulateur (contrôle et dépannage) | [AQ] p. 10 ; énoncé 9.9 |
| Version AC : moteur AC 230 V monophasé avec condensateur, 6 vitesses disponibles dont 3 connectées au commutateur | [AQ] p. 5 |
| Version AC : autotransformateur offrant 3 vitesses sur 6 ; schéma avec les fils Com, Max, Med, Min, la terre, un condensateur C, un dispositif X2 | [AQ] p. 6 et 8, schéma regardé |
| Pas de commutateur de vitesse sur le schéma EC : la vitesse vient du signal | [AQ] p. 6 et 10 |
| Groupe de condensation : le condenseur standard a un moteur M 1~ à deux fils ; le condenseur EC monophasé a un moteur M 1~ raccordé par quatre fils repérés PH, N, 10V, 0V | [FT] p. 9, schéma regardé |
| Le moteur EC est dessiné avec le même symbole M 1~ que le moteur monophasé ordinaire | [FT] p. 9 |
| « PH » lu comme la phase, « N » comme le neutre ; PH et N amènent le 230 V ; 10V et 0V sont les fils du signal | énoncé 9.9 (question 4). Le texte du schéma [FT] n'explique pas le rôle de 10V et 0V |
| Moteur EC : variante ou option selon le modèle, jamais « il remplace » | [FH] ; [AQ] p. 2 ; [BO] ; [CG] |
| Évaporateur : « moteurs EC disponibles en option » ; motoventilateur EC en option « permettant une optimisation du niveau sonore et de la consommation électrique », sans chiffre | [BO] |
| Groupes de condensation : moto-ventilateurs AC, et moto-ventilateurs EC sur une plateforme | [CG] |
| Circulateurs : rotor à aimants permanents, champ tournant du stator par commutation électronique des bobines, polarité des enroulements changée selon l'électronique | [WI], [SX] |
| Circulateur à moteur EC : entrée analogique 0-10 V pour un signal de commande externe, en option | [SX] |
| Un variateur de fréquence reçoit « en général » sa consigne de vitesse en tension de 0 à 10 V | [VF] p. 1 |
| L = la phase ; PE = la terre ; N = le neutre | station 2.1 |
| Consigner l'appareil avant de toucher au câblage | station 6.7 |

Aucune valeur, durée ou marque n'a été ajoutée à cette liste. Ne sont pas dits : la tension de signal qui donne
l'arrêt ou la vitesse maximale, le rôle de GND, le rôle du contact « On », une mesure ou une panne du moteur EC,
un chiffre d'économie ou de bruit, des aimants pour un ventilateur.

## Illustrations
- `assets/cablage-ec.svg` : construit dans QElectroTech (`schemas-ligne-9/construire-lot3.py`, fichier
  `montages-lot3.qet`), converti en SVG par `outils/qet-vers-svg.py`, d'après [AQ] p. 10. Il garde les légendes
  « régulateur TAES » et « INV (inverter) » de la notice. Rien n'est redessiné à la main.
- `assets/biblio/aquavent-cablage-moteur-ac.png` ([AQ] p. 6) et `aquavent-cablage-moteur-ec.png` ([AQ] p. 10) :
  recadrages de la notice, détail dans `assets/biblio/IMAGES.md`. Notice constructeur : droits à confirmer.
- Les deux recadrages ProFroid de [FT] ont été retirés (mention « ne peut être copié sans autorisation »). Le fait
  du schéma se dit en texte.
- Temps 1 : le schéma EC. Temps 2 : les deux schémas de la notice l'un sous l'autre (`scene`). Temps 4 : le moteur
  du schéma EC (le symbole M 1~ seul n'est pas dans les `assets` de la station). Temps 5 : le tableau AC et EC, construit dans `contenu.js`.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins
pédagogiques, avec citation. Toute image signalée sera remplacée.
