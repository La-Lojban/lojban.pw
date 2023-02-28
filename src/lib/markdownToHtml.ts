import { unified } from "unified";
import remarkParse from "remark-parse";
import gfm from "remark-gfm";
import deflist from "remark-deflist";
import remark2rehype from "remark-rehype";
import raw from "rehype-raw";
import stringify from "rehype-stringify";

import htmlParser, { HTMLElement } from "node-html-parser";
import { tocSelector, transformers } from "../config/transformers";
import { sluggify } from "./html-prettifier/slugger";
import { createElementFromSelector } from "./html-prettifier/elements";
import { TocElem } from "../types/toc";
import { GalleryImg } from "../types/gallery-img";
import includeMarkdownPlugin from "./remark-plugins/include";
import path from "path";
// import { serializeHTMLNodeTree } from "./json2react";

export default async function markdownToHtml({
	content,
	fullPath,
}: {
	content: string;
	fullPath: string;
}) {
	const root = htmlParser.parse(
		(
			await unified()
				.use(includeMarkdownPlugin, { resolveFrom: path.resolve(fullPath, '..') })
				.use(remarkParse)
				.use(gfm)
				.use(deflist)
				.use(remark2rehype, { allowDangerousHtml: true }) // 4sec
				.use(raw)
				.use(stringify) // makes it all faster???
				.process(content)
		).toString()
	);

	// Prepare ToC
	let toc: TocElem[] = Array.from(root.querySelectorAll(tocSelector)).map(
		(element: HTMLElement) => {
			const { rawTagName } = element;
			return {
				depth: rawTagName.replace(/^h/g, ""),
				value: element.textContent,
				id: sluggify(element.innerText),
			};
		}
	);
	//fix duplicate ids
	const idCounts = toc.reduce((acc, item) => {
		// Increment the count for this item's id, or set it to 1 if it doesn't exist
		acc[item.id] = (acc[item.id] || 0) + 1;
		return acc;
	}, {} as { [key: string]: number });

	toc = toc.map((item) => {
		if (idCounts[item.id] > 1) {
			// Increment the item's id if it is duplicated in the array
			item.id += "-" + (idCounts[item.id] - 1).toString();
			idCounts[item.id]--; // Decrement the count for this id
		}
		return item;
	});

	//Prepare image gallery
	let imgs: Partial<GalleryImg>[] = Array.from(
		root.querySelectorAll("pixra")
	).map((element: HTMLElement) => {
		return {
			url: element.getAttribute("url"),
			caption: element.getAttribute("caption"),
			definition: element.getAttribute("definition"),
		};
	});

	//Transform elements of the page
	transformers.forEach(({ selector, fn, wrapper }) =>
		Array.from(root.querySelectorAll(selector)).forEach(
			fn
				? fn
				: wrapper
				? (element) =>
						((wrapper: string, element: HTMLElement) => {
							const wrapperElement = createElementFromSelector(wrapper);
							wrapperElement.innerHTML =
								wrapperElement.innerHTML + element.outerHTML;
							element.insertAdjacentHTML("afterend", wrapperElement.outerHTML);
							element.remove();
						})(wrapper, element)
				: () => {}
		)
	);

	// const text = serializeHTMLNodeTree(root);
	return { toc, text: root.outerHTML, imgs };
}
