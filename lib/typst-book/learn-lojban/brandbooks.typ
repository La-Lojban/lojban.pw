// Brand palettes for Typst books: cover, content page wash, chapter header, footer chrome.
// Palette index = front-matter `palette` or calc.rem(title-hash, n-brands). Hash still tunes angles / accents.

#let n-brands = 6

// --- Six brandbooks (deep accents for chrome; running header = white bar + `header-rule` hairline, `header-text`) ---

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
  // 1 Forest — pine, sage, and warm moss
  (
    name: "forest",
    cover-deep: rgb(8, 22, 18),
    cover-mid: rgb(24, 56, 45),
    cover-glow: rgb(118, 190, 142),
    cover-accent-bar: rgb(74, 154, 112),
    cover-text-light: rgb(245, 252, 246),
    cover-text-muted: rgb(176, 206, 188),
    cover-angle-base: 146deg,
    page-bg-a: rgb(236, 246, 238),
    page-bg-b: rgb(214, 234, 220),
    page-bg-angle: 158deg,
    page-radial-inner: rgb(196, 224, 204),
    page-tiling-stroke: rgb(104, 144, 120),
    header-a: rgb(196, 224, 204),
    header-b: rgb(170, 208, 185),
    header-text: rgb(26, 72, 50),
    header-rule: rgb(82, 134, 106),
    footer-fill: rgb(241, 249, 243),
    footer-stroke: rgb(126, 168, 144),
    footer-text: rgb(24, 58, 42),
    quote-border: rgb(58, 126, 96),
    quote-bg: rgb(228, 242, 232),
    h1: rgb(14, 42, 30),
    h2: rgb(26, 66, 48),
    h3: rgb(44, 90, 68),
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
  // 5 Arctic — glacier blue, mist, and steel
  (
    name: "arctic",
    cover-deep: rgb(9, 20, 34),
    cover-mid: rgb(24, 48, 70),
    cover-glow: rgb(118, 192, 224),
    cover-accent-bar: rgb(74, 152, 192),
    cover-text-light: rgb(244, 250, 255),
    cover-text-muted: rgb(174, 196, 216),
    cover-angle-base: 170deg,
    page-bg-a: rgb(236, 244, 252),
    page-bg-b: rgb(214, 230, 244),
    page-bg-angle: 160deg,
    page-radial-inner: rgb(194, 216, 236),
    page-tiling-stroke: rgb(102, 136, 166),
    header-a: rgb(194, 216, 236),
    header-b: rgb(168, 196, 222),
    header-text: rgb(24, 56, 84),
    header-rule: rgb(82, 126, 162),
    footer-fill: rgb(241, 247, 253),
    footer-stroke: rgb(124, 156, 186),
    footer-text: rgb(24, 48, 70),
    quote-border: rgb(58, 112, 148),
    quote-bg: rgb(226, 238, 248),
    h1: rgb(14, 32, 50),
    h2: rgb(28, 52, 76),
    h3: rgb(46, 74, 102),
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
  // Cover (light): moiré angles + pitch mismatch — title-hash keeps each book stable.
  let cover-moire-a = 2.05deg + calc.rem(h, 9) * 0.28deg
  let cover-moire-b = -2.38deg - calc.rem(calc.floor(h / 13), 7) * 0.24deg
  let cover-moire-pitch-mul = 1.046 + calc.rem(calc.floor(h / 11), 5) * 0.0045
  let cover-page-fill = color.mix(
    (white, 76%),
    (b.page-bg-a, 19%),
    (b.page-radial-inner, 5%),
    space: rgb,
  )
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
    cover-moire-a: cover-moire-a,
    cover-moire-b: cover-moire-b,
    cover-moire-pitch-mul: cover-moire-pitch-mul,
    cover-page-fill: cover-page-fill,
  )
}

