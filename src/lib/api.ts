import fs from "fs";
import { join, resolve, relative, extname } from "path";
import matter from "gray-matter";
import { promises as fsp } from "fs";

const postsDirectory = process.env.md_content || "";

async function getFiles(
  dir = postsDirectory,
  subfolder = ""
): Promise<string[]> {
  dir = join(dir, subfolder);
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

export async function getPostSlugs(subfolder: string) {
  return await getFiles(postsDirectory, subfolder);
}

export type Items = {
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
    if (field === "directory") {
      items[field] = slug[0];
    }
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

export async function getAllPosts(
  fields: string[] = [],
  showHidden = false,
  folder = ""
) {
  const slugs = await getPostSlugs(folder);
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
    .sort((post1, post2) => ((post1.date ?? 0) > (post2.date ?? 0) ? -1 : 1))
    //sort by priority in descending order
    .sort((post1, post2) =>
      (post1["meta.priority"] ?? 0) > (post2["meta.priority"] ?? 0) ? -1 : 1
    );
  return posts;
}
