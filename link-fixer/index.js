const fs = require("fs-extra");
const path = require("path-extra");

const { resolve } = require("path");
const { readdir } = require("fs").promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

(async () => {
  const files = await getFiles("src");
  let acc = {};
  files.forEach(file => {
    if (file.indexOf(".md") === -1) return;
    let content = fs.readFileSync(file, { encoding: "utf8" });
    content = content.split(/[\r\n]+/);
    content.forEach(line => {
      if (line.indexOf("#") === 0) {
        const header = line
          .replace(/^#+ */, "")
          .toLowerCase()
          .replace(/ /g, "-");
        acc[header] = file.replace(
          new RegExp(path.join(__dirname, `../src/`) + `(.*?)\.md`, "gi"),
          "$1"
        );
      }
    });
  });

  files.forEach(file => {
    if (file.indexOf(".md") === -1) return;

    let content = fs.readFileSync(file, { encoding: "utf8" });
    content = content.replace(
      /\[([^\]]*?)\]\(\/([^\)]*?)\/#([^\)]*?)\)/g,
      (match, first, second, third) => {
        const res = `[${first}](/${acc[third]}/#${third})`;
        return res;
      }
    );
    fs.writeFileSync(file, content);
  });
})();
