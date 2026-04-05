/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useMemo } from "react";
import PostPreview from "./post-preview";
import { TPost } from "../types/post";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  flatGrid:
    "grid grid-cols-1 md:grid-cols-3 md:gap-x-16 lg:gap-x-20 gap-y-8",
  listing: "listing",
  groupCard: "mb-3 w-full border border-gray-200 rounded-lg shadow",
  tablist:
    "bg-white flex flex-wrap text-lg font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50",
  tabHeading:
    "select-none mx-3 my-1 capitalize inline-block text-gray-500 border-gray-100 hover:border-gray-300",
  hashLink: "print:hidden",
  hashSpan: "in-heading hash select-none",
  panelOuter: "px-4 pt-2 pb-4 md:pt-4 md:pb-8",
  panelGrid:
    "grid grid-cols-1 md:grid-cols-3 md:gap-x-8 gap-y-4",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function PostPreviewGrid({ posts }: { posts: TPost[] }) {
  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post.slug.join("~")} post={post} />
      ))}
    </>
  );
}

function SingleColumnGrid({ posts }: { posts: TPost[] }) {
  return (
    <div className={tw.flatGrid}>
      <PostPreviewGrid posts={posts} />
    </div>
  );
}

function GroupHeading({ groupKey }: { groupKey: string }) {
  return (
    <div
      id={groupKey}
      className={tw.tabHeading}
    >
      <span>{groupKey}</span>
      <a className={tw.hashLink} aria-hidden="true" href={`#${groupKey}`}>
        <span className={tw.hashSpan}>#</span>
      </a>
    </div>
  );
}

function GroupSection({
  groupKey,
  posts,
}: {
  groupKey: string;
  posts: TPost[];
}) {
  return (
    <div className={tw.groupCard}>
      <div className={tw.tablist} role="tablist">
        <GroupHeading groupKey={groupKey} />
      </div>
      <div>
        <div
          className={tw.panelOuter}
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <div className={tw.panelGrid}>
            <PostPreviewGrid posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  posts: TPost[];
  lang?: string;
};

const sortByContentLength = (a: TPost, b: TPost) =>
  (b.contentLength ?? 0) - (a.contentLength ?? 0);

function AllStories({ posts, lang }: Props) {
  const groupedPosts = useMemo(
    () =>
      posts.reduce((acc, post) => {
        const directory =
          post.slug.slice(0, post.slug.length - 1).join("/") ?? "";
        if (!acc[directory]) acc[directory] = [];
        acc[directory].push(post);
        return acc;
      }, {} as { [key: string]: TPost[] }),
    [posts]
  );

  const orderedKeys = useMemo(() => {
    const keys = Object.keys(groupedPosts);
    if (keys.length === 1) return keys;
    const current = keys
      .filter((key) => key === lang || key.startsWith(`${lang}/`))
      .sort();
    const rest = keys
      .filter((key) => key !== lang && !key.startsWith(`${lang}/`))
      .sort();
    return [...current, ...rest];
  }, [groupedPosts, lang]);

  if (orderedKeys.length === 1) {
    const key = orderedKeys[0];
    const sorted = [...(groupedPosts[key] ?? [])].sort(sortByContentLength);
    return <SingleColumnGrid posts={sorted} />;
  }

  return (
    <div className={tw.listing}>
      {orderedKeys.map((key) => (
        <GroupSection
          key={key}
          groupKey={key}
          posts={[...(groupedPosts[key] ?? [])].sort(sortByContentLength)}
        />
      ))}
    </div>
  );
}

export default AllStories;
