import { Node, Parent } from "unist";
import { Test } from "unist-util-is";
import { Visitor } from "./complex-types";

import { visitParents } from "unist-util-visit-parents";

/**
 * Visit children of tree which pass test.
 *
 * @param tree
 *   Tree to walk
 * @param [test]
 *   `unist-util-is`-compatible test
 * @param visitor
 *   Function called for nodes that pass `test`.
 * @param reverse
 *   Traverse in reverse preorder (NRL) instead of preorder (NLR) (default).
 */
export const visit = function (
  tree: Node,
  test: any,
  visitor: Visitor,
  reverse = false
) {
  visitParents(tree, test, overload, reverse);

  function overload(node: Node, parents: Array<Parent>) {
    const parent = parents[parents.length - 1];
    return visitor(node, parent ? parent.children.indexOf(node) : null, parent);
  }
};
