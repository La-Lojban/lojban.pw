import { toString } from './toString'
const visit = require('unist-util-visit')
const slugs = require('github-slugger')()

export function slug() {
  return transformer
}

// Patch slugs on heading nodes.
function transformer(ast: any) {
  slugs.reset()

  visit(ast, 'heading', visitor)

  function visitor(node: any) {
    var data = node.data || (node.data = {})
    var props = data.hProperties || (data.hProperties = {})
    var id = props.id

    id = id ? slugs.slug(id, true) : slugs.slug(toString(node))
    id = id.replace(/[^\w\s-]/g, "").replace(/\s+/g, " ")
    data.value = toString(node)
    data.id = id
    props.id = id
  }
}
