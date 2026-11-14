
import re
import shutil
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, unquote

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
    """Convertit les JPG/JPEG en WebP et conserve le format le plus léger."""
    converted = 0
    deleted_jpg = 0
    kept_jpg = 0
    saved = 0

    for image_path in SITE.rglob("*"):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in (".jpg", ".jpeg"):
            continue

        output_path = image_path.with_suffix(".webp")
        original_size = image_path.stat().st_size

        try:
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
            converted += 1

            if new_size < original_size:
                # Le WebP est plus léger : on supprime le JPG
                image_path.unlink()
                deleted_jpg += 1
                saved += original_size - new_size

                print(
                    f"✓ {image_path.relative_to(SITE)} "
                    f"({original_size // 1024} KB → "
                    f"{new_size // 1024} KB) — JPG supprimé"
                )

            else:
                # Le WebP est plus lourd : on conserve le JPG
                output_path.unlink()
                kept_jpg += 1

                print(
                    f"↪ {image_path.relative_to(SITE)} "
                    f"({original_size // 1024} KB → "
                    f"{new_size // 1024} KB) — JPG conservé"
                )

        except Exception as error:
            print(f"✗ Erreur sur {image_path}: {error}")

    print(f"\n{converted} images traitées.")
    print(f"{deleted_jpg} JPG supprimés.")
    print(f"{kept_jpg} JPG conservés.")
    print(f"Économie totale : {saved / 1024 / 1024:.2f} MB")


def update_javascript():
    # Détecte les chemins JPG/JPEG dans les chaînes JavaScript
    pattern = re.compile(
        r"""(?P<quote>["'])(?P<path>[^"']+\.(?:jpg|jpeg)(?:[?#][^"']*)?)(?P=quote)""",
        re.IGNORECASE
    )

    js_files = list(SITE.rglob("*.js"))

    print(f"\nFichiers JavaScript trouvés : {len(js_files)}")

    total_detected = 0
    total_modified = 0

    for js_file in js_files:
        content = js_file.read_text(encoding="utf-8")

        detected = 0
        modified = 0

        def replace_reference(match):
            nonlocal detected, modified

            original_path = match.group("path")
            quote = match.group("quote")

            # Séparer le chemin du éventuel query string / fragment
            path_part, suffix = re.match(
                r"^([^?#]*)(.*)$", original_path
            ).groups()

            detected += 1

            # Ignorer les URL externes et chemins spéciaux
            if "://" in path_part or path_part.startswith(("data:", "blob:")):
                return match.group(0)

            # Rechercher le WebP correspondant
            local_path = SITE / unquote(path_part).lstrip("/")
            webp_path = local_path.with_suffix(".webp")

            if not webp_path.is_file():
                return match.group(0)

            new_path = str(Path(path_part).with_suffix(".webp")) + suffix

            modified += 1
            return f"{quote}{new_path}{quote}"

        new_content = pattern.sub(replace_reference, content)

        total_detected += detected
        total_modified += modified

        if new_content != content:
            js_file.write_text(new_content, encoding="utf-8")

        print(
            f"{js_file}: "
            f"{detected} références JPG trouvées, "
            f"{modified} modifiées"
        )

    print(f"\nTotal références JPG détectées : {total_detected}")
    print(f"Total références modifiées : {total_modified}")



if __name__ == "__main__":
    prepare_site()
    convert_images()
    update_javascript()

    print("\nOptimisation terminée !")