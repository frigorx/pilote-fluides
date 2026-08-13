#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
qet-projet-vers-svg.py — convertit un PROJET QElectroTech (.qet) en SVG.

  python3 qet-projet-vers-svg.py schema.qet --sortie dossier/

Un fichier SVG par folio non vide, plus un index JSON qui dit ce que chaque
folio contient (organes utilises, reperes, liaisons).

Difference avec qet-vers-svg.py, qui convertit des ELEMENTS isoles (.elmt) :
ici on convertit un SCHEMA COMPLET. Le .qet embarque dans <collection> la
definition de chaque symbole qu'il utilise, donc le fichier se suffit a
lui-meme : pas besoin de la collection QElectroTech pour le rendre.

Ce qui est dessine :
  · les elements, places et tournes (orientation 0..3 = 0/90/180/270 degres) ;
  · les conducteurs, re-routes en angles droits entre bornes ;
  · les traces libres (lignes, rectangles, ellipses, polygones) ;
  · les textes libres, dont QET stocke le HTML complet.
"""

import argparse
import html as htmlmod
import json
import math
import os
import re
import sys
import xml.etree.ElementTree as ET

XML_LANG = "{http://www.w3.org/XML/1998/namespace}lang"

# --- styles (memes conventions que qet-vers-svg.py) -------------------------

COULEURS = {
    "black": "#000", "white": "#fff", "red": "#c00", "green": "#0a0",
    "blue": "#00c", "gray": "#888", "grey": "#888", "brown": "#8b4513",
    "yellow": "#dd0", "orange": "#e80", "purple": "#808", "magenta": "#c0c",
    "cyan": "#0cc", "lightgray": "#ccc", "darkgray": "#555", "none": "none",
}


def parse_style(style):
    d = {}
    for part in (style or "").split(";"):
        if ":" in part:
            k, v = part.split(":", 1)
            d[k.strip()] = v.strip()
    return d


def trait(st):
    lw = st.get("line-weight", "normal")
    return {"none": "0", "thin": "0.5", "hight": "2"}.get(lw, "1")


def tirets(st):
    ls = st.get("line-style", "normal")
    return {"dashed": ' stroke-dasharray="4,2"',
            "dotted": ' stroke-dasharray="1,2"',
            "dashdotted": ' stroke-dasharray="4,2,1,2"'}.get(ls, "")


def remplissage(st):
    return COULEURS.get(st.get("filling", "none"), "none")


def couleur(st):
    return COULEURS.get(st.get("color", "black"), "#000")


def nombre(el, attr, defaut=0.0):
    try:
        return float(el.get(attr, defaut))
    except (TypeError, ValueError):
        return float(defaut)


def arc_path(x, y, w, h, depart, angle):
    cx, cy, rx, ry = x + w / 2, y + h / 2, w / 2, h / 2
    if rx < 0.1 or ry < 0.1:
        return ""
    a1, a2 = math.radians(-depart), math.radians(-(depart + angle))
    x1, y1 = cx + rx * math.cos(a1), cy + ry * math.sin(a1)
    x2, y2 = cx + rx * math.cos(a2), cy + ry * math.sin(a2)
    return (f"M {x1:.2f} {y1:.2f} A {rx:.2f} {ry:.2f} 0 "
            f"{1 if abs(angle) > 180 else 0} {1 if angle < 0 else 0} "
            f"{x2:.2f} {y2:.2f}")


def taille_police(el, defaut, plancher, plafond):
    for p in (el.get("font", "") or "").split(","):
        try:
            v = float(p)
        except ValueError:
            continue
        if 3 <= v <= 20:
            return max(plancher, min(plafond, v))
    return defaut


def texte_brut(brut):
    """QET stocke le texte libre en HTML Qt complet, feuille de style comprise."""
    s = htmlmod.unescape(brut or "")
    s = re.sub(r"(?is)<style.*?</style>", " ", s)
    s = re.sub(r"(?i)</p\s*>|<br\s*/?>", "\n", s)
    s = re.sub(r"(?s)<[^>]+>", "", s)
    s = htmlmod.unescape(s)
    lignes = [l.strip() for l in s.split("\n")]
    return "\n".join(l for l in lignes if l)


class Boite:
    def __init__(self):
        self.x1 = self.y1 = float("inf")
        self.x2 = self.y2 = float("-inf")

    def point(self, x, y):
        self.x1, self.y1 = min(self.x1, x), min(self.y1, y)
        self.x2, self.y2 = max(self.x2, x), max(self.y2, y)

    def rect(self, x, y, w, h):
        self.point(min(x, x + w), min(y, y + h))
        self.point(max(x, x + w), max(y, y + h))

    @property
    def vide(self):
        return self.x1 > self.x2

# --- rendu d'une <description> d'element ------------------------------------

def dessiner_description(desc, bb, decalage):
    """Rend les primitives d'un element. bb recoit les points DEJA transformes
    par `decalage`, une fonction (x, y) -> (X, Y) qui applique place et
    rotation. Le SVG, lui, reste en coordonnees locales : c'est le <g> parent
    qui porte la transformation."""
    out = []
    for el in desc:
        st = parse_style(el.get("style", ""))
        sw, sd = trait(st), tirets(st)
        f, c = remplissage(st), couleur(st)
        t = el.tag

        if t == "line":
            x1, y1 = nombre(el, "x1"), nombre(el, "y1")
            x2, y2 = nombre(el, "x2"), nombre(el, "y2")
            out.append(f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" '
                       f'stroke="{c}" stroke-width="{sw}"{sd}/>')
            bb.point(*decalage(x1, y1))
            bb.point(*decalage(x2, y2))
            for bout, (bx, by) in (("end1", (x1, y1)), ("end2", (x2, y2))):
                if el.get(bout, "none") == "circle":
                    out.append(f'<circle cx="{bx:g}" cy="{by:g}" r="2.5" '
                               f'fill="none" stroke="{c}" stroke-width="{sw}"/>')

        elif t == "rect":
            x, y = nombre(el, "x"), nombre(el, "y")
            w, h = nombre(el, "width"), nombre(el, "height")
            rx, ry = nombre(el, "rx"), nombre(el, "ry")
            arr = f' rx="{rx:g}" ry="{ry:g}"' if rx or ry else ""
            out.append(f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}"{arr} '
                       f'fill="{f}" stroke="{c}" stroke-width="{sw}"{sd}/>')
            for px, py in ((x, y), (x + w, y + h)):
                bb.point(*decalage(px, py))

        elif t == "ellipse":
            x, y = nombre(el, "x"), nombre(el, "y")
            w, h = nombre(el, "width", 10), nombre(el, "height", 10)
            out.append(f'<ellipse cx="{x + w / 2:.2f}" cy="{y + h / 2:.2f}" '
                       f'rx="{w / 2:.2f}" ry="{h / 2:.2f}" fill="{f}" '
                       f'stroke="{c}" stroke-width="{sw}"{sd}/>')
            for px, py in ((x, y), (x + w, y + h)):
                bb.point(*decalage(px, py))

        elif t == "circle":
            d = nombre(el, "diameter", 10)
            x, y = nombre(el, "x"), nombre(el, "y")
            out.append(f'<circle cx="{x + d / 2:g}" cy="{y + d / 2:g}" r="{d / 2:g}" '
                       f'fill="{f}" stroke="{c}" stroke-width="{sw}"{sd}/>')
            for px, py in ((x, y), (x + d, y + d)):
                bb.point(*decalage(px, py))

        elif t == "arc":
            x, y = nombre(el, "x"), nombre(el, "y")
            w, h = nombre(el, "width", 10), nombre(el, "height", 10)
            d = arc_path(x, y, w, h, nombre(el, "start"), nombre(el, "angle", 90))
            if d:
                out.append(f'<path d="{d}" fill="none" stroke="{c}" '
                           f'stroke-width="{sw}"{sd}/>')
                for px, py in ((x, y), (x + w, y + h)):
                    bb.point(*decalage(px, py))

        elif t == "polygon":
            pts, i = [], 1
            while el.get(f"x{i}") is not None:
                px, py = nombre(el, f"x{i}"), nombre(el, f"y{i}")
                pts.append(f"{px:g},{py:g}")
                bb.point(*decalage(px, py))
                i += 1
            if pts:
                ferme = el.get("closed", "true") != "false"
                out.append(f'<{"polygon" if ferme else "polyline"} '
                           f'points="{" ".join(pts)}" fill="{f if ferme else "none"}" '
                           f'stroke="{c}" stroke-width="{sw}"{sd}/>')

        elif t in ("text", "input"):
            txt = (el.get("text", "") or "").strip()
            if not txt or txt == "_":
                continue
            x, y = nombre(el, "x"), nombre(el, "y")
            fs = taille_police(el, 6, 4, 11)
            out.append(f'<text x="{x:g}" y="{y:g}" font-family="sans-serif" '
                       f'font-size="{fs:g}" fill="#333">{htmlmod.escape(txt)}</text>')
            bb.point(*decalage(x, y - fs))
            bb.point(*decalage(x + 0.6 * fs * len(txt), y))

        elif t == "dynamic_text":
            interne = el.find("text")
            txt = (interne.text or "").strip() if interne is not None and interne.text else ""
            if not txt or txt == "_":
                continue
            x, y = nombre(el, "x"), nombre(el, "y")
            fs = taille_police(el, 5, 4, 10)
            out.append(f'<text x="{x:g}" y="{y + fs + 1:.1f}" font-family="sans-serif" '
                       f'font-size="{fs:g}" fill="#555">{htmlmod.escape(txt)}</text>')
            bb.point(*decalage(x, y))
            bb.point(*decalage(x + 0.6 * fs * len(txt), y + fs))

        elif t == "terminal":
            x, y = nombre(el, "x"), nombre(el, "y")
            out.append(f'<circle cx="{x:g}" cy="{y:g}" r="1.2" fill="#000"/>')
            bb.point(*decalage(x, y))
    return out

# --- la collection embarquee ------------------------------------------------

def lire_collection(racine):
    """{ 'import/10_electric/.../terre.elmt': (<description>, nom_fr) }"""
    defs = {}

    def descendre(noeud, chemin):
        for cat in noeud.findall("category"):
            descendre(cat, chemin + [cat.get("name", "")])
        for el in noeud.findall("element"):
            d = el.find("definition")
            if d is None:
                continue
            desc = d.find("description")
            if desc is None:
                continue
            nom = None
            bloc = d.find("names")
            if bloc is not None:
                for n in bloc.findall("name"):
                    if n.get(XML_LANG) == "fr" or n.get("lang") == "fr":
                        nom = (n.text or "").strip()
                        break
            defs["/".join(chemin + [el.get("name", "")])] = (desc, nom or el.get("name"))

    col = racine.find("collection")
    if col is not None:
        descendre(col, [])
    return defs

# --- conducteurs ------------------------------------------------------------

# QET recalcule le trace des conducteurs a l'ouverture : le fichier ne stocke
# que les deux bornes reliees. On re-route donc soi-meme, en angles droits.
SORTIE = {0: (0, -1), 1: (1, 0), 2: (0, 1), 3: (-1, 0)}  # n, e, s, w


def router(p1, o1, p2, o2, ecart=8.0):
    """Chemin orthogonal : on sort de chaque borne selon son orientation, puis
    on relie les deux points de degagement par un coude ou un Z."""
    (x1, y1), (x2, y2) = p1, p2
    dx1, dy1 = SORTIE.get(o1, (0, 0))
    dx2, dy2 = SORTIE.get(o2, (0, 0))
    a = (x1 + dx1 * ecart, y1 + dy1 * ecart)
    b = (x2 + dx2 * ecart, y2 + dy2 * ecart)
    pts = [(x1, y1), a]
    if abs(a[0] - b[0]) < 0.5 or abs(a[1] - b[1]) < 0.5:
        pass                                   # deja aligne : tout droit
    elif dx1 != 0:                             # on est sorti horizontalement
        pts.append((b[0], a[1]))
    elif dy1 != 0:                             # verticalement
        pts.append((a[0], b[1]))
    else:
        pts.append((b[0], a[1]))
    pts += [b, (x2, y2)]
    # on retire les points confondus
    net = [pts[0]]
    for p in pts[1:]:
        if abs(p[0] - net[-1][0]) > 0.1 or abs(p[1] - net[-1][1]) > 0.1:
            net.append(p)
    return net

# --- un folio ---------------------------------------------------------------

def rendre_folio(diagram, defs):
    bb = Boite()
    fond, corps, dessus = [], [], []
    bornes = {}          # id de borne -> (x, y, orientation)
    organes = []

    # 1. traces libres (le fond)
    for sh in diagram.findall("./shapes/*"):
        pen = sh.find("pen")
        c = (pen.get("color") if pen is not None else None) or "#000"
        w = (pen.get("widthF") if pen is not None else None) or "1"
        br = sh.find("brush")
        f = "none" if br is None or br.get("style") == "NoBrush" else (br.get("color") or "none")
        t = sh.get("type")
        x1, y1 = nombre(sh, "x1"), nombre(sh, "y1")
        x2, y2 = nombre(sh, "x2"), nombre(sh, "y2")
        if t == "Line":
            fond.append(f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" '
                        f'stroke="{c}" stroke-width="{w}"/>')
        elif t == "Rectangle":
            fond.append(f'<rect x="{min(x1, x2):g}" y="{min(y1, y2):g}" '
                        f'width="{abs(x2 - x1):g}" height="{abs(y2 - y1):g}" '
                        f'fill="{f}" stroke="{c}" stroke-width="{w}"/>')
        elif t == "Ellipse":
            fond.append(f'<ellipse cx="{(x1 + x2) / 2:g}" cy="{(y1 + y2) / 2:g}" '
                        f'rx="{abs(x2 - x1) / 2:g}" ry="{abs(y2 - y1) / 2:g}" '
                        f'fill="{f}" stroke="{c}" stroke-width="{w}"/>')
        elif t == "Polyline":
            pts, i = [], 1
            while sh.get(f"x{i}") is not None:
                px, py = nombre(sh, f"x{i}"), nombre(sh, f"y{i}")
                pts.append(f"{px:g},{py:g}")
                bb.point(px, py)
                i += 1
            if pts:
                fond.append(f'<polyline points="{" ".join(pts)}" fill="none" '
                            f'stroke="{c}" stroke-width="{w}"/>')
            continue
        bb.point(x1, y1)
        bb.point(x2, y2)

    # 2. elements
    for inst in diagram.findall("./elements/element"):
        chemin = (inst.get("type") or "").replace("embed://", "")
        trouve = defs.get(chemin)
        if trouve is None:
            base = chemin.split("/")[-1]
            trouve = next((v for k, v in defs.items() if k.endswith("/" + base)), None)
        if trouve is None:
            continue
        desc, nom = trouve
        ex, ey = nombre(inst, "x"), nombre(inst, "y")
        o = int(nombre(inst, "orientation"))
        ang = math.radians(90 * o)
        cos_a, sin_a = math.cos(ang), math.sin(ang)

        def place(lx, ly, ex=ex, ey=ey, ca=cos_a, sa=sin_a):
            return (ex + lx * ca - ly * sa, ey + lx * sa + ly * ca)

        prim = dessiner_description(desc, bb, place)
        if o:
            corps.append(f'<g transform="translate({ex:g},{ey:g}) rotate({90 * o})">'
                         + "".join(prim) + "</g>")
        else:
            corps.append(f'<g transform="translate({ex:g},{ey:g})">' + "".join(prim) + "</g>")
        organes.append(nom)

        for term in inst.findall("./terminals/terminal"):
            tid = term.get("id")
            if tid is None:
                continue
            tx, ty = place(nombre(term, "x"), nombre(term, "y"))
            to = (int(nombre(term, "orientation")) + o) % 4
            bornes[tid] = (tx, ty, to)

    # 3. conducteurs
    for cond in diagram.findall("./conductors/conductor"):
        t1, t2 = bornes.get(cond.get("terminal1")), bornes.get(cond.get("terminal2"))
        if not t1 or not t2:
            continue
        c = cond.get("conductor_color") or "#000"
        pts = router((t1[0], t1[1]), t1[2], (t2[0], t2[1]), t2[2])
        for p in pts:
            bb.point(*p)
        d = " ".join(f"{'M' if i == 0 else 'L'} {x:.1f} {y:.1f}"
                     for i, (x, y) in enumerate(pts))
        corps.append(f'<path d="{d}" fill="none" stroke="{c}" stroke-width="1" '
                     f'stroke-linejoin="round"/>')

    # 4. textes libres
    reperes = []
    for inp in diagram.findall("./inputs/input"):
        txt = texte_brut(inp.get("text", ""))
        if not txt:
            continue
        x, y = nombre(inp, "x"), nombre(inp, "y")
        fs = taille_police(inp, 9, 5, 14)
        rot = nombre(inp, "rotation")
        lignes = txt.split("\n")
        contenu = "".join(
            f'<tspan x="{x:g}" dy="{0 if i == 0 else fs * 1.15:.2f}">'
            f"{htmlmod.escape(l)}</tspan>" for i, l in enumerate(lignes))
        g = f' transform="rotate({rot:g} {x:g} {y:g})"' if rot else ""
        dessus.append(f'<text x="{x:g}" y="{y + fs:g}" font-family="sans-serif" '
                      f'font-size="{fs:g}" fill="#111"{g}>{contenu}</text>')
        bb.point(x, y)
        bb.point(x + 0.6 * fs * max(len(l) for l in lignes), y + fs * 1.15 * len(lignes))
        reperes.append(txt.replace("\n", " "))

    if bb.vide or not (fond or corps or dessus):
        return None

    m = 12.0
    vx, vy = bb.x1 - m, bb.y1 - m
    vw, vh = max(bb.x2 - bb.x1 + 2 * m, 1), max(bb.y2 - bb.y1 + 2 * m, 1)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{vw:.0f}" height="{vh:.0f}" '
           f'viewBox="{vx:.2f} {vy:.2f} {vw:.2f} {vh:.2f}">\n'
           f'<rect x="{vx:.2f}" y="{vy:.2f}" width="{vw:.2f}" height="{vh:.2f}" fill="#fff"/>\n'
           + "\n".join(fond + corps + dessus) + "\n</svg>\n")
    return svg, {"organes": organes, "reperes": reperes,
                 "conducteurs": len(diagram.findall("./conductors/conductor")),
                 "largeur": round(vw), "hauteur": round(vh)}


def titre_projet(racine, chemin):
    """Le titre du projet, ou a defaut le nom sous lequel il a ete enregistre.

    Le nom du FICHIER est le dernier recours, et on le nettoie : un fichier
    telecharge arrive souvent prefixe d'un identifiant (« 9e42621c-CAP_IFCA »),
    qui n'a rien a faire dans le nom du schema publie.
    """
    titre = (racine.get("title") or "").strip()
    if titre:
        return titre
    for p in racine.iter("property"):
        if p.get("name") == "savedfilename" and (p.text or "").strip():
            return p.text.strip()
    base = os.path.splitext(os.path.basename(chemin))[0]
    return re.sub(r"^[0-9a-f]{6,}[-_]", "", base).replace("_", " ").strip() or base


def slug(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-") or "schema"


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("projets", nargs="+", help="fichiers .qet")
    ap.add_argument("--sortie", default="schemas")
    ap.add_argument("--ignorer", default="", help=(
        "folios a ne pas publier, separes par des virgules, sous la forme "
        "« slug-du-projet:numero » (ex. « tention:1,simbole-electrique:2 »). "
        "Sans cette liste, un brouillon ecarte a la main revient a la "
        "regeneration suivante."))
    args = ap.parse_args()
    # Meme disposition que symboles/ : les dessins dans svg/, le catalogue a
    # cote. Les deux index se lisent alors de la meme facon.
    dossier_svg = os.path.join(args.sortie, "svg")
    os.makedirs(dossier_svg, exist_ok=True)

    ecartes = set()
    for morceau in args.ignorer.split(","):
        morceau = morceau.strip()
        if not morceau:
            continue
        if ":" not in morceau:
            sys.exit(f"--ignorer : « {morceau} » n'est pas de la forme slug:numero")
        s, n = morceau.rsplit(":", 1)
        try:
            ecartes.add((s.strip(), int(n)))
        except ValueError:
            sys.exit(f"--ignorer : « {morceau} » n'a pas un numero de folio valide")

    index = []
    vus = set()
    for chemin in args.projets:
        try:
            racine = ET.parse(chemin).getroot()
        except ET.ParseError as e:
            print(f"  !! {chemin} : XML illisible ({e})")
            continue
        defs = lire_collection(racine)
        titre = titre_projet(racine, chemin)
        base = slug(titre)
        diagrams = racine.findall("diagram")
        print(f"{titre}  ({len(defs)} symboles embarques, {len(diagrams)} folio(s))")

        # On garde le numero de folio du projet, pas un compteur de sortie :
        # un folio vide n'est pas rendu, mais renumeroter ferait mentir le
        # nom de fichier des qu'on rouvre le .qet dans QElectroTech.
        for i, d in enumerate(diagrams, 1):
            if (base, i) in ecartes:
                vus.add((base, i))
                print(f"   folio {i} : ecarte (--ignorer)")
                continue
            res = rendre_folio(d, defs)
            if res is None:
                print(f"   folio {i} : vide, ignore")
                continue
            svg, infos = res
            nom = f"{base}-folio{i}.svg" if len(diagrams) > 1 else f"{base}.svg"
            with open(os.path.join(dossier_svg, nom), "w", encoding="utf-8") as f:
                f.write(svg)
            index.append({"projet": titre, "source": os.path.basename(chemin),
                          "folio": i, "fichier": f"svg/{nom}", **infos})
            print(f"   folio {i} -> {nom}  ({len(infos['organes'])} organes, "
                  f"{infos['conducteurs']} liaisons, {infos['largeur']}x{infos['hauteur']})")

    # Une exclusion qui ne correspond a rien est une faute de frappe, et elle
    # laisserait un brouillon en ligne en croyant l'avoir retire.
    orphelines = ecartes - vus
    if orphelines:
        sys.exit("--ignorer vise des folios inexistants : "
                 + ", ".join(f"{s}:{n}" for s, n in sorted(orphelines)))

    index.sort(key=lambda s: (s["projet"], s["folio"]))
    with open(os.path.join(args.sortie, "index.json"), "w", encoding="utf-8") as f:
        json.dump({
            "meta": {
                "titre": "inerWeb — schémas QElectroTech de F. Henninot",
                "auteur": "F. Henninot",
                "attribution": (
                    "Les schémas sont de F. Henninot. Les symboles qu'ils "
                    "emploient viennent de la collection d'éléments QElectroTech "
                    "(https://qelectrotech.org/), publiée sous Creative Commons "
                    "Attribution 3.0."
                ),
                "restriction": (
                    "La licence amont interdit l'usage de ces fichiers comme "
                    "données d'entraînement pour un modèle d'apprentissage "
                    "automatique."
                ),
                "nombre": len(index),
                "ecartes": sorted(f"{s}:{n}" for s, n in ecartes),
            },
            "schemas": index,
        }, f, ensure_ascii=False, indent=1)
    print(f"\n{len(index)} folio(s) ecrits dans {args.sortie}/"
          + (f", {len(ecartes)} ecarte(s)" if ecartes else ""))


if __name__ == "__main__":
    main()
