const grid = document.getElementById("grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search");

let skills = [];

const STORE_BADGE_SVG = `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.3-6.3a1 1 0 0 1 1.4 0z" clip-rule="evenodd"/>
</svg>`;

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function pipelineLabel(pipelinePackage) {
  // "ovos-common-reading-pipeline-plugin" -> "Common Reading Pipeline"
  return pipelinePackage
    .replace(/^ovos-/, "")
    .replace(/-plugin$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ") + " Pipeline";
}

function renderCard(skill) {
  const examples = (skill.examples || []).slice(0, 3)
    .map((e) => `<li>"${escapeHtml(e)}"</li>`).join("");
  const tags = (skill.tags || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  const icon = skill.icon || "";
  const storeBadge = skill.in_ovos_store
    ? `<span class="store-badge">${STORE_BADGE_SVG} In OVOS Store</span>`
    : "";

  return `
    <article class="card">
      <div class="card-head">
        <img src="${escapeHtml(icon)}" alt="" loading="lazy"
             onerror="this.style.visibility='hidden'">
        <div class="card-head-text">
          <h2>${escapeHtml(skill.name)}</h2>
          <div class="version">v${escapeHtml(skill.pypi_version)}</div>
          ${storeBadge}
        </div>
      </div>
      <p class="description">${escapeHtml(skill.description)}</p>
      <ul class="examples">${examples}</ul>
      <div class="tags">${tags}</div>
      <div class="links">
        <a href="${escapeHtml(skill.source)}" target="_blank" rel="noopener">GitHub</a>
        <a href="https://pypi.org/project/${escapeHtml(skill.package_name)}/" target="_blank" rel="noopener">PyPI</a>
      </div>
    </article>
  `;
}

function groupByPipeline(list) {
  const pipelines = new Map();
  const standalone = [];
  for (const skill of list) {
    if (skill.pipeline) {
      if (!pipelines.has(skill.pipeline)) pipelines.set(skill.pipeline, []);
      pipelines.get(skill.pipeline).push(skill);
    } else {
      standalone.push(skill);
    }
  }
  return { pipelines, standalone };
}

function render(list) {
  if (list.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  const { pipelines, standalone } = groupByPipeline(list);
  let html = "";

  for (const [pipelinePackage, members] of pipelines) {
    html += `
      <section class="group">
        <h2 class="group-title">${escapeHtml(pipelineLabel(pipelinePackage))}</h2>
        <p class="group-subtitle">
          ${members.length} provider skill${members.length === 1 ? "" : "s"} for
          <code>${escapeHtml(pipelinePackage)}</code>
        </p>
        <div class="card-grid">${members.map(renderCard).join("")}</div>
      </section>
    `;
  }

  if (standalone.length) {
    html += `
      <section class="group">
        ${pipelines.size ? '<h2 class="group-title">Standalone Skills</h2>' : ""}
        <div class="card-grid">${standalone.map(renderCard).join("")}</div>
      </section>
    `;
  }

  grid.innerHTML = html;
}

function matches(skill, query) {
  const haystack = [
    skill.name, skill.description,
    ...(skill.tags || []), ...(skill.examples || []),
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = query ? skills.filter((s) => matches(s, query)) : skills;
  render(filtered);
});

fetch("skills.json")
  .then((res) => res.json())
  .then((data) => {
    skills = data;
    render(skills);
  })
  .catch(() => {
    grid.innerHTML = "";
    emptyState.hidden = false;
    emptyState.textContent = "Could not load skills.json.";
  });
