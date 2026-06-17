# World Model Survey Website Design

## Goal

Build a static academic website for the survey "Understanding World Models: A Tutorial Perspective" that presents the paper as a readable tutorial map over world models and world action models.

## Context

The source project is a LaTeX paper folder. The current paper content includes the title, authors, affiliations, definitions, taxonomy text, a BibTeX file, a compiled PDF, and four central figures:

- `figs/overview.pdf`
- `figs/obsWM.pdf`
- `figs/stateWM.pdf`
- `figs/wam.pdf`

The existing `sections/abstract.tex` and `sections/intro.tex` are still template placeholders, so the website should derive its summary copy from `sections/def.tex`, `sections/design.tex`, and `sections/wam.tex` rather than reusing the placeholder abstract.

## Chosen Approach

Create a static single-page website in `website/` using plain HTML, CSS, and a small amount of JavaScript. This keeps deployment simple and makes the site suitable for GitHub Pages or local browser viewing without a build step.

The design may reference the structure of `https://ntumars.github.io/wm-robot-survey/`, but it should not copy it. The page should feel like a tutorial-oriented research map: compact, polished, and content-forward, with the paper figures as the primary visual assets.

## Information Architecture

The page will use these sections:

1. Hero
   - Paper title
   - Authors and affiliations
   - Short tutorial-oriented summary
   - Buttons for PDF, BibTeX, figures, and taxonomy
   - Overview figure as the first-viewport visual signal

2. Core Definitions
   - Concise explanations of "world", "world model", and "world action model"
   - Mathematical formulas from the paper in lightweight HTML

3. Design Space
   - Observation-space world models with `obsWM.pdf`
   - State-space world models with `stateWM.pdf`
   - Short comparison of the axes and trade-offs

4. World Action Models
   - `wam.pdf`
   - Four paradigms: imagine-then-execute, video-feature-conditioned action prediction, joint video-action modeling, auxiliary video prediction for policy learning

5. Resource Browser
   - Compact list of representative works parsed from `reference.bib`
   - Category filters for the major groups used in the survey
   - Links to arXiv/blog URLs when present

6. Citation
   - Copyable BibTeX block for the survey

## Visual Direction

Use a light academic palette with restrained accent colors. Avoid matching the reference site too closely. The first screen should expose the paper identity and the overview figure, with a hint of the following content visible. Cards may be used for repeated paper/resource items, but large page sections should remain full-width bands or unframed layouts.

The design should prioritize readability over decorative effects:

- Fixed-width content column for prose
- Wider layout for figures and taxonomy sections
- Sticky or compact top navigation
- Responsive layout for mobile
- No marketing-style hero cards, gradient blobs, or decorative SVG illustrations

## Implementation Notes

Use `website/assets/` for copied figures and PDF assets. Browsers generally display PDFs in `img` elements inconsistently, so create PNG previews from the PDF figures for the page, while retaining links to the original PDFs.

The website should work by opening `website/index.html` directly. JavaScript should be small and optional: filtering resources, copy BibTeX, and active navigation state.

## Verification

Verification should include:

- Open `website/index.html` locally or through a simple static server.
- Check that assets load.
- Check that resource filters work.
- Check responsive layout at desktop and mobile widths.
- Verify the copy button updates state.
- Confirm there are no console errors.

