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

function getClosestHeaderId() {
	const headers = (
		Array.from(document.querySelectorAll("h1, h2, h3")) as HTMLElement[]
	).sort((a, b) => {
		return a.offsetTop - b.offsetTop;
	});
	const tocHeaders = Array.from(
		document.querySelectorAll("a.in-toc")
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

			const tocCore = document.getElementById("toc-core");
			if (!tocCore) return;
			const tocCoreRect = tocCore.getBoundingClientRect();

			const elementRect = a.getBoundingClientRect();

			const isVisible =
				elementRect.top >= tocCoreRect?.top &&
				elementRect.bottom <= tocCoreRect?.bottom;
			if (!isVisible)
				tocCore.scrollTo({
					top: a.offsetTop,
					left: 0,
					behavior: "smooth",
				});
		} else {
			a.classList.remove("hover");
		}
	});
}

export const debouncedGetClosestHeaderId = debounce(getClosestHeaderId, 1000);
