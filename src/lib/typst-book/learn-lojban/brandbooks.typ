// Brand palettes for Typst books: cover, content page wash, chapter header, footer chrome.
// Palette index = front-matter `palette` or calc.rem(title-hash, n-brands). Hash still tunes angles / accents.

#let n-brands = 6

// --- Six brandbooks (deep saturated accents; running header = palette cover gradient + black hairline) ---

#let brands = (
  // 0 Ember — warm stone & amber
  (
    name: "ember",
    cover-deep: rgb(8, 6, 5),
    cover-mid: rgb(34, 30, 28),
    cover-glow: rgb(238, 92, 14),
    cover-accent-bar: rgb(230, 82, 8),
    cover-text-light: rgb(255, 252, 248),
    cover-text-muted: rgb(220, 210, 200),
    cover-angle-base: 158deg,
    page-bg-a: rgb(255, 246, 232),
    page-bg-b: rgb(255, 228, 200),
    page-bg-angle: 155deg,
    page-radial-inner: rgb(255, 218, 185),
    page-tiling-stroke: rgb(185, 145, 110),
    header-a: rgb(248, 210, 175),
    header-b: rgb(240, 185, 145),
    header-text: rgb(72, 48, 32),
    header-rule: rgb(185, 125, 80),
    footer-fill: rgb(255, 248, 238),
    footer-stroke: rgb(195, 155, 120),
    footer-text: rgb(38, 28, 18),
    quote-border: rgb(210, 65, 6),
    quote-bg: rgb(255, 232, 210),
    h1: rgb(12, 18, 32),
    h2: rgb(22, 32, 52),
    h3: rgb(40, 52, 72),
  ),
  // 1 Forest — moss & jade
  (
    name: "forest",
    cover-deep: rgb(6, 18, 14),
    cover-mid: rgb(18, 48, 38),
    cover-glow: rgb(40, 205, 145),
    cover-accent-bar: rgb(12, 168, 118),
    cover-text-light: rgb(240, 255, 248),
    cover-text-muted: rgb(150, 205, 185),
    cover-angle-base: 148deg,
    page-bg-a: rgb(220, 250, 235),
    page-bg-b: rgb(190, 242, 215),
    page-bg-angle: 160deg,
    page-radial-inner: rgb(165, 235, 205),
    page-tiling-stroke: rgb(95, 160, 130),
    header-a: rgb(165, 230, 200),
    header-b: rgb(130, 215, 175),
    header-text: rgb(8, 85, 48),
    header-rule: rgb(28, 130, 88),
    footer-fill: rgb(230, 252, 242),
    footer-stroke: rgb(100, 175, 140),
    footer-text: rgb(12, 58, 38),
    quote-border: rgb(2, 120, 82),
    quote-bg: rgb(210, 248, 228),
    h1: rgb(6, 38, 26),
    h2: rgb(16, 68, 48),
    h3: rgb(28, 88, 65),
  ),
  // 2 Tide — cornflower blue (#6495ED) & deep navy
  (
    name: "tide",
    cover-deep: rgb(5, 12, 36),
    cover-mid: rgb(18, 32, 78),
    cover-glow: rgb(100, 149, 237),
    cover-accent-bar: rgb(72, 118, 220),
    cover-text-light: rgb(248, 250, 255),
    cover-text-muted: rgb(165, 190, 235),
    cover-angle-base: 172deg,
    page-bg-a: rgb(205, 222, 255),
    page-bg-b: rgb(168, 198, 248),
    page-bg-angle: 152deg,
    page-radial-inner: rgb(150, 185, 245),
    page-tiling-stroke: rgb(85, 118, 185),
    header-a: rgb(135, 175, 245),
    header-b: rgb(105, 150, 235),
    header-text: rgb(6, 22, 68),
    header-rule: rgb(38, 85, 185),
    footer-fill: rgb(218, 232, 255),
    footer-stroke: rgb(95, 135, 205),
    footer-text: rgb(8, 28, 78),
    quote-border: rgb(48, 95, 205),
    quote-bg: rgb(205, 225, 255),
    h1: rgb(5, 14, 42),
    h2: rgb(14, 32, 82),
    h3: rgb(28, 52, 108),
  ),
  // 3 Plum — violet & aubergine
  (
    name: "plum",
    cover-deep: rgb(14, 8, 22),
    cover-mid: rgb(40, 24, 52),
    cover-glow: rgb(180, 115, 248),
    cover-accent-bar: rgb(155, 65, 235),
    cover-text-light: rgb(255, 248, 255),
    cover-text-muted: rgb(195, 175, 220),
    cover-angle-base: 138deg,
    page-bg-a: rgb(240, 228, 255),
    page-bg-b: rgb(220, 200, 252),
    page-bg-angle: 158deg,
    page-radial-inner: rgb(205, 180, 250),
    page-tiling-stroke: rgb(150, 110, 185),
    header-a: rgb(205, 180, 250),
    header-b: rgb(185, 155, 245),
    header-text: rgb(52, 12, 108),
    header-rule: rgb(115, 58, 168),
    footer-fill: rgb(242, 232, 255),
    footer-stroke: rgb(160, 120, 200),
    footer-text: rgb(38, 14, 72),
    quote-border: rgb(118, 32, 205),
    quote-bg: rgb(228, 215, 255),
    h1: rgb(28, 10, 52),
    h2: rgb(52, 22, 82),
    h3: rgb(78, 42, 108),
  ),
  // 4 Sienna — terracotta & rust
  (
    name: "sienna",
    cover-deep: rgb(20, 8, 5),
    cover-mid: rgb(52, 24, 18),
    cover-glow: rgb(245, 105, 18),
    cover-accent-bar: rgb(225, 78, 8),
    cover-text-light: rgb(255, 248, 238),
    cover-text-muted: rgb(205, 175, 155),
    cover-angle-base: 152deg,
    page-bg-a: rgb(255, 238, 220),
    page-bg-b: rgb(255, 210, 178),
    page-bg-angle: 150deg,
    page-radial-inner: rgb(255, 195, 160),
    page-tiling-stroke: rgb(190, 125, 95),
    header-a: rgb(250, 195, 160),
    header-b: rgb(245, 168, 125),
    header-text: rgb(95, 32, 12),
    header-rule: rgb(185, 95, 58),
    footer-fill: rgb(255, 240, 228),
    footer-stroke: rgb(200, 135, 105),
    footer-text: rgb(62, 22, 10),
    quote-border: rgb(190, 48, 5),
    quote-bg: rgb(255, 220, 195),
    h1: rgb(48, 18, 8),
    h2: rgb(82, 32, 18),
    h3: rgb(108, 48, 28),
  ),
  // 5 Arctic — cyan & deep slate
  (
    name: "arctic",
    cover-deep: rgb(4, 16, 26),
    cover-mid: rgb(16, 36, 50),
    cover-glow: rgb(22, 200, 232),
    cover-accent-bar: rgb(4, 168, 200),
    cover-text-light: rgb(232, 255, 255),
    cover-text-muted: rgb(145, 190, 205),
    cover-angle-base: 168deg,
    page-bg-a: rgb(205, 242, 255),
    page-bg-b: rgb(175, 228, 248),
    page-bg-angle: 162deg,
    page-radial-inner: rgb(155, 220, 245),
    page-tiling-stroke: rgb(78, 150, 180),
    header-a: rgb(155, 230, 250),
    header-b: rgb(120, 215, 240),
    header-text: rgb(4, 72, 92),
    header-rule: rgb(15, 140, 172),
    footer-fill: rgb(218, 248, 255),
    footer-stroke: rgb(95, 175, 200),
    footer-text: rgb(8, 52, 68),
    quote-border: rgb(3, 118, 152),
    quote-bg: rgb(200, 248, 255),
    h1: rgb(6, 32, 42),
    h2: rgb(14, 54, 68),
    h3: rgb(28, 78, 95),
  ),
)

