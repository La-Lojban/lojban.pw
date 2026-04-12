/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { memo, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Author from "../types/author";
import { TPost } from "../types/post";

// -----------------------------------------------------------------------------
// PLACEHOLDER BACKGROUND — deterministic pattern + gradient from title hash
// -----------------------------------------------------------------------------
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function titleToPlaceholderStyle(title: string): CSSProperties {
  const h = hashCode(title);

  const hue1 = h % 360;
  const hue2 = (hue1 + 40 + ((h >> 8) % 50)) % 360;
  const accentHue = (hue1 + 185 + ((h >> 16) % 40)) % 360;

  const c1 = `hsl(${hue1},55%,48%)`;
  const c2 = `hsl(${hue2},62%,34%)`;
  const ac = `hsl(${accentHue},70%,78%)`;

  const angle = 110 + (h % 60);
  const patternType = h % 3;

  let backgroundImage: string;

  if (patternType === 0) {
    // diagonal stripes
    const sz = 18 + (h % 14);
    backgroundImage = [
      `repeating-linear-gradient(${45 + (h % 30)}deg,transparent 0,transparent ${sz}px,${ac}44 ${sz}px,${ac}44 ${sz + 6}px)`,
      `linear-gradient(${angle}deg,${c1},${c2})`,
    ].join(",");
  } else if (patternType === 1) {
    // square grid
    const sz = 14 + (h % 10);
    backgroundImage = [
      `repeating-linear-gradient(0deg,transparent 0,transparent ${sz}px,${ac}36 ${sz}px,${ac}36 ${sz + 1}px)`,
      `repeating-linear-gradient(90deg,transparent 0,transparent ${sz}px,${ac}36 ${sz}px,${ac}36 ${sz + 1}px)`,
      `linear-gradient(${angle}deg,${c1},${c2})`,
    ].join(",");
  } else {
    // diamond cross-hatch
    const sz = 16 + (h % 12);
    backgroundImage = [
      `repeating-linear-gradient(45deg,transparent 0,transparent ${sz}px,${ac}38 ${sz}px,${ac}38 ${sz + 2}px)`,
      `repeating-linear-gradient(-45deg,transparent 0,transparent ${sz}px,${ac}38 ${sz}px,${ac}38 ${sz + 2}px)`,
      `linear-gradient(${angle}deg,${c1},${c2})`,
    ].join(",");
  }

  return { backgroundImage };
}

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  coverRoot:
    "inner relative z-0 flex w-full min-w-0 max-w-md min-h-[17rem] flex-col justify-end overflow-hidden rounded-lg shadow-lg bg-gray-100 bg-cover bg-center bg-no-repeat",
  coverFooter:
    "w-full shrink-0 bg-gradient-to-t from-white/72 via-white/48 to-transparent px-4 pb-2 pt-5 backdrop-blur [mask-image:linear-gradient(to_bottom,transparent,black,black,black,black)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black,black,black,black)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%]",
  title: "m-0 w-full break-words text-center text-2xl text-gray-900",
  link: "block w-full hover:underline",
  linkOnCover:
    "[text-shadow:0_0_10px_#fff,0_0_4px_#fff,-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff,0_-1px_0_#fff,0_1px_0_#fff,-1px_0_0_#fff,1px_0_0_#fff]",
  meta: "mt-2 text-gray-800",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function PreviewTitle({ title, href }: { title: string; href: string }) {
  return (
    <h3 className={tw.title}>
      <Link href={href} className={`${tw.link} ${tw.linkOnCover}`}>
        {title}
      </Link>
    </h3>
  );
}

function PreviewMeta({
  date,
  excerpt,
  author,
}: {
  date?: string;
  excerpt?: string;
  author?: Author | TPost["meta.author"];
}) {
  if (!date && !author && !excerpt) return null;
  return (
    <div className={tw.meta}>
      {date ? (
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
      ) : null}
      {excerpt ? (
        <div className="text-lg leading-relaxed mb-4">{excerpt}</div>
      ) : null}
      {author ? (
        <Avatar
          name={typeof author === "string" ? author : author.name}
          picture={typeof author === "string" ? "" : author.picture}
          nameClassName={tw.linkOnCover}
        />
      ) : null}
    </div>
  );
}

function PostCard({
  imageUrl,
  title,
  href,
  meta,
}: {
  imageUrl?: string;
  title: string;
  href: string;
  meta: ReactNode;
}) {
  const bgStyle: CSSProperties = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : titleToPlaceholderStyle(title);

  return (
    <div
      className={tw.coverRoot}
      style={bgStyle}
    >
      <div className={tw.coverFooter}>
        <PreviewTitle title={title} href={href} />
        {meta}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = { post: TPost };

function PostPreview({ post }: Props) {
  const { title, date, excerpt, slug } = post;
  const coverUrl = post.coverImage || post["og:image"];
  const author: Author | TPost["meta.author"] =
    post.author ?? post["meta.author"];
  const href = `/${slug.join("/")}`;

  const meta = (
    <PreviewMeta date={date} excerpt={excerpt} author={author} />
  );

  return (
    <PostCard
      imageUrl={coverUrl || undefined}
      title={title}
      href={href}
      meta={meta}
    />
  );
}

export default memo(PostPreview);
