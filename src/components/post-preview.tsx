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
            ? undefined
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
      <div className="flex max-w-md overflow-hidden rounded-lg shadow-lg bg-white">
        <div className="relative w-1/3 shrink-0 min-h-[5rem] overflow-hidden bg-gray-100">
          <img
            src={coverImage}
            alt=""
            className="absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 select-none"
            decoding="async"
          />
        </div>
        <div className="inner flex flex-1 min-w-0 flex-col p-4">
          {titleBlock}
          {meta}
        </div>
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
