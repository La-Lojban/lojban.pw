import { unified } from "unified";
import remarkParse from "remark-parse";
import gfm from "remark-gfm";
import remarkMermaid from "./remark-plugins/mermaid-ssr";
import rehypeKatex from "rehype-katex";
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import raw from "rehype-raw";
import stringify from "rehype-stringify";

import htmlParser, { HTMLElement } from "node-html-parser";
import { allSelector, tocSelector, transformers } from "../config/transformers";
import { sluggify } from "./html-prettifier/slugger";
import { createElementFromSelector } from "./html-prettifier/elements";
import { TocElem } from "../types/toc";
import { GalleryImg } from "../types/gallery-img";
import path from "path";
import replaceIncludes from "./remark-plugins/include/";
import { expandFirstLojbanSpeakerTags } from "./expandFirstLojbanSpeakerTags";
import { markdownEnableHtmlTableCellMarkdown } from "./markdownHtmlTableCellMarkdown";
import { markdownNormalizeThematicBreaks } from "./markdownNormalizeThematicBreaks";
// import { serializeHTMLNodeTree } from "./json2react";

export default async function markdownToHtml({
  content,
  fullPath,
}: {
  content: string;
  fullPath: string;
}) {
  content = replaceIncludes(content, {
    resolveFrom: path.resolve(fullPath, ".."),
  });
  content = expandFirstLojbanSpeakerTags(content);
  content = markdownEnableHtmlTableCellMarkdown(content);
  content = markdownNormalizeThematicBreaks(content);
  const root = htmlParser.parse(
    (
      await unified()
        .use(remarkParse)
        .use(gfm)
        .use(remarkMermaid, {
          wrap: true,
          className: ["mermaid"],
          themeVariables: {
            fontFamily:
              "Linux Libertine, Libertine, Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif",
          },
          flowchart: {
            useMaxWidth: true,
          },
          gitGraph: {
            useMaxWidth: true,
          },
          //   htmlLabels: true,
          //   securityLevel: "loose",
        })
        .use(remarkMath)
        .use(remarkDefinitionList)
        .use(remarkRehype, {
          handlers: {
            // any other handlers
            ...defListHastHandlers,
          },
          allowDangerousHtml: true,
        }) // 4sec
        .use(rehypeKatex, { strict: false, output: "html" })
        .use(raw)
        .use(stringify) // makes it all faster???
        .process(content)
    ).toString()
  );

  let allHeaders: TocElem[] = Array.from(
    root.querySelectorAll(allSelector.join(","))
  ).map((element: HTMLElement) => {
    const { rawTagName } = element;
    return {
      depth: rawTagName.replace(/^h/g, ""),
      value: element.textContent,
      id: sluggify(element.innerText),
      tagName: element.tagName.toLowerCase(),
    };
  });

  //fix duplicate ids
  const idCounts: { [key: string]: number } = {};

  const toc = allHeaders
    .map((item) => {
      if (idCounts[item.id] === undefined) {
        idCounts[item.id] = 1;
      } else {
        idCounts[item.id]++;
        item.id += "-" + idCounts[item.id].toString();
        idCounts[item.id] = 1;
      }
      return item;
    })
    .filter((item) => tocSelector.includes(item.tagName));

  // Gallery URLs: explicit <pixra> plus every portrait in .speaker-row. Dialogue sprites often
  // appear only via expanded <speaker>/<speakers> (not duplicated as <pixra>), so we scrape the
  // final HTML instead of re-parsing markdown attributes.
  const fromPixra: Partial<GalleryImg>[] = Array.from(
    root.querySelectorAll("pixra")
  ).map((element: HTMLElement) => {
    return {
      url: element.getAttribute("url"),
      redirect: element.getAttribute("redirect") ?? null,
      caption:
        element.getAttribute("caption") ??
        element.getAttribute("definition") ??
        "",
      definition:
        element.getAttribute("definition") ??
        element.getAttribute("caption") ??
        "",
    };
  });
  const fromSpeakerPortraits: Partial<GalleryImg>[] = Array.from(
    root.querySelectorAll(".speaker-row .figure_img[data-url]")
  ).map((element: HTMLElement) => {
    const url = element.getAttribute("data-url");
    const img = element.querySelector("img");
    const alt = img?.getAttribute("alt") ?? "";
    return {
      url,
      redirect: null,
      caption: alt,
      definition: alt,
    };
  });
  const seen = new Set<string>();
  let imgs: Partial<GalleryImg>[] = [];
  for (const item of [...fromPixra, ...fromSpeakerPortraits]) {
    const u = item.url ?? "";
    if (!u || seen.has(u)) continue;
    seen.add(u);
    imgs.push(item);
  }

  //Transform elements of the page
  transformers.forEach(({ selector, fn, wrapper }) =>
    Array.from(root.querySelectorAll(selector)).forEach(
      fn
        ? fn.bind({ idCounts: {} as { [key: string]: number } })
        : wrapper
          ? (element) =>
              ((wrapper: string, element: HTMLElement) => {
                const wrapperElement = createElementFromSelector(wrapper);
                wrapperElement.innerHTML =
                  wrapperElement.innerHTML + element.outerHTML;
                element.insertAdjacentHTML(
                  "afterend",
                  wrapperElement.outerHTML
                );
                element.remove();
              })(wrapper, element)
          : () => {}
    )
  );

  const imgsNodes = root.querySelectorAll("img");
  imgsNodes.forEach((img, index) => {
    const el = img as HTMLElement;
    if (!el.getAttribute("decoding")) el.setAttribute("decoding", "async");
    if (index === 0) {
      el.setAttribute("fetchpriority", "high");
      el.setAttribute("loading", "eager");
    } else if (!el.getAttribute("loading")) {
      el.setAttribute("loading", "lazy");
    }
  });

  const html = root.outerHTML;
  const hasMath = html.includes("katex");

  return { toc, text: html, imgs, hasMath };
}
