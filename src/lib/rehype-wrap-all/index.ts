import { visit } from "../unist-util-visit";
import { selectAll } from "hast-util-select";
import { parseSelector } from "hast-util-parse-selector";

function transform(tree: any, { selector, wrapper = "div" }: any) {
  for (const match of selectAll(selector, tree)) {
    visit(
      tree,
      match,
      (
        node: any,
        i: any,
        parent: any
      ) => {
        const wrap = parseSelector(wrapper);
        wrap.children = [node];
        parent.children[i] = wrap;
      }
    );
  }
}

/*
 * Attacher
 */
export const wrap = (allOptions: any[]) => {
  /*
   * Transformer
   */
  return (tree: any) => {
    if (Array.isArray(allOptions)) {
      allOptions.forEach((options) => {
        transform(tree, options);
      });
    } else {
      transform(tree, allOptions);
    }
  };
};
