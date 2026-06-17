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
  const originalExecCommand = document.execCommand;
  let execCalled = false;
  document.execCommand = () => {
    execCalled = true;
    return true;
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText = () => Promise.reject(new Error("forced fallback"));
  }
  const button = document.getElementById("copy-bibtex");
  button.click();
  window.setTimeout(() => {
    document.body.setAttribute("data-copy-report", JSON.stringify({
      buttonText: button.textContent,
      hasBibtex: document.getElementById("bibtex").textContent.includes("zhang2026understandingworldmodels"),
      execCalled,
      hasClipboard: Boolean(navigator.clipboard && navigator.clipboard.writeText),
      secureContext: window.isSecureContext,
      scriptLoaded: Boolean(button)
    }));
    document.execCommand = originalExecCommand;
  }, 100);
});
"""
    check_path = SITE / ".copy-check.html"
    check_path.write_text(html.replace("</body>", f"<script>{probe}</script></body>"), encoding="utf-8")

    command = [
        "google-chrome",
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=1000,900",
        "--virtual-time-budget=2000",
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

    marker = 'data-copy-report="'
    if marker not in result.stdout:
        raise AssertionError("copy report missing from DOM dump")

    report = result.stdout.split(marker, 1)[1].split('"', 1)[0]
    data = json.loads(html_module.unescape(report))

    if data["buttonText"] != "Copied":
        raise AssertionError(f"copy button did not update state: {data}")
    if not data["hasBibtex"]:
        raise AssertionError("BibTeX text missing expected citation key")

    print("copy button checks passed")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as error:
        print(f"copy button checks failed: {error}", file=sys.stderr)
        sys.exit(1)
