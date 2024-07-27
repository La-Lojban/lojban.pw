import AllStories from "../../components/all-stories";
import Layout from "../../components/layout";
import { Items, getAllPosts } from "../../lib/api";
import { TPost } from "../../types/post";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  siblingPosts: TPost[];
  contentPosts: TPost[];
  indexPost: TPost;
  posts: Items[];
  params: any;
};

const Index = ({
  posts,
  siblingPosts,
  contentPosts,
  indexPost,
  params,
}: Props) => {
  return (
    <Layout
      meta={{
        title: indexPost.title,
        "og:url": "/" + indexPost.slug.join("/"),
      }}
      allPosts={siblingPosts as unknown as Items[]}
      currentLanguage={params.lang}
      title={indexPost.title}
      posts={posts}
    >
      <div className="mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row">
        <div className="mb-8 mt-3 mx-auto max-w-7xl px-4 sm:px-6">
          {/* <Intro title={indexPost?.title} image={ogImage} /> */}
          <div
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: indexPost?.content ?? "" }}
          />
          {contentPosts.length > 0 && (
            <AllStories posts={contentPosts} lang={params.lang} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async ({ params }: Params) => {
  let allPosts = await getAllPosts({
    fields: [
      "title",
      "hidden",
      "date",
      "slug",
      "directory",
      "author",
      "coverImage",
      // "excerpt",
      // "meta.author",
      // "meta.priority",
      "fullPath",
      "content",

      "meta.title",
      "description",
      "meta.keywords",
      "meta.author",
      "meta.type",
    ],
    showHidden: true,
    folder: "",
    ignoreTitles: false,
  });

  const indexPost = {
    ...allPosts.filter(
      (i) => i.slug[0] === "en" && i.slug[1] === "list" && i.slug.length === 2
    )[0],
    ...allPosts.filter(
      (i) =>
        i.slug[0] === params.lang && i.slug[1] === "list" && i.slug.length === 2
    )[0],
  };

  const { text } = await markdownToHtml({
    content: (indexPost.content as string) || "",
    fullPath: indexPost.fullPath as string,
  });

  allPosts = allPosts.map((post) => {
    delete post.content;
    return post;
  });

  const posts = allPosts
    .filter(
      (i) =>
        i.slug[0] !== params.lang &&
        i.slug[1] === "texts" &&
        i.slug.length === 2
    )
    .map(({ slug }) => {
      return { fullPath: slug[0] + "/list", language: slug[0] };
    });

  const contentPosts = allPosts.filter(
    (i) => !(i.slug[1] === "list" && i.slug.length === 2)
  );
  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);
  return {
    props: {
      posts,
      contentPosts,
      siblingPosts,
      indexPost: { ...indexPost, content: text },
      params,
    },
  };
};

export async function getStaticPaths(pa: any) {
  const posts = await getAllPosts({
    fields: ["slug", "hidden"],
    showHidden: true,
    folder: "",
    ignoreTitles: false,
  });
  return {
    paths: posts
      .filter((post) => post.slug.slice(1).join("/") === "list")
      .map((post) => {
        return {
          params: {
            slug: post.slug.slice(1),
            lang: post.slug[0],
          },
        };
      })
      .flat(),
    fallback: false,
  };
}

// export const config = { amp: 'hybrid' }