/// Two sine-wave gratings (slight angle + pitch mismatch) → smooth curved moiré beats.
/// `tile-y-mul` — smaller ⇒ more wave rows per unit height. `harmonic` — 2nd harmonic wiggle on each curve.
#let moire-wave-tiling(
  stroke,
  rot-a,
  rot-b,
  pitch: 6.8pt,
  pitch-mul: 1.055,
  amp: 0.42pt,
  samples: 20,
  tile-y-mul: 2.2,
  harmonic: 0.0,
) = {
  let n-samples = if harmonic != 0.0 { 32 } else { samples }
  let wave-in-tile(p-cell) = place(
    center + horizon,
    curve(
      stroke: stroke,
      fill: none,
      curve.move((-p-cell / 2, 0pt)),
      ..range(1, n-samples + 1).map(i => {
        let u = i / n-samples
        let x = -p-cell / 2 + u * p-cell
        let y = amp * (
          calc.sin(u * 2 * calc.pi)
            + harmonic * calc.sin(u * 4 * calc.pi)
        )
        curve.line((x, y))
      }),
    ),
  )
  let h = pitch * tile-y-mul
  [
    #place(
      top + left,
      rotate(
        rot-a,
        rect(
          width: 120%,
          height: 120%,
          fill: tiling(
            size: (pitch, h),
            relative: "parent",
          )[#wave-in-tile(pitch)],
        ),
      ),
    )
    #place(
      top + left,
      rotate(
        rot-b,
        rect(
          width: 120%,
          height: 120%,
          fill: tiling(
            size: (pitch * pitch-mul, h),
            relative: "parent",
          )[#wave-in-tile(pitch * pitch-mul)],
        ),
      ),
    )
  ]
}

/// Single cubic Bézier as a sampled open curve (separate from tiled moiré grids).
#let bezier-curve-open(stroke, p0, p1, p2, p3, samples: 28) = {
  let uu(t) = 1 - t
  let pt(t) = {
    let u = uu(t)
    let bx = u * u * u * p0.at(0) + 3 * u * u * t * p1.at(0) + 3 * u * t * t * p2.at(0) + t * t * t * p3.at(0)
    let by = u * u * u * p0.at(1) + 3 * u * u * t * p1.at(1) + 3 * u * t * t * p2.at(1) + t * t * t * p3.at(1)
    (bx, by)
  }
  curve(
    stroke: stroke,
    fill: none,
    curve.move(pt(0)),
    ..range(1, samples + 1).map(i => {
      let t = i / samples
      curve.line(pt(t))
    }),
  )
}

