import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Author from "../types/author";
import { TPost } from "../types/post";
import { TEXT_preface } from "../config/config";

type Props = {
  post: TPost;
};

const PostHeader = ({ post }: Props) => {
  const { author, title, coverImage, date } = post;
  return (
    <>
      {title && <PostTitle>{title}</PostTitle>}
      {author?.name && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author?.name} picture={author?.picture} />
        </div>
      )}
      {title && coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} src={coverImage} />
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
