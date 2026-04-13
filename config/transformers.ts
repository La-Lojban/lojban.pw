import jsdom from "jsdom";
const { JSDOM } = jsdom;
const { document } = new JSDOM(`<body></body>`).window;

import { HTMLElement } from "node-html-parser";
import { createElementFromSelector } from "@lib/html-prettifier/elements";

import { sluggify } from "@lib/html-prettifier/slugger";
import { sanitizeUrl } from "@lib/html-prettifier/sanitizer";
import { encodeLerfuSlugForUrl } from "@lib/lerfuAudioUrl";

export const tocSelector = ["h1", "h2", "h3"];
export const allSelector = ["h1", "h2", "h3", "h4", "h5", "h6"];
export const transformers: {selector: string; fn?: any; wrapper?:string; idCounts?: any;}[] = [
	{
		selector: allSelector.join(","),
		fn: (element: HTMLElement) => {
			element.setAttribute("id", sluggify(element.innerText));
			// 	).replace(/[^\w\s-]/g, "")
			// .replace(/\s+/g, " ")

			const a = document.createElement("a");
			a.className = "print:hidden";
			a.innerHTML = `<span class="in-heading hash select-none">#</span>`;
			a.setAttribute("aria-hidden", "true");
			a.setAttribute("tabindex", "-1");
			a.setAttribute("href", "#" + element.id);
			element.innerHTML = element.innerHTML + a.outerHTML;
		},
	},
	{ selector: "blockquote", wrapper: "div.wrapper.with_blockquote" },
	/* Skip inner glossary tables and korpora corpus grid ([data-korpora-grid] must not get md-typeset inline-block). */
	{
		selector:
			"table:not(.inner-table):not([data-korpora-grid]):not(section.korpora .korpora__scroll table)",
		wrapper: "div.md-typeset__table",
	},
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
			const caption = element.attributes.caption ?? "";
			const definition = element.attributes.definition ?? "";
			wrapperElement.innerHTML = `<figure><div class="figure_img" data-url="${element.attributes.url}"><img src="${element.attributes.url}" alt="${caption}"></div><figcaption><b>${caption}</b><br/><i>${definition}</i></figcaption></figure>`;
			element.insertAdjacentHTML("afterend", wrapperElement.outerHTML);
			element.remove();
		},
	},
	/** Lojban Through Dialogues: tiny borderless portrait in table column 1 (not a figure card). */
	{
		selector: "dialogue-sprite",
		fn: (element: HTMLElement) => {
			const url = sanitizeUrl(element.attributes.url);
			const span = document.createElement("span");
			span.className = "dialogue-sprite";
			const img = document.createElement("img");
			img.setAttribute("src", url);
			img.setAttribute("alt", "");
			img.setAttribute("width", "36");
			img.setAttribute("height", "36");
			img.setAttribute("loading", "lazy");
			img.setAttribute("decoding", "async");
			span.appendChild(img);
			element.insertAdjacentHTML("afterend", span.outerHTML);
			element.remove();
		},
	},
	{
		selector: ".guibutton",
		fn: (element: HTMLElement) => {
			const slug = encodeLerfuSlugForUrl(element.childNodes[0].innerText);
			const button = document.createElement("button");
			button.className = "tutci print:hidden";
			button.setAttribute("type", "button");
			button.setAttribute("aria-label", "Play pronunciation");
			button.innerHTML = "";
			button.setAttribute(
				"onclick",
				`(function (){var s=new Audio('/assets/sance/lerfu/${slug}.ogg');s.play()})()`
			);

			element.insertAdjacentHTML("afterend", button.outerHTML);
		},
	},
];
