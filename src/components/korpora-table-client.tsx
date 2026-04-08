/**
 * Korpora column visibility: modern `section.korpora` + buttons, or legacy checkbox + label rows.
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

function toggleForColumn(root: HTMLElement, colId: string): HTMLButtonElement | null {
  const found = Array.from(root.querySelectorAll("button.korpora__toggle[data-korpora-col]")).find(
    (b) => b.getAttribute("data-korpora-col") === colId
  );
  return found instanceof HTMLButtonElement ? found : null;
}

function setColumnHidden(root: HTMLElement, colId: string, hidden: boolean) {
  for (const cell of cellsForColumn(root, colId)) {
    cell.classList.toggle("korpora__col--hidden", hidden);
  }
  const btn = toggleForColumn(root, colId);
  if (btn) btn.setAttribute("aria-pressed", hidden ? "true" : "false");
}

function legacyCellsWithColumnClass(container: HTMLElement, colId: string) {
  const token = `column-class-${colId}`;
  return Array.from(container.querySelectorAll("th, td")).filter((el) =>
    el.classList.contains(token)
  );
}

function setLegacyColumnHidden(container: HTMLElement, colId: string, hidden: boolean) {
  for (const el of legacyCellsWithColumnClass(container, colId)) {
    el.classList.toggle("korpora__col--hidden", hidden);
  }
  const input = document.getElementById(`hide-column-${colId}`);
  if (input instanceof HTMLInputElement) input.checked = hidden;
}

function colIdFromLegacyCheckbox(input: HTMLInputElement): string | null {
  if (!input.id.startsWith("hide-column-")) return null;
  return input.id.slice("hide-column-".length);
}

export default function KorporaTableClient({ storageSlug }: { storageSlug: string }) {
  useEffect(() => {
    const modernRoots = document.querySelectorAll("section.korpora");
    const cleanups: Array<() => void> = [];

    if (modernRoots.length > 0) {
      modernRoots.forEach((node) => {
        const root = node as HTMLElement;
        const slug = root.dataset.korporaSlug ?? storageSlug;
        if (!slug) return;

        const map = readHiddenMap();
        for (const colId of map[slug] ?? []) {
          setColumnHidden(root, colId, true);
        }

        const onClick = (e: MouseEvent) => {
          const t = e.target as HTMLElement | null;
          const btn = t?.closest?.("button.korpora__toggle");
          if (!(btn instanceof HTMLButtonElement) || !root.contains(btn)) return;
          const colId = btn.dataset.korporaCol;
          if (!colId) return;
          const nowHidden = btn.getAttribute("aria-pressed") === "true";
          const nextHidden = !nowHidden;
          setColumnHidden(root, colId, nextHidden);
          const m = readHiddenMap();
          const set = new Set(m[slug] ?? []);
          if (nextHidden) set.add(colId);
          else set.delete(colId);
          m[slug] = [...set];
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
    for (const colId of map[storageSlug] ?? []) {
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
      const set = new Set(m[storageSlug] ?? []);
      if (hidden) set.add(colId);
      else set.delete(colId);
      m[storageSlug] = [...set];
      writeHiddenMap(m);
    };

    legacyContainer.addEventListener("change", onChange);
    return () => legacyContainer.removeEventListener("change", onChange);
  }, [storageSlug]);

  return null;
}
