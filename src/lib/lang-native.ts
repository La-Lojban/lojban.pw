import langJson from "../config/locales.json";

const languages = langJson.languages as Record<
  string,
  { short: string; native: string }
>;

/** Maps URL language codes (e.g. `en`) to native language names (e.g. `English`). */
export const langDict: Record<string, string> = Object.keys(languages).reduce(
  (acc, lojbanKey) => {
    const { short, native } = languages[lojbanKey];
    acc[short] = native;
    return acc;
  },
  {} as Record<string, string>
);

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
