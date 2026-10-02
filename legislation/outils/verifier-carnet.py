# -*- coding: utf-8 -*-
"""Contrôle du carnet papier (élève et professeur) — à lancer après outils/carnet-papier.mjs.
   1. Polices : plus petit corps du texte, et pages où du texte passe sous le seuil (14 pt élève, 13 pt professeur).
   2. Remplissage : jusqu'où descend le contenu de chaque page (le pied de page est écarté) ; alerte sous 80 %.
   3. QR : chaque QR de la première page d'une mission est décodé (OpenCV, indépendant du paquet qui l'a écrit)
      et comparé à l'adresse attendue (carnet/qr-attendus.json).
Usage : python legislation/outils/verifier-carnet.py [dossier carnet]   (défaut : legislation/carnet)"""
import sys, os, re, json, collections
import fitz, cv2, numpy as np
sys.stdout.reconfigure(encoding='utf-8')
dossier = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'carnet')

def polices(chemin, seuil, pied_mm):
    doc = fitz.open(chemin); n = len(doc)
    tailles = collections.Counter(); sous = collections.defaultdict(set); bas = []
    for i, page in enumerate(doc):
        h = page.rect.height; limite = h - pied_mm * 72 / 25.4
        fond = 0
        for b in page.get_text('dict')['blocks']:
            for l in b.get('lines', []):
                for s in l['spans']:
                    t = s['text'].strip()
                    if not t: continue
                    tailles[round(s['size'] * 2) / 2] += len(t)
                    if s['size'] < seuil - 0.3: sous[round(s['size'], 1)].add(i + 1)
                    if l['bbox'][3] <= limite: fond = max(fond, l['bbox'][3])
        bas.append(100 * fond / h)
    return n, tailles, sous, bas

ko = 0
import glob
fichiers = [(os.path.basename(x), 14, 20) for x in sorted(glob.glob(os.path.join(dossier, 'carnet-eleve*.pdf')))] + [('livret-professeur.pdf', 13, 18)]
for nom, seuil, pied in fichiers:
    f = os.path.join(dossier, nom)
    if not os.path.exists(f): print('absent :', nom); ko += 1; continue
    n, tailles, sous, bas = polices(f, seuil, pied)
    total = sum(tailles.values()) or 1
    print(f'== {nom} : {n} pages')
    print('   plus petit corps :', min(tailles), 'pt ; tailles principales :', ', '.join(f'{t:g} pt {100*c/total:.0f} %' for t, c in tailles.most_common(4)))
    if sous:
        ko += 1
        for t, pg in sorted(sous.items()): print(f'   ⚠ corps {t} pt (< {seuil}) sur les pages {sorted(pg)[:15]}')
    else: print(f'   OK : aucun texte sous {seuil} pt')
    creuses = [i + 1 for i, b in enumerate(bas[:-1]) if b < 80]
    print('   remplissage du TEXTE : min', f'{min(bas[:-1]):.0f} %', '· pages sous 80 % :', creuses[:20] or 'aucune', '(élève : les zones à écrire remplissent le reste, mesure indicative)' if nom.startswith('carnet') else '')
    if creuses and nom.startswith('livret'): ko += 1

# QR : le PDF complet et chaque carnet de période
att = os.path.join(dossier, 'qr-attendus.json')
if os.path.exists(att):
    attendus = json.load(open(att, encoding='utf-8')); det = cv2.QRCodeDetector()
    for f in sorted(glob.glob(os.path.join(dossier, 'carnet-eleve*.pdf'))):
        doc = fitz.open(f); vus = 0; faux = 0; numeros = set()
        for i, page in enumerate(doc):
            m = re.search(r'mission (\d+)/\d+ · recto', page.get_text())
            if not m or m.group(1) not in attendus: continue
            lu = ''
            for dpi in (200, 300, 150):
                pix = page.get_pixmap(dpi=dpi)
                img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.h, pix.w, pix.n)[:, :, :3].copy()
                h, w = img.shape[:2]
                for essai in (img[int(h * .70):h, 0:int(w * .30)].copy(), img):
                    lu, _, _ = det.detectAndDecode(essai)
                    if lu: break
                if lu: break
            vus += 1
            numeros.add(m.group(1))
            if lu != attendus[m.group(1)]: faux += 1; print(f'   QR FAUX page {i+1} : lu « {lu} » attendu « {attendus[m.group(1)]} »')
        print(f'== QR {os.path.basename(f)} : {vus} relus dans le PDF, {faux} faux')
        ko += faux > 0 or vus == 0
        if os.path.basename(f) == 'carnet-eleve.pdf' and numeros != set(attendus):
            print('   QR manquants ou inattendus :', sorted(set(attendus) ^ numeros))
            ko += 1
else:
    print('absent : qr-attendus.json'); ko += 1
sys.exit(1 if ko else 0)
