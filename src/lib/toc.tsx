import { debounce } from "./utils";

function normalizePath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

export type GetClosestHeaderIdOptions = {
  /** When false, only updates ToC highlight (no `history.replaceState`). Use while the user is scrolling so the URL/hash does not trigger scroll reconciliation. */
  syncHistory?: boolean;
};

export function getClosestHeaderId(options?: GetClosestHeaderIdOptions) {
  const syncHistory = options?.syncHistory !== false;
  const headers = Array.from(
    document.querySelectorAll("h1, h2, h3")
  ) as HTMLElement[];

  // Use the article scroll container as viewport if present (main content scrolls there)
  const scrollContainer = document.querySelector(
    "article[class*='overflow-y-auto']"
  ) as HTMLElement | null;
  const useArticleViewport = !!scrollContainer;

  let closestHeader: HTMLElement | null = null;
  let distance = Number.MAX_VALUE;

  if (useArticleViewport && scrollContainer) {
    const containerRect = scrollContainer.getBoundingClientRect();
    for (const header of headers) {
      const headerRect = header.getBoundingClientRect();
      const currentDistance = Math.abs(headerRect.top - containerRect.top);
      if (currentDistance < distance) {
        closestHeader = header;
        distance = currentDistance;
      }
    }
  } else {
    const currentPosition = window.scrollY;
    const sorted = [...headers].sort((a, b) => a.offsetTop - b.offsetTop);
    for (let i = 0; i < sorted.length; i++) {
      const header = sorted[i];
      const currentDistance = Math.abs(currentPosition - header.offsetTop);
      if (currentDistance < distance) {
        closestHeader = header;
        distance = currentDistance;
      } else {
        break;
      }
    }
  }

  for (const toScan of [
    { itemClass: "a.in-toc", core: "toc-core" },
    { itemClass: "a.in-topbar-toc", core: "toc-topbar" },
  ]) {
    const tocHeaders = Array.from(
      document.querySelectorAll(toScan.itemClass)
    ) as HTMLAnchorElement[];

    const hashedId = "#" + (closestHeader?.id ?? "");
    if (closestHeader && syncHistory) {
      history.replaceState(null, "", hashedId);
    }
    const currentPath = normalizePath(window.location.pathname);
    tocHeaders.forEach((a) => {
      const rawLinkPath =
        a.pathname || new URL(a.href, window.location.origin).pathname;
      const linkPath = normalizePath(rawLinkPath);
      const matchesHash = decodeURI(a.href).endsWith(hashedId);
      const matchesCurrentPage = linkPath === currentPath;
      if (matchesHash && matchesCurrentPage) {
        a.classList.add("hover");

        const tocCore = document.getElementById(toScan.core);
        if (!tocCore) return;
        const tocCoreRect = tocCore.getBoundingClientRect();

        const elementRect = a.getBoundingClientRect();

        const isVisible =
          elementRect.top >= tocCoreRect?.top &&
          elementRect.bottom <= tocCoreRect?.bottom;
        if (!isVisible) {
          tocCore.scrollTo({
            top: a.offsetTop - tocCoreRect?.top,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        a.classList.remove("hover");
      }
    });
  }
}

export const debouncedGetClosestHeaderId = debounce(
  () => getClosestHeaderId({ syncHistory: false }),
  1000
);
