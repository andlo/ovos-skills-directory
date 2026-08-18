const grid = document.getElementById("grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search");

let skills = [];

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function renderCard(skill) {
  const examples = (skill.examples || []).slice(0, 3)
    .map((e) => `<li>"${escapeHtml(e)}"</li>`).join("");
  const tags = (skill.tags || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  const icon = skill.icon || "";

  return `
    <article class="card">
      <div class="card-head">
        <img src="${escapeHtml(icon)}" alt="" loading="lazy"
             onerror="this.style.visibility='hidden'">
        <div>
          <h2>${escapeHtml(skill.name)}</h2>
          <div class="version">v${escapeHtml(skill.pypi_version)}</div>
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

function render(list) {
  if (list.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;
  grid.innerHTML = list.map(renderCard).join("");
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
