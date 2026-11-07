import { ICONS } from "./icons.js";
import { escapeHtml, format, load } from "./utils.js";

export async function renderProfile() {
  const profile = await load("profile");
  document.querySelector(".contact").innerHTML = profile.links.map((link) => {
    const href = escapeHtml(link.url);
    const label = escapeHtml(link.label);
    return link.icon
      ? `<li><a href="${href}" aria-label="${label}" title="${label}">${ICONS[link.icon]}</a></li>`
      : `<li><a class="cv" href="${href}">${label}</a></li>`;
  }).join("");
  document.querySelector("address").innerHTML = profile.address.map(escapeHtml).join("<br>");
  document.querySelector("#about").innerHTML =
    `<p class="lead">${format(profile.intro)}</p>` +
    profile.about.map((paragraph) => `<p>${format(paragraph)}</p>`).join("");
}
