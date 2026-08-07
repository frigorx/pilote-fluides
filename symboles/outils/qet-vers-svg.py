#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
qet-vers-svg.py — bibliotheque de symboles inerWeb v3

Convertit la collection d'elements QElectroTech (fichiers .elmt, XML) en
fichiers SVG autonomes, un par symbole, plus un index JSON.

  python3 qet-vers-svg.py --source <collection_qet> --sortie symboles

La collection officielle se recupere par :
  git clone --depth 1 https://github.com/qelectrotech/qelectrotech-elements

Licence des elements convertis : Creative Commons Attribution 3.0.
L'attribution est obligatoire des lors que les symboles sont diffuses
autrement que dans un schema electrique. Voir symboles/LICENCE.md.

Le coeur de conversion (formes, styles, arcs) reprend qet_to_svg.py v2 du
depot frigorx/inerweb-symboles.
"""

import argparse
import html as htmlmod
import json
import math
import os
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET

XML_LANG = "{http://www.w3.org/XML/1998/namespace}lang"

# --- nommage ----------------------------------------------------------------

def slugifier(texte):
    """« Moteur triphasé » -> « moteur-triphase »."""
    texte = unicodedata.normalize("NFKD", texte)
    texte = "".join(c for c in texte if not unicodedata.combining(c))
    texte = texte.replace("'", " ").replace("’", " ")
    texte = texte.lower()
    texte = re.sub(r"[^a-z0-9]+", "-", texte)
    return texte.strip("-")


def noms_de(racine, chemin):
    """Renvoie (nom_fr, nom_en). Le nom sans attribut lang sert de defaut."""
    fr = en = defaut = None
    bloc = racine.find("names")
    for n in (bloc if bloc is not None else racine).iter("name"):
        lang = n.get(XML_LANG) or n.get("lang")
        valeur = (n.text or "").strip()
        if not valeur:
            continue
        if lang == "fr" and fr is None:
            fr = valeur
        elif lang == "en" and en is None:
            en = valeur
        elif lang is None and defaut is None:
            defaut = valeur
    if fr is None:
        fr = defaut
    if en is None:
        en = defaut
    if fr is None:
        fr = os.path.splitext(os.path.basename(chemin))[0].replace("_", " ")
    return fr, en

# --- styles QET -------------------------------------------------------------

def parse_style(style):
    d = {}
    for part in (style or "").split(";"):
        if ":" in part:
            k, v = part.split(":", 1)
            d[k.strip()] = v.strip()
    return d


def get_stroke_width(st):
    lw = st.get("line-weight", "normal")
    if lw == "none":
        return "0"
    if lw == "thin":
        return "0.5"
    if lw == "hight":
        return "2"
    return "1"


def get_stroke_dash(st):
    ls = st.get("line-style", "normal")
    if ls == "dashed":
        return ' stroke-dasharray="4,2"'
    if ls == "dotted":
        return ' stroke-dasharray="1,2"'
    if ls == "dashdotted":
        return ' stroke-dasharray="4,2,1,2"'
    return ""


COULEURS = {
    "black": "#000", "white": "#fff", "red": "#c00", "green": "#0a0",
    "blue": "#00c", "gray": "#888", "grey": "#888", "brown": "#8b4513",
    "yellow": "#dd0", "orange": "#e80", "purple": "#808", "magenta": "#c0c",
    "cyan": "#0cc", "lightgray": "#ccc", "darkgray": "#555", "none": "none",
}


def get_fill(st):
    return COULEURS.get(st.get("filling", "none"), "none")


def get_color(st):
    return COULEURS.get(st.get("color", "black"), "#000")


def arc_to_path(x, y, width, height, start_angle, span_angle):
    cx, cy = x + width / 2, y + height / 2
    rx, ry = width / 2, height / 2
    if rx < 0.1 or ry < 0.1:
        return ""
    start_rad = math.radians(-start_angle)
    end_rad = math.radians(-(start_angle + span_angle))
    x1 = cx + rx * math.cos(start_rad)
    y1 = cy + ry * math.sin(start_rad)
    x2 = cx + rx * math.cos(end_rad)
    y2 = cy + ry * math.sin(end_rad)
    large = 1 if abs(span_angle) > 180 else 0
    sweep = 1 if span_angle < 0 else 0
    return f"M {x1:.2f} {y1:.2f} A {rx:.2f} {ry:.2f} 0 {large} {sweep} {x2:.2f} {y2:.2f}"


def nombre(el, attr, defaut=0.0):
    try:
        return float(el.get(attr, defaut))
    except (TypeError, ValueError):
        return float(defaut)


def taille_police(el, defaut, plancher, plafond):
    for p in (el.get("font", "") or "").split(","):
        try:
            v = float(p)
        except ValueError:
            continue
        if 3 <= v <= 20:
            return max(plancher, min(plafond, v))
    return defaut


def bloc_texte(x, y, fs, couleur, brut):
    """Un <text> par bloc, un <tspan> par ligne : SVG n'a pas de retour a la
    ligne automatique, un texte multiligne colle sur une seule ligne sinon."""
    lignes = [l.strip() for l in re.split(r"\r\n|\r|\n", brut) if l.strip()]
    if not lignes:
        return None, 0, 0
    interligne = fs * 1.15
    if len(lignes) == 1:
        contenu = htmlmod.escape(lignes[0])
    else:
        contenu = "".join(
            f'<tspan x="{x:g}" dy="{0 if i == 0 else interligne:.2f}">'
            f"{htmlmod.escape(l)}</tspan>"
            for i, l in enumerate(lignes))
    balise = (f'<text x="{x:g}" y="{y:.2f}" font-family="sans-serif" '
              f'font-size="{fs:g}" fill="{couleur}">{contenu}</text>')
    largeur = 0.6 * fs * max(len(l) for l in lignes)
    hauteur = interligne * (len(lignes) - 1) + fs
    return balise, largeur, hauteur

# --- conversion -------------------------------------------------------------

class Boite:
    """Boite englobante des primitives reellement dessinees."""

    def __init__(self):
        self.x1 = self.y1 = float("inf")
        self.x2 = self.y2 = float("-inf")

    def point(self, x, y):
        self.x1 = min(self.x1, x)
        self.y1 = min(self.y1, y)
        self.x2 = max(self.x2, x)
        self.y2 = max(self.y2, y)

    def rect(self, x, y, w, h):
        self.point(min(x, x + w), min(y, y + h))
        self.point(max(x, x + w), max(y, y + h))

    @property
    def vide(self):
        return self.x1 > self.x2


def convertir(chemin):
    """Renvoie (svg, infos) ou (None, motif) si l'element est inexploitable."""
    try:
        racine = ET.parse(chemin).getroot()
    except ET.ParseError:
        return None, "xml illisible"

    description = racine.find("description")
    if description is None:
        return None, "pas de description"

    hx = nombre(racine, "hotspot_x")
    hy = nombre(racine, "hotspot_y")
    largeur = nombre(racine, "width", 40)
    hauteur = nombre(racine, "height", 60)

    formes, annotations, bornes = [], [], []
    bb = Boite()

    for el in description:
        st = parse_style(el.get("style", ""))
        sw = get_stroke_width(st)
        sd = get_stroke_dash(st)
        remplissage = get_fill(st)
        couleur = get_color(st)
        tag = el.tag

        if tag == "line":
            x1, y1 = nombre(el, "x1"), nombre(el, "y1")
            x2, y2 = nombre(el, "x2"), nombre(el, "y2")
            formes.append(
                f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" '
                f'stroke="{couleur}" stroke-width="{sw}"{sd}/>')
            bb.point(x1, y1)
            bb.point(x2, y2)
            for bout, (bx, by) in (("end1", (x1, y1)), ("end2", (x2, y2))):
                if el.get(bout, "none") == "circle":
                    formes.append(
                        f'<circle cx="{bx:g}" cy="{by:g}" r="2.5" fill="none" '
                        f'stroke="{couleur}" stroke-width="{sw}"/>')
                    bb.rect(bx - 2.5, by - 2.5, 5, 5)

        elif tag == "rect":
            x, y = nombre(el, "x"), nombre(el, "y")
            w, h = nombre(el, "width"), nombre(el, "height")
            rx = nombre(el, "rx")
            ry = nombre(el, "ry")
            arrondi = f' rx="{rx:g}" ry="{ry:g}"' if rx or ry else ""
            formes.append(
                f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}"{arrondi} '
                f'fill="{remplissage}" stroke="{couleur}" stroke-width="{sw}"{sd}/>')
            bb.rect(x, y, w, h)

        elif tag == "ellipse":
            x, y = nombre(el, "x"), nombre(el, "y")
            w, h = nombre(el, "width", 10), nombre(el, "height", 10)
            formes.append(
                f'<ellipse cx="{x + w / 2:.2f}" cy="{y + h / 2:.2f}" '
                f'rx="{w / 2:.2f}" ry="{h / 2:.2f}" '
                f'fill="{remplissage}" stroke="{couleur}" stroke-width="{sw}"{sd}/>')
            bb.rect(x, y, w, h)

        elif tag == "circle":
            d = nombre(el, "diameter", 10)
            x, y = nombre(el, "x"), nombre(el, "y")
            formes.append(
                f'<circle cx="{x + d / 2:g}" cy="{y + d / 2:g}" r="{d / 2:g}" '
                f'fill="{remplissage}" stroke="{couleur}" stroke-width="{sw}"{sd}/>')
            bb.rect(x, y, d, d)

        elif tag == "arc":
            x, y = nombre(el, "x"), nombre(el, "y")
            w, h = nombre(el, "width", 10), nombre(el, "height", 10)
            d = arc_to_path(x, y, w, h, nombre(el, "start"), nombre(el, "angle", 90))
            if d:
                formes.append(
                    f'<path d="{d}" fill="none" stroke="{couleur}" '
                    f'stroke-width="{sw}"{sd}/>')
                bb.rect(x, y, w, h)

        elif tag == "polygon":
            points, i = [], 1
            while el.get(f"x{i}") is not None:
                px, py = nombre(el, f"x{i}"), nombre(el, f"y{i}")
                points.append(f"{px:g},{py:g}")
                bb.point(px, py)
                i += 1
            if points:
                ferme = el.get("closed", "true") != "false"
                balise = "polygon" if ferme else "polyline"
                formes.append(
                    f'<{balise} points="{" ".join(points)}" '
                    f'fill="{remplissage if ferme else "none"}" '
                    f'stroke="{couleur}" stroke-width="{sw}"{sd}/>')

        elif tag in ("text", "input"):
            txt = (el.get("text", "") or "").strip()
            if not txt or txt == "_":
                continue
            x, y = nombre(el, "x"), nombre(el, "y")
            fs = taille_police(el, 6, 4, 11)
            balise, lg, ht = bloc_texte(x, y, fs, "#333", txt)
            if balise:
                annotations.append(balise)
                bb.rect(x, y - fs, lg, ht)

        elif tag == "dynamic_text":
            if el.get("text_from", "") != "UserText":
                continue
            interne = el.find("text")
            txt = (interne.text or "").strip() if interne is not None and interne.text else ""
            if not txt or txt == "_":
                continue
            x, y = nombre(el, "x"), nombre(el, "y")
            fs = taille_police(el, 5, 4, 10)
            # QET mesure depuis le haut du texte, SVG depuis la ligne de base.
            balise, lg, ht = bloc_texte(x, y + fs + 1, fs, "#555", txt)
            if balise:
                annotations.append(balise)
                bb.rect(x, y, lg, ht + 1)

        elif tag == "terminal":
            x, y = nombre(el, "x"), nombre(el, "y")
            bornes.append(f'<circle cx="{x:g}" cy="{y:g}" r="1.5" fill="#000"/>')
            bb.rect(x - 1.5, y - 1.5, 3, 3)

    if not formes:
        return None, "aucune forme"

    # Boite QET declaree, elargie a ce qui est reellement dessine : beaucoup
    # d'elements debordent de leur cadre, et un fichier SVG autonome n'a pas
    # de calque parent pour rattraper le depassement.
    bb.rect(-hx, -hy, largeur, hauteur)
    marge = 2.0
    vx = bb.x1 - marge
    vy = bb.y1 - marge
    vw = max(bb.x2 - bb.x1 + 2 * marge, 1.0)
    vh = max(bb.y2 - bb.y1 + 2 * marge, 1.0)

    corps = "\n  ".join(formes + bornes + annotations)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{vw:.0f}" height="{vh:.0f}" '
        f'viewBox="{vx:.2f} {vy:.2f} {vw:.2f} {vh:.2f}">\n'
        f"  {corps}\n</svg>\n"
    )
    infos = {
        "viewBox": f"{vx:.2f} {vy:.2f} {vw:.2f} {vh:.2f}",
        "bornes": len(bornes),
        "formes": len(formes),
    }
    return svg, infos

