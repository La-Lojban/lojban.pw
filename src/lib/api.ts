import fs from "fs";
import { join, resolve, relative, extname } from "path";
import matter from "gray-matter";
import { promises as fsp } from "fs";

const postsDirectory = process.env.md_content || "";

async function getFiles(dir = postsDirectory): Promise<string[]> {
  const dirents = await fsp.readdir(dir, { withFileTypes: true });
  const files = (
    await Promise.all(
      dirents.map((dirent: { name: any; isDirectory: () => any }) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() && dirent.name.indexOf("!") !== 0
          ? getFiles(res)
          : extname(res) === ".md"
          ? relative(postsDirectory, res)
          : null;
      })
    )
  ).filter(Boolean);
  return Array.prototype.concat(...files);
}

export async function getPostSlugs() {
  return await getFiles();
}

type Items = {
  slug: string[];
  [key: string]: string | string[] | boolean;
};

export function getPostBySlug(slug: string[], fields: string[] = []): Items {
  const realSlug = slug.join("/");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Items = { slug: [] };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug;
    }
    if (field === "hidden") {
      items[field] = slug?.map((part) => part.charAt(0))?.includes("!");
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
    if (field === "date" && items[field])
      items[field] = new Date(items[field] as any)
        .toISOString()
        .replace(/T.*/, "");
    if (field === "fullPath") items[field] = fullPath;
  });

  return items;
}

export async function getAllPosts(fields: string[] = [], showHidden = false) {
  const slugs = await getPostSlugs();
  const posts = slugs
    .map((slug: string) =>
      getPostBySlug(slug.replace(/\.md$/, "").split("/"), fields)
    )
    .filter(
      (post) =>
        (showHidden || !post?.hidden) &&
        (!fields.includes("title") || typeof post.title !== "undefined")
    )
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
