import * as playwright from "playwright-core";
import rehypeParse from "rehype-parse";
import { optimize } from "svgo";
import { unified } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

import { isParent } from "./mdast-util-node-is";

import type { Code, Paragraph } from "mdast";
// import type Mermaid from "mermaid";
import type { MermaidConfig } from "mermaid";
import type { Config as SvgoConfig } from "svgo";
import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";

// we want to check types for browser-executed mermaid codes, but don't want to "import" any mermaid modules in them.
// declare const mermaid: typeof Mermaid;

export const UserTheme = {
  Forest: "forest",
  Dark: "dark",
  Default: "default",
  Neutral: "neutral",
  Null: "null",
} as const;

export type Theme = typeof UserTheme[keyof typeof UserTheme];

export interface RemarkMermaidOptions {
  /**
   * Launch options to pass to playwright.
   *
   * @default {}
   */
  launchOptions?: playwright.LaunchOptions;

  /**
   * The Mermaid theme to use.
   *
   * @default 'default'
   */
  theme?: Theme;

  themeVariables?: {
    fontSize?: string;
    fontFamily?: string;
  };

  /**
   * Whether to wrap svg with <div> element.
   *
   * @default "false"
   */
  wrap?: boolean;

  /**
   * When wrapping with <div>, you can choose what classname to add.
   * @default []
   */
  className?: string[];

  htmlLabels?: boolean;

  securityLevel?: "loose" | undefined;
}

function svgParse(svg: string): Node {
  const processor = unified().use(rehypeParse);
  const ast = processor.parse(svg);
  return ast;
}

function isMermaid(node: unknown): node is Code {
  if (!is(node, { type: "code", lang: "mermaid" })) {
    return false;
  }
  return true;
}

type MermaidBlock = [Code, number, Parent];

const remarkMermaid: Plugin<[RemarkMermaidOptions?]> = function mermaidTrans(
  options
): Transformer {
  const DEFAULT_SETTINGS = {
    launchOptions: {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
      ],
    },
    theme: "default",
    wrap: false,
    className: [],
  };

  const settings = Object.assign({}, DEFAULT_SETTINGS, options);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (node: Node, _file: VFileCompatible) => {
    const mermaidBlocks = getMermaidBlocks(node);
    if (mermaidBlocks.length === 0) {
      return;
    }
    const browser = await playwright.chromium.launch(settings.launchOptions);
    const context = await browser.newContext({
      viewport: { width: 1000, height: 3000 },
    });
    const page = await context.newPage();
    let errorMessages: string[] = [];
    page.on("console", (msg) => errorMessages.push(msg.text()));
    const config: MermaidConfig = {
      ...settings,
      startOnLoad: false,
    };
    await page.setContent(
      `<!DOCTYPE html><html><body><div>
      ${mermaidBlocks
        .map(([node]) => `<pre class="mermaid">${node.value}</pre>`)
        .join("")}
      </div><p></p>
      <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        mermaid.initialize(${JSON.stringify(config)});
        await mermaid.run()
        document.querySelector("p").remove();
      </script>
      </body>
      </html>`
    );
    let svgResults: string[];
    try {
      await page.waitForSelector("p", {
        state: "detached",
      });
      svgResults = await page.evaluate(() => {
        const pres = document.querySelectorAll(".mermaid");
        return Array.from(pres).map(
          (pre) => pre.querySelector("svg")?.outerHTML ?? ""
        );
      });
    } catch (error: any) {
      svgResults = [errorMessages.concat(error?.message).join(";")];
    }
    await browser.close();

    if (errorMessages.length > 0) {
      console.log(errorMessages);
    } else {
      mermaidBlocks.forEach(([, index, parent], i) => {
        const svgAst = svgParse(optSvg(svgResults[i] ?? svgResults[0]));
        if (settings.wrap) {
          parent.children[index] = {
            type: "parent",
            children: [],
            data: {
              hChildren: [
                {
                  type: "element",
                  children: [svgAst],
                  tagName: "div",
                  properties: {
                    className: settings.className,
                  },
                },
              ],
            },
          } as Parent;
        } else {
          parent.children[index] = {
            type: "paragraph",
            children: [],
            data: {
              hChildren: [svgAst],
            },
          } as Paragraph;
        }
      });
    }
  };
};

function getMermaidBlocks(node: Node): MermaidBlock[] {
  const blocks: MermaidBlock[] = [];

  visit(
    node,
    isMermaid,
    (node: Code, index: number, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }
      blocks.push([node, index, parent]);
    }
  );

  return blocks;
}

function optSvg(svg: string) {
  const svgoOptions: SvgoConfig = {
    js2svg: {
      indent: 2,
      pretty: true,
    },
    multipass: false,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupEnableBackground: false,
            convertShapeToPath: false,
            inlineStyles: {
              onlyMatchedOnce: false,
            },
            moveElemsAttrsToGroup: false,
            moveGroupAttrsToElems: false,
            removeEmptyAttrs: false,
            removeUselessStrokeAndFill: {
              removeNone: true,
            },
          },
        },
      },
      "convertStyleToAttrs",
      "removeOffCanvasPaths",
      "removeRasterImages",
      "removeScriptElement",
      "removeStyleElement",
      "removeXMLNS",
      "reusePaths",
      {
        name: "removeAttrs",
        params: {
          attrs: ["class"],
        },
      },
    ],
  };

  const value = optimize(svg, svgoOptions).data;
  return value;
}

export default remarkMermaid;
