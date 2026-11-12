import { marked } from "https://cdn.jsdelivr.net/npm/marked@12.0.2/lib/marked.esm.js";
import { renderNav } from "./nav.js";
import { setUpThemeToggle } from "./theme.js";
import { escapeHtml, formatMonth, load, newestFirst } from "./utils.js";

const container = document.querySelector("#blog");

function renderList(posts) {
  const rows = [...posts].sort(newestFirst).map((post) => `<li>
    <time datetime="${escapeHtml(post.date)}">${formatMonth(post.date)}</time>
    <div>
      <a class="post-link" href="blog.html?post=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a>
      ${post.summary ? `<p class="post-summary">${escapeHtml(post.summary)}</p>` : ""}
    </div>
  </li>`);
  container.innerHTML = `<h1 class="blog-title">Blog</h1>` +
    (rows.length ? `<ul class="news">${rows.join("")}</ul>` : `<p class="blog-empty">First post coming soon.</p>`);
}

async function renderPost(post) {
  const response = await fetch(`content/posts/${encodeURIComponent(post.slug)}.md`, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load content/posts/${post.slug}.md (${response.status})`);
  const markdown = await response.text();
  const minutes = Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 230));
  document.title = `${post.title} – Ioanna Gemou`;
  container.innerHTML = `<a class="blog-back" href="blog.html">← All posts</a>
    <article class="post">
      <h1 class="blog-title">${escapeHtml(post.title)}</h1>
      <p class="post-meta"><time datetime="${escapeHtml(post.date)}">${formatMonth(post.date)}</time> · ${minutes} min read</p>
      <div class="post-body">${marked.parse(markdown)}</div>
    </article>`;
  container.querySelectorAll('.post-body a[href^="http"]').forEach((link) => {
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function renderNotFound() {
  container.innerHTML = `<a class="blog-back" href="blog.html">← All posts</a><p class="blog-empty">Post not found.</p>`;
}

function showError(error) {
  console.error(error);
  const message = document.createElement("p");
  message.className = "load-error";
  message.textContent = error.message;
  container.prepend(message);
}

async function main() {
  setUpThemeToggle();
  renderNav("blog");
  try {
    const posts = await load("blog");
    const slug = new URLSearchParams(location.search).get("post");
    if (!slug) return renderList(posts);
    const post = posts.find((item) => item.slug === slug);
    return post ? await renderPost(post) : renderNotFound();
  } catch (error) {
    showError(error);
  }
}

main();
