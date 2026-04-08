/**
 * After remark → HTML, upgrades `section.korpora` markdown tables to the korpora grid:
 * data-korpora-col, figure rows, RTL/nowrap, row kinds. Runs before layout transformers
 * so korpora tables are not wrapped in md-typeset scroll wrappers.
 */
import type { HTMLElement } from "node-html-parser";

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function enhanceKorporaSections(root: HTMLElement): void {
  const sections = root.querySelectorAll("section.korpora");
  for (const sec of sections) {
    const section = sec as HTMLElement;
    const colsRaw = section.getAttribute("data-korpora-cols");
    if (!colsRaw?.trim()) continue;

    const colIds = colsRaw.split(",").map((s) => s.trim()).filter(Boolean);
    if (colIds.length === 0) continue;

    const scroll =
      (section.querySelector(".korpora__scroll") as HTMLElement | null) ??
      (section.querySelector("div.korpora__scroll") as HTMLElement | null);
    const table = (scroll?.querySelector("table") ??
      section.querySelector("table")) as HTMLElement | null;
    if (!table) continue;

    let nowrapSet = new Set<string>();
    let rtlSet = new Set<string>();
    let rowKinds: ("heading" | "meta" | "body")[] = [];
    let figures: { beforeDataRow: number; src: string }[] = [];

    const metaScript = section.querySelector("script.korpora__ssg");
    const rawJson = metaScript?.textContent?.trim() ?? "";
    if (rawJson) {
      try {
        const parsed = JSON.parse(rawJson) as {
          figures?: { beforeDataRow: number; src: string }[];
          rowKinds?: unknown[];
          nowrapColIds?: string[];
          rtlColIds?: string[];
        };
        if (Array.isArray(parsed.figures)) {
          figures = parsed.figures.filter(
            (x): x is { beforeDataRow: number; src: string } =>
              !!x &&
              typeof x === "object" &&
              typeof x.beforeDataRow === "number" &&
              typeof x.src === "string"
          );
        }
        if (Array.isArray(parsed.rowKinds)) {
          rowKinds = parsed.rowKinds.filter(
            (k): k is "heading" | "meta" | "body" =>
              k === "heading" || k === "meta" || k === "body"
          );
        }
        nowrapSet = new Set(
          (parsed.nowrapColIds ?? []).filter((s): s is string => typeof s === "string")
        );
        rtlSet = new Set(
          (parsed.rtlColIds ?? []).filter((s): s is string => typeof s === "string")
        );
      } catch {
        /* ignore */
      }
    }

    table.setAttribute("data-korpora-grid", "");
    table.setAttribute("class", "korpora__table");
    table.setAttribute("lang", "und");

    const thead = table.querySelector("thead");
    if (thead) thead.setAttribute("class", "korpora__thead");

    const ths = table.querySelectorAll("thead th");
    ths.forEach((th, i) => {
      const el = th as HTMLElement;
      const id = colIds[i];
      if (!id) return;
      el.setAttribute("class", "korpora__th");
      el.setAttribute("data-korpora-col", id);
      if (nowrapSet.has(id)) el.setAttribute("data-korpora-nowrap", "");
    });

    const tbody = table.querySelector("tbody");
    if (!tbody) continue;

    const nCols = colIds.length;

    // Insert figure rows from bottom to top so indices stay aligned with original data rows.
    const sorted = [...figures].sort((a, b) => b.beforeDataRow - a.beforeDataRow);
    for (const fig of sorted) {
      const rows = tbody.querySelectorAll(":scope > tr");
      if (fig.beforeDataRow < 0 || fig.beforeDataRow > rows.length) continue;
      const target = rows[fig.beforeDataRow] as HTMLElement | undefined;
      if (!target) continue;
      const rowHtml = `<tr class="korpora__row korpora__row--figure">
          <td class="korpora__figure-cell" colspan="${nCols}">
          <div class="korpora__figure-wrap">
          <img class="korpora__figure-img" src="${escapeAttr(fig.src)}" alt="" />
          </div>
          </td>
        </tr>`;
      target.insertAdjacentHTML("beforebegin", rowHtml);
    }

    // Classify data rows (skip figure rows).
    let dataIdx = 0;
    for (const tr of tbody.querySelectorAll(":scope > tr")) {
      const row = tr as HTMLElement;
      const isFigure = row.classList.contains("korpora__row--figure");
      if (isFigure) continue;

      const kind = rowKinds[dataIdx] ?? "body";
      row.setAttribute("class", "korpora__row");
      const tds = row.querySelectorAll("td");
      tds.forEach((td, j) => {
        const cell = td as HTMLElement;
        const id = colIds[j];
        if (!id) return;
        const parts = ["korpora__td"];
        if (kind === "heading") parts.push("korpora__td--heading");
        if (kind === "meta") parts.push("korpora__td--meta");
        if (rtlSet.has(id)) parts.push("korpora__td--rtl");
        cell.setAttribute("class", parts.join(" "));
        cell.setAttribute("data-korpora-col", id);
        if (nowrapSet.has(id)) cell.setAttribute("data-korpora-nowrap", "");
      });
      dataIdx++;
    }

    metaScript?.remove();
  }
}
