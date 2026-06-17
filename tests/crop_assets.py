#!/usr/bin/env python3
from pathlib import Path
import sys

from PIL import Image, ImageChops


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "website" / "assets"
TARGETS = ["overview.png", "stateWM.png"]


def content_bbox(image):
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, background)
    mask = diff.point(lambda value: 255 if value > 12 else 0)
    return mask.getbbox()


def crop_image(path):
    image = Image.open(path).convert("RGB")
    bbox = content_bbox(image)
    if not bbox:
        raise AssertionError(f"no non-white content detected in {path}")

    width, height = image.size
    left, top, right, bottom = bbox
    pad_x = max(24, int((right - left) * 0.04))
    pad_y = max(24, int((bottom - top) * 0.08))
    crop_box = (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(width, right + pad_x),
        min(height, bottom + pad_y),
    )
    cropped = image.crop(crop_box)
    cropped.save(path, optimize=True)
    return image.size, cropped.size


def main():
    for filename in TARGETS:
        original, cropped = crop_image(ASSETS / filename)
        original_area = original[0] * original[1]
        cropped_area = cropped[0] * cropped[1]
        if cropped_area >= original_area * 0.9:
            raise AssertionError(f"{filename} was not meaningfully cropped: {original} -> {cropped}")
        if cropped[0] < 400 or cropped[1] < 250:
            raise AssertionError(f"{filename} crop is suspiciously small: {cropped}")
        print(f"{filename}: {original} -> {cropped}")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as error:
        print(f"asset crop failed: {error}", file=sys.stderr)
        sys.exit(1)
