import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import Author from "../types/author";
import { TPost } from "../types/post";

type Props = {
  post: TPost;
};

const PostPreview = ({ post }: Props) => {
  const { title, date, excerpt, slug } = post;
  const author: Author | TPost["meta.author"] =
    post.author ?? post["meta.author"];
  return (
    <div className="max-w-md py-4 px-4 align-middle	bg-white shadow-lg rounded-lg grid place-items-center">
      {/* <div className="flex justify-center md:justify-end -mt-16">
        <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
      </div> */}
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
      {/* <div className="flex justify-end mt-4">
    <a href="#" className="text-xl font-medium text-indigo-500">John Doe</a>
  </div>
      <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div> */}
    </div>
  );
};

export default PostPreview;
