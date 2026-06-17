#!/usr/bin/env python3
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
SCREENSHOT = Path("/tmp/world-model-site-layout-check.png")
REPORT = Path("/tmp/world-model-site-layout-report.txt")


def main():
    js = """
const totalWidth = Math.max(
  document.documentElement.scrollWidth,
  document.body.scrollWidth
);
const viewport = window.innerWidth;
const offenders = Array.from(document.body.querySelectorAll("*"))
  .filter((el) => el.getBoundingClientRect().right > viewport + 1)
  .slice(0, 12)
  .map((el) => {
    const rect = el.getBoundingClientRect();
    const name = el.tagName.toLowerCase();
    const id = el.id ? "#" + el.id : "";
    const cls = el.className && typeof el.className === "string"
      ? "." + el.className.trim().replace(/\\s+/g, ".")
      : "";
    return `${name}${id}${cls}:${Math.round(rect.right)}`;
  });
document.body.setAttribute("data-overflow-report", JSON.stringify({
  viewport,
  totalWidth,
  offenders
}));
"""
    html = (ROOT / "website" / "index.html").read_text(encoding="utf-8")
    injected = html.replace("</body>", f"<script>{js}</script></body>")
    data_path = ROOT / "website" / ".layout-check.html"
    data_path.write_text(injected, encoding="utf-8")

    dump_command = [
        "google-chrome",
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=390,1200",
        "--dump-dom",
        data_path.as_uri(),
    ]
    result = subprocess.run(
        dump_command,
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    data_path.unlink(missing_ok=True)
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        sys.exit(result.returncode)

    marker = 'data-overflow-report="'
    if marker not in result.stdout:
        raise AssertionError("overflow report missing from DOM dump")
    report = result.stdout.split(marker, 1)[1].split('"', 1)[0]
    REPORT.write_text(report, encoding="utf-8")
    print(report)

    import html as html_module
    import json

    decoded = html_module.unescape(report)
    data = json.loads(decoded)
    if data["totalWidth"] > data["viewport"] + 1:
      raise AssertionError(f"horizontal overflow: {decoded}")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as error:
        print(f"layout check failed: {error}", file=sys.stderr)
        sys.exit(1)
