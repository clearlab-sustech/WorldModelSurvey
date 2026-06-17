#!/usr/bin/env python3
from pathlib import Path
import html as html_module
import json
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "website"


def main():
    html = (SITE / "index.html").read_text(encoding="utf-8")
    probe = """
window.addEventListener("load", () => {
  const stateButton = document.querySelector('[data-filter="state-space"]');
  stateButton.click();
  const hiddenAfterState = document.querySelectorAll(".resource-card.hidden").length;
  const visibleAfterState = Array.from(document.querySelectorAll(".resource-card"))
    .filter((card) => !card.classList.contains("hidden"))
    .map((card) => card.dataset.category);

  const allButton = document.querySelector('[data-filter="all"]');
  allButton.click();
  const hiddenAfterAll = document.querySelectorAll(".resource-card.hidden").length;

  document.body.setAttribute("data-interaction-report", JSON.stringify({
    hiddenAfterState,
    visibleAfterState,
    hiddenAfterAll,
    activeFilter: document.querySelector(".filter-button.active").dataset.filter,
    totalCards: document.querySelectorAll(".resource-card").length
  }));
});
"""
    check_path = SITE / ".interaction-check.html"
    check_path.write_text(html.replace("</body>", f"<script>{probe}</script></body>"), encoding="utf-8")

    command = [
        "google-chrome",
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=1000,900",
        "--virtual-time-budget=1500",
        "--dump-dom",
        check_path.as_uri(),
    ]
    result = subprocess.run(
        command,
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    check_path.unlink(missing_ok=True)

    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        sys.exit(result.returncode)

    marker = 'data-interaction-report="'
    if marker not in result.stdout:
        raise AssertionError("interaction report missing from DOM dump")

    report = result.stdout.split(marker, 1)[1].split('"', 1)[0]
    data = json.loads(html_module.unescape(report))

    if data["hiddenAfterState"] == 0:
        raise AssertionError("state filter did not hide non-state cards")
    if not data["visibleAfterState"]:
        raise AssertionError("state filter hid every card")
    if data["totalCards"] != 58:
        raise AssertionError(f"expected 58 rendered resource cards: {data}")
    if any("state-space" not in category.split() for category in data["visibleAfterState"]):
        raise AssertionError(f"state filter showed wrong cards: {data}")
    if data["hiddenAfterAll"] != 0:
        raise AssertionError("all filter did not restore every card")
    if data["activeFilter"] != "all":
        raise AssertionError("active filter state did not return to all")

    print("interaction checks passed")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as error:
        print(f"interaction checks failed: {error}", file=sys.stderr)
        sys.exit(1)
