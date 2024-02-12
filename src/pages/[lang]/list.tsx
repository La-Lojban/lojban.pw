import Container from "../../components/container";
import AllStories from "../../components/all-stories";
import Layout from "../../components/layout";
import { getAllPosts } from "../../lib/api";
import Head from "next/head";
import { TPost } from "../../types/post";
import Header from "../../components/header";

import { home_title } from "../../config/config";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import markdownToHtml from "../../lib/markdownToHtml";

type Props = {
  allPosts: TPost[];
  indexPost?: TPost;
};

const Index = ({ allPosts, indexPost }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{home_title}</title>
        </Head>
        <div className="pb-8">
          <Container>
            <Header />
            <div className="mb-8 mt-4 mx-auto max-w-7xl px-4 sm:px-6">
              {/* <Intro title={indexPost?.title} image={ogImage} /> */}
              <div
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: indexPost?.content ?? "" }}
              />
              {allPosts.length > 0 && <AllStories posts={allPosts} />}
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
      "directory",
      "author",
      "coverImage",
      "excerpt",
      "meta.author",
      "meta.priority",
      "fullPath",
      "content",
    ],
    false
  );

  const indexPost =
    allPosts.filter(
      (i) =>
        i.slug[0] === params.lang && i.slug[1] === "list" && i.slug.length === 2
    )[0] ??
    allPosts.filter(
      (i) => i.slug[0] === "en" && i.slug[1] === "list" && i.slug.length === 2
    )[0];

  const { text } = await markdownToHtml({
    content: (indexPost.content as string) || "",
    fullPath: indexPost.fullPath as string,
  });

  return {
    props: { allPosts, indexPost: { ...indexPost, content: text } },
  };
};


export async function getStaticPaths(pa: any) {
  const posts = await getAllPosts(["slug", "hidden"], true);
  return {
    paths: posts
      .filter((posts) => posts.slug[1] === "list")
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