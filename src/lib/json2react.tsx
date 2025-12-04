import React, { ReactElement } from "react";
import parse, {
  attributesToProps,
  Element,
  domToReact,
} from "html-react-parser";
import { PostProps } from "../types/post";

export function buildDOMFromJSONBasic(
  html: string,
  { state, setState }: Partial<PostProps<any>>
): ReactElement {
  return parse(html, {
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs?.class?.split(" ")?.includes("figure_img")
      ) {
        const props = attributesToProps(domNode.attribs);
        const el = React.createElement(
          domNode.tagName,
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
          domToReact(domNode.children as any)
        );
        return el;
      } else if (domNode instanceof Element && domNode.attribs?.onclick) {
        const { onclick, ...props } = attributesToProps(domNode.attribs);
        const el = React.createElement(
          domNode.tagName,
          {
            ...props,
            onClick: () => {
              eval(domNode.attribs.onclick);
            },
          },
          domToReact(domNode.children as any)
        );
        return el;
      }
      return domNode;
    },
  }) as ReactElement;
}
