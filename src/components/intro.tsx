import { CMS_NAME } from "../config/config";

const Intro = ({ title = CMS_NAME }: { title?: string }) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-12 md:mb-8">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
    </section>
  );
};

export default Intro;
