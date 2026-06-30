#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
import json
import sys


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "website"


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.scripts = []
        self.stylesheets = []
        self.images = []
        self.filter_buttons = 0
        self.copy_buttons = 0
        self.scripts_by_id = {}
        self._current_script_id = None
        self._current_script_data = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
        if tag == "script" and attrs.get("id"):
            self._current_script_id = attrs["id"]
            self._current_script_data = []
        if tag == "link" and attrs.get("rel") == "stylesheet" and attrs.get("href"):
            self.stylesheets.append(attrs["href"])
        if tag == "img" and attrs.get("src"):
            self.images.append(attrs["src"])
        classes = attrs.get("class", "")
        if tag == "button" and "filter-button" in classes:
            self.filter_buttons += 1
        if tag == "button" and attrs.get("id") == "copy-bibtex":
            self.copy_buttons += 1

    def handle_data(self, data):
        if self._current_script_id:
            self._current_script_data.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._current_script_id:
            self.scripts_by_id[self._current_script_id] = "".join(self._current_script_data)
            self._current_script_id = None
            self._current_script_data = []


def is_local(path):
    return not (
        path.startswith("#")
        or path.startswith("http://")
        or path.startswith("https://")
        or path.startswith("mailto:")
    )


def main():
    html_path = SITE / "index.html"
    if not html_path.exists():
        raise AssertionError("website/index.html is missing")

    parser = SiteParser()
    parser.feed(html_path.read_text(encoding="utf-8"))

    required_ids = {
        "overview",
        "introduction",
        "design-space",
        "world-action-models",
        "resources",
        "contact",
        "citation",
    }
    missing_ids = required_ids - parser.ids
    assert not missing_ids, f"missing section ids: {sorted(missing_ids)}"

    assert parser.filter_buttons >= 5, "expected at least five resource filter buttons"
    assert parser.copy_buttons == 1, "expected one BibTeX copy button"

    required_assets = [
        "assets/Understanding_World_Models__A_Tutorial_Perspective.pdf",
        "assets/overview.png",
        "assets/obsWM.png",
        "assets/stateWM.png",
        "assets/wam.png",
        "assets/world.png",
        "assets/two_tasks.png",
        "assets/policy_all.png",
        "assets/world_model.png",
        "assets/world_model_examples.png",
        "styles.css",
        "script.js",
    ]
    for asset in required_assets:
        assert (SITE / asset).exists(), f"required asset missing: {asset}"

    local_refs = parser.images + parser.scripts + parser.stylesheets
    local_refs.extend(path for path in parser.links if is_local(path))
    missing_refs = [
        ref
        for ref in local_refs
        if is_local(ref) and not (SITE / ref.split("#", 1)[0]).exists()
    ]
    assert not missing_refs, f"missing referenced files: {missing_refs}"

    html = html_path.read_text(encoding="utf-8")
    assert "metric-grid" not in html, "metric snapshot section should be removed"
    assert "snapshot-title" not in html, "snapshot heading should be removed"
    assert 'class="figure-panel large"' in html, "design-space figures should use large figure panels"
    assert "taxonomy-panel reverse" not in html, "design-space should not use alternating small two-column layout"
    assert 'class="taxonomy-intro"' in html, "design-space needs a structured taxonomy introduction"
    assert 'class="taxonomy-title"' in html, "taxonomy subsections need larger title styling"
    assert 'plain-list three-column' not in html, "taxonomy bullet modules should be removed"
    for removed_text in [
        "Observation axis:",
        "Action axis:",
        "Trade-off:",
        "Latent states:",
        "Point tracks:",
        "Neural-symbolic and physical states:",
    ]:
        assert removed_text not in html, f"removed taxonomy module still present: {removed_text}"
    lower_html = html.lower()
    assert "we first divide world models into two formulations" in lower_html
    assert "observation-space world models" in lower_html
    assert "state-space world models" in lower_html
    assert "classification criteria" in lower_html

    if "resource-data" not in parser.scripts_by_id:
        raise AssertionError("resource-data JSON script is missing")
    resources = json.loads(parser.scripts_by_id["resource-data"])
    resource_ids = {resource["id"] for resource in resources}
    assert len(resources) == 58, f"expected 58 deduplicated resources, got {len(resources)}"
    assert len(resource_ids) == len(resources), "resource ids must be unique"
    missing_links = [
        resource["id"]
        for resource in resources
        if not resource.get("url") and not resource.get("eprint") and resource["id"] not in {"genie3", "rtfm"}
    ]
    assert not missing_links, f"resources missing links/eprints: {missing_links}"

    required_groups = {
        "rgb",
        "multi-view-rgb",
        "rgb-d",
        "point-cloud",
        "latent-state",
        "point-track",
        "neural-symbolic",
        "physical-state",
        "imagine-execute",
        "video-feature",
        "joint-video-action",
        "auxiliary-video",
    }
    groups = {group for resource in resources for group in resource["groups"]}
    missing_groups = required_groups - groups
    assert not missing_groups, f"missing resource groups: {sorted(missing_groups)}"
    assert any(len(resource["groups"]) > 1 for resource in resources), "expected at least one cross-listed resource"

    expected_text = [
        "From World Models to World Action Models",
        "Xiaoxiong Zhang",
        "Xiong Zeng",
        "A concise tutorial that builds from task-specific worlds",
        "📘 Introduction",
        "Embodied AI Task and Policy",
        "World Models and World Action Models",
        "🧭 World Model Design Space",
        "🔮 Observation-Space World Models",
        "🧩 State-Space World Models",
        "🤖 World Action Models",
        "📚 Resource Browser",
        "💬 Contribute to this survey",
        "✍️ Citation",
        "Observation-Space World Models",
        "State-Space World Models",
        "World Action Models",
        "Imagine-then-execute",
        "Point Cloud",
        "Auxiliary Video",
        "12433017@mail.sustech.edu.cn",
    ]
    missing_text = [text for text in expected_text if text not in html]
    assert not missing_text, f"missing expected text: {missing_text}"

    print("website checks passed")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as error:
        print(f"website checks failed: {error}", file=sys.stderr)
        sys.exit(1)