/// Stable palette + hash-derived tuning for covers and page chrome.
/// `palette` — optional 0..n-brands-1 from book front matter; when `none`, palette index
/// is `calc.rem(title-hash, n-brands)` (stable per title). Hash still tunes angles/accents.
#let resolve-brand(title-hash, palette: none) = {
  let h = title-hash
  let idx = if palette != none {
    calc.min(calc.max(palette, 0), n-brands - 1)
  } else {
    calc.rem(h, n-brands)
  }
  let b = brands.at(idx)
  // Spread hash across angles and accents (title-specific, same book always identical)
  let cover-angle = b.cover-angle-base + (calc.rem(calc.floor(h / 17), 37) * 4.2deg)
  let page-angle = b.page-bg-angle + (calc.rem(calc.floor(h / 9), 11) * 2.1deg)
  let radial-dy = -30mm + (calc.rem(calc.floor(h / 23), 21) * 1mm - 10mm)
  // Slight variation in radial wash opacity (hash-only; keeps long reading comfort)
  let radial-fade-pct = 8 + calc.rem(calc.floor(h / 41), 12)
  // Top accent stripe visibility on cover (hash-tuned)
  let accent-fade-pct = 10 + calc.rem(calc.floor(h / 7), 22)
  (
    name: b.name,
    idx: idx,
    cover-deep: b.cover-deep,
    cover-mid: b.cover-mid,
    cover-glow: b.cover-glow,
    cover-accent-bar: b.cover-accent-bar.transparentize(accent-fade-pct * 1%),
    cover-text-light: b.cover-text-light,
    cover-text-muted: b.cover-text-muted,
    cover-angle: cover-angle,
    page-bg-a: b.page-bg-a,
    page-bg-b: b.page-bg-b,
    page-bg-angle: page-angle,
    page-radial-inner: b.page-radial-inner,
    page-radial-dy: radial-dy,
    page-radial-fade-pct: radial-fade-pct,
    page-tiling-stroke: b.page-tiling-stroke,
    header-a: b.header-a,
    header-b: b.header-b,
    header-text: b.header-text,
    header-rule: b.header-rule,
    footer-fill: b.footer-fill,
    footer-stroke: b.footer-stroke,
    footer-text: b.footer-text,
    quote-border: b.quote-border,
    quote-bg: b.quote-bg,
    h1: b.h1,
    h2: b.h2,
    h3: b.h3,
  )
}

