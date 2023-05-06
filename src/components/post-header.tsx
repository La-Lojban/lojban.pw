import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import Author from "../types/author";
import { TPost } from "../types/post";
import { TEXT_preface } from "../config/config";

type Props = {
  post: TPost;
};

const PostHeader = ({ post }: Props) => {
  const { author, title, date } = post;
  return (
    <>
      {title && <PostTitle>{title}</PostTitle>}
      {author?.name && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
      )}
      {(author || date) && (
        <div className="mx-auto">
          {author?.name && (
            <div className="block md:hidden mb-6">
              <Avatar name={author?.name} picture={author?.picture} />
            </div>
          )}
          {date && (
            <div className="mb-6 text-lg">
              <DateFormatter dateString={date} />
            </div>
          )}
        </div>
      )}
      {post["meta.type"] == "korpora" && (
        <div
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: TEXT_preface }}
        />
      )}
    </>
  );
};

export default PostHeader;
