import { CMS_NAME } from '../config/config'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {CMS_NAME}
      </h1>
    </section>
  )
}

export default Intro
