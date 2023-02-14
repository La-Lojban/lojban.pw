let headers = [];
let tocHeaders = [];

function debounce(func, delay) {
	let timeoutId;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(context, args), delay);
	};
}

function getClosestHeaderId() {
	headers = Array.from(document.querySelectorAll("h1, h2, h3"));
	tocHeaders = Array.from(document.querySelectorAll("a.in-toc"));

	let closestHeader = null;
	let distance = Number.MAX_VALUE;
	const currentPosition = window.scrollY;

	for (let i = 0; i < headers.length; i++) {
		const header = headers[i];
		const currentDistance = Math.abs(currentPosition - header.offsetTop);
		if (currentDistance < distance) {
			closestHeader = header;
			distance = currentDistance;
		}
	}

	const hashedId = "#" + closestHeader.id;
	history.replaceState(null, null, hashedId);
	tocHeaders.forEach((a) => {
		if (a.href.endsWith(hashedId)) {
			a.classList.add("hover");
			document.getElementById("toc-core").scrollTop = a.offsetTop;
		} else {
			a.classList.remove("hover");
		}
	});
}

const debouncedGetClosestHeaderId = debounce(getClosestHeaderId, 1000);

window.addEventListener("scroll", debouncedGetClosestHeaderId);
