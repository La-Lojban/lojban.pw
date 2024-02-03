import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import Author from "../types/author";
import { TPost } from "../types/post";

type Props = {
  post: TPost;
};

const PostPreview = ({ post }: Props) => {
  const { title, date, excerpt, slug, coverImage } = post;
  const author: Author | TPost["meta.author"] =
    post.author ?? post["meta.author"];
  return (
    <div
      className={
        "max-w-md p-4 align-middle shadow-lg rounded-lg grid place-items-left bg-blend-lighten bg-right" +
        (coverImage ? " bg-white/50" : " bg-white")
      }
      style={{
        backgroundImage: `url('${coverImage}')`,
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="inner">
        <h3 className="text-gray-800 text-2xl text-center">
          <Link
            as={`/${slug.join("/")}`}
            href="/[...slug]"
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>
        {(date || author || excerpt) && (
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
        )}
      </div>
    </div>
  );
};

export default PostPreview;
