# Sources — Relevés et réglages d’une chambre négative

Référence : Fonds de cours de F. Henninot (« profs cour Indexee ») ; RAG HAL ; Légifrance. Les documents cités appartiennent à leurs auteurs : ils sont reformulés, jamais recopiés.

## Ce qui a été lu, et où le cours l’emploie

| Ce que dit le cours | Source |
|---|---|
| Pressions du R-449A (BP à la rosée, HP à la bulle), pressions effectives | Tables du simulateur « Le réglage des pressostats » (tour-de-main/simulateur/regles-pressostat.js) : −30 : 0,59 ; −25 : 0,97 ; −20 : 1,43 ; −15 : 1,96 bar ; 30 : 13,49 ; 35 : 15,44 ; 40 : 17,57 ; 45 : 19,90 bar. |
| Pump-down (thermostat → électrovanne, BP → compresseur) ; BP de régulation (enclenchement à la pression de la consigne, coupure de 0,2 à 0,5 bar au-dessus de la BP de sécurité, coupure de sécurité à 0,2 bar) | Même simulateur (procédure de F. Henninot, 06/10). |
| Plages habituelles : surchauffe 5 à 10 K, sous-refroidissement 4 à 8 K | Cours « L’étanchéité » et « Les détecteurs de fuite » du réseau. |
| Chambre négative −20/−18 °C avec pump-down ; relevés | Travaux pratiques TP2 et activités du fonds (« Chambre négative mise en service et mesures »). |
| Différentiel du thermostat : grand = moins de cycles, petit = moins de consommation | Document « Froid commercial et chambres froides ». |

## À vérifier par Franck

1. Libellé « CP3 — Mettre en service une installation frigorifique monoposte à température négative » (titre professionnel) : donné par la fiche de mission, aucun référentiel du titre professionnel n’est dans les fichiers du poste.
2. Pressions du R-449A : valeurs pédagogiques de la base du réseau (CoolProp), pas les valeurs d’un fabricant.
3. La méthode de coupure HP de sécurité n’est pas enseignée ici : deux méthodes de Franck coexistent (température maximale + 25 K dans une fiche, 0,9 × tarage de la soupape dans le simulateur). Renvoi au simulateur.
4. La gare « Mettre en service une chambre froide négative » (https://inerweb.fr/tour-de-main/interventions/mise-en-service-chambre-negative/) n’existe pas encore dans ce dépôt : lien en 404 d’ici là. Le simulateur existe.
