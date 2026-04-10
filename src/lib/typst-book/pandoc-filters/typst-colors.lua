-- Map HTML Span(style=color:#hex) to Typst #text(fill: rgb(...))[inner]
function Span(el)
  local style = el.attributes and el.attributes.style
  if not style then
    return nil
  end
  local hex = style:match("color:%s*(#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f])")
  if not hex then
    hex = style:match("color:%s*(#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f])")
  end
  if not hex then
    return nil
  end
  local doc = pandoc.Pandoc({ pandoc.Plain(el.content) })
  local inner = pandoc.write(doc, "typst")
  inner = inner:gsub("^%s+", ""):gsub("%s+$", "")
  if inner == "" then
    return nil
  end
  return pandoc.RawInline("typst", '#text(fill: rgb("' .. hex .. '"))[' .. inner .. "]")
end
