import Link from "next/link";
import { Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import { closeXicon } from "../lib/buttons";
import { header } from "../config/config";
import { TocElem } from "../types/toc";
import { getClosestHeaderId } from "../lib/toc";
import { Items } from "../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faScroll } from "@fortawesome/free-solid-svg-icons";

type TocItem = {
  name: string;
  url: string;
  depth: number;
};

const buttonClass = `text-black in-topbar-toc hover:no-underline px-3 py-2 text-sm font-medium overflow-ellipsis`;

export default function Header({
  toc = [],
  path = "",
  allPosts = [],
  currentLanguage = "en",
}: {
  toc?: TocElem[];
  path?: string;
  allPosts?: Items[];
  currentLanguage?: string;
}) {
  const listToC: TocItem[] = toc.map((tocElem) => ({
    depth: parseInt(tocElem.depth),
    name: tocElem.value,
    url: `${path}#${tocElem.id}`,
  }));
  const hasToC = listToC.length > 0;
  const header_ = header.map((item) => {
    const foundTitle = allPosts
      .reduce((acc, post) => {
        const slug = "/" + post.slug.join("/");
        const localizedUrl = `/${currentLanguage}` + item.url;
        if ([item.url, localizedUrl].includes(slug)) {
          acc.push({
            slug: post.slug,
            url: localizedUrl,
            name: post.title,
            directory: post.slug[0],
            coverImage: post.coverImage,
          });
        }
        return acc;
      }, [] as Items[])
      .sort((a, b) => {
        if (a.directory === currentLanguage) return -1;
        return 0;
      })[0];
    return { ...item, foundTitle };
  });

  return (
    <Popover
      as="nav"
      className="sticky top-0 z-50 bg-deep-orange-400 shadow-md print:hidden"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href={`/${currentLanguage}/welcome`}>
                    <img
                      className="logo"
                      src="/assets/pixra/ralju/pluka_lanci.svg"
                      alt="Lojban logo"
                    />
                  </Link>
                </div>

                <div className="hidden lg:block">
                  <div className="ml-5 flex items-baseline space-x-3">
                    {header_.map((item) => {
                      const { coverImage } = item.foundTitle;
                      return (
                        <Link
                          href={
                            !!item.foundTitle
                              ? (item.foundTitle.url as string)
                              : item.url
                          }
                          key={item.url}
                          className="mt-auto"
                        >
                          <button
                            className={`h-8 flex-shrink-0 bg-deep-orange-300 text-gray-100 text-base leading-none px-4 rounded shadow-md hover:bg-deep-orange-200 focus:outline-none flex items-center`}
                            // style={{
                            //   backgroundImage: `url('${coverImage}')`,
                            //   backgroundPosition: "right",
                            //   backgroundRepeat: "no-repeat",
                            //   backgroundSize: "auto 100%",
                            // }}
                          >
                            {/* {item.ogImage && <img src={item.ogImage} className="h-7 mr-2"/>} */}
                            <span className="py-1">
                              {!!item.foundTitle
                                ? (item.foundTitle.name as string)
                                : item.name}
                            </span>
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button
                  onClick={() => {
                    getClosestHeaderId();
                  }}
                  className="select-none bg-deep-orange-400 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-deep-orange-400 focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      id="xicon"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Popover.Panel className="lg:hidden bg-gray-100 shadow-lg">
            {/* favs */}
            <div className="px-2 pt-2 space-y-1 sm:px-3">
              {header_.map((item) => {
                return (
                  <Link
                    href={
                      !!item.foundTitle
                        ? (item.foundTitle.url as string)
                        : item.url
                    }
                    key={item.url}
                    onClick={() => {
                      closeXicon();
                    }}
                    className={`block border-b last:border-b-0 hover:text-deep-orange-600 ${buttonClass}`}
                  >
                    {!!item.foundTitle
                      ? (item.foundTitle.name as string)
                      : item.name}
                  </Link>
                );
              })}
            </div>

            {/* title */}
            {hasToC && (
              <>
                <h1 className={`flex bg-gray-200 ${buttonClass}`}>
                  <FontAwesomeIcon icon={faScroll} className="h-6" />
                  <FontAwesomeIcon icon={faList} className="ml-2 h-6" />
                </h1>

                {/* toc */}
                <nav className="toc w-full md:w-1/5 p-2 bottom-0 md:top-20 h-48 md:h-screen font-medium text-sm overflow-ellipsis">
                  <div
                    id="toc-topbar"
                    className="h-full px-2 pb-3 space-y-1 sm:px-3 overflow-y-auto"
                  >
                    {listToC.map((item) => (
                      <Link
                        href={item.url}
                        key={item.url}
                        onClick={() => {
                          closeXicon();
                        }}
                        className={`block border-b hover:text-deep-orange-600 ${buttonClass} lme-ml-${
                          (item.depth - 2) * 2
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </>
            )}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
