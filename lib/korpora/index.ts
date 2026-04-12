import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";
import archiver from "archiver";
import { getMdPagesPath, getPublicAssetsPath } from "../paths";

const TSV_FOLDER_NAME = "korpora-tsv";
const tsvIndexFilename = "korpora-tsv.md";

async function createTsvZip(): Promise<string | null> {
  const tsvOutputDir = path.join(getPublicAssetsPath(), TSV_FOLDER_NAME);
  const tsvFiles = fs
    .readdirSync(tsvOutputDir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".tsv"))
    .map((dirent) => dirent.name)
    .sort();

  if (tsvFiles.length === 0) return null;

  const zipFilename = "korpora-tsv-all.zip";
  const zipPath = path.join(tsvOutputDir, zipFilename);

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      resolve(zipFilename);
    });

    archive.on("error", (err: Error) => {
      reject(err);
    });

    archive.pipe(output);

    tsvFiles.forEach((file) => {
      archive.file(path.join(tsvOutputDir, file), { name: file });
    });

    archive.finalize();
  });
}

async function writeTsvIndexFile(): Promise<void> {
  const mdPagesPath = getMdPagesPath();
  if (!fs.existsSync(mdPagesPath)) return;

  const targetDirectory = path.join(mdPagesPath, "en");
  fs.mkdirSync(targetDirectory, { recursive: true });

  const tsvDir = path.join(getPublicAssetsPath(), TSV_FOLDER_NAME);
  const tsvFiles = fs.existsSync(tsvDir)
    ? fs
        .readdirSync(tsvDir, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".tsv"))
        .map((dirent) => dirent.name)
        .sort()
    : [];

  const zipFilename = await createTsvZip();

  const listBody =
    tsvFiles.length === 0
      ? "_No TSV files in `data/assets/korpora-tsv/`._"
      : tsvFiles
          .map((file) => {
            const title = path.parse(file).name;
            return `- [${title}](/assets/${TSV_FOLDER_NAME}/${file})`;
          })
          .join("\n");

  const zipLink = zipFilename
    ? `\n\n**Download all TSV files:** [${zipFilename}](/assets/${TSV_FOLDER_NAME}/${zipFilename})`
    : "";

  const content = `---
title: Korpora TSV Index
meta.type: korpora
---

Source TSV files live in \`data/assets/korpora-tsv/\` (served at \`/assets/${TSV_FOLDER_NAME}/\`).

${listBody}${zipLink}
`;

  const targetPath = path.join(targetDirectory, tsvIndexFilename);
  const formatted = await prettier.format(content, { filepath: targetPath });
  fs.writeFileSync(targetPath, formatted);
}

(async () => {
  fs.mkdirSync(getPublicAssetsPath(), { recursive: true });
  await writeTsvIndexFile();
})();
