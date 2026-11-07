export function setUpThemeToggle() {
  const root = document.documentElement;
  const button = document.querySelector(".theme");
  const current = () => root.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const label = () => { button.textContent = current() === "dark" ? "Light mode" : "Dark mode"; };
  button.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { }
    label();
  });
  label();
}
