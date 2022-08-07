import html from "remark-html";
const deflist = require("remark-deflist");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM(`<body></body>`).window;
import { fromDom } from "hast-util-from-dom";

// const include = require('./remark-include/index.js')
const unified = require("unified");
import parse from "remark-parse";
import remark2rehype from "remark-rehype";
const gfm = require("remark-gfm");
const format = require("rehype-format");
import stringify from "rehype-stringify";
import raw from "rehype-raw";

import { slug } from "./remark-slug/";

const extractToc = require("remark-extract-toc");
const processor = unified()
  .use(parse)
  .use(slug)
  .use(extractToc, { keys: ["data"], flatten: true });

import { transform } from "./rehype-transform-all";

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
    .use(transform, [
      { selector: "blockquote", wrapper: "div.wrapper.with-blockquote" },
      { selector: "figure", wrapper: "div.wrapper" },
      { selector: "figure > img", wrapper: "div.figure_img" },
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
        selector: "h1, h2, h3, h4, h5",
        func: ({ node }: { node: any }) => {
          const a = document.createElement("a");
          a.className = "print:hidden";
          a.innerHTML = `<span class="in-heading hash">#</span>`;
          a.setAttribute(
            "aria-hidden",
            true
          );
          a.setAttribute("tabindex", -1)
          a.setAttribute("href", "#" + node.properties.id)
          const hast = fromDom(a);
          node.children.push(hast);
        },
      },
      {
        selector: ".guibutton",
        func: ({ parent, node }: { parent: any; node: any }) => {
          function encodeValsiForWeb(v: string) {
            return encodeURIComponent(v).replace(/'/g, "\\'").trim();
          }
          const slug = encodeValsiForWeb(node.children[0].value);
          const button = document.createElement("button");
          button.className = "tutci print:hidden";
          button.innerHTML = "▶";
          button.setAttribute(
            "onclick",
            `(function (){var s=new Audio('https://la-lojban.github.io/sutysisku/sance/lerfu/${slug}.ogg');s.play()})()`
          );
          const hast = fromDom(button);
          parent.children.push(hast);
        },
      },
    ])
    .process(markdown);
  const node = processor.parse(markdown);
  const tree = (processor as any)
    .runSync(node)
    .map((i: any) => ({ depth: i.depth, value: i.data.value, id: i.data.id }));
  return { toc: tree, text: result.contents.toString() };
}
