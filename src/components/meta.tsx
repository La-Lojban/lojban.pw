import Head from "next/head"
import { links, meta } from "../config/config"

const Meta = () => {
  return (
    <Head>
      {links.map((el: any, index: number) => (
        <link
          key={`link_${index}`}
          rel={el.rel}
          type={el.type}
          sizes={el.sizes}
          href={el.href}
          color={el.color}
        />
      ))}
      {meta.map((el: any, index: number) => (
        <meta
          key={`meta_${index}`}
          {...el} />
      ))}
    </Head>
  )
}

export default Meta
