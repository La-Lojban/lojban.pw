import Container from "../../components/container";
import AllStories from "../../components/all-stories";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { Items, getAllPosts } from "../../lib/api";
import Head from "next/head";
import { TPost } from "../../types/post";
import Header from "../../components/header";
import { header } from "../../config/config";

import markdownToHtml from "../../lib/markdownToHtml";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Params } from "./[...slug]";

type Props = {
  siblingPosts: Items[];
  allPosts: Items[];
  indexPost?: TPost;
  posts: Items[];
  params: any;
};

const ogImage = (header.filter((item) => item.url === "/texts")?.[0] as any)?.[
  "og:image"
];
const Index = ({ siblingPosts, allPosts, indexPost, posts, params }: Props) => {
  return (
    <>
      <Layout meta={{ "og:image": indexPost?.["og:image"] }}>
        <Head>
          <title>{"Corpus of texts"}</title>
        </Head>
        <div className="pb-8">
          <Container>
            <Header allPosts={siblingPosts} currentLanguage={params.lang} />
            {posts.length > 0 && (
              <div className="relative block max-w-sm h-10 mx-auto mb-2 flex justify-around print:hidden">
                <div className="h-10 w-16 select-none	inline-block py-2 px-4">
                  <FontAwesomeIcon icon={faLanguage} />
                </div>
                {posts.map((post) => {
                  return (
                    <a
                      key={`bangu-${post.language}`}
                      href={`/${post.fullPath}` as any}
                      className="h-10 inline-block py-2 px-4 bg-white border border-t-0 border-gray-300 hover:border-gray-400 ml-2 rounded-b-md shadow-md"
                    >
                      {post.language}
                    </a>
                  );
                })}
              </div>
            )}
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
          </Container>
        </div>
      </Layout>
    </>
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
      "meta.author",
      "meta.priority",
      "fullPath",
      "content",
    ],
    false,
    ""
  );
  const thisLangPosts = allPosts.filter(
    (i) => i.slug[0] === params.lang && i.slug[1] === "texts"
  );
  const indexPost =
    thisLangPosts.filter((i) => i.slug.length === 2)[0] ??
    allPosts.filter(
      (i) => i.slug[0] === "en" && i.slug[1] === "texts" && i.slug.length === 2
    );

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
      .filter((posts) => posts.slug[1] === "texts")
      .map((posts) => {
        return {
          params: {
            slug: posts.slug.slice(1),
            lang: posts.slug[0],
          },
        };
      })
      .flat(),
    fallback: false,
  };
}

// export const config = { amp: 'hybrid' }
