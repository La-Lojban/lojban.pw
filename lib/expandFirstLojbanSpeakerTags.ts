import fs from "fs";
import path from "path";

/**
 * Path segment (POSIX slashes) inside avatar image URLs for `<speaker>` / `<speakers>`.
 * Kept in sync with on-disk layout under `data/assets/pixra/…`; Typst pipeline matches these
 * substrings to skip the margin pixra queue and to detect speaker rows in `body.typ`.
 */
export const SPEAKER_AVATAR_IMAGE_PATH_INFIX = "pixra/books/first-lojban/icons";

const SPEAKER_ICON_EXT = ".webp";
const SPEAKER_BOOK_ICON_PATH_RE = /pixra\/books\/[^"\\/\s]+\/icons/i;
const BOOK_SLUG_FROM_MD_PATH_RE =
  /(?:^|\/)(?:data\/pages|md_pages)\/[^/]+\/books\/([^/]+?)(?:\/|\.md$)/i;
const NUMERIC_SPRITE_SUFFIX_RE = /^(.+?)(\d+)$/;

/** All infixes that may appear in `#image("…")` paths for book speaker avatars (Typst + site). */
export const SPEAKER_AVATAR_IMAGE_PATH_INFICES: readonly string[] = [
  SPEAKER_AVATAR_IMAGE_PATH_INFIX,
];

const spriteBasenameCacheByIconDir = new Map<string, string[]>();
const SPEAKER_LABEL_BY_STEM: Record<string, string> = {
  lif: "la lifri",
  lifri: "la lifri",
  lin: "la linto",
  linto: "la linto",
  bla: "la mentu",
  men: "la mentu",
  mentu: "la mentu",
  koc: "la .kocon.",
  kocon: "la .kocon.",
  sev: "la .sevan.",
  sevan: "la .sevan.",
  sor: "la .soran.",
  soran: "la .soran.",
};

function capitalizeWord(word: string): string {
  if (!word) return word;
  return `${word[0]!.toUpperCase()}${word.slice(1)}`;
}

function humanizeSpriteStem(stem: string): string {
  const noDigits = stem.replace(/\d+$/g, "");
  const cleaned = noDigits.replace(/[^a-z0-9_-]+/gi, "");
  return cleaned
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => capitalizeWord(part.toLowerCase()))
    .join(" ");
}

function parseBookSlugFromMarkdownPath(fullPath: string): string | null {
  const norm = fullPath.replace(/\\/g, "/");
  const m = BOOK_SLUG_FROM_MD_PATH_RE.exec(norm);
  if (m?.[1]) return m[1];

  // Fallback for uncommon path roots: ".../<lang>/books/<slug>.md" or ".../books/<slug>/..."
  const parts = norm.split("/").filter(Boolean);
  const booksIdx = parts.lastIndexOf("books");
  if (booksIdx === -1) return null;
  const maybeSlug = parts[booksIdx + 1];
  if (!maybeSlug) return null;
  return maybeSlug.replace(/\.md$/i, "");
}

function iconsAssetDirForMarkdownPath(fullPath: string): string | null {
  const norm = fullPath.replace(/\\/g, "/");
  const slug = parseBookSlugFromMarkdownPath(norm);
  if (!slug) return null;
  const relPrefix = "data/pages/";
  const lowerNorm = norm.toLowerCase();
  const relPrefixIdx = lowerNorm.indexOf(relPrefix);
  const rootDir =
    relPrefixIdx > 0
      ? norm.slice(0, relPrefixIdx)
      : path.resolve(process.cwd());
  return path.join(rootDir, "data", "assets", "pixra", "books", slug, "icons");
}

function listSpriteBasenamesForBook(fullPath: string): string[] {
  const dir = iconsAssetDirForMarkdownPath(fullPath);
  if (!dir) return [];
  const hit = spriteBasenameCacheByIconDir.get(dir);
  if (hit) return hit;
  let out: string[] = [];
  try {
    out = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => name.toLowerCase().endsWith(SPEAKER_ICON_EXT))
      .map((name) => name.slice(0, -SPEAKER_ICON_EXT.length));
  } catch {
    out = [];
  }
  spriteBasenameCacheByIconDir.set(dir, out);
  return out;
}

