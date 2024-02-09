import Container from "../../components/container";
import AllStories from "../../components/all-stories";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { Items, getAllPosts } from "../../lib/api";
import Head from "next/head";
import { TPost } from "../../types/post";
import Header from "../../components/header";
import { TEXTS, header } from "../../config/config";

import markdownToHtml from "../../lib/markdownToHtml";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Params } from "./[...slug]";

type Props = {
  fullPosts: Items[];
  allPosts: Items[];
  indexPost?: TPost;
  posts: Items[];
  params: any;
};

const ogImage = header.filter((item) => item.url === "/texts")?.[0]?.ogImage;
const Index = ({ fullPosts, allPosts, indexPost, posts, params }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{"Corpus of texts"}</title>
          {ogImage && <meta property="og:image" content={ogImage} />}
        </Head>
        <div className="pb-8">
          <Container>
          <Header
            allPosts={fullPosts}
            currentLanguage={params.lang}
          />
              {posts.length > 0 && (
                <div className="relative block w-96 h-10 mx-auto flex justify-around print:hidden">
                  <div className="h-10 w-16 inline-block py-2 px-4">
                    <FontAwesomeIcon icon={faLanguage} />
                  </div>
                  {posts.map((post) => {
                    return (
                      <a
                        key={`bangu-${post.language}`}
                        href={`/${post.fullPath}` as any}
                        className="h-10 inline-block py-2 px-4 bg-white border border-t-0 border-gray-300 hover:border-gray-400 ml-2"
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
              {allPosts.length > 0 && <AllStories posts={allPosts as unknown as TPost[]} />}
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async ({ params }: Params) => {
  const allPosts = await getAllPosts(
    [
      "title",
      "hidden",
      "date",
      "slug",
      "author",
      "coverImage",
      "excerpt",
      "meta.author",
      "meta.priority",
      "fullPath",
      // "content"
    ],
    false,
    ""
  );
  const thisLangPosts = allPosts.filter(
    (i) => i.slug[0] === params.lang && i.slug[1] === "texts"
  );
  const indexPost = thisLangPosts.filter(
    (i) =>
      i.slug[0] === params.lang && i.slug[1] === "texts" && i.slug.length === 2
  )[0];

  const { text } = await markdownToHtml({
    content: (indexPost.content as string) || "",
    fullPath: indexPost.fullPath as string,
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

  return {
    props: {
      fullPosts: allPosts,
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
        // if (posts.slug[0] === "en") {
        //   return [
        //     {
        //       params: {
        //         slug: posts.slug,
        //         lang: posts.slug[0],
        //       },
        //     },
        //     {
        //       params: {
        //         slug: posts.slug.slice(1),
        //         lang: "en",
        //       },
        //     },
        //   ];
        // }
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
