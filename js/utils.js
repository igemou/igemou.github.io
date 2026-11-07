const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

export function format(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

export function formatMonth(date) {
  const [year, month] = date.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export const newestFirst = (a, b) => b.date.localeCompare(a.date);

export async function load(name) {
  const path = `content/${name}.json`;
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
  try {
    return await response.json();
  } catch (error) {
    throw new Error(`${path} has a formatting mistake: ${error.message}`);
  }
}

export function renderEntries(selector, entries) {
  document.querySelector(selector).innerHTML = entries.map((entry) =>
    `<li><span class="when">${escapeHtml(entry.when)}</span><span>${format(entry.text)}</span></li>`).join("");
}
