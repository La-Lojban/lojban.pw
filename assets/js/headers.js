var headers = [];
var tocHeaders = [];

function debounce(func, delay) {
	var timeoutId;
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(function () { func.apply(context, args); }, delay);
	};
}

function getClosestHeaderId() {
	headers = Array.prototype.slice.call(document.querySelectorAll("h1, h2, h3"));
	tocHeaders = Array.prototype.slice.call(document.querySelectorAll("a.in-toc"));

	var closestHeader = null;
	var distance = Number.MAX_VALUE;
	var currentPosition = window.scrollY;

	for (var i = 0; i < headers.length; i++) {
		var header = headers[i];
		var currentDistance = Math.abs(currentPosition - header.offsetTop);
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
			document.getElementById("toc-core").scrollTop = a.offsetTop;
		} else {
			a.classList.remove("hover");
		}
	});
}

var debouncedGetClosestHeaderId = debounce(getClosestHeaderId, 1000);

window.addEventListener("scroll", debouncedGetClosestHeaderId);