# --- parcours ---------------------------------------------------------------

def lister(source):
    trouves = []
    for racine, dossiers, fichiers in os.walk(source):
        dossiers[:] = [d for d in dossiers if d != ".git"]
        for f in fichiers:
            if f.endswith(".elmt"):
                trouves.append(os.path.join(racine, f))
    # Tri stable : le nommage des doublons ne doit pas dependre du systeme.
    return sorted(trouves)


def categorie_de(chemin_relatif):
    return chemin_relatif.split(os.sep)[0] if os.sep in chemin_relatif else "divers"


def prefixe_commun(a, b):
    n = 0
    for ca, cb in zip(a, b):
        if ca != cb:
            break
        n += 1
    return n


def rang_de(entree):
    """Ordre de preference entre elements qui portent le meme nom francais.

    Le gagnant garde le nom court (« moteur-triphase.svg »), les suivants
    prennent -2, -3... Sans ce tri, le gagnant serait le premier chemin par
    ordre alphabetique : la collection amont contient des noms francais
    errones (jednofaz.motor.elmt, un moteur monophase, est nomme « Moteur
    triphase ») et c'est alors un mauvais dessin qui prend le nom court.
    On prefere donc l'element dont le nom de fichier colle au nom francais.
    """
    stem = slugifier(os.path.splitext(os.path.basename(entree["source"]))[0])
    base = entree["base"]
    apparente = 0 if (stem.startswith(base) or base.startswith(stem)) else 1
    return (apparente,
            -prefixe_commun(stem, base),
            entree["source"].count("/"),
            len(entree["source"]),
            entree["source"])


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--source", required=True,
                    help="racine de la collection QElectroTech (.elmt)")
    ap.add_argument("--sortie", default="symboles",
                    help="dossier de sortie (defaut : symboles)")
    ap.add_argument("--tout", action="store_true",
                    help="inclure aussi les catalogues d'articles constructeurs "
                         "(references Siemens, WEG, Schneider... : environ 4000 "
                         "symboles et 27 Mo de plus, sans usage pedagogique)")
    args = ap.parse_args()

    if not os.path.isdir(args.source):
        sys.exit(f"source introuvable : {args.source}")

    dossier_svg = os.path.join(args.sortie, "svg")
    os.makedirs(dossier_svg, exist_ok=True)

    elements = lister(args.source)
    if not elements:
        sys.exit(f"aucun fichier .elmt sous {args.source}")

    retenus = []
    rejets = {}

    def ecarter(motif):
        rejets[motif] = rejets.get(motif, 0) + 1

    for chemin in elements:
        relatif = os.path.relpath(chemin, args.source).replace(os.sep, "/")

        if not args.tout and "manufacturers_articles" in relatif:
            ecarter("catalogue constructeur")
            continue

        svg, infos = convertir(chemin)
        if svg is None:
            ecarter(infos)
            continue

        try:
            racine_xml = ET.parse(chemin).getroot()
        except ET.ParseError:
            ecarter("xml illisible")
            continue
        nom_fr, nom_en = noms_de(racine_xml, chemin)

        base = slugifier(nom_fr) or slugifier(os.path.splitext(os.path.basename(chemin))[0])
        if not base:
            ecarter("nom vide")
            continue

        retenus.append({"base": base, "nom": nom_fr, "nom_en": nom_en,
                        "source": relatif, "svg": svg, "infos": infos})

    # Homonymes : le mieux nomme garde le slug court, les autres prennent -2, -3...
    homonymes = {}
    for e in retenus:
        homonymes.setdefault(e["base"], []).append(e)

    for lot in homonymes.values():
        lot.sort(key=rang_de)

    # Deux temps, sinon un suffixe ecrase un nom legitime : le -2 de « Vanne »
    # et le symbole reellement nomme « Vanne 2 » visent le meme fichier.
    # Les noms courts sont donc tous reserves avant qu'un suffixe soit attribue.
    attribues = []
    utilises = set()
    for base in sorted(homonymes):
        utilises.add(base)
        attribues.append((base, homonymes[base][0]))
    for base in sorted(homonymes):
        n = 1
        for e in homonymes[base][1:]:
            n += 1
            while f"{base}-{n}" in utilises:
                n += 1
            utilises.add(f"{base}-{n}")
            attribues.append((f"{base}-{n}", e))

    index = []
    for slug, e in attribues:
        with open(os.path.join(dossier_svg, slug + ".svg"), "w", encoding="utf-8") as f:
            f.write(e["svg"])
        index.append({
            "id": slug,
            "nom": e["nom"],
            "nom_en": e["nom_en"],
            "categorie": categorie_de(e["source"].replace("/", os.sep)),
            "dossier": os.path.dirname(e["source"]),
            "source": e["source"],
            "fichier": f"svg/{slug}.svg",
            "viewBox": e["infos"]["viewBox"],
            "bornes": e["infos"]["bornes"],
        })

    index.sort(key=lambda s: s["id"])
    par_categorie = {}
    for s in index:
        par_categorie[s["categorie"]] = par_categorie.get(s["categorie"], 0) + 1

    with open(os.path.join(args.sortie, "index.json"), "w", encoding="utf-8") as f:
        json.dump({
            "meta": {
                "version": "3.0",
                "titre": "inerWeb — bibliotheque de symboles QElectroTech",
                "source": "https://github.com/qelectrotech/qelectrotech-elements",
                "licence": "CC BY 3.0",
                "attribution": (
                    "Symboles issus de la collection d'elements QElectroTech "
                    "(https://qelectrotech.org/), publiee sous Creative Commons "
                    "Attribution 3.0, convertis en SVG par F. Henninot."
                ),
                "nombre": len(index),
                "par_categorie": par_categorie,
                "catalogues_constructeurs": bool(args.tout),
            },
            "symboles": index,
        }, f, ensure_ascii=False, indent=1)

    print(f"elements lus   : {len(elements)}")
    print(f"SVG ecrits     : {len(index)}")
    print(f"noms uniques   : {sum(1 for lot in homonymes.values() if len(lot) == 1)}")
    print(f"par categorie  : {par_categorie}")
    for motif, n in sorted(rejets.items(), key=lambda kv: -kv[1]):
        print(f"  ecarte ({motif}) : {n}")


if __name__ == "__main__":
    main()