function resolveSpriteBasenameForBook(sprite: string, fullPath?: string): string {
  const base = sprite.replace(/\.(png|webp|jpe?g)$/i, "");
  if (!fullPath) return base;

  const basenames = listSpriteBasenamesForBook(fullPath);
  if (!basenames.length) return base;
  const lower = base.toLowerCase();
  const exact = basenames.find((name) => name.toLowerCase() === lower);
  if (exact) return exact;

  const parts = NUMERIC_SPRITE_SUFFIX_RE.exec(base);
  if (!parts) return base;
  const letters = parts[1]!.toLowerCase();
  const number = parts[2]!;
  const candidates = basenames.filter((name) => {
    const m = NUMERIC_SPRITE_SUFFIX_RE.exec(name);
    if (!m) return false;
    return (
      m[2] === number &&
      (m[1]!.toLowerCase().startsWith(letters) ||
        letters.startsWith(m[1]!.toLowerCase()))
    );
  });
  if (candidates.length === 1) return candidates[0]!;
  return base;
}

export function speakerAvatarIconInfixForMarkdownPath(fullPath: string): string {
  const slug = parseBookSlugFromMarkdownPath(fullPath);
  if (slug) return `pixra/books/${slug}/icons`;
  return SPEAKER_AVATAR_IMAGE_PATH_INFIX;
}

/** Web URL prefix for speaker sprites for the given authored markdown file path. */
export function bookSpeakerIconsWebBaseForMarkdownPath(fullPath: string): string {
  return `/assets/${speakerAvatarIconInfixForMarkdownPath(fullPath)}/`;
}

/** Web URL prefix for speaker sprites (`SPEAKER_AVATAR_IMAGE_PATH_INFIX` after `/assets/`). */
export const BOOK_SPEAKER_ICONS_WEB_BASE = `/assets/${SPEAKER_AVATAR_IMAGE_PATH_INFIX}/`;

/** @deprecated Use `BOOK_SPEAKER_ICONS_WEB_BASE`. */
export const FIRST_LOJBAN_SPEAKER_ICONS_BASE = BOOK_SPEAKER_ICONS_WEB_BASE;

export function speakerDisplayNameFromSprite(
  sprite: string,
  explicitName?: string,
  fullPath?: string
): string {
  const n = explicitName?.trim();
  if (n) return n;
  const base = resolveSpriteBasenameForBook(sprite, fullPath);
  const stem = base.replace(/\d+$/g, "").toLowerCase();
  if (SPEAKER_LABEL_BY_STEM[stem]) return SPEAKER_LABEL_BY_STEM[stem]!;
  const friendly = humanizeSpriteStem(base);
  return friendly || base;
}

export function firstLojbanSpeakerIconUrl(
  sprite: string,
  fullPath?: string
): string {
  const base = resolveSpriteBasenameForBook(sprite, fullPath);
  const webBase = fullPath
    ? bookSpeakerIconsWebBaseForMarkdownPath(fullPath)
    : BOOK_SPEAKER_ICONS_WEB_BASE;
  return `${webBase}${base}${SPEAKER_ICON_EXT}`;
}

/** Must match the number of `article .speaker-row--bubble-*` themes in `styles/index.css`. */
const SPEAKER_BUBBLE_PALETTE_SIZE = 5;

function normalizeSpriteId(sprite: string): string {
  return sprite.replace(/\..*$/i, "").toLowerCase();
}

/** Palette key: normalized sprite id with all non-letters removed (e.g. koc2 → koc, foo-bar1 → foobar). */
function bubblePaletteKeyFromSprite(sprite: string): string {
  const base = normalizeSpriteId(sprite);
  const letters = base.replace(/[^a-z]/gi, "").toLowerCase();
  return letters || base;
}

