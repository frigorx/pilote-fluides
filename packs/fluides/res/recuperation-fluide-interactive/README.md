# TP interactif - Récupération du fluide

Prototype inerWeb hors ligne consacré à l'enchaînement complet d'une récupération avec :

- manifold 4 voies ;
- station Minimax-E et ses trois sélecteurs bleu, noir et rouge ;
- pompe à vide, vacuomètre, bouteille de transfert et balance ;
- installation frigorifique centrée sur le groupe de condensation complet, avec trois vannes de service réellement positionnées : refoulement, départ liquide et aspiration ; l'évaporateur et le détendeur de la bibliothèque inerWeb/QElectroTech restent visibles en circuit secondaire réduit ;
- mode guidé puis mode autonome ;
- feuille de guidance présente à chaque geste guidé : « Regardez → Faites → Vérifiez », suivie d'une explication courte du pourquoi ;
- contrôles d'observation explicités sans demander à l'élève de deviner : bouteille, positions initiales, manifold, flexibles, stabilité, pesées, vide et rangement ;
- raccordement, contrôle et ouverture des prises de service, récupération liquide puis vapeur, auto-purge, pesée et tirage au vide final ;
- cinq mini-vannes dessinées côté appareil, avec ouverture et fermeture intégrées à l'ordre opératoire ;
- commandes actionnées directement sur les appareils du schéma : les panneaux inférieurs ne sont que des témoins d'état ;
- vues zoomées automatiquement sur le groupe, le manifold, la station, la pompe ou la bouteille selon le geste demandé ; pendant un raccordement, les deux appareils concernés restent dans le même cadre ;
- aide contextuelle « Aidez-moi » : la réponse courte indique le bouton ou les deux points à sélectionner et les entoure avec le repère « ICI » ;
- commandes observables dans quatre onglets témoins : flexibles, manifold, station et bouteille/vide ; une seule famille reste visible à la fois ;
- appareils SVG originaux redessinés pour mieux reconnaître le manifold, la façade Minimax-E, la pompe, le vacuomètre, la bouteille et la balance.
- circuit de l'installation composé à partir des éléments de la bibliothèque métier, sans redessiner librement les organes.
- première discrimination métier : reconnaître BP et HP sans que ces réponses soient écrites sur le groupe ; le départ liquide est retenu pour ce scénario de récupération, tandis que le refoulement est expliqué comme un autre point HP possible.

Le premier écran fait aussi choisir le mode d'intervention selon l'emplacement du composant : transfert interne lorsqu'une partie du circuit peut être isolée, ou récupération totale dans une bouteille externe. La mission simulée retient la récupération totale.

Le module est un brouillon métier. Il n'est ni relié au portail, ni indexé dans le RAG tant que F. Henninot n'a pas donné son bon à tirer.

## Lancer

Ouvrir `index.html` dans un navigateur récent. Aucune connexion réseau n'est requise.

## Principes de prudence

- aucune valeur universelle de vide, de durée ou de charge maximale n'est inventée ;
- la cible de vide et les limites du cylindre restent celles des notices et du plateau ;
- pour la pratique de ce plateau, la sortie station est raccordée au robinet VAPEUR du cylindre et le robinet LIQUIDE reste fermé, afin de limiter le fluide résiduel au débranchement ;
- le vacuomètre contrôle le vide poussé : les aiguilles du manifold ne le remplacent pas ;
- les opérations réelles restent réservées à une personne formée, avec EPI et matériel compatible.
- un circuit ouvert est protégé immédiatement par bouchonnage afin d'éviter tout rejet de fluide et toute entrée d'humidité.

## Sources de conception

Voir `SOURCES.md` et `SOURCES-IMAGES.md`. Les visuels du manuel Minimax-E, des diaporamas AFPA, des vidéos transmises et du schéma des sélecteurs servent uniquement de références documentaires. Les appareils du poste sont des SVG originaux ; les trois organes de l'installation proviennent de la bibliothèque métier tracée dans le registre.
