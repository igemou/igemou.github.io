import { escapeHtml, format, formatMonth, load, newestFirst } from "./utils.js";

const NEWS_SHOWN = 5;

function newsList(items) {
  const rows = items.map((item) =>
    `<li><time datetime="${escapeHtml(item.date)}">${formatMonth(item.date)}</time><span>${format(item.text)}</span></li>`);
  return `<ul class="news">${rows.join("")}</ul>`;
}

export async function renderNews() {
  const sorted = (await load("news")).sort(newestFirst);
  const older = sorted.slice(NEWS_SHOWN);
  const container = document.querySelector("#news-list");
  container.innerHTML =
    newsList(sorted.slice(0, NEWS_SHOWN)) +
    (older.length ? `<div class="older-news" hidden>${newsList(older)}</div>
      <button class="news-toggle" type="button" aria-expanded="false">Show all news</button>` : "");

  const button = container.querySelector(".news-toggle");
  if (!button) return;
  const olderNews = container.querySelector(".older-news");
  button.addEventListener("click", () => {
    const expanded = olderNews.hidden;
    olderNews.hidden = !expanded;
    button.setAttribute("aria-expanded", String(expanded));
    button.textContent = expanded ? "Show fewer news" : "Show all news";
  });
}
