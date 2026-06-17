(function () {
  const resourceGrid = document.getElementById("resource-grid");
  const resourceDataElement = document.getElementById("resource-data");
  let resourceCards = [];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderResource(resource) {
    const href = resource.url || (resource.eprint ? `https://arxiv.org/abs/${resource.eprint}` : "");
    const title = href
      ? `<a href="${escapeHtml(href)}">${escapeHtml(resource.title)}</a>`
      : escapeHtml(resource.title);
    const groups = resource.groups.join(" ");
    const tags = resource.tags.map((tag) => `<span class="resource-type">${escapeHtml(tag)}</span>`).join("");

    return `
      <article class="resource-card" data-category="${escapeHtml(groups)}">
        <div class="resource-main">
          <span class="resource-year">${escapeHtml(resource.year || "n.d.")}</span>
          <h3>${title}</h3>
        </div>
        <div class="resource-tags">${tags}</div>
      </article>
    `;
  }

  if (resourceGrid && resourceDataElement) {
    try {
      const resources = JSON.parse(resourceDataElement.textContent);
      resourceGrid.innerHTML = resources.map(renderResource).join("");
    } catch (error) {
      resourceGrid.innerHTML = '<p class="resource-error">Unable to load resources.</p>';
    }
  }

  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  resourceCards = Array.from(document.querySelectorAll(".resource-card"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle("active", item === button));

      resourceCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });

  const copyButton = document.getElementById("copy-bibtex");
  const bibtex = document.getElementById("bibtex");

  function setCopyState(text) {
    if (!copyButton) return;
    copyButton.textContent = text;
    window.setTimeout(() => {
      copyButton.textContent = "Copy BibTeX";
    }, 1800);
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopyState("Copied");
    } catch (error) {
      setCopyState("Select text");
    } finally {
      document.body.removeChild(textarea);
    }
  }

  if (copyButton && bibtex) {
    copyButton.addEventListener("click", () => {
      const text = bibtex.textContent.trim();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => setCopyState("Copied"))
          .catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