/// Wide overlapping swooshes in page space (mm) — distinct from moiré tilings.
#let overlapping-swoosh-layer(bb, cover: true) = {
  let pal = bb.page-tiling-stroke
  let glow = bb.cover-glow
  let s-fine(w, pt) = pal.transparentize(w) + pt
  let s-g(w, pt) = color
    .mix((glow, 48%), (pal, 52%), space: rgb)
    .transparentize(w) + pt
  let gray(w, pt) = rgb(58, 58, 58).transparentize(w) + pt
  let (w0, w1, w2) = if cover {
    (88%, 90%, 92%)
  } else {
    (89%, 90%, 92%)
  }
  let t0 = 0.09pt
  let t1 = 0.1pt
  [
    #place(top + left, bezier-curve-open(s-fine(w0, t0), (-18mm, 55mm), (52mm, 12mm), (118mm, 108mm), (228mm, 38mm)))
    #place(top + left, bezier-curve-open(s-g(w1, t0), (-12mm, 118mm), (48mm, 198mm), (142mm, 72mm), (232mm, 168mm)))
    #place(top + left, bezier-curve-open(gray(w2, t0), (-8mm, 188mm), (78mm, 262mm), (168mm, 155mm), (222mm, 288mm)))
    #place(top + left, bezier-curve-open(s-fine(w1, t0), (8mm, -6mm), (95mm, 88mm), (175mm, 22mm), (215mm, 95mm)))
    #place(top + left, bezier-curve-open(s-g(w0, t1), (-22mm, 228mm), (42mm, 148mm), (128mm, 255mm), (218mm, 198mm)))
    #place(top + left, bezier-curve-open(s-fine(w2, t0), (22mm, 142mm), (108mm, 42mm), (188mm, 128mm), (228mm, 52mm)))
    #place(top + left, bezier-curve-open(gray(w1, t0), (-14mm, 92mm), (62mm, 168mm), (152mm, 48mm), (226mm, 132mm)))
    #place(top + left, bezier-curve-open(s-g(w2, t0), (38mm, 218mm), (102mm, 278mm), (168mm, 188mm), (208mm, 302mm)))
    #place(top + left, bezier-curve-open(s-fine(w0, t1), (-20mm, 168mm), (55mm, 118mm), (145mm, 198mm), (220mm, 88mm)))
    #place(top + left, bezier-curve-open(s-fine(w2, t0), (12mm, 78mm), (88mm, -2mm), (162mm, 62mm), (218mm, 8mm)))
    #place(top + left, bezier-curve-open(gray(w0, t0), (48mm, 205mm), (118mm, 125mm), (178mm, 242mm), (212mm, 168mm)))
    #place(top + left, bezier-curve-open(s-g(w1, t0), (-16mm, 32mm), (32mm, 98mm), (128mm, 32mm), (208mm, 118mm)))
    #place(
      top + left,
      rotate(
        -7.5deg,
        origin: center + horizon,
        bezier-curve-open(s-fine(w1, t0), (-28mm, 135mm), (40mm, 85mm), (155mm, 175mm), (235mm, 95mm)),
      ),
    )
    #place(
      top + left,
      rotate(
        6.2deg,
        origin: center + horizon,
        bezier-curve-open(s-g(w2, t0), (-24mm, 248mm), (58mm, 188mm), (148mm, 268mm), (228mm, 218mm)),
      ),
    )
    #place(top + left, bezier-curve-open(s-fine(w0, t0), (62mm, 168mm), (128mm, 228mm), (178mm, 142mm), (218mm, 198mm)))
    #place(top + left, bezier-curve-open(gray(w2, t0), (2mm, 48mm), (72mm, 128mm), (158mm, 58mm), (208mm, 108mm)))
    #place(top + left, bezier-curve-open(s-g(w0, t1), (28mm, 258mm), (92mm, 198mm), (162mm, 278mm), (202mm, 228mm)))
    #if not cover [
      #place(top + left, bezier-curve-open(gray(92%, t0), (-6mm, 68mm), (58mm, 118mm), (138mm, 52mm), (214mm, 98mm)))
      #place(top + left, bezier-curve-open(s-fine(92%, t0), (32mm, 188mm), (92mm, 248mm), (158mm, 168mm), (208mm, 228mm)))
      #place(top + left, bezier-curve-open(s-g(91%, t0), (-14mm, 158mm), (48mm, 98mm), (128mm, 178mm), (218mm, 128mm)))
      #place(top + left, bezier-curve-open(gray(91%, t0), (18mm, 22mm), (88mm, 82mm), (168mm, 38mm), (212mm, 72mm)))
      #place(
        top + left,
        rotate(
          -5deg,
          origin: center + horizon,
          bezier-curve-open(s-fine(92%, t0), (-20mm, 118mm), (42mm, 178mm), (148mm, 88mm), (226mm, 158mm)),
        ),
      )
    ]
    #if cover [
      #place(top + left, bezier-curve-open(s-fine(86%, t1), (-10mm, 8mm), (72mm, 72mm), (158mm, 18mm), (222mm, 62mm)))
      #place(top + left, bezier-curve-open(s-g(87%, t0), (18mm, 95mm), (98mm, 155mm), (172mm, 88mm), (226mm, 142mm)))
      #place(top + left, bezier-curve-open(s-fine(89%, t0), (-6mm, 202mm), (52mm, 268mm), (138mm, 218mm), (216mm, 248mm)))
      #place(top + left, bezier-curve-open(gray(91%, t0), (72mm, 32mm), (128mm, 108mm), (182mm, 42mm), (218mm, 88mm)))
      #place(
        top + left,
        rotate(
          11deg,
          origin: center + horizon,
          bezier-curve-open(s-g(88%, t0), (-18mm, 72mm), (48mm, 12mm), (152mm, 98mm), (228mm, 42mm)),
        ),
      )
      #place(
        top + left,
        rotate(
          -9deg,
          origin: center + horizon,
          bezier-curve-open(s-fine(87%, t0), (-12mm, 255mm), (62mm, 185mm), (168mm, 245mm), (224mm, 275mm)),
        ),
      )
      #place(top + left, bezier-curve-open(s-g(89%, t0), (42mm, 128mm), (108mm, 188mm), (168mm, 108mm), (212mm, 162mm)))
      #place(top + left, bezier-curve-open(s-fine(90%, t0), (-24mm, 148mm), (32mm, 88mm), (118mm, 168mm), (208mm, 118mm)))
    ]
  ]
}

