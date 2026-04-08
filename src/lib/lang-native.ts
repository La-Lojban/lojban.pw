import langJson from "../config/locales.json";

type LangEntry = {
  short: string;
  native: string;
  direction?: string;
  currentPageContents?: string;
};

const languages = langJson.languages as Record<string, LangEntry>;

/** Maps URL language codes (e.g. `en`) to native language names (e.g. `English`). */
export const langDict: Record<string, string> = Object.keys(languages).reduce(
  (acc, lojbanKey) => {
    const { short, native } = languages[lojbanKey];
    acc[short] = native;
    return acc;
  },
  {} as Record<string, string>
);

/** Localized heading for the mobile topbar table of contents (burger menu). */
export function currentPageContentsLabel(lang: string): string {
  const entry = Object.values(languages).find((e) => e.short === lang);
  const fallback =
    languages.glico?.currentPageContents ?? "Current page contents:";
  return entry?.currentPageContents ?? fallback;
}

/**
 * Human-readable label for a post directory key (first segment = language code).
 * Example: `en` → `English`, `de/books/foo` → `Deutsch / books/foo`.
 */
export function groupDirectoryLabel(directoryKey: string): string {
  const parts = directoryKey.split("/");
  const short = parts[0] ?? "";
  const native = langDict[short] ?? short;
  if (parts.length <= 1) return native;
  return `${native} / ${parts.slice(1).join("/")}`;
}
