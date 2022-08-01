import html from "remark-html";
const deflist = require("remark-deflist");

// const include = require('./remark-include/index.js')
const unified = require("unified");
import parse from "remark-parse";
import remark2rehype from "remark-rehype";
const gfm = require("remark-gfm");
const format = require("rehype-format");
import stringify from "rehype-stringify";
import h from "hastscript";
import raw from "rehype-raw";

import { slug } from "./remark-slug/";
import link from "rehype-autolink-headings";

const extractToc = require("remark-extract-toc");
const processor = unified()
  .use(parse)
  .use(slug)
  .use(extractToc, { keys: ["data"], flatten: true });

const { wrap } = require("./rehype-wrap-all");

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    // .use(include, { cwd: process.env.md_content })
    .use(html)
    .use(parse)
    .use(gfm)
    .use(slug)
    // .use(directive)
    .use(deflist)
    // .use(htmlDirectives)
    .use(remark2rehype, { allowDangerousHtml: true }) // 4sec
    .use(raw)
    .use(format)
    .use(stringify) // makes it all faster???
    .use(wrap, [
      { selector: "blockquote", wrapper: "div.wrapper.with-blockquote" },
      { selector: "figure", wrapper: "div.wrapper" },
      { selector: "figure > img", wrapper: "div.figure_img" },
      { selector: "table", wrapper: "div.md-typeset__table" },
      {
        selector: "div.md-typeset__table",
        wrapper: "div.md-typeset__scrollwrap",
      },
    ])
    .use(link, {
      behavior: "append",
      content: () => {
        return [h("span.in-heading.hash", "#")];
      },
    })
    .process(markdown);
  const node = processor.parse(markdown);
  const tree = (processor as any)
    .runSync(node)
    .map((i: any) => ({ depth: i.depth, value: i.data.value, id: i.data.id }));
  return { toc: tree, text: result.contents.toString() };
}