/** FNV-1a 32-bit — stable, fast, good distribution for short keys. */
function fnv1a32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Bubble palette hash uses letters-only sprite key; `name` / `names` ignored. */
function bubbleThemeKeyFromSprites(sprites: string[]): string {
  return [...sprites]
    .map(bubblePaletteKeyFromSprite)
    .sort((a, b) => a.localeCompare(b))
    .join("|");
}

function speakerRowBubbleModifierFromThemeKey(key: string): string {
  const idx = fnv1a32(key) % SPEAKER_BUBBLE_PALETTE_SIZE;
  return `speaker-row--bubble-${idx}`;
}

/** Same bubble index as HTML `.speaker-row--bubble-*` (0..4). */
export function speakerBubblePaletteIndexFromSprites(sprites: string[]): number {
  if (sprites.length === 0) return 0;
  const key = bubbleThemeKeyFromSprites(sprites);
  return fnv1a32(key) % SPEAKER_BUBBLE_PALETTE_SIZE;
}

/**
 * Sprite basenames from Pandoc-emitted `#image("…/icons/foo.webp")` paths (multiface: document order).
 */
export function extractSpeakerSpriteBasenamesFromTypstAvatarInner(
  avatarInner: string
): string[] {
  const out: string[] = [];
  const re =
    /#image\("[^"]*pixra\/books\/[^"/\\]+\/icons\/([^"/\\]+)\.(?:webp|png|jpe?g)"\)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(avatarInner))) {
    out.push(m[1]!);
  }
  return out;
}

export function speakerBubblePaletteIndexFromTypstAvatarInner(
  avatarInner: string
): number {
  return speakerBubblePaletteIndexFromSprites(
    extractSpeakerSpriteBasenamesFromTypstAvatarInner(avatarInner)
  );
}

/** Typst/HTML fragment uses a known book-speaker `#image("…/pixra/books/…/icons/…")` path. */
export function typstSnippetContainsSpeakerAvatarImagePath(s: string): boolean {
  return SPEAKER_BOOK_ICON_PATH_RE.test(s);
}

/** Global regex for `#image("…")` calls whose path includes any speaker-avatar infix. */
export function speakerAvatarTypstImageGlobalRegex(): RegExp {
  return /#image\("[^"]*pixra\/books\/[^"/\\]+\/icons\/[^"]*"\)/g;
}

function parseSpeakerOpenTag(attrStr: string): {
  sprite?: string;
  name?: string;
  selfClosing: boolean;
} {
  const trimmed = attrStr.trim();
  const selfClosing = trimmed.endsWith("/");
  const inner = selfClosing ? trimmed.slice(0, -1).trim() : trimmed;
  const sprite =
    /\bsprite\s*=\s*"([^"]+)"/i.exec(inner)?.[1] ??
    /\bsprite\s*=\s*'([^']+)'/i.exec(inner)?.[1];
  const name =
    /\bname\s*=\s*"([^"]*)"/i.exec(inner)?.[1] ??
    /\bname\s*=\s*'([^']*)'/i.exec(inner)?.[1];
  return { sprite, name: name?.trim() || undefined, selfClosing };
}

function parseSpritesAttr(attrBlock: string): string[] {
  const raw =
    /\bsprites\s*=\s*"([^"]+)"/i.exec(attrBlock)?.[1] ??
    /\bsprites\s*=\s*'([^']+)'/i.exec(attrBlock)?.[1];
  if (!raw) return [];
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseNamesAttr(attrBlock: string): string[] | undefined {
  const raw =
    /\bnames\s*=\s*"([^"]*)"/i.exec(attrBlock)?.[1] ??
    /\bnames\s*=\s*'([^']*)'/i.exec(attrBlock)?.[1];
  if (raw === undefined) return undefined;
  const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length ? parts : undefined;
}

