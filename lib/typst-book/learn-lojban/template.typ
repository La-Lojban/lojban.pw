// Learn Lojban — Typst template (running header = section ##/###, brand palettes, site-like tables)
// Cover: unnumbered, light wash + palette moiré (see `brandbooks.typ`); body: Arabic from 1.

#import "brandbooks.typ": cover-bg-for-brand, page-bg-for-brand, resolve-brand

#let figure-col-width = 51mm

// Article tables — `index.css`: rounded-sm, border-gray-200, px-3 py-4; book PDF uses uniform cells (no thead row).
#let tbl-border = rgb(175, 185, 200)
#let tbl-cell = rgb(255, 255, 255)
// Pixra: ~1px gray stroke (site uses CSS `shadow`; PDF has no drop shadows).
#let pixra-border-1px = 0.75pt + tbl-border
// 1px border at 96dpi → Typst pt
#let tbl-rule = 0.85pt + tbl-border
#let widget-rule = 1.05pt
// Tighter than site px-3 py-4 for denser book PDFs
#let tbl-inset-x = 6pt
#let tbl-inset-y = 8pt
// rounded-sm (~2px) + slight bump for print
#let tbl-radius = 3pt

// Must match `set page` left/right margin — used to bleed headings (and running header) to paper edge.
#let page-margin-x = 11mm

// Blockquotes: white card; brand accent = thick left stroke only (same height as card — no separate `rect` column).
#let quote-max-width = 62%
// Lighter than `tbl-border` — blockquote frame only (tables keep `tbl-border`).
#let quote-frame-border = rgb(229, 231, 235)
#let quote-border-1px = 0.75pt + quote-frame-border
#let quote-left-accent = 3.2pt

// Cover typography: Lavi when installed; only stacks Typst can resolve without extra TTFs (CI/Docker).
// (Cormorant Garamond, Source Sans 3, Libertinus Sans removed — not guaranteed in CI/Docker.)
#let cover-title-fonts = (
  "Lavi",
  "Libertinus Serif",
  "Noto Serif",
  "DejaVu Serif",
)
#let cover-subtitle-fonts = (
  "Lavi",
  "Noto Sans",
  "DejaVu Sans",
)

// Running header: innermost section = last ### if any since last ##, else last ##; none → book title.
#let section-h2 = state("section-h2", none)
#let section-h3 = state("section-h3", none)

#let header-bar(book_title, bb) = context {
  let s3 = section-h3.get()
  let s2 = section-h2.get()
  let label = if s3 != none {
    s3
  } else if s2 != none {
    s2
  } else {
    book_title
  }
  // Light bar: white ground, palette `header-rule` hairline (sides + bottom; no rule on top margin edge).
  block(
    width: 100%,
    inset: (x: 10pt, y: 7.5pt),
    radius: (bottom: 4pt),
    fill: white,
    stroke: (
      top: none,
      left: 0.85pt + bb.header-rule,
      right: 0.85pt + bb.header-rule,
      bottom: 0.85pt + bb.header-rule,
    ),
  )[
    #set text(9.8pt, weight: "bold", fill: bb.header-text)
    #set align(left)
    #label
  ]
}

