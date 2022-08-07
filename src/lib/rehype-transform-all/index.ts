import { visit } from "../unist-util-visit";
import { selectAll } from "hast-util-select";
import { parseSelector } from "hast-util-parse-selector";

function transformAll(tree: any, { selector, wrapper, func }: any) {
  for (const match of selectAll(selector, tree)) {
    visit(tree, match, (node: any, i: any, parent: any) => {
      if (func instanceof Function) {
        func.apply(null, [{ parent, node, nodeIndex: i }]);
      } else if (wrapper) {
        const wrap = parseSelector(wrapper);
        wrap.children = [node];
        parent.children[i] = wrap;
      }
    });
  }
}

/*
 * Attacher
 */
export const transform = (allOptions: any[]) => {
  /*
   * Transformer
   */
  return (tree: any) => {
    if (Array.isArray(allOptions)) {
      allOptions.forEach((options) => {
        transformAll(tree, options);
      });
    } else {
      transformAll(tree, allOptions);
    }
  };
};
