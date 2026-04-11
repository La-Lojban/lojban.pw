/**
 * Path segment (POSIX slashes) inside avatar image URLs for `<speaker>` / `<speakers>`.
 * Kept in sync with on-disk layout under `data/assets/pixra/…`; Typst pipeline matches this
 * substring to skip the margin pixra queue and to detect speaker rows in `body.typ`.
 */
export const SPEAKER_AVATAR_IMAGE_PATH_INFIX = "pixra/books/first-lojban/icons";

/** Web URL prefix for speaker sprites (`SPEAKER_AVATAR_IMAGE_PATH_INFIX` after `/assets/`). */
export const BOOK_SPEAKER_ICONS_WEB_BASE = `/assets/${SPEAKER_AVATAR_IMAGE_PATH_INFIX}/`;

/** @deprecated Use `BOOK_SPEAKER_ICONS_WEB_BASE`. */
export const FIRST_LOJBAN_SPEAKER_ICONS_BASE = BOOK_SPEAKER_ICONS_WEB_BASE;

const SPEAKER_LABEL_BY_PREFIX: Record<string, string> = {
  koc: "Koshon",
  sor: "Sora",
  sev: "Sevan",
};

export function speakerDisplayNameFromSprite(
  sprite: string,
  explicitName?: string
): string {
  const n = explicitName?.trim();
  if (n) return n;
  const base = sprite.replace(/\.(png|webp)$/i, "");
  const prefix = base.match(/^([a-z]+)/i)?.[1]?.toLowerCase() ?? "";
  return SPEAKER_LABEL_BY_PREFIX[prefix] ?? base;
}

export function firstLojbanSpeakerIconUrl(sprite: string): string {
  const base = sprite.replace(/\.(png|webp)$/i, "");
  return `${BOOK_SPEAKER_ICONS_WEB_BASE}${base}.webp`;
}

/** Must match the number of `article .speaker-row--bubble-*` themes in `src/styles/index.css`. */
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
  const infix = SPEAKER_AVATAR_IMAGE_PATH_INFIX.replaceAll("\\", "/");
  const esc = infix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `#image\\("[^"]*${esc}([^"/\\\\]+)\\.(?:webp|png)"`,
    "gi"
  );
  const out: string[] = [];
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

function buildSpeakerRow(
  sprite: string,
  explicitName: string | undefined,
  inner: string
): string {
  const url = firstLojbanSpeakerIconUrl(sprite);
  const label = speakerDisplayNameFromSprite(sprite, explicitName);
  const safe = escapeHtmlAttr(label);
  const body = speechInnerForHtml(inner);
  const rowMod = speakerRowBubbleModifierFromThemeKey(
    bubbleThemeKeyFromSprites([sprite])
  );
  return `<div class="speaker-row ${rowMod}">
<div class="speaker-row__avatar">
<figure><div class="figure_img" data-url="${url}"><img src="${url}" alt="${safe}"></div><figcaption><b>${safe}</b><br/><i></i></figcaption></figure>
</div>
<div class="speaker-row__speech">${body}
</div>
</div>${AFTER_SPEAKER_ROW_HTML}`;
}

function buildMultifaceRow(
  sprites: string[],
  explicitNames: string[] | undefined,
  inner: string
): string {
  const wrappers = sprites
    .map((sprite, i) => {
      const name =
        explicitNames && explicitNames[i]
          ? explicitNames[i]
          : undefined;
      const label = speakerDisplayNameFromSprite(sprite, name);
      const safe = escapeHtmlAttr(label);
      const url = firstLojbanSpeakerIconUrl(sprite);
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
<div class="speaker-row__speech">${body}
</div>
</div>${AFTER_SPEAKER_ROW_HTML}`;
}

type NextTag = { kind: "speaker" | "speakers"; pos: number };

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
    return i;
  }
  return -1;
}

function findNextSpeakerTag(markdown: string, from: number): NextTag | null {
  const iSpeaker = indexOfSingleSpeakerOpen(markdown, from);
  const iSpeakers = markdown.indexOf("<speakers", from);
  if (iSpeaker === -1 && iSpeakers === -1) return null;
  if (iSpeakers === -1 || (iSpeaker !== -1 && iSpeaker < iSpeakers)) {
    return { kind: "speaker", pos: iSpeaker };
  }
  return { kind: "speakers", pos: iSpeakers };
}

/**
 * Expands `<speaker>` / `<speakers>` tags into `speaker-row` markup (`src/styles/index.css`) for
 * **any** book page (see `markdownToHtml`); sprite files live under `SPEAKER_AVATAR_IMAGE_PATH_INFIX`.
 * - `<speaker sprite="sor1">…</speaker>` (optional `name="…"`, self-closing ok)
 * - `<speakers multiface sprites="sor5,sev1,koc5">…</speakers>` (optional `names="…"`)
 * Bubble tint is `speaker-row--bubble-*` from a hash of each sprite id with non-letters stripped (see `SPEAKER_BUBBLE_PALETTE_SIZE`).
 */
export function expandBookSpeakerTags(markdown: string): string {
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
        out += buildMultifaceRow(parsed.sprites, namesOpt, "\n\n");
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
      out += buildMultifaceRow(parsed.sprites, namesOpt, inner);
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
      out += buildSpeakerRow(sprite, name, "\n\n");
      i = gt + 1;
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
    out += buildSpeakerRow(sprite, name, inner);
    i = afterGt + m.index + m[0].length;
  }

  return out;
}

/** @deprecated Use `expandBookSpeakerTags`. */
export const expandFirstLojbanSpeakerTags = expandBookSpeakerTags;
