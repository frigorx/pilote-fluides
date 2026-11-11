# -*- coding: utf-8 -*-
"""Extraits offerts des livrets d'habilitation (décision de Franck, 11/11/2026).

Le site ne porte plus le livret complet de HoCourant ni celui du travail en hauteur (R408) :
seulement un extrait (couverture, une page « Extrait offert », le mode d'emploi, le sommaire,
le premier chapitre). Le livret complet se demande depuis livres/.

    python build/extrait-livrets.py

Lit le livret complet dans son atelier (D:/git/hocourant, D:/git/inerweb-r408) et écrit l'extrait
dans le site et dans l'atelier (dossier livret/), pour que la livraison suivante le retrouve.
À relancer quand un tirage change.
"""
import os
import re
import sys
import fitz

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLEU = (0x1b / 255, 0x3a / 255, 0x63 / 255)
ORANGE = (0xc9 / 255, 0x45 / 255, 0x1a / 255)
TITRE = "C:/Windows/Fonts/trebucbd.ttf"
TEXTE = "C:/Windows/Fonts/calibri.ttf"
GRAS = "C:/Windows/Fonts/calibrib.ttf"

LIVRETS = [
    {
        "source": "D:/git/hocourant/livret/inerWeb.fr-HoCourant-Livret-eleve-A5.pdf",
        "sorties": ["hocourant/livret/inerWeb.fr-HoCourant-Livret-extrait.pdf",
                    "D:/git/hocourant/livret/inerWeb.fr-HoCourant-Livret-extrait.pdf"],
        # pages du livret, numérotées à partir de 1 : couverture à « Mon point de départ », chapitre 1, dos
        "pages": list(range(1, 19)) + [124],
        "nom": "du livret HoCourant",
        "contenu": "Vous y trouvez la couverture, le mode d'emploi, le sommaire et le chapitre 1 en entier, avec son évaluation.",
        "complet": "Le livret complet compte 124 pages : dix chapitres, leurs évaluations, le bilan et le lexique.",
    },
    {
        "source": "D:/git/inerweb-r408/livret/inerWeb.fr-R408-Livret-eleve-A5.pdf",
        "sorties": ["r408/livret/inerWeb.fr-R408-Livret-extrait.pdf",
                    "D:/git/inerweb-r408/livret/inerWeb.fr-R408-Livret-extrait.pdf"],
        # couverture, mode d'emploi, référentiel, paliers et modules, puis le module M1
        "pages": list(range(1, 17)),
        "nom": "du livret Travail en hauteur (R408)",
        "contenu": "Vous y trouvez la couverture, le mode d'emploi, le programme des modules et le module 1 en entier, avec son évaluation.",
        "complet": "Le livret complet compte 122 pages : onze modules en quatre paliers, leurs évaluations et les tests de fin de palier.",
    },
]


def page_extrait(doc, rect, livret):
    """Insère en page 2 la page « Extrait offert », corps 14 pt au moins."""
    note = fitz.open()                             # page composée à part : ses polices seules sont réduites
    p = note.new_page(width=rect.width, height=rect.height)
    larg = rect.width
    p.draw_rect(fitz.Rect(0, 0, larg, 96), color=None, fill=BLEU)
    p.insert_textbox(fitz.Rect(32, 30, larg - 32, 90), "Extrait offert", fontsize=28,
                     fontname="titre", fontfile=TITRE, color=(1, 1, 1))
    y = 128
    for texte, police, fichier, couleur in [
        ("Ce PDF est un extrait " + livret["nom"] + ", tel qu'il est imprimé.", "texte", TEXTE, (0.06, 0.14, 0.24)),
        (livret["contenu"], "texte", TEXTE, (0.06, 0.14, 0.24)),
        (livret["complet"], "texte", TEXTE, (0.06, 0.14, 0.24)),
        ("Pour recevoir le livret complet, faites la demande sur :", "gras", GRAS, BLEU),
    ]:
        boite = fitz.Rect(32, y, larg - 32, y + 110)
        reste = p.insert_textbox(boite, texte, fontsize=15, fontname=police, fontfile=fichier,
                                 color=couleur, lineheight=1.35)
        if reste < 0:
            sys.exit("Texte trop long pour la page « Extrait offert » : " + texte)
        y += (110 - reste) + 16
    lien = fitz.Rect(32, y - 6, larg - 32, y + 26)
    p.insert_textbox(lien, "inerweb.fr/livres", fontsize=20, fontname="titre", fontfile=TITRE, color=ORANGE)
    p.insert_textbox(fitz.Rect(32, rect.height - 54, larg - 32, rect.height - 24), "© inerWeb, F. Henninot",
                     fontsize=14, fontname="texte", fontfile=TEXTE, color=(0.35, 0.42, 0.49))
    note.subset_fonts()                            # jamais sur le livret : ses titres y perdent des lettres
    doc.insert_pdf(note, start_at=1)
    doc[1].insert_link({"kind": fitz.LINK_URI, "from": lien, "uri": "https://inerweb.fr/livres/#habilitations"})


def alleger(doc):
    """Les pages du livret partagent un même dictionnaire de ressources : sans cela, l'extrait
    emporterait toutes les images du livret complet. On retire celles qu'aucune page gardée n'affiche."""
    affichees = {im["xref"] for page in doc for im in page.get_image_info(xrefs=True)}
    vus = set()
    for page in doc:
        genre, valeur = doc.xref_get_key(page.xref, "Resources")
        if genre != "xref":
            continue
        res = int(valeur.split()[0])
        if res in vus:
            continue
        vus.add(res)
        genre, valeur = doc.xref_get_key(res, "XObject")
        cible = res
        if genre == "xref":
            cible = int(valeur.split()[0])
            valeur = doc.xref_object(cible)
        elif genre != "dict":
            continue
        for nom, x in re.findall(r"/([^\s/<>\[\]()]+)\s+(\d+)\s+0\s+R", valeur):
            x = int(x)
            if doc.xref_get_key(x, "Subtype")[1] == "/Image" and x not in affichees:
                doc.xref_set_key(cible, nom if cible != res else "XObject/" + nom, "null")


for livret in LIVRETS:
    out = fitz.open(livret["source"])
    out.select([n - 1 for n in livret["pages"]])   # garde ces pages seulement, sans recopier les ressources
    alleger(out)
    page_extrait(out, out[0].rect, livret)
    for sortie in livret["sorties"]:
        chemin = sortie if os.path.isabs(sortie) else os.path.join(SITE, sortie)
        out.save(chemin, garbage=4, deflate=True)
        print(len(out), "pages,", round(os.path.getsize(chemin) / 1e6, 1), "Mo :", chemin)
