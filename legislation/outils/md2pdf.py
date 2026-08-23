"""Rend un Markdown de brief en PDF à la charte inerWeb.

Sobriété d'encre (charte § impression) : fond blanc, aucun aplat de surface,
mais les filets, titres et accents GARDENT leur couleur. Corps en noir pur.
Sans-serif uniquement (Helvetica : Calibri n'est pas embarquable ici).
"""
import io
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph,
                                Spacer, Table, TableStyle, KeepTogether)

BLEU = colors.HexColor("#1b3a63")
ORANGE = colors.HexColor("#c9451a")
LOGO_ORANGE = colors.HexColor("#e8914a")
GRIS = colors.HexColor("#637285")
FILET = colors.HexColor("#c9d4de")
TEAL = colors.HexColor("#0f766e")
NOIR = colors.HexColor("#000000")

S = {
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=19, leading=24,
                         textColor=BLEU, spaceBefore=2, spaceAfter=10),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=13.5, leading=18,
                         textColor=BLEU, spaceBefore=16, spaceAfter=7),
    "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11.5, leading=15,
                         textColor=NOIR, spaceBefore=11, spaceAfter=5),
    "p": ParagraphStyle("p", fontName="Helvetica", fontSize=9.8, leading=14.2,
                        textColor=NOIR, alignment=TA_LEFT, spaceAfter=6),
    "li": ParagraphStyle("li", fontName="Helvetica", fontSize=9.8, leading=14.2,
                         textColor=NOIR, leftIndent=12, bulletIndent=3, spaceAfter=3),
    "cite": ParagraphStyle("cite", fontName="Helvetica-Oblique", fontSize=9.4, leading=13.6,
                           textColor=GRIS, leftIndent=10, spaceAfter=6),
    "code": ParagraphStyle("code", fontName="Courier", fontSize=7.9, leading=10.4,
                           textColor=NOIR, leftIndent=8, spaceAfter=1),
    "th": ParagraphStyle("th", fontName="Helvetica-Bold", fontSize=8.8, leading=12,
                         textColor=BLEU),
    "td": ParagraphStyle("td", fontName="Helvetica", fontSize=8.8, leading=12,
                         textColor=NOIR),
}


