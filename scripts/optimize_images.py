#!/usr/bin/env python3
"""Shrink site images so pages load fast.

For every JPEG/PNG under assets/images/:
  * images larger than MAX_EDGE px on their long edge are resized down,
  * camera metadata (EXIF: camera model, Lightroom info, possibly GPS) is removed,
  * JPEGs are saved as progressive JPEG at QUALITY.

For every photo in assets/images/gallery/ a small thumbnail is also written to
assets/images/gallery/thumbs/ (used by the Photography page grid).

Images that are already small enough and carry no metadata are left untouched,
so running the script again does not re-compress (and degrade) them.

Usage:  python3 scripts/optimize_images.py            # optimize in place
        python3 scripts/optimize_images.py --dry-run  # only report
Requires Pillow:  pip install Pillow   (or: sudo apt install python3-pil)
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "assets" / "images"
MAX_EDGE = 2000
QUALITY = 82
SKIP_DIRS = {"thumbs"}  # generated thumbnails
GALLERY = IMAGES / "gallery"
THUMBS = GALLERY / "thumbs"
THUMB_EDGE = 800
THUMB_QUALITY = 78


def optimize(path: Path, dry_run: bool) -> None:
    with Image.open(path) as img:
        too_big = max(img.size) > MAX_EDGE
        has_meta = bool(img.getexif())
        if not (too_big or has_meta):
            return
        before = path.stat().st_size
        # Apply the EXIF rotation to the pixels before the EXIF is dropped.
        out = ImageOps.exif_transpose(img)
        out.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        icc = img.info.get("icc_profile")
        if dry_run:
            print(f"would optimize {path.relative_to(ROOT)}  {img.size} -> {out.size}")
            return
        if path.suffix.lower() in {".jpg", ".jpeg"}:
            out = out.convert("RGB")
            out.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True, icc_profile=icc)
        else:
            out.save(path, optimize=True, icc_profile=icc)
    after = path.stat().st_size
    print(f"optimized {path.relative_to(ROOT)}  {before/1e6:.2f} MB -> {after/1e6:.2f} MB")


def make_thumb(path: Path, dry_run: bool) -> None:
    thumb = THUMBS / path.name
    if thumb.exists() and thumb.stat().st_mtime >= path.stat().st_mtime:
        return
    if dry_run:
        print(f"would create {thumb.relative_to(ROOT)}")
        return
    THUMBS.mkdir(parents=True, exist_ok=True)
    with Image.open(path) as img:
        out = ImageOps.exif_transpose(img).convert("RGB")
        out.thumbnail((THUMB_EDGE, THUMB_EDGE), Image.LANCZOS)
        out.save(thumb, "JPEG", quality=THUMB_QUALITY, optimize=True, progressive=True)
    print(f"thumbnail {thumb.relative_to(ROOT)}")


def remove_orphan_thumbs(dry_run: bool) -> None:
    if not THUMBS.exists():
        return
    for thumb in THUMBS.iterdir():
        if not (GALLERY / thumb.name).exists():
            print(f"{'would remove' if dry_run else 'removed'} orphan {thumb.relative_to(ROOT)}")
            if not dry_run:
                thumb.unlink()


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    for path in sorted(IMAGES.rglob("*")):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        if SKIP_DIRS & set(path.relative_to(IMAGES).parts):
            continue
        optimize(path, dry_run)
        if path.parent == GALLERY:
            make_thumb(path, dry_run)
    remove_orphan_thumbs(dry_run)


if __name__ == "__main__":
    main()
