// Hajiloji `<speaker>` helpers for Pandoc `body.typ` (prepend `#import` here; `#include` does not see `main` or `lojban-book`).
// Bubble fills/strokes = `src/styles/index.css` `.speaker-row--bubble-0..4` (index from TS).
// Avatar `#figure` styling = same file `article .speaker-row__avatar figure` / `.figure_img` / `figcaption` (print: white card).

#let speaker_avatar_border = rgb(229, 231, 235)
#let speaker_avatar_caption = rgb(17, 24, 39)

#let speaker_bubble_fills = (
  rgb("#fbe9e7"),
  rgb("#e3f2fd"),
  rgb("#f3e5f5"),
  rgb("#e8f5e9"),
  rgb("#fff8e1"),
)
#let speaker_bubble_strokes = (
  rgb("#ffccbc"),
  rgb("#bbdefb"),
  rgb("#e1bee7"),
  rgb("#c8e6c9"),
  rgb("#ffecb3"),
)
#let speaker_speech_bubble(idx, body) = {
  let i = calc.rem(int(idx), 5)
  let bf = speaker_bubble_fills.at(i)
  let bs = speaker_bubble_strokes.at(i)
  // Tail outside the rounded rect — `index.css` `::before` / `::after` (11px 13px / 10px 12px; 1px offset).
  let tail-base-o = 9.75pt
  let tail-half-o = 8.25pt
  let tail-base-i = 9pt
  let tail-half-i = 7.5pt
  let tail-col = tail-base-o + 0.5pt
  // PDF: tail top = 6px below speech card top (CSS pseudos use `top: 50%`; book PDF uses fixed offset).
  let tail-top-pad = (6 / 96) * 72pt
  block(width: 100%, breakable: true, clip: false)[
    #pad(left: tail-col)[
      #block(
        width: 100%,
        breakable: true,
        fill: bf,
        stroke: 1pt + bs,
        radius: 8pt,
        inset: (x: 12pt, y: 9pt),
      )[#body]
    ]
    #place(left + top)[
      #pad(top: tail-top-pad)[
        #box(width: tail-col, clip: false)[
          #place(left + top)[
            #polygon(
              fill: bs,
              stroke: none,
              (0pt, 0pt),
              (tail-base-o, tail-half-o),
              (tail-base-o, -tail-half-o),
            )
          ]
          #place(left + top, dx: 0.75pt)[
            #polygon(
              fill: bf,
              stroke: none,
              (0pt, 0pt),
              (tail-base-i, tail-half-i),
              (tail-base-i, -tail-half-i),
            )
          ]
        ]
      ]
    ]
  ]
}

/// Avatar column only: overrides global `show figure` (margin pixra) with site speaker card layout.
/// `multiface`: card width like `.speaker-row--multiface` (`w-16` ≈ 48pt) vs single (`w-20` ≈ 60pt); image height is intrinsic (auto), not fixed CSS `h-20`/`h-16`.
#let speaker_row_avatar_column(multiface: false, body) = {
  let card-w = if multiface { 48pt } else { 60pt }
  show figure.where(kind: image): it => {
    align(center)[
      #block(
        breakable: false,
        width: card-w,
        fill: white,
        stroke: 0.75pt + speaker_avatar_border,
        radius: 2pt,
        clip: true,
      )[
        #stack(spacing: 0pt)[
          #block(
            width: 100%,
            inset: (left: 8pt, right: 8pt, top: 8pt, bottom: 0pt),
          )[
            #align(center + bottom)[#it.body]
          ]
          #block(
            width: 100%,
            inset: (left: 10pt, right: 10pt, top: -6pt, bottom: 8pt),
          )[
            #set align(center)
            #set par(leading: 0.5em, justify: false, spacing: 0.4em)
            #set text(size: 9pt, fill: speaker_avatar_caption)
            #it.caption
          ]
        ]
      ]
    ]
  }
  body
}
