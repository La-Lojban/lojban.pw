import fs from "fs";
import { join, resolve, relative, extname, dirname } from "path";
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
        return dirent.isDirectory()
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
  contentLength?: number;
  relatedSlugs?: string[];
  parentPost?: Items;
  [key: string]:
    | string
    | string[]
    | boolean
    | number
    | string[][]
    | undefined
    | Items;
};

export async function getPostBySlug(
  slug: string[],
  fields: string[] = [],
  allSlugs?: string[] | undefined
): Promise<Items> {
  const realSlug = slug.join("/");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  let fileContents = "";
  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, "utf8");
  }
  const { data, content } = matter(fileContents);

  const items: Items = { slug: [] };

  // Check if the last element of the slug starts with "!"
  if (slug[slug.length - 1].startsWith("!")) {
    const parentSlug = slug.slice(0, -1);
    const parentFullPath = join(postsDirectory, `${parentSlug.join("/")}.md`);
    
    if (fs.existsSync(parentFullPath)) {
      const parentFileContents = fs.readFileSync(parentFullPath, "utf8");
      const { data: parentData } = matter(parentFileContents);
      
      // Merge parent data with current data, giving priority to current data
      Object.assign(data, { ...parentData, ...data });
    }
  }
  
  const folderPath = dirname(fullPath);
  allSlugs = allSlugs || (await getFiles(folderPath));

  const relatedSlugs = allSlugs
    .map((s) => s.replace(/\.md$/, "").split("/"))
    .filter(
      (s) =>
        s[1] === "books" &&
        s.slice(-1)[0].indexOf("!") === 0 &&
        s.length >= 4 &&
        s.slice(0, -1).join("/") === slug.slice(0, -1).join("/") &&
        s.join("/") !== slug.join("/")
    )
    .map((s) => s.join("/"));

  const firstHeaderMatch =
    slug[1] === "books" ? content.match(/^#+\s+(.+)$/m) : null;
  const firstHeader = firstHeaderMatch
    ? firstHeaderMatch?.[1]?.replace(/<*?>/g, "").trim()
    : undefined;

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
    if (field === "relatedSlugs") {
      items[field] = relatedSlugs;
    }
    if (field === "firstHeader" && firstHeader !== undefined) {
      items[field] = firstHeader;
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
  {
    fields,
    showHidden,
    folder,
    ignoreTitles,
  }: {
    fields: string[];
    showHidden: boolean;
    folder: string;
    ignoreTitles: boolean;
  } = { fields: [], showHidden: false, folder: "", ignoreTitles: false }
) {
  const slugs = await getPostSlugs(folder);

  const posts = await Promise.all(
    slugs.map((slug: string) =>
      getPostBySlug(slug.replace(/\.md$/, "").split("/"), fields, slugs)
    )
  );

  const a = posts
    .filter(
      (post) =>
        (showHidden || !post?.hidden) &&
        (ignoreTitles ||
          !fields.includes("title") ||
          typeof post.title !== "undefined")
    )
    // sort posts by date in descending order
    .sort((post1, post2) => ((post1.date ?? 0) > (post2.date ?? 0) ? -1 : 1))
    //sort by priority in descending order
    .sort((post1, post2) =>
      (post1["meta.priority"] ?? 0) > (post2["meta.priority"] ?? 0) ? -1 : 1
    );
  return a;
}
