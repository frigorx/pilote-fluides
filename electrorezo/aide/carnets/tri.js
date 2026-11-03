/* Carnet d'aide « tri » : TD d'AP « Revoir le triphasé » (03/11/2026).
   Papier : C:\git\progression-2a-cap-ifca\Documents\AP-Revoir-le-triphase\
   Carte d'identité : 2e année CAP IFCA ; prérequis travaillés : TP 03-E (05/10), cours 05-E (15/10) ;
   codes C2.1 (choisir le couplage), C3.7 (trouver un fil mal serré) ; notion nouvelle : non ;
   support principal : la feuille, la station au bon onglet, cette aide pour le geste de chaque exercice.
   Exercices 1 à 4, passés en P1 le 03/11. Écriture pour élèves DYS (Franck, 03/11, 11 h 35) : une phrase par
   ligne (tableau « lignes »), dix mots au plus, verbe d'action en tête des consignes, pas de parenthèses.
   Images : captures 2D des stations 2.3, 2.5, 6.4 et un découpage de la feuille 4 (aide/images/tri/). */
AIDE.carnet({
  id: 'tri',
  titre: 'Revoir le triphasé',
  classe: '2e année CAP IFCA',
  voix: true,   /* voix/tri/<exercice>-<palier>-<pavé>.mp3, Piper siwis, fabriqués le 03/11 */
  exercices: {
    1: {
      titre: 'Les six mesures',
      station: { id: '2.3', dossier: '2-3-triphase', temps: 3 },
      paliers: [
        {
          lignes: [
            'L’exercice a deux parties.',
            'Partie 1, sur la station 2.3.',
            'Touchez le bouton « Réseau en bon état ».',
            'Recopiez les six mesures dans le tableau.',
            'Partie 2, sur la feuille : une autre armoire.',
            'Entourez les trois mesures qui sortent du lot.',
            'Écrivez le fil mal serré.'
          ],
          image: { src: 'images/tri/23-bon-etat.png',
            alt: 'Station 2.3, onglet 3 : les six mesures d’un réseau en bon état' }
        },
        {
          etapes: [
            { lignes: [
                'Un réseau en bon état donne deux valeurs.',
                'Entre deux phases : **400 V**.',
                'Entre une phase et le neutre : **230 V**.',
                'À quelques volts près.'
              ] },
            { lignes: [
                'Touchez « L2 mal serrée » sur la station.',
                'Trois mesures passent en rouge.',
                'Elles sont trop basses.',
                'Les trois ont le même fil : **L2**.'
              ],
              image: { src: 'images/tri/23-L2-mal-serree.png',
                alt: 'L2 mal serrée : L1–L2, L2–L3 et L2–N en rouge' } },
            { lignes: [
                'Pour l’autre armoire de la feuille :',
                'Comparez les mesures entre phases à 400 V.',
                'Comparez les mesures avec le neutre à 230 V.',
                'Entourez les mesures trop loin.',
                'Cherchez le fil écrit dans les trois.',
                'C’est le fil mal serré.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple sur la station : bouton « L2 mal serrée ».',
            'Entre deux phases, j’attends 400 V.',
            'L1–L2 vaut 332 V : trop basse.',
            'L2–L3 vaut 332 V : trop basse.',
            'L1–L3 vaut 398 V : bonne.',
            'Entre une phase et le neutre, j’attends 230 V.',
            'L2–N vaut 150 V : trop basse.',
            'Les trois mesures basses contiennent **L2**.',
            'L2 est le fil mal serré.',
            'Faites pareil avec l’autre armoire de la feuille.'
          ],
          image: { src: 'images/tri/23-L2-mal-serree.png',
            alt: 'Station 2.3 : trois mesures en rouge, toutes passent par L2' }
        }
      ]
    },
    2: {
      titre: 'De 230 V à 400 V',
      station: { id: '2.5', dossier: '2-5-tension-composee', temps: 3 },
      paliers: [
        {
          lignes: [
            'Sur la station 2.5, faites glisser le curseur.',
            'Il s’appelle « La tension simple ».',
            'Choisissez deux valeurs autres que 230 V.',
            'Pour chaque valeur, recopiez la tension simple.',
            'Recopiez aussi la tension composée.',
            'Divisez la composée par la simple.',
            'Arrondissez à deux chiffres après la virgule.',
            'Enfin, calculez 127 × 1,73.',
            'Écrivez le résultat de la calculatrice.'
          ],
          image: { src: 'images/tri/25-simple-230.png',
            alt: 'Station 2.5, onglet 3 : tension simple 230 V, tension composée 398 V, et le curseur' }
        },
        {
          etapes: [
            { lignes: [
                'La tension simple se mesure entre une phase et le neutre.',
                'La tension composée se mesure entre deux phases.',
                'La station calcule la composée pour vous.'
              ] },
            { lignes: [
                'Colonne de droite : divisez la composée par la simple.',
                'Exemple : 398 ÷ 230 = 1,7304…',
                'Arrondissez à deux chiffres après la virgule : **1,73**.',
                'Avec d’autres valeurs, vous trouvez aussi 1,73, ou presque.'
              ],
              image: { src: 'images/tri/25-simple-230.png',
                alt: 'Tension simple 230 V, multipliée par 1,73 : tension composée 398 V' } },
            { lignes: [
                'Dernière ligne : le calcul va dans l’autre sens.',
                'Multipliez la tension simple par 1,73.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : je pose le curseur sur 200 V.',
            'La station affiche 346 V.',
            'Je divise : 346 ÷ 200 = **1,73**.',
            'J’écris 200 V, 346 V et 1,73.',
            'À vous : deux valeurs autres que 230 V.',
            'Une valeur par ligne du tableau.'
          ],
          image: { src: 'images/tri/25-simple-200.png',
            alt: 'Station 2.5 : tension simple 200 V, tension composée 346 V' }
        }
      ]
    },
    3: {
      titre: 'Étoile ou triangle',
      station: { id: '6.4', dossier: '6-4-couplage', temps: 3 },
      paliers: [
        {
          lignes: [
            'L’exercice a deux parties.',
            'Partie 1, sur la station 6.4.',
            'Touchez « Étoile ».',
            'Lisez la case « Tension reçue ».',
            'Recopiez-la dans la colonne « Il reçoit ».',
            'L’écran dit « Couplage correct » : cochez « correct ».',
            'L’écran dit « Surtension » : cochez « il grille ».',
            'Surtension veut dire : le bobinage reçoit trop.',
            'Faites la même chose avec « Triangle ».',
            'Partie 2, sur la feuille : un autre moteur.',
            'Remplissez les blancs dans l’ordre.',
            'Tracez ses barrettes.'
          ],
          image: { src: 'images/tri/64-mission.png',
            alt: 'Station 6.4, onglet 3 : les boutons Étoile et Triangle, puis la case Tension reçue' }
        },
        {
          etapes: [
            { lignes: [
                'La plaque du moteur donne deux tensions.',
                'Le bobinage supporte la plus petite.',
                'Plaque 230 V et 400 V : le bobinage supporte **230 V**.'
              ] },
            { lignes: [
                'Ce moteur, sur le réseau 400 V, en étoile.',
                'Les barrettes relient les trois bornes du bas.',
                'Ces bornes sont W2, U2 et V2.',
                'Chaque bobinage reçoit 400 ÷ 1,73 = **231 V**.',
                '1,73, c’est racine de trois.',
                'C’est sa tension : le couplage est correct.'
              ],
              image: { src: 'images/tri/64-barrettes-etoile.png',
                alt: 'Couplage étoile : W2, U2 et V2 reliés, 231 V sur un bobinage' } },
            { lignes: [
                'Le même moteur en triangle.',
                'Trois barrettes sont debout.',
                'Chaque bobinage reçoit **400 V**, la tension entre deux fils.',
                'C’est trop pour un bobinage de 230 V.',
                'Il grille.'
              ],
              image: { src: 'images/tri/64-barrettes-triangle.png',
                alt: 'Couplage triangle : trois barrettes debout, 400 V sur un bobinage' } },
            { lignes: [
                'Pour l’autre moteur de la feuille :',
                'Cherchez 400 V sur sa plaque.',
                'Lisez le signe juste avant.',
                'Y veut dire étoile.',
                'Δ veut dire triangle.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : un atelier ancien.',
            'Entre deux fils, le réseau donne 230 V.',
            'La plaque porte Δ 230 V et Y 400 V.',
            'Je cherche 230 V : juste avant, il y a Δ.',
            'Je pose le triangle.',
            'Chaque bobinage reçoit 230 V : sa tension.',
            'La station dit « Couplage correct ».',
            'Sur votre feuille, le réseau est en 400 V.',
            'Pour chaque moteur, cherchez 400 V sur la plaque.',
            'Lisez le signe juste avant.'
          ],
          image: { src: 'images/tri/64-exemple-230-triangle.png',
            alt: 'Réseau 230 V, plaque 230 / 400 V, triangle : couplage correct' }
        }
      ]
    },
    4: {
      titre: 'Seul, sans la station',
      paliers: [
        {
          lignes: [
            'Trois questions, sans la station.',
            'a. Une autre armoire.',
            'Trouvez le fil mal serré, et dites pourquoi.',
            'b. Une tension simple de 400 V.',
            'Calculez la tension composée.',
            'Écrivez votre calcul.',
            'c. Trois moteurs sur un réseau 400 V.',
            'Écrivez le couplage de chaque moteur.',
            'Dites pourquoi le ventilateur ne prend pas l’autre couplage.'
          ],
          image: { src: 'images/tri/feuille-exercice-4.png',
            alt: 'L’exercice 4 de la feuille : questions a, b et c' }
        },
        {
          etapes: [
            { lignes: [
                'a. Reprenez la méthode de l’exercice 1.',
                'Entourez les mesures loin de 400 V et de 230 V.',
                'Le fil écrit dans les trois est le fil mal serré.',
                'Pour dire pourquoi, nommez les trois mesures trop basses.',
                'Elles ont toutes ce fil en commun.'
              ],
              image: { src: 'images/tri/23-L2-mal-serree.png',
                alt: 'Rappel de l’exercice 1 : trois mesures en rouge, toutes passent par le même fil' } },
            { lignes: [
                'b. Reprenez la méthode de l’exercice 2.',
                'Composée = simple × 1,73.'
              ],
              image: { src: 'images/tri/25-simple-230.png',
                alt: 'Rappel de l’exercice 2 : tension simple multipliée par 1,73' } },
            { lignes: [
                'c. Reprenez la méthode de l’exercice 3.',
                'Le réseau est en 400 V.',
                'Cherchez 400 V sur la plaque.',
                'Le signe juste avant donne le couplage.',
                'Y veut dire étoile, Δ veut dire triangle.',
                'Attention : sur les plaques, l’ordre des tensions change.'
              ] },
            { lignes: [
                'Pour l’autre couplage du ventilateur :',
                'Faites comme pour l’autre moteur de l’exercice 3.',
                'Calculez ce que reçoit un bobinage.',
                'Comparez avec ce qu’il supporte.'
              ] }
          ]
        },
        {
          etapes: [
            { lignes: [
                'Exemple a.',
                'L1–N 230 V, L2–N 100 V, L3–N 231 V.',
                'L1–L2 293 V, L2–L3 294 V, L1–L3 400 V.',
                'Loin du lot : L2–N, L1–L2 et L2–L3.',
                'Fil mal serré : **L2**.',
                'Les trois mesures basses passent par L2.'
              ] },
            { lignes: [
                'Exemple b.',
                'Tension simple : 100 V.',
                'Composée = 100 × 1,73 = **173 V**.'
              ] },
            { lignes: [
                'Exemple c. Un atelier ancien, réseau 230 V.',
                'La plaque porte Δ 230 V et Y 400 V.',
                'Je cherche 230 V : juste avant, Δ.',
                'Je pose le triangle.',
                'En étoile, le bobinage recevrait 230 ÷ 1,73 = 133 V.',
                'C’est trop peu pour un bobinage de 230 V.',
                'Sur votre feuille, le réseau est en 400 V.',
                'Cherchez 400 V sur chaque plaque.'
              ],
              image: { src: 'images/tri/64-exemple-230-triangle.png',
                alt: 'Réseau 230 V, plaque 230 / 400 V, triangle : couplage correct' } }
          ]
        }
      ]
    }
  }
});
