# World Model Survey Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static single-page website in `website/` for the survey "Understanding World Models: A Tutorial Perspective".

**Architecture:** The website is plain HTML, CSS, and small JavaScript. Paper figures and the compiled PDF are copied into `website/assets/`, with PNG previews generated from PDF figures for reliable rendering. The page is a tutorial-oriented academic project site with sections for definitions, taxonomy, world action models, resources, and citation.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, local shell tools for asset conversion and verification.

---

### Task 1: Prepare Website Assets

**Files:**
- Create: `website/assets/`
- Copy: `Understanding_World_Models__A_Tutorial_Perspective.pdf`
- Copy: `figs/overview.pdf`
- Copy: `figs/obsWM.pdf`
- Copy: `figs/stateWM.pdf`
- Copy: `figs/wam.pdf`
- Generate: `website/assets/overview.png`
- Generate: `website/assets/obsWM.png`
- Generate: `website/assets/stateWM.png`
- Generate: `website/assets/wam.png`

**Step 1: Create assets directory**

Run: `mkdir -p website/assets`

Expected: directory exists.

**Step 2: Copy source assets**

Run: copy the compiled paper PDF and four figure PDFs into `website/assets/`.

Expected: assets exist under `website/assets/`.

**Step 3: Generate PNG previews**

Use available local tooling such as `pdftoppm`, ImageMagick, or `convert` to generate PNG previews from the four figure PDFs.

Expected: four PNG files exist and are viewable.

### Task 2: Create Static Page

**Files:**
- Create: `website/index.html`

**Step 1: Write semantic HTML**

Create sections for:

- Header navigation
- Hero
- Core definitions
- World model design space
- World action models
- Resource browser
- Citation
- Footer

**Step 2: Use real paper content**

Use title, authors, affiliations, and concise paraphrases from:

- `sections/def.tex`
- `sections/design.tex`
- `sections/wam.tex`

Do not use the placeholder abstract from `sections/abstract.tex`.

**Step 3: Link assets**

Use PNG previews for inline images and link to PDF originals.

Expected: opening `website/index.html` renders page content and image placeholders point to existing files.

### Task 3: Style the Website

**Files:**
- Create: `website/styles.css`
- Modify: `website/index.html`

**Step 1: Add base styles**

Implement readable typography, responsive layout, full-width bands, sticky navigation, and accessible colors.

**Step 2: Style content sections**

Style hero, figure panels, definition blocks, taxonomy cards, resource table/cards, citation block, and buttons.

**Step 3: Add responsive behavior**

Use CSS grid/flex layouts that collapse cleanly on mobile. Ensure text does not overflow buttons or cards.

Expected: layout is usable on desktop and mobile widths.

### Task 4: Add Small Interactions

**Files:**
- Create: `website/script.js`
- Modify: `website/index.html`

**Step 1: Add resource filtering**

Provide category buttons for all, observation-space, state-space, world action models, and foundation/video models.

Expected: clicking a filter hides and shows the correct resource cards.

**Step 2: Add BibTeX copy button**

Use `navigator.clipboard` when available, with a fallback to selecting text.

Expected: clicking the button copies the citation and changes button text briefly.

**Step 3: Add active navigation state**

Use `IntersectionObserver` to highlight the visible section when supported.

Expected: navigation reflects the current section while scrolling.

### Task 5: Verify Static Site

**Files:**
- Read: `website/index.html`
- Read: `website/styles.css`
- Read: `website/script.js`

**Step 1: Validate asset references**

Run a local command to verify all referenced local files exist.

Expected: no missing local asset paths.

**Step 2: Start a static server**

Run: `python3 -m http.server 8000 --directory website`

Expected: site available at `http://localhost:8000/`.

**Step 3: Browser verification**

If browser automation is available, load desktop and mobile widths, check console errors, click filters and copy button, and capture screenshots.

Expected: no console errors, images render, interactions work, layout is coherent.

**Step 4: Report limitations**

If browser automation is unavailable, report which command-line checks were completed and what remains for manual visual inspection.

