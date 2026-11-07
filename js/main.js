// import { renderBackground } from "./background.js";
import { renderNav } from "./nav.js";
import { renderNews } from "./news.js";
import { renderProfile } from "./profile.js";
import { renderPublications } from "./publications.js";
import { renderTeaching } from "./teaching.js";
import { setUpThemeToggle } from "./theme.js";

function openLinksInNewTabs() {
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not(.topbar a)').forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function showError(error) {
  console.error(error);
  const message = document.createElement("p");
  message.className = "load-error";
  message.textContent = error.message;
  document.querySelector("#content").prepend(message);
}

async function main() {
  setUpThemeToggle();
  const updateNav = renderNav("home");
  const results = await Promise.allSettled([
    renderProfile(),
    renderNews(),
    renderPublications(),
    renderTeaching(),
    // renderBackground(),
  ]);
  results.filter((result) => result.status === "rejected").forEach((result) => showError(result.reason));
  openLinksInNewTabs();
  updateNav();
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

main();