/// Content pages: soft brand-tinted ground + stacked faint curved moirés (gray + palette-tinged).
#let page-bg-for-brand(bb) = {
  let stroke-gray = rgb(58, 58, 58).transparentize(90%) + 0.1pt
  let stroke-gray-fine = rgb(58, 58, 58).transparentize(92%) + 0.085pt
  let stroke-brand = bb.page-tiling-stroke.transparentize(93%) + 0.085pt

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
  overlapping-swoosh-layer(bb, cover: false)
  place(top + left, dx: -6mm, dy: 11mm)[
    #overlapping-swoosh-layer(bb, cover: false)
  ]
  moire-wave-tiling(
    stroke-gray-fine,
    2.05deg,
    -2.62deg,
    pitch: 4.35pt,
    pitch-mul: 1.064,
    amp: 0.22pt,
    tile-y-mul: 1.42,
  )
  moire-wave-tiling(
    stroke-gray,
    2.2deg,
    -2.5deg,
    pitch: 6.8pt,
    pitch-mul: 1.055,
    amp: 0.38pt,
    tile-y-mul: 1.95,
    harmonic: 0.28,
  )
  moire-wave-tiling(
    stroke-brand,
    -1.85deg,
    2.95deg,
    pitch: 5.1pt,
    pitch-mul: 1.058,
    amp: 0.24pt,
    tile-y-mul: 1.38,
  )
  moire-wave-tiling(
    rgb(58, 58, 58).transparentize(94%) + 0.09pt,
    81.6deg,
    84.1deg,
    pitch: 7.2pt,
    pitch-mul: 1.051,
    amp: 0.32pt,
    tile-y-mul: 1.72,
  )
  moire-wave-tiling(
    bb.page-tiling-stroke.transparentize(96%) + 0.08pt,
    83.2deg,
    -86deg,
    pitch: 10.5pt,
    pitch-mul: 1.047,
    amp: 0.44pt,
    tile-y-mul: 2.05,
    harmonic: 0.18,
  )
}

