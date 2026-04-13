// Hajiloji `<speaker>` helpers for Pandoc `body.typ` (prepend `#import` here; `#include` does not see `main` or `lojban-book`).
// Shared by every book PDF that uses this module (e.g. first-lojban, lojban-through-dialogues): one tail geometry, no per-book overrides.
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
  // Tail mostly left of rounded rect; `tail-inset` overlaps bubble slightly — see `index.css` `::before` / `::after`.
  let tail-base-o = 9.75pt
  let tail-half-o = 8.25pt
  let tail-base-i = 9pt
  let tail-half-i = 7.5pt
  // Nudge tail into bubble (matches “tail slightly inside” in print).
  let tail-inset = 0.5pt
  let tail-col = tail-base-o + 0.5pt - tail-inset
  // Tail: same as `index.css` `.speaker-row__speech::before` / `::after` — `top: 50%` + `translateY(-50%)`
  // (triangle vertically centered on the speech card). Row alignment: `typstSpeakerRowRewrittenBlock` uses
  // `horizon + left` on the speech grid cell to match `.speaker-row__speech { align-self: center }`.
  // Tail first, bubble after — Typst paint order; tail must sit under rounded rect + stroke.
  block(width: 100%, breakable: true, clip: false)[
    #place(left + horizon, dx: tail-inset)[
      #box(width: tail-col + tail-inset, clip: false)[
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
  ]
}

/// Avatar column only: overrides global `show figure` (margin pixra) with site speaker card layout.
/// `multiface`: card width like `.speaker-row--multiface` (`w-16` ≈ 48pt) vs single (`w-20` ≈ 60pt); image height is intrinsic (auto), not fixed CSS `h-20`/`h-16`.
#let speaker_row_avatar_column(multiface: false, body) = {
  let card-w = 60pt
  show figure.where(kind: image): it => {
    align(center)[
      #block(
        breakable: false,
        width: card-w,
        fill: white,
        stroke: 0.75pt + speaker_avatar_border,
        radius: 4pt,
        clip: true,
      )[
        #stack(spacing: 0pt)[
          #block(
            width: 100%,
            stroke: none,
            inset: (left: 2pt, right: 2pt, top: 4pt, bottom: 0pt),
          )[
            #align(center + bottom)[#it.body]
          ]
          #block(
            width: 100%,
            inset: (left: 4pt, right: 4pt, top: -9pt, bottom: 6pt),
          )[
            #set align(center)
            #set par(leading: 0em, justify: false, spacing: 0.4em)
            #set text(size: 9pt, fill: speaker_avatar_caption)
            #it.caption
          ]
        ]
      ]
    ]
  }
  body
}
