const SECTIONS = [
  { id: "about", label: "About" },
  { id: "news", label: "News" },
  { id: "publications", label: "Publications" },
  { id: "teaching", label: "Teaching & service" },
  // { id: "background", label: "Background" },
];

const OFFSET = 120;

export function renderNav(page) {
  const nav = document.querySelector(".topbar");
  const prefix = page === "home" ? "" : "index.html";
  const links = SECTIONS.map(({ id, label }) =>
    `<a href="${prefix}#${id}" data-section="${id}">${label.replace("&", "&amp;")}</a>`);
  links.push(`<a href="blog.html"${page === "blog" ? ' aria-current="page"' : ""}>Blog</a>`);
  nav.innerHTML = `<div class="topbar-links">${links.join("")}</div>`;
  return page === "home" ? setUpScrollSpy(nav) : () => {};
}

function setUpScrollSpy(nav) {
  const links = [...nav.querySelectorAll("[data-section]")];
  const update = () => {
    const sections = links.map((link) => document.getElementById(link.dataset.section));
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let active = 0;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= OFFSET) active = i;
    });
    if (atBottom) active = links.length - 1;
    links.forEach((link, i) => {
      if (i === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  return update;
}
