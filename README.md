# Understanding World Models: A Tutorial Perspective

This repository hosts the survey manuscript and companion website for
**Understanding World Models: A Tutorial Perspective**.

The project organizes recent world-modeling work for embodied intelligence
around a central question: what is predicted, in which representation space is
prediction performed, and how can predicted futures be connected to executable
robot behavior?

## Website

Live site:

```text
https://xiaoxiongzzzz.github.io/WorldModeSurvey/
```

The companion website is a static single-page site in [`website/`](website/).
It includes:

- a tutorial overview of world models and world action models;
- figures from the survey for the main taxonomy;
- a resource browser covering the deduplicated works listed in the survey;
- filters for observation-space world models, state-space world models, and
  world action model paradigms;
- PDF and BibTeX links for the manuscript.

GitHub Pages is configured through
[`.github/workflows/pages.yml`](.github/workflows/pages.yml). On every push to
`main`, the workflow publishes the contents of `website/` as the project page.

## Survey Scope

The survey first defines the *world* as a task-dependent set of relevant
entities, then treats a *world model* as an action-conditioned predictive model
of how task-relevant aspects of that world evolve.

The taxonomy separates world models into two broad formulations:

- **Observation-space world models** directly predict future observations, such
  as RGB frames, multi-view RGB, RGB-D observations, or point clouds. The survey
  further characterizes them by observation explicitness and action abstraction.
- **State-space world models** first abstract observations into a compact state
  representation, then predict future evolution in that state space. The survey
  groups representative states into latent states, point tracks,
  neural-symbolic predicates, and physical states.

The survey then introduces **world action models**, which connect visual future
prediction with executable robot actions. We organize existing approaches into
four paradigms:

- imagine-then-execute;
- video-feature-conditioned action prediction;
- joint video-action modeling;
- auxiliary video prediction for policy learning.

## Repository Layout

```text
.
├── example_paper.tex      # Main LaTeX entry point
├── sections/              # Survey sections
├── figs/                  # Source figures used by the paper
├── reference.bib          # Bibliography
├── website/               # Static companion website
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/            # Website PDFs and PNG figure exports
├── tests/                 # Lightweight website checks
└── docs/plans/            # Design and implementation notes
```

## Local Preview

The website can be opened directly from `website/index.html`, or served locally:

```bash
python3 -m http.server 8000 --directory website
```

Then visit:

```text
http://localhost:8000
```

## Checks

The repository includes small Python checks for website content and interaction
behavior:

```bash
python3 tests/check_website.py
python3 tests/check_interactions.py
python3 tests/check_copy_button.py
python3 tests/check_layout.py
```

## Citation

```bibtex
@article{zhang2026understandingworldmodels,
  title   = {Understanding World Models: A Tutorial Perspective},
  author  = {Zhang, Xiaoxiong and Zhang, Wei},
  year    = {2026},
  note    = {Survey manuscript}
}
```

## Contact

Suggestions, taxonomy improvements, missing papers, and discussion are welcome.
Please contact:

```text
12433017@mail.sustech.edu.cn
```
