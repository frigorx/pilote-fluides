/* =====================================================================
   reel-symbole.js — « Le vrai et le symbole » : les paires élément réel ↔ symbole
   ---------------------------------------------------------------------
   RÔLE : la liste des paires jouées en Memory (thèmes vrai-symbole-elec et
   vrai-symbole-froid) et l'inventaire des fichiers à copier depuis la
   bibliothèque curée d'inerWeb (outils/copier-bibliotheque.mjs lit ce
   fichier). Aucun dessin nouveau : tout vient de
     C:/git/usine-contenu/bibliotheque-symboles/svg/<famille>/<id>.svg
   (bibliothèque v2.0, F. Henninot — 348 symboles, versions « --sans-reperes »
   quand elles existent) et, pour le froid, des vues isolées déjà servies par
   le Tome 3 (../packs/fluides/res/tome-3-technologie-organes/images-organes/).
   FORMAT : { reel: { lib: "famille/id" } | { src: "chemin" }, sym: { lib: "famille/id" },
              nom: "…" }  — `nom` est le nom affiché en fin de partie et lu par le
   lecteur d'écran ; les deux faces sont des images.
   PIÈGE : deux paires ne doivent jamais partager le même symbole (le joueur
   ne pourrait pas les distinguer) — le condenseur et l'évaporateur à air ont
   le même symbole, on ne garde donc que le condenseur.
   ===================================================================== */
window.JR_REEL_SYMBOLE = {
  elec: [
    { nom: "Contacteur", reel: { lib: "reel_contacteur/contacteur_lc1d" }, sym: { lib: "contacts/contact_puissance_3p_no" } },
    { nom: "Bloc de contacts auxiliaires", reel: { lib: "reel_contacteur/bloc_aux_ladn22" }, sym: { lib: "contacts/contact_no_13_14" } },
    { nom: "Relais thermique", reel: { lib: "reel_contacteur/relais_thermique_lrd" }, sym: { lib: "protections/relais_thermique" } },
    { nom: "Disjoncteur magnéto-thermique", reel: { lib: "reel_divers/disjoncteur_generique" }, sym: { lib: "protections/disjoncteur_magneto_therm_2p" } },
    { nom: "Disjoncteur moteur", reel: { lib: "reel_protection/gv2me" }, sym: { lib: "protections/disjoncteur_moteur_gv2" } },
    { nom: "Interrupteur différentiel", reel: { lib: "reel_protection/differentiel_generique" }, sym: { lib: "protections/differentiel_2p" } },
    { nom: "Sectionneur porte-fusibles", reel: { lib: "reel_protection/sectionneur_porte_fus" }, sym: { lib: "protections/sectionneur_3_fusibles" } },
    { nom: "Coupe-circuit à fusible", reel: { lib: "reel_legrand/coupe_circuit_1p" }, sym: { lib: "fusibles/fusible_1p" } },
    { nom: "Bouton-poussoir marche", reel: { lib: "reel_commande/bp_vert__reel_" }, sym: { lib: "commande/bp_no_marche" } },
    { nom: "Bouton-poussoir arrêt", reel: { lib: "reel_commande/bp_rouge__reel_" }, sym: { lib: "commande/bp_nf_arret" } },
    { nom: "Arrêt d'urgence", reel: { lib: "reel_commande/au_coup_de_poing" }, sym: { lib: "commande/arret_urgence" } },
    { nom: "Sélecteur à deux positions", reel: { lib: "reel_commande/selecteur__reel_" }, sym: { lib: "commande/selecteur_2_positions" } },
    { nom: "Voyant", reel: { lib: "reel_signalisation/voyant_vert__reel_" }, sym: { lib: "recepteurs/voyant_lumineux" } },
    { nom: "Relais", reel: { lib: "reel_finder/relais_finder_serie_60" }, sym: { lib: "contacts/contact_relais_no" } },
    { nom: "Bloc temporisé au travail", reel: { lib: "reel_contacteur/bloc_tempo_travail" }, sym: { lib: "bobines/contact_no_temporise_travail" } },
    { nom: "Transformateur", reel: { lib: "reel_divers/transformateur" }, sym: { lib: "transformateurs/transfo_monophase" } },
    { nom: "Borne de terre", reel: { lib: "reel_divers/borne_terre" }, sym: { lib: "sources/terre" } },
    { nom: "Télérupteur", reel: { lib: "reel_legrand/telerupteur_legrand_auto" }, sym: { lib: "bobines/telerupteur" } }
  ],
  froid: [
    { nom: "Compresseur", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/compresseurs.webp" }, sym: { lib: "frigo_schema/compresseur_general" } },
    { nom: "Condenseur à air", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/condenseur-air.webp" }, sym: { lib: "frigo_schema/echangeur_a_air" } },
    { nom: "Détendeur thermostatique", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/detendeur-thermostatique.webp" }, sym: { lib: "frigo_schema/detendeur_thermo_int" } },
    { nom: "Détendeur électronique", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/detendeur-electronique.webp" }, sym: { lib: "frigo_schema/detendeur_electronique" } },
    { nom: "Tube capillaire", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/tube-capillaire.webp" }, sym: { lib: "frigo_schema/tube_capillaire" } },
    { nom: "Filtre déshydrateur", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/filtre-deshydrateur.webp" }, sym: { lib: "frigo_schema/filtre_deshydrateur" } },
    { nom: "Voyant liquide", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/voyant-liquide.webp" }, sym: { lib: "frigo_schema/voyant_liquide" } },
    { nom: "Électrovanne", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/electrovanne.webp" }, sym: { lib: "frigo_schema/electrovanne_frigo" } },
    { nom: "Pressostat", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/pressostats.webp" }, sym: { lib: "capteurs_froid/pressostat" } },
    { nom: "Sonde de température", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/sonde-temperature.webp" }, sym: { lib: "capteurs_froid/sonde_temperature" } },
    { nom: "Réservoir de liquide", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/reservoir-liquide.webp" }, sym: { lib: "frigo_schema/bouteille_liquide" } },
    { nom: "Séparateur d'huile", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/separateur-huile.webp" }, sym: { lib: "frigo_schema/separateur_huile" } },
    { nom: "Échangeur à plaques", reel: { src: "../packs/fluides/res/tome-3-technologie-organes/images-organes/echangeur-plaques.webp" }, sym: { lib: "frigo_schema/echangeur_a_plaques" } }
  ]
};
