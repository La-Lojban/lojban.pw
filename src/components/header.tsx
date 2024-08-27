import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faScroll } from "@fortawesome/free-solid-svg-icons";

import { closeXicon } from "../lib/buttons";
import { header } from "../config/config";
import { TocElem } from "../types/toc";
import { getClosestHeaderId } from "../lib/toc";
import { Items } from "../lib/api";
import { TPost } from "../types/post";
import langJson from "../config/locales.json";

const languages = langJson.languages;
const langDict = Object.keys(languages)
  .sort()
  .reduce(
    (acc: any, language: string) => ({
      ...acc,
      [(languages as any)[language].short]: (languages as any)[language].native,
    }),
    {}
  );

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
  posts = [],
  post,
}: {
  toc?: TocElem[];
  path?: string;
  allPosts?: Items[];
  currentLanguage?: string;
  posts?: Items[];
  post?: TPost;
}) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [showBurger, setShowBurger] = useState<boolean>(true);

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
            icon: post.icon ?? "",
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

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value;
    router.push(`/${language}`);
  };

  useEffect(() => {
    const updateVisibleItems = () => {
      const headerWidth = document.querySelector("nav")?.offsetWidth || 0;
      const logoWidth = 100; // Approximate width of the logo
      const languageSelectorWidth = 150; // Approximate width of the language selector
      const burgerMenuWidth = 50; // Approximate width of the burger menu icon
      const itemWidth = 120; // Approximate width of each navigation item

      const availableWidth =
        headerWidth - logoWidth - languageSelectorWidth - burgerMenuWidth;
      const possibleVisibleItems = Math.floor(availableWidth / itemWidth);

      setVisibleItems(Math.max(0, possibleVisibleItems));
      setShowBurger(possibleVisibleItems < header_.length);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, [header_.length]);

  const visibleNavItems = header_.slice(0, visibleItems);
  const hiddenNavItems = header_.slice(visibleItems);

  return (
    <Popover
      as="nav"
      className="z-50 bg-deep-orange-400 shadow-md print:hidden"
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
                      src="/assets/pixra/ralju/ralju_lanci.svg"
                      alt="Lojban logo"
                    />
                  </Link>
                </div>

                <div className="hidden sm:flex ml-5 items-center space-x-3">
                  <select
                    className="outline-none py-1 h-8 flex-shrink-0 bg-deep-orange-300 text-gray-100 text-base leading-none pl-2 rounded shadow-md hover:bg-deep-orange-200 focus:outline-none flex items-center"
                    onChange={handleLanguageChange}
                    defaultValue={
                      langDict[
                        post?.slug[0] ?? router.asPath.split("/")[1] ?? "en"
                      ]
                    }
                  >
                    <option key={`bangu-${currentLanguage}`} value={path}>
                      {langDict[currentLanguage]}
                    </option>
                    {posts
                      .filter((post) => post.language !== currentLanguage)
                      .map((post) => (
                        <option
                          key={`bangu-${post.language}`}
                          value={post.fullPath as string}
                        >
                          {langDict[post.language as any]}
                        </option>
                      ))}
                  </select>

                  {visibleNavItems.map((item) => (
                    <Link
                      href={
                        !!item.foundTitle
                          ? (item.foundTitle.url as string)
                          : item.url
                      }
                      key={item.url}
                      className="mt-auto"
                    >
                      <button className="h-8 flex-shrink-0 bg-deep-orange-300 text-gray-100 text-base leading-none px-4 rounded shadow-md hover:bg-deep-orange-200 focus:outline-none flex items-center relative overflow-hidden">
                        {!!item.foundTitle?.icon && (
                          <div className="absolute flex items-center justify-center text-xl opacity-80 left-1 top-1 bottom-1">
                            {item.foundTitle.icon as string}
                          </div>
                        )}
                        <span className="py-1 relative z-10 pl-4">
                          {!!item.foundTitle
                            ? (item.foundTitle.name as string)
                            : item.name}
                        </span>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <select
                  className="sm:hidden mr-3 h-8 inline-block my-auto py-1 px-2 bg-gray-100 border border-gray-300 hover:border-gray-400 rounded-md shadow-md text-gray-600 outline-none appearance-none"
                  onChange={handleLanguageChange}
                  defaultValue={
                    langDict[
                      post?.slug[0] ?? router.asPath.split("/")[1] ?? "en"
                    ]
                  }
                >
                  <option key={`bangu-${currentLanguage}`} value={path}>
                    {langDict[currentLanguage]}
                  </option>
                  {posts.map((post) => (
                    <option
                      key={`bangu-${post.language}`}
                      value={post.fullPath as string}
                    >
                      {langDict[post.language as any]}
                    </option>
                  ))}
                </select>

                {showBurger && (
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
                )}
              </div>
            </div>
          </div>

          {showBurger && (
            <Popover.Panel className="bg-gray-100 shadow-lg">
              {({ close }) => (
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {hiddenNavItems.map((item) => (
                    <Link
                      href={
                        !!item.foundTitle
                          ? (item.foundTitle.url as string)
                          : item.url
                      }
                      key={item.url}
                      onClick={() => {
                        closeXicon();
                        close();
                      }}
                      className={`block border-b last:border-b-0 hover:text-deep-orange-600 ${buttonClass}`}
                    >
                      {!!item.foundTitle
                        ? (item.foundTitle.name as string)
                        : item.name}
                    </Link>
                  ))}

                  {hasToC && (
                    <>
                      <h1 className={`flex bg-gray-200 ${buttonClass}`}>
                        <FontAwesomeIcon icon={faScroll} className="h-6" />
                        <FontAwesomeIcon icon={faList} className="ml-2 h-6" />
                      </h1>

                      <nav className="toc w-full p-2 bottom-0 md:top-20 h-48 md:h-screen font-medium text-sm overflow-ellipsis">
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
                                close();
                              }}
                              className={`block border-b hover:text-deep-orange-600 ${buttonClass} lme-ml-${(item.depth - 2) * 2}`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </nav>
                    </>
                  )}
                </div>
              )}
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
}
