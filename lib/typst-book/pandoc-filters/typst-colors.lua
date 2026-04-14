-- Map HTML Span(style=color:#hex, optional font-weight:700) to Typst #text(...)[inner]
function Span(el)
  local style = el.attributes and el.attributes.style
  if not style then
    return nil
  end
  local hex = style:match("color:%s*(#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f])")
  if not hex then
    hex = style:match("color:%s*(#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f])")
  end
  local bold = style:match("font%-weight:%s*700") or style:match("font%-weight:%s*bold")
  if not hex and not bold then
    return nil
  end
  local doc = pandoc.Pandoc({ pandoc.Plain(el.content) })
  local inner = pandoc.write(doc, "typst")
  inner = inner:gsub("^%s+", ""):gsub("%s+$", "")
  if inner == "" then
    return nil
  end
  if hex and bold then
    return pandoc.RawInline("typst", '#text(fill: rgb("' .. hex .. '"), weight: 700)[' .. inner .. "]")
  end
  if hex then
    return pandoc.RawInline("typst", '#text(fill: rgb("' .. hex .. '"))[' .. inner .. "]")
  end
  return pandoc.RawInline("typst", "#text(weight: 700)[" .. inner .. "]")
end
