import Container from '../components/container'
import AllStories from '../components/all-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../types/post'
import Header from '../components/header'

import { home_title } from '../config/config'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{home_title}</title>
        </Head>
        <Container>
          <Header />
          <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6">
            <Intro />
            {allPosts.length > 0 && <AllStories posts={allPosts} />}
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}

// export const config = { amp: 'hybrid' }
