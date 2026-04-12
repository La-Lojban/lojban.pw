import React, { ReactElement } from "react";
import parse, {
  attributesToProps,
  Element,
  domToReact,
} from "html-react-parser";
import { TfQuiz } from "../components/tf-quiz";
import { PostProps } from "../types/post";

/** HTML void elements must not receive children in React (see first img + fetchpriority). */
const VOID_HTML_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function domToReactChildren(
  tagName: string,
  children: unknown[] | undefined
): React.ReactNode {
  if (VOID_HTML_TAGS.has(tagName.toLowerCase())) return null;
  return domToReact((children ?? []) as any);
}

function isDomElement(n: unknown): n is Element {
  return typeof n === "object" && n !== null && "name" in n && "attribs" in n;
}

function domTextContent(n: unknown): string {
  if (!n || typeof n !== "object") return "";
  const node = n as {
    type?: string;
    data?: string;
    children?: unknown[];
  };
  if (node.type === "text") return String(node.data ?? "");
  if (node.children && Array.isArray(node.children))
    return node.children.map(domTextContent).join("");
  return "";
}

/** HTML `fetchpriority` → React `fetchPriority` (avoids invalid DOM prop warning). */
function attribsToProps(attribs: Record<string, string>) {
  const { fetchpriority, ...rest } = attribs;
  const converted = attributesToProps(rest);
  return fetchpriority !== undefined
    ? { ...converted, fetchPriority: fetchpriority }
    : converted;
}

export function buildDOMFromJSONBasic(
  html: string,
  { state, setState }: Partial<PostProps<any>>
): ReactElement {
  return parse(html, {
    replace: (domNode) => {
      if (
        isDomElement(domNode) &&
        domNode.name === "section" &&
        domNode.attribs?.class?.split(/\s+/).includes("tf-quiz")
      ) {
        const ans = domNode.attribs["data-answers"] ?? "";
        const ol = domNode.children?.find(
          (c) => isDomElement(c) && c.name === "ol"
        );
        if (!isDomElement(ol) || !ol.children) {
          return (
            <p className="tf-quiz__error">Missing quiz list.</p>
          ) as unknown as ReactElement;
        }
        const questions = ol.children
          .filter((c) => isDomElement(c) && c.name === "li")
          .map((li) => domTextContent(li).trim());
        return <TfQuiz answers={ans} questions={questions} /> as unknown as ReactElement;
      }
      if (
        domNode instanceof Element &&
        domNode.attribs?.class?.split(" ")?.includes("figure_img")
      ) {
        const props = attribsToProps(domNode.attribs);
        const tag = domNode.name;
        const el = React.createElement(
          tag,
          {
            ...props,
            onClick: () => {
              setState &&
                setState((p: { galleryShown: boolean }) => ({
                  ...p,
                  galleryShown: !p.galleryShown,
                  currentImgUrl: domNode.attribs["data-url"],
                }));
            },
          },
          domToReactChildren(tag, domNode.children as unknown[] | undefined)
        );
        return el;
      } else if (domNode instanceof Element && domNode.attribs?.onclick) {
        const { onclick, ...props } = attribsToProps(domNode.attribs) as {
          onclick?: string;
          [key: string]: unknown;
        };
        const tag = domNode.name;
        const el = React.createElement(
          tag,
          {
            ...props,
            onClick: () => {
              eval(domNode.attribs.onclick);
            },
          },
          domToReactChildren(tag, domNode.children as unknown[] | undefined)
        );
        return el;
      } else if (
        domNode instanceof Element &&
        domNode.attribs &&
        "fetchpriority" in domNode.attribs
      ) {
        const props = attribsToProps(domNode.attribs);
        const tag = domNode.name;
        return React.createElement(
          tag,
          props as React.HTMLAttributes<HTMLElement>,
          domToReactChildren(tag, domNode.children as unknown[] | undefined)
        );
      }
      return domNode;
    },
  }) as ReactElement;
}
