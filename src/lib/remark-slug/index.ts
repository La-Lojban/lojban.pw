import { toString } from "./toString";
import { visit } from "../unist-util-visit";
const slugs = require("github-slugger")();

export function slug() {
  return transformer;
}

// Patch slugs on heading nodes.
function transformer(ast: any) {
  slugs.reset();

  visit(ast, "heading", visitor);

  function visitor(node: any) {
    const data = node.data || (node.data = {});
    const props = data.hProperties || (data.hProperties = {});
    const id = (
      props.id ? slugs.slug(props.id, true) : slugs.slug(toString(node))
    )
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, " ");
    data.value = toString(node);
    data.id = id;
    props.id = id;
  }
}
