function debounce(func: any, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(null, args);
    }, delay);
  };
}

export function getClosestHeaderId() {
  const headers = (
    Array.from(document.querySelectorAll("h1, h2, h3")) as HTMLElement[]
  ).sort((a, b) => {
    return a.offsetTop - b.offsetTop;
  });
  for (const toScan of [
    { itemClass: "a.in-toc", core: "toc-core" },
    { itemClass: "a.in-topbar-toc", core: "toc-topbar" },
  ]) {
    const tocHeaders = Array.from(
      document.querySelectorAll(toScan.itemClass)
    ) as HTMLAnchorElement[];

    let closestHeader: HTMLElement | null = null;
    let distance = Number.MAX_VALUE;
    const currentPosition = window.scrollY;

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const currentDistance = Math.abs(currentPosition - header.offsetTop);
      if (currentDistance < distance) {
        closestHeader = header;
        distance = currentDistance;
      } else {
        break;
      }
    }

    const hashedId = "#" + closestHeader?.id;
    history.replaceState(null, "", hashedId);
    tocHeaders.forEach((a) => {
      if (a.href.endsWith(hashedId)) {
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

export const debouncedGetClosestHeaderId = debounce(getClosestHeaderId, 1000);
