import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import Author from "../types/author";
import { TPost } from "../types/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

type Props = {
  post: TPost;
  siteSection?: string;
};

const PostHeader = ({ post, siteSection }: Props) => {
  const { author, title, date } = post;
  const hasPdf = post && post.slug[1] === siteSection;

  return (
    <>
    <div className="flex">
      {hasPdf && (
        <a
          key={`bangu-pdf`}
          href={`/vreji/uencu/${post.slug[0]}/${post.slug.slice(-1)[0]}.pdf`}
          className="mr-2 hover:from-lime-200 hover:to-lime-200 ease bg-gradient-to-br from-lime-50 to-white-900 h-10 inline-block py-2 px-3 border border-lime-500 hover:border-lime-600 rounded-l-md shadow-md"
        >
          <FontAwesomeIcon className="w-6" icon={faFilePdf} />
        </a>
      )}
      {title && <PostTitle>{title}</PostTitle>}
      </div>
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
      {/* {post["meta.type"] == "korpora" && (
        <div
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: TEXT_preface }}
        />
      )} */}
    </>
  );
};

export default PostHeader;