function parseSpeakersOpenTag(attrStr: string): {
  multiface: boolean;
  sprites: string[];
  names?: string[];
  selfClosing: boolean;
} {
  const trimmed = attrStr.trim();
  const selfClosing = trimmed.endsWith("/");
  const inner = selfClosing ? trimmed.slice(0, -1).trim() : trimmed;
  const multiface = /\bmultiface\b/i.test(inner);
  const sprites = parseSpritesAttr(inner);
  const namesRaw = parseNamesAttr(inner);
  return {
    multiface,
    sprites,
    names: namesRaw,
    selfClosing,
  };
}

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** GFM parses markdown inside raw HTML blocks when there is a blank line after the opening tag. */
function speechInnerForHtml(inner: string): string {
  if (/^\s*\n/.test(inner)) return inner;
  return `\n\n${inner}`;
}

/**
 * Blank line after a raw HTML block is required or CommonMark keeps the parser in “HTML” mode and
 * following lines (e.g. `## Heading`) are emitted as plain text instead of mdast nodes.
 */
const AFTER_SPEAKER_ROW_HTML = "\n\n";

/** Minimal escapes so Lojban text is safe inside a one-line table cell `<div>`. */
function escapeHtmlBodyText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

/**
 * True when the `<speaker` … `</speaker>` (or self-closing `/>`) sits entirely on one GFM pipe
 * table row (`| … |`). Then we emit compact single-line HTML so the table parser still sees one
 * physical line (see `expandBookSpeakerTags`).
 */
/**
 * Inner surface so `.speaker-row__speech` tail `::before` / `::after` stack below the bubble:
 * negative-`z-index` pseudos still paint above the same element’s `background` (stacking order),
 * so the visible fill/border/shadow live on this child (`z-index: 1` in CSS).
 */
function wrapSpeakerSpeechSurface(innerHtml: string): string {
  return `<div class="speaker-row__speech-surface">${innerHtml}</div>`;
}

function isSpeakerInSingleLinePipeTableRow(
  md: string,
  openSpeakerIdx: number,
  afterCloseSpeakerIdx: number
): boolean {
  const lineStart = md.lastIndexOf("\n", openSpeakerIdx - 1) + 1;
  const lineEnd = md.indexOf("\n", lineStart);
  const lineEndExclusive = lineEnd === -1 ? md.length : lineEnd;
  if (afterCloseSpeakerIdx > lineEndExclusive) return false;
  const line = md.slice(lineStart, lineEndExclusive);
  if (line.includes("\n")) return false;
  const t = line.trimStart();
  if (!t.startsWith("|")) return false;
  if (!line.trimEnd().endsWith("|")) return false;
  return true;
}

/** One-line speaker row for pipe-table cells (no trailing `\\n\\n` — that would break GFM tables). */
function buildSpeakerRowTableCell(
  sprite: string,
  explicitName: string | undefined,
  inner: string,
  fullPath: string
): string {
  const url = firstLojbanSpeakerIconUrl(sprite, fullPath);
  const label = speakerDisplayNameFromSprite(sprite, explicitName, fullPath);
  const safe = escapeHtmlAttr(label);
  const body = escapeHtmlBodyText(inner.trim());
  const rowMod = speakerRowBubbleModifierFromThemeKey(
    bubbleThemeKeyFromSprites([sprite])
  );
  return `<div class="speaker-row speaker-row--table-cell ${rowMod}"><div class="speaker-row__avatar"><figure><div class="figure_img" data-url="${url}"><img src="${url}" alt="${safe}"></div><figcaption class="speaker-row__table-cell-caption"><b>${safe}</b><br/><i></i></figcaption></figure></div><div class="speaker-row__speech">${wrapSpeakerSpeechSurface(body)}</div></div>`;
}

function buildSpeakerRow(
  sprite: string,
  explicitName: string | undefined,
  inner: string,
  fullPath: string
): string {
  const url = firstLojbanSpeakerIconUrl(sprite, fullPath);
  const label = speakerDisplayNameFromSprite(sprite, explicitName, fullPath);
  const safe = escapeHtmlAttr(label);
  const body = speechInnerForHtml(inner);
  const rowMod = speakerRowBubbleModifierFromThemeKey(
    bubbleThemeKeyFromSprites([sprite])
  );
  return `<div class="speaker-row ${rowMod}">
<div class="speaker-row__avatar">
<figure><div class="figure_img" data-url="${url}"><img src="${url}" alt="${safe}"></div><figcaption><b>${safe}</b><br/><i></i></figcaption></figure>
</div>
<div class="speaker-row__speech">${wrapSpeakerSpeechSurface(body)}
</div>
</div>${AFTER_SPEAKER_ROW_HTML}`;
}

