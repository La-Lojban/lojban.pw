/**
 * Build a safe path segment for lerfu `.ogg` files under `/assets/sance/lerfu/`.
 * `encodeURIComponent` intentionally does not encode `'` (RFC 3986), but GitHub Pages
 * serves the file as `%27.ogg`; unescaped `'` breaks our inline `onclick` string too.
 */
export function encodeLerfuSlugForUrl(lerfu: string): string {
  return encodeURIComponent(lerfu.trim()).replace(/'/g, "%27");
}
