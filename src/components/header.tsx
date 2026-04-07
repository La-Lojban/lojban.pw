/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentTextIcon,
  ListBulletIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

import { header } from "../config/config";
import { langDict } from "../lib/lang-native";
import { Items } from "../lib/api";
import { closeXicon } from "../lib/buttons";
import { getClosestHeaderId } from "../lib/toc";
import { TPost } from "../types/post";
import { TocElem, TocItem } from "../types/toc";
import { AlgoliaSearchTrigger } from "./algolia-search-trigger";

const AlgoliaSearchOverlay = dynamic(
  () => import("./algolia-search-overlay").then((m) => m.default),
  { ssr: false }
);

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  popoverNav: "z-50 shadow-md print:hidden",
  inner: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  bar: "flex items-center justify-between h-12",
  leftCluster: "flex items-center",
  logoWrap: "flex-shrink-0",
  logoLink: "hover:no-underline",
  logoImg:
    "logo active:transform active:translate-y-px transition-all duration-150 hover:scale-110 hover:brightness-110",
  desktopNav: "hidden sm:flex ml-5 items-center space-x-3",
  langSelectDesktop:
    "outline-none py-1 h-8 flex-shrink-0 text-gray-100 text-base leading-none pl-2 rounded shadow-md focus:outline-none flex items-center active:transform active:translate-y-px transition-all duration-150 hover:shadow-lg hover:scale-105 cursor-pointer",
  navLinkWrap: "mt-auto hover:no-underline",
  navBtn:
    "h-8 flex-shrink-0 text-gray-100 text-base leading-none px-4 rounded shadow-md focus:outline-none flex items-center relative overflow-hidden active:transform active:translate-y-px transition-all duration-150 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5",
  navBtnIconWrap:
    "absolute flex items-center justify-center text-xl opacity-80 left-1 top-1 bottom-1",
  navBtnLabel: "py-1 relative z-10 pl-4",
  rightCluster: "flex items-center",
  langSelectMobile:
    "sm:hidden mr-3 h-8 inline-block my-auto py-1 px-2 bg-gray-100 border border-gray-300 hover:border-gray-400 rounded-md shadow-md text-gray-600 outline-none appearance-none",
  burgerBtn:
    "select-none inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none transition-all duration-150 hover:shadow-lg hover:scale-110",
  burgerIcon: "block h-6 w-6",
  panel: "bg-gray-100 shadow-lg",
  panelInner: "px-2 pt-2 pb-3 space-y-1 sm:px-3",
  hiddenNavLink: "block border-b last:border-b-0",
  tocHeading: "flex bg-gray-200",
  tocNav:
    "toc w-full p-2 bottom-0 md:top-20 h-48 md:h-screen font-medium text-sm overflow-ellipsis",
  tocScroll: "h-full px-2 pb-3 space-y-1 sm:px-3 overflow-y-auto",
  tocLink: "block border-b",
  tocLinkBase:
    "text-black in-topbar-toc hover:no-underline px-3 py-2 text-sm font-medium overflow-ellipsis",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function LogoLink({ currentLanguage }: { currentLanguage: string }) {
  return (
    <div className={tw.logoWrap}>
      <Link
        href={`/${currentLanguage}/welcome`}
        className={tw.logoLink}
      >
        <img
          className={tw.logoImg}
          src="/assets/pixra/ralju/ralju_lanci.svg"
          alt="Lojban logo"
        />
      </Link>
    </div>
  );
}

function LanguageSelectDesktop({
  path,
  currentLanguage,
  posts,
  defaultLangKey,
  getColor,
  onChange,
  langDict,
}: {
  path: string;
  currentLanguage: string;
  posts: Items[];
  defaultLangKey: string;
  getColor: (c: string) => string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  langDict: Record<string, string>;
}) {
  return (
    <select
      className={`${tw.langSelectDesktop} ${getColor("bg-deep-orange-300")} ${getColor("hover:bg-deep-orange-200")}`}
      onChange={onChange}
      defaultValue={langDict[defaultLangKey]}
    >
      <option key={`bangu-${currentLanguage}`} value={path}>
        {langDict[currentLanguage]}
      </option>
      {posts
        .filter((p) => p.language !== currentLanguage)
        .map((p) => (
          <option
            key={`bangu-${p.language}`}
            value={p.fullPath as string}
          >
            {langDict[p.language as keyof typeof langDict]}
          </option>
        ))}
    </select>
  );
}

