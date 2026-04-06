/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { memo, type ReactNode } from "react";
import Link from "next/link";
import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Author from "../types/author";
import { TPost } from "../types/post";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  coverRoot:
    "inner relative z-0 flex w-full min-w-0 max-w-md min-h-[17rem] flex-col justify-end overflow-hidden rounded-lg shadow-lg bg-gray-100 bg-cover bg-center bg-no-repeat",
  coverFooter:
    "w-full shrink-0 bg-gradient-to-t from-white/72 via-white/48 to-transparent px-4 py-2 backdrop-blur [mask-image:linear-gradient(to_bottom,transparent,black,black,black)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black,black,black)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%]",
  plainCard:
    "max-w-md p-4 align-middle shadow-lg rounded-lg place-items-left bg-white",
  title: "m-0 w-full break-words text-center text-2xl",
  titleOnCover: "text-gray-900",
  titlePlain: "text-gray-800",
  link: "block w-full hover:underline",
  linkOnCover:
    "[text-shadow:0_0_10px_#fff,0_0_4px_#fff,-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff,0_-1px_0_#fff,0_1px_0_#fff,-1px_0_0_#fff,1px_0_0_#fff]",
  linkPlain:
    "[text-shadow:-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff]",
  meta: "mt-2",
  metaOnCover: "text-gray-800",
  metaPlain: "text-gray-600",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function PreviewTitle({
  title,
  href,
  onCover,
}: {
  title: string;
  href: string;
  onCover: boolean;
}) {
  return (
    <h3
      className={`${tw.title} ${onCover ? tw.titleOnCover : tw.titlePlain}`}
    >
      <Link
        href={href}
        className={`${tw.link} ${onCover ? tw.linkOnCover : tw.linkPlain}`}
      >
        {title}
      </Link>
    </h3>
  );
}

function PreviewMeta({
  date,
  excerpt,
  author,
  onCover,
}: {
  date?: string;
  excerpt?: string;
  author?: Author | TPost["meta.author"];
  onCover: boolean;
}) {
  if (!date && !author && !excerpt) return null;
  return (
    <div
      className={`${tw.meta} ${onCover ? tw.metaOnCover : tw.metaPlain}`}
    >
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
        />
      ) : null}
    </div>
  );
}

function CoverCard({
  imageUrl,
  title,
  href,
  meta,
}: {
  imageUrl: string;
  title: string;
  href: string;
  meta: ReactNode;
}) {
  return (
    <div
      className={tw.coverRoot}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={tw.coverFooter}>
        <PreviewTitle title={title} href={href} onCover />
        {meta}
      </div>
    </div>
  );
}

function PlainCard({
  title,
  href,
  meta,
}: {
  title: string;
  href: string;
  meta: ReactNode;
}) {
  return (
    <div className={tw.plainCard}>
      <div className="inner">
        <PreviewTitle title={title} href={href} onCover={false} />
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
  const { title, date, excerpt, slug, coverImage } = post;
  const author: Author | TPost["meta.author"] =
    post.author ?? post["meta.author"];
  const href = `/${slug.join("/")}`;
  const onCover = Boolean(coverImage);

  const meta = (
    <PreviewMeta
      date={date}
      excerpt={excerpt}
      author={author}
      onCover={onCover}
    />
  );

  if (coverImage) {
    return (
      <CoverCard
        imageUrl={coverImage}
        title={title}
        href={href}
        meta={meta}
      />
    );
  }

  return <PlainCard title={title} href={href} meta={meta} />;
}

export default memo(PostPreview);
