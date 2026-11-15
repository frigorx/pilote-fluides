# Pose le titre et le filigrane inerWeb sur les deux peintures Codex (15/11/2026).
# Usage : python poser-titres.py   (depuis n'importe où)
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# peintures Codex sans titre ni filigrane : gardées hors du dépôt (le site publie tout)
ICI = Path("C:/Users/henni/OneDrive/Bureau/4-INERWEB/CLAUDE-ESPACE-TRAVAIL/affiches-studio-peintures")
SORTIE = Path(__file__).resolve().parents[3] / "studio" / "affiches"
F = "C:/Windows/Fonts/"
W, H = 800, 1200


def police(nom, taille):
    return ImageFont.truetype(F + nom, taille)


def centre(d, y, texte, fnt, fill):
    l = d.textlength(texte, font=fnt)
    d.text(((W - l) / 2, y), texte, font=fnt, fill=fill)


def cartouche(d, y, texte, fnt, fond, encre):
    l = d.textlength(texte, font=fnt)
    x = (W - l) / 2
    b = d.textbbox((x, y), texte, font=fnt)
    d.rounded_rectangle((b[0] - 16, b[1] - 9, b[2] + 16, b[3] + 9), radius=6, fill=fond)
    d.text((x, y), texte, font=fnt, fill=encre)


def filigrane(img, couleur, alpha):
    """Logo inerWeb + cartouche Studio + by inerweb.fr, pâle, trois exemplaires dont un au centre."""
    m = Image.new("RGBA", (420, 140), (0, 0, 0, 0))
    d = ImageDraw.Draw(m)
    d.text((0, 10), "iner", font=police("trebucbd.ttf", 52), fill=couleur)
    x = d.textlength("iner", font=police("trebucbd.ttf", 52))
    d.text((x + 2, 4), "Web", font=police("segoesc.ttf", 50), fill=couleur)
    d.line((0, 78, 220, 78), fill=(232, 145, 74), width=4)
    d.rounded_rectangle((240, 14, 350, 50), radius=7, fill=(232, 145, 74))
    d.text((295, 32), "Studio", font=police("trebucbd.ttf", 22), fill=(255, 255, 255), anchor="mm")
    d.text((0, 88), "by inerweb.fr", font=police("trebucbd.ttf", 30), fill=couleur)
    a = m.split()[3].point(lambda v: int(v * alpha))
    m.putalpha(a)
    m = m.rotate(12, expand=True, resample=Image.BICUBIC)
    for cx, cy, k in ((W // 2, H // 2 + 40, 0.75), (170, 1040, 0.55), (650, 900, 0.5)):
        t = m.resize((int(m.width * k), int(m.height * k)), Image.LANCZOS)
        img.alpha_composite(t, (cx - t.width // 2, cy - t.height // 2))


def aventuriers():
    img = Image.open(ICI / "peinture-aventuriers.webp").convert("RGBA").resize((W, H), Image.LANCZOS)
    filigrane(img, (27, 58, 99, 255), 0.11)
    d = ImageDraw.Draw(img)
    brun, orange = (122, 74, 30), (200, 104, 44)
    cartouche(d, 92, "CARNET D’EXPÉDITION", police("trebucbd.ttf", 26), orange, (255, 248, 236))
    fnt = police("georgiab.ttf", 84)
    centre(d, 160, "Les Aventuriers", fnt, brun)
    centre(d, 262, "du Froid", fnt, brun)
    # pointillés d'itinéraire sous le titre
    for x in range(250, 551, 22):
        d.line((x, 400, x + 11, 400), fill=orange, width=4)
    centre(d, 424, "Autour du groupe d’une chambre froide", police("georgiai.ttf", 30), brun)
    img.convert("RGB").save(SORTIE / "gestes-aventuriers-du-froid.webp", quality=82)


def mission():
    img = Image.open(ICI / "peinture-mission.webp").convert("RGBA").resize((W, H), Image.LANCZOS)
    filigrane(img, (255, 255, 255, 255), 0.10)
    d = ImageDraw.Draw(img)
    rouge, blanc = (217, 56, 46), (248, 246, 240)
    cartouche(d, 70, "OPÉRATION ZÉRO FUITE", police("trebucbd.ttf", 26), rouge, blanc)
    fnt = police("seguibl.ttf", 136)
    centre(d, 110, "MISSION", fnt, blanc)
    centre(d, 250, "CLIM", fnt, blanc)
    # tampon CONFIDENTIEL, dans le bleu, au-dessus du faisceau
    t = Image.new("RGBA", (420, 110), (0, 0, 0, 0))
    dt = ImageDraw.Draw(t)
    dt.rounded_rectangle((6, 6, 414, 104), radius=10, outline=rouge, width=6)
    dt.rounded_rectangle((16, 16, 404, 94), radius=6, outline=rouge, width=2)
    dt.text((210, 56), "CONFIDENTIEL", font=police("seguibl.ttf", 52), fill=rouge, anchor="mm")
    t = t.rotate(7, expand=True, resample=Image.BICUBIC)
    t = t.resize((int(t.width * 0.72), int(t.height * 0.72)), Image.LANCZOS)
    img.alpha_composite(t, (W - t.width - 40, 430))
    img.convert("RGB").save(SORTIE / "gestes-mission-clim.webp", quality=82)


aventuriers()
mission()
print("ok")