function LanguageSelectMobile({
  path,
  currentLanguage,
  posts,
  defaultLangKey,
  onChange,
  langDict,
}: {
  path: string;
  currentLanguage: string;
  posts: Items[];
  defaultLangKey: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  langDict: Record<string, string>;
}) {
  return (
    <select
      className={tw.langSelectMobile}
      onChange={onChange}
      defaultValue={langDict[defaultLangKey]}
    >
      <option key={`bangu-${currentLanguage}`} value={path}>
        {langDict[currentLanguage]}
      </option>
      {posts.map((p) => (
        <option
          key={`bangu-${p.language}`}
          value={p.fullPath as string}
        >
          {langDict[p.language as keyof typeof langDict]}
        </option>
      ))}
    </select>
  );
}

type EnrichedHeaderItem = (typeof header)[number] & {
  foundTitle?: Items;
};

function DesktopNavButton({
  item,
  getColor,
}: {
  item: EnrichedHeaderItem;
  getColor: (c: string) => string;
}) {
  const href = item.foundTitle
    ? (item.foundTitle.url as string)
    : item.url;
  const label = item.foundTitle
    ? (item.foundTitle.name as string)
    : item.name;
  const rawIcon = item.foundTitle?.icon;
  const icon =
    rawIcon != null && String(rawIcon).trim() !== ""
      ? String(rawIcon).trim()
      : undefined;

  return (
    <Link href={href} className={tw.navLinkWrap}>
      <button
        type="button"
        className={`${tw.navBtn} ${getColor("bg-deep-orange-300")} ${getColor("hover:bg-deep-orange-200")}`}
      >
        {icon ? (
          <div className={tw.navBtnIconWrap}>{icon}</div>
        ) : null}
        <span className={tw.navBtnLabel}>{label}</span>
      </button>
    </Link>
  );
}

function BurgerMenuLink({
  item,
  getColor,
  onNavigate,
}: {
  item: EnrichedHeaderItem;
  getColor: (c: string) => string;
  onNavigate: () => void;
}) {
  const href = item.foundTitle
    ? (item.foundTitle.url as string)
    : item.url;
  const label = item.foundTitle
    ? (item.foundTitle.name as string)
    : item.name;

  return (
    <Link
      href={href}
      onClick={() => {
        closeXicon();
        onNavigate();
      }}
      className={`${tw.hiddenNavLink} ${getColor("hover:text-deep-orange-600")} ${tw.tocLinkBase}`}
    >
      {label}
    </Link>
  );
}

