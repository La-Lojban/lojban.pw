import jsdom from "jsdom";
const { JSDOM } = jsdom;
const { document } = new JSDOM(`<body></body>`).window;

export function createElementFromSelector(selector: string) {
	const pattern = /^(.*?)(?:#(.*?))?(?:\.(.*?))?(?:@(.*?)(?:=(.*?))?)?$/;
	const matches = selector.match(pattern);
	const element = document.createElement(matches?.[1] ?? "div");
	if (matches?.[2]) element.id = matches[2];
	if (matches?.[3]) element.className = matches[3].split(".").join(" ");
	if (matches?.[4]) element.setAttribute(matches[4], matches?.[5] ?? "");
	return element;
}