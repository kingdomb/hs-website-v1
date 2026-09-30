#!/usr/bin/env python3
"""Write responsive WebP variants to src/assets/img/<name>-<width>.webp.

Never upscales. Add a line to SOURCES to publish another image, then re-run:
    python3 scripts/optimize-images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'assets' / 'img'
WIDTHS = (480, 960, 1600)

# name -> source path relative to repo root
SOURCES = {
    'hero-dove': 'src/assets/spirit-of-baptism-bird-jumbotron-1500x1000-bluegrade.jpg',
    'dove': 'images/spirit-of-baptism-bird.jpg',
    'woman-praying': 'images/holyspirit-thumbnail-female.jpg',
    'surrender': 'images/surrender-male3.jpg',
    'open-door': 'images/open-door1.jpg',
    'light-figure': 'images/jesus-light.jpg',
    'worship-service': 'src/assets/worshiping-service-cross-1280x720_bottom-preserved.webp',
    'meals-handout': 'src/assets/meals-handout.webp',
    'thanksgiving-meal': 'src/assets/thanksgiving-meal.webp',
    'christmas-meal': 'src/assets/christmas-meal.jpg',
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, rel in SOURCES.items():
        src = Image.open(ROOT / rel).convert('RGB')
        widths = sorted({min(w, src.width) for w in WIDTHS})
        for w in widths:
            h = round(src.height * w / src.width)
            path = OUT / f'{name}-{w}.webp'
            src.resize((w, h), Image.LANCZOS).save(path, 'WEBP', quality=80, method=6)
            print(f'{path.relative_to(ROOT)}  {w}x{h}  {path.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
