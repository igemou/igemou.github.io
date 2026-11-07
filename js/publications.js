import { escapeHtml, load, newestFirst } from "./utils.js";

const OWN_NAME = "Ioanna Gemou";

function authorList(authors) {
  const names = authors.map((name) => (name === OWN_NAME ? `<b>${escapeHtml(name)}</b>` : escapeHtml(name)));
  if (names.length < 2) return names.join("");
  if (names.length === 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function bibAuthor(name) {
  const parts = name.trim().split(/\s+/);
  const last = parts.pop();
  return parts.length ? `${last}, ${parts.join(" ")}` : last;
}

function bibtex(pub) {
  const { type, key, ...extra } = pub.bib;
  const fields = {
    title: pub.title,
    author: pub.authors.map(bibAuthor).join(" and "),
    year: pub.date.slice(0, 4),
    ...extra,
  };
  const width = Math.max(...Object.keys(fields).map((name) => name.length));
  const lines = Object.entries(fields).map(([name, value]) => `  ${name.padEnd(width)} = {${value}}`);
  return `@${type}{${key},\n${lines.join(",\n")}\n}`;
}

function paperHtml(pub) {
  const links = Object.entries(pub.links || {}).map(([name, url]) =>
    `<a href="${escapeHtml(url)}">[${escapeHtml(name)}]</a>`);
  if (pub.bib) {
    links.push(`<details><summary>[bib]</summary><pre>${escapeHtml(bibtex(pub))}</pre></details>`);
  }
  return `<li class="pub">
    <p class="venue">${escapeHtml(pub.venue)}</p>
    <div>
      <h3>${escapeHtml(pub.title)}</h3>
      <p class="authors">${authorList(pub.authors)}</p>
      <div class="pub-links">${links.join(" ")}</div>
    </div>
  </li>`;
}

function setUpFilters(papers, items) {
  const tags = [...new Set(papers.flatMap((pub) => pub.tags || []))];
  const filters = document.querySelector(".filters");
  filters.innerHTML = ["All", ...tags].map((tag, i) =>
    `<button type="button" aria-pressed="${i === 0}">${escapeHtml(tag)}</button>`).join("");

  const buttons = filters.querySelectorAll("button");
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      items.forEach((item, j) => {
        item.hidden = i > 0 && !(papers[j].tags || []).includes(tags[i - 1]);
      });
    });
  });
}

export async function renderPublications() {
  const papers = (await load("publications")).sort(newestFirst);
  const list = document.querySelector(".pubs");
  list.innerHTML = papers.map(paperHtml).join("");
  setUpFilters(papers, list.querySelectorAll(".pub"));
}
