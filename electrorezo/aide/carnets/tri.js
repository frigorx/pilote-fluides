/* Carnet d'aide « tri » : TD d'AP « Revoir le triphasé » (03/11/2026).
   Papier : C:\git\progression-2a-cap-ifca\Documents\AP-Revoir-le-triphase\
   Carte d'identité : 2e année CAP IFCA ; prérequis travaillés : TP 03-E (05/10), cours 05-E (15/10) ;
   codes C2.1 (choisir le couplage), C3.7 (trouver un fil mal serré) ; notion nouvelle : non ;
   support principal : la feuille, la station au bon onglet, cette aide pour le geste de chaque exercice.
   Exercices 1 à 4 (le 3 est le pilote, passé en P1 le 03/11). Images : captures 2D des stations 2.3, 2.5, 6.4
   et un découpage de la feuille 4 (aide/images/tri/). */
AIDE.carnet({
  id: 'tri',
  titre: 'Revoir le triphasé',
  classe: '2e année CAP IFCA',
  exercices: {
    1: {
      titre: 'Les six mesures',
      station: { id: '2.3', dossier: '2-3-triphase', temps: 3 },
      paliers: [
        {
          texte: 'L’exercice a deux parties. Sur la station 2.3, vous touchez « Réseau en bon état ». ' +
            'Vous recopiez les six mesures dans le tableau : trois entre deux phases, trois entre une phase ' +
            'et le neutre. Ensuite, sur la feuille, une autre armoire : vous entourez les trois mesures ' +
            'qui sortent du lot, puis vous écrivez le fil mal serré.',
          image: { src: 'images/tri/23-bon-etat.png',
            alt: 'Station 2.3, onglet 3 : les six mesures d’un réseau en bon état' }
        },
        {
          etapes: [
            { texte: 'Un réseau en bon état donne deux valeurs : **400 V** entre deux phases, **230 V** entre ' +
                'une phase et le neutre, à quelques volts près.' },
            { texte: 'Sur la station, touchez « L2 mal serrée » : trois mesures passent en rouge, trop basses. ' +
                'Les trois ont le même fil en commun : L2.',
              image: { src: 'images/tri/23-L2-mal-serree.png',
                alt: 'L2 mal serrée : L1–L2, L2–L3 et L2–N en rouge' } },
            { texte: 'Pour l’autre armoire : entre deux phases, je compare à 400 V ; entre une phase et ' +
                'le neutre, je compare à 230 V. J’entoure les mesures loin de ces valeurs. ' +
                'Je cherche le fil écrit dans les trois. C’est lui, le fil mal serré.' }
          ]
        },
        {
          texte: 'Exemple, sur la station : bouton « L2 mal serrée ». Entre deux phases, j’attends 400 V : ' +
            'L1–L2 332 et L2–L3 332 sont trop basses, L1–L3 398 est bonne. Entre une phase et le neutre, ' +
            'j’attends 230 V : L2–N 150 est trop basse. Les trois mesures trop basses ont L2 en commun. ' +
            'C’est lui, le fil mal serré. Sur votre feuille, faites la même chose avec l’autre armoire.',
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
          texte: 'Sur la station 2.5, vous faites glisser le curseur « La tension simple ». Vous choisissez ' +
            'deux valeurs autres que 230. Pour chacune, vous recopiez la tension simple et la tension composée. ' +
            'Vous divisez la composée par la simple, avec deux chiffres après la virgule. ' +
            'Enfin, vous calculez 127 × 1,73 et vous écrivez le résultat de la calculatrice.',
          image: { src: 'images/tri/25-simple-230.png',
            alt: 'Station 2.5, onglet 3 : tension simple 230 V, tension composée 398 V, et le curseur' }
        },
        {
          etapes: [
            { texte: 'La tension simple se mesure entre une phase et le neutre. La composée, entre deux phases. ' +
                'Quand vous bougez le curseur, la station calcule la composée.' },
            { texte: 'Colonne de droite : je divise la composée par la simple. À la calculatrice, ' +
                '398 ÷ 230 = 1,7304… J’arrondis à deux chiffres après la virgule : **1,73**. ' +
                'Avec d’autres positions, je trouve aussi 1,73, ou tout près.',
              image: { src: 'images/tri/25-simple-230.png',
                alt: 'Tension simple 230 V, multipliée par 1,73 : tension composée 398 V' } },
            { texte: 'Le dernier calcul se fait dans l’autre sens : je multiplie la simple par 1,73.' }
          ]
        },
        {
          texte: 'Exemple : je pose le curseur sur 200 V. La station affiche 346 V. Je divise : 346 ÷ 200 = 1,73. ' +
            'J’écris 200, 346, 1,73. À votre tour : deux positions autres que 230, une par ligne du tableau.',
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
          texte: 'L’exercice a deux parties. Sur la station 6.4, vous touchez « Étoile ». ' +
            'Vous recopiez la case « Tension reçue » dans la colonne « Il reçoit ». L’écran dit « Couplage correct » : ' +
            'vous cochez « correct ». Il dit « Surtension » (le bobinage reçoit trop) : vous cochez « il grille ». ' +
            'Puis la même chose avec « Triangle ». Ensuite, sur la feuille, un autre moteur : vous remplissez ' +
            'les blancs dans l’ordre, puis vous tracez ses barrettes.',
          image: { src: 'images/tri/64-mission.png',
            alt: 'Station 6.4, onglet 3 : les boutons Étoile et Triangle, puis la case Tension reçue' }
        },
        {
          etapes: [
            { texte: 'La plaque du moteur donne deux tensions. La plus petite est celle que supporte un bobinage. ' +
                'Plaque 230 / 400 V : un bobinage supporte **230 V**.' },
            { texte: 'Ce moteur, sur le réseau 400 V. En étoile, les barrettes relient ensemble les trois bornes du bas : ' +
                'W2, U2, V2. Chaque bobinage reçoit 400 ÷ 1,73 (racine de trois) = 231 V. C’est sa tension : ' +
                'le couplage est correct.',
              image: { src: 'images/tri/64-barrettes-etoile.png',
                alt: 'Couplage étoile : W2, U2 et V2 reliés, 231 V sur un bobinage' } },
            { texte: 'Le même moteur en triangle : trois barrettes debout. Chaque bobinage reçoit les 400 V entre deux fils. ' +
                'C’est trop pour un bobinage de 230 V : il grille.',
              image: { src: 'images/tri/64-barrettes-triangle.png',
                alt: 'Couplage triangle : trois barrettes debout, 400 V sur un bobinage' } },
            { texte: 'Pour l’autre moteur, je cherche 400 V sur sa plaque. Le signe juste avant donne le couplage : ' +
                'Y pour étoile, Δ pour triangle.' }
          ]
        },
        {
          texte: 'Exemple : un atelier ancien, avec 230 V entre deux fils. La plaque porte Δ 230 V, Y 400 V. ' +
            'Je cherche 230 V : juste avant, Δ. Je pose le triangle. Chaque bobinage reçoit les 230 V du réseau, ' +
            'sa tension : la station dit « Couplage correct ». Sur votre feuille, le réseau est en 400 V : ' +
            'pour chaque moteur, je cherche 400 V sur sa plaque, puis je lis le signe juste avant.',
          image: { src: 'images/tri/64-exemple-230-triangle.png',
            alt: 'Réseau 230 V, plaque 230 / 400 V, triangle : couplage correct' }
        }
      ]
    },
    4: {
      titre: 'Seul, sans la station',
      paliers: [
        {
          texte: 'Trois questions, sans la station. a. Une autre armoire : vous trouvez le fil mal serré, et vous ' +
            'dites pourquoi. b. Une tension simple de 400 V : vous calculez la composée, et vous écrivez votre ' +
            'calcul. c. Trois moteurs sur un réseau 400 V : vous écrivez le couplage de chacun, puis vous dites ' +
            'pourquoi le ventilateur ne prend pas l’autre couplage.',
          image: { src: 'images/tri/feuille-exercice-4.png',
            alt: 'L’exercice 4 de la feuille : questions a, b et c' }
        },
        {
          etapes: [
            { texte: 'a. La méthode de l’exercice 1. J’entoure les mesures loin de 400 V et de 230 V. ' +
                'Le fil écrit dans les trois est le fil mal serré. Pour dire pourquoi, je nomme les trois ' +
                'mesures trop basses : elles ont toutes ce fil en commun.',
              image: { src: 'images/tri/23-L2-mal-serree.png',
                alt: 'Rappel de l’exercice 1 : trois mesures en rouge, toutes passent par le même fil' } },
            { texte: 'b. La méthode de l’exercice 2 : composée = simple × 1,73.',
              image: { src: 'images/tri/25-simple-230.png',
                alt: 'Rappel de l’exercice 2 : tension simple multipliée par 1,73' } },
            { texte: 'c. La méthode de l’exercice 3. Réseau 400 V : je cherche 400 V sur la plaque. Le signe ' +
                'juste avant donne le couplage : Y étoile, Δ triangle. Sur une plaque, les deux tensions ' +
                'ne sont pas toujours dans le même ordre.' },
            { texte: 'Pour l’autre couplage du ventilateur : comme pour l’autre moteur de l’exercice 3, ' +
                'je calcule ce que reçoit un bobinage, et je le compare à ce qu’il supporte.' }
          ]
        },
        {
          etapes: [
            { texte: 'Exemple a. L1–N 230, L2–N 100, L3–N 231, L1–L2 293, L2–L3 294, L1–L3 400. Loin du lot : ' +
                'L2–N, L1–L2, L2–L3. Fil mal serré : L2, parce que les trois mesures basses passent par L2.' },
            { texte: 'Exemple b. Simple 100 V. Composée = 100 × 1,73 = 173 V.' },
            { texte: 'Exemple c. Un atelier ancien, réseau 230 V. Plaque Δ 230 V · Y 400 V. Je cherche 230 V : ' +
                'juste avant, Δ. Triangle. Pourquoi pas l’étoile : le bobinage recevrait 230 ÷ 1,73 = 133 V, ' +
                'trop peu pour un bobinage de 230 V. Sur votre feuille, le réseau est en 400 V : ' +
                'je cherche 400 V sur chaque plaque.',
              image: { src: 'images/tri/64-exemple-230-triangle.png',
                alt: 'Réseau 230 V, plaque 230 / 400 V, triangle : couplage correct' } }
          ]
        }
      ]
    }
  }
});