/// Content pages: soft brand-tinted ground + faint curved moiré — two sine-wave gratings
/// (slight angle, ~5.5% pitch mismatch) so beats read as smooth arcs.
#let page-bg-for-brand(bb) = {
  let pitch = 6.8pt
  let stroke = rgb(58, 58, 58).transparentize(90%) + 0.11pt
  let amp = 0.42pt
  let samples = 20

  let wave-in-tile(p-cell) = place(
    center + horizon,
    curve(
      stroke: stroke,
      fill: none,
      curve.move((-p-cell / 2, 0pt)),
      ..range(1, samples + 1).map(i => {
        let u = i / samples
        let x = -p-cell / 2 + u * p-cell
        let y = amp * calc.sin(u * 2 * calc.pi)
        curve.line((x, y))
      }),
    ),
  )

  place(
    top + left,
    rect(
      width: 100%,
      height: 100%,
      fill: gradient.linear(
        color.mix((white, 93%), (bb.page-bg-a, 7%), space: rgb),
        color.mix((white, 90%), (bb.page-bg-b, 10%), space: rgb),
        angle: bb.page-bg-angle,
      ),
    ),
  )
  place(
    top + left,
    rotate(
      2.2deg,
      rect(
        width: 120%,
        height: 120%,
        fill: tiling(
          size: (pitch, pitch * 2.2),
          relative: "parent",
        )[#wave-in-tile(pitch)],
      ),
    ),
  )
  place(
    top + left,
    rotate(
      -2.5deg,
      rect(
        width: 120%,
        height: 120%,
        fill: tiling(
          size: (pitch * 1.055, pitch * 2.2),
          relative: "parent",
        )[#wave-in-tile(pitch * 1.055)],
      ),
    ),
  )
}

/// Cover: title-hash drives gradient angle and accent bar opacity; palette sets hue family.
#let cover-bg-for-brand(bb) = {
  place(
    top + left,
    rect(
      width: 100%,
      height: 100%,
      fill: gradient.linear(
        (bb.cover-deep, 0%),
        (bb.cover-mid, 52%),
        (bb.cover-glow.transparentize(88%), 100%),
        angle: bb.cover-angle,
      ),
    ),
  )
  place(
    top + left,
    rect(
      width: 100%,
      height: 1.6mm,
      fill: bb.cover-accent-bar,
    ),
  )
}
