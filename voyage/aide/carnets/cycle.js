/* Carnet d'aide « cycle » : exercice « Je trace le cycle d'un climatiseur au R32 » (trilogie, tome 3), 05/11/2026.
   Papier : feuille A4 de 3 pages (voyage-enthalpie2r/feuille/), un QR par étape vers aide/?cycle1 à ?cycle7.
   Carte d'identité : 1re MFER (Bac pro) ; prérequis : tomes 1 et 2 de la trilogie, TD 05 (point 4) ;
   codes A1T2, A2T7, S4.1.3, C2, C8, C11 ; support principal : la feuille, cette aide pour le geste de chaque étape.
   Palier 1 : la consigne et la vidéo de l'étape, qui s'arrête avant la correction (aucune correction ici).
   Palier 2 : le geste expliqué plus simplement. Palier 3 : un exemple résolu sur d'AUTRES relevés du même
   climatiseur (évaporation 10 °C, condensation 50 °C : isothermes tracées sur la feuille), chiffres CoolProp IIR : voyage-enthalpie2r/aide/EXEMPLE.md (calcul-exemple.py).
   Écriture DYS : une phrase par ligne, verbe d'action en tête des consignes. */
AIDE.carnet({
  id: 'cycle',
  titre: 'Je trace le cycle du R32',
  classe: '1re MFER',
  voix: false,
  exercices: {
    1: {
      titre: 'Noter les relevés',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 1.',
            'Le technicien lit deux manomètres et trois températures.',
            'Recopiez ces cinq valeurs dans le tableau « Mes relevés ».',
            'Écrivez les pressions telles qu’elles sont lues : en bar relatif.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-1-releves.mp4', poster: '../videos-enthalpie2r/etapes/etape-1-releves.jpg' }
        },
        {
          etapes: [
            { lignes: [
                'Le manifold a deux manomètres.',
                'Le bleu lit la basse pression : **BP**.',
                'Le rouge lit la haute pression : **HP**.'
              ] },
            { lignes: [
                'La pince thermométrique mesure la température d’un tuyau.',
                'Aspiration : le tuyau qui entre dans le compresseur.',
                'Refoulement : le tuyau qui sort du compresseur. C’est le plus chaud.',
                'Sortie du condenseur : le tuyau de liquide.'
              ] },
            { lignes: [
                'Rejouez la vidéo et faites pause sur chaque valeur.',
                'Écrivez la valeur avec son unité : bar ou °C.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : le même climatiseur, un autre jour.',
            'Manomètre bleu : 10,1 bar. J’écris 10,1 sur la ligne « manomètre BP ».',
            'Manomètre rouge : 30,4 bar. J’écris 30,4 sur la ligne « manomètre HP ».',
            'Pince à l’aspiration : 22 °C.',
            'Pince au refoulement : 100 °C. C’est bien la plus chaude.',
            'Pince à la sortie du condenseur : 44 °C.',
            'Faites pareil avec les valeurs de votre vidéo.'
          ]
        }
      ]
    },
    2: {
      titre: 'Passer en absolu, lire les saturations',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 2.',
            'Ajoutez 1 bar à chaque pression lue.',
            'Tracez les deux lignes de pression sur le diagramme.',
            'Lisez la température d’évaporation et celle de condensation.',
            'Calculez la surchauffe et le sous-refroidissement.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-2-absolu.mp4', poster: '../videos-enthalpie2r/etapes/etape-2-absolu.jpg' }
        },
        {
          etapes: [
            { lignes: [
                'Le manomètre lit la pression **relative** : il oublie l’air autour.',
                'Le diagramme utilise la pression **absolue**.',
                'Pression absolue = pression lue + 1 bar.'
              ] },
            { lignes: [
                'Trouvez la pression absolue sur l’axe de gauche du recto.',
                'L’axe n’est pas régulier : les graduations se serrent vers le haut.',
                'Partez de la graduation juste en dessous, montez un peu.',
                'Tracez au crayon une ligne horizontale à cette hauteur.',
                'Faites une ligne pour la BP, une pour la HP.'
              ] },
            { lignes: [
                'Sous la cloche, une isotherme est couchée sur votre ligne.',
                'Lisez son étiquette : c’est la température de changement d’état.',
                'Sur la ligne BP : l’évaporation. Sur la ligne HP : la condensation.'
              ] },
            { lignes: [
                'Surchauffe = T aspiration − T évaporation.',
                'Sous-refroidissement = T condensation − T sortie condenseur.',
                'Un écart de températures s’écrit en **K**.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : BP lue 10,1 bar, HP lue 30,4 bar.',
            'BP absolue : 10,1 + 1 = **11,1 bar**.',
            'HP absolue : 30,4 + 1 = **31,4 bar**.',
            'Sur la ligne de 11,1 bar, l’isotherme sous la cloche dit 10 °C : évaporation.',
            'Sur la ligne de 31,4 bar, elle dit 50 °C : condensation.',
            'Surchauffe : 22 °C − 10 °C = **12 K**.',
            'Sous-refroidissement : 50 °C − 44 °C = **6 K**.',
            'Faites pareil avec vos relevés.'
          ]
        }
      ]
    },
    3: {
      titre: 'Placer les points 1, 2 et 3',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 3.',
            'Placez trois points sur le diagramme.',
            'Point 1 : sortie de l’évaporateur. Point 2 : refoulement. Point 3 : sortie du condenseur.',
            'Lisez l’enthalpie h de chaque point, sur l’axe du bas.',
            'L’exemple résolu de la feuille montre le geste.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-3-points.mp4', poster: '../videos-enthalpie2r/etapes/etape-3-points.jpg' }
        },
        {
          etapes: [
            { lignes: [
                'Chaque point est un croisement de deux lignes.',
                'Une ligne de pression : votre ligne BP ou HP.',
                'Une isotherme : la température relevée par la pince.'
              ] },
            { lignes: [
                'Point 1 : ligne BP et température d’aspiration.',
                'Point 2 : ligne HP et température de refoulement.',
                'Point 3 : ligne HP et température de sortie du condenseur.'
              ] },
            { lignes: [
                'Les points 1 et 2 sont à droite de la cloche, dans la vapeur.',
                'Le point 3 est à gauche de la cloche, dans le liquide.',
                'Une température absente ? Placez le point entre les deux isothermes voisines.',
                'Sur votre ligne, à droite de la cloche, chaque courbe rouge vaut 10 °C de plus que la précédente.',
                'Comptez-les depuis la cloche pour trouver la bonne.'
              ] },
            { lignes: [
                'Descendez tout droit du point jusqu’à l’axe du bas.',
                'Lisez h en kJ/kg.',
                'Quelques kJ/kg d’écart avec le voisin : c’est normal.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : BP 11,1 bar abs, HP 31,4 bar abs.',
            'Point 1 : ligne de 11,1 bar, isotherme 22 °C, entre 20 et 30 °C. Je lis h1 ≈ **532 kJ/kg**.',
            'Point 2 : ligne de 31,4 bar, isotherme 100 °C, à droite. Je lis h2 ≈ **587 kJ/kg**.',
            'Point 3 : ligne de 31,4 bar, isotherme 44 °C, dans le liquide, entre 40 et 50 °C. Je lis h3 ≈ **284 kJ/kg**.',
            'Faites pareil avec vos lignes et vos températures.'
          ]
        }
      ]
    },
    4: {
      titre: 'Placer le point 4',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 4.',
            'Placez le point 4 : l’entrée de l’évaporateur.',
            'Écrivez pourquoi il est à cet endroit.',
            'Lisez son titre x sur les isotitres.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-4-point4.mp4', poster: '../videos-enthalpie2r/etapes/etape-4-point4.jpg' }
        },
        {
          etapes: [
            { lignes: [
                'Entre le point 3 et le point 4, il y a le détendeur.',
                'Le détendeur fait chuter la pression.',
                'Il ne change pas l’enthalpie : **h4 = h3**.'
              ] },
            { lignes: [
                'Partez du point 3.',
                'Descendez tout droit, à la verticale.',
                'Arrêtez-vous sur votre ligne BP : c’est le point 4.'
              ] },
            { lignes: [
                'Le point 4 est sous la cloche : liquide et vapeur mélangés.',
                'Les lignes bleues en pointillés sont les isotitres, de 0,1 à 0,9.',
                'Le titre x est la part de vapeur. x = 0,3 : 30 % de vapeur.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : h3 ≈ 284 kJ/kg, BP 11,1 bar abs.',
            'Je descends tout droit depuis le point 3, sur h = 284.',
            'Je m’arrête sur la ligne de 11,1 bar : point 4, h4 = **284 kJ/kg**.',
            'Il tombe entre les isotitres 0,2 et 0,3, tout près de 0,2.',
            'Écrivez le pourquoi avec vos mots : le rappel de la feuille vous aide.',
            'Faites pareil depuis votre point 3.'
          ]
        }
      ]
    },
    5: {
      titre: 'Tracer le cycle',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 5.',
            'Au stylo bleu, reliez 4, 1, 2, 3, puis revenez à 4.',
            'Au stylo vert, suivez l’isentrope depuis le point 1 jusqu’à la ligne HP.',
            'Lisez la température à l’arrivée et comparez au refoulement mesuré.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-5-trace.mp4', poster: '../videos-enthalpie2r/etapes/etape-5-trace.jpg' }
        },
        {
          etapes: [
            { lignes: [
                'Chaque trait du cycle est un organe.',
                '4 → 1 : l’évaporateur, sur la ligne BP.',
                '1 → 2 : le compresseur, il monte vers la HP.',
                '2 → 3 : le condenseur, sur la ligne HP.',
                '3 → 4 : le détendeur, tout droit vers le bas.'
              ] },
            { lignes: [
                'L’isentrope est la compression idéale, sans frottement.',
                'Ce sont les lignes vertes, très pentues, dans la vapeur.',
                'Prenez la ligne verte la plus proche du point 1.',
                'Suivez-la vers le haut jusqu’à votre ligne HP.'
              ] },
            { lignes: [
                'Au bout du trait vert, lisez l’isotherme qui passe là.',
                'Sans palier ? Son étiquette est écrite en haut du diagramme.',
                'Ou comptez depuis la cloche : chaque courbe rouge vaut 10 °C de plus.',
                'Le vrai compresseur refoule plus chaud que ce point.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : l’autre jour.',
            'Je relie 4, 1, 2, 3, 4 au stylo bleu : le cycle est fermé.',
            'Depuis le point 1, je suis l’isentrope au stylo vert jusqu’à 31,4 bar.',
            'J’arrive entre les isothermes 90 et 100 °C, vers **92 °C**.',
            'Le refoulement mesuré est **100 °C** : le vrai compresseur chauffe plus.',
            'Faites pareil sur votre diagramme.'
          ]
        }
      ]
    },
    6: {
      titre: 'Les calculs',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 6.',
            'Calculez les trois écarts d’enthalpie Δh.',
            'Calculez le COP froid, le COP chaud et le taux de compression.',
            'Les formules sont écrites sur la feuille, partie 6.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-6-calculs.mp4', poster: '../videos-enthalpie2r/etapes/etape-6-calculs.jpg' }
        },
        {
          etapes: [
            { lignes: [
                'Δh se lit « delta h » : un écart d’enthalpie.',
                'C’est l’énergie gagnée ou perdue par 1 kg de fluide.',
                'Prenez toujours le plus grand h moins le plus petit.'
              ] },
            { lignes: [
                'Évaporateur : h1 − h4. La chaleur prise dans la pièce.',
                'Compresseur : h2 − h1. L’énergie donnée par le moteur.',
                'Condenseur : h2 − h3. La chaleur rejetée dehors.'
              ] },
            { lignes: [
                'Le COP compare ce qu’on obtient à ce qu’on paie.',
                'COP froid = Δh évaporateur ÷ Δh compresseur.',
                'COP chaud = Δh condenseur ÷ Δh compresseur.',
                'Taux de compression = HP absolue ÷ BP absolue.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : h1 = 532, h2 = 587, h3 = h4 = 284 kJ/kg.',
            'Évaporateur : 532 − 284 = **248 kJ/kg**.',
            'Compresseur : 587 − 532 = **55 kJ/kg**.',
            'Condenseur : 587 − 284 = **303 kJ/kg**.',
            'COP froid : 248 ÷ 55 ≈ **4,5**.',
            'COP chaud : 303 ÷ 55 ≈ **5,5**.',
            'Taux de compression : 31,4 ÷ 11,1 ≈ **2,8**, avec les pressions absolues.',
            'Faites pareil avec vos h.'
          ]
        }
      ]
    },
    7: {
      titre: 'Le débit et les puissances',
      paliers: [
        {
          lignes: [
            'Regardez la vidéo de l’étape 7.',
            'Le climatiseur produit 3,5 kW de froid.',
            'Calculez le débit massique qm, en kg/s puis en kg/h.',
            'Calculez la puissance au compresseur et au condenseur.'
          ],
          video: { src: '../videos-enthalpie2r/etapes/etape-7-debit.mp4', poster: '../videos-enthalpie2r/etapes/etape-7-debit.jpg' }
        },
        {
          etapes: [
            { lignes: [
                '1 kW = 1 kJ par seconde.',
                'Chaque kilo de fluide prend Δh évaporateur dans la pièce.',
                'Pour faire 3,5 kW, il faut assez de kilos par seconde.'
              ] },
            { lignes: [
                'qm = puissance de froid ÷ Δh évaporateur.',
                'Le résultat est en **kg/s**. Gardez quatre chiffres après la virgule.',
                'Multipliez par 3 600 pour avoir des kg/h.'
              ] },
            { lignes: [
                'Puissance au compresseur = qm × Δh compresseur.',
                'Puissance au condenseur = qm × Δh condenseur.',
                'Vérifiez : condenseur = froid + compresseur, à quelques centièmes près.'
              ] }
          ]
        },
        {
          lignes: [
            'Exemple : 2,8 kW de froid, Δh évaporateur = 248 kJ/kg.',
            'qm = 2,8 ÷ 248 ≈ **0,0113 kg/s**. Je garde quatre chiffres après la virgule.',
            '0,0113 × 3 600 ≈ **41 kg/h**.',
            'Compresseur : 0,0113 × 55 ≈ **0,62 kW**.',
            'Condenseur : 0,0113 × 303 ≈ **3,42 kW**.',
            'Vérification : 2,8 + 0,62 = 3,42 kW.',
            'Faites pareil avec 3,5 kW et vos Δh.'
          ]
        }
      ]
    }
  }
});
