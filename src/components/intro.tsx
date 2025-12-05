import Image from "next/image";
import { CMS_NAME } from "../config/config";

const Intro = ({
  title = CMS_NAME,
  image,
}: {
  title?: string;
  image?: string;
}) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mb-6">
      <h1 className="text-center text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 flex flex-wrap items-center">
        {image && (
          <div className="relative h-32 w-32 mr-2">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
              priority
              sizes="128px"
            />
          </div>
        )}
        <span className="">{title}</span>
      </h1>
    </section>
  );
};

export default Intro;
