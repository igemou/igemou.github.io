import { load, renderEntries } from "./utils.js";

export async function renderBackground() {
  renderEntries("#background-list", await load("background"));
}