function buildMultifaceRow(
  sprites: string[],
  explicitNames: string[] | undefined,
  inner: string,
  fullPath: string
): string {
  const wrappers = sprites
    .map((sprite, i) => {
      const name =
        explicitNames && explicitNames[i]
          ? explicitNames[i]
          : undefined;
      const label = speakerDisplayNameFromSprite(sprite, name, fullPath);
      const safe = escapeHtmlAttr(label);
      const url = firstLojbanSpeakerIconUrl(sprite, fullPath);
      return `<div class="wrapper">
<figure><div class="figure_img" data-url="${url}"><img src="${url}" alt="${safe}"></div><figcaption><b>${safe}</b><br/><i></i></figcaption></figure>
</div>`;
    })
    .join("");
  const body = speechInnerForHtml(inner);
  const rowMod = speakerRowBubbleModifierFromThemeKey(
    bubbleThemeKeyFromSprites(sprites)
  );
  return `<div class="speaker-row speaker-row--multiface ${rowMod}">
<div class="speaker-row__avatar">
${wrappers}</div>
<div class="speaker-row__speech">${wrapSpeakerSpeechSurface(body)}
</div>
</div>${AFTER_SPEAKER_ROW_HTML}`;
}

type NextTag = { kind: "speaker" | "speakers"; pos: number };

/**
 * True when `idx` lies inside an HTML block comment (`<!--` … `-->`). Maintainer docs often
 * include literal `<speaker …>` examples; those must not be consumed by `expandBookSpeakerTags`
 * (otherwise the first real `<speaker>` in chapter body is paired with the wrong `</speaker>`).
 */
function isIndexInsideHtmlBlockComment(s: string, idx: number): boolean {
  const open = s.lastIndexOf("<!--", idx);
  if (open === -1) return false;
  const close = s.indexOf("-->", open + 4);
  if (close === -1) return idx >= open;
  return idx >= open && idx < close;
}

/** `<speaker` must not match the prefix of `<speakers`. */
function indexOfSingleSpeakerOpen(markdown: string, from: number): number {
  const token = "<speaker";
  let pos = from;
  while (pos < markdown.length) {
    const i = markdown.indexOf(token, pos);
    if (i === -1) return -1;
    if (markdown.slice(i, i + "<speakers".length).toLowerCase() === "<speakers") {
      pos = i + token.length;
      continue;
    }
    if (isIndexInsideHtmlBlockComment(markdown, i)) {
      pos = i + token.length;
      continue;
    }
    return i;
  }
  return -1;
}

function indexOfSpeakersOpen(markdown: string, from: number): number {
  const token = "<speakers";
  let pos = from;
  while (pos < markdown.length) {
    const i = markdown.indexOf(token, pos);
    if (i === -1) return -1;
    if (isIndexInsideHtmlBlockComment(markdown, i)) {
      pos = i + token.length;
      continue;
    }
    return i;
  }
  return -1;
}

function findNextSpeakerTag(markdown: string, from: number): NextTag | null {
  const iSpeaker = indexOfSingleSpeakerOpen(markdown, from);
  const iSpeakers = indexOfSpeakersOpen(markdown, from);
  if (iSpeaker === -1 && iSpeakers === -1) return null;
  if (iSpeakers === -1 || (iSpeaker !== -1 && iSpeaker < iSpeakers)) {
    return { kind: "speaker", pos: iSpeaker };
  }
  return { kind: "speakers", pos: iSpeakers };
}