#let lojban-book(
  title: "",
  description: "",
  cover-image: none,
  /// FNV-1a style hash of title from build (cover angles / accents when palette is set).
  title-hash: 0,
  /// Optional 0..5 = ember..arctic; `none` = palette index from `calc.rem(title-hash, 6)`.
  palette: none,
  body,
) = {
  set document(title: title)
  let bb = resolve-brand(title-hash, palette: palette)

  page(
    margin: 0pt,
    numbering: none,
    fill: bb.cover-page-fill,
    header: none,
    footer: none,
  )[
    #place(top + left, cover-bg-for-brand(bb))
    #align(center + horizon)[
      #block(width: 100%, inset: (x: 16mm, y: 24mm))[
        #set align(center)
        #if cover-image != none {
          block(
            width: 70%,
            radius: 10pt,
            clip: true,
            stroke: 0.85pt + bb.header-rule.transparentize(52%),
          )[
            #align(center)[
              #image(cover-image, width: 100%, fit: "contain")
            ]
          ]
          v(2.4em)
        }
        // Title: dominant display size, slight tightening for large setting
        #text(
          font: cover-title-fonts,
          size: 46pt,
          weight: "bold",
          fill: bb.h1,
          tracking: -0.02em,
        )[#title]
        #v(1.15em)
        #align(center)[
          #box(width: 42mm)[
            #line(
              length: 100%,
              stroke: 0.95pt + bb.header-rule.transparentize(35%),
            )
          ]
        ]
        #v(1.05em)
        // Description: comfortable measure & line height for subtitle copy
        #block(width: 78%)[
          #set par(leading: 1.5em, justify: false)
          #text(
            font: cover-subtitle-fonts,
            size: 17pt,
            fill: color.mix((bb.h2, 78%), (bb.page-tiling-stroke, 22%), space: rgb),
          )[#description]
        ]
      ]
    ]
  ]

  set page(
    paper: "a4",
    margin: (left: page-margin-x, right: page-margin-x, top: 20mm, bottom: 17mm),
    numbering: (..n) => numbering("1", ..n),
    background: context {
      page-bg-for-brand(bb)
    },
    header: context {
      // Pin the bar to the top of the top-margin band (default bottom-align hides it
      // when combined with ascent). Do not use header-ascent: 100% — it can move the
      // header outside the clipped margin region in Typst 0.14+.
      align(top + left, header-bar(text(title), bb))
    },
  )
  counter(page).update(1)

  set text(
    font: ("Libertinus Serif", "Noto Serif", "DejaVu Serif"),
    size: 11pt,
    lang: "en",
  )
  set par(justify: true, leading: 0.78em, spacing: 1.2em)

  set heading(numbering: none)

  // Dialogue tables (Lojban Through Dialogues): `<speaker>` in the Lojban column expands to `speaker-row` HTML, then Pandoc — not the margin-pixra `#figure` band (`patch-body-float-figures.ts`).
  // Article table: full grid stroke; every cell same fill + alignment (no `<th>` / first-row chrome).
  // Vertical center in every cell, every row (explicit callback so no column inherits other alignment).
  set table(
    stroke: (x, y) => (
      left: tbl-rule,
      top: tbl-rule,
      right: tbl-rule,
      bottom: tbl-rule,
    ),
    inset: (x: tbl-inset-x, y: tbl-inset-y),
    fill: tbl-cell,
    align: (x, y) => left + horizon,
  )

  set list(
    indent: 1.15em,
    body-indent: 0.55em,
    spacing: 0.55em,
    marker: (depth) => {
      text(
        font: ("Noto Color Emoji", "DejaVu Sans"),
        size: 0.92em,
      )[#if depth == 1 [🌼] else [⚙️]]
      h(0.35em)
    },
  )

  // Inside `[…]` markup, `block(...)` is literal text unless prefixed with `#` (same as figure rules below).
  // One card: thick brand left stroke + thin gray other sides (no separate `rect` column — avoids full-height strip).
  // Shrink-to-fit up to 62% of line (measure with width cap for wrapping).
  // `block(spacing)` stacks with `par(spacing)` between Pandoc paragraphs — use `0pt` here; tune only `par`.
  show quote: it => {
    layout(size => {
      let cap = quote-max-width * size.width
      let q = block(
        width: 100%,
        breakable: false,
        fill: white,
        stroke: (
          left: quote-left-accent + bb.quote-border,
          top: quote-border-1px,
          right: quote-border-1px,
          bottom: quote-border-1px,
        ),
        inset: (left: 10pt, y: 1em, right: 9pt),
        radius: 0pt,
        spacing: 0.26em,
      )[
        #set block(spacing: 0.5em)
        #it.body
      ]
      let dims = measure(q, width: cap)
      align(left)[
        #block(width: dims.width)[
          #q
        ]
      ]
    })
  }

  set figure(numbering: none)
  set figure(gap: 0.35em)
  // Pixra cards: styled here. Two-column band (main text left, pixra queue on the right) is built in
  // `patch-body-float-figures.ts` after Pandoc (per flow region between headings / tables / Mermaid).
  // Inside `[...]` markup, function calls must use `#` or they are printed as plain text.
  show figure.where(kind: image): it => {
    align(right)[
      #block(
        breakable: false,
        width: figure-col-width,
        clip: true,
        fill: white,
        stroke: pixra-border-1px,
        radius: (bottom-right: 4pt, bottom-left: 4pt, top-right: 4pt, top-left: 4pt),
        inset: (x: 8pt, y: 8pt),
        spacing: 0.4em,
      )[
        #it.body
        #set align(center)
        #set text(size: 9pt, weight: "medium", fill: bb.h3)
        #it.caption
      ]
    ]
  }
  // Tables already styled by `show table` below.
  // Keep figure(table) default so we avoid double wrappers (`figure` + `table`) and
  // centered inner gaps around dialogue tables.
  show figure.where(kind: table): it => it

  // Headings: larger type, white ground, top/bottom rules only (no left/right stroke)
  show heading.where(level: 1): it => {
    section-h2.update(none)
    section-h3.update(none)
    // No `pagebreak(weak: true)` here: Typst 0.14 forbids page breaks inside pandoc’s nested
    // `#block[...]` stacks (CLL `body.typ`). Spacing + sticky heading blocks still separate sections.
    v(0.45em)
    block(width: 100%, breakable: false, sticky: true)[
      #block(
        width: 100%,
        outset: (left: page-margin-x, right: page-margin-x),
        fill: white,
        stroke: (
          top: widget-rule + bb.header-rule,
          bottom: widget-rule + bb.header-rule,
        ),
        inset: (left: 14pt, y: 12pt, right: 12pt),
        radius: 0pt,
      )[
        #text(
          size: 1.82em,
          weight: "bold",
          fill: bb.h1,
          tracking: -0.02em,
        )[#it.body]
      ]
    ]
    v(0.9em)
  }

  show heading.where(level: 2): it => {
    section-h3.update(none)
    section-h2.update(it.body)
    v(0.35em)
    block(width: 100%, breakable: false, sticky: true)[
      #block(
        width: 100%,
        outset: (left: page-margin-x, right: page-margin-x),
        fill: white,
        stroke: (
          top: widget-rule + bb.header-rule,
          bottom: widget-rule + bb.header-rule,
        ),
        inset: (left: 12pt, y: 9pt, right: 11pt),
        radius: 0pt,
      )[
        #text(size: 1.52em, weight: "bold", fill: bb.h2)[#it.body]
      ]
    ]
    v(0.6em)
  }

  show heading.where(level: 3): it => {
    section-h3.update(it.body)
    v(0.65em)
    block(width: 100%, breakable: false, sticky: true)[
      #block(
        width: 100%,
        outset: (left: page-margin-x, right: page-margin-x),
        fill: white,
        stroke: (
          top: widget-rule + bb.header-rule,
          bottom: widget-rule + bb.header-rule,
        ),
        inset: (left: 11pt, y: 7pt, right: 10pt),
        radius: 0pt,
      )[
        #text(size: 1.24em, weight: "bold", fill: bb.h3)[#it.body]
      ]
    ]
    v(0.45em)
  }

  // #### (e.g. "Task") — same header band as ### but smaller type (no weak page break).
  show heading.where(level: 4): it => {
    v(0.5em)
    block(width: 100%, breakable: false, sticky: true)[
      #block(
        width: 100%,
        outset: (left: page-margin-x, right: page-margin-x),
        fill: white,
        stroke: (
          top: widget-rule + bb.header-rule,
          bottom: widget-rule + bb.header-rule,
        ),
        inset: (left: 10pt, y: 6pt, right: 9pt),
        radius: 0pt,
      )[
        #text(size: 1.08em, weight: "bold", fill: bb.h3)[#it.body]
      ]
    ]
    v(0.35em)
  }

  set page(footer: context {
    let n = counter(page).get().first()
    set align(right)
    box(
      fill: bb.footer-fill.transparentize(6%),
      stroke: bb.footer-stroke + 1.05pt,
      radius: 5pt,
      inset: (x: 11pt, y: 5pt),
    )[#text(size: 9pt, weight: "bold", fill: bb.footer-text)[#str(n)]]
  })

  // Single stroke (no drop shadow — matches site tables after removing Tailwind `shadow`).
  show table: it => {
    block(breakable: false, width: 100%, above: 6pt, below: 12pt)[
      #block(
        width: 100%,
        clip: true,
        radius: tbl-radius,
        fill: white,
        stroke: widget-rule + tbl-border,
      )[#it]
    ]
  }

  body
}
