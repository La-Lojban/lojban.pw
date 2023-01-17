import deflist from "remark-deflist";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const { document } = new JSDOM(`<body></body>`).window;
import { parse as hp, HTMLElement } from "node-html-parser";

import { unified } from "unified";
import parse from "remark-parse";
import remark2rehype from "remark-rehype";
import gfm from "remark-gfm";
import stringify from "rehype-stringify";
import raw from "rehype-raw";
import { tocSelector, transformers } from "../config/transformers";
import { sluggify } from "./html-prettifier/slugger";
import { createElementFromSelector } from "./html-prettifier/elements";

export default async function markdownToHtml(markdown: string) {
	const root = hp(
		(
			await unified()
				.use(parse)
				.use(gfm)
				.use(deflist)
				.use(remark2rehype, { allowDangerousHtml: true }) // 4sec
				.use(raw)
				.use(stringify) // makes it all faster???
				.process(markdown)
		).toString()
	);

	const tocTransformers = {
		querySelectorAll: tocSelector,
		fn: (element: HTMLElement) => {
			const { id, rawTagName } = element;
			return {
				depth: rawTagName.replace(/^h/g, ""),
				value: element.textContent,
				id: sluggify(element.innerText),
			};
		},
	};

	const toc = Array.from(
		root.querySelectorAll(tocTransformers.querySelectorAll)
	).map(tocTransformers.fn);

	//transformers
	transformers.forEach(({ selector, fn, wrapper }) =>
		Array.from(root.querySelectorAll(selector)).forEach(
			fn ? fn : wrapper ? (element) => wrapperFn(wrapper, element) : () => {}
		)
	);

	function wrapperFn(wrapper: string, element: HTMLElement) {
		const wrapperElement = createElementFromSelector(wrapper);
		wrapperElement.innerHTML = wrapperElement.innerHTML + element.outerHTML;
		element.insertAdjacentHTML('afterend',wrapperElement.outerHTML);
		element.remove();
	}

	return { toc, text: root.outerHTML };
}