/**
 * Expands `<speaker>` / `<speakers>` tags into `speaker-row` markup (`styles/index.css`) for
 * **any** book page (see `markdownToHtml`); sprite files live under the infix from
 * `speakerAvatarIconInfixForMarkdownPath(fullPath)` (default: first-lojban icons).
 * - `<speaker sprite="sor1">…</speaker>` (optional `name="…"`, self-closing ok)
 * - `<speakers multiface sprites="sor5,sev1,koc5">…</speakers>` (optional `names="…"`)
 * Bubble tint is `speaker-row--bubble-*` from a hash of each sprite id with non-letters stripped (see `SPEAKER_BUBBLE_PALETTE_SIZE`).
 *
 * **GFM pipe tables:** when a `<speaker>…</speaker>` (or self-closing `/>`) sits entirely on one
 * `| … |` line, expansion uses a single-line `speaker-row--table-cell` fragment (no trailing `\\n\\n`)
 * so the table still parses.
 */
export function expandBookSpeakerTags(
  markdown: string,
  fullPath = ""
): string {
  const SPEAKER_OPEN_LEN = "<speaker".length;
  const SPEAKERS_OPEN_LEN = "<speakers".length;
  let i = 0;
  let out = "";

  while (i < markdown.length) {
    const next = findNextSpeakerTag(markdown, i);
    if (!next) {
      out += markdown.slice(i);
      break;
    }
    out += markdown.slice(i, next.pos);
    const start = next.pos;

    if (next.kind === "speakers") {
      const gt = markdown.indexOf(">", start);
      if (gt === -1) {
        out += markdown.slice(start);
        break;
      }
      const attrStr = markdown.slice(start + SPEAKERS_OPEN_LEN, gt);
      const parsed = parseSpeakersOpenTag(attrStr);
      let namesOpt = parsed.names;
      if (namesOpt && namesOpt.length !== parsed.sprites.length) {
        namesOpt = undefined;
      }
      if (!parsed.multiface || parsed.sprites.length < 2) {
        out += markdown.slice(start, gt + 1);
        i = gt + 1;
        continue;
      }
      if (parsed.selfClosing) {
        out += buildMultifaceRow(parsed.sprites, namesOpt, "\n\n", fullPath);
        i = gt + 1;
        continue;
      }
      const afterGt = gt + 1;
      const rest = markdown.slice(afterGt);
      const m = /<\/speakers\s*>/i.exec(rest);
      if (!m) {
        out += markdown.slice(start);
        break;
      }
      const inner = rest.slice(0, m.index);
      out += buildMultifaceRow(parsed.sprites, namesOpt, inner, fullPath);
      i = afterGt + m.index + m[0].length;
      continue;
    }

    const gt = markdown.indexOf(">", start);
    if (gt === -1) {
      out += markdown.slice(start);
      break;
    }
    const attrStr = markdown.slice(start + SPEAKER_OPEN_LEN, gt);
    const { sprite, name, selfClosing } = parseSpeakerOpenTag(attrStr);
    if (!sprite) {
      out += markdown.slice(start, gt + 1);
      i = gt + 1;
      continue;
    }
    if (selfClosing) {
      const closeEnd = gt + 1;
      const inPipeTableRow = isSpeakerInSingleLinePipeTableRow(
        markdown,
        start,
        closeEnd
      );
      out += inPipeTableRow
        ? buildSpeakerRowTableCell(sprite, name, "", fullPath)
        : buildSpeakerRow(sprite, name, "\n\n", fullPath);
      i = closeEnd;
      continue;
    }
    const afterGt = gt + 1;
    const rest = markdown.slice(afterGt);
    const m = /<\/speaker\s*>/i.exec(rest);
    if (!m) {
      out += markdown.slice(start);
      break;
    }
    const inner = rest.slice(0, m.index);
    const closeEnd = afterGt + m.index + m[0].length;
    const inPipeTableRow = isSpeakerInSingleLinePipeTableRow(
      markdown,
      start,
      closeEnd
    );
    out += inPipeTableRow
      ? buildSpeakerRowTableCell(sprite, name, inner, fullPath)
      : buildSpeakerRow(sprite, name, inner, fullPath);
    i = closeEnd;
  }

  return out;
}

/** @deprecated Use `expandBookSpeakerTags`. */
export const expandFirstLojbanSpeakerTags = expandBookSpeakerTags;
