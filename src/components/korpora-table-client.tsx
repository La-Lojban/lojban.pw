/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — (global `.korpora-*` in index.css)
 *   MARKUP — none (returns null)
 *   SCRIPT — column visibility + localStorage for `.korpora-root` blocks
 */
import { useEffect } from "react";

const STORAGE_KEY = "korpora.hiddenColumns.v1";

function readHiddenMap(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string[]>;
    }
    return {};
  } catch {
    return {};
  }
}

function writeHiddenMap(map: Record<string, string[]>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* quota / private mode */
  }
}

function cellsForColumn(root: HTMLElement, colId: string) {
  return Array.from(root.querySelectorAll("th[data-korpora-col], td[data-korpora-col]")).filter(
    (el) => el.getAttribute("data-korpora-col") === colId
  );
}

function toggleButtonForColumn(root: HTMLElement, colId: string): HTMLButtonElement | null {
  const found = Array.from(root.querySelectorAll("button.korpora-col-toggle[data-korpora-col]")).find(
    (el) => el.getAttribute("data-korpora-col") === colId
  );
  return found instanceof HTMLButtonElement ? found : null;
}

function setColumnVisualState(root: HTMLElement, colId: string, hidden: boolean) {
  for (const el of cellsForColumn(root, colId)) {
    el.classList.toggle("korpora-col--hidden", hidden);
  }
  const btn = toggleButtonForColumn(root, colId);
  if (btn) btn.setAttribute("aria-pressed", hidden ? "true" : "false");
}

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
// (no visible UI; operates on markup from generated markdown)

function legacyCellsForColumn(container: HTMLElement, colId: string) {
  const token = `column-class-${colId}`;
  return Array.from(container.querySelectorAll("th, td")).filter((el) =>
    el.classList.contains(token)
  );
}

function setLegacyColumnHidden(container: HTMLElement, colId: string, hidden: boolean) {
  for (const el of legacyCellsForColumn(container, colId)) {
    el.classList.toggle("korpora-col--hidden", hidden);
  }
  const input = document.getElementById(`hide-column-${colId}`);
  if (input instanceof HTMLInputElement) input.checked = hidden;
}

function colIdFromLegacyCheckbox(input: HTMLInputElement): string | null {
  if (!input.id.startsWith("hide-column-")) return null;
  return input.id.slice("hide-column-".length);
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
export default function KorporaTableClient({ storageSlug }: { storageSlug: string }) {
  useEffect(() => {
    const roots = document.querySelectorAll(".korpora-root");
    const cleanups: Array<() => void> = [];

    if (roots.length > 0) {
      roots.forEach((node) => {
        const root = node as HTMLElement;
        const slug = root.dataset.korporaSlug;
        if (!slug) return;

        const map = readHiddenMap();
        const hiddenList = map[slug] ?? [];
        for (const colId of hiddenList) {
          setColumnVisualState(root, colId, true);
        }

        const onClick = (e: MouseEvent) => {
          const t = e.target as HTMLElement | null;
          const btn = t?.closest?.(".korpora-col-toggle");
          if (!(btn instanceof HTMLButtonElement) || !root.contains(btn)) return;
          const colId = btn.dataset.korporaCol;
          if (!colId) return;
          const nowHidden = btn.getAttribute("aria-pressed") === "true";
          const nextHidden = !nowHidden;
          setColumnVisualState(root, colId, nextHidden);
          const m = readHiddenMap();
          const forSlug = new Set(m[slug] ?? []);
          if (nextHidden) forSlug.add(colId);
          else forSlug.delete(colId);
          m[slug] = [...forSlug];
          writeHiddenMap(m);
        };

        root.addEventListener("click", onClick);
        cleanups.push(() => root.removeEventListener("click", onClick));
      });

      return () => cleanups.forEach((fn) => fn());
    }

    const firstLegacy = document.querySelector(
      'input[type="checkbox"][id^="hide-column-"]'
    ) as HTMLInputElement | null;
    const legacyContainer = firstLegacy?.closest(".w-full") as HTMLElement | null;
    if (!legacyContainer || !storageSlug) return;

    const map = readHiddenMap();
    const hiddenList = map[storageSlug] ?? [];
    const hiddenSet = new Set(hiddenList);
    for (const colId of hiddenSet) {
      setLegacyColumnHidden(legacyContainer, colId, true);
    }

    const onChange = (e: Event) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement)) return;
      if (!legacyContainer.contains(input)) return;
      const colId = colIdFromLegacyCheckbox(input);
      if (!colId) return;
      const hidden = input.checked;
      setLegacyColumnHidden(legacyContainer, colId, hidden);
      const m = readHiddenMap();
      const forSlug = new Set(m[storageSlug] ?? []);
      if (hidden) forSlug.add(colId);
      else forSlug.delete(colId);
      m[storageSlug] = [...forSlug];
      writeHiddenMap(m);
    };

    legacyContainer.addEventListener("change", onChange);
    return () => legacyContainer.removeEventListener("change", onChange);
  }, [storageSlug]);

  return null;
}