def enrichir(t):
    """Le gras, l'italique et le code inline du Markdown -> balises reportlab."""
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    t = re.sub(r"`([^`]+)`", r'<font face="Courier" size="8.6">\1</font>', t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", t)
    return t


def tableau(lignes, largeur):
    lignes = [l for l in lignes if not re.match(r"^\s*\|[\s:|-]+\|\s*$", l)]
    donnees = []
    for l in lignes:
        cases = [c.strip() for c in l.strip().strip("|").split("|")]
        donnees.append(cases)
    if not donnees:
        return None
    n = max(len(r) for r in donnees)
    donnees = [r + [""] * (n - len(r)) for r in donnees]
    corps = [[Paragraph(enrichir(c), S["th" if i == 0 else "td"]) for c in r]
             for i, r in enumerate(donnees)]
    t = Table(corps, colWidths=[largeur / n] * n, repeatRows=1)
    # Le trait porte le sens, pas la surface : aucune zébrure, aucun aplat.
    t.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.4, FILET),
        ("LINEBELOW", (0, 0), (-1, 0), 1.1, BLEU),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def rendre(source, sortie, titre):
    texte = io.open(source, encoding="utf-8").read()
    marge = 17 * mm
    doc = BaseDocTemplate(sortie, pagesize=A4,
                          leftMargin=marge, rightMargin=marge,
                          topMargin=16 * mm, bottomMargin=16 * mm,
                          title=titre, author="inerWeb")
    largeur = doc.width
    cadre = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="c")

    def decor(canvas, d):
        canvas.saveState()
        # bandeau de marque : filet orange du logo, jamais un aplat (encre)
        canvas.setStrokeColor(LOGO_ORANGE)
        canvas.setLineWidth(1.6)
        canvas.line(d.leftMargin, A4[1] - 12 * mm, d.leftMargin + 46 * mm, A4[1] - 12 * mm)
        canvas.setFont("Helvetica-Bold", 8)
        canvas.setFillColor(BLEU)
        canvas.drawString(d.leftMargin, A4[1] - 11 * mm, "inerWeb  ·  réseau Législation")
        canvas.setFont("Helvetica", 7.6)
        canvas.setFillColor(GRIS)
        canvas.drawRightString(A4[0] - d.rightMargin, A4[1] - 11 * mm,
                               "Brief visuel — 23/08/2026")
        canvas.setStrokeColor(FILET)
        canvas.setLineWidth(0.4)
        canvas.line(d.leftMargin, 13 * mm, A4[0] - d.rightMargin, 13 * mm)
        canvas.setFont("Helvetica", 7.6)
        canvas.drawString(d.leftMargin, 9.5 * mm, "© 2026 inerWeb — CC BY-NC-ND 4.0")
        canvas.drawRightString(A4[0] - d.rightMargin, 9.5 * mm, "page %d" % canvas.getPageNumber())
        canvas.restoreState()

    doc.addPageTemplates([PageTemplate(id="p", frames=[cadre], onPage=decor)])

    flux = []
    lignes = texte.split("\n")
    i = 0
    while i < len(lignes):
        l = lignes[i]

        if l.startswith("```"):
            bloc = []
            i += 1
            while i < len(lignes) and not lignes[i].startswith("```"):
                bloc.append(lignes[i])
                i += 1
            i += 1
            cadre_code = [[Paragraph(
                x.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace(" ", "&nbsp;")
                or "&nbsp;", S["code"])] for x in bloc]
            t = Table(cadre_code, colWidths=[largeur])
            t.setStyle(TableStyle([
                ("LINEBEFORE", (0, 0), (0, -1), 2.2, TEAL),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 0.4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.4),
            ]))
            flux.append(Spacer(1, 5))
            flux.append(t)
            flux.append(Spacer(1, 7))
            continue

        if l.strip().startswith("|"):
            bloc = []
            while i < len(lignes) and lignes[i].strip().startswith("|"):
                bloc.append(lignes[i])
                i += 1
            t = tableau(bloc, largeur)
            if t is not None:
                flux.append(Spacer(1, 4))
                flux.append(t)
                flux.append(Spacer(1, 8))
            continue

        if re.match(r"^---+\s*$", l):
            flux.append(Spacer(1, 5))
            i += 1
            continue

        if l.startswith("### "):
            flux.append(Paragraph(enrichir(l[4:]), S["h3"]))
            i += 1
            continue
        if l.startswith("## "):
            flux.append(Paragraph(enrichir(l[3:]), S["h2"]))
            i += 1
            continue
        if l.startswith("# "):
            flux.append(Paragraph(enrichir(l[2:]), S["h1"]))
            i += 1
            continue

        # Une CITATION peut courir sur plusieurs lignes : on la recolle, sinon
        # un gras ouvert sur une ligne et fermé sur la suivante ne se voit pas.
        if l.startswith(">"):
            bloc = []
            while i < len(lignes) and lignes[i].startswith(">"):
                bloc.append(lignes[i].lstrip(">").strip())
                i += 1
            texte_cite = " ".join(x for x in bloc if x)
            if texte_cite:
                flux.append(Paragraph(enrichir(texte_cite), S["cite"]))
            continue

        # Une PUCE peut elle aussi courir sur plusieurs lignes (continuation
        # indentée), même raison.
        if re.match(r"^\s*[-*] ", l):
            bloc = [re.sub(r"^\s*[-*] ", "", l)]
            i += 1
            while i < len(lignes) and lignes[i].strip() and not re.match(r"^\s*[-*] |^[#>|]|^```|^---", lignes[i]):
                bloc.append(lignes[i].strip())
                i += 1
            flux.append(Paragraph(enrichir(" ".join(bloc)), S["li"], bulletText="•"))
            continue

        # Un PARAGRAPHE : toutes les lignes consécutives jusqu'à une ligne vide.
        if l.strip():
            bloc = [l.strip()]
            i += 1
            while i < len(lignes) and lignes[i].strip() and not re.match(r"^\s*[-*] |^[#>|]|^```|^---", lignes[i]):
                bloc.append(lignes[i].strip())
                i += 1
            flux.append(Paragraph(enrichir(" ".join(bloc)), S["p"]))
            continue

        i += 1

    doc.build(flux)
    print("PDF ecrit :", sortie)


if __name__ == "__main__":
    rendre(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "Brief")
