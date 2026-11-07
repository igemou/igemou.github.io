import { load, renderEntries } from "./utils.js";

export async function renderTeaching() {
  renderEntries("#teaching-list", await load("teaching"));
}
