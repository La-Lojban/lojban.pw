import Container from "../components/container";
import AllStories from "../components/all-stories";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { TPost } from "../types/post";
import Header from "../components/header";
import { TEXTS, TEXTS_preface, header } from "../config/config";

type Props = {
  allPosts: TPost[];
};

const ogImage = header.filter(item=>item.url=== "/texts")?.[0]?.ogImage;
const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{"Corpus of texts"}</title>
          {ogImage && <meta property="og:image" content={ogImage} />}
        </Head>
        <div className="pb-8">
          <Container>
            <Header />
            <div className="mb-8 mt-4 mx-auto max-w-7xl px-4 sm:px-6">
              <Intro title={TEXTS} image={ogImage}/>
              <div
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: TEXTS_preface }}
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

export const getStaticProps = async () => {
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
    ],
    false,
    "texts"
  );

  return {
    props: { allPosts },
  };
};

// export const config = { amp: 'hybrid' }
