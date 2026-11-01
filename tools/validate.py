#!/usr/bin/env python3
"""Checks every theme: schema, features against the engine, files, sizes and paths.

Usage: python3 tools/validate.py            (exit code 1 when anything is wrong)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAX_THEME_BYTES = 12 * 1024 * 1024
MAX_FILE_BYTES = 6 * 1024 * 1024
SHIPPED = {"theme.json", "preview.png", "elements.png"}  # plus wallpapers/ and fonts/


def engine_features():
    engines = json.loads((ROOT / "engine" / "features.json").read_text())["engines"]
    known, upto = set(), {}
    for number in sorted(engines, key=int):
        known |= set(engines[number]["features"])
        upto[int(number)] = set(known)
    return engines, upto


def check(theme_dir, schema, upto):
    problems = []
    data = json.loads((theme_dir / "theme.json").read_text())
    if schema is not None:
        import jsonschema
        for error in jsonschema.Draft202012Validator(schema).iter_errors(data):
            problems.append(f"schema: {'/'.join(map(str, error.path))}: {error.message}")
    if data.get("id") != theme_dir.name:
        problems.append(f"id {data.get('id')!r} must match its folder {theme_dir.name!r}")
    engine = data.get("engine", 0)
    if engine not in upto:
        problems.append(f"engine {engine} is not described in engine/features.json")
    else:
        missing = set(data.get("requires", [])) - upto[engine]
        if missing:
            problems.append(f"requires features engine {engine} does not have: {', '.join(sorted(missing))}")
        unknown = set(data.get("prefers", [])) - upto[max(upto)]
        if unknown:
            problems.append(f"prefers unknown features: {', '.join(sorted(unknown))}")
    for item in data.get("wallpapers", []):
        if not (theme_dir / item["file"]).is_file():
            problems.append(f"missing wallpaper {item['file']}")
    for name, font in data.get("fonts", {}).items():
        if font.startswith("file:") and not (theme_dir / font[5:]).is_file():
            problems.append(f"missing font {font[5:]}")
    if data.get("preview") and not (theme_dir / data["preview"]).is_file():
        problems.append(f"missing preview {data['preview']}")
    total = 0
    for path in theme_dir.rglob("*"):
        if path.is_dir() or "art" in path.relative_to(theme_dir).parts:
            continue
        relative = path.relative_to(theme_dir).as_posix()
        if not re.fullmatch(r"[a-z0-9./-]+", relative) or ".." in relative:
            problems.append(f"file name not allowed: {relative}")
        size = path.stat().st_size
        total += size
        if size > MAX_FILE_BYTES:
            problems.append(f"{relative} is {size // 1024} KB; the limit is {MAX_FILE_BYTES // 1024} KB")
    if total > MAX_THEME_BYTES:
        problems.append(f"theme is {total // 1024} KB; the limit is {MAX_THEME_BYTES // 1024} KB")
    return data, problems


def main():
    try:
        schema = json.loads((ROOT / "schema" / "theme.schema.json").read_text())
        import jsonschema  # noqa: F401
    except ImportError:
        print("note: jsonschema is not installed, so the schema check is skipped (pip install jsonschema)")
        schema = None
    _, upto = engine_features()
    failed = False
    for theme_dir in sorted(p for p in (ROOT / "themes").iterdir() if p.is_dir()):
        data, problems = check(theme_dir, schema, upto)
        print(f"{'FAIL' if problems else 'ok  '} {theme_dir.name} v{data.get('version')} (engine {data.get('engine')})")
        for problem in problems:
            print(f"     - {problem}")
        failed |= bool(problems)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
