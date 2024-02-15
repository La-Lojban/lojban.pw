import fs from "fs";
import path from "path";

export default function replaceIncludes(
  content: string,
  { resolveFrom }: { resolveFrom: string }
) {
  const includeRegex = /@include\s+"([^"]+)"/g;

  let match;
  while ((match = includeRegex.exec(content)) !== null) {
    const includeFilePath = path.join(resolveFrom, match[1]);
    const includedContent = fs.readFileSync(includeFilePath, "utf-8");
    content = content.replace(match[0], includedContent);
  }

  return content;
}