function TopbarTocSection({
  listToC,
  getColor,
  onNavigate,
}: {
  listToC: TocItem[];
  getColor: (c: string) => string;
  onNavigate: () => void;
}) {
  return (
    <>
      <h1 className={`${tw.tocHeading} ${tw.tocLinkBase}`}>
        <DocumentTextIcon className="h-6 w-6" aria-hidden />
        <ListBulletIcon className="ml-2 h-6 w-6" aria-hidden />
      </h1>

      <nav className={tw.tocNav}>
        <div id="toc-topbar" className={tw.tocScroll}>
          {listToC.map((item) => (
            <Link
              href={item.url}
              key={item.url}
              onClick={() => {
                closeXicon();
                onNavigate();
              }}
              className={`${tw.tocLink} ${getColor("hover:text-deep-orange-600")} ${tw.tocLinkBase} lme-ml-${(item.depth - 2) * 2}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

function BurgerButton({
  open,
  getColor,
}: {
  open: boolean;
  getColor: (c: string) => string;
}) {
  return (
    <Popover.Button
      type="button"
      onClick={() => {
        getClosestHeaderId();
      }}
      className={`${tw.burgerBtn} ${getColor("bg-deep-orange-400")} ${getColor("hover:bg-deep-orange-300")}`}
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon
          id="xicon"
          className={tw.burgerIcon}
          aria-hidden="true"
        />
      ) : (
        <Bars3Icon className={tw.burgerIcon} aria-hidden="true" />
      )}
    </Popover.Button>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
export default function Header({
  toc = [],
  tocList,
  path = "",
  allPosts = [],
  currentLanguage = "en",
  posts = [],
  post,
}: {
  toc?: TocElem[];
  tocList?: TocItem[];
  path?: string;
  allPosts?: Items[];
  currentLanguage?: string;
  posts?: Items[];
  post?: TPost;
}) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(0);
  const [showBurger, setShowBurger] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const handleCloseSearch = useCallback(() => setSearchOpen(false), []);
  const [useDeepOrange, setUseDeepOrange] = useState<boolean | undefined>(
    undefined
  );

  const listToC: TocItem[] = useMemo(
    () =>
      tocList ??
      toc.map((tocElem) => ({
        depth: parseInt(tocElem.depth, 10),
        name: tocElem.value,
        url: `${path}#${tocElem.id}`,
      })),
    [tocList, toc, path]
  );

  const hasToC = listToC.length > 0;

  const header_: EnrichedHeaderItem[] = useMemo(
    () =>
      header.map((item) => {
        const foundTitle = allPosts
          .reduce((acc, p) => {
            const slug = "/" + p.slug.join("/");
            const localizedUrl = `/${currentLanguage}` + item.url;
            if ([item.url, localizedUrl].includes(slug)) {
              acc.push({
                slug: p.slug,
                url: localizedUrl,
                icon: p.icon ?? "",
                name: p.title,
                directory: p.slug[0],
                coverImage: p.coverImage,
              });
            }
            return acc;
          }, [] as Items[])
          .sort((a, b) => (a.directory === currentLanguage ? -1 : 0))[0];
        return { ...item, foundTitle };
      }),
    [allPosts, currentLanguage]
  );

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    router.push(`/${language}`);
  };

  useEffect(() => {
    const updateVisibleItems = () => {
      const headerWidth = document.querySelector("nav")?.offsetWidth || 0;
      const logoWidth = 100;
      const languageSelectorWidth = 150;
      const burgerMenuWidth = 50;
      const itemWidth = 120;

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

  useEffect(() => {
    const colorPreference = localStorage.getItem("headerColor");
    setUseDeepOrange(colorPreference === "brown" ? false : true);

    const timer = setTimeout(() => {
      setUseDeepOrange(false);
      localStorage.setItem("headerColor", "brown");
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const getColor = useCallback(
    (className: string) => {
      return [undefined, false].includes(useDeepOrange)
        ? className.replace(/deep-orange/g, "brown")
        : className;
    },
    [useDeepOrange]
  );

  const visibleNavItems = header_.slice(0, visibleItems);
  const hiddenNavItems = header_.slice(visibleItems);

  const defaultLangKey =
    post?.slug[0] ?? router.asPath.split("/")[1] ?? "en";

  return (
    <>
      <AlgoliaSearchOverlay isOpen={searchOpen} onClose={handleCloseSearch} />
      <Popover
        as="nav"
        aria-label="Primary"
        className={`${tw.popoverNav} ${getColor("bg-deep-orange-400")}`}
      >
        {({ open }) => (
          <>
            <div className={tw.inner}>
              <div className={tw.bar}>
                <div className={tw.leftCluster}>
                  <LogoLink currentLanguage={currentLanguage} />

                  <div className={tw.desktopNav}>
                    <LanguageSelectDesktop
                      path={path}
                      currentLanguage={currentLanguage}
                      posts={posts}
                      defaultLangKey={defaultLangKey}
                      getColor={getColor}
                      onChange={handleLanguageChange}
                      langDict={langDict}
                    />

                    {visibleNavItems.map((item) => (
                      <DesktopNavButton
                        key={item.url}
                        item={item}
                        getColor={getColor}
                      />
                    ))}
                  </div>
                </div>

                <div className={tw.rightCluster}>
                  <LanguageSelectMobile
                    path={path}
                    currentLanguage={currentLanguage}
                    posts={posts}
                    defaultLangKey={defaultLangKey}
                    onChange={handleLanguageChange}
                    langDict={langDict}
                  />

                  <AlgoliaSearchTrigger
                    onOpen={() => setSearchOpen(true)}
                    getColor={getColor}
                  />

                  {showBurger ? (
                    <BurgerButton open={open} getColor={getColor} />
                  ) : null}
                </div>
              </div>
            </div>

            {showBurger ? (
              <Popover.Panel className={tw.panel}>
                {({ close }) => (
                  <div className={tw.panelInner}>
                    {hiddenNavItems.map((item) => (
                      <BurgerMenuLink
                        key={item.url}
                        item={item}
                        getColor={getColor}
                        onNavigate={close}
                      />
                    ))}

                    {hasToC ? (
                      <TopbarTocSection
                        listToC={listToC}
                        getColor={getColor}
                        onNavigate={close}
                      />
                    ) : null}
                  </div>
                )}
              </Popover.Panel>
            ) : null}
          </>
        )}
      </Popover>
    </>
  );
}