/// Cover: light “daylight” wash, palette moiré curves, soft radial sun; palette + title-hash tune angles.
#let cover-bg-for-brand(bb) = {
  let sky-a = color.mix(
    (white, 70%),
    (bb.page-bg-a, 22%),
    (bb.page-radial-inner, 8%),
    space: rgb,
  )
  let sky-b = color.mix(
    (white, 78%),
    (bb.page-bg-b, 16%),
    (bb.cover-glow, 6%),
    space: rgb,
  )
  let sky-c = color.mix((white, 90%), (bb.page-bg-a, 10%), space: rgb)
  let s-pal = w => bb.page-tiling-stroke.transparentize(w) + 0.1pt
  let s-pal-fine = w => bb.page-tiling-stroke.transparentize(w) + 0.085pt
  let s-glow(w) = color
    .mix((bb.cover-glow, 55%), (bb.page-tiling-stroke, 45%), space: rgb)
    .transparentize(w) + 0.085pt
  let sun-core = color.mix((white, 42%), (bb.cover-glow, 58%), space: rgb).transparentize(48%)
  let sun-halo = color.mix((white, 88%), (bb.page-radial-inner, 12%), space: rgb).transparentize(18%)

  place(
    top + left,
    rect(
      width: 100%,
      height: 100%,
      fill: gradient.linear(
        sky-a,
        sky-b,
        sky-c,
        angle: bb.cover-angle - 12deg,
      ),
    ),
  )
  // High sun: warm radial wash (palette glow + page inner tint).
  place(
    top + left,
    dx: 12%,
    dy: -6%,
    ellipse(
      width: 118%,
      height: 58%,
      fill: gradient.radial(
        sun-core,
        sun-halo,
        focal-center: (44%, 38%),
        focal-radius: 0%,
        center: (48%, 42%),
        radius: 72%,
        relative: "self",
      ),
    ),
  )
  // Lower horizon haze — subtle second arc for depth (still on-palette).
  place(
    bottom + left,
    dx: -8%,
    dy: 22%,
    ellipse(
      width: 125%,
      height: 48%,
      fill: gradient.radial(
        color.mix((white, 55%), (bb.page-bg-b, 45%), space: rgb).transparentize(72%),
        color.mix((white, 92%), (bb.page-bg-a, 8%), space: rgb).transparentize(12%),
        focal-center: (52%, 72%),
        focal-radius: 0%,
        center: (50%, 78%),
        radius: 70%,
        relative: "self",
      ),
    ),
  )
  overlapping-swoosh-layer(bb, cover: true)
  let ma = bb.cover-moire-a
  let mb = bb.cover-moire-b
  let pm = bb.cover-moire-pitch-mul
  // Stack many gratings (scales + slight rotations + one cross-oriented family) for dense moiré.
  moire-wave-tiling(
    s-pal-fine(91%),
    ma,
    mb,
    pitch: 3.35pt,
    pitch-mul: pm + 0.019,
    amp: 0.16pt,
    tile-y-mul: 1.28,
    harmonic: 0.38,
  )
  moire-wave-tiling(
    s-pal(89%),
    ma + 83.4deg,
    mb + 81.9deg,
    pitch: 3.65pt,
    pitch-mul: pm + 0.024,
    amp: 0.19pt,
    tile-y-mul: 1.32,
  )
  moire-wave-tiling(
    s-glow(90%),
    ma - 1.35deg,
    mb + 1.5deg,
    pitch: 4.9pt,
    pitch-mul: pm + 0.011,
    amp: 0.24pt,
    tile-y-mul: 1.4,
    harmonic: 0.32,
  )
  moire-wave-tiling(
    s-pal(87%),
    ma + 1.8deg,
    mb - 2.05deg,
    pitch: 6.15pt,
    pitch-mul: pm + 0.006,
    amp: 0.3pt,
    tile-y-mul: 1.68,
  )
  moire-wave-tiling(
    s-pal-fine(88%),
    ma + 82.1deg,
    mb - 84.6deg,
    pitch: 5.4pt,
    pitch-mul: pm + 0.014,
    amp: 0.27pt,
    tile-y-mul: 1.52,
    harmonic: 0.22,
  )
  moire-wave-tiling(
    s-pal(85%),
    ma,
    mb,
    pitch: 7.6pt,
    pitch-mul: pm,
    amp: 0.38pt,
    tile-y-mul: 1.88,
    harmonic: 0.2,
  )
  moire-wave-tiling(
    s-glow(88%),
    ma + 2.95deg,
    mb - 2.7deg,
    pitch: 9.2pt,
    pitch-mul: pm - 0.008,
    amp: 0.42pt,
    tile-y-mul: 2.0,
  )
  moire-wave-tiling(
    s-pal(86%),
    ma - 3.1deg,
    mb + 3.35deg,
    pitch: 11.8pt,
    pitch-mul: pm - 0.012,
    amp: 0.52pt,
    tile-y-mul: 2.12,
    harmonic: 0.24,
  )
  moire-wave-tiling(
    s-pal-fine(89%),
    ma + 79.2deg,
    mb + 86.8deg,
    pitch: 8.8pt,
    pitch-mul: pm + 0.009,
    amp: 0.4pt,
    tile-y-mul: 1.78,
  )
  moire-wave-tiling(
    s-pal(87%),
    ma + 84deg,
    mb - 80.5deg,
    pitch: 13.6pt,
    pitch-mul: pm - 0.018,
    amp: 0.55pt,
    tile-y-mul: 2.25,
    harmonic: 0.16,
  )
  place(top + left, dx: 9mm, dy: -14mm)[
    #overlapping-swoosh-layer(bb, cover: true)
  ]
  place(
    top + left,
    rect(
      width: 100%,
      height: 1.85mm,
      fill: bb.cover-accent-bar,
    ),
  )
}
