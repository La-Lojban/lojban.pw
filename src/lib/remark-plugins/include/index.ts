import fs from "fs";
import path from "path";

export default function replaceIncludes(
  content: string,
  { resolveFrom }: { resolveFrom: string }
): string {
  const includeRegex = /@include\s+"([^"]+)"/g;

  let match;
  while ((match = includeRegex.exec(content)) !== null) {
    const rawIncludePath = match[1];
    // Legacy: book chapters used "!" prefix (e.g. learn-lojban/!1.md). Prefer path without "!" so renamed files resolve.
    const withoutBang = rawIncludePath.replace(/\/!([^/]+)$/, "/$1");
    const candidate = path.join(resolveFrom, withoutBang);
    const includeFilePath = fs.existsSync(candidate)
      ? candidate
      : path.join(resolveFrom, rawIncludePath);
    const includedContent = fs.readFileSync(includeFilePath, "utf-8");
    content = content.replace(match[0], includedContent);
  }

  return content;
}
