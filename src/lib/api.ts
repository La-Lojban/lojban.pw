import fs from "fs";
import { join, resolve, relative, extname, dirname } from "path";
import matter from "gray-matter";
import { promises as fsp } from "fs";
import {
  listKorporaTsvBasenames,
  loadProcessedCorpusFromTsv,
  getCorpusPostFields,
  shortFromLangKey,
  korporaLanguageKeys,
  resolveKorporaDisplayTitle,
  resolveKorporaAuthorLine,
} from "./korpora/corpusCore";
import { getKorporaTsvPath } from "./paths";

const postsDirectory = process.env.md_content || "";

/** Directories to never scan for content (e.g. tooling, history). Only data/ from root should be used. */
function shouldSkipDir(name: string): boolean {
  return name.startsWith(".");
}

async function getFiles(
  dir = postsDirectory,
  subfolder = ""
): Promise<string[]> {
  dir = join(dir, subfolder);
  const dirents = await fsp.readdir(dir, { withFileTypes: true });
  const files = (
    await Promise.all(
      dirents.map((dirent: { name: any; isDirectory: () => any }) => {
        if (dirent.isDirectory() && shouldSkipDir(dirent.name)) {
          return null;
        }
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

  // Book chapters: any .md under [lang]/books/[book]/ (path has 4+ segments). Merge parent book index front matter.
  const isBookChapter = slug[1] === "books" && slug.length >= 4;
  if (isBookChapter) {
    const parentSlug = slug.slice(0, -1);
    const parentFullPath = join(postsDirectory, `${parentSlug.join("/")}.md`);

    if (fs.existsSync(parentFullPath)) {
      const parentFileContents = fs.readFileSync(parentFullPath, "utf8");
      const { data: parentData } = matter(parentFileContents);

      // Merge parent data with current data, giving priority to current data
      Object.assign(data, { ...parentData, ...data, parentSlug: parentSlug.join("/") });
    }
  }

  // Some locales use `ogImage` instead of `og:image`; listings only request `og:image` / coverImage.
  const ogFromFm =
    (data["og:image"] as string | undefined) ??
    (data as { ogImage?: string }).ogImage;
  if (typeof ogFromFm === "string" && ogFromFm) {
    data["og:image"] = ogFromFm;
    if (!(data as { coverImage?: string }).coverImage) {
      (data as { coverImage?: string }).coverImage = ogFromFm;
    }
  }
  const cov = (data as { coverImage?: string }).coverImage;
  if (typeof cov === "string" && cov && !data["og:image"]) {
    data["og:image"] = cov;
  }

  const folderPath = dirname(fullPath);
  allSlugs = allSlugs || (await getFiles(folderPath));

  const relatedSlugs = allSlugs
    .map((s) => s.replace(/\.md$/, "").split("/"))
    .filter(
      (s) =>
        s[1] === "books" &&
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
      // Hidden: book chapters (path-based) or any slug part starting with "!" (legacy)
      items[field] =
        (slug[1] === "books" && slug.length >= 4) ||
        (slug?.map((part) => part.charAt(0))?.includes("!") ?? false);
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

function getKorporaSyntheticPosts(fields: string[]): Items[] {
  const dir = getKorporaTsvPath();
  const basenames = listKorporaTsvBasenames();
  const posts: Items[] = [];
  for (const basename of basenames) {
    const data = loadProcessedCorpusFromTsv(basename);
    if (!data) continue;
    for (const langKey of korporaLanguageKeys) {
      const short = shortFromLangKey(langKey);
      const meta = getCorpusPostFields(data, langKey);
      const displayTitle = resolveKorporaDisplayTitle(basename, meta.title);
      const authorLine = resolveKorporaAuthorLine(basename, meta.author);
      const slugArr = [short, "texts", basename];
      const fullPath = slugArr.join("/");
      const item: Items = { slug: slugArr };

      if (fields.includes("directory")) item.directory = short;
      if (fields.includes("slug")) item.slug = slugArr;
      if (fields.includes("hidden")) item.hidden = false;
      if (fields.includes("title")) item.title = displayTitle;
      if (fields.includes("content")) item.content = "";
      if (fields.includes("relatedSlugs")) item.relatedSlugs = [];
      if (fields.includes("fullPath")) item.fullPath = fullPath;
      // No date/excerpt on listing cards — mtime is not meaningful; description duplicates the author line.
      item["meta.priority"] = meta.priority;
      item["meta.type"] = "korpora";
      item["meta.description"] = meta.description;
      item["meta.keywords"] = meta.keywords;
      item["meta.author"] = authorLine;
      if (fields.includes("author")) {
        item.author = { name: authorLine, picture: "" } as unknown as Items["author"];
      }
      if (meta.ogImage) {
        item["og:image"] = meta.ogImage;
        item.coverImage = meta.ogImage;
      }
      posts.push(item);
    }
  }
  return posts;
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

  const isBookChapterPost = (p: Items) =>
    p.slug[1] === "books" && p.slug.length >= 4;
  const korporaBasenames = new Set(listKorporaTsvBasenames());
  const filteredPosts = posts
    .filter((post) => {
      const s = post.slug;
      if (
        s.length === 3 &&
        s[1] === "texts" &&
        korporaBasenames.has(s[2])
      ) {
        return false;
      }
      return true;
    })
    .filter(
      (post) =>
        (showHidden ||
          (!isBookChapterPost(post) && !post.slug.some((part) => part.startsWith("!")))) &&
      (ignoreTitles || !fields.includes("title") || post.title !== undefined)
    )
    // sort posts by date in descending order
    .sort((post1, post2) => ((post1.date ?? 0) > (post2.date ?? 0) ? -1 : 1))
    //sort by priority in descending order
    .sort((post1, post2) =>
      (post1["meta.priority"] ?? 0) > (post2["meta.priority"] ?? 0) ? -1 : 1
    );

  const korporaPosts = getKorporaSyntheticPosts(fields).filter(
    (post) =>
      ignoreTitles ||
      !fields.includes("title") ||
      typeof post.title !== "undefined"
  );

  return [...filteredPosts, ...korporaPosts]
    .sort((post1, post2) => ((post1.date ?? 0) > (post2.date ?? 0) ? -1 : 1))
    .sort((post1, post2) =>
      (post1["meta.priority"] ?? 0) > (post2["meta.priority"] ?? 0) ? -1 : 1
    );
}
