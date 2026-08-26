/* =====================================================================
   produits.mjs — la table des produits d'inerWeb, source unique
   ---------------------------------------------------------------------
   Un PRODUIT est l'unité d'accès : un coffre, un jeu de clés, un code.
   Décision de F. Henninot du 26/08/2026 : « trois logiciels, trois codes ;
   le jour où j'en mets un quatrième, j'ai un quatrième code. » Obtenir un
   code ne donne PAS accès à inerWeb — il donne accès à UN produit.

   Ajouter un produit = ajouter une ligne ici. Rien d'autre à modifier :
   tous les outils lisent cette table.

   🔴 L'INDICE EST GRAVÉ DANS LES CODES DÉJÀ ÉMIS.
      Ne jamais réordonner la table. Ne jamais réutiliser l'indice d'un
      produit retiré. Un produit qui disparaît garde son indice, marqué
      `retire: true` — sinon les codes de l'an passé désigneraient le
      mauvais coffre.

   Voir `.planning/2026-08-26-acces-enseignant/SPEC-ACCES-ENSEIGNANT.md`.
   ===================================================================== */

export const PRODUITS = [
  {
    indice: 0,
    id: "habilitation",
    nom: "Habilitation fluides frigorigènes",
    coffre: "docs/coffre",
    espace: "documents.html · formateur.html · projection.html · matrice.html · dossier.html · relecture.html",
  },
  {
    indice: 1,
    id: "aquiblue",
    nom: "inerWeb AquiBlue",
    coffre: "aquiblue/coffre",
    espace: "aquiblue/espace-prof.html",
  },
  {
    indice: 2,
    id: "legislation",
    nom: "Réseau Législation",
    coffre: "legislation/coffre",
    espace: null, // espace enseignant à créer
  },
  {
    indice: 3,
    id: "hydrometro",
    nom: "HydroMétro",
    coffre: "hydrometro/coffre",
    espace: null, // espace enseignant à créer
  },
  {
    indice: 4,
    id: "hocourant",
    nom: "inerWeb HoCourant",
    coffre: "hocourant/coffre",
    espace: null, // espace enseignant à créer
  },
];

/* --------------------------------------------------------------------
   Lecture — les deux seuls accès autorisés à la table.
   Défaut-refus : un identifiant ou un indice inconnu lève, il ne renvoie
   jamais un produit « par défaut ».
   -------------------------------------------------------------------- */

export function produitParId(id) {
  const p = PRODUITS.find((x) => x.id === id && !x.retire);
  if (!p) {
    throw new Error(
      `produit inconnu : « ${id} » — connus : ${PRODUITS.filter((x) => !x.retire).map((x) => x.id).join(", ")}`
    );
  }
  return p;
}

export function produitParIndice(indice) {
  const p = PRODUITS.find((x) => x.indice === indice);
  if (!p) throw new Error(`indice de produit inconnu : ${indice}`);
  return p;
}
