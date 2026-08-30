/* ÉlectroRézo 5.3 — textes POUR L'OREILLE, registre « professeur particulier ».
   Voir DOCTRINE-VOIX-PROF-PRIVE.md. Écrits directement dans ce registre.
   Non validés, aucun MP3 fabriqué. */
const NARRATION = {

  decouvrir: `Nous arrivons à la station qui explique la chose que personne ne comprend du premier coup :
pourquoi une machine continue de tourner après qu'on a lâché le bouton.
Et la réponse tient dans un tout petit contact, monté sur le contacteur, qui ne porte aucune
puissance. On l'appelle le contact auxiliaire.
Il ne sert pas à alimenter quoi que ce soit. Il sert à dire une chose : le contacteur est collé.
Vous allez voir ce qu'on peut faire avec une information aussi simple.`,

  comprendre: `D'abord, où il est. Il est sur le même porte-contacts que les contacts de puissance. Donc
quand la bobine colle, il bascule au même instant. Pas une fraction de seconde après : au même
instant, parce que c'est la même pièce qui bouge.
Maintenant, le montage. Suivez-moi bien, c'est le cœur de la ligne.
Vous avez un bouton de marche. Vous appuyez : le courant passe, la bobine colle. Vous relâchez :
le courant ne passe plus, la bobine retombe. Le moteur tourne tant que votre doigt est dessus.
Personne ne travaille comme ça.
Alors on ajoute une seule chose. On prend le contact auxiliaire ouvert du contacteur, celui qui
porte les repères treize et quatorze, et on le câble en parallèle sur le bouton de marche.
Regardez ce qui se passe maintenant, temps par temps.
Vous appuyez. Le courant passe par le bouton, la bobine colle. Et au même instant, le contact
treize quatorze se ferme.
Vous relâchez. Le bouton se rouvre. Mais le courant a désormais un deuxième chemin : il passe
par le contact treize quatorze. La bobine reste alimentée.
La bobine s'alimente à travers son propre contact. Elle se tient elle-même. C'est pour cela
qu'on appelle ça l'auto-maintien.
Et pour arrêter ? Il faut couper la boucle. C'est le rôle du bouton d'arrêt, qui est en série et
normalement fermé. On appuie, la boucle est coupée, la bobine retombe, le contact treize
quatorze s'ouvre, et plus rien ne se maintient.
Cette figure, vous allez la retrouver toute votre vie professionnelle. Elle est dans presque
toutes les armoires du monde.`,

  manipuler: `Les trois questions, pour un contact qui ne porte rien.
Et pourtant, regardez la scène juste au-dessus : sans lui, aucun circuit de commande ne
tiendrait.`,

  representer: `Sur un plan, le contact auxiliaire porte le même repère que la bobine qui le commande. KM un
sous la bobine, KM un sous le contact.
Le lien n'est presque jamais dessiné. Il est écrit — exactement ce que vous avez appris à la
station huit point neuf.
Alors voici ce que je vous demande de faire, désormais, chaque fois que vous ouvrez un schéma de
commande. Cherchez un contact placé en parallèle sur le bouton de marche.
Si vous le trouvez, vous savez sans rien demander à personne que ce circuit se maintient tout
seul. Et vous savez aussi qu'il y a forcément, quelque part en série, quelque chose pour couper
la boucle.`
};
