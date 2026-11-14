
import re
import shutil
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

from PIL import Image, ImageOps

SOURCE = Path(".")
SITE = Path("_site")
QUALITY = 82

IGNORE = shutil.ignore_patterns(
    ".git",
    ".github",
    ".venv",
    "__pycache__",
    "_site"
)


def prepare_site():
    """Crée une copie propre du site à optimiser."""
    if SITE.exists():
        shutil.rmtree(SITE)

    shutil.copytree(SOURCE, SITE, ignore=IGNORE)


def convert_images():
    """Convertit toutes les images JPG/JPEG en WebP."""
    converted = 0
    saved = 0

    for image_path in SITE.rglob("*"):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in (".jpg", ".jpeg"):
            continue

        output_path = image_path.with_suffix(".webp")
        original_size = image_path.stat().st_size

        with Image.open(image_path) as image:
            image = ImageOps.exif_transpose(image)

            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGB")

            image.save(
                output_path,
                "WEBP",
                quality=QUALITY,
                method=6
            )

        new_size = output_path.stat().st_size
        saved += original_size - new_size
        converted += 1

        print(
            f"✓ {image_path.relative_to(SITE)} "
            f"({original_size // 1024} KB → "
            f"{new_size // 1024} KB)"
        )

    print(f"\n{converted} images converties.")
    print(f"Économie : {saved / 1024 / 1024:.2f} MB")


def convert_reference(value):
    """Remplace une référence JPG par WebP si le fichier existe."""

    # Ignore les URL externes et les références particulières
    if value.startswith((
        "http://", "https://", "//", "data:", "blob:", "#"
    )):
        return value

    parsed = urlsplit(value)
    image_path = parsed.path

    if not image_path.lower().endswith((".jpg", ".jpeg")):
        return value

    # Les chemins du portfolio sont relatifs à la racine du site
    local_path = SITE / image_path.lstrip("/")

    webp_path = local_path.with_suffix(".webp")

    if not webp_path.is_file():
        print(f"⚠ WebP introuvable : {value}")
        return value

    new_url = str(Path(image_path).with_suffix(".webp")).replace("\\", "/")

    # Conserve les éventuels paramètres et ancres
    return urlunsplit((
        parsed.scheme,
        parsed.netloc,
        new_url,
        parsed.query,
        parsed.fragment
    ))


def update_javascript():
    """Met à jour les références d'images dans les fichiers JS."""

    # Capture les chaînes de caractères entre guillemets
    pattern = re.compile(
        r"""(?P<quote>["'])(?P<value>[^"'\\]*(?:\\.[^"'\\]*)*)(?P=quote)"""
    )

    modified = 0

    for js_file in SITE.rglob("*.js"):
        content = js_file.read_text(encoding="utf-8")

        def replace(match):
            nonlocal modified

            old_value = match.group("value")

            # Évite de toucher aux chaînes avec échappements
            if "\\" in old_value:
                return match.group(0)

            new_value = convert_reference(old_value)

            if new_value != old_value:
                modified += 1
                print(f"↻ {old_value} → {new_value}")

            quote = match.group("quote")
            return f"{quote}{new_value}{quote}"

        updated = pattern.sub(replace, content)

        if updated != content:
            js_file.write_text(updated, encoding="utf-8")

    print(f"\n{modified} références JavaScript modifiées.")


if __name__ == "__main__":
    prepare_site()
    convert_images()
    update_javascript()

    print("\nOptimisation terminée !")