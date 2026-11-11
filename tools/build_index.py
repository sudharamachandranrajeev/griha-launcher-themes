#!/usr/bin/env python3
"""Packs themes for a release and writes dist/index.json.

Every theme gets a wallpaper pack (a ZIP of its pictures, which Griha can already import).
A theme package (<id>-<version>.griha-theme) is built only when its engine is released, so
Griha never lists a theme it cannot draw.

Usage: python3 tools/build_index.py <release-tag>
"""
import hashlib
import json
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
REPO = "sudharamachandranrajeev/griha-launcher-themes"
STAMP = (1980, 1, 1, 0, 0, 0)  # fixed times make the same files give the same ZIP


def pack(target, files):
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for name, path in sorted(files):
            info = zipfile.ZipInfo(name, STAMP)
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, path.read_bytes())
    return hashlib.sha256(target.read_bytes()).hexdigest(), target.stat().st_size


def main():
    tag = sys.argv[1] if len(sys.argv) > 1 else "local"
    engines = json.loads((ROOT / "engine" / "features.json").read_text())["engines"]
    released = {int(n) for n, e in engines.items() if e.get("status") == "released"}
    DIST.mkdir(exist_ok=True)
    for old in DIST.iterdir():
        old.unlink()
    url = f"https://github.com/{REPO}/releases/download/{tag}/"
    index = {"format": 1, "release": tag, "themes": []}
    for theme_dir in sorted(p for p in (ROOT / "themes").iterdir() if p.is_dir()):
        data = json.loads((theme_dir / "theme.json").read_text())
        entry = {k: data.get(k) for k in ("id", "name", "version", "engine", "description", "requires", "prefers")}
        pictures = [(Path(w["file"]).name, theme_dir / w["file"]) for w in data.get("wallpapers", [])]
        if pictures:
            name = f"{data['id']}-wallpapers.zip"
            sha, size = pack(DIST / name, pictures)
            entry["wallpapers"] = {"url": url + name, "sha256": sha, "size": size}
        preview = theme_dir / data.get("preview", "preview.png")
        if preview.is_file():
            name = f"{data['id']}-preview.png"
            (DIST / name).write_bytes(preview.read_bytes())
            entry["preview"] = url + name
        if any(engine >= data["engine"] for engine in released):  # engines only ever add features
            files = [(p.relative_to(theme_dir).as_posix(), p) for p in theme_dir.rglob("*")
                     if p.is_file() and "art" not in p.relative_to(theme_dir).parts]
            name = f"{data['id']}-{data['version']}.griha-theme"
            sha, size = pack(DIST / name, files)
            entry["package"] = {"url": url + name, "sha256": sha, "size": size}
            entry["status"] = "available"
        else:
            entry["status"] = f"waiting for theme engine {data['engine']}"
        index["themes"].append(entry)
        print(f"{data['id']}: {entry['status']}")
    (DIST / "index.json").write_text(json.dumps(index, indent=2) + "\n")


if __name__ == "__main__":
    main()
