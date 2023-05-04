import { CMS_NAME } from "../config/config";

const Intro = ({
  title = CMS_NAME,
  image,
}: {
  title?: string;
  image?: string;
}) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-4 mb-8">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 flex flex-wrap items-center">
        {image && <img src={image} className="h-32 mr-2" />}
        <span className="">{title}</span>
      </h1>
    </section>
  );
};

export default Intro;
