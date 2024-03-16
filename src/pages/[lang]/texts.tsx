import AllStories from "../../components/all-stories";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { Items, getAllPosts } from "../../lib/api";
import { TPost } from "../../types/post";
import { header } from "../../config/config";

import markdownToHtml from "../../lib/markdownToHtml";
import { Params } from "./[...slug]";
import { retainStringValues } from "../../lib/utils";

type Props = {
  siblingPosts: Items[];
  allPosts: Items[];
  indexPost: TPost;
  posts: Items[];
  params: any;
};

const ogImage = (header.filter((item) => item.url === "/texts")?.[0] as any)?.[
  "og:image"
];
const Index = ({ siblingPosts, allPosts, indexPost, posts, params }: Props) => {
  return (
      <Layout
        meta={{
          ...retainStringValues(indexPost, ["content", "fullPath"]),
          title: indexPost.title,
          "og:url": "/" + indexPost.slug.join("/"),
        }}
        allPosts={siblingPosts}
        currentLanguage={params.lang}
        title={indexPost.title}
        posts={posts}
      >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-row flex-wrap">
            <div className="mb-8 mx-auto max-w-7xl px-4 sm:px-6">
              <Intro title={indexPost?.title} image={ogImage} />
              <div
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: indexPost?.content ?? "" }}
              />
              {allPosts.length > 0 && (
                <AllStories posts={allPosts as unknown as TPost[]} />
              )}
            </div>
          </div>
      </Layout>
  );
};

export default Index;

export const getStaticProps = async ({ params }: Params) => {
  let allPosts = await getAllPosts(
    [
      "title",
      "hidden",
      "date",
      "slug",
      "author",
      "coverImage",
      "og:image",
      "excerpt",
      "author",
      "fullPath",
      "content",

      "meta.title",
      "description",
      "meta.keywords",
      "meta.author",
      "meta.type",
    ],
    false,
    ""
  );
  const thisLangPosts = allPosts.filter(
    (i) => i.slug[0] === params.lang && i.slug[1] === "texts"
  );
  const indexPost: Items = {
    ...allPosts.filter(
      (i) => i.slug[0] === "en" && i.slug[1] === "texts" && i.slug.length === 2
    )[0],
    ...thisLangPosts.filter((i) => i.slug.length === 2)[0],
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
      return { fullPath: slug.join("/"), language: slug[0] };
    });

  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);
  return {
    props: {
      siblingPosts,
      allPosts: thisLangPosts.filter((i) => i.slug.length > 2),
      indexPost: { ...indexPost, content: text },
      posts,
      params,
    },
  };
};

export async function getStaticPaths(pa: any) {
  const posts = await getAllPosts(["slug", "hidden"], true);
  return {
    paths: posts
      .filter((post) => post.slug.slice(1).join("/") === "texts")
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
