import jsdom from "jsdom";
const { JSDOM } = jsdom;
const { document } = new JSDOM(`<body></body>`).window;

import { HTMLElement } from "node-html-parser";
import { createElementFromSelector } from "../lib/html-prettifier/elements";

import { sluggify } from "../lib/html-prettifier/slugger";

export const tocSelector = ["h1", "h2", "h3"];
export const allSelector = ["h1", "h2", "h3", "h4", "h5", "h6"];
export const transformers = [
	{
		selector: allSelector.join(","),
		fn: (element: HTMLElement) => {
			element.setAttribute("id", sluggify(element.innerText));
			// 	).replace(/[^\w\s-]/g, "")
			// .replace(/\s+/g, " ")

			const a = document.createElement("a");
			a.className = "print:hidden";
			a.innerHTML = `<span class="in-heading hash">#</span>`;
			a.setAttribute("aria-hidden", "true");
			a.setAttribute("tabindex", "-1");
			a.setAttribute("href", "#" + element.id);
			element.innerHTML = element.innerHTML + a.outerHTML;
		},
	},
	{ selector: "blockquote", wrapper: "div.wrapper.with_blockquote" },
	{ selector: "table", wrapper: "div.md-typeset__table" },
	{
		selector: "div.md-typeset__table",
		wrapper: "div.md-typeset__scrollwrap",
	},
	{
		selector: "div.md-typeset__table",
		wrapper: "div.md-typeset__scrollwrap",
	},
	{
		selector: "p > pixra",
		fn: (element: HTMLElement) => {
			const wrapperElement = createElementFromSelector("div.wrapper");
			wrapperElement.innerHTML = `<figure><div class="figure_img"><img src="${element.attributes.url}" alt="${element.attributes.caption}"></div><figcaption><b>${element.attributes.caption}</b><br/><i>${element.attributes.definition}</i></figcaption></figure>`;
			element.insertAdjacentHTML("afterend", wrapperElement.outerHTML);
			element.remove();
		},
	},
	{
		selector: ".guibutton",
		fn: (element: HTMLElement) => {
			function encodeValsiForWeb(v: string) {
				return encodeURIComponent(v).replace(/'/g, "\\'").trim();
			}
			const slug = encodeValsiForWeb(element.childNodes[0].innerText);
			const button = document.createElement("button");
			button.className = "tutci print:hidden";
			button.innerHTML = "▶";
			button.setAttribute(
				"onclick",
				`(function (){var s=new Audio('https://la-lojban.github.io/sutysisku/sance/lerfu/${slug}.ogg');s.play()})()`
			);

			element.insertAdjacentHTML("afterend", button.outerHTML);
		},
	},
];
