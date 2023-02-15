var headers = [];
var tocHeaders = [];

function debounce(func, delay) {
	var timeoutId;
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(function () {
			func.apply(context, args);
		}, delay);
	};
}

function getClosestHeaderId() {
	headers = Array.prototype.slice
		.call(document.querySelectorAll("h1, h2, h3"))
		.sort(function (a, b) {
			return a.offsetTop < b.offsetTop;
		});
	tocHeaders = Array.prototype.slice.call(
		document.querySelectorAll("a.in-toc")
	);

	var closestHeader = null;
	var distance = Number.MAX_VALUE;
	var currentPosition = window.scrollY;

	for (var i = 0; i < headers.length; i++) {
		var header = headers[i];
		if (currentPosition < header.offsetTop) break;
		var currentDistance = currentPosition - header.offsetTop;
		if (currentDistance < distance) {
			closestHeader = header;
			distance = currentDistance;
		}
	}

	var hashedId = "#" + closestHeader.id;
	history.replaceState(null, null, hashedId);
	tocHeaders.forEach(function (a) {
		if (a.href.endsWith(hashedId)) {
			a.classList.add("hover");

			var tocCore = document.getElementById("toc-core");
			var tocCoreRect = tocCore.getBoundingClientRect();

			var elementRect = a.getBoundingClientRect();

			var isVisible =
				elementRect.top >= tocCoreRect.top &&
				elementRect.bottom <= tocCoreRect.bottom;
			if (!isVisible)
				// tocCore.scrollTop = a.offsetTop;
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

var debouncedGetClosestHeaderId = debounce(getClosestHeaderId, 1000);

window.addEventListener("scroll", debouncedGetClosestHeaderId);
