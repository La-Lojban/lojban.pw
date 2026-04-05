import { memo } from "react";
import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import Author from "../types/author";
import { TPost } from "../types/post";

type Props = {
  post: TPost;
};

function PostPreview({ post }: Props) {
  const { title, date, excerpt, slug, coverImage } = post;
  const author: Author | TPost["meta.author"] =
    post.author ?? post["meta.author"];
  const href = `/${slug.join("/")}`;

  const meta = (date || author || excerpt) && (
    <div className="mt-2 text-gray-600">
      {date && (
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
      )}
      {excerpt && (
        <div className="text-lg leading-relaxed mb-4">{excerpt}</div>
      )}
      {author && (
        <Avatar name={author?.name ?? author} picture={author?.picture} />
      )}
    </div>
  );

  const coverTitleLinkShadow =
    "0 0 14px rgba(255,255,255,1), 0 0 6px rgba(255,255,255,0.95), 0 0 2px #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff";

  const titleBlock = (
    <h3
      className={
        "break-words text-gray-800 text-2xl " +
        (coverImage ? "text-left" : "text-center")
      }
    >
      <Link
        href={href}
        className="hover:underline"
        style={
          coverImage
            ? { textShadow: coverTitleLinkShadow }
            : {
                textShadow:
                  "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
              }
        }
      >
        {title}
      </Link>
    </h3>
  );

  if (coverImage) {
    return (
      <div
        className="inner flex w-full min-w-0 max-w-md flex-col overflow-hidden rounded-lg shadow-lg bg-gray-100 px-4 pb-4 pt-[10rem]"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0, transparent 10rem, white 10rem, white 100%), url(${coverImage})`,
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, center top",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        {titleBlock}
        {meta}
      </div>
    );
  }

  return (
    <div className="max-w-md p-4 align-middle shadow-lg rounded-lg place-items-left bg-white">
      <div className="inner">
        {titleBlock}
        {meta}
      </div>
    </div>
  );
}

export default memo(PostPreview);
